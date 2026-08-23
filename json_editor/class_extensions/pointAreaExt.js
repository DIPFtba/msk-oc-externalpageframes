import Konva from 'konva';
import { mergeDeep, getPosOfEvent, object_equals, setStatePostProc, ignoreEvent } from '../../libs/common'
import { addScoring } from "../common";

//
// Ähnlich wie pointArea, aber ohne Toolbar und die gewählten "Rechtecke" bleiben nicht dargestellt
// Die Farben werden von außen gesetzt
//

//		window.postMessage( JSON.stringify( [ 'setColorIdx', -1 ] ), '*' );
//		window.postMessage( JSON.stringify( [ 'setColorIdx', 0 ] ), '*' );
//		window.postMessage( JSON.stringify( [ 'setColorIdx', 1 ] ), '*' );
//		window.postMessage( JSON.stringify( [ 'setColorIdx', 2 ] ), '*' );

import trashIcon from '../../libs/img/trash.svg'

export class pointAreaExtFromSchema {

	constructor ( base, opts = {}, addMods={} ) {

		base.regSendInitDone();
		base.incInitCnt();

		mergeDeep( /*Object.assign(*/ this/*, defaultOpts )*/, opts );

		this.base = base;
		const stage = base.stage;
		this.stage = stage;

		this.colorDefs = [ this.bgColor, ...this.colors ]; // Wird im Schema colors genannt, hier this.colorDefs
		this.dotColors = Array.from({ length: this.rows }, () => Array(this.cols).fill(0));
		this.dotReadonly = Array.from({ length: this.rows }, () => Array(this.cols).fill(false));
		this.dotStriked = Array.from({ length: this.rows }, () => Array(this.cols).fill(false));
		this.hasStriked = false;
		this.setColor(0);

		// preSets eintragen
		opts.preSets.forEach( (preSet) => {
			const color = parseInt( preSet.color );
			if ( color > 0 && color <= this.colorDefs.length ) {

				preSet.idxs.split(/[,;:]/).map( s => s.trim() ).forEach( (idx) => {
					const vonBis = idx.split('-').map( s => parseInt( s.trim() ) );
					const allIdxs = vonBis.length === 2 && vonBis[1]>vonBis[0] ?
						Array.from({length: vonBis[1] - vonBis[0] + 1}, (_, i) => i + vonBis[0]) : [ vonBis[0] ];

					allIdxs.forEach( (i) => {
						const row = Math.floor( (i-1) / this.cols );
						const col = (i-1) % this.cols;
						if ( row < this.rows && col < this.cols ) {
							this.dotColors[row][col] = color;
							this.dotReadonly[row][col] = preSet.readonly;
							this.dotStriked[row][col] = preSet.striked;
							this.hasStriked ||= preSet.striked;
						}
					});
				});

			}
		});

		this.draggable = !this.readonly;
		this.initScene();
		this.initInteractivity();
		this.startButtonListener();

		if ( opts.buttonsInEWK ) {
			this.setColor(1);
			this.renderButtons();
		}

		addScoring( this, opts, addMods.Parser );

		this.initData = this.copyColors( this.getChState() );
		this.base.sendChangeState( this );	// init & send changeState & score

		base.decInitCnt();
	}

	scoreDefType () {
		return 'integer';
	}

	scoreDef ( exportAll=false ) {
		const res = {};
		if ( this.readonly ) {
			return res;
		}

		const pref = this.dataSettings?.variablePrefix;
		if ( pref ) {
			for ( let i=1; i<this.colorDefs.length; i++ ) {
				res[`V_Color_${pref}_${i}`] = this.getColorCntStriked( i, null );
				res[`V_Color_${pref}_${i}_Hidden`] = this.getColorCntStriked( i, true );
				res[`V_Color_${pref}_${i}_RowOne`] = this.getColorCntStriked( i, null, 0 );
			}
		}

		if ( this.computeScoringVals ) {
			this.computeScoringVals( res , exportAll );
		}

		return res;
	}

	///////////////////////////////////

