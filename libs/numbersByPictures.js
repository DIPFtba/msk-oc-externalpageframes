import { delDefaults, mergeDeep, object_equals, setStatePostProc, ignoreEvent } from './common'

import { iconBar } from './iconBar'
// import { tooltip } from './tooltip'

import Konva from 'konva/lib/Core'
import { Rect } from 'konva/lib/shapes/Rect'
import { Circle } from 'konva/lib/shapes/Circle'

import cursor_del from './img/cursor_del.svg'
import cursor_add from './img/cursor_add.svg'

export class numbersByPictures {

	constructor ( base, opts = {} ) {

		if ( base.fsm && base.fsm.incInitCnt ) {
			base.fsm.incInitCnt();
		}

		const defaults = {

			// x, y
			// width

			iconBar: {
				//x, y,
				// width, height
				spacing: 2,
				framePadding: 0,
				frameWidth: 0,
				frameFill: 'lightgray',
				cursorOver: `url(${cursor_add}) 2 2, auto`,
			},
			// iconBarTooltip: {
			// 	src: `${base.scriptDir}/add_icon.png`,
			// 	width: 16,
			// 	height: 16,
			// 	offsetX: 10, offsetY: 10,
			// },

			pics: {
				width: 50, // width of bars, rectangles, cuboids
				//cuboidDepth: 18, // '3d' cube: movement to right and to top

				spacing: 12,

				//barSpacing:	5,	// vertical spacing between bars
				//barSeparator: 5,	// extra vertical space below 5 bars

				radius: 1.4,	// radius if dots
				//dotSpacing:	5,	// vertical spacing between dots
				//dotSeparator: 2,	// extra vertical space besides 5 dots
				dotFill: 'black',

				stroke: 'black',
				strokeWidth: 2,
				lineCap: 'square',

				cursorOver: `url(${cursor_del}) 2 2, auto`,
			},
			// picsTooltip: {		// Cursor mouseover
			// 	src: `${base.scriptDir}/delete_icon.png`,
			// 	width: 20,
			// 	height: 20,
			// },


			// contains all cols as arays
			// entries: { 'c':<number of cuboids>, 'r':<number of rectangles>, 'b':<number of bars in col>, 'd':<number of dots in col> }
			data: [],

			readonly: 0,
			logObjectId: 1,
		}
		mergeDeep( Object.assign( this, defaults ), opts );
		const sepExtraMult = 0.6;
		if ( !this.pics.cuboid ) 		this.pics.cuboidDepth = this.pics.width*18/50;
		if ( !this.pics.barSpacing )	this.pics.barSpacing = this.pics.width/(9+sepExtraMult);
		if ( !this.pics.barSeparator )	this.pics.barSeparator = this.pics.barSpacing*sepExtraMult;
		if ( !this.pics.dotSpacing )	this.pics.dotSpacing = (this.pics.width-2*this.pics.radius)/(9+sepExtraMult);
		if ( !this.pics.dotSeparator )	this.pics.dotSeparator = this.pics.dotSpacing*sepExtraMult;

		this.base = base;
		const stage = base.stage;
		this.stage = stage;
		this.usedWidth = 0;

		// this.tooltip = new tooltip( stage );
		// stage.on( 'mouseleave', () => this.tooltip.hide() );

		// Render iconBar
		if ( this.iconBar.x && this.iconBar.y ) {
			const iconDepth = this.iconBar.width*this.pics.cuboidDepth/(this.pics.width+this.pics.cuboidDepth);
			const iconRadius = this.pics.radius*1.5;

			const iconBarOpts = mergeDeep( this.iconBar, {
				sticky: false,

				icons: [
					{ kCreateFunc: function (x,y) {
						return this.cuboid({
							x: x, y: y+iconDepth,
							cuboidDepth: iconDepth,
							width: this.iconBar.width - iconDepth,
							strokeWidth: 1,
						})}.bind(this),
						// tooltipImage: this.iconBarTooltip,
						cursorOver: this.iconBar.cursorOver,
						on: () => this.addShape('c'),
					},
					{ kCreateFunc: function (x,y) {
						return this.rectangle({
							x: x+iconDepth/2, y: y+iconDepth/2,
							width: this.iconBar.width - iconDepth,
							strokeWidth: 1,
						})}.bind(this),
						// tooltipImage: this.iconBarTooltip,
						cursorOver: this.iconBar.cursorOver,
						on: () => this.addShape('r'),
					},
					{ kCreateFunc: function (x,y) {
						return this.bar({
							x: x+iconDepth/2, y: y+this.iconBar.width/2,
							width: this.iconBar.width - iconDepth,
							strokeWidth: 2,
						})}.bind(this),
						// tooltipImage: this.iconBarTooltip,
						cursorOver: this.iconBar.cursorOver,
						on: () => this.addShape('b'),
					},
					{ kCreateFunc: function (x,y) {
						return this.dot({
							x: x+this.iconBar.width/2-iconRadius, y: y+this.iconBar.width/2-iconRadius,
							width: this.iconBar.width - iconDepth,
							radius: iconRadius,
						})}.bind(this),
						// tooltipImage: this.iconBarTooltip,
						cursorOver: this.iconBar.cursorOver,
						on: () => this.addShape('d'),
					},
				],
			})

			new iconBar( stage, iconBarOpts );
		}

		if ( this.data.length ) {
			this.drawShapes();
		}

		this.initData = delDefaults( this.data );
		this.base.sendChangeState( this );	// init & send changeState & score

		if ( base.fsm && base.fsm.decInitCnt ) {
			base.fsm.decInitCnt();
		}
	}

