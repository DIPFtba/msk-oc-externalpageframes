import { mergeDeep, getPosOfEvent, setStatePostProc, ignoreEvent } from '../../libs/common'

import Konva from 'konva/lib/Core'
import { Line } from 'konva/lib/shapes/Line'
import { Rect } from 'konva/lib/shapes/Rect'

export class freePaintMultFromSchema {

	constructor ( base, opts = {} ) {

		if ( base.fsm && base.fsm.incInitCnt ) {
			base.fsm.incInitCnt();
		}

		const defaultOpts = {
			paintLine: {
				frameWidth: 1,
				frameColor: 'black',
				lineCap: 'round',
				lineJoin: 'round',
				globalCompositeOperation: 'source-over',
			},
		}
		mergeDeep( Object.assign( this, defaultOpts ), opts );
		this.base = base;
		const stage = base.stage;
		this.stage = stage;

		// define extra-Rects clip Functions (if selected)
		const clipBrush = opts.extraRects.filter( r => r.clipBrush );
		if ( clipBrush.length>0 ) {
			opts.freePaintBrushClipFunc = function ( ctx ) {
				clipBrush.forEach( r => {
					const rw2 = r.w/2;
					const x = r.x+rw2, y = r.y+rw2;
					const w = r.width-r.w, h = r.height-r.w;
					if ( r.r ) {
						ctx.roundRect( x, y, w, h, r.r );
					} else {
						ctx.rect( x, y, w, h );
					}
				})
			}

		} else if ( opts.clip ) {

			// define clip function without/with rounded corners
			const w2 = opts.frameWidth/2;
			const x = opts.x+w2, y = opts.y+w2;
			const w = opts.width-opts.frameWidth, h = opts.height-opts.frameWidth;
			if ( opts.frameRadius ) {
				opts.freePaintBrushClipFunc = function ( ctx ) {
					ctx.roundRect( x, y, w, h, opts.frameRadius );
				}
			} else {
				opts.freePaintBrushClipFunc = function ( ctx ) {
					ctx.rect( x, y, w, h );
				}
			}
		}

		// layer/groups init
		this.layer = new Konva.Layer();
		stage.add( this.layer );

		// Gibt es fest definierte Rechtcke im Hintegrund? Dann gibt es auch eine Hintergund-Gruppe
		if ( opts.doFill || opts.extraRects.some( r => r.fl==1 ) ) {
			this.kGroupBg = new Konva.Group();
			this.layer.add( this.kGroupBg );
		}

		// Gruppe für die Linien
		this.kGroupBrush = new Konva.Group( { clipFunc: opts.freePaintBrushClipFunc } );
		this.layer.add( this.kGroupBrush );

		// Gibt es Rahmen/fest defienierte Rechtecke oder Linien im Vordergund? Dann gibt es auch eine Vordergrund-Gruppe
		if ( opts.frameWidth || opts.extraRects.length>0 || opts.extraLines.length>0 ) {
			this.kGroupFg = new Konva.Group();
			this.layer.add( this.kGroupFg );
		}

		this.initScene();

		this.linesCopy = [];
		this.linesRedo = [];
		this.initData = this.getChState();
		this.base.sendChangeState( this );	// init & send changeState & score

		this.startButtonListener();
		this.sendButtonState();

		this.initInteractivity();

		this.startGetImageListener();
/// #if __DEVELOP
		window.getRectPngImage = this.getRectPngImage.bind(this);
/// #endif

		if ( base.fsm && base.fsm.decInitCnt ) {
			base.fsm.decInitCnt();
		}
	}

	///////////////////////////////////

