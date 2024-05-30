import { delDefaults, object_equals, getXofEvent, setStatePostProc, ignoreEvent } from './common'

import { textFrame } from './textFrame'
import { numberLine } from './numberLine'

import Konva from 'konva/lib/Core'
import { Line } from 'konva/lib/shapes/Line'

export class numberLineWithAnnotations {

	constructor ( base, opts = {} ) {

		if ( base.fsm && base.fsm.incInitCnt ) {
			base.fsm.incInitCnt();
		}

		// Options
		const defaults = {
			// numberLine = {}, see numberLine
			// annotations = [ {}, ... ], see this.setAnnotations
			highlightColor: 'tomato',
			logObjectId: 1,
		}
		Object.assign( this, defaults, opts );
		this.base = base;
		const stage = base.stage;
		this.stage = stage;

		// NumberLine
		this.base_layer = new Konva.Layer();
		stage.add( this.base_layer );
		this.numberLine = new numberLine( this.base_layer, opts.numberLine );

		// Create Annotations
		if ( Array.isArray(opts.annotations) ) {
			this.setAnnotations(opts.annotations)
		}

		this.initData = this.getChState();
		this.base.sendChangeState( this );	// init & send changeState & score

		// mouse cursor stickiness
		stage.on( 'mousemove touchmove', function (ev) {
			if ( this.sticky_ao ) {
				// unassigned line
				const mpos = stage.getPointerPosition();
				let points = this.sticky_ao.kLine.points();
				points[2] = mpos.x;
				points[3] = mpos.y;
				this.sticky_ao.kLine.points( points );
				this.line_layer.batchDraw();
			}
			if ( this.repos_ao ) {
				// reposition of toValue
				this.set_ao_annoline( this.repos_ao, this.highlightColor, ev );
			}
		}.bind(this))
		// Mouse over numberLine?
		this.numberLine.kHitLine.on( "mouseenter touchmove", function(ev) {
			if ( this.sticky_ao  ) {
				// change unconnected line to connected line
				const ao = this.sticky_ao;
				let points = ao.kLine.points();
				points[2] = ao.frame.x+ao.frame.width/2
				points[3] = ao.frame.y-ao.conLineVertPiece;
				ao.kLine.bezier( true );

				this.base.postLog( 'connLineCreated', {
					id: ao.logObjectId,
					toValue: this.numberLine.x2val( getXofEvent( stage, ev ) ),
				});

				// now repos!
				this.repos_ao = this.sticky_ao;
				this.sticky_ao = null;
				this.set_ao_annoline( this.repos_ao, this.highlightColor, ev );
				document.body.style.cursor = "ew-resize";
			}
		}.bind(this))

		// end stickiness?
		stage.on( 'mouseup mouseleave touchend', function (ev) {
			if ( ignoreEvent( this.stage, ev ) ) {
				return;
			}
			if ( this.sticky_ao ) {
				// unassigned line
				this.set_ao_line( this.sticky_ao, this.sticky_ao.conLineColor, true );
				this.sticky_ao.frame.kFrame.stroke( 'black' );
				this.annot_layer.batchDraw();
				this.sticky_ao = null;
			}
			if ( this.repos_ao ) {
				// reposition of toValue
				const tmp = this.repos_ao;
				this.repos_ao = null;

				this.set_ao_annoline( tmp, tmp.conLineColor, ev );

				this.base.postLog( 'connLineMoved', {
					id: tmp.logObjectId,
					toValue: tmp.toValue
				});

				tmp.frame.kFrame.stroke( 'black' );
				this.annot_layer.batchDraw();
				document.body.style.cursor = "default";

				this.base.sendChangeState( this );
			}
		}.bind(this))

		if ( base.fsm && base.fsm.decInitCnt ) {
			base.fsm.decInitCnt();
		}
	}

	///////////////////////////////////

	delAllAnnotations () {

		this.sticky_ao = null;	// which ao is sticky to cursor
		this.repos_ao = null;	// which ao's toValue is repositioned?
		this.annotations = [];

		if ( this.annot_layer ) {
			this.annot_layer.destroy();
		}
		this.annot_layer = new Konva.Layer();
		this.stage.add( this.annot_layer );

		if ( this.line_layer ) {
			this.line_layer.destroy();
		}
		this.line_layer = new Konva.Layer();
		this.stage.add( this.line_layer );
	}

	///////////////////////////////////

