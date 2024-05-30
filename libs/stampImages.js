import { mergeDeep, getXofEvent, getYofEvent, setStatePostProc, ignoreEvent } from './common'

import { iconBar } from './iconBar'

import Konva from 'konva/lib/Core'
import { Rect } from 'konva/lib/shapes/Rect'
import { Line } from 'konva/lib/shapes/Line'

import pen from './img/pen.png'
import pen_32 from './img/pen_32.png'
import clearicon from './img/clearicon.png'

export class stampImages {

	constructor ( base, opts = {} ) {

		['x','y','width','height','iconBarX','iconBarY','stamps'].forEach( o => {
			if ( !( o in opts ) ) {
				throw( `stampImages: parameter '${o}' not specified!` );
			}
		})
		if ( base.fsm && base.fsm.incInitCnt ) {
			base.fsm.incInitCnt();
		}

		// Defaults to opts
		const defaultOpts = {
			// x, y
			// width, height

			// iconBarX, iconBarY
			iconWidth: 32,

			stampWidth: 32,
			// stamps: [
			// 	'child.png', 'dot.png',
			// ],

			lineSettings: {
				stroke: 'blue',
				strokeWidth: 2,
				lineCap: 'round',
				lineJoin: 'round',
			},

			penStrokeWidth: 1,
			readonly: 0,
			logObjectId: 1,
		}
		mergeDeep( Object.assign( this, defaultOpts ), opts );
		this.base = base;
		const stage = base.stage;
		this.stage = stage;

		this.layer = new Konva.Layer();
		this.stage.add( this.layer );

		this.sticky = 0;

		this.init();
		this.base.sendChangeState( this );	// init & send changeState & score

		// interactivity
		this.stage.on( 'mousedown touchstart', (ev) => {
			this.startPaint(ev);
			ev.cancelBubble = true;
		});
		this.stage.on( 'mousemove touchmove', (ev) => {
			if ( this.kDragObj ) {
				this.kDragObj.x( getXofEvent( this.stage, ev )-this.dragOffsX );
				this.kDragObj.y( getYofEvent( this.stage, ev )-this.dragOffsY );
				this.layer.batchDraw();
			} else {
				this.movePaint( ev )
			}
		})
		this.stage.on( 'mouseup mouseleave touchend', (ev) => {
			if ( ignoreEvent( this.stage, ev ) ) {
				return;
			}
			if ( this.kDragObj ) {
				// dropped over iconbar?
				const x = getXofEvent( this.stage, ev );
				if ( x > this.iconBarX-5 ) {
					this.kDragObj.destroy();
					this.layer.batchDraw();

					this.base.postLog( 'objRemoved', {
						obj: this.kDragObj.stampId,
						id: this.kDragObj.logObjectId,
					} );

				} else {
					this.base.postLog( 'objDropped', {
						obj: this.kDragObj.stampId,
						id: this.kDragObj.logObjectId,
						x: this.kDragObj.x(),
						y: this.kDragObj.y(),
					});
				}
				// end drag
				this.kDragObj = null;
			} else {
				this.endPaint( ev );
			}
			this.base.sendChangeState( this );
		})

		if ( base.fsm && base.fsm.decInitCnt ) {
			base.fsm.decInitCnt();
		}
	}

	///////////////////////////////////

	init () {

		if ( this.layer ) {
			this.layer.destroy();
		}
		this.layer = new Konva.Layer();
		this.stage.add( this.layer );

		// rectangle
		this.layer.add( new Konva.Rect({
			x: this.x,
			y: this.y,
			width: this.width,
			height: this.height,
			stroke: 'black',
			strokeWidth: 1,
		}) )
		this.kGroup = new Konva.Group({
			clip: {
				x: this.x+1,
				y: this.y+1,
				width: this.width-2,
				height: this.height-2,
			}
		})
		this.layer.add( this.kGroup );

		// init iconBar
		if ( this.iconBar ) {
			this.iconBar.destroy();
		}

		const icons = [];
		this.stamps.forEach( ( s, i ) => {
			icons.push({
				src: s,
				on: this.dragIcon.bind( this, i ),
			})
		})
		icons.push({
			src: pen,
			cursor: `url(${pen_32}) 3 32, auto`,
			on: () => this.isPen = 1,
			off: () => this.isPen = 0,
		})
		icons.push({
			src: clearicon,
			on: () => {
				this.init();
				this.base.postLog( 'clearAll', {
					id: this.logObjectId,
				});
				this.base.sendChangeState( this );
			}
		})
		this.iconBar = new iconBar( this.stage, {
			x: this.iconBarX,
			y: this.iconBarY,
			width: this.iconWidth,
			height: this.iconWidth,
			sticky: true,
			frameWidth: 0,
			icons: icons,
		})

		// var-inits
		this.kDragObj = null;
		this.isPen = 0;
		this.isPainting = 0;
		this.layer.draw();
	}

