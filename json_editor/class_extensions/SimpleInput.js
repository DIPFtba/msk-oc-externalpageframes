import "./SimpleInput.css"

import { mergeDeep } from "../../libs/common.js";

export class SimpleInput {

    constructor ( opts = {}, parentContainer=document.body ) {

        const defaultOpts = {

            id: null, // optional id for the input element

            position: "absolute", // 'absolute' or 'relative' (inside parent container)
            x: 0, y:0,
            width: 100, height: 30,

            value: "",

            blurOnEnter: true,
            revertOnEsc: true,

            maxlength: null,    // maximum number of characters, null = no limit
            inputRegexp: null,  // RegExp to validate input, null = no validation

            fontSize: 30,   // font size in px, DON'T SET font-size in styles!
            minFontSize: null, // minimum font size when shrinking, null = no shrinking
            maxFontSize: null, // maximum font size when growing, null = set to fontSize
            padding: 2, // padding left and right beside the text in px

            stylesNormal: {},
            stylesFocus: {},
            stylesHover: {},

            cursorHeight: null, // null = automatic, otherwise a number
            stylesCursor: {},

            readonly: false,
        };
        // use 'value' in defaultOpts and opts, but store it as _value
        [ defaultOpts, opts ].forEach( o => {
            if ( 'value' in o ) {
                o._value = o.value;
                delete o.value;
            }
        });
        mergeDeep( Object.assign( this, defaultOpts ), opts );

        if ( this.inputRegexp && typeof this.inputRegexp === 'string' ) {
            this.inputRegexp = new RegExp( this.inputRegexp );
        }

        // create container element
        const container = document.createElement( "div" );
        container.classList.add( "simple-input-container" );
        if ( this.id ) {
            container.id = `${this.id}-container`;
        }
        if ( typeof parentContainer === 'string' ) {
            parentContainer = document.querySelector( parentContainer );
            if ( !parentContainer ) {
                throw new Error( `Parent container "${parentContainer}" not found` );
            }
        }
        parentContainer.appendChild( container );
        this.container = container;

        // create input element
        const div = document.createElement( "div" );
        div.classList.add( "simple-input" );
        div.style.position = this.position;
        if ( this.id ) {
            div.id = this.id;
        }
        this.setStyles( div, {
            ...this.stylesNormal,
            paddingLeft: this.padding + "px",
            paddingRight: this.padding + "px",
            left: this.x + "px",
            top: this.y + "px",
            width: this.width + "px",
            height: this.height + "px",
            fontSize: this.fontSize + "px",
        });
        if ( !this.maxFontSize ) {
            this.maxFontSize = this.fontSize;
        }

        if ( !this.readonly ) {
            [ 'click', 'mouseenter', 'mouseleave' ].forEach( ( ev ) =>
                div.addEventListener( ev, this[`h_${ev}`].bind(this) )
            );
            [ 'keydown', 'click' ].forEach( ( ev ) =>
                window.addEventListener( ev, this[`wh_${ev}`].bind(this), true )
            );
        }

        container.appendChild( div );
        this.div = div;

        // Position und Änderungen erfassen
        const contBound = parentContainer.getBoundingClientRect();
        this.offsX = contBound.left + window.scrollX;
        this.offsY = contBound.top + window.scrollY;

        const resizeObserver = new ResizeObserver(entries => {
            for ( let entry of entries ) {
                if ( entry.target === parentContainer ) {
                    const contBound = parentContainer.getBoundingClientRect();
                    this.offsX = contBound.left + window.scrollX;
                    this.offsY = contBound.top + window.scrollY;
                }
            }
        });
        resizeObserver.observe( parentContainer );

        // create cursor element
        const cursorElement = document.createElement( "span" );
        cursorElement.classList.add( "simple-input-cursor" );

        const span = document.createElement( "span" );
        span.innerText = "Hg";
        div.appendChild( span );
        const bound = span.getBoundingClientRect();
        this.setStyles( cursorElement, {
            ...this.stylesCursor,
            top: (bound.top-this.offsY) + "px",
            height: this.cursorHeight!==null ? this.cursorHeight + "px" : bound.height + "px",
            visibility: "hidden",
        });
        div.removeChild( span );

        container.appendChild( cursorElement );
        this.cursorElement = cursorElement;

        // inits
        this.evHandler = {};
        this.hasFocus = false;
        this._cursorPos = this._value.length; // cursor position in value

        // initial Render
        this.render();

        // if ( process.env.NODE_ENV !== 'production' ) {
        //     ( window.simpleInputFields = window.simpleInputFields || [] ).push( this ); // for debugging
        // }
    }

    ///////////////////////////////////

    focus () {
        if ( !this.hasFocus && !this.readonly ) {
            this.hasFocus = true;
            this.setStyles( this.div, this.stylesFocus );
            this.setCursorPos( this._cursorPos );
            this.renderCursor();
            this.focusStartValue = this._value; // save current value for blur
            this.emit( 'focus' );
        }
    }

    blur (ev) {
        if ( this.hasFocus ) {
            if ( this._value !== this.focusStartValue ) {
                this.emit( 'change', this._value );
            }
            this.emit( 'blur' );
            this.hasFocus = false;
            this.setStyles( this.div, this.stylesNormal );
            this.renderCursor();
        }
    }

