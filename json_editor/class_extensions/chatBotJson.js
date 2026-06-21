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

		this.initData = this.getChState();
		this.botTextVar = '';
		this.userTextVar = '';
		this.pref = this.dataSettings?.variablePrefix ? `_${this.dataSettings.variablePrefix}` : '';
		this.base.sendChangeState( this );	// init & send changeState & score

		// addScoring( this, cfgData, addMods.Parser );

		base.decInitCnt();
	}

	///////////////////////////////////

	postMessageWrapper( msgObject ) {
		// V_BotText setzen ?
		if ( this.dataSettings?.botTextVar && msgObject?.traceMessage?.event==='ENTRY_ADDED_BOT' ) {
			const newVal = msgObject.traceMessage.label ?? '';
			if ( newVal !== this.botTextVar ) {
				this.botTextVar = newVal;
				this.base.sendChangeState( this );	// damit Score neu gesetzt wird
				this.base.fsm.triggerEvent('EV_BOT_TEXT');
			}
		}
		// V_UserText setzen ?
		if ( this.dataSettings?.userTextVar && msgObject?.traceMessage?.event==='ENTRY_ADDED_USER' ) {
			const newVal = msgObject.traceMessage.logLabel ?? '';
			if ( newVal !== this.userTextVar ) {
				this.userTextVar = newVal;
				this.base.sendChangeState( this );	// damit Score neu gesetzt wird
				this.base.fsm.triggerEvent('EV_USER_TEXT');
			}
		}
		this.base.fsm.postMessageWithPathsAndTraceCount( msgObject )
	}

	///////////////////////////////////

	getChState() {
		// Einträge können nicht geändert werden, also nur Länge ansehen
		return this.vueApp?.state?.chat?.curr?.length;
	}

	// Check if User made changes
	getDefaultChangeState () {
		return !object_equals( this.getChState(), this.initData );
	}

	scoreDefType () {
		return 'String';
	}

	scoreDef() {
		const res = {};
		if ( this.dataSettings?.botTextVar ) {
			res[`V_BotText${this.pref}`] = this.botTextVar;
		}
		if ( this.dataSettings?.userTextVar ) {
			res[`V_UserText${this.pref}`] = this.userTextVar;
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
			userTextVar: this.userTextVar,
			botTextVar: this.botTextVar,
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

			// Variablen setzen, Events schicken
			let userNew = false, botNew = false;
			if ( state.botTextVar !== this.botTextVar ) {
				this.botTextVar = state.botTextVar;
				botNew = true;
			}
			if ( state.userTextVar !== this.userTextVar ) {
				this.userTextVar = state.userTextVar;
				userNew = true;
			}
			if ( botNew || userNew ) {
				this.base.sendChangeState( this );
				if ( botNew ) this.base.fsm.triggerEvent('EV_BOT_TEXT');
				if ( userNew ) this.base.fsm.triggerEvent('EV_USER_TEXT');
			}

		} catch (e) {
			console.error('setState() error:', e);
		}

		setStatePostProc(this);
	}

}
