import { delDefaults, mergeDeep, object_equals, getPosOfEvent, setStatePostProc, ignoreEvent, getAbsPosition } from './common'

import { iconBar } from './iconBar'

import Konva from 'konva/lib/Core'
import { Rect } from 'konva/lib/shapes/Rect'
import { Line } from 'konva/lib/shapes/Line'
import { Text } from 'konva/lib/shapes/Text'

import clearicon  from './img/clearicon.png'

export class inputGrid {

	constructor ( base, opts = {} ) {

		if ( base.fsm && base.fsm.incInitCnt ) {
			base.fsm.incInitCnt();
		}

		// Defaults to opts
		const defaultOpts = {
			x: 0,
			y: 0,
			grid: {
				cols: 10,
				rows: 10,
				stroke: 'lightgray',
				strokeWidth: 1,
			},
			cell: {
				width: 20,
				height: 20,
			},
			cellDefaults: {
				value: '',		// string to display
				width: 0,		// width of displayed string
				cellsUsed: 0,		// how many cells are needed to display string
				offsX: 0,		// x-offset of string in cell
				//style: 0,		// text mode (=undefined,0) or carry mode (=1)
				//ul: 0,		// cell underlined (=1)
			},
			cursorPos: {
				x: null,
				y: null,
			},
			data: [],		// [ [cell1, cell2], [..] ], values can be pre filled
			cellTextStyles: [
				{
					fontSize: 18,
					opacity: 1,
				},
				{
					fontSize: 9,
					opacity: 0.6,
				},
			],
			inputElemStyles: [{
				background: 'yellow',
				border: '1px solid black',
				'text-align': 'center',
				'font-size': '16px',
			},{
				background: 'lightgray',
				border: '1px solid black',
				'text-align': 'center',
				'font-size': '10px',
			}],

			mode: 'text',		// enable text mode if no iconbar present (no painting)

			inputRegExp: [		// which input are allowd (e.g. only digits?)
				null,				// "text" mode
				/^[0-9]{0,2}$/, 	// "carry" mode
			],
			singleCellChars: [		// which characters are always in single cells (regexp)?
				'[-0-9%/()=+*:<>⋅∶€,.]',	 // "text" mode
				'[0-9]{2}',			// "carry" mode
			],

			textModeBarDefs: {
				// x, y
				// width, height
				framePadding: 0,
				frameFill: 'white',
				spacing: 0,
				sticky: true,
				iconDefs: [ 'setTextMode', 'setCarryMode', 'toggleLine', 'textClearAll' ],
				// icons: [ .. ],
				default: 0,
			},

			textModeBarIconDefs: {
				setTextMode: () => ({
					text: {
						text: 'A',
						fontSize: 20,
						fontStyle: 'bold',
					},
					cursor: 'text',
					on: () => this.setTextMode(),	// setTextMode ist overwriten by addFreePaint
					off: () => this.setDefaultMode(),
				}),
				setCarryMode: () => ({
					text: {
						text: '1',
						fontSize: 12,
						// opacity: 0.7,
					},
					cursor: 'text',
					on: () => this.setCarryMode(),
					off: () => this.setDefaultMode(),
				}),
				toggleLine: () => ({
					kCreateFunc: (function (x,y,iconBar) {
						return new Konva.Line({
							points: [ x+5, y+iconBar.height-5, x+iconBar.width-5, y+iconBar.height-5 ],
							stroke: 'black',
							strokeWidth: 2,
						})
					}),
					on: () => this.toggleLine(),
				}),
				textClearAll: () => ({
					src: clearicon,
					on: () => this.textClearAll(),
				}),
			},

			lineBarDefs: {
				// x, y
				// width, height
				framePadding: 0,
				spacing: 0,
				sticky: false,
				icons: []
			},
		}
		mergeDeep( Object.assign( this, defaultOpts ), opts );
		this.base = base;
		const stage = base.stage;
		this.stage = stage;

		this.layer = new Konva.Layer();
		stage.add( this.layer );

		this.drawGrid();

		// fill data
		this.initialData = mergeDeep( {}, this.data );
		for ( let row=0; row<this.grid.rows; row++ ) {
			if ( !Array.isArray(this.data[row]) ) {
				this.data[row] = [];
			}
			for ( let col=0; col<this.grid.cols; col++ ) {
				let cell = Object.assign( {}, this.cellDefaults );
				if ( typeof this.data[row][col] === 'object' ) {
					Object.assign( cell, this.data[row][col] );
					this.data[row][col] = cell;
					this.drawCell( { x: col, y: row } );
				}
				this.data[row][col] = cell;
			}
		}

		// create input element
		this.inputElement = document.createElement( 'input' );
		Object.assign( this.inputElement.style, {
			visibility: 'hidden',
			position: 'absolute',
			'box-sizing': 'border-box',
			width: this.cell.width+'px',
			height: this.cell.height+'px',
		}, this.inputElemStyles[0] );
		document.body.appendChild( this.inputElement );
		// this.setInputTo( this.cursorPos );

		const handler = {
			keydown: this.evKeydown,
			input: this.evInput,
			blur: this.removeInput.bind( this, false ),
		}
		for ( let k in handler ) {
			this.inputElement.addEventListener( k, handler[k].bind(this) );
		}

		// textModeBar
		if ( this.textModeBarDefs ) {
			if ( !this.textModeBarDefs.width ) {
				this.textModeBarDefs.width = 1.5*this.cell.width-2;
				this.textModeBarDefs.height = 1.5*this.cell.height-2;
			}
			if ( !( 'x' in this.textModeBarDefs ) ) {
				this.textModeBarDefs.x = this.x - 1.5*this.cell.width - 10;
			}
			if ( !( 'y' in this.textModeBarDefs ) ) {
				this.textModeBarDefs.y = this.y;
			}
			if ( this.textModeBarDefs.iconDefs ) {
				this.textModeBarDefs.icons = this.textModeBarDefs.iconDefs.map( f =>
					typeof this.textModeBarIconDefs[f] === 'function' ?
						this.textModeBarIconDefs[f].call(this) : this.textModeBarIconDefs[f] );
			}
			if ( this.textModeBarDefs.icons.length ) {
				this.textModeBar = new iconBar( stage, this.textModeBarDefs );
			}
		}

		// additional inits
		this.initData = this.getChState();
		this.base.sendChangeState( this );	// init & send changeState & score

		this.reToNextCell = this.singleCellChars.map( sre => new RegExp( `^(?:(${sre})(.*)|(.+)(${sre}.*))`, 'u' ) );

		// interactivity
		const w = this.grid.cols*this.cell.width;
		const h = this.grid.rows*this.cell.height;
		const xEnd = this.x + w;
		const yEnd = this.y + h;
		this.kClickField = new Konva.Rect({
			x: this.x, y: this.y,
			width: w, height: h,
			opacity: 0,
		})
		// this.paintLayer.add( this.kClickField );
		this.layer.add( this.kClickField );
		const events = {

			'click tap': (ev) => {
				if ( this.mode=='text' || this.mode=='carry' ) {
					const cell = this.cellClip( this.getCell( getPosOfEvent( this.stage, ev ) ) );
					if ( cell.x>=0 && cell.y<this.grid.rows &&
							cell.y>=0 && cell.y<this.grid.rows ) {
						this.setInputTo( cell );
					}
				}
			},

			// // set textcursor, when modeIconBar not present
			// mouseenter: () => {
			// 	if ( this.mode==='text' && document.body.style.cursor!=='text' ) {
			// 		document.body.style.cursor = 'text';
			// 	}
			// },

			// mouseleave: (ev) => {
			// 	if ( ignoreEvent( this.stage, ev ) ) {
			// 		return;
			// 	}
			// 	if ( this.mode==='text' && document.body.style.cursor==='text' ) {
			// 		const pos = getPosOfEvent( this.stage, ev );
			// 		if ( pos.x<this.x || pos.x>xEnd || pos.y<this.y || pos.y>yEnd ) {
			// 			document.body.style.cursor = 'default';
			// 		}
			// 	}
			// },
		}
		for ( let ev in events ) {
			this.kClickField.on( ev, events[ev] );
		}

		this.stage.draw();

		if ( base.fsm && base.fsm.decInitCnt ) {
			base.fsm.decInitCnt();
		}
	}

