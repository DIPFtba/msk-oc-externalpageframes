// import "./SimpleInput.css"

import { mergeDeep } from "../../libs/common.js";

export class SimpleInput {

    constructor ( opts = {} ) {

        const defaultOpts = {

            id: null, // optional id for the input element

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
        }
        mergeDeep( Object.assign( this, defaultOpts ), opts );

        // create container element
        const container = document.createElement( "div" );
        container.classList.add( "simple-input-container" );
        if ( this.id ) {
            container.id = `${this.id}-container`;
        }
        document.body.appendChild( container );
        this.container = container;

        // create input element
        const div = document.createElement( "div" );
        div.classList.add( "simple-input" );
        if ( this.id ) {
            div.id = this.id;
        }
        this.setStyles( div, {
            ...this.stylesNormal,
            left: this.x + "px",
            top: this.y + "px",
            width: this.width + "px",
            height: this.height + "px",
            fontSize: this.fontSize + "px",
        });
        if ( !this.maxFontSize ) {
            this.maxFontSize = this.fontSize;
        }

        [ 'click', 'mouseenter', 'mouseleave' ].forEach( ( ev ) =>
            div.addEventListener( ev, this[`h_${ev}`].bind(this) )
        );
        [ 'keydown', 'click' ].forEach( ( ev ) =>
            window.addEventListener( ev, this[`wh_${ev}`].bind(this), false )
        );

        container.appendChild( div );
        this.div = div;

        // create cursor element
        const cursorElement = document.createElement( "span" );
        cursorElement.classList.add( "simple-input", "cursor" );

        const span = document.createElement( "span" );
        span.innerText = "Hg";
        div.appendChild( span );
        const bound = span.getBoundingClientRect();
        this.setStyles( cursorElement, {
            ...this.stylesCursor,
            top: bound.top + "px",
            height: this.cursorHeight!==null ? this.cursorHeight + "px" : bound.height + "px",
            visibility: "hidden",
        });
        div.removeChild( span );

        container.appendChild( cursorElement );
        this.cursorElement = cursorElement;

        // inits
        this.evHandler = {};
        this.hasFocus = false;
        this.selectionStart = this.value.length; // cursor position in value
        this.selectionEnd = this.value.length;

        // initial Render
        this.render();

// if ( process.env.NODE_ENV !== 'production' ) {
window.simpleInput = this; // for debugging
// }
    }

    ///////////////////////////////////

    focus () {
        if ( !this.hasFocus ) {
            this.hasFocus = true;
            this.setStyles( this.div, this.stylesFocus );
            this.setCursorPos( Math.min( this.selectionStart, this.value.length ) );
            this.renderCursor();
            this.focusStartValue = this.value; // save current value for blur
            this.emit( 'focus' );
        }
    }

    blur () {
        if ( this.hasFocus ) {
            if ( this.value !== this.focusStartValue ) {
                this.emit( 'change', this.value );
            }
            this.emit( 'blur' );
            this.hasFocus = false;
            this.setStyles( this.div, this.stylesNormal );
            this.renderCursor();
        }
    }

