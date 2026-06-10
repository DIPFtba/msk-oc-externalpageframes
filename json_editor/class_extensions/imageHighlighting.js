import { freePaintFromSchema } from './freePaint.js';
import { baseInits } from '../../libs/baseInits.js';
import './imageHighlighting.css';
import { addScoring } from "../common";

import penicon from '../../libs/img/penicon.png'
import erasericon from '../../libs/img/erasericon.png'

//////////////////////////////////////////////////////////////////////////////

function addPx ( val ) {
	return typeof val === 'number' || val.match( /^[0-9]+$/ ) ? val+'px' : val;
}

export const hitAreaScaled = ( hitAreaArea, newW, oldW, newH, oldH ) => {
	const gX = x => Math.min( newW-1, Math.round( x * newW/oldW ) );
	const gY = y => Math.min( newH-1, Math.round( y * newH/oldH ) );
	const equal = newW===oldW && newH===oldH;

	return hitAreaArea.map( area => {
		// Sind Koordinatenda?
		if ( area.x1 === undefined || area.y1 === undefined ||
			area.x2 === undefined || area.y2 === undefined ) {
			throw new Error('Ungültige Hit Area Definition. x1,y1,x2,y2 erforderlich!');
		}
		return equal ?
			// Bildpositionen unverändert, Koordinaten können direkt übernommen werden
			area :
			// Koordinaten von area auf stage umrechnen
			{
				x1: gX(area.x1),
				y1: gY(area.y1),
				x2: gX(area.x2),
				y2: gY(area.y2),
			};
	})
}

const fastHash = (str) => {
    let h = 2166136261 >>> 0;
    for (let i = 0; i < str.length; i++) {
        h ^= str.charCodeAt(i);
        // Schnelle 32-Bit-Multiplikation
        h = Math.imul(h, 16777619);
    }
    return (h >>> 0).toString(16);
}

const imgPosHash = ( x, y, w, h, u ) => {
	console.log(`${x}-${y}x${w}-${h}:${u}`.substring(0, 100));
	return fastHash(`${x}-${y}x${w}-${h}:${u}`);
}

// Liefert die imgPoss.poss skaliert auf newWxnewH
export const getObjImgPossScaledHashed = ( imgPoss, newW, newH ) => {
	const maxScale = ( x, newW, oldW ) => Math.min( newW-1, Math.round( x * newW/oldW ) );
	return imgPoss.poss.map( pos => imgPosHash(
		maxScale( pos.left, newW, imgPoss.w ),
		maxScale( pos.top, newH, imgPoss.h ),
		maxScale( pos.width, newW, imgPoss.w ),
		maxScale( pos.height, newH, imgPoss.h ),
		pos.url
	));
}

