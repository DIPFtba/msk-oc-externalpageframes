import { rectArea_freePaintMarker } from "../../libs/rectArea";

import Konva from 'konva/lib/Core'
import { Line } from 'konva/lib/shapes/Line'

export class freePaintFromSchema extends rectArea_freePaintMarker {

	constructor ( base, opts = {} ) {

		if ( base.fsm && base.fsm.incInitCnt ) {
			base.fsm.incInitCnt();
		}

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

		// extra Rects and Lines
		if ( opts.extraRects.length>0 || opts.extraLines.length>0 ) {

			let fgLayer;
			// Frame or Rect Fill im Hintergrund?
			if ( opts.frameWidth || opts.doFill || opts.extraRects.some( r => r.fl==1 ) ) {
				// neuer Layer für Vordergrund
				fgLayer = new Konva.Layer();
				this.stage.add( fgLayer );
			} else {
				// Bisherigen layer (leer) für Vordergrund nutzen
				fgLayer = this.layer;
				fgLayer.moveToTop();
			}

			// draw extra rects
			opts.extraRects.forEach( r => {
				const kOpts = {
					x: r.x, y: r.y,
					width: r.width, height: r.height,
				};
				if ( r.fl==1 ) {
					const kRect = new Konva.Rect({
						...kOpts,
						fill: r.f,
					})
					this.layer.add( kRect );
				}
				if ( r.fl==2 || r.w>0 ) {
					const kRect = new Konva.Rect({
						...kOpts,
						stroke: r.c,
						strokeWidth: r.w,
						fill: r.fl==2 ? r.f : null,
					})
					fgLayer.add( kRect );
				}
			})

			// draw extra lines
			opts.extraLines.forEach( l => {
				const kLine = new Konva.Line({
					points: [ l.x1, l.y1, l.x2, l.y2 ],
					stroke: l.c,
					strokeWidth: l.w,
				})
				fgLayer.add( kLine );
			})

			this.stage.draw();
		}

		this.startGetImageListener();
/// #if __DEVELOP
		window.getRectPngImage = this.getRectPngImage.bind(this);
/// #endif

		if ( base.fsm && base.fsm.decInitCnt ) {
			base.fsm.decInitCnt();
		}
	}

	getRectPngImage () {
		const url = this.stage.toDataURL({
			mimeType: "image/png",
			x: Math.max( 0, this.x - Math.ceil( this.frameWidth/2 ) ),
			y: Math.max( 0, this.y - Math.ceil( this.frameWidth/2 ) ),
			width: this.width + 2*Math.ceil( this.frameWidth/2 ),
			height: this.height + 2*Math.ceil( this.frameWidth/2 ),
		});
// console.log(url);
		return url;
	}

	startGetImageListener () {

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
