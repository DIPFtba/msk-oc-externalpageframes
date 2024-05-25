import './textareaInserts.css'

import { mergeDeep, setStatePostProc } from './common'

export class textareaContainer {

	constructor ( divSelector, opts = {}, base = null ) {

		const defaults = {
			outerDivStyles: {	// styles of created outer div (containing textarea and toolbar)
			},
			divStyles: {	// styles of "textarea"-div
				// width: '300px',
				// height: '200px',
			},
		}
		mergeDeep( Object.assign( this, defaults ), opts );
		// base is only used for sendChangeState() and postLog()
		this.base = base;

		// move div in a div.textareaInserts (->this.outerDiv)
		this.outerDiv = document.createElement('DIV');
		this.outerDiv.classList.add( 'textareaInserts' );
		this.setStyles( this.outerDiv, this.outerDivStyles );

		this.div = typeof divSelector === 'string' ? document.querySelector( divSelector ) : divSelector;
		this.div.parentNode.replaceChild( this.outerDiv, this.div );
		this.setStyles( this.div, this.divStyles );

		this.outerDiv.appendChild( this.div );
		this.initData = this.div.innerHTML.trim();
	}

	ev_input () {
	}

	setStyles ( el, styles ) {
		for ( const st in styles ) {
			el.style[st] = styles[st];
		}
	}

	extract () {
		return '';
	}

	///////////////////////////////////

	getDefaultChangeState () {
		return this.div.innerHTML.trim() !== this.initData;
	}

	getState () {
		return '{}';
	}

	setState () {
	}
}

export class textareaBase extends textareaContainer {

	constructor ( divSelector, opts = {}, base = null ) {

		const defaults = {
			multiLine: true,
			stripTags: false,	// true: only allow text-node, delete all HTML-tags (fireofx inserts <br> sometimes)
			inputRegexp: null,	// regexp evaluated against div.innerHTML
			maxlength: null,	// max numbers characters

			// Replaces done by this.extract()
			// (e.g. toolbar.extractReplace are inserted here)
			extractReplaces: [
				// { from: /regexp/, to: "replace" },
				{ from: /(?<!\*)\*(?!\*)/g, to: "\u22c5" },	// replace '*' to \u22c5
				{ from: /\u2022|\u25cf/g, to: "\u22c5" },	// replace • and ● to \u22c5
			]
		}
		mergeDeep( defaults, opts );
		super( divSelector, defaults, base );

		this.div.setAttribute( 'contenteditable', 'true' );

		this.div.addEventListener( 'keydown', this.ev_keydown.bind(this) );
		this.div.addEventListener( 'input', this.ev_input.bind(this) );
		// this.div.addEventListener( 'touchend', this.ev_touchend.bind(this) );
		// ['click','touchstart','change','input','keypress','keyup'].forEach( e => {
		//	this.div.addEventListener( e, this.checkNodes.bind(this) );
		// })

		if ( !this.div.textContent.length && this.multiLine ) {
			this.div.textContent = "\n";
			// this.div.appendChild( document.createElement('div') );
		}

		this.div.addEventListener( 'paste', (ev) => ev.preventDefault() );

		if ( this.inputRegexp ) {
			this.inputRE = new RegExp( this.inputRegexp );
			this.saveValue();
		}

		this.div.addEventListener( 'focus',
				() => setTimeout( () => this.base.postLog( 'textareaFocus', this.getTextPos() ), 0 ) );
		this.div.addEventListener( 'blur', () => this.base.postLog( 'textareaBlur' ) );


		this.oldValue = "";
		this.oldFocusElemIndex = null;

		// Save initData & init StateVars
		this.initData = this.div.innerHTML.trim();
		this.base.sendChangeState( this );	// init & send changeState & score
	}

	///////////////////////////////////