// Validiert hitArea (u.a. passen hitArea.imgs zu objImgPossScaledHashed)
export const validatePosHashs = ( posHashs, objImgPossScaledHashed ) => {
	if ( !posHashs || posHashs.length>objImgPossScaledHashed.length ||
		!posHashs.every( (pos, idx) => pos === objImgPossScaledHashed[idx] )
	) {
		throw new Error('Ungültige Bildpositionen / Bild gewechselt. HitArea-Defs bitte löschen!');
	}
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
		const gap = opts.gap ?? '';
		if ( opts.areaWidth ) {
			innerContainer.style.width = addPx(opts.areaWidth);
		}
		// if ( gap ) {
		// 	// GEht mit % nicht
		// 	innerContainer.style.gap = gap;
		// 	innerContainer.style.paddingTop = gap;
		// 	innerContainer.style.paddingBottom = gap;
		// }
		if ( opts.areaColor ) {
			innerContainer.style.backgroundColor = opts.areaColor;
		}
		outerContainer.appendChild( innerContainer );

		// IMGs laden
		const imgLoadPrs = [];

		opts.imgs.forEach( (img, index) => {
			const imgEl = document.createElement( 'img' );
			imgEl.style.width= img.width || '100%';
			if ( gap ) {
				if ( !index ) {
					imgEl.style.marginTop = gap;
				}
				imgEl.style.marginBottom = gap;
			}
			imgLoadPrs.push(
				new Promise( (res) => {
					imgEl.onload = res;
					imgEl.src = img.url;
				}).then( () => {
					imgEl.getBoundingClientRect();
					// Daten für imgPoss erzeugen
					// Werden bei window.resize nicht aktualisiert!
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
			const width = Math.max( Math.round(stage.width()), baseSize.width );
			const height = Math.max( Math.round(stage.height()), baseSize.height );
			stage.size({ width, height });

			this.imgPoss = {
				w: width,
				h: height,
				poss: imgPoss,
			};
// console.log("~~~~~~~~~~ imgPoss",this.imgPoss);
			this.createHitAreasConv( width, height );

			base.postLog( 'ImgLoaded', { imgPoss: this.imgPoss } );
			base.decInitCnt();
		});

		// Restl Inits
		this.stage = stage;
		this.base = base;
		Object.assign( this, opts );

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

	createHitAreasConv ( width, height ) {

// console.trace();
		this.hitAreasConv = [];
		const imgPossScaledHashed = getObjImgPossScaledHashed( this.imgPoss, width, height );
// console.log("++++++++++ imgPossScaledHashed",imgPossScaledHashed,JSON.parse(JSON.stringify(this.imgPoss)),this.imgPoss);
		const pref = this.dataSettings.variablePrefix ? this.dataSettings.variablePrefix+'_' : '';
		for ( const hitArea of this.dataSettings?.hitAreas || [] ) {
			try {
				const has = {};
				const json = {};
				for ( const posNeg of ['pos','neg'] ) {
					has[posNeg] = hitArea[posNeg] && hitArea[posNeg].trim() != '';
// console.log("++++++++++ posNeg",posNeg,has[posNeg],hitArea[posNeg]);
					if ( has[posNeg] ) {
						json[posNeg] = JSON.parse(hitArea[posNeg]);
						validateHitAreaDef( json[posNeg], imgPossScaledHashed );
					}
				}

				this.hitAreasConv.push({
					name: `V_Score_${pref}${hitArea.name}`,
					pos: has.pos ? hitAreaScaled( json.pos.area, width, json.pos.w, height, json.pos.h ) : [],
					posFill: hitArea.posFill,
					neg: has.neg ? hitAreaScaled( json.neg.area, width, json.neg.w, height, json.neg.h ) : [],
					negFill: hitArea.negFill,
					exp: hitArea.exp,
				});
			} catch (e) {
				console.error('Fehler bei HitArea-Definition:', e);
			}
		}

console.log("==============================",this.hitAreasConv);
	}

	getImageData () {
		// Image holen
		const layer = this.layer;
		const canvas = layer.getCanvas()._canvas;
		const context = canvas.getContext('2d');
		const imageData = context.getImageData(0, 0, canvas.width, canvas.height);
		this.pixelDaten = imageData.data; // Das Array mit [R, G, B, A, R, G, B, A, ...]
		this.pixelDatenWidth = imageData.width;
console.log('============================== Image-Daten aktualisiert',canvas.width, canvas.height,this.pixelDaten);
	}

	getHitAreaScore ( hitAreaConv ) {
		return 0;
	}

	///////////////////////////////////

	scoreDef ( exportAll=false ) {
		const res = {};
		if ( this.readonly ) {
			return res;
		}

		// hitAreas berechnen
		const delVars = [];
		if ( this.hitAreasConv?.length>0 ) {
			this.getImageData();
			for ( const hitAreaConv of this.hitAreasConv ) {
				const varName = hitAreaConv.name;
				res[ varName ] = this.getHitAreaScore( hitAreaConv );
				if ( !hitAreaConv.exp ) {
					delVars.push( varName );
				}
			}
		}

		// Restl. Scoring-Vars / Scoring-Vals berechnen
		if ( this.computeScoringVals ) {
			this.computeScoringVals( res , exportAll );
		}

		// hitAreas ohne Export wieder löschen
		if ( !exportAll && delVars.length>0 ) {
			delVars.forEach( k => delete res[k] );
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