	dragIcon ( i, ev ) {

		// create drag Object
		const kDragObj = this.iconBar.icons[i].kIcon.clone();
		kDragObj.off();
		kDragObj.on( 'mousedown touchstart', (ev) => {
			if ( !this.isPen ) {
				this.kDragObj = kDragObj;
				this.base.postLog( 'objDragged', {
					obj: kDragObj.stampId,
					id: kDragObj.logObjectId,
					x: kDragObj.x(),
					y: kDragObj.y()
				});
				ev.cancelBubble = true;
			}
		});
		kDragObj.logObjectId = this.logObjectId++;
		kDragObj.stampId = i;
		this.dragOffsX = getXofEvent( this.stage, ev ) - kDragObj.x();
		this.dragOffsY = getYofEvent( this.stage, ev ) - kDragObj.y();
		this.kGroup.add( kDragObj );
		this.kDragObj = kDragObj;

		// disable "stickiness" of selected icon in iconBar
		this.iconBar.deactivate();

		this.base.postLog( 'objDragNew', {
			obj: i,
			id: kDragObj.logObjectId
		});
	}

	///////////////////////////////////

	startPaint (ev) {
		if ( !this.isPainting && this.isPen ) {
			const xa = getXofEvent( this.stage, ev );
			if ( xa <= this.iconBarX-5 ) {
				this.isPainting = 1;

				this.paintLine = new Konva.Line( Object.assign( {}, this.lineSettings, {
					points: [ getXofEvent( this.stage, ev ), getYofEvent( this.stage, ev ) ],
				}) );
				this.kGroup.add( this.paintLine );
			}
		}
	}

	movePaint (ev) {
		if ( this.isPainting ) {
			const xa = getXofEvent( this.stage, ev );
			if ( xa > this.iconBarX-5 ) {
				this.isPainting = 0;
			} else {
				const ya = getYofEvent( this.stage, ev );
				const newPoints = this.paintLine.points().concat( [ xa, ya ] );
				this.paintLine.points( newPoints );
				this.layer.batchDraw();
			}
		}
	}

	endPaint (ev) {
		if ( this.isPainting ) {
			this.movePaint(ev);
			this.isPainting = 0;

			this.base.postLog( 'line', {
				id: this.logObjectId,
				points: this.paintLine.points(),
			});
		}
	}

	///////////////////////////////////

	getState () {

		const state = {
			stamps: this.stamps.map( s => [] ),
				// [
				// 	{ x, y, }, ...		// All Imgs-Coords of Stamp ID 0
				// ],
				// [
				// 	{ x, y, }, ...		// All Imgs-Coords of Stamp ID 1
				// ],
			// ],
			lines: [
				// [x1,y1,x2,y2,...],
				// ..
			],
			logObjectId: this.logObjectId,
		}

		this.kGroup.getChildren().forEach( c => {

			const className = c.getClassName();

			if ( className=='Line' ) {
				// save line points
				state.lines.push( c.points() );

			} else if ( className=='Image' ) {
				const stampId = c.stampId;
				// save image Coords
				if ( typeof state.stamps[stampId]==='undefined' ) {
					state.stamps[stampId] = [];
				}
				state.stamps[stampId].push( {
					x: c.x(),
					y: c.y(),
					logObjectId: c.logObjectId,
				});
			}
		})

		return JSON.stringify( state );
	}

	loadState ( state ) {

		try {

			const load = JSON.parse( state );
			// draw images
			load.stamps.forEach( ( s, si ) => {
				s.forEach( coords => {
					const kImage = this.iconBar.icons[si].kIcon.clone();
					kImage.off();
					kImage.on( 'mousedown touchstart', (ev) => {
						if ( !this.isPen ) {
							this.kDragObj = kImage
							this.base.postLog( 'objDragged', {
								obj: kImage.stampId,
								id: kImage.logObjectId,
								x: kImage.x(),
								y: kImage.y()
							});
							ev.cancelBubble = true;
						}
					});
					kImage.x( coords.x );
					kImage.y( coords.y );
					kImage.stampId = si;
					kImage.logObjectId = coords.logObjectId;
					this.kGroup.add( kImage );
				})
			})
			// draw lines
			load.lines.forEach( l => {
				this.kGroup.add( new Konva.Line( Object.assign( {}, this.lineSettings, {
					points: l,
				}) ) );
			});

			this.kGroup.draw();
			this.logObjectId = load.logObjectId;

		} catch (e) {
			console.error(e);
		}

		setStatePostProc(this);
	}

	waitForIcons ( state ) {
		if ( this.stateToLoad===state ) {
			// while not all icons loaded: wait & restart
			if ( this.iconBar.icons.some( i => !i.kIcon ) ) {
				window.setTimeout( () => this.waitForIcons(state), 50 );
			} else {
				// all icons loaded -> load State! (if no other state should be loaded)
				// restore (meanwhile changed) isDemoAni
				const isDemoAni = this.stage.isDemoAni;
				this.stage.isDemoAni = this.savedIsDemoAni;
				this.loadState(state);
				this.stage.isDemoAni = isDemoAni;
			}
		}
	}

	setState ( state ) {
		this.savedIsDemoAni = this.stage.isDemoAni;
		this.stateToLoad = state;
		this.init();
		this.waitForIcons(state);
	}

	// Check if User made changes
	getDefaultChangeState () {
		return this.kGroup.hasChildren();
	}
}
