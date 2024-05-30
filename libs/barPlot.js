import { mergeDeep, object_equals, getYofEvent, getPosOfEvent, setStatePostProc, ignoreEvent } from './common'

import { textFrame } from './textFrame'

import Konva from 'konva/lib/Core'
import { Rect } from 'konva/lib/shapes/Rect'
import { Line } from 'konva/lib/shapes/Line'

export class barPlot {

	constructor ( base, opts={} ) {

		['origin','yAxis','xAxis','bars'].forEach( o => {
			if ( !( o in opts ) ) {
				throw( `barPlot: parameter '${o}' not specified!` );
			}
		})
		if ( base.fsm && base.fsm.incInitCnt ) {
			base.fsm.incInitCnt();
		}

		// Defaults to opts
		const defaultOpts = {

			origin: {
				// x,y
			},

			yAxis: {
				// heigth, maxVal
				// lineMax, lineInc	// horizontal grid lines
				// tickMax, tickInc		// tics at y axis
				// labelMin, labelMax, labelInc	// label left of y axis
				labelObjs: [
					// textFrames, positioned between labelMin/labelMax every labelInc value
					// array-entries can be pre-filled
				],
				// axisLabelObj: {
				// },
			},
			axisTickWidth: 5,

			xAxis: {
				// width
			},

			bars: [
				// {
				// 	value: 0,
				// 	labelObj: {
				// 		// textFrame
				// 	},
				// },
			],
			// barWidth: xAxis.width/bars.length*0.5,

			sliderWidth: 1.2,
			sliderHeight: 3,
			sliderColor: 'gold',
			sliderHighlightColor: 'tomato',

			titleObj: {
				value: '',
				// x, y,            // calculated
				// width
				height: 25,
				//readonly: 1,
			},
			defaultTitleOpts: {
				fontSize: 20,
				frameWidth: 0,
				distance: 10,
				onChange: () => {
					this.base.postLog( 'titleChanged', {
						title: this.titleObj.value,
					});
					this.base.sendChangeState( this );
				},
		},

			defaultAxisLineOpts: {
				stroke: 'black',
				strokeWidth: 1,
			},

			defautlGridLinesOpts: {
				stroke: 'lightgray',
				strokeWidth: 1,
			},

			defaultYLabelOpts: {
				value: '',
				width: 40,
				height: 25,
				fontSize: 15,
				frameWidth: 0,
				cornerRadius: 4,
				distance: 5,
				align: 'right',
				inputRegexp: '^[0-9]{0,4}$',
			},
			defaultYAxisLabelOpts: {
				value: '',
				width: 200,
				height: 25,
				fontSize: 15,
				frameWidth: 1,
				cornerRadius: 4,
				distance: 10,
				rotation: -90,
			},
			defaultBarLabelOpts: {
				value: '',
				width: 90,
				height: 25,
				fontSize: 15,
				frameWidth: 1,
				cornerRadius: 4,
				distance: 10,
			},

			defaultBarBackgroundOpts: {
				stroke: 'lightyellow',
				strokeWidth: 1,
				fill: 'lightyellow',
			},
			defaultBarOpts: {
				stroke: 'blue',
				strokeWidth: 1,
				fill: 'blue',
			},

			readonly: 0,
		}
		mergeDeep( Object.assign( this, defaultOpts ), opts );
		this.base = base;
		const stage = base.stage;
		this.stage = stage;

		if ( !( 'barWidth' in this ) ) {
			this.barWidth = this.xAxis.width*0.5/this.bars.length;
		}
		this.backgroundLayer = new Konva.Layer();
		this.stage.add( this.backgroundLayer );
		this.barLayer = new Konva.Layer();
		this.stage.add( this.barLayer );

		this.init();
		this.initData = this.getChState();
		this.base.sendChangeState( this );	// init & send changeState & score

		// interactivity
		if ( !this.readonly ) {

			this.stage.on( 'mousemove touchmove', function (ev) {
				if ( this.sticky!==null ) {
					this.setVal( this.sticky, this.y2val( getYofEvent( this.stage, ev ) ) );
				}
			}.bind(this) );

			this.stage.on( 'mouseup touchend mouseleave', function (ev) {
				if ( this.sticky!==null ) {
					this.setCursorNormal();
					this.setHitlineColor( this.sticky, this.sliderColor );
					this.sticky = null;
					this.base.sendChangeState( this );
				}
			}.bind(this) );

			// // setVal on Click
			// this.stage.on( 'click tap', function (ev) {
			// 	const pos = getPosOfEvent( this.stage, ev );
			// 	if ( pos.y <= this.origin.y && pos.y >= this.origin.y-this.yAxis.height ) {
			// 		let nr=null;
			// 		for ( let xp=this.bars.length-0.5; nr===null && xp>0; xp-- ) {
			// 			const x = this.val2x(xp);
			// 			if ( pos.x >= x-this.barWidth/2 && pos.x <= x+this.barWidth/2 ) {
			// 				nr = xp-0.5;
			// 				this.setVal( nr, this.y2val( pos.y ) );
			// 			}
			// 		}
			// 	}
			// }.bind(this) );

			if ( base.fsm && base.fsm.decInitCnt ) {
				base.fsm.decInitCnt();
			}
		}
	}

