import { getAbsPosition, ignoreEvent } from './common'

import Konva from 'konva/lib/Core'
import { Rect } from 'konva/lib/shapes/Rect'
import { Text } from 'konva/lib/shapes/Text'

export class textFrame {

	constructor( base, layer, opts = {} ) {

		// Options and defaults
		['value','x','y'].forEach( o => {
			if ( !( o in opts ) ) {
				throw( `textFrame: parameter '${o}' not specified!` );
			}
		})
		if ( base.fsm && base.fsm.incInitCnt ) {
			base.fsm.incInitCnt();
		}

		const defaultOpts = {
			width: 75, height: 25,
			align: 'center',
			fontSize: 20,
			backgroundReadonly: null,
			backgroundEditable: 'lightyellow',
			backgroundEdit: 'yellow',
			frameWidth: 1,
			frameColor: 'black',
			cornerRadius: 0,
			inputRegexp: null,
			thousandsSep: ' ',
			readonly: 0,
			onChange: null,
			moveable: false,
			rotation: 0,
		}
		Object.assign( this, defaultOpts, opts );
		if ( typeof this.value !== 'string') {
			this.value = this.value.toString();
		}
		this.layer = layer;
		this.base = base;
		const stage = base.stage;
		this.stage = stage;

		// Group (frame & text)
		const kGroup = new Konva.Group( this.moveable ? { draggable: true } : {} );
		this.kGroup = kGroup;
		this.layer.add( this.kGroup );

		// Frame
		const kFrame = new Konva.Rect({
			x: this.x,
			y: this.y,
			width: this.width,
			height: this.height,
			fill: this.readonly ? this.backgroundReadonly : this.backgroundEditable,
			stroke: this.frameColor,
			strokeWidth: this.frameWidth,
			cornerRadius: this.cornerRadius,
			rotation: this.rotation,
		})
		this.kFrame = kFrame;
		this.kGroup.add( kFrame );

		// Text
		const wRed = this.frameWidth ? this.frameWidth+1 : 0;
		const kText = new Konva.Text({
			text: this.insertThousandsSep( this.value ),
			x: this.x + wRed,
			y: this.y,
			width: this.width - wRed*2,
			height: this.height,
			align: this.align,
			verticalAlign: 'middle',
			fontSize: this.fontSize,
			rotation: this.rotation,
		})
		this.kText = kText;
		this.kGroup.add( kText );

		// edit
		if ( !this.readonly ) {

			// kText.on( 'mouseenter', function () {
			// 	kFrame.fill( this.backgroundEdit );
			// 	layer.batchDraw();
			// 	document.body.style.cursor = "text";
			// }.bind(this) );

			// kText.on( 'mouseleave', function () {
			// 	kFrame.fill( null );
			// 	layer.batchDraw();
			// 	document.body.style.cursor = "default";
			// })

			kText.on( 'click tap', function (ev) {

				ev.cancelBubble = true;

				// start input field
				let stageBox = getAbsPosition( stage.container() );
				let inputElement = document.createElement( 'input' );
				document.body.appendChild(inputElement);
				inputElement.value = this.value;
				inputElement.oldValue = this.value;
				inputElement.oldSelectionStart = this.value.length;
				inputElement.oldSelectionEnd = this.value.length;

				inputElement.style.position = 'absolute';
												// !!!!! Hier muss noch scrollPos verrechnet werden
				const inpAddOff = this.getAddOff();
				inputElement.style.left = (0+ stageBox.left + kFrame.x() + kGroup.x() + inpAddOff.x ) +'px';
				inputElement.style.top = (0+ stageBox.top + kFrame.y() + kGroup.y() + inpAddOff.y )+'px';
				inputElement.style.width = (1+this.width)+'px';
				inputElement.style.height = (1+this.height)+'px';
				inputElement.style.background = this.backgroundEdit;
				inputElement.style.border = '1px solid black';
				inputElement.style['box-sizing'] = 'border-box';
				inputElement.focus( { preventScroll: true } );	// important for demoAni
				this.inputElement = inputElement;

				// hide frame+text
				kText.visible( false );
				kFrame.visible( false );
				layer.draw();

				// end input field
				const removeInput = (copy=0) => {
					if ( this.inputElement ) {
						this.stage.off( '.input' );
						if ( copy ) {
							this.setVal( inputElement.value );
							if ( typeof this.onChange === 'function' ) {
								this.onChange( this.value );
							}
						}
						this.inputElement = null;
						document.body.removeChild( inputElement );	// causes blur on chrome?
						kText.visible( true );
						kFrame.visible( true );
						layer.draw();
					}
				}

				if ( this.inputRegexp ) {
					const re = new RegExp( this.inputRegexp );
					function handler (e) {
						const el = e.target;
						if ( !el.value.match( re ) ) {
							if( el.hasOwnProperty('oldValue') ) {
								el.value = el.oldValue;
								el.setSelectionRange(el.oldSelectionStart, el.oldSelectionEnd);
							} else {
								el.value = '';
							}
							this.logKey( 'inputRevert', el.oldSelectionStart, e, { toText: el.value } );
							this.base.triggerInputValidationEvent();
						} else {
							el.oldValue = el.value;
							el.oldSelectionStart = el.selectionStart;
							el.oldSelectionEnd = el.selectionEnd;
						}
					}
					[ 'input', 'mouseup', 'touchend', 'keyup' ].forEach( ev => inputElement.addEventListener( ev, handler.bind(this) ) );
				}

				inputElement.addEventListener( 'keydown', function (e) {

					this.logKey( 'keyDown', e.target.selectionStart, e );

					if ( e.which==13 || e.keyCode==13 ) {
						removeInput(true);
					}
					if ( e.which==27 || e.keyCode==27 ) {
						removeInput(false);
					}
				}.bind(this) )
				inputElement.addEventListener( 'blur', function() {
// console.log("blur");
					removeInput(true);
				}.bind(this) )

				function handleOutsideClick (e) {
// console.log("outsideclick");
					if ( e.target !== inputElement ) {
						removeInput(true);
					}
				}
				setTimeout( () => {
					this.stage.on( 'click.input touchstart.input', handleOutsideClick );
				});

			}.bind(this) )

			if ( this.moveable ) {
				kGroup.on( 'dragend', function () {
					base.postLog( 'inputMoved', {
						id: this.logObjectId,
						x: kFrame.x() + kGroup.x() + kFrame.width()/2,
						y: kFrame.y() + kGroup.y() + kFrame.height()/2,
					} );
				}.bind(this) )
				kGroup.on( 'mousedown touchstart', ev => ev.cancelBubble = true	);
			}

			let oldCursor = null;
			const overCursor = this.moveable ? 'pointer' : 'text';

			kGroup.on( 'mouseenter', () => {
				oldCursor = document.body.style.cursor;
				document.body.style.cursor = overCursor;
			});
			kGroup.on( 'mouseleave', (ev) => {
				if ( ignoreEvent( this.stage, ev ) ) {
					return;
				}
				if ( document.body.style.cursor == overCursor ) {
					document.body.style.cursor = oldCursor || 'auto';
				}
			});

		}

		if ( base.fsm && base.fsm.decInitCnt ) {
			base.fsm.decInitCnt();
		}
	}