	ev_keydown (event) {
// console.log(event);

		let rescore = 0;

		// log?
		if ( this.base ) {
			const data = {
				which: event.which || event.keyCode,
				// extract: this.extract(),	// old, unchanged value
			};
			[ 'key', 'code', 'shiftKey', 'altKey', 'ctrlKey', 'metaKey', 'isComposing', 'repeat' ].forEach( k => {
				if ( event[k] ) {
					data[k] = event[k];
				}
			})

// !!!!! DONT LOG ON CHROME/ANDROID !!!!!
// !!!!! DONT LOG ON CHROME/ANDROID !!!!!
// !!!!! DONT LOG ON CHROME/ANDROID !!!!!
			this.base.postLog( 'keyDown', Object.assign( data, this.getTextPos() ) );
		}

		// On ENTER insert <br>, prevent inserting <divs>
		if ( event.key==="Enter" || event.which==13 || event.keyCode==13 ) {
			if ( !this.tabToNextInputField(event) ) {
			// 	if ( !this.multiLine ) {
			// 		event.preventDefault();
			// 		event.stopPropagation();
			// 	}
			// }
				if ( !this.multiLine || this.pasteHtmlAtCaret("\n") ) {

					// // Chrome: If Enter was hit behind last character,
					// // an <div><br><div> is inserted
					// // HotFix: delete last <div>
					// const sel = window.getSelection();
					// if ( sel && sel.isCollapsed && sel.focusNode &&
					// 		sel.focusNode==this.div && sel.focusOffset==this.div.childNodes.length ) {

					// 	let lastNode = this.div.childNodes[ this.div.childNodes.length-1 ];
					// 	if ( lastNode.tagName=='DIV' && !lastNode.classList.contains('inserted') ) {
					// 		lastNode.remove();
					// 	}
					// }

					event.preventDefault();
					event.stopPropagation();
				}
			}
			rescore = 1;

		// On TAB insert tab
		} else if ( event.key==="Tab" || event.which==9 || event.keyCode==9 ) {
			if ( !this.tabToNextInputField(event) ) {
				if ( this.pasteHtmlAtCaret('&#09;') ) {
					event.preventDefault();
					event.stopPropagation();
				}
			}
			rescore = 1;

		// Backspace: Delete div before cursor?
		} else if ( event.key==="Backspace" || event.which==8 || event.keyCode==8 ) {
			// should div be deleted
			if ( !this.delIfDiv( -1, event ) ) {
				// // Is cursor in/after last text node ' ' (don't delete, just repos cursor)
				// const sel = window.getSelection();
				// if ( sel && sel.isCollapsed && sel.focusNode ) {
				// 	const nodes = this.div.childNodes;
				// 	if ( nodes[nodes.length-1].textContent==' ' &&
				// 			( sel.focusNode==this.div && sel.focusOffset>=this.div.childNodes.length ||	// Cursor behind last node
				// 			sel.focusNode==nodes[nodes.length-1] && sel.focusOffset==1 ) ) {	// cursor after space in last textnode

				// 		// move cursor before space in last text node
				// 		const range = sel.getRangeAt(0).cloneRange();
				// 		range.setStart( nodes[nodes.length-1], 0 );
				// 		range.collapse(true);
				// 		sel.removeAllRanges();
				// 		sel.addRange(range);

				// 		event.preventDefault();
				// 		event.stopPropagation();
				// 	}
				// }
			}
			rescore = 1;

		// Delete: Delete div after cursor?
		} else if ( event.key==="Delete" || ( event.which || event.keyCode )==46 ) {
			this.delIfDiv( 1, event );
			rescore = 1;
		}

		if ( this.base && rescore>0 ) {
			this.base.sendChangeState( this );
		}
	}

