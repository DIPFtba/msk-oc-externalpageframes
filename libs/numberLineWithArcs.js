import { delDefaults, mergeDeep, object_equals, getXofEvent, getYofEvent, setStatePostProc, ignoreEvent } from './common'

import { textFrame } from './textFrame'
import { numberLine } from './numberLine'

import Konva from 'konva/lib/Core'
import { Line } from 'konva/lib/shapes/Line'
import { Ellipse } from 'konva/lib/shapes/Ellipse'

export class numberLineWithArcs {

	constructor ( base, opts = {} ) {

		// Options
		const defaults = {
			// numberLine = {}
			// arcs = [ {}, ... ]
			highlightColor: 'tomato',

			arcHeight: 20,
			arcDistance: 9, // distance to numberLine
			arcWidth: 1,
			arcLabelDistance: -4, // distance label to arc
			arcMinWidth: 1,	// arcs smaller than this are deleted, ticks within this range are merged

			tickHeight: 14,
			tickLabelDistance: 8,	// distance tick label to numberLine
			tickFrameWidth: null,	// tick label framed?
			tickHitHeight: 20,	// Height of HitFunc around (non existing?) ticks

			newTickLabelDefaults: {},	// default definitions for new ticks
			newArcDefaults: {},		// default definitions for new arcs
			newArcLabelDefaults: {},	// default definitions for new arc labels (on top of arc)

			yDiffNewArc: 7,		// cursor y diff move to top for creating new arc
			xDiffNewArc: 20,	// cursor x diff within creating new arc possible

			readonly: 0,
			logObjectId: 1,

			// parameters for usage without arcs (ticks with labels only)
			dontDelEmptyTicks: false,
			maxTicks: null,
			neverCreateArcs: false,
		}
		this.defaultArc = {
			// from, to,
			label: null,
			labelReadonly: 0,
			arcReadonly: 0,
			arcColorReadonly: 'black',
			arcColorEditable: 'blue',
		}
		this.defaultArcLabel = {
			width: 50, height: 25,
			fontSize: 15,
			frameWidth: 0,
		}
		this.defaultTickLabel = {
			// value
			label: null,
			width: 50, height: 25,
			fontSize: 15,
			labelReadonly: 0,

			tickHeight: this.tickHeight,
			inputRegexp: null,
			tickReadonly: 0,
		}
		mergeDeep( Object.assign( this, defaults ), opts );
		this.base = base;
		const stage = base.stage;
		this.stage = stage;

		// NumberLine
		this.base_layer = new Konva.Layer();
		stage.add( this.base_layer );
		this.numberLine = new numberLine( this.base_layer, opts.numberLine );

		// Create Arcs
		this.setArcs( opts.arcs, opts.ticks );

		this.initData = this.getChState();
		this.base.sendChangeState( this );	// init & send changeState & score

		// higlight for "new tick"
		if ( !this.readonly ) {
			this.numberLine.kHitLine.on( "mousedown touchstart", function (ev) {
// console.log("click",this.stage.getPointerPosition(),this.numberLine.y);
				if ( !this.maxTicks || this.ticks.length<this.maxTicks ) {
					const newTick = this.createNewTick(ev);
					if ( newTick ) {
						newTick.startValue = newTick.value;
						this.repos_tick = newTick;
						this.initTickMovable( newTick, ev );
					}
					ev.cancelBubble = true;
				}
			}.bind(this))
		}

		// mouse cursor stickiness
		stage.on( 'mousemove touchmove', function (ev) {
			if ( this.repos_tick !== null ) {
// console.log("move",this.stage.getPointerPosition(),this.numberLine.y);

				const absy = getYofEvent( this.stage, ev );
				const absx = getXofEvent( this.stage, ev );
				const val = this.numberLine.x2val( absx );

				if ( this.dontCreateNewArc && absy>=this.numberLine.y-this.yDiffNewArc/2 ) {
					this.dontCreateNewArc = this.neverCreateArcs;
					this.repos_tick.startValue = val;
// console.log("can create");
				}
				if ( !this.dontCreateNewArc &&
						// moved up
						absy<( this.numberLine.y-this.yDiffNewArc ) &&
						// moved horizontal more than a unit?
						Math.abs( this.repos_tick.startValue - val ) > this.arcMinWidth &&
						// no other ticks between cursor and moved tick?
						!this.ticks.some( t =>
								t.value > Math.min( this.repos_tick.value, val ) && t.value < Math.max( this.repos_tick.value, val ) ) &&
						// not moved into exitisting arc?
						!this.arcs.some( a => a.from<=val && a.to>=val ) ) {

					// create new arc!
					this.dontCreateNewArc = true;
					const newTick = this.createNewTick(ev);
					if ( newTick ) {
// console.log("new arc",this.repos_tick,newTick);
						// restore startValue of repos_tick
						const corrFirstTick = this.repos_tick.startValue;
						if ( corrFirstTick != this.repos_tick.value ) {
							// newTick.value = newTick.value<this.repos_tick.value ?
							// 			Math.min( newTick.value, this.repos_tick.startValue-this.arcMinWidth ) :
							// 			Math.max( newTick.value, this.repos_tick.startValue-this.arcMinWidth );
							this.reposTickTo( this.repos_tick, this.highlightColor,
									// simulate move to this.repos_tick.startValue
									{ simX: this.numberLine.val2x(corrFirstTick) } );
						}
						// create new arc
						this.sendChangeState();
						this.createNewArc( this.repos_tick, newTick );
						this.endTickMove( this.repos_tick );
						this.initTickMovable( newTick, ev );
						this.repos_tick = newTick;
					}
				} else if ( !this.repos_tick.tickReadonly && !this.repos_tick.readonly && !this.readonly ) {
					// reposition of Tick
					this.reposTickTo( this.repos_tick, this.highlightColor, ev );
				}
			}
		}.bind(this))

		// end stickiness?
		stage.on( 'mouseup mouseleave touchend', function (ev) {
			if ( ignoreEvent( this.stage, ev ) ) {
				return;
			}
			if ( this.repos_tick !== null ) {
// console.log("end move");
								// only assign new mousepos if not readonly
				this.endTickMove( this.repos_tick, !this.repos_tick.tickReadonly && !this.repos_tick.readonly && !this.readonly ? ev : null );
				this.sendChangeState();
				this.repos_tick = null;
				this.dontCreateNewArc = this.neverCreateArcs;
		}
		}.bind(this))

		stage.draw();
		this.getLastLog();
	}

