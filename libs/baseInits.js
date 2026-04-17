import { object_equals } from './common'
import { fsmSend } from './fsm'

// Konva should bei imported, but then tree shaking isn't working, so leave it out
// import Konva from 'konva/lib/Core'

export class baseInits {

	constructor ( opts = {} ) {

		// Options and defaults
		const defaults = {
			container: null,
			addSendChangeState: null,
			//dataSettings: {}	// set by opts
		}
		Object.assign( this, defaults, opts );

		// create fsm object, if not provided
		if ( !this.fsm ) {
			this.fsm = new fsmSend();
			this.fsm.startListeningToVarDeclReq( this.declareVariables.bind(this) );
		}

		// init stage & layer
		if ( opts.container ) {
			if ( !this.width ) {
				this.width = window.innerWidth;
			}
			if ( !this.height ) {
				this.height = window.innerHeight;
			}

			this.stage = new Konva.Stage({
				container: this.container,
				width: this.width,
				height: this.height,
			});


			const stageVN = "BW_IB_EXTRES_STAGES";
			if ( !( stageVN in window ) ) {
				window[stageVN] = [];
			}
			window[stageVN].push( this.stage );


			// this.layer = new Konva.Layer();
			// this.stage.add( this.layer );
		}

		// disable mouse right click
		document.addEventListener( 'contextmenu', (ev) => ev.preventDefault() );

		this.FSMVarsSent = {};
	}

	///////////////////////////////////

	// method wrapper for posting to FSM

	postLog ( event, data={} ) {
		if ( !this.stage || !this.stage.isDemoAni ) {
			this.fsm.postLogEvent( Object.assign( {}, data, { event: event } ) );
		}
	}

	postVariable ( name, val ) {
		this.FSMVarsSent[name] = val;
		this.fsm.setFSMVariable( name, val );
	}

	triggerInputValidationEvent () {
		if ( this.fsm.triggerEvent ) {
/// #if __item == ''
			if ( this.dataSettings && this.dataSettings.variablePrefix ) {
				this.fsm.triggerEvent( 'ev_InputValidation_' + this.dataSettings.variablePrefix );
			}
/// #else
			this.fsm.triggerEvent( 'ev_InputValidation_' + __itemFN.replace("msk_","") );
/// #endif
			this.fsm.triggerEvent( 'ev_InputValidation_ExtRes' );
		}
	}

	///////////////////////////////////

	// get state-vars of obj
	getChangeState ( obj ) {

		// statusVarDef defined in obj?
		if ( obj.statusVarDef ) {

			return obj.statusVarDef.call(obj);

		} else {

			// call defaultChangeState()
			return +obj.getDefaultChangeState();

		}
	}

	sendChangeState ( obj, newState=null ) {

		// Dont send states or score in demoAni
		if ( obj.stage && obj.stage.isDemoAni ) {
			return;
		}

		// state Variable (changeState) changed?
		const changeState = ( newState===null ? this.getChangeState(obj) : newState );

		// is state changed? -> send msgs
		if ( typeof obj.oldChangeState === 'undefined' || !object_equals( changeState, obj.oldChangeState ) ) {

			if ( typeof changeState === 'object' ) {
				// changeState = { FSMStateVar1: state1, FSMStateVar2: state2, ... }
				for ( let k in changeState ) {
					if ( typeof obj.oldChangeState !== 'object' || changeState[k] !== obj.oldChangeState[k] ) {
						this.postVariable( k, changeState[k] );
					}
				}

			} else if ( obj.FSMVariableName ) {
				// Simple 1-value state
				this.postVariable( `V_Status_${obj.FSMVariableName}`, +changeState );
			}

			obj.oldChangeState = changeState;
		}

		// score changed?
		if ( obj.scoreDef ) {

			const score = obj.scoreDef.call(obj);
			this.scoreObj = obj;

			if ( typeof obj.oldScore === 'undefined' || !object_equals( score, obj.oldScore ) ) {
				if ( typeof score === 'object' ) {
					// score = { FSMStateVar1: state1, FSMStateVar2: state2, ... }
					for ( let k in score ) {
						if ( typeof obj.oldScore !== 'object' || score[k] !== obj.oldScore[k] ) {
							this.postVariable( k, score[k] );
						}
					}

				} else if ( obj.FSMVariableName || obj.scoreVariableName ) {
					// Simple 1-value score
					if ( typeof score !== 'undefined' ) {
						this.postVariable( obj.scoreVariableName || `V_Score_${obj.FSMVariableName}`, score );
					}
				}
			}

			obj.oldScore = score;
		}

		if ( typeof this.addSendChangeState === 'function' ) {
			(this.addSendChangeState)();
		}
	}

	// send information about variables sent
	declareVariables () {

		const varDefs = [];
		const typetrans = {
			'string': 'String',
			'number': 'Integer',
			'boolean': 'Boolean',
		}
		const emptyString = 'EMPTY';

		try {
			for ( const vname in this.FSMVarsSent ) {

				const val = this.FSMVarsSent[vname];
				let type = '';
				let defaultValue = val;

				if ( this.scoreObj && this.scoreObj.scoreDefType ) {
					// Typdefinition aus JSON Config/Class
					type = this.scoreObj.scoreDefType.call(this.scoreObj, vname);
				}

				if ( type ) {
					// Typdef vorhanden
					switch ( type ) {
						case 'Boolean':
							if ( val===null || val===undefined ) {
								defaultValue = false;
							}
							break;
						case 'String':
							if ( val===null || val===undefined || val === '' ) {
								defaultValue = emptyString;
							}
							break;
						case 'Integer':
						case 'Number':
							if ( val===null || val===undefined || Number.isNaN(val) ) {
								defaultValue = 0;
							}
							break;
					}

				} else {
					// keine Typdef, automatische Typdefinition
					if (val===null) {
						type = 'Integer';
						defaultValue = 0;
					}
					else if (typetrans[ typeof val ]) {
						type = typetrans[ typeof val ];
						defaultValue = Number.isNaN(val) || val===null ? 0 : ( val === '' ? emptyString : val );
					}
					else {
						type = 'String';
						defaultValue = !val ? emptyString : JSON.stringify(val);
					}
				}

				// deaultValue aus JSON Config/Class überschreibt Default-Werte
				if ( this.scoreObj && this.scoreObj.scoreDefDefault ) {
					// Default-Definition aus JSON Config/Class
					const newVal = this.scoreObj.scoreDefDefault.call(this.scoreObj, vname);
					if ( typeof newVal !== 'undefined' ) {
						defaultValue = newVal;
					}
				}

				const vdef = {
					name: vname,
					type,
					defaultValue,
					namedValues: [],
				}
				varDefs.push( vdef );
			}

		} catch (e) {
			varDefs.push({
				name: 'EPF_VariableDeclarationError',
				type: 'String',
				defaultValue: e,
				namedValues: []
			});
		}

// console.log("====== declareVariables:", varDefs);
		return varDefs;
	}

	///////////////////////////////////

	getInitDonePromise () {
		return this.fsm.getInitDonePromise();
	}

	incInitCnt () {
		return this.fsm.incInitCnt();
	}

	decInitCnt () {
		return this.fsm.decInitCnt();
	}

	regSendInitDone () {
		this.getInitDonePromise().then( () => {
			this.fsm.triggerEvent( "EV_InitDone_ExtRes" );
			if ( this.dataSettings && this.dataSettings.variablePrefix ) {
				this.fsm.triggerEvent( `EV_InitDone_${this.dataSettings.variablePrefix}` );
			}
		});
	}

}