	// chrome @ android does not send keyCodes on keydown events
	// therefore input event must be evaluated for 'deleteContentBackward' behind inserted elements
	ev_input (event) {

		let saveNewValue = false;

// console.log( window.getSelection() );
		const sel = window.getSelection();

		// was "inserted" node saved for deletion and was backspace processed?
		if ( event && event.inputType=='deleteContentBackward' && this.delPosElement ) {

// console.log(this.delPosText);
			// is cursor IN inserted element?
			let inserted = null, search = sel.focusNode;
			if ( this.delPosText ) {
				while ( !inserted && search && ( !search.classList || !search.classList.contains('textareaInserts') ) ) {
// console.log(search);
					if ( search.classList && search.classList.contains('inserted') ) {
						inserted = search;
					}
					search = search.parentNode;
				}
			}
			if ( inserted )  {
// console.log(this.delPosText,this.delPosElement)
				// pos cursor
				if ( sel.getRangeAt && sel.rangeCount ) {
					const range = sel.getRangeAt(0).cloneRange();
					range.setStartBefore(inserted);
					range.collapse(true);
					sel.removeAllRanges();
					sel.addRange(range);
				}
				// replace inserted with text
				this.div.replaceChild( this.delPosText, this.delPosElement );
				this.div.normalize();
			} else {
				this.delPosElement.remove();
			}
			this.delPosElement = null;
			this.delPosText = null;

			saveNewValue = ( this.inputRE || !this.multiLine );

		} else {

			// cursor after deleteable, inserted element?
			// console.log(sel,sel.focusNode,this.div)
			if ( sel && sel.isCollapsed && sel.focusNode &&
					sel.focusNode.parentNode==this.div && sel.focusOffset===0 &&
					sel.focusNode.previousSibling && sel.focusNode.previousSibling.classList &&
					sel.focusNode.previousSibling.classList.contains('inserted' ) ) {
				this.delPosText = sel.focusNode.cloneNode(true);
				this.delPosElement = sel.focusNode.previousSibling;
			} else {
				this.delPosElement = null;
				this.delPosText = null;
			}
			// // If the last element is "inserted" and there is no text behind it, the element is not deletable
			// // because there is no "input" event on backspace
			// // possible fix: always have a "space" as last element
			// else if ( sel.focusNode==this.div && sel.focusOffset<=this.div.childNodes.length ) {
			// 	this.delPosText = null;
			// 	this.delPosElement = this.div.childNodes[ sel.focusOffset-1 ];
			// }

			// handle multiLine e.g. in android (no key-events, just input events!)
			if ( !this.multiLine ) {
				if ( this.div.textContent.match( /[\n\r]/ ) ) {
// console.log(this.div.textContent)
// console.log(this.div.textContent.match( /[\n\r]/ ))
					this.restoreValue();
				} else {
					saveNewValue = true;
				}
			} else {
				// HotFix for Chrome (Enter behind last character not always processed)
				// Always have a '\n' as last character
				const lastNode = this.div.childNodes.length>0 ? this.div.childNodes[ this.div.childNodes.length-1 ] : null;
				if ( lastNode && lastNode.nodeType==Node.TEXT_NODE && !lastNode.textContent.endsWith("\n") ) {
					const pos = ( sel && sel.focusNode==lastNode ? sel.focusOffset : null );
					lastNode.textContent = lastNode.textContent+"\n";
					if ( pos!==null ) {
						this.setCurPos( lastNode, pos );
					}
				}
			}

			// handel stripTags
			if ( this.stripTags ) {
				if ( this.div.innerHTML.match( /<[^>]*>/ ) ) {
					this.div.innerHTML = this.div.innerHTML.replace( /<[^>]*>/g, '' );
				}
			} else {
				// delete all div:not(.inserted)
				// THIS SHOULD NEVER HAPPEN, but it should be corrected
				let node = this.div.childNodes[0];
				while ( node ) {
					const el = node;
					node = node.nextSibling;
					if ( el.tagName=='DIV' && el.classList && !el.classList.contains('inserted') ) {
						// convert textcontent to textnode
						const text = el.textContent;
						if ( text.length ) {
							const tnode = document.createTextNode('');
							tnode.textContent = text;
							this.div.replaceChild( tnode, el );
							this.div.normalize();
						} else {
							el.remove();
						}
					}
				}
				// delete solely <br>
				if ( this.div.innerHTML.trim() === '<br>' ) {
					this.div.innerHTML = '';
					this.div.textContent = "\n";
				}
			}

			// handle inputRegexp
			if ( this.inputRE || this.maxlength ) {
// console.log(this.div.innerHTML);
// console.log(this.div.innerHTML.match( this.inputRE ));
				if ( 	( this.inputRE && !this.div.innerHTML.match( this.inputRE ) ) ||
						( this.maxlength && this.div.innerHTML.length>this.maxlength ) ) {
					this.restoreValue();
					if ( this.base ) {
						this.base.postLog( 'inputRevert', {
							toText: this.div.innerHTML,
							extract: this.extract(),
						} );
						this.base.triggerInputValidationEvent();
					}
				} else {
					saveNewValue = true;
				}
			}
		}

		if ( saveNewValue ) {
			this.saveValue();
		}
		if ( saveNewValue || !this.inputRE || this.multiLine ) {
			this.base.postLog( 'newValue', {
				extract: this.extract(),
			});
		}
		if ( this.base ) {
			this.base.sendChangeState( this );
		}
	}