	setAnnotations ( annotations = [] ) {

		this.defaultAnnotation = Object.assign({
			// x, y,
			// xval 	// overwrites x, if given
			width: 60, height: 25,
			text: '', textReadonly: 0,
			toValue: null, toValueReadonly: 0,
			strokeWidth: 2,
			annotationTickHeightTop: 10,
			annotationTickHeightBottom: 25,
			conLineColorReadonly: 'black',
			conLineColorEditable: 'blue',
			conLineVertPiece: 20,
			inputRegexp: null,
		}, this.defaultAnnotation || {} );

		this.delAllAnnotations();

		annotations.forEach( a => {

			let ao = Object.assign( {}, this.defaultAnnotation, a );
			if ( !( 'y' in ao ) ) ao.y = this.numberLine.y + 50;
			if ( ao.xval ) ao.x = this.numberLine.val2x( ao.xval )-ao.width/2;
			if ( !( 'x' in ao ) && 'toValue' in ao ) ao.x = this.numberLine.val2x( ao.toValue )-ao.width/2;
			ao.conLineColor = ( ao.toValueReadonly || ao.readonly || this.readonly ) ? ao.conLineColorReadonly : ao.conLineColorEditable;
			if ( !( 'logObjectId' in ao ) ) {
				ao.logObjectId = this.logObjectId++;
			}

			// Frame
			ao.frame = new textFrame( this.base, this.annot_layer, {
					x: ao.x, y: ao.y,
					width: ao.width, height: ao.height,
					value: ao.text,
					cornerRadius: 4,
					inputRegexp: ao.inputRegexp,
					readonly: ao.textReadonly || ao.readonly || this.readonly,

					onChange: () => {
						ao.text = ao.frame.value;	// for get/set State()
						this.base.postLog( 'labelChanged', {
							id: ao.logObjectId,
							labelNew: ao.frame.value,
							toValue: ao.toValue
						});
						this.base.sendChangeState( this );
					},
					logObjectId: !( ao.textReadonly || ao.readonly || this.readonly ) ? ao.logObjectId : null,
					logRef: () => ({ toValue: ao.toValue }),
					base: this.base,
			});

			// line
			let apoints = [ ao.frame.x+ao.frame.width/2, ao.frame.y ];
			if ( ao.toValue!==null ) {
				apoints.push( ao.frame.x+ao.frame.width/2 );		apoints.push( ao.frame.y-ao.conLineVertPiece );
				apoints.push( this.numberLine.val2x(ao.toValue) );	apoints.push( this.numberLine.y + ao.annotationTickHeightBottom + ao.conLineVertPiece );
				apoints.push( this.numberLine.val2x(ao.toValue) );	apoints.push( this.numberLine.y + ao.annotationTickHeightBottom );
			}
			ao.kLine = new Konva.Line({
				points: apoints,
				stroke: ao.conLineColor,
				strokeWidth: ao.strokeWidth,
				lineCap: 'round',
				bezier: ao.toValue!==null,
			})
			this.line_layer.add( ao.kLine );

			// AnnotationTick
			apoints = [];
			if ( ao.toValue!==null ) {
				apoints.push( this.numberLine.val2x(ao.toValue) );	apoints.push( this.numberLine.y + ao.annotationTickHeightBottom );
				apoints.push( this.numberLine.val2x(ao.toValue) );	apoints.push( this.numberLine.y - ao.annotationTickHeightTop );
			}
			const hitWidth = this.numberLine.tickHitLineWidth();
			const hitAddTop = ao.annotationTickHeightTop*0.5;
			const hitHeight = ao.annotationTickHeightTop*1.5+ao.annotationTickHeightBottom*2;
			ao.kAnnotationTick = new Konva.Line({
				points: apoints,
				stroke: ao.conLineColor,
				strokeWidth: ao.strokeWidth,
				lineCap: 'round',
				// hitStrokeWidth: this.numberLine.unit*3,
				hitFunc: function (context,shape) {
					const points = shape.points();
					if ( points.length ) {
						context.beginPath();
						context.rect( points[0]-hitWidth/2, Math.min( points[1], points[3] )-hitAddTop, hitWidth, hitHeight );
						context.closePath();
						context.fillStrokeShape(this);
					}
				},
			})
			this.line_layer.add( ao.kAnnotationTick );

			// highlight & line interactivity
			if ( !( ao.toValueReadonly || ao.readonly || this.readonly ) ) {

				// mouse cursor highlighting
				ao.frame.kText.on( 'mouseenter', function () {
					if ( !this.sticky_ao && ao.toValue===null ) {
						this.set_ao_line( ao, this.highlightColor );
					}
				}.bind(this))
				ao.frame.kText.on( 'mouseleave', function (ev) {
					if ( ignoreEvent( this.stage, ev ) ) {
						return;
					}
					if ( !this.sticky_ao && ao.toValue===null ) {
						this.set_ao_line( ao, 'black' );
					}
				}.bind(this))
				ao.kAnnotationTick.on( 'mouseenter mousemove', function () {
					if ( !this.repos_ao ) {
						ao.kAnnotationTick.stroke( this.highlightColor );
						ao.kLine.stroke( this.highlightColor );
						this.line_layer.batchDraw();
						document.body.style.cursor = "ew-resize";
					}
				}.bind(this))
				ao.kAnnotationTick.on( 'mouseleave', function (ev) {
					if ( ignoreEvent( this.stage, ev ) ) {
						return;
					}
					if ( !this.repos_ao ) {
						ao.kAnnotationTick.stroke( ao.conLineColor );
						ao.kLine.stroke( ao.conLineColor );
						this.line_layer.batchDraw();
						document.body.style.cursor = "default";
					}
				}.bind(this))

				// activate stickiness
				ao.frame.kText.on( 'mousedown touchstart', function (ev) {
					if ( !this.sticky_ao && ao.toValue===null ) {
						this.set_ao_line( ao, this.highlightColor );
						this.sticky_ao=ao;
						ev.cancelBubble = true;
					}
				}.bind(this))
				ao.kAnnotationTick.on( 'mousedown touchstart', function (ev) {
					if ( !this.repos_ao ) {
						this.repos_ao = ao;
						this.set_ao_line( ao, this.highlightColor );
						this.set_ao_annoline( this.repos_ao, this.highlightColor, ev );
						ev.cancelBubble = true;
					}
				}.bind(this))
			}

			this.annotations.push( ao );
		})

		this.annot_layer.draw();
		this.line_layer.draw();
	}

