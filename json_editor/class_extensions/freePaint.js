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

		window.getPngImage = this.getPngImage.bind(this);
	}

	getPngImage () {
		const url = this.stage.toDataURL({
			mimeType: "image/png",
			x: this.x + 0.5*this.frameWidth,
			y: this.y + 0.5*this.frameWidth,
			width: this.width - 2*this.frameWidth,
			height: this.height - 2*this.frameWidth,
		});
		console.log(url);
	}

	startListeningToGetImageRequests () {

		// listener for providing image as BASE64 URL
		window.addEventListener(
			"message",
			(event) => {

				try {
					const { callId } = JSON.parse(event.data);
					if ( callId !== undefined && callId.includes("getImage") ) {
						const image = this.getPngImage;
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
