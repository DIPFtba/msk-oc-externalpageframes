import { rectArrayMarkable } from "../../libs/rectArrayMarkable";
import { readRangeArray, addScoring } from "../common";

export class rectArrayMarkableFromSchema extends rectArrayMarkable {

	constructor ( base, opts = {}, addMods={}  ) {

		base.incInitCnt();

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

		addScoring( this, opts, addMods.Parser );

		base.decInitCnt();
	}

	scoreDef ( exportAll=false ) {
		if ( this.readonly ) {
			return {};
		}

		const res = super.scoreDef(exportAll);

		if ( this.computeScoringVals ) {
			this.computeScoringVals( res , exportAll );
		}
		return res;
	}
}
