import { stampImages } from "../../libs/stampImages";

import child from '../../libs/img/child.png'
import dot from '../../libs/img/dot.png'

export class stampImagesFromSchema extends stampImages {

	constructor ( base, opts = {} ) {

		if ( opts.width<0 ) {
			opts.width += window.innerWidth;
		}
		if ( opts.height<0 ) {
			let height;
/// #if ! __EDITOR
			height = window.innerHeight;
/// #else
			height = document.getElementById('EWK').offsetHeight;
/// #endif
			opts.height += height;
		}
		if ( opts.iconBarX<0 ) {
			opts.iconBarX += opts.x + opts.width;
		}
		if ( !opts.stamps ) {
			opts.stamps = [ child, dot ];
		}

		super( base, opts );
	}

}