	initScene () {

		document.body.style.cursor = this.readonly ? 'auto' : 'pointer';

		let layer;
		if ( this.layer ) {
			layer.destroyChildren();
		} else {
			layer = new Konva.Layer();
			this.stage.add( layer );
		}
		this.layer = layer;

		if ( this.buttonsInEWK ) {
			this.renderAllButtons(layer);
		}

		// Diverse Berechnungen
		const sepXCnt = this.sepEveryX>0 ? Math.ceil(this.cols/this.sepEveryX)-1 : 0;	// Wieviele Trennlinien in einer Spalte
		const x0 = this.x + this.frameWidth/2+this.framePaddingX;	// Position hiner Rahmen+Padding
		const sepXWidth = this.sepWidth+2*(this.framePaddingX+this.sepSpaceX);	// Dicker einer Trennlinie
		const sepXFull = this.sepEveryX*(this.dotRadius*2+this.dotWidth) + (this.sepEveryX-1)*this.dotMarginX + sepXWidth;	// Breite von Punkten+Trennlinie eines Segments
		const width = this.frameWidth+2*this.framePaddingX + this.cols*(this.dotRadius*2+this.dotWidth) + (this.cols-1-sepXCnt)*this.dotMarginX + sepXCnt*sepXWidth;
		const sepYCnt = this.sepEveryY>0 ? Math.ceil(this.rows/this.sepEveryY)-1 : 0;	// Wieviele Trennlinien in einer Zeile
		const y0 = this.y + this.frameWidth/2+this.framePaddingY;
		const sepYHeight = this.sepWidth+2*(this.framePaddingY+this.sepSpaceY);
		const sepYFull = this.sepEveryY*(this.dotRadius*2+this.dotWidth) + (this.sepEveryY-1)*this.dotMarginY + sepYHeight;
		const height = this.frameWidth+2*this.framePaddingY + this.rows*(this.dotRadius*2+this.dotWidth) + (this.rows-1-sepYCnt)*this.dotMarginY + sepYCnt*sepYHeight;

		// Rahmen
		layer.add( new Konva.Rect({
			x: this.x,
			y: this.y,
			width,
			height,
			stroke: this.frameColor,
			strokeWidth: this.frameWidth,
			cornerRadius: this.frameRadius,
		}));

		// Trennlinien
		if ( sepXCnt > 0 ) {
			for ( let x=sepXCnt; x>0; x-- ) {
				const sepX = x0 + x*sepXFull - sepXWidth/2;
				layer.add( new Konva.Line({
					points: [sepX, this.y, sepX, this.y+height],
					stroke: this.sepColor,
					strokeWidth: this.sepWidth,
				}));
			}
		}
		if ( sepYCnt > 0 ) {
			for ( let y=sepYCnt; y>0; y-- ) {
				const sepY = y0 + y*sepYFull - sepYHeight/2;
				layer.add( new Konva.Line({
					points: [this.x, sepY, this.x+width, sepY],
					stroke: this.sepColor,
					strokeWidth: this.sepWidth,
				}));
			}
		}

		// Punkte anlegen
		this.dots = [];
		this.dotAttrs = {
			radius: this.dotRadius,
			stroke: this.dotColor,
			strokeWidth: this.dotWidth,
		}

		for ( let row = 0; row < this.rows; row++ ) {
			const dotRow = [];

			for ( let col = 0; col < this.cols; col++ ) {

				const xsep = this.sepEveryX>0 ? Math.floor(col/this.sepEveryX) : 0;
				const xadd = col - xsep*this.sepEveryX;
				const x = x0 + xsep*sepXFull + xadd*(this.dotRadius*2+this.dotWidth + this.dotMarginX) + this.dotRadius+this.dotWidth/2;

				const ysep = this.sepEveryY>0 ? Math.floor(row/this.sepEveryY) : 0;
				const yadd = row - ysep*this.sepEveryY;
				const y = y0 + ysep*sepYFull + yadd*(this.dotRadius*2+this.dotWidth + this.dotMarginY) + this.dotRadius+this.dotWidth/2;

				const color = this.dotColors[row][col];
				const k = new Konva.Circle({
					...this.dotAttrs,
					x, y,
					fill: this.colorDefs[color],
				});
				layer.add( k );

				const dot = {
					x, y,
					k,
				};
				dotRow.push( dot );
			}

			this.dots.push( dotRow );
		}

		// Striked anlegen
		this.kStrikedGroups = Array.from(
			{ length: this.rows },
			() => {
				const kG = new Konva.Group();
				layer.add( kG );
				return kG;
			});
		for ( let row = 0; row < this.rows; row++ ) {
			this.renderStrikedRow(row);
		}

		layer.draw();
// window.setInterval( () => console.log(this.dotColors[0]),5*1000)
	}