    setValue ( newValue, newCursorPos=null ) {

        if ( typeof newValue !== 'string' ) {
            newValue = String( newValue );
        }

        if ( this._value !== newValue ) {
            if ( this.maxlength && newValue.length > this.maxlength ) {
                this.emit( 'maxlength', newValue );
                return; // do not set value if it exceeds maxlength
            }
            if ( this.inputRegexp && !this.inputRegexp.test( newValue ) ) {
                this.emit( 'invalid', newValue );
                return; // do not set value if it does not match the regexp
            }

            const oldValue = this._value;
            const oldCursorPos = this._cursorPos;

            this._value = newValue;
            this.setCursorPos( newCursorPos ?? this._cursorPos, false );
            this.render();

            // check if text fits in div
            if ( newValue.length>0 && 
                    ( this.chars[ this.chars.length-1 ].x2 - this.chars[0].x1 ) > ( this.width - 2*this.padding ) ) {

                // shrink if possible
                if ( !this.minFontSize || !this.resizeFont() ) {
                    // no shrinking posible, revert to old value
                    this.emit( 'oversize', newValue );
                    this._value = oldValue; // revert to old value
                    this.setCursorPos( oldCursorPos, false );
                    this.render(); // re-render with old value
                }

            } else {

                // grow shrinked fontSize?
                if ( this.fontSize < this.maxFontSize && newValue.length < oldValue.length ) {
                    this.resizeFont(); // grow font size if possible
                }
                this.emit( 'input', newValue );

            }
        }
    }

    resizeFont () {
        if ( this.minFontSize ) {
            const fontSize = this._value.length == 0 ?
                this.maxFontSize :
                Math.min(
                    this.maxFontSize,
                    this.fontSize * ( this.width - 2*this.padding ) / ( this.chars[ this.chars.length-1 ].x2 - this.chars[0].x1 )
                );
            if ( fontSize!=this.fontSize ) {
                if ( fontSize < this.minFontSize ) {
                    return false; // cannot shrink below minFontSize
                }
                this.fontSize = fontSize;
                this.div.style.fontSize = fontSize + "px";
                this.getCharPositions(); // update character positions
                this.renderCursor(); // re-render cursor with new font size
                this.emit( 'fontSizeChange', fontSize );
                return true;
            }
        }
        return false; // no resize happened
    }

    insertAtCursor (text) {
        const newValue = this._value.slice( 0, this._cursorPos ) + text + this._value.slice( this._cursorPos );
// console.log('### insertAtCursor', text, this._cursorPos, this._value, newValue );
        this.setValue( newValue, this._cursorPos + text.length );
    }

    delBakSpace () {
        if ( this._cursorPos > 0 ) {
            const newValue = this._value.slice( 0, this._cursorPos - 1 ) + this._value.slice( this._cursorPos );
            this.setValue( newValue, this._cursorPos - 1 );
        }
    }

    delForward () {
        if ( this._cursorPos < this._value.length ) {
            const newValue = this._value.slice( 0, this._cursorPos ) + this._value.slice( this._cursorPos + 1 );
            this.setValue( newValue );
        }
    }

    setCursorPos ( cursorX, renderCursor=true ) {
        cursorX = Math.max( 0, Math.min( cursorX, this._value.length ) );
        if ( this._cursorPos != cursorX ) {
            this._cursorPos = cursorX;
            if ( renderCursor ) {
                this.renderCursor();
            }
            this.emit( 'cursorPosChanged', cursorX );
        }
    }

    curLeft () {
        if ( this._cursorPos > 0 ) {
            this.setCursorPos( this._cursorPos - 1 );
        } else {
            this.emit('navPrev' );
        }
    }

    curRight () {
        if ( this._cursorPos < this._value.length ) {
            this.setCursorPos( this._cursorPos + 1 );
        } else {
            this.emit('navNext' );
        }
    }

    simulateKeyPress ( key ) {
        const event = new KeyboardEvent( 'keydown', { key } );
        this.wh_keydown( event );
    }

    ///////////////////////////////////

    get value () {
        return this._value;
    }

    set value ( newValue ) {
        this.setValue( newValue );
    }

    get selectionStart () {
        return this._cursorPos;
    }

    set selectionStart ( newPos ) {
        this.setCursorPos( newPos );
    }

    get selectionEnd () {
        return this._cursorPos;
    }

    set selectionEnd ( newPos ) {
        this.setCursorPos( newPos );
    }

    ///////////////////////////////////

    hEvents ( ev ) {
        const handler = 'h_' + ev.type;
        if ( this[handler] && this[handler]( ev ) ) {
        }
    }

    h_click ( ev ) {
        if ( !this.hasFocus ) {
            this.focus();
        }
        const pageX = ev.pageX-this.offsX;
        if ( this.chars.length == 0 || pageX < this.chars[0].x1 ) {
            this.setCursorPos( 0 );
            ev.stopImmediatePropagation();
        } else if ( pageX > this.chars[ this.chars.length - 1 ].x2 ) {
            this.setCursorPos( this._value.length );
            ev.stopImmediatePropagation();
        } else {
            this.h_click_char( ev, this.chars.findIndex( ( char ) => pageX >= char.x1 && pageX <= char.x2 ) );
        }
    }

