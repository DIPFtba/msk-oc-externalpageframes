
import { setStatePostProc } from '../../libs/common';
import { addScoring, dp2labFncInputRegExp, setBodyFont } from '../common';
import { SimpleInput } from './SimpleInput';

export class pikasTextEntryFromSchema {

	constructor ( divSelector, opts = {}, base = null, addMods={} ) {
		base.regSendInitDone();
		base.incInitCnt();
		this.base = base;

		setBodyFont( opts.options.fontFile );

		// !!!!!
		// !!!!! ToDo: get/setState() testen
		// !!!!!

		const evs = [ 'focus', 'blur', 'change', 'input', 'invalid', 'maxlength', 'cursorPosChanged', 'enterPressed', 'escPressed' ];

		[ 'stylesNormal', 'stylesHover', 'stylesFocus' ].forEach( st => {
			[ 'borderWidth', 'borderRadius' ].forEach( stk => {
				opts.options[st][stk] += 'px'
			});
			delete opts.options[st].setBG;
		});
		dp2labFncInputRegExp( opts.options, this );
		this.dataSettings = opts.dataSettings || {};

		this.focusField = null;

		this.fields = opts.fields.map( (f,idx) => {

			const SimpleInputOpts = {
				...opts.options,
				...f,
				readonly: f.readonly || opts.readonly,
			};

			const inp = new SimpleInput( SimpleInputOpts, divSelector );

			evs.forEach( event => inp.on( event, (ev) => this.evh( event, idx+1, ev ) ) );

			// track current focus field
			const me = this;
			const oldFocus = inp.focus;
			inp.focus = function () {
				oldFocus.apply( this, arguments );
				me.focusField = idx;
			}
			const oldBlur = inp.blur;
			inp.blur = function () {
				oldBlur.apply( this, arguments );
				if ( me.focusField === idx ) {
					me.focusField = null;
				}
			}

			return inp;
		});

		addScoring( this, opts, addMods.Parser );
		this.startButtonListener();

		this.initData = this.getChState();

		base.decInitCnt();
	}

	scoreDefType (varName) {
		return varName.match( /^V_Input_\w+_\d+$/ ) ? this.labType : 'Integer';
	}

	scoreDef () {
		const res = {};
		if ( this.readonly || !this.initData ) {
			return res;
		}

		const pref = this.dataSettings?.variablePrefix;
		if ( pref ) {
			this.fields.forEach( (f, i) => {
				if ( !f.readonly ) {
					res[`V_Input_${pref}_${i+1}`] = this.labValFnc( f.value );
				}
			});

			if ( this.dataSettings?.createInpAllVars ) {
				res[`V_Status_${pref}_All`] = +this.getChState().every( ( val, i ) => val != this.initData[i] );
			}
		}

		if ( this.computeScoringVals ) {
			this.computeScoringVals( res );
		}

		return res;
	}

	///////////////////////////////////

	evh ( event, idx, ev ) {
		if ( this.base ) {
			const logDat = {
				...ev,
				idx,
			}
			delete logDat.type
			delete logDat.target;
			this.base.postLog( event, logDat );

			if ( event=='invalid' ) {
				this.base.triggerInputValidationEvent();
			} else if ( event=='change' ) {
				this.base.sendChangeState( this );	// init & send changeState & score
			}
		}
	}

	startButtonListener () {
		window.addEventListener(
			"message",
			(event) => {

				try {
					if ( this.focusField!==null ) {

						const [ btn ] = JSON.parse(event.data);
						if ( btn.startsWith('btn_' ) ) {
							const key = btn.substring(4);

							const simpleKeys = ['0', '1', '2', '3', '4', '5', '6', '7', '8', '9'];
							if ( simpleKeys.includes( key ) ) {
								this.fields[ this.focusField ].simulateKeyPress( key );
							}

							const keyTrans = {
								'backspace': "Backspace",
								'plus': "+",
								'minus': "-",
								'result': "=",
								'left': "ArrowLeft",
								'right': "ArrowRight",
							};
							if ( key in keyTrans ) {
								this.fields[ this.focusField ].simulateKeyPress( keyTrans[key] );
							}
						}

					}
				} catch (e) {}

			},
			false );
	}

	///////////////////////////////////

	getChState () {
		return this.fields.map( f => f.value );
	}

	// Check if User made changes
	getDefaultChangeState () {
		return this.getChState().some( (val, i) => val != this.initData[i] );
	}

	getState () {
		return this.fields.map( f => f.value );
	}

	setState (state) {
		try {
			const saved = JSON.parse( state );
			saved.forEach( (val, i) => {
				if ( this.fields[i] ) {
					this.fields[i].value = val;
				}
			});
		} catch (e) {
			console.error(e);
		}

		setStatePostProc(this);
	}

}
