import { mergeDeep, getPosOfEvent, setStatePostProc, ignoreEvent } from './common'

import Konva from 'konva/lib/Core'
import { Line } from 'konva/lib/shapes/Line'

import { textFrame } from './textFrame'
import { iconBar } from './iconBar'

//////////////////////////////////////////////////////////////////////////////

/**
 * Deep merge of source to target, but only keys present in target
 * Overwrites result in this
 */
function mergeAdditionalDefaultsToThis( target, source ) {

	for ( const key in target ) {
		this[key] = ( key in source ? mergeDeep( target[ key ], source[key] ) : target[key] );
	}

	return target;
}

//////////////////////////////////////////////////////////////////////////////

export const addInsertButtonsTo = ( baseClass, extraDefaults=null, inputCallback=null ) => class extends baseClass {

	constructor ( base, opts = {} ) {

		super( base, opts );
		if ( !opts.insertIconDefs || !opts.insertIconDefs.length ) {
			return;
		}

		// Merge addDefaults & opts into this
		const additionalDefaultOpts = {

			insertIconDefs: [
				// { x:, y:, (width:,) texts: [ '+', '-', ...] }
			],

			insertIconBarDef: {
				framePadding: 0,
				frameFill: 'white',
				fontSize: 18,
				spacing: 0,
				sticky: false,
			},

		}
		if ( extraDefaults!==null ) {
			if ( typeof extraDefaults === 'function' ) {
				extraDefaults.call( this, additionalDefaultOpts );
			} else {
				mergeDeep( additionalDefaultOpts, extraDefaults );
			}
		}
		mergeAdditionalDefaultsToThis.call( this, additionalDefaultOpts, opts );

		// insertion iconBar
		this.insertIconBars = [];

		this.insertIconDefs.forEach( t => {
			const opts = Object.assign( {}, this.insertIconBarDef, t );
			opts.icons = t.texts.map( t =>
				( typeof t === 'object' ? t : {
					text: {
						text: t,
						fontSize: this.insertIconBarDef.fontSize,
					},
					on: () => {
						this.base.postLog( 'insertButtonPressed', { text: t } );
						this.insertButton(t);
					},
				}) );
			this.insertIconBars.push( new iconBar( this.stage, opts ) );
		})

	}

	///////////////////////////////////

	// insert button pressed
	insertButton (t) {
		if ( document.activeElement.tagName === 'INPUT' ) {

			const inp = document.activeElement;
			if ( inp.selectionStart || inp.selectionStart == '0' ) {
				const startPos = inp.selectionStart;
				const endPos = inp.selectionEnd;
				inp.value = inp.value.substring( 0, startPos )
					+ t
					+ inp.value.substring( endPos, inp.value.length );
			} else {
				inp.value += t;
			}

			if ( inputCallback!==null ) {
				inputCallback.call(this);
			}
		}
	}

}

//////////////////////////////////////////////////////////////////////////////

import penicon from './img/penicon.png'
import erasericon from './img/erasericon.png'
import clearicon from './img/clearicon.png'
import markericon from './img/markericon.png'

