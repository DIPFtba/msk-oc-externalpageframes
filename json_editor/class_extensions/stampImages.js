import { stampImages } from "../../libs/stampImages";

import child from '../../libs/img/child.png'
import dot from '../../libs/img/dot.png'

export class stampImagesFromSchema extends stampImages {

	constructor ( base, opts = {} ) {

		if ( opts.width<0 ) {
			opts.width += base.width;
		}
		if ( opts.height<0 ) {
			opts.height += base.height;
		}
		if ( opts.iconBarX<0 ) {
			opts.iconBarX += opts.x + opts.width;
		}
		if ( opts.iconBarY<0 ) {
			opts.iconBarY += opts.y + opts.height;
		}
		if ( !opts.stamps ) {
			opts.stamps = [ child, dot ];
		}

		super( base, opts );
	}

}