	///////////////////////////////////

	delAllArcs () {

		this.repos_tick = null;	// which tick is currently repositioned?

		this.arcs = [];
		this.ticks = [];	// [ { value:, label: }, ... ]

		if ( this.arcs_layer ) {
			this.arcs_layer.destroy();
		}
		this.arcs_layer = new Konva.Layer();
		this.stage.add( this.arcs_layer );

		this.arcs_group = new Konva.Group({
			clip: {
				x: this.numberLine.x-this.arcWidth,
				y: this.numberLine.y-this.arcDistance-this.arcHeight-this.arcWidth*2,
				width: this.numberLine.width+this.arcWidth*2,
				height: this.arcHeight+this.arcWidth*2,
			}
		});
		this.arcs_layer.add( this.arcs_group );
	}

	///////////////////////////////////

	setArcs ( arcs = [], ticks = [] ) {

		this.delAllArcs();

		// create ticks (& tickLabels)
		ticks.forEach( t => {
			this.ticks.push( this.newTick(t) );
		});

		// create arcs
		arcs.forEach( a => {
			this.arcs.push( this.newArc(a) );
		})

		// move Group with arcs to top (over labels & textframes)
		this.arcs_group.moveToTop();
	}

	///////////////////////////////////

	newTick (t) {

		let to = Object.assign( {}, this.defaultTickLabel, t );
		const xa = this.numberLine.val2x( to.value );
		if ( !( 'logObjectId' in to ) ) {
			to.logObjectId = this.logObjectId++;
		}

		// Label
		if ( to.label!==null ) {
			to.labelObj = new textFrame( this.base, this.arcs_layer, {
				x: xa-to.width/2,
				y: this.numberLine.y+this.tickLabelDistance,
				value: to.label.toString(),
				width: to.width,
				height: to.height,
				fontSize: to.fontSize,
				frameWidth: this.tickFrameWidth || 0,
				cornerRadius: 4,
				inputRegexp: to.inputRegexp,
				readonly: to.labelReadonly || this.readonly,

				onChange: () => {
					to.label = to.labelObj.value;	// for get/set State()
					this.sendChangeState();
				},
				logObjectId: !( to.labelReadonly || this.readonly ) ? to.logObjectId : null,
				logRef: () => ({ atValue: to.value }),
				base: this.base,
			})
		}
		if ( this.tickFrameWidth ) {
			to.kLabelLine = new Konva.Line({
				points: [ xa, this.numberLine.y, xa, this.numberLine.y+this.tickLabelDistance ],
				stroke: 'black',
				strokeWidth: this.tickFrameWidth,
			})
			this.arcs_layer.add( to.kLabelLine );
		}

		// Tick
		if ( to.tickHeight ) {
			to.kTick = new Konva.Line({
				points: [ xa, this.numberLine.y-to.tickHeight/2, xa, this.numberLine.y+to.tickHeight/2 ],
				stroke: 'black',
				strokeWidth: this.arcWidth,
			})
			this.arcs_layer.add( to.kTick );
		}

		// HitRegion for (non visible?) Tick
		const hitWidth = this.numberLine.tickHitLineWidth();
		const hitHeight = Math.max( this.tickHitHeight, this.tickHeight+6 );
		to.kHitTick = new Konva.Line({
			points: [ xa, this.numberLine.y-hitHeight/2, xa, this.numberLine.y+hitHeight/2 ],
			stroke: null,
			strokeWidth: this.arcWidth*1.5,
			hitStrokeWidth: hitWidth,
		})
// console.log( this.arcs_layer.find( () => true ).map( e => e.getClassName() ) )
		this.arcs_layer.add( to.kHitTick );
// console.log( this.arcs_layer.find( () => true ).map( e => e.getClassName() ) )

		if ( !to.tickReadonly && !to.readonly && !this.readonly ) {

			// hightlight tick interactivity
			to.kHitTick.on( 'mousemove mouseenter', function (ev) {
				if ( this.repos_tick === null /* && repositioning enabled */ ) {
					this.initTickMovable( to, ev );
				}
			}.bind(this))
			to.kHitTick.on( 'mouseleave', function (ev) {
				if ( ignoreEvent( this.stage, ev ) ) {
					return;
				}
// console.log("tickleave");
				if ( this.repos_tick === null /* && repositioning enabled */ ) {
					to.kHitTick.stroke( null );
					this.arcs_layer.batchDraw();
					document.body.style.cursor = "default";
					if ( to.labelObj ) {
						to.labelObj.listening(true);
					}
				}
			}.bind(this))
		}
		if ( !this.readonly ) {
			// activate stickiness
			to.kHitTick.on( 'mousedown touchstart', function (ev) {
				if ( this.repos_tick === null /* && repositioning enabled */ ) {
					this.initTickMovable( to, ev );
					to.startValue = to.value;
					this.repos_tick = to;
					ev.cancelBubble = true;
				}
			}.bind(this))
		}

		return to;
	}