    setValue ( newValue, newCursorPos=null ) {
        if ( this.maxlength && newValue.length > this.maxlength ) {
            this.emit( 'maxlength', newValue );
            return; // do not set value if it exceeds maxlength
        }
        if ( this.inputRegexp && !this.inputRegexp.test( newValue ) ) {
            this.emit( 'invalid', newValue );
            return; // do not set value if it does not match the regexp
        }

        if ( this.value !== newValue ) {
            const oldValue = this.value;
            const oldCursorPos = this.selectionStart;

            this.value = newValue;
            const effCursorPos = Math.min( newCursorPos ?? this.selectionStart, this.value.length );
            if ( this.selectionStart !== effCursorPos ) {
                this.setCursorPos( effCursorPos, false );
            }
            this.render();

            // check if text fits in div
            if ( newValue.length>0 && this.chars[0].x1 < this.x+this.padding+1 ) {

                // shrink if possible
                if ( !this.minFontSize || !this.resizeFont() ) {
                    // no shrinking posible, revert to old value
                    this.emit( 'oversize', newValue );
                    this.value = oldValue; // revert to old value
                    if ( effCursorPos !== oldCursorPos ) {
                        this.setCursorPos( oldCursorPos, false );
                    }
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
            const fontSize = this.value.length == 0 ?
                this.maxFontSize :
                Math.min(
                    this.maxFontSize,
                    this.fontSize * ( this.width - 2*this.padding - 2 ) / ( this.chars[ this.chars.length-1 ].x2 - this.chars[0].x1 )
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
        const newValue = this.value.slice( 0, this.selectionStart ) + text + this.value.slice( this.selectionStart );
// console.log('### insertAtCursor', text, this.selectionStart, this.value, newValue );
        this.setValue( newValue, this.selectionStart + text.length );
    }

    delBakSpace () {
        if ( this.selectionStart > 0 ) {
            const newValue = this.value.slice( 0, this.selectionStart - 1 ) + this.value.slice( this.selectionStart );
            this.setValue( newValue, this.selectionStart - 1 );
        }
    }

    delForward () {
        if ( this.selectionStart < this.value.length ) {
            const newValue = this.value.slice( 0, this.selectionStart ) + this.value.slice( this.selectionStart + 1 );
            this.setValue( newValue );
        }
    }

    setCursorPos ( cursorX, renderCursor=true ) {
// console.log('*** setCursorPos', this.selectionStart, cursorX );
        if ( this.selectionStart != cursorX ) {
            this.selectionStart = Math.max( 0, Math.min( cursorX, this.value.length ) );
            this.selectionEnd = this.selectionStart;
            if ( renderCursor ) {
                this.renderCursor();
            }
            this.emit( 'cursorPosChange', cursorX );
        }
    }

    curLeft () {
        if ( this.selectionStart > 0 ) {
            this.setCursorPos( this.selectionStart - 1 );
        }
    }

    curRight () {
        if ( this.selectionStart < this.value.length ) {
            this.setCursorPos( this.selectionStart + 1 );
        }
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
        const pageX = ev.pageX;
        if ( this.chars.length == 0 || pageX < this.chars[0].x1 ) {
            this.setCursorPos( 0 );
            ev.stopPropagation();
        } else if ( pageX > this.chars[ this.chars.length - 1 ].x2 ) {
            this.setCursorPos( this.value.length );
            ev.stopPropagation();
        } else {
            this.h_click_char( ev, this.chars.findIndex( ( char ) => pageX >= char.x1 && pageX <= char.x2 ) );
        }
    }

    h_mouseenter () {
        if ( !this.hasFocus ) {
            this.setStyles( this.div, this.stylesHover );
        };
    }

    h_mouseleave () {
        if ( !this.hasFocus ) {
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
        this.setCursorPos( ev.pageX < ( char.x1 + char.x2 ) / 2 ? idx : idx + 1 );
        ev.stopPropagation();
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
                this.setCursorPos( this.value.length );
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
                    this.emit( 'enterPressed', this.value );
                    this.blur();
                    handled = 1;
                }
                break;
            case "Escape":
                if ( this.revertOnEsc ) {
                    this.emit( 'escPressed', this.value );
                    this.setValue( this.focusStartValue, this.selectionStart );
                    this.blur();
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
            ev.preventDefault(); // prevent default browser actions
            ev.stopPropagation();
        }
    }

    wh_click ( ev ) {
// console.log('*** whClick', ev );
        // click outside the input, blur it
        if ( this.hasFocus && ev.target !== this.div && !this.div.contains( ev.target ) ) {
            this.blur();
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

    emit ( event, ...args ) {
// console.log('### emit', event, ...args );
        ( this.evHandler[event] || [] ).forEach( h => h(...args) );
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
        for ( let i = 0; i < this.value.length; i++ ) {
            const el = document.createElement( "span" );
            if ( this.value[i] == ' ' ) {
                el.innerHTML = "&nbsp;"; // escape single space
            } else {
                el.innerText = this.value[i];
            }
            el.addEventListener( "click", ( ev ) => {
                this.h_click_char( ev, i );
                ev.stopPropagation();
            });
            this.div.appendChild( el );

            chars.push({ el });
        }

        this.chars = chars;
        this.getCharPositions();
        this.renderCursor();
    }

    getCharPositions () {
        this.chars.forEach( ( char ) => {
            const bound = char.el.getBoundingClientRect();
            char.x1 = bound.left;
            char.x2 = bound.right;
        });
    }

    renderCursor () {
        const cursorStyle = this.cursorElement.style;
        if ( this.hasFocus ) {
            const lastCharIdx = this.chars.length-1;
            const cx = lastCharIdx<0 ? this.x+this.width/2 :
                    this.selectionStart>lastCharIdx ? this.chars[ lastCharIdx ].x2 : this.chars[ this.selectionStart ].x1;
            cursorStyle.left = (cx-0.5) + "px";
            cursorStyle.visibility  = "visible";
        } else {
            cursorStyle.visibility  = "hidden";
        }
    }

}
