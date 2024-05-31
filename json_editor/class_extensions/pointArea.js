import { pointArea } from "../../libs/pointArea";

import { addScoring } from "../common";

export class pointAreaFromSchema extends pointArea {

	constructor ( base, opts = {}, addMods={}  ) {

		if ( base.fsm && base.fsm.incInitCnt ) {
			base.fsm.incInitCnt();
		}

		opts.colors.unshift( opts.dotColor );

		super( base, opts );

		addScoring( this, opts, addMods.Parser );

		if ( base.fsm && base.fsm.decInitCnt ) {
			base.fsm.decInitCnt();
		}
	}


	scoreDef () {
		let res = {};
		const pref = this.dataSettings.variablePrefix;

		if ( pref ) {
			const entries = [];
			for ( let h=1; h<this.colors.length; h++ ) {
				entries.push( [ `V_Input_${pref}_Color_${h}`, this.reportedColorSums[h] ] );
			}
			res = Object.fromEntries( entries );
		}

		if ( this.computeScoringVals ) {
			this.computeScoringVals( res );
		}
		return res;
	}
}