	createNewTick ( event, val=null ) {

		if ( val===null ) {
			const absx = getXofEvent( this.stage, event );
			val = this.numberLine.x2val(absx);
		}

		// not within arc?
		if ( !this.arcs.some( a => a.from<=val && a.to >=val ) ) {

			// find insert pos (last pos < val)
			let insertPos = this.ticks.length;
			while ( insertPos>0 && this.ticks[insertPos-1].value>val ) {
					insertPos--;
			}

			// insert new tick
			const newTick = this.newTick( Object.assign( {}, this.newTickLabelDefaults, { value: val } ) );
			this.ticks.splice( insertPos, 0, newTick );

			this.arcs_layer.draw();

			return newTick;
		}

		return null;
	}

	initTickMovable ( to, event ) {

// console.log("initTickMovable");
		to.orgPos = to.value;
		to.startX = getXofEvent( this.stage, event );
		to.startY = getYofEvent( this.stage, event );

		if ( to.labelObj ) {
			to.labelObj.listening(false);
		}

		to.kHitTick.stroke( this.highlightColor );
		this.arcs_layer.batchDraw();

		if ( !to.tickReadonly && !to.readonly && !this.readonly ) {
			document.body.style.cursor = "ew-resize";
		}
	}

	endTickMove (to,e) {

		if ( to.labelObj ) {
			to.labelObj.listening(true);
		}

		this.reposTickTo( to, 'black', e );

		// delete ticks without arc
		if ( e ) {
			this.deleteArc( null );
		}

		document.body.style.cursor = "default";
	}