	renderAllButtons (layer) {

		const radius = this.btnRadius;
		const m = 2*radius + this.btnSpace;
		let x = this.btnX + radius;
		let y = this.btnY + radius;
		this.kBtns = []; // index=-1..colors, val=Konva.Circle (Hit-Circle)
		this.kBtnsImgs = [] // index=-1..colors, val=[Konva.Image]

		// Farb-Buttons
		for (let idx=1; idx<this.colorDefs.length; idx++) {
			const kBtn = new Konva.Circle({
				x, y, radius,
				stroke: this.btnNormalColor,
				strokeWidth: this.btnNormalWidth,
				fill: this.colorDefs[idx],
			});
			layer.add( kBtn );
			this.kBtns[ idx ] = kBtn;

			if ( this.btnDir=='horizontal' ) {
				x += m;
			} else {
				y += m;
			}
		}

		// Durchstreichen-Button
		x -= radius;
		y -= radius;
		const maxStrokeWidth = Math.max( this.btnNormalWidth, this.btnMarkedWidth );
		const autoWidth = radius + maxStrokeWidth;

		if ( this.btnStrikeImg && this.btnStrikeImgMarkedSrc && this.btnStrikeImgSrc ) {

			// Images nehmen
			const width = this.btnStrikeImgWidth || ( 2*radius + maxStrokeWidth );
			const sx = x, sy = y;
			this.kBtnsImgs[ -1 ] = [];
			for ( let marked=0; marked<2; marked++ ) {
				const img = this[ marked ? "btnStrikeImgMarkedSrc" : "btnStrikeImgSrc" ];
				Konva.Image.fromURL( img, (imgNode) => {
					imgNode.setAttrs({
						x: this.btnStrikeImgX || sx,
						y: this.btnStrikeImgY || sy,
						width: width,
						height: width,
						listening: false,
						visible: !marked,
					});
					this.kBtnsImgs[ -1 ][marked] = imgNode;
					layer.add(imgNode);
				});
			}
			const strBtn = new Konva.Rect({
				x,
				y,
				width: width,
				height: width,
				fill: 'transparent',
			});
			layer.add( strBtn );
			this.kBtns[ -1 ] = strBtn;

		} else {

			// Default: Selbst darstellen
			const kClipGroup = new Konva.Group({	// Clip Gruppe
				x: x + radius,
				y: y + radius,
				clipFunc: (ctx) => ctx.arc(0, 0, radius, 0, Math.PI * 2, false),
				// clipFunc: (ctx) => ctx.rect( -radius, -radius, radius*2, radius*2, false),
			})
			const mag = radius * 0.85;
			const zoom = mag / this.dotRadius;
			kClipGroup.add( new Konva.Circle({		// Linker Kreis
				x: -radius,
				y: 0,
				radius: mag,
				fill: this.colorDefs[1],
			}));
			kClipGroup.add( new Konva.Circle({		// Rechter Kreis
				x: radius,
				y: 0,
				radius: mag,
				fill: this.colorDefs[2] ?? this.colorDefs[1],
			}));
			kClipGroup.add(
				this.strikedFill ?
					new Konva.Rect({
						x: -radius,
						y: -this.strikedFillHeight * zoom / 2,
						width: 2*radius,
						height: this.strikedFillHeight * zoom,
						stroke: this.strikedColor,
						strokeWidth: this.strikedWidth * zoom,
						fill: this.strikedFillColor,
						opacity: this.strikedFillOpacity100/100,
					}) :
					new Konva.Line({
						points: [ -radius, 0, +radius, 0 ],
						stroke: this.strikedColor,
						strokeWidth: this.strikedWidth * zoom,
						opacity: this.strikedOpacity100/100,
					})
			);
			layer.add(kClipGroup);
			const strBtn = new Konva.Circle({
				x: x + radius,
				y: y + radius,
				radius,
				stroke: this.btnNormalColor,
				strokeWidth: this.btnNormalWidth,
			});
			layer.add( strBtn );
			this.kBtns[ -1 ] = strBtn;
		}

		// Löschen-Button
		const sp = this.btnSpace + ( this.btnStrikeImgWidth || 2*radius );
		x = this.btnDelImgX || ( x + ( this.btnDir=='horizontal' ? sp : 0 ) );
		y = this.btnDelImgY || ( y + ( this.btnDir!='horizontal' ? sp : 0 ) );
		const shrink = maxStrokeWidth*1.2;

		if ( this.btnDelImg && this.btnDelImgMarkedSrc && this.btnDelImgSrc ) {

			// Images nehmen
			const width = this.btnDelImgWidth || ( 2*radius + maxStrokeWidth );
			const sx = x, sy = y;
			this.kBtnsImgs[ 0 ] = [];
			for ( let marked=0; marked<2; marked++ ) {
				const img = this[ marked ? "btnDelImgMarkedSrc" : "btnDelImgSrc" ];
				Konva.Image.fromURL( img, (imgNode) => {
					imgNode.setAttrs({
						x: this.btnDelImgX || sx,
						y: this.btnDelImgY || sy,
						width: width,
						height: width,
						listening: false,
						visible: !marked,
					});
					this.kBtnsImgs[ 0 ][marked] = imgNode;
					layer.add(imgNode);
				});
			}
			const trBtn = new Konva.Rect({
				x,
				y,
				width: width,
				height: width,
				fill: 'transparent',
			});
			layer.add( trBtn );
			this.kBtns[ 0 ] = trBtn;

		} else {

			// Default: Selbst darstellen
			Konva.Image.fromURL(trashIcon, (trashNode) => {
				const width = this.btnDelImgWidth || ( 2*radius - shrink );
				trashNode.setAttrs({
					x: x + shrink/2,
					y: y + shrink/2,
					width: width,
					height: width,
					listening: false,
				});
				layer.add(trashNode);
			});
			const trBtn = new Konva.Circle({
				x: x + radius,
				y: y + radius,
				radius,
				stroke: this.btnNormalColor,
				strokeWidth: this.btnNormalWidth,
				fill: 'transparent',
			});
			layer.add( trBtn );
			this.kBtns[ 0 ] = trBtn;
		}
	}

