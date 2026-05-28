import './ratings.css'

import { object_equals, setStatePostProc } from '../../libs/common.js'
import { setStyles, expStyle } from '../styles.js';
import { setBodyFont } from '../common.js';

export class ratingsFromSchema  {

	constructor ( divSelector, opts = {}, base = null ) {

		base.incInitCnt();
		Object.assign( this, opts );
		this.base = base;

		// Daten Init
		const dims = opts.ratings.defs.map( d => d.name );
		this.dims = dims;
		this.ratingVals = Object.fromEntries(dims.map((dim) => [dim, null]));
		this.varNames = Object.fromEntries(
			dims.map( (dim) => [dim, `V_${dim[0].toUpperCase()}${dim.slice(1)}`] ),
		);
		this.allSvgsFills = Object.fromEntries(dims.map((dim) => [dim, {}]));

		setBodyFont( opts.buttons.stil.fontFile );

		// HTML Init
		const container = typeof divSelector === 'string' ? document.querySelector( divSelector ) : divSelector;
		container.classList.add('ratings-container');
		this.container = container;

		// rating divs
		const loadPrs = [];
		const svgLoaded = Object.fromEntries( dims.map( dim => [dim, fetch(`./${dim}.svg`)] ) );
		const { imgWidth, ...containerStil } = expStyle( opts.ratings.container );

		opts.ratings.defs.forEach( def => {
			const div = document.createElement('div');
			div.classList.add('rating');
			div.dataset.f=def.name;
			div.setAttribute( 'id', `rating-${def.name}`);
			div.style.left = `${def.x}px`;
			div.style.top = `${def.y}px`;
			setStyles( div, expStyle( containerStil ) );

			// SVG laden
			loadPrs.push(
				svgLoaded[def.name]
					.then((response) => response.text())
					.then((data) => {
						// alle setzen
						for (let i = 1; i <= 5; i++) {
							const svgElem = data.replace(
								'<svg',
								`<svg class="${def.name}" width="${imgWidth}" height="${imgWidth}" data-value="${i}"`,
							);
							div.innerHTML += svgElem;
						}

						// in Arrays schreiben
						const svgsEl = div.querySelectorAll(`svg`);
						for (let el of svgsEl) {
							const val = parseInt(el.dataset.value, 10);
							// Interactivity
							if ( !opts.readonly ) {
								el.addEventListener('click', () => {
									this.ratingVals[def.name] = val;
									base.postLog('rating', { dim: def.name, val: val });
									this.displayRatings();
								});
							}
							const fill = el.querySelector('.fill');
							if ( fill ) {
								this.allSvgsFills[def.name][val] = fill;
							}
						}
					}),
			);

			container.appendChild( div );
		});

		Promise.all(loadPrs).then(() => {
			this.displayRatings();
		});

		// buttons
		['clear','submit'].forEach( id => {
			const def = opts.buttons[id];
			if ( id=='submit' && !def.enabled ) {
				return;
			}
			const btn = document.createElement('div');
			btn.innerText = def.text;
			btn.classList.add('act');
			btn.style.left = `${def.x}px`;
			btn.style.top = `${def.y}px`;
			setStyles( btn, expStyle( opts.buttons.stil ) );

			this[`link${id[0].toUpperCase()}${id.slice(1)}`] = btn;
			container.appendChild( btn );
		});

		// Interact Buttons
		if (!this.readonly) {
			this.linkClear.addEventListener('click', () => {
				dims.forEach((dim) => {
					this.ratingVals[dim] = null;
				});
				base.postLog('ratingsDeleted', {});
				this.displayRatings();
			});
		}

		if ( this.linkSubmit ) {
			this.linkSubmit.addEventListener('click', () => {
				base.fsm?.triggerEvent('EV_NEXT');
			});
		}

		this.initData = this.getChState();
		this.base.sendChangeState(this); // init & send changeState & score

		base.decInitCnt();
	}

	///////////////////////////////////

	displayRatings() {
		this.dims.forEach((dim) => {
			const val = this.ratingVals[dim];
			const fills = this.allSvgsFills[dim];

			for (let i = 1; i <= 5; i++) {
				const color = this.ratings.colors[ val !== null && i <= val ? 'marked' : 'normal' ];
				fills[i].setAttribute('fill', color);
			}
		});

		this.linkClear.style.visibility =
			!this.readonly && Object.values(this.ratingVals).some((val) => val !== null)
				? 'visible'
				: 'hidden';
		if ( this.linkSubmit ) {
			this.linkSubmit.style.visibility =
				this.readonly || Object.values(this.ratingVals).every((val) => val !== null)
					? 'visible'
					: 'hidden';
		}

		this.base.sendChangeState(this);
	}

	///////////////////////////////////

	scoreDefType () {
		return 'Integer';
	}

	scoreDef () {
		const res = Object.fromEntries(
			this.dims.map((dim) => [this.varNames[dim], this.ratingVals[dim]]),
		);
		return res;
	}

	///////////////////////////////////

	getChState() {
		return Object.values(this.ratingVals);
	}

	// Check if User made changes
	getDefaultChangeState () {
		return !object_equals( this.getChState(), this.initData );
	}

	getState () {
		return JSON.stringify( this.ratingVals );
	}

	setState ( state ) {
		try {
			this.ratingVals = JSON.parse( state );
		} catch (e) {
			console.error(e);
		}

		setStatePostProc(this);
		this.displayRatings();
	}

}
