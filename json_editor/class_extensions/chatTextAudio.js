import { object_equals, mergeDeep } from '../../libs/common.js'
import { addScoring } from "../common.js";
import { initializeAndMount } from '../external_bundled/chat-text-audio.js';

import '../external_bundled/chat-text-audio.css';
export class chatTextAudioFromSchema {

	constructor(divSelector, cfgData = {}, base = null ) {

		base.regSendInitDone();
		base.incInitCnt();

		const defaultOpts = {
			readonly: false,
			dataSettings: {},
		}

		// !!!!!
		// !!!!!
		// !!!!!
		// !!!!! get/setState fehlen noch
		// !!!!!
		// !!!!!
		// !!!!!

		mergeDeep( Object.assign( this, defaultOpts ), cfgData );
		this.base = base;

		this.vueApp = initializeAndMount( divSelector, cfgData, (a) => {
			// Das hier passiert, wenn state in Vue App geändert wird
			base.sendChangeState( this );
		});
		// console.log(this.vueApp,this.vueApp.state);

		// // Für debug Zwecke, um von außen den Text setzen zu können
		// window.setText = (t) => this.vueApp.state.textValue = t;

		this.initData = this.getChState();
		this.base.sendChangeState( this );	// init & send changeState & score

		// addScoring( this, cfgData, addMods.Parser );

		base.decInitCnt();
	}

	getChState() {
		return this.vueApp?.state?.chatList?.length;
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
		if ( !this.vueApp || !this.vueApp.state ) {
			return res;
		}

		const pref = this.dataSettings?.variablePrefix;
		if ( pref && this.dataSettings?.createInpCnt ) {
			res[`V_Input_Cnt_Text`] = this.vueApp.state.chatList.reduce( (acc, cur) => acc + (cur.status==='active' && cur.type === 'text' ? 1 : 0), 0 );
			res[`V_Input_Cnt_Audio`] = this.vueApp.state.chatList.reduce( (acc, cur) => acc + (cur.status==='active' && cur.type === 'audio' ? 1 : 0), 0 );
			res[`V_Input_Cnt_Deleted`] = this.vueApp.state.chatList.reduce( (acc, cur) => acc + (cur.status==='deleted' ? 1 : 0), 0 );
		}

	// 	if ( this.computeScoringVals ) {
	// 		this.computeScoringVals( res );
	// 	}
		return res;
	}

}