	renderButtons () {
		for ( let idx = -1; idx < this.colorDefs.length; idx++ ) {
			const marked = idx == this.currColor;
			if ( Array.isArray(this.kBtnsImgs[idx]) ) {
				this.kBtnsImgs[idx].forEach( (k,i) => {
					if ( !!i === marked ) {
						k.show();
					} else {
						k.hide();
					}
				})
			} else {
				const kBtn = this.kBtns[idx];
				kBtn.stroke( marked ? this.btnMarkedColor : this.btnNormalColor );
				kBtn.strokeWidth( marked ? this.btnMarkedWidth : this.btnNormalWidth );
			}
		};
		this.layer.batchDraw();
	}

	///////////////////////////////////

	initInteractivity () {

		if ( this.readonly ) {
			return
		}

		// Buttons ?
		if ( this.draggable ) {
			this.drag = {
				color: null,
			}
		}
		if ( this.kBtns ) {
			for ( let idx = -1; idx < this.colorDefs.length; idx++ ) {
				const kBtn = this.kBtns[idx];

				kBtn.on('click tap', (e) => {
					if ( ignoreEvent(e) ) {
						return
					}
					e.cancelBubble = true;

					if ( this.currColor == idx ) {
						this.base.postLog( 'btnColorClickedSame', { color: idx } );
						return
					}
					this.base.postLog( 'btnColorClicked', { color: idx } );
					this.setColor(idx);
					this.renderButtons();
				});

				// Drag Buttons
				if ( this.draggable && idx >= 0 ) {
					kBtn.draggable( true );
					kBtn.on('dragstart', (e) => {
						this.dragStart(e, idx);
					});
				}
			}
		}

		// click point
		this.dots.forEach( (dotRow, row) => {
			dotRow.forEach( (dot, col) => {
				if ( !this.dotReadonly[row][col] ) {
					dot.k.on('click tap', (e) => {
						if ( ignoreEvent(e) ) {
							return
						}
// console.log("=========== dot clicked",row,col)
						e.cancelBubble = true;
						this.clickDot( row, col );
					});
					if ( this.draggable ) {
						dot.k.draggable( true );
						dot.k.on('dragstart', (e) => {
// console.log("+++ will dragstart",this.dotColors[0],row, col)
							this.dragStart(e, null, row, col);
						})
					}
				}
			});
		});

		// Rechteck ziehen
		this.stage.on('mousedown touchstart', this.h_mousedown.bind(this) );
		this.stage.on('mousemove touchmove', this.h_mousemove.bind(this) );
		this.stage.on('mouseup touchend', this.h_mouseup.bind(this) );

		this.stage.on('mouseleave', (e) => {
			if ( this.drawStart !== null ) {
				this.h_mouseup(e);
				this.base.postLog( 'rectMarkedLeftStage' );
			}
		});

		this.stage.on('click tap', (e) => {
			if ( ignoreEvent(e) || this.drawMoved ) {
				return
			}

			this.base.postLog( 'clickedNothing', getPosOfEvent( this.stage, e ) );
		});
	}

	h_mousedown (e) {
// console.log("-------down")
		if ( ignoreEvent(e) ) {
			return
		}
		e.cancelBubble = true;
		this.drawStart = getPosOfEvent( this.stage, e );
		this.drawMoved = false;
		// aktuelle dotColors kopieren
		this.lastDotStriked = this.copyColors( this.dotStriked );
		if ( this.currColor>=0 ) {
			this.lastDotColors = this.copyColors( this.dotColors);
		}
// console.log("!!!!!",this.dotColors[0],this.lastDotColors[0]);
	}

	h_mousemove (e) {
		if ( !this.drawStart || ignoreEvent(e) ) {
			return
		}
// console.log("-------move",this.dotColors[0],this.lastDotColors[0])
		e.cancelBubble = true;

		const cRect = this.getCurrRect(e);
		// Cursor jemals bewegt?
		if ( !this.drawMoved ) {
			this.drawMoved = cRect.x0 !== cRect.x1 || cRect.y0 !== cRect.y1;
		}
		this.showCurrentRect( cRect );
	}

	h_mouseup (e) {
		if ( ignoreEvent(e) || !this.drawStart ) {
			return
		}
		e.cancelBubble = true;

		this.delRect();
		if ( !this.drawMoved ) {
			return;
		}

		if ( this.lastIdx ) {
			this.base.postLog( 'rectMarked', {
				r0: this.lastIdx.r0+1,
				r1: this.lastIdx.r1+1,
				c0: this.lastIdx.c0+1,
				c1: this.lastIdx.c1+1,
				color: this.currColor,
			});
			this.lastIdx = null;
		} else {
			this.base.postLog( 'rectMarkedNothing' );
		}
		this.logAllCnts();

		this.base.sendChangeState( this );	// send changeState & score
	}

	// AB HIER Klicken / Rechteck markieren

	getCurrRect (e) {
		const newPos = getPosOfEvent( this.stage, e );
		const drawStart = this.drawStart;
		return {
			x0: Math.min(drawStart.x, newPos.x),
			x1: Math.max(drawStart.x, newPos.x),
			y0: Math.min(drawStart.y, newPos.y),
			y1: Math.max(drawStart.y, newPos.y),
		}
	}