	///////////////////////////////////

	newArc (a) {

		// calc arc parameter
		let ao = Object.assign( {}, this.defaultArc, a );
		const radius = Math.abs( ao.to-ao.from )/2*this.numberLine.unit;
		const xm = this.numberLine.val2x( ( ao.from + a.to ) / 2 );
		ao.color = !ao.arcReadonly && !ao.readonly && !this.readonly ? ao.arcColorEditable : ao.arcColorReadonly;

		// if arc is not readonly & has no ticks: create invisible ticks for this arc
		if ( !ao.arcReadonly && !ao.readonly && !this.readonly ) {
			[ ao.from, ao.to ].forEach( val => {
				if ( !this.ticks.some( t => t.value==val ) ) {
					this.createNewTick( null, val );
				}
			})
		}

		// arc label
		if ( ao.label!==null ) {
			let lo = Object.assign( {}, this.defaultArcLabel, this.newArcLabelDefaults );
			ao.labelObj = new textFrame( this.base, this.arcs_layer, Object.assign( lo, {
				x: xm-lo.width/2,
				y: this.numberLine.y - this.arcDistance - this.arcHeight - this.arcLabelDistance - lo.height,
				value: ao.label.toString(),
				readonly: ao.labelReadonly || this.readonly,
				onChange: () => {
					ao.label = ao.labelObj.value;	// for get/set State()
				},
			}) )
		}

		// arc
		ao.kArc = new Konva.Ellipse({
			x: xm,
			y: this.numberLine.y - this.arcDistance,
			radiusX: radius,
			radiusY: this.arcHeight,
			strokeWidth: this.arcWidth,
			stroke: ao.color,
			hitWidth: this.arcWidth*3,
		});
		this.arcs_group.add( ao.kArc );

		if ( !ao.arcReadonly && !ao.readonly && !this.readonly ) {

			// hightlight tick interactivity
			ao.kArc.on( 'mousemove mouseenter', function () {
				if ( this.repos_tick === null /* && del enabled */ ) {
					ao.kArc.stroke( this.highlightColor );
					ao.kArc.opacity( 0.6 );
					ao.kArc.dash( [ 5, 5 ] );
					if ( ao.labelObj ) {
						ao.labelObj.kText.visible( false );
						if ( ao.labelObj.kFrame ) {
							ao.labelObj.kFrame.visible( false );
						}
					}
					this.arcs_layer.batchDraw();
					document.body.style.cursor = "delete";
				}
			}.bind(this))
			ao.kArc.on( 'mouseleave', function (ev) {
				if ( ignoreEvent( this.stage, ev ) ) {
					return;
				}
				if ( this.repos_tick === null /* && del enabled */ ) {
					ao.kArc.stroke( ao.color );
					ao.kArc.opacity( 1 );
					ao.kArc.dash( null );
					if ( ao.labelObj ) {
						ao.labelObj.kText.visible( true );
						if ( ao.labelObj.kFrame ) {
							ao.labelObj.kFrame.visible( true );
						}
					}
					this.arcs_layer.batchDraw();
					document.body.style.cursor = "default";
				}
			}.bind(this))

			// delete arc
			ao.kArc.on( 'mousedown touchstart', function (ev) {
				if ( this.repos_tick === null /* && del enabled */ ) {
					this.deleteArc(ao);
					document.body.style.cursor = "default";
					ev.cancelBubble = true;
				}
			}.bind(this))

		}

		if ( !( 'logObjectId' in ao ) ) {
			ao.logObjectId = this.logObjectId++;
		}
		return ao;
	}