	///////////////////////////////////

	drawGrid () {

		// rows
		let height = this.cell.height;
		let width = this.grid.cols*this.cell.width;
		for ( let row=this.grid.rows+1; row--; ) {
			const o = Object.assign( {}, this.grid );
			const h = row*height + this.y;
			o.points = [ this.x, h, this.x+width, h ];
			this.layer.add( new Konva.Line( o ) );
		}

		// cols
		height = this.grid.rows*this.cell.height;
		width = this.cell.width;
		for ( let col=this.grid.cols+1; col--; ) {
			const o = Object.assign( {}, this.grid );
			const w = col*width + this.x;
			o.points = [ w, this.y, w, this.y+height ];
			this.layer.add( new Konva.Line( o ) );
		}
	}

	// calc width, cells, offsX
	drawCell ( pos ) {

		const cell = this.data[ pos.y ][ pos.x ];
		if ( ( cell.value.length || cell.style || cell.ul ) || ( cell.kText || cell.kUnderline ) ) {

			if ( cell.value.length || cell.kText ) {
				if ( !cell.kText ) {
					const textStyles = this.cellTextStyles[ cell.style || 0 ];
					cell.kText = new Konva.Text( textStyles );
					this.layer.add( cell.kText );
					cell.startY = this.y + ( pos.y + 0.5 )*this.cell.height;
					cell.startX = this.x + ( pos.x + 0.5 )*this.cell.width;
					cell.kText.on( 'click tap', (ev) => {
						if ( this.mode=='text' || this.mode=='carry' ) {
							this.setInputTo( pos )
							ev.cancelBubble = true;
						}
					});
					cell.oldStyle = cell.style;
				} else {
					if ( cell.oldStyle != cell.style ) {
						cell.oldStyle = cell.style;
						const textStyles = this.cellTextStyles[ cell.style || 0 ];
						cell.kText.setAttrs( textStyles );
					}
				}
				cell.kText.text( cell.value );
				const w = cell.kText.width();
				cell.width = w;
				cell.cellsUsed = Math.ceil( (w+2) / this.cell.width );
				cell.offsX = ( cell.cellsUsed==1 ? -w/2 : -this.cell.width/2 + 2 );

				cell.kText.x( cell.startX + cell.offsX );
				cell.kText.y( cell.startY - cell.kText.height()/2 );
			}

			// Underline?
			if ( cell.ul ) {
				const x1 = this.x + pos.x*this.cell.width-1;
				const x2 = x1 + ( cell.cellsUsed || 1 )*this.cell.width+1;
				const y = this.y + (pos.y+1)*this.cell.height - 1;

				if ( !cell.kUnderline ) {
					cell.kUnderline = new Konva.Line({
 						points: [ x1, y, x2, y ],
						stroke: 'black',
						strokeWidth: 2,
					});
					this.layer.add( cell.kUnderline );

				} else if ( cell.kUnderline.points()[2] != x2 ) {
					cell.kUnderline.points( [ x1, y, x2, y ] );
				}

			} else if ( cell.kUnderline ) {
				cell.kUnderline.destroy();
				delete cell.kUnderline;
			}
		}
	}

