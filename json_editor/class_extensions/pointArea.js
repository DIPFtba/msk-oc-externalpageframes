import { pointArea } from "../../libs/pointArea";

import { addScoringValsParser } from "../common";

export class pointAreaFromSchema extends pointArea {

	constructor ( base, opts = {}, addMods={}  ) {

		opts.colors.unshift( opts.dotColor );

		super( base, opts );

		addScoringValsParser( this, addMods.Parser );
		this.parseScoringVals(opts);
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