	createNewArc ( t1, t2 ) {

		const a = Object.assign( {}, this.newArcDefaults, { from: Math.min( t1.value, t2.value ), to: Math.max( t1.value, t2.value ) } );
		const newArc = this.newArc(a);

		// find insert pos (last pos < val)
		let insertPos = this.arcs.length;
		while ( insertPos>0 && this.arcs[insertPos-1].to>newArc.to ) {
				insertPos--;
		}

		// insert new arc
		this.arcs.splice( insertPos, 0, newArc );

		this.arcs_group.draw();
	}

	///////////////////////////////////

	getState () {

		const state = {
			arcs: delDefaults( this.arcs, this.defaultArc, [ "labelObj", "kArc" ] ),
			ticks: delDefaults( this.ticks, this.defaultTickLabel, [ 'labelObj', 'kLabelLine', 'kTick', 'kHitTick', ] ),
			logObjectId: this.logObjectId,
		}

		return JSON.stringify( state );
	}

	setState( state ) {

		try {

			const obj = JSON.parse(state);
			this.setArcs( obj.arcs, obj.ticks );
			this.stage.draw();
			this.logObjectId = obj.logObjectId;

		} catch (e) {
			console.error(e);
		}

		setStatePostProc(this);
		this.getLastLog();
	}

	// Check if User made changes
	getDefaultChangeState () {
		return !object_equals( this.getChState(), this.initData );
	}

	getChState () {
		return {
			arcs: this.arcs.map( a => ({
				from: a.from,
				to: a.to,
				label: a.labelObj ? a.labelObj.value : null,
			}) ),
			ticks: this.ticks.map( t => ({
				value: t.value,
				label: t.labelObj ? t.labelObj.value : null,
			}) ),
		}
	}

	sendChangeState () {

		// some changes to log?
		// changes to arcs
		let logChanged=0;
		const foundInds = [];
		this.arcs.forEach( a => {
			const lastLogIndex = this.lastLog.arcs.findIndex( la => la.logObjectId==a.logObjectId );
			foundInds.push( lastLogIndex );
			if ( lastLogIndex==-1 ) {
				this.base.postLog( 'arcCreated', {
					id: a.logObjectId,
					from: a.from,
					to: a.to
				});
				logChanged=1;
			} else {
				if ( a.from != this.lastLog.arcs[lastLogIndex].from ) {
					this.base.postLog( 'arcMoved', {
						id: a.logObjectId,
						fromOld: this.lastLog.arcs[lastLogIndex].from,
						fromNew: a.from
					});
					logChanged=1;
				} else if ( a.to != this.lastLog.arcs[lastLogIndex].to ) {
					this.base.postLog( 'arcMoved', {
						id: a.logObjectId,
						toOld: this.lastLog.arcs[lastLogIndex].to,
						toNew: a.to
					});
					logChanged=1;
				}
			}
		})
		if ( this.lastLog.arcs.length != foundInds.length ) {
			this.lastLog.arcs.forEach( (la,ind) => {
				if ( !foundInds.includes(ind) ) {
					this.base.postLog( 'arcDeleted', {
						id: la.logObjectId
					});
					logChanged=1;
				}
			})
		}
		// changes to ticks (without arcs)
		this.ticks.forEach( t => {
			let lastLogIndex = this.lastLog.ticks.findIndex( lt => lt.logObjectId==t.logObjectId );
			if ( this.dontDelEmptyTicks ) {
				if ( lastLogIndex==-1 ) {
					this.base.postLog( "tickCreated", {
						id: t.logObjectId,
						atValue: t.value
					});
					logChanged=1;
				} else {
					if ( t.value != this.lastLog.ticks[lastLogIndex].value ) {
						this.base.postLog( "tickMoved", {
							id: t.logObjectId,
							from: this.lastLog.ticks[lastLogIndex].value,
							to: t.value
						});
						logChanged=1;
					}
				}
			}
			if ( lastLogIndex>-1 && t.labelObj && t.labelObj.value != this.lastLog.ticks[lastLogIndex].label ) {
				this.base.postLog( "tickLabelChanged", {
					id: t.logObjectId,
					labelOld: this.lastLog.ticks[lastLogIndex].label,
					labelNew: t.labelObj.value,
					toValue: t.value
				});
				logChanged=1;
			}
		})
		if ( logChanged ) {
			this.getLastLog();
		}

		// send changes in state or score?
		this.base.sendChangeState( this );
	}

