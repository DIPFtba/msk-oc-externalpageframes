import { object_equals, getXofEvent, setStatePostProc, ignoreEvent } from './common'

import { textFrame } from './textFrame'

import Konva from 'konva/lib/Core'
import { Rect } from 'konva/lib/shapes/Rect'
import { Line } from 'konva/lib/shapes/Line'

export class barSlider {

	constructor ( base, opts = {} ) {

		['x','y','width','height'].forEach( o => {
			if ( !( o in opts ) ) {
				throw( `barSlider: parameter '${o}' not specified!` );
			}
		})
		if ( base.fsm && base.fsm.incInitCnt ) {
			base.fsm.incInitCnt();
		}

		// Defaults to opts
		const defaultOpts = {
			// x: 20, y: 20,
			// width: 500, height: 25,
			strokeWidth: 2,
			fillColor: '#f0f0f0',
			markedFillColor: 'blue',

			pos: 0,

			sliderHeight: 30,
			sliderWidth: 3,
			sliderColor: 'yellow',
			sliderHighlightColor: 'tomato',

			labelDistance: 5,
			labelFontSize: 15,
			labelWidth: 50,
			labels: [
				// { val: 0-1, text:}
			],
			readonly: 0,
			logObjectId: 1,
		}
		Object.assign( this, defaultOpts, opts );
		this.base = base;
		const stage = base.stage;
		this.stage = stage;

		this.layer = new Konva.Layer();
		this.stage.add( this.layer );

		this.sticky = 0;
		this.init();

		this.initData = this.getChState();
		this.base.sendChangeState( this );	// init & send changeState & score

		// interactivity
		this.stage.on( 'mousemove touchmove', (ev) => {
			if ( this.sticky ) {
				this.setVal( Math.max( 0, Math.min( 1, this.x2val( getXofEvent( this.stage, ev ) ) ) ) );
			}
		})
		this.stage.on( 'mouseleave mouseup touchend', (ev) => {
			if ( ignoreEvent( this.stage, ev ) ) {
				return;
			}
			if ( this.sticky ) {
				this.sticky = 0;
				this.redraw();
				this.base.postLog( 'sliderSet', {
					id: this.logObjectId,
					value: this.pos,
				});
				this.base.sendChangeState( this );
			}
		})

		if ( base.fsm && base.fsm.decInitCnt ) {
			base.fsm.decInitCnt();
		}
	}

	///////////////////////////////////

	init () {

		// empty Rectangle
		this.kRect = new Konva.Rect({
			x: this.x, y: this.y,
			width: this.width, height: this.height,
			strokeWidth: this.strokeWidth,
			stroke: 'black',
			fill: this.fillColor,
		})
		this.layer.add( this.kRect );

		// labels
		this.labels.forEach( l => {
			new textFrame( this.base, this.layer, {
				x: this.val2x( l.val )-this.labelWidth/2,
				y: this.y+this.height+this.labelDistance,
				value: l.text,
				fontSize: this.labelFontSize,
				width: this.labelWidth,
				frameWidth: 0,
				readonly: 1,
			})
		})

		// filled Rectangle
		this.kRectFilled = new Konva.Rect({
			x: this.x, y: this.y,
			width: this.val2x( this.pos )-this.x, height: this.height,
			strokeWidth: this.strokeWidth,
			stroke: 'black',
			fill: this.markedFillColor,
		})
		this.layer.add( this.kRectFilled );

		// slider
		const xa = this.val2x( this.pos );
		this.sliderY = this.y+(this.height-this.sliderHeight)/2;
		this.kSlider = new Konva.Line({
			points: [ xa, this.sliderY, xa, this.sliderY+this.sliderHeight ],
			stroke: this.sliderColor,
			strokeWidth: this.sliderWidth,
			hitStrokeWidth: 3*this.sliderWidth,
		})
		this.layer.add( this.kSlider );

		// interactivity
		if ( !this.readonly ) {

			this.kSlider.on( 'mouseenter', () => {
				this.redraw( this.sliderHighlightColor );
				this.savedCursor = document.body.style.cursor;
				document.body.style.cursor = "ew-resize";
			})
			this.kSlider.on( 'mouseleave', (ev) => {
				if ( ignoreEvent( this.stage, ev ) ) {
					return;
				}
				this.redraw();
				if ( document.body.style.cursor == "ew-resize" ) {
					document.body.style.cursor = this.savedCursor;
				}
			})

			this.kSlider.on( 'mousedown touchstart', (ev) => {
				if ( !this.sticky ) {
					this.sticky = 1;
					ev.cancelBubble = true;
				}
			})
		}

		this.layer.draw();
	}

	redraw ( sliderColor ) {
		this.kRectFilled.width( this.val2x( this.pos )-this.x );

		const xa = this.val2x( this.pos );
		this.kSlider.points( [ xa, this.sliderY, xa, this.sliderY+this.sliderHeight ] );
		this.kSlider.stroke( sliderColor || this.sliderColor );

		this.layer.batchDraw();
	}

	setVal ( val ) {
		this.pos = val;
		this.redraw( this.sliderHighlightColor );
	}

	///////////////////////////////////

	val2x (val) {
		return this.x + val*this.width;
	}

	x2val (x) {
		return (x-this.x)/this.width;
	}

	///////////////////////////////////

	getState () {

		const state = {
			pos: this.pos
		}

		return JSON.stringify( state );
	}

	setState( state ) {

		try {

			const load = JSON.parse(state);
			this.pos = load.pos;
			this.redraw();

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
		return {
			pos: this.pos,
		}
	}

}

//////////////////////////////////////////////////////////////////////////////

import { addFreeLabelsTo, addFreePaintTo, addInsertButtonsTo } from './class_extensions'

export const barSlider_freePaint = addFreePaintTo( barSlider, 0 );

export const barSlider_freePaint_freeLabels = addFreeLabelsTo( addFreePaintTo( barSlider, 0 ) );

export const barSlider_freePaint_freeLabels_insertButtons = addInsertButtonsTo(
	// class to extend
	addFreeLabelsTo( addFreePaintTo( barSlider, 0 ) ),

	// extra defaults
	{},

	// callback function
	function () {
		document.activeElement.dispatchEvent( new Event( 'input', { bubbles: true } ) );
	}
);

export const barSlider_freePaintMarker_freeLabels_insertButtons = addInsertButtonsTo(
	// class to extend
	addFreeLabelsTo( addFreePaintTo( barSlider, 0, 1 ) ),

	// extra defaults
	{},

	// callback function
	function () {
		document.activeElement.dispatchEvent( new Event( 'input', { bubbles: true } ) );
	}
);

export const barSlider_freeLabels_insertButtons = addInsertButtonsTo(
	// class to extend
	addFreeLabelsTo( barSlider ),

	// extra defaults
	{},

	// callback function
	function () {
		document.activeElement.dispatchEvent( new Event( 'input', { bubbles: true } ) );
	}
);
