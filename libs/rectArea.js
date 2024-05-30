import { mergeDeep } from './common'

import { addFreePaintTo } from './class_extensions'

import Konva from 'konva/lib/Core'
import { Rect } from 'konva/lib/shapes/Rect'

export class rectArea {

	constructor ( base, opts = {} ) {

		['x','y','width','height'].forEach( o => {
			if ( !( o in opts ) ) {
				throw( `area: parameter '${o}' not specified!` );
			}
		})
		if ( base.fsm && base.fsm.incInitCnt ) {
			base.fsm.incInitCnt();
		}

		// Defaults to opts
		const defaultOpts = {

			// // paintArea
			// x, y
			// width, height
			frameWidth: 1,
			frameColor: 'black',

		}
		mergeDeep( Object.assign( this, defaultOpts ), opts );
		this.base = base;
		const stage = base.stage;
		this.stage = stage;

		// Init paintArea
		if ( this.frameColor && this.frameWidth ) {
			this.layer = new Konva.Layer();
			stage.add( this.layer );

			const rectOpts = {
				x: this.x, y: this.y,
				width: this.width, height: this.height,
				stroke: this.frameColor,
				strokeWidth: this.frameWidth,
				fill: this.fill,
			}
			this.kRect = new Konva.Rect( rectOpts );
			this.layer.add( this.kRect );

			this.layer.draw();
		}

		if ( base.fsm && base.fsm.decInitCnt ) {
			base.fsm.decInitCnt();
		}
	}

	///////////////////////////////////

	// clip to rectangle by default
	freePaintMarkerClipFunc (ctx) {
		ctx.rect( this.x+this.frameWidth*0.5, this.y+this.frameWidth*0.5, this.width-this.frameWidth, this.height-this.frameWidth );
	}

	// clip to rectangle by default
	freePaintBrushClipFunc (ctx) {
		ctx.rect( this.x+this.frameWidth*0.5, this.y+this.frameWidth*0.5, this.width-this.frameWidth, this.height-this.frameWidth );
	}

	///////////////////////////////////

	getState () {
		return '{}';
	}

	setState () {
	}

	// Check if User made changes
	getDefaultChangeState () {
		return false;
	}

	getChState () {
		return {};
	}

}

//////////////////////////////////////////////////////////////////////////////

export const rectArea_freePaint = addFreePaintTo( rectArea, 1, 0 );

export const rectArea_freePaintMarker = addFreePaintTo( rectArea, 1, 1 );
