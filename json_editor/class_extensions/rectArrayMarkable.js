import { rectArrayMarkable } from "../../libs/rectArrayMarkable";
import { readRangeArray, addScoringValsParser } from "../common";

export class rectArrayMarkableFromSchema extends rectArrayMarkable {

	constructor ( base, opts = {} ) {

		const d = opts.rectArray;
		if ( d ) {
			if ( typeof d.marked === 'string' ) {
				d.marked = readRangeArray( d.marked );
			}
			if ( typeof d.fixed === 'string' ) {
				d.fixed = readRangeArray( d.fixed );
			}
		}

		super( base, opts );

		addScoringValsParser(this);
		this.parseScoringVals(opts);
	}

	scoreDef () {
		if ( this.readonly ) {
			return {};
		}

		const res = super.scoreDef();

		if ( this.computeScoringVals ) {
			this.computeScoringVals( res );
		}
		return res;
	}
}