	initScene () {

		// main frame
		const frOpts = {
			x: this.x, y: this.y,
			width: this.width, height: this.height,
		}
		if ( this.fill ) {
			this.kGroupBg.add( new Konva.Rect({
				...frOpts,
				fill: this.fill,
				cornerRadius: this.radius,
			}));
		}
		if ( this.frameWidth ) {
			this.kGroupFg.add( new Konva.Rect({
				...frOpts,
				stroke: this.frameColor,
				strokeWidth: this.frameWidth,
				cornerRadius: this.frameRadius,
			}));
		}

		// draw extra rects
		this.extraRects.forEach( r => {
			const kOpts = {
				x: r.x, y: r.y,
				width: r.width, height: r.height,
				cornerRadius: r.r || undefined,
			};
			if ( r.fl==1 ) {
				this.kGroupBg.add( new Konva.Rect({
					...kOpts,
					fill: r.f,
				}));
			}
			if ( r.fl==2 || r.w>0 ) {
				this.kGroupFg.add( new Konva.Rect({
					...kOpts,
					stroke: r.c,
					strokeWidth: r.w,
					fill: r.fl==2 ? r.f : undefined,
				}));
			}
		})

		// draw extra lines
		this.extraLines.forEach( l => {
			this.kGroupFg.add( new Konva.Line({
				points: [ l.x1, l.y1, l.x2, l.y2 ],
				stroke: l.c,
				strokeWidth: l.w,
			}));
		})

		this.stage.draw();
	}

	///////////////////////////////////