	///////////////////////////////////

	newColSpace ( shape ) {
		return this.usedWidth + this.pics.spacing + this.pics.width + ( shape=='c' ? this.pics.cuboidDepth : 0 ) <= this.width;
	}

	changeAndRearrangeBarsDots ( changeFnc, logEvent, shape ) {

		// copy cudoids and rects
		const cub_rec = this.data.filter( e => e.c || e.r );
		// count bars and dots
		let cnt = { b:0, d:0 };
		this.data.forEach( e => {
			cnt.b += e.b || 0;
			cnt.d += e.d || 0;
		})
		// add new element / del existing
		changeFnc( cnt );

		// is space for changed
		if ( cnt.b*10 + cnt.d <= ( this.data.length - cub_rec.length )*100 || this.newColSpace() ) {
			this.base.postLog( logEvent, {
				id: this.logObjectId,
				shape
			});
			this.data = cub_rec;
			// add new bars and dots
			while ( cnt.b || cnt.d ) {
				let new_elem = {};
				if ( cnt.b>0 ) {
					const e = Math.min( cnt.b, 10 );
					new_elem.b = e;
					cnt.b -= e;
				}
				if ( cnt.d>0 ) {
					const e = Math.min( cnt.d, 100-(new_elem.b || 0)*10 );
					if ( e>0 ) {
						new_elem.d = e;
						cnt.d -= e;
					}
				}
				this.data.push( new_elem );
			}
		}
	}

	addShape ( shape ) {

		if ( !this.readonly ) {

			// cuboid or rectangle
			if ( shape=='c' || shape=='r' ) {

				// enough space for new col?
				if ( this.newColSpace(shape) ) {
					this.base.postLog( 'shapeAdded', {
						id: this.logObjectId,
						shape,
					});

					// Insert new element
					if ( shape=='c' ) {
						this.data.unshift( { c : 1 } );
					} else {
						const i = this.data.findIndex( e => !( 'c' in e ) || e.c==0 );
						this.data.splice( i<0 ? this.data.length : i, 0, { r : 1 } );
					}
				}

			} else {

				this.changeAndRearrangeBarsDots( cnt => cnt[shape]++, 'shapeAdded', shape );

			}

			this.drawShapes();
			this.base.sendChangeState( this );
		}
	}

	delShape ( nr, shape = null ) {

		if ( !this.readonly ) {
			this.restoreCursor();
			// if ( this.tooltip ) {
			// 	this.tooltip.hide();
			// }

			if ( shape=='b' || shape=='d' ) {

				this.changeAndRearrangeBarsDots( cnt => {
					if ( cnt[shape]>0 ) {
						cnt[shape]--
					}
				}, "shapeDeleted", shape )

			} else {

				this.base.postLog('shapeDeleted', {
					id: this.logObjectId,
					shape: this.data[nr].c>0 ? 'c' : 'r',
				});
				this.data.splice( nr, 1 );
			}

			this.drawShapes();
			this.base.sendChangeState( this );
		}
	}

