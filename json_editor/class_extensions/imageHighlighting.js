import { freePaintFromSchema } from './freePaint.js';
import { baseInits } from '../../libs/baseInits.js';
import './imageHighlighting.css';
import { addScoring } from "../common";
import { getPosOfEvent } from '../../libs/common'

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

	const r =  hitAreaArea.map( area => {
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
	if ( process.env.NODE_ENV !== 'production' ) {
		console.log( '+++ hitAreaScaled: scale', hitAreaArea, `von ${oldW}x${oldH} nach ${newW}x${newH} ergibt`, r );
	}
	return r;
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

// Liefert die imgPoss hashed in Kurzformat
export const getObjImgPossHashedShort = ( imgPoss ) => {
	const r = {
		w: imgPoss.w,
		h: imgPoss.h,
		p: imgPoss.poss.map( pos => [ pos.left, pos.top, pos.width, pos.height, fastHash(pos.url) ] ),
	};
	return r;
}

// Validiert zwei hashed poss
export const validatePossHashs = ( possHashs, objImgPossHashes ) => {
	const xEqual = ( possHashX, objImgHashX ) =>
		Math.abs( possHashX - Math.round( objImgHashX * possHashs.w/objImgPossHashes.w ) ) <= 2;
	const yEqual = ( possHashY, objImgHashY ) =>
		Math.abs( possHashY - Math.round( objImgHashY * possHashs.h/objImgPossHashes.h ) ) <= 2;

// console.log( "***** validatePossHashs", possHashs, objImgPossHashes );
	const possEqual = ( poss1, poss2 ) =>
		poss1[4] === poss2[4] &&
		xEqual( poss1[0], poss2[0] ) &&
		yEqual( poss1[1], poss2[1] ) &&
		xEqual( poss1[2], poss2[2] ) &&
		yEqual( poss1[3], poss2[3] );

	if ( !possHashs || !possHashs.p ||
		possHashs.p.length>objImgPossHashes.p.length ||
		!possHashs.p.every( (pos, idx) => possEqual( pos, objImgPossHashes.p[idx] ) )
	) {
// console.log( "***** validatePossHashs negativ" );
		if ( process.env.NODE_ENV !== 'production' ) {
			console.error( "validatePossHashs:", possHashs, objImgPossHashes );
		}
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
		( opts.container ?? document.body ).appendChild( this.container );

		this.active = null;
		this.hideBar( true );
	}

	///////////////////////////////////

	renderAt ( x, y ) {
		if ( y - ( window.visualViewport?.offsetTop ?? 0 ) < 80 ) {
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
						url: img.url,
					};
					if ( img.name ) {
						o.name = img.name;
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
					y: 15+42+14+1 +8,
				},
				cursorOffsetUp: {
					x: 15+7+7,
					y: 15+1 +8,
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
			const width = Math.round( Math.max( stage.width(), baseSize.width ) );
			const height = Math.round( Math.max( stage.height(), baseSize.height ) );
			stage.size({ width, height });
// console.log("+++++++++++++++",stage.width(), stage.height(), baseSize.width, baseSize.height);
			this.imgPoss = {
				w: width,
				h: height,
				poss: imgPoss,
			};
// console.log("~~~~~~~~~~ imgPoss",this.imgPoss);
			this.createHitAreasConv();

			base.postLog( 'ImgLoaded', { imgPoss: {
				w: width,
				h: height,
				poss: imgPoss.map( pos => {
					// ohne url, wenn name gegeben
					if ( pos.name ) {
						const { url, ...rest } = pos;
						return rest;
					}
					return pos;
				}),
			}});
			base.decInitCnt();
		});

		// Restl Inits
		this.outerContainer = outerContainer;
		this.stage = stage;
		this.base = base;
		Object.assign( this, opts );

		// Restl Inits
		this.modeIconBar.hideBar(true);

		// this.firstTouch = null;
		// baseDiv.addEventListener( 'touchstart', this.iTouchStart.bind(this), { capture: true, passive: false } );
		// // baseDiv.addEventListener( 'touchstart', this.iStartDraw.bind(this), { capture: true, passive: false } );
		// baseDiv.addEventListener( 'touchmove', this.iDraw.bind(this), { capture: true, passive: false } );

		// // ResizeObserver für baseDiv Größenänderungen
		// const resizeObserver = new ResizeObserver( () => {
		// 	const baseSize = baseDiv.getBoundingClientRect();
		// 	const width = Math.round( baseSize.width );
		// 	const height = Math.round( baseSize.height );
		// 	stage.size({ width, height });
		// });
		// resizeObserver.observe( baseDiv );

		if ( !hitAreaEdit ) {
			outerContainer.addEventListener( 'scroll', () => this.iScroll( outerContainer ) );
			this.stage.on( 'click', this.click.bind(this) );
			this.stage.on( 'mouseleave', (ev) => {
				// Wenn nicht auf iconbar
				if ( !ev.evt?.relatedTarget?.closest('.iconBarContainer') ) {
					this.hideIconbar();
				}
		 	});

			base.getInitDonePromise().then( () => {
				addScoring( this, opts, addMods.Parser );
				this.initData = this.getChState();
				this.base.sendChangeState( this );	// init & send changeState & score
			});
		}

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
			const pos = getPosOfEvent( this.stage, ev );
			this.modeIconBar.renderAt( pos.x, pos.y - this.outerContainer.scrollTop );
		}
	}

	///////////////////////////////////

	createHitAreasConv () {

// console.trace();
		this.hitAreasConv = [];

		const canvas = this.freePaintLayer.getCanvas()._canvas;
		const width = canvas.width;
		const height = canvas.height;
		if ( !width || !height ) {
			return
		}
// console.log("************",width,height);

		// Stimmt posHashes, also sind HitAreas für diese Bilder definiert?
		try {
			const posHashObj = JSON.parse( this.dataSettings?.posHashs );
			validatePossHashs( posHashObj, getObjImgPossHashedShort( this.imgPoss ) );
			this.hitAreasMult = 1;
		} catch (e) {
			console.error('HitAreas sind nicht für diese Bilder definiert!',e);
			this.hitAreasMult = -11111;
		}

		const getFill = ( val ) => {
			const tr = val.trim();
			if ( tr.endsWith('%') ) {
				// relativ, d.h. < 1 !
				return Math.min( 1 - 1e-15, parseFloat( tr.slice(0,-1) ) / 100 );
			}
			return parseInt( tr );
		}

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
					}
				}

				const res = {
					name: `V_Score_${pref}${hitArea.name}`,
					pos: has.pos ? hitAreaScaled( json.pos.areas, width, json.pos.w, height, json.pos.h ) : [],
					posFill: getFill(hitArea.posFill),
					neg: has.neg ? hitAreaScaled( json.neg.areas, width, json.neg.w, height, json.neg.h ) : [],
					negFill: getFill(hitArea.negFill),
					exp: hitArea.exp,
				};
				this.hitAreasConv.push( res );

				// // DEBUG: Areas in aktuelle stage einzeichnen
				// for ( const [areas,color] of [ [res.pos, 'green'], [res.neg, 'red'] ] ) {
				// 	const mres = hitAreaScaled( areas, this.stage.width(), width, this.stage.height(), height );
				// 	mres.forEach( area => {
				// 		this.freePaintLayer.add( new Konva.Rect({
				// 			x: area.x1,
				// 			y: area.y1,
				// 			width: area.x2 - area.x1 + 1,
				// 			height: area.y2 - area.y1 + 1,
				// 			stroke: color,
				// 			strokeWidth: 1,
				// 			fill: 'rgba('+ (color === 'green' ? '0,255,0' : '255,0,0') + ', 0.05)',
				// 		}));
				// 	});
				// }
				// this.stage.batchDraw();

			} catch (e) {
				console.error('Fehler bei HitArea-Definition:', e);
				this.hitAreasMult = -11111;
			}
		}

