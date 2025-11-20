
import { setStatePostProc } from '../../libs/common';
import { addScoring, dp2labFncInputRegExp, setBodyFont } from '../common';
import { SimpleInput } from './SimpleInput';

//////////////////////////////////////////////////////////////////////////////

class keyboardVisibility {

	constructor ( base, kbList ) {
		this.base = base;
		this.state = Object.fromEntries(
			kbList.map( k => [ k, null ] )
		);
		this.newState = { ...this.state };
		this.timerId = null;
	}

	// getState ( which ) {
	// 	return this.state[ which ];
	// }

	set( which, val ) {
		if ( this.newState[ which ]!==val ) {
			this.newState[ which ] = val;
			this.sendState();
		}
// Object.entries( this.newState ).forEach( ([k, newState]) => {
// 	console.log( `KBV ${k}: ${newState}` );
// });
// console.log();
	}

	enable ( which ) {
		this.set( which, true );
	}

	disable ( which ) {
		this.set( which, false );
	}

	// enableAll () {
	// 	Object.keys( this.newState ).forEach( k => {
	// 		this.set( k, true );
	// 	});
	// }

	disableAll () {
		Object.keys( this.newState ).forEach( k => {
			this.set( k, false );
		});
	}

	sendState () {
		// erst ggf. mehrere Umschaltungen sammeln, dann nur die wirklich geänderten senden
		if ( this.timerId ) {
			clearTimeout( this.timerId );
		}
		this.timerId = setTimeout( () => {
			this.timerId = null;
			Object.entries( this.newState ).forEach( ([k, newState]) => {
				if ( this.state[k] !== newState ) {
					this.base.fsm.triggerEvent( `EV_${ newState===true ? 'UNFROZEN' : 'FROZEN' }_${k}` );
					this.state[k] = newState;
				}
			});
		}, 10 );
	}
}

//////////////////////////////////////////////////////////////////////////////

class SimpleInputPikas extends SimpleInput {

	// simpleInput mit Keyboard-Visibility und Optionen für Pikas:
	//	- cursorAlwaysRight
	//	- deleteAll
	//	- navPrevDelbak
	//	- navNextFull

	constructor ( opts, divSelector, kbv ) {
		super( opts, divSelector );
		this.kbv = kbv;
	}

	checkKbvRight () {
		this.kbv.set( 'RIGHT', this._cursorPos < this.value.length );
	}

	checkKbvLeft () {
		this.kbv.set( 'LEFT', this._cursorPos > 0 );
	}

	checkKbvDelbak () {
		this.kbv.set( 'DELBAK', this._cursorPos > 0 );
	}

	checkKbvNum () {
		this.kbv.set( 'NUM', this.value.length < this.maxlength || this.maxlength===0 );
	}

	checkKbvAll () {
		this.checkKbvNum();
		this.checkKbvDelbak();
		this.checkKbvLeft();
		this.checkKbvRight();
	}

	///////////////////////////////////

	focus () {
		super.focus();
		this.checkKbvAll();
	}

	blur () {
		super.blur();
		this.kbv.disableAll();
	}

	setValue ( newValue, newCursorPos=null ) {
		super.setValue( newValue, newCursorPos );
		if ( this.navNextFull && this.maxlength>0 && this.value.length===this.maxlength ) {
			this.emit( 'navNext' );
			return;
		}
		this.checkKbvNum();
	}

	setCursorPos ( cursorX, renderCursor=true ) {
		if ( this.cursorAlwaysRight ) {
			cursorX = this.value.length;
		}
		super.setCursorPos( cursorX, renderCursor );
		this.checkKbvDelbak();
		this.checkKbvLeft();
		this.checkKbvRight();
	}

	delBakSpace () {
		if ( this.navPrevDelbak && this._cursorPos===0 ) {
			this.emit( 'navPrev' );
			return;
		}
		if ( this.deleteAll ) {
			this.setValue( '' );
			return;
		}
		super.delBakSpace();
	}

	delForward () {
		if ( this.deleteAll ) {
			this.setValue( '' );
			return;
		}
		super.delForward();
	}

	curLeft () {
		if ( this.cursorAlwaysRight ) {
			this.emit( 'navPrev' );
			return;
		}
		super.curLeft();
	}

	curRight () {
		if ( this.cursorAlwaysRight ) {
			this.emit( 'navNext' );
			return;
		}
		super.curRight();
	}

}

//////////////////////////////////////////////////////////////////////////////

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
		this.kbv = new keyboardVisibility( base, [ 'NUM', 'DELBAK', 'LEFT', 'RIGHT' ] );
		this.kbv.disableAll();

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

			const inp = new SimpleInputPikas( SimpleInputOpts, divSelector, this.kbv );

			evs.forEach( event => inp.on( event, (ev) => this.evh( event, idx+1, ev ) ) );

			if ( !readonly ) {

				// track current focus field
				const me = this;
				const oldFocusFnc = inp.focus;
				inp.focus = function () {
					const oldFocusField = me.focusField;
					if ( oldFocusField !== idx ) {
						if ( oldFocusField !== null ) {
							me.fields[ oldFocusField ].blur();
						}
						oldFocusFnc.apply( inp, arguments );
						me.focusField = idx;
					}
				}
				const orgBlurFnc = inp.blur;
				inp.blur = function () {
					orgBlurFnc.apply( inp, arguments );
					if ( me.focusField === idx ) {
						me.focusField = null;
					}
				}

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

				// Die checkXYZ anpassen für Sonderfälle, wenn es mehrere Felder gibt
				if ( f.navPrev ) {
					if ( opts.options.navPrevDelbak ) {
						const oldCheckKbvDelbak = inp.checkKbvDelbak;
						inp.checkKbvDelbak = function () {
							if ( inp._cursorPos===0 ) {
								inp.kbv.enable( 'DELBAK' );
								return;
							}
							oldCheckKbvDelbak.apply( inp, arguments );
						}
					}

					const oldCheckKbvLeft = inp.checkKbvLeft;
					inp.checkKbvLeft = function () {
						if ( inp._cursorPos===0 ) {
							inp.kbv.enable( 'LEFT' );
							return;
						}
						oldCheckKbvLeft.apply( inp, arguments );
					}

				} else if ( opts.options.cursorAlwaysRight ) {
					inp.checkKbvLeft = function () {
						inp.kbv.disable( 'LEFT' );
					}
				}


				if ( f.navNext || inp.navNextOnEnter && !hasNavPrevNext ) {
					const oldCheckKbvRight = inp.checkKbvRight;
					inp.checkKbvRight = function () {
						if ( inp._cursorPos>=inp.value.length ) {
							inp.kbv.enable( 'RIGHT' );
							return;
						}
						oldCheckKbvRight.apply( inp, arguments );
					}
				}

			} // if !readonly

			return inp;
		});

		addScoring( this, opts, addMods.Parser );
		this.startButtonListener();

		this.initData = this.getChState();
		this.base.sendChangeState( this );	// init & send changeState & score

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
									'delete': "Delete",
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
		const state = this.fields.map( f => f.value );
		return JSON.stringify( state );
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
