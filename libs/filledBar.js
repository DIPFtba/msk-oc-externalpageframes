import { mergeDeep, getXofEvent, setStatePostProc, ignoreEvent } from './common'

import Konva from 'konva/lib/Core'
import { Rect } from 'konva/lib/shapes/Rect'
import { Line } from 'konva/lib/shapes/Line'

import { textFrame } from './textFrame'

export class filledBar {

	constructor ( base, opts = {} ) {

		if ( base.fsm && base.fsm.incInitCnt ) {
			base.fsm.incInitCnt();
		}

		// Defaults to opts
		const defaultOpts = {
			x: 20, y: 20,
			width: 500, height: 25,
			valFrom: 0, valTo: 100,
			frameWidth: 2,

			// labelY: 5, labelSize: 20,
			// labels: [], // [val1,val2] or [ [val1,text1], [val2,text2] ]
			// labelsEvery: null, labelsMin: null, labelsMax: null,

			minTicks: { vals: 1, width: 1, color: 'gray', },
			majTicks: { vals: 10, width: 1.5, color: 'black', },

			markedValue: 0,
			stickyTo: 'ticks', // null | <int>| 'tick' = minTicks.vals || majTicks.vals
			markedColor: 'lightblue',

			labelDistance: 5,
			labelFontSize: 15,
			labelWidth: 50,
			labels: [
				// { val: 0-1, text:}
			],

			readonly: 0,
			logObjectId: 1,
		}
		mergeDeep( Object.assign( this, defaultOpts ), opts );
		this.base = base;
		const stage = base.stage;
		this.stage = stage;

		this.unit = this.width / (this.valTo-this.valFrom);
		this.sticky = false;

		if ( this.stickyTo === 'ticks' ) {
			if ( this.minTicks ) {
				this.stickyTo = this.minTicks.vals;
			} else if ( this.majTicks ) {
				this.stickyTo = this.majTicks.vals;
			}
		}
		this.initData = this.markedValue;
		this.base.sendChangeState( this );

		// filled rect (layer in background)
		this.kMarkedRect = new Konva.Rect({
			x: this.x, y: this.y,
			width: 0, height: this.height,
			fill: this.markedColor,
		})
		this.markedLayer = new Konva.Layer();
		this.markedLayer.add( this.kMarkedRect );
		this.stage.add( this.markedLayer );

		// draw outer frame and ticks
		this.frameLayer = new Konva.Layer();
		[ this.minTicks, this.majTicks ].forEach( t => {
			if ( t && t.vals ) {
				for ( let x = this.valFrom; x <= this.valTo; x += t.vals ) {
					const absx = this.val2x(x);
					const kLine = new Konva.Line({
						points: [ absx, this.y, absx, this.y+this.height ],
						stroke: t.color,
						strokeWidth: t.width,
					})
					this.frameLayer.add( kLine );
				}
			}
		})
		this.kOuterFrame = new Konva.Rect({
			x: this.x, y: this.y,
			width: this.width, height: this.height,
			stroke: 'black',
			strokeWidth: this.frameWidth,
		})
		this.frameLayer.add( this.kOuterFrame );
		this.stage.add( this.frameLayer );

		this.drawValue();

		// labels
		this.labels.forEach( l => {
			new textFrame( this.base, this.frameLayer, {
				x: this.val2x( l.val )-this.labelWidth/2,
				y: this.y+this.height+this.labelDistance,
				value: l.text,
				fontSize: this.labelFontSize,
				width: this.labelWidth,
				frameWidth: 0,
				readonly: 1,
			})
		})

		// interactivity
		if ( !this.readonly ) {

			this.kOuterFrame.on( 'mousedown touchstart', (ev) => {
				const v = this.x2valSticky( getXofEvent( stage, ev ) );
				this.markedValue = ( this.stickyTo !== null && v == this.stickyTo && v == this.markedValue ) ? 0 : v;
				this.sticky = true;
				this.drawValue();
				ev.cancelBubble = true;
			})

			this.stage.on( 'mousemove touchmove', (ev) => {
				if ( this.sticky ) {
					const x = getXofEvent( stage, ev );
					if ( x < this.x ) {
						this.markedValue = 0;
					} else {
						const v = this.x2valSticky( getXofEvent( stage, ev ) );
						this.markedValue = Math.min( this.valTo, v );
					}
					this.drawValue();
				}
			})

			this.stage.on( 'mouseleave mouseup touchend', (ev) => {
				if ( ignoreEvent( this.stage, ev ) ) {
					return;
				}
				this.endSticky();
		 	});
		}

		if ( base.fsm && base.fsm.decInitCnt ) {
			base.fsm.decInitCnt();
		}
	}

	///////////////////////////////////

	drawValue () {
		this.kMarkedRect.width( this.val2x( this.markedValue ) - this.x );
		this.markedLayer.batchDraw();
	}

	val2x (val) {
		return this.x + (val-this.valFrom)*this.unit;
	}

	x2val (x) {
		return (x-this.x)/this.unit + this.valFrom;
	}

	x2valSticky (x) {
		let v = this.x2val( x );
		if ( this.stickyTo !== null ) {
			v = Math.ceil( v / this.stickyTo )*this.stickyTo;
		}
		return v;
	}

	endSticky () {
		if ( this.sticky ) {
			this.sticky = false;
			this.base.postLog( 'set', {
				id: this.logObjectId,
				toValue: this.markedValue,
			});
			this.base.sendChangeState( this );
		}
	}

	///////////////////////////////////

	getState () {

		return JSON.stringify( this.markedValue );
	}

	setState( state ) {

		try {

			this.markedValue = JSON.parse(state);
			this.drawValue();

		} catch (e) {
			console.error(e);
		}

		setStatePostProc(this);
	}

	// Check if User made changes
	getDefaultChangeState () {
		return this.markedValue !== this.initData;
	}

	scoreDef () {
		return this.FSMVariableName ? {
			[`V_Input_${this.FSMVariableName}`]: this.markedValue,
		} : undefined;
	}

}