	drawShapes () {

		const new_layer = new Konva.Layer();
		let x = this.x;
		let y = this.y;

		this.data.forEach( ( dat, nr ) => {

			const setInteract = ( kObj, event, callback ) => {
				if ( !this.readonly ) {
					kObj.on( event, (ev) => {
						callback();
						ev.cancelBubble = true;
					});
					if ( this.pics.cursorOver ) {
						kObj.on( 'mouseenter', () => this.setCursor() );
						kObj.on( 'mouseleave', (ev) => {
							if ( ignoreEvent( this.stage, ev ) ) {
								return;
							}
							this.restoreCursor();
						});
					}
					// if ( this.picsTooltip ) {
					// 	kObj.on( 'mouseenter', () => this.tooltip.showImage( this.picsTooltip ) );
					// 	kObj.on( 'mouseleave', () => this.tooltip.hide() );
					// }
				}
			}

			// Cuboid
			if ( dat.c ) {
				const kObj = this.cuboid( { x: x, y: y } );
				new_layer.add( kObj );
				setInteract( kObj, 'mousedown touchstart', () => this.delShape( nr ) );
				x += this.pics.width + this.pics.cuboidDepth;

			// Rectangle
			} else if ( dat.r ) {
				const kObj = this.rectangle( { x: x, y: y } );
				setInteract( kObj, 'mousedown touchstart', () => this.delShape( nr ) );
				new_layer.add( kObj );

				x += this.pics.width;

			// Bars and dots
			} else {

				let yt = y;
				// bars
				if ( dat.b ) {
					for ( let h=1; h<=dat.b; h++ ) {
						const kObj = this.bar( { x: x, y: yt } );
						new_layer.add( kObj );
						setInteract( kObj, 'mousedown touchstart', () => this.delShape( nr, 'b' ) );
						yt += this.pics.barSpacing;
						if ( !( h % 5 ) && ( h<dat.b || dat.d ) ) {
							yt += this.pics.barSeparator;
						}
					}
				}

				// dots
				let xt = x;
				if ( dat.d ) {
					for ( let h=1; h<=dat.d; h++ ) {
						const kObj = this.dot( { x: xt+this.pics.radius, y: yt } );
						new_layer.add( kObj );
						setInteract( kObj, 'mousedown touchstart', () => this.delShape( nr, 'd' ) );
						xt += this.pics.dotSpacing;
						if ( !( h % 5 ) && h<dat.d ) {
							xt += this.pics.dotSeparator;
						}
						if ( !( h % 10 ) && !( ( ( dat.b || 0 ) + h/10 ) % 5 ) ) {
							yt += this.pics.barSeparator;
						}
						if ( !( h % 10 ) ) {
							xt = x;
							yt += this.pics.barSpacing;
						}
					}
				}

				x += ( dat.b || dat.d>9 ) ? this.pics.width : xt-x;
			}

			x += this.pics.spacing;
		})
		this.usedWidth = x - this.x;

		if ( this.layer ) {
			this.layer.destroy();
		}
		this.layer = new_layer;
		this.stage.add( this.layer );
		this.layer.moveToBottom();
	}

	setCursor () {
		this.cursorSaved = document.body.style.cursor;
		document.body.style.cursor = this.pics.cursorOver;
		this.cursorSet = document.body.style.cursor;
	}

	restoreCursor () {
		if ( document.body.style.cursor == this.cursorSet ) {
			document.body.style.cursor = this.cursorSaved
			this.cursorSet = null;
		}
	}

	///////////////////////////////////

	cuboid ( opts = {} ) {
		const o = Object.assign( {}, this.pics, opts );

		o.sceneFunc = function ( context, shape ) {
			context.beginPath();
			context.rect( 0, 0, o.width, o.width );

			context.moveTo( 0, 0, );
			context.lineTo( o.cuboidDepth, -o.cuboidDepth );
			context.lineTo( o.cuboidDepth+o.width, -o.cuboidDepth );
			context.lineTo( o.cuboidDepth+o.width, -o.cuboidDepth+o.width );
			context.lineTo( o.width, o.width);
			context.moveTo( o.width, 0, );
			context.lineTo( o.width+o.cuboidDepth, -o.cuboidDepth );
			context.closePath();

			context.fillStrokeShape(shape);
		}

		return new Konva.Shape( o );
	}

	rectangle ( opts = {} ) {
		const o = Object.assign( {}, this.pics, opts );
		o.height = o.width;
		o.hitStrokeWidth = o.strokeWidth+o.barSpacing;

		return new Konva.Rect( o );
	}

	bar ( opts = {} ) {
		const o = Object.assign( {}, this.pics, opts );
		o.hitStrokeWidth = o.strokeWidth+o.dotSpacing;
		o.points = [ o.x, o.y, o.x+o.width, o.y ];

		return new Konva.Rect( o );
	}

	dot ( opts = {} ) {
		const o = Object.assign( {}, this.pics, opts );
		o.fill = this.pics.dotFill;
		o.hitStrokeWidth = o.strokeWidth*2;

		return new Konva.Circle( o );
	}

	///////////////////////////////////

	getState () {

		const state = {
			data: this.data,
		};
		return JSON.stringify( state );
	}

	setState( state ) {

		try {

			const load = JSON.parse(state);
			this.data = load.data;
			this.drawShapes();

		} catch (e) {
			console.error(e);
		}

		setStatePostProc(this);
	}

	// Check if User made changes
	getDefaultChangeState () {
		return !object_equals( this.data, this.initData );
	}

}
