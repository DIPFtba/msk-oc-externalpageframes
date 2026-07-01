import { object_equals, mergeDeep, setStatePostProc } from '../../libs/common.js'
// import { addScoring } from "../common.js";
import { initializeAndMount } from '../external_bundled/chat-bot-json.js';

import '../external_bundled/chat-bot-json.css';
import { setBodyFont } from '../common.js';

export class chatBotJsonFromSchema {

	constructor(divSelector, cfgData, base ) {

		base.regSendInitDone();
		base.incInitCnt();

		setBodyFont( cfgData.fontFile );

		const defaultOpts = {
			readonly: false,
			dataSettings: {},
		}

		mergeDeep( Object.assign( this, defaultOpts ), cfgData );
		this.base = base;

		this.vueApp = initializeAndMount(
			divSelector,
			cfgData,
			() => {
				// Das hier passiert, wenn state in Vue App geändert wird
				base.sendChangeState( this );
			},
			// postMessage-Function
			this.postMessageWrapper.bind(this) );

		// console.log(this.vueApp,this.vueApp.state);

		// // Für debug Zwecke, um von außen den Text setzen zu können
		// window.setText = (t) => this.vueApp.state.textValue = t;

		this.chatBotVar = '';
		this.chatUserVar = '';
		this.pref = this.dataSettings?.variablePrefix ? `_${this.dataSettings.variablePrefix}` : '';
		this.createIBCharVars();
		this.base.sendChangeState( this );	// init & send changeState & score
		this.initData = this.getChState();

		// addScoring( this, cfgData, addMods.Parser );

		base.decInitCnt();
	}

	///////////////////////////////////

	postMessageWrapper( msgObject ) {
		const triggerEvents = [];
		let sendChange = 0;

		// Chat Restart?
		if ( msgObject?.traceMessage?.event==='CHAT_RESTARTED' ) {
			if ( Object.values(this.IBChatVars).some( v => v!==0 ) ) {
				sendChange = 1;
				this.clearIBChatVars();
			}
		}

		// V_ChatBot setzen ?
		if ( this.dataSettings?.chatBotVar && msgObject?.traceMessage?.event==='ENTRY_ADDED_BOT' ) {
			const newVal = msgObject.traceMessage.label ?? '';
			if ( newVal !== this.chatBotVar ) {
				this.chatBotVar = newVal;
				sendChange = 1;
				triggerEvents.push('EV_CHAT_BOT');
			}
		}
		if ( msgObject?.traceMessage?.event==='ENTRY_ADDED_USER' ) {
			const newVal = msgObject.traceMessage.logLabel ?? '';
			// V_ChatUser setzen ?
			if ( this.dataSettings?.chatUserVar && newVal !== this.chatUserVar ) {
				this.chatUserVar = newVal;
				sendChange = 1;
				triggerEvents.push('EV_CHAT_USER');
			}

			// IB-Var gesetzt?
			if ( newVal ) {
				const entry = this.chat?.user?.find( user => user.IBVar && user.logLabel === newVal );
				if ( entry ) {
					const varName = this.IBChatTr[newVal];
					if ( varName && !this.IBChatVars[varName] ) {
						this.IBChatVars[varName] = 1;
						sendChange = 1;
					}
				}
			}
		}
		if ( sendChange ) {
			this.base.sendChangeState( this );
		}
		triggerEvents.forEach( ev => this.base.fsm.triggerEvent(ev) );

		this.base.fsm.postMessageWithPathsAndTraceCount( msgObject )
	}

	///////////////////////////////////

	createIBCharVars() {
		// { logLabel1: VarName1, logLabel2, VarName2, ... }
		const entries = Object.fromEntries(
			this.chat?.user?.
				filter( user => user.IBVar && user.logLabel.trim().length>0 ).
				map( user => [ user.logLabel, `V_Chat${this.pref}_${user.logLabel.replaceAll( /^(?:_|[^a-zA-Z0-9])+|(?:_|[^a-zA-Z0-9])+$/g, '' ).replaceAll( /(?:_|[^a-zA-Z0-9]){2,}/g, '_' )}` ] )
		);
		this.IBChatTr = entries;
		this.clearIBChatVars();
	}

	clearIBChatVars() {
		this.IBChatVars = Object.fromEntries( Object.values( this.IBChatTr ).map( v => [v, 0] ) );
	}

	getChState () {
		// Einträge können nicht geändert werden, also nur Länge ansehen
		return this.vueApp?.state?.chat?.curr?.length;
	}

	// Check if User made changes
	getDefaultChangeState () {
		return !object_equals( this.getChState(), this.initData );
	}

	scoreDefType (varName) {
		return varName.startsWith('V_Chat_') ? 'Integer' : 'String';
	}

	scoreDef () {
		const res = {};
		if ( this.pref !== undefined ) {
			if ( this.dataSettings?.chatBotVar ) {
				res[`V_ChatBot${this.pref}`] = this.chatBotVar;
			}
			if ( this.dataSettings?.chatUserVar ) {
				res[`V_ChatUser${this.pref}`] = this.chatUserVar;
			}
			if ( this.IBChatVars ) {
				Object.assign( res, this.IBChatVars );
			}
		}
		return res;
	}

	///////////////////////////////////

	getState () {
		const state = this.vueApp?.state?.chat;
		return JSON.stringify({
			curr: state?.curr.filter( entry => !entry.isPrechat ),
			currLabel: state?.currLabel,
			prev: state?.prev,
			chatUserVar: this.chatUserVar,
			chatBotVar: this.chatBotVar,
			chatVars: this.IBChatVars,
		});
	}

	setState ( jsonState ) {
		try {
			const state = JSON.parse(jsonState);

			this.vueApp.state.loadChat({
				curr: state.curr.map( entry => {
					// Bei Eintrag .curr wird isStillTyping entfernt, da das sonst nicht entfernt wird
					if ('isStillTyping' in entry) {
						const { isStillTyping: _isStillTyping, ...rest } = entry;
						return rest;
					}
					return entry;
				}),
				currLabel: state.currLabel,
				prev: state.prev,
			});

			let userNew = false, botNew = false, chatNew=false;

			// ChatVars laden
			if ( state.chatVars ) {
				for ( const varName in state.chatVars ) {
					if ( state.chatVars[varName] !== this.IBChatVars[varName] ) {
						this.IBChatVars[varName] = state.chatVars[varName];
						chatNew = true;
					}
				}
			}

			// Variablen setzen, Events schicken
			if ( state.chatBotVar !== this.chatBotVar ) {
				this.chatBotVar = state.chatBotVar;
				botNew = true;
			}
			if ( state.chatUserVar !== this.chatUserVar ) {
				this.chatUserVar = state.chatUserVar;
				userNew = true;
			}
			if ( botNew || userNew || chatNew ) {
				this.base.sendChangeState( this );
				if ( botNew ) this.base.fsm.triggerEvent('EV_CHAT_BOT');
				if ( userNew ) this.base.fsm.triggerEvent('EV_CHAT_USER');
			}

		} catch (e) {
			console.error('setState() error:', e);
		}

		setStatePostProc(this);
	}

}
