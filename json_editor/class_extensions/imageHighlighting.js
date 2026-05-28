import { freePaintFromSchema } from './freePaint.js';
import { baseInits } from '../../libs/baseInits.js';
import './imageHighlighting.css';

import penicon from '../../libs/img/penicon.png'
import erasericon from '../../libs/img/erasericon.png'

function addPx ( val ) {
	return typeof val === 'number' || val.match( /^[0-9]+$/ ) ? val+'px' : val;
}

//////////////////////////////////////////////////////////////////////////////

class htmlIconBar {

	constructor ( _, opts={} ) {

		const defaultOpts = {
		 		// icons: [
				// 	{ on = () => , off = () => },
				// ],
		 		disabled: false,
		}
		Object.assign( this, defaultOpts, opts );

		this.container = document.createElement( 'div' );
		this.container.classList.add( 'iconBarContainer' );

		this.icons.forEach( (icon,idx) => {
			const elBg = document.createElement( 'div' );
			elBg.classList.add( 'iconBarIconBg', icon.mode );
			elBg.addEventListener( 'click', ev => this.clickOn( idx, ev ) );
			icon.elBg = elBg;

			const el = document.createElement( 'div' );
			el.classList.add( 'iconBarIcon', icon.mode );
			elBg.appendChild( el );
			icon.el = el;

			this.container.appendChild( elBg );
		});
		document.body.appendChild( this.container );

		this.active = null;
		this.hideBar( true );
	}

	///////////////////////////////////

	renderAt ( x, y ) {
		if ( y < 80 ) {
			this.container.classList.add( 'up' );
			this.container.classList.remove( 'down' );
			this.container.style.left = addPx( x - ( this.cursorOffsetUp.x || 0 ) );
			this.container.style.top = addPx( y + ( this.cursorOffsetUp.y || 0 ) );
		} else {
			this.container.classList.add( 'down' );
			this.container.classList.remove( 'up' );
			this.container.style.left = addPx( x - ( this.cursorOffsetDown.x || 0 ) );
			this.container.style.top = addPx( y - ( this.cursorOffsetDown.y || 0 ) );
		}
		this.hideBar( false );
	}

	///////////////////////////////////

	// interface from iconBar class

	setDefault () {
	}

	clickOn ( index, ev ) {
		if ( !this.disabled ) {
			const oldActive = this.active;
			this.deactivate();
			if ( index !== oldActive ) {
				this.activate( index, ev );
			}
		}
	}

	deactivate () {
		if ( this.active!==null ) {
			const icon = this.icons[ this.active ];

			icon.el.classList.remove( 'active' );
			icon.elBg.classList.remove( 'active' );

			if ( icon.off ) {
				icon.off();
			}

			if ( icon.cursor ) {
				document.body.style.cursor = this.oldCursor || "default";
			}

			this.active = null;
		}
	}

	activate ( index, ev ) {
		if ( this.active!==index ) {
			const icon = this.icons[index];

			icon.el.classList.add( 'active' );
			icon.elBg.classList.add( 'active' );

			if ( icon.on ) {
				icon.on(ev);
			}

			if ( icon.cursor ) {
				this.oldCursor = document.body.style.cursor;
				document.body.style.cursor = icon.cursor;
			}

			this.active = index;
		}
	}

	isActive ( index ) {
		return this.active === index;
	}

	///////////////////////////////////

	disableBar ( disabled=true ) {
		this.disabled = disabled;
		if ( disabled ) {
			this.deactivate();
		}
	}

	hideBar ( hidden=true ) {
		this.disableBar( hidden );
		this.container.style.visibility = hidden ? 'hidden' : 'visible';
	}

	destroy () {
		document.body.removeChild( this.container );
	}

}

//////////////////////////////////////////////////////////////////////////////

export class imageHighlightingFromSchema extends freePaintFromSchema {

