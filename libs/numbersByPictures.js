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

			// x, y	// position of the first element
			// width 	// width of all elements

			iconBar: {
				//x, y,
				// width, height
				// width: 40,
				spacing: 4,
				framePadding: 6,
				frameWidth: 1,
				frameFill: 'lightgray',				
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

				spacing: 20,

				//barSpacing:	5,	// vertical spacing between bars
				//barSeparator: 5,	// extra vertical space below 5 bars

				radius: 1.4,	// radius if dots
				//dotSpacing:	5,	// vertical spacing between dots
				//dotSeparator: 2,	// extra vertical space besides 5 dots
				dotFill: 'black',

				stroke: 'black',
				strokeWidth: 2,
				lineCap: 'square',

				// cursorOver: `url(${cursor_del}) 2 2, auto`,
			},
			// picsTooltip: {		// Cursor mouseover
			// 	src: `${base.scriptDir}/delete_icon.png`,
			// 	width: 20,
			// 	height: 20,
			// },


			// contains all cols as arays
			// entries: { 'c':<number of cuboids>, 'r':<number of rectangles>, 'b':<number of bars in col>, 'd':<number of dots in col> }
			data: [],

			enableScrolling: true,		// Enable horizontal scrolling when content exceeds width
			scrollingMethod: 'drag', // 'container' or 'drag'
			readonly: 0,
			logObjectId: 1,
		}
		mergeDeep( Object.assign( this, defaults ), opts );
		const sepExtraMult = 0.6;
		if ( !this.pics.cuboidDepth ) 	this.pics.cuboidDepth = this.pics.width*18/50;
		if ( !this.pics.barSpacing )	this.pics.barSpacing = this.pics.width/(9+sepExtraMult);
		if ( !this.pics.barSeparator )	this.pics.barSeparator = this.pics.barSpacing*sepExtraMult;
		if ( !this.pics.dotSpacing )	this.pics.dotSpacing = (this.pics.width-2*this.pics.radius)/(9+sepExtraMult);
		if ( !this.pics.dotSeparator )	this.pics.dotSeparator = this.pics.dotSpacing*sepExtraMult;

		this.base = base;
		const stage = base.stage;
		this.stage = stage;
		this.stage.width(opts.width || this.stage.width() );
		this.stage.height(opts.height || this.stage.height() );
		this.usedWidth = 0;
		this.iconbarWidth = 0;

		// this.tooltip = new tooltip( stage );
		// stage.on( 'mouseleave', () => this.tooltip.hide() );

		// Render iconBar
		const iconDepth = this.iconBar.width*this.pics.cuboidDepth/(this.pics.width+this.pics.cuboidDepth);
		const iconRadius = this.pics.radius*1.5;

		if(this.iconBar && this.iconBar.x !== undefined && this.iconBar.y !== undefined) {

			this.iconbarWidth = this.iconBar.width + this.iconBar.framePadding*2 + this.iconBar.frameWidth*2;
			this.x = this.iconBar.x + 2*this.iconbarWidth + 20;

			const iconBarOptsAdd = { ...this.iconBar, ...{
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
						cursorOver: `url(${cursor_add}) 2 2, auto`,
						on: () => this.addShape('c'),
						// modifier: 'plus',
					},
					{ kCreateFunc: function (x,y) {
						return this.rectangle({
							x: x+iconDepth/2, y: y+iconDepth/2,
							width: this.iconBar.width - iconDepth,
							strokeWidth: 1,
						})}.bind(this),
						// tooltipImage: this.iconBarTooltip,
						cursorOver: `url(${cursor_add}) 2 2, auto`,
						on: () => this.addShape('r'),
						// modifier: 'plus',
					},
					{ kCreateFunc: function (x,y) {
						return this.bar({
							x: x+iconDepth/2, y: y+this.iconBar.width/2,
							width: this.iconBar.width - iconDepth,
							strokeWidth: 2,
						})}.bind(this),
						// tooltipImage: this.iconBarTooltip,
						cursorOver: `url(${cursor_add}) 2 2, auto`,
						on: () => this.addShape('b'),
						// modifier: 'plus',
					},
					{ kCreateFunc: function (x,y) {
						return this.dot({
							// x: x+this.iconBar.width/2-iconRadius, y: y+this.iconBar.width/2-iconRadius,
							x: x+this.iconBar.width/2, y: y+this.iconBar.width/2,
							width: this.iconBar.width - iconDepth,
							radius: iconRadius,
						})}.bind(this),
						// tooltipImage: this.iconBarTooltip,
						cursorOver: `url(${cursor_add}) 2 2, auto`,
						on: () => this.addShape('d'),
						// modifier: 'plus',
					},
				],
			}}

			const iconBarOptsRemove = { ...this.iconBar, ...{
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
						cursorOver: `url(${cursor_del}) 2 2, auto`,
						on: (ev) => this.delShapeByType('c'),
						modifier: 'minus',
					},
					{ kCreateFunc: function (x,y) {
						return this.rectangle({
							x: x+iconDepth/2, y: y+iconDepth/2,
							width: this.iconBar.width - iconDepth,
							strokeWidth: 1,
						})}.bind(this),
						// tooltipImage: this.iconBarTooltip,
						cursorOver: `url(${cursor_del}) 2 2, auto`,
						on: () => this.delShapeByType('r'),
						modifier: 'minus',
					},
					{ kCreateFunc: function (x,y) {
						return this.bar({
							x: x+iconDepth/2, y: y+this.iconBar.width/2,
							width: this.iconBar.width - iconDepth,
							strokeWidth: 2,
						})}.bind(this),
						// tooltipImage: this.iconBarTooltip,
						cursorOver: `url(${cursor_del}) 2 2, auto`,
						on: () => this.delShapeByType('b'),
						modifier: 'minus',						
					},
					{ kCreateFunc: function (x,y) {
						return this.dot({
							// x: x+this.iconBar.width/2-iconRadius, y: y+this.iconBar.width/2-iconRadius,
							x: x+this.iconBar.width/2, y: y+this.iconBar.width/2,
							width: this.iconBar.width - iconDepth,
							radius: iconRadius,
						})}.bind(this),
						// tooltipImage: this.iconBarTooltip,
						cursorOver: `url(${cursor_del}) 2 2, auto`,
						on: () => this.delShapeByType('d'),
						modifier: 'minus',
					},
				],
			}}

			this.iconBarAdd = new iconBar( stage, {...iconBarOptsAdd, ...{highlightColor: '#ccffcc', frameColor: '#66ff66'}} ); 
			this.iconBarRemove = new iconBar( stage, {...iconBarOptsRemove, ...{x: this.iconBar.x + this.iconbarWidth + this.iconBar.spacing, highlightColor: '#ffcccc',  frameColor: '#ff6666'}} );

			this.stage.height(this.iconBar.y+this.iconBarAdd.getOverallHeight());
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
		// return this.usedWidth + this.pics.spacing + this.pics.width + ( shape=='c' ? this.pics.cuboidDepth : 0 ) <= this.width;
		return true;
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

		let scrollTo = 0;

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
						scrollTo = i < 0 ? this.data.length - 1 : i;
					}
				}

			} else {

				this.changeAndRearrangeBarsDots( cnt => cnt[shape]++, 'shapeAdded', shape );
				scrollTo = "end";

			}

			this.drawShapes();
		
			if ( scrollTo === 0 ) 
				this.scrollToStart();
			else if ( scrollTo > 0 )
				this.scrollToShape( scrollTo, 'center' );
			else if(scrollTo == "end")
				this.autoScrollToEnd();

			this.base.sendChangeState( this );
		}
	}

	delShapeByType (shape){
		let found = false;
		this.data.forEach((e,i) => {
			if( !found && ((shape=='c' && e.c>0 ) || ( shape=='r' && e.r>0 ) || ( shape=='b' && e.b>0 ) || ( shape=='d' && e.d>0 ) )){
				this.delShape(i, shape);
				found = true;
			}
		});		
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
		
		// Calculate total width needed
		let totalWidth = x;

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
				// setInteract( kObj, 'mousedown touchstart', () => this.delShape( nr ) );
				x += this.pics.width + this.pics.cuboidDepth;

			// Rectangle
			} else if ( dat.r ) {
				const kObj = this.rectangle( { x: x, y: y } );
				// setInteract( kObj, 'mousedown touchstart', () => this.delShape( nr ) );
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
						// setInteract( kObj, 'mousedown touchstart', () => this.delShape( nr, 'b' ) );
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
						// setInteract( kObj, 'mousedown touchstart', () => this.delShape( nr, 'd' ) );
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
		totalWidth = x;

		// Enable horizontal scrolling if content exceeds stage width
		if (this.enableScrolling) {
			if (this.scrollingMethod === 'drag') {
				this.enableDragScrolling();
			} else {
				this.enableHorizontalScrolling(totalWidth);
			}
		}

		if ( this.layer ) {
			this.layer.destroy();
		}
		this.layer = new_layer;
		this.stage.add( this.layer );
		this.layer.moveToBottom();
		
		// Restore scroll position if it exists
		if (this._shapesScrollOffset && this.enableScrolling) {
			this.layer.x(-this._shapesScrollOffset);
			
			// Re-apply clipping if needed
			const stageWidth = this.stage.width();
			const shapesStartX = this.x;
			const availableShapesWidth = stageWidth - shapesStartX;
			
			if (this.usedWidth > availableShapesWidth) {
				this.layer.clipFunc((ctx) => {
					ctx.rect(shapesStartX, 0, availableShapesWidth, this.stage.height());
				});
			}
		}
		
		// Create or update scrollbar
		this.createScrollbar();
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

	enableHorizontalScrolling(totalWidth) {
		const stageWidth = this.stage.width();
		const shapesStartX = this.x; // Where shapes start
		const shapesWidth = totalWidth - shapesStartX; // Width of shapes content
		const availableShapesWidth = stageWidth - shapesStartX; // Available width for shapes
		
		// Check if shapes content exceeds available width
		if (shapesWidth > availableShapesWidth) {
			// Create or update scrollable area for shapes only
			this.createScrollableShapesArea(shapesStartX, shapesWidth, availableShapesWidth);
		} else {
			// Remove scrolling if content fits
			this.removeScrollableShapesArea();
		}
	}

	createScrollableShapesArea(shapesStartX, shapesWidth, availableShapesWidth) {
		// Set up clipping and scrolling for the shapes layer only
		if (!this._shapesScrollOffset) {
			this._shapesScrollOffset = 0;
		}

		// Add scroll wheel event handling for shapes area
		if (!this._wheelHandler) {
			this._wheelHandler = (e) => {
				const pointer = this.stage.getPointerPosition();
				if (pointer && pointer.x >= shapesStartX) {
					e.preventDefault();
					
					const scrollSpeed = 20;
					const delta = e.deltaX || e.deltaY;
					const newOffset = this._shapesScrollOffset - (delta > 0 ? scrollSpeed : -scrollSpeed);
					
					// Clamp scroll offset - use total content width
					const maxScroll = Math.max(0, this.usedWidth - availableShapesWidth);
					this._shapesScrollOffset = Math.max(0, Math.min(maxScroll, newOffset));
					
					// Apply offset to shapes layer
					if (this.layer) {
						this.layer.x(-this._shapesScrollOffset);
						this.layer.batchDraw();
					}
					
					// Update scrollbar thumb position
					this.updateScrollbarThumbPosition();
				}
			};
			
			const container = this.stage.container();
			if (container) {
				container.addEventListener('wheel', this._wheelHandler);
			}
		}

		// Set up clipping rectangle for shapes area
		if (this.layer) {
			this.layer.clipFunc((ctx) => {
				ctx.rect(shapesStartX, 0, availableShapesWidth, this.stage.height());
			});
			this.layer.x(-this._shapesScrollOffset);
		}
	}

	removeScrollableShapesArea() {
		// Reset layer position and remove clipping
		if (this.layer) {
			this.layer.clipFunc(null);
			this.layer.x(0);
		}
		
		// Reset scroll offset
		this._shapesScrollOffset = 0;
		
		// Remove wheel handler
		if (this._wheelHandler) {
			const container = this.stage.container();
			if (container) {
				container.removeEventListener('wheel', this._wheelHandler);
			}
			this._wheelHandler = null;
		}
		
		// Remove scrollbar
		this.removeScrollbar();
	}

	// Alternative: Manual drag scrolling for shapes area only (with wheel support)
	enableDragScrolling() {
		// Clean up existing handlers first
		this.removeScrollableShapesArea();
		
		let isDragging = false;
		let startX = 0;
		let initialOffset = 0;
		const shapesStartX = this.x;
		
		if (!this._shapesScrollOffset) {
			this._shapesScrollOffset = 0;
		}

		// Helper function to update scroll position
		const updateScrollPosition = (newOffset) => {
			const stageWidth = this.stage.width();
			const availableShapesWidth = stageWidth - shapesStartX;
			const maxScroll = Math.max(0, this.usedWidth - availableShapesWidth);
			this._shapesScrollOffset = Math.max(0, Math.min(maxScroll, newOffset));
			
			// Apply offset to shapes layer only
			if (this.layer) {
				this.layer.x(-this._shapesScrollOffset);
				this.layer.batchDraw();
			}
			
			// Update scrollbar thumb position
			this.updateScrollbarThumbPosition();
		};

		// Drag scrolling
		this.stage.on('mousedown touchstart', (e) => {
			const pointer = this.stage.getPointerPosition();
			// Only enable drag scrolling in shapes area and if target is the layer or its children
			if (pointer && pointer.x >= shapesStartX && this.isTargetInScrollableLayer(e.target)) {
				e.evt.preventDefault();
				isDragging = true;
				startX = e.evt.clientX || e.evt.touches[0].clientX;
				initialOffset = this._shapesScrollOffset;
			}
		});
		
		this.stage.on('mousemove touchmove', (e) => {
			if (!isDragging) return;

			// if(!this.isTargetInScrollableLayer(e.target)) {
			// 	e.evt.preventDefault();
			// 	isDragging = false;
			// 	return;
			// }

			const currentX = e.evt.clientX || e.evt.touches[0].clientX;
			const deltaX = startX - currentX; // Reversed for natural scrolling
			const newOffset = initialOffset + deltaX;
			
			updateScrollPosition(newOffset);
		});
		
		this.stage.on('mouseup touchend', () => {
			isDragging = false;
		});

		// Add wheel scrolling support for drag method
		if (!this._wheelHandler) {
			this._wheelHandler = (e) => {
				const pointer = this.stage.getPointerPosition();
				if (pointer && pointer.x >= shapesStartX) {
					e.preventDefault();
					
					const scrollSpeed = 20;
					const delta = e.deltaX || e.deltaY;
					const newOffset = this._shapesScrollOffset + (delta > 0 ? scrollSpeed : -scrollSpeed);
					
					updateScrollPosition(newOffset);
				}
			};
			
			const container = this.stage.container();
			if (container) {
				container.addEventListener('wheel', this._wheelHandler);
			}
		}

		// Set up clipping for shapes area
		if (this.layer) {
			const availableShapesWidth = this.stage.width() - shapesStartX;
			this.layer.clipFunc((ctx) => {
				ctx.rect(shapesStartX, 0, availableShapesWidth, this.stage.height());
			});
		}
	}

	isTargetInScrollableLayer(target) {
		if (!this.layer || !target) return false;
		
		// Check if target is the layer itself
		if (target === this.layer) return true;
		
		// Check if target is a child of the scrollable layer
		let parent = target.getParent();
		while (parent) {
			if (parent === this.layer) return true;
			parent = parent.getParent();
		}
		
		return false;
	}

	autoScrollToEnd() {
		if (!this.enableScrolling || !this.layer) return;
		
		const stageWidth = this.stage.width();
		const shapesStartX = this.x;
		const availableShapesWidth = stageWidth - shapesStartX;
		
		// Only scroll if content exceeds available width
		if (this.usedWidth <= availableShapesWidth) return;
		
		// Calculate maximum scroll position (scroll to the end)
		const maxScroll = Math.max(0, this.usedWidth - availableShapesWidth);
		this._shapesScrollOffset = maxScroll;
		
		// Set up clipping if not already done
		// if (this.usedWidth > availableShapesWidth) {
		// 	this.layer.clipFunc((ctx) => {
		// 		ctx.rect(shapesStartX, 0, availableShapesWidth, this.stage.height());
		// 	});
		// }
		
		// Apply the scroll offset
		this.layer.x(-this._shapesScrollOffset);
		
		// Update display
		this.layer.batchDraw();
		this.updateScrollbarThumbPosition();
	}

	scrollToShape(shapeIndex, alignment = 'center') {
		if (!this.enableScrolling || !this.layer || shapeIndex < 0 || shapeIndex >= this.data.length) return;
		
		const stageWidth = this.stage.width();
		const shapesStartX = this.x;
		const availableShapesWidth = stageWidth - shapesStartX;
		
		// Only scroll if content exceeds available width
		if (this.usedWidth <= availableShapesWidth) return;
		
		// Calculate the x position of the target shape
		let shapeX = this.x;
		for (let i = 0; i < shapeIndex; i++) {
			const dat = this.data[i];
			
			if (dat.c) {
				shapeX += this.pics.width + this.pics.cuboidDepth;
			} else if (dat.r) {
				shapeX += this.pics.width;
			} else {
				// Bars and dots
				if (dat.b || dat.d > 9) {
					shapeX += this.pics.width;
				} else if (dat.d) {
					// Calculate actual width for dots less than 10
					const dotsInRow = Math.min(dat.d, 10);
					let dotWidth = 0;
					for (let h = 1; h <= dotsInRow; h++) {
						dotWidth += this.pics.dotSpacing;
						if (!(h % 5) && h < dotsInRow) {
							dotWidth += this.pics.dotSeparator;
						}
					}
					shapeX += dotWidth;
				}
			}
			shapeX += this.pics.spacing;
		}
		
		// Calculate the width of the target shape
		const dat = this.data[shapeIndex];
		let shapeWidth = 0;
		if (dat.c) {
			shapeWidth = this.pics.width + this.pics.cuboidDepth;
		} else if (dat.r) {
			shapeWidth = this.pics.width;
		} else {
			if (dat.b || dat.d > 9) {
				shapeWidth = this.pics.width;
			} else if (dat.d) {
				const dotsInRow = Math.min(dat.d, 10);
				for (let h = 1; h <= dotsInRow; h++) {
					shapeWidth += this.pics.dotSpacing;
					if (!(h % 5) && h < dotsInRow) {
						shapeWidth += this.pics.dotSeparator;
					}
				}
			}
		}
		
		// Calculate target scroll offset based on alignment
		let targetScrollOffset = 0;
		const relativeShapeX = shapeX - this.x; // Position relative to shapes start
		
		switch (alignment) {
			case 'left':
				// Align shape to left edge of visible area
				targetScrollOffset = relativeShapeX;
				break;
			case 'right':
				// Align shape to right edge of visible area
				targetScrollOffset = relativeShapeX + shapeWidth - availableShapesWidth;
				break;
			case 'center':
			default:
				// Center the shape in the visible area
				targetScrollOffset = relativeShapeX + (shapeWidth / 2) - (availableShapesWidth / 2);
				break;
		}
		
		// Clamp scroll offset to valid range
		const maxScroll = Math.max(0, this.usedWidth - availableShapesWidth);
		this._shapesScrollOffset = Math.max(0, Math.min(maxScroll, targetScrollOffset));
		
		// Apply the scroll offset
		this.layer.x(-this._shapesScrollOffset);
		
		// Update display
		this.layer.batchDraw();
		this.updateScrollbarThumbPosition();
	}

	scrollToStart() {
		if (!this.enableScrolling || !this.layer) return;
		
		// Reset scroll offset to 0 (beginning of content)
		this._shapesScrollOffset = 0;
		
		// Apply the scroll offset
		this.layer.x(-this._shapesScrollOffset);
		
		// Update display
		this.layer.batchDraw();
		this.updateScrollbarThumbPosition();
	}

	createScrollbar() {
		// Remove existing scrollbar
		this.removeScrollbar();
		
		if (!this.enableScrolling) return;
		
		const stageWidth = this.stage.width();
		const shapesStartX = this.x;
		const availableShapesWidth = stageWidth - shapesStartX;
		
		// Only show scrollbar if content exceeds available width
		if (this.usedWidth <= availableShapesWidth) return;
		
		// Scrollbar dimensions
		const scrollbarHeight = 24;
		const scrollbarY = this.stage.height() - scrollbarHeight - 5;
		const scrollbarWidth = availableShapesWidth - 10; // Leave some margin
		const scrollbarX = shapesStartX + 5;
		
		// Calculate thumb size and position
		const thumbRatio = availableShapesWidth / this.usedWidth;
		const thumbWidth = Math.max(20, scrollbarWidth * thumbRatio); // Minimum thumb width
		const maxThumbPosition = scrollbarWidth - thumbWidth;
		const scrollRatio = this._shapesScrollOffset / Math.max(1, this.usedWidth - availableShapesWidth);
		const thumbX = scrollbarX + (scrollRatio * maxThumbPosition);
		
		// Create scrollbar layer
		this._scrollbarLayer = new Konva.Layer();
		
		// Scrollbar track
		this._scrollbarTrack = new Konva.Rect({
			x: scrollbarX,
			y: scrollbarY,
			width: scrollbarWidth,
			height: scrollbarHeight,
			fill: '#e0e0e0',
			stroke: '#ccc',
			strokeWidth: 1,
			cornerRadius: 6,
		});
		
		// Scrollbar thumb
		this._scrollbarThumb = new Konva.Rect({
			x: thumbX,
			y: scrollbarY + 1,
			width: thumbWidth,
			height: scrollbarHeight - 2,
			fill: '#888',
			stroke: '#666',
			strokeWidth: 1,
			cornerRadius: 5,
		});
		
		// Add hover effects
		this._scrollbarThumb.on('mouseenter', () => {
			this._scrollbarThumb.fill('#666');
			this._scrollbarLayer.batchDraw();
		});
		
		this._scrollbarThumb.on('mouseleave', () => {
			this._scrollbarThumb.fill('#888');
			this._scrollbarLayer.batchDraw();
		});
		
		// Add scrollbar interactions
		this.addScrollbarInteractions(scrollbarX, scrollbarWidth, thumbWidth, maxThumbPosition, availableShapesWidth);
		
		// Add to layer and stage
		this._scrollbarLayer.add(this._scrollbarTrack);
		this._scrollbarLayer.add(this._scrollbarThumb);
		this.stage.add(this._scrollbarLayer);
		this._scrollbarLayer.moveToTop();
	}
	
	addScrollbarInteractions(scrollbarX, scrollbarWidth, thumbWidth, maxThumbPosition, availableShapesWidth) {
		let isThumbDragging = false;
		let startX = 0;
		let initialThumbX = 0;
		
		// Thumb dragging
		this._scrollbarThumb.on('mousedown touchstart', (e) => {
			isThumbDragging = true;
			startX = e.evt.clientX || e.evt.touches[0].clientX;
			initialThumbX = this._scrollbarThumb.x();
			e.cancelBubble = true;
		});
		
		// Track clicking (jump to position)
		this._scrollbarTrack.on('mousedown touchstart', (e) => {
			const pointer = this.stage.getPointerPosition();
			const clickX = pointer.x - scrollbarX;
			const newThumbX = Math.max(0, Math.min(maxThumbPosition, clickX - thumbWidth / 2));
			
			this.updateScrollFromThumbPosition(newThumbX, maxThumbPosition, availableShapesWidth);
			e.cancelBubble = true;
		});
		
		// Global mouse move and up for thumb dragging
		this.stage.on('mousemove touchmove', (e) => {
			if (!isThumbDragging) return;
			
			const currentX = e.evt.clientX || e.evt.touches[0].clientX;
			const deltaX = currentX - startX;
			// Convert absolute thumb position to relative position within scrollbar track
			const newAbsoluteThumbX = initialThumbX + deltaX;
			const newThumbX = Math.max(0, Math.min(maxThumbPosition, newAbsoluteThumbX - scrollbarX));

			this.updateScrollFromThumbPosition(newThumbX, maxThumbPosition, availableShapesWidth);
		});
		
		this.stage.on('mouseup touchend', () => {
			isThumbDragging = false;
		});
	}
	
	updateScrollFromThumbPosition(thumbX, maxThumbPosition, availableShapesWidth) {
		// Calculate scroll position from thumb position
		const scrollRatio = maxThumbPosition > 0 ? thumbX / maxThumbPosition : 0;
		const maxScroll = Math.max(0, this.usedWidth - availableShapesWidth);
		this._shapesScrollOffset = scrollRatio * maxScroll;
		
		// Update thumb position - thumbX is relative to scrollbar track start
		const scrollbarX = this.x + 5;
		this._scrollbarThumb.x(scrollbarX + thumbX);
		
		// Update layer position
		if (this.layer) {
			this.layer.x(-this._shapesScrollOffset);
			this.layer.batchDraw();
		}
		
		this._scrollbarLayer.batchDraw();
	}
	
	updateScrollbarThumbPosition() {
		if (!this._scrollbarThumb || !this.enableScrolling) return;
		
		const stageWidth = this.stage.width();
		const shapesStartX = this.x;
		const availableShapesWidth = stageWidth - shapesStartX;
		
		if (this.usedWidth <= availableShapesWidth) return;
		
		const scrollbarWidth = availableShapesWidth - 10;
		const scrollbarX = shapesStartX + 5;
		const thumbRatio = availableShapesWidth / this.usedWidth;
		const thumbWidth = Math.max(20, scrollbarWidth * thumbRatio);
		const maxThumbPosition = scrollbarWidth - thumbWidth;
		const scrollRatio = this._shapesScrollOffset / Math.max(1, this.usedWidth - availableShapesWidth);
		const thumbX = scrollRatio * maxThumbPosition;
		
		this._scrollbarThumb.x(scrollbarX + thumbX);
		this._scrollbarLayer.batchDraw();
	}
	
	removeScrollbar() {
		if (this._scrollbarLayer) {
			this._scrollbarLayer.destroy();
			this._scrollbarLayer = null;
			this._scrollbarTrack = null;
			this._scrollbarThumb = null;
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

	// Cleanup method
	destroy() {
		// Remove scroll handlers
		if (this._scrollHandler) {
			const container = this.stage.container();
			if (container) {
				container.removeEventListener('scroll', this._scrollHandler);
			}
		}
		
		if (this._wheelHandler) {
			const container = this.stage.container();
			if (container) {
				container.removeEventListener('wheel', this._wheelHandler);
			}
		}
		
		// Remove scrollbar
		this.removeScrollbar();
		
		// Clean up layer
		if (this.layer) {
			this.layer.destroy();
		}
		
		// Reset scroll offset
		this._shapesScrollOffset = 0;
	}

}
