import { barSlider } from "../../libs/barSlider";
import { addScoringValsParser } from "../common";

export class barSliderFromSchema extends barSlider {

	constructor ( base, opts = {} ) {

		if ( opts.width<= 0 ) {
			opts.width += base.width;
		}

		super( base, opts );

		addScoringValsParser(this);
		this.parseScoringVals(opts);
	}

	scoreDef () {
		const res = {};

		if ( this.dataSettings ) {
			const pref = this.dataSettings.variablePrefix;
			if ( pref ) {
				res[`V_${pref}_Value`] = Math.round( this.pos * this.dataSettings.xMult );
			}
		}

		if ( this.computeScoringVals ) {
			this.computeScoringVals( res );
		}
		return res;
	}
}