	///////////////////////////////////

	evKeydown (ev) {

		let stop = false;
		const inp = this.inputElement;
		if (this.cursorPos.x!==null ) {
			const y = this.cursorPos.y;
			let x = this.cursorPos.x;
			const empty = inp.value.length==0;

			this.logKey( 'keyDown', inp.selectionStart, ev );

			switch( ev.key ) {
				case 'ArrowRight':
					if ( inp.value.length<2 || inp.selectionStart==inp.value.length && inp.selectionStart==inp.selectionEnd ) {
						this.nextCell();
						stop = true;
					}
					break;
				case 'ArrowLeft':
					if ( inp.value.length<2 || inp.selectionStart==0 && inp.selectionEnd==0 ) {
						this.prevCell()
						stop = true;
					}
					break;
				case 'ArrowUp':
					this.setInputTo( this.cellClip( { x:this.cursorPos.x, y:this.cursorPos.y-1 } ) );
					stop = true;
					break;
				case 'ArrowDown':
					this.setInputTo( this.cellClip( { x:this.cursorPos.x, y:this.cursorPos.y+1 } ) );
					stop = true;
					break;
				case 'Escape':
					this.removeInput( true );
					stop = true;
					break;
				case 'Enter':
					this.procEnter();
					stop = true;
					break;
				case 'Backspace':
					if ( this.procDel() ) {
						stop = true;
					}
					break;
				case 'Home':
					if ( inp.value.length<2 ) {
						while ( x>0 && this.data[ y ][ x-1 ].value.length==1 ) {
							x--;
						}
						stop = true;
					}
					if ( x==this.cursorPos.x && empty  ) {
						x = 0;
					}
					if ( stop ) {
						this.setInputTo( this.cellClip( { x, y } ) );
					}
					break;
				case 'End':
					if ( inp.value.length<2 ) {
						while ( x<this.grid.cols-1 && this.data[ y ][ x+1 ].value.length==1 ) {
							x++;
						}
						stop = true;
					}
					if ( x==this.cursorPos.x && empty  ) {
						x = this.grid.cols-1;
					}
					if ( stop ) {
						this.setInputTo( this.cellClip( { x, y } ) );
					}
					break;
			}
		}

		if ( stop ) {
			ev.preventDefault();
			ev.stopPropagation();
		}
// else console.log( 'DOWN', ev );
	}