	// // on touchables: last element should not be '.inserted' (append textnode with ' ')
	// ev_touchend () {

	// 	const sel = window.getSelection();
	// 	// Cursor at "end" of text
	// 	if ( sel && sel.isCollapsed && sel.focusNode==this.div ) {
	// 		const childn = this.div.childNodes;
	// 		// and last node == '.inserted'
	// 		if ( sel.focusOffset==childn.length && childn[childn.length-1].classList &&
	// 				childn[childn.length-1].classList.contains('inserted') ) {

	// 			const text = document.createTextNode(' ')
	// 			this.div.appendChild( text );
	// 			// set cursor to start of text ' '	!!!!! TODO !!!!!
	// 			// if ( sel.getRangeAt && sel.rangeCount ) {
	// 			// 	const range = sel.getRangeAt(0).cloneRange();
	// 			// const range = document.createRange();
	// 			// range.setStart( text, 0 );
	// 			// range.collapse(true);
	// 			// sel.removeAllRanges();
	// 			// sel.addRange(range);
	// 			// }
	// 		}
	// 	}
	// }

	// checkNodes () {

	// 	this.div.normalize();

	// 	// ensure last element is textnode (hotfix for positioning cursor after last .frac)
	// 	// const nodes = this.div.childNodes;
	// 	// if ( !nodes.length || nodes[nodes.length-1].nodeType!=Node.TEXT_NODE ) {
	// 	// 	this.div.appendChild( document.createTextNode(' ') );
	// 	// }
	// }

	///////////////////////////////////

	// https://stackoverflow.com/questions/6690752/insert-html-at-caret-in-a-contenteditable-div
	pasteHtmlAtCaret ( html, insertSpaces, logName ) {

		const sel = window.getSelection();
		// only insert if selection is within this.div
		if ( !sel || !sel.focusNode || !this.div.contains( sel.focusNode ) ) {
			return false;
		}

		if (sel.getRangeAt && sel.rangeCount) {
			let range = sel.getRangeAt(0);
			range.deleteContents();

			// Range.createContextualFragment() would be useful here but is
			// only relatively recently standardized and is not supported in
			// some browsers (IE9, for one)
			let ins;
			if ( insertSpaces ) {
				const preSpace = ( !sel.focusOffset || sel.focusNode.textContent[ sel.focusOffset-1 ]!=' ' ) ? ' ' : '';
				ins = `${preSpace}${html} `;
			} else {
				ins = html;
			}
			const el = document.createElement("div");
			el.innerHTML = ins;

			var frag = document.createDocumentFragment(), node, lastNode;
			while ( (node = el.firstChild) ) {
				if ( node.classList ) {
					node.classList.add('inserted');
				}
				lastNode = frag.appendChild(node);
			}
			const startCurPos = frag.querySelector('.startCursorPos');
			range.insertNode(frag);

			// Preserve the selection
			if (lastNode) {
				range = range.cloneRange();
				startCurPos ? range.setStart( startCurPos, 0 ) : range.setStartAfter(lastNode);
				range.collapse(true);
				sel.removeAllRanges();
				sel.addRange(range);
			}

			this.normalize();

			// log button
			if ( logName && this.base ) {
				const data = {
					text: ins,
					name: logName,
					extract: this.extract(),
				};
				this.base.postLog( 'insertButtonPressed', Object.assign( data, this.getTextPos() ) );
			}
		}

		return true;
	}

