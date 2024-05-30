import Konva from "konva";
import { Rect } from 'konva/lib/shapes/Rect'
import { Text } from 'konva/lib/shapes/Text'

import { mergeDeep, ignoreEvent, object_equals, setStatePostProc } from "./common";

export class rectArrayMarkable {

	constructor ( base, opts = {} ) {

		if ( base.fsm && base.fsm.incInitCnt ) {
			base.fsm.incInitCnt();
		}

		// Defaults to opts
		const defaultOpts = {

			x: 2,
			y: 2,

			width: 50,
			height: 30,
			strokeWidth: 3,

			markColor: 'blue',
			notMarkColor: null,
			strokeColor: 'black',

			readonly: false,

			// specify rectArray OR rects
			// rectArray: {
			// 	cols: 5,
			// 	rows: 2,
			// 	marked: [],		// FieldNrs, 1..(cols*row)
			// 	fixed: [],		// FieldNrs, 1..(cols*row)
			// },
			rects: [
				// {
				// 	x, y, w, h,	// x, y, width, height in units
				// 	marked: false,
				// 	fixed: false,
				// },
				// ...
			],

			rectLayer: null,	// layer (created if null)
		}
		mergeDeep( Object.assign( this, defaultOpts ), opts );
		this.base = base;
		const stage = base.stage;
		this.stage = stage;

		if ( !this.rectLayer ) {
			this.rectLayer = new Konva.Layer();
			stage.add( this.rectLayer );
		}
		this.kGroup = new Konva.Group();
		this.rectLayer.add( this.kGroup );
		this.rectLayer.moveToTop();

		// creates rects from "rectArray"
		if ( this.rectArray ) {
			const d = this.rectArray;
			this.rects = [];
			for ( let y=0; y<d.rows; y++ ) {
				for ( let x=0; x<d.cols; x++ ) {
					const fnr = y*d.cols + x + 1;
					this.rects.push({
						x, y,
						w: 1, h: 1,
						marked: d.marked && d.marked.includes(fnr),
						fixed: d.fixed && d.fixed.includes(fnr),
					});
				}
			}
		}

		this.createRects();

		this.initData = this.getChState();
		this.base.sendChangeState( this );	// init & send changeState & score

		if ( base.fsm && base.fsm.decInitCnt ) {
			base.fsm.decInitCnt();
		}
	}

	createRects () {
		this.kGroup.destroyChildren();

		this.rects.forEach( r => {
			const kRect = new Konva.Rect({
				x: this.x + r.x*this.width,
				y: this.y + r.y*this.height,
				width: r.w*this.width,
				height: r.h*this.height,
				stroke: this.strokeColor,
				strokeWidth: this.strokeWidth,
				fill: r.marked ? this.markColor : this.notMarkColor,
			});
			this.kGroup.add( kRect );

			// interactivity
			if ( !this.readonly && !r.fixed ) {
				kRect.on( "mousedown touchstart", (ev) => {
					if ( ignoreEvent( this.stage, ev ) ) {
						return;
					}
					r.marked = !r.marked;
					kRect.fill( r.marked ? this.markColor : this.notMarkColor );
					this.rectLayer.draw();
					this.base.sendChangeState( this );
				})
			}
		})

		this.rectLayer.draw();
	}

	///////////////////////////////////

	getState () {
		return JSON.stringify( this.getChState() );
	}

	setState ( state ) {

		try {

			const obj = JSON.parse(state);
			obj.forEach( (o,i) => {
				if ( this.rects[i] ) {
					this.rects[i].marked = !!o;
				}
			});
			this.createRects();
			this.rectLayer.draw();

		} catch (e) {
			console.error(e);
		}

		setStatePostProc(this);
	}

	// Check if User made changes
	getDefaultChangeState () {
		return !object_equals( this.getChState(), this.initData );
	}

	getChState () {
		return this.rects.map( r => +r.marked );
	}

	///////////////////////////////////

	scoreDef () {
		if ( this.dataSettings && this.dataSettings.variablePrefix ) {
			return {
				[`V_Input_${this.dataSettings.variablePrefix}_MarkCnt`]: this.rects.reduce( (a,c) => a += +c.marked, 0 ),
			}
		}
		return {};
	}

}
