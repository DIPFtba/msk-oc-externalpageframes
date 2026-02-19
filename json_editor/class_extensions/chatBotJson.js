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

		// !!!!!
		// !!!!!
		// !!!!! get/setState testen!
		// !!!!!
		// !!!!!

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
			base.fsm.postMessageWithPathsAndTraceCount.bind( base.fsm ) );

		// console.log(this.vueApp,this.vueApp.state);

		// // Für debug Zwecke, um von außen den Text setzen zu können
		// window.setText = (t) => this.vueApp.state.textValue = t;

		this.initData = this.getChState();
		this.base.sendChangeState( this );	// init & send changeState & score

		// addScoring( this, cfgData, addMods.Parser );

		base.decInitCnt();
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
		return 'number';
	}

	scoreDef() {
		const res = {};
		return res;
	}

	///////////////////////////////////

	getState () {
		const state = this.vueApp?.state?.chat;
		return JSON.stringify({
			curr: state?.curr.filter( entry => !entry.isPrechat ),
			currLabel: state?.currLabel,
			prev: state?.prev,
		});
	}

	setState ( state ) {
		try {
			this.vueApp.state.loadChat( JSON.parse( state ) );
		} catch (e) {
			console.error(e);
		}

		setStatePostProc(this);
	}

}