	delRect () {
		if ( this.kMarkRect ) {
			this.kMarkRect.destroy();
			this.kMarkRect = null;
		}
		this.drawStart = null;
	}

	revertMarkedRect () {
		if ( this.drawStart !== null ) {
			this.delRect();

			// Restore strikes
			const lastIdx = this.lastIdx;
// console.log("???????",lastIdx,this.lastDotColors[0])
			if ( lastIdx ) {
				let changed = false;
				for ( let row=lastIdx.r0; row<=lastIdx.r1; row++ ) {
					let changedRow = false;
					const dotStriked = this.dotStriked[row];
					const lastDotStriked = this.lastDotStriked[row];
					for ( let col=lastIdx.c0; col<=lastIdx.c1; col++ ) {
						if ( dotStriked[col] !== lastDotStriked[col] ) {
							dotStriked[col] = lastDotStriked[col];
							changedRow = true;
						}
					}
					if ( changedRow ) {
						this.renderStrikedRow( row );
						changed = true;
					}
				}
				if ( changed ) {
					this.hasStriked = this.getHasStriked();
				}
				// Restore Colors
				if ( this.currColor>=0 ) {
					for ( let row=lastIdx.r0; row<=lastIdx.r1; row++ ) {
						const dotColors = this.dotColors[row];
						const lastDotColors = this.lastDotColors[row];
						for ( let col=lastIdx.c0; col<=lastIdx.c1; col++ ) {
								if ( dotColors[col] !== lastDotColors[col] ) {
									dotColors[col] = lastDotColors[col];
									this.dots[row][col].k.fill( this.colorDefs[ lastDotColors[col] ] );
									changed = true;
								}
							}
						}
				}
				this.lastIdx = null;
				if ( changed ) {
					this.layer.batchDraw();
				}
			}
		}
	}

	clickDot ( row, col, color=this.currColor, log=true ) {
// console.log("====== clickDot",color,row,col)
		let same = true;
		if ( color<0 ) {
			if ( !this.dotStriked[row][col] && this.dotColors[row][col]>0 ) {
				same = false;
				this.dotStriked[row][col] = true;
				this.hasStriked = true;
				this.renderStrikedRow(row);
			}
		} else {
			if ( this.dotColors[row][col] !== color ) {
				same = false;
				this.dotColors[row][col] = color;
				this.dots[row][col].k.fill( this.colorDefs[color] );
			}
			if ( this.dotStriked[row][col] ) {
				same = false;
				this.dotStriked[row][col] = false;
				this.hasStriked = this.getHasStriked();
				this.renderStrikedRow(row);
			}
		}

		if ( log ) {
			this.base.postLog( same ? 'dotClickedSame' : 'dotClicked', {
				c: col+1,
				r: row+1,
				color: this.currColor
			});
			this.logAllCnts();
			this.base.sendChangeState( this );	// send changeState & score
		}
	}

	// Gibt index der Zeilen/Spalten zurück, die in dem Rechteck (Koordinaten) liegen
	getRowsCols (rect) {
		const r = this.dotRadius;
		const cols = this.cols-1;
		const rows = this.rows-1;
		const dots = this.dots;
		const dots0 = dots[0];

		// Außerhalb der Dots?
		if ( rect.x1 < dots0[0].x-r || rect.x0 > dots0[cols].x+r ||
			rect.y1 < dots0[0].y-r || rect.y0 > dots[rows][0].y+r ) {

			return null;
		}

		// Start/End col und row setzen
		let c0, c1, r0, r1;
		for ( c0=0; rect.x0>dots0[c0].x+r && c0<cols; c0++ );
		for ( c1=cols; rect.x1<dots0[c1].x-r && c1>0; c1-- );
		for ( r0=0; rect.y0>dots[r0][0].y+r && r0<rows; r0++ );
		for ( r1=rows; rect.y1<dots[r1][0].y-r && r1>0; r1-- );

		return { c0, c1, r0, r1 }
	}