	///////////////////////////////////

	init () {

		// draw background
		const backLayer = this.backgroundLayer;
		backLayer.destroyChildren();
		const addLine = ( defs, p ) => backLayer.add( new Konva.Line( Object.assign( {},
			defs, {
				points: p,
		})));
		const x = this.origin.x;
		const y = this.origin.y;

		// title
		if ( this.titleObj ) {
			const titleObj = this.titleObj;
			if ( !titleObj.width ) {
				titleObj.width = this.xAxis.width;
			}
			if ( !titleObj.x ) {
				titleObj.x = x + this.xAxis.width/2 - titleObj.width/2;
			}
			if ( !titleObj.y ) {
				titleObj.y = y - ( titleObj.distance || this.defaultTitleOpts.distance ) - this.yAxis.height - titleObj.height;
			}
			titleObj.readonly ||= this.readonly;
			this.titleObj = new textFrame( this.base, backLayer, Object.assign( {}, this.defaultTitleOpts, titleObj ) ) ;
		}

		// x axis
		addLine( this.defaultAxisLineOpts, [ x, y, x+this.xAxis.width, y ] );
		for ( let xv=1; xv <= this.bars.length; xv += 1 ) {
			const x = this.val2x(xv);
			addLine( this.defaultAxisLineOpts, [ x, y, x, y+this.axisTickWidth ] );
		}

		// bars
		this.barLayer.destroyChildren();

		this.bars.forEach( ( bar, nr ) => {
			const x = this.val2x( nr+0.5 );
			const valOrDef = ( key ) => ( key in bar.labelObj ) ? bar.labelObj[key] : this.defaultBarLabelOpts[key];

			// label
			if ( bar.labelObj ) {
				bar.labelObj.readonly ||= this.readonly;
			}
			const labelObj = new textFrame( this.base, backLayer, Object.assign(
				{},
				this.defaultBarLabelOpts,
				bar.labelObj || {},
				{
					x: x - valOrDef('width')/2,
					y: this.origin.y + valOrDef('distance'),
					onChange: () => {
						this.base.postLog( 'barLabelChanged', {
							bar: nr+1,
							label: labelObj.value,
						});
						this.base.sendChangeState( this );
					},
				}
			));
			if ( bar.labelObj && bar.labelObj.deleteAll ) {
				bar.labelObj.deleteAll();
			}
			bar.labelObj = labelObj;

			// bar
			bar.readonly ||= this.readonly;
			if ( !bar.readonly ) {
				backLayer.add( new Konva.Rect( Object.assign( {},
					this.defaultBarBackgroundOpts, {
						x: x-this.barWidth/2,
						y: this.origin.y-this.yAxis.height,
						width: this.barWidth,
						height: this.yAxis.height,
				})));
			}

			const y = this.val2y( bar.value || 0 );
			bar.kRect = new Konva.Rect( Object.assign( {},
				this.defaultBarOpts,
				bar, {
					x: x-this.barWidth/2,
					y: y,
					width: this.barWidth,
					height: this.origin.y-y,
			}));
			this.barLayer.add( bar.kRect );

			// interactivity
			if ( !this.readonly && !bar.readonly ) {

				bar.kHitLine = new Konva.Line( Object.assign( {},
					this.defaultBarOpts, {
						points: [ x-this.barWidth*this.sliderWidth/2, y, x+this.barWidth*this.sliderWidth/2, y ],
						stroke: this.sliderColor,
						strokeWidth: this.sliderHeight,
						hitStrokeWidth: this.defaultBarOpts.strokeWidth*10,
				}));
				this.barLayer.add( bar.kHitLine );

				bar.kHitLine.on( 'mouseenter', () => {
					if ( this.sticky===null ) {
						this.setCursorHighlight();
						this.setHitlineColor( nr, this.sliderHighlightColor );
					}
				});
				bar.kHitLine.on( 'mouseleave', (ev) => {
					if ( ignoreEvent( this.stage, ev ) ) {
						return;
					}
					if ( this.sticky===null ) {
						this.setCursorNormal();
						this.setHitlineColor( nr, this.sliderColor );
					}
				});
				bar.kHitLine.on( 'mousedown touchstart', () => {
					if ( this.sticky===null ) {
						this.sticky = nr;
						this.setCursorHighlight();
						this.setHitlineColor( nr, this.sliderHighlightColor );
					}
				});
			}
		})
		this.sticky = null;
		this.overCursor = 'ns-resize';

		// y axis
		addLine( this.defaultAxisLineOpts, [ x, y, x, y-this.yAxis.height ] );
		if ( this.yAxis.lineInc ) {
			for ( let yv=this.yAxis.lineInc; yv <= ( this.yAxis.lineMax || this.yAxis.maxVal ); yv += this.yAxis.lineInc ) {
				const y = this.val2y(yv);
				addLine( this.defautlGridLinesOpts, [ x, y, x+this.xAxis.width, y ] );
			}
		}
		if ( this.yAxis.tickInc ) {
			for ( let yv=0; yv <= ( this.yAxis.tickMax || this.yAxis.maxVal ); yv += this.yAxis.tickInc ) {
				const y = this.val2y(yv);
				addLine( this.defaultAxisLineOpts, [ x-this.axisTickWidth, y, x+this.axisTickWidth, y ] );
			}
		}
		if ( this.yAxis.labelInc ) {
			let labInd = 0;
			for ( let yv = ( this.yAxis.labelMin || 0); yv <= ( this.yAxis.labelMax || this.yAxis.maxVal ); yv += this.yAxis.labelInc ) {
				const yAxisLabelObj = this.yAxis.labelObjs[ labInd ];
				if ( yAxisLabelObj ) {
					yAxisLabelObj.readonly ||= this.readonly;
				}
				const valOrDef = ( key ) => yAxisLabelObj && ( key in yAxisLabelObj ) ? yAxisLabelObj[key] : this.defaultYLabelOpts[key];
				const labelObj = new textFrame( this.base, backLayer, Object.assign(
					{},
					this.defaultYLabelOpts,
					yAxisLabelObj || {},
					{
						x: x - this.axisTickWidth - valOrDef('width') - valOrDef('distance'),
						y: this.val2y( yv ) - valOrDef('height')/2,
						onChange: () => {
							this.base.postLog( 'yLabelChanged', {
								yVal: yv,
								label: labelObj.value,
							});
							this.base.sendChangeState( this );
						},
				}));
				if ( yAxisLabelObj && yAxisLabelObj.deleteAll ) {
					yAxisLabelObj.deleteAll();
				}
				this.yAxis.labelObjs[ labInd++ ] = labelObj;
			}
		}
		// axis label
		const yAxisLab = this.yAxis.axisLabelObj;
		if ( yAxisLab ) {
			yAxisLab.readonly ||= this.readonly;
			const valOrDef = ( key ) => yAxisLab && ( key in yAxisLab ) ? yAxisLab[key] : this.defaultYAxisLabelOpts[key];
			const labelObj = new textFrame( this.base, backLayer, Object.assign(
				{},
				this.defaultYAxisLabelOpts,
				yAxisLab || {},
				{
					x: x - this.defaultYLabelOpts.width - this.defaultYLabelOpts.distance - this.axisTickWidth
							- valOrDef('distance') - valOrDef('height'),
					y: this.origin.y - this.yAxis.height/2 + valOrDef('width')/2,
					onChange: () => {
						this.base.postLog( 'yAxisLabelChanged', {
							label: labelObj.value,
						});
						this.base.sendChangeState( this );
					},
				}));
			if ( yAxisLab && yAxisLab.deleteAll ) {
				yAxisLab.deleteAll();
			}
			this.yAxis.axisLabelObj = labelObj;
		}


		backLayer.draw();
		this.barLayer.draw();
	}

