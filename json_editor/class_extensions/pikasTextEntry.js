
import { ignoreEvent, setStatePostProc } from '../../libs/common';
import { addScoring, dp2labFncInputRegExp, setBodyFont } from '../common';
import { SimpleInput } from './SimpleInput';
import { baseInits } from '../../libs/baseInits.js';

//////////////////////////////////////////////////////////////////////////////

// Verwaltet, welche Tasten(-Bereiche) sichtbar sind und meldet diese an IB
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
		registerChildModule( baseInits );
		base.incInitCnt();
		this.base = base;

		setBodyFont(
			opts.options.fontFile,
			opts.options.fontBold ? { 'font-weight': 'bold' } : {}
		);

		// !!!!!
		// !!!!! ToDo: get/setState() testen
		// !!!!!

		const evs = [ 'focus', 'blur', 'change', 'input', 'invalid', 'maxlength', 'oversize', 'cursorPosChanged', 'enterPressed', 'escPressed', 'keyDown', 'fontSizeChange' ];

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
		registerEvent( 'EV_FROZEN_NUM', 'Die numerischen Tasten sind nicht erlaubt' );
		registerEvent( 'EV_UNFROZEN_NUM', 'Die numerischen Tasten sind erlaubt' );
		registerEvent( 'EV_FROZEN_DELBAK', 'Die DELBAK-Taste ist nicht erlaubt' );
		registerEvent( 'EV_UNFROZEN_DELBAK', 'Die DELBAK-Taste ist erlaubt' );
		registerEvent( 'EV_FROZEN_LEFT', 'Die LEFT-Taste ist nicht erlaubt' );
		registerEvent( 'EV_UNFROZEN_LEFT', 'Die LEFT-Taste ist erlaubt' );
		registerEvent( 'EV_FROZEN_RIGHT', 'Die RIGHT-Taste ist nicht erlaubt' );
		registerEvent( 'EV_UNFROZEN_RIGHT', 'Die RIGHT-Taste ist erlaubt' );
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
			registerLog( 'focus',
				'Ein Element hat den Focus erhalten', {
					idx: 'Index [1..n] des Feldes',
			});
			registerLog( 'blur',
				'Ein Element hat den Focus verloren', {
					idx: 'Index [1..n] des Feldes',
			});
			registerLog( 'change',
				'Eine Eingabe in einem Feld wurde abgeschlossen', {
					idx: 'Index [1..n] des Feldes',
					data: 'Neuer Inhalt des Feldes',
			});
			registerLog( 'input',
				'Der Inhalt eines Feldes hat sich geändert', {
					idx: 'Index [1..n] des Feldes',
					data: 'Aktueller Inhalt des Feldes',
			});
			registerLog( 'invalid',
				'Es versucht, eine ungültige Eingabe in einem Feld zu machen', {
					idx: 'Index [1..n] des Feldes',
					data: 'Versuchter, verworfener Inhalt des Feldes',
			});
			registerLog( 'maxlength',
				'Die maximale Länge eines Feldes sollte überschritten werden', {
					idx: 'Index [1..n] des Feldes',
					data: 'Versuchter, verworfener Inhalt des Feldes',
			});
			registerLog( 'oversize',
				'Der Inhalt eines Feldes ist zu groß und kann nicht	dargestellt werden', {
					idx: 'Index [1..n] des Feldes',
					data: 'Versuchter, verworfener Inhalt des Feldes',
			});
			registerLog( 'cursorPosChanged',
				'Die Cursor-Position hat sich geändert', {
					idx: 'Index [1..n] des Feldes',
					data: 'Neue Cursor-Position [0..n]'
			});
			registerLog( 'enterPressed',
				'Die Enter-Taste wurde gedrückt', {
					idx: 'Index [1..n] des Feldes',
					data: 'Inhalt des Feldes',
			});
			registerLog( 'escPressed',
				'Die Esc-Taste wurde gedrückt', {
					idx: 'Index [1..n] des Feldes',
					data: '(Verworfener) Inhalt des Feldes',
			});
			registerLog( "keyDown",
				"Eine Taste wurde innerhalb eines Feldes gedrückt", {
					idx: "Index [1..n] des Feldes",
					data: "Gedrückte Taste",
			});
			registerLog( 'fontSizeChange',
				'Die Schriftgröße eines Feldes hat sich geändert', {
					idx: 'Index [1..n] des Feldes',
					data: 'Neue Schriftgröße',
			});

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

				let catched;

				// navPrev umsetzen?
				catched = false;
				if ( f.navPrev ) {
					const prevIdx = parseInt( f.navPrev, 10 ) - 1;
					if ( prevIdx <= opts.fields.length && prevIdx >= 0 ) {
						catched = true;
						const navToPrev = () => {
							const field = me.fields[ prevIdx ];
							base.postLog("navPrev", {
								idx: idx+1,
								to: prevIdx+1,
							});
							registerLog( 'navPrev',
								"'Zum vorherigen Feld navigieren' ausgelöst", {
									idx: "Index [1..n] des aktuellen Feldes",
									to: "Index [1..n] des vorherigen Feldes",
							});
							field.focus();
							field.setCursorPos( field.value.length );
						};
						inp.on( 'navPrev', navToPrev );
					}
				}
				if ( !catched ) {
					inp.on( 'navPrev', () => {
						base.postLog("navPrevNothing", {
							idx: idx+1,
						});
						registerLog( 'navPrevNothing',
							"'Zum vorherigen Feld navigieren' ausgelöst, Feld ist aber nicht definiert", {
								idx: "Index [1..n] des aktuellen Feldes",
						});
					});
				}

				// navNext umsetzen?
				const navToNext = (newIdx) => {
					const field = me.fields[ newIdx ];
					base.postLog("navNext", {
						idx: idx+1,
						to: newIdx+1,
					});
					registerLog( 'navNext',
						"'Zum nächsten Feld navigieren' ausgelöst", {
							idx: "Index [1..n] des aktuellen Feldes",
							to: "Index [1..n] des nächsten Feldes",
					});
					field.focus();
					field.setCursorPos( 0 );
				};
				catched = false;
				if ( f.navNext ) {
					const nextIdx = parseInt( f.navNext, 10 ) - 1;
					const navNext2 = () => navToNext( nextIdx );
					if ( nextIdx <= opts.fields.length && nextIdx >= 0 ) {
						catched = true;
						inp.on( 'navNext', navNext2 );
						if ( opts.options.navNextOnEnter ) {
							inp.on( 'enterPressed', navNext2 );
						}
					}
				}
				if ( !catched && !( opts.options.navNextOnEnter && !hasNavPrevNext ) ) {
					const logNavNextNothing = () => {
						base.postLog("navNextNothing", {
							idx: idx+1,
						});
					};
					inp.on( 'navNext', logNavNextNothing );
					if ( opts.options.navNextOnEnter ) {
						inp.on( 'enterPressed', logNavNextNothing );
					}
					registerLog( 'navNextNothing',
						"'Zum nächsten Feld navigieren' ausgelöst, Feld ist aber nicht definiert", {
							idx: "Index [1..n] des aktuellen Feldes",
					});
				}

				if ( opts.options.navNextOnEnter && !hasNavPrevNext ) {
					// Wenn keine explizite Navigation angegeben
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

		// clickedNothing
		const container = typeof divSelector === "string" ? document.querySelector(divSelector) : divSelector;
		if ( container ) {
			container.style.width = "100%";
			container.style.height = "100%";

			// clickedNothing event listener
			container.addEventListener( "click", (ev) => {
				if ( ignoreEvent(ev) ) {
					return
				}
				const div = ev.currentTarget.getBoundingClientRect();
				const x = ev.clientX - div.left; // X-Koordinate relativ zum Div
				const y = ev.clientY - div.top;  // Y-Koordinate relativ zum Div
				this.base.postLog( 'clickedNothing', { x, y } );
				registerLog( 'clickedNothing',
					'User hat ohne Effekt irgendwo geklickt', {
						x: 'X-Koordinate innerhalb Container',
						y: 'Y-Koordinate innerhalb Container',
				});
			});
		}

		// keyDownNothing event listener
		document.addEventListener( "keydown", (ev) => {
			if ( ignoreEvent(ev) ) {
				return
			}
			this.base.postLog( 'keyDownNothing', {
				data: ev.key,
			});
			registerLog( 'keyDownNothing',
				"Eine Taste wurde außerhalb eines Feldes (ohne Effekt) gedrückt", {
					data: "Gedrückte Taste",
			});
		});

		this.startButtonListener();

		addScoring( this, opts, addMods.Parser );
		this.initData = this.getChState();
		addScoring( this, opts, addMods.Parser );
		this.base.sendChangeState( this );	// init & send changeState & score

		base.decInitCnt();
	}

	scoreDefType (varName) {
		return varName.match( /^V_Input_\w+_\d+$/ ) ? this.labType : 'Integer';
	}

	scoreDef ( exportAll=false ) {
		const res = {};
		if ( this.readonly ) {
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
				res[`V_Status_${pref}_All`] = this.initData ? +this.getChState().every( ( val, i ) => val != this.initData[i] ) : 0;
			}
		}

		if ( this.computeScoringVals ) {
			this.computeScoringVals( res , exportAll );
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

			if ( ['invalid','maxlength'].includes(event) ) {
				this.base.triggerInputValidationEvent();
				registerEvent( 'ev_InputValidation_ExtRes', 'In einem Input-Feld sollten unerlaubte Eingaben gemacht werden.' );
				registerEvent( 'ev_InputValidation_<pref>', 'In einem Input-Feld sollten unerlaubte Eingaben gemacht werden.' );
			} else if ( ['input','change'].includes(event) ) {
				this.base.sendChangeState( this );	// init & send changeState & score
			}
		}
	}

	startButtonListener () {
		this.base.startListeningToCallEPFOp( btn => {
			if ( this.focusField!==null ) {

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
			registerMessage( 'btn_0', `Simuliert (bei Focus) Tastendruck '0'` );
			registerMessage( 'btn_1', `Simuliert (bei Focus) Tastendruck '1'` );
			registerMessage( 'btn_2', `Simuliert (bei Focus) Tastendruck '2'` );
			registerMessage( 'btn_3', `Simuliert (bei Focus) Tastendruck '3'` );
			registerMessage( 'btn_4', `Simuliert (bei Focus) Tastendruck '4'` );
			registerMessage( 'btn_5', `Simuliert (bei Focus) Tastendruck '5'` );
			registerMessage( 'btn_6', `Simuliert (bei Focus) Tastendruck '6'` );
			registerMessage( 'btn_7', `Simuliert (bei Focus) Tastendruck '7'` );
			registerMessage( 'btn_8', `Simuliert (bei Focus) Tastendruck '8'` );
			registerMessage( 'btn_9', `Simuliert (bei Focus) Tastendruck '9'` );
			registerMessage( 'btn_plus', `Simuliert (bei Focus) Tastendruck '+'` );
			registerMessage( 'btn_minus', `Simuliert (bei Focus) Tastendruck '-'` );
			registerMessage( 'btn_result', `Simuliert (bei Focus) Tastendruck '='` );
			registerMessage( 'btn_backspace', `Simuliert (bei Focus) Tastendruck 'Backspace'` );
			registerMessage( 'btn_delete', `Simuliert (bei Focus) Tastendruck 'Delete'` );
			registerMessage( 'btn_left', `Simuliert (bei Focus) Tastendruck 'ArrowLeft'` );
			registerMessage( 'btn_right', `Simuliert (bei Focus) Tastendruck 'ArrowRight'` );
		});
	}

	///////////////////////////////////

	getChState () {
		return this.fields.map( f => f.value );
	}

	// Check if User made changes
	getDefaultChangeState () {
		return this.initData ? this.getChState().some( (val, i) => val != this.initData[i] ) : false;
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