	// evaluate new input field value
	evInput () {

		let inp = this.inputElement.value;
		const style = this.inputElement.dataset.style || 0;

		// Input allowed?
		const inputRegExp = this.inputRegExp[ style ];
		if ( inputRegExp ) {
			if ( !inp.match( inputRegExp ) ) {
				inp = this.inputElement.oldInputValue;
				this.inputElement.value = inp;
				this.base.postLog( 'inputReverted', { toText: inp } );
				this.base.triggerInputValidationEvent();
			}
		}

		// go to next cell?
		if ( inp===' ' ) {
			this.inputElement.value = '';
			this.nextCell();
		} else {
			const re = inp.match( this.reToNextCell[ style ] );
			if ( re ) {
				this.inputElement.value = re[1] ? re[1] : re[3];
				const newVal = re[1] && re[1].length ? re[2] : re[4];
				this.nextCell( newVal && newVal.length ? newVal : null );
			}
		}

		// set width of input field, restrict input
		if ( inp.length>1 ) {
			// render new input
			const cell = this.data[ this.cursorPos.y ][ this.cursorPos.x ];
			const oldInp = cell.value;
			cell.value = this.inputElement.value;
			this.drawCell( this.cursorPos );
			// get Width
			const cellsUsed = Math.max( cell.cellsUsed, 1 );
			// restore & render old value
			cell.value = oldInp;
			this.drawCell( this.cursorPos );

			if ( this.cursorPos.x + cellsUsed > this.grid.cols ) {
				this.inputElement.value = this.inputElement.oldInputValue;
			} else {
				const newWidth = cellsUsed * this.cell.width;
				this.inputElement.style.width = newWidth+'px';
				this.base.postLog( 'inputWidthChanged', { cells: cellsUsed } );
			}
		}

		this.inputElement.oldInputValue = this.inputElement.value;
		this.base.sendChangeState( this );	// init & send changeState & score
	}

	///////////////////////////////////

	getCoord ( pos ) {
		return {
			x: this.x + pos.x*this.cell.width,
			y: this.y + pos.y*this.cell.height,
		}
	}

	getCell ( pos ) {
		return {
			x: Math.floor( ( pos.x - this.x ) / this.cell.width ),
			y: Math.floor( ( pos.y - this.y ) / this.cell.height ),
		}
	}

	prevCell (newCellVal) {
		let nx, ny;
		if ( this.cursorPos.x !== null ) {
			nx = this.cursorPos.x-1;
			ny = this.cursorPos.y;
			if ( nx < 0 ) {
				ny--;
			}
		} else {
			nx = 0;
			ny = 0;
		}

		this.setInputTo( this.cellClip( { x:nx, y:ny } ), newCellVal );
	}

	nextCell (newCellVal) {
		let nx, ny;
		if ( this.cursorPos.x !== null ) {
			const oldPos = this.cursorPos;
			// remove Input: render Input in Grid, set width
			this.removeInput();
			nx = oldPos.x + Math.max( this.data[ oldPos.y ][ oldPos.x ].cellsUsed, 1 );
			ny = oldPos.y;
			if ( nx >= this.grid.cols ) {
				ny++;
			}
		} else {
			nx = 0;
			ny = 0;
		}

		this.setInputTo( this.cellClip( { x:nx, y:ny } ), newCellVal );
	}

	// clip cell pos, serach cell to the left overlapping this cell
	cellClip ( pos ) {

		if ( pos.x < 0 ) {
			pos.x = this.grid.cols-1;
		} else if ( pos.x >= this.grid.cols ) {
			pos.x = 0;
		}
		if ( pos.y < 0 ) {
			pos.y = this.grid.rows-1;
		} else if ( pos.y >= this.grid.rows ) {
			pos.y = 0;
		}

		// search cell to the left with text overlapping this cell
		const row = this.data[ pos.y ];
		for ( let tx = pos.x; tx>=0; tx-- ) {
			if ( tx + row[tx].cellsUsed > pos.x ) {
				pos.x = tx;
				tx = -1;
			}
		}

		return pos;
	}

	procEnter () {
		const y = this.cursorPos.y+1;
		let x;
		if ( y<this.grid.rows ) {
			x = Math.max( this.cursorPos.x, 0 );
			while ( x>1 && this.data[ y-1 ][ x-1 ].value.length ) {
				x--;
			}
			this.removeInput();
			this.setInputTo( { x, y } );
		}
	}

	procDel () {
		if ( this.inputElement.selectionStart==0 && this.inputElement.selectionEnd==0 ) {
			this.prevCell('');
			return true;
		}
		return false;
	}

	///////////////////////////////////

	// set active cell, show input field
	setInputTo ( cursorPos, newValue=null ) {
		this.removeInput();

		const inp = this.inputElement;
		const cell = this.data[ cursorPos.y ][ cursorPos.x ];
		inp.oldInputValue = cell.value;
		inp.value = newValue!==null ? newValue : cell.value;
		if ( cell.style ) {
			inp.dataset.style = 1;
			cell.style = 1;
			if ( this.mode!='carry' ) {
				this.textModeBar.clickOn(1);
			}
		} else {
			inp.removeAttribute( 'data-style' );
			if ( this.mode!='text' ) {
				this.textModeBar.clickOn(0);
			}
		}
		inp.setSelectionRange( 0, cell.value.length )
		const stageBox = getAbsPosition( this.stage.container() );
		Object.assign( inp.style, {
			left: ( stageBox.left + this.x + cursorPos.x*this.cell.width )+'px',
			top: ( stageBox.top + this.y + cursorPos.y*this.cell.height )+'px',
			width: ( cell.cellsUsed<2 ? this.cell.width : cell.cellsUsed*this.cell.width )+'px',
			visibility: 'visible',
		}, this.inputElemStyles[ cell.style || 0 ] );
		this.inputElement.focus();

		this.cursorPos = cursorPos;
		this.base.postLog( 'cellSelected', cursorPos );

		if ( newValue !== null ) {
			this.evInput();
		}
	}

