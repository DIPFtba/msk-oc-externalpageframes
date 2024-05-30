import { numberLine } from '../../libs/numberLine'

import Konva from 'konva/lib/Core'

export class numberLineFromSchema extends numberLine {

	constructor ( base, opts = {} ) {

		if ( base.fsm && base.fsm.incInitCnt ) {
			base.fsm.incInitCnt();
		}

		const layer = new Konva.Layer();
		base.stage.add( layer );
		super( layer, opts );
		base.stage.draw();


		if ( base.fsm && base.fsm.decInitCnt ) {
			base.fsm.decInitCnt();
		}
	}

}