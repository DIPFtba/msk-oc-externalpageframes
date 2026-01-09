import { freePaintFromSchema } from './freePaint.js';
import { baseInits } from '../../libs/baseInits.js';
import './imageHighlighting.css';

function addPx ( val ) {
	return val.match( /^[0-9]+$/ ) ? val+'px' : val;
}

// function cancelEvent ( ev ) {
// 	if ( ev.preventDefault ) {
// 		ev.preventDefault();
// 		if ( ev.stopPropagation ) {
// 			ev.stopPropagation();
// 		}
// 	} else {
// 		ev.cancelBubble = true;
// 	}
// }

// const startPaintDistance = 7;
// const startTimeoutMs = 200;

import penicon from '../../libs/img/penicon.png'
import erasericon from '../../libs/img/erasericon.png'
import { getPosOfEvent } from '../../libs/common.js';

export class imageHighlightingFromSchema extends freePaintFromSchema {

	constructor ( container, opts ) {

		// Struktur der IMGs aufbauen
		const outerContainer = typeof container==='string' ? document.querySelector( container ) : container;
		outerContainer.classList.add( 'ihOuterContainer' );
		if ( opts.marginColor ) {
			outerContainer.style.backgroundColor = opts.marginColor;
		}

		const innerContainer = document.createElement( 'div' );
		innerContainer.classList.add( 'ihImgContainer' );
		const gap = opts.gap ? opts.gap+'px' : '';
		if ( gap ) {
			innerContainer.style.gap = gap;
		}
		if ( opts.areaWidth ) {
			innerContainer.style.width = addPx(opts.areaWidth);
		}
		if ( gap ) {
			innerContainer.style.paddingTop = gap;
			innerContainer.style.paddingBottom = gap;
		}
		if ( opts.areaColor ) {
			innerContainer.style.backgroundColor = opts.areaColor;
		}
		outerContainer.appendChild( innerContainer );

		// IMGs laden
		const imgLoadPrs = [];

		opts.imgs.forEach( (img, index) => {
			const imgEl = document.createElement( 'img' );
			imgEl.style.width= img.width || '100%';
			imgLoadPrs.push(
				new Promise( (res) => {
					imgEl.onload = res;
					imgEl.src = img.url;
				}).then( () => {
					imgEl.getBoundingClientRect();
					return {
						left: imgEl.offsetLeft,
						top: imgEl.offsetTop,
						width: imgEl.clientWidth,
						height: imgEl.clientHeight,
						idx: index+1,
					};
				})
			);
			innerContainer.appendChild( imgEl );
		});

		// base & stage erzeugen
		const baseDiv = document.createElement( 'div' );
		baseDiv.classList.add( 'ihBaseDiv' );
		innerContainer.appendChild( baseDiv );

		// Options freePaintMult zusammenstellen
		const fpOpts = {

			// x:0, y: 0,
			// width: 100, height: 100,
			frameWidth: 0,

			hasMarker: false,

			paintLines: {
				brush: {
					strokeWidth: opts.highlight.strokeWidth,
					stroke: opts.highlight.stroke,
				},
				erase: {
					strokeWidth: opts.eraser.strokeWidth,
				},
			},

			useExistingIconBarLayer: true,
			modeIconBarDef: {
				x: 10, y: 10,
				width: 32, height: 32,
				framePadding: 2,
				default: null,
				icons: [
					{
						src: penicon,
						cursor: `url(${penicon}), auto`,
						on: () => this.setPaintMode('brush'),
						off: () => this.setPaintMode('none'),
					},{
						src: erasericon,
						cursor: `url(${erasericon}), auto`,
						on: () => this.setPaintMode('erase'),
						off: () => this.setPaintMode('none'),
					}],
			},

			readonly: opts.readonly || false,
			extraRects: [
				// {x:50,y:50,width:200,height:100,w:2,c:'#606060',fl:1,f:'#303030'}
			],
			extraLines: [],
			dataSettings: {
				variablePrefix: opts.dataSettings.variablePrefix,
			}
		};

		// Options Base zusammenstellen & Base erzeugen
		const base = new baseInits({
			container: baseDiv,
			// Erstmal eine Größe wählen, bei der alle Rects & Linien draufpassen
			width: Math.max(
				100,
				// ( fpOpts.x + fpOpts.width + fpOpts.frameWidth + 2 ) || 0,
				...fpOpts.extraRects.map( r => ( r.x + r.width + r.w + 2 ) || 0 ),
				...fpOpts.extraLines.map( l => Math.max( ( l.x1 + l.w ) || 0, ( l.x2 + l.w ) || 0 ) ),
			),
			height: Math.max(
				100,
				// ( fpOpts.y + fpOpts.height + fpOpts.frameWidth + 2 ) || 0,
				...fpOpts.extraRects.map( r => ( r.y + r.hight + r.w + 2 ) || 0 ),
				...fpOpts.extraLines.map( l => Math.max( ( l.y1 + l.w ) || 0, ( l.y2 + l.w ) || 0 ) ),
			),
			dataSettings: opts.dataSettings,
		});
		const stage = base.stage;

		base.regSendInitDone();
		base.incInitCnt();
		base.incInitCnt();

		// freePaintMult init

		super( base, fpOpts );

		// this.modeIconBar.icons[0].on = () => this.setPaintMode('brush');
		// this.modeIconBar.icons[0].off = () => this.setPaintMode('none');
		// this.modeIconBar.icons[1].on = () => this.setPaintMode('erase');
		// this.modeIconBar.icons[1].off = () => this.setPaintMode('none');

		// Wenn alle Bilder geladen: richtige stage Größe setzen
		Promise.all( imgLoadPrs ).then( imgPoss => {
			imgPoss.sort( (a,b) => a.idx - b.idx );

			const baseSize = baseDiv.getBoundingClientRect();
			stage.size({
				width: Math.max( stage.width(), baseSize.width ),
				height: Math.max( stage.height(), baseSize.height )
			});

			base.postLog( 'ImgLoaded', { imgs: imgPoss } );
			this.imgPoss = imgPoss;
			base.decInitCnt();
		});

		// Restl Inits
		this.stage = stage;
		this.base = base;

		this.modeIconBar.hideBar(true);

		// this.firstTouch = null;
		// baseDiv.addEventListener( 'touchstart', this.iTouchStart.bind(this), { capture: true, passive: false } );
		// // baseDiv.addEventListener( 'touchstart', this.iStartDraw.bind(this), { capture: true, passive: false } );
		// baseDiv.addEventListener( 'touchmove', this.iDraw.bind(this), { capture: true, passive: false } );

		outerContainer.addEventListener( 'scroll', () => this.iScroll( outerContainer ) );
		this.stage.on( 'click', this.click.bind(this) );

		this.initData = this.getChState();
		this.base.sendChangeState( this );	// init & send changeState & score

		base.decInitCnt();
	}