	delIfDiv ( offs, event ) {

		const sel = window.getSelection();
		if ( sel && sel.isCollapsed ) {
			const focus = sel.focusNode;
// console.log(sel,offs,focus==this.div,this.div.childNodes.length,this.div.childNodes);
			// delete previous/next node?
			if ( focus &&
					( offs>0 && sel.focusOffset==focus.textContent.length ||
					offs<0 && ( !sel.focusOffset ||	// Beginning of a Text or
								focus==this.div && sel.focusOffset<=this.div.childNodes.length ) ) ) { // node-level, focusOffset is node-index

				const toDelete = ( focus==this.div ?
									this.div.childNodes[ sel.focusOffset-1 ] :
									( offs<0 ? focus.previousSibling : focus.nextSibling ) );
// console.log(toDelete)
				// check if node is div.inserted
				if ( toDelete && toDelete.tagName=='DIV' && toDelete.classList.contains('inserted') ) {
					// set cursor before element (fix for safari)
					const range = sel.getRangeAt(0);
					if ( range ) {
						if ( toDelete.previousSibling ) {
							range.setStartAfter( toDelete.previousSibling );
						} else if ( toDelete.nextSibling ) {
							range.setStart( toDelete.nextSibling, 0 );
						}
						range.collapse(true);
						sel.removeAllRanges();
						sel.addRange(range);
					}
					// delete node
					toDelete.remove();
					this.div.normalize();

					event.preventDefault();
					event.stopPropagation();
					return true;
				}
			}
		}

		return false;
	}

	// is cursor within .inputfield? tab to nextSibling
	tabToNextInputField (event) {

		const sel = window.getSelection();
		if ( sel && sel.isCollapsed && sel.focusNode && sel.getRangeAt && sel.rangeCount ) {

			// in .inputfield?
			let node;
			for ( node=sel.focusNode; node && !node.classList; ) {
				node = node.parentNode;
			}
			if ( node && node.classList.contains('inputField') ) {

				// search next available sibling
				while ( node && !node.nextSibling && node!=this.div ) {
					node = node.parentNode;
				}
				if ( node && node!=this.div ) {
					node = node.nextSibling;

					// set cursor
					this.setCurPos( node, node.nodeType==Node.TEXT_NODE && node.textContent.startsWith(' ') ? 1 : 0 );

					event.preventDefault();
					event.stopPropagation();
					return true;
				}
			}
		}

		return false;
	}

	///////////////////////////////////

	saveValue () {
		this.oldValue = this.div.innerHTML;
		// save cursor position
		const sel = window.getSelection();
		if ( sel && sel.focusNode ) {
			const nodes = Array.from( this.div.childNodes );
			this.oldFocusElemIndex = nodes.findIndex( i => i===sel.focusNode );
			this.oldFocusOffset = sel.focusOffset;
		} else {
			this.oldFocusElemIndex = null;
		}
	}

	restoreValue () {
		if ( this.oldValue!==null ) {
			this.div.innerHTML = this.oldValue;
			// restore old cursor position
			const sel = window.getSelection();
			if ( sel ) {
				sel.removeAllRanges();
				if ( this.oldFocusElemIndex!==null && this.oldFocusElemIndex>-1 ) {
					this.setCurPos( this.div.childNodes[ this.oldFocusElemIndex ], this.oldFocusOffset );
				}
			}
		}
	}

	setCurPos ( node, offset ) {
		const sel = window.getSelection();
		if ( sel ) {
			const range = document.createRange();
			range.setStart( node, offset );
			range.collapse( true );

			sel.removeAllRanges();
			sel.addRange(range);
		}
	}

	// call this.div.normalize() and try to save/restore cursor position (safari puts cursor to end of text sometimes)
	normalize () {

		// try to save cursor position in textnode(s)
		let curPos = null, prevElmnt, parentElmnt;
		const sel = window.getSelection();
		if ( sel && sel.getRangeAt && sel.rangeCount ) {
			let focus = sel.focusNode;
			if ( focus && focus.nodeType==Node.TEXT_NODE &&
					( ( focus.previousSibling && focus.previousSibling.nodeType==Node.TEXT_NODE ) ||
						( focus.nextSibling && focus.nextSibling.nodeType==Node.TEXT_NODE ) ) ) {

				curPos = sel.focusOffset;
				parentElmnt = focus.parentElement;
				// Add length of all previous text elements to position
				while ( focus.previousSibling && focus.previousSibling.nodeType==Node.TEXT_NODE ) {
					focus = focus.previousSibling;
					curPos += focus.textContent.length;
				}
				prevElmnt = focus.previousSibling;
			}
		}

		this.div.normalize();

		// restore position in (concatenated) text
		if ( curPos!==null ) {
			const newElem = prevElmnt ? prevElmnt.nextSibling : parentElmnt.firstChild;
			const newRange = document.createRange();
			newRange.setStart( newElem, curPos );
			newRange.collapse( true );
			sel.removeAllRanges();
			sel.addRange(newRange);
		}
	}

