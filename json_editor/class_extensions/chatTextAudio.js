import { object_equals, mergeDeep } from '../../libs/common.js'
import { addScoring } from "../common.js";
import { initializeAndMount } from '../external_bundled/chat-text-audio.js';

export class chatTextAudioFromSchema {

	constructor(base, cfgData, addMods ) {

		if ( base.fsm && base.fsm.incInitCnt ) {
			base.fsm.incInitCnt();
		}

		const defaultOpts = {
			readonly: false,
			dataSettings: {},
		}

		mergeDeep( Object.assign( this, defaultOpts ), cfgData );
		this.base = base;

		this.vueApp = initializeAndMount( this.base.container, cfgData, (a) => {
			// Das hier passiert, wenn state in Vue App geändert wird
			base.sendChangeState( this );
		});

		// // Für debug Zwecke, um von außen den Text setzen zu können
		// window.setText = (t) => this.vueApp.state.textValue = t;

		this.initData = this.getChState();
		this.base.sendChangeState( this );	// init & send changeState & score

		addScoring( this, cfgData, addMods.Parser );

		if ( base.fsm && base.fsm.decInitCnt ) {
			base.fsm.decInitCnt();
		}
	}

	getChState() {
		return this.vueApp?.state?.chatList?.length;
	}

	// Check if User made changes
	getDefaultChangeState () {
		return !object_equals( this.getChState(), this.initData );
	}

	scoreDefType () {
		return 'String';
	}

	scoreDef() {
		return {};
	// 	const res = {};
	// 	if ( this.readonly || !this.vueApp?.state) {
	// 		return res;
	// 	}

	// 	if ( this.dataSettings ) {
	// 		const pref = this.dataSettings.variablePrefix;
	// 		if ( pref ) {
	// 			res[`V_Input_${pref}_Val`] = this.vueApp.state.textValue;
	// 		}
	// 	}

	// 	if ( this.computeScoringVals ) {
	// 		this.computeScoringVals( res );
	// 	}
	// 	return res;
	}

}