	// remove visible input field
	removeInput ( discard=false ) {
		const inp = this.inputElement;
		if ( inp.style.visibility !== 'hidden' ) {
			const cell = this.data[ this.cursorPos.y ][ this.cursorPos.x ];
			if ( !discard && ( inp.value !== cell.value || inp.dataset.style !== cell.style ) ) {

				cell.value = inp.value;
				if ( inp.dataset.style && inp.value ) {
					cell.style = inp.dataset.style;
				} else {
					delete cell.style;
				}

				this.drawCell( {
					x: this.cursorPos.x,
					y: this.cursorPos.y,
				} );

				// delete overwritten cells
				for ( let x=this.cursorPos.x+cell.cellsUsed-1; x>this.cursorPos.x; x-- ) {
					if ( x<this.grid.cols ) {
						const del = this.data[ this.cursorPos.y ][ x ];
						if ( del.value.length ) {
							del.value = '';
							delete cell.style;
							this.drawCell( {
								x: x,
								y: this.cursorPos.y,
							} );
							this.base.postLog( 'cellOverwritten', { x, y:this.cursorPos.y } );
						}
					}
				}

				const extraLog = {};
				if ( cell.style ) {
					extraLog.st = 'sub';
				}
				if ( cell.ul ) {
					extraLog.ul = 1;
				}
				this.base.postLog( 'cellSet', Object.assign( {}, this.cursorPos, { text: inp.value, ...extraLog } ) );
				this.layer.batchDraw();
			}
			inp.style.visibility = 'hidden';
		}
		this.cursorPos = { x:null, y:null };

		this.base.sendChangeState( this );	// init & send changeState & score
	}

	///////////////////////////////////

	logKey ( logEvent, pos, keyEvent=null, data={} ) {

		if ( pos!==null ) {
			data.pos = pos;
		}

		if ( keyEvent ) {
			[ 'key', 'code', 'shiftKey', 'altKey', 'ctrlKey', 'metaKey', 'isComposing', 'repeat' ].forEach( k => {
				if ( keyEvent[k] ) {
					data[k] = keyEvent[k];
				}
			})
			data.which = keyEvent.which || keyEvent.keyCode;
		}

		this.base.postLog( logEvent, data );
	}

	///////////////////////////////////

	textClearAll () {

		this.base.postLog( 'textClearAll', {} );

		this.inputElement.value='';

		// overwrite changed cells with values form this.initialData
		for ( let row=0; row<this.grid.rows; row++ ) {
			for ( let col=0; col<this.grid.cols; col++ ) {
				if ( ( this.data[row][col].value != ( this.initialData[row] && this.initialData[row][col] ? this.initialData[row][col].value : '' ) ) ||
					 ( this.data[row][col].style !== ( this.initialData[row] && this.initialData[row][col] ? this.initialData[row][col].style : undefined ) ) ||
					 ( this.data[row][col].ul !== ( this.initialData[row] && this.initialData[row][col] ? this.initialData[row][col].ul : undefined ) ) ) {

					delete this.data[row][col].style;
					delete this.data[row][col].ul;
					Object.assign(
						this.data[row][col],
						this.cellDefaults,
						this.initialData[row] && this.initialData[row][col] ? this.initialData[row][col] : {}
					);
					this.drawCell( { x: col, y: row } );
				}
			}
		}
		this.layer.draw();

		this.textModeBar.clickOn(0);

		this.base.sendChangeState( this );	// init & send changeState & score
	}

	///////////////////////////////////

	setTextMode () {
		this.mode = 'text';
		const inp = this.inputElement;
		if ( inp.style.visibility !== 'hidden' && inp.dataset.style==1 ) {
			if ( inp.value.length>1 ) {
				inp.value='';
			}
			Object.assign( inp.style, this.inputElemStyles[0] );
			inp.removeAttribute( 'data-style' );
		}
		this.base.postLog( 'modeSet', { mode: 'text' } );
	}

	setCarryMode () {
		const inp = this.inputElement;
		if ( inp.style.visibility !== 'hidden' ) {
			this.mode = 'carry';
			if ( !inp.dataset.style ) {
				if ( !inp.value.match( this.inputRegExp[1] ) ) {
					inp.value='';
				}
				Object.assign( inp.style, this.inputElemStyles[1] );
				inp.dataset.style = 1;
			}
			this.base.postLog( 'modeSet', { mode: 'text sub' } );
		} else {
			this.textModeBar.clickOn(0);
		}
	}

