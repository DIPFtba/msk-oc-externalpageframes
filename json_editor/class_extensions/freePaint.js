import { rectArea_freePaintMarker } from "../../libs/rectArea";

import Konva from 'konva/lib/Core'
import { Line } from 'konva/lib/shapes/Line'

export class freePaintFromSchema extends rectArea_freePaintMarker {

	constructor ( base, opts = {} ) {

		// define clip Functions (if selected)
		const clipBrush = opts.extraRects.filter( r => r.clipBrush );
		if ( clipBrush.length>0 ) {
			opts.freePaintBrushClipFunc = function ( ctx ) {
				clipBrush.forEach( r => {
					ctx.rect( r.x+r.w/2, r.y+r.w/2, r.width-r.w, r.height-r.w );
				})
			}
		}
		const clipMarker = opts.extraRects.filter( r => r.clipMarker );
		if ( clipMarker.length>0 ) {
			opts.freePaintMarkerClipFunc = function ( ctx ) {
				clipMarker.forEach( r => {
					ctx.rect( r.x+r.w/2, r.y+r.w/2, r.width-r.w, r.height-r.w );
				})
			}
		}

		super( base, opts );

		// draw extra rects
		opts.extraRects.forEach( r => {
			const kLine = new Konva.Rect({
				x: r.x, y: r.y,
				width: r.width, height: r.height,
				stroke: r.c,
				strokeWidth: r.w,
				fill: r.f,
			})
			this.layer.add( kLine );
		})

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
