import { filledBar } from "../../libs/filledBar";
import { addScoringValsParser } from "../common";

export class filledBarFromSchema extends filledBar {

	constructor ( base, opts = {}, addMods={}  ) {

		if ( opts.stickyTo === 'no' ) {
			opts.stickyTo = null;
		} else {
			const n = Number( opts.stickyTo );
			if ( !isNaN(n) ) {
				opts.stickyTo = n;
			}
		}

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
				res[`V_${pref}_MarkVal`] = this.markedValue;
			}
		}

		if ( this.computeScoringVals ) {
			this.computeScoringVals( res );
		}
		return res;
	}
}