	getLastLog () {
		this.lastLog = {
			arcs: this.arcs.map( a => ({ logObjectId: a.logObjectId, from: a.from, to: a.to, }) ),
			ticks: this.ticks.map( t => ({ logObjectId: t.logObjectId, value: t.value, label: t.labelObj ? t.labelObj.value : null }) ),
		};
	}

	// are arcs defined (from-to) like [ [from1,to1], [from2,to2] ] with given tolerance
	// (any order)
	compArcs ( compareTo, tolerance=0 ) {

		if ( compareTo.length != this.arcs.length ) {
			return false;
		}

		return compareTo.every( res =>
			this.arcs.some( arc =>
				Math.abs( arc.from-Math.min(...res) )<=tolerance && Math.abs( arc.to-Math.max(...res) )<=tolerance
			)
		);
	}

	///////////////////////////////////

	reposTickTo ( to, color, event ) {

		const nr = this.ticks.findIndex( t => t===to );

		// get absolute x
		let absx = event ? getXofEvent( this.stage, event ) : this.numberLine.val2x( to.value );
		// calc val
		let val = this.numberLine.x2val(absx);
		// clip val to Min/Max numberLine and Ticks left/right of to
		const left_p = nr>0 ? this.ticks[nr-1].value+0.01/*this.arcMinWidth*/ : this.numberLine.valFrom;
		const right_p = nr<this.ticks.length-1 ? this.ticks[nr+1].value-0.01/*this.arcMinWidth*/ : this.numberLine.valTo;
		val = Math.min( Math.max( left_p, val ), right_p );
		const oldVal = to.value;
		to.value = val;
		const xa = this.numberLine.val2x( to.value );

		// Repos tick
		if ( to.labelObj ) {
			to.labelObj.repos( xa-to.width/2, to.labelObj.y );
		}
		if ( to.kLabelLine ) {
			const points = to.kLabelLine.points();
			points[0] = xa;
			points[2] = xa;
			to.kLabelLine.points( points );
		}
		if ( to.kTick ) {
			const points = to.kTick.points();
			points[0] = xa;
			points[2] = xa;
			to.kTick.points( points );
			to.kTick.stroke( color );
		}
		const points = to.kHitTick.points();
		points[0] = xa;
		points[2] = xa;
		to.kHitTick.points( points );
		to.kHitTick.stroke( color!='black' ? color : null );

		// Repos Arcs
		this.arcs.forEach( arc => {
			if ( arc.from==oldVal ) {
				arc.from = val;
				this.redraw_arc( arc );
			}
			if ( arc.to==oldVal ) {
				arc.to = val;
				this.redraw_arc( arc );
			}
		})

		this.arcs_layer.batchDraw();
	}

