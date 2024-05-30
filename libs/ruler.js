import Konva from "konva";
import { Rect } from 'konva/lib/shapes/Rect'
import { Line } from 'konva/lib/shapes/Line'
import { Text } from 'konva/lib/shapes/Text'

import { getPosOfEvent, getXofEvent, getYofEvent, mergeDeep, ignoreEvent } from "./common";

// !!!!!
// !!!!! WORK IN PROGRESS!
// !!!!! User interface and behavior of the applet are not yet finally clarified
// !!!!!
// !!!!! LOGGING, GET/SETSTATE AND GETCHSTATE() ARE MISSING
// !!!!!

export class ruler {

	constructor ( base, opts = {} ) {

		if ( base.fsm && base.fsm.incInitCnt ) {
			base.fsm.incInitCnt();
		}

		// Defaults to opts
		const defaultOpts = {

			x: 0,
			y: 0,

			width: 400,
			height: 50,

			rotation: 0,

			maxVal: 10,		// highest value on ruler
			offs: 0.5,		// offs of value '0' (in ruler untis)

			rulerLineOpts: {
				stroke: 'black',
				strokeWidth: 1,
			},

			rectOpts: {
				cornerRadius: 4,
				fill: 'white',
				opacity: 0.6,
			},

			minTickLen: 5,
			medTickLen: 10,
			majTickLen: 15,

			textOps: {
				fontSize: 10,
				align: 'center',
			},

			rotatePointOpts: {
				fill: '#d0d000',
				radius: 7,
				xOffs: 0.5,
				yOffs: 25,
			},

			extraLines: [
				// { x, y, len, rotDeg },
				// { x, y, len, rotDeg },
			],
			extraLinesOpts: {
				stroke: 'black',
				strokeWidth: 2,
			},

			rulerLayer: null,	// layer (created if null)
		}
		mergeDeep( Object.assign( this, defaultOpts ), opts );
		this.base = base;
		const stage = base.stage;
		this.stage = stage;

		if ( !this.rulerLayer ) {
			this.rulerLayer = new Konva.Layer();
			stage.add( this.rulerLayer );
		}
		this.rulerLayer.moveToTop();

		// extra Lines
		const vx = this.width/(this.maxVal+2*this.offs);
		this.extraLines.forEach( l => {
			this.rulerLayer.add( new Konva.Line({
				offsetX: l.x,
				x: l.x,
				offsetY: l.y,
				y: l.y,
				points: [ l.x, l.y, l.x+l.len*vx, l.y ],
				rotation: l.rotDeg,
				...this.extraLinesOpts,
			}))
		});

		// draw ruler
		this.kGroup = new Konva.Group();
		this.rulerLayer.add( this.kGroup );

		const val2x = (val) => this.x+(val+this.offs)*11*lineSpace;
		const kRect = new Konva.Rect({
			x: this.x,
			y: this.y,
			width: this.width,
			height: this.height,
			...this.rulerLineOpts,
			...this.rectOpts,
		});
		this.kGroup.add( kRect );
		const lineSpace = this.width/(this.maxVal+2*this.offs)/10;
		let x = val2x(0);
		for ( let v=0; v<=this.maxVal*10; v++ ) {
			const yl = ( !(v%10) ? this.majTickLen : !(v%5) ? this.medTickLen : this.minTickLen );
			this.kGroup.add( new Konva.Line({
				points: [ x, this.y, x, this.y+yl ],
				...this.rulerLineOpts,
			}) );
			if ( !(v%10) ) {
				this.kGroup.add( new Konva.Text({
					x: x-lineSpace*3,
					y: this.y+yl+3,
					width: lineSpace*6,
					text: v/10,
					...this.textOps,
				}))
			}
			x += lineSpace;
		}

		// transform
		const transX = this.x+this.width/2;
		const transY = this.y+this.height/2;
		if ( !this.readonly ) {
			const kTransRect = new Konva.Rect({
				x: this.x,
				y: this.y,
				width: this.width,
				height: this.height,
			});
			this.kGroup.add( kTransRect );
			kTransRect.on( 'mouseenter', () => document.body.style.cursor = 'move' );
			kTransRect.on( 'mouseleave', (ev) => {
				if ( ignoreEvent( this.stage, ev ) ) {
					return;
				}
				document.body.style.cursor = 'auto';
			});
			kTransRect.on( 'mousedown touchstart', (ev) => {
				if ( !this.stickyTransform ) {
					this.mouseXOffs = this.kGroup.x() - getXofEvent( stage, ev );
					this.mouseYOffs = this.kGroup.y() - getYofEvent( stage, ev );
					this.stickyTransform=1;
				}
		 	});
		}
		this.kGroup.offsetX( transX );
		this.kGroup.x( transX );
		this.kGroup.offsetY( transY );
		this.kGroup.y( transY );
		this.kGroup.rotation( this.rotation );

		// rotation point
		const rotateX = val2x( 'xOffs' in this.rotatePointOpts ? this.rotatePointOpts.xOffs : 0 );
		const rotateY = this.y+( 'yOffs' in this.rotatePointOpts ? this.rotatePointOpts.yOffs : this.height/2 );
		this.kRotatePoint = new Konva.Circle({
			x: rotateX,
			y: rotateY,
			...this.rotatePointOpts,
		})
		this.kGroup.add( this.kRotatePoint );
		if ( !this.readonly ) {
			this.kRotatePoint.on( 'mouseenter', () => document.body.style.cursor = 'pointer' );
			this.kRotatePoint.on( 'mouseleave', (ev) => {
				if ( ignoreEvent( this.stage, ev ) ) {
					return;
				}
				document.body.style.cursor = 'auto';
			});
			this.kRotatePoint.on( 'mousedown touchstart', (ev) => {
				if ( !this.stickyRotate ) {
					this.mouseXOffs = this.kGroup.x();
					this.mouseYOffs = this.kGroup.y();
					this.lastMousePos = getPosOfEvent( stage, ev );
					this.stickyRotate=1;
				}
		 	});
		}

		// mouse moves
		if ( !this.readonly ) {
			stage.on( 'mousemove touchmove', (ev) => {
				if ( this.stickyTransform ) {
					const px = Math.min( stage.width()-20, Math.max( 20, getXofEvent( stage, ev ) ) );
					this.kGroup.x( this.mouseXOffs + px );
					const py = Math.min( stage.height()-20, Math.max( 20, getYofEvent( stage, ev ) ) );
					this.kGroup.y( this.mouseYOffs + py );
				} else if ( this.stickyRotate ) {
					const dx = getXofEvent( stage, ev ) - this.mouseXOffs;
					const dy = getYofEvent( stage, ev ) - this.mouseYOffs;
					const rad = Math.atan( dy / dx );
					const deg = rad * ( 180 / Math.PI );
					this.kGroup.rotation( dx>0 ? 180+deg : deg );
				}
			})
			stage.on( 'mouseleave mouseup touchend', (ev) => {
				if ( ignoreEvent( this.stage, ev ) ) {
					return;
				}
				if ( this.stickyTransform ) {
					this.stickyTransform=0;
				}
				if ( this.stickyRotate ) {
					this.stickyRotate=0;
				}
			})
		}

		this.rulerLayer.draw();

		if ( base.fsm && base.fsm.decInitCnt ) {
			base.fsm.decInitCnt();
		}
	}

	///////////////////////////////////

	getState () {
		return '{}';
	}

	setState (state) {
	}

}