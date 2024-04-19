/******/ (() => { // webpackBootstrap
/******/ 	"use strict";
/******/ 	var __webpack_modules__ = ({

/***/ "./freePaint.js":
/*!**********************!*\
  !*** ./freePaint.js ***!
  \**********************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "freePaintFromSchema": () => (/* binding */ freePaintFromSchema)
/* harmony export */ });
/* harmony import */ var _libs_rectArea__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../../libs/rectArea */ "../../libs/rectArea.js");
/* harmony import */ var konva_lib_Core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! konva/lib/Core */ "../../node_modules/konva/lib/Core.js");
/* harmony import */ var konva_lib_shapes_Line__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! konva/lib/shapes/Line */ "../../node_modules/konva/lib/shapes/Line.js");





class freePaintFromSchema extends _libs_rectArea__WEBPACK_IMPORTED_MODULE_2__.rectArea_freePaintMarker {

	constructor ( base, opts = {} ) {

		super( base, opts );

		// draw extra lines
		opts.extraLines.forEach( l => {
			const kLine = new konva_lib_Core__WEBPACK_IMPORTED_MODULE_0__["default"].Line({
				points: [ l.x1, l.y1, l.x2, l.y2 ],
				stroke: l.c,
				strokeWidth: l.w,
			})
			this.layer.add( kLine );
		})
		this.layer.draw();

		this.startListeningToGetImageRequests();
/////////////////
		window.getPngImage = this.getPngImage.bind(this);
//////////
	}

	getPngImage () {
		const url = this.stage.toDataURL({
			mimeType: "image/png",
			x: this.x + 0.5*this.frameWidth,
			y: this.y + 0.5*this.frameWidth,
			width: this.width - 2*this.frameWidth,
			height: this.height - 2*this.frameWidth,
		});
		console.log(url);
	}

	startListeningToGetImageRequests () {

		// listener for providing image as BASE64 URL
		window.addEventListener(
			"message",
			(event) => {

				try {
					const { callId } = JSON.parse(event.data);
					if ( callId !== undefined && callId.includes("getImage") ) {
						const image = this.getPngImage();
						const pass_data = {
							image,
							callId
						};

						window.parent.postMessage( JSON.stringify( pass_data ), '*' );
					}
				} catch (e) {}
			},
			false );
	}

}


/***/ }),

/***/ "../common.js":
/*!********************!*\
  !*** ../common.js ***!
  \********************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "addScoringValsParser": () => (/* binding */ addScoringValsParser),
/* harmony export */   "addStatusVarDef": () => (/* binding */ addStatusVarDef),
/* harmony export */   "clearCfgJson": () => (/* binding */ clearCfgJson),
/* harmony export */   "dp2inputRegExp": () => (/* binding */ dp2inputRegExp),
/* harmony export */   "readRangeArray": () => (/* binding */ readRangeArray)
/* harmony export */ });
function clearCfgJson( json ) {

	if ( typeof json !== 'object' ) {
		return json;
	}
	if ( Array.isArray(json) ) {
		return json.map( a => clearCfgJson(a) )
	}

	const res = {};

	Object.entries( json ).forEach( ([k,v]) => {

		if ( k.substring( 0, 3 ) === '___' ) {

			// // Keys der Elemente eines Arrays nehmen
			// const arelkeys = k.match( /^___arelkeys_(.*)/ );
			// if ( arelkeys ) {
			// 	json[ arelkeys[1] ] = v.map( e => Object.keys(e) );
			// } else {

				// Vals der Elemente eines Arrays nehmen
				const arelvals = k.match( /^___arelvals_(.*)/ );
				if ( arelvals ) {
					res[ arelvals[1] ] = v.map( e => Object.values(e).map( a => clearCfgJson(a) ) );
				} else {

					// Alternative Namen einfach so speichern
					const alts = k.match( /^___alt[^_]*_(.*)/ );
					if ( alts ) {
						if ( v !== undefined ) {
							res[ alts[1] ] = clearCfgJson( v );
						}
					} else {

						// ___ Object in json integrieren
						if ( typeof v === 'object' ) {
							Object.assign( res, clearCfgJson(v) );
						}

					}
				}
			// }

		} else {

			if ( v !== undefined ) {
				res[ k ] = clearCfgJson(v);
			}

		}
	})

	return res;
}

//////////////////////////////////////////////////////////////////////////////

function addScoringValsParser (obj) {

	obj.parseScoringVals = function (opts) {
		if ( opts.dataSettings && opts.dataSettings.scoringVals && this.scoreDef ) {

			const scoringVals = opts.dataSettings.scoringVals;
			const pref = opts.dataSettings.variablePrefix;

			const scores = this.scoreDef();
			if ( typeof scores === 'object' ) {
				const varNames = Object.keys( scores );
				if ( varNames.length>0 ) {

					scoringVals.forEach( sv => {
						let cond = sv.condition;
						if ( cond ) {
							let saveCond = cond;
							const allVarsInCond = cond.matchAll( /\$\{([^}]*)}/g );
							for ( const vn of allVarsInCond ) {
								if ( vn[1].length == 0 ) {
									console.error( `Variablen-Name '[]' in Scoring nicht zulässig` );
								} else {
									const re = new RegExp( vn[1], 'i' );
									const selVarNames = varNames.filter( v => v.match(re) );
									if ( selVarNames.length>1 ) {
										console.error( `Variablen-Name '[${vn[1]}]' in Scoring ist nicht eindeutig`);
										saveCond = '';
									} else if ( selVarNames.length == 0 ) {
										console.error( `Variablen-Name '[${vn[1]}]' in Scoring unbekannt`);
										saveCond = '';
									} else {
										saveCond = saveCond.replace( vn[0], `res.${selVarNames[0]}` );
									}
								}
							}
							if ( saveCond ) {
								if ( !( 'scoringVals' in this ) ) {
									this.scoringVals = {};
								}
								this.scoringVals[ sv.val ] = saveCond;
							}
						}
					});
				}
			}
		}
	}

	obj.computeScoringVals = function (res) {
		if ( this.scoringVals ) {
			let score = null;
			const scoreDat = Object.entries( this.scoringVals );
			for ( let h=0; score==null && h<scoreDat.length; h++ ) {
				const [v,c] = scoreDat[h];
				try {
					if ( eval(c) ) {
						score = v;
					}
				} catch (e) {}
			}
			const n = Number(score)
			res[ `S_${this.dataSettings.variablePrefix}` ] = score!== null && n!==NaN ? n : score;
		}
	}

}

//////////////////////////////////////////////////////////////////////////////

function addStatusVarDef ( obj, json ) {

	if ( !obj.statusVarDef && json.dataSettings && json.dataSettings.variablePrefix ) {
		const statVarName = `V_${json.dataSettings.variablePrefix}_Status`;
		obj.statusVarDef = function () {
			return {
				[statVarName]: +this.getDefaultChangeState(),
			}
		}
	}

}


//////////////////////////////////////

// convert "1 34,5:6-9" to [1,34,5,6,7,8,9]
/**
 * Parses a string containing range values and returns an array of numbers.
 * @param {string} s - The string containing the range values.
 * @returns {number[]} - An array of numbers parsed from the range values.
 */
const readRangeArray = (s) => {
	const res = [];

	for ( const rr of s.matchAll( /([0-9]+) *(?:- *([0-9]+))?/g ) ) {
		if ( rr[2] && rr[1]<rr[2] ) {
			const rr2=Number(rr[2]);
			for ( let h=Number(rr[1]); h<=rr2; h++ ) {
				res.push(h);
			}
		} else {
			res.push( Number(rr[1]) )
		}
	}

	return res;
}

//////////////////////////////////////

/**
 * Converts an object containing properties for decimal places, decimal precision, and units into a regular expression for input validation.
 * @param {Object} obj - The object containing properties for decimal places, decimal precision, and units.
 */
const dp2inputRegExp = (obj) => {

	/**
	 * Generates a regular expression pattern for a given unit.
	 * @param {string} u - The unit string.
	 * @returns {string} The regular expression pattern for the unit.
	 */
	const unitRegExp = (u) => {
		let r = '';
		for ( const c of u.trim() ) {
			const u = c.toUpperCase();
			const l = c.toLowerCase();
			r += u != l ? `[${l}${u}]?` : `${c}?`;
		}
		return r;
	};

	if ( obj.pdp || obj.dp ) {
		let re = `^[0-9]${ obj.pdp ? `{0,${obj.pdp}}` : '*' }`;
		if ( obj.dp ) {
			re += `([,.][0-9]{0,${obj.dp}})?`;
		}
		if ( obj.units ) {
			re += ` ?(${obj.units.split('|').map( u => unitRegExp(u) ).join('|')})?`;
		}
		obj.inputRegexp = re + '$';
	}
	delete obj.pdp;
	delete obj.dp;
	delete obj.units;
}


/***/ }),

/***/ "../../libs/baseInits.js":
/*!*******************************!*\
  !*** ../../libs/baseInits.js ***!
  \*******************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "baseInits": () => (/* binding */ baseInits)
/* harmony export */ });
/* harmony import */ var _common__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./common */ "../../libs/common.js");
/* harmony import */ var _fsm__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./fsm */ "../../libs/fsm.js");



// Konva should bei imported, but doens't seem to support tree shaking, so leave it out
// import Konva from 'konva/lib/Core'

class baseInits {

	constructor ( opts = {} ) {

		// Options and defaults
		const defaults = {
			container: null,
			addSendChangeState: null,
		}
		Object.assign( this, defaults, opts );

		// create fsm object, if not provided
		if ( !this.fsm ) {
			this.fsm = new _fsm__WEBPACK_IMPORTED_MODULE_0__.fsmSend();
			this.fsm.startListeningToVariableDeclarationRequests( this.declareVariables.bind(this) );
		}

		// init stage & layer
		if ( opts.container ) {
			if ( !this.width ) {
				this.width = window.innerWidth;
			}
			if ( !this.height ) {
				this.height = window.innerHeight;
			}

			this.stage = new Konva.Stage({
				container: this.container,
				width: this.width,
				height: this.height,
			});


			const stageVN = "BW_IB_EXTRES_STAGES";
			if ( !( stageVN in window ) ) {
				window[stageVN] = [];
			}
			window[stageVN].push( this.stage );


			// this.layer = new Konva.Layer();
			// this.stage.add( this.layer );
		}

		// disable mouse right click
		document.addEventListener( 'contextmenu', (ev) => ev.preventDefault() );

		this.FSMVarsSent = {};
	}

	///////////////////////////////////

	// method wrapper for posting to FSM

	postLog ( event, data={} ) {
		if ( !this.stage || !this.stage.isDemoAni ) {
			this.fsm.postLogEvent( Object.assign( {}, data, { event: event } ) );
		}
	}

	postVariable ( name, val ) {
		this.FSMVarsSent[name] = val;
		this.fsm.setFSMVariable( name, val );
	}

	triggerInputValidationEvent () {
		if ( this.fsm.triggerEvent ) {
////////////////////
			if ( this.dataSettings && this.dataSettings.variablePrefix ) {
				this.fsm.triggerEvent( 'ev_InputValidation_' + this.dataSettings.variablePrefix );
			}
/////////
////////////////////////////////////////////////////////////////////////////////
//////////
			this.fsm.triggerEvent( 'ev_InputValidation_ExtRes' );
		}
	}

	///////////////////////////////////

	// get state-vars of obj
	getChangeState ( obj ) {

		// statusVarDef defined in obj?
		if ( obj.statusVarDef ) {

			return obj.statusVarDef.call(obj);

		} else {

			// call defaultChangeState()
			return +obj.getDefaultChangeState();

		}
	}

	sendChangeState ( obj, newState=null ) {

		// Dont send states or score in demoAni
		if ( obj.stage && obj.stage.isDemoAni ) {
			return;
		}

		// state Variable (changeState) changed?
		const changeState = ( newState===null ? this.getChangeState(obj) : newState );

		// is state changed? -> send msgs
		if ( typeof obj.oldChangeState === 'undefined' || !(0,_common__WEBPACK_IMPORTED_MODULE_1__.object_equals)( changeState, obj.oldChangeState ) ) {

			if ( typeof changeState === 'object' ) {
				// changeState = { FSMStateVar1: state1, FSMStateVar2: state2, ... }
				for ( let k in changeState ) {
					if ( typeof obj.oldChangeState !== 'object' || changeState[k] !== obj.oldChangeState[k] ) {
						this.postVariable( k, changeState[k] );
					}
				}

			} else if ( obj.FSMVariableName ) {
				// Simple 1-value state
				this.postVariable( `V_Status_${obj.FSMVariableName}`, +changeState );
			}

			obj.oldChangeState = changeState;
		}

		// score changed?
		if ( obj.scoreDef ) {

			const score = obj.scoreDef.call(obj);

			if ( typeof obj.oldScore === 'undefined' || !(0,_common__WEBPACK_IMPORTED_MODULE_1__.object_equals)( score, obj.oldScore ) ) {
				if ( typeof score === 'object' ) {
					// score = { FSMStateVar1: state1, FSMStateVar2: state2, ... }
					for ( let k in score ) {
						if ( typeof obj.oldScore !== 'object' || score[k] !== obj.oldScore[k] ) {
							this.postVariable( k, score[k] );
						}
					}

				} else if ( obj.FSMVariableName || obj.scoreVariableName ) {
					// Simple 1-value score
					if ( typeof score !== 'undefined' ) {
						this.postVariable( obj.scoreVariableName || `V_Score_${obj.FSMVariableName}`, score );
					}
				}
			}

			obj.oldScore = score;
		}

		if ( typeof this.addSendChangeState === 'function' ) {
			(this.addSendChangeState)();
		}
	}

	// send information about variables sent
	declareVariables () {

		const varDefs = [];
		const typetrans = {
			'string': 'String',
			'number': 'Integer',
		}

		for ( const vname in this.FSMVarsSent ) {

			const val = this.FSMVarsSent[vname];
			const vdef = {
				name: vname,
				type: val===null ? 'Integer' : typetrans[ typeof val ],
				defaultValue: val,
				namedValues: [],
			}
			varDefs.push( vdef );
		}

		return varDefs;
	}
}


/***/ }),

/***/ "../../libs/class_extensions.js":
/*!**************************************!*\
  !*** ../../libs/class_extensions.js ***!
  \**************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "addFreeLabelsTo": () => (/* binding */ addFreeLabelsTo),
/* harmony export */   "addFreePaintTo": () => (/* binding */ addFreePaintTo),
/* harmony export */   "addInsertButtonsTo": () => (/* binding */ addInsertButtonsTo)
/* harmony export */ });
/* harmony import */ var _common__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./common */ "../../libs/common.js");
/* harmony import */ var konva_lib_Core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! konva/lib/Core */ "../../node_modules/konva/lib/Core.js");
/* harmony import */ var konva_lib_shapes_Line__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! konva/lib/shapes/Line */ "../../node_modules/konva/lib/shapes/Line.js");
/* harmony import */ var _textFrame__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! ./textFrame */ "../../libs/textFrame.js");
/* harmony import */ var _iconBar__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./iconBar */ "../../libs/iconBar.js");
/* harmony import */ var _img_penicon_png__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./img/penicon.png */ "../../libs/img/penicon.png");
/* harmony import */ var _img_erasericon_png__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ./img/erasericon.png */ "../../libs/img/erasericon.png");
/* harmony import */ var _img_clearicon_png__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ./img/clearicon.png */ "../../libs/img/clearicon.png");
/* harmony import */ var _img_markericon_png__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! ./img/markericon.png */ "../../libs/img/markericon.png");








//////////////////////////////////////////////////////////////////////////////

/**
 * Deep merge of source to target, but only keys present in target
 * Overwrites result in this
 */
function mergeAdditionalDefaultsToThis( target, source ) {

	for ( const key in target ) {
		this[key] = ( key in source ? (0,_common__WEBPACK_IMPORTED_MODULE_2__.mergeDeep)( target[ key ], source[key] ) : target[key] );
	}

	return target;
}

//////////////////////////////////////////////////////////////////////////////

const addInsertButtonsTo = ( baseClass, extraDefaults=null, inputCallback=null ) => class extends baseClass {

	constructor ( base, opts = {} ) {

		super( base, opts );
		if ( !opts.insertIconDefs || !opts.insertIconDefs.length ) {
			return;
		}

		// Merge addDefaults & opts into this
		const additionalDefaultOpts = {

			insertIconDefs: [
				// { x:, y:, (width:,) texts: [ '+', '-', ...] }
			],

			insertIconBarDef: {
				framePadding: 0,
				frameFill: 'white',
				fontSize: 18,
				spacing: 0,
				sticky: false,
			},

		}
		if ( extraDefaults!==null ) {
			if ( typeof extraDefaults === 'function' ) {
				extraDefaults.call( this, additionalDefaultOpts );
			} else {
				(0,_common__WEBPACK_IMPORTED_MODULE_2__.mergeDeep)( additionalDefaultOpts, extraDefaults );
			}
		}
		mergeAdditionalDefaultsToThis.call( this, additionalDefaultOpts, opts );

		// insertion iconBar
		this.insertIconBars = [];

		this.insertIconDefs.forEach( t => {
			const opts = Object.assign( {}, this.insertIconBarDef, t );
			opts.icons = t.texts.map( t =>
				( typeof t === 'object' ? t : {
					text: {
						text: t,
						fontSize: this.insertIconBarDef.fontSize,
					},
					on: () => {
						this.base.postLog( 'insertButtonPressed', { text: t } );
						this.insertButton(t);
					},
				}) );
			this.insertIconBars.push( new _iconBar__WEBPACK_IMPORTED_MODULE_3__.iconBar( this.stage, opts ) );
		})

	}

	///////////////////////////////////

	// insert button pressed
	insertButton (t) {
		if ( document.activeElement.tagName === 'INPUT' ) {

			const inp = document.activeElement;
			if ( inp.selectionStart || inp.selectionStart == '0' ) {
				const startPos = inp.selectionStart;
				const endPos = inp.selectionEnd;
				inp.value = inp.value.substring( 0, startPos )
					+ t
					+ inp.value.substring( endPos, inp.value.length );
			} else {
				inp.value += t;
			}

			if ( inputCallback!==null ) {
				inputCallback.call(this);
			}
		}
	}

}

//////////////////////////////////////////////////////////////////////////////

;




const addFreePaintTo = ( baseClass, linesChangeState=1, hasMarker=0, extraDefaults=null ) => class extends baseClass {

	constructor ( base, opts = {} ) {

		super( base, opts );
		if ( opts.paintLines===null || opts.modeIconBarDef===null ) {
			return;
		}
		const stage = this.stage;

		const additionalDefaultOpts = {

			paintLines: {
				brush: {
					stroke: 'blue',
					strokeWidth: 2,
					globalCompositeOperation: 'source-over',
					lineCap: 'round',
					lineJoin: 'round',
				},
				marker: {
					stroke: '#6666ff',
					strokeWidth: 25,
					globalCompositeOperation: 'source-over',
					lineCap: 'round',
					lineJoin: 'round',
				},
				erase: {
					stroke: 'blue',
					strokeWidth: 15,
					globalCompositeOperation: 'destination-out',
					lineCap: 'round',
					lineJoin: 'round',
				},
			},

			modeIconBarDef: {
				framePadding: 0,
				spacing: 0,
				default: 0,
				frameFill: 'white',
				icons: [
					{
						src: _img_penicon_png__WEBPACK_IMPORTED_MODULE_4__,
						cursor: `url(${_img_penicon_png__WEBPACK_IMPORTED_MODULE_4__}), auto`,
						on: () => this.setPaintMode('brush'),	// overwritten by addFreePaint
						off: () => this.setPaintMode('none'),	// overwritten by addFreePaint
					},{
						src: _img_erasericon_png__WEBPACK_IMPORTED_MODULE_5__,
						cursor: `url(${_img_erasericon_png__WEBPACK_IMPORTED_MODULE_5__}), auto`,
						on: () => this.setPaintMode('erase'),	// overwritten by addFreePaint
						off: () => this.setPaintMode('none'),	// overwritten by addFreePaint
					},{
						src: _img_clearicon_png__WEBPACK_IMPORTED_MODULE_6__,
						on: () => this.freePaintClearAll(),
					}],
			},
		};
		if ( hasMarker && ( opts.hasMarker===undefined || opts.hasMarker ) ) {
			additionalDefaultOpts.modeIconBarDef.icons.splice( 1, 0, {
				src: _img_markericon_png__WEBPACK_IMPORTED_MODULE_7__,
				cursor: `url(${_img_markericon_png__WEBPACK_IMPORTED_MODULE_7__}), auto`,
				on: () => this.setPaintMode('marker'),	// overwritten by addFreePaint
				off: () => this.setPaintMode('none'),	// overwritten by addFreePaint
			})
		}
		if ( extraDefaults!==null ) {
			if ( typeof extraDefaults === 'function' ) {
				extraDefaults.call( this, additionalDefaultOpts );
			} else {
				(0,_common__WEBPACK_IMPORTED_MODULE_2__.mergeDeep)( additionalDefaultOpts, extraDefaults );
			}
		}
		mergeAdditionalDefaultsToThis.call( this, additionalDefaultOpts, opts );

		this.freePaintInit();

		this.initData = this.getChState();
		this.base.sendChangeState( this );	// init & send changeState & score

		// interactivity
		if ( !this.readonly ) {

			// Start painting
			stage.on('mousedown touchstart', ev => {

				if ( ['brush','marker','erase'].includes( this.mode ) ) {
					this.isPainting = 1;
					const pos = (0,_common__WEBPACK_IMPORTED_MODULE_2__.getPosOfEvent)( this.stage, ev );
					this.paintPoints = [ pos.x, pos.y ];
					if ( this.mode != 'marker' ) {
						this.kFreePaintLine = new konva_lib_Core__WEBPACK_IMPORTED_MODULE_0__["default"].Line( Object.assign( {}, this.paintLines[ this.mode ], {
							points: this.paintPoints,
						}));
						this.kFreePaintBrushGroup.add( this.kFreePaintLine );
					} else {
						this.kFreePaintLine = null;
					}
					if ( hasMarker && ( this.hasMarker===undefined || this.hasMarker ) ) {
						if ( this.mode != 'brush' ) {
							this.kFreePaintMarkerLine = new konva_lib_Core__WEBPACK_IMPORTED_MODULE_0__["default"].Line( Object.assign( {}, this.paintLines[ this.mode ], {
								points: this.paintPoints,
							}));
							this.kFreePaintMarkerGroup.add( this.kFreePaintMarkerLine );
						} else {
							this.kFreePaintMarkerLine = null;
						}
					}

					ev.cancelBubble = true;
				}
			} );

			// End painting
			stage.on('mouseup mouseleave touchend', (ev) => {

				if ( (0,_common__WEBPACK_IMPORTED_MODULE_2__.ignoreEvent)( this.stage, ev ) ) {
					return;
				}
				if ( this.isPainting ) {
					this.isPainting = 0;
					if ( this.paintPoints.length>2 ) {
						this.linesCopy.push( {
							t: this.mode.substr( 0, 1 ),
							p: this.paintPoints,
						})
						const logNames = {
							brush: 'paintLine',
							marker: 'paintMarker',
							erase: 'paintErase',
						}
						this.base.postLog( logNames[ this.mode ], { points: this.paintPoints } );
						this.base.sendChangeState( this );	// init & send changeState & score
					}
				}
			});

			// and core function - drawing
			stage.on('mousemove touchmove', ev => {
				if ( this.isPainting ) {
					const pos = (0,_common__WEBPACK_IMPORTED_MODULE_2__.getPosOfEvent)( this.stage, ev );
					this.paintPoints.push( pos.x );
					this.paintPoints.push( pos.y );
					if ( this.kFreePaintMarkerLine ) {
						this.kFreePaintMarkerLine.points( this.paintPoints );
						this.freePaintMarkerLayer.batchDraw();
					}
					if ( this.kFreePaintLine ) {
						this.kFreePaintLine.points( this.paintPoints );
						this.freePaintLayer.batchDraw();
					}
				}
			} );

			stage.on( 'mouseleave', (ev) => {
				if ( (0,_common__WEBPACK_IMPORTED_MODULE_2__.ignoreEvent)( this.stage, ev ) ) {
					return;
				}
				this.cursorSaved = document.body.style.cursor;
				document.body.style.cursor = "default";
			});

			stage.on( 'mouseenter', () => {
				if ( this.cursorSaved ) {
					document.body.style.cursor = this.cursorSaved;
					this.cursorSaved = null;
				}
			})
		}
	}

	///////////////////////////////////

	freePaintInit () {

		// init PaintLines
		if ( hasMarker && ( this.hasMarker===undefined || this.hasMarker ) ) {
			if ( !this.freePaintMarkerLayer ) {
				this.freePaintMarkerLayer = new konva_lib_Core__WEBPACK_IMPORTED_MODULE_0__["default"].Layer();
				this.stage.add( this.freePaintMarkerLayer );
				this.freePaintMarkerLayer.moveToBottom();
			}

			const bclip = ( this.freePaintMarkerClipFunc ? { clipFunc: this.freePaintMarkerClipFunc.bind(this) } : {} );
			this.kFreePaintMarkerGroup = new konva_lib_Core__WEBPACK_IMPORTED_MODULE_0__["default"].Group( bclip );
			this.freePaintMarkerLayer.add( this.kFreePaintMarkerGroup );

			this.kFreePaintMarkerLine = null;
		}

		if ( !this.freePaintLayer ) {
			this.freePaintLayer = new konva_lib_Core__WEBPACK_IMPORTED_MODULE_0__["default"].Layer();
			this.stage.add( this.freePaintLayer );
		}

		const fclip = ( this.freePaintBrushClipFunc ? { clipFunc:this.freePaintBrushClipFunc.bind(this) } : {} );
		this.kFreePaintBrushGroup = new konva_lib_Core__WEBPACK_IMPORTED_MODULE_0__["default"].Group( fclip );
		this.freePaintLayer.add( this.kFreePaintBrushGroup );

		this.linesCopy = [];
		this.isPainting = 0;
		this.paintPoints = [];
		this.kFreePaintLine = null;

		// iconBar
		this.modeIconBar = new _iconBar__WEBPACK_IMPORTED_MODULE_3__.iconBar( this.stage, this.modeIconBarDef );
	}

	///////////////////////////////////

	freePaintClearAll ( notify=true ) {
		if ( hasMarker && ( this.hasMarker===undefined || this.hasMarker ) ) {
			this.kFreePaintMarkerGroup.destroyChildren();
			this.freePaintMarkerLayer.batchDraw();
		}
		this.kFreePaintBrushGroup.destroyChildren();
		this.freePaintLayer.batchDraw();

		this.linesCopy = [];

		this.modeIconBar.clickOn(0);

		if ( notify ) {
			this.base.postLog( 'paintClearAll', {} );

			this.base.sendChangeState( this );	// init & send changeState & score
		}
	}

	setPaintMode (mode) {
		this.mode = mode;
		this.base.postLog( 'modeSet', { mode } )
	}

	///////////////////////////////////

	getState () {

		const superState = super.getState();

		if ( this.linesCopy.length ) {

			const state = JSON.parse( superState );
			state.lines = this.linesCopy;
			return JSON.stringify( state );

		} else {

			return superState;

		}
	}

	setState ( state ) {

		super.setState( state );

		try {

			const obj = JSON.parse(state);

			// reconstruct lines
			if ( obj.lines ) {
				this.freePaintClearAll(false);

				obj.lines.forEach( line => {
					const modeTrans = {
						b: 'brush',
						m: 'marker',
						e: 'erase',
					}
					const mode = modeTrans[ line.t ];
					const kLine = new konva_lib_Core__WEBPACK_IMPORTED_MODULE_0__["default"].Line( Object.assign( {}, this.paintLines[ mode ], {
						points: line.p,
					}));
					if ( mode != 'marker' ) {
						this.kFreePaintBrushGroup.add( kLine );
					}
					if ( hasMarker && ( this.hasMarker===undefined || this.hasMarker ) && mode != 'brush' ) {
						this.kFreePaintMarkerGroup.add( mode != 'marker' ? kLine.clone() : kLine );
					}
				})
				this.linesCopy = obj.lines;
			}

			if ( hasMarker && ( this.hasMarker===undefined || this.hasMarker ) ) {
				this.freePaintMarkerLayer.draw();
			}
			this.freePaintLayer.draw();

		} catch (e) {
			console.error(e);
		}

		(0,_common__WEBPACK_IMPORTED_MODULE_2__.setStatePostProc)(this);
	}

	getChState () {
		const s = super.getChState();
		if ( linesChangeState && this.linesCopy && this.linesCopy.length ) {
			s.lines = this.linesCopy;
		}
		return  s;
	}

	getDefaultChangeState () {

		return super.getDefaultChangeState() || !!( linesChangeState && this.linesCopy && this.linesCopy.length );

	}
}

//////////////////////////////////////////////////////////////////////////////

const addFreeLabelsTo = ( baseClass ) => class extends baseClass {

	// baseClass must call this.redraw() when values are changed
	// depending changes in pos/text of labels

	constructor ( base, opts = {} ) {

		super( base, opts );
		if ( !opts.freeLabels || !opts.freeLabels.length ) {
			return;
		}

		const additionalDefaultOpts = {

			freeLabels: [
				// {
				// 	x, y, value,		// values or
				// 	xFnc, yFnc, valueFnc, 	// functions that return new Values (updated in this.redraw())
				// 	// additional textFrame-Options
				// }
			],

			defaultFreeLabelOpts: {
				value: '',
				width: 50,
				height: 25,
				fontSize: 15,
				frameWidth: 1,
				cornerRadius: 4,
			},

		};
		mergeAdditionalDefaultsToThis.call( this, additionalDefaultOpts, opts );

		this.freeLabelsInit();
		this.redraw();

		this.initData = this.getChState();
		this.base.sendChangeState( this );	// init & send changeState & score
	}

	///////////////////////////////////

	freeLabelsInit () {

		this.freeLabelsLayer = this.stage.getLayers().slice(-1)[0];

		// create freeLabels
		this.freeLabels.forEach( (l,nr) => {
			if ( l.xFnc ) {
				l.x = l.xFnc.call(this);
			}
			if ( l.yFnc ) {
				l.y = l.yFnc.call(this);
			}
			if ( l.valuefnc ) {
				l.value = l.valueFnc.call(this);
			}

			if ( l.textObj ) {
				l.textObj.deleteAll();
			}
			l.textObj = new _textFrame__WEBPACK_IMPORTED_MODULE_8__.textFrame(
				this.base,
				this.freeLabelsLayer,
				Object.assign( {}, this.defaultFreeLabelOpts, l, {
					logObjectId: nr+1,
					onChange: () => {
						this.base.postLog( 'labelChanged', {
							id: nr+1,
							labelNew: l.textObj.value,
						});
						this.base.sendChangeState( this );
					},
				})
			);
		})
	}

	///////////////////////////////////

	redraw () {

		super.redraw.apply( this, arguments );

		// attributes of freeLabels (x, y, text) changed?
		let redraw = 0;
		this.freeLabels.forEach( l => {
			let newPos = 0;
			if ( l.xFnc ) {
				const nval = l.xFnc.call(this);
				if ( nval != l.x ) {
					l.x = nval;
					newPos=1;
				}
			}
			if ( l.yFnc ) {
				const nval = l.yFnc.call(this);
				if ( nval != l.y ) {
					l.y = nval;
					newPos=1;
				}
			}
			if ( newPos ) {
				l.textObj.repos( l.x, l.y );
				redraw = 1;
			}

			if ( l.valueFnc ) {
				const nval = l.valueFnc.call(this);
				if ( nval != l.value ) {
					l.value = nval;
					l.textObj.setVal( nval );
					redraw = 1;
				}
			}
		})

		if ( redraw ) {
			this.freeLabelsLayer.batchDraw();
		}
	}

	///////////////////////////////////

	getState () {

		const superState = super.getState();

		if ( this.freeLabels.length ) {

			let hasData = false;
			const data = this.freeLabels.map( l => {
				if ( !l.readonly ) {
					hasData = true;
					return ({ value: l.textObj.value });
				}
				return ({});
			});

			if ( !hasData ) {
				return superState;
			}

			const state = JSON.parse( superState );
			state.freeLabels = data;
			return JSON.stringify( state );

		} else {

			return superState;

		}
	}

	setState ( state ) {

		super.setState( state );

		try {

			const obj = JSON.parse(state);

			// merge Label-Defs
			if ( obj.freeLabels ) {
				obj.freeLabels.forEach( ( l, n ) => Object.assign( this.freeLabels[n], l ) );
			}
			this.freeLabelsInit();

			this.freeLabelsLayer.draw();

		} catch (e) {
			console.error(e);
		}

		(0,_common__WEBPACK_IMPORTED_MODULE_2__.setStatePostProc)(this);
	}

	getChState () {
		const s = super.getChState();
		if ( this.freeLabels ) {
			s.l = this.freeLabels.filter( l => !l.readonly ).map( l => l.textObj ? l.textObj.value : '' );
		}
		return  s;
	}

}

//////////////////////////////////////////////////////////////////////////////


/***/ }),

/***/ "../../libs/common.js":
/*!****************************!*\
  !*** ../../libs/common.js ***!
  \****************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "addArrow": () => (/* binding */ addArrow),
/* harmony export */   "delDefaults": () => (/* binding */ delDefaults),
/* harmony export */   "getAbsPosition": () => (/* binding */ getAbsPosition),
/* harmony export */   "getPosOfEvent": () => (/* binding */ getPosOfEvent),
/* harmony export */   "getXofEvent": () => (/* binding */ getXofEvent),
/* harmony export */   "getYofEvent": () => (/* binding */ getYofEvent),
/* harmony export */   "ignoreEvent": () => (/* binding */ ignoreEvent),
/* harmony export */   "isBetween": () => (/* binding */ isBetween),
/* harmony export */   "isNumUnit": () => (/* binding */ isNumUnit),
/* harmony export */   "mergeDeep": () => (/* binding */ mergeDeep),
/* harmony export */   "object_equals": () => (/* binding */ object_equals),
/* harmony export */   "setStatePostProc": () => (/* binding */ setStatePostProc)
/* harmony export */ });

// import { isBetween, delDefaults, mergeDeep, object_equals, getXofEvent, getYofEvent, getPosOfEvent } from './common'

function isBetween ( v, w1, w2 ) {
	return v >= Math.min( w1, w2 ) && v <= Math.max( w1, w2 );
};


function isNumUnit ( v, num, unitRE, unitOpt, orEmpty ) {
	const numRE = `0*${num}(?:[,.]0*)?`;
	const r = unitOpt ? `${numRE}(?: *${unitRE})?|(?:${unitRE} *)?${numRE}` : `${numRE} *${unitRE}|${unitRE} *${numRE}`;
	const re = new RegExp( `^(?:${r})${ orEmpty ? '?' : '' }$` );
	return v.trim().match(re);
}


// Deletes delKeys & unchanged defaults from obj
// object deep clone, omitting some data defined by defaults and delKeys
// adopted from https://stackoverflow.com/questions/4459928/how-to-deep-clone-in-javascript
function delDefaults ( obj = {}, defaults = {}, delKeys = [] ) {

	// if obj is array of objects: apply delDefaults to every member of array
	if ( Array.isArray(obj) ) {
		let a = [];
		obj.forEach( e => {
			if ( typeof e==='object' ) {
				a.push( delDefaults( e, defaults, delKeys ) );
			} else {
				a.push(e);
			}
		})
		return a;
	}

	if ( !obj ) {
		return obj;
	}

	let v;
	let bObject = {};
	for ( const k in obj ) {
		if ( !delKeys.includes(k) ) {
			v = obj[k];
			if ( !defaults || defaults[k]!==v ) {
				bObject[k] = (typeof v === "object") ? delDefaults( v, defaults ? defaults[k] : [] ) : v;
			}
		}
	}

	return bObject;
}

/**
 * From: https://gist.github.com/ahtcx/0cd94e62691f539160b32ecda18af3d6
 * Performs a deep merge of `source` into `target`.
 * Mutates `target` only but not its objects and arrays.
 *
 * @author inspired by [jhildenbiddle](https://stackoverflow.com/a/48218209).
 */
function mergeDeep (target, source) {
	const isObject = (obj) => obj && typeof obj === 'object';

	if (!isObject(target) || !isObject(source)) {
		return source;
	}

	Object.keys(source).forEach(key => {
		const targetValue = target[key];
		const sourceValue = source[key];

		if ( /*Array.isArray(targetValue) &&*/ Array.isArray(sourceValue)) {
			// NO CONCATENATION OF ARRAYS!
			// target[key] = targetValue.concat(sourceValue);
			target[key] = sourceValue;
		} else if (isObject(targetValue) && isObject(sourceValue)) {
			target[key] = mergeDeep(Object.assign({}, targetValue), sourceValue);
		} else {
			target[key] = sourceValue;
		}
	});

	return target;
}

//////////////////////////////////////

// adopted from https://stackoverflow.com/questions/1068834/object-comparison-in-javascript
function object_equals ( x, y ) {
	if ( x === y ) return true;
	// if both x and y are null or undefined and exactly the same

	if ( ! ( x instanceof Object ) || ! ( y instanceof Object ) ) return false;
	// if they are not strictly equal, they both need to be Objects

	if ( x.constructor !== y.constructor ) return false;
	// they must have the exact same prototype chain, the closest we can do is
	// test there constructor.

	// if both are arrays: unordered compare (check if all elements are contained)
	if ( Array.isArray(y) && Array.isArray(x) ) {
		if ( x.length != y.length ) return false;
		const y2 = Array.from( y );
		if ( !x.every( xe =>
			y2.some( ( ye, i ) => {
				if ( object_equals( xe, ye ) ) {
					y2.splice( i, 1 );
					return true;
				}
				return false;
			})
		)) return false;
		return y2.length===0;
	}

	for ( var p in x ) {
		if ( ! x.hasOwnProperty( p ) ) continue;
			// other properties were tested using x.constructor === y.constructor

		if ( ! y.hasOwnProperty( p ) ) return false;
			// allows to compare x[ p ] and y[ p ] when set to undefined

		if ( x[ p ] === y[ p ] ) continue;
			// if they have the same strict value or identity then they are equal

		if ( typeof( x[ p ] ) !== "object" ) return false;
			// Numbers, Strings, Functions, Booleans must be strictly equal

		if ( ! object_equals( x[ p ],  y[ p ] ) ) return false;
			// Objects and Arrays must be tested recursively
	}

	for ( p in y )
	if ( y.hasOwnProperty( p ) && ! x.hasOwnProperty( p ) )
		return false;
		// allows x[ p ] to be set to undefined

	return true;
}

//////////////////////////////////////

function getXofEvent ( stage, event ) {
	if ( event ) {
		if ( event.simX ) {
			return event.simX;
		}
		// if ( event.evt && event.evt.clientX ) {
		// 	return event.evt.clientX;
		// }
	}
	return stage.getPointerPosition().x;
}


function getYofEvent ( stage, event ) {
	if ( event ) {
		if ( event.simY ) {
			return event.simY;
		}
		// if ( event.evt && event.evt.clientY ) {
		// 	return event.evt.clientY;
		// }
	}
	return stage.getPointerPosition().y;
}


function getPosOfEvent ( stage, ev ) {
	return {
		x: getXofEvent( stage, ev ),
		y: getYofEvent( stage, ev ),
	}
}


// is in DemoAni: ignore native Events (prevent e.g. stage.on(mouseleave))
function ignoreEvent ( stage, ev ) {
	return ( stage && stage.isDemoAni && !( "simX" in ev ) );
}


//////////////////////////////////////

const setStatePostProc = function (obj) {

	if ( obj.stage && obj.stage.isDemoAni && obj.stage.isDemoAni.endAni ) {
		obj.stage.isDemoAni.endAni( false );
	}

	if ( obj.base ) {
		obj.base.sendChangeState( obj );	// init & send changeState & score
	}
	// obj.oldChangeState = obj.base.getChangeState(obj);
	// if ( obj.scoreDef ) {
	// 	obj.oldScore = obj.scoreDef();
	// }
}

//////////////////////////////////////

const getAbsPosition = function (element) {
	const box = element.getBoundingClientRect();
	const scrollX = window.scrollX || window.pageXOffset;
	const scrollY = window.scrollY || window.pageYOffset;
	return {
		left: box.left + scrollX,
		top: box.top + scrollY
	}
}


//////////////////////////////////////

const addArrow = function ( layer, opts ) {
	layer.add(new Konva.Line(opts));
	const pointerLength = opts.pointerLength || 10;
	const pointerWidth = opts.pointerWidth/2 || 3;
	const s = { x: opts.points[0], y: opts.points[1] };
	const p0 = { x: opts.points[2], y: opts.points[3] };
	const dx = s.x - p0.x;
	const dy = s.y - p0.y;
	const norm = Math.sqrt(dx * dx + dy * dy);
	const u = { x: dx / norm, y: dy / norm };
	const v = { x: -u.y, y: u.x };
	const p1 = {
		x: p0.x + pointerLength * u.x + pointerWidth * v.x,
		y: p0.y + pointerLength * u.y + pointerWidth * v.y
	};
	const p2 = {
		x: p0.x + pointerLength * u.x - pointerWidth * v.x,
		y: p0.y + pointerLength * u.y - pointerWidth * v.y
	};
	layer.add(
		new Konva.Line({
			fill: "black",
			...opts,
			points: [p1.x, p1.y, p0.x, p0.y, p2.x, p2.y],
			closed: true
		})
	);
};


/***/ }),

/***/ "../../libs/fsm.js":
/*!*************************!*\
  !*** ../../libs/fsm.js ***!
  \*************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "fsmSend": () => (/* binding */ fsmSend)
/* harmony export */ });
// Set FSM variable

class fsmSend {

	constructor () {
		this.indexPath = this.getQueryVariable('indexPath');
		this.userDefIdPath = this.getQueryVariable('userDefIdPath');

		// Trace Counter
		this.traceCount = 0;

		if ( true ) {
			window.bw__debugOut = this.debugOut.bind(this);
		}
	}

	setFSMVariable ( variableName, newValue ) {

		if ( true ) {
			this.debugOut( `Set FSM variable: ${variableName} to value >${newValue}< (${typeof newValue})` );
		}

		this.postMessageWithPathsAndTraceCount({
			setVariable: {
				variableName,
				newValue,
			},
		})
	}

	// Send a trace message
	postLogEvent ( traceMessage ) {

		if ( true ) {
			this.debugOut( `Posting event '${traceMessage.event}', message ${JSON.stringify( traceMessage, (k,v) => k==='event' ? undefined : v )}` );
		}

		this.postMessageWithPathsAndTraceCount({
			traceMessage,
		})

	}

	triggerEvent ( event ) {

		if ( true ) {
			this.debugOut("triggerEvent: " + event);
		}

		this.postMessageWithPathsAndTraceCount({
			microfinEvent: event,
		})
	}

	postMessageWithPathsAndTraceCount( payload ) {

		try
		{
			payload.indexPath = this.indexPath;
			payload.userDefIdPath = this.userDefIdPath;
			payload.traceCount = this.traceCount++;

			window.parent.postMessage( JSON.stringify( payload ), '*' );

		} catch (e) {
			console.error(e);
		}

	}

	// Helper
	getQueryVariable (variable) {
		const parsedUrl = new URL( window.location.href );
		return parsedUrl.searchParams.get(variable);
	}

	startListeningToVariableDeclarationRequests (declareVariableCallback) {

		// listener for providing initial variable data signal.
		window.addEventListener(
			"message",
			(event) => {

				try {
					const { callId } = JSON.parse(event.data);
					if ( callId !== undefined && callId.includes("importVariables") ) {
						const variables = declareVariableCallback();
						const pass_data = {
							initialVariables: variables,
							callId
						}

						window.parent.postMessage( JSON.stringify( pass_data ), '*' );
					}
				} catch (error) {
					if ( true ) {
						console.log("error on external listener - ", error);
					}
				}
			},
			false );
	 }

	 debugOut (s) {
		if ( true ) {

			// if ( !this.debugOutput ) {
			// 	const heigth=200, width=500;
			// 	// document.body.innerHTML += `<div id="bw_DebugOutput" style="width:${width}px;height:${heigth}px;position:absolute;bottom:0px;left:0px;z-index:100000;white-space:pre;border:1px solid black;background:lightyellow"></div>`;
			// 	const div = document.createElement("DIV");
			// 	const st = {
			// 		width:`${width}px`,
			// 		height:`${heigth}px`,
			// 		overflow:"scroll",
			// 		position:"absolute",
			// 		bottom:"0px",
			// 		left:"0px",
			// 		"z-index":100000,
			// 		"white-space":"pre",
			// 		border:"1px solid black",
			// 		background:"lightyellow",
			// 	}
			// 	Object.assign( div.style, st );
			// 	document.body.appendChild(div);
			// 	this.debugOutput = div;
			// }
			// this.debugOutput.innerHTML += "\n"+s;
			// this.debugOutput.scrollTop = this.debugOutput.scrollHeight;

			console.log(s);
			// console.trace();

		}
	 }
}


/***/ }),

/***/ "../../libs/iconBar.js":
/*!*****************************!*\
  !*** ../../libs/iconBar.js ***!
  \*****************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "iconBar": () => (/* binding */ iconBar)
/* harmony export */ });
/* harmony import */ var _common__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ./common */ "../../libs/common.js");
/* harmony import */ var _tooltip__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./tooltip */ "../../libs/tooltip.js");
/* harmony import */ var konva_lib_Core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! konva/lib/Core */ "../../node_modules/konva/lib/Core.js");
/* harmony import */ var konva_lib_shapes_Rect__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! konva/lib/shapes/Rect */ "../../node_modules/konva/lib/shapes/Rect.js");
/* harmony import */ var konva_lib_shapes_Text__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! konva/lib/shapes/Text */ "../../node_modules/konva/lib/shapes/Text.js");
/* harmony import */ var konva_lib_shapes_Image__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! konva/lib/shapes/Image */ "../../node_modules/konva/lib/shapes/Image.js");









class iconBar {

	constructor ( stage, opts = {} ) {

		// Options and defaults
		['icons','x','y','width','height'].forEach( o => {
			if ( !( o in opts ) ) {
				throw( `iconBar: parameter '${o}' not specified!` );
			}
		})
		const defaults = {
			// x, y
			// width, height	// w&h of icon, total dimension += 2*(frameWidth+framePadding)
			spacing: 5,

			frameColor: 'gray',
			framePadding: 2,
			frameWidth: 1,
			frameFill: null,

			highlightColor: '#FFA99A',
			highlightFrame: '#8c3627',

			default: null, // index of icon
			active: null,

			// icons: [{
			// }]
			sticky: true,	// icon remains active after mouseup/touchend?
			//disabled: true,	// disable whole bar

			toolTipFontSize: 10,
			toolTipFill: 'yellow',

			direction: 'v',	// v | h (vertical | horizontal )

			shareModesWith: null,		// [] or function returning [] of iconBars that should be deactivated when icon of this iconBar is activated

			useExistingIconBarLayer: true,	// are all iconBars placed in one layer?
			moveLayerToTop: true,

			// initDone: <Promise>,		// will be Promise that fullfilles when init is completed
		}
		const defaultIcon = {
			// extraSpace: 	// no icon, leave extra Space

			// kCreateFunc: function (x,y,iconBarObj)	// function returns KONVA Object|[KONVA Objects]|Promise|[Promises] on coords x, y OR
			// src: set image.src OR
			// text: text to display (object with options for Konva.Text({}))
			toolTip: null,
			cursor: null,		// cursor, when activated
			cursorOver: null,	// cursor, when "mouseover", e.g. "url(icon.png) 16 16, auto"
			tooltipImage: null,
			on: () => 1,
			off: () => 1,
		}
		const defaultTextOptions = {
			align: 'center',
			verticalAlign: 'middle',
			fontSize: 20,
		}
		Object.assign( this, defaults, opts );
		this.stage = stage;
		// search iconBar Layer ore create new
		if ( this.useExistingIconBarLayer ) {
			const layer = stage.getAttr('bw__IconBarLayer');
			if ( layer ) {
				this.layer = layer
			} else {
				this.layer = new konva_lib_Core__WEBPACK_IMPORTED_MODULE_0__["default"].Layer();
				stage.add( this.layer );
				stage.setAttr( 'bw__IconBarLayer', this.layer );
			}
		} else {
			this.layer = new konva_lib_Core__WEBPACK_IMPORTED_MODULE_0__["default"].Layer();
			stage.add( this.layer );
		}
		if ( this.moveLayerToTop ) {
			this.layer.moveToTop();
		}
		this.kGroup = new konva_lib_Core__WEBPACK_IMPORTED_MODULE_0__["default"].Group();
		this.layer.add( this.kGroup );

		// Icons
		const wp = this.frameWidth + this.framePadding;
		let x = this.x, y = this.y;
		const loadPrs = [];
		this.icons.forEach( (i,nr) => {

			if ( i.extraSpace ) {

				if ( this.direction=='v' ) {
					y += i.extraSpace===true ? this.height + 2*wp : i.extraSpace;
				} else {
					x += i.extraSpace===true ? this.width + 2*wp: i.extraSpace;
				}

			} else {
				// i is altered!

				i = Object.assign( {}, defaultIcon, i );
				// image-tooltip?
				if ( i.tooltipImage && !this.tooltip ) {
					this.tooltip = new _tooltip__WEBPACK_IMPORTED_MODULE_4__.tooltip(this.stage);
					this.stage.on( 'mouseleave', (ev) => {
						if ( (0,_common__WEBPACK_IMPORTED_MODULE_5__.ignoreEvent)( this.stage, ev ) ) {
							return;
						}
						this.tooltip.hide()
				 	})
				}

				// frame
				if ( this.frameWidth || this.frameFill || this.highlightColor ) {
					i.kFrame = new konva_lib_Core__WEBPACK_IMPORTED_MODULE_0__["default"].Rect({
						x, y,
						width: this.width + 2*wp,
						height: this.height + 2*wp,
						stroke: this.frameColor,
						strokeWidth: this.frameWidth,
						fill: this.frameFill,
						dontGrayOut: true,
					});
					this.kGroup.add( i.kFrame );
				}

				// draw KONVA object?
				if ( i.kCreateFunc ) {
					const kGroup = this.kGroup;
					const res = i.kCreateFunc( x + wp, y + wp, this );
					loadPrs.push(
						Promise
							.all( Array.isArray(res) ? res : [res] )
							.then( kObjs => kObjs.forEach( kObj => {
								if ( kObj ) {
									kGroup.add( kObj );
								}
								if ( i.kIcon ) {
									i.kIcon.moveToTop();
								}
						}))
					)
				}

				// icon
				const rectAttr = {
					width: this.width,
					height: this.height,
					x: x + wp,
					y: y + wp,
				};


				// interactivity
				const setInteract = (kObj) => {
					kObj.on( 'mousedown touchstart', (ev) => {
						if ( !this.disabled ) {
							ev.cancelBubble = true;
							if ( ev.evt ) {		// ev.evt might not be present (e.g. during demoAnimation)
								ev.evt.preventDefault();	// e.g. no blur in input fields
								ev.evt.stopPropagation();
							}
							this.clickOn( nr, ev );
						}
					});
					kObj.on( 'click tap', (ev) => {
						if ( !this.disabled ) {
							ev.cancelBubble = true;
							if ( ev.evt ) {		// ev.evt might not be present (e.g. during demoAnimation)
								ev.evt.preventDefault();	// e.g. no blur in input fields
								ev.evt.stopPropagation();
							}
						}
					});
					if ( !this.sticky ) {
						kObj.on( 'mouseup touchend mouseleave', (ev) => {
							if ( (0,_common__WEBPACK_IMPORTED_MODULE_5__.ignoreEvent)( this.stage, ev ) ) {
								return;
							}
							this.deactivate( ev );
					 	});
					}
					if ( i.cursorOver ) {
						kObj.on( 'mouseenter', () => {
							if ( !this.disabled ) {
								this.cursorSaved = document.body.style.cursor;
								document.body.style.cursor = i.cursorOver;
								this.cursorSet = document.body.style.cursor;
							}
						});
						kObj.on( 'mouseleave', (ev) => {
							if ( !this.disabled ) {
								if ( (0,_common__WEBPACK_IMPORTED_MODULE_5__.ignoreEvent)( this.stage, ev ) ) {
									return;
								}
								if ( document.body.style.cursor == this.cursorSet ) {
									document.body.style.cursor = this.cursorSaved
									this.cursorSet = null;
								}
							}
						});
					}
					if ( i.tooltipImage ) {
						kObj.on( 'mouseenter', () => this.tooltip.showImage( i.tooltipImage ) );
						kObj.on( 'mouseleave', (ev) => {
							if ( (0,_common__WEBPACK_IMPORTED_MODULE_5__.ignoreEvent)( this.stage, ev ) ) {
								return;
							}
							this.tooltip.hide();
						});
					}
				}

				if ( i.src ) {
					// create image
					const me = this;
					const image = new Image();
					const pr = new Promise( res => {
						image.onload = res;
						image.src = i.src;
					});
					loadPrs.push(
						pr.then( () => {
							i.kIcon = new konva_lib_Core__WEBPACK_IMPORTED_MODULE_0__["default"].Image( Object.assign( { image }, rectAttr ) );
							me.icons[nr].kIcon = i.kIcon;

							setInteract( i.kIcon );
							me.kGroup.add( i.kIcon );
						})
					);

				} else if ( i.text ) {
					// text as icon given?
					i.kIcon = new konva_lib_Core__WEBPACK_IMPORTED_MODULE_0__["default"].Text( Object.assign( {}, defaultTextOptions, i.text, rectAttr ));

					setInteract( i.kIcon );
					this.kGroup.add( i.kIcon );

				} else {
					// no image.src -> draw invisible rectangle
					// (hit area e.g. for icon created by kCreateFunc())
					i.kIcon = new konva_lib_Core__WEBPACK_IMPORTED_MODULE_0__["default"].Rect( Object.assign( {}, rectAttr, {
						fill: 'white',
						opacity: 0,
						dontGrayOut: true,
					} ));

					setInteract( i.kIcon );
					this.kGroup.add( i.kIcon );
				}

				// get position for next icon
				// const offs = nr*( this.spacing + this.height+2*wp );
				if ( this.direction=='v' ) {
					y += this.spacing + this.height + 2*wp;
				} else {
					x += this.spacing + this.width + 2*wp;
				}

				this.icons[nr] = i;
			}
		})

		const me = this;
		this.initDone = Promise.all( loadPrs )
			.then( () => {
				me.setDefault();
				me.layer.draw();
			});
	}

	///////////////////////////////////

	getOverallHeight () {
		return this.direction=='v' ?
			this.icons.length * ( this.spacing + this.height + 2*( this.frameWidth + this.framePadding ) ) - this.spacing :
			this.height + 2*( this.frameWidth + this.framePadding );
	}

	getOverallWidth () {
		return this.direction=='v' ?
			this.width + 2*( this.frameWidth + this.framePadding ) :
			this.icons.length * ( this.spacing + this.width + 2*( this.frameWidth + this.framePadding ) ) - this.spacing;
	}

	///////////////////////////////////

	setDefault () {
		if ( !this.disabled && this.default!==null && this.sticky ) {
			this.clickOn( this.default );
		}
	}

	clickOn ( index, ev ) {
		const saved_active = this.active;
		this.deactivate();
		if ( this.shareModesWith ) {
			const ar = typeof this.shareModesWith === 'function' ? this.shareModesWith() : this.shareModesWith;
			ar.forEach( iconBar => {
				if ( iconBar && iconBar!=this ) {
					iconBar.deactivate();
				}
			})
		}
		if ( saved_active===null || saved_active!=index ) {
			this.activate( index, ev );
		}
	}

	deactivate () {
		if ( this.active!==null ) {
			const icon = this.icons[ this.active ];
			if ( icon.kFrame ) {
				icon.kFrame.fill( this.frameFill );
				icon.kFrame.stroke( this.frameColor );
			}
			this.layer.batchDraw();

			if ( icon.off ) {
				icon.off();
			}

			if ( icon.cursor ) {
				document.body.style.cursor = "default";
			}
			this.active = null;
		}
	}

	activate ( index, ev ) {
		const icon = this.icons[index];
		if ( icon.kFrame ) {
			icon.kFrame.fill( this.highlightColor );
			icon.kFrame.stroke( this.highlightFrame );
		}
		this.layer.batchDraw();

		this.active = index;
		if ( icon.on ) {
			icon.on(ev);
		}

		if ( icon.cursor ) {
			document.body.style.cursor = icon.cursor;
		}
	}

	isActive ( index ) {
		return this.active === index;
	}

	///////////////////////////////////

	disableBar ( disabled=true ) {
		this.disabled = disabled;
		if ( disabled ) {
			this.deactivate();
		}
	}

	hideBar ( hidden=true ) {
		this.disableBar( hidden );
		this.kGroup.visible( !hidden );
		this.layer.batchDraw();
	}

	destroy () {
		this.kGroup.destroy();
		if ( !this.useExistingIconBarLayer ) {
			this.layer.destroy();
		}
	}
}


/***/ }),

/***/ "../../libs/rectArea.js":
/*!******************************!*\
  !*** ../../libs/rectArea.js ***!
  \******************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "rectArea": () => (/* binding */ rectArea),
/* harmony export */   "rectArea_freePaint": () => (/* binding */ rectArea_freePaint),
/* harmony export */   "rectArea_freePaintMarker": () => (/* binding */ rectArea_freePaintMarker)
/* harmony export */ });
/* harmony import */ var _common__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./common */ "../../libs/common.js");
/* harmony import */ var _class_extensions__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./class_extensions */ "../../libs/class_extensions.js");
/* harmony import */ var konva_lib_Core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! konva/lib/Core */ "../../node_modules/konva/lib/Core.js");
/* harmony import */ var konva_lib_shapes_Rect__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! konva/lib/shapes/Rect */ "../../node_modules/konva/lib/shapes/Rect.js");







class rectArea {

	constructor ( base, opts = {} ) {

		['x','y','width','height'].forEach( o => {
			if ( !( o in opts ) ) {
				throw( `area: parameter '${o}' not specified!` );
			}
		})
		// Defaults to opts
		const defaultOpts = {

			// // paintArea
			// x, y
			// width, height
			frameWidth: 1,
			frameColor: 'black',

		}
		;(0,_common__WEBPACK_IMPORTED_MODULE_2__.mergeDeep)( Object.assign( this, defaultOpts ), opts );
		this.base = base;
		const stage = base.stage;
		this.stage = stage;

		// Init paintArea
		if ( this.frameColor && this.frameWidth ) {
			this.layer = new konva_lib_Core__WEBPACK_IMPORTED_MODULE_0__["default"].Layer();
			stage.add( this.layer );

			this.kRect = new konva_lib_Core__WEBPACK_IMPORTED_MODULE_0__["default"].Rect({
				x: this.x, y: this.y,
				width: this.width, height: this.height,
				stroke: this.frameColor,
				strokeWidth: this.frameWidth,
			});
			this.layer.add( this.kRect );

			this.layer.draw();
		}
	}

	///////////////////////////////////

	// clip to rectangle by default
	freePaintMarkerClipFunc (ctx) {
		ctx.rect( this.x+this.frameWidth*0.5, this.y+this.frameWidth*0.5, this.width-this.frameWidth, this.height-this.frameWidth );
	}

	// clip to rectangle by default
	freePaintBrushClipFunc (ctx) {
		ctx.rect( this.x+this.frameWidth*0.5, this.y+this.frameWidth*0.5, this.width-this.frameWidth, this.height-this.frameWidth );
	}

	///////////////////////////////////

	getState () {
		return '{}';
	}

	setState () {
	}

	// Check if User made changes
	getDefaultChangeState () {
		return false;
	}

	getChState () {
		return {};
	}

}

//////////////////////////////////////////////////////////////////////////////

const rectArea_freePaint = (0,_class_extensions__WEBPACK_IMPORTED_MODULE_3__.addFreePaintTo)( rectArea, 1, 0 );

const rectArea_freePaintMarker = (0,_class_extensions__WEBPACK_IMPORTED_MODULE_3__.addFreePaintTo)( rectArea, 1, 1 );


/***/ }),

/***/ "../../libs/textFrame.js":
/*!*******************************!*\
  !*** ../../libs/textFrame.js ***!
  \*******************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "textFrame": () => (/* binding */ textFrame)
/* harmony export */ });
/* harmony import */ var _common__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./common */ "../../libs/common.js");
/* harmony import */ var konva_lib_Core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! konva/lib/Core */ "../../node_modules/konva/lib/Core.js");
/* harmony import */ var konva_lib_shapes_Rect__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! konva/lib/shapes/Rect */ "../../node_modules/konva/lib/shapes/Rect.js");
/* harmony import */ var konva_lib_shapes_Text__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! konva/lib/shapes/Text */ "../../node_modules/konva/lib/shapes/Text.js");






class textFrame {

	constructor( base, layer, opts = {} ) {

		// Options and defaults
		['value','x','y'].forEach( o => {
			if ( !( o in opts ) ) {
				throw( `textFrame: parameter '${o}' not specified!` );
			}
		})
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
		const kGroup = new konva_lib_Core__WEBPACK_IMPORTED_MODULE_0__["default"].Group( this.moveable ? { draggable: true } : {} );
		this.kGroup = kGroup;
		this.layer.add( this.kGroup );

		// Frame
		const kFrame = new konva_lib_Core__WEBPACK_IMPORTED_MODULE_0__["default"].Rect({
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
		const kText = new konva_lib_Core__WEBPACK_IMPORTED_MODULE_0__["default"].Text({
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
				let stageBox = (0,_common__WEBPACK_IMPORTED_MODULE_3__.getAbsPosition)( stage.container() );
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
				if ( (0,_common__WEBPACK_IMPORTED_MODULE_3__.ignoreEvent)( this.stage, ev ) ) {
					return;
				}
				if ( document.body.style.cursor == overCursor ) {
					document.body.style.cursor = oldCursor || 'auto';
				}
			});

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


/***/ }),

/***/ "../../libs/tooltip.js":
/*!*****************************!*\
  !*** ../../libs/tooltip.js ***!
  \*****************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "tooltip": () => (/* binding */ tooltip)
/* harmony export */ });
/* harmony import */ var konva_lib_Core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! konva/lib/Core */ "../../node_modules/konva/lib/Core.js");
/* harmony import */ var konva_lib_shapes_Image__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! konva/lib/shapes/Image */ "../../node_modules/konva/lib/shapes/Image.js");



class tooltip {

	constructor ( stage ) {
		this.stage = stage;
		this.layer = new konva_lib_Core__WEBPACK_IMPORTED_MODULE_0__["default"].Layer();
		stage.add( this.layer );

		this.image = null;
		this.kImages = {};	// { [src]: KONVA.Image }
	}

	///////////////////////////////////

	showImage ( defs={} ) {

		['width','height','src'].forEach( o => {
			if ( !( o in defs ) ) {
				throw( `tooltip: parameter '${o}' not specified!` );
			}
		});
		const defaults = {
			// width, height, src	// properties of image
			offsetX: 10, 	// offset to mousepointer position
			offsetY: 10,
			konvaOpts: {},
			kImages: [],
		};
		defs = Object.assign( {}, defaults, defs );

		// image loaded?
		if ( defs.src in this.kImages ) {

			this.image = this.kImages[ defs.src ];
			this.image.x( this.stage.getPointerPosition().x + defs.offsetX );
			this.image.y( this.stage.getPointerPosition().y + defs.offsetY );
			this.image.visible( true );
			this.layer.batchDraw();

		} else {

			// load image
			const image = new Image();
			image.onload = () => {
				if ( this.loading ) {
					this.image = new konva_lib_Core__WEBPACK_IMPORTED_MODULE_0__["default"].Image( Object.assign( {
						x: this.stage.getPointerPosition().x + defs.offsetX,
						y: this.stage.getPointerPosition().y + defs.offsetY,
						width: defs.width,
						height: defs.height,
						image,
					}, defs.konvaOpts ) );
					this.kImages[defs.src] = this.image;
					this.layer.add( this.image );
					this.layer.draw();
				}
			}
			this.loading = 1;
			image.src = defs.src;
		}

		this.stage.on( "mousemove.tooltip", function () {
			if ( this.image) {
// console.log( this.stage.getPointerPosition().x + defs.offsetX, this.stage.getPointerPosition().y + defs.offsetY )
				this.image.x( this.stage.getPointerPosition().x + defs.offsetX );
				this.image.y( this.stage.getPointerPosition().y + defs.offsetY );
				this.layer.batchDraw();
			}
		}.bind(this) );

		this.layer.moveToTop();
	}

	hide () {
		this.loading = 0;
		this.stage.off( "mousemove.tooltip" );
		if ( this.image) {
			this.image.visible(false);
			this.image = null;
			this.layer.batchDraw();
		}
	}

}


/***/ }),

/***/ "../../examples/main.css":
/*!*******************************!*\
  !*** ../../examples/main.css ***!
  \*******************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
// extracted by mini-css-extract-plugin


/***/ }),

/***/ "../../libs/img/clearicon.png":
/*!************************************!*\
  !*** ../../libs/img/clearicon.png ***!
  \************************************/
/***/ ((module) => {

module.exports = "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACQAAAAkCAYAAADhAJiYAAAACXBIWXMAAAsSAAALEgHS3X78AAAEMElEQVRYw9WXX0hTbxzGn3N2Tm6eTXaxpYu26qYtxa5qeLFYxQ7IbsPAWTejdjOCoC4GQSJ560XYH6KrCCREjbXRpggxESFQSIXdxEY0kC7UgcttpezpauM3/Onyzxw98MI55/2e53ze73m/57wv8C9qamqKbW1tBPBXTavVMhQKsW5Adrv9r2HKTa/XM5FI7BtKKB8sLCzwzZs32NjYqAr48eMH4vE4AODixYtoaWnZ05Ak5ufn8evXLzgcDnR1dVX1S5IEt9uN27dvC7uavH37ls3NzTVH/fXrV/6Nzp49u6ePJEkcGBjgrhkyGAzM5XJQFAVOp7MqIJvN4suXLwAAVVVhNptrZigcDiOfz+PUqVOw2+1V/alUCt+/f4fVakUmk9k1SwTAzs7OHaPNZrPU6/X7nkOSJHFsbGyH36NHjwiAZrP5fzMk/fekVCrtCDAajYhEInjx4sWO+bWbZFmGqqq4cePGjr6trS0IgoBr165hdHQUe2aovb2d9Zbf76eqqtze3t6zAo8NKJFIsFAokCSj0Sh9Ph/D4TAbBlTW4uIiFUUhAJ44cYKPHz9mw4CKxSIdDkdVEZw/f75xQHfu3KEgCARAURTp8/mYyWQaA/T69WtKkkQANBqNfPnyJRs2qScnJynLMgVBoMfjYTqdZsOqbHp6mgaDgaIoMhQKkWTjyv79+/dUFIWCIPD58+eV68cOlEwmmc/nmUwmabPZ+OTJk6r+YwHKZDJ89uwZ3W43FUWhqqosFArM5XJVcUtLS/UDWltb48jICL1eL3U6XaWky+3mzZtV8RMTEzx9+vTRAhWLRUYiEfb19bG5uZkajYZ6vb7q+1L2HRwcrNwXi8Wo0+losVgOD/Tz508mEgneu3ePNpuNoihSEAReunSJvb29PHfuHAHwzJkzNBgMlaXsyspKxSMYDFZiai4/9tLq6iqCwSA+fPiAYrEIjUYDVVVx9+5dLC8vY3h4GOvr6/B6vUin08jlcgAAj8cDi8VS8dHpdJWF3KEzlM/nOTExwUAgwFgsxrm5OV6/fr2yIOvv7+fVq1cJgCdPnqQgCIxGo1UeDx8+JADabLajnUO/f/9mV1cXAbC1tZXhcJjd3d0EwMuXL9NqtbKtrY1bW1v7AhIPujWSZRmzs7N49eoV3r17h6dPnyIej8NsNsPlciGTyeDWrVuQJGlfvtJh9msajQaBQACrq6solUqQJAkPHjzAx48fIcsy/H7/vj1FHIFMJhM+ffqEkZERGI1GzMzMwOl04sKFC40BKqunpwcdHR1oaWmBz+c7kIeEI5bL5cLnz59hMpkODyQIwpFAORyO3ffuNZ5R9cpEUUS9Jcty7QwpioLNzU2kUilcuXKlrkDfvn2rHTQ+Pk6r1brv7fJBW1NTE4eGhvb+d0QiEba2ttYdRqvV8v79+8S/oj8cXa1tQMtCNwAAAABJRU5ErkJggg==";

/***/ }),

/***/ "../../libs/img/erasericon.png":
/*!*************************************!*\
  !*** ../../libs/img/erasericon.png ***!
  \*************************************/
/***/ ((module) => {

module.exports = "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACQAAAAkCAMAAADW3miqAAAAA3NCSVQICAjb4U/gAAAAw1BMVEUAAAC+vr78fwF4eHg6OjqlpaUlJSWCSRAWFhZLS0tULwn////iexMSEhIzMzMODg6Pj49RLAhUVFRGRkbh4eEMDAwcHBztghVaWlrJdB+ZmZkICAhAQEAsLCy1tbVrOgiEhIRmZmYeHh75gwxSUlI3NzcaGhpISEitra2goKAQEBAUFBQgICBYWFg2NjYpKSldNQxERETogBc9PT1KSkoYGBhfX1//gADygxJOTk4iIiImJiZCQkIuLi4KCgpcXFw+Pj6qjcl5AAAAQXRSTlP//////////////wD//////////////////////////////////////////////////////////////////////4FTCdgAAAAJcEhZcwAACxIAAAsSAdLdfvwAAAAWdEVYdENyZWF0aW9uIFRpbWUAMDQvMTAvMjGSw7jXAAAAHHRFWHRTb2Z0d2FyZQBBZG9iZSBGaXJld29ya3MgQ1M26LyyjAAAAStJREFUOI2F021TgkAUBeDNyLDTek2SKMKMQgpIetFIjfH//yuXQIIZ7rpf9nx45ty7zCCyLOvN8vUzNEcoY8Qkx3rUS+kmezDftGgYPWXZp0uOBt1GP2qtd9/WTBS+o8xVCkheiS2dX15si8grMVwQ2WVmlQAMN8FBrTkEY+LXqvOjFghBQ3V1/SEsahXHHapEjYldqkIIDk+EKQcc0nbVCAbfJRq5oZYs+mqokEOtiSGHcN+t2qilLA7h919FIYeaXZHFIXzQvEpzsjgEq1K5lOaUQ2qvQnn0iniTcwihUiFdAy80Y5GauJJnRXhMUhZhMCn/iRPa8Qjj1W5U3KvE45Fa3HTuANv91iGgb0ZSiI2nRZhuSQh3qUfAKJXC9I4g4LQfBUcRcsvaA859SCE9v99BAAAAAElFTkSuQmCC";

/***/ }),

/***/ "../../libs/img/markericon.png":
/*!*************************************!*\
  !*** ../../libs/img/markericon.png ***!
  \*************************************/
/***/ ((module) => {

module.exports = "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACQAAAAkCAMAAADW3miqAAAAA3NCSVQICAjb4U/gAAABDlBMVEUAAAC8vLxcXFwwMDD7+/uPj48aGhrX19dKSkp0dHQNDQ2pqakgICDl5eU+Pj4GBgbMzMyDg4NmZmaZmZlSUlIpKSm0tLT09PQXFxc3NzfDw8NmZmZ4eHgEBARERESvr68JCQna2tqenp5UVFTPz89wcHAmJiYdHR2Hh4dZWVnr6+t/f39OTk4SEhI6OjouLi7///8kJCTHx8fV1dVsbGy5ublISEgICAgAAACSkpIsLCzf39+JiYmzs7O+vr7p6en4+Pijo6NAQEAYGBheXl4MDAwUFBRMTEyFhYUQEBAzMzMeHh7///84ODhaWlpQUFA8PDy9vb23t7fn5+cqKip7e3vd3d3t7e2BgYGLi4tGsMlaAAAAWnRSTlP/////AP////////////////////////////////////////////////////////////////////////////////////////////////////////////////866D2EAAAACXBIWXMAAAsSAAALEgHS3X78AAAAFnRFWHRDcmVhdGlvbiBUaW1lADA0LzEwLzIxksO41wAAABx0RVh0U29mdHdhcmUAQWRvYmUgRmlyZXdvcmtzIENTNui8sowAAAGISURBVDiNrdTZTsJQEAbgXxjKVjlsLhCPokAFpTiC2LhrCyh4Ydz1/V/EoqBd0Qv/pElz8mU6MycpyE420aZ5gf0c6AOjNB/FVGFZVsWk85tQNBZDZZKBqaIehqBMMxop2A1BETFF8r2m4DSkp9aXkknm8kg2l4OnWzcmJs92etvAOLcZgCijK6LPn9kpmAJ6dcOP4kNRJJ6lc6AKEY17UVE6jJ2V1gDaiQddo+pCVyO1WTn2IGq7VFpWyheWLHkQRdH/VmeGsXw5NjRkPIiWkJ6ahZT92kbEbuLQg3qoTmfTUeB1JCabQdGN6ElfnJiahRjfwfw8K9n1XChpF2COq8hxBLOej5F3oY48ZD7RkOQ89ma9vOyj4ERUGjy+7iHPSWg/s3fNexfKYS2BPr/h1nUjrs9RV9dlkWNYzfrMD6KMaHMBetlvHOhMaPVUqhdgHIi2hFh9CDJOREdSqf2KqAEroG0PouegBXgR1Z2rDEPkuJRwRE34/x0+RC00fkcU+0OlgPwf+gAhkUEFckZdNgAAAABJRU5ErkJggg==";

/***/ }),

/***/ "../../libs/img/penicon.png":
/*!**********************************!*\
  !*** ../../libs/img/penicon.png ***!
  \**********************************/
/***/ ((module) => {

module.exports = "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACQAAAAkCAYAAADhAJiYAAAABHNCSVQICAgIfAhkiAAAAAlwSFlzAAALEgAACxIB0t1+/AAAABZ0RVh0Q3JlYXRpb24gVGltZQAwNC8xMC8yMZLDuNcAAAAcdEVYdFNvZnR3YXJlAEFkb2JlIEZpcmV3b3JrcyBDUzbovLKMAAADSXByVld4nO1by43cMAylJKqPtBBMKakhA+S2hzQzzaSAYHrZDnbCj/wZ27P2ISQNrHhYYLyHx8/jRzL99+PPO7zB2+PxuN/vt9vter1eLhfo0qXLV5JSSsopDh9LySkQv2BJKQfi54wVcy4Q44RM+IikRYpRgCxHrHH2g6RAJVEtIvBxwC85wgtqP7GQWOCPDpBSqjPJ3loQPo7oGgVffJjbHxKFlgKMTtmIkgueWkz4lAuiQBg+i7v91AEJnApB+5kTa4SYnVqTUnDEJ1jClyg41SO2n2KP7ZfYj372g1AA8an+EwX4ISnl4QQ1+AlfokBPI/F5OPAZDYgCWNNqFpREqA4aCAU38NEJH7gLrfG1IruEoAjfnlRKPJ2yCh4uKGWJT0cDcr7AO7hgy37GVwe4hOCJAtIU9HTmxQJJwTzAU1NoJVjx7T1QX9gvWehgP9V8wgRh/mIWdQkBDZ9cbaQFLmZRl0LEx7HKXUCH8vmJyIuCbQAl41fN30WFOiiQVxcTWoiMPTDan1YjqIv9bRYt22dhexWUea/w7bNAa34puPlfpxB85gKXEOAZQhBlP3QXCAVxz37zLAh2wZemAOy5wIeF0VnwGt8rC3ZYeAYXmMEfykKPiYgOgVEqHMgCUxYeoUBsOz5FIbCsA9GFGPbOBdFZUOyzAHoWBGcB7GSBdS+E3SxQFWxdEMrCQxSMnIjsWRCdBTqOFIwqhLBfi50KwQsXYDlBL7LOgkO10H4o3GGhGXy4/TC+NQ/LggMhsC2E/MoSX92U6k5FeCGy7gVPixtLfKrSoUNp8ESkR1O0nYiaC7ZCoL3YYyLazgIJP/oUopULxuDbr9JsUkA2iLgFtFUiS/x9+6vxlvNChWb8QLuCy+Wa/69Awtkd1VB8YVLHFn9tvzh/xEdr+2E8GmG7lBwkyxKL/Yvr8ZpwuI4ZnvOrfLRGn3oBLi5lveyHYWVkzjxt0G4r9oK2wMdqnfwTPOgq8eRtfY/m+IkDqzBMBDkn94VqzgJsp1Ninv8qLdvfCmGE/aMKukwc8nFJSrrEzPgBH/coBVWBoI97OO2dFnc/ww9TgGjHKRj4YVWXLl26dOnSpcsp5Qf8hF/wm/5+g+/RynRxl3/2wSYvgmqrfAAAAEhta0JG+t7K/gAAAAQAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAKaQzoQAAO+Jta1RTeJztfdtz20aWPiYzTizfHSeZh31R1V5+VVtlBwDB276JpChprAuHpBzZNVUqEiQsrWXJK8nyeLT8W+clf8Y+/M6lGwQaDRAESYlKYCUEiWvjO6e/c+nTwM7r2tX1m3bn+Lo3etPeOb62Rs12PbBo/3X3+NouVcvFYqk8Otiue9fm6C0vftlqeNeF0mhzq0vL9nrHuy7bo3Zn/xg21zbgDB79G7W2t6+uay34qK91L66NFaNvuMah0TKGxil8OzZORlu7O7DlAWw5hS2W8RK2Hht/hz1ORu3GXh9PubZLZ16DBheGlVGtsYWNrO1Ayz1Y0H3UOuu0U6dJ2zqbtKht08raa1rUd8UJ1pv0u92lnZo1+tVs02KXV3Zax9fV0qjW5Y1dPnu3wxfZ4fPxYmsNW7mLrTJHjT3r+LoCCxtP09gr0KIJK21Y2Lwo4GKUCpk/65AxVo01WHsJv1/CtxNY9owL2DK4ScysGTGzFoXZQ4HZhnEOuHwyjmDbpTFMxMZhbIYJ2JhabFw3hI2ZgI1bYWwK9tToWA7D02N4egxPheGpMDyVUaf1Dq7SH3U6YtnaA9SKPVghvqQD8LkAsG6cgXKdAYygWqB0wT2DYMKJCU27mIRmLwWaiqYloaloWm++vZMgLJU0EHZaNd7S4WUQ0vsC0hr1x2PDFYA+FYB2AEwPdHHVaMO3z7BuMLHXarG0PGe+/bbgZuy3vWn7bRxGjyIYbcPW0yz9VkUnla7dDXQ2Yf05dcbM6KRhtSms5BTYmIvB5mkEmxl715z9iJtDSFJ6gxA6ortnjJ4JjAJb4FcX8DoGC3kyQY/sJeWgwg3h1CB96t9ZnOy547Ti43QGXH15g1Ys0SdwnYxEbTI0JkNjMjQmQ2MyNGZKaJ5qVWhMWndRgay5K9ATLUqCwqfH6NaNWhJCRUaoyAgVZ9KjTVj2jCvj6510Gq1wOFNkmIoMU49h6jFM4WDlkYBpDbrQOVj4Gnx+RlgEWPcFWOm6GTY8gE/JYYBo+0SAKk4CH1FsF4BoMKPttxkhmxFyGCGHEXI44EOxhiI+vA0KV2DFNBjKuLkLKvZ34PTPHPglI6ntjclAWlUBpd1PCp5VKKcKnzODaVfTgflEgFkHhTuhFMx7P93wVQD6rQD0F4DxMgRjecA4lmVqRt9hk8IYPDTUYe3J9jFzHGNX0iFYE/mHWia8ZCf+K6jeMe4VwswpMmZWXwFNJrRMRs1N0j2vl8aroD4ewK0k3Ao8ejHAvcOLirRDwRqMdW9aDKVj1oatffg7M061mldxBYjVOZnTW9S7rHqmNxYqQsP5AqT3N+ylAmglANBHUqKz5Myy6IlWIXUcbZnO9HpUNBkm8mQQKC8p7TefnhjE7qGP3RE5qi4g0/PTpt+FM1ipEBNaRZw10UWzbFdghiYwJWalocAMD0bMKHGazm6mxKwNUNnDIXypRUkrGTOpaS3qipeTx33CuDFek1TNczLAJilfdEnyPuaKWktSfUf6Hcj57IDIL62a9EDkl7ZQ/+khrpM7hx06OXZQIUa90XgjCsZld/ru7IgUfk9gXBg4CwE5bFhrMqE/NZJZHGS9Z0cjJfFguvb0YPrucdFmNLnDp0PTGqb273x1tD1tIFsna/KVHI8wL7Zh/YcJGbQKo1VltMgPC3Rvc9Y8kcNYMTR4DxXh0VFMgmDhWBaiZSegVRTZIvCdOMyvMl4lAVhJIFYSCsjqhl/6njKihN5ye5MMWTowpwt0w3EuxVsZE9xpuDKKZgrVK9g61SsJJAWQcTj6bClxTK2U9/2+jMPDrvFhml6cCsh0oYYeSerMyIj9uRtrYkTqwxLIdtD+sEWKR1QyZJMKEXCYrotDCEpXZ1RP5zv0kjJvYM6nIEEPZyky5F4TKHZq0SH2ZLBkCnSTfPAj4YsfkRd0rh1gJ8NA+miGeJLNSYQntWEJeUNp/e3eQsFLD5XMhW77EK0aO2ShP0TAUnMrrjZDZScEcGM/O4MzszBFC5qNsScjVc+qDDOoXkNgGI9mjIGehgit4jBN6vSG4azJzGk0V/WtwG5PU1TUoeHSnhj0Ssaqp43x0hjfwTApO+X2tJ6fH+ElRsUxrowjXBmH8Sq4DBgtC7QkO0GWI1oT094TaLbaXBzTblMzOu1ONCLUwfvcd2vOyeXGUfwbgRrj1hRQ28JxdG0F64FwsjkSnYA2GCPWzYpQzgqj7YpKLlfop1tRHR4CWX7R489fpIeOgiCjjpLgyDGlKB4ERHFMQfmkYe/etJZcqjl6N5P4oKC47NI1kgE5MXnEYbdShDe4timk0WRpEMbk+ayx/iLUpM+bREkEouWlxrAD6KHniaUoF2l4VWbQ5JCU1RvOOiQlcCwqOIaJFd2kDpUCx2tvyZmOKyQPWJ7vSRJ+9mT8XugjbTFolU4ryxm1MpV3KQJJr6ckJAWcTj+klI5OKSWcKhkURdlBUdQdwDI8NMW+epsB7bSFworfCLTlaRX1sQD6F+LUoUhvUIFnBvfdEwrrhRXW682p38/qgur7vK0Lh9iJCrKrHwWpGeDJGN73vfo0A/XK+KnvyKcbq8dUz5RxkG+4yMeYKT2kLT/2M5rjGJ28LPmlvRcgBpP1VamiTY9xuuDdrmhTcOS6zhFhGbsXZP6tmB5gvdNa0CkrlR7HFSfrch9tYX/OjI9KN+firWS7VNBhpwyxauPMgpmeRknto72870zOxflGScnFoZ4TevylwF+YSCFUYiLFL+QolUxmUnJZ21JV2eanw1SO9TfRVukQxZsJOEuSN6eJChLnGhCGuhyn3tALTAs6TN2K3jJVRRRVFWm5aokdJbI/MmVUG9sjmUJSwqvJivmWgtFk+xPu1KkGglLhGNbMvragUDHvWvsT5y3FJYnDoxQCNjLjqeGTMSrO2zg1PKw6wUlCOhitolDHUlgde1NY8ZKWG00dN3JCOEsdlGTG8MwXW1AjLQu05H5bEiZFtdvxoI1d9f+BrtsjRzOZEotZCwKmMCbsUAbCnSlGbUE7tZSI65tifZPX+92XDHVZ2Okys6LsxkSKm+x36urJ9gG/U7LVnynYkU78TwLZN+Swu1RDfUFz1zDTiVOJVmncF+cxJI+Wa1N4PDCZdhijMDnEdMNGiOx4NMB0pkqjCH+zIKpjYUmdXaTfRcDJdkgQaMhTItEEPP1K2NGPKfCLE8g9IZCC0cgwZllOUxyZJmFaCPtLYUoA5cuMtl3RBPSb7IpOg5OkhD1Yf0nKOmmijaV1k9LVk0rIiunDTQWy6mRrJEfZFBqdM2CgWNCnN8hX/7JwwKzJgLlav9Ia6nwg60Z17LEfwpyRF35kfJIlMMnAzW+KQFLnrGgL0jCSCgBnT5MligOO3Z1O1GRPQvBJAMG/Uxi4SiHj1BhSWdAUZcs+js5kxyfzHHL0bFLM+KVI2y1rRsNpgINWyC/ScrSEb4m3yJnhgLOpZognSeGR73MeUW0RjjYNI1WnqgRKWTPGVvoRJD/jUShNX5UgMx6TJlxvygB8MxqAT4LuuR8ynlDB87RjHvqBzdkplMqwAoMePb3VGabPGKuBpJYLpCPU9kcuovF3Wkh9t3LxkEbKPLSeZqFaCQ8keVrvRz+YoRTMuHqC1UXn6gMBxkNIwr8Ppo8ZfbjBcpG5APNyo+Z24+q6GZyF65EIOpSTOw7MCPQI+l16YMBHEsp+7BYhhCZD0OQu3eRbb65TJ262G7RLu83bNnlxgItRMxjacYPEhGgM4ZQmBbfsx27J1iSbmwSLDb9Fz6E9rv8AioEIdi4Dz1O48L0AV4y1oYa6xgewYPJxFc2NNwD8bp1PvgXfN1r4BJYmP2LFpH+jwCZLbhLPX8Ftb3GbOft5rIynkJvgN0E3ConuoRBdnWYkudCZTzTiawsQoxoV3JJNfAUWXyEXXwbxPRHiawNALtw0plbeK0J84otKt89+in2yCbbHgu3lgs0g2Ad+v8REIrrWwVjPCyQZ5bb9hG3ZBOiwAJ1cgDP0TBbEJaXeziVsSs/U77OfYp+ZKNeycslmkOzY/erRA8DG9cyeSGPL9fsx67NJrchSK+ZCm0FoLXI33cCsdU+EK3L9fsz6bEIrs9DKudBmEFqTgBn4sEjhjNfvx6zPJrQKC62SCy2D0B4Loa2Lua2fiPSC/stjISbdHvsT98gm0iqLtJqLNINIvxMirdHg7IVfKuD586DO/T6ors0mLpfF5ebiyiCuFT8oxJ7DzxZT4/nxFjWeH2/JJroBi26Qi24Gi/cLFS4OIxZvvH4/Zn02oQ1ZaMNcaDPE6q1xitsPCh74fmRw237CtmwC9FiAXqhhj3xtGhp9o0ESOaIMvBw5ktqjbt+fsD1bIy2RPcZlwwoA22zYoV+F0C8n9KvLAtigpHgWbX0otBVHJTjbhQ9h+hjQ1JJOPbgJQfUwX9nBjahjwY3OWHvsnrqxNN6I/4c3VoKqG6vVvkqGescda/v8emQmXVgRuoBbPpE+nAf0wNE1qlp2SlYvfNMF/876g4pbVBDxt5Zce2iVtPcz9AZ9dxAV5+00YUmk0qFnUF0pUtFqeLVQNauqhvu66Nj4p6h4UW7tF/uFvhWj4yX6F95Y9g8dDPFPi0XFxL+UHXSpm3/L2vBAaEOb5h/VaKh+ol8RZbxxs6qm2bdT+hXpzrMkCAUe4QPbJtqzqGaMVQ6FHzEKvt6USuxSaVUODyx7cSrHF44xC2X4L7VJW+Lm37I+PAv449BXRM95S3rBhYFj3ShomyhUO4hBAIIkV9vVOSWLusgt4/xcwTmAsIanQiC8GrelDy5WLw6GgQebwxur6pGJaM/5Qkui2etU50Z1R1S0tUGTBuCoSaxnmwU34gn7tGH1q2WrH0cb1tDxnGIMbZR6Q9e04mgjemJLbVEq1lvq5t+ybjwJ+PJ90oxLmq2s9kMtsKZZqKgmYQwsREHVXjkOWKCxUkKMFD20nHCopbYolV4sdfNvWS+ehvxHnykmMXS8JQrQZjQCDrVeJ79FXWRJUMapRmdUgXxp7IknL7yf7K/bVbNXrMb5VVqCnOE8t4yVzJf6WdJx5nQSTjKZmdy4NHFNmvMsCU6/p7zyerNxdb3eDAynDgmtLaq3Rp+nBp9X9JhWOQ439IduoK+N1ludq+tGfR0/XlN0OH5m1xr1RhzcadTfwLY/GpZRMMApCO3fgX3Rh90DO/rfnCMV+98zPLKsF3CG4DEr41YZXeMrZtLEEX8wzNCeD+nsPZoA+mUsc7H3d8a/Gub4T7mGmNYEWoCl+pfGUcw1VuAaJ5TRG0ZaU1Rasw535Ik88A49+GjLaIi9/924Nsq0tQQ4WdAi23gJ311Yg99w3YBeDFiBdWXYwu0u0p5l+LRgC/4aKQiP0VLv5Ru8jtLGTcqDMVPoEPPGf8qRNZo/d0m1Yx2q67yMlcxzH1/e8xw+G+JJLz0qgok78mkIxS04giecHosX9vBRfxKZ9rDmPA5gIWvczjmP4SNSVqT2iJ6VdgF8IF9Vhj3jAngjrn1jfdihqtZL8dKlY8otyqMspWXrIJn3pENHPCmZ+gVEHDHXeTzuX7EtKyhHjPumHus/kt6Fr/OEnhvxRfgw2PsHEb1YCfck6OVeRGb8YHFondEkfo1ql3oWtSWPSTcvJ7QjoJ+advAczxCzabV8AEfr2vD/4D4+wJ00qZcMya6ei96yB206AQbg5xh9BJmfkXadw7qgzu7D/rs8e0pc8c8gyz5J3xPWhx8LuWq8Jgnx92PByqdM3RlYu8kzY3LWTmRttTU5a+esnbN2zto3zdorgrU7cE0xazxn7kTmtnLmzpk7Z+6cuZeEudtw9x5dY5gzdyJzl3Lmzpk7Z+6cuW+ZuR8I5n5H8n8H53xv2Dl3J3K3k3N3zt05d+fcvSRed4C7c+ZOZO5Cztw5c+fMnTP3LTP390Yk0y32p/k4dP5BzuWJXG7nXJ5zec7lOZffCJdr7u2OVAiqY4R5hWDO2jlr56y93Kz9IsTarxS27kGb/zkTWy9rZeBysXVeGZizdc7WOVvfFlvfhYrA5WLsvCIwZ+ycsXPGvm3GXuZKwOVi7LwSMGfsnLFzxr4txr4bFYDLxdl5BWDO2Tln55x92172Mlf+LRdj55V/OWPnjJ0z9m0x9t2s+FsuDs8r/nIOzzk85/DFcngDroD6FuA6pXZE6EeErZP5UZVHaerMbw96U9Vw4G8A91eZC5/N0v+fhO5X3weQE22NjZJH8XNix/24kmBxohawAGfXWUB5RHI9y2K0D1HBGtMTyqRd0Hf5CqLpde6p0LnxUzoPQ3vNpoO9qW3qXdTBPxjlKTRQze39tjXwidDAoEVRfdf7QgfRWwXvcQmr5tToPq+aS/JTo5507qVO66XaSvtyL3U+XqoVkd5v1UtFlsI7+gDHnBu/gow+0/yR7PzchvMfE28uGz+rfJPzc87POT/fRX7+/WQRHtM7TVhDvESOfhris1WSH7836SQQyT0KzAdfnWsMN+2cuqJgKY/4CVmsDH8O7C/5rADf8C0/2AZ5nQoxoEeRH7JaHsMtUvueBbRFakxSHJdOB58SK52QvQnpoPEK/yKaeM/oKWh9A/IPY3UP2pXc49X+OllD+0YVjnLhEy3nkCyuQ/1faihmHlA/PdBf2Q9w7wr8Rr0ewP5hDf0XuFINJOGRnJhvDqlfI+dgL/8Cvy99KaLu/sO/73t05VX8DJ31vjFImfdajJ78CNtx3rFHe/fJlmj1ZfU/MmnMgxBryW2qniT5ZdPWStnEPBWQISBITIQyRSlnZ6fl9WxKU3s2TkbrGWfBF5WDCvLXhdCd/zOONNz1CDh5AFHGZ5LHaqD1rIM/wZ2d+16SwMP4WcU0hsMma1wBtKYA7NEnPWIrWAWNs0Iah9sHcBaTGAntZpU8swGxjurfL4ZtnhLXBu/5kFA/I7/kMkaHn0PLo/ilOXIxuvET+Iz8Lk9s0wf4jmf82Xitled0uvJtcEw9gy4MQK5F0AdLyPcl+UgD6KdqrFfx7Q7qAnpPA/jfJE26CV1YjGzuw7qPJBOOeKbtqw8CbxpbFW070fgVcVGsjqG+g/v5RPEJ3t3XhLhoJRCHoG4PZoj6B9SzHbIyLlmfHkX0VcUOIVP0QlE/xTg0PjKco5e8qCxUU3gOHrDzCfnR0QhnktRXIIqVtuciMw+j5XYo2sL+xXGJBS0ravqefat97zFZAubfI8Gsh3TOga+dyCNFJc65IL49p0j7UHgkeNx7ox/rf4SPSX+1p9o2vjfku3yT2qk7sm/wGz3jj4tDZXx3uqMeBY4aIzKMzbGoiMhjwu1Tj4rHPv2V0t/TY809TWpf9AhVVuoxeuTidWkFtmHf/wif6p5qpVdwz2g7wns/CO2t3qeV2IYg+uE9n8WiP1kT1WPTIvo89ppp+s2iqlm65Bd9YZ8GroBHYms+wC9saxY/aQXW4LFXpEHz8ZyHvudcWDrP+dFYgnS2M4qaLyGu2mgBaBut7tX1wXYd3yz6lhej8Tq7WOS1+EXN45MOz/2c0Dfnes6HstfM9ayL0fgViASkbp5m0u6HsP0zjXqsBj2TmX0Sy/dJnNwnyX2S3CfJfZLfpU/yo8+vLyd5J1My93Njk6zUz0aHctefqUXIhWe+LZjVTxn4foq9hH7KEcXQh+NRFeU4ffXFAziOrXuafOCFBts0Rz4TObvlyCP+4OcuuL4BdeZXGu84liO1Wu/hHlzzkjLR46xVkzwiHP+QY/5ZvAWPakBM0BvMAKFn4NGo1Hhk1SRvATNDt+stLG7M/FfCkceLLkAKrjbnH5XBM5HPl/OhVoX/tgZt+YQjVRnkYZMkbOrBPertLiwdGj0Mem9FGj1KV7lzl+TxgrLhAQzhGjjehQyySlyNeKv940/+eDpLZvw7S4+wYJtHtsvx/WcZKy6T/7yoHvGLgeMb2Av+4X/TPWlaRf0J4SnZeVVuzWwDi4BkhbS6BHdZIm7yxMiGQzLxKMdt0ch7kUbgseoNPYwK7dEz1Hz2YiTxA9mTsV3qizs/TBhrVy1c3Bmi9QzVG5qTVCM0hr5luqAlV+f/CmeAYyNj9FGdaNN4xLHowbPqxIB6Z4EqYBziR5vOXyGdwBHQIukE9kGPtGJAjOpQf/Wof7o3ohPfE87yzsMSVb2Pb6CFYZm+iD36f2DZM05CI0vfIBPdiP8SlCaPkgfZAmeu6fwXVSseGe8MnFP8cQ4aURUze5AXSr5XbBNf46yfPrEE8kiJxsb6xBAejZbZ5Eej7bwJjXgO+/BdTy/PZ9pj02jSot5R8A4tAo37HRtyPnhWfVjxtWCVZHyuqQif1nLbvzvL/SPVCiEzfxDe7JeMlvyZsWH0KOK9oL4+D2sezkuafl6ysHTS+YGyK8G7D/Y5ycuf/Qqn76GNryiGiv8r3Yj8WWr/FDaadSBNf/xOVNadU735qT97OLx2epm7JEmMJ7FGjqNLnnMQjS7Lv8Ee+cSvaURvKbkP6mXwKLx2Jn60qPbUo5wbVwpVyXKWIz1Q1in+tqTxg19L+YEi/dkk8xSucErzK3jLql8HmZUhw/bLWWL79ZOIBOS9H1Im+oLmel+mnHnyIuEc8+DYpPPr/KbijfhNPwqtGeveqt8u9qPiRhDvwZnODJ4tJ7lhjbzY1fGWzLo3JC3CGRboMbuUdzIpjnpJW/qidqwAOFkUl3OFM/rOQ/LAMd66Cd17RrqB49en/l2nk+gL7ZGfxVKdExCXt15UhWlb+Bwi+wh3fkQZ3n8Yn6nS7X2sZnxn8IzLcB28fPbHJt3F2dLNsEya8TKvGZaOsufdnWF5N57UFH4WyuJnIqgjuZNmIqhj+4uaY6keMWmOJcb76th3PstyOWdZfpswL0TPxPLZp7t0DbT20fry3wMbF3M2vlE2Xu55YdH5hjkf53w8Xz7+Ftp3QnHBAGQr51sF12WJ0j0aXeQMiStGGaqB+kqe6WsCt9zuTN9F4R3EL8zo2Nu/amIp1IoqRYhYXVJV+M/1zxd/ZJVG8Qop5Puc+iffAUfT2F9WZ5T6gEaUymQ/qiT1Eo0qVkNS79MIdDUkdfzfo31vZix6MVJPg+rt6sL3VAn1VbSK54Z/he+OkAbWVa8LHQnaMxzZYG7NPrJRIe4fUg/nLHeFahaCWe4S1ewUqC4BP/m3Q/p0t3UjCc3sMnqqVJN0qTXY7tuSE8+uvLtymoRodlmtkK93zp7kLcoH191d+ehQDMvkBdXFHRucH+xQzpi/oZeMcUNQKvfHlaELlkkZJFGmipwyVebgZ4lsZZG8o7srkyiGYYk8JOzxaK6JkfPH5XMgWhSLXBInHlFs85IiCWTLl/61P1DEp0rnT2Rz3UCMFY06J8kPR4+GFMl7FOPimN+QjpDy65G3WqYeZIpnBNjCt63CFqyqyTIn/Kbz59Mgjf92OiDE0Tv6bK11r65r9e3ja4/+jZr83aR/o2bLl/d9Gp87HD+VyGfAyFNtRvuxW9qNvf41nLdbO8bFepMWnZ3jaxt+dY+vrVGz3aBd2m3etsmLA1yMuge1q2tZ6vrGwMHLU7ih11fXv7Rgj5I52hTLbucdnA3uobsF99Ddahxfl72+Y5UQgu5Bcx6nGa0ftK6umztdbH59u43Nb23TXbTWCN7tXWx2CzdVYNkVPwEEa7TW2uZFB+93ba1Ov9YatOjAWYawZwMP2MBzmqO/tP56fF3EZYd/7vGihcdvNLdw8ZcO7tOD5Tr/7OLp/tKpEabbLQJzF9rW3N3BD7ECb2v0ZquDO49GG51t3H27s4+LBi+2OySXemcHd1qvd/A2d992eBv92uzu4Ok2u0wQDSI2VNYvtKRy8dFBs4Nwbe00YKeXgguHxn8ZP9Nf3fhf+PxC+v8BvmE//QpLHnOzQAOxmuaQuPmQ9NGl+RRoQTrwe4esAcTEo+2DRV/hYIfE020TJHD3iMVBY40Aah4QF/wncOcnek7DerNGvjzXMxyTl3/KHc4c7e44V9fwAUo3ooXHC4sXprKAZRP3h/5THNEC5LbbMeECBiwtsbTFskDL9d067tddoyt2W7/g4gBlZo3qtX3ap16jblevrdHaxhr9aoCubDe73rX5qjjq7rX4S3tLrKntiS+j+gEp2mhnF5q3s9ugc4KsSUVbW9u8wNX/RiOuJilGgbjlJY2wlsnWOlS/aoqK/6qINqsUgfIMAfwbwpE9UD5o3Whrm3X2Lej29tpbYLXXG7hiv029bFs4BlgU1Bf/n6KSbBMYOx3aa6dOJ2lwR6hvI/ut4wnrr3H9+jZeaQQdBe7O7y2Rq5niat8BAYrrgNm2Qtcy+VpW8rW2djb8FQd7TZr0y4vwFGBiLdth1oIlsVYlRFrDyqCHMWd3jW5BvYnRRrtxdb2xd4Cn29h7S4sO/CqUYPmWl9I2kKUYbTTAam806GY2Gq8DmzYam3CRjcYbvNReh7h+r0OqNGo16nDZNnBAb/SmvcOMXw8s2n8FkrRL1XKxWCqr97nVoJZsoubBsr3e8a7L9qjd2ceT1zbqviFrIaC1sf1aodH9Q7CWHMMfB96q2adRCtS7Fqz/O8Zz0lLV1oiya2vQ4MKwMqo1trCRtZ0d7KK1HbqPWmeddupQP6yhyYJFjaRdq72mRX1XnIBtXq1NZqLWJHBqTep1tV1e2QFWrpZGNbaStS6fvdvhi+zw+XixtYat3MVWgd7uWSB2WNh4msZegRZNC/m20bR5UcDFKBUyf9YhQ3NUTslLfSm88h5VEgxuEjNrRsysRWH2UGC2Qf7bJ6plQM8rCRuHsRkmYGNqsXHdEDZmAjZuhbEp2FOjYzkMT4/h6TE8FYanwvBURp0WcI7bH3U6YonuiQ2uSKcjvqQD8LkAcPxwqiGV+gT3DIIJJyY07WISmr0UaCqaloSmomm9+fZOgrBU0kDYadV4S4eXQUjvC0hr1B/Bv/DzSQyoHPFZNdqiYmgwsddqsbQ8Z779tuBm7Le9afttHEaPIhhtU+ySod+q6KTStbuBziZFcoNZ0EnDalNYySmwMReDzdMINjP2rjn7ETeHkKT0BiF0RHcvZ1UwRoEtlOk4F6PcyXpkLykHFW4IpwbpU//O4mTPHacVH6czg5+ZfFNWLNEncJ2MRG0yNCZDYzI0JkNjMjRmSmiealVoTFp3UYGsuSvQEy1KgsKnx+jWjVoSQkVGqMgIFWfSo02Rx/t6J51GKxzOFBmmIsPUY5h6DFM4WHkkYFqDLnROI73nVLF+5I83MVjpuhk2PIBPyWGAaPtEgCpOAh9RbBeAaDCj7bcZIZsRchghhxFyOOBDsYYiPrwNCldgxTQYyrgZxz/+bvATbybxekHbG5OBtKoCSrufFDyrUE4VPmcG066mA/OJALNOA038oB+Zbvjql3sxoJjxvAzBWB4wjmWZmtF32KQwBg8NdVh7sn3MHMfYlXQI1kT+oZYJL9mJ/wqqx0OZQcycImNm9RXQZELLZNTcJN3zemm8CurjAdxKwq3AoxcD3Du8qEg7FKzBWPemxVA6Zm0aEu3TAIdO8yquALE6J3N6i3qXVc/0xkJFaDhfgPT+hr1UAK0EAOL637PkzLLoiVYhdRxtmc70elQ0GSbyZBAoLyntN5+eGMTuoY8dz6B0qerhxJ/1FspgpUJMaBVx1kQXzbJdgRmawJSYlYYCMzwYMaPEaTq7mRKzNkBlD4fwpRYlrWTMpKa1uKJ/8rhPGDfGa5KqeU4G2CTliy5J3sdcUWtJqu9IvwM5nx0Q+aVVkx6I/NIW6j89xHW/FiA5dlAhRr3ReCMKxmV3+u7siBR+T2BcGDgLATlsWGsyoT81klkcZL1nRyMl8WC69vRg+u5x0WY0ucOnQ9MapvbvfHW0PW0gWydr8pUcjzAv4izjDxMyaBVGq8pokR8W6N7mrHkih7FiaPAeKsKjo5gEwcKxLC6GikerKLJF4DtxmF9lvEoCsJJArCQUkNUNv/Q9ZUQJveX2JhmydGBOF+iG41yKtzImuNNwZRTNFKpXsHWqVxJICiDjcPTZUuKYWinv+335iAqBPkzTi1MBmS7U0CNJnRkZsT93Y02MSH1YAtkO2h+2SPGISoZsUiHCJZVyHxuflK7OqJ7Od+glZd7AnE9Bgh7OUmTIvSZQ7NSiQ+zJYMkU6KaY3Td+WjAW6ekG2MkwkD6aIZ5kcxLhSW1YQt5QWn+7t1Dw0kMlc6HjiZCromD9QwQsNbfiajNUdkIAN/azMzgzC1O0oNkYezJS9azKMIPqNQz5SKI4NGMM9DREaBWHaVKnNwxnTWZOo7mqbwV2e5qiovF0h2g3VbHqaWO8NMZ3MEzKTrk9refnR3iJUXGMK+MIV8ZhvAouA0bLAi3JTpDliNbEtPcEmq02F8dg6biHGzrRiFAH73PfrTknl3sQmlmyQKgxbk0BtS0cR9dWsB4IJ5sj0QlogzFi3awI5aww2q6o5HKFfroV1eEhkOUXPf78RXroKAgy6igJjhxTiuJBQBQ82XzSsHdvWksu1Ry9m0l8UFBcdukayYCcmDzisFspwhtc2xTSaLI0CGPyfNZYfxFq0udNoiQC0fJSY9gRDys4pUmqKXhVZtDkkJTVG846JCVwLCo4hokV3aQOlQLHa2/JmY4rJA9Ynu9JEn72ZPxe6CNtMWiVTivLGbUylXcpAkmvpyQkBZxOP6SUjk4pJZwqGRRF2UFR1B3AMjw0xb56mwHttIXCit8ItOVpFfWxAPoXfsqHSG8E3ycyjfvuCYX1wgrr9ebU72d1QfV93taFQ+xEBdnVj4LUDPBkDO/7Xn2agXpl/NR35NON1WOqZ8o4yDdc5GPMlB7Slh/7Gc1xjE5elvzS3gsQg8n6qlTRpsc4XfBuV7QpOHJd54iwjN0LMv9WTA+w3mkt6JSVSo/jipN1uY+2sD9nxkelm3PxVrJdKuiwU4ZYtXFmwUxPo6T20V7edybn4nyjpOTiUM8JPf5S4C9MpBAqMZHiF3KUSiYzKbmsbamqbPPTYSrH+pv0KGsNongzAWdJ8uY0UUHiXAPCUJfj1Bt6gWlBh6lb0VumqoiiqiItVy2xo0T2R6aMamN7JFNISng1WTHfUjCabH/CnTrVQFAqHMOa2dcWFCrmXWt/4ryluCRxeJRCwEZmPDV8Mkblx2ThlGN6vZMORqso1LEUVsfeFFa8pOVGU8eNnBDOUgclmTE888UW1EjLAi2535aESVHtdjxoY1ed34ZAT/FK1Lxi1oKAKYwJO5SBcGeKUVvQTi0l4vqmWN/k9X73JUNdFna6zKwouzGR4ib7nbp6Mnyq8Kkxfkfa+AkEjCzP0HephvpCvF9JPkeiRU8BOZ0wWq5N4fHAZNphjMLkENMNGyGy49EA05kqjSL8zYKojoUldXaRfhcBJ9shQaAhT4lEE/D0K2FHP6bAL04g94RACkYjw5hlOU1xZJqEaSHsL4UpAZQvM9p2RRPQb7IrOg1OkhL4oXMnKSbaWFo3KV09qYSsmD7cVCCrTrZGcpRNodE5AwaKBX1aPoF00YBZkwFztX6lNdT5QNaN6thjP4Q5Iy/8yPgkS2CSgZvfFIGkzlnRFqRhJBUAzp4mSxQHHLs7najJnoTgkwCCf6cwcJVCxqkxpLKgKcqWfRydyY5P5jnk6NmkmPFLkbZb1oyG0wAHrZBfpOVoCd8Sb5EzwwFnU80QT5LCI9/nPOKH4tCDPtSqU1UCpawZYyv9CJKf8SiUpq9KkBmPSROuN2UAvhkNwCdB99wPGU+o4HnaMQ/9wObsFEplWIFBj57e6gzTZ4zVQFLLBdIRavsjF9H4Oy2kvlu5eEgjZR5aT7NQrYQHkjyt96MfzFAKZlw9weqic/WBAOMhJOHfB9PHjD7cYLnIXIB5uVFzu3F1neopVF7kSeP7sVtmfQpVMxjacYPEhGgM4ZQmBbfsx27J1iSbmwSLDb9Fz6E9rv8AioEIdi4Dz1O48L0AV4y1oYa6xgewYPJxFc2NN/h4qDqffAu+b+BTf+B7PfB8sMAmS24Sz1/BbW9xmzn7eayMp5Cb4DdBNwqJ7qEQXZ1mJLn03O2o+ALvfVTEF9ySTXwFFl8hF18G8T0R4muLR+Px62LDQnzii0q3z36KfbIJtseC7eWCzSDYB36/PBPPSQvGel4gySi37SdsyyZAhwXo5AKcoWfKFyackZ8kYFN6pn6f/RT7zES5lpVLNoNkx+5Xjx4ANq5n9kQaW67fj1mfTWpFlloxF9oMQmuRu+kGZq17IlyR6/dj1mcTWpmFVs6FNoPQmvxCFx8WKZzx+v2Y9dmEVmGhVXKhZRDaYyG0dTG39RORXtB/eSzEpNtjf+Ie2URaZZFWc5FmEOl3QqQ1Gpy98EsFPH8e1LnfB9W12cTlsrjcXFwZxLXiB4XYc/jZYmo8P96ixvPjLdlEN2DRDXLRzWDxfjH4SeGqxRuv349Zn01oQxbaMBfaDLF6a5zi9oOCB74fGdy2n7AtmwA9FqAXatgjX5vwWd8NksgRZeDlyJHUHnX7/oTt2RppiewxLhtW8BULDTv0qxD65YR+dVkAG5QUz6KtD4W2yld38CsPPwY0taRTD25CUD3MV3ZwI+pYcKMz1h67p24sjTfi/+GNlaDqxmq1r5Kh3nHH2j6/HplJF1aELtTplSGfSLfHeuDoGlUtOyWrF77pgn9n/UHFLSqI+FtLrj3El2Zo7mfoDfruICrO22nCkkilQ8+gulKkotXwaqFqVlUN93XRsfFPUfGi3Nov9gt9K0bHS/QvvLHsHzoY4p8Wi4qJfyk76FI3/5a14YHQhjbNP6rRUP1EvyLKeONmVU2zb6f0K9KdZ0kQCjzCB7ZNtGdRzRirHAo/YhR8vSmV2KXSqhweWPbiVI4vHGMWyvBfapO2xM2/ZX14FvDHoa+InvOW9IILA8e6UdA2Uah2EIMABEmutqtzShZ1kVvG+bmCcwBhDU+FQHg1bksfXKxeHAwDDzaHN1bVIxPRnvOFlkSz16nOjeqOqGhrgyYN4CugJ7CebRbciCfs04bVr5atfhxtWEPHc4oxtFHqDV3TiqON6IkttUWpWG+pm3/LuvEk4Mv3STMuabay2g+1wJpmoaKahDGwEAVVe+U4YIHGSgkxUvTQcsKhltqiVHqx1M2/Zb14GvIffaaYxNDxlihAm9EIONR6nfwWdZElQRmnGp1RBfKlsSeevPB+sr9uV81esRrnV2kJcobz3DJWMl/qZ0nHmdNJOMlkZnLj0sQ1ac6zJDj9nvLK683G1XXgFcOPKUd5aGxRvTX6PP7r1v1xuKE/dEOv2FReJPwg8MyuNeqN49f0/pFeo10MvaL3gdGhV+h+gf7bN/6bc6QTXuu7EngJfNf4ipk0ccQfIi8t7tA8hQFdwZe52Ps741/FC8bpT7mGmNYEWoCl+pfGUcw1VuAaJ5TRG0ZaU5zyFcpl2lqi1yXjq1HxFeQurLH9Vyhb9IJOl154ze0u0p5l+LTo1Z2m8grlBwG01HvRveZ5k/JgzBQ6xLzxn3JkjebPXVLtWIfqOi9jJfPcx5f3PIfPhnjSS4+KYOKOTPdK6D+JTHtYcx4HsJA1buecx/ARKStSe0TPSrsAPpCvKsOecQG8Ede+sT7sUFXrpXjp0jHlFuVRltIy+fJvfMgFTUqmfgERR8x1Ho/7V2zLCsoR476px/qPpHfh6zyh50Z8ET4M9v5BRC9Wwj0JXy8bkRk/WBxaZzSJX6PapZ5Fbclj0s3LCe0I6KemHTzHM8RsWi3Hl5jr2rCYV4r/GWTZJ+l7wvrwYyFXjdckIf5+LFj5lKk7A2s3eWZMztqJrK22JmftnLVz1s5Z+6ZZe0WwdgeuKWaN58ydyNxWztw5c+fMnTP3kjB3G+7eo2sMc+ZOZO5Sztw5c+fMnTP3LTP3A8Hc70j+7+Cc7w075+5E7nZy7s65O+funLuXxOsOcHfO3InMXciZO2funLlz5r5l5v7eiGS6xf40H4fOP8i5PJHL7ZzLcy7PuTzn8hvhcs293ZEKQXWMMK8QzFk7Z+2ctZebtV+EWPuVwtY9aPM/Z2LrZa0MXC62zisDc7bO2Tpn69ti67tQEbhcjJ1XBOaMnTN2zti3zdjLXAm4XIydVwLmjJ0zds7Yt8XYd6MCcLk4O68AzDk75+ycs2/by17myr/lYuy88i9n7Jyxc8a+Lca+mxV/y8XhecVfzuE5h+ccvlgOb8AVUN8CXKfUjgj9iLB1Mj+q8ihNnfntQW+qGg78DeD+KnPhs1n6/5PQ/er7AHKirbFR8ih+Tuy4H1cSLE7UAhbg7DoLKI9IrmdZjPYhKlhjekKZtAv6Ll9BNL3OPRU6N35K52For9l0sDe1Tb2LOvgHozyFBqq5vd+2Bj4RGhi0KKrvel/oIHqr4D0uYdWcGt3nVXNJfmrUk8691Gm9VFtpX+6lzsdLtSLS+616qchSeEcf4Jhz41eQ0WeaP5Kdn9tw/mPizWXjZ5Vvcn7O+Tnn57vIz7+fLMJjeqcJa4iXyNFPQ3y2SvLj9yadBCK5R4H54KtzjeGmnVNXFCzlET8hi5Xhz4H9JZ8V4Bu+5QfbIK9TIQb0KPJDVstjuEVq37OAtkiNSYrj0ungU2KlE7I3IR00XuFfRBPvGT0FrW9A/mGs7kG7knu82l8na2jfqMJRLnyi5RySxXWo/0sNxcwD6qcH+iv7Ae5dgd+o1wPYP6yh/wJXqoEkPJIT880h9WvkHOzlX+D3pS9F1N1/+Pd9j668ip+hs943BinzXovRkx9hO8479mjvPtkSrb6s/kcmjXkQYi25TdWTJL9s2lopm5inAjIEBImJUKYo5ezstLyeTWlqz8bJaD3jLPiiclBB/roQuvN/xpGGux4BJw8gyvhM8lgNtJ518Ce4s3PfSxJ4GD+rmMZw2GSNK4DWFIA9+qRHbAWroHFWSONw+wDOYhIjod2skmc2INZR/fvFsM1T4trgPR8S6mfkl1zG6PBzaHkUvzRHLkY3fgKfkd/liW36AN/xjD8br7XynE5Xvg2OqWfQhQHItQj6YAn5viQfaQD9VI31Kr7dQV1A72kA/5ukSTehC4uRzX1Y95FkwhHPtH31QeBNY6uibScavyIuitUx1HdwP58oPsG7+5oQF60E4hDU7cEMUf+AerZDVsYl69OjiL6q2CFkil4o6qcYh8ZHhnP0kheVhWoKz8EDdj4hPzoa4UyS+gpEsdL2XGTmYbTcDkVb2L84LrGgZUVN37Nvte89JkvA/HskmPWQzjnwtRN5pKjEORfEt+cUaR8KjwSPe2/0Y/2P8DHpr/ZU28b3hnyXb1I7dUf2DX6jZ/xxcaiM70531KPAUWNEhrE5FhUReUy4fepR8dinv1L6e3qsuadJ7YseocpKPUaPXLwurcA27Psf4VPdU630Cu4ZbUd47wehvdX7tBLbEEQ/vOezWPQna6J6bFpEn8deM02/WVQ1S5f8oi/s08AV8EhszQf4hW3N4ietwBo89oo0aD6e89D3nAtL5zk/GkuQznZGUfMlxFUbLQBto9W9uj7YruObRd/yYjReZxeLvBa/qHl80uG5nxP65lzP+VD2mrmedTEavwKRgNTN00za/RC2f6ZRj9WgZzKzT2L5PomT+yS5T5L7JLlP8rv0SX70+fXlJO9kSuZ+bmySlfrZ6FDu+jO1CLnwzLcFs/opA99PsZfQTzmiGPpwPKqiHKevvngAx7F1T5MPvNBgm+bIZyJntxx5xB/83AXXN6DO/ErjHcdypFbrPdyDa15SJnqctWqSR4TjH3LMP4u34FENiAl6gxkg9Aw8GpUaj6ya5C1gZuh2vYXFjZn/SjjyeNEFSMHV5vyjMngm8vlyPtSq8N/WoC2fcKQqgzxskoRNPbhHvd2FpUOjh0HvrUijR+kqd+6SPF5QNjyAIVwDx7uQQVaJqxFvtX/8yR9PZ8mMf2fpERZs88h2Ob7/LGPFZfKfF9UjfjFwfAN7wT/8b7onTauoPyE8JTuvyq2ZbWARkKyQVpfgLkvETZ4Y2XBIJh7luC0aeS/SCDxWvaGHUaE9eoaaz16MJH4gezK2S31x54cJY+2qhYs7Q7SeoXpDc5JqhMbQt0wXtOTq/F/hDHBsZIw+qhNtGo84Fj14Vp0YUO8sUAWMQ/xo0/krpBM4AlokncA+6JFWDIhRHeqvHvVP90Z04nvCWd55WKKq9/ENtDAs0xexR/8PLHvGSWhk6RtkohvxX4LS5FHyIFvgzDWd/6JqxSPjnYFzij/OQSOqYmYP8kLJ94pt4muc9dMnlkAeKdHYWJ8YwqPRMpv8aLSdN6ERz2Efvuvp5flMe2waTVrUOwreoUWgcb9jQ84Hz6oPK74WrJKMzzUV4dNabvt3Z7l/pFohZOYPwpv9ktGSPzM2jB5FvBfU1+dhzcN5SdPPSxaWTjo/UHYlePfBPid5+bNf4fQ9tPEVxVDxf6UbkT9L7Z/CRrMOpOmP34nKunOqNz/1Zw+H104vc5ckifEk1shxdMlzDqLRZfk32COf+DWN6C0l90G9DB6F187EjxbVnnqUc+NKoSpZznKkB8o6xd+WNH7wayk/UKQ/m2SewhVOaX4Fb1n16yCzMmTYfjlLbL9+EpGAvPdDykRf0Fzvy5QzT14knGMeHJt0fp3fVLwRv+lHoTVj3Vv128V+VNwI4j0405nBs+UkN6yRF7s63pJZ94akRTjDAj1ml/JOJsVRL2lLX9SOFQAni+JyrnBG33lIHjjGWzehe89IN3D8+tS/63QSfaE98rNYqnMC4vLWi6owbQufQ2Qf4c6PKMP7D+MzVbq9j9WMb406tfwz3NuFX1UaXJeFizzKobAdcEUsVQ2MIvN8BhPkf7vzGRYjjzB+4bE37KtfNRqDFaFV6geYQ68qY4Guf774I6uUqyikkO9zmg3Ad8CcgVZjdUapDyhuLpOHViWplyh3Ug1JvU95tmpI6vi/R/veTMZtMVJPg+rt6sL3NN7zVbSKZ8B8he+OkAZWj6wLHQnO5sD4jedNZo/fKpRpHVIPZ1++QpnZoC9fopGJAmVf8ZN/O6RPd1s3ktDMLqOnSs68S63Bdt+WnLiG/O7KaRKi2WW1Qh7+OVe+36J8nMhssbskHx2KYZm8oNG/Y+EFdcgz5m84/71HI61jqdwfj38vWCZlkESZxh3KNP6AnyWylUXyju6uTKIYhiXykLDHoznzL2fJyNluLYr1LokT8dsnaDc+JeCKYld5bayvieYt/kQ21w347dFnUk6SH8bIQ/LuPRr/xszGkI6Q8uuRt1qmHmSKmVC28G2rsAXHDrLMfLnpKGEapNUsBj+XJTxbVj4hcJPu4mzpnsOSNC9+Xs9hcZQ97+5zWO7G81wrGfrZLPOV1XrPSfOV1QrgRT2JRT1i0pNYcFRQrZDNn8WynM9i+TZh9rieieUbEnbpGpgTjM5C/T2wcTFn4xtl4+V+ekT0qSQ5H+d8PAc+HrXWulfXtfr28bVH/0ZN/m7Sv1Gz5fP1fRqTOxw/ichn7MiTbEb7sVvajb3+NZy3WzvGxXqTFp2d42sbfnWPr61Rs92gXdpt3rbJiwNcjLoHtatrWd76xsABy9PRTuf11fUvLdijZI42xbLbeQdng3vobsE9dLcax9dlr+9YJbzt7kFzHqcZrR+0rq6bO11sfn27jc1vbdNdtNZgd/ixi81u4aYKLLviJ4BgjdZa27zo4P2urdXp11qDFh04yxD2bOABG3hOc/SX1l+Pr4u47PDPPV608PiN5hYu/tLBfXqwXOefXTzdXzo1wnS7RWDuQtuauzv4IVbgbY3ebHVw59Foo7ONu2939nHR4MV2h+RS7+zgTuv1Dt7m7tsOb6Nfm90dPN1ml8PlBlEMKuAXWlKJ+Oig2UG4tnYasNNLkRkYGv9l/Ex/deN/4fML6fQH+IZR61dY8jibBRqIFTSHxCCHpI8uzaFABu3A7x2yCaDho+2DRV/hYIfE020TJHD3iMVBY40Aah6Qf/GfxivoofhshvVmjXo91zAcU877lDucOdrdca6u4QOUbkQLjxcWL0xlAcsm7g/9pziiBchtt2PCBQxYWmJpi2WBluu7ddyvu0ZX7LZ+wcUByswa1Wv7tE+9Rt2uXlujtY01+tUAXdludr1r81Vx1N1r8Zf2llhT2xNfRvUDUrTRzi40b2e3QecctTZ2L7iCYCg4bBXszNYOKW5ra5sXuPO/gZeBeYwijbB64hkSZTHTx6GMkyeyGCatGxCH9mm8pgj/96meowAqCW0ebb8FVd9eewsk93oDL7PfZtUWcf86Vd2cihZtbxMyO6z+O3Xqnw3uFfVtpMJ1PF39NW5e34YLbO1s+CsO9po0E5cX4Xm5RCu2w7QCS6KVSohVhpVBD4dIumvQbvz3Zgsw9Ptk5CYscRP3qbipL/4/RcUP3IbFt2Em30bkaqONBjjdG41N2LbReIN7cHf6d+g+/2X8ze8+fxPd52+ZOmiTeCLUIfzustchG7HXIRUc/X/RNeaNeEkbZwAAAL5ta0JTeJxdTssOgjAQ7M3f8BMAU8AjlFdDqwZKBG9gbMLFi0kvm/13W0AObrKZyczOZmSdGigaNoOPvWAaPBxWuPNMQ0BDrLjS4EcBNnmrwWHbzfYgLW1Kb4NiEAZEMhhI63KydtcIB+IiP0AOJCcTeZG33SPxUbaLyYQNsdwlWe2EXEgDXJa70F+LpdMKfw1vva3teVg5Mj5RtY8ZYg8Vtx8Vz2aI9DmIfdw4jabxx8fgFO6cxhQxU4kB3OYLk6RfO+8mfbIAAATBbWtCVPrOyv4Afo2pAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAB4nO3aS0hcdxTHcWenqDM6Mz5Hx/GR8ZWOrcZXjYriW4dRfNWO+FgIhYIbu+zGhRCEUixIQbALcVGNaRNT05ZipE1DYh+QLkuR7FpbKSappgZ1bs8/KASJmsWMt4zfP3wQYRYH/r8551zmrtfX13vr6uoM+fn5IZqm4Xz5uLi4+K+oqKiPLsgZGRkxlJSU6F0TztaXcXFxWkhIyK7ZbP4gKyvLNjY2ZigqKtK7LpyNwubmZl9oaKjKgGYwGPZMJtMVp9Npnp2dNUh/0Ls+BN5X6enpz+9fPLBarU+kF+zGxsa+JzkIW1tb07s+BJZrcHBQ9YDvbTabdnC+npqa8nm93keSg3dcLpfB4XDoXScCZ1Hu99f4+HjtyLkzMTGh9fX1PUhISHB4PB6960RgJPf39/siIyNvLC8vay85vvb29s3w8PDUhoYGvWtFYHySlpb2bGhoSDtybszMzGzLc+IviYmJf8t+mFZTU6N3rfC/mPHxcZ/RaFyan59fO7j7nx8+fKhFREQMu91u9f9PsiM8ks+k19bW6l0v/O+K9ADNYrGou742PT2tyUz4MC8vT3vh/JCUlPRYZaCyslLveuFfppWVlc2YmJgt6fPb0dHR7x65+8Pzo8qAfCajurpa75rhX5cbGxvVLnhLdn6D/NWOOauSgSfSBzKqqqr0rhn+VaEyIDvfp9ILOvf29rRjzv3k5GSVgQvl5eV61ww/Z6CpqUllYO4VMvCPZMDJPhB0ylUfkD1gzmq1npSBe5KBLZkVTvpA0Lms+oBkYP6UPnDPbrdvSR/IrKio0LtmBCYDV0/JwF3JwLb0gczS0lK9a4Z/lanfiiUDCzILOnZ3d7Vjzt2UlBSVgeyysjK9a4Z/vdnS0qIycO2UDNyRDDxVGeCdoqBT6na7VQY+IwPnVqnH4/GZzebPLRbLiRlwOBxPIyIicshA0ClRfUBl4JQ+8J30gR3pAzmFhYV61wz/Km5ra1MZuC59oP2EDHwrfWBH+kAu7xQGneLW1laVgcVTMrCSmpr6TDJwsaCgQO+a4V9FB/vAomh7hQy8xiwIOoUdHR0qAzfl2eCkDNyWDPyrMsAsCDqXDvaBL07LgOwDj8PCwshA8LnU2dmpMrB0wixQvxf5TCbTjtFozJF9wJCbm6t33fCf/K6urucZeEkfmMvIyNDk7vOGh4dvyrPh7/Js2Od0OvWuGX7OQHd3t0+eCW5JBg5/M7oq96zeJ13d2Ng4zIOvp6fnT7vdrne9CEwG9iQDKzabbVV6/p70hPsv3P03k5OTm9ILsgYGBvSuFYHxRm9vr5r1mux7GaOjo4d3P7OwsKDmwFs8Cwa9171er3qv+LrM+j/29/eXxsfHNdn93s/Ozta7NpyNizIL1mUWbMv8X7darW/zfsC54/V4PL+5XK5M+f7rXQsAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAPj/+Q+1BzhL2n5jdwAACrVta0JU+s7K/gB/V7oAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAHic7Z2Nkds4DEZTSBpJISkkjaSQFJJGUkhukJt38+4LSMlZrx3beDOe1eqHpAgSogCQ+vlzGIZhGIZhGIZhGIZheEm+f//+2+/Hjx//HbsnVY57l+HZ+fDhw2+/r1+//qr32r5n/Vc5qgzD+4G8z+L28Jb+ubu2jtVvJ3+uR1cNez5+/NjW1Ur+7v9sf/r06dffb9++/fzy5ct/+qL2F7Wv8ikqL87lGOeRTv1crtrPsdpv+ZN2nVtpWl/VsWHPSs6d/i86+X/+/PnXNvVP/y25lAyQOTJiP+dU/sgUmdf+bBf0a84lP7cT2gLlG/bs5F8y8viv6OTPMeRCf7UMkXO1FfdZ5Mc14D6+OoY+AMpjPTHs2cn/rP5P+XfvDOh55F5/qy0g19q2LP3MWMnfegDo+5WedcPQc035I9eSVV3rPkhf95jAefhZksd2uiHbifWM5V9txGkM/1J14v5ztB9dzVicbR+nX2f7KVlZ3ikP+m3mXdd5LJeyrG3aIHqGMcnqmmEYhmEYhmF4RRjH35NHsNen//NvL+9Z8t36Hlzqa7o29a54hMvo7WoHz+ZnSJ3wlva+u5b38538z9jxj3yGeZ73db7ELr2V/P+G/vMWXP70s2HPw6aOTSb9d+nbwxfka+kjnc+Q+iQ/zl35A03nb6SMXI/9yL4s2y/t39qll/K3H+JR20DK3342H3M/KX2Jziy5IBtsvuznnPQL2GdYICPsdgXnUee0D5P2Z7cd2gz3Qp6ZFvLu7NmZXsrfdfSo44Gu/wN1aL3gvm0/jn17XYzQLn7IfdB2X/f/SjvreOdvzGdK9uv0WV2S3rPrf0C26QMu7KspmeFvcX9Dlvy/kz993z5Ax/tYn8DO35jyJy38AOTTyf8ovVeRP8/2+puysbyL9MXbF+f63ukG9InbCbrFuhh2/saUv8/r5E+cypn0Uv6c1/nD/nbsW0s/W0F9pT8t/Xf27eW11G3R1ZH9fTxHyGPlS4SVvzF9iLyndeXxeOZMet6mHh5V/sMwDMMwDMNQY1vsm/w8Pr9nXD32gBljvx+2ffGzTb6LC70Vf8P8w2dnZ9Pq/ODWCegOx4Tn3MD0LUJe6/NrX2c/zPKgr0Y/nKOzqyD/ld3XdjB8fNiO0BvYfz3Hp0i/UMbu22fnc+y34y/HaB/YkfFJDcd0/dx+F9d7kfLn+m5ep32Btu9a5vgPunlEnuuX88/st/M16Ijp/+dYyX+l/1d28PSlp08dGyntIvuxYzDOHMt2WeCT2MULDP/nWvLvfH7guV8lL88FLM70f3BcgMvJuXnOsOda8i/Qyek7L3iGF9bhznP1/F/pBrc5P/8dq1DM3K813btc7Vu943l83tkCGMPn9cSNOJ3Uz934n2cA5Pu/y8qxTHvkPwzDMAzDMAznGF/gazO+wOeGPrSS4/gCnxvb3MYX+HrkGqvJ+AJfg538xxf4/FxT/uMLfDyuKf9ifIGPxcrnN77AYRiGYRiGYXhuLrWVdOuGHGF/Ej9sxPdeQ+OV3xF2a62s2L0jruD93H5l+5DuKf+0MzwzXtcH2xu2ucJr8KxkbPljf8Emt2pLK5uc5W9/ImXy+jwu48qeYJvB6l4oM3rM8s/26HUKn8GmbNsrNrv633a07ps8mYbXEMOvhw2+azdd/y9s02MbW2D9T9r2+dBufb3X5/KahKvvC5FHyt/rjrEGmtfEenSQEbhedt/kMil/PztXbcZy9TWd/B1v5GP2H7Of/kl67D/6vpiPkU/u93p494x7uSbYxyH7hWW5ei7+qfy7/Z380xfUxSLRr9HtpH/0DbndMfwU1vPkwfFHZ9f/7Xsr0o8Dt5J/1x5s+3c8Af09fUfdvezaRsaokF76KR/1nYG27HpJHXDkR7+V/Auv40vsAKzWnM57zXvZyd9lyO8L+5pHlX+RMTLpx9utr89xr6eZaXVtZheXkz6/Lr/V/t19rK7N6/Kcrn6eYew/DMMwDMMwDLCaW3W0v5sr8Df4U3ZxrMPv7ObWrfZ5zoXnCh29P96CkX+PfRi2oeWcGlj553ftxbaR2nbMP9/lsN+p8PdE8P+Bj/la25PwLXEvlj/fs/E9v+o8EcvMfraMm4cj/d/Z5q3/2ea7PrbT2UZr/4zbInH++HqwAXKtv1Hobwk5xsRypiz4iO6tp27NWVs7HO2nb+Y6ASl/QA+4LWDXpy3YN4v8KHvOG7Hfr5tT0u2n3fq7QK/CteXf9Z9L5O85H+ju/Nagv8m4k38+DzqfbsEz6RXnCl9b/18qf+ttdLBjbezDQz7kcaT/U/60jUyT+BDHCDyyP+cSPG6ij9GvbiH/wj499+fdPPK8Nsd/O/njx6v0c/z36P7cYRiGYRiGYRiGe+B4y4yZXMV/3ord++pwHXjntj8w14u8FyP/NZ7f4Ph65sfRj5mDY79dprOyoXgOXvrqbIfyvKCVD9DHKBPXZvmx/zp+H5+my9PZo14BbKBpD8Vu5zUaOa+zqReeV8fPfrdcOxTbP3b+bo6X7bv255I2Zcxypd/R/b/zVWJTfnb5p/6jXrn3VQxPN08o6Xw7K/lTz+lH9Pw0fD/YZu0ftP/Q97YqP8dyjpf3V37PMs9vxU7+ltmfyn+l/1P+Of/XfmSOYavnmOfy7taH3MnfbRRIizb27G3AWP9b/91K/oX9kH7Ocy7jEtoDeZzR/5BtgzTZtk/c7e8VfEIe/61k/J7y9/gv5/jZB5j+wWI1/tvJv8h5/t3471XkPwzDMAzDMAzDMAzDMAzDMAzDMAzDMLwuxFAWl34PBB/+KtbOMUBHXOKfv+TcS8rw3hDfcktY/5i1czJ/4rEo36Xy57qOSuvstxa6OJSOjCc+4pJYQOKWvA7OUaz7Uf0aYqPg2nH0jp3yd3iJC+xi9ymTv+vuuF/KS3yVj5F2zhcg3twx547VTbw2EGsIZZ9lLTLHm+/6NfmfOZfzHT9LXo5FuqR+iTnyz7FR77GuWa7XRrk4lut/EQ9OP+V+Ozo9SjyX79vf/qEt7HQA8brEknlOQd4bx+lnu/5D/o4JXOH7Tv3iWMpL6pdzKSfpXkv/Z1x+4ucyfZs27X3Us7+34e8puR7cbl1Pu/ty3h1eG8z3s2qHfoYit+57H3DmueL5Mjl3gDaUHNUv0C4cn3otdu06+yv9x/+j87JNe95Xlx79j/tKWbmvWvetyuq1omAlt4wN7dKkbDmPhbwS55XtnraZHNWvzyNPz1V6K+jBVf8/O+79E/lzjufcZJp+Hnbx4E63m4dEnec3Ki5Z56sbK3Y603llO/T4OMt9pn7p/918hbeyK8OR3oVO/jl/o+DdwH2Ve0LGniN0Bq/pmNd47pDj1a1zj1jJv2uvjFOsH1btm/wv1ee7dUo9b+oMR/2/8DyL1btMJ/+jsvNMrPI6D+REXbI23GqsZp2Z8mdMmOsEep0vryvYvVt7jpnfHbpy8N1D9E2uWddxpn7h6Fu7HHuPeYu8o67yzXkaCWMFyHpBv6fe9Lv0kd470+5374SrsYDHOZesE3rJc3pXv5T7SK6c8+zzVodheDP/AKCC+iDgvyWjAAAO121rQlT6zsr+AH+SgQAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAeJztnY2RHCkMhR2IE3EgDsSJOBAH4kQcyF7p6j7Xu2dJQM/P/livampnu2kQEgjQg56Xl8FgMBgMBoPBYDAYDAaDweA//Pr16+Xnz59/fOI696rn4nOlrABl+PfB/1Hp+Yr+M3z//v3l06dPf3ziOvcyfPny5d/PLr59+/Y777A3ZQT0+0dG1Pu0npWeT/W/AjbR/q72X/VR+naVppPX7d/5nV1U8qzkBF0avV6ly65n7bx7PnBq56t66+wf5Wvfdbm0b3semg95Bar+r3ll9Y77nz9//vd76C3S/fjx4/e9eIa6qC8LRDq9HukzRP6eJvKIvLkXZateSBfX9XnqoGkjL09HHfR6/I3Pqv/H369fv/5+7go6+3NNZdHyI02UzzNZnyM99zL7uwxRntsIm8ff0Jmmie+MW1xzPUUanfM4tH1FPqRHF8ip6VTu+KAL2rLKHddUH6pnLZ/xfdf++swVrPx/VmbW/+l/nbyBzP7qb6hTVnfsHHpWfdEu4oMv0D6ofoE8VnJ2ukA+yiE/9xVVnf35kM/L3xn/7zEXuMX+6Dz6I/Xu5KX+lf19HeLAttg9/kZbIH/+936GrPRR2otC86FOmS7wty4r7ZG5XmV/ZNTnvfxMbytbXMUt9qcda7vv5A1k9ld/h+/N+ih93f2P6jbucd39JL4jsz960DaW6ULTqc1pF8jv9sc/8kz85RnNN64h4zPsT19RfdCfAXX17+pvGd8cmh6Z6Vv6PZ6lD3RrpciL+/hNwP+Rxu8hJ30vA/XGh2S60HIy+clfx0P6h//vsqj8Opep9Om6HQwGg8FgMBgMOjj3l91/zfJvwT24hCs4LfM0fcXbnsJj5cSlWM9kcYF7YlX+6tkVn9ZxmI/Cqc6u6Ljibe8hq8a2q2cqzqryH1Vcerf8W/m0R0Hl1j0TXqcrcnXx/Hu160xW5dX8/gnnVaU/Kf9WPq3Sk/OGzin6HgXneJCFfJwDWems0oHGFbtnHml/9OOcXMV5adxeY+ZV+tPyb+HTKj0RowvAs8LzIfPK/sTtVBaVs9NZpQO1P3Jm8mf+/8oemhP7V5yXc9bKvVYc2W751PUqn1bZH+5Y+SPlFD3/zEbI3P1/qgPPq5J/lytboRqr4Eb0fsV5BUirXEyXfrf8W/m0zk/Sh6OMaA/0NZ7dtb+OGZ72VAen9r8V6m/gGpR3r3xTZheu+9zB05+Ufyuf1ukps7fOOxkXtOzMRgHlFrO0Ozp4Dfvr2MnH9+IpL4hPU84LebLrVfqT8m/h0zLezmUDyilWZTMnd66U55FnR2eZjj3vSv6uXoPBYDAYDAaDwQrEvoj5nIJ1IGuYVSyqSxNz2x3+5x7YkTWAbh5Z5q4s9wbnYlh3ewx/BeIfrL931ibd+vWZ+xkzrlHXlIH4TqzwUWV21x8Jj10HqK/Gt7r2r2djSK/6y57nGe5pvZ33invul/TMQaYznun0SX/zOIbHaLPyd/LKZMzSddd3y8j0uINVHEn35FfncZSD8Dit7tXX50mjPgedK5ej8UDl7JQPcJn0HFHFn+HzyEdj/lqXqvyd8lzGqszq+o68xBtVxhOs7N+dtwRdzNL5L/g67f/oys8zZOc7yas6Z0I5yFKdjcj073xHV36Vl+7XdxmrMqvrO/JmejxBx4+R34pn7Oxf6X/nbBH5+qfLF3nQ/Y7P0v6exeKz8j2vnbOEVZnV9R15Mz2eIBv/lVv0Nl/t+7na/zNdVf1fy+7s7xz0qv9r3l3/r+Z/Xf/Xsqsyq+s78t5q/4COLT6G4Z90fOn4K5dpNf6r3G7/gJ7hq86fZ7pazVl8PPUxTnnFrHxFN/5r+qrM6vqOvPewP/Wu1v96L2ub3Nc+5Dyaz/89jc6RfU6fzeW7GIHOhfmeARn8PuV15Vd5rWSsyqyur9JkehwMBoPBYDAYDCro3Fw/VzjAR6OSy9cfHwHP4gJZu/sezNU6gv3Sz0QVZ6v2Y75nPIsLzPYyK7K4gO7Z1f3/J+tXtRWxNr2ecW7Yn3ueB3Lodecid7g80lRr9M4umR70XKBypJW+buUbT+D779U+VeyPmBN+Y4cjVD+j8Suu65559u97vFH5wiyPLF6dcUYdL1jF+3Y4ui7WqWcT4dczfe3IuOICT1D5f+yPDH5uJeNoVQfeRzQOp+f4KF/7hXNufFd9VGcmeF5j6/STLEbt/YW2x/kVsMPRrbgO8qv0tSvjigs8wcr/Iyt9L+NVdzhCzlJoX8/K7+TRfLszMyEPbZZyXDdVOYxt6t8oe8XRnXCdmb52ZdzlAnfQ6Vv7rPp4r+sOR6jvtcz6v47fXf/fsT9nO/Us527f0r0D2m93OLpdrrPS15X+r8/fYn/3/8ju4z/6x09W6bw9+bha2V/zzsb/HfujI792Zfw/4eh2uc5OX1fG/52zjhWq9b9y3llMgOvabzuOEPmwn84xs2eyOXBWXpVHtX4+mVtf4eh2uE5Pt1P3HRmfFTMYDAaDwWAwGLx/wOfo2u9RuJK3vlvjHu++19jACXZlf09cFGteOADWlI+oA3Y8AetaYnq6r7LbB1wBjuEUGk/scKWOrwViFr5uJH4W8H2svg7Hb+h6lTMY8dGYDW1L4wvoq+N2VcbO/l1eu2m0TroP3uW4Vx1B9rsjtPd4juuUq+kCkeZq38p0xPXsHAtxC42zOgejv89FPdANeiXWhd9x+SlDY/HVWQG1RcXR7aRxmbSuynlSR/0toSt1DCgPS1wP+2isUNMRJ6XcKl7YobK/Xq/sr/Fx2j1tEj15fEvz8vh2xatl/InbXP2YcsiKnTQBtZ/HHz2Om/F7V+q4+t0x0vv7BJ07Pd235fJ4HNrrE3D7O29APvqblMiY6QZUXNSO/SseQ7GTBj0q75nJq3yYv0fwSh1PuEPK5QNXXfmWFXiOMS6zme+1oA85X0Wf0LGp4g29/Vb9ccf+AfV/yuMpdtIo56jjoMqRfc/sv1tH5QTx+R13qJyf7se6Ah3b9ON7LeKDb/S9HNxTHWTXlV/Lnu/O14PK/vgy5dQdO2lUJp93Kt/Od/qHt5mTOgbUBrqnx8dn1622k1P+T6HjB3PM7N5qj93quu8lWo1bfl/Lr2Tp1q63pPGyK52c1vH0ucx3Xdn/NxgMBoPBYDD4u6DrGF3P3Gse2e1JjHWQvitlp0xdqxLvztaC7wFvQV6P57DuOz1HUqGzP5wA6Xbsr7EW1js89xb0eYK3IG8WjyRO7jEb57SIPTrfpVDuVuMVAZ51n6M8tMcgPCar/L/qM0ureRNDqbgYLxf5NJajHHLHKWk9tf4qL3zOjl6QXctRuU7QnTFxjke5CI2ldz7DuXvlleELPEaq9fPzjc7BVv6fcrIyvW7Z3mxv/9iN2KfHfLFttm+btgIn4nFi7K3totOLy+5ynWBlf+zqZWax/xWP6DYKMAeobHqSn3NB3l+yvKsYsO4P0ng3sdbst6Mq7lV9je6tUq4l8xkrvbi/Q64TrPy/21/nCbfan35JXP1R9td+sWt//AZ5qc8jX7f/am8HfkR5VeUPwK5eqvqeYDX/o55wjLoH5Rb7a7nuh2+1PzqkHNXLrv3JQ8cOtbnud9nJB3+u/J/L6z4/00t2z+U6Qbb+831FOrfIzl+rbhwre9H+df/DPeyv87/q3HKgs5v3cc2TvsyzXT4+/8tk0X0YK734/M/lGnxMvIX14uD1MPb/uzH8/mAwGAzuhWz9t4plgLf0rvmOZzqFrte68baKnZ5gV9f3LDPLT+M/q72RAV2XvgVcOftQgfjX7n7NW7Cja0//CPtX+WnsR2MVfsYp4wgdxC08ng53prwu/Y8zccx9lQ/jnn8ndqp18HckVrGSrG4ak9F24fIosnKyusL/uK41ju8yqb2IUztXuIvK/2uMX89L0c+U8604Qi8H3cGdaPnoRc/VoB+XJ4s56nc/f0s70ng68ngb8LoFPJbsfEC2D9tjs8TPva4Vh6f5VvrgeeLGFQe7Y3/3/0Dblo5THnfNOEIHHJXyca7D7v9d+6MXPY/pMgf0bI9C02U2Vn1l9ve5iJ6tq/JS/Si32OnDy+HeCVb+32XK9lpUHKHrhDTd+x/vYX9koq1lMgfekv0rbvFZ9s/mf/hC9Ze6jwKfVHGErlP8f9f/A7v+Dt+U6Tybw+/4f61bJs89/H9m/45bfIb/9w/193Oweu5Q5ykZR+jl6NnBqn17WteFzjOrs5luN8Vq/hdw+1fzv853ZuV09u+4Rb93z/nfW8e91zuD94Wx/2BsPxgMBoPBYDAYDAaDwWAwGAwGg8Fg8PfhEXvR2fv0kcF+E/+s9r2zx9LfaRFgb0z2eYQ+dW+pw99pXHGJ7EvzfH3/CO8A0g/7N57JU3Z1Oc1H9+3xqeyvv2PCviP22ek+tyzPam/wrfJ3e/XVhvoeEIfWG92yh0z7BPk9q21X6OryyDJ1X6T2jaz/ONivluXpn2pvnj+72huya3/ey0T6+N/fsaH2f228hv39dwfUPvTDDuwjrqB9qdvLFtf1t0U6rOxP26FPOzz/rP9znfx5l5vuodR9mwHam75riX1++ozusdV8tU2Shu8nOBlDVBf+rqGsbyuoW1ee+oLM9oy9+IZVmeSp7+9RmfX9cif2973uXOd/rSfnknScVFm4z3f0isx6LkTzpT2o3Fd808l+cT1fob4Aeaq+Tbvc8efZ2QHNx/eWr+THj2v+AXSn72JTPTLm+3yl0rHPebRO2l99T6/uZdf5lOaRvduP9uD98HRM4JxTNp9xYEP/7cxqHGb9tDOWI8vp3LCzP3rVMQv/6e1I7a/+Xfeak+eJ/fVcIu1Xy8zeXeXzrMr+/E87vjInQL7s40B+dEcbzvw6uqv8qud75d11gcr+6jcBbTGLFeiZUV3fUFedH1bnGzL7U66O5Xpdz6V6n9JzH539kcnb1zPQxV125xaR7qrc3Xh30p703Tralz7aeYrBYPCh8Q+IJGqi63e9FgAABHlta0JU+s7K/gB/ojYAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAHic7ZqJbeswEAVdSBpJISkkjaSQFJJGUog/NvhjPGxI2bFk+JoHDHSQ4rHLQyK13yullFJKKaWUUkr91/f39/7r62tKhd+Dsh6XTPsS6V9TVZ/dbjfl8/Nz//r6+nN+y3WnHlXWLVW+f3l5Odhj6/SvrfT/+/v7L0p1rHo/o/9p+8/g/5k+Pj5+2gBzAW2jriuMdsF1hdWR+BXOvVmadcw4s7T6s3VOGdI/pFdQPsoxSnOkildpVv/n/JH9X3VL8EUf/4nPuIgvcpzM+aPCiF/immdLlVdd17Gemc1FWR7yY2zK8yxbpp9UnFkbSLtUvs/g/w62m/n/7e3t8I6IfXim98dMI31BmyC80uKc9kf8nlYdyze8l5Fe930+k2nSnrqyLecc+Oj+n2nm/+w7fZ5MSviw7FjtJsdUylD3M/1U3iOv9N+oHWf/rvBKHx/W+WwOIB5l5P0n7z2K1vg/hc2Yb+nn+W6A7bFh9uvsm/S9fDcYjRX5Ppr9P8eQ9FWWJcs7q+8Sj6Kt/I8v8W32tZ5Ofy/o40mOtdn3ZvNR1oP8envI8TzTZMzpNulkmW75O+iv2sr/pbJRvgOWbft7e/c17ST9wPsEadGmeOYU/2c8xiTyIs1eviU96vyvlFJKKaWeU5fa581072Uv+daU6yCXsGF9G82+a/r31F+19nm1P6w51JrJbM16jdL/fW0jv/NH3/xLayGsm/TzayjLOepH/OMxu7+U3uh6ltcsrVG/Ju5szWlW5r+K/bLc+yNf1jzynPbCM7nOnm0k9145Zw2XezkmsHezJrzbOsuZ64l1j/Vm1pr6ulKF9zrWvUwrbVfH9BmQV16jHqfEeiX3SZe97qUyn6Pul2xvo/7PWhu2Zj++azT2V7zcxy3oI6zzrQk/Vi/sl2Ne/7ch9yEQexl1zLXKtFWm2fMa2bf/E0Gc0f2R/0dlPkd9/j/F/xl/9v6QduKcvRmO+DP/yVgTfmq9+pyXewL4elSn9EG3T17P8sqw0T4T97M/c515j8p8rrbwf99HKZ9QpjwvMdYxfjKW0Z7Xhp9SL8IYN/iPABvTvhBzbfd/H3Nyj/KY//l/IvMo9fvd/7Myn6tj/s+5HTv0fpJ1LfXxKX2Dv4jLPLZV+DG7Zxi25P0652HGcOJi57Q1e534M/coj5WDf2vxIW0nbcqe2cj/ozKf8y7IflvWKX1H3866Yo/RWEXcTK/n1/3Z+8GacMKW6pVh1IO5pPs35/LRNxjP9+dGefUw2kDfi0wbEz/znpW597VLaGm9QD2+9L9SSimllFJKKaWUUkpdTTsRERERERERERERERERERERERERERERERERERERERERERERERERERERERERERERERERERERERERERERERERERERERERERERERERERERERERERERkTvkH4eXjmrZO46cAAABU21rQlT6zsr+AH+lhQAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAeJzt1uFpg2AUhlEHcREHcRAXcRAHcREHsbyBC7emIf+KCeeBQ5tP++tNbM5TkiRJkiRJkiRJkiRJkiRJkiRJH9FxHOe+70/nOcu1d/e/uk/3b13XcxzHc5qmx8/sGP0s99S9dRbLsjxexzAMf76HdO+yY5V9s2F2rc37PbV/1Te//o3uX7bre1Y565/lep19+8bZv7pe0/3Lc77vX//X53l+2j/X7P99Zdt67tfv27b9+sz357/9v6/6Htf3q/dArtV3+5xF1Z8d12uSJEmSJEmSJEn69wYAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAPhAPwr5rLhS2ipmAAAUIW1rQlT6zsr+AH+0FgAAAAEAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAeJztXK266ywTrYzkFpBILBKJRHILyMhYZGRuITIyMjI2MjK3EInkmxmg3ec1lW2/h/Xs89funmcvGGbW/JDjiJd9CKU4Y1Krjqlh2O90x5TSNWzpdJJxCVBKa62UmmLctTbwBb/kMAjJOXwcXjHGWgsvKimYwA/IMcXHl4P3+z1w+Fmlklw4wcx+rGdalhTTfcQ7LZxJCQQBSF+ZsBX+uB6zVeLxYBLfJf6WFknQJ6QZ1Kf5vUMn5LAw5A8chDa8T7j5iz/2dN97TDPSN0PQUuVF0O4cdN5+ZUclO867wh8WgF7GF5G/7D5N7y26rlOhA5MlIxeCTwktv9ehH5xWZ3KccWHHy2f+GnZ4PMjajVFuhs9k89D0CgFOAJwZ4A9/fprfOzDGbI9byDh4gK4zsO1nHIGPNPDjT1Fx/pD9OOfdlzaMbr6QJNr/eCiZiSJ/3H1TDACMCb+df5rfO4DvCgNaARe8AyPwW7yXOTgt9WAkMxMsBPfbOXBBBmCmfZpvOOV4BPyJb9dzkckbeguYMzKoT/N7B2Btw6N7wNZ3chDGL3D4VQ8LMDryCtJ6P0/essxf+3VejkxSLyvQVZX/C3gE4NjAGZCf5vcOQNAPHfIHIxCddyGmVYMh273HmAd/C9No0J+hXWulp/U6yMq12R3yzydA/wOMFfT6p/m9A3g+cO1CdOgKH9xrHa5jQPNfRyClvPejh2+SZYeVsvO4Y6SD4LfnKFC3/981oADw9fEPdm7SEK9ZJ4TQ/aClDHGzCu0e+RjtB/vUP0gL/Nrcg7PT/p5J9pBdZMJk/P8swaf5vQP8jLul8EfabkTVcp2aMa580TjGCny7ckInuSLtJU3qD9unE6wugNbl0/zeAeiBxKWAJdWcNvypl+QYxHRrspoBVy64KJ4N/8nFBr5Rb+AoISBknvQ/vKKArsvwaX7vYJS9nczQezzQc4V7U7jhWcugmOt7QcaNmkdKpmf4t4fkIPu9Ig2kLN9irCnnwHw9fy3nFX5wEOys6zH0IYcx9uTOiAe82WkrC3+tBWQ8/gjTdqXbqFf0K0HgKQLpKHw///VA3wYeQKvxPsDdA5OQtnX2YNuG4jvImE78OedwBvx9pXM/nXp6f1P8X6EOS4e/vt7/LavtGEpVHnq7LmaZIavZL8j7rCpJDhLj8qltKMyJPh0QATQawDM0Zh9J/DERJhfwaX7vMAlUfh2XmAD40Z6X024dt7iABMjeHWU84/9ROMLg+6h+X5FR1kXKSQD+Wj/N7x2E4qB7OkwEAP5Il9VhQANfMh06G2AiolYA6GWFguF1+IujrDKoBkW5zJ/m9w5MUOYH0g+y9c6ktGttccfHe1GwIlJytA5hFac8j2MepGlNQDuDTBDPk0EaKduCydGwX78+/0N+QJ30DyzCkUDTSW2BjI8zY1jLApLwT8hmBCe+xdljWQxTZlErY4oCYEkTcDHC9QP6H7cUi1/4S6jzDmboB5T87l64fEZ2yOc5z5tP6Z3Kjk+yBy/hv+SH5S2QTGMa+Nf7/0qPGOrlWvxwx3P0xizJ07JIPAX523IFwFT++CHwjMUamKiv4WKwTp6B/8D+y+rF4GdWd5yHPW5pD2G9D1gRSAPQ/om8rAmOqSkPLg4Wv+APVhaxnBHRdX7Glz7N7x1k2TLaan+uGPm1P489RUdFcd7BAkguVE3znioIjzr4BPow5+W/gSMC4USAL5l7/D8/ze8dlKy2DX+5Bqb7EfbUxnQnTPuBDvChUpb6h3o1Gkwb4D3SUFRCx3zhIfhDnfon+Gf4QcMeXnBitcZKsA/H7QUzYNeKY33/VQD4y7+kfnD8DRgCfRe60Y67cSPv8fX6L8cyNy8W4v84mtHksp0ZPMRu8G4MFEInMn2jsBogSQD8zfspQ5YlBOI/5T0bDsbzA/k/MZjWEaxYHx6kELoyEDWKj70QWBhHBwBKANXwuDg15rVQNT3AKj9KCFlPBDqC/sG8hjX5ev7KzDMo3hU1n40zJrfgwlWvPGiBVUAEAHIMq9nY+ZnnWbmS51fVC9tNUjjHh+JMLepp9gP7b0JKxzQsDrftOCSVQjvB7HXs82kw9e3Yw0owCq0Gr1cHmbA0NRck66m2n2Mitk6ch9OE4vnr41+405XubQ8a9niZRNa0D3GkdB7xsGDc0lJrCCWxk2aV1pZUqJ5/yXNKQC+QBp5d9pjGf5rfO8wpxRRPONfywTfDsLwFB94e83mDZfRwiAfDsD0EyY6HvMaB4Pnb8gHGjMmq/kt0wOOkIDGa9k/ze4dpA/4pDhjCh50Lil9MuHPYYowebFlYfJVi+ygoulW9XAqE4DL1iz95xdXmZGC/P83vHfYt4gLs7iG3uGOgA/ZCunjecQmaFF717H7FTMkU9s+qV0e+8dUDMlaPdESU2dOn+b3DsZ17HMd4mG07o6QkF3yA2lOayKNzw2Up8/ZziXKyZjp51iEn/sUAsENuvSfzN+vX738AobbIx7iD73fRCZT8EPGEXadMEiMfVcKMsouuUf65CNg/y80BVTMkOBTOZfNYj0/ze4dpn8GihSMZ70ADc0aqT1Q5R5trsqebsfrvdM2F6V1wBzg4pP/pgBB/yJTHr6//7fdAhVvUMBj8cQQEvX3Rca/ZBjSAyaEX0M/XMdcBeZDrPsUjEH+yfxJMn+b3Du5YcCMZ56USgubfZfoybz/uPg32gP5RZQqqjERhzbDjXFbZm92fNa6vcujT/N5BrWkBA64lMCyFdnkWCnvCXFCyQ6NdaP9WP51fqZpxnKB5FVHyGAw4QFW84qf5vYOZzmTQ3ut2gvhHjgJN+yFEzXuBvVtDNvscFwTl9xL9xTMi0grAWcn8fyH/773Zx6LfscBZjr3kmnJfiZOMdKrtAqKWvHzuFUuha9mUy38NAL7ZY0uR/YD+t4r3R55WBJ0vnlksRQDQAV6UvG5dqbpfSkX5gNSSaC0NqtwO1+Ao0UF0P8Af0lQXJzz/whmuyqSnkvWU95IKu1IvJbdVVOuQL5PPKVDpCmRJbPtSUvv++i+XOsRr5ExjBavIel1DH7gBlkcZ+6kuia7Vjrr7pH1yfVTlpqexqKKpOfhpfu8gdT/dB1i5AR9oKH015skNO38SLV0sg8zyALwC9sNK1bQORZXuR+Wvs2z8gflP1a9XnLvOwFnXxtvcvaQklvZYCGrm8cVBWkRGQi0RXkvGz9Zv5Y8fNrmcrhT7/v7fcMcZfs4OK9g2QOKW5zZ6i64fdaAPcJrF4rBBjNMfpV8kuxw1dM19qv5TlT/YP/t+++/joUH7wyln0o3rmGO9nxwcCYhhyq/HCrJ31SKDF9eX3aKoge9ZEyUjyNEBX/00v3dQPu6UxTIu+vU4VjIAPeFgPzb+9HjFKyi9wgHB5ABfqs1eRV3hyv/ZGcASgS5dw6/Xv9peC5YwnRHjdWwHcMVcZ5stlbbVcKYUV+NGzfP+Uz6ENSKOdU8qfT27Qao4RQNfguPIxNfzV2abMKHjcojLPE3XZnDm9whU3JVyiindk/MW6xw5Gc7dcFABcGZ4Ln2+giHpQ43TVDg0+P39T6Unutoh9TlLZ80RB2W1PXw2Z9nfeBsCp31zQAS2NAoDgRGFgSz0FWbNrwXAKyO4QN8f/5X2AbmJYaMtHNcdiPt7AM83YHd/Sek0uo5zY8sX9hybhfJV8swhAQsBslgJGIBlOATwaX7voJTtsYLtFkP7q8MOOzrEa9/iiR2sFfbf5B0uoy+w/16xmuyUYQiOd77wW3CYklqIocMeyKf5vQNwcEBzXDEIouCfVuxbhGG+4r0o6XY4/w69HiwSSFplcVrYcCZLrptvvGG+KCRlRIJR4ih68Qv3P+gAM4USiAY5HmHJ2t+EI93DOG7A3+N+UnoASaITeWZK5TlHW/bfYukAVgiUb4fXflQgpfRpfu9AxPjoQNuhffMunHmQTfs5xW0JJ/o/zlHKY5lMeA8aCCcCyo1Hsn/wB44xazlGBI+dz4dbKKn+NL93yDree8ntpHkHZpvybuseLX+h+O87vCGIfbGODeAZxYOXs2/rRUi8QKZQEgppOZaR15NyyU/ze4dczNYDbK82/NEJHVdsdytIDFI67ht+j+5BWpfmBHtUgl0Z9aYxXwyOEA/JP2LK3NEfWFc131//LOJlxkF1HGjkrE89fwyzWWPa5wvbo/eoZFW8Qt6HyqkPTXnnNahymFJm6iFKTBp+oP6bO5cyeJbruezBrpVzK5jZ4rLSZdDrHGvVE87HfS2qSAGq9eQAUG6AyOd9SIin+gf4F8VmQ87X4ASw9dY49aCPe1lR/YZ17Z/DLXK5r9vWuk8d9X/ORMln22SeqXL+aX7vQDsm8BIY/eQQu8ScAp3iKd4X8F/tQFl/XgC7XfchK93S73mOQuiqf5Uwu8IS6qf5vQPVqYG0nShl7x5q3eGEQ3T3Mz4DAPgPfbVrEL898A9cVnt/jcQ9bwJi8wAv0w76AR7x0/zegeZdsMY3ngb9u1BbBOEr3XjEAxcAkz/naoFL2vnc5bP++Up782HIf2ccW4jTyH+g/5HnumF7zU3HWvY4DtL7aU/5IRCnYDo4Q8EN9tVO20J1D0r+/nY+6uQ3zkJD3vToZ/4L+qcGNuX3fZiWfkabP4+TxkLgaxMMoiPl8qgA3LgudCeQxrv+PBfiVQaQeJeYP+zCf6H+9ZxjkHq+UxzWFK9UEdfRwl4PBu/J06ijC+tCTziQBsfCi+ln/vVQ0PQ7649fmP/+p3MJe79cKd735MELAP+NShkdpjSl4eHGZaZHPwBHJtWzAVArH6UxgHcE0/QL/Y8/G2j8BXL3WI4ZDjbNhS1kz5DbowOksraf5oV6XGXq7TUEnF1fJ4oOFFO6lPiB/a+XtkDG2PM600C1Szmg/e9ZFWhhsKoXDHzXtM75Aoznz+1/WQBlwGRR9t7DD+S/f1QMKFkchusFNr2ku1H6uhL26OkXo1ParUegMU88/ELWOdB6ACD1LVci+hNnir5//7V+0TcOFmCiqr6c7gPcn82Ctvh5Q5UxSw0OOOJu3az8G/lw6/NlGSWnld75NL93qNMd5eFNwxY3SnPkGYfrUKzw5zXEh3SofA1ej+Aslr8iiMIoL/zx0TA/wF/mgVVTElk33qumwZbtnq790WVSIo+4Anyc8BOQ2x/pdHu+5PKag5Ayj9CC6Z8eO+Cf5vcO1YfT9sMCTHGh3RUmwP5rUcZdeL3fZehetFYiTIOV86mfE6FlGSp/FtZfiP/ZvmnAB/jr/kpjUTJ+TJk/TfUzSg5wAegejNSQL8Fn9tcsLEaI3CQiDcz0rvj3139ZbeNbh8fgOGZDVIwHJbR1GM/LHejXuA9GywmfCCHZaHIhHFdG2PMeywSRZFptI3zo0/zeIY9pwE88H05rfLIVSR3lesj+5ger/d0674k2gFWfMZeL/IDj4ZLTWEDAVlE+JhhCt8C7r7d/XvyWucDx63NTZqaY5t2ZdrJ69Qd44ZtS/dBTS0Tx3mInUPW4GsA/ZcEA+tGq04nu6x8AJ4pc9+cGge1epAoOLz3a/k7hkR8NoWpeoxSnWXCj576Yue/Bx3ccFYL0kDKbbE9M9iF6wb+efw7soObm8VTh1A9h8GEnQkMeOHDeCfmcdSNeZchv7nPYkHKOMZRE0MZ0KlXnJ8+jU+PXP/8Eb/vj7X7m7yOcgWPlSrvBefBlVtFluOeII6aCudqnlh7HnGgtQji8NFQAOu9JlVIoN8fKe/31++9NGeTmzi+Jpj1x8plP55D/KplQz2FHxp2hK79T0PXZV2ACay5/2cmhu9T0jCA1B2e/P//drMinWzB9Rluit+pPqvJgOl/v/1Cfn5cR2WlUz0ddKXfUx/6J3BZFxyAPr7nePs3vHcbNZMsWHKRtKWKoNd42F7PJl2f+NQximxv2HwUz0HbrMpyQM+PlYIl9wjoRsbpOLF9//4UP2z6DUUPKF1Ivsca17nuK0TzHmrLuq0k+lveEW2zJmswar5h2k7edv56TJwYvxun79Q8c6etwOP64pUCS5rpiPGj/ZZ33flZJsO3th2Vy2ub2V9idCWdy9GiwcukhL8A2jfv3xz8c8V9ypN/uC84CH49xD2YL1eBrflPO+jANA9hJfsyV1suA2jmY8lQU0tL0nr3W3Xz//CscbhGSgjivwzit4Lf3bdp6dUz5pseTfjEAYIal//qIM73aWgHLfo8elEETAUtaIWv+NL93QP0/bZi3YdgCR7anPqTZ3isl86+HPL0KvWTj9HgzwO60fhpDfjoiXZOAL2fwMt2XA6e2QMzS1JYU033dW1jTOt6Q+8JL+nUEMnlTyJV7ToaehFgfd4fz8xyvApRPYSfky8Eg719R53DI2IS+If2fj3Tu6QKXNh/zaKkp+IRz5k/B1OrF596fqdMwUj1TRvUD85/nfaVVMBC9ElP9ZR/ldN7nGeN13xtYg6ehRlWb23bwefJJWyqYLTnh0+Whd4YuTPOiF4T/+vh/bCmFDvJcwRh8ae/cEDGkI+Ak7H1xguWeh+yPeSgPv8BFmJXMNSLzfPw7mlJOK0P8+vvfDQ0NDQ0NDQ0NDQ0NDQ0NDQ0NDQ0NDQ0NDQ0NDQ0NDQ0NDQ0NDQ0NDQ0NDQ0NDQ0NDQ0NDQ0NDQ0NDQ0NDQ0NDQ0NDQ0NDQ0NDQ0NDQ0NDQ0NDQ0NDQ0NDQ0NDQ0NDQ0NDQ0NDQ0NDQ0NDQ0NDQ0NDQ0NDQ0NDQ0NDQ0NDQ0NDQ0NDQ0NDQ0NDQ0NDQ0NDQ0NDQ0NDQ0NDQ0NDQ0NDQ3/D/gf8m3O5TWMOlcAADIYaVRYdFhNTDpjb20uYWRvYmUueG1wAAAAAAA8P3hwYWNrZXQgYmVnaW49Iu+7vyIgaWQ9Ilc1TTBNcENlaGlIenJlU3pOVGN6a2M5ZCI/Pgo8eDp4bXBtZXRhIHhtbG5zOng9ImFkb2JlOm5zOm1ldGEvIiB4OnhtcHRrPSJBZG9iZSBYTVAgQ29yZSA1LjMtYzAxMSA2Ni4xNDU2NjEsIDIwMTIvMDIvMDYtMTQ6NTY6MjcgICAgICAgICI+CiAgIDxyZGY6UkRGIHhtbG5zOnJkZj0iaHR0cDovL3d3dy53My5vcmcvMTk5OS8wMi8yMi1yZGYtc3ludGF4LW5zIyI+CiAgICAgIDxyZGY6RGVzY3JpcHRpb24gcmRmOmFib3V0PSIiCiAgICAgICAgICAgIHhtbG5zOnhtcD0iaHR0cDovL25zLmFkb2JlLmNvbS94YXAvMS4wLyI+CiAgICAgICAgIDx4bXA6Q3JlYXRvclRvb2w+QWRvYmUgRmlyZXdvcmtzIENTNiAoV2luZG93cyk8L3htcDpDcmVhdG9yVG9vbD4KICAgICAgICAgPHhtcDpDcmVhdGVEYXRlPjIwMjEtMDQtMTBUMTA6MDY6MjZaPC94bXA6Q3JlYXRlRGF0ZT4KICAgICAgICAgPHhtcDpNb2RpZnlEYXRlPjIwMjEtMDQtMTBUMTg6NTc6MzJaPC94bXA6TW9kaWZ5RGF0ZT4KICAgICAgPC9yZGY6RGVzY3JpcHRpb24+CiAgICAgIDxyZGY6RGVzY3JpcHRpb24gcmRmOmFib3V0PSIiCiAgICAgICAgICAgIHhtbG5zOmRjPSJodHRwOi8vcHVybC5vcmcvZGMvZWxlbWVudHMvMS4xLyI+CiAgICAgICAgIDxkYzpmb3JtYXQ+aW1hZ2UvcG5nPC9kYzpmb3JtYXQ+CiAgICAgIDwvcmRmOkRlc2NyaXB0aW9uPgogICA8L3JkZjpSREY+CjwveDp4bXBtZXRhPgogICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgCiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAKICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIAogICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgCiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAKICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIAogICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgCiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAKICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIAogICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgCiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAKICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIAogICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgCiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAKICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIAogICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgCiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAKICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIAogICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgCiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAKICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIAogICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgCiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAKICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIAogICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgCiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAKICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIAogICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgCiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAKICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIAogICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgCiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAKICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIAogICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgCiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAKICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIAogICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgCiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAKICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIAogICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgCiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAKICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIAogICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgCiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAKICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIAogICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgCiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAKICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIAogICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgCiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAKICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIAogICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgCiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAKICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIAogICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgCiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAKICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIAogICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgCiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAKICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIAogICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgCiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAKICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIAogICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgCiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAKICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIAogICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgCiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAKICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIAogICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgCiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAKICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIAogICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgCiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAKICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIAogICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgCiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAKICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIAogICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgCiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAKICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIAogICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgCiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAKICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIAogICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgCiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAKICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIAogICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgCiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAKICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIAogICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgCiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAKICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIAogICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgCiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAKICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIAogICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgCiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAKICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIAogICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgCiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAKICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIAogICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgCiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAKICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIAogICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgCiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAKICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIAogICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgCiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAKICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIAogICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgCiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAKICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIAogICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgCiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAKICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIAogICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgCiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAKICAgICAgICAgICAgICAgICAgICAgICAgICAgIAo8P3hwYWNrZXQgZW5kPSJ3Ij8+Pzr/IQAABDNJREFUWIXF1ktMG0cYB/BxT7bY2fHOeg3G2F4e2UJI7TaOsV3HWCAQ2MYyiFepEY8DUqVKXMqxFw5IkaUq4sAFiR4QqhpCmoSUtFVFUEsjAi1SeqwqxK2lMhXvlMhmvx6yrggBQyjrjDTS7s4cfvP/vtWupq6ubg0APllfX/9ieXkZ0Bseb21ubt5dWlq6ubOzMzwwMHDJ6/Vq3qgIAFBubu43CCGglCZLS0s/GxoaMldUVGgAAGV7IgBA4XDYpdVqZYQQaDQaIISkJEm6MTExQd1ud1Zh/10UFxd/ixAChBAYDIanlNJto9GYlCRpYGVlRZd1UG9vr12r1cpms/knUMbo6Oh3sVhMNhqNm3a7/SNRFFVP66UbURSn8/LyfoMjY3h4eL6rqwtMJtPTaDQqZg3U3d1twRjLs7Oz94+iAACam5vlnJycjfr6+sKsgAAAFRUVfd7X1/f8KGZ8fPy+Xq/fy8/P/5UQ8ndNTU1RVkDxeFxgWVaenJycAYAVAIDV1dVlhmEgEon0AwCYzeZfWJbdrK2tLVYdpKR0g+d5AAAYGxu7gzEGh8Nx83BiBQUFSyzLbgUCgQtFHftwbm6OCIKwQQjZ5Thuz+FwfHy0hArqZ0LIVnV1dYmqIABAwWDwOsZYNplMDzHGmuNACmqRZdntqqqqC0FlXAwGg5V6vV4WBOHLVCrVehLKYrE8YVl22+/3X1IVBAAoFAqlUbfOgNoJBAKSqiAlKT/HcbLBYDgNtYAx3vX7/edGnXljKBS6znGcLAjCZCaU1WpdYFl2t7Ky8m1VQUdQt09BPcYY73m93tdGvfYJwuGwTynfVDKZbDkJZbPZHmOM93w+X5mqIABADQ0N7yuoO6eg5jHGzzwez5lR534bIpGIV0F9dZGoc4MAAEWjUS+lVOZ5/m4mlCiK8wzDPPN4PJdVBSlJeSilssFgyIiy2Ww/Yoz3XS5XRtT/BgEAampqcitJ3Usmk80ZkvqBYZh9t9tdrioIAFBjY2MaNZ0JVVhYOMcwzHOn03lFVRC86KkKSqlMKZ1OJpNNp6FcLtc7qoIAALW0tLgopTLHcQ9OQT1iGOYft9v9EurCQfCip64pqK8zoURRfKTT6bYOo1QBAQBqbW29ppRv5iSUxWJZIITILMvuO53Oy+Xl5RrVQACA2traripJvYIqKSm5RQiB/v5+h81me4Ax/kOSpC5VQQCA2tvbr/I8L3Mc9zD9QZYk6TbDMJBIJBbTwI6ODtlqtf6lOugQKmU2m+csFssipTSVSCSepDEjIyPfE0I2enp6SrMCAgDU2dn5HiFE1ul0MDg4WJLGTE1NjRNCwOVyfQBqNvVxMxaLvSsIwgbG+N7BwcGf8Xh8hmVZKCsr+zS9J6sgpXxXeJ5fYxhmz2AwrPl8vg8Pr2cdBAAoGo3G7Hb77/F4/JU/yn8BGdFegEe55FIAAAAASUVORK5CYII=";

/***/ }),

/***/ "../../node_modules/konva/lib/Animation.js":
/*!*************************************************!*\
  !*** ../../node_modules/konva/lib/Animation.js ***!
  \*************************************************/
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "Animation": () => (/* binding */ Animation)
/* harmony export */ });
/* harmony import */ var _Global_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./Global.js */ "../../node_modules/konva/lib/Global.js");
/* harmony import */ var _Util_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./Util.js */ "../../node_modules/konva/lib/Util.js");


var now = (function () {
    if (_Global_js__WEBPACK_IMPORTED_MODULE_0__.glob.performance && _Global_js__WEBPACK_IMPORTED_MODULE_0__.glob.performance.now) {
        return function () {
            return _Global_js__WEBPACK_IMPORTED_MODULE_0__.glob.performance.now();
        };
    }
    return function () {
        return new Date().getTime();
    };
})();
class Animation {
    constructor(func, layers) {
        this.id = Animation.animIdCounter++;
        this.frame = {
            time: 0,
            timeDiff: 0,
            lastTime: now(),
            frameRate: 0,
        };
        this.func = func;
        this.setLayers(layers);
    }
    setLayers(layers) {
        var lays = [];
        if (!layers) {
            lays = [];
        }
        else if (layers.length > 0) {
            lays = layers;
        }
        else {
            lays = [layers];
        }
        this.layers = lays;
        return this;
    }
    getLayers() {
        return this.layers;
    }
    addLayer(layer) {
        var layers = this.layers, len = layers.length, n;
        for (n = 0; n < len; n++) {
            if (layers[n]._id === layer._id) {
                return false;
            }
        }
        this.layers.push(layer);
        return true;
    }
    isRunning() {
        var a = Animation, animations = a.animations, len = animations.length, n;
        for (n = 0; n < len; n++) {
            if (animations[n].id === this.id) {
                return true;
            }
        }
        return false;
    }
    start() {
        this.stop();
        this.frame.timeDiff = 0;
        this.frame.lastTime = now();
        Animation._addAnimation(this);
        return this;
    }
    stop() {
        Animation._removeAnimation(this);
        return this;
    }
    _updateFrameObject(time) {
        this.frame.timeDiff = time - this.frame.lastTime;
        this.frame.lastTime = time;
        this.frame.time += this.frame.timeDiff;
        this.frame.frameRate = 1000 / this.frame.timeDiff;
    }
    static _addAnimation(anim) {
        this.animations.push(anim);
        this._handleAnimation();
    }
    static _removeAnimation(anim) {
        var id = anim.id, animations = this.animations, len = animations.length, n;
        for (n = 0; n < len; n++) {
            if (animations[n].id === id) {
                this.animations.splice(n, 1);
                break;
            }
        }
    }
    static _runFrames() {
        var layerHash = {}, animations = this.animations, anim, layers, func, n, i, layersLen, layer, key, needRedraw;
        for (n = 0; n < animations.length; n++) {
            anim = animations[n];
            layers = anim.layers;
            func = anim.func;
            anim._updateFrameObject(now());
            layersLen = layers.length;
            if (func) {
                needRedraw = func.call(anim, anim.frame) !== false;
            }
            else {
                needRedraw = true;
            }
            if (!needRedraw) {
                continue;
            }
            for (i = 0; i < layersLen; i++) {
                layer = layers[i];
                if (layer._id !== undefined) {
                    layerHash[layer._id] = layer;
                }
            }
        }
        for (key in layerHash) {
            if (!layerHash.hasOwnProperty(key)) {
                continue;
            }
            layerHash[key].batchDraw();
        }
    }
    static _animationLoop() {
        var Anim = Animation;
        if (Anim.animations.length) {
            Anim._runFrames();
            _Util_js__WEBPACK_IMPORTED_MODULE_1__.Util.requestAnimFrame(Anim._animationLoop);
        }
        else {
            Anim.animRunning = false;
        }
    }
    static _handleAnimation() {
        if (!this.animRunning) {
            this.animRunning = true;
            _Util_js__WEBPACK_IMPORTED_MODULE_1__.Util.requestAnimFrame(this._animationLoop);
        }
    }
}
Animation.animations = [];
Animation.animIdCounter = 0;
Animation.animRunning = false;


/***/ }),

/***/ "../../node_modules/konva/lib/Canvas.js":
/*!**********************************************!*\
  !*** ../../node_modules/konva/lib/Canvas.js ***!
  \**********************************************/
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "Canvas": () => (/* binding */ Canvas),
/* harmony export */   "HitCanvas": () => (/* binding */ HitCanvas),
/* harmony export */   "SceneCanvas": () => (/* binding */ SceneCanvas)
/* harmony export */ });
/* harmony import */ var _Util_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./Util.js */ "../../node_modules/konva/lib/Util.js");
/* harmony import */ var _Context_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./Context.js */ "../../node_modules/konva/lib/Context.js");
/* harmony import */ var _Global_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./Global.js */ "../../node_modules/konva/lib/Global.js");
/* harmony import */ var _Factory_js__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./Factory.js */ "../../node_modules/konva/lib/Factory.js");
/* harmony import */ var _Validators_js__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./Validators.js */ "../../node_modules/konva/lib/Validators.js");





var _pixelRatio;
function getDevicePixelRatio() {
    if (_pixelRatio) {
        return _pixelRatio;
    }
    var canvas = _Util_js__WEBPACK_IMPORTED_MODULE_0__.Util.createCanvasElement();
    var context = canvas.getContext('2d');
    _pixelRatio = (function () {
        var devicePixelRatio = _Global_js__WEBPACK_IMPORTED_MODULE_2__.Konva._global.devicePixelRatio || 1, backingStoreRatio = context.webkitBackingStorePixelRatio ||
            context.mozBackingStorePixelRatio ||
            context.msBackingStorePixelRatio ||
            context.oBackingStorePixelRatio ||
            context.backingStorePixelRatio ||
            1;
        return devicePixelRatio / backingStoreRatio;
    })();
    _Util_js__WEBPACK_IMPORTED_MODULE_0__.Util.releaseCanvas(canvas);
    return _pixelRatio;
}
class Canvas {
    constructor(config) {
        this.pixelRatio = 1;
        this.width = 0;
        this.height = 0;
        this.isCache = false;
        var conf = config || {};
        var pixelRatio = conf.pixelRatio || _Global_js__WEBPACK_IMPORTED_MODULE_2__.Konva.pixelRatio || getDevicePixelRatio();
        this.pixelRatio = pixelRatio;
        this._canvas = _Util_js__WEBPACK_IMPORTED_MODULE_0__.Util.createCanvasElement();
        this._canvas.style.padding = '0';
        this._canvas.style.margin = '0';
        this._canvas.style.border = '0';
        this._canvas.style.background = 'transparent';
        this._canvas.style.position = 'absolute';
        this._canvas.style.top = '0';
        this._canvas.style.left = '0';
    }
    getContext() {
        return this.context;
    }
    getPixelRatio() {
        return this.pixelRatio;
    }
    setPixelRatio(pixelRatio) {
        var previousRatio = this.pixelRatio;
        this.pixelRatio = pixelRatio;
        this.setSize(this.getWidth() / previousRatio, this.getHeight() / previousRatio);
    }
    setWidth(width) {
        this.width = this._canvas.width = width * this.pixelRatio;
        this._canvas.style.width = width + 'px';
        var pixelRatio = this.pixelRatio, _context = this.getContext()._context;
        _context.scale(pixelRatio, pixelRatio);
    }
    setHeight(height) {
        this.height = this._canvas.height = height * this.pixelRatio;
        this._canvas.style.height = height + 'px';
        var pixelRatio = this.pixelRatio, _context = this.getContext()._context;
        _context.scale(pixelRatio, pixelRatio);
    }
    getWidth() {
        return this.width;
    }
    getHeight() {
        return this.height;
    }
    setSize(width, height) {
        this.setWidth(width || 0);
        this.setHeight(height || 0);
    }
    toDataURL(mimeType, quality) {
        try {
            return this._canvas.toDataURL(mimeType, quality);
        }
        catch (e) {
            try {
                return this._canvas.toDataURL();
            }
            catch (err) {
                _Util_js__WEBPACK_IMPORTED_MODULE_0__.Util.error('Unable to get data URL. ' +
                    err.message +
                    ' For more info read https://konvajs.org/docs/posts/Tainted_Canvas.html.');
                return '';
            }
        }
    }
}
_Factory_js__WEBPACK_IMPORTED_MODULE_3__.Factory.addGetterSetter(Canvas, 'pixelRatio', undefined, (0,_Validators_js__WEBPACK_IMPORTED_MODULE_4__.getNumberValidator)());
class SceneCanvas extends Canvas {
    constructor(config = { width: 0, height: 0 }) {
        super(config);
        this.context = new _Context_js__WEBPACK_IMPORTED_MODULE_1__.SceneContext(this);
        this.setSize(config.width, config.height);
    }
}
class HitCanvas extends Canvas {
    constructor(config = { width: 0, height: 0 }) {
        super(config);
        this.hitCanvas = true;
        this.context = new _Context_js__WEBPACK_IMPORTED_MODULE_1__.HitContext(this);
        this.setSize(config.width, config.height);
    }
}


/***/ }),

/***/ "../../node_modules/konva/lib/Container.js":
/*!*************************************************!*\
  !*** ../../node_modules/konva/lib/Container.js ***!
  \*************************************************/
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "Container": () => (/* binding */ Container)
/* harmony export */ });
/* harmony import */ var _Factory_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./Factory.js */ "../../node_modules/konva/lib/Factory.js");
/* harmony import */ var _Node_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./Node.js */ "../../node_modules/konva/lib/Node.js");
/* harmony import */ var _Validators_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./Validators.js */ "../../node_modules/konva/lib/Validators.js");



class Container extends _Node_js__WEBPACK_IMPORTED_MODULE_1__.Node {
    constructor() {
        super(...arguments);
        this.children = [];
    }
    getChildren(filterFunc) {
        if (!filterFunc) {
            return this.children || [];
        }
        const children = this.children || [];
        var results = [];
        children.forEach(function (child) {
            if (filterFunc(child)) {
                results.push(child);
            }
        });
        return results;
    }
    hasChildren() {
        return this.getChildren().length > 0;
    }
    removeChildren() {
        this.getChildren().forEach((child) => {
            child.parent = null;
            child.index = 0;
            child.remove();
        });
        this.children = [];
        this._requestDraw();
        return this;
    }
    destroyChildren() {
        this.getChildren().forEach((child) => {
            child.parent = null;
            child.index = 0;
            child.destroy();
        });
        this.children = [];
        this._requestDraw();
        return this;
    }
    add(...children) {
        if (arguments.length > 1) {
            for (var i = 0; i < arguments.length; i++) {
                this.add(arguments[i]);
            }
            return this;
        }
        var child = children[0];
        if (child.getParent()) {
            child.moveTo(this);
            return this;
        }
        this._validateAdd(child);
        child.index = this.getChildren().length;
        child.parent = this;
        child._clearCaches();
        this.getChildren().push(child);
        this._fire('add', {
            child: child,
        });
        this._requestDraw();
        return this;
    }
    destroy() {
        if (this.hasChildren()) {
            this.destroyChildren();
        }
        super.destroy();
        return this;
    }
    find(selector) {
        return this._generalFind(selector, false);
    }
    findOne(selector) {
        var result = this._generalFind(selector, true);
        return result.length > 0 ? result[0] : undefined;
    }
    _generalFind(selector, findOne) {
        var retArr = [];
        this._descendants((node) => {
            const valid = node._isMatch(selector);
            if (valid) {
                retArr.push(node);
            }
            if (valid && findOne) {
                return true;
            }
            return false;
        });
        return retArr;
    }
    _descendants(fn) {
        let shouldStop = false;
        const children = this.getChildren();
        for (const child of children) {
            shouldStop = fn(child);
            if (shouldStop) {
                return true;
            }
            if (!child.hasChildren()) {
                continue;
            }
            shouldStop = child._descendants(fn);
            if (shouldStop) {
                return true;
            }
        }
        return false;
    }
    toObject() {
        var obj = _Node_js__WEBPACK_IMPORTED_MODULE_1__.Node.prototype.toObject.call(this);
        obj.children = [];
        this.getChildren().forEach((child) => {
            obj.children.push(child.toObject());
        });
        return obj;
    }
    isAncestorOf(node) {
        var parent = node.getParent();
        while (parent) {
            if (parent._id === this._id) {
                return true;
            }
            parent = parent.getParent();
        }
        return false;
    }
    clone(obj) {
        var node = _Node_js__WEBPACK_IMPORTED_MODULE_1__.Node.prototype.clone.call(this, obj);
        this.getChildren().forEach(function (no) {
            node.add(no.clone());
        });
        return node;
    }
    getAllIntersections(pos) {
        var arr = [];
        this.find('Shape').forEach(function (shape) {
            if (shape.isVisible() && shape.intersects(pos)) {
                arr.push(shape);
            }
        });
        return arr;
    }
    _clearSelfAndDescendantCache(attr) {
        var _a;
        super._clearSelfAndDescendantCache(attr);
        if (this.isCached()) {
            return;
        }
        (_a = this.children) === null || _a === void 0 ? void 0 : _a.forEach(function (node) {
            node._clearSelfAndDescendantCache(attr);
        });
    }
    _setChildrenIndices() {
        var _a;
        (_a = this.children) === null || _a === void 0 ? void 0 : _a.forEach(function (child, n) {
            child.index = n;
        });
        this._requestDraw();
    }
    drawScene(can, top) {
        var layer = this.getLayer(), canvas = can || (layer && layer.getCanvas()), context = canvas && canvas.getContext(), cachedCanvas = this._getCanvasCache(), cachedSceneCanvas = cachedCanvas && cachedCanvas.scene;
        var caching = canvas && canvas.isCache;
        if (!this.isVisible() && !caching) {
            return this;
        }
        if (cachedSceneCanvas) {
            context.save();
            var m = this.getAbsoluteTransform(top).getMatrix();
            context.transform(m[0], m[1], m[2], m[3], m[4], m[5]);
            this._drawCachedSceneCanvas(context);
            context.restore();
        }
        else {
            this._drawChildren('drawScene', canvas, top);
        }
        return this;
    }
    drawHit(can, top) {
        if (!this.shouldDrawHit(top)) {
            return this;
        }
        var layer = this.getLayer(), canvas = can || (layer && layer.hitCanvas), context = canvas && canvas.getContext(), cachedCanvas = this._getCanvasCache(), cachedHitCanvas = cachedCanvas && cachedCanvas.hit;
        if (cachedHitCanvas) {
            context.save();
            var m = this.getAbsoluteTransform(top).getMatrix();
            context.transform(m[0], m[1], m[2], m[3], m[4], m[5]);
            this._drawCachedHitCanvas(context);
            context.restore();
        }
        else {
            this._drawChildren('drawHit', canvas, top);
        }
        return this;
    }
    _drawChildren(drawMethod, canvas, top) {
        var _a;
        var context = canvas && canvas.getContext(), clipWidth = this.clipWidth(), clipHeight = this.clipHeight(), clipFunc = this.clipFunc(), hasClip = (clipWidth && clipHeight) || clipFunc;
        const selfCache = top === this;
        if (hasClip) {
            context.save();
            var transform = this.getAbsoluteTransform(top);
            var m = transform.getMatrix();
            context.transform(m[0], m[1], m[2], m[3], m[4], m[5]);
            context.beginPath();
            if (clipFunc) {
                clipFunc.call(this, context, this);
            }
            else {
                var clipX = this.clipX();
                var clipY = this.clipY();
                context.rect(clipX, clipY, clipWidth, clipHeight);
            }
            context.clip();
            m = transform.copy().invert().getMatrix();
            context.transform(m[0], m[1], m[2], m[3], m[4], m[5]);
        }
        var hasComposition = !selfCache &&
            this.globalCompositeOperation() !== 'source-over' &&
            drawMethod === 'drawScene';
        if (hasComposition) {
            context.save();
            context._applyGlobalCompositeOperation(this);
        }
        (_a = this.children) === null || _a === void 0 ? void 0 : _a.forEach(function (child) {
            child[drawMethod](canvas, top);
        });
        if (hasComposition) {
            context.restore();
        }
        if (hasClip) {
            context.restore();
        }
    }
    getClientRect(config) {
        var _a;
        config = config || {};
        var skipTransform = config.skipTransform;
        var relativeTo = config.relativeTo;
        var minX, minY, maxX, maxY;
        var selfRect = {
            x: Infinity,
            y: Infinity,
            width: 0,
            height: 0,
        };
        var that = this;
        (_a = this.children) === null || _a === void 0 ? void 0 : _a.forEach(function (child) {
            if (!child.visible()) {
                return;
            }
            var rect = child.getClientRect({
                relativeTo: that,
                skipShadow: config.skipShadow,
                skipStroke: config.skipStroke,
            });
            if (rect.width === 0 && rect.height === 0) {
                return;
            }
            if (minX === undefined) {
                minX = rect.x;
                minY = rect.y;
                maxX = rect.x + rect.width;
                maxY = rect.y + rect.height;
            }
            else {
                minX = Math.min(minX, rect.x);
                minY = Math.min(minY, rect.y);
                maxX = Math.max(maxX, rect.x + rect.width);
                maxY = Math.max(maxY, rect.y + rect.height);
            }
        });
        var shapes = this.find('Shape');
        var hasVisible = false;
        for (var i = 0; i < shapes.length; i++) {
            var shape = shapes[i];
            if (shape._isVisible(this)) {
                hasVisible = true;
                break;
            }
        }
        if (hasVisible && minX !== undefined) {
            selfRect = {
                x: minX,
                y: minY,
                width: maxX - minX,
                height: maxY - minY,
            };
        }
        else {
            selfRect = {
                x: 0,
                y: 0,
                width: 0,
                height: 0,
            };
        }
        if (!skipTransform) {
            return this._transformedRect(selfRect, relativeTo);
        }
        return selfRect;
    }
}
_Factory_js__WEBPACK_IMPORTED_MODULE_0__.Factory.addComponentsGetterSetter(Container, 'clip', [
    'x',
    'y',
    'width',
    'height',
]);
_Factory_js__WEBPACK_IMPORTED_MODULE_0__.Factory.addGetterSetter(Container, 'clipX', undefined, (0,_Validators_js__WEBPACK_IMPORTED_MODULE_2__.getNumberValidator)());
_Factory_js__WEBPACK_IMPORTED_MODULE_0__.Factory.addGetterSetter(Container, 'clipY', undefined, (0,_Validators_js__WEBPACK_IMPORTED_MODULE_2__.getNumberValidator)());
_Factory_js__WEBPACK_IMPORTED_MODULE_0__.Factory.addGetterSetter(Container, 'clipWidth', undefined, (0,_Validators_js__WEBPACK_IMPORTED_MODULE_2__.getNumberValidator)());
_Factory_js__WEBPACK_IMPORTED_MODULE_0__.Factory.addGetterSetter(Container, 'clipHeight', undefined, (0,_Validators_js__WEBPACK_IMPORTED_MODULE_2__.getNumberValidator)());
_Factory_js__WEBPACK_IMPORTED_MODULE_0__.Factory.addGetterSetter(Container, 'clipFunc');


/***/ }),

/***/ "../../node_modules/konva/lib/Context.js":
/*!***********************************************!*\
  !*** ../../node_modules/konva/lib/Context.js ***!
  \***********************************************/
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "Context": () => (/* binding */ Context),
/* harmony export */   "HitContext": () => (/* binding */ HitContext),
/* harmony export */   "SceneContext": () => (/* binding */ SceneContext)
/* harmony export */ });
/* harmony import */ var _Util_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./Util.js */ "../../node_modules/konva/lib/Util.js");
/* harmony import */ var _Global_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./Global.js */ "../../node_modules/konva/lib/Global.js");


function simplifyArray(arr) {
    var retArr = [], len = arr.length, util = _Util_js__WEBPACK_IMPORTED_MODULE_0__.Util, n, val;
    for (n = 0; n < len; n++) {
        val = arr[n];
        if (util._isNumber(val)) {
            val = Math.round(val * 1000) / 1000;
        }
        else if (!util._isString(val)) {
            val = val + '';
        }
        retArr.push(val);
    }
    return retArr;
}
var COMMA = ',', OPEN_PAREN = '(', CLOSE_PAREN = ')', OPEN_PAREN_BRACKET = '([', CLOSE_BRACKET_PAREN = '])', SEMICOLON = ';', DOUBLE_PAREN = '()', EQUALS = '=', CONTEXT_METHODS = [
    'arc',
    'arcTo',
    'beginPath',
    'bezierCurveTo',
    'clearRect',
    'clip',
    'closePath',
    'createLinearGradient',
    'createPattern',
    'createRadialGradient',
    'drawImage',
    'ellipse',
    'fill',
    'fillText',
    'getImageData',
    'createImageData',
    'lineTo',
    'moveTo',
    'putImageData',
    'quadraticCurveTo',
    'rect',
    'restore',
    'rotate',
    'save',
    'scale',
    'setLineDash',
    'setTransform',
    'stroke',
    'strokeText',
    'transform',
    'translate',
];
var CONTEXT_PROPERTIES = [
    'fillStyle',
    'strokeStyle',
    'shadowColor',
    'shadowBlur',
    'shadowOffsetX',
    'shadowOffsetY',
    'lineCap',
    'lineDashOffset',
    'lineJoin',
    'lineWidth',
    'miterLimit',
    'font',
    'textAlign',
    'textBaseline',
    'globalAlpha',
    'globalCompositeOperation',
    'imageSmoothingEnabled',
];
const traceArrMax = 100;
class Context {
    constructor(canvas) {
        this.canvas = canvas;
        if (_Global_js__WEBPACK_IMPORTED_MODULE_1__.Konva.enableTrace) {
            this.traceArr = [];
            this._enableTrace();
        }
    }
    fillShape(shape) {
        if (shape.fillEnabled()) {
            this._fill(shape);
        }
    }
    _fill(shape) {
    }
    strokeShape(shape) {
        if (shape.hasStroke()) {
            this._stroke(shape);
        }
    }
    _stroke(shape) {
    }
    fillStrokeShape(shape) {
        if (shape.attrs.fillAfterStrokeEnabled) {
            this.strokeShape(shape);
            this.fillShape(shape);
        }
        else {
            this.fillShape(shape);
            this.strokeShape(shape);
        }
    }
    getTrace(relaxed, rounded) {
        var traceArr = this.traceArr, len = traceArr.length, str = '', n, trace, method, args;
        for (n = 0; n < len; n++) {
            trace = traceArr[n];
            method = trace.method;
            if (method) {
                args = trace.args;
                str += method;
                if (relaxed) {
                    str += DOUBLE_PAREN;
                }
                else {
                    if (_Util_js__WEBPACK_IMPORTED_MODULE_0__.Util._isArray(args[0])) {
                        str += OPEN_PAREN_BRACKET + args.join(COMMA) + CLOSE_BRACKET_PAREN;
                    }
                    else {
                        if (rounded) {
                            args = args.map((a) => typeof a === 'number' ? Math.floor(a) : a);
                        }
                        str += OPEN_PAREN + args.join(COMMA) + CLOSE_PAREN;
                    }
                }
            }
            else {
                str += trace.property;
                if (!relaxed) {
                    str += EQUALS + trace.val;
                }
            }
            str += SEMICOLON;
        }
        return str;
    }
    clearTrace() {
        this.traceArr = [];
    }
    _trace(str) {
        var traceArr = this.traceArr, len;
        traceArr.push(str);
        len = traceArr.length;
        if (len >= traceArrMax) {
            traceArr.shift();
        }
    }
    reset() {
        var pixelRatio = this.getCanvas().getPixelRatio();
        this.setTransform(1 * pixelRatio, 0, 0, 1 * pixelRatio, 0, 0);
    }
    getCanvas() {
        return this.canvas;
    }
    clear(bounds) {
        var canvas = this.getCanvas();
        if (bounds) {
            this.clearRect(bounds.x || 0, bounds.y || 0, bounds.width || 0, bounds.height || 0);
        }
        else {
            this.clearRect(0, 0, canvas.getWidth() / canvas.pixelRatio, canvas.getHeight() / canvas.pixelRatio);
        }
    }
    _applyLineCap(shape) {
        var lineCap = shape.getLineCap();
        if (lineCap) {
            this.setAttr('lineCap', lineCap);
        }
    }
    _applyOpacity(shape) {
        var absOpacity = shape.getAbsoluteOpacity();
        if (absOpacity !== 1) {
            this.setAttr('globalAlpha', absOpacity);
        }
    }
    _applyLineJoin(shape) {
        var lineJoin = shape.attrs.lineJoin;
        if (lineJoin) {
            this.setAttr('lineJoin', lineJoin);
        }
    }
    setAttr(attr, val) {
        this._context[attr] = val;
    }
    arc(a0, a1, a2, a3, a4, a5) {
        this._context.arc(a0, a1, a2, a3, a4, a5);
    }
    arcTo(a0, a1, a2, a3, a4) {
        this._context.arcTo(a0, a1, a2, a3, a4);
    }
    beginPath() {
        this._context.beginPath();
    }
    bezierCurveTo(a0, a1, a2, a3, a4, a5) {
        this._context.bezierCurveTo(a0, a1, a2, a3, a4, a5);
    }
    clearRect(a0, a1, a2, a3) {
        this._context.clearRect(a0, a1, a2, a3);
    }
    clip() {
        this._context.clip();
    }
    closePath() {
        this._context.closePath();
    }
    createImageData(a0, a1) {
        var a = arguments;
        if (a.length === 2) {
            return this._context.createImageData(a0, a1);
        }
        else if (a.length === 1) {
            return this._context.createImageData(a0);
        }
    }
    createLinearGradient(a0, a1, a2, a3) {
        return this._context.createLinearGradient(a0, a1, a2, a3);
    }
    createPattern(a0, a1) {
        return this._context.createPattern(a0, a1);
    }
    createRadialGradient(a0, a1, a2, a3, a4, a5) {
        return this._context.createRadialGradient(a0, a1, a2, a3, a4, a5);
    }
    drawImage(a0, a1, a2, a3, a4, a5, a6, a7, a8) {
        var a = arguments, _context = this._context;
        if (a.length === 3) {
            _context.drawImage(a0, a1, a2);
        }
        else if (a.length === 5) {
            _context.drawImage(a0, a1, a2, a3, a4);
        }
        else if (a.length === 9) {
            _context.drawImage(a0, a1, a2, a3, a4, a5, a6, a7, a8);
        }
    }
    ellipse(a0, a1, a2, a3, a4, a5, a6, a7) {
        this._context.ellipse(a0, a1, a2, a3, a4, a5, a6, a7);
    }
    isPointInPath(x, y, path, fillRule) {
        if (path) {
            return this._context.isPointInPath(path, x, y, fillRule);
        }
        return this._context.isPointInPath(x, y, fillRule);
    }
    fill(path2d) {
        if (path2d) {
            this._context.fill(path2d);
        }
        else {
            this._context.fill();
        }
    }
    fillRect(x, y, width, height) {
        this._context.fillRect(x, y, width, height);
    }
    strokeRect(x, y, width, height) {
        this._context.strokeRect(x, y, width, height);
    }
    fillText(text, x, y, maxWidth) {
        if (maxWidth) {
            this._context.fillText(text, x, y, maxWidth);
        }
        else {
            this._context.fillText(text, x, y);
        }
    }
    measureText(text) {
        return this._context.measureText(text);
    }
    getImageData(a0, a1, a2, a3) {
        return this._context.getImageData(a0, a1, a2, a3);
    }
    lineTo(a0, a1) {
        this._context.lineTo(a0, a1);
    }
    moveTo(a0, a1) {
        this._context.moveTo(a0, a1);
    }
    rect(a0, a1, a2, a3) {
        this._context.rect(a0, a1, a2, a3);
    }
    putImageData(a0, a1, a2) {
        this._context.putImageData(a0, a1, a2);
    }
    quadraticCurveTo(a0, a1, a2, a3) {
        this._context.quadraticCurveTo(a0, a1, a2, a3);
    }
    restore() {
        this._context.restore();
    }
    rotate(a0) {
        this._context.rotate(a0);
    }
    save() {
        this._context.save();
    }
    scale(a0, a1) {
        this._context.scale(a0, a1);
    }
    setLineDash(a0) {
        if (this._context.setLineDash) {
            this._context.setLineDash(a0);
        }
        else if ('mozDash' in this._context) {
            this._context['mozDash'] = a0;
        }
        else if ('webkitLineDash' in this._context) {
            this._context['webkitLineDash'] = a0;
        }
    }
    getLineDash() {
        return this._context.getLineDash();
    }
    setTransform(a0, a1, a2, a3, a4, a5) {
        this._context.setTransform(a0, a1, a2, a3, a4, a5);
    }
    stroke(path2d) {
        if (path2d) {
            this._context.stroke(path2d);
        }
        else {
            this._context.stroke();
        }
    }
    strokeText(a0, a1, a2, a3) {
        this._context.strokeText(a0, a1, a2, a3);
    }
    transform(a0, a1, a2, a3, a4, a5) {
        this._context.transform(a0, a1, a2, a3, a4, a5);
    }
    translate(a0, a1) {
        this._context.translate(a0, a1);
    }
    _enableTrace() {
        var that = this, len = CONTEXT_METHODS.length, origSetter = this.setAttr, n, args;
        var func = function (methodName) {
            var origMethod = that[methodName], ret;
            that[methodName] = function () {
                args = simplifyArray(Array.prototype.slice.call(arguments, 0));
                ret = origMethod.apply(that, arguments);
                that._trace({
                    method: methodName,
                    args: args,
                });
                return ret;
            };
        };
        for (n = 0; n < len; n++) {
            func(CONTEXT_METHODS[n]);
        }
        that.setAttr = function () {
            origSetter.apply(that, arguments);
            var prop = arguments[0];
            var val = arguments[1];
            if (prop === 'shadowOffsetX' ||
                prop === 'shadowOffsetY' ||
                prop === 'shadowBlur') {
                val = val / this.canvas.getPixelRatio();
            }
            that._trace({
                property: prop,
                val: val,
            });
        };
    }
    _applyGlobalCompositeOperation(node) {
        const op = node.attrs.globalCompositeOperation;
        var def = !op || op === 'source-over';
        if (!def) {
            this.setAttr('globalCompositeOperation', op);
        }
    }
}
;
CONTEXT_PROPERTIES.forEach(function (prop) {
    Object.defineProperty(Context.prototype, prop, {
        get() {
            return this._context[prop];
        },
        set(val) {
            this._context[prop] = val;
        },
    });
});
class SceneContext extends Context {
    constructor(canvas) {
        super(canvas);
        this._context = canvas._canvas.getContext('2d');
    }
    _fillColor(shape) {
        var fill = shape.fill();
        this.setAttr('fillStyle', fill);
        shape._fillFunc(this);
    }
    _fillPattern(shape) {
        this.setAttr('fillStyle', shape._getFillPattern());
        shape._fillFunc(this);
    }
    _fillLinearGradient(shape) {
        var grd = shape._getLinearGradient();
        if (grd) {
            this.setAttr('fillStyle', grd);
            shape._fillFunc(this);
        }
    }
    _fillRadialGradient(shape) {
        var grd = shape._getRadialGradient();
        if (grd) {
            this.setAttr('fillStyle', grd);
            shape._fillFunc(this);
        }
    }
    _fill(shape) {
        var hasColor = shape.fill(), fillPriority = shape.getFillPriority();
        if (hasColor && fillPriority === 'color') {
            this._fillColor(shape);
            return;
        }
        var hasPattern = shape.getFillPatternImage();
        if (hasPattern && fillPriority === 'pattern') {
            this._fillPattern(shape);
            return;
        }
        var hasLinearGradient = shape.getFillLinearGradientColorStops();
        if (hasLinearGradient && fillPriority === 'linear-gradient') {
            this._fillLinearGradient(shape);
            return;
        }
        var hasRadialGradient = shape.getFillRadialGradientColorStops();
        if (hasRadialGradient && fillPriority === 'radial-gradient') {
            this._fillRadialGradient(shape);
            return;
        }
        if (hasColor) {
            this._fillColor(shape);
        }
        else if (hasPattern) {
            this._fillPattern(shape);
        }
        else if (hasLinearGradient) {
            this._fillLinearGradient(shape);
        }
        else if (hasRadialGradient) {
            this._fillRadialGradient(shape);
        }
    }
    _strokeLinearGradient(shape) {
        var start = shape.getStrokeLinearGradientStartPoint(), end = shape.getStrokeLinearGradientEndPoint(), colorStops = shape.getStrokeLinearGradientColorStops(), grd = this.createLinearGradient(start.x, start.y, end.x, end.y);
        if (colorStops) {
            for (var n = 0; n < colorStops.length; n += 2) {
                grd.addColorStop(colorStops[n], colorStops[n + 1]);
            }
            this.setAttr('strokeStyle', grd);
        }
    }
    _stroke(shape) {
        var dash = shape.dash(), strokeScaleEnabled = shape.getStrokeScaleEnabled();
        if (shape.hasStroke()) {
            if (!strokeScaleEnabled) {
                this.save();
                var pixelRatio = this.getCanvas().getPixelRatio();
                this.setTransform(pixelRatio, 0, 0, pixelRatio, 0, 0);
            }
            this._applyLineCap(shape);
            if (dash && shape.dashEnabled()) {
                this.setLineDash(dash);
                this.setAttr('lineDashOffset', shape.dashOffset());
            }
            this.setAttr('lineWidth', shape.strokeWidth());
            if (!shape.getShadowForStrokeEnabled()) {
                this.setAttr('shadowColor', 'rgba(0,0,0,0)');
            }
            var hasLinearGradient = shape.getStrokeLinearGradientColorStops();
            if (hasLinearGradient) {
                this._strokeLinearGradient(shape);
            }
            else {
                this.setAttr('strokeStyle', shape.stroke());
            }
            shape._strokeFunc(this);
            if (!strokeScaleEnabled) {
                this.restore();
            }
        }
    }
    _applyShadow(shape) {
        var _a, _b, _c;
        var color = (_a = shape.getShadowRGBA()) !== null && _a !== void 0 ? _a : 'black', blur = (_b = shape.getShadowBlur()) !== null && _b !== void 0 ? _b : 5, offset = (_c = shape.getShadowOffset()) !== null && _c !== void 0 ? _c : {
            x: 0,
            y: 0,
        }, scale = shape.getAbsoluteScale(), ratio = this.canvas.getPixelRatio(), scaleX = scale.x * ratio, scaleY = scale.y * ratio;
        this.setAttr('shadowColor', color);
        this.setAttr('shadowBlur', blur * Math.min(Math.abs(scaleX), Math.abs(scaleY)));
        this.setAttr('shadowOffsetX', offset.x * scaleX);
        this.setAttr('shadowOffsetY', offset.y * scaleY);
    }
}
class HitContext extends Context {
    constructor(canvas) {
        super(canvas);
        this._context = canvas._canvas.getContext('2d', {
            willReadFrequently: true,
        });
    }
    _fill(shape) {
        this.save();
        this.setAttr('fillStyle', shape.colorKey);
        shape._fillFuncHit(this);
        this.restore();
    }
    strokeShape(shape) {
        if (shape.hasHitStroke()) {
            this._stroke(shape);
        }
    }
    _stroke(shape) {
        if (shape.hasHitStroke()) {
            var strokeScaleEnabled = shape.getStrokeScaleEnabled();
            if (!strokeScaleEnabled) {
                this.save();
                var pixelRatio = this.getCanvas().getPixelRatio();
                this.setTransform(pixelRatio, 0, 0, pixelRatio, 0, 0);
            }
            this._applyLineCap(shape);
            var hitStrokeWidth = shape.hitStrokeWidth();
            var strokeWidth = hitStrokeWidth === 'auto' ? shape.strokeWidth() : hitStrokeWidth;
            this.setAttr('lineWidth', strokeWidth);
            this.setAttr('strokeStyle', shape.colorKey);
            shape._strokeFuncHit(this);
            if (!strokeScaleEnabled) {
                this.restore();
            }
        }
    }
}


/***/ }),

/***/ "../../node_modules/konva/lib/Core.js":
/*!********************************************!*\
  !*** ../../node_modules/konva/lib/Core.js ***!
  \********************************************/
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "Konva": () => (/* reexport safe */ _CoreInternals_js__WEBPACK_IMPORTED_MODULE_0__.Konva),
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _CoreInternals_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./_CoreInternals.js */ "../../node_modules/konva/lib/_CoreInternals.js");


/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (_CoreInternals_js__WEBPACK_IMPORTED_MODULE_0__.Konva);


/***/ }),

/***/ "../../node_modules/konva/lib/DragAndDrop.js":
/*!***************************************************!*\
  !*** ../../node_modules/konva/lib/DragAndDrop.js ***!
  \***************************************************/
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "DD": () => (/* binding */ DD)
/* harmony export */ });
/* harmony import */ var _Global_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./Global.js */ "../../node_modules/konva/lib/Global.js");
/* harmony import */ var _Util_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./Util.js */ "../../node_modules/konva/lib/Util.js");


const DD = {
    get isDragging() {
        var flag = false;
        DD._dragElements.forEach((elem) => {
            if (elem.dragStatus === 'dragging') {
                flag = true;
            }
        });
        return flag;
    },
    justDragged: false,
    get node() {
        var node;
        DD._dragElements.forEach((elem) => {
            node = elem.node;
        });
        return node;
    },
    _dragElements: new Map(),
    _drag(evt) {
        const nodesToFireEvents = [];
        DD._dragElements.forEach((elem, key) => {
            const { node } = elem;
            const stage = node.getStage();
            stage.setPointersPositions(evt);
            if (elem.pointerId === undefined) {
                elem.pointerId = _Util_js__WEBPACK_IMPORTED_MODULE_1__.Util._getFirstPointerId(evt);
            }
            const pos = stage._changedPointerPositions.find((pos) => pos.id === elem.pointerId);
            if (!pos) {
                return;
            }
            if (elem.dragStatus !== 'dragging') {
                var dragDistance = node.dragDistance();
                var distance = Math.max(Math.abs(pos.x - elem.startPointerPos.x), Math.abs(pos.y - elem.startPointerPos.y));
                if (distance < dragDistance) {
                    return;
                }
                node.startDrag({ evt });
                if (!node.isDragging()) {
                    return;
                }
            }
            node._setDragPosition(evt, elem);
            nodesToFireEvents.push(node);
        });
        nodesToFireEvents.forEach((node) => {
            node.fire('dragmove', {
                type: 'dragmove',
                target: node,
                evt: evt,
            }, true);
        });
    },
    _endDragBefore(evt) {
        const drawNodes = [];
        DD._dragElements.forEach((elem) => {
            const { node } = elem;
            const stage = node.getStage();
            if (evt) {
                stage.setPointersPositions(evt);
            }
            const pos = stage._changedPointerPositions.find((pos) => pos.id === elem.pointerId);
            if (!pos) {
                return;
            }
            if (elem.dragStatus === 'dragging' || elem.dragStatus === 'stopped') {
                DD.justDragged = true;
                _Global_js__WEBPACK_IMPORTED_MODULE_0__.Konva._mouseListenClick = false;
                _Global_js__WEBPACK_IMPORTED_MODULE_0__.Konva._touchListenClick = false;
                _Global_js__WEBPACK_IMPORTED_MODULE_0__.Konva._pointerListenClick = false;
                elem.dragStatus = 'stopped';
            }
            const drawNode = elem.node.getLayer() ||
                (elem.node instanceof _Global_js__WEBPACK_IMPORTED_MODULE_0__.Konva.Stage && elem.node);
            if (drawNode && drawNodes.indexOf(drawNode) === -1) {
                drawNodes.push(drawNode);
            }
        });
        drawNodes.forEach((drawNode) => {
            drawNode.draw();
        });
    },
    _endDragAfter(evt) {
        DD._dragElements.forEach((elem, key) => {
            if (elem.dragStatus === 'stopped') {
                elem.node.fire('dragend', {
                    type: 'dragend',
                    target: elem.node,
                    evt: evt,
                }, true);
            }
            if (elem.dragStatus !== 'dragging') {
                DD._dragElements.delete(key);
            }
        });
    },
};
if (_Global_js__WEBPACK_IMPORTED_MODULE_0__.Konva.isBrowser) {
    window.addEventListener('mouseup', DD._endDragBefore, true);
    window.addEventListener('touchend', DD._endDragBefore, true);
    window.addEventListener('mousemove', DD._drag);
    window.addEventListener('touchmove', DD._drag);
    window.addEventListener('mouseup', DD._endDragAfter, false);
    window.addEventListener('touchend', DD._endDragAfter, false);
}


/***/ }),

/***/ "../../node_modules/konva/lib/Factory.js":
/*!***********************************************!*\
  !*** ../../node_modules/konva/lib/Factory.js ***!
  \***********************************************/
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "Factory": () => (/* binding */ Factory)
/* harmony export */ });
/* harmony import */ var _Util_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./Util.js */ "../../node_modules/konva/lib/Util.js");
/* harmony import */ var _Validators_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./Validators.js */ "../../node_modules/konva/lib/Validators.js");


var GET = 'get', SET = 'set';
const Factory = {
    addGetterSetter(constructor, attr, def, validator, after) {
        Factory.addGetter(constructor, attr, def);
        Factory.addSetter(constructor, attr, validator, after);
        Factory.addOverloadedGetterSetter(constructor, attr);
    },
    addGetter(constructor, attr, def) {
        var method = GET + _Util_js__WEBPACK_IMPORTED_MODULE_0__.Util._capitalize(attr);
        constructor.prototype[method] =
            constructor.prototype[method] ||
                function () {
                    var val = this.attrs[attr];
                    return val === undefined ? def : val;
                };
    },
    addSetter(constructor, attr, validator, after) {
        var method = SET + _Util_js__WEBPACK_IMPORTED_MODULE_0__.Util._capitalize(attr);
        if (!constructor.prototype[method]) {
            Factory.overWriteSetter(constructor, attr, validator, after);
        }
    },
    overWriteSetter(constructor, attr, validator, after) {
        var method = SET + _Util_js__WEBPACK_IMPORTED_MODULE_0__.Util._capitalize(attr);
        constructor.prototype[method] = function (val) {
            if (validator && val !== undefined && val !== null) {
                val = validator.call(this, val, attr);
            }
            this._setAttr(attr, val);
            if (after) {
                after.call(this);
            }
            return this;
        };
    },
    addComponentsGetterSetter(constructor, attr, components, validator, after) {
        var len = components.length, capitalize = _Util_js__WEBPACK_IMPORTED_MODULE_0__.Util._capitalize, getter = GET + capitalize(attr), setter = SET + capitalize(attr), n, component;
        constructor.prototype[getter] = function () {
            var ret = {};
            for (n = 0; n < len; n++) {
                component = components[n];
                ret[component] = this.getAttr(attr + capitalize(component));
            }
            return ret;
        };
        var basicValidator = (0,_Validators_js__WEBPACK_IMPORTED_MODULE_1__.getComponentValidator)(components);
        constructor.prototype[setter] = function (val) {
            var oldVal = this.attrs[attr], key;
            if (validator) {
                val = validator.call(this, val);
            }
            if (basicValidator) {
                basicValidator.call(this, val, attr);
            }
            for (key in val) {
                if (!val.hasOwnProperty(key)) {
                    continue;
                }
                this._setAttr(attr + capitalize(key), val[key]);
            }
            if (!val) {
                components.forEach((component) => {
                    this._setAttr(attr + capitalize(component), undefined);
                });
            }
            this._fireChangeEvent(attr, oldVal, val);
            if (after) {
                after.call(this);
            }
            return this;
        };
        Factory.addOverloadedGetterSetter(constructor, attr);
    },
    addOverloadedGetterSetter(constructor, attr) {
        var capitalizedAttr = _Util_js__WEBPACK_IMPORTED_MODULE_0__.Util._capitalize(attr), setter = SET + capitalizedAttr, getter = GET + capitalizedAttr;
        constructor.prototype[attr] = function () {
            if (arguments.length) {
                this[setter](arguments[0]);
                return this;
            }
            return this[getter]();
        };
    },
    addDeprecatedGetterSetter(constructor, attr, def, validator) {
        _Util_js__WEBPACK_IMPORTED_MODULE_0__.Util.error('Adding deprecated ' + attr);
        var method = GET + _Util_js__WEBPACK_IMPORTED_MODULE_0__.Util._capitalize(attr);
        var message = attr +
            ' property is deprecated and will be removed soon. Look at Konva change log for more information.';
        constructor.prototype[method] = function () {
            _Util_js__WEBPACK_IMPORTED_MODULE_0__.Util.error(message);
            var val = this.attrs[attr];
            return val === undefined ? def : val;
        };
        Factory.addSetter(constructor, attr, validator, function () {
            _Util_js__WEBPACK_IMPORTED_MODULE_0__.Util.error(message);
        });
        Factory.addOverloadedGetterSetter(constructor, attr);
    },
    backCompat(constructor, methods) {
        _Util_js__WEBPACK_IMPORTED_MODULE_0__.Util.each(methods, function (oldMethodName, newMethodName) {
            var method = constructor.prototype[newMethodName];
            var oldGetter = GET + _Util_js__WEBPACK_IMPORTED_MODULE_0__.Util._capitalize(oldMethodName);
            var oldSetter = SET + _Util_js__WEBPACK_IMPORTED_MODULE_0__.Util._capitalize(oldMethodName);
            function deprecated() {
                method.apply(this, arguments);
                _Util_js__WEBPACK_IMPORTED_MODULE_0__.Util.error('"' +
                    oldMethodName +
                    '" method is deprecated and will be removed soon. Use ""' +
                    newMethodName +
                    '" instead.');
            }
            constructor.prototype[oldMethodName] = deprecated;
            constructor.prototype[oldGetter] = deprecated;
            constructor.prototype[oldSetter] = deprecated;
        });
    },
    afterSetFilter() {
        this._filterUpToDate = false;
    },
};


/***/ }),

/***/ "../../node_modules/konva/lib/FastLayer.js":
/*!*************************************************!*\
  !*** ../../node_modules/konva/lib/FastLayer.js ***!
  \*************************************************/
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "FastLayer": () => (/* binding */ FastLayer)
/* harmony export */ });
/* harmony import */ var _Util_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./Util.js */ "../../node_modules/konva/lib/Util.js");
/* harmony import */ var _Layer_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./Layer.js */ "../../node_modules/konva/lib/Layer.js");
/* harmony import */ var _Global_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./Global.js */ "../../node_modules/konva/lib/Global.js");



class FastLayer extends _Layer_js__WEBPACK_IMPORTED_MODULE_1__.Layer {
    constructor(attrs) {
        super(attrs);
        this.listening(false);
        _Util_js__WEBPACK_IMPORTED_MODULE_0__.Util.warn('Konva.Fast layer is deprecated. Please use "new Konva.Layer({ listening: false })" instead.');
    }
}
FastLayer.prototype.nodeType = 'FastLayer';
(0,_Global_js__WEBPACK_IMPORTED_MODULE_2__._registerNode)(FastLayer);


/***/ }),

/***/ "../../node_modules/konva/lib/Global.js":
/*!**********************************************!*\
  !*** ../../node_modules/konva/lib/Global.js ***!
  \**********************************************/
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "Konva": () => (/* binding */ Konva),
/* harmony export */   "_registerNode": () => (/* binding */ _registerNode),
/* harmony export */   "glob": () => (/* binding */ glob)
/* harmony export */ });
var PI_OVER_180 = Math.PI / 180;
function detectBrowser() {
    return (typeof window !== 'undefined' &&
        ({}.toString.call(window) === '[object Window]' ||
            {}.toString.call(window) === '[object global]'));
}
const glob = typeof global !== 'undefined'
    ? global
    : typeof window !== 'undefined'
        ? window
        : typeof WorkerGlobalScope !== 'undefined'
            ? self
            : {};
const Konva = {
    _global: glob,
    version: '8.4.0',
    isBrowser: detectBrowser(),
    isUnminified: /param/.test(function (param) { }.toString()),
    dblClickWindow: 400,
    getAngle(angle) {
        return Konva.angleDeg ? angle * PI_OVER_180 : angle;
    },
    enableTrace: false,
    pointerEventsEnabled: true,
    autoDrawEnabled: true,
    hitOnDragEnabled: false,
    capturePointerEventsEnabled: false,
    _mouseListenClick: false,
    _touchListenClick: false,
    _pointerListenClick: false,
    _mouseInDblClickWindow: false,
    _touchInDblClickWindow: false,
    _pointerInDblClickWindow: false,
    _mouseDblClickPointerId: null,
    _touchDblClickPointerId: null,
    _pointerDblClickPointerId: null,
    pixelRatio: (typeof window !== 'undefined' && window.devicePixelRatio) || 1,
    dragDistance: 3,
    angleDeg: true,
    showWarnings: true,
    dragButtons: [0, 1],
    isDragging() {
        return Konva['DD'].isDragging;
    },
    isDragReady() {
        return !!Konva['DD'].node;
    },
    releaseCanvasOnDestroy: true,
    document: glob.document,
    _injectGlobal(Konva) {
        glob.Konva = Konva;
    },
};
const _registerNode = (NodeClass) => {
    Konva[NodeClass.prototype.getClassName()] = NodeClass;
};
Konva._injectGlobal(Konva);


/***/ }),

/***/ "../../node_modules/konva/lib/Group.js":
/*!*********************************************!*\
  !*** ../../node_modules/konva/lib/Group.js ***!
  \*********************************************/
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "Group": () => (/* binding */ Group)
/* harmony export */ });
/* harmony import */ var _Util_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./Util.js */ "../../node_modules/konva/lib/Util.js");
/* harmony import */ var _Container_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./Container.js */ "../../node_modules/konva/lib/Container.js");
/* harmony import */ var _Global_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./Global.js */ "../../node_modules/konva/lib/Global.js");



class Group extends _Container_js__WEBPACK_IMPORTED_MODULE_1__.Container {
    _validateAdd(child) {
        var type = child.getType();
        if (type !== 'Group' && type !== 'Shape') {
            _Util_js__WEBPACK_IMPORTED_MODULE_0__.Util["throw"]('You may only add groups and shapes to groups.');
        }
    }
}
Group.prototype.nodeType = 'Group';
(0,_Global_js__WEBPACK_IMPORTED_MODULE_2__._registerNode)(Group);


/***/ }),

/***/ "../../node_modules/konva/lib/Layer.js":
/*!*********************************************!*\
  !*** ../../node_modules/konva/lib/Layer.js ***!
  \*********************************************/
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "Layer": () => (/* binding */ Layer)
/* harmony export */ });
/* harmony import */ var _Util_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./Util.js */ "../../node_modules/konva/lib/Util.js");
/* harmony import */ var _Container_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./Container.js */ "../../node_modules/konva/lib/Container.js");
/* harmony import */ var _Node_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./Node.js */ "../../node_modules/konva/lib/Node.js");
/* harmony import */ var _Factory_js__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./Factory.js */ "../../node_modules/konva/lib/Factory.js");
/* harmony import */ var _Canvas_js__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./Canvas.js */ "../../node_modules/konva/lib/Canvas.js");
/* harmony import */ var _Validators_js__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ./Validators.js */ "../../node_modules/konva/lib/Validators.js");
/* harmony import */ var _Shape_js__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ./Shape.js */ "../../node_modules/konva/lib/Shape.js");
/* harmony import */ var _Global_js__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! ./Global.js */ "../../node_modules/konva/lib/Global.js");








var HASH = '#', BEFORE_DRAW = 'beforeDraw', DRAW = 'draw', INTERSECTION_OFFSETS = [
    { x: 0, y: 0 },
    { x: -1, y: -1 },
    { x: 1, y: -1 },
    { x: 1, y: 1 },
    { x: -1, y: 1 },
], INTERSECTION_OFFSETS_LEN = INTERSECTION_OFFSETS.length;
class Layer extends _Container_js__WEBPACK_IMPORTED_MODULE_1__.Container {
    constructor(config) {
        super(config);
        this.canvas = new _Canvas_js__WEBPACK_IMPORTED_MODULE_4__.SceneCanvas();
        this.hitCanvas = new _Canvas_js__WEBPACK_IMPORTED_MODULE_4__.HitCanvas({
            pixelRatio: 1,
        });
        this._waitingForDraw = false;
        this.on('visibleChange.konva', this._checkVisibility);
        this._checkVisibility();
        this.on('imageSmoothingEnabledChange.konva', this._setSmoothEnabled);
        this._setSmoothEnabled();
    }
    createPNGStream() {
        const c = this.canvas._canvas;
        return c.createPNGStream();
    }
    getCanvas() {
        return this.canvas;
    }
    getNativeCanvasElement() {
        return this.canvas._canvas;
    }
    getHitCanvas() {
        return this.hitCanvas;
    }
    getContext() {
        return this.getCanvas().getContext();
    }
    clear(bounds) {
        this.getContext().clear(bounds);
        this.getHitCanvas().getContext().clear(bounds);
        return this;
    }
    setZIndex(index) {
        super.setZIndex(index);
        var stage = this.getStage();
        if (stage && stage.content) {
            stage.content.removeChild(this.getNativeCanvasElement());
            if (index < stage.children.length - 1) {
                stage.content.insertBefore(this.getNativeCanvasElement(), stage.children[index + 1].getCanvas()._canvas);
            }
            else {
                stage.content.appendChild(this.getNativeCanvasElement());
            }
        }
        return this;
    }
    moveToTop() {
        _Node_js__WEBPACK_IMPORTED_MODULE_2__.Node.prototype.moveToTop.call(this);
        var stage = this.getStage();
        if (stage && stage.content) {
            stage.content.removeChild(this.getNativeCanvasElement());
            stage.content.appendChild(this.getNativeCanvasElement());
        }
        return true;
    }
    moveUp() {
        var moved = _Node_js__WEBPACK_IMPORTED_MODULE_2__.Node.prototype.moveUp.call(this);
        if (!moved) {
            return false;
        }
        var stage = this.getStage();
        if (!stage || !stage.content) {
            return false;
        }
        stage.content.removeChild(this.getNativeCanvasElement());
        if (this.index < stage.children.length - 1) {
            stage.content.insertBefore(this.getNativeCanvasElement(), stage.children[this.index + 1].getCanvas()._canvas);
        }
        else {
            stage.content.appendChild(this.getNativeCanvasElement());
        }
        return true;
    }
    moveDown() {
        if (_Node_js__WEBPACK_IMPORTED_MODULE_2__.Node.prototype.moveDown.call(this)) {
            var stage = this.getStage();
            if (stage) {
                var children = stage.children;
                if (stage.content) {
                    stage.content.removeChild(this.getNativeCanvasElement());
                    stage.content.insertBefore(this.getNativeCanvasElement(), children[this.index + 1].getCanvas()._canvas);
                }
            }
            return true;
        }
        return false;
    }
    moveToBottom() {
        if (_Node_js__WEBPACK_IMPORTED_MODULE_2__.Node.prototype.moveToBottom.call(this)) {
            var stage = this.getStage();
            if (stage) {
                var children = stage.children;
                if (stage.content) {
                    stage.content.removeChild(this.getNativeCanvasElement());
                    stage.content.insertBefore(this.getNativeCanvasElement(), children[1].getCanvas()._canvas);
                }
            }
            return true;
        }
        return false;
    }
    getLayer() {
        return this;
    }
    remove() {
        var _canvas = this.getNativeCanvasElement();
        _Node_js__WEBPACK_IMPORTED_MODULE_2__.Node.prototype.remove.call(this);
        if (_canvas && _canvas.parentNode && _Util_js__WEBPACK_IMPORTED_MODULE_0__.Util._isInDocument(_canvas)) {
            _canvas.parentNode.removeChild(_canvas);
        }
        return this;
    }
    getStage() {
        return this.parent;
    }
    setSize({ width, height }) {
        this.canvas.setSize(width, height);
        this.hitCanvas.setSize(width, height);
        this._setSmoothEnabled();
        return this;
    }
    _validateAdd(child) {
        var type = child.getType();
        if (type !== 'Group' && type !== 'Shape') {
            _Util_js__WEBPACK_IMPORTED_MODULE_0__.Util["throw"]('You may only add groups and shapes to a layer.');
        }
    }
    _toKonvaCanvas(config) {
        config = config || {};
        config.width = config.width || this.getWidth();
        config.height = config.height || this.getHeight();
        config.x = config.x !== undefined ? config.x : this.x();
        config.y = config.y !== undefined ? config.y : this.y();
        return _Node_js__WEBPACK_IMPORTED_MODULE_2__.Node.prototype._toKonvaCanvas.call(this, config);
    }
    _checkVisibility() {
        const visible = this.visible();
        if (visible) {
            this.canvas._canvas.style.display = 'block';
        }
        else {
            this.canvas._canvas.style.display = 'none';
        }
    }
    _setSmoothEnabled() {
        this.getContext()._context.imageSmoothingEnabled =
            this.imageSmoothingEnabled();
    }
    getWidth() {
        if (this.parent) {
            return this.parent.width();
        }
    }
    setWidth() {
        _Util_js__WEBPACK_IMPORTED_MODULE_0__.Util.warn('Can not change width of layer. Use "stage.width(value)" function instead.');
    }
    getHeight() {
        if (this.parent) {
            return this.parent.height();
        }
    }
    setHeight() {
        _Util_js__WEBPACK_IMPORTED_MODULE_0__.Util.warn('Can not change height of layer. Use "stage.height(value)" function instead.');
    }
    batchDraw() {
        if (!this._waitingForDraw) {
            this._waitingForDraw = true;
            _Util_js__WEBPACK_IMPORTED_MODULE_0__.Util.requestAnimFrame(() => {
                this.draw();
                this._waitingForDraw = false;
            });
        }
        return this;
    }
    getIntersection(pos) {
        if (!this.isListening() || !this.isVisible()) {
            return null;
        }
        var spiralSearchDistance = 1;
        var continueSearch = false;
        while (true) {
            for (let i = 0; i < INTERSECTION_OFFSETS_LEN; i++) {
                const intersectionOffset = INTERSECTION_OFFSETS[i];
                const obj = this._getIntersection({
                    x: pos.x + intersectionOffset.x * spiralSearchDistance,
                    y: pos.y + intersectionOffset.y * spiralSearchDistance,
                });
                const shape = obj.shape;
                if (shape) {
                    return shape;
                }
                continueSearch = !!obj.antialiased;
                if (!obj.antialiased) {
                    break;
                }
            }
            if (continueSearch) {
                spiralSearchDistance += 1;
            }
            else {
                return null;
            }
        }
    }
    _getIntersection(pos) {
        const ratio = this.hitCanvas.pixelRatio;
        const p = this.hitCanvas.context.getImageData(Math.round(pos.x * ratio), Math.round(pos.y * ratio), 1, 1).data;
        const p3 = p[3];
        if (p3 === 255) {
            const colorKey = _Util_js__WEBPACK_IMPORTED_MODULE_0__.Util._rgbToHex(p[0], p[1], p[2]);
            const shape = _Shape_js__WEBPACK_IMPORTED_MODULE_6__.shapes[HASH + colorKey];
            if (shape) {
                return {
                    shape: shape,
                };
            }
            return {
                antialiased: true,
            };
        }
        else if (p3 > 0) {
            return {
                antialiased: true,
            };
        }
        return {};
    }
    drawScene(can, top) {
        var layer = this.getLayer(), canvas = can || (layer && layer.getCanvas());
        this._fire(BEFORE_DRAW, {
            node: this,
        });
        if (this.clearBeforeDraw()) {
            canvas.getContext().clear();
        }
        _Container_js__WEBPACK_IMPORTED_MODULE_1__.Container.prototype.drawScene.call(this, canvas, top);
        this._fire(DRAW, {
            node: this,
        });
        return this;
    }
    drawHit(can, top) {
        var layer = this.getLayer(), canvas = can || (layer && layer.hitCanvas);
        if (layer && layer.clearBeforeDraw()) {
            layer.getHitCanvas().getContext().clear();
        }
        _Container_js__WEBPACK_IMPORTED_MODULE_1__.Container.prototype.drawHit.call(this, canvas, top);
        return this;
    }
    enableHitGraph() {
        this.hitGraphEnabled(true);
        return this;
    }
    disableHitGraph() {
        this.hitGraphEnabled(false);
        return this;
    }
    setHitGraphEnabled(val) {
        _Util_js__WEBPACK_IMPORTED_MODULE_0__.Util.warn('hitGraphEnabled method is deprecated. Please use layer.listening() instead.');
        this.listening(val);
    }
    getHitGraphEnabled(val) {
        _Util_js__WEBPACK_IMPORTED_MODULE_0__.Util.warn('hitGraphEnabled method is deprecated. Please use layer.listening() instead.');
        return this.listening();
    }
    toggleHitCanvas() {
        if (!this.parent || !this.parent['content']) {
            return;
        }
        var parent = this.parent;
        var added = !!this.hitCanvas._canvas.parentNode;
        if (added) {
            parent.content.removeChild(this.hitCanvas._canvas);
        }
        else {
            parent.content.appendChild(this.hitCanvas._canvas);
        }
    }
    destroy() {
        _Util_js__WEBPACK_IMPORTED_MODULE_0__.Util.releaseCanvas(this.getNativeCanvasElement(), this.getHitCanvas()._canvas);
        return super.destroy();
    }
}
Layer.prototype.nodeType = 'Layer';
(0,_Global_js__WEBPACK_IMPORTED_MODULE_7__._registerNode)(Layer);
_Factory_js__WEBPACK_IMPORTED_MODULE_3__.Factory.addGetterSetter(Layer, 'imageSmoothingEnabled', true);
_Factory_js__WEBPACK_IMPORTED_MODULE_3__.Factory.addGetterSetter(Layer, 'clearBeforeDraw', true);
_Factory_js__WEBPACK_IMPORTED_MODULE_3__.Factory.addGetterSetter(Layer, 'hitGraphEnabled', true, (0,_Validators_js__WEBPACK_IMPORTED_MODULE_5__.getBooleanValidator)());


/***/ }),

/***/ "../../node_modules/konva/lib/Node.js":
/*!********************************************!*\
  !*** ../../node_modules/konva/lib/Node.js ***!
  \********************************************/
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "Node": () => (/* binding */ Node)
/* harmony export */ });
/* harmony import */ var _Util_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./Util.js */ "../../node_modules/konva/lib/Util.js");
/* harmony import */ var _Factory_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./Factory.js */ "../../node_modules/konva/lib/Factory.js");
/* harmony import */ var _Canvas_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./Canvas.js */ "../../node_modules/konva/lib/Canvas.js");
/* harmony import */ var _Global_js__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./Global.js */ "../../node_modules/konva/lib/Global.js");
/* harmony import */ var _DragAndDrop_js__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./DragAndDrop.js */ "../../node_modules/konva/lib/DragAndDrop.js");
/* harmony import */ var _Validators_js__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ./Validators.js */ "../../node_modules/konva/lib/Validators.js");






var ABSOLUTE_OPACITY = 'absoluteOpacity', ALL_LISTENERS = 'allEventListeners', ABSOLUTE_TRANSFORM = 'absoluteTransform', ABSOLUTE_SCALE = 'absoluteScale', CANVAS = 'canvas', CHANGE = 'Change', CHILDREN = 'children', KONVA = 'konva', LISTENING = 'listening', MOUSEENTER = 'mouseenter', MOUSELEAVE = 'mouseleave', NAME = 'name', SET = 'set', SHAPE = 'Shape', SPACE = ' ', STAGE = 'stage', TRANSFORM = 'transform', UPPER_STAGE = 'Stage', VISIBLE = 'visible', TRANSFORM_CHANGE_STR = [
    'xChange.konva',
    'yChange.konva',
    'scaleXChange.konva',
    'scaleYChange.konva',
    'skewXChange.konva',
    'skewYChange.konva',
    'rotationChange.konva',
    'offsetXChange.konva',
    'offsetYChange.konva',
    'transformsEnabledChange.konva',
].join(SPACE);
let idCounter = 1;
class Node {
    constructor(config) {
        this._id = idCounter++;
        this.eventListeners = {};
        this.attrs = {};
        this.index = 0;
        this._allEventListeners = null;
        this.parent = null;
        this._cache = new Map();
        this._attachedDepsListeners = new Map();
        this._lastPos = null;
        this._batchingTransformChange = false;
        this._needClearTransformCache = false;
        this._filterUpToDate = false;
        this._isUnderCache = false;
        this._dragEventId = null;
        this._shouldFireChangeEvents = false;
        this.setAttrs(config);
        this._shouldFireChangeEvents = true;
    }
    hasChildren() {
        return false;
    }
    _clearCache(attr) {
        if ((attr === TRANSFORM || attr === ABSOLUTE_TRANSFORM) &&
            this._cache.get(attr)) {
            this._cache.get(attr).dirty = true;
        }
        else if (attr) {
            this._cache.delete(attr);
        }
        else {
            this._cache.clear();
        }
    }
    _getCache(attr, privateGetter) {
        var cache = this._cache.get(attr);
        var isTransform = attr === TRANSFORM || attr === ABSOLUTE_TRANSFORM;
        var invalid = cache === undefined || (isTransform && cache.dirty === true);
        if (invalid) {
            cache = privateGetter.call(this);
            this._cache.set(attr, cache);
        }
        return cache;
    }
    _calculate(name, deps, getter) {
        if (!this._attachedDepsListeners.get(name)) {
            const depsString = deps.map((dep) => dep + 'Change.konva').join(SPACE);
            this.on(depsString, () => {
                this._clearCache(name);
            });
            this._attachedDepsListeners.set(name, true);
        }
        return this._getCache(name, getter);
    }
    _getCanvasCache() {
        return this._cache.get(CANVAS);
    }
    _clearSelfAndDescendantCache(attr) {
        this._clearCache(attr);
        if (attr === ABSOLUTE_TRANSFORM) {
            this.fire('absoluteTransformChange');
        }
    }
    clearCache() {
        if (this._cache.has(CANVAS)) {
            const { scene, filter, hit } = this._cache.get(CANVAS);
            _Util_js__WEBPACK_IMPORTED_MODULE_0__.Util.releaseCanvas(scene, filter, hit);
            this._cache.delete(CANVAS);
        }
        this._clearSelfAndDescendantCache();
        this._requestDraw();
        return this;
    }
    cache(config) {
        var conf = config || {};
        var rect = {};
        if (conf.x === undefined ||
            conf.y === undefined ||
            conf.width === undefined ||
            conf.height === undefined) {
            rect = this.getClientRect({
                skipTransform: true,
                relativeTo: this.getParent(),
            });
        }
        var width = Math.ceil(conf.width || rect.width), height = Math.ceil(conf.height || rect.height), pixelRatio = conf.pixelRatio, x = conf.x === undefined ? Math.floor(rect.x) : conf.x, y = conf.y === undefined ? Math.floor(rect.y) : conf.y, offset = conf.offset || 0, drawBorder = conf.drawBorder || false, hitCanvasPixelRatio = conf.hitCanvasPixelRatio || 1;
        if (!width || !height) {
            _Util_js__WEBPACK_IMPORTED_MODULE_0__.Util.error('Can not cache the node. Width or height of the node equals 0. Caching is skipped.');
            return;
        }
        width += offset * 2 + 1;
        height += offset * 2 + 1;
        x -= offset;
        y -= offset;
        var cachedSceneCanvas = new _Canvas_js__WEBPACK_IMPORTED_MODULE_2__.SceneCanvas({
            pixelRatio: pixelRatio,
            width: width,
            height: height,
        }), cachedFilterCanvas = new _Canvas_js__WEBPACK_IMPORTED_MODULE_2__.SceneCanvas({
            pixelRatio: pixelRatio,
            width: 0,
            height: 0,
        }), cachedHitCanvas = new _Canvas_js__WEBPACK_IMPORTED_MODULE_2__.HitCanvas({
            pixelRatio: hitCanvasPixelRatio,
            width: width,
            height: height,
        }), sceneContext = cachedSceneCanvas.getContext(), hitContext = cachedHitCanvas.getContext();
        cachedHitCanvas.isCache = true;
        cachedSceneCanvas.isCache = true;
        this._cache.delete(CANVAS);
        this._filterUpToDate = false;
        if (conf.imageSmoothingEnabled === false) {
            cachedSceneCanvas.getContext()._context.imageSmoothingEnabled = false;
            cachedFilterCanvas.getContext()._context.imageSmoothingEnabled = false;
        }
        sceneContext.save();
        hitContext.save();
        sceneContext.translate(-x, -y);
        hitContext.translate(-x, -y);
        this._isUnderCache = true;
        this._clearSelfAndDescendantCache(ABSOLUTE_OPACITY);
        this._clearSelfAndDescendantCache(ABSOLUTE_SCALE);
        this.drawScene(cachedSceneCanvas, this);
        this.drawHit(cachedHitCanvas, this);
        this._isUnderCache = false;
        sceneContext.restore();
        hitContext.restore();
        if (drawBorder) {
            sceneContext.save();
            sceneContext.beginPath();
            sceneContext.rect(0, 0, width, height);
            sceneContext.closePath();
            sceneContext.setAttr('strokeStyle', 'red');
            sceneContext.setAttr('lineWidth', 5);
            sceneContext.stroke();
            sceneContext.restore();
        }
        this._cache.set(CANVAS, {
            scene: cachedSceneCanvas,
            filter: cachedFilterCanvas,
            hit: cachedHitCanvas,
            x: x,
            y: y,
        });
        this._requestDraw();
        return this;
    }
    isCached() {
        return this._cache.has(CANVAS);
    }
    getClientRect(config) {
        throw new Error('abstract "getClientRect" method call');
    }
    _transformedRect(rect, top) {
        var points = [
            { x: rect.x, y: rect.y },
            { x: rect.x + rect.width, y: rect.y },
            { x: rect.x + rect.width, y: rect.y + rect.height },
            { x: rect.x, y: rect.y + rect.height },
        ];
        var minX, minY, maxX, maxY;
        var trans = this.getAbsoluteTransform(top);
        points.forEach(function (point) {
            var transformed = trans.point(point);
            if (minX === undefined) {
                minX = maxX = transformed.x;
                minY = maxY = transformed.y;
            }
            minX = Math.min(minX, transformed.x);
            minY = Math.min(minY, transformed.y);
            maxX = Math.max(maxX, transformed.x);
            maxY = Math.max(maxY, transformed.y);
        });
        return {
            x: minX,
            y: minY,
            width: maxX - minX,
            height: maxY - minY,
        };
    }
    _drawCachedSceneCanvas(context) {
        context.save();
        context._applyOpacity(this);
        context._applyGlobalCompositeOperation(this);
        const canvasCache = this._getCanvasCache();
        context.translate(canvasCache.x, canvasCache.y);
        var cacheCanvas = this._getCachedSceneCanvas();
        var ratio = cacheCanvas.pixelRatio;
        context.drawImage(cacheCanvas._canvas, 0, 0, cacheCanvas.width / ratio, cacheCanvas.height / ratio);
        context.restore();
    }
    _drawCachedHitCanvas(context) {
        var canvasCache = this._getCanvasCache(), hitCanvas = canvasCache.hit;
        context.save();
        context.translate(canvasCache.x, canvasCache.y);
        context.drawImage(hitCanvas._canvas, 0, 0, hitCanvas.width / hitCanvas.pixelRatio, hitCanvas.height / hitCanvas.pixelRatio);
        context.restore();
    }
    _getCachedSceneCanvas() {
        var filters = this.filters(), cachedCanvas = this._getCanvasCache(), sceneCanvas = cachedCanvas.scene, filterCanvas = cachedCanvas.filter, filterContext = filterCanvas.getContext(), len, imageData, n, filter;
        if (filters) {
            if (!this._filterUpToDate) {
                var ratio = sceneCanvas.pixelRatio;
                filterCanvas.setSize(sceneCanvas.width / sceneCanvas.pixelRatio, sceneCanvas.height / sceneCanvas.pixelRatio);
                try {
                    len = filters.length;
                    filterContext.clear();
                    filterContext.drawImage(sceneCanvas._canvas, 0, 0, sceneCanvas.getWidth() / ratio, sceneCanvas.getHeight() / ratio);
                    imageData = filterContext.getImageData(0, 0, filterCanvas.getWidth(), filterCanvas.getHeight());
                    for (n = 0; n < len; n++) {
                        filter = filters[n];
                        if (typeof filter !== 'function') {
                            _Util_js__WEBPACK_IMPORTED_MODULE_0__.Util.error('Filter should be type of function, but got ' +
                                typeof filter +
                                ' instead. Please check correct filters');
                            continue;
                        }
                        filter.call(this, imageData);
                        filterContext.putImageData(imageData, 0, 0);
                    }
                }
                catch (e) {
                    _Util_js__WEBPACK_IMPORTED_MODULE_0__.Util.error('Unable to apply filter. ' +
                        e.message +
                        ' This post my help you https://konvajs.org/docs/posts/Tainted_Canvas.html.');
                }
                this._filterUpToDate = true;
            }
            return filterCanvas;
        }
        return sceneCanvas;
    }
    on(evtStr, handler) {
        this._cache && this._cache.delete(ALL_LISTENERS);
        if (arguments.length === 3) {
            return this._delegate.apply(this, arguments);
        }
        var events = evtStr.split(SPACE), len = events.length, n, event, parts, baseEvent, name;
        for (n = 0; n < len; n++) {
            event = events[n];
            parts = event.split('.');
            baseEvent = parts[0];
            name = parts[1] || '';
            if (!this.eventListeners[baseEvent]) {
                this.eventListeners[baseEvent] = [];
            }
            this.eventListeners[baseEvent].push({
                name: name,
                handler: handler,
            });
        }
        return this;
    }
    off(evtStr, callback) {
        var events = (evtStr || '').split(SPACE), len = events.length, n, t, event, parts, baseEvent, name;
        this._cache && this._cache.delete(ALL_LISTENERS);
        if (!evtStr) {
            for (t in this.eventListeners) {
                this._off(t);
            }
        }
        for (n = 0; n < len; n++) {
            event = events[n];
            parts = event.split('.');
            baseEvent = parts[0];
            name = parts[1];
            if (baseEvent) {
                if (this.eventListeners[baseEvent]) {
                    this._off(baseEvent, name, callback);
                }
            }
            else {
                for (t in this.eventListeners) {
                    this._off(t, name, callback);
                }
            }
        }
        return this;
    }
    dispatchEvent(evt) {
        var e = {
            target: this,
            type: evt.type,
            evt: evt,
        };
        this.fire(evt.type, e);
        return this;
    }
    addEventListener(type, handler) {
        this.on(type, function (evt) {
            handler.call(this, evt.evt);
        });
        return this;
    }
    removeEventListener(type) {
        this.off(type);
        return this;
    }
    _delegate(event, selector, handler) {
        var stopNode = this;
        this.on(event, function (evt) {
            var targets = evt.target.findAncestors(selector, true, stopNode);
            for (var i = 0; i < targets.length; i++) {
                evt = _Util_js__WEBPACK_IMPORTED_MODULE_0__.Util.cloneObject(evt);
                evt.currentTarget = targets[i];
                handler.call(targets[i], evt);
            }
        });
    }
    remove() {
        if (this.isDragging()) {
            this.stopDrag();
        }
        _DragAndDrop_js__WEBPACK_IMPORTED_MODULE_4__.DD._dragElements["delete"](this._id);
        this._remove();
        return this;
    }
    _clearCaches() {
        this._clearSelfAndDescendantCache(ABSOLUTE_TRANSFORM);
        this._clearSelfAndDescendantCache(ABSOLUTE_OPACITY);
        this._clearSelfAndDescendantCache(ABSOLUTE_SCALE);
        this._clearSelfAndDescendantCache(STAGE);
        this._clearSelfAndDescendantCache(VISIBLE);
        this._clearSelfAndDescendantCache(LISTENING);
    }
    _remove() {
        this._clearCaches();
        var parent = this.getParent();
        if (parent && parent.children) {
            parent.children.splice(this.index, 1);
            parent._setChildrenIndices();
            this.parent = null;
        }
    }
    destroy() {
        this.remove();
        this.clearCache();
        return this;
    }
    getAttr(attr) {
        var method = 'get' + _Util_js__WEBPACK_IMPORTED_MODULE_0__.Util._capitalize(attr);
        if (_Util_js__WEBPACK_IMPORTED_MODULE_0__.Util._isFunction(this[method])) {
            return this[method]();
        }
        return this.attrs[attr];
    }
    getAncestors() {
        var parent = this.getParent(), ancestors = [];
        while (parent) {
            ancestors.push(parent);
            parent = parent.getParent();
        }
        return ancestors;
    }
    getAttrs() {
        return this.attrs || {};
    }
    setAttrs(config) {
        this._batchTransformChanges(() => {
            var key, method;
            if (!config) {
                return this;
            }
            for (key in config) {
                if (key === CHILDREN) {
                    continue;
                }
                method = SET + _Util_js__WEBPACK_IMPORTED_MODULE_0__.Util._capitalize(key);
                if (_Util_js__WEBPACK_IMPORTED_MODULE_0__.Util._isFunction(this[method])) {
                    this[method](config[key]);
                }
                else {
                    this._setAttr(key, config[key]);
                }
            }
        });
        return this;
    }
    isListening() {
        return this._getCache(LISTENING, this._isListening);
    }
    _isListening(relativeTo) {
        const listening = this.listening();
        if (!listening) {
            return false;
        }
        const parent = this.getParent();
        if (parent && parent !== relativeTo && this !== relativeTo) {
            return parent._isListening(relativeTo);
        }
        else {
            return true;
        }
    }
    isVisible() {
        return this._getCache(VISIBLE, this._isVisible);
    }
    _isVisible(relativeTo) {
        const visible = this.visible();
        if (!visible) {
            return false;
        }
        const parent = this.getParent();
        if (parent && parent !== relativeTo && this !== relativeTo) {
            return parent._isVisible(relativeTo);
        }
        else {
            return true;
        }
    }
    shouldDrawHit(top, skipDragCheck = false) {
        if (top) {
            return this._isVisible(top) && this._isListening(top);
        }
        var layer = this.getLayer();
        var layerUnderDrag = false;
        _DragAndDrop_js__WEBPACK_IMPORTED_MODULE_4__.DD._dragElements.forEach((elem) => {
            if (elem.dragStatus !== 'dragging') {
                return;
            }
            else if (elem.node.nodeType === 'Stage') {
                layerUnderDrag = true;
            }
            else if (elem.node.getLayer() === layer) {
                layerUnderDrag = true;
            }
        });
        var dragSkip = !skipDragCheck && !_Global_js__WEBPACK_IMPORTED_MODULE_3__.Konva.hitOnDragEnabled && layerUnderDrag;
        return this.isListening() && this.isVisible() && !dragSkip;
    }
    show() {
        this.visible(true);
        return this;
    }
    hide() {
        this.visible(false);
        return this;
    }
    getZIndex() {
        return this.index || 0;
    }
    getAbsoluteZIndex() {
        var depth = this.getDepth(), that = this, index = 0, nodes, len, n, child;
        function addChildren(children) {
            nodes = [];
            len = children.length;
            for (n = 0; n < len; n++) {
                child = children[n];
                index++;
                if (child.nodeType !== SHAPE) {
                    nodes = nodes.concat(child.getChildren().slice());
                }
                if (child._id === that._id) {
                    n = len;
                }
            }
            if (nodes.length > 0 && nodes[0].getDepth() <= depth) {
                addChildren(nodes);
            }
        }
        if (that.nodeType !== UPPER_STAGE) {
            addChildren(that.getStage().getChildren());
        }
        return index;
    }
    getDepth() {
        var depth = 0, parent = this.parent;
        while (parent) {
            depth++;
            parent = parent.parent;
        }
        return depth;
    }
    _batchTransformChanges(func) {
        this._batchingTransformChange = true;
        func();
        this._batchingTransformChange = false;
        if (this._needClearTransformCache) {
            this._clearCache(TRANSFORM);
            this._clearSelfAndDescendantCache(ABSOLUTE_TRANSFORM);
        }
        this._needClearTransformCache = false;
    }
    setPosition(pos) {
        this._batchTransformChanges(() => {
            this.x(pos.x);
            this.y(pos.y);
        });
        return this;
    }
    getPosition() {
        return {
            x: this.x(),
            y: this.y(),
        };
    }
    getRelativePointerPosition() {
        if (!this.getStage()) {
            return null;
        }
        var pos = this.getStage().getPointerPosition();
        if (!pos) {
            return null;
        }
        var transform = this.getAbsoluteTransform().copy();
        transform.invert();
        return transform.point(pos);
    }
    getAbsolutePosition(top) {
        let haveCachedParent = false;
        let parent = this.parent;
        while (parent) {
            if (parent.isCached()) {
                haveCachedParent = true;
                break;
            }
            parent = parent.parent;
        }
        if (haveCachedParent && !top) {
            top = true;
        }
        var absoluteMatrix = this.getAbsoluteTransform(top).getMatrix(), absoluteTransform = new _Util_js__WEBPACK_IMPORTED_MODULE_0__.Transform(), offset = this.offset();
        absoluteTransform.m = absoluteMatrix.slice();
        absoluteTransform.translate(offset.x, offset.y);
        return absoluteTransform.getTranslation();
    }
    setAbsolutePosition(pos) {
        var origTrans = this._clearTransform();
        this.attrs.x = origTrans.x;
        this.attrs.y = origTrans.y;
        delete origTrans.x;
        delete origTrans.y;
        this._clearCache(TRANSFORM);
        var it = this._getAbsoluteTransform().copy();
        it.invert();
        it.translate(pos.x, pos.y);
        pos = {
            x: this.attrs.x + it.getTranslation().x,
            y: this.attrs.y + it.getTranslation().y,
        };
        this._setTransform(origTrans);
        this.setPosition({ x: pos.x, y: pos.y });
        this._clearCache(TRANSFORM);
        this._clearSelfAndDescendantCache(ABSOLUTE_TRANSFORM);
        return this;
    }
    _setTransform(trans) {
        var key;
        for (key in trans) {
            this.attrs[key] = trans[key];
        }
    }
    _clearTransform() {
        var trans = {
            x: this.x(),
            y: this.y(),
            rotation: this.rotation(),
            scaleX: this.scaleX(),
            scaleY: this.scaleY(),
            offsetX: this.offsetX(),
            offsetY: this.offsetY(),
            skewX: this.skewX(),
            skewY: this.skewY(),
        };
        this.attrs.x = 0;
        this.attrs.y = 0;
        this.attrs.rotation = 0;
        this.attrs.scaleX = 1;
        this.attrs.scaleY = 1;
        this.attrs.offsetX = 0;
        this.attrs.offsetY = 0;
        this.attrs.skewX = 0;
        this.attrs.skewY = 0;
        return trans;
    }
    move(change) {
        var changeX = change.x, changeY = change.y, x = this.x(), y = this.y();
        if (changeX !== undefined) {
            x += changeX;
        }
        if (changeY !== undefined) {
            y += changeY;
        }
        this.setPosition({ x: x, y: y });
        return this;
    }
    _eachAncestorReverse(func, top) {
        var family = [], parent = this.getParent(), len, n;
        if (top && top._id === this._id) {
            return;
        }
        family.unshift(this);
        while (parent && (!top || parent._id !== top._id)) {
            family.unshift(parent);
            parent = parent.parent;
        }
        len = family.length;
        for (n = 0; n < len; n++) {
            func(family[n]);
        }
    }
    rotate(theta) {
        this.rotation(this.rotation() + theta);
        return this;
    }
    moveToTop() {
        if (!this.parent) {
            _Util_js__WEBPACK_IMPORTED_MODULE_0__.Util.warn('Node has no parent. moveToTop function is ignored.');
            return false;
        }
        var index = this.index, len = this.parent.getChildren().length;
        if (index < len - 1) {
            this.parent.children.splice(index, 1);
            this.parent.children.push(this);
            this.parent._setChildrenIndices();
            return true;
        }
        return false;
    }
    moveUp() {
        if (!this.parent) {
            _Util_js__WEBPACK_IMPORTED_MODULE_0__.Util.warn('Node has no parent. moveUp function is ignored.');
            return false;
        }
        var index = this.index, len = this.parent.getChildren().length;
        if (index < len - 1) {
            this.parent.children.splice(index, 1);
            this.parent.children.splice(index + 1, 0, this);
            this.parent._setChildrenIndices();
            return true;
        }
        return false;
    }
    moveDown() {
        if (!this.parent) {
            _Util_js__WEBPACK_IMPORTED_MODULE_0__.Util.warn('Node has no parent. moveDown function is ignored.');
            return false;
        }
        var index = this.index;
        if (index > 0) {
            this.parent.children.splice(index, 1);
            this.parent.children.splice(index - 1, 0, this);
            this.parent._setChildrenIndices();
            return true;
        }
        return false;
    }
    moveToBottom() {
        if (!this.parent) {
            _Util_js__WEBPACK_IMPORTED_MODULE_0__.Util.warn('Node has no parent. moveToBottom function is ignored.');
            return false;
        }
        var index = this.index;
        if (index > 0) {
            this.parent.children.splice(index, 1);
            this.parent.children.unshift(this);
            this.parent._setChildrenIndices();
            return true;
        }
        return false;
    }
    setZIndex(zIndex) {
        if (!this.parent) {
            _Util_js__WEBPACK_IMPORTED_MODULE_0__.Util.warn('Node has no parent. zIndex parameter is ignored.');
            return this;
        }
        if (zIndex < 0 || zIndex >= this.parent.children.length) {
            _Util_js__WEBPACK_IMPORTED_MODULE_0__.Util.warn('Unexpected value ' +
                zIndex +
                ' for zIndex property. zIndex is just index of a node in children of its parent. Expected value is from 0 to ' +
                (this.parent.children.length - 1) +
                '.');
        }
        var index = this.index;
        this.parent.children.splice(index, 1);
        this.parent.children.splice(zIndex, 0, this);
        this.parent._setChildrenIndices();
        return this;
    }
    getAbsoluteOpacity() {
        return this._getCache(ABSOLUTE_OPACITY, this._getAbsoluteOpacity);
    }
    _getAbsoluteOpacity() {
        var absOpacity = this.opacity();
        var parent = this.getParent();
        if (parent && !parent._isUnderCache) {
            absOpacity *= parent.getAbsoluteOpacity();
        }
        return absOpacity;
    }
    moveTo(newContainer) {
        if (this.getParent() !== newContainer) {
            this._remove();
            newContainer.add(this);
        }
        return this;
    }
    toObject() {
        var obj = {}, attrs = this.getAttrs(), key, val, getter, defaultValue, nonPlainObject;
        obj.attrs = {};
        for (key in attrs) {
            val = attrs[key];
            nonPlainObject =
                _Util_js__WEBPACK_IMPORTED_MODULE_0__.Util.isObject(val) && !_Util_js__WEBPACK_IMPORTED_MODULE_0__.Util._isPlainObject(val) && !_Util_js__WEBPACK_IMPORTED_MODULE_0__.Util._isArray(val);
            if (nonPlainObject) {
                continue;
            }
            getter = typeof this[key] === 'function' && this[key];
            delete attrs[key];
            defaultValue = getter ? getter.call(this) : null;
            attrs[key] = val;
            if (defaultValue !== val) {
                obj.attrs[key] = val;
            }
        }
        obj.className = this.getClassName();
        return _Util_js__WEBPACK_IMPORTED_MODULE_0__.Util._prepareToStringify(obj);
    }
    toJSON() {
        return JSON.stringify(this.toObject());
    }
    getParent() {
        return this.parent;
    }
    findAncestors(selector, includeSelf, stopNode) {
        var res = [];
        if (includeSelf && this._isMatch(selector)) {
            res.push(this);
        }
        var ancestor = this.parent;
        while (ancestor) {
            if (ancestor === stopNode) {
                return res;
            }
            if (ancestor._isMatch(selector)) {
                res.push(ancestor);
            }
            ancestor = ancestor.parent;
        }
        return res;
    }
    isAncestorOf(node) {
        return false;
    }
    findAncestor(selector, includeSelf, stopNode) {
        return this.findAncestors(selector, includeSelf, stopNode)[0];
    }
    _isMatch(selector) {
        if (!selector) {
            return false;
        }
        if (typeof selector === 'function') {
            return selector(this);
        }
        var selectorArr = selector.replace(/ /g, '').split(','), len = selectorArr.length, n, sel;
        for (n = 0; n < len; n++) {
            sel = selectorArr[n];
            if (!_Util_js__WEBPACK_IMPORTED_MODULE_0__.Util.isValidSelector(sel)) {
                _Util_js__WEBPACK_IMPORTED_MODULE_0__.Util.warn('Selector "' +
                    sel +
                    '" is invalid. Allowed selectors examples are "#foo", ".bar" or "Group".');
                _Util_js__WEBPACK_IMPORTED_MODULE_0__.Util.warn('If you have a custom shape with such className, please change it to start with upper letter like "Triangle".');
                _Util_js__WEBPACK_IMPORTED_MODULE_0__.Util.warn('Konva is awesome, right?');
            }
            if (sel.charAt(0) === '#') {
                if (this.id() === sel.slice(1)) {
                    return true;
                }
            }
            else if (sel.charAt(0) === '.') {
                if (this.hasName(sel.slice(1))) {
                    return true;
                }
            }
            else if (this.className === sel || this.nodeType === sel) {
                return true;
            }
        }
        return false;
    }
    getLayer() {
        var parent = this.getParent();
        return parent ? parent.getLayer() : null;
    }
    getStage() {
        return this._getCache(STAGE, this._getStage);
    }
    _getStage() {
        var parent = this.getParent();
        if (parent) {
            return parent.getStage();
        }
        else {
            return undefined;
        }
    }
    fire(eventType, evt = {}, bubble) {
        evt.target = evt.target || this;
        if (bubble) {
            this._fireAndBubble(eventType, evt);
        }
        else {
            this._fire(eventType, evt);
        }
        return this;
    }
    getAbsoluteTransform(top) {
        if (top) {
            return this._getAbsoluteTransform(top);
        }
        else {
            return this._getCache(ABSOLUTE_TRANSFORM, this._getAbsoluteTransform);
        }
    }
    _getAbsoluteTransform(top) {
        var at;
        if (top) {
            at = new _Util_js__WEBPACK_IMPORTED_MODULE_0__.Transform();
            this._eachAncestorReverse(function (node) {
                var transformsEnabled = node.transformsEnabled();
                if (transformsEnabled === 'all') {
                    at.multiply(node.getTransform());
                }
                else if (transformsEnabled === 'position') {
                    at.translate(node.x() - node.offsetX(), node.y() - node.offsetY());
                }
            }, top);
            return at;
        }
        else {
            at = this._cache.get(ABSOLUTE_TRANSFORM) || new _Util_js__WEBPACK_IMPORTED_MODULE_0__.Transform();
            if (this.parent) {
                this.parent.getAbsoluteTransform().copyInto(at);
            }
            else {
                at.reset();
            }
            var transformsEnabled = this.transformsEnabled();
            if (transformsEnabled === 'all') {
                at.multiply(this.getTransform());
            }
            else if (transformsEnabled === 'position') {
                const x = this.attrs.x || 0;
                const y = this.attrs.y || 0;
                const offsetX = this.attrs.offsetX || 0;
                const offsetY = this.attrs.offsetY || 0;
                at.translate(x - offsetX, y - offsetY);
            }
            at.dirty = false;
            return at;
        }
    }
    getAbsoluteScale(top) {
        var parent = this;
        while (parent) {
            if (parent._isUnderCache) {
                top = parent;
            }
            parent = parent.getParent();
        }
        const transform = this.getAbsoluteTransform(top);
        const attrs = transform.decompose();
        return {
            x: attrs.scaleX,
            y: attrs.scaleY,
        };
    }
    getAbsoluteRotation() {
        return this.getAbsoluteTransform().decompose().rotation;
    }
    getTransform() {
        return this._getCache(TRANSFORM, this._getTransform);
    }
    _getTransform() {
        var _a, _b;
        var m = this._cache.get(TRANSFORM) || new _Util_js__WEBPACK_IMPORTED_MODULE_0__.Transform();
        m.reset();
        var x = this.x(), y = this.y(), rotation = _Global_js__WEBPACK_IMPORTED_MODULE_3__.Konva.getAngle(this.rotation()), scaleX = (_a = this.attrs.scaleX) !== null && _a !== void 0 ? _a : 1, scaleY = (_b = this.attrs.scaleY) !== null && _b !== void 0 ? _b : 1, skewX = this.attrs.skewX || 0, skewY = this.attrs.skewY || 0, offsetX = this.attrs.offsetX || 0, offsetY = this.attrs.offsetY || 0;
        if (x !== 0 || y !== 0) {
            m.translate(x, y);
        }
        if (rotation !== 0) {
            m.rotate(rotation);
        }
        if (skewX !== 0 || skewY !== 0) {
            m.skew(skewX, skewY);
        }
        if (scaleX !== 1 || scaleY !== 1) {
            m.scale(scaleX, scaleY);
        }
        if (offsetX !== 0 || offsetY !== 0) {
            m.translate(-1 * offsetX, -1 * offsetY);
        }
        m.dirty = false;
        return m;
    }
    clone(obj) {
        var attrs = _Util_js__WEBPACK_IMPORTED_MODULE_0__.Util.cloneObject(this.attrs), key, allListeners, len, n, listener;
        for (key in obj) {
            attrs[key] = obj[key];
        }
        var node = new this.constructor(attrs);
        for (key in this.eventListeners) {
            allListeners = this.eventListeners[key];
            len = allListeners.length;
            for (n = 0; n < len; n++) {
                listener = allListeners[n];
                if (listener.name.indexOf(KONVA) < 0) {
                    if (!node.eventListeners[key]) {
                        node.eventListeners[key] = [];
                    }
                    node.eventListeners[key].push(listener);
                }
            }
        }
        return node;
    }
    _toKonvaCanvas(config) {
        config = config || {};
        var box = this.getClientRect();
        var stage = this.getStage(), x = config.x !== undefined ? config.x : Math.floor(box.x), y = config.y !== undefined ? config.y : Math.floor(box.y), pixelRatio = config.pixelRatio || 1, canvas = new _Canvas_js__WEBPACK_IMPORTED_MODULE_2__.SceneCanvas({
            width: config.width || Math.ceil(box.width) || (stage ? stage.width() : 0),
            height: config.height ||
                Math.ceil(box.height) ||
                (stage ? stage.height() : 0),
            pixelRatio: pixelRatio,
        }), context = canvas.getContext();
        if (config.imageSmoothingEnabled === false) {
            context._context.imageSmoothingEnabled = false;
        }
        context.save();
        if (x || y) {
            context.translate(-1 * x, -1 * y);
        }
        this.drawScene(canvas);
        context.restore();
        return canvas;
    }
    toCanvas(config) {
        return this._toKonvaCanvas(config)._canvas;
    }
    toDataURL(config) {
        config = config || {};
        var mimeType = config.mimeType || null, quality = config.quality || null;
        var url = this._toKonvaCanvas(config).toDataURL(mimeType, quality);
        if (config.callback) {
            config.callback(url);
        }
        return url;
    }
    toImage(config) {
        return new Promise((resolve, reject) => {
            try {
                const callback = config === null || config === void 0 ? void 0 : config.callback;
                if (callback)
                    delete config.callback;
                _Util_js__WEBPACK_IMPORTED_MODULE_0__.Util._urlToImage(this.toDataURL(config), function (img) {
                    resolve(img);
                    callback === null || callback === void 0 ? void 0 : callback(img);
                });
            }
            catch (err) {
                reject(err);
            }
        });
    }
    toBlob(config) {
        return new Promise((resolve, reject) => {
            try {
                const callback = config === null || config === void 0 ? void 0 : config.callback;
                if (callback)
                    delete config.callback;
                this.toCanvas(config).toBlob((blob) => {
                    resolve(blob);
                    callback === null || callback === void 0 ? void 0 : callback(blob);
                });
            }
            catch (err) {
                reject(err);
            }
        });
    }
    setSize(size) {
        this.width(size.width);
        this.height(size.height);
        return this;
    }
    getSize() {
        return {
            width: this.width(),
            height: this.height(),
        };
    }
    getClassName() {
        return this.className || this.nodeType;
    }
    getType() {
        return this.nodeType;
    }
    getDragDistance() {
        if (this.attrs.dragDistance !== undefined) {
            return this.attrs.dragDistance;
        }
        else if (this.parent) {
            return this.parent.getDragDistance();
        }
        else {
            return _Global_js__WEBPACK_IMPORTED_MODULE_3__.Konva.dragDistance;
        }
    }
    _off(type, name, callback) {
        var evtListeners = this.eventListeners[type], i, evtName, handler;
        for (i = 0; i < evtListeners.length; i++) {
            evtName = evtListeners[i].name;
            handler = evtListeners[i].handler;
            if ((evtName !== 'konva' || name === 'konva') &&
                (!name || evtName === name) &&
                (!callback || callback === handler)) {
                evtListeners.splice(i, 1);
                if (evtListeners.length === 0) {
                    delete this.eventListeners[type];
                    break;
                }
                i--;
            }
        }
    }
    _fireChangeEvent(attr, oldVal, newVal) {
        this._fire(attr + CHANGE, {
            oldVal: oldVal,
            newVal: newVal,
        });
    }
    addName(name) {
        if (!this.hasName(name)) {
            var oldName = this.name();
            var newName = oldName ? oldName + ' ' + name : name;
            this.name(newName);
        }
        return this;
    }
    hasName(name) {
        if (!name) {
            return false;
        }
        const fullName = this.name();
        if (!fullName) {
            return false;
        }
        var names = (fullName || '').split(/\s/g);
        return names.indexOf(name) !== -1;
    }
    removeName(name) {
        var names = (this.name() || '').split(/\s/g);
        var index = names.indexOf(name);
        if (index !== -1) {
            names.splice(index, 1);
            this.name(names.join(' '));
        }
        return this;
    }
    setAttr(attr, val) {
        var func = this[SET + _Util_js__WEBPACK_IMPORTED_MODULE_0__.Util._capitalize(attr)];
        if (_Util_js__WEBPACK_IMPORTED_MODULE_0__.Util._isFunction(func)) {
            func.call(this, val);
        }
        else {
            this._setAttr(attr, val);
        }
        return this;
    }
    _requestDraw() {
        if (_Global_js__WEBPACK_IMPORTED_MODULE_3__.Konva.autoDrawEnabled) {
            const drawNode = this.getLayer() || this.getStage();
            drawNode === null || drawNode === void 0 ? void 0 : drawNode.batchDraw();
        }
    }
    _setAttr(key, val) {
        var oldVal = this.attrs[key];
        if (oldVal === val && !_Util_js__WEBPACK_IMPORTED_MODULE_0__.Util.isObject(val)) {
            return;
        }
        if (val === undefined || val === null) {
            delete this.attrs[key];
        }
        else {
            this.attrs[key] = val;
        }
        if (this._shouldFireChangeEvents) {
            this._fireChangeEvent(key, oldVal, val);
        }
        this._requestDraw();
    }
    _setComponentAttr(key, component, val) {
        var oldVal;
        if (val !== undefined) {
            oldVal = this.attrs[key];
            if (!oldVal) {
                this.attrs[key] = this.getAttr(key);
            }
            this.attrs[key][component] = val;
            this._fireChangeEvent(key, oldVal, val);
        }
    }
    _fireAndBubble(eventType, evt, compareShape) {
        if (evt && this.nodeType === SHAPE) {
            evt.target = this;
        }
        var shouldStop = (eventType === MOUSEENTER || eventType === MOUSELEAVE) &&
            ((compareShape &&
                (this === compareShape ||
                    (this.isAncestorOf && this.isAncestorOf(compareShape)))) ||
                (this.nodeType === 'Stage' && !compareShape));
        if (!shouldStop) {
            this._fire(eventType, evt);
            var stopBubble = (eventType === MOUSEENTER || eventType === MOUSELEAVE) &&
                compareShape &&
                compareShape.isAncestorOf &&
                compareShape.isAncestorOf(this) &&
                !compareShape.isAncestorOf(this.parent);
            if (((evt && !evt.cancelBubble) || !evt) &&
                this.parent &&
                this.parent.isListening() &&
                !stopBubble) {
                if (compareShape && compareShape.parent) {
                    this._fireAndBubble.call(this.parent, eventType, evt, compareShape);
                }
                else {
                    this._fireAndBubble.call(this.parent, eventType, evt);
                }
            }
        }
    }
    _getProtoListeners(eventType) {
        let listeners = this._cache.get(ALL_LISTENERS);
        if (!listeners) {
            listeners = {};
            let obj = Object.getPrototypeOf(this);
            while (obj) {
                if (!obj.eventListeners) {
                    obj = Object.getPrototypeOf(obj);
                    continue;
                }
                for (var event in obj.eventListeners) {
                    const newEvents = obj.eventListeners[event];
                    const oldEvents = listeners[event] || [];
                    listeners[event] = newEvents.concat(oldEvents);
                }
                obj = Object.getPrototypeOf(obj);
            }
            this._cache.set(ALL_LISTENERS, listeners);
        }
        return listeners[eventType];
    }
    _fire(eventType, evt) {
        evt = evt || {};
        evt.currentTarget = this;
        evt.type = eventType;
        const topListeners = this._getProtoListeners(eventType);
        if (topListeners) {
            for (var i = 0; i < topListeners.length; i++) {
                topListeners[i].handler.call(this, evt);
            }
        }
        const selfListeners = this.eventListeners[eventType];
        if (selfListeners) {
            for (var i = 0; i < selfListeners.length; i++) {
                selfListeners[i].handler.call(this, evt);
            }
        }
    }
    draw() {
        this.drawScene();
        this.drawHit();
        return this;
    }
    _createDragElement(evt) {
        var pointerId = evt ? evt.pointerId : undefined;
        var stage = this.getStage();
        var ap = this.getAbsolutePosition();
        var pos = stage._getPointerById(pointerId) ||
            stage._changedPointerPositions[0] ||
            ap;
        _DragAndDrop_js__WEBPACK_IMPORTED_MODULE_4__.DD._dragElements.set(this._id, {
            node: this,
            startPointerPos: pos,
            offset: {
                x: pos.x - ap.x,
                y: pos.y - ap.y,
            },
            dragStatus: 'ready',
            pointerId,
        });
    }
    startDrag(evt, bubbleEvent = true) {
        if (!_DragAndDrop_js__WEBPACK_IMPORTED_MODULE_4__.DD._dragElements.has(this._id)) {
            this._createDragElement(evt);
        }
        const elem = _DragAndDrop_js__WEBPACK_IMPORTED_MODULE_4__.DD._dragElements.get(this._id);
        elem.dragStatus = 'dragging';
        this.fire('dragstart', {
            type: 'dragstart',
            target: this,
            evt: evt && evt.evt,
        }, bubbleEvent);
    }
    _setDragPosition(evt, elem) {
        const pos = this.getStage()._getPointerById(elem.pointerId);
        if (!pos) {
            return;
        }
        var newNodePos = {
            x: pos.x - elem.offset.x,
            y: pos.y - elem.offset.y,
        };
        var dbf = this.dragBoundFunc();
        if (dbf !== undefined) {
            const bounded = dbf.call(this, newNodePos, evt);
            if (!bounded) {
                _Util_js__WEBPACK_IMPORTED_MODULE_0__.Util.warn('dragBoundFunc did not return any value. That is unexpected behavior. You must return new absolute position from dragBoundFunc.');
            }
            else {
                newNodePos = bounded;
            }
        }
        if (!this._lastPos ||
            this._lastPos.x !== newNodePos.x ||
            this._lastPos.y !== newNodePos.y) {
            this.setAbsolutePosition(newNodePos);
            this._requestDraw();
        }
        this._lastPos = newNodePos;
    }
    stopDrag(evt) {
        const elem = _DragAndDrop_js__WEBPACK_IMPORTED_MODULE_4__.DD._dragElements.get(this._id);
        if (elem) {
            elem.dragStatus = 'stopped';
        }
        _DragAndDrop_js__WEBPACK_IMPORTED_MODULE_4__.DD._endDragBefore(evt);
        _DragAndDrop_js__WEBPACK_IMPORTED_MODULE_4__.DD._endDragAfter(evt);
    }
    setDraggable(draggable) {
        this._setAttr('draggable', draggable);
        this._dragChange();
    }
    isDragging() {
        const elem = _DragAndDrop_js__WEBPACK_IMPORTED_MODULE_4__.DD._dragElements.get(this._id);
        return elem ? elem.dragStatus === 'dragging' : false;
    }
    _listenDrag() {
        this._dragCleanup();
        this.on('mousedown.konva touchstart.konva', function (evt) {
            var shouldCheckButton = evt.evt['button'] !== undefined;
            var canDrag = !shouldCheckButton || _Global_js__WEBPACK_IMPORTED_MODULE_3__.Konva.dragButtons.indexOf(evt.evt['button']) >= 0;
            if (!canDrag) {
                return;
            }
            if (this.isDragging()) {
                return;
            }
            var hasDraggingChild = false;
            _DragAndDrop_js__WEBPACK_IMPORTED_MODULE_4__.DD._dragElements.forEach((elem) => {
                if (this.isAncestorOf(elem.node)) {
                    hasDraggingChild = true;
                }
            });
            if (!hasDraggingChild) {
                this._createDragElement(evt);
            }
        });
    }
    _dragChange() {
        if (this.attrs.draggable) {
            this._listenDrag();
        }
        else {
            this._dragCleanup();
            var stage = this.getStage();
            if (!stage) {
                return;
            }
            const dragElement = _DragAndDrop_js__WEBPACK_IMPORTED_MODULE_4__.DD._dragElements.get(this._id);
            const isDragging = dragElement && dragElement.dragStatus === 'dragging';
            const isReady = dragElement && dragElement.dragStatus === 'ready';
            if (isDragging) {
                this.stopDrag();
            }
            else if (isReady) {
                _DragAndDrop_js__WEBPACK_IMPORTED_MODULE_4__.DD._dragElements["delete"](this._id);
            }
        }
    }
    _dragCleanup() {
        this.off('mousedown.konva');
        this.off('touchstart.konva');
    }
    isClientRectOnScreen(margin = { x: 0, y: 0 }) {
        const stage = this.getStage();
        if (!stage) {
            return false;
        }
        const screenRect = {
            x: -margin.x,
            y: -margin.y,
            width: stage.width() + 2 * margin.x,
            height: stage.height() + 2 * margin.y,
        };
        return _Util_js__WEBPACK_IMPORTED_MODULE_0__.Util.haveIntersection(screenRect, this.getClientRect());
    }
    static create(data, container) {
        if (_Util_js__WEBPACK_IMPORTED_MODULE_0__.Util._isString(data)) {
            data = JSON.parse(data);
        }
        return this._createNode(data, container);
    }
    static _createNode(obj, container) {
        var className = Node.prototype.getClassName.call(obj), children = obj.children, no, len, n;
        if (container) {
            obj.attrs.container = container;
        }
        if (!_Global_js__WEBPACK_IMPORTED_MODULE_3__.Konva[className]) {
            _Util_js__WEBPACK_IMPORTED_MODULE_0__.Util.warn('Can not find a node with class name "' +
                className +
                '". Fallback to "Shape".');
            className = 'Shape';
        }
        const Class = _Global_js__WEBPACK_IMPORTED_MODULE_3__.Konva[className];
        no = new Class(obj.attrs);
        if (children) {
            len = children.length;
            for (n = 0; n < len; n++) {
                no.add(Node._createNode(children[n]));
            }
        }
        return no;
    }
}
Node.prototype.nodeType = 'Node';
Node.prototype._attrsAffectingSize = [];
Node.prototype.eventListeners = {};
Node.prototype.on.call(Node.prototype, TRANSFORM_CHANGE_STR, function () {
    if (this._batchingTransformChange) {
        this._needClearTransformCache = true;
        return;
    }
    this._clearCache(TRANSFORM);
    this._clearSelfAndDescendantCache(ABSOLUTE_TRANSFORM);
});
Node.prototype.on.call(Node.prototype, 'visibleChange.konva', function () {
    this._clearSelfAndDescendantCache(VISIBLE);
});
Node.prototype.on.call(Node.prototype, 'listeningChange.konva', function () {
    this._clearSelfAndDescendantCache(LISTENING);
});
Node.prototype.on.call(Node.prototype, 'opacityChange.konva', function () {
    this._clearSelfAndDescendantCache(ABSOLUTE_OPACITY);
});
const addGetterSetter = _Factory_js__WEBPACK_IMPORTED_MODULE_1__.Factory.addGetterSetter;
addGetterSetter(Node, 'zIndex');
addGetterSetter(Node, 'absolutePosition');
addGetterSetter(Node, 'position');
addGetterSetter(Node, 'x', 0, (0,_Validators_js__WEBPACK_IMPORTED_MODULE_5__.getNumberValidator)());
addGetterSetter(Node, 'y', 0, (0,_Validators_js__WEBPACK_IMPORTED_MODULE_5__.getNumberValidator)());
addGetterSetter(Node, 'globalCompositeOperation', 'source-over', (0,_Validators_js__WEBPACK_IMPORTED_MODULE_5__.getStringValidator)());
addGetterSetter(Node, 'opacity', 1, (0,_Validators_js__WEBPACK_IMPORTED_MODULE_5__.getNumberValidator)());
addGetterSetter(Node, 'name', '', (0,_Validators_js__WEBPACK_IMPORTED_MODULE_5__.getStringValidator)());
addGetterSetter(Node, 'id', '', (0,_Validators_js__WEBPACK_IMPORTED_MODULE_5__.getStringValidator)());
addGetterSetter(Node, 'rotation', 0, (0,_Validators_js__WEBPACK_IMPORTED_MODULE_5__.getNumberValidator)());
_Factory_js__WEBPACK_IMPORTED_MODULE_1__.Factory.addComponentsGetterSetter(Node, 'scale', ['x', 'y']);
addGetterSetter(Node, 'scaleX', 1, (0,_Validators_js__WEBPACK_IMPORTED_MODULE_5__.getNumberValidator)());
addGetterSetter(Node, 'scaleY', 1, (0,_Validators_js__WEBPACK_IMPORTED_MODULE_5__.getNumberValidator)());
_Factory_js__WEBPACK_IMPORTED_MODULE_1__.Factory.addComponentsGetterSetter(Node, 'skew', ['x', 'y']);
addGetterSetter(Node, 'skewX', 0, (0,_Validators_js__WEBPACK_IMPORTED_MODULE_5__.getNumberValidator)());
addGetterSetter(Node, 'skewY', 0, (0,_Validators_js__WEBPACK_IMPORTED_MODULE_5__.getNumberValidator)());
_Factory_js__WEBPACK_IMPORTED_MODULE_1__.Factory.addComponentsGetterSetter(Node, 'offset', ['x', 'y']);
addGetterSetter(Node, 'offsetX', 0, (0,_Validators_js__WEBPACK_IMPORTED_MODULE_5__.getNumberValidator)());
addGetterSetter(Node, 'offsetY', 0, (0,_Validators_js__WEBPACK_IMPORTED_MODULE_5__.getNumberValidator)());
addGetterSetter(Node, 'dragDistance', null, (0,_Validators_js__WEBPACK_IMPORTED_MODULE_5__.getNumberValidator)());
addGetterSetter(Node, 'width', 0, (0,_Validators_js__WEBPACK_IMPORTED_MODULE_5__.getNumberValidator)());
addGetterSetter(Node, 'height', 0, (0,_Validators_js__WEBPACK_IMPORTED_MODULE_5__.getNumberValidator)());
addGetterSetter(Node, 'listening', true, (0,_Validators_js__WEBPACK_IMPORTED_MODULE_5__.getBooleanValidator)());
addGetterSetter(Node, 'preventDefault', true, (0,_Validators_js__WEBPACK_IMPORTED_MODULE_5__.getBooleanValidator)());
addGetterSetter(Node, 'filters', null, function (val) {
    this._filterUpToDate = false;
    return val;
});
addGetterSetter(Node, 'visible', true, (0,_Validators_js__WEBPACK_IMPORTED_MODULE_5__.getBooleanValidator)());
addGetterSetter(Node, 'transformsEnabled', 'all', (0,_Validators_js__WEBPACK_IMPORTED_MODULE_5__.getStringValidator)());
addGetterSetter(Node, 'size');
addGetterSetter(Node, 'dragBoundFunc');
addGetterSetter(Node, 'draggable', false, (0,_Validators_js__WEBPACK_IMPORTED_MODULE_5__.getBooleanValidator)());
_Factory_js__WEBPACK_IMPORTED_MODULE_1__.Factory.backCompat(Node, {
    rotateDeg: 'rotate',
    setRotationDeg: 'setRotation',
    getRotationDeg: 'getRotation',
});


/***/ }),

/***/ "../../node_modules/konva/lib/PointerEvents.js":
/*!*****************************************************!*\
  !*** ../../node_modules/konva/lib/PointerEvents.js ***!
  \*****************************************************/
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "createEvent": () => (/* binding */ createEvent),
/* harmony export */   "getCapturedShape": () => (/* binding */ getCapturedShape),
/* harmony export */   "hasPointerCapture": () => (/* binding */ hasPointerCapture),
/* harmony export */   "releaseCapture": () => (/* binding */ releaseCapture),
/* harmony export */   "setPointerCapture": () => (/* binding */ setPointerCapture)
/* harmony export */ });
/* harmony import */ var _Global_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./Global.js */ "../../node_modules/konva/lib/Global.js");

const Captures = new Map();
const SUPPORT_POINTER_EVENTS = _Global_js__WEBPACK_IMPORTED_MODULE_0__.Konva._global.PointerEvent !== undefined;
function getCapturedShape(pointerId) {
    return Captures.get(pointerId);
}
function createEvent(evt) {
    return {
        evt,
        pointerId: evt.pointerId,
    };
}
function hasPointerCapture(pointerId, shape) {
    return Captures.get(pointerId) === shape;
}
function setPointerCapture(pointerId, shape) {
    releaseCapture(pointerId);
    const stage = shape.getStage();
    if (!stage)
        return;
    Captures.set(pointerId, shape);
    if (SUPPORT_POINTER_EVENTS) {
        shape._fire('gotpointercapture', createEvent(new PointerEvent('gotpointercapture')));
    }
}
function releaseCapture(pointerId, target) {
    const shape = Captures.get(pointerId);
    if (!shape)
        return;
    const stage = shape.getStage();
    if (stage && stage.content) {
    }
    Captures.delete(pointerId);
    if (SUPPORT_POINTER_EVENTS) {
        shape._fire('lostpointercapture', createEvent(new PointerEvent('lostpointercapture')));
    }
}


/***/ }),

/***/ "../../node_modules/konva/lib/Shape.js":
/*!*********************************************!*\
  !*** ../../node_modules/konva/lib/Shape.js ***!
  \*********************************************/
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "Shape": () => (/* binding */ Shape),
/* harmony export */   "shapes": () => (/* binding */ shapes)
/* harmony export */ });
/* harmony import */ var _Global_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./Global.js */ "../../node_modules/konva/lib/Global.js");
/* harmony import */ var _Util_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./Util.js */ "../../node_modules/konva/lib/Util.js");
/* harmony import */ var _Factory_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./Factory.js */ "../../node_modules/konva/lib/Factory.js");
/* harmony import */ var _Node_js__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./Node.js */ "../../node_modules/konva/lib/Node.js");
/* harmony import */ var _Validators_js__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./Validators.js */ "../../node_modules/konva/lib/Validators.js");
/* harmony import */ var _PointerEvents_js__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ./PointerEvents.js */ "../../node_modules/konva/lib/PointerEvents.js");







var HAS_SHADOW = 'hasShadow';
var SHADOW_RGBA = 'shadowRGBA';
var patternImage = 'patternImage';
var linearGradient = 'linearGradient';
var radialGradient = 'radialGradient';
let dummyContext;
function getDummyContext() {
    if (dummyContext) {
        return dummyContext;
    }
    dummyContext = _Util_js__WEBPACK_IMPORTED_MODULE_1__.Util.createCanvasElement().getContext('2d');
    return dummyContext;
}
const shapes = {};
function _fillFunc(context) {
    context.fill();
}
function _strokeFunc(context) {
    context.stroke();
}
function _fillFuncHit(context) {
    context.fill();
}
function _strokeFuncHit(context) {
    context.stroke();
}
function _clearHasShadowCache() {
    this._clearCache(HAS_SHADOW);
}
function _clearGetShadowRGBACache() {
    this._clearCache(SHADOW_RGBA);
}
function _clearFillPatternCache() {
    this._clearCache(patternImage);
}
function _clearLinearGradientCache() {
    this._clearCache(linearGradient);
}
function _clearRadialGradientCache() {
    this._clearCache(radialGradient);
}
class Shape extends _Node_js__WEBPACK_IMPORTED_MODULE_3__.Node {
    constructor(config) {
        super(config);
        let key;
        while (true) {
            key = _Util_js__WEBPACK_IMPORTED_MODULE_1__.Util.getRandomColor();
            if (key && !(key in shapes)) {
                break;
            }
        }
        this.colorKey = key;
        shapes[key] = this;
    }
    getContext() {
        _Util_js__WEBPACK_IMPORTED_MODULE_1__.Util.warn('shape.getContext() method is deprecated. Please do not use it.');
        return this.getLayer().getContext();
    }
    getCanvas() {
        _Util_js__WEBPACK_IMPORTED_MODULE_1__.Util.warn('shape.getCanvas() method is deprecated. Please do not use it.');
        return this.getLayer().getCanvas();
    }
    getSceneFunc() {
        return this.attrs.sceneFunc || this['_sceneFunc'];
    }
    getHitFunc() {
        return this.attrs.hitFunc || this['_hitFunc'];
    }
    hasShadow() {
        return this._getCache(HAS_SHADOW, this._hasShadow);
    }
    _hasShadow() {
        return (this.shadowEnabled() &&
            this.shadowOpacity() !== 0 &&
            !!(this.shadowColor() ||
                this.shadowBlur() ||
                this.shadowOffsetX() ||
                this.shadowOffsetY()));
    }
    _getFillPattern() {
        return this._getCache(patternImage, this.__getFillPattern);
    }
    __getFillPattern() {
        if (this.fillPatternImage()) {
            var ctx = getDummyContext();
            const pattern = ctx.createPattern(this.fillPatternImage(), this.fillPatternRepeat() || 'repeat');
            if (pattern && pattern.setTransform) {
                const tr = new _Util_js__WEBPACK_IMPORTED_MODULE_1__.Transform();
                tr.translate(this.fillPatternX(), this.fillPatternY());
                tr.rotate(_Global_js__WEBPACK_IMPORTED_MODULE_0__.Konva.getAngle(this.fillPatternRotation()));
                tr.scale(this.fillPatternScaleX(), this.fillPatternScaleY());
                tr.translate(-1 * this.fillPatternOffsetX(), -1 * this.fillPatternOffsetY());
                const m = tr.getMatrix();
                const matrix = typeof DOMMatrix === 'undefined'
                    ? {
                        a: m[0],
                        b: m[1],
                        c: m[2],
                        d: m[3],
                        e: m[4],
                        f: m[5],
                    }
                    : new DOMMatrix(m);
                pattern.setTransform(matrix);
            }
            return pattern;
        }
    }
    _getLinearGradient() {
        return this._getCache(linearGradient, this.__getLinearGradient);
    }
    __getLinearGradient() {
        var colorStops = this.fillLinearGradientColorStops();
        if (colorStops) {
            var ctx = getDummyContext();
            var start = this.fillLinearGradientStartPoint();
            var end = this.fillLinearGradientEndPoint();
            var grd = ctx.createLinearGradient(start.x, start.y, end.x, end.y);
            for (var n = 0; n < colorStops.length; n += 2) {
                grd.addColorStop(colorStops[n], colorStops[n + 1]);
            }
            return grd;
        }
    }
    _getRadialGradient() {
        return this._getCache(radialGradient, this.__getRadialGradient);
    }
    __getRadialGradient() {
        var colorStops = this.fillRadialGradientColorStops();
        if (colorStops) {
            var ctx = getDummyContext();
            var start = this.fillRadialGradientStartPoint();
            var end = this.fillRadialGradientEndPoint();
            var grd = ctx.createRadialGradient(start.x, start.y, this.fillRadialGradientStartRadius(), end.x, end.y, this.fillRadialGradientEndRadius());
            for (var n = 0; n < colorStops.length; n += 2) {
                grd.addColorStop(colorStops[n], colorStops[n + 1]);
            }
            return grd;
        }
    }
    getShadowRGBA() {
        return this._getCache(SHADOW_RGBA, this._getShadowRGBA);
    }
    _getShadowRGBA() {
        if (!this.hasShadow()) {
            return;
        }
        var rgba = _Util_js__WEBPACK_IMPORTED_MODULE_1__.Util.colorToRGBA(this.shadowColor());
        if (rgba) {
            return ('rgba(' +
                rgba.r +
                ',' +
                rgba.g +
                ',' +
                rgba.b +
                ',' +
                rgba.a * (this.shadowOpacity() || 1) +
                ')');
        }
    }
    hasFill() {
        return this._calculate('hasFill', [
            'fillEnabled',
            'fill',
            'fillPatternImage',
            'fillLinearGradientColorStops',
            'fillRadialGradientColorStops',
        ], () => {
            return (this.fillEnabled() &&
                !!(this.fill() ||
                    this.fillPatternImage() ||
                    this.fillLinearGradientColorStops() ||
                    this.fillRadialGradientColorStops()));
        });
    }
    hasStroke() {
        return this._calculate('hasStroke', [
            'strokeEnabled',
            'strokeWidth',
            'stroke',
            'strokeLinearGradientColorStops',
        ], () => {
            return (this.strokeEnabled() &&
                this.strokeWidth() &&
                !!(this.stroke() || this.strokeLinearGradientColorStops()));
        });
    }
    hasHitStroke() {
        const width = this.hitStrokeWidth();
        if (width === 'auto') {
            return this.hasStroke();
        }
        return this.strokeEnabled() && !!width;
    }
    intersects(point) {
        var stage = this.getStage(), bufferHitCanvas = stage.bufferHitCanvas, p;
        bufferHitCanvas.getContext().clear();
        this.drawHit(bufferHitCanvas, null, true);
        p = bufferHitCanvas.context.getImageData(Math.round(point.x), Math.round(point.y), 1, 1).data;
        return p[3] > 0;
    }
    destroy() {
        _Node_js__WEBPACK_IMPORTED_MODULE_3__.Node.prototype.destroy.call(this);
        delete shapes[this.colorKey];
        delete this.colorKey;
        return this;
    }
    _useBufferCanvas(forceFill) {
        var _a;
        if (!this.getStage()) {
            return false;
        }
        const perfectDrawEnabled = (_a = this.attrs.perfectDrawEnabled) !== null && _a !== void 0 ? _a : true;
        if (!perfectDrawEnabled) {
            return false;
        }
        const hasFill = forceFill || this.hasFill();
        const hasStroke = this.hasStroke();
        const isTransparent = this.getAbsoluteOpacity() !== 1;
        if (hasFill && hasStroke && isTransparent) {
            return true;
        }
        const hasShadow = this.hasShadow();
        const strokeForShadow = this.shadowForStrokeEnabled();
        if (hasFill && hasStroke && hasShadow && strokeForShadow) {
            return true;
        }
        return false;
    }
    setStrokeHitEnabled(val) {
        _Util_js__WEBPACK_IMPORTED_MODULE_1__.Util.warn('strokeHitEnabled property is deprecated. Please use hitStrokeWidth instead.');
        if (val) {
            this.hitStrokeWidth('auto');
        }
        else {
            this.hitStrokeWidth(0);
        }
    }
    getStrokeHitEnabled() {
        if (this.hitStrokeWidth() === 0) {
            return false;
        }
        else {
            return true;
        }
    }
    getSelfRect() {
        var size = this.size();
        return {
            x: this._centroid ? -size.width / 2 : 0,
            y: this._centroid ? -size.height / 2 : 0,
            width: size.width,
            height: size.height,
        };
    }
    getClientRect(config = {}) {
        const skipTransform = config.skipTransform;
        const relativeTo = config.relativeTo;
        const fillRect = this.getSelfRect();
        const applyStroke = !config.skipStroke && this.hasStroke();
        const strokeWidth = (applyStroke && this.strokeWidth()) || 0;
        const fillAndStrokeWidth = fillRect.width + strokeWidth;
        const fillAndStrokeHeight = fillRect.height + strokeWidth;
        const applyShadow = !config.skipShadow && this.hasShadow();
        const shadowOffsetX = applyShadow ? this.shadowOffsetX() : 0;
        const shadowOffsetY = applyShadow ? this.shadowOffsetY() : 0;
        const preWidth = fillAndStrokeWidth + Math.abs(shadowOffsetX);
        const preHeight = fillAndStrokeHeight + Math.abs(shadowOffsetY);
        const blurRadius = (applyShadow && this.shadowBlur()) || 0;
        const width = preWidth + blurRadius * 2;
        const height = preHeight + blurRadius * 2;
        const rect = {
            width: width,
            height: height,
            x: -(strokeWidth / 2 + blurRadius) +
                Math.min(shadowOffsetX, 0) +
                fillRect.x,
            y: -(strokeWidth / 2 + blurRadius) +
                Math.min(shadowOffsetY, 0) +
                fillRect.y,
        };
        if (!skipTransform) {
            return this._transformedRect(rect, relativeTo);
        }
        return rect;
    }
    drawScene(can, top) {
        var layer = this.getLayer(), canvas = can || layer.getCanvas(), context = canvas.getContext(), cachedCanvas = this._getCanvasCache(), drawFunc = this.getSceneFunc(), hasShadow = this.hasShadow(), stage, bufferCanvas, bufferContext;
        var skipBuffer = canvas.isCache;
        var cachingSelf = top === this;
        if (!this.isVisible() && !cachingSelf) {
            return this;
        }
        if (cachedCanvas) {
            context.save();
            var m = this.getAbsoluteTransform(top).getMatrix();
            context.transform(m[0], m[1], m[2], m[3], m[4], m[5]);
            this._drawCachedSceneCanvas(context);
            context.restore();
            return this;
        }
        if (!drawFunc) {
            return this;
        }
        context.save();
        if (this._useBufferCanvas() && !skipBuffer) {
            stage = this.getStage();
            bufferCanvas = stage.bufferCanvas;
            bufferContext = bufferCanvas.getContext();
            bufferContext.clear();
            bufferContext.save();
            bufferContext._applyLineJoin(this);
            var o = this.getAbsoluteTransform(top).getMatrix();
            bufferContext.transform(o[0], o[1], o[2], o[3], o[4], o[5]);
            drawFunc.call(this, bufferContext, this);
            bufferContext.restore();
            var ratio = bufferCanvas.pixelRatio;
            if (hasShadow) {
                context._applyShadow(this);
            }
            context._applyOpacity(this);
            context._applyGlobalCompositeOperation(this);
            context.drawImage(bufferCanvas._canvas, 0, 0, bufferCanvas.width / ratio, bufferCanvas.height / ratio);
        }
        else {
            context._applyLineJoin(this);
            if (!cachingSelf) {
                var o = this.getAbsoluteTransform(top).getMatrix();
                context.transform(o[0], o[1], o[2], o[3], o[4], o[5]);
                context._applyOpacity(this);
                context._applyGlobalCompositeOperation(this);
            }
            if (hasShadow) {
                context._applyShadow(this);
            }
            drawFunc.call(this, context, this);
        }
        context.restore();
        return this;
    }
    drawHit(can, top, skipDragCheck = false) {
        if (!this.shouldDrawHit(top, skipDragCheck)) {
            return this;
        }
        var layer = this.getLayer(), canvas = can || layer.hitCanvas, context = canvas && canvas.getContext(), drawFunc = this.hitFunc() || this.sceneFunc(), cachedCanvas = this._getCanvasCache(), cachedHitCanvas = cachedCanvas && cachedCanvas.hit;
        if (!this.colorKey) {
            _Util_js__WEBPACK_IMPORTED_MODULE_1__.Util.warn('Looks like your canvas has a destroyed shape in it. Do not reuse shape after you destroyed it. If you want to reuse shape you should call remove() instead of destroy()');
        }
        if (cachedHitCanvas) {
            context.save();
            var m = this.getAbsoluteTransform(top).getMatrix();
            context.transform(m[0], m[1], m[2], m[3], m[4], m[5]);
            this._drawCachedHitCanvas(context);
            context.restore();
            return this;
        }
        if (!drawFunc) {
            return this;
        }
        context.save();
        context._applyLineJoin(this);
        const selfCache = this === top;
        if (!selfCache) {
            var o = this.getAbsoluteTransform(top).getMatrix();
            context.transform(o[0], o[1], o[2], o[3], o[4], o[5]);
        }
        drawFunc.call(this, context, this);
        context.restore();
        return this;
    }
    drawHitFromCache(alphaThreshold = 0) {
        var cachedCanvas = this._getCanvasCache(), sceneCanvas = this._getCachedSceneCanvas(), hitCanvas = cachedCanvas.hit, hitContext = hitCanvas.getContext(), hitWidth = hitCanvas.getWidth(), hitHeight = hitCanvas.getHeight(), hitImageData, hitData, len, rgbColorKey, i, alpha;
        hitContext.clear();
        hitContext.drawImage(sceneCanvas._canvas, 0, 0, hitWidth, hitHeight);
        try {
            hitImageData = hitContext.getImageData(0, 0, hitWidth, hitHeight);
            hitData = hitImageData.data;
            len = hitData.length;
            rgbColorKey = _Util_js__WEBPACK_IMPORTED_MODULE_1__.Util._hexToRgb(this.colorKey);
            for (i = 0; i < len; i += 4) {
                alpha = hitData[i + 3];
                if (alpha > alphaThreshold) {
                    hitData[i] = rgbColorKey.r;
                    hitData[i + 1] = rgbColorKey.g;
                    hitData[i + 2] = rgbColorKey.b;
                    hitData[i + 3] = 255;
                }
                else {
                    hitData[i + 3] = 0;
                }
            }
            hitContext.putImageData(hitImageData, 0, 0);
        }
        catch (e) {
            _Util_js__WEBPACK_IMPORTED_MODULE_1__.Util.error('Unable to draw hit graph from cached scene canvas. ' + e.message);
        }
        return this;
    }
    hasPointerCapture(pointerId) {
        return _PointerEvents_js__WEBPACK_IMPORTED_MODULE_5__.hasPointerCapture(pointerId, this);
    }
    setPointerCapture(pointerId) {
        _PointerEvents_js__WEBPACK_IMPORTED_MODULE_5__.setPointerCapture(pointerId, this);
    }
    releaseCapture(pointerId) {
        _PointerEvents_js__WEBPACK_IMPORTED_MODULE_5__.releaseCapture(pointerId, this);
    }
}
Shape.prototype._fillFunc = _fillFunc;
Shape.prototype._strokeFunc = _strokeFunc;
Shape.prototype._fillFuncHit = _fillFuncHit;
Shape.prototype._strokeFuncHit = _strokeFuncHit;
Shape.prototype._centroid = false;
Shape.prototype.nodeType = 'Shape';
(0,_Global_js__WEBPACK_IMPORTED_MODULE_0__._registerNode)(Shape);
Shape.prototype.eventListeners = {};
Shape.prototype.on.call(Shape.prototype, 'shadowColorChange.konva shadowBlurChange.konva shadowOffsetChange.konva shadowOpacityChange.konva shadowEnabledChange.konva', _clearHasShadowCache);
Shape.prototype.on.call(Shape.prototype, 'shadowColorChange.konva shadowOpacityChange.konva shadowEnabledChange.konva', _clearGetShadowRGBACache);
Shape.prototype.on.call(Shape.prototype, 'fillPriorityChange.konva fillPatternImageChange.konva fillPatternRepeatChange.konva fillPatternScaleXChange.konva fillPatternScaleYChange.konva fillPatternOffsetXChange.konva fillPatternOffsetYChange.konva fillPatternXChange.konva fillPatternYChange.konva fillPatternRotationChange.konva', _clearFillPatternCache);
Shape.prototype.on.call(Shape.prototype, 'fillPriorityChange.konva fillLinearGradientColorStopsChange.konva fillLinearGradientStartPointXChange.konva fillLinearGradientStartPointYChange.konva fillLinearGradientEndPointXChange.konva fillLinearGradientEndPointYChange.konva', _clearLinearGradientCache);
Shape.prototype.on.call(Shape.prototype, 'fillPriorityChange.konva fillRadialGradientColorStopsChange.konva fillRadialGradientStartPointXChange.konva fillRadialGradientStartPointYChange.konva fillRadialGradientEndPointXChange.konva fillRadialGradientEndPointYChange.konva fillRadialGradientStartRadiusChange.konva fillRadialGradientEndRadiusChange.konva', _clearRadialGradientCache);
_Factory_js__WEBPACK_IMPORTED_MODULE_2__.Factory.addGetterSetter(Shape, 'stroke', undefined, (0,_Validators_js__WEBPACK_IMPORTED_MODULE_4__.getStringOrGradientValidator)());
_Factory_js__WEBPACK_IMPORTED_MODULE_2__.Factory.addGetterSetter(Shape, 'strokeWidth', 2, (0,_Validators_js__WEBPACK_IMPORTED_MODULE_4__.getNumberValidator)());
_Factory_js__WEBPACK_IMPORTED_MODULE_2__.Factory.addGetterSetter(Shape, 'fillAfterStrokeEnabled', false);
_Factory_js__WEBPACK_IMPORTED_MODULE_2__.Factory.addGetterSetter(Shape, 'hitStrokeWidth', 'auto', (0,_Validators_js__WEBPACK_IMPORTED_MODULE_4__.getNumberOrAutoValidator)());
_Factory_js__WEBPACK_IMPORTED_MODULE_2__.Factory.addGetterSetter(Shape, 'strokeHitEnabled', true, (0,_Validators_js__WEBPACK_IMPORTED_MODULE_4__.getBooleanValidator)());
_Factory_js__WEBPACK_IMPORTED_MODULE_2__.Factory.addGetterSetter(Shape, 'perfectDrawEnabled', true, (0,_Validators_js__WEBPACK_IMPORTED_MODULE_4__.getBooleanValidator)());
_Factory_js__WEBPACK_IMPORTED_MODULE_2__.Factory.addGetterSetter(Shape, 'shadowForStrokeEnabled', true, (0,_Validators_js__WEBPACK_IMPORTED_MODULE_4__.getBooleanValidator)());
_Factory_js__WEBPACK_IMPORTED_MODULE_2__.Factory.addGetterSetter(Shape, 'lineJoin');
_Factory_js__WEBPACK_IMPORTED_MODULE_2__.Factory.addGetterSetter(Shape, 'lineCap');
_Factory_js__WEBPACK_IMPORTED_MODULE_2__.Factory.addGetterSetter(Shape, 'sceneFunc');
_Factory_js__WEBPACK_IMPORTED_MODULE_2__.Factory.addGetterSetter(Shape, 'hitFunc');
_Factory_js__WEBPACK_IMPORTED_MODULE_2__.Factory.addGetterSetter(Shape, 'dash');
_Factory_js__WEBPACK_IMPORTED_MODULE_2__.Factory.addGetterSetter(Shape, 'dashOffset', 0, (0,_Validators_js__WEBPACK_IMPORTED_MODULE_4__.getNumberValidator)());
_Factory_js__WEBPACK_IMPORTED_MODULE_2__.Factory.addGetterSetter(Shape, 'shadowColor', undefined, (0,_Validators_js__WEBPACK_IMPORTED_MODULE_4__.getStringValidator)());
_Factory_js__WEBPACK_IMPORTED_MODULE_2__.Factory.addGetterSetter(Shape, 'shadowBlur', 0, (0,_Validators_js__WEBPACK_IMPORTED_MODULE_4__.getNumberValidator)());
_Factory_js__WEBPACK_IMPORTED_MODULE_2__.Factory.addGetterSetter(Shape, 'shadowOpacity', 1, (0,_Validators_js__WEBPACK_IMPORTED_MODULE_4__.getNumberValidator)());
_Factory_js__WEBPACK_IMPORTED_MODULE_2__.Factory.addComponentsGetterSetter(Shape, 'shadowOffset', ['x', 'y']);
_Factory_js__WEBPACK_IMPORTED_MODULE_2__.Factory.addGetterSetter(Shape, 'shadowOffsetX', 0, (0,_Validators_js__WEBPACK_IMPORTED_MODULE_4__.getNumberValidator)());
_Factory_js__WEBPACK_IMPORTED_MODULE_2__.Factory.addGetterSetter(Shape, 'shadowOffsetY', 0, (0,_Validators_js__WEBPACK_IMPORTED_MODULE_4__.getNumberValidator)());
_Factory_js__WEBPACK_IMPORTED_MODULE_2__.Factory.addGetterSetter(Shape, 'fillPatternImage');
_Factory_js__WEBPACK_IMPORTED_MODULE_2__.Factory.addGetterSetter(Shape, 'fill', undefined, (0,_Validators_js__WEBPACK_IMPORTED_MODULE_4__.getStringOrGradientValidator)());
_Factory_js__WEBPACK_IMPORTED_MODULE_2__.Factory.addGetterSetter(Shape, 'fillPatternX', 0, (0,_Validators_js__WEBPACK_IMPORTED_MODULE_4__.getNumberValidator)());
_Factory_js__WEBPACK_IMPORTED_MODULE_2__.Factory.addGetterSetter(Shape, 'fillPatternY', 0, (0,_Validators_js__WEBPACK_IMPORTED_MODULE_4__.getNumberValidator)());
_Factory_js__WEBPACK_IMPORTED_MODULE_2__.Factory.addGetterSetter(Shape, 'fillLinearGradientColorStops');
_Factory_js__WEBPACK_IMPORTED_MODULE_2__.Factory.addGetterSetter(Shape, 'strokeLinearGradientColorStops');
_Factory_js__WEBPACK_IMPORTED_MODULE_2__.Factory.addGetterSetter(Shape, 'fillRadialGradientStartRadius', 0);
_Factory_js__WEBPACK_IMPORTED_MODULE_2__.Factory.addGetterSetter(Shape, 'fillRadialGradientEndRadius', 0);
_Factory_js__WEBPACK_IMPORTED_MODULE_2__.Factory.addGetterSetter(Shape, 'fillRadialGradientColorStops');
_Factory_js__WEBPACK_IMPORTED_MODULE_2__.Factory.addGetterSetter(Shape, 'fillPatternRepeat', 'repeat');
_Factory_js__WEBPACK_IMPORTED_MODULE_2__.Factory.addGetterSetter(Shape, 'fillEnabled', true);
_Factory_js__WEBPACK_IMPORTED_MODULE_2__.Factory.addGetterSetter(Shape, 'strokeEnabled', true);
_Factory_js__WEBPACK_IMPORTED_MODULE_2__.Factory.addGetterSetter(Shape, 'shadowEnabled', true);
_Factory_js__WEBPACK_IMPORTED_MODULE_2__.Factory.addGetterSetter(Shape, 'dashEnabled', true);
_Factory_js__WEBPACK_IMPORTED_MODULE_2__.Factory.addGetterSetter(Shape, 'strokeScaleEnabled', true);
_Factory_js__WEBPACK_IMPORTED_MODULE_2__.Factory.addGetterSetter(Shape, 'fillPriority', 'color');
_Factory_js__WEBPACK_IMPORTED_MODULE_2__.Factory.addComponentsGetterSetter(Shape, 'fillPatternOffset', ['x', 'y']);
_Factory_js__WEBPACK_IMPORTED_MODULE_2__.Factory.addGetterSetter(Shape, 'fillPatternOffsetX', 0, (0,_Validators_js__WEBPACK_IMPORTED_MODULE_4__.getNumberValidator)());
_Factory_js__WEBPACK_IMPORTED_MODULE_2__.Factory.addGetterSetter(Shape, 'fillPatternOffsetY', 0, (0,_Validators_js__WEBPACK_IMPORTED_MODULE_4__.getNumberValidator)());
_Factory_js__WEBPACK_IMPORTED_MODULE_2__.Factory.addComponentsGetterSetter(Shape, 'fillPatternScale', ['x', 'y']);
_Factory_js__WEBPACK_IMPORTED_MODULE_2__.Factory.addGetterSetter(Shape, 'fillPatternScaleX', 1, (0,_Validators_js__WEBPACK_IMPORTED_MODULE_4__.getNumberValidator)());
_Factory_js__WEBPACK_IMPORTED_MODULE_2__.Factory.addGetterSetter(Shape, 'fillPatternScaleY', 1, (0,_Validators_js__WEBPACK_IMPORTED_MODULE_4__.getNumberValidator)());
_Factory_js__WEBPACK_IMPORTED_MODULE_2__.Factory.addComponentsGetterSetter(Shape, 'fillLinearGradientStartPoint', [
    'x',
    'y',
]);
_Factory_js__WEBPACK_IMPORTED_MODULE_2__.Factory.addComponentsGetterSetter(Shape, 'strokeLinearGradientStartPoint', [
    'x',
    'y',
]);
_Factory_js__WEBPACK_IMPORTED_MODULE_2__.Factory.addGetterSetter(Shape, 'fillLinearGradientStartPointX', 0);
_Factory_js__WEBPACK_IMPORTED_MODULE_2__.Factory.addGetterSetter(Shape, 'strokeLinearGradientStartPointX', 0);
_Factory_js__WEBPACK_IMPORTED_MODULE_2__.Factory.addGetterSetter(Shape, 'fillLinearGradientStartPointY', 0);
_Factory_js__WEBPACK_IMPORTED_MODULE_2__.Factory.addGetterSetter(Shape, 'strokeLinearGradientStartPointY', 0);
_Factory_js__WEBPACK_IMPORTED_MODULE_2__.Factory.addComponentsGetterSetter(Shape, 'fillLinearGradientEndPoint', [
    'x',
    'y',
]);
_Factory_js__WEBPACK_IMPORTED_MODULE_2__.Factory.addComponentsGetterSetter(Shape, 'strokeLinearGradientEndPoint', [
    'x',
    'y',
]);
_Factory_js__WEBPACK_IMPORTED_MODULE_2__.Factory.addGetterSetter(Shape, 'fillLinearGradientEndPointX', 0);
_Factory_js__WEBPACK_IMPORTED_MODULE_2__.Factory.addGetterSetter(Shape, 'strokeLinearGradientEndPointX', 0);
_Factory_js__WEBPACK_IMPORTED_MODULE_2__.Factory.addGetterSetter(Shape, 'fillLinearGradientEndPointY', 0);
_Factory_js__WEBPACK_IMPORTED_MODULE_2__.Factory.addGetterSetter(Shape, 'strokeLinearGradientEndPointY', 0);
_Factory_js__WEBPACK_IMPORTED_MODULE_2__.Factory.addComponentsGetterSetter(Shape, 'fillRadialGradientStartPoint', [
    'x',
    'y',
]);
_Factory_js__WEBPACK_IMPORTED_MODULE_2__.Factory.addGetterSetter(Shape, 'fillRadialGradientStartPointX', 0);
_Factory_js__WEBPACK_IMPORTED_MODULE_2__.Factory.addGetterSetter(Shape, 'fillRadialGradientStartPointY', 0);
_Factory_js__WEBPACK_IMPORTED_MODULE_2__.Factory.addComponentsGetterSetter(Shape, 'fillRadialGradientEndPoint', [
    'x',
    'y',
]);
_Factory_js__WEBPACK_IMPORTED_MODULE_2__.Factory.addGetterSetter(Shape, 'fillRadialGradientEndPointX', 0);
_Factory_js__WEBPACK_IMPORTED_MODULE_2__.Factory.addGetterSetter(Shape, 'fillRadialGradientEndPointY', 0);
_Factory_js__WEBPACK_IMPORTED_MODULE_2__.Factory.addGetterSetter(Shape, 'fillPatternRotation', 0);
_Factory_js__WEBPACK_IMPORTED_MODULE_2__.Factory.backCompat(Shape, {
    dashArray: 'dash',
    getDashArray: 'getDash',
    setDashArray: 'getDash',
    drawFunc: 'sceneFunc',
    getDrawFunc: 'getSceneFunc',
    setDrawFunc: 'setSceneFunc',
    drawHitFunc: 'hitFunc',
    getDrawHitFunc: 'getHitFunc',
    setDrawHitFunc: 'setHitFunc',
});


/***/ }),

/***/ "../../node_modules/konva/lib/Stage.js":
/*!*********************************************!*\
  !*** ../../node_modules/konva/lib/Stage.js ***!
  \*********************************************/
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "Stage": () => (/* binding */ Stage),
/* harmony export */   "stages": () => (/* binding */ stages)
/* harmony export */ });
/* harmony import */ var _Util_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./Util.js */ "../../node_modules/konva/lib/Util.js");
/* harmony import */ var _Factory_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./Factory.js */ "../../node_modules/konva/lib/Factory.js");
/* harmony import */ var _Container_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./Container.js */ "../../node_modules/konva/lib/Container.js");
/* harmony import */ var _Global_js__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./Global.js */ "../../node_modules/konva/lib/Global.js");
/* harmony import */ var _Canvas_js__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./Canvas.js */ "../../node_modules/konva/lib/Canvas.js");
/* harmony import */ var _DragAndDrop_js__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ./DragAndDrop.js */ "../../node_modules/konva/lib/DragAndDrop.js");
/* harmony import */ var _PointerEvents_js__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ./PointerEvents.js */ "../../node_modules/konva/lib/PointerEvents.js");








var STAGE = 'Stage', STRING = 'string', PX = 'px', MOUSEOUT = 'mouseout', MOUSELEAVE = 'mouseleave', MOUSEOVER = 'mouseover', MOUSEENTER = 'mouseenter', MOUSEMOVE = 'mousemove', MOUSEDOWN = 'mousedown', MOUSEUP = 'mouseup', POINTERMOVE = 'pointermove', POINTERDOWN = 'pointerdown', POINTERUP = 'pointerup', POINTERCANCEL = 'pointercancel', LOSTPOINTERCAPTURE = 'lostpointercapture', POINTEROUT = 'pointerout', POINTERLEAVE = 'pointerleave', POINTEROVER = 'pointerover', POINTERENTER = 'pointerenter', CONTEXTMENU = 'contextmenu', TOUCHSTART = 'touchstart', TOUCHEND = 'touchend', TOUCHMOVE = 'touchmove', TOUCHCANCEL = 'touchcancel', WHEEL = 'wheel', MAX_LAYERS_NUMBER = 5, EVENTS = [
    [MOUSEENTER, '_pointerenter'],
    [MOUSEDOWN, '_pointerdown'],
    [MOUSEMOVE, '_pointermove'],
    [MOUSEUP, '_pointerup'],
    [MOUSELEAVE, '_pointerleave'],
    [TOUCHSTART, '_pointerdown'],
    [TOUCHMOVE, '_pointermove'],
    [TOUCHEND, '_pointerup'],
    [TOUCHCANCEL, '_pointercancel'],
    [MOUSEOVER, '_pointerover'],
    [WHEEL, '_wheel'],
    [CONTEXTMENU, '_contextmenu'],
    [POINTERDOWN, '_pointerdown'],
    [POINTERMOVE, '_pointermove'],
    [POINTERUP, '_pointerup'],
    [POINTERCANCEL, '_pointercancel'],
    [LOSTPOINTERCAPTURE, '_lostpointercapture'],
];
const EVENTS_MAP = {
    mouse: {
        [POINTEROUT]: MOUSEOUT,
        [POINTERLEAVE]: MOUSELEAVE,
        [POINTEROVER]: MOUSEOVER,
        [POINTERENTER]: MOUSEENTER,
        [POINTERMOVE]: MOUSEMOVE,
        [POINTERDOWN]: MOUSEDOWN,
        [POINTERUP]: MOUSEUP,
        [POINTERCANCEL]: 'mousecancel',
        pointerclick: 'click',
        pointerdblclick: 'dblclick',
    },
    touch: {
        [POINTEROUT]: 'touchout',
        [POINTERLEAVE]: 'touchleave',
        [POINTEROVER]: 'touchover',
        [POINTERENTER]: 'touchenter',
        [POINTERMOVE]: TOUCHMOVE,
        [POINTERDOWN]: TOUCHSTART,
        [POINTERUP]: TOUCHEND,
        [POINTERCANCEL]: TOUCHCANCEL,
        pointerclick: 'tap',
        pointerdblclick: 'dbltap',
    },
    pointer: {
        [POINTEROUT]: POINTEROUT,
        [POINTERLEAVE]: POINTERLEAVE,
        [POINTEROVER]: POINTEROVER,
        [POINTERENTER]: POINTERENTER,
        [POINTERMOVE]: POINTERMOVE,
        [POINTERDOWN]: POINTERDOWN,
        [POINTERUP]: POINTERUP,
        [POINTERCANCEL]: POINTERCANCEL,
        pointerclick: 'pointerclick',
        pointerdblclick: 'pointerdblclick',
    },
};
const getEventType = (type) => {
    if (type.indexOf('pointer') >= 0) {
        return 'pointer';
    }
    if (type.indexOf('touch') >= 0) {
        return 'touch';
    }
    return 'mouse';
};
const getEventsMap = (eventType) => {
    const type = getEventType(eventType);
    if (type === 'pointer') {
        return _Global_js__WEBPACK_IMPORTED_MODULE_3__.Konva.pointerEventsEnabled && EVENTS_MAP.pointer;
    }
    if (type === 'touch') {
        return EVENTS_MAP.touch;
    }
    if (type === 'mouse') {
        return EVENTS_MAP.mouse;
    }
};
function checkNoClip(attrs = {}) {
    if (attrs.clipFunc || attrs.clipWidth || attrs.clipHeight) {
        _Util_js__WEBPACK_IMPORTED_MODULE_0__.Util.warn('Stage does not support clipping. Please use clip for Layers or Groups.');
    }
    return attrs;
}
const NO_POINTERS_MESSAGE = `Pointer position is missing and not registered by the stage. Looks like it is outside of the stage container. You can set it manually from event: stage.setPointersPositions(event);`;
const stages = [];
class Stage extends _Container_js__WEBPACK_IMPORTED_MODULE_2__.Container {
    constructor(config) {
        super(checkNoClip(config));
        this._pointerPositions = [];
        this._changedPointerPositions = [];
        this._buildDOM();
        this._bindContentEvents();
        stages.push(this);
        this.on('widthChange.konva heightChange.konva', this._resizeDOM);
        this.on('visibleChange.konva', this._checkVisibility);
        this.on('clipWidthChange.konva clipHeightChange.konva clipFuncChange.konva', () => {
            checkNoClip(this.attrs);
        });
        this._checkVisibility();
    }
    _validateAdd(child) {
        const isLayer = child.getType() === 'Layer';
        const isFastLayer = child.getType() === 'FastLayer';
        const valid = isLayer || isFastLayer;
        if (!valid) {
            _Util_js__WEBPACK_IMPORTED_MODULE_0__.Util["throw"]('You may only add layers to the stage.');
        }
    }
    _checkVisibility() {
        if (!this.content) {
            return;
        }
        const style = this.visible() ? '' : 'none';
        this.content.style.display = style;
    }
    setContainer(container) {
        if (typeof container === STRING) {
            if (container.charAt(0) === '.') {
                var className = container.slice(1);
                container = document.getElementsByClassName(className)[0];
            }
            else {
                var id;
                if (container.charAt(0) !== '#') {
                    id = container;
                }
                else {
                    id = container.slice(1);
                }
                container = document.getElementById(id);
            }
            if (!container) {
                throw 'Can not find container in document with id ' + id;
            }
        }
        this._setAttr('container', container);
        if (this.content) {
            if (this.content.parentElement) {
                this.content.parentElement.removeChild(this.content);
            }
            container.appendChild(this.content);
        }
        return this;
    }
    shouldDrawHit() {
        return true;
    }
    clear() {
        var layers = this.children, len = layers.length, n;
        for (n = 0; n < len; n++) {
            layers[n].clear();
        }
        return this;
    }
    clone(obj) {
        if (!obj) {
            obj = {};
        }
        obj.container =
            typeof document !== 'undefined' && document.createElement('div');
        return _Container_js__WEBPACK_IMPORTED_MODULE_2__.Container.prototype.clone.call(this, obj);
    }
    destroy() {
        super.destroy();
        var content = this.content;
        if (content && _Util_js__WEBPACK_IMPORTED_MODULE_0__.Util._isInDocument(content)) {
            this.container().removeChild(content);
        }
        var index = stages.indexOf(this);
        if (index > -1) {
            stages.splice(index, 1);
        }
        _Util_js__WEBPACK_IMPORTED_MODULE_0__.Util.releaseCanvas(this.bufferCanvas._canvas, this.bufferHitCanvas._canvas);
        return this;
    }
    getPointerPosition() {
        const pos = this._pointerPositions[0] || this._changedPointerPositions[0];
        if (!pos) {
            _Util_js__WEBPACK_IMPORTED_MODULE_0__.Util.warn(NO_POINTERS_MESSAGE);
            return null;
        }
        return {
            x: pos.x,
            y: pos.y,
        };
    }
    _getPointerById(id) {
        return this._pointerPositions.find((p) => p.id === id);
    }
    getPointersPositions() {
        return this._pointerPositions;
    }
    getStage() {
        return this;
    }
    getContent() {
        return this.content;
    }
    _toKonvaCanvas(config) {
        config = config || {};
        config.x = config.x || 0;
        config.y = config.y || 0;
        config.width = config.width || this.width();
        config.height = config.height || this.height();
        var canvas = new _Canvas_js__WEBPACK_IMPORTED_MODULE_4__.SceneCanvas({
            width: config.width,
            height: config.height,
            pixelRatio: config.pixelRatio || 1,
        });
        var _context = canvas.getContext()._context;
        var layers = this.children;
        if (config.x || config.y) {
            _context.translate(-1 * config.x, -1 * config.y);
        }
        layers.forEach(function (layer) {
            if (!layer.isVisible()) {
                return;
            }
            var layerCanvas = layer._toKonvaCanvas(config);
            _context.drawImage(layerCanvas._canvas, config.x, config.y, layerCanvas.getWidth() / layerCanvas.getPixelRatio(), layerCanvas.getHeight() / layerCanvas.getPixelRatio());
        });
        return canvas;
    }
    getIntersection(pos) {
        if (!pos) {
            return null;
        }
        var layers = this.children, len = layers.length, end = len - 1, n;
        for (n = end; n >= 0; n--) {
            const shape = layers[n].getIntersection(pos);
            if (shape) {
                return shape;
            }
        }
        return null;
    }
    _resizeDOM() {
        var width = this.width();
        var height = this.height();
        if (this.content) {
            this.content.style.width = width + PX;
            this.content.style.height = height + PX;
        }
        this.bufferCanvas.setSize(width, height);
        this.bufferHitCanvas.setSize(width, height);
        this.children.forEach((layer) => {
            layer.setSize({ width, height });
            layer.draw();
        });
    }
    add(layer, ...rest) {
        if (arguments.length > 1) {
            for (var i = 0; i < arguments.length; i++) {
                this.add(arguments[i]);
            }
            return this;
        }
        super.add(layer);
        var length = this.children.length;
        if (length > MAX_LAYERS_NUMBER) {
            _Util_js__WEBPACK_IMPORTED_MODULE_0__.Util.warn('The stage has ' +
                length +
                ' layers. Recommended maximum number of layers is 3-5. Adding more layers into the stage may drop the performance. Rethink your tree structure, you can use Konva.Group.');
        }
        layer.setSize({ width: this.width(), height: this.height() });
        layer.draw();
        if (_Global_js__WEBPACK_IMPORTED_MODULE_3__.Konva.isBrowser) {
            this.content.appendChild(layer.canvas._canvas);
        }
        return this;
    }
    getParent() {
        return null;
    }
    getLayer() {
        return null;
    }
    hasPointerCapture(pointerId) {
        return _PointerEvents_js__WEBPACK_IMPORTED_MODULE_6__.hasPointerCapture(pointerId, this);
    }
    setPointerCapture(pointerId) {
        _PointerEvents_js__WEBPACK_IMPORTED_MODULE_6__.setPointerCapture(pointerId, this);
    }
    releaseCapture(pointerId) {
        _PointerEvents_js__WEBPACK_IMPORTED_MODULE_6__.releaseCapture(pointerId, this);
    }
    getLayers() {
        return this.children;
    }
    _bindContentEvents() {
        if (!_Global_js__WEBPACK_IMPORTED_MODULE_3__.Konva.isBrowser) {
            return;
        }
        EVENTS.forEach(([event, methodName]) => {
            this.content.addEventListener(event, (evt) => {
                this[methodName](evt);
            }, { passive: false });
        });
    }
    _pointerenter(evt) {
        this.setPointersPositions(evt);
        const events = getEventsMap(evt.type);
        this._fire(events.pointerenter, {
            evt: evt,
            target: this,
            currentTarget: this,
        });
    }
    _pointerover(evt) {
        this.setPointersPositions(evt);
        const events = getEventsMap(evt.type);
        this._fire(events.pointerover, {
            evt: evt,
            target: this,
            currentTarget: this,
        });
    }
    _getTargetShape(evenType) {
        let shape = this[evenType + 'targetShape'];
        if (shape && !shape.getStage()) {
            shape = null;
        }
        return shape;
    }
    _pointerleave(evt) {
        const events = getEventsMap(evt.type);
        const eventType = getEventType(evt.type);
        if (!events) {
            return;
        }
        this.setPointersPositions(evt);
        var targetShape = this._getTargetShape(eventType);
        var eventsEnabled = !_DragAndDrop_js__WEBPACK_IMPORTED_MODULE_5__.DD.isDragging || _Global_js__WEBPACK_IMPORTED_MODULE_3__.Konva.hitOnDragEnabled;
        if (targetShape && eventsEnabled) {
            targetShape._fireAndBubble(events.pointerout, { evt: evt });
            targetShape._fireAndBubble(events.pointerleave, { evt: evt });
            this._fire(events.pointerleave, {
                evt: evt,
                target: this,
                currentTarget: this,
            });
            this[eventType + 'targetShape'] = null;
        }
        else if (eventsEnabled) {
            this._fire(events.pointerleave, {
                evt: evt,
                target: this,
                currentTarget: this,
            });
            this._fire(events.pointerout, {
                evt: evt,
                target: this,
                currentTarget: this,
            });
        }
        this.pointerPos = undefined;
        this._pointerPositions = [];
    }
    _pointerdown(evt) {
        const events = getEventsMap(evt.type);
        const eventType = getEventType(evt.type);
        if (!events) {
            return;
        }
        this.setPointersPositions(evt);
        var triggeredOnShape = false;
        this._changedPointerPositions.forEach((pos) => {
            var shape = this.getIntersection(pos);
            _DragAndDrop_js__WEBPACK_IMPORTED_MODULE_5__.DD.justDragged = false;
            _Global_js__WEBPACK_IMPORTED_MODULE_3__.Konva['_' + eventType + 'ListenClick'] = true;
            const hasShape = shape && shape.isListening();
            if (!hasShape) {
                return;
            }
            if (_Global_js__WEBPACK_IMPORTED_MODULE_3__.Konva.capturePointerEventsEnabled) {
                shape.setPointerCapture(pos.id);
            }
            this[eventType + 'ClickStartShape'] = shape;
            shape._fireAndBubble(events.pointerdown, {
                evt: evt,
                pointerId: pos.id,
            });
            triggeredOnShape = true;
            const isTouch = evt.type.indexOf('touch') >= 0;
            if (shape.preventDefault() && evt.cancelable && isTouch) {
                evt.preventDefault();
            }
        });
        if (!triggeredOnShape) {
            this._fire(events.pointerdown, {
                evt: evt,
                target: this,
                currentTarget: this,
                pointerId: this._pointerPositions[0].id,
            });
        }
    }
    _pointermove(evt) {
        const events = getEventsMap(evt.type);
        const eventType = getEventType(evt.type);
        if (!events) {
            return;
        }
        if (_DragAndDrop_js__WEBPACK_IMPORTED_MODULE_5__.DD.isDragging && _DragAndDrop_js__WEBPACK_IMPORTED_MODULE_5__.DD.node.preventDefault() && evt.cancelable) {
            evt.preventDefault();
        }
        this.setPointersPositions(evt);
        var eventsEnabled = !_DragAndDrop_js__WEBPACK_IMPORTED_MODULE_5__.DD.isDragging || _Global_js__WEBPACK_IMPORTED_MODULE_3__.Konva.hitOnDragEnabled;
        if (!eventsEnabled) {
            return;
        }
        var processedShapesIds = {};
        let triggeredOnShape = false;
        var targetShape = this._getTargetShape(eventType);
        this._changedPointerPositions.forEach((pos) => {
            const shape = (_PointerEvents_js__WEBPACK_IMPORTED_MODULE_6__.getCapturedShape(pos.id) ||
                this.getIntersection(pos));
            const pointerId = pos.id;
            const event = { evt: evt, pointerId };
            var differentTarget = targetShape !== shape;
            if (differentTarget && targetShape) {
                targetShape._fireAndBubble(events.pointerout, Object.assign({}, event), shape);
                targetShape._fireAndBubble(events.pointerleave, Object.assign({}, event), shape);
            }
            if (shape) {
                if (processedShapesIds[shape._id]) {
                    return;
                }
                processedShapesIds[shape._id] = true;
            }
            if (shape && shape.isListening()) {
                triggeredOnShape = true;
                if (differentTarget) {
                    shape._fireAndBubble(events.pointerover, Object.assign({}, event), targetShape);
                    shape._fireAndBubble(events.pointerenter, Object.assign({}, event), targetShape);
                    this[eventType + 'targetShape'] = shape;
                }
                shape._fireAndBubble(events.pointermove, Object.assign({}, event));
            }
            else {
                if (targetShape) {
                    this._fire(events.pointerover, {
                        evt: evt,
                        target: this,
                        currentTarget: this,
                        pointerId,
                    });
                    this[eventType + 'targetShape'] = null;
                }
            }
        });
        if (!triggeredOnShape) {
            this._fire(events.pointermove, {
                evt: evt,
                target: this,
                currentTarget: this,
                pointerId: this._changedPointerPositions[0].id,
            });
        }
    }
    _pointerup(evt) {
        const events = getEventsMap(evt.type);
        const eventType = getEventType(evt.type);
        if (!events) {
            return;
        }
        this.setPointersPositions(evt);
        const clickStartShape = this[eventType + 'ClickStartShape'];
        const clickEndShape = this[eventType + 'ClickEndShape'];
        var processedShapesIds = {};
        let triggeredOnShape = false;
        this._changedPointerPositions.forEach((pos) => {
            const shape = (_PointerEvents_js__WEBPACK_IMPORTED_MODULE_6__.getCapturedShape(pos.id) ||
                this.getIntersection(pos));
            if (shape) {
                shape.releaseCapture(pos.id);
                if (processedShapesIds[shape._id]) {
                    return;
                }
                processedShapesIds[shape._id] = true;
            }
            const pointerId = pos.id;
            const event = { evt: evt, pointerId };
            let fireDblClick = false;
            if (_Global_js__WEBPACK_IMPORTED_MODULE_3__.Konva['_' + eventType + 'InDblClickWindow']) {
                fireDblClick = true;
                clearTimeout(this[eventType + 'DblTimeout']);
            }
            else if (!_DragAndDrop_js__WEBPACK_IMPORTED_MODULE_5__.DD.justDragged) {
                _Global_js__WEBPACK_IMPORTED_MODULE_3__.Konva['_' + eventType + 'InDblClickWindow'] = true;
                clearTimeout(this[eventType + 'DblTimeout']);
            }
            this[eventType + 'DblTimeout'] = setTimeout(function () {
                _Global_js__WEBPACK_IMPORTED_MODULE_3__.Konva['_' + eventType + 'InDblClickWindow'] = false;
            }, _Global_js__WEBPACK_IMPORTED_MODULE_3__.Konva.dblClickWindow);
            if (shape && shape.isListening()) {
                triggeredOnShape = true;
                this[eventType + 'ClickEndShape'] = shape;
                shape._fireAndBubble(events.pointerup, Object.assign({}, event));
                if (_Global_js__WEBPACK_IMPORTED_MODULE_3__.Konva['_' + eventType + 'ListenClick'] &&
                    clickStartShape &&
                    clickStartShape === shape) {
                    shape._fireAndBubble(events.pointerclick, Object.assign({}, event));
                    if (fireDblClick && clickEndShape && clickEndShape === shape) {
                        shape._fireAndBubble(events.pointerdblclick, Object.assign({}, event));
                    }
                }
            }
            else {
                this[eventType + 'ClickEndShape'] = null;
                if (_Global_js__WEBPACK_IMPORTED_MODULE_3__.Konva['_' + eventType + 'ListenClick']) {
                    this._fire(events.pointerclick, {
                        evt: evt,
                        target: this,
                        currentTarget: this,
                        pointerId,
                    });
                }
                if (fireDblClick) {
                    this._fire(events.pointerdblclick, {
                        evt: evt,
                        target: this,
                        currentTarget: this,
                        pointerId,
                    });
                }
            }
        });
        if (!triggeredOnShape) {
            this._fire(events.pointerup, {
                evt: evt,
                target: this,
                currentTarget: this,
                pointerId: this._changedPointerPositions[0].id,
            });
        }
        _Global_js__WEBPACK_IMPORTED_MODULE_3__.Konva['_' + eventType + 'ListenClick'] = false;
        if (evt.cancelable && eventType !== 'touch') {
            evt.preventDefault();
        }
    }
    _contextmenu(evt) {
        this.setPointersPositions(evt);
        var shape = this.getIntersection(this.getPointerPosition());
        if (shape && shape.isListening()) {
            shape._fireAndBubble(CONTEXTMENU, { evt: evt });
        }
        else {
            this._fire(CONTEXTMENU, {
                evt: evt,
                target: this,
                currentTarget: this,
            });
        }
    }
    _wheel(evt) {
        this.setPointersPositions(evt);
        var shape = this.getIntersection(this.getPointerPosition());
        if (shape && shape.isListening()) {
            shape._fireAndBubble(WHEEL, { evt: evt });
        }
        else {
            this._fire(WHEEL, {
                evt: evt,
                target: this,
                currentTarget: this,
            });
        }
    }
    _pointercancel(evt) {
        this.setPointersPositions(evt);
        const shape = _PointerEvents_js__WEBPACK_IMPORTED_MODULE_6__.getCapturedShape(evt.pointerId) ||
            this.getIntersection(this.getPointerPosition());
        if (shape) {
            shape._fireAndBubble(POINTERUP, _PointerEvents_js__WEBPACK_IMPORTED_MODULE_6__.createEvent(evt));
        }
        _PointerEvents_js__WEBPACK_IMPORTED_MODULE_6__.releaseCapture(evt.pointerId);
    }
    _lostpointercapture(evt) {
        _PointerEvents_js__WEBPACK_IMPORTED_MODULE_6__.releaseCapture(evt.pointerId);
    }
    setPointersPositions(evt) {
        var contentPosition = this._getContentPosition(), x = null, y = null;
        evt = evt ? evt : window.event;
        if (evt.touches !== undefined) {
            this._pointerPositions = [];
            this._changedPointerPositions = [];
            Array.prototype.forEach.call(evt.touches, (touch) => {
                this._pointerPositions.push({
                    id: touch.identifier,
                    x: (touch.clientX - contentPosition.left) / contentPosition.scaleX,
                    y: (touch.clientY - contentPosition.top) / contentPosition.scaleY,
                });
            });
            Array.prototype.forEach.call(evt.changedTouches || evt.touches, (touch) => {
                this._changedPointerPositions.push({
                    id: touch.identifier,
                    x: (touch.clientX - contentPosition.left) / contentPosition.scaleX,
                    y: (touch.clientY - contentPosition.top) / contentPosition.scaleY,
                });
            });
        }
        else {
            x = (evt.clientX - contentPosition.left) / contentPosition.scaleX;
            y = (evt.clientY - contentPosition.top) / contentPosition.scaleY;
            this.pointerPos = {
                x: x,
                y: y,
            };
            this._pointerPositions = [{ x, y, id: _Util_js__WEBPACK_IMPORTED_MODULE_0__.Util._getFirstPointerId(evt) }];
            this._changedPointerPositions = [
                { x, y, id: _Util_js__WEBPACK_IMPORTED_MODULE_0__.Util._getFirstPointerId(evt) },
            ];
        }
    }
    _setPointerPosition(evt) {
        _Util_js__WEBPACK_IMPORTED_MODULE_0__.Util.warn('Method _setPointerPosition is deprecated. Use "stage.setPointersPositions(event)" instead.');
        this.setPointersPositions(evt);
    }
    _getContentPosition() {
        if (!this.content || !this.content.getBoundingClientRect) {
            return {
                top: 0,
                left: 0,
                scaleX: 1,
                scaleY: 1,
            };
        }
        var rect = this.content.getBoundingClientRect();
        return {
            top: rect.top,
            left: rect.left,
            scaleX: rect.width / this.content.clientWidth || 1,
            scaleY: rect.height / this.content.clientHeight || 1,
        };
    }
    _buildDOM() {
        this.bufferCanvas = new _Canvas_js__WEBPACK_IMPORTED_MODULE_4__.SceneCanvas({
            width: this.width(),
            height: this.height(),
        });
        this.bufferHitCanvas = new _Canvas_js__WEBPACK_IMPORTED_MODULE_4__.HitCanvas({
            pixelRatio: 1,
            width: this.width(),
            height: this.height(),
        });
        if (!_Global_js__WEBPACK_IMPORTED_MODULE_3__.Konva.isBrowser) {
            return;
        }
        var container = this.container();
        if (!container) {
            throw 'Stage has no container. A container is required.';
        }
        container.innerHTML = '';
        this.content = document.createElement('div');
        this.content.style.position = 'relative';
        this.content.style.userSelect = 'none';
        this.content.className = 'konvajs-content';
        this.content.setAttribute('role', 'presentation');
        container.appendChild(this.content);
        this._resizeDOM();
    }
    cache() {
        _Util_js__WEBPACK_IMPORTED_MODULE_0__.Util.warn('Cache function is not allowed for stage. You may use cache only for layers, groups and shapes.');
        return this;
    }
    clearCache() {
        return this;
    }
    batchDraw() {
        this.getChildren().forEach(function (layer) {
            layer.batchDraw();
        });
        return this;
    }
}
Stage.prototype.nodeType = STAGE;
(0,_Global_js__WEBPACK_IMPORTED_MODULE_3__._registerNode)(Stage);
_Factory_js__WEBPACK_IMPORTED_MODULE_1__.Factory.addGetterSetter(Stage, 'container');


/***/ }),

/***/ "../../node_modules/konva/lib/Tween.js":
/*!*********************************************!*\
  !*** ../../node_modules/konva/lib/Tween.js ***!
  \*********************************************/
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "Easings": () => (/* binding */ Easings),
/* harmony export */   "Tween": () => (/* binding */ Tween)
/* harmony export */ });
/* harmony import */ var _Util_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./Util.js */ "../../node_modules/konva/lib/Util.js");
/* harmony import */ var _Animation_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./Animation.js */ "../../node_modules/konva/lib/Animation.js");
/* harmony import */ var _Node_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./Node.js */ "../../node_modules/konva/lib/Node.js");
/* harmony import */ var _Global_js__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./Global.js */ "../../node_modules/konva/lib/Global.js");




var blacklist = {
    node: 1,
    duration: 1,
    easing: 1,
    onFinish: 1,
    yoyo: 1,
}, PAUSED = 1, PLAYING = 2, REVERSING = 3, idCounter = 0, colorAttrs = ['fill', 'stroke', 'shadowColor'];
class TweenEngine {
    constructor(prop, propFunc, func, begin, finish, duration, yoyo) {
        this.prop = prop;
        this.propFunc = propFunc;
        this.begin = begin;
        this._pos = begin;
        this.duration = duration;
        this._change = 0;
        this.prevPos = 0;
        this.yoyo = yoyo;
        this._time = 0;
        this._position = 0;
        this._startTime = 0;
        this._finish = 0;
        this.func = func;
        this._change = finish - this.begin;
        this.pause();
    }
    fire(str) {
        var handler = this[str];
        if (handler) {
            handler();
        }
    }
    setTime(t) {
        if (t > this.duration) {
            if (this.yoyo) {
                this._time = this.duration;
                this.reverse();
            }
            else {
                this.finish();
            }
        }
        else if (t < 0) {
            if (this.yoyo) {
                this._time = 0;
                this.play();
            }
            else {
                this.reset();
            }
        }
        else {
            this._time = t;
            this.update();
        }
    }
    getTime() {
        return this._time;
    }
    setPosition(p) {
        this.prevPos = this._pos;
        this.propFunc(p);
        this._pos = p;
    }
    getPosition(t) {
        if (t === undefined) {
            t = this._time;
        }
        return this.func(t, this.begin, this._change, this.duration);
    }
    play() {
        this.state = PLAYING;
        this._startTime = this.getTimer() - this._time;
        this.onEnterFrame();
        this.fire('onPlay');
    }
    reverse() {
        this.state = REVERSING;
        this._time = this.duration - this._time;
        this._startTime = this.getTimer() - this._time;
        this.onEnterFrame();
        this.fire('onReverse');
    }
    seek(t) {
        this.pause();
        this._time = t;
        this.update();
        this.fire('onSeek');
    }
    reset() {
        this.pause();
        this._time = 0;
        this.update();
        this.fire('onReset');
    }
    finish() {
        this.pause();
        this._time = this.duration;
        this.update();
        this.fire('onFinish');
    }
    update() {
        this.setPosition(this.getPosition(this._time));
        this.fire('onUpdate');
    }
    onEnterFrame() {
        var t = this.getTimer() - this._startTime;
        if (this.state === PLAYING) {
            this.setTime(t);
        }
        else if (this.state === REVERSING) {
            this.setTime(this.duration - t);
        }
    }
    pause() {
        this.state = PAUSED;
        this.fire('onPause');
    }
    getTimer() {
        return new Date().getTime();
    }
}
class Tween {
    constructor(config) {
        var that = this, node = config.node, nodeId = node._id, duration, easing = config.easing || Easings.Linear, yoyo = !!config.yoyo, key;
        if (typeof config.duration === 'undefined') {
            duration = 0.3;
        }
        else if (config.duration === 0) {
            duration = 0.001;
        }
        else {
            duration = config.duration;
        }
        this.node = node;
        this._id = idCounter++;
        var layers = node.getLayer() ||
            (node instanceof _Global_js__WEBPACK_IMPORTED_MODULE_3__.Konva.Stage ? node.getLayers() : null);
        if (!layers) {
            _Util_js__WEBPACK_IMPORTED_MODULE_0__.Util.error('Tween constructor have `node` that is not in a layer. Please add node into layer first.');
        }
        this.anim = new _Animation_js__WEBPACK_IMPORTED_MODULE_1__.Animation(function () {
            that.tween.onEnterFrame();
        }, layers);
        this.tween = new TweenEngine(key, function (i) {
            that._tweenFunc(i);
        }, easing, 0, 1, duration * 1000, yoyo);
        this._addListeners();
        if (!Tween.attrs[nodeId]) {
            Tween.attrs[nodeId] = {};
        }
        if (!Tween.attrs[nodeId][this._id]) {
            Tween.attrs[nodeId][this._id] = {};
        }
        if (!Tween.tweens[nodeId]) {
            Tween.tweens[nodeId] = {};
        }
        for (key in config) {
            if (blacklist[key] === undefined) {
                this._addAttr(key, config[key]);
            }
        }
        this.reset();
        this.onFinish = config.onFinish;
        this.onReset = config.onReset;
        this.onUpdate = config.onUpdate;
    }
    _addAttr(key, end) {
        var node = this.node, nodeId = node._id, start, diff, tweenId, n, len, trueEnd, trueStart, endRGBA;
        tweenId = Tween.tweens[nodeId][key];
        if (tweenId) {
            delete Tween.attrs[nodeId][tweenId][key];
        }
        start = node.getAttr(key);
        if (_Util_js__WEBPACK_IMPORTED_MODULE_0__.Util._isArray(end)) {
            diff = [];
            len = Math.max(end.length, start.length);
            if (key === 'points' && end.length !== start.length) {
                if (end.length > start.length) {
                    trueStart = start;
                    start = _Util_js__WEBPACK_IMPORTED_MODULE_0__.Util._prepareArrayForTween(start, end, node.closed());
                }
                else {
                    trueEnd = end;
                    end = _Util_js__WEBPACK_IMPORTED_MODULE_0__.Util._prepareArrayForTween(end, start, node.closed());
                }
            }
            if (key.indexOf('fill') === 0) {
                for (n = 0; n < len; n++) {
                    if (n % 2 === 0) {
                        diff.push(end[n] - start[n]);
                    }
                    else {
                        var startRGBA = _Util_js__WEBPACK_IMPORTED_MODULE_0__.Util.colorToRGBA(start[n]);
                        endRGBA = _Util_js__WEBPACK_IMPORTED_MODULE_0__.Util.colorToRGBA(end[n]);
                        start[n] = startRGBA;
                        diff.push({
                            r: endRGBA.r - startRGBA.r,
                            g: endRGBA.g - startRGBA.g,
                            b: endRGBA.b - startRGBA.b,
                            a: endRGBA.a - startRGBA.a,
                        });
                    }
                }
            }
            else {
                for (n = 0; n < len; n++) {
                    diff.push(end[n] - start[n]);
                }
            }
        }
        else if (colorAttrs.indexOf(key) !== -1) {
            start = _Util_js__WEBPACK_IMPORTED_MODULE_0__.Util.colorToRGBA(start);
            endRGBA = _Util_js__WEBPACK_IMPORTED_MODULE_0__.Util.colorToRGBA(end);
            diff = {
                r: endRGBA.r - start.r,
                g: endRGBA.g - start.g,
                b: endRGBA.b - start.b,
                a: endRGBA.a - start.a,
            };
        }
        else {
            diff = end - start;
        }
        Tween.attrs[nodeId][this._id][key] = {
            start: start,
            diff: diff,
            end: end,
            trueEnd: trueEnd,
            trueStart: trueStart,
        };
        Tween.tweens[nodeId][key] = this._id;
    }
    _tweenFunc(i) {
        var node = this.node, attrs = Tween.attrs[node._id][this._id], key, attr, start, diff, newVal, n, len, end;
        for (key in attrs) {
            attr = attrs[key];
            start = attr.start;
            diff = attr.diff;
            end = attr.end;
            if (_Util_js__WEBPACK_IMPORTED_MODULE_0__.Util._isArray(start)) {
                newVal = [];
                len = Math.max(start.length, end.length);
                if (key.indexOf('fill') === 0) {
                    for (n = 0; n < len; n++) {
                        if (n % 2 === 0) {
                            newVal.push((start[n] || 0) + diff[n] * i);
                        }
                        else {
                            newVal.push('rgba(' +
                                Math.round(start[n].r + diff[n].r * i) +
                                ',' +
                                Math.round(start[n].g + diff[n].g * i) +
                                ',' +
                                Math.round(start[n].b + diff[n].b * i) +
                                ',' +
                                (start[n].a + diff[n].a * i) +
                                ')');
                        }
                    }
                }
                else {
                    for (n = 0; n < len; n++) {
                        newVal.push((start[n] || 0) + diff[n] * i);
                    }
                }
            }
            else if (colorAttrs.indexOf(key) !== -1) {
                newVal =
                    'rgba(' +
                        Math.round(start.r + diff.r * i) +
                        ',' +
                        Math.round(start.g + diff.g * i) +
                        ',' +
                        Math.round(start.b + diff.b * i) +
                        ',' +
                        (start.a + diff.a * i) +
                        ')';
            }
            else {
                newVal = start + diff * i;
            }
            node.setAttr(key, newVal);
        }
    }
    _addListeners() {
        this.tween.onPlay = () => {
            this.anim.start();
        };
        this.tween.onReverse = () => {
            this.anim.start();
        };
        this.tween.onPause = () => {
            this.anim.stop();
        };
        this.tween.onFinish = () => {
            var node = this.node;
            var attrs = Tween.attrs[node._id][this._id];
            if (attrs.points && attrs.points.trueEnd) {
                node.setAttr('points', attrs.points.trueEnd);
            }
            if (this.onFinish) {
                this.onFinish.call(this);
            }
        };
        this.tween.onReset = () => {
            var node = this.node;
            var attrs = Tween.attrs[node._id][this._id];
            if (attrs.points && attrs.points.trueStart) {
                node.points(attrs.points.trueStart);
            }
            if (this.onReset) {
                this.onReset();
            }
        };
        this.tween.onUpdate = () => {
            if (this.onUpdate) {
                this.onUpdate.call(this);
            }
        };
    }
    play() {
        this.tween.play();
        return this;
    }
    reverse() {
        this.tween.reverse();
        return this;
    }
    reset() {
        this.tween.reset();
        return this;
    }
    seek(t) {
        this.tween.seek(t * 1000);
        return this;
    }
    pause() {
        this.tween.pause();
        return this;
    }
    finish() {
        this.tween.finish();
        return this;
    }
    destroy() {
        var nodeId = this.node._id, thisId = this._id, attrs = Tween.tweens[nodeId], key;
        this.pause();
        for (key in attrs) {
            delete Tween.tweens[nodeId][key];
        }
        delete Tween.attrs[nodeId][thisId];
    }
}
Tween.attrs = {};
Tween.tweens = {};
_Node_js__WEBPACK_IMPORTED_MODULE_2__.Node.prototype.to = function (params) {
    var onFinish = params.onFinish;
    params.node = this;
    params.onFinish = function () {
        this.destroy();
        if (onFinish) {
            onFinish();
        }
    };
    var tween = new Tween(params);
    tween.play();
};
const Easings = {
    BackEaseIn(t, b, c, d) {
        var s = 1.70158;
        return c * (t /= d) * t * ((s + 1) * t - s) + b;
    },
    BackEaseOut(t, b, c, d) {
        var s = 1.70158;
        return c * ((t = t / d - 1) * t * ((s + 1) * t + s) + 1) + b;
    },
    BackEaseInOut(t, b, c, d) {
        var s = 1.70158;
        if ((t /= d / 2) < 1) {
            return (c / 2) * (t * t * (((s *= 1.525) + 1) * t - s)) + b;
        }
        return (c / 2) * ((t -= 2) * t * (((s *= 1.525) + 1) * t + s) + 2) + b;
    },
    ElasticEaseIn(t, b, c, d, a, p) {
        var s = 0;
        if (t === 0) {
            return b;
        }
        if ((t /= d) === 1) {
            return b + c;
        }
        if (!p) {
            p = d * 0.3;
        }
        if (!a || a < Math.abs(c)) {
            a = c;
            s = p / 4;
        }
        else {
            s = (p / (2 * Math.PI)) * Math.asin(c / a);
        }
        return (-(a *
            Math.pow(2, 10 * (t -= 1)) *
            Math.sin(((t * d - s) * (2 * Math.PI)) / p)) + b);
    },
    ElasticEaseOut(t, b, c, d, a, p) {
        var s = 0;
        if (t === 0) {
            return b;
        }
        if ((t /= d) === 1) {
            return b + c;
        }
        if (!p) {
            p = d * 0.3;
        }
        if (!a || a < Math.abs(c)) {
            a = c;
            s = p / 4;
        }
        else {
            s = (p / (2 * Math.PI)) * Math.asin(c / a);
        }
        return (a * Math.pow(2, -10 * t) * Math.sin(((t * d - s) * (2 * Math.PI)) / p) +
            c +
            b);
    },
    ElasticEaseInOut(t, b, c, d, a, p) {
        var s = 0;
        if (t === 0) {
            return b;
        }
        if ((t /= d / 2) === 2) {
            return b + c;
        }
        if (!p) {
            p = d * (0.3 * 1.5);
        }
        if (!a || a < Math.abs(c)) {
            a = c;
            s = p / 4;
        }
        else {
            s = (p / (2 * Math.PI)) * Math.asin(c / a);
        }
        if (t < 1) {
            return (-0.5 *
                (a *
                    Math.pow(2, 10 * (t -= 1)) *
                    Math.sin(((t * d - s) * (2 * Math.PI)) / p)) +
                b);
        }
        return (a *
            Math.pow(2, -10 * (t -= 1)) *
            Math.sin(((t * d - s) * (2 * Math.PI)) / p) *
            0.5 +
            c +
            b);
    },
    BounceEaseOut(t, b, c, d) {
        if ((t /= d) < 1 / 2.75) {
            return c * (7.5625 * t * t) + b;
        }
        else if (t < 2 / 2.75) {
            return c * (7.5625 * (t -= 1.5 / 2.75) * t + 0.75) + b;
        }
        else if (t < 2.5 / 2.75) {
            return c * (7.5625 * (t -= 2.25 / 2.75) * t + 0.9375) + b;
        }
        else {
            return c * (7.5625 * (t -= 2.625 / 2.75) * t + 0.984375) + b;
        }
    },
    BounceEaseIn(t, b, c, d) {
        return c - Easings.BounceEaseOut(d - t, 0, c, d) + b;
    },
    BounceEaseInOut(t, b, c, d) {
        if (t < d / 2) {
            return Easings.BounceEaseIn(t * 2, 0, c, d) * 0.5 + b;
        }
        else {
            return Easings.BounceEaseOut(t * 2 - d, 0, c, d) * 0.5 + c * 0.5 + b;
        }
    },
    EaseIn(t, b, c, d) {
        return c * (t /= d) * t + b;
    },
    EaseOut(t, b, c, d) {
        return -c * (t /= d) * (t - 2) + b;
    },
    EaseInOut(t, b, c, d) {
        if ((t /= d / 2) < 1) {
            return (c / 2) * t * t + b;
        }
        return (-c / 2) * (--t * (t - 2) - 1) + b;
    },
    StrongEaseIn(t, b, c, d) {
        return c * (t /= d) * t * t * t * t + b;
    },
    StrongEaseOut(t, b, c, d) {
        return c * ((t = t / d - 1) * t * t * t * t + 1) + b;
    },
    StrongEaseInOut(t, b, c, d) {
        if ((t /= d / 2) < 1) {
            return (c / 2) * t * t * t * t * t + b;
        }
        return (c / 2) * ((t -= 2) * t * t * t * t + 2) + b;
    },
    Linear(t, b, c, d) {
        return (c * t) / d + b;
    },
};


/***/ }),

/***/ "../../node_modules/konva/lib/Util.js":
/*!********************************************!*\
  !*** ../../node_modules/konva/lib/Util.js ***!
  \********************************************/
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "Transform": () => (/* binding */ Transform),
/* harmony export */   "Util": () => (/* binding */ Util)
/* harmony export */ });
/* harmony import */ var _Global_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./Global.js */ "../../node_modules/konva/lib/Global.js");

class Transform {
    constructor(m = [1, 0, 0, 1, 0, 0]) {
        this.dirty = false;
        this.m = (m && m.slice()) || [1, 0, 0, 1, 0, 0];
    }
    reset() {
        this.m[0] = 1;
        this.m[1] = 0;
        this.m[2] = 0;
        this.m[3] = 1;
        this.m[4] = 0;
        this.m[5] = 0;
    }
    copy() {
        return new Transform(this.m);
    }
    copyInto(tr) {
        tr.m[0] = this.m[0];
        tr.m[1] = this.m[1];
        tr.m[2] = this.m[2];
        tr.m[3] = this.m[3];
        tr.m[4] = this.m[4];
        tr.m[5] = this.m[5];
    }
    point(point) {
        var m = this.m;
        return {
            x: m[0] * point.x + m[2] * point.y + m[4],
            y: m[1] * point.x + m[3] * point.y + m[5],
        };
    }
    translate(x, y) {
        this.m[4] += this.m[0] * x + this.m[2] * y;
        this.m[5] += this.m[1] * x + this.m[3] * y;
        return this;
    }
    scale(sx, sy) {
        this.m[0] *= sx;
        this.m[1] *= sx;
        this.m[2] *= sy;
        this.m[3] *= sy;
        return this;
    }
    rotate(rad) {
        var c = Math.cos(rad);
        var s = Math.sin(rad);
        var m11 = this.m[0] * c + this.m[2] * s;
        var m12 = this.m[1] * c + this.m[3] * s;
        var m21 = this.m[0] * -s + this.m[2] * c;
        var m22 = this.m[1] * -s + this.m[3] * c;
        this.m[0] = m11;
        this.m[1] = m12;
        this.m[2] = m21;
        this.m[3] = m22;
        return this;
    }
    getTranslation() {
        return {
            x: this.m[4],
            y: this.m[5],
        };
    }
    skew(sx, sy) {
        var m11 = this.m[0] + this.m[2] * sy;
        var m12 = this.m[1] + this.m[3] * sy;
        var m21 = this.m[2] + this.m[0] * sx;
        var m22 = this.m[3] + this.m[1] * sx;
        this.m[0] = m11;
        this.m[1] = m12;
        this.m[2] = m21;
        this.m[3] = m22;
        return this;
    }
    multiply(matrix) {
        var m11 = this.m[0] * matrix.m[0] + this.m[2] * matrix.m[1];
        var m12 = this.m[1] * matrix.m[0] + this.m[3] * matrix.m[1];
        var m21 = this.m[0] * matrix.m[2] + this.m[2] * matrix.m[3];
        var m22 = this.m[1] * matrix.m[2] + this.m[3] * matrix.m[3];
        var dx = this.m[0] * matrix.m[4] + this.m[2] * matrix.m[5] + this.m[4];
        var dy = this.m[1] * matrix.m[4] + this.m[3] * matrix.m[5] + this.m[5];
        this.m[0] = m11;
        this.m[1] = m12;
        this.m[2] = m21;
        this.m[3] = m22;
        this.m[4] = dx;
        this.m[5] = dy;
        return this;
    }
    invert() {
        var d = 1 / (this.m[0] * this.m[3] - this.m[1] * this.m[2]);
        var m0 = this.m[3] * d;
        var m1 = -this.m[1] * d;
        var m2 = -this.m[2] * d;
        var m3 = this.m[0] * d;
        var m4 = d * (this.m[2] * this.m[5] - this.m[3] * this.m[4]);
        var m5 = d * (this.m[1] * this.m[4] - this.m[0] * this.m[5]);
        this.m[0] = m0;
        this.m[1] = m1;
        this.m[2] = m2;
        this.m[3] = m3;
        this.m[4] = m4;
        this.m[5] = m5;
        return this;
    }
    getMatrix() {
        return this.m;
    }
    decompose() {
        var a = this.m[0];
        var b = this.m[1];
        var c = this.m[2];
        var d = this.m[3];
        var e = this.m[4];
        var f = this.m[5];
        var delta = a * d - b * c;
        let result = {
            x: e,
            y: f,
            rotation: 0,
            scaleX: 0,
            scaleY: 0,
            skewX: 0,
            skewY: 0,
        };
        if (a != 0 || b != 0) {
            var r = Math.sqrt(a * a + b * b);
            result.rotation = b > 0 ? Math.acos(a / r) : -Math.acos(a / r);
            result.scaleX = r;
            result.scaleY = delta / r;
            result.skewX = (a * c + b * d) / delta;
            result.skewY = 0;
        }
        else if (c != 0 || d != 0) {
            var s = Math.sqrt(c * c + d * d);
            result.rotation =
                Math.PI / 2 - (d > 0 ? Math.acos(-c / s) : -Math.acos(c / s));
            result.scaleX = delta / s;
            result.scaleY = s;
            result.skewX = 0;
            result.skewY = (a * c + b * d) / delta;
        }
        else {
        }
        result.rotation = Util._getRotation(result.rotation);
        return result;
    }
}
var OBJECT_ARRAY = '[object Array]', OBJECT_NUMBER = '[object Number]', OBJECT_STRING = '[object String]', OBJECT_BOOLEAN = '[object Boolean]', PI_OVER_DEG180 = Math.PI / 180, DEG180_OVER_PI = 180 / Math.PI, HASH = '#', EMPTY_STRING = '', ZERO = '0', KONVA_WARNING = 'Konva warning: ', KONVA_ERROR = 'Konva error: ', RGB_PAREN = 'rgb(', COLORS = {
    aliceblue: [240, 248, 255],
    antiquewhite: [250, 235, 215],
    aqua: [0, 255, 255],
    aquamarine: [127, 255, 212],
    azure: [240, 255, 255],
    beige: [245, 245, 220],
    bisque: [255, 228, 196],
    black: [0, 0, 0],
    blanchedalmond: [255, 235, 205],
    blue: [0, 0, 255],
    blueviolet: [138, 43, 226],
    brown: [165, 42, 42],
    burlywood: [222, 184, 135],
    cadetblue: [95, 158, 160],
    chartreuse: [127, 255, 0],
    chocolate: [210, 105, 30],
    coral: [255, 127, 80],
    cornflowerblue: [100, 149, 237],
    cornsilk: [255, 248, 220],
    crimson: [220, 20, 60],
    cyan: [0, 255, 255],
    darkblue: [0, 0, 139],
    darkcyan: [0, 139, 139],
    darkgoldenrod: [184, 132, 11],
    darkgray: [169, 169, 169],
    darkgreen: [0, 100, 0],
    darkgrey: [169, 169, 169],
    darkkhaki: [189, 183, 107],
    darkmagenta: [139, 0, 139],
    darkolivegreen: [85, 107, 47],
    darkorange: [255, 140, 0],
    darkorchid: [153, 50, 204],
    darkred: [139, 0, 0],
    darksalmon: [233, 150, 122],
    darkseagreen: [143, 188, 143],
    darkslateblue: [72, 61, 139],
    darkslategray: [47, 79, 79],
    darkslategrey: [47, 79, 79],
    darkturquoise: [0, 206, 209],
    darkviolet: [148, 0, 211],
    deeppink: [255, 20, 147],
    deepskyblue: [0, 191, 255],
    dimgray: [105, 105, 105],
    dimgrey: [105, 105, 105],
    dodgerblue: [30, 144, 255],
    firebrick: [178, 34, 34],
    floralwhite: [255, 255, 240],
    forestgreen: [34, 139, 34],
    fuchsia: [255, 0, 255],
    gainsboro: [220, 220, 220],
    ghostwhite: [248, 248, 255],
    gold: [255, 215, 0],
    goldenrod: [218, 165, 32],
    gray: [128, 128, 128],
    green: [0, 128, 0],
    greenyellow: [173, 255, 47],
    grey: [128, 128, 128],
    honeydew: [240, 255, 240],
    hotpink: [255, 105, 180],
    indianred: [205, 92, 92],
    indigo: [75, 0, 130],
    ivory: [255, 255, 240],
    khaki: [240, 230, 140],
    lavender: [230, 230, 250],
    lavenderblush: [255, 240, 245],
    lawngreen: [124, 252, 0],
    lemonchiffon: [255, 250, 205],
    lightblue: [173, 216, 230],
    lightcoral: [240, 128, 128],
    lightcyan: [224, 255, 255],
    lightgoldenrodyellow: [250, 250, 210],
    lightgray: [211, 211, 211],
    lightgreen: [144, 238, 144],
    lightgrey: [211, 211, 211],
    lightpink: [255, 182, 193],
    lightsalmon: [255, 160, 122],
    lightseagreen: [32, 178, 170],
    lightskyblue: [135, 206, 250],
    lightslategray: [119, 136, 153],
    lightslategrey: [119, 136, 153],
    lightsteelblue: [176, 196, 222],
    lightyellow: [255, 255, 224],
    lime: [0, 255, 0],
    limegreen: [50, 205, 50],
    linen: [250, 240, 230],
    magenta: [255, 0, 255],
    maroon: [128, 0, 0],
    mediumaquamarine: [102, 205, 170],
    mediumblue: [0, 0, 205],
    mediumorchid: [186, 85, 211],
    mediumpurple: [147, 112, 219],
    mediumseagreen: [60, 179, 113],
    mediumslateblue: [123, 104, 238],
    mediumspringgreen: [0, 250, 154],
    mediumturquoise: [72, 209, 204],
    mediumvioletred: [199, 21, 133],
    midnightblue: [25, 25, 112],
    mintcream: [245, 255, 250],
    mistyrose: [255, 228, 225],
    moccasin: [255, 228, 181],
    navajowhite: [255, 222, 173],
    navy: [0, 0, 128],
    oldlace: [253, 245, 230],
    olive: [128, 128, 0],
    olivedrab: [107, 142, 35],
    orange: [255, 165, 0],
    orangered: [255, 69, 0],
    orchid: [218, 112, 214],
    palegoldenrod: [238, 232, 170],
    palegreen: [152, 251, 152],
    paleturquoise: [175, 238, 238],
    palevioletred: [219, 112, 147],
    papayawhip: [255, 239, 213],
    peachpuff: [255, 218, 185],
    peru: [205, 133, 63],
    pink: [255, 192, 203],
    plum: [221, 160, 203],
    powderblue: [176, 224, 230],
    purple: [128, 0, 128],
    rebeccapurple: [102, 51, 153],
    red: [255, 0, 0],
    rosybrown: [188, 143, 143],
    royalblue: [65, 105, 225],
    saddlebrown: [139, 69, 19],
    salmon: [250, 128, 114],
    sandybrown: [244, 164, 96],
    seagreen: [46, 139, 87],
    seashell: [255, 245, 238],
    sienna: [160, 82, 45],
    silver: [192, 192, 192],
    skyblue: [135, 206, 235],
    slateblue: [106, 90, 205],
    slategray: [119, 128, 144],
    slategrey: [119, 128, 144],
    snow: [255, 255, 250],
    springgreen: [0, 255, 127],
    steelblue: [70, 130, 180],
    tan: [210, 180, 140],
    teal: [0, 128, 128],
    thistle: [216, 191, 216],
    transparent: [255, 255, 255, 0],
    tomato: [255, 99, 71],
    turquoise: [64, 224, 208],
    violet: [238, 130, 238],
    wheat: [245, 222, 179],
    white: [255, 255, 255],
    whitesmoke: [245, 245, 245],
    yellow: [255, 255, 0],
    yellowgreen: [154, 205, 5],
}, RGB_REGEX = /rgb\((\d{1,3}),(\d{1,3}),(\d{1,3})\)/, animQueue = [];
const req = (typeof requestAnimationFrame !== 'undefined' && requestAnimationFrame) ||
    function (f) {
        setTimeout(f, 60);
    };
const Util = {
    _isElement(obj) {
        return !!(obj && obj.nodeType == 1);
    },
    _isFunction(obj) {
        return !!(obj && obj.constructor && obj.call && obj.apply);
    },
    _isPlainObject(obj) {
        return !!obj && obj.constructor === Object;
    },
    _isArray(obj) {
        return Object.prototype.toString.call(obj) === OBJECT_ARRAY;
    },
    _isNumber(obj) {
        return (Object.prototype.toString.call(obj) === OBJECT_NUMBER &&
            !isNaN(obj) &&
            isFinite(obj));
    },
    _isString(obj) {
        return Object.prototype.toString.call(obj) === OBJECT_STRING;
    },
    _isBoolean(obj) {
        return Object.prototype.toString.call(obj) === OBJECT_BOOLEAN;
    },
    isObject(val) {
        return val instanceof Object;
    },
    isValidSelector(selector) {
        if (typeof selector !== 'string') {
            return false;
        }
        var firstChar = selector[0];
        return (firstChar === '#' ||
            firstChar === '.' ||
            firstChar === firstChar.toUpperCase());
    },
    _sign(number) {
        if (number === 0) {
            return 1;
        }
        if (number > 0) {
            return 1;
        }
        else {
            return -1;
        }
    },
    requestAnimFrame(callback) {
        animQueue.push(callback);
        if (animQueue.length === 1) {
            req(function () {
                const queue = animQueue;
                animQueue = [];
                queue.forEach(function (cb) {
                    cb();
                });
            });
        }
    },
    createCanvasElement() {
        var canvas = document.createElement('canvas');
        try {
            canvas.style = canvas.style || {};
        }
        catch (e) { }
        return canvas;
    },
    createImageElement() {
        return document.createElement('img');
    },
    _isInDocument(el) {
        while ((el = el.parentNode)) {
            if (el == document) {
                return true;
            }
        }
        return false;
    },
    _urlToImage(url, callback) {
        var imageObj = Util.createImageElement();
        imageObj.onload = function () {
            callback(imageObj);
        };
        imageObj.src = url;
    },
    _rgbToHex(r, g, b) {
        return ((1 << 24) + (r << 16) + (g << 8) + b).toString(16).slice(1);
    },
    _hexToRgb(hex) {
        hex = hex.replace(HASH, EMPTY_STRING);
        var bigint = parseInt(hex, 16);
        return {
            r: (bigint >> 16) & 255,
            g: (bigint >> 8) & 255,
            b: bigint & 255,
        };
    },
    getRandomColor() {
        var randColor = ((Math.random() * 0xffffff) << 0).toString(16);
        while (randColor.length < 6) {
            randColor = ZERO + randColor;
        }
        return HASH + randColor;
    },
    getRGB(color) {
        var rgb;
        if (color in COLORS) {
            rgb = COLORS[color];
            return {
                r: rgb[0],
                g: rgb[1],
                b: rgb[2],
            };
        }
        else if (color[0] === HASH) {
            return this._hexToRgb(color.substring(1));
        }
        else if (color.substr(0, 4) === RGB_PAREN) {
            rgb = RGB_REGEX.exec(color.replace(/ /g, ''));
            return {
                r: parseInt(rgb[1], 10),
                g: parseInt(rgb[2], 10),
                b: parseInt(rgb[3], 10),
            };
        }
        else {
            return {
                r: 0,
                g: 0,
                b: 0,
            };
        }
    },
    colorToRGBA(str) {
        str = str || 'black';
        return (Util._namedColorToRBA(str) ||
            Util._hex3ColorToRGBA(str) ||
            Util._hex4ColorToRGBA(str) ||
            Util._hex6ColorToRGBA(str) ||
            Util._hex8ColorToRGBA(str) ||
            Util._rgbColorToRGBA(str) ||
            Util._rgbaColorToRGBA(str) ||
            Util._hslColorToRGBA(str));
    },
    _namedColorToRBA(str) {
        var c = COLORS[str.toLowerCase()];
        if (!c) {
            return null;
        }
        return {
            r: c[0],
            g: c[1],
            b: c[2],
            a: 1,
        };
    },
    _rgbColorToRGBA(str) {
        if (str.indexOf('rgb(') === 0) {
            str = str.match(/rgb\(([^)]+)\)/)[1];
            var parts = str.split(/ *, */).map(Number);
            return {
                r: parts[0],
                g: parts[1],
                b: parts[2],
                a: 1,
            };
        }
    },
    _rgbaColorToRGBA(str) {
        if (str.indexOf('rgba(') === 0) {
            str = str.match(/rgba\(([^)]+)\)/)[1];
            var parts = str.split(/ *, */).map((n, index) => {
                if (n.slice(-1) === '%') {
                    return index === 3 ? parseInt(n) / 100 : (parseInt(n) / 100) * 255;
                }
                return Number(n);
            });
            return {
                r: parts[0],
                g: parts[1],
                b: parts[2],
                a: parts[3],
            };
        }
    },
    _hex8ColorToRGBA(str) {
        if (str[0] === '#' && str.length === 9) {
            return {
                r: parseInt(str.slice(1, 3), 16),
                g: parseInt(str.slice(3, 5), 16),
                b: parseInt(str.slice(5, 7), 16),
                a: parseInt(str.slice(7, 9), 16) / 0xff,
            };
        }
    },
    _hex6ColorToRGBA(str) {
        if (str[0] === '#' && str.length === 7) {
            return {
                r: parseInt(str.slice(1, 3), 16),
                g: parseInt(str.slice(3, 5), 16),
                b: parseInt(str.slice(5, 7), 16),
                a: 1,
            };
        }
    },
    _hex4ColorToRGBA(str) {
        if (str[0] === '#' && str.length === 5) {
            return {
                r: parseInt(str[1] + str[1], 16),
                g: parseInt(str[2] + str[2], 16),
                b: parseInt(str[3] + str[3], 16),
                a: parseInt(str[4] + str[4], 16) / 0xff,
            };
        }
    },
    _hex3ColorToRGBA(str) {
        if (str[0] === '#' && str.length === 4) {
            return {
                r: parseInt(str[1] + str[1], 16),
                g: parseInt(str[2] + str[2], 16),
                b: parseInt(str[3] + str[3], 16),
                a: 1,
            };
        }
    },
    _hslColorToRGBA(str) {
        if (/hsl\((\d+),\s*([\d.]+)%,\s*([\d.]+)%\)/g.test(str)) {
            const [_, ...hsl] = /hsl\((\d+),\s*([\d.]+)%,\s*([\d.]+)%\)/g.exec(str);
            const h = Number(hsl[0]) / 360;
            const s = Number(hsl[1]) / 100;
            const l = Number(hsl[2]) / 100;
            let t2;
            let t3;
            let val;
            if (s === 0) {
                val = l * 255;
                return {
                    r: Math.round(val),
                    g: Math.round(val),
                    b: Math.round(val),
                    a: 1,
                };
            }
            if (l < 0.5) {
                t2 = l * (1 + s);
            }
            else {
                t2 = l + s - l * s;
            }
            const t1 = 2 * l - t2;
            const rgb = [0, 0, 0];
            for (let i = 0; i < 3; i++) {
                t3 = h + (1 / 3) * -(i - 1);
                if (t3 < 0) {
                    t3++;
                }
                if (t3 > 1) {
                    t3--;
                }
                if (6 * t3 < 1) {
                    val = t1 + (t2 - t1) * 6 * t3;
                }
                else if (2 * t3 < 1) {
                    val = t2;
                }
                else if (3 * t3 < 2) {
                    val = t1 + (t2 - t1) * (2 / 3 - t3) * 6;
                }
                else {
                    val = t1;
                }
                rgb[i] = val * 255;
            }
            return {
                r: Math.round(rgb[0]),
                g: Math.round(rgb[1]),
                b: Math.round(rgb[2]),
                a: 1,
            };
        }
    },
    haveIntersection(r1, r2) {
        return !(r2.x > r1.x + r1.width ||
            r2.x + r2.width < r1.x ||
            r2.y > r1.y + r1.height ||
            r2.y + r2.height < r1.y);
    },
    cloneObject(obj) {
        var retObj = {};
        for (var key in obj) {
            if (this._isPlainObject(obj[key])) {
                retObj[key] = this.cloneObject(obj[key]);
            }
            else if (this._isArray(obj[key])) {
                retObj[key] = this.cloneArray(obj[key]);
            }
            else {
                retObj[key] = obj[key];
            }
        }
        return retObj;
    },
    cloneArray(arr) {
        return arr.slice(0);
    },
    degToRad(deg) {
        return deg * PI_OVER_DEG180;
    },
    radToDeg(rad) {
        return rad * DEG180_OVER_PI;
    },
    _degToRad(deg) {
        Util.warn('Util._degToRad is removed. Please use public Util.degToRad instead.');
        return Util.degToRad(deg);
    },
    _radToDeg(rad) {
        Util.warn('Util._radToDeg is removed. Please use public Util.radToDeg instead.');
        return Util.radToDeg(rad);
    },
    _getRotation(radians) {
        return _Global_js__WEBPACK_IMPORTED_MODULE_0__.Konva.angleDeg ? Util.radToDeg(radians) : radians;
    },
    _capitalize(str) {
        return str.charAt(0).toUpperCase() + str.slice(1);
    },
    throw(str) {
        throw new Error(KONVA_ERROR + str);
    },
    error(str) {
        console.error(KONVA_ERROR + str);
    },
    warn(str) {
        if (!_Global_js__WEBPACK_IMPORTED_MODULE_0__.Konva.showWarnings) {
            return;
        }
        console.warn(KONVA_WARNING + str);
    },
    each(obj, func) {
        for (var key in obj) {
            func(key, obj[key]);
        }
    },
    _inRange(val, left, right) {
        return left <= val && val < right;
    },
    _getProjectionToSegment(x1, y1, x2, y2, x3, y3) {
        var x, y, dist;
        var pd2 = (x1 - x2) * (x1 - x2) + (y1 - y2) * (y1 - y2);
        if (pd2 == 0) {
            x = x1;
            y = y1;
            dist = (x3 - x2) * (x3 - x2) + (y3 - y2) * (y3 - y2);
        }
        else {
            var u = ((x3 - x1) * (x2 - x1) + (y3 - y1) * (y2 - y1)) / pd2;
            if (u < 0) {
                x = x1;
                y = y1;
                dist = (x1 - x3) * (x1 - x3) + (y1 - y3) * (y1 - y3);
            }
            else if (u > 1.0) {
                x = x2;
                y = y2;
                dist = (x2 - x3) * (x2 - x3) + (y2 - y3) * (y2 - y3);
            }
            else {
                x = x1 + u * (x2 - x1);
                y = y1 + u * (y2 - y1);
                dist = (x - x3) * (x - x3) + (y - y3) * (y - y3);
            }
        }
        return [x, y, dist];
    },
    _getProjectionToLine(pt, line, isClosed) {
        var pc = Util.cloneObject(pt);
        var dist = Number.MAX_VALUE;
        line.forEach(function (p1, i) {
            if (!isClosed && i === line.length - 1) {
                return;
            }
            var p2 = line[(i + 1) % line.length];
            var proj = Util._getProjectionToSegment(p1.x, p1.y, p2.x, p2.y, pt.x, pt.y);
            var px = proj[0], py = proj[1], pdist = proj[2];
            if (pdist < dist) {
                pc.x = px;
                pc.y = py;
                dist = pdist;
            }
        });
        return pc;
    },
    _prepareArrayForTween(startArray, endArray, isClosed) {
        var n, start = [], end = [];
        if (startArray.length > endArray.length) {
            var temp = endArray;
            endArray = startArray;
            startArray = temp;
        }
        for (n = 0; n < startArray.length; n += 2) {
            start.push({
                x: startArray[n],
                y: startArray[n + 1],
            });
        }
        for (n = 0; n < endArray.length; n += 2) {
            end.push({
                x: endArray[n],
                y: endArray[n + 1],
            });
        }
        var newStart = [];
        end.forEach(function (point) {
            var pr = Util._getProjectionToLine(point, start, isClosed);
            newStart.push(pr.x);
            newStart.push(pr.y);
        });
        return newStart;
    },
    _prepareToStringify(obj) {
        var desc;
        obj.visitedByCircularReferenceRemoval = true;
        for (var key in obj) {
            if (!(obj.hasOwnProperty(key) && obj[key] && typeof obj[key] == 'object')) {
                continue;
            }
            desc = Object.getOwnPropertyDescriptor(obj, key);
            if (obj[key].visitedByCircularReferenceRemoval ||
                Util._isElement(obj[key])) {
                if (desc.configurable) {
                    delete obj[key];
                }
                else {
                    return null;
                }
            }
            else if (Util._prepareToStringify(obj[key]) === null) {
                if (desc.configurable) {
                    delete obj[key];
                }
                else {
                    return null;
                }
            }
        }
        delete obj.visitedByCircularReferenceRemoval;
        return obj;
    },
    _assign(target, source) {
        for (var key in source) {
            target[key] = source[key];
        }
        return target;
    },
    _getFirstPointerId(evt) {
        if (!evt.touches) {
            return evt.pointerId || 999;
        }
        else {
            return evt.changedTouches[0].identifier;
        }
    },
    releaseCanvas(...canvases) {
        if (!_Global_js__WEBPACK_IMPORTED_MODULE_0__.Konva.releaseCanvasOnDestroy)
            return;
        canvases.forEach(c => {
            c.width = 0;
            c.height = 0;
        });
    },
    drawRoundedRectPath(context, width, height, cornerRadius) {
        let topLeft = 0;
        let topRight = 0;
        let bottomLeft = 0;
        let bottomRight = 0;
        if (typeof cornerRadius === 'number') {
            topLeft = topRight = bottomLeft = bottomRight = Math.min(cornerRadius, width / 2, height / 2);
        }
        else {
            topLeft = Math.min(cornerRadius[0] || 0, width / 2, height / 2);
            topRight = Math.min(cornerRadius[1] || 0, width / 2, height / 2);
            bottomRight = Math.min(cornerRadius[2] || 0, width / 2, height / 2);
            bottomLeft = Math.min(cornerRadius[3] || 0, width / 2, height / 2);
        }
        context.moveTo(topLeft, 0);
        context.lineTo(width - topRight, 0);
        context.arc(width - topRight, topRight, topRight, (Math.PI * 3) / 2, 0, false);
        context.lineTo(width, height - bottomRight);
        context.arc(width - bottomRight, height - bottomRight, bottomRight, 0, Math.PI / 2, false);
        context.lineTo(bottomLeft, height);
        context.arc(bottomLeft, height - bottomLeft, bottomLeft, Math.PI / 2, Math.PI, false);
        context.lineTo(0, topLeft);
        context.arc(topLeft, topLeft, topLeft, Math.PI, (Math.PI * 3) / 2, false);
    }
};


/***/ }),

/***/ "../../node_modules/konva/lib/Validators.js":
/*!**************************************************!*\
  !*** ../../node_modules/konva/lib/Validators.js ***!
  \**************************************************/
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "RGBComponent": () => (/* binding */ RGBComponent),
/* harmony export */   "alphaComponent": () => (/* binding */ alphaComponent),
/* harmony export */   "getBooleanValidator": () => (/* binding */ getBooleanValidator),
/* harmony export */   "getComponentValidator": () => (/* binding */ getComponentValidator),
/* harmony export */   "getFunctionValidator": () => (/* binding */ getFunctionValidator),
/* harmony export */   "getNumberArrayValidator": () => (/* binding */ getNumberArrayValidator),
/* harmony export */   "getNumberOrArrayOfNumbersValidator": () => (/* binding */ getNumberOrArrayOfNumbersValidator),
/* harmony export */   "getNumberOrAutoValidator": () => (/* binding */ getNumberOrAutoValidator),
/* harmony export */   "getNumberValidator": () => (/* binding */ getNumberValidator),
/* harmony export */   "getStringOrGradientValidator": () => (/* binding */ getStringOrGradientValidator),
/* harmony export */   "getStringValidator": () => (/* binding */ getStringValidator)
/* harmony export */ });
/* harmony import */ var _Global_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./Global.js */ "../../node_modules/konva/lib/Global.js");
/* harmony import */ var _Util_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./Util.js */ "../../node_modules/konva/lib/Util.js");


function _formatValue(val) {
    if (_Util_js__WEBPACK_IMPORTED_MODULE_1__.Util._isString(val)) {
        return '"' + val + '"';
    }
    if (Object.prototype.toString.call(val) === '[object Number]') {
        return val;
    }
    if (_Util_js__WEBPACK_IMPORTED_MODULE_1__.Util._isBoolean(val)) {
        return val;
    }
    return Object.prototype.toString.call(val);
}
function RGBComponent(val) {
    if (val > 255) {
        return 255;
    }
    else if (val < 0) {
        return 0;
    }
    return Math.round(val);
}
function alphaComponent(val) {
    if (val > 1) {
        return 1;
    }
    else if (val < 0.0001) {
        return 0.0001;
    }
    return val;
}
function getNumberValidator() {
    if (_Global_js__WEBPACK_IMPORTED_MODULE_0__.Konva.isUnminified) {
        return function (val, attr) {
            if (!_Util_js__WEBPACK_IMPORTED_MODULE_1__.Util._isNumber(val)) {
                _Util_js__WEBPACK_IMPORTED_MODULE_1__.Util.warn(_formatValue(val) +
                    ' is a not valid value for "' +
                    attr +
                    '" attribute. The value should be a number.');
            }
            return val;
        };
    }
}
function getNumberOrArrayOfNumbersValidator(noOfElements) {
    if (_Global_js__WEBPACK_IMPORTED_MODULE_0__.Konva.isUnminified) {
        return function (val, attr) {
            let isNumber = _Util_js__WEBPACK_IMPORTED_MODULE_1__.Util._isNumber(val);
            let isValidArray = _Util_js__WEBPACK_IMPORTED_MODULE_1__.Util._isArray(val) && val.length == noOfElements;
            if (!isNumber && !isValidArray) {
                _Util_js__WEBPACK_IMPORTED_MODULE_1__.Util.warn(_formatValue(val) +
                    ' is a not valid value for "' +
                    attr +
                    '" attribute. The value should be a number or Array<number>(' +
                    noOfElements +
                    ')');
            }
            return val;
        };
    }
}
function getNumberOrAutoValidator() {
    if (_Global_js__WEBPACK_IMPORTED_MODULE_0__.Konva.isUnminified) {
        return function (val, attr) {
            var isNumber = _Util_js__WEBPACK_IMPORTED_MODULE_1__.Util._isNumber(val);
            var isAuto = val === 'auto';
            if (!(isNumber || isAuto)) {
                _Util_js__WEBPACK_IMPORTED_MODULE_1__.Util.warn(_formatValue(val) +
                    ' is a not valid value for "' +
                    attr +
                    '" attribute. The value should be a number or "auto".');
            }
            return val;
        };
    }
}
function getStringValidator() {
    if (_Global_js__WEBPACK_IMPORTED_MODULE_0__.Konva.isUnminified) {
        return function (val, attr) {
            if (!_Util_js__WEBPACK_IMPORTED_MODULE_1__.Util._isString(val)) {
                _Util_js__WEBPACK_IMPORTED_MODULE_1__.Util.warn(_formatValue(val) +
                    ' is a not valid value for "' +
                    attr +
                    '" attribute. The value should be a string.');
            }
            return val;
        };
    }
}
function getStringOrGradientValidator() {
    if (_Global_js__WEBPACK_IMPORTED_MODULE_0__.Konva.isUnminified) {
        return function (val, attr) {
            const isString = _Util_js__WEBPACK_IMPORTED_MODULE_1__.Util._isString(val);
            const isGradient = Object.prototype.toString.call(val) === '[object CanvasGradient]' ||
                (val && val.addColorStop);
            if (!(isString || isGradient)) {
                _Util_js__WEBPACK_IMPORTED_MODULE_1__.Util.warn(_formatValue(val) +
                    ' is a not valid value for "' +
                    attr +
                    '" attribute. The value should be a string or a native gradient.');
            }
            return val;
        };
    }
}
function getFunctionValidator() {
    if (_Global_js__WEBPACK_IMPORTED_MODULE_0__.Konva.isUnminified) {
        return function (val, attr) {
            if (!_Util_js__WEBPACK_IMPORTED_MODULE_1__.Util._isFunction(val)) {
                _Util_js__WEBPACK_IMPORTED_MODULE_1__.Util.warn(_formatValue(val) +
                    ' is a not valid value for "' +
                    attr +
                    '" attribute. The value should be a function.');
            }
            return val;
        };
    }
}
function getNumberArrayValidator() {
    if (_Global_js__WEBPACK_IMPORTED_MODULE_0__.Konva.isUnminified) {
        return function (val, attr) {
            const TypedArray = Int8Array ? Object.getPrototypeOf(Int8Array) : null;
            if (TypedArray && val instanceof TypedArray) {
                return val;
            }
            if (!_Util_js__WEBPACK_IMPORTED_MODULE_1__.Util._isArray(val)) {
                _Util_js__WEBPACK_IMPORTED_MODULE_1__.Util.warn(_formatValue(val) +
                    ' is a not valid value for "' +
                    attr +
                    '" attribute. The value should be a array of numbers.');
            }
            else {
                val.forEach(function (item) {
                    if (!_Util_js__WEBPACK_IMPORTED_MODULE_1__.Util._isNumber(item)) {
                        _Util_js__WEBPACK_IMPORTED_MODULE_1__.Util.warn('"' +
                            attr +
                            '" attribute has non numeric element ' +
                            item +
                            '. Make sure that all elements are numbers.');
                    }
                });
            }
            return val;
        };
    }
}
function getBooleanValidator() {
    if (_Global_js__WEBPACK_IMPORTED_MODULE_0__.Konva.isUnminified) {
        return function (val, attr) {
            var isBool = val === true || val === false;
            if (!isBool) {
                _Util_js__WEBPACK_IMPORTED_MODULE_1__.Util.warn(_formatValue(val) +
                    ' is a not valid value for "' +
                    attr +
                    '" attribute. The value should be a boolean.');
            }
            return val;
        };
    }
}
function getComponentValidator(components) {
    if (_Global_js__WEBPACK_IMPORTED_MODULE_0__.Konva.isUnminified) {
        return function (val, attr) {
            if (val === undefined || val === null) {
                return val;
            }
            if (!_Util_js__WEBPACK_IMPORTED_MODULE_1__.Util.isObject(val)) {
                _Util_js__WEBPACK_IMPORTED_MODULE_1__.Util.warn(_formatValue(val) +
                    ' is a not valid value for "' +
                    attr +
                    '" attribute. The value should be an object with properties ' +
                    components);
            }
            return val;
        };
    }
}


/***/ }),

/***/ "../../node_modules/konva/lib/_CoreInternals.js":
/*!******************************************************!*\
  !*** ../../node_modules/konva/lib/_CoreInternals.js ***!
  \******************************************************/
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "Konva": () => (/* binding */ Konva),
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _Global_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./Global.js */ "../../node_modules/konva/lib/Global.js");
/* harmony import */ var _Util_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./Util.js */ "../../node_modules/konva/lib/Util.js");
/* harmony import */ var _Node_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./Node.js */ "../../node_modules/konva/lib/Node.js");
/* harmony import */ var _Container_js__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./Container.js */ "../../node_modules/konva/lib/Container.js");
/* harmony import */ var _Stage_js__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./Stage.js */ "../../node_modules/konva/lib/Stage.js");
/* harmony import */ var _Layer_js__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ./Layer.js */ "../../node_modules/konva/lib/Layer.js");
/* harmony import */ var _FastLayer_js__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ./FastLayer.js */ "../../node_modules/konva/lib/FastLayer.js");
/* harmony import */ var _Group_js__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! ./Group.js */ "../../node_modules/konva/lib/Group.js");
/* harmony import */ var _DragAndDrop_js__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! ./DragAndDrop.js */ "../../node_modules/konva/lib/DragAndDrop.js");
/* harmony import */ var _Shape_js__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! ./Shape.js */ "../../node_modules/konva/lib/Shape.js");
/* harmony import */ var _Animation_js__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__(/*! ./Animation.js */ "../../node_modules/konva/lib/Animation.js");
/* harmony import */ var _Tween_js__WEBPACK_IMPORTED_MODULE_11__ = __webpack_require__(/*! ./Tween.js */ "../../node_modules/konva/lib/Tween.js");
/* harmony import */ var _Context_js__WEBPACK_IMPORTED_MODULE_12__ = __webpack_require__(/*! ./Context.js */ "../../node_modules/konva/lib/Context.js");
/* harmony import */ var _Canvas_js__WEBPACK_IMPORTED_MODULE_13__ = __webpack_require__(/*! ./Canvas.js */ "../../node_modules/konva/lib/Canvas.js");














const Konva = _Util_js__WEBPACK_IMPORTED_MODULE_1__.Util._assign(_Global_js__WEBPACK_IMPORTED_MODULE_0__.Konva, {
    Util: _Util_js__WEBPACK_IMPORTED_MODULE_1__.Util,
    Transform: _Util_js__WEBPACK_IMPORTED_MODULE_1__.Transform,
    Node: _Node_js__WEBPACK_IMPORTED_MODULE_2__.Node,
    Container: _Container_js__WEBPACK_IMPORTED_MODULE_3__.Container,
    Stage: _Stage_js__WEBPACK_IMPORTED_MODULE_4__.Stage,
    stages: _Stage_js__WEBPACK_IMPORTED_MODULE_4__.stages,
    Layer: _Layer_js__WEBPACK_IMPORTED_MODULE_5__.Layer,
    FastLayer: _FastLayer_js__WEBPACK_IMPORTED_MODULE_6__.FastLayer,
    Group: _Group_js__WEBPACK_IMPORTED_MODULE_7__.Group,
    DD: _DragAndDrop_js__WEBPACK_IMPORTED_MODULE_8__.DD,
    Shape: _Shape_js__WEBPACK_IMPORTED_MODULE_9__.Shape,
    shapes: _Shape_js__WEBPACK_IMPORTED_MODULE_9__.shapes,
    Animation: _Animation_js__WEBPACK_IMPORTED_MODULE_10__.Animation,
    Tween: _Tween_js__WEBPACK_IMPORTED_MODULE_11__.Tween,
    Easings: _Tween_js__WEBPACK_IMPORTED_MODULE_11__.Easings,
    Context: _Context_js__WEBPACK_IMPORTED_MODULE_12__.Context,
    Canvas: _Canvas_js__WEBPACK_IMPORTED_MODULE_13__.Canvas,
});
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (Konva);


/***/ }),

/***/ "../../node_modules/konva/lib/shapes/Image.js":
/*!****************************************************!*\
  !*** ../../node_modules/konva/lib/shapes/Image.js ***!
  \****************************************************/
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "Image": () => (/* binding */ Image)
/* harmony export */ });
/* harmony import */ var _Util_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../Util.js */ "../../node_modules/konva/lib/Util.js");
/* harmony import */ var _Factory_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../Factory.js */ "../../node_modules/konva/lib/Factory.js");
/* harmony import */ var _Shape_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../Shape.js */ "../../node_modules/konva/lib/Shape.js");
/* harmony import */ var _Global_js__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../Global.js */ "../../node_modules/konva/lib/Global.js");
/* harmony import */ var _Validators_js__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ../Validators.js */ "../../node_modules/konva/lib/Validators.js");





class Image extends _Shape_js__WEBPACK_IMPORTED_MODULE_2__.Shape {
    constructor(attrs) {
        super(attrs);
        this.on('imageChange.konva', () => {
            this._setImageLoad();
        });
        this._setImageLoad();
    }
    _setImageLoad() {
        const image = this.image();
        if (image && image.complete) {
            return;
        }
        if (image && image.readyState === 4) {
            return;
        }
        if (image && image['addEventListener']) {
            image['addEventListener']('load', () => {
                this._requestDraw();
            });
        }
    }
    _useBufferCanvas() {
        return super._useBufferCanvas(true);
    }
    _sceneFunc(context) {
        const width = this.getWidth();
        const height = this.getHeight();
        const cornerRadius = this.cornerRadius();
        const image = this.attrs.image;
        let params;
        if (image) {
            const cropWidth = this.attrs.cropWidth;
            const cropHeight = this.attrs.cropHeight;
            if (cropWidth && cropHeight) {
                params = [
                    image,
                    this.cropX(),
                    this.cropY(),
                    cropWidth,
                    cropHeight,
                    0,
                    0,
                    width,
                    height,
                ];
            }
            else {
                params = [image, 0, 0, width, height];
            }
        }
        if (this.hasFill() || this.hasStroke() || cornerRadius) {
            context.beginPath();
            cornerRadius
                ? _Util_js__WEBPACK_IMPORTED_MODULE_0__.Util.drawRoundedRectPath(context, width, height, cornerRadius)
                : context.rect(0, 0, width, height);
            context.closePath();
            context.fillStrokeShape(this);
        }
        if (image) {
            if (cornerRadius) {
                context.clip();
            }
            context.drawImage.apply(context, params);
        }
    }
    _hitFunc(context) {
        var width = this.width(), height = this.height(), cornerRadius = this.cornerRadius();
        context.beginPath();
        if (!cornerRadius) {
            context.rect(0, 0, width, height);
        }
        else {
            _Util_js__WEBPACK_IMPORTED_MODULE_0__.Util.drawRoundedRectPath(context, width, height, cornerRadius);
        }
        context.closePath();
        context.fillStrokeShape(this);
    }
    getWidth() {
        var _a, _b;
        return (_a = this.attrs.width) !== null && _a !== void 0 ? _a : (_b = this.image()) === null || _b === void 0 ? void 0 : _b.width;
    }
    getHeight() {
        var _a, _b;
        return (_a = this.attrs.height) !== null && _a !== void 0 ? _a : (_b = this.image()) === null || _b === void 0 ? void 0 : _b.height;
    }
    static fromURL(url, callback, onError = null) {
        var img = _Util_js__WEBPACK_IMPORTED_MODULE_0__.Util.createImageElement();
        img.onload = function () {
            var image = new Image({
                image: img,
            });
            callback(image);
        };
        img.onerror = onError;
        img.crossOrigin = 'Anonymous';
        img.src = url;
    }
}
Image.prototype.className = 'Image';
(0,_Global_js__WEBPACK_IMPORTED_MODULE_3__._registerNode)(Image);
_Factory_js__WEBPACK_IMPORTED_MODULE_1__.Factory.addGetterSetter(Image, 'cornerRadius', 0, (0,_Validators_js__WEBPACK_IMPORTED_MODULE_4__.getNumberOrArrayOfNumbersValidator)(4));
_Factory_js__WEBPACK_IMPORTED_MODULE_1__.Factory.addGetterSetter(Image, 'image');
_Factory_js__WEBPACK_IMPORTED_MODULE_1__.Factory.addComponentsGetterSetter(Image, 'crop', ['x', 'y', 'width', 'height']);
_Factory_js__WEBPACK_IMPORTED_MODULE_1__.Factory.addGetterSetter(Image, 'cropX', 0, (0,_Validators_js__WEBPACK_IMPORTED_MODULE_4__.getNumberValidator)());
_Factory_js__WEBPACK_IMPORTED_MODULE_1__.Factory.addGetterSetter(Image, 'cropY', 0, (0,_Validators_js__WEBPACK_IMPORTED_MODULE_4__.getNumberValidator)());
_Factory_js__WEBPACK_IMPORTED_MODULE_1__.Factory.addGetterSetter(Image, 'cropWidth', 0, (0,_Validators_js__WEBPACK_IMPORTED_MODULE_4__.getNumberValidator)());
_Factory_js__WEBPACK_IMPORTED_MODULE_1__.Factory.addGetterSetter(Image, 'cropHeight', 0, (0,_Validators_js__WEBPACK_IMPORTED_MODULE_4__.getNumberValidator)());


/***/ }),

/***/ "../../node_modules/konva/lib/shapes/Line.js":
/*!***************************************************!*\
  !*** ../../node_modules/konva/lib/shapes/Line.js ***!
  \***************************************************/
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "Line": () => (/* binding */ Line)
/* harmony export */ });
/* harmony import */ var _Factory_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../Factory.js */ "../../node_modules/konva/lib/Factory.js");
/* harmony import */ var _Shape_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../Shape.js */ "../../node_modules/konva/lib/Shape.js");
/* harmony import */ var _Validators_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../Validators.js */ "../../node_modules/konva/lib/Validators.js");
/* harmony import */ var _Global_js__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../Global.js */ "../../node_modules/konva/lib/Global.js");




function getControlPoints(x0, y0, x1, y1, x2, y2, t) {
    var d01 = Math.sqrt(Math.pow(x1 - x0, 2) + Math.pow(y1 - y0, 2)), d12 = Math.sqrt(Math.pow(x2 - x1, 2) + Math.pow(y2 - y1, 2)), fa = (t * d01) / (d01 + d12), fb = (t * d12) / (d01 + d12), p1x = x1 - fa * (x2 - x0), p1y = y1 - fa * (y2 - y0), p2x = x1 + fb * (x2 - x0), p2y = y1 + fb * (y2 - y0);
    return [p1x, p1y, p2x, p2y];
}
function expandPoints(p, tension) {
    var len = p.length, allPoints = [], n, cp;
    for (n = 2; n < len - 2; n += 2) {
        cp = getControlPoints(p[n - 2], p[n - 1], p[n], p[n + 1], p[n + 2], p[n + 3], tension);
        if (isNaN(cp[0])) {
            continue;
        }
        allPoints.push(cp[0]);
        allPoints.push(cp[1]);
        allPoints.push(p[n]);
        allPoints.push(p[n + 1]);
        allPoints.push(cp[2]);
        allPoints.push(cp[3]);
    }
    return allPoints;
}
class Line extends _Shape_js__WEBPACK_IMPORTED_MODULE_1__.Shape {
    constructor(config) {
        super(config);
        this.on('pointsChange.konva tensionChange.konva closedChange.konva bezierChange.konva', function () {
            this._clearCache('tensionPoints');
        });
    }
    _sceneFunc(context) {
        var points = this.points(), length = points.length, tension = this.tension(), closed = this.closed(), bezier = this.bezier(), tp, len, n;
        if (!length) {
            return;
        }
        context.beginPath();
        context.moveTo(points[0], points[1]);
        if (tension !== 0 && length > 4) {
            tp = this.getTensionPoints();
            len = tp.length;
            n = closed ? 0 : 4;
            if (!closed) {
                context.quadraticCurveTo(tp[0], tp[1], tp[2], tp[3]);
            }
            while (n < len - 2) {
                context.bezierCurveTo(tp[n++], tp[n++], tp[n++], tp[n++], tp[n++], tp[n++]);
            }
            if (!closed) {
                context.quadraticCurveTo(tp[len - 2], tp[len - 1], points[length - 2], points[length - 1]);
            }
        }
        else if (bezier) {
            n = 2;
            while (n < length) {
                context.bezierCurveTo(points[n++], points[n++], points[n++], points[n++], points[n++], points[n++]);
            }
        }
        else {
            for (n = 2; n < length; n += 2) {
                context.lineTo(points[n], points[n + 1]);
            }
        }
        if (closed) {
            context.closePath();
            context.fillStrokeShape(this);
        }
        else {
            context.strokeShape(this);
        }
    }
    getTensionPoints() {
        return this._getCache('tensionPoints', this._getTensionPoints);
    }
    _getTensionPoints() {
        if (this.closed()) {
            return this._getTensionPointsClosed();
        }
        else {
            return expandPoints(this.points(), this.tension());
        }
    }
    _getTensionPointsClosed() {
        var p = this.points(), len = p.length, tension = this.tension(), firstControlPoints = getControlPoints(p[len - 2], p[len - 1], p[0], p[1], p[2], p[3], tension), lastControlPoints = getControlPoints(p[len - 4], p[len - 3], p[len - 2], p[len - 1], p[0], p[1], tension), middle = expandPoints(p, tension), tp = [firstControlPoints[2], firstControlPoints[3]]
            .concat(middle)
            .concat([
            lastControlPoints[0],
            lastControlPoints[1],
            p[len - 2],
            p[len - 1],
            lastControlPoints[2],
            lastControlPoints[3],
            firstControlPoints[0],
            firstControlPoints[1],
            p[0],
            p[1],
        ]);
        return tp;
    }
    getWidth() {
        return this.getSelfRect().width;
    }
    getHeight() {
        return this.getSelfRect().height;
    }
    getSelfRect() {
        var points = this.points();
        if (points.length < 4) {
            return {
                x: points[0] || 0,
                y: points[1] || 0,
                width: 0,
                height: 0,
            };
        }
        if (this.tension() !== 0) {
            points = [
                points[0],
                points[1],
                ...this._getTensionPoints(),
                points[points.length - 2],
                points[points.length - 1],
            ];
        }
        else {
            points = this.points();
        }
        var minX = points[0];
        var maxX = points[0];
        var minY = points[1];
        var maxY = points[1];
        var x, y;
        for (var i = 0; i < points.length / 2; i++) {
            x = points[i * 2];
            y = points[i * 2 + 1];
            minX = Math.min(minX, x);
            maxX = Math.max(maxX, x);
            minY = Math.min(minY, y);
            maxY = Math.max(maxY, y);
        }
        return {
            x: minX,
            y: minY,
            width: maxX - minX,
            height: maxY - minY,
        };
    }
}
Line.prototype.className = 'Line';
Line.prototype._attrsAffectingSize = ['points', 'bezier', 'tension'];
(0,_Global_js__WEBPACK_IMPORTED_MODULE_3__._registerNode)(Line);
_Factory_js__WEBPACK_IMPORTED_MODULE_0__.Factory.addGetterSetter(Line, 'closed', false);
_Factory_js__WEBPACK_IMPORTED_MODULE_0__.Factory.addGetterSetter(Line, 'bezier', false);
_Factory_js__WEBPACK_IMPORTED_MODULE_0__.Factory.addGetterSetter(Line, 'tension', 0, (0,_Validators_js__WEBPACK_IMPORTED_MODULE_2__.getNumberValidator)());
_Factory_js__WEBPACK_IMPORTED_MODULE_0__.Factory.addGetterSetter(Line, 'points', [], (0,_Validators_js__WEBPACK_IMPORTED_MODULE_2__.getNumberArrayValidator)());


/***/ }),

/***/ "../../node_modules/konva/lib/shapes/Rect.js":
/*!***************************************************!*\
  !*** ../../node_modules/konva/lib/shapes/Rect.js ***!
  \***************************************************/
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "Rect": () => (/* binding */ Rect)
/* harmony export */ });
/* harmony import */ var _Factory_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../Factory.js */ "../../node_modules/konva/lib/Factory.js");
/* harmony import */ var _Shape_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../Shape.js */ "../../node_modules/konva/lib/Shape.js");
/* harmony import */ var _Global_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../Global.js */ "../../node_modules/konva/lib/Global.js");
/* harmony import */ var _Util_js__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../Util.js */ "../../node_modules/konva/lib/Util.js");
/* harmony import */ var _Validators_js__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ../Validators.js */ "../../node_modules/konva/lib/Validators.js");





class Rect extends _Shape_js__WEBPACK_IMPORTED_MODULE_1__.Shape {
    _sceneFunc(context) {
        var cornerRadius = this.cornerRadius(), width = this.width(), height = this.height();
        context.beginPath();
        if (!cornerRadius) {
            context.rect(0, 0, width, height);
        }
        else {
            _Util_js__WEBPACK_IMPORTED_MODULE_3__.Util.drawRoundedRectPath(context, width, height, cornerRadius);
        }
        context.closePath();
        context.fillStrokeShape(this);
    }
}
Rect.prototype.className = 'Rect';
(0,_Global_js__WEBPACK_IMPORTED_MODULE_2__._registerNode)(Rect);
_Factory_js__WEBPACK_IMPORTED_MODULE_0__.Factory.addGetterSetter(Rect, 'cornerRadius', 0, (0,_Validators_js__WEBPACK_IMPORTED_MODULE_4__.getNumberOrArrayOfNumbersValidator)(4));


/***/ }),

/***/ "../../node_modules/konva/lib/shapes/Text.js":
/*!***************************************************!*\
  !*** ../../node_modules/konva/lib/shapes/Text.js ***!
  \***************************************************/
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "Text": () => (/* binding */ Text),
/* harmony export */   "stringToArray": () => (/* binding */ stringToArray)
/* harmony export */ });
/* harmony import */ var _Util_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../Util.js */ "../../node_modules/konva/lib/Util.js");
/* harmony import */ var _Factory_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../Factory.js */ "../../node_modules/konva/lib/Factory.js");
/* harmony import */ var _Shape_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../Shape.js */ "../../node_modules/konva/lib/Shape.js");
/* harmony import */ var _Validators_js__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../Validators.js */ "../../node_modules/konva/lib/Validators.js");
/* harmony import */ var _Global_js__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ../Global.js */ "../../node_modules/konva/lib/Global.js");





function stringToArray(string) {
    return Array.from(string);
}
var AUTO = 'auto', CENTER = 'center', JUSTIFY = 'justify', CHANGE_KONVA = 'Change.konva', CONTEXT_2D = '2d', DASH = '-', LEFT = 'left', TEXT = 'text', TEXT_UPPER = 'Text', TOP = 'top', BOTTOM = 'bottom', MIDDLE = 'middle', NORMAL = 'normal', PX_SPACE = 'px ', SPACE = ' ', RIGHT = 'right', WORD = 'word', CHAR = 'char', NONE = 'none', ELLIPSIS = '…', ATTR_CHANGE_LIST = [
    'fontFamily',
    'fontSize',
    'fontStyle',
    'fontVariant',
    'padding',
    'align',
    'verticalAlign',
    'lineHeight',
    'text',
    'width',
    'height',
    'wrap',
    'ellipsis',
    'letterSpacing',
], attrChangeListLen = ATTR_CHANGE_LIST.length;
function normalizeFontFamily(fontFamily) {
    return fontFamily
        .split(',')
        .map((family) => {
        family = family.trim();
        const hasSpace = family.indexOf(' ') >= 0;
        const hasQuotes = family.indexOf('"') >= 0 || family.indexOf("'") >= 0;
        if (hasSpace && !hasQuotes) {
            family = `"${family}"`;
        }
        return family;
    })
        .join(', ');
}
var dummyContext;
function getDummyContext() {
    if (dummyContext) {
        return dummyContext;
    }
    dummyContext = _Util_js__WEBPACK_IMPORTED_MODULE_0__.Util.createCanvasElement().getContext(CONTEXT_2D);
    return dummyContext;
}
function _fillFunc(context) {
    context.fillText(this._partialText, this._partialTextX, this._partialTextY);
}
function _strokeFunc(context) {
    context.strokeText(this._partialText, this._partialTextX, this._partialTextY);
}
function checkDefaultFill(config) {
    config = config || {};
    if (!config.fillLinearGradientColorStops &&
        !config.fillRadialGradientColorStops &&
        !config.fillPatternImage) {
        config.fill = config.fill || 'black';
    }
    return config;
}
class Text extends _Shape_js__WEBPACK_IMPORTED_MODULE_2__.Shape {
    constructor(config) {
        super(checkDefaultFill(config));
        this._partialTextX = 0;
        this._partialTextY = 0;
        for (var n = 0; n < attrChangeListLen; n++) {
            this.on(ATTR_CHANGE_LIST[n] + CHANGE_KONVA, this._setTextData);
        }
        this._setTextData();
    }
    _sceneFunc(context) {
        var textArr = this.textArr, textArrLen = textArr.length;
        if (!this.text()) {
            return;
        }
        var padding = this.padding(), fontSize = this.fontSize(), lineHeightPx = this.lineHeight() * fontSize, verticalAlign = this.verticalAlign(), alignY = 0, align = this.align(), totalWidth = this.getWidth(), letterSpacing = this.letterSpacing(), fill = this.fill(), textDecoration = this.textDecoration(), shouldUnderline = textDecoration.indexOf('underline') !== -1, shouldLineThrough = textDecoration.indexOf('line-through') !== -1, n;
        var translateY = 0;
        var translateY = lineHeightPx / 2;
        var lineTranslateX = 0;
        var lineTranslateY = 0;
        context.setAttr('font', this._getContextFont());
        context.setAttr('textBaseline', MIDDLE);
        context.setAttr('textAlign', LEFT);
        if (verticalAlign === MIDDLE) {
            alignY = (this.getHeight() - textArrLen * lineHeightPx - padding * 2) / 2;
        }
        else if (verticalAlign === BOTTOM) {
            alignY = this.getHeight() - textArrLen * lineHeightPx - padding * 2;
        }
        context.translate(padding, alignY + padding);
        for (n = 0; n < textArrLen; n++) {
            var lineTranslateX = 0;
            var lineTranslateY = 0;
            var obj = textArr[n], text = obj.text, width = obj.width, lastLine = obj.lastInParagraph, spacesNumber, oneWord, lineWidth;
            context.save();
            if (align === RIGHT) {
                lineTranslateX += totalWidth - width - padding * 2;
            }
            else if (align === CENTER) {
                lineTranslateX += (totalWidth - width - padding * 2) / 2;
            }
            if (shouldUnderline) {
                context.save();
                context.beginPath();
                context.moveTo(lineTranslateX, translateY + lineTranslateY + Math.round(fontSize / 2));
                spacesNumber = text.split(' ').length - 1;
                oneWord = spacesNumber === 0;
                lineWidth =
                    align === JUSTIFY && lastLine && !oneWord
                        ? totalWidth - padding * 2
                        : width;
                context.lineTo(lineTranslateX + Math.round(lineWidth), translateY + lineTranslateY + Math.round(fontSize / 2));
                context.lineWidth = fontSize / 15;
                context.strokeStyle = fill;
                context.stroke();
                context.restore();
            }
            if (shouldLineThrough) {
                context.save();
                context.beginPath();
                context.moveTo(lineTranslateX, translateY + lineTranslateY);
                spacesNumber = text.split(' ').length - 1;
                oneWord = spacesNumber === 0;
                lineWidth =
                    align === JUSTIFY && lastLine && !oneWord
                        ? totalWidth - padding * 2
                        : width;
                context.lineTo(lineTranslateX + Math.round(lineWidth), translateY + lineTranslateY);
                context.lineWidth = fontSize / 15;
                context.strokeStyle = fill;
                context.stroke();
                context.restore();
            }
            if (letterSpacing !== 0 || align === JUSTIFY) {
                spacesNumber = text.split(' ').length - 1;
                var array = stringToArray(text);
                for (var li = 0; li < array.length; li++) {
                    var letter = array[li];
                    if (letter === ' ' && !lastLine && align === JUSTIFY) {
                        lineTranslateX += (totalWidth - padding * 2 - width) / spacesNumber;
                    }
                    this._partialTextX = lineTranslateX;
                    this._partialTextY = translateY + lineTranslateY;
                    this._partialText = letter;
                    context.fillStrokeShape(this);
                    lineTranslateX += this.measureSize(letter).width + letterSpacing;
                }
            }
            else {
                this._partialTextX = lineTranslateX;
                this._partialTextY = translateY + lineTranslateY;
                this._partialText = text;
                context.fillStrokeShape(this);
            }
            context.restore();
            if (textArrLen > 1) {
                translateY += lineHeightPx;
            }
        }
    }
    _hitFunc(context) {
        var width = this.getWidth(), height = this.getHeight();
        context.beginPath();
        context.rect(0, 0, width, height);
        context.closePath();
        context.fillStrokeShape(this);
    }
    setText(text) {
        var str = _Util_js__WEBPACK_IMPORTED_MODULE_0__.Util._isString(text)
            ? text
            : text === null || text === undefined
                ? ''
                : text + '';
        this._setAttr(TEXT, str);
        return this;
    }
    getWidth() {
        var isAuto = this.attrs.width === AUTO || this.attrs.width === undefined;
        return isAuto ? this.getTextWidth() + this.padding() * 2 : this.attrs.width;
    }
    getHeight() {
        var isAuto = this.attrs.height === AUTO || this.attrs.height === undefined;
        return isAuto
            ? this.fontSize() * this.textArr.length * this.lineHeight() +
                this.padding() * 2
            : this.attrs.height;
    }
    getTextWidth() {
        return this.textWidth;
    }
    getTextHeight() {
        _Util_js__WEBPACK_IMPORTED_MODULE_0__.Util.warn('text.getTextHeight() method is deprecated. Use text.height() - for full height and text.fontSize() - for one line height.');
        return this.textHeight;
    }
    measureSize(text) {
        var _context = getDummyContext(), fontSize = this.fontSize(), metrics;
        _context.save();
        _context.font = this._getContextFont();
        metrics = _context.measureText(text);
        _context.restore();
        return {
            width: metrics.width,
            height: fontSize,
        };
    }
    _getContextFont() {
        return (this.fontStyle() +
            SPACE +
            this.fontVariant() +
            SPACE +
            (this.fontSize() + PX_SPACE) +
            normalizeFontFamily(this.fontFamily()));
    }
    _addTextLine(line) {
        if (this.align() === JUSTIFY) {
            line = line.trim();
        }
        var width = this._getTextWidth(line);
        return this.textArr.push({
            text: line,
            width: width,
            lastInParagraph: false,
        });
    }
    _getTextWidth(text) {
        var letterSpacing = this.letterSpacing();
        var length = text.length;
        return (getDummyContext().measureText(text).width +
            (length ? letterSpacing * (length - 1) : 0));
    }
    _setTextData() {
        var lines = this.text().split('\n'), fontSize = +this.fontSize(), textWidth = 0, lineHeightPx = this.lineHeight() * fontSize, width = this.attrs.width, height = this.attrs.height, fixedWidth = width !== AUTO && width !== undefined, fixedHeight = height !== AUTO && height !== undefined, padding = this.padding(), maxWidth = width - padding * 2, maxHeightPx = height - padding * 2, currentHeightPx = 0, wrap = this.wrap(), shouldWrap = wrap !== NONE, wrapAtWord = wrap !== CHAR && shouldWrap, shouldAddEllipsis = this.ellipsis();
        this.textArr = [];
        getDummyContext().font = this._getContextFont();
        var additionalWidth = shouldAddEllipsis ? this._getTextWidth(ELLIPSIS) : 0;
        for (var i = 0, max = lines.length; i < max; ++i) {
            var line = lines[i];
            var lineWidth = this._getTextWidth(line);
            if (fixedWidth && lineWidth > maxWidth) {
                while (line.length > 0) {
                    var low = 0, high = line.length, match = '', matchWidth = 0;
                    while (low < high) {
                        var mid = (low + high) >>> 1, substr = line.slice(0, mid + 1), substrWidth = this._getTextWidth(substr) + additionalWidth;
                        if (substrWidth <= maxWidth) {
                            low = mid + 1;
                            match = substr;
                            matchWidth = substrWidth;
                        }
                        else {
                            high = mid;
                        }
                    }
                    if (match) {
                        if (wrapAtWord) {
                            var wrapIndex;
                            var nextChar = line[match.length];
                            var nextIsSpaceOrDash = nextChar === SPACE || nextChar === DASH;
                            if (nextIsSpaceOrDash && matchWidth <= maxWidth) {
                                wrapIndex = match.length;
                            }
                            else {
                                wrapIndex =
                                    Math.max(match.lastIndexOf(SPACE), match.lastIndexOf(DASH)) +
                                        1;
                            }
                            if (wrapIndex > 0) {
                                low = wrapIndex;
                                match = match.slice(0, low);
                                matchWidth = this._getTextWidth(match);
                            }
                        }
                        match = match.trimRight();
                        this._addTextLine(match);
                        textWidth = Math.max(textWidth, matchWidth);
                        currentHeightPx += lineHeightPx;
                        var shouldHandleEllipsis = this._shouldHandleEllipsis(currentHeightPx);
                        if (shouldHandleEllipsis) {
                            this._tryToAddEllipsisToLastLine();
                            break;
                        }
                        line = line.slice(low);
                        line = line.trimLeft();
                        if (line.length > 0) {
                            lineWidth = this._getTextWidth(line);
                            if (lineWidth <= maxWidth) {
                                this._addTextLine(line);
                                currentHeightPx += lineHeightPx;
                                textWidth = Math.max(textWidth, lineWidth);
                                break;
                            }
                        }
                    }
                    else {
                        break;
                    }
                }
            }
            else {
                this._addTextLine(line);
                currentHeightPx += lineHeightPx;
                textWidth = Math.max(textWidth, lineWidth);
                if (this._shouldHandleEllipsis(currentHeightPx) && i < max - 1) {
                    this._tryToAddEllipsisToLastLine();
                }
            }
            if (fixedHeight && currentHeightPx + lineHeightPx > maxHeightPx) {
                break;
            }
            if (this.textArr[this.textArr.length - 1]) {
                this.textArr[this.textArr.length - 1].lastInParagraph = true;
            }
        }
        this.textHeight = fontSize;
        this.textWidth = textWidth;
    }
    _shouldHandleEllipsis(currentHeightPx) {
        var fontSize = +this.fontSize(), lineHeightPx = this.lineHeight() * fontSize, height = this.attrs.height, fixedHeight = height !== AUTO && height !== undefined, padding = this.padding(), maxHeightPx = height - padding * 2, wrap = this.wrap(), shouldWrap = wrap !== NONE;
        return (!shouldWrap ||
            (fixedHeight && currentHeightPx + lineHeightPx > maxHeightPx));
    }
    _tryToAddEllipsisToLastLine() {
        var width = this.attrs.width, fixedWidth = width !== AUTO && width !== undefined, padding = this.padding(), maxWidth = width - padding * 2, shouldAddEllipsis = this.ellipsis();
        var lastLine = this.textArr[this.textArr.length - 1];
        if (!lastLine || !shouldAddEllipsis) {
            return;
        }
        if (fixedWidth) {
            var haveSpace = this._getTextWidth(lastLine.text + ELLIPSIS) < maxWidth;
            if (!haveSpace) {
                lastLine.text = lastLine.text.slice(0, lastLine.text.length - 3);
            }
        }
        this.textArr.splice(this.textArr.length - 1, 1);
        this._addTextLine(lastLine.text + ELLIPSIS);
    }
    getStrokeScaleEnabled() {
        return true;
    }
}
Text.prototype._fillFunc = _fillFunc;
Text.prototype._strokeFunc = _strokeFunc;
Text.prototype.className = TEXT_UPPER;
Text.prototype._attrsAffectingSize = [
    'text',
    'fontSize',
    'padding',
    'wrap',
    'lineHeight',
    'letterSpacing',
];
(0,_Global_js__WEBPACK_IMPORTED_MODULE_4__._registerNode)(Text);
_Factory_js__WEBPACK_IMPORTED_MODULE_1__.Factory.overWriteSetter(Text, 'width', (0,_Validators_js__WEBPACK_IMPORTED_MODULE_3__.getNumberOrAutoValidator)());
_Factory_js__WEBPACK_IMPORTED_MODULE_1__.Factory.overWriteSetter(Text, 'height', (0,_Validators_js__WEBPACK_IMPORTED_MODULE_3__.getNumberOrAutoValidator)());
_Factory_js__WEBPACK_IMPORTED_MODULE_1__.Factory.addGetterSetter(Text, 'fontFamily', 'Arial');
_Factory_js__WEBPACK_IMPORTED_MODULE_1__.Factory.addGetterSetter(Text, 'fontSize', 12, (0,_Validators_js__WEBPACK_IMPORTED_MODULE_3__.getNumberValidator)());
_Factory_js__WEBPACK_IMPORTED_MODULE_1__.Factory.addGetterSetter(Text, 'fontStyle', NORMAL);
_Factory_js__WEBPACK_IMPORTED_MODULE_1__.Factory.addGetterSetter(Text, 'fontVariant', NORMAL);
_Factory_js__WEBPACK_IMPORTED_MODULE_1__.Factory.addGetterSetter(Text, 'padding', 0, (0,_Validators_js__WEBPACK_IMPORTED_MODULE_3__.getNumberValidator)());
_Factory_js__WEBPACK_IMPORTED_MODULE_1__.Factory.addGetterSetter(Text, 'align', LEFT);
_Factory_js__WEBPACK_IMPORTED_MODULE_1__.Factory.addGetterSetter(Text, 'verticalAlign', TOP);
_Factory_js__WEBPACK_IMPORTED_MODULE_1__.Factory.addGetterSetter(Text, 'lineHeight', 1, (0,_Validators_js__WEBPACK_IMPORTED_MODULE_3__.getNumberValidator)());
_Factory_js__WEBPACK_IMPORTED_MODULE_1__.Factory.addGetterSetter(Text, 'wrap', WORD);
_Factory_js__WEBPACK_IMPORTED_MODULE_1__.Factory.addGetterSetter(Text, 'ellipsis', false, (0,_Validators_js__WEBPACK_IMPORTED_MODULE_3__.getBooleanValidator)());
_Factory_js__WEBPACK_IMPORTED_MODULE_1__.Factory.addGetterSetter(Text, 'letterSpacing', 0, (0,_Validators_js__WEBPACK_IMPORTED_MODULE_3__.getNumberValidator)());
_Factory_js__WEBPACK_IMPORTED_MODULE_1__.Factory.addGetterSetter(Text, 'text', '', (0,_Validators_js__WEBPACK_IMPORTED_MODULE_3__.getStringValidator)());
_Factory_js__WEBPACK_IMPORTED_MODULE_1__.Factory.addGetterSetter(Text, 'textDecoration', '');


/***/ })

/******/ 	});
/************************************************************************/
/******/ 	// The module cache
/******/ 	var __webpack_module_cache__ = {};
/******/ 	
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/ 		// Check if module is in cache
/******/ 		var cachedModule = __webpack_module_cache__[moduleId];
/******/ 		if (cachedModule !== undefined) {
/******/ 			return cachedModule.exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = __webpack_module_cache__[moduleId] = {
/******/ 			// no module.id needed
/******/ 			// no module.loaded needed
/******/ 			exports: {}
/******/ 		};
/******/ 	
/******/ 		// Execute the module function
/******/ 		__webpack_modules__[moduleId](module, module.exports, __webpack_require__);
/******/ 	
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/ 	
/************************************************************************/
/******/ 	/* webpack/runtime/define property getters */
/******/ 	(() => {
/******/ 		// define getter functions for harmony exports
/******/ 		__webpack_require__.d = (exports, definition) => {
/******/ 			for(var key in definition) {
/******/ 				if(__webpack_require__.o(definition, key) && !__webpack_require__.o(exports, key)) {
/******/ 					Object.defineProperty(exports, key, { enumerable: true, get: definition[key] });
/******/ 				}
/******/ 			}
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/hasOwnProperty shorthand */
/******/ 	(() => {
/******/ 		__webpack_require__.o = (obj, prop) => (Object.prototype.hasOwnProperty.call(obj, prop))
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/make namespace object */
/******/ 	(() => {
/******/ 		// define __esModule on exports
/******/ 		__webpack_require__.r = (exports) => {
/******/ 			if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 				Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 			}
/******/ 			Object.defineProperty(exports, '__esModule', { value: true });
/******/ 		};
/******/ 	})();
/******/ 	
/************************************************************************/
var __webpack_exports__ = {};
// This entry need to be wrapped in an IIFE because it need to be isolated against other modules in the chunk.
(() => {
/*!*****************!*\
  !*** ./main.js ***!
  \*****************/
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _examples_main_css__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../../examples/main.css */ "../../examples/main.css");
/* harmony import */ var _libs_baseInits__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../../libs/baseInits */ "../../libs/baseInits.js");
/* harmony import */ var _common__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../common */ "../common.js");
/* harmony import */ var _freePaint__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./freePaint */ "./freePaint.js");


const cfgFile = "extres_cfg.json";
const errMsg = `ExtRes: Error reading '${cfgFile}'!`;

function loadJSON () {
	const xhr = new XMLHttpRequest();
	xhr.open( "GET", cfgFile, true );
	xhr.onload = () => {
		if ( xhr.readyState === 4 ) {
			if ( xhr.status === 200 ) {
				initJSON( xhr.responseText );
			} else {
				console.error( errMsg );
			}
		}
	};
	xhr.onerror = () => console.error( errMsg );
	xhr.send(null);
}





////////////////////////////
//////////////////////////////////////////////
////////////////////////////////
//////////////////////////////////////////////////
////////////////////////////////////
//////////////////////////////////////////////////////////
////////////////////////////////
//////////////////////////////////////////////////
////////////////////////////////

////////////////////////////////////////
//////////////////////////////////////////////////////////////////
/////////////////////////////////
////////////////////////////////////////////////////
////////////////////////////////////////////////
//////////////////////////////////////////////////////////////////////////////////
/////////////////////////////////////////
////////////////////////////////////////////////////////////////////
////////////////////////////////////////
//////////////////////////////////////////////////////////////////
//////////////////////////////////
//////////////////////////////////////////////////////
///////////////////////////////////
////////////////////////////////////////////////////////
//////////////////////////////////////
//////////////////////////////////////////////////////////////
//////////

function initJSON ( json ) {

	if ( typeof json === 'string' ) {
		try {
			json = JSON.parse( json, true );
		} catch (e) {
			console.error( `Format-Error in JSON file '${cfgFile}'` );
			return;
		}
	}

	const cfg = (0,_common__WEBPACK_IMPORTED_MODULE_1__.clearCfgJson)( json );
/////////////////////////////////////////////////////////////////
//////////////////////////////
/////////
	const base = new _libs_baseInits__WEBPACK_IMPORTED_MODULE_2__.baseInits( { container: 'container' } );
//////////
	if ( cfg.dataSettings ) {
		base.dataSettings = cfg.dataSettings;
	}

////////////////////////////
///////////////////////////////////////////////
////////////////////////////////
/////////////////////////////////////////////////
////////////////////////////////////
/////////////////////////////////////////////////////
////////////////////////////////
/////////////////////////////////////////////////
////////////////////////////////
	const io = new _freePaint__WEBPACK_IMPORTED_MODULE_3__.freePaintFromSchema( base, cfg );
////////////////////////////////////////
/////////////////////////////////////////////////////////
/////////////////////////////////
//////////////////////////////////////////////////
////////////////////////////////////////////////
/////////////////////////////////////////////////////////////////
/////////////////////////////////////////
//////////////////////////////////////////////////////////
////////////////////////////////////////
/////////////////////////////////////////////////////////
//////////////////////////////////
///////////////////////////////////////////////////
///////////////////////////////////
//////////////////////////////////////////////////////////////////
//////////////////////////////////////
/////////////////////////////////////////////////////////////////////
//////////

	(0,_common__WEBPACK_IMPORTED_MODULE_1__.addStatusVarDef)( io, json );

	window.getState = io.getState.bind(io);
	window.setState = io.setState.bind(io);
}

document.addEventListener( "DOMContentLoaded", loadJSON );

})();

/******/ })()
;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,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QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLElBQUk7QUFDSjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNPO0FBQ1A7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ087QUFDUDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDTztBQUNQO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDTztBQUNQO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNPO0FBQ1A7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsbUNBQW1DO0FBQ25DO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNPO0FBQ1A7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ087QUFDUDtBQUNBO0FBQ0E7QUFDQSxhQUFhO0FBQ2IsY0FBYztBQUNkO0FBQ0E7QUFDQTtBQUNBLGFBQWE7QUFDYixhQUFhO0FBQ2I7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLEdBQUc7QUFDSDtBQUNBOzs7Ozs7Ozs7Ozs7Ozs7QUNoUEE7QUFDQTtBQUNPO0FBQ1A7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLE9BQU8sSUFBcUM7QUFDNUM7QUFDQTtBQUNBO0FBQ0E7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QTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLGlEQUFpRDtBQUNqRDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsU0FBUztBQUNUO0FBQ0E7QUFDQSw4REFBOEQsbUJBQW1CO0FBQ2pGO0FBQ0EsUUFBUTtBQUNSO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLEtBQUs7QUFDTDtBQUNBO0FBQ0E7QUFDQSxLQUFLO0FBQ0w7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsS0FBSztBQUNMO0FBQ0EsSUFBSTtBQUNKO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsT0FBTztBQUNQLEtBQUs7QUFDTDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxJQUFJO0FBQ0o7QUFDQSxTQUFTLG9EQUFXO0FBQ3BCO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxJQUFJO0FBQ0o7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSwyQ0FBMkM7QUFDM0M7QUFDQTtBQUNBO0FBQ0E7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QVM7QUFDVDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSw0QkFBNEIsc0JBQXNCO0FBQ2xEO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsU0FBUztBQUNUO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsU0FBUztBQUNUO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLGtCQUFrQixrRUFBNEI7QUFDOUM7QUFDQTtBQUNBO0FBQ0EsU0FBUztBQUNUO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsbUJBQW1CLCtEQUF5QjtBQUM1QztBQUNBO0FBQ0EsU0FBUztBQUNUO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxTQUFTO0FBQ1Q7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxTQUFTO0FBQ1Q7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLFNBQVM7QUFDVDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsU0FBUztBQUNUO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsYUFBYTtBQUNiO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLFNBQVM7QUFDVDtBQUNBO0FBQ0Esd0JBQXdCLG1CQUFtQjtBQUMzQztBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLDBFQUFpQztBQUNqQztBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsZ0VBQXVCLGdDQUFnQyxrRUFBa0I7QUFDekUsZ0VBQXVCLGdDQUFnQyxrRUFBa0I7QUFDekUsZ0VBQXVCLG9DQUFvQyxrRUFBa0I7QUFDN0UsZ0VBQXVCLHFDQUFxQyxrRUFBa0I7QUFDOUUsZ0VBQXVCOzs7Ozs7Ozs7Ozs7Ozs7Ozs7O0FDN1RVO0FBQ0c7QUFDcEM7QUFDQSw4Q0FBOEMsMENBQUk7QUFDbEQsZ0JBQWdCLFNBQVM7QUFDekI7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLDJIQUEySDtBQUMzSDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNPO0FBQ1A7QUFDQTtBQUNBLFlBQVkseURBQWlCO0FBQzdCO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLG9CQUFvQixTQUFTO0FBQzdCO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLHdCQUF3QixtREFBYTtBQUNyQztBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsaUJBQWlCO0FBQ2pCO0FBQ0E7QUFDQTtBQUNBLG9CQUFvQixTQUFTO0FBQzdCO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxhQUFhO0FBQ2I7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsU0FBUztBQUNUO0FBQ0E7QUFDQSxTQUFTO0FBQ1QsS0FBSztBQUNMLENBQUM7QUFDTTtBQUNQO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsNEJBQTRCLHVCQUF1QjtBQUNuRDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLFNBQVM7QUFDVDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDTztBQUNQO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsU0FBUztBQUNUO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7Ozs7Ozs7Ozs7Ozs7Ozs7O0FDcGhCNEM7QUFDQTtBQUM1QyxpRUFBZSxvREFBSyxFQUFDOzs7Ozs7Ozs7Ozs7Ozs7OztBQ0ZlO0FBQ0g7QUFDMUI7QUFDUDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxTQUFTO0FBQ1Q7QUFDQSxLQUFLO0FBQ0w7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLFNBQVM7QUFDVDtBQUNBLEtBQUs7QUFDTDtBQUNBO0FBQ0E7QUFDQTtBQUNBLG9CQUFvQixPQUFPO0FBQzNCO0FBQ0E7QUFDQTtBQUNBLGlDQUFpQyw2REFBdUI7QUFDeEQ7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLGlDQUFpQyxLQUFLO0FBQ3RDO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLFNBQVM7QUFDVDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsYUFBYTtBQUNiLFNBQVM7QUFDVCxLQUFLO0FBQ0w7QUFDQTtBQUNBO0FBQ0Esb0JBQW9CLE9BQU87QUFDM0I7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxnQkFBZ0IsK0RBQXVCO0FBQ3ZDLGdCQUFnQiwrREFBdUI7QUFDdkMsZ0JBQWdCLGlFQUF5QjtBQUN6QztBQUNBO0FBQ0E7QUFDQSxzQ0FBc0MsbURBQWM7QUFDcEQ7QUFDQTtBQUNBO0FBQ0EsU0FBUztBQUNUO0FBQ0E7QUFDQSxTQUFTO0FBQ1QsS0FBSztBQUNMO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsaUJBQWlCO0FBQ2pCO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsU0FBUztBQUNULEtBQUs7QUFDTDtBQUNBLElBQUksdURBQWU7QUFDbkI7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7Ozs7Ozs7Ozs7Ozs7Ozs7O0FDM0dpQztBQUN1QjtBQUN4RDtBQUNPO0FBQ1A7QUFDQTtBQUNBO0FBQ0E7QUFDQSxLQUFLO0FBQ0w7QUFDQSwyQkFBMkIsc0RBQWdCO0FBQzNDO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLEtBQUs7QUFDTDtBQUNBLDJCQUEyQixzREFBZ0I7QUFDM0M7QUFDQTtBQUNBO0FBQ0EsS0FBSztBQUNMO0FBQ0EsMkJBQTJCLHNEQUFnQjtBQUMzQztBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLEtBQUs7QUFDTDtBQUNBLGtEQUFrRCxzREFBZ0I7QUFDbEU7QUFDQTtBQUNBLHdCQUF3QixTQUFTO0FBQ2pDO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSw2QkFBNkIscUVBQXFCO0FBQ2xEO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxpQkFBaUI7QUFDakI7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLEtBQUs7QUFDTDtBQUNBLDhCQUE4QixzREFBZ0I7QUFDOUM7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxLQUFLO0FBQ0w7QUFDQSxRQUFRLGdEQUFVO0FBQ2xCLDJCQUEyQixzREFBZ0I7QUFDM0M7QUFDQTtBQUNBO0FBQ0EsWUFBWSxnREFBVTtBQUN0QjtBQUNBO0FBQ0E7QUFDQTtBQUNBLFlBQVksZ0RBQVU7QUFDdEIsU0FBUztBQUNUO0FBQ0EsS0FBSztBQUNMO0FBQ0EsUUFBUSwrQ0FBUztBQUNqQjtBQUNBLGtDQUFrQyxzREFBZ0I7QUFDbEQsa0NBQWtDLHNEQUFnQjtBQUNsRDtBQUNBO0FBQ0EsZ0JBQWdCLGdEQUFVO0FBQzFCO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxTQUFTO0FBQ1QsS0FBSztBQUNMO0FBQ0E7QUFDQSxLQUFLO0FBQ0w7Ozs7Ozs7Ozs7Ozs7Ozs7OztBQ3pIaUM7QUFDRTtBQUNTO0FBQ3JDLHdCQUF3Qiw0Q0FBSztBQUNwQztBQUNBO0FBQ0E7QUFDQSxRQUFRLCtDQUFTLGdFQUFnRSxrQkFBa0I7QUFDbkc7QUFDQTtBQUNBO0FBQ0EseURBQWE7Ozs7Ozs7Ozs7Ozs7Ozs7O0FDWGI7QUFDQTtBQUNBO0FBQ0EsV0FBVztBQUNYLGNBQWM7QUFDZDtBQUNPO0FBQ1A7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ087QUFDUDtBQUNBO0FBQ0E7QUFDQSxtREFBbUQ7QUFDbkQ7QUFDQTtBQUNBO0FBQ0EsS0FBSztBQUNMO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLEtBQUs7QUFDTDtBQUNBO0FBQ0EsS0FBSztBQUNMO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsS0FBSztBQUNMO0FBQ087QUFDUDtBQUNBO0FBQ0E7Ozs7Ozs7Ozs7Ozs7Ozs7OztBQ3hEaUM7QUFDVTtBQUNDO0FBQ3JDLG9CQUFvQixvREFBUztBQUNwQztBQUNBO0FBQ0E7QUFDQSxZQUFZLG1EQUFVO0FBQ3RCO0FBQ0E7QUFDQTtBQUNBO0FBQ0EseURBQWE7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0FDWm9CO0FBQ1U7QUFDVjtBQUNNO0FBQ2M7QUFDQztBQUNsQjtBQUNRO0FBQzVDO0FBQ0EsTUFBTSxZQUFZO0FBQ2xCLE1BQU0sY0FBYztBQUNwQixNQUFNLGFBQWE7QUFDbkIsTUFBTSxZQUFZO0FBQ2xCLE1BQU0sYUFBYTtBQUNuQjtBQUNPLG9CQUFvQixvREFBUztBQUNwQztBQUNBO0FBQ0EsMEJBQTBCLG1EQUFXO0FBQ3JDLDZCQUE2QixpREFBUztBQUN0QztBQUNBLFNBQVM7QUFDVDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxRQUFRLG1FQUE2QjtBQUNyQztBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0Esb0JBQW9CLGdFQUEwQjtBQUM5QztBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsWUFBWSxrRUFBNEI7QUFDeEM7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxZQUFZLHNFQUFnQztBQUM1QztBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsUUFBUSxnRUFBMEI7QUFDbEMsNkNBQTZDLHdEQUFrQjtBQUMvRDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLGNBQWMsZUFBZTtBQUM3QjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsWUFBWSxtREFBVTtBQUN0QjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsZUFBZSx3RUFBa0M7QUFDakQ7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLFFBQVEsK0NBQVM7QUFDakI7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxRQUFRLCtDQUFTO0FBQ2pCO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsWUFBWSwyREFBcUI7QUFDakM7QUFDQTtBQUNBLGFBQWE7QUFDYjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLDRCQUE0Qiw4QkFBOEI7QUFDMUQ7QUFDQTtBQUNBO0FBQ0E7QUFDQSxpQkFBaUI7QUFDakI7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSw2QkFBNkIsb0RBQWM7QUFDM0MsMEJBQTBCLDZDQUFNO0FBQ2hDO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxTQUFTO0FBQ1Q7QUFDQTtBQUNBO0FBQ0EsUUFBUSw2RUFBa0M7QUFDMUM7QUFDQTtBQUNBLFNBQVM7QUFDVDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLFFBQVEsMkVBQWdDO0FBQ3hDO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxRQUFRLCtDQUFTO0FBQ2pCO0FBQ0E7QUFDQTtBQUNBLFFBQVEsK0NBQVM7QUFDakI7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxRQUFRLHdEQUFrQjtBQUMxQjtBQUNBO0FBQ0E7QUFDQTtBQUNBLHlEQUFhO0FBQ2IsZ0VBQXVCO0FBQ3ZCLGdFQUF1QjtBQUN2QixnRUFBdUIsaUNBQWlDLG1FQUFtQjs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0FDaFQvQjtBQUNMO0FBQ2M7QUFDakI7QUFDRTtBQUN5RDtBQUMvRjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNPO0FBQ1A7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxhQUFhO0FBQ2I7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0Esb0JBQW9CLHFCQUFxQjtBQUN6QyxZQUFZLHdEQUFrQjtBQUM5QjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLGFBQWE7QUFDYjtBQUNBO0FBQ0E7QUFDQSxZQUFZLGdEQUFVO0FBQ3RCO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLG9DQUFvQyxtREFBVztBQUMvQztBQUNBO0FBQ0E7QUFDQSxTQUFTLDRCQUE0QixtREFBVztBQUNoRDtBQUNBO0FBQ0E7QUFDQSxTQUFTLHlCQUF5QixpREFBUztBQUMzQztBQUNBO0FBQ0E7QUFDQSxTQUFTO0FBQ1Q7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsU0FBUztBQUNUO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxjQUFjLHNCQUFzQjtBQUNwQyxjQUFjLG1DQUFtQztBQUNqRCxjQUFjLGlEQUFpRDtBQUMvRCxjQUFjLG9DQUFvQztBQUNsRDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLFNBQVM7QUFDVDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxnQ0FBZ0MsU0FBUztBQUN6QztBQUNBO0FBQ0EsNEJBQTRCLGdEQUFVO0FBQ3RDO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLG9CQUFvQixnREFBVTtBQUM5QjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxvQkFBb0IsU0FBUztBQUM3QjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLGFBQWE7QUFDYjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0Esb0JBQW9CLFNBQVM7QUFDN0I7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLFNBQVM7QUFDVDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLDRCQUE0QixvQkFBb0I7QUFDaEQsc0JBQXNCLHNEQUFnQjtBQUN0QztBQUNBO0FBQ0E7QUFDQSxTQUFTO0FBQ1Q7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLFFBQVEsdUVBQXVCO0FBQy9CO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSw2QkFBNkIsc0RBQWdCO0FBQzdDLFlBQVksc0RBQWdCO0FBQzVCO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsK0JBQStCLHNEQUFnQjtBQUMvQyxvQkFBb0Isc0RBQWdCO0FBQ3BDO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLFNBQVM7QUFDVDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLFFBQVEscUVBQXdCO0FBQ2hDO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLFNBQVM7QUFDVCwwQ0FBMEMsOERBQXNCO0FBQ2hFO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLHdCQUF3QixTQUFTO0FBQ2pDO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsU0FBUztBQUNUO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLGlHQUFpRywrQ0FBUztBQUMxRztBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLDJCQUEyQixvQkFBb0I7QUFDL0M7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLDJCQUEyQixZQUFZO0FBQ3ZDO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0Esb0JBQW9CLFNBQVM7QUFDN0I7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsWUFBWSwrQ0FBUztBQUNyQjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLFlBQVksK0NBQVM7QUFDckI7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxZQUFZLCtDQUFTO0FBQ3JCO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsWUFBWSwrQ0FBUztBQUNyQjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLFlBQVksK0NBQVM7QUFDckI7QUFDQTtBQUNBO0FBQ0EsWUFBWSwrQ0FBUztBQUNyQjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxvQkFBb0I7QUFDcEI7QUFDQTtBQUNBO0FBQ0E7QUFDQSxnQkFBZ0IsbURBQWEsVUFBVSx5REFBbUIsVUFBVSxtREFBYTtBQUNqRjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxlQUFlLDhEQUF3QjtBQUN2QztBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0Esb0JBQW9CLFNBQVM7QUFDN0I7QUFDQSxpQkFBaUIsMERBQW9CO0FBQ3JDLGdCQUFnQiwrQ0FBUztBQUN6QjtBQUNBO0FBQ0EsZ0JBQWdCLCtDQUFTO0FBQ3pCLGdCQUFnQiwrQ0FBUztBQUN6QjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSw0QkFBNEI7QUFDNUI7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLHFCQUFxQiwrQ0FBUztBQUM5QjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsYUFBYTtBQUNiO0FBQ0E7QUFDQTtBQUNBLDREQUE0RCwrQ0FBUztBQUNyRTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0Esa0RBQWtELCtDQUFTO0FBQzNEO0FBQ0EsbURBQW1ELHNEQUFjO0FBQ2pFO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0Esb0JBQW9CLHNEQUFnQjtBQUNwQztBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLHdCQUF3QixTQUFTO0FBQ2pDO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSw2TUFBNk0sbURBQVc7QUFDeE47QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLFNBQVM7QUFDVDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsZ0JBQWdCLHNEQUFnQjtBQUNoQztBQUNBO0FBQ0EsaUJBQWlCO0FBQ2pCO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsU0FBUztBQUNUO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsaUJBQWlCO0FBQ2pCO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsU0FBUztBQUNUO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxtQkFBbUIsMERBQWtCO0FBQ3JDO0FBQ0E7QUFDQTtBQUNBO0FBQ0Esb0JBQW9CLHlCQUF5QjtBQUM3QztBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxTQUFTO0FBQ1Q7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsOEJBQThCLHNEQUFnQjtBQUM5QyxZQUFZLHNEQUFnQjtBQUM1QjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsWUFBWSw2REFBcUI7QUFDakM7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsK0JBQStCLG1EQUFhO0FBQzVDO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSw0QkFBNEIseUJBQXlCO0FBQ3JEO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSw0QkFBNEIsMEJBQTBCO0FBQ3REO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsUUFBUSxpRUFBb0I7QUFDNUI7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLGFBQWE7QUFDYjtBQUNBO0FBQ0EsU0FBUztBQUNUO0FBQ0E7QUFDQSxhQUFhLGlFQUFvQjtBQUNqQztBQUNBO0FBQ0EscUJBQXFCLGlFQUFvQjtBQUN6QztBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsU0FBUztBQUNUO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxnQkFBZ0IsK0NBQVM7QUFDekI7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLHFCQUFxQixpRUFBb0I7QUFDekM7QUFDQTtBQUNBO0FBQ0EsUUFBUSw4REFBaUI7QUFDekIsUUFBUSw2REFBZ0I7QUFDeEI7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EscUJBQXFCLGlFQUFvQjtBQUN6QztBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxnREFBZ0QsaUVBQXlCO0FBQ3pFO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsWUFBWSxxRUFBd0I7QUFDcEM7QUFDQTtBQUNBO0FBQ0EsYUFBYTtBQUNiO0FBQ0E7QUFDQTtBQUNBLFNBQVM7QUFDVDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsZ0NBQWdDLGlFQUFvQjtBQUNwRDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxnQkFBZ0IsdUVBQXVCO0FBQ3ZDO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0Esb0NBQW9DLFlBQVk7QUFDaEQ7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxlQUFlLDJEQUFxQjtBQUNwQztBQUNBO0FBQ0EsWUFBWSxvREFBYztBQUMxQjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxhQUFhLDZDQUFLO0FBQ2xCLFlBQVksK0NBQVM7QUFDckI7QUFDQTtBQUNBO0FBQ0E7QUFDQSxzQkFBc0IsNkNBQUs7QUFDM0I7QUFDQTtBQUNBO0FBQ0Esd0JBQXdCLFNBQVM7QUFDakM7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxDQUFDO0FBQ0Q7QUFDQTtBQUNBLENBQUM7QUFDRDtBQUNBO0FBQ0EsQ0FBQztBQUNEO0FBQ0E7QUFDQSxDQUFDO0FBQ0Qsd0JBQXdCLGdFQUF1QjtBQUMvQztBQUNBO0FBQ0E7QUFDQSw4QkFBOEIsa0VBQWtCO0FBQ2hELDhCQUE4QixrRUFBa0I7QUFDaEQsaUVBQWlFLGtFQUFrQjtBQUNuRixvQ0FBb0Msa0VBQWtCO0FBQ3RELGtDQUFrQyxrRUFBa0I7QUFDcEQsZ0NBQWdDLGtFQUFrQjtBQUNsRCxxQ0FBcUMsa0VBQWtCO0FBQ3ZELDBFQUFpQztBQUNqQyxtQ0FBbUMsa0VBQWtCO0FBQ3JELG1DQUFtQyxrRUFBa0I7QUFDckQsMEVBQWlDO0FBQ2pDLGtDQUFrQyxrRUFBa0I7QUFDcEQsa0NBQWtDLGtFQUFrQjtBQUNwRCwwRUFBaUM7QUFDakMsb0NBQW9DLGtFQUFrQjtBQUN0RCxvQ0FBb0Msa0VBQWtCO0FBQ3RELDRDQUE0QyxrRUFBa0I7QUFDOUQsa0NBQWtDLGtFQUFrQjtBQUNwRCxtQ0FBbUMsa0VBQWtCO0FBQ3JELHlDQUF5QyxtRUFBbUI7QUFDNUQsOENBQThDLG1FQUFtQjtBQUNqRTtBQUNBO0FBQ0E7QUFDQSxDQUFDO0FBQ0QsdUNBQXVDLG1FQUFtQjtBQUMxRCxrREFBa0Qsa0VBQWtCO0FBQ3BFO0FBQ0E7QUFDQSwwQ0FBMEMsbUVBQW1CO0FBQzdELDJEQUFrQjtBQUNsQjtBQUNBO0FBQ0E7QUFDQSxDQUFDOzs7Ozs7Ozs7Ozs7Ozs7Ozs7OztBQ3Y0Q21DO0FBQ3BDO0FBQ0EsK0JBQStCLGtFQUE2QjtBQUNyRDtBQUNQO0FBQ0E7QUFDTztBQUNQO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDTztBQUNQO0FBQ0E7QUFDTztBQUNQO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNPO0FBQ1A7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztBQ3BDb0M7QUFDUTtBQUNMO0FBQ047QUFDc0g7QUFDM0c7QUFDUTtBQUNwRDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLG1CQUFtQiw4REFBd0I7QUFDM0M7QUFDQTtBQUNPO0FBQ1A7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ08sb0JBQW9CLDBDQUFJO0FBQy9CO0FBQ0E7QUFDQTtBQUNBO0FBQ0Esa0JBQWtCLHlEQUFtQjtBQUNyQztBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsUUFBUSwrQ0FBUztBQUNqQjtBQUNBO0FBQ0E7QUFDQSxRQUFRLCtDQUFTO0FBQ2pCO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLCtCQUErQiwrQ0FBUztBQUN4QztBQUNBLDBCQUEwQixzREFBYztBQUN4QztBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLDRCQUE0Qix1QkFBdUI7QUFDbkQ7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsNEJBQTRCLHVCQUF1QjtBQUNuRDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxtQkFBbUIsc0RBQWdCO0FBQ25DO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsU0FBUztBQUNUO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxTQUFTO0FBQ1Q7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxRQUFRLGlFQUEyQjtBQUNuQztBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxRQUFRLCtDQUFTO0FBQ2pCO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLDZCQUE2QjtBQUM3QjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxZQUFZLCtDQUFTO0FBQ3JCO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FB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Q0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ087QUFDUDtBQUNBO0FBQ0E7QUFDQSxLQUFLO0FBQ0w7QUFDQTtBQUNBO0FBQ0EsS0FBSztBQUNMO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLEtBQUs7QUFDTDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxLQUFLO0FBQ0w7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsS0FBSztBQUNMO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsS0FBSztBQUNMO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsS0FBSztBQUNMO0FBQ0E7QUFDQSxLQUFLO0FBQ0w7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxLQUFLO0FBQ0w7QUFDQTtBQUNBLEtBQUs7QUFDTDtBQUNBO0FBQ0EsS0FBSztBQUNMO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxLQUFLO0FBQ0w7QUFDQTtBQUNBLEtBQUs7QUFDTDtBQUNBO0FBQ0EsS0FBSztBQUNMO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxLQUFLO0FBQ0w7QUFDQTtBQUNBLEtBQUs7QUFDTDs7Ozs7Ozs7Ozs7Ozs7Ozs7QUNuZ0JvQztBQUM3QjtBQUNQO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxDQUFDLHdCQUF3QixJQUFJLE1BQU0sSUFBSSxNQUFNLElBQUk7QUFDakQ7QUFDQTtBQUNBO0FBQ0E7QUFDTztBQUNQO0FBQ0E7QUFDQSxLQUFLO0FBQ0w7QUFDQTtBQUNBLEtBQUs7QUFDTDtBQUNBO0FBQ0EsS0FBSztBQUNMO0FBQ0E7QUFDQSxLQUFLO0FBQ0w7QUFDQTtBQUNBO0FBQ0E7QUFDQSxLQUFLO0FBQ0w7QUFDQTtBQUNBLEtBQUs7QUFDTDtBQUNBO0FBQ0EsS0FBSztBQUNMO0FBQ0E7QUFDQSxLQUFLO0FBQ0w7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLEtBQUs7QUFDTDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLEtBQUs7QUFDTDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsaUJBQWlCO0FBQ2pCLGFBQWE7QUFDYjtBQUNBLEtBQUs7QUFDTDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLEtBQUs7QUFDTDtBQUNBO0FBQ0EsS0FBSztBQUNMO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsS0FBSztBQUNMO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLEtBQUs7QUFDTDtBQUNBO0FBQ0EsS0FBSztBQUNMO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxLQUFLO0FBQ0w7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsS0FBSztBQUNMO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsS0FBSztBQUNMO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsS0FBSztBQUNMO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxLQUFLO0FBQ0w7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLEtBQUs7QUFDTDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsYUFBYTtBQUNiO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsS0FBSztBQUNMO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLEtBQUs7QUFDTDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxLQUFLO0FBQ0w7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsS0FBSztBQUNMO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLEtBQUs7QUFDTDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsNEJBQTRCLE9BQU87QUFDbkM7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxLQUFLO0FBQ0w7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLEtBQUs7QUFDTDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsS0FBSztBQUNMO0FBQ0E7QUFDQSxLQUFLO0FBQ0w7QUFDQTtBQUNBLEtBQUs7QUFDTDtBQUNBO0FBQ0EsS0FBSztBQUNMO0FBQ0E7QUFDQTtBQUNBLEtBQUs7QUFDTDtBQUNBO0FBQ0E7QUFDQSxLQUFLO0FBQ0w7QUFDQSxlQUFlLHNEQUFjO0FBQzdCLEtBQUs7QUFDTDtBQUNBO0FBQ0EsS0FBSztBQUNMO0FBQ0E7QUFDQSxLQUFLO0FBQ0w7QUFDQTtBQUNBLEtBQUs7QUFDTDtBQUNBLGFBQWEsMERBQWtCO0FBQy9CO0FBQ0E7QUFDQTtBQUNBLEtBQUs7QUFDTDtBQUNBO0FBQ0E7QUFDQTtBQUNBLEtBQUs7QUFDTDtBQUNBO0FBQ0EsS0FBSztBQUNMO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFD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QTtBQUNBO0FBQ0E7QUFDQTtBQUNBLFFBQVEsK0NBQVM7QUFDakI7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsU0FBUztBQUNUO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLDRDQUE0QyxTQUFTO0FBQ3JEO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLHlEQUFhO0FBQ2IsZ0VBQXVCLGdCQUFnQix3RUFBd0I7QUFDL0QsZ0VBQXVCLGlCQUFpQix3RUFBd0I7QUFDaEUsZ0VBQXVCO0FBQ3ZCLGdFQUF1Qix1QkFBdUIsa0VBQWtCO0FBQ2hFLGdFQUF1QjtBQUN2QixnRUFBdUI7QUFDdkIsZ0VBQXVCLHFCQUFxQixrRUFBa0I7QUFDOUQsZ0VBQXVCO0FBQ3ZCLGdFQUF1QjtBQUN2QixnRUFBdUIsd0JBQXdCLGtFQUFrQjtBQUNqRSxnRUFBdUI7QUFDdkIsZ0VBQXVCLDBCQUEwQixtRUFBbUI7QUFDcEUsZ0VBQXVCLDJCQUEyQixrRUFBa0I7QUFDcEUsZ0VBQXVCLG1CQUFtQixrRUFBa0I7QUFDNUQsZ0VBQXVCOzs7Ozs7O1VDOVd2QjtVQUNBOztVQUVBO1VBQ0E7VUFDQTtVQUNBO1VBQ0E7VUFDQTtVQUNBO1VBQ0E7VUFDQTtVQUNBO1VBQ0E7VUFDQTtVQUNBOztVQUVBO1VBQ0E7O1VBRUE7VUFDQTtVQUNBOzs7OztXQ3RCQTtXQUNBO1dBQ0E7V0FDQTtXQUNBLHlDQUF5Qyx3Q0FBd0M7V0FDakY7V0FDQTtXQUNBOzs7OztXQ1BBOzs7OztXQ0FBO1dBQ0E7V0FDQTtXQUNBLHVEQUF1RCxpQkFBaUI7V0FDeEU7V0FDQSxnREFBZ0QsYUFBYTtXQUM3RDs7Ozs7Ozs7Ozs7Ozs7O0FDTmlDOztBQUVqQztBQUNBLHlDQUF5QyxRQUFROztBQUVqRDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLEtBQUs7QUFDTDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7O0FBR2lEO0FBQ1M7O0FBRTFEO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNrRDtBQUNsRDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBOztBQUVBO0FBQ0E7QUFDQTtBQUNBLElBQUk7QUFDSixnREFBZ0QsUUFBUTtBQUN4RDtBQUNBO0FBQ0E7O0FBRUEsYUFBYSxxREFBWTtBQUN6QjtBQUNBO0FBQ0E7QUFDQSxrQkFBa0Isc0RBQVMsSUFBSSx5QkFBeUI7QUFDeEQ7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsZ0JBQWdCLDJEQUFtQjtBQUNuQztBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBLENBQUMsd0RBQWU7O0FBRWhCO0FBQ0E7QUFDQTs7QUFFQSIsInNvdXJjZXMiOlsid2VicGFjazovLy8uL2ZyZWVQYWludC5qcyIsIndlYnBhY2s6Ly8vLi4vY29tbW9uLmpzIiwid2VicGFjazovLy8uLi8uLi9saWJzL2Jhc2VJbml0cy5qcyIsIndlYnBhY2s6Ly8vLi4vLi4vbGlicy9jbGFzc19leHRlbnNpb25zLmpzIiwid2VicGFjazovLy8uLi8uLi9saWJzL2NvbW1vbi5qcyIsIndlYnBhY2s6Ly8vLi4vLi4vbGlicy9mc20uanMiLCJ3ZWJwYWNrOi8vLy4uLy4uL2xpYnMvaWNvbkJhci5qcyIsIndlYnBhY2s6Ly8vLi4vLi4vbGlicy9yZWN0QXJlYS5qcyIsIndlYnBhY2s6Ly8vLi4vLi4vbGlicy90ZXh0RnJhbWUuanMiLCJ3ZWJwYWNrOi8vLy4uLy4uL2xpYnMvdG9vbHRpcC5qcyIsIndlYnBhY2s6Ly8vLi4vLi4vZXhhbXBsZXMvbWFpbi5jc3M/YTM4NCIsIndlYnBhY2s6Ly8vLi4vLi4vbm9kZV9tb2R1bGVzL2tvbnZhL2xpYi9BbmltYXRpb24uanMiLCJ3ZWJwYWNrOi8vLy4uLy4uL25vZGVfbW9kdWxlcy9rb252YS9saWIvQ2FudmFzLmpzIiwid2VicGFjazovLy8uLi8uLi9ub2RlX21vZHVsZXMva29udmEvbGliL0NvbnRhaW5lci5qcyIsIndlYnBhY2s6Ly8vLi4vLi4vbm9kZV9tb2R1bGVzL2tvbnZhL2xpYi9Db250ZXh0LmpzIiwid2VicGFjazovLy8uLi8uLi9ub2RlX21vZHVsZXMva29udmEvbGliL0NvcmUuanMiLCJ3ZWJwYWNrOi8vLy4uLy4uL25vZGVfbW9kdWxlcy9rb252YS9saWIvRHJhZ0FuZERyb3AuanMiLCJ3ZWJwYWNrOi8vLy4uLy4uL25vZGVfbW9kdWxlcy9rb252YS9saWIvRmFjdG9yeS5qcyIsIndlYnBhY2s6Ly8vLi4vLi4vbm9kZV9tb2R1bGVzL2tvbnZhL2xpYi9GYXN0TGF5ZXIuanMiLCJ3ZWJwYWNrOi8vLy4uLy4uL25vZGVfbW9kdWxlcy9rb252YS9saWIvR2xvYmFsLmpzIiwid2VicGFjazovLy8uLi8uLi9ub2RlX21vZHVsZXMva29udmEvbGliL0dyb3VwLmpzIiwid2VicGFjazovLy8uLi8uLi9ub2RlX21vZHVsZXMva29udmEvbGliL0xheWVyLmpzIiwid2VicGFjazovLy8uLi8uLi9ub2RlX21vZHVsZXMva29udmEvbGliL05vZGUuanMiLCJ3ZWJwYWNrOi8vLy4uLy4uL25vZGVfbW9kdWxlcy9rb252YS9saWIvUG9pbnRlckV2ZW50cy5qcyIsIndlYnBhY2s6Ly8vLi4vLi4vbm9kZV9tb2R1bGVzL2tvbnZhL2xpYi9TaGFwZS5qcyIsIndlYnBhY2s6Ly8vLi4vLi4vbm9kZV9tb2R1bGVzL2tvbnZhL2xpYi9TdGFnZS5qcyIsIndlYnBhY2s6Ly8vLi4vLi4vbm9kZV9tb2R1bGVzL2tvbnZhL2xpYi9Ud2Vlbi5qcyIsIndlYnBhY2s6Ly8vLi4vLi4vbm9kZV9tb2R1bGVzL2tvbnZhL2xpYi9VdGlsLmpzIiwid2VicGFjazovLy8uLi8uLi9ub2RlX21vZHVsZXMva29udmEvbGliL1ZhbGlkYXRvcnMuanMiLCJ3ZWJwYWNrOi8vLy4uLy4uL25vZGVfbW9kdWxlcy9rb252YS9saWIvX0NvcmVJbnRlcm5hbHMuanMiLCJ3ZWJwYWNrOi8vLy4uLy4uL25vZGVfbW9kdWxlcy9rb252YS9saWIvc2hhcGVzL0ltYWdlLmpzIiwid2VicGFjazovLy8uLi8uLi9ub2RlX21vZHVsZXMva29udmEvbGliL3NoYXBlcy9MaW5lLmpzIiwid2VicGFjazovLy8uLi8uLi9ub2RlX21vZHVsZXMva29udmEvbGliL3NoYXBlcy9SZWN0LmpzIiwid2VicGFjazovLy8uLi8uLi9ub2RlX21vZHVsZXMva29udmEvbGliL3NoYXBlcy9UZXh0LmpzIiwid2VicGFjazovLy93ZWJwYWNrL2Jvb3RzdHJhcCIsIndlYnBhY2s6Ly8vd2VicGFjay9ydW50aW1lL2RlZmluZSBwcm9wZXJ0eSBnZXR0ZXJzIiwid2VicGFjazovLy93ZWJwYWNrL3J1bnRpbWUvaGFzT3duUHJvcGVydHkgc2hvcnRoYW5kIiwid2VicGFjazovLy93ZWJwYWNrL3J1bnRpbWUvbWFrZSBuYW1lc3BhY2Ugb2JqZWN0Iiwid2VicGFjazovLy8uL21haW4uanMiXSwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgcmVjdEFyZWFfZnJlZVBhaW50TWFya2VyIH0gZnJvbSBcIi4uLy4uL2xpYnMvcmVjdEFyZWFcIjtcblxuaW1wb3J0IEtvbnZhIGZyb20gJ2tvbnZhL2xpYi9Db3JlJ1xuaW1wb3J0IHsgTGluZSB9IGZyb20gJ2tvbnZhL2xpYi9zaGFwZXMvTGluZSdcblxuZXhwb3J0IGNsYXNzIGZyZWVQYWludEZyb21TY2hlbWEgZXh0ZW5kcyByZWN0QXJlYV9mcmVlUGFpbnRNYXJrZXIge1xuXG5cdGNvbnN0cnVjdG9yICggYmFzZSwgb3B0cyA9IHt9ICkge1xuXG5cdFx0c3VwZXIoIGJhc2UsIG9wdHMgKTtcblxuXHRcdC8vIGRyYXcgZXh0cmEgbGluZXNcblx0XHRvcHRzLmV4dHJhTGluZXMuZm9yRWFjaCggbCA9PiB7XG5cdFx0XHRjb25zdCBrTGluZSA9IG5ldyBLb252YS5MaW5lKHtcblx0XHRcdFx0cG9pbnRzOiBbIGwueDEsIGwueTEsIGwueDIsIGwueTIgXSxcblx0XHRcdFx0c3Ryb2tlOiBsLmMsXG5cdFx0XHRcdHN0cm9rZVdpZHRoOiBsLncsXG5cdFx0XHR9KVxuXHRcdFx0dGhpcy5sYXllci5hZGQoIGtMaW5lICk7XG5cdFx0fSlcblx0XHR0aGlzLmxheWVyLmRyYXcoKTtcblxuXHRcdHRoaXMuc3RhcnRMaXN0ZW5pbmdUb0dldEltYWdlUmVxdWVzdHMoKTtcbi8vLy8vLy8vLy8vLy8vLy8vXG5cdFx0d2luZG93LmdldFBuZ0ltYWdlID0gdGhpcy5nZXRQbmdJbWFnZS5iaW5kKHRoaXMpO1xuLy8vLy8vLy8vL1xuXHR9XG5cblx0Z2V0UG5nSW1hZ2UgKCkge1xuXHRcdGNvbnN0IHVybCA9IHRoaXMuc3RhZ2UudG9EYXRhVVJMKHtcblx0XHRcdG1pbWVUeXBlOiBcImltYWdlL3BuZ1wiLFxuXHRcdFx0eDogdGhpcy54ICsgMC41KnRoaXMuZnJhbWVXaWR0aCxcblx0XHRcdHk6IHRoaXMueSArIDAuNSp0aGlzLmZyYW1lV2lkdGgsXG5cdFx0XHR3aWR0aDogdGhpcy53aWR0aCAtIDIqdGhpcy5mcmFtZVdpZHRoLFxuXHRcdFx0aGVpZ2h0OiB0aGlzLmhlaWdodCAtIDIqdGhpcy5mcmFtZVdpZHRoLFxuXHRcdH0pO1xuXHRcdGNvbnNvbGUubG9nKHVybCk7XG5cdH1cblxuXHRzdGFydExpc3RlbmluZ1RvR2V0SW1hZ2VSZXF1ZXN0cyAoKSB7XG5cblx0XHQvLyBsaXN0ZW5lciBmb3IgcHJvdmlkaW5nIGltYWdlIGFzIEJBU0U2NCBVUkxcblx0XHR3aW5kb3cuYWRkRXZlbnRMaXN0ZW5lcihcblx0XHRcdFwibWVzc2FnZVwiLFxuXHRcdFx0KGV2ZW50KSA9PiB7XG5cblx0XHRcdFx0dHJ5IHtcblx0XHRcdFx0XHRjb25zdCB7IGNhbGxJZCB9ID0gSlNPTi5wYXJzZShldmVudC5kYXRhKTtcblx0XHRcdFx0XHRpZiAoIGNhbGxJZCAhPT0gdW5kZWZpbmVkICYmIGNhbGxJZC5pbmNsdWRlcyhcImdldEltYWdlXCIpICkge1xuXHRcdFx0XHRcdFx0Y29uc3QgaW1hZ2UgPSB0aGlzLmdldFBuZ0ltYWdlKCk7XG5cdFx0XHRcdFx0XHRjb25zdCBwYXNzX2RhdGEgPSB7XG5cdFx0XHRcdFx0XHRcdGltYWdlLFxuXHRcdFx0XHRcdFx0XHRjYWxsSWRcblx0XHRcdFx0XHRcdH07XG5cblx0XHRcdFx0XHRcdHdpbmRvdy5wYXJlbnQucG9zdE1lc3NhZ2UoIEpTT04uc3RyaW5naWZ5KCBwYXNzX2RhdGEgKSwgJyonICk7XG5cdFx0XHRcdFx0fVxuXHRcdFx0XHR9IGNhdGNoIChlKSB7fVxuXHRcdFx0fSxcblx0XHRcdGZhbHNlICk7XG5cdH1cblxufVxuIiwiZXhwb3J0IGZ1bmN0aW9uIGNsZWFyQ2ZnSnNvbigganNvbiApIHtcclxuXHJcblx0aWYgKCB0eXBlb2YganNvbiAhPT0gJ29iamVjdCcgKSB7XHJcblx0XHRyZXR1cm4ganNvbjtcclxuXHR9XHJcblx0aWYgKCBBcnJheS5pc0FycmF5KGpzb24pICkge1xyXG5cdFx0cmV0dXJuIGpzb24ubWFwKCBhID0+IGNsZWFyQ2ZnSnNvbihhKSApXHJcblx0fVxyXG5cclxuXHRjb25zdCByZXMgPSB7fTtcclxuXHJcblx0T2JqZWN0LmVudHJpZXMoIGpzb24gKS5mb3JFYWNoKCAoW2ssdl0pID0+IHtcclxuXHJcblx0XHRpZiAoIGsuc3Vic3RyaW5nKCAwLCAzICkgPT09ICdfX18nICkge1xyXG5cclxuXHRcdFx0Ly8gLy8gS2V5cyBkZXIgRWxlbWVudGUgZWluZXMgQXJyYXlzIG5laG1lblxyXG5cdFx0XHQvLyBjb25zdCBhcmVsa2V5cyA9IGsubWF0Y2goIC9eX19fYXJlbGtleXNfKC4qKS8gKTtcclxuXHRcdFx0Ly8gaWYgKCBhcmVsa2V5cyApIHtcclxuXHRcdFx0Ly8gXHRqc29uWyBhcmVsa2V5c1sxXSBdID0gdi5tYXAoIGUgPT4gT2JqZWN0LmtleXMoZSkgKTtcclxuXHRcdFx0Ly8gfSBlbHNlIHtcclxuXHJcblx0XHRcdFx0Ly8gVmFscyBkZXIgRWxlbWVudGUgZWluZXMgQXJyYXlzIG5laG1lblxyXG5cdFx0XHRcdGNvbnN0IGFyZWx2YWxzID0gay5tYXRjaCggL15fX19hcmVsdmFsc18oLiopLyApO1xyXG5cdFx0XHRcdGlmICggYXJlbHZhbHMgKSB7XHJcblx0XHRcdFx0XHRyZXNbIGFyZWx2YWxzWzFdIF0gPSB2Lm1hcCggZSA9PiBPYmplY3QudmFsdWVzKGUpLm1hcCggYSA9PiBjbGVhckNmZ0pzb24oYSkgKSApO1xyXG5cdFx0XHRcdH0gZWxzZSB7XHJcblxyXG5cdFx0XHRcdFx0Ly8gQWx0ZXJuYXRpdmUgTmFtZW4gZWluZmFjaCBzbyBzcGVpY2hlcm5cclxuXHRcdFx0XHRcdGNvbnN0IGFsdHMgPSBrLm1hdGNoKCAvXl9fX2FsdFteX10qXyguKikvICk7XHJcblx0XHRcdFx0XHRpZiAoIGFsdHMgKSB7XHJcblx0XHRcdFx0XHRcdGlmICggdiAhPT0gdW5kZWZpbmVkICkge1xyXG5cdFx0XHRcdFx0XHRcdHJlc1sgYWx0c1sxXSBdID0gY2xlYXJDZmdKc29uKCB2ICk7XHJcblx0XHRcdFx0XHRcdH1cclxuXHRcdFx0XHRcdH0gZWxzZSB7XHJcblxyXG5cdFx0XHRcdFx0XHQvLyBfX18gT2JqZWN0IGluIGpzb24gaW50ZWdyaWVyZW5cclxuXHRcdFx0XHRcdFx0aWYgKCB0eXBlb2YgdiA9PT0gJ29iamVjdCcgKSB7XHJcblx0XHRcdFx0XHRcdFx0T2JqZWN0LmFzc2lnbiggcmVzLCBjbGVhckNmZ0pzb24odikgKTtcclxuXHRcdFx0XHRcdFx0fVxyXG5cclxuXHRcdFx0XHRcdH1cclxuXHRcdFx0XHR9XHJcblx0XHRcdC8vIH1cclxuXHJcblx0XHR9IGVsc2Uge1xyXG5cclxuXHRcdFx0aWYgKCB2ICE9PSB1bmRlZmluZWQgKSB7XHJcblx0XHRcdFx0cmVzWyBrIF0gPSBjbGVhckNmZ0pzb24odik7XHJcblx0XHRcdH1cclxuXHJcblx0XHR9XHJcblx0fSlcclxuXHJcblx0cmV0dXJuIHJlcztcclxufVxyXG5cclxuLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vXHJcblxyXG5leHBvcnQgZnVuY3Rpb24gYWRkU2NvcmluZ1ZhbHNQYXJzZXIgKG9iaikge1xyXG5cclxuXHRvYmoucGFyc2VTY29yaW5nVmFscyA9IGZ1bmN0aW9uIChvcHRzKSB7XHJcblx0XHRpZiAoIG9wdHMuZGF0YVNldHRpbmdzICYmIG9wdHMuZGF0YVNldHRpbmdzLnNjb3JpbmdWYWxzICYmIHRoaXMuc2NvcmVEZWYgKSB7XHJcblxyXG5cdFx0XHRjb25zdCBzY29yaW5nVmFscyA9IG9wdHMuZGF0YVNldHRpbmdzLnNjb3JpbmdWYWxzO1xyXG5cdFx0XHRjb25zdCBwcmVmID0gb3B0cy5kYXRhU2V0dGluZ3MudmFyaWFibGVQcmVmaXg7XHJcblxyXG5cdFx0XHRjb25zdCBzY29yZXMgPSB0aGlzLnNjb3JlRGVmKCk7XHJcblx0XHRcdGlmICggdHlwZW9mIHNjb3JlcyA9PT0gJ29iamVjdCcgKSB7XHJcblx0XHRcdFx0Y29uc3QgdmFyTmFtZXMgPSBPYmplY3Qua2V5cyggc2NvcmVzICk7XHJcblx0XHRcdFx0aWYgKCB2YXJOYW1lcy5sZW5ndGg+MCApIHtcclxuXHJcblx0XHRcdFx0XHRzY29yaW5nVmFscy5mb3JFYWNoKCBzdiA9PiB7XHJcblx0XHRcdFx0XHRcdGxldCBjb25kID0gc3YuY29uZGl0aW9uO1xyXG5cdFx0XHRcdFx0XHRpZiAoIGNvbmQgKSB7XHJcblx0XHRcdFx0XHRcdFx0bGV0IHNhdmVDb25kID0gY29uZDtcclxuXHRcdFx0XHRcdFx0XHRjb25zdCBhbGxWYXJzSW5Db25kID0gY29uZC5tYXRjaEFsbCggL1xcJFxceyhbXn1dKil9L2cgKTtcclxuXHRcdFx0XHRcdFx0XHRmb3IgKCBjb25zdCB2biBvZiBhbGxWYXJzSW5Db25kICkge1xyXG5cdFx0XHRcdFx0XHRcdFx0aWYgKCB2blsxXS5sZW5ndGggPT0gMCApIHtcclxuXHRcdFx0XHRcdFx0XHRcdFx0Y29uc29sZS5lcnJvciggYFZhcmlhYmxlbi1OYW1lICdbXScgaW4gU2NvcmluZyBuaWNodCB6dWzDpHNzaWdgICk7XHJcblx0XHRcdFx0XHRcdFx0XHR9IGVsc2Uge1xyXG5cdFx0XHRcdFx0XHRcdFx0XHRjb25zdCByZSA9IG5ldyBSZWdFeHAoIHZuWzFdLCAnaScgKTtcclxuXHRcdFx0XHRcdFx0XHRcdFx0Y29uc3Qgc2VsVmFyTmFtZXMgPSB2YXJOYW1lcy5maWx0ZXIoIHYgPT4gdi5tYXRjaChyZSkgKTtcclxuXHRcdFx0XHRcdFx0XHRcdFx0aWYgKCBzZWxWYXJOYW1lcy5sZW5ndGg+MSApIHtcclxuXHRcdFx0XHRcdFx0XHRcdFx0XHRjb25zb2xlLmVycm9yKCBgVmFyaWFibGVuLU5hbWUgJ1ske3ZuWzFdfV0nIGluIFNjb3JpbmcgaXN0IG5pY2h0IGVpbmRldXRpZ2ApO1xyXG5cdFx0XHRcdFx0XHRcdFx0XHRcdHNhdmVDb25kID0gJyc7XHJcblx0XHRcdFx0XHRcdFx0XHRcdH0gZWxzZSBpZiAoIHNlbFZhck5hbWVzLmxlbmd0aCA9PSAwICkge1xyXG5cdFx0XHRcdFx0XHRcdFx0XHRcdGNvbnNvbGUuZXJyb3IoIGBWYXJpYWJsZW4tTmFtZSAnWyR7dm5bMV19XScgaW4gU2NvcmluZyB1bmJla2FubnRgKTtcclxuXHRcdFx0XHRcdFx0XHRcdFx0XHRzYXZlQ29uZCA9ICcnO1xyXG5cdFx0XHRcdFx0XHRcdFx0XHR9IGVsc2Uge1xyXG5cdFx0XHRcdFx0XHRcdFx0XHRcdHNhdmVDb25kID0gc2F2ZUNvbmQucmVwbGFjZSggdm5bMF0sIGByZXMuJHtzZWxWYXJOYW1lc1swXX1gICk7XHJcblx0XHRcdFx0XHRcdFx0XHRcdH1cclxuXHRcdFx0XHRcdFx0XHRcdH1cclxuXHRcdFx0XHRcdFx0XHR9XHJcblx0XHRcdFx0XHRcdFx0aWYgKCBzYXZlQ29uZCApIHtcclxuXHRcdFx0XHRcdFx0XHRcdGlmICggISggJ3Njb3JpbmdWYWxzJyBpbiB0aGlzICkgKSB7XHJcblx0XHRcdFx0XHRcdFx0XHRcdHRoaXMuc2NvcmluZ1ZhbHMgPSB7fTtcclxuXHRcdFx0XHRcdFx0XHRcdH1cclxuXHRcdFx0XHRcdFx0XHRcdHRoaXMuc2NvcmluZ1ZhbHNbIHN2LnZhbCBdID0gc2F2ZUNvbmQ7XHJcblx0XHRcdFx0XHRcdFx0fVxyXG5cdFx0XHRcdFx0XHR9XHJcblx0XHRcdFx0XHR9KTtcclxuXHRcdFx0XHR9XHJcblx0XHRcdH1cclxuXHRcdH1cclxuXHR9XHJcblxyXG5cdG9iai5jb21wdXRlU2NvcmluZ1ZhbHMgPSBmdW5jdGlvbiAocmVzKSB7XHJcblx0XHRpZiAoIHRoaXMuc2NvcmluZ1ZhbHMgKSB7XHJcblx0XHRcdGxldCBzY29yZSA9IG51bGw7XHJcblx0XHRcdGNvbnN0IHNjb3JlRGF0ID0gT2JqZWN0LmVudHJpZXMoIHRoaXMuc2NvcmluZ1ZhbHMgKTtcclxuXHRcdFx0Zm9yICggbGV0IGg9MDsgc2NvcmU9PW51bGwgJiYgaDxzY29yZURhdC5sZW5ndGg7IGgrKyApIHtcclxuXHRcdFx0XHRjb25zdCBbdixjXSA9IHNjb3JlRGF0W2hdO1xyXG5cdFx0XHRcdHRyeSB7XHJcblx0XHRcdFx0XHRpZiAoIGV2YWwoYykgKSB7XHJcblx0XHRcdFx0XHRcdHNjb3JlID0gdjtcclxuXHRcdFx0XHRcdH1cclxuXHRcdFx0XHR9IGNhdGNoIChlKSB7fVxyXG5cdFx0XHR9XHJcblx0XHRcdGNvbnN0IG4gPSBOdW1iZXIoc2NvcmUpXHJcblx0XHRcdHJlc1sgYFNfJHt0aGlzLmRhdGFTZXR0aW5ncy52YXJpYWJsZVByZWZpeH1gIF0gPSBzY29yZSE9PSBudWxsICYmIG4hPT1OYU4gPyBuIDogc2NvcmU7XHJcblx0XHR9XHJcblx0fVxyXG5cclxufVxyXG5cclxuLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vXHJcblxyXG5leHBvcnQgZnVuY3Rpb24gYWRkU3RhdHVzVmFyRGVmICggb2JqLCBqc29uICkge1xyXG5cclxuXHRpZiAoICFvYmouc3RhdHVzVmFyRGVmICYmIGpzb24uZGF0YVNldHRpbmdzICYmIGpzb24uZGF0YVNldHRpbmdzLnZhcmlhYmxlUHJlZml4ICkge1xyXG5cdFx0Y29uc3Qgc3RhdFZhck5hbWUgPSBgVl8ke2pzb24uZGF0YVNldHRpbmdzLnZhcmlhYmxlUHJlZml4fV9TdGF0dXNgO1xyXG5cdFx0b2JqLnN0YXR1c1ZhckRlZiA9IGZ1bmN0aW9uICgpIHtcclxuXHRcdFx0cmV0dXJuIHtcclxuXHRcdFx0XHRbc3RhdFZhck5hbWVdOiArdGhpcy5nZXREZWZhdWx0Q2hhbmdlU3RhdGUoKSxcclxuXHRcdFx0fVxyXG5cdFx0fVxyXG5cdH1cclxuXHJcbn1cclxuXHJcblxyXG4vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vL1xyXG5cclxuLy8gY29udmVydCBcIjEgMzQsNTo2LTlcIiB0byBbMSwzNCw1LDYsNyw4LDldXHJcbi8qKlxyXG4gKiBQYXJzZXMgYSBzdHJpbmcgY29udGFpbmluZyByYW5nZSB2YWx1ZXMgYW5kIHJldHVybnMgYW4gYXJyYXkgb2YgbnVtYmVycy5cclxuICogQHBhcmFtIHtzdHJpbmd9IHMgLSBUaGUgc3RyaW5nIGNvbnRhaW5pbmcgdGhlIHJhbmdlIHZhbHVlcy5cclxuICogQHJldHVybnMge251bWJlcltdfSAtIEFuIGFycmF5IG9mIG51bWJlcnMgcGFyc2VkIGZyb20gdGhlIHJhbmdlIHZhbHVlcy5cclxuICovXHJcbmV4cG9ydCBjb25zdCByZWFkUmFuZ2VBcnJheSA9IChzKSA9PiB7XHJcblx0Y29uc3QgcmVzID0gW107XHJcblxyXG5cdGZvciAoIGNvbnN0IHJyIG9mIHMubWF0Y2hBbGwoIC8oWzAtOV0rKSAqKD86LSAqKFswLTldKykpPy9nICkgKSB7XHJcblx0XHRpZiAoIHJyWzJdICYmIHJyWzFdPHJyWzJdICkge1xyXG5cdFx0XHRjb25zdCBycjI9TnVtYmVyKHJyWzJdKTtcclxuXHRcdFx0Zm9yICggbGV0IGg9TnVtYmVyKHJyWzFdKTsgaDw9cnIyOyBoKysgKSB7XHJcblx0XHRcdFx0cmVzLnB1c2goaCk7XHJcblx0XHRcdH1cclxuXHRcdH0gZWxzZSB7XHJcblx0XHRcdHJlcy5wdXNoKCBOdW1iZXIocnJbMV0pIClcclxuXHRcdH1cclxuXHR9XHJcblxyXG5cdHJldHVybiByZXM7XHJcbn1cclxuXHJcbi8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vXHJcblxyXG4vKipcclxuICogQ29udmVydHMgYW4gb2JqZWN0IGNvbnRhaW5pbmcgcHJvcGVydGllcyBmb3IgZGVjaW1hbCBwbGFjZXMsIGRlY2ltYWwgcHJlY2lzaW9uLCBhbmQgdW5pdHMgaW50byBhIHJlZ3VsYXIgZXhwcmVzc2lvbiBmb3IgaW5wdXQgdmFsaWRhdGlvbi5cclxuICogQHBhcmFtIHtPYmplY3R9IG9iaiAtIFRoZSBvYmplY3QgY29udGFpbmluZyBwcm9wZXJ0aWVzIGZvciBkZWNpbWFsIHBsYWNlcywgZGVjaW1hbCBwcmVjaXNpb24sIGFuZCB1bml0cy5cclxuICovXHJcbmV4cG9ydCBjb25zdCBkcDJpbnB1dFJlZ0V4cCA9IChvYmopID0+IHtcclxuXHJcblx0LyoqXHJcblx0ICogR2VuZXJhdGVzIGEgcmVndWxhciBleHByZXNzaW9uIHBhdHRlcm4gZm9yIGEgZ2l2ZW4gdW5pdC5cclxuXHQgKiBAcGFyYW0ge3N0cmluZ30gdSAtIFRoZSB1bml0IHN0cmluZy5cclxuXHQgKiBAcmV0dXJucyB7c3RyaW5nfSBUaGUgcmVndWxhciBleHByZXNzaW9uIHBhdHRlcm4gZm9yIHRoZSB1bml0LlxyXG5cdCAqL1xyXG5cdGNvbnN0IHVuaXRSZWdFeHAgPSAodSkgPT4ge1xyXG5cdFx0bGV0IHIgPSAnJztcclxuXHRcdGZvciAoIGNvbnN0IGMgb2YgdS50cmltKCkgKSB7XHJcblx0XHRcdGNvbnN0IHUgPSBjLnRvVXBwZXJDYXNlKCk7XHJcblx0XHRcdGNvbnN0IGwgPSBjLnRvTG93ZXJDYXNlKCk7XHJcblx0XHRcdHIgKz0gdSAhPSBsID8gYFske2x9JHt1fV0/YCA6IGAke2N9P2A7XHJcblx0XHR9XHJcblx0XHRyZXR1cm4gcjtcclxuXHR9O1xyXG5cclxuXHRpZiAoIG9iai5wZHAgfHwgb2JqLmRwICkge1xyXG5cdFx0bGV0IHJlID0gYF5bMC05XSR7IG9iai5wZHAgPyBgezAsJHtvYmoucGRwfX1gIDogJyonIH1gO1xyXG5cdFx0aWYgKCBvYmouZHAgKSB7XHJcblx0XHRcdHJlICs9IGAoWywuXVswLTldezAsJHtvYmouZHB9fSk/YDtcclxuXHRcdH1cclxuXHRcdGlmICggb2JqLnVuaXRzICkge1xyXG5cdFx0XHRyZSArPSBgID8oJHtvYmoudW5pdHMuc3BsaXQoJ3wnKS5tYXAoIHUgPT4gdW5pdFJlZ0V4cCh1KSApLmpvaW4oJ3wnKX0pP2A7XHJcblx0XHR9XHJcblx0XHRvYmouaW5wdXRSZWdleHAgPSByZSArICckJztcclxuXHR9XHJcblx0ZGVsZXRlIG9iai5wZHA7XHJcblx0ZGVsZXRlIG9iai5kcDtcclxuXHRkZWxldGUgb2JqLnVuaXRzO1xyXG59XHJcbiIsImltcG9ydCB7IG9iamVjdF9lcXVhbHMgfSBmcm9tICcuL2NvbW1vbidcbmltcG9ydCB7IGZzbVNlbmQgfSBmcm9tICcuL2ZzbSdcblxuLy8gS29udmEgc2hvdWxkIGJlaSBpbXBvcnRlZCwgYnV0IGRvZW5zJ3Qgc2VlbSB0byBzdXBwb3J0IHRyZWUgc2hha2luZywgc28gbGVhdmUgaXQgb3V0XG4vLyBpbXBvcnQgS29udmEgZnJvbSAna29udmEvbGliL0NvcmUnXG5cbmV4cG9ydCBjbGFzcyBiYXNlSW5pdHMge1xuXG5cdGNvbnN0cnVjdG9yICggb3B0cyA9IHt9ICkge1xuXG5cdFx0Ly8gT3B0aW9ucyBhbmQgZGVmYXVsdHNcblx0XHRjb25zdCBkZWZhdWx0cyA9IHtcblx0XHRcdGNvbnRhaW5lcjogbnVsbCxcblx0XHRcdGFkZFNlbmRDaGFuZ2VTdGF0ZTogbnVsbCxcblx0XHR9XG5cdFx0T2JqZWN0LmFzc2lnbiggdGhpcywgZGVmYXVsdHMsIG9wdHMgKTtcblxuXHRcdC8vIGNyZWF0ZSBmc20gb2JqZWN0LCBpZiBub3QgcHJvdmlkZWRcblx0XHRpZiAoICF0aGlzLmZzbSApIHtcblx0XHRcdHRoaXMuZnNtID0gbmV3IGZzbVNlbmQoKTtcblx0XHRcdHRoaXMuZnNtLnN0YXJ0TGlzdGVuaW5nVG9WYXJpYWJsZURlY2xhcmF0aW9uUmVxdWVzdHMoIHRoaXMuZGVjbGFyZVZhcmlhYmxlcy5iaW5kKHRoaXMpICk7XG5cdFx0fVxuXG5cdFx0Ly8gaW5pdCBzdGFnZSAmIGxheWVyXG5cdFx0aWYgKCBvcHRzLmNvbnRhaW5lciApIHtcblx0XHRcdGlmICggIXRoaXMud2lkdGggKSB7XG5cdFx0XHRcdHRoaXMud2lkdGggPSB3aW5kb3cuaW5uZXJXaWR0aDtcblx0XHRcdH1cblx0XHRcdGlmICggIXRoaXMuaGVpZ2h0ICkge1xuXHRcdFx0XHR0aGlzLmhlaWdodCA9IHdpbmRvdy5pbm5lckhlaWdodDtcblx0XHRcdH1cblxuXHRcdFx0dGhpcy5zdGFnZSA9IG5ldyBLb252YS5TdGFnZSh7XG5cdFx0XHRcdGNvbnRhaW5lcjogdGhpcy5jb250YWluZXIsXG5cdFx0XHRcdHdpZHRoOiB0aGlzLndpZHRoLFxuXHRcdFx0XHRoZWlnaHQ6IHRoaXMuaGVpZ2h0LFxuXHRcdFx0fSk7XG5cblxuXHRcdFx0Y29uc3Qgc3RhZ2VWTiA9IFwiQldfSUJfRVhUUkVTX1NUQUdFU1wiO1xuXHRcdFx0aWYgKCAhKCBzdGFnZVZOIGluIHdpbmRvdyApICkge1xuXHRcdFx0XHR3aW5kb3dbc3RhZ2VWTl0gPSBbXTtcblx0XHRcdH1cblx0XHRcdHdpbmRvd1tzdGFnZVZOXS5wdXNoKCB0aGlzLnN0YWdlICk7XG5cblxuXHRcdFx0Ly8gdGhpcy5sYXllciA9IG5ldyBLb252YS5MYXllcigpO1xuXHRcdFx0Ly8gdGhpcy5zdGFnZS5hZGQoIHRoaXMubGF5ZXIgKTtcblx0XHR9XG5cblx0XHQvLyBkaXNhYmxlIG1vdXNlIHJpZ2h0IGNsaWNrXG5cdFx0ZG9jdW1lbnQuYWRkRXZlbnRMaXN0ZW5lciggJ2NvbnRleHRtZW51JywgKGV2KSA9PiBldi5wcmV2ZW50RGVmYXVsdCgpICk7XG5cblx0XHR0aGlzLkZTTVZhcnNTZW50ID0ge307XG5cdH1cblxuXHQvLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vL1xuXG5cdC8vIG1ldGhvZCB3cmFwcGVyIGZvciBwb3N0aW5nIHRvIEZTTVxuXG5cdHBvc3RMb2cgKCBldmVudCwgZGF0YT17fSApIHtcblx0XHRpZiAoICF0aGlzLnN0YWdlIHx8ICF0aGlzLnN0YWdlLmlzRGVtb0FuaSApIHtcblx0XHRcdHRoaXMuZnNtLnBvc3RMb2dFdmVudCggT2JqZWN0LmFzc2lnbigge30sIGRhdGEsIHsgZXZlbnQ6IGV2ZW50IH0gKSApO1xuXHRcdH1cblx0fVxuXG5cdHBvc3RWYXJpYWJsZSAoIG5hbWUsIHZhbCApIHtcblx0XHR0aGlzLkZTTVZhcnNTZW50W25hbWVdID0gdmFsO1xuXHRcdHRoaXMuZnNtLnNldEZTTVZhcmlhYmxlKCBuYW1lLCB2YWwgKTtcblx0fVxuXG5cdHRyaWdnZXJJbnB1dFZhbGlkYXRpb25FdmVudCAoKSB7XG5cdFx0aWYgKCB0aGlzLmZzbS50cmlnZ2VyRXZlbnQgKSB7XG4vLy8vLy8vLy8vLy8vLy8vLy8vL1xuXHRcdFx0aWYgKCB0aGlzLmRhdGFTZXR0aW5ncyAmJiB0aGlzLmRhdGFTZXR0aW5ncy52YXJpYWJsZVByZWZpeCApIHtcblx0XHRcdFx0dGhpcy5mc20udHJpZ2dlckV2ZW50KCAnZXZfSW5wdXRWYWxpZGF0aW9uXycgKyB0aGlzLmRhdGFTZXR0aW5ncy52YXJpYWJsZVByZWZpeCApO1xuXHRcdFx0fVxuLy8vLy8vLy8vXG4vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vL1xuLy8vLy8vLy8vL1xuXHRcdFx0dGhpcy5mc20udHJpZ2dlckV2ZW50KCAnZXZfSW5wdXRWYWxpZGF0aW9uX0V4dFJlcycgKTtcblx0XHR9XG5cdH1cblxuXHQvLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vL1xuXG5cdC8vIGdldCBzdGF0ZS12YXJzIG9mIG9ialxuXHRnZXRDaGFuZ2VTdGF0ZSAoIG9iaiApIHtcblxuXHRcdC8vIHN0YXR1c1ZhckRlZiBkZWZpbmVkIGluIG9iaj9cblx0XHRpZiAoIG9iai5zdGF0dXNWYXJEZWYgKSB7XG5cblx0XHRcdHJldHVybiBvYmouc3RhdHVzVmFyRGVmLmNhbGwob2JqKTtcblxuXHRcdH0gZWxzZSB7XG5cblx0XHRcdC8vIGNhbGwgZGVmYXVsdENoYW5nZVN0YXRlKClcblx0XHRcdHJldHVybiArb2JqLmdldERlZmF1bHRDaGFuZ2VTdGF0ZSgpO1xuXG5cdFx0fVxuXHR9XG5cblx0c2VuZENoYW5nZVN0YXRlICggb2JqLCBuZXdTdGF0ZT1udWxsICkge1xuXG5cdFx0Ly8gRG9udCBzZW5kIHN0YXRlcyBvciBzY29yZSBpbiBkZW1vQW5pXG5cdFx0aWYgKCBvYmouc3RhZ2UgJiYgb2JqLnN0YWdlLmlzRGVtb0FuaSApIHtcblx0XHRcdHJldHVybjtcblx0XHR9XG5cblx0XHQvLyBzdGF0ZSBWYXJpYWJsZSAoY2hhbmdlU3RhdGUpIGNoYW5nZWQ/XG5cdFx0Y29uc3QgY2hhbmdlU3RhdGUgPSAoIG5ld1N0YXRlPT09bnVsbCA/IHRoaXMuZ2V0Q2hhbmdlU3RhdGUob2JqKSA6IG5ld1N0YXRlICk7XG5cblx0XHQvLyBpcyBzdGF0ZSBjaGFuZ2VkPyAtPiBzZW5kIG1zZ3Ncblx0XHRpZiAoIHR5cGVvZiBvYmoub2xkQ2hhbmdlU3RhdGUgPT09ICd1bmRlZmluZWQnIHx8ICFvYmplY3RfZXF1YWxzKCBjaGFuZ2VTdGF0ZSwgb2JqLm9sZENoYW5nZVN0YXRlICkgKSB7XG5cblx0XHRcdGlmICggdHlwZW9mIGNoYW5nZVN0YXRlID09PSAnb2JqZWN0JyApIHtcblx0XHRcdFx0Ly8gY2hhbmdlU3RhdGUgPSB7IEZTTVN0YXRlVmFyMTogc3RhdGUxLCBGU01TdGF0ZVZhcjI6IHN0YXRlMiwgLi4uIH1cblx0XHRcdFx0Zm9yICggbGV0IGsgaW4gY2hhbmdlU3RhdGUgKSB7XG5cdFx0XHRcdFx0aWYgKCB0eXBlb2Ygb2JqLm9sZENoYW5nZVN0YXRlICE9PSAnb2JqZWN0JyB8fCBjaGFuZ2VTdGF0ZVtrXSAhPT0gb2JqLm9sZENoYW5nZVN0YXRlW2tdICkge1xuXHRcdFx0XHRcdFx0dGhpcy5wb3N0VmFyaWFibGUoIGssIGNoYW5nZVN0YXRlW2tdICk7XG5cdFx0XHRcdFx0fVxuXHRcdFx0XHR9XG5cblx0XHRcdH0gZWxzZSBpZiAoIG9iai5GU01WYXJpYWJsZU5hbWUgKSB7XG5cdFx0XHRcdC8vIFNpbXBsZSAxLXZhbHVlIHN0YXRlXG5cdFx0XHRcdHRoaXMucG9zdFZhcmlhYmxlKCBgVl9TdGF0dXNfJHtvYmouRlNNVmFyaWFibGVOYW1lfWAsICtjaGFuZ2VTdGF0ZSApO1xuXHRcdFx0fVxuXG5cdFx0XHRvYmoub2xkQ2hhbmdlU3RhdGUgPSBjaGFuZ2VTdGF0ZTtcblx0XHR9XG5cblx0XHQvLyBzY29yZSBjaGFuZ2VkP1xuXHRcdGlmICggb2JqLnNjb3JlRGVmICkge1xuXG5cdFx0XHRjb25zdCBzY29yZSA9IG9iai5zY29yZURlZi5jYWxsKG9iaik7XG5cblx0XHRcdGlmICggdHlwZW9mIG9iai5vbGRTY29yZSA9PT0gJ3VuZGVmaW5lZCcgfHwgIW9iamVjdF9lcXVhbHMoIHNjb3JlLCBvYmoub2xkU2NvcmUgKSApIHtcblx0XHRcdFx0aWYgKCB0eXBlb2Ygc2NvcmUgPT09ICdvYmplY3QnICkge1xuXHRcdFx0XHRcdC8vIHNjb3JlID0geyBGU01TdGF0ZVZhcjE6IHN0YXRlMSwgRlNNU3RhdGVWYXIyOiBzdGF0ZTIsIC4uLiB9XG5cdFx0XHRcdFx0Zm9yICggbGV0IGsgaW4gc2NvcmUgKSB7XG5cdFx0XHRcdFx0XHRpZiAoIHR5cGVvZiBvYmoub2xkU2NvcmUgIT09ICdvYmplY3QnIHx8IHNjb3JlW2tdICE9PSBvYmoub2xkU2NvcmVba10gKSB7XG5cdFx0XHRcdFx0XHRcdHRoaXMucG9zdFZhcmlhYmxlKCBrLCBzY29yZVtrXSApO1xuXHRcdFx0XHRcdFx0fVxuXHRcdFx0XHRcdH1cblxuXHRcdFx0XHR9IGVsc2UgaWYgKCBvYmouRlNNVmFyaWFibGVOYW1lIHx8IG9iai5zY29yZVZhcmlhYmxlTmFtZSApIHtcblx0XHRcdFx0XHQvLyBTaW1wbGUgMS12YWx1ZSBzY29yZVxuXHRcdFx0XHRcdGlmICggdHlwZW9mIHNjb3JlICE9PSAndW5kZWZpbmVkJyApIHtcblx0XHRcdFx0XHRcdHRoaXMucG9zdFZhcmlhYmxlKCBvYmouc2NvcmVWYXJpYWJsZU5hbWUgfHwgYFZfU2NvcmVfJHtvYmouRlNNVmFyaWFibGVOYW1lfWAsIHNjb3JlICk7XG5cdFx0XHRcdFx0fVxuXHRcdFx0XHR9XG5cdFx0XHR9XG5cblx0XHRcdG9iai5vbGRTY29yZSA9IHNjb3JlO1xuXHRcdH1cblxuXHRcdGlmICggdHlwZW9mIHRoaXMuYWRkU2VuZENoYW5nZVN0YXRlID09PSAnZnVuY3Rpb24nICkge1xuXHRcdFx0KHRoaXMuYWRkU2VuZENoYW5nZVN0YXRlKSgpO1xuXHRcdH1cblx0fVxuXG5cdC8vIHNlbmQgaW5mb3JtYXRpb24gYWJvdXQgdmFyaWFibGVzIHNlbnRcblx0ZGVjbGFyZVZhcmlhYmxlcyAoKSB7XG5cblx0XHRjb25zdCB2YXJEZWZzID0gW107XG5cdFx0Y29uc3QgdHlwZXRyYW5zID0ge1xuXHRcdFx0J3N0cmluZyc6ICdTdHJpbmcnLFxuXHRcdFx0J251bWJlcic6ICdJbnRlZ2VyJyxcblx0XHR9XG5cblx0XHRmb3IgKCBjb25zdCB2bmFtZSBpbiB0aGlzLkZTTVZhcnNTZW50ICkge1xuXG5cdFx0XHRjb25zdCB2YWwgPSB0aGlzLkZTTVZhcnNTZW50W3ZuYW1lXTtcblx0XHRcdGNvbnN0IHZkZWYgPSB7XG5cdFx0XHRcdG5hbWU6IHZuYW1lLFxuXHRcdFx0XHR0eXBlOiB2YWw9PT1udWxsID8gJ0ludGVnZXInIDogdHlwZXRyYW5zWyB0eXBlb2YgdmFsIF0sXG5cdFx0XHRcdGRlZmF1bHRWYWx1ZTogdmFsLFxuXHRcdFx0XHRuYW1lZFZhbHVlczogW10sXG5cdFx0XHR9XG5cdFx0XHR2YXJEZWZzLnB1c2goIHZkZWYgKTtcblx0XHR9XG5cblx0XHRyZXR1cm4gdmFyRGVmcztcblx0fVxufVxuIiwiaW1wb3J0IHsgbWVyZ2VEZWVwLCBnZXRQb3NPZkV2ZW50LCBzZXRTdGF0ZVBvc3RQcm9jLCBpZ25vcmVFdmVudCB9IGZyb20gJy4vY29tbW9uJ1xyXG5cclxuaW1wb3J0IEtvbnZhIGZyb20gJ2tvbnZhL2xpYi9Db3JlJ1xyXG5pbXBvcnQgeyBMaW5lIH0gZnJvbSAna29udmEvbGliL3NoYXBlcy9MaW5lJ1xyXG5cclxuaW1wb3J0IHsgdGV4dEZyYW1lIH0gZnJvbSAnLi90ZXh0RnJhbWUnXHJcbmltcG9ydCB7IGljb25CYXIgfSBmcm9tICcuL2ljb25CYXInXHJcblxyXG4vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy9cclxuXHJcbi8qKlxyXG4gKiBEZWVwIG1lcmdlIG9mIHNvdXJjZSB0byB0YXJnZXQsIGJ1dCBvbmx5IGtleXMgcHJlc2VudCBpbiB0YXJnZXRcclxuICogT3ZlcndyaXRlcyByZXN1bHQgaW4gdGhpc1xyXG4gKi9cclxuZnVuY3Rpb24gbWVyZ2VBZGRpdGlvbmFsRGVmYXVsdHNUb1RoaXMoIHRhcmdldCwgc291cmNlICkge1xyXG5cclxuXHRmb3IgKCBjb25zdCBrZXkgaW4gdGFyZ2V0ICkge1xyXG5cdFx0dGhpc1trZXldID0gKCBrZXkgaW4gc291cmNlID8gbWVyZ2VEZWVwKCB0YXJnZXRbIGtleSBdLCBzb3VyY2Vba2V5XSApIDogdGFyZ2V0W2tleV0gKTtcclxuXHR9XHJcblxyXG5cdHJldHVybiB0YXJnZXQ7XHJcbn1cclxuXHJcbi8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vL1xyXG5cclxuZXhwb3J0IGNvbnN0IGFkZEluc2VydEJ1dHRvbnNUbyA9ICggYmFzZUNsYXNzLCBleHRyYURlZmF1bHRzPW51bGwsIGlucHV0Q2FsbGJhY2s9bnVsbCApID0+IGNsYXNzIGV4dGVuZHMgYmFzZUNsYXNzIHtcclxuXHJcblx0Y29uc3RydWN0b3IgKCBiYXNlLCBvcHRzID0ge30gKSB7XHJcblxyXG5cdFx0c3VwZXIoIGJhc2UsIG9wdHMgKTtcclxuXHRcdGlmICggIW9wdHMuaW5zZXJ0SWNvbkRlZnMgfHwgIW9wdHMuaW5zZXJ0SWNvbkRlZnMubGVuZ3RoICkge1xyXG5cdFx0XHRyZXR1cm47XHJcblx0XHR9XHJcblxyXG5cdFx0Ly8gTWVyZ2UgYWRkRGVmYXVsdHMgJiBvcHRzIGludG8gdGhpc1xyXG5cdFx0Y29uc3QgYWRkaXRpb25hbERlZmF1bHRPcHRzID0ge1xyXG5cclxuXHRcdFx0aW5zZXJ0SWNvbkRlZnM6IFtcclxuXHRcdFx0XHQvLyB7IHg6LCB5OiwgKHdpZHRoOiwpIHRleHRzOiBbICcrJywgJy0nLCAuLi5dIH1cclxuXHRcdFx0XSxcclxuXHJcblx0XHRcdGluc2VydEljb25CYXJEZWY6IHtcclxuXHRcdFx0XHRmcmFtZVBhZGRpbmc6IDAsXHJcblx0XHRcdFx0ZnJhbWVGaWxsOiAnd2hpdGUnLFxyXG5cdFx0XHRcdGZvbnRTaXplOiAxOCxcclxuXHRcdFx0XHRzcGFjaW5nOiAwLFxyXG5cdFx0XHRcdHN0aWNreTogZmFsc2UsXHJcblx0XHRcdH0sXHJcblxyXG5cdFx0fVxyXG5cdFx0aWYgKCBleHRyYURlZmF1bHRzIT09bnVsbCApIHtcclxuXHRcdFx0aWYgKCB0eXBlb2YgZXh0cmFEZWZhdWx0cyA9PT0gJ2Z1bmN0aW9uJyApIHtcclxuXHRcdFx0XHRleHRyYURlZmF1bHRzLmNhbGwoIHRoaXMsIGFkZGl0aW9uYWxEZWZhdWx0T3B0cyApO1xyXG5cdFx0XHR9IGVsc2Uge1xyXG5cdFx0XHRcdG1lcmdlRGVlcCggYWRkaXRpb25hbERlZmF1bHRPcHRzLCBleHRyYURlZmF1bHRzICk7XHJcblx0XHRcdH1cclxuXHRcdH1cclxuXHRcdG1lcmdlQWRkaXRpb25hbERlZmF1bHRzVG9UaGlzLmNhbGwoIHRoaXMsIGFkZGl0aW9uYWxEZWZhdWx0T3B0cywgb3B0cyApO1xyXG5cclxuXHRcdC8vIGluc2VydGlvbiBpY29uQmFyXHJcblx0XHR0aGlzLmluc2VydEljb25CYXJzID0gW107XHJcblxyXG5cdFx0dGhpcy5pbnNlcnRJY29uRGVmcy5mb3JFYWNoKCB0ID0+IHtcclxuXHRcdFx0Y29uc3Qgb3B0cyA9IE9iamVjdC5hc3NpZ24oIHt9LCB0aGlzLmluc2VydEljb25CYXJEZWYsIHQgKTtcclxuXHRcdFx0b3B0cy5pY29ucyA9IHQudGV4dHMubWFwKCB0ID0+XHJcblx0XHRcdFx0KCB0eXBlb2YgdCA9PT0gJ29iamVjdCcgPyB0IDoge1xyXG5cdFx0XHRcdFx0dGV4dDoge1xyXG5cdFx0XHRcdFx0XHR0ZXh0OiB0LFxyXG5cdFx0XHRcdFx0XHRmb250U2l6ZTogdGhpcy5pbnNlcnRJY29uQmFyRGVmLmZvbnRTaXplLFxyXG5cdFx0XHRcdFx0fSxcclxuXHRcdFx0XHRcdG9uOiAoKSA9PiB7XHJcblx0XHRcdFx0XHRcdHRoaXMuYmFzZS5wb3N0TG9nKCAnaW5zZXJ0QnV0dG9uUHJlc3NlZCcsIHsgdGV4dDogdCB9ICk7XHJcblx0XHRcdFx0XHRcdHRoaXMuaW5zZXJ0QnV0dG9uKHQpO1xyXG5cdFx0XHRcdFx0fSxcclxuXHRcdFx0XHR9KSApO1xyXG5cdFx0XHR0aGlzLmluc2VydEljb25CYXJzLnB1c2goIG5ldyBpY29uQmFyKCB0aGlzLnN0YWdlLCBvcHRzICkgKTtcclxuXHRcdH0pXHJcblxyXG5cdH1cclxuXHJcblx0Ly8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy9cclxuXHJcblx0Ly8gaW5zZXJ0IGJ1dHRvbiBwcmVzc2VkXHJcblx0aW5zZXJ0QnV0dG9uICh0KSB7XHJcblx0XHRpZiAoIGRvY3VtZW50LmFjdGl2ZUVsZW1lbnQudGFnTmFtZSA9PT0gJ0lOUFVUJyApIHtcclxuXHJcblx0XHRcdGNvbnN0IGlucCA9IGRvY3VtZW50LmFjdGl2ZUVsZW1lbnQ7XHJcblx0XHRcdGlmICggaW5wLnNlbGVjdGlvblN0YXJ0IHx8IGlucC5zZWxlY3Rpb25TdGFydCA9PSAnMCcgKSB7XHJcblx0XHRcdFx0Y29uc3Qgc3RhcnRQb3MgPSBpbnAuc2VsZWN0aW9uU3RhcnQ7XHJcblx0XHRcdFx0Y29uc3QgZW5kUG9zID0gaW5wLnNlbGVjdGlvbkVuZDtcclxuXHRcdFx0XHRpbnAudmFsdWUgPSBpbnAudmFsdWUuc3Vic3RyaW5nKCAwLCBzdGFydFBvcyApXHJcblx0XHRcdFx0XHQrIHRcclxuXHRcdFx0XHRcdCsgaW5wLnZhbHVlLnN1YnN0cmluZyggZW5kUG9zLCBpbnAudmFsdWUubGVuZ3RoICk7XHJcblx0XHRcdH0gZWxzZSB7XHJcblx0XHRcdFx0aW5wLnZhbHVlICs9IHQ7XHJcblx0XHRcdH1cclxuXHJcblx0XHRcdGlmICggaW5wdXRDYWxsYmFjayE9PW51bGwgKSB7XHJcblx0XHRcdFx0aW5wdXRDYWxsYmFjay5jYWxsKHRoaXMpO1xyXG5cdFx0XHR9XHJcblx0XHR9XHJcblx0fVxyXG5cclxufVxyXG5cclxuLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vXHJcblxyXG5pbXBvcnQgcGVuaWNvbiBmcm9tICcuL2ltZy9wZW5pY29uLnBuZydcclxuaW1wb3J0IGVyYXNlcmljb24gZnJvbSAnLi9pbWcvZXJhc2VyaWNvbi5wbmcnXHJcbmltcG9ydCBjbGVhcmljb24gZnJvbSAnLi9pbWcvY2xlYXJpY29uLnBuZydcclxuaW1wb3J0IG1hcmtlcmljb24gZnJvbSAnLi9pbWcvbWFya2VyaWNvbi5wbmcnXHJcblxyXG5leHBvcnQgY29uc3QgYWRkRnJlZVBhaW50VG8gPSAoIGJhc2VDbGFzcywgbGluZXNDaGFuZ2VTdGF0ZT0xLCBoYXNNYXJrZXI9MCwgZXh0cmFEZWZhdWx0cz1udWxsICkgPT4gY2xhc3MgZXh0ZW5kcyBiYXNlQ2xhc3Mge1xyXG5cclxuXHRjb25zdHJ1Y3RvciAoIGJhc2UsIG9wdHMgPSB7fSApIHtcclxuXHJcblx0XHRzdXBlciggYmFzZSwgb3B0cyApO1xyXG5cdFx0aWYgKCBvcHRzLnBhaW50TGluZXM9PT1udWxsIHx8IG9wdHMubW9kZUljb25CYXJEZWY9PT1udWxsICkge1xyXG5cdFx0XHRyZXR1cm47XHJcblx0XHR9XHJcblx0XHRjb25zdCBzdGFnZSA9IHRoaXMuc3RhZ2U7XHJcblxyXG5cdFx0Y29uc3QgYWRkaXRpb25hbERlZmF1bHRPcHRzID0ge1xyXG5cclxuXHRcdFx0cGFpbnRMaW5lczoge1xyXG5cdFx0XHRcdGJydXNoOiB7XHJcblx0XHRcdFx0XHRzdHJva2U6ICdibHVlJyxcclxuXHRcdFx0XHRcdHN0cm9rZVdpZHRoOiAyLFxyXG5cdFx0XHRcdFx0Z2xvYmFsQ29tcG9zaXRlT3BlcmF0aW9uOiAnc291cmNlLW92ZXInLFxyXG5cdFx0XHRcdFx0bGluZUNhcDogJ3JvdW5kJyxcclxuXHRcdFx0XHRcdGxpbmVKb2luOiAncm91bmQnLFxyXG5cdFx0XHRcdH0sXHJcblx0XHRcdFx0bWFya2VyOiB7XHJcblx0XHRcdFx0XHRzdHJva2U6ICcjNjY2NmZmJyxcclxuXHRcdFx0XHRcdHN0cm9rZVdpZHRoOiAyNSxcclxuXHRcdFx0XHRcdGdsb2JhbENvbXBvc2l0ZU9wZXJhdGlvbjogJ3NvdXJjZS1vdmVyJyxcclxuXHRcdFx0XHRcdGxpbmVDYXA6ICdyb3VuZCcsXHJcblx0XHRcdFx0XHRsaW5lSm9pbjogJ3JvdW5kJyxcclxuXHRcdFx0XHR9LFxyXG5cdFx0XHRcdGVyYXNlOiB7XHJcblx0XHRcdFx0XHRzdHJva2U6ICdibHVlJyxcclxuXHRcdFx0XHRcdHN0cm9rZVdpZHRoOiAxNSxcclxuXHRcdFx0XHRcdGdsb2JhbENvbXBvc2l0ZU9wZXJhdGlvbjogJ2Rlc3RpbmF0aW9uLW91dCcsXHJcblx0XHRcdFx0XHRsaW5lQ2FwOiAncm91bmQnLFxyXG5cdFx0XHRcdFx0bGluZUpvaW46ICdyb3VuZCcsXHJcblx0XHRcdFx0fSxcclxuXHRcdFx0fSxcclxuXHJcblx0XHRcdG1vZGVJY29uQmFyRGVmOiB7XHJcblx0XHRcdFx0ZnJhbWVQYWRkaW5nOiAwLFxyXG5cdFx0XHRcdHNwYWNpbmc6IDAsXHJcblx0XHRcdFx0ZGVmYXVsdDogMCxcclxuXHRcdFx0XHRmcmFtZUZpbGw6ICd3aGl0ZScsXHJcblx0XHRcdFx0aWNvbnM6IFtcclxuXHRcdFx0XHRcdHtcclxuXHRcdFx0XHRcdFx0c3JjOiBwZW5pY29uLFxyXG5cdFx0XHRcdFx0XHRjdXJzb3I6IGB1cmwoJHtwZW5pY29ufSksIGF1dG9gLFxyXG5cdFx0XHRcdFx0XHRvbjogKCkgPT4gdGhpcy5zZXRQYWludE1vZGUoJ2JydXNoJyksXHQvLyBvdmVyd3JpdHRlbiBieSBhZGRGcmVlUGFpbnRcclxuXHRcdFx0XHRcdFx0b2ZmOiAoKSA9PiB0aGlzLnNldFBhaW50TW9kZSgnbm9uZScpLFx0Ly8gb3ZlcndyaXR0ZW4gYnkgYWRkRnJlZVBhaW50XHJcblx0XHRcdFx0XHR9LHtcclxuXHRcdFx0XHRcdFx0c3JjOiBlcmFzZXJpY29uLFxyXG5cdFx0XHRcdFx0XHRjdXJzb3I6IGB1cmwoJHtlcmFzZXJpY29ufSksIGF1dG9gLFxyXG5cdFx0XHRcdFx0XHRvbjogKCkgPT4gdGhpcy5zZXRQYWludE1vZGUoJ2VyYXNlJyksXHQvLyBvdmVyd3JpdHRlbiBieSBhZGRGcmVlUGFpbnRcclxuXHRcdFx0XHRcdFx0b2ZmOiAoKSA9PiB0aGlzLnNldFBhaW50TW9kZSgnbm9uZScpLFx0Ly8gb3ZlcndyaXR0ZW4gYnkgYWRkRnJlZVBhaW50XHJcblx0XHRcdFx0XHR9LHtcclxuXHRcdFx0XHRcdFx0c3JjOiBjbGVhcmljb24sXHJcblx0XHRcdFx0XHRcdG9uOiAoKSA9PiB0aGlzLmZyZWVQYWludENsZWFyQWxsKCksXHJcblx0XHRcdFx0XHR9XSxcclxuXHRcdFx0fSxcclxuXHRcdH07XHJcblx0XHRpZiAoIGhhc01hcmtlciAmJiAoIG9wdHMuaGFzTWFya2VyPT09dW5kZWZpbmVkIHx8IG9wdHMuaGFzTWFya2VyICkgKSB7XHJcblx0XHRcdGFkZGl0aW9uYWxEZWZhdWx0T3B0cy5tb2RlSWNvbkJhckRlZi5pY29ucy5zcGxpY2UoIDEsIDAsIHtcclxuXHRcdFx0XHRzcmM6IG1hcmtlcmljb24sXHJcblx0XHRcdFx0Y3Vyc29yOiBgdXJsKCR7bWFya2VyaWNvbn0pLCBhdXRvYCxcclxuXHRcdFx0XHRvbjogKCkgPT4gdGhpcy5zZXRQYWludE1vZGUoJ21hcmtlcicpLFx0Ly8gb3ZlcndyaXR0ZW4gYnkgYWRkRnJlZVBhaW50XHJcblx0XHRcdFx0b2ZmOiAoKSA9PiB0aGlzLnNldFBhaW50TW9kZSgnbm9uZScpLFx0Ly8gb3ZlcndyaXR0ZW4gYnkgYWRkRnJlZVBhaW50XHJcblx0XHRcdH0pXHJcblx0XHR9XHJcblx0XHRpZiAoIGV4dHJhRGVmYXVsdHMhPT1udWxsICkge1xyXG5cdFx0XHRpZiAoIHR5cGVvZiBleHRyYURlZmF1bHRzID09PSAnZnVuY3Rpb24nICkge1xyXG5cdFx0XHRcdGV4dHJhRGVmYXVsdHMuY2FsbCggdGhpcywgYWRkaXRpb25hbERlZmF1bHRPcHRzICk7XHJcblx0XHRcdH0gZWxzZSB7XHJcblx0XHRcdFx0bWVyZ2VEZWVwKCBhZGRpdGlvbmFsRGVmYXVsdE9wdHMsIGV4dHJhRGVmYXVsdHMgKTtcclxuXHRcdFx0fVxyXG5cdFx0fVxyXG5cdFx0bWVyZ2VBZGRpdGlvbmFsRGVmYXVsdHNUb1RoaXMuY2FsbCggdGhpcywgYWRkaXRpb25hbERlZmF1bHRPcHRzLCBvcHRzICk7XHJcblxyXG5cdFx0dGhpcy5mcmVlUGFpbnRJbml0KCk7XHJcblxyXG5cdFx0dGhpcy5pbml0RGF0YSA9IHRoaXMuZ2V0Q2hTdGF0ZSgpO1xyXG5cdFx0dGhpcy5iYXNlLnNlbmRDaGFuZ2VTdGF0ZSggdGhpcyApO1x0Ly8gaW5pdCAmIHNlbmQgY2hhbmdlU3RhdGUgJiBzY29yZVxyXG5cclxuXHRcdC8vIGludGVyYWN0aXZpdHlcclxuXHRcdGlmICggIXRoaXMucmVhZG9ubHkgKSB7XHJcblxyXG5cdFx0XHQvLyBTdGFydCBwYWludGluZ1xyXG5cdFx0XHRzdGFnZS5vbignbW91c2Vkb3duIHRvdWNoc3RhcnQnLCBldiA9PiB7XHJcblxyXG5cdFx0XHRcdGlmICggWydicnVzaCcsJ21hcmtlcicsJ2VyYXNlJ10uaW5jbHVkZXMoIHRoaXMubW9kZSApICkge1xyXG5cdFx0XHRcdFx0dGhpcy5pc1BhaW50aW5nID0gMTtcclxuXHRcdFx0XHRcdGNvbnN0IHBvcyA9IGdldFBvc09mRXZlbnQoIHRoaXMuc3RhZ2UsIGV2ICk7XHJcblx0XHRcdFx0XHR0aGlzLnBhaW50UG9pbnRzID0gWyBwb3MueCwgcG9zLnkgXTtcclxuXHRcdFx0XHRcdGlmICggdGhpcy5tb2RlICE9ICdtYXJrZXInICkge1xyXG5cdFx0XHRcdFx0XHR0aGlzLmtGcmVlUGFpbnRMaW5lID0gbmV3IEtvbnZhLkxpbmUoIE9iamVjdC5hc3NpZ24oIHt9LCB0aGlzLnBhaW50TGluZXNbIHRoaXMubW9kZSBdLCB7XHJcblx0XHRcdFx0XHRcdFx0cG9pbnRzOiB0aGlzLnBhaW50UG9pbnRzLFxyXG5cdFx0XHRcdFx0XHR9KSk7XHJcblx0XHRcdFx0XHRcdHRoaXMua0ZyZWVQYWludEJydXNoR3JvdXAuYWRkKCB0aGlzLmtGcmVlUGFpbnRMaW5lICk7XHJcblx0XHRcdFx0XHR9IGVsc2Uge1xyXG5cdFx0XHRcdFx0XHR0aGlzLmtGcmVlUGFpbnRMaW5lID0gbnVsbDtcclxuXHRcdFx0XHRcdH1cclxuXHRcdFx0XHRcdGlmICggaGFzTWFya2VyICYmICggdGhpcy5oYXNNYXJrZXI9PT11bmRlZmluZWQgfHwgdGhpcy5oYXNNYXJrZXIgKSApIHtcclxuXHRcdFx0XHRcdFx0aWYgKCB0aGlzLm1vZGUgIT0gJ2JydXNoJyApIHtcclxuXHRcdFx0XHRcdFx0XHR0aGlzLmtGcmVlUGFpbnRNYXJrZXJMaW5lID0gbmV3IEtvbnZhLkxpbmUoIE9iamVjdC5hc3NpZ24oIHt9LCB0aGlzLnBhaW50TGluZXNbIHRoaXMubW9kZSBdLCB7XHJcblx0XHRcdFx0XHRcdFx0XHRwb2ludHM6IHRoaXMucGFpbnRQb2ludHMsXHJcblx0XHRcdFx0XHRcdFx0fSkpO1xyXG5cdFx0XHRcdFx0XHRcdHRoaXMua0ZyZWVQYWludE1hcmtlckdyb3VwLmFkZCggdGhpcy5rRnJlZVBhaW50TWFya2VyTGluZSApO1xyXG5cdFx0XHRcdFx0XHR9IGVsc2Uge1xyXG5cdFx0XHRcdFx0XHRcdHRoaXMua0ZyZWVQYWludE1hcmtlckxpbmUgPSBudWxsO1xyXG5cdFx0XHRcdFx0XHR9XHJcblx0XHRcdFx0XHR9XHJcblxyXG5cdFx0XHRcdFx0ZXYuY2FuY2VsQnViYmxlID0gdHJ1ZTtcclxuXHRcdFx0XHR9XHJcblx0XHRcdH0gKTtcclxuXHJcblx0XHRcdC8vIEVuZCBwYWludGluZ1xyXG5cdFx0XHRzdGFnZS5vbignbW91c2V1cCBtb3VzZWxlYXZlIHRvdWNoZW5kJywgKGV2KSA9PiB7XHJcblxyXG5cdFx0XHRcdGlmICggaWdub3JlRXZlbnQoIHRoaXMuc3RhZ2UsIGV2ICkgKSB7XHJcblx0XHRcdFx0XHRyZXR1cm47XHJcblx0XHRcdFx0fVxyXG5cdFx0XHRcdGlmICggdGhpcy5pc1BhaW50aW5nICkge1xyXG5cdFx0XHRcdFx0dGhpcy5pc1BhaW50aW5nID0gMDtcclxuXHRcdFx0XHRcdGlmICggdGhpcy5wYWludFBvaW50cy5sZW5ndGg+MiApIHtcclxuXHRcdFx0XHRcdFx0dGhpcy5saW5lc0NvcHkucHVzaCgge1xyXG5cdFx0XHRcdFx0XHRcdHQ6IHRoaXMubW9kZS5zdWJzdHIoIDAsIDEgKSxcclxuXHRcdFx0XHRcdFx0XHRwOiB0aGlzLnBhaW50UG9pbnRzLFxyXG5cdFx0XHRcdFx0XHR9KVxyXG5cdFx0XHRcdFx0XHRjb25zdCBsb2dOYW1lcyA9IHtcclxuXHRcdFx0XHRcdFx0XHRicnVzaDogJ3BhaW50TGluZScsXHJcblx0XHRcdFx0XHRcdFx0bWFya2VyOiAncGFpbnRNYXJrZXInLFxyXG5cdFx0XHRcdFx0XHRcdGVyYXNlOiAncGFpbnRFcmFzZScsXHJcblx0XHRcdFx0XHRcdH1cclxuXHRcdFx0XHRcdFx0dGhpcy5iYXNlLnBvc3RMb2coIGxvZ05hbWVzWyB0aGlzLm1vZGUgXSwgeyBwb2ludHM6IHRoaXMucGFpbnRQb2ludHMgfSApO1xyXG5cdFx0XHRcdFx0XHR0aGlzLmJhc2Uuc2VuZENoYW5nZVN0YXRlKCB0aGlzICk7XHQvLyBpbml0ICYgc2VuZCBjaGFuZ2VTdGF0ZSAmIHNjb3JlXHJcblx0XHRcdFx0XHR9XHJcblx0XHRcdFx0fVxyXG5cdFx0XHR9KTtcclxuXHJcblx0XHRcdC8vIGFuZCBjb3JlIGZ1bmN0aW9uIC0gZHJhd2luZ1xyXG5cdFx0XHRzdGFnZS5vbignbW91c2Vtb3ZlIHRvdWNobW92ZScsIGV2ID0+IHtcclxuXHRcdFx0XHRpZiAoIHRoaXMuaXNQYWludGluZyApIHtcclxuXHRcdFx0XHRcdGNvbnN0IHBvcyA9IGdldFBvc09mRXZlbnQoIHRoaXMuc3RhZ2UsIGV2ICk7XHJcblx0XHRcdFx0XHR0aGlzLnBhaW50UG9pbnRzLnB1c2goIHBvcy54ICk7XHJcblx0XHRcdFx0XHR0aGlzLnBhaW50UG9pbnRzLnB1c2goIHBvcy55ICk7XHJcblx0XHRcdFx0XHRpZiAoIHRoaXMua0ZyZWVQYWludE1hcmtlckxpbmUgKSB7XHJcblx0XHRcdFx0XHRcdHRoaXMua0ZyZWVQYWludE1hcmtlckxpbmUucG9pbnRzKCB0aGlzLnBhaW50UG9pbnRzICk7XHJcblx0XHRcdFx0XHRcdHRoaXMuZnJlZVBhaW50TWFya2VyTGF5ZXIuYmF0Y2hEcmF3KCk7XHJcblx0XHRcdFx0XHR9XHJcblx0XHRcdFx0XHRpZiAoIHRoaXMua0ZyZWVQYWludExpbmUgKSB7XHJcblx0XHRcdFx0XHRcdHRoaXMua0ZyZWVQYWludExpbmUucG9pbnRzKCB0aGlzLnBhaW50UG9pbnRzICk7XHJcblx0XHRcdFx0XHRcdHRoaXMuZnJlZVBhaW50TGF5ZXIuYmF0Y2hEcmF3KCk7XHJcblx0XHRcdFx0XHR9XHJcblx0XHRcdFx0fVxyXG5cdFx0XHR9ICk7XHJcblxyXG5cdFx0XHRzdGFnZS5vbiggJ21vdXNlbGVhdmUnLCAoZXYpID0+IHtcclxuXHRcdFx0XHRpZiAoIGlnbm9yZUV2ZW50KCB0aGlzLnN0YWdlLCBldiApICkge1xyXG5cdFx0XHRcdFx0cmV0dXJuO1xyXG5cdFx0XHRcdH1cclxuXHRcdFx0XHR0aGlzLmN1cnNvclNhdmVkID0gZG9jdW1lbnQuYm9keS5zdHlsZS5jdXJzb3I7XHJcblx0XHRcdFx0ZG9jdW1lbnQuYm9keS5zdHlsZS5jdXJzb3IgPSBcImRlZmF1bHRcIjtcclxuXHRcdFx0fSk7XHJcblxyXG5cdFx0XHRzdGFnZS5vbiggJ21vdXNlZW50ZXInLCAoKSA9PiB7XHJcblx0XHRcdFx0aWYgKCB0aGlzLmN1cnNvclNhdmVkICkge1xyXG5cdFx0XHRcdFx0ZG9jdW1lbnQuYm9keS5zdHlsZS5jdXJzb3IgPSB0aGlzLmN1cnNvclNhdmVkO1xyXG5cdFx0XHRcdFx0dGhpcy5jdXJzb3JTYXZlZCA9IG51bGw7XHJcblx0XHRcdFx0fVxyXG5cdFx0XHR9KVxyXG5cdFx0fVxyXG5cdH1cclxuXHJcblx0Ly8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy9cclxuXHJcblx0ZnJlZVBhaW50SW5pdCAoKSB7XHJcblxyXG5cdFx0Ly8gaW5pdCBQYWludExpbmVzXHJcblx0XHRpZiAoIGhhc01hcmtlciAmJiAoIHRoaXMuaGFzTWFya2VyPT09dW5kZWZpbmVkIHx8IHRoaXMuaGFzTWFya2VyICkgKSB7XHJcblx0XHRcdGlmICggIXRoaXMuZnJlZVBhaW50TWFya2VyTGF5ZXIgKSB7XHJcblx0XHRcdFx0dGhpcy5mcmVlUGFpbnRNYXJrZXJMYXllciA9IG5ldyBLb252YS5MYXllcigpO1xyXG5cdFx0XHRcdHRoaXMuc3RhZ2UuYWRkKCB0aGlzLmZyZWVQYWludE1hcmtlckxheWVyICk7XHJcblx0XHRcdFx0dGhpcy5mcmVlUGFpbnRNYXJrZXJMYXllci5tb3ZlVG9Cb3R0b20oKTtcclxuXHRcdFx0fVxyXG5cclxuXHRcdFx0Y29uc3QgYmNsaXAgPSAoIHRoaXMuZnJlZVBhaW50TWFya2VyQ2xpcEZ1bmMgPyB7IGNsaXBGdW5jOiB0aGlzLmZyZWVQYWludE1hcmtlckNsaXBGdW5jLmJpbmQodGhpcykgfSA6IHt9ICk7XHJcblx0XHRcdHRoaXMua0ZyZWVQYWludE1hcmtlckdyb3VwID0gbmV3IEtvbnZhLkdyb3VwKCBiY2xpcCApO1xyXG5cdFx0XHR0aGlzLmZyZWVQYWludE1hcmtlckxheWVyLmFkZCggdGhpcy5rRnJlZVBhaW50TWFya2VyR3JvdXAgKTtcclxuXHJcblx0XHRcdHRoaXMua0ZyZWVQYWludE1hcmtlckxpbmUgPSBudWxsO1xyXG5cdFx0fVxyXG5cclxuXHRcdGlmICggIXRoaXMuZnJlZVBhaW50TGF5ZXIgKSB7XHJcblx0XHRcdHRoaXMuZnJlZVBhaW50TGF5ZXIgPSBuZXcgS29udmEuTGF5ZXIoKTtcclxuXHRcdFx0dGhpcy5zdGFnZS5hZGQoIHRoaXMuZnJlZVBhaW50TGF5ZXIgKTtcclxuXHRcdH1cclxuXHJcblx0XHRjb25zdCBmY2xpcCA9ICggdGhpcy5mcmVlUGFpbnRCcnVzaENsaXBGdW5jID8geyBjbGlwRnVuYzp0aGlzLmZyZWVQYWludEJydXNoQ2xpcEZ1bmMuYmluZCh0aGlzKSB9IDoge30gKTtcclxuXHRcdHRoaXMua0ZyZWVQYWludEJydXNoR3JvdXAgPSBuZXcgS29udmEuR3JvdXAoIGZjbGlwICk7XHJcblx0XHR0aGlzLmZyZWVQYWludExheWVyLmFkZCggdGhpcy5rRnJlZVBhaW50QnJ1c2hHcm91cCApO1xyXG5cclxuXHRcdHRoaXMubGluZXNDb3B5ID0gW107XHJcblx0XHR0aGlzLmlzUGFpbnRpbmcgPSAwO1xyXG5cdFx0dGhpcy5wYWludFBvaW50cyA9IFtdO1xyXG5cdFx0dGhpcy5rRnJlZVBhaW50TGluZSA9IG51bGw7XHJcblxyXG5cdFx0Ly8gaWNvbkJhclxyXG5cdFx0dGhpcy5tb2RlSWNvbkJhciA9IG5ldyBpY29uQmFyKCB0aGlzLnN0YWdlLCB0aGlzLm1vZGVJY29uQmFyRGVmICk7XHJcblx0fVxyXG5cclxuXHQvLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vL1xyXG5cclxuXHRmcmVlUGFpbnRDbGVhckFsbCAoIG5vdGlmeT10cnVlICkge1xyXG5cdFx0aWYgKCBoYXNNYXJrZXIgJiYgKCB0aGlzLmhhc01hcmtlcj09PXVuZGVmaW5lZCB8fCB0aGlzLmhhc01hcmtlciApICkge1xyXG5cdFx0XHR0aGlzLmtGcmVlUGFpbnRNYXJrZXJHcm91cC5kZXN0cm95Q2hpbGRyZW4oKTtcclxuXHRcdFx0dGhpcy5mcmVlUGFpbnRNYXJrZXJMYXllci5iYXRjaERyYXcoKTtcclxuXHRcdH1cclxuXHRcdHRoaXMua0ZyZWVQYWludEJydXNoR3JvdXAuZGVzdHJveUNoaWxkcmVuKCk7XHJcblx0XHR0aGlzLmZyZWVQYWludExheWVyLmJhdGNoRHJhdygpO1xyXG5cclxuXHRcdHRoaXMubGluZXNDb3B5ID0gW107XHJcblxyXG5cdFx0dGhpcy5tb2RlSWNvbkJhci5jbGlja09uKDApO1xyXG5cclxuXHRcdGlmICggbm90aWZ5ICkge1xyXG5cdFx0XHR0aGlzLmJhc2UucG9zdExvZyggJ3BhaW50Q2xlYXJBbGwnLCB7fSApO1xyXG5cclxuXHRcdFx0dGhpcy5iYXNlLnNlbmRDaGFuZ2VTdGF0ZSggdGhpcyApO1x0Ly8gaW5pdCAmIHNlbmQgY2hhbmdlU3RhdGUgJiBzY29yZVxyXG5cdFx0fVxyXG5cdH1cclxuXHJcblx0c2V0UGFpbnRNb2RlIChtb2RlKSB7XHJcblx0XHR0aGlzLm1vZGUgPSBtb2RlO1xyXG5cdFx0dGhpcy5iYXNlLnBvc3RMb2coICdtb2RlU2V0JywgeyBtb2RlIH0gKVxyXG5cdH1cclxuXHJcblx0Ly8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy9cclxuXHJcblx0Z2V0U3RhdGUgKCkge1xyXG5cclxuXHRcdGNvbnN0IHN1cGVyU3RhdGUgPSBzdXBlci5nZXRTdGF0ZSgpO1xyXG5cclxuXHRcdGlmICggdGhpcy5saW5lc0NvcHkubGVuZ3RoICkge1xyXG5cclxuXHRcdFx0Y29uc3Qgc3RhdGUgPSBKU09OLnBhcnNlKCBzdXBlclN0YXRlICk7XHJcblx0XHRcdHN0YXRlLmxpbmVzID0gdGhpcy5saW5lc0NvcHk7XHJcblx0XHRcdHJldHVybiBKU09OLnN0cmluZ2lmeSggc3RhdGUgKTtcclxuXHJcblx0XHR9IGVsc2Uge1xyXG5cclxuXHRcdFx0cmV0dXJuIHN1cGVyU3RhdGU7XHJcblxyXG5cdFx0fVxyXG5cdH1cclxuXHJcblx0c2V0U3RhdGUgKCBzdGF0ZSApIHtcclxuXHJcblx0XHRzdXBlci5zZXRTdGF0ZSggc3RhdGUgKTtcclxuXHJcblx0XHR0cnkge1xyXG5cclxuXHRcdFx0Y29uc3Qgb2JqID0gSlNPTi5wYXJzZShzdGF0ZSk7XHJcblxyXG5cdFx0XHQvLyByZWNvbnN0cnVjdCBsaW5lc1xyXG5cdFx0XHRpZiAoIG9iai5saW5lcyApIHtcclxuXHRcdFx0XHR0aGlzLmZyZWVQYWludENsZWFyQWxsKGZhbHNlKTtcclxuXHJcblx0XHRcdFx0b2JqLmxpbmVzLmZvckVhY2goIGxpbmUgPT4ge1xyXG5cdFx0XHRcdFx0Y29uc3QgbW9kZVRyYW5zID0ge1xyXG5cdFx0XHRcdFx0XHRiOiAnYnJ1c2gnLFxyXG5cdFx0XHRcdFx0XHRtOiAnbWFya2VyJyxcclxuXHRcdFx0XHRcdFx0ZTogJ2VyYXNlJyxcclxuXHRcdFx0XHRcdH1cclxuXHRcdFx0XHRcdGNvbnN0IG1vZGUgPSBtb2RlVHJhbnNbIGxpbmUudCBdO1xyXG5cdFx0XHRcdFx0Y29uc3Qga0xpbmUgPSBuZXcgS29udmEuTGluZSggT2JqZWN0LmFzc2lnbigge30sIHRoaXMucGFpbnRMaW5lc1sgbW9kZSBdLCB7XHJcblx0XHRcdFx0XHRcdHBvaW50czogbGluZS5wLFxyXG5cdFx0XHRcdFx0fSkpO1xyXG5cdFx0XHRcdFx0aWYgKCBtb2RlICE9ICdtYXJrZXInICkge1xyXG5cdFx0XHRcdFx0XHR0aGlzLmtGcmVlUGFpbnRCcnVzaEdyb3VwLmFkZCgga0xpbmUgKTtcclxuXHRcdFx0XHRcdH1cclxuXHRcdFx0XHRcdGlmICggaGFzTWFya2VyICYmICggdGhpcy5oYXNNYXJrZXI9PT11bmRlZmluZWQgfHwgdGhpcy5oYXNNYXJrZXIgKSAmJiBtb2RlICE9ICdicnVzaCcgKSB7XHJcblx0XHRcdFx0XHRcdHRoaXMua0ZyZWVQYWludE1hcmtlckdyb3VwLmFkZCggbW9kZSAhPSAnbWFya2VyJyA/IGtMaW5lLmNsb25lKCkgOiBrTGluZSApO1xyXG5cdFx0XHRcdFx0fVxyXG5cdFx0XHRcdH0pXHJcblx0XHRcdFx0dGhpcy5saW5lc0NvcHkgPSBvYmoubGluZXM7XHJcblx0XHRcdH1cclxuXHJcblx0XHRcdGlmICggaGFzTWFya2VyICYmICggdGhpcy5oYXNNYXJrZXI9PT11bmRlZmluZWQgfHwgdGhpcy5oYXNNYXJrZXIgKSApIHtcclxuXHRcdFx0XHR0aGlzLmZyZWVQYWludE1hcmtlckxheWVyLmRyYXcoKTtcclxuXHRcdFx0fVxyXG5cdFx0XHR0aGlzLmZyZWVQYWludExheWVyLmRyYXcoKTtcclxuXHJcblx0XHR9IGNhdGNoIChlKSB7XHJcblx0XHRcdGNvbnNvbGUuZXJyb3IoZSk7XHJcblx0XHR9XHJcblxyXG5cdFx0c2V0U3RhdGVQb3N0UHJvYyh0aGlzKTtcclxuXHR9XHJcblxyXG5cdGdldENoU3RhdGUgKCkge1xyXG5cdFx0Y29uc3QgcyA9IHN1cGVyLmdldENoU3RhdGUoKTtcclxuXHRcdGlmICggbGluZXNDaGFuZ2VTdGF0ZSAmJiB0aGlzLmxpbmVzQ29weSAmJiB0aGlzLmxpbmVzQ29weS5sZW5ndGggKSB7XHJcblx0XHRcdHMubGluZXMgPSB0aGlzLmxpbmVzQ29weTtcclxuXHRcdH1cclxuXHRcdHJldHVybiAgcztcclxuXHR9XHJcblxyXG5cdGdldERlZmF1bHRDaGFuZ2VTdGF0ZSAoKSB7XHJcblxyXG5cdFx0cmV0dXJuIHN1cGVyLmdldERlZmF1bHRDaGFuZ2VTdGF0ZSgpIHx8ICEhKCBsaW5lc0NoYW5nZVN0YXRlICYmIHRoaXMubGluZXNDb3B5ICYmIHRoaXMubGluZXNDb3B5Lmxlbmd0aCApO1xyXG5cclxuXHR9XHJcbn1cclxuXHJcbi8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vL1xyXG5cclxuZXhwb3J0IGNvbnN0IGFkZEZyZWVMYWJlbHNUbyA9ICggYmFzZUNsYXNzICkgPT4gY2xhc3MgZXh0ZW5kcyBiYXNlQ2xhc3Mge1xyXG5cclxuXHQvLyBiYXNlQ2xhc3MgbXVzdCBjYWxsIHRoaXMucmVkcmF3KCkgd2hlbiB2YWx1ZXMgYXJlIGNoYW5nZWRcclxuXHQvLyBkZXBlbmRpbmcgY2hhbmdlcyBpbiBwb3MvdGV4dCBvZiBsYWJlbHNcclxuXHJcblx0Y29uc3RydWN0b3IgKCBiYXNlLCBvcHRzID0ge30gKSB7XHJcblxyXG5cdFx0c3VwZXIoIGJhc2UsIG9wdHMgKTtcclxuXHRcdGlmICggIW9wdHMuZnJlZUxhYmVscyB8fCAhb3B0cy5mcmVlTGFiZWxzLmxlbmd0aCApIHtcclxuXHRcdFx0cmV0dXJuO1xyXG5cdFx0fVxyXG5cclxuXHRcdGNvbnN0IGFkZGl0aW9uYWxEZWZhdWx0T3B0cyA9IHtcclxuXHJcblx0XHRcdGZyZWVMYWJlbHM6IFtcclxuXHRcdFx0XHQvLyB7XHJcblx0XHRcdFx0Ly8gXHR4LCB5LCB2YWx1ZSxcdFx0Ly8gdmFsdWVzIG9yXHJcblx0XHRcdFx0Ly8gXHR4Rm5jLCB5Rm5jLCB2YWx1ZUZuYywgXHQvLyBmdW5jdGlvbnMgdGhhdCByZXR1cm4gbmV3IFZhbHVlcyAodXBkYXRlZCBpbiB0aGlzLnJlZHJhdygpKVxyXG5cdFx0XHRcdC8vIFx0Ly8gYWRkaXRpb25hbCB0ZXh0RnJhbWUtT3B0aW9uc1xyXG5cdFx0XHRcdC8vIH1cclxuXHRcdFx0XSxcclxuXHJcblx0XHRcdGRlZmF1bHRGcmVlTGFiZWxPcHRzOiB7XHJcblx0XHRcdFx0dmFsdWU6ICcnLFxyXG5cdFx0XHRcdHdpZHRoOiA1MCxcclxuXHRcdFx0XHRoZWlnaHQ6IDI1LFxyXG5cdFx0XHRcdGZvbnRTaXplOiAxNSxcclxuXHRcdFx0XHRmcmFtZVdpZHRoOiAxLFxyXG5cdFx0XHRcdGNvcm5lclJhZGl1czogNCxcclxuXHRcdFx0fSxcclxuXHJcblx0XHR9O1xyXG5cdFx0bWVyZ2VBZGRpdGlvbmFsRGVmYXVsdHNUb1RoaXMuY2FsbCggdGhpcywgYWRkaXRpb25hbERlZmF1bHRPcHRzLCBvcHRzICk7XHJcblxyXG5cdFx0dGhpcy5mcmVlTGFiZWxzSW5pdCgpO1xyXG5cdFx0dGhpcy5yZWRyYXcoKTtcclxuXHJcblx0XHR0aGlzLmluaXREYXRhID0gdGhpcy5nZXRDaFN0YXRlKCk7XHJcblx0XHR0aGlzLmJhc2Uuc2VuZENoYW5nZVN0YXRlKCB0aGlzICk7XHQvLyBpbml0ICYgc2VuZCBjaGFuZ2VTdGF0ZSAmIHNjb3JlXHJcblx0fVxyXG5cclxuXHQvLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vL1xyXG5cclxuXHRmcmVlTGFiZWxzSW5pdCAoKSB7XHJcblxyXG5cdFx0dGhpcy5mcmVlTGFiZWxzTGF5ZXIgPSB0aGlzLnN0YWdlLmdldExheWVycygpLnNsaWNlKC0xKVswXTtcclxuXHJcblx0XHQvLyBjcmVhdGUgZnJlZUxhYmVsc1xyXG5cdFx0dGhpcy5mcmVlTGFiZWxzLmZvckVhY2goIChsLG5yKSA9PiB7XHJcblx0XHRcdGlmICggbC54Rm5jICkge1xyXG5cdFx0XHRcdGwueCA9IGwueEZuYy5jYWxsKHRoaXMpO1xyXG5cdFx0XHR9XHJcblx0XHRcdGlmICggbC55Rm5jICkge1xyXG5cdFx0XHRcdGwueSA9IGwueUZuYy5jYWxsKHRoaXMpO1xyXG5cdFx0XHR9XHJcblx0XHRcdGlmICggbC52YWx1ZWZuYyApIHtcclxuXHRcdFx0XHRsLnZhbHVlID0gbC52YWx1ZUZuYy5jYWxsKHRoaXMpO1xyXG5cdFx0XHR9XHJcblxyXG5cdFx0XHRpZiAoIGwudGV4dE9iaiApIHtcclxuXHRcdFx0XHRsLnRleHRPYmouZGVsZXRlQWxsKCk7XHJcblx0XHRcdH1cclxuXHRcdFx0bC50ZXh0T2JqID0gbmV3IHRleHRGcmFtZShcclxuXHRcdFx0XHR0aGlzLmJhc2UsXHJcblx0XHRcdFx0dGhpcy5mcmVlTGFiZWxzTGF5ZXIsXHJcblx0XHRcdFx0T2JqZWN0LmFzc2lnbigge30sIHRoaXMuZGVmYXVsdEZyZWVMYWJlbE9wdHMsIGwsIHtcclxuXHRcdFx0XHRcdGxvZ09iamVjdElkOiBucisxLFxyXG5cdFx0XHRcdFx0b25DaGFuZ2U6ICgpID0+IHtcclxuXHRcdFx0XHRcdFx0dGhpcy5iYXNlLnBvc3RMb2coICdsYWJlbENoYW5nZWQnLCB7XHJcblx0XHRcdFx0XHRcdFx0aWQ6IG5yKzEsXHJcblx0XHRcdFx0XHRcdFx0bGFiZWxOZXc6IGwudGV4dE9iai52YWx1ZSxcclxuXHRcdFx0XHRcdFx0fSk7XHJcblx0XHRcdFx0XHRcdHRoaXMuYmFzZS5zZW5kQ2hhbmdlU3RhdGUoIHRoaXMgKTtcclxuXHRcdFx0XHRcdH0sXHJcblx0XHRcdFx0fSlcclxuXHRcdFx0KTtcclxuXHRcdH0pXHJcblx0fVxyXG5cclxuXHQvLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vL1xyXG5cclxuXHRyZWRyYXcgKCkge1xyXG5cclxuXHRcdHN1cGVyLnJlZHJhdy5hcHBseSggdGhpcywgYXJndW1lbnRzICk7XHJcblxyXG5cdFx0Ly8gYXR0cmlidXRlcyBvZiBmcmVlTGFiZWxzICh4LCB5LCB0ZXh0KSBjaGFuZ2VkP1xyXG5cdFx0bGV0IHJlZHJhdyA9IDA7XHJcblx0XHR0aGlzLmZyZWVMYWJlbHMuZm9yRWFjaCggbCA9PiB7XHJcblx0XHRcdGxldCBuZXdQb3MgPSAwO1xyXG5cdFx0XHRpZiAoIGwueEZuYyApIHtcclxuXHRcdFx0XHRjb25zdCBudmFsID0gbC54Rm5jLmNhbGwodGhpcyk7XHJcblx0XHRcdFx0aWYgKCBudmFsICE9IGwueCApIHtcclxuXHRcdFx0XHRcdGwueCA9IG52YWw7XHJcblx0XHRcdFx0XHRuZXdQb3M9MTtcclxuXHRcdFx0XHR9XHJcblx0XHRcdH1cclxuXHRcdFx0aWYgKCBsLnlGbmMgKSB7XHJcblx0XHRcdFx0Y29uc3QgbnZhbCA9IGwueUZuYy5jYWxsKHRoaXMpO1xyXG5cdFx0XHRcdGlmICggbnZhbCAhPSBsLnkgKSB7XHJcblx0XHRcdFx0XHRsLnkgPSBudmFsO1xyXG5cdFx0XHRcdFx0bmV3UG9zPTE7XHJcblx0XHRcdFx0fVxyXG5cdFx0XHR9XHJcblx0XHRcdGlmICggbmV3UG9zICkge1xyXG5cdFx0XHRcdGwudGV4dE9iai5yZXBvcyggbC54LCBsLnkgKTtcclxuXHRcdFx0XHRyZWRyYXcgPSAxO1xyXG5cdFx0XHR9XHJcblxyXG5cdFx0XHRpZiAoIGwudmFsdWVGbmMgKSB7XHJcblx0XHRcdFx0Y29uc3QgbnZhbCA9IGwudmFsdWVGbmMuY2FsbCh0aGlzKTtcclxuXHRcdFx0XHRpZiAoIG52YWwgIT0gbC52YWx1ZSApIHtcclxuXHRcdFx0XHRcdGwudmFsdWUgPSBudmFsO1xyXG5cdFx0XHRcdFx0bC50ZXh0T2JqLnNldFZhbCggbnZhbCApO1xyXG5cdFx0XHRcdFx0cmVkcmF3ID0gMTtcclxuXHRcdFx0XHR9XHJcblx0XHRcdH1cclxuXHRcdH0pXHJcblxyXG5cdFx0aWYgKCByZWRyYXcgKSB7XHJcblx0XHRcdHRoaXMuZnJlZUxhYmVsc0xheWVyLmJhdGNoRHJhdygpO1xyXG5cdFx0fVxyXG5cdH1cclxuXHJcblx0Ly8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy9cclxuXHJcblx0Z2V0U3RhdGUgKCkge1xyXG5cclxuXHRcdGNvbnN0IHN1cGVyU3RhdGUgPSBzdXBlci5nZXRTdGF0ZSgpO1xyXG5cclxuXHRcdGlmICggdGhpcy5mcmVlTGFiZWxzLmxlbmd0aCApIHtcclxuXHJcblx0XHRcdGxldCBoYXNEYXRhID0gZmFsc2U7XHJcblx0XHRcdGNvbnN0IGRhdGEgPSB0aGlzLmZyZWVMYWJlbHMubWFwKCBsID0+IHtcclxuXHRcdFx0XHRpZiAoICFsLnJlYWRvbmx5ICkge1xyXG5cdFx0XHRcdFx0aGFzRGF0YSA9IHRydWU7XHJcblx0XHRcdFx0XHRyZXR1cm4gKHsgdmFsdWU6IGwudGV4dE9iai52YWx1ZSB9KTtcclxuXHRcdFx0XHR9XHJcblx0XHRcdFx0cmV0dXJuICh7fSk7XHJcblx0XHRcdH0pO1xyXG5cclxuXHRcdFx0aWYgKCAhaGFzRGF0YSApIHtcclxuXHRcdFx0XHRyZXR1cm4gc3VwZXJTdGF0ZTtcclxuXHRcdFx0fVxyXG5cclxuXHRcdFx0Y29uc3Qgc3RhdGUgPSBKU09OLnBhcnNlKCBzdXBlclN0YXRlICk7XHJcblx0XHRcdHN0YXRlLmZyZWVMYWJlbHMgPSBkYXRhO1xyXG5cdFx0XHRyZXR1cm4gSlNPTi5zdHJpbmdpZnkoIHN0YXRlICk7XHJcblxyXG5cdFx0fSBlbHNlIHtcclxuXHJcblx0XHRcdHJldHVybiBzdXBlclN0YXRlO1xyXG5cclxuXHRcdH1cclxuXHR9XHJcblxyXG5cdHNldFN0YXRlICggc3RhdGUgKSB7XHJcblxyXG5cdFx0c3VwZXIuc2V0U3RhdGUoIHN0YXRlICk7XHJcblxyXG5cdFx0dHJ5IHtcclxuXHJcblx0XHRcdGNvbnN0IG9iaiA9IEpTT04ucGFyc2Uoc3RhdGUpO1xyXG5cclxuXHRcdFx0Ly8gbWVyZ2UgTGFiZWwtRGVmc1xyXG5cdFx0XHRpZiAoIG9iai5mcmVlTGFiZWxzICkge1xyXG5cdFx0XHRcdG9iai5mcmVlTGFiZWxzLmZvckVhY2goICggbCwgbiApID0+IE9iamVjdC5hc3NpZ24oIHRoaXMuZnJlZUxhYmVsc1tuXSwgbCApICk7XHJcblx0XHRcdH1cclxuXHRcdFx0dGhpcy5mcmVlTGFiZWxzSW5pdCgpO1xyXG5cclxuXHRcdFx0dGhpcy5mcmVlTGFiZWxzTGF5ZXIuZHJhdygpO1xyXG5cclxuXHRcdH0gY2F0Y2ggKGUpIHtcclxuXHRcdFx0Y29uc29sZS5lcnJvcihlKTtcclxuXHRcdH1cclxuXHJcblx0XHRzZXRTdGF0ZVBvc3RQcm9jKHRoaXMpO1xyXG5cdH1cclxuXHJcblx0Z2V0Q2hTdGF0ZSAoKSB7XHJcblx0XHRjb25zdCBzID0gc3VwZXIuZ2V0Q2hTdGF0ZSgpO1xyXG5cdFx0aWYgKCB0aGlzLmZyZWVMYWJlbHMgKSB7XHJcblx0XHRcdHMubCA9IHRoaXMuZnJlZUxhYmVscy5maWx0ZXIoIGwgPT4gIWwucmVhZG9ubHkgKS5tYXAoIGwgPT4gbC50ZXh0T2JqID8gbC50ZXh0T2JqLnZhbHVlIDogJycgKTtcclxuXHRcdH1cclxuXHRcdHJldHVybiAgcztcclxuXHR9XHJcblxyXG59XHJcblxyXG4vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy9cclxuIiwiXHJcbi8vIGltcG9ydCB7IGlzQmV0d2VlbiwgZGVsRGVmYXVsdHMsIG1lcmdlRGVlcCwgb2JqZWN0X2VxdWFscywgZ2V0WG9mRXZlbnQsIGdldFlvZkV2ZW50LCBnZXRQb3NPZkV2ZW50IH0gZnJvbSAnLi9jb21tb24nXHJcblxyXG5leHBvcnQgZnVuY3Rpb24gaXNCZXR3ZWVuICggdiwgdzEsIHcyICkge1xyXG5cdHJldHVybiB2ID49IE1hdGgubWluKCB3MSwgdzIgKSAmJiB2IDw9IE1hdGgubWF4KCB3MSwgdzIgKTtcclxufTtcclxuXHJcblxyXG5leHBvcnQgZnVuY3Rpb24gaXNOdW1Vbml0ICggdiwgbnVtLCB1bml0UkUsIHVuaXRPcHQsIG9yRW1wdHkgKSB7XHJcblx0Y29uc3QgbnVtUkUgPSBgMCoke251bX0oPzpbLC5dMCopP2A7XHJcblx0Y29uc3QgciA9IHVuaXRPcHQgPyBgJHtudW1SRX0oPzogKiR7dW5pdFJFfSk/fCg/OiR7dW5pdFJFfSAqKT8ke251bVJFfWAgOiBgJHtudW1SRX0gKiR7dW5pdFJFfXwke3VuaXRSRX0gKiR7bnVtUkV9YDtcclxuXHRjb25zdCByZSA9IG5ldyBSZWdFeHAoIGBeKD86JHtyfSkkeyBvckVtcHR5ID8gJz8nIDogJycgfSRgICk7XHJcblx0cmV0dXJuIHYudHJpbSgpLm1hdGNoKHJlKTtcclxufVxyXG5cclxuXHJcbi8vIERlbGV0ZXMgZGVsS2V5cyAmIHVuY2hhbmdlZCBkZWZhdWx0cyBmcm9tIG9ialxyXG4vLyBvYmplY3QgZGVlcCBjbG9uZSwgb21pdHRpbmcgc29tZSBkYXRhIGRlZmluZWQgYnkgZGVmYXVsdHMgYW5kIGRlbEtleXNcclxuLy8gYWRvcHRlZCBmcm9tIGh0dHBzOi8vc3RhY2tvdmVyZmxvdy5jb20vcXVlc3Rpb25zLzQ0NTk5MjgvaG93LXRvLWRlZXAtY2xvbmUtaW4tamF2YXNjcmlwdFxyXG5leHBvcnQgZnVuY3Rpb24gZGVsRGVmYXVsdHMgKCBvYmogPSB7fSwgZGVmYXVsdHMgPSB7fSwgZGVsS2V5cyA9IFtdICkge1xyXG5cclxuXHQvLyBpZiBvYmogaXMgYXJyYXkgb2Ygb2JqZWN0czogYXBwbHkgZGVsRGVmYXVsdHMgdG8gZXZlcnkgbWVtYmVyIG9mIGFycmF5XHJcblx0aWYgKCBBcnJheS5pc0FycmF5KG9iaikgKSB7XHJcblx0XHRsZXQgYSA9IFtdO1xyXG5cdFx0b2JqLmZvckVhY2goIGUgPT4ge1xyXG5cdFx0XHRpZiAoIHR5cGVvZiBlPT09J29iamVjdCcgKSB7XHJcblx0XHRcdFx0YS5wdXNoKCBkZWxEZWZhdWx0cyggZSwgZGVmYXVsdHMsIGRlbEtleXMgKSApO1xyXG5cdFx0XHR9IGVsc2Uge1xyXG5cdFx0XHRcdGEucHVzaChlKTtcclxuXHRcdFx0fVxyXG5cdFx0fSlcclxuXHRcdHJldHVybiBhO1xyXG5cdH1cclxuXHJcblx0aWYgKCAhb2JqICkge1xyXG5cdFx0cmV0dXJuIG9iajtcclxuXHR9XHJcblxyXG5cdGxldCB2O1xyXG5cdGxldCBiT2JqZWN0ID0ge307XHJcblx0Zm9yICggY29uc3QgayBpbiBvYmogKSB7XHJcblx0XHRpZiAoICFkZWxLZXlzLmluY2x1ZGVzKGspICkge1xyXG5cdFx0XHR2ID0gb2JqW2tdO1xyXG5cdFx0XHRpZiAoICFkZWZhdWx0cyB8fCBkZWZhdWx0c1trXSE9PXYgKSB7XHJcblx0XHRcdFx0Yk9iamVjdFtrXSA9ICh0eXBlb2YgdiA9PT0gXCJvYmplY3RcIikgPyBkZWxEZWZhdWx0cyggdiwgZGVmYXVsdHMgPyBkZWZhdWx0c1trXSA6IFtdICkgOiB2O1xyXG5cdFx0XHR9XHJcblx0XHR9XHJcblx0fVxyXG5cclxuXHRyZXR1cm4gYk9iamVjdDtcclxufVxyXG5cclxuLyoqXHJcbiAqIEZyb206IGh0dHBzOi8vZ2lzdC5naXRodWIuY29tL2FodGN4LzBjZDk0ZTYyNjkxZjUzOTE2MGIzMmVjZGExOGFmM2Q2XHJcbiAqIFBlcmZvcm1zIGEgZGVlcCBtZXJnZSBvZiBgc291cmNlYCBpbnRvIGB0YXJnZXRgLlxyXG4gKiBNdXRhdGVzIGB0YXJnZXRgIG9ubHkgYnV0IG5vdCBpdHMgb2JqZWN0cyBhbmQgYXJyYXlzLlxyXG4gKlxyXG4gKiBAYXV0aG9yIGluc3BpcmVkIGJ5IFtqaGlsZGVuYmlkZGxlXShodHRwczovL3N0YWNrb3ZlcmZsb3cuY29tL2EvNDgyMTgyMDkpLlxyXG4gKi9cclxuZXhwb3J0IGZ1bmN0aW9uIG1lcmdlRGVlcCAodGFyZ2V0LCBzb3VyY2UpIHtcclxuXHRjb25zdCBpc09iamVjdCA9IChvYmopID0+IG9iaiAmJiB0eXBlb2Ygb2JqID09PSAnb2JqZWN0JztcclxuXHJcblx0aWYgKCFpc09iamVjdCh0YXJnZXQpIHx8ICFpc09iamVjdChzb3VyY2UpKSB7XHJcblx0XHRyZXR1cm4gc291cmNlO1xyXG5cdH1cclxuXHJcblx0T2JqZWN0LmtleXMoc291cmNlKS5mb3JFYWNoKGtleSA9PiB7XHJcblx0XHRjb25zdCB0YXJnZXRWYWx1ZSA9IHRhcmdldFtrZXldO1xyXG5cdFx0Y29uc3Qgc291cmNlVmFsdWUgPSBzb3VyY2Vba2V5XTtcclxuXHJcblx0XHRpZiAoIC8qQXJyYXkuaXNBcnJheSh0YXJnZXRWYWx1ZSkgJiYqLyBBcnJheS5pc0FycmF5KHNvdXJjZVZhbHVlKSkge1xyXG5cdFx0XHQvLyBOTyBDT05DQVRFTkFUSU9OIE9GIEFSUkFZUyFcclxuXHRcdFx0Ly8gdGFyZ2V0W2tleV0gPSB0YXJnZXRWYWx1ZS5jb25jYXQoc291cmNlVmFsdWUpO1xyXG5cdFx0XHR0YXJnZXRba2V5XSA9IHNvdXJjZVZhbHVlO1xyXG5cdFx0fSBlbHNlIGlmIChpc09iamVjdCh0YXJnZXRWYWx1ZSkgJiYgaXNPYmplY3Qoc291cmNlVmFsdWUpKSB7XHJcblx0XHRcdHRhcmdldFtrZXldID0gbWVyZ2VEZWVwKE9iamVjdC5hc3NpZ24oe30sIHRhcmdldFZhbHVlKSwgc291cmNlVmFsdWUpO1xyXG5cdFx0fSBlbHNlIHtcclxuXHRcdFx0dGFyZ2V0W2tleV0gPSBzb3VyY2VWYWx1ZTtcclxuXHRcdH1cclxuXHR9KTtcclxuXHJcblx0cmV0dXJuIHRhcmdldDtcclxufVxyXG5cclxuLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy9cclxuXHJcbi8vIGFkb3B0ZWQgZnJvbSBodHRwczovL3N0YWNrb3ZlcmZsb3cuY29tL3F1ZXN0aW9ucy8xMDY4ODM0L29iamVjdC1jb21wYXJpc29uLWluLWphdmFzY3JpcHRcclxuZXhwb3J0IGZ1bmN0aW9uIG9iamVjdF9lcXVhbHMgKCB4LCB5ICkge1xyXG5cdGlmICggeCA9PT0geSApIHJldHVybiB0cnVlO1xyXG5cdC8vIGlmIGJvdGggeCBhbmQgeSBhcmUgbnVsbCBvciB1bmRlZmluZWQgYW5kIGV4YWN0bHkgdGhlIHNhbWVcclxuXHJcblx0aWYgKCAhICggeCBpbnN0YW5jZW9mIE9iamVjdCApIHx8ICEgKCB5IGluc3RhbmNlb2YgT2JqZWN0ICkgKSByZXR1cm4gZmFsc2U7XHJcblx0Ly8gaWYgdGhleSBhcmUgbm90IHN0cmljdGx5IGVxdWFsLCB0aGV5IGJvdGggbmVlZCB0byBiZSBPYmplY3RzXHJcblxyXG5cdGlmICggeC5jb25zdHJ1Y3RvciAhPT0geS5jb25zdHJ1Y3RvciApIHJldHVybiBmYWxzZTtcclxuXHQvLyB0aGV5IG11c3QgaGF2ZSB0aGUgZXhhY3Qgc2FtZSBwcm90b3R5cGUgY2hhaW4sIHRoZSBjbG9zZXN0IHdlIGNhbiBkbyBpc1xyXG5cdC8vIHRlc3QgdGhlcmUgY29uc3RydWN0b3IuXHJcblxyXG5cdC8vIGlmIGJvdGggYXJlIGFycmF5czogdW5vcmRlcmVkIGNvbXBhcmUgKGNoZWNrIGlmIGFsbCBlbGVtZW50cyBhcmUgY29udGFpbmVkKVxyXG5cdGlmICggQXJyYXkuaXNBcnJheSh5KSAmJiBBcnJheS5pc0FycmF5KHgpICkge1xyXG5cdFx0aWYgKCB4Lmxlbmd0aCAhPSB5Lmxlbmd0aCApIHJldHVybiBmYWxzZTtcclxuXHRcdGNvbnN0IHkyID0gQXJyYXkuZnJvbSggeSApO1xyXG5cdFx0aWYgKCAheC5ldmVyeSggeGUgPT5cclxuXHRcdFx0eTIuc29tZSggKCB5ZSwgaSApID0+IHtcclxuXHRcdFx0XHRpZiAoIG9iamVjdF9lcXVhbHMoIHhlLCB5ZSApICkge1xyXG5cdFx0XHRcdFx0eTIuc3BsaWNlKCBpLCAxICk7XHJcblx0XHRcdFx0XHRyZXR1cm4gdHJ1ZTtcclxuXHRcdFx0XHR9XHJcblx0XHRcdFx0cmV0dXJuIGZhbHNlO1xyXG5cdFx0XHR9KVxyXG5cdFx0KSkgcmV0dXJuIGZhbHNlO1xyXG5cdFx0cmV0dXJuIHkyLmxlbmd0aD09PTA7XHJcblx0fVxyXG5cclxuXHRmb3IgKCB2YXIgcCBpbiB4ICkge1xyXG5cdFx0aWYgKCAhIHguaGFzT3duUHJvcGVydHkoIHAgKSApIGNvbnRpbnVlO1xyXG5cdFx0XHQvLyBvdGhlciBwcm9wZXJ0aWVzIHdlcmUgdGVzdGVkIHVzaW5nIHguY29uc3RydWN0b3IgPT09IHkuY29uc3RydWN0b3JcclxuXHJcblx0XHRpZiAoICEgeS5oYXNPd25Qcm9wZXJ0eSggcCApICkgcmV0dXJuIGZhbHNlO1xyXG5cdFx0XHQvLyBhbGxvd3MgdG8gY29tcGFyZSB4WyBwIF0gYW5kIHlbIHAgXSB3aGVuIHNldCB0byB1bmRlZmluZWRcclxuXHJcblx0XHRpZiAoIHhbIHAgXSA9PT0geVsgcCBdICkgY29udGludWU7XHJcblx0XHRcdC8vIGlmIHRoZXkgaGF2ZSB0aGUgc2FtZSBzdHJpY3QgdmFsdWUgb3IgaWRlbnRpdHkgdGhlbiB0aGV5IGFyZSBlcXVhbFxyXG5cclxuXHRcdGlmICggdHlwZW9mKCB4WyBwIF0gKSAhPT0gXCJvYmplY3RcIiApIHJldHVybiBmYWxzZTtcclxuXHRcdFx0Ly8gTnVtYmVycywgU3RyaW5ncywgRnVuY3Rpb25zLCBCb29sZWFucyBtdXN0IGJlIHN0cmljdGx5IGVxdWFsXHJcblxyXG5cdFx0aWYgKCAhIG9iamVjdF9lcXVhbHMoIHhbIHAgXSwgIHlbIHAgXSApICkgcmV0dXJuIGZhbHNlO1xyXG5cdFx0XHQvLyBPYmplY3RzIGFuZCBBcnJheXMgbXVzdCBiZSB0ZXN0ZWQgcmVjdXJzaXZlbHlcclxuXHR9XHJcblxyXG5cdGZvciAoIHAgaW4geSApXHJcblx0aWYgKCB5Lmhhc093blByb3BlcnR5KCBwICkgJiYgISB4Lmhhc093blByb3BlcnR5KCBwICkgKVxyXG5cdFx0cmV0dXJuIGZhbHNlO1xyXG5cdFx0Ly8gYWxsb3dzIHhbIHAgXSB0byBiZSBzZXQgdG8gdW5kZWZpbmVkXHJcblxyXG5cdHJldHVybiB0cnVlO1xyXG59XHJcblxyXG4vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vL1xyXG5cclxuZXhwb3J0IGZ1bmN0aW9uIGdldFhvZkV2ZW50ICggc3RhZ2UsIGV2ZW50ICkge1xyXG5cdGlmICggZXZlbnQgKSB7XHJcblx0XHRpZiAoIGV2ZW50LnNpbVggKSB7XHJcblx0XHRcdHJldHVybiBldmVudC5zaW1YO1xyXG5cdFx0fVxyXG5cdFx0Ly8gaWYgKCBldmVudC5ldnQgJiYgZXZlbnQuZXZ0LmNsaWVudFggKSB7XHJcblx0XHQvLyBcdHJldHVybiBldmVudC5ldnQuY2xpZW50WDtcclxuXHRcdC8vIH1cclxuXHR9XHJcblx0cmV0dXJuIHN0YWdlLmdldFBvaW50ZXJQb3NpdGlvbigpLng7XHJcbn1cclxuXHJcblxyXG5leHBvcnQgZnVuY3Rpb24gZ2V0WW9mRXZlbnQgKCBzdGFnZSwgZXZlbnQgKSB7XHJcblx0aWYgKCBldmVudCApIHtcclxuXHRcdGlmICggZXZlbnQuc2ltWSApIHtcclxuXHRcdFx0cmV0dXJuIGV2ZW50LnNpbVk7XHJcblx0XHR9XHJcblx0XHQvLyBpZiAoIGV2ZW50LmV2dCAmJiBldmVudC5ldnQuY2xpZW50WSApIHtcclxuXHRcdC8vIFx0cmV0dXJuIGV2ZW50LmV2dC5jbGllbnRZO1xyXG5cdFx0Ly8gfVxyXG5cdH1cclxuXHRyZXR1cm4gc3RhZ2UuZ2V0UG9pbnRlclBvc2l0aW9uKCkueTtcclxufVxyXG5cclxuXHJcbmV4cG9ydCBmdW5jdGlvbiBnZXRQb3NPZkV2ZW50ICggc3RhZ2UsIGV2ICkge1xyXG5cdHJldHVybiB7XHJcblx0XHR4OiBnZXRYb2ZFdmVudCggc3RhZ2UsIGV2ICksXHJcblx0XHR5OiBnZXRZb2ZFdmVudCggc3RhZ2UsIGV2ICksXHJcblx0fVxyXG59XHJcblxyXG5cclxuLy8gaXMgaW4gRGVtb0FuaTogaWdub3JlIG5hdGl2ZSBFdmVudHMgKHByZXZlbnQgZS5nLiBzdGFnZS5vbihtb3VzZWxlYXZlKSlcclxuZXhwb3J0IGZ1bmN0aW9uIGlnbm9yZUV2ZW50ICggc3RhZ2UsIGV2ICkge1xyXG5cdHJldHVybiAoIHN0YWdlICYmIHN0YWdlLmlzRGVtb0FuaSAmJiAhKCBcInNpbVhcIiBpbiBldiApICk7XHJcbn1cclxuXHJcblxyXG4vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vL1xyXG5cclxuZXhwb3J0IGNvbnN0IHNldFN0YXRlUG9zdFByb2MgPSBmdW5jdGlvbiAob2JqKSB7XHJcblxyXG5cdGlmICggb2JqLnN0YWdlICYmIG9iai5zdGFnZS5pc0RlbW9BbmkgJiYgb2JqLnN0YWdlLmlzRGVtb0FuaS5lbmRBbmkgKSB7XHJcblx0XHRvYmouc3RhZ2UuaXNEZW1vQW5pLmVuZEFuaSggZmFsc2UgKTtcclxuXHR9XHJcblxyXG5cdGlmICggb2JqLmJhc2UgKSB7XHJcblx0XHRvYmouYmFzZS5zZW5kQ2hhbmdlU3RhdGUoIG9iaiApO1x0Ly8gaW5pdCAmIHNlbmQgY2hhbmdlU3RhdGUgJiBzY29yZVxyXG5cdH1cclxuXHQvLyBvYmoub2xkQ2hhbmdlU3RhdGUgPSBvYmouYmFzZS5nZXRDaGFuZ2VTdGF0ZShvYmopO1xyXG5cdC8vIGlmICggb2JqLnNjb3JlRGVmICkge1xyXG5cdC8vIFx0b2JqLm9sZFNjb3JlID0gb2JqLnNjb3JlRGVmKCk7XHJcblx0Ly8gfVxyXG59XHJcblxyXG4vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vL1xyXG5cclxuZXhwb3J0IGNvbnN0IGdldEFic1Bvc2l0aW9uID0gZnVuY3Rpb24gKGVsZW1lbnQpIHtcclxuXHRjb25zdCBib3ggPSBlbGVtZW50LmdldEJvdW5kaW5nQ2xpZW50UmVjdCgpO1xyXG5cdGNvbnN0IHNjcm9sbFggPSB3aW5kb3cuc2Nyb2xsWCB8fCB3aW5kb3cucGFnZVhPZmZzZXQ7XHJcblx0Y29uc3Qgc2Nyb2xsWSA9IHdpbmRvdy5zY3JvbGxZIHx8IHdpbmRvdy5wYWdlWU9mZnNldDtcclxuXHRyZXR1cm4ge1xyXG5cdFx0bGVmdDogYm94LmxlZnQgKyBzY3JvbGxYLFxyXG5cdFx0dG9wOiBib3gudG9wICsgc2Nyb2xsWVxyXG5cdH1cclxufVxyXG5cclxuXHJcbi8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vXHJcblxyXG5leHBvcnQgY29uc3QgYWRkQXJyb3cgPSBmdW5jdGlvbiAoIGxheWVyLCBvcHRzICkge1xyXG5cdGxheWVyLmFkZChuZXcgS29udmEuTGluZShvcHRzKSk7XHJcblx0Y29uc3QgcG9pbnRlckxlbmd0aCA9IG9wdHMucG9pbnRlckxlbmd0aCB8fCAxMDtcclxuXHRjb25zdCBwb2ludGVyV2lkdGggPSBvcHRzLnBvaW50ZXJXaWR0aC8yIHx8IDM7XHJcblx0Y29uc3QgcyA9IHsgeDogb3B0cy5wb2ludHNbMF0sIHk6IG9wdHMucG9pbnRzWzFdIH07XHJcblx0Y29uc3QgcDAgPSB7IHg6IG9wdHMucG9pbnRzWzJdLCB5OiBvcHRzLnBvaW50c1szXSB9O1xyXG5cdGNvbnN0IGR4ID0gcy54IC0gcDAueDtcclxuXHRjb25zdCBkeSA9IHMueSAtIHAwLnk7XHJcblx0Y29uc3Qgbm9ybSA9IE1hdGguc3FydChkeCAqIGR4ICsgZHkgKiBkeSk7XHJcblx0Y29uc3QgdSA9IHsgeDogZHggLyBub3JtLCB5OiBkeSAvIG5vcm0gfTtcclxuXHRjb25zdCB2ID0geyB4OiAtdS55LCB5OiB1LnggfTtcclxuXHRjb25zdCBwMSA9IHtcclxuXHRcdHg6IHAwLnggKyBwb2ludGVyTGVuZ3RoICogdS54ICsgcG9pbnRlcldpZHRoICogdi54LFxyXG5cdFx0eTogcDAueSArIHBvaW50ZXJMZW5ndGggKiB1LnkgKyBwb2ludGVyV2lkdGggKiB2LnlcclxuXHR9O1xyXG5cdGNvbnN0IHAyID0ge1xyXG5cdFx0eDogcDAueCArIHBvaW50ZXJMZW5ndGggKiB1LnggLSBwb2ludGVyV2lkdGggKiB2LngsXHJcblx0XHR5OiBwMC55ICsgcG9pbnRlckxlbmd0aCAqIHUueSAtIHBvaW50ZXJXaWR0aCAqIHYueVxyXG5cdH07XHJcblx0bGF5ZXIuYWRkKFxyXG5cdFx0bmV3IEtvbnZhLkxpbmUoe1xyXG5cdFx0XHRmaWxsOiBcImJsYWNrXCIsXHJcblx0XHRcdC4uLm9wdHMsXHJcblx0XHRcdHBvaW50czogW3AxLngsIHAxLnksIHAwLngsIHAwLnksIHAyLngsIHAyLnldLFxyXG5cdFx0XHRjbG9zZWQ6IHRydWVcclxuXHRcdH0pXHJcblx0KTtcclxufTtcclxuIiwiLy8gU2V0IEZTTSB2YXJpYWJsZVxyXG5cclxuZXhwb3J0IGNsYXNzIGZzbVNlbmQge1xyXG5cclxuXHRjb25zdHJ1Y3RvciAoKSB7XHJcblx0XHR0aGlzLmluZGV4UGF0aCA9IHRoaXMuZ2V0UXVlcnlWYXJpYWJsZSgnaW5kZXhQYXRoJyk7XHJcblx0XHR0aGlzLnVzZXJEZWZJZFBhdGggPSB0aGlzLmdldFF1ZXJ5VmFyaWFibGUoJ3VzZXJEZWZJZFBhdGgnKTtcclxuXHJcblx0XHQvLyBUcmFjZSBDb3VudGVyXHJcblx0XHR0aGlzLnRyYWNlQ291bnQgPSAwO1xyXG5cclxuXHRcdGlmICggcHJvY2Vzcy5lbnYuTk9ERV9FTlYgIT09ICdwcm9kdWN0aW9uJyApIHtcclxuXHRcdFx0d2luZG93LmJ3X19kZWJ1Z091dCA9IHRoaXMuZGVidWdPdXQuYmluZCh0aGlzKTtcclxuXHRcdH1cclxuXHR9XHJcblxyXG5cdHNldEZTTVZhcmlhYmxlICggdmFyaWFibGVOYW1lLCBuZXdWYWx1ZSApIHtcclxuXHJcblx0XHRpZiAoIHByb2Nlc3MuZW52Lk5PREVfRU5WICE9PSAncHJvZHVjdGlvbicgKSB7XHJcblx0XHRcdHRoaXMuZGVidWdPdXQoIGBTZXQgRlNNIHZhcmlhYmxlOiAke3ZhcmlhYmxlTmFtZX0gdG8gdmFsdWUgPiR7bmV3VmFsdWV9PCAoJHt0eXBlb2YgbmV3VmFsdWV9KWAgKTtcclxuXHRcdH1cclxuXHJcblx0XHR0aGlzLnBvc3RNZXNzYWdlV2l0aFBhdGhzQW5kVHJhY2VDb3VudCh7XHJcblx0XHRcdHNldFZhcmlhYmxlOiB7XHJcblx0XHRcdFx0dmFyaWFibGVOYW1lLFxyXG5cdFx0XHRcdG5ld1ZhbHVlLFxyXG5cdFx0XHR9LFxyXG5cdFx0fSlcclxuXHR9XHJcblxyXG5cdC8vIFNlbmQgYSB0cmFjZSBtZXNzYWdlXHJcblx0cG9zdExvZ0V2ZW50ICggdHJhY2VNZXNzYWdlICkge1xyXG5cclxuXHRcdGlmICggcHJvY2Vzcy5lbnYuTk9ERV9FTlYgIT09ICdwcm9kdWN0aW9uJyApIHtcclxuXHRcdFx0dGhpcy5kZWJ1Z091dCggYFBvc3RpbmcgZXZlbnQgJyR7dHJhY2VNZXNzYWdlLmV2ZW50fScsIG1lc3NhZ2UgJHtKU09OLnN0cmluZ2lmeSggdHJhY2VNZXNzYWdlLCAoayx2KSA9PiBrPT09J2V2ZW50JyA/IHVuZGVmaW5lZCA6IHYgKX1gICk7XHJcblx0XHR9XHJcblxyXG5cdFx0dGhpcy5wb3N0TWVzc2FnZVdpdGhQYXRoc0FuZFRyYWNlQ291bnQoe1xyXG5cdFx0XHR0cmFjZU1lc3NhZ2UsXHJcblx0XHR9KVxyXG5cclxuXHR9XHJcblxyXG5cdHRyaWdnZXJFdmVudCAoIGV2ZW50ICkge1xyXG5cclxuXHRcdGlmICggcHJvY2Vzcy5lbnYuTk9ERV9FTlYgIT09ICdwcm9kdWN0aW9uJyApIHtcclxuXHRcdFx0dGhpcy5kZWJ1Z091dChcInRyaWdnZXJFdmVudDogXCIgKyBldmVudCk7XHJcblx0XHR9XHJcblxyXG5cdFx0dGhpcy5wb3N0TWVzc2FnZVdpdGhQYXRoc0FuZFRyYWNlQ291bnQoe1xyXG5cdFx0XHRtaWNyb2ZpbkV2ZW50OiBldmVudCxcclxuXHRcdH0pXHJcblx0fVxyXG5cclxuXHRwb3N0TWVzc2FnZVdpdGhQYXRoc0FuZFRyYWNlQ291bnQoIHBheWxvYWQgKSB7XHJcblxyXG5cdFx0dHJ5XHJcblx0XHR7XHJcblx0XHRcdHBheWxvYWQuaW5kZXhQYXRoID0gdGhpcy5pbmRleFBhdGg7XHJcblx0XHRcdHBheWxvYWQudXNlckRlZklkUGF0aCA9IHRoaXMudXNlckRlZklkUGF0aDtcclxuXHRcdFx0cGF5bG9hZC50cmFjZUNvdW50ID0gdGhpcy50cmFjZUNvdW50Kys7XHJcblxyXG5cdFx0XHR3aW5kb3cucGFyZW50LnBvc3RNZXNzYWdlKCBKU09OLnN0cmluZ2lmeSggcGF5bG9hZCApLCAnKicgKTtcclxuXHJcblx0XHR9IGNhdGNoIChlKSB7XHJcblx0XHRcdGNvbnNvbGUuZXJyb3IoZSk7XHJcblx0XHR9XHJcblxyXG5cdH1cclxuXHJcblx0Ly8gSGVscGVyXHJcblx0Z2V0UXVlcnlWYXJpYWJsZSAodmFyaWFibGUpIHtcclxuXHRcdGNvbnN0IHBhcnNlZFVybCA9IG5ldyBVUkwoIHdpbmRvdy5sb2NhdGlvbi5ocmVmICk7XHJcblx0XHRyZXR1cm4gcGFyc2VkVXJsLnNlYXJjaFBhcmFtcy5nZXQodmFyaWFibGUpO1xyXG5cdH1cclxuXHJcblx0c3RhcnRMaXN0ZW5pbmdUb1ZhcmlhYmxlRGVjbGFyYXRpb25SZXF1ZXN0cyAoZGVjbGFyZVZhcmlhYmxlQ2FsbGJhY2spIHtcclxuXHJcblx0XHQvLyBsaXN0ZW5lciBmb3IgcHJvdmlkaW5nIGluaXRpYWwgdmFyaWFibGUgZGF0YSBzaWduYWwuXHJcblx0XHR3aW5kb3cuYWRkRXZlbnRMaXN0ZW5lcihcclxuXHRcdFx0XCJtZXNzYWdlXCIsXHJcblx0XHRcdChldmVudCkgPT4ge1xyXG5cclxuXHRcdFx0XHR0cnkge1xyXG5cdFx0XHRcdFx0Y29uc3QgeyBjYWxsSWQgfSA9IEpTT04ucGFyc2UoZXZlbnQuZGF0YSk7XHJcblx0XHRcdFx0XHRpZiAoIGNhbGxJZCAhPT0gdW5kZWZpbmVkICYmIGNhbGxJZC5pbmNsdWRlcyhcImltcG9ydFZhcmlhYmxlc1wiKSApIHtcclxuXHRcdFx0XHRcdFx0Y29uc3QgdmFyaWFibGVzID0gZGVjbGFyZVZhcmlhYmxlQ2FsbGJhY2soKTtcclxuXHRcdFx0XHRcdFx0Y29uc3QgcGFzc19kYXRhID0ge1xyXG5cdFx0XHRcdFx0XHRcdGluaXRpYWxWYXJpYWJsZXM6IHZhcmlhYmxlcyxcclxuXHRcdFx0XHRcdFx0XHRjYWxsSWRcclxuXHRcdFx0XHRcdFx0fVxyXG5cclxuXHRcdFx0XHRcdFx0d2luZG93LnBhcmVudC5wb3N0TWVzc2FnZSggSlNPTi5zdHJpbmdpZnkoIHBhc3NfZGF0YSApLCAnKicgKTtcclxuXHRcdFx0XHRcdH1cclxuXHRcdFx0XHR9IGNhdGNoIChlcnJvcikge1xyXG5cdFx0XHRcdFx0aWYgKCBwcm9jZXNzLmVudi5OT0RFX0VOViAhPT0gJ3Byb2R1Y3Rpb24nICkge1xyXG5cdFx0XHRcdFx0XHRjb25zb2xlLmxvZyhcImVycm9yIG9uIGV4dGVybmFsIGxpc3RlbmVyIC0gXCIsIGVycm9yKTtcclxuXHRcdFx0XHRcdH1cclxuXHRcdFx0XHR9XHJcblx0XHRcdH0sXHJcblx0XHRcdGZhbHNlICk7XHJcblx0IH1cclxuXHJcblx0IGRlYnVnT3V0IChzKSB7XHJcblx0XHRpZiAoIHByb2Nlc3MuZW52Lk5PREVfRU5WICE9PSAncHJvZHVjdGlvbicgKSB7XHJcblxyXG5cdFx0XHQvLyBpZiAoICF0aGlzLmRlYnVnT3V0cHV0ICkge1xyXG5cdFx0XHQvLyBcdGNvbnN0IGhlaWd0aD0yMDAsIHdpZHRoPTUwMDtcclxuXHRcdFx0Ly8gXHQvLyBkb2N1bWVudC5ib2R5LmlubmVySFRNTCArPSBgPGRpdiBpZD1cImJ3X0RlYnVnT3V0cHV0XCIgc3R5bGU9XCJ3aWR0aDoke3dpZHRofXB4O2hlaWdodDoke2hlaWd0aH1weDtwb3NpdGlvbjphYnNvbHV0ZTtib3R0b206MHB4O2xlZnQ6MHB4O3otaW5kZXg6MTAwMDAwO3doaXRlLXNwYWNlOnByZTtib3JkZXI6MXB4IHNvbGlkIGJsYWNrO2JhY2tncm91bmQ6bGlnaHR5ZWxsb3dcIj48L2Rpdj5gO1xyXG5cdFx0XHQvLyBcdGNvbnN0IGRpdiA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoXCJESVZcIik7XHJcblx0XHRcdC8vIFx0Y29uc3Qgc3QgPSB7XHJcblx0XHRcdC8vIFx0XHR3aWR0aDpgJHt3aWR0aH1weGAsXHJcblx0XHRcdC8vIFx0XHRoZWlnaHQ6YCR7aGVpZ3RofXB4YCxcclxuXHRcdFx0Ly8gXHRcdG92ZXJmbG93Olwic2Nyb2xsXCIsXHJcblx0XHRcdC8vIFx0XHRwb3NpdGlvbjpcImFic29sdXRlXCIsXHJcblx0XHRcdC8vIFx0XHRib3R0b206XCIwcHhcIixcclxuXHRcdFx0Ly8gXHRcdGxlZnQ6XCIwcHhcIixcclxuXHRcdFx0Ly8gXHRcdFwiei1pbmRleFwiOjEwMDAwMCxcclxuXHRcdFx0Ly8gXHRcdFwid2hpdGUtc3BhY2VcIjpcInByZVwiLFxyXG5cdFx0XHQvLyBcdFx0Ym9yZGVyOlwiMXB4IHNvbGlkIGJsYWNrXCIsXHJcblx0XHRcdC8vIFx0XHRiYWNrZ3JvdW5kOlwibGlnaHR5ZWxsb3dcIixcclxuXHRcdFx0Ly8gXHR9XHJcblx0XHRcdC8vIFx0T2JqZWN0LmFzc2lnbiggZGl2LnN0eWxlLCBzdCApO1xyXG5cdFx0XHQvLyBcdGRvY3VtZW50LmJvZHkuYXBwZW5kQ2hpbGQoZGl2KTtcclxuXHRcdFx0Ly8gXHR0aGlzLmRlYnVnT3V0cHV0ID0gZGl2O1xyXG5cdFx0XHQvLyB9XHJcblx0XHRcdC8vIHRoaXMuZGVidWdPdXRwdXQuaW5uZXJIVE1MICs9IFwiXFxuXCIrcztcclxuXHRcdFx0Ly8gdGhpcy5kZWJ1Z091dHB1dC5zY3JvbGxUb3AgPSB0aGlzLmRlYnVnT3V0cHV0LnNjcm9sbEhlaWdodDtcclxuXHJcblx0XHRcdGNvbnNvbGUubG9nKHMpO1xyXG5cdFx0XHQvLyBjb25zb2xlLnRyYWNlKCk7XHJcblxyXG5cdFx0fVxyXG5cdCB9XHJcbn1cclxuIiwiaW1wb3J0IHsgaWdub3JlRXZlbnQgfSBmcm9tICcuL2NvbW1vbidcclxuXHJcbmltcG9ydCB7IHRvb2x0aXAgfSBmcm9tICcuL3Rvb2x0aXAnXHJcblxyXG5pbXBvcnQgS29udmEgZnJvbSAna29udmEvbGliL0NvcmUnXHJcbmltcG9ydCB7IFJlY3QgfSBmcm9tICdrb252YS9saWIvc2hhcGVzL1JlY3QnXHJcbmltcG9ydCB7IFRleHQgfSBmcm9tICdrb252YS9saWIvc2hhcGVzL1RleHQnXHJcbmltcG9ydCB7IEltYWdlIGFzIGtJbWFnZSB9IGZyb20gJ2tvbnZhL2xpYi9zaGFwZXMvSW1hZ2UnXHJcblxyXG5leHBvcnQgY2xhc3MgaWNvbkJhciB7XHJcblxyXG5cdGNvbnN0cnVjdG9yICggc3RhZ2UsIG9wdHMgPSB7fSApIHtcclxuXHJcblx0XHQvLyBPcHRpb25zIGFuZCBkZWZhdWx0c1xyXG5cdFx0WydpY29ucycsJ3gnLCd5Jywnd2lkdGgnLCdoZWlnaHQnXS5mb3JFYWNoKCBvID0+IHtcclxuXHRcdFx0aWYgKCAhKCBvIGluIG9wdHMgKSApIHtcclxuXHRcdFx0XHR0aHJvdyggYGljb25CYXI6IHBhcmFtZXRlciAnJHtvfScgbm90IHNwZWNpZmllZCFgICk7XHJcblx0XHRcdH1cclxuXHRcdH0pXHJcblx0XHRjb25zdCBkZWZhdWx0cyA9IHtcclxuXHRcdFx0Ly8geCwgeVxyXG5cdFx0XHQvLyB3aWR0aCwgaGVpZ2h0XHQvLyB3Jmggb2YgaWNvbiwgdG90YWwgZGltZW5zaW9uICs9IDIqKGZyYW1lV2lkdGgrZnJhbWVQYWRkaW5nKVxyXG5cdFx0XHRzcGFjaW5nOiA1LFxyXG5cclxuXHRcdFx0ZnJhbWVDb2xvcjogJ2dyYXknLFxyXG5cdFx0XHRmcmFtZVBhZGRpbmc6IDIsXHJcblx0XHRcdGZyYW1lV2lkdGg6IDEsXHJcblx0XHRcdGZyYW1lRmlsbDogbnVsbCxcclxuXHJcblx0XHRcdGhpZ2hsaWdodENvbG9yOiAnI0ZGQTk5QScsXHJcblx0XHRcdGhpZ2hsaWdodEZyYW1lOiAnIzhjMzYyNycsXHJcblxyXG5cdFx0XHRkZWZhdWx0OiBudWxsLCAvLyBpbmRleCBvZiBpY29uXHJcblx0XHRcdGFjdGl2ZTogbnVsbCxcclxuXHJcblx0XHRcdC8vIGljb25zOiBbe1xyXG5cdFx0XHQvLyB9XVxyXG5cdFx0XHRzdGlja3k6IHRydWUsXHQvLyBpY29uIHJlbWFpbnMgYWN0aXZlIGFmdGVyIG1vdXNldXAvdG91Y2hlbmQ/XHJcblx0XHRcdC8vZGlzYWJsZWQ6IHRydWUsXHQvLyBkaXNhYmxlIHdob2xlIGJhclxyXG5cclxuXHRcdFx0dG9vbFRpcEZvbnRTaXplOiAxMCxcclxuXHRcdFx0dG9vbFRpcEZpbGw6ICd5ZWxsb3cnLFxyXG5cclxuXHRcdFx0ZGlyZWN0aW9uOiAndicsXHQvLyB2IHwgaCAodmVydGljYWwgfCBob3Jpem9udGFsIClcclxuXHJcblx0XHRcdHNoYXJlTW9kZXNXaXRoOiBudWxsLFx0XHQvLyBbXSBvciBmdW5jdGlvbiByZXR1cm5pbmcgW10gb2YgaWNvbkJhcnMgdGhhdCBzaG91bGQgYmUgZGVhY3RpdmF0ZWQgd2hlbiBpY29uIG9mIHRoaXMgaWNvbkJhciBpcyBhY3RpdmF0ZWRcclxuXHJcblx0XHRcdHVzZUV4aXN0aW5nSWNvbkJhckxheWVyOiB0cnVlLFx0Ly8gYXJlIGFsbCBpY29uQmFycyBwbGFjZWQgaW4gb25lIGxheWVyP1xyXG5cdFx0XHRtb3ZlTGF5ZXJUb1RvcDogdHJ1ZSxcclxuXHJcblx0XHRcdC8vIGluaXREb25lOiA8UHJvbWlzZT4sXHRcdC8vIHdpbGwgYmUgUHJvbWlzZSB0aGF0IGZ1bGxmaWxsZXMgd2hlbiBpbml0IGlzIGNvbXBsZXRlZFxyXG5cdFx0fVxyXG5cdFx0Y29uc3QgZGVmYXVsdEljb24gPSB7XHJcblx0XHRcdC8vIGV4dHJhU3BhY2U6IFx0Ly8gbm8gaWNvbiwgbGVhdmUgZXh0cmEgU3BhY2VcclxuXHJcblx0XHRcdC8vIGtDcmVhdGVGdW5jOiBmdW5jdGlvbiAoeCx5LGljb25CYXJPYmopXHQvLyBmdW5jdGlvbiByZXR1cm5zIEtPTlZBIE9iamVjdHxbS09OVkEgT2JqZWN0c118UHJvbWlzZXxbUHJvbWlzZXNdIG9uIGNvb3JkcyB4LCB5IE9SXHJcblx0XHRcdC8vIHNyYzogc2V0IGltYWdlLnNyYyBPUlxyXG5cdFx0XHQvLyB0ZXh0OiB0ZXh0IHRvIGRpc3BsYXkgKG9iamVjdCB3aXRoIG9wdGlvbnMgZm9yIEtvbnZhLlRleHQoe30pKVxyXG5cdFx0XHR0b29sVGlwOiBudWxsLFxyXG5cdFx0XHRjdXJzb3I6IG51bGwsXHRcdC8vIGN1cnNvciwgd2hlbiBhY3RpdmF0ZWRcclxuXHRcdFx0Y3Vyc29yT3ZlcjogbnVsbCxcdC8vIGN1cnNvciwgd2hlbiBcIm1vdXNlb3ZlclwiLCBlLmcuIFwidXJsKGljb24ucG5nKSAxNiAxNiwgYXV0b1wiXHJcblx0XHRcdHRvb2x0aXBJbWFnZTogbnVsbCxcclxuXHRcdFx0b246ICgpID0+IDEsXHJcblx0XHRcdG9mZjogKCkgPT4gMSxcclxuXHRcdH1cclxuXHRcdGNvbnN0IGRlZmF1bHRUZXh0T3B0aW9ucyA9IHtcclxuXHRcdFx0YWxpZ246ICdjZW50ZXInLFxyXG5cdFx0XHR2ZXJ0aWNhbEFsaWduOiAnbWlkZGxlJyxcclxuXHRcdFx0Zm9udFNpemU6IDIwLFxyXG5cdFx0fVxyXG5cdFx0T2JqZWN0LmFzc2lnbiggdGhpcywgZGVmYXVsdHMsIG9wdHMgKTtcclxuXHRcdHRoaXMuc3RhZ2UgPSBzdGFnZTtcclxuXHRcdC8vIHNlYXJjaCBpY29uQmFyIExheWVyIG9yZSBjcmVhdGUgbmV3XHJcblx0XHRpZiAoIHRoaXMudXNlRXhpc3RpbmdJY29uQmFyTGF5ZXIgKSB7XHJcblx0XHRcdGNvbnN0IGxheWVyID0gc3RhZ2UuZ2V0QXR0cignYndfX0ljb25CYXJMYXllcicpO1xyXG5cdFx0XHRpZiAoIGxheWVyICkge1xyXG5cdFx0XHRcdHRoaXMubGF5ZXIgPSBsYXllclxyXG5cdFx0XHR9IGVsc2Uge1xyXG5cdFx0XHRcdHRoaXMubGF5ZXIgPSBuZXcgS29udmEuTGF5ZXIoKTtcclxuXHRcdFx0XHRzdGFnZS5hZGQoIHRoaXMubGF5ZXIgKTtcclxuXHRcdFx0XHRzdGFnZS5zZXRBdHRyKCAnYndfX0ljb25CYXJMYXllcicsIHRoaXMubGF5ZXIgKTtcclxuXHRcdFx0fVxyXG5cdFx0fSBlbHNlIHtcclxuXHRcdFx0dGhpcy5sYXllciA9IG5ldyBLb252YS5MYXllcigpO1xyXG5cdFx0XHRzdGFnZS5hZGQoIHRoaXMubGF5ZXIgKTtcclxuXHRcdH1cclxuXHRcdGlmICggdGhpcy5tb3ZlTGF5ZXJUb1RvcCApIHtcclxuXHRcdFx0dGhpcy5sYXllci5tb3ZlVG9Ub3AoKTtcclxuXHRcdH1cclxuXHRcdHRoaXMua0dyb3VwID0gbmV3IEtvbnZhLkdyb3VwKCk7XHJcblx0XHR0aGlzLmxheWVyLmFkZCggdGhpcy5rR3JvdXAgKTtcclxuXHJcblx0XHQvLyBJY29uc1xyXG5cdFx0Y29uc3Qgd3AgPSB0aGlzLmZyYW1lV2lkdGggKyB0aGlzLmZyYW1lUGFkZGluZztcclxuXHRcdGxldCB4ID0gdGhpcy54LCB5ID0gdGhpcy55O1xyXG5cdFx0Y29uc3QgbG9hZFBycyA9IFtdO1xyXG5cdFx0dGhpcy5pY29ucy5mb3JFYWNoKCAoaSxucikgPT4ge1xyXG5cclxuXHRcdFx0aWYgKCBpLmV4dHJhU3BhY2UgKSB7XHJcblxyXG5cdFx0XHRcdGlmICggdGhpcy5kaXJlY3Rpb249PSd2JyApIHtcclxuXHRcdFx0XHRcdHkgKz0gaS5leHRyYVNwYWNlPT09dHJ1ZSA/IHRoaXMuaGVpZ2h0ICsgMip3cCA6IGkuZXh0cmFTcGFjZTtcclxuXHRcdFx0XHR9IGVsc2Uge1xyXG5cdFx0XHRcdFx0eCArPSBpLmV4dHJhU3BhY2U9PT10cnVlID8gdGhpcy53aWR0aCArIDIqd3A6IGkuZXh0cmFTcGFjZTtcclxuXHRcdFx0XHR9XHJcblxyXG5cdFx0XHR9IGVsc2Uge1xyXG5cdFx0XHRcdC8vIGkgaXMgYWx0ZXJlZCFcclxuXHJcblx0XHRcdFx0aSA9IE9iamVjdC5hc3NpZ24oIHt9LCBkZWZhdWx0SWNvbiwgaSApO1xyXG5cdFx0XHRcdC8vIGltYWdlLXRvb2x0aXA/XHJcblx0XHRcdFx0aWYgKCBpLnRvb2x0aXBJbWFnZSAmJiAhdGhpcy50b29sdGlwICkge1xyXG5cdFx0XHRcdFx0dGhpcy50b29sdGlwID0gbmV3IHRvb2x0aXAodGhpcy5zdGFnZSk7XHJcblx0XHRcdFx0XHR0aGlzLnN0YWdlLm9uKCAnbW91c2VsZWF2ZScsIChldikgPT4ge1xyXG5cdFx0XHRcdFx0XHRpZiAoIGlnbm9yZUV2ZW50KCB0aGlzLnN0YWdlLCBldiApICkge1xyXG5cdFx0XHRcdFx0XHRcdHJldHVybjtcclxuXHRcdFx0XHRcdFx0fVxyXG5cdFx0XHRcdFx0XHR0aGlzLnRvb2x0aXAuaGlkZSgpXHJcblx0XHRcdFx0IFx0fSlcclxuXHRcdFx0XHR9XHJcblxyXG5cdFx0XHRcdC8vIGZyYW1lXHJcblx0XHRcdFx0aWYgKCB0aGlzLmZyYW1lV2lkdGggfHwgdGhpcy5mcmFtZUZpbGwgfHwgdGhpcy5oaWdobGlnaHRDb2xvciApIHtcclxuXHRcdFx0XHRcdGkua0ZyYW1lID0gbmV3IEtvbnZhLlJlY3Qoe1xyXG5cdFx0XHRcdFx0XHR4LCB5LFxyXG5cdFx0XHRcdFx0XHR3aWR0aDogdGhpcy53aWR0aCArIDIqd3AsXHJcblx0XHRcdFx0XHRcdGhlaWdodDogdGhpcy5oZWlnaHQgKyAyKndwLFxyXG5cdFx0XHRcdFx0XHRzdHJva2U6IHRoaXMuZnJhbWVDb2xvcixcclxuXHRcdFx0XHRcdFx0c3Ryb2tlV2lkdGg6IHRoaXMuZnJhbWVXaWR0aCxcclxuXHRcdFx0XHRcdFx0ZmlsbDogdGhpcy5mcmFtZUZpbGwsXHJcblx0XHRcdFx0XHRcdGRvbnRHcmF5T3V0OiB0cnVlLFxyXG5cdFx0XHRcdFx0fSk7XHJcblx0XHRcdFx0XHR0aGlzLmtHcm91cC5hZGQoIGkua0ZyYW1lICk7XHJcblx0XHRcdFx0fVxyXG5cclxuXHRcdFx0XHQvLyBkcmF3IEtPTlZBIG9iamVjdD9cclxuXHRcdFx0XHRpZiAoIGkua0NyZWF0ZUZ1bmMgKSB7XHJcblx0XHRcdFx0XHRjb25zdCBrR3JvdXAgPSB0aGlzLmtHcm91cDtcclxuXHRcdFx0XHRcdGNvbnN0IHJlcyA9IGkua0NyZWF0ZUZ1bmMoIHggKyB3cCwgeSArIHdwLCB0aGlzICk7XHJcblx0XHRcdFx0XHRsb2FkUHJzLnB1c2goXHJcblx0XHRcdFx0XHRcdFByb21pc2VcclxuXHRcdFx0XHRcdFx0XHQuYWxsKCBBcnJheS5pc0FycmF5KHJlcykgPyByZXMgOiBbcmVzXSApXHJcblx0XHRcdFx0XHRcdFx0LnRoZW4oIGtPYmpzID0+IGtPYmpzLmZvckVhY2goIGtPYmogPT4ge1xyXG5cdFx0XHRcdFx0XHRcdFx0aWYgKCBrT2JqICkge1xyXG5cdFx0XHRcdFx0XHRcdFx0XHRrR3JvdXAuYWRkKCBrT2JqICk7XHJcblx0XHRcdFx0XHRcdFx0XHR9XHJcblx0XHRcdFx0XHRcdFx0XHRpZiAoIGkua0ljb24gKSB7XHJcblx0XHRcdFx0XHRcdFx0XHRcdGkua0ljb24ubW92ZVRvVG9wKCk7XHJcblx0XHRcdFx0XHRcdFx0XHR9XHJcblx0XHRcdFx0XHRcdH0pKVxyXG5cdFx0XHRcdFx0KVxyXG5cdFx0XHRcdH1cclxuXHJcblx0XHRcdFx0Ly8gaWNvblxyXG5cdFx0XHRcdGNvbnN0IHJlY3RBdHRyID0ge1xyXG5cdFx0XHRcdFx0d2lkdGg6IHRoaXMud2lkdGgsXHJcblx0XHRcdFx0XHRoZWlnaHQ6IHRoaXMuaGVpZ2h0LFxyXG5cdFx0XHRcdFx0eDogeCArIHdwLFxyXG5cdFx0XHRcdFx0eTogeSArIHdwLFxyXG5cdFx0XHRcdH07XHJcblxyXG5cclxuXHRcdFx0XHQvLyBpbnRlcmFjdGl2aXR5XHJcblx0XHRcdFx0Y29uc3Qgc2V0SW50ZXJhY3QgPSAoa09iaikgPT4ge1xyXG5cdFx0XHRcdFx0a09iai5vbiggJ21vdXNlZG93biB0b3VjaHN0YXJ0JywgKGV2KSA9PiB7XHJcblx0XHRcdFx0XHRcdGlmICggIXRoaXMuZGlzYWJsZWQgKSB7XHJcblx0XHRcdFx0XHRcdFx0ZXYuY2FuY2VsQnViYmxlID0gdHJ1ZTtcclxuXHRcdFx0XHRcdFx0XHRpZiAoIGV2LmV2dCApIHtcdFx0Ly8gZXYuZXZ0IG1pZ2h0IG5vdCBiZSBwcmVzZW50IChlLmcuIGR1cmluZyBkZW1vQW5pbWF0aW9uKVxyXG5cdFx0XHRcdFx0XHRcdFx0ZXYuZXZ0LnByZXZlbnREZWZhdWx0KCk7XHQvLyBlLmcuIG5vIGJsdXIgaW4gaW5wdXQgZmllbGRzXHJcblx0XHRcdFx0XHRcdFx0XHRldi5ldnQuc3RvcFByb3BhZ2F0aW9uKCk7XHJcblx0XHRcdFx0XHRcdFx0fVxyXG5cdFx0XHRcdFx0XHRcdHRoaXMuY2xpY2tPbiggbnIsIGV2ICk7XHJcblx0XHRcdFx0XHRcdH1cclxuXHRcdFx0XHRcdH0pO1xyXG5cdFx0XHRcdFx0a09iai5vbiggJ2NsaWNrIHRhcCcsIChldikgPT4ge1xyXG5cdFx0XHRcdFx0XHRpZiAoICF0aGlzLmRpc2FibGVkICkge1xyXG5cdFx0XHRcdFx0XHRcdGV2LmNhbmNlbEJ1YmJsZSA9IHRydWU7XHJcblx0XHRcdFx0XHRcdFx0aWYgKCBldi5ldnQgKSB7XHRcdC8vIGV2LmV2dCBtaWdodCBub3QgYmUgcHJlc2VudCAoZS5nLiBkdXJpbmcgZGVtb0FuaW1hdGlvbilcclxuXHRcdFx0XHRcdFx0XHRcdGV2LmV2dC5wcmV2ZW50RGVmYXVsdCgpO1x0Ly8gZS5nLiBubyBibHVyIGluIGlucHV0IGZpZWxkc1xyXG5cdFx0XHRcdFx0XHRcdFx0ZXYuZXZ0LnN0b3BQcm9wYWdhdGlvbigpO1xyXG5cdFx0XHRcdFx0XHRcdH1cclxuXHRcdFx0XHRcdFx0fVxyXG5cdFx0XHRcdFx0fSk7XHJcblx0XHRcdFx0XHRpZiAoICF0aGlzLnN0aWNreSApIHtcclxuXHRcdFx0XHRcdFx0a09iai5vbiggJ21vdXNldXAgdG91Y2hlbmQgbW91c2VsZWF2ZScsIChldikgPT4ge1xyXG5cdFx0XHRcdFx0XHRcdGlmICggaWdub3JlRXZlbnQoIHRoaXMuc3RhZ2UsIGV2ICkgKSB7XHJcblx0XHRcdFx0XHRcdFx0XHRyZXR1cm47XHJcblx0XHRcdFx0XHRcdFx0fVxyXG5cdFx0XHRcdFx0XHRcdHRoaXMuZGVhY3RpdmF0ZSggZXYgKTtcclxuXHRcdFx0XHRcdCBcdH0pO1xyXG5cdFx0XHRcdFx0fVxyXG5cdFx0XHRcdFx0aWYgKCBpLmN1cnNvck92ZXIgKSB7XHJcblx0XHRcdFx0XHRcdGtPYmoub24oICdtb3VzZWVudGVyJywgKCkgPT4ge1xyXG5cdFx0XHRcdFx0XHRcdGlmICggIXRoaXMuZGlzYWJsZWQgKSB7XHJcblx0XHRcdFx0XHRcdFx0XHR0aGlzLmN1cnNvclNhdmVkID0gZG9jdW1lbnQuYm9keS5zdHlsZS5jdXJzb3I7XHJcblx0XHRcdFx0XHRcdFx0XHRkb2N1bWVudC5ib2R5LnN0eWxlLmN1cnNvciA9IGkuY3Vyc29yT3ZlcjtcclxuXHRcdFx0XHRcdFx0XHRcdHRoaXMuY3Vyc29yU2V0ID0gZG9jdW1lbnQuYm9keS5zdHlsZS5jdXJzb3I7XHJcblx0XHRcdFx0XHRcdFx0fVxyXG5cdFx0XHRcdFx0XHR9KTtcclxuXHRcdFx0XHRcdFx0a09iai5vbiggJ21vdXNlbGVhdmUnLCAoZXYpID0+IHtcclxuXHRcdFx0XHRcdFx0XHRpZiAoICF0aGlzLmRpc2FibGVkICkge1xyXG5cdFx0XHRcdFx0XHRcdFx0aWYgKCBpZ25vcmVFdmVudCggdGhpcy5zdGFnZSwgZXYgKSApIHtcclxuXHRcdFx0XHRcdFx0XHRcdFx0cmV0dXJuO1xyXG5cdFx0XHRcdFx0XHRcdFx0fVxyXG5cdFx0XHRcdFx0XHRcdFx0aWYgKCBkb2N1bWVudC5ib2R5LnN0eWxlLmN1cnNvciA9PSB0aGlzLmN1cnNvclNldCApIHtcclxuXHRcdFx0XHRcdFx0XHRcdFx0ZG9jdW1lbnQuYm9keS5zdHlsZS5jdXJzb3IgPSB0aGlzLmN1cnNvclNhdmVkXHJcblx0XHRcdFx0XHRcdFx0XHRcdHRoaXMuY3Vyc29yU2V0ID0gbnVsbDtcclxuXHRcdFx0XHRcdFx0XHRcdH1cclxuXHRcdFx0XHRcdFx0XHR9XHJcblx0XHRcdFx0XHRcdH0pO1xyXG5cdFx0XHRcdFx0fVxyXG5cdFx0XHRcdFx0aWYgKCBpLnRvb2x0aXBJbWFnZSApIHtcclxuXHRcdFx0XHRcdFx0a09iai5vbiggJ21vdXNlZW50ZXInLCAoKSA9PiB0aGlzLnRvb2x0aXAuc2hvd0ltYWdlKCBpLnRvb2x0aXBJbWFnZSApICk7XHJcblx0XHRcdFx0XHRcdGtPYmoub24oICdtb3VzZWxlYXZlJywgKGV2KSA9PiB7XHJcblx0XHRcdFx0XHRcdFx0aWYgKCBpZ25vcmVFdmVudCggdGhpcy5zdGFnZSwgZXYgKSApIHtcclxuXHRcdFx0XHRcdFx0XHRcdHJldHVybjtcclxuXHRcdFx0XHRcdFx0XHR9XHJcblx0XHRcdFx0XHRcdFx0dGhpcy50b29sdGlwLmhpZGUoKTtcclxuXHRcdFx0XHRcdFx0fSk7XHJcblx0XHRcdFx0XHR9XHJcblx0XHRcdFx0fVxyXG5cclxuXHRcdFx0XHRpZiAoIGkuc3JjICkge1xyXG5cdFx0XHRcdFx0Ly8gY3JlYXRlIGltYWdlXHJcblx0XHRcdFx0XHRjb25zdCBtZSA9IHRoaXM7XHJcblx0XHRcdFx0XHRjb25zdCBpbWFnZSA9IG5ldyBJbWFnZSgpO1xyXG5cdFx0XHRcdFx0Y29uc3QgcHIgPSBuZXcgUHJvbWlzZSggcmVzID0+IHtcclxuXHRcdFx0XHRcdFx0aW1hZ2Uub25sb2FkID0gcmVzO1xyXG5cdFx0XHRcdFx0XHRpbWFnZS5zcmMgPSBpLnNyYztcclxuXHRcdFx0XHRcdH0pO1xyXG5cdFx0XHRcdFx0bG9hZFBycy5wdXNoKFxyXG5cdFx0XHRcdFx0XHRwci50aGVuKCAoKSA9PiB7XHJcblx0XHRcdFx0XHRcdFx0aS5rSWNvbiA9IG5ldyBLb252YS5JbWFnZSggT2JqZWN0LmFzc2lnbiggeyBpbWFnZSB9LCByZWN0QXR0ciApICk7XHJcblx0XHRcdFx0XHRcdFx0bWUuaWNvbnNbbnJdLmtJY29uID0gaS5rSWNvbjtcclxuXHJcblx0XHRcdFx0XHRcdFx0c2V0SW50ZXJhY3QoIGkua0ljb24gKTtcclxuXHRcdFx0XHRcdFx0XHRtZS5rR3JvdXAuYWRkKCBpLmtJY29uICk7XHJcblx0XHRcdFx0XHRcdH0pXHJcblx0XHRcdFx0XHQpO1xyXG5cclxuXHRcdFx0XHR9IGVsc2UgaWYgKCBpLnRleHQgKSB7XHJcblx0XHRcdFx0XHQvLyB0ZXh0IGFzIGljb24gZ2l2ZW4/XHJcblx0XHRcdFx0XHRpLmtJY29uID0gbmV3IEtvbnZhLlRleHQoIE9iamVjdC5hc3NpZ24oIHt9LCBkZWZhdWx0VGV4dE9wdGlvbnMsIGkudGV4dCwgcmVjdEF0dHIgKSk7XHJcblxyXG5cdFx0XHRcdFx0c2V0SW50ZXJhY3QoIGkua0ljb24gKTtcclxuXHRcdFx0XHRcdHRoaXMua0dyb3VwLmFkZCggaS5rSWNvbiApO1xyXG5cclxuXHRcdFx0XHR9IGVsc2Uge1xyXG5cdFx0XHRcdFx0Ly8gbm8gaW1hZ2Uuc3JjIC0+IGRyYXcgaW52aXNpYmxlIHJlY3RhbmdsZVxyXG5cdFx0XHRcdFx0Ly8gKGhpdCBhcmVhIGUuZy4gZm9yIGljb24gY3JlYXRlZCBieSBrQ3JlYXRlRnVuYygpKVxyXG5cdFx0XHRcdFx0aS5rSWNvbiA9IG5ldyBLb252YS5SZWN0KCBPYmplY3QuYXNzaWduKCB7fSwgcmVjdEF0dHIsIHtcclxuXHRcdFx0XHRcdFx0ZmlsbDogJ3doaXRlJyxcclxuXHRcdFx0XHRcdFx0b3BhY2l0eTogMCxcclxuXHRcdFx0XHRcdFx0ZG9udEdyYXlPdXQ6IHRydWUsXHJcblx0XHRcdFx0XHR9ICkpO1xyXG5cclxuXHRcdFx0XHRcdHNldEludGVyYWN0KCBpLmtJY29uICk7XHJcblx0XHRcdFx0XHR0aGlzLmtHcm91cC5hZGQoIGkua0ljb24gKTtcclxuXHRcdFx0XHR9XHJcblxyXG5cdFx0XHRcdC8vIGdldCBwb3NpdGlvbiBmb3IgbmV4dCBpY29uXHJcblx0XHRcdFx0Ly8gY29uc3Qgb2ZmcyA9IG5yKiggdGhpcy5zcGFjaW5nICsgdGhpcy5oZWlnaHQrMip3cCApO1xyXG5cdFx0XHRcdGlmICggdGhpcy5kaXJlY3Rpb249PSd2JyApIHtcclxuXHRcdFx0XHRcdHkgKz0gdGhpcy5zcGFjaW5nICsgdGhpcy5oZWlnaHQgKyAyKndwO1xyXG5cdFx0XHRcdH0gZWxzZSB7XHJcblx0XHRcdFx0XHR4ICs9IHRoaXMuc3BhY2luZyArIHRoaXMud2lkdGggKyAyKndwO1xyXG5cdFx0XHRcdH1cclxuXHJcblx0XHRcdFx0dGhpcy5pY29uc1tucl0gPSBpO1xyXG5cdFx0XHR9XHJcblx0XHR9KVxyXG5cclxuXHRcdGNvbnN0IG1lID0gdGhpcztcclxuXHRcdHRoaXMuaW5pdERvbmUgPSBQcm9taXNlLmFsbCggbG9hZFBycyApXHJcblx0XHRcdC50aGVuKCAoKSA9PiB7XHJcblx0XHRcdFx0bWUuc2V0RGVmYXVsdCgpO1xyXG5cdFx0XHRcdG1lLmxheWVyLmRyYXcoKTtcclxuXHRcdFx0fSk7XHJcblx0fVxyXG5cclxuXHQvLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vL1xyXG5cclxuXHRnZXRPdmVyYWxsSGVpZ2h0ICgpIHtcclxuXHRcdHJldHVybiB0aGlzLmRpcmVjdGlvbj09J3YnID9cclxuXHRcdFx0dGhpcy5pY29ucy5sZW5ndGggKiAoIHRoaXMuc3BhY2luZyArIHRoaXMuaGVpZ2h0ICsgMiooIHRoaXMuZnJhbWVXaWR0aCArIHRoaXMuZnJhbWVQYWRkaW5nICkgKSAtIHRoaXMuc3BhY2luZyA6XHJcblx0XHRcdHRoaXMuaGVpZ2h0ICsgMiooIHRoaXMuZnJhbWVXaWR0aCArIHRoaXMuZnJhbWVQYWRkaW5nICk7XHJcblx0fVxyXG5cclxuXHRnZXRPdmVyYWxsV2lkdGggKCkge1xyXG5cdFx0cmV0dXJuIHRoaXMuZGlyZWN0aW9uPT0ndicgP1xyXG5cdFx0XHR0aGlzLndpZHRoICsgMiooIHRoaXMuZnJhbWVXaWR0aCArIHRoaXMuZnJhbWVQYWRkaW5nICkgOlxyXG5cdFx0XHR0aGlzLmljb25zLmxlbmd0aCAqICggdGhpcy5zcGFjaW5nICsgdGhpcy53aWR0aCArIDIqKCB0aGlzLmZyYW1lV2lkdGggKyB0aGlzLmZyYW1lUGFkZGluZyApICkgLSB0aGlzLnNwYWNpbmc7XHJcblx0fVxyXG5cclxuXHQvLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vL1xyXG5cclxuXHRzZXREZWZhdWx0ICgpIHtcclxuXHRcdGlmICggIXRoaXMuZGlzYWJsZWQgJiYgdGhpcy5kZWZhdWx0IT09bnVsbCAmJiB0aGlzLnN0aWNreSApIHtcclxuXHRcdFx0dGhpcy5jbGlja09uKCB0aGlzLmRlZmF1bHQgKTtcclxuXHRcdH1cclxuXHR9XHJcblxyXG5cdGNsaWNrT24gKCBpbmRleCwgZXYgKSB7XHJcblx0XHRjb25zdCBzYXZlZF9hY3RpdmUgPSB0aGlzLmFjdGl2ZTtcclxuXHRcdHRoaXMuZGVhY3RpdmF0ZSgpO1xyXG5cdFx0aWYgKCB0aGlzLnNoYXJlTW9kZXNXaXRoICkge1xyXG5cdFx0XHRjb25zdCBhciA9IHR5cGVvZiB0aGlzLnNoYXJlTW9kZXNXaXRoID09PSAnZnVuY3Rpb24nID8gdGhpcy5zaGFyZU1vZGVzV2l0aCgpIDogdGhpcy5zaGFyZU1vZGVzV2l0aDtcclxuXHRcdFx0YXIuZm9yRWFjaCggaWNvbkJhciA9PiB7XHJcblx0XHRcdFx0aWYgKCBpY29uQmFyICYmIGljb25CYXIhPXRoaXMgKSB7XHJcblx0XHRcdFx0XHRpY29uQmFyLmRlYWN0aXZhdGUoKTtcclxuXHRcdFx0XHR9XHJcblx0XHRcdH0pXHJcblx0XHR9XHJcblx0XHRpZiAoIHNhdmVkX2FjdGl2ZT09PW51bGwgfHwgc2F2ZWRfYWN0aXZlIT1pbmRleCApIHtcclxuXHRcdFx0dGhpcy5hY3RpdmF0ZSggaW5kZXgsIGV2ICk7XHJcblx0XHR9XHJcblx0fVxyXG5cclxuXHRkZWFjdGl2YXRlICgpIHtcclxuXHRcdGlmICggdGhpcy5hY3RpdmUhPT1udWxsICkge1xyXG5cdFx0XHRjb25zdCBpY29uID0gdGhpcy5pY29uc1sgdGhpcy5hY3RpdmUgXTtcclxuXHRcdFx0aWYgKCBpY29uLmtGcmFtZSApIHtcclxuXHRcdFx0XHRpY29uLmtGcmFtZS5maWxsKCB0aGlzLmZyYW1lRmlsbCApO1xyXG5cdFx0XHRcdGljb24ua0ZyYW1lLnN0cm9rZSggdGhpcy5mcmFtZUNvbG9yICk7XHJcblx0XHRcdH1cclxuXHRcdFx0dGhpcy5sYXllci5iYXRjaERyYXcoKTtcclxuXHJcblx0XHRcdGlmICggaWNvbi5vZmYgKSB7XHJcblx0XHRcdFx0aWNvbi5vZmYoKTtcclxuXHRcdFx0fVxyXG5cclxuXHRcdFx0aWYgKCBpY29uLmN1cnNvciApIHtcclxuXHRcdFx0XHRkb2N1bWVudC5ib2R5LnN0eWxlLmN1cnNvciA9IFwiZGVmYXVsdFwiO1xyXG5cdFx0XHR9XHJcblx0XHRcdHRoaXMuYWN0aXZlID0gbnVsbDtcclxuXHRcdH1cclxuXHR9XHJcblxyXG5cdGFjdGl2YXRlICggaW5kZXgsIGV2ICkge1xyXG5cdFx0Y29uc3QgaWNvbiA9IHRoaXMuaWNvbnNbaW5kZXhdO1xyXG5cdFx0aWYgKCBpY29uLmtGcmFtZSApIHtcclxuXHRcdFx0aWNvbi5rRnJhbWUuZmlsbCggdGhpcy5oaWdobGlnaHRDb2xvciApO1xyXG5cdFx0XHRpY29uLmtGcmFtZS5zdHJva2UoIHRoaXMuaGlnaGxpZ2h0RnJhbWUgKTtcclxuXHRcdH1cclxuXHRcdHRoaXMubGF5ZXIuYmF0Y2hEcmF3KCk7XHJcblxyXG5cdFx0dGhpcy5hY3RpdmUgPSBpbmRleDtcclxuXHRcdGlmICggaWNvbi5vbiApIHtcclxuXHRcdFx0aWNvbi5vbihldik7XHJcblx0XHR9XHJcblxyXG5cdFx0aWYgKCBpY29uLmN1cnNvciApIHtcclxuXHRcdFx0ZG9jdW1lbnQuYm9keS5zdHlsZS5jdXJzb3IgPSBpY29uLmN1cnNvcjtcclxuXHRcdH1cclxuXHR9XHJcblxyXG5cdGlzQWN0aXZlICggaW5kZXggKSB7XHJcblx0XHRyZXR1cm4gdGhpcy5hY3RpdmUgPT09IGluZGV4O1xyXG5cdH1cclxuXHJcblx0Ly8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy9cclxuXHJcblx0ZGlzYWJsZUJhciAoIGRpc2FibGVkPXRydWUgKSB7XHJcblx0XHR0aGlzLmRpc2FibGVkID0gZGlzYWJsZWQ7XHJcblx0XHRpZiAoIGRpc2FibGVkICkge1xyXG5cdFx0XHR0aGlzLmRlYWN0aXZhdGUoKTtcclxuXHRcdH1cclxuXHR9XHJcblxyXG5cdGhpZGVCYXIgKCBoaWRkZW49dHJ1ZSApIHtcclxuXHRcdHRoaXMuZGlzYWJsZUJhciggaGlkZGVuICk7XHJcblx0XHR0aGlzLmtHcm91cC52aXNpYmxlKCAhaGlkZGVuICk7XHJcblx0XHR0aGlzLmxheWVyLmJhdGNoRHJhdygpO1xyXG5cdH1cclxuXHJcblx0ZGVzdHJveSAoKSB7XHJcblx0XHR0aGlzLmtHcm91cC5kZXN0cm95KCk7XHJcblx0XHRpZiAoICF0aGlzLnVzZUV4aXN0aW5nSWNvbkJhckxheWVyICkge1xyXG5cdFx0XHR0aGlzLmxheWVyLmRlc3Ryb3koKTtcclxuXHRcdH1cclxuXHR9XHJcbn1cclxuIiwiaW1wb3J0IHsgbWVyZ2VEZWVwIH0gZnJvbSAnLi9jb21tb24nXHJcblxyXG5pbXBvcnQgeyBhZGRGcmVlUGFpbnRUbyB9IGZyb20gJy4vY2xhc3NfZXh0ZW5zaW9ucydcclxuXHJcbmltcG9ydCBLb252YSBmcm9tICdrb252YS9saWIvQ29yZSdcclxuaW1wb3J0IHsgUmVjdCB9IGZyb20gJ2tvbnZhL2xpYi9zaGFwZXMvUmVjdCdcclxuXHJcbmV4cG9ydCBjbGFzcyByZWN0QXJlYSB7XHJcblxyXG5cdGNvbnN0cnVjdG9yICggYmFzZSwgb3B0cyA9IHt9ICkge1xyXG5cclxuXHRcdFsneCcsJ3knLCd3aWR0aCcsJ2hlaWdodCddLmZvckVhY2goIG8gPT4ge1xyXG5cdFx0XHRpZiAoICEoIG8gaW4gb3B0cyApICkge1xyXG5cdFx0XHRcdHRocm93KCBgYXJlYTogcGFyYW1ldGVyICcke299JyBub3Qgc3BlY2lmaWVkIWAgKTtcclxuXHRcdFx0fVxyXG5cdFx0fSlcclxuXHRcdC8vIERlZmF1bHRzIHRvIG9wdHNcclxuXHRcdGNvbnN0IGRlZmF1bHRPcHRzID0ge1xyXG5cclxuXHRcdFx0Ly8gLy8gcGFpbnRBcmVhXHJcblx0XHRcdC8vIHgsIHlcclxuXHRcdFx0Ly8gd2lkdGgsIGhlaWdodFxyXG5cdFx0XHRmcmFtZVdpZHRoOiAxLFxyXG5cdFx0XHRmcmFtZUNvbG9yOiAnYmxhY2snLFxyXG5cclxuXHRcdH1cclxuXHRcdG1lcmdlRGVlcCggT2JqZWN0LmFzc2lnbiggdGhpcywgZGVmYXVsdE9wdHMgKSwgb3B0cyApO1xyXG5cdFx0dGhpcy5iYXNlID0gYmFzZTtcclxuXHRcdGNvbnN0IHN0YWdlID0gYmFzZS5zdGFnZTtcclxuXHRcdHRoaXMuc3RhZ2UgPSBzdGFnZTtcclxuXHJcblx0XHQvLyBJbml0IHBhaW50QXJlYVxyXG5cdFx0aWYgKCB0aGlzLmZyYW1lQ29sb3IgJiYgdGhpcy5mcmFtZVdpZHRoICkge1xyXG5cdFx0XHR0aGlzLmxheWVyID0gbmV3IEtvbnZhLkxheWVyKCk7XHJcblx0XHRcdHN0YWdlLmFkZCggdGhpcy5sYXllciApO1xyXG5cclxuXHRcdFx0dGhpcy5rUmVjdCA9IG5ldyBLb252YS5SZWN0KHtcclxuXHRcdFx0XHR4OiB0aGlzLngsIHk6IHRoaXMueSxcclxuXHRcdFx0XHR3aWR0aDogdGhpcy53aWR0aCwgaGVpZ2h0OiB0aGlzLmhlaWdodCxcclxuXHRcdFx0XHRzdHJva2U6IHRoaXMuZnJhbWVDb2xvcixcclxuXHRcdFx0XHRzdHJva2VXaWR0aDogdGhpcy5mcmFtZVdpZHRoLFxyXG5cdFx0XHR9KTtcclxuXHRcdFx0dGhpcy5sYXllci5hZGQoIHRoaXMua1JlY3QgKTtcclxuXHJcblx0XHRcdHRoaXMubGF5ZXIuZHJhdygpO1xyXG5cdFx0fVxyXG5cdH1cclxuXHJcblx0Ly8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy9cclxuXHJcblx0Ly8gY2xpcCB0byByZWN0YW5nbGUgYnkgZGVmYXVsdFxyXG5cdGZyZWVQYWludE1hcmtlckNsaXBGdW5jIChjdHgpIHtcclxuXHRcdGN0eC5yZWN0KCB0aGlzLngrdGhpcy5mcmFtZVdpZHRoKjAuNSwgdGhpcy55K3RoaXMuZnJhbWVXaWR0aCowLjUsIHRoaXMud2lkdGgtdGhpcy5mcmFtZVdpZHRoLCB0aGlzLmhlaWdodC10aGlzLmZyYW1lV2lkdGggKTtcclxuXHR9XHJcblxyXG5cdC8vIGNsaXAgdG8gcmVjdGFuZ2xlIGJ5IGRlZmF1bHRcclxuXHRmcmVlUGFpbnRCcnVzaENsaXBGdW5jIChjdHgpIHtcclxuXHRcdGN0eC5yZWN0KCB0aGlzLngrdGhpcy5mcmFtZVdpZHRoKjAuNSwgdGhpcy55K3RoaXMuZnJhbWVXaWR0aCowLjUsIHRoaXMud2lkdGgtdGhpcy5mcmFtZVdpZHRoLCB0aGlzLmhlaWdodC10aGlzLmZyYW1lV2lkdGggKTtcclxuXHR9XHJcblxyXG5cdC8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vXHJcblxyXG5cdGdldFN0YXRlICgpIHtcclxuXHRcdHJldHVybiAne30nO1xyXG5cdH1cclxuXHJcblx0c2V0U3RhdGUgKCkge1xyXG5cdH1cclxuXHJcblx0Ly8gQ2hlY2sgaWYgVXNlciBtYWRlIGNoYW5nZXNcclxuXHRnZXREZWZhdWx0Q2hhbmdlU3RhdGUgKCkge1xyXG5cdFx0cmV0dXJuIGZhbHNlO1xyXG5cdH1cclxuXHJcblx0Z2V0Q2hTdGF0ZSAoKSB7XHJcblx0XHRyZXR1cm4ge307XHJcblx0fVxyXG5cclxufVxyXG5cclxuLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vXHJcblxyXG5leHBvcnQgY29uc3QgcmVjdEFyZWFfZnJlZVBhaW50ID0gYWRkRnJlZVBhaW50VG8oIHJlY3RBcmVhLCAxLCAwICk7XHJcblxyXG5leHBvcnQgY29uc3QgcmVjdEFyZWFfZnJlZVBhaW50TWFya2VyID0gYWRkRnJlZVBhaW50VG8oIHJlY3RBcmVhLCAxLCAxICk7XHJcbiIsImltcG9ydCB7IGdldEFic1Bvc2l0aW9uLCBpZ25vcmVFdmVudCB9IGZyb20gJy4vY29tbW9uJ1xyXG5cclxuaW1wb3J0IEtvbnZhIGZyb20gJ2tvbnZhL2xpYi9Db3JlJ1xyXG5pbXBvcnQgeyBSZWN0IH0gZnJvbSAna29udmEvbGliL3NoYXBlcy9SZWN0J1xyXG5pbXBvcnQgeyBUZXh0IH0gZnJvbSAna29udmEvbGliL3NoYXBlcy9UZXh0J1xyXG5cclxuZXhwb3J0IGNsYXNzIHRleHRGcmFtZSB7XHJcblxyXG5cdGNvbnN0cnVjdG9yKCBiYXNlLCBsYXllciwgb3B0cyA9IHt9ICkge1xyXG5cclxuXHRcdC8vIE9wdGlvbnMgYW5kIGRlZmF1bHRzXHJcblx0XHRbJ3ZhbHVlJywneCcsJ3knXS5mb3JFYWNoKCBvID0+IHtcclxuXHRcdFx0aWYgKCAhKCBvIGluIG9wdHMgKSApIHtcclxuXHRcdFx0XHR0aHJvdyggYHRleHRGcmFtZTogcGFyYW1ldGVyICcke299JyBub3Qgc3BlY2lmaWVkIWAgKTtcclxuXHRcdFx0fVxyXG5cdFx0fSlcclxuXHRcdGNvbnN0IGRlZmF1bHRPcHRzID0ge1xyXG5cdFx0XHR3aWR0aDogNzUsIGhlaWdodDogMjUsXHJcblx0XHRcdGFsaWduOiAnY2VudGVyJyxcclxuXHRcdFx0Zm9udFNpemU6IDIwLFxyXG5cdFx0XHRiYWNrZ3JvdW5kUmVhZG9ubHk6IG51bGwsXHJcblx0XHRcdGJhY2tncm91bmRFZGl0YWJsZTogJ2xpZ2h0eWVsbG93JyxcclxuXHRcdFx0YmFja2dyb3VuZEVkaXQ6ICd5ZWxsb3cnLFxyXG5cdFx0XHRmcmFtZVdpZHRoOiAxLFxyXG5cdFx0XHRmcmFtZUNvbG9yOiAnYmxhY2snLFxyXG5cdFx0XHRjb3JuZXJSYWRpdXM6IDAsXHJcblx0XHRcdGlucHV0UmVnZXhwOiBudWxsLFxyXG5cdFx0XHR0aG91c2FuZHNTZXA6ICcgJyxcclxuXHRcdFx0cmVhZG9ubHk6IDAsXHJcblx0XHRcdG9uQ2hhbmdlOiBudWxsLFxyXG5cdFx0XHRtb3ZlYWJsZTogZmFsc2UsXHJcblx0XHRcdHJvdGF0aW9uOiAwLFxyXG5cdFx0fVxyXG5cdFx0T2JqZWN0LmFzc2lnbiggdGhpcywgZGVmYXVsdE9wdHMsIG9wdHMgKTtcclxuXHRcdGlmICggdHlwZW9mIHRoaXMudmFsdWUgIT09ICdzdHJpbmcnKSB7XHJcblx0XHRcdHRoaXMudmFsdWUgPSB0aGlzLnZhbHVlLnRvU3RyaW5nKCk7XHJcblx0XHR9XHJcblx0XHR0aGlzLmxheWVyID0gbGF5ZXI7XHJcblx0XHR0aGlzLmJhc2UgPSBiYXNlO1xyXG5cdFx0Y29uc3Qgc3RhZ2UgPSBiYXNlLnN0YWdlO1xyXG5cdFx0dGhpcy5zdGFnZSA9IHN0YWdlO1xyXG5cclxuXHRcdC8vIEdyb3VwIChmcmFtZSAmIHRleHQpXHJcblx0XHRjb25zdCBrR3JvdXAgPSBuZXcgS29udmEuR3JvdXAoIHRoaXMubW92ZWFibGUgPyB7IGRyYWdnYWJsZTogdHJ1ZSB9IDoge30gKTtcclxuXHRcdHRoaXMua0dyb3VwID0ga0dyb3VwO1xyXG5cdFx0dGhpcy5sYXllci5hZGQoIHRoaXMua0dyb3VwICk7XHJcblxyXG5cdFx0Ly8gRnJhbWVcclxuXHRcdGNvbnN0IGtGcmFtZSA9IG5ldyBLb252YS5SZWN0KHtcclxuXHRcdFx0eDogdGhpcy54LFxyXG5cdFx0XHR5OiB0aGlzLnksXHJcblx0XHRcdHdpZHRoOiB0aGlzLndpZHRoLFxyXG5cdFx0XHRoZWlnaHQ6IHRoaXMuaGVpZ2h0LFxyXG5cdFx0XHRmaWxsOiB0aGlzLnJlYWRvbmx5ID8gdGhpcy5iYWNrZ3JvdW5kUmVhZG9ubHkgOiB0aGlzLmJhY2tncm91bmRFZGl0YWJsZSxcclxuXHRcdFx0c3Ryb2tlOiB0aGlzLmZyYW1lQ29sb3IsXHJcblx0XHRcdHN0cm9rZVdpZHRoOiB0aGlzLmZyYW1lV2lkdGgsXHJcblx0XHRcdGNvcm5lclJhZGl1czogdGhpcy5jb3JuZXJSYWRpdXMsXHJcblx0XHRcdHJvdGF0aW9uOiB0aGlzLnJvdGF0aW9uLFxyXG5cdFx0fSlcclxuXHRcdHRoaXMua0ZyYW1lID0ga0ZyYW1lO1xyXG5cdFx0dGhpcy5rR3JvdXAuYWRkKCBrRnJhbWUgKTtcclxuXHJcblx0XHQvLyBUZXh0XHJcblx0XHRjb25zdCB3UmVkID0gdGhpcy5mcmFtZVdpZHRoID8gdGhpcy5mcmFtZVdpZHRoKzEgOiAwO1xyXG5cdFx0Y29uc3Qga1RleHQgPSBuZXcgS29udmEuVGV4dCh7XHJcblx0XHRcdHRleHQ6IHRoaXMuaW5zZXJ0VGhvdXNhbmRzU2VwKCB0aGlzLnZhbHVlICksXHJcblx0XHRcdHg6IHRoaXMueCArIHdSZWQsXHJcblx0XHRcdHk6IHRoaXMueSxcclxuXHRcdFx0d2lkdGg6IHRoaXMud2lkdGggLSB3UmVkKjIsXHJcblx0XHRcdGhlaWdodDogdGhpcy5oZWlnaHQsXHJcblx0XHRcdGFsaWduOiB0aGlzLmFsaWduLFxyXG5cdFx0XHR2ZXJ0aWNhbEFsaWduOiAnbWlkZGxlJyxcclxuXHRcdFx0Zm9udFNpemU6IHRoaXMuZm9udFNpemUsXHJcblx0XHRcdHJvdGF0aW9uOiB0aGlzLnJvdGF0aW9uLFxyXG5cdFx0fSlcclxuXHRcdHRoaXMua1RleHQgPSBrVGV4dDtcclxuXHRcdHRoaXMua0dyb3VwLmFkZCgga1RleHQgKTtcclxuXHJcblx0XHQvLyBlZGl0XHJcblx0XHRpZiAoICF0aGlzLnJlYWRvbmx5ICkge1xyXG5cclxuXHRcdFx0Ly8ga1RleHQub24oICdtb3VzZWVudGVyJywgZnVuY3Rpb24gKCkge1xyXG5cdFx0XHQvLyBcdGtGcmFtZS5maWxsKCB0aGlzLmJhY2tncm91bmRFZGl0ICk7XHJcblx0XHRcdC8vIFx0bGF5ZXIuYmF0Y2hEcmF3KCk7XHJcblx0XHRcdC8vIFx0ZG9jdW1lbnQuYm9keS5zdHlsZS5jdXJzb3IgPSBcInRleHRcIjtcclxuXHRcdFx0Ly8gfS5iaW5kKHRoaXMpICk7XHJcblxyXG5cdFx0XHQvLyBrVGV4dC5vbiggJ21vdXNlbGVhdmUnLCBmdW5jdGlvbiAoKSB7XHJcblx0XHRcdC8vIFx0a0ZyYW1lLmZpbGwoIG51bGwgKTtcclxuXHRcdFx0Ly8gXHRsYXllci5iYXRjaERyYXcoKTtcclxuXHRcdFx0Ly8gXHRkb2N1bWVudC5ib2R5LnN0eWxlLmN1cnNvciA9IFwiZGVmYXVsdFwiO1xyXG5cdFx0XHQvLyB9KVxyXG5cclxuXHRcdFx0a1RleHQub24oICdjbGljayB0YXAnLCBmdW5jdGlvbiAoZXYpIHtcclxuXHJcblx0XHRcdFx0ZXYuY2FuY2VsQnViYmxlID0gdHJ1ZTtcclxuXHJcblx0XHRcdFx0Ly8gc3RhcnQgaW5wdXQgZmllbGRcclxuXHRcdFx0XHRsZXQgc3RhZ2VCb3ggPSBnZXRBYnNQb3NpdGlvbiggc3RhZ2UuY29udGFpbmVyKCkgKTtcclxuXHRcdFx0XHRsZXQgaW5wdXRFbGVtZW50ID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCggJ2lucHV0JyApO1xyXG5cdFx0XHRcdGRvY3VtZW50LmJvZHkuYXBwZW5kQ2hpbGQoaW5wdXRFbGVtZW50KTtcclxuXHRcdFx0XHRpbnB1dEVsZW1lbnQudmFsdWUgPSB0aGlzLnZhbHVlO1xyXG5cdFx0XHRcdGlucHV0RWxlbWVudC5vbGRWYWx1ZSA9IHRoaXMudmFsdWU7XHJcblx0XHRcdFx0aW5wdXRFbGVtZW50Lm9sZFNlbGVjdGlvblN0YXJ0ID0gdGhpcy52YWx1ZS5sZW5ndGg7XHJcblx0XHRcdFx0aW5wdXRFbGVtZW50Lm9sZFNlbGVjdGlvbkVuZCA9IHRoaXMudmFsdWUubGVuZ3RoO1xyXG5cclxuXHRcdFx0XHRpbnB1dEVsZW1lbnQuc3R5bGUucG9zaXRpb24gPSAnYWJzb2x1dGUnO1xyXG5cdFx0XHRcdFx0XHRcdFx0XHRcdFx0XHQvLyAhISEhISBIaWVyIG11c3Mgbm9jaCBzY3JvbGxQb3MgdmVycmVjaG5ldCB3ZXJkZW5cclxuXHRcdFx0XHRjb25zdCBpbnBBZGRPZmYgPSB0aGlzLmdldEFkZE9mZigpO1xyXG5cdFx0XHRcdGlucHV0RWxlbWVudC5zdHlsZS5sZWZ0ID0gKDArIHN0YWdlQm94LmxlZnQgKyBrRnJhbWUueCgpICsga0dyb3VwLngoKSArIGlucEFkZE9mZi54ICkgKydweCc7XHJcblx0XHRcdFx0aW5wdXRFbGVtZW50LnN0eWxlLnRvcCA9ICgwKyBzdGFnZUJveC50b3AgKyBrRnJhbWUueSgpICsga0dyb3VwLnkoKSArIGlucEFkZE9mZi55ICkrJ3B4JztcclxuXHRcdFx0XHRpbnB1dEVsZW1lbnQuc3R5bGUud2lkdGggPSAoMSt0aGlzLndpZHRoKSsncHgnO1xyXG5cdFx0XHRcdGlucHV0RWxlbWVudC5zdHlsZS5oZWlnaHQgPSAoMSt0aGlzLmhlaWdodCkrJ3B4JztcclxuXHRcdFx0XHRpbnB1dEVsZW1lbnQuc3R5bGUuYmFja2dyb3VuZCA9IHRoaXMuYmFja2dyb3VuZEVkaXQ7XHJcblx0XHRcdFx0aW5wdXRFbGVtZW50LnN0eWxlLmJvcmRlciA9ICcxcHggc29saWQgYmxhY2snO1xyXG5cdFx0XHRcdGlucHV0RWxlbWVudC5zdHlsZVsnYm94LXNpemluZyddID0gJ2JvcmRlci1ib3gnO1xyXG5cdFx0XHRcdGlucHV0RWxlbWVudC5mb2N1cyggeyBwcmV2ZW50U2Nyb2xsOiB0cnVlIH0gKTtcdC8vIGltcG9ydGFudCBmb3IgZGVtb0FuaVxyXG5cdFx0XHRcdHRoaXMuaW5wdXRFbGVtZW50ID0gaW5wdXRFbGVtZW50O1xyXG5cclxuXHRcdFx0XHQvLyBoaWRlIGZyYW1lK3RleHRcclxuXHRcdFx0XHRrVGV4dC52aXNpYmxlKCBmYWxzZSApO1xyXG5cdFx0XHRcdGtGcmFtZS52aXNpYmxlKCBmYWxzZSApO1xyXG5cdFx0XHRcdGxheWVyLmRyYXcoKTtcclxuXHJcblx0XHRcdFx0Ly8gZW5kIGlucHV0IGZpZWxkXHJcblx0XHRcdFx0Y29uc3QgcmVtb3ZlSW5wdXQgPSAoY29weT0wKSA9PiB7XHJcblx0XHRcdFx0XHRpZiAoIHRoaXMuaW5wdXRFbGVtZW50ICkge1xyXG5cdFx0XHRcdFx0XHR0aGlzLnN0YWdlLm9mZiggJy5pbnB1dCcgKTtcclxuXHRcdFx0XHRcdFx0aWYgKCBjb3B5ICkge1xyXG5cdFx0XHRcdFx0XHRcdHRoaXMuc2V0VmFsKCBpbnB1dEVsZW1lbnQudmFsdWUgKTtcclxuXHRcdFx0XHRcdFx0XHRpZiAoIHR5cGVvZiB0aGlzLm9uQ2hhbmdlID09PSAnZnVuY3Rpb24nICkge1xyXG5cdFx0XHRcdFx0XHRcdFx0dGhpcy5vbkNoYW5nZSggdGhpcy52YWx1ZSApO1xyXG5cdFx0XHRcdFx0XHRcdH1cclxuXHRcdFx0XHRcdFx0fVxyXG5cdFx0XHRcdFx0XHR0aGlzLmlucHV0RWxlbWVudCA9IG51bGw7XHJcblx0XHRcdFx0XHRcdGRvY3VtZW50LmJvZHkucmVtb3ZlQ2hpbGQoIGlucHV0RWxlbWVudCApO1x0Ly8gY2F1c2VzIGJsdXIgb24gY2hyb21lP1xyXG5cdFx0XHRcdFx0XHRrVGV4dC52aXNpYmxlKCB0cnVlICk7XHJcblx0XHRcdFx0XHRcdGtGcmFtZS52aXNpYmxlKCB0cnVlICk7XHJcblx0XHRcdFx0XHRcdGxheWVyLmRyYXcoKTtcclxuXHRcdFx0XHRcdH1cclxuXHRcdFx0XHR9XHJcblxyXG5cdFx0XHRcdGlmICggdGhpcy5pbnB1dFJlZ2V4cCApIHtcclxuXHRcdFx0XHRcdGNvbnN0IHJlID0gbmV3IFJlZ0V4cCggdGhpcy5pbnB1dFJlZ2V4cCApO1xyXG5cdFx0XHRcdFx0ZnVuY3Rpb24gaGFuZGxlciAoZSkge1xyXG5cdFx0XHRcdFx0XHRjb25zdCBlbCA9IGUudGFyZ2V0O1xyXG5cdFx0XHRcdFx0XHRpZiAoICFlbC52YWx1ZS5tYXRjaCggcmUgKSApIHtcclxuXHRcdFx0XHRcdFx0XHRpZiggZWwuaGFzT3duUHJvcGVydHkoJ29sZFZhbHVlJykgKSB7XHJcblx0XHRcdFx0XHRcdFx0XHRlbC52YWx1ZSA9IGVsLm9sZFZhbHVlO1xyXG5cdFx0XHRcdFx0XHRcdFx0ZWwuc2V0U2VsZWN0aW9uUmFuZ2UoZWwub2xkU2VsZWN0aW9uU3RhcnQsIGVsLm9sZFNlbGVjdGlvbkVuZCk7XHJcblx0XHRcdFx0XHRcdFx0fSBlbHNlIHtcclxuXHRcdFx0XHRcdFx0XHRcdGVsLnZhbHVlID0gJyc7XHJcblx0XHRcdFx0XHRcdFx0fVxyXG5cdFx0XHRcdFx0XHRcdHRoaXMubG9nS2V5KCAnaW5wdXRSZXZlcnQnLCBlbC5vbGRTZWxlY3Rpb25TdGFydCwgZSwgeyB0b1RleHQ6IGVsLnZhbHVlIH0gKTtcclxuXHRcdFx0XHRcdFx0XHR0aGlzLmJhc2UudHJpZ2dlcklucHV0VmFsaWRhdGlvbkV2ZW50KCk7XHJcblx0XHRcdFx0XHRcdH0gZWxzZSB7XHJcblx0XHRcdFx0XHRcdFx0ZWwub2xkVmFsdWUgPSBlbC52YWx1ZTtcclxuXHRcdFx0XHRcdFx0XHRlbC5vbGRTZWxlY3Rpb25TdGFydCA9IGVsLnNlbGVjdGlvblN0YXJ0O1xyXG5cdFx0XHRcdFx0XHRcdGVsLm9sZFNlbGVjdGlvbkVuZCA9IGVsLnNlbGVjdGlvbkVuZDtcclxuXHRcdFx0XHRcdFx0fVxyXG5cdFx0XHRcdFx0fVxyXG5cdFx0XHRcdFx0WyAnaW5wdXQnLCAnbW91c2V1cCcsICd0b3VjaGVuZCcsICdrZXl1cCcgXS5mb3JFYWNoKCBldiA9PiBpbnB1dEVsZW1lbnQuYWRkRXZlbnRMaXN0ZW5lciggZXYsIGhhbmRsZXIuYmluZCh0aGlzKSApICk7XHJcblx0XHRcdFx0fVxyXG5cclxuXHRcdFx0XHRpbnB1dEVsZW1lbnQuYWRkRXZlbnRMaXN0ZW5lciggJ2tleWRvd24nLCBmdW5jdGlvbiAoZSkge1xyXG5cclxuXHRcdFx0XHRcdHRoaXMubG9nS2V5KCAna2V5RG93bicsIGUudGFyZ2V0LnNlbGVjdGlvblN0YXJ0LCBlICk7XHJcblxyXG5cdFx0XHRcdFx0aWYgKCBlLndoaWNoPT0xMyB8fCBlLmtleUNvZGU9PTEzICkge1xyXG5cdFx0XHRcdFx0XHRyZW1vdmVJbnB1dCh0cnVlKTtcclxuXHRcdFx0XHRcdH1cclxuXHRcdFx0XHRcdGlmICggZS53aGljaD09MjcgfHwgZS5rZXlDb2RlPT0yNyApIHtcclxuXHRcdFx0XHRcdFx0cmVtb3ZlSW5wdXQoZmFsc2UpO1xyXG5cdFx0XHRcdFx0fVxyXG5cdFx0XHRcdH0uYmluZCh0aGlzKSApXHJcblx0XHRcdFx0aW5wdXRFbGVtZW50LmFkZEV2ZW50TGlzdGVuZXIoICdibHVyJywgZnVuY3Rpb24oKSB7XHJcbi8vIGNvbnNvbGUubG9nKFwiYmx1clwiKTtcclxuXHRcdFx0XHRcdHJlbW92ZUlucHV0KHRydWUpO1xyXG5cdFx0XHRcdH0uYmluZCh0aGlzKSApXHJcblxyXG5cdFx0XHRcdGZ1bmN0aW9uIGhhbmRsZU91dHNpZGVDbGljayAoZSkge1xyXG4vLyBjb25zb2xlLmxvZyhcIm91dHNpZGVjbGlja1wiKTtcclxuXHRcdFx0XHRcdGlmICggZS50YXJnZXQgIT09IGlucHV0RWxlbWVudCApIHtcclxuXHRcdFx0XHRcdFx0cmVtb3ZlSW5wdXQodHJ1ZSk7XHJcblx0XHRcdFx0XHR9XHJcblx0XHRcdFx0fVxyXG5cdFx0XHRcdHNldFRpbWVvdXQoICgpID0+IHtcclxuXHRcdFx0XHRcdHRoaXMuc3RhZ2Uub24oICdjbGljay5pbnB1dCB0b3VjaHN0YXJ0LmlucHV0JywgaGFuZGxlT3V0c2lkZUNsaWNrICk7XHJcblx0XHRcdFx0fSk7XHJcblxyXG5cdFx0XHR9LmJpbmQodGhpcykgKVxyXG5cclxuXHRcdFx0aWYgKCB0aGlzLm1vdmVhYmxlICkge1xyXG5cdFx0XHRcdGtHcm91cC5vbiggJ2RyYWdlbmQnLCBmdW5jdGlvbiAoKSB7XHJcblx0XHRcdFx0XHRiYXNlLnBvc3RMb2coICdpbnB1dE1vdmVkJywge1xyXG5cdFx0XHRcdFx0XHRpZDogdGhpcy5sb2dPYmplY3RJZCxcclxuXHRcdFx0XHRcdFx0eDoga0ZyYW1lLngoKSArIGtHcm91cC54KCkgKyBrRnJhbWUud2lkdGgoKS8yLFxyXG5cdFx0XHRcdFx0XHR5OiBrRnJhbWUueSgpICsga0dyb3VwLnkoKSArIGtGcmFtZS5oZWlnaHQoKS8yLFxyXG5cdFx0XHRcdFx0fSApO1xyXG5cdFx0XHRcdH0uYmluZCh0aGlzKSApXHJcblx0XHRcdFx0a0dyb3VwLm9uKCAnbW91c2Vkb3duIHRvdWNoc3RhcnQnLCBldiA9PiBldi5jYW5jZWxCdWJibGUgPSB0cnVlXHQpO1xyXG5cdFx0XHR9XHJcblxyXG5cdFx0XHRsZXQgb2xkQ3Vyc29yID0gbnVsbDtcclxuXHRcdFx0Y29uc3Qgb3ZlckN1cnNvciA9IHRoaXMubW92ZWFibGUgPyAncG9pbnRlcicgOiAndGV4dCc7XHJcblxyXG5cdFx0XHRrR3JvdXAub24oICdtb3VzZWVudGVyJywgKCkgPT4ge1xyXG5cdFx0XHRcdG9sZEN1cnNvciA9IGRvY3VtZW50LmJvZHkuc3R5bGUuY3Vyc29yO1xyXG5cdFx0XHRcdGRvY3VtZW50LmJvZHkuc3R5bGUuY3Vyc29yID0gb3ZlckN1cnNvcjtcclxuXHRcdFx0fSk7XHJcblx0XHRcdGtHcm91cC5vbiggJ21vdXNlbGVhdmUnLCAoZXYpID0+IHtcclxuXHRcdFx0XHRpZiAoIGlnbm9yZUV2ZW50KCB0aGlzLnN0YWdlLCBldiApICkge1xyXG5cdFx0XHRcdFx0cmV0dXJuO1xyXG5cdFx0XHRcdH1cclxuXHRcdFx0XHRpZiAoIGRvY3VtZW50LmJvZHkuc3R5bGUuY3Vyc29yID09IG92ZXJDdXJzb3IgKSB7XHJcblx0XHRcdFx0XHRkb2N1bWVudC5ib2R5LnN0eWxlLmN1cnNvciA9IG9sZEN1cnNvciB8fCAnYXV0byc7XHJcblx0XHRcdFx0fVxyXG5cdFx0XHR9KTtcclxuXHJcblx0XHR9XHJcblx0fVxyXG5cclxuXHQvLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vL1xyXG5cclxuXHRyZXBvcyAoIHgsIHkgKSB7XHJcblxyXG5cdFx0dGhpcy54ID0geDtcclxuXHRcdHRoaXMueSA9IHk7XHJcblxyXG5cdFx0dGhpcy5rRnJhbWUueCggeCApO1xyXG5cdFx0dGhpcy5rRnJhbWUueSggeSApO1xyXG5cclxuXHRcdHRoaXMua1RleHQueCggeCApO1xyXG5cdFx0dGhpcy5rVGV4dC55KCB5ICk7XHJcblxyXG5cdFx0dGhpcy5sYXllci5iYXRjaERyYXcoKTtcclxuXHR9XHJcblxyXG5cdHNldFZhbCAoIG5ld1RleHQgKSB7XHJcblx0XHR0aGlzLnZhbHVlPSBuZXdUZXh0O1xyXG5cdFx0dGhpcy5rVGV4dC50ZXh0KCB0aGlzLmluc2VydFRob3VzYW5kc1NlcCggdGhpcy5pbnB1dEVsZW1lbnQudmFsdWUgKSApO1xyXG5cdH1cclxuXHJcblx0Z2V0UG9zICgpIHtcclxuXHRcdHJldHVybiB7XHJcblx0XHRcdHg6IHRoaXMua0ZyYW1lLngoKSArIHRoaXMua0dyb3VwLngoKSxcclxuXHRcdFx0eTogdGhpcy5rRnJhbWUueSgpICsgdGhpcy5rR3JvdXAueSgpLFxyXG5cdFx0fVxyXG5cdH1cclxuXHJcblx0Ly8gZ2V0IGFkZGl0aW9uYWwgb2Zmc2V0cyBvZiBpbnB1dCBmaWVsZCBkdWUgdG8gcm90YXRpb25cclxuXHRnZXRBZGRPZmYgKCkge1xyXG5cdFx0c3dpdGNoICggdGhpcy5yb3RhdGlvbiApIHtcclxuXHRcdFx0Y2FzZSAtOTA6XHJcblx0XHRcdGNhc2UgMjcwOlxyXG5cdFx0XHRcdHJldHVybiB7XHJcblx0XHRcdFx0XHR4OiAwLFxyXG5cdFx0XHRcdFx0eTogLSggdGhpcy53aWR0aCArIHRoaXMuaGVpZ2h0ICkvMixcclxuXHRcdFx0XHR9XHJcblx0XHRcdGRlZmF1bHQ6XHJcblx0XHRcdFx0cmV0dXJuIHtcclxuXHRcdFx0XHRcdHg6IDAsXHJcblx0XHRcdFx0XHR5OiAwLFxyXG5cdFx0XHRcdH1cclxuXHRcdH1cclxuXHR9XHJcblxyXG5cdGxpc3RlbmluZyAoIGVuYWJsZSApIHtcclxuXHRcdHRoaXMua1RleHQubGlzdGVuaW5nKCBlbmFibGUgKTtcclxuXHR9XHJcblxyXG5cdGRlbGV0ZUFsbCAoKSB7XHJcblx0XHR0aGlzLmtGcmFtZS5kZXN0cm95KCk7XHJcblx0XHR0aGlzLmtUZXh0LmRlc3Ryb3koKTtcclxuXHRcdHRoaXMua0dyb3VwLmRlc3Ryb3koKTtcclxuXHR9XHJcblxyXG5cdC8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vXHJcblxyXG5cdGxvZ0tleSAoIGxvZ0V2ZW50LCBwb3MsIGtleUV2ZW50LCBkYXRhPXt9ICkge1xyXG5cclxuXHRcdGlmICggJ2xvZ09iamVjdElkJyBpbiB0aGlzICYmIHRoaXMuYmFzZSApIHtcclxuXHJcblx0XHRcdGRhdGEuaWQgPSB0aGlzLmxvZ09iamVjdElkO1xyXG5cdFx0XHRkYXRhLnBvcyA9IHBvcztcclxuXHJcblx0XHRcdGlmICggdGhpcy5sb2dSZWYgKSB7XHJcblx0XHRcdFx0ZGF0YSA9IE9iamVjdC5hc3NpZ24oIGRhdGEsIHRoaXMubG9nUmVmKCkgKTtcclxuXHRcdFx0fVxyXG5cdFx0XHRbICdrZXknLCAnY29kZScsICdzaGlmdEtleScsICdhbHRLZXknLCAnY3RybEtleScsICdtZXRhS2V5JywgJ2lzQ29tcG9zaW5nJywgJ3JlcGVhdCcgXS5mb3JFYWNoKCBrID0+IHtcclxuXHRcdFx0XHRpZiAoIGtleUV2ZW50W2tdICkge1xyXG5cdFx0XHRcdFx0ZGF0YVtrXSA9IGtleUV2ZW50W2tdO1xyXG5cdFx0XHRcdH1cclxuXHRcdFx0fSlcclxuXHRcdFx0ZGF0YS53aGljaCA9IGtleUV2ZW50LndoaWNoIHx8IGtleUV2ZW50LmtleUNvZGU7XHJcblxyXG5cdFx0XHR0aGlzLmJhc2UucG9zdExvZyggbG9nRXZlbnQsIGRhdGEgKTtcclxuXHRcdH1cclxuXHR9XHJcblxyXG5cdGluc2VydFRob3VzYW5kc1NlcCAocykge1xyXG5cdFx0aWYgKCB0aGlzLnRob3VzYW5kc1NlcCApIHtcclxuXHRcdFx0bGV0IHI9cy50b1N0cmluZygpO1xyXG5cdFx0XHRkbyB7XHJcblx0XHRcdFx0cz1yO1xyXG5cdFx0XHRcdHI9cy5yZXBsYWNlKCAvKFswLTldKykoWzAtOV17M31cXGIpLywgJyQxJyt0aGlzLnRob3VzYW5kc1NlcCsnJDInIClcclxuXHRcdFx0fSB3aGlsZSAociE9cyk7XHJcblx0XHR9XHJcblx0XHRyZXR1cm4gcztcclxuXHR9XHJcblxyXG5cdC8vIGRlbGV0ZVRob3VzYW5kc1NlcCAocykge1xyXG5cdC8vIFx0aWYgKCB0aGlzLnRob3VzYW5kc1NlcCApIHtcclxuXHQvLyBcdFx0Y29uc3QgcmUgPSBuZXcgUmVnRXhwKCAnKFswLTldKyknK3RoaXMudGhvdXNhbmRzU2VwKycoWzAtOV17M31cXFxcYiknICk7XHJcblx0Ly8gXHRcdGxldCByPXMudG9TdHJpbmcoKTtcclxuXHQvLyBcdFx0ZG8ge1xyXG5cdC8vIFx0XHRcdHM9cjtcclxuXHQvLyBcdFx0XHRyPXMucmVwbGFjZSggcmUsICckMSQyJyApO1xyXG5cdC8vIFx0XHR9IHdoaWxlIChyIT1zKTtcclxuXHQvLyBcdH1cclxuXHQvLyBcdHJldHVybiBzO1xyXG5cdC8vIH1cclxuXHJcbn1cclxuIiwiaW1wb3J0IEtvbnZhIGZyb20gJ2tvbnZhL2xpYi9Db3JlJ1xyXG5pbXBvcnQgeyBJbWFnZSBhcyBrSW1hZ2UgfSBmcm9tICdrb252YS9saWIvc2hhcGVzL0ltYWdlJ1xyXG5cclxuZXhwb3J0IGNsYXNzIHRvb2x0aXAge1xyXG5cclxuXHRjb25zdHJ1Y3RvciAoIHN0YWdlICkge1xyXG5cdFx0dGhpcy5zdGFnZSA9IHN0YWdlO1xyXG5cdFx0dGhpcy5sYXllciA9IG5ldyBLb252YS5MYXllcigpO1xyXG5cdFx0c3RhZ2UuYWRkKCB0aGlzLmxheWVyICk7XHJcblxyXG5cdFx0dGhpcy5pbWFnZSA9IG51bGw7XHJcblx0XHR0aGlzLmtJbWFnZXMgPSB7fTtcdC8vIHsgW3NyY106IEtPTlZBLkltYWdlIH1cclxuXHR9XHJcblxyXG5cdC8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vXHJcblxyXG5cdHNob3dJbWFnZSAoIGRlZnM9e30gKSB7XHJcblxyXG5cdFx0Wyd3aWR0aCcsJ2hlaWdodCcsJ3NyYyddLmZvckVhY2goIG8gPT4ge1xyXG5cdFx0XHRpZiAoICEoIG8gaW4gZGVmcyApICkge1xyXG5cdFx0XHRcdHRocm93KCBgdG9vbHRpcDogcGFyYW1ldGVyICcke299JyBub3Qgc3BlY2lmaWVkIWAgKTtcclxuXHRcdFx0fVxyXG5cdFx0fSk7XHJcblx0XHRjb25zdCBkZWZhdWx0cyA9IHtcclxuXHRcdFx0Ly8gd2lkdGgsIGhlaWdodCwgc3JjXHQvLyBwcm9wZXJ0aWVzIG9mIGltYWdlXHJcblx0XHRcdG9mZnNldFg6IDEwLCBcdC8vIG9mZnNldCB0byBtb3VzZXBvaW50ZXIgcG9zaXRpb25cclxuXHRcdFx0b2Zmc2V0WTogMTAsXHJcblx0XHRcdGtvbnZhT3B0czoge30sXHJcblx0XHRcdGtJbWFnZXM6IFtdLFxyXG5cdFx0fTtcclxuXHRcdGRlZnMgPSBPYmplY3QuYXNzaWduKCB7fSwgZGVmYXVsdHMsIGRlZnMgKTtcclxuXHJcblx0XHQvLyBpbWFnZSBsb2FkZWQ/XHJcblx0XHRpZiAoIGRlZnMuc3JjIGluIHRoaXMua0ltYWdlcyApIHtcclxuXHJcblx0XHRcdHRoaXMuaW1hZ2UgPSB0aGlzLmtJbWFnZXNbIGRlZnMuc3JjIF07XHJcblx0XHRcdHRoaXMuaW1hZ2UueCggdGhpcy5zdGFnZS5nZXRQb2ludGVyUG9zaXRpb24oKS54ICsgZGVmcy5vZmZzZXRYICk7XHJcblx0XHRcdHRoaXMuaW1hZ2UueSggdGhpcy5zdGFnZS5nZXRQb2ludGVyUG9zaXRpb24oKS55ICsgZGVmcy5vZmZzZXRZICk7XHJcblx0XHRcdHRoaXMuaW1hZ2UudmlzaWJsZSggdHJ1ZSApO1xyXG5cdFx0XHR0aGlzLmxheWVyLmJhdGNoRHJhdygpO1xyXG5cclxuXHRcdH0gZWxzZSB7XHJcblxyXG5cdFx0XHQvLyBsb2FkIGltYWdlXHJcblx0XHRcdGNvbnN0IGltYWdlID0gbmV3IEltYWdlKCk7XHJcblx0XHRcdGltYWdlLm9ubG9hZCA9ICgpID0+IHtcclxuXHRcdFx0XHRpZiAoIHRoaXMubG9hZGluZyApIHtcclxuXHRcdFx0XHRcdHRoaXMuaW1hZ2UgPSBuZXcgS29udmEuSW1hZ2UoIE9iamVjdC5hc3NpZ24oIHtcclxuXHRcdFx0XHRcdFx0eDogdGhpcy5zdGFnZS5nZXRQb2ludGVyUG9zaXRpb24oKS54ICsgZGVmcy5vZmZzZXRYLFxyXG5cdFx0XHRcdFx0XHR5OiB0aGlzLnN0YWdlLmdldFBvaW50ZXJQb3NpdGlvbigpLnkgKyBkZWZzLm9mZnNldFksXHJcblx0XHRcdFx0XHRcdHdpZHRoOiBkZWZzLndpZHRoLFxyXG5cdFx0XHRcdFx0XHRoZWlnaHQ6IGRlZnMuaGVpZ2h0LFxyXG5cdFx0XHRcdFx0XHRpbWFnZSxcclxuXHRcdFx0XHRcdH0sIGRlZnMua29udmFPcHRzICkgKTtcclxuXHRcdFx0XHRcdHRoaXMua0ltYWdlc1tkZWZzLnNyY10gPSB0aGlzLmltYWdlO1xyXG5cdFx0XHRcdFx0dGhpcy5sYXllci5hZGQoIHRoaXMuaW1hZ2UgKTtcclxuXHRcdFx0XHRcdHRoaXMubGF5ZXIuZHJhdygpO1xyXG5cdFx0XHRcdH1cclxuXHRcdFx0fVxyXG5cdFx0XHR0aGlzLmxvYWRpbmcgPSAxO1xyXG5cdFx0XHRpbWFnZS5zcmMgPSBkZWZzLnNyYztcclxuXHRcdH1cclxuXHJcblx0XHR0aGlzLnN0YWdlLm9uKCBcIm1vdXNlbW92ZS50b29sdGlwXCIsIGZ1bmN0aW9uICgpIHtcclxuXHRcdFx0aWYgKCB0aGlzLmltYWdlKSB7XHJcbi8vIGNvbnNvbGUubG9nKCB0aGlzLnN0YWdlLmdldFBvaW50ZXJQb3NpdGlvbigpLnggKyBkZWZzLm9mZnNldFgsIHRoaXMuc3RhZ2UuZ2V0UG9pbnRlclBvc2l0aW9uKCkueSArIGRlZnMub2Zmc2V0WSApXHJcblx0XHRcdFx0dGhpcy5pbWFnZS54KCB0aGlzLnN0YWdlLmdldFBvaW50ZXJQb3NpdGlvbigpLnggKyBkZWZzLm9mZnNldFggKTtcclxuXHRcdFx0XHR0aGlzLmltYWdlLnkoIHRoaXMuc3RhZ2UuZ2V0UG9pbnRlclBvc2l0aW9uKCkueSArIGRlZnMub2Zmc2V0WSApO1xyXG5cdFx0XHRcdHRoaXMubGF5ZXIuYmF0Y2hEcmF3KCk7XHJcblx0XHRcdH1cclxuXHRcdH0uYmluZCh0aGlzKSApO1xyXG5cclxuXHRcdHRoaXMubGF5ZXIubW92ZVRvVG9wKCk7XHJcblx0fVxyXG5cclxuXHRoaWRlICgpIHtcclxuXHRcdHRoaXMubG9hZGluZyA9IDA7XHJcblx0XHR0aGlzLnN0YWdlLm9mZiggXCJtb3VzZW1vdmUudG9vbHRpcFwiICk7XHJcblx0XHRpZiAoIHRoaXMuaW1hZ2UpIHtcclxuXHRcdFx0dGhpcy5pbWFnZS52aXNpYmxlKGZhbHNlKTtcclxuXHRcdFx0dGhpcy5pbWFnZSA9IG51bGw7XHJcblx0XHRcdHRoaXMubGF5ZXIuYmF0Y2hEcmF3KCk7XHJcblx0XHR9XHJcblx0fVxyXG5cclxufVxyXG4iLCIvLyBleHRyYWN0ZWQgYnkgbWluaS1jc3MtZXh0cmFjdC1wbHVnaW5cbmV4cG9ydCB7fTsiLCJpbXBvcnQgeyBnbG9iIH0gZnJvbSAnLi9HbG9iYWwuanMnO1xuaW1wb3J0IHsgVXRpbCB9IGZyb20gJy4vVXRpbC5qcyc7XG52YXIgbm93ID0gKGZ1bmN0aW9uICgpIHtcbiAgICBpZiAoZ2xvYi5wZXJmb3JtYW5jZSAmJiBnbG9iLnBlcmZvcm1hbmNlLm5vdykge1xuICAgICAgICByZXR1cm4gZnVuY3Rpb24gKCkge1xuICAgICAgICAgICAgcmV0dXJuIGdsb2IucGVyZm9ybWFuY2Uubm93KCk7XG4gICAgICAgIH07XG4gICAgfVxuICAgIHJldHVybiBmdW5jdGlvbiAoKSB7XG4gICAgICAgIHJldHVybiBuZXcgRGF0ZSgpLmdldFRpbWUoKTtcbiAgICB9O1xufSkoKTtcbmV4cG9ydCBjbGFzcyBBbmltYXRpb24ge1xuICAgIGNvbnN0cnVjdG9yKGZ1bmMsIGxheWVycykge1xuICAgICAgICB0aGlzLmlkID0gQW5pbWF0aW9uLmFuaW1JZENvdW50ZXIrKztcbiAgICAgICAgdGhpcy5mcmFtZSA9IHtcbiAgICAgICAgICAgIHRpbWU6IDAsXG4gICAgICAgICAgICB0aW1lRGlmZjogMCxcbiAgICAgICAgICAgIGxhc3RUaW1lOiBub3coKSxcbiAgICAgICAgICAgIGZyYW1lUmF0ZTogMCxcbiAgICAgICAgfTtcbiAgICAgICAgdGhpcy5mdW5jID0gZnVuYztcbiAgICAgICAgdGhpcy5zZXRMYXllcnMobGF5ZXJzKTtcbiAgICB9XG4gICAgc2V0TGF5ZXJzKGxheWVycykge1xuICAgICAgICB2YXIgbGF5cyA9IFtdO1xuICAgICAgICBpZiAoIWxheWVycykge1xuICAgICAgICAgICAgbGF5cyA9IFtdO1xuICAgICAgICB9XG4gICAgICAgIGVsc2UgaWYgKGxheWVycy5sZW5ndGggPiAwKSB7XG4gICAgICAgICAgICBsYXlzID0gbGF5ZXJzO1xuICAgICAgICB9XG4gICAgICAgIGVsc2Uge1xuICAgICAgICAgICAgbGF5cyA9IFtsYXllcnNdO1xuICAgICAgICB9XG4gICAgICAgIHRoaXMubGF5ZXJzID0gbGF5cztcbiAgICAgICAgcmV0dXJuIHRoaXM7XG4gICAgfVxuICAgIGdldExheWVycygpIHtcbiAgICAgICAgcmV0dXJuIHRoaXMubGF5ZXJzO1xuICAgIH1cbiAgICBhZGRMYXllcihsYXllcikge1xuICAgICAgICB2YXIgbGF5ZXJzID0gdGhpcy5sYXllcnMsIGxlbiA9IGxheWVycy5sZW5ndGgsIG47XG4gICAgICAgIGZvciAobiA9IDA7IG4gPCBsZW47IG4rKykge1xuICAgICAgICAgICAgaWYgKGxheWVyc1tuXS5faWQgPT09IGxheWVyLl9pZCkge1xuICAgICAgICAgICAgICAgIHJldHVybiBmYWxzZTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgICB0aGlzLmxheWVycy5wdXNoKGxheWVyKTtcbiAgICAgICAgcmV0dXJuIHRydWU7XG4gICAgfVxuICAgIGlzUnVubmluZygpIHtcbiAgICAgICAgdmFyIGEgPSBBbmltYXRpb24sIGFuaW1hdGlvbnMgPSBhLmFuaW1hdGlvbnMsIGxlbiA9IGFuaW1hdGlvbnMubGVuZ3RoLCBuO1xuICAgICAgICBmb3IgKG4gPSAwOyBuIDwgbGVuOyBuKyspIHtcbiAgICAgICAgICAgIGlmIChhbmltYXRpb25zW25dLmlkID09PSB0aGlzLmlkKSB7XG4gICAgICAgICAgICAgICAgcmV0dXJuIHRydWU7XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuIGZhbHNlO1xuICAgIH1cbiAgICBzdGFydCgpIHtcbiAgICAgICAgdGhpcy5zdG9wKCk7XG4gICAgICAgIHRoaXMuZnJhbWUudGltZURpZmYgPSAwO1xuICAgICAgICB0aGlzLmZyYW1lLmxhc3RUaW1lID0gbm93KCk7XG4gICAgICAgIEFuaW1hdGlvbi5fYWRkQW5pbWF0aW9uKHRoaXMpO1xuICAgICAgICByZXR1cm4gdGhpcztcbiAgICB9XG4gICAgc3RvcCgpIHtcbiAgICAgICAgQW5pbWF0aW9uLl9yZW1vdmVBbmltYXRpb24odGhpcyk7XG4gICAgICAgIHJldHVybiB0aGlzO1xuICAgIH1cbiAgICBfdXBkYXRlRnJhbWVPYmplY3QodGltZSkge1xuICAgICAgICB0aGlzLmZyYW1lLnRpbWVEaWZmID0gdGltZSAtIHRoaXMuZnJhbWUubGFzdFRpbWU7XG4gICAgICAgIHRoaXMuZnJhbWUubGFzdFRpbWUgPSB0aW1lO1xuICAgICAgICB0aGlzLmZyYW1lLnRpbWUgKz0gdGhpcy5mcmFtZS50aW1lRGlmZjtcbiAgICAgICAgdGhpcy5mcmFtZS5mcmFtZVJhdGUgPSAxMDAwIC8gdGhpcy5mcmFtZS50aW1lRGlmZjtcbiAgICB9XG4gICAgc3RhdGljIF9hZGRBbmltYXRpb24oYW5pbSkge1xuICAgICAgICB0aGlzLmFuaW1hdGlvbnMucHVzaChhbmltKTtcbiAgICAgICAgdGhpcy5faGFuZGxlQW5pbWF0aW9uKCk7XG4gICAgfVxuICAgIHN0YXRpYyBfcmVtb3ZlQW5pbWF0aW9uKGFuaW0pIHtcbiAgICAgICAgdmFyIGlkID0gYW5pbS5pZCwgYW5pbWF0aW9ucyA9IHRoaXMuYW5pbWF0aW9ucywgbGVuID0gYW5pbWF0aW9ucy5sZW5ndGgsIG47XG4gICAgICAgIGZvciAobiA9IDA7IG4gPCBsZW47IG4rKykge1xuICAgICAgICAgICAgaWYgKGFuaW1hdGlvbnNbbl0uaWQgPT09IGlkKSB7XG4gICAgICAgICAgICAgICAgdGhpcy5hbmltYXRpb25zLnNwbGljZShuLCAxKTtcbiAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgIH1cbiAgICBzdGF0aWMgX3J1bkZyYW1lcygpIHtcbiAgICAgICAgdmFyIGxheWVySGFzaCA9IHt9LCBhbmltYXRpb25zID0gdGhpcy5hbmltYXRpb25zLCBhbmltLCBsYXllcnMsIGZ1bmMsIG4sIGksIGxheWVyc0xlbiwgbGF5ZXIsIGtleSwgbmVlZFJlZHJhdztcbiAgICAgICAgZm9yIChuID0gMDsgbiA8IGFuaW1hdGlvbnMubGVuZ3RoOyBuKyspIHtcbiAgICAgICAgICAgIGFuaW0gPSBhbmltYXRpb25zW25dO1xuICAgICAgICAgICAgbGF5ZXJzID0gYW5pbS5sYXllcnM7XG4gICAgICAgICAgICBmdW5jID0gYW5pbS5mdW5jO1xuICAgICAgICAgICAgYW5pbS5fdXBkYXRlRnJhbWVPYmplY3Qobm93KCkpO1xuICAgICAgICAgICAgbGF5ZXJzTGVuID0gbGF5ZXJzLmxlbmd0aDtcbiAgICAgICAgICAgIGlmIChmdW5jKSB7XG4gICAgICAgICAgICAgICAgbmVlZFJlZHJhdyA9IGZ1bmMuY2FsbChhbmltLCBhbmltLmZyYW1lKSAhPT0gZmFsc2U7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBlbHNlIHtcbiAgICAgICAgICAgICAgICBuZWVkUmVkcmF3ID0gdHJ1ZTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGlmICghbmVlZFJlZHJhdykge1xuICAgICAgICAgICAgICAgIGNvbnRpbnVlO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgZm9yIChpID0gMDsgaSA8IGxheWVyc0xlbjsgaSsrKSB7XG4gICAgICAgICAgICAgICAgbGF5ZXIgPSBsYXllcnNbaV07XG4gICAgICAgICAgICAgICAgaWYgKGxheWVyLl9pZCAhPT0gdW5kZWZpbmVkKSB7XG4gICAgICAgICAgICAgICAgICAgIGxheWVySGFzaFtsYXllci5faWRdID0gbGF5ZXI7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICAgIGZvciAoa2V5IGluIGxheWVySGFzaCkge1xuICAgICAgICAgICAgaWYgKCFsYXllckhhc2guaGFzT3duUHJvcGVydHkoa2V5KSkge1xuICAgICAgICAgICAgICAgIGNvbnRpbnVlO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgbGF5ZXJIYXNoW2tleV0uYmF0Y2hEcmF3KCk7XG4gICAgICAgIH1cbiAgICB9XG4gICAgc3RhdGljIF9hbmltYXRpb25Mb29wKCkge1xuICAgICAgICB2YXIgQW5pbSA9IEFuaW1hdGlvbjtcbiAgICAgICAgaWYgKEFuaW0uYW5pbWF0aW9ucy5sZW5ndGgpIHtcbiAgICAgICAgICAgIEFuaW0uX3J1bkZyYW1lcygpO1xuICAgICAgICAgICAgVXRpbC5yZXF1ZXN0QW5pbUZyYW1lKEFuaW0uX2FuaW1hdGlvbkxvb3ApO1xuICAgICAgICB9XG4gICAgICAgIGVsc2Uge1xuICAgICAgICAgICAgQW5pbS5hbmltUnVubmluZyA9IGZhbHNlO1xuICAgICAgICB9XG4gICAgfVxuICAgIHN0YXRpYyBfaGFuZGxlQW5pbWF0aW9uKCkge1xuICAgICAgICBpZiAoIXRoaXMuYW5pbVJ1bm5pbmcpIHtcbiAgICAgICAgICAgIHRoaXMuYW5pbVJ1bm5pbmcgPSB0cnVlO1xuICAgICAgICAgICAgVXRpbC5yZXF1ZXN0QW5pbUZyYW1lKHRoaXMuX2FuaW1hdGlvbkxvb3ApO1xuICAgICAgICB9XG4gICAgfVxufVxuQW5pbWF0aW9uLmFuaW1hdGlvbnMgPSBbXTtcbkFuaW1hdGlvbi5hbmltSWRDb3VudGVyID0gMDtcbkFuaW1hdGlvbi5hbmltUnVubmluZyA9IGZhbHNlO1xuIiwiaW1wb3J0IHsgVXRpbCB9IGZyb20gJy4vVXRpbC5qcyc7XG5pbXBvcnQgeyBTY2VuZUNvbnRleHQsIEhpdENvbnRleHQgfSBmcm9tICcuL0NvbnRleHQuanMnO1xuaW1wb3J0IHsgS29udmEgfSBmcm9tICcuL0dsb2JhbC5qcyc7XG5pbXBvcnQgeyBGYWN0b3J5IH0gZnJvbSAnLi9GYWN0b3J5LmpzJztcbmltcG9ydCB7IGdldE51bWJlclZhbGlkYXRvciB9IGZyb20gJy4vVmFsaWRhdG9ycy5qcyc7XG52YXIgX3BpeGVsUmF0aW87XG5mdW5jdGlvbiBnZXREZXZpY2VQaXhlbFJhdGlvKCkge1xuICAgIGlmIChfcGl4ZWxSYXRpbykge1xuICAgICAgICByZXR1cm4gX3BpeGVsUmF0aW87XG4gICAgfVxuICAgIHZhciBjYW52YXMgPSBVdGlsLmNyZWF0ZUNhbnZhc0VsZW1lbnQoKTtcbiAgICB2YXIgY29udGV4dCA9IGNhbnZhcy5nZXRDb250ZXh0KCcyZCcpO1xuICAgIF9waXhlbFJhdGlvID0gKGZ1bmN0aW9uICgpIHtcbiAgICAgICAgdmFyIGRldmljZVBpeGVsUmF0aW8gPSBLb252YS5fZ2xvYmFsLmRldmljZVBpeGVsUmF0aW8gfHwgMSwgYmFja2luZ1N0b3JlUmF0aW8gPSBjb250ZXh0LndlYmtpdEJhY2tpbmdTdG9yZVBpeGVsUmF0aW8gfHxcbiAgICAgICAgICAgIGNvbnRleHQubW96QmFja2luZ1N0b3JlUGl4ZWxSYXRpbyB8fFxuICAgICAgICAgICAgY29udGV4dC5tc0JhY2tpbmdTdG9yZVBpeGVsUmF0aW8gfHxcbiAgICAgICAgICAgIGNvbnRleHQub0JhY2tpbmdTdG9yZVBpeGVsUmF0aW8gfHxcbiAgICAgICAgICAgIGNvbnRleHQuYmFja2luZ1N0b3JlUGl4ZWxSYXRpbyB8fFxuICAgICAgICAgICAgMTtcbiAgICAgICAgcmV0dXJuIGRldmljZVBpeGVsUmF0aW8gLyBiYWNraW5nU3RvcmVSYXRpbztcbiAgICB9KSgpO1xuICAgIFV0aWwucmVsZWFzZUNhbnZhcyhjYW52YXMpO1xuICAgIHJldHVybiBfcGl4ZWxSYXRpbztcbn1cbmV4cG9ydCBjbGFzcyBDYW52YXMge1xuICAgIGNvbnN0cnVjdG9yKGNvbmZpZykge1xuICAgICAgICB0aGlzLnBpeGVsUmF0aW8gPSAxO1xuICAgICAgICB0aGlzLndpZHRoID0gMDtcbiAgICAgICAgdGhpcy5oZWlnaHQgPSAwO1xuICAgICAgICB0aGlzLmlzQ2FjaGUgPSBmYWxzZTtcbiAgICAgICAgdmFyIGNvbmYgPSBjb25maWcgfHwge307XG4gICAgICAgIHZhciBwaXhlbFJhdGlvID0gY29uZi5waXhlbFJhdGlvIHx8IEtvbnZhLnBpeGVsUmF0aW8gfHwgZ2V0RGV2aWNlUGl4ZWxSYXRpbygpO1xuICAgICAgICB0aGlzLnBpeGVsUmF0aW8gPSBwaXhlbFJhdGlvO1xuICAgICAgICB0aGlzLl9jYW52YXMgPSBVdGlsLmNyZWF0ZUNhbnZhc0VsZW1lbnQoKTtcbiAgICAgICAgdGhpcy5fY2FudmFzLnN0eWxlLnBhZGRpbmcgPSAnMCc7XG4gICAgICAgIHRoaXMuX2NhbnZhcy5zdHlsZS5tYXJnaW4gPSAnMCc7XG4gICAgICAgIHRoaXMuX2NhbnZhcy5zdHlsZS5ib3JkZXIgPSAnMCc7XG4gICAgICAgIHRoaXMuX2NhbnZhcy5zdHlsZS5iYWNrZ3JvdW5kID0gJ3RyYW5zcGFyZW50JztcbiAgICAgICAgdGhpcy5fY2FudmFzLnN0eWxlLnBvc2l0aW9uID0gJ2Fic29sdXRlJztcbiAgICAgICAgdGhpcy5fY2FudmFzLnN0eWxlLnRvcCA9ICcwJztcbiAgICAgICAgdGhpcy5fY2FudmFzLnN0eWxlLmxlZnQgPSAnMCc7XG4gICAgfVxuICAgIGdldENvbnRleHQoKSB7XG4gICAgICAgIHJldHVybiB0aGlzLmNvbnRleHQ7XG4gICAgfVxuICAgIGdldFBpeGVsUmF0aW8oKSB7XG4gICAgICAgIHJldHVybiB0aGlzLnBpeGVsUmF0aW87XG4gICAgfVxuICAgIHNldFBpeGVsUmF0aW8ocGl4ZWxSYXRpbykge1xuICAgICAgICB2YXIgcHJldmlvdXNSYXRpbyA9IHRoaXMucGl4ZWxSYXRpbztcbiAgICAgICAgdGhpcy5waXhlbFJhdGlvID0gcGl4ZWxSYXRpbztcbiAgICAgICAgdGhpcy5zZXRTaXplKHRoaXMuZ2V0V2lkdGgoKSAvIHByZXZpb3VzUmF0aW8sIHRoaXMuZ2V0SGVpZ2h0KCkgLyBwcmV2aW91c1JhdGlvKTtcbiAgICB9XG4gICAgc2V0V2lkdGgod2lkdGgpIHtcbiAgICAgICAgdGhpcy53aWR0aCA9IHRoaXMuX2NhbnZhcy53aWR0aCA9IHdpZHRoICogdGhpcy5waXhlbFJhdGlvO1xuICAgICAgICB0aGlzLl9jYW52YXMuc3R5bGUud2lkdGggPSB3aWR0aCArICdweCc7XG4gICAgICAgIHZhciBwaXhlbFJhdGlvID0gdGhpcy5waXhlbFJhdGlvLCBfY29udGV4dCA9IHRoaXMuZ2V0Q29udGV4dCgpLl9jb250ZXh0O1xuICAgICAgICBfY29udGV4dC5zY2FsZShwaXhlbFJhdGlvLCBwaXhlbFJhdGlvKTtcbiAgICB9XG4gICAgc2V0SGVpZ2h0KGhlaWdodCkge1xuICAgICAgICB0aGlzLmhlaWdodCA9IHRoaXMuX2NhbnZhcy5oZWlnaHQgPSBoZWlnaHQgKiB0aGlzLnBpeGVsUmF0aW87XG4gICAgICAgIHRoaXMuX2NhbnZhcy5zdHlsZS5oZWlnaHQgPSBoZWlnaHQgKyAncHgnO1xuICAgICAgICB2YXIgcGl4ZWxSYXRpbyA9IHRoaXMucGl4ZWxSYXRpbywgX2NvbnRleHQgPSB0aGlzLmdldENvbnRleHQoKS5fY29udGV4dDtcbiAgICAgICAgX2NvbnRleHQuc2NhbGUocGl4ZWxSYXRpbywgcGl4ZWxSYXRpbyk7XG4gICAgfVxuICAgIGdldFdpZHRoKCkge1xuICAgICAgICByZXR1cm4gdGhpcy53aWR0aDtcbiAgICB9XG4gICAgZ2V0SGVpZ2h0KCkge1xuICAgICAgICByZXR1cm4gdGhpcy5oZWlnaHQ7XG4gICAgfVxuICAgIHNldFNpemUod2lkdGgsIGhlaWdodCkge1xuICAgICAgICB0aGlzLnNldFdpZHRoKHdpZHRoIHx8IDApO1xuICAgICAgICB0aGlzLnNldEhlaWdodChoZWlnaHQgfHwgMCk7XG4gICAgfVxuICAgIHRvRGF0YVVSTChtaW1lVHlwZSwgcXVhbGl0eSkge1xuICAgICAgICB0cnkge1xuICAgICAgICAgICAgcmV0dXJuIHRoaXMuX2NhbnZhcy50b0RhdGFVUkwobWltZVR5cGUsIHF1YWxpdHkpO1xuICAgICAgICB9XG4gICAgICAgIGNhdGNoIChlKSB7XG4gICAgICAgICAgICB0cnkge1xuICAgICAgICAgICAgICAgIHJldHVybiB0aGlzLl9jYW52YXMudG9EYXRhVVJMKCk7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBjYXRjaCAoZXJyKSB7XG4gICAgICAgICAgICAgICAgVXRpbC5lcnJvcignVW5hYmxlIHRvIGdldCBkYXRhIFVSTC4gJyArXG4gICAgICAgICAgICAgICAgICAgIGVyci5tZXNzYWdlICtcbiAgICAgICAgICAgICAgICAgICAgJyBGb3IgbW9yZSBpbmZvIHJlYWQgaHR0cHM6Ly9rb252YWpzLm9yZy9kb2NzL3Bvc3RzL1RhaW50ZWRfQ2FudmFzLmh0bWwuJyk7XG4gICAgICAgICAgICAgICAgcmV0dXJuICcnO1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgfVxufVxuRmFjdG9yeS5hZGRHZXR0ZXJTZXR0ZXIoQ2FudmFzLCAncGl4ZWxSYXRpbycsIHVuZGVmaW5lZCwgZ2V0TnVtYmVyVmFsaWRhdG9yKCkpO1xuZXhwb3J0IGNsYXNzIFNjZW5lQ2FudmFzIGV4dGVuZHMgQ2FudmFzIHtcbiAgICBjb25zdHJ1Y3Rvcihjb25maWcgPSB7IHdpZHRoOiAwLCBoZWlnaHQ6IDAgfSkge1xuICAgICAgICBzdXBlcihjb25maWcpO1xuICAgICAgICB0aGlzLmNvbnRleHQgPSBuZXcgU2NlbmVDb250ZXh0KHRoaXMpO1xuICAgICAgICB0aGlzLnNldFNpemUoY29uZmlnLndpZHRoLCBjb25maWcuaGVpZ2h0KTtcbiAgICB9XG59XG5leHBvcnQgY2xhc3MgSGl0Q2FudmFzIGV4dGVuZHMgQ2FudmFzIHtcbiAgICBjb25zdHJ1Y3Rvcihjb25maWcgPSB7IHdpZHRoOiAwLCBoZWlnaHQ6IDAgfSkge1xuICAgICAgICBzdXBlcihjb25maWcpO1xuICAgICAgICB0aGlzLmhpdENhbnZhcyA9IHRydWU7XG4gICAgICAgIHRoaXMuY29udGV4dCA9IG5ldyBIaXRDb250ZXh0KHRoaXMpO1xuICAgICAgICB0aGlzLnNldFNpemUoY29uZmlnLndpZHRoLCBjb25maWcuaGVpZ2h0KTtcbiAgICB9XG59XG4iLCJpbXBvcnQgeyBGYWN0b3J5IH0gZnJvbSAnLi9GYWN0b3J5LmpzJztcbmltcG9ydCB7IE5vZGUgfSBmcm9tICcuL05vZGUuanMnO1xuaW1wb3J0IHsgZ2V0TnVtYmVyVmFsaWRhdG9yIH0gZnJvbSAnLi9WYWxpZGF0b3JzLmpzJztcbmV4cG9ydCBjbGFzcyBDb250YWluZXIgZXh0ZW5kcyBOb2RlIHtcbiAgICBjb25zdHJ1Y3RvcigpIHtcbiAgICAgICAgc3VwZXIoLi4uYXJndW1lbnRzKTtcbiAgICAgICAgdGhpcy5jaGlsZHJlbiA9IFtdO1xuICAgIH1cbiAgICBnZXRDaGlsZHJlbihmaWx0ZXJGdW5jKSB7XG4gICAgICAgIGlmICghZmlsdGVyRnVuYykge1xuICAgICAgICAgICAgcmV0dXJuIHRoaXMuY2hpbGRyZW4gfHwgW107XG4gICAgICAgIH1cbiAgICAgICAgY29uc3QgY2hpbGRyZW4gPSB0aGlzLmNoaWxkcmVuIHx8IFtdO1xuICAgICAgICB2YXIgcmVzdWx0cyA9IFtdO1xuICAgICAgICBjaGlsZHJlbi5mb3JFYWNoKGZ1bmN0aW9uIChjaGlsZCkge1xuICAgICAgICAgICAgaWYgKGZpbHRlckZ1bmMoY2hpbGQpKSB7XG4gICAgICAgICAgICAgICAgcmVzdWx0cy5wdXNoKGNoaWxkKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfSk7XG4gICAgICAgIHJldHVybiByZXN1bHRzO1xuICAgIH1cbiAgICBoYXNDaGlsZHJlbigpIHtcbiAgICAgICAgcmV0dXJuIHRoaXMuZ2V0Q2hpbGRyZW4oKS5sZW5ndGggPiAwO1xuICAgIH1cbiAgICByZW1vdmVDaGlsZHJlbigpIHtcbiAgICAgICAgdGhpcy5nZXRDaGlsZHJlbigpLmZvckVhY2goKGNoaWxkKSA9PiB7XG4gICAgICAgICAgICBjaGlsZC5wYXJlbnQgPSBudWxsO1xuICAgICAgICAgICAgY2hpbGQuaW5kZXggPSAwO1xuICAgICAgICAgICAgY2hpbGQucmVtb3ZlKCk7XG4gICAgICAgIH0pO1xuICAgICAgICB0aGlzLmNoaWxkcmVuID0gW107XG4gICAgICAgIHRoaXMuX3JlcXVlc3REcmF3KCk7XG4gICAgICAgIHJldHVybiB0aGlzO1xuICAgIH1cbiAgICBkZXN0cm95Q2hpbGRyZW4oKSB7XG4gICAgICAgIHRoaXMuZ2V0Q2hpbGRyZW4oKS5mb3JFYWNoKChjaGlsZCkgPT4ge1xuICAgICAgICAgICAgY2hpbGQucGFyZW50ID0gbnVsbDtcbiAgICAgICAgICAgIGNoaWxkLmluZGV4ID0gMDtcbiAgICAgICAgICAgIGNoaWxkLmRlc3Ryb3koKTtcbiAgICAgICAgfSk7XG4gICAgICAgIHRoaXMuY2hpbGRyZW4gPSBbXTtcbiAgICAgICAgdGhpcy5fcmVxdWVzdERyYXcoKTtcbiAgICAgICAgcmV0dXJuIHRoaXM7XG4gICAgfVxuICAgIGFkZCguLi5jaGlsZHJlbikge1xuICAgICAgICBpZiAoYXJndW1lbnRzLmxlbmd0aCA+IDEpIHtcbiAgICAgICAgICAgIGZvciAodmFyIGkgPSAwOyBpIDwgYXJndW1lbnRzLmxlbmd0aDsgaSsrKSB7XG4gICAgICAgICAgICAgICAgdGhpcy5hZGQoYXJndW1lbnRzW2ldKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIHJldHVybiB0aGlzO1xuICAgICAgICB9XG4gICAgICAgIHZhciBjaGlsZCA9IGNoaWxkcmVuWzBdO1xuICAgICAgICBpZiAoY2hpbGQuZ2V0UGFyZW50KCkpIHtcbiAgICAgICAgICAgIGNoaWxkLm1vdmVUbyh0aGlzKTtcbiAgICAgICAgICAgIHJldHVybiB0aGlzO1xuICAgICAgICB9XG4gICAgICAgIHRoaXMuX3ZhbGlkYXRlQWRkKGNoaWxkKTtcbiAgICAgICAgY2hpbGQuaW5kZXggPSB0aGlzLmdldENoaWxkcmVuKCkubGVuZ3RoO1xuICAgICAgICBjaGlsZC5wYXJlbnQgPSB0aGlzO1xuICAgICAgICBjaGlsZC5fY2xlYXJDYWNoZXMoKTtcbiAgICAgICAgdGhpcy5nZXRDaGlsZHJlbigpLnB1c2goY2hpbGQpO1xuICAgICAgICB0aGlzLl9maXJlKCdhZGQnLCB7XG4gICAgICAgICAgICBjaGlsZDogY2hpbGQsXG4gICAgICAgIH0pO1xuICAgICAgICB0aGlzLl9yZXF1ZXN0RHJhdygpO1xuICAgICAgICByZXR1cm4gdGhpcztcbiAgICB9XG4gICAgZGVzdHJveSgpIHtcbiAgICAgICAgaWYgKHRoaXMuaGFzQ2hpbGRyZW4oKSkge1xuICAgICAgICAgICAgdGhpcy5kZXN0cm95Q2hpbGRyZW4oKTtcbiAgICAgICAgfVxuICAgICAgICBzdXBlci5kZXN0cm95KCk7XG4gICAgICAgIHJldHVybiB0aGlzO1xuICAgIH1cbiAgICBmaW5kKHNlbGVjdG9yKSB7XG4gICAgICAgIHJldHVybiB0aGlzLl9nZW5lcmFsRmluZChzZWxlY3RvciwgZmFsc2UpO1xuICAgIH1cbiAgICBmaW5kT25lKHNlbGVjdG9yKSB7XG4gICAgICAgIHZhciByZXN1bHQgPSB0aGlzLl9nZW5lcmFsRmluZChzZWxlY3RvciwgdHJ1ZSk7XG4gICAgICAgIHJldHVybiByZXN1bHQubGVuZ3RoID4gMCA/IHJlc3VsdFswXSA6IHVuZGVmaW5lZDtcbiAgICB9XG4gICAgX2dlbmVyYWxGaW5kKHNlbGVjdG9yLCBmaW5kT25lKSB7XG4gICAgICAgIHZhciByZXRBcnIgPSBbXTtcbiAgICAgICAgdGhpcy5fZGVzY2VuZGFudHMoKG5vZGUpID0+IHtcbiAgICAgICAgICAgIGNvbnN0IHZhbGlkID0gbm9kZS5faXNNYXRjaChzZWxlY3Rvcik7XG4gICAgICAgICAgICBpZiAodmFsaWQpIHtcbiAgICAgICAgICAgICAgICByZXRBcnIucHVzaChub2RlKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGlmICh2YWxpZCAmJiBmaW5kT25lKSB7XG4gICAgICAgICAgICAgICAgcmV0dXJuIHRydWU7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICByZXR1cm4gZmFsc2U7XG4gICAgICAgIH0pO1xuICAgICAgICByZXR1cm4gcmV0QXJyO1xuICAgIH1cbiAgICBfZGVzY2VuZGFudHMoZm4pIHtcbiAgICAgICAgbGV0IHNob3VsZFN0b3AgPSBmYWxzZTtcbiAgICAgICAgY29uc3QgY2hpbGRyZW4gPSB0aGlzLmdldENoaWxkcmVuKCk7XG4gICAgICAgIGZvciAoY29uc3QgY2hpbGQgb2YgY2hpbGRyZW4pIHtcbiAgICAgICAgICAgIHNob3VsZFN0b3AgPSBmbihjaGlsZCk7XG4gICAgICAgICAgICBpZiAoc2hvdWxkU3RvcCkge1xuICAgICAgICAgICAgICAgIHJldHVybiB0cnVlO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgaWYgKCFjaGlsZC5oYXNDaGlsZHJlbigpKSB7XG4gICAgICAgICAgICAgICAgY29udGludWU7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBzaG91bGRTdG9wID0gY2hpbGQuX2Rlc2NlbmRhbnRzKGZuKTtcbiAgICAgICAgICAgIGlmIChzaG91bGRTdG9wKSB7XG4gICAgICAgICAgICAgICAgcmV0dXJuIHRydWU7XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuIGZhbHNlO1xuICAgIH1cbiAgICB0b09iamVjdCgpIHtcbiAgICAgICAgdmFyIG9iaiA9IE5vZGUucHJvdG90eXBlLnRvT2JqZWN0LmNhbGwodGhpcyk7XG4gICAgICAgIG9iai5jaGlsZHJlbiA9IFtdO1xuICAgICAgICB0aGlzLmdldENoaWxkcmVuKCkuZm9yRWFjaCgoY2hpbGQpID0+IHtcbiAgICAgICAgICAgIG9iai5jaGlsZHJlbi5wdXNoKGNoaWxkLnRvT2JqZWN0KCkpO1xuICAgICAgICB9KTtcbiAgICAgICAgcmV0dXJuIG9iajtcbiAgICB9XG4gICAgaXNBbmNlc3Rvck9mKG5vZGUpIHtcbiAgICAgICAgdmFyIHBhcmVudCA9IG5vZGUuZ2V0UGFyZW50KCk7XG4gICAgICAgIHdoaWxlIChwYXJlbnQpIHtcbiAgICAgICAgICAgIGlmIChwYXJlbnQuX2lkID09PSB0aGlzLl9pZCkge1xuICAgICAgICAgICAgICAgIHJldHVybiB0cnVlO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgcGFyZW50ID0gcGFyZW50LmdldFBhcmVudCgpO1xuICAgICAgICB9XG4gICAgICAgIHJldHVybiBmYWxzZTtcbiAgICB9XG4gICAgY2xvbmUob2JqKSB7XG4gICAgICAgIHZhciBub2RlID0gTm9kZS5wcm90b3R5cGUuY2xvbmUuY2FsbCh0aGlzLCBvYmopO1xuICAgICAgICB0aGlzLmdldENoaWxkcmVuKCkuZm9yRWFjaChmdW5jdGlvbiAobm8pIHtcbiAgICAgICAgICAgIG5vZGUuYWRkKG5vLmNsb25lKCkpO1xuICAgICAgICB9KTtcbiAgICAgICAgcmV0dXJuIG5vZGU7XG4gICAgfVxuICAgIGdldEFsbEludGVyc2VjdGlvbnMocG9zKSB7XG4gICAgICAgIHZhciBhcnIgPSBbXTtcbiAgICAgICAgdGhpcy5maW5kKCdTaGFwZScpLmZvckVhY2goZnVuY3Rpb24gKHNoYXBlKSB7XG4gICAgICAgICAgICBpZiAoc2hhcGUuaXNWaXNpYmxlKCkgJiYgc2hhcGUuaW50ZXJzZWN0cyhwb3MpKSB7XG4gICAgICAgICAgICAgICAgYXJyLnB1c2goc2hhcGUpO1xuICAgICAgICAgICAgfVxuICAgICAgICB9KTtcbiAgICAgICAgcmV0dXJuIGFycjtcbiAgICB9XG4gICAgX2NsZWFyU2VsZkFuZERlc2NlbmRhbnRDYWNoZShhdHRyKSB7XG4gICAgICAgIHZhciBfYTtcbiAgICAgICAgc3VwZXIuX2NsZWFyU2VsZkFuZERlc2NlbmRhbnRDYWNoZShhdHRyKTtcbiAgICAgICAgaWYgKHRoaXMuaXNDYWNoZWQoKSkge1xuICAgICAgICAgICAgcmV0dXJuO1xuICAgICAgICB9XG4gICAgICAgIChfYSA9IHRoaXMuY2hpbGRyZW4pID09PSBudWxsIHx8IF9hID09PSB2b2lkIDAgPyB2b2lkIDAgOiBfYS5mb3JFYWNoKGZ1bmN0aW9uIChub2RlKSB7XG4gICAgICAgICAgICBub2RlLl9jbGVhclNlbGZBbmREZXNjZW5kYW50Q2FjaGUoYXR0cik7XG4gICAgICAgIH0pO1xuICAgIH1cbiAgICBfc2V0Q2hpbGRyZW5JbmRpY2VzKCkge1xuICAgICAgICB2YXIgX2E7XG4gICAgICAgIChfYSA9IHRoaXMuY2hpbGRyZW4pID09PSBudWxsIHx8IF9hID09PSB2b2lkIDAgPyB2b2lkIDAgOiBfYS5mb3JFYWNoKGZ1bmN0aW9uIChjaGlsZCwgbikge1xuICAgICAgICAgICAgY2hpbGQuaW5kZXggPSBuO1xuICAgICAgICB9KTtcbiAgICAgICAgdGhpcy5fcmVxdWVzdERyYXcoKTtcbiAgICB9XG4gICAgZHJhd1NjZW5lKGNhbiwgdG9wKSB7XG4gICAgICAgIHZhciBsYXllciA9IHRoaXMuZ2V0TGF5ZXIoKSwgY2FudmFzID0gY2FuIHx8IChsYXllciAmJiBsYXllci5nZXRDYW52YXMoKSksIGNvbnRleHQgPSBjYW52YXMgJiYgY2FudmFzLmdldENvbnRleHQoKSwgY2FjaGVkQ2FudmFzID0gdGhpcy5fZ2V0Q2FudmFzQ2FjaGUoKSwgY2FjaGVkU2NlbmVDYW52YXMgPSBjYWNoZWRDYW52YXMgJiYgY2FjaGVkQ2FudmFzLnNjZW5lO1xuICAgICAgICB2YXIgY2FjaGluZyA9IGNhbnZhcyAmJiBjYW52YXMuaXNDYWNoZTtcbiAgICAgICAgaWYgKCF0aGlzLmlzVmlzaWJsZSgpICYmICFjYWNoaW5nKSB7XG4gICAgICAgICAgICByZXR1cm4gdGhpcztcbiAgICAgICAgfVxuICAgICAgICBpZiAoY2FjaGVkU2NlbmVDYW52YXMpIHtcbiAgICAgICAgICAgIGNvbnRleHQuc2F2ZSgpO1xuICAgICAgICAgICAgdmFyIG0gPSB0aGlzLmdldEFic29sdXRlVHJhbnNmb3JtKHRvcCkuZ2V0TWF0cml4KCk7XG4gICAgICAgICAgICBjb250ZXh0LnRyYW5zZm9ybShtWzBdLCBtWzFdLCBtWzJdLCBtWzNdLCBtWzRdLCBtWzVdKTtcbiAgICAgICAgICAgIHRoaXMuX2RyYXdDYWNoZWRTY2VuZUNhbnZhcyhjb250ZXh0KTtcbiAgICAgICAgICAgIGNvbnRleHQucmVzdG9yZSgpO1xuICAgICAgICB9XG4gICAgICAgIGVsc2Uge1xuICAgICAgICAgICAgdGhpcy5fZHJhd0NoaWxkcmVuKCdkcmF3U2NlbmUnLCBjYW52YXMsIHRvcCk7XG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuIHRoaXM7XG4gICAgfVxuICAgIGRyYXdIaXQoY2FuLCB0b3ApIHtcbiAgICAgICAgaWYgKCF0aGlzLnNob3VsZERyYXdIaXQodG9wKSkge1xuICAgICAgICAgICAgcmV0dXJuIHRoaXM7XG4gICAgICAgIH1cbiAgICAgICAgdmFyIGxheWVyID0gdGhpcy5nZXRMYXllcigpLCBjYW52YXMgPSBjYW4gfHwgKGxheWVyICYmIGxheWVyLmhpdENhbnZhcyksIGNvbnRleHQgPSBjYW52YXMgJiYgY2FudmFzLmdldENvbnRleHQoKSwgY2FjaGVkQ2FudmFzID0gdGhpcy5fZ2V0Q2FudmFzQ2FjaGUoKSwgY2FjaGVkSGl0Q2FudmFzID0gY2FjaGVkQ2FudmFzICYmIGNhY2hlZENhbnZhcy5oaXQ7XG4gICAgICAgIGlmIChjYWNoZWRIaXRDYW52YXMpIHtcbiAgICAgICAgICAgIGNvbnRleHQuc2F2ZSgpO1xuICAgICAgICAgICAgdmFyIG0gPSB0aGlzLmdldEFic29sdXRlVHJhbnNmb3JtKHRvcCkuZ2V0TWF0cml4KCk7XG4gICAgICAgICAgICBjb250ZXh0LnRyYW5zZm9ybShtWzBdLCBtWzFdLCBtWzJdLCBtWzNdLCBtWzRdLCBtWzVdKTtcbiAgICAgICAgICAgIHRoaXMuX2RyYXdDYWNoZWRIaXRDYW52YXMoY29udGV4dCk7XG4gICAgICAgICAgICBjb250ZXh0LnJlc3RvcmUoKTtcbiAgICAgICAgfVxuICAgICAgICBlbHNlIHtcbiAgICAgICAgICAgIHRoaXMuX2RyYXdDaGlsZHJlbignZHJhd0hpdCcsIGNhbnZhcywgdG9wKTtcbiAgICAgICAgfVxuICAgICAgICByZXR1cm4gdGhpcztcbiAgICB9XG4gICAgX2RyYXdDaGlsZHJlbihkcmF3TWV0aG9kLCBjYW52YXMsIHRvcCkge1xuICAgICAgICB2YXIgX2E7XG4gICAgICAgIHZhciBjb250ZXh0ID0gY2FudmFzICYmIGNhbnZhcy5nZXRDb250ZXh0KCksIGNsaXBXaWR0aCA9IHRoaXMuY2xpcFdpZHRoKCksIGNsaXBIZWlnaHQgPSB0aGlzLmNsaXBIZWlnaHQoKSwgY2xpcEZ1bmMgPSB0aGlzLmNsaXBGdW5jKCksIGhhc0NsaXAgPSAoY2xpcFdpZHRoICYmIGNsaXBIZWlnaHQpIHx8IGNsaXBGdW5jO1xuICAgICAgICBjb25zdCBzZWxmQ2FjaGUgPSB0b3AgPT09IHRoaXM7XG4gICAgICAgIGlmIChoYXNDbGlwKSB7XG4gICAgICAgICAgICBjb250ZXh0LnNhdmUoKTtcbiAgICAgICAgICAgIHZhciB0cmFuc2Zvcm0gPSB0aGlzLmdldEFic29sdXRlVHJhbnNmb3JtKHRvcCk7XG4gICAgICAgICAgICB2YXIgbSA9IHRyYW5zZm9ybS5nZXRNYXRyaXgoKTtcbiAgICAgICAgICAgIGNvbnRleHQudHJhbnNmb3JtKG1bMF0sIG1bMV0sIG1bMl0sIG1bM10sIG1bNF0sIG1bNV0pO1xuICAgICAgICAgICAgY29udGV4dC5iZWdpblBhdGgoKTtcbiAgICAgICAgICAgIGlmIChjbGlwRnVuYykge1xuICAgICAgICAgICAgICAgIGNsaXBGdW5jLmNhbGwodGhpcywgY29udGV4dCwgdGhpcyk7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBlbHNlIHtcbiAgICAgICAgICAgICAgICB2YXIgY2xpcFggPSB0aGlzLmNsaXBYKCk7XG4gICAgICAgICAgICAgICAgdmFyIGNsaXBZID0gdGhpcy5jbGlwWSgpO1xuICAgICAgICAgICAgICAgIGNvbnRleHQucmVjdChjbGlwWCwgY2xpcFksIGNsaXBXaWR0aCwgY2xpcEhlaWdodCk7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBjb250ZXh0LmNsaXAoKTtcbiAgICAgICAgICAgIG0gPSB0cmFuc2Zvcm0uY29weSgpLmludmVydCgpLmdldE1hdHJpeCgpO1xuICAgICAgICAgICAgY29udGV4dC50cmFuc2Zvcm0obVswXSwgbVsxXSwgbVsyXSwgbVszXSwgbVs0XSwgbVs1XSk7XG4gICAgICAgIH1cbiAgICAgICAgdmFyIGhhc0NvbXBvc2l0aW9uID0gIXNlbGZDYWNoZSAmJlxuICAgICAgICAgICAgdGhpcy5nbG9iYWxDb21wb3NpdGVPcGVyYXRpb24oKSAhPT0gJ3NvdXJjZS1vdmVyJyAmJlxuICAgICAgICAgICAgZHJhd01ldGhvZCA9PT0gJ2RyYXdTY2VuZSc7XG4gICAgICAgIGlmIChoYXNDb21wb3NpdGlvbikge1xuICAgICAgICAgICAgY29udGV4dC5zYXZlKCk7XG4gICAgICAgICAgICBjb250ZXh0Ll9hcHBseUdsb2JhbENvbXBvc2l0ZU9wZXJhdGlvbih0aGlzKTtcbiAgICAgICAgfVxuICAgICAgICAoX2EgPSB0aGlzLmNoaWxkcmVuKSA9PT0gbnVsbCB8fCBfYSA9PT0gdm9pZCAwID8gdm9pZCAwIDogX2EuZm9yRWFjaChmdW5jdGlvbiAoY2hpbGQpIHtcbiAgICAgICAgICAgIGNoaWxkW2RyYXdNZXRob2RdKGNhbnZhcywgdG9wKTtcbiAgICAgICAgfSk7XG4gICAgICAgIGlmIChoYXNDb21wb3NpdGlvbikge1xuICAgICAgICAgICAgY29udGV4dC5yZXN0b3JlKCk7XG4gICAgICAgIH1cbiAgICAgICAgaWYgKGhhc0NsaXApIHtcbiAgICAgICAgICAgIGNvbnRleHQucmVzdG9yZSgpO1xuICAgICAgICB9XG4gICAgfVxuICAgIGdldENsaWVudFJlY3QoY29uZmlnKSB7XG4gICAgICAgIHZhciBfYTtcbiAgICAgICAgY29uZmlnID0gY29uZmlnIHx8IHt9O1xuICAgICAgICB2YXIgc2tpcFRyYW5zZm9ybSA9IGNvbmZpZy5za2lwVHJhbnNmb3JtO1xuICAgICAgICB2YXIgcmVsYXRpdmVUbyA9IGNvbmZpZy5yZWxhdGl2ZVRvO1xuICAgICAgICB2YXIgbWluWCwgbWluWSwgbWF4WCwgbWF4WTtcbiAgICAgICAgdmFyIHNlbGZSZWN0ID0ge1xuICAgICAgICAgICAgeDogSW5maW5pdHksXG4gICAgICAgICAgICB5OiBJbmZpbml0eSxcbiAgICAgICAgICAgIHdpZHRoOiAwLFxuICAgICAgICAgICAgaGVpZ2h0OiAwLFxuICAgICAgICB9O1xuICAgICAgICB2YXIgdGhhdCA9IHRoaXM7XG4gICAgICAgIChfYSA9IHRoaXMuY2hpbGRyZW4pID09PSBudWxsIHx8IF9hID09PSB2b2lkIDAgPyB2b2lkIDAgOiBfYS5mb3JFYWNoKGZ1bmN0aW9uIChjaGlsZCkge1xuICAgICAgICAgICAgaWYgKCFjaGlsZC52aXNpYmxlKCkpIHtcbiAgICAgICAgICAgICAgICByZXR1cm47XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICB2YXIgcmVjdCA9IGNoaWxkLmdldENsaWVudFJlY3Qoe1xuICAgICAgICAgICAgICAgIHJlbGF0aXZlVG86IHRoYXQsXG4gICAgICAgICAgICAgICAgc2tpcFNoYWRvdzogY29uZmlnLnNraXBTaGFkb3csXG4gICAgICAgICAgICAgICAgc2tpcFN0cm9rZTogY29uZmlnLnNraXBTdHJva2UsXG4gICAgICAgICAgICB9KTtcbiAgICAgICAgICAgIGlmIChyZWN0LndpZHRoID09PSAwICYmIHJlY3QuaGVpZ2h0ID09PSAwKSB7XG4gICAgICAgICAgICAgICAgcmV0dXJuO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgaWYgKG1pblggPT09IHVuZGVmaW5lZCkge1xuICAgICAgICAgICAgICAgIG1pblggPSByZWN0Lng7XG4gICAgICAgICAgICAgICAgbWluWSA9IHJlY3QueTtcbiAgICAgICAgICAgICAgICBtYXhYID0gcmVjdC54ICsgcmVjdC53aWR0aDtcbiAgICAgICAgICAgICAgICBtYXhZID0gcmVjdC55ICsgcmVjdC5oZWlnaHQ7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBlbHNlIHtcbiAgICAgICAgICAgICAgICBtaW5YID0gTWF0aC5taW4obWluWCwgcmVjdC54KTtcbiAgICAgICAgICAgICAgICBtaW5ZID0gTWF0aC5taW4obWluWSwgcmVjdC55KTtcbiAgICAgICAgICAgICAgICBtYXhYID0gTWF0aC5tYXgobWF4WCwgcmVjdC54ICsgcmVjdC53aWR0aCk7XG4gICAgICAgICAgICAgICAgbWF4WSA9IE1hdGgubWF4KG1heFksIHJlY3QueSArIHJlY3QuaGVpZ2h0KTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfSk7XG4gICAgICAgIHZhciBzaGFwZXMgPSB0aGlzLmZpbmQoJ1NoYXBlJyk7XG4gICAgICAgIHZhciBoYXNWaXNpYmxlID0gZmFsc2U7XG4gICAgICAgIGZvciAodmFyIGkgPSAwOyBpIDwgc2hhcGVzLmxlbmd0aDsgaSsrKSB7XG4gICAgICAgICAgICB2YXIgc2hhcGUgPSBzaGFwZXNbaV07XG4gICAgICAgICAgICBpZiAoc2hhcGUuX2lzVmlzaWJsZSh0aGlzKSkge1xuICAgICAgICAgICAgICAgIGhhc1Zpc2libGUgPSB0cnVlO1xuICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICAgIGlmIChoYXNWaXNpYmxlICYmIG1pblggIT09IHVuZGVmaW5lZCkge1xuICAgICAgICAgICAgc2VsZlJlY3QgPSB7XG4gICAgICAgICAgICAgICAgeDogbWluWCxcbiAgICAgICAgICAgICAgICB5OiBtaW5ZLFxuICAgICAgICAgICAgICAgIHdpZHRoOiBtYXhYIC0gbWluWCxcbiAgICAgICAgICAgICAgICBoZWlnaHQ6IG1heFkgLSBtaW5ZLFxuICAgICAgICAgICAgfTtcbiAgICAgICAgfVxuICAgICAgICBlbHNlIHtcbiAgICAgICAgICAgIHNlbGZSZWN0ID0ge1xuICAgICAgICAgICAgICAgIHg6IDAsXG4gICAgICAgICAgICAgICAgeTogMCxcbiAgICAgICAgICAgICAgICB3aWR0aDogMCxcbiAgICAgICAgICAgICAgICBoZWlnaHQ6IDAsXG4gICAgICAgICAgICB9O1xuICAgICAgICB9XG4gICAgICAgIGlmICghc2tpcFRyYW5zZm9ybSkge1xuICAgICAgICAgICAgcmV0dXJuIHRoaXMuX3RyYW5zZm9ybWVkUmVjdChzZWxmUmVjdCwgcmVsYXRpdmVUbyk7XG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuIHNlbGZSZWN0O1xuICAgIH1cbn1cbkZhY3RvcnkuYWRkQ29tcG9uZW50c0dldHRlclNldHRlcihDb250YWluZXIsICdjbGlwJywgW1xuICAgICd4JyxcbiAgICAneScsXG4gICAgJ3dpZHRoJyxcbiAgICAnaGVpZ2h0Jyxcbl0pO1xuRmFjdG9yeS5hZGRHZXR0ZXJTZXR0ZXIoQ29udGFpbmVyLCAnY2xpcFgnLCB1bmRlZmluZWQsIGdldE51bWJlclZhbGlkYXRvcigpKTtcbkZhY3RvcnkuYWRkR2V0dGVyU2V0dGVyKENvbnRhaW5lciwgJ2NsaXBZJywgdW5kZWZpbmVkLCBnZXROdW1iZXJWYWxpZGF0b3IoKSk7XG5GYWN0b3J5LmFkZEdldHRlclNldHRlcihDb250YWluZXIsICdjbGlwV2lkdGgnLCB1bmRlZmluZWQsIGdldE51bWJlclZhbGlkYXRvcigpKTtcbkZhY3RvcnkuYWRkR2V0dGVyU2V0dGVyKENvbnRhaW5lciwgJ2NsaXBIZWlnaHQnLCB1bmRlZmluZWQsIGdldE51bWJlclZhbGlkYXRvcigpKTtcbkZhY3RvcnkuYWRkR2V0dGVyU2V0dGVyKENvbnRhaW5lciwgJ2NsaXBGdW5jJyk7XG4iLCJpbXBvcnQgeyBVdGlsIH0gZnJvbSAnLi9VdGlsLmpzJztcbmltcG9ydCB7IEtvbnZhIH0gZnJvbSAnLi9HbG9iYWwuanMnO1xuZnVuY3Rpb24gc2ltcGxpZnlBcnJheShhcnIpIHtcbiAgICB2YXIgcmV0QXJyID0gW10sIGxlbiA9IGFyci5sZW5ndGgsIHV0aWwgPSBVdGlsLCBuLCB2YWw7XG4gICAgZm9yIChuID0gMDsgbiA8IGxlbjsgbisrKSB7XG4gICAgICAgIHZhbCA9IGFycltuXTtcbiAgICAgICAgaWYgKHV0aWwuX2lzTnVtYmVyKHZhbCkpIHtcbiAgICAgICAgICAgIHZhbCA9IE1hdGgucm91bmQodmFsICogMTAwMCkgLyAxMDAwO1xuICAgICAgICB9XG4gICAgICAgIGVsc2UgaWYgKCF1dGlsLl9pc1N0cmluZyh2YWwpKSB7XG4gICAgICAgICAgICB2YWwgPSB2YWwgKyAnJztcbiAgICAgICAgfVxuICAgICAgICByZXRBcnIucHVzaCh2YWwpO1xuICAgIH1cbiAgICByZXR1cm4gcmV0QXJyO1xufVxudmFyIENPTU1BID0gJywnLCBPUEVOX1BBUkVOID0gJygnLCBDTE9TRV9QQVJFTiA9ICcpJywgT1BFTl9QQVJFTl9CUkFDS0VUID0gJyhbJywgQ0xPU0VfQlJBQ0tFVF9QQVJFTiA9ICddKScsIFNFTUlDT0xPTiA9ICc7JywgRE9VQkxFX1BBUkVOID0gJygpJywgRVFVQUxTID0gJz0nLCBDT05URVhUX01FVEhPRFMgPSBbXG4gICAgJ2FyYycsXG4gICAgJ2FyY1RvJyxcbiAgICAnYmVnaW5QYXRoJyxcbiAgICAnYmV6aWVyQ3VydmVUbycsXG4gICAgJ2NsZWFyUmVjdCcsXG4gICAgJ2NsaXAnLFxuICAgICdjbG9zZVBhdGgnLFxuICAgICdjcmVhdGVMaW5lYXJHcmFkaWVudCcsXG4gICAgJ2NyZWF0ZVBhdHRlcm4nLFxuICAgICdjcmVhdGVSYWRpYWxHcmFkaWVudCcsXG4gICAgJ2RyYXdJbWFnZScsXG4gICAgJ2VsbGlwc2UnLFxuICAgICdmaWxsJyxcbiAgICAnZmlsbFRleHQnLFxuICAgICdnZXRJbWFnZURhdGEnLFxuICAgICdjcmVhdGVJbWFnZURhdGEnLFxuICAgICdsaW5lVG8nLFxuICAgICdtb3ZlVG8nLFxuICAgICdwdXRJbWFnZURhdGEnLFxuICAgICdxdWFkcmF0aWNDdXJ2ZVRvJyxcbiAgICAncmVjdCcsXG4gICAgJ3Jlc3RvcmUnLFxuICAgICdyb3RhdGUnLFxuICAgICdzYXZlJyxcbiAgICAnc2NhbGUnLFxuICAgICdzZXRMaW5lRGFzaCcsXG4gICAgJ3NldFRyYW5zZm9ybScsXG4gICAgJ3N0cm9rZScsXG4gICAgJ3N0cm9rZVRleHQnLFxuICAgICd0cmFuc2Zvcm0nLFxuICAgICd0cmFuc2xhdGUnLFxuXTtcbnZhciBDT05URVhUX1BST1BFUlRJRVMgPSBbXG4gICAgJ2ZpbGxTdHlsZScsXG4gICAgJ3N0cm9rZVN0eWxlJyxcbiAgICAnc2hhZG93Q29sb3InLFxuICAgICdzaGFkb3dCbHVyJyxcbiAgICAnc2hhZG93T2Zmc2V0WCcsXG4gICAgJ3NoYWRvd09mZnNldFknLFxuICAgICdsaW5lQ2FwJyxcbiAgICAnbGluZURhc2hPZmZzZXQnLFxuICAgICdsaW5lSm9pbicsXG4gICAgJ2xpbmVXaWR0aCcsXG4gICAgJ21pdGVyTGltaXQnLFxuICAgICdmb250JyxcbiAgICAndGV4dEFsaWduJyxcbiAgICAndGV4dEJhc2VsaW5lJyxcbiAgICAnZ2xvYmFsQWxwaGEnLFxuICAgICdnbG9iYWxDb21wb3NpdGVPcGVyYXRpb24nLFxuICAgICdpbWFnZVNtb290aGluZ0VuYWJsZWQnLFxuXTtcbmNvbnN0IHRyYWNlQXJyTWF4ID0gMTAwO1xuZXhwb3J0IGNsYXNzIENvbnRleHQge1xuICAgIGNvbnN0cnVjdG9yKGNhbnZhcykge1xuICAgICAgICB0aGlzLmNhbnZhcyA9IGNhbnZhcztcbiAgICAgICAgaWYgKEtvbnZhLmVuYWJsZVRyYWNlKSB7XG4gICAgICAgICAgICB0aGlzLnRyYWNlQXJyID0gW107XG4gICAgICAgICAgICB0aGlzLl9lbmFibGVUcmFjZSgpO1xuICAgICAgICB9XG4gICAgfVxuICAgIGZpbGxTaGFwZShzaGFwZSkge1xuICAgICAgICBpZiAoc2hhcGUuZmlsbEVuYWJsZWQoKSkge1xuICAgICAgICAgICAgdGhpcy5fZmlsbChzaGFwZSk7XG4gICAgICAgIH1cbiAgICB9XG4gICAgX2ZpbGwoc2hhcGUpIHtcbiAgICB9XG4gICAgc3Ryb2tlU2hhcGUoc2hhcGUpIHtcbiAgICAgICAgaWYgKHNoYXBlLmhhc1N0cm9rZSgpKSB7XG4gICAgICAgICAgICB0aGlzLl9zdHJva2Uoc2hhcGUpO1xuICAgICAgICB9XG4gICAgfVxuICAgIF9zdHJva2Uoc2hhcGUpIHtcbiAgICB9XG4gICAgZmlsbFN0cm9rZVNoYXBlKHNoYXBlKSB7XG4gICAgICAgIGlmIChzaGFwZS5hdHRycy5maWxsQWZ0ZXJTdHJva2VFbmFibGVkKSB7XG4gICAgICAgICAgICB0aGlzLnN0cm9rZVNoYXBlKHNoYXBlKTtcbiAgICAgICAgICAgIHRoaXMuZmlsbFNoYXBlKHNoYXBlKTtcbiAgICAgICAgfVxuICAgICAgICBlbHNlIHtcbiAgICAgICAgICAgIHRoaXMuZmlsbFNoYXBlKHNoYXBlKTtcbiAgICAgICAgICAgIHRoaXMuc3Ryb2tlU2hhcGUoc2hhcGUpO1xuICAgICAgICB9XG4gICAgfVxuICAgIGdldFRyYWNlKHJlbGF4ZWQsIHJvdW5kZWQpIHtcbiAgICAgICAgdmFyIHRyYWNlQXJyID0gdGhpcy50cmFjZUFyciwgbGVuID0gdHJhY2VBcnIubGVuZ3RoLCBzdHIgPSAnJywgbiwgdHJhY2UsIG1ldGhvZCwgYXJncztcbiAgICAgICAgZm9yIChuID0gMDsgbiA8IGxlbjsgbisrKSB7XG4gICAgICAgICAgICB0cmFjZSA9IHRyYWNlQXJyW25dO1xuICAgICAgICAgICAgbWV0aG9kID0gdHJhY2UubWV0aG9kO1xuICAgICAgICAgICAgaWYgKG1ldGhvZCkge1xuICAgICAgICAgICAgICAgIGFyZ3MgPSB0cmFjZS5hcmdzO1xuICAgICAgICAgICAgICAgIHN0ciArPSBtZXRob2Q7XG4gICAgICAgICAgICAgICAgaWYgKHJlbGF4ZWQpIHtcbiAgICAgICAgICAgICAgICAgICAgc3RyICs9IERPVUJMRV9QQVJFTjtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgZWxzZSB7XG4gICAgICAgICAgICAgICAgICAgIGlmIChVdGlsLl9pc0FycmF5KGFyZ3NbMF0pKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICBzdHIgKz0gT1BFTl9QQVJFTl9CUkFDS0VUICsgYXJncy5qb2luKENPTU1BKSArIENMT1NFX0JSQUNLRVRfUEFSRU47XG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgZWxzZSB7XG4gICAgICAgICAgICAgICAgICAgICAgICBpZiAocm91bmRlZCkge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGFyZ3MgPSBhcmdzLm1hcCgoYSkgPT4gdHlwZW9mIGEgPT09ICdudW1iZXInID8gTWF0aC5mbG9vcihhKSA6IGEpO1xuICAgICAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICAgICAgc3RyICs9IE9QRU5fUEFSRU4gKyBhcmdzLmpvaW4oQ09NTUEpICsgQ0xPU0VfUEFSRU47XG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBlbHNlIHtcbiAgICAgICAgICAgICAgICBzdHIgKz0gdHJhY2UucHJvcGVydHk7XG4gICAgICAgICAgICAgICAgaWYgKCFyZWxheGVkKSB7XG4gICAgICAgICAgICAgICAgICAgIHN0ciArPSBFUVVBTFMgKyB0cmFjZS52YWw7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfVxuICAgICAgICAgICAgc3RyICs9IFNFTUlDT0xPTjtcbiAgICAgICAgfVxuICAgICAgICByZXR1cm4gc3RyO1xuICAgIH1cbiAgICBjbGVhclRyYWNlKCkge1xuICAgICAgICB0aGlzLnRyYWNlQXJyID0gW107XG4gICAgfVxuICAgIF90cmFjZShzdHIpIHtcbiAgICAgICAgdmFyIHRyYWNlQXJyID0gdGhpcy50cmFjZUFyciwgbGVuO1xuICAgICAgICB0cmFjZUFyci5wdXNoKHN0cik7XG4gICAgICAgIGxlbiA9IHRyYWNlQXJyLmxlbmd0aDtcbiAgICAgICAgaWYgKGxlbiA+PSB0cmFjZUFyck1heCkge1xuICAgICAgICAgICAgdHJhY2VBcnIuc2hpZnQoKTtcbiAgICAgICAgfVxuICAgIH1cbiAgICByZXNldCgpIHtcbiAgICAgICAgdmFyIHBpeGVsUmF0aW8gPSB0aGlzLmdldENhbnZhcygpLmdldFBpeGVsUmF0aW8oKTtcbiAgICAgICAgdGhpcy5zZXRUcmFuc2Zvcm0oMSAqIHBpeGVsUmF0aW8sIDAsIDAsIDEgKiBwaXhlbFJhdGlvLCAwLCAwKTtcbiAgICB9XG4gICAgZ2V0Q2FudmFzKCkge1xuICAgICAgICByZXR1cm4gdGhpcy5jYW52YXM7XG4gICAgfVxuICAgIGNsZWFyKGJvdW5kcykge1xuICAgICAgICB2YXIgY2FudmFzID0gdGhpcy5nZXRDYW52YXMoKTtcbiAgICAgICAgaWYgKGJvdW5kcykge1xuICAgICAgICAgICAgdGhpcy5jbGVhclJlY3QoYm91bmRzLnggfHwgMCwgYm91bmRzLnkgfHwgMCwgYm91bmRzLndpZHRoIHx8IDAsIGJvdW5kcy5oZWlnaHQgfHwgMCk7XG4gICAgICAgIH1cbiAgICAgICAgZWxzZSB7XG4gICAgICAgICAgICB0aGlzLmNsZWFyUmVjdCgwLCAwLCBjYW52YXMuZ2V0V2lkdGgoKSAvIGNhbnZhcy5waXhlbFJhdGlvLCBjYW52YXMuZ2V0SGVpZ2h0KCkgLyBjYW52YXMucGl4ZWxSYXRpbyk7XG4gICAgICAgIH1cbiAgICB9XG4gICAgX2FwcGx5TGluZUNhcChzaGFwZSkge1xuICAgICAgICB2YXIgbGluZUNhcCA9IHNoYXBlLmdldExpbmVDYXAoKTtcbiAgICAgICAgaWYgKGxpbmVDYXApIHtcbiAgICAgICAgICAgIHRoaXMuc2V0QXR0cignbGluZUNhcCcsIGxpbmVDYXApO1xuICAgICAgICB9XG4gICAgfVxuICAgIF9hcHBseU9wYWNpdHkoc2hhcGUpIHtcbiAgICAgICAgdmFyIGFic09wYWNpdHkgPSBzaGFwZS5nZXRBYnNvbHV0ZU9wYWNpdHkoKTtcbiAgICAgICAgaWYgKGFic09wYWNpdHkgIT09IDEpIHtcbiAgICAgICAgICAgIHRoaXMuc2V0QXR0cignZ2xvYmFsQWxwaGEnLCBhYnNPcGFjaXR5KTtcbiAgICAgICAgfVxuICAgIH1cbiAgICBfYXBwbHlMaW5lSm9pbihzaGFwZSkge1xuICAgICAgICB2YXIgbGluZUpvaW4gPSBzaGFwZS5hdHRycy5saW5lSm9pbjtcbiAgICAgICAgaWYgKGxpbmVKb2luKSB7XG4gICAgICAgICAgICB0aGlzLnNldEF0dHIoJ2xpbmVKb2luJywgbGluZUpvaW4pO1xuICAgICAgICB9XG4gICAgfVxuICAgIHNldEF0dHIoYXR0ciwgdmFsKSB7XG4gICAgICAgIHRoaXMuX2NvbnRleHRbYXR0cl0gPSB2YWw7XG4gICAgfVxuICAgIGFyYyhhMCwgYTEsIGEyLCBhMywgYTQsIGE1KSB7XG4gICAgICAgIHRoaXMuX2NvbnRleHQuYXJjKGEwLCBhMSwgYTIsIGEzLCBhNCwgYTUpO1xuICAgIH1cbiAgICBhcmNUbyhhMCwgYTEsIGEyLCBhMywgYTQpIHtcbiAgICAgICAgdGhpcy5fY29udGV4dC5hcmNUbyhhMCwgYTEsIGEyLCBhMywgYTQpO1xuICAgIH1cbiAgICBiZWdpblBhdGgoKSB7XG4gICAgICAgIHRoaXMuX2NvbnRleHQuYmVnaW5QYXRoKCk7XG4gICAgfVxuICAgIGJlemllckN1cnZlVG8oYTAsIGExLCBhMiwgYTMsIGE0LCBhNSkge1xuICAgICAgICB0aGlzLl9jb250ZXh0LmJlemllckN1cnZlVG8oYTAsIGExLCBhMiwgYTMsIGE0LCBhNSk7XG4gICAgfVxuICAgIGNsZWFyUmVjdChhMCwgYTEsIGEyLCBhMykge1xuICAgICAgICB0aGlzLl9jb250ZXh0LmNsZWFyUmVjdChhMCwgYTEsIGEyLCBhMyk7XG4gICAgfVxuICAgIGNsaXAoKSB7XG4gICAgICAgIHRoaXMuX2NvbnRleHQuY2xpcCgpO1xuICAgIH1cbiAgICBjbG9zZVBhdGgoKSB7XG4gICAgICAgIHRoaXMuX2NvbnRleHQuY2xvc2VQYXRoKCk7XG4gICAgfVxuICAgIGNyZWF0ZUltYWdlRGF0YShhMCwgYTEpIHtcbiAgICAgICAgdmFyIGEgPSBhcmd1bWVudHM7XG4gICAgICAgIGlmIChhLmxlbmd0aCA9PT0gMikge1xuICAgICAgICAgICAgcmV0dXJuIHRoaXMuX2NvbnRleHQuY3JlYXRlSW1hZ2VEYXRhKGEwLCBhMSk7XG4gICAgICAgIH1cbiAgICAgICAgZWxzZSBpZiAoYS5sZW5ndGggPT09IDEpIHtcbiAgICAgICAgICAgIHJldHVybiB0aGlzLl9jb250ZXh0LmNyZWF0ZUltYWdlRGF0YShhMCk7XG4gICAgICAgIH1cbiAgICB9XG4gICAgY3JlYXRlTGluZWFyR3JhZGllbnQoYTAsIGExLCBhMiwgYTMpIHtcbiAgICAgICAgcmV0dXJuIHRoaXMuX2NvbnRleHQuY3JlYXRlTGluZWFyR3JhZGllbnQoYTAsIGExLCBhMiwgYTMpO1xuICAgIH1cbiAgICBjcmVhdGVQYXR0ZXJuKGEwLCBhMSkge1xuICAgICAgICByZXR1cm4gdGhpcy5fY29udGV4dC5jcmVhdGVQYXR0ZXJuKGEwLCBhMSk7XG4gICAgfVxuICAgIGNyZWF0ZVJhZGlhbEdyYWRpZW50KGEwLCBhMSwgYTIsIGEzLCBhNCwgYTUpIHtcbiAgICAgICAgcmV0dXJuIHRoaXMuX2NvbnRleHQuY3JlYXRlUmFkaWFsR3JhZGllbnQoYTAsIGExLCBhMiwgYTMsIGE0LCBhNSk7XG4gICAgfVxuICAgIGRyYXdJbWFnZShhMCwgYTEsIGEyLCBhMywgYTQsIGE1LCBhNiwgYTcsIGE4KSB7XG4gICAgICAgIHZhciBhID0gYXJndW1lbnRzLCBfY29udGV4dCA9IHRoaXMuX2NvbnRleHQ7XG4gICAgICAgIGlmIChhLmxlbmd0aCA9PT0gMykge1xuICAgICAgICAgICAgX2NvbnRleHQuZHJhd0ltYWdlKGEwLCBhMSwgYTIpO1xuICAgICAgICB9XG4gICAgICAgIGVsc2UgaWYgKGEubGVuZ3RoID09PSA1KSB7XG4gICAgICAgICAgICBfY29udGV4dC5kcmF3SW1hZ2UoYTAsIGExLCBhMiwgYTMsIGE0KTtcbiAgICAgICAgfVxuICAgICAgICBlbHNlIGlmIChhLmxlbmd0aCA9PT0gOSkge1xuICAgICAgICAgICAgX2NvbnRleHQuZHJhd0ltYWdlKGEwLCBhMSwgYTIsIGEzLCBhNCwgYTUsIGE2LCBhNywgYTgpO1xuICAgICAgICB9XG4gICAgfVxuICAgIGVsbGlwc2UoYTAsIGExLCBhMiwgYTMsIGE0LCBhNSwgYTYsIGE3KSB7XG4gICAgICAgIHRoaXMuX2NvbnRleHQuZWxsaXBzZShhMCwgYTEsIGEyLCBhMywgYTQsIGE1LCBhNiwgYTcpO1xuICAgIH1cbiAgICBpc1BvaW50SW5QYXRoKHgsIHksIHBhdGgsIGZpbGxSdWxlKSB7XG4gICAgICAgIGlmIChwYXRoKSB7XG4gICAgICAgICAgICByZXR1cm4gdGhpcy5fY29udGV4dC5pc1BvaW50SW5QYXRoKHBhdGgsIHgsIHksIGZpbGxSdWxlKTtcbiAgICAgICAgfVxuICAgICAgICByZXR1cm4gdGhpcy5fY29udGV4dC5pc1BvaW50SW5QYXRoKHgsIHksIGZpbGxSdWxlKTtcbiAgICB9XG4gICAgZmlsbChwYXRoMmQpIHtcbiAgICAgICAgaWYgKHBhdGgyZCkge1xuICAgICAgICAgICAgdGhpcy5fY29udGV4dC5maWxsKHBhdGgyZCk7XG4gICAgICAgIH1cbiAgICAgICAgZWxzZSB7XG4gICAgICAgICAgICB0aGlzLl9jb250ZXh0LmZpbGwoKTtcbiAgICAgICAgfVxuICAgIH1cbiAgICBmaWxsUmVjdCh4LCB5LCB3aWR0aCwgaGVpZ2h0KSB7XG4gICAgICAgIHRoaXMuX2NvbnRleHQuZmlsbFJlY3QoeCwgeSwgd2lkdGgsIGhlaWdodCk7XG4gICAgfVxuICAgIHN0cm9rZVJlY3QoeCwgeSwgd2lkdGgsIGhlaWdodCkge1xuICAgICAgICB0aGlzLl9jb250ZXh0LnN0cm9rZVJlY3QoeCwgeSwgd2lkdGgsIGhlaWdodCk7XG4gICAgfVxuICAgIGZpbGxUZXh0KHRleHQsIHgsIHksIG1heFdpZHRoKSB7XG4gICAgICAgIGlmIChtYXhXaWR0aCkge1xuICAgICAgICAgICAgdGhpcy5fY29udGV4dC5maWxsVGV4dCh0ZXh0LCB4LCB5LCBtYXhXaWR0aCk7XG4gICAgICAgIH1cbiAgICAgICAgZWxzZSB7XG4gICAgICAgICAgICB0aGlzLl9jb250ZXh0LmZpbGxUZXh0KHRleHQsIHgsIHkpO1xuICAgICAgICB9XG4gICAgfVxuICAgIG1lYXN1cmVUZXh0KHRleHQpIHtcbiAgICAgICAgcmV0dXJuIHRoaXMuX2NvbnRleHQubWVhc3VyZVRleHQodGV4dCk7XG4gICAgfVxuICAgIGdldEltYWdlRGF0YShhMCwgYTEsIGEyLCBhMykge1xuICAgICAgICByZXR1cm4gdGhpcy5fY29udGV4dC5nZXRJbWFnZURhdGEoYTAsIGExLCBhMiwgYTMpO1xuICAgIH1cbiAgICBsaW5lVG8oYTAsIGExKSB7XG4gICAgICAgIHRoaXMuX2NvbnRleHQubGluZVRvKGEwLCBhMSk7XG4gICAgfVxuICAgIG1vdmVUbyhhMCwgYTEpIHtcbiAgICAgICAgdGhpcy5fY29udGV4dC5tb3ZlVG8oYTAsIGExKTtcbiAgICB9XG4gICAgcmVjdChhMCwgYTEsIGEyLCBhMykge1xuICAgICAgICB0aGlzLl9jb250ZXh0LnJlY3QoYTAsIGExLCBhMiwgYTMpO1xuICAgIH1cbiAgICBwdXRJbWFnZURhdGEoYTAsIGExLCBhMikge1xuICAgICAgICB0aGlzLl9jb250ZXh0LnB1dEltYWdlRGF0YShhMCwgYTEsIGEyKTtcbiAgICB9XG4gICAgcXVhZHJhdGljQ3VydmVUbyhhMCwgYTEsIGEyLCBhMykge1xuICAgICAgICB0aGlzLl9jb250ZXh0LnF1YWRyYXRpY0N1cnZlVG8oYTAsIGExLCBhMiwgYTMpO1xuICAgIH1cbiAgICByZXN0b3JlKCkge1xuICAgICAgICB0aGlzLl9jb250ZXh0LnJlc3RvcmUoKTtcbiAgICB9XG4gICAgcm90YXRlKGEwKSB7XG4gICAgICAgIHRoaXMuX2NvbnRleHQucm90YXRlKGEwKTtcbiAgICB9XG4gICAgc2F2ZSgpIHtcbiAgICAgICAgdGhpcy5fY29udGV4dC5zYXZlKCk7XG4gICAgfVxuICAgIHNjYWxlKGEwLCBhMSkge1xuICAgICAgICB0aGlzLl9jb250ZXh0LnNjYWxlKGEwLCBhMSk7XG4gICAgfVxuICAgIHNldExpbmVEYXNoKGEwKSB7XG4gICAgICAgIGlmICh0aGlzLl9jb250ZXh0LnNldExpbmVEYXNoKSB7XG4gICAgICAgICAgICB0aGlzLl9jb250ZXh0LnNldExpbmVEYXNoKGEwKTtcbiAgICAgICAgfVxuICAgICAgICBlbHNlIGlmICgnbW96RGFzaCcgaW4gdGhpcy5fY29udGV4dCkge1xuICAgICAgICAgICAgdGhpcy5fY29udGV4dFsnbW96RGFzaCddID0gYTA7XG4gICAgICAgIH1cbiAgICAgICAgZWxzZSBpZiAoJ3dlYmtpdExpbmVEYXNoJyBpbiB0aGlzLl9jb250ZXh0KSB7XG4gICAgICAgICAgICB0aGlzLl9jb250ZXh0Wyd3ZWJraXRMaW5lRGFzaCddID0gYTA7XG4gICAgICAgIH1cbiAgICB9XG4gICAgZ2V0TGluZURhc2goKSB7XG4gICAgICAgIHJldHVybiB0aGlzLl9jb250ZXh0LmdldExpbmVEYXNoKCk7XG4gICAgfVxuICAgIHNldFRyYW5zZm9ybShhMCwgYTEsIGEyLCBhMywgYTQsIGE1KSB7XG4gICAgICAgIHRoaXMuX2NvbnRleHQuc2V0VHJhbnNmb3JtKGEwLCBhMSwgYTIsIGEzLCBhNCwgYTUpO1xuICAgIH1cbiAgICBzdHJva2UocGF0aDJkKSB7XG4gICAgICAgIGlmIChwYXRoMmQpIHtcbiAgICAgICAgICAgIHRoaXMuX2NvbnRleHQuc3Ryb2tlKHBhdGgyZCk7XG4gICAgICAgIH1cbiAgICAgICAgZWxzZSB7XG4gICAgICAgICAgICB0aGlzLl9jb250ZXh0LnN0cm9rZSgpO1xuICAgICAgICB9XG4gICAgfVxuICAgIHN0cm9rZVRleHQoYTAsIGExLCBhMiwgYTMpIHtcbiAgICAgICAgdGhpcy5fY29udGV4dC5zdHJva2VUZXh0KGEwLCBhMSwgYTIsIGEzKTtcbiAgICB9XG4gICAgdHJhbnNmb3JtKGEwLCBhMSwgYTIsIGEzLCBhNCwgYTUpIHtcbiAgICAgICAgdGhpcy5fY29udGV4dC50cmFuc2Zvcm0oYTAsIGExLCBhMiwgYTMsIGE0LCBhNSk7XG4gICAgfVxuICAgIHRyYW5zbGF0ZShhMCwgYTEpIHtcbiAgICAgICAgdGhpcy5fY29udGV4dC50cmFuc2xhdGUoYTAsIGExKTtcbiAgICB9XG4gICAgX2VuYWJsZVRyYWNlKCkge1xuICAgICAgICB2YXIgdGhhdCA9IHRoaXMsIGxlbiA9IENPTlRFWFRfTUVUSE9EUy5sZW5ndGgsIG9yaWdTZXR0ZXIgPSB0aGlzLnNldEF0dHIsIG4sIGFyZ3M7XG4gICAgICAgIHZhciBmdW5jID0gZnVuY3Rpb24gKG1ldGhvZE5hbWUpIHtcbiAgICAgICAgICAgIHZhciBvcmlnTWV0aG9kID0gdGhhdFttZXRob2ROYW1lXSwgcmV0O1xuICAgICAgICAgICAgdGhhdFttZXRob2ROYW1lXSA9IGZ1bmN0aW9uICgpIHtcbiAgICAgICAgICAgICAgICBhcmdzID0gc2ltcGxpZnlBcnJheShBcnJheS5wcm90b3R5cGUuc2xpY2UuY2FsbChhcmd1bWVudHMsIDApKTtcbiAgICAgICAgICAgICAgICByZXQgPSBvcmlnTWV0aG9kLmFwcGx5KHRoYXQsIGFyZ3VtZW50cyk7XG4gICAgICAgICAgICAgICAgdGhhdC5fdHJhY2Uoe1xuICAgICAgICAgICAgICAgICAgICBtZXRob2Q6IG1ldGhvZE5hbWUsXG4gICAgICAgICAgICAgICAgICAgIGFyZ3M6IGFyZ3MsXG4gICAgICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICAgICAgcmV0dXJuIHJldDtcbiAgICAgICAgICAgIH07XG4gICAgICAgIH07XG4gICAgICAgIGZvciAobiA9IDA7IG4gPCBsZW47IG4rKykge1xuICAgICAgICAgICAgZnVuYyhDT05URVhUX01FVEhPRFNbbl0pO1xuICAgICAgICB9XG4gICAgICAgIHRoYXQuc2V0QXR0ciA9IGZ1bmN0aW9uICgpIHtcbiAgICAgICAgICAgIG9yaWdTZXR0ZXIuYXBwbHkodGhhdCwgYXJndW1lbnRzKTtcbiAgICAgICAgICAgIHZhciBwcm9wID0gYXJndW1lbnRzWzBdO1xuICAgICAgICAgICAgdmFyIHZhbCA9IGFyZ3VtZW50c1sxXTtcbiAgICAgICAgICAgIGlmIChwcm9wID09PSAnc2hhZG93T2Zmc2V0WCcgfHxcbiAgICAgICAgICAgICAgICBwcm9wID09PSAnc2hhZG93T2Zmc2V0WScgfHxcbiAgICAgICAgICAgICAgICBwcm9wID09PSAnc2hhZG93Qmx1cicpIHtcbiAgICAgICAgICAgICAgICB2YWwgPSB2YWwgLyB0aGlzLmNhbnZhcy5nZXRQaXhlbFJhdGlvKCk7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICB0aGF0Ll90cmFjZSh7XG4gICAgICAgICAgICAgICAgcHJvcGVydHk6IHByb3AsXG4gICAgICAgICAgICAgICAgdmFsOiB2YWwsXG4gICAgICAgICAgICB9KTtcbiAgICAgICAgfTtcbiAgICB9XG4gICAgX2FwcGx5R2xvYmFsQ29tcG9zaXRlT3BlcmF0aW9uKG5vZGUpIHtcbiAgICAgICAgY29uc3Qgb3AgPSBub2RlLmF0dHJzLmdsb2JhbENvbXBvc2l0ZU9wZXJhdGlvbjtcbiAgICAgICAgdmFyIGRlZiA9ICFvcCB8fCBvcCA9PT0gJ3NvdXJjZS1vdmVyJztcbiAgICAgICAgaWYgKCFkZWYpIHtcbiAgICAgICAgICAgIHRoaXMuc2V0QXR0cignZ2xvYmFsQ29tcG9zaXRlT3BlcmF0aW9uJywgb3ApO1xuICAgICAgICB9XG4gICAgfVxufVxuO1xuQ09OVEVYVF9QUk9QRVJUSUVTLmZvckVhY2goZnVuY3Rpb24gKHByb3ApIHtcbiAgICBPYmplY3QuZGVmaW5lUHJvcGVydHkoQ29udGV4dC5wcm90b3R5cGUsIHByb3AsIHtcbiAgICAgICAgZ2V0KCkge1xuICAgICAgICAgICAgcmV0dXJuIHRoaXMuX2NvbnRleHRbcHJvcF07XG4gICAgICAgIH0sXG4gICAgICAgIHNldCh2YWwpIHtcbiAgICAgICAgICAgIHRoaXMuX2NvbnRleHRbcHJvcF0gPSB2YWw7XG4gICAgICAgIH0sXG4gICAgfSk7XG59KTtcbmV4cG9ydCBjbGFzcyBTY2VuZUNvbnRleHQgZXh0ZW5kcyBDb250ZXh0IHtcbiAgICBjb25zdHJ1Y3RvcihjYW52YXMpIHtcbiAgICAgICAgc3VwZXIoY2FudmFzKTtcbiAgICAgICAgdGhpcy5fY29udGV4dCA9IGNhbnZhcy5fY2FudmFzLmdldENvbnRleHQoJzJkJyk7XG4gICAgfVxuICAgIF9maWxsQ29sb3Ioc2hhcGUpIHtcbiAgICAgICAgdmFyIGZpbGwgPSBzaGFwZS5maWxsKCk7XG4gICAgICAgIHRoaXMuc2V0QXR0cignZmlsbFN0eWxlJywgZmlsbCk7XG4gICAgICAgIHNoYXBlLl9maWxsRnVuYyh0aGlzKTtcbiAgICB9XG4gICAgX2ZpbGxQYXR0ZXJuKHNoYXBlKSB7XG4gICAgICAgIHRoaXMuc2V0QXR0cignZmlsbFN0eWxlJywgc2hhcGUuX2dldEZpbGxQYXR0ZXJuKCkpO1xuICAgICAgICBzaGFwZS5fZmlsbEZ1bmModGhpcyk7XG4gICAgfVxuICAgIF9maWxsTGluZWFyR3JhZGllbnQoc2hhcGUpIHtcbiAgICAgICAgdmFyIGdyZCA9IHNoYXBlLl9nZXRMaW5lYXJHcmFkaWVudCgpO1xuICAgICAgICBpZiAoZ3JkKSB7XG4gICAgICAgICAgICB0aGlzLnNldEF0dHIoJ2ZpbGxTdHlsZScsIGdyZCk7XG4gICAgICAgICAgICBzaGFwZS5fZmlsbEZ1bmModGhpcyk7XG4gICAgICAgIH1cbiAgICB9XG4gICAgX2ZpbGxSYWRpYWxHcmFkaWVudChzaGFwZSkge1xuICAgICAgICB2YXIgZ3JkID0gc2hhcGUuX2dldFJhZGlhbEdyYWRpZW50KCk7XG4gICAgICAgIGlmIChncmQpIHtcbiAgICAgICAgICAgIHRoaXMuc2V0QXR0cignZmlsbFN0eWxlJywgZ3JkKTtcbiAgICAgICAgICAgIHNoYXBlLl9maWxsRnVuYyh0aGlzKTtcbiAgICAgICAgfVxuICAgIH1cbiAgICBfZmlsbChzaGFwZSkge1xuICAgICAgICB2YXIgaGFzQ29sb3IgPSBzaGFwZS5maWxsKCksIGZpbGxQcmlvcml0eSA9IHNoYXBlLmdldEZpbGxQcmlvcml0eSgpO1xuICAgICAgICBpZiAoaGFzQ29sb3IgJiYgZmlsbFByaW9yaXR5ID09PSAnY29sb3InKSB7XG4gICAgICAgICAgICB0aGlzLl9maWxsQ29sb3Ioc2hhcGUpO1xuICAgICAgICAgICAgcmV0dXJuO1xuICAgICAgICB9XG4gICAgICAgIHZhciBoYXNQYXR0ZXJuID0gc2hhcGUuZ2V0RmlsbFBhdHRlcm5JbWFnZSgpO1xuICAgICAgICBpZiAoaGFzUGF0dGVybiAmJiBmaWxsUHJpb3JpdHkgPT09ICdwYXR0ZXJuJykge1xuICAgICAgICAgICAgdGhpcy5fZmlsbFBhdHRlcm4oc2hhcGUpO1xuICAgICAgICAgICAgcmV0dXJuO1xuICAgICAgICB9XG4gICAgICAgIHZhciBoYXNMaW5lYXJHcmFkaWVudCA9IHNoYXBlLmdldEZpbGxMaW5lYXJHcmFkaWVudENvbG9yU3RvcHMoKTtcbiAgICAgICAgaWYgKGhhc0xpbmVhckdyYWRpZW50ICYmIGZpbGxQcmlvcml0eSA9PT0gJ2xpbmVhci1ncmFkaWVudCcpIHtcbiAgICAgICAgICAgIHRoaXMuX2ZpbGxMaW5lYXJHcmFkaWVudChzaGFwZSk7XG4gICAgICAgICAgICByZXR1cm47XG4gICAgICAgIH1cbiAgICAgICAgdmFyIGhhc1JhZGlhbEdyYWRpZW50ID0gc2hhcGUuZ2V0RmlsbFJhZGlhbEdyYWRpZW50Q29sb3JTdG9wcygpO1xuICAgICAgICBpZiAoaGFzUmFkaWFsR3JhZGllbnQgJiYgZmlsbFByaW9yaXR5ID09PSAncmFkaWFsLWdyYWRpZW50Jykge1xuICAgICAgICAgICAgdGhpcy5fZmlsbFJhZGlhbEdyYWRpZW50KHNoYXBlKTtcbiAgICAgICAgICAgIHJldHVybjtcbiAgICAgICAgfVxuICAgICAgICBpZiAoaGFzQ29sb3IpIHtcbiAgICAgICAgICAgIHRoaXMuX2ZpbGxDb2xvcihzaGFwZSk7XG4gICAgICAgIH1cbiAgICAgICAgZWxzZSBpZiAoaGFzUGF0dGVybikge1xuICAgICAgICAgICAgdGhpcy5fZmlsbFBhdHRlcm4oc2hhcGUpO1xuICAgICAgICB9XG4gICAgICAgIGVsc2UgaWYgKGhhc0xpbmVhckdyYWRpZW50KSB7XG4gICAgICAgICAgICB0aGlzLl9maWxsTGluZWFyR3JhZGllbnQoc2hhcGUpO1xuICAgICAgICB9XG4gICAgICAgIGVsc2UgaWYgKGhhc1JhZGlhbEdyYWRpZW50KSB7XG4gICAgICAgICAgICB0aGlzLl9maWxsUmFkaWFsR3JhZGllbnQoc2hhcGUpO1xuICAgICAgICB9XG4gICAgfVxuICAgIF9zdHJva2VMaW5lYXJHcmFkaWVudChzaGFwZSkge1xuICAgICAgICB2YXIgc3RhcnQgPSBzaGFwZS5nZXRTdHJva2VMaW5lYXJHcmFkaWVudFN0YXJ0UG9pbnQoKSwgZW5kID0gc2hhcGUuZ2V0U3Ryb2tlTGluZWFyR3JhZGllbnRFbmRQb2ludCgpLCBjb2xvclN0b3BzID0gc2hhcGUuZ2V0U3Ryb2tlTGluZWFyR3JhZGllbnRDb2xvclN0b3BzKCksIGdyZCA9IHRoaXMuY3JlYXRlTGluZWFyR3JhZGllbnQoc3RhcnQueCwgc3RhcnQueSwgZW5kLngsIGVuZC55KTtcbiAgICAgICAgaWYgKGNvbG9yU3RvcHMpIHtcbiAgICAgICAgICAgIGZvciAodmFyIG4gPSAwOyBuIDwgY29sb3JTdG9wcy5sZW5ndGg7IG4gKz0gMikge1xuICAgICAgICAgICAgICAgIGdyZC5hZGRDb2xvclN0b3AoY29sb3JTdG9wc1tuXSwgY29sb3JTdG9wc1tuICsgMV0pO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgdGhpcy5zZXRBdHRyKCdzdHJva2VTdHlsZScsIGdyZCk7XG4gICAgICAgIH1cbiAgICB9XG4gICAgX3N0cm9rZShzaGFwZSkge1xuICAgICAgICB2YXIgZGFzaCA9IHNoYXBlLmRhc2goKSwgc3Ryb2tlU2NhbGVFbmFibGVkID0gc2hhcGUuZ2V0U3Ryb2tlU2NhbGVFbmFibGVkKCk7XG4gICAgICAgIGlmIChzaGFwZS5oYXNTdHJva2UoKSkge1xuICAgICAgICAgICAgaWYgKCFzdHJva2VTY2FsZUVuYWJsZWQpIHtcbiAgICAgICAgICAgICAgICB0aGlzLnNhdmUoKTtcbiAgICAgICAgICAgICAgICB2YXIgcGl4ZWxSYXRpbyA9IHRoaXMuZ2V0Q2FudmFzKCkuZ2V0UGl4ZWxSYXRpbygpO1xuICAgICAgICAgICAgICAgIHRoaXMuc2V0VHJhbnNmb3JtKHBpeGVsUmF0aW8sIDAsIDAsIHBpeGVsUmF0aW8sIDAsIDApO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgdGhpcy5fYXBwbHlMaW5lQ2FwKHNoYXBlKTtcbiAgICAgICAgICAgIGlmIChkYXNoICYmIHNoYXBlLmRhc2hFbmFibGVkKCkpIHtcbiAgICAgICAgICAgICAgICB0aGlzLnNldExpbmVEYXNoKGRhc2gpO1xuICAgICAgICAgICAgICAgIHRoaXMuc2V0QXR0cignbGluZURhc2hPZmZzZXQnLCBzaGFwZS5kYXNoT2Zmc2V0KCkpO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgdGhpcy5zZXRBdHRyKCdsaW5lV2lkdGgnLCBzaGFwZS5zdHJva2VXaWR0aCgpKTtcbiAgICAgICAgICAgIGlmICghc2hhcGUuZ2V0U2hhZG93Rm9yU3Ryb2tlRW5hYmxlZCgpKSB7XG4gICAgICAgICAgICAgICAgdGhpcy5zZXRBdHRyKCdzaGFkb3dDb2xvcicsICdyZ2JhKDAsMCwwLDApJyk7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICB2YXIgaGFzTGluZWFyR3JhZGllbnQgPSBzaGFwZS5nZXRTdHJva2VMaW5lYXJHcmFkaWVudENvbG9yU3RvcHMoKTtcbiAgICAgICAgICAgIGlmIChoYXNMaW5lYXJHcmFkaWVudCkge1xuICAgICAgICAgICAgICAgIHRoaXMuX3N0cm9rZUxpbmVhckdyYWRpZW50KHNoYXBlKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGVsc2Uge1xuICAgICAgICAgICAgICAgIHRoaXMuc2V0QXR0cignc3Ryb2tlU3R5bGUnLCBzaGFwZS5zdHJva2UoKSk7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBzaGFwZS5fc3Ryb2tlRnVuYyh0aGlzKTtcbiAgICAgICAgICAgIGlmICghc3Ryb2tlU2NhbGVFbmFibGVkKSB7XG4gICAgICAgICAgICAgICAgdGhpcy5yZXN0b3JlKCk7XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICB9XG4gICAgX2FwcGx5U2hhZG93KHNoYXBlKSB7XG4gICAgICAgIHZhciBfYSwgX2IsIF9jO1xuICAgICAgICB2YXIgY29sb3IgPSAoX2EgPSBzaGFwZS5nZXRTaGFkb3dSR0JBKCkpICE9PSBudWxsICYmIF9hICE9PSB2b2lkIDAgPyBfYSA6ICdibGFjaycsIGJsdXIgPSAoX2IgPSBzaGFwZS5nZXRTaGFkb3dCbHVyKCkpICE9PSBudWxsICYmIF9iICE9PSB2b2lkIDAgPyBfYiA6IDUsIG9mZnNldCA9IChfYyA9IHNoYXBlLmdldFNoYWRvd09mZnNldCgpKSAhPT0gbnVsbCAmJiBfYyAhPT0gdm9pZCAwID8gX2MgOiB7XG4gICAgICAgICAgICB4OiAwLFxuICAgICAgICAgICAgeTogMCxcbiAgICAgICAgfSwgc2NhbGUgPSBzaGFwZS5nZXRBYnNvbHV0ZVNjYWxlKCksIHJhdGlvID0gdGhpcy5jYW52YXMuZ2V0UGl4ZWxSYXRpbygpLCBzY2FsZVggPSBzY2FsZS54ICogcmF0aW8sIHNjYWxlWSA9IHNjYWxlLnkgKiByYXRpbztcbiAgICAgICAgdGhpcy5zZXRBdHRyKCdzaGFkb3dDb2xvcicsIGNvbG9yKTtcbiAgICAgICAgdGhpcy5zZXRBdHRyKCdzaGFkb3dCbHVyJywgYmx1ciAqIE1hdGgubWluKE1hdGguYWJzKHNjYWxlWCksIE1hdGguYWJzKHNjYWxlWSkpKTtcbiAgICAgICAgdGhpcy5zZXRBdHRyKCdzaGFkb3dPZmZzZXRYJywgb2Zmc2V0LnggKiBzY2FsZVgpO1xuICAgICAgICB0aGlzLnNldEF0dHIoJ3NoYWRvd09mZnNldFknLCBvZmZzZXQueSAqIHNjYWxlWSk7XG4gICAgfVxufVxuZXhwb3J0IGNsYXNzIEhpdENvbnRleHQgZXh0ZW5kcyBDb250ZXh0IHtcbiAgICBjb25zdHJ1Y3RvcihjYW52YXMpIHtcbiAgICAgICAgc3VwZXIoY2FudmFzKTtcbiAgICAgICAgdGhpcy5fY29udGV4dCA9IGNhbnZhcy5fY2FudmFzLmdldENvbnRleHQoJzJkJywge1xuICAgICAgICAgICAgd2lsbFJlYWRGcmVxdWVudGx5OiB0cnVlLFxuICAgICAgICB9KTtcbiAgICB9XG4gICAgX2ZpbGwoc2hhcGUpIHtcbiAgICAgICAgdGhpcy5zYXZlKCk7XG4gICAgICAgIHRoaXMuc2V0QXR0cignZmlsbFN0eWxlJywgc2hhcGUuY29sb3JLZXkpO1xuICAgICAgICBzaGFwZS5fZmlsbEZ1bmNIaXQodGhpcyk7XG4gICAgICAgIHRoaXMucmVzdG9yZSgpO1xuICAgIH1cbiAgICBzdHJva2VTaGFwZShzaGFwZSkge1xuICAgICAgICBpZiAoc2hhcGUuaGFzSGl0U3Ryb2tlKCkpIHtcbiAgICAgICAgICAgIHRoaXMuX3N0cm9rZShzaGFwZSk7XG4gICAgICAgIH1cbiAgICB9XG4gICAgX3N0cm9rZShzaGFwZSkge1xuICAgICAgICBpZiAoc2hhcGUuaGFzSGl0U3Ryb2tlKCkpIHtcbiAgICAgICAgICAgIHZhciBzdHJva2VTY2FsZUVuYWJsZWQgPSBzaGFwZS5nZXRTdHJva2VTY2FsZUVuYWJsZWQoKTtcbiAgICAgICAgICAgIGlmICghc3Ryb2tlU2NhbGVFbmFibGVkKSB7XG4gICAgICAgICAgICAgICAgdGhpcy5zYXZlKCk7XG4gICAgICAgICAgICAgICAgdmFyIHBpeGVsUmF0aW8gPSB0aGlzLmdldENhbnZhcygpLmdldFBpeGVsUmF0aW8oKTtcbiAgICAgICAgICAgICAgICB0aGlzLnNldFRyYW5zZm9ybShwaXhlbFJhdGlvLCAwLCAwLCBwaXhlbFJhdGlvLCAwLCAwKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIHRoaXMuX2FwcGx5TGluZUNhcChzaGFwZSk7XG4gICAgICAgICAgICB2YXIgaGl0U3Ryb2tlV2lkdGggPSBzaGFwZS5oaXRTdHJva2VXaWR0aCgpO1xuICAgICAgICAgICAgdmFyIHN0cm9rZVdpZHRoID0gaGl0U3Ryb2tlV2lkdGggPT09ICdhdXRvJyA/IHNoYXBlLnN0cm9rZVdpZHRoKCkgOiBoaXRTdHJva2VXaWR0aDtcbiAgICAgICAgICAgIHRoaXMuc2V0QXR0cignbGluZVdpZHRoJywgc3Ryb2tlV2lkdGgpO1xuICAgICAgICAgICAgdGhpcy5zZXRBdHRyKCdzdHJva2VTdHlsZScsIHNoYXBlLmNvbG9yS2V5KTtcbiAgICAgICAgICAgIHNoYXBlLl9zdHJva2VGdW5jSGl0KHRoaXMpO1xuICAgICAgICAgICAgaWYgKCFzdHJva2VTY2FsZUVuYWJsZWQpIHtcbiAgICAgICAgICAgICAgICB0aGlzLnJlc3RvcmUoKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgIH1cbn1cbiIsImV4cG9ydCB7IEtvbnZhIH0gZnJvbSAnLi9fQ29yZUludGVybmFscy5qcyc7XG5pbXBvcnQgeyBLb252YSB9IGZyb20gJy4vX0NvcmVJbnRlcm5hbHMuanMnO1xuZXhwb3J0IGRlZmF1bHQgS29udmE7XG4iLCJpbXBvcnQgeyBLb252YSB9IGZyb20gJy4vR2xvYmFsLmpzJztcbmltcG9ydCB7IFV0aWwgfSBmcm9tICcuL1V0aWwuanMnO1xuZXhwb3J0IGNvbnN0IEREID0ge1xuICAgIGdldCBpc0RyYWdnaW5nKCkge1xuICAgICAgICB2YXIgZmxhZyA9IGZhbHNlO1xuICAgICAgICBERC5fZHJhZ0VsZW1lbnRzLmZvckVhY2goKGVsZW0pID0+IHtcbiAgICAgICAgICAgIGlmIChlbGVtLmRyYWdTdGF0dXMgPT09ICdkcmFnZ2luZycpIHtcbiAgICAgICAgICAgICAgICBmbGFnID0gdHJ1ZTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfSk7XG4gICAgICAgIHJldHVybiBmbGFnO1xuICAgIH0sXG4gICAganVzdERyYWdnZWQ6IGZhbHNlLFxuICAgIGdldCBub2RlKCkge1xuICAgICAgICB2YXIgbm9kZTtcbiAgICAgICAgREQuX2RyYWdFbGVtZW50cy5mb3JFYWNoKChlbGVtKSA9PiB7XG4gICAgICAgICAgICBub2RlID0gZWxlbS5ub2RlO1xuICAgICAgICB9KTtcbiAgICAgICAgcmV0dXJuIG5vZGU7XG4gICAgfSxcbiAgICBfZHJhZ0VsZW1lbnRzOiBuZXcgTWFwKCksXG4gICAgX2RyYWcoZXZ0KSB7XG4gICAgICAgIGNvbnN0IG5vZGVzVG9GaXJlRXZlbnRzID0gW107XG4gICAgICAgIERELl9kcmFnRWxlbWVudHMuZm9yRWFjaCgoZWxlbSwga2V5KSA9PiB7XG4gICAgICAgICAgICBjb25zdCB7IG5vZGUgfSA9IGVsZW07XG4gICAgICAgICAgICBjb25zdCBzdGFnZSA9IG5vZGUuZ2V0U3RhZ2UoKTtcbiAgICAgICAgICAgIHN0YWdlLnNldFBvaW50ZXJzUG9zaXRpb25zKGV2dCk7XG4gICAgICAgICAgICBpZiAoZWxlbS5wb2ludGVySWQgPT09IHVuZGVmaW5lZCkge1xuICAgICAgICAgICAgICAgIGVsZW0ucG9pbnRlcklkID0gVXRpbC5fZ2V0Rmlyc3RQb2ludGVySWQoZXZ0KTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGNvbnN0IHBvcyA9IHN0YWdlLl9jaGFuZ2VkUG9pbnRlclBvc2l0aW9ucy5maW5kKChwb3MpID0+IHBvcy5pZCA9PT0gZWxlbS5wb2ludGVySWQpO1xuICAgICAgICAgICAgaWYgKCFwb3MpIHtcbiAgICAgICAgICAgICAgICByZXR1cm47XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBpZiAoZWxlbS5kcmFnU3RhdHVzICE9PSAnZHJhZ2dpbmcnKSB7XG4gICAgICAgICAgICAgICAgdmFyIGRyYWdEaXN0YW5jZSA9IG5vZGUuZHJhZ0Rpc3RhbmNlKCk7XG4gICAgICAgICAgICAgICAgdmFyIGRpc3RhbmNlID0gTWF0aC5tYXgoTWF0aC5hYnMocG9zLnggLSBlbGVtLnN0YXJ0UG9pbnRlclBvcy54KSwgTWF0aC5hYnMocG9zLnkgLSBlbGVtLnN0YXJ0UG9pbnRlclBvcy55KSk7XG4gICAgICAgICAgICAgICAgaWYgKGRpc3RhbmNlIDwgZHJhZ0Rpc3RhbmNlKSB7XG4gICAgICAgICAgICAgICAgICAgIHJldHVybjtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgbm9kZS5zdGFydERyYWcoeyBldnQgfSk7XG4gICAgICAgICAgICAgICAgaWYgKCFub2RlLmlzRHJhZ2dpbmcoKSkge1xuICAgICAgICAgICAgICAgICAgICByZXR1cm47XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfVxuICAgICAgICAgICAgbm9kZS5fc2V0RHJhZ1Bvc2l0aW9uKGV2dCwgZWxlbSk7XG4gICAgICAgICAgICBub2Rlc1RvRmlyZUV2ZW50cy5wdXNoKG5vZGUpO1xuICAgICAgICB9KTtcbiAgICAgICAgbm9kZXNUb0ZpcmVFdmVudHMuZm9yRWFjaCgobm9kZSkgPT4ge1xuICAgICAgICAgICAgbm9kZS5maXJlKCdkcmFnbW92ZScsIHtcbiAgICAgICAgICAgICAgICB0eXBlOiAnZHJhZ21vdmUnLFxuICAgICAgICAgICAgICAgIHRhcmdldDogbm9kZSxcbiAgICAgICAgICAgICAgICBldnQ6IGV2dCxcbiAgICAgICAgICAgIH0sIHRydWUpO1xuICAgICAgICB9KTtcbiAgICB9LFxuICAgIF9lbmREcmFnQmVmb3JlKGV2dCkge1xuICAgICAgICBjb25zdCBkcmF3Tm9kZXMgPSBbXTtcbiAgICAgICAgREQuX2RyYWdFbGVtZW50cy5mb3JFYWNoKChlbGVtKSA9PiB7XG4gICAgICAgICAgICBjb25zdCB7IG5vZGUgfSA9IGVsZW07XG4gICAgICAgICAgICBjb25zdCBzdGFnZSA9IG5vZGUuZ2V0U3RhZ2UoKTtcbiAgICAgICAgICAgIGlmIChldnQpIHtcbiAgICAgICAgICAgICAgICBzdGFnZS5zZXRQb2ludGVyc1Bvc2l0aW9ucyhldnQpO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgY29uc3QgcG9zID0gc3RhZ2UuX2NoYW5nZWRQb2ludGVyUG9zaXRpb25zLmZpbmQoKHBvcykgPT4gcG9zLmlkID09PSBlbGVtLnBvaW50ZXJJZCk7XG4gICAgICAgICAgICBpZiAoIXBvcykge1xuICAgICAgICAgICAgICAgIHJldHVybjtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGlmIChlbGVtLmRyYWdTdGF0dXMgPT09ICdkcmFnZ2luZycgfHwgZWxlbS5kcmFnU3RhdHVzID09PSAnc3RvcHBlZCcpIHtcbiAgICAgICAgICAgICAgICBERC5qdXN0RHJhZ2dlZCA9IHRydWU7XG4gICAgICAgICAgICAgICAgS29udmEuX21vdXNlTGlzdGVuQ2xpY2sgPSBmYWxzZTtcbiAgICAgICAgICAgICAgICBLb252YS5fdG91Y2hMaXN0ZW5DbGljayA9IGZhbHNlO1xuICAgICAgICAgICAgICAgIEtvbnZhLl9wb2ludGVyTGlzdGVuQ2xpY2sgPSBmYWxzZTtcbiAgICAgICAgICAgICAgICBlbGVtLmRyYWdTdGF0dXMgPSAnc3RvcHBlZCc7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBjb25zdCBkcmF3Tm9kZSA9IGVsZW0ubm9kZS5nZXRMYXllcigpIHx8XG4gICAgICAgICAgICAgICAgKGVsZW0ubm9kZSBpbnN0YW5jZW9mIEtvbnZhWydTdGFnZSddICYmIGVsZW0ubm9kZSk7XG4gICAgICAgICAgICBpZiAoZHJhd05vZGUgJiYgZHJhd05vZGVzLmluZGV4T2YoZHJhd05vZGUpID09PSAtMSkge1xuICAgICAgICAgICAgICAgIGRyYXdOb2Rlcy5wdXNoKGRyYXdOb2RlKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfSk7XG4gICAgICAgIGRyYXdOb2Rlcy5mb3JFYWNoKChkcmF3Tm9kZSkgPT4ge1xuICAgICAgICAgICAgZHJhd05vZGUuZHJhdygpO1xuICAgICAgICB9KTtcbiAgICB9LFxuICAgIF9lbmREcmFnQWZ0ZXIoZXZ0KSB7XG4gICAgICAgIERELl9kcmFnRWxlbWVudHMuZm9yRWFjaCgoZWxlbSwga2V5KSA9PiB7XG4gICAgICAgICAgICBpZiAoZWxlbS5kcmFnU3RhdHVzID09PSAnc3RvcHBlZCcpIHtcbiAgICAgICAgICAgICAgICBlbGVtLm5vZGUuZmlyZSgnZHJhZ2VuZCcsIHtcbiAgICAgICAgICAgICAgICAgICAgdHlwZTogJ2RyYWdlbmQnLFxuICAgICAgICAgICAgICAgICAgICB0YXJnZXQ6IGVsZW0ubm9kZSxcbiAgICAgICAgICAgICAgICAgICAgZXZ0OiBldnQsXG4gICAgICAgICAgICAgICAgfSwgdHJ1ZSk7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBpZiAoZWxlbS5kcmFnU3RhdHVzICE9PSAnZHJhZ2dpbmcnKSB7XG4gICAgICAgICAgICAgICAgREQuX2RyYWdFbGVtZW50cy5kZWxldGUoa2V5KTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfSk7XG4gICAgfSxcbn07XG5pZiAoS29udmEuaXNCcm93c2VyKSB7XG4gICAgd2luZG93LmFkZEV2ZW50TGlzdGVuZXIoJ21vdXNldXAnLCBERC5fZW5kRHJhZ0JlZm9yZSwgdHJ1ZSk7XG4gICAgd2luZG93LmFkZEV2ZW50TGlzdGVuZXIoJ3RvdWNoZW5kJywgREQuX2VuZERyYWdCZWZvcmUsIHRydWUpO1xuICAgIHdpbmRvdy5hZGRFdmVudExpc3RlbmVyKCdtb3VzZW1vdmUnLCBERC5fZHJhZyk7XG4gICAgd2luZG93LmFkZEV2ZW50TGlzdGVuZXIoJ3RvdWNobW92ZScsIERELl9kcmFnKTtcbiAgICB3aW5kb3cuYWRkRXZlbnRMaXN0ZW5lcignbW91c2V1cCcsIERELl9lbmREcmFnQWZ0ZXIsIGZhbHNlKTtcbiAgICB3aW5kb3cuYWRkRXZlbnRMaXN0ZW5lcigndG91Y2hlbmQnLCBERC5fZW5kRHJhZ0FmdGVyLCBmYWxzZSk7XG59XG4iLCJpbXBvcnQgeyBVdGlsIH0gZnJvbSAnLi9VdGlsLmpzJztcbmltcG9ydCB7IGdldENvbXBvbmVudFZhbGlkYXRvciB9IGZyb20gJy4vVmFsaWRhdG9ycy5qcyc7XG52YXIgR0VUID0gJ2dldCcsIFNFVCA9ICdzZXQnO1xuZXhwb3J0IGNvbnN0IEZhY3RvcnkgPSB7XG4gICAgYWRkR2V0dGVyU2V0dGVyKGNvbnN0cnVjdG9yLCBhdHRyLCBkZWYsIHZhbGlkYXRvciwgYWZ0ZXIpIHtcbiAgICAgICAgRmFjdG9yeS5hZGRHZXR0ZXIoY29uc3RydWN0b3IsIGF0dHIsIGRlZik7XG4gICAgICAgIEZhY3RvcnkuYWRkU2V0dGVyKGNvbnN0cnVjdG9yLCBhdHRyLCB2YWxpZGF0b3IsIGFmdGVyKTtcbiAgICAgICAgRmFjdG9yeS5hZGRPdmVybG9hZGVkR2V0dGVyU2V0dGVyKGNvbnN0cnVjdG9yLCBhdHRyKTtcbiAgICB9LFxuICAgIGFkZEdldHRlcihjb25zdHJ1Y3RvciwgYXR0ciwgZGVmKSB7XG4gICAgICAgIHZhciBtZXRob2QgPSBHRVQgKyBVdGlsLl9jYXBpdGFsaXplKGF0dHIpO1xuICAgICAgICBjb25zdHJ1Y3Rvci5wcm90b3R5cGVbbWV0aG9kXSA9XG4gICAgICAgICAgICBjb25zdHJ1Y3Rvci5wcm90b3R5cGVbbWV0aG9kXSB8fFxuICAgICAgICAgICAgICAgIGZ1bmN0aW9uICgpIHtcbiAgICAgICAgICAgICAgICAgICAgdmFyIHZhbCA9IHRoaXMuYXR0cnNbYXR0cl07XG4gICAgICAgICAgICAgICAgICAgIHJldHVybiB2YWwgPT09IHVuZGVmaW5lZCA/IGRlZiA6IHZhbDtcbiAgICAgICAgICAgICAgICB9O1xuICAgIH0sXG4gICAgYWRkU2V0dGVyKGNvbnN0cnVjdG9yLCBhdHRyLCB2YWxpZGF0b3IsIGFmdGVyKSB7XG4gICAgICAgIHZhciBtZXRob2QgPSBTRVQgKyBVdGlsLl9jYXBpdGFsaXplKGF0dHIpO1xuICAgICAgICBpZiAoIWNvbnN0cnVjdG9yLnByb3RvdHlwZVttZXRob2RdKSB7XG4gICAgICAgICAgICBGYWN0b3J5Lm92ZXJXcml0ZVNldHRlcihjb25zdHJ1Y3RvciwgYXR0ciwgdmFsaWRhdG9yLCBhZnRlcik7XG4gICAgICAgIH1cbiAgICB9LFxuICAgIG92ZXJXcml0ZVNldHRlcihjb25zdHJ1Y3RvciwgYXR0ciwgdmFsaWRhdG9yLCBhZnRlcikge1xuICAgICAgICB2YXIgbWV0aG9kID0gU0VUICsgVXRpbC5fY2FwaXRhbGl6ZShhdHRyKTtcbiAgICAgICAgY29uc3RydWN0b3IucHJvdG90eXBlW21ldGhvZF0gPSBmdW5jdGlvbiAodmFsKSB7XG4gICAgICAgICAgICBpZiAodmFsaWRhdG9yICYmIHZhbCAhPT0gdW5kZWZpbmVkICYmIHZhbCAhPT0gbnVsbCkge1xuICAgICAgICAgICAgICAgIHZhbCA9IHZhbGlkYXRvci5jYWxsKHRoaXMsIHZhbCwgYXR0cik7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICB0aGlzLl9zZXRBdHRyKGF0dHIsIHZhbCk7XG4gICAgICAgICAgICBpZiAoYWZ0ZXIpIHtcbiAgICAgICAgICAgICAgICBhZnRlci5jYWxsKHRoaXMpO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgcmV0dXJuIHRoaXM7XG4gICAgICAgIH07XG4gICAgfSxcbiAgICBhZGRDb21wb25lbnRzR2V0dGVyU2V0dGVyKGNvbnN0cnVjdG9yLCBhdHRyLCBjb21wb25lbnRzLCB2YWxpZGF0b3IsIGFmdGVyKSB7XG4gICAgICAgIHZhciBsZW4gPSBjb21wb25lbnRzLmxlbmd0aCwgY2FwaXRhbGl6ZSA9IFV0aWwuX2NhcGl0YWxpemUsIGdldHRlciA9IEdFVCArIGNhcGl0YWxpemUoYXR0ciksIHNldHRlciA9IFNFVCArIGNhcGl0YWxpemUoYXR0ciksIG4sIGNvbXBvbmVudDtcbiAgICAgICAgY29uc3RydWN0b3IucHJvdG90eXBlW2dldHRlcl0gPSBmdW5jdGlvbiAoKSB7XG4gICAgICAgICAgICB2YXIgcmV0ID0ge307XG4gICAgICAgICAgICBmb3IgKG4gPSAwOyBuIDwgbGVuOyBuKyspIHtcbiAgICAgICAgICAgICAgICBjb21wb25lbnQgPSBjb21wb25lbnRzW25dO1xuICAgICAgICAgICAgICAgIHJldFtjb21wb25lbnRdID0gdGhpcy5nZXRBdHRyKGF0dHIgKyBjYXBpdGFsaXplKGNvbXBvbmVudCkpO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgcmV0dXJuIHJldDtcbiAgICAgICAgfTtcbiAgICAgICAgdmFyIGJhc2ljVmFsaWRhdG9yID0gZ2V0Q29tcG9uZW50VmFsaWRhdG9yKGNvbXBvbmVudHMpO1xuICAgICAgICBjb25zdHJ1Y3Rvci5wcm90b3R5cGVbc2V0dGVyXSA9IGZ1bmN0aW9uICh2YWwpIHtcbiAgICAgICAgICAgIHZhciBvbGRWYWwgPSB0aGlzLmF0dHJzW2F0dHJdLCBrZXk7XG4gICAgICAgICAgICBpZiAodmFsaWRhdG9yKSB7XG4gICAgICAgICAgICAgICAgdmFsID0gdmFsaWRhdG9yLmNhbGwodGhpcywgdmFsKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGlmIChiYXNpY1ZhbGlkYXRvcikge1xuICAgICAgICAgICAgICAgIGJhc2ljVmFsaWRhdG9yLmNhbGwodGhpcywgdmFsLCBhdHRyKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGZvciAoa2V5IGluIHZhbCkge1xuICAgICAgICAgICAgICAgIGlmICghdmFsLmhhc093blByb3BlcnR5KGtleSkpIHtcbiAgICAgICAgICAgICAgICAgICAgY29udGludWU7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIHRoaXMuX3NldEF0dHIoYXR0ciArIGNhcGl0YWxpemUoa2V5KSwgdmFsW2tleV0pO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgaWYgKCF2YWwpIHtcbiAgICAgICAgICAgICAgICBjb21wb25lbnRzLmZvckVhY2goKGNvbXBvbmVudCkgPT4ge1xuICAgICAgICAgICAgICAgICAgICB0aGlzLl9zZXRBdHRyKGF0dHIgKyBjYXBpdGFsaXplKGNvbXBvbmVudCksIHVuZGVmaW5lZCk7XG4gICAgICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICB0aGlzLl9maXJlQ2hhbmdlRXZlbnQoYXR0ciwgb2xkVmFsLCB2YWwpO1xuICAgICAgICAgICAgaWYgKGFmdGVyKSB7XG4gICAgICAgICAgICAgICAgYWZ0ZXIuY2FsbCh0aGlzKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIHJldHVybiB0aGlzO1xuICAgICAgICB9O1xuICAgICAgICBGYWN0b3J5LmFkZE92ZXJsb2FkZWRHZXR0ZXJTZXR0ZXIoY29uc3RydWN0b3IsIGF0dHIpO1xuICAgIH0sXG4gICAgYWRkT3ZlcmxvYWRlZEdldHRlclNldHRlcihjb25zdHJ1Y3RvciwgYXR0cikge1xuICAgICAgICB2YXIgY2FwaXRhbGl6ZWRBdHRyID0gVXRpbC5fY2FwaXRhbGl6ZShhdHRyKSwgc2V0dGVyID0gU0VUICsgY2FwaXRhbGl6ZWRBdHRyLCBnZXR0ZXIgPSBHRVQgKyBjYXBpdGFsaXplZEF0dHI7XG4gICAgICAgIGNvbnN0cnVjdG9yLnByb3RvdHlwZVthdHRyXSA9IGZ1bmN0aW9uICgpIHtcbiAgICAgICAgICAgIGlmIChhcmd1bWVudHMubGVuZ3RoKSB7XG4gICAgICAgICAgICAgICAgdGhpc1tzZXR0ZXJdKGFyZ3VtZW50c1swXSk7XG4gICAgICAgICAgICAgICAgcmV0dXJuIHRoaXM7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICByZXR1cm4gdGhpc1tnZXR0ZXJdKCk7XG4gICAgICAgIH07XG4gICAgfSxcbiAgICBhZGREZXByZWNhdGVkR2V0dGVyU2V0dGVyKGNvbnN0cnVjdG9yLCBhdHRyLCBkZWYsIHZhbGlkYXRvcikge1xuICAgICAgICBVdGlsLmVycm9yKCdBZGRpbmcgZGVwcmVjYXRlZCAnICsgYXR0cik7XG4gICAgICAgIHZhciBtZXRob2QgPSBHRVQgKyBVdGlsLl9jYXBpdGFsaXplKGF0dHIpO1xuICAgICAgICB2YXIgbWVzc2FnZSA9IGF0dHIgK1xuICAgICAgICAgICAgJyBwcm9wZXJ0eSBpcyBkZXByZWNhdGVkIGFuZCB3aWxsIGJlIHJlbW92ZWQgc29vbi4gTG9vayBhdCBLb252YSBjaGFuZ2UgbG9nIGZvciBtb3JlIGluZm9ybWF0aW9uLic7XG4gICAgICAgIGNvbnN0cnVjdG9yLnByb3RvdHlwZVttZXRob2RdID0gZnVuY3Rpb24gKCkge1xuICAgICAgICAgICAgVXRpbC5lcnJvcihtZXNzYWdlKTtcbiAgICAgICAgICAgIHZhciB2YWwgPSB0aGlzLmF0dHJzW2F0dHJdO1xuICAgICAgICAgICAgcmV0dXJuIHZhbCA9PT0gdW5kZWZpbmVkID8gZGVmIDogdmFsO1xuICAgICAgICB9O1xuICAgICAgICBGYWN0b3J5LmFkZFNldHRlcihjb25zdHJ1Y3RvciwgYXR0ciwgdmFsaWRhdG9yLCBmdW5jdGlvbiAoKSB7XG4gICAgICAgICAgICBVdGlsLmVycm9yKG1lc3NhZ2UpO1xuICAgICAgICB9KTtcbiAgICAgICAgRmFjdG9yeS5hZGRPdmVybG9hZGVkR2V0dGVyU2V0dGVyKGNvbnN0cnVjdG9yLCBhdHRyKTtcbiAgICB9LFxuICAgIGJhY2tDb21wYXQoY29uc3RydWN0b3IsIG1ldGhvZHMpIHtcbiAgICAgICAgVXRpbC5lYWNoKG1ldGhvZHMsIGZ1bmN0aW9uIChvbGRNZXRob2ROYW1lLCBuZXdNZXRob2ROYW1lKSB7XG4gICAgICAgICAgICB2YXIgbWV0aG9kID0gY29uc3RydWN0b3IucHJvdG90eXBlW25ld01ldGhvZE5hbWVdO1xuICAgICAgICAgICAgdmFyIG9sZEdldHRlciA9IEdFVCArIFV0aWwuX2NhcGl0YWxpemUob2xkTWV0aG9kTmFtZSk7XG4gICAgICAgICAgICB2YXIgb2xkU2V0dGVyID0gU0VUICsgVXRpbC5fY2FwaXRhbGl6ZShvbGRNZXRob2ROYW1lKTtcbiAgICAgICAgICAgIGZ1bmN0aW9uIGRlcHJlY2F0ZWQoKSB7XG4gICAgICAgICAgICAgICAgbWV0aG9kLmFwcGx5KHRoaXMsIGFyZ3VtZW50cyk7XG4gICAgICAgICAgICAgICAgVXRpbC5lcnJvcignXCInICtcbiAgICAgICAgICAgICAgICAgICAgb2xkTWV0aG9kTmFtZSArXG4gICAgICAgICAgICAgICAgICAgICdcIiBtZXRob2QgaXMgZGVwcmVjYXRlZCBhbmQgd2lsbCBiZSByZW1vdmVkIHNvb24uIFVzZSBcIlwiJyArXG4gICAgICAgICAgICAgICAgICAgIG5ld01ldGhvZE5hbWUgK1xuICAgICAgICAgICAgICAgICAgICAnXCIgaW5zdGVhZC4nKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGNvbnN0cnVjdG9yLnByb3RvdHlwZVtvbGRNZXRob2ROYW1lXSA9IGRlcHJlY2F0ZWQ7XG4gICAgICAgICAgICBjb25zdHJ1Y3Rvci5wcm90b3R5cGVbb2xkR2V0dGVyXSA9IGRlcHJlY2F0ZWQ7XG4gICAgICAgICAgICBjb25zdHJ1Y3Rvci5wcm90b3R5cGVbb2xkU2V0dGVyXSA9IGRlcHJlY2F0ZWQ7XG4gICAgICAgIH0pO1xuICAgIH0sXG4gICAgYWZ0ZXJTZXRGaWx0ZXIoKSB7XG4gICAgICAgIHRoaXMuX2ZpbHRlclVwVG9EYXRlID0gZmFsc2U7XG4gICAgfSxcbn07XG4iLCJpbXBvcnQgeyBVdGlsIH0gZnJvbSAnLi9VdGlsLmpzJztcbmltcG9ydCB7IExheWVyIH0gZnJvbSAnLi9MYXllci5qcyc7XG5pbXBvcnQgeyBfcmVnaXN0ZXJOb2RlIH0gZnJvbSAnLi9HbG9iYWwuanMnO1xuZXhwb3J0IGNsYXNzIEZhc3RMYXllciBleHRlbmRzIExheWVyIHtcbiAgICBjb25zdHJ1Y3RvcihhdHRycykge1xuICAgICAgICBzdXBlcihhdHRycyk7XG4gICAgICAgIHRoaXMubGlzdGVuaW5nKGZhbHNlKTtcbiAgICAgICAgVXRpbC53YXJuKCdLb252YS5GYXN0IGxheWVyIGlzIGRlcHJlY2F0ZWQuIFBsZWFzZSB1c2UgXCJuZXcgS29udmEuTGF5ZXIoeyBsaXN0ZW5pbmc6IGZhbHNlIH0pXCIgaW5zdGVhZC4nKTtcbiAgICB9XG59XG5GYXN0TGF5ZXIucHJvdG90eXBlLm5vZGVUeXBlID0gJ0Zhc3RMYXllcic7XG5fcmVnaXN0ZXJOb2RlKEZhc3RMYXllcik7XG4iLCJ2YXIgUElfT1ZFUl8xODAgPSBNYXRoLlBJIC8gMTgwO1xuZnVuY3Rpb24gZGV0ZWN0QnJvd3NlcigpIHtcbiAgICByZXR1cm4gKHR5cGVvZiB3aW5kb3cgIT09ICd1bmRlZmluZWQnICYmXG4gICAgICAgICh7fS50b1N0cmluZy5jYWxsKHdpbmRvdykgPT09ICdbb2JqZWN0IFdpbmRvd10nIHx8XG4gICAgICAgICAgICB7fS50b1N0cmluZy5jYWxsKHdpbmRvdykgPT09ICdbb2JqZWN0IGdsb2JhbF0nKSk7XG59XG5leHBvcnQgY29uc3QgZ2xvYiA9IHR5cGVvZiBnbG9iYWwgIT09ICd1bmRlZmluZWQnXG4gICAgPyBnbG9iYWxcbiAgICA6IHR5cGVvZiB3aW5kb3cgIT09ICd1bmRlZmluZWQnXG4gICAgICAgID8gd2luZG93XG4gICAgICAgIDogdHlwZW9mIFdvcmtlckdsb2JhbFNjb3BlICE9PSAndW5kZWZpbmVkJ1xuICAgICAgICAgICAgPyBzZWxmXG4gICAgICAgICAgICA6IHt9O1xuZXhwb3J0IGNvbnN0IEtvbnZhID0ge1xuICAgIF9nbG9iYWw6IGdsb2IsXG4gICAgdmVyc2lvbjogJzguNC4wJyxcbiAgICBpc0Jyb3dzZXI6IGRldGVjdEJyb3dzZXIoKSxcbiAgICBpc1VubWluaWZpZWQ6IC9wYXJhbS8udGVzdChmdW5jdGlvbiAocGFyYW0pIHsgfS50b1N0cmluZygpKSxcbiAgICBkYmxDbGlja1dpbmRvdzogNDAwLFxuICAgIGdldEFuZ2xlKGFuZ2xlKSB7XG4gICAgICAgIHJldHVybiBLb252YS5hbmdsZURlZyA/IGFuZ2xlICogUElfT1ZFUl8xODAgOiBhbmdsZTtcbiAgICB9LFxuICAgIGVuYWJsZVRyYWNlOiBmYWxzZSxcbiAgICBwb2ludGVyRXZlbnRzRW5hYmxlZDogdHJ1ZSxcbiAgICBhdXRvRHJhd0VuYWJsZWQ6IHRydWUsXG4gICAgaGl0T25EcmFnRW5hYmxlZDogZmFsc2UsXG4gICAgY2FwdHVyZVBvaW50ZXJFdmVudHNFbmFibGVkOiBmYWxzZSxcbiAgICBfbW91c2VMaXN0ZW5DbGljazogZmFsc2UsXG4gICAgX3RvdWNoTGlzdGVuQ2xpY2s6IGZhbHNlLFxuICAgIF9wb2ludGVyTGlzdGVuQ2xpY2s6IGZhbHNlLFxuICAgIF9tb3VzZUluRGJsQ2xpY2tXaW5kb3c6IGZhbHNlLFxuICAgIF90b3VjaEluRGJsQ2xpY2tXaW5kb3c6IGZhbHNlLFxuICAgIF9wb2ludGVySW5EYmxDbGlja1dpbmRvdzogZmFsc2UsXG4gICAgX21vdXNlRGJsQ2xpY2tQb2ludGVySWQ6IG51bGwsXG4gICAgX3RvdWNoRGJsQ2xpY2tQb2ludGVySWQ6IG51bGwsXG4gICAgX3BvaW50ZXJEYmxDbGlja1BvaW50ZXJJZDogbnVsbCxcbiAgICBwaXhlbFJhdGlvOiAodHlwZW9mIHdpbmRvdyAhPT0gJ3VuZGVmaW5lZCcgJiYgd2luZG93LmRldmljZVBpeGVsUmF0aW8pIHx8IDEsXG4gICAgZHJhZ0Rpc3RhbmNlOiAzLFxuICAgIGFuZ2xlRGVnOiB0cnVlLFxuICAgIHNob3dXYXJuaW5nczogdHJ1ZSxcbiAgICBkcmFnQnV0dG9uczogWzAsIDFdLFxuICAgIGlzRHJhZ2dpbmcoKSB7XG4gICAgICAgIHJldHVybiBLb252YVsnREQnXS5pc0RyYWdnaW5nO1xuICAgIH0sXG4gICAgaXNEcmFnUmVhZHkoKSB7XG4gICAgICAgIHJldHVybiAhIUtvbnZhWydERCddLm5vZGU7XG4gICAgfSxcbiAgICByZWxlYXNlQ2FudmFzT25EZXN0cm95OiB0cnVlLFxuICAgIGRvY3VtZW50OiBnbG9iLmRvY3VtZW50LFxuICAgIF9pbmplY3RHbG9iYWwoS29udmEpIHtcbiAgICAgICAgZ2xvYi5Lb252YSA9IEtvbnZhO1xuICAgIH0sXG59O1xuZXhwb3J0IGNvbnN0IF9yZWdpc3Rlck5vZGUgPSAoTm9kZUNsYXNzKSA9PiB7XG4gICAgS29udmFbTm9kZUNsYXNzLnByb3RvdHlwZS5nZXRDbGFzc05hbWUoKV0gPSBOb2RlQ2xhc3M7XG59O1xuS29udmEuX2luamVjdEdsb2JhbChLb252YSk7XG4iLCJpbXBvcnQgeyBVdGlsIH0gZnJvbSAnLi9VdGlsLmpzJztcbmltcG9ydCB7IENvbnRhaW5lciB9IGZyb20gJy4vQ29udGFpbmVyLmpzJztcbmltcG9ydCB7IF9yZWdpc3Rlck5vZGUgfSBmcm9tICcuL0dsb2JhbC5qcyc7XG5leHBvcnQgY2xhc3MgR3JvdXAgZXh0ZW5kcyBDb250YWluZXIge1xuICAgIF92YWxpZGF0ZUFkZChjaGlsZCkge1xuICAgICAgICB2YXIgdHlwZSA9IGNoaWxkLmdldFR5cGUoKTtcbiAgICAgICAgaWYgKHR5cGUgIT09ICdHcm91cCcgJiYgdHlwZSAhPT0gJ1NoYXBlJykge1xuICAgICAgICAgICAgVXRpbC50aHJvdygnWW91IG1heSBvbmx5IGFkZCBncm91cHMgYW5kIHNoYXBlcyB0byBncm91cHMuJyk7XG4gICAgICAgIH1cbiAgICB9XG59XG5Hcm91cC5wcm90b3R5cGUubm9kZVR5cGUgPSAnR3JvdXAnO1xuX3JlZ2lzdGVyTm9kZShHcm91cCk7XG4iLCJpbXBvcnQgeyBVdGlsIH0gZnJvbSAnLi9VdGlsLmpzJztcbmltcG9ydCB7IENvbnRhaW5lciB9IGZyb20gJy4vQ29udGFpbmVyLmpzJztcbmltcG9ydCB7IE5vZGUgfSBmcm9tICcuL05vZGUuanMnO1xuaW1wb3J0IHsgRmFjdG9yeSB9IGZyb20gJy4vRmFjdG9yeS5qcyc7XG5pbXBvcnQgeyBTY2VuZUNhbnZhcywgSGl0Q2FudmFzIH0gZnJvbSAnLi9DYW52YXMuanMnO1xuaW1wb3J0IHsgZ2V0Qm9vbGVhblZhbGlkYXRvciB9IGZyb20gJy4vVmFsaWRhdG9ycy5qcyc7XG5pbXBvcnQgeyBzaGFwZXMgfSBmcm9tICcuL1NoYXBlLmpzJztcbmltcG9ydCB7IF9yZWdpc3Rlck5vZGUgfSBmcm9tICcuL0dsb2JhbC5qcyc7XG52YXIgSEFTSCA9ICcjJywgQkVGT1JFX0RSQVcgPSAnYmVmb3JlRHJhdycsIERSQVcgPSAnZHJhdycsIElOVEVSU0VDVElPTl9PRkZTRVRTID0gW1xuICAgIHsgeDogMCwgeTogMCB9LFxuICAgIHsgeDogLTEsIHk6IC0xIH0sXG4gICAgeyB4OiAxLCB5OiAtMSB9LFxuICAgIHsgeDogMSwgeTogMSB9LFxuICAgIHsgeDogLTEsIHk6IDEgfSxcbl0sIElOVEVSU0VDVElPTl9PRkZTRVRTX0xFTiA9IElOVEVSU0VDVElPTl9PRkZTRVRTLmxlbmd0aDtcbmV4cG9ydCBjbGFzcyBMYXllciBleHRlbmRzIENvbnRhaW5lciB7XG4gICAgY29uc3RydWN0b3IoY29uZmlnKSB7XG4gICAgICAgIHN1cGVyKGNvbmZpZyk7XG4gICAgICAgIHRoaXMuY2FudmFzID0gbmV3IFNjZW5lQ2FudmFzKCk7XG4gICAgICAgIHRoaXMuaGl0Q2FudmFzID0gbmV3IEhpdENhbnZhcyh7XG4gICAgICAgICAgICBwaXhlbFJhdGlvOiAxLFxuICAgICAgICB9KTtcbiAgICAgICAgdGhpcy5fd2FpdGluZ0ZvckRyYXcgPSBmYWxzZTtcbiAgICAgICAgdGhpcy5vbigndmlzaWJsZUNoYW5nZS5rb252YScsIHRoaXMuX2NoZWNrVmlzaWJpbGl0eSk7XG4gICAgICAgIHRoaXMuX2NoZWNrVmlzaWJpbGl0eSgpO1xuICAgICAgICB0aGlzLm9uKCdpbWFnZVNtb290aGluZ0VuYWJsZWRDaGFuZ2Uua29udmEnLCB0aGlzLl9zZXRTbW9vdGhFbmFibGVkKTtcbiAgICAgICAgdGhpcy5fc2V0U21vb3RoRW5hYmxlZCgpO1xuICAgIH1cbiAgICBjcmVhdGVQTkdTdHJlYW0oKSB7XG4gICAgICAgIGNvbnN0IGMgPSB0aGlzLmNhbnZhcy5fY2FudmFzO1xuICAgICAgICByZXR1cm4gYy5jcmVhdGVQTkdTdHJlYW0oKTtcbiAgICB9XG4gICAgZ2V0Q2FudmFzKCkge1xuICAgICAgICByZXR1cm4gdGhpcy5jYW52YXM7XG4gICAgfVxuICAgIGdldE5hdGl2ZUNhbnZhc0VsZW1lbnQoKSB7XG4gICAgICAgIHJldHVybiB0aGlzLmNhbnZhcy5fY2FudmFzO1xuICAgIH1cbiAgICBnZXRIaXRDYW52YXMoKSB7XG4gICAgICAgIHJldHVybiB0aGlzLmhpdENhbnZhcztcbiAgICB9XG4gICAgZ2V0Q29udGV4dCgpIHtcbiAgICAgICAgcmV0dXJuIHRoaXMuZ2V0Q2FudmFzKCkuZ2V0Q29udGV4dCgpO1xuICAgIH1cbiAgICBjbGVhcihib3VuZHMpIHtcbiAgICAgICAgdGhpcy5nZXRDb250ZXh0KCkuY2xlYXIoYm91bmRzKTtcbiAgICAgICAgdGhpcy5nZXRIaXRDYW52YXMoKS5nZXRDb250ZXh0KCkuY2xlYXIoYm91bmRzKTtcbiAgICAgICAgcmV0dXJuIHRoaXM7XG4gICAgfVxuICAgIHNldFpJbmRleChpbmRleCkge1xuICAgICAgICBzdXBlci5zZXRaSW5kZXgoaW5kZXgpO1xuICAgICAgICB2YXIgc3RhZ2UgPSB0aGlzLmdldFN0YWdlKCk7XG4gICAgICAgIGlmIChzdGFnZSAmJiBzdGFnZS5jb250ZW50KSB7XG4gICAgICAgICAgICBzdGFnZS5jb250ZW50LnJlbW92ZUNoaWxkKHRoaXMuZ2V0TmF0aXZlQ2FudmFzRWxlbWVudCgpKTtcbiAgICAgICAgICAgIGlmIChpbmRleCA8IHN0YWdlLmNoaWxkcmVuLmxlbmd0aCAtIDEpIHtcbiAgICAgICAgICAgICAgICBzdGFnZS5jb250ZW50Lmluc2VydEJlZm9yZSh0aGlzLmdldE5hdGl2ZUNhbnZhc0VsZW1lbnQoKSwgc3RhZ2UuY2hpbGRyZW5baW5kZXggKyAxXS5nZXRDYW52YXMoKS5fY2FudmFzKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGVsc2Uge1xuICAgICAgICAgICAgICAgIHN0YWdlLmNvbnRlbnQuYXBwZW5kQ2hpbGQodGhpcy5nZXROYXRpdmVDYW52YXNFbGVtZW50KCkpO1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICAgIHJldHVybiB0aGlzO1xuICAgIH1cbiAgICBtb3ZlVG9Ub3AoKSB7XG4gICAgICAgIE5vZGUucHJvdG90eXBlLm1vdmVUb1RvcC5jYWxsKHRoaXMpO1xuICAgICAgICB2YXIgc3RhZ2UgPSB0aGlzLmdldFN0YWdlKCk7XG4gICAgICAgIGlmIChzdGFnZSAmJiBzdGFnZS5jb250ZW50KSB7XG4gICAgICAgICAgICBzdGFnZS5jb250ZW50LnJlbW92ZUNoaWxkKHRoaXMuZ2V0TmF0aXZlQ2FudmFzRWxlbWVudCgpKTtcbiAgICAgICAgICAgIHN0YWdlLmNvbnRlbnQuYXBwZW5kQ2hpbGQodGhpcy5nZXROYXRpdmVDYW52YXNFbGVtZW50KCkpO1xuICAgICAgICB9XG4gICAgICAgIHJldHVybiB0cnVlO1xuICAgIH1cbiAgICBtb3ZlVXAoKSB7XG4gICAgICAgIHZhciBtb3ZlZCA9IE5vZGUucHJvdG90eXBlLm1vdmVVcC5jYWxsKHRoaXMpO1xuICAgICAgICBpZiAoIW1vdmVkKSB7XG4gICAgICAgICAgICByZXR1cm4gZmFsc2U7XG4gICAgICAgIH1cbiAgICAgICAgdmFyIHN0YWdlID0gdGhpcy5nZXRTdGFnZSgpO1xuICAgICAgICBpZiAoIXN0YWdlIHx8ICFzdGFnZS5jb250ZW50KSB7XG4gICAgICAgICAgICByZXR1cm4gZmFsc2U7XG4gICAgICAgIH1cbiAgICAgICAgc3RhZ2UuY29udGVudC5yZW1vdmVDaGlsZCh0aGlzLmdldE5hdGl2ZUNhbnZhc0VsZW1lbnQoKSk7XG4gICAgICAgIGlmICh0aGlzLmluZGV4IDwgc3RhZ2UuY2hpbGRyZW4ubGVuZ3RoIC0gMSkge1xuICAgICAgICAgICAgc3RhZ2UuY29udGVudC5pbnNlcnRCZWZvcmUodGhpcy5nZXROYXRpdmVDYW52YXNFbGVtZW50KCksIHN0YWdlLmNoaWxkcmVuW3RoaXMuaW5kZXggKyAxXS5nZXRDYW52YXMoKS5fY2FudmFzKTtcbiAgICAgICAgfVxuICAgICAgICBlbHNlIHtcbiAgICAgICAgICAgIHN0YWdlLmNvbnRlbnQuYXBwZW5kQ2hpbGQodGhpcy5nZXROYXRpdmVDYW52YXNFbGVtZW50KCkpO1xuICAgICAgICB9XG4gICAgICAgIHJldHVybiB0cnVlO1xuICAgIH1cbiAgICBtb3ZlRG93bigpIHtcbiAgICAgICAgaWYgKE5vZGUucHJvdG90eXBlLm1vdmVEb3duLmNhbGwodGhpcykpIHtcbiAgICAgICAgICAgIHZhciBzdGFnZSA9IHRoaXMuZ2V0U3RhZ2UoKTtcbiAgICAgICAgICAgIGlmIChzdGFnZSkge1xuICAgICAgICAgICAgICAgIHZhciBjaGlsZHJlbiA9IHN0YWdlLmNoaWxkcmVuO1xuICAgICAgICAgICAgICAgIGlmIChzdGFnZS5jb250ZW50KSB7XG4gICAgICAgICAgICAgICAgICAgIHN0YWdlLmNvbnRlbnQucmVtb3ZlQ2hpbGQodGhpcy5nZXROYXRpdmVDYW52YXNFbGVtZW50KCkpO1xuICAgICAgICAgICAgICAgICAgICBzdGFnZS5jb250ZW50Lmluc2VydEJlZm9yZSh0aGlzLmdldE5hdGl2ZUNhbnZhc0VsZW1lbnQoKSwgY2hpbGRyZW5bdGhpcy5pbmRleCArIDFdLmdldENhbnZhcygpLl9jYW52YXMpO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIHJldHVybiB0cnVlO1xuICAgICAgICB9XG4gICAgICAgIHJldHVybiBmYWxzZTtcbiAgICB9XG4gICAgbW92ZVRvQm90dG9tKCkge1xuICAgICAgICBpZiAoTm9kZS5wcm90b3R5cGUubW92ZVRvQm90dG9tLmNhbGwodGhpcykpIHtcbiAgICAgICAgICAgIHZhciBzdGFnZSA9IHRoaXMuZ2V0U3RhZ2UoKTtcbiAgICAgICAgICAgIGlmIChzdGFnZSkge1xuICAgICAgICAgICAgICAgIHZhciBjaGlsZHJlbiA9IHN0YWdlLmNoaWxkcmVuO1xuICAgICAgICAgICAgICAgIGlmIChzdGFnZS5jb250ZW50KSB7XG4gICAgICAgICAgICAgICAgICAgIHN0YWdlLmNvbnRlbnQucmVtb3ZlQ2hpbGQodGhpcy5nZXROYXRpdmVDYW52YXNFbGVtZW50KCkpO1xuICAgICAgICAgICAgICAgICAgICBzdGFnZS5jb250ZW50Lmluc2VydEJlZm9yZSh0aGlzLmdldE5hdGl2ZUNhbnZhc0VsZW1lbnQoKSwgY2hpbGRyZW5bMV0uZ2V0Q2FudmFzKCkuX2NhbnZhcyk7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfVxuICAgICAgICAgICAgcmV0dXJuIHRydWU7XG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuIGZhbHNlO1xuICAgIH1cbiAgICBnZXRMYXllcigpIHtcbiAgICAgICAgcmV0dXJuIHRoaXM7XG4gICAgfVxuICAgIHJlbW92ZSgpIHtcbiAgICAgICAgdmFyIF9jYW52YXMgPSB0aGlzLmdldE5hdGl2ZUNhbnZhc0VsZW1lbnQoKTtcbiAgICAgICAgTm9kZS5wcm90b3R5cGUucmVtb3ZlLmNhbGwodGhpcyk7XG4gICAgICAgIGlmIChfY2FudmFzICYmIF9jYW52YXMucGFyZW50Tm9kZSAmJiBVdGlsLl9pc0luRG9jdW1lbnQoX2NhbnZhcykpIHtcbiAgICAgICAgICAgIF9jYW52YXMucGFyZW50Tm9kZS5yZW1vdmVDaGlsZChfY2FudmFzKTtcbiAgICAgICAgfVxuICAgICAgICByZXR1cm4gdGhpcztcbiAgICB9XG4gICAgZ2V0U3RhZ2UoKSB7XG4gICAgICAgIHJldHVybiB0aGlzLnBhcmVudDtcbiAgICB9XG4gICAgc2V0U2l6ZSh7IHdpZHRoLCBoZWlnaHQgfSkge1xuICAgICAgICB0aGlzLmNhbnZhcy5zZXRTaXplKHdpZHRoLCBoZWlnaHQpO1xuICAgICAgICB0aGlzLmhpdENhbnZhcy5zZXRTaXplKHdpZHRoLCBoZWlnaHQpO1xuICAgICAgICB0aGlzLl9zZXRTbW9vdGhFbmFibGVkKCk7XG4gICAgICAgIHJldHVybiB0aGlzO1xuICAgIH1cbiAgICBfdmFsaWRhdGVBZGQoY2hpbGQpIHtcbiAgICAgICAgdmFyIHR5cGUgPSBjaGlsZC5nZXRUeXBlKCk7XG4gICAgICAgIGlmICh0eXBlICE9PSAnR3JvdXAnICYmIHR5cGUgIT09ICdTaGFwZScpIHtcbiAgICAgICAgICAgIFV0aWwudGhyb3coJ1lvdSBtYXkgb25seSBhZGQgZ3JvdXBzIGFuZCBzaGFwZXMgdG8gYSBsYXllci4nKTtcbiAgICAgICAgfVxuICAgIH1cbiAgICBfdG9Lb252YUNhbnZhcyhjb25maWcpIHtcbiAgICAgICAgY29uZmlnID0gY29uZmlnIHx8IHt9O1xuICAgICAgICBjb25maWcud2lkdGggPSBjb25maWcud2lkdGggfHwgdGhpcy5nZXRXaWR0aCgpO1xuICAgICAgICBjb25maWcuaGVpZ2h0ID0gY29uZmlnLmhlaWdodCB8fCB0aGlzLmdldEhlaWdodCgpO1xuICAgICAgICBjb25maWcueCA9IGNvbmZpZy54ICE9PSB1bmRlZmluZWQgPyBjb25maWcueCA6IHRoaXMueCgpO1xuICAgICAgICBjb25maWcueSA9IGNvbmZpZy55ICE9PSB1bmRlZmluZWQgPyBjb25maWcueSA6IHRoaXMueSgpO1xuICAgICAgICByZXR1cm4gTm9kZS5wcm90b3R5cGUuX3RvS29udmFDYW52YXMuY2FsbCh0aGlzLCBjb25maWcpO1xuICAgIH1cbiAgICBfY2hlY2tWaXNpYmlsaXR5KCkge1xuICAgICAgICBjb25zdCB2aXNpYmxlID0gdGhpcy52aXNpYmxlKCk7XG4gICAgICAgIGlmICh2aXNpYmxlKSB7XG4gICAgICAgICAgICB0aGlzLmNhbnZhcy5fY2FudmFzLnN0eWxlLmRpc3BsYXkgPSAnYmxvY2snO1xuICAgICAgICB9XG4gICAgICAgIGVsc2Uge1xuICAgICAgICAgICAgdGhpcy5jYW52YXMuX2NhbnZhcy5zdHlsZS5kaXNwbGF5ID0gJ25vbmUnO1xuICAgICAgICB9XG4gICAgfVxuICAgIF9zZXRTbW9vdGhFbmFibGVkKCkge1xuICAgICAgICB0aGlzLmdldENvbnRleHQoKS5fY29udGV4dC5pbWFnZVNtb290aGluZ0VuYWJsZWQgPVxuICAgICAgICAgICAgdGhpcy5pbWFnZVNtb290aGluZ0VuYWJsZWQoKTtcbiAgICB9XG4gICAgZ2V0V2lkdGgoKSB7XG4gICAgICAgIGlmICh0aGlzLnBhcmVudCkge1xuICAgICAgICAgICAgcmV0dXJuIHRoaXMucGFyZW50LndpZHRoKCk7XG4gICAgICAgIH1cbiAgICB9XG4gICAgc2V0V2lkdGgoKSB7XG4gICAgICAgIFV0aWwud2FybignQ2FuIG5vdCBjaGFuZ2Ugd2lkdGggb2YgbGF5ZXIuIFVzZSBcInN0YWdlLndpZHRoKHZhbHVlKVwiIGZ1bmN0aW9uIGluc3RlYWQuJyk7XG4gICAgfVxuICAgIGdldEhlaWdodCgpIHtcbiAgICAgICAgaWYgKHRoaXMucGFyZW50KSB7XG4gICAgICAgICAgICByZXR1cm4gdGhpcy5wYXJlbnQuaGVpZ2h0KCk7XG4gICAgICAgIH1cbiAgICB9XG4gICAgc2V0SGVpZ2h0KCkge1xuICAgICAgICBVdGlsLndhcm4oJ0NhbiBub3QgY2hhbmdlIGhlaWdodCBvZiBsYXllci4gVXNlIFwic3RhZ2UuaGVpZ2h0KHZhbHVlKVwiIGZ1bmN0aW9uIGluc3RlYWQuJyk7XG4gICAgfVxuICAgIGJhdGNoRHJhdygpIHtcbiAgICAgICAgaWYgKCF0aGlzLl93YWl0aW5nRm9yRHJhdykge1xuICAgICAgICAgICAgdGhpcy5fd2FpdGluZ0ZvckRyYXcgPSB0cnVlO1xuICAgICAgICAgICAgVXRpbC5yZXF1ZXN0QW5pbUZyYW1lKCgpID0+IHtcbiAgICAgICAgICAgICAgICB0aGlzLmRyYXcoKTtcbiAgICAgICAgICAgICAgICB0aGlzLl93YWl0aW5nRm9yRHJhdyA9IGZhbHNlO1xuICAgICAgICAgICAgfSk7XG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuIHRoaXM7XG4gICAgfVxuICAgIGdldEludGVyc2VjdGlvbihwb3MpIHtcbiAgICAgICAgaWYgKCF0aGlzLmlzTGlzdGVuaW5nKCkgfHwgIXRoaXMuaXNWaXNpYmxlKCkpIHtcbiAgICAgICAgICAgIHJldHVybiBudWxsO1xuICAgICAgICB9XG4gICAgICAgIHZhciBzcGlyYWxTZWFyY2hEaXN0YW5jZSA9IDE7XG4gICAgICAgIHZhciBjb250aW51ZVNlYXJjaCA9IGZhbHNlO1xuICAgICAgICB3aGlsZSAodHJ1ZSkge1xuICAgICAgICAgICAgZm9yIChsZXQgaSA9IDA7IGkgPCBJTlRFUlNFQ1RJT05fT0ZGU0VUU19MRU47IGkrKykge1xuICAgICAgICAgICAgICAgIGNvbnN0IGludGVyc2VjdGlvbk9mZnNldCA9IElOVEVSU0VDVElPTl9PRkZTRVRTW2ldO1xuICAgICAgICAgICAgICAgIGNvbnN0IG9iaiA9IHRoaXMuX2dldEludGVyc2VjdGlvbih7XG4gICAgICAgICAgICAgICAgICAgIHg6IHBvcy54ICsgaW50ZXJzZWN0aW9uT2Zmc2V0LnggKiBzcGlyYWxTZWFyY2hEaXN0YW5jZSxcbiAgICAgICAgICAgICAgICAgICAgeTogcG9zLnkgKyBpbnRlcnNlY3Rpb25PZmZzZXQueSAqIHNwaXJhbFNlYXJjaERpc3RhbmNlLFxuICAgICAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgICAgIGNvbnN0IHNoYXBlID0gb2JqLnNoYXBlO1xuICAgICAgICAgICAgICAgIGlmIChzaGFwZSkge1xuICAgICAgICAgICAgICAgICAgICByZXR1cm4gc2hhcGU7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIGNvbnRpbnVlU2VhcmNoID0gISFvYmouYW50aWFsaWFzZWQ7XG4gICAgICAgICAgICAgICAgaWYgKCFvYmouYW50aWFsaWFzZWQpIHtcbiAgICAgICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfVxuICAgICAgICAgICAgaWYgKGNvbnRpbnVlU2VhcmNoKSB7XG4gICAgICAgICAgICAgICAgc3BpcmFsU2VhcmNoRGlzdGFuY2UgKz0gMTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGVsc2Uge1xuICAgICAgICAgICAgICAgIHJldHVybiBudWxsO1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgfVxuICAgIF9nZXRJbnRlcnNlY3Rpb24ocG9zKSB7XG4gICAgICAgIGNvbnN0IHJhdGlvID0gdGhpcy5oaXRDYW52YXMucGl4ZWxSYXRpbztcbiAgICAgICAgY29uc3QgcCA9IHRoaXMuaGl0Q2FudmFzLmNvbnRleHQuZ2V0SW1hZ2VEYXRhKE1hdGgucm91bmQocG9zLnggKiByYXRpbyksIE1hdGgucm91bmQocG9zLnkgKiByYXRpbyksIDEsIDEpLmRhdGE7XG4gICAgICAgIGNvbnN0IHAzID0gcFszXTtcbiAgICAgICAgaWYgKHAzID09PSAyNTUpIHtcbiAgICAgICAgICAgIGNvbnN0IGNvbG9yS2V5ID0gVXRpbC5fcmdiVG9IZXgocFswXSwgcFsxXSwgcFsyXSk7XG4gICAgICAgICAgICBjb25zdCBzaGFwZSA9IHNoYXBlc1tIQVNIICsgY29sb3JLZXldO1xuICAgICAgICAgICAgaWYgKHNoYXBlKSB7XG4gICAgICAgICAgICAgICAgcmV0dXJuIHtcbiAgICAgICAgICAgICAgICAgICAgc2hhcGU6IHNoYXBlLFxuICAgICAgICAgICAgICAgIH07XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICByZXR1cm4ge1xuICAgICAgICAgICAgICAgIGFudGlhbGlhc2VkOiB0cnVlLFxuICAgICAgICAgICAgfTtcbiAgICAgICAgfVxuICAgICAgICBlbHNlIGlmIChwMyA+IDApIHtcbiAgICAgICAgICAgIHJldHVybiB7XG4gICAgICAgICAgICAgICAgYW50aWFsaWFzZWQ6IHRydWUsXG4gICAgICAgICAgICB9O1xuICAgICAgICB9XG4gICAgICAgIHJldHVybiB7fTtcbiAgICB9XG4gICAgZHJhd1NjZW5lKGNhbiwgdG9wKSB7XG4gICAgICAgIHZhciBsYXllciA9IHRoaXMuZ2V0TGF5ZXIoKSwgY2FudmFzID0gY2FuIHx8IChsYXllciAmJiBsYXllci5nZXRDYW52YXMoKSk7XG4gICAgICAgIHRoaXMuX2ZpcmUoQkVGT1JFX0RSQVcsIHtcbiAgICAgICAgICAgIG5vZGU6IHRoaXMsXG4gICAgICAgIH0pO1xuICAgICAgICBpZiAodGhpcy5jbGVhckJlZm9yZURyYXcoKSkge1xuICAgICAgICAgICAgY2FudmFzLmdldENvbnRleHQoKS5jbGVhcigpO1xuICAgICAgICB9XG4gICAgICAgIENvbnRhaW5lci5wcm90b3R5cGUuZHJhd1NjZW5lLmNhbGwodGhpcywgY2FudmFzLCB0b3ApO1xuICAgICAgICB0aGlzLl9maXJlKERSQVcsIHtcbiAgICAgICAgICAgIG5vZGU6IHRoaXMsXG4gICAgICAgIH0pO1xuICAgICAgICByZXR1cm4gdGhpcztcbiAgICB9XG4gICAgZHJhd0hpdChjYW4sIHRvcCkge1xuICAgICAgICB2YXIgbGF5ZXIgPSB0aGlzLmdldExheWVyKCksIGNhbnZhcyA9IGNhbiB8fCAobGF5ZXIgJiYgbGF5ZXIuaGl0Q2FudmFzKTtcbiAgICAgICAgaWYgKGxheWVyICYmIGxheWVyLmNsZWFyQmVmb3JlRHJhdygpKSB7XG4gICAgICAgICAgICBsYXllci5nZXRIaXRDYW52YXMoKS5nZXRDb250ZXh0KCkuY2xlYXIoKTtcbiAgICAgICAgfVxuICAgICAgICBDb250YWluZXIucHJvdG90eXBlLmRyYXdIaXQuY2FsbCh0aGlzLCBjYW52YXMsIHRvcCk7XG4gICAgICAgIHJldHVybiB0aGlzO1xuICAgIH1cbiAgICBlbmFibGVIaXRHcmFwaCgpIHtcbiAgICAgICAgdGhpcy5oaXRHcmFwaEVuYWJsZWQodHJ1ZSk7XG4gICAgICAgIHJldHVybiB0aGlzO1xuICAgIH1cbiAgICBkaXNhYmxlSGl0R3JhcGgoKSB7XG4gICAgICAgIHRoaXMuaGl0R3JhcGhFbmFibGVkKGZhbHNlKTtcbiAgICAgICAgcmV0dXJuIHRoaXM7XG4gICAgfVxuICAgIHNldEhpdEdyYXBoRW5hYmxlZCh2YWwpIHtcbiAgICAgICAgVXRpbC53YXJuKCdoaXRHcmFwaEVuYWJsZWQgbWV0aG9kIGlzIGRlcHJlY2F0ZWQuIFBsZWFzZSB1c2UgbGF5ZXIubGlzdGVuaW5nKCkgaW5zdGVhZC4nKTtcbiAgICAgICAgdGhpcy5saXN0ZW5pbmcodmFsKTtcbiAgICB9XG4gICAgZ2V0SGl0R3JhcGhFbmFibGVkKHZhbCkge1xuICAgICAgICBVdGlsLndhcm4oJ2hpdEdyYXBoRW5hYmxlZCBtZXRob2QgaXMgZGVwcmVjYXRlZC4gUGxlYXNlIHVzZSBsYXllci5saXN0ZW5pbmcoKSBpbnN0ZWFkLicpO1xuICAgICAgICByZXR1cm4gdGhpcy5saXN0ZW5pbmcoKTtcbiAgICB9XG4gICAgdG9nZ2xlSGl0Q2FudmFzKCkge1xuICAgICAgICBpZiAoIXRoaXMucGFyZW50IHx8ICF0aGlzLnBhcmVudFsnY29udGVudCddKSB7XG4gICAgICAgICAgICByZXR1cm47XG4gICAgICAgIH1cbiAgICAgICAgdmFyIHBhcmVudCA9IHRoaXMucGFyZW50O1xuICAgICAgICB2YXIgYWRkZWQgPSAhIXRoaXMuaGl0Q2FudmFzLl9jYW52YXMucGFyZW50Tm9kZTtcbiAgICAgICAgaWYgKGFkZGVkKSB7XG4gICAgICAgICAgICBwYXJlbnQuY29udGVudC5yZW1vdmVDaGlsZCh0aGlzLmhpdENhbnZhcy5fY2FudmFzKTtcbiAgICAgICAgfVxuICAgICAgICBlbHNlIHtcbiAgICAgICAgICAgIHBhcmVudC5jb250ZW50LmFwcGVuZENoaWxkKHRoaXMuaGl0Q2FudmFzLl9jYW52YXMpO1xuICAgICAgICB9XG4gICAgfVxuICAgIGRlc3Ryb3koKSB7XG4gICAgICAgIFV0aWwucmVsZWFzZUNhbnZhcyh0aGlzLmdldE5hdGl2ZUNhbnZhc0VsZW1lbnQoKSwgdGhpcy5nZXRIaXRDYW52YXMoKS5fY2FudmFzKTtcbiAgICAgICAgcmV0dXJuIHN1cGVyLmRlc3Ryb3koKTtcbiAgICB9XG59XG5MYXllci5wcm90b3R5cGUubm9kZVR5cGUgPSAnTGF5ZXInO1xuX3JlZ2lzdGVyTm9kZShMYXllcik7XG5GYWN0b3J5LmFkZEdldHRlclNldHRlcihMYXllciwgJ2ltYWdlU21vb3RoaW5nRW5hYmxlZCcsIHRydWUpO1xuRmFjdG9yeS5hZGRHZXR0ZXJTZXR0ZXIoTGF5ZXIsICdjbGVhckJlZm9yZURyYXcnLCB0cnVlKTtcbkZhY3RvcnkuYWRkR2V0dGVyU2V0dGVyKExheWVyLCAnaGl0R3JhcGhFbmFibGVkJywgdHJ1ZSwgZ2V0Qm9vbGVhblZhbGlkYXRvcigpKTtcbiIsImltcG9ydCB7IFV0aWwsIFRyYW5zZm9ybSB9IGZyb20gJy4vVXRpbC5qcyc7XG5pbXBvcnQgeyBGYWN0b3J5IH0gZnJvbSAnLi9GYWN0b3J5LmpzJztcbmltcG9ydCB7IFNjZW5lQ2FudmFzLCBIaXRDYW52YXMgfSBmcm9tICcuL0NhbnZhcy5qcyc7XG5pbXBvcnQgeyBLb252YSB9IGZyb20gJy4vR2xvYmFsLmpzJztcbmltcG9ydCB7IEREIH0gZnJvbSAnLi9EcmFnQW5kRHJvcC5qcyc7XG5pbXBvcnQgeyBnZXROdW1iZXJWYWxpZGF0b3IsIGdldFN0cmluZ1ZhbGlkYXRvciwgZ2V0Qm9vbGVhblZhbGlkYXRvciwgfSBmcm9tICcuL1ZhbGlkYXRvcnMuanMnO1xudmFyIEFCU09MVVRFX09QQUNJVFkgPSAnYWJzb2x1dGVPcGFjaXR5JywgQUxMX0xJU1RFTkVSUyA9ICdhbGxFdmVudExpc3RlbmVycycsIEFCU09MVVRFX1RSQU5TRk9STSA9ICdhYnNvbHV0ZVRyYW5zZm9ybScsIEFCU09MVVRFX1NDQUxFID0gJ2Fic29sdXRlU2NhbGUnLCBDQU5WQVMgPSAnY2FudmFzJywgQ0hBTkdFID0gJ0NoYW5nZScsIENISUxEUkVOID0gJ2NoaWxkcmVuJywgS09OVkEgPSAna29udmEnLCBMSVNURU5JTkcgPSAnbGlzdGVuaW5nJywgTU9VU0VFTlRFUiA9ICdtb3VzZWVudGVyJywgTU9VU0VMRUFWRSA9ICdtb3VzZWxlYXZlJywgTkFNRSA9ICduYW1lJywgU0VUID0gJ3NldCcsIFNIQVBFID0gJ1NoYXBlJywgU1BBQ0UgPSAnICcsIFNUQUdFID0gJ3N0YWdlJywgVFJBTlNGT1JNID0gJ3RyYW5zZm9ybScsIFVQUEVSX1NUQUdFID0gJ1N0YWdlJywgVklTSUJMRSA9ICd2aXNpYmxlJywgVFJBTlNGT1JNX0NIQU5HRV9TVFIgPSBbXG4gICAgJ3hDaGFuZ2Uua29udmEnLFxuICAgICd5Q2hhbmdlLmtvbnZhJyxcbiAgICAnc2NhbGVYQ2hhbmdlLmtvbnZhJyxcbiAgICAnc2NhbGVZQ2hhbmdlLmtvbnZhJyxcbiAgICAnc2tld1hDaGFuZ2Uua29udmEnLFxuICAgICdza2V3WUNoYW5nZS5rb252YScsXG4gICAgJ3JvdGF0aW9uQ2hhbmdlLmtvbnZhJyxcbiAgICAnb2Zmc2V0WENoYW5nZS5rb252YScsXG4gICAgJ29mZnNldFlDaGFuZ2Uua29udmEnLFxuICAgICd0cmFuc2Zvcm1zRW5hYmxlZENoYW5nZS5rb252YScsXG5dLmpvaW4oU1BBQ0UpO1xubGV0IGlkQ291bnRlciA9IDE7XG5leHBvcnQgY2xhc3MgTm9kZSB7XG4gICAgY29uc3RydWN0b3IoY29uZmlnKSB7XG4gICAgICAgIHRoaXMuX2lkID0gaWRDb3VudGVyKys7XG4gICAgICAgIHRoaXMuZXZlbnRMaXN0ZW5lcnMgPSB7fTtcbiAgICAgICAgdGhpcy5hdHRycyA9IHt9O1xuICAgICAgICB0aGlzLmluZGV4ID0gMDtcbiAgICAgICAgdGhpcy5fYWxsRXZlbnRMaXN0ZW5lcnMgPSBudWxsO1xuICAgICAgICB0aGlzLnBhcmVudCA9IG51bGw7XG4gICAgICAgIHRoaXMuX2NhY2hlID0gbmV3IE1hcCgpO1xuICAgICAgICB0aGlzLl9hdHRhY2hlZERlcHNMaXN0ZW5lcnMgPSBuZXcgTWFwKCk7XG4gICAgICAgIHRoaXMuX2xhc3RQb3MgPSBudWxsO1xuICAgICAgICB0aGlzLl9iYXRjaGluZ1RyYW5zZm9ybUNoYW5nZSA9IGZhbHNlO1xuICAgICAgICB0aGlzLl9uZWVkQ2xlYXJUcmFuc2Zvcm1DYWNoZSA9IGZhbHNlO1xuICAgICAgICB0aGlzLl9maWx0ZXJVcFRvRGF0ZSA9IGZhbHNlO1xuICAgICAgICB0aGlzLl9pc1VuZGVyQ2FjaGUgPSBmYWxzZTtcbiAgICAgICAgdGhpcy5fZHJhZ0V2ZW50SWQgPSBudWxsO1xuICAgICAgICB0aGlzLl9zaG91bGRGaXJlQ2hhbmdlRXZlbnRzID0gZmFsc2U7XG4gICAgICAgIHRoaXMuc2V0QXR0cnMoY29uZmlnKTtcbiAgICAgICAgdGhpcy5fc2hvdWxkRmlyZUNoYW5nZUV2ZW50cyA9IHRydWU7XG4gICAgfVxuICAgIGhhc0NoaWxkcmVuKCkge1xuICAgICAgICByZXR1cm4gZmFsc2U7XG4gICAgfVxuICAgIF9jbGVhckNhY2hlKGF0dHIpIHtcbiAgICAgICAgaWYgKChhdHRyID09PSBUUkFOU0ZPUk0gfHwgYXR0ciA9PT0gQUJTT0xVVEVfVFJBTlNGT1JNKSAmJlxuICAgICAgICAgICAgdGhpcy5fY2FjaGUuZ2V0KGF0dHIpKSB7XG4gICAgICAgICAgICB0aGlzLl9jYWNoZS5nZXQoYXR0cikuZGlydHkgPSB0cnVlO1xuICAgICAgICB9XG4gICAgICAgIGVsc2UgaWYgKGF0dHIpIHtcbiAgICAgICAgICAgIHRoaXMuX2NhY2hlLmRlbGV0ZShhdHRyKTtcbiAgICAgICAgfVxuICAgICAgICBlbHNlIHtcbiAgICAgICAgICAgIHRoaXMuX2NhY2hlLmNsZWFyKCk7XG4gICAgICAgIH1cbiAgICB9XG4gICAgX2dldENhY2hlKGF0dHIsIHByaXZhdGVHZXR0ZXIpIHtcbiAgICAgICAgdmFyIGNhY2hlID0gdGhpcy5fY2FjaGUuZ2V0KGF0dHIpO1xuICAgICAgICB2YXIgaXNUcmFuc2Zvcm0gPSBhdHRyID09PSBUUkFOU0ZPUk0gfHwgYXR0ciA9PT0gQUJTT0xVVEVfVFJBTlNGT1JNO1xuICAgICAgICB2YXIgaW52YWxpZCA9IGNhY2hlID09PSB1bmRlZmluZWQgfHwgKGlzVHJhbnNmb3JtICYmIGNhY2hlLmRpcnR5ID09PSB0cnVlKTtcbiAgICAgICAgaWYgKGludmFsaWQpIHtcbiAgICAgICAgICAgIGNhY2hlID0gcHJpdmF0ZUdldHRlci5jYWxsKHRoaXMpO1xuICAgICAgICAgICAgdGhpcy5fY2FjaGUuc2V0KGF0dHIsIGNhY2hlKTtcbiAgICAgICAgfVxuICAgICAgICByZXR1cm4gY2FjaGU7XG4gICAgfVxuICAgIF9jYWxjdWxhdGUobmFtZSwgZGVwcywgZ2V0dGVyKSB7XG4gICAgICAgIGlmICghdGhpcy5fYXR0YWNoZWREZXBzTGlzdGVuZXJzLmdldChuYW1lKSkge1xuICAgICAgICAgICAgY29uc3QgZGVwc1N0cmluZyA9IGRlcHMubWFwKChkZXApID0+IGRlcCArICdDaGFuZ2Uua29udmEnKS5qb2luKFNQQUNFKTtcbiAgICAgICAgICAgIHRoaXMub24oZGVwc1N0cmluZywgKCkgPT4ge1xuICAgICAgICAgICAgICAgIHRoaXMuX2NsZWFyQ2FjaGUobmFtZSk7XG4gICAgICAgICAgICB9KTtcbiAgICAgICAgICAgIHRoaXMuX2F0dGFjaGVkRGVwc0xpc3RlbmVycy5zZXQobmFtZSwgdHJ1ZSk7XG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuIHRoaXMuX2dldENhY2hlKG5hbWUsIGdldHRlcik7XG4gICAgfVxuICAgIF9nZXRDYW52YXNDYWNoZSgpIHtcbiAgICAgICAgcmV0dXJuIHRoaXMuX2NhY2hlLmdldChDQU5WQVMpO1xuICAgIH1cbiAgICBfY2xlYXJTZWxmQW5kRGVzY2VuZGFudENhY2hlKGF0dHIpIHtcbiAgICAgICAgdGhpcy5fY2xlYXJDYWNoZShhdHRyKTtcbiAgICAgICAgaWYgKGF0dHIgPT09IEFCU09MVVRFX1RSQU5TRk9STSkge1xuICAgICAgICAgICAgdGhpcy5maXJlKCdhYnNvbHV0ZVRyYW5zZm9ybUNoYW5nZScpO1xuICAgICAgICB9XG4gICAgfVxuICAgIGNsZWFyQ2FjaGUoKSB7XG4gICAgICAgIGlmICh0aGlzLl9jYWNoZS5oYXMoQ0FOVkFTKSkge1xuICAgICAgICAgICAgY29uc3QgeyBzY2VuZSwgZmlsdGVyLCBoaXQgfSA9IHRoaXMuX2NhY2hlLmdldChDQU5WQVMpO1xuICAgICAgICAgICAgVXRpbC5yZWxlYXNlQ2FudmFzKHNjZW5lLCBmaWx0ZXIsIGhpdCk7XG4gICAgICAgICAgICB0aGlzLl9jYWNoZS5kZWxldGUoQ0FOVkFTKTtcbiAgICAgICAgfVxuICAgICAgICB0aGlzLl9jbGVhclNlbGZBbmREZXNjZW5kYW50Q2FjaGUoKTtcbiAgICAgICAgdGhpcy5fcmVxdWVzdERyYXcoKTtcbiAgICAgICAgcmV0dXJuIHRoaXM7XG4gICAgfVxuICAgIGNhY2hlKGNvbmZpZykge1xuICAgICAgICB2YXIgY29uZiA9IGNvbmZpZyB8fCB7fTtcbiAgICAgICAgdmFyIHJlY3QgPSB7fTtcbiAgICAgICAgaWYgKGNvbmYueCA9PT0gdW5kZWZpbmVkIHx8XG4gICAgICAgICAgICBjb25mLnkgPT09IHVuZGVmaW5lZCB8fFxuICAgICAgICAgICAgY29uZi53aWR0aCA9PT0gdW5kZWZpbmVkIHx8XG4gICAgICAgICAgICBjb25mLmhlaWdodCA9PT0gdW5kZWZpbmVkKSB7XG4gICAgICAgICAgICByZWN0ID0gdGhpcy5nZXRDbGllbnRSZWN0KHtcbiAgICAgICAgICAgICAgICBza2lwVHJhbnNmb3JtOiB0cnVlLFxuICAgICAgICAgICAgICAgIHJlbGF0aXZlVG86IHRoaXMuZ2V0UGFyZW50KCksXG4gICAgICAgICAgICB9KTtcbiAgICAgICAgfVxuICAgICAgICB2YXIgd2lkdGggPSBNYXRoLmNlaWwoY29uZi53aWR0aCB8fCByZWN0LndpZHRoKSwgaGVpZ2h0ID0gTWF0aC5jZWlsKGNvbmYuaGVpZ2h0IHx8IHJlY3QuaGVpZ2h0KSwgcGl4ZWxSYXRpbyA9IGNvbmYucGl4ZWxSYXRpbywgeCA9IGNvbmYueCA9PT0gdW5kZWZpbmVkID8gTWF0aC5mbG9vcihyZWN0LngpIDogY29uZi54LCB5ID0gY29uZi55ID09PSB1bmRlZmluZWQgPyBNYXRoLmZsb29yKHJlY3QueSkgOiBjb25mLnksIG9mZnNldCA9IGNvbmYub2Zmc2V0IHx8IDAsIGRyYXdCb3JkZXIgPSBjb25mLmRyYXdCb3JkZXIgfHwgZmFsc2UsIGhpdENhbnZhc1BpeGVsUmF0aW8gPSBjb25mLmhpdENhbnZhc1BpeGVsUmF0aW8gfHwgMTtcbiAgICAgICAgaWYgKCF3aWR0aCB8fCAhaGVpZ2h0KSB7XG4gICAgICAgICAgICBVdGlsLmVycm9yKCdDYW4gbm90IGNhY2hlIHRoZSBub2RlLiBXaWR0aCBvciBoZWlnaHQgb2YgdGhlIG5vZGUgZXF1YWxzIDAuIENhY2hpbmcgaXMgc2tpcHBlZC4nKTtcbiAgICAgICAgICAgIHJldHVybjtcbiAgICAgICAgfVxuICAgICAgICB3aWR0aCArPSBvZmZzZXQgKiAyICsgMTtcbiAgICAgICAgaGVpZ2h0ICs9IG9mZnNldCAqIDIgKyAxO1xuICAgICAgICB4IC09IG9mZnNldDtcbiAgICAgICAgeSAtPSBvZmZzZXQ7XG4gICAgICAgIHZhciBjYWNoZWRTY2VuZUNhbnZhcyA9IG5ldyBTY2VuZUNhbnZhcyh7XG4gICAgICAgICAgICBwaXhlbFJhdGlvOiBwaXhlbFJhdGlvLFxuICAgICAgICAgICAgd2lkdGg6IHdpZHRoLFxuICAgICAgICAgICAgaGVpZ2h0OiBoZWlnaHQsXG4gICAgICAgIH0pLCBjYWNoZWRGaWx0ZXJDYW52YXMgPSBuZXcgU2NlbmVDYW52YXMoe1xuICAgICAgICAgICAgcGl4ZWxSYXRpbzogcGl4ZWxSYXRpbyxcbiAgICAgICAgICAgIHdpZHRoOiAwLFxuICAgICAgICAgICAgaGVpZ2h0OiAwLFxuICAgICAgICB9KSwgY2FjaGVkSGl0Q2FudmFzID0gbmV3IEhpdENhbnZhcyh7XG4gICAgICAgICAgICBwaXhlbFJhdGlvOiBoaXRDYW52YXNQaXhlbFJhdGlvLFxuICAgICAgICAgICAgd2lkdGg6IHdpZHRoLFxuICAgICAgICAgICAgaGVpZ2h0OiBoZWlnaHQsXG4gICAgICAgIH0pLCBzY2VuZUNvbnRleHQgPSBjYWNoZWRTY2VuZUNhbnZhcy5nZXRDb250ZXh0KCksIGhpdENvbnRleHQgPSBjYWNoZWRIaXRDYW52YXMuZ2V0Q29udGV4dCgpO1xuICAgICAgICBjYWNoZWRIaXRDYW52YXMuaXNDYWNoZSA9IHRydWU7XG4gICAgICAgIGNhY2hlZFNjZW5lQ2FudmFzLmlzQ2FjaGUgPSB0cnVlO1xuICAgICAgICB0aGlzLl9jYWNoZS5kZWxldGUoQ0FOVkFTKTtcbiAgICAgICAgdGhpcy5fZmlsdGVyVXBUb0RhdGUgPSBmYWxzZTtcbiAgICAgICAgaWYgKGNvbmYuaW1hZ2VTbW9vdGhpbmdFbmFibGVkID09PSBmYWxzZSkge1xuICAgICAgICAgICAgY2FjaGVkU2NlbmVDYW52YXMuZ2V0Q29udGV4dCgpLl9jb250ZXh0LmltYWdlU21vb3RoaW5nRW5hYmxlZCA9IGZhbHNlO1xuICAgICAgICAgICAgY2FjaGVkRmlsdGVyQ2FudmFzLmdldENvbnRleHQoKS5fY29udGV4dC5pbWFnZVNtb290aGluZ0VuYWJsZWQgPSBmYWxzZTtcbiAgICAgICAgfVxuICAgICAgICBzY2VuZUNvbnRleHQuc2F2ZSgpO1xuICAgICAgICBoaXRDb250ZXh0LnNhdmUoKTtcbiAgICAgICAgc2NlbmVDb250ZXh0LnRyYW5zbGF0ZSgteCwgLXkpO1xuICAgICAgICBoaXRDb250ZXh0LnRyYW5zbGF0ZSgteCwgLXkpO1xuICAgICAgICB0aGlzLl9pc1VuZGVyQ2FjaGUgPSB0cnVlO1xuICAgICAgICB0aGlzLl9jbGVhclNlbGZBbmREZXNjZW5kYW50Q2FjaGUoQUJTT0xVVEVfT1BBQ0lUWSk7XG4gICAgICAgIHRoaXMuX2NsZWFyU2VsZkFuZERlc2NlbmRhbnRDYWNoZShBQlNPTFVURV9TQ0FMRSk7XG4gICAgICAgIHRoaXMuZHJhd1NjZW5lKGNhY2hlZFNjZW5lQ2FudmFzLCB0aGlzKTtcbiAgICAgICAgdGhpcy5kcmF3SGl0KGNhY2hlZEhpdENhbnZhcywgdGhpcyk7XG4gICAgICAgIHRoaXMuX2lzVW5kZXJDYWNoZSA9IGZhbHNlO1xuICAgICAgICBzY2VuZUNvbnRleHQucmVzdG9yZSgpO1xuICAgICAgICBoaXRDb250ZXh0LnJlc3RvcmUoKTtcbiAgICAgICAgaWYgKGRyYXdCb3JkZXIpIHtcbiAgICAgICAgICAgIHNjZW5lQ29udGV4dC5zYXZlKCk7XG4gICAgICAgICAgICBzY2VuZUNvbnRleHQuYmVnaW5QYXRoKCk7XG4gICAgICAgICAgICBzY2VuZUNvbnRleHQucmVjdCgwLCAwLCB3aWR0aCwgaGVpZ2h0KTtcbiAgICAgICAgICAgIHNjZW5lQ29udGV4dC5jbG9zZVBhdGgoKTtcbiAgICAgICAgICAgIHNjZW5lQ29udGV4dC5zZXRBdHRyKCdzdHJva2VTdHlsZScsICdyZWQnKTtcbiAgICAgICAgICAgIHNjZW5lQ29udGV4dC5zZXRBdHRyKCdsaW5lV2lkdGgnLCA1KTtcbiAgICAgICAgICAgIHNjZW5lQ29udGV4dC5zdHJva2UoKTtcbiAgICAgICAgICAgIHNjZW5lQ29udGV4dC5yZXN0b3JlKCk7XG4gICAgICAgIH1cbiAgICAgICAgdGhpcy5fY2FjaGUuc2V0KENBTlZBUywge1xuICAgICAgICAgICAgc2NlbmU6IGNhY2hlZFNjZW5lQ2FudmFzLFxuICAgICAgICAgICAgZmlsdGVyOiBjYWNoZWRGaWx0ZXJDYW52YXMsXG4gICAgICAgICAgICBoaXQ6IGNhY2hlZEhpdENhbnZhcyxcbiAgICAgICAgICAgIHg6IHgsXG4gICAgICAgICAgICB5OiB5LFxuICAgICAgICB9KTtcbiAgICAgICAgdGhpcy5fcmVxdWVzdERyYXcoKTtcbiAgICAgICAgcmV0dXJuIHRoaXM7XG4gICAgfVxuICAgIGlzQ2FjaGVkKCkge1xuICAgICAgICByZXR1cm4gdGhpcy5fY2FjaGUuaGFzKENBTlZBUyk7XG4gICAgfVxuICAgIGdldENsaWVudFJlY3QoY29uZmlnKSB7XG4gICAgICAgIHRocm93IG5ldyBFcnJvcignYWJzdHJhY3QgXCJnZXRDbGllbnRSZWN0XCIgbWV0aG9kIGNhbGwnKTtcbiAgICB9XG4gICAgX3RyYW5zZm9ybWVkUmVjdChyZWN0LCB0b3ApIHtcbiAgICAgICAgdmFyIHBvaW50cyA9IFtcbiAgICAgICAgICAgIHsgeDogcmVjdC54LCB5OiByZWN0LnkgfSxcbiAgICAgICAgICAgIHsgeDogcmVjdC54ICsgcmVjdC53aWR0aCwgeTogcmVjdC55IH0sXG4gICAgICAgICAgICB7IHg6IHJlY3QueCArIHJlY3Qud2lkdGgsIHk6IHJlY3QueSArIHJlY3QuaGVpZ2h0IH0sXG4gICAgICAgICAgICB7IHg6IHJlY3QueCwgeTogcmVjdC55ICsgcmVjdC5oZWlnaHQgfSxcbiAgICAgICAgXTtcbiAgICAgICAgdmFyIG1pblgsIG1pblksIG1heFgsIG1heFk7XG4gICAgICAgIHZhciB0cmFucyA9IHRoaXMuZ2V0QWJzb2x1dGVUcmFuc2Zvcm0odG9wKTtcbiAgICAgICAgcG9pbnRzLmZvckVhY2goZnVuY3Rpb24gKHBvaW50KSB7XG4gICAgICAgICAgICB2YXIgdHJhbnNmb3JtZWQgPSB0cmFucy5wb2ludChwb2ludCk7XG4gICAgICAgICAgICBpZiAobWluWCA9PT0gdW5kZWZpbmVkKSB7XG4gICAgICAgICAgICAgICAgbWluWCA9IG1heFggPSB0cmFuc2Zvcm1lZC54O1xuICAgICAgICAgICAgICAgIG1pblkgPSBtYXhZID0gdHJhbnNmb3JtZWQueTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIG1pblggPSBNYXRoLm1pbihtaW5YLCB0cmFuc2Zvcm1lZC54KTtcbiAgICAgICAgICAgIG1pblkgPSBNYXRoLm1pbihtaW5ZLCB0cmFuc2Zvcm1lZC55KTtcbiAgICAgICAgICAgIG1heFggPSBNYXRoLm1heChtYXhYLCB0cmFuc2Zvcm1lZC54KTtcbiAgICAgICAgICAgIG1heFkgPSBNYXRoLm1heChtYXhZLCB0cmFuc2Zvcm1lZC55KTtcbiAgICAgICAgfSk7XG4gICAgICAgIHJldHVybiB7XG4gICAgICAgICAgICB4OiBtaW5YLFxuICAgICAgICAgICAgeTogbWluWSxcbiAgICAgICAgICAgIHdpZHRoOiBtYXhYIC0gbWluWCxcbiAgICAgICAgICAgIGhlaWdodDogbWF4WSAtIG1pblksXG4gICAgICAgIH07XG4gICAgfVxuICAgIF9kcmF3Q2FjaGVkU2NlbmVDYW52YXMoY29udGV4dCkge1xuICAgICAgICBjb250ZXh0LnNhdmUoKTtcbiAgICAgICAgY29udGV4dC5fYXBwbHlPcGFjaXR5KHRoaXMpO1xuICAgICAgICBjb250ZXh0Ll9hcHBseUdsb2JhbENvbXBvc2l0ZU9wZXJhdGlvbih0aGlzKTtcbiAgICAgICAgY29uc3QgY2FudmFzQ2FjaGUgPSB0aGlzLl9nZXRDYW52YXNDYWNoZSgpO1xuICAgICAgICBjb250ZXh0LnRyYW5zbGF0ZShjYW52YXNDYWNoZS54LCBjYW52YXNDYWNoZS55KTtcbiAgICAgICAgdmFyIGNhY2hlQ2FudmFzID0gdGhpcy5fZ2V0Q2FjaGVkU2NlbmVDYW52YXMoKTtcbiAgICAgICAgdmFyIHJhdGlvID0gY2FjaGVDYW52YXMucGl4ZWxSYXRpbztcbiAgICAgICAgY29udGV4dC5kcmF3SW1hZ2UoY2FjaGVDYW52YXMuX2NhbnZhcywgMCwgMCwgY2FjaGVDYW52YXMud2lkdGggLyByYXRpbywgY2FjaGVDYW52YXMuaGVpZ2h0IC8gcmF0aW8pO1xuICAgICAgICBjb250ZXh0LnJlc3RvcmUoKTtcbiAgICB9XG4gICAgX2RyYXdDYWNoZWRIaXRDYW52YXMoY29udGV4dCkge1xuICAgICAgICB2YXIgY2FudmFzQ2FjaGUgPSB0aGlzLl9nZXRDYW52YXNDYWNoZSgpLCBoaXRDYW52YXMgPSBjYW52YXNDYWNoZS5oaXQ7XG4gICAgICAgIGNvbnRleHQuc2F2ZSgpO1xuICAgICAgICBjb250ZXh0LnRyYW5zbGF0ZShjYW52YXNDYWNoZS54LCBjYW52YXNDYWNoZS55KTtcbiAgICAgICAgY29udGV4dC5kcmF3SW1hZ2UoaGl0Q2FudmFzLl9jYW52YXMsIDAsIDAsIGhpdENhbnZhcy53aWR0aCAvIGhpdENhbnZhcy5waXhlbFJhdGlvLCBoaXRDYW52YXMuaGVpZ2h0IC8gaGl0Q2FudmFzLnBpeGVsUmF0aW8pO1xuICAgICAgICBjb250ZXh0LnJlc3RvcmUoKTtcbiAgICB9XG4gICAgX2dldENhY2hlZFNjZW5lQ2FudmFzKCkge1xuICAgICAgICB2YXIgZmlsdGVycyA9IHRoaXMuZmlsdGVycygpLCBjYWNoZWRDYW52YXMgPSB0aGlzLl9nZXRDYW52YXNDYWNoZSgpLCBzY2VuZUNhbnZhcyA9IGNhY2hlZENhbnZhcy5zY2VuZSwgZmlsdGVyQ2FudmFzID0gY2FjaGVkQ2FudmFzLmZpbHRlciwgZmlsdGVyQ29udGV4dCA9IGZpbHRlckNhbnZhcy5nZXRDb250ZXh0KCksIGxlbiwgaW1hZ2VEYXRhLCBuLCBmaWx0ZXI7XG4gICAgICAgIGlmIChmaWx0ZXJzKSB7XG4gICAgICAgICAgICBpZiAoIXRoaXMuX2ZpbHRlclVwVG9EYXRlKSB7XG4gICAgICAgICAgICAgICAgdmFyIHJhdGlvID0gc2NlbmVDYW52YXMucGl4ZWxSYXRpbztcbiAgICAgICAgICAgICAgICBmaWx0ZXJDYW52YXMuc2V0U2l6ZShzY2VuZUNhbnZhcy53aWR0aCAvIHNjZW5lQ2FudmFzLnBpeGVsUmF0aW8sIHNjZW5lQ2FudmFzLmhlaWdodCAvIHNjZW5lQ2FudmFzLnBpeGVsUmF0aW8pO1xuICAgICAgICAgICAgICAgIHRyeSB7XG4gICAgICAgICAgICAgICAgICAgIGxlbiA9IGZpbHRlcnMubGVuZ3RoO1xuICAgICAgICAgICAgICAgICAgICBmaWx0ZXJDb250ZXh0LmNsZWFyKCk7XG4gICAgICAgICAgICAgICAgICAgIGZpbHRlckNvbnRleHQuZHJhd0ltYWdlKHNjZW5lQ2FudmFzLl9jYW52YXMsIDAsIDAsIHNjZW5lQ2FudmFzLmdldFdpZHRoKCkgLyByYXRpbywgc2NlbmVDYW52YXMuZ2V0SGVpZ2h0KCkgLyByYXRpbyk7XG4gICAgICAgICAgICAgICAgICAgIGltYWdlRGF0YSA9IGZpbHRlckNvbnRleHQuZ2V0SW1hZ2VEYXRhKDAsIDAsIGZpbHRlckNhbnZhcy5nZXRXaWR0aCgpLCBmaWx0ZXJDYW52YXMuZ2V0SGVpZ2h0KCkpO1xuICAgICAgICAgICAgICAgICAgICBmb3IgKG4gPSAwOyBuIDwgbGVuOyBuKyspIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIGZpbHRlciA9IGZpbHRlcnNbbl07XG4gICAgICAgICAgICAgICAgICAgICAgICBpZiAodHlwZW9mIGZpbHRlciAhPT0gJ2Z1bmN0aW9uJykge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIFV0aWwuZXJyb3IoJ0ZpbHRlciBzaG91bGQgYmUgdHlwZSBvZiBmdW5jdGlvbiwgYnV0IGdvdCAnICtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgdHlwZW9mIGZpbHRlciArXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICcgaW5zdGVhZC4gUGxlYXNlIGNoZWNrIGNvcnJlY3QgZmlsdGVycycpO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGNvbnRpbnVlO1xuICAgICAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICAgICAgZmlsdGVyLmNhbGwodGhpcywgaW1hZ2VEYXRhKTtcbiAgICAgICAgICAgICAgICAgICAgICAgIGZpbHRlckNvbnRleHQucHV0SW1hZ2VEYXRhKGltYWdlRGF0YSwgMCwgMCk7XG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgY2F0Y2ggKGUpIHtcbiAgICAgICAgICAgICAgICAgICAgVXRpbC5lcnJvcignVW5hYmxlIHRvIGFwcGx5IGZpbHRlci4gJyArXG4gICAgICAgICAgICAgICAgICAgICAgICBlLm1lc3NhZ2UgK1xuICAgICAgICAgICAgICAgICAgICAgICAgJyBUaGlzIHBvc3QgbXkgaGVscCB5b3UgaHR0cHM6Ly9rb252YWpzLm9yZy9kb2NzL3Bvc3RzL1RhaW50ZWRfQ2FudmFzLmh0bWwuJyk7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIHRoaXMuX2ZpbHRlclVwVG9EYXRlID0gdHJ1ZTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIHJldHVybiBmaWx0ZXJDYW52YXM7XG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuIHNjZW5lQ2FudmFzO1xuICAgIH1cbiAgICBvbihldnRTdHIsIGhhbmRsZXIpIHtcbiAgICAgICAgdGhpcy5fY2FjaGUgJiYgdGhpcy5fY2FjaGUuZGVsZXRlKEFMTF9MSVNURU5FUlMpO1xuICAgICAgICBpZiAoYXJndW1lbnRzLmxlbmd0aCA9PT0gMykge1xuICAgICAgICAgICAgcmV0dXJuIHRoaXMuX2RlbGVnYXRlLmFwcGx5KHRoaXMsIGFyZ3VtZW50cyk7XG4gICAgICAgIH1cbiAgICAgICAgdmFyIGV2ZW50cyA9IGV2dFN0ci5zcGxpdChTUEFDRSksIGxlbiA9IGV2ZW50cy5sZW5ndGgsIG4sIGV2ZW50LCBwYXJ0cywgYmFzZUV2ZW50LCBuYW1lO1xuICAgICAgICBmb3IgKG4gPSAwOyBuIDwgbGVuOyBuKyspIHtcbiAgICAgICAgICAgIGV2ZW50ID0gZXZlbnRzW25dO1xuICAgICAgICAgICAgcGFydHMgPSBldmVudC5zcGxpdCgnLicpO1xuICAgICAgICAgICAgYmFzZUV2ZW50ID0gcGFydHNbMF07XG4gICAgICAgICAgICBuYW1lID0gcGFydHNbMV0gfHwgJyc7XG4gICAgICAgICAgICBpZiAoIXRoaXMuZXZlbnRMaXN0ZW5lcnNbYmFzZUV2ZW50XSkge1xuICAgICAgICAgICAgICAgIHRoaXMuZXZlbnRMaXN0ZW5lcnNbYmFzZUV2ZW50XSA9IFtdO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgdGhpcy5ldmVudExpc3RlbmVyc1tiYXNlRXZlbnRdLnB1c2goe1xuICAgICAgICAgICAgICAgIG5hbWU6IG5hbWUsXG4gICAgICAgICAgICAgICAgaGFuZGxlcjogaGFuZGxlcixcbiAgICAgICAgICAgIH0pO1xuICAgICAgICB9XG4gICAgICAgIHJldHVybiB0aGlzO1xuICAgIH1cbiAgICBvZmYoZXZ0U3RyLCBjYWxsYmFjaykge1xuICAgICAgICB2YXIgZXZlbnRzID0gKGV2dFN0ciB8fCAnJykuc3BsaXQoU1BBQ0UpLCBsZW4gPSBldmVudHMubGVuZ3RoLCBuLCB0LCBldmVudCwgcGFydHMsIGJhc2VFdmVudCwgbmFtZTtcbiAgICAgICAgdGhpcy5fY2FjaGUgJiYgdGhpcy5fY2FjaGUuZGVsZXRlKEFMTF9MSVNURU5FUlMpO1xuICAgICAgICBpZiAoIWV2dFN0cikge1xuICAgICAgICAgICAgZm9yICh0IGluIHRoaXMuZXZlbnRMaXN0ZW5lcnMpIHtcbiAgICAgICAgICAgICAgICB0aGlzLl9vZmYodCk7XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgICAgZm9yIChuID0gMDsgbiA8IGxlbjsgbisrKSB7XG4gICAgICAgICAgICBldmVudCA9IGV2ZW50c1tuXTtcbiAgICAgICAgICAgIHBhcnRzID0gZXZlbnQuc3BsaXQoJy4nKTtcbiAgICAgICAgICAgIGJhc2VFdmVudCA9IHBhcnRzWzBdO1xuICAgICAgICAgICAgbmFtZSA9IHBhcnRzWzFdO1xuICAgICAgICAgICAgaWYgKGJhc2VFdmVudCkge1xuICAgICAgICAgICAgICAgIGlmICh0aGlzLmV2ZW50TGlzdGVuZXJzW2Jhc2VFdmVudF0pIHtcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5fb2ZmKGJhc2VFdmVudCwgbmFtZSwgY2FsbGJhY2spO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGVsc2Uge1xuICAgICAgICAgICAgICAgIGZvciAodCBpbiB0aGlzLmV2ZW50TGlzdGVuZXJzKSB7XG4gICAgICAgICAgICAgICAgICAgIHRoaXMuX29mZih0LCBuYW1lLCBjYWxsYmFjayk7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICAgIHJldHVybiB0aGlzO1xuICAgIH1cbiAgICBkaXNwYXRjaEV2ZW50KGV2dCkge1xuICAgICAgICB2YXIgZSA9IHtcbiAgICAgICAgICAgIHRhcmdldDogdGhpcyxcbiAgICAgICAgICAgIHR5cGU6IGV2dC50eXBlLFxuICAgICAgICAgICAgZXZ0OiBldnQsXG4gICAgICAgIH07XG4gICAgICAgIHRoaXMuZmlyZShldnQudHlwZSwgZSk7XG4gICAgICAgIHJldHVybiB0aGlzO1xuICAgIH1cbiAgICBhZGRFdmVudExpc3RlbmVyKHR5cGUsIGhhbmRsZXIpIHtcbiAgICAgICAgdGhpcy5vbih0eXBlLCBmdW5jdGlvbiAoZXZ0KSB7XG4gICAgICAgICAgICBoYW5kbGVyLmNhbGwodGhpcywgZXZ0LmV2dCk7XG4gICAgICAgIH0pO1xuICAgICAgICByZXR1cm4gdGhpcztcbiAgICB9XG4gICAgcmVtb3ZlRXZlbnRMaXN0ZW5lcih0eXBlKSB7XG4gICAgICAgIHRoaXMub2ZmKHR5cGUpO1xuICAgICAgICByZXR1cm4gdGhpcztcbiAgICB9XG4gICAgX2RlbGVnYXRlKGV2ZW50LCBzZWxlY3RvciwgaGFuZGxlcikge1xuICAgICAgICB2YXIgc3RvcE5vZGUgPSB0aGlzO1xuICAgICAgICB0aGlzLm9uKGV2ZW50LCBmdW5jdGlvbiAoZXZ0KSB7XG4gICAgICAgICAgICB2YXIgdGFyZ2V0cyA9IGV2dC50YXJnZXQuZmluZEFuY2VzdG9ycyhzZWxlY3RvciwgdHJ1ZSwgc3RvcE5vZGUpO1xuICAgICAgICAgICAgZm9yICh2YXIgaSA9IDA7IGkgPCB0YXJnZXRzLmxlbmd0aDsgaSsrKSB7XG4gICAgICAgICAgICAgICAgZXZ0ID0gVXRpbC5jbG9uZU9iamVjdChldnQpO1xuICAgICAgICAgICAgICAgIGV2dC5jdXJyZW50VGFyZ2V0ID0gdGFyZ2V0c1tpXTtcbiAgICAgICAgICAgICAgICBoYW5kbGVyLmNhbGwodGFyZ2V0c1tpXSwgZXZ0KTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfSk7XG4gICAgfVxuICAgIHJlbW92ZSgpIHtcbiAgICAgICAgaWYgKHRoaXMuaXNEcmFnZ2luZygpKSB7XG4gICAgICAgICAgICB0aGlzLnN0b3BEcmFnKCk7XG4gICAgICAgIH1cbiAgICAgICAgREQuX2RyYWdFbGVtZW50cy5kZWxldGUodGhpcy5faWQpO1xuICAgICAgICB0aGlzLl9yZW1vdmUoKTtcbiAgICAgICAgcmV0dXJuIHRoaXM7XG4gICAgfVxuICAgIF9jbGVhckNhY2hlcygpIHtcbiAgICAgICAgdGhpcy5fY2xlYXJTZWxmQW5kRGVzY2VuZGFudENhY2hlKEFCU09MVVRFX1RSQU5TRk9STSk7XG4gICAgICAgIHRoaXMuX2NsZWFyU2VsZkFuZERlc2NlbmRhbnRDYWNoZShBQlNPTFVURV9PUEFDSVRZKTtcbiAgICAgICAgdGhpcy5fY2xlYXJTZWxmQW5kRGVzY2VuZGFudENhY2hlKEFCU09MVVRFX1NDQUxFKTtcbiAgICAgICAgdGhpcy5fY2xlYXJTZWxmQW5kRGVzY2VuZGFudENhY2hlKFNUQUdFKTtcbiAgICAgICAgdGhpcy5fY2xlYXJTZWxmQW5kRGVzY2VuZGFudENhY2hlKFZJU0lCTEUpO1xuICAgICAgICB0aGlzLl9jbGVhclNlbGZBbmREZXNjZW5kYW50Q2FjaGUoTElTVEVOSU5HKTtcbiAgICB9XG4gICAgX3JlbW92ZSgpIHtcbiAgICAgICAgdGhpcy5fY2xlYXJDYWNoZXMoKTtcbiAgICAgICAgdmFyIHBhcmVudCA9IHRoaXMuZ2V0UGFyZW50KCk7XG4gICAgICAgIGlmIChwYXJlbnQgJiYgcGFyZW50LmNoaWxkcmVuKSB7XG4gICAgICAgICAgICBwYXJlbnQuY2hpbGRyZW4uc3BsaWNlKHRoaXMuaW5kZXgsIDEpO1xuICAgICAgICAgICAgcGFyZW50Ll9zZXRDaGlsZHJlbkluZGljZXMoKTtcbiAgICAgICAgICAgIHRoaXMucGFyZW50ID0gbnVsbDtcbiAgICAgICAgfVxuICAgIH1cbiAgICBkZXN0cm95KCkge1xuICAgICAgICB0aGlzLnJlbW92ZSgpO1xuICAgICAgICB0aGlzLmNsZWFyQ2FjaGUoKTtcbiAgICAgICAgcmV0dXJuIHRoaXM7XG4gICAgfVxuICAgIGdldEF0dHIoYXR0cikge1xuICAgICAgICB2YXIgbWV0aG9kID0gJ2dldCcgKyBVdGlsLl9jYXBpdGFsaXplKGF0dHIpO1xuICAgICAgICBpZiAoVXRpbC5faXNGdW5jdGlvbih0aGlzW21ldGhvZF0pKSB7XG4gICAgICAgICAgICByZXR1cm4gdGhpc1ttZXRob2RdKCk7XG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuIHRoaXMuYXR0cnNbYXR0cl07XG4gICAgfVxuICAgIGdldEFuY2VzdG9ycygpIHtcbiAgICAgICAgdmFyIHBhcmVudCA9IHRoaXMuZ2V0UGFyZW50KCksIGFuY2VzdG9ycyA9IFtdO1xuICAgICAgICB3aGlsZSAocGFyZW50KSB7XG4gICAgICAgICAgICBhbmNlc3RvcnMucHVzaChwYXJlbnQpO1xuICAgICAgICAgICAgcGFyZW50ID0gcGFyZW50LmdldFBhcmVudCgpO1xuICAgICAgICB9XG4gICAgICAgIHJldHVybiBhbmNlc3RvcnM7XG4gICAgfVxuICAgIGdldEF0dHJzKCkge1xuICAgICAgICByZXR1cm4gdGhpcy5hdHRycyB8fCB7fTtcbiAgICB9XG4gICAgc2V0QXR0cnMoY29uZmlnKSB7XG4gICAgICAgIHRoaXMuX2JhdGNoVHJhbnNmb3JtQ2hhbmdlcygoKSA9PiB7XG4gICAgICAgICAgICB2YXIga2V5LCBtZXRob2Q7XG4gICAgICAgICAgICBpZiAoIWNvbmZpZykge1xuICAgICAgICAgICAgICAgIHJldHVybiB0aGlzO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgZm9yIChrZXkgaW4gY29uZmlnKSB7XG4gICAgICAgICAgICAgICAgaWYgKGtleSA9PT0gQ0hJTERSRU4pIHtcbiAgICAgICAgICAgICAgICAgICAgY29udGludWU7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIG1ldGhvZCA9IFNFVCArIFV0aWwuX2NhcGl0YWxpemUoa2V5KTtcbiAgICAgICAgICAgICAgICBpZiAoVXRpbC5faXNGdW5jdGlvbih0aGlzW21ldGhvZF0pKSB7XG4gICAgICAgICAgICAgICAgICAgIHRoaXNbbWV0aG9kXShjb25maWdba2V5XSk7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIGVsc2Uge1xuICAgICAgICAgICAgICAgICAgICB0aGlzLl9zZXRBdHRyKGtleSwgY29uZmlnW2tleV0pO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH1cbiAgICAgICAgfSk7XG4gICAgICAgIHJldHVybiB0aGlzO1xuICAgIH1cbiAgICBpc0xpc3RlbmluZygpIHtcbiAgICAgICAgcmV0dXJuIHRoaXMuX2dldENhY2hlKExJU1RFTklORywgdGhpcy5faXNMaXN0ZW5pbmcpO1xuICAgIH1cbiAgICBfaXNMaXN0ZW5pbmcocmVsYXRpdmVUbykge1xuICAgICAgICBjb25zdCBsaXN0ZW5pbmcgPSB0aGlzLmxpc3RlbmluZygpO1xuICAgICAgICBpZiAoIWxpc3RlbmluZykge1xuICAgICAgICAgICAgcmV0dXJuIGZhbHNlO1xuICAgICAgICB9XG4gICAgICAgIGNvbnN0IHBhcmVudCA9IHRoaXMuZ2V0UGFyZW50KCk7XG4gICAgICAgIGlmIChwYXJlbnQgJiYgcGFyZW50ICE9PSByZWxhdGl2ZVRvICYmIHRoaXMgIT09IHJlbGF0aXZlVG8pIHtcbiAgICAgICAgICAgIHJldHVybiBwYXJlbnQuX2lzTGlzdGVuaW5nKHJlbGF0aXZlVG8pO1xuICAgICAgICB9XG4gICAgICAgIGVsc2Uge1xuICAgICAgICAgICAgcmV0dXJuIHRydWU7XG4gICAgICAgIH1cbiAgICB9XG4gICAgaXNWaXNpYmxlKCkge1xuICAgICAgICByZXR1cm4gdGhpcy5fZ2V0Q2FjaGUoVklTSUJMRSwgdGhpcy5faXNWaXNpYmxlKTtcbiAgICB9XG4gICAgX2lzVmlzaWJsZShyZWxhdGl2ZVRvKSB7XG4gICAgICAgIGNvbnN0IHZpc2libGUgPSB0aGlzLnZpc2libGUoKTtcbiAgICAgICAgaWYgKCF2aXNpYmxlKSB7XG4gICAgICAgICAgICByZXR1cm4gZmFsc2U7XG4gICAgICAgIH1cbiAgICAgICAgY29uc3QgcGFyZW50ID0gdGhpcy5nZXRQYXJlbnQoKTtcbiAgICAgICAgaWYgKHBhcmVudCAmJiBwYXJlbnQgIT09IHJlbGF0aXZlVG8gJiYgdGhpcyAhPT0gcmVsYXRpdmVUbykge1xuICAgICAgICAgICAgcmV0dXJuIHBhcmVudC5faXNWaXNpYmxlKHJlbGF0aXZlVG8pO1xuICAgICAgICB9XG4gICAgICAgIGVsc2Uge1xuICAgICAgICAgICAgcmV0dXJuIHRydWU7XG4gICAgICAgIH1cbiAgICB9XG4gICAgc2hvdWxkRHJhd0hpdCh0b3AsIHNraXBEcmFnQ2hlY2sgPSBmYWxzZSkge1xuICAgICAgICBpZiAodG9wKSB7XG4gICAgICAgICAgICByZXR1cm4gdGhpcy5faXNWaXNpYmxlKHRvcCkgJiYgdGhpcy5faXNMaXN0ZW5pbmcodG9wKTtcbiAgICAgICAgfVxuICAgICAgICB2YXIgbGF5ZXIgPSB0aGlzLmdldExheWVyKCk7XG4gICAgICAgIHZhciBsYXllclVuZGVyRHJhZyA9IGZhbHNlO1xuICAgICAgICBERC5fZHJhZ0VsZW1lbnRzLmZvckVhY2goKGVsZW0pID0+IHtcbiAgICAgICAgICAgIGlmIChlbGVtLmRyYWdTdGF0dXMgIT09ICdkcmFnZ2luZycpIHtcbiAgICAgICAgICAgICAgICByZXR1cm47XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBlbHNlIGlmIChlbGVtLm5vZGUubm9kZVR5cGUgPT09ICdTdGFnZScpIHtcbiAgICAgICAgICAgICAgICBsYXllclVuZGVyRHJhZyA9IHRydWU7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBlbHNlIGlmIChlbGVtLm5vZGUuZ2V0TGF5ZXIoKSA9PT0gbGF5ZXIpIHtcbiAgICAgICAgICAgICAgICBsYXllclVuZGVyRHJhZyA9IHRydWU7XG4gICAgICAgICAgICB9XG4gICAgICAgIH0pO1xuICAgICAgICB2YXIgZHJhZ1NraXAgPSAhc2tpcERyYWdDaGVjayAmJiAhS29udmEuaGl0T25EcmFnRW5hYmxlZCAmJiBsYXllclVuZGVyRHJhZztcbiAgICAgICAgcmV0dXJuIHRoaXMuaXNMaXN0ZW5pbmcoKSAmJiB0aGlzLmlzVmlzaWJsZSgpICYmICFkcmFnU2tpcDtcbiAgICB9XG4gICAgc2hvdygpIHtcbiAgICAgICAgdGhpcy52aXNpYmxlKHRydWUpO1xuICAgICAgICByZXR1cm4gdGhpcztcbiAgICB9XG4gICAgaGlkZSgpIHtcbiAgICAgICAgdGhpcy52aXNpYmxlKGZhbHNlKTtcbiAgICAgICAgcmV0dXJuIHRoaXM7XG4gICAgfVxuICAgIGdldFpJbmRleCgpIHtcbiAgICAgICAgcmV0dXJuIHRoaXMuaW5kZXggfHwgMDtcbiAgICB9XG4gICAgZ2V0QWJzb2x1dGVaSW5kZXgoKSB7XG4gICAgICAgIHZhciBkZXB0aCA9IHRoaXMuZ2V0RGVwdGgoKSwgdGhhdCA9IHRoaXMsIGluZGV4ID0gMCwgbm9kZXMsIGxlbiwgbiwgY2hpbGQ7XG4gICAgICAgIGZ1bmN0aW9uIGFkZENoaWxkcmVuKGNoaWxkcmVuKSB7XG4gICAgICAgICAgICBub2RlcyA9IFtdO1xuICAgICAgICAgICAgbGVuID0gY2hpbGRyZW4ubGVuZ3RoO1xuICAgICAgICAgICAgZm9yIChuID0gMDsgbiA8IGxlbjsgbisrKSB7XG4gICAgICAgICAgICAgICAgY2hpbGQgPSBjaGlsZHJlbltuXTtcbiAgICAgICAgICAgICAgICBpbmRleCsrO1xuICAgICAgICAgICAgICAgIGlmIChjaGlsZC5ub2RlVHlwZSAhPT0gU0hBUEUpIHtcbiAgICAgICAgICAgICAgICAgICAgbm9kZXMgPSBub2Rlcy5jb25jYXQoY2hpbGQuZ2V0Q2hpbGRyZW4oKS5zbGljZSgpKTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgaWYgKGNoaWxkLl9pZCA9PT0gdGhhdC5faWQpIHtcbiAgICAgICAgICAgICAgICAgICAgbiA9IGxlbjtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBpZiAobm9kZXMubGVuZ3RoID4gMCAmJiBub2Rlc1swXS5nZXREZXB0aCgpIDw9IGRlcHRoKSB7XG4gICAgICAgICAgICAgICAgYWRkQ2hpbGRyZW4obm9kZXMpO1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICAgIGlmICh0aGF0Lm5vZGVUeXBlICE9PSBVUFBFUl9TVEFHRSkge1xuICAgICAgICAgICAgYWRkQ2hpbGRyZW4odGhhdC5nZXRTdGFnZSgpLmdldENoaWxkcmVuKCkpO1xuICAgICAgICB9XG4gICAgICAgIHJldHVybiBpbmRleDtcbiAgICB9XG4gICAgZ2V0RGVwdGgoKSB7XG4gICAgICAgIHZhciBkZXB0aCA9IDAsIHBhcmVudCA9IHRoaXMucGFyZW50O1xuICAgICAgICB3aGlsZSAocGFyZW50KSB7XG4gICAgICAgICAgICBkZXB0aCsrO1xuICAgICAgICAgICAgcGFyZW50ID0gcGFyZW50LnBhcmVudDtcbiAgICAgICAgfVxuICAgICAgICByZXR1cm4gZGVwdGg7XG4gICAgfVxuICAgIF9iYXRjaFRyYW5zZm9ybUNoYW5nZXMoZnVuYykge1xuICAgICAgICB0aGlzLl9iYXRjaGluZ1RyYW5zZm9ybUNoYW5nZSA9IHRydWU7XG4gICAgICAgIGZ1bmMoKTtcbiAgICAgICAgdGhpcy5fYmF0Y2hpbmdUcmFuc2Zvcm1DaGFuZ2UgPSBmYWxzZTtcbiAgICAgICAgaWYgKHRoaXMuX25lZWRDbGVhclRyYW5zZm9ybUNhY2hlKSB7XG4gICAgICAgICAgICB0aGlzLl9jbGVhckNhY2hlKFRSQU5TRk9STSk7XG4gICAgICAgICAgICB0aGlzLl9jbGVhclNlbGZBbmREZXNjZW5kYW50Q2FjaGUoQUJTT0xVVEVfVFJBTlNGT1JNKTtcbiAgICAgICAgfVxuICAgICAgICB0aGlzLl9uZWVkQ2xlYXJUcmFuc2Zvcm1DYWNoZSA9IGZhbHNlO1xuICAgIH1cbiAgICBzZXRQb3NpdGlvbihwb3MpIHtcbiAgICAgICAgdGhpcy5fYmF0Y2hUcmFuc2Zvcm1DaGFuZ2VzKCgpID0+IHtcbiAgICAgICAgICAgIHRoaXMueChwb3MueCk7XG4gICAgICAgICAgICB0aGlzLnkocG9zLnkpO1xuICAgICAgICB9KTtcbiAgICAgICAgcmV0dXJuIHRoaXM7XG4gICAgfVxuICAgIGdldFBvc2l0aW9uKCkge1xuICAgICAgICByZXR1cm4ge1xuICAgICAgICAgICAgeDogdGhpcy54KCksXG4gICAgICAgICAgICB5OiB0aGlzLnkoKSxcbiAgICAgICAgfTtcbiAgICB9XG4gICAgZ2V0UmVsYXRpdmVQb2ludGVyUG9zaXRpb24oKSB7XG4gICAgICAgIGlmICghdGhpcy5nZXRTdGFnZSgpKSB7XG4gICAgICAgICAgICByZXR1cm4gbnVsbDtcbiAgICAgICAgfVxuICAgICAgICB2YXIgcG9zID0gdGhpcy5nZXRTdGFnZSgpLmdldFBvaW50ZXJQb3NpdGlvbigpO1xuICAgICAgICBpZiAoIXBvcykge1xuICAgICAgICAgICAgcmV0dXJuIG51bGw7XG4gICAgICAgIH1cbiAgICAgICAgdmFyIHRyYW5zZm9ybSA9IHRoaXMuZ2V0QWJzb2x1dGVUcmFuc2Zvcm0oKS5jb3B5KCk7XG4gICAgICAgIHRyYW5zZm9ybS5pbnZlcnQoKTtcbiAgICAgICAgcmV0dXJuIHRyYW5zZm9ybS5wb2ludChwb3MpO1xuICAgIH1cbiAgICBnZXRBYnNvbHV0ZVBvc2l0aW9uKHRvcCkge1xuICAgICAgICBsZXQgaGF2ZUNhY2hlZFBhcmVudCA9IGZhbHNlO1xuICAgICAgICBsZXQgcGFyZW50ID0gdGhpcy5wYXJlbnQ7XG4gICAgICAgIHdoaWxlIChwYXJlbnQpIHtcbiAgICAgICAgICAgIGlmIChwYXJlbnQuaXNDYWNoZWQoKSkge1xuICAgICAgICAgICAgICAgIGhhdmVDYWNoZWRQYXJlbnQgPSB0cnVlO1xuICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgcGFyZW50ID0gcGFyZW50LnBhcmVudDtcbiAgICAgICAgfVxuICAgICAgICBpZiAoaGF2ZUNhY2hlZFBhcmVudCAmJiAhdG9wKSB7XG4gICAgICAgICAgICB0b3AgPSB0cnVlO1xuICAgICAgICB9XG4gICAgICAgIHZhciBhYnNvbHV0ZU1hdHJpeCA9IHRoaXMuZ2V0QWJzb2x1dGVUcmFuc2Zvcm0odG9wKS5nZXRNYXRyaXgoKSwgYWJzb2x1dGVUcmFuc2Zvcm0gPSBuZXcgVHJhbnNmb3JtKCksIG9mZnNldCA9IHRoaXMub2Zmc2V0KCk7XG4gICAgICAgIGFic29sdXRlVHJhbnNmb3JtLm0gPSBhYnNvbHV0ZU1hdHJpeC5zbGljZSgpO1xuICAgICAgICBhYnNvbHV0ZVRyYW5zZm9ybS50cmFuc2xhdGUob2Zmc2V0LngsIG9mZnNldC55KTtcbiAgICAgICAgcmV0dXJuIGFic29sdXRlVHJhbnNmb3JtLmdldFRyYW5zbGF0aW9uKCk7XG4gICAgfVxuICAgIHNldEFic29sdXRlUG9zaXRpb24ocG9zKSB7XG4gICAgICAgIHZhciBvcmlnVHJhbnMgPSB0aGlzLl9jbGVhclRyYW5zZm9ybSgpO1xuICAgICAgICB0aGlzLmF0dHJzLnggPSBvcmlnVHJhbnMueDtcbiAgICAgICAgdGhpcy5hdHRycy55ID0gb3JpZ1RyYW5zLnk7XG4gICAgICAgIGRlbGV0ZSBvcmlnVHJhbnMueDtcbiAgICAgICAgZGVsZXRlIG9yaWdUcmFucy55O1xuICAgICAgICB0aGlzLl9jbGVhckNhY2hlKFRSQU5TRk9STSk7XG4gICAgICAgIHZhciBpdCA9IHRoaXMuX2dldEFic29sdXRlVHJhbnNmb3JtKCkuY29weSgpO1xuICAgICAgICBpdC5pbnZlcnQoKTtcbiAgICAgICAgaXQudHJhbnNsYXRlKHBvcy54LCBwb3MueSk7XG4gICAgICAgIHBvcyA9IHtcbiAgICAgICAgICAgIHg6IHRoaXMuYXR0cnMueCArIGl0LmdldFRyYW5zbGF0aW9uKCkueCxcbiAgICAgICAgICAgIHk6IHRoaXMuYXR0cnMueSArIGl0LmdldFRyYW5zbGF0aW9uKCkueSxcbiAgICAgICAgfTtcbiAgICAgICAgdGhpcy5fc2V0VHJhbnNmb3JtKG9yaWdUcmFucyk7XG4gICAgICAgIHRoaXMuc2V0UG9zaXRpb24oeyB4OiBwb3MueCwgeTogcG9zLnkgfSk7XG4gICAgICAgIHRoaXMuX2NsZWFyQ2FjaGUoVFJBTlNGT1JNKTtcbiAgICAgICAgdGhpcy5fY2xlYXJTZWxmQW5kRGVzY2VuZGFudENhY2hlKEFCU09MVVRFX1RSQU5TRk9STSk7XG4gICAgICAgIHJldHVybiB0aGlzO1xuICAgIH1cbiAgICBfc2V0VHJhbnNmb3JtKHRyYW5zKSB7XG4gICAgICAgIHZhciBrZXk7XG4gICAgICAgIGZvciAoa2V5IGluIHRyYW5zKSB7XG4gICAgICAgICAgICB0aGlzLmF0dHJzW2tleV0gPSB0cmFuc1trZXldO1xuICAgICAgICB9XG4gICAgfVxuICAgIF9jbGVhclRyYW5zZm9ybSgpIHtcbiAgICAgICAgdmFyIHRyYW5zID0ge1xuICAgICAgICAgICAgeDogdGhpcy54KCksXG4gICAgICAgICAgICB5OiB0aGlzLnkoKSxcbiAgICAgICAgICAgIHJvdGF0aW9uOiB0aGlzLnJvdGF0aW9uKCksXG4gICAgICAgICAgICBzY2FsZVg6IHRoaXMuc2NhbGVYKCksXG4gICAgICAgICAgICBzY2FsZVk6IHRoaXMuc2NhbGVZKCksXG4gICAgICAgICAgICBvZmZzZXRYOiB0aGlzLm9mZnNldFgoKSxcbiAgICAgICAgICAgIG9mZnNldFk6IHRoaXMub2Zmc2V0WSgpLFxuICAgICAgICAgICAgc2tld1g6IHRoaXMuc2tld1goKSxcbiAgICAgICAgICAgIHNrZXdZOiB0aGlzLnNrZXdZKCksXG4gICAgICAgIH07XG4gICAgICAgIHRoaXMuYXR0cnMueCA9IDA7XG4gICAgICAgIHRoaXMuYXR0cnMueSA9IDA7XG4gICAgICAgIHRoaXMuYXR0cnMucm90YXRpb24gPSAwO1xuICAgICAgICB0aGlzLmF0dHJzLnNjYWxlWCA9IDE7XG4gICAgICAgIHRoaXMuYXR0cnMuc2NhbGVZID0gMTtcbiAgICAgICAgdGhpcy5hdHRycy5vZmZzZXRYID0gMDtcbiAgICAgICAgdGhpcy5hdHRycy5vZmZzZXRZID0gMDtcbiAgICAgICAgdGhpcy5hdHRycy5za2V3WCA9IDA7XG4gICAgICAgIHRoaXMuYXR0cnMuc2tld1kgPSAwO1xuICAgICAgICByZXR1cm4gdHJhbnM7XG4gICAgfVxuICAgIG1vdmUoY2hhbmdlKSB7XG4gICAgICAgIHZhciBjaGFuZ2VYID0gY2hhbmdlLngsIGNoYW5nZVkgPSBjaGFuZ2UueSwgeCA9IHRoaXMueCgpLCB5ID0gdGhpcy55KCk7XG4gICAgICAgIGlmIChjaGFuZ2VYICE9PSB1bmRlZmluZWQpIHtcbiAgICAgICAgICAgIHggKz0gY2hhbmdlWDtcbiAgICAgICAgfVxuICAgICAgICBpZiAoY2hhbmdlWSAhPT0gdW5kZWZpbmVkKSB7XG4gICAgICAgICAgICB5ICs9IGNoYW5nZVk7XG4gICAgICAgIH1cbiAgICAgICAgdGhpcy5zZXRQb3NpdGlvbih7IHg6IHgsIHk6IHkgfSk7XG4gICAgICAgIHJldHVybiB0aGlzO1xuICAgIH1cbiAgICBfZWFjaEFuY2VzdG9yUmV2ZXJzZShmdW5jLCB0b3ApIHtcbiAgICAgICAgdmFyIGZhbWlseSA9IFtdLCBwYXJlbnQgPSB0aGlzLmdldFBhcmVudCgpLCBsZW4sIG47XG4gICAgICAgIGlmICh0b3AgJiYgdG9wLl9pZCA9PT0gdGhpcy5faWQpIHtcbiAgICAgICAgICAgIHJldHVybjtcbiAgICAgICAgfVxuICAgICAgICBmYW1pbHkudW5zaGlmdCh0aGlzKTtcbiAgICAgICAgd2hpbGUgKHBhcmVudCAmJiAoIXRvcCB8fCBwYXJlbnQuX2lkICE9PSB0b3AuX2lkKSkge1xuICAgICAgICAgICAgZmFtaWx5LnVuc2hpZnQocGFyZW50KTtcbiAgICAgICAgICAgIHBhcmVudCA9IHBhcmVudC5wYXJlbnQ7XG4gICAgICAgIH1cbiAgICAgICAgbGVuID0gZmFtaWx5Lmxlbmd0aDtcbiAgICAgICAgZm9yIChuID0gMDsgbiA8IGxlbjsgbisrKSB7XG4gICAgICAgICAgICBmdW5jKGZhbWlseVtuXSk7XG4gICAgICAgIH1cbiAgICB9XG4gICAgcm90YXRlKHRoZXRhKSB7XG4gICAgICAgIHRoaXMucm90YXRpb24odGhpcy5yb3RhdGlvbigpICsgdGhldGEpO1xuICAgICAgICByZXR1cm4gdGhpcztcbiAgICB9XG4gICAgbW92ZVRvVG9wKCkge1xuICAgICAgICBpZiAoIXRoaXMucGFyZW50KSB7XG4gICAgICAgICAgICBVdGlsLndhcm4oJ05vZGUgaGFzIG5vIHBhcmVudC4gbW92ZVRvVG9wIGZ1bmN0aW9uIGlzIGlnbm9yZWQuJyk7XG4gICAgICAgICAgICByZXR1cm4gZmFsc2U7XG4gICAgICAgIH1cbiAgICAgICAgdmFyIGluZGV4ID0gdGhpcy5pbmRleCwgbGVuID0gdGhpcy5wYXJlbnQuZ2V0Q2hpbGRyZW4oKS5sZW5ndGg7XG4gICAgICAgIGlmIChpbmRleCA8IGxlbiAtIDEpIHtcbiAgICAgICAgICAgIHRoaXMucGFyZW50LmNoaWxkcmVuLnNwbGljZShpbmRleCwgMSk7XG4gICAgICAgICAgICB0aGlzLnBhcmVudC5jaGlsZHJlbi5wdXNoKHRoaXMpO1xuICAgICAgICAgICAgdGhpcy5wYXJlbnQuX3NldENoaWxkcmVuSW5kaWNlcygpO1xuICAgICAgICAgICAgcmV0dXJuIHRydWU7XG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuIGZhbHNlO1xuICAgIH1cbiAgICBtb3ZlVXAoKSB7XG4gICAgICAgIGlmICghdGhpcy5wYXJlbnQpIHtcbiAgICAgICAgICAgIFV0aWwud2FybignTm9kZSBoYXMgbm8gcGFyZW50LiBtb3ZlVXAgZnVuY3Rpb24gaXMgaWdub3JlZC4nKTtcbiAgICAgICAgICAgIHJldHVybiBmYWxzZTtcbiAgICAgICAgfVxuICAgICAgICB2YXIgaW5kZXggPSB0aGlzLmluZGV4LCBsZW4gPSB0aGlzLnBhcmVudC5nZXRDaGlsZHJlbigpLmxlbmd0aDtcbiAgICAgICAgaWYgKGluZGV4IDwgbGVuIC0gMSkge1xuICAgICAgICAgICAgdGhpcy5wYXJlbnQuY2hpbGRyZW4uc3BsaWNlKGluZGV4LCAxKTtcbiAgICAgICAgICAgIHRoaXMucGFyZW50LmNoaWxkcmVuLnNwbGljZShpbmRleCArIDEsIDAsIHRoaXMpO1xuICAgICAgICAgICAgdGhpcy5wYXJlbnQuX3NldENoaWxkcmVuSW5kaWNlcygpO1xuICAgICAgICAgICAgcmV0dXJuIHRydWU7XG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuIGZhbHNlO1xuICAgIH1cbiAgICBtb3ZlRG93bigpIHtcbiAgICAgICAgaWYgKCF0aGlzLnBhcmVudCkge1xuICAgICAgICAgICAgVXRpbC53YXJuKCdOb2RlIGhhcyBubyBwYXJlbnQuIG1vdmVEb3duIGZ1bmN0aW9uIGlzIGlnbm9yZWQuJyk7XG4gICAgICAgICAgICByZXR1cm4gZmFsc2U7XG4gICAgICAgIH1cbiAgICAgICAgdmFyIGluZGV4ID0gdGhpcy5pbmRleDtcbiAgICAgICAgaWYgKGluZGV4ID4gMCkge1xuICAgICAgICAgICAgdGhpcy5wYXJlbnQuY2hpbGRyZW4uc3BsaWNlKGluZGV4LCAxKTtcbiAgICAgICAgICAgIHRoaXMucGFyZW50LmNoaWxkcmVuLnNwbGljZShpbmRleCAtIDEsIDAsIHRoaXMpO1xuICAgICAgICAgICAgdGhpcy5wYXJlbnQuX3NldENoaWxkcmVuSW5kaWNlcygpO1xuICAgICAgICAgICAgcmV0dXJuIHRydWU7XG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuIGZhbHNlO1xuICAgIH1cbiAgICBtb3ZlVG9Cb3R0b20oKSB7XG4gICAgICAgIGlmICghdGhpcy5wYXJlbnQpIHtcbiAgICAgICAgICAgIFV0aWwud2FybignTm9kZSBoYXMgbm8gcGFyZW50LiBtb3ZlVG9Cb3R0b20gZnVuY3Rpb24gaXMgaWdub3JlZC4nKTtcbiAgICAgICAgICAgIHJldHVybiBmYWxzZTtcbiAgICAgICAgfVxuICAgICAgICB2YXIgaW5kZXggPSB0aGlzLmluZGV4O1xuICAgICAgICBpZiAoaW5kZXggPiAwKSB7XG4gICAgICAgICAgICB0aGlzLnBhcmVudC5jaGlsZHJlbi5zcGxpY2UoaW5kZXgsIDEpO1xuICAgICAgICAgICAgdGhpcy5wYXJlbnQuY2hpbGRyZW4udW5zaGlmdCh0aGlzKTtcbiAgICAgICAgICAgIHRoaXMucGFyZW50Ll9zZXRDaGlsZHJlbkluZGljZXMoKTtcbiAgICAgICAgICAgIHJldHVybiB0cnVlO1xuICAgICAgICB9XG4gICAgICAgIHJldHVybiBmYWxzZTtcbiAgICB9XG4gICAgc2V0WkluZGV4KHpJbmRleCkge1xuICAgICAgICBpZiAoIXRoaXMucGFyZW50KSB7XG4gICAgICAgICAgICBVdGlsLndhcm4oJ05vZGUgaGFzIG5vIHBhcmVudC4gekluZGV4IHBhcmFtZXRlciBpcyBpZ25vcmVkLicpO1xuICAgICAgICAgICAgcmV0dXJuIHRoaXM7XG4gICAgICAgIH1cbiAgICAgICAgaWYgKHpJbmRleCA8IDAgfHwgekluZGV4ID49IHRoaXMucGFyZW50LmNoaWxkcmVuLmxlbmd0aCkge1xuICAgICAgICAgICAgVXRpbC53YXJuKCdVbmV4cGVjdGVkIHZhbHVlICcgK1xuICAgICAgICAgICAgICAgIHpJbmRleCArXG4gICAgICAgICAgICAgICAgJyBmb3IgekluZGV4IHByb3BlcnR5LiB6SW5kZXggaXMganVzdCBpbmRleCBvZiBhIG5vZGUgaW4gY2hpbGRyZW4gb2YgaXRzIHBhcmVudC4gRXhwZWN0ZWQgdmFsdWUgaXMgZnJvbSAwIHRvICcgK1xuICAgICAgICAgICAgICAgICh0aGlzLnBhcmVudC5jaGlsZHJlbi5sZW5ndGggLSAxKSArXG4gICAgICAgICAgICAgICAgJy4nKTtcbiAgICAgICAgfVxuICAgICAgICB2YXIgaW5kZXggPSB0aGlzLmluZGV4O1xuICAgICAgICB0aGlzLnBhcmVudC5jaGlsZHJlbi5zcGxpY2UoaW5kZXgsIDEpO1xuICAgICAgICB0aGlzLnBhcmVudC5jaGlsZHJlbi5zcGxpY2UoekluZGV4LCAwLCB0aGlzKTtcbiAgICAgICAgdGhpcy5wYXJlbnQuX3NldENoaWxkcmVuSW5kaWNlcygpO1xuICAgICAgICByZXR1cm4gdGhpcztcbiAgICB9XG4gICAgZ2V0QWJzb2x1dGVPcGFjaXR5KCkge1xuICAgICAgICByZXR1cm4gdGhpcy5fZ2V0Q2FjaGUoQUJTT0xVVEVfT1BBQ0lUWSwgdGhpcy5fZ2V0QWJzb2x1dGVPcGFjaXR5KTtcbiAgICB9XG4gICAgX2dldEFic29sdXRlT3BhY2l0eSgpIHtcbiAgICAgICAgdmFyIGFic09wYWNpdHkgPSB0aGlzLm9wYWNpdHkoKTtcbiAgICAgICAgdmFyIHBhcmVudCA9IHRoaXMuZ2V0UGFyZW50KCk7XG4gICAgICAgIGlmIChwYXJlbnQgJiYgIXBhcmVudC5faXNVbmRlckNhY2hlKSB7XG4gICAgICAgICAgICBhYnNPcGFjaXR5ICo9IHBhcmVudC5nZXRBYnNvbHV0ZU9wYWNpdHkoKTtcbiAgICAgICAgfVxuICAgICAgICByZXR1cm4gYWJzT3BhY2l0eTtcbiAgICB9XG4gICAgbW92ZVRvKG5ld0NvbnRhaW5lcikge1xuICAgICAgICBpZiAodGhpcy5nZXRQYXJlbnQoKSAhPT0gbmV3Q29udGFpbmVyKSB7XG4gICAgICAgICAgICB0aGlzLl9yZW1vdmUoKTtcbiAgICAgICAgICAgIG5ld0NvbnRhaW5lci5hZGQodGhpcyk7XG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuIHRoaXM7XG4gICAgfVxuICAgIHRvT2JqZWN0KCkge1xuICAgICAgICB2YXIgb2JqID0ge30sIGF0dHJzID0gdGhpcy5nZXRBdHRycygpLCBrZXksIHZhbCwgZ2V0dGVyLCBkZWZhdWx0VmFsdWUsIG5vblBsYWluT2JqZWN0O1xuICAgICAgICBvYmouYXR0cnMgPSB7fTtcbiAgICAgICAgZm9yIChrZXkgaW4gYXR0cnMpIHtcbiAgICAgICAgICAgIHZhbCA9IGF0dHJzW2tleV07XG4gICAgICAgICAgICBub25QbGFpbk9iamVjdCA9XG4gICAgICAgICAgICAgICAgVXRpbC5pc09iamVjdCh2YWwpICYmICFVdGlsLl9pc1BsYWluT2JqZWN0KHZhbCkgJiYgIVV0aWwuX2lzQXJyYXkodmFsKTtcbiAgICAgICAgICAgIGlmIChub25QbGFpbk9iamVjdCkge1xuICAgICAgICAgICAgICAgIGNvbnRpbnVlO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgZ2V0dGVyID0gdHlwZW9mIHRoaXNba2V5XSA9PT0gJ2Z1bmN0aW9uJyAmJiB0aGlzW2tleV07XG4gICAgICAgICAgICBkZWxldGUgYXR0cnNba2V5XTtcbiAgICAgICAgICAgIGRlZmF1bHRWYWx1ZSA9IGdldHRlciA/IGdldHRlci5jYWxsKHRoaXMpIDogbnVsbDtcbiAgICAgICAgICAgIGF0dHJzW2tleV0gPSB2YWw7XG4gICAgICAgICAgICBpZiAoZGVmYXVsdFZhbHVlICE9PSB2YWwpIHtcbiAgICAgICAgICAgICAgICBvYmouYXR0cnNba2V5XSA9IHZhbDtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgICBvYmouY2xhc3NOYW1lID0gdGhpcy5nZXRDbGFzc05hbWUoKTtcbiAgICAgICAgcmV0dXJuIFV0aWwuX3ByZXBhcmVUb1N0cmluZ2lmeShvYmopO1xuICAgIH1cbiAgICB0b0pTT04oKSB7XG4gICAgICAgIHJldHVybiBKU09OLnN0cmluZ2lmeSh0aGlzLnRvT2JqZWN0KCkpO1xuICAgIH1cbiAgICBnZXRQYXJlbnQoKSB7XG4gICAgICAgIHJldHVybiB0aGlzLnBhcmVudDtcbiAgICB9XG4gICAgZmluZEFuY2VzdG9ycyhzZWxlY3RvciwgaW5jbHVkZVNlbGYsIHN0b3BOb2RlKSB7XG4gICAgICAgIHZhciByZXMgPSBbXTtcbiAgICAgICAgaWYgKGluY2x1ZGVTZWxmICYmIHRoaXMuX2lzTWF0Y2goc2VsZWN0b3IpKSB7XG4gICAgICAgICAgICByZXMucHVzaCh0aGlzKTtcbiAgICAgICAgfVxuICAgICAgICB2YXIgYW5jZXN0b3IgPSB0aGlzLnBhcmVudDtcbiAgICAgICAgd2hpbGUgKGFuY2VzdG9yKSB7XG4gICAgICAgICAgICBpZiAoYW5jZXN0b3IgPT09IHN0b3BOb2RlKSB7XG4gICAgICAgICAgICAgICAgcmV0dXJuIHJlcztcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGlmIChhbmNlc3Rvci5faXNNYXRjaChzZWxlY3RvcikpIHtcbiAgICAgICAgICAgICAgICByZXMucHVzaChhbmNlc3Rvcik7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBhbmNlc3RvciA9IGFuY2VzdG9yLnBhcmVudDtcbiAgICAgICAgfVxuICAgICAgICByZXR1cm4gcmVzO1xuICAgIH1cbiAgICBpc0FuY2VzdG9yT2Yobm9kZSkge1xuICAgICAgICByZXR1cm4gZmFsc2U7XG4gICAgfVxuICAgIGZpbmRBbmNlc3RvcihzZWxlY3RvciwgaW5jbHVkZVNlbGYsIHN0b3BOb2RlKSB7XG4gICAgICAgIHJldHVybiB0aGlzLmZpbmRBbmNlc3RvcnMoc2VsZWN0b3IsIGluY2x1ZGVTZWxmLCBzdG9wTm9kZSlbMF07XG4gICAgfVxuICAgIF9pc01hdGNoKHNlbGVjdG9yKSB7XG4gICAgICAgIGlmICghc2VsZWN0b3IpIHtcbiAgICAgICAgICAgIHJldHVybiBmYWxzZTtcbiAgICAgICAgfVxuICAgICAgICBpZiAodHlwZW9mIHNlbGVjdG9yID09PSAnZnVuY3Rpb24nKSB7XG4gICAgICAgICAgICByZXR1cm4gc2VsZWN0b3IodGhpcyk7XG4gICAgICAgIH1cbiAgICAgICAgdmFyIHNlbGVjdG9yQXJyID0gc2VsZWN0b3IucmVwbGFjZSgvIC9nLCAnJykuc3BsaXQoJywnKSwgbGVuID0gc2VsZWN0b3JBcnIubGVuZ3RoLCBuLCBzZWw7XG4gICAgICAgIGZvciAobiA9IDA7IG4gPCBsZW47IG4rKykge1xuICAgICAgICAgICAgc2VsID0gc2VsZWN0b3JBcnJbbl07XG4gICAgICAgICAgICBpZiAoIVV0aWwuaXNWYWxpZFNlbGVjdG9yKHNlbCkpIHtcbiAgICAgICAgICAgICAgICBVdGlsLndhcm4oJ1NlbGVjdG9yIFwiJyArXG4gICAgICAgICAgICAgICAgICAgIHNlbCArXG4gICAgICAgICAgICAgICAgICAgICdcIiBpcyBpbnZhbGlkLiBBbGxvd2VkIHNlbGVjdG9ycyBleGFtcGxlcyBhcmUgXCIjZm9vXCIsIFwiLmJhclwiIG9yIFwiR3JvdXBcIi4nKTtcbiAgICAgICAgICAgICAgICBVdGlsLndhcm4oJ0lmIHlvdSBoYXZlIGEgY3VzdG9tIHNoYXBlIHdpdGggc3VjaCBjbGFzc05hbWUsIHBsZWFzZSBjaGFuZ2UgaXQgdG8gc3RhcnQgd2l0aCB1cHBlciBsZXR0ZXIgbGlrZSBcIlRyaWFuZ2xlXCIuJyk7XG4gICAgICAgICAgICAgICAgVXRpbC53YXJuKCdLb252YSBpcyBhd2Vzb21lLCByaWdodD8nKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGlmIChzZWwuY2hhckF0KDApID09PSAnIycpIHtcbiAgICAgICAgICAgICAgICBpZiAodGhpcy5pZCgpID09PSBzZWwuc2xpY2UoMSkpIHtcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuIHRydWU7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfVxuICAgICAgICAgICAgZWxzZSBpZiAoc2VsLmNoYXJBdCgwKSA9PT0gJy4nKSB7XG4gICAgICAgICAgICAgICAgaWYgKHRoaXMuaGFzTmFtZShzZWwuc2xpY2UoMSkpKSB7XG4gICAgICAgICAgICAgICAgICAgIHJldHVybiB0cnVlO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGVsc2UgaWYgKHRoaXMuY2xhc3NOYW1lID09PSBzZWwgfHwgdGhpcy5ub2RlVHlwZSA9PT0gc2VsKSB7XG4gICAgICAgICAgICAgICAgcmV0dXJuIHRydWU7XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuIGZhbHNlO1xuICAgIH1cbiAgICBnZXRMYXllcigpIHtcbiAgICAgICAgdmFyIHBhcmVudCA9IHRoaXMuZ2V0UGFyZW50KCk7XG4gICAgICAgIHJldHVybiBwYXJlbnQgPyBwYXJlbnQuZ2V0TGF5ZXIoKSA6IG51bGw7XG4gICAgfVxuICAgIGdldFN0YWdlKCkge1xuICAgICAgICByZXR1cm4gdGhpcy5fZ2V0Q2FjaGUoU1RBR0UsIHRoaXMuX2dldFN0YWdlKTtcbiAgICB9XG4gICAgX2dldFN0YWdlKCkge1xuICAgICAgICB2YXIgcGFyZW50ID0gdGhpcy5nZXRQYXJlbnQoKTtcbiAgICAgICAgaWYgKHBhcmVudCkge1xuICAgICAgICAgICAgcmV0dXJuIHBhcmVudC5nZXRTdGFnZSgpO1xuICAgICAgICB9XG4gICAgICAgIGVsc2Uge1xuICAgICAgICAgICAgcmV0dXJuIHVuZGVmaW5lZDtcbiAgICAgICAgfVxuICAgIH1cbiAgICBmaXJlKGV2ZW50VHlwZSwgZXZ0ID0ge30sIGJ1YmJsZSkge1xuICAgICAgICBldnQudGFyZ2V0ID0gZXZ0LnRhcmdldCB8fCB0aGlzO1xuICAgICAgICBpZiAoYnViYmxlKSB7XG4gICAgICAgICAgICB0aGlzLl9maXJlQW5kQnViYmxlKGV2ZW50VHlwZSwgZXZ0KTtcbiAgICAgICAgfVxuICAgICAgICBlbHNlIHtcbiAgICAgICAgICAgIHRoaXMuX2ZpcmUoZXZlbnRUeXBlLCBldnQpO1xuICAgICAgICB9XG4gICAgICAgIHJldHVybiB0aGlzO1xuICAgIH1cbiAgICBnZXRBYnNvbHV0ZVRyYW5zZm9ybSh0b3ApIHtcbiAgICAgICAgaWYgKHRvcCkge1xuICAgICAgICAgICAgcmV0dXJuIHRoaXMuX2dldEFic29sdXRlVHJhbnNmb3JtKHRvcCk7XG4gICAgICAgIH1cbiAgICAgICAgZWxzZSB7XG4gICAgICAgICAgICByZXR1cm4gdGhpcy5fZ2V0Q2FjaGUoQUJTT0xVVEVfVFJBTlNGT1JNLCB0aGlzLl9nZXRBYnNvbHV0ZVRyYW5zZm9ybSk7XG4gICAgICAgIH1cbiAgICB9XG4gICAgX2dldEFic29sdXRlVHJhbnNmb3JtKHRvcCkge1xuICAgICAgICB2YXIgYXQ7XG4gICAgICAgIGlmICh0b3ApIHtcbiAgICAgICAgICAgIGF0ID0gbmV3IFRyYW5zZm9ybSgpO1xuICAgICAgICAgICAgdGhpcy5fZWFjaEFuY2VzdG9yUmV2ZXJzZShmdW5jdGlvbiAobm9kZSkge1xuICAgICAgICAgICAgICAgIHZhciB0cmFuc2Zvcm1zRW5hYmxlZCA9IG5vZGUudHJhbnNmb3Jtc0VuYWJsZWQoKTtcbiAgICAgICAgICAgICAgICBpZiAodHJhbnNmb3Jtc0VuYWJsZWQgPT09ICdhbGwnKSB7XG4gICAgICAgICAgICAgICAgICAgIGF0Lm11bHRpcGx5KG5vZGUuZ2V0VHJhbnNmb3JtKCkpO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICBlbHNlIGlmICh0cmFuc2Zvcm1zRW5hYmxlZCA9PT0gJ3Bvc2l0aW9uJykge1xuICAgICAgICAgICAgICAgICAgICBhdC50cmFuc2xhdGUobm9kZS54KCkgLSBub2RlLm9mZnNldFgoKSwgbm9kZS55KCkgLSBub2RlLm9mZnNldFkoKSk7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfSwgdG9wKTtcbiAgICAgICAgICAgIHJldHVybiBhdDtcbiAgICAgICAgfVxuICAgICAgICBlbHNlIHtcbiAgICAgICAgICAgIGF0ID0gdGhpcy5fY2FjaGUuZ2V0KEFCU09MVVRFX1RSQU5TRk9STSkgfHwgbmV3IFRyYW5zZm9ybSgpO1xuICAgICAgICAgICAgaWYgKHRoaXMucGFyZW50KSB7XG4gICAgICAgICAgICAgICAgdGhpcy5wYXJlbnQuZ2V0QWJzb2x1dGVUcmFuc2Zvcm0oKS5jb3B5SW50byhhdCk7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBlbHNlIHtcbiAgICAgICAgICAgICAgICBhdC5yZXNldCgpO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgdmFyIHRyYW5zZm9ybXNFbmFibGVkID0gdGhpcy50cmFuc2Zvcm1zRW5hYmxlZCgpO1xuICAgICAgICAgICAgaWYgKHRyYW5zZm9ybXNFbmFibGVkID09PSAnYWxsJykge1xuICAgICAgICAgICAgICAgIGF0Lm11bHRpcGx5KHRoaXMuZ2V0VHJhbnNmb3JtKCkpO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgZWxzZSBpZiAodHJhbnNmb3Jtc0VuYWJsZWQgPT09ICdwb3NpdGlvbicpIHtcbiAgICAgICAgICAgICAgICBjb25zdCB4ID0gdGhpcy5hdHRycy54IHx8IDA7XG4gICAgICAgICAgICAgICAgY29uc3QgeSA9IHRoaXMuYXR0cnMueSB8fCAwO1xuICAgICAgICAgICAgICAgIGNvbnN0IG9mZnNldFggPSB0aGlzLmF0dHJzLm9mZnNldFggfHwgMDtcbiAgICAgICAgICAgICAgICBjb25zdCBvZmZzZXRZID0gdGhpcy5hdHRycy5vZmZzZXRZIHx8IDA7XG4gICAgICAgICAgICAgICAgYXQudHJhbnNsYXRlKHggLSBvZmZzZXRYLCB5IC0gb2Zmc2V0WSk7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBhdC5kaXJ0eSA9IGZhbHNlO1xuICAgICAgICAgICAgcmV0dXJuIGF0O1xuICAgICAgICB9XG4gICAgfVxuICAgIGdldEFic29sdXRlU2NhbGUodG9wKSB7XG4gICAgICAgIHZhciBwYXJlbnQgPSB0aGlzO1xuICAgICAgICB3aGlsZSAocGFyZW50KSB7XG4gICAgICAgICAgICBpZiAocGFyZW50Ll9pc1VuZGVyQ2FjaGUpIHtcbiAgICAgICAgICAgICAgICB0b3AgPSBwYXJlbnQ7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBwYXJlbnQgPSBwYXJlbnQuZ2V0UGFyZW50KCk7XG4gICAgICAgIH1cbiAgICAgICAgY29uc3QgdHJhbnNmb3JtID0gdGhpcy5nZXRBYnNvbHV0ZVRyYW5zZm9ybSh0b3ApO1xuICAgICAgICBjb25zdCBhdHRycyA9IHRyYW5zZm9ybS5kZWNvbXBvc2UoKTtcbiAgICAgICAgcmV0dXJuIHtcbiAgICAgICAgICAgIHg6IGF0dHJzLnNjYWxlWCxcbiAgICAgICAgICAgIHk6IGF0dHJzLnNjYWxlWSxcbiAgICAgICAgfTtcbiAgICB9XG4gICAgZ2V0QWJzb2x1dGVSb3RhdGlvbigpIHtcbiAgICAgICAgcmV0dXJuIHRoaXMuZ2V0QWJzb2x1dGVUcmFuc2Zvcm0oKS5kZWNvbXBvc2UoKS5yb3RhdGlvbjtcbiAgICB9XG4gICAgZ2V0VHJhbnNmb3JtKCkge1xuICAgICAgICByZXR1cm4gdGhpcy5fZ2V0Q2FjaGUoVFJBTlNGT1JNLCB0aGlzLl9nZXRUcmFuc2Zvcm0pO1xuICAgIH1cbiAgICBfZ2V0VHJhbnNmb3JtKCkge1xuICAgICAgICB2YXIgX2EsIF9iO1xuICAgICAgICB2YXIgbSA9IHRoaXMuX2NhY2hlLmdldChUUkFOU0ZPUk0pIHx8IG5ldyBUcmFuc2Zvcm0oKTtcbiAgICAgICAgbS5yZXNldCgpO1xuICAgICAgICB2YXIgeCA9IHRoaXMueCgpLCB5ID0gdGhpcy55KCksIHJvdGF0aW9uID0gS29udmEuZ2V0QW5nbGUodGhpcy5yb3RhdGlvbigpKSwgc2NhbGVYID0gKF9hID0gdGhpcy5hdHRycy5zY2FsZVgpICE9PSBudWxsICYmIF9hICE9PSB2b2lkIDAgPyBfYSA6IDEsIHNjYWxlWSA9IChfYiA9IHRoaXMuYXR0cnMuc2NhbGVZKSAhPT0gbnVsbCAmJiBfYiAhPT0gdm9pZCAwID8gX2IgOiAxLCBza2V3WCA9IHRoaXMuYXR0cnMuc2tld1ggfHwgMCwgc2tld1kgPSB0aGlzLmF0dHJzLnNrZXdZIHx8IDAsIG9mZnNldFggPSB0aGlzLmF0dHJzLm9mZnNldFggfHwgMCwgb2Zmc2V0WSA9IHRoaXMuYXR0cnMub2Zmc2V0WSB8fCAwO1xuICAgICAgICBpZiAoeCAhPT0gMCB8fCB5ICE9PSAwKSB7XG4gICAgICAgICAgICBtLnRyYW5zbGF0ZSh4LCB5KTtcbiAgICAgICAgfVxuICAgICAgICBpZiAocm90YXRpb24gIT09IDApIHtcbiAgICAgICAgICAgIG0ucm90YXRlKHJvdGF0aW9uKTtcbiAgICAgICAgfVxuICAgICAgICBpZiAoc2tld1ggIT09IDAgfHwgc2tld1kgIT09IDApIHtcbiAgICAgICAgICAgIG0uc2tldyhza2V3WCwgc2tld1kpO1xuICAgICAgICB9XG4gICAgICAgIGlmIChzY2FsZVggIT09IDEgfHwgc2NhbGVZICE9PSAxKSB7XG4gICAgICAgICAgICBtLnNjYWxlKHNjYWxlWCwgc2NhbGVZKTtcbiAgICAgICAgfVxuICAgICAgICBpZiAob2Zmc2V0WCAhPT0gMCB8fCBvZmZzZXRZICE9PSAwKSB7XG4gICAgICAgICAgICBtLnRyYW5zbGF0ZSgtMSAqIG9mZnNldFgsIC0xICogb2Zmc2V0WSk7XG4gICAgICAgIH1cbiAgICAgICAgbS5kaXJ0eSA9IGZhbHNlO1xuICAgICAgICByZXR1cm4gbTtcbiAgICB9XG4gICAgY2xvbmUob2JqKSB7XG4gICAgICAgIHZhciBhdHRycyA9IFV0aWwuY2xvbmVPYmplY3QodGhpcy5hdHRycyksIGtleSwgYWxsTGlzdGVuZXJzLCBsZW4sIG4sIGxpc3RlbmVyO1xuICAgICAgICBmb3IgKGtleSBpbiBvYmopIHtcbiAgICAgICAgICAgIGF0dHJzW2tleV0gPSBvYmpba2V5XTtcbiAgICAgICAgfVxuICAgICAgICB2YXIgbm9kZSA9IG5ldyB0aGlzLmNvbnN0cnVjdG9yKGF0dHJzKTtcbiAgICAgICAgZm9yIChrZXkgaW4gdGhpcy5ldmVudExpc3RlbmVycykge1xuICAgICAgICAgICAgYWxsTGlzdGVuZXJzID0gdGhpcy5ldmVudExpc3RlbmVyc1trZXldO1xuICAgICAgICAgICAgbGVuID0gYWxsTGlzdGVuZXJzLmxlbmd0aDtcbiAgICAgICAgICAgIGZvciAobiA9IDA7IG4gPCBsZW47IG4rKykge1xuICAgICAgICAgICAgICAgIGxpc3RlbmVyID0gYWxsTGlzdGVuZXJzW25dO1xuICAgICAgICAgICAgICAgIGlmIChsaXN0ZW5lci5uYW1lLmluZGV4T2YoS09OVkEpIDwgMCkge1xuICAgICAgICAgICAgICAgICAgICBpZiAoIW5vZGUuZXZlbnRMaXN0ZW5lcnNba2V5XSkge1xuICAgICAgICAgICAgICAgICAgICAgICAgbm9kZS5ldmVudExpc3RlbmVyc1trZXldID0gW107XG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgbm9kZS5ldmVudExpc3RlbmVyc1trZXldLnB1c2gobGlzdGVuZXIpO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgICByZXR1cm4gbm9kZTtcbiAgICB9XG4gICAgX3RvS29udmFDYW52YXMoY29uZmlnKSB7XG4gICAgICAgIGNvbmZpZyA9IGNvbmZpZyB8fCB7fTtcbiAgICAgICAgdmFyIGJveCA9IHRoaXMuZ2V0Q2xpZW50UmVjdCgpO1xuICAgICAgICB2YXIgc3RhZ2UgPSB0aGlzLmdldFN0YWdlKCksIHggPSBjb25maWcueCAhPT0gdW5kZWZpbmVkID8gY29uZmlnLnggOiBNYXRoLmZsb29yKGJveC54KSwgeSA9IGNvbmZpZy55ICE9PSB1bmRlZmluZWQgPyBjb25maWcueSA6IE1hdGguZmxvb3IoYm94LnkpLCBwaXhlbFJhdGlvID0gY29uZmlnLnBpeGVsUmF0aW8gfHwgMSwgY2FudmFzID0gbmV3IFNjZW5lQ2FudmFzKHtcbiAgICAgICAgICAgIHdpZHRoOiBjb25maWcud2lkdGggfHwgTWF0aC5jZWlsKGJveC53aWR0aCkgfHwgKHN0YWdlID8gc3RhZ2Uud2lkdGgoKSA6IDApLFxuICAgICAgICAgICAgaGVpZ2h0OiBjb25maWcuaGVpZ2h0IHx8XG4gICAgICAgICAgICAgICAgTWF0aC5jZWlsKGJveC5oZWlnaHQpIHx8XG4gICAgICAgICAgICAgICAgKHN0YWdlID8gc3RhZ2UuaGVpZ2h0KCkgOiAwKSxcbiAgICAgICAgICAgIHBpeGVsUmF0aW86IHBpeGVsUmF0aW8sXG4gICAgICAgIH0pLCBjb250ZXh0ID0gY2FudmFzLmdldENvbnRleHQoKTtcbiAgICAgICAgaWYgKGNvbmZpZy5pbWFnZVNtb290aGluZ0VuYWJsZWQgPT09IGZhbHNlKSB7XG4gICAgICAgICAgICBjb250ZXh0Ll9jb250ZXh0LmltYWdlU21vb3RoaW5nRW5hYmxlZCA9IGZhbHNlO1xuICAgICAgICB9XG4gICAgICAgIGNvbnRleHQuc2F2ZSgpO1xuICAgICAgICBpZiAoeCB8fCB5KSB7XG4gICAgICAgICAgICBjb250ZXh0LnRyYW5zbGF0ZSgtMSAqIHgsIC0xICogeSk7XG4gICAgICAgIH1cbiAgICAgICAgdGhpcy5kcmF3U2NlbmUoY2FudmFzKTtcbiAgICAgICAgY29udGV4dC5yZXN0b3JlKCk7XG4gICAgICAgIHJldHVybiBjYW52YXM7XG4gICAgfVxuICAgIHRvQ2FudmFzKGNvbmZpZykge1xuICAgICAgICByZXR1cm4gdGhpcy5fdG9Lb252YUNhbnZhcyhjb25maWcpLl9jYW52YXM7XG4gICAgfVxuICAgIHRvRGF0YVVSTChjb25maWcpIHtcbiAgICAgICAgY29uZmlnID0gY29uZmlnIHx8IHt9O1xuICAgICAgICB2YXIgbWltZVR5cGUgPSBjb25maWcubWltZVR5cGUgfHwgbnVsbCwgcXVhbGl0eSA9IGNvbmZpZy5xdWFsaXR5IHx8IG51bGw7XG4gICAgICAgIHZhciB1cmwgPSB0aGlzLl90b0tvbnZhQ2FudmFzKGNvbmZpZykudG9EYXRhVVJMKG1pbWVUeXBlLCBxdWFsaXR5KTtcbiAgICAgICAgaWYgKGNvbmZpZy5jYWxsYmFjaykge1xuICAgICAgICAgICAgY29uZmlnLmNhbGxiYWNrKHVybCk7XG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuIHVybDtcbiAgICB9XG4gICAgdG9JbWFnZShjb25maWcpIHtcbiAgICAgICAgcmV0dXJuIG5ldyBQcm9taXNlKChyZXNvbHZlLCByZWplY3QpID0+IHtcbiAgICAgICAgICAgIHRyeSB7XG4gICAgICAgICAgICAgICAgY29uc3QgY2FsbGJhY2sgPSBjb25maWcgPT09IG51bGwgfHwgY29uZmlnID09PSB2b2lkIDAgPyB2b2lkIDAgOiBjb25maWcuY2FsbGJhY2s7XG4gICAgICAgICAgICAgICAgaWYgKGNhbGxiYWNrKVxuICAgICAgICAgICAgICAgICAgICBkZWxldGUgY29uZmlnLmNhbGxiYWNrO1xuICAgICAgICAgICAgICAgIFV0aWwuX3VybFRvSW1hZ2UodGhpcy50b0RhdGFVUkwoY29uZmlnKSwgZnVuY3Rpb24gKGltZykge1xuICAgICAgICAgICAgICAgICAgICByZXNvbHZlKGltZyk7XG4gICAgICAgICAgICAgICAgICAgIGNhbGxiYWNrID09PSBudWxsIHx8IGNhbGxiYWNrID09PSB2b2lkIDAgPyB2b2lkIDAgOiBjYWxsYmFjayhpbWcpO1xuICAgICAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgY2F0Y2ggKGVycikge1xuICAgICAgICAgICAgICAgIHJlamVjdChlcnIpO1xuICAgICAgICAgICAgfVxuICAgICAgICB9KTtcbiAgICB9XG4gICAgdG9CbG9iKGNvbmZpZykge1xuICAgICAgICByZXR1cm4gbmV3IFByb21pc2UoKHJlc29sdmUsIHJlamVjdCkgPT4ge1xuICAgICAgICAgICAgdHJ5IHtcbiAgICAgICAgICAgICAgICBjb25zdCBjYWxsYmFjayA9IGNvbmZpZyA9PT0gbnVsbCB8fCBjb25maWcgPT09IHZvaWQgMCA/IHZvaWQgMCA6IGNvbmZpZy5jYWxsYmFjaztcbiAgICAgICAgICAgICAgICBpZiAoY2FsbGJhY2spXG4gICAgICAgICAgICAgICAgICAgIGRlbGV0ZSBjb25maWcuY2FsbGJhY2s7XG4gICAgICAgICAgICAgICAgdGhpcy50b0NhbnZhcyhjb25maWcpLnRvQmxvYigoYmxvYikgPT4ge1xuICAgICAgICAgICAgICAgICAgICByZXNvbHZlKGJsb2IpO1xuICAgICAgICAgICAgICAgICAgICBjYWxsYmFjayA9PT0gbnVsbCB8fCBjYWxsYmFjayA9PT0gdm9pZCAwID8gdm9pZCAwIDogY2FsbGJhY2soYmxvYik7XG4gICAgICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBjYXRjaCAoZXJyKSB7XG4gICAgICAgICAgICAgICAgcmVqZWN0KGVycik7XG4gICAgICAgICAgICB9XG4gICAgICAgIH0pO1xuICAgIH1cbiAgICBzZXRTaXplKHNpemUpIHtcbiAgICAgICAgdGhpcy53aWR0aChzaXplLndpZHRoKTtcbiAgICAgICAgdGhpcy5oZWlnaHQoc2l6ZS5oZWlnaHQpO1xuICAgICAgICByZXR1cm4gdGhpcztcbiAgICB9XG4gICAgZ2V0U2l6ZSgpIHtcbiAgICAgICAgcmV0dXJuIHtcbiAgICAgICAgICAgIHdpZHRoOiB0aGlzLndpZHRoKCksXG4gICAgICAgICAgICBoZWlnaHQ6IHRoaXMuaGVpZ2h0KCksXG4gICAgICAgIH07XG4gICAgfVxuICAgIGdldENsYXNzTmFtZSgpIHtcbiAgICAgICAgcmV0dXJuIHRoaXMuY2xhc3NOYW1lIHx8IHRoaXMubm9kZVR5cGU7XG4gICAgfVxuICAgIGdldFR5cGUoKSB7XG4gICAgICAgIHJldHVybiB0aGlzLm5vZGVUeXBlO1xuICAgIH1cbiAgICBnZXREcmFnRGlzdGFuY2UoKSB7XG4gICAgICAgIGlmICh0aGlzLmF0dHJzLmRyYWdEaXN0YW5jZSAhPT0gdW5kZWZpbmVkKSB7XG4gICAgICAgICAgICByZXR1cm4gdGhpcy5hdHRycy5kcmFnRGlzdGFuY2U7XG4gICAgICAgIH1cbiAgICAgICAgZWxzZSBpZiAodGhpcy5wYXJlbnQpIHtcbiAgICAgICAgICAgIHJldHVybiB0aGlzLnBhcmVudC5nZXREcmFnRGlzdGFuY2UoKTtcbiAgICAgICAgfVxuICAgICAgICBlbHNlIHtcbiAgICAgICAgICAgIHJldHVybiBLb252YS5kcmFnRGlzdGFuY2U7XG4gICAgICAgIH1cbiAgICB9XG4gICAgX29mZih0eXBlLCBuYW1lLCBjYWxsYmFjaykge1xuICAgICAgICB2YXIgZXZ0TGlzdGVuZXJzID0gdGhpcy5ldmVudExpc3RlbmVyc1t0eXBlXSwgaSwgZXZ0TmFtZSwgaGFuZGxlcjtcbiAgICAgICAgZm9yIChpID0gMDsgaSA8IGV2dExpc3RlbmVycy5sZW5ndGg7IGkrKykge1xuICAgICAgICAgICAgZXZ0TmFtZSA9IGV2dExpc3RlbmVyc1tpXS5uYW1lO1xuICAgICAgICAgICAgaGFuZGxlciA9IGV2dExpc3RlbmVyc1tpXS5oYW5kbGVyO1xuICAgICAgICAgICAgaWYgKChldnROYW1lICE9PSAna29udmEnIHx8IG5hbWUgPT09ICdrb252YScpICYmXG4gICAgICAgICAgICAgICAgKCFuYW1lIHx8IGV2dE5hbWUgPT09IG5hbWUpICYmXG4gICAgICAgICAgICAgICAgKCFjYWxsYmFjayB8fCBjYWxsYmFjayA9PT0gaGFuZGxlcikpIHtcbiAgICAgICAgICAgICAgICBldnRMaXN0ZW5lcnMuc3BsaWNlKGksIDEpO1xuICAgICAgICAgICAgICAgIGlmIChldnRMaXN0ZW5lcnMubGVuZ3RoID09PSAwKSB7XG4gICAgICAgICAgICAgICAgICAgIGRlbGV0ZSB0aGlzLmV2ZW50TGlzdGVuZXJzW3R5cGVdO1xuICAgICAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgaS0tO1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgfVxuICAgIF9maXJlQ2hhbmdlRXZlbnQoYXR0ciwgb2xkVmFsLCBuZXdWYWwpIHtcbiAgICAgICAgdGhpcy5fZmlyZShhdHRyICsgQ0hBTkdFLCB7XG4gICAgICAgICAgICBvbGRWYWw6IG9sZFZhbCxcbiAgICAgICAgICAgIG5ld1ZhbDogbmV3VmFsLFxuICAgICAgICB9KTtcbiAgICB9XG4gICAgYWRkTmFtZShuYW1lKSB7XG4gICAgICAgIGlmICghdGhpcy5oYXNOYW1lKG5hbWUpKSB7XG4gICAgICAgICAgICB2YXIgb2xkTmFtZSA9IHRoaXMubmFtZSgpO1xuICAgICAgICAgICAgdmFyIG5ld05hbWUgPSBvbGROYW1lID8gb2xkTmFtZSArICcgJyArIG5hbWUgOiBuYW1lO1xuICAgICAgICAgICAgdGhpcy5uYW1lKG5ld05hbWUpO1xuICAgICAgICB9XG4gICAgICAgIHJldHVybiB0aGlzO1xuICAgIH1cbiAgICBoYXNOYW1lKG5hbWUpIHtcbiAgICAgICAgaWYgKCFuYW1lKSB7XG4gICAgICAgICAgICByZXR1cm4gZmFsc2U7XG4gICAgICAgIH1cbiAgICAgICAgY29uc3QgZnVsbE5hbWUgPSB0aGlzLm5hbWUoKTtcbiAgICAgICAgaWYgKCFmdWxsTmFtZSkge1xuICAgICAgICAgICAgcmV0dXJuIGZhbHNlO1xuICAgICAgICB9XG4gICAgICAgIHZhciBuYW1lcyA9IChmdWxsTmFtZSB8fCAnJykuc3BsaXQoL1xccy9nKTtcbiAgICAgICAgcmV0dXJuIG5hbWVzLmluZGV4T2YobmFtZSkgIT09IC0xO1xuICAgIH1cbiAgICByZW1vdmVOYW1lKG5hbWUpIHtcbiAgICAgICAgdmFyIG5hbWVzID0gKHRoaXMubmFtZSgpIHx8ICcnKS5zcGxpdCgvXFxzL2cpO1xuICAgICAgICB2YXIgaW5kZXggPSBuYW1lcy5pbmRleE9mKG5hbWUpO1xuICAgICAgICBpZiAoaW5kZXggIT09IC0xKSB7XG4gICAgICAgICAgICBuYW1lcy5zcGxpY2UoaW5kZXgsIDEpO1xuICAgICAgICAgICAgdGhpcy5uYW1lKG5hbWVzLmpvaW4oJyAnKSk7XG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuIHRoaXM7XG4gICAgfVxuICAgIHNldEF0dHIoYXR0ciwgdmFsKSB7XG4gICAgICAgIHZhciBmdW5jID0gdGhpc1tTRVQgKyBVdGlsLl9jYXBpdGFsaXplKGF0dHIpXTtcbiAgICAgICAgaWYgKFV0aWwuX2lzRnVuY3Rpb24oZnVuYykpIHtcbiAgICAgICAgICAgIGZ1bmMuY2FsbCh0aGlzLCB2YWwpO1xuICAgICAgICB9XG4gICAgICAgIGVsc2Uge1xuICAgICAgICAgICAgdGhpcy5fc2V0QXR0cihhdHRyLCB2YWwpO1xuICAgICAgICB9XG4gICAgICAgIHJldHVybiB0aGlzO1xuICAgIH1cbiAgICBfcmVxdWVzdERyYXcoKSB7XG4gICAgICAgIGlmIChLb252YS5hdXRvRHJhd0VuYWJsZWQpIHtcbiAgICAgICAgICAgIGNvbnN0IGRyYXdOb2RlID0gdGhpcy5nZXRMYXllcigpIHx8IHRoaXMuZ2V0U3RhZ2UoKTtcbiAgICAgICAgICAgIGRyYXdOb2RlID09PSBudWxsIHx8IGRyYXdOb2RlID09PSB2b2lkIDAgPyB2b2lkIDAgOiBkcmF3Tm9kZS5iYXRjaERyYXcoKTtcbiAgICAgICAgfVxuICAgIH1cbiAgICBfc2V0QXR0cihrZXksIHZhbCkge1xuICAgICAgICB2YXIgb2xkVmFsID0gdGhpcy5hdHRyc1trZXldO1xuICAgICAgICBpZiAob2xkVmFsID09PSB2YWwgJiYgIVV0aWwuaXNPYmplY3QodmFsKSkge1xuICAgICAgICAgICAgcmV0dXJuO1xuICAgICAgICB9XG4gICAgICAgIGlmICh2YWwgPT09IHVuZGVmaW5lZCB8fCB2YWwgPT09IG51bGwpIHtcbiAgICAgICAgICAgIGRlbGV0ZSB0aGlzLmF0dHJzW2tleV07XG4gICAgICAgIH1cbiAgICAgICAgZWxzZSB7XG4gICAgICAgICAgICB0aGlzLmF0dHJzW2tleV0gPSB2YWw7XG4gICAgICAgIH1cbiAgICAgICAgaWYgKHRoaXMuX3Nob3VsZEZpcmVDaGFuZ2VFdmVudHMpIHtcbiAgICAgICAgICAgIHRoaXMuX2ZpcmVDaGFuZ2VFdmVudChrZXksIG9sZFZhbCwgdmFsKTtcbiAgICAgICAgfVxuICAgICAgICB0aGlzLl9yZXF1ZXN0RHJhdygpO1xuICAgIH1cbiAgICBfc2V0Q29tcG9uZW50QXR0cihrZXksIGNvbXBvbmVudCwgdmFsKSB7XG4gICAgICAgIHZhciBvbGRWYWw7XG4gICAgICAgIGlmICh2YWwgIT09IHVuZGVmaW5lZCkge1xuICAgICAgICAgICAgb2xkVmFsID0gdGhpcy5hdHRyc1trZXldO1xuICAgICAgICAgICAgaWYgKCFvbGRWYWwpIHtcbiAgICAgICAgICAgICAgICB0aGlzLmF0dHJzW2tleV0gPSB0aGlzLmdldEF0dHIoa2V5KTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIHRoaXMuYXR0cnNba2V5XVtjb21wb25lbnRdID0gdmFsO1xuICAgICAgICAgICAgdGhpcy5fZmlyZUNoYW5nZUV2ZW50KGtleSwgb2xkVmFsLCB2YWwpO1xuICAgICAgICB9XG4gICAgfVxuICAgIF9maXJlQW5kQnViYmxlKGV2ZW50VHlwZSwgZXZ0LCBjb21wYXJlU2hhcGUpIHtcbiAgICAgICAgaWYgKGV2dCAmJiB0aGlzLm5vZGVUeXBlID09PSBTSEFQRSkge1xuICAgICAgICAgICAgZXZ0LnRhcmdldCA9IHRoaXM7XG4gICAgICAgIH1cbiAgICAgICAgdmFyIHNob3VsZFN0b3AgPSAoZXZlbnRUeXBlID09PSBNT1VTRUVOVEVSIHx8IGV2ZW50VHlwZSA9PT0gTU9VU0VMRUFWRSkgJiZcbiAgICAgICAgICAgICgoY29tcGFyZVNoYXBlICYmXG4gICAgICAgICAgICAgICAgKHRoaXMgPT09IGNvbXBhcmVTaGFwZSB8fFxuICAgICAgICAgICAgICAgICAgICAodGhpcy5pc0FuY2VzdG9yT2YgJiYgdGhpcy5pc0FuY2VzdG9yT2YoY29tcGFyZVNoYXBlKSkpKSB8fFxuICAgICAgICAgICAgICAgICh0aGlzLm5vZGVUeXBlID09PSAnU3RhZ2UnICYmICFjb21wYXJlU2hhcGUpKTtcbiAgICAgICAgaWYgKCFzaG91bGRTdG9wKSB7XG4gICAgICAgICAgICB0aGlzLl9maXJlKGV2ZW50VHlwZSwgZXZ0KTtcbiAgICAgICAgICAgIHZhciBzdG9wQnViYmxlID0gKGV2ZW50VHlwZSA9PT0gTU9VU0VFTlRFUiB8fCBldmVudFR5cGUgPT09IE1PVVNFTEVBVkUpICYmXG4gICAgICAgICAgICAgICAgY29tcGFyZVNoYXBlICYmXG4gICAgICAgICAgICAgICAgY29tcGFyZVNoYXBlLmlzQW5jZXN0b3JPZiAmJlxuICAgICAgICAgICAgICAgIGNvbXBhcmVTaGFwZS5pc0FuY2VzdG9yT2YodGhpcykgJiZcbiAgICAgICAgICAgICAgICAhY29tcGFyZVNoYXBlLmlzQW5jZXN0b3JPZih0aGlzLnBhcmVudCk7XG4gICAgICAgICAgICBpZiAoKChldnQgJiYgIWV2dC5jYW5jZWxCdWJibGUpIHx8ICFldnQpICYmXG4gICAgICAgICAgICAgICAgdGhpcy5wYXJlbnQgJiZcbiAgICAgICAgICAgICAgICB0aGlzLnBhcmVudC5pc0xpc3RlbmluZygpICYmXG4gICAgICAgICAgICAgICAgIXN0b3BCdWJibGUpIHtcbiAgICAgICAgICAgICAgICBpZiAoY29tcGFyZVNoYXBlICYmIGNvbXBhcmVTaGFwZS5wYXJlbnQpIHtcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5fZmlyZUFuZEJ1YmJsZS5jYWxsKHRoaXMucGFyZW50LCBldmVudFR5cGUsIGV2dCwgY29tcGFyZVNoYXBlKTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgZWxzZSB7XG4gICAgICAgICAgICAgICAgICAgIHRoaXMuX2ZpcmVBbmRCdWJibGUuY2FsbCh0aGlzLnBhcmVudCwgZXZlbnRUeXBlLCBldnQpO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgIH1cbiAgICBfZ2V0UHJvdG9MaXN0ZW5lcnMoZXZlbnRUeXBlKSB7XG4gICAgICAgIGxldCBsaXN0ZW5lcnMgPSB0aGlzLl9jYWNoZS5nZXQoQUxMX0xJU1RFTkVSUyk7XG4gICAgICAgIGlmICghbGlzdGVuZXJzKSB7XG4gICAgICAgICAgICBsaXN0ZW5lcnMgPSB7fTtcbiAgICAgICAgICAgIGxldCBvYmogPSBPYmplY3QuZ2V0UHJvdG90eXBlT2YodGhpcyk7XG4gICAgICAgICAgICB3aGlsZSAob2JqKSB7XG4gICAgICAgICAgICAgICAgaWYgKCFvYmouZXZlbnRMaXN0ZW5lcnMpIHtcbiAgICAgICAgICAgICAgICAgICAgb2JqID0gT2JqZWN0LmdldFByb3RvdHlwZU9mKG9iaik7XG4gICAgICAgICAgICAgICAgICAgIGNvbnRpbnVlO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICBmb3IgKHZhciBldmVudCBpbiBvYmouZXZlbnRMaXN0ZW5lcnMpIHtcbiAgICAgICAgICAgICAgICAgICAgY29uc3QgbmV3RXZlbnRzID0gb2JqLmV2ZW50TGlzdGVuZXJzW2V2ZW50XTtcbiAgICAgICAgICAgICAgICAgICAgY29uc3Qgb2xkRXZlbnRzID0gbGlzdGVuZXJzW2V2ZW50XSB8fCBbXTtcbiAgICAgICAgICAgICAgICAgICAgbGlzdGVuZXJzW2V2ZW50XSA9IG5ld0V2ZW50cy5jb25jYXQob2xkRXZlbnRzKTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgb2JqID0gT2JqZWN0LmdldFByb3RvdHlwZU9mKG9iaik7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICB0aGlzLl9jYWNoZS5zZXQoQUxMX0xJU1RFTkVSUywgbGlzdGVuZXJzKTtcbiAgICAgICAgfVxuICAgICAgICByZXR1cm4gbGlzdGVuZXJzW2V2ZW50VHlwZV07XG4gICAgfVxuICAgIF9maXJlKGV2ZW50VHlwZSwgZXZ0KSB7XG4gICAgICAgIGV2dCA9IGV2dCB8fCB7fTtcbiAgICAgICAgZXZ0LmN1cnJlbnRUYXJnZXQgPSB0aGlzO1xuICAgICAgICBldnQudHlwZSA9IGV2ZW50VHlwZTtcbiAgICAgICAgY29uc3QgdG9wTGlzdGVuZXJzID0gdGhpcy5fZ2V0UHJvdG9MaXN0ZW5lcnMoZXZlbnRUeXBlKTtcbiAgICAgICAgaWYgKHRvcExpc3RlbmVycykge1xuICAgICAgICAgICAgZm9yICh2YXIgaSA9IDA7IGkgPCB0b3BMaXN0ZW5lcnMubGVuZ3RoOyBpKyspIHtcbiAgICAgICAgICAgICAgICB0b3BMaXN0ZW5lcnNbaV0uaGFuZGxlci5jYWxsKHRoaXMsIGV2dCk7XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgICAgY29uc3Qgc2VsZkxpc3RlbmVycyA9IHRoaXMuZXZlbnRMaXN0ZW5lcnNbZXZlbnRUeXBlXTtcbiAgICAgICAgaWYgKHNlbGZMaXN0ZW5lcnMpIHtcbiAgICAgICAgICAgIGZvciAodmFyIGkgPSAwOyBpIDwgc2VsZkxpc3RlbmVycy5sZW5ndGg7IGkrKykge1xuICAgICAgICAgICAgICAgIHNlbGZMaXN0ZW5lcnNbaV0uaGFuZGxlci5jYWxsKHRoaXMsIGV2dCk7XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICB9XG4gICAgZHJhdygpIHtcbiAgICAgICAgdGhpcy5kcmF3U2NlbmUoKTtcbiAgICAgICAgdGhpcy5kcmF3SGl0KCk7XG4gICAgICAgIHJldHVybiB0aGlzO1xuICAgIH1cbiAgICBfY3JlYXRlRHJhZ0VsZW1lbnQoZXZ0KSB7XG4gICAgICAgIHZhciBwb2ludGVySWQgPSBldnQgPyBldnQucG9pbnRlcklkIDogdW5kZWZpbmVkO1xuICAgICAgICB2YXIgc3RhZ2UgPSB0aGlzLmdldFN0YWdlKCk7XG4gICAgICAgIHZhciBhcCA9IHRoaXMuZ2V0QWJzb2x1dGVQb3NpdGlvbigpO1xuICAgICAgICB2YXIgcG9zID0gc3RhZ2UuX2dldFBvaW50ZXJCeUlkKHBvaW50ZXJJZCkgfHxcbiAgICAgICAgICAgIHN0YWdlLl9jaGFuZ2VkUG9pbnRlclBvc2l0aW9uc1swXSB8fFxuICAgICAgICAgICAgYXA7XG4gICAgICAgIERELl9kcmFnRWxlbWVudHMuc2V0KHRoaXMuX2lkLCB7XG4gICAgICAgICAgICBub2RlOiB0aGlzLFxuICAgICAgICAgICAgc3RhcnRQb2ludGVyUG9zOiBwb3MsXG4gICAgICAgICAgICBvZmZzZXQ6IHtcbiAgICAgICAgICAgICAgICB4OiBwb3MueCAtIGFwLngsXG4gICAgICAgICAgICAgICAgeTogcG9zLnkgLSBhcC55LFxuICAgICAgICAgICAgfSxcbiAgICAgICAgICAgIGRyYWdTdGF0dXM6ICdyZWFkeScsXG4gICAgICAgICAgICBwb2ludGVySWQsXG4gICAgICAgIH0pO1xuICAgIH1cbiAgICBzdGFydERyYWcoZXZ0LCBidWJibGVFdmVudCA9IHRydWUpIHtcbiAgICAgICAgaWYgKCFERC5fZHJhZ0VsZW1lbnRzLmhhcyh0aGlzLl9pZCkpIHtcbiAgICAgICAgICAgIHRoaXMuX2NyZWF0ZURyYWdFbGVtZW50KGV2dCk7XG4gICAgICAgIH1cbiAgICAgICAgY29uc3QgZWxlbSA9IERELl9kcmFnRWxlbWVudHMuZ2V0KHRoaXMuX2lkKTtcbiAgICAgICAgZWxlbS5kcmFnU3RhdHVzID0gJ2RyYWdnaW5nJztcbiAgICAgICAgdGhpcy5maXJlKCdkcmFnc3RhcnQnLCB7XG4gICAgICAgICAgICB0eXBlOiAnZHJhZ3N0YXJ0JyxcbiAgICAgICAgICAgIHRhcmdldDogdGhpcyxcbiAgICAgICAgICAgIGV2dDogZXZ0ICYmIGV2dC5ldnQsXG4gICAgICAgIH0sIGJ1YmJsZUV2ZW50KTtcbiAgICB9XG4gICAgX3NldERyYWdQb3NpdGlvbihldnQsIGVsZW0pIHtcbiAgICAgICAgY29uc3QgcG9zID0gdGhpcy5nZXRTdGFnZSgpLl9nZXRQb2ludGVyQnlJZChlbGVtLnBvaW50ZXJJZCk7XG4gICAgICAgIGlmICghcG9zKSB7XG4gICAgICAgICAgICByZXR1cm47XG4gICAgICAgIH1cbiAgICAgICAgdmFyIG5ld05vZGVQb3MgPSB7XG4gICAgICAgICAgICB4OiBwb3MueCAtIGVsZW0ub2Zmc2V0LngsXG4gICAgICAgICAgICB5OiBwb3MueSAtIGVsZW0ub2Zmc2V0LnksXG4gICAgICAgIH07XG4gICAgICAgIHZhciBkYmYgPSB0aGlzLmRyYWdCb3VuZEZ1bmMoKTtcbiAgICAgICAgaWYgKGRiZiAhPT0gdW5kZWZpbmVkKSB7XG4gICAgICAgICAgICBjb25zdCBib3VuZGVkID0gZGJmLmNhbGwodGhpcywgbmV3Tm9kZVBvcywgZXZ0KTtcbiAgICAgICAgICAgIGlmICghYm91bmRlZCkge1xuICAgICAgICAgICAgICAgIFV0aWwud2FybignZHJhZ0JvdW5kRnVuYyBkaWQgbm90IHJldHVybiBhbnkgdmFsdWUuIFRoYXQgaXMgdW5leHBlY3RlZCBiZWhhdmlvci4gWW91IG11c3QgcmV0dXJuIG5ldyBhYnNvbHV0ZSBwb3NpdGlvbiBmcm9tIGRyYWdCb3VuZEZ1bmMuJyk7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBlbHNlIHtcbiAgICAgICAgICAgICAgICBuZXdOb2RlUG9zID0gYm91bmRlZDtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgICBpZiAoIXRoaXMuX2xhc3RQb3MgfHxcbiAgICAgICAgICAgIHRoaXMuX2xhc3RQb3MueCAhPT0gbmV3Tm9kZVBvcy54IHx8XG4gICAgICAgICAgICB0aGlzLl9sYXN0UG9zLnkgIT09IG5ld05vZGVQb3MueSkge1xuICAgICAgICAgICAgdGhpcy5zZXRBYnNvbHV0ZVBvc2l0aW9uKG5ld05vZGVQb3MpO1xuICAgICAgICAgICAgdGhpcy5fcmVxdWVzdERyYXcoKTtcbiAgICAgICAgfVxuICAgICAgICB0aGlzLl9sYXN0UG9zID0gbmV3Tm9kZVBvcztcbiAgICB9XG4gICAgc3RvcERyYWcoZXZ0KSB7XG4gICAgICAgIGNvbnN0IGVsZW0gPSBERC5fZHJhZ0VsZW1lbnRzLmdldCh0aGlzLl9pZCk7XG4gICAgICAgIGlmIChlbGVtKSB7XG4gICAgICAgICAgICBlbGVtLmRyYWdTdGF0dXMgPSAnc3RvcHBlZCc7XG4gICAgICAgIH1cbiAgICAgICAgREQuX2VuZERyYWdCZWZvcmUoZXZ0KTtcbiAgICAgICAgREQuX2VuZERyYWdBZnRlcihldnQpO1xuICAgIH1cbiAgICBzZXREcmFnZ2FibGUoZHJhZ2dhYmxlKSB7XG4gICAgICAgIHRoaXMuX3NldEF0dHIoJ2RyYWdnYWJsZScsIGRyYWdnYWJsZSk7XG4gICAgICAgIHRoaXMuX2RyYWdDaGFuZ2UoKTtcbiAgICB9XG4gICAgaXNEcmFnZ2luZygpIHtcbiAgICAgICAgY29uc3QgZWxlbSA9IERELl9kcmFnRWxlbWVudHMuZ2V0KHRoaXMuX2lkKTtcbiAgICAgICAgcmV0dXJuIGVsZW0gPyBlbGVtLmRyYWdTdGF0dXMgPT09ICdkcmFnZ2luZycgOiBmYWxzZTtcbiAgICB9XG4gICAgX2xpc3RlbkRyYWcoKSB7XG4gICAgICAgIHRoaXMuX2RyYWdDbGVhbnVwKCk7XG4gICAgICAgIHRoaXMub24oJ21vdXNlZG93bi5rb252YSB0b3VjaHN0YXJ0LmtvbnZhJywgZnVuY3Rpb24gKGV2dCkge1xuICAgICAgICAgICAgdmFyIHNob3VsZENoZWNrQnV0dG9uID0gZXZ0LmV2dFsnYnV0dG9uJ10gIT09IHVuZGVmaW5lZDtcbiAgICAgICAgICAgIHZhciBjYW5EcmFnID0gIXNob3VsZENoZWNrQnV0dG9uIHx8IEtvbnZhLmRyYWdCdXR0b25zLmluZGV4T2YoZXZ0LmV2dFsnYnV0dG9uJ10pID49IDA7XG4gICAgICAgICAgICBpZiAoIWNhbkRyYWcpIHtcbiAgICAgICAgICAgICAgICByZXR1cm47XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBpZiAodGhpcy5pc0RyYWdnaW5nKCkpIHtcbiAgICAgICAgICAgICAgICByZXR1cm47XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICB2YXIgaGFzRHJhZ2dpbmdDaGlsZCA9IGZhbHNlO1xuICAgICAgICAgICAgREQuX2RyYWdFbGVtZW50cy5mb3JFYWNoKChlbGVtKSA9PiB7XG4gICAgICAgICAgICAgICAgaWYgKHRoaXMuaXNBbmNlc3Rvck9mKGVsZW0ubm9kZSkpIHtcbiAgICAgICAgICAgICAgICAgICAgaGFzRHJhZ2dpbmdDaGlsZCA9IHRydWU7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICBpZiAoIWhhc0RyYWdnaW5nQ2hpbGQpIHtcbiAgICAgICAgICAgICAgICB0aGlzLl9jcmVhdGVEcmFnRWxlbWVudChldnQpO1xuICAgICAgICAgICAgfVxuICAgICAgICB9KTtcbiAgICB9XG4gICAgX2RyYWdDaGFuZ2UoKSB7XG4gICAgICAgIGlmICh0aGlzLmF0dHJzLmRyYWdnYWJsZSkge1xuICAgICAgICAgICAgdGhpcy5fbGlzdGVuRHJhZygpO1xuICAgICAgICB9XG4gICAgICAgIGVsc2Uge1xuICAgICAgICAgICAgdGhpcy5fZHJhZ0NsZWFudXAoKTtcbiAgICAgICAgICAgIHZhciBzdGFnZSA9IHRoaXMuZ2V0U3RhZ2UoKTtcbiAgICAgICAgICAgIGlmICghc3RhZ2UpIHtcbiAgICAgICAgICAgICAgICByZXR1cm47XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBjb25zdCBkcmFnRWxlbWVudCA9IERELl9kcmFnRWxlbWVudHMuZ2V0KHRoaXMuX2lkKTtcbiAgICAgICAgICAgIGNvbnN0IGlzRHJhZ2dpbmcgPSBkcmFnRWxlbWVudCAmJiBkcmFnRWxlbWVudC5kcmFnU3RhdHVzID09PSAnZHJhZ2dpbmcnO1xuICAgICAgICAgICAgY29uc3QgaXNSZWFkeSA9IGRyYWdFbGVtZW50ICYmIGRyYWdFbGVtZW50LmRyYWdTdGF0dXMgPT09ICdyZWFkeSc7XG4gICAgICAgICAgICBpZiAoaXNEcmFnZ2luZykge1xuICAgICAgICAgICAgICAgIHRoaXMuc3RvcERyYWcoKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGVsc2UgaWYgKGlzUmVhZHkpIHtcbiAgICAgICAgICAgICAgICBERC5fZHJhZ0VsZW1lbnRzLmRlbGV0ZSh0aGlzLl9pZCk7XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICB9XG4gICAgX2RyYWdDbGVhbnVwKCkge1xuICAgICAgICB0aGlzLm9mZignbW91c2Vkb3duLmtvbnZhJyk7XG4gICAgICAgIHRoaXMub2ZmKCd0b3VjaHN0YXJ0LmtvbnZhJyk7XG4gICAgfVxuICAgIGlzQ2xpZW50UmVjdE9uU2NyZWVuKG1hcmdpbiA9IHsgeDogMCwgeTogMCB9KSB7XG4gICAgICAgIGNvbnN0IHN0YWdlID0gdGhpcy5nZXRTdGFnZSgpO1xuICAgICAgICBpZiAoIXN0YWdlKSB7XG4gICAgICAgICAgICByZXR1cm4gZmFsc2U7XG4gICAgICAgIH1cbiAgICAgICAgY29uc3Qgc2NyZWVuUmVjdCA9IHtcbiAgICAgICAgICAgIHg6IC1tYXJnaW4ueCxcbiAgICAgICAgICAgIHk6IC1tYXJnaW4ueSxcbiAgICAgICAgICAgIHdpZHRoOiBzdGFnZS53aWR0aCgpICsgMiAqIG1hcmdpbi54LFxuICAgICAgICAgICAgaGVpZ2h0OiBzdGFnZS5oZWlnaHQoKSArIDIgKiBtYXJnaW4ueSxcbiAgICAgICAgfTtcbiAgICAgICAgcmV0dXJuIFV0aWwuaGF2ZUludGVyc2VjdGlvbihzY3JlZW5SZWN0LCB0aGlzLmdldENsaWVudFJlY3QoKSk7XG4gICAgfVxuICAgIHN0YXRpYyBjcmVhdGUoZGF0YSwgY29udGFpbmVyKSB7XG4gICAgICAgIGlmIChVdGlsLl9pc1N0cmluZyhkYXRhKSkge1xuICAgICAgICAgICAgZGF0YSA9IEpTT04ucGFyc2UoZGF0YSk7XG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuIHRoaXMuX2NyZWF0ZU5vZGUoZGF0YSwgY29udGFpbmVyKTtcbiAgICB9XG4gICAgc3RhdGljIF9jcmVhdGVOb2RlKG9iaiwgY29udGFpbmVyKSB7XG4gICAgICAgIHZhciBjbGFzc05hbWUgPSBOb2RlLnByb3RvdHlwZS5nZXRDbGFzc05hbWUuY2FsbChvYmopLCBjaGlsZHJlbiA9IG9iai5jaGlsZHJlbiwgbm8sIGxlbiwgbjtcbiAgICAgICAgaWYgKGNvbnRhaW5lcikge1xuICAgICAgICAgICAgb2JqLmF0dHJzLmNvbnRhaW5lciA9IGNvbnRhaW5lcjtcbiAgICAgICAgfVxuICAgICAgICBpZiAoIUtvbnZhW2NsYXNzTmFtZV0pIHtcbiAgICAgICAgICAgIFV0aWwud2FybignQ2FuIG5vdCBmaW5kIGEgbm9kZSB3aXRoIGNsYXNzIG5hbWUgXCInICtcbiAgICAgICAgICAgICAgICBjbGFzc05hbWUgK1xuICAgICAgICAgICAgICAgICdcIi4gRmFsbGJhY2sgdG8gXCJTaGFwZVwiLicpO1xuICAgICAgICAgICAgY2xhc3NOYW1lID0gJ1NoYXBlJztcbiAgICAgICAgfVxuICAgICAgICBjb25zdCBDbGFzcyA9IEtvbnZhW2NsYXNzTmFtZV07XG4gICAgICAgIG5vID0gbmV3IENsYXNzKG9iai5hdHRycyk7XG4gICAgICAgIGlmIChjaGlsZHJlbikge1xuICAgICAgICAgICAgbGVuID0gY2hpbGRyZW4ubGVuZ3RoO1xuICAgICAgICAgICAgZm9yIChuID0gMDsgbiA8IGxlbjsgbisrKSB7XG4gICAgICAgICAgICAgICAgbm8uYWRkKE5vZGUuX2NyZWF0ZU5vZGUoY2hpbGRyZW5bbl0pKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgICByZXR1cm4gbm87XG4gICAgfVxufVxuTm9kZS5wcm90b3R5cGUubm9kZVR5cGUgPSAnTm9kZSc7XG5Ob2RlLnByb3RvdHlwZS5fYXR0cnNBZmZlY3RpbmdTaXplID0gW107XG5Ob2RlLnByb3RvdHlwZS5ldmVudExpc3RlbmVycyA9IHt9O1xuTm9kZS5wcm90b3R5cGUub24uY2FsbChOb2RlLnByb3RvdHlwZSwgVFJBTlNGT1JNX0NIQU5HRV9TVFIsIGZ1bmN0aW9uICgpIHtcbiAgICBpZiAodGhpcy5fYmF0Y2hpbmdUcmFuc2Zvcm1DaGFuZ2UpIHtcbiAgICAgICAgdGhpcy5fbmVlZENsZWFyVHJhbnNmb3JtQ2FjaGUgPSB0cnVlO1xuICAgICAgICByZXR1cm47XG4gICAgfVxuICAgIHRoaXMuX2NsZWFyQ2FjaGUoVFJBTlNGT1JNKTtcbiAgICB0aGlzLl9jbGVhclNlbGZBbmREZXNjZW5kYW50Q2FjaGUoQUJTT0xVVEVfVFJBTlNGT1JNKTtcbn0pO1xuTm9kZS5wcm90b3R5cGUub24uY2FsbChOb2RlLnByb3RvdHlwZSwgJ3Zpc2libGVDaGFuZ2Uua29udmEnLCBmdW5jdGlvbiAoKSB7XG4gICAgdGhpcy5fY2xlYXJTZWxmQW5kRGVzY2VuZGFudENhY2hlKFZJU0lCTEUpO1xufSk7XG5Ob2RlLnByb3RvdHlwZS5vbi5jYWxsKE5vZGUucHJvdG90eXBlLCAnbGlzdGVuaW5nQ2hhbmdlLmtvbnZhJywgZnVuY3Rpb24gKCkge1xuICAgIHRoaXMuX2NsZWFyU2VsZkFuZERlc2NlbmRhbnRDYWNoZShMSVNURU5JTkcpO1xufSk7XG5Ob2RlLnByb3RvdHlwZS5vbi5jYWxsKE5vZGUucHJvdG90eXBlLCAnb3BhY2l0eUNoYW5nZS5rb252YScsIGZ1bmN0aW9uICgpIHtcbiAgICB0aGlzLl9jbGVhclNlbGZBbmREZXNjZW5kYW50Q2FjaGUoQUJTT0xVVEVfT1BBQ0lUWSk7XG59KTtcbmNvbnN0IGFkZEdldHRlclNldHRlciA9IEZhY3RvcnkuYWRkR2V0dGVyU2V0dGVyO1xuYWRkR2V0dGVyU2V0dGVyKE5vZGUsICd6SW5kZXgnKTtcbmFkZEdldHRlclNldHRlcihOb2RlLCAnYWJzb2x1dGVQb3NpdGlvbicpO1xuYWRkR2V0dGVyU2V0dGVyKE5vZGUsICdwb3NpdGlvbicpO1xuYWRkR2V0dGVyU2V0dGVyKE5vZGUsICd4JywgMCwgZ2V0TnVtYmVyVmFsaWRhdG9yKCkpO1xuYWRkR2V0dGVyU2V0dGVyKE5vZGUsICd5JywgMCwgZ2V0TnVtYmVyVmFsaWRhdG9yKCkpO1xuYWRkR2V0dGVyU2V0dGVyKE5vZGUsICdnbG9iYWxDb21wb3NpdGVPcGVyYXRpb24nLCAnc291cmNlLW92ZXInLCBnZXRTdHJpbmdWYWxpZGF0b3IoKSk7XG5hZGRHZXR0ZXJTZXR0ZXIoTm9kZSwgJ29wYWNpdHknLCAxLCBnZXROdW1iZXJWYWxpZGF0b3IoKSk7XG5hZGRHZXR0ZXJTZXR0ZXIoTm9kZSwgJ25hbWUnLCAnJywgZ2V0U3RyaW5nVmFsaWRhdG9yKCkpO1xuYWRkR2V0dGVyU2V0dGVyKE5vZGUsICdpZCcsICcnLCBnZXRTdHJpbmdWYWxpZGF0b3IoKSk7XG5hZGRHZXR0ZXJTZXR0ZXIoTm9kZSwgJ3JvdGF0aW9uJywgMCwgZ2V0TnVtYmVyVmFsaWRhdG9yKCkpO1xuRmFjdG9yeS5hZGRDb21wb25lbnRzR2V0dGVyU2V0dGVyKE5vZGUsICdzY2FsZScsIFsneCcsICd5J10pO1xuYWRkR2V0dGVyU2V0dGVyKE5vZGUsICdzY2FsZVgnLCAxLCBnZXROdW1iZXJWYWxpZGF0b3IoKSk7XG5hZGRHZXR0ZXJTZXR0ZXIoTm9kZSwgJ3NjYWxlWScsIDEsIGdldE51bWJlclZhbGlkYXRvcigpKTtcbkZhY3RvcnkuYWRkQ29tcG9uZW50c0dldHRlclNldHRlcihOb2RlLCAnc2tldycsIFsneCcsICd5J10pO1xuYWRkR2V0dGVyU2V0dGVyKE5vZGUsICdza2V3WCcsIDAsIGdldE51bWJlclZhbGlkYXRvcigpKTtcbmFkZEdldHRlclNldHRlcihOb2RlLCAnc2tld1knLCAwLCBnZXROdW1iZXJWYWxpZGF0b3IoKSk7XG5GYWN0b3J5LmFkZENvbXBvbmVudHNHZXR0ZXJTZXR0ZXIoTm9kZSwgJ29mZnNldCcsIFsneCcsICd5J10pO1xuYWRkR2V0dGVyU2V0dGVyKE5vZGUsICdvZmZzZXRYJywgMCwgZ2V0TnVtYmVyVmFsaWRhdG9yKCkpO1xuYWRkR2V0dGVyU2V0dGVyKE5vZGUsICdvZmZzZXRZJywgMCwgZ2V0TnVtYmVyVmFsaWRhdG9yKCkpO1xuYWRkR2V0dGVyU2V0dGVyKE5vZGUsICdkcmFnRGlzdGFuY2UnLCBudWxsLCBnZXROdW1iZXJWYWxpZGF0b3IoKSk7XG5hZGRHZXR0ZXJTZXR0ZXIoTm9kZSwgJ3dpZHRoJywgMCwgZ2V0TnVtYmVyVmFsaWRhdG9yKCkpO1xuYWRkR2V0dGVyU2V0dGVyKE5vZGUsICdoZWlnaHQnLCAwLCBnZXROdW1iZXJWYWxpZGF0b3IoKSk7XG5hZGRHZXR0ZXJTZXR0ZXIoTm9kZSwgJ2xpc3RlbmluZycsIHRydWUsIGdldEJvb2xlYW5WYWxpZGF0b3IoKSk7XG5hZGRHZXR0ZXJTZXR0ZXIoTm9kZSwgJ3ByZXZlbnREZWZhdWx0JywgdHJ1ZSwgZ2V0Qm9vbGVhblZhbGlkYXRvcigpKTtcbmFkZEdldHRlclNldHRlcihOb2RlLCAnZmlsdGVycycsIG51bGwsIGZ1bmN0aW9uICh2YWwpIHtcbiAgICB0aGlzLl9maWx0ZXJVcFRvRGF0ZSA9IGZhbHNlO1xuICAgIHJldHVybiB2YWw7XG59KTtcbmFkZEdldHRlclNldHRlcihOb2RlLCAndmlzaWJsZScsIHRydWUsIGdldEJvb2xlYW5WYWxpZGF0b3IoKSk7XG5hZGRHZXR0ZXJTZXR0ZXIoTm9kZSwgJ3RyYW5zZm9ybXNFbmFibGVkJywgJ2FsbCcsIGdldFN0cmluZ1ZhbGlkYXRvcigpKTtcbmFkZEdldHRlclNldHRlcihOb2RlLCAnc2l6ZScpO1xuYWRkR2V0dGVyU2V0dGVyKE5vZGUsICdkcmFnQm91bmRGdW5jJyk7XG5hZGRHZXR0ZXJTZXR0ZXIoTm9kZSwgJ2RyYWdnYWJsZScsIGZhbHNlLCBnZXRCb29sZWFuVmFsaWRhdG9yKCkpO1xuRmFjdG9yeS5iYWNrQ29tcGF0KE5vZGUsIHtcbiAgICByb3RhdGVEZWc6ICdyb3RhdGUnLFxuICAgIHNldFJvdGF0aW9uRGVnOiAnc2V0Um90YXRpb24nLFxuICAgIGdldFJvdGF0aW9uRGVnOiAnZ2V0Um90YXRpb24nLFxufSk7XG4iLCJpbXBvcnQgeyBLb252YSB9IGZyb20gJy4vR2xvYmFsLmpzJztcbmNvbnN0IENhcHR1cmVzID0gbmV3IE1hcCgpO1xuY29uc3QgU1VQUE9SVF9QT0lOVEVSX0VWRU5UUyA9IEtvbnZhLl9nbG9iYWxbJ1BvaW50ZXJFdmVudCddICE9PSB1bmRlZmluZWQ7XG5leHBvcnQgZnVuY3Rpb24gZ2V0Q2FwdHVyZWRTaGFwZShwb2ludGVySWQpIHtcbiAgICByZXR1cm4gQ2FwdHVyZXMuZ2V0KHBvaW50ZXJJZCk7XG59XG5leHBvcnQgZnVuY3Rpb24gY3JlYXRlRXZlbnQoZXZ0KSB7XG4gICAgcmV0dXJuIHtcbiAgICAgICAgZXZ0LFxuICAgICAgICBwb2ludGVySWQ6IGV2dC5wb2ludGVySWQsXG4gICAgfTtcbn1cbmV4cG9ydCBmdW5jdGlvbiBoYXNQb2ludGVyQ2FwdHVyZShwb2ludGVySWQsIHNoYXBlKSB7XG4gICAgcmV0dXJuIENhcHR1cmVzLmdldChwb2ludGVySWQpID09PSBzaGFwZTtcbn1cbmV4cG9ydCBmdW5jdGlvbiBzZXRQb2ludGVyQ2FwdHVyZShwb2ludGVySWQsIHNoYXBlKSB7XG4gICAgcmVsZWFzZUNhcHR1cmUocG9pbnRlcklkKTtcbiAgICBjb25zdCBzdGFnZSA9IHNoYXBlLmdldFN0YWdlKCk7XG4gICAgaWYgKCFzdGFnZSlcbiAgICAgICAgcmV0dXJuO1xuICAgIENhcHR1cmVzLnNldChwb2ludGVySWQsIHNoYXBlKTtcbiAgICBpZiAoU1VQUE9SVF9QT0lOVEVSX0VWRU5UUykge1xuICAgICAgICBzaGFwZS5fZmlyZSgnZ290cG9pbnRlcmNhcHR1cmUnLCBjcmVhdGVFdmVudChuZXcgUG9pbnRlckV2ZW50KCdnb3Rwb2ludGVyY2FwdHVyZScpKSk7XG4gICAgfVxufVxuZXhwb3J0IGZ1bmN0aW9uIHJlbGVhc2VDYXB0dXJlKHBvaW50ZXJJZCwgdGFyZ2V0KSB7XG4gICAgY29uc3Qgc2hhcGUgPSBDYXB0dXJlcy5nZXQocG9pbnRlcklkKTtcbiAgICBpZiAoIXNoYXBlKVxuICAgICAgICByZXR1cm47XG4gICAgY29uc3Qgc3RhZ2UgPSBzaGFwZS5nZXRTdGFnZSgpO1xuICAgIGlmIChzdGFnZSAmJiBzdGFnZS5jb250ZW50KSB7XG4gICAgfVxuICAgIENhcHR1cmVzLmRlbGV0ZShwb2ludGVySWQpO1xuICAgIGlmIChTVVBQT1JUX1BPSU5URVJfRVZFTlRTKSB7XG4gICAgICAgIHNoYXBlLl9maXJlKCdsb3N0cG9pbnRlcmNhcHR1cmUnLCBjcmVhdGVFdmVudChuZXcgUG9pbnRlckV2ZW50KCdsb3N0cG9pbnRlcmNhcHR1cmUnKSkpO1xuICAgIH1cbn1cbiIsImltcG9ydCB7IEtvbnZhIH0gZnJvbSAnLi9HbG9iYWwuanMnO1xuaW1wb3J0IHsgVHJhbnNmb3JtLCBVdGlsIH0gZnJvbSAnLi9VdGlsLmpzJztcbmltcG9ydCB7IEZhY3RvcnkgfSBmcm9tICcuL0ZhY3RvcnkuanMnO1xuaW1wb3J0IHsgTm9kZSB9IGZyb20gJy4vTm9kZS5qcyc7XG5pbXBvcnQgeyBnZXROdW1iZXJWYWxpZGF0b3IsIGdldE51bWJlck9yQXV0b1ZhbGlkYXRvciwgZ2V0U3RyaW5nVmFsaWRhdG9yLCBnZXRCb29sZWFuVmFsaWRhdG9yLCBnZXRTdHJpbmdPckdyYWRpZW50VmFsaWRhdG9yLCB9IGZyb20gJy4vVmFsaWRhdG9ycy5qcyc7XG5pbXBvcnQgeyBfcmVnaXN0ZXJOb2RlIH0gZnJvbSAnLi9HbG9iYWwuanMnO1xuaW1wb3J0ICogYXMgUG9pbnRlckV2ZW50cyBmcm9tICcuL1BvaW50ZXJFdmVudHMuanMnO1xudmFyIEhBU19TSEFET1cgPSAnaGFzU2hhZG93JztcbnZhciBTSEFET1dfUkdCQSA9ICdzaGFkb3dSR0JBJztcbnZhciBwYXR0ZXJuSW1hZ2UgPSAncGF0dGVybkltYWdlJztcbnZhciBsaW5lYXJHcmFkaWVudCA9ICdsaW5lYXJHcmFkaWVudCc7XG52YXIgcmFkaWFsR3JhZGllbnQgPSAncmFkaWFsR3JhZGllbnQnO1xubGV0IGR1bW15Q29udGV4dDtcbmZ1bmN0aW9uIGdldER1bW15Q29udGV4dCgpIHtcbiAgICBpZiAoZHVtbXlDb250ZXh0KSB7XG4gICAgICAgIHJldHVybiBkdW1teUNvbnRleHQ7XG4gICAgfVxuICAgIGR1bW15Q29udGV4dCA9IFV0aWwuY3JlYXRlQ2FudmFzRWxlbWVudCgpLmdldENvbnRleHQoJzJkJyk7XG4gICAgcmV0dXJuIGR1bW15Q29udGV4dDtcbn1cbmV4cG9ydCBjb25zdCBzaGFwZXMgPSB7fTtcbmZ1bmN0aW9uIF9maWxsRnVuYyhjb250ZXh0KSB7XG4gICAgY29udGV4dC5maWxsKCk7XG59XG5mdW5jdGlvbiBfc3Ryb2tlRnVuYyhjb250ZXh0KSB7XG4gICAgY29udGV4dC5zdHJva2UoKTtcbn1cbmZ1bmN0aW9uIF9maWxsRnVuY0hpdChjb250ZXh0KSB7XG4gICAgY29udGV4dC5maWxsKCk7XG59XG5mdW5jdGlvbiBfc3Ryb2tlRnVuY0hpdChjb250ZXh0KSB7XG4gICAgY29udGV4dC5zdHJva2UoKTtcbn1cbmZ1bmN0aW9uIF9jbGVhckhhc1NoYWRvd0NhY2hlKCkge1xuICAgIHRoaXMuX2NsZWFyQ2FjaGUoSEFTX1NIQURPVyk7XG59XG5mdW5jdGlvbiBfY2xlYXJHZXRTaGFkb3dSR0JBQ2FjaGUoKSB7XG4gICAgdGhpcy5fY2xlYXJDYWNoZShTSEFET1dfUkdCQSk7XG59XG5mdW5jdGlvbiBfY2xlYXJGaWxsUGF0dGVybkNhY2hlKCkge1xuICAgIHRoaXMuX2NsZWFyQ2FjaGUocGF0dGVybkltYWdlKTtcbn1cbmZ1bmN0aW9uIF9jbGVhckxpbmVhckdyYWRpZW50Q2FjaGUoKSB7XG4gICAgdGhpcy5fY2xlYXJDYWNoZShsaW5lYXJHcmFkaWVudCk7XG59XG5mdW5jdGlvbiBfY2xlYXJSYWRpYWxHcmFkaWVudENhY2hlKCkge1xuICAgIHRoaXMuX2NsZWFyQ2FjaGUocmFkaWFsR3JhZGllbnQpO1xufVxuZXhwb3J0IGNsYXNzIFNoYXBlIGV4dGVuZHMgTm9kZSB7XG4gICAgY29uc3RydWN0b3IoY29uZmlnKSB7XG4gICAgICAgIHN1cGVyKGNvbmZpZyk7XG4gICAgICAgIGxldCBrZXk7XG4gICAgICAgIHdoaWxlICh0cnVlKSB7XG4gICAgICAgICAgICBrZXkgPSBVdGlsLmdldFJhbmRvbUNvbG9yKCk7XG4gICAgICAgICAgICBpZiAoa2V5ICYmICEoa2V5IGluIHNoYXBlcykpIHtcbiAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgICB0aGlzLmNvbG9yS2V5ID0ga2V5O1xuICAgICAgICBzaGFwZXNba2V5XSA9IHRoaXM7XG4gICAgfVxuICAgIGdldENvbnRleHQoKSB7XG4gICAgICAgIFV0aWwud2Fybignc2hhcGUuZ2V0Q29udGV4dCgpIG1ldGhvZCBpcyBkZXByZWNhdGVkLiBQbGVhc2UgZG8gbm90IHVzZSBpdC4nKTtcbiAgICAgICAgcmV0dXJuIHRoaXMuZ2V0TGF5ZXIoKS5nZXRDb250ZXh0KCk7XG4gICAgfVxuICAgIGdldENhbnZhcygpIHtcbiAgICAgICAgVXRpbC53YXJuKCdzaGFwZS5nZXRDYW52YXMoKSBtZXRob2QgaXMgZGVwcmVjYXRlZC4gUGxlYXNlIGRvIG5vdCB1c2UgaXQuJyk7XG4gICAgICAgIHJldHVybiB0aGlzLmdldExheWVyKCkuZ2V0Q2FudmFzKCk7XG4gICAgfVxuICAgIGdldFNjZW5lRnVuYygpIHtcbiAgICAgICAgcmV0dXJuIHRoaXMuYXR0cnMuc2NlbmVGdW5jIHx8IHRoaXNbJ19zY2VuZUZ1bmMnXTtcbiAgICB9XG4gICAgZ2V0SGl0RnVuYygpIHtcbiAgICAgICAgcmV0dXJuIHRoaXMuYXR0cnMuaGl0RnVuYyB8fCB0aGlzWydfaGl0RnVuYyddO1xuICAgIH1cbiAgICBoYXNTaGFkb3coKSB7XG4gICAgICAgIHJldHVybiB0aGlzLl9nZXRDYWNoZShIQVNfU0hBRE9XLCB0aGlzLl9oYXNTaGFkb3cpO1xuICAgIH1cbiAgICBfaGFzU2hhZG93KCkge1xuICAgICAgICByZXR1cm4gKHRoaXMuc2hhZG93RW5hYmxlZCgpICYmXG4gICAgICAgICAgICB0aGlzLnNoYWRvd09wYWNpdHkoKSAhPT0gMCAmJlxuICAgICAgICAgICAgISEodGhpcy5zaGFkb3dDb2xvcigpIHx8XG4gICAgICAgICAgICAgICAgdGhpcy5zaGFkb3dCbHVyKCkgfHxcbiAgICAgICAgICAgICAgICB0aGlzLnNoYWRvd09mZnNldFgoKSB8fFxuICAgICAgICAgICAgICAgIHRoaXMuc2hhZG93T2Zmc2V0WSgpKSk7XG4gICAgfVxuICAgIF9nZXRGaWxsUGF0dGVybigpIHtcbiAgICAgICAgcmV0dXJuIHRoaXMuX2dldENhY2hlKHBhdHRlcm5JbWFnZSwgdGhpcy5fX2dldEZpbGxQYXR0ZXJuKTtcbiAgICB9XG4gICAgX19nZXRGaWxsUGF0dGVybigpIHtcbiAgICAgICAgaWYgKHRoaXMuZmlsbFBhdHRlcm5JbWFnZSgpKSB7XG4gICAgICAgICAgICB2YXIgY3R4ID0gZ2V0RHVtbXlDb250ZXh0KCk7XG4gICAgICAgICAgICBjb25zdCBwYXR0ZXJuID0gY3R4LmNyZWF0ZVBhdHRlcm4odGhpcy5maWxsUGF0dGVybkltYWdlKCksIHRoaXMuZmlsbFBhdHRlcm5SZXBlYXQoKSB8fCAncmVwZWF0Jyk7XG4gICAgICAgICAgICBpZiAocGF0dGVybiAmJiBwYXR0ZXJuLnNldFRyYW5zZm9ybSkge1xuICAgICAgICAgICAgICAgIGNvbnN0IHRyID0gbmV3IFRyYW5zZm9ybSgpO1xuICAgICAgICAgICAgICAgIHRyLnRyYW5zbGF0ZSh0aGlzLmZpbGxQYXR0ZXJuWCgpLCB0aGlzLmZpbGxQYXR0ZXJuWSgpKTtcbiAgICAgICAgICAgICAgICB0ci5yb3RhdGUoS29udmEuZ2V0QW5nbGUodGhpcy5maWxsUGF0dGVyblJvdGF0aW9uKCkpKTtcbiAgICAgICAgICAgICAgICB0ci5zY2FsZSh0aGlzLmZpbGxQYXR0ZXJuU2NhbGVYKCksIHRoaXMuZmlsbFBhdHRlcm5TY2FsZVkoKSk7XG4gICAgICAgICAgICAgICAgdHIudHJhbnNsYXRlKC0xICogdGhpcy5maWxsUGF0dGVybk9mZnNldFgoKSwgLTEgKiB0aGlzLmZpbGxQYXR0ZXJuT2Zmc2V0WSgpKTtcbiAgICAgICAgICAgICAgICBjb25zdCBtID0gdHIuZ2V0TWF0cml4KCk7XG4gICAgICAgICAgICAgICAgY29uc3QgbWF0cml4ID0gdHlwZW9mIERPTU1hdHJpeCA9PT0gJ3VuZGVmaW5lZCdcbiAgICAgICAgICAgICAgICAgICAgPyB7XG4gICAgICAgICAgICAgICAgICAgICAgICBhOiBtWzBdLFxuICAgICAgICAgICAgICAgICAgICAgICAgYjogbVsxXSxcbiAgICAgICAgICAgICAgICAgICAgICAgIGM6IG1bMl0sXG4gICAgICAgICAgICAgICAgICAgICAgICBkOiBtWzNdLFxuICAgICAgICAgICAgICAgICAgICAgICAgZTogbVs0XSxcbiAgICAgICAgICAgICAgICAgICAgICAgIGY6IG1bNV0sXG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgOiBuZXcgRE9NTWF0cml4KG0pO1xuICAgICAgICAgICAgICAgIHBhdHRlcm4uc2V0VHJhbnNmb3JtKG1hdHJpeCk7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICByZXR1cm4gcGF0dGVybjtcbiAgICAgICAgfVxuICAgIH1cbiAgICBfZ2V0TGluZWFyR3JhZGllbnQoKSB7XG4gICAgICAgIHJldHVybiB0aGlzLl9nZXRDYWNoZShsaW5lYXJHcmFkaWVudCwgdGhpcy5fX2dldExpbmVhckdyYWRpZW50KTtcbiAgICB9XG4gICAgX19nZXRMaW5lYXJHcmFkaWVudCgpIHtcbiAgICAgICAgdmFyIGNvbG9yU3RvcHMgPSB0aGlzLmZpbGxMaW5lYXJHcmFkaWVudENvbG9yU3RvcHMoKTtcbiAgICAgICAgaWYgKGNvbG9yU3RvcHMpIHtcbiAgICAgICAgICAgIHZhciBjdHggPSBnZXREdW1teUNvbnRleHQoKTtcbiAgICAgICAgICAgIHZhciBzdGFydCA9IHRoaXMuZmlsbExpbmVhckdyYWRpZW50U3RhcnRQb2ludCgpO1xuICAgICAgICAgICAgdmFyIGVuZCA9IHRoaXMuZmlsbExpbmVhckdyYWRpZW50RW5kUG9pbnQoKTtcbiAgICAgICAgICAgIHZhciBncmQgPSBjdHguY3JlYXRlTGluZWFyR3JhZGllbnQoc3RhcnQueCwgc3RhcnQueSwgZW5kLngsIGVuZC55KTtcbiAgICAgICAgICAgIGZvciAodmFyIG4gPSAwOyBuIDwgY29sb3JTdG9wcy5sZW5ndGg7IG4gKz0gMikge1xuICAgICAgICAgICAgICAgIGdyZC5hZGRDb2xvclN0b3AoY29sb3JTdG9wc1tuXSwgY29sb3JTdG9wc1tuICsgMV0pO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgcmV0dXJuIGdyZDtcbiAgICAgICAgfVxuICAgIH1cbiAgICBfZ2V0UmFkaWFsR3JhZGllbnQoKSB7XG4gICAgICAgIHJldHVybiB0aGlzLl9nZXRDYWNoZShyYWRpYWxHcmFkaWVudCwgdGhpcy5fX2dldFJhZGlhbEdyYWRpZW50KTtcbiAgICB9XG4gICAgX19nZXRSYWRpYWxHcmFkaWVudCgpIHtcbiAgICAgICAgdmFyIGNvbG9yU3RvcHMgPSB0aGlzLmZpbGxSYWRpYWxHcmFkaWVudENvbG9yU3RvcHMoKTtcbiAgICAgICAgaWYgKGNvbG9yU3RvcHMpIHtcbiAgICAgICAgICAgIHZhciBjdHggPSBnZXREdW1teUNvbnRleHQoKTtcbiAgICAgICAgICAgIHZhciBzdGFydCA9IHRoaXMuZmlsbFJhZGlhbEdyYWRpZW50U3RhcnRQb2ludCgpO1xuICAgICAgICAgICAgdmFyIGVuZCA9IHRoaXMuZmlsbFJhZGlhbEdyYWRpZW50RW5kUG9pbnQoKTtcbiAgICAgICAgICAgIHZhciBncmQgPSBjdHguY3JlYXRlUmFkaWFsR3JhZGllbnQoc3RhcnQueCwgc3RhcnQueSwgdGhpcy5maWxsUmFkaWFsR3JhZGllbnRTdGFydFJhZGl1cygpLCBlbmQueCwgZW5kLnksIHRoaXMuZmlsbFJhZGlhbEdyYWRpZW50RW5kUmFkaXVzKCkpO1xuICAgICAgICAgICAgZm9yICh2YXIgbiA9IDA7IG4gPCBjb2xvclN0b3BzLmxlbmd0aDsgbiArPSAyKSB7XG4gICAgICAgICAgICAgICAgZ3JkLmFkZENvbG9yU3RvcChjb2xvclN0b3BzW25dLCBjb2xvclN0b3BzW24gKyAxXSk7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICByZXR1cm4gZ3JkO1xuICAgICAgICB9XG4gICAgfVxuICAgIGdldFNoYWRvd1JHQkEoKSB7XG4gICAgICAgIHJldHVybiB0aGlzLl9nZXRDYWNoZShTSEFET1dfUkdCQSwgdGhpcy5fZ2V0U2hhZG93UkdCQSk7XG4gICAgfVxuICAgIF9nZXRTaGFkb3dSR0JBKCkge1xuICAgICAgICBpZiAoIXRoaXMuaGFzU2hhZG93KCkpIHtcbiAgICAgICAgICAgIHJldHVybjtcbiAgICAgICAgfVxuICAgICAgICB2YXIgcmdiYSA9IFV0aWwuY29sb3JUb1JHQkEodGhpcy5zaGFkb3dDb2xvcigpKTtcbiAgICAgICAgaWYgKHJnYmEpIHtcbiAgICAgICAgICAgIHJldHVybiAoJ3JnYmEoJyArXG4gICAgICAgICAgICAgICAgcmdiYS5yICtcbiAgICAgICAgICAgICAgICAnLCcgK1xuICAgICAgICAgICAgICAgIHJnYmEuZyArXG4gICAgICAgICAgICAgICAgJywnICtcbiAgICAgICAgICAgICAgICByZ2JhLmIgK1xuICAgICAgICAgICAgICAgICcsJyArXG4gICAgICAgICAgICAgICAgcmdiYS5hICogKHRoaXMuc2hhZG93T3BhY2l0eSgpIHx8IDEpICtcbiAgICAgICAgICAgICAgICAnKScpO1xuICAgICAgICB9XG4gICAgfVxuICAgIGhhc0ZpbGwoKSB7XG4gICAgICAgIHJldHVybiB0aGlzLl9jYWxjdWxhdGUoJ2hhc0ZpbGwnLCBbXG4gICAgICAgICAgICAnZmlsbEVuYWJsZWQnLFxuICAgICAgICAgICAgJ2ZpbGwnLFxuICAgICAgICAgICAgJ2ZpbGxQYXR0ZXJuSW1hZ2UnLFxuICAgICAgICAgICAgJ2ZpbGxMaW5lYXJHcmFkaWVudENvbG9yU3RvcHMnLFxuICAgICAgICAgICAgJ2ZpbGxSYWRpYWxHcmFkaWVudENvbG9yU3RvcHMnLFxuICAgICAgICBdLCAoKSA9PiB7XG4gICAgICAgICAgICByZXR1cm4gKHRoaXMuZmlsbEVuYWJsZWQoKSAmJlxuICAgICAgICAgICAgICAgICEhKHRoaXMuZmlsbCgpIHx8XG4gICAgICAgICAgICAgICAgICAgIHRoaXMuZmlsbFBhdHRlcm5JbWFnZSgpIHx8XG4gICAgICAgICAgICAgICAgICAgIHRoaXMuZmlsbExpbmVhckdyYWRpZW50Q29sb3JTdG9wcygpIHx8XG4gICAgICAgICAgICAgICAgICAgIHRoaXMuZmlsbFJhZGlhbEdyYWRpZW50Q29sb3JTdG9wcygpKSk7XG4gICAgICAgIH0pO1xuICAgIH1cbiAgICBoYXNTdHJva2UoKSB7XG4gICAgICAgIHJldHVybiB0aGlzLl9jYWxjdWxhdGUoJ2hhc1N0cm9rZScsIFtcbiAgICAgICAgICAgICdzdHJva2VFbmFibGVkJyxcbiAgICAgICAgICAgICdzdHJva2VXaWR0aCcsXG4gICAgICAgICAgICAnc3Ryb2tlJyxcbiAgICAgICAgICAgICdzdHJva2VMaW5lYXJHcmFkaWVudENvbG9yU3RvcHMnLFxuICAgICAgICBdLCAoKSA9PiB7XG4gICAgICAgICAgICByZXR1cm4gKHRoaXMuc3Ryb2tlRW5hYmxlZCgpICYmXG4gICAgICAgICAgICAgICAgdGhpcy5zdHJva2VXaWR0aCgpICYmXG4gICAgICAgICAgICAgICAgISEodGhpcy5zdHJva2UoKSB8fCB0aGlzLnN0cm9rZUxpbmVhckdyYWRpZW50Q29sb3JTdG9wcygpKSk7XG4gICAgICAgIH0pO1xuICAgIH1cbiAgICBoYXNIaXRTdHJva2UoKSB7XG4gICAgICAgIGNvbnN0IHdpZHRoID0gdGhpcy5oaXRTdHJva2VXaWR0aCgpO1xuICAgICAgICBpZiAod2lkdGggPT09ICdhdXRvJykge1xuICAgICAgICAgICAgcmV0dXJuIHRoaXMuaGFzU3Ryb2tlKCk7XG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuIHRoaXMuc3Ryb2tlRW5hYmxlZCgpICYmICEhd2lkdGg7XG4gICAgfVxuICAgIGludGVyc2VjdHMocG9pbnQpIHtcbiAgICAgICAgdmFyIHN0YWdlID0gdGhpcy5nZXRTdGFnZSgpLCBidWZmZXJIaXRDYW52YXMgPSBzdGFnZS5idWZmZXJIaXRDYW52YXMsIHA7XG4gICAgICAgIGJ1ZmZlckhpdENhbnZhcy5nZXRDb250ZXh0KCkuY2xlYXIoKTtcbiAgICAgICAgdGhpcy5kcmF3SGl0KGJ1ZmZlckhpdENhbnZhcywgbnVsbCwgdHJ1ZSk7XG4gICAgICAgIHAgPSBidWZmZXJIaXRDYW52YXMuY29udGV4dC5nZXRJbWFnZURhdGEoTWF0aC5yb3VuZChwb2ludC54KSwgTWF0aC5yb3VuZChwb2ludC55KSwgMSwgMSkuZGF0YTtcbiAgICAgICAgcmV0dXJuIHBbM10gPiAwO1xuICAgIH1cbiAgICBkZXN0cm95KCkge1xuICAgICAgICBOb2RlLnByb3RvdHlwZS5kZXN0cm95LmNhbGwodGhpcyk7XG4gICAgICAgIGRlbGV0ZSBzaGFwZXNbdGhpcy5jb2xvcktleV07XG4gICAgICAgIGRlbGV0ZSB0aGlzLmNvbG9yS2V5O1xuICAgICAgICByZXR1cm4gdGhpcztcbiAgICB9XG4gICAgX3VzZUJ1ZmZlckNhbnZhcyhmb3JjZUZpbGwpIHtcbiAgICAgICAgdmFyIF9hO1xuICAgICAgICBpZiAoIXRoaXMuZ2V0U3RhZ2UoKSkge1xuICAgICAgICAgICAgcmV0dXJuIGZhbHNlO1xuICAgICAgICB9XG4gICAgICAgIGNvbnN0IHBlcmZlY3REcmF3RW5hYmxlZCA9IChfYSA9IHRoaXMuYXR0cnMucGVyZmVjdERyYXdFbmFibGVkKSAhPT0gbnVsbCAmJiBfYSAhPT0gdm9pZCAwID8gX2EgOiB0cnVlO1xuICAgICAgICBpZiAoIXBlcmZlY3REcmF3RW5hYmxlZCkge1xuICAgICAgICAgICAgcmV0dXJuIGZhbHNlO1xuICAgICAgICB9XG4gICAgICAgIGNvbnN0IGhhc0ZpbGwgPSBmb3JjZUZpbGwgfHwgdGhpcy5oYXNGaWxsKCk7XG4gICAgICAgIGNvbnN0IGhhc1N0cm9rZSA9IHRoaXMuaGFzU3Ryb2tlKCk7XG4gICAgICAgIGNvbnN0IGlzVHJhbnNwYXJlbnQgPSB0aGlzLmdldEFic29sdXRlT3BhY2l0eSgpICE9PSAxO1xuICAgICAgICBpZiAoaGFzRmlsbCAmJiBoYXNTdHJva2UgJiYgaXNUcmFuc3BhcmVudCkge1xuICAgICAgICAgICAgcmV0dXJuIHRydWU7XG4gICAgICAgIH1cbiAgICAgICAgY29uc3QgaGFzU2hhZG93ID0gdGhpcy5oYXNTaGFkb3coKTtcbiAgICAgICAgY29uc3Qgc3Ryb2tlRm9yU2hhZG93ID0gdGhpcy5zaGFkb3dGb3JTdHJva2VFbmFibGVkKCk7XG4gICAgICAgIGlmIChoYXNGaWxsICYmIGhhc1N0cm9rZSAmJiBoYXNTaGFkb3cgJiYgc3Ryb2tlRm9yU2hhZG93KSB7XG4gICAgICAgICAgICByZXR1cm4gdHJ1ZTtcbiAgICAgICAgfVxuICAgICAgICByZXR1cm4gZmFsc2U7XG4gICAgfVxuICAgIHNldFN0cm9rZUhpdEVuYWJsZWQodmFsKSB7XG4gICAgICAgIFV0aWwud2Fybignc3Ryb2tlSGl0RW5hYmxlZCBwcm9wZXJ0eSBpcyBkZXByZWNhdGVkLiBQbGVhc2UgdXNlIGhpdFN0cm9rZVdpZHRoIGluc3RlYWQuJyk7XG4gICAgICAgIGlmICh2YWwpIHtcbiAgICAgICAgICAgIHRoaXMuaGl0U3Ryb2tlV2lkdGgoJ2F1dG8nKTtcbiAgICAgICAgfVxuICAgICAgICBlbHNlIHtcbiAgICAgICAgICAgIHRoaXMuaGl0U3Ryb2tlV2lkdGgoMCk7XG4gICAgICAgIH1cbiAgICB9XG4gICAgZ2V0U3Ryb2tlSGl0RW5hYmxlZCgpIHtcbiAgICAgICAgaWYgKHRoaXMuaGl0U3Ryb2tlV2lkdGgoKSA9PT0gMCkge1xuICAgICAgICAgICAgcmV0dXJuIGZhbHNlO1xuICAgICAgICB9XG4gICAgICAgIGVsc2Uge1xuICAgICAgICAgICAgcmV0dXJuIHRydWU7XG4gICAgICAgIH1cbiAgICB9XG4gICAgZ2V0U2VsZlJlY3QoKSB7XG4gICAgICAgIHZhciBzaXplID0gdGhpcy5zaXplKCk7XG4gICAgICAgIHJldHVybiB7XG4gICAgICAgICAgICB4OiB0aGlzLl9jZW50cm9pZCA/IC1zaXplLndpZHRoIC8gMiA6IDAsXG4gICAgICAgICAgICB5OiB0aGlzLl9jZW50cm9pZCA/IC1zaXplLmhlaWdodCAvIDIgOiAwLFxuICAgICAgICAgICAgd2lkdGg6IHNpemUud2lkdGgsXG4gICAgICAgICAgICBoZWlnaHQ6IHNpemUuaGVpZ2h0LFxuICAgICAgICB9O1xuICAgIH1cbiAgICBnZXRDbGllbnRSZWN0KGNvbmZpZyA9IHt9KSB7XG4gICAgICAgIGNvbnN0IHNraXBUcmFuc2Zvcm0gPSBjb25maWcuc2tpcFRyYW5zZm9ybTtcbiAgICAgICAgY29uc3QgcmVsYXRpdmVUbyA9IGNvbmZpZy5yZWxhdGl2ZVRvO1xuICAgICAgICBjb25zdCBmaWxsUmVjdCA9IHRoaXMuZ2V0U2VsZlJlY3QoKTtcbiAgICAgICAgY29uc3QgYXBwbHlTdHJva2UgPSAhY29uZmlnLnNraXBTdHJva2UgJiYgdGhpcy5oYXNTdHJva2UoKTtcbiAgICAgICAgY29uc3Qgc3Ryb2tlV2lkdGggPSAoYXBwbHlTdHJva2UgJiYgdGhpcy5zdHJva2VXaWR0aCgpKSB8fCAwO1xuICAgICAgICBjb25zdCBmaWxsQW5kU3Ryb2tlV2lkdGggPSBmaWxsUmVjdC53aWR0aCArIHN0cm9rZVdpZHRoO1xuICAgICAgICBjb25zdCBmaWxsQW5kU3Ryb2tlSGVpZ2h0ID0gZmlsbFJlY3QuaGVpZ2h0ICsgc3Ryb2tlV2lkdGg7XG4gICAgICAgIGNvbnN0IGFwcGx5U2hhZG93ID0gIWNvbmZpZy5za2lwU2hhZG93ICYmIHRoaXMuaGFzU2hhZG93KCk7XG4gICAgICAgIGNvbnN0IHNoYWRvd09mZnNldFggPSBhcHBseVNoYWRvdyA/IHRoaXMuc2hhZG93T2Zmc2V0WCgpIDogMDtcbiAgICAgICAgY29uc3Qgc2hhZG93T2Zmc2V0WSA9IGFwcGx5U2hhZG93ID8gdGhpcy5zaGFkb3dPZmZzZXRZKCkgOiAwO1xuICAgICAgICBjb25zdCBwcmVXaWR0aCA9IGZpbGxBbmRTdHJva2VXaWR0aCArIE1hdGguYWJzKHNoYWRvd09mZnNldFgpO1xuICAgICAgICBjb25zdCBwcmVIZWlnaHQgPSBmaWxsQW5kU3Ryb2tlSGVpZ2h0ICsgTWF0aC5hYnMoc2hhZG93T2Zmc2V0WSk7XG4gICAgICAgIGNvbnN0IGJsdXJSYWRpdXMgPSAoYXBwbHlTaGFkb3cgJiYgdGhpcy5zaGFkb3dCbHVyKCkpIHx8IDA7XG4gICAgICAgIGNvbnN0IHdpZHRoID0gcHJlV2lkdGggKyBibHVyUmFkaXVzICogMjtcbiAgICAgICAgY29uc3QgaGVpZ2h0ID0gcHJlSGVpZ2h0ICsgYmx1clJhZGl1cyAqIDI7XG4gICAgICAgIGNvbnN0IHJlY3QgPSB7XG4gICAgICAgICAgICB3aWR0aDogd2lkdGgsXG4gICAgICAgICAgICBoZWlnaHQ6IGhlaWdodCxcbiAgICAgICAgICAgIHg6IC0oc3Ryb2tlV2lkdGggLyAyICsgYmx1clJhZGl1cykgK1xuICAgICAgICAgICAgICAgIE1hdGgubWluKHNoYWRvd09mZnNldFgsIDApICtcbiAgICAgICAgICAgICAgICBmaWxsUmVjdC54LFxuICAgICAgICAgICAgeTogLShzdHJva2VXaWR0aCAvIDIgKyBibHVyUmFkaXVzKSArXG4gICAgICAgICAgICAgICAgTWF0aC5taW4oc2hhZG93T2Zmc2V0WSwgMCkgK1xuICAgICAgICAgICAgICAgIGZpbGxSZWN0LnksXG4gICAgICAgIH07XG4gICAgICAgIGlmICghc2tpcFRyYW5zZm9ybSkge1xuICAgICAgICAgICAgcmV0dXJuIHRoaXMuX3RyYW5zZm9ybWVkUmVjdChyZWN0LCByZWxhdGl2ZVRvKTtcbiAgICAgICAgfVxuICAgICAgICByZXR1cm4gcmVjdDtcbiAgICB9XG4gICAgZHJhd1NjZW5lKGNhbiwgdG9wKSB7XG4gICAgICAgIHZhciBsYXllciA9IHRoaXMuZ2V0TGF5ZXIoKSwgY2FudmFzID0gY2FuIHx8IGxheWVyLmdldENhbnZhcygpLCBjb250ZXh0ID0gY2FudmFzLmdldENvbnRleHQoKSwgY2FjaGVkQ2FudmFzID0gdGhpcy5fZ2V0Q2FudmFzQ2FjaGUoKSwgZHJhd0Z1bmMgPSB0aGlzLmdldFNjZW5lRnVuYygpLCBoYXNTaGFkb3cgPSB0aGlzLmhhc1NoYWRvdygpLCBzdGFnZSwgYnVmZmVyQ2FudmFzLCBidWZmZXJDb250ZXh0O1xuICAgICAgICB2YXIgc2tpcEJ1ZmZlciA9IGNhbnZhcy5pc0NhY2hlO1xuICAgICAgICB2YXIgY2FjaGluZ1NlbGYgPSB0b3AgPT09IHRoaXM7XG4gICAgICAgIGlmICghdGhpcy5pc1Zpc2libGUoKSAmJiAhY2FjaGluZ1NlbGYpIHtcbiAgICAgICAgICAgIHJldHVybiB0aGlzO1xuICAgICAgICB9XG4gICAgICAgIGlmIChjYWNoZWRDYW52YXMpIHtcbiAgICAgICAgICAgIGNvbnRleHQuc2F2ZSgpO1xuICAgICAgICAgICAgdmFyIG0gPSB0aGlzLmdldEFic29sdXRlVHJhbnNmb3JtKHRvcCkuZ2V0TWF0cml4KCk7XG4gICAgICAgICAgICBjb250ZXh0LnRyYW5zZm9ybShtWzBdLCBtWzFdLCBtWzJdLCBtWzNdLCBtWzRdLCBtWzVdKTtcbiAgICAgICAgICAgIHRoaXMuX2RyYXdDYWNoZWRTY2VuZUNhbnZhcyhjb250ZXh0KTtcbiAgICAgICAgICAgIGNvbnRleHQucmVzdG9yZSgpO1xuICAgICAgICAgICAgcmV0dXJuIHRoaXM7XG4gICAgICAgIH1cbiAgICAgICAgaWYgKCFkcmF3RnVuYykge1xuICAgICAgICAgICAgcmV0dXJuIHRoaXM7XG4gICAgICAgIH1cbiAgICAgICAgY29udGV4dC5zYXZlKCk7XG4gICAgICAgIGlmICh0aGlzLl91c2VCdWZmZXJDYW52YXMoKSAmJiAhc2tpcEJ1ZmZlcikge1xuICAgICAgICAgICAgc3RhZ2UgPSB0aGlzLmdldFN0YWdlKCk7XG4gICAgICAgICAgICBidWZmZXJDYW52YXMgPSBzdGFnZS5idWZmZXJDYW52YXM7XG4gICAgICAgICAgICBidWZmZXJDb250ZXh0ID0gYnVmZmVyQ2FudmFzLmdldENvbnRleHQoKTtcbiAgICAgICAgICAgIGJ1ZmZlckNvbnRleHQuY2xlYXIoKTtcbiAgICAgICAgICAgIGJ1ZmZlckNvbnRleHQuc2F2ZSgpO1xuICAgICAgICAgICAgYnVmZmVyQ29udGV4dC5fYXBwbHlMaW5lSm9pbih0aGlzKTtcbiAgICAgICAgICAgIHZhciBvID0gdGhpcy5nZXRBYnNvbHV0ZVRyYW5zZm9ybSh0b3ApLmdldE1hdHJpeCgpO1xuICAgICAgICAgICAgYnVmZmVyQ29udGV4dC50cmFuc2Zvcm0ob1swXSwgb1sxXSwgb1syXSwgb1szXSwgb1s0XSwgb1s1XSk7XG4gICAgICAgICAgICBkcmF3RnVuYy5jYWxsKHRoaXMsIGJ1ZmZlckNvbnRleHQsIHRoaXMpO1xuICAgICAgICAgICAgYnVmZmVyQ29udGV4dC5yZXN0b3JlKCk7XG4gICAgICAgICAgICB2YXIgcmF0aW8gPSBidWZmZXJDYW52YXMucGl4ZWxSYXRpbztcbiAgICAgICAgICAgIGlmIChoYXNTaGFkb3cpIHtcbiAgICAgICAgICAgICAgICBjb250ZXh0Ll9hcHBseVNoYWRvdyh0aGlzKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGNvbnRleHQuX2FwcGx5T3BhY2l0eSh0aGlzKTtcbiAgICAgICAgICAgIGNvbnRleHQuX2FwcGx5R2xvYmFsQ29tcG9zaXRlT3BlcmF0aW9uKHRoaXMpO1xuICAgICAgICAgICAgY29udGV4dC5kcmF3SW1hZ2UoYnVmZmVyQ2FudmFzLl9jYW52YXMsIDAsIDAsIGJ1ZmZlckNhbnZhcy53aWR0aCAvIHJhdGlvLCBidWZmZXJDYW52YXMuaGVpZ2h0IC8gcmF0aW8pO1xuICAgICAgICB9XG4gICAgICAgIGVsc2Uge1xuICAgICAgICAgICAgY29udGV4dC5fYXBwbHlMaW5lSm9pbih0aGlzKTtcbiAgICAgICAgICAgIGlmICghY2FjaGluZ1NlbGYpIHtcbiAgICAgICAgICAgICAgICB2YXIgbyA9IHRoaXMuZ2V0QWJzb2x1dGVUcmFuc2Zvcm0odG9wKS5nZXRNYXRyaXgoKTtcbiAgICAgICAgICAgICAgICBjb250ZXh0LnRyYW5zZm9ybShvWzBdLCBvWzFdLCBvWzJdLCBvWzNdLCBvWzRdLCBvWzVdKTtcbiAgICAgICAgICAgICAgICBjb250ZXh0Ll9hcHBseU9wYWNpdHkodGhpcyk7XG4gICAgICAgICAgICAgICAgY29udGV4dC5fYXBwbHlHbG9iYWxDb21wb3NpdGVPcGVyYXRpb24odGhpcyk7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBpZiAoaGFzU2hhZG93KSB7XG4gICAgICAgICAgICAgICAgY29udGV4dC5fYXBwbHlTaGFkb3codGhpcyk7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBkcmF3RnVuYy5jYWxsKHRoaXMsIGNvbnRleHQsIHRoaXMpO1xuICAgICAgICB9XG4gICAgICAgIGNvbnRleHQucmVzdG9yZSgpO1xuICAgICAgICByZXR1cm4gdGhpcztcbiAgICB9XG4gICAgZHJhd0hpdChjYW4sIHRvcCwgc2tpcERyYWdDaGVjayA9IGZhbHNlKSB7XG4gICAgICAgIGlmICghdGhpcy5zaG91bGREcmF3SGl0KHRvcCwgc2tpcERyYWdDaGVjaykpIHtcbiAgICAgICAgICAgIHJldHVybiB0aGlzO1xuICAgICAgICB9XG4gICAgICAgIHZhciBsYXllciA9IHRoaXMuZ2V0TGF5ZXIoKSwgY2FudmFzID0gY2FuIHx8IGxheWVyLmhpdENhbnZhcywgY29udGV4dCA9IGNhbnZhcyAmJiBjYW52YXMuZ2V0Q29udGV4dCgpLCBkcmF3RnVuYyA9IHRoaXMuaGl0RnVuYygpIHx8IHRoaXMuc2NlbmVGdW5jKCksIGNhY2hlZENhbnZhcyA9IHRoaXMuX2dldENhbnZhc0NhY2hlKCksIGNhY2hlZEhpdENhbnZhcyA9IGNhY2hlZENhbnZhcyAmJiBjYWNoZWRDYW52YXMuaGl0O1xuICAgICAgICBpZiAoIXRoaXMuY29sb3JLZXkpIHtcbiAgICAgICAgICAgIFV0aWwud2FybignTG9va3MgbGlrZSB5b3VyIGNhbnZhcyBoYXMgYSBkZXN0cm95ZWQgc2hhcGUgaW4gaXQuIERvIG5vdCByZXVzZSBzaGFwZSBhZnRlciB5b3UgZGVzdHJveWVkIGl0LiBJZiB5b3Ugd2FudCB0byByZXVzZSBzaGFwZSB5b3Ugc2hvdWxkIGNhbGwgcmVtb3ZlKCkgaW5zdGVhZCBvZiBkZXN0cm95KCknKTtcbiAgICAgICAgfVxuICAgICAgICBpZiAoY2FjaGVkSGl0Q2FudmFzKSB7XG4gICAgICAgICAgICBjb250ZXh0LnNhdmUoKTtcbiAgICAgICAgICAgIHZhciBtID0gdGhpcy5nZXRBYnNvbHV0ZVRyYW5zZm9ybSh0b3ApLmdldE1hdHJpeCgpO1xuICAgICAgICAgICAgY29udGV4dC50cmFuc2Zvcm0obVswXSwgbVsxXSwgbVsyXSwgbVszXSwgbVs0XSwgbVs1XSk7XG4gICAgICAgICAgICB0aGlzLl9kcmF3Q2FjaGVkSGl0Q2FudmFzKGNvbnRleHQpO1xuICAgICAgICAgICAgY29udGV4dC5yZXN0b3JlKCk7XG4gICAgICAgICAgICByZXR1cm4gdGhpcztcbiAgICAgICAgfVxuICAgICAgICBpZiAoIWRyYXdGdW5jKSB7XG4gICAgICAgICAgICByZXR1cm4gdGhpcztcbiAgICAgICAgfVxuICAgICAgICBjb250ZXh0LnNhdmUoKTtcbiAgICAgICAgY29udGV4dC5fYXBwbHlMaW5lSm9pbih0aGlzKTtcbiAgICAgICAgY29uc3Qgc2VsZkNhY2hlID0gdGhpcyA9PT0gdG9wO1xuICAgICAgICBpZiAoIXNlbGZDYWNoZSkge1xuICAgICAgICAgICAgdmFyIG8gPSB0aGlzLmdldEFic29sdXRlVHJhbnNmb3JtKHRvcCkuZ2V0TWF0cml4KCk7XG4gICAgICAgICAgICBjb250ZXh0LnRyYW5zZm9ybShvWzBdLCBvWzFdLCBvWzJdLCBvWzNdLCBvWzRdLCBvWzVdKTtcbiAgICAgICAgfVxuICAgICAgICBkcmF3RnVuYy5jYWxsKHRoaXMsIGNvbnRleHQsIHRoaXMpO1xuICAgICAgICBjb250ZXh0LnJlc3RvcmUoKTtcbiAgICAgICAgcmV0dXJuIHRoaXM7XG4gICAgfVxuICAgIGRyYXdIaXRGcm9tQ2FjaGUoYWxwaGFUaHJlc2hvbGQgPSAwKSB7XG4gICAgICAgIHZhciBjYWNoZWRDYW52YXMgPSB0aGlzLl9nZXRDYW52YXNDYWNoZSgpLCBzY2VuZUNhbnZhcyA9IHRoaXMuX2dldENhY2hlZFNjZW5lQ2FudmFzKCksIGhpdENhbnZhcyA9IGNhY2hlZENhbnZhcy5oaXQsIGhpdENvbnRleHQgPSBoaXRDYW52YXMuZ2V0Q29udGV4dCgpLCBoaXRXaWR0aCA9IGhpdENhbnZhcy5nZXRXaWR0aCgpLCBoaXRIZWlnaHQgPSBoaXRDYW52YXMuZ2V0SGVpZ2h0KCksIGhpdEltYWdlRGF0YSwgaGl0RGF0YSwgbGVuLCByZ2JDb2xvcktleSwgaSwgYWxwaGE7XG4gICAgICAgIGhpdENvbnRleHQuY2xlYXIoKTtcbiAgICAgICAgaGl0Q29udGV4dC5kcmF3SW1hZ2Uoc2NlbmVDYW52YXMuX2NhbnZhcywgMCwgMCwgaGl0V2lkdGgsIGhpdEhlaWdodCk7XG4gICAgICAgIHRyeSB7XG4gICAgICAgICAgICBoaXRJbWFnZURhdGEgPSBoaXRDb250ZXh0LmdldEltYWdlRGF0YSgwLCAwLCBoaXRXaWR0aCwgaGl0SGVpZ2h0KTtcbiAgICAgICAgICAgIGhpdERhdGEgPSBoaXRJbWFnZURhdGEuZGF0YTtcbiAgICAgICAgICAgIGxlbiA9IGhpdERhdGEubGVuZ3RoO1xuICAgICAgICAgICAgcmdiQ29sb3JLZXkgPSBVdGlsLl9oZXhUb1JnYih0aGlzLmNvbG9yS2V5KTtcbiAgICAgICAgICAgIGZvciAoaSA9IDA7IGkgPCBsZW47IGkgKz0gNCkge1xuICAgICAgICAgICAgICAgIGFscGhhID0gaGl0RGF0YVtpICsgM107XG4gICAgICAgICAgICAgICAgaWYgKGFscGhhID4gYWxwaGFUaHJlc2hvbGQpIHtcbiAgICAgICAgICAgICAgICAgICAgaGl0RGF0YVtpXSA9IHJnYkNvbG9yS2V5LnI7XG4gICAgICAgICAgICAgICAgICAgIGhpdERhdGFbaSArIDFdID0gcmdiQ29sb3JLZXkuZztcbiAgICAgICAgICAgICAgICAgICAgaGl0RGF0YVtpICsgMl0gPSByZ2JDb2xvcktleS5iO1xuICAgICAgICAgICAgICAgICAgICBoaXREYXRhW2kgKyAzXSA9IDI1NTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgZWxzZSB7XG4gICAgICAgICAgICAgICAgICAgIGhpdERhdGFbaSArIDNdID0gMDtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBoaXRDb250ZXh0LnB1dEltYWdlRGF0YShoaXRJbWFnZURhdGEsIDAsIDApO1xuICAgICAgICB9XG4gICAgICAgIGNhdGNoIChlKSB7XG4gICAgICAgICAgICBVdGlsLmVycm9yKCdVbmFibGUgdG8gZHJhdyBoaXQgZ3JhcGggZnJvbSBjYWNoZWQgc2NlbmUgY2FudmFzLiAnICsgZS5tZXNzYWdlKTtcbiAgICAgICAgfVxuICAgICAgICByZXR1cm4gdGhpcztcbiAgICB9XG4gICAgaGFzUG9pbnRlckNhcHR1cmUocG9pbnRlcklkKSB7XG4gICAgICAgIHJldHVybiBQb2ludGVyRXZlbnRzLmhhc1BvaW50ZXJDYXB0dXJlKHBvaW50ZXJJZCwgdGhpcyk7XG4gICAgfVxuICAgIHNldFBvaW50ZXJDYXB0dXJlKHBvaW50ZXJJZCkge1xuICAgICAgICBQb2ludGVyRXZlbnRzLnNldFBvaW50ZXJDYXB0dXJlKHBvaW50ZXJJZCwgdGhpcyk7XG4gICAgfVxuICAgIHJlbGVhc2VDYXB0dXJlKHBvaW50ZXJJZCkge1xuICAgICAgICBQb2ludGVyRXZlbnRzLnJlbGVhc2VDYXB0dXJlKHBvaW50ZXJJZCwgdGhpcyk7XG4gICAgfVxufVxuU2hhcGUucHJvdG90eXBlLl9maWxsRnVuYyA9IF9maWxsRnVuYztcblNoYXBlLnByb3RvdHlwZS5fc3Ryb2tlRnVuYyA9IF9zdHJva2VGdW5jO1xuU2hhcGUucHJvdG90eXBlLl9maWxsRnVuY0hpdCA9IF9maWxsRnVuY0hpdDtcblNoYXBlLnByb3RvdHlwZS5fc3Ryb2tlRnVuY0hpdCA9IF9zdHJva2VGdW5jSGl0O1xuU2hhcGUucHJvdG90eXBlLl9jZW50cm9pZCA9IGZhbHNlO1xuU2hhcGUucHJvdG90eXBlLm5vZGVUeXBlID0gJ1NoYXBlJztcbl9yZWdpc3Rlck5vZGUoU2hhcGUpO1xuU2hhcGUucHJvdG90eXBlLmV2ZW50TGlzdGVuZXJzID0ge307XG5TaGFwZS5wcm90b3R5cGUub24uY2FsbChTaGFwZS5wcm90b3R5cGUsICdzaGFkb3dDb2xvckNoYW5nZS5rb252YSBzaGFkb3dCbHVyQ2hhbmdlLmtvbnZhIHNoYWRvd09mZnNldENoYW5nZS5rb252YSBzaGFkb3dPcGFjaXR5Q2hhbmdlLmtvbnZhIHNoYWRvd0VuYWJsZWRDaGFuZ2Uua29udmEnLCBfY2xlYXJIYXNTaGFkb3dDYWNoZSk7XG5TaGFwZS5wcm90b3R5cGUub24uY2FsbChTaGFwZS5wcm90b3R5cGUsICdzaGFkb3dDb2xvckNoYW5nZS5rb252YSBzaGFkb3dPcGFjaXR5Q2hhbmdlLmtvbnZhIHNoYWRvd0VuYWJsZWRDaGFuZ2Uua29udmEnLCBfY2xlYXJHZXRTaGFkb3dSR0JBQ2FjaGUpO1xuU2hhcGUucHJvdG90eXBlLm9uLmNhbGwoU2hhcGUucHJvdG90eXBlLCAnZmlsbFByaW9yaXR5Q2hhbmdlLmtvbnZhIGZpbGxQYXR0ZXJuSW1hZ2VDaGFuZ2Uua29udmEgZmlsbFBhdHRlcm5SZXBlYXRDaGFuZ2Uua29udmEgZmlsbFBhdHRlcm5TY2FsZVhDaGFuZ2Uua29udmEgZmlsbFBhdHRlcm5TY2FsZVlDaGFuZ2Uua29udmEgZmlsbFBhdHRlcm5PZmZzZXRYQ2hhbmdlLmtvbnZhIGZpbGxQYXR0ZXJuT2Zmc2V0WUNoYW5nZS5rb252YSBmaWxsUGF0dGVyblhDaGFuZ2Uua29udmEgZmlsbFBhdHRlcm5ZQ2hhbmdlLmtvbnZhIGZpbGxQYXR0ZXJuUm90YXRpb25DaGFuZ2Uua29udmEnLCBfY2xlYXJGaWxsUGF0dGVybkNhY2hlKTtcblNoYXBlLnByb3RvdHlwZS5vbi5jYWxsKFNoYXBlLnByb3RvdHlwZSwgJ2ZpbGxQcmlvcml0eUNoYW5nZS5rb252YSBmaWxsTGluZWFyR3JhZGllbnRDb2xvclN0b3BzQ2hhbmdlLmtvbnZhIGZpbGxMaW5lYXJHcmFkaWVudFN0YXJ0UG9pbnRYQ2hhbmdlLmtvbnZhIGZpbGxMaW5lYXJHcmFkaWVudFN0YXJ0UG9pbnRZQ2hhbmdlLmtvbnZhIGZpbGxMaW5lYXJHcmFkaWVudEVuZFBvaW50WENoYW5nZS5rb252YSBmaWxsTGluZWFyR3JhZGllbnRFbmRQb2ludFlDaGFuZ2Uua29udmEnLCBfY2xlYXJMaW5lYXJHcmFkaWVudENhY2hlKTtcblNoYXBlLnByb3RvdHlwZS5vbi5jYWxsKFNoYXBlLnByb3RvdHlwZSwgJ2ZpbGxQcmlvcml0eUNoYW5nZS5rb252YSBmaWxsUmFkaWFsR3JhZGllbnRDb2xvclN0b3BzQ2hhbmdlLmtvbnZhIGZpbGxSYWRpYWxHcmFkaWVudFN0YXJ0UG9pbnRYQ2hhbmdlLmtvbnZhIGZpbGxSYWRpYWxHcmFkaWVudFN0YXJ0UG9pbnRZQ2hhbmdlLmtvbnZhIGZpbGxSYWRpYWxHcmFkaWVudEVuZFBvaW50WENoYW5nZS5rb252YSBmaWxsUmFkaWFsR3JhZGllbnRFbmRQb2ludFlDaGFuZ2Uua29udmEgZmlsbFJhZGlhbEdyYWRpZW50U3RhcnRSYWRpdXNDaGFuZ2Uua29udmEgZmlsbFJhZGlhbEdyYWRpZW50RW5kUmFkaXVzQ2hhbmdlLmtvbnZhJywgX2NsZWFyUmFkaWFsR3JhZGllbnRDYWNoZSk7XG5GYWN0b3J5LmFkZEdldHRlclNldHRlcihTaGFwZSwgJ3N0cm9rZScsIHVuZGVmaW5lZCwgZ2V0U3RyaW5nT3JHcmFkaWVudFZhbGlkYXRvcigpKTtcbkZhY3RvcnkuYWRkR2V0dGVyU2V0dGVyKFNoYXBlLCAnc3Ryb2tlV2lkdGgnLCAyLCBnZXROdW1iZXJWYWxpZGF0b3IoKSk7XG5GYWN0b3J5LmFkZEdldHRlclNldHRlcihTaGFwZSwgJ2ZpbGxBZnRlclN0cm9rZUVuYWJsZWQnLCBmYWxzZSk7XG5GYWN0b3J5LmFkZEdldHRlclNldHRlcihTaGFwZSwgJ2hpdFN0cm9rZVdpZHRoJywgJ2F1dG8nLCBnZXROdW1iZXJPckF1dG9WYWxpZGF0b3IoKSk7XG5GYWN0b3J5LmFkZEdldHRlclNldHRlcihTaGFwZSwgJ3N0cm9rZUhpdEVuYWJsZWQnLCB0cnVlLCBnZXRCb29sZWFuVmFsaWRhdG9yKCkpO1xuRmFjdG9yeS5hZGRHZXR0ZXJTZXR0ZXIoU2hhcGUsICdwZXJmZWN0RHJhd0VuYWJsZWQnLCB0cnVlLCBnZXRCb29sZWFuVmFsaWRhdG9yKCkpO1xuRmFjdG9yeS5hZGRHZXR0ZXJTZXR0ZXIoU2hhcGUsICdzaGFkb3dGb3JTdHJva2VFbmFibGVkJywgdHJ1ZSwgZ2V0Qm9vbGVhblZhbGlkYXRvcigpKTtcbkZhY3RvcnkuYWRkR2V0dGVyU2V0dGVyKFNoYXBlLCAnbGluZUpvaW4nKTtcbkZhY3RvcnkuYWRkR2V0dGVyU2V0dGVyKFNoYXBlLCAnbGluZUNhcCcpO1xuRmFjdG9yeS5hZGRHZXR0ZXJTZXR0ZXIoU2hhcGUsICdzY2VuZUZ1bmMnKTtcbkZhY3RvcnkuYWRkR2V0dGVyU2V0dGVyKFNoYXBlLCAnaGl0RnVuYycpO1xuRmFjdG9yeS5hZGRHZXR0ZXJTZXR0ZXIoU2hhcGUsICdkYXNoJyk7XG5GYWN0b3J5LmFkZEdldHRlclNldHRlcihTaGFwZSwgJ2Rhc2hPZmZzZXQnLCAwLCBnZXROdW1iZXJWYWxpZGF0b3IoKSk7XG5GYWN0b3J5LmFkZEdldHRlclNldHRlcihTaGFwZSwgJ3NoYWRvd0NvbG9yJywgdW5kZWZpbmVkLCBnZXRTdHJpbmdWYWxpZGF0b3IoKSk7XG5GYWN0b3J5LmFkZEdldHRlclNldHRlcihTaGFwZSwgJ3NoYWRvd0JsdXInLCAwLCBnZXROdW1iZXJWYWxpZGF0b3IoKSk7XG5GYWN0b3J5LmFkZEdldHRlclNldHRlcihTaGFwZSwgJ3NoYWRvd09wYWNpdHknLCAxLCBnZXROdW1iZXJWYWxpZGF0b3IoKSk7XG5GYWN0b3J5LmFkZENvbXBvbmVudHNHZXR0ZXJTZXR0ZXIoU2hhcGUsICdzaGFkb3dPZmZzZXQnLCBbJ3gnLCAneSddKTtcbkZhY3RvcnkuYWRkR2V0dGVyU2V0dGVyKFNoYXBlLCAnc2hhZG93T2Zmc2V0WCcsIDAsIGdldE51bWJlclZhbGlkYXRvcigpKTtcbkZhY3RvcnkuYWRkR2V0dGVyU2V0dGVyKFNoYXBlLCAnc2hhZG93T2Zmc2V0WScsIDAsIGdldE51bWJlclZhbGlkYXRvcigpKTtcbkZhY3RvcnkuYWRkR2V0dGVyU2V0dGVyKFNoYXBlLCAnZmlsbFBhdHRlcm5JbWFnZScpO1xuRmFjdG9yeS5hZGRHZXR0ZXJTZXR0ZXIoU2hhcGUsICdmaWxsJywgdW5kZWZpbmVkLCBnZXRTdHJpbmdPckdyYWRpZW50VmFsaWRhdG9yKCkpO1xuRmFjdG9yeS5hZGRHZXR0ZXJTZXR0ZXIoU2hhcGUsICdmaWxsUGF0dGVyblgnLCAwLCBnZXROdW1iZXJWYWxpZGF0b3IoKSk7XG5GYWN0b3J5LmFkZEdldHRlclNldHRlcihTaGFwZSwgJ2ZpbGxQYXR0ZXJuWScsIDAsIGdldE51bWJlclZhbGlkYXRvcigpKTtcbkZhY3RvcnkuYWRkR2V0dGVyU2V0dGVyKFNoYXBlLCAnZmlsbExpbmVhckdyYWRpZW50Q29sb3JTdG9wcycpO1xuRmFjdG9yeS5hZGRHZXR0ZXJTZXR0ZXIoU2hhcGUsICdzdHJva2VMaW5lYXJHcmFkaWVudENvbG9yU3RvcHMnKTtcbkZhY3RvcnkuYWRkR2V0dGVyU2V0dGVyKFNoYXBlLCAnZmlsbFJhZGlhbEdyYWRpZW50U3RhcnRSYWRpdXMnLCAwKTtcbkZhY3RvcnkuYWRkR2V0dGVyU2V0dGVyKFNoYXBlLCAnZmlsbFJhZGlhbEdyYWRpZW50RW5kUmFkaXVzJywgMCk7XG5GYWN0b3J5LmFkZEdldHRlclNldHRlcihTaGFwZSwgJ2ZpbGxSYWRpYWxHcmFkaWVudENvbG9yU3RvcHMnKTtcbkZhY3RvcnkuYWRkR2V0dGVyU2V0dGVyKFNoYXBlLCAnZmlsbFBhdHRlcm5SZXBlYXQnLCAncmVwZWF0Jyk7XG5GYWN0b3J5LmFkZEdldHRlclNldHRlcihTaGFwZSwgJ2ZpbGxFbmFibGVkJywgdHJ1ZSk7XG5GYWN0b3J5LmFkZEdldHRlclNldHRlcihTaGFwZSwgJ3N0cm9rZUVuYWJsZWQnLCB0cnVlKTtcbkZhY3RvcnkuYWRkR2V0dGVyU2V0dGVyKFNoYXBlLCAnc2hhZG93RW5hYmxlZCcsIHRydWUpO1xuRmFjdG9yeS5hZGRHZXR0ZXJTZXR0ZXIoU2hhcGUsICdkYXNoRW5hYmxlZCcsIHRydWUpO1xuRmFjdG9yeS5hZGRHZXR0ZXJTZXR0ZXIoU2hhcGUsICdzdHJva2VTY2FsZUVuYWJsZWQnLCB0cnVlKTtcbkZhY3RvcnkuYWRkR2V0dGVyU2V0dGVyKFNoYXBlLCAnZmlsbFByaW9yaXR5JywgJ2NvbG9yJyk7XG5GYWN0b3J5LmFkZENvbXBvbmVudHNHZXR0ZXJTZXR0ZXIoU2hhcGUsICdmaWxsUGF0dGVybk9mZnNldCcsIFsneCcsICd5J10pO1xuRmFjdG9yeS5hZGRHZXR0ZXJTZXR0ZXIoU2hhcGUsICdmaWxsUGF0dGVybk9mZnNldFgnLCAwLCBnZXROdW1iZXJWYWxpZGF0b3IoKSk7XG5GYWN0b3J5LmFkZEdldHRlclNldHRlcihTaGFwZSwgJ2ZpbGxQYXR0ZXJuT2Zmc2V0WScsIDAsIGdldE51bWJlclZhbGlkYXRvcigpKTtcbkZhY3RvcnkuYWRkQ29tcG9uZW50c0dldHRlclNldHRlcihTaGFwZSwgJ2ZpbGxQYXR0ZXJuU2NhbGUnLCBbJ3gnLCAneSddKTtcbkZhY3RvcnkuYWRkR2V0dGVyU2V0dGVyKFNoYXBlLCAnZmlsbFBhdHRlcm5TY2FsZVgnLCAxLCBnZXROdW1iZXJWYWxpZGF0b3IoKSk7XG5GYWN0b3J5LmFkZEdldHRlclNldHRlcihTaGFwZSwgJ2ZpbGxQYXR0ZXJuU2NhbGVZJywgMSwgZ2V0TnVtYmVyVmFsaWRhdG9yKCkpO1xuRmFjdG9yeS5hZGRDb21wb25lbnRzR2V0dGVyU2V0dGVyKFNoYXBlLCAnZmlsbExpbmVhckdyYWRpZW50U3RhcnRQb2ludCcsIFtcbiAgICAneCcsXG4gICAgJ3knLFxuXSk7XG5GYWN0b3J5LmFkZENvbXBvbmVudHNHZXR0ZXJTZXR0ZXIoU2hhcGUsICdzdHJva2VMaW5lYXJHcmFkaWVudFN0YXJ0UG9pbnQnLCBbXG4gICAgJ3gnLFxuICAgICd5Jyxcbl0pO1xuRmFjdG9yeS5hZGRHZXR0ZXJTZXR0ZXIoU2hhcGUsICdmaWxsTGluZWFyR3JhZGllbnRTdGFydFBvaW50WCcsIDApO1xuRmFjdG9yeS5hZGRHZXR0ZXJTZXR0ZXIoU2hhcGUsICdzdHJva2VMaW5lYXJHcmFkaWVudFN0YXJ0UG9pbnRYJywgMCk7XG5GYWN0b3J5LmFkZEdldHRlclNldHRlcihTaGFwZSwgJ2ZpbGxMaW5lYXJHcmFkaWVudFN0YXJ0UG9pbnRZJywgMCk7XG5GYWN0b3J5LmFkZEdldHRlclNldHRlcihTaGFwZSwgJ3N0cm9rZUxpbmVhckdyYWRpZW50U3RhcnRQb2ludFknLCAwKTtcbkZhY3RvcnkuYWRkQ29tcG9uZW50c0dldHRlclNldHRlcihTaGFwZSwgJ2ZpbGxMaW5lYXJHcmFkaWVudEVuZFBvaW50JywgW1xuICAgICd4JyxcbiAgICAneScsXG5dKTtcbkZhY3RvcnkuYWRkQ29tcG9uZW50c0dldHRlclNldHRlcihTaGFwZSwgJ3N0cm9rZUxpbmVhckdyYWRpZW50RW5kUG9pbnQnLCBbXG4gICAgJ3gnLFxuICAgICd5Jyxcbl0pO1xuRmFjdG9yeS5hZGRHZXR0ZXJTZXR0ZXIoU2hhcGUsICdmaWxsTGluZWFyR3JhZGllbnRFbmRQb2ludFgnLCAwKTtcbkZhY3RvcnkuYWRkR2V0dGVyU2V0dGVyKFNoYXBlLCAnc3Ryb2tlTGluZWFyR3JhZGllbnRFbmRQb2ludFgnLCAwKTtcbkZhY3RvcnkuYWRkR2V0dGVyU2V0dGVyKFNoYXBlLCAnZmlsbExpbmVhckdyYWRpZW50RW5kUG9pbnRZJywgMCk7XG5GYWN0b3J5LmFkZEdldHRlclNldHRlcihTaGFwZSwgJ3N0cm9rZUxpbmVhckdyYWRpZW50RW5kUG9pbnRZJywgMCk7XG5GYWN0b3J5LmFkZENvbXBvbmVudHNHZXR0ZXJTZXR0ZXIoU2hhcGUsICdmaWxsUmFkaWFsR3JhZGllbnRTdGFydFBvaW50JywgW1xuICAgICd4JyxcbiAgICAneScsXG5dKTtcbkZhY3RvcnkuYWRkR2V0dGVyU2V0dGVyKFNoYXBlLCAnZmlsbFJhZGlhbEdyYWRpZW50U3RhcnRQb2ludFgnLCAwKTtcbkZhY3RvcnkuYWRkR2V0dGVyU2V0dGVyKFNoYXBlLCAnZmlsbFJhZGlhbEdyYWRpZW50U3RhcnRQb2ludFknLCAwKTtcbkZhY3RvcnkuYWRkQ29tcG9uZW50c0dldHRlclNldHRlcihTaGFwZSwgJ2ZpbGxSYWRpYWxHcmFkaWVudEVuZFBvaW50JywgW1xuICAgICd4JyxcbiAgICAneScsXG5dKTtcbkZhY3RvcnkuYWRkR2V0dGVyU2V0dGVyKFNoYXBlLCAnZmlsbFJhZGlhbEdyYWRpZW50RW5kUG9pbnRYJywgMCk7XG5GYWN0b3J5LmFkZEdldHRlclNldHRlcihTaGFwZSwgJ2ZpbGxSYWRpYWxHcmFkaWVudEVuZFBvaW50WScsIDApO1xuRmFjdG9yeS5hZGRHZXR0ZXJTZXR0ZXIoU2hhcGUsICdmaWxsUGF0dGVyblJvdGF0aW9uJywgMCk7XG5GYWN0b3J5LmJhY2tDb21wYXQoU2hhcGUsIHtcbiAgICBkYXNoQXJyYXk6ICdkYXNoJyxcbiAgICBnZXREYXNoQXJyYXk6ICdnZXREYXNoJyxcbiAgICBzZXREYXNoQXJyYXk6ICdnZXREYXNoJyxcbiAgICBkcmF3RnVuYzogJ3NjZW5lRnVuYycsXG4gICAgZ2V0RHJhd0Z1bmM6ICdnZXRTY2VuZUZ1bmMnLFxuICAgIHNldERyYXdGdW5jOiAnc2V0U2NlbmVGdW5jJyxcbiAgICBkcmF3SGl0RnVuYzogJ2hpdEZ1bmMnLFxuICAgIGdldERyYXdIaXRGdW5jOiAnZ2V0SGl0RnVuYycsXG4gICAgc2V0RHJhd0hpdEZ1bmM6ICdzZXRIaXRGdW5jJyxcbn0pO1xuIiwiaW1wb3J0IHsgVXRpbCB9IGZyb20gJy4vVXRpbC5qcyc7XG5pbXBvcnQgeyBGYWN0b3J5IH0gZnJvbSAnLi9GYWN0b3J5LmpzJztcbmltcG9ydCB7IENvbnRhaW5lciB9IGZyb20gJy4vQ29udGFpbmVyLmpzJztcbmltcG9ydCB7IEtvbnZhIH0gZnJvbSAnLi9HbG9iYWwuanMnO1xuaW1wb3J0IHsgU2NlbmVDYW52YXMsIEhpdENhbnZhcyB9IGZyb20gJy4vQ2FudmFzLmpzJztcbmltcG9ydCB7IEREIH0gZnJvbSAnLi9EcmFnQW5kRHJvcC5qcyc7XG5pbXBvcnQgeyBfcmVnaXN0ZXJOb2RlIH0gZnJvbSAnLi9HbG9iYWwuanMnO1xuaW1wb3J0ICogYXMgUG9pbnRlckV2ZW50cyBmcm9tICcuL1BvaW50ZXJFdmVudHMuanMnO1xudmFyIFNUQUdFID0gJ1N0YWdlJywgU1RSSU5HID0gJ3N0cmluZycsIFBYID0gJ3B4JywgTU9VU0VPVVQgPSAnbW91c2VvdXQnLCBNT1VTRUxFQVZFID0gJ21vdXNlbGVhdmUnLCBNT1VTRU9WRVIgPSAnbW91c2VvdmVyJywgTU9VU0VFTlRFUiA9ICdtb3VzZWVudGVyJywgTU9VU0VNT1ZFID0gJ21vdXNlbW92ZScsIE1PVVNFRE9XTiA9ICdtb3VzZWRvd24nLCBNT1VTRVVQID0gJ21vdXNldXAnLCBQT0lOVEVSTU9WRSA9ICdwb2ludGVybW92ZScsIFBPSU5URVJET1dOID0gJ3BvaW50ZXJkb3duJywgUE9JTlRFUlVQID0gJ3BvaW50ZXJ1cCcsIFBPSU5URVJDQU5DRUwgPSAncG9pbnRlcmNhbmNlbCcsIExPU1RQT0lOVEVSQ0FQVFVSRSA9ICdsb3N0cG9pbnRlcmNhcHR1cmUnLCBQT0lOVEVST1VUID0gJ3BvaW50ZXJvdXQnLCBQT0lOVEVSTEVBVkUgPSAncG9pbnRlcmxlYXZlJywgUE9JTlRFUk9WRVIgPSAncG9pbnRlcm92ZXInLCBQT0lOVEVSRU5URVIgPSAncG9pbnRlcmVudGVyJywgQ09OVEVYVE1FTlUgPSAnY29udGV4dG1lbnUnLCBUT1VDSFNUQVJUID0gJ3RvdWNoc3RhcnQnLCBUT1VDSEVORCA9ICd0b3VjaGVuZCcsIFRPVUNITU9WRSA9ICd0b3VjaG1vdmUnLCBUT1VDSENBTkNFTCA9ICd0b3VjaGNhbmNlbCcsIFdIRUVMID0gJ3doZWVsJywgTUFYX0xBWUVSU19OVU1CRVIgPSA1LCBFVkVOVFMgPSBbXG4gICAgW01PVVNFRU5URVIsICdfcG9pbnRlcmVudGVyJ10sXG4gICAgW01PVVNFRE9XTiwgJ19wb2ludGVyZG93biddLFxuICAgIFtNT1VTRU1PVkUsICdfcG9pbnRlcm1vdmUnXSxcbiAgICBbTU9VU0VVUCwgJ19wb2ludGVydXAnXSxcbiAgICBbTU9VU0VMRUFWRSwgJ19wb2ludGVybGVhdmUnXSxcbiAgICBbVE9VQ0hTVEFSVCwgJ19wb2ludGVyZG93biddLFxuICAgIFtUT1VDSE1PVkUsICdfcG9pbnRlcm1vdmUnXSxcbiAgICBbVE9VQ0hFTkQsICdfcG9pbnRlcnVwJ10sXG4gICAgW1RPVUNIQ0FOQ0VMLCAnX3BvaW50ZXJjYW5jZWwnXSxcbiAgICBbTU9VU0VPVkVSLCAnX3BvaW50ZXJvdmVyJ10sXG4gICAgW1dIRUVMLCAnX3doZWVsJ10sXG4gICAgW0NPTlRFWFRNRU5VLCAnX2NvbnRleHRtZW51J10sXG4gICAgW1BPSU5URVJET1dOLCAnX3BvaW50ZXJkb3duJ10sXG4gICAgW1BPSU5URVJNT1ZFLCAnX3BvaW50ZXJtb3ZlJ10sXG4gICAgW1BPSU5URVJVUCwgJ19wb2ludGVydXAnXSxcbiAgICBbUE9JTlRFUkNBTkNFTCwgJ19wb2ludGVyY2FuY2VsJ10sXG4gICAgW0xPU1RQT0lOVEVSQ0FQVFVSRSwgJ19sb3N0cG9pbnRlcmNhcHR1cmUnXSxcbl07XG5jb25zdCBFVkVOVFNfTUFQID0ge1xuICAgIG1vdXNlOiB7XG4gICAgICAgIFtQT0lOVEVST1VUXTogTU9VU0VPVVQsXG4gICAgICAgIFtQT0lOVEVSTEVBVkVdOiBNT1VTRUxFQVZFLFxuICAgICAgICBbUE9JTlRFUk9WRVJdOiBNT1VTRU9WRVIsXG4gICAgICAgIFtQT0lOVEVSRU5URVJdOiBNT1VTRUVOVEVSLFxuICAgICAgICBbUE9JTlRFUk1PVkVdOiBNT1VTRU1PVkUsXG4gICAgICAgIFtQT0lOVEVSRE9XTl06IE1PVVNFRE9XTixcbiAgICAgICAgW1BPSU5URVJVUF06IE1PVVNFVVAsXG4gICAgICAgIFtQT0lOVEVSQ0FOQ0VMXTogJ21vdXNlY2FuY2VsJyxcbiAgICAgICAgcG9pbnRlcmNsaWNrOiAnY2xpY2snLFxuICAgICAgICBwb2ludGVyZGJsY2xpY2s6ICdkYmxjbGljaycsXG4gICAgfSxcbiAgICB0b3VjaDoge1xuICAgICAgICBbUE9JTlRFUk9VVF06ICd0b3VjaG91dCcsXG4gICAgICAgIFtQT0lOVEVSTEVBVkVdOiAndG91Y2hsZWF2ZScsXG4gICAgICAgIFtQT0lOVEVST1ZFUl06ICd0b3VjaG92ZXInLFxuICAgICAgICBbUE9JTlRFUkVOVEVSXTogJ3RvdWNoZW50ZXInLFxuICAgICAgICBbUE9JTlRFUk1PVkVdOiBUT1VDSE1PVkUsXG4gICAgICAgIFtQT0lOVEVSRE9XTl06IFRPVUNIU1RBUlQsXG4gICAgICAgIFtQT0lOVEVSVVBdOiBUT1VDSEVORCxcbiAgICAgICAgW1BPSU5URVJDQU5DRUxdOiBUT1VDSENBTkNFTCxcbiAgICAgICAgcG9pbnRlcmNsaWNrOiAndGFwJyxcbiAgICAgICAgcG9pbnRlcmRibGNsaWNrOiAnZGJsdGFwJyxcbiAgICB9LFxuICAgIHBvaW50ZXI6IHtcbiAgICAgICAgW1BPSU5URVJPVVRdOiBQT0lOVEVST1VULFxuICAgICAgICBbUE9JTlRFUkxFQVZFXTogUE9JTlRFUkxFQVZFLFxuICAgICAgICBbUE9JTlRFUk9WRVJdOiBQT0lOVEVST1ZFUixcbiAgICAgICAgW1BPSU5URVJFTlRFUl06IFBPSU5URVJFTlRFUixcbiAgICAgICAgW1BPSU5URVJNT1ZFXTogUE9JTlRFUk1PVkUsXG4gICAgICAgIFtQT0lOVEVSRE9XTl06IFBPSU5URVJET1dOLFxuICAgICAgICBbUE9JTlRFUlVQXTogUE9JTlRFUlVQLFxuICAgICAgICBbUE9JTlRFUkNBTkNFTF06IFBPSU5URVJDQU5DRUwsXG4gICAgICAgIHBvaW50ZXJjbGljazogJ3BvaW50ZXJjbGljaycsXG4gICAgICAgIHBvaW50ZXJkYmxjbGljazogJ3BvaW50ZXJkYmxjbGljaycsXG4gICAgfSxcbn07XG5jb25zdCBnZXRFdmVudFR5cGUgPSAodHlwZSkgPT4ge1xuICAgIGlmICh0eXBlLmluZGV4T2YoJ3BvaW50ZXInKSA+PSAwKSB7XG4gICAgICAgIHJldHVybiAncG9pbnRlcic7XG4gICAgfVxuICAgIGlmICh0eXBlLmluZGV4T2YoJ3RvdWNoJykgPj0gMCkge1xuICAgICAgICByZXR1cm4gJ3RvdWNoJztcbiAgICB9XG4gICAgcmV0dXJuICdtb3VzZSc7XG59O1xuY29uc3QgZ2V0RXZlbnRzTWFwID0gKGV2ZW50VHlwZSkgPT4ge1xuICAgIGNvbnN0IHR5cGUgPSBnZXRFdmVudFR5cGUoZXZlbnRUeXBlKTtcbiAgICBpZiAodHlwZSA9PT0gJ3BvaW50ZXInKSB7XG4gICAgICAgIHJldHVybiBLb252YS5wb2ludGVyRXZlbnRzRW5hYmxlZCAmJiBFVkVOVFNfTUFQLnBvaW50ZXI7XG4gICAgfVxuICAgIGlmICh0eXBlID09PSAndG91Y2gnKSB7XG4gICAgICAgIHJldHVybiBFVkVOVFNfTUFQLnRvdWNoO1xuICAgIH1cbiAgICBpZiAodHlwZSA9PT0gJ21vdXNlJykge1xuICAgICAgICByZXR1cm4gRVZFTlRTX01BUC5tb3VzZTtcbiAgICB9XG59O1xuZnVuY3Rpb24gY2hlY2tOb0NsaXAoYXR0cnMgPSB7fSkge1xuICAgIGlmIChhdHRycy5jbGlwRnVuYyB8fCBhdHRycy5jbGlwV2lkdGggfHwgYXR0cnMuY2xpcEhlaWdodCkge1xuICAgICAgICBVdGlsLndhcm4oJ1N0YWdlIGRvZXMgbm90IHN1cHBvcnQgY2xpcHBpbmcuIFBsZWFzZSB1c2UgY2xpcCBmb3IgTGF5ZXJzIG9yIEdyb3Vwcy4nKTtcbiAgICB9XG4gICAgcmV0dXJuIGF0dHJzO1xufVxuY29uc3QgTk9fUE9JTlRFUlNfTUVTU0FHRSA9IGBQb2ludGVyIHBvc2l0aW9uIGlzIG1pc3NpbmcgYW5kIG5vdCByZWdpc3RlcmVkIGJ5IHRoZSBzdGFnZS4gTG9va3MgbGlrZSBpdCBpcyBvdXRzaWRlIG9mIHRoZSBzdGFnZSBjb250YWluZXIuIFlvdSBjYW4gc2V0IGl0IG1hbnVhbGx5IGZyb20gZXZlbnQ6IHN0YWdlLnNldFBvaW50ZXJzUG9zaXRpb25zKGV2ZW50KTtgO1xuZXhwb3J0IGNvbnN0IHN0YWdlcyA9IFtdO1xuZXhwb3J0IGNsYXNzIFN0YWdlIGV4dGVuZHMgQ29udGFpbmVyIHtcbiAgICBjb25zdHJ1Y3Rvcihjb25maWcpIHtcbiAgICAgICAgc3VwZXIoY2hlY2tOb0NsaXAoY29uZmlnKSk7XG4gICAgICAgIHRoaXMuX3BvaW50ZXJQb3NpdGlvbnMgPSBbXTtcbiAgICAgICAgdGhpcy5fY2hhbmdlZFBvaW50ZXJQb3NpdGlvbnMgPSBbXTtcbiAgICAgICAgdGhpcy5fYnVpbGRET00oKTtcbiAgICAgICAgdGhpcy5fYmluZENvbnRlbnRFdmVudHMoKTtcbiAgICAgICAgc3RhZ2VzLnB1c2godGhpcyk7XG4gICAgICAgIHRoaXMub24oJ3dpZHRoQ2hhbmdlLmtvbnZhIGhlaWdodENoYW5nZS5rb252YScsIHRoaXMuX3Jlc2l6ZURPTSk7XG4gICAgICAgIHRoaXMub24oJ3Zpc2libGVDaGFuZ2Uua29udmEnLCB0aGlzLl9jaGVja1Zpc2liaWxpdHkpO1xuICAgICAgICB0aGlzLm9uKCdjbGlwV2lkdGhDaGFuZ2Uua29udmEgY2xpcEhlaWdodENoYW5nZS5rb252YSBjbGlwRnVuY0NoYW5nZS5rb252YScsICgpID0+IHtcbiAgICAgICAgICAgIGNoZWNrTm9DbGlwKHRoaXMuYXR0cnMpO1xuICAgICAgICB9KTtcbiAgICAgICAgdGhpcy5fY2hlY2tWaXNpYmlsaXR5KCk7XG4gICAgfVxuICAgIF92YWxpZGF0ZUFkZChjaGlsZCkge1xuICAgICAgICBjb25zdCBpc0xheWVyID0gY2hpbGQuZ2V0VHlwZSgpID09PSAnTGF5ZXInO1xuICAgICAgICBjb25zdCBpc0Zhc3RMYXllciA9IGNoaWxkLmdldFR5cGUoKSA9PT0gJ0Zhc3RMYXllcic7XG4gICAgICAgIGNvbnN0IHZhbGlkID0gaXNMYXllciB8fCBpc0Zhc3RMYXllcjtcbiAgICAgICAgaWYgKCF2YWxpZCkge1xuICAgICAgICAgICAgVXRpbC50aHJvdygnWW91IG1heSBvbmx5IGFkZCBsYXllcnMgdG8gdGhlIHN0YWdlLicpO1xuICAgICAgICB9XG4gICAgfVxuICAgIF9jaGVja1Zpc2liaWxpdHkoKSB7XG4gICAgICAgIGlmICghdGhpcy5jb250ZW50KSB7XG4gICAgICAgICAgICByZXR1cm47XG4gICAgICAgIH1cbiAgICAgICAgY29uc3Qgc3R5bGUgPSB0aGlzLnZpc2libGUoKSA/ICcnIDogJ25vbmUnO1xuICAgICAgICB0aGlzLmNvbnRlbnQuc3R5bGUuZGlzcGxheSA9IHN0eWxlO1xuICAgIH1cbiAgICBzZXRDb250YWluZXIoY29udGFpbmVyKSB7XG4gICAgICAgIGlmICh0eXBlb2YgY29udGFpbmVyID09PSBTVFJJTkcpIHtcbiAgICAgICAgICAgIGlmIChjb250YWluZXIuY2hhckF0KDApID09PSAnLicpIHtcbiAgICAgICAgICAgICAgICB2YXIgY2xhc3NOYW1lID0gY29udGFpbmVyLnNsaWNlKDEpO1xuICAgICAgICAgICAgICAgIGNvbnRhaW5lciA9IGRvY3VtZW50LmdldEVsZW1lbnRzQnlDbGFzc05hbWUoY2xhc3NOYW1lKVswXTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGVsc2Uge1xuICAgICAgICAgICAgICAgIHZhciBpZDtcbiAgICAgICAgICAgICAgICBpZiAoY29udGFpbmVyLmNoYXJBdCgwKSAhPT0gJyMnKSB7XG4gICAgICAgICAgICAgICAgICAgIGlkID0gY29udGFpbmVyO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICBlbHNlIHtcbiAgICAgICAgICAgICAgICAgICAgaWQgPSBjb250YWluZXIuc2xpY2UoMSk7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIGNvbnRhaW5lciA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKGlkKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGlmICghY29udGFpbmVyKSB7XG4gICAgICAgICAgICAgICAgdGhyb3cgJ0NhbiBub3QgZmluZCBjb250YWluZXIgaW4gZG9jdW1lbnQgd2l0aCBpZCAnICsgaWQ7XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgICAgdGhpcy5fc2V0QXR0cignY29udGFpbmVyJywgY29udGFpbmVyKTtcbiAgICAgICAgaWYgKHRoaXMuY29udGVudCkge1xuICAgICAgICAgICAgaWYgKHRoaXMuY29udGVudC5wYXJlbnRFbGVtZW50KSB7XG4gICAgICAgICAgICAgICAgdGhpcy5jb250ZW50LnBhcmVudEVsZW1lbnQucmVtb3ZlQ2hpbGQodGhpcy5jb250ZW50KTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGNvbnRhaW5lci5hcHBlbmRDaGlsZCh0aGlzLmNvbnRlbnQpO1xuICAgICAgICB9XG4gICAgICAgIHJldHVybiB0aGlzO1xuICAgIH1cbiAgICBzaG91bGREcmF3SGl0KCkge1xuICAgICAgICByZXR1cm4gdHJ1ZTtcbiAgICB9XG4gICAgY2xlYXIoKSB7XG4gICAgICAgIHZhciBsYXllcnMgPSB0aGlzLmNoaWxkcmVuLCBsZW4gPSBsYXllcnMubGVuZ3RoLCBuO1xuICAgICAgICBmb3IgKG4gPSAwOyBuIDwgbGVuOyBuKyspIHtcbiAgICAgICAgICAgIGxheWVyc1tuXS5jbGVhcigpO1xuICAgICAgICB9XG4gICAgICAgIHJldHVybiB0aGlzO1xuICAgIH1cbiAgICBjbG9uZShvYmopIHtcbiAgICAgICAgaWYgKCFvYmopIHtcbiAgICAgICAgICAgIG9iaiA9IHt9O1xuICAgICAgICB9XG4gICAgICAgIG9iai5jb250YWluZXIgPVxuICAgICAgICAgICAgdHlwZW9mIGRvY3VtZW50ICE9PSAndW5kZWZpbmVkJyAmJiBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdkaXYnKTtcbiAgICAgICAgcmV0dXJuIENvbnRhaW5lci5wcm90b3R5cGUuY2xvbmUuY2FsbCh0aGlzLCBvYmopO1xuICAgIH1cbiAgICBkZXN0cm95KCkge1xuICAgICAgICBzdXBlci5kZXN0cm95KCk7XG4gICAgICAgIHZhciBjb250ZW50ID0gdGhpcy5jb250ZW50O1xuICAgICAgICBpZiAoY29udGVudCAmJiBVdGlsLl9pc0luRG9jdW1lbnQoY29udGVudCkpIHtcbiAgICAgICAgICAgIHRoaXMuY29udGFpbmVyKCkucmVtb3ZlQ2hpbGQoY29udGVudCk7XG4gICAgICAgIH1cbiAgICAgICAgdmFyIGluZGV4ID0gc3RhZ2VzLmluZGV4T2YodGhpcyk7XG4gICAgICAgIGlmIChpbmRleCA+IC0xKSB7XG4gICAgICAgICAgICBzdGFnZXMuc3BsaWNlKGluZGV4LCAxKTtcbiAgICAgICAgfVxuICAgICAgICBVdGlsLnJlbGVhc2VDYW52YXModGhpcy5idWZmZXJDYW52YXMuX2NhbnZhcywgdGhpcy5idWZmZXJIaXRDYW52YXMuX2NhbnZhcyk7XG4gICAgICAgIHJldHVybiB0aGlzO1xuICAgIH1cbiAgICBnZXRQb2ludGVyUG9zaXRpb24oKSB7XG4gICAgICAgIGNvbnN0IHBvcyA9IHRoaXMuX3BvaW50ZXJQb3NpdGlvbnNbMF0gfHwgdGhpcy5fY2hhbmdlZFBvaW50ZXJQb3NpdGlvbnNbMF07XG4gICAgICAgIGlmICghcG9zKSB7XG4gICAgICAgICAgICBVdGlsLndhcm4oTk9fUE9JTlRFUlNfTUVTU0FHRSk7XG4gICAgICAgICAgICByZXR1cm4gbnVsbDtcbiAgICAgICAgfVxuICAgICAgICByZXR1cm4ge1xuICAgICAgICAgICAgeDogcG9zLngsXG4gICAgICAgICAgICB5OiBwb3MueSxcbiAgICAgICAgfTtcbiAgICB9XG4gICAgX2dldFBvaW50ZXJCeUlkKGlkKSB7XG4gICAgICAgIHJldHVybiB0aGlzLl9wb2ludGVyUG9zaXRpb25zLmZpbmQoKHApID0+IHAuaWQgPT09IGlkKTtcbiAgICB9XG4gICAgZ2V0UG9pbnRlcnNQb3NpdGlvbnMoKSB7XG4gICAgICAgIHJldHVybiB0aGlzLl9wb2ludGVyUG9zaXRpb25zO1xuICAgIH1cbiAgICBnZXRTdGFnZSgpIHtcbiAgICAgICAgcmV0dXJuIHRoaXM7XG4gICAgfVxuICAgIGdldENvbnRlbnQoKSB7XG4gICAgICAgIHJldHVybiB0aGlzLmNvbnRlbnQ7XG4gICAgfVxuICAgIF90b0tvbnZhQ2FudmFzKGNvbmZpZykge1xuICAgICAgICBjb25maWcgPSBjb25maWcgfHwge307XG4gICAgICAgIGNvbmZpZy54ID0gY29uZmlnLnggfHwgMDtcbiAgICAgICAgY29uZmlnLnkgPSBjb25maWcueSB8fCAwO1xuICAgICAgICBjb25maWcud2lkdGggPSBjb25maWcud2lkdGggfHwgdGhpcy53aWR0aCgpO1xuICAgICAgICBjb25maWcuaGVpZ2h0ID0gY29uZmlnLmhlaWdodCB8fCB0aGlzLmhlaWdodCgpO1xuICAgICAgICB2YXIgY2FudmFzID0gbmV3IFNjZW5lQ2FudmFzKHtcbiAgICAgICAgICAgIHdpZHRoOiBjb25maWcud2lkdGgsXG4gICAgICAgICAgICBoZWlnaHQ6IGNvbmZpZy5oZWlnaHQsXG4gICAgICAgICAgICBwaXhlbFJhdGlvOiBjb25maWcucGl4ZWxSYXRpbyB8fCAxLFxuICAgICAgICB9KTtcbiAgICAgICAgdmFyIF9jb250ZXh0ID0gY2FudmFzLmdldENvbnRleHQoKS5fY29udGV4dDtcbiAgICAgICAgdmFyIGxheWVycyA9IHRoaXMuY2hpbGRyZW47XG4gICAgICAgIGlmIChjb25maWcueCB8fCBjb25maWcueSkge1xuICAgICAgICAgICAgX2NvbnRleHQudHJhbnNsYXRlKC0xICogY29uZmlnLngsIC0xICogY29uZmlnLnkpO1xuICAgICAgICB9XG4gICAgICAgIGxheWVycy5mb3JFYWNoKGZ1bmN0aW9uIChsYXllcikge1xuICAgICAgICAgICAgaWYgKCFsYXllci5pc1Zpc2libGUoKSkge1xuICAgICAgICAgICAgICAgIHJldHVybjtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIHZhciBsYXllckNhbnZhcyA9IGxheWVyLl90b0tvbnZhQ2FudmFzKGNvbmZpZyk7XG4gICAgICAgICAgICBfY29udGV4dC5kcmF3SW1hZ2UobGF5ZXJDYW52YXMuX2NhbnZhcywgY29uZmlnLngsIGNvbmZpZy55LCBsYXllckNhbnZhcy5nZXRXaWR0aCgpIC8gbGF5ZXJDYW52YXMuZ2V0UGl4ZWxSYXRpbygpLCBsYXllckNhbnZhcy5nZXRIZWlnaHQoKSAvIGxheWVyQ2FudmFzLmdldFBpeGVsUmF0aW8oKSk7XG4gICAgICAgIH0pO1xuICAgICAgICByZXR1cm4gY2FudmFzO1xuICAgIH1cbiAgICBnZXRJbnRlcnNlY3Rpb24ocG9zKSB7XG4gICAgICAgIGlmICghcG9zKSB7XG4gICAgICAgICAgICByZXR1cm4gbnVsbDtcbiAgICAgICAgfVxuICAgICAgICB2YXIgbGF5ZXJzID0gdGhpcy5jaGlsZHJlbiwgbGVuID0gbGF5ZXJzLmxlbmd0aCwgZW5kID0gbGVuIC0gMSwgbjtcbiAgICAgICAgZm9yIChuID0gZW5kOyBuID49IDA7IG4tLSkge1xuICAgICAgICAgICAgY29uc3Qgc2hhcGUgPSBsYXllcnNbbl0uZ2V0SW50ZXJzZWN0aW9uKHBvcyk7XG4gICAgICAgICAgICBpZiAoc2hhcGUpIHtcbiAgICAgICAgICAgICAgICByZXR1cm4gc2hhcGU7XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuIG51bGw7XG4gICAgfVxuICAgIF9yZXNpemVET00oKSB7XG4gICAgICAgIHZhciB3aWR0aCA9IHRoaXMud2lkdGgoKTtcbiAgICAgICAgdmFyIGhlaWdodCA9IHRoaXMuaGVpZ2h0KCk7XG4gICAgICAgIGlmICh0aGlzLmNvbnRlbnQpIHtcbiAgICAgICAgICAgIHRoaXMuY29udGVudC5zdHlsZS53aWR0aCA9IHdpZHRoICsgUFg7XG4gICAgICAgICAgICB0aGlzLmNvbnRlbnQuc3R5bGUuaGVpZ2h0ID0gaGVpZ2h0ICsgUFg7XG4gICAgICAgIH1cbiAgICAgICAgdGhpcy5idWZmZXJDYW52YXMuc2V0U2l6ZSh3aWR0aCwgaGVpZ2h0KTtcbiAgICAgICAgdGhpcy5idWZmZXJIaXRDYW52YXMuc2V0U2l6ZSh3aWR0aCwgaGVpZ2h0KTtcbiAgICAgICAgdGhpcy5jaGlsZHJlbi5mb3JFYWNoKChsYXllcikgPT4ge1xuICAgICAgICAgICAgbGF5ZXIuc2V0U2l6ZSh7IHdpZHRoLCBoZWlnaHQgfSk7XG4gICAgICAgICAgICBsYXllci5kcmF3KCk7XG4gICAgICAgIH0pO1xuICAgIH1cbiAgICBhZGQobGF5ZXIsIC4uLnJlc3QpIHtcbiAgICAgICAgaWYgKGFyZ3VtZW50cy5sZW5ndGggPiAxKSB7XG4gICAgICAgICAgICBmb3IgKHZhciBpID0gMDsgaSA8IGFyZ3VtZW50cy5sZW5ndGg7IGkrKykge1xuICAgICAgICAgICAgICAgIHRoaXMuYWRkKGFyZ3VtZW50c1tpXSk7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICByZXR1cm4gdGhpcztcbiAgICAgICAgfVxuICAgICAgICBzdXBlci5hZGQobGF5ZXIpO1xuICAgICAgICB2YXIgbGVuZ3RoID0gdGhpcy5jaGlsZHJlbi5sZW5ndGg7XG4gICAgICAgIGlmIChsZW5ndGggPiBNQVhfTEFZRVJTX05VTUJFUikge1xuICAgICAgICAgICAgVXRpbC53YXJuKCdUaGUgc3RhZ2UgaGFzICcgK1xuICAgICAgICAgICAgICAgIGxlbmd0aCArXG4gICAgICAgICAgICAgICAgJyBsYXllcnMuIFJlY29tbWVuZGVkIG1heGltdW0gbnVtYmVyIG9mIGxheWVycyBpcyAzLTUuIEFkZGluZyBtb3JlIGxheWVycyBpbnRvIHRoZSBzdGFnZSBtYXkgZHJvcCB0aGUgcGVyZm9ybWFuY2UuIFJldGhpbmsgeW91ciB0cmVlIHN0cnVjdHVyZSwgeW91IGNhbiB1c2UgS29udmEuR3JvdXAuJyk7XG4gICAgICAgIH1cbiAgICAgICAgbGF5ZXIuc2V0U2l6ZSh7IHdpZHRoOiB0aGlzLndpZHRoKCksIGhlaWdodDogdGhpcy5oZWlnaHQoKSB9KTtcbiAgICAgICAgbGF5ZXIuZHJhdygpO1xuICAgICAgICBpZiAoS29udmEuaXNCcm93c2VyKSB7XG4gICAgICAgICAgICB0aGlzLmNvbnRlbnQuYXBwZW5kQ2hpbGQobGF5ZXIuY2FudmFzLl9jYW52YXMpO1xuICAgICAgICB9XG4gICAgICAgIHJldHVybiB0aGlzO1xuICAgIH1cbiAgICBnZXRQYXJlbnQoKSB7XG4gICAgICAgIHJldHVybiBudWxsO1xuICAgIH1cbiAgICBnZXRMYXllcigpIHtcbiAgICAgICAgcmV0dXJuIG51bGw7XG4gICAgfVxuICAgIGhhc1BvaW50ZXJDYXB0dXJlKHBvaW50ZXJJZCkge1xuICAgICAgICByZXR1cm4gUG9pbnRlckV2ZW50cy5oYXNQb2ludGVyQ2FwdHVyZShwb2ludGVySWQsIHRoaXMpO1xuICAgIH1cbiAgICBzZXRQb2ludGVyQ2FwdHVyZShwb2ludGVySWQpIHtcbiAgICAgICAgUG9pbnRlckV2ZW50cy5zZXRQb2ludGVyQ2FwdHVyZShwb2ludGVySWQsIHRoaXMpO1xuICAgIH1cbiAgICByZWxlYXNlQ2FwdHVyZShwb2ludGVySWQpIHtcbiAgICAgICAgUG9pbnRlckV2ZW50cy5yZWxlYXNlQ2FwdHVyZShwb2ludGVySWQsIHRoaXMpO1xuICAgIH1cbiAgICBnZXRMYXllcnMoKSB7XG4gICAgICAgIHJldHVybiB0aGlzLmNoaWxkcmVuO1xuICAgIH1cbiAgICBfYmluZENvbnRlbnRFdmVudHMoKSB7XG4gICAgICAgIGlmICghS29udmEuaXNCcm93c2VyKSB7XG4gICAgICAgICAgICByZXR1cm47XG4gICAgICAgIH1cbiAgICAgICAgRVZFTlRTLmZvckVhY2goKFtldmVudCwgbWV0aG9kTmFtZV0pID0+IHtcbiAgICAgICAgICAgIHRoaXMuY29udGVudC5hZGRFdmVudExpc3RlbmVyKGV2ZW50LCAoZXZ0KSA9PiB7XG4gICAgICAgICAgICAgICAgdGhpc1ttZXRob2ROYW1lXShldnQpO1xuICAgICAgICAgICAgfSwgeyBwYXNzaXZlOiBmYWxzZSB9KTtcbiAgICAgICAgfSk7XG4gICAgfVxuICAgIF9wb2ludGVyZW50ZXIoZXZ0KSB7XG4gICAgICAgIHRoaXMuc2V0UG9pbnRlcnNQb3NpdGlvbnMoZXZ0KTtcbiAgICAgICAgY29uc3QgZXZlbnRzID0gZ2V0RXZlbnRzTWFwKGV2dC50eXBlKTtcbiAgICAgICAgdGhpcy5fZmlyZShldmVudHMucG9pbnRlcmVudGVyLCB7XG4gICAgICAgICAgICBldnQ6IGV2dCxcbiAgICAgICAgICAgIHRhcmdldDogdGhpcyxcbiAgICAgICAgICAgIGN1cnJlbnRUYXJnZXQ6IHRoaXMsXG4gICAgICAgIH0pO1xuICAgIH1cbiAgICBfcG9pbnRlcm92ZXIoZXZ0KSB7XG4gICAgICAgIHRoaXMuc2V0UG9pbnRlcnNQb3NpdGlvbnMoZXZ0KTtcbiAgICAgICAgY29uc3QgZXZlbnRzID0gZ2V0RXZlbnRzTWFwKGV2dC50eXBlKTtcbiAgICAgICAgdGhpcy5fZmlyZShldmVudHMucG9pbnRlcm92ZXIsIHtcbiAgICAgICAgICAgIGV2dDogZXZ0LFxuICAgICAgICAgICAgdGFyZ2V0OiB0aGlzLFxuICAgICAgICAgICAgY3VycmVudFRhcmdldDogdGhpcyxcbiAgICAgICAgfSk7XG4gICAgfVxuICAgIF9nZXRUYXJnZXRTaGFwZShldmVuVHlwZSkge1xuICAgICAgICBsZXQgc2hhcGUgPSB0aGlzW2V2ZW5UeXBlICsgJ3RhcmdldFNoYXBlJ107XG4gICAgICAgIGlmIChzaGFwZSAmJiAhc2hhcGUuZ2V0U3RhZ2UoKSkge1xuICAgICAgICAgICAgc2hhcGUgPSBudWxsO1xuICAgICAgICB9XG4gICAgICAgIHJldHVybiBzaGFwZTtcbiAgICB9XG4gICAgX3BvaW50ZXJsZWF2ZShldnQpIHtcbiAgICAgICAgY29uc3QgZXZlbnRzID0gZ2V0RXZlbnRzTWFwKGV2dC50eXBlKTtcbiAgICAgICAgY29uc3QgZXZlbnRUeXBlID0gZ2V0RXZlbnRUeXBlKGV2dC50eXBlKTtcbiAgICAgICAgaWYgKCFldmVudHMpIHtcbiAgICAgICAgICAgIHJldHVybjtcbiAgICAgICAgfVxuICAgICAgICB0aGlzLnNldFBvaW50ZXJzUG9zaXRpb25zKGV2dCk7XG4gICAgICAgIHZhciB0YXJnZXRTaGFwZSA9IHRoaXMuX2dldFRhcmdldFNoYXBlKGV2ZW50VHlwZSk7XG4gICAgICAgIHZhciBldmVudHNFbmFibGVkID0gIURELmlzRHJhZ2dpbmcgfHwgS29udmEuaGl0T25EcmFnRW5hYmxlZDtcbiAgICAgICAgaWYgKHRhcmdldFNoYXBlICYmIGV2ZW50c0VuYWJsZWQpIHtcbiAgICAgICAgICAgIHRhcmdldFNoYXBlLl9maXJlQW5kQnViYmxlKGV2ZW50cy5wb2ludGVyb3V0LCB7IGV2dDogZXZ0IH0pO1xuICAgICAgICAgICAgdGFyZ2V0U2hhcGUuX2ZpcmVBbmRCdWJibGUoZXZlbnRzLnBvaW50ZXJsZWF2ZSwgeyBldnQ6IGV2dCB9KTtcbiAgICAgICAgICAgIHRoaXMuX2ZpcmUoZXZlbnRzLnBvaW50ZXJsZWF2ZSwge1xuICAgICAgICAgICAgICAgIGV2dDogZXZ0LFxuICAgICAgICAgICAgICAgIHRhcmdldDogdGhpcyxcbiAgICAgICAgICAgICAgICBjdXJyZW50VGFyZ2V0OiB0aGlzLFxuICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICB0aGlzW2V2ZW50VHlwZSArICd0YXJnZXRTaGFwZSddID0gbnVsbDtcbiAgICAgICAgfVxuICAgICAgICBlbHNlIGlmIChldmVudHNFbmFibGVkKSB7XG4gICAgICAgICAgICB0aGlzLl9maXJlKGV2ZW50cy5wb2ludGVybGVhdmUsIHtcbiAgICAgICAgICAgICAgICBldnQ6IGV2dCxcbiAgICAgICAgICAgICAgICB0YXJnZXQ6IHRoaXMsXG4gICAgICAgICAgICAgICAgY3VycmVudFRhcmdldDogdGhpcyxcbiAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgdGhpcy5fZmlyZShldmVudHMucG9pbnRlcm91dCwge1xuICAgICAgICAgICAgICAgIGV2dDogZXZ0LFxuICAgICAgICAgICAgICAgIHRhcmdldDogdGhpcyxcbiAgICAgICAgICAgICAgICBjdXJyZW50VGFyZ2V0OiB0aGlzLFxuICAgICAgICAgICAgfSk7XG4gICAgICAgIH1cbiAgICAgICAgdGhpcy5wb2ludGVyUG9zID0gdW5kZWZpbmVkO1xuICAgICAgICB0aGlzLl9wb2ludGVyUG9zaXRpb25zID0gW107XG4gICAgfVxuICAgIF9wb2ludGVyZG93bihldnQpIHtcbiAgICAgICAgY29uc3QgZXZlbnRzID0gZ2V0RXZlbnRzTWFwKGV2dC50eXBlKTtcbiAgICAgICAgY29uc3QgZXZlbnRUeXBlID0gZ2V0RXZlbnRUeXBlKGV2dC50eXBlKTtcbiAgICAgICAgaWYgKCFldmVudHMpIHtcbiAgICAgICAgICAgIHJldHVybjtcbiAgICAgICAgfVxuICAgICAgICB0aGlzLnNldFBvaW50ZXJzUG9zaXRpb25zKGV2dCk7XG4gICAgICAgIHZhciB0cmlnZ2VyZWRPblNoYXBlID0gZmFsc2U7XG4gICAgICAgIHRoaXMuX2NoYW5nZWRQb2ludGVyUG9zaXRpb25zLmZvckVhY2goKHBvcykgPT4ge1xuICAgICAgICAgICAgdmFyIHNoYXBlID0gdGhpcy5nZXRJbnRlcnNlY3Rpb24ocG9zKTtcbiAgICAgICAgICAgIERELmp1c3REcmFnZ2VkID0gZmFsc2U7XG4gICAgICAgICAgICBLb252YVsnXycgKyBldmVudFR5cGUgKyAnTGlzdGVuQ2xpY2snXSA9IHRydWU7XG4gICAgICAgICAgICBjb25zdCBoYXNTaGFwZSA9IHNoYXBlICYmIHNoYXBlLmlzTGlzdGVuaW5nKCk7XG4gICAgICAgICAgICBpZiAoIWhhc1NoYXBlKSB7XG4gICAgICAgICAgICAgICAgcmV0dXJuO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgaWYgKEtvbnZhLmNhcHR1cmVQb2ludGVyRXZlbnRzRW5hYmxlZCkge1xuICAgICAgICAgICAgICAgIHNoYXBlLnNldFBvaW50ZXJDYXB0dXJlKHBvcy5pZCk7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICB0aGlzW2V2ZW50VHlwZSArICdDbGlja1N0YXJ0U2hhcGUnXSA9IHNoYXBlO1xuICAgICAgICAgICAgc2hhcGUuX2ZpcmVBbmRCdWJibGUoZXZlbnRzLnBvaW50ZXJkb3duLCB7XG4gICAgICAgICAgICAgICAgZXZ0OiBldnQsXG4gICAgICAgICAgICAgICAgcG9pbnRlcklkOiBwb3MuaWQsXG4gICAgICAgICAgICB9KTtcbiAgICAgICAgICAgIHRyaWdnZXJlZE9uU2hhcGUgPSB0cnVlO1xuICAgICAgICAgICAgY29uc3QgaXNUb3VjaCA9IGV2dC50eXBlLmluZGV4T2YoJ3RvdWNoJykgPj0gMDtcbiAgICAgICAgICAgIGlmIChzaGFwZS5wcmV2ZW50RGVmYXVsdCgpICYmIGV2dC5jYW5jZWxhYmxlICYmIGlzVG91Y2gpIHtcbiAgICAgICAgICAgICAgICBldnQucHJldmVudERlZmF1bHQoKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfSk7XG4gICAgICAgIGlmICghdHJpZ2dlcmVkT25TaGFwZSkge1xuICAgICAgICAgICAgdGhpcy5fZmlyZShldmVudHMucG9pbnRlcmRvd24sIHtcbiAgICAgICAgICAgICAgICBldnQ6IGV2dCxcbiAgICAgICAgICAgICAgICB0YXJnZXQ6IHRoaXMsXG4gICAgICAgICAgICAgICAgY3VycmVudFRhcmdldDogdGhpcyxcbiAgICAgICAgICAgICAgICBwb2ludGVySWQ6IHRoaXMuX3BvaW50ZXJQb3NpdGlvbnNbMF0uaWQsXG4gICAgICAgICAgICB9KTtcbiAgICAgICAgfVxuICAgIH1cbiAgICBfcG9pbnRlcm1vdmUoZXZ0KSB7XG4gICAgICAgIGNvbnN0IGV2ZW50cyA9IGdldEV2ZW50c01hcChldnQudHlwZSk7XG4gICAgICAgIGNvbnN0IGV2ZW50VHlwZSA9IGdldEV2ZW50VHlwZShldnQudHlwZSk7XG4gICAgICAgIGlmICghZXZlbnRzKSB7XG4gICAgICAgICAgICByZXR1cm47XG4gICAgICAgIH1cbiAgICAgICAgaWYgKERELmlzRHJhZ2dpbmcgJiYgREQubm9kZS5wcmV2ZW50RGVmYXVsdCgpICYmIGV2dC5jYW5jZWxhYmxlKSB7XG4gICAgICAgICAgICBldnQucHJldmVudERlZmF1bHQoKTtcbiAgICAgICAgfVxuICAgICAgICB0aGlzLnNldFBvaW50ZXJzUG9zaXRpb25zKGV2dCk7XG4gICAgICAgIHZhciBldmVudHNFbmFibGVkID0gIURELmlzRHJhZ2dpbmcgfHwgS29udmEuaGl0T25EcmFnRW5hYmxlZDtcbiAgICAgICAgaWYgKCFldmVudHNFbmFibGVkKSB7XG4gICAgICAgICAgICByZXR1cm47XG4gICAgICAgIH1cbiAgICAgICAgdmFyIHByb2Nlc3NlZFNoYXBlc0lkcyA9IHt9O1xuICAgICAgICBsZXQgdHJpZ2dlcmVkT25TaGFwZSA9IGZhbHNlO1xuICAgICAgICB2YXIgdGFyZ2V0U2hhcGUgPSB0aGlzLl9nZXRUYXJnZXRTaGFwZShldmVudFR5cGUpO1xuICAgICAgICB0aGlzLl9jaGFuZ2VkUG9pbnRlclBvc2l0aW9ucy5mb3JFYWNoKChwb3MpID0+IHtcbiAgICAgICAgICAgIGNvbnN0IHNoYXBlID0gKFBvaW50ZXJFdmVudHMuZ2V0Q2FwdHVyZWRTaGFwZShwb3MuaWQpIHx8XG4gICAgICAgICAgICAgICAgdGhpcy5nZXRJbnRlcnNlY3Rpb24ocG9zKSk7XG4gICAgICAgICAgICBjb25zdCBwb2ludGVySWQgPSBwb3MuaWQ7XG4gICAgICAgICAgICBjb25zdCBldmVudCA9IHsgZXZ0OiBldnQsIHBvaW50ZXJJZCB9O1xuICAgICAgICAgICAgdmFyIGRpZmZlcmVudFRhcmdldCA9IHRhcmdldFNoYXBlICE9PSBzaGFwZTtcbiAgICAgICAgICAgIGlmIChkaWZmZXJlbnRUYXJnZXQgJiYgdGFyZ2V0U2hhcGUpIHtcbiAgICAgICAgICAgICAgICB0YXJnZXRTaGFwZS5fZmlyZUFuZEJ1YmJsZShldmVudHMucG9pbnRlcm91dCwgT2JqZWN0LmFzc2lnbih7fSwgZXZlbnQpLCBzaGFwZSk7XG4gICAgICAgICAgICAgICAgdGFyZ2V0U2hhcGUuX2ZpcmVBbmRCdWJibGUoZXZlbnRzLnBvaW50ZXJsZWF2ZSwgT2JqZWN0LmFzc2lnbih7fSwgZXZlbnQpLCBzaGFwZSk7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBpZiAoc2hhcGUpIHtcbiAgICAgICAgICAgICAgICBpZiAocHJvY2Vzc2VkU2hhcGVzSWRzW3NoYXBlLl9pZF0pIHtcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICBwcm9jZXNzZWRTaGFwZXNJZHNbc2hhcGUuX2lkXSA9IHRydWU7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBpZiAoc2hhcGUgJiYgc2hhcGUuaXNMaXN0ZW5pbmcoKSkge1xuICAgICAgICAgICAgICAgIHRyaWdnZXJlZE9uU2hhcGUgPSB0cnVlO1xuICAgICAgICAgICAgICAgIGlmIChkaWZmZXJlbnRUYXJnZXQpIHtcbiAgICAgICAgICAgICAgICAgICAgc2hhcGUuX2ZpcmVBbmRCdWJibGUoZXZlbnRzLnBvaW50ZXJvdmVyLCBPYmplY3QuYXNzaWduKHt9LCBldmVudCksIHRhcmdldFNoYXBlKTtcbiAgICAgICAgICAgICAgICAgICAgc2hhcGUuX2ZpcmVBbmRCdWJibGUoZXZlbnRzLnBvaW50ZXJlbnRlciwgT2JqZWN0LmFzc2lnbih7fSwgZXZlbnQpLCB0YXJnZXRTaGFwZSk7XG4gICAgICAgICAgICAgICAgICAgIHRoaXNbZXZlbnRUeXBlICsgJ3RhcmdldFNoYXBlJ10gPSBzaGFwZTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgc2hhcGUuX2ZpcmVBbmRCdWJibGUoZXZlbnRzLnBvaW50ZXJtb3ZlLCBPYmplY3QuYXNzaWduKHt9LCBldmVudCkpO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgZWxzZSB7XG4gICAgICAgICAgICAgICAgaWYgKHRhcmdldFNoYXBlKSB7XG4gICAgICAgICAgICAgICAgICAgIHRoaXMuX2ZpcmUoZXZlbnRzLnBvaW50ZXJvdmVyLCB7XG4gICAgICAgICAgICAgICAgICAgICAgICBldnQ6IGV2dCxcbiAgICAgICAgICAgICAgICAgICAgICAgIHRhcmdldDogdGhpcyxcbiAgICAgICAgICAgICAgICAgICAgICAgIGN1cnJlbnRUYXJnZXQ6IHRoaXMsXG4gICAgICAgICAgICAgICAgICAgICAgICBwb2ludGVySWQsXG4gICAgICAgICAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgICAgICAgICB0aGlzW2V2ZW50VHlwZSArICd0YXJnZXRTaGFwZSddID0gbnVsbDtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9XG4gICAgICAgIH0pO1xuICAgICAgICBpZiAoIXRyaWdnZXJlZE9uU2hhcGUpIHtcbiAgICAgICAgICAgIHRoaXMuX2ZpcmUoZXZlbnRzLnBvaW50ZXJtb3ZlLCB7XG4gICAgICAgICAgICAgICAgZXZ0OiBldnQsXG4gICAgICAgICAgICAgICAgdGFyZ2V0OiB0aGlzLFxuICAgICAgICAgICAgICAgIGN1cnJlbnRUYXJnZXQ6IHRoaXMsXG4gICAgICAgICAgICAgICAgcG9pbnRlcklkOiB0aGlzLl9jaGFuZ2VkUG9pbnRlclBvc2l0aW9uc1swXS5pZCxcbiAgICAgICAgICAgIH0pO1xuICAgICAgICB9XG4gICAgfVxuICAgIF9wb2ludGVydXAoZXZ0KSB7XG4gICAgICAgIGNvbnN0IGV2ZW50cyA9IGdldEV2ZW50c01hcChldnQudHlwZSk7XG4gICAgICAgIGNvbnN0IGV2ZW50VHlwZSA9IGdldEV2ZW50VHlwZShldnQudHlwZSk7XG4gICAgICAgIGlmICghZXZlbnRzKSB7XG4gICAgICAgICAgICByZXR1cm47XG4gICAgICAgIH1cbiAgICAgICAgdGhpcy5zZXRQb2ludGVyc1Bvc2l0aW9ucyhldnQpO1xuICAgICAgICBjb25zdCBjbGlja1N0YXJ0U2hhcGUgPSB0aGlzW2V2ZW50VHlwZSArICdDbGlja1N0YXJ0U2hhcGUnXTtcbiAgICAgICAgY29uc3QgY2xpY2tFbmRTaGFwZSA9IHRoaXNbZXZlbnRUeXBlICsgJ0NsaWNrRW5kU2hhcGUnXTtcbiAgICAgICAgdmFyIHByb2Nlc3NlZFNoYXBlc0lkcyA9IHt9O1xuICAgICAgICBsZXQgdHJpZ2dlcmVkT25TaGFwZSA9IGZhbHNlO1xuICAgICAgICB0aGlzLl9jaGFuZ2VkUG9pbnRlclBvc2l0aW9ucy5mb3JFYWNoKChwb3MpID0+IHtcbiAgICAgICAgICAgIGNvbnN0IHNoYXBlID0gKFBvaW50ZXJFdmVudHMuZ2V0Q2FwdHVyZWRTaGFwZShwb3MuaWQpIHx8XG4gICAgICAgICAgICAgICAgdGhpcy5nZXRJbnRlcnNlY3Rpb24ocG9zKSk7XG4gICAgICAgICAgICBpZiAoc2hhcGUpIHtcbiAgICAgICAgICAgICAgICBzaGFwZS5yZWxlYXNlQ2FwdHVyZShwb3MuaWQpO1xuICAgICAgICAgICAgICAgIGlmIChwcm9jZXNzZWRTaGFwZXNJZHNbc2hhcGUuX2lkXSkge1xuICAgICAgICAgICAgICAgICAgICByZXR1cm47XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIHByb2Nlc3NlZFNoYXBlc0lkc1tzaGFwZS5faWRdID0gdHJ1ZTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGNvbnN0IHBvaW50ZXJJZCA9IHBvcy5pZDtcbiAgICAgICAgICAgIGNvbnN0IGV2ZW50ID0geyBldnQ6IGV2dCwgcG9pbnRlcklkIH07XG4gICAgICAgICAgICBsZXQgZmlyZURibENsaWNrID0gZmFsc2U7XG4gICAgICAgICAgICBpZiAoS29udmFbJ18nICsgZXZlbnRUeXBlICsgJ0luRGJsQ2xpY2tXaW5kb3cnXSkge1xuICAgICAgICAgICAgICAgIGZpcmVEYmxDbGljayA9IHRydWU7XG4gICAgICAgICAgICAgICAgY2xlYXJUaW1lb3V0KHRoaXNbZXZlbnRUeXBlICsgJ0RibFRpbWVvdXQnXSk7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBlbHNlIGlmICghREQuanVzdERyYWdnZWQpIHtcbiAgICAgICAgICAgICAgICBLb252YVsnXycgKyBldmVudFR5cGUgKyAnSW5EYmxDbGlja1dpbmRvdyddID0gdHJ1ZTtcbiAgICAgICAgICAgICAgICBjbGVhclRpbWVvdXQodGhpc1tldmVudFR5cGUgKyAnRGJsVGltZW91dCddKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIHRoaXNbZXZlbnRUeXBlICsgJ0RibFRpbWVvdXQnXSA9IHNldFRpbWVvdXQoZnVuY3Rpb24gKCkge1xuICAgICAgICAgICAgICAgIEtvbnZhWydfJyArIGV2ZW50VHlwZSArICdJbkRibENsaWNrV2luZG93J10gPSBmYWxzZTtcbiAgICAgICAgICAgIH0sIEtvbnZhLmRibENsaWNrV2luZG93KTtcbiAgICAgICAgICAgIGlmIChzaGFwZSAmJiBzaGFwZS5pc0xpc3RlbmluZygpKSB7XG4gICAgICAgICAgICAgICAgdHJpZ2dlcmVkT25TaGFwZSA9IHRydWU7XG4gICAgICAgICAgICAgICAgdGhpc1tldmVudFR5cGUgKyAnQ2xpY2tFbmRTaGFwZSddID0gc2hhcGU7XG4gICAgICAgICAgICAgICAgc2hhcGUuX2ZpcmVBbmRCdWJibGUoZXZlbnRzLnBvaW50ZXJ1cCwgT2JqZWN0LmFzc2lnbih7fSwgZXZlbnQpKTtcbiAgICAgICAgICAgICAgICBpZiAoS29udmFbJ18nICsgZXZlbnRUeXBlICsgJ0xpc3RlbkNsaWNrJ10gJiZcbiAgICAgICAgICAgICAgICAgICAgY2xpY2tTdGFydFNoYXBlICYmXG4gICAgICAgICAgICAgICAgICAgIGNsaWNrU3RhcnRTaGFwZSA9PT0gc2hhcGUpIHtcbiAgICAgICAgICAgICAgICAgICAgc2hhcGUuX2ZpcmVBbmRCdWJibGUoZXZlbnRzLnBvaW50ZXJjbGljaywgT2JqZWN0LmFzc2lnbih7fSwgZXZlbnQpKTtcbiAgICAgICAgICAgICAgICAgICAgaWYgKGZpcmVEYmxDbGljayAmJiBjbGlja0VuZFNoYXBlICYmIGNsaWNrRW5kU2hhcGUgPT09IHNoYXBlKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICBzaGFwZS5fZmlyZUFuZEJ1YmJsZShldmVudHMucG9pbnRlcmRibGNsaWNrLCBPYmplY3QuYXNzaWduKHt9LCBldmVudCkpO1xuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfVxuICAgICAgICAgICAgZWxzZSB7XG4gICAgICAgICAgICAgICAgdGhpc1tldmVudFR5cGUgKyAnQ2xpY2tFbmRTaGFwZSddID0gbnVsbDtcbiAgICAgICAgICAgICAgICBpZiAoS29udmFbJ18nICsgZXZlbnRUeXBlICsgJ0xpc3RlbkNsaWNrJ10pIHtcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5fZmlyZShldmVudHMucG9pbnRlcmNsaWNrLCB7XG4gICAgICAgICAgICAgICAgICAgICAgICBldnQ6IGV2dCxcbiAgICAgICAgICAgICAgICAgICAgICAgIHRhcmdldDogdGhpcyxcbiAgICAgICAgICAgICAgICAgICAgICAgIGN1cnJlbnRUYXJnZXQ6IHRoaXMsXG4gICAgICAgICAgICAgICAgICAgICAgICBwb2ludGVySWQsXG4gICAgICAgICAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICBpZiAoZmlyZURibENsaWNrKSB7XG4gICAgICAgICAgICAgICAgICAgIHRoaXMuX2ZpcmUoZXZlbnRzLnBvaW50ZXJkYmxjbGljaywge1xuICAgICAgICAgICAgICAgICAgICAgICAgZXZ0OiBldnQsXG4gICAgICAgICAgICAgICAgICAgICAgICB0YXJnZXQ6IHRoaXMsXG4gICAgICAgICAgICAgICAgICAgICAgICBjdXJyZW50VGFyZ2V0OiB0aGlzLFxuICAgICAgICAgICAgICAgICAgICAgICAgcG9pbnRlcklkLFxuICAgICAgICAgICAgICAgICAgICB9KTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9XG4gICAgICAgIH0pO1xuICAgICAgICBpZiAoIXRyaWdnZXJlZE9uU2hhcGUpIHtcbiAgICAgICAgICAgIHRoaXMuX2ZpcmUoZXZlbnRzLnBvaW50ZXJ1cCwge1xuICAgICAgICAgICAgICAgIGV2dDogZXZ0LFxuICAgICAgICAgICAgICAgIHRhcmdldDogdGhpcyxcbiAgICAgICAgICAgICAgICBjdXJyZW50VGFyZ2V0OiB0aGlzLFxuICAgICAgICAgICAgICAgIHBvaW50ZXJJZDogdGhpcy5fY2hhbmdlZFBvaW50ZXJQb3NpdGlvbnNbMF0uaWQsXG4gICAgICAgICAgICB9KTtcbiAgICAgICAgfVxuICAgICAgICBLb252YVsnXycgKyBldmVudFR5cGUgKyAnTGlzdGVuQ2xpY2snXSA9IGZhbHNlO1xuICAgICAgICBpZiAoZXZ0LmNhbmNlbGFibGUgJiYgZXZlbnRUeXBlICE9PSAndG91Y2gnKSB7XG4gICAgICAgICAgICBldnQucHJldmVudERlZmF1bHQoKTtcbiAgICAgICAgfVxuICAgIH1cbiAgICBfY29udGV4dG1lbnUoZXZ0KSB7XG4gICAgICAgIHRoaXMuc2V0UG9pbnRlcnNQb3NpdGlvbnMoZXZ0KTtcbiAgICAgICAgdmFyIHNoYXBlID0gdGhpcy5nZXRJbnRlcnNlY3Rpb24odGhpcy5nZXRQb2ludGVyUG9zaXRpb24oKSk7XG4gICAgICAgIGlmIChzaGFwZSAmJiBzaGFwZS5pc0xpc3RlbmluZygpKSB7XG4gICAgICAgICAgICBzaGFwZS5fZmlyZUFuZEJ1YmJsZShDT05URVhUTUVOVSwgeyBldnQ6IGV2dCB9KTtcbiAgICAgICAgfVxuICAgICAgICBlbHNlIHtcbiAgICAgICAgICAgIHRoaXMuX2ZpcmUoQ09OVEVYVE1FTlUsIHtcbiAgICAgICAgICAgICAgICBldnQ6IGV2dCxcbiAgICAgICAgICAgICAgICB0YXJnZXQ6IHRoaXMsXG4gICAgICAgICAgICAgICAgY3VycmVudFRhcmdldDogdGhpcyxcbiAgICAgICAgICAgIH0pO1xuICAgICAgICB9XG4gICAgfVxuICAgIF93aGVlbChldnQpIHtcbiAgICAgICAgdGhpcy5zZXRQb2ludGVyc1Bvc2l0aW9ucyhldnQpO1xuICAgICAgICB2YXIgc2hhcGUgPSB0aGlzLmdldEludGVyc2VjdGlvbih0aGlzLmdldFBvaW50ZXJQb3NpdGlvbigpKTtcbiAgICAgICAgaWYgKHNoYXBlICYmIHNoYXBlLmlzTGlzdGVuaW5nKCkpIHtcbiAgICAgICAgICAgIHNoYXBlLl9maXJlQW5kQnViYmxlKFdIRUVMLCB7IGV2dDogZXZ0IH0pO1xuICAgICAgICB9XG4gICAgICAgIGVsc2Uge1xuICAgICAgICAgICAgdGhpcy5fZmlyZShXSEVFTCwge1xuICAgICAgICAgICAgICAgIGV2dDogZXZ0LFxuICAgICAgICAgICAgICAgIHRhcmdldDogdGhpcyxcbiAgICAgICAgICAgICAgICBjdXJyZW50VGFyZ2V0OiB0aGlzLFxuICAgICAgICAgICAgfSk7XG4gICAgICAgIH1cbiAgICB9XG4gICAgX3BvaW50ZXJjYW5jZWwoZXZ0KSB7XG4gICAgICAgIHRoaXMuc2V0UG9pbnRlcnNQb3NpdGlvbnMoZXZ0KTtcbiAgICAgICAgY29uc3Qgc2hhcGUgPSBQb2ludGVyRXZlbnRzLmdldENhcHR1cmVkU2hhcGUoZXZ0LnBvaW50ZXJJZCkgfHxcbiAgICAgICAgICAgIHRoaXMuZ2V0SW50ZXJzZWN0aW9uKHRoaXMuZ2V0UG9pbnRlclBvc2l0aW9uKCkpO1xuICAgICAgICBpZiAoc2hhcGUpIHtcbiAgICAgICAgICAgIHNoYXBlLl9maXJlQW5kQnViYmxlKFBPSU5URVJVUCwgUG9pbnRlckV2ZW50cy5jcmVhdGVFdmVudChldnQpKTtcbiAgICAgICAgfVxuICAgICAgICBQb2ludGVyRXZlbnRzLnJlbGVhc2VDYXB0dXJlKGV2dC5wb2ludGVySWQpO1xuICAgIH1cbiAgICBfbG9zdHBvaW50ZXJjYXB0dXJlKGV2dCkge1xuICAgICAgICBQb2ludGVyRXZlbnRzLnJlbGVhc2VDYXB0dXJlKGV2dC5wb2ludGVySWQpO1xuICAgIH1cbiAgICBzZXRQb2ludGVyc1Bvc2l0aW9ucyhldnQpIHtcbiAgICAgICAgdmFyIGNvbnRlbnRQb3NpdGlvbiA9IHRoaXMuX2dldENvbnRlbnRQb3NpdGlvbigpLCB4ID0gbnVsbCwgeSA9IG51bGw7XG4gICAgICAgIGV2dCA9IGV2dCA/IGV2dCA6IHdpbmRvdy5ldmVudDtcbiAgICAgICAgaWYgKGV2dC50b3VjaGVzICE9PSB1bmRlZmluZWQpIHtcbiAgICAgICAgICAgIHRoaXMuX3BvaW50ZXJQb3NpdGlvbnMgPSBbXTtcbiAgICAgICAgICAgIHRoaXMuX2NoYW5nZWRQb2ludGVyUG9zaXRpb25zID0gW107XG4gICAgICAgICAgICBBcnJheS5wcm90b3R5cGUuZm9yRWFjaC5jYWxsKGV2dC50b3VjaGVzLCAodG91Y2gpID0+IHtcbiAgICAgICAgICAgICAgICB0aGlzLl9wb2ludGVyUG9zaXRpb25zLnB1c2goe1xuICAgICAgICAgICAgICAgICAgICBpZDogdG91Y2guaWRlbnRpZmllcixcbiAgICAgICAgICAgICAgICAgICAgeDogKHRvdWNoLmNsaWVudFggLSBjb250ZW50UG9zaXRpb24ubGVmdCkgLyBjb250ZW50UG9zaXRpb24uc2NhbGVYLFxuICAgICAgICAgICAgICAgICAgICB5OiAodG91Y2guY2xpZW50WSAtIGNvbnRlbnRQb3NpdGlvbi50b3ApIC8gY29udGVudFBvc2l0aW9uLnNjYWxlWSxcbiAgICAgICAgICAgICAgICB9KTtcbiAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgQXJyYXkucHJvdG90eXBlLmZvckVhY2guY2FsbChldnQuY2hhbmdlZFRvdWNoZXMgfHwgZXZ0LnRvdWNoZXMsICh0b3VjaCkgPT4ge1xuICAgICAgICAgICAgICAgIHRoaXMuX2NoYW5nZWRQb2ludGVyUG9zaXRpb25zLnB1c2goe1xuICAgICAgICAgICAgICAgICAgICBpZDogdG91Y2guaWRlbnRpZmllcixcbiAgICAgICAgICAgICAgICAgICAgeDogKHRvdWNoLmNsaWVudFggLSBjb250ZW50UG9zaXRpb24ubGVmdCkgLyBjb250ZW50UG9zaXRpb24uc2NhbGVYLFxuICAgICAgICAgICAgICAgICAgICB5OiAodG91Y2guY2xpZW50WSAtIGNvbnRlbnRQb3NpdGlvbi50b3ApIC8gY29udGVudFBvc2l0aW9uLnNjYWxlWSxcbiAgICAgICAgICAgICAgICB9KTtcbiAgICAgICAgICAgIH0pO1xuICAgICAgICB9XG4gICAgICAgIGVsc2Uge1xuICAgICAgICAgICAgeCA9IChldnQuY2xpZW50WCAtIGNvbnRlbnRQb3NpdGlvbi5sZWZ0KSAvIGNvbnRlbnRQb3NpdGlvbi5zY2FsZVg7XG4gICAgICAgICAgICB5ID0gKGV2dC5jbGllbnRZIC0gY29udGVudFBvc2l0aW9uLnRvcCkgLyBjb250ZW50UG9zaXRpb24uc2NhbGVZO1xuICAgICAgICAgICAgdGhpcy5wb2ludGVyUG9zID0ge1xuICAgICAgICAgICAgICAgIHg6IHgsXG4gICAgICAgICAgICAgICAgeTogeSxcbiAgICAgICAgICAgIH07XG4gICAgICAgICAgICB0aGlzLl9wb2ludGVyUG9zaXRpb25zID0gW3sgeCwgeSwgaWQ6IFV0aWwuX2dldEZpcnN0UG9pbnRlcklkKGV2dCkgfV07XG4gICAgICAgICAgICB0aGlzLl9jaGFuZ2VkUG9pbnRlclBvc2l0aW9ucyA9IFtcbiAgICAgICAgICAgICAgICB7IHgsIHksIGlkOiBVdGlsLl9nZXRGaXJzdFBvaW50ZXJJZChldnQpIH0sXG4gICAgICAgICAgICBdO1xuICAgICAgICB9XG4gICAgfVxuICAgIF9zZXRQb2ludGVyUG9zaXRpb24oZXZ0KSB7XG4gICAgICAgIFV0aWwud2FybignTWV0aG9kIF9zZXRQb2ludGVyUG9zaXRpb24gaXMgZGVwcmVjYXRlZC4gVXNlIFwic3RhZ2Uuc2V0UG9pbnRlcnNQb3NpdGlvbnMoZXZlbnQpXCIgaW5zdGVhZC4nKTtcbiAgICAgICAgdGhpcy5zZXRQb2ludGVyc1Bvc2l0aW9ucyhldnQpO1xuICAgIH1cbiAgICBfZ2V0Q29udGVudFBvc2l0aW9uKCkge1xuICAgICAgICBpZiAoIXRoaXMuY29udGVudCB8fCAhdGhpcy5jb250ZW50LmdldEJvdW5kaW5nQ2xpZW50UmVjdCkge1xuICAgICAgICAgICAgcmV0dXJuIHtcbiAgICAgICAgICAgICAgICB0b3A6IDAsXG4gICAgICAgICAgICAgICAgbGVmdDogMCxcbiAgICAgICAgICAgICAgICBzY2FsZVg6IDEsXG4gICAgICAgICAgICAgICAgc2NhbGVZOiAxLFxuICAgICAgICAgICAgfTtcbiAgICAgICAgfVxuICAgICAgICB2YXIgcmVjdCA9IHRoaXMuY29udGVudC5nZXRCb3VuZGluZ0NsaWVudFJlY3QoKTtcbiAgICAgICAgcmV0dXJuIHtcbiAgICAgICAgICAgIHRvcDogcmVjdC50b3AsXG4gICAgICAgICAgICBsZWZ0OiByZWN0LmxlZnQsXG4gICAgICAgICAgICBzY2FsZVg6IHJlY3Qud2lkdGggLyB0aGlzLmNvbnRlbnQuY2xpZW50V2lkdGggfHwgMSxcbiAgICAgICAgICAgIHNjYWxlWTogcmVjdC5oZWlnaHQgLyB0aGlzLmNvbnRlbnQuY2xpZW50SGVpZ2h0IHx8IDEsXG4gICAgICAgIH07XG4gICAgfVxuICAgIF9idWlsZERPTSgpIHtcbiAgICAgICAgdGhpcy5idWZmZXJDYW52YXMgPSBuZXcgU2NlbmVDYW52YXMoe1xuICAgICAgICAgICAgd2lkdGg6IHRoaXMud2lkdGgoKSxcbiAgICAgICAgICAgIGhlaWdodDogdGhpcy5oZWlnaHQoKSxcbiAgICAgICAgfSk7XG4gICAgICAgIHRoaXMuYnVmZmVySGl0Q2FudmFzID0gbmV3IEhpdENhbnZhcyh7XG4gICAgICAgICAgICBwaXhlbFJhdGlvOiAxLFxuICAgICAgICAgICAgd2lkdGg6IHRoaXMud2lkdGgoKSxcbiAgICAgICAgICAgIGhlaWdodDogdGhpcy5oZWlnaHQoKSxcbiAgICAgICAgfSk7XG4gICAgICAgIGlmICghS29udmEuaXNCcm93c2VyKSB7XG4gICAgICAgICAgICByZXR1cm47XG4gICAgICAgIH1cbiAgICAgICAgdmFyIGNvbnRhaW5lciA9IHRoaXMuY29udGFpbmVyKCk7XG4gICAgICAgIGlmICghY29udGFpbmVyKSB7XG4gICAgICAgICAgICB0aHJvdyAnU3RhZ2UgaGFzIG5vIGNvbnRhaW5lci4gQSBjb250YWluZXIgaXMgcmVxdWlyZWQuJztcbiAgICAgICAgfVxuICAgICAgICBjb250YWluZXIuaW5uZXJIVE1MID0gJyc7XG4gICAgICAgIHRoaXMuY29udGVudCA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2RpdicpO1xuICAgICAgICB0aGlzLmNvbnRlbnQuc3R5bGUucG9zaXRpb24gPSAncmVsYXRpdmUnO1xuICAgICAgICB0aGlzLmNvbnRlbnQuc3R5bGUudXNlclNlbGVjdCA9ICdub25lJztcbiAgICAgICAgdGhpcy5jb250ZW50LmNsYXNzTmFtZSA9ICdrb252YWpzLWNvbnRlbnQnO1xuICAgICAgICB0aGlzLmNvbnRlbnQuc2V0QXR0cmlidXRlKCdyb2xlJywgJ3ByZXNlbnRhdGlvbicpO1xuICAgICAgICBjb250YWluZXIuYXBwZW5kQ2hpbGQodGhpcy5jb250ZW50KTtcbiAgICAgICAgdGhpcy5fcmVzaXplRE9NKCk7XG4gICAgfVxuICAgIGNhY2hlKCkge1xuICAgICAgICBVdGlsLndhcm4oJ0NhY2hlIGZ1bmN0aW9uIGlzIG5vdCBhbGxvd2VkIGZvciBzdGFnZS4gWW91IG1heSB1c2UgY2FjaGUgb25seSBmb3IgbGF5ZXJzLCBncm91cHMgYW5kIHNoYXBlcy4nKTtcbiAgICAgICAgcmV0dXJuIHRoaXM7XG4gICAgfVxuICAgIGNsZWFyQ2FjaGUoKSB7XG4gICAgICAgIHJldHVybiB0aGlzO1xuICAgIH1cbiAgICBiYXRjaERyYXcoKSB7XG4gICAgICAgIHRoaXMuZ2V0Q2hpbGRyZW4oKS5mb3JFYWNoKGZ1bmN0aW9uIChsYXllcikge1xuICAgICAgICAgICAgbGF5ZXIuYmF0Y2hEcmF3KCk7XG4gICAgICAgIH0pO1xuICAgICAgICByZXR1cm4gdGhpcztcbiAgICB9XG59XG5TdGFnZS5wcm90b3R5cGUubm9kZVR5cGUgPSBTVEFHRTtcbl9yZWdpc3Rlck5vZGUoU3RhZ2UpO1xuRmFjdG9yeS5hZGRHZXR0ZXJTZXR0ZXIoU3RhZ2UsICdjb250YWluZXInKTtcbiIsImltcG9ydCB7IFV0aWwgfSBmcm9tICcuL1V0aWwuanMnO1xuaW1wb3J0IHsgQW5pbWF0aW9uIH0gZnJvbSAnLi9BbmltYXRpb24uanMnO1xuaW1wb3J0IHsgTm9kZSB9IGZyb20gJy4vTm9kZS5qcyc7XG5pbXBvcnQgeyBLb252YSB9IGZyb20gJy4vR2xvYmFsLmpzJztcbnZhciBibGFja2xpc3QgPSB7XG4gICAgbm9kZTogMSxcbiAgICBkdXJhdGlvbjogMSxcbiAgICBlYXNpbmc6IDEsXG4gICAgb25GaW5pc2g6IDEsXG4gICAgeW95bzogMSxcbn0sIFBBVVNFRCA9IDEsIFBMQVlJTkcgPSAyLCBSRVZFUlNJTkcgPSAzLCBpZENvdW50ZXIgPSAwLCBjb2xvckF0dHJzID0gWydmaWxsJywgJ3N0cm9rZScsICdzaGFkb3dDb2xvciddO1xuY2xhc3MgVHdlZW5FbmdpbmUge1xuICAgIGNvbnN0cnVjdG9yKHByb3AsIHByb3BGdW5jLCBmdW5jLCBiZWdpbiwgZmluaXNoLCBkdXJhdGlvbiwgeW95bykge1xuICAgICAgICB0aGlzLnByb3AgPSBwcm9wO1xuICAgICAgICB0aGlzLnByb3BGdW5jID0gcHJvcEZ1bmM7XG4gICAgICAgIHRoaXMuYmVnaW4gPSBiZWdpbjtcbiAgICAgICAgdGhpcy5fcG9zID0gYmVnaW47XG4gICAgICAgIHRoaXMuZHVyYXRpb24gPSBkdXJhdGlvbjtcbiAgICAgICAgdGhpcy5fY2hhbmdlID0gMDtcbiAgICAgICAgdGhpcy5wcmV2UG9zID0gMDtcbiAgICAgICAgdGhpcy55b3lvID0geW95bztcbiAgICAgICAgdGhpcy5fdGltZSA9IDA7XG4gICAgICAgIHRoaXMuX3Bvc2l0aW9uID0gMDtcbiAgICAgICAgdGhpcy5fc3RhcnRUaW1lID0gMDtcbiAgICAgICAgdGhpcy5fZmluaXNoID0gMDtcbiAgICAgICAgdGhpcy5mdW5jID0gZnVuYztcbiAgICAgICAgdGhpcy5fY2hhbmdlID0gZmluaXNoIC0gdGhpcy5iZWdpbjtcbiAgICAgICAgdGhpcy5wYXVzZSgpO1xuICAgIH1cbiAgICBmaXJlKHN0cikge1xuICAgICAgICB2YXIgaGFuZGxlciA9IHRoaXNbc3RyXTtcbiAgICAgICAgaWYgKGhhbmRsZXIpIHtcbiAgICAgICAgICAgIGhhbmRsZXIoKTtcbiAgICAgICAgfVxuICAgIH1cbiAgICBzZXRUaW1lKHQpIHtcbiAgICAgICAgaWYgKHQgPiB0aGlzLmR1cmF0aW9uKSB7XG4gICAgICAgICAgICBpZiAodGhpcy55b3lvKSB7XG4gICAgICAgICAgICAgICAgdGhpcy5fdGltZSA9IHRoaXMuZHVyYXRpb247XG4gICAgICAgICAgICAgICAgdGhpcy5yZXZlcnNlKCk7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBlbHNlIHtcbiAgICAgICAgICAgICAgICB0aGlzLmZpbmlzaCgpO1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICAgIGVsc2UgaWYgKHQgPCAwKSB7XG4gICAgICAgICAgICBpZiAodGhpcy55b3lvKSB7XG4gICAgICAgICAgICAgICAgdGhpcy5fdGltZSA9IDA7XG4gICAgICAgICAgICAgICAgdGhpcy5wbGF5KCk7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBlbHNlIHtcbiAgICAgICAgICAgICAgICB0aGlzLnJlc2V0KCk7XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgICAgZWxzZSB7XG4gICAgICAgICAgICB0aGlzLl90aW1lID0gdDtcbiAgICAgICAgICAgIHRoaXMudXBkYXRlKCk7XG4gICAgICAgIH1cbiAgICB9XG4gICAgZ2V0VGltZSgpIHtcbiAgICAgICAgcmV0dXJuIHRoaXMuX3RpbWU7XG4gICAgfVxuICAgIHNldFBvc2l0aW9uKHApIHtcbiAgICAgICAgdGhpcy5wcmV2UG9zID0gdGhpcy5fcG9zO1xuICAgICAgICB0aGlzLnByb3BGdW5jKHApO1xuICAgICAgICB0aGlzLl9wb3MgPSBwO1xuICAgIH1cbiAgICBnZXRQb3NpdGlvbih0KSB7XG4gICAgICAgIGlmICh0ID09PSB1bmRlZmluZWQpIHtcbiAgICAgICAgICAgIHQgPSB0aGlzLl90aW1lO1xuICAgICAgICB9XG4gICAgICAgIHJldHVybiB0aGlzLmZ1bmModCwgdGhpcy5iZWdpbiwgdGhpcy5fY2hhbmdlLCB0aGlzLmR1cmF0aW9uKTtcbiAgICB9XG4gICAgcGxheSgpIHtcbiAgICAgICAgdGhpcy5zdGF0ZSA9IFBMQVlJTkc7XG4gICAgICAgIHRoaXMuX3N0YXJ0VGltZSA9IHRoaXMuZ2V0VGltZXIoKSAtIHRoaXMuX3RpbWU7XG4gICAgICAgIHRoaXMub25FbnRlckZyYW1lKCk7XG4gICAgICAgIHRoaXMuZmlyZSgnb25QbGF5Jyk7XG4gICAgfVxuICAgIHJldmVyc2UoKSB7XG4gICAgICAgIHRoaXMuc3RhdGUgPSBSRVZFUlNJTkc7XG4gICAgICAgIHRoaXMuX3RpbWUgPSB0aGlzLmR1cmF0aW9uIC0gdGhpcy5fdGltZTtcbiAgICAgICAgdGhpcy5fc3RhcnRUaW1lID0gdGhpcy5nZXRUaW1lcigpIC0gdGhpcy5fdGltZTtcbiAgICAgICAgdGhpcy5vbkVudGVyRnJhbWUoKTtcbiAgICAgICAgdGhpcy5maXJlKCdvblJldmVyc2UnKTtcbiAgICB9XG4gICAgc2Vlayh0KSB7XG4gICAgICAgIHRoaXMucGF1c2UoKTtcbiAgICAgICAgdGhpcy5fdGltZSA9IHQ7XG4gICAgICAgIHRoaXMudXBkYXRlKCk7XG4gICAgICAgIHRoaXMuZmlyZSgnb25TZWVrJyk7XG4gICAgfVxuICAgIHJlc2V0KCkge1xuICAgICAgICB0aGlzLnBhdXNlKCk7XG4gICAgICAgIHRoaXMuX3RpbWUgPSAwO1xuICAgICAgICB0aGlzLnVwZGF0ZSgpO1xuICAgICAgICB0aGlzLmZpcmUoJ29uUmVzZXQnKTtcbiAgICB9XG4gICAgZmluaXNoKCkge1xuICAgICAgICB0aGlzLnBhdXNlKCk7XG4gICAgICAgIHRoaXMuX3RpbWUgPSB0aGlzLmR1cmF0aW9uO1xuICAgICAgICB0aGlzLnVwZGF0ZSgpO1xuICAgICAgICB0aGlzLmZpcmUoJ29uRmluaXNoJyk7XG4gICAgfVxuICAgIHVwZGF0ZSgpIHtcbiAgICAgICAgdGhpcy5zZXRQb3NpdGlvbih0aGlzLmdldFBvc2l0aW9uKHRoaXMuX3RpbWUpKTtcbiAgICAgICAgdGhpcy5maXJlKCdvblVwZGF0ZScpO1xuICAgIH1cbiAgICBvbkVudGVyRnJhbWUoKSB7XG4gICAgICAgIHZhciB0ID0gdGhpcy5nZXRUaW1lcigpIC0gdGhpcy5fc3RhcnRUaW1lO1xuICAgICAgICBpZiAodGhpcy5zdGF0ZSA9PT0gUExBWUlORykge1xuICAgICAgICAgICAgdGhpcy5zZXRUaW1lKHQpO1xuICAgICAgICB9XG4gICAgICAgIGVsc2UgaWYgKHRoaXMuc3RhdGUgPT09IFJFVkVSU0lORykge1xuICAgICAgICAgICAgdGhpcy5zZXRUaW1lKHRoaXMuZHVyYXRpb24gLSB0KTtcbiAgICAgICAgfVxuICAgIH1cbiAgICBwYXVzZSgpIHtcbiAgICAgICAgdGhpcy5zdGF0ZSA9IFBBVVNFRDtcbiAgICAgICAgdGhpcy5maXJlKCdvblBhdXNlJyk7XG4gICAgfVxuICAgIGdldFRpbWVyKCkge1xuICAgICAgICByZXR1cm4gbmV3IERhdGUoKS5nZXRUaW1lKCk7XG4gICAgfVxufVxuZXhwb3J0IGNsYXNzIFR3ZWVuIHtcbiAgICBjb25zdHJ1Y3Rvcihjb25maWcpIHtcbiAgICAgICAgdmFyIHRoYXQgPSB0aGlzLCBub2RlID0gY29uZmlnLm5vZGUsIG5vZGVJZCA9IG5vZGUuX2lkLCBkdXJhdGlvbiwgZWFzaW5nID0gY29uZmlnLmVhc2luZyB8fCBFYXNpbmdzLkxpbmVhciwgeW95byA9ICEhY29uZmlnLnlveW8sIGtleTtcbiAgICAgICAgaWYgKHR5cGVvZiBjb25maWcuZHVyYXRpb24gPT09ICd1bmRlZmluZWQnKSB7XG4gICAgICAgICAgICBkdXJhdGlvbiA9IDAuMztcbiAgICAgICAgfVxuICAgICAgICBlbHNlIGlmIChjb25maWcuZHVyYXRpb24gPT09IDApIHtcbiAgICAgICAgICAgIGR1cmF0aW9uID0gMC4wMDE7XG4gICAgICAgIH1cbiAgICAgICAgZWxzZSB7XG4gICAgICAgICAgICBkdXJhdGlvbiA9IGNvbmZpZy5kdXJhdGlvbjtcbiAgICAgICAgfVxuICAgICAgICB0aGlzLm5vZGUgPSBub2RlO1xuICAgICAgICB0aGlzLl9pZCA9IGlkQ291bnRlcisrO1xuICAgICAgICB2YXIgbGF5ZXJzID0gbm9kZS5nZXRMYXllcigpIHx8XG4gICAgICAgICAgICAobm9kZSBpbnN0YW5jZW9mIEtvbnZhWydTdGFnZSddID8gbm9kZS5nZXRMYXllcnMoKSA6IG51bGwpO1xuICAgICAgICBpZiAoIWxheWVycykge1xuICAgICAgICAgICAgVXRpbC5lcnJvcignVHdlZW4gY29uc3RydWN0b3IgaGF2ZSBgbm9kZWAgdGhhdCBpcyBub3QgaW4gYSBsYXllci4gUGxlYXNlIGFkZCBub2RlIGludG8gbGF5ZXIgZmlyc3QuJyk7XG4gICAgICAgIH1cbiAgICAgICAgdGhpcy5hbmltID0gbmV3IEFuaW1hdGlvbihmdW5jdGlvbiAoKSB7XG4gICAgICAgICAgICB0aGF0LnR3ZWVuLm9uRW50ZXJGcmFtZSgpO1xuICAgICAgICB9LCBsYXllcnMpO1xuICAgICAgICB0aGlzLnR3ZWVuID0gbmV3IFR3ZWVuRW5naW5lKGtleSwgZnVuY3Rpb24gKGkpIHtcbiAgICAgICAgICAgIHRoYXQuX3R3ZWVuRnVuYyhpKTtcbiAgICAgICAgfSwgZWFzaW5nLCAwLCAxLCBkdXJhdGlvbiAqIDEwMDAsIHlveW8pO1xuICAgICAgICB0aGlzLl9hZGRMaXN0ZW5lcnMoKTtcbiAgICAgICAgaWYgKCFUd2Vlbi5hdHRyc1tub2RlSWRdKSB7XG4gICAgICAgICAgICBUd2Vlbi5hdHRyc1tub2RlSWRdID0ge307XG4gICAgICAgIH1cbiAgICAgICAgaWYgKCFUd2Vlbi5hdHRyc1tub2RlSWRdW3RoaXMuX2lkXSkge1xuICAgICAgICAgICAgVHdlZW4uYXR0cnNbbm9kZUlkXVt0aGlzLl9pZF0gPSB7fTtcbiAgICAgICAgfVxuICAgICAgICBpZiAoIVR3ZWVuLnR3ZWVuc1tub2RlSWRdKSB7XG4gICAgICAgICAgICBUd2Vlbi50d2VlbnNbbm9kZUlkXSA9IHt9O1xuICAgICAgICB9XG4gICAgICAgIGZvciAoa2V5IGluIGNvbmZpZykge1xuICAgICAgICAgICAgaWYgKGJsYWNrbGlzdFtrZXldID09PSB1bmRlZmluZWQpIHtcbiAgICAgICAgICAgICAgICB0aGlzLl9hZGRBdHRyKGtleSwgY29uZmlnW2tleV0pO1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICAgIHRoaXMucmVzZXQoKTtcbiAgICAgICAgdGhpcy5vbkZpbmlzaCA9IGNvbmZpZy5vbkZpbmlzaDtcbiAgICAgICAgdGhpcy5vblJlc2V0ID0gY29uZmlnLm9uUmVzZXQ7XG4gICAgICAgIHRoaXMub25VcGRhdGUgPSBjb25maWcub25VcGRhdGU7XG4gICAgfVxuICAgIF9hZGRBdHRyKGtleSwgZW5kKSB7XG4gICAgICAgIHZhciBub2RlID0gdGhpcy5ub2RlLCBub2RlSWQgPSBub2RlLl9pZCwgc3RhcnQsIGRpZmYsIHR3ZWVuSWQsIG4sIGxlbiwgdHJ1ZUVuZCwgdHJ1ZVN0YXJ0LCBlbmRSR0JBO1xuICAgICAgICB0d2VlbklkID0gVHdlZW4udHdlZW5zW25vZGVJZF1ba2V5XTtcbiAgICAgICAgaWYgKHR3ZWVuSWQpIHtcbiAgICAgICAgICAgIGRlbGV0ZSBUd2Vlbi5hdHRyc1tub2RlSWRdW3R3ZWVuSWRdW2tleV07XG4gICAgICAgIH1cbiAgICAgICAgc3RhcnQgPSBub2RlLmdldEF0dHIoa2V5KTtcbiAgICAgICAgaWYgKFV0aWwuX2lzQXJyYXkoZW5kKSkge1xuICAgICAgICAgICAgZGlmZiA9IFtdO1xuICAgICAgICAgICAgbGVuID0gTWF0aC5tYXgoZW5kLmxlbmd0aCwgc3RhcnQubGVuZ3RoKTtcbiAgICAgICAgICAgIGlmIChrZXkgPT09ICdwb2ludHMnICYmIGVuZC5sZW5ndGggIT09IHN0YXJ0Lmxlbmd0aCkge1xuICAgICAgICAgICAgICAgIGlmIChlbmQubGVuZ3RoID4gc3RhcnQubGVuZ3RoKSB7XG4gICAgICAgICAgICAgICAgICAgIHRydWVTdGFydCA9IHN0YXJ0O1xuICAgICAgICAgICAgICAgICAgICBzdGFydCA9IFV0aWwuX3ByZXBhcmVBcnJheUZvclR3ZWVuKHN0YXJ0LCBlbmQsIG5vZGUuY2xvc2VkKCkpO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICBlbHNlIHtcbiAgICAgICAgICAgICAgICAgICAgdHJ1ZUVuZCA9IGVuZDtcbiAgICAgICAgICAgICAgICAgICAgZW5kID0gVXRpbC5fcHJlcGFyZUFycmF5Rm9yVHdlZW4oZW5kLCBzdGFydCwgbm9kZS5jbG9zZWQoKSk7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfVxuICAgICAgICAgICAgaWYgKGtleS5pbmRleE9mKCdmaWxsJykgPT09IDApIHtcbiAgICAgICAgICAgICAgICBmb3IgKG4gPSAwOyBuIDwgbGVuOyBuKyspIHtcbiAgICAgICAgICAgICAgICAgICAgaWYgKG4gJSAyID09PSAwKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICBkaWZmLnB1c2goZW5kW25dIC0gc3RhcnRbbl0pO1xuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgIGVsc2Uge1xuICAgICAgICAgICAgICAgICAgICAgICAgdmFyIHN0YXJ0UkdCQSA9IFV0aWwuY29sb3JUb1JHQkEoc3RhcnRbbl0pO1xuICAgICAgICAgICAgICAgICAgICAgICAgZW5kUkdCQSA9IFV0aWwuY29sb3JUb1JHQkEoZW5kW25dKTtcbiAgICAgICAgICAgICAgICAgICAgICAgIHN0YXJ0W25dID0gc3RhcnRSR0JBO1xuICAgICAgICAgICAgICAgICAgICAgICAgZGlmZi5wdXNoKHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICByOiBlbmRSR0JBLnIgLSBzdGFydFJHQkEucixcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBnOiBlbmRSR0JBLmcgLSBzdGFydFJHQkEuZyxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBiOiBlbmRSR0JBLmIgLSBzdGFydFJHQkEuYixcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBhOiBlbmRSR0JBLmEgLSBzdGFydFJHQkEuYSxcbiAgICAgICAgICAgICAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfVxuICAgICAgICAgICAgZWxzZSB7XG4gICAgICAgICAgICAgICAgZm9yIChuID0gMDsgbiA8IGxlbjsgbisrKSB7XG4gICAgICAgICAgICAgICAgICAgIGRpZmYucHVzaChlbmRbbl0gLSBzdGFydFtuXSk7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICAgIGVsc2UgaWYgKGNvbG9yQXR0cnMuaW5kZXhPZihrZXkpICE9PSAtMSkge1xuICAgICAgICAgICAgc3RhcnQgPSBVdGlsLmNvbG9yVG9SR0JBKHN0YXJ0KTtcbiAgICAgICAgICAgIGVuZFJHQkEgPSBVdGlsLmNvbG9yVG9SR0JBKGVuZCk7XG4gICAgICAgICAgICBkaWZmID0ge1xuICAgICAgICAgICAgICAgIHI6IGVuZFJHQkEuciAtIHN0YXJ0LnIsXG4gICAgICAgICAgICAgICAgZzogZW5kUkdCQS5nIC0gc3RhcnQuZyxcbiAgICAgICAgICAgICAgICBiOiBlbmRSR0JBLmIgLSBzdGFydC5iLFxuICAgICAgICAgICAgICAgIGE6IGVuZFJHQkEuYSAtIHN0YXJ0LmEsXG4gICAgICAgICAgICB9O1xuICAgICAgICB9XG4gICAgICAgIGVsc2Uge1xuICAgICAgICAgICAgZGlmZiA9IGVuZCAtIHN0YXJ0O1xuICAgICAgICB9XG4gICAgICAgIFR3ZWVuLmF0dHJzW25vZGVJZF1bdGhpcy5faWRdW2tleV0gPSB7XG4gICAgICAgICAgICBzdGFydDogc3RhcnQsXG4gICAgICAgICAgICBkaWZmOiBkaWZmLFxuICAgICAgICAgICAgZW5kOiBlbmQsXG4gICAgICAgICAgICB0cnVlRW5kOiB0cnVlRW5kLFxuICAgICAgICAgICAgdHJ1ZVN0YXJ0OiB0cnVlU3RhcnQsXG4gICAgICAgIH07XG4gICAgICAgIFR3ZWVuLnR3ZWVuc1tub2RlSWRdW2tleV0gPSB0aGlzLl9pZDtcbiAgICB9XG4gICAgX3R3ZWVuRnVuYyhpKSB7XG4gICAgICAgIHZhciBub2RlID0gdGhpcy5ub2RlLCBhdHRycyA9IFR3ZWVuLmF0dHJzW25vZGUuX2lkXVt0aGlzLl9pZF0sIGtleSwgYXR0ciwgc3RhcnQsIGRpZmYsIG5ld1ZhbCwgbiwgbGVuLCBlbmQ7XG4gICAgICAgIGZvciAoa2V5IGluIGF0dHJzKSB7XG4gICAgICAgICAgICBhdHRyID0gYXR0cnNba2V5XTtcbiAgICAgICAgICAgIHN0YXJ0ID0gYXR0ci5zdGFydDtcbiAgICAgICAgICAgIGRpZmYgPSBhdHRyLmRpZmY7XG4gICAgICAgICAgICBlbmQgPSBhdHRyLmVuZDtcbiAgICAgICAgICAgIGlmIChVdGlsLl9pc0FycmF5KHN0YXJ0KSkge1xuICAgICAgICAgICAgICAgIG5ld1ZhbCA9IFtdO1xuICAgICAgICAgICAgICAgIGxlbiA9IE1hdGgubWF4KHN0YXJ0Lmxlbmd0aCwgZW5kLmxlbmd0aCk7XG4gICAgICAgICAgICAgICAgaWYgKGtleS5pbmRleE9mKCdmaWxsJykgPT09IDApIHtcbiAgICAgICAgICAgICAgICAgICAgZm9yIChuID0gMDsgbiA8IGxlbjsgbisrKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICBpZiAobiAlIDIgPT09IDApIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBuZXdWYWwucHVzaCgoc3RhcnRbbl0gfHwgMCkgKyBkaWZmW25dICogaSk7XG4gICAgICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgICAgICBlbHNlIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBuZXdWYWwucHVzaCgncmdiYSgnICtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgTWF0aC5yb3VuZChzdGFydFtuXS5yICsgZGlmZltuXS5yICogaSkgK1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAnLCcgK1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBNYXRoLnJvdW5kKHN0YXJ0W25dLmcgKyBkaWZmW25dLmcgKiBpKSArXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICcsJyArXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIE1hdGgucm91bmQoc3RhcnRbbl0uYiArIGRpZmZbbl0uYiAqIGkpICtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgJywnICtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgKHN0YXJ0W25dLmEgKyBkaWZmW25dLmEgKiBpKSArXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICcpJyk7XG4gICAgICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgZWxzZSB7XG4gICAgICAgICAgICAgICAgICAgIGZvciAobiA9IDA7IG4gPCBsZW47IG4rKykge1xuICAgICAgICAgICAgICAgICAgICAgICAgbmV3VmFsLnB1c2goKHN0YXJ0W25dIHx8IDApICsgZGlmZltuXSAqIGkpO1xuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfVxuICAgICAgICAgICAgZWxzZSBpZiAoY29sb3JBdHRycy5pbmRleE9mKGtleSkgIT09IC0xKSB7XG4gICAgICAgICAgICAgICAgbmV3VmFsID1cbiAgICAgICAgICAgICAgICAgICAgJ3JnYmEoJyArXG4gICAgICAgICAgICAgICAgICAgICAgICBNYXRoLnJvdW5kKHN0YXJ0LnIgKyBkaWZmLnIgKiBpKSArXG4gICAgICAgICAgICAgICAgICAgICAgICAnLCcgK1xuICAgICAgICAgICAgICAgICAgICAgICAgTWF0aC5yb3VuZChzdGFydC5nICsgZGlmZi5nICogaSkgK1xuICAgICAgICAgICAgICAgICAgICAgICAgJywnICtcbiAgICAgICAgICAgICAgICAgICAgICAgIE1hdGgucm91bmQoc3RhcnQuYiArIGRpZmYuYiAqIGkpICtcbiAgICAgICAgICAgICAgICAgICAgICAgICcsJyArXG4gICAgICAgICAgICAgICAgICAgICAgICAoc3RhcnQuYSArIGRpZmYuYSAqIGkpICtcbiAgICAgICAgICAgICAgICAgICAgICAgICcpJztcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGVsc2Uge1xuICAgICAgICAgICAgICAgIG5ld1ZhbCA9IHN0YXJ0ICsgZGlmZiAqIGk7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBub2RlLnNldEF0dHIoa2V5LCBuZXdWYWwpO1xuICAgICAgICB9XG4gICAgfVxuICAgIF9hZGRMaXN0ZW5lcnMoKSB7XG4gICAgICAgIHRoaXMudHdlZW4ub25QbGF5ID0gKCkgPT4ge1xuICAgICAgICAgICAgdGhpcy5hbmltLnN0YXJ0KCk7XG4gICAgICAgIH07XG4gICAgICAgIHRoaXMudHdlZW4ub25SZXZlcnNlID0gKCkgPT4ge1xuICAgICAgICAgICAgdGhpcy5hbmltLnN0YXJ0KCk7XG4gICAgICAgIH07XG4gICAgICAgIHRoaXMudHdlZW4ub25QYXVzZSA9ICgpID0+IHtcbiAgICAgICAgICAgIHRoaXMuYW5pbS5zdG9wKCk7XG4gICAgICAgIH07XG4gICAgICAgIHRoaXMudHdlZW4ub25GaW5pc2ggPSAoKSA9PiB7XG4gICAgICAgICAgICB2YXIgbm9kZSA9IHRoaXMubm9kZTtcbiAgICAgICAgICAgIHZhciBhdHRycyA9IFR3ZWVuLmF0dHJzW25vZGUuX2lkXVt0aGlzLl9pZF07XG4gICAgICAgICAgICBpZiAoYXR0cnMucG9pbnRzICYmIGF0dHJzLnBvaW50cy50cnVlRW5kKSB7XG4gICAgICAgICAgICAgICAgbm9kZS5zZXRBdHRyKCdwb2ludHMnLCBhdHRycy5wb2ludHMudHJ1ZUVuZCk7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBpZiAodGhpcy5vbkZpbmlzaCkge1xuICAgICAgICAgICAgICAgIHRoaXMub25GaW5pc2guY2FsbCh0aGlzKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfTtcbiAgICAgICAgdGhpcy50d2Vlbi5vblJlc2V0ID0gKCkgPT4ge1xuICAgICAgICAgICAgdmFyIG5vZGUgPSB0aGlzLm5vZGU7XG4gICAgICAgICAgICB2YXIgYXR0cnMgPSBUd2Vlbi5hdHRyc1tub2RlLl9pZF1bdGhpcy5faWRdO1xuICAgICAgICAgICAgaWYgKGF0dHJzLnBvaW50cyAmJiBhdHRycy5wb2ludHMudHJ1ZVN0YXJ0KSB7XG4gICAgICAgICAgICAgICAgbm9kZS5wb2ludHMoYXR0cnMucG9pbnRzLnRydWVTdGFydCk7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBpZiAodGhpcy5vblJlc2V0KSB7XG4gICAgICAgICAgICAgICAgdGhpcy5vblJlc2V0KCk7XG4gICAgICAgICAgICB9XG4gICAgICAgIH07XG4gICAgICAgIHRoaXMudHdlZW4ub25VcGRhdGUgPSAoKSA9PiB7XG4gICAgICAgICAgICBpZiAodGhpcy5vblVwZGF0ZSkge1xuICAgICAgICAgICAgICAgIHRoaXMub25VcGRhdGUuY2FsbCh0aGlzKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfTtcbiAgICB9XG4gICAgcGxheSgpIHtcbiAgICAgICAgdGhpcy50d2Vlbi5wbGF5KCk7XG4gICAgICAgIHJldHVybiB0aGlzO1xuICAgIH1cbiAgICByZXZlcnNlKCkge1xuICAgICAgICB0aGlzLnR3ZWVuLnJldmVyc2UoKTtcbiAgICAgICAgcmV0dXJuIHRoaXM7XG4gICAgfVxuICAgIHJlc2V0KCkge1xuICAgICAgICB0aGlzLnR3ZWVuLnJlc2V0KCk7XG4gICAgICAgIHJldHVybiB0aGlzO1xuICAgIH1cbiAgICBzZWVrKHQpIHtcbiAgICAgICAgdGhpcy50d2Vlbi5zZWVrKHQgKiAxMDAwKTtcbiAgICAgICAgcmV0dXJuIHRoaXM7XG4gICAgfVxuICAgIHBhdXNlKCkge1xuICAgICAgICB0aGlzLnR3ZWVuLnBhdXNlKCk7XG4gICAgICAgIHJldHVybiB0aGlzO1xuICAgIH1cbiAgICBmaW5pc2goKSB7XG4gICAgICAgIHRoaXMudHdlZW4uZmluaXNoKCk7XG4gICAgICAgIHJldHVybiB0aGlzO1xuICAgIH1cbiAgICBkZXN0cm95KCkge1xuICAgICAgICB2YXIgbm9kZUlkID0gdGhpcy5ub2RlLl9pZCwgdGhpc0lkID0gdGhpcy5faWQsIGF0dHJzID0gVHdlZW4udHdlZW5zW25vZGVJZF0sIGtleTtcbiAgICAgICAgdGhpcy5wYXVzZSgpO1xuICAgICAgICBmb3IgKGtleSBpbiBhdHRycykge1xuICAgICAgICAgICAgZGVsZXRlIFR3ZWVuLnR3ZWVuc1tub2RlSWRdW2tleV07XG4gICAgICAgIH1cbiAgICAgICAgZGVsZXRlIFR3ZWVuLmF0dHJzW25vZGVJZF1bdGhpc0lkXTtcbiAgICB9XG59XG5Ud2Vlbi5hdHRycyA9IHt9O1xuVHdlZW4udHdlZW5zID0ge307XG5Ob2RlLnByb3RvdHlwZS50byA9IGZ1bmN0aW9uIChwYXJhbXMpIHtcbiAgICB2YXIgb25GaW5pc2ggPSBwYXJhbXMub25GaW5pc2g7XG4gICAgcGFyYW1zLm5vZGUgPSB0aGlzO1xuICAgIHBhcmFtcy5vbkZpbmlzaCA9IGZ1bmN0aW9uICgpIHtcbiAgICAgICAgdGhpcy5kZXN0cm95KCk7XG4gICAgICAgIGlmIChvbkZpbmlzaCkge1xuICAgICAgICAgICAgb25GaW5pc2goKTtcbiAgICAgICAgfVxuICAgIH07XG4gICAgdmFyIHR3ZWVuID0gbmV3IFR3ZWVuKHBhcmFtcyk7XG4gICAgdHdlZW4ucGxheSgpO1xufTtcbmV4cG9ydCBjb25zdCBFYXNpbmdzID0ge1xuICAgIEJhY2tFYXNlSW4odCwgYiwgYywgZCkge1xuICAgICAgICB2YXIgcyA9IDEuNzAxNTg7XG4gICAgICAgIHJldHVybiBjICogKHQgLz0gZCkgKiB0ICogKChzICsgMSkgKiB0IC0gcykgKyBiO1xuICAgIH0sXG4gICAgQmFja0Vhc2VPdXQodCwgYiwgYywgZCkge1xuICAgICAgICB2YXIgcyA9IDEuNzAxNTg7XG4gICAgICAgIHJldHVybiBjICogKCh0ID0gdCAvIGQgLSAxKSAqIHQgKiAoKHMgKyAxKSAqIHQgKyBzKSArIDEpICsgYjtcbiAgICB9LFxuICAgIEJhY2tFYXNlSW5PdXQodCwgYiwgYywgZCkge1xuICAgICAgICB2YXIgcyA9IDEuNzAxNTg7XG4gICAgICAgIGlmICgodCAvPSBkIC8gMikgPCAxKSB7XG4gICAgICAgICAgICByZXR1cm4gKGMgLyAyKSAqICh0ICogdCAqICgoKHMgKj0gMS41MjUpICsgMSkgKiB0IC0gcykpICsgYjtcbiAgICAgICAgfVxuICAgICAgICByZXR1cm4gKGMgLyAyKSAqICgodCAtPSAyKSAqIHQgKiAoKChzICo9IDEuNTI1KSArIDEpICogdCArIHMpICsgMikgKyBiO1xuICAgIH0sXG4gICAgRWxhc3RpY0Vhc2VJbih0LCBiLCBjLCBkLCBhLCBwKSB7XG4gICAgICAgIHZhciBzID0gMDtcbiAgICAgICAgaWYgKHQgPT09IDApIHtcbiAgICAgICAgICAgIHJldHVybiBiO1xuICAgICAgICB9XG4gICAgICAgIGlmICgodCAvPSBkKSA9PT0gMSkge1xuICAgICAgICAgICAgcmV0dXJuIGIgKyBjO1xuICAgICAgICB9XG4gICAgICAgIGlmICghcCkge1xuICAgICAgICAgICAgcCA9IGQgKiAwLjM7XG4gICAgICAgIH1cbiAgICAgICAgaWYgKCFhIHx8IGEgPCBNYXRoLmFicyhjKSkge1xuICAgICAgICAgICAgYSA9IGM7XG4gICAgICAgICAgICBzID0gcCAvIDQ7XG4gICAgICAgIH1cbiAgICAgICAgZWxzZSB7XG4gICAgICAgICAgICBzID0gKHAgLyAoMiAqIE1hdGguUEkpKSAqIE1hdGguYXNpbihjIC8gYSk7XG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuICgtKGEgKlxuICAgICAgICAgICAgTWF0aC5wb3coMiwgMTAgKiAodCAtPSAxKSkgKlxuICAgICAgICAgICAgTWF0aC5zaW4oKCh0ICogZCAtIHMpICogKDIgKiBNYXRoLlBJKSkgLyBwKSkgKyBiKTtcbiAgICB9LFxuICAgIEVsYXN0aWNFYXNlT3V0KHQsIGIsIGMsIGQsIGEsIHApIHtcbiAgICAgICAgdmFyIHMgPSAwO1xuICAgICAgICBpZiAodCA9PT0gMCkge1xuICAgICAgICAgICAgcmV0dXJuIGI7XG4gICAgICAgIH1cbiAgICAgICAgaWYgKCh0IC89IGQpID09PSAxKSB7XG4gICAgICAgICAgICByZXR1cm4gYiArIGM7XG4gICAgICAgIH1cbiAgICAgICAgaWYgKCFwKSB7XG4gICAgICAgICAgICBwID0gZCAqIDAuMztcbiAgICAgICAgfVxuICAgICAgICBpZiAoIWEgfHwgYSA8IE1hdGguYWJzKGMpKSB7XG4gICAgICAgICAgICBhID0gYztcbiAgICAgICAgICAgIHMgPSBwIC8gNDtcbiAgICAgICAgfVxuICAgICAgICBlbHNlIHtcbiAgICAgICAgICAgIHMgPSAocCAvICgyICogTWF0aC5QSSkpICogTWF0aC5hc2luKGMgLyBhKTtcbiAgICAgICAgfVxuICAgICAgICByZXR1cm4gKGEgKiBNYXRoLnBvdygyLCAtMTAgKiB0KSAqIE1hdGguc2luKCgodCAqIGQgLSBzKSAqICgyICogTWF0aC5QSSkpIC8gcCkgK1xuICAgICAgICAgICAgYyArXG4gICAgICAgICAgICBiKTtcbiAgICB9LFxuICAgIEVsYXN0aWNFYXNlSW5PdXQodCwgYiwgYywgZCwgYSwgcCkge1xuICAgICAgICB2YXIgcyA9IDA7XG4gICAgICAgIGlmICh0ID09PSAwKSB7XG4gICAgICAgICAgICByZXR1cm4gYjtcbiAgICAgICAgfVxuICAgICAgICBpZiAoKHQgLz0gZCAvIDIpID09PSAyKSB7XG4gICAgICAgICAgICByZXR1cm4gYiArIGM7XG4gICAgICAgIH1cbiAgICAgICAgaWYgKCFwKSB7XG4gICAgICAgICAgICBwID0gZCAqICgwLjMgKiAxLjUpO1xuICAgICAgICB9XG4gICAgICAgIGlmICghYSB8fCBhIDwgTWF0aC5hYnMoYykpIHtcbiAgICAgICAgICAgIGEgPSBjO1xuICAgICAgICAgICAgcyA9IHAgLyA0O1xuICAgICAgICB9XG4gICAgICAgIGVsc2Uge1xuICAgICAgICAgICAgcyA9IChwIC8gKDIgKiBNYXRoLlBJKSkgKiBNYXRoLmFzaW4oYyAvIGEpO1xuICAgICAgICB9XG4gICAgICAgIGlmICh0IDwgMSkge1xuICAgICAgICAgICAgcmV0dXJuICgtMC41ICpcbiAgICAgICAgICAgICAgICAoYSAqXG4gICAgICAgICAgICAgICAgICAgIE1hdGgucG93KDIsIDEwICogKHQgLT0gMSkpICpcbiAgICAgICAgICAgICAgICAgICAgTWF0aC5zaW4oKCh0ICogZCAtIHMpICogKDIgKiBNYXRoLlBJKSkgLyBwKSkgK1xuICAgICAgICAgICAgICAgIGIpO1xuICAgICAgICB9XG4gICAgICAgIHJldHVybiAoYSAqXG4gICAgICAgICAgICBNYXRoLnBvdygyLCAtMTAgKiAodCAtPSAxKSkgKlxuICAgICAgICAgICAgTWF0aC5zaW4oKCh0ICogZCAtIHMpICogKDIgKiBNYXRoLlBJKSkgLyBwKSAqXG4gICAgICAgICAgICAwLjUgK1xuICAgICAgICAgICAgYyArXG4gICAgICAgICAgICBiKTtcbiAgICB9LFxuICAgIEJvdW5jZUVhc2VPdXQodCwgYiwgYywgZCkge1xuICAgICAgICBpZiAoKHQgLz0gZCkgPCAxIC8gMi43NSkge1xuICAgICAgICAgICAgcmV0dXJuIGMgKiAoNy41NjI1ICogdCAqIHQpICsgYjtcbiAgICAgICAgfVxuICAgICAgICBlbHNlIGlmICh0IDwgMiAvIDIuNzUpIHtcbiAgICAgICAgICAgIHJldHVybiBjICogKDcuNTYyNSAqICh0IC09IDEuNSAvIDIuNzUpICogdCArIDAuNzUpICsgYjtcbiAgICAgICAgfVxuICAgICAgICBlbHNlIGlmICh0IDwgMi41IC8gMi43NSkge1xuICAgICAgICAgICAgcmV0dXJuIGMgKiAoNy41NjI1ICogKHQgLT0gMi4yNSAvIDIuNzUpICogdCArIDAuOTM3NSkgKyBiO1xuICAgICAgICB9XG4gICAgICAgIGVsc2Uge1xuICAgICAgICAgICAgcmV0dXJuIGMgKiAoNy41NjI1ICogKHQgLT0gMi42MjUgLyAyLjc1KSAqIHQgKyAwLjk4NDM3NSkgKyBiO1xuICAgICAgICB9XG4gICAgfSxcbiAgICBCb3VuY2VFYXNlSW4odCwgYiwgYywgZCkge1xuICAgICAgICByZXR1cm4gYyAtIEVhc2luZ3MuQm91bmNlRWFzZU91dChkIC0gdCwgMCwgYywgZCkgKyBiO1xuICAgIH0sXG4gICAgQm91bmNlRWFzZUluT3V0KHQsIGIsIGMsIGQpIHtcbiAgICAgICAgaWYgKHQgPCBkIC8gMikge1xuICAgICAgICAgICAgcmV0dXJuIEVhc2luZ3MuQm91bmNlRWFzZUluKHQgKiAyLCAwLCBjLCBkKSAqIDAuNSArIGI7XG4gICAgICAgIH1cbiAgICAgICAgZWxzZSB7XG4gICAgICAgICAgICByZXR1cm4gRWFzaW5ncy5Cb3VuY2VFYXNlT3V0KHQgKiAyIC0gZCwgMCwgYywgZCkgKiAwLjUgKyBjICogMC41ICsgYjtcbiAgICAgICAgfVxuICAgIH0sXG4gICAgRWFzZUluKHQsIGIsIGMsIGQpIHtcbiAgICAgICAgcmV0dXJuIGMgKiAodCAvPSBkKSAqIHQgKyBiO1xuICAgIH0sXG4gICAgRWFzZU91dCh0LCBiLCBjLCBkKSB7XG4gICAgICAgIHJldHVybiAtYyAqICh0IC89IGQpICogKHQgLSAyKSArIGI7XG4gICAgfSxcbiAgICBFYXNlSW5PdXQodCwgYiwgYywgZCkge1xuICAgICAgICBpZiAoKHQgLz0gZCAvIDIpIDwgMSkge1xuICAgICAgICAgICAgcmV0dXJuIChjIC8gMikgKiB0ICogdCArIGI7XG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuICgtYyAvIDIpICogKC0tdCAqICh0IC0gMikgLSAxKSArIGI7XG4gICAgfSxcbiAgICBTdHJvbmdFYXNlSW4odCwgYiwgYywgZCkge1xuICAgICAgICByZXR1cm4gYyAqICh0IC89IGQpICogdCAqIHQgKiB0ICogdCArIGI7XG4gICAgfSxcbiAgICBTdHJvbmdFYXNlT3V0KHQsIGIsIGMsIGQpIHtcbiAgICAgICAgcmV0dXJuIGMgKiAoKHQgPSB0IC8gZCAtIDEpICogdCAqIHQgKiB0ICogdCArIDEpICsgYjtcbiAgICB9LFxuICAgIFN0cm9uZ0Vhc2VJbk91dCh0LCBiLCBjLCBkKSB7XG4gICAgICAgIGlmICgodCAvPSBkIC8gMikgPCAxKSB7XG4gICAgICAgICAgICByZXR1cm4gKGMgLyAyKSAqIHQgKiB0ICogdCAqIHQgKiB0ICsgYjtcbiAgICAgICAgfVxuICAgICAgICByZXR1cm4gKGMgLyAyKSAqICgodCAtPSAyKSAqIHQgKiB0ICogdCAqIHQgKyAyKSArIGI7XG4gICAgfSxcbiAgICBMaW5lYXIodCwgYiwgYywgZCkge1xuICAgICAgICByZXR1cm4gKGMgKiB0KSAvIGQgKyBiO1xuICAgIH0sXG59O1xuIiwiaW1wb3J0IHsgS29udmEgfSBmcm9tICcuL0dsb2JhbC5qcyc7XG5leHBvcnQgY2xhc3MgVHJhbnNmb3JtIHtcbiAgICBjb25zdHJ1Y3RvcihtID0gWzEsIDAsIDAsIDEsIDAsIDBdKSB7XG4gICAgICAgIHRoaXMuZGlydHkgPSBmYWxzZTtcbiAgICAgICAgdGhpcy5tID0gKG0gJiYgbS5zbGljZSgpKSB8fCBbMSwgMCwgMCwgMSwgMCwgMF07XG4gICAgfVxuICAgIHJlc2V0KCkge1xuICAgICAgICB0aGlzLm1bMF0gPSAxO1xuICAgICAgICB0aGlzLm1bMV0gPSAwO1xuICAgICAgICB0aGlzLm1bMl0gPSAwO1xuICAgICAgICB0aGlzLm1bM10gPSAxO1xuICAgICAgICB0aGlzLm1bNF0gPSAwO1xuICAgICAgICB0aGlzLm1bNV0gPSAwO1xuICAgIH1cbiAgICBjb3B5KCkge1xuICAgICAgICByZXR1cm4gbmV3IFRyYW5zZm9ybSh0aGlzLm0pO1xuICAgIH1cbiAgICBjb3B5SW50byh0cikge1xuICAgICAgICB0ci5tWzBdID0gdGhpcy5tWzBdO1xuICAgICAgICB0ci5tWzFdID0gdGhpcy5tWzFdO1xuICAgICAgICB0ci5tWzJdID0gdGhpcy5tWzJdO1xuICAgICAgICB0ci5tWzNdID0gdGhpcy5tWzNdO1xuICAgICAgICB0ci5tWzRdID0gdGhpcy5tWzRdO1xuICAgICAgICB0ci5tWzVdID0gdGhpcy5tWzVdO1xuICAgIH1cbiAgICBwb2ludChwb2ludCkge1xuICAgICAgICB2YXIgbSA9IHRoaXMubTtcbiAgICAgICAgcmV0dXJuIHtcbiAgICAgICAgICAgIHg6IG1bMF0gKiBwb2ludC54ICsgbVsyXSAqIHBvaW50LnkgKyBtWzRdLFxuICAgICAgICAgICAgeTogbVsxXSAqIHBvaW50LnggKyBtWzNdICogcG9pbnQueSArIG1bNV0sXG4gICAgICAgIH07XG4gICAgfVxuICAgIHRyYW5zbGF0ZSh4LCB5KSB7XG4gICAgICAgIHRoaXMubVs0XSArPSB0aGlzLm1bMF0gKiB4ICsgdGhpcy5tWzJdICogeTtcbiAgICAgICAgdGhpcy5tWzVdICs9IHRoaXMubVsxXSAqIHggKyB0aGlzLm1bM10gKiB5O1xuICAgICAgICByZXR1cm4gdGhpcztcbiAgICB9XG4gICAgc2NhbGUoc3gsIHN5KSB7XG4gICAgICAgIHRoaXMubVswXSAqPSBzeDtcbiAgICAgICAgdGhpcy5tWzFdICo9IHN4O1xuICAgICAgICB0aGlzLm1bMl0gKj0gc3k7XG4gICAgICAgIHRoaXMubVszXSAqPSBzeTtcbiAgICAgICAgcmV0dXJuIHRoaXM7XG4gICAgfVxuICAgIHJvdGF0ZShyYWQpIHtcbiAgICAgICAgdmFyIGMgPSBNYXRoLmNvcyhyYWQpO1xuICAgICAgICB2YXIgcyA9IE1hdGguc2luKHJhZCk7XG4gICAgICAgIHZhciBtMTEgPSB0aGlzLm1bMF0gKiBjICsgdGhpcy5tWzJdICogcztcbiAgICAgICAgdmFyIG0xMiA9IHRoaXMubVsxXSAqIGMgKyB0aGlzLm1bM10gKiBzO1xuICAgICAgICB2YXIgbTIxID0gdGhpcy5tWzBdICogLXMgKyB0aGlzLm1bMl0gKiBjO1xuICAgICAgICB2YXIgbTIyID0gdGhpcy5tWzFdICogLXMgKyB0aGlzLm1bM10gKiBjO1xuICAgICAgICB0aGlzLm1bMF0gPSBtMTE7XG4gICAgICAgIHRoaXMubVsxXSA9IG0xMjtcbiAgICAgICAgdGhpcy5tWzJdID0gbTIxO1xuICAgICAgICB0aGlzLm1bM10gPSBtMjI7XG4gICAgICAgIHJldHVybiB0aGlzO1xuICAgIH1cbiAgICBnZXRUcmFuc2xhdGlvbigpIHtcbiAgICAgICAgcmV0dXJuIHtcbiAgICAgICAgICAgIHg6IHRoaXMubVs0XSxcbiAgICAgICAgICAgIHk6IHRoaXMubVs1XSxcbiAgICAgICAgfTtcbiAgICB9XG4gICAgc2tldyhzeCwgc3kpIHtcbiAgICAgICAgdmFyIG0xMSA9IHRoaXMubVswXSArIHRoaXMubVsyXSAqIHN5O1xuICAgICAgICB2YXIgbTEyID0gdGhpcy5tWzFdICsgdGhpcy5tWzNdICogc3k7XG4gICAgICAgIHZhciBtMjEgPSB0aGlzLm1bMl0gKyB0aGlzLm1bMF0gKiBzeDtcbiAgICAgICAgdmFyIG0yMiA9IHRoaXMubVszXSArIHRoaXMubVsxXSAqIHN4O1xuICAgICAgICB0aGlzLm1bMF0gPSBtMTE7XG4gICAgICAgIHRoaXMubVsxXSA9IG0xMjtcbiAgICAgICAgdGhpcy5tWzJdID0gbTIxO1xuICAgICAgICB0aGlzLm1bM10gPSBtMjI7XG4gICAgICAgIHJldHVybiB0aGlzO1xuICAgIH1cbiAgICBtdWx0aXBseShtYXRyaXgpIHtcbiAgICAgICAgdmFyIG0xMSA9IHRoaXMubVswXSAqIG1hdHJpeC5tWzBdICsgdGhpcy5tWzJdICogbWF0cml4Lm1bMV07XG4gICAgICAgIHZhciBtMTIgPSB0aGlzLm1bMV0gKiBtYXRyaXgubVswXSArIHRoaXMubVszXSAqIG1hdHJpeC5tWzFdO1xuICAgICAgICB2YXIgbTIxID0gdGhpcy5tWzBdICogbWF0cml4Lm1bMl0gKyB0aGlzLm1bMl0gKiBtYXRyaXgubVszXTtcbiAgICAgICAgdmFyIG0yMiA9IHRoaXMubVsxXSAqIG1hdHJpeC5tWzJdICsgdGhpcy5tWzNdICogbWF0cml4Lm1bM107XG4gICAgICAgIHZhciBkeCA9IHRoaXMubVswXSAqIG1hdHJpeC5tWzRdICsgdGhpcy5tWzJdICogbWF0cml4Lm1bNV0gKyB0aGlzLm1bNF07XG4gICAgICAgIHZhciBkeSA9IHRoaXMubVsxXSAqIG1hdHJpeC5tWzRdICsgdGhpcy5tWzNdICogbWF0cml4Lm1bNV0gKyB0aGlzLm1bNV07XG4gICAgICAgIHRoaXMubVswXSA9IG0xMTtcbiAgICAgICAgdGhpcy5tWzFdID0gbTEyO1xuICAgICAgICB0aGlzLm1bMl0gPSBtMjE7XG4gICAgICAgIHRoaXMubVszXSA9IG0yMjtcbiAgICAgICAgdGhpcy5tWzRdID0gZHg7XG4gICAgICAgIHRoaXMubVs1XSA9IGR5O1xuICAgICAgICByZXR1cm4gdGhpcztcbiAgICB9XG4gICAgaW52ZXJ0KCkge1xuICAgICAgICB2YXIgZCA9IDEgLyAodGhpcy5tWzBdICogdGhpcy5tWzNdIC0gdGhpcy5tWzFdICogdGhpcy5tWzJdKTtcbiAgICAgICAgdmFyIG0wID0gdGhpcy5tWzNdICogZDtcbiAgICAgICAgdmFyIG0xID0gLXRoaXMubVsxXSAqIGQ7XG4gICAgICAgIHZhciBtMiA9IC10aGlzLm1bMl0gKiBkO1xuICAgICAgICB2YXIgbTMgPSB0aGlzLm1bMF0gKiBkO1xuICAgICAgICB2YXIgbTQgPSBkICogKHRoaXMubVsyXSAqIHRoaXMubVs1XSAtIHRoaXMubVszXSAqIHRoaXMubVs0XSk7XG4gICAgICAgIHZhciBtNSA9IGQgKiAodGhpcy5tWzFdICogdGhpcy5tWzRdIC0gdGhpcy5tWzBdICogdGhpcy5tWzVdKTtcbiAgICAgICAgdGhpcy5tWzBdID0gbTA7XG4gICAgICAgIHRoaXMubVsxXSA9IG0xO1xuICAgICAgICB0aGlzLm1bMl0gPSBtMjtcbiAgICAgICAgdGhpcy5tWzNdID0gbTM7XG4gICAgICAgIHRoaXMubVs0XSA9IG00O1xuICAgICAgICB0aGlzLm1bNV0gPSBtNTtcbiAgICAgICAgcmV0dXJuIHRoaXM7XG4gICAgfVxuICAgIGdldE1hdHJpeCgpIHtcbiAgICAgICAgcmV0dXJuIHRoaXMubTtcbiAgICB9XG4gICAgZGVjb21wb3NlKCkge1xuICAgICAgICB2YXIgYSA9IHRoaXMubVswXTtcbiAgICAgICAgdmFyIGIgPSB0aGlzLm1bMV07XG4gICAgICAgIHZhciBjID0gdGhpcy5tWzJdO1xuICAgICAgICB2YXIgZCA9IHRoaXMubVszXTtcbiAgICAgICAgdmFyIGUgPSB0aGlzLm1bNF07XG4gICAgICAgIHZhciBmID0gdGhpcy5tWzVdO1xuICAgICAgICB2YXIgZGVsdGEgPSBhICogZCAtIGIgKiBjO1xuICAgICAgICBsZXQgcmVzdWx0ID0ge1xuICAgICAgICAgICAgeDogZSxcbiAgICAgICAgICAgIHk6IGYsXG4gICAgICAgICAgICByb3RhdGlvbjogMCxcbiAgICAgICAgICAgIHNjYWxlWDogMCxcbiAgICAgICAgICAgIHNjYWxlWTogMCxcbiAgICAgICAgICAgIHNrZXdYOiAwLFxuICAgICAgICAgICAgc2tld1k6IDAsXG4gICAgICAgIH07XG4gICAgICAgIGlmIChhICE9IDAgfHwgYiAhPSAwKSB7XG4gICAgICAgICAgICB2YXIgciA9IE1hdGguc3FydChhICogYSArIGIgKiBiKTtcbiAgICAgICAgICAgIHJlc3VsdC5yb3RhdGlvbiA9IGIgPiAwID8gTWF0aC5hY29zKGEgLyByKSA6IC1NYXRoLmFjb3MoYSAvIHIpO1xuICAgICAgICAgICAgcmVzdWx0LnNjYWxlWCA9IHI7XG4gICAgICAgICAgICByZXN1bHQuc2NhbGVZID0gZGVsdGEgLyByO1xuICAgICAgICAgICAgcmVzdWx0LnNrZXdYID0gKGEgKiBjICsgYiAqIGQpIC8gZGVsdGE7XG4gICAgICAgICAgICByZXN1bHQuc2tld1kgPSAwO1xuICAgICAgICB9XG4gICAgICAgIGVsc2UgaWYgKGMgIT0gMCB8fCBkICE9IDApIHtcbiAgICAgICAgICAgIHZhciBzID0gTWF0aC5zcXJ0KGMgKiBjICsgZCAqIGQpO1xuICAgICAgICAgICAgcmVzdWx0LnJvdGF0aW9uID1cbiAgICAgICAgICAgICAgICBNYXRoLlBJIC8gMiAtIChkID4gMCA/IE1hdGguYWNvcygtYyAvIHMpIDogLU1hdGguYWNvcyhjIC8gcykpO1xuICAgICAgICAgICAgcmVzdWx0LnNjYWxlWCA9IGRlbHRhIC8gcztcbiAgICAgICAgICAgIHJlc3VsdC5zY2FsZVkgPSBzO1xuICAgICAgICAgICAgcmVzdWx0LnNrZXdYID0gMDtcbiAgICAgICAgICAgIHJlc3VsdC5za2V3WSA9IChhICogYyArIGIgKiBkKSAvIGRlbHRhO1xuICAgICAgICB9XG4gICAgICAgIGVsc2Uge1xuICAgICAgICB9XG4gICAgICAgIHJlc3VsdC5yb3RhdGlvbiA9IFV0aWwuX2dldFJvdGF0aW9uKHJlc3VsdC5yb3RhdGlvbik7XG4gICAgICAgIHJldHVybiByZXN1bHQ7XG4gICAgfVxufVxudmFyIE9CSkVDVF9BUlJBWSA9ICdbb2JqZWN0IEFycmF5XScsIE9CSkVDVF9OVU1CRVIgPSAnW29iamVjdCBOdW1iZXJdJywgT0JKRUNUX1NUUklORyA9ICdbb2JqZWN0IFN0cmluZ10nLCBPQkpFQ1RfQk9PTEVBTiA9ICdbb2JqZWN0IEJvb2xlYW5dJywgUElfT1ZFUl9ERUcxODAgPSBNYXRoLlBJIC8gMTgwLCBERUcxODBfT1ZFUl9QSSA9IDE4MCAvIE1hdGguUEksIEhBU0ggPSAnIycsIEVNUFRZX1NUUklORyA9ICcnLCBaRVJPID0gJzAnLCBLT05WQV9XQVJOSU5HID0gJ0tvbnZhIHdhcm5pbmc6ICcsIEtPTlZBX0VSUk9SID0gJ0tvbnZhIGVycm9yOiAnLCBSR0JfUEFSRU4gPSAncmdiKCcsIENPTE9SUyA9IHtcbiAgICBhbGljZWJsdWU6IFsyNDAsIDI0OCwgMjU1XSxcbiAgICBhbnRpcXVld2hpdGU6IFsyNTAsIDIzNSwgMjE1XSxcbiAgICBhcXVhOiBbMCwgMjU1LCAyNTVdLFxuICAgIGFxdWFtYXJpbmU6IFsxMjcsIDI1NSwgMjEyXSxcbiAgICBhenVyZTogWzI0MCwgMjU1LCAyNTVdLFxuICAgIGJlaWdlOiBbMjQ1LCAyNDUsIDIyMF0sXG4gICAgYmlzcXVlOiBbMjU1LCAyMjgsIDE5Nl0sXG4gICAgYmxhY2s6IFswLCAwLCAwXSxcbiAgICBibGFuY2hlZGFsbW9uZDogWzI1NSwgMjM1LCAyMDVdLFxuICAgIGJsdWU6IFswLCAwLCAyNTVdLFxuICAgIGJsdWV2aW9sZXQ6IFsxMzgsIDQzLCAyMjZdLFxuICAgIGJyb3duOiBbMTY1LCA0MiwgNDJdLFxuICAgIGJ1cmx5d29vZDogWzIyMiwgMTg0LCAxMzVdLFxuICAgIGNhZGV0Ymx1ZTogWzk1LCAxNTgsIDE2MF0sXG4gICAgY2hhcnRyZXVzZTogWzEyNywgMjU1LCAwXSxcbiAgICBjaG9jb2xhdGU6IFsyMTAsIDEwNSwgMzBdLFxuICAgIGNvcmFsOiBbMjU1LCAxMjcsIDgwXSxcbiAgICBjb3JuZmxvd2VyYmx1ZTogWzEwMCwgMTQ5LCAyMzddLFxuICAgIGNvcm5zaWxrOiBbMjU1LCAyNDgsIDIyMF0sXG4gICAgY3JpbXNvbjogWzIyMCwgMjAsIDYwXSxcbiAgICBjeWFuOiBbMCwgMjU1LCAyNTVdLFxuICAgIGRhcmtibHVlOiBbMCwgMCwgMTM5XSxcbiAgICBkYXJrY3lhbjogWzAsIDEzOSwgMTM5XSxcbiAgICBkYXJrZ29sZGVucm9kOiBbMTg0LCAxMzIsIDExXSxcbiAgICBkYXJrZ3JheTogWzE2OSwgMTY5LCAxNjldLFxuICAgIGRhcmtncmVlbjogWzAsIDEwMCwgMF0sXG4gICAgZGFya2dyZXk6IFsxNjksIDE2OSwgMTY5XSxcbiAgICBkYXJra2hha2k6IFsxODksIDE4MywgMTA3XSxcbiAgICBkYXJrbWFnZW50YTogWzEzOSwgMCwgMTM5XSxcbiAgICBkYXJrb2xpdmVncmVlbjogWzg1LCAxMDcsIDQ3XSxcbiAgICBkYXJrb3JhbmdlOiBbMjU1LCAxNDAsIDBdLFxuICAgIGRhcmtvcmNoaWQ6IFsxNTMsIDUwLCAyMDRdLFxuICAgIGRhcmtyZWQ6IFsxMzksIDAsIDBdLFxuICAgIGRhcmtzYWxtb246IFsyMzMsIDE1MCwgMTIyXSxcbiAgICBkYXJrc2VhZ3JlZW46IFsxNDMsIDE4OCwgMTQzXSxcbiAgICBkYXJrc2xhdGVibHVlOiBbNzIsIDYxLCAxMzldLFxuICAgIGRhcmtzbGF0ZWdyYXk6IFs0NywgNzksIDc5XSxcbiAgICBkYXJrc2xhdGVncmV5OiBbNDcsIDc5LCA3OV0sXG4gICAgZGFya3R1cnF1b2lzZTogWzAsIDIwNiwgMjA5XSxcbiAgICBkYXJrdmlvbGV0OiBbMTQ4LCAwLCAyMTFdLFxuICAgIGRlZXBwaW5rOiBbMjU1LCAyMCwgMTQ3XSxcbiAgICBkZWVwc2t5Ymx1ZTogWzAsIDE5MSwgMjU1XSxcbiAgICBkaW1ncmF5OiBbMTA1LCAxMDUsIDEwNV0sXG4gICAgZGltZ3JleTogWzEwNSwgMTA1LCAxMDVdLFxuICAgIGRvZGdlcmJsdWU6IFszMCwgMTQ0LCAyNTVdLFxuICAgIGZpcmVicmljazogWzE3OCwgMzQsIDM0XSxcbiAgICBmbG9yYWx3aGl0ZTogWzI1NSwgMjU1LCAyNDBdLFxuICAgIGZvcmVzdGdyZWVuOiBbMzQsIDEzOSwgMzRdLFxuICAgIGZ1Y2hzaWE6IFsyNTUsIDAsIDI1NV0sXG4gICAgZ2FpbnNib3JvOiBbMjIwLCAyMjAsIDIyMF0sXG4gICAgZ2hvc3R3aGl0ZTogWzI0OCwgMjQ4LCAyNTVdLFxuICAgIGdvbGQ6IFsyNTUsIDIxNSwgMF0sXG4gICAgZ29sZGVucm9kOiBbMjE4LCAxNjUsIDMyXSxcbiAgICBncmF5OiBbMTI4LCAxMjgsIDEyOF0sXG4gICAgZ3JlZW46IFswLCAxMjgsIDBdLFxuICAgIGdyZWVueWVsbG93OiBbMTczLCAyNTUsIDQ3XSxcbiAgICBncmV5OiBbMTI4LCAxMjgsIDEyOF0sXG4gICAgaG9uZXlkZXc6IFsyNDAsIDI1NSwgMjQwXSxcbiAgICBob3RwaW5rOiBbMjU1LCAxMDUsIDE4MF0sXG4gICAgaW5kaWFucmVkOiBbMjA1LCA5MiwgOTJdLFxuICAgIGluZGlnbzogWzc1LCAwLCAxMzBdLFxuICAgIGl2b3J5OiBbMjU1LCAyNTUsIDI0MF0sXG4gICAga2hha2k6IFsyNDAsIDIzMCwgMTQwXSxcbiAgICBsYXZlbmRlcjogWzIzMCwgMjMwLCAyNTBdLFxuICAgIGxhdmVuZGVyYmx1c2g6IFsyNTUsIDI0MCwgMjQ1XSxcbiAgICBsYXduZ3JlZW46IFsxMjQsIDI1MiwgMF0sXG4gICAgbGVtb25jaGlmZm9uOiBbMjU1LCAyNTAsIDIwNV0sXG4gICAgbGlnaHRibHVlOiBbMTczLCAyMTYsIDIzMF0sXG4gICAgbGlnaHRjb3JhbDogWzI0MCwgMTI4LCAxMjhdLFxuICAgIGxpZ2h0Y3lhbjogWzIyNCwgMjU1LCAyNTVdLFxuICAgIGxpZ2h0Z29sZGVucm9keWVsbG93OiBbMjUwLCAyNTAsIDIxMF0sXG4gICAgbGlnaHRncmF5OiBbMjExLCAyMTEsIDIxMV0sXG4gICAgbGlnaHRncmVlbjogWzE0NCwgMjM4LCAxNDRdLFxuICAgIGxpZ2h0Z3JleTogWzIxMSwgMjExLCAyMTFdLFxuICAgIGxpZ2h0cGluazogWzI1NSwgMTgyLCAxOTNdLFxuICAgIGxpZ2h0c2FsbW9uOiBbMjU1LCAxNjAsIDEyMl0sXG4gICAgbGlnaHRzZWFncmVlbjogWzMyLCAxNzgsIDE3MF0sXG4gICAgbGlnaHRza3libHVlOiBbMTM1LCAyMDYsIDI1MF0sXG4gICAgbGlnaHRzbGF0ZWdyYXk6IFsxMTksIDEzNiwgMTUzXSxcbiAgICBsaWdodHNsYXRlZ3JleTogWzExOSwgMTM2LCAxNTNdLFxuICAgIGxpZ2h0c3RlZWxibHVlOiBbMTc2LCAxOTYsIDIyMl0sXG4gICAgbGlnaHR5ZWxsb3c6IFsyNTUsIDI1NSwgMjI0XSxcbiAgICBsaW1lOiBbMCwgMjU1LCAwXSxcbiAgICBsaW1lZ3JlZW46IFs1MCwgMjA1LCA1MF0sXG4gICAgbGluZW46IFsyNTAsIDI0MCwgMjMwXSxcbiAgICBtYWdlbnRhOiBbMjU1LCAwLCAyNTVdLFxuICAgIG1hcm9vbjogWzEyOCwgMCwgMF0sXG4gICAgbWVkaXVtYXF1YW1hcmluZTogWzEwMiwgMjA1LCAxNzBdLFxuICAgIG1lZGl1bWJsdWU6IFswLCAwLCAyMDVdLFxuICAgIG1lZGl1bW9yY2hpZDogWzE4NiwgODUsIDIxMV0sXG4gICAgbWVkaXVtcHVycGxlOiBbMTQ3LCAxMTIsIDIxOV0sXG4gICAgbWVkaXVtc2VhZ3JlZW46IFs2MCwgMTc5LCAxMTNdLFxuICAgIG1lZGl1bXNsYXRlYmx1ZTogWzEyMywgMTA0LCAyMzhdLFxuICAgIG1lZGl1bXNwcmluZ2dyZWVuOiBbMCwgMjUwLCAxNTRdLFxuICAgIG1lZGl1bXR1cnF1b2lzZTogWzcyLCAyMDksIDIwNF0sXG4gICAgbWVkaXVtdmlvbGV0cmVkOiBbMTk5LCAyMSwgMTMzXSxcbiAgICBtaWRuaWdodGJsdWU6IFsyNSwgMjUsIDExMl0sXG4gICAgbWludGNyZWFtOiBbMjQ1LCAyNTUsIDI1MF0sXG4gICAgbWlzdHlyb3NlOiBbMjU1LCAyMjgsIDIyNV0sXG4gICAgbW9jY2FzaW46IFsyNTUsIDIyOCwgMTgxXSxcbiAgICBuYXZham93aGl0ZTogWzI1NSwgMjIyLCAxNzNdLFxuICAgIG5hdnk6IFswLCAwLCAxMjhdLFxuICAgIG9sZGxhY2U6IFsyNTMsIDI0NSwgMjMwXSxcbiAgICBvbGl2ZTogWzEyOCwgMTI4LCAwXSxcbiAgICBvbGl2ZWRyYWI6IFsxMDcsIDE0MiwgMzVdLFxuICAgIG9yYW5nZTogWzI1NSwgMTY1LCAwXSxcbiAgICBvcmFuZ2VyZWQ6IFsyNTUsIDY5LCAwXSxcbiAgICBvcmNoaWQ6IFsyMTgsIDExMiwgMjE0XSxcbiAgICBwYWxlZ29sZGVucm9kOiBbMjM4LCAyMzIsIDE3MF0sXG4gICAgcGFsZWdyZWVuOiBbMTUyLCAyNTEsIDE1Ml0sXG4gICAgcGFsZXR1cnF1b2lzZTogWzE3NSwgMjM4LCAyMzhdLFxuICAgIHBhbGV2aW9sZXRyZWQ6IFsyMTksIDExMiwgMTQ3XSxcbiAgICBwYXBheWF3aGlwOiBbMjU1LCAyMzksIDIxM10sXG4gICAgcGVhY2hwdWZmOiBbMjU1LCAyMTgsIDE4NV0sXG4gICAgcGVydTogWzIwNSwgMTMzLCA2M10sXG4gICAgcGluazogWzI1NSwgMTkyLCAyMDNdLFxuICAgIHBsdW06IFsyMjEsIDE2MCwgMjAzXSxcbiAgICBwb3dkZXJibHVlOiBbMTc2LCAyMjQsIDIzMF0sXG4gICAgcHVycGxlOiBbMTI4LCAwLCAxMjhdLFxuICAgIHJlYmVjY2FwdXJwbGU6IFsxMDIsIDUxLCAxNTNdLFxuICAgIHJlZDogWzI1NSwgMCwgMF0sXG4gICAgcm9zeWJyb3duOiBbMTg4LCAxNDMsIDE0M10sXG4gICAgcm95YWxibHVlOiBbNjUsIDEwNSwgMjI1XSxcbiAgICBzYWRkbGVicm93bjogWzEzOSwgNjksIDE5XSxcbiAgICBzYWxtb246IFsyNTAsIDEyOCwgMTE0XSxcbiAgICBzYW5keWJyb3duOiBbMjQ0LCAxNjQsIDk2XSxcbiAgICBzZWFncmVlbjogWzQ2LCAxMzksIDg3XSxcbiAgICBzZWFzaGVsbDogWzI1NSwgMjQ1LCAyMzhdLFxuICAgIHNpZW5uYTogWzE2MCwgODIsIDQ1XSxcbiAgICBzaWx2ZXI6IFsxOTIsIDE5MiwgMTkyXSxcbiAgICBza3libHVlOiBbMTM1LCAyMDYsIDIzNV0sXG4gICAgc2xhdGVibHVlOiBbMTA2LCA5MCwgMjA1XSxcbiAgICBzbGF0ZWdyYXk6IFsxMTksIDEyOCwgMTQ0XSxcbiAgICBzbGF0ZWdyZXk6IFsxMTksIDEyOCwgMTQ0XSxcbiAgICBzbm93OiBbMjU1LCAyNTUsIDI1MF0sXG4gICAgc3ByaW5nZ3JlZW46IFswLCAyNTUsIDEyN10sXG4gICAgc3RlZWxibHVlOiBbNzAsIDEzMCwgMTgwXSxcbiAgICB0YW46IFsyMTAsIDE4MCwgMTQwXSxcbiAgICB0ZWFsOiBbMCwgMTI4LCAxMjhdLFxuICAgIHRoaXN0bGU6IFsyMTYsIDE5MSwgMjE2XSxcbiAgICB0cmFuc3BhcmVudDogWzI1NSwgMjU1LCAyNTUsIDBdLFxuICAgIHRvbWF0bzogWzI1NSwgOTksIDcxXSxcbiAgICB0dXJxdW9pc2U6IFs2NCwgMjI0LCAyMDhdLFxuICAgIHZpb2xldDogWzIzOCwgMTMwLCAyMzhdLFxuICAgIHdoZWF0OiBbMjQ1LCAyMjIsIDE3OV0sXG4gICAgd2hpdGU6IFsyNTUsIDI1NSwgMjU1XSxcbiAgICB3aGl0ZXNtb2tlOiBbMjQ1LCAyNDUsIDI0NV0sXG4gICAgeWVsbG93OiBbMjU1LCAyNTUsIDBdLFxuICAgIHllbGxvd2dyZWVuOiBbMTU0LCAyMDUsIDVdLFxufSwgUkdCX1JFR0VYID0gL3JnYlxcKChcXGR7MSwzfSksKFxcZHsxLDN9KSwoXFxkezEsM30pXFwpLywgYW5pbVF1ZXVlID0gW107XG5jb25zdCByZXEgPSAodHlwZW9mIHJlcXVlc3RBbmltYXRpb25GcmFtZSAhPT0gJ3VuZGVmaW5lZCcgJiYgcmVxdWVzdEFuaW1hdGlvbkZyYW1lKSB8fFxuICAgIGZ1bmN0aW9uIChmKSB7XG4gICAgICAgIHNldFRpbWVvdXQoZiwgNjApO1xuICAgIH07XG5leHBvcnQgY29uc3QgVXRpbCA9IHtcbiAgICBfaXNFbGVtZW50KG9iaikge1xuICAgICAgICByZXR1cm4gISEob2JqICYmIG9iai5ub2RlVHlwZSA9PSAxKTtcbiAgICB9LFxuICAgIF9pc0Z1bmN0aW9uKG9iaikge1xuICAgICAgICByZXR1cm4gISEob2JqICYmIG9iai5jb25zdHJ1Y3RvciAmJiBvYmouY2FsbCAmJiBvYmouYXBwbHkpO1xuICAgIH0sXG4gICAgX2lzUGxhaW5PYmplY3Qob2JqKSB7XG4gICAgICAgIHJldHVybiAhIW9iaiAmJiBvYmouY29uc3RydWN0b3IgPT09IE9iamVjdDtcbiAgICB9LFxuICAgIF9pc0FycmF5KG9iaikge1xuICAgICAgICByZXR1cm4gT2JqZWN0LnByb3RvdHlwZS50b1N0cmluZy5jYWxsKG9iaikgPT09IE9CSkVDVF9BUlJBWTtcbiAgICB9LFxuICAgIF9pc051bWJlcihvYmopIHtcbiAgICAgICAgcmV0dXJuIChPYmplY3QucHJvdG90eXBlLnRvU3RyaW5nLmNhbGwob2JqKSA9PT0gT0JKRUNUX05VTUJFUiAmJlxuICAgICAgICAgICAgIWlzTmFOKG9iaikgJiZcbiAgICAgICAgICAgIGlzRmluaXRlKG9iaikpO1xuICAgIH0sXG4gICAgX2lzU3RyaW5nKG9iaikge1xuICAgICAgICByZXR1cm4gT2JqZWN0LnByb3RvdHlwZS50b1N0cmluZy5jYWxsKG9iaikgPT09IE9CSkVDVF9TVFJJTkc7XG4gICAgfSxcbiAgICBfaXNCb29sZWFuKG9iaikge1xuICAgICAgICByZXR1cm4gT2JqZWN0LnByb3RvdHlwZS50b1N0cmluZy5jYWxsKG9iaikgPT09IE9CSkVDVF9CT09MRUFOO1xuICAgIH0sXG4gICAgaXNPYmplY3QodmFsKSB7XG4gICAgICAgIHJldHVybiB2YWwgaW5zdGFuY2VvZiBPYmplY3Q7XG4gICAgfSxcbiAgICBpc1ZhbGlkU2VsZWN0b3Ioc2VsZWN0b3IpIHtcbiAgICAgICAgaWYgKHR5cGVvZiBzZWxlY3RvciAhPT0gJ3N0cmluZycpIHtcbiAgICAgICAgICAgIHJldHVybiBmYWxzZTtcbiAgICAgICAgfVxuICAgICAgICB2YXIgZmlyc3RDaGFyID0gc2VsZWN0b3JbMF07XG4gICAgICAgIHJldHVybiAoZmlyc3RDaGFyID09PSAnIycgfHxcbiAgICAgICAgICAgIGZpcnN0Q2hhciA9PT0gJy4nIHx8XG4gICAgICAgICAgICBmaXJzdENoYXIgPT09IGZpcnN0Q2hhci50b1VwcGVyQ2FzZSgpKTtcbiAgICB9LFxuICAgIF9zaWduKG51bWJlcikge1xuICAgICAgICBpZiAobnVtYmVyID09PSAwKSB7XG4gICAgICAgICAgICByZXR1cm4gMTtcbiAgICAgICAgfVxuICAgICAgICBpZiAobnVtYmVyID4gMCkge1xuICAgICAgICAgICAgcmV0dXJuIDE7XG4gICAgICAgIH1cbiAgICAgICAgZWxzZSB7XG4gICAgICAgICAgICByZXR1cm4gLTE7XG4gICAgICAgIH1cbiAgICB9LFxuICAgIHJlcXVlc3RBbmltRnJhbWUoY2FsbGJhY2spIHtcbiAgICAgICAgYW5pbVF1ZXVlLnB1c2goY2FsbGJhY2spO1xuICAgICAgICBpZiAoYW5pbVF1ZXVlLmxlbmd0aCA9PT0gMSkge1xuICAgICAgICAgICAgcmVxKGZ1bmN0aW9uICgpIHtcbiAgICAgICAgICAgICAgICBjb25zdCBxdWV1ZSA9IGFuaW1RdWV1ZTtcbiAgICAgICAgICAgICAgICBhbmltUXVldWUgPSBbXTtcbiAgICAgICAgICAgICAgICBxdWV1ZS5mb3JFYWNoKGZ1bmN0aW9uIChjYikge1xuICAgICAgICAgICAgICAgICAgICBjYigpO1xuICAgICAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgfSk7XG4gICAgICAgIH1cbiAgICB9LFxuICAgIGNyZWF0ZUNhbnZhc0VsZW1lbnQoKSB7XG4gICAgICAgIHZhciBjYW52YXMgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdjYW52YXMnKTtcbiAgICAgICAgdHJ5IHtcbiAgICAgICAgICAgIGNhbnZhcy5zdHlsZSA9IGNhbnZhcy5zdHlsZSB8fCB7fTtcbiAgICAgICAgfVxuICAgICAgICBjYXRjaCAoZSkgeyB9XG4gICAgICAgIHJldHVybiBjYW52YXM7XG4gICAgfSxcbiAgICBjcmVhdGVJbWFnZUVsZW1lbnQoKSB7XG4gICAgICAgIHJldHVybiBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdpbWcnKTtcbiAgICB9LFxuICAgIF9pc0luRG9jdW1lbnQoZWwpIHtcbiAgICAgICAgd2hpbGUgKChlbCA9IGVsLnBhcmVudE5vZGUpKSB7XG4gICAgICAgICAgICBpZiAoZWwgPT0gZG9jdW1lbnQpIHtcbiAgICAgICAgICAgICAgICByZXR1cm4gdHJ1ZTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgICByZXR1cm4gZmFsc2U7XG4gICAgfSxcbiAgICBfdXJsVG9JbWFnZSh1cmwsIGNhbGxiYWNrKSB7XG4gICAgICAgIHZhciBpbWFnZU9iaiA9IFV0aWwuY3JlYXRlSW1hZ2VFbGVtZW50KCk7XG4gICAgICAgIGltYWdlT2JqLm9ubG9hZCA9IGZ1bmN0aW9uICgpIHtcbiAgICAgICAgICAgIGNhbGxiYWNrKGltYWdlT2JqKTtcbiAgICAgICAgfTtcbiAgICAgICAgaW1hZ2VPYmouc3JjID0gdXJsO1xuICAgIH0sXG4gICAgX3JnYlRvSGV4KHIsIGcsIGIpIHtcbiAgICAgICAgcmV0dXJuICgoMSA8PCAyNCkgKyAociA8PCAxNikgKyAoZyA8PCA4KSArIGIpLnRvU3RyaW5nKDE2KS5zbGljZSgxKTtcbiAgICB9LFxuICAgIF9oZXhUb1JnYihoZXgpIHtcbiAgICAgICAgaGV4ID0gaGV4LnJlcGxhY2UoSEFTSCwgRU1QVFlfU1RSSU5HKTtcbiAgICAgICAgdmFyIGJpZ2ludCA9IHBhcnNlSW50KGhleCwgMTYpO1xuICAgICAgICByZXR1cm4ge1xuICAgICAgICAgICAgcjogKGJpZ2ludCA+PiAxNikgJiAyNTUsXG4gICAgICAgICAgICBnOiAoYmlnaW50ID4+IDgpICYgMjU1LFxuICAgICAgICAgICAgYjogYmlnaW50ICYgMjU1LFxuICAgICAgICB9O1xuICAgIH0sXG4gICAgZ2V0UmFuZG9tQ29sb3IoKSB7XG4gICAgICAgIHZhciByYW5kQ29sb3IgPSAoKE1hdGgucmFuZG9tKCkgKiAweGZmZmZmZikgPDwgMCkudG9TdHJpbmcoMTYpO1xuICAgICAgICB3aGlsZSAocmFuZENvbG9yLmxlbmd0aCA8IDYpIHtcbiAgICAgICAgICAgIHJhbmRDb2xvciA9IFpFUk8gKyByYW5kQ29sb3I7XG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuIEhBU0ggKyByYW5kQ29sb3I7XG4gICAgfSxcbiAgICBnZXRSR0IoY29sb3IpIHtcbiAgICAgICAgdmFyIHJnYjtcbiAgICAgICAgaWYgKGNvbG9yIGluIENPTE9SUykge1xuICAgICAgICAgICAgcmdiID0gQ09MT1JTW2NvbG9yXTtcbiAgICAgICAgICAgIHJldHVybiB7XG4gICAgICAgICAgICAgICAgcjogcmdiWzBdLFxuICAgICAgICAgICAgICAgIGc6IHJnYlsxXSxcbiAgICAgICAgICAgICAgICBiOiByZ2JbMl0sXG4gICAgICAgICAgICB9O1xuICAgICAgICB9XG4gICAgICAgIGVsc2UgaWYgKGNvbG9yWzBdID09PSBIQVNIKSB7XG4gICAgICAgICAgICByZXR1cm4gdGhpcy5faGV4VG9SZ2IoY29sb3Iuc3Vic3RyaW5nKDEpKTtcbiAgICAgICAgfVxuICAgICAgICBlbHNlIGlmIChjb2xvci5zdWJzdHIoMCwgNCkgPT09IFJHQl9QQVJFTikge1xuICAgICAgICAgICAgcmdiID0gUkdCX1JFR0VYLmV4ZWMoY29sb3IucmVwbGFjZSgvIC9nLCAnJykpO1xuICAgICAgICAgICAgcmV0dXJuIHtcbiAgICAgICAgICAgICAgICByOiBwYXJzZUludChyZ2JbMV0sIDEwKSxcbiAgICAgICAgICAgICAgICBnOiBwYXJzZUludChyZ2JbMl0sIDEwKSxcbiAgICAgICAgICAgICAgICBiOiBwYXJzZUludChyZ2JbM10sIDEwKSxcbiAgICAgICAgICAgIH07XG4gICAgICAgIH1cbiAgICAgICAgZWxzZSB7XG4gICAgICAgICAgICByZXR1cm4ge1xuICAgICAgICAgICAgICAgIHI6IDAsXG4gICAgICAgICAgICAgICAgZzogMCxcbiAgICAgICAgICAgICAgICBiOiAwLFxuICAgICAgICAgICAgfTtcbiAgICAgICAgfVxuICAgIH0sXG4gICAgY29sb3JUb1JHQkEoc3RyKSB7XG4gICAgICAgIHN0ciA9IHN0ciB8fCAnYmxhY2snO1xuICAgICAgICByZXR1cm4gKFV0aWwuX25hbWVkQ29sb3JUb1JCQShzdHIpIHx8XG4gICAgICAgICAgICBVdGlsLl9oZXgzQ29sb3JUb1JHQkEoc3RyKSB8fFxuICAgICAgICAgICAgVXRpbC5faGV4NENvbG9yVG9SR0JBKHN0cikgfHxcbiAgICAgICAgICAgIFV0aWwuX2hleDZDb2xvclRvUkdCQShzdHIpIHx8XG4gICAgICAgICAgICBVdGlsLl9oZXg4Q29sb3JUb1JHQkEoc3RyKSB8fFxuICAgICAgICAgICAgVXRpbC5fcmdiQ29sb3JUb1JHQkEoc3RyKSB8fFxuICAgICAgICAgICAgVXRpbC5fcmdiYUNvbG9yVG9SR0JBKHN0cikgfHxcbiAgICAgICAgICAgIFV0aWwuX2hzbENvbG9yVG9SR0JBKHN0cikpO1xuICAgIH0sXG4gICAgX25hbWVkQ29sb3JUb1JCQShzdHIpIHtcbiAgICAgICAgdmFyIGMgPSBDT0xPUlNbc3RyLnRvTG93ZXJDYXNlKCldO1xuICAgICAgICBpZiAoIWMpIHtcbiAgICAgICAgICAgIHJldHVybiBudWxsO1xuICAgICAgICB9XG4gICAgICAgIHJldHVybiB7XG4gICAgICAgICAgICByOiBjWzBdLFxuICAgICAgICAgICAgZzogY1sxXSxcbiAgICAgICAgICAgIGI6IGNbMl0sXG4gICAgICAgICAgICBhOiAxLFxuICAgICAgICB9O1xuICAgIH0sXG4gICAgX3JnYkNvbG9yVG9SR0JBKHN0cikge1xuICAgICAgICBpZiAoc3RyLmluZGV4T2YoJ3JnYignKSA9PT0gMCkge1xuICAgICAgICAgICAgc3RyID0gc3RyLm1hdGNoKC9yZ2JcXCgoW14pXSspXFwpLylbMV07XG4gICAgICAgICAgICB2YXIgcGFydHMgPSBzdHIuc3BsaXQoLyAqLCAqLykubWFwKE51bWJlcik7XG4gICAgICAgICAgICByZXR1cm4ge1xuICAgICAgICAgICAgICAgIHI6IHBhcnRzWzBdLFxuICAgICAgICAgICAgICAgIGc6IHBhcnRzWzFdLFxuICAgICAgICAgICAgICAgIGI6IHBhcnRzWzJdLFxuICAgICAgICAgICAgICAgIGE6IDEsXG4gICAgICAgICAgICB9O1xuICAgICAgICB9XG4gICAgfSxcbiAgICBfcmdiYUNvbG9yVG9SR0JBKHN0cikge1xuICAgICAgICBpZiAoc3RyLmluZGV4T2YoJ3JnYmEoJykgPT09IDApIHtcbiAgICAgICAgICAgIHN0ciA9IHN0ci5tYXRjaCgvcmdiYVxcKChbXildKylcXCkvKVsxXTtcbiAgICAgICAgICAgIHZhciBwYXJ0cyA9IHN0ci5zcGxpdCgvICosICovKS5tYXAoKG4sIGluZGV4KSA9PiB7XG4gICAgICAgICAgICAgICAgaWYgKG4uc2xpY2UoLTEpID09PSAnJScpIHtcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuIGluZGV4ID09PSAzID8gcGFyc2VJbnQobikgLyAxMDAgOiAocGFyc2VJbnQobikgLyAxMDApICogMjU1O1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICByZXR1cm4gTnVtYmVyKG4pO1xuICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICByZXR1cm4ge1xuICAgICAgICAgICAgICAgIHI6IHBhcnRzWzBdLFxuICAgICAgICAgICAgICAgIGc6IHBhcnRzWzFdLFxuICAgICAgICAgICAgICAgIGI6IHBhcnRzWzJdLFxuICAgICAgICAgICAgICAgIGE6IHBhcnRzWzNdLFxuICAgICAgICAgICAgfTtcbiAgICAgICAgfVxuICAgIH0sXG4gICAgX2hleDhDb2xvclRvUkdCQShzdHIpIHtcbiAgICAgICAgaWYgKHN0clswXSA9PT0gJyMnICYmIHN0ci5sZW5ndGggPT09IDkpIHtcbiAgICAgICAgICAgIHJldHVybiB7XG4gICAgICAgICAgICAgICAgcjogcGFyc2VJbnQoc3RyLnNsaWNlKDEsIDMpLCAxNiksXG4gICAgICAgICAgICAgICAgZzogcGFyc2VJbnQoc3RyLnNsaWNlKDMsIDUpLCAxNiksXG4gICAgICAgICAgICAgICAgYjogcGFyc2VJbnQoc3RyLnNsaWNlKDUsIDcpLCAxNiksXG4gICAgICAgICAgICAgICAgYTogcGFyc2VJbnQoc3RyLnNsaWNlKDcsIDkpLCAxNikgLyAweGZmLFxuICAgICAgICAgICAgfTtcbiAgICAgICAgfVxuICAgIH0sXG4gICAgX2hleDZDb2xvclRvUkdCQShzdHIpIHtcbiAgICAgICAgaWYgKHN0clswXSA9PT0gJyMnICYmIHN0ci5sZW5ndGggPT09IDcpIHtcbiAgICAgICAgICAgIHJldHVybiB7XG4gICAgICAgICAgICAgICAgcjogcGFyc2VJbnQoc3RyLnNsaWNlKDEsIDMpLCAxNiksXG4gICAgICAgICAgICAgICAgZzogcGFyc2VJbnQoc3RyLnNsaWNlKDMsIDUpLCAxNiksXG4gICAgICAgICAgICAgICAgYjogcGFyc2VJbnQoc3RyLnNsaWNlKDUsIDcpLCAxNiksXG4gICAgICAgICAgICAgICAgYTogMSxcbiAgICAgICAgICAgIH07XG4gICAgICAgIH1cbiAgICB9LFxuICAgIF9oZXg0Q29sb3JUb1JHQkEoc3RyKSB7XG4gICAgICAgIGlmIChzdHJbMF0gPT09ICcjJyAmJiBzdHIubGVuZ3RoID09PSA1KSB7XG4gICAgICAgICAgICByZXR1cm4ge1xuICAgICAgICAgICAgICAgIHI6IHBhcnNlSW50KHN0clsxXSArIHN0clsxXSwgMTYpLFxuICAgICAgICAgICAgICAgIGc6IHBhcnNlSW50KHN0clsyXSArIHN0clsyXSwgMTYpLFxuICAgICAgICAgICAgICAgIGI6IHBhcnNlSW50KHN0clszXSArIHN0clszXSwgMTYpLFxuICAgICAgICAgICAgICAgIGE6IHBhcnNlSW50KHN0cls0XSArIHN0cls0XSwgMTYpIC8gMHhmZixcbiAgICAgICAgICAgIH07XG4gICAgICAgIH1cbiAgICB9LFxuICAgIF9oZXgzQ29sb3JUb1JHQkEoc3RyKSB7XG4gICAgICAgIGlmIChzdHJbMF0gPT09ICcjJyAmJiBzdHIubGVuZ3RoID09PSA0KSB7XG4gICAgICAgICAgICByZXR1cm4ge1xuICAgICAgICAgICAgICAgIHI6IHBhcnNlSW50KHN0clsxXSArIHN0clsxXSwgMTYpLFxuICAgICAgICAgICAgICAgIGc6IHBhcnNlSW50KHN0clsyXSArIHN0clsyXSwgMTYpLFxuICAgICAgICAgICAgICAgIGI6IHBhcnNlSW50KHN0clszXSArIHN0clszXSwgMTYpLFxuICAgICAgICAgICAgICAgIGE6IDEsXG4gICAgICAgICAgICB9O1xuICAgICAgICB9XG4gICAgfSxcbiAgICBfaHNsQ29sb3JUb1JHQkEoc3RyKSB7XG4gICAgICAgIGlmICgvaHNsXFwoKFxcZCspLFxccyooW1xcZC5dKyklLFxccyooW1xcZC5dKyklXFwpL2cudGVzdChzdHIpKSB7XG4gICAgICAgICAgICBjb25zdCBbXywgLi4uaHNsXSA9IC9oc2xcXCgoXFxkKyksXFxzKihbXFxkLl0rKSUsXFxzKihbXFxkLl0rKSVcXCkvZy5leGVjKHN0cik7XG4gICAgICAgICAgICBjb25zdCBoID0gTnVtYmVyKGhzbFswXSkgLyAzNjA7XG4gICAgICAgICAgICBjb25zdCBzID0gTnVtYmVyKGhzbFsxXSkgLyAxMDA7XG4gICAgICAgICAgICBjb25zdCBsID0gTnVtYmVyKGhzbFsyXSkgLyAxMDA7XG4gICAgICAgICAgICBsZXQgdDI7XG4gICAgICAgICAgICBsZXQgdDM7XG4gICAgICAgICAgICBsZXQgdmFsO1xuICAgICAgICAgICAgaWYgKHMgPT09IDApIHtcbiAgICAgICAgICAgICAgICB2YWwgPSBsICogMjU1O1xuICAgICAgICAgICAgICAgIHJldHVybiB7XG4gICAgICAgICAgICAgICAgICAgIHI6IE1hdGgucm91bmQodmFsKSxcbiAgICAgICAgICAgICAgICAgICAgZzogTWF0aC5yb3VuZCh2YWwpLFxuICAgICAgICAgICAgICAgICAgICBiOiBNYXRoLnJvdW5kKHZhbCksXG4gICAgICAgICAgICAgICAgICAgIGE6IDEsXG4gICAgICAgICAgICAgICAgfTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGlmIChsIDwgMC41KSB7XG4gICAgICAgICAgICAgICAgdDIgPSBsICogKDEgKyBzKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGVsc2Uge1xuICAgICAgICAgICAgICAgIHQyID0gbCArIHMgLSBsICogcztcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGNvbnN0IHQxID0gMiAqIGwgLSB0MjtcbiAgICAgICAgICAgIGNvbnN0IHJnYiA9IFswLCAwLCAwXTtcbiAgICAgICAgICAgIGZvciAobGV0IGkgPSAwOyBpIDwgMzsgaSsrKSB7XG4gICAgICAgICAgICAgICAgdDMgPSBoICsgKDEgLyAzKSAqIC0oaSAtIDEpO1xuICAgICAgICAgICAgICAgIGlmICh0MyA8IDApIHtcbiAgICAgICAgICAgICAgICAgICAgdDMrKztcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgaWYgKHQzID4gMSkge1xuICAgICAgICAgICAgICAgICAgICB0My0tO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICBpZiAoNiAqIHQzIDwgMSkge1xuICAgICAgICAgICAgICAgICAgICB2YWwgPSB0MSArICh0MiAtIHQxKSAqIDYgKiB0MztcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgZWxzZSBpZiAoMiAqIHQzIDwgMSkge1xuICAgICAgICAgICAgICAgICAgICB2YWwgPSB0MjtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgZWxzZSBpZiAoMyAqIHQzIDwgMikge1xuICAgICAgICAgICAgICAgICAgICB2YWwgPSB0MSArICh0MiAtIHQxKSAqICgyIC8gMyAtIHQzKSAqIDY7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIGVsc2Uge1xuICAgICAgICAgICAgICAgICAgICB2YWwgPSB0MTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgcmdiW2ldID0gdmFsICogMjU1O1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgcmV0dXJuIHtcbiAgICAgICAgICAgICAgICByOiBNYXRoLnJvdW5kKHJnYlswXSksXG4gICAgICAgICAgICAgICAgZzogTWF0aC5yb3VuZChyZ2JbMV0pLFxuICAgICAgICAgICAgICAgIGI6IE1hdGgucm91bmQocmdiWzJdKSxcbiAgICAgICAgICAgICAgICBhOiAxLFxuICAgICAgICAgICAgfTtcbiAgICAgICAgfVxuICAgIH0sXG4gICAgaGF2ZUludGVyc2VjdGlvbihyMSwgcjIpIHtcbiAgICAgICAgcmV0dXJuICEocjIueCA+IHIxLnggKyByMS53aWR0aCB8fFxuICAgICAgICAgICAgcjIueCArIHIyLndpZHRoIDwgcjEueCB8fFxuICAgICAgICAgICAgcjIueSA+IHIxLnkgKyByMS5oZWlnaHQgfHxcbiAgICAgICAgICAgIHIyLnkgKyByMi5oZWlnaHQgPCByMS55KTtcbiAgICB9LFxuICAgIGNsb25lT2JqZWN0KG9iaikge1xuICAgICAgICB2YXIgcmV0T2JqID0ge307XG4gICAgICAgIGZvciAodmFyIGtleSBpbiBvYmopIHtcbiAgICAgICAgICAgIGlmICh0aGlzLl9pc1BsYWluT2JqZWN0KG9ialtrZXldKSkge1xuICAgICAgICAgICAgICAgIHJldE9ialtrZXldID0gdGhpcy5jbG9uZU9iamVjdChvYmpba2V5XSk7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBlbHNlIGlmICh0aGlzLl9pc0FycmF5KG9ialtrZXldKSkge1xuICAgICAgICAgICAgICAgIHJldE9ialtrZXldID0gdGhpcy5jbG9uZUFycmF5KG9ialtrZXldKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGVsc2Uge1xuICAgICAgICAgICAgICAgIHJldE9ialtrZXldID0gb2JqW2tleV07XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuIHJldE9iajtcbiAgICB9LFxuICAgIGNsb25lQXJyYXkoYXJyKSB7XG4gICAgICAgIHJldHVybiBhcnIuc2xpY2UoMCk7XG4gICAgfSxcbiAgICBkZWdUb1JhZChkZWcpIHtcbiAgICAgICAgcmV0dXJuIGRlZyAqIFBJX09WRVJfREVHMTgwO1xuICAgIH0sXG4gICAgcmFkVG9EZWcocmFkKSB7XG4gICAgICAgIHJldHVybiByYWQgKiBERUcxODBfT1ZFUl9QSTtcbiAgICB9LFxuICAgIF9kZWdUb1JhZChkZWcpIHtcbiAgICAgICAgVXRpbC53YXJuKCdVdGlsLl9kZWdUb1JhZCBpcyByZW1vdmVkLiBQbGVhc2UgdXNlIHB1YmxpYyBVdGlsLmRlZ1RvUmFkIGluc3RlYWQuJyk7XG4gICAgICAgIHJldHVybiBVdGlsLmRlZ1RvUmFkKGRlZyk7XG4gICAgfSxcbiAgICBfcmFkVG9EZWcocmFkKSB7XG4gICAgICAgIFV0aWwud2FybignVXRpbC5fcmFkVG9EZWcgaXMgcmVtb3ZlZC4gUGxlYXNlIHVzZSBwdWJsaWMgVXRpbC5yYWRUb0RlZyBpbnN0ZWFkLicpO1xuICAgICAgICByZXR1cm4gVXRpbC5yYWRUb0RlZyhyYWQpO1xuICAgIH0sXG4gICAgX2dldFJvdGF0aW9uKHJhZGlhbnMpIHtcbiAgICAgICAgcmV0dXJuIEtvbnZhLmFuZ2xlRGVnID8gVXRpbC5yYWRUb0RlZyhyYWRpYW5zKSA6IHJhZGlhbnM7XG4gICAgfSxcbiAgICBfY2FwaXRhbGl6ZShzdHIpIHtcbiAgICAgICAgcmV0dXJuIHN0ci5jaGFyQXQoMCkudG9VcHBlckNhc2UoKSArIHN0ci5zbGljZSgxKTtcbiAgICB9LFxuICAgIHRocm93KHN0cikge1xuICAgICAgICB0aHJvdyBuZXcgRXJyb3IoS09OVkFfRVJST1IgKyBzdHIpO1xuICAgIH0sXG4gICAgZXJyb3Ioc3RyKSB7XG4gICAgICAgIGNvbnNvbGUuZXJyb3IoS09OVkFfRVJST1IgKyBzdHIpO1xuICAgIH0sXG4gICAgd2FybihzdHIpIHtcbiAgICAgICAgaWYgKCFLb252YS5zaG93V2FybmluZ3MpIHtcbiAgICAgICAgICAgIHJldHVybjtcbiAgICAgICAgfVxuICAgICAgICBjb25zb2xlLndhcm4oS09OVkFfV0FSTklORyArIHN0cik7XG4gICAgfSxcbiAgICBlYWNoKG9iaiwgZnVuYykge1xuICAgICAgICBmb3IgKHZhciBrZXkgaW4gb2JqKSB7XG4gICAgICAgICAgICBmdW5jKGtleSwgb2JqW2tleV0pO1xuICAgICAgICB9XG4gICAgfSxcbiAgICBfaW5SYW5nZSh2YWwsIGxlZnQsIHJpZ2h0KSB7XG4gICAgICAgIHJldHVybiBsZWZ0IDw9IHZhbCAmJiB2YWwgPCByaWdodDtcbiAgICB9LFxuICAgIF9nZXRQcm9qZWN0aW9uVG9TZWdtZW50KHgxLCB5MSwgeDIsIHkyLCB4MywgeTMpIHtcbiAgICAgICAgdmFyIHgsIHksIGRpc3Q7XG4gICAgICAgIHZhciBwZDIgPSAoeDEgLSB4MikgKiAoeDEgLSB4MikgKyAoeTEgLSB5MikgKiAoeTEgLSB5Mik7XG4gICAgICAgIGlmIChwZDIgPT0gMCkge1xuICAgICAgICAgICAgeCA9IHgxO1xuICAgICAgICAgICAgeSA9IHkxO1xuICAgICAgICAgICAgZGlzdCA9ICh4MyAtIHgyKSAqICh4MyAtIHgyKSArICh5MyAtIHkyKSAqICh5MyAtIHkyKTtcbiAgICAgICAgfVxuICAgICAgICBlbHNlIHtcbiAgICAgICAgICAgIHZhciB1ID0gKCh4MyAtIHgxKSAqICh4MiAtIHgxKSArICh5MyAtIHkxKSAqICh5MiAtIHkxKSkgLyBwZDI7XG4gICAgICAgICAgICBpZiAodSA8IDApIHtcbiAgICAgICAgICAgICAgICB4ID0geDE7XG4gICAgICAgICAgICAgICAgeSA9IHkxO1xuICAgICAgICAgICAgICAgIGRpc3QgPSAoeDEgLSB4MykgKiAoeDEgLSB4MykgKyAoeTEgLSB5MykgKiAoeTEgLSB5Myk7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBlbHNlIGlmICh1ID4gMS4wKSB7XG4gICAgICAgICAgICAgICAgeCA9IHgyO1xuICAgICAgICAgICAgICAgIHkgPSB5MjtcbiAgICAgICAgICAgICAgICBkaXN0ID0gKHgyIC0geDMpICogKHgyIC0geDMpICsgKHkyIC0geTMpICogKHkyIC0geTMpO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgZWxzZSB7XG4gICAgICAgICAgICAgICAgeCA9IHgxICsgdSAqICh4MiAtIHgxKTtcbiAgICAgICAgICAgICAgICB5ID0geTEgKyB1ICogKHkyIC0geTEpO1xuICAgICAgICAgICAgICAgIGRpc3QgPSAoeCAtIHgzKSAqICh4IC0geDMpICsgKHkgLSB5MykgKiAoeSAtIHkzKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgICByZXR1cm4gW3gsIHksIGRpc3RdO1xuICAgIH0sXG4gICAgX2dldFByb2plY3Rpb25Ub0xpbmUocHQsIGxpbmUsIGlzQ2xvc2VkKSB7XG4gICAgICAgIHZhciBwYyA9IFV0aWwuY2xvbmVPYmplY3QocHQpO1xuICAgICAgICB2YXIgZGlzdCA9IE51bWJlci5NQVhfVkFMVUU7XG4gICAgICAgIGxpbmUuZm9yRWFjaChmdW5jdGlvbiAocDEsIGkpIHtcbiAgICAgICAgICAgIGlmICghaXNDbG9zZWQgJiYgaSA9PT0gbGluZS5sZW5ndGggLSAxKSB7XG4gICAgICAgICAgICAgICAgcmV0dXJuO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgdmFyIHAyID0gbGluZVsoaSArIDEpICUgbGluZS5sZW5ndGhdO1xuICAgICAgICAgICAgdmFyIHByb2ogPSBVdGlsLl9nZXRQcm9qZWN0aW9uVG9TZWdtZW50KHAxLngsIHAxLnksIHAyLngsIHAyLnksIHB0LngsIHB0LnkpO1xuICAgICAgICAgICAgdmFyIHB4ID0gcHJvalswXSwgcHkgPSBwcm9qWzFdLCBwZGlzdCA9IHByb2pbMl07XG4gICAgICAgICAgICBpZiAocGRpc3QgPCBkaXN0KSB7XG4gICAgICAgICAgICAgICAgcGMueCA9IHB4O1xuICAgICAgICAgICAgICAgIHBjLnkgPSBweTtcbiAgICAgICAgICAgICAgICBkaXN0ID0gcGRpc3Q7XG4gICAgICAgICAgICB9XG4gICAgICAgIH0pO1xuICAgICAgICByZXR1cm4gcGM7XG4gICAgfSxcbiAgICBfcHJlcGFyZUFycmF5Rm9yVHdlZW4oc3RhcnRBcnJheSwgZW5kQXJyYXksIGlzQ2xvc2VkKSB7XG4gICAgICAgIHZhciBuLCBzdGFydCA9IFtdLCBlbmQgPSBbXTtcbiAgICAgICAgaWYgKHN0YXJ0QXJyYXkubGVuZ3RoID4gZW5kQXJyYXkubGVuZ3RoKSB7XG4gICAgICAgICAgICB2YXIgdGVtcCA9IGVuZEFycmF5O1xuICAgICAgICAgICAgZW5kQXJyYXkgPSBzdGFydEFycmF5O1xuICAgICAgICAgICAgc3RhcnRBcnJheSA9IHRlbXA7XG4gICAgICAgIH1cbiAgICAgICAgZm9yIChuID0gMDsgbiA8IHN0YXJ0QXJyYXkubGVuZ3RoOyBuICs9IDIpIHtcbiAgICAgICAgICAgIHN0YXJ0LnB1c2goe1xuICAgICAgICAgICAgICAgIHg6IHN0YXJ0QXJyYXlbbl0sXG4gICAgICAgICAgICAgICAgeTogc3RhcnRBcnJheVtuICsgMV0sXG4gICAgICAgICAgICB9KTtcbiAgICAgICAgfVxuICAgICAgICBmb3IgKG4gPSAwOyBuIDwgZW5kQXJyYXkubGVuZ3RoOyBuICs9IDIpIHtcbiAgICAgICAgICAgIGVuZC5wdXNoKHtcbiAgICAgICAgICAgICAgICB4OiBlbmRBcnJheVtuXSxcbiAgICAgICAgICAgICAgICB5OiBlbmRBcnJheVtuICsgMV0sXG4gICAgICAgICAgICB9KTtcbiAgICAgICAgfVxuICAgICAgICB2YXIgbmV3U3RhcnQgPSBbXTtcbiAgICAgICAgZW5kLmZvckVhY2goZnVuY3Rpb24gKHBvaW50KSB7XG4gICAgICAgICAgICB2YXIgcHIgPSBVdGlsLl9nZXRQcm9qZWN0aW9uVG9MaW5lKHBvaW50LCBzdGFydCwgaXNDbG9zZWQpO1xuICAgICAgICAgICAgbmV3U3RhcnQucHVzaChwci54KTtcbiAgICAgICAgICAgIG5ld1N0YXJ0LnB1c2gocHIueSk7XG4gICAgICAgIH0pO1xuICAgICAgICByZXR1cm4gbmV3U3RhcnQ7XG4gICAgfSxcbiAgICBfcHJlcGFyZVRvU3RyaW5naWZ5KG9iaikge1xuICAgICAgICB2YXIgZGVzYztcbiAgICAgICAgb2JqLnZpc2l0ZWRCeUNpcmN1bGFyUmVmZXJlbmNlUmVtb3ZhbCA9IHRydWU7XG4gICAgICAgIGZvciAodmFyIGtleSBpbiBvYmopIHtcbiAgICAgICAgICAgIGlmICghKG9iai5oYXNPd25Qcm9wZXJ0eShrZXkpICYmIG9ialtrZXldICYmIHR5cGVvZiBvYmpba2V5XSA9PSAnb2JqZWN0JykpIHtcbiAgICAgICAgICAgICAgICBjb250aW51ZTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGRlc2MgPSBPYmplY3QuZ2V0T3duUHJvcGVydHlEZXNjcmlwdG9yKG9iaiwga2V5KTtcbiAgICAgICAgICAgIGlmIChvYmpba2V5XS52aXNpdGVkQnlDaXJjdWxhclJlZmVyZW5jZVJlbW92YWwgfHxcbiAgICAgICAgICAgICAgICBVdGlsLl9pc0VsZW1lbnQob2JqW2tleV0pKSB7XG4gICAgICAgICAgICAgICAgaWYgKGRlc2MuY29uZmlndXJhYmxlKSB7XG4gICAgICAgICAgICAgICAgICAgIGRlbGV0ZSBvYmpba2V5XTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgZWxzZSB7XG4gICAgICAgICAgICAgICAgICAgIHJldHVybiBudWxsO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGVsc2UgaWYgKFV0aWwuX3ByZXBhcmVUb1N0cmluZ2lmeShvYmpba2V5XSkgPT09IG51bGwpIHtcbiAgICAgICAgICAgICAgICBpZiAoZGVzYy5jb25maWd1cmFibGUpIHtcbiAgICAgICAgICAgICAgICAgICAgZGVsZXRlIG9ialtrZXldO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICBlbHNlIHtcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuIG51bGw7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICAgIGRlbGV0ZSBvYmoudmlzaXRlZEJ5Q2lyY3VsYXJSZWZlcmVuY2VSZW1vdmFsO1xuICAgICAgICByZXR1cm4gb2JqO1xuICAgIH0sXG4gICAgX2Fzc2lnbih0YXJnZXQsIHNvdXJjZSkge1xuICAgICAgICBmb3IgKHZhciBrZXkgaW4gc291cmNlKSB7XG4gICAgICAgICAgICB0YXJnZXRba2V5XSA9IHNvdXJjZVtrZXldO1xuICAgICAgICB9XG4gICAgICAgIHJldHVybiB0YXJnZXQ7XG4gICAgfSxcbiAgICBfZ2V0Rmlyc3RQb2ludGVySWQoZXZ0KSB7XG4gICAgICAgIGlmICghZXZ0LnRvdWNoZXMpIHtcbiAgICAgICAgICAgIHJldHVybiBldnQucG9pbnRlcklkIHx8IDk5OTtcbiAgICAgICAgfVxuICAgICAgICBlbHNlIHtcbiAgICAgICAgICAgIHJldHVybiBldnQuY2hhbmdlZFRvdWNoZXNbMF0uaWRlbnRpZmllcjtcbiAgICAgICAgfVxuICAgIH0sXG4gICAgcmVsZWFzZUNhbnZhcyguLi5jYW52YXNlcykge1xuICAgICAgICBpZiAoIUtvbnZhLnJlbGVhc2VDYW52YXNPbkRlc3Ryb3kpXG4gICAgICAgICAgICByZXR1cm47XG4gICAgICAgIGNhbnZhc2VzLmZvckVhY2goYyA9PiB7XG4gICAgICAgICAgICBjLndpZHRoID0gMDtcbiAgICAgICAgICAgIGMuaGVpZ2h0ID0gMDtcbiAgICAgICAgfSk7XG4gICAgfSxcbiAgICBkcmF3Um91bmRlZFJlY3RQYXRoKGNvbnRleHQsIHdpZHRoLCBoZWlnaHQsIGNvcm5lclJhZGl1cykge1xuICAgICAgICBsZXQgdG9wTGVmdCA9IDA7XG4gICAgICAgIGxldCB0b3BSaWdodCA9IDA7XG4gICAgICAgIGxldCBib3R0b21MZWZ0ID0gMDtcbiAgICAgICAgbGV0IGJvdHRvbVJpZ2h0ID0gMDtcbiAgICAgICAgaWYgKHR5cGVvZiBjb3JuZXJSYWRpdXMgPT09ICdudW1iZXInKSB7XG4gICAgICAgICAgICB0b3BMZWZ0ID0gdG9wUmlnaHQgPSBib3R0b21MZWZ0ID0gYm90dG9tUmlnaHQgPSBNYXRoLm1pbihjb3JuZXJSYWRpdXMsIHdpZHRoIC8gMiwgaGVpZ2h0IC8gMik7XG4gICAgICAgIH1cbiAgICAgICAgZWxzZSB7XG4gICAgICAgICAgICB0b3BMZWZ0ID0gTWF0aC5taW4oY29ybmVyUmFkaXVzWzBdIHx8IDAsIHdpZHRoIC8gMiwgaGVpZ2h0IC8gMik7XG4gICAgICAgICAgICB0b3BSaWdodCA9IE1hdGgubWluKGNvcm5lclJhZGl1c1sxXSB8fCAwLCB3aWR0aCAvIDIsIGhlaWdodCAvIDIpO1xuICAgICAgICAgICAgYm90dG9tUmlnaHQgPSBNYXRoLm1pbihjb3JuZXJSYWRpdXNbMl0gfHwgMCwgd2lkdGggLyAyLCBoZWlnaHQgLyAyKTtcbiAgICAgICAgICAgIGJvdHRvbUxlZnQgPSBNYXRoLm1pbihjb3JuZXJSYWRpdXNbM10gfHwgMCwgd2lkdGggLyAyLCBoZWlnaHQgLyAyKTtcbiAgICAgICAgfVxuICAgICAgICBjb250ZXh0Lm1vdmVUbyh0b3BMZWZ0LCAwKTtcbiAgICAgICAgY29udGV4dC5saW5lVG8od2lkdGggLSB0b3BSaWdodCwgMCk7XG4gICAgICAgIGNvbnRleHQuYXJjKHdpZHRoIC0gdG9wUmlnaHQsIHRvcFJpZ2h0LCB0b3BSaWdodCwgKE1hdGguUEkgKiAzKSAvIDIsIDAsIGZhbHNlKTtcbiAgICAgICAgY29udGV4dC5saW5lVG8od2lkdGgsIGhlaWdodCAtIGJvdHRvbVJpZ2h0KTtcbiAgICAgICAgY29udGV4dC5hcmMod2lkdGggLSBib3R0b21SaWdodCwgaGVpZ2h0IC0gYm90dG9tUmlnaHQsIGJvdHRvbVJpZ2h0LCAwLCBNYXRoLlBJIC8gMiwgZmFsc2UpO1xuICAgICAgICBjb250ZXh0LmxpbmVUbyhib3R0b21MZWZ0LCBoZWlnaHQpO1xuICAgICAgICBjb250ZXh0LmFyYyhib3R0b21MZWZ0LCBoZWlnaHQgLSBib3R0b21MZWZ0LCBib3R0b21MZWZ0LCBNYXRoLlBJIC8gMiwgTWF0aC5QSSwgZmFsc2UpO1xuICAgICAgICBjb250ZXh0LmxpbmVUbygwLCB0b3BMZWZ0KTtcbiAgICAgICAgY29udGV4dC5hcmModG9wTGVmdCwgdG9wTGVmdCwgdG9wTGVmdCwgTWF0aC5QSSwgKE1hdGguUEkgKiAzKSAvIDIsIGZhbHNlKTtcbiAgICB9XG59O1xuIiwiaW1wb3J0IHsgS29udmEgfSBmcm9tICcuL0dsb2JhbC5qcyc7XG5pbXBvcnQgeyBVdGlsIH0gZnJvbSAnLi9VdGlsLmpzJztcbmZ1bmN0aW9uIF9mb3JtYXRWYWx1ZSh2YWwpIHtcbiAgICBpZiAoVXRpbC5faXNTdHJpbmcodmFsKSkge1xuICAgICAgICByZXR1cm4gJ1wiJyArIHZhbCArICdcIic7XG4gICAgfVxuICAgIGlmIChPYmplY3QucHJvdG90eXBlLnRvU3RyaW5nLmNhbGwodmFsKSA9PT0gJ1tvYmplY3QgTnVtYmVyXScpIHtcbiAgICAgICAgcmV0dXJuIHZhbDtcbiAgICB9XG4gICAgaWYgKFV0aWwuX2lzQm9vbGVhbih2YWwpKSB7XG4gICAgICAgIHJldHVybiB2YWw7XG4gICAgfVxuICAgIHJldHVybiBPYmplY3QucHJvdG90eXBlLnRvU3RyaW5nLmNhbGwodmFsKTtcbn1cbmV4cG9ydCBmdW5jdGlvbiBSR0JDb21wb25lbnQodmFsKSB7XG4gICAgaWYgKHZhbCA+IDI1NSkge1xuICAgICAgICByZXR1cm4gMjU1O1xuICAgIH1cbiAgICBlbHNlIGlmICh2YWwgPCAwKSB7XG4gICAgICAgIHJldHVybiAwO1xuICAgIH1cbiAgICByZXR1cm4gTWF0aC5yb3VuZCh2YWwpO1xufVxuZXhwb3J0IGZ1bmN0aW9uIGFscGhhQ29tcG9uZW50KHZhbCkge1xuICAgIGlmICh2YWwgPiAxKSB7XG4gICAgICAgIHJldHVybiAxO1xuICAgIH1cbiAgICBlbHNlIGlmICh2YWwgPCAwLjAwMDEpIHtcbiAgICAgICAgcmV0dXJuIDAuMDAwMTtcbiAgICB9XG4gICAgcmV0dXJuIHZhbDtcbn1cbmV4cG9ydCBmdW5jdGlvbiBnZXROdW1iZXJWYWxpZGF0b3IoKSB7XG4gICAgaWYgKEtvbnZhLmlzVW5taW5pZmllZCkge1xuICAgICAgICByZXR1cm4gZnVuY3Rpb24gKHZhbCwgYXR0cikge1xuICAgICAgICAgICAgaWYgKCFVdGlsLl9pc051bWJlcih2YWwpKSB7XG4gICAgICAgICAgICAgICAgVXRpbC53YXJuKF9mb3JtYXRWYWx1ZSh2YWwpICtcbiAgICAgICAgICAgICAgICAgICAgJyBpcyBhIG5vdCB2YWxpZCB2YWx1ZSBmb3IgXCInICtcbiAgICAgICAgICAgICAgICAgICAgYXR0ciArXG4gICAgICAgICAgICAgICAgICAgICdcIiBhdHRyaWJ1dGUuIFRoZSB2YWx1ZSBzaG91bGQgYmUgYSBudW1iZXIuJyk7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICByZXR1cm4gdmFsO1xuICAgICAgICB9O1xuICAgIH1cbn1cbmV4cG9ydCBmdW5jdGlvbiBnZXROdW1iZXJPckFycmF5T2ZOdW1iZXJzVmFsaWRhdG9yKG5vT2ZFbGVtZW50cykge1xuICAgIGlmIChLb252YS5pc1VubWluaWZpZWQpIHtcbiAgICAgICAgcmV0dXJuIGZ1bmN0aW9uICh2YWwsIGF0dHIpIHtcbiAgICAgICAgICAgIGxldCBpc051bWJlciA9IFV0aWwuX2lzTnVtYmVyKHZhbCk7XG4gICAgICAgICAgICBsZXQgaXNWYWxpZEFycmF5ID0gVXRpbC5faXNBcnJheSh2YWwpICYmIHZhbC5sZW5ndGggPT0gbm9PZkVsZW1lbnRzO1xuICAgICAgICAgICAgaWYgKCFpc051bWJlciAmJiAhaXNWYWxpZEFycmF5KSB7XG4gICAgICAgICAgICAgICAgVXRpbC53YXJuKF9mb3JtYXRWYWx1ZSh2YWwpICtcbiAgICAgICAgICAgICAgICAgICAgJyBpcyBhIG5vdCB2YWxpZCB2YWx1ZSBmb3IgXCInICtcbiAgICAgICAgICAgICAgICAgICAgYXR0ciArXG4gICAgICAgICAgICAgICAgICAgICdcIiBhdHRyaWJ1dGUuIFRoZSB2YWx1ZSBzaG91bGQgYmUgYSBudW1iZXIgb3IgQXJyYXk8bnVtYmVyPignICtcbiAgICAgICAgICAgICAgICAgICAgbm9PZkVsZW1lbnRzICtcbiAgICAgICAgICAgICAgICAgICAgJyknKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIHJldHVybiB2YWw7XG4gICAgICAgIH07XG4gICAgfVxufVxuZXhwb3J0IGZ1bmN0aW9uIGdldE51bWJlck9yQXV0b1ZhbGlkYXRvcigpIHtcbiAgICBpZiAoS29udmEuaXNVbm1pbmlmaWVkKSB7XG4gICAgICAgIHJldHVybiBmdW5jdGlvbiAodmFsLCBhdHRyKSB7XG4gICAgICAgICAgICB2YXIgaXNOdW1iZXIgPSBVdGlsLl9pc051bWJlcih2YWwpO1xuICAgICAgICAgICAgdmFyIGlzQXV0byA9IHZhbCA9PT0gJ2F1dG8nO1xuICAgICAgICAgICAgaWYgKCEoaXNOdW1iZXIgfHwgaXNBdXRvKSkge1xuICAgICAgICAgICAgICAgIFV0aWwud2FybihfZm9ybWF0VmFsdWUodmFsKSArXG4gICAgICAgICAgICAgICAgICAgICcgaXMgYSBub3QgdmFsaWQgdmFsdWUgZm9yIFwiJyArXG4gICAgICAgICAgICAgICAgICAgIGF0dHIgK1xuICAgICAgICAgICAgICAgICAgICAnXCIgYXR0cmlidXRlLiBUaGUgdmFsdWUgc2hvdWxkIGJlIGEgbnVtYmVyIG9yIFwiYXV0b1wiLicpO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgcmV0dXJuIHZhbDtcbiAgICAgICAgfTtcbiAgICB9XG59XG5leHBvcnQgZnVuY3Rpb24gZ2V0U3RyaW5nVmFsaWRhdG9yKCkge1xuICAgIGlmIChLb252YS5pc1VubWluaWZpZWQpIHtcbiAgICAgICAgcmV0dXJuIGZ1bmN0aW9uICh2YWwsIGF0dHIpIHtcbiAgICAgICAgICAgIGlmICghVXRpbC5faXNTdHJpbmcodmFsKSkge1xuICAgICAgICAgICAgICAgIFV0aWwud2FybihfZm9ybWF0VmFsdWUodmFsKSArXG4gICAgICAgICAgICAgICAgICAgICcgaXMgYSBub3QgdmFsaWQgdmFsdWUgZm9yIFwiJyArXG4gICAgICAgICAgICAgICAgICAgIGF0dHIgK1xuICAgICAgICAgICAgICAgICAgICAnXCIgYXR0cmlidXRlLiBUaGUgdmFsdWUgc2hvdWxkIGJlIGEgc3RyaW5nLicpO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgcmV0dXJuIHZhbDtcbiAgICAgICAgfTtcbiAgICB9XG59XG5leHBvcnQgZnVuY3Rpb24gZ2V0U3RyaW5nT3JHcmFkaWVudFZhbGlkYXRvcigpIHtcbiAgICBpZiAoS29udmEuaXNVbm1pbmlmaWVkKSB7XG4gICAgICAgIHJldHVybiBmdW5jdGlvbiAodmFsLCBhdHRyKSB7XG4gICAgICAgICAgICBjb25zdCBpc1N0cmluZyA9IFV0aWwuX2lzU3RyaW5nKHZhbCk7XG4gICAgICAgICAgICBjb25zdCBpc0dyYWRpZW50ID0gT2JqZWN0LnByb3RvdHlwZS50b1N0cmluZy5jYWxsKHZhbCkgPT09ICdbb2JqZWN0IENhbnZhc0dyYWRpZW50XScgfHxcbiAgICAgICAgICAgICAgICAodmFsICYmIHZhbC5hZGRDb2xvclN0b3ApO1xuICAgICAgICAgICAgaWYgKCEoaXNTdHJpbmcgfHwgaXNHcmFkaWVudCkpIHtcbiAgICAgICAgICAgICAgICBVdGlsLndhcm4oX2Zvcm1hdFZhbHVlKHZhbCkgK1xuICAgICAgICAgICAgICAgICAgICAnIGlzIGEgbm90IHZhbGlkIHZhbHVlIGZvciBcIicgK1xuICAgICAgICAgICAgICAgICAgICBhdHRyICtcbiAgICAgICAgICAgICAgICAgICAgJ1wiIGF0dHJpYnV0ZS4gVGhlIHZhbHVlIHNob3VsZCBiZSBhIHN0cmluZyBvciBhIG5hdGl2ZSBncmFkaWVudC4nKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIHJldHVybiB2YWw7XG4gICAgICAgIH07XG4gICAgfVxufVxuZXhwb3J0IGZ1bmN0aW9uIGdldEZ1bmN0aW9uVmFsaWRhdG9yKCkge1xuICAgIGlmIChLb252YS5pc1VubWluaWZpZWQpIHtcbiAgICAgICAgcmV0dXJuIGZ1bmN0aW9uICh2YWwsIGF0dHIpIHtcbiAgICAgICAgICAgIGlmICghVXRpbC5faXNGdW5jdGlvbih2YWwpKSB7XG4gICAgICAgICAgICAgICAgVXRpbC53YXJuKF9mb3JtYXRWYWx1ZSh2YWwpICtcbiAgICAgICAgICAgICAgICAgICAgJyBpcyBhIG5vdCB2YWxpZCB2YWx1ZSBmb3IgXCInICtcbiAgICAgICAgICAgICAgICAgICAgYXR0ciArXG4gICAgICAgICAgICAgICAgICAgICdcIiBhdHRyaWJ1dGUuIFRoZSB2YWx1ZSBzaG91bGQgYmUgYSBmdW5jdGlvbi4nKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIHJldHVybiB2YWw7XG4gICAgICAgIH07XG4gICAgfVxufVxuZXhwb3J0IGZ1bmN0aW9uIGdldE51bWJlckFycmF5VmFsaWRhdG9yKCkge1xuICAgIGlmIChLb252YS5pc1VubWluaWZpZWQpIHtcbiAgICAgICAgcmV0dXJuIGZ1bmN0aW9uICh2YWwsIGF0dHIpIHtcbiAgICAgICAgICAgIGNvbnN0IFR5cGVkQXJyYXkgPSBJbnQ4QXJyYXkgPyBPYmplY3QuZ2V0UHJvdG90eXBlT2YoSW50OEFycmF5KSA6IG51bGw7XG4gICAgICAgICAgICBpZiAoVHlwZWRBcnJheSAmJiB2YWwgaW5zdGFuY2VvZiBUeXBlZEFycmF5KSB7XG4gICAgICAgICAgICAgICAgcmV0dXJuIHZhbDtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGlmICghVXRpbC5faXNBcnJheSh2YWwpKSB7XG4gICAgICAgICAgICAgICAgVXRpbC53YXJuKF9mb3JtYXRWYWx1ZSh2YWwpICtcbiAgICAgICAgICAgICAgICAgICAgJyBpcyBhIG5vdCB2YWxpZCB2YWx1ZSBmb3IgXCInICtcbiAgICAgICAgICAgICAgICAgICAgYXR0ciArXG4gICAgICAgICAgICAgICAgICAgICdcIiBhdHRyaWJ1dGUuIFRoZSB2YWx1ZSBzaG91bGQgYmUgYSBhcnJheSBvZiBudW1iZXJzLicpO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgZWxzZSB7XG4gICAgICAgICAgICAgICAgdmFsLmZvckVhY2goZnVuY3Rpb24gKGl0ZW0pIHtcbiAgICAgICAgICAgICAgICAgICAgaWYgKCFVdGlsLl9pc051bWJlcihpdGVtKSkge1xuICAgICAgICAgICAgICAgICAgICAgICAgVXRpbC53YXJuKCdcIicgK1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGF0dHIgK1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICdcIiBhdHRyaWJ1dGUgaGFzIG5vbiBudW1lcmljIGVsZW1lbnQgJyArXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgaXRlbSArXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgJy4gTWFrZSBzdXJlIHRoYXQgYWxsIGVsZW1lbnRzIGFyZSBudW1iZXJzLicpO1xuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICByZXR1cm4gdmFsO1xuICAgICAgICB9O1xuICAgIH1cbn1cbmV4cG9ydCBmdW5jdGlvbiBnZXRCb29sZWFuVmFsaWRhdG9yKCkge1xuICAgIGlmIChLb252YS5pc1VubWluaWZpZWQpIHtcbiAgICAgICAgcmV0dXJuIGZ1bmN0aW9uICh2YWwsIGF0dHIpIHtcbiAgICAgICAgICAgIHZhciBpc0Jvb2wgPSB2YWwgPT09IHRydWUgfHwgdmFsID09PSBmYWxzZTtcbiAgICAgICAgICAgIGlmICghaXNCb29sKSB7XG4gICAgICAgICAgICAgICAgVXRpbC53YXJuKF9mb3JtYXRWYWx1ZSh2YWwpICtcbiAgICAgICAgICAgICAgICAgICAgJyBpcyBhIG5vdCB2YWxpZCB2YWx1ZSBmb3IgXCInICtcbiAgICAgICAgICAgICAgICAgICAgYXR0ciArXG4gICAgICAgICAgICAgICAgICAgICdcIiBhdHRyaWJ1dGUuIFRoZSB2YWx1ZSBzaG91bGQgYmUgYSBib29sZWFuLicpO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgcmV0dXJuIHZhbDtcbiAgICAgICAgfTtcbiAgICB9XG59XG5leHBvcnQgZnVuY3Rpb24gZ2V0Q29tcG9uZW50VmFsaWRhdG9yKGNvbXBvbmVudHMpIHtcbiAgICBpZiAoS29udmEuaXNVbm1pbmlmaWVkKSB7XG4gICAgICAgIHJldHVybiBmdW5jdGlvbiAodmFsLCBhdHRyKSB7XG4gICAgICAgICAgICBpZiAodmFsID09PSB1bmRlZmluZWQgfHwgdmFsID09PSBudWxsKSB7XG4gICAgICAgICAgICAgICAgcmV0dXJuIHZhbDtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGlmICghVXRpbC5pc09iamVjdCh2YWwpKSB7XG4gICAgICAgICAgICAgICAgVXRpbC53YXJuKF9mb3JtYXRWYWx1ZSh2YWwpICtcbiAgICAgICAgICAgICAgICAgICAgJyBpcyBhIG5vdCB2YWxpZCB2YWx1ZSBmb3IgXCInICtcbiAgICAgICAgICAgICAgICAgICAgYXR0ciArXG4gICAgICAgICAgICAgICAgICAgICdcIiBhdHRyaWJ1dGUuIFRoZSB2YWx1ZSBzaG91bGQgYmUgYW4gb2JqZWN0IHdpdGggcHJvcGVydGllcyAnICtcbiAgICAgICAgICAgICAgICAgICAgY29tcG9uZW50cyk7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICByZXR1cm4gdmFsO1xuICAgICAgICB9O1xuICAgIH1cbn1cbiIsImltcG9ydCB7IEtvbnZhIGFzIEdsb2JhbCB9IGZyb20gJy4vR2xvYmFsLmpzJztcbmltcG9ydCB7IFV0aWwsIFRyYW5zZm9ybSB9IGZyb20gJy4vVXRpbC5qcyc7XG5pbXBvcnQgeyBOb2RlIH0gZnJvbSAnLi9Ob2RlLmpzJztcbmltcG9ydCB7IENvbnRhaW5lciB9IGZyb20gJy4vQ29udGFpbmVyLmpzJztcbmltcG9ydCB7IFN0YWdlLCBzdGFnZXMgfSBmcm9tICcuL1N0YWdlLmpzJztcbmltcG9ydCB7IExheWVyIH0gZnJvbSAnLi9MYXllci5qcyc7XG5pbXBvcnQgeyBGYXN0TGF5ZXIgfSBmcm9tICcuL0Zhc3RMYXllci5qcyc7XG5pbXBvcnQgeyBHcm91cCB9IGZyb20gJy4vR3JvdXAuanMnO1xuaW1wb3J0IHsgREQgfSBmcm9tICcuL0RyYWdBbmREcm9wLmpzJztcbmltcG9ydCB7IFNoYXBlLCBzaGFwZXMgfSBmcm9tICcuL1NoYXBlLmpzJztcbmltcG9ydCB7IEFuaW1hdGlvbiB9IGZyb20gJy4vQW5pbWF0aW9uLmpzJztcbmltcG9ydCB7IFR3ZWVuLCBFYXNpbmdzIH0gZnJvbSAnLi9Ud2Vlbi5qcyc7XG5pbXBvcnQgeyBDb250ZXh0IH0gZnJvbSAnLi9Db250ZXh0LmpzJztcbmltcG9ydCB7IENhbnZhcyB9IGZyb20gJy4vQ2FudmFzLmpzJztcbmV4cG9ydCBjb25zdCBLb252YSA9IFV0aWwuX2Fzc2lnbihHbG9iYWwsIHtcbiAgICBVdGlsLFxuICAgIFRyYW5zZm9ybSxcbiAgICBOb2RlLFxuICAgIENvbnRhaW5lcixcbiAgICBTdGFnZSxcbiAgICBzdGFnZXMsXG4gICAgTGF5ZXIsXG4gICAgRmFzdExheWVyLFxuICAgIEdyb3VwLFxuICAgIERELFxuICAgIFNoYXBlLFxuICAgIHNoYXBlcyxcbiAgICBBbmltYXRpb24sXG4gICAgVHdlZW4sXG4gICAgRWFzaW5ncyxcbiAgICBDb250ZXh0LFxuICAgIENhbnZhcyxcbn0pO1xuZXhwb3J0IGRlZmF1bHQgS29udmE7XG4iLCJpbXBvcnQgeyBVdGlsIH0gZnJvbSAnLi4vVXRpbC5qcyc7XG5pbXBvcnQgeyBGYWN0b3J5IH0gZnJvbSAnLi4vRmFjdG9yeS5qcyc7XG5pbXBvcnQgeyBTaGFwZSB9IGZyb20gJy4uL1NoYXBlLmpzJztcbmltcG9ydCB7IF9yZWdpc3Rlck5vZGUgfSBmcm9tICcuLi9HbG9iYWwuanMnO1xuaW1wb3J0IHsgZ2V0TnVtYmVyT3JBcnJheU9mTnVtYmVyc1ZhbGlkYXRvciwgZ2V0TnVtYmVyVmFsaWRhdG9yLCB9IGZyb20gJy4uL1ZhbGlkYXRvcnMuanMnO1xuZXhwb3J0IGNsYXNzIEltYWdlIGV4dGVuZHMgU2hhcGUge1xuICAgIGNvbnN0cnVjdG9yKGF0dHJzKSB7XG4gICAgICAgIHN1cGVyKGF0dHJzKTtcbiAgICAgICAgdGhpcy5vbignaW1hZ2VDaGFuZ2Uua29udmEnLCAoKSA9PiB7XG4gICAgICAgICAgICB0aGlzLl9zZXRJbWFnZUxvYWQoKTtcbiAgICAgICAgfSk7XG4gICAgICAgIHRoaXMuX3NldEltYWdlTG9hZCgpO1xuICAgIH1cbiAgICBfc2V0SW1hZ2VMb2FkKCkge1xuICAgICAgICBjb25zdCBpbWFnZSA9IHRoaXMuaW1hZ2UoKTtcbiAgICAgICAgaWYgKGltYWdlICYmIGltYWdlLmNvbXBsZXRlKSB7XG4gICAgICAgICAgICByZXR1cm47XG4gICAgICAgIH1cbiAgICAgICAgaWYgKGltYWdlICYmIGltYWdlLnJlYWR5U3RhdGUgPT09IDQpIHtcbiAgICAgICAgICAgIHJldHVybjtcbiAgICAgICAgfVxuICAgICAgICBpZiAoaW1hZ2UgJiYgaW1hZ2VbJ2FkZEV2ZW50TGlzdGVuZXInXSkge1xuICAgICAgICAgICAgaW1hZ2VbJ2FkZEV2ZW50TGlzdGVuZXInXSgnbG9hZCcsICgpID0+IHtcbiAgICAgICAgICAgICAgICB0aGlzLl9yZXF1ZXN0RHJhdygpO1xuICAgICAgICAgICAgfSk7XG4gICAgICAgIH1cbiAgICB9XG4gICAgX3VzZUJ1ZmZlckNhbnZhcygpIHtcbiAgICAgICAgcmV0dXJuIHN1cGVyLl91c2VCdWZmZXJDYW52YXModHJ1ZSk7XG4gICAgfVxuICAgIF9zY2VuZUZ1bmMoY29udGV4dCkge1xuICAgICAgICBjb25zdCB3aWR0aCA9IHRoaXMuZ2V0V2lkdGgoKTtcbiAgICAgICAgY29uc3QgaGVpZ2h0ID0gdGhpcy5nZXRIZWlnaHQoKTtcbiAgICAgICAgY29uc3QgY29ybmVyUmFkaXVzID0gdGhpcy5jb3JuZXJSYWRpdXMoKTtcbiAgICAgICAgY29uc3QgaW1hZ2UgPSB0aGlzLmF0dHJzLmltYWdlO1xuICAgICAgICBsZXQgcGFyYW1zO1xuICAgICAgICBpZiAoaW1hZ2UpIHtcbiAgICAgICAgICAgIGNvbnN0IGNyb3BXaWR0aCA9IHRoaXMuYXR0cnMuY3JvcFdpZHRoO1xuICAgICAgICAgICAgY29uc3QgY3JvcEhlaWdodCA9IHRoaXMuYXR0cnMuY3JvcEhlaWdodDtcbiAgICAgICAgICAgIGlmIChjcm9wV2lkdGggJiYgY3JvcEhlaWdodCkge1xuICAgICAgICAgICAgICAgIHBhcmFtcyA9IFtcbiAgICAgICAgICAgICAgICAgICAgaW1hZ2UsXG4gICAgICAgICAgICAgICAgICAgIHRoaXMuY3JvcFgoKSxcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5jcm9wWSgpLFxuICAgICAgICAgICAgICAgICAgICBjcm9wV2lkdGgsXG4gICAgICAgICAgICAgICAgICAgIGNyb3BIZWlnaHQsXG4gICAgICAgICAgICAgICAgICAgIDAsXG4gICAgICAgICAgICAgICAgICAgIDAsXG4gICAgICAgICAgICAgICAgICAgIHdpZHRoLFxuICAgICAgICAgICAgICAgICAgICBoZWlnaHQsXG4gICAgICAgICAgICAgICAgXTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGVsc2Uge1xuICAgICAgICAgICAgICAgIHBhcmFtcyA9IFtpbWFnZSwgMCwgMCwgd2lkdGgsIGhlaWdodF07XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgICAgaWYgKHRoaXMuaGFzRmlsbCgpIHx8IHRoaXMuaGFzU3Ryb2tlKCkgfHwgY29ybmVyUmFkaXVzKSB7XG4gICAgICAgICAgICBjb250ZXh0LmJlZ2luUGF0aCgpO1xuICAgICAgICAgICAgY29ybmVyUmFkaXVzXG4gICAgICAgICAgICAgICAgPyBVdGlsLmRyYXdSb3VuZGVkUmVjdFBhdGgoY29udGV4dCwgd2lkdGgsIGhlaWdodCwgY29ybmVyUmFkaXVzKVxuICAgICAgICAgICAgICAgIDogY29udGV4dC5yZWN0KDAsIDAsIHdpZHRoLCBoZWlnaHQpO1xuICAgICAgICAgICAgY29udGV4dC5jbG9zZVBhdGgoKTtcbiAgICAgICAgICAgIGNvbnRleHQuZmlsbFN0cm9rZVNoYXBlKHRoaXMpO1xuICAgICAgICB9XG4gICAgICAgIGlmIChpbWFnZSkge1xuICAgICAgICAgICAgaWYgKGNvcm5lclJhZGl1cykge1xuICAgICAgICAgICAgICAgIGNvbnRleHQuY2xpcCgpO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgY29udGV4dC5kcmF3SW1hZ2UuYXBwbHkoY29udGV4dCwgcGFyYW1zKTtcbiAgICAgICAgfVxuICAgIH1cbiAgICBfaGl0RnVuYyhjb250ZXh0KSB7XG4gICAgICAgIHZhciB3aWR0aCA9IHRoaXMud2lkdGgoKSwgaGVpZ2h0ID0gdGhpcy5oZWlnaHQoKSwgY29ybmVyUmFkaXVzID0gdGhpcy5jb3JuZXJSYWRpdXMoKTtcbiAgICAgICAgY29udGV4dC5iZWdpblBhdGgoKTtcbiAgICAgICAgaWYgKCFjb3JuZXJSYWRpdXMpIHtcbiAgICAgICAgICAgIGNvbnRleHQucmVjdCgwLCAwLCB3aWR0aCwgaGVpZ2h0KTtcbiAgICAgICAgfVxuICAgICAgICBlbHNlIHtcbiAgICAgICAgICAgIFV0aWwuZHJhd1JvdW5kZWRSZWN0UGF0aChjb250ZXh0LCB3aWR0aCwgaGVpZ2h0LCBjb3JuZXJSYWRpdXMpO1xuICAgICAgICB9XG4gICAgICAgIGNvbnRleHQuY2xvc2VQYXRoKCk7XG4gICAgICAgIGNvbnRleHQuZmlsbFN0cm9rZVNoYXBlKHRoaXMpO1xuICAgIH1cbiAgICBnZXRXaWR0aCgpIHtcbiAgICAgICAgdmFyIF9hLCBfYjtcbiAgICAgICAgcmV0dXJuIChfYSA9IHRoaXMuYXR0cnMud2lkdGgpICE9PSBudWxsICYmIF9hICE9PSB2b2lkIDAgPyBfYSA6IChfYiA9IHRoaXMuaW1hZ2UoKSkgPT09IG51bGwgfHwgX2IgPT09IHZvaWQgMCA/IHZvaWQgMCA6IF9iLndpZHRoO1xuICAgIH1cbiAgICBnZXRIZWlnaHQoKSB7XG4gICAgICAgIHZhciBfYSwgX2I7XG4gICAgICAgIHJldHVybiAoX2EgPSB0aGlzLmF0dHJzLmhlaWdodCkgIT09IG51bGwgJiYgX2EgIT09IHZvaWQgMCA/IF9hIDogKF9iID0gdGhpcy5pbWFnZSgpKSA9PT0gbnVsbCB8fCBfYiA9PT0gdm9pZCAwID8gdm9pZCAwIDogX2IuaGVpZ2h0O1xuICAgIH1cbiAgICBzdGF0aWMgZnJvbVVSTCh1cmwsIGNhbGxiYWNrLCBvbkVycm9yID0gbnVsbCkge1xuICAgICAgICB2YXIgaW1nID0gVXRpbC5jcmVhdGVJbWFnZUVsZW1lbnQoKTtcbiAgICAgICAgaW1nLm9ubG9hZCA9IGZ1bmN0aW9uICgpIHtcbiAgICAgICAgICAgIHZhciBpbWFnZSA9IG5ldyBJbWFnZSh7XG4gICAgICAgICAgICAgICAgaW1hZ2U6IGltZyxcbiAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgY2FsbGJhY2soaW1hZ2UpO1xuICAgICAgICB9O1xuICAgICAgICBpbWcub25lcnJvciA9IG9uRXJyb3I7XG4gICAgICAgIGltZy5jcm9zc09yaWdpbiA9ICdBbm9ueW1vdXMnO1xuICAgICAgICBpbWcuc3JjID0gdXJsO1xuICAgIH1cbn1cbkltYWdlLnByb3RvdHlwZS5jbGFzc05hbWUgPSAnSW1hZ2UnO1xuX3JlZ2lzdGVyTm9kZShJbWFnZSk7XG5GYWN0b3J5LmFkZEdldHRlclNldHRlcihJbWFnZSwgJ2Nvcm5lclJhZGl1cycsIDAsIGdldE51bWJlck9yQXJyYXlPZk51bWJlcnNWYWxpZGF0b3IoNCkpO1xuRmFjdG9yeS5hZGRHZXR0ZXJTZXR0ZXIoSW1hZ2UsICdpbWFnZScpO1xuRmFjdG9yeS5hZGRDb21wb25lbnRzR2V0dGVyU2V0dGVyKEltYWdlLCAnY3JvcCcsIFsneCcsICd5JywgJ3dpZHRoJywgJ2hlaWdodCddKTtcbkZhY3RvcnkuYWRkR2V0dGVyU2V0dGVyKEltYWdlLCAnY3JvcFgnLCAwLCBnZXROdW1iZXJWYWxpZGF0b3IoKSk7XG5GYWN0b3J5LmFkZEdldHRlclNldHRlcihJbWFnZSwgJ2Nyb3BZJywgMCwgZ2V0TnVtYmVyVmFsaWRhdG9yKCkpO1xuRmFjdG9yeS5hZGRHZXR0ZXJTZXR0ZXIoSW1hZ2UsICdjcm9wV2lkdGgnLCAwLCBnZXROdW1iZXJWYWxpZGF0b3IoKSk7XG5GYWN0b3J5LmFkZEdldHRlclNldHRlcihJbWFnZSwgJ2Nyb3BIZWlnaHQnLCAwLCBnZXROdW1iZXJWYWxpZGF0b3IoKSk7XG4iLCJpbXBvcnQgeyBGYWN0b3J5IH0gZnJvbSAnLi4vRmFjdG9yeS5qcyc7XG5pbXBvcnQgeyBTaGFwZSB9IGZyb20gJy4uL1NoYXBlLmpzJztcbmltcG9ydCB7IGdldE51bWJlclZhbGlkYXRvciwgZ2V0TnVtYmVyQXJyYXlWYWxpZGF0b3IgfSBmcm9tICcuLi9WYWxpZGF0b3JzLmpzJztcbmltcG9ydCB7IF9yZWdpc3Rlck5vZGUgfSBmcm9tICcuLi9HbG9iYWwuanMnO1xuZnVuY3Rpb24gZ2V0Q29udHJvbFBvaW50cyh4MCwgeTAsIHgxLCB5MSwgeDIsIHkyLCB0KSB7XG4gICAgdmFyIGQwMSA9IE1hdGguc3FydChNYXRoLnBvdyh4MSAtIHgwLCAyKSArIE1hdGgucG93KHkxIC0geTAsIDIpKSwgZDEyID0gTWF0aC5zcXJ0KE1hdGgucG93KHgyIC0geDEsIDIpICsgTWF0aC5wb3coeTIgLSB5MSwgMikpLCBmYSA9ICh0ICogZDAxKSAvIChkMDEgKyBkMTIpLCBmYiA9ICh0ICogZDEyKSAvIChkMDEgKyBkMTIpLCBwMXggPSB4MSAtIGZhICogKHgyIC0geDApLCBwMXkgPSB5MSAtIGZhICogKHkyIC0geTApLCBwMnggPSB4MSArIGZiICogKHgyIC0geDApLCBwMnkgPSB5MSArIGZiICogKHkyIC0geTApO1xuICAgIHJldHVybiBbcDF4LCBwMXksIHAyeCwgcDJ5XTtcbn1cbmZ1bmN0aW9uIGV4cGFuZFBvaW50cyhwLCB0ZW5zaW9uKSB7XG4gICAgdmFyIGxlbiA9IHAubGVuZ3RoLCBhbGxQb2ludHMgPSBbXSwgbiwgY3A7XG4gICAgZm9yIChuID0gMjsgbiA8IGxlbiAtIDI7IG4gKz0gMikge1xuICAgICAgICBjcCA9IGdldENvbnRyb2xQb2ludHMocFtuIC0gMl0sIHBbbiAtIDFdLCBwW25dLCBwW24gKyAxXSwgcFtuICsgMl0sIHBbbiArIDNdLCB0ZW5zaW9uKTtcbiAgICAgICAgaWYgKGlzTmFOKGNwWzBdKSkge1xuICAgICAgICAgICAgY29udGludWU7XG4gICAgICAgIH1cbiAgICAgICAgYWxsUG9pbnRzLnB1c2goY3BbMF0pO1xuICAgICAgICBhbGxQb2ludHMucHVzaChjcFsxXSk7XG4gICAgICAgIGFsbFBvaW50cy5wdXNoKHBbbl0pO1xuICAgICAgICBhbGxQb2ludHMucHVzaChwW24gKyAxXSk7XG4gICAgICAgIGFsbFBvaW50cy5wdXNoKGNwWzJdKTtcbiAgICAgICAgYWxsUG9pbnRzLnB1c2goY3BbM10pO1xuICAgIH1cbiAgICByZXR1cm4gYWxsUG9pbnRzO1xufVxuZXhwb3J0IGNsYXNzIExpbmUgZXh0ZW5kcyBTaGFwZSB7XG4gICAgY29uc3RydWN0b3IoY29uZmlnKSB7XG4gICAgICAgIHN1cGVyKGNvbmZpZyk7XG4gICAgICAgIHRoaXMub24oJ3BvaW50c0NoYW5nZS5rb252YSB0ZW5zaW9uQ2hhbmdlLmtvbnZhIGNsb3NlZENoYW5nZS5rb252YSBiZXppZXJDaGFuZ2Uua29udmEnLCBmdW5jdGlvbiAoKSB7XG4gICAgICAgICAgICB0aGlzLl9jbGVhckNhY2hlKCd0ZW5zaW9uUG9pbnRzJyk7XG4gICAgICAgIH0pO1xuICAgIH1cbiAgICBfc2NlbmVGdW5jKGNvbnRleHQpIHtcbiAgICAgICAgdmFyIHBvaW50cyA9IHRoaXMucG9pbnRzKCksIGxlbmd0aCA9IHBvaW50cy5sZW5ndGgsIHRlbnNpb24gPSB0aGlzLnRlbnNpb24oKSwgY2xvc2VkID0gdGhpcy5jbG9zZWQoKSwgYmV6aWVyID0gdGhpcy5iZXppZXIoKSwgdHAsIGxlbiwgbjtcbiAgICAgICAgaWYgKCFsZW5ndGgpIHtcbiAgICAgICAgICAgIHJldHVybjtcbiAgICAgICAgfVxuICAgICAgICBjb250ZXh0LmJlZ2luUGF0aCgpO1xuICAgICAgICBjb250ZXh0Lm1vdmVUbyhwb2ludHNbMF0sIHBvaW50c1sxXSk7XG4gICAgICAgIGlmICh0ZW5zaW9uICE9PSAwICYmIGxlbmd0aCA+IDQpIHtcbiAgICAgICAgICAgIHRwID0gdGhpcy5nZXRUZW5zaW9uUG9pbnRzKCk7XG4gICAgICAgICAgICBsZW4gPSB0cC5sZW5ndGg7XG4gICAgICAgICAgICBuID0gY2xvc2VkID8gMCA6IDQ7XG4gICAgICAgICAgICBpZiAoIWNsb3NlZCkge1xuICAgICAgICAgICAgICAgIGNvbnRleHQucXVhZHJhdGljQ3VydmVUbyh0cFswXSwgdHBbMV0sIHRwWzJdLCB0cFszXSk7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICB3aGlsZSAobiA8IGxlbiAtIDIpIHtcbiAgICAgICAgICAgICAgICBjb250ZXh0LmJlemllckN1cnZlVG8odHBbbisrXSwgdHBbbisrXSwgdHBbbisrXSwgdHBbbisrXSwgdHBbbisrXSwgdHBbbisrXSk7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBpZiAoIWNsb3NlZCkge1xuICAgICAgICAgICAgICAgIGNvbnRleHQucXVhZHJhdGljQ3VydmVUbyh0cFtsZW4gLSAyXSwgdHBbbGVuIC0gMV0sIHBvaW50c1tsZW5ndGggLSAyXSwgcG9pbnRzW2xlbmd0aCAtIDFdKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgICBlbHNlIGlmIChiZXppZXIpIHtcbiAgICAgICAgICAgIG4gPSAyO1xuICAgICAgICAgICAgd2hpbGUgKG4gPCBsZW5ndGgpIHtcbiAgICAgICAgICAgICAgICBjb250ZXh0LmJlemllckN1cnZlVG8ocG9pbnRzW24rK10sIHBvaW50c1tuKytdLCBwb2ludHNbbisrXSwgcG9pbnRzW24rK10sIHBvaW50c1tuKytdLCBwb2ludHNbbisrXSk7XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgICAgZWxzZSB7XG4gICAgICAgICAgICBmb3IgKG4gPSAyOyBuIDwgbGVuZ3RoOyBuICs9IDIpIHtcbiAgICAgICAgICAgICAgICBjb250ZXh0LmxpbmVUbyhwb2ludHNbbl0sIHBvaW50c1tuICsgMV0pO1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICAgIGlmIChjbG9zZWQpIHtcbiAgICAgICAgICAgIGNvbnRleHQuY2xvc2VQYXRoKCk7XG4gICAgICAgICAgICBjb250ZXh0LmZpbGxTdHJva2VTaGFwZSh0aGlzKTtcbiAgICAgICAgfVxuICAgICAgICBlbHNlIHtcbiAgICAgICAgICAgIGNvbnRleHQuc3Ryb2tlU2hhcGUodGhpcyk7XG4gICAgICAgIH1cbiAgICB9XG4gICAgZ2V0VGVuc2lvblBvaW50cygpIHtcbiAgICAgICAgcmV0dXJuIHRoaXMuX2dldENhY2hlKCd0ZW5zaW9uUG9pbnRzJywgdGhpcy5fZ2V0VGVuc2lvblBvaW50cyk7XG4gICAgfVxuICAgIF9nZXRUZW5zaW9uUG9pbnRzKCkge1xuICAgICAgICBpZiAodGhpcy5jbG9zZWQoKSkge1xuICAgICAgICAgICAgcmV0dXJuIHRoaXMuX2dldFRlbnNpb25Qb2ludHNDbG9zZWQoKTtcbiAgICAgICAgfVxuICAgICAgICBlbHNlIHtcbiAgICAgICAgICAgIHJldHVybiBleHBhbmRQb2ludHModGhpcy5wb2ludHMoKSwgdGhpcy50ZW5zaW9uKCkpO1xuICAgICAgICB9XG4gICAgfVxuICAgIF9nZXRUZW5zaW9uUG9pbnRzQ2xvc2VkKCkge1xuICAgICAgICB2YXIgcCA9IHRoaXMucG9pbnRzKCksIGxlbiA9IHAubGVuZ3RoLCB0ZW5zaW9uID0gdGhpcy50ZW5zaW9uKCksIGZpcnN0Q29udHJvbFBvaW50cyA9IGdldENvbnRyb2xQb2ludHMocFtsZW4gLSAyXSwgcFtsZW4gLSAxXSwgcFswXSwgcFsxXSwgcFsyXSwgcFszXSwgdGVuc2lvbiksIGxhc3RDb250cm9sUG9pbnRzID0gZ2V0Q29udHJvbFBvaW50cyhwW2xlbiAtIDRdLCBwW2xlbiAtIDNdLCBwW2xlbiAtIDJdLCBwW2xlbiAtIDFdLCBwWzBdLCBwWzFdLCB0ZW5zaW9uKSwgbWlkZGxlID0gZXhwYW5kUG9pbnRzKHAsIHRlbnNpb24pLCB0cCA9IFtmaXJzdENvbnRyb2xQb2ludHNbMl0sIGZpcnN0Q29udHJvbFBvaW50c1szXV1cbiAgICAgICAgICAgIC5jb25jYXQobWlkZGxlKVxuICAgICAgICAgICAgLmNvbmNhdChbXG4gICAgICAgICAgICBsYXN0Q29udHJvbFBvaW50c1swXSxcbiAgICAgICAgICAgIGxhc3RDb250cm9sUG9pbnRzWzFdLFxuICAgICAgICAgICAgcFtsZW4gLSAyXSxcbiAgICAgICAgICAgIHBbbGVuIC0gMV0sXG4gICAgICAgICAgICBsYXN0Q29udHJvbFBvaW50c1syXSxcbiAgICAgICAgICAgIGxhc3RDb250cm9sUG9pbnRzWzNdLFxuICAgICAgICAgICAgZmlyc3RDb250cm9sUG9pbnRzWzBdLFxuICAgICAgICAgICAgZmlyc3RDb250cm9sUG9pbnRzWzFdLFxuICAgICAgICAgICAgcFswXSxcbiAgICAgICAgICAgIHBbMV0sXG4gICAgICAgIF0pO1xuICAgICAgICByZXR1cm4gdHA7XG4gICAgfVxuICAgIGdldFdpZHRoKCkge1xuICAgICAgICByZXR1cm4gdGhpcy5nZXRTZWxmUmVjdCgpLndpZHRoO1xuICAgIH1cbiAgICBnZXRIZWlnaHQoKSB7XG4gICAgICAgIHJldHVybiB0aGlzLmdldFNlbGZSZWN0KCkuaGVpZ2h0O1xuICAgIH1cbiAgICBnZXRTZWxmUmVjdCgpIHtcbiAgICAgICAgdmFyIHBvaW50cyA9IHRoaXMucG9pbnRzKCk7XG4gICAgICAgIGlmIChwb2ludHMubGVuZ3RoIDwgNCkge1xuICAgICAgICAgICAgcmV0dXJuIHtcbiAgICAgICAgICAgICAgICB4OiBwb2ludHNbMF0gfHwgMCxcbiAgICAgICAgICAgICAgICB5OiBwb2ludHNbMV0gfHwgMCxcbiAgICAgICAgICAgICAgICB3aWR0aDogMCxcbiAgICAgICAgICAgICAgICBoZWlnaHQ6IDAsXG4gICAgICAgICAgICB9O1xuICAgICAgICB9XG4gICAgICAgIGlmICh0aGlzLnRlbnNpb24oKSAhPT0gMCkge1xuICAgICAgICAgICAgcG9pbnRzID0gW1xuICAgICAgICAgICAgICAgIHBvaW50c1swXSxcbiAgICAgICAgICAgICAgICBwb2ludHNbMV0sXG4gICAgICAgICAgICAgICAgLi4udGhpcy5fZ2V0VGVuc2lvblBvaW50cygpLFxuICAgICAgICAgICAgICAgIHBvaW50c1twb2ludHMubGVuZ3RoIC0gMl0sXG4gICAgICAgICAgICAgICAgcG9pbnRzW3BvaW50cy5sZW5ndGggLSAxXSxcbiAgICAgICAgICAgIF07XG4gICAgICAgIH1cbiAgICAgICAgZWxzZSB7XG4gICAgICAgICAgICBwb2ludHMgPSB0aGlzLnBvaW50cygpO1xuICAgICAgICB9XG4gICAgICAgIHZhciBtaW5YID0gcG9pbnRzWzBdO1xuICAgICAgICB2YXIgbWF4WCA9IHBvaW50c1swXTtcbiAgICAgICAgdmFyIG1pblkgPSBwb2ludHNbMV07XG4gICAgICAgIHZhciBtYXhZID0gcG9pbnRzWzFdO1xuICAgICAgICB2YXIgeCwgeTtcbiAgICAgICAgZm9yICh2YXIgaSA9IDA7IGkgPCBwb2ludHMubGVuZ3RoIC8gMjsgaSsrKSB7XG4gICAgICAgICAgICB4ID0gcG9pbnRzW2kgKiAyXTtcbiAgICAgICAgICAgIHkgPSBwb2ludHNbaSAqIDIgKyAxXTtcbiAgICAgICAgICAgIG1pblggPSBNYXRoLm1pbihtaW5YLCB4KTtcbiAgICAgICAgICAgIG1heFggPSBNYXRoLm1heChtYXhYLCB4KTtcbiAgICAgICAgICAgIG1pblkgPSBNYXRoLm1pbihtaW5ZLCB5KTtcbiAgICAgICAgICAgIG1heFkgPSBNYXRoLm1heChtYXhZLCB5KTtcbiAgICAgICAgfVxuICAgICAgICByZXR1cm4ge1xuICAgICAgICAgICAgeDogbWluWCxcbiAgICAgICAgICAgIHk6IG1pblksXG4gICAgICAgICAgICB3aWR0aDogbWF4WCAtIG1pblgsXG4gICAgICAgICAgICBoZWlnaHQ6IG1heFkgLSBtaW5ZLFxuICAgICAgICB9O1xuICAgIH1cbn1cbkxpbmUucHJvdG90eXBlLmNsYXNzTmFtZSA9ICdMaW5lJztcbkxpbmUucHJvdG90eXBlLl9hdHRyc0FmZmVjdGluZ1NpemUgPSBbJ3BvaW50cycsICdiZXppZXInLCAndGVuc2lvbiddO1xuX3JlZ2lzdGVyTm9kZShMaW5lKTtcbkZhY3RvcnkuYWRkR2V0dGVyU2V0dGVyKExpbmUsICdjbG9zZWQnLCBmYWxzZSk7XG5GYWN0b3J5LmFkZEdldHRlclNldHRlcihMaW5lLCAnYmV6aWVyJywgZmFsc2UpO1xuRmFjdG9yeS5hZGRHZXR0ZXJTZXR0ZXIoTGluZSwgJ3RlbnNpb24nLCAwLCBnZXROdW1iZXJWYWxpZGF0b3IoKSk7XG5GYWN0b3J5LmFkZEdldHRlclNldHRlcihMaW5lLCAncG9pbnRzJywgW10sIGdldE51bWJlckFycmF5VmFsaWRhdG9yKCkpO1xuIiwiaW1wb3J0IHsgRmFjdG9yeSB9IGZyb20gJy4uL0ZhY3RvcnkuanMnO1xuaW1wb3J0IHsgU2hhcGUgfSBmcm9tICcuLi9TaGFwZS5qcyc7XG5pbXBvcnQgeyBfcmVnaXN0ZXJOb2RlIH0gZnJvbSAnLi4vR2xvYmFsLmpzJztcbmltcG9ydCB7IFV0aWwgfSBmcm9tICcuLi9VdGlsLmpzJztcbmltcG9ydCB7IGdldE51bWJlck9yQXJyYXlPZk51bWJlcnNWYWxpZGF0b3IgfSBmcm9tICcuLi9WYWxpZGF0b3JzLmpzJztcbmV4cG9ydCBjbGFzcyBSZWN0IGV4dGVuZHMgU2hhcGUge1xuICAgIF9zY2VuZUZ1bmMoY29udGV4dCkge1xuICAgICAgICB2YXIgY29ybmVyUmFkaXVzID0gdGhpcy5jb3JuZXJSYWRpdXMoKSwgd2lkdGggPSB0aGlzLndpZHRoKCksIGhlaWdodCA9IHRoaXMuaGVpZ2h0KCk7XG4gICAgICAgIGNvbnRleHQuYmVnaW5QYXRoKCk7XG4gICAgICAgIGlmICghY29ybmVyUmFkaXVzKSB7XG4gICAgICAgICAgICBjb250ZXh0LnJlY3QoMCwgMCwgd2lkdGgsIGhlaWdodCk7XG4gICAgICAgIH1cbiAgICAgICAgZWxzZSB7XG4gICAgICAgICAgICBVdGlsLmRyYXdSb3VuZGVkUmVjdFBhdGgoY29udGV4dCwgd2lkdGgsIGhlaWdodCwgY29ybmVyUmFkaXVzKTtcbiAgICAgICAgfVxuICAgICAgICBjb250ZXh0LmNsb3NlUGF0aCgpO1xuICAgICAgICBjb250ZXh0LmZpbGxTdHJva2VTaGFwZSh0aGlzKTtcbiAgICB9XG59XG5SZWN0LnByb3RvdHlwZS5jbGFzc05hbWUgPSAnUmVjdCc7XG5fcmVnaXN0ZXJOb2RlKFJlY3QpO1xuRmFjdG9yeS5hZGRHZXR0ZXJTZXR0ZXIoUmVjdCwgJ2Nvcm5lclJhZGl1cycsIDAsIGdldE51bWJlck9yQXJyYXlPZk51bWJlcnNWYWxpZGF0b3IoNCkpO1xuIiwiaW1wb3J0IHsgVXRpbCB9IGZyb20gJy4uL1V0aWwuanMnO1xuaW1wb3J0IHsgRmFjdG9yeSB9IGZyb20gJy4uL0ZhY3RvcnkuanMnO1xuaW1wb3J0IHsgU2hhcGUgfSBmcm9tICcuLi9TaGFwZS5qcyc7XG5pbXBvcnQgeyBnZXROdW1iZXJWYWxpZGF0b3IsIGdldFN0cmluZ1ZhbGlkYXRvciwgZ2V0TnVtYmVyT3JBdXRvVmFsaWRhdG9yLCBnZXRCb29sZWFuVmFsaWRhdG9yLCB9IGZyb20gJy4uL1ZhbGlkYXRvcnMuanMnO1xuaW1wb3J0IHsgX3JlZ2lzdGVyTm9kZSB9IGZyb20gJy4uL0dsb2JhbC5qcyc7XG5leHBvcnQgZnVuY3Rpb24gc3RyaW5nVG9BcnJheShzdHJpbmcpIHtcbiAgICByZXR1cm4gQXJyYXkuZnJvbShzdHJpbmcpO1xufVxudmFyIEFVVE8gPSAnYXV0bycsIENFTlRFUiA9ICdjZW50ZXInLCBKVVNUSUZZID0gJ2p1c3RpZnknLCBDSEFOR0VfS09OVkEgPSAnQ2hhbmdlLmtvbnZhJywgQ09OVEVYVF8yRCA9ICcyZCcsIERBU0ggPSAnLScsIExFRlQgPSAnbGVmdCcsIFRFWFQgPSAndGV4dCcsIFRFWFRfVVBQRVIgPSAnVGV4dCcsIFRPUCA9ICd0b3AnLCBCT1RUT00gPSAnYm90dG9tJywgTUlERExFID0gJ21pZGRsZScsIE5PUk1BTCA9ICdub3JtYWwnLCBQWF9TUEFDRSA9ICdweCAnLCBTUEFDRSA9ICcgJywgUklHSFQgPSAncmlnaHQnLCBXT1JEID0gJ3dvcmQnLCBDSEFSID0gJ2NoYXInLCBOT05FID0gJ25vbmUnLCBFTExJUFNJUyA9ICfigKYnLCBBVFRSX0NIQU5HRV9MSVNUID0gW1xuICAgICdmb250RmFtaWx5JyxcbiAgICAnZm9udFNpemUnLFxuICAgICdmb250U3R5bGUnLFxuICAgICdmb250VmFyaWFudCcsXG4gICAgJ3BhZGRpbmcnLFxuICAgICdhbGlnbicsXG4gICAgJ3ZlcnRpY2FsQWxpZ24nLFxuICAgICdsaW5lSGVpZ2h0JyxcbiAgICAndGV4dCcsXG4gICAgJ3dpZHRoJyxcbiAgICAnaGVpZ2h0JyxcbiAgICAnd3JhcCcsXG4gICAgJ2VsbGlwc2lzJyxcbiAgICAnbGV0dGVyU3BhY2luZycsXG5dLCBhdHRyQ2hhbmdlTGlzdExlbiA9IEFUVFJfQ0hBTkdFX0xJU1QubGVuZ3RoO1xuZnVuY3Rpb24gbm9ybWFsaXplRm9udEZhbWlseShmb250RmFtaWx5KSB7XG4gICAgcmV0dXJuIGZvbnRGYW1pbHlcbiAgICAgICAgLnNwbGl0KCcsJylcbiAgICAgICAgLm1hcCgoZmFtaWx5KSA9PiB7XG4gICAgICAgIGZhbWlseSA9IGZhbWlseS50cmltKCk7XG4gICAgICAgIGNvbnN0IGhhc1NwYWNlID0gZmFtaWx5LmluZGV4T2YoJyAnKSA+PSAwO1xuICAgICAgICBjb25zdCBoYXNRdW90ZXMgPSBmYW1pbHkuaW5kZXhPZignXCInKSA+PSAwIHx8IGZhbWlseS5pbmRleE9mKFwiJ1wiKSA+PSAwO1xuICAgICAgICBpZiAoaGFzU3BhY2UgJiYgIWhhc1F1b3Rlcykge1xuICAgICAgICAgICAgZmFtaWx5ID0gYFwiJHtmYW1pbHl9XCJgO1xuICAgICAgICB9XG4gICAgICAgIHJldHVybiBmYW1pbHk7XG4gICAgfSlcbiAgICAgICAgLmpvaW4oJywgJyk7XG59XG52YXIgZHVtbXlDb250ZXh0O1xuZnVuY3Rpb24gZ2V0RHVtbXlDb250ZXh0KCkge1xuICAgIGlmIChkdW1teUNvbnRleHQpIHtcbiAgICAgICAgcmV0dXJuIGR1bW15Q29udGV4dDtcbiAgICB9XG4gICAgZHVtbXlDb250ZXh0ID0gVXRpbC5jcmVhdGVDYW52YXNFbGVtZW50KCkuZ2V0Q29udGV4dChDT05URVhUXzJEKTtcbiAgICByZXR1cm4gZHVtbXlDb250ZXh0O1xufVxuZnVuY3Rpb24gX2ZpbGxGdW5jKGNvbnRleHQpIHtcbiAgICBjb250ZXh0LmZpbGxUZXh0KHRoaXMuX3BhcnRpYWxUZXh0LCB0aGlzLl9wYXJ0aWFsVGV4dFgsIHRoaXMuX3BhcnRpYWxUZXh0WSk7XG59XG5mdW5jdGlvbiBfc3Ryb2tlRnVuYyhjb250ZXh0KSB7XG4gICAgY29udGV4dC5zdHJva2VUZXh0KHRoaXMuX3BhcnRpYWxUZXh0LCB0aGlzLl9wYXJ0aWFsVGV4dFgsIHRoaXMuX3BhcnRpYWxUZXh0WSk7XG59XG5mdW5jdGlvbiBjaGVja0RlZmF1bHRGaWxsKGNvbmZpZykge1xuICAgIGNvbmZpZyA9IGNvbmZpZyB8fCB7fTtcbiAgICBpZiAoIWNvbmZpZy5maWxsTGluZWFyR3JhZGllbnRDb2xvclN0b3BzICYmXG4gICAgICAgICFjb25maWcuZmlsbFJhZGlhbEdyYWRpZW50Q29sb3JTdG9wcyAmJlxuICAgICAgICAhY29uZmlnLmZpbGxQYXR0ZXJuSW1hZ2UpIHtcbiAgICAgICAgY29uZmlnLmZpbGwgPSBjb25maWcuZmlsbCB8fCAnYmxhY2snO1xuICAgIH1cbiAgICByZXR1cm4gY29uZmlnO1xufVxuZXhwb3J0IGNsYXNzIFRleHQgZXh0ZW5kcyBTaGFwZSB7XG4gICAgY29uc3RydWN0b3IoY29uZmlnKSB7XG4gICAgICAgIHN1cGVyKGNoZWNrRGVmYXVsdEZpbGwoY29uZmlnKSk7XG4gICAgICAgIHRoaXMuX3BhcnRpYWxUZXh0WCA9IDA7XG4gICAgICAgIHRoaXMuX3BhcnRpYWxUZXh0WSA9IDA7XG4gICAgICAgIGZvciAodmFyIG4gPSAwOyBuIDwgYXR0ckNoYW5nZUxpc3RMZW47IG4rKykge1xuICAgICAgICAgICAgdGhpcy5vbihBVFRSX0NIQU5HRV9MSVNUW25dICsgQ0hBTkdFX0tPTlZBLCB0aGlzLl9zZXRUZXh0RGF0YSk7XG4gICAgICAgIH1cbiAgICAgICAgdGhpcy5fc2V0VGV4dERhdGEoKTtcbiAgICB9XG4gICAgX3NjZW5lRnVuYyhjb250ZXh0KSB7XG4gICAgICAgIHZhciB0ZXh0QXJyID0gdGhpcy50ZXh0QXJyLCB0ZXh0QXJyTGVuID0gdGV4dEFyci5sZW5ndGg7XG4gICAgICAgIGlmICghdGhpcy50ZXh0KCkpIHtcbiAgICAgICAgICAgIHJldHVybjtcbiAgICAgICAgfVxuICAgICAgICB2YXIgcGFkZGluZyA9IHRoaXMucGFkZGluZygpLCBmb250U2l6ZSA9IHRoaXMuZm9udFNpemUoKSwgbGluZUhlaWdodFB4ID0gdGhpcy5saW5lSGVpZ2h0KCkgKiBmb250U2l6ZSwgdmVydGljYWxBbGlnbiA9IHRoaXMudmVydGljYWxBbGlnbigpLCBhbGlnblkgPSAwLCBhbGlnbiA9IHRoaXMuYWxpZ24oKSwgdG90YWxXaWR0aCA9IHRoaXMuZ2V0V2lkdGgoKSwgbGV0dGVyU3BhY2luZyA9IHRoaXMubGV0dGVyU3BhY2luZygpLCBmaWxsID0gdGhpcy5maWxsKCksIHRleHREZWNvcmF0aW9uID0gdGhpcy50ZXh0RGVjb3JhdGlvbigpLCBzaG91bGRVbmRlcmxpbmUgPSB0ZXh0RGVjb3JhdGlvbi5pbmRleE9mKCd1bmRlcmxpbmUnKSAhPT0gLTEsIHNob3VsZExpbmVUaHJvdWdoID0gdGV4dERlY29yYXRpb24uaW5kZXhPZignbGluZS10aHJvdWdoJykgIT09IC0xLCBuO1xuICAgICAgICB2YXIgdHJhbnNsYXRlWSA9IDA7XG4gICAgICAgIHZhciB0cmFuc2xhdGVZID0gbGluZUhlaWdodFB4IC8gMjtcbiAgICAgICAgdmFyIGxpbmVUcmFuc2xhdGVYID0gMDtcbiAgICAgICAgdmFyIGxpbmVUcmFuc2xhdGVZID0gMDtcbiAgICAgICAgY29udGV4dC5zZXRBdHRyKCdmb250JywgdGhpcy5fZ2V0Q29udGV4dEZvbnQoKSk7XG4gICAgICAgIGNvbnRleHQuc2V0QXR0cigndGV4dEJhc2VsaW5lJywgTUlERExFKTtcbiAgICAgICAgY29udGV4dC5zZXRBdHRyKCd0ZXh0QWxpZ24nLCBMRUZUKTtcbiAgICAgICAgaWYgKHZlcnRpY2FsQWxpZ24gPT09IE1JRERMRSkge1xuICAgICAgICAgICAgYWxpZ25ZID0gKHRoaXMuZ2V0SGVpZ2h0KCkgLSB0ZXh0QXJyTGVuICogbGluZUhlaWdodFB4IC0gcGFkZGluZyAqIDIpIC8gMjtcbiAgICAgICAgfVxuICAgICAgICBlbHNlIGlmICh2ZXJ0aWNhbEFsaWduID09PSBCT1RUT00pIHtcbiAgICAgICAgICAgIGFsaWduWSA9IHRoaXMuZ2V0SGVpZ2h0KCkgLSB0ZXh0QXJyTGVuICogbGluZUhlaWdodFB4IC0gcGFkZGluZyAqIDI7XG4gICAgICAgIH1cbiAgICAgICAgY29udGV4dC50cmFuc2xhdGUocGFkZGluZywgYWxpZ25ZICsgcGFkZGluZyk7XG4gICAgICAgIGZvciAobiA9IDA7IG4gPCB0ZXh0QXJyTGVuOyBuKyspIHtcbiAgICAgICAgICAgIHZhciBsaW5lVHJhbnNsYXRlWCA9IDA7XG4gICAgICAgICAgICB2YXIgbGluZVRyYW5zbGF0ZVkgPSAwO1xuICAgICAgICAgICAgdmFyIG9iaiA9IHRleHRBcnJbbl0sIHRleHQgPSBvYmoudGV4dCwgd2lkdGggPSBvYmoud2lkdGgsIGxhc3RMaW5lID0gb2JqLmxhc3RJblBhcmFncmFwaCwgc3BhY2VzTnVtYmVyLCBvbmVXb3JkLCBsaW5lV2lkdGg7XG4gICAgICAgICAgICBjb250ZXh0LnNhdmUoKTtcbiAgICAgICAgICAgIGlmIChhbGlnbiA9PT0gUklHSFQpIHtcbiAgICAgICAgICAgICAgICBsaW5lVHJhbnNsYXRlWCArPSB0b3RhbFdpZHRoIC0gd2lkdGggLSBwYWRkaW5nICogMjtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGVsc2UgaWYgKGFsaWduID09PSBDRU5URVIpIHtcbiAgICAgICAgICAgICAgICBsaW5lVHJhbnNsYXRlWCArPSAodG90YWxXaWR0aCAtIHdpZHRoIC0gcGFkZGluZyAqIDIpIC8gMjtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGlmIChzaG91bGRVbmRlcmxpbmUpIHtcbiAgICAgICAgICAgICAgICBjb250ZXh0LnNhdmUoKTtcbiAgICAgICAgICAgICAgICBjb250ZXh0LmJlZ2luUGF0aCgpO1xuICAgICAgICAgICAgICAgIGNvbnRleHQubW92ZVRvKGxpbmVUcmFuc2xhdGVYLCB0cmFuc2xhdGVZICsgbGluZVRyYW5zbGF0ZVkgKyBNYXRoLnJvdW5kKGZvbnRTaXplIC8gMikpO1xuICAgICAgICAgICAgICAgIHNwYWNlc051bWJlciA9IHRleHQuc3BsaXQoJyAnKS5sZW5ndGggLSAxO1xuICAgICAgICAgICAgICAgIG9uZVdvcmQgPSBzcGFjZXNOdW1iZXIgPT09IDA7XG4gICAgICAgICAgICAgICAgbGluZVdpZHRoID1cbiAgICAgICAgICAgICAgICAgICAgYWxpZ24gPT09IEpVU1RJRlkgJiYgbGFzdExpbmUgJiYgIW9uZVdvcmRcbiAgICAgICAgICAgICAgICAgICAgICAgID8gdG90YWxXaWR0aCAtIHBhZGRpbmcgKiAyXG4gICAgICAgICAgICAgICAgICAgICAgICA6IHdpZHRoO1xuICAgICAgICAgICAgICAgIGNvbnRleHQubGluZVRvKGxpbmVUcmFuc2xhdGVYICsgTWF0aC5yb3VuZChsaW5lV2lkdGgpLCB0cmFuc2xhdGVZICsgbGluZVRyYW5zbGF0ZVkgKyBNYXRoLnJvdW5kKGZvbnRTaXplIC8gMikpO1xuICAgICAgICAgICAgICAgIGNvbnRleHQubGluZVdpZHRoID0gZm9udFNpemUgLyAxNTtcbiAgICAgICAgICAgICAgICBjb250ZXh0LnN0cm9rZVN0eWxlID0gZmlsbDtcbiAgICAgICAgICAgICAgICBjb250ZXh0LnN0cm9rZSgpO1xuICAgICAgICAgICAgICAgIGNvbnRleHQucmVzdG9yZSgpO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgaWYgKHNob3VsZExpbmVUaHJvdWdoKSB7XG4gICAgICAgICAgICAgICAgY29udGV4dC5zYXZlKCk7XG4gICAgICAgICAgICAgICAgY29udGV4dC5iZWdpblBhdGgoKTtcbiAgICAgICAgICAgICAgICBjb250ZXh0Lm1vdmVUbyhsaW5lVHJhbnNsYXRlWCwgdHJhbnNsYXRlWSArIGxpbmVUcmFuc2xhdGVZKTtcbiAgICAgICAgICAgICAgICBzcGFjZXNOdW1iZXIgPSB0ZXh0LnNwbGl0KCcgJykubGVuZ3RoIC0gMTtcbiAgICAgICAgICAgICAgICBvbmVXb3JkID0gc3BhY2VzTnVtYmVyID09PSAwO1xuICAgICAgICAgICAgICAgIGxpbmVXaWR0aCA9XG4gICAgICAgICAgICAgICAgICAgIGFsaWduID09PSBKVVNUSUZZICYmIGxhc3RMaW5lICYmICFvbmVXb3JkXG4gICAgICAgICAgICAgICAgICAgICAgICA/IHRvdGFsV2lkdGggLSBwYWRkaW5nICogMlxuICAgICAgICAgICAgICAgICAgICAgICAgOiB3aWR0aDtcbiAgICAgICAgICAgICAgICBjb250ZXh0LmxpbmVUbyhsaW5lVHJhbnNsYXRlWCArIE1hdGgucm91bmQobGluZVdpZHRoKSwgdHJhbnNsYXRlWSArIGxpbmVUcmFuc2xhdGVZKTtcbiAgICAgICAgICAgICAgICBjb250ZXh0LmxpbmVXaWR0aCA9IGZvbnRTaXplIC8gMTU7XG4gICAgICAgICAgICAgICAgY29udGV4dC5zdHJva2VTdHlsZSA9IGZpbGw7XG4gICAgICAgICAgICAgICAgY29udGV4dC5zdHJva2UoKTtcbiAgICAgICAgICAgICAgICBjb250ZXh0LnJlc3RvcmUoKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGlmIChsZXR0ZXJTcGFjaW5nICE9PSAwIHx8IGFsaWduID09PSBKVVNUSUZZKSB7XG4gICAgICAgICAgICAgICAgc3BhY2VzTnVtYmVyID0gdGV4dC5zcGxpdCgnICcpLmxlbmd0aCAtIDE7XG4gICAgICAgICAgICAgICAgdmFyIGFycmF5ID0gc3RyaW5nVG9BcnJheSh0ZXh0KTtcbiAgICAgICAgICAgICAgICBmb3IgKHZhciBsaSA9IDA7IGxpIDwgYXJyYXkubGVuZ3RoOyBsaSsrKSB7XG4gICAgICAgICAgICAgICAgICAgIHZhciBsZXR0ZXIgPSBhcnJheVtsaV07XG4gICAgICAgICAgICAgICAgICAgIGlmIChsZXR0ZXIgPT09ICcgJyAmJiAhbGFzdExpbmUgJiYgYWxpZ24gPT09IEpVU1RJRlkpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIGxpbmVUcmFuc2xhdGVYICs9ICh0b3RhbFdpZHRoIC0gcGFkZGluZyAqIDIgLSB3aWR0aCkgLyBzcGFjZXNOdW1iZXI7XG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgdGhpcy5fcGFydGlhbFRleHRYID0gbGluZVRyYW5zbGF0ZVg7XG4gICAgICAgICAgICAgICAgICAgIHRoaXMuX3BhcnRpYWxUZXh0WSA9IHRyYW5zbGF0ZVkgKyBsaW5lVHJhbnNsYXRlWTtcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5fcGFydGlhbFRleHQgPSBsZXR0ZXI7XG4gICAgICAgICAgICAgICAgICAgIGNvbnRleHQuZmlsbFN0cm9rZVNoYXBlKHRoaXMpO1xuICAgICAgICAgICAgICAgICAgICBsaW5lVHJhbnNsYXRlWCArPSB0aGlzLm1lYXN1cmVTaXplKGxldHRlcikud2lkdGggKyBsZXR0ZXJTcGFjaW5nO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGVsc2Uge1xuICAgICAgICAgICAgICAgIHRoaXMuX3BhcnRpYWxUZXh0WCA9IGxpbmVUcmFuc2xhdGVYO1xuICAgICAgICAgICAgICAgIHRoaXMuX3BhcnRpYWxUZXh0WSA9IHRyYW5zbGF0ZVkgKyBsaW5lVHJhbnNsYXRlWTtcbiAgICAgICAgICAgICAgICB0aGlzLl9wYXJ0aWFsVGV4dCA9IHRleHQ7XG4gICAgICAgICAgICAgICAgY29udGV4dC5maWxsU3Ryb2tlU2hhcGUodGhpcyk7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBjb250ZXh0LnJlc3RvcmUoKTtcbiAgICAgICAgICAgIGlmICh0ZXh0QXJyTGVuID4gMSkge1xuICAgICAgICAgICAgICAgIHRyYW5zbGF0ZVkgKz0gbGluZUhlaWdodFB4O1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgfVxuICAgIF9oaXRGdW5jKGNvbnRleHQpIHtcbiAgICAgICAgdmFyIHdpZHRoID0gdGhpcy5nZXRXaWR0aCgpLCBoZWlnaHQgPSB0aGlzLmdldEhlaWdodCgpO1xuICAgICAgICBjb250ZXh0LmJlZ2luUGF0aCgpO1xuICAgICAgICBjb250ZXh0LnJlY3QoMCwgMCwgd2lkdGgsIGhlaWdodCk7XG4gICAgICAgIGNvbnRleHQuY2xvc2VQYXRoKCk7XG4gICAgICAgIGNvbnRleHQuZmlsbFN0cm9rZVNoYXBlKHRoaXMpO1xuICAgIH1cbiAgICBzZXRUZXh0KHRleHQpIHtcbiAgICAgICAgdmFyIHN0ciA9IFV0aWwuX2lzU3RyaW5nKHRleHQpXG4gICAgICAgICAgICA/IHRleHRcbiAgICAgICAgICAgIDogdGV4dCA9PT0gbnVsbCB8fCB0ZXh0ID09PSB1bmRlZmluZWRcbiAgICAgICAgICAgICAgICA/ICcnXG4gICAgICAgICAgICAgICAgOiB0ZXh0ICsgJyc7XG4gICAgICAgIHRoaXMuX3NldEF0dHIoVEVYVCwgc3RyKTtcbiAgICAgICAgcmV0dXJuIHRoaXM7XG4gICAgfVxuICAgIGdldFdpZHRoKCkge1xuICAgICAgICB2YXIgaXNBdXRvID0gdGhpcy5hdHRycy53aWR0aCA9PT0gQVVUTyB8fCB0aGlzLmF0dHJzLndpZHRoID09PSB1bmRlZmluZWQ7XG4gICAgICAgIHJldHVybiBpc0F1dG8gPyB0aGlzLmdldFRleHRXaWR0aCgpICsgdGhpcy5wYWRkaW5nKCkgKiAyIDogdGhpcy5hdHRycy53aWR0aDtcbiAgICB9XG4gICAgZ2V0SGVpZ2h0KCkge1xuICAgICAgICB2YXIgaXNBdXRvID0gdGhpcy5hdHRycy5oZWlnaHQgPT09IEFVVE8gfHwgdGhpcy5hdHRycy5oZWlnaHQgPT09IHVuZGVmaW5lZDtcbiAgICAgICAgcmV0dXJuIGlzQXV0b1xuICAgICAgICAgICAgPyB0aGlzLmZvbnRTaXplKCkgKiB0aGlzLnRleHRBcnIubGVuZ3RoICogdGhpcy5saW5lSGVpZ2h0KCkgK1xuICAgICAgICAgICAgICAgIHRoaXMucGFkZGluZygpICogMlxuICAgICAgICAgICAgOiB0aGlzLmF0dHJzLmhlaWdodDtcbiAgICB9XG4gICAgZ2V0VGV4dFdpZHRoKCkge1xuICAgICAgICByZXR1cm4gdGhpcy50ZXh0V2lkdGg7XG4gICAgfVxuICAgIGdldFRleHRIZWlnaHQoKSB7XG4gICAgICAgIFV0aWwud2FybigndGV4dC5nZXRUZXh0SGVpZ2h0KCkgbWV0aG9kIGlzIGRlcHJlY2F0ZWQuIFVzZSB0ZXh0LmhlaWdodCgpIC0gZm9yIGZ1bGwgaGVpZ2h0IGFuZCB0ZXh0LmZvbnRTaXplKCkgLSBmb3Igb25lIGxpbmUgaGVpZ2h0LicpO1xuICAgICAgICByZXR1cm4gdGhpcy50ZXh0SGVpZ2h0O1xuICAgIH1cbiAgICBtZWFzdXJlU2l6ZSh0ZXh0KSB7XG4gICAgICAgIHZhciBfY29udGV4dCA9IGdldER1bW15Q29udGV4dCgpLCBmb250U2l6ZSA9IHRoaXMuZm9udFNpemUoKSwgbWV0cmljcztcbiAgICAgICAgX2NvbnRleHQuc2F2ZSgpO1xuICAgICAgICBfY29udGV4dC5mb250ID0gdGhpcy5fZ2V0Q29udGV4dEZvbnQoKTtcbiAgICAgICAgbWV0cmljcyA9IF9jb250ZXh0Lm1lYXN1cmVUZXh0KHRleHQpO1xuICAgICAgICBfY29udGV4dC5yZXN0b3JlKCk7XG4gICAgICAgIHJldHVybiB7XG4gICAgICAgICAgICB3aWR0aDogbWV0cmljcy53aWR0aCxcbiAgICAgICAgICAgIGhlaWdodDogZm9udFNpemUsXG4gICAgICAgIH07XG4gICAgfVxuICAgIF9nZXRDb250ZXh0Rm9udCgpIHtcbiAgICAgICAgcmV0dXJuICh0aGlzLmZvbnRTdHlsZSgpICtcbiAgICAgICAgICAgIFNQQUNFICtcbiAgICAgICAgICAgIHRoaXMuZm9udFZhcmlhbnQoKSArXG4gICAgICAgICAgICBTUEFDRSArXG4gICAgICAgICAgICAodGhpcy5mb250U2l6ZSgpICsgUFhfU1BBQ0UpICtcbiAgICAgICAgICAgIG5vcm1hbGl6ZUZvbnRGYW1pbHkodGhpcy5mb250RmFtaWx5KCkpKTtcbiAgICB9XG4gICAgX2FkZFRleHRMaW5lKGxpbmUpIHtcbiAgICAgICAgaWYgKHRoaXMuYWxpZ24oKSA9PT0gSlVTVElGWSkge1xuICAgICAgICAgICAgbGluZSA9IGxpbmUudHJpbSgpO1xuICAgICAgICB9XG4gICAgICAgIHZhciB3aWR0aCA9IHRoaXMuX2dldFRleHRXaWR0aChsaW5lKTtcbiAgICAgICAgcmV0dXJuIHRoaXMudGV4dEFyci5wdXNoKHtcbiAgICAgICAgICAgIHRleHQ6IGxpbmUsXG4gICAgICAgICAgICB3aWR0aDogd2lkdGgsXG4gICAgICAgICAgICBsYXN0SW5QYXJhZ3JhcGg6IGZhbHNlLFxuICAgICAgICB9KTtcbiAgICB9XG4gICAgX2dldFRleHRXaWR0aCh0ZXh0KSB7XG4gICAgICAgIHZhciBsZXR0ZXJTcGFjaW5nID0gdGhpcy5sZXR0ZXJTcGFjaW5nKCk7XG4gICAgICAgIHZhciBsZW5ndGggPSB0ZXh0Lmxlbmd0aDtcbiAgICAgICAgcmV0dXJuIChnZXREdW1teUNvbnRleHQoKS5tZWFzdXJlVGV4dCh0ZXh0KS53aWR0aCArXG4gICAgICAgICAgICAobGVuZ3RoID8gbGV0dGVyU3BhY2luZyAqIChsZW5ndGggLSAxKSA6IDApKTtcbiAgICB9XG4gICAgX3NldFRleHREYXRhKCkge1xuICAgICAgICB2YXIgbGluZXMgPSB0aGlzLnRleHQoKS5zcGxpdCgnXFxuJyksIGZvbnRTaXplID0gK3RoaXMuZm9udFNpemUoKSwgdGV4dFdpZHRoID0gMCwgbGluZUhlaWdodFB4ID0gdGhpcy5saW5lSGVpZ2h0KCkgKiBmb250U2l6ZSwgd2lkdGggPSB0aGlzLmF0dHJzLndpZHRoLCBoZWlnaHQgPSB0aGlzLmF0dHJzLmhlaWdodCwgZml4ZWRXaWR0aCA9IHdpZHRoICE9PSBBVVRPICYmIHdpZHRoICE9PSB1bmRlZmluZWQsIGZpeGVkSGVpZ2h0ID0gaGVpZ2h0ICE9PSBBVVRPICYmIGhlaWdodCAhPT0gdW5kZWZpbmVkLCBwYWRkaW5nID0gdGhpcy5wYWRkaW5nKCksIG1heFdpZHRoID0gd2lkdGggLSBwYWRkaW5nICogMiwgbWF4SGVpZ2h0UHggPSBoZWlnaHQgLSBwYWRkaW5nICogMiwgY3VycmVudEhlaWdodFB4ID0gMCwgd3JhcCA9IHRoaXMud3JhcCgpLCBzaG91bGRXcmFwID0gd3JhcCAhPT0gTk9ORSwgd3JhcEF0V29yZCA9IHdyYXAgIT09IENIQVIgJiYgc2hvdWxkV3JhcCwgc2hvdWxkQWRkRWxsaXBzaXMgPSB0aGlzLmVsbGlwc2lzKCk7XG4gICAgICAgIHRoaXMudGV4dEFyciA9IFtdO1xuICAgICAgICBnZXREdW1teUNvbnRleHQoKS5mb250ID0gdGhpcy5fZ2V0Q29udGV4dEZvbnQoKTtcbiAgICAgICAgdmFyIGFkZGl0aW9uYWxXaWR0aCA9IHNob3VsZEFkZEVsbGlwc2lzID8gdGhpcy5fZ2V0VGV4dFdpZHRoKEVMTElQU0lTKSA6IDA7XG4gICAgICAgIGZvciAodmFyIGkgPSAwLCBtYXggPSBsaW5lcy5sZW5ndGg7IGkgPCBtYXg7ICsraSkge1xuICAgICAgICAgICAgdmFyIGxpbmUgPSBsaW5lc1tpXTtcbiAgICAgICAgICAgIHZhciBsaW5lV2lkdGggPSB0aGlzLl9nZXRUZXh0V2lkdGgobGluZSk7XG4gICAgICAgICAgICBpZiAoZml4ZWRXaWR0aCAmJiBsaW5lV2lkdGggPiBtYXhXaWR0aCkge1xuICAgICAgICAgICAgICAgIHdoaWxlIChsaW5lLmxlbmd0aCA+IDApIHtcbiAgICAgICAgICAgICAgICAgICAgdmFyIGxvdyA9IDAsIGhpZ2ggPSBsaW5lLmxlbmd0aCwgbWF0Y2ggPSAnJywgbWF0Y2hXaWR0aCA9IDA7XG4gICAgICAgICAgICAgICAgICAgIHdoaWxlIChsb3cgPCBoaWdoKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICB2YXIgbWlkID0gKGxvdyArIGhpZ2gpID4+PiAxLCBzdWJzdHIgPSBsaW5lLnNsaWNlKDAsIG1pZCArIDEpLCBzdWJzdHJXaWR0aCA9IHRoaXMuX2dldFRleHRXaWR0aChzdWJzdHIpICsgYWRkaXRpb25hbFdpZHRoO1xuICAgICAgICAgICAgICAgICAgICAgICAgaWYgKHN1YnN0cldpZHRoIDw9IG1heFdpZHRoKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgbG93ID0gbWlkICsgMTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBtYXRjaCA9IHN1YnN0cjtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBtYXRjaFdpZHRoID0gc3Vic3RyV2lkdGg7XG4gICAgICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgICAgICBlbHNlIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBoaWdoID0gbWlkO1xuICAgICAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgIGlmIChtYXRjaCkge1xuICAgICAgICAgICAgICAgICAgICAgICAgaWYgKHdyYXBBdFdvcmQpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB2YXIgd3JhcEluZGV4O1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHZhciBuZXh0Q2hhciA9IGxpbmVbbWF0Y2gubGVuZ3RoXTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB2YXIgbmV4dElzU3BhY2VPckRhc2ggPSBuZXh0Q2hhciA9PT0gU1BBQ0UgfHwgbmV4dENoYXIgPT09IERBU0g7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgaWYgKG5leHRJc1NwYWNlT3JEYXNoICYmIG1hdGNoV2lkdGggPD0gbWF4V2lkdGgpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgd3JhcEluZGV4ID0gbWF0Y2gubGVuZ3RoO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBlbHNlIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgd3JhcEluZGV4ID1cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIE1hdGgubWF4KG1hdGNoLmxhc3RJbmRleE9mKFNQQUNFKSwgbWF0Y2gubGFzdEluZGV4T2YoREFTSCkpICtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAxO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBpZiAod3JhcEluZGV4ID4gMCkge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBsb3cgPSB3cmFwSW5kZXg7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIG1hdGNoID0gbWF0Y2guc2xpY2UoMCwgbG93KTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgbWF0Y2hXaWR0aCA9IHRoaXMuX2dldFRleHRXaWR0aChtYXRjaCk7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICAgICAgbWF0Y2ggPSBtYXRjaC50cmltUmlnaHQoKTtcbiAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMuX2FkZFRleHRMaW5lKG1hdGNoKTtcbiAgICAgICAgICAgICAgICAgICAgICAgIHRleHRXaWR0aCA9IE1hdGgubWF4KHRleHRXaWR0aCwgbWF0Y2hXaWR0aCk7XG4gICAgICAgICAgICAgICAgICAgICAgICBjdXJyZW50SGVpZ2h0UHggKz0gbGluZUhlaWdodFB4O1xuICAgICAgICAgICAgICAgICAgICAgICAgdmFyIHNob3VsZEhhbmRsZUVsbGlwc2lzID0gdGhpcy5fc2hvdWxkSGFuZGxlRWxsaXBzaXMoY3VycmVudEhlaWdodFB4KTtcbiAgICAgICAgICAgICAgICAgICAgICAgIGlmIChzaG91bGRIYW5kbGVFbGxpcHNpcykge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMuX3RyeVRvQWRkRWxsaXBzaXNUb0xhc3RMaW5lKCk7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgICAgICBsaW5lID0gbGluZS5zbGljZShsb3cpO1xuICAgICAgICAgICAgICAgICAgICAgICAgbGluZSA9IGxpbmUudHJpbUxlZnQoKTtcbiAgICAgICAgICAgICAgICAgICAgICAgIGlmIChsaW5lLmxlbmd0aCA+IDApIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBsaW5lV2lkdGggPSB0aGlzLl9nZXRUZXh0V2lkdGgobGluZSk7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgaWYgKGxpbmVXaWR0aCA8PSBtYXhXaWR0aCkge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB0aGlzLl9hZGRUZXh0TGluZShsaW5lKTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgY3VycmVudEhlaWdodFB4ICs9IGxpbmVIZWlnaHRQeDtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgdGV4dFdpZHRoID0gTWF0aC5tYXgodGV4dFdpZHRoLCBsaW5lV2lkdGgpO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgZWxzZSB7XG4gICAgICAgICAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGVsc2Uge1xuICAgICAgICAgICAgICAgIHRoaXMuX2FkZFRleHRMaW5lKGxpbmUpO1xuICAgICAgICAgICAgICAgIGN1cnJlbnRIZWlnaHRQeCArPSBsaW5lSGVpZ2h0UHg7XG4gICAgICAgICAgICAgICAgdGV4dFdpZHRoID0gTWF0aC5tYXgodGV4dFdpZHRoLCBsaW5lV2lkdGgpO1xuICAgICAgICAgICAgICAgIGlmICh0aGlzLl9zaG91bGRIYW5kbGVFbGxpcHNpcyhjdXJyZW50SGVpZ2h0UHgpICYmIGkgPCBtYXggLSAxKSB7XG4gICAgICAgICAgICAgICAgICAgIHRoaXMuX3RyeVRvQWRkRWxsaXBzaXNUb0xhc3RMaW5lKCk7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfVxuICAgICAgICAgICAgaWYgKGZpeGVkSGVpZ2h0ICYmIGN1cnJlbnRIZWlnaHRQeCArIGxpbmVIZWlnaHRQeCA+IG1heEhlaWdodFB4KSB7XG4gICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBpZiAodGhpcy50ZXh0QXJyW3RoaXMudGV4dEFyci5sZW5ndGggLSAxXSkge1xuICAgICAgICAgICAgICAgIHRoaXMudGV4dEFyclt0aGlzLnRleHRBcnIubGVuZ3RoIC0gMV0ubGFzdEluUGFyYWdyYXBoID0gdHJ1ZTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgICB0aGlzLnRleHRIZWlnaHQgPSBmb250U2l6ZTtcbiAgICAgICAgdGhpcy50ZXh0V2lkdGggPSB0ZXh0V2lkdGg7XG4gICAgfVxuICAgIF9zaG91bGRIYW5kbGVFbGxpcHNpcyhjdXJyZW50SGVpZ2h0UHgpIHtcbiAgICAgICAgdmFyIGZvbnRTaXplID0gK3RoaXMuZm9udFNpemUoKSwgbGluZUhlaWdodFB4ID0gdGhpcy5saW5lSGVpZ2h0KCkgKiBmb250U2l6ZSwgaGVpZ2h0ID0gdGhpcy5hdHRycy5oZWlnaHQsIGZpeGVkSGVpZ2h0ID0gaGVpZ2h0ICE9PSBBVVRPICYmIGhlaWdodCAhPT0gdW5kZWZpbmVkLCBwYWRkaW5nID0gdGhpcy5wYWRkaW5nKCksIG1heEhlaWdodFB4ID0gaGVpZ2h0IC0gcGFkZGluZyAqIDIsIHdyYXAgPSB0aGlzLndyYXAoKSwgc2hvdWxkV3JhcCA9IHdyYXAgIT09IE5PTkU7XG4gICAgICAgIHJldHVybiAoIXNob3VsZFdyYXAgfHxcbiAgICAgICAgICAgIChmaXhlZEhlaWdodCAmJiBjdXJyZW50SGVpZ2h0UHggKyBsaW5lSGVpZ2h0UHggPiBtYXhIZWlnaHRQeCkpO1xuICAgIH1cbiAgICBfdHJ5VG9BZGRFbGxpcHNpc1RvTGFzdExpbmUoKSB7XG4gICAgICAgIHZhciB3aWR0aCA9IHRoaXMuYXR0cnMud2lkdGgsIGZpeGVkV2lkdGggPSB3aWR0aCAhPT0gQVVUTyAmJiB3aWR0aCAhPT0gdW5kZWZpbmVkLCBwYWRkaW5nID0gdGhpcy5wYWRkaW5nKCksIG1heFdpZHRoID0gd2lkdGggLSBwYWRkaW5nICogMiwgc2hvdWxkQWRkRWxsaXBzaXMgPSB0aGlzLmVsbGlwc2lzKCk7XG4gICAgICAgIHZhciBsYXN0TGluZSA9IHRoaXMudGV4dEFyclt0aGlzLnRleHRBcnIubGVuZ3RoIC0gMV07XG4gICAgICAgIGlmICghbGFzdExpbmUgfHwgIXNob3VsZEFkZEVsbGlwc2lzKSB7XG4gICAgICAgICAgICByZXR1cm47XG4gICAgICAgIH1cbiAgICAgICAgaWYgKGZpeGVkV2lkdGgpIHtcbiAgICAgICAgICAgIHZhciBoYXZlU3BhY2UgPSB0aGlzLl9nZXRUZXh0V2lkdGgobGFzdExpbmUudGV4dCArIEVMTElQU0lTKSA8IG1heFdpZHRoO1xuICAgICAgICAgICAgaWYgKCFoYXZlU3BhY2UpIHtcbiAgICAgICAgICAgICAgICBsYXN0TGluZS50ZXh0ID0gbGFzdExpbmUudGV4dC5zbGljZSgwLCBsYXN0TGluZS50ZXh0Lmxlbmd0aCAtIDMpO1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICAgIHRoaXMudGV4dEFyci5zcGxpY2UodGhpcy50ZXh0QXJyLmxlbmd0aCAtIDEsIDEpO1xuICAgICAgICB0aGlzLl9hZGRUZXh0TGluZShsYXN0TGluZS50ZXh0ICsgRUxMSVBTSVMpO1xuICAgIH1cbiAgICBnZXRTdHJva2VTY2FsZUVuYWJsZWQoKSB7XG4gICAgICAgIHJldHVybiB0cnVlO1xuICAgIH1cbn1cblRleHQucHJvdG90eXBlLl9maWxsRnVuYyA9IF9maWxsRnVuYztcblRleHQucHJvdG90eXBlLl9zdHJva2VGdW5jID0gX3N0cm9rZUZ1bmM7XG5UZXh0LnByb3RvdHlwZS5jbGFzc05hbWUgPSBURVhUX1VQUEVSO1xuVGV4dC5wcm90b3R5cGUuX2F0dHJzQWZmZWN0aW5nU2l6ZSA9IFtcbiAgICAndGV4dCcsXG4gICAgJ2ZvbnRTaXplJyxcbiAgICAncGFkZGluZycsXG4gICAgJ3dyYXAnLFxuICAgICdsaW5lSGVpZ2h0JyxcbiAgICAnbGV0dGVyU3BhY2luZycsXG5dO1xuX3JlZ2lzdGVyTm9kZShUZXh0KTtcbkZhY3Rvcnkub3ZlcldyaXRlU2V0dGVyKFRleHQsICd3aWR0aCcsIGdldE51bWJlck9yQXV0b1ZhbGlkYXRvcigpKTtcbkZhY3Rvcnkub3ZlcldyaXRlU2V0dGVyKFRleHQsICdoZWlnaHQnLCBnZXROdW1iZXJPckF1dG9WYWxpZGF0b3IoKSk7XG5GYWN0b3J5LmFkZEdldHRlclNldHRlcihUZXh0LCAnZm9udEZhbWlseScsICdBcmlhbCcpO1xuRmFjdG9yeS5hZGRHZXR0ZXJTZXR0ZXIoVGV4dCwgJ2ZvbnRTaXplJywgMTIsIGdldE51bWJlclZhbGlkYXRvcigpKTtcbkZhY3RvcnkuYWRkR2V0dGVyU2V0dGVyKFRleHQsICdmb250U3R5bGUnLCBOT1JNQUwpO1xuRmFjdG9yeS5hZGRHZXR0ZXJTZXR0ZXIoVGV4dCwgJ2ZvbnRWYXJpYW50JywgTk9STUFMKTtcbkZhY3RvcnkuYWRkR2V0dGVyU2V0dGVyKFRleHQsICdwYWRkaW5nJywgMCwgZ2V0TnVtYmVyVmFsaWRhdG9yKCkpO1xuRmFjdG9yeS5hZGRHZXR0ZXJTZXR0ZXIoVGV4dCwgJ2FsaWduJywgTEVGVCk7XG5GYWN0b3J5LmFkZEdldHRlclNldHRlcihUZXh0LCAndmVydGljYWxBbGlnbicsIFRPUCk7XG5GYWN0b3J5LmFkZEdldHRlclNldHRlcihUZXh0LCAnbGluZUhlaWdodCcsIDEsIGdldE51bWJlclZhbGlkYXRvcigpKTtcbkZhY3RvcnkuYWRkR2V0dGVyU2V0dGVyKFRleHQsICd3cmFwJywgV09SRCk7XG5GYWN0b3J5LmFkZEdldHRlclNldHRlcihUZXh0LCAnZWxsaXBzaXMnLCBmYWxzZSwgZ2V0Qm9vbGVhblZhbGlkYXRvcigpKTtcbkZhY3RvcnkuYWRkR2V0dGVyU2V0dGVyKFRleHQsICdsZXR0ZXJTcGFjaW5nJywgMCwgZ2V0TnVtYmVyVmFsaWRhdG9yKCkpO1xuRmFjdG9yeS5hZGRHZXR0ZXJTZXR0ZXIoVGV4dCwgJ3RleHQnLCAnJywgZ2V0U3RyaW5nVmFsaWRhdG9yKCkpO1xuRmFjdG9yeS5hZGRHZXR0ZXJTZXR0ZXIoVGV4dCwgJ3RleHREZWNvcmF0aW9uJywgJycpO1xuIiwiLy8gVGhlIG1vZHVsZSBjYWNoZVxudmFyIF9fd2VicGFja19tb2R1bGVfY2FjaGVfXyA9IHt9O1xuXG4vLyBUaGUgcmVxdWlyZSBmdW5jdGlvblxuZnVuY3Rpb24gX193ZWJwYWNrX3JlcXVpcmVfXyhtb2R1bGVJZCkge1xuXHQvLyBDaGVjayBpZiBtb2R1bGUgaXMgaW4gY2FjaGVcblx0dmFyIGNhY2hlZE1vZHVsZSA9IF9fd2VicGFja19tb2R1bGVfY2FjaGVfX1ttb2R1bGVJZF07XG5cdGlmIChjYWNoZWRNb2R1bGUgIT09IHVuZGVmaW5lZCkge1xuXHRcdHJldHVybiBjYWNoZWRNb2R1bGUuZXhwb3J0cztcblx0fVxuXHQvLyBDcmVhdGUgYSBuZXcgbW9kdWxlIChhbmQgcHV0IGl0IGludG8gdGhlIGNhY2hlKVxuXHR2YXIgbW9kdWxlID0gX193ZWJwYWNrX21vZHVsZV9jYWNoZV9fW21vZHVsZUlkXSA9IHtcblx0XHQvLyBubyBtb2R1bGUuaWQgbmVlZGVkXG5cdFx0Ly8gbm8gbW9kdWxlLmxvYWRlZCBuZWVkZWRcblx0XHRleHBvcnRzOiB7fVxuXHR9O1xuXG5cdC8vIEV4ZWN1dGUgdGhlIG1vZHVsZSBmdW5jdGlvblxuXHRfX3dlYnBhY2tfbW9kdWxlc19fW21vZHVsZUlkXShtb2R1bGUsIG1vZHVsZS5leHBvcnRzLCBfX3dlYnBhY2tfcmVxdWlyZV9fKTtcblxuXHQvLyBSZXR1cm4gdGhlIGV4cG9ydHMgb2YgdGhlIG1vZHVsZVxuXHRyZXR1cm4gbW9kdWxlLmV4cG9ydHM7XG59XG5cbiIsIi8vIGRlZmluZSBnZXR0ZXIgZnVuY3Rpb25zIGZvciBoYXJtb255IGV4cG9ydHNcbl9fd2VicGFja19yZXF1aXJlX18uZCA9IChleHBvcnRzLCBkZWZpbml0aW9uKSA9PiB7XG5cdGZvcih2YXIga2V5IGluIGRlZmluaXRpb24pIHtcblx0XHRpZihfX3dlYnBhY2tfcmVxdWlyZV9fLm8oZGVmaW5pdGlvbiwga2V5KSAmJiAhX193ZWJwYWNrX3JlcXVpcmVfXy5vKGV4cG9ydHMsIGtleSkpIHtcblx0XHRcdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBrZXksIHsgZW51bWVyYWJsZTogdHJ1ZSwgZ2V0OiBkZWZpbml0aW9uW2tleV0gfSk7XG5cdFx0fVxuXHR9XG59OyIsIl9fd2VicGFja19yZXF1aXJlX18ubyA9IChvYmosIHByb3ApID0+IChPYmplY3QucHJvdG90eXBlLmhhc093blByb3BlcnR5LmNhbGwob2JqLCBwcm9wKSkiLCIvLyBkZWZpbmUgX19lc01vZHVsZSBvbiBleHBvcnRzXG5fX3dlYnBhY2tfcmVxdWlyZV9fLnIgPSAoZXhwb3J0cykgPT4ge1xuXHRpZih0eXBlb2YgU3ltYm9sICE9PSAndW5kZWZpbmVkJyAmJiBTeW1ib2wudG9TdHJpbmdUYWcpIHtcblx0XHRPYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgU3ltYm9sLnRvU3RyaW5nVGFnLCB7IHZhbHVlOiAnTW9kdWxlJyB9KTtcblx0fVxuXHRPYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgJ19fZXNNb2R1bGUnLCB7IHZhbHVlOiB0cnVlIH0pO1xufTsiLCJpbXBvcnQgJy4uLy4uL2V4YW1wbGVzL21haW4uY3NzJztcblxuY29uc3QgY2ZnRmlsZSA9IFwiZXh0cmVzX2NmZy5qc29uXCI7XG5jb25zdCBlcnJNc2cgPSBgRXh0UmVzOiBFcnJvciByZWFkaW5nICcke2NmZ0ZpbGV9JyFgO1xuXG5mdW5jdGlvbiBsb2FkSlNPTiAoKSB7XG5cdGNvbnN0IHhociA9IG5ldyBYTUxIdHRwUmVxdWVzdCgpO1xuXHR4aHIub3BlbiggXCJHRVRcIiwgY2ZnRmlsZSwgdHJ1ZSApO1xuXHR4aHIub25sb2FkID0gKCkgPT4ge1xuXHRcdGlmICggeGhyLnJlYWR5U3RhdGUgPT09IDQgKSB7XG5cdFx0XHRpZiAoIHhoci5zdGF0dXMgPT09IDIwMCApIHtcblx0XHRcdFx0aW5pdEpTT04oIHhoci5yZXNwb25zZVRleHQgKTtcblx0XHRcdH0gZWxzZSB7XG5cdFx0XHRcdGNvbnNvbGUuZXJyb3IoIGVyck1zZyApO1xuXHRcdFx0fVxuXHRcdH1cblx0fTtcblx0eGhyLm9uZXJyb3IgPSAoKSA9PiBjb25zb2xlLmVycm9yKCBlcnJNc2cgKTtcblx0eGhyLnNlbmQobnVsbCk7XG59XG5cblxuaW1wb3J0IHsgYmFzZUluaXRzIH0gZnJvbSAnLi4vLi4vbGlicy9iYXNlSW5pdHMnO1xuaW1wb3J0IHsgY2xlYXJDZmdKc29uLCBhZGRTdGF0dXNWYXJEZWYgfSBmcm9tICcuLi9jb21tb24nO1xuXG4vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vXG4vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vXG4vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vL1xuLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy9cbi8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vL1xuLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vL1xuLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy9cbi8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vXG4vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vL1xuaW1wb3J0IHsgZnJlZVBhaW50RnJvbVNjaGVtYSB9IGZyb20gJy4vZnJlZVBhaW50Jztcbi8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy9cbi8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vL1xuLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vXG4vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vXG4vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy9cbi8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy9cbi8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vXG4vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vL1xuLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vL1xuLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vXG4vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vXG4vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy9cbi8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vXG4vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vL1xuLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy9cbi8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vXG4vLy8vLy8vLy8vXG5cbmZ1bmN0aW9uIGluaXRKU09OICgganNvbiApIHtcblxuXHRpZiAoIHR5cGVvZiBqc29uID09PSAnc3RyaW5nJyApIHtcblx0XHR0cnkge1xuXHRcdFx0anNvbiA9IEpTT04ucGFyc2UoIGpzb24sIHRydWUgKTtcblx0XHR9IGNhdGNoIChlKSB7XG5cdFx0XHRjb25zb2xlLmVycm9yKCBgRm9ybWF0LUVycm9yIGluIEpTT04gZmlsZSAnJHtjZmdGaWxlfSdgICk7XG5cdFx0XHRyZXR1cm47XG5cdFx0fVxuXHR9XG5cblx0Y29uc3QgY2ZnID0gY2xlYXJDZmdKc29uKCBqc29uICk7XG4vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vL1xuLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vXG4vLy8vLy8vLy9cblx0Y29uc3QgYmFzZSA9IG5ldyBiYXNlSW5pdHMoIHsgY29udGFpbmVyOiAnY29udGFpbmVyJyB9ICk7XG4vLy8vLy8vLy8vXG5cdGlmICggY2ZnLmRhdGFTZXR0aW5ncyApIHtcblx0XHRiYXNlLmRhdGFTZXR0aW5ncyA9IGNmZy5kYXRhU2V0dGluZ3M7XG5cdH1cblxuLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vL1xuLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy9cbi8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vXG4vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vXG4vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy9cbi8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vXG4vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vL1xuLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vL1xuLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy9cblx0Y29uc3QgaW8gPSBuZXcgZnJlZVBhaW50RnJvbVNjaGVtYSggYmFzZSwgY2ZnICk7XG4vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vXG4vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy9cbi8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vL1xuLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy9cbi8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vL1xuLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy9cbi8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vXG4vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vXG4vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vXG4vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy9cbi8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy9cbi8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vL1xuLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy9cbi8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vL1xuLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy9cbi8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vL1xuLy8vLy8vLy8vL1xuXG5cdGFkZFN0YXR1c1ZhckRlZiggaW8sIGpzb24gKTtcblxuXHR3aW5kb3cuZ2V0U3RhdGUgPSBpby5nZXRTdGF0ZS5iaW5kKGlvKTtcblx0d2luZG93LnNldFN0YXRlID0gaW8uc2V0U3RhdGUuYmluZChpbyk7XG59XG5cbmRvY3VtZW50LmFkZEV2ZW50TGlzdGVuZXIoIFwiRE9NQ29udGVudExvYWRlZFwiLCBsb2FkSlNPTiApO1xuIl0sIm5hbWVzIjpbXSwic291cmNlUm9vdCI6IiJ9