	///////////////////////////////////

	// iTouchStart ( ev ) {
	// 	this.isTouchDevice = 1;

	// 	// Zweiter Finger?
	// 	if ( ev.touches.length>1 ) {

	// 		// Wird schon gemalt?
	// 		if ( this.paintPoints ) {
	// 			// // Weiter als X Punkte?
	// 			// const pos = getPosOfEvent( this.stage, ev );
	// 			// if ( Math.abs( pos.x - this.firstTouch.x ) + Math.abs( pos.y - this.firstTouch.y ) > startPaintDistance ) {
	// 			// 	// Dann ignorieren
	// 			// 	cancelEvent( ev );
	// 			// 	return;
	// 			// } else {
	// 				// Sonst Malen zurücknehmen
	// 				this.kFreePaintLine.destroy();
	// 				this.paintPoints = null;
	// 			// }

	// 		// Schon firstTouch registriert?
	// 		} else if ( this.firstTouch!==null ) {
	// 			clearTimeout( this.firstTouch.timeout );
	// 			this.firstTouch = null;
	// 		}
	// 	}
	// }

	// iStartDraw ( ev ) {
	// 	if ( !this.isTouchDevice ) {
	// 		cancelEvent( ev );
	// 		return super.iStartDraw( ev );
	// 	}

	// 	if ( this.firstTouch!==null ) {
	// 		clearTimeout( this.firstTouch.timeout );
	// 	}
	// 	const pos = getPosOfEvent( this.stage, ev );
	// 	this.firstTouch = {
	// 		x: pos.x,
	// 		y: pos.y,
	// 		timeout: setTimeout( () => {
	// 			return super.iStartDraw( ev );
	// 		}, startTimeoutMs ),
	// 	};
	// }

	// iDraw ( ev ) {
	// 	if ( this.paintPoints || !this.isTouchDevice ) {
	// 		cancelEvent( ev );
	// 		return super.iDraw( ev );
	// 	}

	// 	// Noch nicht gestartet, aber schon weiter als X Punkte?
	// 	const pos = this.getPosOfEvent( this.stage, ev );
	// 	if ( this.firstTouch && Math.abs( pos.x - this.firstTouch.x ) + Math.abs( pos.y - this.firstTouch.y ) > startPaintDistance ) {
	// 		// firstTouch löschen, lass scrollen!
	// 		clearTimeout( this.firstTouch.timeout );
	// 		this.firstTouch = null;
	// 	}
	// }

	// iEndDraw ( ev ) {
	// 	if ( this.firstTouch!==null ) {
	// 		clearTimeout( this.firstTouch.timeout );
	// 	}
	// 	this.firstTouch = null;
	// 	return super.iEndDraw( ev );
	// }

	setPaintMode ( mode ) {
		super.setPaintMode( mode );
		if ( this.iconHideTimer ) {
			clearTimeout( this.iconHideTimer );
			this.iconHideTimer = null;
		}
	}

	paintEnd (ev) {
		if ( this.isPainting ) {
			this.iconHideTimer = setTimeout( this.hideIconbar.bind(this), 1500 );
		}
		super.paintEnd( ev );
	}

	paintStart (ev) {
		if ( this.iconHideTimer ) {
			clearTimeout( this.iconHideTimer );
			this.iconHideTimer = null;
		}
		super.paintStart( ev );
	}

	hideIconbar () {
		this.modeIconBar.deactivate();
		this.modeIconBar.hideBar( true );
	}

	click ( ev ) {
		if ( !this.mode || this.mode == 'none' ) {
			const pos = getPosOfEvent( this.stage, ev );
			const iconBarLayer = this.stage.getAttr('bw__IconBarLayer');
			if ( iconBarLayer ) {
				iconBarLayer.offsetX(-pos.x);
				iconBarLayer.offsetY(-pos.y);
				this.modeIconBar.hideBar( false );
				this.iconHideTimer = setTimeout( this.hideIconbar.bind(this), 4000 );
			}
		}
	}

	///////////////////////////////////

	iScroll ( outerContainer ) {
		const top = outerContainer.scrollTop;
		this.base.postLog( 'Scroll', { top: Math.round(top), bottom: Math.round(top+outerContainer.clientHeight) } );
	}

}
