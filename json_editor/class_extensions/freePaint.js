import { rectArea_freePaintMarker } from "../../libs/rectArea";

import Konva from 'konva/lib/Core'
import { Line } from 'konva/lib/shapes/Line'

export class freePaintFromSchema extends rectArea_freePaintMarker {

	constructor ( base, opts = {} ) {

		super( base, opts );

		// draw extra lines
		opts.extraLines.forEach( l => {
			const kLine = new Konva.Line({
				points: [ l.x1, l.y1, l.x2, l.y2 ],
				stroke: l.c,
				strokeWidth: l.w,
			})
			this.layer.add( kLine );
		})
		this.layer.draw();

		this.startListeningToGetImageRequests();
/// #if __DEVELOP
		window.getRectPngImage = this.getRectPngImage.bind(this);
/// #endif
	}

	getRectPngImage () {
		const url = this.stage.toDataURL({
			mimeType: "image/png",
			x: Math.max( 0, this.x - Math.ceil( this.frameWidth/2 ) ),
			y: Math.max( 0, this.y - Math.ceil( this.frameWidth/2 ) ),
			width: this.width + 2*Math.ceil( this.frameWidth/2 ),
			height: this.height + 2*Math.ceil( this.frameWidth/2 ),
		});
		return url;
// console.log(url);
	}

	startListeningToGetImageRequests () {

		// listener for providing image as BASE64 URL
		window.addEventListener(
			"message",
			(event) => {

				try {
					const { callId } = JSON.parse(event.data);
					if ( callId !== undefined && callId.includes("getImage") ) {
						const image = this.getRectPngImage();
						const pass_data = {
							image,
							callId
						};

						window.parent.postMessage( JSON.stringify( pass_data ), '*' );
					}
				} catch (e) {}
			},
			false );
	}

}