	// Zeichnet Rechteck mit Koordinaten rect und setzt Punkte darin auf die aktuelle Farbe
	// Zuletzt anders gesetzte Punkte werden wieder zurückgesetzt
	showCurrentRect ( rect ) {
		const idx = this.getRowsCols( rect );

		// Rechteck zeichnen
		if ( !this.kMarkRect ) {
			this.kMarkRect = new Konva.Rect({
				x: rect.x0,
				y: rect.y0,
				width: rect.x1-rect.x0,
				height: rect.y1-rect.y0,
				stroke: this.currColor ? null : 'black',
				strokeWidth: this.currColor ? 0 : 1,
				fill: this.currColor<0 ? 'grey' : this.colorDefs[ this.currColor ],
				opacity: this.currColor ? 0.15 : 0.3,
			});
			this.layer.add( this.kMarkRect );
		} else {
			this.kMarkRect.x( rect.x0 );
			this.kMarkRect.y( rect.y0 );
			this.kMarkRect.width( rect.x1-rect.x0 );
			this.kMarkRect.height( rect.y1-rect.y0 );
		}

		// Noch keine Punkte gefärbt & jetzt nichts zu färben?
		if ( !idx && !this.lastIdx ) {
			return
		}
		// Keine Änderung zum letzten Mal?
		if ( idx && this.lastIdx &&
			idx.c0 === this.lastIdx.c0 && idx.c1 === this.lastIdx.c1 &&
			idx.r0 === this.lastIdx.r0 && idx.r1 === this.lastIdx.r1 ) {

			return
		}

		const cmpLast = this.lastIdx || idx;
		const cmpCurr = idx || this.lastIdx;
		const colFrom = Math.min( cmpLast.c0, cmpCurr.c0 );
		const colTo = Math.max( cmpLast.c1, cmpCurr.c1 );
		const rowFrom = Math.min( cmpLast.r0, cmpCurr.r0 );
		const rowTo = Math.max( cmpLast.r1, cmpCurr.r1 );

		let strikeChanged = false;
		for ( let row=rowFrom; row<=rowTo; row++ ) {
			let renderStrikeRow = false;
			const setNewRow = ( idx && row>=idx.r0 && row<=idx.r1 );
			for ( let col=colFrom; col<=colTo; col++ ) {
				const setNew = ( setNewRow && col>=idx.c0 && col<=idx.c1 );

				let strike;
				if ( this.currColor<0 ) {
					// striken
					strike = setNew && this.dotColors[row][col]>0 ? true : this.lastDotStriked[row][col];
				} else {
					// normale Farbe setzen
					const color = setNew ? this.currColor : this.lastDotColors[row][col];
					if ( color !== this.dotColors[row][col] && !this.dotReadonly[row][col] ) {
						this.dotColors[row][col] = color;
// console.log("000000",this.dotColors[0],this.lastDotColors[0]);
// console.trace();
						this.dots[row][col].k.fill( this.colorDefs[color] );
					}
					strike = setNew ? false : this.lastDotStriked[row][col];
				}
				if ( strike !== this.dotStriked[row][col] ) {
					this.dotStriked[row][col] = strike;
					renderStrikeRow = true;
				}
			}
			if ( renderStrikeRow ) {
				this.renderStrikedRow(row);
				strikeChanged = true;
			}
		}
		if ( strikeChanged ) {
			this.hasStriked = this.getHasStriked();
		}

		this.lastIdx = idx;
	}

	///////////////////////////////////

	// AB HIER DragNDrop

	dragStart (e, color, row=null, col=null ) {
		e.cancelBubble = true;
// console.log("===== dragstart",color,row, col,this.dotColors[row])

		const dragVars = this.drag;
		const startPos = getPosOfEvent( this.stage, e );
		if ( row===null && this.kBtnsImgs[color] ) {
			// offs korrigieren bei Imgs
			const width = this.kBtnsImgs[color][0].width() / 2;
			startPos.x -= width;
			startPos.y -= width;
		}
		dragVars.offsX = startPos.x - e.target.x();
		dragVars.offsY = startPos.y - e.target.y();
		if ( row===null && this.kBtnsImgs[color] ) {
			// offs korrigieren bei Imgs
			const width = this.kBtnsImgs[color][0].width() / 2;
			dragVars.offsX -= width;
			dragVars.offsY -= width;
		}
		dragVars.lastCol = null;
		dragVars.startCol = null;
		dragVars.orgStriked = false;

		if ( row===null ) {
			// Button
			this.kBtns[color].stopDrag();
			this.base.postLog( 'btnColorDragStart', { color } );
			if ( this.currColor!==color ) {
				this.setColor(color);
				this.renderButtons();
			}
		} else {
			// Dot
			this.dots[row][col].k.stopDrag();
// console.log("111111",this.dotColors[row])
			this.revertMarkedRect();
// console.log("222222",this.dotColors[row])
			color = this.dotColors[row][col];

			this.base.postLog( 'dotDragStart', { r:row+1, c:col+1, color } );
			this.lastDotColors[row][col] = 0; // gedraggter Dot wird als gelöscht wieder hergestellt (wenn Drop irgendwo)
			this.dotColors[row][col] = 0;
			if ( this.dotStriked[row][col] ) {
				dragVars.orgStriked = true;
				this.lastDotStriked[row][col] = false;
				this.dotStriked[row][col] = false;
				this.renderStrikedRow(row);
			}
			dragVars.startCol = col;
			dragVars.startRow = row;
		}

		this.lastDotStriked = this.copyColors( this.dotStriked );
		if ( this.currColor>=0 ) {
			this.lastDotColors = this.copyColors( this.dotColors);
		}
		dragVars.color = color;

		// Dragged KonvaObj
		const kDragObj = new Konva.Circle({
			...this.dotAttrs,
			x: startPos.x - dragVars.offsX,
			y: startPos.y - dragVars.offsY,
			fill: this.colorDefs[ color ],
			opacity: 0.5,
		});
		dragVars.k = kDragObj;
		this.layer.add( kDragObj );
		this.layer.batchDraw();

		kDragObj.on( 'dragmove', this.dragMove.bind(this) );
		kDragObj.on( 'dragend', this.dragEnd.bind(this) );
		kDragObj.startDrag();
	}