    h_mouseenter () {
        if ( !this.hasFocus && !this.readonly ) {
            this.setStyles( this.div, this.stylesHover );
        };
    }

    h_mouseleave () {
        if ( !this.hasFocus && !this.readonly ) {
            this.setStyles( this.div, this.stylesNormal );
        }
    }

    h_click_char ( ev, idx=null ) {
// console.log('*** hClickChar', idx, ev.pageX, ev );
        if ( !this.hasFocus ) {
            this.focus();
        }
        const char = ( idx !== null ? this.chars[idx] : ev.target );
// console.log('*** hClickChar char', char );
        this.setCursorPos( ev.pageX-this.offsX < ( char.x1 + char.x2 ) / 2 ? idx : idx + 1 );
        ev.stopImmediatePropagation();
    }

    wh_keydown ( ev ) {
// console.log('*** hKeyDown', ev.key, ev );
        if ( !this.hasFocus ) {
            return 0;
        }

        let handled = 0;
        switch ( ev.key ) {
            case "ArrowLeft":
                this.curLeft();
                handled = 1;
                break;
            case "ArrowRight":
                this.curRight();
                handled = 1;
                break;
            case "Home":
                this.setCursorPos( 0 );
                handled = 1;
                break;
            case "End":
                this.setCursorPos( this._value.length );
                handled = 1;
                break;
            case "Backspace":
                this.delBakSpace();
                handled = 1;
                break;
            case "Delete":
                this.delForward();
                handled = 1;
                break;
            case "Enter":
                if ( this.blurOnEnter ) {
                    this.blur();
                    this.emit( 'enterPressed', this._value );
                    handled = 1;
                }
                break;
            case "Escape":
                if ( this.revertOnEsc ) {
                    this.setValue( this.focusStartValue, this._cursorPos );
                    this.blur();
                    this.emit( 'escPressed', this._value );
                    handled = 1;
                }
                break;
            default:
                if ( ev.key.length === 1 && !ev.ctrlKey && !ev.metaKey && !ev.altKey ) { // only single character keys
                    this.insertAtCursor( ev.key );
                    handled = 1;
                }
        }

        if ( handled ) {
            this.emit(ev);
            ev.preventDefault(); // prevent default browser actions
            ev.stopImmediatePropagation();
        }
    }

    wh_click ( ev ) {
// console.log('*** whClick', ev );
        // click outside the input, blur it
        if ( this.hasFocus && ev.target !== this.div && !this.div.contains( ev.target ) ) {
            this.blur(ev);
        }
    }

    ////////////////////////////////////

    on ( event, handler ) {
        ( this.evHandler[event] = this.evHandler[event] || [] ).push(handler);
    }
    addEventListener ( event, handler ) {
        this.on( event, handler );
    }

    off ( event, handler ) {
        if ( !this.evHandler[event] ) return;
        this.evHandler[event] = this.evHandler[event].filter( h => h !== handler );
    }
    removeEventListener ( event, handler ) {
        this.off( event, handler );
    }

    emit ( event, arg=null ) {
// console.log('### emit', event, ...args, this );
        const n = typeof event === 'object' ? {...event} : { type: event };
        n.target = this;
        if ( arg !== null ) {
            n.data = arg;
        }
        ( this.evHandler[event] || [] ).forEach( h => h(n) );
    }

    ///////////////////////////////////

    setStyles ( el, styles ) {
        for ( const st in styles ) {
            el.style[st] = styles[st];
        }
    }

    render () {
        const chars = [];

        this.div.innerHTML = "";
        for ( let i = 0; i < this._value.length; i++ ) {
            const el = document.createElement( "span" );
            if ( this._value[i] == ' ' ) {
                el.innerHTML = "&nbsp;"; // escape single space
            } else {
                el.innerText = this._value[i];
            }
            if ( !this.readonly ) {
                el.addEventListener( "click", ( ev ) => {
                    this.h_click_char( ev, i );
                });
            }
            this.div.appendChild( el );

            chars.push({ el });
        }

        this.chars = chars;
        this.getCharPositions();
        this.renderCursor();
    }

    getCharPositions () {
        const offsX = this.offsX;
        this.chars.forEach( ( char ) => {
            const bound = char.el.getBoundingClientRect();
            char.x1 = bound.left-offsX;
            char.x2 = bound.right-offsX;
        });
    }

    renderCursor () {
        const cursorStyle = this.cursorElement.style;
        if ( this.hasFocus ) {
            const lastCharIdx = this.chars.length-1;
            const cx = lastCharIdx<0 ? this.x+this.width/2 :
                    this._cursorPos>lastCharIdx ? this.chars[ lastCharIdx ].x2 : this.chars[ this._cursorPos ].x1;
            cursorStyle.left = (cx-0.5) + "px";
            cursorStyle.visibility  = "visible";
        } else {
            cursorStyle.visibility  = "hidden";
        }
    }

}
