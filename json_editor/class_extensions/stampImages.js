import { stampImages } from "../../libs/stampImages";

import child from '../../libs/img/child.png'
import dot from '../../libs/img/dot.png'

export class stampImagesFromSchema extends stampImages {

	constructor ( base, opts = {} ) {

		if ( base.fsm && base.fsm.incInitCnt ) {
			base.fsm.incInitCnt();
		}

		if ( opts.width<0 ) {
			opts.width += base.width - opts.x;
		}
		if ( opts.height<0 ) {
			opts.height += base.height - opts.y;
		}
		if ( opts.iconBarX<0 ) {
			opts.iconBarX += base.width;
		}
		if ( opts.iconBarY<0 ) {
			opts.iconBarY += base.height;
		}
		if ( !opts.stamps ) {
			opts.stamps = [ child, dot ];
		}

		super( base, opts );

		if ( base.fsm && base.fsm.decInitCnt ) {
			base.fsm.decInitCnt();
		}
	}

}