	dragEnter ( row, col ) {
		const oldColor = this.dotColors[row][col];
		const same = this.drag.color===oldColor && !this.lastDotStriked[row][col];
		this.base.postLog( 'dragMoveOverDot'+( same ? 'Unchanged' : '' ), {
			c: col+1,
			r: row+1,
			oldColor,
			dragColor: this.drag.color,
		} );
		if ( !same ) {
			this.clickDot( row, col, this.drag.color, false );
		}
	}

	dragLeave ( row, col ) {
		const oldColor = this.lastDotColors[row][col];
		const same = this.drag.color===oldColor && !this.lastDotStriked[row][col];
		this.base.postLog( 'dragLeaveDot'+( same ? 'Unchanged' : '' ), {
			c: col+1,
			r: row+1,
			oldColor,
			dragColor: this.drag.color,
		} );
		if ( !same ) {
			this.dotColors[row][col] = oldColor;
			this.dots[row][col].k.fill(this.colorDefs[ oldColor ] );
			if ( this.lastDotStriked[row][col] ) {
				this.dotStriked[row][col] = true;
				this.hasStriked = true;
				this.renderStrikedRow(row);
			}
		}
// console.log("====== dragleave",this.dotColors[0])
	}

	dragMove (e) {
		const pos = getPosOfEvent( this.stage, e );
		if ( pos.x<0 || pos.y<0 || pos.x>=this.stage.width() || pos.y>=this.stage.height() ) {
			this.drag.k.stopDrag();
			return;
		}

		// Element-Pos mit Hover ermitteln
		let col=null, row;
		const dots = this.dots;
		const radius = this.dotRadius;
		if ( pos.y >= dots[0][0].y-radius && pos.x >= dots[0][0].x-radius ) {
			const lastDot = dots[ this.rows-1 ][ this.cols-1 ];
			if ( pos.y <= lastDot.y+radius && pos.x <= lastDot.x+radius ) {
				for ( row=0; pos.y > dots[row][0].y+radius; row++ );
				for ( col=0; pos.x > dots[row][col].x+radius; col++ );
				if ( Math.pow( pos.x-dots[row][col].x, 2 ) + Math.pow( pos.y-dots[row][col].y, 2 ) > this.radius*this.radius ) {
					col=null;
				}
			}
		}

		// Enter/Leave Handler rufen?
		if ( col !== this.drag.lastCol || row !== this.drag.lastRow ) {
			if ( this.drag.lastCol !== null ) {
				this.dragLeave( this.drag.lastRow, this.drag.lastCol );
			}
			if ( col !== null ) {
				this.dragEnter( row, col );
			}
			this.drag.lastCol = col;
			this.drag.lastRow = row;
		}
	}

	dragEnd (e) {
		const droppedSame = this.drag.startCol!==null && this.drag.lastCol === this.drag.startCol && this.drag.lastRow === this.drag.startRow;

		// Original war striked und wieder gedraggt?
		if ( this.drag.orgStriked && droppedSame ) {
			// Striked wieder herstellen
			this.dotStriked[ this.drag.lastRow ][ this.drag.lastCol ] = true;
			this.renderStrikedRow( this.drag.lastRow );
		}
// console.log("===== dragend",this.drag.lastRow,this.drag.lastCol,this.dotColors[0])

		if ( this.drag.lastCol===null ) {
			this.base.postLog( 'droppedNowhere' );
		} else {
			this.base.postLog( droppedSame ? 'droppedSamePos' : 'droppedPos', {
				c: this.drag.lastCol+1,
				r: this.drag.lastRow+1,
				color: this.drag.color
			})
		}
		this.logAllCnts();
		this.base.sendChangeState(this);

		// Dragging beenden
		this.drag.color = null;
		this.drag.k.remove();
	}

	///////////////////////////////////

