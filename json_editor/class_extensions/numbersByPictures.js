import { numbersByPictures } from '../../libs/numbersByPictures'
import { addScoring } from '../common';

export class numbersByPicturesFromSchema extends numbersByPictures {

	constructor ( base, opts={}, addMods={}  ) {

		if ( base.fsm && base.fsm.incInitCnt ) {
			base.fsm.incInitCnt();
		}

		opts.pics = {
			width: opts.picsWidth || 60,
		}

		const iconWidth = 22;
		const depth = opts.pics.width*18/50; // bisher wurde fälschlicherweise 18 verwendet, wird ja aber nur zum zentireren hier verwendet

		// iconbar default data
		if ( !opts.readonly ) {
			opts.iconBar = {
				x: opts.x,
				y: opts.y,
				width: iconWidth,
				height: iconWidth,
				frameFill: '#e5e5e5',
			}
		}

		// x is start of pics
		opts.x += iconWidth + 14;
		opts.y += Math.max( 0, 4*iconWidth + 3*2 - ( opts.pics.width + depth ) ) / 2 + depth;
		if ( opts.width<= 0 ) {
			opts.width += base.width - opts.x;
		}

		super( base, opts );

		addScoring( this, opts, addMods.Parser );

		if ( base.fsm && base.fsm.decInitCnt ) {
			base.fsm.decInitCnt();
		}
	}

	scoreDef () {
		if ( this.readonly ) {
			return {};
		}

		const pref = this.dataSettings.variablePrefix;
		const res = {
			[`V_Input_${pref}_T`]: this.data.reduce( (acc, cur) => acc += cur.c || 0, 0 ),
			[`V_Input_${pref}_H`]: this.data.reduce( (acc, cur) => acc += cur.r || 0, 0 ),
			[`V_Input_${pref}_Z`]: this.data.reduce( (acc, cur) => acc += cur.b || 0, 0 ),
			[`V_Input_${pref}_E`]: this.data.reduce( (acc, cur) => acc += cur.d || 0, 0 ),
		};

		if ( this.computeScoringVals ) {
			this.computeScoringVals( res );
		}
		return res;
	}

}