	///////////////////////////////////

	setVal ( nr, val ) {
		val = Math.min( Math.max( val, 0 ), this.yAxis.maxVal );
		const bar = this.bars[nr];

		bar.value = val;

		// set bar pos/height
		const y = this.val2y( bar.value || 0 );
		bar.kRect.y( y );
		bar.kRect.height( this.origin.y-y );

		const x = this.val2x( nr+0.5 );
		bar.kHitLine.points( [ x-this.barWidth*this.sliderWidth/2, y, x+this.barWidth*this.sliderWidth/2, y ] );

		this.barLayer.batchDraw();

		// log
		this.base.postLog( 'setBar', {
			bar: nr+1,
			toValue: val,
		});
	}

	val2y (val) {
		return this.origin.y - val*this.yAxis.height/this.yAxis.maxVal;
	}
	y2val (y) {
		return  ( this.origin.y - y ) *this.yAxis.maxVal/this.yAxis.height;
	}
	val2x (val) {
		return this.origin.x + val*this.xAxis.width/this.bars.length;
	}
	x2val (x) {
		return  ( x - this.origin.x ) *this.bars.length/this.xAxis.width;
	}

	setHitlineColor ( nr, color = this.sliderColor ) {
		this.bars[nr].kHitLine.stroke( color );
		this.barLayer.batchDraw();
	}