	renderStrikedRow ( row ) {
		const kGroupRow = this.kStrikedGroups[row];
		const dotStrikedRow = this.dotStriked[row];

		const drawStrikedLine = ( colStart, colEnd ) => {
			const dotStart = this.dots[row][colStart];
			const dotEnd = this.dots[row][colEnd];

			let padBefore = this.dotMarginX;
			if ( colStart===0 ) {
				padBefore = Math.min( padBefore, this.framePaddingX );
			} else if ( this.sepEveryX && colStart%this.sepEveryX===0 ) {
				padBefore = Math.min( padBefore, this.framePaddingX+this.sepSpaceX );
			}
			let padAfter = this.dotMarginX;
			if ( colEnd===this.cols-1 ) {
				padAfter = Math.min( padAfter, this.framePaddingX );
			} else if ( this.sepEveryX && (colEnd+1)%this.sepEveryX===0 ) {
				padAfter = Math.min( padAfter, this.framePaddingX+this.sepSpaceX );
			}

			kGroupRow.add(
				this.strikedFill ?
				new Konva.Rect({
					x: dotStart.x - this.dotRadius - ( this.dotWidth + padBefore )/2,
					y: dotStart.y - this.strikedFillHeight/2,
					width: dotEnd.x-dotStart.x + 2*this.dotRadius + this.dotWidth + ( padBefore + padAfter )/2,
					height: this.strikedFillHeight,
					stroke: this.strikedColor,
					strokeWidth: this.strikedWidth,
					fill: this.strikedFillColor,
					opacity: this.strikedFillOpacity100 / 100,
					listening: false,
				}) :
				new Konva.Line({
					points: [
						dotStart.x - this.dotRadius - ( this.dotWidth + padBefore )/2, dotStart.y,
						dotEnd.x + this.dotRadius + ( this.dotWidth + padAfter )/2, dotEnd.y,
					],
					stroke: this.strikedColor,
					strokeWidth: this.strikedWidth,
					opacity: this.strikedOpacity100 / 100,
					listening: false,
				})
			);
		};

		// Alte Striked-Linien entfernen
		kGroupRow.destroyChildren();

		// Neue Striked-Linien zeichnen
		let begin = null;
		for ( let col = 0; col < this.cols; col++ ) {
			if ( dotStrikedRow[col] ) {
				if ( begin === null ) {
					begin = col;
				}
			} else {
				if ( begin !== null ) {
					// Linie von begin bis col-1 zeichnen
					drawStrikedLine( begin, col-1 );
					begin = null;
				}
			}
		}
		if ( begin !== null ) {
			// Linie von begin bis Ende zeichnen
			drawStrikedLine( begin, this.cols-1 );
		}

		this.layer.batchDraw();
	}

	getHasStriked () {
		return this.dotStriked.some( dotRow => dotRow.some( v => v ) );
	}

	copyColors (dotColors=this.dotColors) {
		return dotColors.map( dotRow => [...dotRow] );
	}

	getColorCnt ( searchColor ) {
		// Wieviele Blättchen haben searchColor [ -1..length ]
		const cntArray = searchColor<0 ? this.dotStriked : this.dotColors;
		const colVal = searchColor<0 ? ( col => +col ) : ( col => col === searchColor ? 1 : 0 );
		const r = cntArray.reduce( (acc, dotRow) => {
			return acc + dotRow.reduce( (acc, color) => {
				return acc + colVal(color);
			}, 0 )
		}, 0 );
		return r;
	}

	getColorCntStriked ( searchColor, striked=null, onlyRow=null ) {
		// Wieviele Blättchen haben Farbe searchColor [ 0..length ]
		// und sind dabei striked true/false
		let r = 0;
		for ( let row = ( onlyRow ?? this.rows-1 ); row >= ( onlyRow ?? 0 ); row-- ) {
			const rowColors = this.dotColors[row];
			const rowStrikes = this.dotStriked[row];
			for ( let col = this.cols-1; col>=0; col-- ) {
				if ( rowColors[col] === searchColor && ( striked===null || striked===rowStrikes[col] ) ) {
					r++;
				}
			}
		}
		return r;
	}

	logNewCnt (reset=0) {
		const newCnt = this.getColorCnt( this.currColor );
		if ( newCnt !== this.lastCnt || reset ) {
			this.base.postLog( reset ? 'cntCurrentColor' : 'newCntCurrentColor', { cnt: newCnt } );
			this.lastCnt = newCnt;
		}
	}
	logAllCnts () {
		const log = {};
		for ( let idx=-1; idx<this.colors.length; idx++ ) {
			log[ idx ] = this.getColorCnt( idx );
		}
		this.base.postLog( 'cntAllColors', log );
	}

	///////////////////////////////////

	startButtonListener () {
		this.base.startListeningToCallEPFOp( ( cmd, p1 ) => {
			if ( cmd === 'setColorIdx' ) {
				this.setColor(p1);
			}
		});
	}

	setColor ( idx ) {
		idx = parseInt( idx );
		if (  Number.isNaN(idx) || idx < -1 || idx >= this.colorDefs.length ) {
			return
		}
		this.currColor = idx;
		this.base.postLog( 'colorChanged', { idx, color: idx, colorHtml: this.colorDefs[idx] } );
		this.logAllCnts();
	}

	///////////////////////////////////

	getState () {
		const state = {
			c: this.dotColors,
		};
		if ( this.hasStriked ) {
			state.s = this.dotStriked.map( row => row.map( v => +v ) );
		}
		return JSON.stringify(state)
	}

	setState ( state ) {
		try {
			const saved = JSON.parse( state );
			this.dotColors = saved.c;
			if ( saved.s ) {
				this.dotStriked = saved.s.map( row => row.map( v => !!v ) );
				this.hasStriked = true;
			} else {
				this.hasStriked = false;
			}
			this.initScene();
		} catch (e) {
			console.error(e);
		}

		setStatePostProc(this);
	}

	getChState () {
		return this.hasStriked ? [ this.dotColors, this.dotStriked ] : this.dotColors;
	}

	// Check if User made changes
	getDefaultChangeState () {
		return !object_equals( this.getChState(), this.initData );
	}

}
