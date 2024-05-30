import { delDefaults, mergeDeep, object_equals, getXofEvent, getYofEvent, getPosOfEvent, setStatePostProc, ignoreEvent } from './common'

import { textFrame } from './textFrame'

import Konva from 'konva/lib/Core'
import { Line } from 'konva/lib/shapes/Line'

export class connectedFrames {

	constructor ( base, opts = {} ) {

		if ( base.fsm && base.fsm.incInitCnt ) {
			base.fsm.incInitCnt();
		}

		// Defaults to opts
		this.defaultFrameOpts = {
			// x, y
			width: 75,
			height: 25,
			fontSize: 20,
			cornerRadius: 0,
			text: '',
			getConnectorPos: function () {
				return { x: this.x + this.width/2, y: this.y };
			},
			// can this frame be connected to 'frame'?
			canConnectTo ( frame ) {
				return true;
			},
			readonly: 0,
			logObjectId: 1,
		};
		this.defaultConnectionOpts = {
			stroke: 'black',
			readonly: 0,
		};
		const defaultOpts = {

			frames: [
				// defaultFrameOpts
			],

			connections: [
				// { from: <frame-index>, to: <frame-index>, readonly: 0 },
			],

			connectionWidth: 2,
			highlightColor: 'tomato',

			readonly: 0,
		}
		// this.constructorFrames = opts.frames;	// save original opts.frames[], setState can't restore getConnectorPos()
		mergeDeep( Object.assign( this, defaultOpts ), opts );
		this.base = base;
		const stage = base.stage;
		this.stage = stage;

		this.newConnFrom = null;
		this.newConnTo = null;

		// Frames
		this.drawFrames();

		// connections
		this.drawConnections();

		this.initData = this.getChState();
		this.base.sendChangeState( this );	// init & send changeState & score

		// interactivity new connection
		if ( !this.readonly ) {
			// (hidden) line for new connections
			this.newline_layer = new Konva.Layer();
			this.stage.add( this.newline_layer );

			this.kNewLine = new Konva.Line({
				points: [],
				strokeWidth: this.connectionWidth,
			});
			this.newline_layer.add( this.kNewLine );

			// draw line sticky to cursor
			this.stage.on( 'mousemove touchmove', (event) => {

				if ( event.type == "touchmove" ) {
					this.simTouchEnter( event );
				}

				// handle mousemove touchmove
				if ( this.newConnFrom!==null ) {
					const p1 = this.newConnFrom.getConnectorPos();
					let p2;
					if ( this.newConnTo!==null ) {
						p2 = this.newConnTo.getConnectorPos();
					} else {
						p2 = { 	x: getXofEvent( this.stage, event ),
								y: getYofEvent( this.stage, event ), };
					}
					this.kNewLine.points( [ p1.x, p1.y, p2.x, p2.y ] );
					this.kNewLine.stroke( this.highlightColor );
					this.newline_layer.batchDraw();
				}
			})
			// end stickiness
			this.stage.on( 'mouseleave mouseup touchend', (event) => {
				if ( ignoreEvent( this.stage, event ) ) {
					return;
				}
				if ( this.newConnFrom!==null && this.newConnTo===null ) {
					this.base.postLog( 'connAbort', {
						id: this.logObjectId,
						from: this.newConnFrom.textFrame.value
					});
					this.newConnFrom.textFrame.kFrame.stroke( 'black' );
					this.frame_layer.batchDraw();
					this.newConnFrom = null;

					this.hideNewLine();
				}
			})
		}

		if ( base.fsm && base.fsm.decInitCnt ) {
			base.fsm.decInitCnt();
		}
	}

	///////////////////////////////////

	drawFrames () {

		if ( this.frame_layer ) {
			this.frame_layer.destroy();
		}
		this.frame_layer = new Konva.Layer();
		this.stage.add( this.frame_layer );

		this.frames.forEach( ( f, nr ) => {
			const fo = Object.assign( {}, this.defaultFrameOpts, f );
			fo.value = fo.text;
			fo.onChange = () => this.base.sendChangeState( this );
			fo.textFrame = new textFrame( this.base, this.frame_layer, fo );
			this.frames[nr] = fo;

			// interactivity new connection
			if ( !this.readonly ) {
				fo.textFrame.kText.on( 'mouseenter', () => {
					this.mouseenter(fo);
				})
				fo.textFrame.kText.on( 'mouseleave', (ev) => {
					if ( ignoreEvent( this.stage, ev ) ) {
						return;
					}
					this.mouseleave(fo);
				})
				fo.textFrame.kText.on( 'mousedown touchstart', (ev) => {
					if ( this.newConnFrom===null ) {
						this.newConnFrom = fo;
						this.base.postLog( 'connStartFrom', {
							id: this.logObjectId,
							from: this.newConnFrom.textFrame.value
						});
						ev.cancelBubble = true;
					}
				})
				fo.textFrame.kText.on( 'mouseup touchend', () => {
					if ( this.newConnFrom!==null && this.newConnTo!==null ) {
						this.newConnFrom.textFrame.kFrame.stroke( 'black' );
						this.frame_layer.batchDraw();

						const fromIndex = this.frames.findIndex( f => f===this.newConnFrom ) ;
						const toIndex = nr;
						if ( !this.connections.some( c => c.from==fromIndex && c.to==toIndex ||
															c.from==toIndex && c.to==fromIndex ) ) {
							this.connections.push( { from: fromIndex, to: toIndex } );
							this.drawConnections();
						}
						this.newConnFrom = null;
						this.newConnTo = null;

						this.hideNewLine();
						this.base.sendChangeState( this );
					}
				})
			}
		})

		this.frame_layer.draw();
	}

