
import { setStatePostProc } from '../../libs/common';
import { addScoring, dp2labFncInputRegExp, setBodyFont } from '../common';
import { SimpleInput } from './SimpleInput';

export class pikasTextEntryFromSchema {

	constructor ( divSelector, opts = {}, base = null, addMods={} ) {
		base.regSendInitDone();
		base.incInitCnt();
		this.base = base;

		setBodyFont(
			opts.options.fontFile,
			opts.options.fontBold ? { 'font-weight': 'bold' } : {}
		);

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

		const hasNavPrevNext = opts.fields.some( f => f.navPrev || f.navNext );
		opts.options.navNextOnEnter &&= opts.options.blurOnEnter;

		const hasVarNames = opts.fields.some( f => f.varName );

		this.fields = opts.fields.map( (f,idx) => {

			const readonly = opts.readonly || f.readonly;
			const SimpleInputOpts = {
				...opts.options,
				...f,
				readonly,
			};

			const inp = new SimpleInput( SimpleInputOpts, divSelector );

			evs.forEach( event => inp.on( event, (ev) => this.evh( event, idx+1, ev ) ) );

			if ( !readonly ) {

				// track current focus field
				const me = this;
				const oldFocus = inp.focus;
				inp.focus = function () {
					const oldFocusField = me.focusField;
					if ( oldFocusField !== idx ) {
						if ( oldFocusField !== null ) {
							me.dontDisableKeyboard = true;
							me.fields[ oldFocusField ].blur();
						}
						oldFocus.apply( this, arguments );
						me.focusField = idx;
						me.dontDisableKeyboard = false;
						// me.checkPossibleInput();
						me.enableKeyboard();
					}
				}
				const oldBlur = inp.blur;
				inp.blur = function () {
					oldBlur.apply( this, arguments );
					if ( me.focusField === idx ) {
						me.focusField = null;
						if ( !me.dontDisableKeyboard ) {
							me.disableKeyboard();
						}
					}
				}

				// // Kann an der aktuellen Cursorposition laut MaxLength/RegExp noch etwas
				// // über externe Tastatur eingegeben werden?
				// // Entsprechenden Status der Tastatur setzen
				// // Kann aber nicht voraussagen, ob Zeichen (mit Schriftverkleinerung?) noch passen würde
				// inp.checkPossibleInput = function () {
				// 	if ( this.maxlength && this.value.length >= this.maxlength ) {
				// 		inputPossible = false;
				// 	} else
				// 	if ( inputPossible ) {
				// 		me.enableKeyboard();
				// 	} else {
				// 		me.disableKeyboard();
				// 	}
				// }
				// ['input','cursorPosChanged'].forEach( ev => {
				// 	inp.on( ev, inp.checkPossibleInput.bind(inp) );
				// });

				// navPrev umsetzen?
				if ( f.navPrev ) {
					const prevIdx = parseInt( f.navPrev, 10 ) - 1;
					if ( prevIdx <= opts.fields.length && prevIdx >= 0 ) {
						const navToPrev = () => {
							const field = me.fields[ prevIdx ];
							field.focus();
							field.setCursorPos( field.value.length );
						};
						inp.on( 'navPrev', navToPrev );
					}
				}

				// navNext umsetzen?
				const navToNext = (newIdx) => {
					const field = me.fields[ newIdx ];
					field.focus();
					field.setCursorPos( 0 );
				};
				if ( f.navNext ) {
					const nextIdx = parseInt( f.navNext, 10 ) - 1;
					const navNext2 = () => navToNext( nextIdx );
					if ( nextIdx <= opts.fields.length && nextIdx >= 0 ) {
						inp.on( 'navNext', navNext2 );
						if ( opts.options.navNextOnEnter ) {
							inp.on( 'enterPressed', navNext2 );
						}
					}
				}

				if ( opts.options.navNextOnEnter && !hasNavPrevNext ) {
					const nextIdx = (idx+1) % opts.fields.length;
					inp.on( 'enterPressed', () => navToNext( nextIdx ) );
				}

				if ( !hasVarNames && this.dataSettings?.variablePrefix ) {
					inp.varName = (idx+1).toString();
				}

			} // if !readonly

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
				if ( !f.readonly && f.varName ) {
					res[`V_Input_${pref}_${f.varName}`] = this.labValFnc( f.value );
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

	enableKeyboard () {
		if ( this.keyboard !== true ) {
			this.base.fsm.triggerEvent('EV_UNFROZEN');
			this.keyboard = true;
		}
	}

	disableKeyboard () {
		if ( this.keyboard !== false ) {
			this.base.fsm.triggerEvent('EV_FROZEN');
			this.keyboard = false;
		}
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
			} else if ( ['input','change'].includes(event) ) {
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
								// Wenn die durch die externe Tastatur eingebbaren Zeichen geändert
								// werden, dann unbdeingt auch in checkPossibleInput() ändern!
								this.fields[ this.focusField ].simulateKeyPress( key );

							} else {

								const keyTrans = {
									'backspace': "Backspace",
									'plus': "+",
									'minus': "-",
									'result': "=",
									'left': "ArrowLeft",
									'right': "ArrowRight",
								};
								if ( key in keyTrans ) {
									// Wenn die durch die externe Tastatur eingebbaren Zeichen geändert
									// werden, dann unbdeingt auch in checkPossibleInput() ändern!
									this.fields[ this.focusField ].simulateKeyPress( keyTrans[key] );
								}
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
