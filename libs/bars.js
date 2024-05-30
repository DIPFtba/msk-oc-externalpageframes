import { mergeDeep, object_equals, setStatePostProc } from './common'

import { textFrame } from './textFrame'

import { addFreePaintTo } from './class_extensions'

import Konva from 'konva/lib/Core'
import { Rect } from 'konva/lib/shapes/Rect'
import { Line } from 'konva/lib/shapes/Line'

export class bars {

	constructor ( base, opts = {} ) {

		if ( base.fsm && base.fsm.incInitCnt ) {
			base.fsm.incInitCnt();
		}

		const defaultOpts = {

			bars: [		// bars
				// {
				// 	markable: false|true,
				// 	segments: 0,	// how many segments will the rectangle be divided into (vertical lines, optional)
				// 	Konva.Rect options
				// },
			],

			extraLines: [	// extra Lines (optional)
				// { Konva.Line options }
			],

			labels: [	// (editable?) Labels to display
				// { textFrame options},
			],

			defaultBarOpts: {
				stroke: 'black',
				strokeWidth: 2,
				markable: true,
				segments: 0,
			},

			defaultExtraLineOpts: {
				stroke: 'black',
				strokeWidth: 1,
			},

			defaultLabelOpts: {
				value: '',
				width: 50,
				height: 25,
				fontSize: 15,
				frameWidth: 1,
				cornerRadius: 4,
			},

		}
		mergeDeep( Object.assign( this, defaultOpts ), opts );
		this.base = base;
		const stage = base.stage;
		this.stage = stage;

		this.init();
		this.drawBackground();

		this.initData = this.getChState();
		this.base.sendChangeState( this );	// init & send changeState & score

		stage.draw();

		if ( base.fsm && base.fsm.decInitCnt ) {
			base.fsm.decInitCnt();
		}
	}

	///////////////////////////////////

	init () {
		[ this.paintLayer, this.layer ].forEach( k => {
			if ( k ) {
				k.destroy()
			}
		})

		// layer for free paint
		this.freePaintLayer = new Konva.Layer();
		this.stage.add( this.freePaintLayer );

		// layer for bars
		this.layer = new Konva.Layer();
		this.stage.add( this.layer );

		if ( this.labelObjs ) {
			this.labelObjs.forEach( l => l.deleteAll() );
		}
		this.labelObjs = [];
	}

	// clipping area for marker, if added
	freePaintMarkerClipFunc (ctx) {
		// clip to markable bars
		this.bars.forEach( bar => {
			const effBar = Object.assign( {}, this.defaultBarOpts, bar );
			if ( effBar.markable ) {
				ctx.rect( bar.x, bar.y, bar.width, bar.height );
			}
		});
	}

	drawBackground () {

		// draw BARS
		( Array.isArray(this.bars) ? this.bars : [this.bars] ).forEach( bar => {

			const barOpts = Object.assign( {}, this.defaultBarOpts, bar );
			this.layer.add( new Konva.Rect( barOpts ) );
			// segments
			if ( bar.segments ) {
				const width = bar.width / bar.segments;
				for ( let x = bar.x+bar.width-width; x>bar.x; x-=width ) {
					this.layer.add( new Konva.Line({
						points: [ x, bar.y, x, bar.y+bar.height ],
						stroke: barOpts.stroke,
						strokeWidth: barOpts.strokeWidth,
					}))
				}
			}
		})

		// draw extraLines
		this.extraLines.forEach( line => {
			this.layer.add( new Konva.Line(
				Object.assign( {}, this.defaultExtraLineOpts, line ) ) );
		})

		// create existing labels
		this.labels.forEach( ( label, nr ) => {
			const labelObj = new textFrame(
				this.base,
				this.layer,
				Object.assign( {}, this.defaultLabelOpts, label, {
					logObjectId: nr+1,
					onChange: () => {
						this.base.postLog( 'labelChanged', {
							id: nr+1,
							labelNew: labelObj.value,
						});
						this.base.sendChangeState( this );
					},
				} ) );
			this.labelObjs.push( labelObj );
		})
	}

	///////////////////////////////////

	getState () {

		const state = {

			labels: this.labelObjs.map( lab => {

				const saveLab = {};
				if ( !lab.readonly ) {
					saveLab.value = lab.value;
				}
				if ( lab.moveable ) {
					Object.assign( saveLab, lab.getPos() );
				}

				return saveLab;
			}),
		}

		return JSON.stringify( state );
	}

	setState (state) {

		try {

			const obj = JSON.parse(state);
			this.init();

			// merge Label-Defs
			obj.labels.forEach( ( l, n ) => Object.assign( this.labels[n], l ) );

			this.drawBackground();
			this.stage.draw();

		} catch (e) {
			console.error(e);
		}

		setStatePostProc(this);
	}

	getChState () {
		return {
			labels: this.labelObjs.map( lab => Object.assign( {
					v: lab.value
				},
				lab.getPos(),
			)),
		}
	}

	// Check if User made changes
	getDefaultChangeState () {
		return !object_equals( this.getChState(), this.initData );
	}

}

//////////////////////////////////////////////////////////////////////////////

export const bars_freePaint = addFreePaintTo( bars, 1, 1 );