	redraw_arc ( arc ) {
		const xm = this.numberLine.val2x( ( arc.from + arc.to )/2 );
		arc.kArc.x( xm );
		arc.kArc.radiusX( Math.abs( arc.to-arc.from ) /2*this.numberLine.unit );
		if ( arc.labelObj ) {
			arc.labelObj.repos( xm - arc.labelObj.width/2, arc.labelObj.y );
		}
	}

	///////////////////////////////////

	deleteArc ( arc ) {

// console.log("DRLETEARC")
// console.log( "arc", this.arcs.map( a=> `${Math.round(a.from)}-${Math.round(a.to)}` ) )
// console.log( "tick", this.ticks.map( t => t.value) );
		// which arcs should be deleted?
		const delArcs = [];
		if ( arc ) {
			delArcs.push( this.arcs.findIndex( a => a===arc ) );
		}
		// add all arcs having width < arcMinWidth
		this.arcs.forEach( (a,nr) => {
			if ( Math.abs( a.to - a.from ) < this.arcMinWidth ) {
				delArcs.push( nr );
			}
		})
		// delete arcs!
		delArcs.forEach( nr => {
			// delete arc
			const dArc = this.arcs[nr];
			if ( dArc.labelObj ) {
				dArc.labelObj.deleteAll();
			}
			dArc.kArc.destroy();

			this.arcs.splice( nr, 1 );
		})
// console.log( "arc", this.arcs.map( a=> `${Math.round(a.from)}-${Math.round(a.to)}` ) )
// console.log( "tick", this.ticks.map( t => t.value) );

		// Delete all ticks without arcs
		if ( !this.dontDelEmptyTicks ) {
			for ( let ti=0; ti<this.ticks.length; ) {
				const t = this.ticks[ti];

				if ( !t.tickReadonly && !t.readonly &&
							!this.arcs.some( (a) => a.from==t.value || a.to==t.value ) ) {

					this.deleteTick( t, ti );

				} else {

					ti++;
				}
			}
		}
// console.log( "arc", this.arcs.map( a=> `${Math.round(a.from)}-${Math.round(a.to)}` ) )
// console.log( "tick", this.ticks.map( t => t.value) );

		// merge ticks within range of arcMinWidth
		if ( !this.dontDelEmptyTicks ) {
			this.ticks.forEach( (t,ti) => {
				if ( ti<this.ticks.length-1 && this.ticks[ti+1].value - t.value < this.arcMinWidth ) {
					// merge ticks [ti] and [ti+1]
					let delInd, newInd;
					if ( t.tickReadonly || t.labelReadonly || t.readonly ||
							( this.repos_tick!==null && t!==this.repos_tick ) ||
							( t.labelObj && !this.ticks[ti+1].labelObj ) ) {
						newInd = ti;
						delInd = ti+1;
					} else {
						newInd = ti+1;
						delInd = ti;
					}
					const delVal = this.ticks[delInd].value;
					const newVal = this.ticks[newInd].value;
					this.arcs.forEach( a => {
						if ( a.from==delVal ) {
							a.from = newVal;
							this.redraw_arc(a);
						}
						if ( a.to==delVal ) {
							a.to = newVal;
							this.redraw_arc(a);
						}
					})
					this.deleteTick( this.ticks[delInd], delInd );
				}
			})
		}
// console.log( "arc", this.arcs.map( a=> `${Math.round(a.from)}-${Math.round(a.to)}` ) )
// console.log( "tick", this.ticks.map( t => t.value) );

		this.arcs_layer.draw();

		if ( arc ) {
			this.sendChangeState();
		}
	}

	deleteTick ( t, ti ) {

		if ( typeof ti == 'undefined' ) {
			ti = this.ticks.findIndex( a => a===t )
		}

		// delete tick!
		if ( t.labelObj ) {
			t.labelObj.deleteAll();
		}
		if ( t.kLabelLine ) {
			t.kLabelLine.destroy();
		}
		if ( t.kTick ) {
			t.kTick.destroy();
		}
		t.kHitTick.destroy();

		this.ticks.splice( ti, 1 );
	}
}
