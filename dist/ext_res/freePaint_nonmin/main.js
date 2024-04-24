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
		window.getRectPngImage = this.getRectPngImage.bind(this);
//////////
	}

	getRectPngImage () {
		const url = this.stage.toDataURL({
			mimeType: "image/png",
			x: Math.max( 0, this.x - Math.ceil( this.frameWidth/2 ) ),
			y: Math.max( 0, this.y - Math.ceil( this.frameWidth/2 ) ),
			width: this.width + 2*Math.ceil( this.frameWidth/2 ),
			height: this.height + 2*Math.ceil( this.frameWidth/2 ),
		});
		return url;
// console.log(url);
	}

	startListeningToGetImageRequests () {

		// listener for providing image as BASE64 URL
		window.addEventListener(
			"message",
			(event) => {

				try {
					const { callId } = JSON.parse(event.data);
					if ( callId !== undefined && callId.includes("getImage") ) {
						const image = this.getRectPngImage();
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
				const subobj = k.match( /^(.*?)___(.*)/ );
				if ( subobj ) {
					// { abc___def: 123 } => { abc: { def: 123 } }
					const newObj = clearCfgJson( { [ subobj[2] ]: v } );
					if ( !( subobj[1] in res ) ) {
						res[ subobj[1] ] = {};
					}
					Object.assign( res[ subobj[1] ], newObj );
				} else {
					// copy value
					res[ k ] = clearCfgJson(v);
				}
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
			}
			this.freePaintMarkerLayer.moveToTop();

			const bclip = ( this.freePaintMarkerClipFunc ? { clipFunc: this.freePaintMarkerClipFunc.bind(this) } : {} );
			this.kFreePaintMarkerGroup = new konva_lib_Core__WEBPACK_IMPORTED_MODULE_0__["default"].Group( bclip );
			this.freePaintMarkerLayer.add( this.kFreePaintMarkerGroup );

			this.kFreePaintMarkerLine = null;
		}

		if ( !this.freePaintLayer ) {
			this.freePaintLayer = new konva_lib_Core__WEBPACK_IMPORTED_MODULE_0__["default"].Layer();
			this.stage.add( this.freePaintLayer );
		}
		this.freePaintLayer.moveToTop();

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

			const rectOpts = {
				x: this.x, y: this.y,
				width: this.width, height: this.height,
				stroke: this.frameColor,
				strokeWidth: this.frameWidth,
				fill: this.fill,
			}
			this.kRect = new konva_lib_Core__WEBPACK_IMPORTED_MODULE_0__["default"].Rect( rectOpts );
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

module.exports = "data:image/png;base64,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L3htcDpDcmVhdG9yVG9vbD4KICAgICAgICAgPHhtcDpDcmVhdGVEYXRlPjIwMjEtMDQtMTBUMTA6MDY6MjZaPC94bXA6Q3JlYXRlRGF0ZT4KICAgICAgICAgPHhtcDpNb2RpZnlEYXRlPjIwMjEtMDQtMTBUMTg6NTc6MzJaPC94bXA6TW9kaWZ5RGF0ZT4KICAgICAgPC9yZGY6RGVzY3JpcHRpb24+CiAgICAgIDxyZGY6RGVzY3JpcHRpb24gcmRmOmFib3V0PSIiCiAgICAgICAgICAgIHhtbG5zOmRjPSJodHRwOi8vcHVybC5vcmcvZGMvZWxlbWVudHMvMS4xLyI+CiAgICAgICAgIDxkYzpmb3JtYXQ+aW1hZ2UvcG5nPC9kYzpmb3JtYXQ+CiAgICAgIDwvcmRmOkRlc2NyaXB0aW9uPgogICA8L3JkZjpSREY+CjwveDp4bXBtZXRhPgogICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgCiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAKICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIAogICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgCiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAKICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIAogICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgCiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAKICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIAogICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgCiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAKICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIAogICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgCiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAKICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIAogICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgCiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAKICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIAogICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgCiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAKICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIAogICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgCiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAKICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIAogICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgCiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAKICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIAogICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgCiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAKICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIAogICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgCiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAKICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIAogICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgCiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAKICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIAogICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgCiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAKICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIAogICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgCiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAKICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIAogICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgCiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAKICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIAogICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgCiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAKICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIAogICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgCiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAKICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIAogICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgCiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAKICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIAogICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgCiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAKICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIAogICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgCiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAKICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIAogICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgCiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAKICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIAogICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgCiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAKICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIAogICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgCiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAKICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIAogICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgCiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAKICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIAogICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgCiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAKICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIAogICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgCiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAKICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIAogICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgCiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAKICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIAogICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgCiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAKICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIAogICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgCiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAKICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIAogICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgCiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAKICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIAogICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgCiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAKICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIAogICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgCiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAKICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIAogICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgCiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAKICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIAogICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgCiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAKICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIAogICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgCiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAKICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIAogICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgCiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAKICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIAogICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgCiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAKICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIAogICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgCiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAKICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIAogICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgCiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAKICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIAogICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgCiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAKICAgICAgICAgICAgICAgICAgICAgICAgICAgIAo8P3hwYWNrZXQgZW5kPSJ3Ij8+Pzr/IQAABDNJREFUWIXF1ktMG0cYB/BxT7bY2fHOeg3G2F4e2UJI7TaOsV3HWCAQ2MYyiFepEY8DUqVKXMqxFw5IkaUq4sAFiR4QqhpCmoSUtFVFUEsjAi1SeqwqxK2lMhXvlMhmvx6yrggBQyjrjDTS7s4cfvP/vtWupq6ubg0APllfX/9ieXkZ0Bseb21ubt5dWlq6ubOzMzwwMHDJ6/Vq3qgIAFBubu43CCGglCZLS0s/GxoaMldUVGgAAGV7IgBA4XDYpdVqZYQQaDQaIISkJEm6MTExQd1ud1Zh/10UFxd/ixAChBAYDIanlNJto9GYlCRpYGVlRZd1UG9vr12r1cpms/knUMbo6Oh3sVhMNhqNm3a7/SNRFFVP66UbURSn8/LyfoMjY3h4eL6rqwtMJtPTaDQqZg3U3d1twRjLs7Oz94+iAACam5vlnJycjfr6+sKsgAAAFRUVfd7X1/f8KGZ8fPy+Xq/fy8/P/5UQ8ndNTU1RVkDxeFxgWVaenJycAYAVAIDV1dVlhmEgEon0AwCYzeZfWJbdrK2tLVYdpKR0g+d5AAAYGxu7gzEGh8Nx83BiBQUFSyzLbgUCgQtFHftwbm6OCIKwQQjZ5Thuz+FwfHy0hArqZ0LIVnV1dYmqIABAwWDwOsZYNplMDzHGmuNACmqRZdntqqqqC0FlXAwGg5V6vV4WBOHLVCrVehLKYrE8YVl22+/3X1IVBAAoFAqlUbfOgNoJBAKSqiAlKT/HcbLBYDgNtYAx3vX7/edGnXljKBS6znGcLAjCZCaU1WpdYFl2t7Ky8m1VQUdQt09BPcYY73m93tdGvfYJwuGwTynfVDKZbDkJZbPZHmOM93w+X5mqIABADQ0N7yuoO6eg5jHGzzwez5lR534bIpGIV0F9dZGoc4MAAEWjUS+lVOZ5/m4mlCiK8wzDPPN4PJdVBSlJeSilssFgyIiy2Ww/Yoz3XS5XRtT/BgEAampqcitJ3Usmk80ZkvqBYZh9t9tdrioIAFBjY2MaNZ0JVVhYOMcwzHOn03lFVRC86KkKSqlMKZ1OJpNNp6FcLtc7qoIAALW0tLgopTLHcQ9OQT1iGOYft9v9EurCQfCip64pqK8zoURRfKTT6bYOo1QBAQBqbW29ppRv5iSUxWJZIITILMvuO53Oy+Xl5RrVQACA2traripJvYIqKSm5RQiB/v5+h81me4Ax/kOSpC5VQQCA2tvbr/I8L3Mc9zD9QZYk6TbDMJBIJBbTwI6ODtlqtf6lOugQKmU2m+csFssipTSVSCSepDEjIyPfE0I2enp6SrMCAgDU2dn5HiFE1ul0MDg4WJLGTE1NjRNCwOVyfQBqNvVxMxaLvSsIwgbG+N7BwcGf8Xh8hmVZKCsr+zS9J6sgpXxXeJ5fYxhmz2AwrPl8vg8Pr2cdBAAoGo3G7Hb77/F4/JU/yn8BGdFegEe55FIAAAAASUVORK5CYII=";

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

////////////////////////////////
//////////////////////////////////////////////////
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
////////////////////////////////
/////////////////////////////////////////////////
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,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QUFDQTtBQUNBLElBQUk7QUFDSiwyQ0FBMkM7QUFDM0MsSUFBSTtBQUNKO0FBQ0E7QUFDQSxFQUFFO0FBQ0Y7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDTztBQUNQO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLElBQUk7QUFDSjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNPO0FBQ1A7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ087QUFDUDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDTztBQUNQO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDTztBQUNQO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNPO0FBQ1A7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsbUNBQW1DO0FBQ25DO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNPO0FBQ1A7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ087QUFDUDtBQUNBO0FBQ0E7QUFDQSxhQUFhO0FBQ2IsY0FBYztBQUNkO0FBQ0E7QUFDQTtBQUNBLGFBQWE7QUFDYixhQUFhO0FBQ2I7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLEdBQUc7QUFDSDtBQUNB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O0FBQ1Q7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxTQUFTO0FBQ1Q7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsU0FBUztBQUNUO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLDRCQUE0QixzQkFBc0I7QUFDbEQ7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxTQUFTO0FBQ1Q7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxTQUFTO0FBQ1Q7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0Esa0JBQWtCLGtFQUE0QjtBQUM5QztBQUNBO0FBQ0E7QUFDQSxTQUFTO0FBQ1Q7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxtQkFBbUIsK0RBQXlCO0FBQzVDO0FBQ0E7QUFDQSxTQUFTO0FBQ1Q7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLFNBQVM7QUFDVDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLFNBQVM7QUFDVDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsU0FBUztBQUNUO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxTQUFTO0FBQ1Q7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxhQUFhO0FBQ2I7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsU0FBUztBQUNUO0FBQ0E7QUFDQSx3QkFBd0IsbUJBQW1CO0FBQzNDO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsMEVBQWlDO0FBQ2pDO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxnRUFBdUIsZ0NBQWdDLGtFQUFrQjtBQUN6RSxnRUFBdUIsZ0NBQWdDLGtFQUFrQjtBQUN6RSxnRUFBdUIsb0NBQW9DLGtFQUFrQjtBQUM3RSxnRUFBdUIscUNBQXFDLGtFQUFrQjtBQUM5RSxnRUFBdUI7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7QUM3VFU7QUFDRztBQUNwQztBQUNBLDhDQUE4QywwQ0FBSTtBQUNsRCxnQkFBZ0IsU0FBUztBQUN6QjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsMkhBQTJIO0FBQzNIO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ087QUFDUDtBQUNBO0FBQ0EsWUFBWSx5REFBaUI7QUFDN0I7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0Esb0JBQW9CLFNBQVM7QUFDN0I7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0Esd0JBQXdCLG1EQUFhO0FBQ3JDO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxpQkFBaUI7QUFDakI7QUFDQTtBQUNBO0FBQ0Esb0JBQW9CLFNBQVM7QUFDN0I7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLGFBQWE7QUFDYjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxTQUFTO0FBQ1Q7QUFDQTtBQUNBLFNBQVM7QUFDVCxLQUFLO0FBQ0wsQ0FBQztBQUNNO0FBQ1A7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSw0QkFBNEIsdUJBQXVCO0FBQ25EO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsU0FBUztBQUNUO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNPO0FBQ1A7QUFDQTtBQUNBO0FBQ0E7QUFDQSxTQUFTO0FBQ1Q7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7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QUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxTQUFTO0FBQ1Q7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsaUdBQWlHLCtDQUFTO0FBQzFHO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsMkJBQTJCLG9CQUFvQjtBQUMvQztBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsMkJBQTJCLFlBQVk7QUFDdkM7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxvQkFBb0IsU0FBUztBQUM3QjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxZQUFZLCtDQUFTO0FBQ3JCO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsWUFBWSwrQ0FBUztBQUNyQjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FB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LFNBQVM7QUFDVDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLFFBQVEsaUVBQTJCO0FBQ25DO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLFFBQVEsK0NBQVM7QUFDakI7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsNkJBQTZCO0FBQzdCO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLFlBQVksK0NBQVM7QUFDckI7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNB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QTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDTztBQUNQO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSw2QkFBNkIsbURBQWM7QUFDM0M7QUFDQSxZQUFZLGdEQUFVO0FBQ3RCO0FBQ0Esd0JBQXdCLG9EQUFTO0FBQ2pDO0FBQ0EsU0FBUztBQUNUO0FBQ0E7QUFDQSxTQUFTO0FBQ1Q7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsWUFBWSxtREFBYTtBQUN6QjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsNEJBQTRCLGdFQUEwQjtBQUN0RDtBQUNBO0FBQ0E7QUFDQSwwQkFBMEIsZ0VBQTBCO0FBQ3BEO0FBQ0E7QUFDQTtBQUNBLDRCQUE0QixTQUFTO0FBQ3JDO0FBQ0E7QUFDQTtBQUNBO0FBQ0Esd0NBQXdDLHNEQUFnQjtBQUN4RCxrQ0FBa0Msc0RBQWdCO0FBQ2xEO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLHlCQUF5QjtBQUN6QjtBQUNBO0FBQ0E7QUFDQTtBQUNBLDRCQUE0QixTQUFTO0FBQ3JDO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxvQkFBb0Isc0RBQWdCO0FBQ3BDLHNCQUFzQixzREFBZ0I7QUFDdEM7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLGdCQUFnQixtREFBYTtBQUM3QjtBQUNBO0FBQ0E7QUFDQSxnQ0FBZ0MsU0FBUztBQUN6QztBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsZ0NBQWdDLFNBQVM7QUFDekM7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsdURBQWlCO0FBQ2pCO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDTztBQUNQO0FBQ0E7QUFDQTtBQUNBLEtBQUs7QUFDTDtBQUNBO0FBQ0E7QUFDQSxLQUFLO0FBQ0w7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsS0FBSztBQUNMO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLEtBQUs7QUFDTDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxLQUFLO0FBQ0w7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxLQUFLO0FBQ0w7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxLQUFLO0FBQ0w7QUFDQTtBQUNBLEtBQUs7QUFDTDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLEtBQUs7QUFDTDtBQUNBO0FBQ0EsS0FBSztBQUNMO0FBQ0E7QUFDQSxLQUFLO0FBQ0w7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLEtBQUs7QUFDTDtBQUNBO0FBQ0EsS0FBSztBQUNMO0FBQ0E7QUFDQSxLQUFLO0FBQ0w7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLEtBQUs7QUFDTDtBQUNBO0FBQ0EsS0FBSztBQUNMOzs7Ozs7Ozs7Ozs7Ozs7OztBQ25nQm9DO0FBQzdCO0FBQ1A7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLENBQUMsd0JBQXdCLElBQUksTUFBTSxJQUFJLE1BQU0sSUFBSTtBQUNqRDtBQUNBO0FBQ0E7QUFDQTtBQUNPO0FBQ1A7QUFDQTtBQUNBLEtBQUs7QUFDTDtBQUNBO0FBQ0EsS0FBSztBQUNMO0FBQ0E7QUFDQSxLQUFLO0FBQ0w7QUFDQTtBQUNBLEtBQUs7QUFDTDtBQUNBO0FBQ0E7QUFDQTtBQUNBLEtBQUs7QUFDTDtBQUNBO0FBQ0EsS0FBSztBQUNMO0FBQ0E7QUFDQSxLQUFLO0FBQ0w7QUFDQTtBQUNBLEtBQUs7QUFDTDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsS0FBSztBQUNMO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsS0FBSztBQUNMO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxpQkFBaUI7QUFDakIsYUFBYTtBQUNiO0FBQ0EsS0FBSztBQUNMO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsS0FBSztBQUNMO0FBQ0E7QUFDQSxLQUFLO0FBQ0w7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxLQUFLO0FBQ0w7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsS0FBSztBQUNMO0FBQ0E7QUFDQSxLQUFLO0FBQ0w7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLEtBQUs7QUFDTDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxLQUFLO0FBQ0w7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxLQUFLO0FBQ0w7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxLQUFLO0FBQ0w7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLEtBQUs7QUFDTDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsS0FBSztBQUNMO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxhQUFhO0FBQ2I7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxLQUFLO0FBQ0w7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsS0FBSztBQUNMO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLEtBQUs7QUFDTDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxLQUFLO0FBQ0w7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsS0FBSztBQUNMO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSw0QkFBNEIsT0FBTztBQUNuQztBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLEtBQUs7QUFDTDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsS0FBSztBQUNMO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxLQUFLO0FBQ0w7QUFDQTtBQUNBLEtBQUs7QUFDTDtBQUNBO0FBQ0EsS0FBSztBQUNMO0FBQ0E7QUFDQSxLQUFLO0FBQ0w7QUFDQTtBQUNBO0FBQ0EsS0FBSztBQUNMO0FBQ0E7QUFDQTtBQUNBLEtBQUs7QUFDTDtBQUNBLGVBQWUsc0RBQWM7QUFDN0IsS0FBSztBQUNMO0FBQ0E7QUFDQSxLQUFLO0FBQ0w7QUFDQTtBQUNBLEtBQUs7QUFDTDtBQUNBO0FBQ0EsS0FBSztBQUNMO0FBQ0EsYUFBYSwwREFBa0I7QUFDL0I7QUFDQTtBQUNBO0FBQ0EsS0FBSztBQUNMO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsS0FBSztBQUNMO0FBQ0E7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O0FBQ0Esa0JBQWtCLG9EQUFjO0FBQ2hDO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsUUFBUSwrQ0FBUztBQUNqQjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxTQUFTO0FBQ1Q7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsNENBQTRDLFNBQVM7QUFDckQ7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EseURBQWE7QUFDYixnRUFBdUIsZ0JBQWdCLHdFQUF3QjtBQUMvRCxnRUFBdUIsaUJBQWlCLHdFQUF3QjtBQUNoRSxnRUFBdUI7QUFDdkIsZ0VBQXVCLHVCQUF1QixrRUFBa0I7QUFDaEUsZ0VBQXVCO0FBQ3ZCLGdFQUF1QjtBQUN2QixnRUFBdUIscUJBQXFCLGtFQUFrQjtBQUM5RCxnRUFBdUI7QUFDdkIsZ0VBQXVCO0FBQ3ZCLGdFQUF1Qix3QkFBd0Isa0VBQWtCO0FBQ2pFLGdFQUF1QjtBQUN2QixnRUFBdUIsMEJBQTBCLG1FQUFtQjtBQUNwRSxnRUFBdUIsMkJBQTJCLGtFQUFrQjtBQUNwRSxnRUFBdUIsbUJBQW1CLGtFQUFrQjtBQUM1RCxnRUFBdUI7Ozs7Ozs7VUM5V3ZCO1VBQ0E7O1VBRUE7VUFDQTtVQUNBO1VBQ0E7VUFDQTtVQUNBO1VBQ0E7VUFDQTtVQUNBO1VBQ0E7VUFDQTtVQUNBO1VBQ0E7O1VBRUE7VUFDQTs7VUFFQTtVQUNBO1VBQ0E7Ozs7O1dDdEJBO1dBQ0E7V0FDQTtXQUNBO1dBQ0EseUNBQXlDLHdDQUF3QztXQUNqRjtXQUNBO1dBQ0E7Ozs7O1dDUEE7Ozs7O1dDQUE7V0FDQTtXQUNBO1dBQ0EsdURBQXVELGlCQUFpQjtXQUN4RTtXQUNBLGdEQUFnRCxhQUFhO1dBQzdEOzs7Ozs7Ozs7Ozs7Ozs7QUNOaUM7O0FBRWpDO0FBQ0EseUNBQXlDLFFBQVE7O0FBRWpEO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsS0FBSztBQUNMO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOzs7QUFHaUQ7QUFDUzs7QUFFMUQ7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ2tEO0FBQ2xEO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBOztBQUVBO0FBQ0E7QUFDQTtBQUNBLElBQUk7QUFDSixnREFBZ0QsUUFBUTtBQUN4RDtBQUNBO0FBQ0E7O0FBRUEsYUFBYSxxREFBWTtBQUN6QjtBQUNBO0FBQ0E7QUFDQSxrQkFBa0Isc0RBQVMsSUFBSSx5QkFBeUI7QUFDeEQ7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsZ0JBQWdCLDJEQUFtQjtBQUNuQztBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQSxDQUFDLHdEQUFlOztBQUVoQjtBQUNBO0FBQ0E7O0FBRUEiLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8vLi9mcmVlUGFpbnQuanMiLCJ3ZWJwYWNrOi8vLy4uL2NvbW1vbi5qcyIsIndlYnBhY2s6Ly8vLi4vLi4vbGlicy9iYXNlSW5pdHMuanMiLCJ3ZWJwYWNrOi8vLy4uLy4uL2xpYnMvY2xhc3NfZXh0ZW5zaW9ucy5qcyIsIndlYnBhY2s6Ly8vLi4vLi4vbGlicy9jb21tb24uanMiLCJ3ZWJwYWNrOi8vLy4uLy4uL2xpYnMvZnNtLmpzIiwid2VicGFjazovLy8uLi8uLi9saWJzL2ljb25CYXIuanMiLCJ3ZWJwYWNrOi8vLy4uLy4uL2xpYnMvcmVjdEFyZWEuanMiLCJ3ZWJwYWNrOi8vLy4uLy4uL2xpYnMvdGV4dEZyYW1lLmpzIiwid2VicGFjazovLy8uLi8uLi9saWJzL3Rvb2x0aXAuanMiLCJ3ZWJwYWNrOi8vLy4uLy4uL2V4YW1wbGVzL21haW4uY3NzP2EzODQiLCJ3ZWJwYWNrOi8vLy4uLy4uL25vZGVfbW9kdWxlcy9rb252YS9saWIvQW5pbWF0aW9uLmpzIiwid2VicGFjazovLy8uLi8uLi9ub2RlX21vZHVsZXMva29udmEvbGliL0NhbnZhcy5qcyIsIndlYnBhY2s6Ly8vLi4vLi4vbm9kZV9tb2R1bGVzL2tvbnZhL2xpYi9Db250YWluZXIuanMiLCJ3ZWJwYWNrOi8vLy4uLy4uL25vZGVfbW9kdWxlcy9rb252YS9saWIvQ29udGV4dC5qcyIsIndlYnBhY2s6Ly8vLi4vLi4vbm9kZV9tb2R1bGVzL2tvbnZhL2xpYi9Db3JlLmpzIiwid2VicGFjazovLy8uLi8uLi9ub2RlX21vZHVsZXMva29udmEvbGliL0RyYWdBbmREcm9wLmpzIiwid2VicGFjazovLy8uLi8uLi9ub2RlX21vZHVsZXMva29udmEvbGliL0ZhY3RvcnkuanMiLCJ3ZWJwYWNrOi8vLy4uLy4uL25vZGVfbW9kdWxlcy9rb252YS9saWIvRmFzdExheWVyLmpzIiwid2VicGFjazovLy8uLi8uLi9ub2RlX21vZHVsZXMva29udmEvbGliL0dsb2JhbC5qcyIsIndlYnBhY2s6Ly8vLi4vLi4vbm9kZV9tb2R1bGVzL2tvbnZhL2xpYi9Hcm91cC5qcyIsIndlYnBhY2s6Ly8vLi4vLi4vbm9kZV9tb2R1bGVzL2tvbnZhL2xpYi9MYXllci5qcyIsIndlYnBhY2s6Ly8vLi4vLi4vbm9kZV9tb2R1bGVzL2tvbnZhL2xpYi9Ob2RlLmpzIiwid2VicGFjazovLy8uLi8uLi9ub2RlX21vZHVsZXMva29udmEvbGliL1BvaW50ZXJFdmVudHMuanMiLCJ3ZWJwYWNrOi8vLy4uLy4uL25vZGVfbW9kdWxlcy9rb252YS9saWIvU2hhcGUuanMiLCJ3ZWJwYWNrOi8vLy4uLy4uL25vZGVfbW9kdWxlcy9rb252YS9saWIvU3RhZ2UuanMiLCJ3ZWJwYWNrOi8vLy4uLy4uL25vZGVfbW9kdWxlcy9rb252YS9saWIvVHdlZW4uanMiLCJ3ZWJwYWNrOi8vLy4uLy4uL25vZGVfbW9kdWxlcy9rb252YS9saWIvVXRpbC5qcyIsIndlYnBhY2s6Ly8vLi4vLi4vbm9kZV9tb2R1bGVzL2tvbnZhL2xpYi9WYWxpZGF0b3JzLmpzIiwid2VicGFjazovLy8uLi8uLi9ub2RlX21vZHVsZXMva29udmEvbGliL19Db3JlSW50ZXJuYWxzLmpzIiwid2VicGFjazovLy8uLi8uLi9ub2RlX21vZHVsZXMva29udmEvbGliL3NoYXBlcy9JbWFnZS5qcyIsIndlYnBhY2s6Ly8vLi4vLi4vbm9kZV9tb2R1bGVzL2tvbnZhL2xpYi9zaGFwZXMvTGluZS5qcyIsIndlYnBhY2s6Ly8vLi4vLi4vbm9kZV9tb2R1bGVzL2tvbnZhL2xpYi9zaGFwZXMvUmVjdC5qcyIsIndlYnBhY2s6Ly8vLi4vLi4vbm9kZV9tb2R1bGVzL2tvbnZhL2xpYi9zaGFwZXMvVGV4dC5qcyIsIndlYnBhY2s6Ly8vd2VicGFjay9ib290c3RyYXAiLCJ3ZWJwYWNrOi8vL3dlYnBhY2svcnVudGltZS9kZWZpbmUgcHJvcGVydHkgZ2V0dGVycyIsIndlYnBhY2s6Ly8vd2VicGFjay9ydW50aW1lL2hhc093blByb3BlcnR5IHNob3J0aGFuZCIsIndlYnBhY2s6Ly8vd2VicGFjay9ydW50aW1lL21ha2UgbmFtZXNwYWNlIG9iamVjdCIsIndlYnBhY2s6Ly8vLi9tYWluLmpzIl0sInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IHJlY3RBcmVhX2ZyZWVQYWludE1hcmtlciB9IGZyb20gXCIuLi8uLi9saWJzL3JlY3RBcmVhXCI7XG5cbmltcG9ydCBLb252YSBmcm9tICdrb252YS9saWIvQ29yZSdcbmltcG9ydCB7IExpbmUgfSBmcm9tICdrb252YS9saWIvc2hhcGVzL0xpbmUnXG5cbmV4cG9ydCBjbGFzcyBmcmVlUGFpbnRGcm9tU2NoZW1hIGV4dGVuZHMgcmVjdEFyZWFfZnJlZVBhaW50TWFya2VyIHtcblxuXHRjb25zdHJ1Y3RvciAoIGJhc2UsIG9wdHMgPSB7fSApIHtcblxuXHRcdHN1cGVyKCBiYXNlLCBvcHRzICk7XG5cblx0XHQvLyBkcmF3IGV4dHJhIGxpbmVzXG5cdFx0b3B0cy5leHRyYUxpbmVzLmZvckVhY2goIGwgPT4ge1xuXHRcdFx0Y29uc3Qga0xpbmUgPSBuZXcgS29udmEuTGluZSh7XG5cdFx0XHRcdHBvaW50czogWyBsLngxLCBsLnkxLCBsLngyLCBsLnkyIF0sXG5cdFx0XHRcdHN0cm9rZTogbC5jLFxuXHRcdFx0XHRzdHJva2VXaWR0aDogbC53LFxuXHRcdFx0fSlcblx0XHRcdHRoaXMubGF5ZXIuYWRkKCBrTGluZSApO1xuXHRcdH0pXG5cdFx0dGhpcy5sYXllci5kcmF3KCk7XG5cblx0XHR0aGlzLnN0YXJ0TGlzdGVuaW5nVG9HZXRJbWFnZVJlcXVlc3RzKCk7XG4vLy8vLy8vLy8vLy8vLy8vL1xuXHRcdHdpbmRvdy5nZXRSZWN0UG5nSW1hZ2UgPSB0aGlzLmdldFJlY3RQbmdJbWFnZS5iaW5kKHRoaXMpO1xuLy8vLy8vLy8vL1xuXHR9XG5cblx0Z2V0UmVjdFBuZ0ltYWdlICgpIHtcblx0XHRjb25zdCB1cmwgPSB0aGlzLnN0YWdlLnRvRGF0YVVSTCh7XG5cdFx0XHRtaW1lVHlwZTogXCJpbWFnZS9wbmdcIixcblx0XHRcdHg6IE1hdGgubWF4KCAwLCB0aGlzLnggLSBNYXRoLmNlaWwoIHRoaXMuZnJhbWVXaWR0aC8yICkgKSxcblx0XHRcdHk6IE1hdGgubWF4KCAwLCB0aGlzLnkgLSBNYXRoLmNlaWwoIHRoaXMuZnJhbWVXaWR0aC8yICkgKSxcblx0XHRcdHdpZHRoOiB0aGlzLndpZHRoICsgMipNYXRoLmNlaWwoIHRoaXMuZnJhbWVXaWR0aC8yICksXG5cdFx0XHRoZWlnaHQ6IHRoaXMuaGVpZ2h0ICsgMipNYXRoLmNlaWwoIHRoaXMuZnJhbWVXaWR0aC8yICksXG5cdFx0fSk7XG5cdFx0cmV0dXJuIHVybDtcbi8vIGNvbnNvbGUubG9nKHVybCk7XG5cdH1cblxuXHRzdGFydExpc3RlbmluZ1RvR2V0SW1hZ2VSZXF1ZXN0cyAoKSB7XG5cblx0XHQvLyBsaXN0ZW5lciBmb3IgcHJvdmlkaW5nIGltYWdlIGFzIEJBU0U2NCBVUkxcblx0XHR3aW5kb3cuYWRkRXZlbnRMaXN0ZW5lcihcblx0XHRcdFwibWVzc2FnZVwiLFxuXHRcdFx0KGV2ZW50KSA9PiB7XG5cblx0XHRcdFx0dHJ5IHtcblx0XHRcdFx0XHRjb25zdCB7IGNhbGxJZCB9ID0gSlNPTi5wYXJzZShldmVudC5kYXRhKTtcblx0XHRcdFx0XHRpZiAoIGNhbGxJZCAhPT0gdW5kZWZpbmVkICYmIGNhbGxJZC5pbmNsdWRlcyhcImdldEltYWdlXCIpICkge1xuXHRcdFx0XHRcdFx0Y29uc3QgaW1hZ2UgPSB0aGlzLmdldFJlY3RQbmdJbWFnZSgpO1xuXHRcdFx0XHRcdFx0Y29uc3QgcGFzc19kYXRhID0ge1xuXHRcdFx0XHRcdFx0XHRpbWFnZSxcblx0XHRcdFx0XHRcdFx0Y2FsbElkXG5cdFx0XHRcdFx0XHR9O1xuXG5cdFx0XHRcdFx0XHR3aW5kb3cucGFyZW50LnBvc3RNZXNzYWdlKCBKU09OLnN0cmluZ2lmeSggcGFzc19kYXRhICksICcqJyApO1xuXHRcdFx0XHRcdH1cblx0XHRcdFx0fSBjYXRjaCAoZSkge31cblx0XHRcdH0sXG5cdFx0XHRmYWxzZSApO1xuXHR9XG5cbn1cbiIsImV4cG9ydCBmdW5jdGlvbiBjbGVhckNmZ0pzb24oIGpzb24gKSB7XHJcblxyXG5cdGlmICggdHlwZW9mIGpzb24gIT09ICdvYmplY3QnICkge1xyXG5cdFx0cmV0dXJuIGpzb247XHJcblx0fVxyXG5cdGlmICggQXJyYXkuaXNBcnJheShqc29uKSApIHtcclxuXHRcdHJldHVybiBqc29uLm1hcCggYSA9PiBjbGVhckNmZ0pzb24oYSkgKVxyXG5cdH1cclxuXHJcblx0Y29uc3QgcmVzID0ge307XHJcblxyXG5cdE9iamVjdC5lbnRyaWVzKCBqc29uICkuZm9yRWFjaCggKFtrLHZdKSA9PiB7XHJcblxyXG5cdFx0aWYgKCBrLnN1YnN0cmluZyggMCwgMyApID09PSAnX19fJyApIHtcclxuXHJcblx0XHRcdC8vIC8vIEtleXMgZGVyIEVsZW1lbnRlIGVpbmVzIEFycmF5cyBuZWhtZW5cclxuXHRcdFx0Ly8gY29uc3QgYXJlbGtleXMgPSBrLm1hdGNoKCAvXl9fX2FyZWxrZXlzXyguKikvICk7XHJcblx0XHRcdC8vIGlmICggYXJlbGtleXMgKSB7XHJcblx0XHRcdC8vIFx0anNvblsgYXJlbGtleXNbMV0gXSA9IHYubWFwKCBlID0+IE9iamVjdC5rZXlzKGUpICk7XHJcblx0XHRcdC8vIH0gZWxzZSB7XHJcblxyXG5cdFx0XHRcdC8vIFZhbHMgZGVyIEVsZW1lbnRlIGVpbmVzIEFycmF5cyBuZWhtZW5cclxuXHRcdFx0XHRjb25zdCBhcmVsdmFscyA9IGsubWF0Y2goIC9eX19fYXJlbHZhbHNfKC4qKS8gKTtcclxuXHRcdFx0XHRpZiAoIGFyZWx2YWxzICkge1xyXG5cdFx0XHRcdFx0cmVzWyBhcmVsdmFsc1sxXSBdID0gdi5tYXAoIGUgPT4gT2JqZWN0LnZhbHVlcyhlKS5tYXAoIGEgPT4gY2xlYXJDZmdKc29uKGEpICkgKTtcclxuXHRcdFx0XHR9IGVsc2Uge1xyXG5cclxuXHRcdFx0XHRcdC8vIEFsdGVybmF0aXZlIE5hbWVuIGVpbmZhY2ggc28gc3BlaWNoZXJuXHJcblx0XHRcdFx0XHRjb25zdCBhbHRzID0gay5tYXRjaCggL15fX19hbHRbXl9dKl8oLiopLyApO1xyXG5cdFx0XHRcdFx0aWYgKCBhbHRzICkge1xyXG5cdFx0XHRcdFx0XHRpZiAoIHYgIT09IHVuZGVmaW5lZCApIHtcclxuXHRcdFx0XHRcdFx0XHRyZXNbIGFsdHNbMV0gXSA9IGNsZWFyQ2ZnSnNvbiggdiApO1xyXG5cdFx0XHRcdFx0XHR9XHJcblx0XHRcdFx0XHR9IGVsc2Uge1xyXG5cclxuXHRcdFx0XHRcdFx0Ly8gX19fIE9iamVjdCBpbiBqc29uIGludGVncmllcmVuXHJcblx0XHRcdFx0XHRcdGlmICggdHlwZW9mIHYgPT09ICdvYmplY3QnICkge1xyXG5cdFx0XHRcdFx0XHRcdE9iamVjdC5hc3NpZ24oIHJlcywgY2xlYXJDZmdKc29uKHYpICk7XHJcblx0XHRcdFx0XHRcdH1cclxuXHJcblx0XHRcdFx0XHR9XHJcblx0XHRcdFx0fVxyXG5cdFx0XHQvLyB9XHJcblxyXG5cdFx0fSBlbHNlIHtcclxuXHJcblx0XHRcdGlmICggdiAhPT0gdW5kZWZpbmVkICkge1xyXG5cdFx0XHRcdGNvbnN0IHN1Ym9iaiA9IGsubWF0Y2goIC9eKC4qPylfX18oLiopLyApO1xyXG5cdFx0XHRcdGlmICggc3Vib2JqICkge1xyXG5cdFx0XHRcdFx0Ly8geyBhYmNfX19kZWY6IDEyMyB9ID0+IHsgYWJjOiB7IGRlZjogMTIzIH0gfVxyXG5cdFx0XHRcdFx0Y29uc3QgbmV3T2JqID0gY2xlYXJDZmdKc29uKCB7IFsgc3Vib2JqWzJdIF06IHYgfSApO1xyXG5cdFx0XHRcdFx0aWYgKCAhKCBzdWJvYmpbMV0gaW4gcmVzICkgKSB7XHJcblx0XHRcdFx0XHRcdHJlc1sgc3Vib2JqWzFdIF0gPSB7fTtcclxuXHRcdFx0XHRcdH1cclxuXHRcdFx0XHRcdE9iamVjdC5hc3NpZ24oIHJlc1sgc3Vib2JqWzFdIF0sIG5ld09iaiApO1xyXG5cdFx0XHRcdH0gZWxzZSB7XHJcblx0XHRcdFx0XHQvLyBjb3B5IHZhbHVlXHJcblx0XHRcdFx0XHRyZXNbIGsgXSA9IGNsZWFyQ2ZnSnNvbih2KTtcclxuXHRcdFx0XHR9XHJcblx0XHRcdH1cclxuXHJcblx0XHR9XHJcblx0fSlcclxuXHJcblx0cmV0dXJuIHJlcztcclxufVxyXG5cclxuLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vXHJcblxyXG5leHBvcnQgZnVuY3Rpb24gYWRkU2NvcmluZ1ZhbHNQYXJzZXIgKG9iaikge1xyXG5cclxuXHRvYmoucGFyc2VTY29yaW5nVmFscyA9IGZ1bmN0aW9uIChvcHRzKSB7XHJcblx0XHRpZiAoIG9wdHMuZGF0YVNldHRpbmdzICYmIG9wdHMuZGF0YVNldHRpbmdzLnNjb3JpbmdWYWxzICYmIHRoaXMuc2NvcmVEZWYgKSB7XHJcblxyXG5cdFx0XHRjb25zdCBzY29yaW5nVmFscyA9IG9wdHMuZGF0YVNldHRpbmdzLnNjb3JpbmdWYWxzO1xyXG5cdFx0XHRjb25zdCBwcmVmID0gb3B0cy5kYXRhU2V0dGluZ3MudmFyaWFibGVQcmVmaXg7XHJcblxyXG5cdFx0XHRjb25zdCBzY29yZXMgPSB0aGlzLnNjb3JlRGVmKCk7XHJcblx0XHRcdGlmICggdHlwZW9mIHNjb3JlcyA9PT0gJ29iamVjdCcgKSB7XHJcblx0XHRcdFx0Y29uc3QgdmFyTmFtZXMgPSBPYmplY3Qua2V5cyggc2NvcmVzICk7XHJcblx0XHRcdFx0aWYgKCB2YXJOYW1lcy5sZW5ndGg+MCApIHtcclxuXHJcblx0XHRcdFx0XHRzY29yaW5nVmFscy5mb3JFYWNoKCBzdiA9PiB7XHJcblx0XHRcdFx0XHRcdGxldCBjb25kID0gc3YuY29uZGl0aW9uO1xyXG5cdFx0XHRcdFx0XHRpZiAoIGNvbmQgKSB7XHJcblx0XHRcdFx0XHRcdFx0bGV0IHNhdmVDb25kID0gY29uZDtcclxuXHRcdFx0XHRcdFx0XHRjb25zdCBhbGxWYXJzSW5Db25kID0gY29uZC5tYXRjaEFsbCggL1xcJFxceyhbXn1dKil9L2cgKTtcclxuXHRcdFx0XHRcdFx0XHRmb3IgKCBjb25zdCB2biBvZiBhbGxWYXJzSW5Db25kICkge1xyXG5cdFx0XHRcdFx0XHRcdFx0aWYgKCB2blsxXS5sZW5ndGggPT0gMCApIHtcclxuXHRcdFx0XHRcdFx0XHRcdFx0Y29uc29sZS5lcnJvciggYFZhcmlhYmxlbi1OYW1lICdbXScgaW4gU2NvcmluZyBuaWNodCB6dWzDpHNzaWdgICk7XHJcblx0XHRcdFx0XHRcdFx0XHR9IGVsc2Uge1xyXG5cdFx0XHRcdFx0XHRcdFx0XHRjb25zdCByZSA9IG5ldyBSZWdFeHAoIHZuWzFdLCAnaScgKTtcclxuXHRcdFx0XHRcdFx0XHRcdFx0Y29uc3Qgc2VsVmFyTmFtZXMgPSB2YXJOYW1lcy5maWx0ZXIoIHYgPT4gdi5tYXRjaChyZSkgKTtcclxuXHRcdFx0XHRcdFx0XHRcdFx0aWYgKCBzZWxWYXJOYW1lcy5sZW5ndGg+MSApIHtcclxuXHRcdFx0XHRcdFx0XHRcdFx0XHRjb25zb2xlLmVycm9yKCBgVmFyaWFibGVuLU5hbWUgJ1ske3ZuWzFdfV0nIGluIFNjb3JpbmcgaXN0IG5pY2h0IGVpbmRldXRpZ2ApO1xyXG5cdFx0XHRcdFx0XHRcdFx0XHRcdHNhdmVDb25kID0gJyc7XHJcblx0XHRcdFx0XHRcdFx0XHRcdH0gZWxzZSBpZiAoIHNlbFZhck5hbWVzLmxlbmd0aCA9PSAwICkge1xyXG5cdFx0XHRcdFx0XHRcdFx0XHRcdGNvbnNvbGUuZXJyb3IoIGBWYXJpYWJsZW4tTmFtZSAnWyR7dm5bMV19XScgaW4gU2NvcmluZyB1bmJla2FubnRgKTtcclxuXHRcdFx0XHRcdFx0XHRcdFx0XHRzYXZlQ29uZCA9ICcnO1xyXG5cdFx0XHRcdFx0XHRcdFx0XHR9IGVsc2Uge1xyXG5cdFx0XHRcdFx0XHRcdFx0XHRcdHNhdmVDb25kID0gc2F2ZUNvbmQucmVwbGFjZSggdm5bMF0sIGByZXMuJHtzZWxWYXJOYW1lc1swXX1gICk7XHJcblx0XHRcdFx0XHRcdFx0XHRcdH1cclxuXHRcdFx0XHRcdFx0XHRcdH1cclxuXHRcdFx0XHRcdFx0XHR9XHJcblx0XHRcdFx0XHRcdFx0aWYgKCBzYXZlQ29uZCApIHtcclxuXHRcdFx0XHRcdFx0XHRcdGlmICggISggJ3Njb3JpbmdWYWxzJyBpbiB0aGlzICkgKSB7XHJcblx0XHRcdFx0XHRcdFx0XHRcdHRoaXMuc2NvcmluZ1ZhbHMgPSB7fTtcclxuXHRcdFx0XHRcdFx0XHRcdH1cclxuXHRcdFx0XHRcdFx0XHRcdHRoaXMuc2NvcmluZ1ZhbHNbIHN2LnZhbCBdID0gc2F2ZUNvbmQ7XHJcblx0XHRcdFx0XHRcdFx0fVxyXG5cdFx0XHRcdFx0XHR9XHJcblx0XHRcdFx0XHR9KTtcclxuXHRcdFx0XHR9XHJcblx0XHRcdH1cclxuXHRcdH1cclxuXHR9XHJcblxyXG5cdG9iai5jb21wdXRlU2NvcmluZ1ZhbHMgPSBmdW5jdGlvbiAocmVzKSB7XHJcblx0XHRpZiAoIHRoaXMuc2NvcmluZ1ZhbHMgKSB7XHJcblx0XHRcdGxldCBzY29yZSA9IG51bGw7XHJcblx0XHRcdGNvbnN0IHNjb3JlRGF0ID0gT2JqZWN0LmVudHJpZXMoIHRoaXMuc2NvcmluZ1ZhbHMgKTtcclxuXHRcdFx0Zm9yICggbGV0IGg9MDsgc2NvcmU9PW51bGwgJiYgaDxzY29yZURhdC5sZW5ndGg7IGgrKyApIHtcclxuXHRcdFx0XHRjb25zdCBbdixjXSA9IHNjb3JlRGF0W2hdO1xyXG5cdFx0XHRcdHRyeSB7XHJcblx0XHRcdFx0XHRpZiAoIGV2YWwoYykgKSB7XHJcblx0XHRcdFx0XHRcdHNjb3JlID0gdjtcclxuXHRcdFx0XHRcdH1cclxuXHRcdFx0XHR9IGNhdGNoIChlKSB7fVxyXG5cdFx0XHR9XHJcblx0XHRcdGNvbnN0IG4gPSBOdW1iZXIoc2NvcmUpXHJcblx0XHRcdHJlc1sgYFNfJHt0aGlzLmRhdGFTZXR0aW5ncy52YXJpYWJsZVByZWZpeH1gIF0gPSBzY29yZSE9PSBudWxsICYmIG4hPT1OYU4gPyBuIDogc2NvcmU7XHJcblx0XHR9XHJcblx0fVxyXG5cclxufVxyXG5cclxuLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vXHJcblxyXG5leHBvcnQgZnVuY3Rpb24gYWRkU3RhdHVzVmFyRGVmICggb2JqLCBqc29uICkge1xyXG5cclxuXHRpZiAoICFvYmouc3RhdHVzVmFyRGVmICYmIGpzb24uZGF0YVNldHRpbmdzICYmIGpzb24uZGF0YVNldHRpbmdzLnZhcmlhYmxlUHJlZml4ICkge1xyXG5cdFx0Y29uc3Qgc3RhdFZhck5hbWUgPSBgVl8ke2pzb24uZGF0YVNldHRpbmdzLnZhcmlhYmxlUHJlZml4fV9TdGF0dXNgO1xyXG5cdFx0b2JqLnN0YXR1c1ZhckRlZiA9IGZ1bmN0aW9uICgpIHtcclxuXHRcdFx0cmV0dXJuIHtcclxuXHRcdFx0XHRbc3RhdFZhck5hbWVdOiArdGhpcy5nZXREZWZhdWx0Q2hhbmdlU3RhdGUoKSxcclxuXHRcdFx0fVxyXG5cdFx0fVxyXG5cdH1cclxuXHJcbn1cclxuXHJcblxyXG4vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vL1xyXG5cclxuLy8gY29udmVydCBcIjEgMzQsNTo2LTlcIiB0byBbMSwzNCw1LDYsNyw4LDldXHJcbi8qKlxyXG4gKiBQYXJzZXMgYSBzdHJpbmcgY29udGFpbmluZyByYW5nZSB2YWx1ZXMgYW5kIHJldHVybnMgYW4gYXJyYXkgb2YgbnVtYmVycy5cclxuICogQHBhcmFtIHtzdHJpbmd9IHMgLSBUaGUgc3RyaW5nIGNvbnRhaW5pbmcgdGhlIHJhbmdlIHZhbHVlcy5cclxuICogQHJldHVybnMge251bWJlcltdfSAtIEFuIGFycmF5IG9mIG51bWJlcnMgcGFyc2VkIGZyb20gdGhlIHJhbmdlIHZhbHVlcy5cclxuICovXHJcbmV4cG9ydCBjb25zdCByZWFkUmFuZ2VBcnJheSA9IChzKSA9PiB7XHJcblx0Y29uc3QgcmVzID0gW107XHJcblxyXG5cdGZvciAoIGNvbnN0IHJyIG9mIHMubWF0Y2hBbGwoIC8oWzAtOV0rKSAqKD86LSAqKFswLTldKykpPy9nICkgKSB7XHJcblx0XHRpZiAoIHJyWzJdICYmIHJyWzFdPHJyWzJdICkge1xyXG5cdFx0XHRjb25zdCBycjI9TnVtYmVyKHJyWzJdKTtcclxuXHRcdFx0Zm9yICggbGV0IGg9TnVtYmVyKHJyWzFdKTsgaDw9cnIyOyBoKysgKSB7XHJcblx0XHRcdFx0cmVzLnB1c2goaCk7XHJcblx0XHRcdH1cclxuXHRcdH0gZWxzZSB7XHJcblx0XHRcdHJlcy5wdXNoKCBOdW1iZXIocnJbMV0pIClcclxuXHRcdH1cclxuXHR9XHJcblxyXG5cdHJldHVybiByZXM7XHJcbn1cclxuXHJcbi8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vXHJcblxyXG4vKipcclxuICogQ29udmVydHMgYW4gb2JqZWN0IGNvbnRhaW5pbmcgcHJvcGVydGllcyBmb3IgZGVjaW1hbCBwbGFjZXMsIGRlY2ltYWwgcHJlY2lzaW9uLCBhbmQgdW5pdHMgaW50byBhIHJlZ3VsYXIgZXhwcmVzc2lvbiBmb3IgaW5wdXQgdmFsaWRhdGlvbi5cclxuICogQHBhcmFtIHtPYmplY3R9IG9iaiAtIFRoZSBvYmplY3QgY29udGFpbmluZyBwcm9wZXJ0aWVzIGZvciBkZWNpbWFsIHBsYWNlcywgZGVjaW1hbCBwcmVjaXNpb24sIGFuZCB1bml0cy5cclxuICovXHJcbmV4cG9ydCBjb25zdCBkcDJpbnB1dFJlZ0V4cCA9IChvYmopID0+IHtcclxuXHJcblx0LyoqXHJcblx0ICogR2VuZXJhdGVzIGEgcmVndWxhciBleHByZXNzaW9uIHBhdHRlcm4gZm9yIGEgZ2l2ZW4gdW5pdC5cclxuXHQgKiBAcGFyYW0ge3N0cmluZ30gdSAtIFRoZSB1bml0IHN0cmluZy5cclxuXHQgKiBAcmV0dXJucyB7c3RyaW5nfSBUaGUgcmVndWxhciBleHByZXNzaW9uIHBhdHRlcm4gZm9yIHRoZSB1bml0LlxyXG5cdCAqL1xyXG5cdGNvbnN0IHVuaXRSZWdFeHAgPSAodSkgPT4ge1xyXG5cdFx0bGV0IHIgPSAnJztcclxuXHRcdGZvciAoIGNvbnN0IGMgb2YgdS50cmltKCkgKSB7XHJcblx0XHRcdGNvbnN0IHUgPSBjLnRvVXBwZXJDYXNlKCk7XHJcblx0XHRcdGNvbnN0IGwgPSBjLnRvTG93ZXJDYXNlKCk7XHJcblx0XHRcdHIgKz0gdSAhPSBsID8gYFske2x9JHt1fV0/YCA6IGAke2N9P2A7XHJcblx0XHR9XHJcblx0XHRyZXR1cm4gcjtcclxuXHR9O1xyXG5cclxuXHRpZiAoIG9iai5wZHAgfHwgb2JqLmRwICkge1xyXG5cdFx0bGV0IHJlID0gYF5bMC05XSR7IG9iai5wZHAgPyBgezAsJHtvYmoucGRwfX1gIDogJyonIH1gO1xyXG5cdFx0aWYgKCBvYmouZHAgKSB7XHJcblx0XHRcdHJlICs9IGAoWywuXVswLTldezAsJHtvYmouZHB9fSk/YDtcclxuXHRcdH1cclxuXHRcdGlmICggb2JqLnVuaXRzICkge1xyXG5cdFx0XHRyZSArPSBgID8oJHtvYmoudW5pdHMuc3BsaXQoJ3wnKS5tYXAoIHUgPT4gdW5pdFJlZ0V4cCh1KSApLmpvaW4oJ3wnKX0pP2A7XHJcblx0XHR9XHJcblx0XHRvYmouaW5wdXRSZWdleHAgPSByZSArICckJztcclxuXHR9XHJcblx0ZGVsZXRlIG9iai5wZHA7XHJcblx0ZGVsZXRlIG9iai5kcDtcclxuXHRkZWxldGUgb2JqLnVuaXRzO1xyXG59XHJcbiIsImltcG9ydCB7IG9iamVjdF9lcXVhbHMgfSBmcm9tICcuL2NvbW1vbidcbmltcG9ydCB7IGZzbVNlbmQgfSBmcm9tICcuL2ZzbSdcblxuLy8gS29udmEgc2hvdWxkIGJlaSBpbXBvcnRlZCwgYnV0IGRvZW5zJ3Qgc2VlbSB0byBzdXBwb3J0IHRyZWUgc2hha2luZywgc28gbGVhdmUgaXQgb3V0XG4vLyBpbXBvcnQgS29udmEgZnJvbSAna29udmEvbGliL0NvcmUnXG5cbmV4cG9ydCBjbGFzcyBiYXNlSW5pdHMge1xuXG5cdGNvbnN0cnVjdG9yICggb3B0cyA9IHt9ICkge1xuXG5cdFx0Ly8gT3B0aW9ucyBhbmQgZGVmYXVsdHNcblx0XHRjb25zdCBkZWZhdWx0cyA9IHtcblx0XHRcdGNvbnRhaW5lcjogbnVsbCxcblx0XHRcdGFkZFNlbmRDaGFuZ2VTdGF0ZTogbnVsbCxcblx0XHR9XG5cdFx0T2JqZWN0LmFzc2lnbiggdGhpcywgZGVmYXVsdHMsIG9wdHMgKTtcblxuXHRcdC8vIGNyZWF0ZSBmc20gb2JqZWN0LCBpZiBub3QgcHJvdmlkZWRcblx0XHRpZiAoICF0aGlzLmZzbSApIHtcblx0XHRcdHRoaXMuZnNtID0gbmV3IGZzbVNlbmQoKTtcblx0XHRcdHRoaXMuZnNtLnN0YXJ0TGlzdGVuaW5nVG9WYXJpYWJsZURlY2xhcmF0aW9uUmVxdWVzdHMoIHRoaXMuZGVjbGFyZVZhcmlhYmxlcy5iaW5kKHRoaXMpICk7XG5cdFx0fVxuXG5cdFx0Ly8gaW5pdCBzdGFnZSAmIGxheWVyXG5cdFx0aWYgKCBvcHRzLmNvbnRhaW5lciApIHtcblx0XHRcdGlmICggIXRoaXMud2lkdGggKSB7XG5cdFx0XHRcdHRoaXMud2lkdGggPSB3aW5kb3cuaW5uZXJXaWR0aDtcblx0XHRcdH1cblx0XHRcdGlmICggIXRoaXMuaGVpZ2h0ICkge1xuXHRcdFx0XHR0aGlzLmhlaWdodCA9IHdpbmRvdy5pbm5lckhlaWdodDtcblx0XHRcdH1cblxuXHRcdFx0dGhpcy5zdGFnZSA9IG5ldyBLb252YS5TdGFnZSh7XG5cdFx0XHRcdGNvbnRhaW5lcjogdGhpcy5jb250YWluZXIsXG5cdFx0XHRcdHdpZHRoOiB0aGlzLndpZHRoLFxuXHRcdFx0XHRoZWlnaHQ6IHRoaXMuaGVpZ2h0LFxuXHRcdFx0fSk7XG5cblxuXHRcdFx0Y29uc3Qgc3RhZ2VWTiA9IFwiQldfSUJfRVhUUkVTX1NUQUdFU1wiO1xuXHRcdFx0aWYgKCAhKCBzdGFnZVZOIGluIHdpbmRvdyApICkge1xuXHRcdFx0XHR3aW5kb3dbc3RhZ2VWTl0gPSBbXTtcblx0XHRcdH1cblx0XHRcdHdpbmRvd1tzdGFnZVZOXS5wdXNoKCB0aGlzLnN0YWdlICk7XG5cblxuXHRcdFx0Ly8gdGhpcy5sYXllciA9IG5ldyBLb252YS5MYXllcigpO1xuXHRcdFx0Ly8gdGhpcy5zdGFnZS5hZGQoIHRoaXMubGF5ZXIgKTtcblx0XHR9XG5cblx0XHQvLyBkaXNhYmxlIG1vdXNlIHJpZ2h0IGNsaWNrXG5cdFx0ZG9jdW1lbnQuYWRkRXZlbnRMaXN0ZW5lciggJ2NvbnRleHRtZW51JywgKGV2KSA9PiBldi5wcmV2ZW50RGVmYXVsdCgpICk7XG5cblx0XHR0aGlzLkZTTVZhcnNTZW50ID0ge307XG5cdH1cblxuXHQvLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vL1xuXG5cdC8vIG1ldGhvZCB3cmFwcGVyIGZvciBwb3N0aW5nIHRvIEZTTVxuXG5cdHBvc3RMb2cgKCBldmVudCwgZGF0YT17fSApIHtcblx0XHRpZiAoICF0aGlzLnN0YWdlIHx8ICF0aGlzLnN0YWdlLmlzRGVtb0FuaSApIHtcblx0XHRcdHRoaXMuZnNtLnBvc3RMb2dFdmVudCggT2JqZWN0LmFzc2lnbigge30sIGRhdGEsIHsgZXZlbnQ6IGV2ZW50IH0gKSApO1xuXHRcdH1cblx0fVxuXG5cdHBvc3RWYXJpYWJsZSAoIG5hbWUsIHZhbCApIHtcblx0XHR0aGlzLkZTTVZhcnNTZW50W25hbWVdID0gdmFsO1xuXHRcdHRoaXMuZnNtLnNldEZTTVZhcmlhYmxlKCBuYW1lLCB2YWwgKTtcblx0fVxuXG5cdHRyaWdnZXJJbnB1dFZhbGlkYXRpb25FdmVudCAoKSB7XG5cdFx0aWYgKCB0aGlzLmZzbS50cmlnZ2VyRXZlbnQgKSB7XG4vLy8vLy8vLy8vLy8vLy8vLy8vL1xuXHRcdFx0aWYgKCB0aGlzLmRhdGFTZXR0aW5ncyAmJiB0aGlzLmRhdGFTZXR0aW5ncy52YXJpYWJsZVByZWZpeCApIHtcblx0XHRcdFx0dGhpcy5mc20udHJpZ2dlckV2ZW50KCAnZXZfSW5wdXRWYWxpZGF0aW9uXycgKyB0aGlzLmRhdGFTZXR0aW5ncy52YXJpYWJsZVByZWZpeCApO1xuXHRcdFx0fVxuLy8vLy8vLy8vXG4vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vL1xuLy8vLy8vLy8vL1xuXHRcdFx0dGhpcy5mc20udHJpZ2dlckV2ZW50KCAnZXZfSW5wdXRWYWxpZGF0aW9uX0V4dFJlcycgKTtcblx0XHR9XG5cdH1cblxuXHQvLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vL1xuXG5cdC8vIGdldCBzdGF0ZS12YXJzIG9mIG9ialxuXHRnZXRDaGFuZ2VTdGF0ZSAoIG9iaiApIHtcblxuXHRcdC8vIHN0YXR1c1ZhckRlZiBkZWZpbmVkIGluIG9iaj9cblx0XHRpZiAoIG9iai5zdGF0dXNWYXJEZWYgKSB7XG5cblx0XHRcdHJldHVybiBvYmouc3RhdHVzVmFyRGVmLmNhbGwob2JqKTtcblxuXHRcdH0gZWxzZSB7XG5cblx0XHRcdC8vIGNhbGwgZGVmYXVsdENoYW5nZVN0YXRlKClcblx0XHRcdHJldHVybiArb2JqLmdldERlZmF1bHRDaGFuZ2VTdGF0ZSgpO1xuXG5cdFx0fVxuXHR9XG5cblx0c2VuZENoYW5nZVN0YXRlICggb2JqLCBuZXdTdGF0ZT1udWxsICkge1xuXG5cdFx0Ly8gRG9udCBzZW5kIHN0YXRlcyBvciBzY29yZSBpbiBkZW1vQW5pXG5cdFx0aWYgKCBvYmouc3RhZ2UgJiYgb2JqLnN0YWdlLmlzRGVtb0FuaSApIHtcblx0XHRcdHJldHVybjtcblx0XHR9XG5cblx0XHQvLyBzdGF0ZSBWYXJpYWJsZSAoY2hhbmdlU3RhdGUpIGNoYW5nZWQ/XG5cdFx0Y29uc3QgY2hhbmdlU3RhdGUgPSAoIG5ld1N0YXRlPT09bnVsbCA/IHRoaXMuZ2V0Q2hhbmdlU3RhdGUob2JqKSA6IG5ld1N0YXRlICk7XG5cblx0XHQvLyBpcyBzdGF0ZSBjaGFuZ2VkPyAtPiBzZW5kIG1zZ3Ncblx0XHRpZiAoIHR5cGVvZiBvYmoub2xkQ2hhbmdlU3RhdGUgPT09ICd1bmRlZmluZWQnIHx8ICFvYmplY3RfZXF1YWxzKCBjaGFuZ2VTdGF0ZSwgb2JqLm9sZENoYW5nZVN0YXRlICkgKSB7XG5cblx0XHRcdGlmICggdHlwZW9mIGNoYW5nZVN0YXRlID09PSAnb2JqZWN0JyApIHtcblx0XHRcdFx0Ly8gY2hhbmdlU3RhdGUgPSB7IEZTTVN0YXRlVmFyMTogc3RhdGUxLCBGU01TdGF0ZVZhcjI6IHN0YXRlMiwgLi4uIH1cblx0XHRcdFx0Zm9yICggbGV0IGsgaW4gY2hhbmdlU3RhdGUgKSB7XG5cdFx0XHRcdFx0aWYgKCB0eXBlb2Ygb2JqLm9sZENoYW5nZVN0YXRlICE9PSAnb2JqZWN0JyB8fCBjaGFuZ2VTdGF0ZVtrXSAhPT0gb2JqLm9sZENoYW5nZVN0YXRlW2tdICkge1xuXHRcdFx0XHRcdFx0dGhpcy5wb3N0VmFyaWFibGUoIGssIGNoYW5nZVN0YXRlW2tdICk7XG5cdFx0XHRcdFx0fVxuXHRcdFx0XHR9XG5cblx0XHRcdH0gZWxzZSBpZiAoIG9iai5GU01WYXJpYWJsZU5hbWUgKSB7XG5cdFx0XHRcdC8vIFNpbXBsZSAxLXZhbHVlIHN0YXRlXG5cdFx0XHRcdHRoaXMucG9zdFZhcmlhYmxlKCBgVl9TdGF0dXNfJHtvYmouRlNNVmFyaWFibGVOYW1lfWAsICtjaGFuZ2VTdGF0ZSApO1xuXHRcdFx0fVxuXG5cdFx0XHRvYmoub2xkQ2hhbmdlU3RhdGUgPSBjaGFuZ2VTdGF0ZTtcblx0XHR9XG5cblx0XHQvLyBzY29yZSBjaGFuZ2VkP1xuXHRcdGlmICggb2JqLnNjb3JlRGVmICkge1xuXG5cdFx0XHRjb25zdCBzY29yZSA9IG9iai5zY29yZURlZi5jYWxsKG9iaik7XG5cblx0XHRcdGlmICggdHlwZW9mIG9iai5vbGRTY29yZSA9PT0gJ3VuZGVmaW5lZCcgfHwgIW9iamVjdF9lcXVhbHMoIHNjb3JlLCBvYmoub2xkU2NvcmUgKSApIHtcblx0XHRcdFx0aWYgKCB0eXBlb2Ygc2NvcmUgPT09ICdvYmplY3QnICkge1xuXHRcdFx0XHRcdC8vIHNjb3JlID0geyBGU01TdGF0ZVZhcjE6IHN0YXRlMSwgRlNNU3RhdGVWYXIyOiBzdGF0ZTIsIC4uLiB9XG5cdFx0XHRcdFx0Zm9yICggbGV0IGsgaW4gc2NvcmUgKSB7XG5cdFx0XHRcdFx0XHRpZiAoIHR5cGVvZiBvYmoub2xkU2NvcmUgIT09ICdvYmplY3QnIHx8IHNjb3JlW2tdICE9PSBvYmoub2xkU2NvcmVba10gKSB7XG5cdFx0XHRcdFx0XHRcdHRoaXMucG9zdFZhcmlhYmxlKCBrLCBzY29yZVtrXSApO1xuXHRcdFx0XHRcdFx0fVxuXHRcdFx0XHRcdH1cblxuXHRcdFx0XHR9IGVsc2UgaWYgKCBvYmouRlNNVmFyaWFibGVOYW1lIHx8IG9iai5zY29yZVZhcmlhYmxlTmFtZSApIHtcblx0XHRcdFx0XHQvLyBTaW1wbGUgMS12YWx1ZSBzY29yZVxuXHRcdFx0XHRcdGlmICggdHlwZW9mIHNjb3JlICE9PSAndW5kZWZpbmVkJyApIHtcblx0XHRcdFx0XHRcdHRoaXMucG9zdFZhcmlhYmxlKCBvYmouc2NvcmVWYXJpYWJsZU5hbWUgfHwgYFZfU2NvcmVfJHtvYmouRlNNVmFyaWFibGVOYW1lfWAsIHNjb3JlICk7XG5cdFx0XHRcdFx0fVxuXHRcdFx0XHR9XG5cdFx0XHR9XG5cblx0XHRcdG9iai5vbGRTY29yZSA9IHNjb3JlO1xuXHRcdH1cblxuXHRcdGlmICggdHlwZW9mIHRoaXMuYWRkU2VuZENoYW5nZVN0YXRlID09PSAnZnVuY3Rpb24nICkge1xuXHRcdFx0KHRoaXMuYWRkU2VuZENoYW5nZVN0YXRlKSgpO1xuXHRcdH1cblx0fVxuXG5cdC8vIHNlbmQgaW5mb3JtYXRpb24gYWJvdXQgdmFyaWFibGVzIHNlbnRcblx0ZGVjbGFyZVZhcmlhYmxlcyAoKSB7XG5cblx0XHRjb25zdCB2YXJEZWZzID0gW107XG5cdFx0Y29uc3QgdHlwZXRyYW5zID0ge1xuXHRcdFx0J3N0cmluZyc6ICdTdHJpbmcnLFxuXHRcdFx0J251bWJlcic6ICdJbnRlZ2VyJyxcblx0XHR9XG5cblx0XHRmb3IgKCBjb25zdCB2bmFtZSBpbiB0aGlzLkZTTVZhcnNTZW50ICkge1xuXG5cdFx0XHRjb25zdCB2YWwgPSB0aGlzLkZTTVZhcnNTZW50W3ZuYW1lXTtcblx0XHRcdGNvbnN0IHZkZWYgPSB7XG5cdFx0XHRcdG5hbWU6IHZuYW1lLFxuXHRcdFx0XHR0eXBlOiB2YWw9PT1udWxsID8gJ0ludGVnZXInIDogdHlwZXRyYW5zWyB0eXBlb2YgdmFsIF0sXG5cdFx0XHRcdGRlZmF1bHRWYWx1ZTogdmFsLFxuXHRcdFx0XHRuYW1lZFZhbHVlczogW10sXG5cdFx0XHR9XG5cdFx0XHR2YXJEZWZzLnB1c2goIHZkZWYgKTtcblx0XHR9XG5cblx0XHRyZXR1cm4gdmFyRGVmcztcblx0fVxufVxuIiwiaW1wb3J0IHsgbWVyZ2VEZWVwLCBnZXRQb3NPZkV2ZW50LCBzZXRTdGF0ZVBvc3RQcm9jLCBpZ25vcmVFdmVudCB9IGZyb20gJy4vY29tbW9uJ1xyXG5cclxuaW1wb3J0IEtvbnZhIGZyb20gJ2tvbnZhL2xpYi9Db3JlJ1xyXG5pbXBvcnQgeyBMaW5lIH0gZnJvbSAna29udmEvbGliL3NoYXBlcy9MaW5lJ1xyXG5cclxuaW1wb3J0IHsgdGV4dEZyYW1lIH0gZnJvbSAnLi90ZXh0RnJhbWUnXHJcbmltcG9ydCB7IGljb25CYXIgfSBmcm9tICcuL2ljb25CYXInXHJcblxyXG4vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy9cclxuXHJcbi8qKlxyXG4gKiBEZWVwIG1lcmdlIG9mIHNvdXJjZSB0byB0YXJnZXQsIGJ1dCBvbmx5IGtleXMgcHJlc2VudCBpbiB0YXJnZXRcclxuICogT3ZlcndyaXRlcyByZXN1bHQgaW4gdGhpc1xyXG4gKi9cclxuZnVuY3Rpb24gbWVyZ2VBZGRpdGlvbmFsRGVmYXVsdHNUb1RoaXMoIHRhcmdldCwgc291cmNlICkge1xyXG5cclxuXHRmb3IgKCBjb25zdCBrZXkgaW4gdGFyZ2V0ICkge1xyXG5cdFx0dGhpc1trZXldID0gKCBrZXkgaW4gc291cmNlID8gbWVyZ2VEZWVwKCB0YXJnZXRbIGtleSBdLCBzb3VyY2Vba2V5XSApIDogdGFyZ2V0W2tleV0gKTtcclxuXHR9XHJcblxyXG5cdHJldHVybiB0YXJnZXQ7XHJcbn1cclxuXHJcbi8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vL1xyXG5cclxuZXhwb3J0IGNvbnN0IGFkZEluc2VydEJ1dHRvbnNUbyA9ICggYmFzZUNsYXNzLCBleHRyYURlZmF1bHRzPW51bGwsIGlucHV0Q2FsbGJhY2s9bnVsbCApID0+IGNsYXNzIGV4dGVuZHMgYmFzZUNsYXNzIHtcclxuXHJcblx0Y29uc3RydWN0b3IgKCBiYXNlLCBvcHRzID0ge30gKSB7XHJcblxyXG5cdFx0c3VwZXIoIGJhc2UsIG9wdHMgKTtcclxuXHRcdGlmICggIW9wdHMuaW5zZXJ0SWNvbkRlZnMgfHwgIW9wdHMuaW5zZXJ0SWNvbkRlZnMubGVuZ3RoICkge1xyXG5cdFx0XHRyZXR1cm47XHJcblx0XHR9XHJcblxyXG5cdFx0Ly8gTWVyZ2UgYWRkRGVmYXVsdHMgJiBvcHRzIGludG8gdGhpc1xyXG5cdFx0Y29uc3QgYWRkaXRpb25hbERlZmF1bHRPcHRzID0ge1xyXG5cclxuXHRcdFx0aW5zZXJ0SWNvbkRlZnM6IFtcclxuXHRcdFx0XHQvLyB7IHg6LCB5OiwgKHdpZHRoOiwpIHRleHRzOiBbICcrJywgJy0nLCAuLi5dIH1cclxuXHRcdFx0XSxcclxuXHJcblx0XHRcdGluc2VydEljb25CYXJEZWY6IHtcclxuXHRcdFx0XHRmcmFtZVBhZGRpbmc6IDAsXHJcblx0XHRcdFx0ZnJhbWVGaWxsOiAnd2hpdGUnLFxyXG5cdFx0XHRcdGZvbnRTaXplOiAxOCxcclxuXHRcdFx0XHRzcGFjaW5nOiAwLFxyXG5cdFx0XHRcdHN0aWNreTogZmFsc2UsXHJcblx0XHRcdH0sXHJcblxyXG5cdFx0fVxyXG5cdFx0aWYgKCBleHRyYURlZmF1bHRzIT09bnVsbCApIHtcclxuXHRcdFx0aWYgKCB0eXBlb2YgZXh0cmFEZWZhdWx0cyA9PT0gJ2Z1bmN0aW9uJyApIHtcclxuXHRcdFx0XHRleHRyYURlZmF1bHRzLmNhbGwoIHRoaXMsIGFkZGl0aW9uYWxEZWZhdWx0T3B0cyApO1xyXG5cdFx0XHR9IGVsc2Uge1xyXG5cdFx0XHRcdG1lcmdlRGVlcCggYWRkaXRpb25hbERlZmF1bHRPcHRzLCBleHRyYURlZmF1bHRzICk7XHJcblx0XHRcdH1cclxuXHRcdH1cclxuXHRcdG1lcmdlQWRkaXRpb25hbERlZmF1bHRzVG9UaGlzLmNhbGwoIHRoaXMsIGFkZGl0aW9uYWxEZWZhdWx0T3B0cywgb3B0cyApO1xyXG5cclxuXHRcdC8vIGluc2VydGlvbiBpY29uQmFyXHJcblx0XHR0aGlzLmluc2VydEljb25CYXJzID0gW107XHJcblxyXG5cdFx0dGhpcy5pbnNlcnRJY29uRGVmcy5mb3JFYWNoKCB0ID0+IHtcclxuXHRcdFx0Y29uc3Qgb3B0cyA9IE9iamVjdC5hc3NpZ24oIHt9LCB0aGlzLmluc2VydEljb25CYXJEZWYsIHQgKTtcclxuXHRcdFx0b3B0cy5pY29ucyA9IHQudGV4dHMubWFwKCB0ID0+XHJcblx0XHRcdFx0KCB0eXBlb2YgdCA9PT0gJ29iamVjdCcgPyB0IDoge1xyXG5cdFx0XHRcdFx0dGV4dDoge1xyXG5cdFx0XHRcdFx0XHR0ZXh0OiB0LFxyXG5cdFx0XHRcdFx0XHRmb250U2l6ZTogdGhpcy5pbnNlcnRJY29uQmFyRGVmLmZvbnRTaXplLFxyXG5cdFx0XHRcdFx0fSxcclxuXHRcdFx0XHRcdG9uOiAoKSA9PiB7XHJcblx0XHRcdFx0XHRcdHRoaXMuYmFzZS5wb3N0TG9nKCAnaW5zZXJ0QnV0dG9uUHJlc3NlZCcsIHsgdGV4dDogdCB9ICk7XHJcblx0XHRcdFx0XHRcdHRoaXMuaW5zZXJ0QnV0dG9uKHQpO1xyXG5cdFx0XHRcdFx0fSxcclxuXHRcdFx0XHR9KSApO1xyXG5cdFx0XHR0aGlzLmluc2VydEljb25CYXJzLnB1c2goIG5ldyBpY29uQmFyKCB0aGlzLnN0YWdlLCBvcHRzICkgKTtcclxuXHRcdH0pXHJcblxyXG5cdH1cclxuXHJcblx0Ly8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy9cclxuXHJcblx0Ly8gaW5zZXJ0IGJ1dHRvbiBwcmVzc2VkXHJcblx0aW5zZXJ0QnV0dG9uICh0KSB7XHJcblx0XHRpZiAoIGRvY3VtZW50LmFjdGl2ZUVsZW1lbnQudGFnTmFtZSA9PT0gJ0lOUFVUJyApIHtcclxuXHJcblx0XHRcdGNvbnN0IGlucCA9IGRvY3VtZW50LmFjdGl2ZUVsZW1lbnQ7XHJcblx0XHRcdGlmICggaW5wLnNlbGVjdGlvblN0YXJ0IHx8IGlucC5zZWxlY3Rpb25TdGFydCA9PSAnMCcgKSB7XHJcblx0XHRcdFx0Y29uc3Qgc3RhcnRQb3MgPSBpbnAuc2VsZWN0aW9uU3RhcnQ7XHJcblx0XHRcdFx0Y29uc3QgZW5kUG9zID0gaW5wLnNlbGVjdGlvbkVuZDtcclxuXHRcdFx0XHRpbnAudmFsdWUgPSBpbnAudmFsdWUuc3Vic3RyaW5nKCAwLCBzdGFydFBvcyApXHJcblx0XHRcdFx0XHQrIHRcclxuXHRcdFx0XHRcdCsgaW5wLnZhbHVlLnN1YnN0cmluZyggZW5kUG9zLCBpbnAudmFsdWUubGVuZ3RoICk7XHJcblx0XHRcdH0gZWxzZSB7XHJcblx0XHRcdFx0aW5wLnZhbHVlICs9IHQ7XHJcblx0XHRcdH1cclxuXHJcblx0XHRcdGlmICggaW5wdXRDYWxsYmFjayE9PW51bGwgKSB7XHJcblx0XHRcdFx0aW5wdXRDYWxsYmFjay5jYWxsKHRoaXMpO1xyXG5cdFx0XHR9XHJcblx0XHR9XHJcblx0fVxyXG5cclxufVxyXG5cclxuLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vXHJcblxyXG5pbXBvcnQgcGVuaWNvbiBmcm9tICcuL2ltZy9wZW5pY29uLnBuZydcclxuaW1wb3J0IGVyYXNlcmljb24gZnJvbSAnLi9pbWcvZXJhc2VyaWNvbi5wbmcnXHJcbmltcG9ydCBjbGVhcmljb24gZnJvbSAnLi9pbWcvY2xlYXJpY29uLnBuZydcclxuaW1wb3J0IG1hcmtlcmljb24gZnJvbSAnLi9pbWcvbWFya2VyaWNvbi5wbmcnXHJcblxyXG5leHBvcnQgY29uc3QgYWRkRnJlZVBhaW50VG8gPSAoIGJhc2VDbGFzcywgbGluZXNDaGFuZ2VTdGF0ZT0xLCBoYXNNYXJrZXI9MCwgZXh0cmFEZWZhdWx0cz1udWxsICkgPT4gY2xhc3MgZXh0ZW5kcyBiYXNlQ2xhc3Mge1xyXG5cclxuXHRjb25zdHJ1Y3RvciAoIGJhc2UsIG9wdHMgPSB7fSApIHtcclxuXHJcblx0XHRzdXBlciggYmFzZSwgb3B0cyApO1xyXG5cdFx0aWYgKCBvcHRzLnBhaW50TGluZXM9PT1udWxsIHx8IG9wdHMubW9kZUljb25CYXJEZWY9PT1udWxsICkge1xyXG5cdFx0XHRyZXR1cm47XHJcblx0XHR9XHJcblx0XHRjb25zdCBzdGFnZSA9IHRoaXMuc3RhZ2U7XHJcblxyXG5cdFx0Y29uc3QgYWRkaXRpb25hbERlZmF1bHRPcHRzID0ge1xyXG5cclxuXHRcdFx0cGFpbnRMaW5lczoge1xyXG5cdFx0XHRcdGJydXNoOiB7XHJcblx0XHRcdFx0XHRzdHJva2U6ICdibHVlJyxcclxuXHRcdFx0XHRcdHN0cm9rZVdpZHRoOiAyLFxyXG5cdFx0XHRcdFx0Z2xvYmFsQ29tcG9zaXRlT3BlcmF0aW9uOiAnc291cmNlLW92ZXInLFxyXG5cdFx0XHRcdFx0bGluZUNhcDogJ3JvdW5kJyxcclxuXHRcdFx0XHRcdGxpbmVKb2luOiAncm91bmQnLFxyXG5cdFx0XHRcdH0sXHJcblx0XHRcdFx0bWFya2VyOiB7XHJcblx0XHRcdFx0XHRzdHJva2U6ICcjNjY2NmZmJyxcclxuXHRcdFx0XHRcdHN0cm9rZVdpZHRoOiAyNSxcclxuXHRcdFx0XHRcdGdsb2JhbENvbXBvc2l0ZU9wZXJhdGlvbjogJ3NvdXJjZS1vdmVyJyxcclxuXHRcdFx0XHRcdGxpbmVDYXA6ICdyb3VuZCcsXHJcblx0XHRcdFx0XHRsaW5lSm9pbjogJ3JvdW5kJyxcclxuXHRcdFx0XHR9LFxyXG5cdFx0XHRcdGVyYXNlOiB7XHJcblx0XHRcdFx0XHRzdHJva2U6ICdibHVlJyxcclxuXHRcdFx0XHRcdHN0cm9rZVdpZHRoOiAxNSxcclxuXHRcdFx0XHRcdGdsb2JhbENvbXBvc2l0ZU9wZXJhdGlvbjogJ2Rlc3RpbmF0aW9uLW91dCcsXHJcblx0XHRcdFx0XHRsaW5lQ2FwOiAncm91bmQnLFxyXG5cdFx0XHRcdFx0bGluZUpvaW46ICdyb3VuZCcsXHJcblx0XHRcdFx0fSxcclxuXHRcdFx0fSxcclxuXHJcblx0XHRcdG1vZGVJY29uQmFyRGVmOiB7XHJcblx0XHRcdFx0ZnJhbWVQYWRkaW5nOiAwLFxyXG5cdFx0XHRcdHNwYWNpbmc6IDAsXHJcblx0XHRcdFx0ZGVmYXVsdDogMCxcclxuXHRcdFx0XHRmcmFtZUZpbGw6ICd3aGl0ZScsXHJcblx0XHRcdFx0aWNvbnM6IFtcclxuXHRcdFx0XHRcdHtcclxuXHRcdFx0XHRcdFx0c3JjOiBwZW5pY29uLFxyXG5cdFx0XHRcdFx0XHRjdXJzb3I6IGB1cmwoJHtwZW5pY29ufSksIGF1dG9gLFxyXG5cdFx0XHRcdFx0XHRvbjogKCkgPT4gdGhpcy5zZXRQYWludE1vZGUoJ2JydXNoJyksXHQvLyBvdmVyd3JpdHRlbiBieSBhZGRGcmVlUGFpbnRcclxuXHRcdFx0XHRcdFx0b2ZmOiAoKSA9PiB0aGlzLnNldFBhaW50TW9kZSgnbm9uZScpLFx0Ly8gb3ZlcndyaXR0ZW4gYnkgYWRkRnJlZVBhaW50XHJcblx0XHRcdFx0XHR9LHtcclxuXHRcdFx0XHRcdFx0c3JjOiBlcmFzZXJpY29uLFxyXG5cdFx0XHRcdFx0XHRjdXJzb3I6IGB1cmwoJHtlcmFzZXJpY29ufSksIGF1dG9gLFxyXG5cdFx0XHRcdFx0XHRvbjogKCkgPT4gdGhpcy5zZXRQYWludE1vZGUoJ2VyYXNlJyksXHQvLyBvdmVyd3JpdHRlbiBieSBhZGRGcmVlUGFpbnRcclxuXHRcdFx0XHRcdFx0b2ZmOiAoKSA9PiB0aGlzLnNldFBhaW50TW9kZSgnbm9uZScpLFx0Ly8gb3ZlcndyaXR0ZW4gYnkgYWRkRnJlZVBhaW50XHJcblx0XHRcdFx0XHR9LHtcclxuXHRcdFx0XHRcdFx0c3JjOiBjbGVhcmljb24sXHJcblx0XHRcdFx0XHRcdG9uOiAoKSA9PiB0aGlzLmZyZWVQYWludENsZWFyQWxsKCksXHJcblx0XHRcdFx0XHR9XSxcclxuXHRcdFx0fSxcclxuXHRcdH07XHJcblx0XHRpZiAoIGhhc01hcmtlciAmJiAoIG9wdHMuaGFzTWFya2VyPT09dW5kZWZpbmVkIHx8IG9wdHMuaGFzTWFya2VyICkgKSB7XHJcblx0XHRcdGFkZGl0aW9uYWxEZWZhdWx0T3B0cy5tb2RlSWNvbkJhckRlZi5pY29ucy5zcGxpY2UoIDEsIDAsIHtcclxuXHRcdFx0XHRzcmM6IG1hcmtlcmljb24sXHJcblx0XHRcdFx0Y3Vyc29yOiBgdXJsKCR7bWFya2VyaWNvbn0pLCBhdXRvYCxcclxuXHRcdFx0XHRvbjogKCkgPT4gdGhpcy5zZXRQYWludE1vZGUoJ21hcmtlcicpLFx0Ly8gb3ZlcndyaXR0ZW4gYnkgYWRkRnJlZVBhaW50XHJcblx0XHRcdFx0b2ZmOiAoKSA9PiB0aGlzLnNldFBhaW50TW9kZSgnbm9uZScpLFx0Ly8gb3ZlcndyaXR0ZW4gYnkgYWRkRnJlZVBhaW50XHJcblx0XHRcdH0pXHJcblx0XHR9XHJcblx0XHRpZiAoIGV4dHJhRGVmYXVsdHMhPT1udWxsICkge1xyXG5cdFx0XHRpZiAoIHR5cGVvZiBleHRyYURlZmF1bHRzID09PSAnZnVuY3Rpb24nICkge1xyXG5cdFx0XHRcdGV4dHJhRGVmYXVsdHMuY2FsbCggdGhpcywgYWRkaXRpb25hbERlZmF1bHRPcHRzICk7XHJcblx0XHRcdH0gZWxzZSB7XHJcblx0XHRcdFx0bWVyZ2VEZWVwKCBhZGRpdGlvbmFsRGVmYXVsdE9wdHMsIGV4dHJhRGVmYXVsdHMgKTtcclxuXHRcdFx0fVxyXG5cdFx0fVxyXG5cdFx0bWVyZ2VBZGRpdGlvbmFsRGVmYXVsdHNUb1RoaXMuY2FsbCggdGhpcywgYWRkaXRpb25hbERlZmF1bHRPcHRzLCBvcHRzICk7XHJcblxyXG5cdFx0dGhpcy5mcmVlUGFpbnRJbml0KCk7XHJcblxyXG5cdFx0dGhpcy5pbml0RGF0YSA9IHRoaXMuZ2V0Q2hTdGF0ZSgpO1xyXG5cdFx0dGhpcy5iYXNlLnNlbmRDaGFuZ2VTdGF0ZSggdGhpcyApO1x0Ly8gaW5pdCAmIHNlbmQgY2hhbmdlU3RhdGUgJiBzY29yZVxyXG5cclxuXHRcdC8vIGludGVyYWN0aXZpdHlcclxuXHRcdGlmICggIXRoaXMucmVhZG9ubHkgKSB7XHJcblxyXG5cdFx0XHQvLyBTdGFydCBwYWludGluZ1xyXG5cdFx0XHRzdGFnZS5vbignbW91c2Vkb3duIHRvdWNoc3RhcnQnLCBldiA9PiB7XHJcblxyXG5cdFx0XHRcdGlmICggWydicnVzaCcsJ21hcmtlcicsJ2VyYXNlJ10uaW5jbHVkZXMoIHRoaXMubW9kZSApICkge1xyXG5cdFx0XHRcdFx0dGhpcy5pc1BhaW50aW5nID0gMTtcclxuXHRcdFx0XHRcdGNvbnN0IHBvcyA9IGdldFBvc09mRXZlbnQoIHRoaXMuc3RhZ2UsIGV2ICk7XHJcblx0XHRcdFx0XHR0aGlzLnBhaW50UG9pbnRzID0gWyBwb3MueCwgcG9zLnkgXTtcclxuXHRcdFx0XHRcdGlmICggdGhpcy5tb2RlICE9ICdtYXJrZXInICkge1xyXG5cdFx0XHRcdFx0XHR0aGlzLmtGcmVlUGFpbnRMaW5lID0gbmV3IEtvbnZhLkxpbmUoIE9iamVjdC5hc3NpZ24oIHt9LCB0aGlzLnBhaW50TGluZXNbIHRoaXMubW9kZSBdLCB7XHJcblx0XHRcdFx0XHRcdFx0cG9pbnRzOiB0aGlzLnBhaW50UG9pbnRzLFxyXG5cdFx0XHRcdFx0XHR9KSk7XHJcblx0XHRcdFx0XHRcdHRoaXMua0ZyZWVQYWludEJydXNoR3JvdXAuYWRkKCB0aGlzLmtGcmVlUGFpbnRMaW5lICk7XHJcblx0XHRcdFx0XHR9IGVsc2Uge1xyXG5cdFx0XHRcdFx0XHR0aGlzLmtGcmVlUGFpbnRMaW5lID0gbnVsbDtcclxuXHRcdFx0XHRcdH1cclxuXHRcdFx0XHRcdGlmICggaGFzTWFya2VyICYmICggdGhpcy5oYXNNYXJrZXI9PT11bmRlZmluZWQgfHwgdGhpcy5oYXNNYXJrZXIgKSApIHtcclxuXHRcdFx0XHRcdFx0aWYgKCB0aGlzLm1vZGUgIT0gJ2JydXNoJyApIHtcclxuXHRcdFx0XHRcdFx0XHR0aGlzLmtGcmVlUGFpbnRNYXJrZXJMaW5lID0gbmV3IEtvbnZhLkxpbmUoIE9iamVjdC5hc3NpZ24oIHt9LCB0aGlzLnBhaW50TGluZXNbIHRoaXMubW9kZSBdLCB7XHJcblx0XHRcdFx0XHRcdFx0XHRwb2ludHM6IHRoaXMucGFpbnRQb2ludHMsXHJcblx0XHRcdFx0XHRcdFx0fSkpO1xyXG5cdFx0XHRcdFx0XHRcdHRoaXMua0ZyZWVQYWludE1hcmtlckdyb3VwLmFkZCggdGhpcy5rRnJlZVBhaW50TWFya2VyTGluZSApO1xyXG5cdFx0XHRcdFx0XHR9IGVsc2Uge1xyXG5cdFx0XHRcdFx0XHRcdHRoaXMua0ZyZWVQYWludE1hcmtlckxpbmUgPSBudWxsO1xyXG5cdFx0XHRcdFx0XHR9XHJcblx0XHRcdFx0XHR9XHJcblxyXG5cdFx0XHRcdFx0ZXYuY2FuY2VsQnViYmxlID0gdHJ1ZTtcclxuXHRcdFx0XHR9XHJcblx0XHRcdH0gKTtcclxuXHJcblx0XHRcdC8vIEVuZCBwYWludGluZ1xyXG5cdFx0XHRzdGFnZS5vbignbW91c2V1cCBtb3VzZWxlYXZlIHRvdWNoZW5kJywgKGV2KSA9PiB7XHJcblxyXG5cdFx0XHRcdGlmICggaWdub3JlRXZlbnQoIHRoaXMuc3RhZ2UsIGV2ICkgKSB7XHJcblx0XHRcdFx0XHRyZXR1cm47XHJcblx0XHRcdFx0fVxyXG5cdFx0XHRcdGlmICggdGhpcy5pc1BhaW50aW5nICkge1xyXG5cdFx0XHRcdFx0dGhpcy5pc1BhaW50aW5nID0gMDtcclxuXHRcdFx0XHRcdGlmICggdGhpcy5wYWludFBvaW50cy5sZW5ndGg+MiApIHtcclxuXHRcdFx0XHRcdFx0dGhpcy5saW5lc0NvcHkucHVzaCgge1xyXG5cdFx0XHRcdFx0XHRcdHQ6IHRoaXMubW9kZS5zdWJzdHIoIDAsIDEgKSxcclxuXHRcdFx0XHRcdFx0XHRwOiB0aGlzLnBhaW50UG9pbnRzLFxyXG5cdFx0XHRcdFx0XHR9KVxyXG5cdFx0XHRcdFx0XHRjb25zdCBsb2dOYW1lcyA9IHtcclxuXHRcdFx0XHRcdFx0XHRicnVzaDogJ3BhaW50TGluZScsXHJcblx0XHRcdFx0XHRcdFx0bWFya2VyOiAncGFpbnRNYXJrZXInLFxyXG5cdFx0XHRcdFx0XHRcdGVyYXNlOiAncGFpbnRFcmFzZScsXHJcblx0XHRcdFx0XHRcdH1cclxuXHRcdFx0XHRcdFx0dGhpcy5iYXNlLnBvc3RMb2coIGxvZ05hbWVzWyB0aGlzLm1vZGUgXSwgeyBwb2ludHM6IHRoaXMucGFpbnRQb2ludHMgfSApO1xyXG5cdFx0XHRcdFx0XHR0aGlzLmJhc2Uuc2VuZENoYW5nZVN0YXRlKCB0aGlzICk7XHQvLyBpbml0ICYgc2VuZCBjaGFuZ2VTdGF0ZSAmIHNjb3JlXHJcblx0XHRcdFx0XHR9XHJcblx0XHRcdFx0fVxyXG5cdFx0XHR9KTtcclxuXHJcblx0XHRcdC8vIGFuZCBjb3JlIGZ1bmN0aW9uIC0gZHJhd2luZ1xyXG5cdFx0XHRzdGFnZS5vbignbW91c2Vtb3ZlIHRvdWNobW92ZScsIGV2ID0+IHtcclxuXHRcdFx0XHRpZiAoIHRoaXMuaXNQYWludGluZyApIHtcclxuXHRcdFx0XHRcdGNvbnN0IHBvcyA9IGdldFBvc09mRXZlbnQoIHRoaXMuc3RhZ2UsIGV2ICk7XHJcblx0XHRcdFx0XHR0aGlzLnBhaW50UG9pbnRzLnB1c2goIHBvcy54ICk7XHJcblx0XHRcdFx0XHR0aGlzLnBhaW50UG9pbnRzLnB1c2goIHBvcy55ICk7XHJcblx0XHRcdFx0XHRpZiAoIHRoaXMua0ZyZWVQYWludE1hcmtlckxpbmUgKSB7XHJcblx0XHRcdFx0XHRcdHRoaXMua0ZyZWVQYWludE1hcmtlckxpbmUucG9pbnRzKCB0aGlzLnBhaW50UG9pbnRzICk7XHJcblx0XHRcdFx0XHRcdHRoaXMuZnJlZVBhaW50TWFya2VyTGF5ZXIuYmF0Y2hEcmF3KCk7XHJcblx0XHRcdFx0XHR9XHJcblx0XHRcdFx0XHRpZiAoIHRoaXMua0ZyZWVQYWludExpbmUgKSB7XHJcblx0XHRcdFx0XHRcdHRoaXMua0ZyZWVQYWludExpbmUucG9pbnRzKCB0aGlzLnBhaW50UG9pbnRzICk7XHJcblx0XHRcdFx0XHRcdHRoaXMuZnJlZVBhaW50TGF5ZXIuYmF0Y2hEcmF3KCk7XHJcblx0XHRcdFx0XHR9XHJcblx0XHRcdFx0fVxyXG5cdFx0XHR9ICk7XHJcblxyXG5cdFx0XHRzdGFnZS5vbiggJ21vdXNlbGVhdmUnLCAoZXYpID0+IHtcclxuXHRcdFx0XHRpZiAoIGlnbm9yZUV2ZW50KCB0aGlzLnN0YWdlLCBldiApICkge1xyXG5cdFx0XHRcdFx0cmV0dXJuO1xyXG5cdFx0XHRcdH1cclxuXHRcdFx0XHR0aGlzLmN1cnNvclNhdmVkID0gZG9jdW1lbnQuYm9keS5zdHlsZS5jdXJzb3I7XHJcblx0XHRcdFx0ZG9jdW1lbnQuYm9keS5zdHlsZS5jdXJzb3IgPSBcImRlZmF1bHRcIjtcclxuXHRcdFx0fSk7XHJcblxyXG5cdFx0XHRzdGFnZS5vbiggJ21vdXNlZW50ZXInLCAoKSA9PiB7XHJcblx0XHRcdFx0aWYgKCB0aGlzLmN1cnNvclNhdmVkICkge1xyXG5cdFx0XHRcdFx0ZG9jdW1lbnQuYm9keS5zdHlsZS5jdXJzb3IgPSB0aGlzLmN1cnNvclNhdmVkO1xyXG5cdFx0XHRcdFx0dGhpcy5jdXJzb3JTYXZlZCA9IG51bGw7XHJcblx0XHRcdFx0fVxyXG5cdFx0XHR9KVxyXG5cdFx0fVxyXG5cdH1cclxuXHJcblx0Ly8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy9cclxuXHJcblx0ZnJlZVBhaW50SW5pdCAoKSB7XHJcblxyXG5cdFx0Ly8gaW5pdCBQYWludExpbmVzXHJcblx0XHRpZiAoIGhhc01hcmtlciAmJiAoIHRoaXMuaGFzTWFya2VyPT09dW5kZWZpbmVkIHx8IHRoaXMuaGFzTWFya2VyICkgKSB7XHJcblx0XHRcdGlmICggIXRoaXMuZnJlZVBhaW50TWFya2VyTGF5ZXIgKSB7XHJcblx0XHRcdFx0dGhpcy5mcmVlUGFpbnRNYXJrZXJMYXllciA9IG5ldyBLb252YS5MYXllcigpO1xyXG5cdFx0XHRcdHRoaXMuc3RhZ2UuYWRkKCB0aGlzLmZyZWVQYWludE1hcmtlckxheWVyICk7XHJcblx0XHRcdH1cclxuXHRcdFx0dGhpcy5mcmVlUGFpbnRNYXJrZXJMYXllci5tb3ZlVG9Ub3AoKTtcclxuXHJcblx0XHRcdGNvbnN0IGJjbGlwID0gKCB0aGlzLmZyZWVQYWludE1hcmtlckNsaXBGdW5jID8geyBjbGlwRnVuYzogdGhpcy5mcmVlUGFpbnRNYXJrZXJDbGlwRnVuYy5iaW5kKHRoaXMpIH0gOiB7fSApO1xyXG5cdFx0XHR0aGlzLmtGcmVlUGFpbnRNYXJrZXJHcm91cCA9IG5ldyBLb252YS5Hcm91cCggYmNsaXAgKTtcclxuXHRcdFx0dGhpcy5mcmVlUGFpbnRNYXJrZXJMYXllci5hZGQoIHRoaXMua0ZyZWVQYWludE1hcmtlckdyb3VwICk7XHJcblxyXG5cdFx0XHR0aGlzLmtGcmVlUGFpbnRNYXJrZXJMaW5lID0gbnVsbDtcclxuXHRcdH1cclxuXHJcblx0XHRpZiAoICF0aGlzLmZyZWVQYWludExheWVyICkge1xyXG5cdFx0XHR0aGlzLmZyZWVQYWludExheWVyID0gbmV3IEtvbnZhLkxheWVyKCk7XHJcblx0XHRcdHRoaXMuc3RhZ2UuYWRkKCB0aGlzLmZyZWVQYWludExheWVyICk7XHJcblx0XHR9XHJcblx0XHR0aGlzLmZyZWVQYWludExheWVyLm1vdmVUb1RvcCgpO1xyXG5cclxuXHRcdGNvbnN0IGZjbGlwID0gKCB0aGlzLmZyZWVQYWludEJydXNoQ2xpcEZ1bmMgPyB7IGNsaXBGdW5jOnRoaXMuZnJlZVBhaW50QnJ1c2hDbGlwRnVuYy5iaW5kKHRoaXMpIH0gOiB7fSApO1xyXG5cdFx0dGhpcy5rRnJlZVBhaW50QnJ1c2hHcm91cCA9IG5ldyBLb252YS5Hcm91cCggZmNsaXAgKTtcclxuXHRcdHRoaXMuZnJlZVBhaW50TGF5ZXIuYWRkKCB0aGlzLmtGcmVlUGFpbnRCcnVzaEdyb3VwICk7XHJcblxyXG5cdFx0dGhpcy5saW5lc0NvcHkgPSBbXTtcclxuXHRcdHRoaXMuaXNQYWludGluZyA9IDA7XHJcblx0XHR0aGlzLnBhaW50UG9pbnRzID0gW107XHJcblx0XHR0aGlzLmtGcmVlUGFpbnRMaW5lID0gbnVsbDtcclxuXHJcblx0XHQvLyBpY29uQmFyXHJcblx0XHR0aGlzLm1vZGVJY29uQmFyID0gbmV3IGljb25CYXIoIHRoaXMuc3RhZ2UsIHRoaXMubW9kZUljb25CYXJEZWYgKTtcclxuXHR9XHJcblxyXG5cdC8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vXHJcblxyXG5cdGZyZWVQYWludENsZWFyQWxsICggbm90aWZ5PXRydWUgKSB7XHJcblx0XHRpZiAoIGhhc01hcmtlciAmJiAoIHRoaXMuaGFzTWFya2VyPT09dW5kZWZpbmVkIHx8IHRoaXMuaGFzTWFya2VyICkgKSB7XHJcblx0XHRcdHRoaXMua0ZyZWVQYWludE1hcmtlckdyb3VwLmRlc3Ryb3lDaGlsZHJlbigpO1xyXG5cdFx0XHR0aGlzLmZyZWVQYWludE1hcmtlckxheWVyLmJhdGNoRHJhdygpO1xyXG5cdFx0fVxyXG5cdFx0dGhpcy5rRnJlZVBhaW50QnJ1c2hHcm91cC5kZXN0cm95Q2hpbGRyZW4oKTtcclxuXHRcdHRoaXMuZnJlZVBhaW50TGF5ZXIuYmF0Y2hEcmF3KCk7XHJcblxyXG5cdFx0dGhpcy5saW5lc0NvcHkgPSBbXTtcclxuXHJcblx0XHR0aGlzLm1vZGVJY29uQmFyLmNsaWNrT24oMCk7XHJcblxyXG5cdFx0aWYgKCBub3RpZnkgKSB7XHJcblx0XHRcdHRoaXMuYmFzZS5wb3N0TG9nKCAncGFpbnRDbGVhckFsbCcsIHt9ICk7XHJcblxyXG5cdFx0XHR0aGlzLmJhc2Uuc2VuZENoYW5nZVN0YXRlKCB0aGlzICk7XHQvLyBpbml0ICYgc2VuZCBjaGFuZ2VTdGF0ZSAmIHNjb3JlXHJcblx0XHR9XHJcblx0fVxyXG5cclxuXHRzZXRQYWludE1vZGUgKG1vZGUpIHtcclxuXHRcdHRoaXMubW9kZSA9IG1vZGU7XHJcblx0XHR0aGlzLmJhc2UucG9zdExvZyggJ21vZGVTZXQnLCB7IG1vZGUgfSApXHJcblx0fVxyXG5cclxuXHQvLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vL1xyXG5cclxuXHRnZXRTdGF0ZSAoKSB7XHJcblxyXG5cdFx0Y29uc3Qgc3VwZXJTdGF0ZSA9IHN1cGVyLmdldFN0YXRlKCk7XHJcblxyXG5cdFx0aWYgKCB0aGlzLmxpbmVzQ29weS5sZW5ndGggKSB7XHJcblxyXG5cdFx0XHRjb25zdCBzdGF0ZSA9IEpTT04ucGFyc2UoIHN1cGVyU3RhdGUgKTtcclxuXHRcdFx0c3RhdGUubGluZXMgPSB0aGlzLmxpbmVzQ29weTtcclxuXHRcdFx0cmV0dXJuIEpTT04uc3RyaW5naWZ5KCBzdGF0ZSApO1xyXG5cclxuXHRcdH0gZWxzZSB7XHJcblxyXG5cdFx0XHRyZXR1cm4gc3VwZXJTdGF0ZTtcclxuXHJcblx0XHR9XHJcblx0fVxyXG5cclxuXHRzZXRTdGF0ZSAoIHN0YXRlICkge1xyXG5cclxuXHRcdHN1cGVyLnNldFN0YXRlKCBzdGF0ZSApO1xyXG5cclxuXHRcdHRyeSB7XHJcblxyXG5cdFx0XHRjb25zdCBvYmogPSBKU09OLnBhcnNlKHN0YXRlKTtcclxuXHJcblx0XHRcdC8vIHJlY29uc3RydWN0IGxpbmVzXHJcblx0XHRcdGlmICggb2JqLmxpbmVzICkge1xyXG5cdFx0XHRcdHRoaXMuZnJlZVBhaW50Q2xlYXJBbGwoZmFsc2UpO1xyXG5cclxuXHRcdFx0XHRvYmoubGluZXMuZm9yRWFjaCggbGluZSA9PiB7XHJcblx0XHRcdFx0XHRjb25zdCBtb2RlVHJhbnMgPSB7XHJcblx0XHRcdFx0XHRcdGI6ICdicnVzaCcsXHJcblx0XHRcdFx0XHRcdG06ICdtYXJrZXInLFxyXG5cdFx0XHRcdFx0XHRlOiAnZXJhc2UnLFxyXG5cdFx0XHRcdFx0fVxyXG5cdFx0XHRcdFx0Y29uc3QgbW9kZSA9IG1vZGVUcmFuc1sgbGluZS50IF07XHJcblx0XHRcdFx0XHRjb25zdCBrTGluZSA9IG5ldyBLb252YS5MaW5lKCBPYmplY3QuYXNzaWduKCB7fSwgdGhpcy5wYWludExpbmVzWyBtb2RlIF0sIHtcclxuXHRcdFx0XHRcdFx0cG9pbnRzOiBsaW5lLnAsXHJcblx0XHRcdFx0XHR9KSk7XHJcblx0XHRcdFx0XHRpZiAoIG1vZGUgIT0gJ21hcmtlcicgKSB7XHJcblx0XHRcdFx0XHRcdHRoaXMua0ZyZWVQYWludEJydXNoR3JvdXAuYWRkKCBrTGluZSApO1xyXG5cdFx0XHRcdFx0fVxyXG5cdFx0XHRcdFx0aWYgKCBoYXNNYXJrZXIgJiYgKCB0aGlzLmhhc01hcmtlcj09PXVuZGVmaW5lZCB8fCB0aGlzLmhhc01hcmtlciApICYmIG1vZGUgIT0gJ2JydXNoJyApIHtcclxuXHRcdFx0XHRcdFx0dGhpcy5rRnJlZVBhaW50TWFya2VyR3JvdXAuYWRkKCBtb2RlICE9ICdtYXJrZXInID8ga0xpbmUuY2xvbmUoKSA6IGtMaW5lICk7XHJcblx0XHRcdFx0XHR9XHJcblx0XHRcdFx0fSlcclxuXHRcdFx0XHR0aGlzLmxpbmVzQ29weSA9IG9iai5saW5lcztcclxuXHRcdFx0fVxyXG5cclxuXHRcdFx0aWYgKCBoYXNNYXJrZXIgJiYgKCB0aGlzLmhhc01hcmtlcj09PXVuZGVmaW5lZCB8fCB0aGlzLmhhc01hcmtlciApICkge1xyXG5cdFx0XHRcdHRoaXMuZnJlZVBhaW50TWFya2VyTGF5ZXIuZHJhdygpO1xyXG5cdFx0XHR9XHJcblx0XHRcdHRoaXMuZnJlZVBhaW50TGF5ZXIuZHJhdygpO1xyXG5cclxuXHRcdH0gY2F0Y2ggKGUpIHtcclxuXHRcdFx0Y29uc29sZS5lcnJvcihlKTtcclxuXHRcdH1cclxuXHJcblx0XHRzZXRTdGF0ZVBvc3RQcm9jKHRoaXMpO1xyXG5cdH1cclxuXHJcblx0Z2V0Q2hTdGF0ZSAoKSB7XHJcblx0XHRjb25zdCBzID0gc3VwZXIuZ2V0Q2hTdGF0ZSgpO1xyXG5cdFx0aWYgKCBsaW5lc0NoYW5nZVN0YXRlICYmIHRoaXMubGluZXNDb3B5ICYmIHRoaXMubGluZXNDb3B5Lmxlbmd0aCApIHtcclxuXHRcdFx0cy5saW5lcyA9IHRoaXMubGluZXNDb3B5O1xyXG5cdFx0fVxyXG5cdFx0cmV0dXJuICBzO1xyXG5cdH1cclxuXHJcblx0Z2V0RGVmYXVsdENoYW5nZVN0YXRlICgpIHtcclxuXHJcblx0XHRyZXR1cm4gc3VwZXIuZ2V0RGVmYXVsdENoYW5nZVN0YXRlKCkgfHwgISEoIGxpbmVzQ2hhbmdlU3RhdGUgJiYgdGhpcy5saW5lc0NvcHkgJiYgdGhpcy5saW5lc0NvcHkubGVuZ3RoICk7XHJcblxyXG5cdH1cclxufVxyXG5cclxuLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vXHJcblxyXG5leHBvcnQgY29uc3QgYWRkRnJlZUxhYmVsc1RvID0gKCBiYXNlQ2xhc3MgKSA9PiBjbGFzcyBleHRlbmRzIGJhc2VDbGFzcyB7XHJcblxyXG5cdC8vIGJhc2VDbGFzcyBtdXN0IGNhbGwgdGhpcy5yZWRyYXcoKSB3aGVuIHZhbHVlcyBhcmUgY2hhbmdlZFxyXG5cdC8vIGRlcGVuZGluZyBjaGFuZ2VzIGluIHBvcy90ZXh0IG9mIGxhYmVsc1xyXG5cclxuXHRjb25zdHJ1Y3RvciAoIGJhc2UsIG9wdHMgPSB7fSApIHtcclxuXHJcblx0XHRzdXBlciggYmFzZSwgb3B0cyApO1xyXG5cdFx0aWYgKCAhb3B0cy5mcmVlTGFiZWxzIHx8ICFvcHRzLmZyZWVMYWJlbHMubGVuZ3RoICkge1xyXG5cdFx0XHRyZXR1cm47XHJcblx0XHR9XHJcblxyXG5cdFx0Y29uc3QgYWRkaXRpb25hbERlZmF1bHRPcHRzID0ge1xyXG5cclxuXHRcdFx0ZnJlZUxhYmVsczogW1xyXG5cdFx0XHRcdC8vIHtcclxuXHRcdFx0XHQvLyBcdHgsIHksIHZhbHVlLFx0XHQvLyB2YWx1ZXMgb3JcclxuXHRcdFx0XHQvLyBcdHhGbmMsIHlGbmMsIHZhbHVlRm5jLCBcdC8vIGZ1bmN0aW9ucyB0aGF0IHJldHVybiBuZXcgVmFsdWVzICh1cGRhdGVkIGluIHRoaXMucmVkcmF3KCkpXHJcblx0XHRcdFx0Ly8gXHQvLyBhZGRpdGlvbmFsIHRleHRGcmFtZS1PcHRpb25zXHJcblx0XHRcdFx0Ly8gfVxyXG5cdFx0XHRdLFxyXG5cclxuXHRcdFx0ZGVmYXVsdEZyZWVMYWJlbE9wdHM6IHtcclxuXHRcdFx0XHR2YWx1ZTogJycsXHJcblx0XHRcdFx0d2lkdGg6IDUwLFxyXG5cdFx0XHRcdGhlaWdodDogMjUsXHJcblx0XHRcdFx0Zm9udFNpemU6IDE1LFxyXG5cdFx0XHRcdGZyYW1lV2lkdGg6IDEsXHJcblx0XHRcdFx0Y29ybmVyUmFkaXVzOiA0LFxyXG5cdFx0XHR9LFxyXG5cclxuXHRcdH07XHJcblx0XHRtZXJnZUFkZGl0aW9uYWxEZWZhdWx0c1RvVGhpcy5jYWxsKCB0aGlzLCBhZGRpdGlvbmFsRGVmYXVsdE9wdHMsIG9wdHMgKTtcclxuXHJcblx0XHR0aGlzLmZyZWVMYWJlbHNJbml0KCk7XHJcblx0XHR0aGlzLnJlZHJhdygpO1xyXG5cclxuXHRcdHRoaXMuaW5pdERhdGEgPSB0aGlzLmdldENoU3RhdGUoKTtcclxuXHRcdHRoaXMuYmFzZS5zZW5kQ2hhbmdlU3RhdGUoIHRoaXMgKTtcdC8vIGluaXQgJiBzZW5kIGNoYW5nZVN0YXRlICYgc2NvcmVcclxuXHR9XHJcblxyXG5cdC8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vXHJcblxyXG5cdGZyZWVMYWJlbHNJbml0ICgpIHtcclxuXHJcblx0XHR0aGlzLmZyZWVMYWJlbHNMYXllciA9IHRoaXMuc3RhZ2UuZ2V0TGF5ZXJzKCkuc2xpY2UoLTEpWzBdO1xyXG5cclxuXHRcdC8vIGNyZWF0ZSBmcmVlTGFiZWxzXHJcblx0XHR0aGlzLmZyZWVMYWJlbHMuZm9yRWFjaCggKGwsbnIpID0+IHtcclxuXHRcdFx0aWYgKCBsLnhGbmMgKSB7XHJcblx0XHRcdFx0bC54ID0gbC54Rm5jLmNhbGwodGhpcyk7XHJcblx0XHRcdH1cclxuXHRcdFx0aWYgKCBsLnlGbmMgKSB7XHJcblx0XHRcdFx0bC55ID0gbC55Rm5jLmNhbGwodGhpcyk7XHJcblx0XHRcdH1cclxuXHRcdFx0aWYgKCBsLnZhbHVlZm5jICkge1xyXG5cdFx0XHRcdGwudmFsdWUgPSBsLnZhbHVlRm5jLmNhbGwodGhpcyk7XHJcblx0XHRcdH1cclxuXHJcblx0XHRcdGlmICggbC50ZXh0T2JqICkge1xyXG5cdFx0XHRcdGwudGV4dE9iai5kZWxldGVBbGwoKTtcclxuXHRcdFx0fVxyXG5cdFx0XHRsLnRleHRPYmogPSBuZXcgdGV4dEZyYW1lKFxyXG5cdFx0XHRcdHRoaXMuYmFzZSxcclxuXHRcdFx0XHR0aGlzLmZyZWVMYWJlbHNMYXllcixcclxuXHRcdFx0XHRPYmplY3QuYXNzaWduKCB7fSwgdGhpcy5kZWZhdWx0RnJlZUxhYmVsT3B0cywgbCwge1xyXG5cdFx0XHRcdFx0bG9nT2JqZWN0SWQ6IG5yKzEsXHJcblx0XHRcdFx0XHRvbkNoYW5nZTogKCkgPT4ge1xyXG5cdFx0XHRcdFx0XHR0aGlzLmJhc2UucG9zdExvZyggJ2xhYmVsQ2hhbmdlZCcsIHtcclxuXHRcdFx0XHRcdFx0XHRpZDogbnIrMSxcclxuXHRcdFx0XHRcdFx0XHRsYWJlbE5ldzogbC50ZXh0T2JqLnZhbHVlLFxyXG5cdFx0XHRcdFx0XHR9KTtcclxuXHRcdFx0XHRcdFx0dGhpcy5iYXNlLnNlbmRDaGFuZ2VTdGF0ZSggdGhpcyApO1xyXG5cdFx0XHRcdFx0fSxcclxuXHRcdFx0XHR9KVxyXG5cdFx0XHQpO1xyXG5cdFx0fSlcclxuXHR9XHJcblxyXG5cdC8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vXHJcblxyXG5cdHJlZHJhdyAoKSB7XHJcblxyXG5cdFx0c3VwZXIucmVkcmF3LmFwcGx5KCB0aGlzLCBhcmd1bWVudHMgKTtcclxuXHJcblx0XHQvLyBhdHRyaWJ1dGVzIG9mIGZyZWVMYWJlbHMgKHgsIHksIHRleHQpIGNoYW5nZWQ/XHJcblx0XHRsZXQgcmVkcmF3ID0gMDtcclxuXHRcdHRoaXMuZnJlZUxhYmVscy5mb3JFYWNoKCBsID0+IHtcclxuXHRcdFx0bGV0IG5ld1BvcyA9IDA7XHJcblx0XHRcdGlmICggbC54Rm5jICkge1xyXG5cdFx0XHRcdGNvbnN0IG52YWwgPSBsLnhGbmMuY2FsbCh0aGlzKTtcclxuXHRcdFx0XHRpZiAoIG52YWwgIT0gbC54ICkge1xyXG5cdFx0XHRcdFx0bC54ID0gbnZhbDtcclxuXHRcdFx0XHRcdG5ld1Bvcz0xO1xyXG5cdFx0XHRcdH1cclxuXHRcdFx0fVxyXG5cdFx0XHRpZiAoIGwueUZuYyApIHtcclxuXHRcdFx0XHRjb25zdCBudmFsID0gbC55Rm5jLmNhbGwodGhpcyk7XHJcblx0XHRcdFx0aWYgKCBudmFsICE9IGwueSApIHtcclxuXHRcdFx0XHRcdGwueSA9IG52YWw7XHJcblx0XHRcdFx0XHRuZXdQb3M9MTtcclxuXHRcdFx0XHR9XHJcblx0XHRcdH1cclxuXHRcdFx0aWYgKCBuZXdQb3MgKSB7XHJcblx0XHRcdFx0bC50ZXh0T2JqLnJlcG9zKCBsLngsIGwueSApO1xyXG5cdFx0XHRcdHJlZHJhdyA9IDE7XHJcblx0XHRcdH1cclxuXHJcblx0XHRcdGlmICggbC52YWx1ZUZuYyApIHtcclxuXHRcdFx0XHRjb25zdCBudmFsID0gbC52YWx1ZUZuYy5jYWxsKHRoaXMpO1xyXG5cdFx0XHRcdGlmICggbnZhbCAhPSBsLnZhbHVlICkge1xyXG5cdFx0XHRcdFx0bC52YWx1ZSA9IG52YWw7XHJcblx0XHRcdFx0XHRsLnRleHRPYmouc2V0VmFsKCBudmFsICk7XHJcblx0XHRcdFx0XHRyZWRyYXcgPSAxO1xyXG5cdFx0XHRcdH1cclxuXHRcdFx0fVxyXG5cdFx0fSlcclxuXHJcblx0XHRpZiAoIHJlZHJhdyApIHtcclxuXHRcdFx0dGhpcy5mcmVlTGFiZWxzTGF5ZXIuYmF0Y2hEcmF3KCk7XHJcblx0XHR9XHJcblx0fVxyXG5cclxuXHQvLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vL1xyXG5cclxuXHRnZXRTdGF0ZSAoKSB7XHJcblxyXG5cdFx0Y29uc3Qgc3VwZXJTdGF0ZSA9IHN1cGVyLmdldFN0YXRlKCk7XHJcblxyXG5cdFx0aWYgKCB0aGlzLmZyZWVMYWJlbHMubGVuZ3RoICkge1xyXG5cclxuXHRcdFx0bGV0IGhhc0RhdGEgPSBmYWxzZTtcclxuXHRcdFx0Y29uc3QgZGF0YSA9IHRoaXMuZnJlZUxhYmVscy5tYXAoIGwgPT4ge1xyXG5cdFx0XHRcdGlmICggIWwucmVhZG9ubHkgKSB7XHJcblx0XHRcdFx0XHRoYXNEYXRhID0gdHJ1ZTtcclxuXHRcdFx0XHRcdHJldHVybiAoeyB2YWx1ZTogbC50ZXh0T2JqLnZhbHVlIH0pO1xyXG5cdFx0XHRcdH1cclxuXHRcdFx0XHRyZXR1cm4gKHt9KTtcclxuXHRcdFx0fSk7XHJcblxyXG5cdFx0XHRpZiAoICFoYXNEYXRhICkge1xyXG5cdFx0XHRcdHJldHVybiBzdXBlclN0YXRlO1xyXG5cdFx0XHR9XHJcblxyXG5cdFx0XHRjb25zdCBzdGF0ZSA9IEpTT04ucGFyc2UoIHN1cGVyU3RhdGUgKTtcclxuXHRcdFx0c3RhdGUuZnJlZUxhYmVscyA9IGRhdGE7XHJcblx0XHRcdHJldHVybiBKU09OLnN0cmluZ2lmeSggc3RhdGUgKTtcclxuXHJcblx0XHR9IGVsc2Uge1xyXG5cclxuXHRcdFx0cmV0dXJuIHN1cGVyU3RhdGU7XHJcblxyXG5cdFx0fVxyXG5cdH1cclxuXHJcblx0c2V0U3RhdGUgKCBzdGF0ZSApIHtcclxuXHJcblx0XHRzdXBlci5zZXRTdGF0ZSggc3RhdGUgKTtcclxuXHJcblx0XHR0cnkge1xyXG5cclxuXHRcdFx0Y29uc3Qgb2JqID0gSlNPTi5wYXJzZShzdGF0ZSk7XHJcblxyXG5cdFx0XHQvLyBtZXJnZSBMYWJlbC1EZWZzXHJcblx0XHRcdGlmICggb2JqLmZyZWVMYWJlbHMgKSB7XHJcblx0XHRcdFx0b2JqLmZyZWVMYWJlbHMuZm9yRWFjaCggKCBsLCBuICkgPT4gT2JqZWN0LmFzc2lnbiggdGhpcy5mcmVlTGFiZWxzW25dLCBsICkgKTtcclxuXHRcdFx0fVxyXG5cdFx0XHR0aGlzLmZyZWVMYWJlbHNJbml0KCk7XHJcblxyXG5cdFx0XHR0aGlzLmZyZWVMYWJlbHNMYXllci5kcmF3KCk7XHJcblxyXG5cdFx0fSBjYXRjaCAoZSkge1xyXG5cdFx0XHRjb25zb2xlLmVycm9yKGUpO1xyXG5cdFx0fVxyXG5cclxuXHRcdHNldFN0YXRlUG9zdFByb2ModGhpcyk7XHJcblx0fVxyXG5cclxuXHRnZXRDaFN0YXRlICgpIHtcclxuXHRcdGNvbnN0IHMgPSBzdXBlci5nZXRDaFN0YXRlKCk7XHJcblx0XHRpZiAoIHRoaXMuZnJlZUxhYmVscyApIHtcclxuXHRcdFx0cy5sID0gdGhpcy5mcmVlTGFiZWxzLmZpbHRlciggbCA9PiAhbC5yZWFkb25seSApLm1hcCggbCA9PiBsLnRleHRPYmogPyBsLnRleHRPYmoudmFsdWUgOiAnJyApO1xyXG5cdFx0fVxyXG5cdFx0cmV0dXJuICBzO1xyXG5cdH1cclxuXHJcbn1cclxuXHJcbi8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vL1xyXG4iLCJcclxuLy8gaW1wb3J0IHsgaXNCZXR3ZWVuLCBkZWxEZWZhdWx0cywgbWVyZ2VEZWVwLCBvYmplY3RfZXF1YWxzLCBnZXRYb2ZFdmVudCwgZ2V0WW9mRXZlbnQsIGdldFBvc09mRXZlbnQgfSBmcm9tICcuL2NvbW1vbidcclxuXHJcbmV4cG9ydCBmdW5jdGlvbiBpc0JldHdlZW4gKCB2LCB3MSwgdzIgKSB7XHJcblx0cmV0dXJuIHYgPj0gTWF0aC5taW4oIHcxLCB3MiApICYmIHYgPD0gTWF0aC5tYXgoIHcxLCB3MiApO1xyXG59O1xyXG5cclxuXHJcbmV4cG9ydCBmdW5jdGlvbiBpc051bVVuaXQgKCB2LCBudW0sIHVuaXRSRSwgdW5pdE9wdCwgb3JFbXB0eSApIHtcclxuXHRjb25zdCBudW1SRSA9IGAwKiR7bnVtfSg/OlssLl0wKik/YDtcclxuXHRjb25zdCByID0gdW5pdE9wdCA/IGAke251bVJFfSg/OiAqJHt1bml0UkV9KT98KD86JHt1bml0UkV9ICopPyR7bnVtUkV9YCA6IGAke251bVJFfSAqJHt1bml0UkV9fCR7dW5pdFJFfSAqJHtudW1SRX1gO1xyXG5cdGNvbnN0IHJlID0gbmV3IFJlZ0V4cCggYF4oPzoke3J9KSR7IG9yRW1wdHkgPyAnPycgOiAnJyB9JGAgKTtcclxuXHRyZXR1cm4gdi50cmltKCkubWF0Y2gocmUpO1xyXG59XHJcblxyXG5cclxuLy8gRGVsZXRlcyBkZWxLZXlzICYgdW5jaGFuZ2VkIGRlZmF1bHRzIGZyb20gb2JqXHJcbi8vIG9iamVjdCBkZWVwIGNsb25lLCBvbWl0dGluZyBzb21lIGRhdGEgZGVmaW5lZCBieSBkZWZhdWx0cyBhbmQgZGVsS2V5c1xyXG4vLyBhZG9wdGVkIGZyb20gaHR0cHM6Ly9zdGFja292ZXJmbG93LmNvbS9xdWVzdGlvbnMvNDQ1OTkyOC9ob3ctdG8tZGVlcC1jbG9uZS1pbi1qYXZhc2NyaXB0XHJcbmV4cG9ydCBmdW5jdGlvbiBkZWxEZWZhdWx0cyAoIG9iaiA9IHt9LCBkZWZhdWx0cyA9IHt9LCBkZWxLZXlzID0gW10gKSB7XHJcblxyXG5cdC8vIGlmIG9iaiBpcyBhcnJheSBvZiBvYmplY3RzOiBhcHBseSBkZWxEZWZhdWx0cyB0byBldmVyeSBtZW1iZXIgb2YgYXJyYXlcclxuXHRpZiAoIEFycmF5LmlzQXJyYXkob2JqKSApIHtcclxuXHRcdGxldCBhID0gW107XHJcblx0XHRvYmouZm9yRWFjaCggZSA9PiB7XHJcblx0XHRcdGlmICggdHlwZW9mIGU9PT0nb2JqZWN0JyApIHtcclxuXHRcdFx0XHRhLnB1c2goIGRlbERlZmF1bHRzKCBlLCBkZWZhdWx0cywgZGVsS2V5cyApICk7XHJcblx0XHRcdH0gZWxzZSB7XHJcblx0XHRcdFx0YS5wdXNoKGUpO1xyXG5cdFx0XHR9XHJcblx0XHR9KVxyXG5cdFx0cmV0dXJuIGE7XHJcblx0fVxyXG5cclxuXHRpZiAoICFvYmogKSB7XHJcblx0XHRyZXR1cm4gb2JqO1xyXG5cdH1cclxuXHJcblx0bGV0IHY7XHJcblx0bGV0IGJPYmplY3QgPSB7fTtcclxuXHRmb3IgKCBjb25zdCBrIGluIG9iaiApIHtcclxuXHRcdGlmICggIWRlbEtleXMuaW5jbHVkZXMoaykgKSB7XHJcblx0XHRcdHYgPSBvYmpba107XHJcblx0XHRcdGlmICggIWRlZmF1bHRzIHx8IGRlZmF1bHRzW2tdIT09diApIHtcclxuXHRcdFx0XHRiT2JqZWN0W2tdID0gKHR5cGVvZiB2ID09PSBcIm9iamVjdFwiKSA/IGRlbERlZmF1bHRzKCB2LCBkZWZhdWx0cyA/IGRlZmF1bHRzW2tdIDogW10gKSA6IHY7XHJcblx0XHRcdH1cclxuXHRcdH1cclxuXHR9XHJcblxyXG5cdHJldHVybiBiT2JqZWN0O1xyXG59XHJcblxyXG4vKipcclxuICogRnJvbTogaHR0cHM6Ly9naXN0LmdpdGh1Yi5jb20vYWh0Y3gvMGNkOTRlNjI2OTFmNTM5MTYwYjMyZWNkYTE4YWYzZDZcclxuICogUGVyZm9ybXMgYSBkZWVwIG1lcmdlIG9mIGBzb3VyY2VgIGludG8gYHRhcmdldGAuXHJcbiAqIE11dGF0ZXMgYHRhcmdldGAgb25seSBidXQgbm90IGl0cyBvYmplY3RzIGFuZCBhcnJheXMuXHJcbiAqXHJcbiAqIEBhdXRob3IgaW5zcGlyZWQgYnkgW2poaWxkZW5iaWRkbGVdKGh0dHBzOi8vc3RhY2tvdmVyZmxvdy5jb20vYS80ODIxODIwOSkuXHJcbiAqL1xyXG5leHBvcnQgZnVuY3Rpb24gbWVyZ2VEZWVwICh0YXJnZXQsIHNvdXJjZSkge1xyXG5cdGNvbnN0IGlzT2JqZWN0ID0gKG9iaikgPT4gb2JqICYmIHR5cGVvZiBvYmogPT09ICdvYmplY3QnO1xyXG5cclxuXHRpZiAoIWlzT2JqZWN0KHRhcmdldCkgfHwgIWlzT2JqZWN0KHNvdXJjZSkpIHtcclxuXHRcdHJldHVybiBzb3VyY2U7XHJcblx0fVxyXG5cclxuXHRPYmplY3Qua2V5cyhzb3VyY2UpLmZvckVhY2goa2V5ID0+IHtcclxuXHRcdGNvbnN0IHRhcmdldFZhbHVlID0gdGFyZ2V0W2tleV07XHJcblx0XHRjb25zdCBzb3VyY2VWYWx1ZSA9IHNvdXJjZVtrZXldO1xyXG5cclxuXHRcdGlmICggLypBcnJheS5pc0FycmF5KHRhcmdldFZhbHVlKSAmJiovIEFycmF5LmlzQXJyYXkoc291cmNlVmFsdWUpKSB7XHJcblx0XHRcdC8vIE5PIENPTkNBVEVOQVRJT04gT0YgQVJSQVlTIVxyXG5cdFx0XHQvLyB0YXJnZXRba2V5XSA9IHRhcmdldFZhbHVlLmNvbmNhdChzb3VyY2VWYWx1ZSk7XHJcblx0XHRcdHRhcmdldFtrZXldID0gc291cmNlVmFsdWU7XHJcblx0XHR9IGVsc2UgaWYgKGlzT2JqZWN0KHRhcmdldFZhbHVlKSAmJiBpc09iamVjdChzb3VyY2VWYWx1ZSkpIHtcclxuXHRcdFx0dGFyZ2V0W2tleV0gPSBtZXJnZURlZXAoT2JqZWN0LmFzc2lnbih7fSwgdGFyZ2V0VmFsdWUpLCBzb3VyY2VWYWx1ZSk7XHJcblx0XHR9IGVsc2Uge1xyXG5cdFx0XHR0YXJnZXRba2V5XSA9IHNvdXJjZVZhbHVlO1xyXG5cdFx0fVxyXG5cdH0pO1xyXG5cclxuXHRyZXR1cm4gdGFyZ2V0O1xyXG59XHJcblxyXG4vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vL1xyXG5cclxuLy8gYWRvcHRlZCBmcm9tIGh0dHBzOi8vc3RhY2tvdmVyZmxvdy5jb20vcXVlc3Rpb25zLzEwNjg4MzQvb2JqZWN0LWNvbXBhcmlzb24taW4tamF2YXNjcmlwdFxyXG5leHBvcnQgZnVuY3Rpb24gb2JqZWN0X2VxdWFscyAoIHgsIHkgKSB7XHJcblx0aWYgKCB4ID09PSB5ICkgcmV0dXJuIHRydWU7XHJcblx0Ly8gaWYgYm90aCB4IGFuZCB5IGFyZSBudWxsIG9yIHVuZGVmaW5lZCBhbmQgZXhhY3RseSB0aGUgc2FtZVxyXG5cclxuXHRpZiAoICEgKCB4IGluc3RhbmNlb2YgT2JqZWN0ICkgfHwgISAoIHkgaW5zdGFuY2VvZiBPYmplY3QgKSApIHJldHVybiBmYWxzZTtcclxuXHQvLyBpZiB0aGV5IGFyZSBub3Qgc3RyaWN0bHkgZXF1YWwsIHRoZXkgYm90aCBuZWVkIHRvIGJlIE9iamVjdHNcclxuXHJcblx0aWYgKCB4LmNvbnN0cnVjdG9yICE9PSB5LmNvbnN0cnVjdG9yICkgcmV0dXJuIGZhbHNlO1xyXG5cdC8vIHRoZXkgbXVzdCBoYXZlIHRoZSBleGFjdCBzYW1lIHByb3RvdHlwZSBjaGFpbiwgdGhlIGNsb3Nlc3Qgd2UgY2FuIGRvIGlzXHJcblx0Ly8gdGVzdCB0aGVyZSBjb25zdHJ1Y3Rvci5cclxuXHJcblx0Ly8gaWYgYm90aCBhcmUgYXJyYXlzOiB1bm9yZGVyZWQgY29tcGFyZSAoY2hlY2sgaWYgYWxsIGVsZW1lbnRzIGFyZSBjb250YWluZWQpXHJcblx0aWYgKCBBcnJheS5pc0FycmF5KHkpICYmIEFycmF5LmlzQXJyYXkoeCkgKSB7XHJcblx0XHRpZiAoIHgubGVuZ3RoICE9IHkubGVuZ3RoICkgcmV0dXJuIGZhbHNlO1xyXG5cdFx0Y29uc3QgeTIgPSBBcnJheS5mcm9tKCB5ICk7XHJcblx0XHRpZiAoICF4LmV2ZXJ5KCB4ZSA9PlxyXG5cdFx0XHR5Mi5zb21lKCAoIHllLCBpICkgPT4ge1xyXG5cdFx0XHRcdGlmICggb2JqZWN0X2VxdWFscyggeGUsIHllICkgKSB7XHJcblx0XHRcdFx0XHR5Mi5zcGxpY2UoIGksIDEgKTtcclxuXHRcdFx0XHRcdHJldHVybiB0cnVlO1xyXG5cdFx0XHRcdH1cclxuXHRcdFx0XHRyZXR1cm4gZmFsc2U7XHJcblx0XHRcdH0pXHJcblx0XHQpKSByZXR1cm4gZmFsc2U7XHJcblx0XHRyZXR1cm4geTIubGVuZ3RoPT09MDtcclxuXHR9XHJcblxyXG5cdGZvciAoIHZhciBwIGluIHggKSB7XHJcblx0XHRpZiAoICEgeC5oYXNPd25Qcm9wZXJ0eSggcCApICkgY29udGludWU7XHJcblx0XHRcdC8vIG90aGVyIHByb3BlcnRpZXMgd2VyZSB0ZXN0ZWQgdXNpbmcgeC5jb25zdHJ1Y3RvciA9PT0geS5jb25zdHJ1Y3RvclxyXG5cclxuXHRcdGlmICggISB5Lmhhc093blByb3BlcnR5KCBwICkgKSByZXR1cm4gZmFsc2U7XHJcblx0XHRcdC8vIGFsbG93cyB0byBjb21wYXJlIHhbIHAgXSBhbmQgeVsgcCBdIHdoZW4gc2V0IHRvIHVuZGVmaW5lZFxyXG5cclxuXHRcdGlmICggeFsgcCBdID09PSB5WyBwIF0gKSBjb250aW51ZTtcclxuXHRcdFx0Ly8gaWYgdGhleSBoYXZlIHRoZSBzYW1lIHN0cmljdCB2YWx1ZSBvciBpZGVudGl0eSB0aGVuIHRoZXkgYXJlIGVxdWFsXHJcblxyXG5cdFx0aWYgKCB0eXBlb2YoIHhbIHAgXSApICE9PSBcIm9iamVjdFwiICkgcmV0dXJuIGZhbHNlO1xyXG5cdFx0XHQvLyBOdW1iZXJzLCBTdHJpbmdzLCBGdW5jdGlvbnMsIEJvb2xlYW5zIG11c3QgYmUgc3RyaWN0bHkgZXF1YWxcclxuXHJcblx0XHRpZiAoICEgb2JqZWN0X2VxdWFscyggeFsgcCBdLCAgeVsgcCBdICkgKSByZXR1cm4gZmFsc2U7XHJcblx0XHRcdC8vIE9iamVjdHMgYW5kIEFycmF5cyBtdXN0IGJlIHRlc3RlZCByZWN1cnNpdmVseVxyXG5cdH1cclxuXHJcblx0Zm9yICggcCBpbiB5IClcclxuXHRpZiAoIHkuaGFzT3duUHJvcGVydHkoIHAgKSAmJiAhIHguaGFzT3duUHJvcGVydHkoIHAgKSApXHJcblx0XHRyZXR1cm4gZmFsc2U7XHJcblx0XHQvLyBhbGxvd3MgeFsgcCBdIHRvIGJlIHNldCB0byB1bmRlZmluZWRcclxuXHJcblx0cmV0dXJuIHRydWU7XHJcbn1cclxuXHJcbi8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vXHJcblxyXG5leHBvcnQgZnVuY3Rpb24gZ2V0WG9mRXZlbnQgKCBzdGFnZSwgZXZlbnQgKSB7XHJcblx0aWYgKCBldmVudCApIHtcclxuXHRcdGlmICggZXZlbnQuc2ltWCApIHtcclxuXHRcdFx0cmV0dXJuIGV2ZW50LnNpbVg7XHJcblx0XHR9XHJcblx0XHQvLyBpZiAoIGV2ZW50LmV2dCAmJiBldmVudC5ldnQuY2xpZW50WCApIHtcclxuXHRcdC8vIFx0cmV0dXJuIGV2ZW50LmV2dC5jbGllbnRYO1xyXG5cdFx0Ly8gfVxyXG5cdH1cclxuXHRyZXR1cm4gc3RhZ2UuZ2V0UG9pbnRlclBvc2l0aW9uKCkueDtcclxufVxyXG5cclxuXHJcbmV4cG9ydCBmdW5jdGlvbiBnZXRZb2ZFdmVudCAoIHN0YWdlLCBldmVudCApIHtcclxuXHRpZiAoIGV2ZW50ICkge1xyXG5cdFx0aWYgKCBldmVudC5zaW1ZICkge1xyXG5cdFx0XHRyZXR1cm4gZXZlbnQuc2ltWTtcclxuXHRcdH1cclxuXHRcdC8vIGlmICggZXZlbnQuZXZ0ICYmIGV2ZW50LmV2dC5jbGllbnRZICkge1xyXG5cdFx0Ly8gXHRyZXR1cm4gZXZlbnQuZXZ0LmNsaWVudFk7XHJcblx0XHQvLyB9XHJcblx0fVxyXG5cdHJldHVybiBzdGFnZS5nZXRQb2ludGVyUG9zaXRpb24oKS55O1xyXG59XHJcblxyXG5cclxuZXhwb3J0IGZ1bmN0aW9uIGdldFBvc09mRXZlbnQgKCBzdGFnZSwgZXYgKSB7XHJcblx0cmV0dXJuIHtcclxuXHRcdHg6IGdldFhvZkV2ZW50KCBzdGFnZSwgZXYgKSxcclxuXHRcdHk6IGdldFlvZkV2ZW50KCBzdGFnZSwgZXYgKSxcclxuXHR9XHJcbn1cclxuXHJcblxyXG4vLyBpcyBpbiBEZW1vQW5pOiBpZ25vcmUgbmF0aXZlIEV2ZW50cyAocHJldmVudCBlLmcuIHN0YWdlLm9uKG1vdXNlbGVhdmUpKVxyXG5leHBvcnQgZnVuY3Rpb24gaWdub3JlRXZlbnQgKCBzdGFnZSwgZXYgKSB7XHJcblx0cmV0dXJuICggc3RhZ2UgJiYgc3RhZ2UuaXNEZW1vQW5pICYmICEoIFwic2ltWFwiIGluIGV2ICkgKTtcclxufVxyXG5cclxuXHJcbi8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vXHJcblxyXG5leHBvcnQgY29uc3Qgc2V0U3RhdGVQb3N0UHJvYyA9IGZ1bmN0aW9uIChvYmopIHtcclxuXHJcblx0aWYgKCBvYmouc3RhZ2UgJiYgb2JqLnN0YWdlLmlzRGVtb0FuaSAmJiBvYmouc3RhZ2UuaXNEZW1vQW5pLmVuZEFuaSApIHtcclxuXHRcdG9iai5zdGFnZS5pc0RlbW9BbmkuZW5kQW5pKCBmYWxzZSApO1xyXG5cdH1cclxuXHJcblx0aWYgKCBvYmouYmFzZSApIHtcclxuXHRcdG9iai5iYXNlLnNlbmRDaGFuZ2VTdGF0ZSggb2JqICk7XHQvLyBpbml0ICYgc2VuZCBjaGFuZ2VTdGF0ZSAmIHNjb3JlXHJcblx0fVxyXG5cdC8vIG9iai5vbGRDaGFuZ2VTdGF0ZSA9IG9iai5iYXNlLmdldENoYW5nZVN0YXRlKG9iaik7XHJcblx0Ly8gaWYgKCBvYmouc2NvcmVEZWYgKSB7XHJcblx0Ly8gXHRvYmoub2xkU2NvcmUgPSBvYmouc2NvcmVEZWYoKTtcclxuXHQvLyB9XHJcbn1cclxuXHJcbi8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vXHJcblxyXG5leHBvcnQgY29uc3QgZ2V0QWJzUG9zaXRpb24gPSBmdW5jdGlvbiAoZWxlbWVudCkge1xyXG5cdGNvbnN0IGJveCA9IGVsZW1lbnQuZ2V0Qm91bmRpbmdDbGllbnRSZWN0KCk7XHJcblx0Y29uc3Qgc2Nyb2xsWCA9IHdpbmRvdy5zY3JvbGxYIHx8IHdpbmRvdy5wYWdlWE9mZnNldDtcclxuXHRjb25zdCBzY3JvbGxZID0gd2luZG93LnNjcm9sbFkgfHwgd2luZG93LnBhZ2VZT2Zmc2V0O1xyXG5cdHJldHVybiB7XHJcblx0XHRsZWZ0OiBib3gubGVmdCArIHNjcm9sbFgsXHJcblx0XHR0b3A6IGJveC50b3AgKyBzY3JvbGxZXHJcblx0fVxyXG59XHJcblxyXG5cclxuLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy9cclxuXHJcbmV4cG9ydCBjb25zdCBhZGRBcnJvdyA9IGZ1bmN0aW9uICggbGF5ZXIsIG9wdHMgKSB7XHJcblx0bGF5ZXIuYWRkKG5ldyBLb252YS5MaW5lKG9wdHMpKTtcclxuXHRjb25zdCBwb2ludGVyTGVuZ3RoID0gb3B0cy5wb2ludGVyTGVuZ3RoIHx8IDEwO1xyXG5cdGNvbnN0IHBvaW50ZXJXaWR0aCA9IG9wdHMucG9pbnRlcldpZHRoLzIgfHwgMztcclxuXHRjb25zdCBzID0geyB4OiBvcHRzLnBvaW50c1swXSwgeTogb3B0cy5wb2ludHNbMV0gfTtcclxuXHRjb25zdCBwMCA9IHsgeDogb3B0cy5wb2ludHNbMl0sIHk6IG9wdHMucG9pbnRzWzNdIH07XHJcblx0Y29uc3QgZHggPSBzLnggLSBwMC54O1xyXG5cdGNvbnN0IGR5ID0gcy55IC0gcDAueTtcclxuXHRjb25zdCBub3JtID0gTWF0aC5zcXJ0KGR4ICogZHggKyBkeSAqIGR5KTtcclxuXHRjb25zdCB1ID0geyB4OiBkeCAvIG5vcm0sIHk6IGR5IC8gbm9ybSB9O1xyXG5cdGNvbnN0IHYgPSB7IHg6IC11LnksIHk6IHUueCB9O1xyXG5cdGNvbnN0IHAxID0ge1xyXG5cdFx0eDogcDAueCArIHBvaW50ZXJMZW5ndGggKiB1LnggKyBwb2ludGVyV2lkdGggKiB2LngsXHJcblx0XHR5OiBwMC55ICsgcG9pbnRlckxlbmd0aCAqIHUueSArIHBvaW50ZXJXaWR0aCAqIHYueVxyXG5cdH07XHJcblx0Y29uc3QgcDIgPSB7XHJcblx0XHR4OiBwMC54ICsgcG9pbnRlckxlbmd0aCAqIHUueCAtIHBvaW50ZXJXaWR0aCAqIHYueCxcclxuXHRcdHk6IHAwLnkgKyBwb2ludGVyTGVuZ3RoICogdS55IC0gcG9pbnRlcldpZHRoICogdi55XHJcblx0fTtcclxuXHRsYXllci5hZGQoXHJcblx0XHRuZXcgS29udmEuTGluZSh7XHJcblx0XHRcdGZpbGw6IFwiYmxhY2tcIixcclxuXHRcdFx0Li4ub3B0cyxcclxuXHRcdFx0cG9pbnRzOiBbcDEueCwgcDEueSwgcDAueCwgcDAueSwgcDIueCwgcDIueV0sXHJcblx0XHRcdGNsb3NlZDogdHJ1ZVxyXG5cdFx0fSlcclxuXHQpO1xyXG59O1xyXG4iLCIvLyBTZXQgRlNNIHZhcmlhYmxlXHJcblxyXG5leHBvcnQgY2xhc3MgZnNtU2VuZCB7XHJcblxyXG5cdGNvbnN0cnVjdG9yICgpIHtcclxuXHRcdHRoaXMuaW5kZXhQYXRoID0gdGhpcy5nZXRRdWVyeVZhcmlhYmxlKCdpbmRleFBhdGgnKTtcclxuXHRcdHRoaXMudXNlckRlZklkUGF0aCA9IHRoaXMuZ2V0UXVlcnlWYXJpYWJsZSgndXNlckRlZklkUGF0aCcpO1xyXG5cclxuXHRcdC8vIFRyYWNlIENvdW50ZXJcclxuXHRcdHRoaXMudHJhY2VDb3VudCA9IDA7XHJcblxyXG5cdFx0aWYgKCBwcm9jZXNzLmVudi5OT0RFX0VOViAhPT0gJ3Byb2R1Y3Rpb24nICkge1xyXG5cdFx0XHR3aW5kb3cuYndfX2RlYnVnT3V0ID0gdGhpcy5kZWJ1Z091dC5iaW5kKHRoaXMpO1xyXG5cdFx0fVxyXG5cdH1cclxuXHJcblx0c2V0RlNNVmFyaWFibGUgKCB2YXJpYWJsZU5hbWUsIG5ld1ZhbHVlICkge1xyXG5cclxuXHRcdGlmICggcHJvY2Vzcy5lbnYuTk9ERV9FTlYgIT09ICdwcm9kdWN0aW9uJyApIHtcclxuXHRcdFx0dGhpcy5kZWJ1Z091dCggYFNldCBGU00gdmFyaWFibGU6ICR7dmFyaWFibGVOYW1lfSB0byB2YWx1ZSA+JHtuZXdWYWx1ZX08ICgke3R5cGVvZiBuZXdWYWx1ZX0pYCApO1xyXG5cdFx0fVxyXG5cclxuXHRcdHRoaXMucG9zdE1lc3NhZ2VXaXRoUGF0aHNBbmRUcmFjZUNvdW50KHtcclxuXHRcdFx0c2V0VmFyaWFibGU6IHtcclxuXHRcdFx0XHR2YXJpYWJsZU5hbWUsXHJcblx0XHRcdFx0bmV3VmFsdWUsXHJcblx0XHRcdH0sXHJcblx0XHR9KVxyXG5cdH1cclxuXHJcblx0Ly8gU2VuZCBhIHRyYWNlIG1lc3NhZ2VcclxuXHRwb3N0TG9nRXZlbnQgKCB0cmFjZU1lc3NhZ2UgKSB7XHJcblxyXG5cdFx0aWYgKCBwcm9jZXNzLmVudi5OT0RFX0VOViAhPT0gJ3Byb2R1Y3Rpb24nICkge1xyXG5cdFx0XHR0aGlzLmRlYnVnT3V0KCBgUG9zdGluZyBldmVudCAnJHt0cmFjZU1lc3NhZ2UuZXZlbnR9JywgbWVzc2FnZSAke0pTT04uc3RyaW5naWZ5KCB0cmFjZU1lc3NhZ2UsIChrLHYpID0+IGs9PT0nZXZlbnQnID8gdW5kZWZpbmVkIDogdiApfWAgKTtcclxuXHRcdH1cclxuXHJcblx0XHR0aGlzLnBvc3RNZXNzYWdlV2l0aFBhdGhzQW5kVHJhY2VDb3VudCh7XHJcblx0XHRcdHRyYWNlTWVzc2FnZSxcclxuXHRcdH0pXHJcblxyXG5cdH1cclxuXHJcblx0dHJpZ2dlckV2ZW50ICggZXZlbnQgKSB7XHJcblxyXG5cdFx0aWYgKCBwcm9jZXNzLmVudi5OT0RFX0VOViAhPT0gJ3Byb2R1Y3Rpb24nICkge1xyXG5cdFx0XHR0aGlzLmRlYnVnT3V0KFwidHJpZ2dlckV2ZW50OiBcIiArIGV2ZW50KTtcclxuXHRcdH1cclxuXHJcblx0XHR0aGlzLnBvc3RNZXNzYWdlV2l0aFBhdGhzQW5kVHJhY2VDb3VudCh7XHJcblx0XHRcdG1pY3JvZmluRXZlbnQ6IGV2ZW50LFxyXG5cdFx0fSlcclxuXHR9XHJcblxyXG5cdHBvc3RNZXNzYWdlV2l0aFBhdGhzQW5kVHJhY2VDb3VudCggcGF5bG9hZCApIHtcclxuXHJcblx0XHR0cnlcclxuXHRcdHtcclxuXHRcdFx0cGF5bG9hZC5pbmRleFBhdGggPSB0aGlzLmluZGV4UGF0aDtcclxuXHRcdFx0cGF5bG9hZC51c2VyRGVmSWRQYXRoID0gdGhpcy51c2VyRGVmSWRQYXRoO1xyXG5cdFx0XHRwYXlsb2FkLnRyYWNlQ291bnQgPSB0aGlzLnRyYWNlQ291bnQrKztcclxuXHJcblx0XHRcdHdpbmRvdy5wYXJlbnQucG9zdE1lc3NhZ2UoIEpTT04uc3RyaW5naWZ5KCBwYXlsb2FkICksICcqJyApO1xyXG5cclxuXHRcdH0gY2F0Y2ggKGUpIHtcclxuXHRcdFx0Y29uc29sZS5lcnJvcihlKTtcclxuXHRcdH1cclxuXHJcblx0fVxyXG5cclxuXHQvLyBIZWxwZXJcclxuXHRnZXRRdWVyeVZhcmlhYmxlICh2YXJpYWJsZSkge1xyXG5cdFx0Y29uc3QgcGFyc2VkVXJsID0gbmV3IFVSTCggd2luZG93LmxvY2F0aW9uLmhyZWYgKTtcclxuXHRcdHJldHVybiBwYXJzZWRVcmwuc2VhcmNoUGFyYW1zLmdldCh2YXJpYWJsZSk7XHJcblx0fVxyXG5cclxuXHRzdGFydExpc3RlbmluZ1RvVmFyaWFibGVEZWNsYXJhdGlvblJlcXVlc3RzIChkZWNsYXJlVmFyaWFibGVDYWxsYmFjaykge1xyXG5cclxuXHRcdC8vIGxpc3RlbmVyIGZvciBwcm92aWRpbmcgaW5pdGlhbCB2YXJpYWJsZSBkYXRhIHNpZ25hbC5cclxuXHRcdHdpbmRvdy5hZGRFdmVudExpc3RlbmVyKFxyXG5cdFx0XHRcIm1lc3NhZ2VcIixcclxuXHRcdFx0KGV2ZW50KSA9PiB7XHJcblxyXG5cdFx0XHRcdHRyeSB7XHJcblx0XHRcdFx0XHRjb25zdCB7IGNhbGxJZCB9ID0gSlNPTi5wYXJzZShldmVudC5kYXRhKTtcclxuXHRcdFx0XHRcdGlmICggY2FsbElkICE9PSB1bmRlZmluZWQgJiYgY2FsbElkLmluY2x1ZGVzKFwiaW1wb3J0VmFyaWFibGVzXCIpICkge1xyXG5cdFx0XHRcdFx0XHRjb25zdCB2YXJpYWJsZXMgPSBkZWNsYXJlVmFyaWFibGVDYWxsYmFjaygpO1xyXG5cdFx0XHRcdFx0XHRjb25zdCBwYXNzX2RhdGEgPSB7XHJcblx0XHRcdFx0XHRcdFx0aW5pdGlhbFZhcmlhYmxlczogdmFyaWFibGVzLFxyXG5cdFx0XHRcdFx0XHRcdGNhbGxJZFxyXG5cdFx0XHRcdFx0XHR9XHJcblxyXG5cdFx0XHRcdFx0XHR3aW5kb3cucGFyZW50LnBvc3RNZXNzYWdlKCBKU09OLnN0cmluZ2lmeSggcGFzc19kYXRhICksICcqJyApO1xyXG5cdFx0XHRcdFx0fVxyXG5cdFx0XHRcdH0gY2F0Y2ggKGVycm9yKSB7XHJcblx0XHRcdFx0XHRpZiAoIHByb2Nlc3MuZW52Lk5PREVfRU5WICE9PSAncHJvZHVjdGlvbicgKSB7XHJcblx0XHRcdFx0XHRcdGNvbnNvbGUubG9nKFwiZXJyb3Igb24gZXh0ZXJuYWwgbGlzdGVuZXIgLSBcIiwgZXJyb3IpO1xyXG5cdFx0XHRcdFx0fVxyXG5cdFx0XHRcdH1cclxuXHRcdFx0fSxcclxuXHRcdFx0ZmFsc2UgKTtcclxuXHQgfVxyXG5cclxuXHQgZGVidWdPdXQgKHMpIHtcclxuXHRcdGlmICggcHJvY2Vzcy5lbnYuTk9ERV9FTlYgIT09ICdwcm9kdWN0aW9uJyApIHtcclxuXHJcblx0XHRcdC8vIGlmICggIXRoaXMuZGVidWdPdXRwdXQgKSB7XHJcblx0XHRcdC8vIFx0Y29uc3QgaGVpZ3RoPTIwMCwgd2lkdGg9NTAwO1xyXG5cdFx0XHQvLyBcdC8vIGRvY3VtZW50LmJvZHkuaW5uZXJIVE1MICs9IGA8ZGl2IGlkPVwiYndfRGVidWdPdXRwdXRcIiBzdHlsZT1cIndpZHRoOiR7d2lkdGh9cHg7aGVpZ2h0OiR7aGVpZ3RofXB4O3Bvc2l0aW9uOmFic29sdXRlO2JvdHRvbTowcHg7bGVmdDowcHg7ei1pbmRleDoxMDAwMDA7d2hpdGUtc3BhY2U6cHJlO2JvcmRlcjoxcHggc29saWQgYmxhY2s7YmFja2dyb3VuZDpsaWdodHllbGxvd1wiPjwvZGl2PmA7XHJcblx0XHRcdC8vIFx0Y29uc3QgZGl2ID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcIkRJVlwiKTtcclxuXHRcdFx0Ly8gXHRjb25zdCBzdCA9IHtcclxuXHRcdFx0Ly8gXHRcdHdpZHRoOmAke3dpZHRofXB4YCxcclxuXHRcdFx0Ly8gXHRcdGhlaWdodDpgJHtoZWlndGh9cHhgLFxyXG5cdFx0XHQvLyBcdFx0b3ZlcmZsb3c6XCJzY3JvbGxcIixcclxuXHRcdFx0Ly8gXHRcdHBvc2l0aW9uOlwiYWJzb2x1dGVcIixcclxuXHRcdFx0Ly8gXHRcdGJvdHRvbTpcIjBweFwiLFxyXG5cdFx0XHQvLyBcdFx0bGVmdDpcIjBweFwiLFxyXG5cdFx0XHQvLyBcdFx0XCJ6LWluZGV4XCI6MTAwMDAwLFxyXG5cdFx0XHQvLyBcdFx0XCJ3aGl0ZS1zcGFjZVwiOlwicHJlXCIsXHJcblx0XHRcdC8vIFx0XHRib3JkZXI6XCIxcHggc29saWQgYmxhY2tcIixcclxuXHRcdFx0Ly8gXHRcdGJhY2tncm91bmQ6XCJsaWdodHllbGxvd1wiLFxyXG5cdFx0XHQvLyBcdH1cclxuXHRcdFx0Ly8gXHRPYmplY3QuYXNzaWduKCBkaXYuc3R5bGUsIHN0ICk7XHJcblx0XHRcdC8vIFx0ZG9jdW1lbnQuYm9keS5hcHBlbmRDaGlsZChkaXYpO1xyXG5cdFx0XHQvLyBcdHRoaXMuZGVidWdPdXRwdXQgPSBkaXY7XHJcblx0XHRcdC8vIH1cclxuXHRcdFx0Ly8gdGhpcy5kZWJ1Z091dHB1dC5pbm5lckhUTUwgKz0gXCJcXG5cIitzO1xyXG5cdFx0XHQvLyB0aGlzLmRlYnVnT3V0cHV0LnNjcm9sbFRvcCA9IHRoaXMuZGVidWdPdXRwdXQuc2Nyb2xsSGVpZ2h0O1xyXG5cclxuXHRcdFx0Y29uc29sZS5sb2cocyk7XHJcblx0XHRcdC8vIGNvbnNvbGUudHJhY2UoKTtcclxuXHJcblx0XHR9XHJcblx0IH1cclxufVxyXG4iLCJpbXBvcnQgeyBpZ25vcmVFdmVudCB9IGZyb20gJy4vY29tbW9uJ1xyXG5cclxuaW1wb3J0IHsgdG9vbHRpcCB9IGZyb20gJy4vdG9vbHRpcCdcclxuXHJcbmltcG9ydCBLb252YSBmcm9tICdrb252YS9saWIvQ29yZSdcclxuaW1wb3J0IHsgUmVjdCB9IGZyb20gJ2tvbnZhL2xpYi9zaGFwZXMvUmVjdCdcclxuaW1wb3J0IHsgVGV4dCB9IGZyb20gJ2tvbnZhL2xpYi9zaGFwZXMvVGV4dCdcclxuaW1wb3J0IHsgSW1hZ2UgYXMga0ltYWdlIH0gZnJvbSAna29udmEvbGliL3NoYXBlcy9JbWFnZSdcclxuXHJcbmV4cG9ydCBjbGFzcyBpY29uQmFyIHtcclxuXHJcblx0Y29uc3RydWN0b3IgKCBzdGFnZSwgb3B0cyA9IHt9ICkge1xyXG5cclxuXHRcdC8vIE9wdGlvbnMgYW5kIGRlZmF1bHRzXHJcblx0XHRbJ2ljb25zJywneCcsJ3knLCd3aWR0aCcsJ2hlaWdodCddLmZvckVhY2goIG8gPT4ge1xyXG5cdFx0XHRpZiAoICEoIG8gaW4gb3B0cyApICkge1xyXG5cdFx0XHRcdHRocm93KCBgaWNvbkJhcjogcGFyYW1ldGVyICcke299JyBub3Qgc3BlY2lmaWVkIWAgKTtcclxuXHRcdFx0fVxyXG5cdFx0fSlcclxuXHRcdGNvbnN0IGRlZmF1bHRzID0ge1xyXG5cdFx0XHQvLyB4LCB5XHJcblx0XHRcdC8vIHdpZHRoLCBoZWlnaHRcdC8vIHcmaCBvZiBpY29uLCB0b3RhbCBkaW1lbnNpb24gKz0gMiooZnJhbWVXaWR0aCtmcmFtZVBhZGRpbmcpXHJcblx0XHRcdHNwYWNpbmc6IDUsXHJcblxyXG5cdFx0XHRmcmFtZUNvbG9yOiAnZ3JheScsXHJcblx0XHRcdGZyYW1lUGFkZGluZzogMixcclxuXHRcdFx0ZnJhbWVXaWR0aDogMSxcclxuXHRcdFx0ZnJhbWVGaWxsOiBudWxsLFxyXG5cclxuXHRcdFx0aGlnaGxpZ2h0Q29sb3I6ICcjRkZBOTlBJyxcclxuXHRcdFx0aGlnaGxpZ2h0RnJhbWU6ICcjOGMzNjI3JyxcclxuXHJcblx0XHRcdGRlZmF1bHQ6IG51bGwsIC8vIGluZGV4IG9mIGljb25cclxuXHRcdFx0YWN0aXZlOiBudWxsLFxyXG5cclxuXHRcdFx0Ly8gaWNvbnM6IFt7XHJcblx0XHRcdC8vIH1dXHJcblx0XHRcdHN0aWNreTogdHJ1ZSxcdC8vIGljb24gcmVtYWlucyBhY3RpdmUgYWZ0ZXIgbW91c2V1cC90b3VjaGVuZD9cclxuXHRcdFx0Ly9kaXNhYmxlZDogdHJ1ZSxcdC8vIGRpc2FibGUgd2hvbGUgYmFyXHJcblxyXG5cdFx0XHR0b29sVGlwRm9udFNpemU6IDEwLFxyXG5cdFx0XHR0b29sVGlwRmlsbDogJ3llbGxvdycsXHJcblxyXG5cdFx0XHRkaXJlY3Rpb246ICd2JyxcdC8vIHYgfCBoICh2ZXJ0aWNhbCB8IGhvcml6b250YWwgKVxyXG5cclxuXHRcdFx0c2hhcmVNb2Rlc1dpdGg6IG51bGwsXHRcdC8vIFtdIG9yIGZ1bmN0aW9uIHJldHVybmluZyBbXSBvZiBpY29uQmFycyB0aGF0IHNob3VsZCBiZSBkZWFjdGl2YXRlZCB3aGVuIGljb24gb2YgdGhpcyBpY29uQmFyIGlzIGFjdGl2YXRlZFxyXG5cclxuXHRcdFx0dXNlRXhpc3RpbmdJY29uQmFyTGF5ZXI6IHRydWUsXHQvLyBhcmUgYWxsIGljb25CYXJzIHBsYWNlZCBpbiBvbmUgbGF5ZXI/XHJcblx0XHRcdG1vdmVMYXllclRvVG9wOiB0cnVlLFxyXG5cclxuXHRcdFx0Ly8gaW5pdERvbmU6IDxQcm9taXNlPixcdFx0Ly8gd2lsbCBiZSBQcm9taXNlIHRoYXQgZnVsbGZpbGxlcyB3aGVuIGluaXQgaXMgY29tcGxldGVkXHJcblx0XHR9XHJcblx0XHRjb25zdCBkZWZhdWx0SWNvbiA9IHtcclxuXHRcdFx0Ly8gZXh0cmFTcGFjZTogXHQvLyBubyBpY29uLCBsZWF2ZSBleHRyYSBTcGFjZVxyXG5cclxuXHRcdFx0Ly8ga0NyZWF0ZUZ1bmM6IGZ1bmN0aW9uICh4LHksaWNvbkJhck9iailcdC8vIGZ1bmN0aW9uIHJldHVybnMgS09OVkEgT2JqZWN0fFtLT05WQSBPYmplY3RzXXxQcm9taXNlfFtQcm9taXNlc10gb24gY29vcmRzIHgsIHkgT1JcclxuXHRcdFx0Ly8gc3JjOiBzZXQgaW1hZ2Uuc3JjIE9SXHJcblx0XHRcdC8vIHRleHQ6IHRleHQgdG8gZGlzcGxheSAob2JqZWN0IHdpdGggb3B0aW9ucyBmb3IgS29udmEuVGV4dCh7fSkpXHJcblx0XHRcdHRvb2xUaXA6IG51bGwsXHJcblx0XHRcdGN1cnNvcjogbnVsbCxcdFx0Ly8gY3Vyc29yLCB3aGVuIGFjdGl2YXRlZFxyXG5cdFx0XHRjdXJzb3JPdmVyOiBudWxsLFx0Ly8gY3Vyc29yLCB3aGVuIFwibW91c2VvdmVyXCIsIGUuZy4gXCJ1cmwoaWNvbi5wbmcpIDE2IDE2LCBhdXRvXCJcclxuXHRcdFx0dG9vbHRpcEltYWdlOiBudWxsLFxyXG5cdFx0XHRvbjogKCkgPT4gMSxcclxuXHRcdFx0b2ZmOiAoKSA9PiAxLFxyXG5cdFx0fVxyXG5cdFx0Y29uc3QgZGVmYXVsdFRleHRPcHRpb25zID0ge1xyXG5cdFx0XHRhbGlnbjogJ2NlbnRlcicsXHJcblx0XHRcdHZlcnRpY2FsQWxpZ246ICdtaWRkbGUnLFxyXG5cdFx0XHRmb250U2l6ZTogMjAsXHJcblx0XHR9XHJcblx0XHRPYmplY3QuYXNzaWduKCB0aGlzLCBkZWZhdWx0cywgb3B0cyApO1xyXG5cdFx0dGhpcy5zdGFnZSA9IHN0YWdlO1xyXG5cdFx0Ly8gc2VhcmNoIGljb25CYXIgTGF5ZXIgb3JlIGNyZWF0ZSBuZXdcclxuXHRcdGlmICggdGhpcy51c2VFeGlzdGluZ0ljb25CYXJMYXllciApIHtcclxuXHRcdFx0Y29uc3QgbGF5ZXIgPSBzdGFnZS5nZXRBdHRyKCdid19fSWNvbkJhckxheWVyJyk7XHJcblx0XHRcdGlmICggbGF5ZXIgKSB7XHJcblx0XHRcdFx0dGhpcy5sYXllciA9IGxheWVyXHJcblx0XHRcdH0gZWxzZSB7XHJcblx0XHRcdFx0dGhpcy5sYXllciA9IG5ldyBLb252YS5MYXllcigpO1xyXG5cdFx0XHRcdHN0YWdlLmFkZCggdGhpcy5sYXllciApO1xyXG5cdFx0XHRcdHN0YWdlLnNldEF0dHIoICdid19fSWNvbkJhckxheWVyJywgdGhpcy5sYXllciApO1xyXG5cdFx0XHR9XHJcblx0XHR9IGVsc2Uge1xyXG5cdFx0XHR0aGlzLmxheWVyID0gbmV3IEtvbnZhLkxheWVyKCk7XHJcblx0XHRcdHN0YWdlLmFkZCggdGhpcy5sYXllciApO1xyXG5cdFx0fVxyXG5cdFx0aWYgKCB0aGlzLm1vdmVMYXllclRvVG9wICkge1xyXG5cdFx0XHR0aGlzLmxheWVyLm1vdmVUb1RvcCgpO1xyXG5cdFx0fVxyXG5cdFx0dGhpcy5rR3JvdXAgPSBuZXcgS29udmEuR3JvdXAoKTtcclxuXHRcdHRoaXMubGF5ZXIuYWRkKCB0aGlzLmtHcm91cCApO1xyXG5cclxuXHRcdC8vIEljb25zXHJcblx0XHRjb25zdCB3cCA9IHRoaXMuZnJhbWVXaWR0aCArIHRoaXMuZnJhbWVQYWRkaW5nO1xyXG5cdFx0bGV0IHggPSB0aGlzLngsIHkgPSB0aGlzLnk7XHJcblx0XHRjb25zdCBsb2FkUHJzID0gW107XHJcblx0XHR0aGlzLmljb25zLmZvckVhY2goIChpLG5yKSA9PiB7XHJcblxyXG5cdFx0XHRpZiAoIGkuZXh0cmFTcGFjZSApIHtcclxuXHJcblx0XHRcdFx0aWYgKCB0aGlzLmRpcmVjdGlvbj09J3YnICkge1xyXG5cdFx0XHRcdFx0eSArPSBpLmV4dHJhU3BhY2U9PT10cnVlID8gdGhpcy5oZWlnaHQgKyAyKndwIDogaS5leHRyYVNwYWNlO1xyXG5cdFx0XHRcdH0gZWxzZSB7XHJcblx0XHRcdFx0XHR4ICs9IGkuZXh0cmFTcGFjZT09PXRydWUgPyB0aGlzLndpZHRoICsgMip3cDogaS5leHRyYVNwYWNlO1xyXG5cdFx0XHRcdH1cclxuXHJcblx0XHRcdH0gZWxzZSB7XHJcblx0XHRcdFx0Ly8gaSBpcyBhbHRlcmVkIVxyXG5cclxuXHRcdFx0XHRpID0gT2JqZWN0LmFzc2lnbigge30sIGRlZmF1bHRJY29uLCBpICk7XHJcblx0XHRcdFx0Ly8gaW1hZ2UtdG9vbHRpcD9cclxuXHRcdFx0XHRpZiAoIGkudG9vbHRpcEltYWdlICYmICF0aGlzLnRvb2x0aXAgKSB7XHJcblx0XHRcdFx0XHR0aGlzLnRvb2x0aXAgPSBuZXcgdG9vbHRpcCh0aGlzLnN0YWdlKTtcclxuXHRcdFx0XHRcdHRoaXMuc3RhZ2Uub24oICdtb3VzZWxlYXZlJywgKGV2KSA9PiB7XHJcblx0XHRcdFx0XHRcdGlmICggaWdub3JlRXZlbnQoIHRoaXMuc3RhZ2UsIGV2ICkgKSB7XHJcblx0XHRcdFx0XHRcdFx0cmV0dXJuO1xyXG5cdFx0XHRcdFx0XHR9XHJcblx0XHRcdFx0XHRcdHRoaXMudG9vbHRpcC5oaWRlKClcclxuXHRcdFx0XHQgXHR9KVxyXG5cdFx0XHRcdH1cclxuXHJcblx0XHRcdFx0Ly8gZnJhbWVcclxuXHRcdFx0XHRpZiAoIHRoaXMuZnJhbWVXaWR0aCB8fCB0aGlzLmZyYW1lRmlsbCB8fCB0aGlzLmhpZ2hsaWdodENvbG9yICkge1xyXG5cdFx0XHRcdFx0aS5rRnJhbWUgPSBuZXcgS29udmEuUmVjdCh7XHJcblx0XHRcdFx0XHRcdHgsIHksXHJcblx0XHRcdFx0XHRcdHdpZHRoOiB0aGlzLndpZHRoICsgMip3cCxcclxuXHRcdFx0XHRcdFx0aGVpZ2h0OiB0aGlzLmhlaWdodCArIDIqd3AsXHJcblx0XHRcdFx0XHRcdHN0cm9rZTogdGhpcy5mcmFtZUNvbG9yLFxyXG5cdFx0XHRcdFx0XHRzdHJva2VXaWR0aDogdGhpcy5mcmFtZVdpZHRoLFxyXG5cdFx0XHRcdFx0XHRmaWxsOiB0aGlzLmZyYW1lRmlsbCxcclxuXHRcdFx0XHRcdFx0ZG9udEdyYXlPdXQ6IHRydWUsXHJcblx0XHRcdFx0XHR9KTtcclxuXHRcdFx0XHRcdHRoaXMua0dyb3VwLmFkZCggaS5rRnJhbWUgKTtcclxuXHRcdFx0XHR9XHJcblxyXG5cdFx0XHRcdC8vIGRyYXcgS09OVkEgb2JqZWN0P1xyXG5cdFx0XHRcdGlmICggaS5rQ3JlYXRlRnVuYyApIHtcclxuXHRcdFx0XHRcdGNvbnN0IGtHcm91cCA9IHRoaXMua0dyb3VwO1xyXG5cdFx0XHRcdFx0Y29uc3QgcmVzID0gaS5rQ3JlYXRlRnVuYyggeCArIHdwLCB5ICsgd3AsIHRoaXMgKTtcclxuXHRcdFx0XHRcdGxvYWRQcnMucHVzaChcclxuXHRcdFx0XHRcdFx0UHJvbWlzZVxyXG5cdFx0XHRcdFx0XHRcdC5hbGwoIEFycmF5LmlzQXJyYXkocmVzKSA/IHJlcyA6IFtyZXNdIClcclxuXHRcdFx0XHRcdFx0XHQudGhlbigga09ianMgPT4ga09ianMuZm9yRWFjaCgga09iaiA9PiB7XHJcblx0XHRcdFx0XHRcdFx0XHRpZiAoIGtPYmogKSB7XHJcblx0XHRcdFx0XHRcdFx0XHRcdGtHcm91cC5hZGQoIGtPYmogKTtcclxuXHRcdFx0XHRcdFx0XHRcdH1cclxuXHRcdFx0XHRcdFx0XHRcdGlmICggaS5rSWNvbiApIHtcclxuXHRcdFx0XHRcdFx0XHRcdFx0aS5rSWNvbi5tb3ZlVG9Ub3AoKTtcclxuXHRcdFx0XHRcdFx0XHRcdH1cclxuXHRcdFx0XHRcdFx0fSkpXHJcblx0XHRcdFx0XHQpXHJcblx0XHRcdFx0fVxyXG5cclxuXHRcdFx0XHQvLyBpY29uXHJcblx0XHRcdFx0Y29uc3QgcmVjdEF0dHIgPSB7XHJcblx0XHRcdFx0XHR3aWR0aDogdGhpcy53aWR0aCxcclxuXHRcdFx0XHRcdGhlaWdodDogdGhpcy5oZWlnaHQsXHJcblx0XHRcdFx0XHR4OiB4ICsgd3AsXHJcblx0XHRcdFx0XHR5OiB5ICsgd3AsXHJcblx0XHRcdFx0fTtcclxuXHJcblxyXG5cdFx0XHRcdC8vIGludGVyYWN0aXZpdHlcclxuXHRcdFx0XHRjb25zdCBzZXRJbnRlcmFjdCA9IChrT2JqKSA9PiB7XHJcblx0XHRcdFx0XHRrT2JqLm9uKCAnbW91c2Vkb3duIHRvdWNoc3RhcnQnLCAoZXYpID0+IHtcclxuXHRcdFx0XHRcdFx0aWYgKCAhdGhpcy5kaXNhYmxlZCApIHtcclxuXHRcdFx0XHRcdFx0XHRldi5jYW5jZWxCdWJibGUgPSB0cnVlO1xyXG5cdFx0XHRcdFx0XHRcdGlmICggZXYuZXZ0ICkge1x0XHQvLyBldi5ldnQgbWlnaHQgbm90IGJlIHByZXNlbnQgKGUuZy4gZHVyaW5nIGRlbW9BbmltYXRpb24pXHJcblx0XHRcdFx0XHRcdFx0XHRldi5ldnQucHJldmVudERlZmF1bHQoKTtcdC8vIGUuZy4gbm8gYmx1ciBpbiBpbnB1dCBmaWVsZHNcclxuXHRcdFx0XHRcdFx0XHRcdGV2LmV2dC5zdG9wUHJvcGFnYXRpb24oKTtcclxuXHRcdFx0XHRcdFx0XHR9XHJcblx0XHRcdFx0XHRcdFx0dGhpcy5jbGlja09uKCBuciwgZXYgKTtcclxuXHRcdFx0XHRcdFx0fVxyXG5cdFx0XHRcdFx0fSk7XHJcblx0XHRcdFx0XHRrT2JqLm9uKCAnY2xpY2sgdGFwJywgKGV2KSA9PiB7XHJcblx0XHRcdFx0XHRcdGlmICggIXRoaXMuZGlzYWJsZWQgKSB7XHJcblx0XHRcdFx0XHRcdFx0ZXYuY2FuY2VsQnViYmxlID0gdHJ1ZTtcclxuXHRcdFx0XHRcdFx0XHRpZiAoIGV2LmV2dCApIHtcdFx0Ly8gZXYuZXZ0IG1pZ2h0IG5vdCBiZSBwcmVzZW50IChlLmcuIGR1cmluZyBkZW1vQW5pbWF0aW9uKVxyXG5cdFx0XHRcdFx0XHRcdFx0ZXYuZXZ0LnByZXZlbnREZWZhdWx0KCk7XHQvLyBlLmcuIG5vIGJsdXIgaW4gaW5wdXQgZmllbGRzXHJcblx0XHRcdFx0XHRcdFx0XHRldi5ldnQuc3RvcFByb3BhZ2F0aW9uKCk7XHJcblx0XHRcdFx0XHRcdFx0fVxyXG5cdFx0XHRcdFx0XHR9XHJcblx0XHRcdFx0XHR9KTtcclxuXHRcdFx0XHRcdGlmICggIXRoaXMuc3RpY2t5ICkge1xyXG5cdFx0XHRcdFx0XHRrT2JqLm9uKCAnbW91c2V1cCB0b3VjaGVuZCBtb3VzZWxlYXZlJywgKGV2KSA9PiB7XHJcblx0XHRcdFx0XHRcdFx0aWYgKCBpZ25vcmVFdmVudCggdGhpcy5zdGFnZSwgZXYgKSApIHtcclxuXHRcdFx0XHRcdFx0XHRcdHJldHVybjtcclxuXHRcdFx0XHRcdFx0XHR9XHJcblx0XHRcdFx0XHRcdFx0dGhpcy5kZWFjdGl2YXRlKCBldiApO1xyXG5cdFx0XHRcdFx0IFx0fSk7XHJcblx0XHRcdFx0XHR9XHJcblx0XHRcdFx0XHRpZiAoIGkuY3Vyc29yT3ZlciApIHtcclxuXHRcdFx0XHRcdFx0a09iai5vbiggJ21vdXNlZW50ZXInLCAoKSA9PiB7XHJcblx0XHRcdFx0XHRcdFx0aWYgKCAhdGhpcy5kaXNhYmxlZCApIHtcclxuXHRcdFx0XHRcdFx0XHRcdHRoaXMuY3Vyc29yU2F2ZWQgPSBkb2N1bWVudC5ib2R5LnN0eWxlLmN1cnNvcjtcclxuXHRcdFx0XHRcdFx0XHRcdGRvY3VtZW50LmJvZHkuc3R5bGUuY3Vyc29yID0gaS5jdXJzb3JPdmVyO1xyXG5cdFx0XHRcdFx0XHRcdFx0dGhpcy5jdXJzb3JTZXQgPSBkb2N1bWVudC5ib2R5LnN0eWxlLmN1cnNvcjtcclxuXHRcdFx0XHRcdFx0XHR9XHJcblx0XHRcdFx0XHRcdH0pO1xyXG5cdFx0XHRcdFx0XHRrT2JqLm9uKCAnbW91c2VsZWF2ZScsIChldikgPT4ge1xyXG5cdFx0XHRcdFx0XHRcdGlmICggIXRoaXMuZGlzYWJsZWQgKSB7XHJcblx0XHRcdFx0XHRcdFx0XHRpZiAoIGlnbm9yZUV2ZW50KCB0aGlzLnN0YWdlLCBldiApICkge1xyXG5cdFx0XHRcdFx0XHRcdFx0XHRyZXR1cm47XHJcblx0XHRcdFx0XHRcdFx0XHR9XHJcblx0XHRcdFx0XHRcdFx0XHRpZiAoIGRvY3VtZW50LmJvZHkuc3R5bGUuY3Vyc29yID09IHRoaXMuY3Vyc29yU2V0ICkge1xyXG5cdFx0XHRcdFx0XHRcdFx0XHRkb2N1bWVudC5ib2R5LnN0eWxlLmN1cnNvciA9IHRoaXMuY3Vyc29yU2F2ZWRcclxuXHRcdFx0XHRcdFx0XHRcdFx0dGhpcy5jdXJzb3JTZXQgPSBudWxsO1xyXG5cdFx0XHRcdFx0XHRcdFx0fVxyXG5cdFx0XHRcdFx0XHRcdH1cclxuXHRcdFx0XHRcdFx0fSk7XHJcblx0XHRcdFx0XHR9XHJcblx0XHRcdFx0XHRpZiAoIGkudG9vbHRpcEltYWdlICkge1xyXG5cdFx0XHRcdFx0XHRrT2JqLm9uKCAnbW91c2VlbnRlcicsICgpID0+IHRoaXMudG9vbHRpcC5zaG93SW1hZ2UoIGkudG9vbHRpcEltYWdlICkgKTtcclxuXHRcdFx0XHRcdFx0a09iai5vbiggJ21vdXNlbGVhdmUnLCAoZXYpID0+IHtcclxuXHRcdFx0XHRcdFx0XHRpZiAoIGlnbm9yZUV2ZW50KCB0aGlzLnN0YWdlLCBldiApICkge1xyXG5cdFx0XHRcdFx0XHRcdFx0cmV0dXJuO1xyXG5cdFx0XHRcdFx0XHRcdH1cclxuXHRcdFx0XHRcdFx0XHR0aGlzLnRvb2x0aXAuaGlkZSgpO1xyXG5cdFx0XHRcdFx0XHR9KTtcclxuXHRcdFx0XHRcdH1cclxuXHRcdFx0XHR9XHJcblxyXG5cdFx0XHRcdGlmICggaS5zcmMgKSB7XHJcblx0XHRcdFx0XHQvLyBjcmVhdGUgaW1hZ2VcclxuXHRcdFx0XHRcdGNvbnN0IG1lID0gdGhpcztcclxuXHRcdFx0XHRcdGNvbnN0IGltYWdlID0gbmV3IEltYWdlKCk7XHJcblx0XHRcdFx0XHRjb25zdCBwciA9IG5ldyBQcm9taXNlKCByZXMgPT4ge1xyXG5cdFx0XHRcdFx0XHRpbWFnZS5vbmxvYWQgPSByZXM7XHJcblx0XHRcdFx0XHRcdGltYWdlLnNyYyA9IGkuc3JjO1xyXG5cdFx0XHRcdFx0fSk7XHJcblx0XHRcdFx0XHRsb2FkUHJzLnB1c2goXHJcblx0XHRcdFx0XHRcdHByLnRoZW4oICgpID0+IHtcclxuXHRcdFx0XHRcdFx0XHRpLmtJY29uID0gbmV3IEtvbnZhLkltYWdlKCBPYmplY3QuYXNzaWduKCB7IGltYWdlIH0sIHJlY3RBdHRyICkgKTtcclxuXHRcdFx0XHRcdFx0XHRtZS5pY29uc1tucl0ua0ljb24gPSBpLmtJY29uO1xyXG5cclxuXHRcdFx0XHRcdFx0XHRzZXRJbnRlcmFjdCggaS5rSWNvbiApO1xyXG5cdFx0XHRcdFx0XHRcdG1lLmtHcm91cC5hZGQoIGkua0ljb24gKTtcclxuXHRcdFx0XHRcdFx0fSlcclxuXHRcdFx0XHRcdCk7XHJcblxyXG5cdFx0XHRcdH0gZWxzZSBpZiAoIGkudGV4dCApIHtcclxuXHRcdFx0XHRcdC8vIHRleHQgYXMgaWNvbiBnaXZlbj9cclxuXHRcdFx0XHRcdGkua0ljb24gPSBuZXcgS29udmEuVGV4dCggT2JqZWN0LmFzc2lnbigge30sIGRlZmF1bHRUZXh0T3B0aW9ucywgaS50ZXh0LCByZWN0QXR0ciApKTtcclxuXHJcblx0XHRcdFx0XHRzZXRJbnRlcmFjdCggaS5rSWNvbiApO1xyXG5cdFx0XHRcdFx0dGhpcy5rR3JvdXAuYWRkKCBpLmtJY29uICk7XHJcblxyXG5cdFx0XHRcdH0gZWxzZSB7XHJcblx0XHRcdFx0XHQvLyBubyBpbWFnZS5zcmMgLT4gZHJhdyBpbnZpc2libGUgcmVjdGFuZ2xlXHJcblx0XHRcdFx0XHQvLyAoaGl0IGFyZWEgZS5nLiBmb3IgaWNvbiBjcmVhdGVkIGJ5IGtDcmVhdGVGdW5jKCkpXHJcblx0XHRcdFx0XHRpLmtJY29uID0gbmV3IEtvbnZhLlJlY3QoIE9iamVjdC5hc3NpZ24oIHt9LCByZWN0QXR0ciwge1xyXG5cdFx0XHRcdFx0XHRmaWxsOiAnd2hpdGUnLFxyXG5cdFx0XHRcdFx0XHRvcGFjaXR5OiAwLFxyXG5cdFx0XHRcdFx0XHRkb250R3JheU91dDogdHJ1ZSxcclxuXHRcdFx0XHRcdH0gKSk7XHJcblxyXG5cdFx0XHRcdFx0c2V0SW50ZXJhY3QoIGkua0ljb24gKTtcclxuXHRcdFx0XHRcdHRoaXMua0dyb3VwLmFkZCggaS5rSWNvbiApO1xyXG5cdFx0XHRcdH1cclxuXHJcblx0XHRcdFx0Ly8gZ2V0IHBvc2l0aW9uIGZvciBuZXh0IGljb25cclxuXHRcdFx0XHQvLyBjb25zdCBvZmZzID0gbnIqKCB0aGlzLnNwYWNpbmcgKyB0aGlzLmhlaWdodCsyKndwICk7XHJcblx0XHRcdFx0aWYgKCB0aGlzLmRpcmVjdGlvbj09J3YnICkge1xyXG5cdFx0XHRcdFx0eSArPSB0aGlzLnNwYWNpbmcgKyB0aGlzLmhlaWdodCArIDIqd3A7XHJcblx0XHRcdFx0fSBlbHNlIHtcclxuXHRcdFx0XHRcdHggKz0gdGhpcy5zcGFjaW5nICsgdGhpcy53aWR0aCArIDIqd3A7XHJcblx0XHRcdFx0fVxyXG5cclxuXHRcdFx0XHR0aGlzLmljb25zW25yXSA9IGk7XHJcblx0XHRcdH1cclxuXHRcdH0pXHJcblxyXG5cdFx0Y29uc3QgbWUgPSB0aGlzO1xyXG5cdFx0dGhpcy5pbml0RG9uZSA9IFByb21pc2UuYWxsKCBsb2FkUHJzIClcclxuXHRcdFx0LnRoZW4oICgpID0+IHtcclxuXHRcdFx0XHRtZS5zZXREZWZhdWx0KCk7XHJcblx0XHRcdFx0bWUubGF5ZXIuZHJhdygpO1xyXG5cdFx0XHR9KTtcclxuXHR9XHJcblxyXG5cdC8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vXHJcblxyXG5cdGdldE92ZXJhbGxIZWlnaHQgKCkge1xyXG5cdFx0cmV0dXJuIHRoaXMuZGlyZWN0aW9uPT0ndicgP1xyXG5cdFx0XHR0aGlzLmljb25zLmxlbmd0aCAqICggdGhpcy5zcGFjaW5nICsgdGhpcy5oZWlnaHQgKyAyKiggdGhpcy5mcmFtZVdpZHRoICsgdGhpcy5mcmFtZVBhZGRpbmcgKSApIC0gdGhpcy5zcGFjaW5nIDpcclxuXHRcdFx0dGhpcy5oZWlnaHQgKyAyKiggdGhpcy5mcmFtZVdpZHRoICsgdGhpcy5mcmFtZVBhZGRpbmcgKTtcclxuXHR9XHJcblxyXG5cdGdldE92ZXJhbGxXaWR0aCAoKSB7XHJcblx0XHRyZXR1cm4gdGhpcy5kaXJlY3Rpb249PSd2JyA/XHJcblx0XHRcdHRoaXMud2lkdGggKyAyKiggdGhpcy5mcmFtZVdpZHRoICsgdGhpcy5mcmFtZVBhZGRpbmcgKSA6XHJcblx0XHRcdHRoaXMuaWNvbnMubGVuZ3RoICogKCB0aGlzLnNwYWNpbmcgKyB0aGlzLndpZHRoICsgMiooIHRoaXMuZnJhbWVXaWR0aCArIHRoaXMuZnJhbWVQYWRkaW5nICkgKSAtIHRoaXMuc3BhY2luZztcclxuXHR9XHJcblxyXG5cdC8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vXHJcblxyXG5cdHNldERlZmF1bHQgKCkge1xyXG5cdFx0aWYgKCAhdGhpcy5kaXNhYmxlZCAmJiB0aGlzLmRlZmF1bHQhPT1udWxsICYmIHRoaXMuc3RpY2t5ICkge1xyXG5cdFx0XHR0aGlzLmNsaWNrT24oIHRoaXMuZGVmYXVsdCApO1xyXG5cdFx0fVxyXG5cdH1cclxuXHJcblx0Y2xpY2tPbiAoIGluZGV4LCBldiApIHtcclxuXHRcdGNvbnN0IHNhdmVkX2FjdGl2ZSA9IHRoaXMuYWN0aXZlO1xyXG5cdFx0dGhpcy5kZWFjdGl2YXRlKCk7XHJcblx0XHRpZiAoIHRoaXMuc2hhcmVNb2Rlc1dpdGggKSB7XHJcblx0XHRcdGNvbnN0IGFyID0gdHlwZW9mIHRoaXMuc2hhcmVNb2Rlc1dpdGggPT09ICdmdW5jdGlvbicgPyB0aGlzLnNoYXJlTW9kZXNXaXRoKCkgOiB0aGlzLnNoYXJlTW9kZXNXaXRoO1xyXG5cdFx0XHRhci5mb3JFYWNoKCBpY29uQmFyID0+IHtcclxuXHRcdFx0XHRpZiAoIGljb25CYXIgJiYgaWNvbkJhciE9dGhpcyApIHtcclxuXHRcdFx0XHRcdGljb25CYXIuZGVhY3RpdmF0ZSgpO1xyXG5cdFx0XHRcdH1cclxuXHRcdFx0fSlcclxuXHRcdH1cclxuXHRcdGlmICggc2F2ZWRfYWN0aXZlPT09bnVsbCB8fCBzYXZlZF9hY3RpdmUhPWluZGV4ICkge1xyXG5cdFx0XHR0aGlzLmFjdGl2YXRlKCBpbmRleCwgZXYgKTtcclxuXHRcdH1cclxuXHR9XHJcblxyXG5cdGRlYWN0aXZhdGUgKCkge1xyXG5cdFx0aWYgKCB0aGlzLmFjdGl2ZSE9PW51bGwgKSB7XHJcblx0XHRcdGNvbnN0IGljb24gPSB0aGlzLmljb25zWyB0aGlzLmFjdGl2ZSBdO1xyXG5cdFx0XHRpZiAoIGljb24ua0ZyYW1lICkge1xyXG5cdFx0XHRcdGljb24ua0ZyYW1lLmZpbGwoIHRoaXMuZnJhbWVGaWxsICk7XHJcblx0XHRcdFx0aWNvbi5rRnJhbWUuc3Ryb2tlKCB0aGlzLmZyYW1lQ29sb3IgKTtcclxuXHRcdFx0fVxyXG5cdFx0XHR0aGlzLmxheWVyLmJhdGNoRHJhdygpO1xyXG5cclxuXHRcdFx0aWYgKCBpY29uLm9mZiApIHtcclxuXHRcdFx0XHRpY29uLm9mZigpO1xyXG5cdFx0XHR9XHJcblxyXG5cdFx0XHRpZiAoIGljb24uY3Vyc29yICkge1xyXG5cdFx0XHRcdGRvY3VtZW50LmJvZHkuc3R5bGUuY3Vyc29yID0gXCJkZWZhdWx0XCI7XHJcblx0XHRcdH1cclxuXHRcdFx0dGhpcy5hY3RpdmUgPSBudWxsO1xyXG5cdFx0fVxyXG5cdH1cclxuXHJcblx0YWN0aXZhdGUgKCBpbmRleCwgZXYgKSB7XHJcblx0XHRjb25zdCBpY29uID0gdGhpcy5pY29uc1tpbmRleF07XHJcblx0XHRpZiAoIGljb24ua0ZyYW1lICkge1xyXG5cdFx0XHRpY29uLmtGcmFtZS5maWxsKCB0aGlzLmhpZ2hsaWdodENvbG9yICk7XHJcblx0XHRcdGljb24ua0ZyYW1lLnN0cm9rZSggdGhpcy5oaWdobGlnaHRGcmFtZSApO1xyXG5cdFx0fVxyXG5cdFx0dGhpcy5sYXllci5iYXRjaERyYXcoKTtcclxuXHJcblx0XHR0aGlzLmFjdGl2ZSA9IGluZGV4O1xyXG5cdFx0aWYgKCBpY29uLm9uICkge1xyXG5cdFx0XHRpY29uLm9uKGV2KTtcclxuXHRcdH1cclxuXHJcblx0XHRpZiAoIGljb24uY3Vyc29yICkge1xyXG5cdFx0XHRkb2N1bWVudC5ib2R5LnN0eWxlLmN1cnNvciA9IGljb24uY3Vyc29yO1xyXG5cdFx0fVxyXG5cdH1cclxuXHJcblx0aXNBY3RpdmUgKCBpbmRleCApIHtcclxuXHRcdHJldHVybiB0aGlzLmFjdGl2ZSA9PT0gaW5kZXg7XHJcblx0fVxyXG5cclxuXHQvLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vL1xyXG5cclxuXHRkaXNhYmxlQmFyICggZGlzYWJsZWQ9dHJ1ZSApIHtcclxuXHRcdHRoaXMuZGlzYWJsZWQgPSBkaXNhYmxlZDtcclxuXHRcdGlmICggZGlzYWJsZWQgKSB7XHJcblx0XHRcdHRoaXMuZGVhY3RpdmF0ZSgpO1xyXG5cdFx0fVxyXG5cdH1cclxuXHJcblx0aGlkZUJhciAoIGhpZGRlbj10cnVlICkge1xyXG5cdFx0dGhpcy5kaXNhYmxlQmFyKCBoaWRkZW4gKTtcclxuXHRcdHRoaXMua0dyb3VwLnZpc2libGUoICFoaWRkZW4gKTtcclxuXHRcdHRoaXMubGF5ZXIuYmF0Y2hEcmF3KCk7XHJcblx0fVxyXG5cclxuXHRkZXN0cm95ICgpIHtcclxuXHRcdHRoaXMua0dyb3VwLmRlc3Ryb3koKTtcclxuXHRcdGlmICggIXRoaXMudXNlRXhpc3RpbmdJY29uQmFyTGF5ZXIgKSB7XHJcblx0XHRcdHRoaXMubGF5ZXIuZGVzdHJveSgpO1xyXG5cdFx0fVxyXG5cdH1cclxufVxyXG4iLCJpbXBvcnQgeyBtZXJnZURlZXAgfSBmcm9tICcuL2NvbW1vbidcclxuXHJcbmltcG9ydCB7IGFkZEZyZWVQYWludFRvIH0gZnJvbSAnLi9jbGFzc19leHRlbnNpb25zJ1xyXG5cclxuaW1wb3J0IEtvbnZhIGZyb20gJ2tvbnZhL2xpYi9Db3JlJ1xyXG5pbXBvcnQgeyBSZWN0IH0gZnJvbSAna29udmEvbGliL3NoYXBlcy9SZWN0J1xyXG5cclxuZXhwb3J0IGNsYXNzIHJlY3RBcmVhIHtcclxuXHJcblx0Y29uc3RydWN0b3IgKCBiYXNlLCBvcHRzID0ge30gKSB7XHJcblxyXG5cdFx0Wyd4JywneScsJ3dpZHRoJywnaGVpZ2h0J10uZm9yRWFjaCggbyA9PiB7XHJcblx0XHRcdGlmICggISggbyBpbiBvcHRzICkgKSB7XHJcblx0XHRcdFx0dGhyb3coIGBhcmVhOiBwYXJhbWV0ZXIgJyR7b30nIG5vdCBzcGVjaWZpZWQhYCApO1xyXG5cdFx0XHR9XHJcblx0XHR9KVxyXG5cdFx0Ly8gRGVmYXVsdHMgdG8gb3B0c1xyXG5cdFx0Y29uc3QgZGVmYXVsdE9wdHMgPSB7XHJcblxyXG5cdFx0XHQvLyAvLyBwYWludEFyZWFcclxuXHRcdFx0Ly8geCwgeVxyXG5cdFx0XHQvLyB3aWR0aCwgaGVpZ2h0XHJcblx0XHRcdGZyYW1lV2lkdGg6IDEsXHJcblx0XHRcdGZyYW1lQ29sb3I6ICdibGFjaycsXHJcblxyXG5cdFx0fVxyXG5cdFx0bWVyZ2VEZWVwKCBPYmplY3QuYXNzaWduKCB0aGlzLCBkZWZhdWx0T3B0cyApLCBvcHRzICk7XHJcblx0XHR0aGlzLmJhc2UgPSBiYXNlO1xyXG5cdFx0Y29uc3Qgc3RhZ2UgPSBiYXNlLnN0YWdlO1xyXG5cdFx0dGhpcy5zdGFnZSA9IHN0YWdlO1xyXG5cclxuXHRcdC8vIEluaXQgcGFpbnRBcmVhXHJcblx0XHRpZiAoIHRoaXMuZnJhbWVDb2xvciAmJiB0aGlzLmZyYW1lV2lkdGggKSB7XHJcblx0XHRcdHRoaXMubGF5ZXIgPSBuZXcgS29udmEuTGF5ZXIoKTtcclxuXHRcdFx0c3RhZ2UuYWRkKCB0aGlzLmxheWVyICk7XHJcblxyXG5cdFx0XHRjb25zdCByZWN0T3B0cyA9IHtcclxuXHRcdFx0XHR4OiB0aGlzLngsIHk6IHRoaXMueSxcclxuXHRcdFx0XHR3aWR0aDogdGhpcy53aWR0aCwgaGVpZ2h0OiB0aGlzLmhlaWdodCxcclxuXHRcdFx0XHRzdHJva2U6IHRoaXMuZnJhbWVDb2xvcixcclxuXHRcdFx0XHRzdHJva2VXaWR0aDogdGhpcy5mcmFtZVdpZHRoLFxyXG5cdFx0XHRcdGZpbGw6IHRoaXMuZmlsbCxcclxuXHRcdFx0fVxyXG5cdFx0XHR0aGlzLmtSZWN0ID0gbmV3IEtvbnZhLlJlY3QoIHJlY3RPcHRzICk7XHJcblx0XHRcdHRoaXMubGF5ZXIuYWRkKCB0aGlzLmtSZWN0ICk7XHJcblxyXG5cdFx0XHR0aGlzLmxheWVyLmRyYXcoKTtcclxuXHRcdH1cclxuXHR9XHJcblxyXG5cdC8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vXHJcblxyXG5cdC8vIGNsaXAgdG8gcmVjdGFuZ2xlIGJ5IGRlZmF1bHRcclxuXHRmcmVlUGFpbnRNYXJrZXJDbGlwRnVuYyAoY3R4KSB7XHJcblx0XHRjdHgucmVjdCggdGhpcy54K3RoaXMuZnJhbWVXaWR0aCowLjUsIHRoaXMueSt0aGlzLmZyYW1lV2lkdGgqMC41LCB0aGlzLndpZHRoLXRoaXMuZnJhbWVXaWR0aCwgdGhpcy5oZWlnaHQtdGhpcy5mcmFtZVdpZHRoICk7XHJcblx0fVxyXG5cclxuXHQvLyBjbGlwIHRvIHJlY3RhbmdsZSBieSBkZWZhdWx0XHJcblx0ZnJlZVBhaW50QnJ1c2hDbGlwRnVuYyAoY3R4KSB7XHJcblx0XHRjdHgucmVjdCggdGhpcy54K3RoaXMuZnJhbWVXaWR0aCowLjUsIHRoaXMueSt0aGlzLmZyYW1lV2lkdGgqMC41LCB0aGlzLndpZHRoLXRoaXMuZnJhbWVXaWR0aCwgdGhpcy5oZWlnaHQtdGhpcy5mcmFtZVdpZHRoICk7XHJcblx0fVxyXG5cclxuXHQvLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vL1xyXG5cclxuXHRnZXRTdGF0ZSAoKSB7XHJcblx0XHRyZXR1cm4gJ3t9JztcclxuXHR9XHJcblxyXG5cdHNldFN0YXRlICgpIHtcclxuXHR9XHJcblxyXG5cdC8vIENoZWNrIGlmIFVzZXIgbWFkZSBjaGFuZ2VzXHJcblx0Z2V0RGVmYXVsdENoYW5nZVN0YXRlICgpIHtcclxuXHRcdHJldHVybiBmYWxzZTtcclxuXHR9XHJcblxyXG5cdGdldENoU3RhdGUgKCkge1xyXG5cdFx0cmV0dXJuIHt9O1xyXG5cdH1cclxuXHJcbn1cclxuXHJcbi8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vL1xyXG5cclxuZXhwb3J0IGNvbnN0IHJlY3RBcmVhX2ZyZWVQYWludCA9IGFkZEZyZWVQYWludFRvKCByZWN0QXJlYSwgMSwgMCApO1xyXG5cclxuZXhwb3J0IGNvbnN0IHJlY3RBcmVhX2ZyZWVQYWludE1hcmtlciA9IGFkZEZyZWVQYWludFRvKCByZWN0QXJlYSwgMSwgMSApO1xyXG4iLCJpbXBvcnQgeyBnZXRBYnNQb3NpdGlvbiwgaWdub3JlRXZlbnQgfSBmcm9tICcuL2NvbW1vbidcclxuXHJcbmltcG9ydCBLb252YSBmcm9tICdrb252YS9saWIvQ29yZSdcclxuaW1wb3J0IHsgUmVjdCB9IGZyb20gJ2tvbnZhL2xpYi9zaGFwZXMvUmVjdCdcclxuaW1wb3J0IHsgVGV4dCB9IGZyb20gJ2tvbnZhL2xpYi9zaGFwZXMvVGV4dCdcclxuXHJcbmV4cG9ydCBjbGFzcyB0ZXh0RnJhbWUge1xyXG5cclxuXHRjb25zdHJ1Y3RvciggYmFzZSwgbGF5ZXIsIG9wdHMgPSB7fSApIHtcclxuXHJcblx0XHQvLyBPcHRpb25zIGFuZCBkZWZhdWx0c1xyXG5cdFx0Wyd2YWx1ZScsJ3gnLCd5J10uZm9yRWFjaCggbyA9PiB7XHJcblx0XHRcdGlmICggISggbyBpbiBvcHRzICkgKSB7XHJcblx0XHRcdFx0dGhyb3coIGB0ZXh0RnJhbWU6IHBhcmFtZXRlciAnJHtvfScgbm90IHNwZWNpZmllZCFgICk7XHJcblx0XHRcdH1cclxuXHRcdH0pXHJcblx0XHRjb25zdCBkZWZhdWx0T3B0cyA9IHtcclxuXHRcdFx0d2lkdGg6IDc1LCBoZWlnaHQ6IDI1LFxyXG5cdFx0XHRhbGlnbjogJ2NlbnRlcicsXHJcblx0XHRcdGZvbnRTaXplOiAyMCxcclxuXHRcdFx0YmFja2dyb3VuZFJlYWRvbmx5OiBudWxsLFxyXG5cdFx0XHRiYWNrZ3JvdW5kRWRpdGFibGU6ICdsaWdodHllbGxvdycsXHJcblx0XHRcdGJhY2tncm91bmRFZGl0OiAneWVsbG93JyxcclxuXHRcdFx0ZnJhbWVXaWR0aDogMSxcclxuXHRcdFx0ZnJhbWVDb2xvcjogJ2JsYWNrJyxcclxuXHRcdFx0Y29ybmVyUmFkaXVzOiAwLFxyXG5cdFx0XHRpbnB1dFJlZ2V4cDogbnVsbCxcclxuXHRcdFx0dGhvdXNhbmRzU2VwOiAnICcsXHJcblx0XHRcdHJlYWRvbmx5OiAwLFxyXG5cdFx0XHRvbkNoYW5nZTogbnVsbCxcclxuXHRcdFx0bW92ZWFibGU6IGZhbHNlLFxyXG5cdFx0XHRyb3RhdGlvbjogMCxcclxuXHRcdH1cclxuXHRcdE9iamVjdC5hc3NpZ24oIHRoaXMsIGRlZmF1bHRPcHRzLCBvcHRzICk7XHJcblx0XHRpZiAoIHR5cGVvZiB0aGlzLnZhbHVlICE9PSAnc3RyaW5nJykge1xyXG5cdFx0XHR0aGlzLnZhbHVlID0gdGhpcy52YWx1ZS50b1N0cmluZygpO1xyXG5cdFx0fVxyXG5cdFx0dGhpcy5sYXllciA9IGxheWVyO1xyXG5cdFx0dGhpcy5iYXNlID0gYmFzZTtcclxuXHRcdGNvbnN0IHN0YWdlID0gYmFzZS5zdGFnZTtcclxuXHRcdHRoaXMuc3RhZ2UgPSBzdGFnZTtcclxuXHJcblx0XHQvLyBHcm91cCAoZnJhbWUgJiB0ZXh0KVxyXG5cdFx0Y29uc3Qga0dyb3VwID0gbmV3IEtvbnZhLkdyb3VwKCB0aGlzLm1vdmVhYmxlID8geyBkcmFnZ2FibGU6IHRydWUgfSA6IHt9ICk7XHJcblx0XHR0aGlzLmtHcm91cCA9IGtHcm91cDtcclxuXHRcdHRoaXMubGF5ZXIuYWRkKCB0aGlzLmtHcm91cCApO1xyXG5cclxuXHRcdC8vIEZyYW1lXHJcblx0XHRjb25zdCBrRnJhbWUgPSBuZXcgS29udmEuUmVjdCh7XHJcblx0XHRcdHg6IHRoaXMueCxcclxuXHRcdFx0eTogdGhpcy55LFxyXG5cdFx0XHR3aWR0aDogdGhpcy53aWR0aCxcclxuXHRcdFx0aGVpZ2h0OiB0aGlzLmhlaWdodCxcclxuXHRcdFx0ZmlsbDogdGhpcy5yZWFkb25seSA/IHRoaXMuYmFja2dyb3VuZFJlYWRvbmx5IDogdGhpcy5iYWNrZ3JvdW5kRWRpdGFibGUsXHJcblx0XHRcdHN0cm9rZTogdGhpcy5mcmFtZUNvbG9yLFxyXG5cdFx0XHRzdHJva2VXaWR0aDogdGhpcy5mcmFtZVdpZHRoLFxyXG5cdFx0XHRjb3JuZXJSYWRpdXM6IHRoaXMuY29ybmVyUmFkaXVzLFxyXG5cdFx0XHRyb3RhdGlvbjogdGhpcy5yb3RhdGlvbixcclxuXHRcdH0pXHJcblx0XHR0aGlzLmtGcmFtZSA9IGtGcmFtZTtcclxuXHRcdHRoaXMua0dyb3VwLmFkZCgga0ZyYW1lICk7XHJcblxyXG5cdFx0Ly8gVGV4dFxyXG5cdFx0Y29uc3Qgd1JlZCA9IHRoaXMuZnJhbWVXaWR0aCA/IHRoaXMuZnJhbWVXaWR0aCsxIDogMDtcclxuXHRcdGNvbnN0IGtUZXh0ID0gbmV3IEtvbnZhLlRleHQoe1xyXG5cdFx0XHR0ZXh0OiB0aGlzLmluc2VydFRob3VzYW5kc1NlcCggdGhpcy52YWx1ZSApLFxyXG5cdFx0XHR4OiB0aGlzLnggKyB3UmVkLFxyXG5cdFx0XHR5OiB0aGlzLnksXHJcblx0XHRcdHdpZHRoOiB0aGlzLndpZHRoIC0gd1JlZCoyLFxyXG5cdFx0XHRoZWlnaHQ6IHRoaXMuaGVpZ2h0LFxyXG5cdFx0XHRhbGlnbjogdGhpcy5hbGlnbixcclxuXHRcdFx0dmVydGljYWxBbGlnbjogJ21pZGRsZScsXHJcblx0XHRcdGZvbnRTaXplOiB0aGlzLmZvbnRTaXplLFxyXG5cdFx0XHRyb3RhdGlvbjogdGhpcy5yb3RhdGlvbixcclxuXHRcdH0pXHJcblx0XHR0aGlzLmtUZXh0ID0ga1RleHQ7XHJcblx0XHR0aGlzLmtHcm91cC5hZGQoIGtUZXh0ICk7XHJcblxyXG5cdFx0Ly8gZWRpdFxyXG5cdFx0aWYgKCAhdGhpcy5yZWFkb25seSApIHtcclxuXHJcblx0XHRcdC8vIGtUZXh0Lm9uKCAnbW91c2VlbnRlcicsIGZ1bmN0aW9uICgpIHtcclxuXHRcdFx0Ly8gXHRrRnJhbWUuZmlsbCggdGhpcy5iYWNrZ3JvdW5kRWRpdCApO1xyXG5cdFx0XHQvLyBcdGxheWVyLmJhdGNoRHJhdygpO1xyXG5cdFx0XHQvLyBcdGRvY3VtZW50LmJvZHkuc3R5bGUuY3Vyc29yID0gXCJ0ZXh0XCI7XHJcblx0XHRcdC8vIH0uYmluZCh0aGlzKSApO1xyXG5cclxuXHRcdFx0Ly8ga1RleHQub24oICdtb3VzZWxlYXZlJywgZnVuY3Rpb24gKCkge1xyXG5cdFx0XHQvLyBcdGtGcmFtZS5maWxsKCBudWxsICk7XHJcblx0XHRcdC8vIFx0bGF5ZXIuYmF0Y2hEcmF3KCk7XHJcblx0XHRcdC8vIFx0ZG9jdW1lbnQuYm9keS5zdHlsZS5jdXJzb3IgPSBcImRlZmF1bHRcIjtcclxuXHRcdFx0Ly8gfSlcclxuXHJcblx0XHRcdGtUZXh0Lm9uKCAnY2xpY2sgdGFwJywgZnVuY3Rpb24gKGV2KSB7XHJcblxyXG5cdFx0XHRcdGV2LmNhbmNlbEJ1YmJsZSA9IHRydWU7XHJcblxyXG5cdFx0XHRcdC8vIHN0YXJ0IGlucHV0IGZpZWxkXHJcblx0XHRcdFx0bGV0IHN0YWdlQm94ID0gZ2V0QWJzUG9zaXRpb24oIHN0YWdlLmNvbnRhaW5lcigpICk7XHJcblx0XHRcdFx0bGV0IGlucHV0RWxlbWVudCA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoICdpbnB1dCcgKTtcclxuXHRcdFx0XHRkb2N1bWVudC5ib2R5LmFwcGVuZENoaWxkKGlucHV0RWxlbWVudCk7XHJcblx0XHRcdFx0aW5wdXRFbGVtZW50LnZhbHVlID0gdGhpcy52YWx1ZTtcclxuXHRcdFx0XHRpbnB1dEVsZW1lbnQub2xkVmFsdWUgPSB0aGlzLnZhbHVlO1xyXG5cdFx0XHRcdGlucHV0RWxlbWVudC5vbGRTZWxlY3Rpb25TdGFydCA9IHRoaXMudmFsdWUubGVuZ3RoO1xyXG5cdFx0XHRcdGlucHV0RWxlbWVudC5vbGRTZWxlY3Rpb25FbmQgPSB0aGlzLnZhbHVlLmxlbmd0aDtcclxuXHJcblx0XHRcdFx0aW5wdXRFbGVtZW50LnN0eWxlLnBvc2l0aW9uID0gJ2Fic29sdXRlJztcclxuXHRcdFx0XHRcdFx0XHRcdFx0XHRcdFx0Ly8gISEhISEgSGllciBtdXNzIG5vY2ggc2Nyb2xsUG9zIHZlcnJlY2huZXQgd2VyZGVuXHJcblx0XHRcdFx0Y29uc3QgaW5wQWRkT2ZmID0gdGhpcy5nZXRBZGRPZmYoKTtcclxuXHRcdFx0XHRpbnB1dEVsZW1lbnQuc3R5bGUubGVmdCA9ICgwKyBzdGFnZUJveC5sZWZ0ICsga0ZyYW1lLngoKSArIGtHcm91cC54KCkgKyBpbnBBZGRPZmYueCApICsncHgnO1xyXG5cdFx0XHRcdGlucHV0RWxlbWVudC5zdHlsZS50b3AgPSAoMCsgc3RhZ2VCb3gudG9wICsga0ZyYW1lLnkoKSArIGtHcm91cC55KCkgKyBpbnBBZGRPZmYueSApKydweCc7XHJcblx0XHRcdFx0aW5wdXRFbGVtZW50LnN0eWxlLndpZHRoID0gKDErdGhpcy53aWR0aCkrJ3B4JztcclxuXHRcdFx0XHRpbnB1dEVsZW1lbnQuc3R5bGUuaGVpZ2h0ID0gKDErdGhpcy5oZWlnaHQpKydweCc7XHJcblx0XHRcdFx0aW5wdXRFbGVtZW50LnN0eWxlLmJhY2tncm91bmQgPSB0aGlzLmJhY2tncm91bmRFZGl0O1xyXG5cdFx0XHRcdGlucHV0RWxlbWVudC5zdHlsZS5ib3JkZXIgPSAnMXB4IHNvbGlkIGJsYWNrJztcclxuXHRcdFx0XHRpbnB1dEVsZW1lbnQuc3R5bGVbJ2JveC1zaXppbmcnXSA9ICdib3JkZXItYm94JztcclxuXHRcdFx0XHRpbnB1dEVsZW1lbnQuZm9jdXMoIHsgcHJldmVudFNjcm9sbDogdHJ1ZSB9ICk7XHQvLyBpbXBvcnRhbnQgZm9yIGRlbW9BbmlcclxuXHRcdFx0XHR0aGlzLmlucHV0RWxlbWVudCA9IGlucHV0RWxlbWVudDtcclxuXHJcblx0XHRcdFx0Ly8gaGlkZSBmcmFtZSt0ZXh0XHJcblx0XHRcdFx0a1RleHQudmlzaWJsZSggZmFsc2UgKTtcclxuXHRcdFx0XHRrRnJhbWUudmlzaWJsZSggZmFsc2UgKTtcclxuXHRcdFx0XHRsYXllci5kcmF3KCk7XHJcblxyXG5cdFx0XHRcdC8vIGVuZCBpbnB1dCBmaWVsZFxyXG5cdFx0XHRcdGNvbnN0IHJlbW92ZUlucHV0ID0gKGNvcHk9MCkgPT4ge1xyXG5cdFx0XHRcdFx0aWYgKCB0aGlzLmlucHV0RWxlbWVudCApIHtcclxuXHRcdFx0XHRcdFx0dGhpcy5zdGFnZS5vZmYoICcuaW5wdXQnICk7XHJcblx0XHRcdFx0XHRcdGlmICggY29weSApIHtcclxuXHRcdFx0XHRcdFx0XHR0aGlzLnNldFZhbCggaW5wdXRFbGVtZW50LnZhbHVlICk7XHJcblx0XHRcdFx0XHRcdFx0aWYgKCB0eXBlb2YgdGhpcy5vbkNoYW5nZSA9PT0gJ2Z1bmN0aW9uJyApIHtcclxuXHRcdFx0XHRcdFx0XHRcdHRoaXMub25DaGFuZ2UoIHRoaXMudmFsdWUgKTtcclxuXHRcdFx0XHRcdFx0XHR9XHJcblx0XHRcdFx0XHRcdH1cclxuXHRcdFx0XHRcdFx0dGhpcy5pbnB1dEVsZW1lbnQgPSBudWxsO1xyXG5cdFx0XHRcdFx0XHRkb2N1bWVudC5ib2R5LnJlbW92ZUNoaWxkKCBpbnB1dEVsZW1lbnQgKTtcdC8vIGNhdXNlcyBibHVyIG9uIGNocm9tZT9cclxuXHRcdFx0XHRcdFx0a1RleHQudmlzaWJsZSggdHJ1ZSApO1xyXG5cdFx0XHRcdFx0XHRrRnJhbWUudmlzaWJsZSggdHJ1ZSApO1xyXG5cdFx0XHRcdFx0XHRsYXllci5kcmF3KCk7XHJcblx0XHRcdFx0XHR9XHJcblx0XHRcdFx0fVxyXG5cclxuXHRcdFx0XHRpZiAoIHRoaXMuaW5wdXRSZWdleHAgKSB7XHJcblx0XHRcdFx0XHRjb25zdCByZSA9IG5ldyBSZWdFeHAoIHRoaXMuaW5wdXRSZWdleHAgKTtcclxuXHRcdFx0XHRcdGZ1bmN0aW9uIGhhbmRsZXIgKGUpIHtcclxuXHRcdFx0XHRcdFx0Y29uc3QgZWwgPSBlLnRhcmdldDtcclxuXHRcdFx0XHRcdFx0aWYgKCAhZWwudmFsdWUubWF0Y2goIHJlICkgKSB7XHJcblx0XHRcdFx0XHRcdFx0aWYoIGVsLmhhc093blByb3BlcnR5KCdvbGRWYWx1ZScpICkge1xyXG5cdFx0XHRcdFx0XHRcdFx0ZWwudmFsdWUgPSBlbC5vbGRWYWx1ZTtcclxuXHRcdFx0XHRcdFx0XHRcdGVsLnNldFNlbGVjdGlvblJhbmdlKGVsLm9sZFNlbGVjdGlvblN0YXJ0LCBlbC5vbGRTZWxlY3Rpb25FbmQpO1xyXG5cdFx0XHRcdFx0XHRcdH0gZWxzZSB7XHJcblx0XHRcdFx0XHRcdFx0XHRlbC52YWx1ZSA9ICcnO1xyXG5cdFx0XHRcdFx0XHRcdH1cclxuXHRcdFx0XHRcdFx0XHR0aGlzLmxvZ0tleSggJ2lucHV0UmV2ZXJ0JywgZWwub2xkU2VsZWN0aW9uU3RhcnQsIGUsIHsgdG9UZXh0OiBlbC52YWx1ZSB9ICk7XHJcblx0XHRcdFx0XHRcdFx0dGhpcy5iYXNlLnRyaWdnZXJJbnB1dFZhbGlkYXRpb25FdmVudCgpO1xyXG5cdFx0XHRcdFx0XHR9IGVsc2Uge1xyXG5cdFx0XHRcdFx0XHRcdGVsLm9sZFZhbHVlID0gZWwudmFsdWU7XHJcblx0XHRcdFx0XHRcdFx0ZWwub2xkU2VsZWN0aW9uU3RhcnQgPSBlbC5zZWxlY3Rpb25TdGFydDtcclxuXHRcdFx0XHRcdFx0XHRlbC5vbGRTZWxlY3Rpb25FbmQgPSBlbC5zZWxlY3Rpb25FbmQ7XHJcblx0XHRcdFx0XHRcdH1cclxuXHRcdFx0XHRcdH1cclxuXHRcdFx0XHRcdFsgJ2lucHV0JywgJ21vdXNldXAnLCAndG91Y2hlbmQnLCAna2V5dXAnIF0uZm9yRWFjaCggZXYgPT4gaW5wdXRFbGVtZW50LmFkZEV2ZW50TGlzdGVuZXIoIGV2LCBoYW5kbGVyLmJpbmQodGhpcykgKSApO1xyXG5cdFx0XHRcdH1cclxuXHJcblx0XHRcdFx0aW5wdXRFbGVtZW50LmFkZEV2ZW50TGlzdGVuZXIoICdrZXlkb3duJywgZnVuY3Rpb24gKGUpIHtcclxuXHJcblx0XHRcdFx0XHR0aGlzLmxvZ0tleSggJ2tleURvd24nLCBlLnRhcmdldC5zZWxlY3Rpb25TdGFydCwgZSApO1xyXG5cclxuXHRcdFx0XHRcdGlmICggZS53aGljaD09MTMgfHwgZS5rZXlDb2RlPT0xMyApIHtcclxuXHRcdFx0XHRcdFx0cmVtb3ZlSW5wdXQodHJ1ZSk7XHJcblx0XHRcdFx0XHR9XHJcblx0XHRcdFx0XHRpZiAoIGUud2hpY2g9PTI3IHx8IGUua2V5Q29kZT09MjcgKSB7XHJcblx0XHRcdFx0XHRcdHJlbW92ZUlucHV0KGZhbHNlKTtcclxuXHRcdFx0XHRcdH1cclxuXHRcdFx0XHR9LmJpbmQodGhpcykgKVxyXG5cdFx0XHRcdGlucHV0RWxlbWVudC5hZGRFdmVudExpc3RlbmVyKCAnYmx1cicsIGZ1bmN0aW9uKCkge1xyXG4vLyBjb25zb2xlLmxvZyhcImJsdXJcIik7XHJcblx0XHRcdFx0XHRyZW1vdmVJbnB1dCh0cnVlKTtcclxuXHRcdFx0XHR9LmJpbmQodGhpcykgKVxyXG5cclxuXHRcdFx0XHRmdW5jdGlvbiBoYW5kbGVPdXRzaWRlQ2xpY2sgKGUpIHtcclxuLy8gY29uc29sZS5sb2coXCJvdXRzaWRlY2xpY2tcIik7XHJcblx0XHRcdFx0XHRpZiAoIGUudGFyZ2V0ICE9PSBpbnB1dEVsZW1lbnQgKSB7XHJcblx0XHRcdFx0XHRcdHJlbW92ZUlucHV0KHRydWUpO1xyXG5cdFx0XHRcdFx0fVxyXG5cdFx0XHRcdH1cclxuXHRcdFx0XHRzZXRUaW1lb3V0KCAoKSA9PiB7XHJcblx0XHRcdFx0XHR0aGlzLnN0YWdlLm9uKCAnY2xpY2suaW5wdXQgdG91Y2hzdGFydC5pbnB1dCcsIGhhbmRsZU91dHNpZGVDbGljayApO1xyXG5cdFx0XHRcdH0pO1xyXG5cclxuXHRcdFx0fS5iaW5kKHRoaXMpIClcclxuXHJcblx0XHRcdGlmICggdGhpcy5tb3ZlYWJsZSApIHtcclxuXHRcdFx0XHRrR3JvdXAub24oICdkcmFnZW5kJywgZnVuY3Rpb24gKCkge1xyXG5cdFx0XHRcdFx0YmFzZS5wb3N0TG9nKCAnaW5wdXRNb3ZlZCcsIHtcclxuXHRcdFx0XHRcdFx0aWQ6IHRoaXMubG9nT2JqZWN0SWQsXHJcblx0XHRcdFx0XHRcdHg6IGtGcmFtZS54KCkgKyBrR3JvdXAueCgpICsga0ZyYW1lLndpZHRoKCkvMixcclxuXHRcdFx0XHRcdFx0eToga0ZyYW1lLnkoKSArIGtHcm91cC55KCkgKyBrRnJhbWUuaGVpZ2h0KCkvMixcclxuXHRcdFx0XHRcdH0gKTtcclxuXHRcdFx0XHR9LmJpbmQodGhpcykgKVxyXG5cdFx0XHRcdGtHcm91cC5vbiggJ21vdXNlZG93biB0b3VjaHN0YXJ0JywgZXYgPT4gZXYuY2FuY2VsQnViYmxlID0gdHJ1ZVx0KTtcclxuXHRcdFx0fVxyXG5cclxuXHRcdFx0bGV0IG9sZEN1cnNvciA9IG51bGw7XHJcblx0XHRcdGNvbnN0IG92ZXJDdXJzb3IgPSB0aGlzLm1vdmVhYmxlID8gJ3BvaW50ZXInIDogJ3RleHQnO1xyXG5cclxuXHRcdFx0a0dyb3VwLm9uKCAnbW91c2VlbnRlcicsICgpID0+IHtcclxuXHRcdFx0XHRvbGRDdXJzb3IgPSBkb2N1bWVudC5ib2R5LnN0eWxlLmN1cnNvcjtcclxuXHRcdFx0XHRkb2N1bWVudC5ib2R5LnN0eWxlLmN1cnNvciA9IG92ZXJDdXJzb3I7XHJcblx0XHRcdH0pO1xyXG5cdFx0XHRrR3JvdXAub24oICdtb3VzZWxlYXZlJywgKGV2KSA9PiB7XHJcblx0XHRcdFx0aWYgKCBpZ25vcmVFdmVudCggdGhpcy5zdGFnZSwgZXYgKSApIHtcclxuXHRcdFx0XHRcdHJldHVybjtcclxuXHRcdFx0XHR9XHJcblx0XHRcdFx0aWYgKCBkb2N1bWVudC5ib2R5LnN0eWxlLmN1cnNvciA9PSBvdmVyQ3Vyc29yICkge1xyXG5cdFx0XHRcdFx0ZG9jdW1lbnQuYm9keS5zdHlsZS5jdXJzb3IgPSBvbGRDdXJzb3IgfHwgJ2F1dG8nO1xyXG5cdFx0XHRcdH1cclxuXHRcdFx0fSk7XHJcblxyXG5cdFx0fVxyXG5cdH1cclxuXHJcblx0Ly8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy9cclxuXHJcblx0cmVwb3MgKCB4LCB5ICkge1xyXG5cclxuXHRcdHRoaXMueCA9IHg7XHJcblx0XHR0aGlzLnkgPSB5O1xyXG5cclxuXHRcdHRoaXMua0ZyYW1lLngoIHggKTtcclxuXHRcdHRoaXMua0ZyYW1lLnkoIHkgKTtcclxuXHJcblx0XHR0aGlzLmtUZXh0LngoIHggKTtcclxuXHRcdHRoaXMua1RleHQueSggeSApO1xyXG5cclxuXHRcdHRoaXMubGF5ZXIuYmF0Y2hEcmF3KCk7XHJcblx0fVxyXG5cclxuXHRzZXRWYWwgKCBuZXdUZXh0ICkge1xyXG5cdFx0dGhpcy52YWx1ZT0gbmV3VGV4dDtcclxuXHRcdHRoaXMua1RleHQudGV4dCggdGhpcy5pbnNlcnRUaG91c2FuZHNTZXAoIHRoaXMuaW5wdXRFbGVtZW50LnZhbHVlICkgKTtcclxuXHR9XHJcblxyXG5cdGdldFBvcyAoKSB7XHJcblx0XHRyZXR1cm4ge1xyXG5cdFx0XHR4OiB0aGlzLmtGcmFtZS54KCkgKyB0aGlzLmtHcm91cC54KCksXHJcblx0XHRcdHk6IHRoaXMua0ZyYW1lLnkoKSArIHRoaXMua0dyb3VwLnkoKSxcclxuXHRcdH1cclxuXHR9XHJcblxyXG5cdC8vIGdldCBhZGRpdGlvbmFsIG9mZnNldHMgb2YgaW5wdXQgZmllbGQgZHVlIHRvIHJvdGF0aW9uXHJcblx0Z2V0QWRkT2ZmICgpIHtcclxuXHRcdHN3aXRjaCAoIHRoaXMucm90YXRpb24gKSB7XHJcblx0XHRcdGNhc2UgLTkwOlxyXG5cdFx0XHRjYXNlIDI3MDpcclxuXHRcdFx0XHRyZXR1cm4ge1xyXG5cdFx0XHRcdFx0eDogMCxcclxuXHRcdFx0XHRcdHk6IC0oIHRoaXMud2lkdGggKyB0aGlzLmhlaWdodCApLzIsXHJcblx0XHRcdFx0fVxyXG5cdFx0XHRkZWZhdWx0OlxyXG5cdFx0XHRcdHJldHVybiB7XHJcblx0XHRcdFx0XHR4OiAwLFxyXG5cdFx0XHRcdFx0eTogMCxcclxuXHRcdFx0XHR9XHJcblx0XHR9XHJcblx0fVxyXG5cclxuXHRsaXN0ZW5pbmcgKCBlbmFibGUgKSB7XHJcblx0XHR0aGlzLmtUZXh0Lmxpc3RlbmluZyggZW5hYmxlICk7XHJcblx0fVxyXG5cclxuXHRkZWxldGVBbGwgKCkge1xyXG5cdFx0dGhpcy5rRnJhbWUuZGVzdHJveSgpO1xyXG5cdFx0dGhpcy5rVGV4dC5kZXN0cm95KCk7XHJcblx0XHR0aGlzLmtHcm91cC5kZXN0cm95KCk7XHJcblx0fVxyXG5cclxuXHQvLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vL1xyXG5cclxuXHRsb2dLZXkgKCBsb2dFdmVudCwgcG9zLCBrZXlFdmVudCwgZGF0YT17fSApIHtcclxuXHJcblx0XHRpZiAoICdsb2dPYmplY3RJZCcgaW4gdGhpcyAmJiB0aGlzLmJhc2UgKSB7XHJcblxyXG5cdFx0XHRkYXRhLmlkID0gdGhpcy5sb2dPYmplY3RJZDtcclxuXHRcdFx0ZGF0YS5wb3MgPSBwb3M7XHJcblxyXG5cdFx0XHRpZiAoIHRoaXMubG9nUmVmICkge1xyXG5cdFx0XHRcdGRhdGEgPSBPYmplY3QuYXNzaWduKCBkYXRhLCB0aGlzLmxvZ1JlZigpICk7XHJcblx0XHRcdH1cclxuXHRcdFx0WyAna2V5JywgJ2NvZGUnLCAnc2hpZnRLZXknLCAnYWx0S2V5JywgJ2N0cmxLZXknLCAnbWV0YUtleScsICdpc0NvbXBvc2luZycsICdyZXBlYXQnIF0uZm9yRWFjaCggayA9PiB7XHJcblx0XHRcdFx0aWYgKCBrZXlFdmVudFtrXSApIHtcclxuXHRcdFx0XHRcdGRhdGFba10gPSBrZXlFdmVudFtrXTtcclxuXHRcdFx0XHR9XHJcblx0XHRcdH0pXHJcblx0XHRcdGRhdGEud2hpY2ggPSBrZXlFdmVudC53aGljaCB8fCBrZXlFdmVudC5rZXlDb2RlO1xyXG5cclxuXHRcdFx0dGhpcy5iYXNlLnBvc3RMb2coIGxvZ0V2ZW50LCBkYXRhICk7XHJcblx0XHR9XHJcblx0fVxyXG5cclxuXHRpbnNlcnRUaG91c2FuZHNTZXAgKHMpIHtcclxuXHRcdGlmICggdGhpcy50aG91c2FuZHNTZXAgKSB7XHJcblx0XHRcdGxldCByPXMudG9TdHJpbmcoKTtcclxuXHRcdFx0ZG8ge1xyXG5cdFx0XHRcdHM9cjtcclxuXHRcdFx0XHRyPXMucmVwbGFjZSggLyhbMC05XSspKFswLTldezN9XFxiKS8sICckMScrdGhpcy50aG91c2FuZHNTZXArJyQyJyApXHJcblx0XHRcdH0gd2hpbGUgKHIhPXMpO1xyXG5cdFx0fVxyXG5cdFx0cmV0dXJuIHM7XHJcblx0fVxyXG5cclxuXHQvLyBkZWxldGVUaG91c2FuZHNTZXAgKHMpIHtcclxuXHQvLyBcdGlmICggdGhpcy50aG91c2FuZHNTZXAgKSB7XHJcblx0Ly8gXHRcdGNvbnN0IHJlID0gbmV3IFJlZ0V4cCggJyhbMC05XSspJyt0aGlzLnRob3VzYW5kc1NlcCsnKFswLTldezN9XFxcXGIpJyApO1xyXG5cdC8vIFx0XHRsZXQgcj1zLnRvU3RyaW5nKCk7XHJcblx0Ly8gXHRcdGRvIHtcclxuXHQvLyBcdFx0XHRzPXI7XHJcblx0Ly8gXHRcdFx0cj1zLnJlcGxhY2UoIHJlLCAnJDEkMicgKTtcclxuXHQvLyBcdFx0fSB3aGlsZSAociE9cyk7XHJcblx0Ly8gXHR9XHJcblx0Ly8gXHRyZXR1cm4gcztcclxuXHQvLyB9XHJcblxyXG59XHJcbiIsImltcG9ydCBLb252YSBmcm9tICdrb252YS9saWIvQ29yZSdcclxuaW1wb3J0IHsgSW1hZ2UgYXMga0ltYWdlIH0gZnJvbSAna29udmEvbGliL3NoYXBlcy9JbWFnZSdcclxuXHJcbmV4cG9ydCBjbGFzcyB0b29sdGlwIHtcclxuXHJcblx0Y29uc3RydWN0b3IgKCBzdGFnZSApIHtcclxuXHRcdHRoaXMuc3RhZ2UgPSBzdGFnZTtcclxuXHRcdHRoaXMubGF5ZXIgPSBuZXcgS29udmEuTGF5ZXIoKTtcclxuXHRcdHN0YWdlLmFkZCggdGhpcy5sYXllciApO1xyXG5cclxuXHRcdHRoaXMuaW1hZ2UgPSBudWxsO1xyXG5cdFx0dGhpcy5rSW1hZ2VzID0ge307XHQvLyB7IFtzcmNdOiBLT05WQS5JbWFnZSB9XHJcblx0fVxyXG5cclxuXHQvLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vL1xyXG5cclxuXHRzaG93SW1hZ2UgKCBkZWZzPXt9ICkge1xyXG5cclxuXHRcdFsnd2lkdGgnLCdoZWlnaHQnLCdzcmMnXS5mb3JFYWNoKCBvID0+IHtcclxuXHRcdFx0aWYgKCAhKCBvIGluIGRlZnMgKSApIHtcclxuXHRcdFx0XHR0aHJvdyggYHRvb2x0aXA6IHBhcmFtZXRlciAnJHtvfScgbm90IHNwZWNpZmllZCFgICk7XHJcblx0XHRcdH1cclxuXHRcdH0pO1xyXG5cdFx0Y29uc3QgZGVmYXVsdHMgPSB7XHJcblx0XHRcdC8vIHdpZHRoLCBoZWlnaHQsIHNyY1x0Ly8gcHJvcGVydGllcyBvZiBpbWFnZVxyXG5cdFx0XHRvZmZzZXRYOiAxMCwgXHQvLyBvZmZzZXQgdG8gbW91c2Vwb2ludGVyIHBvc2l0aW9uXHJcblx0XHRcdG9mZnNldFk6IDEwLFxyXG5cdFx0XHRrb252YU9wdHM6IHt9LFxyXG5cdFx0XHRrSW1hZ2VzOiBbXSxcclxuXHRcdH07XHJcblx0XHRkZWZzID0gT2JqZWN0LmFzc2lnbigge30sIGRlZmF1bHRzLCBkZWZzICk7XHJcblxyXG5cdFx0Ly8gaW1hZ2UgbG9hZGVkP1xyXG5cdFx0aWYgKCBkZWZzLnNyYyBpbiB0aGlzLmtJbWFnZXMgKSB7XHJcblxyXG5cdFx0XHR0aGlzLmltYWdlID0gdGhpcy5rSW1hZ2VzWyBkZWZzLnNyYyBdO1xyXG5cdFx0XHR0aGlzLmltYWdlLngoIHRoaXMuc3RhZ2UuZ2V0UG9pbnRlclBvc2l0aW9uKCkueCArIGRlZnMub2Zmc2V0WCApO1xyXG5cdFx0XHR0aGlzLmltYWdlLnkoIHRoaXMuc3RhZ2UuZ2V0UG9pbnRlclBvc2l0aW9uKCkueSArIGRlZnMub2Zmc2V0WSApO1xyXG5cdFx0XHR0aGlzLmltYWdlLnZpc2libGUoIHRydWUgKTtcclxuXHRcdFx0dGhpcy5sYXllci5iYXRjaERyYXcoKTtcclxuXHJcblx0XHR9IGVsc2Uge1xyXG5cclxuXHRcdFx0Ly8gbG9hZCBpbWFnZVxyXG5cdFx0XHRjb25zdCBpbWFnZSA9IG5ldyBJbWFnZSgpO1xyXG5cdFx0XHRpbWFnZS5vbmxvYWQgPSAoKSA9PiB7XHJcblx0XHRcdFx0aWYgKCB0aGlzLmxvYWRpbmcgKSB7XHJcblx0XHRcdFx0XHR0aGlzLmltYWdlID0gbmV3IEtvbnZhLkltYWdlKCBPYmplY3QuYXNzaWduKCB7XHJcblx0XHRcdFx0XHRcdHg6IHRoaXMuc3RhZ2UuZ2V0UG9pbnRlclBvc2l0aW9uKCkueCArIGRlZnMub2Zmc2V0WCxcclxuXHRcdFx0XHRcdFx0eTogdGhpcy5zdGFnZS5nZXRQb2ludGVyUG9zaXRpb24oKS55ICsgZGVmcy5vZmZzZXRZLFxyXG5cdFx0XHRcdFx0XHR3aWR0aDogZGVmcy53aWR0aCxcclxuXHRcdFx0XHRcdFx0aGVpZ2h0OiBkZWZzLmhlaWdodCxcclxuXHRcdFx0XHRcdFx0aW1hZ2UsXHJcblx0XHRcdFx0XHR9LCBkZWZzLmtvbnZhT3B0cyApICk7XHJcblx0XHRcdFx0XHR0aGlzLmtJbWFnZXNbZGVmcy5zcmNdID0gdGhpcy5pbWFnZTtcclxuXHRcdFx0XHRcdHRoaXMubGF5ZXIuYWRkKCB0aGlzLmltYWdlICk7XHJcblx0XHRcdFx0XHR0aGlzLmxheWVyLmRyYXcoKTtcclxuXHRcdFx0XHR9XHJcblx0XHRcdH1cclxuXHRcdFx0dGhpcy5sb2FkaW5nID0gMTtcclxuXHRcdFx0aW1hZ2Uuc3JjID0gZGVmcy5zcmM7XHJcblx0XHR9XHJcblxyXG5cdFx0dGhpcy5zdGFnZS5vbiggXCJtb3VzZW1vdmUudG9vbHRpcFwiLCBmdW5jdGlvbiAoKSB7XHJcblx0XHRcdGlmICggdGhpcy5pbWFnZSkge1xyXG4vLyBjb25zb2xlLmxvZyggdGhpcy5zdGFnZS5nZXRQb2ludGVyUG9zaXRpb24oKS54ICsgZGVmcy5vZmZzZXRYLCB0aGlzLnN0YWdlLmdldFBvaW50ZXJQb3NpdGlvbigpLnkgKyBkZWZzLm9mZnNldFkgKVxyXG5cdFx0XHRcdHRoaXMuaW1hZ2UueCggdGhpcy5zdGFnZS5nZXRQb2ludGVyUG9zaXRpb24oKS54ICsgZGVmcy5vZmZzZXRYICk7XHJcblx0XHRcdFx0dGhpcy5pbWFnZS55KCB0aGlzLnN0YWdlLmdldFBvaW50ZXJQb3NpdGlvbigpLnkgKyBkZWZzLm9mZnNldFkgKTtcclxuXHRcdFx0XHR0aGlzLmxheWVyLmJhdGNoRHJhdygpO1xyXG5cdFx0XHR9XHJcblx0XHR9LmJpbmQodGhpcykgKTtcclxuXHJcblx0XHR0aGlzLmxheWVyLm1vdmVUb1RvcCgpO1xyXG5cdH1cclxuXHJcblx0aGlkZSAoKSB7XHJcblx0XHR0aGlzLmxvYWRpbmcgPSAwO1xyXG5cdFx0dGhpcy5zdGFnZS5vZmYoIFwibW91c2Vtb3ZlLnRvb2x0aXBcIiApO1xyXG5cdFx0aWYgKCB0aGlzLmltYWdlKSB7XHJcblx0XHRcdHRoaXMuaW1hZ2UudmlzaWJsZShmYWxzZSk7XHJcblx0XHRcdHRoaXMuaW1hZ2UgPSBudWxsO1xyXG5cdFx0XHR0aGlzLmxheWVyLmJhdGNoRHJhdygpO1xyXG5cdFx0fVxyXG5cdH1cclxuXHJcbn1cclxuIiwiLy8gZXh0cmFjdGVkIGJ5IG1pbmktY3NzLWV4dHJhY3QtcGx1Z2luXG5leHBvcnQge307IiwiaW1wb3J0IHsgZ2xvYiB9IGZyb20gJy4vR2xvYmFsLmpzJztcbmltcG9ydCB7IFV0aWwgfSBmcm9tICcuL1V0aWwuanMnO1xudmFyIG5vdyA9IChmdW5jdGlvbiAoKSB7XG4gICAgaWYgKGdsb2IucGVyZm9ybWFuY2UgJiYgZ2xvYi5wZXJmb3JtYW5jZS5ub3cpIHtcbiAgICAgICAgcmV0dXJuIGZ1bmN0aW9uICgpIHtcbiAgICAgICAgICAgIHJldHVybiBnbG9iLnBlcmZvcm1hbmNlLm5vdygpO1xuICAgICAgICB9O1xuICAgIH1cbiAgICByZXR1cm4gZnVuY3Rpb24gKCkge1xuICAgICAgICByZXR1cm4gbmV3IERhdGUoKS5nZXRUaW1lKCk7XG4gICAgfTtcbn0pKCk7XG5leHBvcnQgY2xhc3MgQW5pbWF0aW9uIHtcbiAgICBjb25zdHJ1Y3RvcihmdW5jLCBsYXllcnMpIHtcbiAgICAgICAgdGhpcy5pZCA9IEFuaW1hdGlvbi5hbmltSWRDb3VudGVyKys7XG4gICAgICAgIHRoaXMuZnJhbWUgPSB7XG4gICAgICAgICAgICB0aW1lOiAwLFxuICAgICAgICAgICAgdGltZURpZmY6IDAsXG4gICAgICAgICAgICBsYXN0VGltZTogbm93KCksXG4gICAgICAgICAgICBmcmFtZVJhdGU6IDAsXG4gICAgICAgIH07XG4gICAgICAgIHRoaXMuZnVuYyA9IGZ1bmM7XG4gICAgICAgIHRoaXMuc2V0TGF5ZXJzKGxheWVycyk7XG4gICAgfVxuICAgIHNldExheWVycyhsYXllcnMpIHtcbiAgICAgICAgdmFyIGxheXMgPSBbXTtcbiAgICAgICAgaWYgKCFsYXllcnMpIHtcbiAgICAgICAgICAgIGxheXMgPSBbXTtcbiAgICAgICAgfVxuICAgICAgICBlbHNlIGlmIChsYXllcnMubGVuZ3RoID4gMCkge1xuICAgICAgICAgICAgbGF5cyA9IGxheWVycztcbiAgICAgICAgfVxuICAgICAgICBlbHNlIHtcbiAgICAgICAgICAgIGxheXMgPSBbbGF5ZXJzXTtcbiAgICAgICAgfVxuICAgICAgICB0aGlzLmxheWVycyA9IGxheXM7XG4gICAgICAgIHJldHVybiB0aGlzO1xuICAgIH1cbiAgICBnZXRMYXllcnMoKSB7XG4gICAgICAgIHJldHVybiB0aGlzLmxheWVycztcbiAgICB9XG4gICAgYWRkTGF5ZXIobGF5ZXIpIHtcbiAgICAgICAgdmFyIGxheWVycyA9IHRoaXMubGF5ZXJzLCBsZW4gPSBsYXllcnMubGVuZ3RoLCBuO1xuICAgICAgICBmb3IgKG4gPSAwOyBuIDwgbGVuOyBuKyspIHtcbiAgICAgICAgICAgIGlmIChsYXllcnNbbl0uX2lkID09PSBsYXllci5faWQpIHtcbiAgICAgICAgICAgICAgICByZXR1cm4gZmFsc2U7XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgICAgdGhpcy5sYXllcnMucHVzaChsYXllcik7XG4gICAgICAgIHJldHVybiB0cnVlO1xuICAgIH1cbiAgICBpc1J1bm5pbmcoKSB7XG4gICAgICAgIHZhciBhID0gQW5pbWF0aW9uLCBhbmltYXRpb25zID0gYS5hbmltYXRpb25zLCBsZW4gPSBhbmltYXRpb25zLmxlbmd0aCwgbjtcbiAgICAgICAgZm9yIChuID0gMDsgbiA8IGxlbjsgbisrKSB7XG4gICAgICAgICAgICBpZiAoYW5pbWF0aW9uc1tuXS5pZCA9PT0gdGhpcy5pZCkge1xuICAgICAgICAgICAgICAgIHJldHVybiB0cnVlO1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICAgIHJldHVybiBmYWxzZTtcbiAgICB9XG4gICAgc3RhcnQoKSB7XG4gICAgICAgIHRoaXMuc3RvcCgpO1xuICAgICAgICB0aGlzLmZyYW1lLnRpbWVEaWZmID0gMDtcbiAgICAgICAgdGhpcy5mcmFtZS5sYXN0VGltZSA9IG5vdygpO1xuICAgICAgICBBbmltYXRpb24uX2FkZEFuaW1hdGlvbih0aGlzKTtcbiAgICAgICAgcmV0dXJuIHRoaXM7XG4gICAgfVxuICAgIHN0b3AoKSB7XG4gICAgICAgIEFuaW1hdGlvbi5fcmVtb3ZlQW5pbWF0aW9uKHRoaXMpO1xuICAgICAgICByZXR1cm4gdGhpcztcbiAgICB9XG4gICAgX3VwZGF0ZUZyYW1lT2JqZWN0KHRpbWUpIHtcbiAgICAgICAgdGhpcy5mcmFtZS50aW1lRGlmZiA9IHRpbWUgLSB0aGlzLmZyYW1lLmxhc3RUaW1lO1xuICAgICAgICB0aGlzLmZyYW1lLmxhc3RUaW1lID0gdGltZTtcbiAgICAgICAgdGhpcy5mcmFtZS50aW1lICs9IHRoaXMuZnJhbWUudGltZURpZmY7XG4gICAgICAgIHRoaXMuZnJhbWUuZnJhbWVSYXRlID0gMTAwMCAvIHRoaXMuZnJhbWUudGltZURpZmY7XG4gICAgfVxuICAgIHN0YXRpYyBfYWRkQW5pbWF0aW9uKGFuaW0pIHtcbiAgICAgICAgdGhpcy5hbmltYXRpb25zLnB1c2goYW5pbSk7XG4gICAgICAgIHRoaXMuX2hhbmRsZUFuaW1hdGlvbigpO1xuICAgIH1cbiAgICBzdGF0aWMgX3JlbW92ZUFuaW1hdGlvbihhbmltKSB7XG4gICAgICAgIHZhciBpZCA9IGFuaW0uaWQsIGFuaW1hdGlvbnMgPSB0aGlzLmFuaW1hdGlvbnMsIGxlbiA9IGFuaW1hdGlvbnMubGVuZ3RoLCBuO1xuICAgICAgICBmb3IgKG4gPSAwOyBuIDwgbGVuOyBuKyspIHtcbiAgICAgICAgICAgIGlmIChhbmltYXRpb25zW25dLmlkID09PSBpZCkge1xuICAgICAgICAgICAgICAgIHRoaXMuYW5pbWF0aW9ucy5zcGxpY2UobiwgMSk7XG4gICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICB9XG4gICAgc3RhdGljIF9ydW5GcmFtZXMoKSB7XG4gICAgICAgIHZhciBsYXllckhhc2ggPSB7fSwgYW5pbWF0aW9ucyA9IHRoaXMuYW5pbWF0aW9ucywgYW5pbSwgbGF5ZXJzLCBmdW5jLCBuLCBpLCBsYXllcnNMZW4sIGxheWVyLCBrZXksIG5lZWRSZWRyYXc7XG4gICAgICAgIGZvciAobiA9IDA7IG4gPCBhbmltYXRpb25zLmxlbmd0aDsgbisrKSB7XG4gICAgICAgICAgICBhbmltID0gYW5pbWF0aW9uc1tuXTtcbiAgICAgICAgICAgIGxheWVycyA9IGFuaW0ubGF5ZXJzO1xuICAgICAgICAgICAgZnVuYyA9IGFuaW0uZnVuYztcbiAgICAgICAgICAgIGFuaW0uX3VwZGF0ZUZyYW1lT2JqZWN0KG5vdygpKTtcbiAgICAgICAgICAgIGxheWVyc0xlbiA9IGxheWVycy5sZW5ndGg7XG4gICAgICAgICAgICBpZiAoZnVuYykge1xuICAgICAgICAgICAgICAgIG5lZWRSZWRyYXcgPSBmdW5jLmNhbGwoYW5pbSwgYW5pbS5mcmFtZSkgIT09IGZhbHNlO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgZWxzZSB7XG4gICAgICAgICAgICAgICAgbmVlZFJlZHJhdyA9IHRydWU7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBpZiAoIW5lZWRSZWRyYXcpIHtcbiAgICAgICAgICAgICAgICBjb250aW51ZTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGZvciAoaSA9IDA7IGkgPCBsYXllcnNMZW47IGkrKykge1xuICAgICAgICAgICAgICAgIGxheWVyID0gbGF5ZXJzW2ldO1xuICAgICAgICAgICAgICAgIGlmIChsYXllci5faWQgIT09IHVuZGVmaW5lZCkge1xuICAgICAgICAgICAgICAgICAgICBsYXllckhhc2hbbGF5ZXIuX2lkXSA9IGxheWVyO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgICBmb3IgKGtleSBpbiBsYXllckhhc2gpIHtcbiAgICAgICAgICAgIGlmICghbGF5ZXJIYXNoLmhhc093blByb3BlcnR5KGtleSkpIHtcbiAgICAgICAgICAgICAgICBjb250aW51ZTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGxheWVySGFzaFtrZXldLmJhdGNoRHJhdygpO1xuICAgICAgICB9XG4gICAgfVxuICAgIHN0YXRpYyBfYW5pbWF0aW9uTG9vcCgpIHtcbiAgICAgICAgdmFyIEFuaW0gPSBBbmltYXRpb247XG4gICAgICAgIGlmIChBbmltLmFuaW1hdGlvbnMubGVuZ3RoKSB7XG4gICAgICAgICAgICBBbmltLl9ydW5GcmFtZXMoKTtcbiAgICAgICAgICAgIFV0aWwucmVxdWVzdEFuaW1GcmFtZShBbmltLl9hbmltYXRpb25Mb29wKTtcbiAgICAgICAgfVxuICAgICAgICBlbHNlIHtcbiAgICAgICAgICAgIEFuaW0uYW5pbVJ1bm5pbmcgPSBmYWxzZTtcbiAgICAgICAgfVxuICAgIH1cbiAgICBzdGF0aWMgX2hhbmRsZUFuaW1hdGlvbigpIHtcbiAgICAgICAgaWYgKCF0aGlzLmFuaW1SdW5uaW5nKSB7XG4gICAgICAgICAgICB0aGlzLmFuaW1SdW5uaW5nID0gdHJ1ZTtcbiAgICAgICAgICAgIFV0aWwucmVxdWVzdEFuaW1GcmFtZSh0aGlzLl9hbmltYXRpb25Mb29wKTtcbiAgICAgICAgfVxuICAgIH1cbn1cbkFuaW1hdGlvbi5hbmltYXRpb25zID0gW107XG5BbmltYXRpb24uYW5pbUlkQ291bnRlciA9IDA7XG5BbmltYXRpb24uYW5pbVJ1bm5pbmcgPSBmYWxzZTtcbiIsImltcG9ydCB7IFV0aWwgfSBmcm9tICcuL1V0aWwuanMnO1xuaW1wb3J0IHsgU2NlbmVDb250ZXh0LCBIaXRDb250ZXh0IH0gZnJvbSAnLi9Db250ZXh0LmpzJztcbmltcG9ydCB7IEtvbnZhIH0gZnJvbSAnLi9HbG9iYWwuanMnO1xuaW1wb3J0IHsgRmFjdG9yeSB9IGZyb20gJy4vRmFjdG9yeS5qcyc7XG5pbXBvcnQgeyBnZXROdW1iZXJWYWxpZGF0b3IgfSBmcm9tICcuL1ZhbGlkYXRvcnMuanMnO1xudmFyIF9waXhlbFJhdGlvO1xuZnVuY3Rpb24gZ2V0RGV2aWNlUGl4ZWxSYXRpbygpIHtcbiAgICBpZiAoX3BpeGVsUmF0aW8pIHtcbiAgICAgICAgcmV0dXJuIF9waXhlbFJhdGlvO1xuICAgIH1cbiAgICB2YXIgY2FudmFzID0gVXRpbC5jcmVhdGVDYW52YXNFbGVtZW50KCk7XG4gICAgdmFyIGNvbnRleHQgPSBjYW52YXMuZ2V0Q29udGV4dCgnMmQnKTtcbiAgICBfcGl4ZWxSYXRpbyA9IChmdW5jdGlvbiAoKSB7XG4gICAgICAgIHZhciBkZXZpY2VQaXhlbFJhdGlvID0gS29udmEuX2dsb2JhbC5kZXZpY2VQaXhlbFJhdGlvIHx8IDEsIGJhY2tpbmdTdG9yZVJhdGlvID0gY29udGV4dC53ZWJraXRCYWNraW5nU3RvcmVQaXhlbFJhdGlvIHx8XG4gICAgICAgICAgICBjb250ZXh0Lm1vekJhY2tpbmdTdG9yZVBpeGVsUmF0aW8gfHxcbiAgICAgICAgICAgIGNvbnRleHQubXNCYWNraW5nU3RvcmVQaXhlbFJhdGlvIHx8XG4gICAgICAgICAgICBjb250ZXh0Lm9CYWNraW5nU3RvcmVQaXhlbFJhdGlvIHx8XG4gICAgICAgICAgICBjb250ZXh0LmJhY2tpbmdTdG9yZVBpeGVsUmF0aW8gfHxcbiAgICAgICAgICAgIDE7XG4gICAgICAgIHJldHVybiBkZXZpY2VQaXhlbFJhdGlvIC8gYmFja2luZ1N0b3JlUmF0aW87XG4gICAgfSkoKTtcbiAgICBVdGlsLnJlbGVhc2VDYW52YXMoY2FudmFzKTtcbiAgICByZXR1cm4gX3BpeGVsUmF0aW87XG59XG5leHBvcnQgY2xhc3MgQ2FudmFzIHtcbiAgICBjb25zdHJ1Y3Rvcihjb25maWcpIHtcbiAgICAgICAgdGhpcy5waXhlbFJhdGlvID0gMTtcbiAgICAgICAgdGhpcy53aWR0aCA9IDA7XG4gICAgICAgIHRoaXMuaGVpZ2h0ID0gMDtcbiAgICAgICAgdGhpcy5pc0NhY2hlID0gZmFsc2U7XG4gICAgICAgIHZhciBjb25mID0gY29uZmlnIHx8IHt9O1xuICAgICAgICB2YXIgcGl4ZWxSYXRpbyA9IGNvbmYucGl4ZWxSYXRpbyB8fCBLb252YS5waXhlbFJhdGlvIHx8IGdldERldmljZVBpeGVsUmF0aW8oKTtcbiAgICAgICAgdGhpcy5waXhlbFJhdGlvID0gcGl4ZWxSYXRpbztcbiAgICAgICAgdGhpcy5fY2FudmFzID0gVXRpbC5jcmVhdGVDYW52YXNFbGVtZW50KCk7XG4gICAgICAgIHRoaXMuX2NhbnZhcy5zdHlsZS5wYWRkaW5nID0gJzAnO1xuICAgICAgICB0aGlzLl9jYW52YXMuc3R5bGUubWFyZ2luID0gJzAnO1xuICAgICAgICB0aGlzLl9jYW52YXMuc3R5bGUuYm9yZGVyID0gJzAnO1xuICAgICAgICB0aGlzLl9jYW52YXMuc3R5bGUuYmFja2dyb3VuZCA9ICd0cmFuc3BhcmVudCc7XG4gICAgICAgIHRoaXMuX2NhbnZhcy5zdHlsZS5wb3NpdGlvbiA9ICdhYnNvbHV0ZSc7XG4gICAgICAgIHRoaXMuX2NhbnZhcy5zdHlsZS50b3AgPSAnMCc7XG4gICAgICAgIHRoaXMuX2NhbnZhcy5zdHlsZS5sZWZ0ID0gJzAnO1xuICAgIH1cbiAgICBnZXRDb250ZXh0KCkge1xuICAgICAgICByZXR1cm4gdGhpcy5jb250ZXh0O1xuICAgIH1cbiAgICBnZXRQaXhlbFJhdGlvKCkge1xuICAgICAgICByZXR1cm4gdGhpcy5waXhlbFJhdGlvO1xuICAgIH1cbiAgICBzZXRQaXhlbFJhdGlvKHBpeGVsUmF0aW8pIHtcbiAgICAgICAgdmFyIHByZXZpb3VzUmF0aW8gPSB0aGlzLnBpeGVsUmF0aW87XG4gICAgICAgIHRoaXMucGl4ZWxSYXRpbyA9IHBpeGVsUmF0aW87XG4gICAgICAgIHRoaXMuc2V0U2l6ZSh0aGlzLmdldFdpZHRoKCkgLyBwcmV2aW91c1JhdGlvLCB0aGlzLmdldEhlaWdodCgpIC8gcHJldmlvdXNSYXRpbyk7XG4gICAgfVxuICAgIHNldFdpZHRoKHdpZHRoKSB7XG4gICAgICAgIHRoaXMud2lkdGggPSB0aGlzLl9jYW52YXMud2lkdGggPSB3aWR0aCAqIHRoaXMucGl4ZWxSYXRpbztcbiAgICAgICAgdGhpcy5fY2FudmFzLnN0eWxlLndpZHRoID0gd2lkdGggKyAncHgnO1xuICAgICAgICB2YXIgcGl4ZWxSYXRpbyA9IHRoaXMucGl4ZWxSYXRpbywgX2NvbnRleHQgPSB0aGlzLmdldENvbnRleHQoKS5fY29udGV4dDtcbiAgICAgICAgX2NvbnRleHQuc2NhbGUocGl4ZWxSYXRpbywgcGl4ZWxSYXRpbyk7XG4gICAgfVxuICAgIHNldEhlaWdodChoZWlnaHQpIHtcbiAgICAgICAgdGhpcy5oZWlnaHQgPSB0aGlzLl9jYW52YXMuaGVpZ2h0ID0gaGVpZ2h0ICogdGhpcy5waXhlbFJhdGlvO1xuICAgICAgICB0aGlzLl9jYW52YXMuc3R5bGUuaGVpZ2h0ID0gaGVpZ2h0ICsgJ3B4JztcbiAgICAgICAgdmFyIHBpeGVsUmF0aW8gPSB0aGlzLnBpeGVsUmF0aW8sIF9jb250ZXh0ID0gdGhpcy5nZXRDb250ZXh0KCkuX2NvbnRleHQ7XG4gICAgICAgIF9jb250ZXh0LnNjYWxlKHBpeGVsUmF0aW8sIHBpeGVsUmF0aW8pO1xuICAgIH1cbiAgICBnZXRXaWR0aCgpIHtcbiAgICAgICAgcmV0dXJuIHRoaXMud2lkdGg7XG4gICAgfVxuICAgIGdldEhlaWdodCgpIHtcbiAgICAgICAgcmV0dXJuIHRoaXMuaGVpZ2h0O1xuICAgIH1cbiAgICBzZXRTaXplKHdpZHRoLCBoZWlnaHQpIHtcbiAgICAgICAgdGhpcy5zZXRXaWR0aCh3aWR0aCB8fCAwKTtcbiAgICAgICAgdGhpcy5zZXRIZWlnaHQoaGVpZ2h0IHx8IDApO1xuICAgIH1cbiAgICB0b0RhdGFVUkwobWltZVR5cGUsIHF1YWxpdHkpIHtcbiAgICAgICAgdHJ5IHtcbiAgICAgICAgICAgIHJldHVybiB0aGlzLl9jYW52YXMudG9EYXRhVVJMKG1pbWVUeXBlLCBxdWFsaXR5KTtcbiAgICAgICAgfVxuICAgICAgICBjYXRjaCAoZSkge1xuICAgICAgICAgICAgdHJ5IHtcbiAgICAgICAgICAgICAgICByZXR1cm4gdGhpcy5fY2FudmFzLnRvRGF0YVVSTCgpO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgY2F0Y2ggKGVycikge1xuICAgICAgICAgICAgICAgIFV0aWwuZXJyb3IoJ1VuYWJsZSB0byBnZXQgZGF0YSBVUkwuICcgK1xuICAgICAgICAgICAgICAgICAgICBlcnIubWVzc2FnZSArXG4gICAgICAgICAgICAgICAgICAgICcgRm9yIG1vcmUgaW5mbyByZWFkIGh0dHBzOi8va29udmFqcy5vcmcvZG9jcy9wb3N0cy9UYWludGVkX0NhbnZhcy5odG1sLicpO1xuICAgICAgICAgICAgICAgIHJldHVybiAnJztcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgIH1cbn1cbkZhY3RvcnkuYWRkR2V0dGVyU2V0dGVyKENhbnZhcywgJ3BpeGVsUmF0aW8nLCB1bmRlZmluZWQsIGdldE51bWJlclZhbGlkYXRvcigpKTtcbmV4cG9ydCBjbGFzcyBTY2VuZUNhbnZhcyBleHRlbmRzIENhbnZhcyB7XG4gICAgY29uc3RydWN0b3IoY29uZmlnID0geyB3aWR0aDogMCwgaGVpZ2h0OiAwIH0pIHtcbiAgICAgICAgc3VwZXIoY29uZmlnKTtcbiAgICAgICAgdGhpcy5jb250ZXh0ID0gbmV3IFNjZW5lQ29udGV4dCh0aGlzKTtcbiAgICAgICAgdGhpcy5zZXRTaXplKGNvbmZpZy53aWR0aCwgY29uZmlnLmhlaWdodCk7XG4gICAgfVxufVxuZXhwb3J0IGNsYXNzIEhpdENhbnZhcyBleHRlbmRzIENhbnZhcyB7XG4gICAgY29uc3RydWN0b3IoY29uZmlnID0geyB3aWR0aDogMCwgaGVpZ2h0OiAwIH0pIHtcbiAgICAgICAgc3VwZXIoY29uZmlnKTtcbiAgICAgICAgdGhpcy5oaXRDYW52YXMgPSB0cnVlO1xuICAgICAgICB0aGlzLmNvbnRleHQgPSBuZXcgSGl0Q29udGV4dCh0aGlzKTtcbiAgICAgICAgdGhpcy5zZXRTaXplKGNvbmZpZy53aWR0aCwgY29uZmlnLmhlaWdodCk7XG4gICAgfVxufVxuIiwiaW1wb3J0IHsgRmFjdG9yeSB9IGZyb20gJy4vRmFjdG9yeS5qcyc7XG5pbXBvcnQgeyBOb2RlIH0gZnJvbSAnLi9Ob2RlLmpzJztcbmltcG9ydCB7IGdldE51bWJlclZhbGlkYXRvciB9IGZyb20gJy4vVmFsaWRhdG9ycy5qcyc7XG5leHBvcnQgY2xhc3MgQ29udGFpbmVyIGV4dGVuZHMgTm9kZSB7XG4gICAgY29uc3RydWN0b3IoKSB7XG4gICAgICAgIHN1cGVyKC4uLmFyZ3VtZW50cyk7XG4gICAgICAgIHRoaXMuY2hpbGRyZW4gPSBbXTtcbiAgICB9XG4gICAgZ2V0Q2hpbGRyZW4oZmlsdGVyRnVuYykge1xuICAgICAgICBpZiAoIWZpbHRlckZ1bmMpIHtcbiAgICAgICAgICAgIHJldHVybiB0aGlzLmNoaWxkcmVuIHx8IFtdO1xuICAgICAgICB9XG4gICAgICAgIGNvbnN0IGNoaWxkcmVuID0gdGhpcy5jaGlsZHJlbiB8fCBbXTtcbiAgICAgICAgdmFyIHJlc3VsdHMgPSBbXTtcbiAgICAgICAgY2hpbGRyZW4uZm9yRWFjaChmdW5jdGlvbiAoY2hpbGQpIHtcbiAgICAgICAgICAgIGlmIChmaWx0ZXJGdW5jKGNoaWxkKSkge1xuICAgICAgICAgICAgICAgIHJlc3VsdHMucHVzaChjaGlsZCk7XG4gICAgICAgICAgICB9XG4gICAgICAgIH0pO1xuICAgICAgICByZXR1cm4gcmVzdWx0cztcbiAgICB9XG4gICAgaGFzQ2hpbGRyZW4oKSB7XG4gICAgICAgIHJldHVybiB0aGlzLmdldENoaWxkcmVuKCkubGVuZ3RoID4gMDtcbiAgICB9XG4gICAgcmVtb3ZlQ2hpbGRyZW4oKSB7XG4gICAgICAgIHRoaXMuZ2V0Q2hpbGRyZW4oKS5mb3JFYWNoKChjaGlsZCkgPT4ge1xuICAgICAgICAgICAgY2hpbGQucGFyZW50ID0gbnVsbDtcbiAgICAgICAgICAgIGNoaWxkLmluZGV4ID0gMDtcbiAgICAgICAgICAgIGNoaWxkLnJlbW92ZSgpO1xuICAgICAgICB9KTtcbiAgICAgICAgdGhpcy5jaGlsZHJlbiA9IFtdO1xuICAgICAgICB0aGlzLl9yZXF1ZXN0RHJhdygpO1xuICAgICAgICByZXR1cm4gdGhpcztcbiAgICB9XG4gICAgZGVzdHJveUNoaWxkcmVuKCkge1xuICAgICAgICB0aGlzLmdldENoaWxkcmVuKCkuZm9yRWFjaCgoY2hpbGQpID0+IHtcbiAgICAgICAgICAgIGNoaWxkLnBhcmVudCA9IG51bGw7XG4gICAgICAgICAgICBjaGlsZC5pbmRleCA9IDA7XG4gICAgICAgICAgICBjaGlsZC5kZXN0cm95KCk7XG4gICAgICAgIH0pO1xuICAgICAgICB0aGlzLmNoaWxkcmVuID0gW107XG4gICAgICAgIHRoaXMuX3JlcXVlc3REcmF3KCk7XG4gICAgICAgIHJldHVybiB0aGlzO1xuICAgIH1cbiAgICBhZGQoLi4uY2hpbGRyZW4pIHtcbiAgICAgICAgaWYgKGFyZ3VtZW50cy5sZW5ndGggPiAxKSB7XG4gICAgICAgICAgICBmb3IgKHZhciBpID0gMDsgaSA8IGFyZ3VtZW50cy5sZW5ndGg7IGkrKykge1xuICAgICAgICAgICAgICAgIHRoaXMuYWRkKGFyZ3VtZW50c1tpXSk7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICByZXR1cm4gdGhpcztcbiAgICAgICAgfVxuICAgICAgICB2YXIgY2hpbGQgPSBjaGlsZHJlblswXTtcbiAgICAgICAgaWYgKGNoaWxkLmdldFBhcmVudCgpKSB7XG4gICAgICAgICAgICBjaGlsZC5tb3ZlVG8odGhpcyk7XG4gICAgICAgICAgICByZXR1cm4gdGhpcztcbiAgICAgICAgfVxuICAgICAgICB0aGlzLl92YWxpZGF0ZUFkZChjaGlsZCk7XG4gICAgICAgIGNoaWxkLmluZGV4ID0gdGhpcy5nZXRDaGlsZHJlbigpLmxlbmd0aDtcbiAgICAgICAgY2hpbGQucGFyZW50ID0gdGhpcztcbiAgICAgICAgY2hpbGQuX2NsZWFyQ2FjaGVzKCk7XG4gICAgICAgIHRoaXMuZ2V0Q2hpbGRyZW4oKS5wdXNoKGNoaWxkKTtcbiAgICAgICAgdGhpcy5fZmlyZSgnYWRkJywge1xuICAgICAgICAgICAgY2hpbGQ6IGNoaWxkLFxuICAgICAgICB9KTtcbiAgICAgICAgdGhpcy5fcmVxdWVzdERyYXcoKTtcbiAgICAgICAgcmV0dXJuIHRoaXM7XG4gICAgfVxuICAgIGRlc3Ryb3koKSB7XG4gICAgICAgIGlmICh0aGlzLmhhc0NoaWxkcmVuKCkpIHtcbiAgICAgICAgICAgIHRoaXMuZGVzdHJveUNoaWxkcmVuKCk7XG4gICAgICAgIH1cbiAgICAgICAgc3VwZXIuZGVzdHJveSgpO1xuICAgICAgICByZXR1cm4gdGhpcztcbiAgICB9XG4gICAgZmluZChzZWxlY3Rvcikge1xuICAgICAgICByZXR1cm4gdGhpcy5fZ2VuZXJhbEZpbmQoc2VsZWN0b3IsIGZhbHNlKTtcbiAgICB9XG4gICAgZmluZE9uZShzZWxlY3Rvcikge1xuICAgICAgICB2YXIgcmVzdWx0ID0gdGhpcy5fZ2VuZXJhbEZpbmQoc2VsZWN0b3IsIHRydWUpO1xuICAgICAgICByZXR1cm4gcmVzdWx0Lmxlbmd0aCA+IDAgPyByZXN1bHRbMF0gOiB1bmRlZmluZWQ7XG4gICAgfVxuICAgIF9nZW5lcmFsRmluZChzZWxlY3RvciwgZmluZE9uZSkge1xuICAgICAgICB2YXIgcmV0QXJyID0gW107XG4gICAgICAgIHRoaXMuX2Rlc2NlbmRhbnRzKChub2RlKSA9PiB7XG4gICAgICAgICAgICBjb25zdCB2YWxpZCA9IG5vZGUuX2lzTWF0Y2goc2VsZWN0b3IpO1xuICAgICAgICAgICAgaWYgKHZhbGlkKSB7XG4gICAgICAgICAgICAgICAgcmV0QXJyLnB1c2gobm9kZSk7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBpZiAodmFsaWQgJiYgZmluZE9uZSkge1xuICAgICAgICAgICAgICAgIHJldHVybiB0cnVlO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgcmV0dXJuIGZhbHNlO1xuICAgICAgICB9KTtcbiAgICAgICAgcmV0dXJuIHJldEFycjtcbiAgICB9XG4gICAgX2Rlc2NlbmRhbnRzKGZuKSB7XG4gICAgICAgIGxldCBzaG91bGRTdG9wID0gZmFsc2U7XG4gICAgICAgIGNvbnN0IGNoaWxkcmVuID0gdGhpcy5nZXRDaGlsZHJlbigpO1xuICAgICAgICBmb3IgKGNvbnN0IGNoaWxkIG9mIGNoaWxkcmVuKSB7XG4gICAgICAgICAgICBzaG91bGRTdG9wID0gZm4oY2hpbGQpO1xuICAgICAgICAgICAgaWYgKHNob3VsZFN0b3ApIHtcbiAgICAgICAgICAgICAgICByZXR1cm4gdHJ1ZTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGlmICghY2hpbGQuaGFzQ2hpbGRyZW4oKSkge1xuICAgICAgICAgICAgICAgIGNvbnRpbnVlO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgc2hvdWxkU3RvcCA9IGNoaWxkLl9kZXNjZW5kYW50cyhmbik7XG4gICAgICAgICAgICBpZiAoc2hvdWxkU3RvcCkge1xuICAgICAgICAgICAgICAgIHJldHVybiB0cnVlO1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICAgIHJldHVybiBmYWxzZTtcbiAgICB9XG4gICAgdG9PYmplY3QoKSB7XG4gICAgICAgIHZhciBvYmogPSBOb2RlLnByb3RvdHlwZS50b09iamVjdC5jYWxsKHRoaXMpO1xuICAgICAgICBvYmouY2hpbGRyZW4gPSBbXTtcbiAgICAgICAgdGhpcy5nZXRDaGlsZHJlbigpLmZvckVhY2goKGNoaWxkKSA9PiB7XG4gICAgICAgICAgICBvYmouY2hpbGRyZW4ucHVzaChjaGlsZC50b09iamVjdCgpKTtcbiAgICAgICAgfSk7XG4gICAgICAgIHJldHVybiBvYmo7XG4gICAgfVxuICAgIGlzQW5jZXN0b3JPZihub2RlKSB7XG4gICAgICAgIHZhciBwYXJlbnQgPSBub2RlLmdldFBhcmVudCgpO1xuICAgICAgICB3aGlsZSAocGFyZW50KSB7XG4gICAgICAgICAgICBpZiAocGFyZW50Ll9pZCA9PT0gdGhpcy5faWQpIHtcbiAgICAgICAgICAgICAgICByZXR1cm4gdHJ1ZTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIHBhcmVudCA9IHBhcmVudC5nZXRQYXJlbnQoKTtcbiAgICAgICAgfVxuICAgICAgICByZXR1cm4gZmFsc2U7XG4gICAgfVxuICAgIGNsb25lKG9iaikge1xuICAgICAgICB2YXIgbm9kZSA9IE5vZGUucHJvdG90eXBlLmNsb25lLmNhbGwodGhpcywgb2JqKTtcbiAgICAgICAgdGhpcy5nZXRDaGlsZHJlbigpLmZvckVhY2goZnVuY3Rpb24gKG5vKSB7XG4gICAgICAgICAgICBub2RlLmFkZChuby5jbG9uZSgpKTtcbiAgICAgICAgfSk7XG4gICAgICAgIHJldHVybiBub2RlO1xuICAgIH1cbiAgICBnZXRBbGxJbnRlcnNlY3Rpb25zKHBvcykge1xuICAgICAgICB2YXIgYXJyID0gW107XG4gICAgICAgIHRoaXMuZmluZCgnU2hhcGUnKS5mb3JFYWNoKGZ1bmN0aW9uIChzaGFwZSkge1xuICAgICAgICAgICAgaWYgKHNoYXBlLmlzVmlzaWJsZSgpICYmIHNoYXBlLmludGVyc2VjdHMocG9zKSkge1xuICAgICAgICAgICAgICAgIGFyci5wdXNoKHNoYXBlKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfSk7XG4gICAgICAgIHJldHVybiBhcnI7XG4gICAgfVxuICAgIF9jbGVhclNlbGZBbmREZXNjZW5kYW50Q2FjaGUoYXR0cikge1xuICAgICAgICB2YXIgX2E7XG4gICAgICAgIHN1cGVyLl9jbGVhclNlbGZBbmREZXNjZW5kYW50Q2FjaGUoYXR0cik7XG4gICAgICAgIGlmICh0aGlzLmlzQ2FjaGVkKCkpIHtcbiAgICAgICAgICAgIHJldHVybjtcbiAgICAgICAgfVxuICAgICAgICAoX2EgPSB0aGlzLmNoaWxkcmVuKSA9PT0gbnVsbCB8fCBfYSA9PT0gdm9pZCAwID8gdm9pZCAwIDogX2EuZm9yRWFjaChmdW5jdGlvbiAobm9kZSkge1xuICAgICAgICAgICAgbm9kZS5fY2xlYXJTZWxmQW5kRGVzY2VuZGFudENhY2hlKGF0dHIpO1xuICAgICAgICB9KTtcbiAgICB9XG4gICAgX3NldENoaWxkcmVuSW5kaWNlcygpIHtcbiAgICAgICAgdmFyIF9hO1xuICAgICAgICAoX2EgPSB0aGlzLmNoaWxkcmVuKSA9PT0gbnVsbCB8fCBfYSA9PT0gdm9pZCAwID8gdm9pZCAwIDogX2EuZm9yRWFjaChmdW5jdGlvbiAoY2hpbGQsIG4pIHtcbiAgICAgICAgICAgIGNoaWxkLmluZGV4ID0gbjtcbiAgICAgICAgfSk7XG4gICAgICAgIHRoaXMuX3JlcXVlc3REcmF3KCk7XG4gICAgfVxuICAgIGRyYXdTY2VuZShjYW4sIHRvcCkge1xuICAgICAgICB2YXIgbGF5ZXIgPSB0aGlzLmdldExheWVyKCksIGNhbnZhcyA9IGNhbiB8fCAobGF5ZXIgJiYgbGF5ZXIuZ2V0Q2FudmFzKCkpLCBjb250ZXh0ID0gY2FudmFzICYmIGNhbnZhcy5nZXRDb250ZXh0KCksIGNhY2hlZENhbnZhcyA9IHRoaXMuX2dldENhbnZhc0NhY2hlKCksIGNhY2hlZFNjZW5lQ2FudmFzID0gY2FjaGVkQ2FudmFzICYmIGNhY2hlZENhbnZhcy5zY2VuZTtcbiAgICAgICAgdmFyIGNhY2hpbmcgPSBjYW52YXMgJiYgY2FudmFzLmlzQ2FjaGU7XG4gICAgICAgIGlmICghdGhpcy5pc1Zpc2libGUoKSAmJiAhY2FjaGluZykge1xuICAgICAgICAgICAgcmV0dXJuIHRoaXM7XG4gICAgICAgIH1cbiAgICAgICAgaWYgKGNhY2hlZFNjZW5lQ2FudmFzKSB7XG4gICAgICAgICAgICBjb250ZXh0LnNhdmUoKTtcbiAgICAgICAgICAgIHZhciBtID0gdGhpcy5nZXRBYnNvbHV0ZVRyYW5zZm9ybSh0b3ApLmdldE1hdHJpeCgpO1xuICAgICAgICAgICAgY29udGV4dC50cmFuc2Zvcm0obVswXSwgbVsxXSwgbVsyXSwgbVszXSwgbVs0XSwgbVs1XSk7XG4gICAgICAgICAgICB0aGlzLl9kcmF3Q2FjaGVkU2NlbmVDYW52YXMoY29udGV4dCk7XG4gICAgICAgICAgICBjb250ZXh0LnJlc3RvcmUoKTtcbiAgICAgICAgfVxuICAgICAgICBlbHNlIHtcbiAgICAgICAgICAgIHRoaXMuX2RyYXdDaGlsZHJlbignZHJhd1NjZW5lJywgY2FudmFzLCB0b3ApO1xuICAgICAgICB9XG4gICAgICAgIHJldHVybiB0aGlzO1xuICAgIH1cbiAgICBkcmF3SGl0KGNhbiwgdG9wKSB7XG4gICAgICAgIGlmICghdGhpcy5zaG91bGREcmF3SGl0KHRvcCkpIHtcbiAgICAgICAgICAgIHJldHVybiB0aGlzO1xuICAgICAgICB9XG4gICAgICAgIHZhciBsYXllciA9IHRoaXMuZ2V0TGF5ZXIoKSwgY2FudmFzID0gY2FuIHx8IChsYXllciAmJiBsYXllci5oaXRDYW52YXMpLCBjb250ZXh0ID0gY2FudmFzICYmIGNhbnZhcy5nZXRDb250ZXh0KCksIGNhY2hlZENhbnZhcyA9IHRoaXMuX2dldENhbnZhc0NhY2hlKCksIGNhY2hlZEhpdENhbnZhcyA9IGNhY2hlZENhbnZhcyAmJiBjYWNoZWRDYW52YXMuaGl0O1xuICAgICAgICBpZiAoY2FjaGVkSGl0Q2FudmFzKSB7XG4gICAgICAgICAgICBjb250ZXh0LnNhdmUoKTtcbiAgICAgICAgICAgIHZhciBtID0gdGhpcy5nZXRBYnNvbHV0ZVRyYW5zZm9ybSh0b3ApLmdldE1hdHJpeCgpO1xuICAgICAgICAgICAgY29udGV4dC50cmFuc2Zvcm0obVswXSwgbVsxXSwgbVsyXSwgbVszXSwgbVs0XSwgbVs1XSk7XG4gICAgICAgICAgICB0aGlzLl9kcmF3Q2FjaGVkSGl0Q2FudmFzKGNvbnRleHQpO1xuICAgICAgICAgICAgY29udGV4dC5yZXN0b3JlKCk7XG4gICAgICAgIH1cbiAgICAgICAgZWxzZSB7XG4gICAgICAgICAgICB0aGlzLl9kcmF3Q2hpbGRyZW4oJ2RyYXdIaXQnLCBjYW52YXMsIHRvcCk7XG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuIHRoaXM7XG4gICAgfVxuICAgIF9kcmF3Q2hpbGRyZW4oZHJhd01ldGhvZCwgY2FudmFzLCB0b3ApIHtcbiAgICAgICAgdmFyIF9hO1xuICAgICAgICB2YXIgY29udGV4dCA9IGNhbnZhcyAmJiBjYW52YXMuZ2V0Q29udGV4dCgpLCBjbGlwV2lkdGggPSB0aGlzLmNsaXBXaWR0aCgpLCBjbGlwSGVpZ2h0ID0gdGhpcy5jbGlwSGVpZ2h0KCksIGNsaXBGdW5jID0gdGhpcy5jbGlwRnVuYygpLCBoYXNDbGlwID0gKGNsaXBXaWR0aCAmJiBjbGlwSGVpZ2h0KSB8fCBjbGlwRnVuYztcbiAgICAgICAgY29uc3Qgc2VsZkNhY2hlID0gdG9wID09PSB0aGlzO1xuICAgICAgICBpZiAoaGFzQ2xpcCkge1xuICAgICAgICAgICAgY29udGV4dC5zYXZlKCk7XG4gICAgICAgICAgICB2YXIgdHJhbnNmb3JtID0gdGhpcy5nZXRBYnNvbHV0ZVRyYW5zZm9ybSh0b3ApO1xuICAgICAgICAgICAgdmFyIG0gPSB0cmFuc2Zvcm0uZ2V0TWF0cml4KCk7XG4gICAgICAgICAgICBjb250ZXh0LnRyYW5zZm9ybShtWzBdLCBtWzFdLCBtWzJdLCBtWzNdLCBtWzRdLCBtWzVdKTtcbiAgICAgICAgICAgIGNvbnRleHQuYmVnaW5QYXRoKCk7XG4gICAgICAgICAgICBpZiAoY2xpcEZ1bmMpIHtcbiAgICAgICAgICAgICAgICBjbGlwRnVuYy5jYWxsKHRoaXMsIGNvbnRleHQsIHRoaXMpO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgZWxzZSB7XG4gICAgICAgICAgICAgICAgdmFyIGNsaXBYID0gdGhpcy5jbGlwWCgpO1xuICAgICAgICAgICAgICAgIHZhciBjbGlwWSA9IHRoaXMuY2xpcFkoKTtcbiAgICAgICAgICAgICAgICBjb250ZXh0LnJlY3QoY2xpcFgsIGNsaXBZLCBjbGlwV2lkdGgsIGNsaXBIZWlnaHQpO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgY29udGV4dC5jbGlwKCk7XG4gICAgICAgICAgICBtID0gdHJhbnNmb3JtLmNvcHkoKS5pbnZlcnQoKS5nZXRNYXRyaXgoKTtcbiAgICAgICAgICAgIGNvbnRleHQudHJhbnNmb3JtKG1bMF0sIG1bMV0sIG1bMl0sIG1bM10sIG1bNF0sIG1bNV0pO1xuICAgICAgICB9XG4gICAgICAgIHZhciBoYXNDb21wb3NpdGlvbiA9ICFzZWxmQ2FjaGUgJiZcbiAgICAgICAgICAgIHRoaXMuZ2xvYmFsQ29tcG9zaXRlT3BlcmF0aW9uKCkgIT09ICdzb3VyY2Utb3ZlcicgJiZcbiAgICAgICAgICAgIGRyYXdNZXRob2QgPT09ICdkcmF3U2NlbmUnO1xuICAgICAgICBpZiAoaGFzQ29tcG9zaXRpb24pIHtcbiAgICAgICAgICAgIGNvbnRleHQuc2F2ZSgpO1xuICAgICAgICAgICAgY29udGV4dC5fYXBwbHlHbG9iYWxDb21wb3NpdGVPcGVyYXRpb24odGhpcyk7XG4gICAgICAgIH1cbiAgICAgICAgKF9hID0gdGhpcy5jaGlsZHJlbikgPT09IG51bGwgfHwgX2EgPT09IHZvaWQgMCA/IHZvaWQgMCA6IF9hLmZvckVhY2goZnVuY3Rpb24gKGNoaWxkKSB7XG4gICAgICAgICAgICBjaGlsZFtkcmF3TWV0aG9kXShjYW52YXMsIHRvcCk7XG4gICAgICAgIH0pO1xuICAgICAgICBpZiAoaGFzQ29tcG9zaXRpb24pIHtcbiAgICAgICAgICAgIGNvbnRleHQucmVzdG9yZSgpO1xuICAgICAgICB9XG4gICAgICAgIGlmIChoYXNDbGlwKSB7XG4gICAgICAgICAgICBjb250ZXh0LnJlc3RvcmUoKTtcbiAgICAgICAgfVxuICAgIH1cbiAgICBnZXRDbGllbnRSZWN0KGNvbmZpZykge1xuICAgICAgICB2YXIgX2E7XG4gICAgICAgIGNvbmZpZyA9IGNvbmZpZyB8fCB7fTtcbiAgICAgICAgdmFyIHNraXBUcmFuc2Zvcm0gPSBjb25maWcuc2tpcFRyYW5zZm9ybTtcbiAgICAgICAgdmFyIHJlbGF0aXZlVG8gPSBjb25maWcucmVsYXRpdmVUbztcbiAgICAgICAgdmFyIG1pblgsIG1pblksIG1heFgsIG1heFk7XG4gICAgICAgIHZhciBzZWxmUmVjdCA9IHtcbiAgICAgICAgICAgIHg6IEluZmluaXR5LFxuICAgICAgICAgICAgeTogSW5maW5pdHksXG4gICAgICAgICAgICB3aWR0aDogMCxcbiAgICAgICAgICAgIGhlaWdodDogMCxcbiAgICAgICAgfTtcbiAgICAgICAgdmFyIHRoYXQgPSB0aGlzO1xuICAgICAgICAoX2EgPSB0aGlzLmNoaWxkcmVuKSA9PT0gbnVsbCB8fCBfYSA9PT0gdm9pZCAwID8gdm9pZCAwIDogX2EuZm9yRWFjaChmdW5jdGlvbiAoY2hpbGQpIHtcbiAgICAgICAgICAgIGlmICghY2hpbGQudmlzaWJsZSgpKSB7XG4gICAgICAgICAgICAgICAgcmV0dXJuO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgdmFyIHJlY3QgPSBjaGlsZC5nZXRDbGllbnRSZWN0KHtcbiAgICAgICAgICAgICAgICByZWxhdGl2ZVRvOiB0aGF0LFxuICAgICAgICAgICAgICAgIHNraXBTaGFkb3c6IGNvbmZpZy5za2lwU2hhZG93LFxuICAgICAgICAgICAgICAgIHNraXBTdHJva2U6IGNvbmZpZy5za2lwU3Ryb2tlLFxuICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICBpZiAocmVjdC53aWR0aCA9PT0gMCAmJiByZWN0LmhlaWdodCA9PT0gMCkge1xuICAgICAgICAgICAgICAgIHJldHVybjtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGlmIChtaW5YID09PSB1bmRlZmluZWQpIHtcbiAgICAgICAgICAgICAgICBtaW5YID0gcmVjdC54O1xuICAgICAgICAgICAgICAgIG1pblkgPSByZWN0Lnk7XG4gICAgICAgICAgICAgICAgbWF4WCA9IHJlY3QueCArIHJlY3Qud2lkdGg7XG4gICAgICAgICAgICAgICAgbWF4WSA9IHJlY3QueSArIHJlY3QuaGVpZ2h0O1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgZWxzZSB7XG4gICAgICAgICAgICAgICAgbWluWCA9IE1hdGgubWluKG1pblgsIHJlY3QueCk7XG4gICAgICAgICAgICAgICAgbWluWSA9IE1hdGgubWluKG1pblksIHJlY3QueSk7XG4gICAgICAgICAgICAgICAgbWF4WCA9IE1hdGgubWF4KG1heFgsIHJlY3QueCArIHJlY3Qud2lkdGgpO1xuICAgICAgICAgICAgICAgIG1heFkgPSBNYXRoLm1heChtYXhZLCByZWN0LnkgKyByZWN0LmhlaWdodCk7XG4gICAgICAgICAgICB9XG4gICAgICAgIH0pO1xuICAgICAgICB2YXIgc2hhcGVzID0gdGhpcy5maW5kKCdTaGFwZScpO1xuICAgICAgICB2YXIgaGFzVmlzaWJsZSA9IGZhbHNlO1xuICAgICAgICBmb3IgKHZhciBpID0gMDsgaSA8IHNoYXBlcy5sZW5ndGg7IGkrKykge1xuICAgICAgICAgICAgdmFyIHNoYXBlID0gc2hhcGVzW2ldO1xuICAgICAgICAgICAgaWYgKHNoYXBlLl9pc1Zpc2libGUodGhpcykpIHtcbiAgICAgICAgICAgICAgICBoYXNWaXNpYmxlID0gdHJ1ZTtcbiAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgICBpZiAoaGFzVmlzaWJsZSAmJiBtaW5YICE9PSB1bmRlZmluZWQpIHtcbiAgICAgICAgICAgIHNlbGZSZWN0ID0ge1xuICAgICAgICAgICAgICAgIHg6IG1pblgsXG4gICAgICAgICAgICAgICAgeTogbWluWSxcbiAgICAgICAgICAgICAgICB3aWR0aDogbWF4WCAtIG1pblgsXG4gICAgICAgICAgICAgICAgaGVpZ2h0OiBtYXhZIC0gbWluWSxcbiAgICAgICAgICAgIH07XG4gICAgICAgIH1cbiAgICAgICAgZWxzZSB7XG4gICAgICAgICAgICBzZWxmUmVjdCA9IHtcbiAgICAgICAgICAgICAgICB4OiAwLFxuICAgICAgICAgICAgICAgIHk6IDAsXG4gICAgICAgICAgICAgICAgd2lkdGg6IDAsXG4gICAgICAgICAgICAgICAgaGVpZ2h0OiAwLFxuICAgICAgICAgICAgfTtcbiAgICAgICAgfVxuICAgICAgICBpZiAoIXNraXBUcmFuc2Zvcm0pIHtcbiAgICAgICAgICAgIHJldHVybiB0aGlzLl90cmFuc2Zvcm1lZFJlY3Qoc2VsZlJlY3QsIHJlbGF0aXZlVG8pO1xuICAgICAgICB9XG4gICAgICAgIHJldHVybiBzZWxmUmVjdDtcbiAgICB9XG59XG5GYWN0b3J5LmFkZENvbXBvbmVudHNHZXR0ZXJTZXR0ZXIoQ29udGFpbmVyLCAnY2xpcCcsIFtcbiAgICAneCcsXG4gICAgJ3knLFxuICAgICd3aWR0aCcsXG4gICAgJ2hlaWdodCcsXG5dKTtcbkZhY3RvcnkuYWRkR2V0dGVyU2V0dGVyKENvbnRhaW5lciwgJ2NsaXBYJywgdW5kZWZpbmVkLCBnZXROdW1iZXJWYWxpZGF0b3IoKSk7XG5GYWN0b3J5LmFkZEdldHRlclNldHRlcihDb250YWluZXIsICdjbGlwWScsIHVuZGVmaW5lZCwgZ2V0TnVtYmVyVmFsaWRhdG9yKCkpO1xuRmFjdG9yeS5hZGRHZXR0ZXJTZXR0ZXIoQ29udGFpbmVyLCAnY2xpcFdpZHRoJywgdW5kZWZpbmVkLCBnZXROdW1iZXJWYWxpZGF0b3IoKSk7XG5GYWN0b3J5LmFkZEdldHRlclNldHRlcihDb250YWluZXIsICdjbGlwSGVpZ2h0JywgdW5kZWZpbmVkLCBnZXROdW1iZXJWYWxpZGF0b3IoKSk7XG5GYWN0b3J5LmFkZEdldHRlclNldHRlcihDb250YWluZXIsICdjbGlwRnVuYycpO1xuIiwiaW1wb3J0IHsgVXRpbCB9IGZyb20gJy4vVXRpbC5qcyc7XG5pbXBvcnQgeyBLb252YSB9IGZyb20gJy4vR2xvYmFsLmpzJztcbmZ1bmN0aW9uIHNpbXBsaWZ5QXJyYXkoYXJyKSB7XG4gICAgdmFyIHJldEFyciA9IFtdLCBsZW4gPSBhcnIubGVuZ3RoLCB1dGlsID0gVXRpbCwgbiwgdmFsO1xuICAgIGZvciAobiA9IDA7IG4gPCBsZW47IG4rKykge1xuICAgICAgICB2YWwgPSBhcnJbbl07XG4gICAgICAgIGlmICh1dGlsLl9pc051bWJlcih2YWwpKSB7XG4gICAgICAgICAgICB2YWwgPSBNYXRoLnJvdW5kKHZhbCAqIDEwMDApIC8gMTAwMDtcbiAgICAgICAgfVxuICAgICAgICBlbHNlIGlmICghdXRpbC5faXNTdHJpbmcodmFsKSkge1xuICAgICAgICAgICAgdmFsID0gdmFsICsgJyc7XG4gICAgICAgIH1cbiAgICAgICAgcmV0QXJyLnB1c2godmFsKTtcbiAgICB9XG4gICAgcmV0dXJuIHJldEFycjtcbn1cbnZhciBDT01NQSA9ICcsJywgT1BFTl9QQVJFTiA9ICcoJywgQ0xPU0VfUEFSRU4gPSAnKScsIE9QRU5fUEFSRU5fQlJBQ0tFVCA9ICcoWycsIENMT1NFX0JSQUNLRVRfUEFSRU4gPSAnXSknLCBTRU1JQ09MT04gPSAnOycsIERPVUJMRV9QQVJFTiA9ICcoKScsIEVRVUFMUyA9ICc9JywgQ09OVEVYVF9NRVRIT0RTID0gW1xuICAgICdhcmMnLFxuICAgICdhcmNUbycsXG4gICAgJ2JlZ2luUGF0aCcsXG4gICAgJ2JlemllckN1cnZlVG8nLFxuICAgICdjbGVhclJlY3QnLFxuICAgICdjbGlwJyxcbiAgICAnY2xvc2VQYXRoJyxcbiAgICAnY3JlYXRlTGluZWFyR3JhZGllbnQnLFxuICAgICdjcmVhdGVQYXR0ZXJuJyxcbiAgICAnY3JlYXRlUmFkaWFsR3JhZGllbnQnLFxuICAgICdkcmF3SW1hZ2UnLFxuICAgICdlbGxpcHNlJyxcbiAgICAnZmlsbCcsXG4gICAgJ2ZpbGxUZXh0JyxcbiAgICAnZ2V0SW1hZ2VEYXRhJyxcbiAgICAnY3JlYXRlSW1hZ2VEYXRhJyxcbiAgICAnbGluZVRvJyxcbiAgICAnbW92ZVRvJyxcbiAgICAncHV0SW1hZ2VEYXRhJyxcbiAgICAncXVhZHJhdGljQ3VydmVUbycsXG4gICAgJ3JlY3QnLFxuICAgICdyZXN0b3JlJyxcbiAgICAncm90YXRlJyxcbiAgICAnc2F2ZScsXG4gICAgJ3NjYWxlJyxcbiAgICAnc2V0TGluZURhc2gnLFxuICAgICdzZXRUcmFuc2Zvcm0nLFxuICAgICdzdHJva2UnLFxuICAgICdzdHJva2VUZXh0JyxcbiAgICAndHJhbnNmb3JtJyxcbiAgICAndHJhbnNsYXRlJyxcbl07XG52YXIgQ09OVEVYVF9QUk9QRVJUSUVTID0gW1xuICAgICdmaWxsU3R5bGUnLFxuICAgICdzdHJva2VTdHlsZScsXG4gICAgJ3NoYWRvd0NvbG9yJyxcbiAgICAnc2hhZG93Qmx1cicsXG4gICAgJ3NoYWRvd09mZnNldFgnLFxuICAgICdzaGFkb3dPZmZzZXRZJyxcbiAgICAnbGluZUNhcCcsXG4gICAgJ2xpbmVEYXNoT2Zmc2V0JyxcbiAgICAnbGluZUpvaW4nLFxuICAgICdsaW5lV2lkdGgnLFxuICAgICdtaXRlckxpbWl0JyxcbiAgICAnZm9udCcsXG4gICAgJ3RleHRBbGlnbicsXG4gICAgJ3RleHRCYXNlbGluZScsXG4gICAgJ2dsb2JhbEFscGhhJyxcbiAgICAnZ2xvYmFsQ29tcG9zaXRlT3BlcmF0aW9uJyxcbiAgICAnaW1hZ2VTbW9vdGhpbmdFbmFibGVkJyxcbl07XG5jb25zdCB0cmFjZUFyck1heCA9IDEwMDtcbmV4cG9ydCBjbGFzcyBDb250ZXh0IHtcbiAgICBjb25zdHJ1Y3RvcihjYW52YXMpIHtcbiAgICAgICAgdGhpcy5jYW52YXMgPSBjYW52YXM7XG4gICAgICAgIGlmIChLb252YS5lbmFibGVUcmFjZSkge1xuICAgICAgICAgICAgdGhpcy50cmFjZUFyciA9IFtdO1xuICAgICAgICAgICAgdGhpcy5fZW5hYmxlVHJhY2UoKTtcbiAgICAgICAgfVxuICAgIH1cbiAgICBmaWxsU2hhcGUoc2hhcGUpIHtcbiAgICAgICAgaWYgKHNoYXBlLmZpbGxFbmFibGVkKCkpIHtcbiAgICAgICAgICAgIHRoaXMuX2ZpbGwoc2hhcGUpO1xuICAgICAgICB9XG4gICAgfVxuICAgIF9maWxsKHNoYXBlKSB7XG4gICAgfVxuICAgIHN0cm9rZVNoYXBlKHNoYXBlKSB7XG4gICAgICAgIGlmIChzaGFwZS5oYXNTdHJva2UoKSkge1xuICAgICAgICAgICAgdGhpcy5fc3Ryb2tlKHNoYXBlKTtcbiAgICAgICAgfVxuICAgIH1cbiAgICBfc3Ryb2tlKHNoYXBlKSB7XG4gICAgfVxuICAgIGZpbGxTdHJva2VTaGFwZShzaGFwZSkge1xuICAgICAgICBpZiAoc2hhcGUuYXR0cnMuZmlsbEFmdGVyU3Ryb2tlRW5hYmxlZCkge1xuICAgICAgICAgICAgdGhpcy5zdHJva2VTaGFwZShzaGFwZSk7XG4gICAgICAgICAgICB0aGlzLmZpbGxTaGFwZShzaGFwZSk7XG4gICAgICAgIH1cbiAgICAgICAgZWxzZSB7XG4gICAgICAgICAgICB0aGlzLmZpbGxTaGFwZShzaGFwZSk7XG4gICAgICAgICAgICB0aGlzLnN0cm9rZVNoYXBlKHNoYXBlKTtcbiAgICAgICAgfVxuICAgIH1cbiAgICBnZXRUcmFjZShyZWxheGVkLCByb3VuZGVkKSB7XG4gICAgICAgIHZhciB0cmFjZUFyciA9IHRoaXMudHJhY2VBcnIsIGxlbiA9IHRyYWNlQXJyLmxlbmd0aCwgc3RyID0gJycsIG4sIHRyYWNlLCBtZXRob2QsIGFyZ3M7XG4gICAgICAgIGZvciAobiA9IDA7IG4gPCBsZW47IG4rKykge1xuICAgICAgICAgICAgdHJhY2UgPSB0cmFjZUFycltuXTtcbiAgICAgICAgICAgIG1ldGhvZCA9IHRyYWNlLm1ldGhvZDtcbiAgICAgICAgICAgIGlmIChtZXRob2QpIHtcbiAgICAgICAgICAgICAgICBhcmdzID0gdHJhY2UuYXJncztcbiAgICAgICAgICAgICAgICBzdHIgKz0gbWV0aG9kO1xuICAgICAgICAgICAgICAgIGlmIChyZWxheGVkKSB7XG4gICAgICAgICAgICAgICAgICAgIHN0ciArPSBET1VCTEVfUEFSRU47XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIGVsc2Uge1xuICAgICAgICAgICAgICAgICAgICBpZiAoVXRpbC5faXNBcnJheShhcmdzWzBdKSkge1xuICAgICAgICAgICAgICAgICAgICAgICAgc3RyICs9IE9QRU5fUEFSRU5fQlJBQ0tFVCArIGFyZ3Muam9pbihDT01NQSkgKyBDTE9TRV9CUkFDS0VUX1BBUkVOO1xuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgIGVsc2Uge1xuICAgICAgICAgICAgICAgICAgICAgICAgaWYgKHJvdW5kZWQpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBhcmdzID0gYXJncy5tYXAoKGEpID0+IHR5cGVvZiBhID09PSAnbnVtYmVyJyA/IE1hdGguZmxvb3IoYSkgOiBhKTtcbiAgICAgICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgICAgIHN0ciArPSBPUEVOX1BBUkVOICsgYXJncy5qb2luKENPTU1BKSArIENMT1NFX1BBUkVOO1xuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfVxuICAgICAgICAgICAgZWxzZSB7XG4gICAgICAgICAgICAgICAgc3RyICs9IHRyYWNlLnByb3BlcnR5O1xuICAgICAgICAgICAgICAgIGlmICghcmVsYXhlZCkge1xuICAgICAgICAgICAgICAgICAgICBzdHIgKz0gRVFVQUxTICsgdHJhY2UudmFsO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIHN0ciArPSBTRU1JQ09MT047XG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuIHN0cjtcbiAgICB9XG4gICAgY2xlYXJUcmFjZSgpIHtcbiAgICAgICAgdGhpcy50cmFjZUFyciA9IFtdO1xuICAgIH1cbiAgICBfdHJhY2Uoc3RyKSB7XG4gICAgICAgIHZhciB0cmFjZUFyciA9IHRoaXMudHJhY2VBcnIsIGxlbjtcbiAgICAgICAgdHJhY2VBcnIucHVzaChzdHIpO1xuICAgICAgICBsZW4gPSB0cmFjZUFyci5sZW5ndGg7XG4gICAgICAgIGlmIChsZW4gPj0gdHJhY2VBcnJNYXgpIHtcbiAgICAgICAgICAgIHRyYWNlQXJyLnNoaWZ0KCk7XG4gICAgICAgIH1cbiAgICB9XG4gICAgcmVzZXQoKSB7XG4gICAgICAgIHZhciBwaXhlbFJhdGlvID0gdGhpcy5nZXRDYW52YXMoKS5nZXRQaXhlbFJhdGlvKCk7XG4gICAgICAgIHRoaXMuc2V0VHJhbnNmb3JtKDEgKiBwaXhlbFJhdGlvLCAwLCAwLCAxICogcGl4ZWxSYXRpbywgMCwgMCk7XG4gICAgfVxuICAgIGdldENhbnZhcygpIHtcbiAgICAgICAgcmV0dXJuIHRoaXMuY2FudmFzO1xuICAgIH1cbiAgICBjbGVhcihib3VuZHMpIHtcbiAgICAgICAgdmFyIGNhbnZhcyA9IHRoaXMuZ2V0Q2FudmFzKCk7XG4gICAgICAgIGlmIChib3VuZHMpIHtcbiAgICAgICAgICAgIHRoaXMuY2xlYXJSZWN0KGJvdW5kcy54IHx8IDAsIGJvdW5kcy55IHx8IDAsIGJvdW5kcy53aWR0aCB8fCAwLCBib3VuZHMuaGVpZ2h0IHx8IDApO1xuICAgICAgICB9XG4gICAgICAgIGVsc2Uge1xuICAgICAgICAgICAgdGhpcy5jbGVhclJlY3QoMCwgMCwgY2FudmFzLmdldFdpZHRoKCkgLyBjYW52YXMucGl4ZWxSYXRpbywgY2FudmFzLmdldEhlaWdodCgpIC8gY2FudmFzLnBpeGVsUmF0aW8pO1xuICAgICAgICB9XG4gICAgfVxuICAgIF9hcHBseUxpbmVDYXAoc2hhcGUpIHtcbiAgICAgICAgdmFyIGxpbmVDYXAgPSBzaGFwZS5nZXRMaW5lQ2FwKCk7XG4gICAgICAgIGlmIChsaW5lQ2FwKSB7XG4gICAgICAgICAgICB0aGlzLnNldEF0dHIoJ2xpbmVDYXAnLCBsaW5lQ2FwKTtcbiAgICAgICAgfVxuICAgIH1cbiAgICBfYXBwbHlPcGFjaXR5KHNoYXBlKSB7XG4gICAgICAgIHZhciBhYnNPcGFjaXR5ID0gc2hhcGUuZ2V0QWJzb2x1dGVPcGFjaXR5KCk7XG4gICAgICAgIGlmIChhYnNPcGFjaXR5ICE9PSAxKSB7XG4gICAgICAgICAgICB0aGlzLnNldEF0dHIoJ2dsb2JhbEFscGhhJywgYWJzT3BhY2l0eSk7XG4gICAgICAgIH1cbiAgICB9XG4gICAgX2FwcGx5TGluZUpvaW4oc2hhcGUpIHtcbiAgICAgICAgdmFyIGxpbmVKb2luID0gc2hhcGUuYXR0cnMubGluZUpvaW47XG4gICAgICAgIGlmIChsaW5lSm9pbikge1xuICAgICAgICAgICAgdGhpcy5zZXRBdHRyKCdsaW5lSm9pbicsIGxpbmVKb2luKTtcbiAgICAgICAgfVxuICAgIH1cbiAgICBzZXRBdHRyKGF0dHIsIHZhbCkge1xuICAgICAgICB0aGlzLl9jb250ZXh0W2F0dHJdID0gdmFsO1xuICAgIH1cbiAgICBhcmMoYTAsIGExLCBhMiwgYTMsIGE0LCBhNSkge1xuICAgICAgICB0aGlzLl9jb250ZXh0LmFyYyhhMCwgYTEsIGEyLCBhMywgYTQsIGE1KTtcbiAgICB9XG4gICAgYXJjVG8oYTAsIGExLCBhMiwgYTMsIGE0KSB7XG4gICAgICAgIHRoaXMuX2NvbnRleHQuYXJjVG8oYTAsIGExLCBhMiwgYTMsIGE0KTtcbiAgICB9XG4gICAgYmVnaW5QYXRoKCkge1xuICAgICAgICB0aGlzLl9jb250ZXh0LmJlZ2luUGF0aCgpO1xuICAgIH1cbiAgICBiZXppZXJDdXJ2ZVRvKGEwLCBhMSwgYTIsIGEzLCBhNCwgYTUpIHtcbiAgICAgICAgdGhpcy5fY29udGV4dC5iZXppZXJDdXJ2ZVRvKGEwLCBhMSwgYTIsIGEzLCBhNCwgYTUpO1xuICAgIH1cbiAgICBjbGVhclJlY3QoYTAsIGExLCBhMiwgYTMpIHtcbiAgICAgICAgdGhpcy5fY29udGV4dC5jbGVhclJlY3QoYTAsIGExLCBhMiwgYTMpO1xuICAgIH1cbiAgICBjbGlwKCkge1xuICAgICAgICB0aGlzLl9jb250ZXh0LmNsaXAoKTtcbiAgICB9XG4gICAgY2xvc2VQYXRoKCkge1xuICAgICAgICB0aGlzLl9jb250ZXh0LmNsb3NlUGF0aCgpO1xuICAgIH1cbiAgICBjcmVhdGVJbWFnZURhdGEoYTAsIGExKSB7XG4gICAgICAgIHZhciBhID0gYXJndW1lbnRzO1xuICAgICAgICBpZiAoYS5sZW5ndGggPT09IDIpIHtcbiAgICAgICAgICAgIHJldHVybiB0aGlzLl9jb250ZXh0LmNyZWF0ZUltYWdlRGF0YShhMCwgYTEpO1xuICAgICAgICB9XG4gICAgICAgIGVsc2UgaWYgKGEubGVuZ3RoID09PSAxKSB7XG4gICAgICAgICAgICByZXR1cm4gdGhpcy5fY29udGV4dC5jcmVhdGVJbWFnZURhdGEoYTApO1xuICAgICAgICB9XG4gICAgfVxuICAgIGNyZWF0ZUxpbmVhckdyYWRpZW50KGEwLCBhMSwgYTIsIGEzKSB7XG4gICAgICAgIHJldHVybiB0aGlzLl9jb250ZXh0LmNyZWF0ZUxpbmVhckdyYWRpZW50KGEwLCBhMSwgYTIsIGEzKTtcbiAgICB9XG4gICAgY3JlYXRlUGF0dGVybihhMCwgYTEpIHtcbiAgICAgICAgcmV0dXJuIHRoaXMuX2NvbnRleHQuY3JlYXRlUGF0dGVybihhMCwgYTEpO1xuICAgIH1cbiAgICBjcmVhdGVSYWRpYWxHcmFkaWVudChhMCwgYTEsIGEyLCBhMywgYTQsIGE1KSB7XG4gICAgICAgIHJldHVybiB0aGlzLl9jb250ZXh0LmNyZWF0ZVJhZGlhbEdyYWRpZW50KGEwLCBhMSwgYTIsIGEzLCBhNCwgYTUpO1xuICAgIH1cbiAgICBkcmF3SW1hZ2UoYTAsIGExLCBhMiwgYTMsIGE0LCBhNSwgYTYsIGE3LCBhOCkge1xuICAgICAgICB2YXIgYSA9IGFyZ3VtZW50cywgX2NvbnRleHQgPSB0aGlzLl9jb250ZXh0O1xuICAgICAgICBpZiAoYS5sZW5ndGggPT09IDMpIHtcbiAgICAgICAgICAgIF9jb250ZXh0LmRyYXdJbWFnZShhMCwgYTEsIGEyKTtcbiAgICAgICAgfVxuICAgICAgICBlbHNlIGlmIChhLmxlbmd0aCA9PT0gNSkge1xuICAgICAgICAgICAgX2NvbnRleHQuZHJhd0ltYWdlKGEwLCBhMSwgYTIsIGEzLCBhNCk7XG4gICAgICAgIH1cbiAgICAgICAgZWxzZSBpZiAoYS5sZW5ndGggPT09IDkpIHtcbiAgICAgICAgICAgIF9jb250ZXh0LmRyYXdJbWFnZShhMCwgYTEsIGEyLCBhMywgYTQsIGE1LCBhNiwgYTcsIGE4KTtcbiAgICAgICAgfVxuICAgIH1cbiAgICBlbGxpcHNlKGEwLCBhMSwgYTIsIGEzLCBhNCwgYTUsIGE2LCBhNykge1xuICAgICAgICB0aGlzLl9jb250ZXh0LmVsbGlwc2UoYTAsIGExLCBhMiwgYTMsIGE0LCBhNSwgYTYsIGE3KTtcbiAgICB9XG4gICAgaXNQb2ludEluUGF0aCh4LCB5LCBwYXRoLCBmaWxsUnVsZSkge1xuICAgICAgICBpZiAocGF0aCkge1xuICAgICAgICAgICAgcmV0dXJuIHRoaXMuX2NvbnRleHQuaXNQb2ludEluUGF0aChwYXRoLCB4LCB5LCBmaWxsUnVsZSk7XG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuIHRoaXMuX2NvbnRleHQuaXNQb2ludEluUGF0aCh4LCB5LCBmaWxsUnVsZSk7XG4gICAgfVxuICAgIGZpbGwocGF0aDJkKSB7XG4gICAgICAgIGlmIChwYXRoMmQpIHtcbiAgICAgICAgICAgIHRoaXMuX2NvbnRleHQuZmlsbChwYXRoMmQpO1xuICAgICAgICB9XG4gICAgICAgIGVsc2Uge1xuICAgICAgICAgICAgdGhpcy5fY29udGV4dC5maWxsKCk7XG4gICAgICAgIH1cbiAgICB9XG4gICAgZmlsbFJlY3QoeCwgeSwgd2lkdGgsIGhlaWdodCkge1xuICAgICAgICB0aGlzLl9jb250ZXh0LmZpbGxSZWN0KHgsIHksIHdpZHRoLCBoZWlnaHQpO1xuICAgIH1cbiAgICBzdHJva2VSZWN0KHgsIHksIHdpZHRoLCBoZWlnaHQpIHtcbiAgICAgICAgdGhpcy5fY29udGV4dC5zdHJva2VSZWN0KHgsIHksIHdpZHRoLCBoZWlnaHQpO1xuICAgIH1cbiAgICBmaWxsVGV4dCh0ZXh0LCB4LCB5LCBtYXhXaWR0aCkge1xuICAgICAgICBpZiAobWF4V2lkdGgpIHtcbiAgICAgICAgICAgIHRoaXMuX2NvbnRleHQuZmlsbFRleHQodGV4dCwgeCwgeSwgbWF4V2lkdGgpO1xuICAgICAgICB9XG4gICAgICAgIGVsc2Uge1xuICAgICAgICAgICAgdGhpcy5fY29udGV4dC5maWxsVGV4dCh0ZXh0LCB4LCB5KTtcbiAgICAgICAgfVxuICAgIH1cbiAgICBtZWFzdXJlVGV4dCh0ZXh0KSB7XG4gICAgICAgIHJldHVybiB0aGlzLl9jb250ZXh0Lm1lYXN1cmVUZXh0KHRleHQpO1xuICAgIH1cbiAgICBnZXRJbWFnZURhdGEoYTAsIGExLCBhMiwgYTMpIHtcbiAgICAgICAgcmV0dXJuIHRoaXMuX2NvbnRleHQuZ2V0SW1hZ2VEYXRhKGEwLCBhMSwgYTIsIGEzKTtcbiAgICB9XG4gICAgbGluZVRvKGEwLCBhMSkge1xuICAgICAgICB0aGlzLl9jb250ZXh0LmxpbmVUbyhhMCwgYTEpO1xuICAgIH1cbiAgICBtb3ZlVG8oYTAsIGExKSB7XG4gICAgICAgIHRoaXMuX2NvbnRleHQubW92ZVRvKGEwLCBhMSk7XG4gICAgfVxuICAgIHJlY3QoYTAsIGExLCBhMiwgYTMpIHtcbiAgICAgICAgdGhpcy5fY29udGV4dC5yZWN0KGEwLCBhMSwgYTIsIGEzKTtcbiAgICB9XG4gICAgcHV0SW1hZ2VEYXRhKGEwLCBhMSwgYTIpIHtcbiAgICAgICAgdGhpcy5fY29udGV4dC5wdXRJbWFnZURhdGEoYTAsIGExLCBhMik7XG4gICAgfVxuICAgIHF1YWRyYXRpY0N1cnZlVG8oYTAsIGExLCBhMiwgYTMpIHtcbiAgICAgICAgdGhpcy5fY29udGV4dC5xdWFkcmF0aWNDdXJ2ZVRvKGEwLCBhMSwgYTIsIGEzKTtcbiAgICB9XG4gICAgcmVzdG9yZSgpIHtcbiAgICAgICAgdGhpcy5fY29udGV4dC5yZXN0b3JlKCk7XG4gICAgfVxuICAgIHJvdGF0ZShhMCkge1xuICAgICAgICB0aGlzLl9jb250ZXh0LnJvdGF0ZShhMCk7XG4gICAgfVxuICAgIHNhdmUoKSB7XG4gICAgICAgIHRoaXMuX2NvbnRleHQuc2F2ZSgpO1xuICAgIH1cbiAgICBzY2FsZShhMCwgYTEpIHtcbiAgICAgICAgdGhpcy5fY29udGV4dC5zY2FsZShhMCwgYTEpO1xuICAgIH1cbiAgICBzZXRMaW5lRGFzaChhMCkge1xuICAgICAgICBpZiAodGhpcy5fY29udGV4dC5zZXRMaW5lRGFzaCkge1xuICAgICAgICAgICAgdGhpcy5fY29udGV4dC5zZXRMaW5lRGFzaChhMCk7XG4gICAgICAgIH1cbiAgICAgICAgZWxzZSBpZiAoJ21vekRhc2gnIGluIHRoaXMuX2NvbnRleHQpIHtcbiAgICAgICAgICAgIHRoaXMuX2NvbnRleHRbJ21vekRhc2gnXSA9IGEwO1xuICAgICAgICB9XG4gICAgICAgIGVsc2UgaWYgKCd3ZWJraXRMaW5lRGFzaCcgaW4gdGhpcy5fY29udGV4dCkge1xuICAgICAgICAgICAgdGhpcy5fY29udGV4dFsnd2Via2l0TGluZURhc2gnXSA9IGEwO1xuICAgICAgICB9XG4gICAgfVxuICAgIGdldExpbmVEYXNoKCkge1xuICAgICAgICByZXR1cm4gdGhpcy5fY29udGV4dC5nZXRMaW5lRGFzaCgpO1xuICAgIH1cbiAgICBzZXRUcmFuc2Zvcm0oYTAsIGExLCBhMiwgYTMsIGE0LCBhNSkge1xuICAgICAgICB0aGlzLl9jb250ZXh0LnNldFRyYW5zZm9ybShhMCwgYTEsIGEyLCBhMywgYTQsIGE1KTtcbiAgICB9XG4gICAgc3Ryb2tlKHBhdGgyZCkge1xuICAgICAgICBpZiAocGF0aDJkKSB7XG4gICAgICAgICAgICB0aGlzLl9jb250ZXh0LnN0cm9rZShwYXRoMmQpO1xuICAgICAgICB9XG4gICAgICAgIGVsc2Uge1xuICAgICAgICAgICAgdGhpcy5fY29udGV4dC5zdHJva2UoKTtcbiAgICAgICAgfVxuICAgIH1cbiAgICBzdHJva2VUZXh0KGEwLCBhMSwgYTIsIGEzKSB7XG4gICAgICAgIHRoaXMuX2NvbnRleHQuc3Ryb2tlVGV4dChhMCwgYTEsIGEyLCBhMyk7XG4gICAgfVxuICAgIHRyYW5zZm9ybShhMCwgYTEsIGEyLCBhMywgYTQsIGE1KSB7XG4gICAgICAgIHRoaXMuX2NvbnRleHQudHJhbnNmb3JtKGEwLCBhMSwgYTIsIGEzLCBhNCwgYTUpO1xuICAgIH1cbiAgICB0cmFuc2xhdGUoYTAsIGExKSB7XG4gICAgICAgIHRoaXMuX2NvbnRleHQudHJhbnNsYXRlKGEwLCBhMSk7XG4gICAgfVxuICAgIF9lbmFibGVUcmFjZSgpIHtcbiAgICAgICAgdmFyIHRoYXQgPSB0aGlzLCBsZW4gPSBDT05URVhUX01FVEhPRFMubGVuZ3RoLCBvcmlnU2V0dGVyID0gdGhpcy5zZXRBdHRyLCBuLCBhcmdzO1xuICAgICAgICB2YXIgZnVuYyA9IGZ1bmN0aW9uIChtZXRob2ROYW1lKSB7XG4gICAgICAgICAgICB2YXIgb3JpZ01ldGhvZCA9IHRoYXRbbWV0aG9kTmFtZV0sIHJldDtcbiAgICAgICAgICAgIHRoYXRbbWV0aG9kTmFtZV0gPSBmdW5jdGlvbiAoKSB7XG4gICAgICAgICAgICAgICAgYXJncyA9IHNpbXBsaWZ5QXJyYXkoQXJyYXkucHJvdG90eXBlLnNsaWNlLmNhbGwoYXJndW1lbnRzLCAwKSk7XG4gICAgICAgICAgICAgICAgcmV0ID0gb3JpZ01ldGhvZC5hcHBseSh0aGF0LCBhcmd1bWVudHMpO1xuICAgICAgICAgICAgICAgIHRoYXQuX3RyYWNlKHtcbiAgICAgICAgICAgICAgICAgICAgbWV0aG9kOiBtZXRob2ROYW1lLFxuICAgICAgICAgICAgICAgICAgICBhcmdzOiBhcmdzLFxuICAgICAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgICAgIHJldHVybiByZXQ7XG4gICAgICAgICAgICB9O1xuICAgICAgICB9O1xuICAgICAgICBmb3IgKG4gPSAwOyBuIDwgbGVuOyBuKyspIHtcbiAgICAgICAgICAgIGZ1bmMoQ09OVEVYVF9NRVRIT0RTW25dKTtcbiAgICAgICAgfVxuICAgICAgICB0aGF0LnNldEF0dHIgPSBmdW5jdGlvbiAoKSB7XG4gICAgICAgICAgICBvcmlnU2V0dGVyLmFwcGx5KHRoYXQsIGFyZ3VtZW50cyk7XG4gICAgICAgICAgICB2YXIgcHJvcCA9IGFyZ3VtZW50c1swXTtcbiAgICAgICAgICAgIHZhciB2YWwgPSBhcmd1bWVudHNbMV07XG4gICAgICAgICAgICBpZiAocHJvcCA9PT0gJ3NoYWRvd09mZnNldFgnIHx8XG4gICAgICAgICAgICAgICAgcHJvcCA9PT0gJ3NoYWRvd09mZnNldFknIHx8XG4gICAgICAgICAgICAgICAgcHJvcCA9PT0gJ3NoYWRvd0JsdXInKSB7XG4gICAgICAgICAgICAgICAgdmFsID0gdmFsIC8gdGhpcy5jYW52YXMuZ2V0UGl4ZWxSYXRpbygpO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgdGhhdC5fdHJhY2Uoe1xuICAgICAgICAgICAgICAgIHByb3BlcnR5OiBwcm9wLFxuICAgICAgICAgICAgICAgIHZhbDogdmFsLFxuICAgICAgICAgICAgfSk7XG4gICAgICAgIH07XG4gICAgfVxuICAgIF9hcHBseUdsb2JhbENvbXBvc2l0ZU9wZXJhdGlvbihub2RlKSB7XG4gICAgICAgIGNvbnN0IG9wID0gbm9kZS5hdHRycy5nbG9iYWxDb21wb3NpdGVPcGVyYXRpb247XG4gICAgICAgIHZhciBkZWYgPSAhb3AgfHwgb3AgPT09ICdzb3VyY2Utb3Zlcic7XG4gICAgICAgIGlmICghZGVmKSB7XG4gICAgICAgICAgICB0aGlzLnNldEF0dHIoJ2dsb2JhbENvbXBvc2l0ZU9wZXJhdGlvbicsIG9wKTtcbiAgICAgICAgfVxuICAgIH1cbn1cbjtcbkNPTlRFWFRfUFJPUEVSVElFUy5mb3JFYWNoKGZ1bmN0aW9uIChwcm9wKSB7XG4gICAgT2JqZWN0LmRlZmluZVByb3BlcnR5KENvbnRleHQucHJvdG90eXBlLCBwcm9wLCB7XG4gICAgICAgIGdldCgpIHtcbiAgICAgICAgICAgIHJldHVybiB0aGlzLl9jb250ZXh0W3Byb3BdO1xuICAgICAgICB9LFxuICAgICAgICBzZXQodmFsKSB7XG4gICAgICAgICAgICB0aGlzLl9jb250ZXh0W3Byb3BdID0gdmFsO1xuICAgICAgICB9LFxuICAgIH0pO1xufSk7XG5leHBvcnQgY2xhc3MgU2NlbmVDb250ZXh0IGV4dGVuZHMgQ29udGV4dCB7XG4gICAgY29uc3RydWN0b3IoY2FudmFzKSB7XG4gICAgICAgIHN1cGVyKGNhbnZhcyk7XG4gICAgICAgIHRoaXMuX2NvbnRleHQgPSBjYW52YXMuX2NhbnZhcy5nZXRDb250ZXh0KCcyZCcpO1xuICAgIH1cbiAgICBfZmlsbENvbG9yKHNoYXBlKSB7XG4gICAgICAgIHZhciBmaWxsID0gc2hhcGUuZmlsbCgpO1xuICAgICAgICB0aGlzLnNldEF0dHIoJ2ZpbGxTdHlsZScsIGZpbGwpO1xuICAgICAgICBzaGFwZS5fZmlsbEZ1bmModGhpcyk7XG4gICAgfVxuICAgIF9maWxsUGF0dGVybihzaGFwZSkge1xuICAgICAgICB0aGlzLnNldEF0dHIoJ2ZpbGxTdHlsZScsIHNoYXBlLl9nZXRGaWxsUGF0dGVybigpKTtcbiAgICAgICAgc2hhcGUuX2ZpbGxGdW5jKHRoaXMpO1xuICAgIH1cbiAgICBfZmlsbExpbmVhckdyYWRpZW50KHNoYXBlKSB7XG4gICAgICAgIHZhciBncmQgPSBzaGFwZS5fZ2V0TGluZWFyR3JhZGllbnQoKTtcbiAgICAgICAgaWYgKGdyZCkge1xuICAgICAgICAgICAgdGhpcy5zZXRBdHRyKCdmaWxsU3R5bGUnLCBncmQpO1xuICAgICAgICAgICAgc2hhcGUuX2ZpbGxGdW5jKHRoaXMpO1xuICAgICAgICB9XG4gICAgfVxuICAgIF9maWxsUmFkaWFsR3JhZGllbnQoc2hhcGUpIHtcbiAgICAgICAgdmFyIGdyZCA9IHNoYXBlLl9nZXRSYWRpYWxHcmFkaWVudCgpO1xuICAgICAgICBpZiAoZ3JkKSB7XG4gICAgICAgICAgICB0aGlzLnNldEF0dHIoJ2ZpbGxTdHlsZScsIGdyZCk7XG4gICAgICAgICAgICBzaGFwZS5fZmlsbEZ1bmModGhpcyk7XG4gICAgICAgIH1cbiAgICB9XG4gICAgX2ZpbGwoc2hhcGUpIHtcbiAgICAgICAgdmFyIGhhc0NvbG9yID0gc2hhcGUuZmlsbCgpLCBmaWxsUHJpb3JpdHkgPSBzaGFwZS5nZXRGaWxsUHJpb3JpdHkoKTtcbiAgICAgICAgaWYgKGhhc0NvbG9yICYmIGZpbGxQcmlvcml0eSA9PT0gJ2NvbG9yJykge1xuICAgICAgICAgICAgdGhpcy5fZmlsbENvbG9yKHNoYXBlKTtcbiAgICAgICAgICAgIHJldHVybjtcbiAgICAgICAgfVxuICAgICAgICB2YXIgaGFzUGF0dGVybiA9IHNoYXBlLmdldEZpbGxQYXR0ZXJuSW1hZ2UoKTtcbiAgICAgICAgaWYgKGhhc1BhdHRlcm4gJiYgZmlsbFByaW9yaXR5ID09PSAncGF0dGVybicpIHtcbiAgICAgICAgICAgIHRoaXMuX2ZpbGxQYXR0ZXJuKHNoYXBlKTtcbiAgICAgICAgICAgIHJldHVybjtcbiAgICAgICAgfVxuICAgICAgICB2YXIgaGFzTGluZWFyR3JhZGllbnQgPSBzaGFwZS5nZXRGaWxsTGluZWFyR3JhZGllbnRDb2xvclN0b3BzKCk7XG4gICAgICAgIGlmIChoYXNMaW5lYXJHcmFkaWVudCAmJiBmaWxsUHJpb3JpdHkgPT09ICdsaW5lYXItZ3JhZGllbnQnKSB7XG4gICAgICAgICAgICB0aGlzLl9maWxsTGluZWFyR3JhZGllbnQoc2hhcGUpO1xuICAgICAgICAgICAgcmV0dXJuO1xuICAgICAgICB9XG4gICAgICAgIHZhciBoYXNSYWRpYWxHcmFkaWVudCA9IHNoYXBlLmdldEZpbGxSYWRpYWxHcmFkaWVudENvbG9yU3RvcHMoKTtcbiAgICAgICAgaWYgKGhhc1JhZGlhbEdyYWRpZW50ICYmIGZpbGxQcmlvcml0eSA9PT0gJ3JhZGlhbC1ncmFkaWVudCcpIHtcbiAgICAgICAgICAgIHRoaXMuX2ZpbGxSYWRpYWxHcmFkaWVudChzaGFwZSk7XG4gICAgICAgICAgICByZXR1cm47XG4gICAgICAgIH1cbiAgICAgICAgaWYgKGhhc0NvbG9yKSB7XG4gICAgICAgICAgICB0aGlzLl9maWxsQ29sb3Ioc2hhcGUpO1xuICAgICAgICB9XG4gICAgICAgIGVsc2UgaWYgKGhhc1BhdHRlcm4pIHtcbiAgICAgICAgICAgIHRoaXMuX2ZpbGxQYXR0ZXJuKHNoYXBlKTtcbiAgICAgICAgfVxuICAgICAgICBlbHNlIGlmIChoYXNMaW5lYXJHcmFkaWVudCkge1xuICAgICAgICAgICAgdGhpcy5fZmlsbExpbmVhckdyYWRpZW50KHNoYXBlKTtcbiAgICAgICAgfVxuICAgICAgICBlbHNlIGlmIChoYXNSYWRpYWxHcmFkaWVudCkge1xuICAgICAgICAgICAgdGhpcy5fZmlsbFJhZGlhbEdyYWRpZW50KHNoYXBlKTtcbiAgICAgICAgfVxuICAgIH1cbiAgICBfc3Ryb2tlTGluZWFyR3JhZGllbnQoc2hhcGUpIHtcbiAgICAgICAgdmFyIHN0YXJ0ID0gc2hhcGUuZ2V0U3Ryb2tlTGluZWFyR3JhZGllbnRTdGFydFBvaW50KCksIGVuZCA9IHNoYXBlLmdldFN0cm9rZUxpbmVhckdyYWRpZW50RW5kUG9pbnQoKSwgY29sb3JTdG9wcyA9IHNoYXBlLmdldFN0cm9rZUxpbmVhckdyYWRpZW50Q29sb3JTdG9wcygpLCBncmQgPSB0aGlzLmNyZWF0ZUxpbmVhckdyYWRpZW50KHN0YXJ0LngsIHN0YXJ0LnksIGVuZC54LCBlbmQueSk7XG4gICAgICAgIGlmIChjb2xvclN0b3BzKSB7XG4gICAgICAgICAgICBmb3IgKHZhciBuID0gMDsgbiA8IGNvbG9yU3RvcHMubGVuZ3RoOyBuICs9IDIpIHtcbiAgICAgICAgICAgICAgICBncmQuYWRkQ29sb3JTdG9wKGNvbG9yU3RvcHNbbl0sIGNvbG9yU3RvcHNbbiArIDFdKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIHRoaXMuc2V0QXR0cignc3Ryb2tlU3R5bGUnLCBncmQpO1xuICAgICAgICB9XG4gICAgfVxuICAgIF9zdHJva2Uoc2hhcGUpIHtcbiAgICAgICAgdmFyIGRhc2ggPSBzaGFwZS5kYXNoKCksIHN0cm9rZVNjYWxlRW5hYmxlZCA9IHNoYXBlLmdldFN0cm9rZVNjYWxlRW5hYmxlZCgpO1xuICAgICAgICBpZiAoc2hhcGUuaGFzU3Ryb2tlKCkpIHtcbiAgICAgICAgICAgIGlmICghc3Ryb2tlU2NhbGVFbmFibGVkKSB7XG4gICAgICAgICAgICAgICAgdGhpcy5zYXZlKCk7XG4gICAgICAgICAgICAgICAgdmFyIHBpeGVsUmF0aW8gPSB0aGlzLmdldENhbnZhcygpLmdldFBpeGVsUmF0aW8oKTtcbiAgICAgICAgICAgICAgICB0aGlzLnNldFRyYW5zZm9ybShwaXhlbFJhdGlvLCAwLCAwLCBwaXhlbFJhdGlvLCAwLCAwKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIHRoaXMuX2FwcGx5TGluZUNhcChzaGFwZSk7XG4gICAgICAgICAgICBpZiAoZGFzaCAmJiBzaGFwZS5kYXNoRW5hYmxlZCgpKSB7XG4gICAgICAgICAgICAgICAgdGhpcy5zZXRMaW5lRGFzaChkYXNoKTtcbiAgICAgICAgICAgICAgICB0aGlzLnNldEF0dHIoJ2xpbmVEYXNoT2Zmc2V0Jywgc2hhcGUuZGFzaE9mZnNldCgpKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIHRoaXMuc2V0QXR0cignbGluZVdpZHRoJywgc2hhcGUuc3Ryb2tlV2lkdGgoKSk7XG4gICAgICAgICAgICBpZiAoIXNoYXBlLmdldFNoYWRvd0ZvclN0cm9rZUVuYWJsZWQoKSkge1xuICAgICAgICAgICAgICAgIHRoaXMuc2V0QXR0cignc2hhZG93Q29sb3InLCAncmdiYSgwLDAsMCwwKScpO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgdmFyIGhhc0xpbmVhckdyYWRpZW50ID0gc2hhcGUuZ2V0U3Ryb2tlTGluZWFyR3JhZGllbnRDb2xvclN0b3BzKCk7XG4gICAgICAgICAgICBpZiAoaGFzTGluZWFyR3JhZGllbnQpIHtcbiAgICAgICAgICAgICAgICB0aGlzLl9zdHJva2VMaW5lYXJHcmFkaWVudChzaGFwZSk7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBlbHNlIHtcbiAgICAgICAgICAgICAgICB0aGlzLnNldEF0dHIoJ3N0cm9rZVN0eWxlJywgc2hhcGUuc3Ryb2tlKCkpO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgc2hhcGUuX3N0cm9rZUZ1bmModGhpcyk7XG4gICAgICAgICAgICBpZiAoIXN0cm9rZVNjYWxlRW5hYmxlZCkge1xuICAgICAgICAgICAgICAgIHRoaXMucmVzdG9yZSgpO1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgfVxuICAgIF9hcHBseVNoYWRvdyhzaGFwZSkge1xuICAgICAgICB2YXIgX2EsIF9iLCBfYztcbiAgICAgICAgdmFyIGNvbG9yID0gKF9hID0gc2hhcGUuZ2V0U2hhZG93UkdCQSgpKSAhPT0gbnVsbCAmJiBfYSAhPT0gdm9pZCAwID8gX2EgOiAnYmxhY2snLCBibHVyID0gKF9iID0gc2hhcGUuZ2V0U2hhZG93Qmx1cigpKSAhPT0gbnVsbCAmJiBfYiAhPT0gdm9pZCAwID8gX2IgOiA1LCBvZmZzZXQgPSAoX2MgPSBzaGFwZS5nZXRTaGFkb3dPZmZzZXQoKSkgIT09IG51bGwgJiYgX2MgIT09IHZvaWQgMCA/IF9jIDoge1xuICAgICAgICAgICAgeDogMCxcbiAgICAgICAgICAgIHk6IDAsXG4gICAgICAgIH0sIHNjYWxlID0gc2hhcGUuZ2V0QWJzb2x1dGVTY2FsZSgpLCByYXRpbyA9IHRoaXMuY2FudmFzLmdldFBpeGVsUmF0aW8oKSwgc2NhbGVYID0gc2NhbGUueCAqIHJhdGlvLCBzY2FsZVkgPSBzY2FsZS55ICogcmF0aW87XG4gICAgICAgIHRoaXMuc2V0QXR0cignc2hhZG93Q29sb3InLCBjb2xvcik7XG4gICAgICAgIHRoaXMuc2V0QXR0cignc2hhZG93Qmx1cicsIGJsdXIgKiBNYXRoLm1pbihNYXRoLmFicyhzY2FsZVgpLCBNYXRoLmFicyhzY2FsZVkpKSk7XG4gICAgICAgIHRoaXMuc2V0QXR0cignc2hhZG93T2Zmc2V0WCcsIG9mZnNldC54ICogc2NhbGVYKTtcbiAgICAgICAgdGhpcy5zZXRBdHRyKCdzaGFkb3dPZmZzZXRZJywgb2Zmc2V0LnkgKiBzY2FsZVkpO1xuICAgIH1cbn1cbmV4cG9ydCBjbGFzcyBIaXRDb250ZXh0IGV4dGVuZHMgQ29udGV4dCB7XG4gICAgY29uc3RydWN0b3IoY2FudmFzKSB7XG4gICAgICAgIHN1cGVyKGNhbnZhcyk7XG4gICAgICAgIHRoaXMuX2NvbnRleHQgPSBjYW52YXMuX2NhbnZhcy5nZXRDb250ZXh0KCcyZCcsIHtcbiAgICAgICAgICAgIHdpbGxSZWFkRnJlcXVlbnRseTogdHJ1ZSxcbiAgICAgICAgfSk7XG4gICAgfVxuICAgIF9maWxsKHNoYXBlKSB7XG4gICAgICAgIHRoaXMuc2F2ZSgpO1xuICAgICAgICB0aGlzLnNldEF0dHIoJ2ZpbGxTdHlsZScsIHNoYXBlLmNvbG9yS2V5KTtcbiAgICAgICAgc2hhcGUuX2ZpbGxGdW5jSGl0KHRoaXMpO1xuICAgICAgICB0aGlzLnJlc3RvcmUoKTtcbiAgICB9XG4gICAgc3Ryb2tlU2hhcGUoc2hhcGUpIHtcbiAgICAgICAgaWYgKHNoYXBlLmhhc0hpdFN0cm9rZSgpKSB7XG4gICAgICAgICAgICB0aGlzLl9zdHJva2Uoc2hhcGUpO1xuICAgICAgICB9XG4gICAgfVxuICAgIF9zdHJva2Uoc2hhcGUpIHtcbiAgICAgICAgaWYgKHNoYXBlLmhhc0hpdFN0cm9rZSgpKSB7XG4gICAgICAgICAgICB2YXIgc3Ryb2tlU2NhbGVFbmFibGVkID0gc2hhcGUuZ2V0U3Ryb2tlU2NhbGVFbmFibGVkKCk7XG4gICAgICAgICAgICBpZiAoIXN0cm9rZVNjYWxlRW5hYmxlZCkge1xuICAgICAgICAgICAgICAgIHRoaXMuc2F2ZSgpO1xuICAgICAgICAgICAgICAgIHZhciBwaXhlbFJhdGlvID0gdGhpcy5nZXRDYW52YXMoKS5nZXRQaXhlbFJhdGlvKCk7XG4gICAgICAgICAgICAgICAgdGhpcy5zZXRUcmFuc2Zvcm0ocGl4ZWxSYXRpbywgMCwgMCwgcGl4ZWxSYXRpbywgMCwgMCk7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICB0aGlzLl9hcHBseUxpbmVDYXAoc2hhcGUpO1xuICAgICAgICAgICAgdmFyIGhpdFN0cm9rZVdpZHRoID0gc2hhcGUuaGl0U3Ryb2tlV2lkdGgoKTtcbiAgICAgICAgICAgIHZhciBzdHJva2VXaWR0aCA9IGhpdFN0cm9rZVdpZHRoID09PSAnYXV0bycgPyBzaGFwZS5zdHJva2VXaWR0aCgpIDogaGl0U3Ryb2tlV2lkdGg7XG4gICAgICAgICAgICB0aGlzLnNldEF0dHIoJ2xpbmVXaWR0aCcsIHN0cm9rZVdpZHRoKTtcbiAgICAgICAgICAgIHRoaXMuc2V0QXR0cignc3Ryb2tlU3R5bGUnLCBzaGFwZS5jb2xvcktleSk7XG4gICAgICAgICAgICBzaGFwZS5fc3Ryb2tlRnVuY0hpdCh0aGlzKTtcbiAgICAgICAgICAgIGlmICghc3Ryb2tlU2NhbGVFbmFibGVkKSB7XG4gICAgICAgICAgICAgICAgdGhpcy5yZXN0b3JlKCk7XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICB9XG59XG4iLCJleHBvcnQgeyBLb252YSB9IGZyb20gJy4vX0NvcmVJbnRlcm5hbHMuanMnO1xuaW1wb3J0IHsgS29udmEgfSBmcm9tICcuL19Db3JlSW50ZXJuYWxzLmpzJztcbmV4cG9ydCBkZWZhdWx0IEtvbnZhO1xuIiwiaW1wb3J0IHsgS29udmEgfSBmcm9tICcuL0dsb2JhbC5qcyc7XG5pbXBvcnQgeyBVdGlsIH0gZnJvbSAnLi9VdGlsLmpzJztcbmV4cG9ydCBjb25zdCBERCA9IHtcbiAgICBnZXQgaXNEcmFnZ2luZygpIHtcbiAgICAgICAgdmFyIGZsYWcgPSBmYWxzZTtcbiAgICAgICAgREQuX2RyYWdFbGVtZW50cy5mb3JFYWNoKChlbGVtKSA9PiB7XG4gICAgICAgICAgICBpZiAoZWxlbS5kcmFnU3RhdHVzID09PSAnZHJhZ2dpbmcnKSB7XG4gICAgICAgICAgICAgICAgZmxhZyA9IHRydWU7XG4gICAgICAgICAgICB9XG4gICAgICAgIH0pO1xuICAgICAgICByZXR1cm4gZmxhZztcbiAgICB9LFxuICAgIGp1c3REcmFnZ2VkOiBmYWxzZSxcbiAgICBnZXQgbm9kZSgpIHtcbiAgICAgICAgdmFyIG5vZGU7XG4gICAgICAgIERELl9kcmFnRWxlbWVudHMuZm9yRWFjaCgoZWxlbSkgPT4ge1xuICAgICAgICAgICAgbm9kZSA9IGVsZW0ubm9kZTtcbiAgICAgICAgfSk7XG4gICAgICAgIHJldHVybiBub2RlO1xuICAgIH0sXG4gICAgX2RyYWdFbGVtZW50czogbmV3IE1hcCgpLFxuICAgIF9kcmFnKGV2dCkge1xuICAgICAgICBjb25zdCBub2Rlc1RvRmlyZUV2ZW50cyA9IFtdO1xuICAgICAgICBERC5fZHJhZ0VsZW1lbnRzLmZvckVhY2goKGVsZW0sIGtleSkgPT4ge1xuICAgICAgICAgICAgY29uc3QgeyBub2RlIH0gPSBlbGVtO1xuICAgICAgICAgICAgY29uc3Qgc3RhZ2UgPSBub2RlLmdldFN0YWdlKCk7XG4gICAgICAgICAgICBzdGFnZS5zZXRQb2ludGVyc1Bvc2l0aW9ucyhldnQpO1xuICAgICAgICAgICAgaWYgKGVsZW0ucG9pbnRlcklkID09PSB1bmRlZmluZWQpIHtcbiAgICAgICAgICAgICAgICBlbGVtLnBvaW50ZXJJZCA9IFV0aWwuX2dldEZpcnN0UG9pbnRlcklkKGV2dCk7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBjb25zdCBwb3MgPSBzdGFnZS5fY2hhbmdlZFBvaW50ZXJQb3NpdGlvbnMuZmluZCgocG9zKSA9PiBwb3MuaWQgPT09IGVsZW0ucG9pbnRlcklkKTtcbiAgICAgICAgICAgIGlmICghcG9zKSB7XG4gICAgICAgICAgICAgICAgcmV0dXJuO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgaWYgKGVsZW0uZHJhZ1N0YXR1cyAhPT0gJ2RyYWdnaW5nJykge1xuICAgICAgICAgICAgICAgIHZhciBkcmFnRGlzdGFuY2UgPSBub2RlLmRyYWdEaXN0YW5jZSgpO1xuICAgICAgICAgICAgICAgIHZhciBkaXN0YW5jZSA9IE1hdGgubWF4KE1hdGguYWJzKHBvcy54IC0gZWxlbS5zdGFydFBvaW50ZXJQb3MueCksIE1hdGguYWJzKHBvcy55IC0gZWxlbS5zdGFydFBvaW50ZXJQb3MueSkpO1xuICAgICAgICAgICAgICAgIGlmIChkaXN0YW5jZSA8IGRyYWdEaXN0YW5jZSkge1xuICAgICAgICAgICAgICAgICAgICByZXR1cm47XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIG5vZGUuc3RhcnREcmFnKHsgZXZ0IH0pO1xuICAgICAgICAgICAgICAgIGlmICghbm9kZS5pc0RyYWdnaW5nKCkpIHtcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIG5vZGUuX3NldERyYWdQb3NpdGlvbihldnQsIGVsZW0pO1xuICAgICAgICAgICAgbm9kZXNUb0ZpcmVFdmVudHMucHVzaChub2RlKTtcbiAgICAgICAgfSk7XG4gICAgICAgIG5vZGVzVG9GaXJlRXZlbnRzLmZvckVhY2goKG5vZGUpID0+IHtcbiAgICAgICAgICAgIG5vZGUuZmlyZSgnZHJhZ21vdmUnLCB7XG4gICAgICAgICAgICAgICAgdHlwZTogJ2RyYWdtb3ZlJyxcbiAgICAgICAgICAgICAgICB0YXJnZXQ6IG5vZGUsXG4gICAgICAgICAgICAgICAgZXZ0OiBldnQsXG4gICAgICAgICAgICB9LCB0cnVlKTtcbiAgICAgICAgfSk7XG4gICAgfSxcbiAgICBfZW5kRHJhZ0JlZm9yZShldnQpIHtcbiAgICAgICAgY29uc3QgZHJhd05vZGVzID0gW107XG4gICAgICAgIERELl9kcmFnRWxlbWVudHMuZm9yRWFjaCgoZWxlbSkgPT4ge1xuICAgICAgICAgICAgY29uc3QgeyBub2RlIH0gPSBlbGVtO1xuICAgICAgICAgICAgY29uc3Qgc3RhZ2UgPSBub2RlLmdldFN0YWdlKCk7XG4gICAgICAgICAgICBpZiAoZXZ0KSB7XG4gICAgICAgICAgICAgICAgc3RhZ2Uuc2V0UG9pbnRlcnNQb3NpdGlvbnMoZXZ0KTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGNvbnN0IHBvcyA9IHN0YWdlLl9jaGFuZ2VkUG9pbnRlclBvc2l0aW9ucy5maW5kKChwb3MpID0+IHBvcy5pZCA9PT0gZWxlbS5wb2ludGVySWQpO1xuICAgICAgICAgICAgaWYgKCFwb3MpIHtcbiAgICAgICAgICAgICAgICByZXR1cm47XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBpZiAoZWxlbS5kcmFnU3RhdHVzID09PSAnZHJhZ2dpbmcnIHx8IGVsZW0uZHJhZ1N0YXR1cyA9PT0gJ3N0b3BwZWQnKSB7XG4gICAgICAgICAgICAgICAgREQuanVzdERyYWdnZWQgPSB0cnVlO1xuICAgICAgICAgICAgICAgIEtvbnZhLl9tb3VzZUxpc3RlbkNsaWNrID0gZmFsc2U7XG4gICAgICAgICAgICAgICAgS29udmEuX3RvdWNoTGlzdGVuQ2xpY2sgPSBmYWxzZTtcbiAgICAgICAgICAgICAgICBLb252YS5fcG9pbnRlckxpc3RlbkNsaWNrID0gZmFsc2U7XG4gICAgICAgICAgICAgICAgZWxlbS5kcmFnU3RhdHVzID0gJ3N0b3BwZWQnO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgY29uc3QgZHJhd05vZGUgPSBlbGVtLm5vZGUuZ2V0TGF5ZXIoKSB8fFxuICAgICAgICAgICAgICAgIChlbGVtLm5vZGUgaW5zdGFuY2VvZiBLb252YVsnU3RhZ2UnXSAmJiBlbGVtLm5vZGUpO1xuICAgICAgICAgICAgaWYgKGRyYXdOb2RlICYmIGRyYXdOb2Rlcy5pbmRleE9mKGRyYXdOb2RlKSA9PT0gLTEpIHtcbiAgICAgICAgICAgICAgICBkcmF3Tm9kZXMucHVzaChkcmF3Tm9kZSk7XG4gICAgICAgICAgICB9XG4gICAgICAgIH0pO1xuICAgICAgICBkcmF3Tm9kZXMuZm9yRWFjaCgoZHJhd05vZGUpID0+IHtcbiAgICAgICAgICAgIGRyYXdOb2RlLmRyYXcoKTtcbiAgICAgICAgfSk7XG4gICAgfSxcbiAgICBfZW5kRHJhZ0FmdGVyKGV2dCkge1xuICAgICAgICBERC5fZHJhZ0VsZW1lbnRzLmZvckVhY2goKGVsZW0sIGtleSkgPT4ge1xuICAgICAgICAgICAgaWYgKGVsZW0uZHJhZ1N0YXR1cyA9PT0gJ3N0b3BwZWQnKSB7XG4gICAgICAgICAgICAgICAgZWxlbS5ub2RlLmZpcmUoJ2RyYWdlbmQnLCB7XG4gICAgICAgICAgICAgICAgICAgIHR5cGU6ICdkcmFnZW5kJyxcbiAgICAgICAgICAgICAgICAgICAgdGFyZ2V0OiBlbGVtLm5vZGUsXG4gICAgICAgICAgICAgICAgICAgIGV2dDogZXZ0LFxuICAgICAgICAgICAgICAgIH0sIHRydWUpO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgaWYgKGVsZW0uZHJhZ1N0YXR1cyAhPT0gJ2RyYWdnaW5nJykge1xuICAgICAgICAgICAgICAgIERELl9kcmFnRWxlbWVudHMuZGVsZXRlKGtleSk7XG4gICAgICAgICAgICB9XG4gICAgICAgIH0pO1xuICAgIH0sXG59O1xuaWYgKEtvbnZhLmlzQnJvd3Nlcikge1xuICAgIHdpbmRvdy5hZGRFdmVudExpc3RlbmVyKCdtb3VzZXVwJywgREQuX2VuZERyYWdCZWZvcmUsIHRydWUpO1xuICAgIHdpbmRvdy5hZGRFdmVudExpc3RlbmVyKCd0b3VjaGVuZCcsIERELl9lbmREcmFnQmVmb3JlLCB0cnVlKTtcbiAgICB3aW5kb3cuYWRkRXZlbnRMaXN0ZW5lcignbW91c2Vtb3ZlJywgREQuX2RyYWcpO1xuICAgIHdpbmRvdy5hZGRFdmVudExpc3RlbmVyKCd0b3VjaG1vdmUnLCBERC5fZHJhZyk7XG4gICAgd2luZG93LmFkZEV2ZW50TGlzdGVuZXIoJ21vdXNldXAnLCBERC5fZW5kRHJhZ0FmdGVyLCBmYWxzZSk7XG4gICAgd2luZG93LmFkZEV2ZW50TGlzdGVuZXIoJ3RvdWNoZW5kJywgREQuX2VuZERyYWdBZnRlciwgZmFsc2UpO1xufVxuIiwiaW1wb3J0IHsgVXRpbCB9IGZyb20gJy4vVXRpbC5qcyc7XG5pbXBvcnQgeyBnZXRDb21wb25lbnRWYWxpZGF0b3IgfSBmcm9tICcuL1ZhbGlkYXRvcnMuanMnO1xudmFyIEdFVCA9ICdnZXQnLCBTRVQgPSAnc2V0JztcbmV4cG9ydCBjb25zdCBGYWN0b3J5ID0ge1xuICAgIGFkZEdldHRlclNldHRlcihjb25zdHJ1Y3RvciwgYXR0ciwgZGVmLCB2YWxpZGF0b3IsIGFmdGVyKSB7XG4gICAgICAgIEZhY3RvcnkuYWRkR2V0dGVyKGNvbnN0cnVjdG9yLCBhdHRyLCBkZWYpO1xuICAgICAgICBGYWN0b3J5LmFkZFNldHRlcihjb25zdHJ1Y3RvciwgYXR0ciwgdmFsaWRhdG9yLCBhZnRlcik7XG4gICAgICAgIEZhY3RvcnkuYWRkT3ZlcmxvYWRlZEdldHRlclNldHRlcihjb25zdHJ1Y3RvciwgYXR0cik7XG4gICAgfSxcbiAgICBhZGRHZXR0ZXIoY29uc3RydWN0b3IsIGF0dHIsIGRlZikge1xuICAgICAgICB2YXIgbWV0aG9kID0gR0VUICsgVXRpbC5fY2FwaXRhbGl6ZShhdHRyKTtcbiAgICAgICAgY29uc3RydWN0b3IucHJvdG90eXBlW21ldGhvZF0gPVxuICAgICAgICAgICAgY29uc3RydWN0b3IucHJvdG90eXBlW21ldGhvZF0gfHxcbiAgICAgICAgICAgICAgICBmdW5jdGlvbiAoKSB7XG4gICAgICAgICAgICAgICAgICAgIHZhciB2YWwgPSB0aGlzLmF0dHJzW2F0dHJdO1xuICAgICAgICAgICAgICAgICAgICByZXR1cm4gdmFsID09PSB1bmRlZmluZWQgPyBkZWYgOiB2YWw7XG4gICAgICAgICAgICAgICAgfTtcbiAgICB9LFxuICAgIGFkZFNldHRlcihjb25zdHJ1Y3RvciwgYXR0ciwgdmFsaWRhdG9yLCBhZnRlcikge1xuICAgICAgICB2YXIgbWV0aG9kID0gU0VUICsgVXRpbC5fY2FwaXRhbGl6ZShhdHRyKTtcbiAgICAgICAgaWYgKCFjb25zdHJ1Y3Rvci5wcm90b3R5cGVbbWV0aG9kXSkge1xuICAgICAgICAgICAgRmFjdG9yeS5vdmVyV3JpdGVTZXR0ZXIoY29uc3RydWN0b3IsIGF0dHIsIHZhbGlkYXRvciwgYWZ0ZXIpO1xuICAgICAgICB9XG4gICAgfSxcbiAgICBvdmVyV3JpdGVTZXR0ZXIoY29uc3RydWN0b3IsIGF0dHIsIHZhbGlkYXRvciwgYWZ0ZXIpIHtcbiAgICAgICAgdmFyIG1ldGhvZCA9IFNFVCArIFV0aWwuX2NhcGl0YWxpemUoYXR0cik7XG4gICAgICAgIGNvbnN0cnVjdG9yLnByb3RvdHlwZVttZXRob2RdID0gZnVuY3Rpb24gKHZhbCkge1xuICAgICAgICAgICAgaWYgKHZhbGlkYXRvciAmJiB2YWwgIT09IHVuZGVmaW5lZCAmJiB2YWwgIT09IG51bGwpIHtcbiAgICAgICAgICAgICAgICB2YWwgPSB2YWxpZGF0b3IuY2FsbCh0aGlzLCB2YWwsIGF0dHIpO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgdGhpcy5fc2V0QXR0cihhdHRyLCB2YWwpO1xuICAgICAgICAgICAgaWYgKGFmdGVyKSB7XG4gICAgICAgICAgICAgICAgYWZ0ZXIuY2FsbCh0aGlzKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIHJldHVybiB0aGlzO1xuICAgICAgICB9O1xuICAgIH0sXG4gICAgYWRkQ29tcG9uZW50c0dldHRlclNldHRlcihjb25zdHJ1Y3RvciwgYXR0ciwgY29tcG9uZW50cywgdmFsaWRhdG9yLCBhZnRlcikge1xuICAgICAgICB2YXIgbGVuID0gY29tcG9uZW50cy5sZW5ndGgsIGNhcGl0YWxpemUgPSBVdGlsLl9jYXBpdGFsaXplLCBnZXR0ZXIgPSBHRVQgKyBjYXBpdGFsaXplKGF0dHIpLCBzZXR0ZXIgPSBTRVQgKyBjYXBpdGFsaXplKGF0dHIpLCBuLCBjb21wb25lbnQ7XG4gICAgICAgIGNvbnN0cnVjdG9yLnByb3RvdHlwZVtnZXR0ZXJdID0gZnVuY3Rpb24gKCkge1xuICAgICAgICAgICAgdmFyIHJldCA9IHt9O1xuICAgICAgICAgICAgZm9yIChuID0gMDsgbiA8IGxlbjsgbisrKSB7XG4gICAgICAgICAgICAgICAgY29tcG9uZW50ID0gY29tcG9uZW50c1tuXTtcbiAgICAgICAgICAgICAgICByZXRbY29tcG9uZW50XSA9IHRoaXMuZ2V0QXR0cihhdHRyICsgY2FwaXRhbGl6ZShjb21wb25lbnQpKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIHJldHVybiByZXQ7XG4gICAgICAgIH07XG4gICAgICAgIHZhciBiYXNpY1ZhbGlkYXRvciA9IGdldENvbXBvbmVudFZhbGlkYXRvcihjb21wb25lbnRzKTtcbiAgICAgICAgY29uc3RydWN0b3IucHJvdG90eXBlW3NldHRlcl0gPSBmdW5jdGlvbiAodmFsKSB7XG4gICAgICAgICAgICB2YXIgb2xkVmFsID0gdGhpcy5hdHRyc1thdHRyXSwga2V5O1xuICAgICAgICAgICAgaWYgKHZhbGlkYXRvcikge1xuICAgICAgICAgICAgICAgIHZhbCA9IHZhbGlkYXRvci5jYWxsKHRoaXMsIHZhbCk7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBpZiAoYmFzaWNWYWxpZGF0b3IpIHtcbiAgICAgICAgICAgICAgICBiYXNpY1ZhbGlkYXRvci5jYWxsKHRoaXMsIHZhbCwgYXR0cik7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBmb3IgKGtleSBpbiB2YWwpIHtcbiAgICAgICAgICAgICAgICBpZiAoIXZhbC5oYXNPd25Qcm9wZXJ0eShrZXkpKSB7XG4gICAgICAgICAgICAgICAgICAgIGNvbnRpbnVlO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICB0aGlzLl9zZXRBdHRyKGF0dHIgKyBjYXBpdGFsaXplKGtleSksIHZhbFtrZXldKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGlmICghdmFsKSB7XG4gICAgICAgICAgICAgICAgY29tcG9uZW50cy5mb3JFYWNoKChjb21wb25lbnQpID0+IHtcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5fc2V0QXR0cihhdHRyICsgY2FwaXRhbGl6ZShjb21wb25lbnQpLCB1bmRlZmluZWQpO1xuICAgICAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgdGhpcy5fZmlyZUNoYW5nZUV2ZW50KGF0dHIsIG9sZFZhbCwgdmFsKTtcbiAgICAgICAgICAgIGlmIChhZnRlcikge1xuICAgICAgICAgICAgICAgIGFmdGVyLmNhbGwodGhpcyk7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICByZXR1cm4gdGhpcztcbiAgICAgICAgfTtcbiAgICAgICAgRmFjdG9yeS5hZGRPdmVybG9hZGVkR2V0dGVyU2V0dGVyKGNvbnN0cnVjdG9yLCBhdHRyKTtcbiAgICB9LFxuICAgIGFkZE92ZXJsb2FkZWRHZXR0ZXJTZXR0ZXIoY29uc3RydWN0b3IsIGF0dHIpIHtcbiAgICAgICAgdmFyIGNhcGl0YWxpemVkQXR0ciA9IFV0aWwuX2NhcGl0YWxpemUoYXR0ciksIHNldHRlciA9IFNFVCArIGNhcGl0YWxpemVkQXR0ciwgZ2V0dGVyID0gR0VUICsgY2FwaXRhbGl6ZWRBdHRyO1xuICAgICAgICBjb25zdHJ1Y3Rvci5wcm90b3R5cGVbYXR0cl0gPSBmdW5jdGlvbiAoKSB7XG4gICAgICAgICAgICBpZiAoYXJndW1lbnRzLmxlbmd0aCkge1xuICAgICAgICAgICAgICAgIHRoaXNbc2V0dGVyXShhcmd1bWVudHNbMF0pO1xuICAgICAgICAgICAgICAgIHJldHVybiB0aGlzO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgcmV0dXJuIHRoaXNbZ2V0dGVyXSgpO1xuICAgICAgICB9O1xuICAgIH0sXG4gICAgYWRkRGVwcmVjYXRlZEdldHRlclNldHRlcihjb25zdHJ1Y3RvciwgYXR0ciwgZGVmLCB2YWxpZGF0b3IpIHtcbiAgICAgICAgVXRpbC5lcnJvcignQWRkaW5nIGRlcHJlY2F0ZWQgJyArIGF0dHIpO1xuICAgICAgICB2YXIgbWV0aG9kID0gR0VUICsgVXRpbC5fY2FwaXRhbGl6ZShhdHRyKTtcbiAgICAgICAgdmFyIG1lc3NhZ2UgPSBhdHRyICtcbiAgICAgICAgICAgICcgcHJvcGVydHkgaXMgZGVwcmVjYXRlZCBhbmQgd2lsbCBiZSByZW1vdmVkIHNvb24uIExvb2sgYXQgS29udmEgY2hhbmdlIGxvZyBmb3IgbW9yZSBpbmZvcm1hdGlvbi4nO1xuICAgICAgICBjb25zdHJ1Y3Rvci5wcm90b3R5cGVbbWV0aG9kXSA9IGZ1bmN0aW9uICgpIHtcbiAgICAgICAgICAgIFV0aWwuZXJyb3IobWVzc2FnZSk7XG4gICAgICAgICAgICB2YXIgdmFsID0gdGhpcy5hdHRyc1thdHRyXTtcbiAgICAgICAgICAgIHJldHVybiB2YWwgPT09IHVuZGVmaW5lZCA/IGRlZiA6IHZhbDtcbiAgICAgICAgfTtcbiAgICAgICAgRmFjdG9yeS5hZGRTZXR0ZXIoY29uc3RydWN0b3IsIGF0dHIsIHZhbGlkYXRvciwgZnVuY3Rpb24gKCkge1xuICAgICAgICAgICAgVXRpbC5lcnJvcihtZXNzYWdlKTtcbiAgICAgICAgfSk7XG4gICAgICAgIEZhY3RvcnkuYWRkT3ZlcmxvYWRlZEdldHRlclNldHRlcihjb25zdHJ1Y3RvciwgYXR0cik7XG4gICAgfSxcbiAgICBiYWNrQ29tcGF0KGNvbnN0cnVjdG9yLCBtZXRob2RzKSB7XG4gICAgICAgIFV0aWwuZWFjaChtZXRob2RzLCBmdW5jdGlvbiAob2xkTWV0aG9kTmFtZSwgbmV3TWV0aG9kTmFtZSkge1xuICAgICAgICAgICAgdmFyIG1ldGhvZCA9IGNvbnN0cnVjdG9yLnByb3RvdHlwZVtuZXdNZXRob2ROYW1lXTtcbiAgICAgICAgICAgIHZhciBvbGRHZXR0ZXIgPSBHRVQgKyBVdGlsLl9jYXBpdGFsaXplKG9sZE1ldGhvZE5hbWUpO1xuICAgICAgICAgICAgdmFyIG9sZFNldHRlciA9IFNFVCArIFV0aWwuX2NhcGl0YWxpemUob2xkTWV0aG9kTmFtZSk7XG4gICAgICAgICAgICBmdW5jdGlvbiBkZXByZWNhdGVkKCkge1xuICAgICAgICAgICAgICAgIG1ldGhvZC5hcHBseSh0aGlzLCBhcmd1bWVudHMpO1xuICAgICAgICAgICAgICAgIFV0aWwuZXJyb3IoJ1wiJyArXG4gICAgICAgICAgICAgICAgICAgIG9sZE1ldGhvZE5hbWUgK1xuICAgICAgICAgICAgICAgICAgICAnXCIgbWV0aG9kIGlzIGRlcHJlY2F0ZWQgYW5kIHdpbGwgYmUgcmVtb3ZlZCBzb29uLiBVc2UgXCJcIicgK1xuICAgICAgICAgICAgICAgICAgICBuZXdNZXRob2ROYW1lICtcbiAgICAgICAgICAgICAgICAgICAgJ1wiIGluc3RlYWQuJyk7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBjb25zdHJ1Y3Rvci5wcm90b3R5cGVbb2xkTWV0aG9kTmFtZV0gPSBkZXByZWNhdGVkO1xuICAgICAgICAgICAgY29uc3RydWN0b3IucHJvdG90eXBlW29sZEdldHRlcl0gPSBkZXByZWNhdGVkO1xuICAgICAgICAgICAgY29uc3RydWN0b3IucHJvdG90eXBlW29sZFNldHRlcl0gPSBkZXByZWNhdGVkO1xuICAgICAgICB9KTtcbiAgICB9LFxuICAgIGFmdGVyU2V0RmlsdGVyKCkge1xuICAgICAgICB0aGlzLl9maWx0ZXJVcFRvRGF0ZSA9IGZhbHNlO1xuICAgIH0sXG59O1xuIiwiaW1wb3J0IHsgVXRpbCB9IGZyb20gJy4vVXRpbC5qcyc7XG5pbXBvcnQgeyBMYXllciB9IGZyb20gJy4vTGF5ZXIuanMnO1xuaW1wb3J0IHsgX3JlZ2lzdGVyTm9kZSB9IGZyb20gJy4vR2xvYmFsLmpzJztcbmV4cG9ydCBjbGFzcyBGYXN0TGF5ZXIgZXh0ZW5kcyBMYXllciB7XG4gICAgY29uc3RydWN0b3IoYXR0cnMpIHtcbiAgICAgICAgc3VwZXIoYXR0cnMpO1xuICAgICAgICB0aGlzLmxpc3RlbmluZyhmYWxzZSk7XG4gICAgICAgIFV0aWwud2FybignS29udmEuRmFzdCBsYXllciBpcyBkZXByZWNhdGVkLiBQbGVhc2UgdXNlIFwibmV3IEtvbnZhLkxheWVyKHsgbGlzdGVuaW5nOiBmYWxzZSB9KVwiIGluc3RlYWQuJyk7XG4gICAgfVxufVxuRmFzdExheWVyLnByb3RvdHlwZS5ub2RlVHlwZSA9ICdGYXN0TGF5ZXInO1xuX3JlZ2lzdGVyTm9kZShGYXN0TGF5ZXIpO1xuIiwidmFyIFBJX09WRVJfMTgwID0gTWF0aC5QSSAvIDE4MDtcbmZ1bmN0aW9uIGRldGVjdEJyb3dzZXIoKSB7XG4gICAgcmV0dXJuICh0eXBlb2Ygd2luZG93ICE9PSAndW5kZWZpbmVkJyAmJlxuICAgICAgICAoe30udG9TdHJpbmcuY2FsbCh3aW5kb3cpID09PSAnW29iamVjdCBXaW5kb3ddJyB8fFxuICAgICAgICAgICAge30udG9TdHJpbmcuY2FsbCh3aW5kb3cpID09PSAnW29iamVjdCBnbG9iYWxdJykpO1xufVxuZXhwb3J0IGNvbnN0IGdsb2IgPSB0eXBlb2YgZ2xvYmFsICE9PSAndW5kZWZpbmVkJ1xuICAgID8gZ2xvYmFsXG4gICAgOiB0eXBlb2Ygd2luZG93ICE9PSAndW5kZWZpbmVkJ1xuICAgICAgICA/IHdpbmRvd1xuICAgICAgICA6IHR5cGVvZiBXb3JrZXJHbG9iYWxTY29wZSAhPT0gJ3VuZGVmaW5lZCdcbiAgICAgICAgICAgID8gc2VsZlxuICAgICAgICAgICAgOiB7fTtcbmV4cG9ydCBjb25zdCBLb252YSA9IHtcbiAgICBfZ2xvYmFsOiBnbG9iLFxuICAgIHZlcnNpb246ICc4LjQuMCcsXG4gICAgaXNCcm93c2VyOiBkZXRlY3RCcm93c2VyKCksXG4gICAgaXNVbm1pbmlmaWVkOiAvcGFyYW0vLnRlc3QoZnVuY3Rpb24gKHBhcmFtKSB7IH0udG9TdHJpbmcoKSksXG4gICAgZGJsQ2xpY2tXaW5kb3c6IDQwMCxcbiAgICBnZXRBbmdsZShhbmdsZSkge1xuICAgICAgICByZXR1cm4gS29udmEuYW5nbGVEZWcgPyBhbmdsZSAqIFBJX09WRVJfMTgwIDogYW5nbGU7XG4gICAgfSxcbiAgICBlbmFibGVUcmFjZTogZmFsc2UsXG4gICAgcG9pbnRlckV2ZW50c0VuYWJsZWQ6IHRydWUsXG4gICAgYXV0b0RyYXdFbmFibGVkOiB0cnVlLFxuICAgIGhpdE9uRHJhZ0VuYWJsZWQ6IGZhbHNlLFxuICAgIGNhcHR1cmVQb2ludGVyRXZlbnRzRW5hYmxlZDogZmFsc2UsXG4gICAgX21vdXNlTGlzdGVuQ2xpY2s6IGZhbHNlLFxuICAgIF90b3VjaExpc3RlbkNsaWNrOiBmYWxzZSxcbiAgICBfcG9pbnRlckxpc3RlbkNsaWNrOiBmYWxzZSxcbiAgICBfbW91c2VJbkRibENsaWNrV2luZG93OiBmYWxzZSxcbiAgICBfdG91Y2hJbkRibENsaWNrV2luZG93OiBmYWxzZSxcbiAgICBfcG9pbnRlckluRGJsQ2xpY2tXaW5kb3c6IGZhbHNlLFxuICAgIF9tb3VzZURibENsaWNrUG9pbnRlcklkOiBudWxsLFxuICAgIF90b3VjaERibENsaWNrUG9pbnRlcklkOiBudWxsLFxuICAgIF9wb2ludGVyRGJsQ2xpY2tQb2ludGVySWQ6IG51bGwsXG4gICAgcGl4ZWxSYXRpbzogKHR5cGVvZiB3aW5kb3cgIT09ICd1bmRlZmluZWQnICYmIHdpbmRvdy5kZXZpY2VQaXhlbFJhdGlvKSB8fCAxLFxuICAgIGRyYWdEaXN0YW5jZTogMyxcbiAgICBhbmdsZURlZzogdHJ1ZSxcbiAgICBzaG93V2FybmluZ3M6IHRydWUsXG4gICAgZHJhZ0J1dHRvbnM6IFswLCAxXSxcbiAgICBpc0RyYWdnaW5nKCkge1xuICAgICAgICByZXR1cm4gS29udmFbJ0REJ10uaXNEcmFnZ2luZztcbiAgICB9LFxuICAgIGlzRHJhZ1JlYWR5KCkge1xuICAgICAgICByZXR1cm4gISFLb252YVsnREQnXS5ub2RlO1xuICAgIH0sXG4gICAgcmVsZWFzZUNhbnZhc09uRGVzdHJveTogdHJ1ZSxcbiAgICBkb2N1bWVudDogZ2xvYi5kb2N1bWVudCxcbiAgICBfaW5qZWN0R2xvYmFsKEtvbnZhKSB7XG4gICAgICAgIGdsb2IuS29udmEgPSBLb252YTtcbiAgICB9LFxufTtcbmV4cG9ydCBjb25zdCBfcmVnaXN0ZXJOb2RlID0gKE5vZGVDbGFzcykgPT4ge1xuICAgIEtvbnZhW05vZGVDbGFzcy5wcm90b3R5cGUuZ2V0Q2xhc3NOYW1lKCldID0gTm9kZUNsYXNzO1xufTtcbktvbnZhLl9pbmplY3RHbG9iYWwoS29udmEpO1xuIiwiaW1wb3J0IHsgVXRpbCB9IGZyb20gJy4vVXRpbC5qcyc7XG5pbXBvcnQgeyBDb250YWluZXIgfSBmcm9tICcuL0NvbnRhaW5lci5qcyc7XG5pbXBvcnQgeyBfcmVnaXN0ZXJOb2RlIH0gZnJvbSAnLi9HbG9iYWwuanMnO1xuZXhwb3J0IGNsYXNzIEdyb3VwIGV4dGVuZHMgQ29udGFpbmVyIHtcbiAgICBfdmFsaWRhdGVBZGQoY2hpbGQpIHtcbiAgICAgICAgdmFyIHR5cGUgPSBjaGlsZC5nZXRUeXBlKCk7XG4gICAgICAgIGlmICh0eXBlICE9PSAnR3JvdXAnICYmIHR5cGUgIT09ICdTaGFwZScpIHtcbiAgICAgICAgICAgIFV0aWwudGhyb3coJ1lvdSBtYXkgb25seSBhZGQgZ3JvdXBzIGFuZCBzaGFwZXMgdG8gZ3JvdXBzLicpO1xuICAgICAgICB9XG4gICAgfVxufVxuR3JvdXAucHJvdG90eXBlLm5vZGVUeXBlID0gJ0dyb3VwJztcbl9yZWdpc3Rlck5vZGUoR3JvdXApO1xuIiwiaW1wb3J0IHsgVXRpbCB9IGZyb20gJy4vVXRpbC5qcyc7XG5pbXBvcnQgeyBDb250YWluZXIgfSBmcm9tICcuL0NvbnRhaW5lci5qcyc7XG5pbXBvcnQgeyBOb2RlIH0gZnJvbSAnLi9Ob2RlLmpzJztcbmltcG9ydCB7IEZhY3RvcnkgfSBmcm9tICcuL0ZhY3RvcnkuanMnO1xuaW1wb3J0IHsgU2NlbmVDYW52YXMsIEhpdENhbnZhcyB9IGZyb20gJy4vQ2FudmFzLmpzJztcbmltcG9ydCB7IGdldEJvb2xlYW5WYWxpZGF0b3IgfSBmcm9tICcuL1ZhbGlkYXRvcnMuanMnO1xuaW1wb3J0IHsgc2hhcGVzIH0gZnJvbSAnLi9TaGFwZS5qcyc7XG5pbXBvcnQgeyBfcmVnaXN0ZXJOb2RlIH0gZnJvbSAnLi9HbG9iYWwuanMnO1xudmFyIEhBU0ggPSAnIycsIEJFRk9SRV9EUkFXID0gJ2JlZm9yZURyYXcnLCBEUkFXID0gJ2RyYXcnLCBJTlRFUlNFQ1RJT05fT0ZGU0VUUyA9IFtcbiAgICB7IHg6IDAsIHk6IDAgfSxcbiAgICB7IHg6IC0xLCB5OiAtMSB9LFxuICAgIHsgeDogMSwgeTogLTEgfSxcbiAgICB7IHg6IDEsIHk6IDEgfSxcbiAgICB7IHg6IC0xLCB5OiAxIH0sXG5dLCBJTlRFUlNFQ1RJT05fT0ZGU0VUU19MRU4gPSBJTlRFUlNFQ1RJT05fT0ZGU0VUUy5sZW5ndGg7XG5leHBvcnQgY2xhc3MgTGF5ZXIgZXh0ZW5kcyBDb250YWluZXIge1xuICAgIGNvbnN0cnVjdG9yKGNvbmZpZykge1xuICAgICAgICBzdXBlcihjb25maWcpO1xuICAgICAgICB0aGlzLmNhbnZhcyA9IG5ldyBTY2VuZUNhbnZhcygpO1xuICAgICAgICB0aGlzLmhpdENhbnZhcyA9IG5ldyBIaXRDYW52YXMoe1xuICAgICAgICAgICAgcGl4ZWxSYXRpbzogMSxcbiAgICAgICAgfSk7XG4gICAgICAgIHRoaXMuX3dhaXRpbmdGb3JEcmF3ID0gZmFsc2U7XG4gICAgICAgIHRoaXMub24oJ3Zpc2libGVDaGFuZ2Uua29udmEnLCB0aGlzLl9jaGVja1Zpc2liaWxpdHkpO1xuICAgICAgICB0aGlzLl9jaGVja1Zpc2liaWxpdHkoKTtcbiAgICAgICAgdGhpcy5vbignaW1hZ2VTbW9vdGhpbmdFbmFibGVkQ2hhbmdlLmtvbnZhJywgdGhpcy5fc2V0U21vb3RoRW5hYmxlZCk7XG4gICAgICAgIHRoaXMuX3NldFNtb290aEVuYWJsZWQoKTtcbiAgICB9XG4gICAgY3JlYXRlUE5HU3RyZWFtKCkge1xuICAgICAgICBjb25zdCBjID0gdGhpcy5jYW52YXMuX2NhbnZhcztcbiAgICAgICAgcmV0dXJuIGMuY3JlYXRlUE5HU3RyZWFtKCk7XG4gICAgfVxuICAgIGdldENhbnZhcygpIHtcbiAgICAgICAgcmV0dXJuIHRoaXMuY2FudmFzO1xuICAgIH1cbiAgICBnZXROYXRpdmVDYW52YXNFbGVtZW50KCkge1xuICAgICAgICByZXR1cm4gdGhpcy5jYW52YXMuX2NhbnZhcztcbiAgICB9XG4gICAgZ2V0SGl0Q2FudmFzKCkge1xuICAgICAgICByZXR1cm4gdGhpcy5oaXRDYW52YXM7XG4gICAgfVxuICAgIGdldENvbnRleHQoKSB7XG4gICAgICAgIHJldHVybiB0aGlzLmdldENhbnZhcygpLmdldENvbnRleHQoKTtcbiAgICB9XG4gICAgY2xlYXIoYm91bmRzKSB7XG4gICAgICAgIHRoaXMuZ2V0Q29udGV4dCgpLmNsZWFyKGJvdW5kcyk7XG4gICAgICAgIHRoaXMuZ2V0SGl0Q2FudmFzKCkuZ2V0Q29udGV4dCgpLmNsZWFyKGJvdW5kcyk7XG4gICAgICAgIHJldHVybiB0aGlzO1xuICAgIH1cbiAgICBzZXRaSW5kZXgoaW5kZXgpIHtcbiAgICAgICAgc3VwZXIuc2V0WkluZGV4KGluZGV4KTtcbiAgICAgICAgdmFyIHN0YWdlID0gdGhpcy5nZXRTdGFnZSgpO1xuICAgICAgICBpZiAoc3RhZ2UgJiYgc3RhZ2UuY29udGVudCkge1xuICAgICAgICAgICAgc3RhZ2UuY29udGVudC5yZW1vdmVDaGlsZCh0aGlzLmdldE5hdGl2ZUNhbnZhc0VsZW1lbnQoKSk7XG4gICAgICAgICAgICBpZiAoaW5kZXggPCBzdGFnZS5jaGlsZHJlbi5sZW5ndGggLSAxKSB7XG4gICAgICAgICAgICAgICAgc3RhZ2UuY29udGVudC5pbnNlcnRCZWZvcmUodGhpcy5nZXROYXRpdmVDYW52YXNFbGVtZW50KCksIHN0YWdlLmNoaWxkcmVuW2luZGV4ICsgMV0uZ2V0Q2FudmFzKCkuX2NhbnZhcyk7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBlbHNlIHtcbiAgICAgICAgICAgICAgICBzdGFnZS5jb250ZW50LmFwcGVuZENoaWxkKHRoaXMuZ2V0TmF0aXZlQ2FudmFzRWxlbWVudCgpKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgICByZXR1cm4gdGhpcztcbiAgICB9XG4gICAgbW92ZVRvVG9wKCkge1xuICAgICAgICBOb2RlLnByb3RvdHlwZS5tb3ZlVG9Ub3AuY2FsbCh0aGlzKTtcbiAgICAgICAgdmFyIHN0YWdlID0gdGhpcy5nZXRTdGFnZSgpO1xuICAgICAgICBpZiAoc3RhZ2UgJiYgc3RhZ2UuY29udGVudCkge1xuICAgICAgICAgICAgc3RhZ2UuY29udGVudC5yZW1vdmVDaGlsZCh0aGlzLmdldE5hdGl2ZUNhbnZhc0VsZW1lbnQoKSk7XG4gICAgICAgICAgICBzdGFnZS5jb250ZW50LmFwcGVuZENoaWxkKHRoaXMuZ2V0TmF0aXZlQ2FudmFzRWxlbWVudCgpKTtcbiAgICAgICAgfVxuICAgICAgICByZXR1cm4gdHJ1ZTtcbiAgICB9XG4gICAgbW92ZVVwKCkge1xuICAgICAgICB2YXIgbW92ZWQgPSBOb2RlLnByb3RvdHlwZS5tb3ZlVXAuY2FsbCh0aGlzKTtcbiAgICAgICAgaWYgKCFtb3ZlZCkge1xuICAgICAgICAgICAgcmV0dXJuIGZhbHNlO1xuICAgICAgICB9XG4gICAgICAgIHZhciBzdGFnZSA9IHRoaXMuZ2V0U3RhZ2UoKTtcbiAgICAgICAgaWYgKCFzdGFnZSB8fCAhc3RhZ2UuY29udGVudCkge1xuICAgICAgICAgICAgcmV0dXJuIGZhbHNlO1xuICAgICAgICB9XG4gICAgICAgIHN0YWdlLmNvbnRlbnQucmVtb3ZlQ2hpbGQodGhpcy5nZXROYXRpdmVDYW52YXNFbGVtZW50KCkpO1xuICAgICAgICBpZiAodGhpcy5pbmRleCA8IHN0YWdlLmNoaWxkcmVuLmxlbmd0aCAtIDEpIHtcbiAgICAgICAgICAgIHN0YWdlLmNvbnRlbnQuaW5zZXJ0QmVmb3JlKHRoaXMuZ2V0TmF0aXZlQ2FudmFzRWxlbWVudCgpLCBzdGFnZS5jaGlsZHJlblt0aGlzLmluZGV4ICsgMV0uZ2V0Q2FudmFzKCkuX2NhbnZhcyk7XG4gICAgICAgIH1cbiAgICAgICAgZWxzZSB7XG4gICAgICAgICAgICBzdGFnZS5jb250ZW50LmFwcGVuZENoaWxkKHRoaXMuZ2V0TmF0aXZlQ2FudmFzRWxlbWVudCgpKTtcbiAgICAgICAgfVxuICAgICAgICByZXR1cm4gdHJ1ZTtcbiAgICB9XG4gICAgbW92ZURvd24oKSB7XG4gICAgICAgIGlmIChOb2RlLnByb3RvdHlwZS5tb3ZlRG93bi5jYWxsKHRoaXMpKSB7XG4gICAgICAgICAgICB2YXIgc3RhZ2UgPSB0aGlzLmdldFN0YWdlKCk7XG4gICAgICAgICAgICBpZiAoc3RhZ2UpIHtcbiAgICAgICAgICAgICAgICB2YXIgY2hpbGRyZW4gPSBzdGFnZS5jaGlsZHJlbjtcbiAgICAgICAgICAgICAgICBpZiAoc3RhZ2UuY29udGVudCkge1xuICAgICAgICAgICAgICAgICAgICBzdGFnZS5jb250ZW50LnJlbW92ZUNoaWxkKHRoaXMuZ2V0TmF0aXZlQ2FudmFzRWxlbWVudCgpKTtcbiAgICAgICAgICAgICAgICAgICAgc3RhZ2UuY29udGVudC5pbnNlcnRCZWZvcmUodGhpcy5nZXROYXRpdmVDYW52YXNFbGVtZW50KCksIGNoaWxkcmVuW3RoaXMuaW5kZXggKyAxXS5nZXRDYW52YXMoKS5fY2FudmFzKTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICByZXR1cm4gdHJ1ZTtcbiAgICAgICAgfVxuICAgICAgICByZXR1cm4gZmFsc2U7XG4gICAgfVxuICAgIG1vdmVUb0JvdHRvbSgpIHtcbiAgICAgICAgaWYgKE5vZGUucHJvdG90eXBlLm1vdmVUb0JvdHRvbS5jYWxsKHRoaXMpKSB7XG4gICAgICAgICAgICB2YXIgc3RhZ2UgPSB0aGlzLmdldFN0YWdlKCk7XG4gICAgICAgICAgICBpZiAoc3RhZ2UpIHtcbiAgICAgICAgICAgICAgICB2YXIgY2hpbGRyZW4gPSBzdGFnZS5jaGlsZHJlbjtcbiAgICAgICAgICAgICAgICBpZiAoc3RhZ2UuY29udGVudCkge1xuICAgICAgICAgICAgICAgICAgICBzdGFnZS5jb250ZW50LnJlbW92ZUNoaWxkKHRoaXMuZ2V0TmF0aXZlQ2FudmFzRWxlbWVudCgpKTtcbiAgICAgICAgICAgICAgICAgICAgc3RhZ2UuY29udGVudC5pbnNlcnRCZWZvcmUodGhpcy5nZXROYXRpdmVDYW52YXNFbGVtZW50KCksIGNoaWxkcmVuWzFdLmdldENhbnZhcygpLl9jYW52YXMpO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIHJldHVybiB0cnVlO1xuICAgICAgICB9XG4gICAgICAgIHJldHVybiBmYWxzZTtcbiAgICB9XG4gICAgZ2V0TGF5ZXIoKSB7XG4gICAgICAgIHJldHVybiB0aGlzO1xuICAgIH1cbiAgICByZW1vdmUoKSB7XG4gICAgICAgIHZhciBfY2FudmFzID0gdGhpcy5nZXROYXRpdmVDYW52YXNFbGVtZW50KCk7XG4gICAgICAgIE5vZGUucHJvdG90eXBlLnJlbW92ZS5jYWxsKHRoaXMpO1xuICAgICAgICBpZiAoX2NhbnZhcyAmJiBfY2FudmFzLnBhcmVudE5vZGUgJiYgVXRpbC5faXNJbkRvY3VtZW50KF9jYW52YXMpKSB7XG4gICAgICAgICAgICBfY2FudmFzLnBhcmVudE5vZGUucmVtb3ZlQ2hpbGQoX2NhbnZhcyk7XG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuIHRoaXM7XG4gICAgfVxuICAgIGdldFN0YWdlKCkge1xuICAgICAgICByZXR1cm4gdGhpcy5wYXJlbnQ7XG4gICAgfVxuICAgIHNldFNpemUoeyB3aWR0aCwgaGVpZ2h0IH0pIHtcbiAgICAgICAgdGhpcy5jYW52YXMuc2V0U2l6ZSh3aWR0aCwgaGVpZ2h0KTtcbiAgICAgICAgdGhpcy5oaXRDYW52YXMuc2V0U2l6ZSh3aWR0aCwgaGVpZ2h0KTtcbiAgICAgICAgdGhpcy5fc2V0U21vb3RoRW5hYmxlZCgpO1xuICAgICAgICByZXR1cm4gdGhpcztcbiAgICB9XG4gICAgX3ZhbGlkYXRlQWRkKGNoaWxkKSB7XG4gICAgICAgIHZhciB0eXBlID0gY2hpbGQuZ2V0VHlwZSgpO1xuICAgICAgICBpZiAodHlwZSAhPT0gJ0dyb3VwJyAmJiB0eXBlICE9PSAnU2hhcGUnKSB7XG4gICAgICAgICAgICBVdGlsLnRocm93KCdZb3UgbWF5IG9ubHkgYWRkIGdyb3VwcyBhbmQgc2hhcGVzIHRvIGEgbGF5ZXIuJyk7XG4gICAgICAgIH1cbiAgICB9XG4gICAgX3RvS29udmFDYW52YXMoY29uZmlnKSB7XG4gICAgICAgIGNvbmZpZyA9IGNvbmZpZyB8fCB7fTtcbiAgICAgICAgY29uZmlnLndpZHRoID0gY29uZmlnLndpZHRoIHx8IHRoaXMuZ2V0V2lkdGgoKTtcbiAgICAgICAgY29uZmlnLmhlaWdodCA9IGNvbmZpZy5oZWlnaHQgfHwgdGhpcy5nZXRIZWlnaHQoKTtcbiAgICAgICAgY29uZmlnLnggPSBjb25maWcueCAhPT0gdW5kZWZpbmVkID8gY29uZmlnLnggOiB0aGlzLngoKTtcbiAgICAgICAgY29uZmlnLnkgPSBjb25maWcueSAhPT0gdW5kZWZpbmVkID8gY29uZmlnLnkgOiB0aGlzLnkoKTtcbiAgICAgICAgcmV0dXJuIE5vZGUucHJvdG90eXBlLl90b0tvbnZhQ2FudmFzLmNhbGwodGhpcywgY29uZmlnKTtcbiAgICB9XG4gICAgX2NoZWNrVmlzaWJpbGl0eSgpIHtcbiAgICAgICAgY29uc3QgdmlzaWJsZSA9IHRoaXMudmlzaWJsZSgpO1xuICAgICAgICBpZiAodmlzaWJsZSkge1xuICAgICAgICAgICAgdGhpcy5jYW52YXMuX2NhbnZhcy5zdHlsZS5kaXNwbGF5ID0gJ2Jsb2NrJztcbiAgICAgICAgfVxuICAgICAgICBlbHNlIHtcbiAgICAgICAgICAgIHRoaXMuY2FudmFzLl9jYW52YXMuc3R5bGUuZGlzcGxheSA9ICdub25lJztcbiAgICAgICAgfVxuICAgIH1cbiAgICBfc2V0U21vb3RoRW5hYmxlZCgpIHtcbiAgICAgICAgdGhpcy5nZXRDb250ZXh0KCkuX2NvbnRleHQuaW1hZ2VTbW9vdGhpbmdFbmFibGVkID1cbiAgICAgICAgICAgIHRoaXMuaW1hZ2VTbW9vdGhpbmdFbmFibGVkKCk7XG4gICAgfVxuICAgIGdldFdpZHRoKCkge1xuICAgICAgICBpZiAodGhpcy5wYXJlbnQpIHtcbiAgICAgICAgICAgIHJldHVybiB0aGlzLnBhcmVudC53aWR0aCgpO1xuICAgICAgICB9XG4gICAgfVxuICAgIHNldFdpZHRoKCkge1xuICAgICAgICBVdGlsLndhcm4oJ0NhbiBub3QgY2hhbmdlIHdpZHRoIG9mIGxheWVyLiBVc2UgXCJzdGFnZS53aWR0aCh2YWx1ZSlcIiBmdW5jdGlvbiBpbnN0ZWFkLicpO1xuICAgIH1cbiAgICBnZXRIZWlnaHQoKSB7XG4gICAgICAgIGlmICh0aGlzLnBhcmVudCkge1xuICAgICAgICAgICAgcmV0dXJuIHRoaXMucGFyZW50LmhlaWdodCgpO1xuICAgICAgICB9XG4gICAgfVxuICAgIHNldEhlaWdodCgpIHtcbiAgICAgICAgVXRpbC53YXJuKCdDYW4gbm90IGNoYW5nZSBoZWlnaHQgb2YgbGF5ZXIuIFVzZSBcInN0YWdlLmhlaWdodCh2YWx1ZSlcIiBmdW5jdGlvbiBpbnN0ZWFkLicpO1xuICAgIH1cbiAgICBiYXRjaERyYXcoKSB7XG4gICAgICAgIGlmICghdGhpcy5fd2FpdGluZ0ZvckRyYXcpIHtcbiAgICAgICAgICAgIHRoaXMuX3dhaXRpbmdGb3JEcmF3ID0gdHJ1ZTtcbiAgICAgICAgICAgIFV0aWwucmVxdWVzdEFuaW1GcmFtZSgoKSA9PiB7XG4gICAgICAgICAgICAgICAgdGhpcy5kcmF3KCk7XG4gICAgICAgICAgICAgICAgdGhpcy5fd2FpdGluZ0ZvckRyYXcgPSBmYWxzZTtcbiAgICAgICAgICAgIH0pO1xuICAgICAgICB9XG4gICAgICAgIHJldHVybiB0aGlzO1xuICAgIH1cbiAgICBnZXRJbnRlcnNlY3Rpb24ocG9zKSB7XG4gICAgICAgIGlmICghdGhpcy5pc0xpc3RlbmluZygpIHx8ICF0aGlzLmlzVmlzaWJsZSgpKSB7XG4gICAgICAgICAgICByZXR1cm4gbnVsbDtcbiAgICAgICAgfVxuICAgICAgICB2YXIgc3BpcmFsU2VhcmNoRGlzdGFuY2UgPSAxO1xuICAgICAgICB2YXIgY29udGludWVTZWFyY2ggPSBmYWxzZTtcbiAgICAgICAgd2hpbGUgKHRydWUpIHtcbiAgICAgICAgICAgIGZvciAobGV0IGkgPSAwOyBpIDwgSU5URVJTRUNUSU9OX09GRlNFVFNfTEVOOyBpKyspIHtcbiAgICAgICAgICAgICAgICBjb25zdCBpbnRlcnNlY3Rpb25PZmZzZXQgPSBJTlRFUlNFQ1RJT05fT0ZGU0VUU1tpXTtcbiAgICAgICAgICAgICAgICBjb25zdCBvYmogPSB0aGlzLl9nZXRJbnRlcnNlY3Rpb24oe1xuICAgICAgICAgICAgICAgICAgICB4OiBwb3MueCArIGludGVyc2VjdGlvbk9mZnNldC54ICogc3BpcmFsU2VhcmNoRGlzdGFuY2UsXG4gICAgICAgICAgICAgICAgICAgIHk6IHBvcy55ICsgaW50ZXJzZWN0aW9uT2Zmc2V0LnkgKiBzcGlyYWxTZWFyY2hEaXN0YW5jZSxcbiAgICAgICAgICAgICAgICB9KTtcbiAgICAgICAgICAgICAgICBjb25zdCBzaGFwZSA9IG9iai5zaGFwZTtcbiAgICAgICAgICAgICAgICBpZiAoc2hhcGUpIHtcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuIHNoYXBlO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICBjb250aW51ZVNlYXJjaCA9ICEhb2JqLmFudGlhbGlhc2VkO1xuICAgICAgICAgICAgICAgIGlmICghb2JqLmFudGlhbGlhc2VkKSB7XG4gICAgICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGlmIChjb250aW51ZVNlYXJjaCkge1xuICAgICAgICAgICAgICAgIHNwaXJhbFNlYXJjaERpc3RhbmNlICs9IDE7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBlbHNlIHtcbiAgICAgICAgICAgICAgICByZXR1cm4gbnVsbDtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgIH1cbiAgICBfZ2V0SW50ZXJzZWN0aW9uKHBvcykge1xuICAgICAgICBjb25zdCByYXRpbyA9IHRoaXMuaGl0Q2FudmFzLnBpeGVsUmF0aW87XG4gICAgICAgIGNvbnN0IHAgPSB0aGlzLmhpdENhbnZhcy5jb250ZXh0LmdldEltYWdlRGF0YShNYXRoLnJvdW5kKHBvcy54ICogcmF0aW8pLCBNYXRoLnJvdW5kKHBvcy55ICogcmF0aW8pLCAxLCAxKS5kYXRhO1xuICAgICAgICBjb25zdCBwMyA9IHBbM107XG4gICAgICAgIGlmIChwMyA9PT0gMjU1KSB7XG4gICAgICAgICAgICBjb25zdCBjb2xvcktleSA9IFV0aWwuX3JnYlRvSGV4KHBbMF0sIHBbMV0sIHBbMl0pO1xuICAgICAgICAgICAgY29uc3Qgc2hhcGUgPSBzaGFwZXNbSEFTSCArIGNvbG9yS2V5XTtcbiAgICAgICAgICAgIGlmIChzaGFwZSkge1xuICAgICAgICAgICAgICAgIHJldHVybiB7XG4gICAgICAgICAgICAgICAgICAgIHNoYXBlOiBzaGFwZSxcbiAgICAgICAgICAgICAgICB9O1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgcmV0dXJuIHtcbiAgICAgICAgICAgICAgICBhbnRpYWxpYXNlZDogdHJ1ZSxcbiAgICAgICAgICAgIH07XG4gICAgICAgIH1cbiAgICAgICAgZWxzZSBpZiAocDMgPiAwKSB7XG4gICAgICAgICAgICByZXR1cm4ge1xuICAgICAgICAgICAgICAgIGFudGlhbGlhc2VkOiB0cnVlLFxuICAgICAgICAgICAgfTtcbiAgICAgICAgfVxuICAgICAgICByZXR1cm4ge307XG4gICAgfVxuICAgIGRyYXdTY2VuZShjYW4sIHRvcCkge1xuICAgICAgICB2YXIgbGF5ZXIgPSB0aGlzLmdldExheWVyKCksIGNhbnZhcyA9IGNhbiB8fCAobGF5ZXIgJiYgbGF5ZXIuZ2V0Q2FudmFzKCkpO1xuICAgICAgICB0aGlzLl9maXJlKEJFRk9SRV9EUkFXLCB7XG4gICAgICAgICAgICBub2RlOiB0aGlzLFxuICAgICAgICB9KTtcbiAgICAgICAgaWYgKHRoaXMuY2xlYXJCZWZvcmVEcmF3KCkpIHtcbiAgICAgICAgICAgIGNhbnZhcy5nZXRDb250ZXh0KCkuY2xlYXIoKTtcbiAgICAgICAgfVxuICAgICAgICBDb250YWluZXIucHJvdG90eXBlLmRyYXdTY2VuZS5jYWxsKHRoaXMsIGNhbnZhcywgdG9wKTtcbiAgICAgICAgdGhpcy5fZmlyZShEUkFXLCB7XG4gICAgICAgICAgICBub2RlOiB0aGlzLFxuICAgICAgICB9KTtcbiAgICAgICAgcmV0dXJuIHRoaXM7XG4gICAgfVxuICAgIGRyYXdIaXQoY2FuLCB0b3ApIHtcbiAgICAgICAgdmFyIGxheWVyID0gdGhpcy5nZXRMYXllcigpLCBjYW52YXMgPSBjYW4gfHwgKGxheWVyICYmIGxheWVyLmhpdENhbnZhcyk7XG4gICAgICAgIGlmIChsYXllciAmJiBsYXllci5jbGVhckJlZm9yZURyYXcoKSkge1xuICAgICAgICAgICAgbGF5ZXIuZ2V0SGl0Q2FudmFzKCkuZ2V0Q29udGV4dCgpLmNsZWFyKCk7XG4gICAgICAgIH1cbiAgICAgICAgQ29udGFpbmVyLnByb3RvdHlwZS5kcmF3SGl0LmNhbGwodGhpcywgY2FudmFzLCB0b3ApO1xuICAgICAgICByZXR1cm4gdGhpcztcbiAgICB9XG4gICAgZW5hYmxlSGl0R3JhcGgoKSB7XG4gICAgICAgIHRoaXMuaGl0R3JhcGhFbmFibGVkKHRydWUpO1xuICAgICAgICByZXR1cm4gdGhpcztcbiAgICB9XG4gICAgZGlzYWJsZUhpdEdyYXBoKCkge1xuICAgICAgICB0aGlzLmhpdEdyYXBoRW5hYmxlZChmYWxzZSk7XG4gICAgICAgIHJldHVybiB0aGlzO1xuICAgIH1cbiAgICBzZXRIaXRHcmFwaEVuYWJsZWQodmFsKSB7XG4gICAgICAgIFV0aWwud2FybignaGl0R3JhcGhFbmFibGVkIG1ldGhvZCBpcyBkZXByZWNhdGVkLiBQbGVhc2UgdXNlIGxheWVyLmxpc3RlbmluZygpIGluc3RlYWQuJyk7XG4gICAgICAgIHRoaXMubGlzdGVuaW5nKHZhbCk7XG4gICAgfVxuICAgIGdldEhpdEdyYXBoRW5hYmxlZCh2YWwpIHtcbiAgICAgICAgVXRpbC53YXJuKCdoaXRHcmFwaEVuYWJsZWQgbWV0aG9kIGlzIGRlcHJlY2F0ZWQuIFBsZWFzZSB1c2UgbGF5ZXIubGlzdGVuaW5nKCkgaW5zdGVhZC4nKTtcbiAgICAgICAgcmV0dXJuIHRoaXMubGlzdGVuaW5nKCk7XG4gICAgfVxuICAgIHRvZ2dsZUhpdENhbnZhcygpIHtcbiAgICAgICAgaWYgKCF0aGlzLnBhcmVudCB8fCAhdGhpcy5wYXJlbnRbJ2NvbnRlbnQnXSkge1xuICAgICAgICAgICAgcmV0dXJuO1xuICAgICAgICB9XG4gICAgICAgIHZhciBwYXJlbnQgPSB0aGlzLnBhcmVudDtcbiAgICAgICAgdmFyIGFkZGVkID0gISF0aGlzLmhpdENhbnZhcy5fY2FudmFzLnBhcmVudE5vZGU7XG4gICAgICAgIGlmIChhZGRlZCkge1xuICAgICAgICAgICAgcGFyZW50LmNvbnRlbnQucmVtb3ZlQ2hpbGQodGhpcy5oaXRDYW52YXMuX2NhbnZhcyk7XG4gICAgICAgIH1cbiAgICAgICAgZWxzZSB7XG4gICAgICAgICAgICBwYXJlbnQuY29udGVudC5hcHBlbmRDaGlsZCh0aGlzLmhpdENhbnZhcy5fY2FudmFzKTtcbiAgICAgICAgfVxuICAgIH1cbiAgICBkZXN0cm95KCkge1xuICAgICAgICBVdGlsLnJlbGVhc2VDYW52YXModGhpcy5nZXROYXRpdmVDYW52YXNFbGVtZW50KCksIHRoaXMuZ2V0SGl0Q2FudmFzKCkuX2NhbnZhcyk7XG4gICAgICAgIHJldHVybiBzdXBlci5kZXN0cm95KCk7XG4gICAgfVxufVxuTGF5ZXIucHJvdG90eXBlLm5vZGVUeXBlID0gJ0xheWVyJztcbl9yZWdpc3Rlck5vZGUoTGF5ZXIpO1xuRmFjdG9yeS5hZGRHZXR0ZXJTZXR0ZXIoTGF5ZXIsICdpbWFnZVNtb290aGluZ0VuYWJsZWQnLCB0cnVlKTtcbkZhY3RvcnkuYWRkR2V0dGVyU2V0dGVyKExheWVyLCAnY2xlYXJCZWZvcmVEcmF3JywgdHJ1ZSk7XG5GYWN0b3J5LmFkZEdldHRlclNldHRlcihMYXllciwgJ2hpdEdyYXBoRW5hYmxlZCcsIHRydWUsIGdldEJvb2xlYW5WYWxpZGF0b3IoKSk7XG4iLCJpbXBvcnQgeyBVdGlsLCBUcmFuc2Zvcm0gfSBmcm9tICcuL1V0aWwuanMnO1xuaW1wb3J0IHsgRmFjdG9yeSB9IGZyb20gJy4vRmFjdG9yeS5qcyc7XG5pbXBvcnQgeyBTY2VuZUNhbnZhcywgSGl0Q2FudmFzIH0gZnJvbSAnLi9DYW52YXMuanMnO1xuaW1wb3J0IHsgS29udmEgfSBmcm9tICcuL0dsb2JhbC5qcyc7XG5pbXBvcnQgeyBERCB9IGZyb20gJy4vRHJhZ0FuZERyb3AuanMnO1xuaW1wb3J0IHsgZ2V0TnVtYmVyVmFsaWRhdG9yLCBnZXRTdHJpbmdWYWxpZGF0b3IsIGdldEJvb2xlYW5WYWxpZGF0b3IsIH0gZnJvbSAnLi9WYWxpZGF0b3JzLmpzJztcbnZhciBBQlNPTFVURV9PUEFDSVRZID0gJ2Fic29sdXRlT3BhY2l0eScsIEFMTF9MSVNURU5FUlMgPSAnYWxsRXZlbnRMaXN0ZW5lcnMnLCBBQlNPTFVURV9UUkFOU0ZPUk0gPSAnYWJzb2x1dGVUcmFuc2Zvcm0nLCBBQlNPTFVURV9TQ0FMRSA9ICdhYnNvbHV0ZVNjYWxlJywgQ0FOVkFTID0gJ2NhbnZhcycsIENIQU5HRSA9ICdDaGFuZ2UnLCBDSElMRFJFTiA9ICdjaGlsZHJlbicsIEtPTlZBID0gJ2tvbnZhJywgTElTVEVOSU5HID0gJ2xpc3RlbmluZycsIE1PVVNFRU5URVIgPSAnbW91c2VlbnRlcicsIE1PVVNFTEVBVkUgPSAnbW91c2VsZWF2ZScsIE5BTUUgPSAnbmFtZScsIFNFVCA9ICdzZXQnLCBTSEFQRSA9ICdTaGFwZScsIFNQQUNFID0gJyAnLCBTVEFHRSA9ICdzdGFnZScsIFRSQU5TRk9STSA9ICd0cmFuc2Zvcm0nLCBVUFBFUl9TVEFHRSA9ICdTdGFnZScsIFZJU0lCTEUgPSAndmlzaWJsZScsIFRSQU5TRk9STV9DSEFOR0VfU1RSID0gW1xuICAgICd4Q2hhbmdlLmtvbnZhJyxcbiAgICAneUNoYW5nZS5rb252YScsXG4gICAgJ3NjYWxlWENoYW5nZS5rb252YScsXG4gICAgJ3NjYWxlWUNoYW5nZS5rb252YScsXG4gICAgJ3NrZXdYQ2hhbmdlLmtvbnZhJyxcbiAgICAnc2tld1lDaGFuZ2Uua29udmEnLFxuICAgICdyb3RhdGlvbkNoYW5nZS5rb252YScsXG4gICAgJ29mZnNldFhDaGFuZ2Uua29udmEnLFxuICAgICdvZmZzZXRZQ2hhbmdlLmtvbnZhJyxcbiAgICAndHJhbnNmb3Jtc0VuYWJsZWRDaGFuZ2Uua29udmEnLFxuXS5qb2luKFNQQUNFKTtcbmxldCBpZENvdW50ZXIgPSAxO1xuZXhwb3J0IGNsYXNzIE5vZGUge1xuICAgIGNvbnN0cnVjdG9yKGNvbmZpZykge1xuICAgICAgICB0aGlzLl9pZCA9IGlkQ291bnRlcisrO1xuICAgICAgICB0aGlzLmV2ZW50TGlzdGVuZXJzID0ge307XG4gICAgICAgIHRoaXMuYXR0cnMgPSB7fTtcbiAgICAgICAgdGhpcy5pbmRleCA9IDA7XG4gICAgICAgIHRoaXMuX2FsbEV2ZW50TGlzdGVuZXJzID0gbnVsbDtcbiAgICAgICAgdGhpcy5wYXJlbnQgPSBudWxsO1xuICAgICAgICB0aGlzLl9jYWNoZSA9IG5ldyBNYXAoKTtcbiAgICAgICAgdGhpcy5fYXR0YWNoZWREZXBzTGlzdGVuZXJzID0gbmV3IE1hcCgpO1xuICAgICAgICB0aGlzLl9sYXN0UG9zID0gbnVsbDtcbiAgICAgICAgdGhpcy5fYmF0Y2hpbmdUcmFuc2Zvcm1DaGFuZ2UgPSBmYWxzZTtcbiAgICAgICAgdGhpcy5fbmVlZENsZWFyVHJhbnNmb3JtQ2FjaGUgPSBmYWxzZTtcbiAgICAgICAgdGhpcy5fZmlsdGVyVXBUb0RhdGUgPSBmYWxzZTtcbiAgICAgICAgdGhpcy5faXNVbmRlckNhY2hlID0gZmFsc2U7XG4gICAgICAgIHRoaXMuX2RyYWdFdmVudElkID0gbnVsbDtcbiAgICAgICAgdGhpcy5fc2hvdWxkRmlyZUNoYW5nZUV2ZW50cyA9IGZhbHNlO1xuICAgICAgICB0aGlzLnNldEF0dHJzKGNvbmZpZyk7XG4gICAgICAgIHRoaXMuX3Nob3VsZEZpcmVDaGFuZ2VFdmVudHMgPSB0cnVlO1xuICAgIH1cbiAgICBoYXNDaGlsZHJlbigpIHtcbiAgICAgICAgcmV0dXJuIGZhbHNlO1xuICAgIH1cbiAgICBfY2xlYXJDYWNoZShhdHRyKSB7XG4gICAgICAgIGlmICgoYXR0ciA9PT0gVFJBTlNGT1JNIHx8IGF0dHIgPT09IEFCU09MVVRFX1RSQU5TRk9STSkgJiZcbiAgICAgICAgICAgIHRoaXMuX2NhY2hlLmdldChhdHRyKSkge1xuICAgICAgICAgICAgdGhpcy5fY2FjaGUuZ2V0KGF0dHIpLmRpcnR5ID0gdHJ1ZTtcbiAgICAgICAgfVxuICAgICAgICBlbHNlIGlmIChhdHRyKSB7XG4gICAgICAgICAgICB0aGlzLl9jYWNoZS5kZWxldGUoYXR0cik7XG4gICAgICAgIH1cbiAgICAgICAgZWxzZSB7XG4gICAgICAgICAgICB0aGlzLl9jYWNoZS5jbGVhcigpO1xuICAgICAgICB9XG4gICAgfVxuICAgIF9nZXRDYWNoZShhdHRyLCBwcml2YXRlR2V0dGVyKSB7XG4gICAgICAgIHZhciBjYWNoZSA9IHRoaXMuX2NhY2hlLmdldChhdHRyKTtcbiAgICAgICAgdmFyIGlzVHJhbnNmb3JtID0gYXR0ciA9PT0gVFJBTlNGT1JNIHx8IGF0dHIgPT09IEFCU09MVVRFX1RSQU5TRk9STTtcbiAgICAgICAgdmFyIGludmFsaWQgPSBjYWNoZSA9PT0gdW5kZWZpbmVkIHx8IChpc1RyYW5zZm9ybSAmJiBjYWNoZS5kaXJ0eSA9PT0gdHJ1ZSk7XG4gICAgICAgIGlmIChpbnZhbGlkKSB7XG4gICAgICAgICAgICBjYWNoZSA9IHByaXZhdGVHZXR0ZXIuY2FsbCh0aGlzKTtcbiAgICAgICAgICAgIHRoaXMuX2NhY2hlLnNldChhdHRyLCBjYWNoZSk7XG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuIGNhY2hlO1xuICAgIH1cbiAgICBfY2FsY3VsYXRlKG5hbWUsIGRlcHMsIGdldHRlcikge1xuICAgICAgICBpZiAoIXRoaXMuX2F0dGFjaGVkRGVwc0xpc3RlbmVycy5nZXQobmFtZSkpIHtcbiAgICAgICAgICAgIGNvbnN0IGRlcHNTdHJpbmcgPSBkZXBzLm1hcCgoZGVwKSA9PiBkZXAgKyAnQ2hhbmdlLmtvbnZhJykuam9pbihTUEFDRSk7XG4gICAgICAgICAgICB0aGlzLm9uKGRlcHNTdHJpbmcsICgpID0+IHtcbiAgICAgICAgICAgICAgICB0aGlzLl9jbGVhckNhY2hlKG5hbWUpO1xuICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICB0aGlzLl9hdHRhY2hlZERlcHNMaXN0ZW5lcnMuc2V0KG5hbWUsIHRydWUpO1xuICAgICAgICB9XG4gICAgICAgIHJldHVybiB0aGlzLl9nZXRDYWNoZShuYW1lLCBnZXR0ZXIpO1xuICAgIH1cbiAgICBfZ2V0Q2FudmFzQ2FjaGUoKSB7XG4gICAgICAgIHJldHVybiB0aGlzLl9jYWNoZS5nZXQoQ0FOVkFTKTtcbiAgICB9XG4gICAgX2NsZWFyU2VsZkFuZERlc2NlbmRhbnRDYWNoZShhdHRyKSB7XG4gICAgICAgIHRoaXMuX2NsZWFyQ2FjaGUoYXR0cik7XG4gICAgICAgIGlmIChhdHRyID09PSBBQlNPTFVURV9UUkFOU0ZPUk0pIHtcbiAgICAgICAgICAgIHRoaXMuZmlyZSgnYWJzb2x1dGVUcmFuc2Zvcm1DaGFuZ2UnKTtcbiAgICAgICAgfVxuICAgIH1cbiAgICBjbGVhckNhY2hlKCkge1xuICAgICAgICBpZiAodGhpcy5fY2FjaGUuaGFzKENBTlZBUykpIHtcbiAgICAgICAgICAgIGNvbnN0IHsgc2NlbmUsIGZpbHRlciwgaGl0IH0gPSB0aGlzLl9jYWNoZS5nZXQoQ0FOVkFTKTtcbiAgICAgICAgICAgIFV0aWwucmVsZWFzZUNhbnZhcyhzY2VuZSwgZmlsdGVyLCBoaXQpO1xuICAgICAgICAgICAgdGhpcy5fY2FjaGUuZGVsZXRlKENBTlZBUyk7XG4gICAgICAgIH1cbiAgICAgICAgdGhpcy5fY2xlYXJTZWxmQW5kRGVzY2VuZGFudENhY2hlKCk7XG4gICAgICAgIHRoaXMuX3JlcXVlc3REcmF3KCk7XG4gICAgICAgIHJldHVybiB0aGlzO1xuICAgIH1cbiAgICBjYWNoZShjb25maWcpIHtcbiAgICAgICAgdmFyIGNvbmYgPSBjb25maWcgfHwge307XG4gICAgICAgIHZhciByZWN0ID0ge307XG4gICAgICAgIGlmIChjb25mLnggPT09IHVuZGVmaW5lZCB8fFxuICAgICAgICAgICAgY29uZi55ID09PSB1bmRlZmluZWQgfHxcbiAgICAgICAgICAgIGNvbmYud2lkdGggPT09IHVuZGVmaW5lZCB8fFxuICAgICAgICAgICAgY29uZi5oZWlnaHQgPT09IHVuZGVmaW5lZCkge1xuICAgICAgICAgICAgcmVjdCA9IHRoaXMuZ2V0Q2xpZW50UmVjdCh7XG4gICAgICAgICAgICAgICAgc2tpcFRyYW5zZm9ybTogdHJ1ZSxcbiAgICAgICAgICAgICAgICByZWxhdGl2ZVRvOiB0aGlzLmdldFBhcmVudCgpLFxuICAgICAgICAgICAgfSk7XG4gICAgICAgIH1cbiAgICAgICAgdmFyIHdpZHRoID0gTWF0aC5jZWlsKGNvbmYud2lkdGggfHwgcmVjdC53aWR0aCksIGhlaWdodCA9IE1hdGguY2VpbChjb25mLmhlaWdodCB8fCByZWN0LmhlaWdodCksIHBpeGVsUmF0aW8gPSBjb25mLnBpeGVsUmF0aW8sIHggPSBjb25mLnggPT09IHVuZGVmaW5lZCA/IE1hdGguZmxvb3IocmVjdC54KSA6IGNvbmYueCwgeSA9IGNvbmYueSA9PT0gdW5kZWZpbmVkID8gTWF0aC5mbG9vcihyZWN0LnkpIDogY29uZi55LCBvZmZzZXQgPSBjb25mLm9mZnNldCB8fCAwLCBkcmF3Qm9yZGVyID0gY29uZi5kcmF3Qm9yZGVyIHx8IGZhbHNlLCBoaXRDYW52YXNQaXhlbFJhdGlvID0gY29uZi5oaXRDYW52YXNQaXhlbFJhdGlvIHx8IDE7XG4gICAgICAgIGlmICghd2lkdGggfHwgIWhlaWdodCkge1xuICAgICAgICAgICAgVXRpbC5lcnJvcignQ2FuIG5vdCBjYWNoZSB0aGUgbm9kZS4gV2lkdGggb3IgaGVpZ2h0IG9mIHRoZSBub2RlIGVxdWFscyAwLiBDYWNoaW5nIGlzIHNraXBwZWQuJyk7XG4gICAgICAgICAgICByZXR1cm47XG4gICAgICAgIH1cbiAgICAgICAgd2lkdGggKz0gb2Zmc2V0ICogMiArIDE7XG4gICAgICAgIGhlaWdodCArPSBvZmZzZXQgKiAyICsgMTtcbiAgICAgICAgeCAtPSBvZmZzZXQ7XG4gICAgICAgIHkgLT0gb2Zmc2V0O1xuICAgICAgICB2YXIgY2FjaGVkU2NlbmVDYW52YXMgPSBuZXcgU2NlbmVDYW52YXMoe1xuICAgICAgICAgICAgcGl4ZWxSYXRpbzogcGl4ZWxSYXRpbyxcbiAgICAgICAgICAgIHdpZHRoOiB3aWR0aCxcbiAgICAgICAgICAgIGhlaWdodDogaGVpZ2h0LFxuICAgICAgICB9KSwgY2FjaGVkRmlsdGVyQ2FudmFzID0gbmV3IFNjZW5lQ2FudmFzKHtcbiAgICAgICAgICAgIHBpeGVsUmF0aW86IHBpeGVsUmF0aW8sXG4gICAgICAgICAgICB3aWR0aDogMCxcbiAgICAgICAgICAgIGhlaWdodDogMCxcbiAgICAgICAgfSksIGNhY2hlZEhpdENhbnZhcyA9IG5ldyBIaXRDYW52YXMoe1xuICAgICAgICAgICAgcGl4ZWxSYXRpbzogaGl0Q2FudmFzUGl4ZWxSYXRpbyxcbiAgICAgICAgICAgIHdpZHRoOiB3aWR0aCxcbiAgICAgICAgICAgIGhlaWdodDogaGVpZ2h0LFxuICAgICAgICB9KSwgc2NlbmVDb250ZXh0ID0gY2FjaGVkU2NlbmVDYW52YXMuZ2V0Q29udGV4dCgpLCBoaXRDb250ZXh0ID0gY2FjaGVkSGl0Q2FudmFzLmdldENvbnRleHQoKTtcbiAgICAgICAgY2FjaGVkSGl0Q2FudmFzLmlzQ2FjaGUgPSB0cnVlO1xuICAgICAgICBjYWNoZWRTY2VuZUNhbnZhcy5pc0NhY2hlID0gdHJ1ZTtcbiAgICAgICAgdGhpcy5fY2FjaGUuZGVsZXRlKENBTlZBUyk7XG4gICAgICAgIHRoaXMuX2ZpbHRlclVwVG9EYXRlID0gZmFsc2U7XG4gICAgICAgIGlmIChjb25mLmltYWdlU21vb3RoaW5nRW5hYmxlZCA9PT0gZmFsc2UpIHtcbiAgICAgICAgICAgIGNhY2hlZFNjZW5lQ2FudmFzLmdldENvbnRleHQoKS5fY29udGV4dC5pbWFnZVNtb290aGluZ0VuYWJsZWQgPSBmYWxzZTtcbiAgICAgICAgICAgIGNhY2hlZEZpbHRlckNhbnZhcy5nZXRDb250ZXh0KCkuX2NvbnRleHQuaW1hZ2VTbW9vdGhpbmdFbmFibGVkID0gZmFsc2U7XG4gICAgICAgIH1cbiAgICAgICAgc2NlbmVDb250ZXh0LnNhdmUoKTtcbiAgICAgICAgaGl0Q29udGV4dC5zYXZlKCk7XG4gICAgICAgIHNjZW5lQ29udGV4dC50cmFuc2xhdGUoLXgsIC15KTtcbiAgICAgICAgaGl0Q29udGV4dC50cmFuc2xhdGUoLXgsIC15KTtcbiAgICAgICAgdGhpcy5faXNVbmRlckNhY2hlID0gdHJ1ZTtcbiAgICAgICAgdGhpcy5fY2xlYXJTZWxmQW5kRGVzY2VuZGFudENhY2hlKEFCU09MVVRFX09QQUNJVFkpO1xuICAgICAgICB0aGlzLl9jbGVhclNlbGZBbmREZXNjZW5kYW50Q2FjaGUoQUJTT0xVVEVfU0NBTEUpO1xuICAgICAgICB0aGlzLmRyYXdTY2VuZShjYWNoZWRTY2VuZUNhbnZhcywgdGhpcyk7XG4gICAgICAgIHRoaXMuZHJhd0hpdChjYWNoZWRIaXRDYW52YXMsIHRoaXMpO1xuICAgICAgICB0aGlzLl9pc1VuZGVyQ2FjaGUgPSBmYWxzZTtcbiAgICAgICAgc2NlbmVDb250ZXh0LnJlc3RvcmUoKTtcbiAgICAgICAgaGl0Q29udGV4dC5yZXN0b3JlKCk7XG4gICAgICAgIGlmIChkcmF3Qm9yZGVyKSB7XG4gICAgICAgICAgICBzY2VuZUNvbnRleHQuc2F2ZSgpO1xuICAgICAgICAgICAgc2NlbmVDb250ZXh0LmJlZ2luUGF0aCgpO1xuICAgICAgICAgICAgc2NlbmVDb250ZXh0LnJlY3QoMCwgMCwgd2lkdGgsIGhlaWdodCk7XG4gICAgICAgICAgICBzY2VuZUNvbnRleHQuY2xvc2VQYXRoKCk7XG4gICAgICAgICAgICBzY2VuZUNvbnRleHQuc2V0QXR0cignc3Ryb2tlU3R5bGUnLCAncmVkJyk7XG4gICAgICAgICAgICBzY2VuZUNvbnRleHQuc2V0QXR0cignbGluZVdpZHRoJywgNSk7XG4gICAgICAgICAgICBzY2VuZUNvbnRleHQuc3Ryb2tlKCk7XG4gICAgICAgICAgICBzY2VuZUNvbnRleHQucmVzdG9yZSgpO1xuICAgICAgICB9XG4gICAgICAgIHRoaXMuX2NhY2hlLnNldChDQU5WQVMsIHtcbiAgICAgICAgICAgIHNjZW5lOiBjYWNoZWRTY2VuZUNhbnZhcyxcbiAgICAgICAgICAgIGZpbHRlcjogY2FjaGVkRmlsdGVyQ2FudmFzLFxuICAgICAgICAgICAgaGl0OiBjYWNoZWRIaXRDYW52YXMsXG4gICAgICAgICAgICB4OiB4LFxuICAgICAgICAgICAgeTogeSxcbiAgICAgICAgfSk7XG4gICAgICAgIHRoaXMuX3JlcXVlc3REcmF3KCk7XG4gICAgICAgIHJldHVybiB0aGlzO1xuICAgIH1cbiAgICBpc0NhY2hlZCgpIHtcbiAgICAgICAgcmV0dXJuIHRoaXMuX2NhY2hlLmhhcyhDQU5WQVMpO1xuICAgIH1cbiAgICBnZXRDbGllbnRSZWN0KGNvbmZpZykge1xuICAgICAgICB0aHJvdyBuZXcgRXJyb3IoJ2Fic3RyYWN0IFwiZ2V0Q2xpZW50UmVjdFwiIG1ldGhvZCBjYWxsJyk7XG4gICAgfVxuICAgIF90cmFuc2Zvcm1lZFJlY3QocmVjdCwgdG9wKSB7XG4gICAgICAgIHZhciBwb2ludHMgPSBbXG4gICAgICAgICAgICB7IHg6IHJlY3QueCwgeTogcmVjdC55IH0sXG4gICAgICAgICAgICB7IHg6IHJlY3QueCArIHJlY3Qud2lkdGgsIHk6IHJlY3QueSB9LFxuICAgICAgICAgICAgeyB4OiByZWN0LnggKyByZWN0LndpZHRoLCB5OiByZWN0LnkgKyByZWN0LmhlaWdodCB9LFxuICAgICAgICAgICAgeyB4OiByZWN0LngsIHk6IHJlY3QueSArIHJlY3QuaGVpZ2h0IH0sXG4gICAgICAgIF07XG4gICAgICAgIHZhciBtaW5YLCBtaW5ZLCBtYXhYLCBtYXhZO1xuICAgICAgICB2YXIgdHJhbnMgPSB0aGlzLmdldEFic29sdXRlVHJhbnNmb3JtKHRvcCk7XG4gICAgICAgIHBvaW50cy5mb3JFYWNoKGZ1bmN0aW9uIChwb2ludCkge1xuICAgICAgICAgICAgdmFyIHRyYW5zZm9ybWVkID0gdHJhbnMucG9pbnQocG9pbnQpO1xuICAgICAgICAgICAgaWYgKG1pblggPT09IHVuZGVmaW5lZCkge1xuICAgICAgICAgICAgICAgIG1pblggPSBtYXhYID0gdHJhbnNmb3JtZWQueDtcbiAgICAgICAgICAgICAgICBtaW5ZID0gbWF4WSA9IHRyYW5zZm9ybWVkLnk7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBtaW5YID0gTWF0aC5taW4obWluWCwgdHJhbnNmb3JtZWQueCk7XG4gICAgICAgICAgICBtaW5ZID0gTWF0aC5taW4obWluWSwgdHJhbnNmb3JtZWQueSk7XG4gICAgICAgICAgICBtYXhYID0gTWF0aC5tYXgobWF4WCwgdHJhbnNmb3JtZWQueCk7XG4gICAgICAgICAgICBtYXhZID0gTWF0aC5tYXgobWF4WSwgdHJhbnNmb3JtZWQueSk7XG4gICAgICAgIH0pO1xuICAgICAgICByZXR1cm4ge1xuICAgICAgICAgICAgeDogbWluWCxcbiAgICAgICAgICAgIHk6IG1pblksXG4gICAgICAgICAgICB3aWR0aDogbWF4WCAtIG1pblgsXG4gICAgICAgICAgICBoZWlnaHQ6IG1heFkgLSBtaW5ZLFxuICAgICAgICB9O1xuICAgIH1cbiAgICBfZHJhd0NhY2hlZFNjZW5lQ2FudmFzKGNvbnRleHQpIHtcbiAgICAgICAgY29udGV4dC5zYXZlKCk7XG4gICAgICAgIGNvbnRleHQuX2FwcGx5T3BhY2l0eSh0aGlzKTtcbiAgICAgICAgY29udGV4dC5fYXBwbHlHbG9iYWxDb21wb3NpdGVPcGVyYXRpb24odGhpcyk7XG4gICAgICAgIGNvbnN0IGNhbnZhc0NhY2hlID0gdGhpcy5fZ2V0Q2FudmFzQ2FjaGUoKTtcbiAgICAgICAgY29udGV4dC50cmFuc2xhdGUoY2FudmFzQ2FjaGUueCwgY2FudmFzQ2FjaGUueSk7XG4gICAgICAgIHZhciBjYWNoZUNhbnZhcyA9IHRoaXMuX2dldENhY2hlZFNjZW5lQ2FudmFzKCk7XG4gICAgICAgIHZhciByYXRpbyA9IGNhY2hlQ2FudmFzLnBpeGVsUmF0aW87XG4gICAgICAgIGNvbnRleHQuZHJhd0ltYWdlKGNhY2hlQ2FudmFzLl9jYW52YXMsIDAsIDAsIGNhY2hlQ2FudmFzLndpZHRoIC8gcmF0aW8sIGNhY2hlQ2FudmFzLmhlaWdodCAvIHJhdGlvKTtcbiAgICAgICAgY29udGV4dC5yZXN0b3JlKCk7XG4gICAgfVxuICAgIF9kcmF3Q2FjaGVkSGl0Q2FudmFzKGNvbnRleHQpIHtcbiAgICAgICAgdmFyIGNhbnZhc0NhY2hlID0gdGhpcy5fZ2V0Q2FudmFzQ2FjaGUoKSwgaGl0Q2FudmFzID0gY2FudmFzQ2FjaGUuaGl0O1xuICAgICAgICBjb250ZXh0LnNhdmUoKTtcbiAgICAgICAgY29udGV4dC50cmFuc2xhdGUoY2FudmFzQ2FjaGUueCwgY2FudmFzQ2FjaGUueSk7XG4gICAgICAgIGNvbnRleHQuZHJhd0ltYWdlKGhpdENhbnZhcy5fY2FudmFzLCAwLCAwLCBoaXRDYW52YXMud2lkdGggLyBoaXRDYW52YXMucGl4ZWxSYXRpbywgaGl0Q2FudmFzLmhlaWdodCAvIGhpdENhbnZhcy5waXhlbFJhdGlvKTtcbiAgICAgICAgY29udGV4dC5yZXN0b3JlKCk7XG4gICAgfVxuICAgIF9nZXRDYWNoZWRTY2VuZUNhbnZhcygpIHtcbiAgICAgICAgdmFyIGZpbHRlcnMgPSB0aGlzLmZpbHRlcnMoKSwgY2FjaGVkQ2FudmFzID0gdGhpcy5fZ2V0Q2FudmFzQ2FjaGUoKSwgc2NlbmVDYW52YXMgPSBjYWNoZWRDYW52YXMuc2NlbmUsIGZpbHRlckNhbnZhcyA9IGNhY2hlZENhbnZhcy5maWx0ZXIsIGZpbHRlckNvbnRleHQgPSBmaWx0ZXJDYW52YXMuZ2V0Q29udGV4dCgpLCBsZW4sIGltYWdlRGF0YSwgbiwgZmlsdGVyO1xuICAgICAgICBpZiAoZmlsdGVycykge1xuICAgICAgICAgICAgaWYgKCF0aGlzLl9maWx0ZXJVcFRvRGF0ZSkge1xuICAgICAgICAgICAgICAgIHZhciByYXRpbyA9IHNjZW5lQ2FudmFzLnBpeGVsUmF0aW87XG4gICAgICAgICAgICAgICAgZmlsdGVyQ2FudmFzLnNldFNpemUoc2NlbmVDYW52YXMud2lkdGggLyBzY2VuZUNhbnZhcy5waXhlbFJhdGlvLCBzY2VuZUNhbnZhcy5oZWlnaHQgLyBzY2VuZUNhbnZhcy5waXhlbFJhdGlvKTtcbiAgICAgICAgICAgICAgICB0cnkge1xuICAgICAgICAgICAgICAgICAgICBsZW4gPSBmaWx0ZXJzLmxlbmd0aDtcbiAgICAgICAgICAgICAgICAgICAgZmlsdGVyQ29udGV4dC5jbGVhcigpO1xuICAgICAgICAgICAgICAgICAgICBmaWx0ZXJDb250ZXh0LmRyYXdJbWFnZShzY2VuZUNhbnZhcy5fY2FudmFzLCAwLCAwLCBzY2VuZUNhbnZhcy5nZXRXaWR0aCgpIC8gcmF0aW8sIHNjZW5lQ2FudmFzLmdldEhlaWdodCgpIC8gcmF0aW8pO1xuICAgICAgICAgICAgICAgICAgICBpbWFnZURhdGEgPSBmaWx0ZXJDb250ZXh0LmdldEltYWdlRGF0YSgwLCAwLCBmaWx0ZXJDYW52YXMuZ2V0V2lkdGgoKSwgZmlsdGVyQ2FudmFzLmdldEhlaWdodCgpKTtcbiAgICAgICAgICAgICAgICAgICAgZm9yIChuID0gMDsgbiA8IGxlbjsgbisrKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICBmaWx0ZXIgPSBmaWx0ZXJzW25dO1xuICAgICAgICAgICAgICAgICAgICAgICAgaWYgKHR5cGVvZiBmaWx0ZXIgIT09ICdmdW5jdGlvbicpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBVdGlsLmVycm9yKCdGaWx0ZXIgc2hvdWxkIGJlIHR5cGUgb2YgZnVuY3Rpb24sIGJ1dCBnb3QgJyArXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHR5cGVvZiBmaWx0ZXIgK1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAnIGluc3RlYWQuIFBsZWFzZSBjaGVjayBjb3JyZWN0IGZpbHRlcnMnKTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBjb250aW51ZTtcbiAgICAgICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgICAgIGZpbHRlci5jYWxsKHRoaXMsIGltYWdlRGF0YSk7XG4gICAgICAgICAgICAgICAgICAgICAgICBmaWx0ZXJDb250ZXh0LnB1dEltYWdlRGF0YShpbWFnZURhdGEsIDAsIDApO1xuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIGNhdGNoIChlKSB7XG4gICAgICAgICAgICAgICAgICAgIFV0aWwuZXJyb3IoJ1VuYWJsZSB0byBhcHBseSBmaWx0ZXIuICcgK1xuICAgICAgICAgICAgICAgICAgICAgICAgZS5tZXNzYWdlICtcbiAgICAgICAgICAgICAgICAgICAgICAgICcgVGhpcyBwb3N0IG15IGhlbHAgeW91IGh0dHBzOi8va29udmFqcy5vcmcvZG9jcy9wb3N0cy9UYWludGVkX0NhbnZhcy5odG1sLicpO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICB0aGlzLl9maWx0ZXJVcFRvRGF0ZSA9IHRydWU7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICByZXR1cm4gZmlsdGVyQ2FudmFzO1xuICAgICAgICB9XG4gICAgICAgIHJldHVybiBzY2VuZUNhbnZhcztcbiAgICB9XG4gICAgb24oZXZ0U3RyLCBoYW5kbGVyKSB7XG4gICAgICAgIHRoaXMuX2NhY2hlICYmIHRoaXMuX2NhY2hlLmRlbGV0ZShBTExfTElTVEVORVJTKTtcbiAgICAgICAgaWYgKGFyZ3VtZW50cy5sZW5ndGggPT09IDMpIHtcbiAgICAgICAgICAgIHJldHVybiB0aGlzLl9kZWxlZ2F0ZS5hcHBseSh0aGlzLCBhcmd1bWVudHMpO1xuICAgICAgICB9XG4gICAgICAgIHZhciBldmVudHMgPSBldnRTdHIuc3BsaXQoU1BBQ0UpLCBsZW4gPSBldmVudHMubGVuZ3RoLCBuLCBldmVudCwgcGFydHMsIGJhc2VFdmVudCwgbmFtZTtcbiAgICAgICAgZm9yIChuID0gMDsgbiA8IGxlbjsgbisrKSB7XG4gICAgICAgICAgICBldmVudCA9IGV2ZW50c1tuXTtcbiAgICAgICAgICAgIHBhcnRzID0gZXZlbnQuc3BsaXQoJy4nKTtcbiAgICAgICAgICAgIGJhc2VFdmVudCA9IHBhcnRzWzBdO1xuICAgICAgICAgICAgbmFtZSA9IHBhcnRzWzFdIHx8ICcnO1xuICAgICAgICAgICAgaWYgKCF0aGlzLmV2ZW50TGlzdGVuZXJzW2Jhc2VFdmVudF0pIHtcbiAgICAgICAgICAgICAgICB0aGlzLmV2ZW50TGlzdGVuZXJzW2Jhc2VFdmVudF0gPSBbXTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIHRoaXMuZXZlbnRMaXN0ZW5lcnNbYmFzZUV2ZW50XS5wdXNoKHtcbiAgICAgICAgICAgICAgICBuYW1lOiBuYW1lLFxuICAgICAgICAgICAgICAgIGhhbmRsZXI6IGhhbmRsZXIsXG4gICAgICAgICAgICB9KTtcbiAgICAgICAgfVxuICAgICAgICByZXR1cm4gdGhpcztcbiAgICB9XG4gICAgb2ZmKGV2dFN0ciwgY2FsbGJhY2spIHtcbiAgICAgICAgdmFyIGV2ZW50cyA9IChldnRTdHIgfHwgJycpLnNwbGl0KFNQQUNFKSwgbGVuID0gZXZlbnRzLmxlbmd0aCwgbiwgdCwgZXZlbnQsIHBhcnRzLCBiYXNlRXZlbnQsIG5hbWU7XG4gICAgICAgIHRoaXMuX2NhY2hlICYmIHRoaXMuX2NhY2hlLmRlbGV0ZShBTExfTElTVEVORVJTKTtcbiAgICAgICAgaWYgKCFldnRTdHIpIHtcbiAgICAgICAgICAgIGZvciAodCBpbiB0aGlzLmV2ZW50TGlzdGVuZXJzKSB7XG4gICAgICAgICAgICAgICAgdGhpcy5fb2ZmKHQpO1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICAgIGZvciAobiA9IDA7IG4gPCBsZW47IG4rKykge1xuICAgICAgICAgICAgZXZlbnQgPSBldmVudHNbbl07XG4gICAgICAgICAgICBwYXJ0cyA9IGV2ZW50LnNwbGl0KCcuJyk7XG4gICAgICAgICAgICBiYXNlRXZlbnQgPSBwYXJ0c1swXTtcbiAgICAgICAgICAgIG5hbWUgPSBwYXJ0c1sxXTtcbiAgICAgICAgICAgIGlmIChiYXNlRXZlbnQpIHtcbiAgICAgICAgICAgICAgICBpZiAodGhpcy5ldmVudExpc3RlbmVyc1tiYXNlRXZlbnRdKSB7XG4gICAgICAgICAgICAgICAgICAgIHRoaXMuX29mZihiYXNlRXZlbnQsIG5hbWUsIGNhbGxiYWNrKTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBlbHNlIHtcbiAgICAgICAgICAgICAgICBmb3IgKHQgaW4gdGhpcy5ldmVudExpc3RlbmVycykge1xuICAgICAgICAgICAgICAgICAgICB0aGlzLl9vZmYodCwgbmFtZSwgY2FsbGJhY2spO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgICByZXR1cm4gdGhpcztcbiAgICB9XG4gICAgZGlzcGF0Y2hFdmVudChldnQpIHtcbiAgICAgICAgdmFyIGUgPSB7XG4gICAgICAgICAgICB0YXJnZXQ6IHRoaXMsXG4gICAgICAgICAgICB0eXBlOiBldnQudHlwZSxcbiAgICAgICAgICAgIGV2dDogZXZ0LFxuICAgICAgICB9O1xuICAgICAgICB0aGlzLmZpcmUoZXZ0LnR5cGUsIGUpO1xuICAgICAgICByZXR1cm4gdGhpcztcbiAgICB9XG4gICAgYWRkRXZlbnRMaXN0ZW5lcih0eXBlLCBoYW5kbGVyKSB7XG4gICAgICAgIHRoaXMub24odHlwZSwgZnVuY3Rpb24gKGV2dCkge1xuICAgICAgICAgICAgaGFuZGxlci5jYWxsKHRoaXMsIGV2dC5ldnQpO1xuICAgICAgICB9KTtcbiAgICAgICAgcmV0dXJuIHRoaXM7XG4gICAgfVxuICAgIHJlbW92ZUV2ZW50TGlzdGVuZXIodHlwZSkge1xuICAgICAgICB0aGlzLm9mZih0eXBlKTtcbiAgICAgICAgcmV0dXJuIHRoaXM7XG4gICAgfVxuICAgIF9kZWxlZ2F0ZShldmVudCwgc2VsZWN0b3IsIGhhbmRsZXIpIHtcbiAgICAgICAgdmFyIHN0b3BOb2RlID0gdGhpcztcbiAgICAgICAgdGhpcy5vbihldmVudCwgZnVuY3Rpb24gKGV2dCkge1xuICAgICAgICAgICAgdmFyIHRhcmdldHMgPSBldnQudGFyZ2V0LmZpbmRBbmNlc3RvcnMoc2VsZWN0b3IsIHRydWUsIHN0b3BOb2RlKTtcbiAgICAgICAgICAgIGZvciAodmFyIGkgPSAwOyBpIDwgdGFyZ2V0cy5sZW5ndGg7IGkrKykge1xuICAgICAgICAgICAgICAgIGV2dCA9IFV0aWwuY2xvbmVPYmplY3QoZXZ0KTtcbiAgICAgICAgICAgICAgICBldnQuY3VycmVudFRhcmdldCA9IHRhcmdldHNbaV07XG4gICAgICAgICAgICAgICAgaGFuZGxlci5jYWxsKHRhcmdldHNbaV0sIGV2dCk7XG4gICAgICAgICAgICB9XG4gICAgICAgIH0pO1xuICAgIH1cbiAgICByZW1vdmUoKSB7XG4gICAgICAgIGlmICh0aGlzLmlzRHJhZ2dpbmcoKSkge1xuICAgICAgICAgICAgdGhpcy5zdG9wRHJhZygpO1xuICAgICAgICB9XG4gICAgICAgIERELl9kcmFnRWxlbWVudHMuZGVsZXRlKHRoaXMuX2lkKTtcbiAgICAgICAgdGhpcy5fcmVtb3ZlKCk7XG4gICAgICAgIHJldHVybiB0aGlzO1xuICAgIH1cbiAgICBfY2xlYXJDYWNoZXMoKSB7XG4gICAgICAgIHRoaXMuX2NsZWFyU2VsZkFuZERlc2NlbmRhbnRDYWNoZShBQlNPTFVURV9UUkFOU0ZPUk0pO1xuICAgICAgICB0aGlzLl9jbGVhclNlbGZBbmREZXNjZW5kYW50Q2FjaGUoQUJTT0xVVEVfT1BBQ0lUWSk7XG4gICAgICAgIHRoaXMuX2NsZWFyU2VsZkFuZERlc2NlbmRhbnRDYWNoZShBQlNPTFVURV9TQ0FMRSk7XG4gICAgICAgIHRoaXMuX2NsZWFyU2VsZkFuZERlc2NlbmRhbnRDYWNoZShTVEFHRSk7XG4gICAgICAgIHRoaXMuX2NsZWFyU2VsZkFuZERlc2NlbmRhbnRDYWNoZShWSVNJQkxFKTtcbiAgICAgICAgdGhpcy5fY2xlYXJTZWxmQW5kRGVzY2VuZGFudENhY2hlKExJU1RFTklORyk7XG4gICAgfVxuICAgIF9yZW1vdmUoKSB7XG4gICAgICAgIHRoaXMuX2NsZWFyQ2FjaGVzKCk7XG4gICAgICAgIHZhciBwYXJlbnQgPSB0aGlzLmdldFBhcmVudCgpO1xuICAgICAgICBpZiAocGFyZW50ICYmIHBhcmVudC5jaGlsZHJlbikge1xuICAgICAgICAgICAgcGFyZW50LmNoaWxkcmVuLnNwbGljZSh0aGlzLmluZGV4LCAxKTtcbiAgICAgICAgICAgIHBhcmVudC5fc2V0Q2hpbGRyZW5JbmRpY2VzKCk7XG4gICAgICAgICAgICB0aGlzLnBhcmVudCA9IG51bGw7XG4gICAgICAgIH1cbiAgICB9XG4gICAgZGVzdHJveSgpIHtcbiAgICAgICAgdGhpcy5yZW1vdmUoKTtcbiAgICAgICAgdGhpcy5jbGVhckNhY2hlKCk7XG4gICAgICAgIHJldHVybiB0aGlzO1xuICAgIH1cbiAgICBnZXRBdHRyKGF0dHIpIHtcbiAgICAgICAgdmFyIG1ldGhvZCA9ICdnZXQnICsgVXRpbC5fY2FwaXRhbGl6ZShhdHRyKTtcbiAgICAgICAgaWYgKFV0aWwuX2lzRnVuY3Rpb24odGhpc1ttZXRob2RdKSkge1xuICAgICAgICAgICAgcmV0dXJuIHRoaXNbbWV0aG9kXSgpO1xuICAgICAgICB9XG4gICAgICAgIHJldHVybiB0aGlzLmF0dHJzW2F0dHJdO1xuICAgIH1cbiAgICBnZXRBbmNlc3RvcnMoKSB7XG4gICAgICAgIHZhciBwYXJlbnQgPSB0aGlzLmdldFBhcmVudCgpLCBhbmNlc3RvcnMgPSBbXTtcbiAgICAgICAgd2hpbGUgKHBhcmVudCkge1xuICAgICAgICAgICAgYW5jZXN0b3JzLnB1c2gocGFyZW50KTtcbiAgICAgICAgICAgIHBhcmVudCA9IHBhcmVudC5nZXRQYXJlbnQoKTtcbiAgICAgICAgfVxuICAgICAgICByZXR1cm4gYW5jZXN0b3JzO1xuICAgIH1cbiAgICBnZXRBdHRycygpIHtcbiAgICAgICAgcmV0dXJuIHRoaXMuYXR0cnMgfHwge307XG4gICAgfVxuICAgIHNldEF0dHJzKGNvbmZpZykge1xuICAgICAgICB0aGlzLl9iYXRjaFRyYW5zZm9ybUNoYW5nZXMoKCkgPT4ge1xuICAgICAgICAgICAgdmFyIGtleSwgbWV0aG9kO1xuICAgICAgICAgICAgaWYgKCFjb25maWcpIHtcbiAgICAgICAgICAgICAgICByZXR1cm4gdGhpcztcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGZvciAoa2V5IGluIGNvbmZpZykge1xuICAgICAgICAgICAgICAgIGlmIChrZXkgPT09IENISUxEUkVOKSB7XG4gICAgICAgICAgICAgICAgICAgIGNvbnRpbnVlO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICBtZXRob2QgPSBTRVQgKyBVdGlsLl9jYXBpdGFsaXplKGtleSk7XG4gICAgICAgICAgICAgICAgaWYgKFV0aWwuX2lzRnVuY3Rpb24odGhpc1ttZXRob2RdKSkge1xuICAgICAgICAgICAgICAgICAgICB0aGlzW21ldGhvZF0oY29uZmlnW2tleV0pO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICBlbHNlIHtcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5fc2V0QXR0cihrZXksIGNvbmZpZ1trZXldKTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9XG4gICAgICAgIH0pO1xuICAgICAgICByZXR1cm4gdGhpcztcbiAgICB9XG4gICAgaXNMaXN0ZW5pbmcoKSB7XG4gICAgICAgIHJldHVybiB0aGlzLl9nZXRDYWNoZShMSVNURU5JTkcsIHRoaXMuX2lzTGlzdGVuaW5nKTtcbiAgICB9XG4gICAgX2lzTGlzdGVuaW5nKHJlbGF0aXZlVG8pIHtcbiAgICAgICAgY29uc3QgbGlzdGVuaW5nID0gdGhpcy5saXN0ZW5pbmcoKTtcbiAgICAgICAgaWYgKCFsaXN0ZW5pbmcpIHtcbiAgICAgICAgICAgIHJldHVybiBmYWxzZTtcbiAgICAgICAgfVxuICAgICAgICBjb25zdCBwYXJlbnQgPSB0aGlzLmdldFBhcmVudCgpO1xuICAgICAgICBpZiAocGFyZW50ICYmIHBhcmVudCAhPT0gcmVsYXRpdmVUbyAmJiB0aGlzICE9PSByZWxhdGl2ZVRvKSB7XG4gICAgICAgICAgICByZXR1cm4gcGFyZW50Ll9pc0xpc3RlbmluZyhyZWxhdGl2ZVRvKTtcbiAgICAgICAgfVxuICAgICAgICBlbHNlIHtcbiAgICAgICAgICAgIHJldHVybiB0cnVlO1xuICAgICAgICB9XG4gICAgfVxuICAgIGlzVmlzaWJsZSgpIHtcbiAgICAgICAgcmV0dXJuIHRoaXMuX2dldENhY2hlKFZJU0lCTEUsIHRoaXMuX2lzVmlzaWJsZSk7XG4gICAgfVxuICAgIF9pc1Zpc2libGUocmVsYXRpdmVUbykge1xuICAgICAgICBjb25zdCB2aXNpYmxlID0gdGhpcy52aXNpYmxlKCk7XG4gICAgICAgIGlmICghdmlzaWJsZSkge1xuICAgICAgICAgICAgcmV0dXJuIGZhbHNlO1xuICAgICAgICB9XG4gICAgICAgIGNvbnN0IHBhcmVudCA9IHRoaXMuZ2V0UGFyZW50KCk7XG4gICAgICAgIGlmIChwYXJlbnQgJiYgcGFyZW50ICE9PSByZWxhdGl2ZVRvICYmIHRoaXMgIT09IHJlbGF0aXZlVG8pIHtcbiAgICAgICAgICAgIHJldHVybiBwYXJlbnQuX2lzVmlzaWJsZShyZWxhdGl2ZVRvKTtcbiAgICAgICAgfVxuICAgICAgICBlbHNlIHtcbiAgICAgICAgICAgIHJldHVybiB0cnVlO1xuICAgICAgICB9XG4gICAgfVxuICAgIHNob3VsZERyYXdIaXQodG9wLCBza2lwRHJhZ0NoZWNrID0gZmFsc2UpIHtcbiAgICAgICAgaWYgKHRvcCkge1xuICAgICAgICAgICAgcmV0dXJuIHRoaXMuX2lzVmlzaWJsZSh0b3ApICYmIHRoaXMuX2lzTGlzdGVuaW5nKHRvcCk7XG4gICAgICAgIH1cbiAgICAgICAgdmFyIGxheWVyID0gdGhpcy5nZXRMYXllcigpO1xuICAgICAgICB2YXIgbGF5ZXJVbmRlckRyYWcgPSBmYWxzZTtcbiAgICAgICAgREQuX2RyYWdFbGVtZW50cy5mb3JFYWNoKChlbGVtKSA9PiB7XG4gICAgICAgICAgICBpZiAoZWxlbS5kcmFnU3RhdHVzICE9PSAnZHJhZ2dpbmcnKSB7XG4gICAgICAgICAgICAgICAgcmV0dXJuO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgZWxzZSBpZiAoZWxlbS5ub2RlLm5vZGVUeXBlID09PSAnU3RhZ2UnKSB7XG4gICAgICAgICAgICAgICAgbGF5ZXJVbmRlckRyYWcgPSB0cnVlO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgZWxzZSBpZiAoZWxlbS5ub2RlLmdldExheWVyKCkgPT09IGxheWVyKSB7XG4gICAgICAgICAgICAgICAgbGF5ZXJVbmRlckRyYWcgPSB0cnVlO1xuICAgICAgICAgICAgfVxuICAgICAgICB9KTtcbiAgICAgICAgdmFyIGRyYWdTa2lwID0gIXNraXBEcmFnQ2hlY2sgJiYgIUtvbnZhLmhpdE9uRHJhZ0VuYWJsZWQgJiYgbGF5ZXJVbmRlckRyYWc7XG4gICAgICAgIHJldHVybiB0aGlzLmlzTGlzdGVuaW5nKCkgJiYgdGhpcy5pc1Zpc2libGUoKSAmJiAhZHJhZ1NraXA7XG4gICAgfVxuICAgIHNob3coKSB7XG4gICAgICAgIHRoaXMudmlzaWJsZSh0cnVlKTtcbiAgICAgICAgcmV0dXJuIHRoaXM7XG4gICAgfVxuICAgIGhpZGUoKSB7XG4gICAgICAgIHRoaXMudmlzaWJsZShmYWxzZSk7XG4gICAgICAgIHJldHVybiB0aGlzO1xuICAgIH1cbiAgICBnZXRaSW5kZXgoKSB7XG4gICAgICAgIHJldHVybiB0aGlzLmluZGV4IHx8IDA7XG4gICAgfVxuICAgIGdldEFic29sdXRlWkluZGV4KCkge1xuICAgICAgICB2YXIgZGVwdGggPSB0aGlzLmdldERlcHRoKCksIHRoYXQgPSB0aGlzLCBpbmRleCA9IDAsIG5vZGVzLCBsZW4sIG4sIGNoaWxkO1xuICAgICAgICBmdW5jdGlvbiBhZGRDaGlsZHJlbihjaGlsZHJlbikge1xuICAgICAgICAgICAgbm9kZXMgPSBbXTtcbiAgICAgICAgICAgIGxlbiA9IGNoaWxkcmVuLmxlbmd0aDtcbiAgICAgICAgICAgIGZvciAobiA9IDA7IG4gPCBsZW47IG4rKykge1xuICAgICAgICAgICAgICAgIGNoaWxkID0gY2hpbGRyZW5bbl07XG4gICAgICAgICAgICAgICAgaW5kZXgrKztcbiAgICAgICAgICAgICAgICBpZiAoY2hpbGQubm9kZVR5cGUgIT09IFNIQVBFKSB7XG4gICAgICAgICAgICAgICAgICAgIG5vZGVzID0gbm9kZXMuY29uY2F0KGNoaWxkLmdldENoaWxkcmVuKCkuc2xpY2UoKSk7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIGlmIChjaGlsZC5faWQgPT09IHRoYXQuX2lkKSB7XG4gICAgICAgICAgICAgICAgICAgIG4gPSBsZW47XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfVxuICAgICAgICAgICAgaWYgKG5vZGVzLmxlbmd0aCA+IDAgJiYgbm9kZXNbMF0uZ2V0RGVwdGgoKSA8PSBkZXB0aCkge1xuICAgICAgICAgICAgICAgIGFkZENoaWxkcmVuKG5vZGVzKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgICBpZiAodGhhdC5ub2RlVHlwZSAhPT0gVVBQRVJfU1RBR0UpIHtcbiAgICAgICAgICAgIGFkZENoaWxkcmVuKHRoYXQuZ2V0U3RhZ2UoKS5nZXRDaGlsZHJlbigpKTtcbiAgICAgICAgfVxuICAgICAgICByZXR1cm4gaW5kZXg7XG4gICAgfVxuICAgIGdldERlcHRoKCkge1xuICAgICAgICB2YXIgZGVwdGggPSAwLCBwYXJlbnQgPSB0aGlzLnBhcmVudDtcbiAgICAgICAgd2hpbGUgKHBhcmVudCkge1xuICAgICAgICAgICAgZGVwdGgrKztcbiAgICAgICAgICAgIHBhcmVudCA9IHBhcmVudC5wYXJlbnQ7XG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuIGRlcHRoO1xuICAgIH1cbiAgICBfYmF0Y2hUcmFuc2Zvcm1DaGFuZ2VzKGZ1bmMpIHtcbiAgICAgICAgdGhpcy5fYmF0Y2hpbmdUcmFuc2Zvcm1DaGFuZ2UgPSB0cnVlO1xuICAgICAgICBmdW5jKCk7XG4gICAgICAgIHRoaXMuX2JhdGNoaW5nVHJhbnNmb3JtQ2hhbmdlID0gZmFsc2U7XG4gICAgICAgIGlmICh0aGlzLl9uZWVkQ2xlYXJUcmFuc2Zvcm1DYWNoZSkge1xuICAgICAgICAgICAgdGhpcy5fY2xlYXJDYWNoZShUUkFOU0ZPUk0pO1xuICAgICAgICAgICAgdGhpcy5fY2xlYXJTZWxmQW5kRGVzY2VuZGFudENhY2hlKEFCU09MVVRFX1RSQU5TRk9STSk7XG4gICAgICAgIH1cbiAgICAgICAgdGhpcy5fbmVlZENsZWFyVHJhbnNmb3JtQ2FjaGUgPSBmYWxzZTtcbiAgICB9XG4gICAgc2V0UG9zaXRpb24ocG9zKSB7XG4gICAgICAgIHRoaXMuX2JhdGNoVHJhbnNmb3JtQ2hhbmdlcygoKSA9PiB7XG4gICAgICAgICAgICB0aGlzLngocG9zLngpO1xuICAgICAgICAgICAgdGhpcy55KHBvcy55KTtcbiAgICAgICAgfSk7XG4gICAgICAgIHJldHVybiB0aGlzO1xuICAgIH1cbiAgICBnZXRQb3NpdGlvbigpIHtcbiAgICAgICAgcmV0dXJuIHtcbiAgICAgICAgICAgIHg6IHRoaXMueCgpLFxuICAgICAgICAgICAgeTogdGhpcy55KCksXG4gICAgICAgIH07XG4gICAgfVxuICAgIGdldFJlbGF0aXZlUG9pbnRlclBvc2l0aW9uKCkge1xuICAgICAgICBpZiAoIXRoaXMuZ2V0U3RhZ2UoKSkge1xuICAgICAgICAgICAgcmV0dXJuIG51bGw7XG4gICAgICAgIH1cbiAgICAgICAgdmFyIHBvcyA9IHRoaXMuZ2V0U3RhZ2UoKS5nZXRQb2ludGVyUG9zaXRpb24oKTtcbiAgICAgICAgaWYgKCFwb3MpIHtcbiAgICAgICAgICAgIHJldHVybiBudWxsO1xuICAgICAgICB9XG4gICAgICAgIHZhciB0cmFuc2Zvcm0gPSB0aGlzLmdldEFic29sdXRlVHJhbnNmb3JtKCkuY29weSgpO1xuICAgICAgICB0cmFuc2Zvcm0uaW52ZXJ0KCk7XG4gICAgICAgIHJldHVybiB0cmFuc2Zvcm0ucG9pbnQocG9zKTtcbiAgICB9XG4gICAgZ2V0QWJzb2x1dGVQb3NpdGlvbih0b3ApIHtcbiAgICAgICAgbGV0IGhhdmVDYWNoZWRQYXJlbnQgPSBmYWxzZTtcbiAgICAgICAgbGV0IHBhcmVudCA9IHRoaXMucGFyZW50O1xuICAgICAgICB3aGlsZSAocGFyZW50KSB7XG4gICAgICAgICAgICBpZiAocGFyZW50LmlzQ2FjaGVkKCkpIHtcbiAgICAgICAgICAgICAgICBoYXZlQ2FjaGVkUGFyZW50ID0gdHJ1ZTtcbiAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIHBhcmVudCA9IHBhcmVudC5wYXJlbnQ7XG4gICAgICAgIH1cbiAgICAgICAgaWYgKGhhdmVDYWNoZWRQYXJlbnQgJiYgIXRvcCkge1xuICAgICAgICAgICAgdG9wID0gdHJ1ZTtcbiAgICAgICAgfVxuICAgICAgICB2YXIgYWJzb2x1dGVNYXRyaXggPSB0aGlzLmdldEFic29sdXRlVHJhbnNmb3JtKHRvcCkuZ2V0TWF0cml4KCksIGFic29sdXRlVHJhbnNmb3JtID0gbmV3IFRyYW5zZm9ybSgpLCBvZmZzZXQgPSB0aGlzLm9mZnNldCgpO1xuICAgICAgICBhYnNvbHV0ZVRyYW5zZm9ybS5tID0gYWJzb2x1dGVNYXRyaXguc2xpY2UoKTtcbiAgICAgICAgYWJzb2x1dGVUcmFuc2Zvcm0udHJhbnNsYXRlKG9mZnNldC54LCBvZmZzZXQueSk7XG4gICAgICAgIHJldHVybiBhYnNvbHV0ZVRyYW5zZm9ybS5nZXRUcmFuc2xhdGlvbigpO1xuICAgIH1cbiAgICBzZXRBYnNvbHV0ZVBvc2l0aW9uKHBvcykge1xuICAgICAgICB2YXIgb3JpZ1RyYW5zID0gdGhpcy5fY2xlYXJUcmFuc2Zvcm0oKTtcbiAgICAgICAgdGhpcy5hdHRycy54ID0gb3JpZ1RyYW5zLng7XG4gICAgICAgIHRoaXMuYXR0cnMueSA9IG9yaWdUcmFucy55O1xuICAgICAgICBkZWxldGUgb3JpZ1RyYW5zLng7XG4gICAgICAgIGRlbGV0ZSBvcmlnVHJhbnMueTtcbiAgICAgICAgdGhpcy5fY2xlYXJDYWNoZShUUkFOU0ZPUk0pO1xuICAgICAgICB2YXIgaXQgPSB0aGlzLl9nZXRBYnNvbHV0ZVRyYW5zZm9ybSgpLmNvcHkoKTtcbiAgICAgICAgaXQuaW52ZXJ0KCk7XG4gICAgICAgIGl0LnRyYW5zbGF0ZShwb3MueCwgcG9zLnkpO1xuICAgICAgICBwb3MgPSB7XG4gICAgICAgICAgICB4OiB0aGlzLmF0dHJzLnggKyBpdC5nZXRUcmFuc2xhdGlvbigpLngsXG4gICAgICAgICAgICB5OiB0aGlzLmF0dHJzLnkgKyBpdC5nZXRUcmFuc2xhdGlvbigpLnksXG4gICAgICAgIH07XG4gICAgICAgIHRoaXMuX3NldFRyYW5zZm9ybShvcmlnVHJhbnMpO1xuICAgICAgICB0aGlzLnNldFBvc2l0aW9uKHsgeDogcG9zLngsIHk6IHBvcy55IH0pO1xuICAgICAgICB0aGlzLl9jbGVhckNhY2hlKFRSQU5TRk9STSk7XG4gICAgICAgIHRoaXMuX2NsZWFyU2VsZkFuZERlc2NlbmRhbnRDYWNoZShBQlNPTFVURV9UUkFOU0ZPUk0pO1xuICAgICAgICByZXR1cm4gdGhpcztcbiAgICB9XG4gICAgX3NldFRyYW5zZm9ybSh0cmFucykge1xuICAgICAgICB2YXIga2V5O1xuICAgICAgICBmb3IgKGtleSBpbiB0cmFucykge1xuICAgICAgICAgICAgdGhpcy5hdHRyc1trZXldID0gdHJhbnNba2V5XTtcbiAgICAgICAgfVxuICAgIH1cbiAgICBfY2xlYXJUcmFuc2Zvcm0oKSB7XG4gICAgICAgIHZhciB0cmFucyA9IHtcbiAgICAgICAgICAgIHg6IHRoaXMueCgpLFxuICAgICAgICAgICAgeTogdGhpcy55KCksXG4gICAgICAgICAgICByb3RhdGlvbjogdGhpcy5yb3RhdGlvbigpLFxuICAgICAgICAgICAgc2NhbGVYOiB0aGlzLnNjYWxlWCgpLFxuICAgICAgICAgICAgc2NhbGVZOiB0aGlzLnNjYWxlWSgpLFxuICAgICAgICAgICAgb2Zmc2V0WDogdGhpcy5vZmZzZXRYKCksXG4gICAgICAgICAgICBvZmZzZXRZOiB0aGlzLm9mZnNldFkoKSxcbiAgICAgICAgICAgIHNrZXdYOiB0aGlzLnNrZXdYKCksXG4gICAgICAgICAgICBza2V3WTogdGhpcy5za2V3WSgpLFxuICAgICAgICB9O1xuICAgICAgICB0aGlzLmF0dHJzLnggPSAwO1xuICAgICAgICB0aGlzLmF0dHJzLnkgPSAwO1xuICAgICAgICB0aGlzLmF0dHJzLnJvdGF0aW9uID0gMDtcbiAgICAgICAgdGhpcy5hdHRycy5zY2FsZVggPSAxO1xuICAgICAgICB0aGlzLmF0dHJzLnNjYWxlWSA9IDE7XG4gICAgICAgIHRoaXMuYXR0cnMub2Zmc2V0WCA9IDA7XG4gICAgICAgIHRoaXMuYXR0cnMub2Zmc2V0WSA9IDA7XG4gICAgICAgIHRoaXMuYXR0cnMuc2tld1ggPSAwO1xuICAgICAgICB0aGlzLmF0dHJzLnNrZXdZID0gMDtcbiAgICAgICAgcmV0dXJuIHRyYW5zO1xuICAgIH1cbiAgICBtb3ZlKGNoYW5nZSkge1xuICAgICAgICB2YXIgY2hhbmdlWCA9IGNoYW5nZS54LCBjaGFuZ2VZID0gY2hhbmdlLnksIHggPSB0aGlzLngoKSwgeSA9IHRoaXMueSgpO1xuICAgICAgICBpZiAoY2hhbmdlWCAhPT0gdW5kZWZpbmVkKSB7XG4gICAgICAgICAgICB4ICs9IGNoYW5nZVg7XG4gICAgICAgIH1cbiAgICAgICAgaWYgKGNoYW5nZVkgIT09IHVuZGVmaW5lZCkge1xuICAgICAgICAgICAgeSArPSBjaGFuZ2VZO1xuICAgICAgICB9XG4gICAgICAgIHRoaXMuc2V0UG9zaXRpb24oeyB4OiB4LCB5OiB5IH0pO1xuICAgICAgICByZXR1cm4gdGhpcztcbiAgICB9XG4gICAgX2VhY2hBbmNlc3RvclJldmVyc2UoZnVuYywgdG9wKSB7XG4gICAgICAgIHZhciBmYW1pbHkgPSBbXSwgcGFyZW50ID0gdGhpcy5nZXRQYXJlbnQoKSwgbGVuLCBuO1xuICAgICAgICBpZiAodG9wICYmIHRvcC5faWQgPT09IHRoaXMuX2lkKSB7XG4gICAgICAgICAgICByZXR1cm47XG4gICAgICAgIH1cbiAgICAgICAgZmFtaWx5LnVuc2hpZnQodGhpcyk7XG4gICAgICAgIHdoaWxlIChwYXJlbnQgJiYgKCF0b3AgfHwgcGFyZW50Ll9pZCAhPT0gdG9wLl9pZCkpIHtcbiAgICAgICAgICAgIGZhbWlseS51bnNoaWZ0KHBhcmVudCk7XG4gICAgICAgICAgICBwYXJlbnQgPSBwYXJlbnQucGFyZW50O1xuICAgICAgICB9XG4gICAgICAgIGxlbiA9IGZhbWlseS5sZW5ndGg7XG4gICAgICAgIGZvciAobiA9IDA7IG4gPCBsZW47IG4rKykge1xuICAgICAgICAgICAgZnVuYyhmYW1pbHlbbl0pO1xuICAgICAgICB9XG4gICAgfVxuICAgIHJvdGF0ZSh0aGV0YSkge1xuICAgICAgICB0aGlzLnJvdGF0aW9uKHRoaXMucm90YXRpb24oKSArIHRoZXRhKTtcbiAgICAgICAgcmV0dXJuIHRoaXM7XG4gICAgfVxuICAgIG1vdmVUb1RvcCgpIHtcbiAgICAgICAgaWYgKCF0aGlzLnBhcmVudCkge1xuICAgICAgICAgICAgVXRpbC53YXJuKCdOb2RlIGhhcyBubyBwYXJlbnQuIG1vdmVUb1RvcCBmdW5jdGlvbiBpcyBpZ25vcmVkLicpO1xuICAgICAgICAgICAgcmV0dXJuIGZhbHNlO1xuICAgICAgICB9XG4gICAgICAgIHZhciBpbmRleCA9IHRoaXMuaW5kZXgsIGxlbiA9IHRoaXMucGFyZW50LmdldENoaWxkcmVuKCkubGVuZ3RoO1xuICAgICAgICBpZiAoaW5kZXggPCBsZW4gLSAxKSB7XG4gICAgICAgICAgICB0aGlzLnBhcmVudC5jaGlsZHJlbi5zcGxpY2UoaW5kZXgsIDEpO1xuICAgICAgICAgICAgdGhpcy5wYXJlbnQuY2hpbGRyZW4ucHVzaCh0aGlzKTtcbiAgICAgICAgICAgIHRoaXMucGFyZW50Ll9zZXRDaGlsZHJlbkluZGljZXMoKTtcbiAgICAgICAgICAgIHJldHVybiB0cnVlO1xuICAgICAgICB9XG4gICAgICAgIHJldHVybiBmYWxzZTtcbiAgICB9XG4gICAgbW92ZVVwKCkge1xuICAgICAgICBpZiAoIXRoaXMucGFyZW50KSB7XG4gICAgICAgICAgICBVdGlsLndhcm4oJ05vZGUgaGFzIG5vIHBhcmVudC4gbW92ZVVwIGZ1bmN0aW9uIGlzIGlnbm9yZWQuJyk7XG4gICAgICAgICAgICByZXR1cm4gZmFsc2U7XG4gICAgICAgIH1cbiAgICAgICAgdmFyIGluZGV4ID0gdGhpcy5pbmRleCwgbGVuID0gdGhpcy5wYXJlbnQuZ2V0Q2hpbGRyZW4oKS5sZW5ndGg7XG4gICAgICAgIGlmIChpbmRleCA8IGxlbiAtIDEpIHtcbiAgICAgICAgICAgIHRoaXMucGFyZW50LmNoaWxkcmVuLnNwbGljZShpbmRleCwgMSk7XG4gICAgICAgICAgICB0aGlzLnBhcmVudC5jaGlsZHJlbi5zcGxpY2UoaW5kZXggKyAxLCAwLCB0aGlzKTtcbiAgICAgICAgICAgIHRoaXMucGFyZW50Ll9zZXRDaGlsZHJlbkluZGljZXMoKTtcbiAgICAgICAgICAgIHJldHVybiB0cnVlO1xuICAgICAgICB9XG4gICAgICAgIHJldHVybiBmYWxzZTtcbiAgICB9XG4gICAgbW92ZURvd24oKSB7XG4gICAgICAgIGlmICghdGhpcy5wYXJlbnQpIHtcbiAgICAgICAgICAgIFV0aWwud2FybignTm9kZSBoYXMgbm8gcGFyZW50LiBtb3ZlRG93biBmdW5jdGlvbiBpcyBpZ25vcmVkLicpO1xuICAgICAgICAgICAgcmV0dXJuIGZhbHNlO1xuICAgICAgICB9XG4gICAgICAgIHZhciBpbmRleCA9IHRoaXMuaW5kZXg7XG4gICAgICAgIGlmIChpbmRleCA+IDApIHtcbiAgICAgICAgICAgIHRoaXMucGFyZW50LmNoaWxkcmVuLnNwbGljZShpbmRleCwgMSk7XG4gICAgICAgICAgICB0aGlzLnBhcmVudC5jaGlsZHJlbi5zcGxpY2UoaW5kZXggLSAxLCAwLCB0aGlzKTtcbiAgICAgICAgICAgIHRoaXMucGFyZW50Ll9zZXRDaGlsZHJlbkluZGljZXMoKTtcbiAgICAgICAgICAgIHJldHVybiB0cnVlO1xuICAgICAgICB9XG4gICAgICAgIHJldHVybiBmYWxzZTtcbiAgICB9XG4gICAgbW92ZVRvQm90dG9tKCkge1xuICAgICAgICBpZiAoIXRoaXMucGFyZW50KSB7XG4gICAgICAgICAgICBVdGlsLndhcm4oJ05vZGUgaGFzIG5vIHBhcmVudC4gbW92ZVRvQm90dG9tIGZ1bmN0aW9uIGlzIGlnbm9yZWQuJyk7XG4gICAgICAgICAgICByZXR1cm4gZmFsc2U7XG4gICAgICAgIH1cbiAgICAgICAgdmFyIGluZGV4ID0gdGhpcy5pbmRleDtcbiAgICAgICAgaWYgKGluZGV4ID4gMCkge1xuICAgICAgICAgICAgdGhpcy5wYXJlbnQuY2hpbGRyZW4uc3BsaWNlKGluZGV4LCAxKTtcbiAgICAgICAgICAgIHRoaXMucGFyZW50LmNoaWxkcmVuLnVuc2hpZnQodGhpcyk7XG4gICAgICAgICAgICB0aGlzLnBhcmVudC5fc2V0Q2hpbGRyZW5JbmRpY2VzKCk7XG4gICAgICAgICAgICByZXR1cm4gdHJ1ZTtcbiAgICAgICAgfVxuICAgICAgICByZXR1cm4gZmFsc2U7XG4gICAgfVxuICAgIHNldFpJbmRleCh6SW5kZXgpIHtcbiAgICAgICAgaWYgKCF0aGlzLnBhcmVudCkge1xuICAgICAgICAgICAgVXRpbC53YXJuKCdOb2RlIGhhcyBubyBwYXJlbnQuIHpJbmRleCBwYXJhbWV0ZXIgaXMgaWdub3JlZC4nKTtcbiAgICAgICAgICAgIHJldHVybiB0aGlzO1xuICAgICAgICB9XG4gICAgICAgIGlmICh6SW5kZXggPCAwIHx8IHpJbmRleCA+PSB0aGlzLnBhcmVudC5jaGlsZHJlbi5sZW5ndGgpIHtcbiAgICAgICAgICAgIFV0aWwud2FybignVW5leHBlY3RlZCB2YWx1ZSAnICtcbiAgICAgICAgICAgICAgICB6SW5kZXggK1xuICAgICAgICAgICAgICAgICcgZm9yIHpJbmRleCBwcm9wZXJ0eS4gekluZGV4IGlzIGp1c3QgaW5kZXggb2YgYSBub2RlIGluIGNoaWxkcmVuIG9mIGl0cyBwYXJlbnQuIEV4cGVjdGVkIHZhbHVlIGlzIGZyb20gMCB0byAnICtcbiAgICAgICAgICAgICAgICAodGhpcy5wYXJlbnQuY2hpbGRyZW4ubGVuZ3RoIC0gMSkgK1xuICAgICAgICAgICAgICAgICcuJyk7XG4gICAgICAgIH1cbiAgICAgICAgdmFyIGluZGV4ID0gdGhpcy5pbmRleDtcbiAgICAgICAgdGhpcy5wYXJlbnQuY2hpbGRyZW4uc3BsaWNlKGluZGV4LCAxKTtcbiAgICAgICAgdGhpcy5wYXJlbnQuY2hpbGRyZW4uc3BsaWNlKHpJbmRleCwgMCwgdGhpcyk7XG4gICAgICAgIHRoaXMucGFyZW50Ll9zZXRDaGlsZHJlbkluZGljZXMoKTtcbiAgICAgICAgcmV0dXJuIHRoaXM7XG4gICAgfVxuICAgIGdldEFic29sdXRlT3BhY2l0eSgpIHtcbiAgICAgICAgcmV0dXJuIHRoaXMuX2dldENhY2hlKEFCU09MVVRFX09QQUNJVFksIHRoaXMuX2dldEFic29sdXRlT3BhY2l0eSk7XG4gICAgfVxuICAgIF9nZXRBYnNvbHV0ZU9wYWNpdHkoKSB7XG4gICAgICAgIHZhciBhYnNPcGFjaXR5ID0gdGhpcy5vcGFjaXR5KCk7XG4gICAgICAgIHZhciBwYXJlbnQgPSB0aGlzLmdldFBhcmVudCgpO1xuICAgICAgICBpZiAocGFyZW50ICYmICFwYXJlbnQuX2lzVW5kZXJDYWNoZSkge1xuICAgICAgICAgICAgYWJzT3BhY2l0eSAqPSBwYXJlbnQuZ2V0QWJzb2x1dGVPcGFjaXR5KCk7XG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuIGFic09wYWNpdHk7XG4gICAgfVxuICAgIG1vdmVUbyhuZXdDb250YWluZXIpIHtcbiAgICAgICAgaWYgKHRoaXMuZ2V0UGFyZW50KCkgIT09IG5ld0NvbnRhaW5lcikge1xuICAgICAgICAgICAgdGhpcy5fcmVtb3ZlKCk7XG4gICAgICAgICAgICBuZXdDb250YWluZXIuYWRkKHRoaXMpO1xuICAgICAgICB9XG4gICAgICAgIHJldHVybiB0aGlzO1xuICAgIH1cbiAgICB0b09iamVjdCgpIHtcbiAgICAgICAgdmFyIG9iaiA9IHt9LCBhdHRycyA9IHRoaXMuZ2V0QXR0cnMoKSwga2V5LCB2YWwsIGdldHRlciwgZGVmYXVsdFZhbHVlLCBub25QbGFpbk9iamVjdDtcbiAgICAgICAgb2JqLmF0dHJzID0ge307XG4gICAgICAgIGZvciAoa2V5IGluIGF0dHJzKSB7XG4gICAgICAgICAgICB2YWwgPSBhdHRyc1trZXldO1xuICAgICAgICAgICAgbm9uUGxhaW5PYmplY3QgPVxuICAgICAgICAgICAgICAgIFV0aWwuaXNPYmplY3QodmFsKSAmJiAhVXRpbC5faXNQbGFpbk9iamVjdCh2YWwpICYmICFVdGlsLl9pc0FycmF5KHZhbCk7XG4gICAgICAgICAgICBpZiAobm9uUGxhaW5PYmplY3QpIHtcbiAgICAgICAgICAgICAgICBjb250aW51ZTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGdldHRlciA9IHR5cGVvZiB0aGlzW2tleV0gPT09ICdmdW5jdGlvbicgJiYgdGhpc1trZXldO1xuICAgICAgICAgICAgZGVsZXRlIGF0dHJzW2tleV07XG4gICAgICAgICAgICBkZWZhdWx0VmFsdWUgPSBnZXR0ZXIgPyBnZXR0ZXIuY2FsbCh0aGlzKSA6IG51bGw7XG4gICAgICAgICAgICBhdHRyc1trZXldID0gdmFsO1xuICAgICAgICAgICAgaWYgKGRlZmF1bHRWYWx1ZSAhPT0gdmFsKSB7XG4gICAgICAgICAgICAgICAgb2JqLmF0dHJzW2tleV0gPSB2YWw7XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgICAgb2JqLmNsYXNzTmFtZSA9IHRoaXMuZ2V0Q2xhc3NOYW1lKCk7XG4gICAgICAgIHJldHVybiBVdGlsLl9wcmVwYXJlVG9TdHJpbmdpZnkob2JqKTtcbiAgICB9XG4gICAgdG9KU09OKCkge1xuICAgICAgICByZXR1cm4gSlNPTi5zdHJpbmdpZnkodGhpcy50b09iamVjdCgpKTtcbiAgICB9XG4gICAgZ2V0UGFyZW50KCkge1xuICAgICAgICByZXR1cm4gdGhpcy5wYXJlbnQ7XG4gICAgfVxuICAgIGZpbmRBbmNlc3RvcnMoc2VsZWN0b3IsIGluY2x1ZGVTZWxmLCBzdG9wTm9kZSkge1xuICAgICAgICB2YXIgcmVzID0gW107XG4gICAgICAgIGlmIChpbmNsdWRlU2VsZiAmJiB0aGlzLl9pc01hdGNoKHNlbGVjdG9yKSkge1xuICAgICAgICAgICAgcmVzLnB1c2godGhpcyk7XG4gICAgICAgIH1cbiAgICAgICAgdmFyIGFuY2VzdG9yID0gdGhpcy5wYXJlbnQ7XG4gICAgICAgIHdoaWxlIChhbmNlc3Rvcikge1xuICAgICAgICAgICAgaWYgKGFuY2VzdG9yID09PSBzdG9wTm9kZSkge1xuICAgICAgICAgICAgICAgIHJldHVybiByZXM7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBpZiAoYW5jZXN0b3IuX2lzTWF0Y2goc2VsZWN0b3IpKSB7XG4gICAgICAgICAgICAgICAgcmVzLnB1c2goYW5jZXN0b3IpO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgYW5jZXN0b3IgPSBhbmNlc3Rvci5wYXJlbnQ7XG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuIHJlcztcbiAgICB9XG4gICAgaXNBbmNlc3Rvck9mKG5vZGUpIHtcbiAgICAgICAgcmV0dXJuIGZhbHNlO1xuICAgIH1cbiAgICBmaW5kQW5jZXN0b3Ioc2VsZWN0b3IsIGluY2x1ZGVTZWxmLCBzdG9wTm9kZSkge1xuICAgICAgICByZXR1cm4gdGhpcy5maW5kQW5jZXN0b3JzKHNlbGVjdG9yLCBpbmNsdWRlU2VsZiwgc3RvcE5vZGUpWzBdO1xuICAgIH1cbiAgICBfaXNNYXRjaChzZWxlY3Rvcikge1xuICAgICAgICBpZiAoIXNlbGVjdG9yKSB7XG4gICAgICAgICAgICByZXR1cm4gZmFsc2U7XG4gICAgICAgIH1cbiAgICAgICAgaWYgKHR5cGVvZiBzZWxlY3RvciA9PT0gJ2Z1bmN0aW9uJykge1xuICAgICAgICAgICAgcmV0dXJuIHNlbGVjdG9yKHRoaXMpO1xuICAgICAgICB9XG4gICAgICAgIHZhciBzZWxlY3RvckFyciA9IHNlbGVjdG9yLnJlcGxhY2UoLyAvZywgJycpLnNwbGl0KCcsJyksIGxlbiA9IHNlbGVjdG9yQXJyLmxlbmd0aCwgbiwgc2VsO1xuICAgICAgICBmb3IgKG4gPSAwOyBuIDwgbGVuOyBuKyspIHtcbiAgICAgICAgICAgIHNlbCA9IHNlbGVjdG9yQXJyW25dO1xuICAgICAgICAgICAgaWYgKCFVdGlsLmlzVmFsaWRTZWxlY3RvcihzZWwpKSB7XG4gICAgICAgICAgICAgICAgVXRpbC53YXJuKCdTZWxlY3RvciBcIicgK1xuICAgICAgICAgICAgICAgICAgICBzZWwgK1xuICAgICAgICAgICAgICAgICAgICAnXCIgaXMgaW52YWxpZC4gQWxsb3dlZCBzZWxlY3RvcnMgZXhhbXBsZXMgYXJlIFwiI2Zvb1wiLCBcIi5iYXJcIiBvciBcIkdyb3VwXCIuJyk7XG4gICAgICAgICAgICAgICAgVXRpbC53YXJuKCdJZiB5b3UgaGF2ZSBhIGN1c3RvbSBzaGFwZSB3aXRoIHN1Y2ggY2xhc3NOYW1lLCBwbGVhc2UgY2hhbmdlIGl0IHRvIHN0YXJ0IHdpdGggdXBwZXIgbGV0dGVyIGxpa2UgXCJUcmlhbmdsZVwiLicpO1xuICAgICAgICAgICAgICAgIFV0aWwud2FybignS29udmEgaXMgYXdlc29tZSwgcmlnaHQ/Jyk7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBpZiAoc2VsLmNoYXJBdCgwKSA9PT0gJyMnKSB7XG4gICAgICAgICAgICAgICAgaWYgKHRoaXMuaWQoKSA9PT0gc2VsLnNsaWNlKDEpKSB7XG4gICAgICAgICAgICAgICAgICAgIHJldHVybiB0cnVlO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGVsc2UgaWYgKHNlbC5jaGFyQXQoMCkgPT09ICcuJykge1xuICAgICAgICAgICAgICAgIGlmICh0aGlzLmhhc05hbWUoc2VsLnNsaWNlKDEpKSkge1xuICAgICAgICAgICAgICAgICAgICByZXR1cm4gdHJ1ZTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBlbHNlIGlmICh0aGlzLmNsYXNzTmFtZSA9PT0gc2VsIHx8IHRoaXMubm9kZVR5cGUgPT09IHNlbCkge1xuICAgICAgICAgICAgICAgIHJldHVybiB0cnVlO1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICAgIHJldHVybiBmYWxzZTtcbiAgICB9XG4gICAgZ2V0TGF5ZXIoKSB7XG4gICAgICAgIHZhciBwYXJlbnQgPSB0aGlzLmdldFBhcmVudCgpO1xuICAgICAgICByZXR1cm4gcGFyZW50ID8gcGFyZW50LmdldExheWVyKCkgOiBudWxsO1xuICAgIH1cbiAgICBnZXRTdGFnZSgpIHtcbiAgICAgICAgcmV0dXJuIHRoaXMuX2dldENhY2hlKFNUQUdFLCB0aGlzLl9nZXRTdGFnZSk7XG4gICAgfVxuICAgIF9nZXRTdGFnZSgpIHtcbiAgICAgICAgdmFyIHBhcmVudCA9IHRoaXMuZ2V0UGFyZW50KCk7XG4gICAgICAgIGlmIChwYXJlbnQpIHtcbiAgICAgICAgICAgIHJldHVybiBwYXJlbnQuZ2V0U3RhZ2UoKTtcbiAgICAgICAgfVxuICAgICAgICBlbHNlIHtcbiAgICAgICAgICAgIHJldHVybiB1bmRlZmluZWQ7XG4gICAgICAgIH1cbiAgICB9XG4gICAgZmlyZShldmVudFR5cGUsIGV2dCA9IHt9LCBidWJibGUpIHtcbiAgICAgICAgZXZ0LnRhcmdldCA9IGV2dC50YXJnZXQgfHwgdGhpcztcbiAgICAgICAgaWYgKGJ1YmJsZSkge1xuICAgICAgICAgICAgdGhpcy5fZmlyZUFuZEJ1YmJsZShldmVudFR5cGUsIGV2dCk7XG4gICAgICAgIH1cbiAgICAgICAgZWxzZSB7XG4gICAgICAgICAgICB0aGlzLl9maXJlKGV2ZW50VHlwZSwgZXZ0KTtcbiAgICAgICAgfVxuICAgICAgICByZXR1cm4gdGhpcztcbiAgICB9XG4gICAgZ2V0QWJzb2x1dGVUcmFuc2Zvcm0odG9wKSB7XG4gICAgICAgIGlmICh0b3ApIHtcbiAgICAgICAgICAgIHJldHVybiB0aGlzLl9nZXRBYnNvbHV0ZVRyYW5zZm9ybSh0b3ApO1xuICAgICAgICB9XG4gICAgICAgIGVsc2Uge1xuICAgICAgICAgICAgcmV0dXJuIHRoaXMuX2dldENhY2hlKEFCU09MVVRFX1RSQU5TRk9STSwgdGhpcy5fZ2V0QWJzb2x1dGVUcmFuc2Zvcm0pO1xuICAgICAgICB9XG4gICAgfVxuICAgIF9nZXRBYnNvbHV0ZVRyYW5zZm9ybSh0b3ApIHtcbiAgICAgICAgdmFyIGF0O1xuICAgICAgICBpZiAodG9wKSB7XG4gICAgICAgICAgICBhdCA9IG5ldyBUcmFuc2Zvcm0oKTtcbiAgICAgICAgICAgIHRoaXMuX2VhY2hBbmNlc3RvclJldmVyc2UoZnVuY3Rpb24gKG5vZGUpIHtcbiAgICAgICAgICAgICAgICB2YXIgdHJhbnNmb3Jtc0VuYWJsZWQgPSBub2RlLnRyYW5zZm9ybXNFbmFibGVkKCk7XG4gICAgICAgICAgICAgICAgaWYgKHRyYW5zZm9ybXNFbmFibGVkID09PSAnYWxsJykge1xuICAgICAgICAgICAgICAgICAgICBhdC5tdWx0aXBseShub2RlLmdldFRyYW5zZm9ybSgpKTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgZWxzZSBpZiAodHJhbnNmb3Jtc0VuYWJsZWQgPT09ICdwb3NpdGlvbicpIHtcbiAgICAgICAgICAgICAgICAgICAgYXQudHJhbnNsYXRlKG5vZGUueCgpIC0gbm9kZS5vZmZzZXRYKCksIG5vZGUueSgpIC0gbm9kZS5vZmZzZXRZKCkpO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH0sIHRvcCk7XG4gICAgICAgICAgICByZXR1cm4gYXQ7XG4gICAgICAgIH1cbiAgICAgICAgZWxzZSB7XG4gICAgICAgICAgICBhdCA9IHRoaXMuX2NhY2hlLmdldChBQlNPTFVURV9UUkFOU0ZPUk0pIHx8IG5ldyBUcmFuc2Zvcm0oKTtcbiAgICAgICAgICAgIGlmICh0aGlzLnBhcmVudCkge1xuICAgICAgICAgICAgICAgIHRoaXMucGFyZW50LmdldEFic29sdXRlVHJhbnNmb3JtKCkuY29weUludG8oYXQpO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgZWxzZSB7XG4gICAgICAgICAgICAgICAgYXQucmVzZXQoKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIHZhciB0cmFuc2Zvcm1zRW5hYmxlZCA9IHRoaXMudHJhbnNmb3Jtc0VuYWJsZWQoKTtcbiAgICAgICAgICAgIGlmICh0cmFuc2Zvcm1zRW5hYmxlZCA9PT0gJ2FsbCcpIHtcbiAgICAgICAgICAgICAgICBhdC5tdWx0aXBseSh0aGlzLmdldFRyYW5zZm9ybSgpKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGVsc2UgaWYgKHRyYW5zZm9ybXNFbmFibGVkID09PSAncG9zaXRpb24nKSB7XG4gICAgICAgICAgICAgICAgY29uc3QgeCA9IHRoaXMuYXR0cnMueCB8fCAwO1xuICAgICAgICAgICAgICAgIGNvbnN0IHkgPSB0aGlzLmF0dHJzLnkgfHwgMDtcbiAgICAgICAgICAgICAgICBjb25zdCBvZmZzZXRYID0gdGhpcy5hdHRycy5vZmZzZXRYIHx8IDA7XG4gICAgICAgICAgICAgICAgY29uc3Qgb2Zmc2V0WSA9IHRoaXMuYXR0cnMub2Zmc2V0WSB8fCAwO1xuICAgICAgICAgICAgICAgIGF0LnRyYW5zbGF0ZSh4IC0gb2Zmc2V0WCwgeSAtIG9mZnNldFkpO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgYXQuZGlydHkgPSBmYWxzZTtcbiAgICAgICAgICAgIHJldHVybiBhdDtcbiAgICAgICAgfVxuICAgIH1cbiAgICBnZXRBYnNvbHV0ZVNjYWxlKHRvcCkge1xuICAgICAgICB2YXIgcGFyZW50ID0gdGhpcztcbiAgICAgICAgd2hpbGUgKHBhcmVudCkge1xuICAgICAgICAgICAgaWYgKHBhcmVudC5faXNVbmRlckNhY2hlKSB7XG4gICAgICAgICAgICAgICAgdG9wID0gcGFyZW50O1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgcGFyZW50ID0gcGFyZW50LmdldFBhcmVudCgpO1xuICAgICAgICB9XG4gICAgICAgIGNvbnN0IHRyYW5zZm9ybSA9IHRoaXMuZ2V0QWJzb2x1dGVUcmFuc2Zvcm0odG9wKTtcbiAgICAgICAgY29uc3QgYXR0cnMgPSB0cmFuc2Zvcm0uZGVjb21wb3NlKCk7XG4gICAgICAgIHJldHVybiB7XG4gICAgICAgICAgICB4OiBhdHRycy5zY2FsZVgsXG4gICAgICAgICAgICB5OiBhdHRycy5zY2FsZVksXG4gICAgICAgIH07XG4gICAgfVxuICAgIGdldEFic29sdXRlUm90YXRpb24oKSB7XG4gICAgICAgIHJldHVybiB0aGlzLmdldEFic29sdXRlVHJhbnNmb3JtKCkuZGVjb21wb3NlKCkucm90YXRpb247XG4gICAgfVxuICAgIGdldFRyYW5zZm9ybSgpIHtcbiAgICAgICAgcmV0dXJuIHRoaXMuX2dldENhY2hlKFRSQU5TRk9STSwgdGhpcy5fZ2V0VHJhbnNmb3JtKTtcbiAgICB9XG4gICAgX2dldFRyYW5zZm9ybSgpIHtcbiAgICAgICAgdmFyIF9hLCBfYjtcbiAgICAgICAgdmFyIG0gPSB0aGlzLl9jYWNoZS5nZXQoVFJBTlNGT1JNKSB8fCBuZXcgVHJhbnNmb3JtKCk7XG4gICAgICAgIG0ucmVzZXQoKTtcbiAgICAgICAgdmFyIHggPSB0aGlzLngoKSwgeSA9IHRoaXMueSgpLCByb3RhdGlvbiA9IEtvbnZhLmdldEFuZ2xlKHRoaXMucm90YXRpb24oKSksIHNjYWxlWCA9IChfYSA9IHRoaXMuYXR0cnMuc2NhbGVYKSAhPT0gbnVsbCAmJiBfYSAhPT0gdm9pZCAwID8gX2EgOiAxLCBzY2FsZVkgPSAoX2IgPSB0aGlzLmF0dHJzLnNjYWxlWSkgIT09IG51bGwgJiYgX2IgIT09IHZvaWQgMCA/IF9iIDogMSwgc2tld1ggPSB0aGlzLmF0dHJzLnNrZXdYIHx8IDAsIHNrZXdZID0gdGhpcy5hdHRycy5za2V3WSB8fCAwLCBvZmZzZXRYID0gdGhpcy5hdHRycy5vZmZzZXRYIHx8IDAsIG9mZnNldFkgPSB0aGlzLmF0dHJzLm9mZnNldFkgfHwgMDtcbiAgICAgICAgaWYgKHggIT09IDAgfHwgeSAhPT0gMCkge1xuICAgICAgICAgICAgbS50cmFuc2xhdGUoeCwgeSk7XG4gICAgICAgIH1cbiAgICAgICAgaWYgKHJvdGF0aW9uICE9PSAwKSB7XG4gICAgICAgICAgICBtLnJvdGF0ZShyb3RhdGlvbik7XG4gICAgICAgIH1cbiAgICAgICAgaWYgKHNrZXdYICE9PSAwIHx8IHNrZXdZICE9PSAwKSB7XG4gICAgICAgICAgICBtLnNrZXcoc2tld1gsIHNrZXdZKTtcbiAgICAgICAgfVxuICAgICAgICBpZiAoc2NhbGVYICE9PSAxIHx8IHNjYWxlWSAhPT0gMSkge1xuICAgICAgICAgICAgbS5zY2FsZShzY2FsZVgsIHNjYWxlWSk7XG4gICAgICAgIH1cbiAgICAgICAgaWYgKG9mZnNldFggIT09IDAgfHwgb2Zmc2V0WSAhPT0gMCkge1xuICAgICAgICAgICAgbS50cmFuc2xhdGUoLTEgKiBvZmZzZXRYLCAtMSAqIG9mZnNldFkpO1xuICAgICAgICB9XG4gICAgICAgIG0uZGlydHkgPSBmYWxzZTtcbiAgICAgICAgcmV0dXJuIG07XG4gICAgfVxuICAgIGNsb25lKG9iaikge1xuICAgICAgICB2YXIgYXR0cnMgPSBVdGlsLmNsb25lT2JqZWN0KHRoaXMuYXR0cnMpLCBrZXksIGFsbExpc3RlbmVycywgbGVuLCBuLCBsaXN0ZW5lcjtcbiAgICAgICAgZm9yIChrZXkgaW4gb2JqKSB7XG4gICAgICAgICAgICBhdHRyc1trZXldID0gb2JqW2tleV07XG4gICAgICAgIH1cbiAgICAgICAgdmFyIG5vZGUgPSBuZXcgdGhpcy5jb25zdHJ1Y3RvcihhdHRycyk7XG4gICAgICAgIGZvciAoa2V5IGluIHRoaXMuZXZlbnRMaXN0ZW5lcnMpIHtcbiAgICAgICAgICAgIGFsbExpc3RlbmVycyA9IHRoaXMuZXZlbnRMaXN0ZW5lcnNba2V5XTtcbiAgICAgICAgICAgIGxlbiA9IGFsbExpc3RlbmVycy5sZW5ndGg7XG4gICAgICAgICAgICBmb3IgKG4gPSAwOyBuIDwgbGVuOyBuKyspIHtcbiAgICAgICAgICAgICAgICBsaXN0ZW5lciA9IGFsbExpc3RlbmVyc1tuXTtcbiAgICAgICAgICAgICAgICBpZiAobGlzdGVuZXIubmFtZS5pbmRleE9mKEtPTlZBKSA8IDApIHtcbiAgICAgICAgICAgICAgICAgICAgaWYgKCFub2RlLmV2ZW50TGlzdGVuZXJzW2tleV0pIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIG5vZGUuZXZlbnRMaXN0ZW5lcnNba2V5XSA9IFtdO1xuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgIG5vZGUuZXZlbnRMaXN0ZW5lcnNba2V5XS5wdXNoKGxpc3RlbmVyKTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuIG5vZGU7XG4gICAgfVxuICAgIF90b0tvbnZhQ2FudmFzKGNvbmZpZykge1xuICAgICAgICBjb25maWcgPSBjb25maWcgfHwge307XG4gICAgICAgIHZhciBib3ggPSB0aGlzLmdldENsaWVudFJlY3QoKTtcbiAgICAgICAgdmFyIHN0YWdlID0gdGhpcy5nZXRTdGFnZSgpLCB4ID0gY29uZmlnLnggIT09IHVuZGVmaW5lZCA/IGNvbmZpZy54IDogTWF0aC5mbG9vcihib3gueCksIHkgPSBjb25maWcueSAhPT0gdW5kZWZpbmVkID8gY29uZmlnLnkgOiBNYXRoLmZsb29yKGJveC55KSwgcGl4ZWxSYXRpbyA9IGNvbmZpZy5waXhlbFJhdGlvIHx8IDEsIGNhbnZhcyA9IG5ldyBTY2VuZUNhbnZhcyh7XG4gICAgICAgICAgICB3aWR0aDogY29uZmlnLndpZHRoIHx8IE1hdGguY2VpbChib3gud2lkdGgpIHx8IChzdGFnZSA/IHN0YWdlLndpZHRoKCkgOiAwKSxcbiAgICAgICAgICAgIGhlaWdodDogY29uZmlnLmhlaWdodCB8fFxuICAgICAgICAgICAgICAgIE1hdGguY2VpbChib3guaGVpZ2h0KSB8fFxuICAgICAgICAgICAgICAgIChzdGFnZSA/IHN0YWdlLmhlaWdodCgpIDogMCksXG4gICAgICAgICAgICBwaXhlbFJhdGlvOiBwaXhlbFJhdGlvLFxuICAgICAgICB9KSwgY29udGV4dCA9IGNhbnZhcy5nZXRDb250ZXh0KCk7XG4gICAgICAgIGlmIChjb25maWcuaW1hZ2VTbW9vdGhpbmdFbmFibGVkID09PSBmYWxzZSkge1xuICAgICAgICAgICAgY29udGV4dC5fY29udGV4dC5pbWFnZVNtb290aGluZ0VuYWJsZWQgPSBmYWxzZTtcbiAgICAgICAgfVxuICAgICAgICBjb250ZXh0LnNhdmUoKTtcbiAgICAgICAgaWYgKHggfHwgeSkge1xuICAgICAgICAgICAgY29udGV4dC50cmFuc2xhdGUoLTEgKiB4LCAtMSAqIHkpO1xuICAgICAgICB9XG4gICAgICAgIHRoaXMuZHJhd1NjZW5lKGNhbnZhcyk7XG4gICAgICAgIGNvbnRleHQucmVzdG9yZSgpO1xuICAgICAgICByZXR1cm4gY2FudmFzO1xuICAgIH1cbiAgICB0b0NhbnZhcyhjb25maWcpIHtcbiAgICAgICAgcmV0dXJuIHRoaXMuX3RvS29udmFDYW52YXMoY29uZmlnKS5fY2FudmFzO1xuICAgIH1cbiAgICB0b0RhdGFVUkwoY29uZmlnKSB7XG4gICAgICAgIGNvbmZpZyA9IGNvbmZpZyB8fCB7fTtcbiAgICAgICAgdmFyIG1pbWVUeXBlID0gY29uZmlnLm1pbWVUeXBlIHx8IG51bGwsIHF1YWxpdHkgPSBjb25maWcucXVhbGl0eSB8fCBudWxsO1xuICAgICAgICB2YXIgdXJsID0gdGhpcy5fdG9Lb252YUNhbnZhcyhjb25maWcpLnRvRGF0YVVSTChtaW1lVHlwZSwgcXVhbGl0eSk7XG4gICAgICAgIGlmIChjb25maWcuY2FsbGJhY2spIHtcbiAgICAgICAgICAgIGNvbmZpZy5jYWxsYmFjayh1cmwpO1xuICAgICAgICB9XG4gICAgICAgIHJldHVybiB1cmw7XG4gICAgfVxuICAgIHRvSW1hZ2UoY29uZmlnKSB7XG4gICAgICAgIHJldHVybiBuZXcgUHJvbWlzZSgocmVzb2x2ZSwgcmVqZWN0KSA9PiB7XG4gICAgICAgICAgICB0cnkge1xuICAgICAgICAgICAgICAgIGNvbnN0IGNhbGxiYWNrID0gY29uZmlnID09PSBudWxsIHx8IGNvbmZpZyA9PT0gdm9pZCAwID8gdm9pZCAwIDogY29uZmlnLmNhbGxiYWNrO1xuICAgICAgICAgICAgICAgIGlmIChjYWxsYmFjaylcbiAgICAgICAgICAgICAgICAgICAgZGVsZXRlIGNvbmZpZy5jYWxsYmFjaztcbiAgICAgICAgICAgICAgICBVdGlsLl91cmxUb0ltYWdlKHRoaXMudG9EYXRhVVJMKGNvbmZpZyksIGZ1bmN0aW9uIChpbWcpIHtcbiAgICAgICAgICAgICAgICAgICAgcmVzb2x2ZShpbWcpO1xuICAgICAgICAgICAgICAgICAgICBjYWxsYmFjayA9PT0gbnVsbCB8fCBjYWxsYmFjayA9PT0gdm9pZCAwID8gdm9pZCAwIDogY2FsbGJhY2soaW1nKTtcbiAgICAgICAgICAgICAgICB9KTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGNhdGNoIChlcnIpIHtcbiAgICAgICAgICAgICAgICByZWplY3QoZXJyKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfSk7XG4gICAgfVxuICAgIHRvQmxvYihjb25maWcpIHtcbiAgICAgICAgcmV0dXJuIG5ldyBQcm9taXNlKChyZXNvbHZlLCByZWplY3QpID0+IHtcbiAgICAgICAgICAgIHRyeSB7XG4gICAgICAgICAgICAgICAgY29uc3QgY2FsbGJhY2sgPSBjb25maWcgPT09IG51bGwgfHwgY29uZmlnID09PSB2b2lkIDAgPyB2b2lkIDAgOiBjb25maWcuY2FsbGJhY2s7XG4gICAgICAgICAgICAgICAgaWYgKGNhbGxiYWNrKVxuICAgICAgICAgICAgICAgICAgICBkZWxldGUgY29uZmlnLmNhbGxiYWNrO1xuICAgICAgICAgICAgICAgIHRoaXMudG9DYW52YXMoY29uZmlnKS50b0Jsb2IoKGJsb2IpID0+IHtcbiAgICAgICAgICAgICAgICAgICAgcmVzb2x2ZShibG9iKTtcbiAgICAgICAgICAgICAgICAgICAgY2FsbGJhY2sgPT09IG51bGwgfHwgY2FsbGJhY2sgPT09IHZvaWQgMCA/IHZvaWQgMCA6IGNhbGxiYWNrKGJsb2IpO1xuICAgICAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgY2F0Y2ggKGVycikge1xuICAgICAgICAgICAgICAgIHJlamVjdChlcnIpO1xuICAgICAgICAgICAgfVxuICAgICAgICB9KTtcbiAgICB9XG4gICAgc2V0U2l6ZShzaXplKSB7XG4gICAgICAgIHRoaXMud2lkdGgoc2l6ZS53aWR0aCk7XG4gICAgICAgIHRoaXMuaGVpZ2h0KHNpemUuaGVpZ2h0KTtcbiAgICAgICAgcmV0dXJuIHRoaXM7XG4gICAgfVxuICAgIGdldFNpemUoKSB7XG4gICAgICAgIHJldHVybiB7XG4gICAgICAgICAgICB3aWR0aDogdGhpcy53aWR0aCgpLFxuICAgICAgICAgICAgaGVpZ2h0OiB0aGlzLmhlaWdodCgpLFxuICAgICAgICB9O1xuICAgIH1cbiAgICBnZXRDbGFzc05hbWUoKSB7XG4gICAgICAgIHJldHVybiB0aGlzLmNsYXNzTmFtZSB8fCB0aGlzLm5vZGVUeXBlO1xuICAgIH1cbiAgICBnZXRUeXBlKCkge1xuICAgICAgICByZXR1cm4gdGhpcy5ub2RlVHlwZTtcbiAgICB9XG4gICAgZ2V0RHJhZ0Rpc3RhbmNlKCkge1xuICAgICAgICBpZiAodGhpcy5hdHRycy5kcmFnRGlzdGFuY2UgIT09IHVuZGVmaW5lZCkge1xuICAgICAgICAgICAgcmV0dXJuIHRoaXMuYXR0cnMuZHJhZ0Rpc3RhbmNlO1xuICAgICAgICB9XG4gICAgICAgIGVsc2UgaWYgKHRoaXMucGFyZW50KSB7XG4gICAgICAgICAgICByZXR1cm4gdGhpcy5wYXJlbnQuZ2V0RHJhZ0Rpc3RhbmNlKCk7XG4gICAgICAgIH1cbiAgICAgICAgZWxzZSB7XG4gICAgICAgICAgICByZXR1cm4gS29udmEuZHJhZ0Rpc3RhbmNlO1xuICAgICAgICB9XG4gICAgfVxuICAgIF9vZmYodHlwZSwgbmFtZSwgY2FsbGJhY2spIHtcbiAgICAgICAgdmFyIGV2dExpc3RlbmVycyA9IHRoaXMuZXZlbnRMaXN0ZW5lcnNbdHlwZV0sIGksIGV2dE5hbWUsIGhhbmRsZXI7XG4gICAgICAgIGZvciAoaSA9IDA7IGkgPCBldnRMaXN0ZW5lcnMubGVuZ3RoOyBpKyspIHtcbiAgICAgICAgICAgIGV2dE5hbWUgPSBldnRMaXN0ZW5lcnNbaV0ubmFtZTtcbiAgICAgICAgICAgIGhhbmRsZXIgPSBldnRMaXN0ZW5lcnNbaV0uaGFuZGxlcjtcbiAgICAgICAgICAgIGlmICgoZXZ0TmFtZSAhPT0gJ2tvbnZhJyB8fCBuYW1lID09PSAna29udmEnKSAmJlxuICAgICAgICAgICAgICAgICghbmFtZSB8fCBldnROYW1lID09PSBuYW1lKSAmJlxuICAgICAgICAgICAgICAgICghY2FsbGJhY2sgfHwgY2FsbGJhY2sgPT09IGhhbmRsZXIpKSB7XG4gICAgICAgICAgICAgICAgZXZ0TGlzdGVuZXJzLnNwbGljZShpLCAxKTtcbiAgICAgICAgICAgICAgICBpZiAoZXZ0TGlzdGVuZXJzLmxlbmd0aCA9PT0gMCkge1xuICAgICAgICAgICAgICAgICAgICBkZWxldGUgdGhpcy5ldmVudExpc3RlbmVyc1t0eXBlXTtcbiAgICAgICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIGktLTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgIH1cbiAgICBfZmlyZUNoYW5nZUV2ZW50KGF0dHIsIG9sZFZhbCwgbmV3VmFsKSB7XG4gICAgICAgIHRoaXMuX2ZpcmUoYXR0ciArIENIQU5HRSwge1xuICAgICAgICAgICAgb2xkVmFsOiBvbGRWYWwsXG4gICAgICAgICAgICBuZXdWYWw6IG5ld1ZhbCxcbiAgICAgICAgfSk7XG4gICAgfVxuICAgIGFkZE5hbWUobmFtZSkge1xuICAgICAgICBpZiAoIXRoaXMuaGFzTmFtZShuYW1lKSkge1xuICAgICAgICAgICAgdmFyIG9sZE5hbWUgPSB0aGlzLm5hbWUoKTtcbiAgICAgICAgICAgIHZhciBuZXdOYW1lID0gb2xkTmFtZSA/IG9sZE5hbWUgKyAnICcgKyBuYW1lIDogbmFtZTtcbiAgICAgICAgICAgIHRoaXMubmFtZShuZXdOYW1lKTtcbiAgICAgICAgfVxuICAgICAgICByZXR1cm4gdGhpcztcbiAgICB9XG4gICAgaGFzTmFtZShuYW1lKSB7XG4gICAgICAgIGlmICghbmFtZSkge1xuICAgICAgICAgICAgcmV0dXJuIGZhbHNlO1xuICAgICAgICB9XG4gICAgICAgIGNvbnN0IGZ1bGxOYW1lID0gdGhpcy5uYW1lKCk7XG4gICAgICAgIGlmICghZnVsbE5hbWUpIHtcbiAgICAgICAgICAgIHJldHVybiBmYWxzZTtcbiAgICAgICAgfVxuICAgICAgICB2YXIgbmFtZXMgPSAoZnVsbE5hbWUgfHwgJycpLnNwbGl0KC9cXHMvZyk7XG4gICAgICAgIHJldHVybiBuYW1lcy5pbmRleE9mKG5hbWUpICE9PSAtMTtcbiAgICB9XG4gICAgcmVtb3ZlTmFtZShuYW1lKSB7XG4gICAgICAgIHZhciBuYW1lcyA9ICh0aGlzLm5hbWUoKSB8fCAnJykuc3BsaXQoL1xccy9nKTtcbiAgICAgICAgdmFyIGluZGV4ID0gbmFtZXMuaW5kZXhPZihuYW1lKTtcbiAgICAgICAgaWYgKGluZGV4ICE9PSAtMSkge1xuICAgICAgICAgICAgbmFtZXMuc3BsaWNlKGluZGV4LCAxKTtcbiAgICAgICAgICAgIHRoaXMubmFtZShuYW1lcy5qb2luKCcgJykpO1xuICAgICAgICB9XG4gICAgICAgIHJldHVybiB0aGlzO1xuICAgIH1cbiAgICBzZXRBdHRyKGF0dHIsIHZhbCkge1xuICAgICAgICB2YXIgZnVuYyA9IHRoaXNbU0VUICsgVXRpbC5fY2FwaXRhbGl6ZShhdHRyKV07XG4gICAgICAgIGlmIChVdGlsLl9pc0Z1bmN0aW9uKGZ1bmMpKSB7XG4gICAgICAgICAgICBmdW5jLmNhbGwodGhpcywgdmFsKTtcbiAgICAgICAgfVxuICAgICAgICBlbHNlIHtcbiAgICAgICAgICAgIHRoaXMuX3NldEF0dHIoYXR0ciwgdmFsKTtcbiAgICAgICAgfVxuICAgICAgICByZXR1cm4gdGhpcztcbiAgICB9XG4gICAgX3JlcXVlc3REcmF3KCkge1xuICAgICAgICBpZiAoS29udmEuYXV0b0RyYXdFbmFibGVkKSB7XG4gICAgICAgICAgICBjb25zdCBkcmF3Tm9kZSA9IHRoaXMuZ2V0TGF5ZXIoKSB8fCB0aGlzLmdldFN0YWdlKCk7XG4gICAgICAgICAgICBkcmF3Tm9kZSA9PT0gbnVsbCB8fCBkcmF3Tm9kZSA9PT0gdm9pZCAwID8gdm9pZCAwIDogZHJhd05vZGUuYmF0Y2hEcmF3KCk7XG4gICAgICAgIH1cbiAgICB9XG4gICAgX3NldEF0dHIoa2V5LCB2YWwpIHtcbiAgICAgICAgdmFyIG9sZFZhbCA9IHRoaXMuYXR0cnNba2V5XTtcbiAgICAgICAgaWYgKG9sZFZhbCA9PT0gdmFsICYmICFVdGlsLmlzT2JqZWN0KHZhbCkpIHtcbiAgICAgICAgICAgIHJldHVybjtcbiAgICAgICAgfVxuICAgICAgICBpZiAodmFsID09PSB1bmRlZmluZWQgfHwgdmFsID09PSBudWxsKSB7XG4gICAgICAgICAgICBkZWxldGUgdGhpcy5hdHRyc1trZXldO1xuICAgICAgICB9XG4gICAgICAgIGVsc2Uge1xuICAgICAgICAgICAgdGhpcy5hdHRyc1trZXldID0gdmFsO1xuICAgICAgICB9XG4gICAgICAgIGlmICh0aGlzLl9zaG91bGRGaXJlQ2hhbmdlRXZlbnRzKSB7XG4gICAgICAgICAgICB0aGlzLl9maXJlQ2hhbmdlRXZlbnQoa2V5LCBvbGRWYWwsIHZhbCk7XG4gICAgICAgIH1cbiAgICAgICAgdGhpcy5fcmVxdWVzdERyYXcoKTtcbiAgICB9XG4gICAgX3NldENvbXBvbmVudEF0dHIoa2V5LCBjb21wb25lbnQsIHZhbCkge1xuICAgICAgICB2YXIgb2xkVmFsO1xuICAgICAgICBpZiAodmFsICE9PSB1bmRlZmluZWQpIHtcbiAgICAgICAgICAgIG9sZFZhbCA9IHRoaXMuYXR0cnNba2V5XTtcbiAgICAgICAgICAgIGlmICghb2xkVmFsKSB7XG4gICAgICAgICAgICAgICAgdGhpcy5hdHRyc1trZXldID0gdGhpcy5nZXRBdHRyKGtleSk7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICB0aGlzLmF0dHJzW2tleV1bY29tcG9uZW50XSA9IHZhbDtcbiAgICAgICAgICAgIHRoaXMuX2ZpcmVDaGFuZ2VFdmVudChrZXksIG9sZFZhbCwgdmFsKTtcbiAgICAgICAgfVxuICAgIH1cbiAgICBfZmlyZUFuZEJ1YmJsZShldmVudFR5cGUsIGV2dCwgY29tcGFyZVNoYXBlKSB7XG4gICAgICAgIGlmIChldnQgJiYgdGhpcy5ub2RlVHlwZSA9PT0gU0hBUEUpIHtcbiAgICAgICAgICAgIGV2dC50YXJnZXQgPSB0aGlzO1xuICAgICAgICB9XG4gICAgICAgIHZhciBzaG91bGRTdG9wID0gKGV2ZW50VHlwZSA9PT0gTU9VU0VFTlRFUiB8fCBldmVudFR5cGUgPT09IE1PVVNFTEVBVkUpICYmXG4gICAgICAgICAgICAoKGNvbXBhcmVTaGFwZSAmJlxuICAgICAgICAgICAgICAgICh0aGlzID09PSBjb21wYXJlU2hhcGUgfHxcbiAgICAgICAgICAgICAgICAgICAgKHRoaXMuaXNBbmNlc3Rvck9mICYmIHRoaXMuaXNBbmNlc3Rvck9mKGNvbXBhcmVTaGFwZSkpKSkgfHxcbiAgICAgICAgICAgICAgICAodGhpcy5ub2RlVHlwZSA9PT0gJ1N0YWdlJyAmJiAhY29tcGFyZVNoYXBlKSk7XG4gICAgICAgIGlmICghc2hvdWxkU3RvcCkge1xuICAgICAgICAgICAgdGhpcy5fZmlyZShldmVudFR5cGUsIGV2dCk7XG4gICAgICAgICAgICB2YXIgc3RvcEJ1YmJsZSA9IChldmVudFR5cGUgPT09IE1PVVNFRU5URVIgfHwgZXZlbnRUeXBlID09PSBNT1VTRUxFQVZFKSAmJlxuICAgICAgICAgICAgICAgIGNvbXBhcmVTaGFwZSAmJlxuICAgICAgICAgICAgICAgIGNvbXBhcmVTaGFwZS5pc0FuY2VzdG9yT2YgJiZcbiAgICAgICAgICAgICAgICBjb21wYXJlU2hhcGUuaXNBbmNlc3Rvck9mKHRoaXMpICYmXG4gICAgICAgICAgICAgICAgIWNvbXBhcmVTaGFwZS5pc0FuY2VzdG9yT2YodGhpcy5wYXJlbnQpO1xuICAgICAgICAgICAgaWYgKCgoZXZ0ICYmICFldnQuY2FuY2VsQnViYmxlKSB8fCAhZXZ0KSAmJlxuICAgICAgICAgICAgICAgIHRoaXMucGFyZW50ICYmXG4gICAgICAgICAgICAgICAgdGhpcy5wYXJlbnQuaXNMaXN0ZW5pbmcoKSAmJlxuICAgICAgICAgICAgICAgICFzdG9wQnViYmxlKSB7XG4gICAgICAgICAgICAgICAgaWYgKGNvbXBhcmVTaGFwZSAmJiBjb21wYXJlU2hhcGUucGFyZW50KSB7XG4gICAgICAgICAgICAgICAgICAgIHRoaXMuX2ZpcmVBbmRCdWJibGUuY2FsbCh0aGlzLnBhcmVudCwgZXZlbnRUeXBlLCBldnQsIGNvbXBhcmVTaGFwZSk7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIGVsc2Uge1xuICAgICAgICAgICAgICAgICAgICB0aGlzLl9maXJlQW5kQnViYmxlLmNhbGwodGhpcy5wYXJlbnQsIGV2ZW50VHlwZSwgZXZ0KTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICB9XG4gICAgX2dldFByb3RvTGlzdGVuZXJzKGV2ZW50VHlwZSkge1xuICAgICAgICBsZXQgbGlzdGVuZXJzID0gdGhpcy5fY2FjaGUuZ2V0KEFMTF9MSVNURU5FUlMpO1xuICAgICAgICBpZiAoIWxpc3RlbmVycykge1xuICAgICAgICAgICAgbGlzdGVuZXJzID0ge307XG4gICAgICAgICAgICBsZXQgb2JqID0gT2JqZWN0LmdldFByb3RvdHlwZU9mKHRoaXMpO1xuICAgICAgICAgICAgd2hpbGUgKG9iaikge1xuICAgICAgICAgICAgICAgIGlmICghb2JqLmV2ZW50TGlzdGVuZXJzKSB7XG4gICAgICAgICAgICAgICAgICAgIG9iaiA9IE9iamVjdC5nZXRQcm90b3R5cGVPZihvYmopO1xuICAgICAgICAgICAgICAgICAgICBjb250aW51ZTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgZm9yICh2YXIgZXZlbnQgaW4gb2JqLmV2ZW50TGlzdGVuZXJzKSB7XG4gICAgICAgICAgICAgICAgICAgIGNvbnN0IG5ld0V2ZW50cyA9IG9iai5ldmVudExpc3RlbmVyc1tldmVudF07XG4gICAgICAgICAgICAgICAgICAgIGNvbnN0IG9sZEV2ZW50cyA9IGxpc3RlbmVyc1tldmVudF0gfHwgW107XG4gICAgICAgICAgICAgICAgICAgIGxpc3RlbmVyc1tldmVudF0gPSBuZXdFdmVudHMuY29uY2F0KG9sZEV2ZW50cyk7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIG9iaiA9IE9iamVjdC5nZXRQcm90b3R5cGVPZihvYmopO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgdGhpcy5fY2FjaGUuc2V0KEFMTF9MSVNURU5FUlMsIGxpc3RlbmVycyk7XG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuIGxpc3RlbmVyc1tldmVudFR5cGVdO1xuICAgIH1cbiAgICBfZmlyZShldmVudFR5cGUsIGV2dCkge1xuICAgICAgICBldnQgPSBldnQgfHwge307XG4gICAgICAgIGV2dC5jdXJyZW50VGFyZ2V0ID0gdGhpcztcbiAgICAgICAgZXZ0LnR5cGUgPSBldmVudFR5cGU7XG4gICAgICAgIGNvbnN0IHRvcExpc3RlbmVycyA9IHRoaXMuX2dldFByb3RvTGlzdGVuZXJzKGV2ZW50VHlwZSk7XG4gICAgICAgIGlmICh0b3BMaXN0ZW5lcnMpIHtcbiAgICAgICAgICAgIGZvciAodmFyIGkgPSAwOyBpIDwgdG9wTGlzdGVuZXJzLmxlbmd0aDsgaSsrKSB7XG4gICAgICAgICAgICAgICAgdG9wTGlzdGVuZXJzW2ldLmhhbmRsZXIuY2FsbCh0aGlzLCBldnQpO1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICAgIGNvbnN0IHNlbGZMaXN0ZW5lcnMgPSB0aGlzLmV2ZW50TGlzdGVuZXJzW2V2ZW50VHlwZV07XG4gICAgICAgIGlmIChzZWxmTGlzdGVuZXJzKSB7XG4gICAgICAgICAgICBmb3IgKHZhciBpID0gMDsgaSA8IHNlbGZMaXN0ZW5lcnMubGVuZ3RoOyBpKyspIHtcbiAgICAgICAgICAgICAgICBzZWxmTGlzdGVuZXJzW2ldLmhhbmRsZXIuY2FsbCh0aGlzLCBldnQpO1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgfVxuICAgIGRyYXcoKSB7XG4gICAgICAgIHRoaXMuZHJhd1NjZW5lKCk7XG4gICAgICAgIHRoaXMuZHJhd0hpdCgpO1xuICAgICAgICByZXR1cm4gdGhpcztcbiAgICB9XG4gICAgX2NyZWF0ZURyYWdFbGVtZW50KGV2dCkge1xuICAgICAgICB2YXIgcG9pbnRlcklkID0gZXZ0ID8gZXZ0LnBvaW50ZXJJZCA6IHVuZGVmaW5lZDtcbiAgICAgICAgdmFyIHN0YWdlID0gdGhpcy5nZXRTdGFnZSgpO1xuICAgICAgICB2YXIgYXAgPSB0aGlzLmdldEFic29sdXRlUG9zaXRpb24oKTtcbiAgICAgICAgdmFyIHBvcyA9IHN0YWdlLl9nZXRQb2ludGVyQnlJZChwb2ludGVySWQpIHx8XG4gICAgICAgICAgICBzdGFnZS5fY2hhbmdlZFBvaW50ZXJQb3NpdGlvbnNbMF0gfHxcbiAgICAgICAgICAgIGFwO1xuICAgICAgICBERC5fZHJhZ0VsZW1lbnRzLnNldCh0aGlzLl9pZCwge1xuICAgICAgICAgICAgbm9kZTogdGhpcyxcbiAgICAgICAgICAgIHN0YXJ0UG9pbnRlclBvczogcG9zLFxuICAgICAgICAgICAgb2Zmc2V0OiB7XG4gICAgICAgICAgICAgICAgeDogcG9zLnggLSBhcC54LFxuICAgICAgICAgICAgICAgIHk6IHBvcy55IC0gYXAueSxcbiAgICAgICAgICAgIH0sXG4gICAgICAgICAgICBkcmFnU3RhdHVzOiAncmVhZHknLFxuICAgICAgICAgICAgcG9pbnRlcklkLFxuICAgICAgICB9KTtcbiAgICB9XG4gICAgc3RhcnREcmFnKGV2dCwgYnViYmxlRXZlbnQgPSB0cnVlKSB7XG4gICAgICAgIGlmICghREQuX2RyYWdFbGVtZW50cy5oYXModGhpcy5faWQpKSB7XG4gICAgICAgICAgICB0aGlzLl9jcmVhdGVEcmFnRWxlbWVudChldnQpO1xuICAgICAgICB9XG4gICAgICAgIGNvbnN0IGVsZW0gPSBERC5fZHJhZ0VsZW1lbnRzLmdldCh0aGlzLl9pZCk7XG4gICAgICAgIGVsZW0uZHJhZ1N0YXR1cyA9ICdkcmFnZ2luZyc7XG4gICAgICAgIHRoaXMuZmlyZSgnZHJhZ3N0YXJ0Jywge1xuICAgICAgICAgICAgdHlwZTogJ2RyYWdzdGFydCcsXG4gICAgICAgICAgICB0YXJnZXQ6IHRoaXMsXG4gICAgICAgICAgICBldnQ6IGV2dCAmJiBldnQuZXZ0LFxuICAgICAgICB9LCBidWJibGVFdmVudCk7XG4gICAgfVxuICAgIF9zZXREcmFnUG9zaXRpb24oZXZ0LCBlbGVtKSB7XG4gICAgICAgIGNvbnN0IHBvcyA9IHRoaXMuZ2V0U3RhZ2UoKS5fZ2V0UG9pbnRlckJ5SWQoZWxlbS5wb2ludGVySWQpO1xuICAgICAgICBpZiAoIXBvcykge1xuICAgICAgICAgICAgcmV0dXJuO1xuICAgICAgICB9XG4gICAgICAgIHZhciBuZXdOb2RlUG9zID0ge1xuICAgICAgICAgICAgeDogcG9zLnggLSBlbGVtLm9mZnNldC54LFxuICAgICAgICAgICAgeTogcG9zLnkgLSBlbGVtLm9mZnNldC55LFxuICAgICAgICB9O1xuICAgICAgICB2YXIgZGJmID0gdGhpcy5kcmFnQm91bmRGdW5jKCk7XG4gICAgICAgIGlmIChkYmYgIT09IHVuZGVmaW5lZCkge1xuICAgICAgICAgICAgY29uc3QgYm91bmRlZCA9IGRiZi5jYWxsKHRoaXMsIG5ld05vZGVQb3MsIGV2dCk7XG4gICAgICAgICAgICBpZiAoIWJvdW5kZWQpIHtcbiAgICAgICAgICAgICAgICBVdGlsLndhcm4oJ2RyYWdCb3VuZEZ1bmMgZGlkIG5vdCByZXR1cm4gYW55IHZhbHVlLiBUaGF0IGlzIHVuZXhwZWN0ZWQgYmVoYXZpb3IuIFlvdSBtdXN0IHJldHVybiBuZXcgYWJzb2x1dGUgcG9zaXRpb24gZnJvbSBkcmFnQm91bmRGdW5jLicpO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgZWxzZSB7XG4gICAgICAgICAgICAgICAgbmV3Tm9kZVBvcyA9IGJvdW5kZWQ7XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgICAgaWYgKCF0aGlzLl9sYXN0UG9zIHx8XG4gICAgICAgICAgICB0aGlzLl9sYXN0UG9zLnggIT09IG5ld05vZGVQb3MueCB8fFxuICAgICAgICAgICAgdGhpcy5fbGFzdFBvcy55ICE9PSBuZXdOb2RlUG9zLnkpIHtcbiAgICAgICAgICAgIHRoaXMuc2V0QWJzb2x1dGVQb3NpdGlvbihuZXdOb2RlUG9zKTtcbiAgICAgICAgICAgIHRoaXMuX3JlcXVlc3REcmF3KCk7XG4gICAgICAgIH1cbiAgICAgICAgdGhpcy5fbGFzdFBvcyA9IG5ld05vZGVQb3M7XG4gICAgfVxuICAgIHN0b3BEcmFnKGV2dCkge1xuICAgICAgICBjb25zdCBlbGVtID0gREQuX2RyYWdFbGVtZW50cy5nZXQodGhpcy5faWQpO1xuICAgICAgICBpZiAoZWxlbSkge1xuICAgICAgICAgICAgZWxlbS5kcmFnU3RhdHVzID0gJ3N0b3BwZWQnO1xuICAgICAgICB9XG4gICAgICAgIERELl9lbmREcmFnQmVmb3JlKGV2dCk7XG4gICAgICAgIERELl9lbmREcmFnQWZ0ZXIoZXZ0KTtcbiAgICB9XG4gICAgc2V0RHJhZ2dhYmxlKGRyYWdnYWJsZSkge1xuICAgICAgICB0aGlzLl9zZXRBdHRyKCdkcmFnZ2FibGUnLCBkcmFnZ2FibGUpO1xuICAgICAgICB0aGlzLl9kcmFnQ2hhbmdlKCk7XG4gICAgfVxuICAgIGlzRHJhZ2dpbmcoKSB7XG4gICAgICAgIGNvbnN0IGVsZW0gPSBERC5fZHJhZ0VsZW1lbnRzLmdldCh0aGlzLl9pZCk7XG4gICAgICAgIHJldHVybiBlbGVtID8gZWxlbS5kcmFnU3RhdHVzID09PSAnZHJhZ2dpbmcnIDogZmFsc2U7XG4gICAgfVxuICAgIF9saXN0ZW5EcmFnKCkge1xuICAgICAgICB0aGlzLl9kcmFnQ2xlYW51cCgpO1xuICAgICAgICB0aGlzLm9uKCdtb3VzZWRvd24ua29udmEgdG91Y2hzdGFydC5rb252YScsIGZ1bmN0aW9uIChldnQpIHtcbiAgICAgICAgICAgIHZhciBzaG91bGRDaGVja0J1dHRvbiA9IGV2dC5ldnRbJ2J1dHRvbiddICE9PSB1bmRlZmluZWQ7XG4gICAgICAgICAgICB2YXIgY2FuRHJhZyA9ICFzaG91bGRDaGVja0J1dHRvbiB8fCBLb252YS5kcmFnQnV0dG9ucy5pbmRleE9mKGV2dC5ldnRbJ2J1dHRvbiddKSA+PSAwO1xuICAgICAgICAgICAgaWYgKCFjYW5EcmFnKSB7XG4gICAgICAgICAgICAgICAgcmV0dXJuO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgaWYgKHRoaXMuaXNEcmFnZ2luZygpKSB7XG4gICAgICAgICAgICAgICAgcmV0dXJuO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgdmFyIGhhc0RyYWdnaW5nQ2hpbGQgPSBmYWxzZTtcbiAgICAgICAgICAgIERELl9kcmFnRWxlbWVudHMuZm9yRWFjaCgoZWxlbSkgPT4ge1xuICAgICAgICAgICAgICAgIGlmICh0aGlzLmlzQW5jZXN0b3JPZihlbGVtLm5vZGUpKSB7XG4gICAgICAgICAgICAgICAgICAgIGhhc0RyYWdnaW5nQ2hpbGQgPSB0cnVlO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgaWYgKCFoYXNEcmFnZ2luZ0NoaWxkKSB7XG4gICAgICAgICAgICAgICAgdGhpcy5fY3JlYXRlRHJhZ0VsZW1lbnQoZXZ0KTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfSk7XG4gICAgfVxuICAgIF9kcmFnQ2hhbmdlKCkge1xuICAgICAgICBpZiAodGhpcy5hdHRycy5kcmFnZ2FibGUpIHtcbiAgICAgICAgICAgIHRoaXMuX2xpc3RlbkRyYWcoKTtcbiAgICAgICAgfVxuICAgICAgICBlbHNlIHtcbiAgICAgICAgICAgIHRoaXMuX2RyYWdDbGVhbnVwKCk7XG4gICAgICAgICAgICB2YXIgc3RhZ2UgPSB0aGlzLmdldFN0YWdlKCk7XG4gICAgICAgICAgICBpZiAoIXN0YWdlKSB7XG4gICAgICAgICAgICAgICAgcmV0dXJuO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgY29uc3QgZHJhZ0VsZW1lbnQgPSBERC5fZHJhZ0VsZW1lbnRzLmdldCh0aGlzLl9pZCk7XG4gICAgICAgICAgICBjb25zdCBpc0RyYWdnaW5nID0gZHJhZ0VsZW1lbnQgJiYgZHJhZ0VsZW1lbnQuZHJhZ1N0YXR1cyA9PT0gJ2RyYWdnaW5nJztcbiAgICAgICAgICAgIGNvbnN0IGlzUmVhZHkgPSBkcmFnRWxlbWVudCAmJiBkcmFnRWxlbWVudC5kcmFnU3RhdHVzID09PSAncmVhZHknO1xuICAgICAgICAgICAgaWYgKGlzRHJhZ2dpbmcpIHtcbiAgICAgICAgICAgICAgICB0aGlzLnN0b3BEcmFnKCk7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBlbHNlIGlmIChpc1JlYWR5KSB7XG4gICAgICAgICAgICAgICAgREQuX2RyYWdFbGVtZW50cy5kZWxldGUodGhpcy5faWQpO1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgfVxuICAgIF9kcmFnQ2xlYW51cCgpIHtcbiAgICAgICAgdGhpcy5vZmYoJ21vdXNlZG93bi5rb252YScpO1xuICAgICAgICB0aGlzLm9mZigndG91Y2hzdGFydC5rb252YScpO1xuICAgIH1cbiAgICBpc0NsaWVudFJlY3RPblNjcmVlbihtYXJnaW4gPSB7IHg6IDAsIHk6IDAgfSkge1xuICAgICAgICBjb25zdCBzdGFnZSA9IHRoaXMuZ2V0U3RhZ2UoKTtcbiAgICAgICAgaWYgKCFzdGFnZSkge1xuICAgICAgICAgICAgcmV0dXJuIGZhbHNlO1xuICAgICAgICB9XG4gICAgICAgIGNvbnN0IHNjcmVlblJlY3QgPSB7XG4gICAgICAgICAgICB4OiAtbWFyZ2luLngsXG4gICAgICAgICAgICB5OiAtbWFyZ2luLnksXG4gICAgICAgICAgICB3aWR0aDogc3RhZ2Uud2lkdGgoKSArIDIgKiBtYXJnaW4ueCxcbiAgICAgICAgICAgIGhlaWdodDogc3RhZ2UuaGVpZ2h0KCkgKyAyICogbWFyZ2luLnksXG4gICAgICAgIH07XG4gICAgICAgIHJldHVybiBVdGlsLmhhdmVJbnRlcnNlY3Rpb24oc2NyZWVuUmVjdCwgdGhpcy5nZXRDbGllbnRSZWN0KCkpO1xuICAgIH1cbiAgICBzdGF0aWMgY3JlYXRlKGRhdGEsIGNvbnRhaW5lcikge1xuICAgICAgICBpZiAoVXRpbC5faXNTdHJpbmcoZGF0YSkpIHtcbiAgICAgICAgICAgIGRhdGEgPSBKU09OLnBhcnNlKGRhdGEpO1xuICAgICAgICB9XG4gICAgICAgIHJldHVybiB0aGlzLl9jcmVhdGVOb2RlKGRhdGEsIGNvbnRhaW5lcik7XG4gICAgfVxuICAgIHN0YXRpYyBfY3JlYXRlTm9kZShvYmosIGNvbnRhaW5lcikge1xuICAgICAgICB2YXIgY2xhc3NOYW1lID0gTm9kZS5wcm90b3R5cGUuZ2V0Q2xhc3NOYW1lLmNhbGwob2JqKSwgY2hpbGRyZW4gPSBvYmouY2hpbGRyZW4sIG5vLCBsZW4sIG47XG4gICAgICAgIGlmIChjb250YWluZXIpIHtcbiAgICAgICAgICAgIG9iai5hdHRycy5jb250YWluZXIgPSBjb250YWluZXI7XG4gICAgICAgIH1cbiAgICAgICAgaWYgKCFLb252YVtjbGFzc05hbWVdKSB7XG4gICAgICAgICAgICBVdGlsLndhcm4oJ0NhbiBub3QgZmluZCBhIG5vZGUgd2l0aCBjbGFzcyBuYW1lIFwiJyArXG4gICAgICAgICAgICAgICAgY2xhc3NOYW1lICtcbiAgICAgICAgICAgICAgICAnXCIuIEZhbGxiYWNrIHRvIFwiU2hhcGVcIi4nKTtcbiAgICAgICAgICAgIGNsYXNzTmFtZSA9ICdTaGFwZSc7XG4gICAgICAgIH1cbiAgICAgICAgY29uc3QgQ2xhc3MgPSBLb252YVtjbGFzc05hbWVdO1xuICAgICAgICBubyA9IG5ldyBDbGFzcyhvYmouYXR0cnMpO1xuICAgICAgICBpZiAoY2hpbGRyZW4pIHtcbiAgICAgICAgICAgIGxlbiA9IGNoaWxkcmVuLmxlbmd0aDtcbiAgICAgICAgICAgIGZvciAobiA9IDA7IG4gPCBsZW47IG4rKykge1xuICAgICAgICAgICAgICAgIG5vLmFkZChOb2RlLl9jcmVhdGVOb2RlKGNoaWxkcmVuW25dKSk7XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuIG5vO1xuICAgIH1cbn1cbk5vZGUucHJvdG90eXBlLm5vZGVUeXBlID0gJ05vZGUnO1xuTm9kZS5wcm90b3R5cGUuX2F0dHJzQWZmZWN0aW5nU2l6ZSA9IFtdO1xuTm9kZS5wcm90b3R5cGUuZXZlbnRMaXN0ZW5lcnMgPSB7fTtcbk5vZGUucHJvdG90eXBlLm9uLmNhbGwoTm9kZS5wcm90b3R5cGUsIFRSQU5TRk9STV9DSEFOR0VfU1RSLCBmdW5jdGlvbiAoKSB7XG4gICAgaWYgKHRoaXMuX2JhdGNoaW5nVHJhbnNmb3JtQ2hhbmdlKSB7XG4gICAgICAgIHRoaXMuX25lZWRDbGVhclRyYW5zZm9ybUNhY2hlID0gdHJ1ZTtcbiAgICAgICAgcmV0dXJuO1xuICAgIH1cbiAgICB0aGlzLl9jbGVhckNhY2hlKFRSQU5TRk9STSk7XG4gICAgdGhpcy5fY2xlYXJTZWxmQW5kRGVzY2VuZGFudENhY2hlKEFCU09MVVRFX1RSQU5TRk9STSk7XG59KTtcbk5vZGUucHJvdG90eXBlLm9uLmNhbGwoTm9kZS5wcm90b3R5cGUsICd2aXNpYmxlQ2hhbmdlLmtvbnZhJywgZnVuY3Rpb24gKCkge1xuICAgIHRoaXMuX2NsZWFyU2VsZkFuZERlc2NlbmRhbnRDYWNoZShWSVNJQkxFKTtcbn0pO1xuTm9kZS5wcm90b3R5cGUub24uY2FsbChOb2RlLnByb3RvdHlwZSwgJ2xpc3RlbmluZ0NoYW5nZS5rb252YScsIGZ1bmN0aW9uICgpIHtcbiAgICB0aGlzLl9jbGVhclNlbGZBbmREZXNjZW5kYW50Q2FjaGUoTElTVEVOSU5HKTtcbn0pO1xuTm9kZS5wcm90b3R5cGUub24uY2FsbChOb2RlLnByb3RvdHlwZSwgJ29wYWNpdHlDaGFuZ2Uua29udmEnLCBmdW5jdGlvbiAoKSB7XG4gICAgdGhpcy5fY2xlYXJTZWxmQW5kRGVzY2VuZGFudENhY2hlKEFCU09MVVRFX09QQUNJVFkpO1xufSk7XG5jb25zdCBhZGRHZXR0ZXJTZXR0ZXIgPSBGYWN0b3J5LmFkZEdldHRlclNldHRlcjtcbmFkZEdldHRlclNldHRlcihOb2RlLCAnekluZGV4Jyk7XG5hZGRHZXR0ZXJTZXR0ZXIoTm9kZSwgJ2Fic29sdXRlUG9zaXRpb24nKTtcbmFkZEdldHRlclNldHRlcihOb2RlLCAncG9zaXRpb24nKTtcbmFkZEdldHRlclNldHRlcihOb2RlLCAneCcsIDAsIGdldE51bWJlclZhbGlkYXRvcigpKTtcbmFkZEdldHRlclNldHRlcihOb2RlLCAneScsIDAsIGdldE51bWJlclZhbGlkYXRvcigpKTtcbmFkZEdldHRlclNldHRlcihOb2RlLCAnZ2xvYmFsQ29tcG9zaXRlT3BlcmF0aW9uJywgJ3NvdXJjZS1vdmVyJywgZ2V0U3RyaW5nVmFsaWRhdG9yKCkpO1xuYWRkR2V0dGVyU2V0dGVyKE5vZGUsICdvcGFjaXR5JywgMSwgZ2V0TnVtYmVyVmFsaWRhdG9yKCkpO1xuYWRkR2V0dGVyU2V0dGVyKE5vZGUsICduYW1lJywgJycsIGdldFN0cmluZ1ZhbGlkYXRvcigpKTtcbmFkZEdldHRlclNldHRlcihOb2RlLCAnaWQnLCAnJywgZ2V0U3RyaW5nVmFsaWRhdG9yKCkpO1xuYWRkR2V0dGVyU2V0dGVyKE5vZGUsICdyb3RhdGlvbicsIDAsIGdldE51bWJlclZhbGlkYXRvcigpKTtcbkZhY3RvcnkuYWRkQ29tcG9uZW50c0dldHRlclNldHRlcihOb2RlLCAnc2NhbGUnLCBbJ3gnLCAneSddKTtcbmFkZEdldHRlclNldHRlcihOb2RlLCAnc2NhbGVYJywgMSwgZ2V0TnVtYmVyVmFsaWRhdG9yKCkpO1xuYWRkR2V0dGVyU2V0dGVyKE5vZGUsICdzY2FsZVknLCAxLCBnZXROdW1iZXJWYWxpZGF0b3IoKSk7XG5GYWN0b3J5LmFkZENvbXBvbmVudHNHZXR0ZXJTZXR0ZXIoTm9kZSwgJ3NrZXcnLCBbJ3gnLCAneSddKTtcbmFkZEdldHRlclNldHRlcihOb2RlLCAnc2tld1gnLCAwLCBnZXROdW1iZXJWYWxpZGF0b3IoKSk7XG5hZGRHZXR0ZXJTZXR0ZXIoTm9kZSwgJ3NrZXdZJywgMCwgZ2V0TnVtYmVyVmFsaWRhdG9yKCkpO1xuRmFjdG9yeS5hZGRDb21wb25lbnRzR2V0dGVyU2V0dGVyKE5vZGUsICdvZmZzZXQnLCBbJ3gnLCAneSddKTtcbmFkZEdldHRlclNldHRlcihOb2RlLCAnb2Zmc2V0WCcsIDAsIGdldE51bWJlclZhbGlkYXRvcigpKTtcbmFkZEdldHRlclNldHRlcihOb2RlLCAnb2Zmc2V0WScsIDAsIGdldE51bWJlclZhbGlkYXRvcigpKTtcbmFkZEdldHRlclNldHRlcihOb2RlLCAnZHJhZ0Rpc3RhbmNlJywgbnVsbCwgZ2V0TnVtYmVyVmFsaWRhdG9yKCkpO1xuYWRkR2V0dGVyU2V0dGVyKE5vZGUsICd3aWR0aCcsIDAsIGdldE51bWJlclZhbGlkYXRvcigpKTtcbmFkZEdldHRlclNldHRlcihOb2RlLCAnaGVpZ2h0JywgMCwgZ2V0TnVtYmVyVmFsaWRhdG9yKCkpO1xuYWRkR2V0dGVyU2V0dGVyKE5vZGUsICdsaXN0ZW5pbmcnLCB0cnVlLCBnZXRCb29sZWFuVmFsaWRhdG9yKCkpO1xuYWRkR2V0dGVyU2V0dGVyKE5vZGUsICdwcmV2ZW50RGVmYXVsdCcsIHRydWUsIGdldEJvb2xlYW5WYWxpZGF0b3IoKSk7XG5hZGRHZXR0ZXJTZXR0ZXIoTm9kZSwgJ2ZpbHRlcnMnLCBudWxsLCBmdW5jdGlvbiAodmFsKSB7XG4gICAgdGhpcy5fZmlsdGVyVXBUb0RhdGUgPSBmYWxzZTtcbiAgICByZXR1cm4gdmFsO1xufSk7XG5hZGRHZXR0ZXJTZXR0ZXIoTm9kZSwgJ3Zpc2libGUnLCB0cnVlLCBnZXRCb29sZWFuVmFsaWRhdG9yKCkpO1xuYWRkR2V0dGVyU2V0dGVyKE5vZGUsICd0cmFuc2Zvcm1zRW5hYmxlZCcsICdhbGwnLCBnZXRTdHJpbmdWYWxpZGF0b3IoKSk7XG5hZGRHZXR0ZXJTZXR0ZXIoTm9kZSwgJ3NpemUnKTtcbmFkZEdldHRlclNldHRlcihOb2RlLCAnZHJhZ0JvdW5kRnVuYycpO1xuYWRkR2V0dGVyU2V0dGVyKE5vZGUsICdkcmFnZ2FibGUnLCBmYWxzZSwgZ2V0Qm9vbGVhblZhbGlkYXRvcigpKTtcbkZhY3RvcnkuYmFja0NvbXBhdChOb2RlLCB7XG4gICAgcm90YXRlRGVnOiAncm90YXRlJyxcbiAgICBzZXRSb3RhdGlvbkRlZzogJ3NldFJvdGF0aW9uJyxcbiAgICBnZXRSb3RhdGlvbkRlZzogJ2dldFJvdGF0aW9uJyxcbn0pO1xuIiwiaW1wb3J0IHsgS29udmEgfSBmcm9tICcuL0dsb2JhbC5qcyc7XG5jb25zdCBDYXB0dXJlcyA9IG5ldyBNYXAoKTtcbmNvbnN0IFNVUFBPUlRfUE9JTlRFUl9FVkVOVFMgPSBLb252YS5fZ2xvYmFsWydQb2ludGVyRXZlbnQnXSAhPT0gdW5kZWZpbmVkO1xuZXhwb3J0IGZ1bmN0aW9uIGdldENhcHR1cmVkU2hhcGUocG9pbnRlcklkKSB7XG4gICAgcmV0dXJuIENhcHR1cmVzLmdldChwb2ludGVySWQpO1xufVxuZXhwb3J0IGZ1bmN0aW9uIGNyZWF0ZUV2ZW50KGV2dCkge1xuICAgIHJldHVybiB7XG4gICAgICAgIGV2dCxcbiAgICAgICAgcG9pbnRlcklkOiBldnQucG9pbnRlcklkLFxuICAgIH07XG59XG5leHBvcnQgZnVuY3Rpb24gaGFzUG9pbnRlckNhcHR1cmUocG9pbnRlcklkLCBzaGFwZSkge1xuICAgIHJldHVybiBDYXB0dXJlcy5nZXQocG9pbnRlcklkKSA9PT0gc2hhcGU7XG59XG5leHBvcnQgZnVuY3Rpb24gc2V0UG9pbnRlckNhcHR1cmUocG9pbnRlcklkLCBzaGFwZSkge1xuICAgIHJlbGVhc2VDYXB0dXJlKHBvaW50ZXJJZCk7XG4gICAgY29uc3Qgc3RhZ2UgPSBzaGFwZS5nZXRTdGFnZSgpO1xuICAgIGlmICghc3RhZ2UpXG4gICAgICAgIHJldHVybjtcbiAgICBDYXB0dXJlcy5zZXQocG9pbnRlcklkLCBzaGFwZSk7XG4gICAgaWYgKFNVUFBPUlRfUE9JTlRFUl9FVkVOVFMpIHtcbiAgICAgICAgc2hhcGUuX2ZpcmUoJ2dvdHBvaW50ZXJjYXB0dXJlJywgY3JlYXRlRXZlbnQobmV3IFBvaW50ZXJFdmVudCgnZ290cG9pbnRlcmNhcHR1cmUnKSkpO1xuICAgIH1cbn1cbmV4cG9ydCBmdW5jdGlvbiByZWxlYXNlQ2FwdHVyZShwb2ludGVySWQsIHRhcmdldCkge1xuICAgIGNvbnN0IHNoYXBlID0gQ2FwdHVyZXMuZ2V0KHBvaW50ZXJJZCk7XG4gICAgaWYgKCFzaGFwZSlcbiAgICAgICAgcmV0dXJuO1xuICAgIGNvbnN0IHN0YWdlID0gc2hhcGUuZ2V0U3RhZ2UoKTtcbiAgICBpZiAoc3RhZ2UgJiYgc3RhZ2UuY29udGVudCkge1xuICAgIH1cbiAgICBDYXB0dXJlcy5kZWxldGUocG9pbnRlcklkKTtcbiAgICBpZiAoU1VQUE9SVF9QT0lOVEVSX0VWRU5UUykge1xuICAgICAgICBzaGFwZS5fZmlyZSgnbG9zdHBvaW50ZXJjYXB0dXJlJywgY3JlYXRlRXZlbnQobmV3IFBvaW50ZXJFdmVudCgnbG9zdHBvaW50ZXJjYXB0dXJlJykpKTtcbiAgICB9XG59XG4iLCJpbXBvcnQgeyBLb252YSB9IGZyb20gJy4vR2xvYmFsLmpzJztcbmltcG9ydCB7IFRyYW5zZm9ybSwgVXRpbCB9IGZyb20gJy4vVXRpbC5qcyc7XG5pbXBvcnQgeyBGYWN0b3J5IH0gZnJvbSAnLi9GYWN0b3J5LmpzJztcbmltcG9ydCB7IE5vZGUgfSBmcm9tICcuL05vZGUuanMnO1xuaW1wb3J0IHsgZ2V0TnVtYmVyVmFsaWRhdG9yLCBnZXROdW1iZXJPckF1dG9WYWxpZGF0b3IsIGdldFN0cmluZ1ZhbGlkYXRvciwgZ2V0Qm9vbGVhblZhbGlkYXRvciwgZ2V0U3RyaW5nT3JHcmFkaWVudFZhbGlkYXRvciwgfSBmcm9tICcuL1ZhbGlkYXRvcnMuanMnO1xuaW1wb3J0IHsgX3JlZ2lzdGVyTm9kZSB9IGZyb20gJy4vR2xvYmFsLmpzJztcbmltcG9ydCAqIGFzIFBvaW50ZXJFdmVudHMgZnJvbSAnLi9Qb2ludGVyRXZlbnRzLmpzJztcbnZhciBIQVNfU0hBRE9XID0gJ2hhc1NoYWRvdyc7XG52YXIgU0hBRE9XX1JHQkEgPSAnc2hhZG93UkdCQSc7XG52YXIgcGF0dGVybkltYWdlID0gJ3BhdHRlcm5JbWFnZSc7XG52YXIgbGluZWFyR3JhZGllbnQgPSAnbGluZWFyR3JhZGllbnQnO1xudmFyIHJhZGlhbEdyYWRpZW50ID0gJ3JhZGlhbEdyYWRpZW50JztcbmxldCBkdW1teUNvbnRleHQ7XG5mdW5jdGlvbiBnZXREdW1teUNvbnRleHQoKSB7XG4gICAgaWYgKGR1bW15Q29udGV4dCkge1xuICAgICAgICByZXR1cm4gZHVtbXlDb250ZXh0O1xuICAgIH1cbiAgICBkdW1teUNvbnRleHQgPSBVdGlsLmNyZWF0ZUNhbnZhc0VsZW1lbnQoKS5nZXRDb250ZXh0KCcyZCcpO1xuICAgIHJldHVybiBkdW1teUNvbnRleHQ7XG59XG5leHBvcnQgY29uc3Qgc2hhcGVzID0ge307XG5mdW5jdGlvbiBfZmlsbEZ1bmMoY29udGV4dCkge1xuICAgIGNvbnRleHQuZmlsbCgpO1xufVxuZnVuY3Rpb24gX3N0cm9rZUZ1bmMoY29udGV4dCkge1xuICAgIGNvbnRleHQuc3Ryb2tlKCk7XG59XG5mdW5jdGlvbiBfZmlsbEZ1bmNIaXQoY29udGV4dCkge1xuICAgIGNvbnRleHQuZmlsbCgpO1xufVxuZnVuY3Rpb24gX3N0cm9rZUZ1bmNIaXQoY29udGV4dCkge1xuICAgIGNvbnRleHQuc3Ryb2tlKCk7XG59XG5mdW5jdGlvbiBfY2xlYXJIYXNTaGFkb3dDYWNoZSgpIHtcbiAgICB0aGlzLl9jbGVhckNhY2hlKEhBU19TSEFET1cpO1xufVxuZnVuY3Rpb24gX2NsZWFyR2V0U2hhZG93UkdCQUNhY2hlKCkge1xuICAgIHRoaXMuX2NsZWFyQ2FjaGUoU0hBRE9XX1JHQkEpO1xufVxuZnVuY3Rpb24gX2NsZWFyRmlsbFBhdHRlcm5DYWNoZSgpIHtcbiAgICB0aGlzLl9jbGVhckNhY2hlKHBhdHRlcm5JbWFnZSk7XG59XG5mdW5jdGlvbiBfY2xlYXJMaW5lYXJHcmFkaWVudENhY2hlKCkge1xuICAgIHRoaXMuX2NsZWFyQ2FjaGUobGluZWFyR3JhZGllbnQpO1xufVxuZnVuY3Rpb24gX2NsZWFyUmFkaWFsR3JhZGllbnRDYWNoZSgpIHtcbiAgICB0aGlzLl9jbGVhckNhY2hlKHJhZGlhbEdyYWRpZW50KTtcbn1cbmV4cG9ydCBjbGFzcyBTaGFwZSBleHRlbmRzIE5vZGUge1xuICAgIGNvbnN0cnVjdG9yKGNvbmZpZykge1xuICAgICAgICBzdXBlcihjb25maWcpO1xuICAgICAgICBsZXQga2V5O1xuICAgICAgICB3aGlsZSAodHJ1ZSkge1xuICAgICAgICAgICAga2V5ID0gVXRpbC5nZXRSYW5kb21Db2xvcigpO1xuICAgICAgICAgICAgaWYgKGtleSAmJiAhKGtleSBpbiBzaGFwZXMpKSB7XG4gICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgICAgdGhpcy5jb2xvcktleSA9IGtleTtcbiAgICAgICAgc2hhcGVzW2tleV0gPSB0aGlzO1xuICAgIH1cbiAgICBnZXRDb250ZXh0KCkge1xuICAgICAgICBVdGlsLndhcm4oJ3NoYXBlLmdldENvbnRleHQoKSBtZXRob2QgaXMgZGVwcmVjYXRlZC4gUGxlYXNlIGRvIG5vdCB1c2UgaXQuJyk7XG4gICAgICAgIHJldHVybiB0aGlzLmdldExheWVyKCkuZ2V0Q29udGV4dCgpO1xuICAgIH1cbiAgICBnZXRDYW52YXMoKSB7XG4gICAgICAgIFV0aWwud2Fybignc2hhcGUuZ2V0Q2FudmFzKCkgbWV0aG9kIGlzIGRlcHJlY2F0ZWQuIFBsZWFzZSBkbyBub3QgdXNlIGl0LicpO1xuICAgICAgICByZXR1cm4gdGhpcy5nZXRMYXllcigpLmdldENhbnZhcygpO1xuICAgIH1cbiAgICBnZXRTY2VuZUZ1bmMoKSB7XG4gICAgICAgIHJldHVybiB0aGlzLmF0dHJzLnNjZW5lRnVuYyB8fCB0aGlzWydfc2NlbmVGdW5jJ107XG4gICAgfVxuICAgIGdldEhpdEZ1bmMoKSB7XG4gICAgICAgIHJldHVybiB0aGlzLmF0dHJzLmhpdEZ1bmMgfHwgdGhpc1snX2hpdEZ1bmMnXTtcbiAgICB9XG4gICAgaGFzU2hhZG93KCkge1xuICAgICAgICByZXR1cm4gdGhpcy5fZ2V0Q2FjaGUoSEFTX1NIQURPVywgdGhpcy5faGFzU2hhZG93KTtcbiAgICB9XG4gICAgX2hhc1NoYWRvdygpIHtcbiAgICAgICAgcmV0dXJuICh0aGlzLnNoYWRvd0VuYWJsZWQoKSAmJlxuICAgICAgICAgICAgdGhpcy5zaGFkb3dPcGFjaXR5KCkgIT09IDAgJiZcbiAgICAgICAgICAgICEhKHRoaXMuc2hhZG93Q29sb3IoKSB8fFxuICAgICAgICAgICAgICAgIHRoaXMuc2hhZG93Qmx1cigpIHx8XG4gICAgICAgICAgICAgICAgdGhpcy5zaGFkb3dPZmZzZXRYKCkgfHxcbiAgICAgICAgICAgICAgICB0aGlzLnNoYWRvd09mZnNldFkoKSkpO1xuICAgIH1cbiAgICBfZ2V0RmlsbFBhdHRlcm4oKSB7XG4gICAgICAgIHJldHVybiB0aGlzLl9nZXRDYWNoZShwYXR0ZXJuSW1hZ2UsIHRoaXMuX19nZXRGaWxsUGF0dGVybik7XG4gICAgfVxuICAgIF9fZ2V0RmlsbFBhdHRlcm4oKSB7XG4gICAgICAgIGlmICh0aGlzLmZpbGxQYXR0ZXJuSW1hZ2UoKSkge1xuICAgICAgICAgICAgdmFyIGN0eCA9IGdldER1bW15Q29udGV4dCgpO1xuICAgICAgICAgICAgY29uc3QgcGF0dGVybiA9IGN0eC5jcmVhdGVQYXR0ZXJuKHRoaXMuZmlsbFBhdHRlcm5JbWFnZSgpLCB0aGlzLmZpbGxQYXR0ZXJuUmVwZWF0KCkgfHwgJ3JlcGVhdCcpO1xuICAgICAgICAgICAgaWYgKHBhdHRlcm4gJiYgcGF0dGVybi5zZXRUcmFuc2Zvcm0pIHtcbiAgICAgICAgICAgICAgICBjb25zdCB0ciA9IG5ldyBUcmFuc2Zvcm0oKTtcbiAgICAgICAgICAgICAgICB0ci50cmFuc2xhdGUodGhpcy5maWxsUGF0dGVyblgoKSwgdGhpcy5maWxsUGF0dGVyblkoKSk7XG4gICAgICAgICAgICAgICAgdHIucm90YXRlKEtvbnZhLmdldEFuZ2xlKHRoaXMuZmlsbFBhdHRlcm5Sb3RhdGlvbigpKSk7XG4gICAgICAgICAgICAgICAgdHIuc2NhbGUodGhpcy5maWxsUGF0dGVyblNjYWxlWCgpLCB0aGlzLmZpbGxQYXR0ZXJuU2NhbGVZKCkpO1xuICAgICAgICAgICAgICAgIHRyLnRyYW5zbGF0ZSgtMSAqIHRoaXMuZmlsbFBhdHRlcm5PZmZzZXRYKCksIC0xICogdGhpcy5maWxsUGF0dGVybk9mZnNldFkoKSk7XG4gICAgICAgICAgICAgICAgY29uc3QgbSA9IHRyLmdldE1hdHJpeCgpO1xuICAgICAgICAgICAgICAgIGNvbnN0IG1hdHJpeCA9IHR5cGVvZiBET01NYXRyaXggPT09ICd1bmRlZmluZWQnXG4gICAgICAgICAgICAgICAgICAgID8ge1xuICAgICAgICAgICAgICAgICAgICAgICAgYTogbVswXSxcbiAgICAgICAgICAgICAgICAgICAgICAgIGI6IG1bMV0sXG4gICAgICAgICAgICAgICAgICAgICAgICBjOiBtWzJdLFxuICAgICAgICAgICAgICAgICAgICAgICAgZDogbVszXSxcbiAgICAgICAgICAgICAgICAgICAgICAgIGU6IG1bNF0sXG4gICAgICAgICAgICAgICAgICAgICAgICBmOiBtWzVdLFxuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgIDogbmV3IERPTU1hdHJpeChtKTtcbiAgICAgICAgICAgICAgICBwYXR0ZXJuLnNldFRyYW5zZm9ybShtYXRyaXgpO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgcmV0dXJuIHBhdHRlcm47XG4gICAgICAgIH1cbiAgICB9XG4gICAgX2dldExpbmVhckdyYWRpZW50KCkge1xuICAgICAgICByZXR1cm4gdGhpcy5fZ2V0Q2FjaGUobGluZWFyR3JhZGllbnQsIHRoaXMuX19nZXRMaW5lYXJHcmFkaWVudCk7XG4gICAgfVxuICAgIF9fZ2V0TGluZWFyR3JhZGllbnQoKSB7XG4gICAgICAgIHZhciBjb2xvclN0b3BzID0gdGhpcy5maWxsTGluZWFyR3JhZGllbnRDb2xvclN0b3BzKCk7XG4gICAgICAgIGlmIChjb2xvclN0b3BzKSB7XG4gICAgICAgICAgICB2YXIgY3R4ID0gZ2V0RHVtbXlDb250ZXh0KCk7XG4gICAgICAgICAgICB2YXIgc3RhcnQgPSB0aGlzLmZpbGxMaW5lYXJHcmFkaWVudFN0YXJ0UG9pbnQoKTtcbiAgICAgICAgICAgIHZhciBlbmQgPSB0aGlzLmZpbGxMaW5lYXJHcmFkaWVudEVuZFBvaW50KCk7XG4gICAgICAgICAgICB2YXIgZ3JkID0gY3R4LmNyZWF0ZUxpbmVhckdyYWRpZW50KHN0YXJ0LngsIHN0YXJ0LnksIGVuZC54LCBlbmQueSk7XG4gICAgICAgICAgICBmb3IgKHZhciBuID0gMDsgbiA8IGNvbG9yU3RvcHMubGVuZ3RoOyBuICs9IDIpIHtcbiAgICAgICAgICAgICAgICBncmQuYWRkQ29sb3JTdG9wKGNvbG9yU3RvcHNbbl0sIGNvbG9yU3RvcHNbbiArIDFdKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIHJldHVybiBncmQ7XG4gICAgICAgIH1cbiAgICB9XG4gICAgX2dldFJhZGlhbEdyYWRpZW50KCkge1xuICAgICAgICByZXR1cm4gdGhpcy5fZ2V0Q2FjaGUocmFkaWFsR3JhZGllbnQsIHRoaXMuX19nZXRSYWRpYWxHcmFkaWVudCk7XG4gICAgfVxuICAgIF9fZ2V0UmFkaWFsR3JhZGllbnQoKSB7XG4gICAgICAgIHZhciBjb2xvclN0b3BzID0gdGhpcy5maWxsUmFkaWFsR3JhZGllbnRDb2xvclN0b3BzKCk7XG4gICAgICAgIGlmIChjb2xvclN0b3BzKSB7XG4gICAgICAgICAgICB2YXIgY3R4ID0gZ2V0RHVtbXlDb250ZXh0KCk7XG4gICAgICAgICAgICB2YXIgc3RhcnQgPSB0aGlzLmZpbGxSYWRpYWxHcmFkaWVudFN0YXJ0UG9pbnQoKTtcbiAgICAgICAgICAgIHZhciBlbmQgPSB0aGlzLmZpbGxSYWRpYWxHcmFkaWVudEVuZFBvaW50KCk7XG4gICAgICAgICAgICB2YXIgZ3JkID0gY3R4LmNyZWF0ZVJhZGlhbEdyYWRpZW50KHN0YXJ0LngsIHN0YXJ0LnksIHRoaXMuZmlsbFJhZGlhbEdyYWRpZW50U3RhcnRSYWRpdXMoKSwgZW5kLngsIGVuZC55LCB0aGlzLmZpbGxSYWRpYWxHcmFkaWVudEVuZFJhZGl1cygpKTtcbiAgICAgICAgICAgIGZvciAodmFyIG4gPSAwOyBuIDwgY29sb3JTdG9wcy5sZW5ndGg7IG4gKz0gMikge1xuICAgICAgICAgICAgICAgIGdyZC5hZGRDb2xvclN0b3AoY29sb3JTdG9wc1tuXSwgY29sb3JTdG9wc1tuICsgMV0pO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgcmV0dXJuIGdyZDtcbiAgICAgICAgfVxuICAgIH1cbiAgICBnZXRTaGFkb3dSR0JBKCkge1xuICAgICAgICByZXR1cm4gdGhpcy5fZ2V0Q2FjaGUoU0hBRE9XX1JHQkEsIHRoaXMuX2dldFNoYWRvd1JHQkEpO1xuICAgIH1cbiAgICBfZ2V0U2hhZG93UkdCQSgpIHtcbiAgICAgICAgaWYgKCF0aGlzLmhhc1NoYWRvdygpKSB7XG4gICAgICAgICAgICByZXR1cm47XG4gICAgICAgIH1cbiAgICAgICAgdmFyIHJnYmEgPSBVdGlsLmNvbG9yVG9SR0JBKHRoaXMuc2hhZG93Q29sb3IoKSk7XG4gICAgICAgIGlmIChyZ2JhKSB7XG4gICAgICAgICAgICByZXR1cm4gKCdyZ2JhKCcgK1xuICAgICAgICAgICAgICAgIHJnYmEuciArXG4gICAgICAgICAgICAgICAgJywnICtcbiAgICAgICAgICAgICAgICByZ2JhLmcgK1xuICAgICAgICAgICAgICAgICcsJyArXG4gICAgICAgICAgICAgICAgcmdiYS5iICtcbiAgICAgICAgICAgICAgICAnLCcgK1xuICAgICAgICAgICAgICAgIHJnYmEuYSAqICh0aGlzLnNoYWRvd09wYWNpdHkoKSB8fCAxKSArXG4gICAgICAgICAgICAgICAgJyknKTtcbiAgICAgICAgfVxuICAgIH1cbiAgICBoYXNGaWxsKCkge1xuICAgICAgICByZXR1cm4gdGhpcy5fY2FsY3VsYXRlKCdoYXNGaWxsJywgW1xuICAgICAgICAgICAgJ2ZpbGxFbmFibGVkJyxcbiAgICAgICAgICAgICdmaWxsJyxcbiAgICAgICAgICAgICdmaWxsUGF0dGVybkltYWdlJyxcbiAgICAgICAgICAgICdmaWxsTGluZWFyR3JhZGllbnRDb2xvclN0b3BzJyxcbiAgICAgICAgICAgICdmaWxsUmFkaWFsR3JhZGllbnRDb2xvclN0b3BzJyxcbiAgICAgICAgXSwgKCkgPT4ge1xuICAgICAgICAgICAgcmV0dXJuICh0aGlzLmZpbGxFbmFibGVkKCkgJiZcbiAgICAgICAgICAgICAgICAhISh0aGlzLmZpbGwoKSB8fFxuICAgICAgICAgICAgICAgICAgICB0aGlzLmZpbGxQYXR0ZXJuSW1hZ2UoKSB8fFxuICAgICAgICAgICAgICAgICAgICB0aGlzLmZpbGxMaW5lYXJHcmFkaWVudENvbG9yU3RvcHMoKSB8fFxuICAgICAgICAgICAgICAgICAgICB0aGlzLmZpbGxSYWRpYWxHcmFkaWVudENvbG9yU3RvcHMoKSkpO1xuICAgICAgICB9KTtcbiAgICB9XG4gICAgaGFzU3Ryb2tlKCkge1xuICAgICAgICByZXR1cm4gdGhpcy5fY2FsY3VsYXRlKCdoYXNTdHJva2UnLCBbXG4gICAgICAgICAgICAnc3Ryb2tlRW5hYmxlZCcsXG4gICAgICAgICAgICAnc3Ryb2tlV2lkdGgnLFxuICAgICAgICAgICAgJ3N0cm9rZScsXG4gICAgICAgICAgICAnc3Ryb2tlTGluZWFyR3JhZGllbnRDb2xvclN0b3BzJyxcbiAgICAgICAgXSwgKCkgPT4ge1xuICAgICAgICAgICAgcmV0dXJuICh0aGlzLnN0cm9rZUVuYWJsZWQoKSAmJlxuICAgICAgICAgICAgICAgIHRoaXMuc3Ryb2tlV2lkdGgoKSAmJlxuICAgICAgICAgICAgICAgICEhKHRoaXMuc3Ryb2tlKCkgfHwgdGhpcy5zdHJva2VMaW5lYXJHcmFkaWVudENvbG9yU3RvcHMoKSkpO1xuICAgICAgICB9KTtcbiAgICB9XG4gICAgaGFzSGl0U3Ryb2tlKCkge1xuICAgICAgICBjb25zdCB3aWR0aCA9IHRoaXMuaGl0U3Ryb2tlV2lkdGgoKTtcbiAgICAgICAgaWYgKHdpZHRoID09PSAnYXV0bycpIHtcbiAgICAgICAgICAgIHJldHVybiB0aGlzLmhhc1N0cm9rZSgpO1xuICAgICAgICB9XG4gICAgICAgIHJldHVybiB0aGlzLnN0cm9rZUVuYWJsZWQoKSAmJiAhIXdpZHRoO1xuICAgIH1cbiAgICBpbnRlcnNlY3RzKHBvaW50KSB7XG4gICAgICAgIHZhciBzdGFnZSA9IHRoaXMuZ2V0U3RhZ2UoKSwgYnVmZmVySGl0Q2FudmFzID0gc3RhZ2UuYnVmZmVySGl0Q2FudmFzLCBwO1xuICAgICAgICBidWZmZXJIaXRDYW52YXMuZ2V0Q29udGV4dCgpLmNsZWFyKCk7XG4gICAgICAgIHRoaXMuZHJhd0hpdChidWZmZXJIaXRDYW52YXMsIG51bGwsIHRydWUpO1xuICAgICAgICBwID0gYnVmZmVySGl0Q2FudmFzLmNvbnRleHQuZ2V0SW1hZ2VEYXRhKE1hdGgucm91bmQocG9pbnQueCksIE1hdGgucm91bmQocG9pbnQueSksIDEsIDEpLmRhdGE7XG4gICAgICAgIHJldHVybiBwWzNdID4gMDtcbiAgICB9XG4gICAgZGVzdHJveSgpIHtcbiAgICAgICAgTm9kZS5wcm90b3R5cGUuZGVzdHJveS5jYWxsKHRoaXMpO1xuICAgICAgICBkZWxldGUgc2hhcGVzW3RoaXMuY29sb3JLZXldO1xuICAgICAgICBkZWxldGUgdGhpcy5jb2xvcktleTtcbiAgICAgICAgcmV0dXJuIHRoaXM7XG4gICAgfVxuICAgIF91c2VCdWZmZXJDYW52YXMoZm9yY2VGaWxsKSB7XG4gICAgICAgIHZhciBfYTtcbiAgICAgICAgaWYgKCF0aGlzLmdldFN0YWdlKCkpIHtcbiAgICAgICAgICAgIHJldHVybiBmYWxzZTtcbiAgICAgICAgfVxuICAgICAgICBjb25zdCBwZXJmZWN0RHJhd0VuYWJsZWQgPSAoX2EgPSB0aGlzLmF0dHJzLnBlcmZlY3REcmF3RW5hYmxlZCkgIT09IG51bGwgJiYgX2EgIT09IHZvaWQgMCA/IF9hIDogdHJ1ZTtcbiAgICAgICAgaWYgKCFwZXJmZWN0RHJhd0VuYWJsZWQpIHtcbiAgICAgICAgICAgIHJldHVybiBmYWxzZTtcbiAgICAgICAgfVxuICAgICAgICBjb25zdCBoYXNGaWxsID0gZm9yY2VGaWxsIHx8IHRoaXMuaGFzRmlsbCgpO1xuICAgICAgICBjb25zdCBoYXNTdHJva2UgPSB0aGlzLmhhc1N0cm9rZSgpO1xuICAgICAgICBjb25zdCBpc1RyYW5zcGFyZW50ID0gdGhpcy5nZXRBYnNvbHV0ZU9wYWNpdHkoKSAhPT0gMTtcbiAgICAgICAgaWYgKGhhc0ZpbGwgJiYgaGFzU3Ryb2tlICYmIGlzVHJhbnNwYXJlbnQpIHtcbiAgICAgICAgICAgIHJldHVybiB0cnVlO1xuICAgICAgICB9XG4gICAgICAgIGNvbnN0IGhhc1NoYWRvdyA9IHRoaXMuaGFzU2hhZG93KCk7XG4gICAgICAgIGNvbnN0IHN0cm9rZUZvclNoYWRvdyA9IHRoaXMuc2hhZG93Rm9yU3Ryb2tlRW5hYmxlZCgpO1xuICAgICAgICBpZiAoaGFzRmlsbCAmJiBoYXNTdHJva2UgJiYgaGFzU2hhZG93ICYmIHN0cm9rZUZvclNoYWRvdykge1xuICAgICAgICAgICAgcmV0dXJuIHRydWU7XG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuIGZhbHNlO1xuICAgIH1cbiAgICBzZXRTdHJva2VIaXRFbmFibGVkKHZhbCkge1xuICAgICAgICBVdGlsLndhcm4oJ3N0cm9rZUhpdEVuYWJsZWQgcHJvcGVydHkgaXMgZGVwcmVjYXRlZC4gUGxlYXNlIHVzZSBoaXRTdHJva2VXaWR0aCBpbnN0ZWFkLicpO1xuICAgICAgICBpZiAodmFsKSB7XG4gICAgICAgICAgICB0aGlzLmhpdFN0cm9rZVdpZHRoKCdhdXRvJyk7XG4gICAgICAgIH1cbiAgICAgICAgZWxzZSB7XG4gICAgICAgICAgICB0aGlzLmhpdFN0cm9rZVdpZHRoKDApO1xuICAgICAgICB9XG4gICAgfVxuICAgIGdldFN0cm9rZUhpdEVuYWJsZWQoKSB7XG4gICAgICAgIGlmICh0aGlzLmhpdFN0cm9rZVdpZHRoKCkgPT09IDApIHtcbiAgICAgICAgICAgIHJldHVybiBmYWxzZTtcbiAgICAgICAgfVxuICAgICAgICBlbHNlIHtcbiAgICAgICAgICAgIHJldHVybiB0cnVlO1xuICAgICAgICB9XG4gICAgfVxuICAgIGdldFNlbGZSZWN0KCkge1xuICAgICAgICB2YXIgc2l6ZSA9IHRoaXMuc2l6ZSgpO1xuICAgICAgICByZXR1cm4ge1xuICAgICAgICAgICAgeDogdGhpcy5fY2VudHJvaWQgPyAtc2l6ZS53aWR0aCAvIDIgOiAwLFxuICAgICAgICAgICAgeTogdGhpcy5fY2VudHJvaWQgPyAtc2l6ZS5oZWlnaHQgLyAyIDogMCxcbiAgICAgICAgICAgIHdpZHRoOiBzaXplLndpZHRoLFxuICAgICAgICAgICAgaGVpZ2h0OiBzaXplLmhlaWdodCxcbiAgICAgICAgfTtcbiAgICB9XG4gICAgZ2V0Q2xpZW50UmVjdChjb25maWcgPSB7fSkge1xuICAgICAgICBjb25zdCBza2lwVHJhbnNmb3JtID0gY29uZmlnLnNraXBUcmFuc2Zvcm07XG4gICAgICAgIGNvbnN0IHJlbGF0aXZlVG8gPSBjb25maWcucmVsYXRpdmVUbztcbiAgICAgICAgY29uc3QgZmlsbFJlY3QgPSB0aGlzLmdldFNlbGZSZWN0KCk7XG4gICAgICAgIGNvbnN0IGFwcGx5U3Ryb2tlID0gIWNvbmZpZy5za2lwU3Ryb2tlICYmIHRoaXMuaGFzU3Ryb2tlKCk7XG4gICAgICAgIGNvbnN0IHN0cm9rZVdpZHRoID0gKGFwcGx5U3Ryb2tlICYmIHRoaXMuc3Ryb2tlV2lkdGgoKSkgfHwgMDtcbiAgICAgICAgY29uc3QgZmlsbEFuZFN0cm9rZVdpZHRoID0gZmlsbFJlY3Qud2lkdGggKyBzdHJva2VXaWR0aDtcbiAgICAgICAgY29uc3QgZmlsbEFuZFN0cm9rZUhlaWdodCA9IGZpbGxSZWN0LmhlaWdodCArIHN0cm9rZVdpZHRoO1xuICAgICAgICBjb25zdCBhcHBseVNoYWRvdyA9ICFjb25maWcuc2tpcFNoYWRvdyAmJiB0aGlzLmhhc1NoYWRvdygpO1xuICAgICAgICBjb25zdCBzaGFkb3dPZmZzZXRYID0gYXBwbHlTaGFkb3cgPyB0aGlzLnNoYWRvd09mZnNldFgoKSA6IDA7XG4gICAgICAgIGNvbnN0IHNoYWRvd09mZnNldFkgPSBhcHBseVNoYWRvdyA/IHRoaXMuc2hhZG93T2Zmc2V0WSgpIDogMDtcbiAgICAgICAgY29uc3QgcHJlV2lkdGggPSBmaWxsQW5kU3Ryb2tlV2lkdGggKyBNYXRoLmFicyhzaGFkb3dPZmZzZXRYKTtcbiAgICAgICAgY29uc3QgcHJlSGVpZ2h0ID0gZmlsbEFuZFN0cm9rZUhlaWdodCArIE1hdGguYWJzKHNoYWRvd09mZnNldFkpO1xuICAgICAgICBjb25zdCBibHVyUmFkaXVzID0gKGFwcGx5U2hhZG93ICYmIHRoaXMuc2hhZG93Qmx1cigpKSB8fCAwO1xuICAgICAgICBjb25zdCB3aWR0aCA9IHByZVdpZHRoICsgYmx1clJhZGl1cyAqIDI7XG4gICAgICAgIGNvbnN0IGhlaWdodCA9IHByZUhlaWdodCArIGJsdXJSYWRpdXMgKiAyO1xuICAgICAgICBjb25zdCByZWN0ID0ge1xuICAgICAgICAgICAgd2lkdGg6IHdpZHRoLFxuICAgICAgICAgICAgaGVpZ2h0OiBoZWlnaHQsXG4gICAgICAgICAgICB4OiAtKHN0cm9rZVdpZHRoIC8gMiArIGJsdXJSYWRpdXMpICtcbiAgICAgICAgICAgICAgICBNYXRoLm1pbihzaGFkb3dPZmZzZXRYLCAwKSArXG4gICAgICAgICAgICAgICAgZmlsbFJlY3QueCxcbiAgICAgICAgICAgIHk6IC0oc3Ryb2tlV2lkdGggLyAyICsgYmx1clJhZGl1cykgK1xuICAgICAgICAgICAgICAgIE1hdGgubWluKHNoYWRvd09mZnNldFksIDApICtcbiAgICAgICAgICAgICAgICBmaWxsUmVjdC55LFxuICAgICAgICB9O1xuICAgICAgICBpZiAoIXNraXBUcmFuc2Zvcm0pIHtcbiAgICAgICAgICAgIHJldHVybiB0aGlzLl90cmFuc2Zvcm1lZFJlY3QocmVjdCwgcmVsYXRpdmVUbyk7XG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuIHJlY3Q7XG4gICAgfVxuICAgIGRyYXdTY2VuZShjYW4sIHRvcCkge1xuICAgICAgICB2YXIgbGF5ZXIgPSB0aGlzLmdldExheWVyKCksIGNhbnZhcyA9IGNhbiB8fCBsYXllci5nZXRDYW52YXMoKSwgY29udGV4dCA9IGNhbnZhcy5nZXRDb250ZXh0KCksIGNhY2hlZENhbnZhcyA9IHRoaXMuX2dldENhbnZhc0NhY2hlKCksIGRyYXdGdW5jID0gdGhpcy5nZXRTY2VuZUZ1bmMoKSwgaGFzU2hhZG93ID0gdGhpcy5oYXNTaGFkb3coKSwgc3RhZ2UsIGJ1ZmZlckNhbnZhcywgYnVmZmVyQ29udGV4dDtcbiAgICAgICAgdmFyIHNraXBCdWZmZXIgPSBjYW52YXMuaXNDYWNoZTtcbiAgICAgICAgdmFyIGNhY2hpbmdTZWxmID0gdG9wID09PSB0aGlzO1xuICAgICAgICBpZiAoIXRoaXMuaXNWaXNpYmxlKCkgJiYgIWNhY2hpbmdTZWxmKSB7XG4gICAgICAgICAgICByZXR1cm4gdGhpcztcbiAgICAgICAgfVxuICAgICAgICBpZiAoY2FjaGVkQ2FudmFzKSB7XG4gICAgICAgICAgICBjb250ZXh0LnNhdmUoKTtcbiAgICAgICAgICAgIHZhciBtID0gdGhpcy5nZXRBYnNvbHV0ZVRyYW5zZm9ybSh0b3ApLmdldE1hdHJpeCgpO1xuICAgICAgICAgICAgY29udGV4dC50cmFuc2Zvcm0obVswXSwgbVsxXSwgbVsyXSwgbVszXSwgbVs0XSwgbVs1XSk7XG4gICAgICAgICAgICB0aGlzLl9kcmF3Q2FjaGVkU2NlbmVDYW52YXMoY29udGV4dCk7XG4gICAgICAgICAgICBjb250ZXh0LnJlc3RvcmUoKTtcbiAgICAgICAgICAgIHJldHVybiB0aGlzO1xuICAgICAgICB9XG4gICAgICAgIGlmICghZHJhd0Z1bmMpIHtcbiAgICAgICAgICAgIHJldHVybiB0aGlzO1xuICAgICAgICB9XG4gICAgICAgIGNvbnRleHQuc2F2ZSgpO1xuICAgICAgICBpZiAodGhpcy5fdXNlQnVmZmVyQ2FudmFzKCkgJiYgIXNraXBCdWZmZXIpIHtcbiAgICAgICAgICAgIHN0YWdlID0gdGhpcy5nZXRTdGFnZSgpO1xuICAgICAgICAgICAgYnVmZmVyQ2FudmFzID0gc3RhZ2UuYnVmZmVyQ2FudmFzO1xuICAgICAgICAgICAgYnVmZmVyQ29udGV4dCA9IGJ1ZmZlckNhbnZhcy5nZXRDb250ZXh0KCk7XG4gICAgICAgICAgICBidWZmZXJDb250ZXh0LmNsZWFyKCk7XG4gICAgICAgICAgICBidWZmZXJDb250ZXh0LnNhdmUoKTtcbiAgICAgICAgICAgIGJ1ZmZlckNvbnRleHQuX2FwcGx5TGluZUpvaW4odGhpcyk7XG4gICAgICAgICAgICB2YXIgbyA9IHRoaXMuZ2V0QWJzb2x1dGVUcmFuc2Zvcm0odG9wKS5nZXRNYXRyaXgoKTtcbiAgICAgICAgICAgIGJ1ZmZlckNvbnRleHQudHJhbnNmb3JtKG9bMF0sIG9bMV0sIG9bMl0sIG9bM10sIG9bNF0sIG9bNV0pO1xuICAgICAgICAgICAgZHJhd0Z1bmMuY2FsbCh0aGlzLCBidWZmZXJDb250ZXh0LCB0aGlzKTtcbiAgICAgICAgICAgIGJ1ZmZlckNvbnRleHQucmVzdG9yZSgpO1xuICAgICAgICAgICAgdmFyIHJhdGlvID0gYnVmZmVyQ2FudmFzLnBpeGVsUmF0aW87XG4gICAgICAgICAgICBpZiAoaGFzU2hhZG93KSB7XG4gICAgICAgICAgICAgICAgY29udGV4dC5fYXBwbHlTaGFkb3codGhpcyk7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBjb250ZXh0Ll9hcHBseU9wYWNpdHkodGhpcyk7XG4gICAgICAgICAgICBjb250ZXh0Ll9hcHBseUdsb2JhbENvbXBvc2l0ZU9wZXJhdGlvbih0aGlzKTtcbiAgICAgICAgICAgIGNvbnRleHQuZHJhd0ltYWdlKGJ1ZmZlckNhbnZhcy5fY2FudmFzLCAwLCAwLCBidWZmZXJDYW52YXMud2lkdGggLyByYXRpbywgYnVmZmVyQ2FudmFzLmhlaWdodCAvIHJhdGlvKTtcbiAgICAgICAgfVxuICAgICAgICBlbHNlIHtcbiAgICAgICAgICAgIGNvbnRleHQuX2FwcGx5TGluZUpvaW4odGhpcyk7XG4gICAgICAgICAgICBpZiAoIWNhY2hpbmdTZWxmKSB7XG4gICAgICAgICAgICAgICAgdmFyIG8gPSB0aGlzLmdldEFic29sdXRlVHJhbnNmb3JtKHRvcCkuZ2V0TWF0cml4KCk7XG4gICAgICAgICAgICAgICAgY29udGV4dC50cmFuc2Zvcm0ob1swXSwgb1sxXSwgb1syXSwgb1szXSwgb1s0XSwgb1s1XSk7XG4gICAgICAgICAgICAgICAgY29udGV4dC5fYXBwbHlPcGFjaXR5KHRoaXMpO1xuICAgICAgICAgICAgICAgIGNvbnRleHQuX2FwcGx5R2xvYmFsQ29tcG9zaXRlT3BlcmF0aW9uKHRoaXMpO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgaWYgKGhhc1NoYWRvdykge1xuICAgICAgICAgICAgICAgIGNvbnRleHQuX2FwcGx5U2hhZG93KHRoaXMpO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgZHJhd0Z1bmMuY2FsbCh0aGlzLCBjb250ZXh0LCB0aGlzKTtcbiAgICAgICAgfVxuICAgICAgICBjb250ZXh0LnJlc3RvcmUoKTtcbiAgICAgICAgcmV0dXJuIHRoaXM7XG4gICAgfVxuICAgIGRyYXdIaXQoY2FuLCB0b3AsIHNraXBEcmFnQ2hlY2sgPSBmYWxzZSkge1xuICAgICAgICBpZiAoIXRoaXMuc2hvdWxkRHJhd0hpdCh0b3AsIHNraXBEcmFnQ2hlY2spKSB7XG4gICAgICAgICAgICByZXR1cm4gdGhpcztcbiAgICAgICAgfVxuICAgICAgICB2YXIgbGF5ZXIgPSB0aGlzLmdldExheWVyKCksIGNhbnZhcyA9IGNhbiB8fCBsYXllci5oaXRDYW52YXMsIGNvbnRleHQgPSBjYW52YXMgJiYgY2FudmFzLmdldENvbnRleHQoKSwgZHJhd0Z1bmMgPSB0aGlzLmhpdEZ1bmMoKSB8fCB0aGlzLnNjZW5lRnVuYygpLCBjYWNoZWRDYW52YXMgPSB0aGlzLl9nZXRDYW52YXNDYWNoZSgpLCBjYWNoZWRIaXRDYW52YXMgPSBjYWNoZWRDYW52YXMgJiYgY2FjaGVkQ2FudmFzLmhpdDtcbiAgICAgICAgaWYgKCF0aGlzLmNvbG9yS2V5KSB7XG4gICAgICAgICAgICBVdGlsLndhcm4oJ0xvb2tzIGxpa2UgeW91ciBjYW52YXMgaGFzIGEgZGVzdHJveWVkIHNoYXBlIGluIGl0LiBEbyBub3QgcmV1c2Ugc2hhcGUgYWZ0ZXIgeW91IGRlc3Ryb3llZCBpdC4gSWYgeW91IHdhbnQgdG8gcmV1c2Ugc2hhcGUgeW91IHNob3VsZCBjYWxsIHJlbW92ZSgpIGluc3RlYWQgb2YgZGVzdHJveSgpJyk7XG4gICAgICAgIH1cbiAgICAgICAgaWYgKGNhY2hlZEhpdENhbnZhcykge1xuICAgICAgICAgICAgY29udGV4dC5zYXZlKCk7XG4gICAgICAgICAgICB2YXIgbSA9IHRoaXMuZ2V0QWJzb2x1dGVUcmFuc2Zvcm0odG9wKS5nZXRNYXRyaXgoKTtcbiAgICAgICAgICAgIGNvbnRleHQudHJhbnNmb3JtKG1bMF0sIG1bMV0sIG1bMl0sIG1bM10sIG1bNF0sIG1bNV0pO1xuICAgICAgICAgICAgdGhpcy5fZHJhd0NhY2hlZEhpdENhbnZhcyhjb250ZXh0KTtcbiAgICAgICAgICAgIGNvbnRleHQucmVzdG9yZSgpO1xuICAgICAgICAgICAgcmV0dXJuIHRoaXM7XG4gICAgICAgIH1cbiAgICAgICAgaWYgKCFkcmF3RnVuYykge1xuICAgICAgICAgICAgcmV0dXJuIHRoaXM7XG4gICAgICAgIH1cbiAgICAgICAgY29udGV4dC5zYXZlKCk7XG4gICAgICAgIGNvbnRleHQuX2FwcGx5TGluZUpvaW4odGhpcyk7XG4gICAgICAgIGNvbnN0IHNlbGZDYWNoZSA9IHRoaXMgPT09IHRvcDtcbiAgICAgICAgaWYgKCFzZWxmQ2FjaGUpIHtcbiAgICAgICAgICAgIHZhciBvID0gdGhpcy5nZXRBYnNvbHV0ZVRyYW5zZm9ybSh0b3ApLmdldE1hdHJpeCgpO1xuICAgICAgICAgICAgY29udGV4dC50cmFuc2Zvcm0ob1swXSwgb1sxXSwgb1syXSwgb1szXSwgb1s0XSwgb1s1XSk7XG4gICAgICAgIH1cbiAgICAgICAgZHJhd0Z1bmMuY2FsbCh0aGlzLCBjb250ZXh0LCB0aGlzKTtcbiAgICAgICAgY29udGV4dC5yZXN0b3JlKCk7XG4gICAgICAgIHJldHVybiB0aGlzO1xuICAgIH1cbiAgICBkcmF3SGl0RnJvbUNhY2hlKGFscGhhVGhyZXNob2xkID0gMCkge1xuICAgICAgICB2YXIgY2FjaGVkQ2FudmFzID0gdGhpcy5fZ2V0Q2FudmFzQ2FjaGUoKSwgc2NlbmVDYW52YXMgPSB0aGlzLl9nZXRDYWNoZWRTY2VuZUNhbnZhcygpLCBoaXRDYW52YXMgPSBjYWNoZWRDYW52YXMuaGl0LCBoaXRDb250ZXh0ID0gaGl0Q2FudmFzLmdldENvbnRleHQoKSwgaGl0V2lkdGggPSBoaXRDYW52YXMuZ2V0V2lkdGgoKSwgaGl0SGVpZ2h0ID0gaGl0Q2FudmFzLmdldEhlaWdodCgpLCBoaXRJbWFnZURhdGEsIGhpdERhdGEsIGxlbiwgcmdiQ29sb3JLZXksIGksIGFscGhhO1xuICAgICAgICBoaXRDb250ZXh0LmNsZWFyKCk7XG4gICAgICAgIGhpdENvbnRleHQuZHJhd0ltYWdlKHNjZW5lQ2FudmFzLl9jYW52YXMsIDAsIDAsIGhpdFdpZHRoLCBoaXRIZWlnaHQpO1xuICAgICAgICB0cnkge1xuICAgICAgICAgICAgaGl0SW1hZ2VEYXRhID0gaGl0Q29udGV4dC5nZXRJbWFnZURhdGEoMCwgMCwgaGl0V2lkdGgsIGhpdEhlaWdodCk7XG4gICAgICAgICAgICBoaXREYXRhID0gaGl0SW1hZ2VEYXRhLmRhdGE7XG4gICAgICAgICAgICBsZW4gPSBoaXREYXRhLmxlbmd0aDtcbiAgICAgICAgICAgIHJnYkNvbG9yS2V5ID0gVXRpbC5faGV4VG9SZ2IodGhpcy5jb2xvcktleSk7XG4gICAgICAgICAgICBmb3IgKGkgPSAwOyBpIDwgbGVuOyBpICs9IDQpIHtcbiAgICAgICAgICAgICAgICBhbHBoYSA9IGhpdERhdGFbaSArIDNdO1xuICAgICAgICAgICAgICAgIGlmIChhbHBoYSA+IGFscGhhVGhyZXNob2xkKSB7XG4gICAgICAgICAgICAgICAgICAgIGhpdERhdGFbaV0gPSByZ2JDb2xvcktleS5yO1xuICAgICAgICAgICAgICAgICAgICBoaXREYXRhW2kgKyAxXSA9IHJnYkNvbG9yS2V5Lmc7XG4gICAgICAgICAgICAgICAgICAgIGhpdERhdGFbaSArIDJdID0gcmdiQ29sb3JLZXkuYjtcbiAgICAgICAgICAgICAgICAgICAgaGl0RGF0YVtpICsgM10gPSAyNTU7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIGVsc2Uge1xuICAgICAgICAgICAgICAgICAgICBoaXREYXRhW2kgKyAzXSA9IDA7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfVxuICAgICAgICAgICAgaGl0Q29udGV4dC5wdXRJbWFnZURhdGEoaGl0SW1hZ2VEYXRhLCAwLCAwKTtcbiAgICAgICAgfVxuICAgICAgICBjYXRjaCAoZSkge1xuICAgICAgICAgICAgVXRpbC5lcnJvcignVW5hYmxlIHRvIGRyYXcgaGl0IGdyYXBoIGZyb20gY2FjaGVkIHNjZW5lIGNhbnZhcy4gJyArIGUubWVzc2FnZSk7XG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuIHRoaXM7XG4gICAgfVxuICAgIGhhc1BvaW50ZXJDYXB0dXJlKHBvaW50ZXJJZCkge1xuICAgICAgICByZXR1cm4gUG9pbnRlckV2ZW50cy5oYXNQb2ludGVyQ2FwdHVyZShwb2ludGVySWQsIHRoaXMpO1xuICAgIH1cbiAgICBzZXRQb2ludGVyQ2FwdHVyZShwb2ludGVySWQpIHtcbiAgICAgICAgUG9pbnRlckV2ZW50cy5zZXRQb2ludGVyQ2FwdHVyZShwb2ludGVySWQsIHRoaXMpO1xuICAgIH1cbiAgICByZWxlYXNlQ2FwdHVyZShwb2ludGVySWQpIHtcbiAgICAgICAgUG9pbnRlckV2ZW50cy5yZWxlYXNlQ2FwdHVyZShwb2ludGVySWQsIHRoaXMpO1xuICAgIH1cbn1cblNoYXBlLnByb3RvdHlwZS5fZmlsbEZ1bmMgPSBfZmlsbEZ1bmM7XG5TaGFwZS5wcm90b3R5cGUuX3N0cm9rZUZ1bmMgPSBfc3Ryb2tlRnVuYztcblNoYXBlLnByb3RvdHlwZS5fZmlsbEZ1bmNIaXQgPSBfZmlsbEZ1bmNIaXQ7XG5TaGFwZS5wcm90b3R5cGUuX3N0cm9rZUZ1bmNIaXQgPSBfc3Ryb2tlRnVuY0hpdDtcblNoYXBlLnByb3RvdHlwZS5fY2VudHJvaWQgPSBmYWxzZTtcblNoYXBlLnByb3RvdHlwZS5ub2RlVHlwZSA9ICdTaGFwZSc7XG5fcmVnaXN0ZXJOb2RlKFNoYXBlKTtcblNoYXBlLnByb3RvdHlwZS5ldmVudExpc3RlbmVycyA9IHt9O1xuU2hhcGUucHJvdG90eXBlLm9uLmNhbGwoU2hhcGUucHJvdG90eXBlLCAnc2hhZG93Q29sb3JDaGFuZ2Uua29udmEgc2hhZG93Qmx1ckNoYW5nZS5rb252YSBzaGFkb3dPZmZzZXRDaGFuZ2Uua29udmEgc2hhZG93T3BhY2l0eUNoYW5nZS5rb252YSBzaGFkb3dFbmFibGVkQ2hhbmdlLmtvbnZhJywgX2NsZWFySGFzU2hhZG93Q2FjaGUpO1xuU2hhcGUucHJvdG90eXBlLm9uLmNhbGwoU2hhcGUucHJvdG90eXBlLCAnc2hhZG93Q29sb3JDaGFuZ2Uua29udmEgc2hhZG93T3BhY2l0eUNoYW5nZS5rb252YSBzaGFkb3dFbmFibGVkQ2hhbmdlLmtvbnZhJywgX2NsZWFyR2V0U2hhZG93UkdCQUNhY2hlKTtcblNoYXBlLnByb3RvdHlwZS5vbi5jYWxsKFNoYXBlLnByb3RvdHlwZSwgJ2ZpbGxQcmlvcml0eUNoYW5nZS5rb252YSBmaWxsUGF0dGVybkltYWdlQ2hhbmdlLmtvbnZhIGZpbGxQYXR0ZXJuUmVwZWF0Q2hhbmdlLmtvbnZhIGZpbGxQYXR0ZXJuU2NhbGVYQ2hhbmdlLmtvbnZhIGZpbGxQYXR0ZXJuU2NhbGVZQ2hhbmdlLmtvbnZhIGZpbGxQYXR0ZXJuT2Zmc2V0WENoYW5nZS5rb252YSBmaWxsUGF0dGVybk9mZnNldFlDaGFuZ2Uua29udmEgZmlsbFBhdHRlcm5YQ2hhbmdlLmtvbnZhIGZpbGxQYXR0ZXJuWUNoYW5nZS5rb252YSBmaWxsUGF0dGVyblJvdGF0aW9uQ2hhbmdlLmtvbnZhJywgX2NsZWFyRmlsbFBhdHRlcm5DYWNoZSk7XG5TaGFwZS5wcm90b3R5cGUub24uY2FsbChTaGFwZS5wcm90b3R5cGUsICdmaWxsUHJpb3JpdHlDaGFuZ2Uua29udmEgZmlsbExpbmVhckdyYWRpZW50Q29sb3JTdG9wc0NoYW5nZS5rb252YSBmaWxsTGluZWFyR3JhZGllbnRTdGFydFBvaW50WENoYW5nZS5rb252YSBmaWxsTGluZWFyR3JhZGllbnRTdGFydFBvaW50WUNoYW5nZS5rb252YSBmaWxsTGluZWFyR3JhZGllbnRFbmRQb2ludFhDaGFuZ2Uua29udmEgZmlsbExpbmVhckdyYWRpZW50RW5kUG9pbnRZQ2hhbmdlLmtvbnZhJywgX2NsZWFyTGluZWFyR3JhZGllbnRDYWNoZSk7XG5TaGFwZS5wcm90b3R5cGUub24uY2FsbChTaGFwZS5wcm90b3R5cGUsICdmaWxsUHJpb3JpdHlDaGFuZ2Uua29udmEgZmlsbFJhZGlhbEdyYWRpZW50Q29sb3JTdG9wc0NoYW5nZS5rb252YSBmaWxsUmFkaWFsR3JhZGllbnRTdGFydFBvaW50WENoYW5nZS5rb252YSBmaWxsUmFkaWFsR3JhZGllbnRTdGFydFBvaW50WUNoYW5nZS5rb252YSBmaWxsUmFkaWFsR3JhZGllbnRFbmRQb2ludFhDaGFuZ2Uua29udmEgZmlsbFJhZGlhbEdyYWRpZW50RW5kUG9pbnRZQ2hhbmdlLmtvbnZhIGZpbGxSYWRpYWxHcmFkaWVudFN0YXJ0UmFkaXVzQ2hhbmdlLmtvbnZhIGZpbGxSYWRpYWxHcmFkaWVudEVuZFJhZGl1c0NoYW5nZS5rb252YScsIF9jbGVhclJhZGlhbEdyYWRpZW50Q2FjaGUpO1xuRmFjdG9yeS5hZGRHZXR0ZXJTZXR0ZXIoU2hhcGUsICdzdHJva2UnLCB1bmRlZmluZWQsIGdldFN0cmluZ09yR3JhZGllbnRWYWxpZGF0b3IoKSk7XG5GYWN0b3J5LmFkZEdldHRlclNldHRlcihTaGFwZSwgJ3N0cm9rZVdpZHRoJywgMiwgZ2V0TnVtYmVyVmFsaWRhdG9yKCkpO1xuRmFjdG9yeS5hZGRHZXR0ZXJTZXR0ZXIoU2hhcGUsICdmaWxsQWZ0ZXJTdHJva2VFbmFibGVkJywgZmFsc2UpO1xuRmFjdG9yeS5hZGRHZXR0ZXJTZXR0ZXIoU2hhcGUsICdoaXRTdHJva2VXaWR0aCcsICdhdXRvJywgZ2V0TnVtYmVyT3JBdXRvVmFsaWRhdG9yKCkpO1xuRmFjdG9yeS5hZGRHZXR0ZXJTZXR0ZXIoU2hhcGUsICdzdHJva2VIaXRFbmFibGVkJywgdHJ1ZSwgZ2V0Qm9vbGVhblZhbGlkYXRvcigpKTtcbkZhY3RvcnkuYWRkR2V0dGVyU2V0dGVyKFNoYXBlLCAncGVyZmVjdERyYXdFbmFibGVkJywgdHJ1ZSwgZ2V0Qm9vbGVhblZhbGlkYXRvcigpKTtcbkZhY3RvcnkuYWRkR2V0dGVyU2V0dGVyKFNoYXBlLCAnc2hhZG93Rm9yU3Ryb2tlRW5hYmxlZCcsIHRydWUsIGdldEJvb2xlYW5WYWxpZGF0b3IoKSk7XG5GYWN0b3J5LmFkZEdldHRlclNldHRlcihTaGFwZSwgJ2xpbmVKb2luJyk7XG5GYWN0b3J5LmFkZEdldHRlclNldHRlcihTaGFwZSwgJ2xpbmVDYXAnKTtcbkZhY3RvcnkuYWRkR2V0dGVyU2V0dGVyKFNoYXBlLCAnc2NlbmVGdW5jJyk7XG5GYWN0b3J5LmFkZEdldHRlclNldHRlcihTaGFwZSwgJ2hpdEZ1bmMnKTtcbkZhY3RvcnkuYWRkR2V0dGVyU2V0dGVyKFNoYXBlLCAnZGFzaCcpO1xuRmFjdG9yeS5hZGRHZXR0ZXJTZXR0ZXIoU2hhcGUsICdkYXNoT2Zmc2V0JywgMCwgZ2V0TnVtYmVyVmFsaWRhdG9yKCkpO1xuRmFjdG9yeS5hZGRHZXR0ZXJTZXR0ZXIoU2hhcGUsICdzaGFkb3dDb2xvcicsIHVuZGVmaW5lZCwgZ2V0U3RyaW5nVmFsaWRhdG9yKCkpO1xuRmFjdG9yeS5hZGRHZXR0ZXJTZXR0ZXIoU2hhcGUsICdzaGFkb3dCbHVyJywgMCwgZ2V0TnVtYmVyVmFsaWRhdG9yKCkpO1xuRmFjdG9yeS5hZGRHZXR0ZXJTZXR0ZXIoU2hhcGUsICdzaGFkb3dPcGFjaXR5JywgMSwgZ2V0TnVtYmVyVmFsaWRhdG9yKCkpO1xuRmFjdG9yeS5hZGRDb21wb25lbnRzR2V0dGVyU2V0dGVyKFNoYXBlLCAnc2hhZG93T2Zmc2V0JywgWyd4JywgJ3knXSk7XG5GYWN0b3J5LmFkZEdldHRlclNldHRlcihTaGFwZSwgJ3NoYWRvd09mZnNldFgnLCAwLCBnZXROdW1iZXJWYWxpZGF0b3IoKSk7XG5GYWN0b3J5LmFkZEdldHRlclNldHRlcihTaGFwZSwgJ3NoYWRvd09mZnNldFknLCAwLCBnZXROdW1iZXJWYWxpZGF0b3IoKSk7XG5GYWN0b3J5LmFkZEdldHRlclNldHRlcihTaGFwZSwgJ2ZpbGxQYXR0ZXJuSW1hZ2UnKTtcbkZhY3RvcnkuYWRkR2V0dGVyU2V0dGVyKFNoYXBlLCAnZmlsbCcsIHVuZGVmaW5lZCwgZ2V0U3RyaW5nT3JHcmFkaWVudFZhbGlkYXRvcigpKTtcbkZhY3RvcnkuYWRkR2V0dGVyU2V0dGVyKFNoYXBlLCAnZmlsbFBhdHRlcm5YJywgMCwgZ2V0TnVtYmVyVmFsaWRhdG9yKCkpO1xuRmFjdG9yeS5hZGRHZXR0ZXJTZXR0ZXIoU2hhcGUsICdmaWxsUGF0dGVyblknLCAwLCBnZXROdW1iZXJWYWxpZGF0b3IoKSk7XG5GYWN0b3J5LmFkZEdldHRlclNldHRlcihTaGFwZSwgJ2ZpbGxMaW5lYXJHcmFkaWVudENvbG9yU3RvcHMnKTtcbkZhY3RvcnkuYWRkR2V0dGVyU2V0dGVyKFNoYXBlLCAnc3Ryb2tlTGluZWFyR3JhZGllbnRDb2xvclN0b3BzJyk7XG5GYWN0b3J5LmFkZEdldHRlclNldHRlcihTaGFwZSwgJ2ZpbGxSYWRpYWxHcmFkaWVudFN0YXJ0UmFkaXVzJywgMCk7XG5GYWN0b3J5LmFkZEdldHRlclNldHRlcihTaGFwZSwgJ2ZpbGxSYWRpYWxHcmFkaWVudEVuZFJhZGl1cycsIDApO1xuRmFjdG9yeS5hZGRHZXR0ZXJTZXR0ZXIoU2hhcGUsICdmaWxsUmFkaWFsR3JhZGllbnRDb2xvclN0b3BzJyk7XG5GYWN0b3J5LmFkZEdldHRlclNldHRlcihTaGFwZSwgJ2ZpbGxQYXR0ZXJuUmVwZWF0JywgJ3JlcGVhdCcpO1xuRmFjdG9yeS5hZGRHZXR0ZXJTZXR0ZXIoU2hhcGUsICdmaWxsRW5hYmxlZCcsIHRydWUpO1xuRmFjdG9yeS5hZGRHZXR0ZXJTZXR0ZXIoU2hhcGUsICdzdHJva2VFbmFibGVkJywgdHJ1ZSk7XG5GYWN0b3J5LmFkZEdldHRlclNldHRlcihTaGFwZSwgJ3NoYWRvd0VuYWJsZWQnLCB0cnVlKTtcbkZhY3RvcnkuYWRkR2V0dGVyU2V0dGVyKFNoYXBlLCAnZGFzaEVuYWJsZWQnLCB0cnVlKTtcbkZhY3RvcnkuYWRkR2V0dGVyU2V0dGVyKFNoYXBlLCAnc3Ryb2tlU2NhbGVFbmFibGVkJywgdHJ1ZSk7XG5GYWN0b3J5LmFkZEdldHRlclNldHRlcihTaGFwZSwgJ2ZpbGxQcmlvcml0eScsICdjb2xvcicpO1xuRmFjdG9yeS5hZGRDb21wb25lbnRzR2V0dGVyU2V0dGVyKFNoYXBlLCAnZmlsbFBhdHRlcm5PZmZzZXQnLCBbJ3gnLCAneSddKTtcbkZhY3RvcnkuYWRkR2V0dGVyU2V0dGVyKFNoYXBlLCAnZmlsbFBhdHRlcm5PZmZzZXRYJywgMCwgZ2V0TnVtYmVyVmFsaWRhdG9yKCkpO1xuRmFjdG9yeS5hZGRHZXR0ZXJTZXR0ZXIoU2hhcGUsICdmaWxsUGF0dGVybk9mZnNldFknLCAwLCBnZXROdW1iZXJWYWxpZGF0b3IoKSk7XG5GYWN0b3J5LmFkZENvbXBvbmVudHNHZXR0ZXJTZXR0ZXIoU2hhcGUsICdmaWxsUGF0dGVyblNjYWxlJywgWyd4JywgJ3knXSk7XG5GYWN0b3J5LmFkZEdldHRlclNldHRlcihTaGFwZSwgJ2ZpbGxQYXR0ZXJuU2NhbGVYJywgMSwgZ2V0TnVtYmVyVmFsaWRhdG9yKCkpO1xuRmFjdG9yeS5hZGRHZXR0ZXJTZXR0ZXIoU2hhcGUsICdmaWxsUGF0dGVyblNjYWxlWScsIDEsIGdldE51bWJlclZhbGlkYXRvcigpKTtcbkZhY3RvcnkuYWRkQ29tcG9uZW50c0dldHRlclNldHRlcihTaGFwZSwgJ2ZpbGxMaW5lYXJHcmFkaWVudFN0YXJ0UG9pbnQnLCBbXG4gICAgJ3gnLFxuICAgICd5Jyxcbl0pO1xuRmFjdG9yeS5hZGRDb21wb25lbnRzR2V0dGVyU2V0dGVyKFNoYXBlLCAnc3Ryb2tlTGluZWFyR3JhZGllbnRTdGFydFBvaW50JywgW1xuICAgICd4JyxcbiAgICAneScsXG5dKTtcbkZhY3RvcnkuYWRkR2V0dGVyU2V0dGVyKFNoYXBlLCAnZmlsbExpbmVhckdyYWRpZW50U3RhcnRQb2ludFgnLCAwKTtcbkZhY3RvcnkuYWRkR2V0dGVyU2V0dGVyKFNoYXBlLCAnc3Ryb2tlTGluZWFyR3JhZGllbnRTdGFydFBvaW50WCcsIDApO1xuRmFjdG9yeS5hZGRHZXR0ZXJTZXR0ZXIoU2hhcGUsICdmaWxsTGluZWFyR3JhZGllbnRTdGFydFBvaW50WScsIDApO1xuRmFjdG9yeS5hZGRHZXR0ZXJTZXR0ZXIoU2hhcGUsICdzdHJva2VMaW5lYXJHcmFkaWVudFN0YXJ0UG9pbnRZJywgMCk7XG5GYWN0b3J5LmFkZENvbXBvbmVudHNHZXR0ZXJTZXR0ZXIoU2hhcGUsICdmaWxsTGluZWFyR3JhZGllbnRFbmRQb2ludCcsIFtcbiAgICAneCcsXG4gICAgJ3knLFxuXSk7XG5GYWN0b3J5LmFkZENvbXBvbmVudHNHZXR0ZXJTZXR0ZXIoU2hhcGUsICdzdHJva2VMaW5lYXJHcmFkaWVudEVuZFBvaW50JywgW1xuICAgICd4JyxcbiAgICAneScsXG5dKTtcbkZhY3RvcnkuYWRkR2V0dGVyU2V0dGVyKFNoYXBlLCAnZmlsbExpbmVhckdyYWRpZW50RW5kUG9pbnRYJywgMCk7XG5GYWN0b3J5LmFkZEdldHRlclNldHRlcihTaGFwZSwgJ3N0cm9rZUxpbmVhckdyYWRpZW50RW5kUG9pbnRYJywgMCk7XG5GYWN0b3J5LmFkZEdldHRlclNldHRlcihTaGFwZSwgJ2ZpbGxMaW5lYXJHcmFkaWVudEVuZFBvaW50WScsIDApO1xuRmFjdG9yeS5hZGRHZXR0ZXJTZXR0ZXIoU2hhcGUsICdzdHJva2VMaW5lYXJHcmFkaWVudEVuZFBvaW50WScsIDApO1xuRmFjdG9yeS5hZGRDb21wb25lbnRzR2V0dGVyU2V0dGVyKFNoYXBlLCAnZmlsbFJhZGlhbEdyYWRpZW50U3RhcnRQb2ludCcsIFtcbiAgICAneCcsXG4gICAgJ3knLFxuXSk7XG5GYWN0b3J5LmFkZEdldHRlclNldHRlcihTaGFwZSwgJ2ZpbGxSYWRpYWxHcmFkaWVudFN0YXJ0UG9pbnRYJywgMCk7XG5GYWN0b3J5LmFkZEdldHRlclNldHRlcihTaGFwZSwgJ2ZpbGxSYWRpYWxHcmFkaWVudFN0YXJ0UG9pbnRZJywgMCk7XG5GYWN0b3J5LmFkZENvbXBvbmVudHNHZXR0ZXJTZXR0ZXIoU2hhcGUsICdmaWxsUmFkaWFsR3JhZGllbnRFbmRQb2ludCcsIFtcbiAgICAneCcsXG4gICAgJ3knLFxuXSk7XG5GYWN0b3J5LmFkZEdldHRlclNldHRlcihTaGFwZSwgJ2ZpbGxSYWRpYWxHcmFkaWVudEVuZFBvaW50WCcsIDApO1xuRmFjdG9yeS5hZGRHZXR0ZXJTZXR0ZXIoU2hhcGUsICdmaWxsUmFkaWFsR3JhZGllbnRFbmRQb2ludFknLCAwKTtcbkZhY3RvcnkuYWRkR2V0dGVyU2V0dGVyKFNoYXBlLCAnZmlsbFBhdHRlcm5Sb3RhdGlvbicsIDApO1xuRmFjdG9yeS5iYWNrQ29tcGF0KFNoYXBlLCB7XG4gICAgZGFzaEFycmF5OiAnZGFzaCcsXG4gICAgZ2V0RGFzaEFycmF5OiAnZ2V0RGFzaCcsXG4gICAgc2V0RGFzaEFycmF5OiAnZ2V0RGFzaCcsXG4gICAgZHJhd0Z1bmM6ICdzY2VuZUZ1bmMnLFxuICAgIGdldERyYXdGdW5jOiAnZ2V0U2NlbmVGdW5jJyxcbiAgICBzZXREcmF3RnVuYzogJ3NldFNjZW5lRnVuYycsXG4gICAgZHJhd0hpdEZ1bmM6ICdoaXRGdW5jJyxcbiAgICBnZXREcmF3SGl0RnVuYzogJ2dldEhpdEZ1bmMnLFxuICAgIHNldERyYXdIaXRGdW5jOiAnc2V0SGl0RnVuYycsXG59KTtcbiIsImltcG9ydCB7IFV0aWwgfSBmcm9tICcuL1V0aWwuanMnO1xuaW1wb3J0IHsgRmFjdG9yeSB9IGZyb20gJy4vRmFjdG9yeS5qcyc7XG5pbXBvcnQgeyBDb250YWluZXIgfSBmcm9tICcuL0NvbnRhaW5lci5qcyc7XG5pbXBvcnQgeyBLb252YSB9IGZyb20gJy4vR2xvYmFsLmpzJztcbmltcG9ydCB7IFNjZW5lQ2FudmFzLCBIaXRDYW52YXMgfSBmcm9tICcuL0NhbnZhcy5qcyc7XG5pbXBvcnQgeyBERCB9IGZyb20gJy4vRHJhZ0FuZERyb3AuanMnO1xuaW1wb3J0IHsgX3JlZ2lzdGVyTm9kZSB9IGZyb20gJy4vR2xvYmFsLmpzJztcbmltcG9ydCAqIGFzIFBvaW50ZXJFdmVudHMgZnJvbSAnLi9Qb2ludGVyRXZlbnRzLmpzJztcbnZhciBTVEFHRSA9ICdTdGFnZScsIFNUUklORyA9ICdzdHJpbmcnLCBQWCA9ICdweCcsIE1PVVNFT1VUID0gJ21vdXNlb3V0JywgTU9VU0VMRUFWRSA9ICdtb3VzZWxlYXZlJywgTU9VU0VPVkVSID0gJ21vdXNlb3ZlcicsIE1PVVNFRU5URVIgPSAnbW91c2VlbnRlcicsIE1PVVNFTU9WRSA9ICdtb3VzZW1vdmUnLCBNT1VTRURPV04gPSAnbW91c2Vkb3duJywgTU9VU0VVUCA9ICdtb3VzZXVwJywgUE9JTlRFUk1PVkUgPSAncG9pbnRlcm1vdmUnLCBQT0lOVEVSRE9XTiA9ICdwb2ludGVyZG93bicsIFBPSU5URVJVUCA9ICdwb2ludGVydXAnLCBQT0lOVEVSQ0FOQ0VMID0gJ3BvaW50ZXJjYW5jZWwnLCBMT1NUUE9JTlRFUkNBUFRVUkUgPSAnbG9zdHBvaW50ZXJjYXB0dXJlJywgUE9JTlRFUk9VVCA9ICdwb2ludGVyb3V0JywgUE9JTlRFUkxFQVZFID0gJ3BvaW50ZXJsZWF2ZScsIFBPSU5URVJPVkVSID0gJ3BvaW50ZXJvdmVyJywgUE9JTlRFUkVOVEVSID0gJ3BvaW50ZXJlbnRlcicsIENPTlRFWFRNRU5VID0gJ2NvbnRleHRtZW51JywgVE9VQ0hTVEFSVCA9ICd0b3VjaHN0YXJ0JywgVE9VQ0hFTkQgPSAndG91Y2hlbmQnLCBUT1VDSE1PVkUgPSAndG91Y2htb3ZlJywgVE9VQ0hDQU5DRUwgPSAndG91Y2hjYW5jZWwnLCBXSEVFTCA9ICd3aGVlbCcsIE1BWF9MQVlFUlNfTlVNQkVSID0gNSwgRVZFTlRTID0gW1xuICAgIFtNT1VTRUVOVEVSLCAnX3BvaW50ZXJlbnRlciddLFxuICAgIFtNT1VTRURPV04sICdfcG9pbnRlcmRvd24nXSxcbiAgICBbTU9VU0VNT1ZFLCAnX3BvaW50ZXJtb3ZlJ10sXG4gICAgW01PVVNFVVAsICdfcG9pbnRlcnVwJ10sXG4gICAgW01PVVNFTEVBVkUsICdfcG9pbnRlcmxlYXZlJ10sXG4gICAgW1RPVUNIU1RBUlQsICdfcG9pbnRlcmRvd24nXSxcbiAgICBbVE9VQ0hNT1ZFLCAnX3BvaW50ZXJtb3ZlJ10sXG4gICAgW1RPVUNIRU5ELCAnX3BvaW50ZXJ1cCddLFxuICAgIFtUT1VDSENBTkNFTCwgJ19wb2ludGVyY2FuY2VsJ10sXG4gICAgW01PVVNFT1ZFUiwgJ19wb2ludGVyb3ZlciddLFxuICAgIFtXSEVFTCwgJ193aGVlbCddLFxuICAgIFtDT05URVhUTUVOVSwgJ19jb250ZXh0bWVudSddLFxuICAgIFtQT0lOVEVSRE9XTiwgJ19wb2ludGVyZG93biddLFxuICAgIFtQT0lOVEVSTU9WRSwgJ19wb2ludGVybW92ZSddLFxuICAgIFtQT0lOVEVSVVAsICdfcG9pbnRlcnVwJ10sXG4gICAgW1BPSU5URVJDQU5DRUwsICdfcG9pbnRlcmNhbmNlbCddLFxuICAgIFtMT1NUUE9JTlRFUkNBUFRVUkUsICdfbG9zdHBvaW50ZXJjYXB0dXJlJ10sXG5dO1xuY29uc3QgRVZFTlRTX01BUCA9IHtcbiAgICBtb3VzZToge1xuICAgICAgICBbUE9JTlRFUk9VVF06IE1PVVNFT1VULFxuICAgICAgICBbUE9JTlRFUkxFQVZFXTogTU9VU0VMRUFWRSxcbiAgICAgICAgW1BPSU5URVJPVkVSXTogTU9VU0VPVkVSLFxuICAgICAgICBbUE9JTlRFUkVOVEVSXTogTU9VU0VFTlRFUixcbiAgICAgICAgW1BPSU5URVJNT1ZFXTogTU9VU0VNT1ZFLFxuICAgICAgICBbUE9JTlRFUkRPV05dOiBNT1VTRURPV04sXG4gICAgICAgIFtQT0lOVEVSVVBdOiBNT1VTRVVQLFxuICAgICAgICBbUE9JTlRFUkNBTkNFTF06ICdtb3VzZWNhbmNlbCcsXG4gICAgICAgIHBvaW50ZXJjbGljazogJ2NsaWNrJyxcbiAgICAgICAgcG9pbnRlcmRibGNsaWNrOiAnZGJsY2xpY2snLFxuICAgIH0sXG4gICAgdG91Y2g6IHtcbiAgICAgICAgW1BPSU5URVJPVVRdOiAndG91Y2hvdXQnLFxuICAgICAgICBbUE9JTlRFUkxFQVZFXTogJ3RvdWNobGVhdmUnLFxuICAgICAgICBbUE9JTlRFUk9WRVJdOiAndG91Y2hvdmVyJyxcbiAgICAgICAgW1BPSU5URVJFTlRFUl06ICd0b3VjaGVudGVyJyxcbiAgICAgICAgW1BPSU5URVJNT1ZFXTogVE9VQ0hNT1ZFLFxuICAgICAgICBbUE9JTlRFUkRPV05dOiBUT1VDSFNUQVJULFxuICAgICAgICBbUE9JTlRFUlVQXTogVE9VQ0hFTkQsXG4gICAgICAgIFtQT0lOVEVSQ0FOQ0VMXTogVE9VQ0hDQU5DRUwsXG4gICAgICAgIHBvaW50ZXJjbGljazogJ3RhcCcsXG4gICAgICAgIHBvaW50ZXJkYmxjbGljazogJ2RibHRhcCcsXG4gICAgfSxcbiAgICBwb2ludGVyOiB7XG4gICAgICAgIFtQT0lOVEVST1VUXTogUE9JTlRFUk9VVCxcbiAgICAgICAgW1BPSU5URVJMRUFWRV06IFBPSU5URVJMRUFWRSxcbiAgICAgICAgW1BPSU5URVJPVkVSXTogUE9JTlRFUk9WRVIsXG4gICAgICAgIFtQT0lOVEVSRU5URVJdOiBQT0lOVEVSRU5URVIsXG4gICAgICAgIFtQT0lOVEVSTU9WRV06IFBPSU5URVJNT1ZFLFxuICAgICAgICBbUE9JTlRFUkRPV05dOiBQT0lOVEVSRE9XTixcbiAgICAgICAgW1BPSU5URVJVUF06IFBPSU5URVJVUCxcbiAgICAgICAgW1BPSU5URVJDQU5DRUxdOiBQT0lOVEVSQ0FOQ0VMLFxuICAgICAgICBwb2ludGVyY2xpY2s6ICdwb2ludGVyY2xpY2snLFxuICAgICAgICBwb2ludGVyZGJsY2xpY2s6ICdwb2ludGVyZGJsY2xpY2snLFxuICAgIH0sXG59O1xuY29uc3QgZ2V0RXZlbnRUeXBlID0gKHR5cGUpID0+IHtcbiAgICBpZiAodHlwZS5pbmRleE9mKCdwb2ludGVyJykgPj0gMCkge1xuICAgICAgICByZXR1cm4gJ3BvaW50ZXInO1xuICAgIH1cbiAgICBpZiAodHlwZS5pbmRleE9mKCd0b3VjaCcpID49IDApIHtcbiAgICAgICAgcmV0dXJuICd0b3VjaCc7XG4gICAgfVxuICAgIHJldHVybiAnbW91c2UnO1xufTtcbmNvbnN0IGdldEV2ZW50c01hcCA9IChldmVudFR5cGUpID0+IHtcbiAgICBjb25zdCB0eXBlID0gZ2V0RXZlbnRUeXBlKGV2ZW50VHlwZSk7XG4gICAgaWYgKHR5cGUgPT09ICdwb2ludGVyJykge1xuICAgICAgICByZXR1cm4gS29udmEucG9pbnRlckV2ZW50c0VuYWJsZWQgJiYgRVZFTlRTX01BUC5wb2ludGVyO1xuICAgIH1cbiAgICBpZiAodHlwZSA9PT0gJ3RvdWNoJykge1xuICAgICAgICByZXR1cm4gRVZFTlRTX01BUC50b3VjaDtcbiAgICB9XG4gICAgaWYgKHR5cGUgPT09ICdtb3VzZScpIHtcbiAgICAgICAgcmV0dXJuIEVWRU5UU19NQVAubW91c2U7XG4gICAgfVxufTtcbmZ1bmN0aW9uIGNoZWNrTm9DbGlwKGF0dHJzID0ge30pIHtcbiAgICBpZiAoYXR0cnMuY2xpcEZ1bmMgfHwgYXR0cnMuY2xpcFdpZHRoIHx8IGF0dHJzLmNsaXBIZWlnaHQpIHtcbiAgICAgICAgVXRpbC53YXJuKCdTdGFnZSBkb2VzIG5vdCBzdXBwb3J0IGNsaXBwaW5nLiBQbGVhc2UgdXNlIGNsaXAgZm9yIExheWVycyBvciBHcm91cHMuJyk7XG4gICAgfVxuICAgIHJldHVybiBhdHRycztcbn1cbmNvbnN0IE5PX1BPSU5URVJTX01FU1NBR0UgPSBgUG9pbnRlciBwb3NpdGlvbiBpcyBtaXNzaW5nIGFuZCBub3QgcmVnaXN0ZXJlZCBieSB0aGUgc3RhZ2UuIExvb2tzIGxpa2UgaXQgaXMgb3V0c2lkZSBvZiB0aGUgc3RhZ2UgY29udGFpbmVyLiBZb3UgY2FuIHNldCBpdCBtYW51YWxseSBmcm9tIGV2ZW50OiBzdGFnZS5zZXRQb2ludGVyc1Bvc2l0aW9ucyhldmVudCk7YDtcbmV4cG9ydCBjb25zdCBzdGFnZXMgPSBbXTtcbmV4cG9ydCBjbGFzcyBTdGFnZSBleHRlbmRzIENvbnRhaW5lciB7XG4gICAgY29uc3RydWN0b3IoY29uZmlnKSB7XG4gICAgICAgIHN1cGVyKGNoZWNrTm9DbGlwKGNvbmZpZykpO1xuICAgICAgICB0aGlzLl9wb2ludGVyUG9zaXRpb25zID0gW107XG4gICAgICAgIHRoaXMuX2NoYW5nZWRQb2ludGVyUG9zaXRpb25zID0gW107XG4gICAgICAgIHRoaXMuX2J1aWxkRE9NKCk7XG4gICAgICAgIHRoaXMuX2JpbmRDb250ZW50RXZlbnRzKCk7XG4gICAgICAgIHN0YWdlcy5wdXNoKHRoaXMpO1xuICAgICAgICB0aGlzLm9uKCd3aWR0aENoYW5nZS5rb252YSBoZWlnaHRDaGFuZ2Uua29udmEnLCB0aGlzLl9yZXNpemVET00pO1xuICAgICAgICB0aGlzLm9uKCd2aXNpYmxlQ2hhbmdlLmtvbnZhJywgdGhpcy5fY2hlY2tWaXNpYmlsaXR5KTtcbiAgICAgICAgdGhpcy5vbignY2xpcFdpZHRoQ2hhbmdlLmtvbnZhIGNsaXBIZWlnaHRDaGFuZ2Uua29udmEgY2xpcEZ1bmNDaGFuZ2Uua29udmEnLCAoKSA9PiB7XG4gICAgICAgICAgICBjaGVja05vQ2xpcCh0aGlzLmF0dHJzKTtcbiAgICAgICAgfSk7XG4gICAgICAgIHRoaXMuX2NoZWNrVmlzaWJpbGl0eSgpO1xuICAgIH1cbiAgICBfdmFsaWRhdGVBZGQoY2hpbGQpIHtcbiAgICAgICAgY29uc3QgaXNMYXllciA9IGNoaWxkLmdldFR5cGUoKSA9PT0gJ0xheWVyJztcbiAgICAgICAgY29uc3QgaXNGYXN0TGF5ZXIgPSBjaGlsZC5nZXRUeXBlKCkgPT09ICdGYXN0TGF5ZXInO1xuICAgICAgICBjb25zdCB2YWxpZCA9IGlzTGF5ZXIgfHwgaXNGYXN0TGF5ZXI7XG4gICAgICAgIGlmICghdmFsaWQpIHtcbiAgICAgICAgICAgIFV0aWwudGhyb3coJ1lvdSBtYXkgb25seSBhZGQgbGF5ZXJzIHRvIHRoZSBzdGFnZS4nKTtcbiAgICAgICAgfVxuICAgIH1cbiAgICBfY2hlY2tWaXNpYmlsaXR5KCkge1xuICAgICAgICBpZiAoIXRoaXMuY29udGVudCkge1xuICAgICAgICAgICAgcmV0dXJuO1xuICAgICAgICB9XG4gICAgICAgIGNvbnN0IHN0eWxlID0gdGhpcy52aXNpYmxlKCkgPyAnJyA6ICdub25lJztcbiAgICAgICAgdGhpcy5jb250ZW50LnN0eWxlLmRpc3BsYXkgPSBzdHlsZTtcbiAgICB9XG4gICAgc2V0Q29udGFpbmVyKGNvbnRhaW5lcikge1xuICAgICAgICBpZiAodHlwZW9mIGNvbnRhaW5lciA9PT0gU1RSSU5HKSB7XG4gICAgICAgICAgICBpZiAoY29udGFpbmVyLmNoYXJBdCgwKSA9PT0gJy4nKSB7XG4gICAgICAgICAgICAgICAgdmFyIGNsYXNzTmFtZSA9IGNvbnRhaW5lci5zbGljZSgxKTtcbiAgICAgICAgICAgICAgICBjb250YWluZXIgPSBkb2N1bWVudC5nZXRFbGVtZW50c0J5Q2xhc3NOYW1lKGNsYXNzTmFtZSlbMF07XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBlbHNlIHtcbiAgICAgICAgICAgICAgICB2YXIgaWQ7XG4gICAgICAgICAgICAgICAgaWYgKGNvbnRhaW5lci5jaGFyQXQoMCkgIT09ICcjJykge1xuICAgICAgICAgICAgICAgICAgICBpZCA9IGNvbnRhaW5lcjtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgZWxzZSB7XG4gICAgICAgICAgICAgICAgICAgIGlkID0gY29udGFpbmVyLnNsaWNlKDEpO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICBjb250YWluZXIgPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZChpZCk7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBpZiAoIWNvbnRhaW5lcikge1xuICAgICAgICAgICAgICAgIHRocm93ICdDYW4gbm90IGZpbmQgY29udGFpbmVyIGluIGRvY3VtZW50IHdpdGggaWQgJyArIGlkO1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICAgIHRoaXMuX3NldEF0dHIoJ2NvbnRhaW5lcicsIGNvbnRhaW5lcik7XG4gICAgICAgIGlmICh0aGlzLmNvbnRlbnQpIHtcbiAgICAgICAgICAgIGlmICh0aGlzLmNvbnRlbnQucGFyZW50RWxlbWVudCkge1xuICAgICAgICAgICAgICAgIHRoaXMuY29udGVudC5wYXJlbnRFbGVtZW50LnJlbW92ZUNoaWxkKHRoaXMuY29udGVudCk7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBjb250YWluZXIuYXBwZW5kQ2hpbGQodGhpcy5jb250ZW50KTtcbiAgICAgICAgfVxuICAgICAgICByZXR1cm4gdGhpcztcbiAgICB9XG4gICAgc2hvdWxkRHJhd0hpdCgpIHtcbiAgICAgICAgcmV0dXJuIHRydWU7XG4gICAgfVxuICAgIGNsZWFyKCkge1xuICAgICAgICB2YXIgbGF5ZXJzID0gdGhpcy5jaGlsZHJlbiwgbGVuID0gbGF5ZXJzLmxlbmd0aCwgbjtcbiAgICAgICAgZm9yIChuID0gMDsgbiA8IGxlbjsgbisrKSB7XG4gICAgICAgICAgICBsYXllcnNbbl0uY2xlYXIoKTtcbiAgICAgICAgfVxuICAgICAgICByZXR1cm4gdGhpcztcbiAgICB9XG4gICAgY2xvbmUob2JqKSB7XG4gICAgICAgIGlmICghb2JqKSB7XG4gICAgICAgICAgICBvYmogPSB7fTtcbiAgICAgICAgfVxuICAgICAgICBvYmouY29udGFpbmVyID1cbiAgICAgICAgICAgIHR5cGVvZiBkb2N1bWVudCAhPT0gJ3VuZGVmaW5lZCcgJiYgZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnZGl2Jyk7XG4gICAgICAgIHJldHVybiBDb250YWluZXIucHJvdG90eXBlLmNsb25lLmNhbGwodGhpcywgb2JqKTtcbiAgICB9XG4gICAgZGVzdHJveSgpIHtcbiAgICAgICAgc3VwZXIuZGVzdHJveSgpO1xuICAgICAgICB2YXIgY29udGVudCA9IHRoaXMuY29udGVudDtcbiAgICAgICAgaWYgKGNvbnRlbnQgJiYgVXRpbC5faXNJbkRvY3VtZW50KGNvbnRlbnQpKSB7XG4gICAgICAgICAgICB0aGlzLmNvbnRhaW5lcigpLnJlbW92ZUNoaWxkKGNvbnRlbnQpO1xuICAgICAgICB9XG4gICAgICAgIHZhciBpbmRleCA9IHN0YWdlcy5pbmRleE9mKHRoaXMpO1xuICAgICAgICBpZiAoaW5kZXggPiAtMSkge1xuICAgICAgICAgICAgc3RhZ2VzLnNwbGljZShpbmRleCwgMSk7XG4gICAgICAgIH1cbiAgICAgICAgVXRpbC5yZWxlYXNlQ2FudmFzKHRoaXMuYnVmZmVyQ2FudmFzLl9jYW52YXMsIHRoaXMuYnVmZmVySGl0Q2FudmFzLl9jYW52YXMpO1xuICAgICAgICByZXR1cm4gdGhpcztcbiAgICB9XG4gICAgZ2V0UG9pbnRlclBvc2l0aW9uKCkge1xuICAgICAgICBjb25zdCBwb3MgPSB0aGlzLl9wb2ludGVyUG9zaXRpb25zWzBdIHx8IHRoaXMuX2NoYW5nZWRQb2ludGVyUG9zaXRpb25zWzBdO1xuICAgICAgICBpZiAoIXBvcykge1xuICAgICAgICAgICAgVXRpbC53YXJuKE5PX1BPSU5URVJTX01FU1NBR0UpO1xuICAgICAgICAgICAgcmV0dXJuIG51bGw7XG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuIHtcbiAgICAgICAgICAgIHg6IHBvcy54LFxuICAgICAgICAgICAgeTogcG9zLnksXG4gICAgICAgIH07XG4gICAgfVxuICAgIF9nZXRQb2ludGVyQnlJZChpZCkge1xuICAgICAgICByZXR1cm4gdGhpcy5fcG9pbnRlclBvc2l0aW9ucy5maW5kKChwKSA9PiBwLmlkID09PSBpZCk7XG4gICAgfVxuICAgIGdldFBvaW50ZXJzUG9zaXRpb25zKCkge1xuICAgICAgICByZXR1cm4gdGhpcy5fcG9pbnRlclBvc2l0aW9ucztcbiAgICB9XG4gICAgZ2V0U3RhZ2UoKSB7XG4gICAgICAgIHJldHVybiB0aGlzO1xuICAgIH1cbiAgICBnZXRDb250ZW50KCkge1xuICAgICAgICByZXR1cm4gdGhpcy5jb250ZW50O1xuICAgIH1cbiAgICBfdG9Lb252YUNhbnZhcyhjb25maWcpIHtcbiAgICAgICAgY29uZmlnID0gY29uZmlnIHx8IHt9O1xuICAgICAgICBjb25maWcueCA9IGNvbmZpZy54IHx8IDA7XG4gICAgICAgIGNvbmZpZy55ID0gY29uZmlnLnkgfHwgMDtcbiAgICAgICAgY29uZmlnLndpZHRoID0gY29uZmlnLndpZHRoIHx8IHRoaXMud2lkdGgoKTtcbiAgICAgICAgY29uZmlnLmhlaWdodCA9IGNvbmZpZy5oZWlnaHQgfHwgdGhpcy5oZWlnaHQoKTtcbiAgICAgICAgdmFyIGNhbnZhcyA9IG5ldyBTY2VuZUNhbnZhcyh7XG4gICAgICAgICAgICB3aWR0aDogY29uZmlnLndpZHRoLFxuICAgICAgICAgICAgaGVpZ2h0OiBjb25maWcuaGVpZ2h0LFxuICAgICAgICAgICAgcGl4ZWxSYXRpbzogY29uZmlnLnBpeGVsUmF0aW8gfHwgMSxcbiAgICAgICAgfSk7XG4gICAgICAgIHZhciBfY29udGV4dCA9IGNhbnZhcy5nZXRDb250ZXh0KCkuX2NvbnRleHQ7XG4gICAgICAgIHZhciBsYXllcnMgPSB0aGlzLmNoaWxkcmVuO1xuICAgICAgICBpZiAoY29uZmlnLnggfHwgY29uZmlnLnkpIHtcbiAgICAgICAgICAgIF9jb250ZXh0LnRyYW5zbGF0ZSgtMSAqIGNvbmZpZy54LCAtMSAqIGNvbmZpZy55KTtcbiAgICAgICAgfVxuICAgICAgICBsYXllcnMuZm9yRWFjaChmdW5jdGlvbiAobGF5ZXIpIHtcbiAgICAgICAgICAgIGlmICghbGF5ZXIuaXNWaXNpYmxlKCkpIHtcbiAgICAgICAgICAgICAgICByZXR1cm47XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICB2YXIgbGF5ZXJDYW52YXMgPSBsYXllci5fdG9Lb252YUNhbnZhcyhjb25maWcpO1xuICAgICAgICAgICAgX2NvbnRleHQuZHJhd0ltYWdlKGxheWVyQ2FudmFzLl9jYW52YXMsIGNvbmZpZy54LCBjb25maWcueSwgbGF5ZXJDYW52YXMuZ2V0V2lkdGgoKSAvIGxheWVyQ2FudmFzLmdldFBpeGVsUmF0aW8oKSwgbGF5ZXJDYW52YXMuZ2V0SGVpZ2h0KCkgLyBsYXllckNhbnZhcy5nZXRQaXhlbFJhdGlvKCkpO1xuICAgICAgICB9KTtcbiAgICAgICAgcmV0dXJuIGNhbnZhcztcbiAgICB9XG4gICAgZ2V0SW50ZXJzZWN0aW9uKHBvcykge1xuICAgICAgICBpZiAoIXBvcykge1xuICAgICAgICAgICAgcmV0dXJuIG51bGw7XG4gICAgICAgIH1cbiAgICAgICAgdmFyIGxheWVycyA9IHRoaXMuY2hpbGRyZW4sIGxlbiA9IGxheWVycy5sZW5ndGgsIGVuZCA9IGxlbiAtIDEsIG47XG4gICAgICAgIGZvciAobiA9IGVuZDsgbiA+PSAwOyBuLS0pIHtcbiAgICAgICAgICAgIGNvbnN0IHNoYXBlID0gbGF5ZXJzW25dLmdldEludGVyc2VjdGlvbihwb3MpO1xuICAgICAgICAgICAgaWYgKHNoYXBlKSB7XG4gICAgICAgICAgICAgICAgcmV0dXJuIHNoYXBlO1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICAgIHJldHVybiBudWxsO1xuICAgIH1cbiAgICBfcmVzaXplRE9NKCkge1xuICAgICAgICB2YXIgd2lkdGggPSB0aGlzLndpZHRoKCk7XG4gICAgICAgIHZhciBoZWlnaHQgPSB0aGlzLmhlaWdodCgpO1xuICAgICAgICBpZiAodGhpcy5jb250ZW50KSB7XG4gICAgICAgICAgICB0aGlzLmNvbnRlbnQuc3R5bGUud2lkdGggPSB3aWR0aCArIFBYO1xuICAgICAgICAgICAgdGhpcy5jb250ZW50LnN0eWxlLmhlaWdodCA9IGhlaWdodCArIFBYO1xuICAgICAgICB9XG4gICAgICAgIHRoaXMuYnVmZmVyQ2FudmFzLnNldFNpemUod2lkdGgsIGhlaWdodCk7XG4gICAgICAgIHRoaXMuYnVmZmVySGl0Q2FudmFzLnNldFNpemUod2lkdGgsIGhlaWdodCk7XG4gICAgICAgIHRoaXMuY2hpbGRyZW4uZm9yRWFjaCgobGF5ZXIpID0+IHtcbiAgICAgICAgICAgIGxheWVyLnNldFNpemUoeyB3aWR0aCwgaGVpZ2h0IH0pO1xuICAgICAgICAgICAgbGF5ZXIuZHJhdygpO1xuICAgICAgICB9KTtcbiAgICB9XG4gICAgYWRkKGxheWVyLCAuLi5yZXN0KSB7XG4gICAgICAgIGlmIChhcmd1bWVudHMubGVuZ3RoID4gMSkge1xuICAgICAgICAgICAgZm9yICh2YXIgaSA9IDA7IGkgPCBhcmd1bWVudHMubGVuZ3RoOyBpKyspIHtcbiAgICAgICAgICAgICAgICB0aGlzLmFkZChhcmd1bWVudHNbaV0pO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgcmV0dXJuIHRoaXM7XG4gICAgICAgIH1cbiAgICAgICAgc3VwZXIuYWRkKGxheWVyKTtcbiAgICAgICAgdmFyIGxlbmd0aCA9IHRoaXMuY2hpbGRyZW4ubGVuZ3RoO1xuICAgICAgICBpZiAobGVuZ3RoID4gTUFYX0xBWUVSU19OVU1CRVIpIHtcbiAgICAgICAgICAgIFV0aWwud2FybignVGhlIHN0YWdlIGhhcyAnICtcbiAgICAgICAgICAgICAgICBsZW5ndGggK1xuICAgICAgICAgICAgICAgICcgbGF5ZXJzLiBSZWNvbW1lbmRlZCBtYXhpbXVtIG51bWJlciBvZiBsYXllcnMgaXMgMy01LiBBZGRpbmcgbW9yZSBsYXllcnMgaW50byB0aGUgc3RhZ2UgbWF5IGRyb3AgdGhlIHBlcmZvcm1hbmNlLiBSZXRoaW5rIHlvdXIgdHJlZSBzdHJ1Y3R1cmUsIHlvdSBjYW4gdXNlIEtvbnZhLkdyb3VwLicpO1xuICAgICAgICB9XG4gICAgICAgIGxheWVyLnNldFNpemUoeyB3aWR0aDogdGhpcy53aWR0aCgpLCBoZWlnaHQ6IHRoaXMuaGVpZ2h0KCkgfSk7XG4gICAgICAgIGxheWVyLmRyYXcoKTtcbiAgICAgICAgaWYgKEtvbnZhLmlzQnJvd3Nlcikge1xuICAgICAgICAgICAgdGhpcy5jb250ZW50LmFwcGVuZENoaWxkKGxheWVyLmNhbnZhcy5fY2FudmFzKTtcbiAgICAgICAgfVxuICAgICAgICByZXR1cm4gdGhpcztcbiAgICB9XG4gICAgZ2V0UGFyZW50KCkge1xuICAgICAgICByZXR1cm4gbnVsbDtcbiAgICB9XG4gICAgZ2V0TGF5ZXIoKSB7XG4gICAgICAgIHJldHVybiBudWxsO1xuICAgIH1cbiAgICBoYXNQb2ludGVyQ2FwdHVyZShwb2ludGVySWQpIHtcbiAgICAgICAgcmV0dXJuIFBvaW50ZXJFdmVudHMuaGFzUG9pbnRlckNhcHR1cmUocG9pbnRlcklkLCB0aGlzKTtcbiAgICB9XG4gICAgc2V0UG9pbnRlckNhcHR1cmUocG9pbnRlcklkKSB7XG4gICAgICAgIFBvaW50ZXJFdmVudHMuc2V0UG9pbnRlckNhcHR1cmUocG9pbnRlcklkLCB0aGlzKTtcbiAgICB9XG4gICAgcmVsZWFzZUNhcHR1cmUocG9pbnRlcklkKSB7XG4gICAgICAgIFBvaW50ZXJFdmVudHMucmVsZWFzZUNhcHR1cmUocG9pbnRlcklkLCB0aGlzKTtcbiAgICB9XG4gICAgZ2V0TGF5ZXJzKCkge1xuICAgICAgICByZXR1cm4gdGhpcy5jaGlsZHJlbjtcbiAgICB9XG4gICAgX2JpbmRDb250ZW50RXZlbnRzKCkge1xuICAgICAgICBpZiAoIUtvbnZhLmlzQnJvd3Nlcikge1xuICAgICAgICAgICAgcmV0dXJuO1xuICAgICAgICB9XG4gICAgICAgIEVWRU5UUy5mb3JFYWNoKChbZXZlbnQsIG1ldGhvZE5hbWVdKSA9PiB7XG4gICAgICAgICAgICB0aGlzLmNvbnRlbnQuYWRkRXZlbnRMaXN0ZW5lcihldmVudCwgKGV2dCkgPT4ge1xuICAgICAgICAgICAgICAgIHRoaXNbbWV0aG9kTmFtZV0oZXZ0KTtcbiAgICAgICAgICAgIH0sIHsgcGFzc2l2ZTogZmFsc2UgfSk7XG4gICAgICAgIH0pO1xuICAgIH1cbiAgICBfcG9pbnRlcmVudGVyKGV2dCkge1xuICAgICAgICB0aGlzLnNldFBvaW50ZXJzUG9zaXRpb25zKGV2dCk7XG4gICAgICAgIGNvbnN0IGV2ZW50cyA9IGdldEV2ZW50c01hcChldnQudHlwZSk7XG4gICAgICAgIHRoaXMuX2ZpcmUoZXZlbnRzLnBvaW50ZXJlbnRlciwge1xuICAgICAgICAgICAgZXZ0OiBldnQsXG4gICAgICAgICAgICB0YXJnZXQ6IHRoaXMsXG4gICAgICAgICAgICBjdXJyZW50VGFyZ2V0OiB0aGlzLFxuICAgICAgICB9KTtcbiAgICB9XG4gICAgX3BvaW50ZXJvdmVyKGV2dCkge1xuICAgICAgICB0aGlzLnNldFBvaW50ZXJzUG9zaXRpb25zKGV2dCk7XG4gICAgICAgIGNvbnN0IGV2ZW50cyA9IGdldEV2ZW50c01hcChldnQudHlwZSk7XG4gICAgICAgIHRoaXMuX2ZpcmUoZXZlbnRzLnBvaW50ZXJvdmVyLCB7XG4gICAgICAgICAgICBldnQ6IGV2dCxcbiAgICAgICAgICAgIHRhcmdldDogdGhpcyxcbiAgICAgICAgICAgIGN1cnJlbnRUYXJnZXQ6IHRoaXMsXG4gICAgICAgIH0pO1xuICAgIH1cbiAgICBfZ2V0VGFyZ2V0U2hhcGUoZXZlblR5cGUpIHtcbiAgICAgICAgbGV0IHNoYXBlID0gdGhpc1tldmVuVHlwZSArICd0YXJnZXRTaGFwZSddO1xuICAgICAgICBpZiAoc2hhcGUgJiYgIXNoYXBlLmdldFN0YWdlKCkpIHtcbiAgICAgICAgICAgIHNoYXBlID0gbnVsbDtcbiAgICAgICAgfVxuICAgICAgICByZXR1cm4gc2hhcGU7XG4gICAgfVxuICAgIF9wb2ludGVybGVhdmUoZXZ0KSB7XG4gICAgICAgIGNvbnN0IGV2ZW50cyA9IGdldEV2ZW50c01hcChldnQudHlwZSk7XG4gICAgICAgIGNvbnN0IGV2ZW50VHlwZSA9IGdldEV2ZW50VHlwZShldnQudHlwZSk7XG4gICAgICAgIGlmICghZXZlbnRzKSB7XG4gICAgICAgICAgICByZXR1cm47XG4gICAgICAgIH1cbiAgICAgICAgdGhpcy5zZXRQb2ludGVyc1Bvc2l0aW9ucyhldnQpO1xuICAgICAgICB2YXIgdGFyZ2V0U2hhcGUgPSB0aGlzLl9nZXRUYXJnZXRTaGFwZShldmVudFR5cGUpO1xuICAgICAgICB2YXIgZXZlbnRzRW5hYmxlZCA9ICFERC5pc0RyYWdnaW5nIHx8IEtvbnZhLmhpdE9uRHJhZ0VuYWJsZWQ7XG4gICAgICAgIGlmICh0YXJnZXRTaGFwZSAmJiBldmVudHNFbmFibGVkKSB7XG4gICAgICAgICAgICB0YXJnZXRTaGFwZS5fZmlyZUFuZEJ1YmJsZShldmVudHMucG9pbnRlcm91dCwgeyBldnQ6IGV2dCB9KTtcbiAgICAgICAgICAgIHRhcmdldFNoYXBlLl9maXJlQW5kQnViYmxlKGV2ZW50cy5wb2ludGVybGVhdmUsIHsgZXZ0OiBldnQgfSk7XG4gICAgICAgICAgICB0aGlzLl9maXJlKGV2ZW50cy5wb2ludGVybGVhdmUsIHtcbiAgICAgICAgICAgICAgICBldnQ6IGV2dCxcbiAgICAgICAgICAgICAgICB0YXJnZXQ6IHRoaXMsXG4gICAgICAgICAgICAgICAgY3VycmVudFRhcmdldDogdGhpcyxcbiAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgdGhpc1tldmVudFR5cGUgKyAndGFyZ2V0U2hhcGUnXSA9IG51bGw7XG4gICAgICAgIH1cbiAgICAgICAgZWxzZSBpZiAoZXZlbnRzRW5hYmxlZCkge1xuICAgICAgICAgICAgdGhpcy5fZmlyZShldmVudHMucG9pbnRlcmxlYXZlLCB7XG4gICAgICAgICAgICAgICAgZXZ0OiBldnQsXG4gICAgICAgICAgICAgICAgdGFyZ2V0OiB0aGlzLFxuICAgICAgICAgICAgICAgIGN1cnJlbnRUYXJnZXQ6IHRoaXMsXG4gICAgICAgICAgICB9KTtcbiAgICAgICAgICAgIHRoaXMuX2ZpcmUoZXZlbnRzLnBvaW50ZXJvdXQsIHtcbiAgICAgICAgICAgICAgICBldnQ6IGV2dCxcbiAgICAgICAgICAgICAgICB0YXJnZXQ6IHRoaXMsXG4gICAgICAgICAgICAgICAgY3VycmVudFRhcmdldDogdGhpcyxcbiAgICAgICAgICAgIH0pO1xuICAgICAgICB9XG4gICAgICAgIHRoaXMucG9pbnRlclBvcyA9IHVuZGVmaW5lZDtcbiAgICAgICAgdGhpcy5fcG9pbnRlclBvc2l0aW9ucyA9IFtdO1xuICAgIH1cbiAgICBfcG9pbnRlcmRvd24oZXZ0KSB7XG4gICAgICAgIGNvbnN0IGV2ZW50cyA9IGdldEV2ZW50c01hcChldnQudHlwZSk7XG4gICAgICAgIGNvbnN0IGV2ZW50VHlwZSA9IGdldEV2ZW50VHlwZShldnQudHlwZSk7XG4gICAgICAgIGlmICghZXZlbnRzKSB7XG4gICAgICAgICAgICByZXR1cm47XG4gICAgICAgIH1cbiAgICAgICAgdGhpcy5zZXRQb2ludGVyc1Bvc2l0aW9ucyhldnQpO1xuICAgICAgICB2YXIgdHJpZ2dlcmVkT25TaGFwZSA9IGZhbHNlO1xuICAgICAgICB0aGlzLl9jaGFuZ2VkUG9pbnRlclBvc2l0aW9ucy5mb3JFYWNoKChwb3MpID0+IHtcbiAgICAgICAgICAgIHZhciBzaGFwZSA9IHRoaXMuZ2V0SW50ZXJzZWN0aW9uKHBvcyk7XG4gICAgICAgICAgICBERC5qdXN0RHJhZ2dlZCA9IGZhbHNlO1xuICAgICAgICAgICAgS29udmFbJ18nICsgZXZlbnRUeXBlICsgJ0xpc3RlbkNsaWNrJ10gPSB0cnVlO1xuICAgICAgICAgICAgY29uc3QgaGFzU2hhcGUgPSBzaGFwZSAmJiBzaGFwZS5pc0xpc3RlbmluZygpO1xuICAgICAgICAgICAgaWYgKCFoYXNTaGFwZSkge1xuICAgICAgICAgICAgICAgIHJldHVybjtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGlmIChLb252YS5jYXB0dXJlUG9pbnRlckV2ZW50c0VuYWJsZWQpIHtcbiAgICAgICAgICAgICAgICBzaGFwZS5zZXRQb2ludGVyQ2FwdHVyZShwb3MuaWQpO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgdGhpc1tldmVudFR5cGUgKyAnQ2xpY2tTdGFydFNoYXBlJ10gPSBzaGFwZTtcbiAgICAgICAgICAgIHNoYXBlLl9maXJlQW5kQnViYmxlKGV2ZW50cy5wb2ludGVyZG93biwge1xuICAgICAgICAgICAgICAgIGV2dDogZXZ0LFxuICAgICAgICAgICAgICAgIHBvaW50ZXJJZDogcG9zLmlkLFxuICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICB0cmlnZ2VyZWRPblNoYXBlID0gdHJ1ZTtcbiAgICAgICAgICAgIGNvbnN0IGlzVG91Y2ggPSBldnQudHlwZS5pbmRleE9mKCd0b3VjaCcpID49IDA7XG4gICAgICAgICAgICBpZiAoc2hhcGUucHJldmVudERlZmF1bHQoKSAmJiBldnQuY2FuY2VsYWJsZSAmJiBpc1RvdWNoKSB7XG4gICAgICAgICAgICAgICAgZXZ0LnByZXZlbnREZWZhdWx0KCk7XG4gICAgICAgICAgICB9XG4gICAgICAgIH0pO1xuICAgICAgICBpZiAoIXRyaWdnZXJlZE9uU2hhcGUpIHtcbiAgICAgICAgICAgIHRoaXMuX2ZpcmUoZXZlbnRzLnBvaW50ZXJkb3duLCB7XG4gICAgICAgICAgICAgICAgZXZ0OiBldnQsXG4gICAgICAgICAgICAgICAgdGFyZ2V0OiB0aGlzLFxuICAgICAgICAgICAgICAgIGN1cnJlbnRUYXJnZXQ6IHRoaXMsXG4gICAgICAgICAgICAgICAgcG9pbnRlcklkOiB0aGlzLl9wb2ludGVyUG9zaXRpb25zWzBdLmlkLFxuICAgICAgICAgICAgfSk7XG4gICAgICAgIH1cbiAgICB9XG4gICAgX3BvaW50ZXJtb3ZlKGV2dCkge1xuICAgICAgICBjb25zdCBldmVudHMgPSBnZXRFdmVudHNNYXAoZXZ0LnR5cGUpO1xuICAgICAgICBjb25zdCBldmVudFR5cGUgPSBnZXRFdmVudFR5cGUoZXZ0LnR5cGUpO1xuICAgICAgICBpZiAoIWV2ZW50cykge1xuICAgICAgICAgICAgcmV0dXJuO1xuICAgICAgICB9XG4gICAgICAgIGlmIChERC5pc0RyYWdnaW5nICYmIERELm5vZGUucHJldmVudERlZmF1bHQoKSAmJiBldnQuY2FuY2VsYWJsZSkge1xuICAgICAgICAgICAgZXZ0LnByZXZlbnREZWZhdWx0KCk7XG4gICAgICAgIH1cbiAgICAgICAgdGhpcy5zZXRQb2ludGVyc1Bvc2l0aW9ucyhldnQpO1xuICAgICAgICB2YXIgZXZlbnRzRW5hYmxlZCA9ICFERC5pc0RyYWdnaW5nIHx8IEtvbnZhLmhpdE9uRHJhZ0VuYWJsZWQ7XG4gICAgICAgIGlmICghZXZlbnRzRW5hYmxlZCkge1xuICAgICAgICAgICAgcmV0dXJuO1xuICAgICAgICB9XG4gICAgICAgIHZhciBwcm9jZXNzZWRTaGFwZXNJZHMgPSB7fTtcbiAgICAgICAgbGV0IHRyaWdnZXJlZE9uU2hhcGUgPSBmYWxzZTtcbiAgICAgICAgdmFyIHRhcmdldFNoYXBlID0gdGhpcy5fZ2V0VGFyZ2V0U2hhcGUoZXZlbnRUeXBlKTtcbiAgICAgICAgdGhpcy5fY2hhbmdlZFBvaW50ZXJQb3NpdGlvbnMuZm9yRWFjaCgocG9zKSA9PiB7XG4gICAgICAgICAgICBjb25zdCBzaGFwZSA9IChQb2ludGVyRXZlbnRzLmdldENhcHR1cmVkU2hhcGUocG9zLmlkKSB8fFxuICAgICAgICAgICAgICAgIHRoaXMuZ2V0SW50ZXJzZWN0aW9uKHBvcykpO1xuICAgICAgICAgICAgY29uc3QgcG9pbnRlcklkID0gcG9zLmlkO1xuICAgICAgICAgICAgY29uc3QgZXZlbnQgPSB7IGV2dDogZXZ0LCBwb2ludGVySWQgfTtcbiAgICAgICAgICAgIHZhciBkaWZmZXJlbnRUYXJnZXQgPSB0YXJnZXRTaGFwZSAhPT0gc2hhcGU7XG4gICAgICAgICAgICBpZiAoZGlmZmVyZW50VGFyZ2V0ICYmIHRhcmdldFNoYXBlKSB7XG4gICAgICAgICAgICAgICAgdGFyZ2V0U2hhcGUuX2ZpcmVBbmRCdWJibGUoZXZlbnRzLnBvaW50ZXJvdXQsIE9iamVjdC5hc3NpZ24oe30sIGV2ZW50KSwgc2hhcGUpO1xuICAgICAgICAgICAgICAgIHRhcmdldFNoYXBlLl9maXJlQW5kQnViYmxlKGV2ZW50cy5wb2ludGVybGVhdmUsIE9iamVjdC5hc3NpZ24oe30sIGV2ZW50KSwgc2hhcGUpO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgaWYgKHNoYXBlKSB7XG4gICAgICAgICAgICAgICAgaWYgKHByb2Nlc3NlZFNoYXBlc0lkc1tzaGFwZS5faWRdKSB7XG4gICAgICAgICAgICAgICAgICAgIHJldHVybjtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgcHJvY2Vzc2VkU2hhcGVzSWRzW3NoYXBlLl9pZF0gPSB0cnVlO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgaWYgKHNoYXBlICYmIHNoYXBlLmlzTGlzdGVuaW5nKCkpIHtcbiAgICAgICAgICAgICAgICB0cmlnZ2VyZWRPblNoYXBlID0gdHJ1ZTtcbiAgICAgICAgICAgICAgICBpZiAoZGlmZmVyZW50VGFyZ2V0KSB7XG4gICAgICAgICAgICAgICAgICAgIHNoYXBlLl9maXJlQW5kQnViYmxlKGV2ZW50cy5wb2ludGVyb3ZlciwgT2JqZWN0LmFzc2lnbih7fSwgZXZlbnQpLCB0YXJnZXRTaGFwZSk7XG4gICAgICAgICAgICAgICAgICAgIHNoYXBlLl9maXJlQW5kQnViYmxlKGV2ZW50cy5wb2ludGVyZW50ZXIsIE9iamVjdC5hc3NpZ24oe30sIGV2ZW50KSwgdGFyZ2V0U2hhcGUpO1xuICAgICAgICAgICAgICAgICAgICB0aGlzW2V2ZW50VHlwZSArICd0YXJnZXRTaGFwZSddID0gc2hhcGU7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIHNoYXBlLl9maXJlQW5kQnViYmxlKGV2ZW50cy5wb2ludGVybW92ZSwgT2JqZWN0LmFzc2lnbih7fSwgZXZlbnQpKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGVsc2Uge1xuICAgICAgICAgICAgICAgIGlmICh0YXJnZXRTaGFwZSkge1xuICAgICAgICAgICAgICAgICAgICB0aGlzLl9maXJlKGV2ZW50cy5wb2ludGVyb3Zlciwge1xuICAgICAgICAgICAgICAgICAgICAgICAgZXZ0OiBldnQsXG4gICAgICAgICAgICAgICAgICAgICAgICB0YXJnZXQ6IHRoaXMsXG4gICAgICAgICAgICAgICAgICAgICAgICBjdXJyZW50VGFyZ2V0OiB0aGlzLFxuICAgICAgICAgICAgICAgICAgICAgICAgcG9pbnRlcklkLFxuICAgICAgICAgICAgICAgICAgICB9KTtcbiAgICAgICAgICAgICAgICAgICAgdGhpc1tldmVudFR5cGUgKyAndGFyZ2V0U2hhcGUnXSA9IG51bGw7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfVxuICAgICAgICB9KTtcbiAgICAgICAgaWYgKCF0cmlnZ2VyZWRPblNoYXBlKSB7XG4gICAgICAgICAgICB0aGlzLl9maXJlKGV2ZW50cy5wb2ludGVybW92ZSwge1xuICAgICAgICAgICAgICAgIGV2dDogZXZ0LFxuICAgICAgICAgICAgICAgIHRhcmdldDogdGhpcyxcbiAgICAgICAgICAgICAgICBjdXJyZW50VGFyZ2V0OiB0aGlzLFxuICAgICAgICAgICAgICAgIHBvaW50ZXJJZDogdGhpcy5fY2hhbmdlZFBvaW50ZXJQb3NpdGlvbnNbMF0uaWQsXG4gICAgICAgICAgICB9KTtcbiAgICAgICAgfVxuICAgIH1cbiAgICBfcG9pbnRlcnVwKGV2dCkge1xuICAgICAgICBjb25zdCBldmVudHMgPSBnZXRFdmVudHNNYXAoZXZ0LnR5cGUpO1xuICAgICAgICBjb25zdCBldmVudFR5cGUgPSBnZXRFdmVudFR5cGUoZXZ0LnR5cGUpO1xuICAgICAgICBpZiAoIWV2ZW50cykge1xuICAgICAgICAgICAgcmV0dXJuO1xuICAgICAgICB9XG4gICAgICAgIHRoaXMuc2V0UG9pbnRlcnNQb3NpdGlvbnMoZXZ0KTtcbiAgICAgICAgY29uc3QgY2xpY2tTdGFydFNoYXBlID0gdGhpc1tldmVudFR5cGUgKyAnQ2xpY2tTdGFydFNoYXBlJ107XG4gICAgICAgIGNvbnN0IGNsaWNrRW5kU2hhcGUgPSB0aGlzW2V2ZW50VHlwZSArICdDbGlja0VuZFNoYXBlJ107XG4gICAgICAgIHZhciBwcm9jZXNzZWRTaGFwZXNJZHMgPSB7fTtcbiAgICAgICAgbGV0IHRyaWdnZXJlZE9uU2hhcGUgPSBmYWxzZTtcbiAgICAgICAgdGhpcy5fY2hhbmdlZFBvaW50ZXJQb3NpdGlvbnMuZm9yRWFjaCgocG9zKSA9PiB7XG4gICAgICAgICAgICBjb25zdCBzaGFwZSA9IChQb2ludGVyRXZlbnRzLmdldENhcHR1cmVkU2hhcGUocG9zLmlkKSB8fFxuICAgICAgICAgICAgICAgIHRoaXMuZ2V0SW50ZXJzZWN0aW9uKHBvcykpO1xuICAgICAgICAgICAgaWYgKHNoYXBlKSB7XG4gICAgICAgICAgICAgICAgc2hhcGUucmVsZWFzZUNhcHR1cmUocG9zLmlkKTtcbiAgICAgICAgICAgICAgICBpZiAocHJvY2Vzc2VkU2hhcGVzSWRzW3NoYXBlLl9pZF0pIHtcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICBwcm9jZXNzZWRTaGFwZXNJZHNbc2hhcGUuX2lkXSA9IHRydWU7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBjb25zdCBwb2ludGVySWQgPSBwb3MuaWQ7XG4gICAgICAgICAgICBjb25zdCBldmVudCA9IHsgZXZ0OiBldnQsIHBvaW50ZXJJZCB9O1xuICAgICAgICAgICAgbGV0IGZpcmVEYmxDbGljayA9IGZhbHNlO1xuICAgICAgICAgICAgaWYgKEtvbnZhWydfJyArIGV2ZW50VHlwZSArICdJbkRibENsaWNrV2luZG93J10pIHtcbiAgICAgICAgICAgICAgICBmaXJlRGJsQ2xpY2sgPSB0cnVlO1xuICAgICAgICAgICAgICAgIGNsZWFyVGltZW91dCh0aGlzW2V2ZW50VHlwZSArICdEYmxUaW1lb3V0J10pO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgZWxzZSBpZiAoIURELmp1c3REcmFnZ2VkKSB7XG4gICAgICAgICAgICAgICAgS29udmFbJ18nICsgZXZlbnRUeXBlICsgJ0luRGJsQ2xpY2tXaW5kb3cnXSA9IHRydWU7XG4gICAgICAgICAgICAgICAgY2xlYXJUaW1lb3V0KHRoaXNbZXZlbnRUeXBlICsgJ0RibFRpbWVvdXQnXSk7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICB0aGlzW2V2ZW50VHlwZSArICdEYmxUaW1lb3V0J10gPSBzZXRUaW1lb3V0KGZ1bmN0aW9uICgpIHtcbiAgICAgICAgICAgICAgICBLb252YVsnXycgKyBldmVudFR5cGUgKyAnSW5EYmxDbGlja1dpbmRvdyddID0gZmFsc2U7XG4gICAgICAgICAgICB9LCBLb252YS5kYmxDbGlja1dpbmRvdyk7XG4gICAgICAgICAgICBpZiAoc2hhcGUgJiYgc2hhcGUuaXNMaXN0ZW5pbmcoKSkge1xuICAgICAgICAgICAgICAgIHRyaWdnZXJlZE9uU2hhcGUgPSB0cnVlO1xuICAgICAgICAgICAgICAgIHRoaXNbZXZlbnRUeXBlICsgJ0NsaWNrRW5kU2hhcGUnXSA9IHNoYXBlO1xuICAgICAgICAgICAgICAgIHNoYXBlLl9maXJlQW5kQnViYmxlKGV2ZW50cy5wb2ludGVydXAsIE9iamVjdC5hc3NpZ24oe30sIGV2ZW50KSk7XG4gICAgICAgICAgICAgICAgaWYgKEtvbnZhWydfJyArIGV2ZW50VHlwZSArICdMaXN0ZW5DbGljayddICYmXG4gICAgICAgICAgICAgICAgICAgIGNsaWNrU3RhcnRTaGFwZSAmJlxuICAgICAgICAgICAgICAgICAgICBjbGlja1N0YXJ0U2hhcGUgPT09IHNoYXBlKSB7XG4gICAgICAgICAgICAgICAgICAgIHNoYXBlLl9maXJlQW5kQnViYmxlKGV2ZW50cy5wb2ludGVyY2xpY2ssIE9iamVjdC5hc3NpZ24oe30sIGV2ZW50KSk7XG4gICAgICAgICAgICAgICAgICAgIGlmIChmaXJlRGJsQ2xpY2sgJiYgY2xpY2tFbmRTaGFwZSAmJiBjbGlja0VuZFNoYXBlID09PSBzaGFwZSkge1xuICAgICAgICAgICAgICAgICAgICAgICAgc2hhcGUuX2ZpcmVBbmRCdWJibGUoZXZlbnRzLnBvaW50ZXJkYmxjbGljaywgT2JqZWN0LmFzc2lnbih7fSwgZXZlbnQpKTtcbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGVsc2Uge1xuICAgICAgICAgICAgICAgIHRoaXNbZXZlbnRUeXBlICsgJ0NsaWNrRW5kU2hhcGUnXSA9IG51bGw7XG4gICAgICAgICAgICAgICAgaWYgKEtvbnZhWydfJyArIGV2ZW50VHlwZSArICdMaXN0ZW5DbGljayddKSB7XG4gICAgICAgICAgICAgICAgICAgIHRoaXMuX2ZpcmUoZXZlbnRzLnBvaW50ZXJjbGljaywge1xuICAgICAgICAgICAgICAgICAgICAgICAgZXZ0OiBldnQsXG4gICAgICAgICAgICAgICAgICAgICAgICB0YXJnZXQ6IHRoaXMsXG4gICAgICAgICAgICAgICAgICAgICAgICBjdXJyZW50VGFyZ2V0OiB0aGlzLFxuICAgICAgICAgICAgICAgICAgICAgICAgcG9pbnRlcklkLFxuICAgICAgICAgICAgICAgICAgICB9KTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgaWYgKGZpcmVEYmxDbGljaykge1xuICAgICAgICAgICAgICAgICAgICB0aGlzLl9maXJlKGV2ZW50cy5wb2ludGVyZGJsY2xpY2ssIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIGV2dDogZXZ0LFxuICAgICAgICAgICAgICAgICAgICAgICAgdGFyZ2V0OiB0aGlzLFxuICAgICAgICAgICAgICAgICAgICAgICAgY3VycmVudFRhcmdldDogdGhpcyxcbiAgICAgICAgICAgICAgICAgICAgICAgIHBvaW50ZXJJZCxcbiAgICAgICAgICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfVxuICAgICAgICB9KTtcbiAgICAgICAgaWYgKCF0cmlnZ2VyZWRPblNoYXBlKSB7XG4gICAgICAgICAgICB0aGlzLl9maXJlKGV2ZW50cy5wb2ludGVydXAsIHtcbiAgICAgICAgICAgICAgICBldnQ6IGV2dCxcbiAgICAgICAgICAgICAgICB0YXJnZXQ6IHRoaXMsXG4gICAgICAgICAgICAgICAgY3VycmVudFRhcmdldDogdGhpcyxcbiAgICAgICAgICAgICAgICBwb2ludGVySWQ6IHRoaXMuX2NoYW5nZWRQb2ludGVyUG9zaXRpb25zWzBdLmlkLFxuICAgICAgICAgICAgfSk7XG4gICAgICAgIH1cbiAgICAgICAgS29udmFbJ18nICsgZXZlbnRUeXBlICsgJ0xpc3RlbkNsaWNrJ10gPSBmYWxzZTtcbiAgICAgICAgaWYgKGV2dC5jYW5jZWxhYmxlICYmIGV2ZW50VHlwZSAhPT0gJ3RvdWNoJykge1xuICAgICAgICAgICAgZXZ0LnByZXZlbnREZWZhdWx0KCk7XG4gICAgICAgIH1cbiAgICB9XG4gICAgX2NvbnRleHRtZW51KGV2dCkge1xuICAgICAgICB0aGlzLnNldFBvaW50ZXJzUG9zaXRpb25zKGV2dCk7XG4gICAgICAgIHZhciBzaGFwZSA9IHRoaXMuZ2V0SW50ZXJzZWN0aW9uKHRoaXMuZ2V0UG9pbnRlclBvc2l0aW9uKCkpO1xuICAgICAgICBpZiAoc2hhcGUgJiYgc2hhcGUuaXNMaXN0ZW5pbmcoKSkge1xuICAgICAgICAgICAgc2hhcGUuX2ZpcmVBbmRCdWJibGUoQ09OVEVYVE1FTlUsIHsgZXZ0OiBldnQgfSk7XG4gICAgICAgIH1cbiAgICAgICAgZWxzZSB7XG4gICAgICAgICAgICB0aGlzLl9maXJlKENPTlRFWFRNRU5VLCB7XG4gICAgICAgICAgICAgICAgZXZ0OiBldnQsXG4gICAgICAgICAgICAgICAgdGFyZ2V0OiB0aGlzLFxuICAgICAgICAgICAgICAgIGN1cnJlbnRUYXJnZXQ6IHRoaXMsXG4gICAgICAgICAgICB9KTtcbiAgICAgICAgfVxuICAgIH1cbiAgICBfd2hlZWwoZXZ0KSB7XG4gICAgICAgIHRoaXMuc2V0UG9pbnRlcnNQb3NpdGlvbnMoZXZ0KTtcbiAgICAgICAgdmFyIHNoYXBlID0gdGhpcy5nZXRJbnRlcnNlY3Rpb24odGhpcy5nZXRQb2ludGVyUG9zaXRpb24oKSk7XG4gICAgICAgIGlmIChzaGFwZSAmJiBzaGFwZS5pc0xpc3RlbmluZygpKSB7XG4gICAgICAgICAgICBzaGFwZS5fZmlyZUFuZEJ1YmJsZShXSEVFTCwgeyBldnQ6IGV2dCB9KTtcbiAgICAgICAgfVxuICAgICAgICBlbHNlIHtcbiAgICAgICAgICAgIHRoaXMuX2ZpcmUoV0hFRUwsIHtcbiAgICAgICAgICAgICAgICBldnQ6IGV2dCxcbiAgICAgICAgICAgICAgICB0YXJnZXQ6IHRoaXMsXG4gICAgICAgICAgICAgICAgY3VycmVudFRhcmdldDogdGhpcyxcbiAgICAgICAgICAgIH0pO1xuICAgICAgICB9XG4gICAgfVxuICAgIF9wb2ludGVyY2FuY2VsKGV2dCkge1xuICAgICAgICB0aGlzLnNldFBvaW50ZXJzUG9zaXRpb25zKGV2dCk7XG4gICAgICAgIGNvbnN0IHNoYXBlID0gUG9pbnRlckV2ZW50cy5nZXRDYXB0dXJlZFNoYXBlKGV2dC5wb2ludGVySWQpIHx8XG4gICAgICAgICAgICB0aGlzLmdldEludGVyc2VjdGlvbih0aGlzLmdldFBvaW50ZXJQb3NpdGlvbigpKTtcbiAgICAgICAgaWYgKHNoYXBlKSB7XG4gICAgICAgICAgICBzaGFwZS5fZmlyZUFuZEJ1YmJsZShQT0lOVEVSVVAsIFBvaW50ZXJFdmVudHMuY3JlYXRlRXZlbnQoZXZ0KSk7XG4gICAgICAgIH1cbiAgICAgICAgUG9pbnRlckV2ZW50cy5yZWxlYXNlQ2FwdHVyZShldnQucG9pbnRlcklkKTtcbiAgICB9XG4gICAgX2xvc3Rwb2ludGVyY2FwdHVyZShldnQpIHtcbiAgICAgICAgUG9pbnRlckV2ZW50cy5yZWxlYXNlQ2FwdHVyZShldnQucG9pbnRlcklkKTtcbiAgICB9XG4gICAgc2V0UG9pbnRlcnNQb3NpdGlvbnMoZXZ0KSB7XG4gICAgICAgIHZhciBjb250ZW50UG9zaXRpb24gPSB0aGlzLl9nZXRDb250ZW50UG9zaXRpb24oKSwgeCA9IG51bGwsIHkgPSBudWxsO1xuICAgICAgICBldnQgPSBldnQgPyBldnQgOiB3aW5kb3cuZXZlbnQ7XG4gICAgICAgIGlmIChldnQudG91Y2hlcyAhPT0gdW5kZWZpbmVkKSB7XG4gICAgICAgICAgICB0aGlzLl9wb2ludGVyUG9zaXRpb25zID0gW107XG4gICAgICAgICAgICB0aGlzLl9jaGFuZ2VkUG9pbnRlclBvc2l0aW9ucyA9IFtdO1xuICAgICAgICAgICAgQXJyYXkucHJvdG90eXBlLmZvckVhY2guY2FsbChldnQudG91Y2hlcywgKHRvdWNoKSA9PiB7XG4gICAgICAgICAgICAgICAgdGhpcy5fcG9pbnRlclBvc2l0aW9ucy5wdXNoKHtcbiAgICAgICAgICAgICAgICAgICAgaWQ6IHRvdWNoLmlkZW50aWZpZXIsXG4gICAgICAgICAgICAgICAgICAgIHg6ICh0b3VjaC5jbGllbnRYIC0gY29udGVudFBvc2l0aW9uLmxlZnQpIC8gY29udGVudFBvc2l0aW9uLnNjYWxlWCxcbiAgICAgICAgICAgICAgICAgICAgeTogKHRvdWNoLmNsaWVudFkgLSBjb250ZW50UG9zaXRpb24udG9wKSAvIGNvbnRlbnRQb3NpdGlvbi5zY2FsZVksXG4gICAgICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICB9KTtcbiAgICAgICAgICAgIEFycmF5LnByb3RvdHlwZS5mb3JFYWNoLmNhbGwoZXZ0LmNoYW5nZWRUb3VjaGVzIHx8IGV2dC50b3VjaGVzLCAodG91Y2gpID0+IHtcbiAgICAgICAgICAgICAgICB0aGlzLl9jaGFuZ2VkUG9pbnRlclBvc2l0aW9ucy5wdXNoKHtcbiAgICAgICAgICAgICAgICAgICAgaWQ6IHRvdWNoLmlkZW50aWZpZXIsXG4gICAgICAgICAgICAgICAgICAgIHg6ICh0b3VjaC5jbGllbnRYIC0gY29udGVudFBvc2l0aW9uLmxlZnQpIC8gY29udGVudFBvc2l0aW9uLnNjYWxlWCxcbiAgICAgICAgICAgICAgICAgICAgeTogKHRvdWNoLmNsaWVudFkgLSBjb250ZW50UG9zaXRpb24udG9wKSAvIGNvbnRlbnRQb3NpdGlvbi5zY2FsZVksXG4gICAgICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICB9KTtcbiAgICAgICAgfVxuICAgICAgICBlbHNlIHtcbiAgICAgICAgICAgIHggPSAoZXZ0LmNsaWVudFggLSBjb250ZW50UG9zaXRpb24ubGVmdCkgLyBjb250ZW50UG9zaXRpb24uc2NhbGVYO1xuICAgICAgICAgICAgeSA9IChldnQuY2xpZW50WSAtIGNvbnRlbnRQb3NpdGlvbi50b3ApIC8gY29udGVudFBvc2l0aW9uLnNjYWxlWTtcbiAgICAgICAgICAgIHRoaXMucG9pbnRlclBvcyA9IHtcbiAgICAgICAgICAgICAgICB4OiB4LFxuICAgICAgICAgICAgICAgIHk6IHksXG4gICAgICAgICAgICB9O1xuICAgICAgICAgICAgdGhpcy5fcG9pbnRlclBvc2l0aW9ucyA9IFt7IHgsIHksIGlkOiBVdGlsLl9nZXRGaXJzdFBvaW50ZXJJZChldnQpIH1dO1xuICAgICAgICAgICAgdGhpcy5fY2hhbmdlZFBvaW50ZXJQb3NpdGlvbnMgPSBbXG4gICAgICAgICAgICAgICAgeyB4LCB5LCBpZDogVXRpbC5fZ2V0Rmlyc3RQb2ludGVySWQoZXZ0KSB9LFxuICAgICAgICAgICAgXTtcbiAgICAgICAgfVxuICAgIH1cbiAgICBfc2V0UG9pbnRlclBvc2l0aW9uKGV2dCkge1xuICAgICAgICBVdGlsLndhcm4oJ01ldGhvZCBfc2V0UG9pbnRlclBvc2l0aW9uIGlzIGRlcHJlY2F0ZWQuIFVzZSBcInN0YWdlLnNldFBvaW50ZXJzUG9zaXRpb25zKGV2ZW50KVwiIGluc3RlYWQuJyk7XG4gICAgICAgIHRoaXMuc2V0UG9pbnRlcnNQb3NpdGlvbnMoZXZ0KTtcbiAgICB9XG4gICAgX2dldENvbnRlbnRQb3NpdGlvbigpIHtcbiAgICAgICAgaWYgKCF0aGlzLmNvbnRlbnQgfHwgIXRoaXMuY29udGVudC5nZXRCb3VuZGluZ0NsaWVudFJlY3QpIHtcbiAgICAgICAgICAgIHJldHVybiB7XG4gICAgICAgICAgICAgICAgdG9wOiAwLFxuICAgICAgICAgICAgICAgIGxlZnQ6IDAsXG4gICAgICAgICAgICAgICAgc2NhbGVYOiAxLFxuICAgICAgICAgICAgICAgIHNjYWxlWTogMSxcbiAgICAgICAgICAgIH07XG4gICAgICAgIH1cbiAgICAgICAgdmFyIHJlY3QgPSB0aGlzLmNvbnRlbnQuZ2V0Qm91bmRpbmdDbGllbnRSZWN0KCk7XG4gICAgICAgIHJldHVybiB7XG4gICAgICAgICAgICB0b3A6IHJlY3QudG9wLFxuICAgICAgICAgICAgbGVmdDogcmVjdC5sZWZ0LFxuICAgICAgICAgICAgc2NhbGVYOiByZWN0LndpZHRoIC8gdGhpcy5jb250ZW50LmNsaWVudFdpZHRoIHx8IDEsXG4gICAgICAgICAgICBzY2FsZVk6IHJlY3QuaGVpZ2h0IC8gdGhpcy5jb250ZW50LmNsaWVudEhlaWdodCB8fCAxLFxuICAgICAgICB9O1xuICAgIH1cbiAgICBfYnVpbGRET00oKSB7XG4gICAgICAgIHRoaXMuYnVmZmVyQ2FudmFzID0gbmV3IFNjZW5lQ2FudmFzKHtcbiAgICAgICAgICAgIHdpZHRoOiB0aGlzLndpZHRoKCksXG4gICAgICAgICAgICBoZWlnaHQ6IHRoaXMuaGVpZ2h0KCksXG4gICAgICAgIH0pO1xuICAgICAgICB0aGlzLmJ1ZmZlckhpdENhbnZhcyA9IG5ldyBIaXRDYW52YXMoe1xuICAgICAgICAgICAgcGl4ZWxSYXRpbzogMSxcbiAgICAgICAgICAgIHdpZHRoOiB0aGlzLndpZHRoKCksXG4gICAgICAgICAgICBoZWlnaHQ6IHRoaXMuaGVpZ2h0KCksXG4gICAgICAgIH0pO1xuICAgICAgICBpZiAoIUtvbnZhLmlzQnJvd3Nlcikge1xuICAgICAgICAgICAgcmV0dXJuO1xuICAgICAgICB9XG4gICAgICAgIHZhciBjb250YWluZXIgPSB0aGlzLmNvbnRhaW5lcigpO1xuICAgICAgICBpZiAoIWNvbnRhaW5lcikge1xuICAgICAgICAgICAgdGhyb3cgJ1N0YWdlIGhhcyBubyBjb250YWluZXIuIEEgY29udGFpbmVyIGlzIHJlcXVpcmVkLic7XG4gICAgICAgIH1cbiAgICAgICAgY29udGFpbmVyLmlubmVySFRNTCA9ICcnO1xuICAgICAgICB0aGlzLmNvbnRlbnQgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdkaXYnKTtcbiAgICAgICAgdGhpcy5jb250ZW50LnN0eWxlLnBvc2l0aW9uID0gJ3JlbGF0aXZlJztcbiAgICAgICAgdGhpcy5jb250ZW50LnN0eWxlLnVzZXJTZWxlY3QgPSAnbm9uZSc7XG4gICAgICAgIHRoaXMuY29udGVudC5jbGFzc05hbWUgPSAna29udmFqcy1jb250ZW50JztcbiAgICAgICAgdGhpcy5jb250ZW50LnNldEF0dHJpYnV0ZSgncm9sZScsICdwcmVzZW50YXRpb24nKTtcbiAgICAgICAgY29udGFpbmVyLmFwcGVuZENoaWxkKHRoaXMuY29udGVudCk7XG4gICAgICAgIHRoaXMuX3Jlc2l6ZURPTSgpO1xuICAgIH1cbiAgICBjYWNoZSgpIHtcbiAgICAgICAgVXRpbC53YXJuKCdDYWNoZSBmdW5jdGlvbiBpcyBub3QgYWxsb3dlZCBmb3Igc3RhZ2UuIFlvdSBtYXkgdXNlIGNhY2hlIG9ubHkgZm9yIGxheWVycywgZ3JvdXBzIGFuZCBzaGFwZXMuJyk7XG4gICAgICAgIHJldHVybiB0aGlzO1xuICAgIH1cbiAgICBjbGVhckNhY2hlKCkge1xuICAgICAgICByZXR1cm4gdGhpcztcbiAgICB9XG4gICAgYmF0Y2hEcmF3KCkge1xuICAgICAgICB0aGlzLmdldENoaWxkcmVuKCkuZm9yRWFjaChmdW5jdGlvbiAobGF5ZXIpIHtcbiAgICAgICAgICAgIGxheWVyLmJhdGNoRHJhdygpO1xuICAgICAgICB9KTtcbiAgICAgICAgcmV0dXJuIHRoaXM7XG4gICAgfVxufVxuU3RhZ2UucHJvdG90eXBlLm5vZGVUeXBlID0gU1RBR0U7XG5fcmVnaXN0ZXJOb2RlKFN0YWdlKTtcbkZhY3RvcnkuYWRkR2V0dGVyU2V0dGVyKFN0YWdlLCAnY29udGFpbmVyJyk7XG4iLCJpbXBvcnQgeyBVdGlsIH0gZnJvbSAnLi9VdGlsLmpzJztcbmltcG9ydCB7IEFuaW1hdGlvbiB9IGZyb20gJy4vQW5pbWF0aW9uLmpzJztcbmltcG9ydCB7IE5vZGUgfSBmcm9tICcuL05vZGUuanMnO1xuaW1wb3J0IHsgS29udmEgfSBmcm9tICcuL0dsb2JhbC5qcyc7XG52YXIgYmxhY2tsaXN0ID0ge1xuICAgIG5vZGU6IDEsXG4gICAgZHVyYXRpb246IDEsXG4gICAgZWFzaW5nOiAxLFxuICAgIG9uRmluaXNoOiAxLFxuICAgIHlveW86IDEsXG59LCBQQVVTRUQgPSAxLCBQTEFZSU5HID0gMiwgUkVWRVJTSU5HID0gMywgaWRDb3VudGVyID0gMCwgY29sb3JBdHRycyA9IFsnZmlsbCcsICdzdHJva2UnLCAnc2hhZG93Q29sb3InXTtcbmNsYXNzIFR3ZWVuRW5naW5lIHtcbiAgICBjb25zdHJ1Y3Rvcihwcm9wLCBwcm9wRnVuYywgZnVuYywgYmVnaW4sIGZpbmlzaCwgZHVyYXRpb24sIHlveW8pIHtcbiAgICAgICAgdGhpcy5wcm9wID0gcHJvcDtcbiAgICAgICAgdGhpcy5wcm9wRnVuYyA9IHByb3BGdW5jO1xuICAgICAgICB0aGlzLmJlZ2luID0gYmVnaW47XG4gICAgICAgIHRoaXMuX3BvcyA9IGJlZ2luO1xuICAgICAgICB0aGlzLmR1cmF0aW9uID0gZHVyYXRpb247XG4gICAgICAgIHRoaXMuX2NoYW5nZSA9IDA7XG4gICAgICAgIHRoaXMucHJldlBvcyA9IDA7XG4gICAgICAgIHRoaXMueW95byA9IHlveW87XG4gICAgICAgIHRoaXMuX3RpbWUgPSAwO1xuICAgICAgICB0aGlzLl9wb3NpdGlvbiA9IDA7XG4gICAgICAgIHRoaXMuX3N0YXJ0VGltZSA9IDA7XG4gICAgICAgIHRoaXMuX2ZpbmlzaCA9IDA7XG4gICAgICAgIHRoaXMuZnVuYyA9IGZ1bmM7XG4gICAgICAgIHRoaXMuX2NoYW5nZSA9IGZpbmlzaCAtIHRoaXMuYmVnaW47XG4gICAgICAgIHRoaXMucGF1c2UoKTtcbiAgICB9XG4gICAgZmlyZShzdHIpIHtcbiAgICAgICAgdmFyIGhhbmRsZXIgPSB0aGlzW3N0cl07XG4gICAgICAgIGlmIChoYW5kbGVyKSB7XG4gICAgICAgICAgICBoYW5kbGVyKCk7XG4gICAgICAgIH1cbiAgICB9XG4gICAgc2V0VGltZSh0KSB7XG4gICAgICAgIGlmICh0ID4gdGhpcy5kdXJhdGlvbikge1xuICAgICAgICAgICAgaWYgKHRoaXMueW95bykge1xuICAgICAgICAgICAgICAgIHRoaXMuX3RpbWUgPSB0aGlzLmR1cmF0aW9uO1xuICAgICAgICAgICAgICAgIHRoaXMucmV2ZXJzZSgpO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgZWxzZSB7XG4gICAgICAgICAgICAgICAgdGhpcy5maW5pc2goKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgICBlbHNlIGlmICh0IDwgMCkge1xuICAgICAgICAgICAgaWYgKHRoaXMueW95bykge1xuICAgICAgICAgICAgICAgIHRoaXMuX3RpbWUgPSAwO1xuICAgICAgICAgICAgICAgIHRoaXMucGxheSgpO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgZWxzZSB7XG4gICAgICAgICAgICAgICAgdGhpcy5yZXNldCgpO1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICAgIGVsc2Uge1xuICAgICAgICAgICAgdGhpcy5fdGltZSA9IHQ7XG4gICAgICAgICAgICB0aGlzLnVwZGF0ZSgpO1xuICAgICAgICB9XG4gICAgfVxuICAgIGdldFRpbWUoKSB7XG4gICAgICAgIHJldHVybiB0aGlzLl90aW1lO1xuICAgIH1cbiAgICBzZXRQb3NpdGlvbihwKSB7XG4gICAgICAgIHRoaXMucHJldlBvcyA9IHRoaXMuX3BvcztcbiAgICAgICAgdGhpcy5wcm9wRnVuYyhwKTtcbiAgICAgICAgdGhpcy5fcG9zID0gcDtcbiAgICB9XG4gICAgZ2V0UG9zaXRpb24odCkge1xuICAgICAgICBpZiAodCA9PT0gdW5kZWZpbmVkKSB7XG4gICAgICAgICAgICB0ID0gdGhpcy5fdGltZTtcbiAgICAgICAgfVxuICAgICAgICByZXR1cm4gdGhpcy5mdW5jKHQsIHRoaXMuYmVnaW4sIHRoaXMuX2NoYW5nZSwgdGhpcy5kdXJhdGlvbik7XG4gICAgfVxuICAgIHBsYXkoKSB7XG4gICAgICAgIHRoaXMuc3RhdGUgPSBQTEFZSU5HO1xuICAgICAgICB0aGlzLl9zdGFydFRpbWUgPSB0aGlzLmdldFRpbWVyKCkgLSB0aGlzLl90aW1lO1xuICAgICAgICB0aGlzLm9uRW50ZXJGcmFtZSgpO1xuICAgICAgICB0aGlzLmZpcmUoJ29uUGxheScpO1xuICAgIH1cbiAgICByZXZlcnNlKCkge1xuICAgICAgICB0aGlzLnN0YXRlID0gUkVWRVJTSU5HO1xuICAgICAgICB0aGlzLl90aW1lID0gdGhpcy5kdXJhdGlvbiAtIHRoaXMuX3RpbWU7XG4gICAgICAgIHRoaXMuX3N0YXJ0VGltZSA9IHRoaXMuZ2V0VGltZXIoKSAtIHRoaXMuX3RpbWU7XG4gICAgICAgIHRoaXMub25FbnRlckZyYW1lKCk7XG4gICAgICAgIHRoaXMuZmlyZSgnb25SZXZlcnNlJyk7XG4gICAgfVxuICAgIHNlZWsodCkge1xuICAgICAgICB0aGlzLnBhdXNlKCk7XG4gICAgICAgIHRoaXMuX3RpbWUgPSB0O1xuICAgICAgICB0aGlzLnVwZGF0ZSgpO1xuICAgICAgICB0aGlzLmZpcmUoJ29uU2VlaycpO1xuICAgIH1cbiAgICByZXNldCgpIHtcbiAgICAgICAgdGhpcy5wYXVzZSgpO1xuICAgICAgICB0aGlzLl90aW1lID0gMDtcbiAgICAgICAgdGhpcy51cGRhdGUoKTtcbiAgICAgICAgdGhpcy5maXJlKCdvblJlc2V0Jyk7XG4gICAgfVxuICAgIGZpbmlzaCgpIHtcbiAgICAgICAgdGhpcy5wYXVzZSgpO1xuICAgICAgICB0aGlzLl90aW1lID0gdGhpcy5kdXJhdGlvbjtcbiAgICAgICAgdGhpcy51cGRhdGUoKTtcbiAgICAgICAgdGhpcy5maXJlKCdvbkZpbmlzaCcpO1xuICAgIH1cbiAgICB1cGRhdGUoKSB7XG4gICAgICAgIHRoaXMuc2V0UG9zaXRpb24odGhpcy5nZXRQb3NpdGlvbih0aGlzLl90aW1lKSk7XG4gICAgICAgIHRoaXMuZmlyZSgnb25VcGRhdGUnKTtcbiAgICB9XG4gICAgb25FbnRlckZyYW1lKCkge1xuICAgICAgICB2YXIgdCA9IHRoaXMuZ2V0VGltZXIoKSAtIHRoaXMuX3N0YXJ0VGltZTtcbiAgICAgICAgaWYgKHRoaXMuc3RhdGUgPT09IFBMQVlJTkcpIHtcbiAgICAgICAgICAgIHRoaXMuc2V0VGltZSh0KTtcbiAgICAgICAgfVxuICAgICAgICBlbHNlIGlmICh0aGlzLnN0YXRlID09PSBSRVZFUlNJTkcpIHtcbiAgICAgICAgICAgIHRoaXMuc2V0VGltZSh0aGlzLmR1cmF0aW9uIC0gdCk7XG4gICAgICAgIH1cbiAgICB9XG4gICAgcGF1c2UoKSB7XG4gICAgICAgIHRoaXMuc3RhdGUgPSBQQVVTRUQ7XG4gICAgICAgIHRoaXMuZmlyZSgnb25QYXVzZScpO1xuICAgIH1cbiAgICBnZXRUaW1lcigpIHtcbiAgICAgICAgcmV0dXJuIG5ldyBEYXRlKCkuZ2V0VGltZSgpO1xuICAgIH1cbn1cbmV4cG9ydCBjbGFzcyBUd2VlbiB7XG4gICAgY29uc3RydWN0b3IoY29uZmlnKSB7XG4gICAgICAgIHZhciB0aGF0ID0gdGhpcywgbm9kZSA9IGNvbmZpZy5ub2RlLCBub2RlSWQgPSBub2RlLl9pZCwgZHVyYXRpb24sIGVhc2luZyA9IGNvbmZpZy5lYXNpbmcgfHwgRWFzaW5ncy5MaW5lYXIsIHlveW8gPSAhIWNvbmZpZy55b3lvLCBrZXk7XG4gICAgICAgIGlmICh0eXBlb2YgY29uZmlnLmR1cmF0aW9uID09PSAndW5kZWZpbmVkJykge1xuICAgICAgICAgICAgZHVyYXRpb24gPSAwLjM7XG4gICAgICAgIH1cbiAgICAgICAgZWxzZSBpZiAoY29uZmlnLmR1cmF0aW9uID09PSAwKSB7XG4gICAgICAgICAgICBkdXJhdGlvbiA9IDAuMDAxO1xuICAgICAgICB9XG4gICAgICAgIGVsc2Uge1xuICAgICAgICAgICAgZHVyYXRpb24gPSBjb25maWcuZHVyYXRpb247XG4gICAgICAgIH1cbiAgICAgICAgdGhpcy5ub2RlID0gbm9kZTtcbiAgICAgICAgdGhpcy5faWQgPSBpZENvdW50ZXIrKztcbiAgICAgICAgdmFyIGxheWVycyA9IG5vZGUuZ2V0TGF5ZXIoKSB8fFxuICAgICAgICAgICAgKG5vZGUgaW5zdGFuY2VvZiBLb252YVsnU3RhZ2UnXSA/IG5vZGUuZ2V0TGF5ZXJzKCkgOiBudWxsKTtcbiAgICAgICAgaWYgKCFsYXllcnMpIHtcbiAgICAgICAgICAgIFV0aWwuZXJyb3IoJ1R3ZWVuIGNvbnN0cnVjdG9yIGhhdmUgYG5vZGVgIHRoYXQgaXMgbm90IGluIGEgbGF5ZXIuIFBsZWFzZSBhZGQgbm9kZSBpbnRvIGxheWVyIGZpcnN0LicpO1xuICAgICAgICB9XG4gICAgICAgIHRoaXMuYW5pbSA9IG5ldyBBbmltYXRpb24oZnVuY3Rpb24gKCkge1xuICAgICAgICAgICAgdGhhdC50d2Vlbi5vbkVudGVyRnJhbWUoKTtcbiAgICAgICAgfSwgbGF5ZXJzKTtcbiAgICAgICAgdGhpcy50d2VlbiA9IG5ldyBUd2VlbkVuZ2luZShrZXksIGZ1bmN0aW9uIChpKSB7XG4gICAgICAgICAgICB0aGF0Ll90d2VlbkZ1bmMoaSk7XG4gICAgICAgIH0sIGVhc2luZywgMCwgMSwgZHVyYXRpb24gKiAxMDAwLCB5b3lvKTtcbiAgICAgICAgdGhpcy5fYWRkTGlzdGVuZXJzKCk7XG4gICAgICAgIGlmICghVHdlZW4uYXR0cnNbbm9kZUlkXSkge1xuICAgICAgICAgICAgVHdlZW4uYXR0cnNbbm9kZUlkXSA9IHt9O1xuICAgICAgICB9XG4gICAgICAgIGlmICghVHdlZW4uYXR0cnNbbm9kZUlkXVt0aGlzLl9pZF0pIHtcbiAgICAgICAgICAgIFR3ZWVuLmF0dHJzW25vZGVJZF1bdGhpcy5faWRdID0ge307XG4gICAgICAgIH1cbiAgICAgICAgaWYgKCFUd2Vlbi50d2VlbnNbbm9kZUlkXSkge1xuICAgICAgICAgICAgVHdlZW4udHdlZW5zW25vZGVJZF0gPSB7fTtcbiAgICAgICAgfVxuICAgICAgICBmb3IgKGtleSBpbiBjb25maWcpIHtcbiAgICAgICAgICAgIGlmIChibGFja2xpc3Rba2V5XSA9PT0gdW5kZWZpbmVkKSB7XG4gICAgICAgICAgICAgICAgdGhpcy5fYWRkQXR0cihrZXksIGNvbmZpZ1trZXldKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgICB0aGlzLnJlc2V0KCk7XG4gICAgICAgIHRoaXMub25GaW5pc2ggPSBjb25maWcub25GaW5pc2g7XG4gICAgICAgIHRoaXMub25SZXNldCA9IGNvbmZpZy5vblJlc2V0O1xuICAgICAgICB0aGlzLm9uVXBkYXRlID0gY29uZmlnLm9uVXBkYXRlO1xuICAgIH1cbiAgICBfYWRkQXR0cihrZXksIGVuZCkge1xuICAgICAgICB2YXIgbm9kZSA9IHRoaXMubm9kZSwgbm9kZUlkID0gbm9kZS5faWQsIHN0YXJ0LCBkaWZmLCB0d2VlbklkLCBuLCBsZW4sIHRydWVFbmQsIHRydWVTdGFydCwgZW5kUkdCQTtcbiAgICAgICAgdHdlZW5JZCA9IFR3ZWVuLnR3ZWVuc1tub2RlSWRdW2tleV07XG4gICAgICAgIGlmICh0d2VlbklkKSB7XG4gICAgICAgICAgICBkZWxldGUgVHdlZW4uYXR0cnNbbm9kZUlkXVt0d2VlbklkXVtrZXldO1xuICAgICAgICB9XG4gICAgICAgIHN0YXJ0ID0gbm9kZS5nZXRBdHRyKGtleSk7XG4gICAgICAgIGlmIChVdGlsLl9pc0FycmF5KGVuZCkpIHtcbiAgICAgICAgICAgIGRpZmYgPSBbXTtcbiAgICAgICAgICAgIGxlbiA9IE1hdGgubWF4KGVuZC5sZW5ndGgsIHN0YXJ0Lmxlbmd0aCk7XG4gICAgICAgICAgICBpZiAoa2V5ID09PSAncG9pbnRzJyAmJiBlbmQubGVuZ3RoICE9PSBzdGFydC5sZW5ndGgpIHtcbiAgICAgICAgICAgICAgICBpZiAoZW5kLmxlbmd0aCA+IHN0YXJ0Lmxlbmd0aCkge1xuICAgICAgICAgICAgICAgICAgICB0cnVlU3RhcnQgPSBzdGFydDtcbiAgICAgICAgICAgICAgICAgICAgc3RhcnQgPSBVdGlsLl9wcmVwYXJlQXJyYXlGb3JUd2VlbihzdGFydCwgZW5kLCBub2RlLmNsb3NlZCgpKTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgZWxzZSB7XG4gICAgICAgICAgICAgICAgICAgIHRydWVFbmQgPSBlbmQ7XG4gICAgICAgICAgICAgICAgICAgIGVuZCA9IFV0aWwuX3ByZXBhcmVBcnJheUZvclR3ZWVuKGVuZCwgc3RhcnQsIG5vZGUuY2xvc2VkKCkpO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGlmIChrZXkuaW5kZXhPZignZmlsbCcpID09PSAwKSB7XG4gICAgICAgICAgICAgICAgZm9yIChuID0gMDsgbiA8IGxlbjsgbisrKSB7XG4gICAgICAgICAgICAgICAgICAgIGlmIChuICUgMiA9PT0gMCkge1xuICAgICAgICAgICAgICAgICAgICAgICAgZGlmZi5wdXNoKGVuZFtuXSAtIHN0YXJ0W25dKTtcbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICBlbHNlIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIHZhciBzdGFydFJHQkEgPSBVdGlsLmNvbG9yVG9SR0JBKHN0YXJ0W25dKTtcbiAgICAgICAgICAgICAgICAgICAgICAgIGVuZFJHQkEgPSBVdGlsLmNvbG9yVG9SR0JBKGVuZFtuXSk7XG4gICAgICAgICAgICAgICAgICAgICAgICBzdGFydFtuXSA9IHN0YXJ0UkdCQTtcbiAgICAgICAgICAgICAgICAgICAgICAgIGRpZmYucHVzaCh7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgcjogZW5kUkdCQS5yIC0gc3RhcnRSR0JBLnIsXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgZzogZW5kUkdCQS5nIC0gc3RhcnRSR0JBLmcsXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgYjogZW5kUkdCQS5iIC0gc3RhcnRSR0JBLmIsXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgYTogZW5kUkdCQS5hIC0gc3RhcnRSR0JBLmEsXG4gICAgICAgICAgICAgICAgICAgICAgICB9KTtcbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGVsc2Uge1xuICAgICAgICAgICAgICAgIGZvciAobiA9IDA7IG4gPCBsZW47IG4rKykge1xuICAgICAgICAgICAgICAgICAgICBkaWZmLnB1c2goZW5kW25dIC0gc3RhcnRbbl0pO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgICBlbHNlIGlmIChjb2xvckF0dHJzLmluZGV4T2Yoa2V5KSAhPT0gLTEpIHtcbiAgICAgICAgICAgIHN0YXJ0ID0gVXRpbC5jb2xvclRvUkdCQShzdGFydCk7XG4gICAgICAgICAgICBlbmRSR0JBID0gVXRpbC5jb2xvclRvUkdCQShlbmQpO1xuICAgICAgICAgICAgZGlmZiA9IHtcbiAgICAgICAgICAgICAgICByOiBlbmRSR0JBLnIgLSBzdGFydC5yLFxuICAgICAgICAgICAgICAgIGc6IGVuZFJHQkEuZyAtIHN0YXJ0LmcsXG4gICAgICAgICAgICAgICAgYjogZW5kUkdCQS5iIC0gc3RhcnQuYixcbiAgICAgICAgICAgICAgICBhOiBlbmRSR0JBLmEgLSBzdGFydC5hLFxuICAgICAgICAgICAgfTtcbiAgICAgICAgfVxuICAgICAgICBlbHNlIHtcbiAgICAgICAgICAgIGRpZmYgPSBlbmQgLSBzdGFydDtcbiAgICAgICAgfVxuICAgICAgICBUd2Vlbi5hdHRyc1tub2RlSWRdW3RoaXMuX2lkXVtrZXldID0ge1xuICAgICAgICAgICAgc3RhcnQ6IHN0YXJ0LFxuICAgICAgICAgICAgZGlmZjogZGlmZixcbiAgICAgICAgICAgIGVuZDogZW5kLFxuICAgICAgICAgICAgdHJ1ZUVuZDogdHJ1ZUVuZCxcbiAgICAgICAgICAgIHRydWVTdGFydDogdHJ1ZVN0YXJ0LFxuICAgICAgICB9O1xuICAgICAgICBUd2Vlbi50d2VlbnNbbm9kZUlkXVtrZXldID0gdGhpcy5faWQ7XG4gICAgfVxuICAgIF90d2VlbkZ1bmMoaSkge1xuICAgICAgICB2YXIgbm9kZSA9IHRoaXMubm9kZSwgYXR0cnMgPSBUd2Vlbi5hdHRyc1tub2RlLl9pZF1bdGhpcy5faWRdLCBrZXksIGF0dHIsIHN0YXJ0LCBkaWZmLCBuZXdWYWwsIG4sIGxlbiwgZW5kO1xuICAgICAgICBmb3IgKGtleSBpbiBhdHRycykge1xuICAgICAgICAgICAgYXR0ciA9IGF0dHJzW2tleV07XG4gICAgICAgICAgICBzdGFydCA9IGF0dHIuc3RhcnQ7XG4gICAgICAgICAgICBkaWZmID0gYXR0ci5kaWZmO1xuICAgICAgICAgICAgZW5kID0gYXR0ci5lbmQ7XG4gICAgICAgICAgICBpZiAoVXRpbC5faXNBcnJheShzdGFydCkpIHtcbiAgICAgICAgICAgICAgICBuZXdWYWwgPSBbXTtcbiAgICAgICAgICAgICAgICBsZW4gPSBNYXRoLm1heChzdGFydC5sZW5ndGgsIGVuZC5sZW5ndGgpO1xuICAgICAgICAgICAgICAgIGlmIChrZXkuaW5kZXhPZignZmlsbCcpID09PSAwKSB7XG4gICAgICAgICAgICAgICAgICAgIGZvciAobiA9IDA7IG4gPCBsZW47IG4rKykge1xuICAgICAgICAgICAgICAgICAgICAgICAgaWYgKG4gJSAyID09PSAwKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgbmV3VmFsLnB1c2goKHN0YXJ0W25dIHx8IDApICsgZGlmZltuXSAqIGkpO1xuICAgICAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICAgICAgZWxzZSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgbmV3VmFsLnB1c2goJ3JnYmEoJyArXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIE1hdGgucm91bmQoc3RhcnRbbl0uciArIGRpZmZbbl0uciAqIGkpICtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgJywnICtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgTWF0aC5yb3VuZChzdGFydFtuXS5nICsgZGlmZltuXS5nICogaSkgK1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAnLCcgK1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBNYXRoLnJvdW5kKHN0YXJ0W25dLmIgKyBkaWZmW25dLmIgKiBpKSArXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICcsJyArXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIChzdGFydFtuXS5hICsgZGlmZltuXS5hICogaSkgK1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAnKScpO1xuICAgICAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIGVsc2Uge1xuICAgICAgICAgICAgICAgICAgICBmb3IgKG4gPSAwOyBuIDwgbGVuOyBuKyspIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIG5ld1ZhbC5wdXNoKChzdGFydFtuXSB8fCAwKSArIGRpZmZbbl0gKiBpKTtcbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGVsc2UgaWYgKGNvbG9yQXR0cnMuaW5kZXhPZihrZXkpICE9PSAtMSkge1xuICAgICAgICAgICAgICAgIG5ld1ZhbCA9XG4gICAgICAgICAgICAgICAgICAgICdyZ2JhKCcgK1xuICAgICAgICAgICAgICAgICAgICAgICAgTWF0aC5yb3VuZChzdGFydC5yICsgZGlmZi5yICogaSkgK1xuICAgICAgICAgICAgICAgICAgICAgICAgJywnICtcbiAgICAgICAgICAgICAgICAgICAgICAgIE1hdGgucm91bmQoc3RhcnQuZyArIGRpZmYuZyAqIGkpICtcbiAgICAgICAgICAgICAgICAgICAgICAgICcsJyArXG4gICAgICAgICAgICAgICAgICAgICAgICBNYXRoLnJvdW5kKHN0YXJ0LmIgKyBkaWZmLmIgKiBpKSArXG4gICAgICAgICAgICAgICAgICAgICAgICAnLCcgK1xuICAgICAgICAgICAgICAgICAgICAgICAgKHN0YXJ0LmEgKyBkaWZmLmEgKiBpKSArXG4gICAgICAgICAgICAgICAgICAgICAgICAnKSc7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBlbHNlIHtcbiAgICAgICAgICAgICAgICBuZXdWYWwgPSBzdGFydCArIGRpZmYgKiBpO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgbm9kZS5zZXRBdHRyKGtleSwgbmV3VmFsKTtcbiAgICAgICAgfVxuICAgIH1cbiAgICBfYWRkTGlzdGVuZXJzKCkge1xuICAgICAgICB0aGlzLnR3ZWVuLm9uUGxheSA9ICgpID0+IHtcbiAgICAgICAgICAgIHRoaXMuYW5pbS5zdGFydCgpO1xuICAgICAgICB9O1xuICAgICAgICB0aGlzLnR3ZWVuLm9uUmV2ZXJzZSA9ICgpID0+IHtcbiAgICAgICAgICAgIHRoaXMuYW5pbS5zdGFydCgpO1xuICAgICAgICB9O1xuICAgICAgICB0aGlzLnR3ZWVuLm9uUGF1c2UgPSAoKSA9PiB7XG4gICAgICAgICAgICB0aGlzLmFuaW0uc3RvcCgpO1xuICAgICAgICB9O1xuICAgICAgICB0aGlzLnR3ZWVuLm9uRmluaXNoID0gKCkgPT4ge1xuICAgICAgICAgICAgdmFyIG5vZGUgPSB0aGlzLm5vZGU7XG4gICAgICAgICAgICB2YXIgYXR0cnMgPSBUd2Vlbi5hdHRyc1tub2RlLl9pZF1bdGhpcy5faWRdO1xuICAgICAgICAgICAgaWYgKGF0dHJzLnBvaW50cyAmJiBhdHRycy5wb2ludHMudHJ1ZUVuZCkge1xuICAgICAgICAgICAgICAgIG5vZGUuc2V0QXR0cigncG9pbnRzJywgYXR0cnMucG9pbnRzLnRydWVFbmQpO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgaWYgKHRoaXMub25GaW5pc2gpIHtcbiAgICAgICAgICAgICAgICB0aGlzLm9uRmluaXNoLmNhbGwodGhpcyk7XG4gICAgICAgICAgICB9XG4gICAgICAgIH07XG4gICAgICAgIHRoaXMudHdlZW4ub25SZXNldCA9ICgpID0+IHtcbiAgICAgICAgICAgIHZhciBub2RlID0gdGhpcy5ub2RlO1xuICAgICAgICAgICAgdmFyIGF0dHJzID0gVHdlZW4uYXR0cnNbbm9kZS5faWRdW3RoaXMuX2lkXTtcbiAgICAgICAgICAgIGlmIChhdHRycy5wb2ludHMgJiYgYXR0cnMucG9pbnRzLnRydWVTdGFydCkge1xuICAgICAgICAgICAgICAgIG5vZGUucG9pbnRzKGF0dHJzLnBvaW50cy50cnVlU3RhcnQpO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgaWYgKHRoaXMub25SZXNldCkge1xuICAgICAgICAgICAgICAgIHRoaXMub25SZXNldCgpO1xuICAgICAgICAgICAgfVxuICAgICAgICB9O1xuICAgICAgICB0aGlzLnR3ZWVuLm9uVXBkYXRlID0gKCkgPT4ge1xuICAgICAgICAgICAgaWYgKHRoaXMub25VcGRhdGUpIHtcbiAgICAgICAgICAgICAgICB0aGlzLm9uVXBkYXRlLmNhbGwodGhpcyk7XG4gICAgICAgICAgICB9XG4gICAgICAgIH07XG4gICAgfVxuICAgIHBsYXkoKSB7XG4gICAgICAgIHRoaXMudHdlZW4ucGxheSgpO1xuICAgICAgICByZXR1cm4gdGhpcztcbiAgICB9XG4gICAgcmV2ZXJzZSgpIHtcbiAgICAgICAgdGhpcy50d2Vlbi5yZXZlcnNlKCk7XG4gICAgICAgIHJldHVybiB0aGlzO1xuICAgIH1cbiAgICByZXNldCgpIHtcbiAgICAgICAgdGhpcy50d2Vlbi5yZXNldCgpO1xuICAgICAgICByZXR1cm4gdGhpcztcbiAgICB9XG4gICAgc2Vlayh0KSB7XG4gICAgICAgIHRoaXMudHdlZW4uc2Vlayh0ICogMTAwMCk7XG4gICAgICAgIHJldHVybiB0aGlzO1xuICAgIH1cbiAgICBwYXVzZSgpIHtcbiAgICAgICAgdGhpcy50d2Vlbi5wYXVzZSgpO1xuICAgICAgICByZXR1cm4gdGhpcztcbiAgICB9XG4gICAgZmluaXNoKCkge1xuICAgICAgICB0aGlzLnR3ZWVuLmZpbmlzaCgpO1xuICAgICAgICByZXR1cm4gdGhpcztcbiAgICB9XG4gICAgZGVzdHJveSgpIHtcbiAgICAgICAgdmFyIG5vZGVJZCA9IHRoaXMubm9kZS5faWQsIHRoaXNJZCA9IHRoaXMuX2lkLCBhdHRycyA9IFR3ZWVuLnR3ZWVuc1tub2RlSWRdLCBrZXk7XG4gICAgICAgIHRoaXMucGF1c2UoKTtcbiAgICAgICAgZm9yIChrZXkgaW4gYXR0cnMpIHtcbiAgICAgICAgICAgIGRlbGV0ZSBUd2Vlbi50d2VlbnNbbm9kZUlkXVtrZXldO1xuICAgICAgICB9XG4gICAgICAgIGRlbGV0ZSBUd2Vlbi5hdHRyc1tub2RlSWRdW3RoaXNJZF07XG4gICAgfVxufVxuVHdlZW4uYXR0cnMgPSB7fTtcblR3ZWVuLnR3ZWVucyA9IHt9O1xuTm9kZS5wcm90b3R5cGUudG8gPSBmdW5jdGlvbiAocGFyYW1zKSB7XG4gICAgdmFyIG9uRmluaXNoID0gcGFyYW1zLm9uRmluaXNoO1xuICAgIHBhcmFtcy5ub2RlID0gdGhpcztcbiAgICBwYXJhbXMub25GaW5pc2ggPSBmdW5jdGlvbiAoKSB7XG4gICAgICAgIHRoaXMuZGVzdHJveSgpO1xuICAgICAgICBpZiAob25GaW5pc2gpIHtcbiAgICAgICAgICAgIG9uRmluaXNoKCk7XG4gICAgICAgIH1cbiAgICB9O1xuICAgIHZhciB0d2VlbiA9IG5ldyBUd2VlbihwYXJhbXMpO1xuICAgIHR3ZWVuLnBsYXkoKTtcbn07XG5leHBvcnQgY29uc3QgRWFzaW5ncyA9IHtcbiAgICBCYWNrRWFzZUluKHQsIGIsIGMsIGQpIHtcbiAgICAgICAgdmFyIHMgPSAxLjcwMTU4O1xuICAgICAgICByZXR1cm4gYyAqICh0IC89IGQpICogdCAqICgocyArIDEpICogdCAtIHMpICsgYjtcbiAgICB9LFxuICAgIEJhY2tFYXNlT3V0KHQsIGIsIGMsIGQpIHtcbiAgICAgICAgdmFyIHMgPSAxLjcwMTU4O1xuICAgICAgICByZXR1cm4gYyAqICgodCA9IHQgLyBkIC0gMSkgKiB0ICogKChzICsgMSkgKiB0ICsgcykgKyAxKSArIGI7XG4gICAgfSxcbiAgICBCYWNrRWFzZUluT3V0KHQsIGIsIGMsIGQpIHtcbiAgICAgICAgdmFyIHMgPSAxLjcwMTU4O1xuICAgICAgICBpZiAoKHQgLz0gZCAvIDIpIDwgMSkge1xuICAgICAgICAgICAgcmV0dXJuIChjIC8gMikgKiAodCAqIHQgKiAoKChzICo9IDEuNTI1KSArIDEpICogdCAtIHMpKSArIGI7XG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuIChjIC8gMikgKiAoKHQgLT0gMikgKiB0ICogKCgocyAqPSAxLjUyNSkgKyAxKSAqIHQgKyBzKSArIDIpICsgYjtcbiAgICB9LFxuICAgIEVsYXN0aWNFYXNlSW4odCwgYiwgYywgZCwgYSwgcCkge1xuICAgICAgICB2YXIgcyA9IDA7XG4gICAgICAgIGlmICh0ID09PSAwKSB7XG4gICAgICAgICAgICByZXR1cm4gYjtcbiAgICAgICAgfVxuICAgICAgICBpZiAoKHQgLz0gZCkgPT09IDEpIHtcbiAgICAgICAgICAgIHJldHVybiBiICsgYztcbiAgICAgICAgfVxuICAgICAgICBpZiAoIXApIHtcbiAgICAgICAgICAgIHAgPSBkICogMC4zO1xuICAgICAgICB9XG4gICAgICAgIGlmICghYSB8fCBhIDwgTWF0aC5hYnMoYykpIHtcbiAgICAgICAgICAgIGEgPSBjO1xuICAgICAgICAgICAgcyA9IHAgLyA0O1xuICAgICAgICB9XG4gICAgICAgIGVsc2Uge1xuICAgICAgICAgICAgcyA9IChwIC8gKDIgKiBNYXRoLlBJKSkgKiBNYXRoLmFzaW4oYyAvIGEpO1xuICAgICAgICB9XG4gICAgICAgIHJldHVybiAoLShhICpcbiAgICAgICAgICAgIE1hdGgucG93KDIsIDEwICogKHQgLT0gMSkpICpcbiAgICAgICAgICAgIE1hdGguc2luKCgodCAqIGQgLSBzKSAqICgyICogTWF0aC5QSSkpIC8gcCkpICsgYik7XG4gICAgfSxcbiAgICBFbGFzdGljRWFzZU91dCh0LCBiLCBjLCBkLCBhLCBwKSB7XG4gICAgICAgIHZhciBzID0gMDtcbiAgICAgICAgaWYgKHQgPT09IDApIHtcbiAgICAgICAgICAgIHJldHVybiBiO1xuICAgICAgICB9XG4gICAgICAgIGlmICgodCAvPSBkKSA9PT0gMSkge1xuICAgICAgICAgICAgcmV0dXJuIGIgKyBjO1xuICAgICAgICB9XG4gICAgICAgIGlmICghcCkge1xuICAgICAgICAgICAgcCA9IGQgKiAwLjM7XG4gICAgICAgIH1cbiAgICAgICAgaWYgKCFhIHx8IGEgPCBNYXRoLmFicyhjKSkge1xuICAgICAgICAgICAgYSA9IGM7XG4gICAgICAgICAgICBzID0gcCAvIDQ7XG4gICAgICAgIH1cbiAgICAgICAgZWxzZSB7XG4gICAgICAgICAgICBzID0gKHAgLyAoMiAqIE1hdGguUEkpKSAqIE1hdGguYXNpbihjIC8gYSk7XG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuIChhICogTWF0aC5wb3coMiwgLTEwICogdCkgKiBNYXRoLnNpbigoKHQgKiBkIC0gcykgKiAoMiAqIE1hdGguUEkpKSAvIHApICtcbiAgICAgICAgICAgIGMgK1xuICAgICAgICAgICAgYik7XG4gICAgfSxcbiAgICBFbGFzdGljRWFzZUluT3V0KHQsIGIsIGMsIGQsIGEsIHApIHtcbiAgICAgICAgdmFyIHMgPSAwO1xuICAgICAgICBpZiAodCA9PT0gMCkge1xuICAgICAgICAgICAgcmV0dXJuIGI7XG4gICAgICAgIH1cbiAgICAgICAgaWYgKCh0IC89IGQgLyAyKSA9PT0gMikge1xuICAgICAgICAgICAgcmV0dXJuIGIgKyBjO1xuICAgICAgICB9XG4gICAgICAgIGlmICghcCkge1xuICAgICAgICAgICAgcCA9IGQgKiAoMC4zICogMS41KTtcbiAgICAgICAgfVxuICAgICAgICBpZiAoIWEgfHwgYSA8IE1hdGguYWJzKGMpKSB7XG4gICAgICAgICAgICBhID0gYztcbiAgICAgICAgICAgIHMgPSBwIC8gNDtcbiAgICAgICAgfVxuICAgICAgICBlbHNlIHtcbiAgICAgICAgICAgIHMgPSAocCAvICgyICogTWF0aC5QSSkpICogTWF0aC5hc2luKGMgLyBhKTtcbiAgICAgICAgfVxuICAgICAgICBpZiAodCA8IDEpIHtcbiAgICAgICAgICAgIHJldHVybiAoLTAuNSAqXG4gICAgICAgICAgICAgICAgKGEgKlxuICAgICAgICAgICAgICAgICAgICBNYXRoLnBvdygyLCAxMCAqICh0IC09IDEpKSAqXG4gICAgICAgICAgICAgICAgICAgIE1hdGguc2luKCgodCAqIGQgLSBzKSAqICgyICogTWF0aC5QSSkpIC8gcCkpICtcbiAgICAgICAgICAgICAgICBiKTtcbiAgICAgICAgfVxuICAgICAgICByZXR1cm4gKGEgKlxuICAgICAgICAgICAgTWF0aC5wb3coMiwgLTEwICogKHQgLT0gMSkpICpcbiAgICAgICAgICAgIE1hdGguc2luKCgodCAqIGQgLSBzKSAqICgyICogTWF0aC5QSSkpIC8gcCkgKlxuICAgICAgICAgICAgMC41ICtcbiAgICAgICAgICAgIGMgK1xuICAgICAgICAgICAgYik7XG4gICAgfSxcbiAgICBCb3VuY2VFYXNlT3V0KHQsIGIsIGMsIGQpIHtcbiAgICAgICAgaWYgKCh0IC89IGQpIDwgMSAvIDIuNzUpIHtcbiAgICAgICAgICAgIHJldHVybiBjICogKDcuNTYyNSAqIHQgKiB0KSArIGI7XG4gICAgICAgIH1cbiAgICAgICAgZWxzZSBpZiAodCA8IDIgLyAyLjc1KSB7XG4gICAgICAgICAgICByZXR1cm4gYyAqICg3LjU2MjUgKiAodCAtPSAxLjUgLyAyLjc1KSAqIHQgKyAwLjc1KSArIGI7XG4gICAgICAgIH1cbiAgICAgICAgZWxzZSBpZiAodCA8IDIuNSAvIDIuNzUpIHtcbiAgICAgICAgICAgIHJldHVybiBjICogKDcuNTYyNSAqICh0IC09IDIuMjUgLyAyLjc1KSAqIHQgKyAwLjkzNzUpICsgYjtcbiAgICAgICAgfVxuICAgICAgICBlbHNlIHtcbiAgICAgICAgICAgIHJldHVybiBjICogKDcuNTYyNSAqICh0IC09IDIuNjI1IC8gMi43NSkgKiB0ICsgMC45ODQzNzUpICsgYjtcbiAgICAgICAgfVxuICAgIH0sXG4gICAgQm91bmNlRWFzZUluKHQsIGIsIGMsIGQpIHtcbiAgICAgICAgcmV0dXJuIGMgLSBFYXNpbmdzLkJvdW5jZUVhc2VPdXQoZCAtIHQsIDAsIGMsIGQpICsgYjtcbiAgICB9LFxuICAgIEJvdW5jZUVhc2VJbk91dCh0LCBiLCBjLCBkKSB7XG4gICAgICAgIGlmICh0IDwgZCAvIDIpIHtcbiAgICAgICAgICAgIHJldHVybiBFYXNpbmdzLkJvdW5jZUVhc2VJbih0ICogMiwgMCwgYywgZCkgKiAwLjUgKyBiO1xuICAgICAgICB9XG4gICAgICAgIGVsc2Uge1xuICAgICAgICAgICAgcmV0dXJuIEVhc2luZ3MuQm91bmNlRWFzZU91dCh0ICogMiAtIGQsIDAsIGMsIGQpICogMC41ICsgYyAqIDAuNSArIGI7XG4gICAgICAgIH1cbiAgICB9LFxuICAgIEVhc2VJbih0LCBiLCBjLCBkKSB7XG4gICAgICAgIHJldHVybiBjICogKHQgLz0gZCkgKiB0ICsgYjtcbiAgICB9LFxuICAgIEVhc2VPdXQodCwgYiwgYywgZCkge1xuICAgICAgICByZXR1cm4gLWMgKiAodCAvPSBkKSAqICh0IC0gMikgKyBiO1xuICAgIH0sXG4gICAgRWFzZUluT3V0KHQsIGIsIGMsIGQpIHtcbiAgICAgICAgaWYgKCh0IC89IGQgLyAyKSA8IDEpIHtcbiAgICAgICAgICAgIHJldHVybiAoYyAvIDIpICogdCAqIHQgKyBiO1xuICAgICAgICB9XG4gICAgICAgIHJldHVybiAoLWMgLyAyKSAqICgtLXQgKiAodCAtIDIpIC0gMSkgKyBiO1xuICAgIH0sXG4gICAgU3Ryb25nRWFzZUluKHQsIGIsIGMsIGQpIHtcbiAgICAgICAgcmV0dXJuIGMgKiAodCAvPSBkKSAqIHQgKiB0ICogdCAqIHQgKyBiO1xuICAgIH0sXG4gICAgU3Ryb25nRWFzZU91dCh0LCBiLCBjLCBkKSB7XG4gICAgICAgIHJldHVybiBjICogKCh0ID0gdCAvIGQgLSAxKSAqIHQgKiB0ICogdCAqIHQgKyAxKSArIGI7XG4gICAgfSxcbiAgICBTdHJvbmdFYXNlSW5PdXQodCwgYiwgYywgZCkge1xuICAgICAgICBpZiAoKHQgLz0gZCAvIDIpIDwgMSkge1xuICAgICAgICAgICAgcmV0dXJuIChjIC8gMikgKiB0ICogdCAqIHQgKiB0ICogdCArIGI7XG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuIChjIC8gMikgKiAoKHQgLT0gMikgKiB0ICogdCAqIHQgKiB0ICsgMikgKyBiO1xuICAgIH0sXG4gICAgTGluZWFyKHQsIGIsIGMsIGQpIHtcbiAgICAgICAgcmV0dXJuIChjICogdCkgLyBkICsgYjtcbiAgICB9LFxufTtcbiIsImltcG9ydCB7IEtvbnZhIH0gZnJvbSAnLi9HbG9iYWwuanMnO1xuZXhwb3J0IGNsYXNzIFRyYW5zZm9ybSB7XG4gICAgY29uc3RydWN0b3IobSA9IFsxLCAwLCAwLCAxLCAwLCAwXSkge1xuICAgICAgICB0aGlzLmRpcnR5ID0gZmFsc2U7XG4gICAgICAgIHRoaXMubSA9IChtICYmIG0uc2xpY2UoKSkgfHwgWzEsIDAsIDAsIDEsIDAsIDBdO1xuICAgIH1cbiAgICByZXNldCgpIHtcbiAgICAgICAgdGhpcy5tWzBdID0gMTtcbiAgICAgICAgdGhpcy5tWzFdID0gMDtcbiAgICAgICAgdGhpcy5tWzJdID0gMDtcbiAgICAgICAgdGhpcy5tWzNdID0gMTtcbiAgICAgICAgdGhpcy5tWzRdID0gMDtcbiAgICAgICAgdGhpcy5tWzVdID0gMDtcbiAgICB9XG4gICAgY29weSgpIHtcbiAgICAgICAgcmV0dXJuIG5ldyBUcmFuc2Zvcm0odGhpcy5tKTtcbiAgICB9XG4gICAgY29weUludG8odHIpIHtcbiAgICAgICAgdHIubVswXSA9IHRoaXMubVswXTtcbiAgICAgICAgdHIubVsxXSA9IHRoaXMubVsxXTtcbiAgICAgICAgdHIubVsyXSA9IHRoaXMubVsyXTtcbiAgICAgICAgdHIubVszXSA9IHRoaXMubVszXTtcbiAgICAgICAgdHIubVs0XSA9IHRoaXMubVs0XTtcbiAgICAgICAgdHIubVs1XSA9IHRoaXMubVs1XTtcbiAgICB9XG4gICAgcG9pbnQocG9pbnQpIHtcbiAgICAgICAgdmFyIG0gPSB0aGlzLm07XG4gICAgICAgIHJldHVybiB7XG4gICAgICAgICAgICB4OiBtWzBdICogcG9pbnQueCArIG1bMl0gKiBwb2ludC55ICsgbVs0XSxcbiAgICAgICAgICAgIHk6IG1bMV0gKiBwb2ludC54ICsgbVszXSAqIHBvaW50LnkgKyBtWzVdLFxuICAgICAgICB9O1xuICAgIH1cbiAgICB0cmFuc2xhdGUoeCwgeSkge1xuICAgICAgICB0aGlzLm1bNF0gKz0gdGhpcy5tWzBdICogeCArIHRoaXMubVsyXSAqIHk7XG4gICAgICAgIHRoaXMubVs1XSArPSB0aGlzLm1bMV0gKiB4ICsgdGhpcy5tWzNdICogeTtcbiAgICAgICAgcmV0dXJuIHRoaXM7XG4gICAgfVxuICAgIHNjYWxlKHN4LCBzeSkge1xuICAgICAgICB0aGlzLm1bMF0gKj0gc3g7XG4gICAgICAgIHRoaXMubVsxXSAqPSBzeDtcbiAgICAgICAgdGhpcy5tWzJdICo9IHN5O1xuICAgICAgICB0aGlzLm1bM10gKj0gc3k7XG4gICAgICAgIHJldHVybiB0aGlzO1xuICAgIH1cbiAgICByb3RhdGUocmFkKSB7XG4gICAgICAgIHZhciBjID0gTWF0aC5jb3MocmFkKTtcbiAgICAgICAgdmFyIHMgPSBNYXRoLnNpbihyYWQpO1xuICAgICAgICB2YXIgbTExID0gdGhpcy5tWzBdICogYyArIHRoaXMubVsyXSAqIHM7XG4gICAgICAgIHZhciBtMTIgPSB0aGlzLm1bMV0gKiBjICsgdGhpcy5tWzNdICogcztcbiAgICAgICAgdmFyIG0yMSA9IHRoaXMubVswXSAqIC1zICsgdGhpcy5tWzJdICogYztcbiAgICAgICAgdmFyIG0yMiA9IHRoaXMubVsxXSAqIC1zICsgdGhpcy5tWzNdICogYztcbiAgICAgICAgdGhpcy5tWzBdID0gbTExO1xuICAgICAgICB0aGlzLm1bMV0gPSBtMTI7XG4gICAgICAgIHRoaXMubVsyXSA9IG0yMTtcbiAgICAgICAgdGhpcy5tWzNdID0gbTIyO1xuICAgICAgICByZXR1cm4gdGhpcztcbiAgICB9XG4gICAgZ2V0VHJhbnNsYXRpb24oKSB7XG4gICAgICAgIHJldHVybiB7XG4gICAgICAgICAgICB4OiB0aGlzLm1bNF0sXG4gICAgICAgICAgICB5OiB0aGlzLm1bNV0sXG4gICAgICAgIH07XG4gICAgfVxuICAgIHNrZXcoc3gsIHN5KSB7XG4gICAgICAgIHZhciBtMTEgPSB0aGlzLm1bMF0gKyB0aGlzLm1bMl0gKiBzeTtcbiAgICAgICAgdmFyIG0xMiA9IHRoaXMubVsxXSArIHRoaXMubVszXSAqIHN5O1xuICAgICAgICB2YXIgbTIxID0gdGhpcy5tWzJdICsgdGhpcy5tWzBdICogc3g7XG4gICAgICAgIHZhciBtMjIgPSB0aGlzLm1bM10gKyB0aGlzLm1bMV0gKiBzeDtcbiAgICAgICAgdGhpcy5tWzBdID0gbTExO1xuICAgICAgICB0aGlzLm1bMV0gPSBtMTI7XG4gICAgICAgIHRoaXMubVsyXSA9IG0yMTtcbiAgICAgICAgdGhpcy5tWzNdID0gbTIyO1xuICAgICAgICByZXR1cm4gdGhpcztcbiAgICB9XG4gICAgbXVsdGlwbHkobWF0cml4KSB7XG4gICAgICAgIHZhciBtMTEgPSB0aGlzLm1bMF0gKiBtYXRyaXgubVswXSArIHRoaXMubVsyXSAqIG1hdHJpeC5tWzFdO1xuICAgICAgICB2YXIgbTEyID0gdGhpcy5tWzFdICogbWF0cml4Lm1bMF0gKyB0aGlzLm1bM10gKiBtYXRyaXgubVsxXTtcbiAgICAgICAgdmFyIG0yMSA9IHRoaXMubVswXSAqIG1hdHJpeC5tWzJdICsgdGhpcy5tWzJdICogbWF0cml4Lm1bM107XG4gICAgICAgIHZhciBtMjIgPSB0aGlzLm1bMV0gKiBtYXRyaXgubVsyXSArIHRoaXMubVszXSAqIG1hdHJpeC5tWzNdO1xuICAgICAgICB2YXIgZHggPSB0aGlzLm1bMF0gKiBtYXRyaXgubVs0XSArIHRoaXMubVsyXSAqIG1hdHJpeC5tWzVdICsgdGhpcy5tWzRdO1xuICAgICAgICB2YXIgZHkgPSB0aGlzLm1bMV0gKiBtYXRyaXgubVs0XSArIHRoaXMubVszXSAqIG1hdHJpeC5tWzVdICsgdGhpcy5tWzVdO1xuICAgICAgICB0aGlzLm1bMF0gPSBtMTE7XG4gICAgICAgIHRoaXMubVsxXSA9IG0xMjtcbiAgICAgICAgdGhpcy5tWzJdID0gbTIxO1xuICAgICAgICB0aGlzLm1bM10gPSBtMjI7XG4gICAgICAgIHRoaXMubVs0XSA9IGR4O1xuICAgICAgICB0aGlzLm1bNV0gPSBkeTtcbiAgICAgICAgcmV0dXJuIHRoaXM7XG4gICAgfVxuICAgIGludmVydCgpIHtcbiAgICAgICAgdmFyIGQgPSAxIC8gKHRoaXMubVswXSAqIHRoaXMubVszXSAtIHRoaXMubVsxXSAqIHRoaXMubVsyXSk7XG4gICAgICAgIHZhciBtMCA9IHRoaXMubVszXSAqIGQ7XG4gICAgICAgIHZhciBtMSA9IC10aGlzLm1bMV0gKiBkO1xuICAgICAgICB2YXIgbTIgPSAtdGhpcy5tWzJdICogZDtcbiAgICAgICAgdmFyIG0zID0gdGhpcy5tWzBdICogZDtcbiAgICAgICAgdmFyIG00ID0gZCAqICh0aGlzLm1bMl0gKiB0aGlzLm1bNV0gLSB0aGlzLm1bM10gKiB0aGlzLm1bNF0pO1xuICAgICAgICB2YXIgbTUgPSBkICogKHRoaXMubVsxXSAqIHRoaXMubVs0XSAtIHRoaXMubVswXSAqIHRoaXMubVs1XSk7XG4gICAgICAgIHRoaXMubVswXSA9IG0wO1xuICAgICAgICB0aGlzLm1bMV0gPSBtMTtcbiAgICAgICAgdGhpcy5tWzJdID0gbTI7XG4gICAgICAgIHRoaXMubVszXSA9IG0zO1xuICAgICAgICB0aGlzLm1bNF0gPSBtNDtcbiAgICAgICAgdGhpcy5tWzVdID0gbTU7XG4gICAgICAgIHJldHVybiB0aGlzO1xuICAgIH1cbiAgICBnZXRNYXRyaXgoKSB7XG4gICAgICAgIHJldHVybiB0aGlzLm07XG4gICAgfVxuICAgIGRlY29tcG9zZSgpIHtcbiAgICAgICAgdmFyIGEgPSB0aGlzLm1bMF07XG4gICAgICAgIHZhciBiID0gdGhpcy5tWzFdO1xuICAgICAgICB2YXIgYyA9IHRoaXMubVsyXTtcbiAgICAgICAgdmFyIGQgPSB0aGlzLm1bM107XG4gICAgICAgIHZhciBlID0gdGhpcy5tWzRdO1xuICAgICAgICB2YXIgZiA9IHRoaXMubVs1XTtcbiAgICAgICAgdmFyIGRlbHRhID0gYSAqIGQgLSBiICogYztcbiAgICAgICAgbGV0IHJlc3VsdCA9IHtcbiAgICAgICAgICAgIHg6IGUsXG4gICAgICAgICAgICB5OiBmLFxuICAgICAgICAgICAgcm90YXRpb246IDAsXG4gICAgICAgICAgICBzY2FsZVg6IDAsXG4gICAgICAgICAgICBzY2FsZVk6IDAsXG4gICAgICAgICAgICBza2V3WDogMCxcbiAgICAgICAgICAgIHNrZXdZOiAwLFxuICAgICAgICB9O1xuICAgICAgICBpZiAoYSAhPSAwIHx8IGIgIT0gMCkge1xuICAgICAgICAgICAgdmFyIHIgPSBNYXRoLnNxcnQoYSAqIGEgKyBiICogYik7XG4gICAgICAgICAgICByZXN1bHQucm90YXRpb24gPSBiID4gMCA/IE1hdGguYWNvcyhhIC8gcikgOiAtTWF0aC5hY29zKGEgLyByKTtcbiAgICAgICAgICAgIHJlc3VsdC5zY2FsZVggPSByO1xuICAgICAgICAgICAgcmVzdWx0LnNjYWxlWSA9IGRlbHRhIC8gcjtcbiAgICAgICAgICAgIHJlc3VsdC5za2V3WCA9IChhICogYyArIGIgKiBkKSAvIGRlbHRhO1xuICAgICAgICAgICAgcmVzdWx0LnNrZXdZID0gMDtcbiAgICAgICAgfVxuICAgICAgICBlbHNlIGlmIChjICE9IDAgfHwgZCAhPSAwKSB7XG4gICAgICAgICAgICB2YXIgcyA9IE1hdGguc3FydChjICogYyArIGQgKiBkKTtcbiAgICAgICAgICAgIHJlc3VsdC5yb3RhdGlvbiA9XG4gICAgICAgICAgICAgICAgTWF0aC5QSSAvIDIgLSAoZCA+IDAgPyBNYXRoLmFjb3MoLWMgLyBzKSA6IC1NYXRoLmFjb3MoYyAvIHMpKTtcbiAgICAgICAgICAgIHJlc3VsdC5zY2FsZVggPSBkZWx0YSAvIHM7XG4gICAgICAgICAgICByZXN1bHQuc2NhbGVZID0gcztcbiAgICAgICAgICAgIHJlc3VsdC5za2V3WCA9IDA7XG4gICAgICAgICAgICByZXN1bHQuc2tld1kgPSAoYSAqIGMgKyBiICogZCkgLyBkZWx0YTtcbiAgICAgICAgfVxuICAgICAgICBlbHNlIHtcbiAgICAgICAgfVxuICAgICAgICByZXN1bHQucm90YXRpb24gPSBVdGlsLl9nZXRSb3RhdGlvbihyZXN1bHQucm90YXRpb24pO1xuICAgICAgICByZXR1cm4gcmVzdWx0O1xuICAgIH1cbn1cbnZhciBPQkpFQ1RfQVJSQVkgPSAnW29iamVjdCBBcnJheV0nLCBPQkpFQ1RfTlVNQkVSID0gJ1tvYmplY3QgTnVtYmVyXScsIE9CSkVDVF9TVFJJTkcgPSAnW29iamVjdCBTdHJpbmddJywgT0JKRUNUX0JPT0xFQU4gPSAnW29iamVjdCBCb29sZWFuXScsIFBJX09WRVJfREVHMTgwID0gTWF0aC5QSSAvIDE4MCwgREVHMTgwX09WRVJfUEkgPSAxODAgLyBNYXRoLlBJLCBIQVNIID0gJyMnLCBFTVBUWV9TVFJJTkcgPSAnJywgWkVSTyA9ICcwJywgS09OVkFfV0FSTklORyA9ICdLb252YSB3YXJuaW5nOiAnLCBLT05WQV9FUlJPUiA9ICdLb252YSBlcnJvcjogJywgUkdCX1BBUkVOID0gJ3JnYignLCBDT0xPUlMgPSB7XG4gICAgYWxpY2VibHVlOiBbMjQwLCAyNDgsIDI1NV0sXG4gICAgYW50aXF1ZXdoaXRlOiBbMjUwLCAyMzUsIDIxNV0sXG4gICAgYXF1YTogWzAsIDI1NSwgMjU1XSxcbiAgICBhcXVhbWFyaW5lOiBbMTI3LCAyNTUsIDIxMl0sXG4gICAgYXp1cmU6IFsyNDAsIDI1NSwgMjU1XSxcbiAgICBiZWlnZTogWzI0NSwgMjQ1LCAyMjBdLFxuICAgIGJpc3F1ZTogWzI1NSwgMjI4LCAxOTZdLFxuICAgIGJsYWNrOiBbMCwgMCwgMF0sXG4gICAgYmxhbmNoZWRhbG1vbmQ6IFsyNTUsIDIzNSwgMjA1XSxcbiAgICBibHVlOiBbMCwgMCwgMjU1XSxcbiAgICBibHVldmlvbGV0OiBbMTM4LCA0MywgMjI2XSxcbiAgICBicm93bjogWzE2NSwgNDIsIDQyXSxcbiAgICBidXJseXdvb2Q6IFsyMjIsIDE4NCwgMTM1XSxcbiAgICBjYWRldGJsdWU6IFs5NSwgMTU4LCAxNjBdLFxuICAgIGNoYXJ0cmV1c2U6IFsxMjcsIDI1NSwgMF0sXG4gICAgY2hvY29sYXRlOiBbMjEwLCAxMDUsIDMwXSxcbiAgICBjb3JhbDogWzI1NSwgMTI3LCA4MF0sXG4gICAgY29ybmZsb3dlcmJsdWU6IFsxMDAsIDE0OSwgMjM3XSxcbiAgICBjb3Juc2lsazogWzI1NSwgMjQ4LCAyMjBdLFxuICAgIGNyaW1zb246IFsyMjAsIDIwLCA2MF0sXG4gICAgY3lhbjogWzAsIDI1NSwgMjU1XSxcbiAgICBkYXJrYmx1ZTogWzAsIDAsIDEzOV0sXG4gICAgZGFya2N5YW46IFswLCAxMzksIDEzOV0sXG4gICAgZGFya2dvbGRlbnJvZDogWzE4NCwgMTMyLCAxMV0sXG4gICAgZGFya2dyYXk6IFsxNjksIDE2OSwgMTY5XSxcbiAgICBkYXJrZ3JlZW46IFswLCAxMDAsIDBdLFxuICAgIGRhcmtncmV5OiBbMTY5LCAxNjksIDE2OV0sXG4gICAgZGFya2toYWtpOiBbMTg5LCAxODMsIDEwN10sXG4gICAgZGFya21hZ2VudGE6IFsxMzksIDAsIDEzOV0sXG4gICAgZGFya29saXZlZ3JlZW46IFs4NSwgMTA3LCA0N10sXG4gICAgZGFya29yYW5nZTogWzI1NSwgMTQwLCAwXSxcbiAgICBkYXJrb3JjaGlkOiBbMTUzLCA1MCwgMjA0XSxcbiAgICBkYXJrcmVkOiBbMTM5LCAwLCAwXSxcbiAgICBkYXJrc2FsbW9uOiBbMjMzLCAxNTAsIDEyMl0sXG4gICAgZGFya3NlYWdyZWVuOiBbMTQzLCAxODgsIDE0M10sXG4gICAgZGFya3NsYXRlYmx1ZTogWzcyLCA2MSwgMTM5XSxcbiAgICBkYXJrc2xhdGVncmF5OiBbNDcsIDc5LCA3OV0sXG4gICAgZGFya3NsYXRlZ3JleTogWzQ3LCA3OSwgNzldLFxuICAgIGRhcmt0dXJxdW9pc2U6IFswLCAyMDYsIDIwOV0sXG4gICAgZGFya3Zpb2xldDogWzE0OCwgMCwgMjExXSxcbiAgICBkZWVwcGluazogWzI1NSwgMjAsIDE0N10sXG4gICAgZGVlcHNreWJsdWU6IFswLCAxOTEsIDI1NV0sXG4gICAgZGltZ3JheTogWzEwNSwgMTA1LCAxMDVdLFxuICAgIGRpbWdyZXk6IFsxMDUsIDEwNSwgMTA1XSxcbiAgICBkb2RnZXJibHVlOiBbMzAsIDE0NCwgMjU1XSxcbiAgICBmaXJlYnJpY2s6IFsxNzgsIDM0LCAzNF0sXG4gICAgZmxvcmFsd2hpdGU6IFsyNTUsIDI1NSwgMjQwXSxcbiAgICBmb3Jlc3RncmVlbjogWzM0LCAxMzksIDM0XSxcbiAgICBmdWNoc2lhOiBbMjU1LCAwLCAyNTVdLFxuICAgIGdhaW5zYm9ybzogWzIyMCwgMjIwLCAyMjBdLFxuICAgIGdob3N0d2hpdGU6IFsyNDgsIDI0OCwgMjU1XSxcbiAgICBnb2xkOiBbMjU1LCAyMTUsIDBdLFxuICAgIGdvbGRlbnJvZDogWzIxOCwgMTY1LCAzMl0sXG4gICAgZ3JheTogWzEyOCwgMTI4LCAxMjhdLFxuICAgIGdyZWVuOiBbMCwgMTI4LCAwXSxcbiAgICBncmVlbnllbGxvdzogWzE3MywgMjU1LCA0N10sXG4gICAgZ3JleTogWzEyOCwgMTI4LCAxMjhdLFxuICAgIGhvbmV5ZGV3OiBbMjQwLCAyNTUsIDI0MF0sXG4gICAgaG90cGluazogWzI1NSwgMTA1LCAxODBdLFxuICAgIGluZGlhbnJlZDogWzIwNSwgOTIsIDkyXSxcbiAgICBpbmRpZ286IFs3NSwgMCwgMTMwXSxcbiAgICBpdm9yeTogWzI1NSwgMjU1LCAyNDBdLFxuICAgIGtoYWtpOiBbMjQwLCAyMzAsIDE0MF0sXG4gICAgbGF2ZW5kZXI6IFsyMzAsIDIzMCwgMjUwXSxcbiAgICBsYXZlbmRlcmJsdXNoOiBbMjU1LCAyNDAsIDI0NV0sXG4gICAgbGF3bmdyZWVuOiBbMTI0LCAyNTIsIDBdLFxuICAgIGxlbW9uY2hpZmZvbjogWzI1NSwgMjUwLCAyMDVdLFxuICAgIGxpZ2h0Ymx1ZTogWzE3MywgMjE2LCAyMzBdLFxuICAgIGxpZ2h0Y29yYWw6IFsyNDAsIDEyOCwgMTI4XSxcbiAgICBsaWdodGN5YW46IFsyMjQsIDI1NSwgMjU1XSxcbiAgICBsaWdodGdvbGRlbnJvZHllbGxvdzogWzI1MCwgMjUwLCAyMTBdLFxuICAgIGxpZ2h0Z3JheTogWzIxMSwgMjExLCAyMTFdLFxuICAgIGxpZ2h0Z3JlZW46IFsxNDQsIDIzOCwgMTQ0XSxcbiAgICBsaWdodGdyZXk6IFsyMTEsIDIxMSwgMjExXSxcbiAgICBsaWdodHBpbms6IFsyNTUsIDE4MiwgMTkzXSxcbiAgICBsaWdodHNhbG1vbjogWzI1NSwgMTYwLCAxMjJdLFxuICAgIGxpZ2h0c2VhZ3JlZW46IFszMiwgMTc4LCAxNzBdLFxuICAgIGxpZ2h0c2t5Ymx1ZTogWzEzNSwgMjA2LCAyNTBdLFxuICAgIGxpZ2h0c2xhdGVncmF5OiBbMTE5LCAxMzYsIDE1M10sXG4gICAgbGlnaHRzbGF0ZWdyZXk6IFsxMTksIDEzNiwgMTUzXSxcbiAgICBsaWdodHN0ZWVsYmx1ZTogWzE3NiwgMTk2LCAyMjJdLFxuICAgIGxpZ2h0eWVsbG93OiBbMjU1LCAyNTUsIDIyNF0sXG4gICAgbGltZTogWzAsIDI1NSwgMF0sXG4gICAgbGltZWdyZWVuOiBbNTAsIDIwNSwgNTBdLFxuICAgIGxpbmVuOiBbMjUwLCAyNDAsIDIzMF0sXG4gICAgbWFnZW50YTogWzI1NSwgMCwgMjU1XSxcbiAgICBtYXJvb246IFsxMjgsIDAsIDBdLFxuICAgIG1lZGl1bWFxdWFtYXJpbmU6IFsxMDIsIDIwNSwgMTcwXSxcbiAgICBtZWRpdW1ibHVlOiBbMCwgMCwgMjA1XSxcbiAgICBtZWRpdW1vcmNoaWQ6IFsxODYsIDg1LCAyMTFdLFxuICAgIG1lZGl1bXB1cnBsZTogWzE0NywgMTEyLCAyMTldLFxuICAgIG1lZGl1bXNlYWdyZWVuOiBbNjAsIDE3OSwgMTEzXSxcbiAgICBtZWRpdW1zbGF0ZWJsdWU6IFsxMjMsIDEwNCwgMjM4XSxcbiAgICBtZWRpdW1zcHJpbmdncmVlbjogWzAsIDI1MCwgMTU0XSxcbiAgICBtZWRpdW10dXJxdW9pc2U6IFs3MiwgMjA5LCAyMDRdLFxuICAgIG1lZGl1bXZpb2xldHJlZDogWzE5OSwgMjEsIDEzM10sXG4gICAgbWlkbmlnaHRibHVlOiBbMjUsIDI1LCAxMTJdLFxuICAgIG1pbnRjcmVhbTogWzI0NSwgMjU1LCAyNTBdLFxuICAgIG1pc3R5cm9zZTogWzI1NSwgMjI4LCAyMjVdLFxuICAgIG1vY2Nhc2luOiBbMjU1LCAyMjgsIDE4MV0sXG4gICAgbmF2YWpvd2hpdGU6IFsyNTUsIDIyMiwgMTczXSxcbiAgICBuYXZ5OiBbMCwgMCwgMTI4XSxcbiAgICBvbGRsYWNlOiBbMjUzLCAyNDUsIDIzMF0sXG4gICAgb2xpdmU6IFsxMjgsIDEyOCwgMF0sXG4gICAgb2xpdmVkcmFiOiBbMTA3LCAxNDIsIDM1XSxcbiAgICBvcmFuZ2U6IFsyNTUsIDE2NSwgMF0sXG4gICAgb3JhbmdlcmVkOiBbMjU1LCA2OSwgMF0sXG4gICAgb3JjaGlkOiBbMjE4LCAxMTIsIDIxNF0sXG4gICAgcGFsZWdvbGRlbnJvZDogWzIzOCwgMjMyLCAxNzBdLFxuICAgIHBhbGVncmVlbjogWzE1MiwgMjUxLCAxNTJdLFxuICAgIHBhbGV0dXJxdW9pc2U6IFsxNzUsIDIzOCwgMjM4XSxcbiAgICBwYWxldmlvbGV0cmVkOiBbMjE5LCAxMTIsIDE0N10sXG4gICAgcGFwYXlhd2hpcDogWzI1NSwgMjM5LCAyMTNdLFxuICAgIHBlYWNocHVmZjogWzI1NSwgMjE4LCAxODVdLFxuICAgIHBlcnU6IFsyMDUsIDEzMywgNjNdLFxuICAgIHBpbms6IFsyNTUsIDE5MiwgMjAzXSxcbiAgICBwbHVtOiBbMjIxLCAxNjAsIDIwM10sXG4gICAgcG93ZGVyYmx1ZTogWzE3NiwgMjI0LCAyMzBdLFxuICAgIHB1cnBsZTogWzEyOCwgMCwgMTI4XSxcbiAgICByZWJlY2NhcHVycGxlOiBbMTAyLCA1MSwgMTUzXSxcbiAgICByZWQ6IFsyNTUsIDAsIDBdLFxuICAgIHJvc3licm93bjogWzE4OCwgMTQzLCAxNDNdLFxuICAgIHJveWFsYmx1ZTogWzY1LCAxMDUsIDIyNV0sXG4gICAgc2FkZGxlYnJvd246IFsxMzksIDY5LCAxOV0sXG4gICAgc2FsbW9uOiBbMjUwLCAxMjgsIDExNF0sXG4gICAgc2FuZHlicm93bjogWzI0NCwgMTY0LCA5Nl0sXG4gICAgc2VhZ3JlZW46IFs0NiwgMTM5LCA4N10sXG4gICAgc2Vhc2hlbGw6IFsyNTUsIDI0NSwgMjM4XSxcbiAgICBzaWVubmE6IFsxNjAsIDgyLCA0NV0sXG4gICAgc2lsdmVyOiBbMTkyLCAxOTIsIDE5Ml0sXG4gICAgc2t5Ymx1ZTogWzEzNSwgMjA2LCAyMzVdLFxuICAgIHNsYXRlYmx1ZTogWzEwNiwgOTAsIDIwNV0sXG4gICAgc2xhdGVncmF5OiBbMTE5LCAxMjgsIDE0NF0sXG4gICAgc2xhdGVncmV5OiBbMTE5LCAxMjgsIDE0NF0sXG4gICAgc25vdzogWzI1NSwgMjU1LCAyNTBdLFxuICAgIHNwcmluZ2dyZWVuOiBbMCwgMjU1LCAxMjddLFxuICAgIHN0ZWVsYmx1ZTogWzcwLCAxMzAsIDE4MF0sXG4gICAgdGFuOiBbMjEwLCAxODAsIDE0MF0sXG4gICAgdGVhbDogWzAsIDEyOCwgMTI4XSxcbiAgICB0aGlzdGxlOiBbMjE2LCAxOTEsIDIxNl0sXG4gICAgdHJhbnNwYXJlbnQ6IFsyNTUsIDI1NSwgMjU1LCAwXSxcbiAgICB0b21hdG86IFsyNTUsIDk5LCA3MV0sXG4gICAgdHVycXVvaXNlOiBbNjQsIDIyNCwgMjA4XSxcbiAgICB2aW9sZXQ6IFsyMzgsIDEzMCwgMjM4XSxcbiAgICB3aGVhdDogWzI0NSwgMjIyLCAxNzldLFxuICAgIHdoaXRlOiBbMjU1LCAyNTUsIDI1NV0sXG4gICAgd2hpdGVzbW9rZTogWzI0NSwgMjQ1LCAyNDVdLFxuICAgIHllbGxvdzogWzI1NSwgMjU1LCAwXSxcbiAgICB5ZWxsb3dncmVlbjogWzE1NCwgMjA1LCA1XSxcbn0sIFJHQl9SRUdFWCA9IC9yZ2JcXCgoXFxkezEsM30pLChcXGR7MSwzfSksKFxcZHsxLDN9KVxcKS8sIGFuaW1RdWV1ZSA9IFtdO1xuY29uc3QgcmVxID0gKHR5cGVvZiByZXF1ZXN0QW5pbWF0aW9uRnJhbWUgIT09ICd1bmRlZmluZWQnICYmIHJlcXVlc3RBbmltYXRpb25GcmFtZSkgfHxcbiAgICBmdW5jdGlvbiAoZikge1xuICAgICAgICBzZXRUaW1lb3V0KGYsIDYwKTtcbiAgICB9O1xuZXhwb3J0IGNvbnN0IFV0aWwgPSB7XG4gICAgX2lzRWxlbWVudChvYmopIHtcbiAgICAgICAgcmV0dXJuICEhKG9iaiAmJiBvYmoubm9kZVR5cGUgPT0gMSk7XG4gICAgfSxcbiAgICBfaXNGdW5jdGlvbihvYmopIHtcbiAgICAgICAgcmV0dXJuICEhKG9iaiAmJiBvYmouY29uc3RydWN0b3IgJiYgb2JqLmNhbGwgJiYgb2JqLmFwcGx5KTtcbiAgICB9LFxuICAgIF9pc1BsYWluT2JqZWN0KG9iaikge1xuICAgICAgICByZXR1cm4gISFvYmogJiYgb2JqLmNvbnN0cnVjdG9yID09PSBPYmplY3Q7XG4gICAgfSxcbiAgICBfaXNBcnJheShvYmopIHtcbiAgICAgICAgcmV0dXJuIE9iamVjdC5wcm90b3R5cGUudG9TdHJpbmcuY2FsbChvYmopID09PSBPQkpFQ1RfQVJSQVk7XG4gICAgfSxcbiAgICBfaXNOdW1iZXIob2JqKSB7XG4gICAgICAgIHJldHVybiAoT2JqZWN0LnByb3RvdHlwZS50b1N0cmluZy5jYWxsKG9iaikgPT09IE9CSkVDVF9OVU1CRVIgJiZcbiAgICAgICAgICAgICFpc05hTihvYmopICYmXG4gICAgICAgICAgICBpc0Zpbml0ZShvYmopKTtcbiAgICB9LFxuICAgIF9pc1N0cmluZyhvYmopIHtcbiAgICAgICAgcmV0dXJuIE9iamVjdC5wcm90b3R5cGUudG9TdHJpbmcuY2FsbChvYmopID09PSBPQkpFQ1RfU1RSSU5HO1xuICAgIH0sXG4gICAgX2lzQm9vbGVhbihvYmopIHtcbiAgICAgICAgcmV0dXJuIE9iamVjdC5wcm90b3R5cGUudG9TdHJpbmcuY2FsbChvYmopID09PSBPQkpFQ1RfQk9PTEVBTjtcbiAgICB9LFxuICAgIGlzT2JqZWN0KHZhbCkge1xuICAgICAgICByZXR1cm4gdmFsIGluc3RhbmNlb2YgT2JqZWN0O1xuICAgIH0sXG4gICAgaXNWYWxpZFNlbGVjdG9yKHNlbGVjdG9yKSB7XG4gICAgICAgIGlmICh0eXBlb2Ygc2VsZWN0b3IgIT09ICdzdHJpbmcnKSB7XG4gICAgICAgICAgICByZXR1cm4gZmFsc2U7XG4gICAgICAgIH1cbiAgICAgICAgdmFyIGZpcnN0Q2hhciA9IHNlbGVjdG9yWzBdO1xuICAgICAgICByZXR1cm4gKGZpcnN0Q2hhciA9PT0gJyMnIHx8XG4gICAgICAgICAgICBmaXJzdENoYXIgPT09ICcuJyB8fFxuICAgICAgICAgICAgZmlyc3RDaGFyID09PSBmaXJzdENoYXIudG9VcHBlckNhc2UoKSk7XG4gICAgfSxcbiAgICBfc2lnbihudW1iZXIpIHtcbiAgICAgICAgaWYgKG51bWJlciA9PT0gMCkge1xuICAgICAgICAgICAgcmV0dXJuIDE7XG4gICAgICAgIH1cbiAgICAgICAgaWYgKG51bWJlciA+IDApIHtcbiAgICAgICAgICAgIHJldHVybiAxO1xuICAgICAgICB9XG4gICAgICAgIGVsc2Uge1xuICAgICAgICAgICAgcmV0dXJuIC0xO1xuICAgICAgICB9XG4gICAgfSxcbiAgICByZXF1ZXN0QW5pbUZyYW1lKGNhbGxiYWNrKSB7XG4gICAgICAgIGFuaW1RdWV1ZS5wdXNoKGNhbGxiYWNrKTtcbiAgICAgICAgaWYgKGFuaW1RdWV1ZS5sZW5ndGggPT09IDEpIHtcbiAgICAgICAgICAgIHJlcShmdW5jdGlvbiAoKSB7XG4gICAgICAgICAgICAgICAgY29uc3QgcXVldWUgPSBhbmltUXVldWU7XG4gICAgICAgICAgICAgICAgYW5pbVF1ZXVlID0gW107XG4gICAgICAgICAgICAgICAgcXVldWUuZm9yRWFjaChmdW5jdGlvbiAoY2IpIHtcbiAgICAgICAgICAgICAgICAgICAgY2IoKTtcbiAgICAgICAgICAgICAgICB9KTtcbiAgICAgICAgICAgIH0pO1xuICAgICAgICB9XG4gICAgfSxcbiAgICBjcmVhdGVDYW52YXNFbGVtZW50KCkge1xuICAgICAgICB2YXIgY2FudmFzID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnY2FudmFzJyk7XG4gICAgICAgIHRyeSB7XG4gICAgICAgICAgICBjYW52YXMuc3R5bGUgPSBjYW52YXMuc3R5bGUgfHwge307XG4gICAgICAgIH1cbiAgICAgICAgY2F0Y2ggKGUpIHsgfVxuICAgICAgICByZXR1cm4gY2FudmFzO1xuICAgIH0sXG4gICAgY3JlYXRlSW1hZ2VFbGVtZW50KCkge1xuICAgICAgICByZXR1cm4gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnaW1nJyk7XG4gICAgfSxcbiAgICBfaXNJbkRvY3VtZW50KGVsKSB7XG4gICAgICAgIHdoaWxlICgoZWwgPSBlbC5wYXJlbnROb2RlKSkge1xuICAgICAgICAgICAgaWYgKGVsID09IGRvY3VtZW50KSB7XG4gICAgICAgICAgICAgICAgcmV0dXJuIHRydWU7XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuIGZhbHNlO1xuICAgIH0sXG4gICAgX3VybFRvSW1hZ2UodXJsLCBjYWxsYmFjaykge1xuICAgICAgICB2YXIgaW1hZ2VPYmogPSBVdGlsLmNyZWF0ZUltYWdlRWxlbWVudCgpO1xuICAgICAgICBpbWFnZU9iai5vbmxvYWQgPSBmdW5jdGlvbiAoKSB7XG4gICAgICAgICAgICBjYWxsYmFjayhpbWFnZU9iaik7XG4gICAgICAgIH07XG4gICAgICAgIGltYWdlT2JqLnNyYyA9IHVybDtcbiAgICB9LFxuICAgIF9yZ2JUb0hleChyLCBnLCBiKSB7XG4gICAgICAgIHJldHVybiAoKDEgPDwgMjQpICsgKHIgPDwgMTYpICsgKGcgPDwgOCkgKyBiKS50b1N0cmluZygxNikuc2xpY2UoMSk7XG4gICAgfSxcbiAgICBfaGV4VG9SZ2IoaGV4KSB7XG4gICAgICAgIGhleCA9IGhleC5yZXBsYWNlKEhBU0gsIEVNUFRZX1NUUklORyk7XG4gICAgICAgIHZhciBiaWdpbnQgPSBwYXJzZUludChoZXgsIDE2KTtcbiAgICAgICAgcmV0dXJuIHtcbiAgICAgICAgICAgIHI6IChiaWdpbnQgPj4gMTYpICYgMjU1LFxuICAgICAgICAgICAgZzogKGJpZ2ludCA+PiA4KSAmIDI1NSxcbiAgICAgICAgICAgIGI6IGJpZ2ludCAmIDI1NSxcbiAgICAgICAgfTtcbiAgICB9LFxuICAgIGdldFJhbmRvbUNvbG9yKCkge1xuICAgICAgICB2YXIgcmFuZENvbG9yID0gKChNYXRoLnJhbmRvbSgpICogMHhmZmZmZmYpIDw8IDApLnRvU3RyaW5nKDE2KTtcbiAgICAgICAgd2hpbGUgKHJhbmRDb2xvci5sZW5ndGggPCA2KSB7XG4gICAgICAgICAgICByYW5kQ29sb3IgPSBaRVJPICsgcmFuZENvbG9yO1xuICAgICAgICB9XG4gICAgICAgIHJldHVybiBIQVNIICsgcmFuZENvbG9yO1xuICAgIH0sXG4gICAgZ2V0UkdCKGNvbG9yKSB7XG4gICAgICAgIHZhciByZ2I7XG4gICAgICAgIGlmIChjb2xvciBpbiBDT0xPUlMpIHtcbiAgICAgICAgICAgIHJnYiA9IENPTE9SU1tjb2xvcl07XG4gICAgICAgICAgICByZXR1cm4ge1xuICAgICAgICAgICAgICAgIHI6IHJnYlswXSxcbiAgICAgICAgICAgICAgICBnOiByZ2JbMV0sXG4gICAgICAgICAgICAgICAgYjogcmdiWzJdLFxuICAgICAgICAgICAgfTtcbiAgICAgICAgfVxuICAgICAgICBlbHNlIGlmIChjb2xvclswXSA9PT0gSEFTSCkge1xuICAgICAgICAgICAgcmV0dXJuIHRoaXMuX2hleFRvUmdiKGNvbG9yLnN1YnN0cmluZygxKSk7XG4gICAgICAgIH1cbiAgICAgICAgZWxzZSBpZiAoY29sb3Iuc3Vic3RyKDAsIDQpID09PSBSR0JfUEFSRU4pIHtcbiAgICAgICAgICAgIHJnYiA9IFJHQl9SRUdFWC5leGVjKGNvbG9yLnJlcGxhY2UoLyAvZywgJycpKTtcbiAgICAgICAgICAgIHJldHVybiB7XG4gICAgICAgICAgICAgICAgcjogcGFyc2VJbnQocmdiWzFdLCAxMCksXG4gICAgICAgICAgICAgICAgZzogcGFyc2VJbnQocmdiWzJdLCAxMCksXG4gICAgICAgICAgICAgICAgYjogcGFyc2VJbnQocmdiWzNdLCAxMCksXG4gICAgICAgICAgICB9O1xuICAgICAgICB9XG4gICAgICAgIGVsc2Uge1xuICAgICAgICAgICAgcmV0dXJuIHtcbiAgICAgICAgICAgICAgICByOiAwLFxuICAgICAgICAgICAgICAgIGc6IDAsXG4gICAgICAgICAgICAgICAgYjogMCxcbiAgICAgICAgICAgIH07XG4gICAgICAgIH1cbiAgICB9LFxuICAgIGNvbG9yVG9SR0JBKHN0cikge1xuICAgICAgICBzdHIgPSBzdHIgfHwgJ2JsYWNrJztcbiAgICAgICAgcmV0dXJuIChVdGlsLl9uYW1lZENvbG9yVG9SQkEoc3RyKSB8fFxuICAgICAgICAgICAgVXRpbC5faGV4M0NvbG9yVG9SR0JBKHN0cikgfHxcbiAgICAgICAgICAgIFV0aWwuX2hleDRDb2xvclRvUkdCQShzdHIpIHx8XG4gICAgICAgICAgICBVdGlsLl9oZXg2Q29sb3JUb1JHQkEoc3RyKSB8fFxuICAgICAgICAgICAgVXRpbC5faGV4OENvbG9yVG9SR0JBKHN0cikgfHxcbiAgICAgICAgICAgIFV0aWwuX3JnYkNvbG9yVG9SR0JBKHN0cikgfHxcbiAgICAgICAgICAgIFV0aWwuX3JnYmFDb2xvclRvUkdCQShzdHIpIHx8XG4gICAgICAgICAgICBVdGlsLl9oc2xDb2xvclRvUkdCQShzdHIpKTtcbiAgICB9LFxuICAgIF9uYW1lZENvbG9yVG9SQkEoc3RyKSB7XG4gICAgICAgIHZhciBjID0gQ09MT1JTW3N0ci50b0xvd2VyQ2FzZSgpXTtcbiAgICAgICAgaWYgKCFjKSB7XG4gICAgICAgICAgICByZXR1cm4gbnVsbDtcbiAgICAgICAgfVxuICAgICAgICByZXR1cm4ge1xuICAgICAgICAgICAgcjogY1swXSxcbiAgICAgICAgICAgIGc6IGNbMV0sXG4gICAgICAgICAgICBiOiBjWzJdLFxuICAgICAgICAgICAgYTogMSxcbiAgICAgICAgfTtcbiAgICB9LFxuICAgIF9yZ2JDb2xvclRvUkdCQShzdHIpIHtcbiAgICAgICAgaWYgKHN0ci5pbmRleE9mKCdyZ2IoJykgPT09IDApIHtcbiAgICAgICAgICAgIHN0ciA9IHN0ci5tYXRjaCgvcmdiXFwoKFteKV0rKVxcKS8pWzFdO1xuICAgICAgICAgICAgdmFyIHBhcnRzID0gc3RyLnNwbGl0KC8gKiwgKi8pLm1hcChOdW1iZXIpO1xuICAgICAgICAgICAgcmV0dXJuIHtcbiAgICAgICAgICAgICAgICByOiBwYXJ0c1swXSxcbiAgICAgICAgICAgICAgICBnOiBwYXJ0c1sxXSxcbiAgICAgICAgICAgICAgICBiOiBwYXJ0c1syXSxcbiAgICAgICAgICAgICAgICBhOiAxLFxuICAgICAgICAgICAgfTtcbiAgICAgICAgfVxuICAgIH0sXG4gICAgX3JnYmFDb2xvclRvUkdCQShzdHIpIHtcbiAgICAgICAgaWYgKHN0ci5pbmRleE9mKCdyZ2JhKCcpID09PSAwKSB7XG4gICAgICAgICAgICBzdHIgPSBzdHIubWF0Y2goL3JnYmFcXCgoW14pXSspXFwpLylbMV07XG4gICAgICAgICAgICB2YXIgcGFydHMgPSBzdHIuc3BsaXQoLyAqLCAqLykubWFwKChuLCBpbmRleCkgPT4ge1xuICAgICAgICAgICAgICAgIGlmIChuLnNsaWNlKC0xKSA9PT0gJyUnKSB7XG4gICAgICAgICAgICAgICAgICAgIHJldHVybiBpbmRleCA9PT0gMyA/IHBhcnNlSW50KG4pIC8gMTAwIDogKHBhcnNlSW50KG4pIC8gMTAwKSAqIDI1NTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgcmV0dXJuIE51bWJlcihuKTtcbiAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgcmV0dXJuIHtcbiAgICAgICAgICAgICAgICByOiBwYXJ0c1swXSxcbiAgICAgICAgICAgICAgICBnOiBwYXJ0c1sxXSxcbiAgICAgICAgICAgICAgICBiOiBwYXJ0c1syXSxcbiAgICAgICAgICAgICAgICBhOiBwYXJ0c1szXSxcbiAgICAgICAgICAgIH07XG4gICAgICAgIH1cbiAgICB9LFxuICAgIF9oZXg4Q29sb3JUb1JHQkEoc3RyKSB7XG4gICAgICAgIGlmIChzdHJbMF0gPT09ICcjJyAmJiBzdHIubGVuZ3RoID09PSA5KSB7XG4gICAgICAgICAgICByZXR1cm4ge1xuICAgICAgICAgICAgICAgIHI6IHBhcnNlSW50KHN0ci5zbGljZSgxLCAzKSwgMTYpLFxuICAgICAgICAgICAgICAgIGc6IHBhcnNlSW50KHN0ci5zbGljZSgzLCA1KSwgMTYpLFxuICAgICAgICAgICAgICAgIGI6IHBhcnNlSW50KHN0ci5zbGljZSg1LCA3KSwgMTYpLFxuICAgICAgICAgICAgICAgIGE6IHBhcnNlSW50KHN0ci5zbGljZSg3LCA5KSwgMTYpIC8gMHhmZixcbiAgICAgICAgICAgIH07XG4gICAgICAgIH1cbiAgICB9LFxuICAgIF9oZXg2Q29sb3JUb1JHQkEoc3RyKSB7XG4gICAgICAgIGlmIChzdHJbMF0gPT09ICcjJyAmJiBzdHIubGVuZ3RoID09PSA3KSB7XG4gICAgICAgICAgICByZXR1cm4ge1xuICAgICAgICAgICAgICAgIHI6IHBhcnNlSW50KHN0ci5zbGljZSgxLCAzKSwgMTYpLFxuICAgICAgICAgICAgICAgIGc6IHBhcnNlSW50KHN0ci5zbGljZSgzLCA1KSwgMTYpLFxuICAgICAgICAgICAgICAgIGI6IHBhcnNlSW50KHN0ci5zbGljZSg1LCA3KSwgMTYpLFxuICAgICAgICAgICAgICAgIGE6IDEsXG4gICAgICAgICAgICB9O1xuICAgICAgICB9XG4gICAgfSxcbiAgICBfaGV4NENvbG9yVG9SR0JBKHN0cikge1xuICAgICAgICBpZiAoc3RyWzBdID09PSAnIycgJiYgc3RyLmxlbmd0aCA9PT0gNSkge1xuICAgICAgICAgICAgcmV0dXJuIHtcbiAgICAgICAgICAgICAgICByOiBwYXJzZUludChzdHJbMV0gKyBzdHJbMV0sIDE2KSxcbiAgICAgICAgICAgICAgICBnOiBwYXJzZUludChzdHJbMl0gKyBzdHJbMl0sIDE2KSxcbiAgICAgICAgICAgICAgICBiOiBwYXJzZUludChzdHJbM10gKyBzdHJbM10sIDE2KSxcbiAgICAgICAgICAgICAgICBhOiBwYXJzZUludChzdHJbNF0gKyBzdHJbNF0sIDE2KSAvIDB4ZmYsXG4gICAgICAgICAgICB9O1xuICAgICAgICB9XG4gICAgfSxcbiAgICBfaGV4M0NvbG9yVG9SR0JBKHN0cikge1xuICAgICAgICBpZiAoc3RyWzBdID09PSAnIycgJiYgc3RyLmxlbmd0aCA9PT0gNCkge1xuICAgICAgICAgICAgcmV0dXJuIHtcbiAgICAgICAgICAgICAgICByOiBwYXJzZUludChzdHJbMV0gKyBzdHJbMV0sIDE2KSxcbiAgICAgICAgICAgICAgICBnOiBwYXJzZUludChzdHJbMl0gKyBzdHJbMl0sIDE2KSxcbiAgICAgICAgICAgICAgICBiOiBwYXJzZUludChzdHJbM10gKyBzdHJbM10sIDE2KSxcbiAgICAgICAgICAgICAgICBhOiAxLFxuICAgICAgICAgICAgfTtcbiAgICAgICAgfVxuICAgIH0sXG4gICAgX2hzbENvbG9yVG9SR0JBKHN0cikge1xuICAgICAgICBpZiAoL2hzbFxcKChcXGQrKSxcXHMqKFtcXGQuXSspJSxcXHMqKFtcXGQuXSspJVxcKS9nLnRlc3Qoc3RyKSkge1xuICAgICAgICAgICAgY29uc3QgW18sIC4uLmhzbF0gPSAvaHNsXFwoKFxcZCspLFxccyooW1xcZC5dKyklLFxccyooW1xcZC5dKyklXFwpL2cuZXhlYyhzdHIpO1xuICAgICAgICAgICAgY29uc3QgaCA9IE51bWJlcihoc2xbMF0pIC8gMzYwO1xuICAgICAgICAgICAgY29uc3QgcyA9IE51bWJlcihoc2xbMV0pIC8gMTAwO1xuICAgICAgICAgICAgY29uc3QgbCA9IE51bWJlcihoc2xbMl0pIC8gMTAwO1xuICAgICAgICAgICAgbGV0IHQyO1xuICAgICAgICAgICAgbGV0IHQzO1xuICAgICAgICAgICAgbGV0IHZhbDtcbiAgICAgICAgICAgIGlmIChzID09PSAwKSB7XG4gICAgICAgICAgICAgICAgdmFsID0gbCAqIDI1NTtcbiAgICAgICAgICAgICAgICByZXR1cm4ge1xuICAgICAgICAgICAgICAgICAgICByOiBNYXRoLnJvdW5kKHZhbCksXG4gICAgICAgICAgICAgICAgICAgIGc6IE1hdGgucm91bmQodmFsKSxcbiAgICAgICAgICAgICAgICAgICAgYjogTWF0aC5yb3VuZCh2YWwpLFxuICAgICAgICAgICAgICAgICAgICBhOiAxLFxuICAgICAgICAgICAgICAgIH07XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBpZiAobCA8IDAuNSkge1xuICAgICAgICAgICAgICAgIHQyID0gbCAqICgxICsgcyk7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBlbHNlIHtcbiAgICAgICAgICAgICAgICB0MiA9IGwgKyBzIC0gbCAqIHM7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBjb25zdCB0MSA9IDIgKiBsIC0gdDI7XG4gICAgICAgICAgICBjb25zdCByZ2IgPSBbMCwgMCwgMF07XG4gICAgICAgICAgICBmb3IgKGxldCBpID0gMDsgaSA8IDM7IGkrKykge1xuICAgICAgICAgICAgICAgIHQzID0gaCArICgxIC8gMykgKiAtKGkgLSAxKTtcbiAgICAgICAgICAgICAgICBpZiAodDMgPCAwKSB7XG4gICAgICAgICAgICAgICAgICAgIHQzKys7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIGlmICh0MyA+IDEpIHtcbiAgICAgICAgICAgICAgICAgICAgdDMtLTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgaWYgKDYgKiB0MyA8IDEpIHtcbiAgICAgICAgICAgICAgICAgICAgdmFsID0gdDEgKyAodDIgLSB0MSkgKiA2ICogdDM7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIGVsc2UgaWYgKDIgKiB0MyA8IDEpIHtcbiAgICAgICAgICAgICAgICAgICAgdmFsID0gdDI7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIGVsc2UgaWYgKDMgKiB0MyA8IDIpIHtcbiAgICAgICAgICAgICAgICAgICAgdmFsID0gdDEgKyAodDIgLSB0MSkgKiAoMiAvIDMgLSB0MykgKiA2O1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICBlbHNlIHtcbiAgICAgICAgICAgICAgICAgICAgdmFsID0gdDE7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIHJnYltpXSA9IHZhbCAqIDI1NTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIHJldHVybiB7XG4gICAgICAgICAgICAgICAgcjogTWF0aC5yb3VuZChyZ2JbMF0pLFxuICAgICAgICAgICAgICAgIGc6IE1hdGgucm91bmQocmdiWzFdKSxcbiAgICAgICAgICAgICAgICBiOiBNYXRoLnJvdW5kKHJnYlsyXSksXG4gICAgICAgICAgICAgICAgYTogMSxcbiAgICAgICAgICAgIH07XG4gICAgICAgIH1cbiAgICB9LFxuICAgIGhhdmVJbnRlcnNlY3Rpb24ocjEsIHIyKSB7XG4gICAgICAgIHJldHVybiAhKHIyLnggPiByMS54ICsgcjEud2lkdGggfHxcbiAgICAgICAgICAgIHIyLnggKyByMi53aWR0aCA8IHIxLnggfHxcbiAgICAgICAgICAgIHIyLnkgPiByMS55ICsgcjEuaGVpZ2h0IHx8XG4gICAgICAgICAgICByMi55ICsgcjIuaGVpZ2h0IDwgcjEueSk7XG4gICAgfSxcbiAgICBjbG9uZU9iamVjdChvYmopIHtcbiAgICAgICAgdmFyIHJldE9iaiA9IHt9O1xuICAgICAgICBmb3IgKHZhciBrZXkgaW4gb2JqKSB7XG4gICAgICAgICAgICBpZiAodGhpcy5faXNQbGFpbk9iamVjdChvYmpba2V5XSkpIHtcbiAgICAgICAgICAgICAgICByZXRPYmpba2V5XSA9IHRoaXMuY2xvbmVPYmplY3Qob2JqW2tleV0pO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgZWxzZSBpZiAodGhpcy5faXNBcnJheShvYmpba2V5XSkpIHtcbiAgICAgICAgICAgICAgICByZXRPYmpba2V5XSA9IHRoaXMuY2xvbmVBcnJheShvYmpba2V5XSk7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBlbHNlIHtcbiAgICAgICAgICAgICAgICByZXRPYmpba2V5XSA9IG9ialtrZXldO1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICAgIHJldHVybiByZXRPYmo7XG4gICAgfSxcbiAgICBjbG9uZUFycmF5KGFycikge1xuICAgICAgICByZXR1cm4gYXJyLnNsaWNlKDApO1xuICAgIH0sXG4gICAgZGVnVG9SYWQoZGVnKSB7XG4gICAgICAgIHJldHVybiBkZWcgKiBQSV9PVkVSX0RFRzE4MDtcbiAgICB9LFxuICAgIHJhZFRvRGVnKHJhZCkge1xuICAgICAgICByZXR1cm4gcmFkICogREVHMTgwX09WRVJfUEk7XG4gICAgfSxcbiAgICBfZGVnVG9SYWQoZGVnKSB7XG4gICAgICAgIFV0aWwud2FybignVXRpbC5fZGVnVG9SYWQgaXMgcmVtb3ZlZC4gUGxlYXNlIHVzZSBwdWJsaWMgVXRpbC5kZWdUb1JhZCBpbnN0ZWFkLicpO1xuICAgICAgICByZXR1cm4gVXRpbC5kZWdUb1JhZChkZWcpO1xuICAgIH0sXG4gICAgX3JhZFRvRGVnKHJhZCkge1xuICAgICAgICBVdGlsLndhcm4oJ1V0aWwuX3JhZFRvRGVnIGlzIHJlbW92ZWQuIFBsZWFzZSB1c2UgcHVibGljIFV0aWwucmFkVG9EZWcgaW5zdGVhZC4nKTtcbiAgICAgICAgcmV0dXJuIFV0aWwucmFkVG9EZWcocmFkKTtcbiAgICB9LFxuICAgIF9nZXRSb3RhdGlvbihyYWRpYW5zKSB7XG4gICAgICAgIHJldHVybiBLb252YS5hbmdsZURlZyA/IFV0aWwucmFkVG9EZWcocmFkaWFucykgOiByYWRpYW5zO1xuICAgIH0sXG4gICAgX2NhcGl0YWxpemUoc3RyKSB7XG4gICAgICAgIHJldHVybiBzdHIuY2hhckF0KDApLnRvVXBwZXJDYXNlKCkgKyBzdHIuc2xpY2UoMSk7XG4gICAgfSxcbiAgICB0aHJvdyhzdHIpIHtcbiAgICAgICAgdGhyb3cgbmV3IEVycm9yKEtPTlZBX0VSUk9SICsgc3RyKTtcbiAgICB9LFxuICAgIGVycm9yKHN0cikge1xuICAgICAgICBjb25zb2xlLmVycm9yKEtPTlZBX0VSUk9SICsgc3RyKTtcbiAgICB9LFxuICAgIHdhcm4oc3RyKSB7XG4gICAgICAgIGlmICghS29udmEuc2hvd1dhcm5pbmdzKSB7XG4gICAgICAgICAgICByZXR1cm47XG4gICAgICAgIH1cbiAgICAgICAgY29uc29sZS53YXJuKEtPTlZBX1dBUk5JTkcgKyBzdHIpO1xuICAgIH0sXG4gICAgZWFjaChvYmosIGZ1bmMpIHtcbiAgICAgICAgZm9yICh2YXIga2V5IGluIG9iaikge1xuICAgICAgICAgICAgZnVuYyhrZXksIG9ialtrZXldKTtcbiAgICAgICAgfVxuICAgIH0sXG4gICAgX2luUmFuZ2UodmFsLCBsZWZ0LCByaWdodCkge1xuICAgICAgICByZXR1cm4gbGVmdCA8PSB2YWwgJiYgdmFsIDwgcmlnaHQ7XG4gICAgfSxcbiAgICBfZ2V0UHJvamVjdGlvblRvU2VnbWVudCh4MSwgeTEsIHgyLCB5MiwgeDMsIHkzKSB7XG4gICAgICAgIHZhciB4LCB5LCBkaXN0O1xuICAgICAgICB2YXIgcGQyID0gKHgxIC0geDIpICogKHgxIC0geDIpICsgKHkxIC0geTIpICogKHkxIC0geTIpO1xuICAgICAgICBpZiAocGQyID09IDApIHtcbiAgICAgICAgICAgIHggPSB4MTtcbiAgICAgICAgICAgIHkgPSB5MTtcbiAgICAgICAgICAgIGRpc3QgPSAoeDMgLSB4MikgKiAoeDMgLSB4MikgKyAoeTMgLSB5MikgKiAoeTMgLSB5Mik7XG4gICAgICAgIH1cbiAgICAgICAgZWxzZSB7XG4gICAgICAgICAgICB2YXIgdSA9ICgoeDMgLSB4MSkgKiAoeDIgLSB4MSkgKyAoeTMgLSB5MSkgKiAoeTIgLSB5MSkpIC8gcGQyO1xuICAgICAgICAgICAgaWYgKHUgPCAwKSB7XG4gICAgICAgICAgICAgICAgeCA9IHgxO1xuICAgICAgICAgICAgICAgIHkgPSB5MTtcbiAgICAgICAgICAgICAgICBkaXN0ID0gKHgxIC0geDMpICogKHgxIC0geDMpICsgKHkxIC0geTMpICogKHkxIC0geTMpO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgZWxzZSBpZiAodSA+IDEuMCkge1xuICAgICAgICAgICAgICAgIHggPSB4MjtcbiAgICAgICAgICAgICAgICB5ID0geTI7XG4gICAgICAgICAgICAgICAgZGlzdCA9ICh4MiAtIHgzKSAqICh4MiAtIHgzKSArICh5MiAtIHkzKSAqICh5MiAtIHkzKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGVsc2Uge1xuICAgICAgICAgICAgICAgIHggPSB4MSArIHUgKiAoeDIgLSB4MSk7XG4gICAgICAgICAgICAgICAgeSA9IHkxICsgdSAqICh5MiAtIHkxKTtcbiAgICAgICAgICAgICAgICBkaXN0ID0gKHggLSB4MykgKiAoeCAtIHgzKSArICh5IC0geTMpICogKHkgLSB5Myk7XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuIFt4LCB5LCBkaXN0XTtcbiAgICB9LFxuICAgIF9nZXRQcm9qZWN0aW9uVG9MaW5lKHB0LCBsaW5lLCBpc0Nsb3NlZCkge1xuICAgICAgICB2YXIgcGMgPSBVdGlsLmNsb25lT2JqZWN0KHB0KTtcbiAgICAgICAgdmFyIGRpc3QgPSBOdW1iZXIuTUFYX1ZBTFVFO1xuICAgICAgICBsaW5lLmZvckVhY2goZnVuY3Rpb24gKHAxLCBpKSB7XG4gICAgICAgICAgICBpZiAoIWlzQ2xvc2VkICYmIGkgPT09IGxpbmUubGVuZ3RoIC0gMSkge1xuICAgICAgICAgICAgICAgIHJldHVybjtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIHZhciBwMiA9IGxpbmVbKGkgKyAxKSAlIGxpbmUubGVuZ3RoXTtcbiAgICAgICAgICAgIHZhciBwcm9qID0gVXRpbC5fZ2V0UHJvamVjdGlvblRvU2VnbWVudChwMS54LCBwMS55LCBwMi54LCBwMi55LCBwdC54LCBwdC55KTtcbiAgICAgICAgICAgIHZhciBweCA9IHByb2pbMF0sIHB5ID0gcHJvalsxXSwgcGRpc3QgPSBwcm9qWzJdO1xuICAgICAgICAgICAgaWYgKHBkaXN0IDwgZGlzdCkge1xuICAgICAgICAgICAgICAgIHBjLnggPSBweDtcbiAgICAgICAgICAgICAgICBwYy55ID0gcHk7XG4gICAgICAgICAgICAgICAgZGlzdCA9IHBkaXN0O1xuICAgICAgICAgICAgfVxuICAgICAgICB9KTtcbiAgICAgICAgcmV0dXJuIHBjO1xuICAgIH0sXG4gICAgX3ByZXBhcmVBcnJheUZvclR3ZWVuKHN0YXJ0QXJyYXksIGVuZEFycmF5LCBpc0Nsb3NlZCkge1xuICAgICAgICB2YXIgbiwgc3RhcnQgPSBbXSwgZW5kID0gW107XG4gICAgICAgIGlmIChzdGFydEFycmF5Lmxlbmd0aCA+IGVuZEFycmF5Lmxlbmd0aCkge1xuICAgICAgICAgICAgdmFyIHRlbXAgPSBlbmRBcnJheTtcbiAgICAgICAgICAgIGVuZEFycmF5ID0gc3RhcnRBcnJheTtcbiAgICAgICAgICAgIHN0YXJ0QXJyYXkgPSB0ZW1wO1xuICAgICAgICB9XG4gICAgICAgIGZvciAobiA9IDA7IG4gPCBzdGFydEFycmF5Lmxlbmd0aDsgbiArPSAyKSB7XG4gICAgICAgICAgICBzdGFydC5wdXNoKHtcbiAgICAgICAgICAgICAgICB4OiBzdGFydEFycmF5W25dLFxuICAgICAgICAgICAgICAgIHk6IHN0YXJ0QXJyYXlbbiArIDFdLFxuICAgICAgICAgICAgfSk7XG4gICAgICAgIH1cbiAgICAgICAgZm9yIChuID0gMDsgbiA8IGVuZEFycmF5Lmxlbmd0aDsgbiArPSAyKSB7XG4gICAgICAgICAgICBlbmQucHVzaCh7XG4gICAgICAgICAgICAgICAgeDogZW5kQXJyYXlbbl0sXG4gICAgICAgICAgICAgICAgeTogZW5kQXJyYXlbbiArIDFdLFxuICAgICAgICAgICAgfSk7XG4gICAgICAgIH1cbiAgICAgICAgdmFyIG5ld1N0YXJ0ID0gW107XG4gICAgICAgIGVuZC5mb3JFYWNoKGZ1bmN0aW9uIChwb2ludCkge1xuICAgICAgICAgICAgdmFyIHByID0gVXRpbC5fZ2V0UHJvamVjdGlvblRvTGluZShwb2ludCwgc3RhcnQsIGlzQ2xvc2VkKTtcbiAgICAgICAgICAgIG5ld1N0YXJ0LnB1c2gocHIueCk7XG4gICAgICAgICAgICBuZXdTdGFydC5wdXNoKHByLnkpO1xuICAgICAgICB9KTtcbiAgICAgICAgcmV0dXJuIG5ld1N0YXJ0O1xuICAgIH0sXG4gICAgX3ByZXBhcmVUb1N0cmluZ2lmeShvYmopIHtcbiAgICAgICAgdmFyIGRlc2M7XG4gICAgICAgIG9iai52aXNpdGVkQnlDaXJjdWxhclJlZmVyZW5jZVJlbW92YWwgPSB0cnVlO1xuICAgICAgICBmb3IgKHZhciBrZXkgaW4gb2JqKSB7XG4gICAgICAgICAgICBpZiAoIShvYmouaGFzT3duUHJvcGVydHkoa2V5KSAmJiBvYmpba2V5XSAmJiB0eXBlb2Ygb2JqW2tleV0gPT0gJ29iamVjdCcpKSB7XG4gICAgICAgICAgICAgICAgY29udGludWU7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBkZXNjID0gT2JqZWN0LmdldE93blByb3BlcnR5RGVzY3JpcHRvcihvYmosIGtleSk7XG4gICAgICAgICAgICBpZiAob2JqW2tleV0udmlzaXRlZEJ5Q2lyY3VsYXJSZWZlcmVuY2VSZW1vdmFsIHx8XG4gICAgICAgICAgICAgICAgVXRpbC5faXNFbGVtZW50KG9ialtrZXldKSkge1xuICAgICAgICAgICAgICAgIGlmIChkZXNjLmNvbmZpZ3VyYWJsZSkge1xuICAgICAgICAgICAgICAgICAgICBkZWxldGUgb2JqW2tleV07XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIGVsc2Uge1xuICAgICAgICAgICAgICAgICAgICByZXR1cm4gbnVsbDtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBlbHNlIGlmIChVdGlsLl9wcmVwYXJlVG9TdHJpbmdpZnkob2JqW2tleV0pID09PSBudWxsKSB7XG4gICAgICAgICAgICAgICAgaWYgKGRlc2MuY29uZmlndXJhYmxlKSB7XG4gICAgICAgICAgICAgICAgICAgIGRlbGV0ZSBvYmpba2V5XTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgZWxzZSB7XG4gICAgICAgICAgICAgICAgICAgIHJldHVybiBudWxsO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgICBkZWxldGUgb2JqLnZpc2l0ZWRCeUNpcmN1bGFyUmVmZXJlbmNlUmVtb3ZhbDtcbiAgICAgICAgcmV0dXJuIG9iajtcbiAgICB9LFxuICAgIF9hc3NpZ24odGFyZ2V0LCBzb3VyY2UpIHtcbiAgICAgICAgZm9yICh2YXIga2V5IGluIHNvdXJjZSkge1xuICAgICAgICAgICAgdGFyZ2V0W2tleV0gPSBzb3VyY2Vba2V5XTtcbiAgICAgICAgfVxuICAgICAgICByZXR1cm4gdGFyZ2V0O1xuICAgIH0sXG4gICAgX2dldEZpcnN0UG9pbnRlcklkKGV2dCkge1xuICAgICAgICBpZiAoIWV2dC50b3VjaGVzKSB7XG4gICAgICAgICAgICByZXR1cm4gZXZ0LnBvaW50ZXJJZCB8fCA5OTk7XG4gICAgICAgIH1cbiAgICAgICAgZWxzZSB7XG4gICAgICAgICAgICByZXR1cm4gZXZ0LmNoYW5nZWRUb3VjaGVzWzBdLmlkZW50aWZpZXI7XG4gICAgICAgIH1cbiAgICB9LFxuICAgIHJlbGVhc2VDYW52YXMoLi4uY2FudmFzZXMpIHtcbiAgICAgICAgaWYgKCFLb252YS5yZWxlYXNlQ2FudmFzT25EZXN0cm95KVxuICAgICAgICAgICAgcmV0dXJuO1xuICAgICAgICBjYW52YXNlcy5mb3JFYWNoKGMgPT4ge1xuICAgICAgICAgICAgYy53aWR0aCA9IDA7XG4gICAgICAgICAgICBjLmhlaWdodCA9IDA7XG4gICAgICAgIH0pO1xuICAgIH0sXG4gICAgZHJhd1JvdW5kZWRSZWN0UGF0aChjb250ZXh0LCB3aWR0aCwgaGVpZ2h0LCBjb3JuZXJSYWRpdXMpIHtcbiAgICAgICAgbGV0IHRvcExlZnQgPSAwO1xuICAgICAgICBsZXQgdG9wUmlnaHQgPSAwO1xuICAgICAgICBsZXQgYm90dG9tTGVmdCA9IDA7XG4gICAgICAgIGxldCBib3R0b21SaWdodCA9IDA7XG4gICAgICAgIGlmICh0eXBlb2YgY29ybmVyUmFkaXVzID09PSAnbnVtYmVyJykge1xuICAgICAgICAgICAgdG9wTGVmdCA9IHRvcFJpZ2h0ID0gYm90dG9tTGVmdCA9IGJvdHRvbVJpZ2h0ID0gTWF0aC5taW4oY29ybmVyUmFkaXVzLCB3aWR0aCAvIDIsIGhlaWdodCAvIDIpO1xuICAgICAgICB9XG4gICAgICAgIGVsc2Uge1xuICAgICAgICAgICAgdG9wTGVmdCA9IE1hdGgubWluKGNvcm5lclJhZGl1c1swXSB8fCAwLCB3aWR0aCAvIDIsIGhlaWdodCAvIDIpO1xuICAgICAgICAgICAgdG9wUmlnaHQgPSBNYXRoLm1pbihjb3JuZXJSYWRpdXNbMV0gfHwgMCwgd2lkdGggLyAyLCBoZWlnaHQgLyAyKTtcbiAgICAgICAgICAgIGJvdHRvbVJpZ2h0ID0gTWF0aC5taW4oY29ybmVyUmFkaXVzWzJdIHx8IDAsIHdpZHRoIC8gMiwgaGVpZ2h0IC8gMik7XG4gICAgICAgICAgICBib3R0b21MZWZ0ID0gTWF0aC5taW4oY29ybmVyUmFkaXVzWzNdIHx8IDAsIHdpZHRoIC8gMiwgaGVpZ2h0IC8gMik7XG4gICAgICAgIH1cbiAgICAgICAgY29udGV4dC5tb3ZlVG8odG9wTGVmdCwgMCk7XG4gICAgICAgIGNvbnRleHQubGluZVRvKHdpZHRoIC0gdG9wUmlnaHQsIDApO1xuICAgICAgICBjb250ZXh0LmFyYyh3aWR0aCAtIHRvcFJpZ2h0LCB0b3BSaWdodCwgdG9wUmlnaHQsIChNYXRoLlBJICogMykgLyAyLCAwLCBmYWxzZSk7XG4gICAgICAgIGNvbnRleHQubGluZVRvKHdpZHRoLCBoZWlnaHQgLSBib3R0b21SaWdodCk7XG4gICAgICAgIGNvbnRleHQuYXJjKHdpZHRoIC0gYm90dG9tUmlnaHQsIGhlaWdodCAtIGJvdHRvbVJpZ2h0LCBib3R0b21SaWdodCwgMCwgTWF0aC5QSSAvIDIsIGZhbHNlKTtcbiAgICAgICAgY29udGV4dC5saW5lVG8oYm90dG9tTGVmdCwgaGVpZ2h0KTtcbiAgICAgICAgY29udGV4dC5hcmMoYm90dG9tTGVmdCwgaGVpZ2h0IC0gYm90dG9tTGVmdCwgYm90dG9tTGVmdCwgTWF0aC5QSSAvIDIsIE1hdGguUEksIGZhbHNlKTtcbiAgICAgICAgY29udGV4dC5saW5lVG8oMCwgdG9wTGVmdCk7XG4gICAgICAgIGNvbnRleHQuYXJjKHRvcExlZnQsIHRvcExlZnQsIHRvcExlZnQsIE1hdGguUEksIChNYXRoLlBJICogMykgLyAyLCBmYWxzZSk7XG4gICAgfVxufTtcbiIsImltcG9ydCB7IEtvbnZhIH0gZnJvbSAnLi9HbG9iYWwuanMnO1xuaW1wb3J0IHsgVXRpbCB9IGZyb20gJy4vVXRpbC5qcyc7XG5mdW5jdGlvbiBfZm9ybWF0VmFsdWUodmFsKSB7XG4gICAgaWYgKFV0aWwuX2lzU3RyaW5nKHZhbCkpIHtcbiAgICAgICAgcmV0dXJuICdcIicgKyB2YWwgKyAnXCInO1xuICAgIH1cbiAgICBpZiAoT2JqZWN0LnByb3RvdHlwZS50b1N0cmluZy5jYWxsKHZhbCkgPT09ICdbb2JqZWN0IE51bWJlcl0nKSB7XG4gICAgICAgIHJldHVybiB2YWw7XG4gICAgfVxuICAgIGlmIChVdGlsLl9pc0Jvb2xlYW4odmFsKSkge1xuICAgICAgICByZXR1cm4gdmFsO1xuICAgIH1cbiAgICByZXR1cm4gT2JqZWN0LnByb3RvdHlwZS50b1N0cmluZy5jYWxsKHZhbCk7XG59XG5leHBvcnQgZnVuY3Rpb24gUkdCQ29tcG9uZW50KHZhbCkge1xuICAgIGlmICh2YWwgPiAyNTUpIHtcbiAgICAgICAgcmV0dXJuIDI1NTtcbiAgICB9XG4gICAgZWxzZSBpZiAodmFsIDwgMCkge1xuICAgICAgICByZXR1cm4gMDtcbiAgICB9XG4gICAgcmV0dXJuIE1hdGgucm91bmQodmFsKTtcbn1cbmV4cG9ydCBmdW5jdGlvbiBhbHBoYUNvbXBvbmVudCh2YWwpIHtcbiAgICBpZiAodmFsID4gMSkge1xuICAgICAgICByZXR1cm4gMTtcbiAgICB9XG4gICAgZWxzZSBpZiAodmFsIDwgMC4wMDAxKSB7XG4gICAgICAgIHJldHVybiAwLjAwMDE7XG4gICAgfVxuICAgIHJldHVybiB2YWw7XG59XG5leHBvcnQgZnVuY3Rpb24gZ2V0TnVtYmVyVmFsaWRhdG9yKCkge1xuICAgIGlmIChLb252YS5pc1VubWluaWZpZWQpIHtcbiAgICAgICAgcmV0dXJuIGZ1bmN0aW9uICh2YWwsIGF0dHIpIHtcbiAgICAgICAgICAgIGlmICghVXRpbC5faXNOdW1iZXIodmFsKSkge1xuICAgICAgICAgICAgICAgIFV0aWwud2FybihfZm9ybWF0VmFsdWUodmFsKSArXG4gICAgICAgICAgICAgICAgICAgICcgaXMgYSBub3QgdmFsaWQgdmFsdWUgZm9yIFwiJyArXG4gICAgICAgICAgICAgICAgICAgIGF0dHIgK1xuICAgICAgICAgICAgICAgICAgICAnXCIgYXR0cmlidXRlLiBUaGUgdmFsdWUgc2hvdWxkIGJlIGEgbnVtYmVyLicpO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgcmV0dXJuIHZhbDtcbiAgICAgICAgfTtcbiAgICB9XG59XG5leHBvcnQgZnVuY3Rpb24gZ2V0TnVtYmVyT3JBcnJheU9mTnVtYmVyc1ZhbGlkYXRvcihub09mRWxlbWVudHMpIHtcbiAgICBpZiAoS29udmEuaXNVbm1pbmlmaWVkKSB7XG4gICAgICAgIHJldHVybiBmdW5jdGlvbiAodmFsLCBhdHRyKSB7XG4gICAgICAgICAgICBsZXQgaXNOdW1iZXIgPSBVdGlsLl9pc051bWJlcih2YWwpO1xuICAgICAgICAgICAgbGV0IGlzVmFsaWRBcnJheSA9IFV0aWwuX2lzQXJyYXkodmFsKSAmJiB2YWwubGVuZ3RoID09IG5vT2ZFbGVtZW50cztcbiAgICAgICAgICAgIGlmICghaXNOdW1iZXIgJiYgIWlzVmFsaWRBcnJheSkge1xuICAgICAgICAgICAgICAgIFV0aWwud2FybihfZm9ybWF0VmFsdWUodmFsKSArXG4gICAgICAgICAgICAgICAgICAgICcgaXMgYSBub3QgdmFsaWQgdmFsdWUgZm9yIFwiJyArXG4gICAgICAgICAgICAgICAgICAgIGF0dHIgK1xuICAgICAgICAgICAgICAgICAgICAnXCIgYXR0cmlidXRlLiBUaGUgdmFsdWUgc2hvdWxkIGJlIGEgbnVtYmVyIG9yIEFycmF5PG51bWJlcj4oJyArXG4gICAgICAgICAgICAgICAgICAgIG5vT2ZFbGVtZW50cyArXG4gICAgICAgICAgICAgICAgICAgICcpJyk7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICByZXR1cm4gdmFsO1xuICAgICAgICB9O1xuICAgIH1cbn1cbmV4cG9ydCBmdW5jdGlvbiBnZXROdW1iZXJPckF1dG9WYWxpZGF0b3IoKSB7XG4gICAgaWYgKEtvbnZhLmlzVW5taW5pZmllZCkge1xuICAgICAgICByZXR1cm4gZnVuY3Rpb24gKHZhbCwgYXR0cikge1xuICAgICAgICAgICAgdmFyIGlzTnVtYmVyID0gVXRpbC5faXNOdW1iZXIodmFsKTtcbiAgICAgICAgICAgIHZhciBpc0F1dG8gPSB2YWwgPT09ICdhdXRvJztcbiAgICAgICAgICAgIGlmICghKGlzTnVtYmVyIHx8IGlzQXV0bykpIHtcbiAgICAgICAgICAgICAgICBVdGlsLndhcm4oX2Zvcm1hdFZhbHVlKHZhbCkgK1xuICAgICAgICAgICAgICAgICAgICAnIGlzIGEgbm90IHZhbGlkIHZhbHVlIGZvciBcIicgK1xuICAgICAgICAgICAgICAgICAgICBhdHRyICtcbiAgICAgICAgICAgICAgICAgICAgJ1wiIGF0dHJpYnV0ZS4gVGhlIHZhbHVlIHNob3VsZCBiZSBhIG51bWJlciBvciBcImF1dG9cIi4nKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIHJldHVybiB2YWw7XG4gICAgICAgIH07XG4gICAgfVxufVxuZXhwb3J0IGZ1bmN0aW9uIGdldFN0cmluZ1ZhbGlkYXRvcigpIHtcbiAgICBpZiAoS29udmEuaXNVbm1pbmlmaWVkKSB7XG4gICAgICAgIHJldHVybiBmdW5jdGlvbiAodmFsLCBhdHRyKSB7XG4gICAgICAgICAgICBpZiAoIVV0aWwuX2lzU3RyaW5nKHZhbCkpIHtcbiAgICAgICAgICAgICAgICBVdGlsLndhcm4oX2Zvcm1hdFZhbHVlKHZhbCkgK1xuICAgICAgICAgICAgICAgICAgICAnIGlzIGEgbm90IHZhbGlkIHZhbHVlIGZvciBcIicgK1xuICAgICAgICAgICAgICAgICAgICBhdHRyICtcbiAgICAgICAgICAgICAgICAgICAgJ1wiIGF0dHJpYnV0ZS4gVGhlIHZhbHVlIHNob3VsZCBiZSBhIHN0cmluZy4nKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIHJldHVybiB2YWw7XG4gICAgICAgIH07XG4gICAgfVxufVxuZXhwb3J0IGZ1bmN0aW9uIGdldFN0cmluZ09yR3JhZGllbnRWYWxpZGF0b3IoKSB7XG4gICAgaWYgKEtvbnZhLmlzVW5taW5pZmllZCkge1xuICAgICAgICByZXR1cm4gZnVuY3Rpb24gKHZhbCwgYXR0cikge1xuICAgICAgICAgICAgY29uc3QgaXNTdHJpbmcgPSBVdGlsLl9pc1N0cmluZyh2YWwpO1xuICAgICAgICAgICAgY29uc3QgaXNHcmFkaWVudCA9IE9iamVjdC5wcm90b3R5cGUudG9TdHJpbmcuY2FsbCh2YWwpID09PSAnW29iamVjdCBDYW52YXNHcmFkaWVudF0nIHx8XG4gICAgICAgICAgICAgICAgKHZhbCAmJiB2YWwuYWRkQ29sb3JTdG9wKTtcbiAgICAgICAgICAgIGlmICghKGlzU3RyaW5nIHx8IGlzR3JhZGllbnQpKSB7XG4gICAgICAgICAgICAgICAgVXRpbC53YXJuKF9mb3JtYXRWYWx1ZSh2YWwpICtcbiAgICAgICAgICAgICAgICAgICAgJyBpcyBhIG5vdCB2YWxpZCB2YWx1ZSBmb3IgXCInICtcbiAgICAgICAgICAgICAgICAgICAgYXR0ciArXG4gICAgICAgICAgICAgICAgICAgICdcIiBhdHRyaWJ1dGUuIFRoZSB2YWx1ZSBzaG91bGQgYmUgYSBzdHJpbmcgb3IgYSBuYXRpdmUgZ3JhZGllbnQuJyk7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICByZXR1cm4gdmFsO1xuICAgICAgICB9O1xuICAgIH1cbn1cbmV4cG9ydCBmdW5jdGlvbiBnZXRGdW5jdGlvblZhbGlkYXRvcigpIHtcbiAgICBpZiAoS29udmEuaXNVbm1pbmlmaWVkKSB7XG4gICAgICAgIHJldHVybiBmdW5jdGlvbiAodmFsLCBhdHRyKSB7XG4gICAgICAgICAgICBpZiAoIVV0aWwuX2lzRnVuY3Rpb24odmFsKSkge1xuICAgICAgICAgICAgICAgIFV0aWwud2FybihfZm9ybWF0VmFsdWUodmFsKSArXG4gICAgICAgICAgICAgICAgICAgICcgaXMgYSBub3QgdmFsaWQgdmFsdWUgZm9yIFwiJyArXG4gICAgICAgICAgICAgICAgICAgIGF0dHIgK1xuICAgICAgICAgICAgICAgICAgICAnXCIgYXR0cmlidXRlLiBUaGUgdmFsdWUgc2hvdWxkIGJlIGEgZnVuY3Rpb24uJyk7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICByZXR1cm4gdmFsO1xuICAgICAgICB9O1xuICAgIH1cbn1cbmV4cG9ydCBmdW5jdGlvbiBnZXROdW1iZXJBcnJheVZhbGlkYXRvcigpIHtcbiAgICBpZiAoS29udmEuaXNVbm1pbmlmaWVkKSB7XG4gICAgICAgIHJldHVybiBmdW5jdGlvbiAodmFsLCBhdHRyKSB7XG4gICAgICAgICAgICBjb25zdCBUeXBlZEFycmF5ID0gSW50OEFycmF5ID8gT2JqZWN0LmdldFByb3RvdHlwZU9mKEludDhBcnJheSkgOiBudWxsO1xuICAgICAgICAgICAgaWYgKFR5cGVkQXJyYXkgJiYgdmFsIGluc3RhbmNlb2YgVHlwZWRBcnJheSkge1xuICAgICAgICAgICAgICAgIHJldHVybiB2YWw7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBpZiAoIVV0aWwuX2lzQXJyYXkodmFsKSkge1xuICAgICAgICAgICAgICAgIFV0aWwud2FybihfZm9ybWF0VmFsdWUodmFsKSArXG4gICAgICAgICAgICAgICAgICAgICcgaXMgYSBub3QgdmFsaWQgdmFsdWUgZm9yIFwiJyArXG4gICAgICAgICAgICAgICAgICAgIGF0dHIgK1xuICAgICAgICAgICAgICAgICAgICAnXCIgYXR0cmlidXRlLiBUaGUgdmFsdWUgc2hvdWxkIGJlIGEgYXJyYXkgb2YgbnVtYmVycy4nKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGVsc2Uge1xuICAgICAgICAgICAgICAgIHZhbC5mb3JFYWNoKGZ1bmN0aW9uIChpdGVtKSB7XG4gICAgICAgICAgICAgICAgICAgIGlmICghVXRpbC5faXNOdW1iZXIoaXRlbSkpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIFV0aWwud2FybignXCInICtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBhdHRyICtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAnXCIgYXR0cmlidXRlIGhhcyBub24gbnVtZXJpYyBlbGVtZW50ICcgK1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGl0ZW0gK1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICcuIE1ha2Ugc3VyZSB0aGF0IGFsbCBlbGVtZW50cyBhcmUgbnVtYmVycy4nKTtcbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgcmV0dXJuIHZhbDtcbiAgICAgICAgfTtcbiAgICB9XG59XG5leHBvcnQgZnVuY3Rpb24gZ2V0Qm9vbGVhblZhbGlkYXRvcigpIHtcbiAgICBpZiAoS29udmEuaXNVbm1pbmlmaWVkKSB7XG4gICAgICAgIHJldHVybiBmdW5jdGlvbiAodmFsLCBhdHRyKSB7XG4gICAgICAgICAgICB2YXIgaXNCb29sID0gdmFsID09PSB0cnVlIHx8IHZhbCA9PT0gZmFsc2U7XG4gICAgICAgICAgICBpZiAoIWlzQm9vbCkge1xuICAgICAgICAgICAgICAgIFV0aWwud2FybihfZm9ybWF0VmFsdWUodmFsKSArXG4gICAgICAgICAgICAgICAgICAgICcgaXMgYSBub3QgdmFsaWQgdmFsdWUgZm9yIFwiJyArXG4gICAgICAgICAgICAgICAgICAgIGF0dHIgK1xuICAgICAgICAgICAgICAgICAgICAnXCIgYXR0cmlidXRlLiBUaGUgdmFsdWUgc2hvdWxkIGJlIGEgYm9vbGVhbi4nKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIHJldHVybiB2YWw7XG4gICAgICAgIH07XG4gICAgfVxufVxuZXhwb3J0IGZ1bmN0aW9uIGdldENvbXBvbmVudFZhbGlkYXRvcihjb21wb25lbnRzKSB7XG4gICAgaWYgKEtvbnZhLmlzVW5taW5pZmllZCkge1xuICAgICAgICByZXR1cm4gZnVuY3Rpb24gKHZhbCwgYXR0cikge1xuICAgICAgICAgICAgaWYgKHZhbCA9PT0gdW5kZWZpbmVkIHx8IHZhbCA9PT0gbnVsbCkge1xuICAgICAgICAgICAgICAgIHJldHVybiB2YWw7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBpZiAoIVV0aWwuaXNPYmplY3QodmFsKSkge1xuICAgICAgICAgICAgICAgIFV0aWwud2FybihfZm9ybWF0VmFsdWUodmFsKSArXG4gICAgICAgICAgICAgICAgICAgICcgaXMgYSBub3QgdmFsaWQgdmFsdWUgZm9yIFwiJyArXG4gICAgICAgICAgICAgICAgICAgIGF0dHIgK1xuICAgICAgICAgICAgICAgICAgICAnXCIgYXR0cmlidXRlLiBUaGUgdmFsdWUgc2hvdWxkIGJlIGFuIG9iamVjdCB3aXRoIHByb3BlcnRpZXMgJyArXG4gICAgICAgICAgICAgICAgICAgIGNvbXBvbmVudHMpO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgcmV0dXJuIHZhbDtcbiAgICAgICAgfTtcbiAgICB9XG59XG4iLCJpbXBvcnQgeyBLb252YSBhcyBHbG9iYWwgfSBmcm9tICcuL0dsb2JhbC5qcyc7XG5pbXBvcnQgeyBVdGlsLCBUcmFuc2Zvcm0gfSBmcm9tICcuL1V0aWwuanMnO1xuaW1wb3J0IHsgTm9kZSB9IGZyb20gJy4vTm9kZS5qcyc7XG5pbXBvcnQgeyBDb250YWluZXIgfSBmcm9tICcuL0NvbnRhaW5lci5qcyc7XG5pbXBvcnQgeyBTdGFnZSwgc3RhZ2VzIH0gZnJvbSAnLi9TdGFnZS5qcyc7XG5pbXBvcnQgeyBMYXllciB9IGZyb20gJy4vTGF5ZXIuanMnO1xuaW1wb3J0IHsgRmFzdExheWVyIH0gZnJvbSAnLi9GYXN0TGF5ZXIuanMnO1xuaW1wb3J0IHsgR3JvdXAgfSBmcm9tICcuL0dyb3VwLmpzJztcbmltcG9ydCB7IEREIH0gZnJvbSAnLi9EcmFnQW5kRHJvcC5qcyc7XG5pbXBvcnQgeyBTaGFwZSwgc2hhcGVzIH0gZnJvbSAnLi9TaGFwZS5qcyc7XG5pbXBvcnQgeyBBbmltYXRpb24gfSBmcm9tICcuL0FuaW1hdGlvbi5qcyc7XG5pbXBvcnQgeyBUd2VlbiwgRWFzaW5ncyB9IGZyb20gJy4vVHdlZW4uanMnO1xuaW1wb3J0IHsgQ29udGV4dCB9IGZyb20gJy4vQ29udGV4dC5qcyc7XG5pbXBvcnQgeyBDYW52YXMgfSBmcm9tICcuL0NhbnZhcy5qcyc7XG5leHBvcnQgY29uc3QgS29udmEgPSBVdGlsLl9hc3NpZ24oR2xvYmFsLCB7XG4gICAgVXRpbCxcbiAgICBUcmFuc2Zvcm0sXG4gICAgTm9kZSxcbiAgICBDb250YWluZXIsXG4gICAgU3RhZ2UsXG4gICAgc3RhZ2VzLFxuICAgIExheWVyLFxuICAgIEZhc3RMYXllcixcbiAgICBHcm91cCxcbiAgICBERCxcbiAgICBTaGFwZSxcbiAgICBzaGFwZXMsXG4gICAgQW5pbWF0aW9uLFxuICAgIFR3ZWVuLFxuICAgIEVhc2luZ3MsXG4gICAgQ29udGV4dCxcbiAgICBDYW52YXMsXG59KTtcbmV4cG9ydCBkZWZhdWx0IEtvbnZhO1xuIiwiaW1wb3J0IHsgVXRpbCB9IGZyb20gJy4uL1V0aWwuanMnO1xuaW1wb3J0IHsgRmFjdG9yeSB9IGZyb20gJy4uL0ZhY3RvcnkuanMnO1xuaW1wb3J0IHsgU2hhcGUgfSBmcm9tICcuLi9TaGFwZS5qcyc7XG5pbXBvcnQgeyBfcmVnaXN0ZXJOb2RlIH0gZnJvbSAnLi4vR2xvYmFsLmpzJztcbmltcG9ydCB7IGdldE51bWJlck9yQXJyYXlPZk51bWJlcnNWYWxpZGF0b3IsIGdldE51bWJlclZhbGlkYXRvciwgfSBmcm9tICcuLi9WYWxpZGF0b3JzLmpzJztcbmV4cG9ydCBjbGFzcyBJbWFnZSBleHRlbmRzIFNoYXBlIHtcbiAgICBjb25zdHJ1Y3RvcihhdHRycykge1xuICAgICAgICBzdXBlcihhdHRycyk7XG4gICAgICAgIHRoaXMub24oJ2ltYWdlQ2hhbmdlLmtvbnZhJywgKCkgPT4ge1xuICAgICAgICAgICAgdGhpcy5fc2V0SW1hZ2VMb2FkKCk7XG4gICAgICAgIH0pO1xuICAgICAgICB0aGlzLl9zZXRJbWFnZUxvYWQoKTtcbiAgICB9XG4gICAgX3NldEltYWdlTG9hZCgpIHtcbiAgICAgICAgY29uc3QgaW1hZ2UgPSB0aGlzLmltYWdlKCk7XG4gICAgICAgIGlmIChpbWFnZSAmJiBpbWFnZS5jb21wbGV0ZSkge1xuICAgICAgICAgICAgcmV0dXJuO1xuICAgICAgICB9XG4gICAgICAgIGlmIChpbWFnZSAmJiBpbWFnZS5yZWFkeVN0YXRlID09PSA0KSB7XG4gICAgICAgICAgICByZXR1cm47XG4gICAgICAgIH1cbiAgICAgICAgaWYgKGltYWdlICYmIGltYWdlWydhZGRFdmVudExpc3RlbmVyJ10pIHtcbiAgICAgICAgICAgIGltYWdlWydhZGRFdmVudExpc3RlbmVyJ10oJ2xvYWQnLCAoKSA9PiB7XG4gICAgICAgICAgICAgICAgdGhpcy5fcmVxdWVzdERyYXcoKTtcbiAgICAgICAgICAgIH0pO1xuICAgICAgICB9XG4gICAgfVxuICAgIF91c2VCdWZmZXJDYW52YXMoKSB7XG4gICAgICAgIHJldHVybiBzdXBlci5fdXNlQnVmZmVyQ2FudmFzKHRydWUpO1xuICAgIH1cbiAgICBfc2NlbmVGdW5jKGNvbnRleHQpIHtcbiAgICAgICAgY29uc3Qgd2lkdGggPSB0aGlzLmdldFdpZHRoKCk7XG4gICAgICAgIGNvbnN0IGhlaWdodCA9IHRoaXMuZ2V0SGVpZ2h0KCk7XG4gICAgICAgIGNvbnN0IGNvcm5lclJhZGl1cyA9IHRoaXMuY29ybmVyUmFkaXVzKCk7XG4gICAgICAgIGNvbnN0IGltYWdlID0gdGhpcy5hdHRycy5pbWFnZTtcbiAgICAgICAgbGV0IHBhcmFtcztcbiAgICAgICAgaWYgKGltYWdlKSB7XG4gICAgICAgICAgICBjb25zdCBjcm9wV2lkdGggPSB0aGlzLmF0dHJzLmNyb3BXaWR0aDtcbiAgICAgICAgICAgIGNvbnN0IGNyb3BIZWlnaHQgPSB0aGlzLmF0dHJzLmNyb3BIZWlnaHQ7XG4gICAgICAgICAgICBpZiAoY3JvcFdpZHRoICYmIGNyb3BIZWlnaHQpIHtcbiAgICAgICAgICAgICAgICBwYXJhbXMgPSBbXG4gICAgICAgICAgICAgICAgICAgIGltYWdlLFxuICAgICAgICAgICAgICAgICAgICB0aGlzLmNyb3BYKCksXG4gICAgICAgICAgICAgICAgICAgIHRoaXMuY3JvcFkoKSxcbiAgICAgICAgICAgICAgICAgICAgY3JvcFdpZHRoLFxuICAgICAgICAgICAgICAgICAgICBjcm9wSGVpZ2h0LFxuICAgICAgICAgICAgICAgICAgICAwLFxuICAgICAgICAgICAgICAgICAgICAwLFxuICAgICAgICAgICAgICAgICAgICB3aWR0aCxcbiAgICAgICAgICAgICAgICAgICAgaGVpZ2h0LFxuICAgICAgICAgICAgICAgIF07XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBlbHNlIHtcbiAgICAgICAgICAgICAgICBwYXJhbXMgPSBbaW1hZ2UsIDAsIDAsIHdpZHRoLCBoZWlnaHRdO1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICAgIGlmICh0aGlzLmhhc0ZpbGwoKSB8fCB0aGlzLmhhc1N0cm9rZSgpIHx8IGNvcm5lclJhZGl1cykge1xuICAgICAgICAgICAgY29udGV4dC5iZWdpblBhdGgoKTtcbiAgICAgICAgICAgIGNvcm5lclJhZGl1c1xuICAgICAgICAgICAgICAgID8gVXRpbC5kcmF3Um91bmRlZFJlY3RQYXRoKGNvbnRleHQsIHdpZHRoLCBoZWlnaHQsIGNvcm5lclJhZGl1cylcbiAgICAgICAgICAgICAgICA6IGNvbnRleHQucmVjdCgwLCAwLCB3aWR0aCwgaGVpZ2h0KTtcbiAgICAgICAgICAgIGNvbnRleHQuY2xvc2VQYXRoKCk7XG4gICAgICAgICAgICBjb250ZXh0LmZpbGxTdHJva2VTaGFwZSh0aGlzKTtcbiAgICAgICAgfVxuICAgICAgICBpZiAoaW1hZ2UpIHtcbiAgICAgICAgICAgIGlmIChjb3JuZXJSYWRpdXMpIHtcbiAgICAgICAgICAgICAgICBjb250ZXh0LmNsaXAoKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGNvbnRleHQuZHJhd0ltYWdlLmFwcGx5KGNvbnRleHQsIHBhcmFtcyk7XG4gICAgICAgIH1cbiAgICB9XG4gICAgX2hpdEZ1bmMoY29udGV4dCkge1xuICAgICAgICB2YXIgd2lkdGggPSB0aGlzLndpZHRoKCksIGhlaWdodCA9IHRoaXMuaGVpZ2h0KCksIGNvcm5lclJhZGl1cyA9IHRoaXMuY29ybmVyUmFkaXVzKCk7XG4gICAgICAgIGNvbnRleHQuYmVnaW5QYXRoKCk7XG4gICAgICAgIGlmICghY29ybmVyUmFkaXVzKSB7XG4gICAgICAgICAgICBjb250ZXh0LnJlY3QoMCwgMCwgd2lkdGgsIGhlaWdodCk7XG4gICAgICAgIH1cbiAgICAgICAgZWxzZSB7XG4gICAgICAgICAgICBVdGlsLmRyYXdSb3VuZGVkUmVjdFBhdGgoY29udGV4dCwgd2lkdGgsIGhlaWdodCwgY29ybmVyUmFkaXVzKTtcbiAgICAgICAgfVxuICAgICAgICBjb250ZXh0LmNsb3NlUGF0aCgpO1xuICAgICAgICBjb250ZXh0LmZpbGxTdHJva2VTaGFwZSh0aGlzKTtcbiAgICB9XG4gICAgZ2V0V2lkdGgoKSB7XG4gICAgICAgIHZhciBfYSwgX2I7XG4gICAgICAgIHJldHVybiAoX2EgPSB0aGlzLmF0dHJzLndpZHRoKSAhPT0gbnVsbCAmJiBfYSAhPT0gdm9pZCAwID8gX2EgOiAoX2IgPSB0aGlzLmltYWdlKCkpID09PSBudWxsIHx8IF9iID09PSB2b2lkIDAgPyB2b2lkIDAgOiBfYi53aWR0aDtcbiAgICB9XG4gICAgZ2V0SGVpZ2h0KCkge1xuICAgICAgICB2YXIgX2EsIF9iO1xuICAgICAgICByZXR1cm4gKF9hID0gdGhpcy5hdHRycy5oZWlnaHQpICE9PSBudWxsICYmIF9hICE9PSB2b2lkIDAgPyBfYSA6IChfYiA9IHRoaXMuaW1hZ2UoKSkgPT09IG51bGwgfHwgX2IgPT09IHZvaWQgMCA/IHZvaWQgMCA6IF9iLmhlaWdodDtcbiAgICB9XG4gICAgc3RhdGljIGZyb21VUkwodXJsLCBjYWxsYmFjaywgb25FcnJvciA9IG51bGwpIHtcbiAgICAgICAgdmFyIGltZyA9IFV0aWwuY3JlYXRlSW1hZ2VFbGVtZW50KCk7XG4gICAgICAgIGltZy5vbmxvYWQgPSBmdW5jdGlvbiAoKSB7XG4gICAgICAgICAgICB2YXIgaW1hZ2UgPSBuZXcgSW1hZ2Uoe1xuICAgICAgICAgICAgICAgIGltYWdlOiBpbWcsXG4gICAgICAgICAgICB9KTtcbiAgICAgICAgICAgIGNhbGxiYWNrKGltYWdlKTtcbiAgICAgICAgfTtcbiAgICAgICAgaW1nLm9uZXJyb3IgPSBvbkVycm9yO1xuICAgICAgICBpbWcuY3Jvc3NPcmlnaW4gPSAnQW5vbnltb3VzJztcbiAgICAgICAgaW1nLnNyYyA9IHVybDtcbiAgICB9XG59XG5JbWFnZS5wcm90b3R5cGUuY2xhc3NOYW1lID0gJ0ltYWdlJztcbl9yZWdpc3Rlck5vZGUoSW1hZ2UpO1xuRmFjdG9yeS5hZGRHZXR0ZXJTZXR0ZXIoSW1hZ2UsICdjb3JuZXJSYWRpdXMnLCAwLCBnZXROdW1iZXJPckFycmF5T2ZOdW1iZXJzVmFsaWRhdG9yKDQpKTtcbkZhY3RvcnkuYWRkR2V0dGVyU2V0dGVyKEltYWdlLCAnaW1hZ2UnKTtcbkZhY3RvcnkuYWRkQ29tcG9uZW50c0dldHRlclNldHRlcihJbWFnZSwgJ2Nyb3AnLCBbJ3gnLCAneScsICd3aWR0aCcsICdoZWlnaHQnXSk7XG5GYWN0b3J5LmFkZEdldHRlclNldHRlcihJbWFnZSwgJ2Nyb3BYJywgMCwgZ2V0TnVtYmVyVmFsaWRhdG9yKCkpO1xuRmFjdG9yeS5hZGRHZXR0ZXJTZXR0ZXIoSW1hZ2UsICdjcm9wWScsIDAsIGdldE51bWJlclZhbGlkYXRvcigpKTtcbkZhY3RvcnkuYWRkR2V0dGVyU2V0dGVyKEltYWdlLCAnY3JvcFdpZHRoJywgMCwgZ2V0TnVtYmVyVmFsaWRhdG9yKCkpO1xuRmFjdG9yeS5hZGRHZXR0ZXJTZXR0ZXIoSW1hZ2UsICdjcm9wSGVpZ2h0JywgMCwgZ2V0TnVtYmVyVmFsaWRhdG9yKCkpO1xuIiwiaW1wb3J0IHsgRmFjdG9yeSB9IGZyb20gJy4uL0ZhY3RvcnkuanMnO1xuaW1wb3J0IHsgU2hhcGUgfSBmcm9tICcuLi9TaGFwZS5qcyc7XG5pbXBvcnQgeyBnZXROdW1iZXJWYWxpZGF0b3IsIGdldE51bWJlckFycmF5VmFsaWRhdG9yIH0gZnJvbSAnLi4vVmFsaWRhdG9ycy5qcyc7XG5pbXBvcnQgeyBfcmVnaXN0ZXJOb2RlIH0gZnJvbSAnLi4vR2xvYmFsLmpzJztcbmZ1bmN0aW9uIGdldENvbnRyb2xQb2ludHMoeDAsIHkwLCB4MSwgeTEsIHgyLCB5MiwgdCkge1xuICAgIHZhciBkMDEgPSBNYXRoLnNxcnQoTWF0aC5wb3coeDEgLSB4MCwgMikgKyBNYXRoLnBvdyh5MSAtIHkwLCAyKSksIGQxMiA9IE1hdGguc3FydChNYXRoLnBvdyh4MiAtIHgxLCAyKSArIE1hdGgucG93KHkyIC0geTEsIDIpKSwgZmEgPSAodCAqIGQwMSkgLyAoZDAxICsgZDEyKSwgZmIgPSAodCAqIGQxMikgLyAoZDAxICsgZDEyKSwgcDF4ID0geDEgLSBmYSAqICh4MiAtIHgwKSwgcDF5ID0geTEgLSBmYSAqICh5MiAtIHkwKSwgcDJ4ID0geDEgKyBmYiAqICh4MiAtIHgwKSwgcDJ5ID0geTEgKyBmYiAqICh5MiAtIHkwKTtcbiAgICByZXR1cm4gW3AxeCwgcDF5LCBwMngsIHAyeV07XG59XG5mdW5jdGlvbiBleHBhbmRQb2ludHMocCwgdGVuc2lvbikge1xuICAgIHZhciBsZW4gPSBwLmxlbmd0aCwgYWxsUG9pbnRzID0gW10sIG4sIGNwO1xuICAgIGZvciAobiA9IDI7IG4gPCBsZW4gLSAyOyBuICs9IDIpIHtcbiAgICAgICAgY3AgPSBnZXRDb250cm9sUG9pbnRzKHBbbiAtIDJdLCBwW24gLSAxXSwgcFtuXSwgcFtuICsgMV0sIHBbbiArIDJdLCBwW24gKyAzXSwgdGVuc2lvbik7XG4gICAgICAgIGlmIChpc05hTihjcFswXSkpIHtcbiAgICAgICAgICAgIGNvbnRpbnVlO1xuICAgICAgICB9XG4gICAgICAgIGFsbFBvaW50cy5wdXNoKGNwWzBdKTtcbiAgICAgICAgYWxsUG9pbnRzLnB1c2goY3BbMV0pO1xuICAgICAgICBhbGxQb2ludHMucHVzaChwW25dKTtcbiAgICAgICAgYWxsUG9pbnRzLnB1c2gocFtuICsgMV0pO1xuICAgICAgICBhbGxQb2ludHMucHVzaChjcFsyXSk7XG4gICAgICAgIGFsbFBvaW50cy5wdXNoKGNwWzNdKTtcbiAgICB9XG4gICAgcmV0dXJuIGFsbFBvaW50cztcbn1cbmV4cG9ydCBjbGFzcyBMaW5lIGV4dGVuZHMgU2hhcGUge1xuICAgIGNvbnN0cnVjdG9yKGNvbmZpZykge1xuICAgICAgICBzdXBlcihjb25maWcpO1xuICAgICAgICB0aGlzLm9uKCdwb2ludHNDaGFuZ2Uua29udmEgdGVuc2lvbkNoYW5nZS5rb252YSBjbG9zZWRDaGFuZ2Uua29udmEgYmV6aWVyQ2hhbmdlLmtvbnZhJywgZnVuY3Rpb24gKCkge1xuICAgICAgICAgICAgdGhpcy5fY2xlYXJDYWNoZSgndGVuc2lvblBvaW50cycpO1xuICAgICAgICB9KTtcbiAgICB9XG4gICAgX3NjZW5lRnVuYyhjb250ZXh0KSB7XG4gICAgICAgIHZhciBwb2ludHMgPSB0aGlzLnBvaW50cygpLCBsZW5ndGggPSBwb2ludHMubGVuZ3RoLCB0ZW5zaW9uID0gdGhpcy50ZW5zaW9uKCksIGNsb3NlZCA9IHRoaXMuY2xvc2VkKCksIGJlemllciA9IHRoaXMuYmV6aWVyKCksIHRwLCBsZW4sIG47XG4gICAgICAgIGlmICghbGVuZ3RoKSB7XG4gICAgICAgICAgICByZXR1cm47XG4gICAgICAgIH1cbiAgICAgICAgY29udGV4dC5iZWdpblBhdGgoKTtcbiAgICAgICAgY29udGV4dC5tb3ZlVG8ocG9pbnRzWzBdLCBwb2ludHNbMV0pO1xuICAgICAgICBpZiAodGVuc2lvbiAhPT0gMCAmJiBsZW5ndGggPiA0KSB7XG4gICAgICAgICAgICB0cCA9IHRoaXMuZ2V0VGVuc2lvblBvaW50cygpO1xuICAgICAgICAgICAgbGVuID0gdHAubGVuZ3RoO1xuICAgICAgICAgICAgbiA9IGNsb3NlZCA/IDAgOiA0O1xuICAgICAgICAgICAgaWYgKCFjbG9zZWQpIHtcbiAgICAgICAgICAgICAgICBjb250ZXh0LnF1YWRyYXRpY0N1cnZlVG8odHBbMF0sIHRwWzFdLCB0cFsyXSwgdHBbM10pO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgd2hpbGUgKG4gPCBsZW4gLSAyKSB7XG4gICAgICAgICAgICAgICAgY29udGV4dC5iZXppZXJDdXJ2ZVRvKHRwW24rK10sIHRwW24rK10sIHRwW24rK10sIHRwW24rK10sIHRwW24rK10sIHRwW24rK10pO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgaWYgKCFjbG9zZWQpIHtcbiAgICAgICAgICAgICAgICBjb250ZXh0LnF1YWRyYXRpY0N1cnZlVG8odHBbbGVuIC0gMl0sIHRwW2xlbiAtIDFdLCBwb2ludHNbbGVuZ3RoIC0gMl0sIHBvaW50c1tsZW5ndGggLSAxXSk7XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgICAgZWxzZSBpZiAoYmV6aWVyKSB7XG4gICAgICAgICAgICBuID0gMjtcbiAgICAgICAgICAgIHdoaWxlIChuIDwgbGVuZ3RoKSB7XG4gICAgICAgICAgICAgICAgY29udGV4dC5iZXppZXJDdXJ2ZVRvKHBvaW50c1tuKytdLCBwb2ludHNbbisrXSwgcG9pbnRzW24rK10sIHBvaW50c1tuKytdLCBwb2ludHNbbisrXSwgcG9pbnRzW24rK10pO1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICAgIGVsc2Uge1xuICAgICAgICAgICAgZm9yIChuID0gMjsgbiA8IGxlbmd0aDsgbiArPSAyKSB7XG4gICAgICAgICAgICAgICAgY29udGV4dC5saW5lVG8ocG9pbnRzW25dLCBwb2ludHNbbiArIDFdKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgICBpZiAoY2xvc2VkKSB7XG4gICAgICAgICAgICBjb250ZXh0LmNsb3NlUGF0aCgpO1xuICAgICAgICAgICAgY29udGV4dC5maWxsU3Ryb2tlU2hhcGUodGhpcyk7XG4gICAgICAgIH1cbiAgICAgICAgZWxzZSB7XG4gICAgICAgICAgICBjb250ZXh0LnN0cm9rZVNoYXBlKHRoaXMpO1xuICAgICAgICB9XG4gICAgfVxuICAgIGdldFRlbnNpb25Qb2ludHMoKSB7XG4gICAgICAgIHJldHVybiB0aGlzLl9nZXRDYWNoZSgndGVuc2lvblBvaW50cycsIHRoaXMuX2dldFRlbnNpb25Qb2ludHMpO1xuICAgIH1cbiAgICBfZ2V0VGVuc2lvblBvaW50cygpIHtcbiAgICAgICAgaWYgKHRoaXMuY2xvc2VkKCkpIHtcbiAgICAgICAgICAgIHJldHVybiB0aGlzLl9nZXRUZW5zaW9uUG9pbnRzQ2xvc2VkKCk7XG4gICAgICAgIH1cbiAgICAgICAgZWxzZSB7XG4gICAgICAgICAgICByZXR1cm4gZXhwYW5kUG9pbnRzKHRoaXMucG9pbnRzKCksIHRoaXMudGVuc2lvbigpKTtcbiAgICAgICAgfVxuICAgIH1cbiAgICBfZ2V0VGVuc2lvblBvaW50c0Nsb3NlZCgpIHtcbiAgICAgICAgdmFyIHAgPSB0aGlzLnBvaW50cygpLCBsZW4gPSBwLmxlbmd0aCwgdGVuc2lvbiA9IHRoaXMudGVuc2lvbigpLCBmaXJzdENvbnRyb2xQb2ludHMgPSBnZXRDb250cm9sUG9pbnRzKHBbbGVuIC0gMl0sIHBbbGVuIC0gMV0sIHBbMF0sIHBbMV0sIHBbMl0sIHBbM10sIHRlbnNpb24pLCBsYXN0Q29udHJvbFBvaW50cyA9IGdldENvbnRyb2xQb2ludHMocFtsZW4gLSA0XSwgcFtsZW4gLSAzXSwgcFtsZW4gLSAyXSwgcFtsZW4gLSAxXSwgcFswXSwgcFsxXSwgdGVuc2lvbiksIG1pZGRsZSA9IGV4cGFuZFBvaW50cyhwLCB0ZW5zaW9uKSwgdHAgPSBbZmlyc3RDb250cm9sUG9pbnRzWzJdLCBmaXJzdENvbnRyb2xQb2ludHNbM11dXG4gICAgICAgICAgICAuY29uY2F0KG1pZGRsZSlcbiAgICAgICAgICAgIC5jb25jYXQoW1xuICAgICAgICAgICAgbGFzdENvbnRyb2xQb2ludHNbMF0sXG4gICAgICAgICAgICBsYXN0Q29udHJvbFBvaW50c1sxXSxcbiAgICAgICAgICAgIHBbbGVuIC0gMl0sXG4gICAgICAgICAgICBwW2xlbiAtIDFdLFxuICAgICAgICAgICAgbGFzdENvbnRyb2xQb2ludHNbMl0sXG4gICAgICAgICAgICBsYXN0Q29udHJvbFBvaW50c1szXSxcbiAgICAgICAgICAgIGZpcnN0Q29udHJvbFBvaW50c1swXSxcbiAgICAgICAgICAgIGZpcnN0Q29udHJvbFBvaW50c1sxXSxcbiAgICAgICAgICAgIHBbMF0sXG4gICAgICAgICAgICBwWzFdLFxuICAgICAgICBdKTtcbiAgICAgICAgcmV0dXJuIHRwO1xuICAgIH1cbiAgICBnZXRXaWR0aCgpIHtcbiAgICAgICAgcmV0dXJuIHRoaXMuZ2V0U2VsZlJlY3QoKS53aWR0aDtcbiAgICB9XG4gICAgZ2V0SGVpZ2h0KCkge1xuICAgICAgICByZXR1cm4gdGhpcy5nZXRTZWxmUmVjdCgpLmhlaWdodDtcbiAgICB9XG4gICAgZ2V0U2VsZlJlY3QoKSB7XG4gICAgICAgIHZhciBwb2ludHMgPSB0aGlzLnBvaW50cygpO1xuICAgICAgICBpZiAocG9pbnRzLmxlbmd0aCA8IDQpIHtcbiAgICAgICAgICAgIHJldHVybiB7XG4gICAgICAgICAgICAgICAgeDogcG9pbnRzWzBdIHx8IDAsXG4gICAgICAgICAgICAgICAgeTogcG9pbnRzWzFdIHx8IDAsXG4gICAgICAgICAgICAgICAgd2lkdGg6IDAsXG4gICAgICAgICAgICAgICAgaGVpZ2h0OiAwLFxuICAgICAgICAgICAgfTtcbiAgICAgICAgfVxuICAgICAgICBpZiAodGhpcy50ZW5zaW9uKCkgIT09IDApIHtcbiAgICAgICAgICAgIHBvaW50cyA9IFtcbiAgICAgICAgICAgICAgICBwb2ludHNbMF0sXG4gICAgICAgICAgICAgICAgcG9pbnRzWzFdLFxuICAgICAgICAgICAgICAgIC4uLnRoaXMuX2dldFRlbnNpb25Qb2ludHMoKSxcbiAgICAgICAgICAgICAgICBwb2ludHNbcG9pbnRzLmxlbmd0aCAtIDJdLFxuICAgICAgICAgICAgICAgIHBvaW50c1twb2ludHMubGVuZ3RoIC0gMV0sXG4gICAgICAgICAgICBdO1xuICAgICAgICB9XG4gICAgICAgIGVsc2Uge1xuICAgICAgICAgICAgcG9pbnRzID0gdGhpcy5wb2ludHMoKTtcbiAgICAgICAgfVxuICAgICAgICB2YXIgbWluWCA9IHBvaW50c1swXTtcbiAgICAgICAgdmFyIG1heFggPSBwb2ludHNbMF07XG4gICAgICAgIHZhciBtaW5ZID0gcG9pbnRzWzFdO1xuICAgICAgICB2YXIgbWF4WSA9IHBvaW50c1sxXTtcbiAgICAgICAgdmFyIHgsIHk7XG4gICAgICAgIGZvciAodmFyIGkgPSAwOyBpIDwgcG9pbnRzLmxlbmd0aCAvIDI7IGkrKykge1xuICAgICAgICAgICAgeCA9IHBvaW50c1tpICogMl07XG4gICAgICAgICAgICB5ID0gcG9pbnRzW2kgKiAyICsgMV07XG4gICAgICAgICAgICBtaW5YID0gTWF0aC5taW4obWluWCwgeCk7XG4gICAgICAgICAgICBtYXhYID0gTWF0aC5tYXgobWF4WCwgeCk7XG4gICAgICAgICAgICBtaW5ZID0gTWF0aC5taW4obWluWSwgeSk7XG4gICAgICAgICAgICBtYXhZID0gTWF0aC5tYXgobWF4WSwgeSk7XG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuIHtcbiAgICAgICAgICAgIHg6IG1pblgsXG4gICAgICAgICAgICB5OiBtaW5ZLFxuICAgICAgICAgICAgd2lkdGg6IG1heFggLSBtaW5YLFxuICAgICAgICAgICAgaGVpZ2h0OiBtYXhZIC0gbWluWSxcbiAgICAgICAgfTtcbiAgICB9XG59XG5MaW5lLnByb3RvdHlwZS5jbGFzc05hbWUgPSAnTGluZSc7XG5MaW5lLnByb3RvdHlwZS5fYXR0cnNBZmZlY3RpbmdTaXplID0gWydwb2ludHMnLCAnYmV6aWVyJywgJ3RlbnNpb24nXTtcbl9yZWdpc3Rlck5vZGUoTGluZSk7XG5GYWN0b3J5LmFkZEdldHRlclNldHRlcihMaW5lLCAnY2xvc2VkJywgZmFsc2UpO1xuRmFjdG9yeS5hZGRHZXR0ZXJTZXR0ZXIoTGluZSwgJ2JlemllcicsIGZhbHNlKTtcbkZhY3RvcnkuYWRkR2V0dGVyU2V0dGVyKExpbmUsICd0ZW5zaW9uJywgMCwgZ2V0TnVtYmVyVmFsaWRhdG9yKCkpO1xuRmFjdG9yeS5hZGRHZXR0ZXJTZXR0ZXIoTGluZSwgJ3BvaW50cycsIFtdLCBnZXROdW1iZXJBcnJheVZhbGlkYXRvcigpKTtcbiIsImltcG9ydCB7IEZhY3RvcnkgfSBmcm9tICcuLi9GYWN0b3J5LmpzJztcbmltcG9ydCB7IFNoYXBlIH0gZnJvbSAnLi4vU2hhcGUuanMnO1xuaW1wb3J0IHsgX3JlZ2lzdGVyTm9kZSB9IGZyb20gJy4uL0dsb2JhbC5qcyc7XG5pbXBvcnQgeyBVdGlsIH0gZnJvbSAnLi4vVXRpbC5qcyc7XG5pbXBvcnQgeyBnZXROdW1iZXJPckFycmF5T2ZOdW1iZXJzVmFsaWRhdG9yIH0gZnJvbSAnLi4vVmFsaWRhdG9ycy5qcyc7XG5leHBvcnQgY2xhc3MgUmVjdCBleHRlbmRzIFNoYXBlIHtcbiAgICBfc2NlbmVGdW5jKGNvbnRleHQpIHtcbiAgICAgICAgdmFyIGNvcm5lclJhZGl1cyA9IHRoaXMuY29ybmVyUmFkaXVzKCksIHdpZHRoID0gdGhpcy53aWR0aCgpLCBoZWlnaHQgPSB0aGlzLmhlaWdodCgpO1xuICAgICAgICBjb250ZXh0LmJlZ2luUGF0aCgpO1xuICAgICAgICBpZiAoIWNvcm5lclJhZGl1cykge1xuICAgICAgICAgICAgY29udGV4dC5yZWN0KDAsIDAsIHdpZHRoLCBoZWlnaHQpO1xuICAgICAgICB9XG4gICAgICAgIGVsc2Uge1xuICAgICAgICAgICAgVXRpbC5kcmF3Um91bmRlZFJlY3RQYXRoKGNvbnRleHQsIHdpZHRoLCBoZWlnaHQsIGNvcm5lclJhZGl1cyk7XG4gICAgICAgIH1cbiAgICAgICAgY29udGV4dC5jbG9zZVBhdGgoKTtcbiAgICAgICAgY29udGV4dC5maWxsU3Ryb2tlU2hhcGUodGhpcyk7XG4gICAgfVxufVxuUmVjdC5wcm90b3R5cGUuY2xhc3NOYW1lID0gJ1JlY3QnO1xuX3JlZ2lzdGVyTm9kZShSZWN0KTtcbkZhY3RvcnkuYWRkR2V0dGVyU2V0dGVyKFJlY3QsICdjb3JuZXJSYWRpdXMnLCAwLCBnZXROdW1iZXJPckFycmF5T2ZOdW1iZXJzVmFsaWRhdG9yKDQpKTtcbiIsImltcG9ydCB7IFV0aWwgfSBmcm9tICcuLi9VdGlsLmpzJztcbmltcG9ydCB7IEZhY3RvcnkgfSBmcm9tICcuLi9GYWN0b3J5LmpzJztcbmltcG9ydCB7IFNoYXBlIH0gZnJvbSAnLi4vU2hhcGUuanMnO1xuaW1wb3J0IHsgZ2V0TnVtYmVyVmFsaWRhdG9yLCBnZXRTdHJpbmdWYWxpZGF0b3IsIGdldE51bWJlck9yQXV0b1ZhbGlkYXRvciwgZ2V0Qm9vbGVhblZhbGlkYXRvciwgfSBmcm9tICcuLi9WYWxpZGF0b3JzLmpzJztcbmltcG9ydCB7IF9yZWdpc3Rlck5vZGUgfSBmcm9tICcuLi9HbG9iYWwuanMnO1xuZXhwb3J0IGZ1bmN0aW9uIHN0cmluZ1RvQXJyYXkoc3RyaW5nKSB7XG4gICAgcmV0dXJuIEFycmF5LmZyb20oc3RyaW5nKTtcbn1cbnZhciBBVVRPID0gJ2F1dG8nLCBDRU5URVIgPSAnY2VudGVyJywgSlVTVElGWSA9ICdqdXN0aWZ5JywgQ0hBTkdFX0tPTlZBID0gJ0NoYW5nZS5rb252YScsIENPTlRFWFRfMkQgPSAnMmQnLCBEQVNIID0gJy0nLCBMRUZUID0gJ2xlZnQnLCBURVhUID0gJ3RleHQnLCBURVhUX1VQUEVSID0gJ1RleHQnLCBUT1AgPSAndG9wJywgQk9UVE9NID0gJ2JvdHRvbScsIE1JRERMRSA9ICdtaWRkbGUnLCBOT1JNQUwgPSAnbm9ybWFsJywgUFhfU1BBQ0UgPSAncHggJywgU1BBQ0UgPSAnICcsIFJJR0hUID0gJ3JpZ2h0JywgV09SRCA9ICd3b3JkJywgQ0hBUiA9ICdjaGFyJywgTk9ORSA9ICdub25lJywgRUxMSVBTSVMgPSAn4oCmJywgQVRUUl9DSEFOR0VfTElTVCA9IFtcbiAgICAnZm9udEZhbWlseScsXG4gICAgJ2ZvbnRTaXplJyxcbiAgICAnZm9udFN0eWxlJyxcbiAgICAnZm9udFZhcmlhbnQnLFxuICAgICdwYWRkaW5nJyxcbiAgICAnYWxpZ24nLFxuICAgICd2ZXJ0aWNhbEFsaWduJyxcbiAgICAnbGluZUhlaWdodCcsXG4gICAgJ3RleHQnLFxuICAgICd3aWR0aCcsXG4gICAgJ2hlaWdodCcsXG4gICAgJ3dyYXAnLFxuICAgICdlbGxpcHNpcycsXG4gICAgJ2xldHRlclNwYWNpbmcnLFxuXSwgYXR0ckNoYW5nZUxpc3RMZW4gPSBBVFRSX0NIQU5HRV9MSVNULmxlbmd0aDtcbmZ1bmN0aW9uIG5vcm1hbGl6ZUZvbnRGYW1pbHkoZm9udEZhbWlseSkge1xuICAgIHJldHVybiBmb250RmFtaWx5XG4gICAgICAgIC5zcGxpdCgnLCcpXG4gICAgICAgIC5tYXAoKGZhbWlseSkgPT4ge1xuICAgICAgICBmYW1pbHkgPSBmYW1pbHkudHJpbSgpO1xuICAgICAgICBjb25zdCBoYXNTcGFjZSA9IGZhbWlseS5pbmRleE9mKCcgJykgPj0gMDtcbiAgICAgICAgY29uc3QgaGFzUXVvdGVzID0gZmFtaWx5LmluZGV4T2YoJ1wiJykgPj0gMCB8fCBmYW1pbHkuaW5kZXhPZihcIidcIikgPj0gMDtcbiAgICAgICAgaWYgKGhhc1NwYWNlICYmICFoYXNRdW90ZXMpIHtcbiAgICAgICAgICAgIGZhbWlseSA9IGBcIiR7ZmFtaWx5fVwiYDtcbiAgICAgICAgfVxuICAgICAgICByZXR1cm4gZmFtaWx5O1xuICAgIH0pXG4gICAgICAgIC5qb2luKCcsICcpO1xufVxudmFyIGR1bW15Q29udGV4dDtcbmZ1bmN0aW9uIGdldER1bW15Q29udGV4dCgpIHtcbiAgICBpZiAoZHVtbXlDb250ZXh0KSB7XG4gICAgICAgIHJldHVybiBkdW1teUNvbnRleHQ7XG4gICAgfVxuICAgIGR1bW15Q29udGV4dCA9IFV0aWwuY3JlYXRlQ2FudmFzRWxlbWVudCgpLmdldENvbnRleHQoQ09OVEVYVF8yRCk7XG4gICAgcmV0dXJuIGR1bW15Q29udGV4dDtcbn1cbmZ1bmN0aW9uIF9maWxsRnVuYyhjb250ZXh0KSB7XG4gICAgY29udGV4dC5maWxsVGV4dCh0aGlzLl9wYXJ0aWFsVGV4dCwgdGhpcy5fcGFydGlhbFRleHRYLCB0aGlzLl9wYXJ0aWFsVGV4dFkpO1xufVxuZnVuY3Rpb24gX3N0cm9rZUZ1bmMoY29udGV4dCkge1xuICAgIGNvbnRleHQuc3Ryb2tlVGV4dCh0aGlzLl9wYXJ0aWFsVGV4dCwgdGhpcy5fcGFydGlhbFRleHRYLCB0aGlzLl9wYXJ0aWFsVGV4dFkpO1xufVxuZnVuY3Rpb24gY2hlY2tEZWZhdWx0RmlsbChjb25maWcpIHtcbiAgICBjb25maWcgPSBjb25maWcgfHwge307XG4gICAgaWYgKCFjb25maWcuZmlsbExpbmVhckdyYWRpZW50Q29sb3JTdG9wcyAmJlxuICAgICAgICAhY29uZmlnLmZpbGxSYWRpYWxHcmFkaWVudENvbG9yU3RvcHMgJiZcbiAgICAgICAgIWNvbmZpZy5maWxsUGF0dGVybkltYWdlKSB7XG4gICAgICAgIGNvbmZpZy5maWxsID0gY29uZmlnLmZpbGwgfHwgJ2JsYWNrJztcbiAgICB9XG4gICAgcmV0dXJuIGNvbmZpZztcbn1cbmV4cG9ydCBjbGFzcyBUZXh0IGV4dGVuZHMgU2hhcGUge1xuICAgIGNvbnN0cnVjdG9yKGNvbmZpZykge1xuICAgICAgICBzdXBlcihjaGVja0RlZmF1bHRGaWxsKGNvbmZpZykpO1xuICAgICAgICB0aGlzLl9wYXJ0aWFsVGV4dFggPSAwO1xuICAgICAgICB0aGlzLl9wYXJ0aWFsVGV4dFkgPSAwO1xuICAgICAgICBmb3IgKHZhciBuID0gMDsgbiA8IGF0dHJDaGFuZ2VMaXN0TGVuOyBuKyspIHtcbiAgICAgICAgICAgIHRoaXMub24oQVRUUl9DSEFOR0VfTElTVFtuXSArIENIQU5HRV9LT05WQSwgdGhpcy5fc2V0VGV4dERhdGEpO1xuICAgICAgICB9XG4gICAgICAgIHRoaXMuX3NldFRleHREYXRhKCk7XG4gICAgfVxuICAgIF9zY2VuZUZ1bmMoY29udGV4dCkge1xuICAgICAgICB2YXIgdGV4dEFyciA9IHRoaXMudGV4dEFyciwgdGV4dEFyckxlbiA9IHRleHRBcnIubGVuZ3RoO1xuICAgICAgICBpZiAoIXRoaXMudGV4dCgpKSB7XG4gICAgICAgICAgICByZXR1cm47XG4gICAgICAgIH1cbiAgICAgICAgdmFyIHBhZGRpbmcgPSB0aGlzLnBhZGRpbmcoKSwgZm9udFNpemUgPSB0aGlzLmZvbnRTaXplKCksIGxpbmVIZWlnaHRQeCA9IHRoaXMubGluZUhlaWdodCgpICogZm9udFNpemUsIHZlcnRpY2FsQWxpZ24gPSB0aGlzLnZlcnRpY2FsQWxpZ24oKSwgYWxpZ25ZID0gMCwgYWxpZ24gPSB0aGlzLmFsaWduKCksIHRvdGFsV2lkdGggPSB0aGlzLmdldFdpZHRoKCksIGxldHRlclNwYWNpbmcgPSB0aGlzLmxldHRlclNwYWNpbmcoKSwgZmlsbCA9IHRoaXMuZmlsbCgpLCB0ZXh0RGVjb3JhdGlvbiA9IHRoaXMudGV4dERlY29yYXRpb24oKSwgc2hvdWxkVW5kZXJsaW5lID0gdGV4dERlY29yYXRpb24uaW5kZXhPZigndW5kZXJsaW5lJykgIT09IC0xLCBzaG91bGRMaW5lVGhyb3VnaCA9IHRleHREZWNvcmF0aW9uLmluZGV4T2YoJ2xpbmUtdGhyb3VnaCcpICE9PSAtMSwgbjtcbiAgICAgICAgdmFyIHRyYW5zbGF0ZVkgPSAwO1xuICAgICAgICB2YXIgdHJhbnNsYXRlWSA9IGxpbmVIZWlnaHRQeCAvIDI7XG4gICAgICAgIHZhciBsaW5lVHJhbnNsYXRlWCA9IDA7XG4gICAgICAgIHZhciBsaW5lVHJhbnNsYXRlWSA9IDA7XG4gICAgICAgIGNvbnRleHQuc2V0QXR0cignZm9udCcsIHRoaXMuX2dldENvbnRleHRGb250KCkpO1xuICAgICAgICBjb250ZXh0LnNldEF0dHIoJ3RleHRCYXNlbGluZScsIE1JRERMRSk7XG4gICAgICAgIGNvbnRleHQuc2V0QXR0cigndGV4dEFsaWduJywgTEVGVCk7XG4gICAgICAgIGlmICh2ZXJ0aWNhbEFsaWduID09PSBNSURETEUpIHtcbiAgICAgICAgICAgIGFsaWduWSA9ICh0aGlzLmdldEhlaWdodCgpIC0gdGV4dEFyckxlbiAqIGxpbmVIZWlnaHRQeCAtIHBhZGRpbmcgKiAyKSAvIDI7XG4gICAgICAgIH1cbiAgICAgICAgZWxzZSBpZiAodmVydGljYWxBbGlnbiA9PT0gQk9UVE9NKSB7XG4gICAgICAgICAgICBhbGlnblkgPSB0aGlzLmdldEhlaWdodCgpIC0gdGV4dEFyckxlbiAqIGxpbmVIZWlnaHRQeCAtIHBhZGRpbmcgKiAyO1xuICAgICAgICB9XG4gICAgICAgIGNvbnRleHQudHJhbnNsYXRlKHBhZGRpbmcsIGFsaWduWSArIHBhZGRpbmcpO1xuICAgICAgICBmb3IgKG4gPSAwOyBuIDwgdGV4dEFyckxlbjsgbisrKSB7XG4gICAgICAgICAgICB2YXIgbGluZVRyYW5zbGF0ZVggPSAwO1xuICAgICAgICAgICAgdmFyIGxpbmVUcmFuc2xhdGVZID0gMDtcbiAgICAgICAgICAgIHZhciBvYmogPSB0ZXh0QXJyW25dLCB0ZXh0ID0gb2JqLnRleHQsIHdpZHRoID0gb2JqLndpZHRoLCBsYXN0TGluZSA9IG9iai5sYXN0SW5QYXJhZ3JhcGgsIHNwYWNlc051bWJlciwgb25lV29yZCwgbGluZVdpZHRoO1xuICAgICAgICAgICAgY29udGV4dC5zYXZlKCk7XG4gICAgICAgICAgICBpZiAoYWxpZ24gPT09IFJJR0hUKSB7XG4gICAgICAgICAgICAgICAgbGluZVRyYW5zbGF0ZVggKz0gdG90YWxXaWR0aCAtIHdpZHRoIC0gcGFkZGluZyAqIDI7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBlbHNlIGlmIChhbGlnbiA9PT0gQ0VOVEVSKSB7XG4gICAgICAgICAgICAgICAgbGluZVRyYW5zbGF0ZVggKz0gKHRvdGFsV2lkdGggLSB3aWR0aCAtIHBhZGRpbmcgKiAyKSAvIDI7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBpZiAoc2hvdWxkVW5kZXJsaW5lKSB7XG4gICAgICAgICAgICAgICAgY29udGV4dC5zYXZlKCk7XG4gICAgICAgICAgICAgICAgY29udGV4dC5iZWdpblBhdGgoKTtcbiAgICAgICAgICAgICAgICBjb250ZXh0Lm1vdmVUbyhsaW5lVHJhbnNsYXRlWCwgdHJhbnNsYXRlWSArIGxpbmVUcmFuc2xhdGVZICsgTWF0aC5yb3VuZChmb250U2l6ZSAvIDIpKTtcbiAgICAgICAgICAgICAgICBzcGFjZXNOdW1iZXIgPSB0ZXh0LnNwbGl0KCcgJykubGVuZ3RoIC0gMTtcbiAgICAgICAgICAgICAgICBvbmVXb3JkID0gc3BhY2VzTnVtYmVyID09PSAwO1xuICAgICAgICAgICAgICAgIGxpbmVXaWR0aCA9XG4gICAgICAgICAgICAgICAgICAgIGFsaWduID09PSBKVVNUSUZZICYmIGxhc3RMaW5lICYmICFvbmVXb3JkXG4gICAgICAgICAgICAgICAgICAgICAgICA/IHRvdGFsV2lkdGggLSBwYWRkaW5nICogMlxuICAgICAgICAgICAgICAgICAgICAgICAgOiB3aWR0aDtcbiAgICAgICAgICAgICAgICBjb250ZXh0LmxpbmVUbyhsaW5lVHJhbnNsYXRlWCArIE1hdGgucm91bmQobGluZVdpZHRoKSwgdHJhbnNsYXRlWSArIGxpbmVUcmFuc2xhdGVZICsgTWF0aC5yb3VuZChmb250U2l6ZSAvIDIpKTtcbiAgICAgICAgICAgICAgICBjb250ZXh0LmxpbmVXaWR0aCA9IGZvbnRTaXplIC8gMTU7XG4gICAgICAgICAgICAgICAgY29udGV4dC5zdHJva2VTdHlsZSA9IGZpbGw7XG4gICAgICAgICAgICAgICAgY29udGV4dC5zdHJva2UoKTtcbiAgICAgICAgICAgICAgICBjb250ZXh0LnJlc3RvcmUoKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGlmIChzaG91bGRMaW5lVGhyb3VnaCkge1xuICAgICAgICAgICAgICAgIGNvbnRleHQuc2F2ZSgpO1xuICAgICAgICAgICAgICAgIGNvbnRleHQuYmVnaW5QYXRoKCk7XG4gICAgICAgICAgICAgICAgY29udGV4dC5tb3ZlVG8obGluZVRyYW5zbGF0ZVgsIHRyYW5zbGF0ZVkgKyBsaW5lVHJhbnNsYXRlWSk7XG4gICAgICAgICAgICAgICAgc3BhY2VzTnVtYmVyID0gdGV4dC5zcGxpdCgnICcpLmxlbmd0aCAtIDE7XG4gICAgICAgICAgICAgICAgb25lV29yZCA9IHNwYWNlc051bWJlciA9PT0gMDtcbiAgICAgICAgICAgICAgICBsaW5lV2lkdGggPVxuICAgICAgICAgICAgICAgICAgICBhbGlnbiA9PT0gSlVTVElGWSAmJiBsYXN0TGluZSAmJiAhb25lV29yZFxuICAgICAgICAgICAgICAgICAgICAgICAgPyB0b3RhbFdpZHRoIC0gcGFkZGluZyAqIDJcbiAgICAgICAgICAgICAgICAgICAgICAgIDogd2lkdGg7XG4gICAgICAgICAgICAgICAgY29udGV4dC5saW5lVG8obGluZVRyYW5zbGF0ZVggKyBNYXRoLnJvdW5kKGxpbmVXaWR0aCksIHRyYW5zbGF0ZVkgKyBsaW5lVHJhbnNsYXRlWSk7XG4gICAgICAgICAgICAgICAgY29udGV4dC5saW5lV2lkdGggPSBmb250U2l6ZSAvIDE1O1xuICAgICAgICAgICAgICAgIGNvbnRleHQuc3Ryb2tlU3R5bGUgPSBmaWxsO1xuICAgICAgICAgICAgICAgIGNvbnRleHQuc3Ryb2tlKCk7XG4gICAgICAgICAgICAgICAgY29udGV4dC5yZXN0b3JlKCk7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBpZiAobGV0dGVyU3BhY2luZyAhPT0gMCB8fCBhbGlnbiA9PT0gSlVTVElGWSkge1xuICAgICAgICAgICAgICAgIHNwYWNlc051bWJlciA9IHRleHQuc3BsaXQoJyAnKS5sZW5ndGggLSAxO1xuICAgICAgICAgICAgICAgIHZhciBhcnJheSA9IHN0cmluZ1RvQXJyYXkodGV4dCk7XG4gICAgICAgICAgICAgICAgZm9yICh2YXIgbGkgPSAwOyBsaSA8IGFycmF5Lmxlbmd0aDsgbGkrKykge1xuICAgICAgICAgICAgICAgICAgICB2YXIgbGV0dGVyID0gYXJyYXlbbGldO1xuICAgICAgICAgICAgICAgICAgICBpZiAobGV0dGVyID09PSAnICcgJiYgIWxhc3RMaW5lICYmIGFsaWduID09PSBKVVNUSUZZKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICBsaW5lVHJhbnNsYXRlWCArPSAodG90YWxXaWR0aCAtIHBhZGRpbmcgKiAyIC0gd2lkdGgpIC8gc3BhY2VzTnVtYmVyO1xuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgIHRoaXMuX3BhcnRpYWxUZXh0WCA9IGxpbmVUcmFuc2xhdGVYO1xuICAgICAgICAgICAgICAgICAgICB0aGlzLl9wYXJ0aWFsVGV4dFkgPSB0cmFuc2xhdGVZICsgbGluZVRyYW5zbGF0ZVk7XG4gICAgICAgICAgICAgICAgICAgIHRoaXMuX3BhcnRpYWxUZXh0ID0gbGV0dGVyO1xuICAgICAgICAgICAgICAgICAgICBjb250ZXh0LmZpbGxTdHJva2VTaGFwZSh0aGlzKTtcbiAgICAgICAgICAgICAgICAgICAgbGluZVRyYW5zbGF0ZVggKz0gdGhpcy5tZWFzdXJlU2l6ZShsZXR0ZXIpLndpZHRoICsgbGV0dGVyU3BhY2luZztcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBlbHNlIHtcbiAgICAgICAgICAgICAgICB0aGlzLl9wYXJ0aWFsVGV4dFggPSBsaW5lVHJhbnNsYXRlWDtcbiAgICAgICAgICAgICAgICB0aGlzLl9wYXJ0aWFsVGV4dFkgPSB0cmFuc2xhdGVZICsgbGluZVRyYW5zbGF0ZVk7XG4gICAgICAgICAgICAgICAgdGhpcy5fcGFydGlhbFRleHQgPSB0ZXh0O1xuICAgICAgICAgICAgICAgIGNvbnRleHQuZmlsbFN0cm9rZVNoYXBlKHRoaXMpO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgY29udGV4dC5yZXN0b3JlKCk7XG4gICAgICAgICAgICBpZiAodGV4dEFyckxlbiA+IDEpIHtcbiAgICAgICAgICAgICAgICB0cmFuc2xhdGVZICs9IGxpbmVIZWlnaHRQeDtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgIH1cbiAgICBfaGl0RnVuYyhjb250ZXh0KSB7XG4gICAgICAgIHZhciB3aWR0aCA9IHRoaXMuZ2V0V2lkdGgoKSwgaGVpZ2h0ID0gdGhpcy5nZXRIZWlnaHQoKTtcbiAgICAgICAgY29udGV4dC5iZWdpblBhdGgoKTtcbiAgICAgICAgY29udGV4dC5yZWN0KDAsIDAsIHdpZHRoLCBoZWlnaHQpO1xuICAgICAgICBjb250ZXh0LmNsb3NlUGF0aCgpO1xuICAgICAgICBjb250ZXh0LmZpbGxTdHJva2VTaGFwZSh0aGlzKTtcbiAgICB9XG4gICAgc2V0VGV4dCh0ZXh0KSB7XG4gICAgICAgIHZhciBzdHIgPSBVdGlsLl9pc1N0cmluZyh0ZXh0KVxuICAgICAgICAgICAgPyB0ZXh0XG4gICAgICAgICAgICA6IHRleHQgPT09IG51bGwgfHwgdGV4dCA9PT0gdW5kZWZpbmVkXG4gICAgICAgICAgICAgICAgPyAnJ1xuICAgICAgICAgICAgICAgIDogdGV4dCArICcnO1xuICAgICAgICB0aGlzLl9zZXRBdHRyKFRFWFQsIHN0cik7XG4gICAgICAgIHJldHVybiB0aGlzO1xuICAgIH1cbiAgICBnZXRXaWR0aCgpIHtcbiAgICAgICAgdmFyIGlzQXV0byA9IHRoaXMuYXR0cnMud2lkdGggPT09IEFVVE8gfHwgdGhpcy5hdHRycy53aWR0aCA9PT0gdW5kZWZpbmVkO1xuICAgICAgICByZXR1cm4gaXNBdXRvID8gdGhpcy5nZXRUZXh0V2lkdGgoKSArIHRoaXMucGFkZGluZygpICogMiA6IHRoaXMuYXR0cnMud2lkdGg7XG4gICAgfVxuICAgIGdldEhlaWdodCgpIHtcbiAgICAgICAgdmFyIGlzQXV0byA9IHRoaXMuYXR0cnMuaGVpZ2h0ID09PSBBVVRPIHx8IHRoaXMuYXR0cnMuaGVpZ2h0ID09PSB1bmRlZmluZWQ7XG4gICAgICAgIHJldHVybiBpc0F1dG9cbiAgICAgICAgICAgID8gdGhpcy5mb250U2l6ZSgpICogdGhpcy50ZXh0QXJyLmxlbmd0aCAqIHRoaXMubGluZUhlaWdodCgpICtcbiAgICAgICAgICAgICAgICB0aGlzLnBhZGRpbmcoKSAqIDJcbiAgICAgICAgICAgIDogdGhpcy5hdHRycy5oZWlnaHQ7XG4gICAgfVxuICAgIGdldFRleHRXaWR0aCgpIHtcbiAgICAgICAgcmV0dXJuIHRoaXMudGV4dFdpZHRoO1xuICAgIH1cbiAgICBnZXRUZXh0SGVpZ2h0KCkge1xuICAgICAgICBVdGlsLndhcm4oJ3RleHQuZ2V0VGV4dEhlaWdodCgpIG1ldGhvZCBpcyBkZXByZWNhdGVkLiBVc2UgdGV4dC5oZWlnaHQoKSAtIGZvciBmdWxsIGhlaWdodCBhbmQgdGV4dC5mb250U2l6ZSgpIC0gZm9yIG9uZSBsaW5lIGhlaWdodC4nKTtcbiAgICAgICAgcmV0dXJuIHRoaXMudGV4dEhlaWdodDtcbiAgICB9XG4gICAgbWVhc3VyZVNpemUodGV4dCkge1xuICAgICAgICB2YXIgX2NvbnRleHQgPSBnZXREdW1teUNvbnRleHQoKSwgZm9udFNpemUgPSB0aGlzLmZvbnRTaXplKCksIG1ldHJpY3M7XG4gICAgICAgIF9jb250ZXh0LnNhdmUoKTtcbiAgICAgICAgX2NvbnRleHQuZm9udCA9IHRoaXMuX2dldENvbnRleHRGb250KCk7XG4gICAgICAgIG1ldHJpY3MgPSBfY29udGV4dC5tZWFzdXJlVGV4dCh0ZXh0KTtcbiAgICAgICAgX2NvbnRleHQucmVzdG9yZSgpO1xuICAgICAgICByZXR1cm4ge1xuICAgICAgICAgICAgd2lkdGg6IG1ldHJpY3Mud2lkdGgsXG4gICAgICAgICAgICBoZWlnaHQ6IGZvbnRTaXplLFxuICAgICAgICB9O1xuICAgIH1cbiAgICBfZ2V0Q29udGV4dEZvbnQoKSB7XG4gICAgICAgIHJldHVybiAodGhpcy5mb250U3R5bGUoKSArXG4gICAgICAgICAgICBTUEFDRSArXG4gICAgICAgICAgICB0aGlzLmZvbnRWYXJpYW50KCkgK1xuICAgICAgICAgICAgU1BBQ0UgK1xuICAgICAgICAgICAgKHRoaXMuZm9udFNpemUoKSArIFBYX1NQQUNFKSArXG4gICAgICAgICAgICBub3JtYWxpemVGb250RmFtaWx5KHRoaXMuZm9udEZhbWlseSgpKSk7XG4gICAgfVxuICAgIF9hZGRUZXh0TGluZShsaW5lKSB7XG4gICAgICAgIGlmICh0aGlzLmFsaWduKCkgPT09IEpVU1RJRlkpIHtcbiAgICAgICAgICAgIGxpbmUgPSBsaW5lLnRyaW0oKTtcbiAgICAgICAgfVxuICAgICAgICB2YXIgd2lkdGggPSB0aGlzLl9nZXRUZXh0V2lkdGgobGluZSk7XG4gICAgICAgIHJldHVybiB0aGlzLnRleHRBcnIucHVzaCh7XG4gICAgICAgICAgICB0ZXh0OiBsaW5lLFxuICAgICAgICAgICAgd2lkdGg6IHdpZHRoLFxuICAgICAgICAgICAgbGFzdEluUGFyYWdyYXBoOiBmYWxzZSxcbiAgICAgICAgfSk7XG4gICAgfVxuICAgIF9nZXRUZXh0V2lkdGgodGV4dCkge1xuICAgICAgICB2YXIgbGV0dGVyU3BhY2luZyA9IHRoaXMubGV0dGVyU3BhY2luZygpO1xuICAgICAgICB2YXIgbGVuZ3RoID0gdGV4dC5sZW5ndGg7XG4gICAgICAgIHJldHVybiAoZ2V0RHVtbXlDb250ZXh0KCkubWVhc3VyZVRleHQodGV4dCkud2lkdGggK1xuICAgICAgICAgICAgKGxlbmd0aCA/IGxldHRlclNwYWNpbmcgKiAobGVuZ3RoIC0gMSkgOiAwKSk7XG4gICAgfVxuICAgIF9zZXRUZXh0RGF0YSgpIHtcbiAgICAgICAgdmFyIGxpbmVzID0gdGhpcy50ZXh0KCkuc3BsaXQoJ1xcbicpLCBmb250U2l6ZSA9ICt0aGlzLmZvbnRTaXplKCksIHRleHRXaWR0aCA9IDAsIGxpbmVIZWlnaHRQeCA9IHRoaXMubGluZUhlaWdodCgpICogZm9udFNpemUsIHdpZHRoID0gdGhpcy5hdHRycy53aWR0aCwgaGVpZ2h0ID0gdGhpcy5hdHRycy5oZWlnaHQsIGZpeGVkV2lkdGggPSB3aWR0aCAhPT0gQVVUTyAmJiB3aWR0aCAhPT0gdW5kZWZpbmVkLCBmaXhlZEhlaWdodCA9IGhlaWdodCAhPT0gQVVUTyAmJiBoZWlnaHQgIT09IHVuZGVmaW5lZCwgcGFkZGluZyA9IHRoaXMucGFkZGluZygpLCBtYXhXaWR0aCA9IHdpZHRoIC0gcGFkZGluZyAqIDIsIG1heEhlaWdodFB4ID0gaGVpZ2h0IC0gcGFkZGluZyAqIDIsIGN1cnJlbnRIZWlnaHRQeCA9IDAsIHdyYXAgPSB0aGlzLndyYXAoKSwgc2hvdWxkV3JhcCA9IHdyYXAgIT09IE5PTkUsIHdyYXBBdFdvcmQgPSB3cmFwICE9PSBDSEFSICYmIHNob3VsZFdyYXAsIHNob3VsZEFkZEVsbGlwc2lzID0gdGhpcy5lbGxpcHNpcygpO1xuICAgICAgICB0aGlzLnRleHRBcnIgPSBbXTtcbiAgICAgICAgZ2V0RHVtbXlDb250ZXh0KCkuZm9udCA9IHRoaXMuX2dldENvbnRleHRGb250KCk7XG4gICAgICAgIHZhciBhZGRpdGlvbmFsV2lkdGggPSBzaG91bGRBZGRFbGxpcHNpcyA/IHRoaXMuX2dldFRleHRXaWR0aChFTExJUFNJUykgOiAwO1xuICAgICAgICBmb3IgKHZhciBpID0gMCwgbWF4ID0gbGluZXMubGVuZ3RoOyBpIDwgbWF4OyArK2kpIHtcbiAgICAgICAgICAgIHZhciBsaW5lID0gbGluZXNbaV07XG4gICAgICAgICAgICB2YXIgbGluZVdpZHRoID0gdGhpcy5fZ2V0VGV4dFdpZHRoKGxpbmUpO1xuICAgICAgICAgICAgaWYgKGZpeGVkV2lkdGggJiYgbGluZVdpZHRoID4gbWF4V2lkdGgpIHtcbiAgICAgICAgICAgICAgICB3aGlsZSAobGluZS5sZW5ndGggPiAwKSB7XG4gICAgICAgICAgICAgICAgICAgIHZhciBsb3cgPSAwLCBoaWdoID0gbGluZS5sZW5ndGgsIG1hdGNoID0gJycsIG1hdGNoV2lkdGggPSAwO1xuICAgICAgICAgICAgICAgICAgICB3aGlsZSAobG93IDwgaGlnaCkge1xuICAgICAgICAgICAgICAgICAgICAgICAgdmFyIG1pZCA9IChsb3cgKyBoaWdoKSA+Pj4gMSwgc3Vic3RyID0gbGluZS5zbGljZSgwLCBtaWQgKyAxKSwgc3Vic3RyV2lkdGggPSB0aGlzLl9nZXRUZXh0V2lkdGgoc3Vic3RyKSArIGFkZGl0aW9uYWxXaWR0aDtcbiAgICAgICAgICAgICAgICAgICAgICAgIGlmIChzdWJzdHJXaWR0aCA8PSBtYXhXaWR0aCkge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGxvdyA9IG1pZCArIDE7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgbWF0Y2ggPSBzdWJzdHI7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgbWF0Y2hXaWR0aCA9IHN1YnN0cldpZHRoO1xuICAgICAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICAgICAgZWxzZSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgaGlnaCA9IG1pZDtcbiAgICAgICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICBpZiAobWF0Y2gpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIGlmICh3cmFwQXRXb3JkKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgdmFyIHdyYXBJbmRleDtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB2YXIgbmV4dENoYXIgPSBsaW5lW21hdGNoLmxlbmd0aF07XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgdmFyIG5leHRJc1NwYWNlT3JEYXNoID0gbmV4dENoYXIgPT09IFNQQUNFIHx8IG5leHRDaGFyID09PSBEQVNIO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGlmIChuZXh0SXNTcGFjZU9yRGFzaCAmJiBtYXRjaFdpZHRoIDw9IG1heFdpZHRoKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHdyYXBJbmRleCA9IG1hdGNoLmxlbmd0aDtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgZWxzZSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHdyYXBJbmRleCA9XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBNYXRoLm1heChtYXRjaC5sYXN0SW5kZXhPZihTUEFDRSksIG1hdGNoLmxhc3RJbmRleE9mKERBU0gpKSArXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgMTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgaWYgKHdyYXBJbmRleCA+IDApIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgbG93ID0gd3JhcEluZGV4O1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBtYXRjaCA9IG1hdGNoLnNsaWNlKDAsIGxvdyk7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIG1hdGNoV2lkdGggPSB0aGlzLl9nZXRUZXh0V2lkdGgobWF0Y2gpO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgICAgIG1hdGNoID0gbWF0Y2gudHJpbVJpZ2h0KCk7XG4gICAgICAgICAgICAgICAgICAgICAgICB0aGlzLl9hZGRUZXh0TGluZShtYXRjaCk7XG4gICAgICAgICAgICAgICAgICAgICAgICB0ZXh0V2lkdGggPSBNYXRoLm1heCh0ZXh0V2lkdGgsIG1hdGNoV2lkdGgpO1xuICAgICAgICAgICAgICAgICAgICAgICAgY3VycmVudEhlaWdodFB4ICs9IGxpbmVIZWlnaHRQeDtcbiAgICAgICAgICAgICAgICAgICAgICAgIHZhciBzaG91bGRIYW5kbGVFbGxpcHNpcyA9IHRoaXMuX3Nob3VsZEhhbmRsZUVsbGlwc2lzKGN1cnJlbnRIZWlnaHRQeCk7XG4gICAgICAgICAgICAgICAgICAgICAgICBpZiAoc2hvdWxkSGFuZGxlRWxsaXBzaXMpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB0aGlzLl90cnlUb0FkZEVsbGlwc2lzVG9MYXN0TGluZSgpO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICAgICAgbGluZSA9IGxpbmUuc2xpY2UobG93KTtcbiAgICAgICAgICAgICAgICAgICAgICAgIGxpbmUgPSBsaW5lLnRyaW1MZWZ0KCk7XG4gICAgICAgICAgICAgICAgICAgICAgICBpZiAobGluZS5sZW5ndGggPiAwKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgbGluZVdpZHRoID0gdGhpcy5fZ2V0VGV4dFdpZHRoKGxpbmUpO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGlmIChsaW5lV2lkdGggPD0gbWF4V2lkdGgpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5fYWRkVGV4dExpbmUobGluZSk7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGN1cnJlbnRIZWlnaHRQeCArPSBsaW5lSGVpZ2h0UHg7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHRleHRXaWR0aCA9IE1hdGgubWF4KHRleHRXaWR0aCwgbGluZVdpZHRoKTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgIGVsc2Uge1xuICAgICAgICAgICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBlbHNlIHtcbiAgICAgICAgICAgICAgICB0aGlzLl9hZGRUZXh0TGluZShsaW5lKTtcbiAgICAgICAgICAgICAgICBjdXJyZW50SGVpZ2h0UHggKz0gbGluZUhlaWdodFB4O1xuICAgICAgICAgICAgICAgIHRleHRXaWR0aCA9IE1hdGgubWF4KHRleHRXaWR0aCwgbGluZVdpZHRoKTtcbiAgICAgICAgICAgICAgICBpZiAodGhpcy5fc2hvdWxkSGFuZGxlRWxsaXBzaXMoY3VycmVudEhlaWdodFB4KSAmJiBpIDwgbWF4IC0gMSkge1xuICAgICAgICAgICAgICAgICAgICB0aGlzLl90cnlUb0FkZEVsbGlwc2lzVG9MYXN0TGluZSgpO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGlmIChmaXhlZEhlaWdodCAmJiBjdXJyZW50SGVpZ2h0UHggKyBsaW5lSGVpZ2h0UHggPiBtYXhIZWlnaHRQeCkge1xuICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgaWYgKHRoaXMudGV4dEFyclt0aGlzLnRleHRBcnIubGVuZ3RoIC0gMV0pIHtcbiAgICAgICAgICAgICAgICB0aGlzLnRleHRBcnJbdGhpcy50ZXh0QXJyLmxlbmd0aCAtIDFdLmxhc3RJblBhcmFncmFwaCA9IHRydWU7XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgICAgdGhpcy50ZXh0SGVpZ2h0ID0gZm9udFNpemU7XG4gICAgICAgIHRoaXMudGV4dFdpZHRoID0gdGV4dFdpZHRoO1xuICAgIH1cbiAgICBfc2hvdWxkSGFuZGxlRWxsaXBzaXMoY3VycmVudEhlaWdodFB4KSB7XG4gICAgICAgIHZhciBmb250U2l6ZSA9ICt0aGlzLmZvbnRTaXplKCksIGxpbmVIZWlnaHRQeCA9IHRoaXMubGluZUhlaWdodCgpICogZm9udFNpemUsIGhlaWdodCA9IHRoaXMuYXR0cnMuaGVpZ2h0LCBmaXhlZEhlaWdodCA9IGhlaWdodCAhPT0gQVVUTyAmJiBoZWlnaHQgIT09IHVuZGVmaW5lZCwgcGFkZGluZyA9IHRoaXMucGFkZGluZygpLCBtYXhIZWlnaHRQeCA9IGhlaWdodCAtIHBhZGRpbmcgKiAyLCB3cmFwID0gdGhpcy53cmFwKCksIHNob3VsZFdyYXAgPSB3cmFwICE9PSBOT05FO1xuICAgICAgICByZXR1cm4gKCFzaG91bGRXcmFwIHx8XG4gICAgICAgICAgICAoZml4ZWRIZWlnaHQgJiYgY3VycmVudEhlaWdodFB4ICsgbGluZUhlaWdodFB4ID4gbWF4SGVpZ2h0UHgpKTtcbiAgICB9XG4gICAgX3RyeVRvQWRkRWxsaXBzaXNUb0xhc3RMaW5lKCkge1xuICAgICAgICB2YXIgd2lkdGggPSB0aGlzLmF0dHJzLndpZHRoLCBmaXhlZFdpZHRoID0gd2lkdGggIT09IEFVVE8gJiYgd2lkdGggIT09IHVuZGVmaW5lZCwgcGFkZGluZyA9IHRoaXMucGFkZGluZygpLCBtYXhXaWR0aCA9IHdpZHRoIC0gcGFkZGluZyAqIDIsIHNob3VsZEFkZEVsbGlwc2lzID0gdGhpcy5lbGxpcHNpcygpO1xuICAgICAgICB2YXIgbGFzdExpbmUgPSB0aGlzLnRleHRBcnJbdGhpcy50ZXh0QXJyLmxlbmd0aCAtIDFdO1xuICAgICAgICBpZiAoIWxhc3RMaW5lIHx8ICFzaG91bGRBZGRFbGxpcHNpcykge1xuICAgICAgICAgICAgcmV0dXJuO1xuICAgICAgICB9XG4gICAgICAgIGlmIChmaXhlZFdpZHRoKSB7XG4gICAgICAgICAgICB2YXIgaGF2ZVNwYWNlID0gdGhpcy5fZ2V0VGV4dFdpZHRoKGxhc3RMaW5lLnRleHQgKyBFTExJUFNJUykgPCBtYXhXaWR0aDtcbiAgICAgICAgICAgIGlmICghaGF2ZVNwYWNlKSB7XG4gICAgICAgICAgICAgICAgbGFzdExpbmUudGV4dCA9IGxhc3RMaW5lLnRleHQuc2xpY2UoMCwgbGFzdExpbmUudGV4dC5sZW5ndGggLSAzKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgICB0aGlzLnRleHRBcnIuc3BsaWNlKHRoaXMudGV4dEFyci5sZW5ndGggLSAxLCAxKTtcbiAgICAgICAgdGhpcy5fYWRkVGV4dExpbmUobGFzdExpbmUudGV4dCArIEVMTElQU0lTKTtcbiAgICB9XG4gICAgZ2V0U3Ryb2tlU2NhbGVFbmFibGVkKCkge1xuICAgICAgICByZXR1cm4gdHJ1ZTtcbiAgICB9XG59XG5UZXh0LnByb3RvdHlwZS5fZmlsbEZ1bmMgPSBfZmlsbEZ1bmM7XG5UZXh0LnByb3RvdHlwZS5fc3Ryb2tlRnVuYyA9IF9zdHJva2VGdW5jO1xuVGV4dC5wcm90b3R5cGUuY2xhc3NOYW1lID0gVEVYVF9VUFBFUjtcblRleHQucHJvdG90eXBlLl9hdHRyc0FmZmVjdGluZ1NpemUgPSBbXG4gICAgJ3RleHQnLFxuICAgICdmb250U2l6ZScsXG4gICAgJ3BhZGRpbmcnLFxuICAgICd3cmFwJyxcbiAgICAnbGluZUhlaWdodCcsXG4gICAgJ2xldHRlclNwYWNpbmcnLFxuXTtcbl9yZWdpc3Rlck5vZGUoVGV4dCk7XG5GYWN0b3J5Lm92ZXJXcml0ZVNldHRlcihUZXh0LCAnd2lkdGgnLCBnZXROdW1iZXJPckF1dG9WYWxpZGF0b3IoKSk7XG5GYWN0b3J5Lm92ZXJXcml0ZVNldHRlcihUZXh0LCAnaGVpZ2h0JywgZ2V0TnVtYmVyT3JBdXRvVmFsaWRhdG9yKCkpO1xuRmFjdG9yeS5hZGRHZXR0ZXJTZXR0ZXIoVGV4dCwgJ2ZvbnRGYW1pbHknLCAnQXJpYWwnKTtcbkZhY3RvcnkuYWRkR2V0dGVyU2V0dGVyKFRleHQsICdmb250U2l6ZScsIDEyLCBnZXROdW1iZXJWYWxpZGF0b3IoKSk7XG5GYWN0b3J5LmFkZEdldHRlclNldHRlcihUZXh0LCAnZm9udFN0eWxlJywgTk9STUFMKTtcbkZhY3RvcnkuYWRkR2V0dGVyU2V0dGVyKFRleHQsICdmb250VmFyaWFudCcsIE5PUk1BTCk7XG5GYWN0b3J5LmFkZEdldHRlclNldHRlcihUZXh0LCAncGFkZGluZycsIDAsIGdldE51bWJlclZhbGlkYXRvcigpKTtcbkZhY3RvcnkuYWRkR2V0dGVyU2V0dGVyKFRleHQsICdhbGlnbicsIExFRlQpO1xuRmFjdG9yeS5hZGRHZXR0ZXJTZXR0ZXIoVGV4dCwgJ3ZlcnRpY2FsQWxpZ24nLCBUT1ApO1xuRmFjdG9yeS5hZGRHZXR0ZXJTZXR0ZXIoVGV4dCwgJ2xpbmVIZWlnaHQnLCAxLCBnZXROdW1iZXJWYWxpZGF0b3IoKSk7XG5GYWN0b3J5LmFkZEdldHRlclNldHRlcihUZXh0LCAnd3JhcCcsIFdPUkQpO1xuRmFjdG9yeS5hZGRHZXR0ZXJTZXR0ZXIoVGV4dCwgJ2VsbGlwc2lzJywgZmFsc2UsIGdldEJvb2xlYW5WYWxpZGF0b3IoKSk7XG5GYWN0b3J5LmFkZEdldHRlclNldHRlcihUZXh0LCAnbGV0dGVyU3BhY2luZycsIDAsIGdldE51bWJlclZhbGlkYXRvcigpKTtcbkZhY3RvcnkuYWRkR2V0dGVyU2V0dGVyKFRleHQsICd0ZXh0JywgJycsIGdldFN0cmluZ1ZhbGlkYXRvcigpKTtcbkZhY3RvcnkuYWRkR2V0dGVyU2V0dGVyKFRleHQsICd0ZXh0RGVjb3JhdGlvbicsICcnKTtcbiIsIi8vIFRoZSBtb2R1bGUgY2FjaGVcbnZhciBfX3dlYnBhY2tfbW9kdWxlX2NhY2hlX18gPSB7fTtcblxuLy8gVGhlIHJlcXVpcmUgZnVuY3Rpb25cbmZ1bmN0aW9uIF9fd2VicGFja19yZXF1aXJlX18obW9kdWxlSWQpIHtcblx0Ly8gQ2hlY2sgaWYgbW9kdWxlIGlzIGluIGNhY2hlXG5cdHZhciBjYWNoZWRNb2R1bGUgPSBfX3dlYnBhY2tfbW9kdWxlX2NhY2hlX19bbW9kdWxlSWRdO1xuXHRpZiAoY2FjaGVkTW9kdWxlICE9PSB1bmRlZmluZWQpIHtcblx0XHRyZXR1cm4gY2FjaGVkTW9kdWxlLmV4cG9ydHM7XG5cdH1cblx0Ly8gQ3JlYXRlIGEgbmV3IG1vZHVsZSAoYW5kIHB1dCBpdCBpbnRvIHRoZSBjYWNoZSlcblx0dmFyIG1vZHVsZSA9IF9fd2VicGFja19tb2R1bGVfY2FjaGVfX1ttb2R1bGVJZF0gPSB7XG5cdFx0Ly8gbm8gbW9kdWxlLmlkIG5lZWRlZFxuXHRcdC8vIG5vIG1vZHVsZS5sb2FkZWQgbmVlZGVkXG5cdFx0ZXhwb3J0czoge31cblx0fTtcblxuXHQvLyBFeGVjdXRlIHRoZSBtb2R1bGUgZnVuY3Rpb25cblx0X193ZWJwYWNrX21vZHVsZXNfX1ttb2R1bGVJZF0obW9kdWxlLCBtb2R1bGUuZXhwb3J0cywgX193ZWJwYWNrX3JlcXVpcmVfXyk7XG5cblx0Ly8gUmV0dXJuIHRoZSBleHBvcnRzIG9mIHRoZSBtb2R1bGVcblx0cmV0dXJuIG1vZHVsZS5leHBvcnRzO1xufVxuXG4iLCIvLyBkZWZpbmUgZ2V0dGVyIGZ1bmN0aW9ucyBmb3IgaGFybW9ueSBleHBvcnRzXG5fX3dlYnBhY2tfcmVxdWlyZV9fLmQgPSAoZXhwb3J0cywgZGVmaW5pdGlvbikgPT4ge1xuXHRmb3IodmFyIGtleSBpbiBkZWZpbml0aW9uKSB7XG5cdFx0aWYoX193ZWJwYWNrX3JlcXVpcmVfXy5vKGRlZmluaXRpb24sIGtleSkgJiYgIV9fd2VicGFja19yZXF1aXJlX18ubyhleHBvcnRzLCBrZXkpKSB7XG5cdFx0XHRPYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywga2V5LCB7IGVudW1lcmFibGU6IHRydWUsIGdldDogZGVmaW5pdGlvbltrZXldIH0pO1xuXHRcdH1cblx0fVxufTsiLCJfX3dlYnBhY2tfcmVxdWlyZV9fLm8gPSAob2JqLCBwcm9wKSA9PiAoT2JqZWN0LnByb3RvdHlwZS5oYXNPd25Qcm9wZXJ0eS5jYWxsKG9iaiwgcHJvcCkpIiwiLy8gZGVmaW5lIF9fZXNNb2R1bGUgb24gZXhwb3J0c1xuX193ZWJwYWNrX3JlcXVpcmVfXy5yID0gKGV4cG9ydHMpID0+IHtcblx0aWYodHlwZW9mIFN5bWJvbCAhPT0gJ3VuZGVmaW5lZCcgJiYgU3ltYm9sLnRvU3RyaW5nVGFnKSB7XG5cdFx0T2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIFN5bWJvbC50b1N0cmluZ1RhZywgeyB2YWx1ZTogJ01vZHVsZScgfSk7XG5cdH1cblx0T2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsICdfX2VzTW9kdWxlJywgeyB2YWx1ZTogdHJ1ZSB9KTtcbn07IiwiaW1wb3J0ICcuLi8uLi9leGFtcGxlcy9tYWluLmNzcyc7XG5cbmNvbnN0IGNmZ0ZpbGUgPSBcImV4dHJlc19jZmcuanNvblwiO1xuY29uc3QgZXJyTXNnID0gYEV4dFJlczogRXJyb3IgcmVhZGluZyAnJHtjZmdGaWxlfSchYDtcblxuZnVuY3Rpb24gbG9hZEpTT04gKCkge1xuXHRjb25zdCB4aHIgPSBuZXcgWE1MSHR0cFJlcXVlc3QoKTtcblx0eGhyLm9wZW4oIFwiR0VUXCIsIGNmZ0ZpbGUsIHRydWUgKTtcblx0eGhyLm9ubG9hZCA9ICgpID0+IHtcblx0XHRpZiAoIHhoci5yZWFkeVN0YXRlID09PSA0ICkge1xuXHRcdFx0aWYgKCB4aHIuc3RhdHVzID09PSAyMDAgKSB7XG5cdFx0XHRcdGluaXRKU09OKCB4aHIucmVzcG9uc2VUZXh0ICk7XG5cdFx0XHR9IGVsc2Uge1xuXHRcdFx0XHRjb25zb2xlLmVycm9yKCBlcnJNc2cgKTtcblx0XHRcdH1cblx0XHR9XG5cdH07XG5cdHhoci5vbmVycm9yID0gKCkgPT4gY29uc29sZS5lcnJvciggZXJyTXNnICk7XG5cdHhoci5zZW5kKG51bGwpO1xufVxuXG5cbmltcG9ydCB7IGJhc2VJbml0cyB9IGZyb20gJy4uLy4uL2xpYnMvYmFzZUluaXRzJztcbmltcG9ydCB7IGNsZWFyQ2ZnSnNvbiwgYWRkU3RhdHVzVmFyRGVmIH0gZnJvbSAnLi4vY29tbW9uJztcblxuLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vL1xuLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vL1xuLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy9cbi8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vXG4vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy9cbi8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy9cbi8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vXG4vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vL1xuLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy9cbmltcG9ydCB7IGZyZWVQYWludEZyb21TY2hlbWEgfSBmcm9tICcuL2ZyZWVQYWludCc7XG4vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vL1xuLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy9cbi8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy9cbi8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vL1xuLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vXG4vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vXG4vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy9cbi8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy9cbi8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vXG4vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vL1xuLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vL1xuLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vXG4vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vXG4vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy9cbi8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vXG4vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vL1xuLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy9cbi8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vXG4vLy8vLy8vLy8vXG5cbmZ1bmN0aW9uIGluaXRKU09OICgganNvbiApIHtcblxuXHRpZiAoIHR5cGVvZiBqc29uID09PSAnc3RyaW5nJyApIHtcblx0XHR0cnkge1xuXHRcdFx0anNvbiA9IEpTT04ucGFyc2UoIGpzb24sIHRydWUgKTtcblx0XHR9IGNhdGNoIChlKSB7XG5cdFx0XHRjb25zb2xlLmVycm9yKCBgRm9ybWF0LUVycm9yIGluIEpTT04gZmlsZSAnJHtjZmdGaWxlfSdgICk7XG5cdFx0XHRyZXR1cm47XG5cdFx0fVxuXHR9XG5cblx0Y29uc3QgY2ZnID0gY2xlYXJDZmdKc29uKCBqc29uICk7XG4vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vL1xuLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vXG4vLy8vLy8vLy9cblx0Y29uc3QgYmFzZSA9IG5ldyBiYXNlSW5pdHMoIHsgY29udGFpbmVyOiAnY29udGFpbmVyJyB9ICk7XG4vLy8vLy8vLy8vXG5cdGlmICggY2ZnLmRhdGFTZXR0aW5ncyApIHtcblx0XHRiYXNlLmRhdGFTZXR0aW5ncyA9IGNmZy5kYXRhU2V0dGluZ3M7XG5cdH1cblxuLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vL1xuLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy9cbi8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vXG4vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vXG4vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy9cbi8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vXG4vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vL1xuLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vL1xuLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy9cblx0Y29uc3QgaW8gPSBuZXcgZnJlZVBhaW50RnJvbVNjaGVtYSggYmFzZSwgY2ZnICk7XG4vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vL1xuLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vL1xuLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vL1xuLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vXG4vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy9cbi8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vXG4vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy9cbi8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vXG4vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vL1xuLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vL1xuLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vL1xuLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vXG4vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vXG4vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy9cbi8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vXG4vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy9cbi8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vXG4vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy9cbi8vLy8vLy8vLy9cblxuXHRhZGRTdGF0dXNWYXJEZWYoIGlvLCBqc29uICk7XG5cblx0d2luZG93LmdldFN0YXRlID0gaW8uZ2V0U3RhdGUuYmluZChpbyk7XG5cdHdpbmRvdy5zZXRTdGF0ZSA9IGlvLnNldFN0YXRlLmJpbmQoaW8pO1xufVxuXG5kb2N1bWVudC5hZGRFdmVudExpc3RlbmVyKCBcIkRPTUNvbnRlbnRMb2FkZWRcIiwgbG9hZEpTT04gKTtcbiJdLCJuYW1lcyI6W10sInNvdXJjZVJvb3QiOiIifQ==