	///////////////////////////////////

	repos ( x, y ) {

		this.x = x;
		this.y = y;

		this.kFrame.x( x );
		this.kFrame.y( y );

		this.kText.x( x );
		this.kText.y( y );

		this.layer.batchDraw();
	}

	setVal ( newText ) {
		this.value= newText;
		this.kText.text( this.insertThousandsSep( this.inputElement.value ) );
	}

	getPos () {
		return {
			x: this.kFrame.x() + this.kGroup.x(),
			y: this.kFrame.y() + this.kGroup.y(),
		}
	}

	// get additional offsets of input field due to rotation
	getAddOff () {
		switch ( this.rotation ) {
			case -90:
			case 270:
				return {
					x: 0,
					y: -( this.width + this.height )/2,
				}
			default:
				return {
					x: 0,
					y: 0,
				}
		}
	}

	listening ( enable ) {
		this.kText.listening( enable );
	}

	deleteAll () {
		this.kFrame.destroy();
		this.kText.destroy();
		this.kGroup.destroy();
	}

	///////////////////////////////////

	logKey ( logEvent, pos, keyEvent, data={} ) {

		if ( 'logObjectId' in this && this.base ) {

			data.id = this.logObjectId;
			data.pos = pos;

			if ( this.logRef ) {
				data = Object.assign( data, this.logRef() );
			}
			[ 'key', 'code', 'shiftKey', 'altKey', 'ctrlKey', 'metaKey', 'isComposing', 'repeat' ].forEach( k => {
				if ( keyEvent[k] ) {
					data[k] = keyEvent[k];
				}
			})
			data.which = keyEvent.which || keyEvent.keyCode;

			this.base.postLog( logEvent, data );
		}
	}

	insertThousandsSep (s) {
		if ( this.thousandsSep ) {
			let r=s.toString();
			do {
				s=r;
				r=s.replace( /([0-9]+)([0-9]{3}\b)/, '$1'+this.thousandsSep+'$2' )
			} while (r!=s);
		}
		return s;
	}

	// deleteThousandsSep (s) {
	// 	if ( this.thousandsSep ) {
	// 		const re = new RegExp( '([0-9]+)'+this.thousandsSep+'([0-9]{3}\\b)' );
	// 		let r=s.toString();
	// 		do {
	// 			s=r;
	// 			r=s.replace( re, '$1$2' );
	// 		} while (r!=s);
	// 	}
	// 	return s;
	// }

}
