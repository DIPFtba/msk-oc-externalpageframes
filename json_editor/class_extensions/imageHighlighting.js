import { freePaintMultFromSchema } from './freePaintMult.js';
import { baseInits } from '../../libs/baseInits.js';
import { ResolvablePromise } from '../common.js';
import './imageHighlighting.css';

function addPx ( val ) {
	return val.match( /^[0-9]+$/ ) ? val+'px' : val;
}

export class imageHighlightingFromSchema extends freePaintMultFromSchema {

	constructor ( container, opts ) {

		const imgPoss = [];

		// Struktur der IMGs aufbauen
		const outerContainer = typeof container==='string' ? document.getElementById( container ) : container;
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
		const allImgsLoaded = new ResolvablePromise();

		opts.imgs.forEach( (img, index) => {
			const imgEl = document.createElement( 'img' );
			imgEl.src = img.url;
			imgEl.style.width= img.width || '100%';
			imgEl.onload = () => {
				imgEl.getBoundingClientRect();
				const imgPos = {
					left: imgEl.offsetLeft,
					top: imgEl.offsetTop,
					width: imgEl.clientWidth,
					height: imgEl.clientHeight,
					idx: index+1,
				};
				imgPoss.push( imgPos );
				// Alle IMG geladen?
				if ( imgPoss.length === opts.imgs.length ) {
					imgPoss.sort( (a,b) => a.idx - b.idx );
					allImgsLoaded.resolvePromise();
				}
			};
			innerContainer.appendChild( imgEl );
		});

		// base & stage erzeugen
		const baseDiv = document.createElement( 'div' );
		baseDiv.classList.add( 'ihBaseDiv' );
		innerContainer.appendChild( baseDiv );

		// Options freePaintMult zusammenstellen
		const fpOpts = {
			// x:0, y: 0,
			// width: baseSize.width,
			// height: baseSize.height,
			frameWidth: 0,
			paintLine: {
				strokeWidth: opts.highlight.strokeWidth,
				stroke: opts.highlight.stroke,
				// opacity: opts.highlight.opacity100/100,
				globalCompositeOperation: 'source-over',
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

		// Wenn alle Bilder geladen: richtige stage Größe setzen
		allImgsLoaded.promise.then( () => {
			const baseSize = baseDiv.getBoundingClientRect();
			stage.size({
				width: Math.max( stage.width(), baseSize.width ),
				height: Math.max( stage.height(), baseSize.height )
			});

			base.postLog( 'ImgLoaded', { imgs: imgPoss } );
			base.decInitCnt();
		});

		// Restl Inits
		this.stage = stage;
		this.base = base;
		this.imgPoss = imgPoss;

		this.initData = this.getChState();
		this.base.sendChangeState( this );	// init & send changeState & score

		base.decInitCnt();
	}

	///////////////////////////////////

	// iStartDraw ( ev ) {
	// }

	// iDraw ( ev ) {
	// }

	// iEndDraw ( ev ) {
	// }

	// getDefaultChangeState () {
	// 	return 0;
	// }
}
