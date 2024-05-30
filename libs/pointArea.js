import { getPosOfEvent, mergeDeep, object_equals, setStatePostProc } from './common'

import Konva from 'konva/lib/Core'
import { Rect } from 'konva/lib/shapes/Rect'
import { Circle } from 'konva/lib/shapes/Circle'
import { Line } from 'konva/lib/shapes/Line'

import erasericon from './img/erasericon.png'
import clearicon from './img/clearicon.png'
import { iconBar } from './iconBar'

export class pointArea {

	constructor ( base, opts = {} ) {

		['x','y'].forEach( o => {
			if ( !( o in opts ) ) {
				throw( `pointArea: parameter '${o}' not specified!` );
			}
		})
		if ( base.fsm && base.fsm.incInitCnt ) {
			base.fsm.incInitCnt();
		}

		// Defaults to opts
		const defaultOpts = {

			// // paintArea
			// x, y

			cols: 10,
			rows: 10,
			notMarkablePoints: 0,

			frameWidth: 1,
			frameColor: 'black',
			sepEvery: 5,
			sepSpace: 4,

			dotRadius: 5,
			dotDistance: 20,

			colors: [ 'black', 'red', '#f0f000', 'blue', '#00f000', 'violet' ],
			notMarkableOpacity: 0.25,
			notMarkableBackground: '#e8e8e8',

			iconBarDef: {
				width: 24,
				height: 24,
				framePadding: 2,
				spacing: 0,
				sticky: true,
				default: 0,

				icons: [{
					src: erasericon,
					cursor: `url(${erasericon}), auto`,
					on: () => {
						this.mode='erase';
					},
				},{
					src: clearicon,
					on: () => this.clearAll(),
				}],
			},

			colorRectOpacity: 0.2,
			colorRects: [
				// { x, y, w, h, cIdx }
			],
			newRect: null,

			kDots: [],

			readonly: 0,
		}
		mergeDeep( Object.assign( this, defaultOpts ), opts );
		this.base = base;
		const stage = base.stage;
		this.stage = stage;

		const layer = new Konva.Layer();
		stage.add( layer );
		this.layer = layer;

		// draw frame & seperators
		const calcWH = (cr) => cr*this.dotDistance + Math.floor( cr/this.sepEvery )*this.sepSpace;
		const width = calcWH(this.cols);
		this.width = width;
		const height = calcWH(this.rows);
		this.height = height;
		// background not markable Points (last this.notMarkablePoints)
		if ( this.notMarkablePoints ) {
			const coord = (xy,rc) => xy + rc*this.dotDistance + ( Math.floor( rc/this.sepEvery ) + 0.5 )*this.sepSpace
			const br = {
				// color: this.notMarkableBackground,
				fill: this.notMarkableBackground,
			}
			const p2 = Math.floor( this.notMarkablePoints / this.cols );
			const p2y = coord( this.y, this.rows - p2 );
			const p1 = this.notMarkablePoints % this.cols;
			if ( p1 ) {
				const p1x = coord( this.x, this.cols-p1 );
				const p1y = -0.5*this.sepSpace + coord( this.y, Math.floor( ( this.cols*this.rows - this.notMarkablePoints ) / this.cols ) );
				layer.add( new Konva.Rect({
					x: p1x,
					y: p1y,
					width: width-p1x+this.x,
					height: p2y-p1y,
					...br,
				}));
			}
			if ( p2 ) {
				layer.add( new Konva.Rect({
					x: this.x,
					y: p2y,
					width: width,
					height: height-p2y+this.y,
					...br,
				}));
			}
		}
		// frame
		const fr = {
			stroke: this.frameColor,
			strokeWidth: this.frameWidth,
		}
		layer.add( new Konva.Rect({
			x: this.x,
			y: this.y,
			width,
			height,
			...fr,
		}))
		// seperators
		const beg = (xy) => xy+this.sepEvery*this.dotDistance+this.sepSpace;
		const inc = this.sepEvery*this.dotDistance+this.sepSpace;
		for ( let x = beg(this.x); x<this.x+width; x += inc ) {
			layer.add( new Konva.Line({
				points: [ x, this.y, x, this.y+height ],
				...fr,
			}))
		}
		for ( let y = beg(this.y); y<this.y+height; y += inc ) {
			layer.add( new Konva.Line({
				points: [ this.x, y, this.x+width, y ],
				...fr,
			}))
		}

		// dost and rects
		this.dotGroup = new Konva.Group({});
		this.layer.add( this.dotGroup );
		this.drawAllDots();

		this.rectGroup = new Konva.Group({});
		this.layer.add( this.rectGroup );
		this.drawAllRects();

		stage.draw();

		// additional inits
		this.initData = this.getChState();
		this.base.sendChangeState( this );	// init & send changeState & score

		// iconBar
		if ( !this.iconBarDef.x ) {
			this.iconBarDef.x = this.x + this.width + 15;
			this.iconBarDef.y = this.y;
		}
		this.colors.forEach( (c,idx) => {
			if ( idx>0 ) {
				const margin = 4;
				this.iconBarDef.icons.splice( -2, 0, {
					kCreateFunc: (x,y) => {
						const cw = this.iconBarDef.width;
						const color = this.colors[ idx ];
						return new Konva.Rect({
							x: x+margin,
							y: y+margin,
							width: cw-2*margin,
							height: cw-2*margin,
							stroke: color,
							fill: color,
						})
					},
					on: () => {
						this.mode=idx;
					},
				})
			}
		})
		this.iconBar = new iconBar( stage, this.iconBarDef );

		// interactivity
		if ( !this.readonly ) {
			const fgLayer = new Konva.Layer();
			stage.add( fgLayer );
			const kNewRect = new Konva.Rect({
				opacity: this.colorRectOpacity,
			});
			fgLayer.add( kNewRect );

			let newRectStart;
			const calcDim = ( c1, c2 ) => {
				const x = Math.min( c1.x, c2.x );
				const y = Math.min( c1.y, c2.y );
				return {
					x,
					y,
					w: Math.max( c1.x, c2.x ) - x,
					h: Math.max( c1.y, c2.y ) - y,
				}
			}
			stage.on( 'mousedown touchstart', (ev) => {
				if ( typeof this.mode === 'number' ) {
					this.newRect = { cIdx: this.mode };
					newRectStart = getPosOfEvent( this.stage, ev );
					this.base.postLog( 'rectCreated', this.newRect );

					ev.cancelBubble = true;
				}
			})
			stage.on( 'mouseup touchend', (ev) => {
				if ( this.newRect ) {
					const dim = calcDim( newRectStart, getPosOfEvent( this.stage, ev ) );
					this.addNewRect( dim );

					kNewRect.setAttrs({
						width: null,
						height: null,
					});
					fgLayer.batchDraw();

					this.newRect = null;
					this.drawChangedDots();

					ev.cancelBubble = true;
				}
			})
			stage.on( 'mousemove touchmove', (ev) => {
				if ( this.newRect ) {
					const dim = calcDim( newRectStart, getPosOfEvent( this.stage, ev ) );
					Object.assign( this.newRect, dim );
					this.base.postLog( 'rectChanged', this.newRect );

					const col = this.colors[ this.newRect.cIdx ];
					kNewRect.setAttrs({
						x: dim.x, y: dim.y,
						width: dim.w, height: dim.h,
						stroke: col,
						fill: col,
					});
					fgLayer.batchDraw();

					this.drawChangedDots();
					ev.cancelBubble = true;
				}
			})
		}

		if ( base.fsm && base.fsm.decInitCnt ) {
			base.fsm.decInitCnt();
		}
	}

