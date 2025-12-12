import { mergeDeep, getPosOfEvent, setStatePostProc, ignoreEvent } from '../../libs/common'

//
// Ähnlich wie freePaintFromSchema, aber ohne Toolbar, die Farben werden von außen gesetzt
// Unterstützt Undo/Redo und ClearAll
//

// testcalls:
//			window.postMessage( JSON.stringify( { callId: 'getImage' } ), '*' );
//			window.postMessage( JSON.stringify( ['undo'] ), '*' );
//			window.postMessage( JSON.stringify( ['redo'] ), '*' );
//			window.postMessage( JSON.stringify( ['clearAll'] ), '*' );
//			window.postMessage( JSON.stringify( ['setBrush', '#ff0000', 5, 'add'] ), '*' );
//			window.postMessage( JSON.stringify( ['setBrush', '#000000', 20, 'sub'] ), '*' );

import Konva from 'konva/lib/Core'
import { Line } from 'konva/lib/shapes/Line'
import { Rect } from 'konva/lib/shapes/Rect'

import penicon from '../../libs/img/penicon.png'
import erasericon from '../../libs/img/erasericon.png'

export class freePaintMultFromSchema {

	constructor ( base, opts = {} ) {

		base.regSendInitDone();
		base.incInitCnt();

		if ( opts.width<= 0 ) {
			opts.width += base.width - opts.x;
		}
		if ( opts.height<= 0 ) {
			opts.height += base.height - opts.y;
		}

		const defaultOpts = {
			paintLine: {
				strokeWidth: 1,
				stroke: 'black',
				lineCap: 'round',
				lineJoin: 'round',
				globalCompositeOperation: 'source-over',
			},

			cursorPaint: 'url(' + penicon + '), auto',
			cursorErase: 'url(' + erasericon + '), auto',
		}
		mergeDeep( Object.assign( this, defaultOpts ), opts );
		this.base = base;
		const stage = base.stage;
		this.stage = stage;

		// define extra-Rects clip Functions (if selected)
		let freePaintBrushClipFunc;
		const clipBrush = opts.extraRects.filter( r => r.clipBrush );

		if ( clipBrush.length>0 ) {
			freePaintBrushClipFunc = function ( ctx ) {
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
				freePaintBrushClipFunc = function ( ctx ) {
					ctx.roundRect( x, y, w, h, opts.frameRadius );
				}
			} else {
				freePaintBrushClipFunc = function ( ctx ) {
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
		this.kGroupBrush = new Konva.Group( { clipFunc: freePaintBrushClipFunc } );
		this.layer.add( this.kGroupBrush );

		// Gibt es Rahmen/fest defienierte Rechtecke oder Linien im Vordergund? Dann gibt es auch eine Vordergrund-Gruppe
		if ( opts.frameWidth || opts.extraRects.length>0 || opts.extraLines.length>0 ) {
			this.kGroupFg = new Konva.Group();
			this.layer.add( this.kGroupFg );
		}

		this.paintObj = this.stage;

		// Inits

		this.initScene();

		this.linesCopy = [];
		this.linesRedo = [];
		this.initData = this.getChState();
		this.base.sendChangeState( this );	// init & send changeState & score

		this.startButtonListener();
		this.sendButtonState();

		this.initInteractivity();

		// this.startGetImageListener();
/// #if __DEVELOP
		window.getRectPngImage = this.getRectPngImage.bind(this);
/// #endif

		// Wenn alles initialisiert (auch das, was erst später gemalt wird)
		base.getInitDonePromise().then( () => {
			this.coloredPointsAtStart = this.getPointsColored();
		});

		base.decInitCnt();
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
			 const kRect = new Konva.Rect({
				...frOpts,
				stroke: this.frameColor,
				strokeWidth: this.frameWidth,
				cornerRadius: this.frameRadius,
			});
			this.kGroupFg.add( kRect );
			if ( this.clipBrush ) {
				this.paintObj = kRect;
			}
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

	paintLinesCopy () {
		this.linesCopy.forEach( l => {
			const opts = this.unpack2KonvaOpts( l );
			const kLine = new Konva.Line( opts );
			this.kGroupBrush.add( kLine );
		})
		this.layer.batchDraw();
		this.linesUpdated();
	}

	///////////////////////////////////

	initInteractivity () {
		this.paintPoints = null;	// null === no painting in progress

		// interactivity
		if ( !this.readonly ) {

			this.stage.on('mousedown touchstart', this.iStartDraw.bind(this) );
			this.stage.on('mousemove touchmove', this.iDraw.bind(this) );
			this.stage.on('mouseup mouseleave touchend', this.iEndDraw.bind(this) );

			this.paintObj.on( 'mouseleave', (ev) => {
				if ( ignoreEvent( this.stage, ev ) ) {
					return;
				}
				document.body.style.cursor = "default";
			});

			this.paintObj.on( 'mouseenter', (ev) => {
				if ( ignoreEvent( this.stage, ev ) ) {
					return;
				}
				document.body.style.cursor = this.paintLine.globalCompositeOperation==='source-over' ? this.cursorPaint : this.cursorErase;
			})
		}
	}

	iStartDraw ( ev ) {
		const pos = getPosOfEvent( this.stage, ev );
		this.paintPoints = [ pos.x, pos.y ];
		this.kFreePaintLine = new Konva.Line({
			...this.paintLine,
			points: this.paintPoints,
		});
		this.kGroupBrush.add( this.kFreePaintLine );

		ev.cancelBubble = true;
		return [ pos.x, pos.y ];
	}

	iDraw ( ev ) {
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
			return [ pos.x, pos.y ];
		}

		ev.cancelBubble = true;
	}

	iEndDraw ( ev ) {
		if ( ignoreEvent( this.stage, ev ) ) {
			return;
		}
		if ( this.paintPoints!==null ) {
			const o = this.packLOpts({
				...this.paintLine,
				points: this.paintPoints,
			});
			this.linesCopy.push(o);
			this.linesRedo.length = 0;	// clear redo buffer
			this.undoClearAll = null;
			this.paintPoints = null;
			this.linesUpdated();

			this.base.postLog( 'line', this.corr4Log(o) );

			this.detectCleared();

			this.base.sendChangeState( this );
			this.sendButtonState();
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

	getPointsColored (threshold=0) {
		// Image holen
		const layer = this.layer;
		const canvas = layer.getCanvas()._canvas;
		const context = canvas.getContext('2d');
		const imageData = context.getImageData(0, 0, canvas.width, canvas.height);
		const pixelDaten = imageData.data; // Das Array mit [R, G, B, A, R, G, B, A, ...]
		// Durchiterieren und Prüfen
		let coloredPoints = 0;

		// const histogram = [];

		// Das Array wird in Schritten von 4 durchlaufen (R, G, B, A)
		for ( let i = 0; i < pixelDaten.length; i += 4) {
			// // Histogramm speichern
			// const entry = histogram.find( h => h.r===pixelDaten[i] && h.g===pixelDaten[i+1] && h.b===pixelDaten[i+2] && h.a===pixelDaten[i+3] );
			// if ( entry ) {
			// 	entry.c++;
			// } else {
			// 	histogram.push( { r: pixelDaten[i], g: pixelDaten[i+1], b: pixelDaten[i+2], a: pixelDaten[i+3], c: 1 } );
			// }

			// Wir prüfen hier, ob er nicht weiß ist UND sichtbar (Alpha > 0)
			if (pixelDaten[i+3]/*A*/ > 150 && (pixelDaten[i]/*R*/ < 200 || pixelDaten[i+1]/*G*/ < 200 || pixelDaten[i+2]/*B*/ < 200)) {
				coloredPoints++;
				if ( threshold && coloredPoints > threshold ) {
					return coloredPoints;
				}
			}
		}
		// // Histogram ausgeben
		// histogram.sort( (a,b) => b.c - a.c );
		// console.log("===== getPointsColored histogram:", histogram );

		return coloredPoints;
	}

	detectCleared () {
		if ( this.linesCopy.length === 0 ) {
			return;
		}
		// Feststellen, ob nach Eraser noch gefärbte Punkte vorhanden sind
		const threshold = this.coloredPointsAtStart + 25; // Anzahl der gefärbten Punkte, ab der wir sagen, dass es nicht leer ist

		const coloredPoints = this.getPointsColored( threshold );
		if ( coloredPoints < threshold ) {
			this.base.postLog( 'clearedByEraser', {} );
			this.clearAll();
			this.undoTwice = true;
			this.base.sendChangeState( this );
		}
	}

	///////////////////////////////////

	undo () {
		if ( Array.isArray(this.undoClearAll) && this.undoClearAll.length>0 ) {
			this.linesCopy = this.undoClearAll;
			this.drawLog( 'undoClearAll', this.undoClearAll );
			this.undoClearAll = null;
			this.paintLinesCopy();

			// Auch das zum Löschen geführte Radieren rückgängig machen?
			if ( this.undoTwice ) {
				this.undo();
			}
		} else if ( this.linesCopy.length>0 ) {
			const line = this.linesCopy.pop();
			this.linesRedo.push( line );
			this.kGroupBrush.children[ this.linesCopy.length ].destroy();
			this.linesUpdated();

			this.drawLog( 'undo', line );
		}
	}

	redo () {
		if ( this.linesRedo.length>0 ) {
			const line = this.linesRedo.pop();
			this.linesCopy.push( line );
			const kLine = new Konva.Line( this.unpack2KonvaOpts(line) );
			this.kGroupBrush.add( kLine );
			this.linesUpdated();

			this.drawLog( 'redo', line );
			this.detectCleared();
		}
	}

	clearAll () {
		this.undoClearAll = this.linesCopy;
		this.undoTwice = false;
		this.linesCopy = [];
		this.linesRedo = [];
		this.kGroupBrush.destroyChildren();
		this.linesUpdated();

		this.drawLog( 'clearAll' );
	}

	drawLog ( log1, log2={} ) {
		this.layer.draw();
// console.log(`======== CMD ${log1} received ========`);
		this.sendButtonState();
		if ( log1, log2 ) {
			this.base.postLog( log1, log2 );
		}
		this.base.sendChangeState( this );
	}

	setBrush ( color, width, mode ) {
// console.log(`======== CMD setBrush (${color}/${width}/$mode) received ========`);
		if ( color ) {
			// if ( color.match( /^[0-9a-fA-F]{6}$/ ) ) {
			// 	color = '#' + color;
			// }
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
// console.log('#################',event.data,event.origin)
				let cmd='', p1='', p2='', p3='';
				try {
					[ cmd, p1, p2, p3 ] = JSON.parse(event.data);
				} catch (e) {
					// console.error(e);
				}
				if ( cmd ) {
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
				}
			},
			false );
	}

	sendButtonState () {
		const canUndo = this.linesCopy.length>0 || ( Array.isArray(this.undoClearAll) && this.undoClearAll.length>0 );
		if ( canUndo !== this.canUndoSent ) {
			const ev = `EV_${ canUndo ? 'CAN' : 'CANNOT' }_UNDO`;
// console.log(`-------- EVENT ${ev} sent --------`);
			this.base.fsm.triggerEvent( ev );
			this.canUndoSent = canUndo;
		}

		const canRedo = this.linesRedo.length>0;
		if ( canRedo !== this.canRedoSent ) {
			const ev = `EV_${ canRedo ? 'CAN' : 'CANNOT' }_REDO`;
// console.log(`-------- EVENT ${ev} sent --------`);
			this.base.fsm.triggerEvent( ev );
			this.canRedoSent = canRedo;
		}
	}

	linesUpdated () {
		// wird in abgeleiteten Klassen überschrieben
	}

	///////////////////////////////////

	unpack2KonvaOpts (o) {
		// hier sind die Einträge nach unpackLOpts schon die Konva Options
		// Ist in abgeleiteten Klassen nicht mehr so
		return this.unpackLOpts( o );
	}

	corr4Log (p) {
		// hier sind die Einträge (nach packLOpts) schon die zu loggenden Daten
		// Ist in abgeleiteten Klassen nicht mehr so
		return p;
	}

	packLOpts ( u ) {
		const o = {
			p: u.points,
		}
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
		const state = {
			l:  this.linesCopy,
			r:  this.linesRedo,
		};
		if ( this.undoClearAll ) {
			state.c = this.undoClearAll;
			state.u = +this.undoTwice;
		}
		return JSON.stringify(state)
	}

	setState ( state ) {
		try {
			const saved = JSON.parse( state );

			this.kGroupBrush.destroyChildren();
			this.linesRedo = saved.r;
			this.linesCopy = saved.l;
			if ( saved.c ) {
				this.undoClearAll = 1;
				this.undoTwice = saved.u;
			}
			this.paintLinesCopy();

			this.sendButtonState();

		} catch (e) {
			console.error(e);
		}

		this.sendButtonState();
		setStatePostProc(this);
	}

	getChState () {
		return this.linesCopy;
	}

	getDefaultChangeState () {
		return this.linesCopy.length>0;
	}
}