export const addFreePaintTo = ( baseClass, linesChangeState=1, hasMarker=0, extraDefaults=null ) => class extends baseClass {

	constructor ( base, opts = {} ) {

		super( base, opts );
		if ( opts.paintLines===null || opts.modeIconBarDef===null ) {
			return;
		}
		const stage = this.stage;

		const additionalDefaultOpts = {

			paintLines: {
				brush: {
					stroke: 'blue',
					strokeWidth: 2,
					globalCompositeOperation: 'source-over',
					lineCap: 'round',
					lineJoin: 'round',
				},
				marker: {
					stroke: '#6666ff',
					strokeWidth: 25,
					globalCompositeOperation: 'source-over',
					lineCap: 'round',
					lineJoin: 'round',
				},
				erase: {
					stroke: 'blue',
					strokeWidth: 15,
					globalCompositeOperation: 'destination-out',
					lineCap: 'round',
					lineJoin: 'round',
				},
			},

			modeIconBarDef: {
				framePadding: 0,
				spacing: 0,
				default: 0,
				frameFill: 'white',
				icons: [
					{
						src: penicon,
						cursor: `url(${penicon}), auto`,
						on: () => this.setPaintMode('brush'),	// overwritten by addFreePaint
						off: () => this.setPaintMode('none'),	// overwritten by addFreePaint
					},{
						src: erasericon,
						cursor: `url(${erasericon}), auto`,
						on: () => this.setPaintMode('erase'),	// overwritten by addFreePaint
						off: () => this.setPaintMode('none'),	// overwritten by addFreePaint
					},{
						src: clearicon,
						on: () => this.freePaintClearAll(),
					}],
			},
		};
		if ( hasMarker && ( opts.hasMarker===undefined || opts.hasMarker ) ) {
			additionalDefaultOpts.modeIconBarDef.icons.splice( 1, 0, {
				src: markericon,
				cursor: `url(${markericon}), auto`,
				on: () => this.setPaintMode('marker'),	// overwritten by addFreePaint
				off: () => this.setPaintMode('none'),	// overwritten by addFreePaint
			})
		}
		if ( extraDefaults!==null ) {
			if ( typeof extraDefaults === 'function' ) {
				extraDefaults.call( this, additionalDefaultOpts );
			} else {
				mergeDeep( additionalDefaultOpts, extraDefaults );
			}
		}
		mergeAdditionalDefaultsToThis.call( this, additionalDefaultOpts, opts );

		this.freePaintInit();

		this.initData = this.getChState();
		this.base.sendChangeState( this );	// init & send changeState & score

		// interactivity
		if ( !this.readonly ) {

			// Start painting
			stage.on('mousedown touchstart', ev => {

				if ( ['brush','marker','erase'].includes( this.mode ) ) {
					this.isPainting = 1;
					const pos = getPosOfEvent( this.stage, ev );
					this.paintPoints = [ pos.x, pos.y ];
					if ( this.mode != 'marker' ) {
						this.kFreePaintLine = new Konva.Line( Object.assign( {}, this.paintLines[ this.mode ], {
							points: this.paintPoints,
						}));
						this.kFreePaintBrushGroup.add( this.kFreePaintLine );
					} else {
						this.kFreePaintLine = null;
					}
					if ( hasMarker && ( this.hasMarker===undefined || this.hasMarker ) ) {
						if ( this.mode != 'brush' ) {
							this.kFreePaintMarkerLine = new Konva.Line( Object.assign( {}, this.paintLines[ this.mode ], {
								points: this.paintPoints,
							}));
							this.kFreePaintMarkerGroup.add( this.kFreePaintMarkerLine );
						} else {
							this.kFreePaintMarkerLine = null;
						}
					}

					ev.cancelBubble = true;
				}
			} );

			// End painting
			stage.on('mouseup mouseleave touchend', (ev) => {

				if ( ignoreEvent( this.stage, ev ) ) {
					return;
				}
				if ( this.isPainting ) {
					this.isPainting = 0;
					if ( this.paintPoints.length>2 ) {
						this.linesCopy.push( {
							t: this.mode.substr( 0, 1 ),
							p: this.paintPoints,
						})
						const logNames = {
							brush: 'paintLine',
							marker: 'paintMarker',
							erase: 'paintErase',
						}
						this.base.postLog( logNames[ this.mode ], { points: this.paintPoints } );
						this.base.sendChangeState( this );	// init & send changeState & score
					}
				}
			});

			// and core function - drawing
			stage.on('mousemove touchmove', ev => {
				if ( this.isPainting ) {
					const pos = getPosOfEvent( this.stage, ev );
					this.paintPoints.push( pos.x );
					this.paintPoints.push( pos.y );
					if ( this.kFreePaintMarkerLine ) {
						this.kFreePaintMarkerLine.points( this.paintPoints );
						this.freePaintMarkerLayer.batchDraw();
					}
					if ( this.kFreePaintLine ) {
						this.kFreePaintLine.points( this.paintPoints );
						this.freePaintLayer.batchDraw();
					}
				}
			} );

			stage.on( 'mouseleave', (ev) => {
				if ( ignoreEvent( this.stage, ev ) ) {
					return;
				}
				this.cursorSaved = document.body.style.cursor;
				document.body.style.cursor = "default";
			});

			stage.on( 'mouseenter', () => {
				if ( this.cursorSaved ) {
					document.body.style.cursor = this.cursorSaved;
					this.cursorSaved = null;
				}
			})
		}
	}

	///////////////////////////////////

	freePaintInit () {

		// init PaintLines
		if ( hasMarker && ( this.hasMarker===undefined || this.hasMarker ) ) {
			if ( !this.freePaintMarkerLayer ) {
				this.freePaintMarkerLayer = new Konva.Layer();
				this.stage.add( this.freePaintMarkerLayer );
				this.freePaintMarkerLayer.moveToBottom();
			}

			const bclip = ( this.freePaintMarkerClipFunc ? { clipFunc: this.freePaintMarkerClipFunc.bind(this) } : {} );
			this.kFreePaintMarkerGroup = new Konva.Group( bclip );
			this.freePaintMarkerLayer.add( this.kFreePaintMarkerGroup );

			this.kFreePaintMarkerLine = null;
		}

		if ( !this.freePaintLayer ) {
			this.freePaintLayer = new Konva.Layer();
			this.stage.add( this.freePaintLayer );
		}

		const fclip = ( this.freePaintBrushClipFunc ? { clipFunc:this.freePaintBrushClipFunc.bind(this) } : {} );
		this.kFreePaintBrushGroup = new Konva.Group( fclip );
		this.freePaintLayer.add( this.kFreePaintBrushGroup );

		this.linesCopy = [];
		this.isPainting = 0;
		this.paintPoints = [];
		this.kFreePaintLine = null;

		// iconBar
		this.modeIconBar = new iconBar( this.stage, this.modeIconBarDef );
	}

	///////////////////////////////////

	freePaintClearAll ( notify=true ) {
		if ( hasMarker && ( this.hasMarker===undefined || this.hasMarker ) ) {
			this.kFreePaintMarkerGroup.destroyChildren();
			this.freePaintMarkerLayer.batchDraw();
		}
		this.kFreePaintBrushGroup.destroyChildren();
		this.freePaintLayer.batchDraw();

		this.linesCopy = [];

		this.modeIconBar.clickOn(0);

		if ( notify ) {
			this.base.postLog( 'paintClearAll', {} );

			this.base.sendChangeState( this );	// init & send changeState & score
		}
	}

	setPaintMode (mode) {
		this.mode = mode;
		this.base.postLog( 'modeSet', { mode } )
	}

	///////////////////////////////////

	getState () {

		const superState = super.getState();

		if ( this.linesCopy.length ) {

			const state = JSON.parse( superState );
			state.lines = this.linesCopy;
			return JSON.stringify( state );

		} else {

			return superState;

		}
	}

	setState ( state ) {

		super.setState( state );

		try {

			const obj = JSON.parse(state);

			// reconstruct lines
			if ( obj.lines ) {
				this.freePaintClearAll(false);

				obj.lines.forEach( line => {
					const modeTrans = {
						b: 'brush',
						m: 'marker',
						e: 'erase',
					}
					const mode = modeTrans[ line.t ];
					const kLine = new Konva.Line( Object.assign( {}, this.paintLines[ mode ], {
						points: line.p,
					}));
					if ( mode != 'marker' ) {
						this.kFreePaintBrushGroup.add( kLine );
					}
					if ( hasMarker && ( this.hasMarker===undefined || this.hasMarker ) && mode != 'brush' ) {
						this.kFreePaintMarkerGroup.add( mode != 'marker' ? kLine.clone() : kLine );
					}
				})
				this.linesCopy = obj.lines;
			}

			if ( hasMarker && ( this.hasMarker===undefined || this.hasMarker ) ) {
				this.freePaintMarkerLayer.draw();
			}
			this.freePaintLayer.draw();

		} catch (e) {
			console.error(e);
		}

		setStatePostProc(this);
	}

	getChState () {
		const s = super.getChState();
		if ( linesChangeState && this.linesCopy && this.linesCopy.length ) {
			s.lines = this.linesCopy;
		}
		return  s;
	}

	getDefaultChangeState () {

		return super.getDefaultChangeState() || !!( linesChangeState && this.linesCopy && this.linesCopy.length );

	}
}