	setNoneMode () {
		this.removeInput();
		if ( this.mode != 'none' ) {
			this.mode = 'none';
			this.base.postLog( 'modeSet', { mode: 'none' } );
		}
	}

	toggleLine () {
		if ( this.cursorPos.x !== null ) {
			const cell = this.data[ this.cursorPos.y ][ this.cursorPos.x ];
			const del = cell.ul;
			const y = this.cursorPos.y;

			let x1, x2;
			for ( x1=this.cursorPos.x; x1>0 && this.data[y][x1].value; x1-- );
			for ( x2=this.cursorPos.x; x2<this.grid.cols && this.data[y][x2].value; x2++ );

			this.removeInput();
			for ( let x=x1; x<=x2; x++ ) {
				const c = this.data[y][x]
				if ( del ) {
					delete c.ul;
				} else {
					c.ul = 1;
				}
				this.drawCell( { x, y } );
			}
			this.layer.batchDraw();

			this.base.postLog( `underline${ del ? 'Removed' : 'Set'}`, { row:y+1, colFrom: x1+1, colTo: x2+1 } );
		}

		// activate textModeBar icon[0], if not "toggleLine"
		if ( !this.textModeBar.isActive(0) ) {
			this.textModeBar.clickOn(0);
		} else {
			this.textModeBar.deactivate();
		}
	}

	setDefaultMode () {
		if ( this.textModeBar ) {
			setTimeout( () => {
				let modeBars = this.textModeBar.shareModesWith || [ this.textModeBar ];
				if ( typeof modeBars === 'function' ) {
					modeBars = modeBars();
				}
				if ( modeBars.every( bar => bar.active === null ) ) {
					if ( !this.textModeBar.disabled ) {
						this.textModeBar.clickOn(0);
					} else if ( !this.modeIconBar.disabled ) {
						this.modeIconBar.clickOn(0);
					} else {
						this.setNoneMode();
					}
				}
			})
		}
	}

	///////////////////////////////////

	getState () {

		// create shortened copy of this.data
		const data_copy = [];
		this.data.forEach( drow => {
			const row = drow.map( cell => delDefaults( cell, this.cellDefaults, ['kText','kUnderline','width','offsX','cellsUsed','startX','startY','oldStyle'] ) );
			data_copy.push( row.some( cell => Object.keys(cell).length>0 ) ? row : [] );
		});

		const state = {
			data: data_copy,
		}

		return JSON.stringify( state );
	}

	setState (state) {

		try {

			const obj = JSON.parse(state);

			// reconstruct this.data
			Array.from( this.layer.getChildren() ).forEach( c => {
				if ( c!=this.kClickField ) {
					c.destroy();
				}
			})
			this.drawGrid();

			if ( obj.data && this.data.length ) {
				for ( let y=0; y<this.grid.rows; y++ ) {
					if ( Array.isArray( this.data[y] ) ) {
						this.data[y] = [];
					}

					for ( let x=0; x<this.grid.cols; x++ ) {
						this.data[y][x] = Object.assign( {}, this.cellDefaults, obj.data[y][x] || {} );
						this.drawCell( { x, y } );
					}
				}
			}

			this.kClickField.moveToTop();
			this.stage.draw();

		} catch (e) {
			console.error(e);
		}

		setStatePostProc(this);
	}

	getChState () {
		return {
			data: this.data.map( line => line.map( cell => cell.value ) ),
		}
	}

	// Check if User made changes
	getDefaultChangeState () {
		return !object_equals( this.getChState(), this.initData );
	}
}

//////////////////////////////////////////////////////////////////////////////

import { addFreePaintTo, addInsertButtonsTo } from './class_extensions'

function inserButtonsDefFunc ( defs ) {
	mergeDeep( defs.insertIconBarDef, {
		x: this.x + this.grid.cols*this.cell.width + 10,
		y: this.y,
		width: 1.5*this.cell.width-2,
		height: 1.5*this.cell.height-2,
	});
}

export const inputGrid_InsertButtons = addInsertButtonsTo(

	// extended class
	inputGrid,

	// extra addDefaults = return of function.call(this)
	inserButtonsDefFunc,

	// function called after inserting characters in input
	function () {
		this.evInput();
	}
);

///////////////////////////////////////

