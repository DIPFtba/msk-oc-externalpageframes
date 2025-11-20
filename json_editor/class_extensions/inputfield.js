
import { setStatePostProc } from '../../libs/common';
import { dp2labFncInputRegExp, setBodyFont } from '../common';
import { expStyle, camelToKebab } from '../styles';

export class inputfieldFromSchema {

	constructor ( divSelector, opts = {}, base = null ) {

		base.regSendInitDone();
		base.incInitCnt();
		this.dataSettings = opts.dataSettings || {};

		setBodyFont( opts.options.fontFile );
		dp2labFncInputRegExp( opts.options, this );

		///////////////////////////////////////

		const input = document.createElement('input');
		if ( opts.options?.readonly ) {
			input.setAttribute( 'readonly', 'readonly' );
			this.readonly = true;
		}
		['placeholder'].forEach( attr => {
			if ( opts.options?.[ attr ] ) {
				input.setAttribute( attr, opts.options[ attr ] );
			}
		});
		const div = typeof divSelector === 'string' ? document.querySelector( divSelector ) : divSelector;
		div.appendChild( input );
		this.input = input;

		// style aus JSON Config zusammenbauen
		const styleSelector = `${ typeof divSelector === 'string' ? divSelector : '' } input`;
		const defaultStyles= {
			fontSize: opts.options?.fontSize,
			fontWeight: opts.options?.fontWeight,
			boxSizing: 'border-box',
			width: opts.options?.width,
			height: opts.options?.height,
			...opts.options?.stylesDefault
		};
		let styleDefs = "";
		[ ['stylesNormal', ''] , ['stylesHover', ':hover'] , ['stylesFocus', ':focus'] ].forEach( ([styleType, pseudo]) => {
			const stylesObj = {
				...expStyle(defaultStyles),
				...expStyle(opts.options[ styleType ])
			};
			if ( Object.keys( stylesObj ).length === 0 ) {
				return;
			}

			styleDefs += `${styleSelector}${pseudo} { `;
			for ( const st in stylesObj ) {
				styleDefs += `${camelToKebab( st )}: ${stylesObj[ st ]}; `;
			}
			styleDefs += `}\n`;
		} );

		if ( styleDefs !== "" ) {
			const id = "ewk_inputfield";
			const old = document.getElementById( id );
			if ( old ) {
				old.remove();
			}

			const styleEl = document.createElement('style');
			styleEl.id = id;
			styleEl.innerHTML = styleDefs;
			document.head.appendChild( styleEl );
		}

		///////////////////////////////////////

		// Validation & Event Logging
		const maxlength = opts.options?.maxlength;
		const re = opts.options?.inputRegexp ? new RegExp( opts.options.inputRegexp ) : null;
		input.addEventListener( 'input', () => {

			const value = this.input.value;
			const logData = { val: value };
			if ( maxlength && value.length > maxlength ) {
				this.input.value = this.lastOkValue || '';
				base.postLog( 'maxlength', logData );
			} else if ( re && !re.test( value ) ) {
				this.input.value = this.lastOkValue || '';
				base.postLog( 'invalid', logData );
				base.triggerInputValidationEvent();
			} else {
				this.lastOkValue = value;
				base.postLog( 'input', logData );
			}
			base.sendChangeState( this );
		});

		input.addEventListener( "focus", () => {
			base.postLog( "focus", { val: this.input.value } );
		});

		const blurEvent = this.dataSettings?.variablePrefix ? 'ev_Blur_' + this.dataSettings.variablePrefix : null;
		input.addEventListener( "blur", () => {
			base.fsm?.triggerEvent( 'ev_Blur_ExtRes' );
			if ( blurEvent ) {
				base.fsm?.triggerEvent( blurEvent );
			}
			base.postLog( "blur", { val: this.input.value } );
		});

		// !!!!!
		// !!!!! ToDo: get/setState() testen
		// !!!!!

		this.initData = this.getChState();
		base.sendChangeState( this );	// init & send changeState & score

		base.decInitCnt();
	}

	scoreDefType (varName) {
		return varName.match( /^V_Input_\w+$/ ) ? this.labType : 'Integer';
	}

	scoreDef () {
		const res = {};
		if ( this.readonly || !( "initData" in this ) ) {
			return res;
		}

		const pref = this.dataSettings?.variablePrefix;
		if ( pref ) {
			res[`V_Input_${pref}`] = this.labValFnc( this.input.value );
		}

		return res;
	}

	///////////////////////////////////

	getChState () {
		return this.input.value;
	}

	// Check if User made changes
	getDefaultChangeState () {
		return this.input.value !== this.initData;
	}

	getState () {
		return {
			v: this.input.value
		};
	}

	setState (state) {
		try {
			const saved = JSON.parse( state );
			this.input.value = saved.v;
		} catch (e) {
			console.error(e);
		}

		setStatePostProc(this);
	}

}
