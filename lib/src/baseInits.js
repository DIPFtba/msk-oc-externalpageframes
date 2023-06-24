import { object_equals } from './common'
import { fsmSend } from './fsm'

// Konva should bei imported, but doens't seem to support tree shaking, so leave it out
// import Konva from 'konva/lib/Core'

export class baseInits {

	constructor ( opts = {} ) {

		// Options and defaults
		const defaults = {
			container: null,
			addSendChangeState: null,
		}
		Object.assign( this, defaults, opts );

		// create fsm object, if not provided
		if ( !this.fsm ) {
			this.fsm = new fsmSend();
			this.fsm.startListeningToVariableDeclarationRequests( this.declareVariables.bind(this) );
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
			this.fsm.triggerEvent( 'ev_InputValidation_' + __itemFN.replace("msk_","") );
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
		}

		for ( const vname in this.FSMVarsSent ) {

			const vdef = {
				name: vname,
				type: typetrans[ typeof this.FSMVarsSent[vname] ],
				defaultValue: this.FSMVarsSent[vname],
				namedValues: [],
			}
			varDefs.push( vdef );
		}

		return varDefs;
	}
}
