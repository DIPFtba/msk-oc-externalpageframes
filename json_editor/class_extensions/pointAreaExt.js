import Konva from 'konva';
import { mergeDeep, getPosOfEvent, object_equals, setStatePostProc, ignoreEvent } from '../../libs/common'
import { addScoring } from "../common";

//
// Ähnlich wie pointArea, aber ohne Toolbar und die gewählten "Rechtecke" bleiben nicht dargestellt
// Die Farben werden von außen gesetzt
//

//		window.postMessage( JSON.stringify( [ 'setColorIdx', 0 ] ), '*' );
//		window.postMessage( JSON.stringify( [ 'setColorIdx', 1 ] ), '*' );
//		window.postMessage( JSON.stringify( [ 'setColorIdx', 2 ] ), '*' );

export class pointAreaExtFromSchema {

	constructor ( base, opts = {}, addMods={} ) {

		base.regSendInitDone();
		base.incInitCnt();

		mergeDeep( /*Object.assign(*/ this/*, defaultOpts )*/, opts );

		this.base = base;
		const stage = base.stage;
		this.stage = stage;

		this.colors = [ this.bgColor, ...this.colors ];
		this.dotColors = Array.from({ length: this.rows }, () => Array(this.cols).fill(0));
		this.dotReadonly = Array.from({ length: this.rows }, () => Array(this.cols).fill(false));
		this.setColor(0);

		// preSets eintragen
		opts.preSets.forEach( (preSet) => {
			const color = parseInt( preSet.color );
			if ( color > 0 && color <= this.colors.length ) {

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
						}
					});
				});

			}
		});

		this.initScene();
		this.initInteractivity();
		this.startButtonListener();

		addScoring( this, opts, addMods.Parser );

		this.initData = this.copyColors( this.getChState() );
		this.base.sendChangeState( this );	// init & send changeState & score

		base.decInitCnt();
	}

	scoreDefType () {
		return 'integer';
	}

	scoreDef () {
		const res = {};
		if ( this.readonly ) {
			return res;
		}

		const pref = this.dataSettings?.variablePrefix;
		if ( pref ) {
			this.colors.forEach( (color, i) => {
				res[`V_Input_${pref}_Cnt_${i}`] = this.getColorCnt(i);
			});
		}

		if ( this.computeScoringVals ) {
			this.computeScoringVals( res );
		}

		return res;
	}

	///////////////////////////////////

	initScene () {

		document.body.style.cursor = this.readonly ? 'auto' : 'pointer';

		if ( this.layer ) {
			this.layer.destroyChildren();
		} else {
			this.layer = new Konva.Layer();
			this.stage.add( this.layer );
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
		this.layer.add( new Konva.Rect({
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
				this.layer.add( new Konva.Line({
					points: [sepX, this.y, sepX, this.y+height],
					stroke: this.sepColor,
					strokeWidth: this.sepWidth,
				}));
			}
		}
		if ( sepYCnt > 0 ) {
			for ( let y=sepYCnt; y>0; y-- ) {
				const sepY = y0 + y*sepYFull - sepYHeight/2;
				this.layer.add( new Konva.Line({
					points: [this.x, sepY, this.x+width, sepY],
					stroke: this.sepColor,
					strokeWidth: this.sepWidth,
				}));
			}
		}

		// Punkte anlegen
		this.dots = [];

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
					x, y,
					radius: this.dotRadius,
					stroke: this.dotColor,
					strokeWidth: this.dotWidth,
					fill: this.colors[color],
				});
				this.layer.add( k );

				const dot = {
					x, y,
					k,
				};
				dotRow.push( dot );
			}

			this.dots.push( dotRow );
		}

		this.layer.draw();
	}

	///////////////////////////////////

	initInteractivity () {

		if ( this.readonly ) {
			return
		}

		// click point
		this.dots.forEach( (dotRow, row) => {
			dotRow.forEach( (dot, col) => {
				if ( !this.dotReadonly[row][col] ) {
					dot.k.on('click tap', (e) => {
						if ( ignoreEvent(e) ) {
							return
						}
						e.cancelBubble = true;
						this.clickDot( row, col );
					});
				}
			});
		});

		// Rechteck ziehen
		const getCurrRect = (e) => {
			const newPos = getPosOfEvent( this.stage, e );
			return {
				x0: Math.min(this.drawStart.x, newPos.x),
				x1: Math.max(this.drawStart.x, newPos.x),
				y0: Math.min(this.drawStart.y, newPos.y),
				y1: Math.max(this.drawStart.y, newPos.y),
			}
		}

		this.stage.on('mousedown touchstart', (e) => {
			if ( ignoreEvent(e) ) {
				return
			}
			e.cancelBubble = true;
			this.drawStart = getPosOfEvent( this.stage, e );
			// aktuelle dotColors kopieren
			this.lastDotColors = this.copyColors( this.dotColors);
		});
		this.stage.on('mousemove touchmove', (e) => {
			if ( ignoreEvent(e) || !this.drawStart ) {
				return
			}
			e.cancelBubble = true;

			this.showCurrentRect( getCurrRect(e) );
		});
		this.stage.on('mouseup touchend', (e) => {
			if ( ignoreEvent(e) || !this.drawStart ) {
				return
			}
			e.cancelBubble = true;

			if ( this.kMarkRect ) {
				this.kMarkRect.destroy();
				this.kMarkRect = null;
			}
			if ( this.lastIdx ) {
				this.base.postLog( 'rectMarked', {
					y0: this.lastIdx.r0+1,
					y1: this.lastIdx.r1+1,
					x0: this.lastIdx.c0+1,
					x1: this.lastIdx.c1+1,
					color: this.currColor,
				});
				this.lastIdx = null;
				this.logNewCnt();
			}
			this.drawStart = null;

			this.base.sendChangeState( this );	// send changeState & score
		});

	}

	clickDot ( row, col ) {
		this.dotColors[row][col] = this.currColor;
		this.dots[row][col].k.fill( this.colors[this.currColor] );

		this.base.postLog( 'dotClicked', { y:row+1, x:col+1, color: this.currColor } );
		this.logNewCnt();
		this.base.sendChangeState( this );	// send changeState & score
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
				fill: this.colors[ this.currColor ],
				opacity: this.currColor ? 0.15 : 0.3,
			});
			this.layer.add( this.kMarkRect );
		} else {
			this.kMarkRect.x( rect.x0 );
			this.kMarkRect.y( rect.y0 );
			this.kMarkRect.width( rect.x1-rect.x0 );
			this.kMarkRect.height( rect.y1-rect.y0 );
		}

		// Noch keine Puntke gefärbt jetzt nichts zu färben?
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

		for ( let row=rowFrom; row<=rowTo; row++ ) {
			for ( let col=colFrom; col<=colTo; col++ ) {
				const color = ( idx && row>=idx.r0 && row<=idx.r1 && col>=idx.c0 && col<=idx.c1 ) ?
								this.currColor : this.lastDotColors[row][col];
				if ( color !== this.dotColors[row][col] && !this.dotReadonly[row][col] ) {
					this.dotColors[row][col] = color;
					this.dots[row][col].k.fill( this.colors[color] );
				}
			}
		}

		this.lastIdx = idx;
	}

	copyColors (dotColors=this.dotColors) {
		return dotColors.map( dotRow => [...dotRow] );
	}

	getColorCnt ( searchColor ) {
		const r = this.dotColors.reduce( (acc, dotRow) => {
			return acc + dotRow.reduce( (acc, color) => {
				return acc + (color === searchColor ? 1 : 0);
			}, 0 )
		}, 0 );
		return r;
	}

	logNewCnt (reset=0) {
		const newCnt = this.getColorCnt( this.currColor );
		if ( newCnt !== this.lastCnt || reset ) {
			this.base.postLog( reset ? 'cntCurrentColor' : 'newCntCurrentColor', { cnt: newCnt } );
			this.lastCnt = newCnt;
		}
	}

	///////////////////////////////////

	startButtonListener () {
		window.addEventListener(
			"message",
			(event) => {
// console.log('#################',event.data,event.origin)
				try {
					const [ cmd, p1 ] = JSON.parse(event.data);
					switch ( cmd ) {
						case 'setColorIdx':
							this.setColor(p1);
							break;
					}
				} catch (e) {}
			},
			false );
	}

	setColor ( idx ) {
		if ( idx < 0 || idx >= this.colors.length ) {
			return
		}
		this.currColor = idx;
		this.base.postLog( 'colorChanged', { idx, color: this.colors[idx] } );
		this.logNewCnt(1);
	}

	///////////////////////////////////

	getState () {
		const state = this.dotColors;
		return JSON.stringify(state)
	}

	setState ( state ) {
		try {
			const saved = JSON.parse( state );
			this.dotColors = saved;
			this.initScene();
		} catch (e) {
			console.error(e);
		}

		setStatePostProc(this);
	}

	getChState () {
		return this.dotColors;
	}

	// Check if User made changes
	getDefaultChangeState () {
		return !object_equals( this.getChState(), this.initData );
	}

}