	setCursorHighlight () {
		if ( document.body.style.cursor != this.overCursor ) {
			this.oldCursor = document.body.style.cursor;
			document.body.style.cursor = this.overCursor;
		}
	}

	setCursorNormal () {
		if ( document.body.style.cursor == this.overCursor ) {
			document.body.style.cursor = this.oldCursor || 'auto';
		}
	}

	///////////////////////////////////

	getState () {

		const state = {};
		let hasData, data;

		// bar values & bar labels data
		hasData = false;
		data = this.bars.map( b => {
			const s = {};
			if ( !b.readonly ) {
				s.v = b.value;
				hasData = true;
			}
			if ( !b.labelObj.readonly ) {
				s.l = b.labelObj.value;
				hasData = true;
			}
			return s;
		});
		if ( hasData ) {
			state.b = data;
		}

		// yAxis.labelObjs
		hasData = false;
		data = this.yAxis.labelObjs.map( l => {
			if ( !l.readonly ) {
				hasData = true;
				return l.value;
			}
			return '';
		});
		if ( hasData ) {
			state.l = data;
		}

		// this.yAxis.axisLabelObj && this.titleObj
		const saveLabelObjValue = ( nam, obj ) => {
			if ( obj && !obj.readonly ) {
				state[ nam ] = obj.value;
			}
		}
		saveLabelObjValue( 'a', this.yAxis.axisLabelObj );
		saveLabelObjValue( 't', this.titleObj );

		return JSON.stringify( state );
	}

	setState (state) {

		try {

			const load = JSON.parse(state);

			// Restore bar labels & bar values
			if ( load.b ) {
				load.b.forEach( ( b, nr ) => {
					const bar = this.bars[nr];
					if ( 'v' in b ) {
						bar.value = b.v;
					}
					if ( 'l' in b ) {
						bar.labelObj.value = b.l;
					}
				});
			}

			// yAxis.labelObjs
			if ( load.l ) {
				load.l.forEach( ( l, nr ) => {
					const lObj = this.yAxis.labelObjs[ nr ];
					if ( !lObj.readonly ) {
						lObj.value = l;
					}
				})
			}

			// this.yAxis.axisLabelObj && this.titleObj
			const loadLabelObjValue = ( nam, obj ) => {
				if ( obj && !obj.readonly ) {
					obj.value = load[ nam ];
				}
			}
			loadLabelObjValue( 'a', this.yAxis.axisLabelObj );
			loadLabelObjValue( 't', this.titleObj );

			this.init();

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
			b: this.bars.map( b => ({
				v: b.value,
				l: b.labelObj.value,
			})),
			l: this.yAxis.labelObjs.map( l => l.value ),
			a: this.yAxis.axisLabelObj ? this.yAxis.axisLabelObj.value : '',
			t: this.titleObj ? this.titleObj.value : '',
		}
	}

}