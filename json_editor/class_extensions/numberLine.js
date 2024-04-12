import { numberLine } from '../../libs/numberLine'

import Konva from 'konva/lib/Core'

export class numberLineFromSchema extends numberLine {

	constructor ( base, opts = {} ) {

		const layer = new Konva.Layer();
		base.stage.add( layer );
		super( layer, opts );
		base.stage.draw();

	}

}