export const inputGrid_freePaint_InsertButtons = addInsertButtonsTo(

	// class to extend
	addFreePaintTo(

		inputGrid,

		1, 0,

		// Extra Defaults to modeIconBarDef
		function (defs) {

			let shareModesWith = undefined;
			if ( this.textModeBar ) {
				shareModesWith = () => [ this.textModeBar, this.modeIconBar ];
				this.textModeBar.shareModesWith = shareModesWith;
			}
			const padding = 1;
			mergeDeep( defs.modeIconBarDef, {
				x: 'x' in defs.modeIconBarDef ? defs.modeIconBarDef.x : this.x - 1.5*this.cell.width - 10,
				y: 'y' in defs.modeIconBarDef ? defs.modeIconBarDef.y :
						( this.textModeBar ? this.textModeBar.y + this.textModeBar.getOverallHeight() + 1.5*this.cell.height : this.y ),
				framePadding: padding,
				width: 1.5*this.cell.width-2-2*padding,
				height: 1.5*this.cell.height-2-2*padding,
				default: null,
				shareModesWith,
			});

			// new freePaintClearAll & setPaintMode
			const oldfreePaintClearAll = this.freePaintClearAll;
			this.freePaintClearAll = function () {
				oldfreePaintClearAll.call(this);
				this.setDefaultMode();
			};
			const oldSetPaintMode = this.setPaintMode;
			this.setPaintMode = function (mode) {
				if ( this.mode=='text' || this.mode=='carry' ) {
					this.setNoneMode();
				}
				oldSetPaintMode.call(this,mode);
			}

			// call setDefaultMode when paint icon is deactivated
			if ( this.textModeBar ) {
				defs.modeIconBarDef.icons.forEach( (v,k) => {
					if ( k < defs.modeIconBarDef.icons.length-1 ) {
						v.off = () => this.setDefaultMode();
					}
				})
			}
		}
	),

	// extra addDefaults = return of function.call(this)
	inserButtonsDefFunc,

	// function called after inserting characters in input
	function () {
		this.evInput();
	}
);

///////////////////////////////////////

export class inputGrid_freePaint_InsertButtons_grayOut extends inputGrid_freePaint_InsertButtons {

	constructor ( base, opts = {} ) {

		if ( base.fsm && base.fsm.incInitCnt ) {
			base.fsm.incInitCnt();
		}

		super( base, opts );

		// Gray out all draw/non-draw Icons
		if ( this.textModeBar ) {
			this.grayOutAll = function () {
				const drawIsGrayed = this.modeIconBar.active == null;
				let redraw = false;
				const layer = this.stage.getAttr('bw__IconBarLayer');
				layer.getChildren().forEach( kGroup => {
					const grayNow = kGroup==this.modeIconBar.kGroup ? drawIsGrayed : !drawIsGrayed;
					const opacity = grayNow ? 0.3 : 1;
					kGroup.getChildren().forEach( kObj => {
						if ( !kObj.getAttr('dontGrayOut') ) {
							const oldOpacity = kObj.opacity();
							if ( oldOpacity != opacity ) {
								kObj.opacity( opacity );
								redraw = true;
							}
						}
					})
				})
				if ( redraw ) {
					layer.batchDraw();
				}
			}

			const bars = [ this.modeIconBar, this.textModeBar ].concat( this.insertIconBars );
			const me = this;

			// patch all activate methods to call this.grayOutAll
			bars.forEach( bar => {
				const oldActivate = bar.activate;
				bar.activate = function () {
					oldActivate.apply( bar, arguments );
					setTimeout( me.grayOutAll.bind(me), 1 );
				}
			})

			// call this.grayOutAll when all iconBars loaded
			Promise.all( bars.map( bar => bar.initDone) )
				.then( me.grayOutAll.bind(me) );
		}

		if ( base.fsm && base.fsm.decInitCnt ) {
			base.fsm.decInitCnt();
		}
	}
}

///////////////////////////////////////

import penicon from './img/penicon.png'

export class inputGrid_freePaint_InsertButtons_switch extends inputGrid_freePaint_InsertButtons {