	constructor ( container, opts, addMods={}, hitAreaEdit=0 ) {

		// Struktur der IMGs aufbauen
		const outerContainer = typeof container==='string' ? document.querySelector( container ) : container;
		outerContainer.classList.add( 'ihOuterContainer' );
		if ( opts.marginColor ) {
			outerContainer.style.backgroundColor = opts.marginColor;
		}

		const innerContainer = document.createElement( 'div' );
		innerContainer.classList.add( 'ihImgContainer' );
		const gap = opts.gap ? addPx(opts.gap) : '';
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
					// Daten für imgPoss erzeugen
					const o = {
						left: imgEl.offsetLeft,
						top: imgEl.offsetTop,
						width: imgEl.clientWidth,
						height: imgEl.clientHeight,
						idx: index+1,
					};
					if ( img.name ) {
						o.name = img.name;
					} else {
						o.url = img.url;
					}
					return o;
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
				icons: [
					{
						mode: 'brush',
						cursor: `url(${penicon}), auto`,
						on: () => this.setPaintMode('brush'),
						off: () => this.setPaintMode('none'),
					},{
						mode: 'erase',
						cursor: `url(${erasericon}), auto`,
						on: () => this.setPaintMode('erase'),
						off: () => this.setPaintMode('none'),
					}
				],
				cursorOffsetDown: {
					x: 15+7+7,
					y: 15+42+14+1,
				},
				cursorOffsetUp: {
					x: 15+7+7,
					y: 15+1,
				},
			},
			iconBarClass: htmlIconBar,

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


		if ( !hitAreaEdit ) {
			outerContainer.addEventListener( 'scroll', () => this.iScroll( outerContainer ) );
			this.stage.on( 'click', this.click.bind(this) );

			addScoring( this, opts, addMods.Parser );
		}
		this.initData = this.getChState();
		this.base.sendChangeState( this );	// init & send changeState & score

		base.decInitCnt();
	}

	///////////////////////////////////

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
		this.modeIconBar.hideBar( true );
	}

	click ( ev ) {
		if ( !this.mode || this.mode == 'none' ) {
			// const pos = getPosOfEvent( this.stage, ev );
			this.modeIconBar.renderAt( ev.evt.clientX,  ev.evt.clientY );
		}
	}

	///////////////////////////////////

	scoreDef ( exportAll=false ) {
		const res = {};
		if ( this.readonly ) {
			return res;
		}

		/* Insert HitArea Scoring here */

		if ( this.computeScoringVals ) {
			this.computeScoringVals( res , exportAll );
		}

		return res;
	}

	///////////////////////////////////

	getState () {
		const superState = super.getState();
		const state = JSON.parse( superState );
		state.imgPoss = this.imgPoss;
		state.hlImg = this.getRectPngImage();
		return JSON.stringify( state );
	}

	///////////////////////////////////

	iScroll ( outerContainer ) {
		const top = outerContainer.scrollTop;
		this.base.postLog( 'Scroll', { top: Math.round(top), bottom: Math.round(top+outerContainer.clientHeight) } );
		this.modeIconBar.hideBar( true );
	}

}

//////////////////////////////////////////////////////////////////////////////

//
// Init der HitArea-Edit-Buttons
//

import { editHitAreas } from './imageHighlighting_jsonEditorHitAreas.js';
import { clearCfgJson } from '../common';

function editBtnClicked( buttonEditor, event, posneg ) {

	event.preventDefault(); // Verhindert ggf. Standardverhalten wie Formular-Submits

	// buttonEditor.parent repräsentiert das umgebende Objekt im Array.
	// Darin suchen wir das Feld "myString" (der Name, den du im Schema vergibst)
	const stringField = buttonEditor.parent.editors[posneg];

	if (stringField) {
		// JSON aus Editor lesen
		const mainEditor = buttonEditor.jsoneditor;
		// JSON auslesen und kopieren für 100%igen Schreibschutz
		const readOnlyJson = JSON.parse(JSON.stringify(mainEditor.getValue()));
		const cfgJson = clearCfgJson( readOnlyJson );

		// Alten String auslesen
		let currentValue = stringField.getValue();

		// String verändern (hier im Beispiel hängen wir einfach Text an)
		editHitAreas( currentValue, posneg, cfgJson ).then( newValue => {
			// Neuen String setzen (aktualisiert die UI sofort)
			stringField.setValue(newValue);
		});
	}
}

export function edInitImageHighlighting () {

	// 1. Callbacks global deklarieren
	window.JSONEditor.defaults.callbacks ||= {};
	window.JSONEditor.defaults.callbacks.button ||= {};

	window.JSONEditor.defaults.callbacks.button.imageHighlightingHitAreaPosBtnAction = function(buttonEditor, event) {
		editBtnClicked( buttonEditor, event, 'pos' );
	}

	window.JSONEditor.defaults.callbacks.button.imageHighlightingHitAreaNegBtnAction = function(buttonEditor, event) {
		editBtnClicked( buttonEditor, event, 'neg' );
	}
}