	// Get Position (in this.div.textContent) and special classes set in focusnode
	getTextPos (sel=null) {
		if ( sel===null ) {
			sel = window.getSelection();
		}
		if ( sel && sel.focusNode ) {
			let pos = sel.focusOffset;
			let node = sel.focusNode;
			// add lengths of textContents of all pevious Elements
			while ( ( node = node.previousSibling || node.parentNode ) && node != this.div && node ) {
				if ( node.textContent ) {
					pos += node.textContent.length;
				}
			}
			const data = { textPos: pos, };
			// check for frac classes
			node = sel.focusNode;
			while ( node && node != this.div && !node.classList ) {
				node = node.parentNode;
			}
			if ( node.classList && node.classList.contains('frac') ) {
				if ( node.classList.contains('top') ) data.class="frac top";
				if ( node.classList.contains('bottom') ) data.class="frac bottom";
			};
			return data;
		}

		return {};
	}

	extract () {
		let s = this.div.innerHTML;

		this.extractReplaces.forEach( r => {
			s = s.replaceAll( r.from, r.to );
		})

		return s.trim();
	}

	///////////////////////////////////

	getState () {
		return JSON.stringify( this.div.innerHTML );
	}

	setState (state) {

		try {

			this.div.innerHTML = JSON.parse( state );

		} catch (e) {
			console.error(e);
		}

		setStatePostProc(this);
	}

	scoreDef () {
		return this.scoreVariableName || this.FSMVariableName ?
			{
				[ this.scoreVariableName || `V_Input_${this.FSMVariableName}` ]: this.extract(),
			} :
			{};
	}
}

//////////////////////////////////////////////////////////////////////////////

export class textareaInserts extends textareaBase {

	constructor ( divSelector, opts = {}, base = null ) {

		const insertsDefaults = {

			// toolbarX, toolbarY   // position relative to div (top,left)
			toolbar: [
				// { display: (html), (insert: (html),)
				// 		(tooltip: '',) ,	// showed tooltip
				// 		(dontInsertRecursive: true|false),	// can element be inserted inside other elements?
				//		(noExtraSpaces: true|false),	// dont insert spaces before and after element
				//		(extractReplace: { from: /regexp/, to: "text" } ),	// Replace done by extract()
				// }
			],
			toolbarDirection: 'column',
			// toolbarHide: true,	// toolbar hidden when no focus

			toolbarContainerStyles: {
				// left: '300px', 	// position relative to outerDiv, defaults to width of divStyle
				// top: '200px',
			},
			toolbarCellStyles: {
			},
			toolbarCellSpanStyles: {	// spans within toolbar-cells (for vertical centering)
			},

		}
		mergeDeep( insertsDefaults, opts );
		super( divSelector, insertsDefaults, base );

		// create toolbar container
		this.toolbarContainer = document.createElement('DIV');
		this.toolbarContainer.classList.add( 'toolbar', `ti${this.toolbarDirection}`, 'disabled' );
		if ( !this.toolbarContainerStyles.left ) {
			this.toolbarContainerStyles.left = this.divStyles.width
		}
		if ( !this.toolbarContainerStyles.top ) {
			this.toolbarContainerStyles.top = "0px";
		}
		this.setStyles( this.toolbarContainer, this.toolbarContainerStyles );
		// this.toolbarContainer.setAttribute( 'contenteditable', 'false' );

		// create toolbarCells
		this.toolbar.forEach( ( tb, nr ) => {
			// FLOWing div
			const toolbarCell = document.createElement('DIV');
			this.setStyles( toolbarCell, this.toolbarCellStyles );
			[ 'mousedown', 'touchstart' ].forEach( ev =>
				toolbarCell.addEventListener( ev, function (event) {
					if ( document.activeElement && !this.toolbarContainer.classList.contains('disabled') && this.div.contains( document.activeElement ) ) {
						this.insert( nr, event );
					}
				}.bind(this) ) );
			//  toolbarCell.setAttribute( 'contenteditable', 'false' );

			// span in div for vertical aligning
			const innerSpan = document.createElement('SPAN');
			this.setStyles( innerSpan, this.toolbarCellSpanStyles );
			toolbarCell.appendChild( innerSpan );

			innerSpan.innerHTML = tb.display;
			this.toolbarContainer.appendChild( toolbarCell );

			// copy extractReplace
			if ( tb.extractReplace && tb.extractReplace.from && tb.extractReplace.to ) {
				this.extractReplaces.push( tb.extractReplace );
			}
		});

		// Handle toolbarContainer visibility
		// if ( this.toolbarHide ) {
		// 	this.toolbarContainer.style.visibility = this.div.activeElement ? 'visible' : 'hidden';

		// 	this.div.addEventListener( 'focus', () => this.toolbarContainer.style.visibility = 'visible' );
		// 	this.div.addEventListener( 'blur', (ev) => console.log(ev) );
		// }
		this.outerDiv.appendChild( this.toolbarContainer );
		this.div.addEventListener( 'focus',
				() => this.toolbarContainer.classList.remove('disabled'),
				{ capture: true } );
		this.div.addEventListener( 'blur',
				() => this.toolbarContainer.classList.add('disabled'),
				{ capture: true } );

	}