	drawConnections () {

		if ( this.line_layer ) {
			this.line_layer.destroy();
		}
		this.line_layer = new Konva.Layer();
		this.stage.add( this.line_layer );

		this.connections.forEach( ( c, nr ) => {
			const co = Object.assign( {}, this.defaultConnectionOpts, c );
			const cp1 = this.frames[ c.from ].getConnectorPos();
			const cp2 = this.frames[ c.to ].getConnectorPos();
			co.points = [ cp1.x, cp1.y, cp2.x, cp2.y ];
			co.strokeWidth = this.connectionWidth;
			co.hitStrokeWidth = this.connectionWidth*7;
			co.stroke = co.readonly || this.readonly ? 'black' : 'blue';

			co.kConnection = new Konva.Line( co );
			this.line_layer.add( co.kConnection );
			this.connections[nr] = co;

			// interactivity delete connection
			if ( !this.readonly && !co.readonly ) {
				co.kConnection.on( 'mouseenter', () => {
					if ( this.newConnFrom===null ) {
						co.kConnection.stroke( this.highlightColor );
						co.kConnection.opacity( 0.6 );
						co.kConnection.dash( [ 5, 5 ] );
						this.line_layer.batchDraw();
					}
				})
				co.kConnection.on( 'mouseleave', (ev) => {
					if ( ignoreEvent( this.stage, ev ) ) {
						return;
					}
					if ( this.newConnFrom===null ) {
						co.kConnection.stroke( co.readonly || this.readonly ? 'black' : 'blue' );
						co.kConnection.opacity( 1 );
						co.kConnection.dash( null );
						this.line_layer.batchDraw();
					}
				})
				co.kConnection.on( 'mousedown touchstart tap', (ev) => {
					if ( this.newConnFrom===null ) {
						this.connections.splice( nr, 1 );
						this.drawConnections();
						this.base.sendChangeState( this );
						ev.cancelBubble = true;
					}
				})
			}
		})

		this.line_layer.draw();
	}

	hideNewLine () {
		this.kNewLine.points( [] );
		this.kNewLine.stroke( null );
		this.newline_layer.batchDraw();
	}

	///////////////////////////////////

	mouseenter (fo) {
		if ( this.newConnFrom===null ) {
			fo.textFrame.kFrame.stroke( this.highlightColor );
			this.frame_layer.draw();
		} else {
			if ( fo !== this.newConnFrom && fo.canConnectTo( this.newConnFrom ) ) {
				this.base.postLog( 'connSetTo', {
					id: this.logObjectId,
					from: this.newConnFrom.textFrame.value,
					to: fo.textFrame.value
				});
				this.newConnTo = fo;
			}
		}
	}

	mouseleave (fo) {
		if ( this.newConnFrom===null ) {
			fo.textFrame.kFrame.stroke( 'black' );
			this.frame_layer.draw();
		} else {
			if ( fo !== this.newConnFrom ) {
				this.base.postLog( 'connDelTo', {
					id: this.logObjectId,
					from: this.newConnFrom.textFrame.value,
					to: fo.textFrame.value
				});
				this.newConnTo = null;
			}
		}
	}

	// sim mouseenter/leave on touchmove
	simTouchEnter (ev) {

		const pos = getPosOfEvent( this.stage, ev );
		const oelm = this.frames.find( frame =>
								pos.x >= frame.x && pos.x <= frame.x+frame.width &&
								pos.y >= frame.y && pos.y <= frame.y+frame.height );

		if ( this.last_touched_elem && this.last_touched_elem !== oelm ) {
			this.mouseleave( this.last_touched_elem );
			this.last_touched_elem = undefined;
		}
		if ( oelm && this.last_touched_elem !== oelm ) {
			this.last_touched_elem = oelm;
			this.mouseenter( oelm );
		}
	}

	///////////////////////////////////

	getState () {

		const state = {
		 	// frames: delDefaults( this.frames, this.defaultFrameOpts, [ 'textFrame' ] ),
			connections: delDefaults( this.connections, this.defaultConnectionOpts, [ 'kConnection' ] ),
			// logObjectId: this.logObjectId,
		}
		if ( this.frames.some( f => !f.readonly ) ) {
			state['frameLabels'] = this.frames.map( f => f.textFrame.value );	// save (changed?) labels of frames
		}
		return JSON.stringify( state );
	}

	setState( state ) {

		this.newConnFrom = null;
		this.newConnTo = null;
		this.hideNewLine();

		try {

			const load = JSON.parse(state);
			// this.frames = mergeDeep( this.constructorFrames, load.frames );	// set original opts.frames[], setState can't restore getConnectorPos()
			if ( load.frameLabels ) {
				load.frameLabels.forEach( (l,nr) => {
					this.frames[nr].text = l;
				})
			}
			this.drawFrames();
			this.connections = load.connections;
			this.drawConnections();
			// this.logObjectId = load.logObjectId;

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
			labels: this.frames.map( f => f.textFrame.value ),
			connections: this.connections.map( c => ({ from: c.from, to: c.to }) ),
		}
	}

}