//////////////////////////////////////////////////////////////////////////////

export const addFreeLabelsTo = ( baseClass ) => class extends baseClass {

	// baseClass must call this.redraw() when values are changed
	// depending changes in pos/text of labels

	constructor ( base, opts = {} ) {

		super( base, opts );
		if ( !opts.freeLabels || !opts.freeLabels.length ) {
			return;
		}

		const additionalDefaultOpts = {

			freeLabels: [
				// {
				// 	x, y, value,		// values or
				// 	xFnc, yFnc, valueFnc, 	// functions that return new Values (updated in this.redraw())
				// 	// additional textFrame-Options
				// }
			],

			defaultFreeLabelOpts: {
				value: '',
				width: 50,
				height: 25,
				fontSize: 15,
				frameWidth: 1,
				cornerRadius: 4,
			},

		};
		mergeAdditionalDefaultsToThis.call( this, additionalDefaultOpts, opts );

		this.freeLabelsInit();
		this.redraw();

		this.initData = this.getChState();
		this.base.sendChangeState( this );	// init & send changeState & score
	}

	///////////////////////////////////

	freeLabelsInit () {

		this.freeLabelsLayer = this.stage.getLayers().slice(-1)[0];

		// create freeLabels
		this.freeLabels.forEach( (l,nr) => {
			if ( l.xFnc ) {
				l.x = l.xFnc.call(this);
			}
			if ( l.yFnc ) {
				l.y = l.yFnc.call(this);
			}
			if ( l.valuefnc ) {
				l.value = l.valueFnc.call(this);
			}

			if ( l.textObj ) {
				l.textObj.deleteAll();
			}
			l.textObj = new textFrame(
				this.base,
				this.freeLabelsLayer,
				Object.assign( {}, this.defaultFreeLabelOpts, l, {
					logObjectId: nr+1,
					onChange: () => {
						this.base.postLog( 'labelChanged', {
							id: nr+1,
							labelNew: l.textObj.value,
						});
						this.base.sendChangeState( this );
					},
				})
			);
		})
	}

	///////////////////////////////////

	redraw () {

		super.redraw.apply( this, arguments );

		// attributes of freeLabels (x, y, text) changed?
		let redraw = 0;
		this.freeLabels.forEach( l => {
			let newPos = 0;
			if ( l.xFnc ) {
				const nval = l.xFnc.call(this);
				if ( nval != l.x ) {
					l.x = nval;
					newPos=1;
				}
			}
			if ( l.yFnc ) {
				const nval = l.yFnc.call(this);
				if ( nval != l.y ) {
					l.y = nval;
					newPos=1;
				}
			}
			if ( newPos ) {
				l.textObj.repos( l.x, l.y );
				redraw = 1;
			}

			if ( l.valueFnc ) {
				const nval = l.valueFnc.call(this);
				if ( nval != l.value ) {
					l.value = nval;
					l.textObj.setVal( nval );
					redraw = 1;
				}
			}
		})

		if ( redraw ) {
			this.freeLabelsLayer.batchDraw();
		}
	}

	///////////////////////////////////

	getState () {

		const superState = super.getState();

		if ( this.freeLabels.length ) {

			let hasData = false;
			const data = this.freeLabels.map( l => {
				if ( !l.readonly ) {
					hasData = true;
					return ({ value: l.textObj.value });
				}
				return ({});
			});

			if ( !hasData ) {
				return superState;
			}

			const state = JSON.parse( superState );
			state.freeLabels = data;
			return JSON.stringify( state );

		} else {

			return superState;

		}
	}

	setState ( state ) {

		super.setState( state );

		try {

			const obj = JSON.parse(state);

			// merge Label-Defs
			if ( obj.freeLabels ) {
				obj.freeLabels.forEach( ( l, n ) => Object.assign( this.freeLabels[n], l ) );
			}
			this.freeLabelsInit();

			this.freeLabelsLayer.draw();

		} catch (e) {
			console.error(e);
		}

		setStatePostProc(this);
	}

	getChState () {
		const s = super.getChState();
		if ( this.freeLabels ) {
			s.l = this.freeLabels.filter( l => !l.readonly ).map( l => l.textObj ? l.textObj.value : '' );
		}
		return  s;
	}

}

//////////////////////////////////////////////////////////////////////////////