	initInteractivity () {
		this.paintPoints = null;	// null === no painting in progress

		// interactivity
		if ( !this.readonly ) {

			// Start painting
			stage.on('mousedown touchstart', ev => {
				const pos = getPosOfEvent( this.stage, ev );
				this.paintPoints = [ pos.x, pos.y ];
				this.kFreePaintLine = new Konva.Line({
					...this.paintLine,
					points: this.paintPoints,
				});
				this.kGroupBrush.add( this.kFreePaintLine );

				ev.cancelBubble = true;
			});

			// End painting
			stage.on('mouseup mouseleave touchend', (ev) => {
				if ( ignoreEvent( this.stage, ev ) ) {
					return;
				}
				if ( this.paintPoints!==null ) {
					if ( this.paintPoints.length>2 ) {
						const o = this.packLOpts({
							...this.paintLine,
							points: this.paintPoints,
						});
						this.linesCopy.push(o)
						this.base.postLog( 'line', o );
						this.base.sendChangeState( this );	// init & send changeState & score
					}
					this.paintPoints = null;
					this.sendButtonState();
				}
			});

			// and core function - drawing
			stage.on('mousemove touchmove', ev => {
				if ( ignoreEvent( this.stage, ev ) ) {
					return;
				}
				if ( this.paintPoints!==null ) {
					const pos = getPosOfEvent( this.stage, ev );
					this.paintPoints.push( pos.x, pos.y );
					if ( this.kFreePaintLine ) {
						this.kFreePaintLine.points( this.paintPoints );
						this.layer.batchDraw();
					}
				}
			});

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

	getRectPngImage () {
		const url = this.stage.toDataURL({
			mimeType: "image/png",
			x: Math.max( 0, this.x - Math.ceil( this.frameWidth/2 ) ),
			y: Math.max( 0, this.y - Math.ceil( this.frameWidth/2 ) ),
			width: this.width + 2*Math.ceil( this.frameWidth/2 ),
			height: this.height + 2*Math.ceil( this.frameWidth/2 ),
		});
// console.log(url);
		return url;
	}

	startGetImageListener () {

		// listener for providing image as BASE64 URL
		window.addEventListener(
			"message",
			(event) => {

				try {
					const { callId } = JSON.parse(event.data);
					if ( callId !== undefined && callId.includes("getImage") ) {
						const image = this.getRectPngImage();
						const pass_data = {
							image,
							callId
						};

						window.parent.postMessage( JSON.stringify( pass_data ), '*' );
					}
				} catch (e) {}
			},
			false );
	}

	///////////////////////////////////

	undo () {
		if ( this.linesCopy.length>0 ) {
			const line = this.linesCopy.pop();
			this.linesRedo.push( line );
			this.kGroupBrush.remove( this.kGroupBrush.children[ this.kGroupBrush.children.length-1 ] );

			this.redraw( 'undo', line );
		}
	}

	redo () {
		if ( this.linesRedo.length>0 ) {
			const line = this.linesRedo.pop();
			this.linesCopy.push( line );
			const kLine = new Konva.Line( this.unpackLOpts(line) );
			this.kGroupBrush.add( kLine );

			this.redraw( 'redo', line );
		}
	}

	clearAll () {
		this.linesCopy = [];
		this.linesRedo = [];
		this.kGroupBrush.destroyChildren();

		this.redraw( 'clearAll' );
	}

	redraw ( log1, log2 ) {
		this.layer.draw();

		this.sendButtonState();
		if ( log1, log2={} ) {
			this.base.postLog( log1, log2 );
		}
		this.base.sendChangeState( this );
	}

	setBrush ( color, width, mode ) {
		if ( color ) {
			if ( color.match( /^[0-9a-fA-F]{6}$/ ) ) {
				color = '#' + color;
			}
			this.paintLine.stroke = color;
		}
		if ( width ) {
			this.paintLine.strokeWidth = +width;
		}
		if ( mode ) {
			this.paintLine.globalCompositeOperation = mode==='sub' ? 'destination-out' : 'source-over';
		}
		this.base.postLog( 'setBrush', { c: color, w: +width, a: mode } );
	}

	startButtonListener () {
		window.addEventListener(
			"message",
			(event) => {
				try {
					const [ cmd, p1, p2, p3 ] = JSON.parse(event.data);
					switch ( cmd ) {
						case 'undo':
							this.undo();
							break;
						case 'redo':
							this.redo();
							break;
						case 'clearAll':
							this.clearAll();
							break;
						case 'setBrush':
							this.setBrush( p1, p2, p3 );
							break;
					}
				} catch (e) {}
			},
			false );
	}

	sendButtonState () {
		const canUndo = this.linesCopy.length>0;
		if ( canUndo !== this.canUndoSent ) {
			this.base.fsm.triggerEvent( ( canUndo ? 'can' : 'canNot' ) + 'Undo' );
			this.canUndoSent = canUndo;
		}

		const canRedo = this.linesRedo.length>0;
		if ( canRedo !== this.canRedoSent ) {
			this.base.fsm.triggerEvent( ( canRedo ? 'can' : 'canNot' ) + 'Redo' );
			this.canRedoSent = canRedo;
		}
	}

	///////////////////////////////////

	packLOpts ( u ) {
		const o = {
			p: u.points,
		};
		if ( u.stroke!='black' && u.stroke!='#000000' ) {
			o.c = u.stroke;
		}
		if ( u.strokeWidth!=1 ) {
			o.w = u.strokeWidth;
		}
		if ( u.globalCompositeOperation!='source-over' ) {
			o.a = 'sub';
		}
		return o;
	}

	unpackLOpts ( o ) {
		return {
			points: o.p,
			stroke: o.c || 'black',
			strokeWidth: o.w || 1,
			globalCompositeOperation: o.a==='sub' ? 'destination-out' : 'source-over',
		}
	}

	getState () {
		return JSON.stringify({
			l:  this.linesCopy,
			r:  this.linesRedo,
		})
	}

	setState ( state ) {
		try {
			const saved = JSON.parse( state );

			this.kGroupBrush.destroyChildren();
			this.linesRedo = saved.r;
			this.linesCopy = saved.l;

			this.linesCopy.forEach( l => {
				const kLine = new Konva.Line( this.unpackLOpts( l ) );
				this.kGroupBrush.add( kLine );
			})
			this.layer.draw();

			this.sendButtonState();

		} catch (e) {
			console.error(e);
		}

		setStatePostProc(this);
	}

	getChState () {
		return this.linesCopy;
	}

	getDefaultChangeState () {
		return this.linesCopy.length>0;
	}
}