	///////////////////////////////////

	drawAllDots () {

		const rRects = Array.from( this.colorRects ).reverse();
		if ( this.newRect ) {
			rRects.unshift( this.newRect );
		}

		const kDots = this.kDots;
		let changed = 0;
		let colorSums = {};
		for ( let i=this.colors.length; i-->1; ) {
			colorSums[i] = 0;
		}

		const lastEditablePoint = this.cols*this.rows - this.notMarkablePoints;

		for ( let row=0; row<this.rows; row++ ) {

			if ( !Array.isArray( kDots[row] ) ) {
				kDots[row] = [];
			}

			for ( let col=0; col<this.cols; col++ ) {

				const coord = (xy,rc) => xy + (rc+0.5)*this.dotDistance + ( Math.floor( rc/this.sepEvery ) + 0.5 )*this.sepSpace
				const x = coord( this.x, col );
				const y = coord( this.y, row );
				const pointEditable = row*this.cols + col < lastEditablePoint;

				let kDot = kDots[row][col];
				if ( !kDot ) {
					kDot = new Konva.Circle({
						x, y,
						radius: this.dotRadius,
						opacity: pointEditable ? 1 : this.notMarkableOpacity,
						fill: this.colors[0],
						color: this.colors[0],
					});
					kDots[row][col] = kDot;
					this.dotGroup.add( kDot );
				}

				// search last Rect the dot is in
				const colRect = rRects.find( r => x>=r.x && x<=r.x+r.w && y>=r.y && y<=r.y+r.h );
				const colIdx = colRect ? colRect.cIdx : 0;
				const color = this.colors[ pointEditable ? colIdx : 0 ];
				if ( colIdx && pointEditable ) {
					colorSums[ colIdx ]++;
				}
				if ( kDot.stroke() != color ) {
					changed=1;
					kDot.setAttrs({
						fill: color,
						stroke: color,
					});
				}
			}
		}

		if ( changed && !object_equals( colorSums, this.reportedColorSums ) ) {
			if ( this.reportedColorSums ) {
				this.base.postLog( 'newColorSums', colorSums );
			}
			this.reportedColorSums = colorSums;
		}

		return changed;
	}