	///////////////////////////////////

	insert ( nr, event ) {

		if ( this.toolbar[nr].dontInsertRecursive ) {
			// search parent ".inserted" (-> inside another inserted element)
			const sel = window.getSelection();
			if ( sel && sel.focusNode ) {
				let pnode = sel.focusNode;
				while ( pnode && ( !pnode.classList || !pnode.classList.contains('textareaInserts') && !pnode.classList.contains('inserted') ) ) {
					pnode = pnode.parentNode;
				}
				if ( pnode.classList && pnode.classList.contains('inserted') ) {
					return;
				}
			}
		}

		if ( this.pasteHtmlAtCaret( this.toolbar[nr].insert || this.toolbar[nr].display, !this.toolbar[nr].noExtraSpaces, this.toolbar[nr].logName ) ) {
			this.ev_input();	// check regexp etc.
			event.preventDefault();
			event.stopPropagation();
		}

		if ( this.base ) {
			this.base.sendChangeState( this );
		}
	}

}

//////////////////////////////////////////////////////////////////////////////

// export some default toolbars

export const toolbarMathOperators = [
	{ display: "&plus;", logName: "plus", },		// + \u002b
	{ display: "&minus;", logName: "minus", },		// - \u2212
	// { display: "&centerdot;", },	// *
	{ display: "&sdot;", logName: "dot", },			// * \u22c5
	{ display: "&ratio;", logName: "ratio", },		// / \u2236
	{ display: "&equals;", logName: "equals", },	// = \u003d

];

const frac_html = '<div contenteditable="false" class="frac">'+
	'<span contenteditable="true" class="frac top startCursorPos inputField"></span>'+
	'<span contenteditable="true" class="frac bottom inputField"></span>'+
'</div>';

import fractsvg from './img/fract.svg'
const frac_html_toolbar = `<div class="frac"><img src="${fractsvg}"></div>`;


export const toolbarFraction = [{
	display: frac_html_toolbar,
	insert: frac_html,
	dontInsertRecursive: true,
	logName: "fraction",
	extractReplace: {
		from: /<div[^>]*class="frac[^>]*>\s*<span[^>]*class="frac top[^>]*>(.*?)<\/span>\s*<span[^>]*class="frac bottom[^>]*>(.*?)<\/span>\s*<\/div>/g,
		to: "($1)/($2)"
	},
},
]

export const toolbarPercent = [
	{ display: "%", logName: "percent", },
];

export const toolbarComparison = [
	{ display: "&lt;", logName: "less", },
	{ display: "&gt;", logName: "greater", },
]

export const toolbarMathOperatorsFraction = toolbarMathOperators.concat( toolbarFraction );

export const toolbarMathOperatorsFractionComparison = [].concat(toolbarFraction).concat( toolbarMathOperatorsFraction );

export const toolbarMathOperatorsFractionPercent = toolbarMathOperatorsFraction.concat( toolbarPercent );
