import { barSlider } from "../../libs/barSlider";
import { addScoringValsParser } from "../common";

export class barSliderFromSchema extends barSlider {

	constructor ( base, opts = {}, addMods={}  ) {

		if ( opts.width<= 0 ) {
			opts.width += base.width - opts.x;
		}

		super( base, opts );

		addScoringValsParser( this, addMods.Parser );
		this.parseScoringVals(opts);
	}

	scoreDef () {
		const res = {};
		if ( this.readonly ) {
			return res;
		}

		if ( this.dataSettings ) {
			const pref = this.dataSettings.variablePrefix;
			if ( pref ) {
				res[`V_Input_${pref}_Val`] = Math.round( this.pos * this.dataSettings.xMult );
			}
		}

		if ( this.computeScoringVals ) {
			this.computeScoringVals( res );
		}
		return res;
	}
}