// console.log("==============================",this.hitAreasConv);
	}

	getImageData () {
		// Image holen
		const canvas = this.freePaintLayer.getCanvas()._canvas;
		if ( !canvas.width ) {
			return 0;
		}

		const context = canvas.getContext('2d');
		const imageData = context.getImageData( 0, 0, canvas.width, canvas.height );
		// const imageData = this.freePaintLayer.toImage({
		// 	x: 0,
		// 	y: 0,
		// 	width: this.stage.width(),
		// 	height: this.stage.height(),
		// })

		// // Debug: Histogramm der Punkte
		// const histogram = [];
		// for ( let i = 0; i < imageData.data.length; i += 4) {
		// 	const r = imageData.data[i], g = imageData.data[i+1], b = imageData.data[i+2], a = imageData.data[i+3];
		// 	const entry = histogram.find( h => h.r===r && h.g===g && h.b===b && h.a===a );
		// 	if ( entry ) {
		// 		entry.c++;
		// 	} else {
		// 		histogram.push( { r, g, b, a, c: 1 } );
		// 	}
		// }
		// histogram.sort( (a,b) => b.c - a.c );
		// console.log("===== getPointsColored histogram:", histogram );
		// // Ende Debug Histrogramm

		this.imageData = imageData.data; // Das Array mit [R, G, B, A, R, G, B, A, ...]
		this.imageDataWidth = imageData.width;
// console.log('============================== Image-Daten aktualisiert',canvas.width, canvas.height, this.pixelDaten);
		return 1;
	}

	getHitAreaScore ( hitAreaConv ) {
		const imageData = this.imageData;

		// // Debug: Histogramm der Punkte
		// const histogram = [];
		// for ( let i = 0; i < imageData.length; i += 4) {
		// 	const r = imageData[i], g = imageData[i+1], b = imageData[i+2], a = imageData[i+3];
		// 	const entry = histogram.find( h => h.r===r && h.g===g && h.b===b && h.a===a );
		// 	if ( entry ) {
		// 		entry.c++;
		// 	} else {
		// 		histogram.push( { r, g, b, a, c: 1 } );
		// 	}
		// }
		// histogram.sort( (a,b) => b.c - a.c );
		// console.log("===== getPointsColored histogram:", histogram );
		// // Ende Debug Histrogramm

		for ( const posneg of ['pos','neg'] ) {

// console.log("************** getHitAreaScore",hitAreaConv.name,posneg,hitAreaConv[posneg], this.imageDataWidth);
			for ( const area of hitAreaConv[posneg] ) {
				// Wieviel Punkte in pos-Bereich?
				let pointsColored = 0;
				for ( let y=area.y1; y<=area.y2; y++ ) {
					const yoffs = ( y * this.imageDataWidth )*4/* y1 Offs */ + 3/* Alpha-Kanal */; // Anfang des y-ten Zeile in pixelDaten
					const offsBegin = yoffs + (area.x1*4);
					const offsEnd = Math.min( yoffs + (area.x2*4), imageData.length-1 );
					for ( let offs = offsBegin; offs <= offsEnd; offs += 4 ) {
						if ( imageData[offs] > 150 ) {
							pointsColored++;
						}
					}
				}

				const allPoints = (area.x2 - area.x1 + 1) * (area.y2 - area.y1 + 1);
				const fillMin = fill => fill<1 ? allPoints * fill : fill; // realtiv (<1) oder absolut?
// console.log(`++++++++++ HitArea-Score ${hitAreaConv.name} (${posneg}), pointsColored: ${pointsColored} von ${allPoints}, fillMin: ${fillMin(hitAreaConv[posneg=='pos' ? 'posFill' : 'negFill'])}`);
				// Bedingung nicht erfüllt? -> 0 Punkte
				if ( posneg=='pos' && pointsColored < fillMin(hitAreaConv.posFill) ||
					posneg=='neg' && pointsColored > fillMin(hitAreaConv.negFill) ) {
					return 0;
				}
			}
		}

		return this.hitAreasMult;
	}

	///////////////////////////////////

	scoreDef ( exportAll=false ) {
		const res = {};
		if ( this.readonly ) {
			return res;
		}

		// hitAreas berechnen
		const delVars = [];
// console.log("++++++++++ scoreDef - hitAreasConv",this.hitAreasConv);
		if ( this.hitAreasConv?.length>0 && this.getImageData() ) {
			for ( const hitAreaConv of this.hitAreasConv ) {
				const varName = hitAreaConv.name;
				res[ varName ] = this.getHitAreaScore( hitAreaConv );
				if ( !hitAreaConv.exp ) {
					delVars.push( varName );
				}
			}
		} else if ( !this.hitAreasConv ) {
			// Alle HitArea-Variablen mit 0 anlegen, damit sie im Export auftauchen, auch wenn keine HitAreas definiert oder gültig sind
			const pref = this.dataSettings.variablePrefix ? this.dataSettings.variablePrefix+'_' : '';
			for ( const hitArea of this.dataSettings.hitAreas || [] ) {
				const varName = `V_Score_${pref}${hitArea.name}`;
				res[varName] = 0;
				if ( !hitArea.exp ) {
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

	// setState () {
	// 	// in super.setState() wird das Highlight-Bild gesetzt, daher hier keine weitere Aktion
	// }

	///////////////////////////////////

	iScroll ( outerContainer ) {
		const top = outerContainer.scrollTop;
		this.base.postLog( 'Scroll', { top: Math.round(top), bottom: Math.round(top+outerContainer.clientHeight) } );
		this.modeIconBar.hideBar( true );
	}

}