	drawChangedDots () {
		if ( this.drawAllDots() ) {
			this.layer.batchDraw();
		}
	}

	drawAllRects () {
		this.rectGroup.destroyChildren();

		this.colorRects.forEach( (r,idx) => {
			const col = this.colors[ r.cIdx ];
			const kRect = new Konva.Rect({
				x: r.x,
				y: r.y,
				width: r.w,
				height: r.h,
				fill: col,
				stroke: col,
				opacity: this.colorRectOpacity,
			});
			this.rectGroup.add( kRect );

			if ( !this.readonly ) {
				kRect.on( 'click tap', (ev) => {
					if ( this.mode == 'erase' ) {
						ev.cancelBubble = true;
						const del = this.colorRects.splice( idx, 1 );
						this.base.postLog( 'rectDeleted', del[0] );

						this.drawAllDots();
						this.drawAllRects();
						this.layer.draw();
						this.base.sendChangeState( this );
					}
				})
			}
		})
	}

	addNewRect ( dim ) {
		this.base.postLog( 'rectDrawn', this.newRect );

		Object.assign( this.newRect, dim );
		const nr = this.newRect;
		const x1 = nr.x;
		const x2 = nr.x + nr.w;
		const y1 = nr.y;
		const y2 = nr.y + nr.h;

		if ( !( x2 < this.x || x1 > this.x+this.width || y2 < this.y || y1 > this.y+this.height ) ) {
			this.colorRects.push( this.newRect );
			this.drawAllRects();
			this.layer.draw();
			this.base.sendChangeState( this );
		}
	}

	///////////////////////////////////

	clearAll () {
		this.base.postLog( 'clearAll' );

		this.colorRects = [];
		this.drawAllDots();
		this.drawAllRects(),
		this.layer.draw();

		this.iconBar.clickOn(0);

		this.base.sendChangeState( this );	// init & send changeState & score
	}

	///////////////////////////////////

	getState () {
		return JSON.stringify( this.colorRects );
	}

	setState (state) {

		try {

			this.newRect = null;

			this.colorRects = JSON.parse(state);
			this.drawAllDots();
			this.drawAllRects(),
			this.layer.draw();

		} catch (e) {
			console.error(e);
		}

		setStatePostProc(this);
	}

	getChState () {
		return { ...this.colorRects };
	}

	// Check if User made changes
	getDefaultChangeState () {
		return !object_equals( this.getChState(), this.initData );
	}

}