	constructor ( base, opts = {} ) {

		if ( base.fsm && base.fsm.incInitCnt ) {
			base.fsm.incInitCnt();
		}

		// default mode 'null'
		if ( !('mode' in opts) ) {
			opts.mode = null;
		}

		super( base, opts );

		if ( opts.switchModeBarDef === null ) {
			return;
		}

		// component id used in triggerEvents
		if ( !this.compEventId ) {
			const udipa = this.base.fsm.userDefIdPath ? this.base.fsm.userDefIdPath.split('=') : [];
			this.compEventId = udipa.length>1 && udipa[ udipa.length-1 ].length>1 ? `_${ udipa[ udipa.length-1 ] }` : '';
		}

		// Options for switchModeBar
		const switchModeBarDef = Object.assign({
				x: this.textModeBar.x,
				y: this.y,
				height: 1.5*this.cell.height - 2,
				width: 3*1.5*this.cell.width,
				framePadding: 0,
				spacing: 0,
				dist: 10,
				bars: [ [ this.textModeBar ].concat( this.insertIconBars ), [ this.modeIconBar ] ],
				isSticky: true,
				frameFill: 'white',
				highlightColor: '#fcedeb',
			},
			opts.switchModeBarDef || {}
		);

		if ( !( 'icons' in switchModeBarDef ) ) {

			const defaultTextOptions = {
				align: 'left',
				verticalAlign: 'middle',
				fontSize: 16,
			}
			const imgWidth = switchModeBarDef.height;
			switchModeBarDef.icons = [
				{
					// A tippen
					kCreateFunc: ( x, y ) => [

						new Konva.Text( Object.assign( {}, defaultTextOptions, {
							text: 'A',
							fontSize: 20,
							align: "center",
							fontStyle: 'bold',
							x: x,
							y: y,
							width: imgWidth,
							height: switchModeBarDef.height,
						})),

						new Konva.Text( Object.assign( {}, defaultTextOptions, {
							text: 'Tippen',
							x: x + imgWidth -1,
							y: y + 1,
							width: switchModeBarDef.width - imgWidth,
							height: switchModeBarDef.height,
						})),

					],
					on: this.iconBarOn.bind( this, 0 ),
					off: () => {
						this.setNoneMode();
						this.iconBarOff( 0 );
					},
				},
				{
					extraSpace: switchModeBarDef.dist,
				},
				{
					// | Stift
					kCreateFunc: ( x, y ) => [

						new Promise( res => {
							const image = new Image();
							image.onload = () => res(image);
							image.src = penicon;
						}).then( image => new Konva.Image({
							image,
							x: x+3,
							y: y+3,
							width: imgWidth-6,
							height: switchModeBarDef.height-6,
						})),

						new Konva.Text( Object.assign( {}, defaultTextOptions, {
							text: 'Stift',
							x: x + imgWidth +1,
							y: y + 1,
							width: switchModeBarDef.width - imgWidth,
							height: switchModeBarDef.height,
						})),

					],
					on: this.iconBarOn.bind( this, 1 ),
					off: this.iconBarOff.bind( this, 1 ),
				},
			]
		}

		// create switchModeBar
		this.switchModeBar = new iconBar( base.stage, switchModeBarDef );
		this.setAllOff();

		// send event on clik when no Mode active
		this.kClickField.on( 'click tap', () => {
			if ( this.switchModeBar.active === null ) {
				this.base.fsm.triggerEvent( `EV_ClickWithoutIconBarMode${ this.compEventId }` );
				// if ( this.FSMVariableName ) {
				// 	this.base.fsm.triggerEvent( `EV_ClickWithoutIconBarMode_${ this.FSMVariableName }` );
				// }
				// this.base.fsm.triggerEvent( 'EV_ClickWithoutIconBarMode' );
			}
		});

		// set mode on message from IB
		const me = this;
		window.addEventListener( "message", (ev) => {
			if ( ev.data ) {
				try {
					const data = JSON.parse(ev.data);
					if ( data == "SetIconBarOff" ) {
						this.switchModeBar.deactivate();
					}
					if ( data == "SetIconBarText" ) {
						this.switchModeBar.deactivate();
						this.switchModeBar.clickOn(0);
					}
					if ( data == "SetIconBarPaint" ) {
						this.switchModeBar.deactivate();
						this.switchModeBar.clickOn(2);
					}
				} catch(e) {}
			}
		});

		if ( base.fsm && base.fsm.decInitCnt ) {
			base.fsm.decInitCnt();
		}
	}

	setAllOff () {
		this.iconBarOff(0);
		this.iconBarOff(1);
	}

	iconBarOff (i) {
		this.switchModeBar.bars[i].forEach( bar => bar.hideBar(true) );
		this.regSendFsmVarAndEvent();
	}

	iconBarOn (i) {
		this.switchModeBar.bars[i].forEach( bar => bar.hideBar(false) );
		this.switchModeBar.bars[i][0].activate(0);
		this.regSendFsmVarAndEvent();
	}

	regSendFsmVarAndEvent () {
		if ( !this.sendFsmTimeout ) {
			this.sendFsmTimeout = setTimeout( this.sendFsmVarAndEvent.bind(this) );
		}
	}

	sendFsmVarAndEvent () {
		this.sendFsmTimeout = 0;

		let event;
		if ( this.switchModeBar.active==0 ) {
			event = 'Text';
		} else if ( this.switchModeBar.active==2 ) {
			event = 'Paint';
		} else {
			event = 'Off';
		}
		this.base.fsm.triggerEvent( `EV_IconBarSwitch${ event }${ this.compEventId }` );
		// if ( this.FSMVariableName ) {
		// 	this.base.postVariable( `V_IconBarSwitch_${this.FSMVariableName}`, i>-1 ? i+1 : 0 );
		// }
		// this.base.postVariable( 'V_IconBarSwitch', i>-1 ? i+1 : 0 );
		// this.base.fsm.triggerEvent( 'EV_IconBarSwitch' );
	}

}