	///////////////////////////////////

	getState () {

		const state = delDefaults( this.annotations, this.defaultAnnotation, [ "frame", "kLine", "kAnnotationTick" ] );
		state.logObjectId = this.logObjectId;
		return JSON.stringify( state );

	}

	setState ( state ) {

		try {

			const obj = JSON.parse(state);
			this.setAnnotations( obj );
			this.logObjectId = obj.logObjectId;

		} catch (e) {
			console.error(e);
		}

		setStatePostProc(this);
	}

	// Check if User made changes
	getDefaultChangeState () {
		return !object_equals( this.getChState(), this.initData );
	}

	getChState () {
		return this.annotations.map( a => ({
			toValue: a.toValue,
			label: a.frame.value,
		}) );
	}

	///////////////////////////////////

	// update line (toValue not set)
	set_ao_line ( ao, color, delLine=0 ) {
		ao.frame.kFrame.stroke( color );
		this.annot_layer.batchDraw();

		ao.kLine.stroke( color );
		if ( delLine ) {
			ao.kLine.points( ao.kLine.points().slice( 0, 2 ) );
		}
		this.line_layer.batchDraw();
	}

	// update line and annotationTick (toValue set)
	set_ao_annoline ( ao, color, event ) {
		// get absolute x
		const absx = getXofEvent( this.stage, event );
		// calc val
		let val = this.numberLine.x2val(absx);
		val = Math.min( Math.max( this.numberLine.valFrom, val ), this.numberLine.valTo );
		ao.toValue = val;

		// // draw line
		// let points = ao.kLine.points();
		// points[2] = this.numberLine.val2x( val );
		// points[3] = this.numberLine.y+ao.annotationTickHeightBottom;
		// ao.kLine.points( points );
		// ao.kLine.stroke( color );

		// // draw annotationTick
		// points = points.slice( 2, 4 );
		// points[2] = this.numberLine.val2x( val );
		// points[3] = this.numberLine.y-ao.annotationTickHeightTop;
		// ao.kAnnotationTick.points( points );
		// ao.kAnnotationTick.stroke( color );

		// draw line
		let points = ao.kLine.points();
		points[4] = this.numberLine.val2x( val );
		points[5] = this.numberLine.y + ao.annotationTickHeightBottom + ao.conLineVertPiece;
		points[6] = this.numberLine.val2x( val );
		points[7] = this.numberLine.y + ao.annotationTickHeightBottom;
		ao.kLine.points( points );
		ao.kLine.stroke( color );

		// draw annotationTick
		points = points.slice( 6, 8 );
		points[2] = this.numberLine.val2x( val );
		points[3] = this.numberLine.y - ao.annotationTickHeightTop;
		ao.kAnnotationTick.points( points );
		ao.kAnnotationTick.stroke( color );

		this.line_layer.batchDraw();
	}
}
