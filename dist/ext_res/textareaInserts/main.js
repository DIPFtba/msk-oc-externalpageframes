/******/ (() => { // webpackBootstrap
/******/ 	"use strict";
/******/ 	var __webpack_modules__ = ({

/***/ "./textareaInserts.js":
/*!****************************!*\
  !*** ./textareaInserts.js ***!
  \****************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "textareaInsertsFromSchema": () => (/* binding */ textareaInsertsFromSchema)
/* harmony export */ });
/* harmony import */ var _examples_textareaInserts_2cols_css__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../../examples/textareaInserts_2cols.css */ "../../examples/textareaInserts_2cols.css");
/* harmony import */ var _libs_textareaInserts__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../../libs/textareaInserts */ "../../libs/textareaInserts.js");
////////////////
/////////////////////////////////////////////////////////////////////////////////
/////////

//////////


const toolbars = {
  comp: _libs_textareaInserts__WEBPACK_IMPORTED_MODULE_1__.toolbarComparison,
  math: _libs_textareaInserts__WEBPACK_IMPORTED_MODULE_1__.toolbarMathOperators,
  fract: _libs_textareaInserts__WEBPACK_IMPORTED_MODULE_1__.toolbarFraction,
  perc: _libs_textareaInserts__WEBPACK_IMPORTED_MODULE_1__.toolbarPercent,
  euro: _libs_textareaInserts__WEBPACK_IMPORTED_MODULE_1__.toolbarEuro
};
class textareaInsertsFromSchema extends _libs_textareaInserts__WEBPACK_IMPORTED_MODULE_1__.textareaInserts {
  constructor(divSelector) {
    let opts = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};
    let base = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : null;
    if (base.fsm && base.fsm.incInitCnt) {
      base.fsm.incInitCnt();
    }
    let width;
    //////////////////
    width = window.innerWidth;
    /////////
    ////////////////////////////////////////////////////////////////////////////////////////////////////
    //////////////////////////
    //////////
    let wWidth = opts.width;
    if (wWidth <= 0) {
      wWidth += width;
    }
    ;

    // height is container height or window.height
    let height;
    //////////////////
    height = window.innerHeight;
    /////////
    ///////////////////////////////////////////////////////
    //////////
    let wHeight = opts.height;
    if (wHeight <= 0) {
      wHeight += height;
    }
    const toolbarCellWidth = opts.toolbarCellWidth;
    const defs = {
      toolbarDirection: 'row',
      divStyles: {
        width: `${wWidth - 2 * toolbarCellWidth - 5}px`,
        height: `${wHeight}px`
      },
      toolbarContainerStyles: {
        // left: `${wWidth-6*toolbarCellWidth-17}px`,
        // top: `${wHeight-toolbarCellWidth-17}px`,
        width: `${2 * toolbarCellWidth}px`,
        height: `${2 * toolbarCellWidth}px`,
        'flex-wrap': 'wrap'
      },
      toolbarCellStyles: {
        width: `${toolbarCellWidth}px`,
        height: `${toolbarCellWidth}px`
      },
      toolbar: []
    };
    if (opts.dataSettings) {
      defs.dataSettings = opts.dataSettings;
    }
    for (const tb in toolbars) {
      if (opts.toolbar[tb]) {
        defs.toolbar = defs.toolbar.concat(toolbars[tb]);
      }
    }
    super(divSelector, defs, base);
    if (base.fsm && base.fsm.decInitCnt) {
      base.fsm.decInitCnt();
    }
  }
  scoreDef() {
    const pref = this.dataSettings.variablePrefix;
    const res = {
      [`V_Input_${pref}`]: this.extract()
    };
    return res;
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
/* harmony export */   "ResolvablePromise": () => (/* binding */ ResolvablePromise),
/* harmony export */   "addScoring": () => (/* binding */ addScoring),
/* harmony export */   "addStatusVarDef": () => (/* binding */ addStatusVarDef),
/* harmony export */   "clearCfgJson": () => (/* binding */ clearCfgJson),
/* harmony export */   "dp2inputRegExp": () => (/* binding */ dp2inputRegExp),
/* harmony export */   "dp2labFncInputRegExp": () => (/* binding */ dp2labFncInputRegExp),
/* harmony export */   "getEPFFolderName": () => (/* binding */ getEPFFolderName),
/* harmony export */   "getI18nDescr": () => (/* binding */ getI18nDescr),
/* harmony export */   "patchCfgI18n": () => (/* binding */ patchCfgI18n),
/* harmony export */   "readRangeArray": () => (/* binding */ readRangeArray),
/* harmony export */   "strToInt": () => (/* binding */ strToInt),
/* harmony export */   "strToNum": () => (/* binding */ strToNum)
/* harmony export */ });
/* harmony import */ var core_js_modules_es_regexp_exec_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! core-js/modules/es.regexp.exec.js */ "../../node_modules/core-js/modules/es.regexp.exec.js");
/* harmony import */ var core_js_modules_es_regexp_exec_js__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(core_js_modules_es_regexp_exec_js__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var core_js_modules_es_regexp_constructor_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! core-js/modules/es.regexp.constructor.js */ "../../node_modules/core-js/modules/es.regexp.constructor.js");
/* harmony import */ var core_js_modules_es_regexp_constructor_js__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(core_js_modules_es_regexp_constructor_js__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var core_js_modules_esnext_string_match_all_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! core-js/modules/esnext.string.match-all.js */ "../../node_modules/core-js/modules/esnext.string.match-all.js");
/* harmony import */ var core_js_modules_esnext_string_match_all_js__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(core_js_modules_esnext_string_match_all_js__WEBPACK_IMPORTED_MODULE_2__);
/* harmony import */ var core_js_modules_es_string_replace_js__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! core-js/modules/es.string.replace.js */ "../../node_modules/core-js/modules/es.string.replace.js");
/* harmony import */ var core_js_modules_es_string_replace_js__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(core_js_modules_es_string_replace_js__WEBPACK_IMPORTED_MODULE_3__);
/* harmony import */ var core_js_modules_es_array_includes_js__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! core-js/modules/es.array.includes.js */ "../../node_modules/core-js/modules/es.array.includes.js");
/* harmony import */ var core_js_modules_es_array_includes_js__WEBPACK_IMPORTED_MODULE_4___default = /*#__PURE__*/__webpack_require__.n(core_js_modules_es_array_includes_js__WEBPACK_IMPORTED_MODULE_4__);
/* harmony import */ var core_js_modules_esnext_string_replace_all_js__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! core-js/modules/esnext.string.replace-all.js */ "../../node_modules/core-js/modules/esnext.string.replace-all.js");
/* harmony import */ var core_js_modules_esnext_string_replace_all_js__WEBPACK_IMPORTED_MODULE_5___default = /*#__PURE__*/__webpack_require__.n(core_js_modules_esnext_string_replace_all_js__WEBPACK_IMPORTED_MODULE_5__);
/* harmony import */ var _libs_common__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ../libs/common */ "../../libs/common.js");






function clearCfgJson(json) {
  if (typeof json !== 'object') {
    return json;
  }
  if (Array.isArray(json)) {
    return json.map(a => clearCfgJson(a));
  }
  const res = {};
  Object.entries(json).forEach(_ref => {
    let [k, v] = _ref;
    if (k.substring(0, 3) === '___') {
      // // Keys der Elemente eines Arrays nehmen
      // const arelkeys = k.match( /^___arelkeys_(.*)/ );
      // if ( arelkeys ) {
      // 	json[ arelkeys[1] ] = v.map( e => Object.keys(e) );
      // } else {

      // Vals der Elemente eines Arrays nehmen
      const arelvals = k.match(/^___arelvals_(.*)/);
      if (arelvals) {
        res[arelvals[1]] = v.map(e => Object.values(e).map(a => clearCfgJson(a)));
      } else {
        // Alternative Namen einfach so speichern
        const alts = k.match(/^___alt[^_]*_(.*)/);
        if (alts) {
          if (v !== undefined) {
            res[alts[1]] = clearCfgJson(v);
          }
        } else {
          // ___ Object in json integrieren
          if (typeof v === 'object') {
            Object.assign(res, clearCfgJson(v));
          }
        }
      }
      // }
    } else {
      if (v !== undefined) {
        const subobj = k.match(/^(.*?)___(.*)/);
        if (subobj) {
          // { abc___def: 123 } => { abc: { def: 123 } }
          const newObj = clearCfgJson({
            [subobj[2]]: v
          });
          if (!(subobj[1] in res)) {
            res[subobj[1]] = {};
          }
          Object.assign(res[subobj[1]], newObj);
        } else {
          // copy value
          res[k] = clearCfgJson(v);
        }
      }
    }
  });
  return res;
}

//////////////////////////////////////////////////////////////////////////////


function debugAndConsoleOut(s) {
  if (typeof debugOut !== 'undefined') {
    debugOut(`<span class="error">${s}</span>`);
  }
  console.error(s);
}
function addScoring(obj, opts) {
  let Parser = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : null;
  let addFncs = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : {};
  obj.computeScoringVals = () => {};
  if (!Parser) {
    return;
  }

  // create Parser, add addFncs
  const parser = new Parser();
  Object.assign(addFncs, {
    isNull: v => v === null,
    isNumUnit: _libs_common__WEBPACK_IMPORTED_MODULE_6__.isNumUnit,
    isBetween: _libs_common__WEBPACK_IMPORTED_MODULE_6__.isBetween,
    match: function (a, r) {
      let fl = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : '';
      return a.toString().match(new RegExp(r, fl));
    },
    // regexp: (a,b) => a.match(b),
    strEqual: (a, b) => a.toLowerCase == b.toLowerCase
  });
  for (const fnc in addFncs) {
    parser.functions[fnc] = addFncs[fnc];
  }
  if (opts.dataSettings && opts.dataSettings.scoringVals && obj.scoreDef) {
    const scoringVals = opts.dataSettings.scoringVals;
    const scores = obj.scoreDef();
    if (typeof scores === 'object') {
      const varNames = Object.keys(scores);
      if (varNames.length > 0) {
        scoringVals.forEach(sv => {
          let cond = sv.condition;
          if (cond) {
            let saveCond = cond;
            const allVarsInCond = cond.matchAll(/\$\{([^}]*)}/g);
            for (const vn of allVarsInCond) {
              if (vn[1].length == 0) {
                debugAndConsoleOut(`Variablen-Name '\${}' in Scoring nicht zulässig`);
              } else {
                const varsearch = opts.dataSettings.variablePrefix ? vn[1].replace(/<pref>/i, opts.dataSettings.variablePrefix) : vn[1];
                const re = new RegExp(`${varsearch}$`, 'i');
                const selVarNames = varNames.filter(v => v.match(re));
                if (selVarNames.length > 1) {
                  debugAndConsoleOut(`Variablen-Name '\${${vn[1]}}' in Scoring ist nicht eindeutig`);
                  saveCond = '';
                } else if (selVarNames.length == 0) {
                  debugAndConsoleOut(`Variablen-Name '\${${vn[1]}}' in Scoring unbekannt`);
                  saveCond = '';
                } else {
                  saveCond = saveCond.replace(vn[0], selVarNames[0]);
                }
              }
            }
            if (saveCond) {
              // check errors

              // [
              // 	[ /(?<![=!><])=(?![=!])/g, `Wertzuweisung (=) statt Vergleichsoperator (==) in "${cond}" gefunden! Ist das beabsichtigt?` ],
              // 	[ /<>/g, `Zeichenkette (<>) stat (!=) in "${cond}" gefunden! Ist das beabsichtigt?` ],
              // 	[ /||/g, `Doppeltes "||" statt "or" in "${cond}" gefunden! Ist das beabsichtigt?` ],
              // 	[ /&&/g, `Doppeltes "&&" statt "and" in "${cond}" gefunden! Ist das beabsichtigt?` ],
              // 	// [ /(?<!\|)(\|)(?!\|)/g, `Einzelnes | statt || in "${cond}" gefunden! Ist das beabsichtigt?` ],
              // 	// [ /(?<!&)&(?!\&)/g, `Einzelnes & statt && in "${cond}" gefunden! Ist das beabsichtigt?` ],
              // ].forEach( ([re,msg]) => {
              // 	if ( saveCond.match(re) ) {
              // 		debugAndConsoleOut(msg);
              // 	}
              // });
              // HotFix for IB ImportExternalVariables: internal browser does not support RegExp look-behind/-forward
              if (Array.from(saveCond.matchAll(/[!<>]?=+/g)).some(m => m[0] == '=')) {
                debugAndConsoleOut(`Wertzuweisung (=) statt Vergleichsoperator (==) in "${cond}" gefunden! Ist das beabsichtigt?`);
              }
              if (saveCond.includes('<>')) {
                debugAndConsoleOut(`Zeichenkette (<>) stat (!=) in "${cond}" gefunden! Ist das beabsichtigt?`);
              }
              if (saveCond.includes('||')) {
                debugAndConsoleOut(`Doppeltes "||" statt "or" in "${cond}" gefunden! Ist das beabsichtigt?`);
              }
              if (saveCond.includes('&&')) {
                debugAndConsoleOut(`Doppeltes "&&" statt "and" in "${cond}" gefunden! Ist das beabsichtigt?`);
              }
              if (!('scoringVals' in obj)) {
                obj.scoringVals = [];
              }
              try {
                obj.scoringVals.push([sv.val, parser.parse(saveCond)]);
              } catch (e) {
                debugAndConsoleOut(`Fehler (${e}) in Scoring-Condition: ${cond}`);
              }
            }
          }
        });
      }
    }
  }
  if (obj.scoringVals) {
    obj.computeScoringVals = function (res) {
      let score = null;
      const scoreDat = this.scoringVals;
      for (let h = 0; score === null && h < scoreDat.length; h++) {
        const [v, c] = scoreDat[h];
        try {
          if (c.evaluate(res)) {
            score = v;
          }
        } catch (e) {
          debugAndConsoleOut(`Error in scoring-condition: ${e}, ${res}`);
        }
      }
      const n = Number(score);
      res[`V_Score_${this.dataSettings.variablePrefix}`] = score !== null && n !== NaN ? n : score;
    };
    if (obj.scoreDef && obj.base) {
      obj.base.sendChangeState(obj);
    }
  }
}

//////////////////////////////////////////////////////////////////////////////

function addStatusVarDef(obj, json) {
  if (!obj.statusVarDef && json.dataSettings && json.dataSettings.variablePrefix) {
    const statVarName = `V_Status_${json.dataSettings.variablePrefix}`;
    obj.statusVarDef = function () {
      return {
        [statVarName]: +this.getDefaultChangeState()
      };
    };
  }
}

//////////////////////////////////////

// convert "1 34,5:6-9" to [1,34,5,6,7,8,9]
/**
 * Parses a string containing range values and returns an array of numbers.
 * @param {string} s - The string containing the range values.
 * @returns {number[]} - An array of numbers parsed from the range values.
 */
const readRangeArray = s => {
  const res = [];
  for (const rr of s.matchAll(/([0-9]+) *(?:- *([0-9]+))?/g)) {
    if (rr[2] && rr[1] < rr[2]) {
      const rr2 = Number(rr[2]);
      for (let h = Number(rr[1]); h <= rr2; h++) {
        res.push(h);
      }
    } else {
      res.push(Number(rr[1]));
    }
  }
  return res;
};

//////////////////////////////////////

/**
 * Converts an object containing properties for decimal places, decimal precision, and units into a regular expression for input validation.
 * @param {Object} obj - The object containing properties for decimal places, decimal precision, and units.
 */
const dp2inputRegExp = obj => {
  /**
   * Generates a regular expression pattern for a given unit. (case insensitive concatenation of upper and lower case characters)
   * @param {string} u - The unit string.
   * @returns {string} The regular expression pattern for the unit.
   */
  const unitRegExp = u => {
    let r = '';
    for (const c of u.trim()) {
      const u = c.toUpperCase();
      const l = c.toLowerCase();
      r += u != l ? `[${l}${u}]?` : `${c}?`;
    }
    return r;
  };
  if (obj.pdp || obj.dp) {
    let re = `^[0-9]${obj.pdp ? `{0,${obj.pdp}}` : '*'}`;
    if (obj.dp) {
      re += `([,.][0-9]{0,${obj.dp}})?`;
    }
    if (obj.units) {
      re += ` ?(${obj.units.split('|').map(u => unitRegExp(u)).join('|')})?`;
    }
    obj.inputRegexp = re + '$';
  }
  delete obj.pdp;
  delete obj.dp;
  delete obj.units;
};
const dp2labFncInputRegExp = function (obj, opts) {
  let nam = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : '';
  let lVF, lT;
  if (!obj) {
    return;
  }
  if (obj.dp && !obj.units) {
    lVF = strToNum;
    lT = 'Number';
  } else if (obj.pdp && !obj.units) {
    lVF = strToInt;
    lT = 'Integer';
  } else {
    lVF = v => v;
    lT = 'String';
  }
  opts[`lab${nam}ValFnc`] = lVF;
  opts[`lab${nam}Type`] = lT;
  dp2inputRegExp(obj);
};

//////////////////////////////////////

const strToInt = s => {
  const n = parseInt(s);
  return Number.isNaN(n) ? 0 : n;
};
const strToNum = s => {
  s = s.replace(',', '.');
  return parseFloat(s);
  // const n = parseFloat( s );
  // return isNaN(n) ? 0 : n;
};

//////////////////////////////////////

class ResolvablePromise {
  constructor() {
    this.prom = new Promise((res, rej) => {
      this.res = res;
      this.rej = rej;
    });
  }
  resolvePromise(res) {
    this.res(res);
  }
  rejectPromise(rej) {
    this.rej(rej);
  }
  get promise() {
    return this.prom;
  }
}

//////////////////////////////////////////////////////////////////////////////

// get the folder name of the EPF
const getEPFFolderName = function () {
  let emptyVal = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : '.';
  const regexp = window.location.pathname.match(/\/([^/]+)\/[^/]*$/);
  return regexp ? regexp[1] : emptyVal;
};

//////////////////////////////////////////////////////////////////////////////

// I18N support

function getI18nDescr(json) {
  let nameFnc = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : getEPFFolderName;
  const name = nameFnc('').replaceAll('/', '_');
  if (!json.dataSettings || !json.dataSettings.i18nKeysCtxs) {
    return [];
  }
  const i18nData = [];

  // Collect Info
  Object.entries(json.dataSettings.i18nKeysCtxs).forEach(_ref2 => {
    let [key, ctx] = _ref2;
    // Pfad in JSON suchen
    const keyParts = key.split('.');
    let val = json;
    while (1) {
      const k = keyParts.shift();
      if (!(k in val)) {
        // PFad nicht gefunden
        val = null;
        break;
      }
      val = val[k];
      if (keyParts.length === 0) {
        // Einzelner Wert gefunden
        break;
      }
      if (typeof val !== 'object') {
        // Pfad geht nicht weiter
        val = null;
        break;
      }
      if (Array.isArray(val)) {
        if (keyParts.length <= 1) {
          // Array gefunden
          break;
        } else {
          // array mittendrin, Fehler
          val = null;
          break;
        }
      }
    }
    const add = (text, currkey) => {
      // Einen Wert adden, wenn wirklich Text
      text = text.trim();
      if (text && !text.match(/^[0-9,. %]+$/)) {
        const descr = ctx.replaceAll('${}', name).trim();
        const entry = {
          key: name.length > 0 ? `${name}.${currkey}` : currkey,
          text,
          descr
        };
        i18nData.push(entry);
      }
    };
    if (val !== null) {
      if (typeof val !== 'object') {
        // Einzelnen Wert schreiben
        add(val, key);
      } else {
        // Array-Werte schreiben
        const k = keyParts.pop();
        const stammKey = k ? key.substring(0, key.length - k.length - 1) : key;
        val.forEach((v, i) => {
          if (k) {
            if (k in v) {
              add(v[k], `${stammKey}.${i}.${k}`);
            }
          } else {
            add(v, `${stammKey}.${i}`);
          }
        });
      }
    }
  });
  // console.log( "============== i18nData", i18nData );

  return i18nData;
}

///////////////////////////////////////

function patchCfgI18n(json, i18n) {
  let nameFnc = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : getEPFFolderName;
  const name = nameFnc('').replaceAll('/', '_');
  i18n.forEach(_ref3 => {
    let {
      key,
      text
    } = _ref3;
    // EPF Name + '.' muss am Anfang wegnehmen
    if (name.length > 0) {
      if (!key.startsWith(name + '.')) {
        return;
      }
      key = key.substring(name.length + 1);
    }
    const keyParts = key.split('.');
    let val = json;
    while (1) {
      const k = keyParts.shift();
      if (!(k in val)) {
        // PFad nicht gefunden
        break;
      }
      if (keyParts.length === 0) {
        // Einzelner Wert gefunden
        val[k] = text;
        break;
      }
      val = val[k];
    }
  });
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
  constructor() {
    let opts = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
    // Options and defaults
    const defaults = {
      container: null,
      addSendChangeState: null
    };
    Object.assign(this, defaults, opts);

    // create fsm object, if not provided
    if (!this.fsm) {
      this.fsm = new _fsm__WEBPACK_IMPORTED_MODULE_0__.fsmSend();
      this.fsm.startListeningToVarDeclReq(this.declareVariables.bind(this));
    }

    // init stage & layer
    if (opts.container) {
      if (!this.width) {
        this.width = window.innerWidth;
      }
      if (!this.height) {
        this.height = window.innerHeight;
      }
      this.stage = new Konva.Stage({
        container: this.container,
        width: this.width,
        height: this.height
      });
      const stageVN = "BW_IB_EXTRES_STAGES";
      if (!(stageVN in window)) {
        window[stageVN] = [];
      }
      window[stageVN].push(this.stage);

      // this.layer = new Konva.Layer();
      // this.stage.add( this.layer );
    }

    // disable mouse right click
    document.addEventListener('contextmenu', ev => ev.preventDefault());
    this.FSMVarsSent = {};
  }

  ///////////////////////////////////

  // method wrapper for posting to FSM

  postLog(event) {
    let data = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};
    if (!this.stage || !this.stage.isDemoAni) {
      this.fsm.postLogEvent(Object.assign({}, data, {
        event: event
      }));
    }
  }
  postVariable(name, val) {
    this.FSMVarsSent[name] = val;
    this.fsm.setFSMVariable(name, val);
  }
  triggerInputValidationEvent() {
    if (this.fsm.triggerEvent) {
      ////////////////////
      if (this.dataSettings && this.dataSettings.variablePrefix) {
        this.fsm.triggerEvent('ev_InputValidation_' + this.dataSettings.variablePrefix);
      }
      /////////
      ////////////////////////////////////////////////////////////////////////////////
      //////////
      this.fsm.triggerEvent('ev_InputValidation_ExtRes');
    }
  }

  ///////////////////////////////////

  // get state-vars of obj
  getChangeState(obj) {
    // statusVarDef defined in obj?
    if (obj.statusVarDef) {
      return obj.statusVarDef.call(obj);
    } else {
      // call defaultChangeState()
      return +obj.getDefaultChangeState();
    }
  }
  sendChangeState(obj) {
    let newState = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : null;
    // Dont send states or score in demoAni
    if (obj.stage && obj.stage.isDemoAni) {
      return;
    }

    // state Variable (changeState) changed?
    const changeState = newState === null ? this.getChangeState(obj) : newState;

    // is state changed? -> send msgs
    if (typeof obj.oldChangeState === 'undefined' || !(0,_common__WEBPACK_IMPORTED_MODULE_1__.object_equals)(changeState, obj.oldChangeState)) {
      if (typeof changeState === 'object') {
        // changeState = { FSMStateVar1: state1, FSMStateVar2: state2, ... }
        for (let k in changeState) {
          if (typeof obj.oldChangeState !== 'object' || changeState[k] !== obj.oldChangeState[k]) {
            this.postVariable(k, changeState[k]);
          }
        }
      } else if (obj.FSMVariableName) {
        // Simple 1-value state
        this.postVariable(`V_Status_${obj.FSMVariableName}`, +changeState);
      }
      obj.oldChangeState = changeState;
    }

    // score changed?
    if (obj.scoreDef) {
      const score = obj.scoreDef.call(obj);
      this.scoreObj = obj;
      if (typeof obj.oldScore === 'undefined' || !(0,_common__WEBPACK_IMPORTED_MODULE_1__.object_equals)(score, obj.oldScore)) {
        if (typeof score === 'object') {
          // score = { FSMStateVar1: state1, FSMStateVar2: state2, ... }
          for (let k in score) {
            if (typeof obj.oldScore !== 'object' || score[k] !== obj.oldScore[k]) {
              this.postVariable(k, score[k]);
            }
          }
        } else if (obj.FSMVariableName || obj.scoreVariableName) {
          // Simple 1-value score
          if (typeof score !== 'undefined') {
            this.postVariable(obj.scoreVariableName || `V_Score_${obj.FSMVariableName}`, score);
          }
        }
      }
      obj.oldScore = score;
    }
    if (typeof this.addSendChangeState === 'function') {
      this.addSendChangeState();
    }
  }

  // send information about variables sent
  declareVariables() {
    const varDefs = [];
    const typetrans = {
      'string': 'String',
      'number': 'Integer',
      'boolean': 'Boolean'
    };
    for (const vname in this.FSMVarsSent) {
      const val = this.FSMVarsSent[vname];
      let type = '';
      if (this.scoreObj && this.scoreObj.scoreDefType) {
        type = this.scoreObj.scoreDefType.call(this.scoreObj, vname);
      }
      if (!type) {
        type = val === null ? 'Integer' : typetrans[typeof val];
      }
      const vdef = {
        name: vname,
        type,
        defaultValue: Number.isNaN(val) || val === null ? 0 : val === '' ? 'EMPTY' : val,
        namedValues: []
      };
      varDefs.push(vdef);
    }
    return varDefs;
  }
}

/***/ }),

/***/ "../../libs/common.js":
/*!****************************!*\
  !*** ../../libs/common.js ***!
  \****************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
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
/* harmony export */   "regexCanLookBehind": () => (/* binding */ regexCanLookBehind),
/* harmony export */   "setStatePostProc": () => (/* binding */ setStatePostProc)
/* harmony export */ });
/* harmony import */ var core_js_modules_es_regexp_constructor_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! core-js/modules/es.regexp.constructor.js */ "../../node_modules/core-js/modules/es.regexp.constructor.js");
/* harmony import */ var core_js_modules_es_regexp_constructor_js__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(core_js_modules_es_regexp_constructor_js__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var core_js_modules_es_regexp_exec_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! core-js/modules/es.regexp.exec.js */ "../../node_modules/core-js/modules/es.regexp.exec.js");
/* harmony import */ var core_js_modules_es_regexp_exec_js__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(core_js_modules_es_regexp_exec_js__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var core_js_modules_es_array_includes_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! core-js/modules/es.array.includes.js */ "../../node_modules/core-js/modules/es.array.includes.js");
/* harmony import */ var core_js_modules_es_array_includes_js__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(core_js_modules_es_array_includes_js__WEBPACK_IMPORTED_MODULE_2__);



// import { isBetween, delDefaults, mergeDeep, object_equals, getXofEvent, getYofEvent, getPosOfEvent } from './common'

function isBetween(v, w1, w2) {
  return v >= Math.min(w1, w2) && v <= Math.max(w1, w2);
}
;
function isNumUnit(v, num, unitRE, unitOpt, orEmpty) {
  const numRE = `0*${num}(?:[,.]0*)?`;
  const r = unitOpt ? `${numRE}(?: *${unitRE})?|(?:${unitRE} *)?${numRE}` : `${numRE} *${unitRE}|${unitRE} *${numRE}`;
  const re = new RegExp(`^(?:${r})${orEmpty ? '?' : ''}$`);
  return v.trim().match(re);
}

// Deletes delKeys & unchanged defaults from obj
// object deep clone, omitting some data defined by defaults and delKeys
// adopted from https://stackoverflow.com/questions/4459928/how-to-deep-clone-in-javascript
function delDefaults() {
  let obj = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
  let defaults = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};
  let delKeys = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : [];
  // if obj is array of objects: apply delDefaults to every member of array
  if (Array.isArray(obj)) {
    let a = [];
    obj.forEach(e => {
      if (typeof e === 'object') {
        a.push(delDefaults(e, defaults, delKeys));
      } else {
        a.push(e);
      }
    });
    return a;
  }
  if (!obj) {
    return obj;
  }
  let v;
  let bObject = {};
  for (const k in obj) {
    if (!delKeys.includes(k)) {
      v = obj[k];
      if (!defaults || defaults[k] !== v) {
        bObject[k] = typeof v === "object" ? delDefaults(v, defaults ? defaults[k] : []) : v;
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
function mergeDeep(target, source) {
  const isObject = obj => obj && typeof obj === 'object';
  if (!isObject(target) || !isObject(source)) {
    return source;
  }
  Object.keys(source).forEach(key => {
    const targetValue = target[key];
    const sourceValue = source[key];
    if ( /*Array.isArray(targetValue) &&*/Array.isArray(sourceValue)) {
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
function object_equals(x, y) {
  if (x === y) return true;
  // if both x and y are null or undefined and exactly the same

  if (!(x instanceof Object) || !(y instanceof Object)) return false;
  // if they are not strictly equal, they both need to be Objects

  if (x.constructor !== y.constructor) return false;
  // they must have the exact same prototype chain, the closest we can do is
  // test there constructor.

  // if both are arrays: unordered compare (check if all elements are contained)
  if (Array.isArray(y) && Array.isArray(x)) {
    if (x.length != y.length) return false;
    const y2 = Array.from(y);
    if (!x.every(xe => y2.some((ye, i) => {
      if (object_equals(xe, ye)) {
        y2.splice(i, 1);
        return true;
      }
      return false;
    }))) return false;
    return y2.length === 0;
  }
  for (var p in x) {
    if (!x.hasOwnProperty(p)) continue;
    // other properties were tested using x.constructor === y.constructor

    if (!y.hasOwnProperty(p)) return false;
    // allows to compare x[ p ] and y[ p ] when set to undefined

    if (x[p] === y[p]) continue;
    // if they have the same strict value or identity then they are equal

    if (typeof x[p] !== "object") return false;
    // Numbers, Strings, Functions, Booleans must be strictly equal

    if (!object_equals(x[p], y[p])) return false;
    // Objects and Arrays must be tested recursively
  }

  for (p in y) if (y.hasOwnProperty(p) && !x.hasOwnProperty(p)) return false;
  // allows x[ p ] to be set to undefined

  return true;
}

//////////////////////////////////////

function getXofEvent(stage, event) {
  if (event) {
    if (event.simX) {
      return event.simX;
    }
    // if ( event.evt && event.evt.clientX ) {
    // 	return event.evt.clientX;
    // }
  }

  return stage.getPointerPosition().x;
}
function getYofEvent(stage, event) {
  if (event) {
    if (event.simY) {
      return event.simY;
    }
    // if ( event.evt && event.evt.clientY ) {
    // 	return event.evt.clientY;
    // }
  }

  return stage.getPointerPosition().y;
}
function getPosOfEvent(stage, ev) {
  return {
    x: getXofEvent(stage, ev),
    y: getYofEvent(stage, ev)
  };
}

// is in DemoAni: ignore native Events (prevent e.g. stage.on(mouseleave))
function ignoreEvent(stage, ev) {
  return stage && stage.isDemoAni && !("simX" in ev);
}

//////////////////////////////////////

const setStatePostProc = function (obj) {
  if (obj.stage && obj.stage.isDemoAni && obj.stage.isDemoAni.endAni) {
    obj.stage.isDemoAni.endAni(false);
  }
  if (obj.base) {
    obj.base.sendChangeState(obj); // init & send changeState & score
  }
  // obj.oldChangeState = obj.base.getChangeState(obj);
  // if ( obj.scoreDef ) {
  // 	obj.oldScore = obj.scoreDef();
  // }
};

//////////////////////////////////////

const getAbsPosition = function (element) {
  const box = element.getBoundingClientRect();
  const scrollX = window.scrollX || window.pageXOffset;
  const scrollY = window.scrollY || window.pageYOffset;
  return {
    left: box.left + scrollX,
    top: box.top + scrollY
  };
};

//////////////////////////////////////

function regexCanLookBehind() {
  if (regexCanLookBehind.r !== undefined) {
    return regexCanLookBehind.r;
  }
  try {
    new RegExp('(?<!a)b');
    regexCanLookBehind.r = true;
    return true;
  } catch (e) {
    regexCanLookBehind.r = false;
    return false;
  }
}

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
/* harmony import */ var core_js_modules_web_url_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! core-js/modules/web.url.js */ "../../node_modules/core-js/modules/web.url.js");
/* harmony import */ var core_js_modules_web_url_js__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(core_js_modules_web_url_js__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var core_js_modules_web_url_search_params_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! core-js/modules/web.url-search-params.js */ "../../node_modules/core-js/modules/web.url-search-params.js");
/* harmony import */ var core_js_modules_web_url_search_params_js__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(core_js_modules_web_url_search_params_js__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var core_js_modules_es_array_includes_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! core-js/modules/es.array.includes.js */ "../../node_modules/core-js/modules/es.array.includes.js");
/* harmony import */ var core_js_modules_es_array_includes_js__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(core_js_modules_es_array_includes_js__WEBPACK_IMPORTED_MODULE_2__);



// Set FSM variable

class fsmSend {
  constructor() {
    this.indexPath = this.getQueryVariable('indexPath');
    this.userDefIdPath = this.getQueryVariable('userDefIdPath');

    // Trace Counter
    this.traceCount = 0;

    // Init done promise
    this.prInitDone = new Promise(resolve => {
      if (false) {} else {
        this.prInitDoneResolve = () => {
          this.debugOut("fsmSend: Init done promise resolved");
          resolve();
        };
      }
    });
    this.initDoneCnt = 0;
    if (true) {
      window.bw__debugOut = this.debugOut.bind(this);
    }
  }
  setFSMVariable(variableName, newValue) {
    if (Array.isArray(newValue)) {
      newValue = newValue.join(',');
    }
    if (true) {
      this.debugOut(`Set FSM variable: ${variableName} to value >${newValue}< (${typeof newValue})`);
    }
    this.postMessageWithPathsAndTraceCount({
      setVariable: {
        variableName,
        newValue: Number.isNaN(newValue) ? 0 : newValue
      }
    });
  }

  // Send a trace message
  postLogEvent(traceMessage) {
    if (true) {
      this.debugOut(`Posting event '${traceMessage.event}', message ${JSON.stringify(traceMessage, (k, v) => k === 'event' ? undefined : v)}`);
    }
    this.postMessageWithPathsAndTraceCount({
      traceMessage
    });
  }
  triggerEvent(event) {
    if (true) {
      this.debugOut("triggerEvent: " + event);
    }
    this.postMessageWithPathsAndTraceCount({
      microfinEvent: event
    });
  }
  postMessageWithPathsAndTraceCount(payload) {
    try {
      payload.indexPath = this.indexPath;
      payload.userDefIdPath = this.userDefIdPath;
      payload.traceCount = this.traceCount++;
      this.postMessage(JSON.stringify(payload));
    } catch (e) {
      console.error(e);
    }
  }
  postMessage(payload) {
    if (true) {
      this.debugOut(`Posting message: ${payload}`);
      if (window.parent !== window) {
        window.parent.postMessage(payload, '*');
      }
      if (window.__BW__callback) {
        window.__BW__callback(payload);
      }
    } else {}
  }

  // Helper
  getQueryVariable(variable) {
    const parsedUrl = new URL(window.location.href);
    return parsedUrl.searchParams.get(variable);
  }
  startListeningToVarDeclReq(declareVariableCallback) {
    const prInitDone = this.getInitDonePromise();
    this.answerVarDeclReq = function (callId) {
      prInitDone.then(() => {
        const variables = declareVariableCallback();
        const pass_data = {
          initialVariables: variables,
          callId
        };
        this.postMessage(JSON.stringify(pass_data));
      });
    };

    // listener for providing initial variable data signal.
    window.addEventListener("message", event => {
      try {
        const {
          callId
        } = JSON.parse(event.data);
        if (callId !== undefined && callId.includes("importVariables")) {
          this.answerVarDeclReq(callId);
        }
      } catch (error) {
        if (true) {
          console.log("error on external listener - ", error);
        }
      }
    }, false);
  }
  debugOut(s) {
    if (true) {
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

  ///////////////////////////////////

  getInitDonePromise() {
    return this.prInitDone;
  }
  incInitCnt() {
    return ++this.initDoneCnt;
  }
  decInitCnt() {
    if (this.initDoneCnt > 0) {
      this.initDoneCnt--;
      if (this.initDoneCnt === 0) {
        this.prInitDoneResolve();
      }
    }
    return this.initDoneCnt;
  }
}

/***/ }),

/***/ "../../libs/textareaInserts.js":
/*!*************************************!*\
  !*** ../../libs/textareaInserts.js ***!
  \*************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "textareaBase": () => (/* binding */ textareaBase),
/* harmony export */   "textareaContainer": () => (/* binding */ textareaContainer),
/* harmony export */   "textareaInserts": () => (/* binding */ textareaInserts),
/* harmony export */   "toolbarComparison": () => (/* binding */ toolbarComparison),
/* harmony export */   "toolbarEuro": () => (/* binding */ toolbarEuro),
/* harmony export */   "toolbarFraction": () => (/* binding */ toolbarFraction),
/* harmony export */   "toolbarMathOperators": () => (/* binding */ toolbarMathOperators),
/* harmony export */   "toolbarMathOperatorsFraction": () => (/* binding */ toolbarMathOperatorsFraction),
/* harmony export */   "toolbarMathOperatorsFractionComparison": () => (/* binding */ toolbarMathOperatorsFractionComparison),
/* harmony export */   "toolbarMathOperatorsFractionPercent": () => (/* binding */ toolbarMathOperatorsFractionPercent),
/* harmony export */   "toolbarPercent": () => (/* binding */ toolbarPercent)
/* harmony export */ });
/* harmony import */ var core_js_modules_es_regexp_constructor_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! core-js/modules/es.regexp.constructor.js */ "../../node_modules/core-js/modules/es.regexp.constructor.js");
/* harmony import */ var core_js_modules_es_regexp_constructor_js__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(core_js_modules_es_regexp_constructor_js__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var core_js_modules_es_regexp_exec_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! core-js/modules/es.regexp.exec.js */ "../../node_modules/core-js/modules/es.regexp.exec.js");
/* harmony import */ var core_js_modules_es_regexp_exec_js__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(core_js_modules_es_regexp_exec_js__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var core_js_modules_es_string_replace_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! core-js/modules/es.string.replace.js */ "../../node_modules/core-js/modules/es.string.replace.js");
/* harmony import */ var core_js_modules_es_string_replace_js__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(core_js_modules_es_string_replace_js__WEBPACK_IMPORTED_MODULE_2__);
/* harmony import */ var core_js_modules_esnext_string_replace_all_js__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! core-js/modules/esnext.string.replace-all.js */ "../../node_modules/core-js/modules/esnext.string.replace-all.js");
/* harmony import */ var core_js_modules_esnext_string_replace_all_js__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(core_js_modules_esnext_string_replace_all_js__WEBPACK_IMPORTED_MODULE_3__);
/* harmony import */ var _textareaInserts_css__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./textareaInserts.css */ "../../libs/textareaInserts.css");
/* harmony import */ var _common__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ./common */ "../../libs/common.js");
/* harmony import */ var _img_fract_svg__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ./img/fract.svg */ "../../libs/img/fract.svg");






class textareaContainer {
  constructor(divSelector) {
    let opts = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};
    let base = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : null;
    if (base.fsm && base.fsm.incInitCnt) {
      base.fsm.incInitCnt();
    }
    const defaults = {
      outerDivStyles: {// styles of created outer div (containing textarea and toolbar)
      },
      divStyles: {// styles of "textarea"-div
        // width: '300px',
        // height: '200px',
      }
    };
    (0,_common__WEBPACK_IMPORTED_MODULE_5__.mergeDeep)(Object.assign(this, defaults), opts);
    // base is only used for sendChangeState() and postLog()
    this.base = base;

    // move div in a div.textareaInserts (->this.outerDiv)
    this.outerDiv = document.createElement('DIV');
    this.outerDiv.classList.add('textareaInserts');
    this.setStyles(this.outerDiv, this.outerDivStyles);
    this.div = typeof divSelector === 'string' ? document.querySelector(divSelector) : divSelector;
    this.div.parentNode.replaceChild(this.outerDiv, this.div);
    this.setStyles(this.div, this.divStyles);
    this.outerDiv.appendChild(this.div);
    this.initData = this.div.innerHTML.trim();
    if (base.fsm && base.fsm.decInitCnt) {
      base.fsm.decInitCnt();
    }
  }
  ev_input() {}
  setStyles(el, styles) {
    for (const st in styles) {
      el.style[st] = styles[st];
    }
  }
  extract() {
    return '';
  }

  ///////////////////////////////////

  getDefaultChangeState() {
    return this.div.innerHTML.trim() !== this.initData;
  }
  getState() {
    return '{}';
  }
  setState() {}
}
class textareaBase extends textareaContainer {
  constructor(divSelector) {
    let opts = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};
    let base = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : null;
    if (base.fsm && base.fsm.incInitCnt) {
      base.fsm.incInitCnt();
    }
    console.log("*+*+*+*+*+*+", (0,_common__WEBPACK_IMPORTED_MODULE_5__.regexCanLookBehind)());
    const defaults = {
      multiLine: true,
      stripTags: false,
      // true: only allow text-node, delete all HTML-tags (fireofx inserts <br> sometimes)
      inputRegexp: null,
      // regexp evaluated against div.innerHTML
      maxlength: null,
      // max numbers characters

      // Replaces done by this.extract()
      // (e.g. toolbar.extractReplace are inserted here)
      extractReplaces: [
      // { from: /regexp/, to: "replace" },

      (0,_common__WEBPACK_IMPORTED_MODULE_5__.regexCanLookBehind)() ? {
        from: /(?<!\*)\*(?!\*)/g,
        to: "\u22c5"
      } :
      // replace '*' to \u22c5
      // IB internal browser does not support negative look-behind/-forward
      // workaround:
      {
        from: /(^|[^*])\*([^*]|$)/g,
        to: "$1\u22c5$2"
      },
      // replace '*' to \u22c5

      {
        from: /\u2022|\u25cf/g,
        to: "\u22c5"
      } // replace • and ● to \u22c5
      ]
    };

    (0,_common__WEBPACK_IMPORTED_MODULE_5__.mergeDeep)(defaults, opts);
    super(divSelector, defaults, base);
    this.div.setAttribute('contenteditable', 'true');
    this.div.addEventListener('keydown', this.ev_keydown.bind(this));
    this.div.addEventListener('input', this.ev_input.bind(this));
    // this.div.addEventListener( 'touchend', this.ev_touchend.bind(this) );
    // ['click','touchstart','change','input','keypress','keyup'].forEach( e => {
    //	this.div.addEventListener( e, this.checkNodes.bind(this) );
    // })

    if (!this.div.textContent.length && this.multiLine) {
      this.div.textContent = "\n";
      // this.div.appendChild( document.createElement('div') );
    }

    this.div.addEventListener('paste', ev => ev.preventDefault());
    if (this.inputRegexp) {
      this.inputRE = new RegExp(this.inputRegexp);
      this.saveValue();
    }
    this.div.addEventListener('focus', () => setTimeout(() => this.base.postLog('textareaFocus', this.getTextPos()), 0));
    this.div.addEventListener('blur', () => this.base.postLog('textareaBlur'));
    this.oldValue = "";
    this.oldFocusElemIndex = null;

    // Save initData & init StateVars
    this.initData = this.div.innerHTML.trim();
    this.base.sendChangeState(this); // init & send changeState & score

    if (base.fsm && base.fsm.decInitCnt) {
      base.fsm.decInitCnt();
    }
  }

  ///////////////////////////////////

  ev_keydown(event) {
    // console.log(event);

    let rescore = 0;

    // log?
    if (this.base) {
      const data = {
        which: event.which || event.keyCode
        // extract: this.extract(),	// old, unchanged value
      };

      ['key', 'code', 'shiftKey', 'altKey', 'ctrlKey', 'metaKey', 'isComposing', 'repeat'].forEach(k => {
        if (event[k]) {
          data[k] = event[k];
        }
      });

      // !!!!! DONT LOG ON CHROME/ANDROID !!!!!
      // !!!!! DONT LOG ON CHROME/ANDROID !!!!!
      // !!!!! DONT LOG ON CHROME/ANDROID !!!!!
      this.base.postLog('keyDown', Object.assign(data, this.getTextPos()));
    }

    // On ENTER insert <br>, prevent inserting <divs>
    if (event.key === "Enter" || event.which == 13 || event.keyCode == 13) {
      if (!this.tabToNextInputField(event)) {
        // 	if ( !this.multiLine ) {
        // 		event.preventDefault();
        // 		event.stopPropagation();
        // 	}
        // }
        if (!this.multiLine || this.pasteHtmlAtCaret("\n")) {
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
    } else if (event.key === "Tab" || event.which == 9 || event.keyCode == 9) {
      if (!this.tabToNextInputField(event)) {
        if (this.pasteHtmlAtCaret('&#09;')) {
          event.preventDefault();
          event.stopPropagation();
        }
      }
      rescore = 1;

      // Backspace: Delete div before cursor?
    } else if (event.key === "Backspace" || event.which == 8 || event.keyCode == 8) {
      // should div be deleted
      if (!this.delIfDiv(-1, event)) {
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
    } else if (event.key === "Delete" || (event.which || event.keyCode) == 46) {
      this.delIfDiv(1, event);
      rescore = 1;
    }
    if (this.base && rescore > 0) {
      this.base.sendChangeState(this);
    }
  }

  // chrome @ android does not send keyCodes on keydown events
  // therefore input event must be evaluated for 'deleteContentBackward' behind inserted elements
  ev_input(event) {
    let saveNewValue = false;

    // console.log( window.getSelection() );
    const sel = window.getSelection();

    // was "inserted" node saved for deletion and was backspace processed?
    if (event && event.inputType == 'deleteContentBackward' && this.delPosElement) {
      // console.log(this.delPosText);
      // is cursor IN inserted element?
      let inserted = null,
        search = sel.focusNode;
      if (this.delPosText) {
        while (!inserted && search && (!search.classList || !search.classList.contains('textareaInserts'))) {
          // console.log(search);
          if (search.classList && search.classList.contains('inserted')) {
            inserted = search;
          }
          search = search.parentNode;
        }
      }
      if (inserted) {
        // console.log(this.delPosText,this.delPosElement)
        // pos cursor
        if (sel.getRangeAt && sel.rangeCount) {
          const range = sel.getRangeAt(0).cloneRange();
          range.setStartBefore(inserted);
          range.collapse(true);
          sel.removeAllRanges();
          sel.addRange(range);
        }
        // replace inserted with text
        this.div.replaceChild(this.delPosText, this.delPosElement);
        this.div.normalize();
      } else {
        this.delPosElement.remove();
      }
      this.delPosElement = null;
      this.delPosText = null;
      saveNewValue = this.inputRE || !this.multiLine;
    } else {
      // cursor after deleteable, inserted element?
      // console.log(sel,sel.focusNode,this.div)
      if (sel && sel.isCollapsed && sel.focusNode && sel.focusNode.parentNode == this.div && sel.focusOffset === 0 && sel.focusNode.previousSibling && sel.focusNode.previousSibling.classList && sel.focusNode.previousSibling.classList.contains('inserted')) {
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
      if (!this.multiLine) {
        if (this.div.textContent.match(/[\n\r]/)) {
          // console.log(this.div.textContent)
          // console.log(this.div.textContent.match( /[\n\r]/ ))
          this.restoreValue();
        } else {
          saveNewValue = true;
        }
      } else {
        // HotFix for Chrome (Enter behind last character not always processed)
        // Always have a '\n' as last character
        const lastNode = this.div.childNodes.length > 0 ? this.div.childNodes[this.div.childNodes.length - 1] : null;
        if (lastNode && lastNode.nodeType == Node.TEXT_NODE && !lastNode.textContent.endsWith("\n")) {
          const pos = sel && sel.focusNode == lastNode ? sel.focusOffset : null;
          lastNode.textContent = lastNode.textContent + "\n";
          if (pos !== null) {
            this.setCurPos(lastNode, pos);
          }
        }
      }

      // handel stripTags
      if (this.stripTags) {
        if (this.div.innerHTML.match(/<[^>]*>/)) {
          this.div.innerHTML = this.div.innerHTML.replace(/<[^>]*>/g, '');
        }
      } else {
        // delete all div:not(.inserted)
        // THIS SHOULD NEVER HAPPEN, but it should be corrected
        let node = this.div.childNodes[0];
        while (node) {
          const el = node;
          node = node.nextSibling;
          if (el.tagName == 'DIV' && el.classList && !el.classList.contains('inserted')) {
            // convert textcontent to textnode
            const text = el.textContent;
            if (text.length) {
              const tnode = document.createTextNode('');
              tnode.textContent = text;
              this.div.replaceChild(tnode, el);
              this.div.normalize();
            } else {
              el.remove();
            }
          }
        }
        // delete solely <br>
        if (this.div.innerHTML.trim() === '<br>') {
          this.div.innerHTML = '';
          this.div.textContent = "\n";
        }
      }

      // handle inputRegexp
      if (this.inputRE || this.maxlength) {
        // console.log(this.div.innerHTML);
        // console.log(this.div.innerHTML.match( this.inputRE ));
        if (this.inputRE && !this.div.innerHTML.match(this.inputRE) || this.maxlength && this.div.innerHTML.length > this.maxlength) {
          this.restoreValue();
          if (this.base) {
            this.base.postLog('inputRevert', {
              toText: this.div.innerHTML,
              extract: this.extract()
            });
            this.base.triggerInputValidationEvent();
          }
        } else {
          saveNewValue = true;
        }
      }
    }
    if (saveNewValue) {
      this.saveValue();
    }
    if (saveNewValue || !this.inputRE || this.multiLine) {
      this.base.postLog('newValue', {
        extract: this.extract()
      });
    }
    if (this.base) {
      this.base.sendChangeState(this);
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
  pasteHtmlAtCaret(html, insertSpaces, logName) {
    const sel = window.getSelection();
    // only insert if selection is within this.div
    if (!sel || !sel.focusNode || !this.div.contains(sel.focusNode)) {
      return false;
    }
    if (sel.getRangeAt && sel.rangeCount) {
      let range = sel.getRangeAt(0);
      range.deleteContents();

      // Range.createContextualFragment() would be useful here but is
      // only relatively recently standardized and is not supported in
      // some browsers (IE9, for one)
      let ins;
      if (insertSpaces) {
        const preSpace = !sel.focusOffset || sel.focusNode.textContent[sel.focusOffset - 1] != ' ' ? ' ' : '';
        ins = `${preSpace}${html} `;
      } else {
        ins = html;
      }
      const el = document.createElement("div");
      el.innerHTML = ins;
      var frag = document.createDocumentFragment(),
        node,
        lastNode;
      while (node = el.firstChild) {
        if (node.classList) {
          node.classList.add('inserted');
        }
        lastNode = frag.appendChild(node);
      }
      const startCurPos = frag.querySelector('.startCursorPos');
      range.insertNode(frag);

      // Preserve the selection
      if (lastNode) {
        range = range.cloneRange();
        startCurPos ? range.setStart(startCurPos, 0) : range.setStartAfter(lastNode);
        range.collapse(true);
        sel.removeAllRanges();
        sel.addRange(range);
      }
      this.normalize();

      // log button
      if (logName && this.base) {
        const data = {
          text: ins,
          name: logName,
          extract: this.extract()
        };
        this.base.postLog('insertButtonPressed', Object.assign(data, this.getTextPos()));
      }
    }
    return true;
  }
  delIfDiv(offs, event) {
    const sel = window.getSelection();
    if (sel && sel.isCollapsed) {
      const focus = sel.focusNode;
      // console.log(sel,offs,focus==this.div,this.div.childNodes.length,this.div.childNodes);
      // delete previous/next node?
      if (focus && (offs > 0 && sel.focusOffset == focus.textContent.length || offs < 0 && (!sel.focusOffset ||
      // Beginning of a Text or
      focus == this.div && sel.focusOffset <= this.div.childNodes.length))) {
        // node-level, focusOffset is node-index

        const toDelete = focus == this.div ? this.div.childNodes[sel.focusOffset - 1] : offs < 0 ? focus.previousSibling : focus.nextSibling;
        // console.log(toDelete)
        // check if node is div.inserted
        if (toDelete && toDelete.tagName == 'DIV' && toDelete.classList.contains('inserted')) {
          // set cursor before element (fix for safari)
          const range = sel.getRangeAt(0);
          if (range) {
            if (toDelete.previousSibling) {
              range.setStartAfter(toDelete.previousSibling);
            } else if (toDelete.nextSibling) {
              range.setStart(toDelete.nextSibling, 0);
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
  tabToNextInputField(event) {
    const sel = window.getSelection();
    if (sel && sel.isCollapsed && sel.focusNode && sel.getRangeAt && sel.rangeCount) {
      // in .inputfield?
      let node;
      for (node = sel.focusNode; node && !node.classList;) {
        node = node.parentNode;
      }
      if (node && node.classList.contains('inputField')) {
        // search next available sibling
        while (node && !node.nextSibling && node != this.div) {
          node = node.parentNode;
        }
        if (node && node != this.div) {
          node = node.nextSibling;

          // set cursor
          this.setCurPos(node, node.nodeType == Node.TEXT_NODE && node.textContent.startsWith(' ') ? 1 : 0);
          event.preventDefault();
          event.stopPropagation();
          return true;
        }
      }
    }
    return false;
  }

  ///////////////////////////////////

  saveValue() {
    this.oldValue = this.div.innerHTML;
    // save cursor position
    const sel = window.getSelection();
    if (sel && sel.focusNode) {
      const nodes = Array.from(this.div.childNodes);
      this.oldFocusElemIndex = nodes.findIndex(i => i === sel.focusNode);
      this.oldFocusOffset = sel.focusOffset;
    } else {
      this.oldFocusElemIndex = null;
    }
  }
  restoreValue() {
    if (this.oldValue !== null) {
      this.div.innerHTML = this.oldValue;
      // restore old cursor position
      const sel = window.getSelection();
      if (sel) {
        sel.removeAllRanges();
        if (this.oldFocusElemIndex !== null && this.oldFocusElemIndex > -1) {
          this.setCurPos(this.div.childNodes[this.oldFocusElemIndex], this.oldFocusOffset);
        }
      }
    }
  }
  setCurPos(node, offset) {
    const sel = window.getSelection();
    if (sel) {
      const range = document.createRange();
      range.setStart(node, offset);
      range.collapse(true);
      sel.removeAllRanges();
      sel.addRange(range);
    }
  }

  // call this.div.normalize() and try to save/restore cursor position
  normalize() {
    // try to save cursor position in textnode(s)
    let curPos = null,
      prevElment,
      parentElment;
    const sel = window.getSelection();
    if (sel && sel.rangeCount == 1) {
      let focus = sel.focusNode;
      let focusOffset = sel.focusOffset;
      if (focus) {
        if (focus.nodeType == Node.ELEMENT_NODE && focusOffset > 0) {
          // If focusNode is an element, focusOffset is the number of child nodes of the
          // focusNode preceding the focus
          focus = focus.childNodes[focusOffset];
          focusOffset = 0;
        }
        if (focus.nodeType == Node.TEXT_NODE && (focus.previousSibling && focus.previousSibling.nodeType == Node.TEXT_NODE || focus.nextSibling && focus.nextSibling.nodeType == Node.TEXT_NODE)) {
          // cursor is part of several consecutive text elements that are combined by nomalize()
          // -> save position in text & previousSibling/parentElement

          curPos = focusOffset;
          parentElment = focus.parentElement;

          // Add length of all previous text elements to position
          while (focus.previousSibling && focus.previousSibling.nodeType == Node.TEXT_NODE) {
            focus = focus.previousSibling;
            curPos += focus.textContent.length;
          }
          prevElment = focus.previousSibling;
        }
      }
    }
    this.div.normalize();

    // restore position in (concatenated) text
    if (curPos !== null) {
      const newElem = prevElment ? prevElment.nextSibling : parentElment.firstChild;
      const newRange = document.createRange();
      newRange.setStart(newElem, curPos);
      newRange.collapse(true);
      sel.removeAllRanges();
      sel.addRange(newRange);
    }
  }

  // Get Position (in this.div.textContent) and special classes set in focusnode
  getTextPos() {
    let sel = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : null;
    if (sel === null) {
      sel = window.getSelection();
    }
    if (sel && sel.focusNode) {
      let pos = sel.focusOffset;
      let node = sel.focusNode;
      // add lengths of textContents of all pevious Elements
      while ((node = node.previousSibling || node.parentNode) && node != this.div && node) {
        if (node.textContent) {
          pos += node.textContent.length;
        }
      }
      const data = {
        textPos: pos
      };
      // check for frac classes
      node = sel.focusNode;
      while (node && node != this.div && !node.classList) {
        node = node.parentNode;
      }
      if (node.classList && node.classList.contains('frac')) {
        if (node.classList.contains('top')) data.class = "frac top";
        if (node.classList.contains('bottom')) data.class = "frac bottom";
      }
      ;
      return data;
    }
    return {};
  }
  extract() {
    let s = this.div.innerHTML;
    this.extractReplaces.forEach(r => {
      s = s.replaceAll(r.from, r.to);
    });
    return s.trim();
  }

  ///////////////////////////////////

  getState() {
    return JSON.stringify(this.div.innerHTML);
  }
  setState(state) {
    try {
      this.div.innerHTML = JSON.parse(state);
    } catch (e) {
      console.error(e);
    }
    (0,_common__WEBPACK_IMPORTED_MODULE_5__.setStatePostProc)(this);
  }
  scoreDef() {
    return this.scoreVariableName || this.FSMVariableName ? {
      [this.scoreVariableName || `V_Input_${this.FSMVariableName}`]: this.extract()
    } : {};
  }
}

//////////////////////////////////////////////////////////////////////////////

class textareaInserts extends textareaBase {
  constructor(divSelector) {
    let opts = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};
    let base = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : null;
    if (base.fsm && base.fsm.incInitCnt) {
      base.fsm.incInitCnt();
    }
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
      toolbarCellStyles: {},
      toolbarCellSpanStyles: {// spans within toolbar-cells (for vertical centering)
      }
    };
    (0,_common__WEBPACK_IMPORTED_MODULE_5__.mergeDeep)(insertsDefaults, opts);
    super(divSelector, insertsDefaults, base);

    // create toolbar container
    this.toolbarContainer = document.createElement('DIV');
    this.toolbarContainer.classList.add('toolbar', `ti${this.toolbarDirection}`, 'disabled');
    if (!this.toolbarContainerStyles.left) {
      this.toolbarContainerStyles.left = this.divStyles.width;
    }
    if (!this.toolbarContainerStyles.top) {
      this.toolbarContainerStyles.top = "0px";
    }
    this.setStyles(this.toolbarContainer, this.toolbarContainerStyles);
    // this.toolbarContainer.setAttribute( 'contenteditable', 'false' );

    // create toolbarCells
    this.toolbar.forEach((tb, nr) => {
      // FLOWing div
      const toolbarCell = document.createElement('DIV');
      this.setStyles(toolbarCell, this.toolbarCellStyles);
      ['mousedown', 'touchstart'].forEach(ev => toolbarCell.addEventListener(ev, function (event) {
        if (document.activeElement && !this.toolbarContainer.classList.contains('disabled') && this.div.contains(document.activeElement)) {
          this.insert(nr, event);
        }
      }.bind(this)));
      //  toolbarCell.setAttribute( 'contenteditable', 'false' );

      // span in div for vertical aligning
      const innerSpan = document.createElement('SPAN');
      this.setStyles(innerSpan, this.toolbarCellSpanStyles);
      toolbarCell.appendChild(innerSpan);
      innerSpan.innerHTML = tb.display;
      this.toolbarContainer.appendChild(toolbarCell);

      // copy extractReplace
      if (tb.extractReplace && tb.extractReplace.from && tb.extractReplace.to) {
        this.extractReplaces.push(tb.extractReplace);
      }
    });

    // Handle toolbarContainer visibility
    // if ( this.toolbarHide ) {
    // 	this.toolbarContainer.style.visibility = this.div.activeElement ? 'visible' : 'hidden';

    // 	this.div.addEventListener( 'focus', () => this.toolbarContainer.style.visibility = 'visible' );
    // 	this.div.addEventListener( 'blur', (ev) => console.log(ev) );
    // }
    this.outerDiv.appendChild(this.toolbarContainer);
    this.div.addEventListener('focus', () => this.toolbarContainer.classList.remove('disabled'), {
      capture: true
    });
    this.div.addEventListener('blur', () => this.toolbarContainer.classList.add('disabled'), {
      capture: true
    });
    if (base.fsm && base.fsm.decInitCnt) {
      base.fsm.decInitCnt();
    }
  }

  ///////////////////////////////////

  insert(nr, event) {
    if (this.toolbar[nr].dontInsertRecursive) {
      // search parent ".inserted" (-> inside another inserted element)
      const sel = window.getSelection();
      if (sel && sel.focusNode) {
        let pnode = sel.focusNode;
        while (pnode && (!pnode.classList || !pnode.classList.contains('textareaInserts') && !pnode.classList.contains('inserted'))) {
          pnode = pnode.parentNode;
        }
        if (pnode.classList && pnode.classList.contains('inserted')) {
          return;
        }
      }
    }
    if (this.pasteHtmlAtCaret(this.toolbar[nr].insert || this.toolbar[nr].display, !this.toolbar[nr].noExtraSpaces, this.toolbar[nr].logName)) {
      this.ev_input(); // check regexp etc.
      event.preventDefault();
      event.stopPropagation();
    }
    if (this.base) {
      this.base.sendChangeState(this);
    }
  }
}

//////////////////////////////////////////////////////////////////////////////

// export some default toolbars

const toolbarMathOperators = [{
  display: "&plus;",
  logName: "plus"
},
// + \u002b
{
  display: "&minus;",
  logName: "minus"
},
// - \u2212
// { display: "&centerdot;", },	// *
{
  display: "&sdot;",
  logName: "dot"
},
// * \u22c5
{
  display: "&ratio;",
  logName: "ratio"
},
// / \u2236
{
  display: "&equals;",
  logName: "equals"
} // = \u003d
];

const frac_html = '<div contenteditable="false" class="frac">' + '<span contenteditable="true" class="frac top startCursorPos inputField"></span>' + '<span contenteditable="true" class="frac bottom inputField"></span>' + '</div>';

const frac_html_toolbar = `<div class="frac"><img src="${_img_fract_svg__WEBPACK_IMPORTED_MODULE_6__}"></div>`;
const toolbarFraction = [{
  display: frac_html_toolbar,
  insert: frac_html,
  dontInsertRecursive: true,
  logName: "fraction",
  extractReplace: {
    from: /<div[^>]*class="frac[^>]*>\s*<span[^>]*class="frac top[^>]*>(.*?)<\/span>\s*<span[^>]*class="frac bottom[^>]*>(.*?)<\/span>\s*<\/div>/g,
    to: "($1)/($2)"
  }
}];
const toolbarPercent = [{
  display: "%",
  logName: "percent"
}];
const toolbarEuro = [{
  display: "€",
  logName: "euro"
}];
const toolbarComparison = [{
  display: "&lt;",
  logName: "less"
}, {
  display: "&gt;",
  logName: "greater"
}];
const toolbarMathOperatorsFraction = toolbarMathOperators.concat(toolbarFraction);
const toolbarMathOperatorsFractionComparison = [].concat(toolbarFraction).concat(toolbarMathOperatorsFraction);
const toolbarMathOperatorsFractionPercent = toolbarMathOperatorsFraction.concat(toolbarPercent);

/***/ }),

/***/ "../../examples/main.css":
/*!*******************************!*\
  !*** ../../examples/main.css ***!
  \*******************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
// extracted by mini-css-extract-plugin


/***/ }),

/***/ "../../examples/textareaInserts_2cols.css":
/*!************************************************!*\
  !*** ../../examples/textareaInserts_2cols.css ***!
  \************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
// extracted by mini-css-extract-plugin


/***/ }),

/***/ "../../libs/textareaInserts.css":
/*!**************************************!*\
  !*** ../../libs/textareaInserts.css ***!
  \**************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
// extracted by mini-css-extract-plugin


/***/ }),

/***/ "../../libs/img/fract.svg":
/*!********************************!*\
  !*** ../../libs/img/fract.svg ***!
  \********************************/
/***/ ((module) => {

module.exports = "data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSI5MC4wMDIiIGhlaWdodD0iMTA2Ljg5MyIgdmlld0JveD0iMCAwIDIzLjgxMyAyOC4yODIiIHhtbG5zOnY9Imh0dHBzOi8vdmVjdGEuaW8vbmFubyI+PHBhdGggZD0iTTUuOTUzLjM4M2gxMS45MDZ2MTAuNTgzSDUuOTUzem0wIDE2LjkzM2gxMS45MDZ2MTAuNTgzSDUuOTUzeiIgZmlsbD0ibm9uZSIgc3Ryb2tlPSIjMDAwIiBzdHJva2Utd2lkdGg9Ii43NjUiIHN0cm9rZS1saW5lam9pbj0icm91bmQiLz48cGF0aCBkPSJNMCAxNC4xNDFoMjMuODEyIiBmaWxsPSIjZDg2MjZjIiBmaWxsLW9wYWNpdHk9Ii4yNjIiIHN0cm9rZT0iIzAwMCIgc3Ryb2tlLXdpZHRoPSIxLjA2NSIvPjwvc3ZnPg==";

/***/ }),

/***/ "../../node_modules/core-js/internals/a-callable.js":
/*!**********************************************************!*\
  !*** ../../node_modules/core-js/internals/a-callable.js ***!
  \**********************************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {


var isCallable = __webpack_require__(/*! ../internals/is-callable */ "../../node_modules/core-js/internals/is-callable.js");
var tryToString = __webpack_require__(/*! ../internals/try-to-string */ "../../node_modules/core-js/internals/try-to-string.js");

var $TypeError = TypeError;

// `Assert: IsCallable(argument) is true`
module.exports = function (argument) {
  if (isCallable(argument)) return argument;
  throw new $TypeError(tryToString(argument) + ' is not a function');
};


/***/ }),

/***/ "../../node_modules/core-js/internals/a-constructor.js":
/*!*************************************************************!*\
  !*** ../../node_modules/core-js/internals/a-constructor.js ***!
  \*************************************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {


var isConstructor = __webpack_require__(/*! ../internals/is-constructor */ "../../node_modules/core-js/internals/is-constructor.js");
var tryToString = __webpack_require__(/*! ../internals/try-to-string */ "../../node_modules/core-js/internals/try-to-string.js");

var $TypeError = TypeError;

// `Assert: IsConstructor(argument) is true`
module.exports = function (argument) {
  if (isConstructor(argument)) return argument;
  throw new $TypeError(tryToString(argument) + ' is not a constructor');
};


/***/ }),

/***/ "../../node_modules/core-js/internals/a-possible-prototype.js":
/*!********************************************************************!*\
  !*** ../../node_modules/core-js/internals/a-possible-prototype.js ***!
  \********************************************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {


var isPossiblePrototype = __webpack_require__(/*! ../internals/is-possible-prototype */ "../../node_modules/core-js/internals/is-possible-prototype.js");

var $String = String;
var $TypeError = TypeError;

module.exports = function (argument) {
  if (isPossiblePrototype(argument)) return argument;
  throw new $TypeError("Can't set " + $String(argument) + ' as a prototype');
};


/***/ }),

/***/ "../../node_modules/core-js/internals/add-to-unscopables.js":
/*!******************************************************************!*\
  !*** ../../node_modules/core-js/internals/add-to-unscopables.js ***!
  \******************************************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {


var wellKnownSymbol = __webpack_require__(/*! ../internals/well-known-symbol */ "../../node_modules/core-js/internals/well-known-symbol.js");
var create = __webpack_require__(/*! ../internals/object-create */ "../../node_modules/core-js/internals/object-create.js");
var defineProperty = (__webpack_require__(/*! ../internals/object-define-property */ "../../node_modules/core-js/internals/object-define-property.js").f);

var UNSCOPABLES = wellKnownSymbol('unscopables');
var ArrayPrototype = Array.prototype;

// Array.prototype[@@unscopables]
// https://tc39.es/ecma262/#sec-array.prototype-@@unscopables
if (ArrayPrototype[UNSCOPABLES] === undefined) {
  defineProperty(ArrayPrototype, UNSCOPABLES, {
    configurable: true,
    value: create(null)
  });
}

// add a key to Array.prototype[@@unscopables]
module.exports = function (key) {
  ArrayPrototype[UNSCOPABLES][key] = true;
};


/***/ }),

/***/ "../../node_modules/core-js/internals/advance-string-index.js":
/*!********************************************************************!*\
  !*** ../../node_modules/core-js/internals/advance-string-index.js ***!
  \********************************************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {


var charAt = (__webpack_require__(/*! ../internals/string-multibyte */ "../../node_modules/core-js/internals/string-multibyte.js").charAt);

// `AdvanceStringIndex` abstract operation
// https://tc39.es/ecma262/#sec-advancestringindex
module.exports = function (S, index, unicode) {
  return index + (unicode ? charAt(S, index).length : 1);
};


/***/ }),

/***/ "../../node_modules/core-js/internals/an-instance.js":
/*!***********************************************************!*\
  !*** ../../node_modules/core-js/internals/an-instance.js ***!
  \***********************************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {


var isPrototypeOf = __webpack_require__(/*! ../internals/object-is-prototype-of */ "../../node_modules/core-js/internals/object-is-prototype-of.js");

var $TypeError = TypeError;

module.exports = function (it, Prototype) {
  if (isPrototypeOf(Prototype, it)) return it;
  throw new $TypeError('Incorrect invocation');
};


/***/ }),

/***/ "../../node_modules/core-js/internals/an-object.js":
/*!*********************************************************!*\
  !*** ../../node_modules/core-js/internals/an-object.js ***!
  \*********************************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {


var isObject = __webpack_require__(/*! ../internals/is-object */ "../../node_modules/core-js/internals/is-object.js");

var $String = String;
var $TypeError = TypeError;

// `Assert: Type(argument) is Object`
module.exports = function (argument) {
  if (isObject(argument)) return argument;
  throw new $TypeError($String(argument) + ' is not an object');
};


/***/ }),

/***/ "../../node_modules/core-js/internals/array-from.js":
/*!**********************************************************!*\
  !*** ../../node_modules/core-js/internals/array-from.js ***!
  \**********************************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {


var bind = __webpack_require__(/*! ../internals/function-bind-context */ "../../node_modules/core-js/internals/function-bind-context.js");
var call = __webpack_require__(/*! ../internals/function-call */ "../../node_modules/core-js/internals/function-call.js");
var toObject = __webpack_require__(/*! ../internals/to-object */ "../../node_modules/core-js/internals/to-object.js");
var callWithSafeIterationClosing = __webpack_require__(/*! ../internals/call-with-safe-iteration-closing */ "../../node_modules/core-js/internals/call-with-safe-iteration-closing.js");
var isArrayIteratorMethod = __webpack_require__(/*! ../internals/is-array-iterator-method */ "../../node_modules/core-js/internals/is-array-iterator-method.js");
var isConstructor = __webpack_require__(/*! ../internals/is-constructor */ "../../node_modules/core-js/internals/is-constructor.js");
var lengthOfArrayLike = __webpack_require__(/*! ../internals/length-of-array-like */ "../../node_modules/core-js/internals/length-of-array-like.js");
var createProperty = __webpack_require__(/*! ../internals/create-property */ "../../node_modules/core-js/internals/create-property.js");
var getIterator = __webpack_require__(/*! ../internals/get-iterator */ "../../node_modules/core-js/internals/get-iterator.js");
var getIteratorMethod = __webpack_require__(/*! ../internals/get-iterator-method */ "../../node_modules/core-js/internals/get-iterator-method.js");

var $Array = Array;

// `Array.from` method implementation
// https://tc39.es/ecma262/#sec-array.from
module.exports = function from(arrayLike /* , mapfn = undefined, thisArg = undefined */) {
  var O = toObject(arrayLike);
  var IS_CONSTRUCTOR = isConstructor(this);
  var argumentsLength = arguments.length;
  var mapfn = argumentsLength > 1 ? arguments[1] : undefined;
  var mapping = mapfn !== undefined;
  if (mapping) mapfn = bind(mapfn, argumentsLength > 2 ? arguments[2] : undefined);
  var iteratorMethod = getIteratorMethod(O);
  var index = 0;
  var length, result, step, iterator, next, value;
  // if the target is not iterable or it's an array with the default iterator - use a simple case
  if (iteratorMethod && !(this === $Array && isArrayIteratorMethod(iteratorMethod))) {
    result = IS_CONSTRUCTOR ? new this() : [];
    iterator = getIterator(O, iteratorMethod);
    next = iterator.next;
    for (;!(step = call(next, iterator)).done; index++) {
      value = mapping ? callWithSafeIterationClosing(iterator, mapfn, [step.value, index], true) : step.value;
      createProperty(result, index, value);
    }
  } else {
    length = lengthOfArrayLike(O);
    result = IS_CONSTRUCTOR ? new this(length) : $Array(length);
    for (;length > index; index++) {
      value = mapping ? mapfn(O[index], index) : O[index];
      createProperty(result, index, value);
    }
  }
  result.length = index;
  return result;
};


/***/ }),

/***/ "../../node_modules/core-js/internals/array-includes.js":
/*!**************************************************************!*\
  !*** ../../node_modules/core-js/internals/array-includes.js ***!
  \**************************************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {


var toIndexedObject = __webpack_require__(/*! ../internals/to-indexed-object */ "../../node_modules/core-js/internals/to-indexed-object.js");
var toAbsoluteIndex = __webpack_require__(/*! ../internals/to-absolute-index */ "../../node_modules/core-js/internals/to-absolute-index.js");
var lengthOfArrayLike = __webpack_require__(/*! ../internals/length-of-array-like */ "../../node_modules/core-js/internals/length-of-array-like.js");

// `Array.prototype.{ indexOf, includes }` methods implementation
var createMethod = function (IS_INCLUDES) {
  return function ($this, el, fromIndex) {
    var O = toIndexedObject($this);
    var length = lengthOfArrayLike(O);
    if (length === 0) return !IS_INCLUDES && -1;
    var index = toAbsoluteIndex(fromIndex, length);
    var value;
    // Array#includes uses SameValueZero equality algorithm
    // eslint-disable-next-line no-self-compare -- NaN check
    if (IS_INCLUDES && el !== el) while (length > index) {
      value = O[index++];
      // eslint-disable-next-line no-self-compare -- NaN check
      if (value !== value) return true;
    // Array#indexOf ignores holes, Array#includes - not
    } else for (;length > index; index++) {
      if ((IS_INCLUDES || index in O) && O[index] === el) return IS_INCLUDES || index || 0;
    } return !IS_INCLUDES && -1;
  };
};

module.exports = {
  // `Array.prototype.includes` method
  // https://tc39.es/ecma262/#sec-array.prototype.includes
  includes: createMethod(true),
  // `Array.prototype.indexOf` method
  // https://tc39.es/ecma262/#sec-array.prototype.indexof
  indexOf: createMethod(false)
};


/***/ }),

/***/ "../../node_modules/core-js/internals/array-slice.js":
/*!***********************************************************!*\
  !*** ../../node_modules/core-js/internals/array-slice.js ***!
  \***********************************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {


var uncurryThis = __webpack_require__(/*! ../internals/function-uncurry-this */ "../../node_modules/core-js/internals/function-uncurry-this.js");

module.exports = uncurryThis([].slice);


/***/ }),

/***/ "../../node_modules/core-js/internals/array-sort.js":
/*!**********************************************************!*\
  !*** ../../node_modules/core-js/internals/array-sort.js ***!
  \**********************************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {


var arraySlice = __webpack_require__(/*! ../internals/array-slice */ "../../node_modules/core-js/internals/array-slice.js");

var floor = Math.floor;

var sort = function (array, comparefn) {
  var length = array.length;

  if (length < 8) {
    // insertion sort
    var i = 1;
    var element, j;

    while (i < length) {
      j = i;
      element = array[i];
      while (j && comparefn(array[j - 1], element) > 0) {
        array[j] = array[--j];
      }
      if (j !== i++) array[j] = element;
    }
  } else {
    // merge sort
    var middle = floor(length / 2);
    var left = sort(arraySlice(array, 0, middle), comparefn);
    var right = sort(arraySlice(array, middle), comparefn);
    var llength = left.length;
    var rlength = right.length;
    var lindex = 0;
    var rindex = 0;

    while (lindex < llength || rindex < rlength) {
      array[lindex + rindex] = (lindex < llength && rindex < rlength)
        ? comparefn(left[lindex], right[rindex]) <= 0 ? left[lindex++] : right[rindex++]
        : lindex < llength ? left[lindex++] : right[rindex++];
    }
  }

  return array;
};

module.exports = sort;


/***/ }),

/***/ "../../node_modules/core-js/internals/call-with-safe-iteration-closing.js":
/*!********************************************************************************!*\
  !*** ../../node_modules/core-js/internals/call-with-safe-iteration-closing.js ***!
  \********************************************************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {


var anObject = __webpack_require__(/*! ../internals/an-object */ "../../node_modules/core-js/internals/an-object.js");
var iteratorClose = __webpack_require__(/*! ../internals/iterator-close */ "../../node_modules/core-js/internals/iterator-close.js");

// call something on iterator step with safe closing on error
module.exports = function (iterator, fn, value, ENTRIES) {
  try {
    return ENTRIES ? fn(anObject(value)[0], value[1]) : fn(value);
  } catch (error) {
    iteratorClose(iterator, 'throw', error);
  }
};


/***/ }),

/***/ "../../node_modules/core-js/internals/classof-raw.js":
/*!***********************************************************!*\
  !*** ../../node_modules/core-js/internals/classof-raw.js ***!
  \***********************************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {


var uncurryThis = __webpack_require__(/*! ../internals/function-uncurry-this */ "../../node_modules/core-js/internals/function-uncurry-this.js");

var toString = uncurryThis({}.toString);
var stringSlice = uncurryThis(''.slice);

module.exports = function (it) {
  return stringSlice(toString(it), 8, -1);
};


/***/ }),

/***/ "../../node_modules/core-js/internals/classof.js":
/*!*******************************************************!*\
  !*** ../../node_modules/core-js/internals/classof.js ***!
  \*******************************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {


var TO_STRING_TAG_SUPPORT = __webpack_require__(/*! ../internals/to-string-tag-support */ "../../node_modules/core-js/internals/to-string-tag-support.js");
var isCallable = __webpack_require__(/*! ../internals/is-callable */ "../../node_modules/core-js/internals/is-callable.js");
var classofRaw = __webpack_require__(/*! ../internals/classof-raw */ "../../node_modules/core-js/internals/classof-raw.js");
var wellKnownSymbol = __webpack_require__(/*! ../internals/well-known-symbol */ "../../node_modules/core-js/internals/well-known-symbol.js");

var TO_STRING_TAG = wellKnownSymbol('toStringTag');
var $Object = Object;

// ES3 wrong here
var CORRECT_ARGUMENTS = classofRaw(function () { return arguments; }()) === 'Arguments';

// fallback for IE11 Script Access Denied error
var tryGet = function (it, key) {
  try {
    return it[key];
  } catch (error) { /* empty */ }
};

// getting tag from ES6+ `Object.prototype.toString`
module.exports = TO_STRING_TAG_SUPPORT ? classofRaw : function (it) {
  var O, tag, result;
  return it === undefined ? 'Undefined' : it === null ? 'Null'
    // @@toStringTag case
    : typeof (tag = tryGet(O = $Object(it), TO_STRING_TAG)) == 'string' ? tag
    // builtinTag case
    : CORRECT_ARGUMENTS ? classofRaw(O)
    // ES3 arguments fallback
    : (result = classofRaw(O)) === 'Object' && isCallable(O.callee) ? 'Arguments' : result;
};


/***/ }),

/***/ "../../node_modules/core-js/internals/copy-constructor-properties.js":
/*!***************************************************************************!*\
  !*** ../../node_modules/core-js/internals/copy-constructor-properties.js ***!
  \***************************************************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {


var hasOwn = __webpack_require__(/*! ../internals/has-own-property */ "../../node_modules/core-js/internals/has-own-property.js");
var ownKeys = __webpack_require__(/*! ../internals/own-keys */ "../../node_modules/core-js/internals/own-keys.js");
var getOwnPropertyDescriptorModule = __webpack_require__(/*! ../internals/object-get-own-property-descriptor */ "../../node_modules/core-js/internals/object-get-own-property-descriptor.js");
var definePropertyModule = __webpack_require__(/*! ../internals/object-define-property */ "../../node_modules/core-js/internals/object-define-property.js");

module.exports = function (target, source, exceptions) {
  var keys = ownKeys(source);
  var defineProperty = definePropertyModule.f;
  var getOwnPropertyDescriptor = getOwnPropertyDescriptorModule.f;
  for (var i = 0; i < keys.length; i++) {
    var key = keys[i];
    if (!hasOwn(target, key) && !(exceptions && hasOwn(exceptions, key))) {
      defineProperty(target, key, getOwnPropertyDescriptor(source, key));
    }
  }
};


/***/ }),

/***/ "../../node_modules/core-js/internals/correct-prototype-getter.js":
/*!************************************************************************!*\
  !*** ../../node_modules/core-js/internals/correct-prototype-getter.js ***!
  \************************************************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {


var fails = __webpack_require__(/*! ../internals/fails */ "../../node_modules/core-js/internals/fails.js");

module.exports = !fails(function () {
  function F() { /* empty */ }
  F.prototype.constructor = null;
  // eslint-disable-next-line es/no-object-getprototypeof -- required for testing
  return Object.getPrototypeOf(new F()) !== F.prototype;
});


/***/ }),

/***/ "../../node_modules/core-js/internals/create-iter-result-object.js":
/*!*************************************************************************!*\
  !*** ../../node_modules/core-js/internals/create-iter-result-object.js ***!
  \*************************************************************************/
/***/ ((module) => {


// `CreateIterResultObject` abstract operation
// https://tc39.es/ecma262/#sec-createiterresultobject
module.exports = function (value, done) {
  return { value: value, done: done };
};


/***/ }),

/***/ "../../node_modules/core-js/internals/create-non-enumerable-property.js":
/*!******************************************************************************!*\
  !*** ../../node_modules/core-js/internals/create-non-enumerable-property.js ***!
  \******************************************************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {


var DESCRIPTORS = __webpack_require__(/*! ../internals/descriptors */ "../../node_modules/core-js/internals/descriptors.js");
var definePropertyModule = __webpack_require__(/*! ../internals/object-define-property */ "../../node_modules/core-js/internals/object-define-property.js");
var createPropertyDescriptor = __webpack_require__(/*! ../internals/create-property-descriptor */ "../../node_modules/core-js/internals/create-property-descriptor.js");

module.exports = DESCRIPTORS ? function (object, key, value) {
  return definePropertyModule.f(object, key, createPropertyDescriptor(1, value));
} : function (object, key, value) {
  object[key] = value;
  return object;
};


/***/ }),

/***/ "../../node_modules/core-js/internals/create-property-descriptor.js":
/*!**************************************************************************!*\
  !*** ../../node_modules/core-js/internals/create-property-descriptor.js ***!
  \**************************************************************************/
/***/ ((module) => {


module.exports = function (bitmap, value) {
  return {
    enumerable: !(bitmap & 1),
    configurable: !(bitmap & 2),
    writable: !(bitmap & 4),
    value: value
  };
};


/***/ }),

/***/ "../../node_modules/core-js/internals/create-property.js":
/*!***************************************************************!*\
  !*** ../../node_modules/core-js/internals/create-property.js ***!
  \***************************************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {


var DESCRIPTORS = __webpack_require__(/*! ../internals/descriptors */ "../../node_modules/core-js/internals/descriptors.js");
var definePropertyModule = __webpack_require__(/*! ../internals/object-define-property */ "../../node_modules/core-js/internals/object-define-property.js");
var createPropertyDescriptor = __webpack_require__(/*! ../internals/create-property-descriptor */ "../../node_modules/core-js/internals/create-property-descriptor.js");

module.exports = function (object, key, value) {
  if (DESCRIPTORS) definePropertyModule.f(object, key, createPropertyDescriptor(0, value));
  else object[key] = value;
};


/***/ }),

/***/ "../../node_modules/core-js/internals/define-built-in-accessor.js":
/*!************************************************************************!*\
  !*** ../../node_modules/core-js/internals/define-built-in-accessor.js ***!
  \************************************************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {


var makeBuiltIn = __webpack_require__(/*! ../internals/make-built-in */ "../../node_modules/core-js/internals/make-built-in.js");
var defineProperty = __webpack_require__(/*! ../internals/object-define-property */ "../../node_modules/core-js/internals/object-define-property.js");

module.exports = function (target, name, descriptor) {
  if (descriptor.get) makeBuiltIn(descriptor.get, name, { getter: true });
  if (descriptor.set) makeBuiltIn(descriptor.set, name, { setter: true });
  return defineProperty.f(target, name, descriptor);
};


/***/ }),

/***/ "../../node_modules/core-js/internals/define-built-in.js":
/*!***************************************************************!*\
  !*** ../../node_modules/core-js/internals/define-built-in.js ***!
  \***************************************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {


var isCallable = __webpack_require__(/*! ../internals/is-callable */ "../../node_modules/core-js/internals/is-callable.js");
var definePropertyModule = __webpack_require__(/*! ../internals/object-define-property */ "../../node_modules/core-js/internals/object-define-property.js");
var makeBuiltIn = __webpack_require__(/*! ../internals/make-built-in */ "../../node_modules/core-js/internals/make-built-in.js");
var defineGlobalProperty = __webpack_require__(/*! ../internals/define-global-property */ "../../node_modules/core-js/internals/define-global-property.js");

module.exports = function (O, key, value, options) {
  if (!options) options = {};
  var simple = options.enumerable;
  var name = options.name !== undefined ? options.name : key;
  if (isCallable(value)) makeBuiltIn(value, name, options);
  if (options.global) {
    if (simple) O[key] = value;
    else defineGlobalProperty(key, value);
  } else {
    try {
      if (!options.unsafe) delete O[key];
      else if (O[key]) simple = true;
    } catch (error) { /* empty */ }
    if (simple) O[key] = value;
    else definePropertyModule.f(O, key, {
      value: value,
      enumerable: false,
      configurable: !options.nonConfigurable,
      writable: !options.nonWritable
    });
  } return O;
};


/***/ }),

/***/ "../../node_modules/core-js/internals/define-built-ins.js":
/*!****************************************************************!*\
  !*** ../../node_modules/core-js/internals/define-built-ins.js ***!
  \****************************************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {


var defineBuiltIn = __webpack_require__(/*! ../internals/define-built-in */ "../../node_modules/core-js/internals/define-built-in.js");

module.exports = function (target, src, options) {
  for (var key in src) defineBuiltIn(target, key, src[key], options);
  return target;
};


/***/ }),

/***/ "../../node_modules/core-js/internals/define-global-property.js":
/*!**********************************************************************!*\
  !*** ../../node_modules/core-js/internals/define-global-property.js ***!
  \**********************************************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {


var global = __webpack_require__(/*! ../internals/global */ "../../node_modules/core-js/internals/global.js");

// eslint-disable-next-line es/no-object-defineproperty -- safe
var defineProperty = Object.defineProperty;

module.exports = function (key, value) {
  try {
    defineProperty(global, key, { value: value, configurable: true, writable: true });
  } catch (error) {
    global[key] = value;
  } return value;
};


/***/ }),

/***/ "../../node_modules/core-js/internals/descriptors.js":
/*!***********************************************************!*\
  !*** ../../node_modules/core-js/internals/descriptors.js ***!
  \***********************************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {


var fails = __webpack_require__(/*! ../internals/fails */ "../../node_modules/core-js/internals/fails.js");

// Detect IE8's incomplete defineProperty implementation
module.exports = !fails(function () {
  // eslint-disable-next-line es/no-object-defineproperty -- required for testing
  return Object.defineProperty({}, 1, { get: function () { return 7; } })[1] !== 7;
});


/***/ }),

/***/ "../../node_modules/core-js/internals/document-create-element.js":
/*!***********************************************************************!*\
  !*** ../../node_modules/core-js/internals/document-create-element.js ***!
  \***********************************************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {


var global = __webpack_require__(/*! ../internals/global */ "../../node_modules/core-js/internals/global.js");
var isObject = __webpack_require__(/*! ../internals/is-object */ "../../node_modules/core-js/internals/is-object.js");

var document = global.document;
// typeof document.createElement is 'object' in old IE
var EXISTS = isObject(document) && isObject(document.createElement);

module.exports = function (it) {
  return EXISTS ? document.createElement(it) : {};
};


/***/ }),

/***/ "../../node_modules/core-js/internals/engine-user-agent.js":
/*!*****************************************************************!*\
  !*** ../../node_modules/core-js/internals/engine-user-agent.js ***!
  \*****************************************************************/
/***/ ((module) => {


module.exports = typeof navigator != 'undefined' && String(navigator.userAgent) || '';


/***/ }),

/***/ "../../node_modules/core-js/internals/engine-v8-version.js":
/*!*****************************************************************!*\
  !*** ../../node_modules/core-js/internals/engine-v8-version.js ***!
  \*****************************************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {


var global = __webpack_require__(/*! ../internals/global */ "../../node_modules/core-js/internals/global.js");
var userAgent = __webpack_require__(/*! ../internals/engine-user-agent */ "../../node_modules/core-js/internals/engine-user-agent.js");

var process = global.process;
var Deno = global.Deno;
var versions = process && process.versions || Deno && Deno.version;
var v8 = versions && versions.v8;
var match, version;

if (v8) {
  match = v8.split('.');
  // in old Chrome, versions of V8 isn't V8 = Chrome / 10
  // but their correct versions are not interesting for us
  version = match[0] > 0 && match[0] < 4 ? 1 : +(match[0] + match[1]);
}

// BrowserFS NodeJS `process` polyfill incorrectly set `.v8` to `0.0`
// so check `userAgent` even if `.v8` exists, but 0
if (!version && userAgent) {
  match = userAgent.match(/Edge\/(\d+)/);
  if (!match || match[1] >= 74) {
    match = userAgent.match(/Chrome\/(\d+)/);
    if (match) version = +match[1];
  }
}

module.exports = version;


/***/ }),

/***/ "../../node_modules/core-js/internals/enum-bug-keys.js":
/*!*************************************************************!*\
  !*** ../../node_modules/core-js/internals/enum-bug-keys.js ***!
  \*************************************************************/
/***/ ((module) => {


// IE8- don't enum bug keys
module.exports = [
  'constructor',
  'hasOwnProperty',
  'isPrototypeOf',
  'propertyIsEnumerable',
  'toLocaleString',
  'toString',
  'valueOf'
];


/***/ }),

/***/ "../../node_modules/core-js/internals/export.js":
/*!******************************************************!*\
  !*** ../../node_modules/core-js/internals/export.js ***!
  \******************************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {


var global = __webpack_require__(/*! ../internals/global */ "../../node_modules/core-js/internals/global.js");
var getOwnPropertyDescriptor = (__webpack_require__(/*! ../internals/object-get-own-property-descriptor */ "../../node_modules/core-js/internals/object-get-own-property-descriptor.js").f);
var createNonEnumerableProperty = __webpack_require__(/*! ../internals/create-non-enumerable-property */ "../../node_modules/core-js/internals/create-non-enumerable-property.js");
var defineBuiltIn = __webpack_require__(/*! ../internals/define-built-in */ "../../node_modules/core-js/internals/define-built-in.js");
var defineGlobalProperty = __webpack_require__(/*! ../internals/define-global-property */ "../../node_modules/core-js/internals/define-global-property.js");
var copyConstructorProperties = __webpack_require__(/*! ../internals/copy-constructor-properties */ "../../node_modules/core-js/internals/copy-constructor-properties.js");
var isForced = __webpack_require__(/*! ../internals/is-forced */ "../../node_modules/core-js/internals/is-forced.js");

/*
  options.target         - name of the target object
  options.global         - target is the global object
  options.stat           - export as static methods of target
  options.proto          - export as prototype methods of target
  options.real           - real prototype method for the `pure` version
  options.forced         - export even if the native feature is available
  options.bind           - bind methods to the target, required for the `pure` version
  options.wrap           - wrap constructors to preventing global pollution, required for the `pure` version
  options.unsafe         - use the simple assignment of property instead of delete + defineProperty
  options.sham           - add a flag to not completely full polyfills
  options.enumerable     - export as enumerable property
  options.dontCallGetSet - prevent calling a getter on target
  options.name           - the .name of the function if it does not match the key
*/
module.exports = function (options, source) {
  var TARGET = options.target;
  var GLOBAL = options.global;
  var STATIC = options.stat;
  var FORCED, target, key, targetProperty, sourceProperty, descriptor;
  if (GLOBAL) {
    target = global;
  } else if (STATIC) {
    target = global[TARGET] || defineGlobalProperty(TARGET, {});
  } else {
    target = global[TARGET] && global[TARGET].prototype;
  }
  if (target) for (key in source) {
    sourceProperty = source[key];
    if (options.dontCallGetSet) {
      descriptor = getOwnPropertyDescriptor(target, key);
      targetProperty = descriptor && descriptor.value;
    } else targetProperty = target[key];
    FORCED = isForced(GLOBAL ? key : TARGET + (STATIC ? '.' : '#') + key, options.forced);
    // contained in target
    if (!FORCED && targetProperty !== undefined) {
      if (typeof sourceProperty == typeof targetProperty) continue;
      copyConstructorProperties(sourceProperty, targetProperty);
    }
    // add a flag to not completely full polyfills
    if (options.sham || (targetProperty && targetProperty.sham)) {
      createNonEnumerableProperty(sourceProperty, 'sham', true);
    }
    defineBuiltIn(target, key, sourceProperty, options);
  }
};


/***/ }),

/***/ "../../node_modules/core-js/internals/fails.js":
/*!*****************************************************!*\
  !*** ../../node_modules/core-js/internals/fails.js ***!
  \*****************************************************/
/***/ ((module) => {


module.exports = function (exec) {
  try {
    return !!exec();
  } catch (error) {
    return true;
  }
};


/***/ }),

/***/ "../../node_modules/core-js/internals/fix-regexp-well-known-symbol-logic.js":
/*!**********************************************************************************!*\
  !*** ../../node_modules/core-js/internals/fix-regexp-well-known-symbol-logic.js ***!
  \**********************************************************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {


// TODO: Remove from `core-js@4` since it's moved to entry points
__webpack_require__(/*! ../modules/es.regexp.exec */ "../../node_modules/core-js/modules/es.regexp.exec.js");
var call = __webpack_require__(/*! ../internals/function-call */ "../../node_modules/core-js/internals/function-call.js");
var defineBuiltIn = __webpack_require__(/*! ../internals/define-built-in */ "../../node_modules/core-js/internals/define-built-in.js");
var regexpExec = __webpack_require__(/*! ../internals/regexp-exec */ "../../node_modules/core-js/internals/regexp-exec.js");
var fails = __webpack_require__(/*! ../internals/fails */ "../../node_modules/core-js/internals/fails.js");
var wellKnownSymbol = __webpack_require__(/*! ../internals/well-known-symbol */ "../../node_modules/core-js/internals/well-known-symbol.js");
var createNonEnumerableProperty = __webpack_require__(/*! ../internals/create-non-enumerable-property */ "../../node_modules/core-js/internals/create-non-enumerable-property.js");

var SPECIES = wellKnownSymbol('species');
var RegExpPrototype = RegExp.prototype;

module.exports = function (KEY, exec, FORCED, SHAM) {
  var SYMBOL = wellKnownSymbol(KEY);

  var DELEGATES_TO_SYMBOL = !fails(function () {
    // String methods call symbol-named RegExp methods
    var O = {};
    O[SYMBOL] = function () { return 7; };
    return ''[KEY](O) !== 7;
  });

  var DELEGATES_TO_EXEC = DELEGATES_TO_SYMBOL && !fails(function () {
    // Symbol-named RegExp methods call .exec
    var execCalled = false;
    var re = /a/;

    if (KEY === 'split') {
      // We can't use real regex here since it causes deoptimization
      // and serious performance degradation in V8
      // https://github.com/zloirock/core-js/issues/306
      re = {};
      // RegExp[@@split] doesn't call the regex's exec method, but first creates
      // a new one. We need to return the patched regex when creating the new one.
      re.constructor = {};
      re.constructor[SPECIES] = function () { return re; };
      re.flags = '';
      re[SYMBOL] = /./[SYMBOL];
    }

    re.exec = function () {
      execCalled = true;
      return null;
    };

    re[SYMBOL]('');
    return !execCalled;
  });

  if (
    !DELEGATES_TO_SYMBOL ||
    !DELEGATES_TO_EXEC ||
    FORCED
  ) {
    var nativeRegExpMethod = /./[SYMBOL];
    var methods = exec(SYMBOL, ''[KEY], function (nativeMethod, regexp, str, arg2, forceStringMethod) {
      var $exec = regexp.exec;
      if ($exec === regexpExec || $exec === RegExpPrototype.exec) {
        if (DELEGATES_TO_SYMBOL && !forceStringMethod) {
          // The native String method already delegates to @@method (this
          // polyfilled function), leasing to infinite recursion.
          // We avoid it by directly calling the native @@method method.
          return { done: true, value: call(nativeRegExpMethod, regexp, str, arg2) };
        }
        return { done: true, value: call(nativeMethod, str, regexp, arg2) };
      }
      return { done: false };
    });

    defineBuiltIn(String.prototype, KEY, methods[0]);
    defineBuiltIn(RegExpPrototype, SYMBOL, methods[1]);
  }

  if (SHAM) createNonEnumerableProperty(RegExpPrototype[SYMBOL], 'sham', true);
};


/***/ }),

/***/ "../../node_modules/core-js/internals/function-apply.js":
/*!**************************************************************!*\
  !*** ../../node_modules/core-js/internals/function-apply.js ***!
  \**************************************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {


var NATIVE_BIND = __webpack_require__(/*! ../internals/function-bind-native */ "../../node_modules/core-js/internals/function-bind-native.js");

var FunctionPrototype = Function.prototype;
var apply = FunctionPrototype.apply;
var call = FunctionPrototype.call;

// eslint-disable-next-line es/no-reflect -- safe
module.exports = typeof Reflect == 'object' && Reflect.apply || (NATIVE_BIND ? call.bind(apply) : function () {
  return call.apply(apply, arguments);
});


/***/ }),

/***/ "../../node_modules/core-js/internals/function-bind-context.js":
/*!*********************************************************************!*\
  !*** ../../node_modules/core-js/internals/function-bind-context.js ***!
  \*********************************************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {


var uncurryThis = __webpack_require__(/*! ../internals/function-uncurry-this-clause */ "../../node_modules/core-js/internals/function-uncurry-this-clause.js");
var aCallable = __webpack_require__(/*! ../internals/a-callable */ "../../node_modules/core-js/internals/a-callable.js");
var NATIVE_BIND = __webpack_require__(/*! ../internals/function-bind-native */ "../../node_modules/core-js/internals/function-bind-native.js");

var bind = uncurryThis(uncurryThis.bind);

// optional / simple context binding
module.exports = function (fn, that) {
  aCallable(fn);
  return that === undefined ? fn : NATIVE_BIND ? bind(fn, that) : function (/* ...args */) {
    return fn.apply(that, arguments);
  };
};


/***/ }),

/***/ "../../node_modules/core-js/internals/function-bind-native.js":
/*!********************************************************************!*\
  !*** ../../node_modules/core-js/internals/function-bind-native.js ***!
  \********************************************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {


var fails = __webpack_require__(/*! ../internals/fails */ "../../node_modules/core-js/internals/fails.js");

module.exports = !fails(function () {
  // eslint-disable-next-line es/no-function-prototype-bind -- safe
  var test = (function () { /* empty */ }).bind();
  // eslint-disable-next-line no-prototype-builtins -- safe
  return typeof test != 'function' || test.hasOwnProperty('prototype');
});


/***/ }),

/***/ "../../node_modules/core-js/internals/function-call.js":
/*!*************************************************************!*\
  !*** ../../node_modules/core-js/internals/function-call.js ***!
  \*************************************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {


var NATIVE_BIND = __webpack_require__(/*! ../internals/function-bind-native */ "../../node_modules/core-js/internals/function-bind-native.js");

var call = Function.prototype.call;

module.exports = NATIVE_BIND ? call.bind(call) : function () {
  return call.apply(call, arguments);
};


/***/ }),

/***/ "../../node_modules/core-js/internals/function-name.js":
/*!*************************************************************!*\
  !*** ../../node_modules/core-js/internals/function-name.js ***!
  \*************************************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {


var DESCRIPTORS = __webpack_require__(/*! ../internals/descriptors */ "../../node_modules/core-js/internals/descriptors.js");
var hasOwn = __webpack_require__(/*! ../internals/has-own-property */ "../../node_modules/core-js/internals/has-own-property.js");

var FunctionPrototype = Function.prototype;
// eslint-disable-next-line es/no-object-getownpropertydescriptor -- safe
var getDescriptor = DESCRIPTORS && Object.getOwnPropertyDescriptor;

var EXISTS = hasOwn(FunctionPrototype, 'name');
// additional protection from minified / mangled / dropped function names
var PROPER = EXISTS && (function something() { /* empty */ }).name === 'something';
var CONFIGURABLE = EXISTS && (!DESCRIPTORS || (DESCRIPTORS && getDescriptor(FunctionPrototype, 'name').configurable));

module.exports = {
  EXISTS: EXISTS,
  PROPER: PROPER,
  CONFIGURABLE: CONFIGURABLE
};


/***/ }),

/***/ "../../node_modules/core-js/internals/function-uncurry-this-accessor.js":
/*!******************************************************************************!*\
  !*** ../../node_modules/core-js/internals/function-uncurry-this-accessor.js ***!
  \******************************************************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {


var uncurryThis = __webpack_require__(/*! ../internals/function-uncurry-this */ "../../node_modules/core-js/internals/function-uncurry-this.js");
var aCallable = __webpack_require__(/*! ../internals/a-callable */ "../../node_modules/core-js/internals/a-callable.js");

module.exports = function (object, key, method) {
  try {
    // eslint-disable-next-line es/no-object-getownpropertydescriptor -- safe
    return uncurryThis(aCallable(Object.getOwnPropertyDescriptor(object, key)[method]));
  } catch (error) { /* empty */ }
};


/***/ }),

/***/ "../../node_modules/core-js/internals/function-uncurry-this-clause.js":
/*!****************************************************************************!*\
  !*** ../../node_modules/core-js/internals/function-uncurry-this-clause.js ***!
  \****************************************************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {


var classofRaw = __webpack_require__(/*! ../internals/classof-raw */ "../../node_modules/core-js/internals/classof-raw.js");
var uncurryThis = __webpack_require__(/*! ../internals/function-uncurry-this */ "../../node_modules/core-js/internals/function-uncurry-this.js");

module.exports = function (fn) {
  // Nashorn bug:
  //   https://github.com/zloirock/core-js/issues/1128
  //   https://github.com/zloirock/core-js/issues/1130
  if (classofRaw(fn) === 'Function') return uncurryThis(fn);
};


/***/ }),

/***/ "../../node_modules/core-js/internals/function-uncurry-this.js":
/*!*********************************************************************!*\
  !*** ../../node_modules/core-js/internals/function-uncurry-this.js ***!
  \*********************************************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {


var NATIVE_BIND = __webpack_require__(/*! ../internals/function-bind-native */ "../../node_modules/core-js/internals/function-bind-native.js");

var FunctionPrototype = Function.prototype;
var call = FunctionPrototype.call;
var uncurryThisWithBind = NATIVE_BIND && FunctionPrototype.bind.bind(call, call);

module.exports = NATIVE_BIND ? uncurryThisWithBind : function (fn) {
  return function () {
    return call.apply(fn, arguments);
  };
};


/***/ }),

/***/ "../../node_modules/core-js/internals/get-built-in.js":
/*!************************************************************!*\
  !*** ../../node_modules/core-js/internals/get-built-in.js ***!
  \************************************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {


var global = __webpack_require__(/*! ../internals/global */ "../../node_modules/core-js/internals/global.js");
var isCallable = __webpack_require__(/*! ../internals/is-callable */ "../../node_modules/core-js/internals/is-callable.js");

var aFunction = function (argument) {
  return isCallable(argument) ? argument : undefined;
};

module.exports = function (namespace, method) {
  return arguments.length < 2 ? aFunction(global[namespace]) : global[namespace] && global[namespace][method];
};


/***/ }),

/***/ "../../node_modules/core-js/internals/get-iterator-method.js":
/*!*******************************************************************!*\
  !*** ../../node_modules/core-js/internals/get-iterator-method.js ***!
  \*******************************************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {


var classof = __webpack_require__(/*! ../internals/classof */ "../../node_modules/core-js/internals/classof.js");
var getMethod = __webpack_require__(/*! ../internals/get-method */ "../../node_modules/core-js/internals/get-method.js");
var isNullOrUndefined = __webpack_require__(/*! ../internals/is-null-or-undefined */ "../../node_modules/core-js/internals/is-null-or-undefined.js");
var Iterators = __webpack_require__(/*! ../internals/iterators */ "../../node_modules/core-js/internals/iterators.js");
var wellKnownSymbol = __webpack_require__(/*! ../internals/well-known-symbol */ "../../node_modules/core-js/internals/well-known-symbol.js");

var ITERATOR = wellKnownSymbol('iterator');

module.exports = function (it) {
  if (!isNullOrUndefined(it)) return getMethod(it, ITERATOR)
    || getMethod(it, '@@iterator')
    || Iterators[classof(it)];
};


/***/ }),

/***/ "../../node_modules/core-js/internals/get-iterator.js":
/*!************************************************************!*\
  !*** ../../node_modules/core-js/internals/get-iterator.js ***!
  \************************************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {


var call = __webpack_require__(/*! ../internals/function-call */ "../../node_modules/core-js/internals/function-call.js");
var aCallable = __webpack_require__(/*! ../internals/a-callable */ "../../node_modules/core-js/internals/a-callable.js");
var anObject = __webpack_require__(/*! ../internals/an-object */ "../../node_modules/core-js/internals/an-object.js");
var tryToString = __webpack_require__(/*! ../internals/try-to-string */ "../../node_modules/core-js/internals/try-to-string.js");
var getIteratorMethod = __webpack_require__(/*! ../internals/get-iterator-method */ "../../node_modules/core-js/internals/get-iterator-method.js");

var $TypeError = TypeError;

module.exports = function (argument, usingIterator) {
  var iteratorMethod = arguments.length < 2 ? getIteratorMethod(argument) : usingIterator;
  if (aCallable(iteratorMethod)) return anObject(call(iteratorMethod, argument));
  throw new $TypeError(tryToString(argument) + ' is not iterable');
};


/***/ }),

/***/ "../../node_modules/core-js/internals/get-method.js":
/*!**********************************************************!*\
  !*** ../../node_modules/core-js/internals/get-method.js ***!
  \**********************************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {


var aCallable = __webpack_require__(/*! ../internals/a-callable */ "../../node_modules/core-js/internals/a-callable.js");
var isNullOrUndefined = __webpack_require__(/*! ../internals/is-null-or-undefined */ "../../node_modules/core-js/internals/is-null-or-undefined.js");

// `GetMethod` abstract operation
// https://tc39.es/ecma262/#sec-getmethod
module.exports = function (V, P) {
  var func = V[P];
  return isNullOrUndefined(func) ? undefined : aCallable(func);
};


/***/ }),

/***/ "../../node_modules/core-js/internals/get-substitution.js":
/*!****************************************************************!*\
  !*** ../../node_modules/core-js/internals/get-substitution.js ***!
  \****************************************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {


var uncurryThis = __webpack_require__(/*! ../internals/function-uncurry-this */ "../../node_modules/core-js/internals/function-uncurry-this.js");
var toObject = __webpack_require__(/*! ../internals/to-object */ "../../node_modules/core-js/internals/to-object.js");

var floor = Math.floor;
var charAt = uncurryThis(''.charAt);
var replace = uncurryThis(''.replace);
var stringSlice = uncurryThis(''.slice);
// eslint-disable-next-line redos/no-vulnerable -- safe
var SUBSTITUTION_SYMBOLS = /\$([$&'`]|\d{1,2}|<[^>]*>)/g;
var SUBSTITUTION_SYMBOLS_NO_NAMED = /\$([$&'`]|\d{1,2})/g;

// `GetSubstitution` abstract operation
// https://tc39.es/ecma262/#sec-getsubstitution
module.exports = function (matched, str, position, captures, namedCaptures, replacement) {
  var tailPos = position + matched.length;
  var m = captures.length;
  var symbols = SUBSTITUTION_SYMBOLS_NO_NAMED;
  if (namedCaptures !== undefined) {
    namedCaptures = toObject(namedCaptures);
    symbols = SUBSTITUTION_SYMBOLS;
  }
  return replace(replacement, symbols, function (match, ch) {
    var capture;
    switch (charAt(ch, 0)) {
      case '$': return '$';
      case '&': return matched;
      case '`': return stringSlice(str, 0, position);
      case "'": return stringSlice(str, tailPos);
      case '<':
        capture = namedCaptures[stringSlice(ch, 1, -1)];
        break;
      default: // \d\d?
        var n = +ch;
        if (n === 0) return match;
        if (n > m) {
          var f = floor(n / 10);
          if (f === 0) return match;
          if (f <= m) return captures[f - 1] === undefined ? charAt(ch, 1) : captures[f - 1] + charAt(ch, 1);
          return match;
        }
        capture = captures[n - 1];
    }
    return capture === undefined ? '' : capture;
  });
};


/***/ }),

/***/ "../../node_modules/core-js/internals/global.js":
/*!******************************************************!*\
  !*** ../../node_modules/core-js/internals/global.js ***!
  \******************************************************/
/***/ (function(module, __unused_webpack_exports, __webpack_require__) {


var check = function (it) {
  return it && it.Math === Math && it;
};

// https://github.com/zloirock/core-js/issues/86#issuecomment-115759028
module.exports =
  // eslint-disable-next-line es/no-global-this -- safe
  check(typeof globalThis == 'object' && globalThis) ||
  check(typeof window == 'object' && window) ||
  // eslint-disable-next-line no-restricted-globals -- safe
  check(typeof self == 'object' && self) ||
  check(typeof __webpack_require__.g == 'object' && __webpack_require__.g) ||
  check(typeof this == 'object' && this) ||
  // eslint-disable-next-line no-new-func -- fallback
  (function () { return this; })() || Function('return this')();


/***/ }),

/***/ "../../node_modules/core-js/internals/has-own-property.js":
/*!****************************************************************!*\
  !*** ../../node_modules/core-js/internals/has-own-property.js ***!
  \****************************************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {


var uncurryThis = __webpack_require__(/*! ../internals/function-uncurry-this */ "../../node_modules/core-js/internals/function-uncurry-this.js");
var toObject = __webpack_require__(/*! ../internals/to-object */ "../../node_modules/core-js/internals/to-object.js");

var hasOwnProperty = uncurryThis({}.hasOwnProperty);

// `HasOwnProperty` abstract operation
// https://tc39.es/ecma262/#sec-hasownproperty
// eslint-disable-next-line es/no-object-hasown -- safe
module.exports = Object.hasOwn || function hasOwn(it, key) {
  return hasOwnProperty(toObject(it), key);
};


/***/ }),

/***/ "../../node_modules/core-js/internals/hidden-keys.js":
/*!***********************************************************!*\
  !*** ../../node_modules/core-js/internals/hidden-keys.js ***!
  \***********************************************************/
/***/ ((module) => {


module.exports = {};


/***/ }),

/***/ "../../node_modules/core-js/internals/html.js":
/*!****************************************************!*\
  !*** ../../node_modules/core-js/internals/html.js ***!
  \****************************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {


var getBuiltIn = __webpack_require__(/*! ../internals/get-built-in */ "../../node_modules/core-js/internals/get-built-in.js");

module.exports = getBuiltIn('document', 'documentElement');


/***/ }),

/***/ "../../node_modules/core-js/internals/ie8-dom-define.js":
/*!**************************************************************!*\
  !*** ../../node_modules/core-js/internals/ie8-dom-define.js ***!
  \**************************************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {


var DESCRIPTORS = __webpack_require__(/*! ../internals/descriptors */ "../../node_modules/core-js/internals/descriptors.js");
var fails = __webpack_require__(/*! ../internals/fails */ "../../node_modules/core-js/internals/fails.js");
var createElement = __webpack_require__(/*! ../internals/document-create-element */ "../../node_modules/core-js/internals/document-create-element.js");

// Thanks to IE8 for its funny defineProperty
module.exports = !DESCRIPTORS && !fails(function () {
  // eslint-disable-next-line es/no-object-defineproperty -- required for testing
  return Object.defineProperty(createElement('div'), 'a', {
    get: function () { return 7; }
  }).a !== 7;
});


/***/ }),

/***/ "../../node_modules/core-js/internals/indexed-object.js":
/*!**************************************************************!*\
  !*** ../../node_modules/core-js/internals/indexed-object.js ***!
  \**************************************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {


var uncurryThis = __webpack_require__(/*! ../internals/function-uncurry-this */ "../../node_modules/core-js/internals/function-uncurry-this.js");
var fails = __webpack_require__(/*! ../internals/fails */ "../../node_modules/core-js/internals/fails.js");
var classof = __webpack_require__(/*! ../internals/classof-raw */ "../../node_modules/core-js/internals/classof-raw.js");

var $Object = Object;
var split = uncurryThis(''.split);

// fallback for non-array-like ES3 and non-enumerable old V8 strings
module.exports = fails(function () {
  // throws an error in rhino, see https://github.com/mozilla/rhino/issues/346
  // eslint-disable-next-line no-prototype-builtins -- safe
  return !$Object('z').propertyIsEnumerable(0);
}) ? function (it) {
  return classof(it) === 'String' ? split(it, '') : $Object(it);
} : $Object;


/***/ }),

/***/ "../../node_modules/core-js/internals/inherit-if-required.js":
/*!*******************************************************************!*\
  !*** ../../node_modules/core-js/internals/inherit-if-required.js ***!
  \*******************************************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {


var isCallable = __webpack_require__(/*! ../internals/is-callable */ "../../node_modules/core-js/internals/is-callable.js");
var isObject = __webpack_require__(/*! ../internals/is-object */ "../../node_modules/core-js/internals/is-object.js");
var setPrototypeOf = __webpack_require__(/*! ../internals/object-set-prototype-of */ "../../node_modules/core-js/internals/object-set-prototype-of.js");

// makes subclassing work correct for wrapped built-ins
module.exports = function ($this, dummy, Wrapper) {
  var NewTarget, NewTargetPrototype;
  if (
    // it can work only with native `setPrototypeOf`
    setPrototypeOf &&
    // we haven't completely correct pre-ES6 way for getting `new.target`, so use this
    isCallable(NewTarget = dummy.constructor) &&
    NewTarget !== Wrapper &&
    isObject(NewTargetPrototype = NewTarget.prototype) &&
    NewTargetPrototype !== Wrapper.prototype
  ) setPrototypeOf($this, NewTargetPrototype);
  return $this;
};


/***/ }),

/***/ "../../node_modules/core-js/internals/inspect-source.js":
/*!**************************************************************!*\
  !*** ../../node_modules/core-js/internals/inspect-source.js ***!
  \**************************************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {


var uncurryThis = __webpack_require__(/*! ../internals/function-uncurry-this */ "../../node_modules/core-js/internals/function-uncurry-this.js");
var isCallable = __webpack_require__(/*! ../internals/is-callable */ "../../node_modules/core-js/internals/is-callable.js");
var store = __webpack_require__(/*! ../internals/shared-store */ "../../node_modules/core-js/internals/shared-store.js");

var functionToString = uncurryThis(Function.toString);

// this helper broken in `core-js@3.4.1-3.4.4`, so we can't use `shared` helper
if (!isCallable(store.inspectSource)) {
  store.inspectSource = function (it) {
    return functionToString(it);
  };
}

module.exports = store.inspectSource;


/***/ }),

/***/ "../../node_modules/core-js/internals/internal-state.js":
/*!**************************************************************!*\
  !*** ../../node_modules/core-js/internals/internal-state.js ***!
  \**************************************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {


var NATIVE_WEAK_MAP = __webpack_require__(/*! ../internals/weak-map-basic-detection */ "../../node_modules/core-js/internals/weak-map-basic-detection.js");
var global = __webpack_require__(/*! ../internals/global */ "../../node_modules/core-js/internals/global.js");
var isObject = __webpack_require__(/*! ../internals/is-object */ "../../node_modules/core-js/internals/is-object.js");
var createNonEnumerableProperty = __webpack_require__(/*! ../internals/create-non-enumerable-property */ "../../node_modules/core-js/internals/create-non-enumerable-property.js");
var hasOwn = __webpack_require__(/*! ../internals/has-own-property */ "../../node_modules/core-js/internals/has-own-property.js");
var shared = __webpack_require__(/*! ../internals/shared-store */ "../../node_modules/core-js/internals/shared-store.js");
var sharedKey = __webpack_require__(/*! ../internals/shared-key */ "../../node_modules/core-js/internals/shared-key.js");
var hiddenKeys = __webpack_require__(/*! ../internals/hidden-keys */ "../../node_modules/core-js/internals/hidden-keys.js");

var OBJECT_ALREADY_INITIALIZED = 'Object already initialized';
var TypeError = global.TypeError;
var WeakMap = global.WeakMap;
var set, get, has;

var enforce = function (it) {
  return has(it) ? get(it) : set(it, {});
};

var getterFor = function (TYPE) {
  return function (it) {
    var state;
    if (!isObject(it) || (state = get(it)).type !== TYPE) {
      throw new TypeError('Incompatible receiver, ' + TYPE + ' required');
    } return state;
  };
};

if (NATIVE_WEAK_MAP || shared.state) {
  var store = shared.state || (shared.state = new WeakMap());
  /* eslint-disable no-self-assign -- prototype methods protection */
  store.get = store.get;
  store.has = store.has;
  store.set = store.set;
  /* eslint-enable no-self-assign -- prototype methods protection */
  set = function (it, metadata) {
    if (store.has(it)) throw new TypeError(OBJECT_ALREADY_INITIALIZED);
    metadata.facade = it;
    store.set(it, metadata);
    return metadata;
  };
  get = function (it) {
    return store.get(it) || {};
  };
  has = function (it) {
    return store.has(it);
  };
} else {
  var STATE = sharedKey('state');
  hiddenKeys[STATE] = true;
  set = function (it, metadata) {
    if (hasOwn(it, STATE)) throw new TypeError(OBJECT_ALREADY_INITIALIZED);
    metadata.facade = it;
    createNonEnumerableProperty(it, STATE, metadata);
    return metadata;
  };
  get = function (it) {
    return hasOwn(it, STATE) ? it[STATE] : {};
  };
  has = function (it) {
    return hasOwn(it, STATE);
  };
}

module.exports = {
  set: set,
  get: get,
  has: has,
  enforce: enforce,
  getterFor: getterFor
};


/***/ }),

/***/ "../../node_modules/core-js/internals/is-array-iterator-method.js":
/*!************************************************************************!*\
  !*** ../../node_modules/core-js/internals/is-array-iterator-method.js ***!
  \************************************************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {


var wellKnownSymbol = __webpack_require__(/*! ../internals/well-known-symbol */ "../../node_modules/core-js/internals/well-known-symbol.js");
var Iterators = __webpack_require__(/*! ../internals/iterators */ "../../node_modules/core-js/internals/iterators.js");

var ITERATOR = wellKnownSymbol('iterator');
var ArrayPrototype = Array.prototype;

// check on default Array iterator
module.exports = function (it) {
  return it !== undefined && (Iterators.Array === it || ArrayPrototype[ITERATOR] === it);
};


/***/ }),

/***/ "../../node_modules/core-js/internals/is-callable.js":
/*!***********************************************************!*\
  !*** ../../node_modules/core-js/internals/is-callable.js ***!
  \***********************************************************/
/***/ ((module) => {


// https://tc39.es/ecma262/#sec-IsHTMLDDA-internal-slot
var documentAll = typeof document == 'object' && document.all;

// `IsCallable` abstract operation
// https://tc39.es/ecma262/#sec-iscallable
// eslint-disable-next-line unicorn/no-typeof-undefined -- required for testing
module.exports = typeof documentAll == 'undefined' && documentAll !== undefined ? function (argument) {
  return typeof argument == 'function' || argument === documentAll;
} : function (argument) {
  return typeof argument == 'function';
};


/***/ }),

/***/ "../../node_modules/core-js/internals/is-constructor.js":
/*!**************************************************************!*\
  !*** ../../node_modules/core-js/internals/is-constructor.js ***!
  \**************************************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {


var uncurryThis = __webpack_require__(/*! ../internals/function-uncurry-this */ "../../node_modules/core-js/internals/function-uncurry-this.js");
var fails = __webpack_require__(/*! ../internals/fails */ "../../node_modules/core-js/internals/fails.js");
var isCallable = __webpack_require__(/*! ../internals/is-callable */ "../../node_modules/core-js/internals/is-callable.js");
var classof = __webpack_require__(/*! ../internals/classof */ "../../node_modules/core-js/internals/classof.js");
var getBuiltIn = __webpack_require__(/*! ../internals/get-built-in */ "../../node_modules/core-js/internals/get-built-in.js");
var inspectSource = __webpack_require__(/*! ../internals/inspect-source */ "../../node_modules/core-js/internals/inspect-source.js");

var noop = function () { /* empty */ };
var construct = getBuiltIn('Reflect', 'construct');
var constructorRegExp = /^\s*(?:class|function)\b/;
var exec = uncurryThis(constructorRegExp.exec);
var INCORRECT_TO_STRING = !constructorRegExp.test(noop);

var isConstructorModern = function isConstructor(argument) {
  if (!isCallable(argument)) return false;
  try {
    construct(noop, [], argument);
    return true;
  } catch (error) {
    return false;
  }
};

var isConstructorLegacy = function isConstructor(argument) {
  if (!isCallable(argument)) return false;
  switch (classof(argument)) {
    case 'AsyncFunction':
    case 'GeneratorFunction':
    case 'AsyncGeneratorFunction': return false;
  }
  try {
    // we can't check .prototype since constructors produced by .bind haven't it
    // `Function#toString` throws on some built-it function in some legacy engines
    // (for example, `DOMQuad` and similar in FF41-)
    return INCORRECT_TO_STRING || !!exec(constructorRegExp, inspectSource(argument));
  } catch (error) {
    return true;
  }
};

isConstructorLegacy.sham = true;

// `IsConstructor` abstract operation
// https://tc39.es/ecma262/#sec-isconstructor
module.exports = !construct || fails(function () {
  var called;
  return isConstructorModern(isConstructorModern.call)
    || !isConstructorModern(Object)
    || !isConstructorModern(function () { called = true; })
    || called;
}) ? isConstructorLegacy : isConstructorModern;


/***/ }),

/***/ "../../node_modules/core-js/internals/is-forced.js":
/*!*********************************************************!*\
  !*** ../../node_modules/core-js/internals/is-forced.js ***!
  \*********************************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {


var fails = __webpack_require__(/*! ../internals/fails */ "../../node_modules/core-js/internals/fails.js");
var isCallable = __webpack_require__(/*! ../internals/is-callable */ "../../node_modules/core-js/internals/is-callable.js");

var replacement = /#|\.prototype\./;

var isForced = function (feature, detection) {
  var value = data[normalize(feature)];
  return value === POLYFILL ? true
    : value === NATIVE ? false
    : isCallable(detection) ? fails(detection)
    : !!detection;
};

var normalize = isForced.normalize = function (string) {
  return String(string).replace(replacement, '.').toLowerCase();
};

var data = isForced.data = {};
var NATIVE = isForced.NATIVE = 'N';
var POLYFILL = isForced.POLYFILL = 'P';

module.exports = isForced;


/***/ }),

/***/ "../../node_modules/core-js/internals/is-null-or-undefined.js":
/*!********************************************************************!*\
  !*** ../../node_modules/core-js/internals/is-null-or-undefined.js ***!
  \********************************************************************/
/***/ ((module) => {


// we can't use just `it == null` since of `document.all` special case
// https://tc39.es/ecma262/#sec-IsHTMLDDA-internal-slot-aec
module.exports = function (it) {
  return it === null || it === undefined;
};


/***/ }),

/***/ "../../node_modules/core-js/internals/is-object.js":
/*!*********************************************************!*\
  !*** ../../node_modules/core-js/internals/is-object.js ***!
  \*********************************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {


var isCallable = __webpack_require__(/*! ../internals/is-callable */ "../../node_modules/core-js/internals/is-callable.js");

module.exports = function (it) {
  return typeof it == 'object' ? it !== null : isCallable(it);
};


/***/ }),

/***/ "../../node_modules/core-js/internals/is-possible-prototype.js":
/*!*********************************************************************!*\
  !*** ../../node_modules/core-js/internals/is-possible-prototype.js ***!
  \*********************************************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {


var isObject = __webpack_require__(/*! ../internals/is-object */ "../../node_modules/core-js/internals/is-object.js");

module.exports = function (argument) {
  return isObject(argument) || argument === null;
};


/***/ }),

/***/ "../../node_modules/core-js/internals/is-pure.js":
/*!*******************************************************!*\
  !*** ../../node_modules/core-js/internals/is-pure.js ***!
  \*******************************************************/
/***/ ((module) => {


module.exports = false;


/***/ }),

/***/ "../../node_modules/core-js/internals/is-regexp.js":
/*!*********************************************************!*\
  !*** ../../node_modules/core-js/internals/is-regexp.js ***!
  \*********************************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {


var isObject = __webpack_require__(/*! ../internals/is-object */ "../../node_modules/core-js/internals/is-object.js");
var classof = __webpack_require__(/*! ../internals/classof-raw */ "../../node_modules/core-js/internals/classof-raw.js");
var wellKnownSymbol = __webpack_require__(/*! ../internals/well-known-symbol */ "../../node_modules/core-js/internals/well-known-symbol.js");

var MATCH = wellKnownSymbol('match');

// `IsRegExp` abstract operation
// https://tc39.es/ecma262/#sec-isregexp
module.exports = function (it) {
  var isRegExp;
  return isObject(it) && ((isRegExp = it[MATCH]) !== undefined ? !!isRegExp : classof(it) === 'RegExp');
};


/***/ }),

/***/ "../../node_modules/core-js/internals/is-symbol.js":
/*!*********************************************************!*\
  !*** ../../node_modules/core-js/internals/is-symbol.js ***!
  \*********************************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {


var getBuiltIn = __webpack_require__(/*! ../internals/get-built-in */ "../../node_modules/core-js/internals/get-built-in.js");
var isCallable = __webpack_require__(/*! ../internals/is-callable */ "../../node_modules/core-js/internals/is-callable.js");
var isPrototypeOf = __webpack_require__(/*! ../internals/object-is-prototype-of */ "../../node_modules/core-js/internals/object-is-prototype-of.js");
var USE_SYMBOL_AS_UID = __webpack_require__(/*! ../internals/use-symbol-as-uid */ "../../node_modules/core-js/internals/use-symbol-as-uid.js");

var $Object = Object;

module.exports = USE_SYMBOL_AS_UID ? function (it) {
  return typeof it == 'symbol';
} : function (it) {
  var $Symbol = getBuiltIn('Symbol');
  return isCallable($Symbol) && isPrototypeOf($Symbol.prototype, $Object(it));
};


/***/ }),

/***/ "../../node_modules/core-js/internals/iterator-close.js":
/*!**************************************************************!*\
  !*** ../../node_modules/core-js/internals/iterator-close.js ***!
  \**************************************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {


var call = __webpack_require__(/*! ../internals/function-call */ "../../node_modules/core-js/internals/function-call.js");
var anObject = __webpack_require__(/*! ../internals/an-object */ "../../node_modules/core-js/internals/an-object.js");
var getMethod = __webpack_require__(/*! ../internals/get-method */ "../../node_modules/core-js/internals/get-method.js");

module.exports = function (iterator, kind, value) {
  var innerResult, innerError;
  anObject(iterator);
  try {
    innerResult = getMethod(iterator, 'return');
    if (!innerResult) {
      if (kind === 'throw') throw value;
      return value;
    }
    innerResult = call(innerResult, iterator);
  } catch (error) {
    innerError = true;
    innerResult = error;
  }
  if (kind === 'throw') throw value;
  if (innerError) throw innerResult;
  anObject(innerResult);
  return value;
};


/***/ }),

/***/ "../../node_modules/core-js/internals/iterator-create-constructor.js":
/*!***************************************************************************!*\
  !*** ../../node_modules/core-js/internals/iterator-create-constructor.js ***!
  \***************************************************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {


var IteratorPrototype = (__webpack_require__(/*! ../internals/iterators-core */ "../../node_modules/core-js/internals/iterators-core.js").IteratorPrototype);
var create = __webpack_require__(/*! ../internals/object-create */ "../../node_modules/core-js/internals/object-create.js");
var createPropertyDescriptor = __webpack_require__(/*! ../internals/create-property-descriptor */ "../../node_modules/core-js/internals/create-property-descriptor.js");
var setToStringTag = __webpack_require__(/*! ../internals/set-to-string-tag */ "../../node_modules/core-js/internals/set-to-string-tag.js");
var Iterators = __webpack_require__(/*! ../internals/iterators */ "../../node_modules/core-js/internals/iterators.js");

var returnThis = function () { return this; };

module.exports = function (IteratorConstructor, NAME, next, ENUMERABLE_NEXT) {
  var TO_STRING_TAG = NAME + ' Iterator';
  IteratorConstructor.prototype = create(IteratorPrototype, { next: createPropertyDescriptor(+!ENUMERABLE_NEXT, next) });
  setToStringTag(IteratorConstructor, TO_STRING_TAG, false, true);
  Iterators[TO_STRING_TAG] = returnThis;
  return IteratorConstructor;
};


/***/ }),

/***/ "../../node_modules/core-js/internals/iterator-define.js":
/*!***************************************************************!*\
  !*** ../../node_modules/core-js/internals/iterator-define.js ***!
  \***************************************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {


var $ = __webpack_require__(/*! ../internals/export */ "../../node_modules/core-js/internals/export.js");
var call = __webpack_require__(/*! ../internals/function-call */ "../../node_modules/core-js/internals/function-call.js");
var IS_PURE = __webpack_require__(/*! ../internals/is-pure */ "../../node_modules/core-js/internals/is-pure.js");
var FunctionName = __webpack_require__(/*! ../internals/function-name */ "../../node_modules/core-js/internals/function-name.js");
var isCallable = __webpack_require__(/*! ../internals/is-callable */ "../../node_modules/core-js/internals/is-callable.js");
var createIteratorConstructor = __webpack_require__(/*! ../internals/iterator-create-constructor */ "../../node_modules/core-js/internals/iterator-create-constructor.js");
var getPrototypeOf = __webpack_require__(/*! ../internals/object-get-prototype-of */ "../../node_modules/core-js/internals/object-get-prototype-of.js");
var setPrototypeOf = __webpack_require__(/*! ../internals/object-set-prototype-of */ "../../node_modules/core-js/internals/object-set-prototype-of.js");
var setToStringTag = __webpack_require__(/*! ../internals/set-to-string-tag */ "../../node_modules/core-js/internals/set-to-string-tag.js");
var createNonEnumerableProperty = __webpack_require__(/*! ../internals/create-non-enumerable-property */ "../../node_modules/core-js/internals/create-non-enumerable-property.js");
var defineBuiltIn = __webpack_require__(/*! ../internals/define-built-in */ "../../node_modules/core-js/internals/define-built-in.js");
var wellKnownSymbol = __webpack_require__(/*! ../internals/well-known-symbol */ "../../node_modules/core-js/internals/well-known-symbol.js");
var Iterators = __webpack_require__(/*! ../internals/iterators */ "../../node_modules/core-js/internals/iterators.js");
var IteratorsCore = __webpack_require__(/*! ../internals/iterators-core */ "../../node_modules/core-js/internals/iterators-core.js");

var PROPER_FUNCTION_NAME = FunctionName.PROPER;
var CONFIGURABLE_FUNCTION_NAME = FunctionName.CONFIGURABLE;
var IteratorPrototype = IteratorsCore.IteratorPrototype;
var BUGGY_SAFARI_ITERATORS = IteratorsCore.BUGGY_SAFARI_ITERATORS;
var ITERATOR = wellKnownSymbol('iterator');
var KEYS = 'keys';
var VALUES = 'values';
var ENTRIES = 'entries';

var returnThis = function () { return this; };

module.exports = function (Iterable, NAME, IteratorConstructor, next, DEFAULT, IS_SET, FORCED) {
  createIteratorConstructor(IteratorConstructor, NAME, next);

  var getIterationMethod = function (KIND) {
    if (KIND === DEFAULT && defaultIterator) return defaultIterator;
    if (!BUGGY_SAFARI_ITERATORS && KIND && KIND in IterablePrototype) return IterablePrototype[KIND];

    switch (KIND) {
      case KEYS: return function keys() { return new IteratorConstructor(this, KIND); };
      case VALUES: return function values() { return new IteratorConstructor(this, KIND); };
      case ENTRIES: return function entries() { return new IteratorConstructor(this, KIND); };
    }

    return function () { return new IteratorConstructor(this); };
  };

  var TO_STRING_TAG = NAME + ' Iterator';
  var INCORRECT_VALUES_NAME = false;
  var IterablePrototype = Iterable.prototype;
  var nativeIterator = IterablePrototype[ITERATOR]
    || IterablePrototype['@@iterator']
    || DEFAULT && IterablePrototype[DEFAULT];
  var defaultIterator = !BUGGY_SAFARI_ITERATORS && nativeIterator || getIterationMethod(DEFAULT);
  var anyNativeIterator = NAME === 'Array' ? IterablePrototype.entries || nativeIterator : nativeIterator;
  var CurrentIteratorPrototype, methods, KEY;

  // fix native
  if (anyNativeIterator) {
    CurrentIteratorPrototype = getPrototypeOf(anyNativeIterator.call(new Iterable()));
    if (CurrentIteratorPrototype !== Object.prototype && CurrentIteratorPrototype.next) {
      if (!IS_PURE && getPrototypeOf(CurrentIteratorPrototype) !== IteratorPrototype) {
        if (setPrototypeOf) {
          setPrototypeOf(CurrentIteratorPrototype, IteratorPrototype);
        } else if (!isCallable(CurrentIteratorPrototype[ITERATOR])) {
          defineBuiltIn(CurrentIteratorPrototype, ITERATOR, returnThis);
        }
      }
      // Set @@toStringTag to native iterators
      setToStringTag(CurrentIteratorPrototype, TO_STRING_TAG, true, true);
      if (IS_PURE) Iterators[TO_STRING_TAG] = returnThis;
    }
  }

  // fix Array.prototype.{ values, @@iterator }.name in V8 / FF
  if (PROPER_FUNCTION_NAME && DEFAULT === VALUES && nativeIterator && nativeIterator.name !== VALUES) {
    if (!IS_PURE && CONFIGURABLE_FUNCTION_NAME) {
      createNonEnumerableProperty(IterablePrototype, 'name', VALUES);
    } else {
      INCORRECT_VALUES_NAME = true;
      defaultIterator = function values() { return call(nativeIterator, this); };
    }
  }

  // export additional methods
  if (DEFAULT) {
    methods = {
      values: getIterationMethod(VALUES),
      keys: IS_SET ? defaultIterator : getIterationMethod(KEYS),
      entries: getIterationMethod(ENTRIES)
    };
    if (FORCED) for (KEY in methods) {
      if (BUGGY_SAFARI_ITERATORS || INCORRECT_VALUES_NAME || !(KEY in IterablePrototype)) {
        defineBuiltIn(IterablePrototype, KEY, methods[KEY]);
      }
    } else $({ target: NAME, proto: true, forced: BUGGY_SAFARI_ITERATORS || INCORRECT_VALUES_NAME }, methods);
  }

  // define iterator
  if ((!IS_PURE || FORCED) && IterablePrototype[ITERATOR] !== defaultIterator) {
    defineBuiltIn(IterablePrototype, ITERATOR, defaultIterator, { name: DEFAULT });
  }
  Iterators[NAME] = defaultIterator;

  return methods;
};


/***/ }),

/***/ "../../node_modules/core-js/internals/iterators-core.js":
/*!**************************************************************!*\
  !*** ../../node_modules/core-js/internals/iterators-core.js ***!
  \**************************************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {


var fails = __webpack_require__(/*! ../internals/fails */ "../../node_modules/core-js/internals/fails.js");
var isCallable = __webpack_require__(/*! ../internals/is-callable */ "../../node_modules/core-js/internals/is-callable.js");
var isObject = __webpack_require__(/*! ../internals/is-object */ "../../node_modules/core-js/internals/is-object.js");
var create = __webpack_require__(/*! ../internals/object-create */ "../../node_modules/core-js/internals/object-create.js");
var getPrototypeOf = __webpack_require__(/*! ../internals/object-get-prototype-of */ "../../node_modules/core-js/internals/object-get-prototype-of.js");
var defineBuiltIn = __webpack_require__(/*! ../internals/define-built-in */ "../../node_modules/core-js/internals/define-built-in.js");
var wellKnownSymbol = __webpack_require__(/*! ../internals/well-known-symbol */ "../../node_modules/core-js/internals/well-known-symbol.js");
var IS_PURE = __webpack_require__(/*! ../internals/is-pure */ "../../node_modules/core-js/internals/is-pure.js");

var ITERATOR = wellKnownSymbol('iterator');
var BUGGY_SAFARI_ITERATORS = false;

// `%IteratorPrototype%` object
// https://tc39.es/ecma262/#sec-%iteratorprototype%-object
var IteratorPrototype, PrototypeOfArrayIteratorPrototype, arrayIterator;

/* eslint-disable es/no-array-prototype-keys -- safe */
if ([].keys) {
  arrayIterator = [].keys();
  // Safari 8 has buggy iterators w/o `next`
  if (!('next' in arrayIterator)) BUGGY_SAFARI_ITERATORS = true;
  else {
    PrototypeOfArrayIteratorPrototype = getPrototypeOf(getPrototypeOf(arrayIterator));
    if (PrototypeOfArrayIteratorPrototype !== Object.prototype) IteratorPrototype = PrototypeOfArrayIteratorPrototype;
  }
}

var NEW_ITERATOR_PROTOTYPE = !isObject(IteratorPrototype) || fails(function () {
  var test = {};
  // FF44- legacy iterators case
  return IteratorPrototype[ITERATOR].call(test) !== test;
});

if (NEW_ITERATOR_PROTOTYPE) IteratorPrototype = {};
else if (IS_PURE) IteratorPrototype = create(IteratorPrototype);

// `%IteratorPrototype%[@@iterator]()` method
// https://tc39.es/ecma262/#sec-%iteratorprototype%-@@iterator
if (!isCallable(IteratorPrototype[ITERATOR])) {
  defineBuiltIn(IteratorPrototype, ITERATOR, function () {
    return this;
  });
}

module.exports = {
  IteratorPrototype: IteratorPrototype,
  BUGGY_SAFARI_ITERATORS: BUGGY_SAFARI_ITERATORS
};


/***/ }),

/***/ "../../node_modules/core-js/internals/iterators.js":
/*!*********************************************************!*\
  !*** ../../node_modules/core-js/internals/iterators.js ***!
  \*********************************************************/
/***/ ((module) => {


module.exports = {};


/***/ }),

/***/ "../../node_modules/core-js/internals/length-of-array-like.js":
/*!********************************************************************!*\
  !*** ../../node_modules/core-js/internals/length-of-array-like.js ***!
  \********************************************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {


var toLength = __webpack_require__(/*! ../internals/to-length */ "../../node_modules/core-js/internals/to-length.js");

// `LengthOfArrayLike` abstract operation
// https://tc39.es/ecma262/#sec-lengthofarraylike
module.exports = function (obj) {
  return toLength(obj.length);
};


/***/ }),

/***/ "../../node_modules/core-js/internals/make-built-in.js":
/*!*************************************************************!*\
  !*** ../../node_modules/core-js/internals/make-built-in.js ***!
  \*************************************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {


var uncurryThis = __webpack_require__(/*! ../internals/function-uncurry-this */ "../../node_modules/core-js/internals/function-uncurry-this.js");
var fails = __webpack_require__(/*! ../internals/fails */ "../../node_modules/core-js/internals/fails.js");
var isCallable = __webpack_require__(/*! ../internals/is-callable */ "../../node_modules/core-js/internals/is-callable.js");
var hasOwn = __webpack_require__(/*! ../internals/has-own-property */ "../../node_modules/core-js/internals/has-own-property.js");
var DESCRIPTORS = __webpack_require__(/*! ../internals/descriptors */ "../../node_modules/core-js/internals/descriptors.js");
var CONFIGURABLE_FUNCTION_NAME = (__webpack_require__(/*! ../internals/function-name */ "../../node_modules/core-js/internals/function-name.js").CONFIGURABLE);
var inspectSource = __webpack_require__(/*! ../internals/inspect-source */ "../../node_modules/core-js/internals/inspect-source.js");
var InternalStateModule = __webpack_require__(/*! ../internals/internal-state */ "../../node_modules/core-js/internals/internal-state.js");

var enforceInternalState = InternalStateModule.enforce;
var getInternalState = InternalStateModule.get;
var $String = String;
// eslint-disable-next-line es/no-object-defineproperty -- safe
var defineProperty = Object.defineProperty;
var stringSlice = uncurryThis(''.slice);
var replace = uncurryThis(''.replace);
var join = uncurryThis([].join);

var CONFIGURABLE_LENGTH = DESCRIPTORS && !fails(function () {
  return defineProperty(function () { /* empty */ }, 'length', { value: 8 }).length !== 8;
});

var TEMPLATE = String(String).split('String');

var makeBuiltIn = module.exports = function (value, name, options) {
  if (stringSlice($String(name), 0, 7) === 'Symbol(') {
    name = '[' + replace($String(name), /^Symbol\(([^)]*)\).*$/, '$1') + ']';
  }
  if (options && options.getter) name = 'get ' + name;
  if (options && options.setter) name = 'set ' + name;
  if (!hasOwn(value, 'name') || (CONFIGURABLE_FUNCTION_NAME && value.name !== name)) {
    if (DESCRIPTORS) defineProperty(value, 'name', { value: name, configurable: true });
    else value.name = name;
  }
  if (CONFIGURABLE_LENGTH && options && hasOwn(options, 'arity') && value.length !== options.arity) {
    defineProperty(value, 'length', { value: options.arity });
  }
  try {
    if (options && hasOwn(options, 'constructor') && options.constructor) {
      if (DESCRIPTORS) defineProperty(value, 'prototype', { writable: false });
    // in V8 ~ Chrome 53, prototypes of some methods, like `Array.prototype.values`, are non-writable
    } else if (value.prototype) value.prototype = undefined;
  } catch (error) { /* empty */ }
  var state = enforceInternalState(value);
  if (!hasOwn(state, 'source')) {
    state.source = join(TEMPLATE, typeof name == 'string' ? name : '');
  } return value;
};

// add fake Function#toString for correct work wrapped methods / constructors with methods like LoDash isNative
// eslint-disable-next-line no-extend-native -- required
Function.prototype.toString = makeBuiltIn(function toString() {
  return isCallable(this) && getInternalState(this).source || inspectSource(this);
}, 'toString');


/***/ }),

/***/ "../../node_modules/core-js/internals/math-trunc.js":
/*!**********************************************************!*\
  !*** ../../node_modules/core-js/internals/math-trunc.js ***!
  \**********************************************************/
/***/ ((module) => {


var ceil = Math.ceil;
var floor = Math.floor;

// `Math.trunc` method
// https://tc39.es/ecma262/#sec-math.trunc
// eslint-disable-next-line es/no-math-trunc -- safe
module.exports = Math.trunc || function trunc(x) {
  var n = +x;
  return (n > 0 ? floor : ceil)(n);
};


/***/ }),

/***/ "../../node_modules/core-js/internals/object-assign.js":
/*!*************************************************************!*\
  !*** ../../node_modules/core-js/internals/object-assign.js ***!
  \*************************************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {


var DESCRIPTORS = __webpack_require__(/*! ../internals/descriptors */ "../../node_modules/core-js/internals/descriptors.js");
var uncurryThis = __webpack_require__(/*! ../internals/function-uncurry-this */ "../../node_modules/core-js/internals/function-uncurry-this.js");
var call = __webpack_require__(/*! ../internals/function-call */ "../../node_modules/core-js/internals/function-call.js");
var fails = __webpack_require__(/*! ../internals/fails */ "../../node_modules/core-js/internals/fails.js");
var objectKeys = __webpack_require__(/*! ../internals/object-keys */ "../../node_modules/core-js/internals/object-keys.js");
var getOwnPropertySymbolsModule = __webpack_require__(/*! ../internals/object-get-own-property-symbols */ "../../node_modules/core-js/internals/object-get-own-property-symbols.js");
var propertyIsEnumerableModule = __webpack_require__(/*! ../internals/object-property-is-enumerable */ "../../node_modules/core-js/internals/object-property-is-enumerable.js");
var toObject = __webpack_require__(/*! ../internals/to-object */ "../../node_modules/core-js/internals/to-object.js");
var IndexedObject = __webpack_require__(/*! ../internals/indexed-object */ "../../node_modules/core-js/internals/indexed-object.js");

// eslint-disable-next-line es/no-object-assign -- safe
var $assign = Object.assign;
// eslint-disable-next-line es/no-object-defineproperty -- required for testing
var defineProperty = Object.defineProperty;
var concat = uncurryThis([].concat);

// `Object.assign` method
// https://tc39.es/ecma262/#sec-object.assign
module.exports = !$assign || fails(function () {
  // should have correct order of operations (Edge bug)
  if (DESCRIPTORS && $assign({ b: 1 }, $assign(defineProperty({}, 'a', {
    enumerable: true,
    get: function () {
      defineProperty(this, 'b', {
        value: 3,
        enumerable: false
      });
    }
  }), { b: 2 })).b !== 1) return true;
  // should work with symbols and should have deterministic property order (V8 bug)
  var A = {};
  var B = {};
  // eslint-disable-next-line es/no-symbol -- safe
  var symbol = Symbol('assign detection');
  var alphabet = 'abcdefghijklmnopqrst';
  A[symbol] = 7;
  alphabet.split('').forEach(function (chr) { B[chr] = chr; });
  return $assign({}, A)[symbol] !== 7 || objectKeys($assign({}, B)).join('') !== alphabet;
}) ? function assign(target, source) { // eslint-disable-line no-unused-vars -- required for `.length`
  var T = toObject(target);
  var argumentsLength = arguments.length;
  var index = 1;
  var getOwnPropertySymbols = getOwnPropertySymbolsModule.f;
  var propertyIsEnumerable = propertyIsEnumerableModule.f;
  while (argumentsLength > index) {
    var S = IndexedObject(arguments[index++]);
    var keys = getOwnPropertySymbols ? concat(objectKeys(S), getOwnPropertySymbols(S)) : objectKeys(S);
    var length = keys.length;
    var j = 0;
    var key;
    while (length > j) {
      key = keys[j++];
      if (!DESCRIPTORS || call(propertyIsEnumerable, S, key)) T[key] = S[key];
    }
  } return T;
} : $assign;


/***/ }),

/***/ "../../node_modules/core-js/internals/object-create.js":
/*!*************************************************************!*\
  !*** ../../node_modules/core-js/internals/object-create.js ***!
  \*************************************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {


/* global ActiveXObject -- old IE, WSH */
var anObject = __webpack_require__(/*! ../internals/an-object */ "../../node_modules/core-js/internals/an-object.js");
var definePropertiesModule = __webpack_require__(/*! ../internals/object-define-properties */ "../../node_modules/core-js/internals/object-define-properties.js");
var enumBugKeys = __webpack_require__(/*! ../internals/enum-bug-keys */ "../../node_modules/core-js/internals/enum-bug-keys.js");
var hiddenKeys = __webpack_require__(/*! ../internals/hidden-keys */ "../../node_modules/core-js/internals/hidden-keys.js");
var html = __webpack_require__(/*! ../internals/html */ "../../node_modules/core-js/internals/html.js");
var documentCreateElement = __webpack_require__(/*! ../internals/document-create-element */ "../../node_modules/core-js/internals/document-create-element.js");
var sharedKey = __webpack_require__(/*! ../internals/shared-key */ "../../node_modules/core-js/internals/shared-key.js");

var GT = '>';
var LT = '<';
var PROTOTYPE = 'prototype';
var SCRIPT = 'script';
var IE_PROTO = sharedKey('IE_PROTO');

var EmptyConstructor = function () { /* empty */ };

var scriptTag = function (content) {
  return LT + SCRIPT + GT + content + LT + '/' + SCRIPT + GT;
};

// Create object with fake `null` prototype: use ActiveX Object with cleared prototype
var NullProtoObjectViaActiveX = function (activeXDocument) {
  activeXDocument.write(scriptTag(''));
  activeXDocument.close();
  var temp = activeXDocument.parentWindow.Object;
  activeXDocument = null; // avoid memory leak
  return temp;
};

// Create object with fake `null` prototype: use iframe Object with cleared prototype
var NullProtoObjectViaIFrame = function () {
  // Thrash, waste and sodomy: IE GC bug
  var iframe = documentCreateElement('iframe');
  var JS = 'java' + SCRIPT + ':';
  var iframeDocument;
  iframe.style.display = 'none';
  html.appendChild(iframe);
  // https://github.com/zloirock/core-js/issues/475
  iframe.src = String(JS);
  iframeDocument = iframe.contentWindow.document;
  iframeDocument.open();
  iframeDocument.write(scriptTag('document.F=Object'));
  iframeDocument.close();
  return iframeDocument.F;
};

// Check for document.domain and active x support
// No need to use active x approach when document.domain is not set
// see https://github.com/es-shims/es5-shim/issues/150
// variation of https://github.com/kitcambridge/es5-shim/commit/4f738ac066346
// avoid IE GC bug
var activeXDocument;
var NullProtoObject = function () {
  try {
    activeXDocument = new ActiveXObject('htmlfile');
  } catch (error) { /* ignore */ }
  NullProtoObject = typeof document != 'undefined'
    ? document.domain && activeXDocument
      ? NullProtoObjectViaActiveX(activeXDocument) // old IE
      : NullProtoObjectViaIFrame()
    : NullProtoObjectViaActiveX(activeXDocument); // WSH
  var length = enumBugKeys.length;
  while (length--) delete NullProtoObject[PROTOTYPE][enumBugKeys[length]];
  return NullProtoObject();
};

hiddenKeys[IE_PROTO] = true;

// `Object.create` method
// https://tc39.es/ecma262/#sec-object.create
// eslint-disable-next-line es/no-object-create -- safe
module.exports = Object.create || function create(O, Properties) {
  var result;
  if (O !== null) {
    EmptyConstructor[PROTOTYPE] = anObject(O);
    result = new EmptyConstructor();
    EmptyConstructor[PROTOTYPE] = null;
    // add "__proto__" for Object.getPrototypeOf polyfill
    result[IE_PROTO] = O;
  } else result = NullProtoObject();
  return Properties === undefined ? result : definePropertiesModule.f(result, Properties);
};


/***/ }),

/***/ "../../node_modules/core-js/internals/object-define-properties.js":
/*!************************************************************************!*\
  !*** ../../node_modules/core-js/internals/object-define-properties.js ***!
  \************************************************************************/
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


var DESCRIPTORS = __webpack_require__(/*! ../internals/descriptors */ "../../node_modules/core-js/internals/descriptors.js");
var V8_PROTOTYPE_DEFINE_BUG = __webpack_require__(/*! ../internals/v8-prototype-define-bug */ "../../node_modules/core-js/internals/v8-prototype-define-bug.js");
var definePropertyModule = __webpack_require__(/*! ../internals/object-define-property */ "../../node_modules/core-js/internals/object-define-property.js");
var anObject = __webpack_require__(/*! ../internals/an-object */ "../../node_modules/core-js/internals/an-object.js");
var toIndexedObject = __webpack_require__(/*! ../internals/to-indexed-object */ "../../node_modules/core-js/internals/to-indexed-object.js");
var objectKeys = __webpack_require__(/*! ../internals/object-keys */ "../../node_modules/core-js/internals/object-keys.js");

// `Object.defineProperties` method
// https://tc39.es/ecma262/#sec-object.defineproperties
// eslint-disable-next-line es/no-object-defineproperties -- safe
exports.f = DESCRIPTORS && !V8_PROTOTYPE_DEFINE_BUG ? Object.defineProperties : function defineProperties(O, Properties) {
  anObject(O);
  var props = toIndexedObject(Properties);
  var keys = objectKeys(Properties);
  var length = keys.length;
  var index = 0;
  var key;
  while (length > index) definePropertyModule.f(O, key = keys[index++], props[key]);
  return O;
};


/***/ }),

/***/ "../../node_modules/core-js/internals/object-define-property.js":
/*!**********************************************************************!*\
  !*** ../../node_modules/core-js/internals/object-define-property.js ***!
  \**********************************************************************/
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


var DESCRIPTORS = __webpack_require__(/*! ../internals/descriptors */ "../../node_modules/core-js/internals/descriptors.js");
var IE8_DOM_DEFINE = __webpack_require__(/*! ../internals/ie8-dom-define */ "../../node_modules/core-js/internals/ie8-dom-define.js");
var V8_PROTOTYPE_DEFINE_BUG = __webpack_require__(/*! ../internals/v8-prototype-define-bug */ "../../node_modules/core-js/internals/v8-prototype-define-bug.js");
var anObject = __webpack_require__(/*! ../internals/an-object */ "../../node_modules/core-js/internals/an-object.js");
var toPropertyKey = __webpack_require__(/*! ../internals/to-property-key */ "../../node_modules/core-js/internals/to-property-key.js");

var $TypeError = TypeError;
// eslint-disable-next-line es/no-object-defineproperty -- safe
var $defineProperty = Object.defineProperty;
// eslint-disable-next-line es/no-object-getownpropertydescriptor -- safe
var $getOwnPropertyDescriptor = Object.getOwnPropertyDescriptor;
var ENUMERABLE = 'enumerable';
var CONFIGURABLE = 'configurable';
var WRITABLE = 'writable';

// `Object.defineProperty` method
// https://tc39.es/ecma262/#sec-object.defineproperty
exports.f = DESCRIPTORS ? V8_PROTOTYPE_DEFINE_BUG ? function defineProperty(O, P, Attributes) {
  anObject(O);
  P = toPropertyKey(P);
  anObject(Attributes);
  if (typeof O === 'function' && P === 'prototype' && 'value' in Attributes && WRITABLE in Attributes && !Attributes[WRITABLE]) {
    var current = $getOwnPropertyDescriptor(O, P);
    if (current && current[WRITABLE]) {
      O[P] = Attributes.value;
      Attributes = {
        configurable: CONFIGURABLE in Attributes ? Attributes[CONFIGURABLE] : current[CONFIGURABLE],
        enumerable: ENUMERABLE in Attributes ? Attributes[ENUMERABLE] : current[ENUMERABLE],
        writable: false
      };
    }
  } return $defineProperty(O, P, Attributes);
} : $defineProperty : function defineProperty(O, P, Attributes) {
  anObject(O);
  P = toPropertyKey(P);
  anObject(Attributes);
  if (IE8_DOM_DEFINE) try {
    return $defineProperty(O, P, Attributes);
  } catch (error) { /* empty */ }
  if ('get' in Attributes || 'set' in Attributes) throw new $TypeError('Accessors not supported');
  if ('value' in Attributes) O[P] = Attributes.value;
  return O;
};


/***/ }),

/***/ "../../node_modules/core-js/internals/object-get-own-property-descriptor.js":
/*!**********************************************************************************!*\
  !*** ../../node_modules/core-js/internals/object-get-own-property-descriptor.js ***!
  \**********************************************************************************/
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


var DESCRIPTORS = __webpack_require__(/*! ../internals/descriptors */ "../../node_modules/core-js/internals/descriptors.js");
var call = __webpack_require__(/*! ../internals/function-call */ "../../node_modules/core-js/internals/function-call.js");
var propertyIsEnumerableModule = __webpack_require__(/*! ../internals/object-property-is-enumerable */ "../../node_modules/core-js/internals/object-property-is-enumerable.js");
var createPropertyDescriptor = __webpack_require__(/*! ../internals/create-property-descriptor */ "../../node_modules/core-js/internals/create-property-descriptor.js");
var toIndexedObject = __webpack_require__(/*! ../internals/to-indexed-object */ "../../node_modules/core-js/internals/to-indexed-object.js");
var toPropertyKey = __webpack_require__(/*! ../internals/to-property-key */ "../../node_modules/core-js/internals/to-property-key.js");
var hasOwn = __webpack_require__(/*! ../internals/has-own-property */ "../../node_modules/core-js/internals/has-own-property.js");
var IE8_DOM_DEFINE = __webpack_require__(/*! ../internals/ie8-dom-define */ "../../node_modules/core-js/internals/ie8-dom-define.js");

// eslint-disable-next-line es/no-object-getownpropertydescriptor -- safe
var $getOwnPropertyDescriptor = Object.getOwnPropertyDescriptor;

// `Object.getOwnPropertyDescriptor` method
// https://tc39.es/ecma262/#sec-object.getownpropertydescriptor
exports.f = DESCRIPTORS ? $getOwnPropertyDescriptor : function getOwnPropertyDescriptor(O, P) {
  O = toIndexedObject(O);
  P = toPropertyKey(P);
  if (IE8_DOM_DEFINE) try {
    return $getOwnPropertyDescriptor(O, P);
  } catch (error) { /* empty */ }
  if (hasOwn(O, P)) return createPropertyDescriptor(!call(propertyIsEnumerableModule.f, O, P), O[P]);
};


/***/ }),

/***/ "../../node_modules/core-js/internals/object-get-own-property-names.js":
/*!*****************************************************************************!*\
  !*** ../../node_modules/core-js/internals/object-get-own-property-names.js ***!
  \*****************************************************************************/
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


var internalObjectKeys = __webpack_require__(/*! ../internals/object-keys-internal */ "../../node_modules/core-js/internals/object-keys-internal.js");
var enumBugKeys = __webpack_require__(/*! ../internals/enum-bug-keys */ "../../node_modules/core-js/internals/enum-bug-keys.js");

var hiddenKeys = enumBugKeys.concat('length', 'prototype');

// `Object.getOwnPropertyNames` method
// https://tc39.es/ecma262/#sec-object.getownpropertynames
// eslint-disable-next-line es/no-object-getownpropertynames -- safe
exports.f = Object.getOwnPropertyNames || function getOwnPropertyNames(O) {
  return internalObjectKeys(O, hiddenKeys);
};


/***/ }),

/***/ "../../node_modules/core-js/internals/object-get-own-property-symbols.js":
/*!*******************************************************************************!*\
  !*** ../../node_modules/core-js/internals/object-get-own-property-symbols.js ***!
  \*******************************************************************************/
/***/ ((__unused_webpack_module, exports) => {


// eslint-disable-next-line es/no-object-getownpropertysymbols -- safe
exports.f = Object.getOwnPropertySymbols;


/***/ }),

/***/ "../../node_modules/core-js/internals/object-get-prototype-of.js":
/*!***********************************************************************!*\
  !*** ../../node_modules/core-js/internals/object-get-prototype-of.js ***!
  \***********************************************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {


var hasOwn = __webpack_require__(/*! ../internals/has-own-property */ "../../node_modules/core-js/internals/has-own-property.js");
var isCallable = __webpack_require__(/*! ../internals/is-callable */ "../../node_modules/core-js/internals/is-callable.js");
var toObject = __webpack_require__(/*! ../internals/to-object */ "../../node_modules/core-js/internals/to-object.js");
var sharedKey = __webpack_require__(/*! ../internals/shared-key */ "../../node_modules/core-js/internals/shared-key.js");
var CORRECT_PROTOTYPE_GETTER = __webpack_require__(/*! ../internals/correct-prototype-getter */ "../../node_modules/core-js/internals/correct-prototype-getter.js");

var IE_PROTO = sharedKey('IE_PROTO');
var $Object = Object;
var ObjectPrototype = $Object.prototype;

// `Object.getPrototypeOf` method
// https://tc39.es/ecma262/#sec-object.getprototypeof
// eslint-disable-next-line es/no-object-getprototypeof -- safe
module.exports = CORRECT_PROTOTYPE_GETTER ? $Object.getPrototypeOf : function (O) {
  var object = toObject(O);
  if (hasOwn(object, IE_PROTO)) return object[IE_PROTO];
  var constructor = object.constructor;
  if (isCallable(constructor) && object instanceof constructor) {
    return constructor.prototype;
  } return object instanceof $Object ? ObjectPrototype : null;
};


/***/ }),

/***/ "../../node_modules/core-js/internals/object-is-prototype-of.js":
/*!**********************************************************************!*\
  !*** ../../node_modules/core-js/internals/object-is-prototype-of.js ***!
  \**********************************************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {


var uncurryThis = __webpack_require__(/*! ../internals/function-uncurry-this */ "../../node_modules/core-js/internals/function-uncurry-this.js");

module.exports = uncurryThis({}.isPrototypeOf);


/***/ }),

/***/ "../../node_modules/core-js/internals/object-keys-internal.js":
/*!********************************************************************!*\
  !*** ../../node_modules/core-js/internals/object-keys-internal.js ***!
  \********************************************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {


var uncurryThis = __webpack_require__(/*! ../internals/function-uncurry-this */ "../../node_modules/core-js/internals/function-uncurry-this.js");
var hasOwn = __webpack_require__(/*! ../internals/has-own-property */ "../../node_modules/core-js/internals/has-own-property.js");
var toIndexedObject = __webpack_require__(/*! ../internals/to-indexed-object */ "../../node_modules/core-js/internals/to-indexed-object.js");
var indexOf = (__webpack_require__(/*! ../internals/array-includes */ "../../node_modules/core-js/internals/array-includes.js").indexOf);
var hiddenKeys = __webpack_require__(/*! ../internals/hidden-keys */ "../../node_modules/core-js/internals/hidden-keys.js");

var push = uncurryThis([].push);

module.exports = function (object, names) {
  var O = toIndexedObject(object);
  var i = 0;
  var result = [];
  var key;
  for (key in O) !hasOwn(hiddenKeys, key) && hasOwn(O, key) && push(result, key);
  // Don't enum bug & hidden keys
  while (names.length > i) if (hasOwn(O, key = names[i++])) {
    ~indexOf(result, key) || push(result, key);
  }
  return result;
};


/***/ }),

/***/ "../../node_modules/core-js/internals/object-keys.js":
/*!***********************************************************!*\
  !*** ../../node_modules/core-js/internals/object-keys.js ***!
  \***********************************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {


var internalObjectKeys = __webpack_require__(/*! ../internals/object-keys-internal */ "../../node_modules/core-js/internals/object-keys-internal.js");
var enumBugKeys = __webpack_require__(/*! ../internals/enum-bug-keys */ "../../node_modules/core-js/internals/enum-bug-keys.js");

// `Object.keys` method
// https://tc39.es/ecma262/#sec-object.keys
// eslint-disable-next-line es/no-object-keys -- safe
module.exports = Object.keys || function keys(O) {
  return internalObjectKeys(O, enumBugKeys);
};


/***/ }),

/***/ "../../node_modules/core-js/internals/object-property-is-enumerable.js":
/*!*****************************************************************************!*\
  !*** ../../node_modules/core-js/internals/object-property-is-enumerable.js ***!
  \*****************************************************************************/
/***/ ((__unused_webpack_module, exports) => {


var $propertyIsEnumerable = {}.propertyIsEnumerable;
// eslint-disable-next-line es/no-object-getownpropertydescriptor -- safe
var getOwnPropertyDescriptor = Object.getOwnPropertyDescriptor;

// Nashorn ~ JDK8 bug
var NASHORN_BUG = getOwnPropertyDescriptor && !$propertyIsEnumerable.call({ 1: 2 }, 1);

// `Object.prototype.propertyIsEnumerable` method implementation
// https://tc39.es/ecma262/#sec-object.prototype.propertyisenumerable
exports.f = NASHORN_BUG ? function propertyIsEnumerable(V) {
  var descriptor = getOwnPropertyDescriptor(this, V);
  return !!descriptor && descriptor.enumerable;
} : $propertyIsEnumerable;


/***/ }),

/***/ "../../node_modules/core-js/internals/object-set-prototype-of.js":
/*!***********************************************************************!*\
  !*** ../../node_modules/core-js/internals/object-set-prototype-of.js ***!
  \***********************************************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {


/* eslint-disable no-proto -- safe */
var uncurryThisAccessor = __webpack_require__(/*! ../internals/function-uncurry-this-accessor */ "../../node_modules/core-js/internals/function-uncurry-this-accessor.js");
var isObject = __webpack_require__(/*! ../internals/is-object */ "../../node_modules/core-js/internals/is-object.js");
var requireObjectCoercible = __webpack_require__(/*! ../internals/require-object-coercible */ "../../node_modules/core-js/internals/require-object-coercible.js");
var aPossiblePrototype = __webpack_require__(/*! ../internals/a-possible-prototype */ "../../node_modules/core-js/internals/a-possible-prototype.js");

// `Object.setPrototypeOf` method
// https://tc39.es/ecma262/#sec-object.setprototypeof
// Works with __proto__ only. Old v8 can't work with null proto objects.
// eslint-disable-next-line es/no-object-setprototypeof -- safe
module.exports = Object.setPrototypeOf || ('__proto__' in {} ? function () {
  var CORRECT_SETTER = false;
  var test = {};
  var setter;
  try {
    setter = uncurryThisAccessor(Object.prototype, '__proto__', 'set');
    setter(test, []);
    CORRECT_SETTER = test instanceof Array;
  } catch (error) { /* empty */ }
  return function setPrototypeOf(O, proto) {
    requireObjectCoercible(O);
    aPossiblePrototype(proto);
    if (!isObject(O)) return O;
    if (CORRECT_SETTER) setter(O, proto);
    else O.__proto__ = proto;
    return O;
  };
}() : undefined);


/***/ }),

/***/ "../../node_modules/core-js/internals/ordinary-to-primitive.js":
/*!*********************************************************************!*\
  !*** ../../node_modules/core-js/internals/ordinary-to-primitive.js ***!
  \*********************************************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {


var call = __webpack_require__(/*! ../internals/function-call */ "../../node_modules/core-js/internals/function-call.js");
var isCallable = __webpack_require__(/*! ../internals/is-callable */ "../../node_modules/core-js/internals/is-callable.js");
var isObject = __webpack_require__(/*! ../internals/is-object */ "../../node_modules/core-js/internals/is-object.js");

var $TypeError = TypeError;

// `OrdinaryToPrimitive` abstract operation
// https://tc39.es/ecma262/#sec-ordinarytoprimitive
module.exports = function (input, pref) {
  var fn, val;
  if (pref === 'string' && isCallable(fn = input.toString) && !isObject(val = call(fn, input))) return val;
  if (isCallable(fn = input.valueOf) && !isObject(val = call(fn, input))) return val;
  if (pref !== 'string' && isCallable(fn = input.toString) && !isObject(val = call(fn, input))) return val;
  throw new $TypeError("Can't convert object to primitive value");
};


/***/ }),

/***/ "../../node_modules/core-js/internals/own-keys.js":
/*!********************************************************!*\
  !*** ../../node_modules/core-js/internals/own-keys.js ***!
  \********************************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {


var getBuiltIn = __webpack_require__(/*! ../internals/get-built-in */ "../../node_modules/core-js/internals/get-built-in.js");
var uncurryThis = __webpack_require__(/*! ../internals/function-uncurry-this */ "../../node_modules/core-js/internals/function-uncurry-this.js");
var getOwnPropertyNamesModule = __webpack_require__(/*! ../internals/object-get-own-property-names */ "../../node_modules/core-js/internals/object-get-own-property-names.js");
var getOwnPropertySymbolsModule = __webpack_require__(/*! ../internals/object-get-own-property-symbols */ "../../node_modules/core-js/internals/object-get-own-property-symbols.js");
var anObject = __webpack_require__(/*! ../internals/an-object */ "../../node_modules/core-js/internals/an-object.js");

var concat = uncurryThis([].concat);

// all object keys, includes non-enumerable and symbols
module.exports = getBuiltIn('Reflect', 'ownKeys') || function ownKeys(it) {
  var keys = getOwnPropertyNamesModule.f(anObject(it));
  var getOwnPropertySymbols = getOwnPropertySymbolsModule.f;
  return getOwnPropertySymbols ? concat(keys, getOwnPropertySymbols(it)) : keys;
};


/***/ }),

/***/ "../../node_modules/core-js/internals/proxy-accessor.js":
/*!**************************************************************!*\
  !*** ../../node_modules/core-js/internals/proxy-accessor.js ***!
  \**************************************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {


var defineProperty = (__webpack_require__(/*! ../internals/object-define-property */ "../../node_modules/core-js/internals/object-define-property.js").f);

module.exports = function (Target, Source, key) {
  key in Target || defineProperty(Target, key, {
    configurable: true,
    get: function () { return Source[key]; },
    set: function (it) { Source[key] = it; }
  });
};


/***/ }),

/***/ "../../node_modules/core-js/internals/regexp-exec-abstract.js":
/*!********************************************************************!*\
  !*** ../../node_modules/core-js/internals/regexp-exec-abstract.js ***!
  \********************************************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {


var call = __webpack_require__(/*! ../internals/function-call */ "../../node_modules/core-js/internals/function-call.js");
var anObject = __webpack_require__(/*! ../internals/an-object */ "../../node_modules/core-js/internals/an-object.js");
var isCallable = __webpack_require__(/*! ../internals/is-callable */ "../../node_modules/core-js/internals/is-callable.js");
var classof = __webpack_require__(/*! ../internals/classof-raw */ "../../node_modules/core-js/internals/classof-raw.js");
var regexpExec = __webpack_require__(/*! ../internals/regexp-exec */ "../../node_modules/core-js/internals/regexp-exec.js");

var $TypeError = TypeError;

// `RegExpExec` abstract operation
// https://tc39.es/ecma262/#sec-regexpexec
module.exports = function (R, S) {
  var exec = R.exec;
  if (isCallable(exec)) {
    var result = call(exec, R, S);
    if (result !== null) anObject(result);
    return result;
  }
  if (classof(R) === 'RegExp') return call(regexpExec, R, S);
  throw new $TypeError('RegExp#exec called on incompatible receiver');
};


/***/ }),

/***/ "../../node_modules/core-js/internals/regexp-exec.js":
/*!***********************************************************!*\
  !*** ../../node_modules/core-js/internals/regexp-exec.js ***!
  \***********************************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {


/* eslint-disable regexp/no-empty-capturing-group, regexp/no-empty-group, regexp/no-lazy-ends -- testing */
/* eslint-disable regexp/no-useless-quantifier -- testing */
var call = __webpack_require__(/*! ../internals/function-call */ "../../node_modules/core-js/internals/function-call.js");
var uncurryThis = __webpack_require__(/*! ../internals/function-uncurry-this */ "../../node_modules/core-js/internals/function-uncurry-this.js");
var toString = __webpack_require__(/*! ../internals/to-string */ "../../node_modules/core-js/internals/to-string.js");
var regexpFlags = __webpack_require__(/*! ../internals/regexp-flags */ "../../node_modules/core-js/internals/regexp-flags.js");
var stickyHelpers = __webpack_require__(/*! ../internals/regexp-sticky-helpers */ "../../node_modules/core-js/internals/regexp-sticky-helpers.js");
var shared = __webpack_require__(/*! ../internals/shared */ "../../node_modules/core-js/internals/shared.js");
var create = __webpack_require__(/*! ../internals/object-create */ "../../node_modules/core-js/internals/object-create.js");
var getInternalState = (__webpack_require__(/*! ../internals/internal-state */ "../../node_modules/core-js/internals/internal-state.js").get);
var UNSUPPORTED_DOT_ALL = __webpack_require__(/*! ../internals/regexp-unsupported-dot-all */ "../../node_modules/core-js/internals/regexp-unsupported-dot-all.js");
var UNSUPPORTED_NCG = __webpack_require__(/*! ../internals/regexp-unsupported-ncg */ "../../node_modules/core-js/internals/regexp-unsupported-ncg.js");

var nativeReplace = shared('native-string-replace', String.prototype.replace);
var nativeExec = RegExp.prototype.exec;
var patchedExec = nativeExec;
var charAt = uncurryThis(''.charAt);
var indexOf = uncurryThis(''.indexOf);
var replace = uncurryThis(''.replace);
var stringSlice = uncurryThis(''.slice);

var UPDATES_LAST_INDEX_WRONG = (function () {
  var re1 = /a/;
  var re2 = /b*/g;
  call(nativeExec, re1, 'a');
  call(nativeExec, re2, 'a');
  return re1.lastIndex !== 0 || re2.lastIndex !== 0;
})();

var UNSUPPORTED_Y = stickyHelpers.BROKEN_CARET;

// nonparticipating capturing group, copied from es5-shim's String#split patch.
var NPCG_INCLUDED = /()??/.exec('')[1] !== undefined;

var PATCH = UPDATES_LAST_INDEX_WRONG || NPCG_INCLUDED || UNSUPPORTED_Y || UNSUPPORTED_DOT_ALL || UNSUPPORTED_NCG;

if (PATCH) {
  patchedExec = function exec(string) {
    var re = this;
    var state = getInternalState(re);
    var str = toString(string);
    var raw = state.raw;
    var result, reCopy, lastIndex, match, i, object, group;

    if (raw) {
      raw.lastIndex = re.lastIndex;
      result = call(patchedExec, raw, str);
      re.lastIndex = raw.lastIndex;
      return result;
    }

    var groups = state.groups;
    var sticky = UNSUPPORTED_Y && re.sticky;
    var flags = call(regexpFlags, re);
    var source = re.source;
    var charsAdded = 0;
    var strCopy = str;

    if (sticky) {
      flags = replace(flags, 'y', '');
      if (indexOf(flags, 'g') === -1) {
        flags += 'g';
      }

      strCopy = stringSlice(str, re.lastIndex);
      // Support anchored sticky behavior.
      if (re.lastIndex > 0 && (!re.multiline || re.multiline && charAt(str, re.lastIndex - 1) !== '\n')) {
        source = '(?: ' + source + ')';
        strCopy = ' ' + strCopy;
        charsAdded++;
      }
      // ^(? + rx + ) is needed, in combination with some str slicing, to
      // simulate the 'y' flag.
      reCopy = new RegExp('^(?:' + source + ')', flags);
    }

    if (NPCG_INCLUDED) {
      reCopy = new RegExp('^' + source + '$(?!\\s)', flags);
    }
    if (UPDATES_LAST_INDEX_WRONG) lastIndex = re.lastIndex;

    match = call(nativeExec, sticky ? reCopy : re, strCopy);

    if (sticky) {
      if (match) {
        match.input = stringSlice(match.input, charsAdded);
        match[0] = stringSlice(match[0], charsAdded);
        match.index = re.lastIndex;
        re.lastIndex += match[0].length;
      } else re.lastIndex = 0;
    } else if (UPDATES_LAST_INDEX_WRONG && match) {
      re.lastIndex = re.global ? match.index + match[0].length : lastIndex;
    }
    if (NPCG_INCLUDED && match && match.length > 1) {
      // Fix browsers whose `exec` methods don't consistently return `undefined`
      // for NPCG, like IE8. NOTE: This doesn't work for /(.?)?/
      call(nativeReplace, match[0], reCopy, function () {
        for (i = 1; i < arguments.length - 2; i++) {
          if (arguments[i] === undefined) match[i] = undefined;
        }
      });
    }

    if (match && groups) {
      match.groups = object = create(null);
      for (i = 0; i < groups.length; i++) {
        group = groups[i];
        object[group[0]] = match[group[1]];
      }
    }

    return match;
  };
}

module.exports = patchedExec;


/***/ }),

/***/ "../../node_modules/core-js/internals/regexp-flags.js":
/*!************************************************************!*\
  !*** ../../node_modules/core-js/internals/regexp-flags.js ***!
  \************************************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {


var anObject = __webpack_require__(/*! ../internals/an-object */ "../../node_modules/core-js/internals/an-object.js");

// `RegExp.prototype.flags` getter implementation
// https://tc39.es/ecma262/#sec-get-regexp.prototype.flags
module.exports = function () {
  var that = anObject(this);
  var result = '';
  if (that.hasIndices) result += 'd';
  if (that.global) result += 'g';
  if (that.ignoreCase) result += 'i';
  if (that.multiline) result += 'm';
  if (that.dotAll) result += 's';
  if (that.unicode) result += 'u';
  if (that.unicodeSets) result += 'v';
  if (that.sticky) result += 'y';
  return result;
};


/***/ }),

/***/ "../../node_modules/core-js/internals/regexp-get-flags.js":
/*!****************************************************************!*\
  !*** ../../node_modules/core-js/internals/regexp-get-flags.js ***!
  \****************************************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {


var call = __webpack_require__(/*! ../internals/function-call */ "../../node_modules/core-js/internals/function-call.js");
var hasOwn = __webpack_require__(/*! ../internals/has-own-property */ "../../node_modules/core-js/internals/has-own-property.js");
var isPrototypeOf = __webpack_require__(/*! ../internals/object-is-prototype-of */ "../../node_modules/core-js/internals/object-is-prototype-of.js");
var regExpFlags = __webpack_require__(/*! ../internals/regexp-flags */ "../../node_modules/core-js/internals/regexp-flags.js");

var RegExpPrototype = RegExp.prototype;

module.exports = function (R) {
  var flags = R.flags;
  return flags === undefined && !('flags' in RegExpPrototype) && !hasOwn(R, 'flags') && isPrototypeOf(RegExpPrototype, R)
    ? call(regExpFlags, R) : flags;
};


/***/ }),

/***/ "../../node_modules/core-js/internals/regexp-sticky-helpers.js":
/*!*********************************************************************!*\
  !*** ../../node_modules/core-js/internals/regexp-sticky-helpers.js ***!
  \*********************************************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {


var fails = __webpack_require__(/*! ../internals/fails */ "../../node_modules/core-js/internals/fails.js");
var global = __webpack_require__(/*! ../internals/global */ "../../node_modules/core-js/internals/global.js");

// babel-minify and Closure Compiler transpiles RegExp('a', 'y') -> /a/y and it causes SyntaxError
var $RegExp = global.RegExp;

var UNSUPPORTED_Y = fails(function () {
  var re = $RegExp('a', 'y');
  re.lastIndex = 2;
  return re.exec('abcd') !== null;
});

// UC Browser bug
// https://github.com/zloirock/core-js/issues/1008
var MISSED_STICKY = UNSUPPORTED_Y || fails(function () {
  return !$RegExp('a', 'y').sticky;
});

var BROKEN_CARET = UNSUPPORTED_Y || fails(function () {
  // https://bugzilla.mozilla.org/show_bug.cgi?id=773687
  var re = $RegExp('^r', 'gy');
  re.lastIndex = 2;
  return re.exec('str') !== null;
});

module.exports = {
  BROKEN_CARET: BROKEN_CARET,
  MISSED_STICKY: MISSED_STICKY,
  UNSUPPORTED_Y: UNSUPPORTED_Y
};


/***/ }),

/***/ "../../node_modules/core-js/internals/regexp-unsupported-dot-all.js":
/*!**************************************************************************!*\
  !*** ../../node_modules/core-js/internals/regexp-unsupported-dot-all.js ***!
  \**************************************************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {


var fails = __webpack_require__(/*! ../internals/fails */ "../../node_modules/core-js/internals/fails.js");
var global = __webpack_require__(/*! ../internals/global */ "../../node_modules/core-js/internals/global.js");

// babel-minify and Closure Compiler transpiles RegExp('.', 's') -> /./s and it causes SyntaxError
var $RegExp = global.RegExp;

module.exports = fails(function () {
  var re = $RegExp('.', 's');
  return !(re.dotAll && re.test('\n') && re.flags === 's');
});


/***/ }),

/***/ "../../node_modules/core-js/internals/regexp-unsupported-ncg.js":
/*!**********************************************************************!*\
  !*** ../../node_modules/core-js/internals/regexp-unsupported-ncg.js ***!
  \**********************************************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {


var fails = __webpack_require__(/*! ../internals/fails */ "../../node_modules/core-js/internals/fails.js");
var global = __webpack_require__(/*! ../internals/global */ "../../node_modules/core-js/internals/global.js");

// babel-minify and Closure Compiler transpiles RegExp('(?<a>b)', 'g') -> /(?<a>b)/g and it causes SyntaxError
var $RegExp = global.RegExp;

module.exports = fails(function () {
  var re = $RegExp('(?<a>b)', 'g');
  return re.exec('b').groups.a !== 'b' ||
    'b'.replace(re, '$<a>c') !== 'bc';
});


/***/ }),

/***/ "../../node_modules/core-js/internals/require-object-coercible.js":
/*!************************************************************************!*\
  !*** ../../node_modules/core-js/internals/require-object-coercible.js ***!
  \************************************************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {


var isNullOrUndefined = __webpack_require__(/*! ../internals/is-null-or-undefined */ "../../node_modules/core-js/internals/is-null-or-undefined.js");

var $TypeError = TypeError;

// `RequireObjectCoercible` abstract operation
// https://tc39.es/ecma262/#sec-requireobjectcoercible
module.exports = function (it) {
  if (isNullOrUndefined(it)) throw new $TypeError("Can't call method on " + it);
  return it;
};


/***/ }),

/***/ "../../node_modules/core-js/internals/safe-get-built-in.js":
/*!*****************************************************************!*\
  !*** ../../node_modules/core-js/internals/safe-get-built-in.js ***!
  \*****************************************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {


var global = __webpack_require__(/*! ../internals/global */ "../../node_modules/core-js/internals/global.js");
var DESCRIPTORS = __webpack_require__(/*! ../internals/descriptors */ "../../node_modules/core-js/internals/descriptors.js");

// eslint-disable-next-line es/no-object-getownpropertydescriptor -- safe
var getOwnPropertyDescriptor = Object.getOwnPropertyDescriptor;

// Avoid NodeJS experimental warning
module.exports = function (name) {
  if (!DESCRIPTORS) return global[name];
  var descriptor = getOwnPropertyDescriptor(global, name);
  return descriptor && descriptor.value;
};


/***/ }),

/***/ "../../node_modules/core-js/internals/set-species.js":
/*!***********************************************************!*\
  !*** ../../node_modules/core-js/internals/set-species.js ***!
  \***********************************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {


var getBuiltIn = __webpack_require__(/*! ../internals/get-built-in */ "../../node_modules/core-js/internals/get-built-in.js");
var defineBuiltInAccessor = __webpack_require__(/*! ../internals/define-built-in-accessor */ "../../node_modules/core-js/internals/define-built-in-accessor.js");
var wellKnownSymbol = __webpack_require__(/*! ../internals/well-known-symbol */ "../../node_modules/core-js/internals/well-known-symbol.js");
var DESCRIPTORS = __webpack_require__(/*! ../internals/descriptors */ "../../node_modules/core-js/internals/descriptors.js");

var SPECIES = wellKnownSymbol('species');

module.exports = function (CONSTRUCTOR_NAME) {
  var Constructor = getBuiltIn(CONSTRUCTOR_NAME);

  if (DESCRIPTORS && Constructor && !Constructor[SPECIES]) {
    defineBuiltInAccessor(Constructor, SPECIES, {
      configurable: true,
      get: function () { return this; }
    });
  }
};


/***/ }),

/***/ "../../node_modules/core-js/internals/set-to-string-tag.js":
/*!*****************************************************************!*\
  !*** ../../node_modules/core-js/internals/set-to-string-tag.js ***!
  \*****************************************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {


var defineProperty = (__webpack_require__(/*! ../internals/object-define-property */ "../../node_modules/core-js/internals/object-define-property.js").f);
var hasOwn = __webpack_require__(/*! ../internals/has-own-property */ "../../node_modules/core-js/internals/has-own-property.js");
var wellKnownSymbol = __webpack_require__(/*! ../internals/well-known-symbol */ "../../node_modules/core-js/internals/well-known-symbol.js");

var TO_STRING_TAG = wellKnownSymbol('toStringTag');

module.exports = function (target, TAG, STATIC) {
  if (target && !STATIC) target = target.prototype;
  if (target && !hasOwn(target, TO_STRING_TAG)) {
    defineProperty(target, TO_STRING_TAG, { configurable: true, value: TAG });
  }
};


/***/ }),

/***/ "../../node_modules/core-js/internals/shared-key.js":
/*!**********************************************************!*\
  !*** ../../node_modules/core-js/internals/shared-key.js ***!
  \**********************************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {


var shared = __webpack_require__(/*! ../internals/shared */ "../../node_modules/core-js/internals/shared.js");
var uid = __webpack_require__(/*! ../internals/uid */ "../../node_modules/core-js/internals/uid.js");

var keys = shared('keys');

module.exports = function (key) {
  return keys[key] || (keys[key] = uid(key));
};


/***/ }),

/***/ "../../node_modules/core-js/internals/shared-store.js":
/*!************************************************************!*\
  !*** ../../node_modules/core-js/internals/shared-store.js ***!
  \************************************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {


var IS_PURE = __webpack_require__(/*! ../internals/is-pure */ "../../node_modules/core-js/internals/is-pure.js");
var globalThis = __webpack_require__(/*! ../internals/global */ "../../node_modules/core-js/internals/global.js");
var defineGlobalProperty = __webpack_require__(/*! ../internals/define-global-property */ "../../node_modules/core-js/internals/define-global-property.js");

var SHARED = '__core-js_shared__';
var store = module.exports = globalThis[SHARED] || defineGlobalProperty(SHARED, {});

(store.versions || (store.versions = [])).push({
  version: '3.37.1',
  mode: IS_PURE ? 'pure' : 'global',
  copyright: '© 2014-2024 Denis Pushkarev (zloirock.ru)',
  license: 'https://github.com/zloirock/core-js/blob/v3.37.1/LICENSE',
  source: 'https://github.com/zloirock/core-js'
});


/***/ }),

/***/ "../../node_modules/core-js/internals/shared.js":
/*!******************************************************!*\
  !*** ../../node_modules/core-js/internals/shared.js ***!
  \******************************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {


var store = __webpack_require__(/*! ../internals/shared-store */ "../../node_modules/core-js/internals/shared-store.js");

module.exports = function (key, value) {
  return store[key] || (store[key] = value || {});
};


/***/ }),

/***/ "../../node_modules/core-js/internals/species-constructor.js":
/*!*******************************************************************!*\
  !*** ../../node_modules/core-js/internals/species-constructor.js ***!
  \*******************************************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {


var anObject = __webpack_require__(/*! ../internals/an-object */ "../../node_modules/core-js/internals/an-object.js");
var aConstructor = __webpack_require__(/*! ../internals/a-constructor */ "../../node_modules/core-js/internals/a-constructor.js");
var isNullOrUndefined = __webpack_require__(/*! ../internals/is-null-or-undefined */ "../../node_modules/core-js/internals/is-null-or-undefined.js");
var wellKnownSymbol = __webpack_require__(/*! ../internals/well-known-symbol */ "../../node_modules/core-js/internals/well-known-symbol.js");

var SPECIES = wellKnownSymbol('species');

// `SpeciesConstructor` abstract operation
// https://tc39.es/ecma262/#sec-speciesconstructor
module.exports = function (O, defaultConstructor) {
  var C = anObject(O).constructor;
  var S;
  return C === undefined || isNullOrUndefined(S = anObject(C)[SPECIES]) ? defaultConstructor : aConstructor(S);
};


/***/ }),

/***/ "../../node_modules/core-js/internals/string-multibyte.js":
/*!****************************************************************!*\
  !*** ../../node_modules/core-js/internals/string-multibyte.js ***!
  \****************************************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {


var uncurryThis = __webpack_require__(/*! ../internals/function-uncurry-this */ "../../node_modules/core-js/internals/function-uncurry-this.js");
var toIntegerOrInfinity = __webpack_require__(/*! ../internals/to-integer-or-infinity */ "../../node_modules/core-js/internals/to-integer-or-infinity.js");
var toString = __webpack_require__(/*! ../internals/to-string */ "../../node_modules/core-js/internals/to-string.js");
var requireObjectCoercible = __webpack_require__(/*! ../internals/require-object-coercible */ "../../node_modules/core-js/internals/require-object-coercible.js");

var charAt = uncurryThis(''.charAt);
var charCodeAt = uncurryThis(''.charCodeAt);
var stringSlice = uncurryThis(''.slice);

var createMethod = function (CONVERT_TO_STRING) {
  return function ($this, pos) {
    var S = toString(requireObjectCoercible($this));
    var position = toIntegerOrInfinity(pos);
    var size = S.length;
    var first, second;
    if (position < 0 || position >= size) return CONVERT_TO_STRING ? '' : undefined;
    first = charCodeAt(S, position);
    return first < 0xD800 || first > 0xDBFF || position + 1 === size
      || (second = charCodeAt(S, position + 1)) < 0xDC00 || second > 0xDFFF
        ? CONVERT_TO_STRING
          ? charAt(S, position)
          : first
        : CONVERT_TO_STRING
          ? stringSlice(S, position, position + 2)
          : (first - 0xD800 << 10) + (second - 0xDC00) + 0x10000;
  };
};

module.exports = {
  // `String.prototype.codePointAt` method
  // https://tc39.es/ecma262/#sec-string.prototype.codepointat
  codeAt: createMethod(false),
  // `String.prototype.at` method
  // https://github.com/mathiasbynens/String.prototype.at
  charAt: createMethod(true)
};


/***/ }),

/***/ "../../node_modules/core-js/internals/string-punycode-to-ascii.js":
/*!************************************************************************!*\
  !*** ../../node_modules/core-js/internals/string-punycode-to-ascii.js ***!
  \************************************************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {


// based on https://github.com/bestiejs/punycode.js/blob/master/punycode.js
var uncurryThis = __webpack_require__(/*! ../internals/function-uncurry-this */ "../../node_modules/core-js/internals/function-uncurry-this.js");

var maxInt = 2147483647; // aka. 0x7FFFFFFF or 2^31-1
var base = 36;
var tMin = 1;
var tMax = 26;
var skew = 38;
var damp = 700;
var initialBias = 72;
var initialN = 128; // 0x80
var delimiter = '-'; // '\x2D'
var regexNonASCII = /[^\0-\u007E]/; // non-ASCII chars
var regexSeparators = /[.\u3002\uFF0E\uFF61]/g; // RFC 3490 separators
var OVERFLOW_ERROR = 'Overflow: input needs wider integers to process';
var baseMinusTMin = base - tMin;

var $RangeError = RangeError;
var exec = uncurryThis(regexSeparators.exec);
var floor = Math.floor;
var fromCharCode = String.fromCharCode;
var charCodeAt = uncurryThis(''.charCodeAt);
var join = uncurryThis([].join);
var push = uncurryThis([].push);
var replace = uncurryThis(''.replace);
var split = uncurryThis(''.split);
var toLowerCase = uncurryThis(''.toLowerCase);

/**
 * Creates an array containing the numeric code points of each Unicode
 * character in the string. While JavaScript uses UCS-2 internally,
 * this function will convert a pair of surrogate halves (each of which
 * UCS-2 exposes as separate characters) into a single code point,
 * matching UTF-16.
 */
var ucs2decode = function (string) {
  var output = [];
  var counter = 0;
  var length = string.length;
  while (counter < length) {
    var value = charCodeAt(string, counter++);
    if (value >= 0xD800 && value <= 0xDBFF && counter < length) {
      // It's a high surrogate, and there is a next character.
      var extra = charCodeAt(string, counter++);
      if ((extra & 0xFC00) === 0xDC00) { // Low surrogate.
        push(output, ((value & 0x3FF) << 10) + (extra & 0x3FF) + 0x10000);
      } else {
        // It's an unmatched surrogate; only append this code unit, in case the
        // next code unit is the high surrogate of a surrogate pair.
        push(output, value);
        counter--;
      }
    } else {
      push(output, value);
    }
  }
  return output;
};

/**
 * Converts a digit/integer into a basic code point.
 */
var digitToBasic = function (digit) {
  //  0..25 map to ASCII a..z or A..Z
  // 26..35 map to ASCII 0..9
  return digit + 22 + 75 * (digit < 26);
};

/**
 * Bias adaptation function as per section 3.4 of RFC 3492.
 * https://tools.ietf.org/html/rfc3492#section-3.4
 */
var adapt = function (delta, numPoints, firstTime) {
  var k = 0;
  delta = firstTime ? floor(delta / damp) : delta >> 1;
  delta += floor(delta / numPoints);
  while (delta > baseMinusTMin * tMax >> 1) {
    delta = floor(delta / baseMinusTMin);
    k += base;
  }
  return floor(k + (baseMinusTMin + 1) * delta / (delta + skew));
};

/**
 * Converts a string of Unicode symbols (e.g. a domain name label) to a
 * Punycode string of ASCII-only symbols.
 */
var encode = function (input) {
  var output = [];

  // Convert the input in UCS-2 to an array of Unicode code points.
  input = ucs2decode(input);

  // Cache the length.
  var inputLength = input.length;

  // Initialize the state.
  var n = initialN;
  var delta = 0;
  var bias = initialBias;
  var i, currentValue;

  // Handle the basic code points.
  for (i = 0; i < input.length; i++) {
    currentValue = input[i];
    if (currentValue < 0x80) {
      push(output, fromCharCode(currentValue));
    }
  }

  var basicLength = output.length; // number of basic code points.
  var handledCPCount = basicLength; // number of code points that have been handled;

  // Finish the basic string with a delimiter unless it's empty.
  if (basicLength) {
    push(output, delimiter);
  }

  // Main encoding loop:
  while (handledCPCount < inputLength) {
    // All non-basic code points < n have been handled already. Find the next larger one:
    var m = maxInt;
    for (i = 0; i < input.length; i++) {
      currentValue = input[i];
      if (currentValue >= n && currentValue < m) {
        m = currentValue;
      }
    }

    // Increase `delta` enough to advance the decoder's <n,i> state to <m,0>, but guard against overflow.
    var handledCPCountPlusOne = handledCPCount + 1;
    if (m - n > floor((maxInt - delta) / handledCPCountPlusOne)) {
      throw new $RangeError(OVERFLOW_ERROR);
    }

    delta += (m - n) * handledCPCountPlusOne;
    n = m;

    for (i = 0; i < input.length; i++) {
      currentValue = input[i];
      if (currentValue < n && ++delta > maxInt) {
        throw new $RangeError(OVERFLOW_ERROR);
      }
      if (currentValue === n) {
        // Represent delta as a generalized variable-length integer.
        var q = delta;
        var k = base;
        while (true) {
          var t = k <= bias ? tMin : k >= bias + tMax ? tMax : k - bias;
          if (q < t) break;
          var qMinusT = q - t;
          var baseMinusT = base - t;
          push(output, fromCharCode(digitToBasic(t + qMinusT % baseMinusT)));
          q = floor(qMinusT / baseMinusT);
          k += base;
        }

        push(output, fromCharCode(digitToBasic(q)));
        bias = adapt(delta, handledCPCountPlusOne, handledCPCount === basicLength);
        delta = 0;
        handledCPCount++;
      }
    }

    delta++;
    n++;
  }
  return join(output, '');
};

module.exports = function (input) {
  var encoded = [];
  var labels = split(replace(toLowerCase(input), regexSeparators, '\u002E'), '.');
  var i, label;
  for (i = 0; i < labels.length; i++) {
    label = labels[i];
    push(encoded, exec(regexNonASCII, label) ? 'xn--' + encode(label) : label);
  }
  return join(encoded, '.');
};


/***/ }),

/***/ "../../node_modules/core-js/internals/symbol-constructor-detection.js":
/*!****************************************************************************!*\
  !*** ../../node_modules/core-js/internals/symbol-constructor-detection.js ***!
  \****************************************************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {


/* eslint-disable es/no-symbol -- required for testing */
var V8_VERSION = __webpack_require__(/*! ../internals/engine-v8-version */ "../../node_modules/core-js/internals/engine-v8-version.js");
var fails = __webpack_require__(/*! ../internals/fails */ "../../node_modules/core-js/internals/fails.js");
var global = __webpack_require__(/*! ../internals/global */ "../../node_modules/core-js/internals/global.js");

var $String = global.String;

// eslint-disable-next-line es/no-object-getownpropertysymbols -- required for testing
module.exports = !!Object.getOwnPropertySymbols && !fails(function () {
  var symbol = Symbol('symbol detection');
  // Chrome 38 Symbol has incorrect toString conversion
  // `get-own-property-symbols` polyfill symbols converted to object are not Symbol instances
  // nb: Do not call `String` directly to avoid this being optimized out to `symbol+''` which will,
  // of course, fail.
  return !$String(symbol) || !(Object(symbol) instanceof Symbol) ||
    // Chrome 38-40 symbols are not inherited from DOM collections prototypes to instances
    !Symbol.sham && V8_VERSION && V8_VERSION < 41;
});


/***/ }),

/***/ "../../node_modules/core-js/internals/to-absolute-index.js":
/*!*****************************************************************!*\
  !*** ../../node_modules/core-js/internals/to-absolute-index.js ***!
  \*****************************************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {


var toIntegerOrInfinity = __webpack_require__(/*! ../internals/to-integer-or-infinity */ "../../node_modules/core-js/internals/to-integer-or-infinity.js");

var max = Math.max;
var min = Math.min;

// Helper for a popular repeating case of the spec:
// Let integer be ? ToInteger(index).
// If integer < 0, let result be max((length + integer), 0); else let result be min(integer, length).
module.exports = function (index, length) {
  var integer = toIntegerOrInfinity(index);
  return integer < 0 ? max(integer + length, 0) : min(integer, length);
};


/***/ }),

/***/ "../../node_modules/core-js/internals/to-indexed-object.js":
/*!*****************************************************************!*\
  !*** ../../node_modules/core-js/internals/to-indexed-object.js ***!
  \*****************************************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {


// toObject with fallback for non-array-like ES3 strings
var IndexedObject = __webpack_require__(/*! ../internals/indexed-object */ "../../node_modules/core-js/internals/indexed-object.js");
var requireObjectCoercible = __webpack_require__(/*! ../internals/require-object-coercible */ "../../node_modules/core-js/internals/require-object-coercible.js");

module.exports = function (it) {
  return IndexedObject(requireObjectCoercible(it));
};


/***/ }),

/***/ "../../node_modules/core-js/internals/to-integer-or-infinity.js":
/*!**********************************************************************!*\
  !*** ../../node_modules/core-js/internals/to-integer-or-infinity.js ***!
  \**********************************************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {


var trunc = __webpack_require__(/*! ../internals/math-trunc */ "../../node_modules/core-js/internals/math-trunc.js");

// `ToIntegerOrInfinity` abstract operation
// https://tc39.es/ecma262/#sec-tointegerorinfinity
module.exports = function (argument) {
  var number = +argument;
  // eslint-disable-next-line no-self-compare -- NaN check
  return number !== number || number === 0 ? 0 : trunc(number);
};


/***/ }),

/***/ "../../node_modules/core-js/internals/to-length.js":
/*!*********************************************************!*\
  !*** ../../node_modules/core-js/internals/to-length.js ***!
  \*********************************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {


var toIntegerOrInfinity = __webpack_require__(/*! ../internals/to-integer-or-infinity */ "../../node_modules/core-js/internals/to-integer-or-infinity.js");

var min = Math.min;

// `ToLength` abstract operation
// https://tc39.es/ecma262/#sec-tolength
module.exports = function (argument) {
  var len = toIntegerOrInfinity(argument);
  return len > 0 ? min(len, 0x1FFFFFFFFFFFFF) : 0; // 2 ** 53 - 1 == 9007199254740991
};


/***/ }),

/***/ "../../node_modules/core-js/internals/to-object.js":
/*!*********************************************************!*\
  !*** ../../node_modules/core-js/internals/to-object.js ***!
  \*********************************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {


var requireObjectCoercible = __webpack_require__(/*! ../internals/require-object-coercible */ "../../node_modules/core-js/internals/require-object-coercible.js");

var $Object = Object;

// `ToObject` abstract operation
// https://tc39.es/ecma262/#sec-toobject
module.exports = function (argument) {
  return $Object(requireObjectCoercible(argument));
};


/***/ }),

/***/ "../../node_modules/core-js/internals/to-primitive.js":
/*!************************************************************!*\
  !*** ../../node_modules/core-js/internals/to-primitive.js ***!
  \************************************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {


var call = __webpack_require__(/*! ../internals/function-call */ "../../node_modules/core-js/internals/function-call.js");
var isObject = __webpack_require__(/*! ../internals/is-object */ "../../node_modules/core-js/internals/is-object.js");
var isSymbol = __webpack_require__(/*! ../internals/is-symbol */ "../../node_modules/core-js/internals/is-symbol.js");
var getMethod = __webpack_require__(/*! ../internals/get-method */ "../../node_modules/core-js/internals/get-method.js");
var ordinaryToPrimitive = __webpack_require__(/*! ../internals/ordinary-to-primitive */ "../../node_modules/core-js/internals/ordinary-to-primitive.js");
var wellKnownSymbol = __webpack_require__(/*! ../internals/well-known-symbol */ "../../node_modules/core-js/internals/well-known-symbol.js");

var $TypeError = TypeError;
var TO_PRIMITIVE = wellKnownSymbol('toPrimitive');

// `ToPrimitive` abstract operation
// https://tc39.es/ecma262/#sec-toprimitive
module.exports = function (input, pref) {
  if (!isObject(input) || isSymbol(input)) return input;
  var exoticToPrim = getMethod(input, TO_PRIMITIVE);
  var result;
  if (exoticToPrim) {
    if (pref === undefined) pref = 'default';
    result = call(exoticToPrim, input, pref);
    if (!isObject(result) || isSymbol(result)) return result;
    throw new $TypeError("Can't convert object to primitive value");
  }
  if (pref === undefined) pref = 'number';
  return ordinaryToPrimitive(input, pref);
};


/***/ }),

/***/ "../../node_modules/core-js/internals/to-property-key.js":
/*!***************************************************************!*\
  !*** ../../node_modules/core-js/internals/to-property-key.js ***!
  \***************************************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {


var toPrimitive = __webpack_require__(/*! ../internals/to-primitive */ "../../node_modules/core-js/internals/to-primitive.js");
var isSymbol = __webpack_require__(/*! ../internals/is-symbol */ "../../node_modules/core-js/internals/is-symbol.js");

// `ToPropertyKey` abstract operation
// https://tc39.es/ecma262/#sec-topropertykey
module.exports = function (argument) {
  var key = toPrimitive(argument, 'string');
  return isSymbol(key) ? key : key + '';
};


/***/ }),

/***/ "../../node_modules/core-js/internals/to-string-tag-support.js":
/*!*********************************************************************!*\
  !*** ../../node_modules/core-js/internals/to-string-tag-support.js ***!
  \*********************************************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {


var wellKnownSymbol = __webpack_require__(/*! ../internals/well-known-symbol */ "../../node_modules/core-js/internals/well-known-symbol.js");

var TO_STRING_TAG = wellKnownSymbol('toStringTag');
var test = {};

test[TO_STRING_TAG] = 'z';

module.exports = String(test) === '[object z]';


/***/ }),

/***/ "../../node_modules/core-js/internals/to-string.js":
/*!*********************************************************!*\
  !*** ../../node_modules/core-js/internals/to-string.js ***!
  \*********************************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {


var classof = __webpack_require__(/*! ../internals/classof */ "../../node_modules/core-js/internals/classof.js");

var $String = String;

module.exports = function (argument) {
  if (classof(argument) === 'Symbol') throw new TypeError('Cannot convert a Symbol value to a string');
  return $String(argument);
};


/***/ }),

/***/ "../../node_modules/core-js/internals/try-to-string.js":
/*!*************************************************************!*\
  !*** ../../node_modules/core-js/internals/try-to-string.js ***!
  \*************************************************************/
/***/ ((module) => {


var $String = String;

module.exports = function (argument) {
  try {
    return $String(argument);
  } catch (error) {
    return 'Object';
  }
};


/***/ }),

/***/ "../../node_modules/core-js/internals/uid.js":
/*!***************************************************!*\
  !*** ../../node_modules/core-js/internals/uid.js ***!
  \***************************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {


var uncurryThis = __webpack_require__(/*! ../internals/function-uncurry-this */ "../../node_modules/core-js/internals/function-uncurry-this.js");

var id = 0;
var postfix = Math.random();
var toString = uncurryThis(1.0.toString);

module.exports = function (key) {
  return 'Symbol(' + (key === undefined ? '' : key) + ')_' + toString(++id + postfix, 36);
};


/***/ }),

/***/ "../../node_modules/core-js/internals/url-constructor-detection.js":
/*!*************************************************************************!*\
  !*** ../../node_modules/core-js/internals/url-constructor-detection.js ***!
  \*************************************************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {


var fails = __webpack_require__(/*! ../internals/fails */ "../../node_modules/core-js/internals/fails.js");
var wellKnownSymbol = __webpack_require__(/*! ../internals/well-known-symbol */ "../../node_modules/core-js/internals/well-known-symbol.js");
var DESCRIPTORS = __webpack_require__(/*! ../internals/descriptors */ "../../node_modules/core-js/internals/descriptors.js");
var IS_PURE = __webpack_require__(/*! ../internals/is-pure */ "../../node_modules/core-js/internals/is-pure.js");

var ITERATOR = wellKnownSymbol('iterator');

module.exports = !fails(function () {
  // eslint-disable-next-line unicorn/relative-url-style -- required for testing
  var url = new URL('b?a=1&b=2&c=3', 'http://a');
  var params = url.searchParams;
  var params2 = new URLSearchParams('a=1&a=2&b=3');
  var result = '';
  url.pathname = 'c%20d';
  params.forEach(function (value, key) {
    params['delete']('b');
    result += key + value;
  });
  params2['delete']('a', 2);
  // `undefined` case is a Chromium 117 bug
  // https://bugs.chromium.org/p/v8/issues/detail?id=14222
  params2['delete']('b', undefined);
  return (IS_PURE && (!url.toJSON || !params2.has('a', 1) || params2.has('a', 2) || !params2.has('a', undefined) || params2.has('b')))
    || (!params.size && (IS_PURE || !DESCRIPTORS))
    || !params.sort
    || url.href !== 'http://a/c%20d?a=1&c=3'
    || params.get('c') !== '3'
    || String(new URLSearchParams('?a=1')) !== 'a=1'
    || !params[ITERATOR]
    // throws in Edge
    || new URL('https://a@b').username !== 'a'
    || new URLSearchParams(new URLSearchParams('a=b')).get('a') !== 'b'
    // not punycoded in Edge
    || new URL('http://тест').host !== 'xn--e1aybc'
    // not escaped in Chrome 62-
    || new URL('http://a#б').hash !== '#%D0%B1'
    // fails in Chrome 66-
    || result !== 'a1c3'
    // throws in Safari
    || new URL('http://x', undefined).host !== 'x';
});


/***/ }),

/***/ "../../node_modules/core-js/internals/use-symbol-as-uid.js":
/*!*****************************************************************!*\
  !*** ../../node_modules/core-js/internals/use-symbol-as-uid.js ***!
  \*****************************************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {


/* eslint-disable es/no-symbol -- required for testing */
var NATIVE_SYMBOL = __webpack_require__(/*! ../internals/symbol-constructor-detection */ "../../node_modules/core-js/internals/symbol-constructor-detection.js");

module.exports = NATIVE_SYMBOL
  && !Symbol.sham
  && typeof Symbol.iterator == 'symbol';


/***/ }),

/***/ "../../node_modules/core-js/internals/v8-prototype-define-bug.js":
/*!***********************************************************************!*\
  !*** ../../node_modules/core-js/internals/v8-prototype-define-bug.js ***!
  \***********************************************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {


var DESCRIPTORS = __webpack_require__(/*! ../internals/descriptors */ "../../node_modules/core-js/internals/descriptors.js");
var fails = __webpack_require__(/*! ../internals/fails */ "../../node_modules/core-js/internals/fails.js");

// V8 ~ Chrome 36-
// https://bugs.chromium.org/p/v8/issues/detail?id=3334
module.exports = DESCRIPTORS && fails(function () {
  // eslint-disable-next-line es/no-object-defineproperty -- required for testing
  return Object.defineProperty(function () { /* empty */ }, 'prototype', {
    value: 42,
    writable: false
  }).prototype !== 42;
});


/***/ }),

/***/ "../../node_modules/core-js/internals/validate-arguments-length.js":
/*!*************************************************************************!*\
  !*** ../../node_modules/core-js/internals/validate-arguments-length.js ***!
  \*************************************************************************/
/***/ ((module) => {


var $TypeError = TypeError;

module.exports = function (passed, required) {
  if (passed < required) throw new $TypeError('Not enough arguments');
  return passed;
};


/***/ }),

/***/ "../../node_modules/core-js/internals/weak-map-basic-detection.js":
/*!************************************************************************!*\
  !*** ../../node_modules/core-js/internals/weak-map-basic-detection.js ***!
  \************************************************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {


var global = __webpack_require__(/*! ../internals/global */ "../../node_modules/core-js/internals/global.js");
var isCallable = __webpack_require__(/*! ../internals/is-callable */ "../../node_modules/core-js/internals/is-callable.js");

var WeakMap = global.WeakMap;

module.exports = isCallable(WeakMap) && /native code/.test(String(WeakMap));


/***/ }),

/***/ "../../node_modules/core-js/internals/well-known-symbol.js":
/*!*****************************************************************!*\
  !*** ../../node_modules/core-js/internals/well-known-symbol.js ***!
  \*****************************************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {


var global = __webpack_require__(/*! ../internals/global */ "../../node_modules/core-js/internals/global.js");
var shared = __webpack_require__(/*! ../internals/shared */ "../../node_modules/core-js/internals/shared.js");
var hasOwn = __webpack_require__(/*! ../internals/has-own-property */ "../../node_modules/core-js/internals/has-own-property.js");
var uid = __webpack_require__(/*! ../internals/uid */ "../../node_modules/core-js/internals/uid.js");
var NATIVE_SYMBOL = __webpack_require__(/*! ../internals/symbol-constructor-detection */ "../../node_modules/core-js/internals/symbol-constructor-detection.js");
var USE_SYMBOL_AS_UID = __webpack_require__(/*! ../internals/use-symbol-as-uid */ "../../node_modules/core-js/internals/use-symbol-as-uid.js");

var Symbol = global.Symbol;
var WellKnownSymbolsStore = shared('wks');
var createWellKnownSymbol = USE_SYMBOL_AS_UID ? Symbol['for'] || Symbol : Symbol && Symbol.withoutSetter || uid;

module.exports = function (name) {
  if (!hasOwn(WellKnownSymbolsStore, name)) {
    WellKnownSymbolsStore[name] = NATIVE_SYMBOL && hasOwn(Symbol, name)
      ? Symbol[name]
      : createWellKnownSymbol('Symbol.' + name);
  } return WellKnownSymbolsStore[name];
};


/***/ }),

/***/ "../../node_modules/core-js/modules/es.array.includes.js":
/*!***************************************************************!*\
  !*** ../../node_modules/core-js/modules/es.array.includes.js ***!
  \***************************************************************/
/***/ ((__unused_webpack_module, __unused_webpack_exports, __webpack_require__) => {


var $ = __webpack_require__(/*! ../internals/export */ "../../node_modules/core-js/internals/export.js");
var $includes = (__webpack_require__(/*! ../internals/array-includes */ "../../node_modules/core-js/internals/array-includes.js").includes);
var fails = __webpack_require__(/*! ../internals/fails */ "../../node_modules/core-js/internals/fails.js");
var addToUnscopables = __webpack_require__(/*! ../internals/add-to-unscopables */ "../../node_modules/core-js/internals/add-to-unscopables.js");

// FF99+ bug
var BROKEN_ON_SPARSE = fails(function () {
  // eslint-disable-next-line es/no-array-prototype-includes -- detection
  return !Array(1).includes();
});

// `Array.prototype.includes` method
// https://tc39.es/ecma262/#sec-array.prototype.includes
$({ target: 'Array', proto: true, forced: BROKEN_ON_SPARSE }, {
  includes: function includes(el /* , fromIndex = 0 */) {
    return $includes(this, el, arguments.length > 1 ? arguments[1] : undefined);
  }
});

// https://tc39.es/ecma262/#sec-array.prototype-@@unscopables
addToUnscopables('includes');


/***/ }),

/***/ "../../node_modules/core-js/modules/es.array.iterator.js":
/*!***************************************************************!*\
  !*** ../../node_modules/core-js/modules/es.array.iterator.js ***!
  \***************************************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {


var toIndexedObject = __webpack_require__(/*! ../internals/to-indexed-object */ "../../node_modules/core-js/internals/to-indexed-object.js");
var addToUnscopables = __webpack_require__(/*! ../internals/add-to-unscopables */ "../../node_modules/core-js/internals/add-to-unscopables.js");
var Iterators = __webpack_require__(/*! ../internals/iterators */ "../../node_modules/core-js/internals/iterators.js");
var InternalStateModule = __webpack_require__(/*! ../internals/internal-state */ "../../node_modules/core-js/internals/internal-state.js");
var defineProperty = (__webpack_require__(/*! ../internals/object-define-property */ "../../node_modules/core-js/internals/object-define-property.js").f);
var defineIterator = __webpack_require__(/*! ../internals/iterator-define */ "../../node_modules/core-js/internals/iterator-define.js");
var createIterResultObject = __webpack_require__(/*! ../internals/create-iter-result-object */ "../../node_modules/core-js/internals/create-iter-result-object.js");
var IS_PURE = __webpack_require__(/*! ../internals/is-pure */ "../../node_modules/core-js/internals/is-pure.js");
var DESCRIPTORS = __webpack_require__(/*! ../internals/descriptors */ "../../node_modules/core-js/internals/descriptors.js");

var ARRAY_ITERATOR = 'Array Iterator';
var setInternalState = InternalStateModule.set;
var getInternalState = InternalStateModule.getterFor(ARRAY_ITERATOR);

// `Array.prototype.entries` method
// https://tc39.es/ecma262/#sec-array.prototype.entries
// `Array.prototype.keys` method
// https://tc39.es/ecma262/#sec-array.prototype.keys
// `Array.prototype.values` method
// https://tc39.es/ecma262/#sec-array.prototype.values
// `Array.prototype[@@iterator]` method
// https://tc39.es/ecma262/#sec-array.prototype-@@iterator
// `CreateArrayIterator` internal method
// https://tc39.es/ecma262/#sec-createarrayiterator
module.exports = defineIterator(Array, 'Array', function (iterated, kind) {
  setInternalState(this, {
    type: ARRAY_ITERATOR,
    target: toIndexedObject(iterated), // target
    index: 0,                          // next index
    kind: kind                         // kind
  });
// `%ArrayIteratorPrototype%.next` method
// https://tc39.es/ecma262/#sec-%arrayiteratorprototype%.next
}, function () {
  var state = getInternalState(this);
  var target = state.target;
  var index = state.index++;
  if (!target || index >= target.length) {
    state.target = undefined;
    return createIterResultObject(undefined, true);
  }
  switch (state.kind) {
    case 'keys': return createIterResultObject(index, false);
    case 'values': return createIterResultObject(target[index], false);
  } return createIterResultObject([index, target[index]], false);
}, 'values');

// argumentsList[@@iterator] is %ArrayProto_values%
// https://tc39.es/ecma262/#sec-createunmappedargumentsobject
// https://tc39.es/ecma262/#sec-createmappedargumentsobject
var values = Iterators.Arguments = Iterators.Array;

// https://tc39.es/ecma262/#sec-array.prototype-@@unscopables
addToUnscopables('keys');
addToUnscopables('values');
addToUnscopables('entries');

// V8 ~ Chrome 45- bug
if (!IS_PURE && DESCRIPTORS && values.name !== 'values') try {
  defineProperty(values, 'name', { value: 'values' });
} catch (error) { /* empty */ }


/***/ }),

/***/ "../../node_modules/core-js/modules/es.regexp.constructor.js":
/*!*******************************************************************!*\
  !*** ../../node_modules/core-js/modules/es.regexp.constructor.js ***!
  \*******************************************************************/
/***/ ((__unused_webpack_module, __unused_webpack_exports, __webpack_require__) => {


var DESCRIPTORS = __webpack_require__(/*! ../internals/descriptors */ "../../node_modules/core-js/internals/descriptors.js");
var global = __webpack_require__(/*! ../internals/global */ "../../node_modules/core-js/internals/global.js");
var uncurryThis = __webpack_require__(/*! ../internals/function-uncurry-this */ "../../node_modules/core-js/internals/function-uncurry-this.js");
var isForced = __webpack_require__(/*! ../internals/is-forced */ "../../node_modules/core-js/internals/is-forced.js");
var inheritIfRequired = __webpack_require__(/*! ../internals/inherit-if-required */ "../../node_modules/core-js/internals/inherit-if-required.js");
var createNonEnumerableProperty = __webpack_require__(/*! ../internals/create-non-enumerable-property */ "../../node_modules/core-js/internals/create-non-enumerable-property.js");
var create = __webpack_require__(/*! ../internals/object-create */ "../../node_modules/core-js/internals/object-create.js");
var getOwnPropertyNames = (__webpack_require__(/*! ../internals/object-get-own-property-names */ "../../node_modules/core-js/internals/object-get-own-property-names.js").f);
var isPrototypeOf = __webpack_require__(/*! ../internals/object-is-prototype-of */ "../../node_modules/core-js/internals/object-is-prototype-of.js");
var isRegExp = __webpack_require__(/*! ../internals/is-regexp */ "../../node_modules/core-js/internals/is-regexp.js");
var toString = __webpack_require__(/*! ../internals/to-string */ "../../node_modules/core-js/internals/to-string.js");
var getRegExpFlags = __webpack_require__(/*! ../internals/regexp-get-flags */ "../../node_modules/core-js/internals/regexp-get-flags.js");
var stickyHelpers = __webpack_require__(/*! ../internals/regexp-sticky-helpers */ "../../node_modules/core-js/internals/regexp-sticky-helpers.js");
var proxyAccessor = __webpack_require__(/*! ../internals/proxy-accessor */ "../../node_modules/core-js/internals/proxy-accessor.js");
var defineBuiltIn = __webpack_require__(/*! ../internals/define-built-in */ "../../node_modules/core-js/internals/define-built-in.js");
var fails = __webpack_require__(/*! ../internals/fails */ "../../node_modules/core-js/internals/fails.js");
var hasOwn = __webpack_require__(/*! ../internals/has-own-property */ "../../node_modules/core-js/internals/has-own-property.js");
var enforceInternalState = (__webpack_require__(/*! ../internals/internal-state */ "../../node_modules/core-js/internals/internal-state.js").enforce);
var setSpecies = __webpack_require__(/*! ../internals/set-species */ "../../node_modules/core-js/internals/set-species.js");
var wellKnownSymbol = __webpack_require__(/*! ../internals/well-known-symbol */ "../../node_modules/core-js/internals/well-known-symbol.js");
var UNSUPPORTED_DOT_ALL = __webpack_require__(/*! ../internals/regexp-unsupported-dot-all */ "../../node_modules/core-js/internals/regexp-unsupported-dot-all.js");
var UNSUPPORTED_NCG = __webpack_require__(/*! ../internals/regexp-unsupported-ncg */ "../../node_modules/core-js/internals/regexp-unsupported-ncg.js");

var MATCH = wellKnownSymbol('match');
var NativeRegExp = global.RegExp;
var RegExpPrototype = NativeRegExp.prototype;
var SyntaxError = global.SyntaxError;
var exec = uncurryThis(RegExpPrototype.exec);
var charAt = uncurryThis(''.charAt);
var replace = uncurryThis(''.replace);
var stringIndexOf = uncurryThis(''.indexOf);
var stringSlice = uncurryThis(''.slice);
// TODO: Use only proper RegExpIdentifierName
var IS_NCG = /^\?<[^\s\d!#%&*+<=>@^][^\s!#%&*+<=>@^]*>/;
var re1 = /a/g;
var re2 = /a/g;

// "new" should create a new object, old webkit bug
var CORRECT_NEW = new NativeRegExp(re1) !== re1;

var MISSED_STICKY = stickyHelpers.MISSED_STICKY;
var UNSUPPORTED_Y = stickyHelpers.UNSUPPORTED_Y;

var BASE_FORCED = DESCRIPTORS &&
  (!CORRECT_NEW || MISSED_STICKY || UNSUPPORTED_DOT_ALL || UNSUPPORTED_NCG || fails(function () {
    re2[MATCH] = false;
    // RegExp constructor can alter flags and IsRegExp works correct with @@match
    return NativeRegExp(re1) !== re1 || NativeRegExp(re2) === re2 || String(NativeRegExp(re1, 'i')) !== '/a/i';
  }));

var handleDotAll = function (string) {
  var length = string.length;
  var index = 0;
  var result = '';
  var brackets = false;
  var chr;
  for (; index <= length; index++) {
    chr = charAt(string, index);
    if (chr === '\\') {
      result += chr + charAt(string, ++index);
      continue;
    }
    if (!brackets && chr === '.') {
      result += '[\\s\\S]';
    } else {
      if (chr === '[') {
        brackets = true;
      } else if (chr === ']') {
        brackets = false;
      } result += chr;
    }
  } return result;
};

var handleNCG = function (string) {
  var length = string.length;
  var index = 0;
  var result = '';
  var named = [];
  var names = create(null);
  var brackets = false;
  var ncg = false;
  var groupid = 0;
  var groupname = '';
  var chr;
  for (; index <= length; index++) {
    chr = charAt(string, index);
    if (chr === '\\') {
      chr += charAt(string, ++index);
    } else if (chr === ']') {
      brackets = false;
    } else if (!brackets) switch (true) {
      case chr === '[':
        brackets = true;
        break;
      case chr === '(':
        if (exec(IS_NCG, stringSlice(string, index + 1))) {
          index += 2;
          ncg = true;
        }
        result += chr;
        groupid++;
        continue;
      case chr === '>' && ncg:
        if (groupname === '' || hasOwn(names, groupname)) {
          throw new SyntaxError('Invalid capture group name');
        }
        names[groupname] = true;
        named[named.length] = [groupname, groupid];
        ncg = false;
        groupname = '';
        continue;
    }
    if (ncg) groupname += chr;
    else result += chr;
  } return [result, named];
};

// `RegExp` constructor
// https://tc39.es/ecma262/#sec-regexp-constructor
if (isForced('RegExp', BASE_FORCED)) {
  var RegExpWrapper = function RegExp(pattern, flags) {
    var thisIsRegExp = isPrototypeOf(RegExpPrototype, this);
    var patternIsRegExp = isRegExp(pattern);
    var flagsAreUndefined = flags === undefined;
    var groups = [];
    var rawPattern = pattern;
    var rawFlags, dotAll, sticky, handled, result, state;

    if (!thisIsRegExp && patternIsRegExp && flagsAreUndefined && pattern.constructor === RegExpWrapper) {
      return pattern;
    }

    if (patternIsRegExp || isPrototypeOf(RegExpPrototype, pattern)) {
      pattern = pattern.source;
      if (flagsAreUndefined) flags = getRegExpFlags(rawPattern);
    }

    pattern = pattern === undefined ? '' : toString(pattern);
    flags = flags === undefined ? '' : toString(flags);
    rawPattern = pattern;

    if (UNSUPPORTED_DOT_ALL && 'dotAll' in re1) {
      dotAll = !!flags && stringIndexOf(flags, 's') > -1;
      if (dotAll) flags = replace(flags, /s/g, '');
    }

    rawFlags = flags;

    if (MISSED_STICKY && 'sticky' in re1) {
      sticky = !!flags && stringIndexOf(flags, 'y') > -1;
      if (sticky && UNSUPPORTED_Y) flags = replace(flags, /y/g, '');
    }

    if (UNSUPPORTED_NCG) {
      handled = handleNCG(pattern);
      pattern = handled[0];
      groups = handled[1];
    }

    result = inheritIfRequired(NativeRegExp(pattern, flags), thisIsRegExp ? this : RegExpPrototype, RegExpWrapper);

    if (dotAll || sticky || groups.length) {
      state = enforceInternalState(result);
      if (dotAll) {
        state.dotAll = true;
        state.raw = RegExpWrapper(handleDotAll(pattern), rawFlags);
      }
      if (sticky) state.sticky = true;
      if (groups.length) state.groups = groups;
    }

    if (pattern !== rawPattern) try {
      // fails in old engines, but we have no alternatives for unsupported regex syntax
      createNonEnumerableProperty(result, 'source', rawPattern === '' ? '(?:)' : rawPattern);
    } catch (error) { /* empty */ }

    return result;
  };

  for (var keys = getOwnPropertyNames(NativeRegExp), index = 0; keys.length > index;) {
    proxyAccessor(RegExpWrapper, NativeRegExp, keys[index++]);
  }

  RegExpPrototype.constructor = RegExpWrapper;
  RegExpWrapper.prototype = RegExpPrototype;
  defineBuiltIn(global, 'RegExp', RegExpWrapper, { constructor: true });
}

// https://tc39.es/ecma262/#sec-get-regexp-@@species
setSpecies('RegExp');


/***/ }),

/***/ "../../node_modules/core-js/modules/es.regexp.exec.js":
/*!************************************************************!*\
  !*** ../../node_modules/core-js/modules/es.regexp.exec.js ***!
  \************************************************************/
/***/ ((__unused_webpack_module, __unused_webpack_exports, __webpack_require__) => {


var $ = __webpack_require__(/*! ../internals/export */ "../../node_modules/core-js/internals/export.js");
var exec = __webpack_require__(/*! ../internals/regexp-exec */ "../../node_modules/core-js/internals/regexp-exec.js");

// `RegExp.prototype.exec` method
// https://tc39.es/ecma262/#sec-regexp.prototype.exec
$({ target: 'RegExp', proto: true, forced: /./.exec !== exec }, {
  exec: exec
});


/***/ }),

/***/ "../../node_modules/core-js/modules/es.string.iterator.js":
/*!****************************************************************!*\
  !*** ../../node_modules/core-js/modules/es.string.iterator.js ***!
  \****************************************************************/
/***/ ((__unused_webpack_module, __unused_webpack_exports, __webpack_require__) => {


var charAt = (__webpack_require__(/*! ../internals/string-multibyte */ "../../node_modules/core-js/internals/string-multibyte.js").charAt);
var toString = __webpack_require__(/*! ../internals/to-string */ "../../node_modules/core-js/internals/to-string.js");
var InternalStateModule = __webpack_require__(/*! ../internals/internal-state */ "../../node_modules/core-js/internals/internal-state.js");
var defineIterator = __webpack_require__(/*! ../internals/iterator-define */ "../../node_modules/core-js/internals/iterator-define.js");
var createIterResultObject = __webpack_require__(/*! ../internals/create-iter-result-object */ "../../node_modules/core-js/internals/create-iter-result-object.js");

var STRING_ITERATOR = 'String Iterator';
var setInternalState = InternalStateModule.set;
var getInternalState = InternalStateModule.getterFor(STRING_ITERATOR);

// `String.prototype[@@iterator]` method
// https://tc39.es/ecma262/#sec-string.prototype-@@iterator
defineIterator(String, 'String', function (iterated) {
  setInternalState(this, {
    type: STRING_ITERATOR,
    string: toString(iterated),
    index: 0
  });
// `%StringIteratorPrototype%.next` method
// https://tc39.es/ecma262/#sec-%stringiteratorprototype%.next
}, function next() {
  var state = getInternalState(this);
  var string = state.string;
  var index = state.index;
  var point;
  if (index >= string.length) return createIterResultObject(undefined, true);
  point = charAt(string, index);
  state.index += point.length;
  return createIterResultObject(point, false);
});


/***/ }),

/***/ "../../node_modules/core-js/modules/es.string.match-all.js":
/*!*****************************************************************!*\
  !*** ../../node_modules/core-js/modules/es.string.match-all.js ***!
  \*****************************************************************/
/***/ ((__unused_webpack_module, __unused_webpack_exports, __webpack_require__) => {


/* eslint-disable es/no-string-prototype-matchall -- safe */
var $ = __webpack_require__(/*! ../internals/export */ "../../node_modules/core-js/internals/export.js");
var call = __webpack_require__(/*! ../internals/function-call */ "../../node_modules/core-js/internals/function-call.js");
var uncurryThis = __webpack_require__(/*! ../internals/function-uncurry-this-clause */ "../../node_modules/core-js/internals/function-uncurry-this-clause.js");
var createIteratorConstructor = __webpack_require__(/*! ../internals/iterator-create-constructor */ "../../node_modules/core-js/internals/iterator-create-constructor.js");
var createIterResultObject = __webpack_require__(/*! ../internals/create-iter-result-object */ "../../node_modules/core-js/internals/create-iter-result-object.js");
var requireObjectCoercible = __webpack_require__(/*! ../internals/require-object-coercible */ "../../node_modules/core-js/internals/require-object-coercible.js");
var toLength = __webpack_require__(/*! ../internals/to-length */ "../../node_modules/core-js/internals/to-length.js");
var toString = __webpack_require__(/*! ../internals/to-string */ "../../node_modules/core-js/internals/to-string.js");
var anObject = __webpack_require__(/*! ../internals/an-object */ "../../node_modules/core-js/internals/an-object.js");
var isNullOrUndefined = __webpack_require__(/*! ../internals/is-null-or-undefined */ "../../node_modules/core-js/internals/is-null-or-undefined.js");
var classof = __webpack_require__(/*! ../internals/classof-raw */ "../../node_modules/core-js/internals/classof-raw.js");
var isRegExp = __webpack_require__(/*! ../internals/is-regexp */ "../../node_modules/core-js/internals/is-regexp.js");
var getRegExpFlags = __webpack_require__(/*! ../internals/regexp-get-flags */ "../../node_modules/core-js/internals/regexp-get-flags.js");
var getMethod = __webpack_require__(/*! ../internals/get-method */ "../../node_modules/core-js/internals/get-method.js");
var defineBuiltIn = __webpack_require__(/*! ../internals/define-built-in */ "../../node_modules/core-js/internals/define-built-in.js");
var fails = __webpack_require__(/*! ../internals/fails */ "../../node_modules/core-js/internals/fails.js");
var wellKnownSymbol = __webpack_require__(/*! ../internals/well-known-symbol */ "../../node_modules/core-js/internals/well-known-symbol.js");
var speciesConstructor = __webpack_require__(/*! ../internals/species-constructor */ "../../node_modules/core-js/internals/species-constructor.js");
var advanceStringIndex = __webpack_require__(/*! ../internals/advance-string-index */ "../../node_modules/core-js/internals/advance-string-index.js");
var regExpExec = __webpack_require__(/*! ../internals/regexp-exec-abstract */ "../../node_modules/core-js/internals/regexp-exec-abstract.js");
var InternalStateModule = __webpack_require__(/*! ../internals/internal-state */ "../../node_modules/core-js/internals/internal-state.js");
var IS_PURE = __webpack_require__(/*! ../internals/is-pure */ "../../node_modules/core-js/internals/is-pure.js");

var MATCH_ALL = wellKnownSymbol('matchAll');
var REGEXP_STRING = 'RegExp String';
var REGEXP_STRING_ITERATOR = REGEXP_STRING + ' Iterator';
var setInternalState = InternalStateModule.set;
var getInternalState = InternalStateModule.getterFor(REGEXP_STRING_ITERATOR);
var RegExpPrototype = RegExp.prototype;
var $TypeError = TypeError;
var stringIndexOf = uncurryThis(''.indexOf);
var nativeMatchAll = uncurryThis(''.matchAll);

var WORKS_WITH_NON_GLOBAL_REGEX = !!nativeMatchAll && !fails(function () {
  nativeMatchAll('a', /./);
});

var $RegExpStringIterator = createIteratorConstructor(function RegExpStringIterator(regexp, string, $global, fullUnicode) {
  setInternalState(this, {
    type: REGEXP_STRING_ITERATOR,
    regexp: regexp,
    string: string,
    global: $global,
    unicode: fullUnicode,
    done: false
  });
}, REGEXP_STRING, function next() {
  var state = getInternalState(this);
  if (state.done) return createIterResultObject(undefined, true);
  var R = state.regexp;
  var S = state.string;
  var match = regExpExec(R, S);
  if (match === null) {
    state.done = true;
    return createIterResultObject(undefined, true);
  }
  if (state.global) {
    if (toString(match[0]) === '') R.lastIndex = advanceStringIndex(S, toLength(R.lastIndex), state.unicode);
    return createIterResultObject(match, false);
  }
  state.done = true;
  return createIterResultObject(match, false);
});

var $matchAll = function (string) {
  var R = anObject(this);
  var S = toString(string);
  var C = speciesConstructor(R, RegExp);
  var flags = toString(getRegExpFlags(R));
  var matcher, $global, fullUnicode;
  matcher = new C(C === RegExp ? R.source : R, flags);
  $global = !!~stringIndexOf(flags, 'g');
  fullUnicode = !!~stringIndexOf(flags, 'u');
  matcher.lastIndex = toLength(R.lastIndex);
  return new $RegExpStringIterator(matcher, S, $global, fullUnicode);
};

// `String.prototype.matchAll` method
// https://tc39.es/ecma262/#sec-string.prototype.matchall
$({ target: 'String', proto: true, forced: WORKS_WITH_NON_GLOBAL_REGEX }, {
  matchAll: function matchAll(regexp) {
    var O = requireObjectCoercible(this);
    var flags, S, matcher, rx;
    if (!isNullOrUndefined(regexp)) {
      if (isRegExp(regexp)) {
        flags = toString(requireObjectCoercible(getRegExpFlags(regexp)));
        if (!~stringIndexOf(flags, 'g')) throw new $TypeError('`.matchAll` does not allow non-global regexes');
      }
      if (WORKS_WITH_NON_GLOBAL_REGEX) return nativeMatchAll(O, regexp);
      matcher = getMethod(regexp, MATCH_ALL);
      if (matcher === undefined && IS_PURE && classof(regexp) === 'RegExp') matcher = $matchAll;
      if (matcher) return call(matcher, regexp, O);
    } else if (WORKS_WITH_NON_GLOBAL_REGEX) return nativeMatchAll(O, regexp);
    S = toString(O);
    rx = new RegExp(regexp, 'g');
    return IS_PURE ? call($matchAll, rx, S) : rx[MATCH_ALL](S);
  }
});

IS_PURE || MATCH_ALL in RegExpPrototype || defineBuiltIn(RegExpPrototype, MATCH_ALL, $matchAll);


/***/ }),

/***/ "../../node_modules/core-js/modules/es.string.replace-all.js":
/*!*******************************************************************!*\
  !*** ../../node_modules/core-js/modules/es.string.replace-all.js ***!
  \*******************************************************************/
/***/ ((__unused_webpack_module, __unused_webpack_exports, __webpack_require__) => {


var $ = __webpack_require__(/*! ../internals/export */ "../../node_modules/core-js/internals/export.js");
var call = __webpack_require__(/*! ../internals/function-call */ "../../node_modules/core-js/internals/function-call.js");
var uncurryThis = __webpack_require__(/*! ../internals/function-uncurry-this */ "../../node_modules/core-js/internals/function-uncurry-this.js");
var requireObjectCoercible = __webpack_require__(/*! ../internals/require-object-coercible */ "../../node_modules/core-js/internals/require-object-coercible.js");
var isCallable = __webpack_require__(/*! ../internals/is-callable */ "../../node_modules/core-js/internals/is-callable.js");
var isNullOrUndefined = __webpack_require__(/*! ../internals/is-null-or-undefined */ "../../node_modules/core-js/internals/is-null-or-undefined.js");
var isRegExp = __webpack_require__(/*! ../internals/is-regexp */ "../../node_modules/core-js/internals/is-regexp.js");
var toString = __webpack_require__(/*! ../internals/to-string */ "../../node_modules/core-js/internals/to-string.js");
var getMethod = __webpack_require__(/*! ../internals/get-method */ "../../node_modules/core-js/internals/get-method.js");
var getRegExpFlags = __webpack_require__(/*! ../internals/regexp-get-flags */ "../../node_modules/core-js/internals/regexp-get-flags.js");
var getSubstitution = __webpack_require__(/*! ../internals/get-substitution */ "../../node_modules/core-js/internals/get-substitution.js");
var wellKnownSymbol = __webpack_require__(/*! ../internals/well-known-symbol */ "../../node_modules/core-js/internals/well-known-symbol.js");
var IS_PURE = __webpack_require__(/*! ../internals/is-pure */ "../../node_modules/core-js/internals/is-pure.js");

var REPLACE = wellKnownSymbol('replace');
var $TypeError = TypeError;
var indexOf = uncurryThis(''.indexOf);
var replace = uncurryThis(''.replace);
var stringSlice = uncurryThis(''.slice);
var max = Math.max;

// `String.prototype.replaceAll` method
// https://tc39.es/ecma262/#sec-string.prototype.replaceall
$({ target: 'String', proto: true }, {
  replaceAll: function replaceAll(searchValue, replaceValue) {
    var O = requireObjectCoercible(this);
    var IS_REG_EXP, flags, replacer, string, searchString, functionalReplace, searchLength, advanceBy, replacement;
    var position = 0;
    var endOfLastMatch = 0;
    var result = '';
    if (!isNullOrUndefined(searchValue)) {
      IS_REG_EXP = isRegExp(searchValue);
      if (IS_REG_EXP) {
        flags = toString(requireObjectCoercible(getRegExpFlags(searchValue)));
        if (!~indexOf(flags, 'g')) throw new $TypeError('`.replaceAll` does not allow non-global regexes');
      }
      replacer = getMethod(searchValue, REPLACE);
      if (replacer) {
        return call(replacer, searchValue, O, replaceValue);
      } else if (IS_PURE && IS_REG_EXP) {
        return replace(toString(O), searchValue, replaceValue);
      }
    }
    string = toString(O);
    searchString = toString(searchValue);
    functionalReplace = isCallable(replaceValue);
    if (!functionalReplace) replaceValue = toString(replaceValue);
    searchLength = searchString.length;
    advanceBy = max(1, searchLength);
    position = indexOf(string, searchString);
    while (position !== -1) {
      replacement = functionalReplace
        ? toString(replaceValue(searchString, position, string))
        : getSubstitution(searchString, string, position, [], undefined, replaceValue);
      result += stringSlice(string, endOfLastMatch, position) + replacement;
      endOfLastMatch = position + searchLength;
      position = position + advanceBy > string.length ? -1 : indexOf(string, searchString, position + advanceBy);
    }
    if (endOfLastMatch < string.length) {
      result += stringSlice(string, endOfLastMatch);
    }
    return result;
  }
});


/***/ }),

/***/ "../../node_modules/core-js/modules/es.string.replace.js":
/*!***************************************************************!*\
  !*** ../../node_modules/core-js/modules/es.string.replace.js ***!
  \***************************************************************/
/***/ ((__unused_webpack_module, __unused_webpack_exports, __webpack_require__) => {


var apply = __webpack_require__(/*! ../internals/function-apply */ "../../node_modules/core-js/internals/function-apply.js");
var call = __webpack_require__(/*! ../internals/function-call */ "../../node_modules/core-js/internals/function-call.js");
var uncurryThis = __webpack_require__(/*! ../internals/function-uncurry-this */ "../../node_modules/core-js/internals/function-uncurry-this.js");
var fixRegExpWellKnownSymbolLogic = __webpack_require__(/*! ../internals/fix-regexp-well-known-symbol-logic */ "../../node_modules/core-js/internals/fix-regexp-well-known-symbol-logic.js");
var fails = __webpack_require__(/*! ../internals/fails */ "../../node_modules/core-js/internals/fails.js");
var anObject = __webpack_require__(/*! ../internals/an-object */ "../../node_modules/core-js/internals/an-object.js");
var isCallable = __webpack_require__(/*! ../internals/is-callable */ "../../node_modules/core-js/internals/is-callable.js");
var isNullOrUndefined = __webpack_require__(/*! ../internals/is-null-or-undefined */ "../../node_modules/core-js/internals/is-null-or-undefined.js");
var toIntegerOrInfinity = __webpack_require__(/*! ../internals/to-integer-or-infinity */ "../../node_modules/core-js/internals/to-integer-or-infinity.js");
var toLength = __webpack_require__(/*! ../internals/to-length */ "../../node_modules/core-js/internals/to-length.js");
var toString = __webpack_require__(/*! ../internals/to-string */ "../../node_modules/core-js/internals/to-string.js");
var requireObjectCoercible = __webpack_require__(/*! ../internals/require-object-coercible */ "../../node_modules/core-js/internals/require-object-coercible.js");
var advanceStringIndex = __webpack_require__(/*! ../internals/advance-string-index */ "../../node_modules/core-js/internals/advance-string-index.js");
var getMethod = __webpack_require__(/*! ../internals/get-method */ "../../node_modules/core-js/internals/get-method.js");
var getSubstitution = __webpack_require__(/*! ../internals/get-substitution */ "../../node_modules/core-js/internals/get-substitution.js");
var regExpExec = __webpack_require__(/*! ../internals/regexp-exec-abstract */ "../../node_modules/core-js/internals/regexp-exec-abstract.js");
var wellKnownSymbol = __webpack_require__(/*! ../internals/well-known-symbol */ "../../node_modules/core-js/internals/well-known-symbol.js");

var REPLACE = wellKnownSymbol('replace');
var max = Math.max;
var min = Math.min;
var concat = uncurryThis([].concat);
var push = uncurryThis([].push);
var stringIndexOf = uncurryThis(''.indexOf);
var stringSlice = uncurryThis(''.slice);

var maybeToString = function (it) {
  return it === undefined ? it : String(it);
};

// IE <= 11 replaces $0 with the whole match, as if it was $&
// https://stackoverflow.com/questions/6024666/getting-ie-to-replace-a-regex-with-the-literal-string-0
var REPLACE_KEEPS_$0 = (function () {
  // eslint-disable-next-line regexp/prefer-escape-replacement-dollar-char -- required for testing
  return 'a'.replace(/./, '$0') === '$0';
})();

// Safari <= 13.0.3(?) substitutes nth capture where n>m with an empty string
var REGEXP_REPLACE_SUBSTITUTES_UNDEFINED_CAPTURE = (function () {
  if (/./[REPLACE]) {
    return /./[REPLACE]('a', '$0') === '';
  }
  return false;
})();

var REPLACE_SUPPORTS_NAMED_GROUPS = !fails(function () {
  var re = /./;
  re.exec = function () {
    var result = [];
    result.groups = { a: '7' };
    return result;
  };
  // eslint-disable-next-line regexp/no-useless-dollar-replacements -- false positive
  return ''.replace(re, '$<a>') !== '7';
});

// @@replace logic
fixRegExpWellKnownSymbolLogic('replace', function (_, nativeReplace, maybeCallNative) {
  var UNSAFE_SUBSTITUTE = REGEXP_REPLACE_SUBSTITUTES_UNDEFINED_CAPTURE ? '$' : '$0';

  return [
    // `String.prototype.replace` method
    // https://tc39.es/ecma262/#sec-string.prototype.replace
    function replace(searchValue, replaceValue) {
      var O = requireObjectCoercible(this);
      var replacer = isNullOrUndefined(searchValue) ? undefined : getMethod(searchValue, REPLACE);
      return replacer
        ? call(replacer, searchValue, O, replaceValue)
        : call(nativeReplace, toString(O), searchValue, replaceValue);
    },
    // `RegExp.prototype[@@replace]` method
    // https://tc39.es/ecma262/#sec-regexp.prototype-@@replace
    function (string, replaceValue) {
      var rx = anObject(this);
      var S = toString(string);

      if (
        typeof replaceValue == 'string' &&
        stringIndexOf(replaceValue, UNSAFE_SUBSTITUTE) === -1 &&
        stringIndexOf(replaceValue, '$<') === -1
      ) {
        var res = maybeCallNative(nativeReplace, rx, S, replaceValue);
        if (res.done) return res.value;
      }

      var functionalReplace = isCallable(replaceValue);
      if (!functionalReplace) replaceValue = toString(replaceValue);

      var global = rx.global;
      var fullUnicode;
      if (global) {
        fullUnicode = rx.unicode;
        rx.lastIndex = 0;
      }

      var results = [];
      var result;
      while (true) {
        result = regExpExec(rx, S);
        if (result === null) break;

        push(results, result);
        if (!global) break;

        var matchStr = toString(result[0]);
        if (matchStr === '') rx.lastIndex = advanceStringIndex(S, toLength(rx.lastIndex), fullUnicode);
      }

      var accumulatedResult = '';
      var nextSourcePosition = 0;
      for (var i = 0; i < results.length; i++) {
        result = results[i];

        var matched = toString(result[0]);
        var position = max(min(toIntegerOrInfinity(result.index), S.length), 0);
        var captures = [];
        var replacement;
        // NOTE: This is equivalent to
        //   captures = result.slice(1).map(maybeToString)
        // but for some reason `nativeSlice.call(result, 1, result.length)` (called in
        // the slice polyfill when slicing native arrays) "doesn't work" in safari 9 and
        // causes a crash (https://pastebin.com/N21QzeQA) when trying to debug it.
        for (var j = 1; j < result.length; j++) push(captures, maybeToString(result[j]));
        var namedCaptures = result.groups;
        if (functionalReplace) {
          var replacerArgs = concat([matched], captures, position, S);
          if (namedCaptures !== undefined) push(replacerArgs, namedCaptures);
          replacement = toString(apply(replaceValue, undefined, replacerArgs));
        } else {
          replacement = getSubstitution(matched, S, position, captures, namedCaptures, replaceValue);
        }
        if (position >= nextSourcePosition) {
          accumulatedResult += stringSlice(S, nextSourcePosition, position) + replacement;
          nextSourcePosition = position + matched.length;
        }
      }

      return accumulatedResult + stringSlice(S, nextSourcePosition);
    }
  ];
}, !REPLACE_SUPPORTS_NAMED_GROUPS || !REPLACE_KEEPS_$0 || REGEXP_REPLACE_SUBSTITUTES_UNDEFINED_CAPTURE);


/***/ }),

/***/ "../../node_modules/core-js/modules/esnext.string.match-all.js":
/*!*********************************************************************!*\
  !*** ../../node_modules/core-js/modules/esnext.string.match-all.js ***!
  \*********************************************************************/
/***/ ((__unused_webpack_module, __unused_webpack_exports, __webpack_require__) => {


// TODO: Remove from `core-js@4`
__webpack_require__(/*! ../modules/es.string.match-all */ "../../node_modules/core-js/modules/es.string.match-all.js");


/***/ }),

/***/ "../../node_modules/core-js/modules/esnext.string.replace-all.js":
/*!***********************************************************************!*\
  !*** ../../node_modules/core-js/modules/esnext.string.replace-all.js ***!
  \***********************************************************************/
/***/ ((__unused_webpack_module, __unused_webpack_exports, __webpack_require__) => {


// TODO: Remove from `core-js@4`
__webpack_require__(/*! ../modules/es.string.replace-all */ "../../node_modules/core-js/modules/es.string.replace-all.js");


/***/ }),

/***/ "../../node_modules/core-js/modules/web.url-search-params.constructor.js":
/*!*******************************************************************************!*\
  !*** ../../node_modules/core-js/modules/web.url-search-params.constructor.js ***!
  \*******************************************************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {


// TODO: in core-js@4, move /modules/ dependencies to public entries for better optimization by tools like `preset-env`
__webpack_require__(/*! ../modules/es.array.iterator */ "../../node_modules/core-js/modules/es.array.iterator.js");
var $ = __webpack_require__(/*! ../internals/export */ "../../node_modules/core-js/internals/export.js");
var global = __webpack_require__(/*! ../internals/global */ "../../node_modules/core-js/internals/global.js");
var safeGetBuiltIn = __webpack_require__(/*! ../internals/safe-get-built-in */ "../../node_modules/core-js/internals/safe-get-built-in.js");
var call = __webpack_require__(/*! ../internals/function-call */ "../../node_modules/core-js/internals/function-call.js");
var uncurryThis = __webpack_require__(/*! ../internals/function-uncurry-this */ "../../node_modules/core-js/internals/function-uncurry-this.js");
var DESCRIPTORS = __webpack_require__(/*! ../internals/descriptors */ "../../node_modules/core-js/internals/descriptors.js");
var USE_NATIVE_URL = __webpack_require__(/*! ../internals/url-constructor-detection */ "../../node_modules/core-js/internals/url-constructor-detection.js");
var defineBuiltIn = __webpack_require__(/*! ../internals/define-built-in */ "../../node_modules/core-js/internals/define-built-in.js");
var defineBuiltInAccessor = __webpack_require__(/*! ../internals/define-built-in-accessor */ "../../node_modules/core-js/internals/define-built-in-accessor.js");
var defineBuiltIns = __webpack_require__(/*! ../internals/define-built-ins */ "../../node_modules/core-js/internals/define-built-ins.js");
var setToStringTag = __webpack_require__(/*! ../internals/set-to-string-tag */ "../../node_modules/core-js/internals/set-to-string-tag.js");
var createIteratorConstructor = __webpack_require__(/*! ../internals/iterator-create-constructor */ "../../node_modules/core-js/internals/iterator-create-constructor.js");
var InternalStateModule = __webpack_require__(/*! ../internals/internal-state */ "../../node_modules/core-js/internals/internal-state.js");
var anInstance = __webpack_require__(/*! ../internals/an-instance */ "../../node_modules/core-js/internals/an-instance.js");
var isCallable = __webpack_require__(/*! ../internals/is-callable */ "../../node_modules/core-js/internals/is-callable.js");
var hasOwn = __webpack_require__(/*! ../internals/has-own-property */ "../../node_modules/core-js/internals/has-own-property.js");
var bind = __webpack_require__(/*! ../internals/function-bind-context */ "../../node_modules/core-js/internals/function-bind-context.js");
var classof = __webpack_require__(/*! ../internals/classof */ "../../node_modules/core-js/internals/classof.js");
var anObject = __webpack_require__(/*! ../internals/an-object */ "../../node_modules/core-js/internals/an-object.js");
var isObject = __webpack_require__(/*! ../internals/is-object */ "../../node_modules/core-js/internals/is-object.js");
var $toString = __webpack_require__(/*! ../internals/to-string */ "../../node_modules/core-js/internals/to-string.js");
var create = __webpack_require__(/*! ../internals/object-create */ "../../node_modules/core-js/internals/object-create.js");
var createPropertyDescriptor = __webpack_require__(/*! ../internals/create-property-descriptor */ "../../node_modules/core-js/internals/create-property-descriptor.js");
var getIterator = __webpack_require__(/*! ../internals/get-iterator */ "../../node_modules/core-js/internals/get-iterator.js");
var getIteratorMethod = __webpack_require__(/*! ../internals/get-iterator-method */ "../../node_modules/core-js/internals/get-iterator-method.js");
var createIterResultObject = __webpack_require__(/*! ../internals/create-iter-result-object */ "../../node_modules/core-js/internals/create-iter-result-object.js");
var validateArgumentsLength = __webpack_require__(/*! ../internals/validate-arguments-length */ "../../node_modules/core-js/internals/validate-arguments-length.js");
var wellKnownSymbol = __webpack_require__(/*! ../internals/well-known-symbol */ "../../node_modules/core-js/internals/well-known-symbol.js");
var arraySort = __webpack_require__(/*! ../internals/array-sort */ "../../node_modules/core-js/internals/array-sort.js");

var ITERATOR = wellKnownSymbol('iterator');
var URL_SEARCH_PARAMS = 'URLSearchParams';
var URL_SEARCH_PARAMS_ITERATOR = URL_SEARCH_PARAMS + 'Iterator';
var setInternalState = InternalStateModule.set;
var getInternalParamsState = InternalStateModule.getterFor(URL_SEARCH_PARAMS);
var getInternalIteratorState = InternalStateModule.getterFor(URL_SEARCH_PARAMS_ITERATOR);

var nativeFetch = safeGetBuiltIn('fetch');
var NativeRequest = safeGetBuiltIn('Request');
var Headers = safeGetBuiltIn('Headers');
var RequestPrototype = NativeRequest && NativeRequest.prototype;
var HeadersPrototype = Headers && Headers.prototype;
var RegExp = global.RegExp;
var TypeError = global.TypeError;
var decodeURIComponent = global.decodeURIComponent;
var encodeURIComponent = global.encodeURIComponent;
var charAt = uncurryThis(''.charAt);
var join = uncurryThis([].join);
var push = uncurryThis([].push);
var replace = uncurryThis(''.replace);
var shift = uncurryThis([].shift);
var splice = uncurryThis([].splice);
var split = uncurryThis(''.split);
var stringSlice = uncurryThis(''.slice);

var plus = /\+/g;
var sequences = Array(4);

var percentSequence = function (bytes) {
  return sequences[bytes - 1] || (sequences[bytes - 1] = RegExp('((?:%[\\da-f]{2}){' + bytes + '})', 'gi'));
};

var percentDecode = function (sequence) {
  try {
    return decodeURIComponent(sequence);
  } catch (error) {
    return sequence;
  }
};

var deserialize = function (it) {
  var result = replace(it, plus, ' ');
  var bytes = 4;
  try {
    return decodeURIComponent(result);
  } catch (error) {
    while (bytes) {
      result = replace(result, percentSequence(bytes--), percentDecode);
    }
    return result;
  }
};

var find = /[!'()~]|%20/g;

var replacements = {
  '!': '%21',
  "'": '%27',
  '(': '%28',
  ')': '%29',
  '~': '%7E',
  '%20': '+'
};

var replacer = function (match) {
  return replacements[match];
};

var serialize = function (it) {
  return replace(encodeURIComponent(it), find, replacer);
};

var URLSearchParamsIterator = createIteratorConstructor(function Iterator(params, kind) {
  setInternalState(this, {
    type: URL_SEARCH_PARAMS_ITERATOR,
    target: getInternalParamsState(params).entries,
    index: 0,
    kind: kind
  });
}, URL_SEARCH_PARAMS, function next() {
  var state = getInternalIteratorState(this);
  var target = state.target;
  var index = state.index++;
  if (!target || index >= target.length) {
    state.target = undefined;
    return createIterResultObject(undefined, true);
  }
  var entry = target[index];
  switch (state.kind) {
    case 'keys': return createIterResultObject(entry.key, false);
    case 'values': return createIterResultObject(entry.value, false);
  } return createIterResultObject([entry.key, entry.value], false);
}, true);

var URLSearchParamsState = function (init) {
  this.entries = [];
  this.url = null;

  if (init !== undefined) {
    if (isObject(init)) this.parseObject(init);
    else this.parseQuery(typeof init == 'string' ? charAt(init, 0) === '?' ? stringSlice(init, 1) : init : $toString(init));
  }
};

URLSearchParamsState.prototype = {
  type: URL_SEARCH_PARAMS,
  bindURL: function (url) {
    this.url = url;
    this.update();
  },
  parseObject: function (object) {
    var entries = this.entries;
    var iteratorMethod = getIteratorMethod(object);
    var iterator, next, step, entryIterator, entryNext, first, second;

    if (iteratorMethod) {
      iterator = getIterator(object, iteratorMethod);
      next = iterator.next;
      while (!(step = call(next, iterator)).done) {
        entryIterator = getIterator(anObject(step.value));
        entryNext = entryIterator.next;
        if (
          (first = call(entryNext, entryIterator)).done ||
          (second = call(entryNext, entryIterator)).done ||
          !call(entryNext, entryIterator).done
        ) throw new TypeError('Expected sequence with length 2');
        push(entries, { key: $toString(first.value), value: $toString(second.value) });
      }
    } else for (var key in object) if (hasOwn(object, key)) {
      push(entries, { key: key, value: $toString(object[key]) });
    }
  },
  parseQuery: function (query) {
    if (query) {
      var entries = this.entries;
      var attributes = split(query, '&');
      var index = 0;
      var attribute, entry;
      while (index < attributes.length) {
        attribute = attributes[index++];
        if (attribute.length) {
          entry = split(attribute, '=');
          push(entries, {
            key: deserialize(shift(entry)),
            value: deserialize(join(entry, '='))
          });
        }
      }
    }
  },
  serialize: function () {
    var entries = this.entries;
    var result = [];
    var index = 0;
    var entry;
    while (index < entries.length) {
      entry = entries[index++];
      push(result, serialize(entry.key) + '=' + serialize(entry.value));
    } return join(result, '&');
  },
  update: function () {
    this.entries.length = 0;
    this.parseQuery(this.url.query);
  },
  updateURL: function () {
    if (this.url) this.url.update();
  }
};

// `URLSearchParams` constructor
// https://url.spec.whatwg.org/#interface-urlsearchparams
var URLSearchParamsConstructor = function URLSearchParams(/* init */) {
  anInstance(this, URLSearchParamsPrototype);
  var init = arguments.length > 0 ? arguments[0] : undefined;
  var state = setInternalState(this, new URLSearchParamsState(init));
  if (!DESCRIPTORS) this.size = state.entries.length;
};

var URLSearchParamsPrototype = URLSearchParamsConstructor.prototype;

defineBuiltIns(URLSearchParamsPrototype, {
  // `URLSearchParams.prototype.append` method
  // https://url.spec.whatwg.org/#dom-urlsearchparams-append
  append: function append(name, value) {
    var state = getInternalParamsState(this);
    validateArgumentsLength(arguments.length, 2);
    push(state.entries, { key: $toString(name), value: $toString(value) });
    if (!DESCRIPTORS) this.length++;
    state.updateURL();
  },
  // `URLSearchParams.prototype.delete` method
  // https://url.spec.whatwg.org/#dom-urlsearchparams-delete
  'delete': function (name /* , value */) {
    var state = getInternalParamsState(this);
    var length = validateArgumentsLength(arguments.length, 1);
    var entries = state.entries;
    var key = $toString(name);
    var $value = length < 2 ? undefined : arguments[1];
    var value = $value === undefined ? $value : $toString($value);
    var index = 0;
    while (index < entries.length) {
      var entry = entries[index];
      if (entry.key === key && (value === undefined || entry.value === value)) {
        splice(entries, index, 1);
        if (value !== undefined) break;
      } else index++;
    }
    if (!DESCRIPTORS) this.size = entries.length;
    state.updateURL();
  },
  // `URLSearchParams.prototype.get` method
  // https://url.spec.whatwg.org/#dom-urlsearchparams-get
  get: function get(name) {
    var entries = getInternalParamsState(this).entries;
    validateArgumentsLength(arguments.length, 1);
    var key = $toString(name);
    var index = 0;
    for (; index < entries.length; index++) {
      if (entries[index].key === key) return entries[index].value;
    }
    return null;
  },
  // `URLSearchParams.prototype.getAll` method
  // https://url.spec.whatwg.org/#dom-urlsearchparams-getall
  getAll: function getAll(name) {
    var entries = getInternalParamsState(this).entries;
    validateArgumentsLength(arguments.length, 1);
    var key = $toString(name);
    var result = [];
    var index = 0;
    for (; index < entries.length; index++) {
      if (entries[index].key === key) push(result, entries[index].value);
    }
    return result;
  },
  // `URLSearchParams.prototype.has` method
  // https://url.spec.whatwg.org/#dom-urlsearchparams-has
  has: function has(name /* , value */) {
    var entries = getInternalParamsState(this).entries;
    var length = validateArgumentsLength(arguments.length, 1);
    var key = $toString(name);
    var $value = length < 2 ? undefined : arguments[1];
    var value = $value === undefined ? $value : $toString($value);
    var index = 0;
    while (index < entries.length) {
      var entry = entries[index++];
      if (entry.key === key && (value === undefined || entry.value === value)) return true;
    }
    return false;
  },
  // `URLSearchParams.prototype.set` method
  // https://url.spec.whatwg.org/#dom-urlsearchparams-set
  set: function set(name, value) {
    var state = getInternalParamsState(this);
    validateArgumentsLength(arguments.length, 1);
    var entries = state.entries;
    var found = false;
    var key = $toString(name);
    var val = $toString(value);
    var index = 0;
    var entry;
    for (; index < entries.length; index++) {
      entry = entries[index];
      if (entry.key === key) {
        if (found) splice(entries, index--, 1);
        else {
          found = true;
          entry.value = val;
        }
      }
    }
    if (!found) push(entries, { key: key, value: val });
    if (!DESCRIPTORS) this.size = entries.length;
    state.updateURL();
  },
  // `URLSearchParams.prototype.sort` method
  // https://url.spec.whatwg.org/#dom-urlsearchparams-sort
  sort: function sort() {
    var state = getInternalParamsState(this);
    arraySort(state.entries, function (a, b) {
      return a.key > b.key ? 1 : -1;
    });
    state.updateURL();
  },
  // `URLSearchParams.prototype.forEach` method
  forEach: function forEach(callback /* , thisArg */) {
    var entries = getInternalParamsState(this).entries;
    var boundFunction = bind(callback, arguments.length > 1 ? arguments[1] : undefined);
    var index = 0;
    var entry;
    while (index < entries.length) {
      entry = entries[index++];
      boundFunction(entry.value, entry.key, this);
    }
  },
  // `URLSearchParams.prototype.keys` method
  keys: function keys() {
    return new URLSearchParamsIterator(this, 'keys');
  },
  // `URLSearchParams.prototype.values` method
  values: function values() {
    return new URLSearchParamsIterator(this, 'values');
  },
  // `URLSearchParams.prototype.entries` method
  entries: function entries() {
    return new URLSearchParamsIterator(this, 'entries');
  }
}, { enumerable: true });

// `URLSearchParams.prototype[@@iterator]` method
defineBuiltIn(URLSearchParamsPrototype, ITERATOR, URLSearchParamsPrototype.entries, { name: 'entries' });

// `URLSearchParams.prototype.toString` method
// https://url.spec.whatwg.org/#urlsearchparams-stringification-behavior
defineBuiltIn(URLSearchParamsPrototype, 'toString', function toString() {
  return getInternalParamsState(this).serialize();
}, { enumerable: true });

// `URLSearchParams.prototype.size` getter
// https://github.com/whatwg/url/pull/734
if (DESCRIPTORS) defineBuiltInAccessor(URLSearchParamsPrototype, 'size', {
  get: function size() {
    return getInternalParamsState(this).entries.length;
  },
  configurable: true,
  enumerable: true
});

setToStringTag(URLSearchParamsConstructor, URL_SEARCH_PARAMS);

$({ global: true, constructor: true, forced: !USE_NATIVE_URL }, {
  URLSearchParams: URLSearchParamsConstructor
});

// Wrap `fetch` and `Request` for correct work with polyfilled `URLSearchParams`
if (!USE_NATIVE_URL && isCallable(Headers)) {
  var headersHas = uncurryThis(HeadersPrototype.has);
  var headersSet = uncurryThis(HeadersPrototype.set);

  var wrapRequestOptions = function (init) {
    if (isObject(init)) {
      var body = init.body;
      var headers;
      if (classof(body) === URL_SEARCH_PARAMS) {
        headers = init.headers ? new Headers(init.headers) : new Headers();
        if (!headersHas(headers, 'content-type')) {
          headersSet(headers, 'content-type', 'application/x-www-form-urlencoded;charset=UTF-8');
        }
        return create(init, {
          body: createPropertyDescriptor(0, $toString(body)),
          headers: createPropertyDescriptor(0, headers)
        });
      }
    } return init;
  };

  if (isCallable(nativeFetch)) {
    $({ global: true, enumerable: true, dontCallGetSet: true, forced: true }, {
      fetch: function fetch(input /* , init */) {
        return nativeFetch(input, arguments.length > 1 ? wrapRequestOptions(arguments[1]) : {});
      }
    });
  }

  if (isCallable(NativeRequest)) {
    var RequestConstructor = function Request(input /* , init */) {
      anInstance(this, RequestPrototype);
      return new NativeRequest(input, arguments.length > 1 ? wrapRequestOptions(arguments[1]) : {});
    };

    RequestPrototype.constructor = RequestConstructor;
    RequestConstructor.prototype = RequestPrototype;

    $({ global: true, constructor: true, dontCallGetSet: true, forced: true }, {
      Request: RequestConstructor
    });
  }
}

module.exports = {
  URLSearchParams: URLSearchParamsConstructor,
  getState: getInternalParamsState
};


/***/ }),

/***/ "../../node_modules/core-js/modules/web.url-search-params.js":
/*!*******************************************************************!*\
  !*** ../../node_modules/core-js/modules/web.url-search-params.js ***!
  \*******************************************************************/
/***/ ((__unused_webpack_module, __unused_webpack_exports, __webpack_require__) => {


// TODO: Remove this module from `core-js@4` since it's replaced to module below
__webpack_require__(/*! ../modules/web.url-search-params.constructor */ "../../node_modules/core-js/modules/web.url-search-params.constructor.js");


/***/ }),

/***/ "../../node_modules/core-js/modules/web.url.constructor.js":
/*!*****************************************************************!*\
  !*** ../../node_modules/core-js/modules/web.url.constructor.js ***!
  \*****************************************************************/
/***/ ((__unused_webpack_module, __unused_webpack_exports, __webpack_require__) => {


// TODO: in core-js@4, move /modules/ dependencies to public entries for better optimization by tools like `preset-env`
__webpack_require__(/*! ../modules/es.string.iterator */ "../../node_modules/core-js/modules/es.string.iterator.js");
var $ = __webpack_require__(/*! ../internals/export */ "../../node_modules/core-js/internals/export.js");
var DESCRIPTORS = __webpack_require__(/*! ../internals/descriptors */ "../../node_modules/core-js/internals/descriptors.js");
var USE_NATIVE_URL = __webpack_require__(/*! ../internals/url-constructor-detection */ "../../node_modules/core-js/internals/url-constructor-detection.js");
var global = __webpack_require__(/*! ../internals/global */ "../../node_modules/core-js/internals/global.js");
var bind = __webpack_require__(/*! ../internals/function-bind-context */ "../../node_modules/core-js/internals/function-bind-context.js");
var uncurryThis = __webpack_require__(/*! ../internals/function-uncurry-this */ "../../node_modules/core-js/internals/function-uncurry-this.js");
var defineBuiltIn = __webpack_require__(/*! ../internals/define-built-in */ "../../node_modules/core-js/internals/define-built-in.js");
var defineBuiltInAccessor = __webpack_require__(/*! ../internals/define-built-in-accessor */ "../../node_modules/core-js/internals/define-built-in-accessor.js");
var anInstance = __webpack_require__(/*! ../internals/an-instance */ "../../node_modules/core-js/internals/an-instance.js");
var hasOwn = __webpack_require__(/*! ../internals/has-own-property */ "../../node_modules/core-js/internals/has-own-property.js");
var assign = __webpack_require__(/*! ../internals/object-assign */ "../../node_modules/core-js/internals/object-assign.js");
var arrayFrom = __webpack_require__(/*! ../internals/array-from */ "../../node_modules/core-js/internals/array-from.js");
var arraySlice = __webpack_require__(/*! ../internals/array-slice */ "../../node_modules/core-js/internals/array-slice.js");
var codeAt = (__webpack_require__(/*! ../internals/string-multibyte */ "../../node_modules/core-js/internals/string-multibyte.js").codeAt);
var toASCII = __webpack_require__(/*! ../internals/string-punycode-to-ascii */ "../../node_modules/core-js/internals/string-punycode-to-ascii.js");
var $toString = __webpack_require__(/*! ../internals/to-string */ "../../node_modules/core-js/internals/to-string.js");
var setToStringTag = __webpack_require__(/*! ../internals/set-to-string-tag */ "../../node_modules/core-js/internals/set-to-string-tag.js");
var validateArgumentsLength = __webpack_require__(/*! ../internals/validate-arguments-length */ "../../node_modules/core-js/internals/validate-arguments-length.js");
var URLSearchParamsModule = __webpack_require__(/*! ../modules/web.url-search-params.constructor */ "../../node_modules/core-js/modules/web.url-search-params.constructor.js");
var InternalStateModule = __webpack_require__(/*! ../internals/internal-state */ "../../node_modules/core-js/internals/internal-state.js");

var setInternalState = InternalStateModule.set;
var getInternalURLState = InternalStateModule.getterFor('URL');
var URLSearchParams = URLSearchParamsModule.URLSearchParams;
var getInternalSearchParamsState = URLSearchParamsModule.getState;

var NativeURL = global.URL;
var TypeError = global.TypeError;
var parseInt = global.parseInt;
var floor = Math.floor;
var pow = Math.pow;
var charAt = uncurryThis(''.charAt);
var exec = uncurryThis(/./.exec);
var join = uncurryThis([].join);
var numberToString = uncurryThis(1.0.toString);
var pop = uncurryThis([].pop);
var push = uncurryThis([].push);
var replace = uncurryThis(''.replace);
var shift = uncurryThis([].shift);
var split = uncurryThis(''.split);
var stringSlice = uncurryThis(''.slice);
var toLowerCase = uncurryThis(''.toLowerCase);
var unshift = uncurryThis([].unshift);

var INVALID_AUTHORITY = 'Invalid authority';
var INVALID_SCHEME = 'Invalid scheme';
var INVALID_HOST = 'Invalid host';
var INVALID_PORT = 'Invalid port';

var ALPHA = /[a-z]/i;
// eslint-disable-next-line regexp/no-obscure-range -- safe
var ALPHANUMERIC = /[\d+-.a-z]/i;
var DIGIT = /\d/;
var HEX_START = /^0x/i;
var OCT = /^[0-7]+$/;
var DEC = /^\d+$/;
var HEX = /^[\da-f]+$/i;
/* eslint-disable regexp/no-control-character -- safe */
var FORBIDDEN_HOST_CODE_POINT = /[\0\t\n\r #%/:<>?@[\\\]^|]/;
var FORBIDDEN_HOST_CODE_POINT_EXCLUDING_PERCENT = /[\0\t\n\r #/:<>?@[\\\]^|]/;
var LEADING_C0_CONTROL_OR_SPACE = /^[\u0000-\u0020]+/;
var TRAILING_C0_CONTROL_OR_SPACE = /(^|[^\u0000-\u0020])[\u0000-\u0020]+$/;
var TAB_AND_NEW_LINE = /[\t\n\r]/g;
/* eslint-enable regexp/no-control-character -- safe */
var EOF;

// https://url.spec.whatwg.org/#ipv4-number-parser
var parseIPv4 = function (input) {
  var parts = split(input, '.');
  var partsLength, numbers, index, part, radix, number, ipv4;
  if (parts.length && parts[parts.length - 1] === '') {
    parts.length--;
  }
  partsLength = parts.length;
  if (partsLength > 4) return input;
  numbers = [];
  for (index = 0; index < partsLength; index++) {
    part = parts[index];
    if (part === '') return input;
    radix = 10;
    if (part.length > 1 && charAt(part, 0) === '0') {
      radix = exec(HEX_START, part) ? 16 : 8;
      part = stringSlice(part, radix === 8 ? 1 : 2);
    }
    if (part === '') {
      number = 0;
    } else {
      if (!exec(radix === 10 ? DEC : radix === 8 ? OCT : HEX, part)) return input;
      number = parseInt(part, radix);
    }
    push(numbers, number);
  }
  for (index = 0; index < partsLength; index++) {
    number = numbers[index];
    if (index === partsLength - 1) {
      if (number >= pow(256, 5 - partsLength)) return null;
    } else if (number > 255) return null;
  }
  ipv4 = pop(numbers);
  for (index = 0; index < numbers.length; index++) {
    ipv4 += numbers[index] * pow(256, 3 - index);
  }
  return ipv4;
};

// https://url.spec.whatwg.org/#concept-ipv6-parser
// eslint-disable-next-line max-statements -- TODO
var parseIPv6 = function (input) {
  var address = [0, 0, 0, 0, 0, 0, 0, 0];
  var pieceIndex = 0;
  var compress = null;
  var pointer = 0;
  var value, length, numbersSeen, ipv4Piece, number, swaps, swap;

  var chr = function () {
    return charAt(input, pointer);
  };

  if (chr() === ':') {
    if (charAt(input, 1) !== ':') return;
    pointer += 2;
    pieceIndex++;
    compress = pieceIndex;
  }
  while (chr()) {
    if (pieceIndex === 8) return;
    if (chr() === ':') {
      if (compress !== null) return;
      pointer++;
      pieceIndex++;
      compress = pieceIndex;
      continue;
    }
    value = length = 0;
    while (length < 4 && exec(HEX, chr())) {
      value = value * 16 + parseInt(chr(), 16);
      pointer++;
      length++;
    }
    if (chr() === '.') {
      if (length === 0) return;
      pointer -= length;
      if (pieceIndex > 6) return;
      numbersSeen = 0;
      while (chr()) {
        ipv4Piece = null;
        if (numbersSeen > 0) {
          if (chr() === '.' && numbersSeen < 4) pointer++;
          else return;
        }
        if (!exec(DIGIT, chr())) return;
        while (exec(DIGIT, chr())) {
          number = parseInt(chr(), 10);
          if (ipv4Piece === null) ipv4Piece = number;
          else if (ipv4Piece === 0) return;
          else ipv4Piece = ipv4Piece * 10 + number;
          if (ipv4Piece > 255) return;
          pointer++;
        }
        address[pieceIndex] = address[pieceIndex] * 256 + ipv4Piece;
        numbersSeen++;
        if (numbersSeen === 2 || numbersSeen === 4) pieceIndex++;
      }
      if (numbersSeen !== 4) return;
      break;
    } else if (chr() === ':') {
      pointer++;
      if (!chr()) return;
    } else if (chr()) return;
    address[pieceIndex++] = value;
  }
  if (compress !== null) {
    swaps = pieceIndex - compress;
    pieceIndex = 7;
    while (pieceIndex !== 0 && swaps > 0) {
      swap = address[pieceIndex];
      address[pieceIndex--] = address[compress + swaps - 1];
      address[compress + --swaps] = swap;
    }
  } else if (pieceIndex !== 8) return;
  return address;
};

var findLongestZeroSequence = function (ipv6) {
  var maxIndex = null;
  var maxLength = 1;
  var currStart = null;
  var currLength = 0;
  var index = 0;
  for (; index < 8; index++) {
    if (ipv6[index] !== 0) {
      if (currLength > maxLength) {
        maxIndex = currStart;
        maxLength = currLength;
      }
      currStart = null;
      currLength = 0;
    } else {
      if (currStart === null) currStart = index;
      ++currLength;
    }
  }
  if (currLength > maxLength) {
    maxIndex = currStart;
    maxLength = currLength;
  }
  return maxIndex;
};

// https://url.spec.whatwg.org/#host-serializing
var serializeHost = function (host) {
  var result, index, compress, ignore0;
  // ipv4
  if (typeof host == 'number') {
    result = [];
    for (index = 0; index < 4; index++) {
      unshift(result, host % 256);
      host = floor(host / 256);
    } return join(result, '.');
  // ipv6
  } else if (typeof host == 'object') {
    result = '';
    compress = findLongestZeroSequence(host);
    for (index = 0; index < 8; index++) {
      if (ignore0 && host[index] === 0) continue;
      if (ignore0) ignore0 = false;
      if (compress === index) {
        result += index ? ':' : '::';
        ignore0 = true;
      } else {
        result += numberToString(host[index], 16);
        if (index < 7) result += ':';
      }
    }
    return '[' + result + ']';
  } return host;
};

var C0ControlPercentEncodeSet = {};
var fragmentPercentEncodeSet = assign({}, C0ControlPercentEncodeSet, {
  ' ': 1, '"': 1, '<': 1, '>': 1, '`': 1
});
var pathPercentEncodeSet = assign({}, fragmentPercentEncodeSet, {
  '#': 1, '?': 1, '{': 1, '}': 1
});
var userinfoPercentEncodeSet = assign({}, pathPercentEncodeSet, {
  '/': 1, ':': 1, ';': 1, '=': 1, '@': 1, '[': 1, '\\': 1, ']': 1, '^': 1, '|': 1
});

var percentEncode = function (chr, set) {
  var code = codeAt(chr, 0);
  return code > 0x20 && code < 0x7F && !hasOwn(set, chr) ? chr : encodeURIComponent(chr);
};

// https://url.spec.whatwg.org/#special-scheme
var specialSchemes = {
  ftp: 21,
  file: null,
  http: 80,
  https: 443,
  ws: 80,
  wss: 443
};

// https://url.spec.whatwg.org/#windows-drive-letter
var isWindowsDriveLetter = function (string, normalized) {
  var second;
  return string.length === 2 && exec(ALPHA, charAt(string, 0))
    && ((second = charAt(string, 1)) === ':' || (!normalized && second === '|'));
};

// https://url.spec.whatwg.org/#start-with-a-windows-drive-letter
var startsWithWindowsDriveLetter = function (string) {
  var third;
  return string.length > 1 && isWindowsDriveLetter(stringSlice(string, 0, 2)) && (
    string.length === 2 ||
    ((third = charAt(string, 2)) === '/' || third === '\\' || third === '?' || third === '#')
  );
};

// https://url.spec.whatwg.org/#single-dot-path-segment
var isSingleDot = function (segment) {
  return segment === '.' || toLowerCase(segment) === '%2e';
};

// https://url.spec.whatwg.org/#double-dot-path-segment
var isDoubleDot = function (segment) {
  segment = toLowerCase(segment);
  return segment === '..' || segment === '%2e.' || segment === '.%2e' || segment === '%2e%2e';
};

// States:
var SCHEME_START = {};
var SCHEME = {};
var NO_SCHEME = {};
var SPECIAL_RELATIVE_OR_AUTHORITY = {};
var PATH_OR_AUTHORITY = {};
var RELATIVE = {};
var RELATIVE_SLASH = {};
var SPECIAL_AUTHORITY_SLASHES = {};
var SPECIAL_AUTHORITY_IGNORE_SLASHES = {};
var AUTHORITY = {};
var HOST = {};
var HOSTNAME = {};
var PORT = {};
var FILE = {};
var FILE_SLASH = {};
var FILE_HOST = {};
var PATH_START = {};
var PATH = {};
var CANNOT_BE_A_BASE_URL_PATH = {};
var QUERY = {};
var FRAGMENT = {};

var URLState = function (url, isBase, base) {
  var urlString = $toString(url);
  var baseState, failure, searchParams;
  if (isBase) {
    failure = this.parse(urlString);
    if (failure) throw new TypeError(failure);
    this.searchParams = null;
  } else {
    if (base !== undefined) baseState = new URLState(base, true);
    failure = this.parse(urlString, null, baseState);
    if (failure) throw new TypeError(failure);
    searchParams = getInternalSearchParamsState(new URLSearchParams());
    searchParams.bindURL(this);
    this.searchParams = searchParams;
  }
};

URLState.prototype = {
  type: 'URL',
  // https://url.spec.whatwg.org/#url-parsing
  // eslint-disable-next-line max-statements -- TODO
  parse: function (input, stateOverride, base) {
    var url = this;
    var state = stateOverride || SCHEME_START;
    var pointer = 0;
    var buffer = '';
    var seenAt = false;
    var seenBracket = false;
    var seenPasswordToken = false;
    var codePoints, chr, bufferCodePoints, failure;

    input = $toString(input);

    if (!stateOverride) {
      url.scheme = '';
      url.username = '';
      url.password = '';
      url.host = null;
      url.port = null;
      url.path = [];
      url.query = null;
      url.fragment = null;
      url.cannotBeABaseURL = false;
      input = replace(input, LEADING_C0_CONTROL_OR_SPACE, '');
      input = replace(input, TRAILING_C0_CONTROL_OR_SPACE, '$1');
    }

    input = replace(input, TAB_AND_NEW_LINE, '');

    codePoints = arrayFrom(input);

    while (pointer <= codePoints.length) {
      chr = codePoints[pointer];
      switch (state) {
        case SCHEME_START:
          if (chr && exec(ALPHA, chr)) {
            buffer += toLowerCase(chr);
            state = SCHEME;
          } else if (!stateOverride) {
            state = NO_SCHEME;
            continue;
          } else return INVALID_SCHEME;
          break;

        case SCHEME:
          if (chr && (exec(ALPHANUMERIC, chr) || chr === '+' || chr === '-' || chr === '.')) {
            buffer += toLowerCase(chr);
          } else if (chr === ':') {
            if (stateOverride && (
              (url.isSpecial() !== hasOwn(specialSchemes, buffer)) ||
              (buffer === 'file' && (url.includesCredentials() || url.port !== null)) ||
              (url.scheme === 'file' && !url.host)
            )) return;
            url.scheme = buffer;
            if (stateOverride) {
              if (url.isSpecial() && specialSchemes[url.scheme] === url.port) url.port = null;
              return;
            }
            buffer = '';
            if (url.scheme === 'file') {
              state = FILE;
            } else if (url.isSpecial() && base && base.scheme === url.scheme) {
              state = SPECIAL_RELATIVE_OR_AUTHORITY;
            } else if (url.isSpecial()) {
              state = SPECIAL_AUTHORITY_SLASHES;
            } else if (codePoints[pointer + 1] === '/') {
              state = PATH_OR_AUTHORITY;
              pointer++;
            } else {
              url.cannotBeABaseURL = true;
              push(url.path, '');
              state = CANNOT_BE_A_BASE_URL_PATH;
            }
          } else if (!stateOverride) {
            buffer = '';
            state = NO_SCHEME;
            pointer = 0;
            continue;
          } else return INVALID_SCHEME;
          break;

        case NO_SCHEME:
          if (!base || (base.cannotBeABaseURL && chr !== '#')) return INVALID_SCHEME;
          if (base.cannotBeABaseURL && chr === '#') {
            url.scheme = base.scheme;
            url.path = arraySlice(base.path);
            url.query = base.query;
            url.fragment = '';
            url.cannotBeABaseURL = true;
            state = FRAGMENT;
            break;
          }
          state = base.scheme === 'file' ? FILE : RELATIVE;
          continue;

        case SPECIAL_RELATIVE_OR_AUTHORITY:
          if (chr === '/' && codePoints[pointer + 1] === '/') {
            state = SPECIAL_AUTHORITY_IGNORE_SLASHES;
            pointer++;
          } else {
            state = RELATIVE;
            continue;
          } break;

        case PATH_OR_AUTHORITY:
          if (chr === '/') {
            state = AUTHORITY;
            break;
          } else {
            state = PATH;
            continue;
          }

        case RELATIVE:
          url.scheme = base.scheme;
          if (chr === EOF) {
            url.username = base.username;
            url.password = base.password;
            url.host = base.host;
            url.port = base.port;
            url.path = arraySlice(base.path);
            url.query = base.query;
          } else if (chr === '/' || (chr === '\\' && url.isSpecial())) {
            state = RELATIVE_SLASH;
          } else if (chr === '?') {
            url.username = base.username;
            url.password = base.password;
            url.host = base.host;
            url.port = base.port;
            url.path = arraySlice(base.path);
            url.query = '';
            state = QUERY;
          } else if (chr === '#') {
            url.username = base.username;
            url.password = base.password;
            url.host = base.host;
            url.port = base.port;
            url.path = arraySlice(base.path);
            url.query = base.query;
            url.fragment = '';
            state = FRAGMENT;
          } else {
            url.username = base.username;
            url.password = base.password;
            url.host = base.host;
            url.port = base.port;
            url.path = arraySlice(base.path);
            url.path.length--;
            state = PATH;
            continue;
          } break;

        case RELATIVE_SLASH:
          if (url.isSpecial() && (chr === '/' || chr === '\\')) {
            state = SPECIAL_AUTHORITY_IGNORE_SLASHES;
          } else if (chr === '/') {
            state = AUTHORITY;
          } else {
            url.username = base.username;
            url.password = base.password;
            url.host = base.host;
            url.port = base.port;
            state = PATH;
            continue;
          } break;

        case SPECIAL_AUTHORITY_SLASHES:
          state = SPECIAL_AUTHORITY_IGNORE_SLASHES;
          if (chr !== '/' || charAt(buffer, pointer + 1) !== '/') continue;
          pointer++;
          break;

        case SPECIAL_AUTHORITY_IGNORE_SLASHES:
          if (chr !== '/' && chr !== '\\') {
            state = AUTHORITY;
            continue;
          } break;

        case AUTHORITY:
          if (chr === '@') {
            if (seenAt) buffer = '%40' + buffer;
            seenAt = true;
            bufferCodePoints = arrayFrom(buffer);
            for (var i = 0; i < bufferCodePoints.length; i++) {
              var codePoint = bufferCodePoints[i];
              if (codePoint === ':' && !seenPasswordToken) {
                seenPasswordToken = true;
                continue;
              }
              var encodedCodePoints = percentEncode(codePoint, userinfoPercentEncodeSet);
              if (seenPasswordToken) url.password += encodedCodePoints;
              else url.username += encodedCodePoints;
            }
            buffer = '';
          } else if (
            chr === EOF || chr === '/' || chr === '?' || chr === '#' ||
            (chr === '\\' && url.isSpecial())
          ) {
            if (seenAt && buffer === '') return INVALID_AUTHORITY;
            pointer -= arrayFrom(buffer).length + 1;
            buffer = '';
            state = HOST;
          } else buffer += chr;
          break;

        case HOST:
        case HOSTNAME:
          if (stateOverride && url.scheme === 'file') {
            state = FILE_HOST;
            continue;
          } else if (chr === ':' && !seenBracket) {
            if (buffer === '') return INVALID_HOST;
            failure = url.parseHost(buffer);
            if (failure) return failure;
            buffer = '';
            state = PORT;
            if (stateOverride === HOSTNAME) return;
          } else if (
            chr === EOF || chr === '/' || chr === '?' || chr === '#' ||
            (chr === '\\' && url.isSpecial())
          ) {
            if (url.isSpecial() && buffer === '') return INVALID_HOST;
            if (stateOverride && buffer === '' && (url.includesCredentials() || url.port !== null)) return;
            failure = url.parseHost(buffer);
            if (failure) return failure;
            buffer = '';
            state = PATH_START;
            if (stateOverride) return;
            continue;
          } else {
            if (chr === '[') seenBracket = true;
            else if (chr === ']') seenBracket = false;
            buffer += chr;
          } break;

        case PORT:
          if (exec(DIGIT, chr)) {
            buffer += chr;
          } else if (
            chr === EOF || chr === '/' || chr === '?' || chr === '#' ||
            (chr === '\\' && url.isSpecial()) ||
            stateOverride
          ) {
            if (buffer !== '') {
              var port = parseInt(buffer, 10);
              if (port > 0xFFFF) return INVALID_PORT;
              url.port = (url.isSpecial() && port === specialSchemes[url.scheme]) ? null : port;
              buffer = '';
            }
            if (stateOverride) return;
            state = PATH_START;
            continue;
          } else return INVALID_PORT;
          break;

        case FILE:
          url.scheme = 'file';
          if (chr === '/' || chr === '\\') state = FILE_SLASH;
          else if (base && base.scheme === 'file') {
            switch (chr) {
              case EOF:
                url.host = base.host;
                url.path = arraySlice(base.path);
                url.query = base.query;
                break;
              case '?':
                url.host = base.host;
                url.path = arraySlice(base.path);
                url.query = '';
                state = QUERY;
                break;
              case '#':
                url.host = base.host;
                url.path = arraySlice(base.path);
                url.query = base.query;
                url.fragment = '';
                state = FRAGMENT;
                break;
              default:
                if (!startsWithWindowsDriveLetter(join(arraySlice(codePoints, pointer), ''))) {
                  url.host = base.host;
                  url.path = arraySlice(base.path);
                  url.shortenPath();
                }
                state = PATH;
                continue;
            }
          } else {
            state = PATH;
            continue;
          } break;

        case FILE_SLASH:
          if (chr === '/' || chr === '\\') {
            state = FILE_HOST;
            break;
          }
          if (base && base.scheme === 'file' && !startsWithWindowsDriveLetter(join(arraySlice(codePoints, pointer), ''))) {
            if (isWindowsDriveLetter(base.path[0], true)) push(url.path, base.path[0]);
            else url.host = base.host;
          }
          state = PATH;
          continue;

        case FILE_HOST:
          if (chr === EOF || chr === '/' || chr === '\\' || chr === '?' || chr === '#') {
            if (!stateOverride && isWindowsDriveLetter(buffer)) {
              state = PATH;
            } else if (buffer === '') {
              url.host = '';
              if (stateOverride) return;
              state = PATH_START;
            } else {
              failure = url.parseHost(buffer);
              if (failure) return failure;
              if (url.host === 'localhost') url.host = '';
              if (stateOverride) return;
              buffer = '';
              state = PATH_START;
            } continue;
          } else buffer += chr;
          break;

        case PATH_START:
          if (url.isSpecial()) {
            state = PATH;
            if (chr !== '/' && chr !== '\\') continue;
          } else if (!stateOverride && chr === '?') {
            url.query = '';
            state = QUERY;
          } else if (!stateOverride && chr === '#') {
            url.fragment = '';
            state = FRAGMENT;
          } else if (chr !== EOF) {
            state = PATH;
            if (chr !== '/') continue;
          } break;

        case PATH:
          if (
            chr === EOF || chr === '/' ||
            (chr === '\\' && url.isSpecial()) ||
            (!stateOverride && (chr === '?' || chr === '#'))
          ) {
            if (isDoubleDot(buffer)) {
              url.shortenPath();
              if (chr !== '/' && !(chr === '\\' && url.isSpecial())) {
                push(url.path, '');
              }
            } else if (isSingleDot(buffer)) {
              if (chr !== '/' && !(chr === '\\' && url.isSpecial())) {
                push(url.path, '');
              }
            } else {
              if (url.scheme === 'file' && !url.path.length && isWindowsDriveLetter(buffer)) {
                if (url.host) url.host = '';
                buffer = charAt(buffer, 0) + ':'; // normalize windows drive letter
              }
              push(url.path, buffer);
            }
            buffer = '';
            if (url.scheme === 'file' && (chr === EOF || chr === '?' || chr === '#')) {
              while (url.path.length > 1 && url.path[0] === '') {
                shift(url.path);
              }
            }
            if (chr === '?') {
              url.query = '';
              state = QUERY;
            } else if (chr === '#') {
              url.fragment = '';
              state = FRAGMENT;
            }
          } else {
            buffer += percentEncode(chr, pathPercentEncodeSet);
          } break;

        case CANNOT_BE_A_BASE_URL_PATH:
          if (chr === '?') {
            url.query = '';
            state = QUERY;
          } else if (chr === '#') {
            url.fragment = '';
            state = FRAGMENT;
          } else if (chr !== EOF) {
            url.path[0] += percentEncode(chr, C0ControlPercentEncodeSet);
          } break;

        case QUERY:
          if (!stateOverride && chr === '#') {
            url.fragment = '';
            state = FRAGMENT;
          } else if (chr !== EOF) {
            if (chr === "'" && url.isSpecial()) url.query += '%27';
            else if (chr === '#') url.query += '%23';
            else url.query += percentEncode(chr, C0ControlPercentEncodeSet);
          } break;

        case FRAGMENT:
          if (chr !== EOF) url.fragment += percentEncode(chr, fragmentPercentEncodeSet);
          break;
      }

      pointer++;
    }
  },
  // https://url.spec.whatwg.org/#host-parsing
  parseHost: function (input) {
    var result, codePoints, index;
    if (charAt(input, 0) === '[') {
      if (charAt(input, input.length - 1) !== ']') return INVALID_HOST;
      result = parseIPv6(stringSlice(input, 1, -1));
      if (!result) return INVALID_HOST;
      this.host = result;
    // opaque host
    } else if (!this.isSpecial()) {
      if (exec(FORBIDDEN_HOST_CODE_POINT_EXCLUDING_PERCENT, input)) return INVALID_HOST;
      result = '';
      codePoints = arrayFrom(input);
      for (index = 0; index < codePoints.length; index++) {
        result += percentEncode(codePoints[index], C0ControlPercentEncodeSet);
      }
      this.host = result;
    } else {
      input = toASCII(input);
      if (exec(FORBIDDEN_HOST_CODE_POINT, input)) return INVALID_HOST;
      result = parseIPv4(input);
      if (result === null) return INVALID_HOST;
      this.host = result;
    }
  },
  // https://url.spec.whatwg.org/#cannot-have-a-username-password-port
  cannotHaveUsernamePasswordPort: function () {
    return !this.host || this.cannotBeABaseURL || this.scheme === 'file';
  },
  // https://url.spec.whatwg.org/#include-credentials
  includesCredentials: function () {
    return this.username !== '' || this.password !== '';
  },
  // https://url.spec.whatwg.org/#is-special
  isSpecial: function () {
    return hasOwn(specialSchemes, this.scheme);
  },
  // https://url.spec.whatwg.org/#shorten-a-urls-path
  shortenPath: function () {
    var path = this.path;
    var pathSize = path.length;
    if (pathSize && (this.scheme !== 'file' || pathSize !== 1 || !isWindowsDriveLetter(path[0], true))) {
      path.length--;
    }
  },
  // https://url.spec.whatwg.org/#concept-url-serializer
  serialize: function () {
    var url = this;
    var scheme = url.scheme;
    var username = url.username;
    var password = url.password;
    var host = url.host;
    var port = url.port;
    var path = url.path;
    var query = url.query;
    var fragment = url.fragment;
    var output = scheme + ':';
    if (host !== null) {
      output += '//';
      if (url.includesCredentials()) {
        output += username + (password ? ':' + password : '') + '@';
      }
      output += serializeHost(host);
      if (port !== null) output += ':' + port;
    } else if (scheme === 'file') output += '//';
    output += url.cannotBeABaseURL ? path[0] : path.length ? '/' + join(path, '/') : '';
    if (query !== null) output += '?' + query;
    if (fragment !== null) output += '#' + fragment;
    return output;
  },
  // https://url.spec.whatwg.org/#dom-url-href
  setHref: function (href) {
    var failure = this.parse(href);
    if (failure) throw new TypeError(failure);
    this.searchParams.update();
  },
  // https://url.spec.whatwg.org/#dom-url-origin
  getOrigin: function () {
    var scheme = this.scheme;
    var port = this.port;
    if (scheme === 'blob') try {
      return new URLConstructor(scheme.path[0]).origin;
    } catch (error) {
      return 'null';
    }
    if (scheme === 'file' || !this.isSpecial()) return 'null';
    return scheme + '://' + serializeHost(this.host) + (port !== null ? ':' + port : '');
  },
  // https://url.spec.whatwg.org/#dom-url-protocol
  getProtocol: function () {
    return this.scheme + ':';
  },
  setProtocol: function (protocol) {
    this.parse($toString(protocol) + ':', SCHEME_START);
  },
  // https://url.spec.whatwg.org/#dom-url-username
  getUsername: function () {
    return this.username;
  },
  setUsername: function (username) {
    var codePoints = arrayFrom($toString(username));
    if (this.cannotHaveUsernamePasswordPort()) return;
    this.username = '';
    for (var i = 0; i < codePoints.length; i++) {
      this.username += percentEncode(codePoints[i], userinfoPercentEncodeSet);
    }
  },
  // https://url.spec.whatwg.org/#dom-url-password
  getPassword: function () {
    return this.password;
  },
  setPassword: function (password) {
    var codePoints = arrayFrom($toString(password));
    if (this.cannotHaveUsernamePasswordPort()) return;
    this.password = '';
    for (var i = 0; i < codePoints.length; i++) {
      this.password += percentEncode(codePoints[i], userinfoPercentEncodeSet);
    }
  },
  // https://url.spec.whatwg.org/#dom-url-host
  getHost: function () {
    var host = this.host;
    var port = this.port;
    return host === null ? ''
      : port === null ? serializeHost(host)
      : serializeHost(host) + ':' + port;
  },
  setHost: function (host) {
    if (this.cannotBeABaseURL) return;
    this.parse(host, HOST);
  },
  // https://url.spec.whatwg.org/#dom-url-hostname
  getHostname: function () {
    var host = this.host;
    return host === null ? '' : serializeHost(host);
  },
  setHostname: function (hostname) {
    if (this.cannotBeABaseURL) return;
    this.parse(hostname, HOSTNAME);
  },
  // https://url.spec.whatwg.org/#dom-url-port
  getPort: function () {
    var port = this.port;
    return port === null ? '' : $toString(port);
  },
  setPort: function (port) {
    if (this.cannotHaveUsernamePasswordPort()) return;
    port = $toString(port);
    if (port === '') this.port = null;
    else this.parse(port, PORT);
  },
  // https://url.spec.whatwg.org/#dom-url-pathname
  getPathname: function () {
    var path = this.path;
    return this.cannotBeABaseURL ? path[0] : path.length ? '/' + join(path, '/') : '';
  },
  setPathname: function (pathname) {
    if (this.cannotBeABaseURL) return;
    this.path = [];
    this.parse(pathname, PATH_START);
  },
  // https://url.spec.whatwg.org/#dom-url-search
  getSearch: function () {
    var query = this.query;
    return query ? '?' + query : '';
  },
  setSearch: function (search) {
    search = $toString(search);
    if (search === '') {
      this.query = null;
    } else {
      if (charAt(search, 0) === '?') search = stringSlice(search, 1);
      this.query = '';
      this.parse(search, QUERY);
    }
    this.searchParams.update();
  },
  // https://url.spec.whatwg.org/#dom-url-searchparams
  getSearchParams: function () {
    return this.searchParams.facade;
  },
  // https://url.spec.whatwg.org/#dom-url-hash
  getHash: function () {
    var fragment = this.fragment;
    return fragment ? '#' + fragment : '';
  },
  setHash: function (hash) {
    hash = $toString(hash);
    if (hash === '') {
      this.fragment = null;
      return;
    }
    if (charAt(hash, 0) === '#') hash = stringSlice(hash, 1);
    this.fragment = '';
    this.parse(hash, FRAGMENT);
  },
  update: function () {
    this.query = this.searchParams.serialize() || null;
  }
};

// `URL` constructor
// https://url.spec.whatwg.org/#url-class
var URLConstructor = function URL(url /* , base */) {
  var that = anInstance(this, URLPrototype);
  var base = validateArgumentsLength(arguments.length, 1) > 1 ? arguments[1] : undefined;
  var state = setInternalState(that, new URLState(url, false, base));
  if (!DESCRIPTORS) {
    that.href = state.serialize();
    that.origin = state.getOrigin();
    that.protocol = state.getProtocol();
    that.username = state.getUsername();
    that.password = state.getPassword();
    that.host = state.getHost();
    that.hostname = state.getHostname();
    that.port = state.getPort();
    that.pathname = state.getPathname();
    that.search = state.getSearch();
    that.searchParams = state.getSearchParams();
    that.hash = state.getHash();
  }
};

var URLPrototype = URLConstructor.prototype;

var accessorDescriptor = function (getter, setter) {
  return {
    get: function () {
      return getInternalURLState(this)[getter]();
    },
    set: setter && function (value) {
      return getInternalURLState(this)[setter](value);
    },
    configurable: true,
    enumerable: true
  };
};

if (DESCRIPTORS) {
  // `URL.prototype.href` accessors pair
  // https://url.spec.whatwg.org/#dom-url-href
  defineBuiltInAccessor(URLPrototype, 'href', accessorDescriptor('serialize', 'setHref'));
  // `URL.prototype.origin` getter
  // https://url.spec.whatwg.org/#dom-url-origin
  defineBuiltInAccessor(URLPrototype, 'origin', accessorDescriptor('getOrigin'));
  // `URL.prototype.protocol` accessors pair
  // https://url.spec.whatwg.org/#dom-url-protocol
  defineBuiltInAccessor(URLPrototype, 'protocol', accessorDescriptor('getProtocol', 'setProtocol'));
  // `URL.prototype.username` accessors pair
  // https://url.spec.whatwg.org/#dom-url-username
  defineBuiltInAccessor(URLPrototype, 'username', accessorDescriptor('getUsername', 'setUsername'));
  // `URL.prototype.password` accessors pair
  // https://url.spec.whatwg.org/#dom-url-password
  defineBuiltInAccessor(URLPrototype, 'password', accessorDescriptor('getPassword', 'setPassword'));
  // `URL.prototype.host` accessors pair
  // https://url.spec.whatwg.org/#dom-url-host
  defineBuiltInAccessor(URLPrototype, 'host', accessorDescriptor('getHost', 'setHost'));
  // `URL.prototype.hostname` accessors pair
  // https://url.spec.whatwg.org/#dom-url-hostname
  defineBuiltInAccessor(URLPrototype, 'hostname', accessorDescriptor('getHostname', 'setHostname'));
  // `URL.prototype.port` accessors pair
  // https://url.spec.whatwg.org/#dom-url-port
  defineBuiltInAccessor(URLPrototype, 'port', accessorDescriptor('getPort', 'setPort'));
  // `URL.prototype.pathname` accessors pair
  // https://url.spec.whatwg.org/#dom-url-pathname
  defineBuiltInAccessor(URLPrototype, 'pathname', accessorDescriptor('getPathname', 'setPathname'));
  // `URL.prototype.search` accessors pair
  // https://url.spec.whatwg.org/#dom-url-search
  defineBuiltInAccessor(URLPrototype, 'search', accessorDescriptor('getSearch', 'setSearch'));
  // `URL.prototype.searchParams` getter
  // https://url.spec.whatwg.org/#dom-url-searchparams
  defineBuiltInAccessor(URLPrototype, 'searchParams', accessorDescriptor('getSearchParams'));
  // `URL.prototype.hash` accessors pair
  // https://url.spec.whatwg.org/#dom-url-hash
  defineBuiltInAccessor(URLPrototype, 'hash', accessorDescriptor('getHash', 'setHash'));
}

// `URL.prototype.toJSON` method
// https://url.spec.whatwg.org/#dom-url-tojson
defineBuiltIn(URLPrototype, 'toJSON', function toJSON() {
  return getInternalURLState(this).serialize();
}, { enumerable: true });

// `URL.prototype.toString` method
// https://url.spec.whatwg.org/#URL-stringification-behavior
defineBuiltIn(URLPrototype, 'toString', function toString() {
  return getInternalURLState(this).serialize();
}, { enumerable: true });

if (NativeURL) {
  var nativeCreateObjectURL = NativeURL.createObjectURL;
  var nativeRevokeObjectURL = NativeURL.revokeObjectURL;
  // `URL.createObjectURL` method
  // https://developer.mozilla.org/en-US/docs/Web/API/URL/createObjectURL
  if (nativeCreateObjectURL) defineBuiltIn(URLConstructor, 'createObjectURL', bind(nativeCreateObjectURL, NativeURL));
  // `URL.revokeObjectURL` method
  // https://developer.mozilla.org/en-US/docs/Web/API/URL/revokeObjectURL
  if (nativeRevokeObjectURL) defineBuiltIn(URLConstructor, 'revokeObjectURL', bind(nativeRevokeObjectURL, NativeURL));
}

setToStringTag(URLConstructor, 'URL');

$({ global: true, constructor: true, forced: !USE_NATIVE_URL, sham: !DESCRIPTORS }, {
  URL: URLConstructor
});


/***/ }),

/***/ "../../node_modules/core-js/modules/web.url.js":
/*!*****************************************************!*\
  !*** ../../node_modules/core-js/modules/web.url.js ***!
  \*****************************************************/
/***/ ((__unused_webpack_module, __unused_webpack_exports, __webpack_require__) => {


// TODO: Remove this module from `core-js@4` since it's replaced to module below
__webpack_require__(/*! ../modules/web.url.constructor */ "../../node_modules/core-js/modules/web.url.constructor.js");


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
/******/ 		__webpack_modules__[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/ 	
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/ 	
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = __webpack_modules__;
/******/ 	
/************************************************************************/
/******/ 	/* webpack/runtime/compat get default export */
/******/ 	(() => {
/******/ 		// getDefaultExport function for compatibility with non-harmony modules
/******/ 		__webpack_require__.n = (module) => {
/******/ 			var getter = module && module.__esModule ?
/******/ 				() => (module['default']) :
/******/ 				() => (module);
/******/ 			__webpack_require__.d(getter, { a: getter });
/******/ 			return getter;
/******/ 		};
/******/ 	})();
/******/ 	
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
/******/ 	/* webpack/runtime/ensure chunk */
/******/ 	(() => {
/******/ 		__webpack_require__.f = {};
/******/ 		// This file contains only the entry chunk.
/******/ 		// The chunk loading function for additional chunks
/******/ 		__webpack_require__.e = (chunkId) => {
/******/ 			return Promise.all(Object.keys(__webpack_require__.f).reduce((promises, key) => {
/******/ 				__webpack_require__.f[key](chunkId, promises);
/******/ 				return promises;
/******/ 			}, []));
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/get javascript chunk filename */
/******/ 	(() => {
/******/ 		// This function allow to reference async chunks
/******/ 		__webpack_require__.u = (chunkId) => {
/******/ 			// return url for filenames based on template
/******/ 			return "" + chunkId + ".js";
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/get mini-css chunk filename */
/******/ 	(() => {
/******/ 		// This function allow to reference async chunks
/******/ 		__webpack_require__.miniCssF = (chunkId) => {
/******/ 			// return url for filenames based on template
/******/ 			return undefined;
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/global */
/******/ 	(() => {
/******/ 		__webpack_require__.g = (function() {
/******/ 			if (typeof globalThis === 'object') return globalThis;
/******/ 			try {
/******/ 				return this || new Function('return this')();
/******/ 			} catch (e) {
/******/ 				if (typeof window === 'object') return window;
/******/ 			}
/******/ 		})();
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/hasOwnProperty shorthand */
/******/ 	(() => {
/******/ 		__webpack_require__.o = (obj, prop) => (Object.prototype.hasOwnProperty.call(obj, prop))
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/load script */
/******/ 	(() => {
/******/ 		var inProgress = {};
/******/ 		// data-webpack is not used as build has no uniqueName
/******/ 		// loadScript function to load a script via script tag
/******/ 		__webpack_require__.l = (url, done, key, chunkId) => {
/******/ 			if(inProgress[url]) { inProgress[url].push(done); return; }
/******/ 			var script, needAttach;
/******/ 			if(key !== undefined) {
/******/ 				var scripts = document.getElementsByTagName("script");
/******/ 				for(var i = 0; i < scripts.length; i++) {
/******/ 					var s = scripts[i];
/******/ 					if(s.getAttribute("src") == url) { script = s; break; }
/******/ 				}
/******/ 			}
/******/ 			if(!script) {
/******/ 				needAttach = true;
/******/ 				script = document.createElement('script');
/******/ 		
/******/ 				script.charset = 'utf-8';
/******/ 				script.timeout = 120;
/******/ 				if (__webpack_require__.nc) {
/******/ 					script.setAttribute("nonce", __webpack_require__.nc);
/******/ 				}
/******/ 		
/******/ 				script.src = url;
/******/ 			}
/******/ 			inProgress[url] = [done];
/******/ 			var onScriptComplete = (prev, event) => {
/******/ 				// avoid mem leaks in IE.
/******/ 				script.onerror = script.onload = null;
/******/ 				clearTimeout(timeout);
/******/ 				var doneFns = inProgress[url];
/******/ 				delete inProgress[url];
/******/ 				script.parentNode && script.parentNode.removeChild(script);
/******/ 				doneFns && doneFns.forEach((fn) => (fn(event)));
/******/ 				if(prev) return prev(event);
/******/ 			};
/******/ 			var timeout = setTimeout(onScriptComplete.bind(null, undefined, { type: 'timeout', target: script }), 120000);
/******/ 			script.onerror = onScriptComplete.bind(null, script.onerror);
/******/ 			script.onload = onScriptComplete.bind(null, script.onload);
/******/ 			needAttach && document.head.appendChild(script);
/******/ 		};
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
/******/ 	/* webpack/runtime/publicPath */
/******/ 	(() => {
/******/ 		var scriptUrl;
/******/ 		if (__webpack_require__.g.importScripts) scriptUrl = __webpack_require__.g.location + "";
/******/ 		var document = __webpack_require__.g.document;
/******/ 		if (!scriptUrl && document) {
/******/ 			if (document.currentScript)
/******/ 				scriptUrl = document.currentScript.src
/******/ 			if (!scriptUrl) {
/******/ 				var scripts = document.getElementsByTagName("script");
/******/ 				if(scripts.length) scriptUrl = scripts[scripts.length - 1].src
/******/ 			}
/******/ 		}
/******/ 		// When supporting browsers where an automatic publicPath is not supported you must specify an output.publicPath manually via configuration
/******/ 		// or pass an empty string ("") and set the __webpack_public_path__ variable from your code to use your own logic.
/******/ 		if (!scriptUrl) throw new Error("Automatic publicPath is not supported in this browser");
/******/ 		scriptUrl = scriptUrl.replace(/#.*$/, "").replace(/\?.*$/, "").replace(/\/[^\/]+$/, "/");
/******/ 		__webpack_require__.p = scriptUrl;
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/jsonp chunk loading */
/******/ 	(() => {
/******/ 		// no baseURI
/******/ 		
/******/ 		// object to store loaded and loading chunks
/******/ 		// undefined = chunk not loaded, null = chunk preloaded/prefetched
/******/ 		// [resolve, reject, Promise] = chunk loading, 0 = chunk loaded
/******/ 		var installedChunks = {
/******/ 			"main": 0
/******/ 		};
/******/ 		
/******/ 		__webpack_require__.f.j = (chunkId, promises) => {
/******/ 				// JSONP chunk loading for javascript
/******/ 				var installedChunkData = __webpack_require__.o(installedChunks, chunkId) ? installedChunks[chunkId] : undefined;
/******/ 				if(installedChunkData !== 0) { // 0 means "already installed".
/******/ 		
/******/ 					// a Promise means "currently loading".
/******/ 					if(installedChunkData) {
/******/ 						promises.push(installedChunkData[2]);
/******/ 					} else {
/******/ 						if(true) { // all chunks have JS
/******/ 							// setup Promise in chunk cache
/******/ 							var promise = new Promise((resolve, reject) => (installedChunkData = installedChunks[chunkId] = [resolve, reject]));
/******/ 							promises.push(installedChunkData[2] = promise);
/******/ 		
/******/ 							// start chunk loading
/******/ 							var url = __webpack_require__.p + __webpack_require__.u(chunkId);
/******/ 							// create error before stack unwound to get useful stacktrace later
/******/ 							var error = new Error();
/******/ 							var loadingEnded = (event) => {
/******/ 								if(__webpack_require__.o(installedChunks, chunkId)) {
/******/ 									installedChunkData = installedChunks[chunkId];
/******/ 									if(installedChunkData !== 0) installedChunks[chunkId] = undefined;
/******/ 									if(installedChunkData) {
/******/ 										var errorType = event && (event.type === 'load' ? 'missing' : event.type);
/******/ 										var realSrc = event && event.target && event.target.src;
/******/ 										error.message = 'Loading chunk ' + chunkId + ' failed.\n(' + errorType + ': ' + realSrc + ')';
/******/ 										error.name = 'ChunkLoadError';
/******/ 										error.type = errorType;
/******/ 										error.request = realSrc;
/******/ 										installedChunkData[1](error);
/******/ 									}
/******/ 								}
/******/ 							};
/******/ 							__webpack_require__.l(url, loadingEnded, "chunk-" + chunkId, chunkId);
/******/ 						} else installedChunks[chunkId] = 0;
/******/ 					}
/******/ 				}
/******/ 		};
/******/ 		
/******/ 		// no prefetching
/******/ 		
/******/ 		// no preloaded
/******/ 		
/******/ 		// no HMR
/******/ 		
/******/ 		// no HMR manifest
/******/ 		
/******/ 		// no on chunks loaded
/******/ 		
/******/ 		// install a JSONP callback for chunk loading
/******/ 		var webpackJsonpCallback = (parentChunkLoadingFunction, data) => {
/******/ 			var [chunkIds, moreModules, runtime] = data;
/******/ 			// add "moreModules" to the modules object,
/******/ 			// then flag all "chunkIds" as loaded and fire callback
/******/ 			var moduleId, chunkId, i = 0;
/******/ 			if(chunkIds.some((id) => (installedChunks[id] !== 0))) {
/******/ 				for(moduleId in moreModules) {
/******/ 					if(__webpack_require__.o(moreModules, moduleId)) {
/******/ 						__webpack_require__.m[moduleId] = moreModules[moduleId];
/******/ 					}
/******/ 				}
/******/ 				if(runtime) var result = runtime(__webpack_require__);
/******/ 			}
/******/ 			if(parentChunkLoadingFunction) parentChunkLoadingFunction(data);
/******/ 			for(;i < chunkIds.length; i++) {
/******/ 				chunkId = chunkIds[i];
/******/ 				if(__webpack_require__.o(installedChunks, chunkId) && installedChunks[chunkId]) {
/******/ 					installedChunks[chunkId][0]();
/******/ 				}
/******/ 				installedChunks[chunkId] = 0;
/******/ 			}
/******/ 		
/******/ 		}
/******/ 		
/******/ 		var chunkLoadingGlobal = self["webpackChunk"] = self["webpackChunk"] || [];
/******/ 		chunkLoadingGlobal.forEach(webpackJsonpCallback.bind(null, 0));
/******/ 		chunkLoadingGlobal.push = webpackJsonpCallback.bind(null, chunkLoadingGlobal.push.bind(chunkLoadingGlobal));
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
/* harmony import */ var core_js_modules_es_array_includes_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! core-js/modules/es.array.includes.js */ "../../node_modules/core-js/modules/es.array.includes.js");
/* harmony import */ var core_js_modules_es_array_includes_js__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(core_js_modules_es_array_includes_js__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _examples_main_css__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../../examples/main.css */ "../../examples/main.css");
/* harmony import */ var _common__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../common */ "../common.js");
/* harmony import */ var _libs_baseInits__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../../libs/baseInits */ "../../libs/baseInits.js");
/* harmony import */ var _textareaInserts__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./textareaInserts */ "./textareaInserts.js");


const configFileName = "extres_config.json";
const schemaFileName = "extres_config.schema.json";
function loadJSON() {
  fetch(configFileName).then(response => {
    if (!response.ok) {
      throw new Error(`ExtRes: Error reading '${configFileName}'!`);
    }
    return response.json();
  }).then(json => initJSON(json)).catch(error => console.error(error));
}

function startImportSchemaListener() {
  // listener for providing JSON SCHEMA to ItemBuilder
  window.addEventListener("message", event => {
    try {
      const {
        callId
      } = JSON.parse(event.data);
      if (callId !== undefined && callId.includes("importJsonData")) {
        fetch(schemaFileName).then(response => {
          if (!response.ok) {
            throw new Error(`ExtRes: Error reading '${schemaFileName}'!`);
          }
          return response.json();
        }).then(jsonSchema => {
          const pass_data = {
            jsonSchema,
            configFileName: (0,_common__WEBPACK_IMPORTED_MODULE_2__.getEPFFolderName)() + '/' + configFileName,
            callId
          };
          window.parent.postMessage(JSON.stringify(pass_data), '*');
        }).catch(error => console.error(error));
      }
    } catch (e) {}
  }, false);
}
function initExtRes() {
  startImportSchemaListener();
  loadJSON();
}



////////////////////////////
//////////////////////////////////////////////
////////////////////////////////
//////////////////////////////////////////////////
////////////////////////////////////
//////////////////////////////////////////////////////////
//////////////////////////////////////
//////////////////////////////////////////////////////////////
////////////////////////////////
//////////////////////////////////////////////////
////////////////////////////////
//////////////////////////////////////////////////
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
////////////////////////////////
//////////////////////////////////////////////////
////////////////////////////////////////
//////////////////////////////////////////////////////////////////
//////////////////////////////////
//////////////////////////////////////////////////////
///////////////////////////////////
////////////////////////////////////////////////////////
//////////////////////////////////////

//////////


let baseInitialized = new _common__WEBPACK_IMPORTED_MODULE_2__.ResolvablePromise();
// let jsonLoaded = new ResolvablePromise();	// for I18N

function initJSON(json) {
  if (typeof json === 'string') {
    try {
      json = JSON.parse(json, true);
    } catch (e) {
      console.error(`Format-Error in JSON file '${configFileName}'`);
      return;
    }
  }
  // jsonLoaded.resolvePromise( json );	// for I18N

  const cfg = (0,_common__WEBPACK_IMPORTED_MODULE_2__.clearCfgJson)(json);

  /////////////////////////////////////////////////////////////////
  const base = new _libs_baseInits__WEBPACK_IMPORTED_MODULE_3__.baseInits();
  /////////
  //////////////////////////////////////////////////////////
  //////////
  baseInitialized.resolvePromise(base);
  if (cfg.dataSettings) {
    base.dataSettings = cfg.dataSettings;
  }

  // load Parser lazy or not
  (cfg.dataSettings && cfg.dataSettings.scoringVals && cfg.dataSettings.scoringVals.length > 0 ? __webpack_require__.e(/*! import() | sce */ "sce").then(__webpack_require__.bind(__webpack_require__, /*! expr-eval */ "../../node_modules/expr-eval/dist/index.mjs")).then(_ref => {
    let {
      Parser
    } = _ref;
    return {
      Parser
    };
  }) : Promise.resolve({})).then(addMods => {
    // there will be subsequent inits
    if (base.fsm && base.fsm.incInitCnt) {
      base.fsm.incInitCnt();
    }

    ////////////////////////////
    /////////////////////////////////////////////////////////
    ////////////////////////////////
    ///////////////////////////////////////////////////////////
    ////////////////////////////////////
    ///////////////////////////////////////////////////////////////
    //////////////////////////////////////
    /////////////////////////////////////////////////////////////////
    ////////////////////////////////
    ///////////////////////////////////////////////////////////
    ////////////////////////////////
    //////////////////////////////////////////////////
    ////////////////////////////////
    //////////////////////////////////////////////////
    ////////////////////////////////////////
    ///////////////////////////////////////////////////////////////////
    /////////////////////////////////
    ///////////////////////////////////////////////////
    ////////////////////////////////////////////////
    ///////////////////////////////////////////////////////////////////////////
    /////////////////////////////////////////
    ////////////////////////////////////////////////////////////////////
    ////////////////////////////////
    ///////////////////////////////////////////////////////////
    ////////////////////////////////////////
    ///////////////////////////////////////////////////////////////////
    //////////////////////////////////
    ////////////////////////////////////////////////////
    ///////////////////////////////////
    ////////////////////////////////////////////////////////////////////////////
    //////////////////////////////////////
    const io = new _textareaInserts__WEBPACK_IMPORTED_MODULE_4__.textareaInsertsFromSchema('#container', cfg, base);
    //////////

    (0,_common__WEBPACK_IMPORTED_MODULE_2__.addStatusVarDef)(io, json);
    base.sendChangeState(io);
    if (io.getState) {
      window.getState = io.getState.bind(io);
    }
    if (io.setState) {
      window.setState = io.setState.bind(io);
    }
    if (base.fsm && base.fsm.decInitCnt) {
      base.fsm.decInitCnt();
    }
  });
}
document.addEventListener("DOMContentLoaded", initExtRes);

//////////////////////////////////////////////////////////////////////////////

// hack for IB request "importVariables" before base is initialized

function sendVarDecl(event) {
  try {
    const {
      callId
    } = JSON.parse(event.data);
    if (callId !== undefined && callId.includes("importVariables")) {
      // answer message when base is initialized
      baseInitialized.promise.then(base => base.fsm.answerVarDeclReq(callId));
    }
  } catch (e) {}
}
function handleIBearlyVarImport() {
  window.addEventListener("message", sendVarDecl, false);
  baseInitialized.promise.then(() => window.removeEventListener("message", sendVarDecl));
}
handleIBearlyVarImport();

// //////////////////////////////////////////////////////////////////////////////

// // I18N support

// import { getI18nDescr } from '../common';

// async function sendI18nDescr (callId) {

// 	const json = await jsonLoaded.promise;

// 	const i18nData = getI18nDescr( json );

// 	// Send Message
// 	const data = {
// 		callId,
// 		i18nData,
// 	}
// 	baseInitialized.promise.then( base => base.fsm.postMessage( JSON.stringify( data ) ) );

// }

// ///////////////////////////////////////

// import { patchCfgI18n } from '../common';

// async function loadI18n ( i18n ) {

// 	// Wenn json geladen
// 	const json = await jsonLoaded.promise;
// 	// patch the CFG-JSON with the I18N-Strings
// 	patchCfgI18n( json, i18n );
// // console.log(json);

// 	// Wenn alles fertig initialisiert
// 	const base = await baseInitialized.promise;
// 	await base.fsm.getInitDonePromise();

// 	// dann als nächster Schritt die I18N-Strings laden
// 	setTimeout( () => {
// 		baseInitialized = new ResolvablePromise();
// 		jsonLoaded = new ResolvablePromise();
// 		handleIBearlyVarImport();

// 		let state = null;
// 		if ( window.getState ) {
// 			state = window.getState();
// 		}
// 		initJSON( json );
// 		if ( state ) {
// 			window.setState( state );
// 		}
// 	})
// }

// ///////////////////////////////////////

// function i18nListener (event) {

// 	try {
// 		const { callId, i18n } = JSON.parse(event.data);
// 		if ( callId !== undefined && callId.includes("importI18n") ) {
// 			sendI18nDescr( callId );
// 		} else if ( callId !== undefined && callId.includes("setI18n") ) {
// 			loadI18n( i18n );
// 		}
// 	}
// 	catch (e) {}

// }

// window.addEventListener( "message", i18nListener, false );

// // window.sendI18nDescr = sendI18nDescr;
// // window.loadI18n = loadI18n;
})();

/******/ })()
;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,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Q0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxJQUFJO0FBQ0o7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTs7QUFFQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLFlBQVk7QUFDWjtBQUNBO0FBQ0EsWUFBWTtBQUNaOztBQUVBO0FBQ0E7QUFDQTtBQUNBLFlBQVk7QUFDWjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLGNBQWM7QUFDZDtBQUNBLGNBQWM7QUFDZDtBQUNBLGNBQWM7QUFDZDtBQUNBO0FBQ0EsY0FBYztBQUNkO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsWUFBWTtBQUNaO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsWUFBWTtBQUNaOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsWUFBWTtBQUNaO0FBQ0E7QUFDQSxZQUFZOztBQUVaO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsWUFBWTtBQUNaO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxZQUFZO0FBQ1o7QUFDQSxZQUFZO0FBQ1o7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxZQUFZO0FBQ1o7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLFlBQVk7QUFDWjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsWUFBWTs7QUFFWjtBQUNBO0FBQ0E7QUFDQSxZQUFZO0FBQ1o7QUFDQSxZQUFZO0FBQ1o7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsWUFBWTs7QUFFWjtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsWUFBWTs7QUFFWjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsNEJBQTRCLDZCQUE2QjtBQUN6RDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLFlBQVk7QUFDWjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLFlBQVk7QUFDWjs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsWUFBWTtBQUNaO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLFlBQVk7QUFDWjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsWUFBWTtBQUNaO0FBQ0E7QUFDQTtBQUNBLFlBQVk7O0FBRVo7QUFDQTtBQUNBO0FBQ0EsWUFBWTtBQUNaO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsWUFBWTtBQUNaOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxZQUFZO0FBQ1o7QUFDQTtBQUNBLFlBQVk7O0FBRVo7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLGNBQWM7QUFDZDtBQUNBO0FBQ0E7QUFDQSxjQUFjO0FBQ2Q7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsY0FBYztBQUNkLFlBQVk7QUFDWjs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLFlBQVk7QUFDWjtBQUNBO0FBQ0EsWUFBWTtBQUNaO0FBQ0E7QUFDQSxZQUFZO0FBQ1o7QUFDQTtBQUNBLFlBQVk7O0FBRVo7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLGNBQWM7QUFDZDtBQUNBO0FBQ0E7QUFDQSxjQUFjO0FBQ2Q7QUFDQTtBQUNBLGtEQUFrRDtBQUNsRDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxjQUFjO0FBQ2Q7QUFDQTtBQUNBO0FBQ0EsWUFBWTtBQUNaO0FBQ0EsWUFBWTs7QUFFWjtBQUNBO0FBQ0E7QUFDQTtBQUNBLFlBQVk7QUFDWjtBQUNBO0FBQ0EsWUFBWTtBQUNaO0FBQ0EsWUFBWTs7QUFFWjtBQUNBO0FBQ0E7QUFDQTtBQUNBLFlBQVk7QUFDWjtBQUNBO0FBQ0E7QUFDQSxZQUFZOztBQUVaO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQSxHQUFHO0FBQ0g7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsTUFBTTtBQUNOO0FBQ0E7QUFDQTtBQUNBLHNCQUFzQiwyQkFBMkI7QUFDakQ7QUFDQTtBQUNBO0FBQ0EsTUFBTTtBQUNOO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLEdBQUc7QUFDSDtBQUNBO0FBQ0E7QUFDQSxHQUFHO0FBQ0g7QUFDQTtBQUNBO0FBQ0EsR0FBRztBQUNIO0FBQ0E7QUFDQTtBQUNBLEdBQUc7QUFDSDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLEdBQUc7QUFDSDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLE1BQU07QUFDTjtBQUNBO0FBQ0E7QUFDQTtBQUNBLEdBQUc7QUFDSDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsR0FBRztBQUNIO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLE1BQU07QUFDTjtBQUNBO0FBQ0E7QUFDQTtBQUNBLEdBQUc7QUFDSDtBQUNBO0FBQ0E7QUFDQSxHQUFHO0FBQ0g7QUFDQTtBQUNBLEdBQUc7QUFDSDtBQUNBO0FBQ0E7QUFDQSxHQUFHO0FBQ0g7QUFDQTtBQUNBO0FBQ0E7QUFDQSxvQkFBb0IsdUJBQXVCO0FBQzNDO0FBQ0E7QUFDQSxHQUFHO0FBQ0g7QUFDQTtBQUNBO0FBQ0EsR0FBRztBQUNIO0FBQ0E7QUFDQTtBQUNBO0FBQ0Esb0JBQW9CLHVCQUF1QjtBQUMzQztBQUNBO0FBQ0EsR0FBRztBQUNIO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsR0FBRztBQUNIO0FBQ0E7QUFDQTtBQUNBLEdBQUc7QUFDSDtBQUNBO0FBQ0E7QUFDQTtBQUNBLEdBQUc7QUFDSDtBQUNBO0FBQ0E7QUFDQSxHQUFHO0FBQ0g7QUFDQTtBQUNBO0FBQ0E7QUFDQSxHQUFHO0FBQ0g7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLEdBQUc7QUFDSDtBQUNBO0FBQ0E7QUFDQTtBQUNBLEdBQUc7QUFDSDtBQUNBO0FBQ0E7QUFDQTtBQUNBLEdBQUc7QUFDSDtBQUNBO0FBQ0E7QUFDQTtBQUNBLEdBQUc7QUFDSDtBQUNBO0FBQ0E7QUFDQTtBQUNBLE1BQU07QUFDTjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsR0FBRztBQUNIO0FBQ0E7QUFDQTtBQUNBLEdBQUc7QUFDSDtBQUNBO0FBQ0E7QUFDQTtBQUNBLEdBQUc7QUFDSDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtB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UixnQkFBZ0IsQ0FBQ0MsTUFBTSxDQUFDLENBQUU7SUFDMUU7RUFDRCxDQUFDLENBQUMsT0FBT3pQLENBQUMsRUFBRSxDQUFDO0FBRWQ7QUFFQSxTQUFTb1osc0JBQXNCLEdBQUk7RUFDbEN4YixNQUFNLENBQUM4SyxnQkFBZ0IsQ0FBRSxTQUFTLEVBQUV5USxXQUFXLEVBQUUsS0FBSyxDQUFFO0VBQ3hESixlQUFlLENBQUM5UyxPQUFPLENBQUN5SixJQUFJLENBQUUsTUFBTTlSLE1BQU0sQ0FBQ3liLG1CQUFtQixDQUFFLFNBQVMsRUFBRUYsV0FBVyxDQUFFLENBQUU7QUFDM0Y7QUFFQUMsc0JBQXNCLEVBQUU7O0FBRXhCOztBQUVBOztBQUVBOztBQUVBOztBQUVBOztBQUVBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTs7QUFFQTs7QUFFQTs7QUFFQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBOztBQUVBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTs7QUFFQTs7QUFFQTtBQUNBLGlDIiwic291cmNlcyI6WyJ3ZWJwYWNrOi8vLy4vdGV4dGFyZWFJbnNlcnRzLmpzIiwid2VicGFjazovLy8uLi9jb21tb24uanMiLCJ3ZWJwYWNrOi8vLy4uLy4uL2xpYnMvYmFzZUluaXRzLmpzIiwid2VicGFjazovLy8uLi8uLi9saWJzL2NvbW1vbi5qcyIsIndlYnBhY2s6Ly8vLi4vLi4vbGlicy9mc20uanMiLCJ3ZWJwYWNrOi8vLy4uLy4uL2xpYnMvdGV4dGFyZWFJbnNlcnRzLmpzIiwid2VicGFjazovLy8uLi8uLi9leGFtcGxlcy9tYWluLmNzcz9hMzg0Iiwid2VicGFjazovLy8uLi8uLi9leGFtcGxlcy90ZXh0YXJlYUluc2VydHNfMmNvbHMuY3NzPzRiYTIiLCJ3ZWJwYWNrOi8vLy4uLy4uL2xpYnMvdGV4dGFyZWFJbnNlcnRzLmNzcz9jZTIzIiwid2VicGFjazovLy8uLi8uLi9ub2RlX21vZHVsZXMvY29yZS1qcy9pbnRlcm5hbHMvYS1jYWxsYWJsZS5qcyIsIndlYnBhY2s6Ly8vLi4vLi4vbm9kZV9tb2R1bGVzL2NvcmUtanMvaW50ZXJuYWxzL2EtY29uc3RydWN0b3IuanMiLCJ3ZWJwYWNrOi8vLy4uLy4uL25vZGVfbW9kdWxlcy9jb3JlLWpzL2ludGVybmFscy9hLXBvc3NpYmxlLXByb3RvdHlwZS5qcyIsIndlYnBhY2s6Ly8vLi4vLi4vbm9kZV9tb2R1bGVzL2NvcmUtanMvaW50ZXJuYWxzL2FkZC10by11bnNjb3BhYmxlcy5qcyIsIndlYnBhY2s6Ly8vLi4vLi4vbm9kZV9tb2R1bGVzL2NvcmUtanMvaW50ZXJuYWxzL2FkdmFuY2Utc3RyaW5nLWluZGV4LmpzIiwid2VicGFjazovLy8uLi8uLi9ub2RlX21vZHVsZXMvY29yZS1qcy9pbnRlcm5hbHMvYW4taW5zdGFuY2UuanMiLCJ3ZWJwYWNrOi8vLy4uLy4uL25vZGVfbW9kdWxlcy9jb3JlLWpzL2ludGVybmFscy9hbi1vYmplY3QuanMiLCJ3ZWJwYWNrOi8vLy4uLy4uL25vZGVfbW9kdWxlcy9jb3JlLWpzL2ludGVybmFscy9hcnJheS1mcm9tLmpzIiwid2VicGFjazovLy8uLi8uLi9ub2RlX21vZHVsZXMvY29yZS1qcy9pbnRlcm5hbHMvYXJyYXktaW5jbHVkZXMuanMiLCJ3ZWJwYWNrOi8vLy4uLy4uL25vZGVfbW9kdWxlcy9jb3JlLWpzL2ludGVybmFscy9hcnJheS1zbGljZS5qcyIsIndlYnBhY2s6Ly8vLi4vLi4vbm9kZV9tb2R1bGVzL2NvcmUtanMvaW50ZXJuYWxzL2FycmF5LXNvcnQuanMiLCJ3ZWJwYWNrOi8vLy4uLy4uL25vZGVfbW9kdWxlcy9jb3JlLWpzL2ludGVybmFscy9jYWxsLXdpdGgtc2FmZS1pdGVyYXRpb24tY2xvc2luZy5qcyIsIndlYnBhY2s6Ly8vLi4vLi4vbm9kZV9tb2R1bGVzL2NvcmUtanMvaW50ZXJuYWxzL2NsYXNzb2YtcmF3LmpzIiwid2VicGFjazovLy8uLi8uLi9ub2RlX21vZHVsZXMvY29yZS1qcy9pbnRlcm5hbHMvY2xhc3NvZi5qcyIsIndlYnBhY2s6Ly8vLi4vLi4vbm9kZV9tb2R1bGVzL2NvcmUtanMvaW50ZXJuYWxzL2NvcHktY29uc3RydWN0b3ItcHJvcGVydGllcy5qcyIsIndlYnBhY2s6Ly8vLi4vLi4vbm9kZV9tb2R1bGVzL2NvcmUtanMvaW50ZXJuYWxzL2NvcnJlY3QtcHJvdG90eXBlLWdldHRlci5qcyIsIndlYnBhY2s6Ly8vLi4vLi4vbm9kZV9tb2R1bGVzL2NvcmUtanMvaW50ZXJuYWxzL2NyZWF0ZS1pdGVyLXJlc3VsdC1vYmplY3QuanMiLCJ3ZWJwYWNrOi8vLy4uLy4uL25vZGVfbW9kdWxlcy9jb3JlLWpzL2ludGVybmFscy9jcmVhdGUtbm9uLWVudW1lcmFibGUtcHJvcGVydHkuanMiLCJ3ZWJwYWNrOi8vLy4uLy4uL25vZGVfbW9kdWxlcy9jb3JlLWpzL2ludGVybmFscy9jcmVhdGUtcHJvcGVydHktZGVzY3JpcHRvci5qcyIsIndlYnBhY2s6Ly8vLi4vLi4vbm9kZV9tb2R1bGVzL2NvcmUtanMvaW50ZXJuYWxzL2NyZWF0ZS1wcm9wZXJ0eS5qcyIsIndlYnBhY2s6Ly8vLi4vLi4vbm9kZV9tb2R1bGVzL2NvcmUtanMvaW50ZXJuYWxzL2RlZmluZS1idWlsdC1pbi1hY2Nlc3Nvci5qcyIsIndlYnBhY2s6Ly8vLi4vLi4vbm9kZV9tb2R1bGVzL2NvcmUtanMvaW50ZXJuYWxzL2RlZmluZS1idWlsdC1pbi5qcyIsIndlYnBhY2s6Ly8vLi4vLi4vbm9kZV9tb2R1bGVzL2NvcmUtanMvaW50ZXJuYWxzL2RlZmluZS1idWlsdC1pbnMuanMiLCJ3ZWJwYWNrOi8vLy4uLy4uL25vZGVfbW9kdWxlcy9jb3JlLWpzL2ludGVybmFscy9kZWZpbmUtZ2xvYmFsLXByb3BlcnR5LmpzIiwid2VicGFjazovLy8uLi8uLi9ub2RlX21vZHVsZXMvY29yZS1qcy9pbnRlcm5hbHMvZGVzY3JpcHRvcnMuanMiLCJ3ZWJwYWNrOi8vLy4uLy4uL25vZGVfbW9kdWxlcy9jb3JlLWpzL2ludGVybmFscy9kb2N1bWVudC1jcmVhdGUtZWxlbWVudC5qcyIsIndlYnBhY2s6Ly8vLi4vLi4vbm9kZV9tb2R1bGVzL2NvcmUtanMvaW50ZXJuYWxzL2VuZ2luZS11c2VyLWFnZW50LmpzIiwid2VicGFjazovLy8uLi8uLi9ub2RlX21vZHVsZXMvY29yZS1qcy9pbnRlcm5hbHMvZW5naW5lLXY4LXZlcnNpb24uanMiLCJ3ZWJwYWNrOi8vLy4uLy4uL25vZGVfbW9kdWxlcy9jb3JlLWpzL2ludGVybmFscy9lbnVtLWJ1Zy1rZXlzLmpzIiwid2VicGFjazovLy8uLi8uLi9ub2RlX21vZHVsZXMvY29yZS1qcy9pbnRlcm5hbHMvZXhwb3J0LmpzIiwid2VicGFjazovLy8uLi8uLi9ub2RlX21vZHVsZXMvY29yZS1qcy9pbnRlcm5hbHMvZmFpbHMuanMiLCJ3ZWJwYWNrOi8vLy4uLy4uL25vZGVfbW9kdWxlcy9jb3JlLWpzL2ludGVybmFscy9maXgtcmVnZXhwLXdlbGwta25vd24tc3ltYm9sLWxvZ2ljLmpzIiwid2VicGFjazovLy8uLi8uLi9ub2RlX21vZHVsZXMvY29yZS1qcy9pbnRlcm5hbHMvZnVuY3Rpb24tYXBwbHkuanMiLCJ3ZWJwYWNrOi8vLy4uLy4uL25vZGVfbW9kdWxlcy9jb3JlLWpzL2ludGVybmFscy9mdW5jdGlvbi1iaW5kLWNvbnRleHQuanMiLCJ3ZWJwYWNrOi8vLy4uLy4uL25vZGVfbW9kdWxlcy9jb3JlLWpzL2ludGVybmFscy9mdW5jdGlvbi1iaW5kLW5hdGl2ZS5qcyIsIndlYnBhY2s6Ly8vLi4vLi4vbm9kZV9tb2R1bGVzL2NvcmUtanMvaW50ZXJuYWxzL2Z1bmN0aW9uLWNhbGwuanMiLCJ3ZWJwYWNrOi8vLy4uLy4uL25vZGVfbW9kdWxlcy9jb3JlLWpzL2ludGVybmFscy9mdW5jdGlvbi1uYW1lLmpzIiwid2VicGFjazovLy8uLi8uLi9ub2RlX21vZHVsZXMvY29yZS1qcy9pbnRlcm5hbHMvZnVuY3Rpb24tdW5jdXJyeS10aGlzLWFjY2Vzc29yLmpzIiwid2VicGFjazovLy8uLi8uLi9ub2RlX21vZHVsZXMvY29yZS1qcy9pbnRlcm5hbHMvZnVuY3Rpb24tdW5jdXJyeS10aGlzLWNsYXVzZS5qcyIsIndlYnBhY2s6Ly8vLi4vLi4vbm9kZV9tb2R1bGVzL2NvcmUtanMvaW50ZXJuYWxzL2Z1bmN0aW9uLXVuY3VycnktdGhpcy5qcyIsIndlYnBhY2s6Ly8vLi4vLi4vbm9kZV9tb2R1bGVzL2NvcmUtanMvaW50ZXJuYWxzL2dldC1idWlsdC1pbi5qcyIsIndlYnBhY2s6Ly8vLi4vLi4vbm9kZV9tb2R1bGVzL2NvcmUtanMvaW50ZXJuYWxzL2dldC1pdGVyYXRvci1tZXRob2QuanMiLCJ3ZWJwYWNrOi8vLy4uLy4uL25vZGVfbW9kdWxlcy9jb3JlLWpzL2ludGVybmFscy9nZXQtaXRlcmF0b3IuanMiLCJ3ZWJwYWNrOi8vLy4uLy4uL25vZGVfbW9kdWxlcy9jb3JlLWpzL2ludGVybmFscy9nZXQtbWV0aG9kLmpzIiwid2VicGFjazovLy8uLi8uLi9ub2RlX21vZHVsZXMvY29yZS1qcy9pbnRlcm5hbHMvZ2V0LXN1YnN0aXR1dGlvbi5qcyIsIndlYnBhY2s6Ly8vLi4vLi4vbm9kZV9tb2R1bGVzL2NvcmUtanMvaW50ZXJuYWxzL2dsb2JhbC5qcyIsIndlYnBhY2s6Ly8vLi4vLi4vbm9kZV9tb2R1bGVzL2NvcmUtanMvaW50ZXJuYWxzL2hhcy1vd24tcHJvcGVydHkuanMiLCJ3ZWJwYWNrOi8vLy4uLy4uL25vZGVfbW9kdWxlcy9jb3JlLWpzL2ludGVybmFscy9oaWRkZW4ta2V5cy5qcyIsIndlYnBhY2s6Ly8vLi4vLi4vbm9kZV9tb2R1bGVzL2NvcmUtanMvaW50ZXJuYWxzL2h0bWwuanMiLCJ3ZWJwYWNrOi8vLy4uLy4uL25vZGVfbW9kdWxlcy9jb3JlLWpzL2ludGVybmFscy9pZTgtZG9tLWRlZmluZS5qcyIsIndlYnBhY2s6Ly8vLi4vLi4vbm9kZV9tb2R1bGVzL2NvcmUtanMvaW50ZXJuYWxzL2luZGV4ZWQtb2JqZWN0LmpzIiwid2VicGFjazovLy8uLi8uLi9ub2RlX21vZHVsZXMvY29yZS1qcy9pbnRlcm5hbHMvaW5oZXJpdC1pZi1yZXF1aXJlZC5qcyIsIndlYnBhY2s6Ly8vLi4vLi4vbm9kZV9tb2R1bGVzL2NvcmUtanMvaW50ZXJuYWxzL2luc3BlY3Qtc291cmNlLmpzIiwid2VicGFjazovLy8uLi8uLi9ub2RlX21vZHVsZXMvY29yZS1qcy9pbnRlcm5hbHMvaW50ZXJuYWwtc3RhdGUuanMiLCJ3ZWJwYWNrOi8vLy4uLy4uL25vZGVfbW9kdWxlcy9jb3JlLWpzL2ludGVybmFscy9pcy1hcnJheS1pdGVyYXRvci1tZXRob2QuanMiLCJ3ZWJwYWNrOi8vLy4uLy4uL25vZGVfbW9kdWxlcy9jb3JlLWpzL2ludGVybmFscy9pcy1jYWxsYWJsZS5qcyIsIndlYnBhY2s6Ly8vLi4vLi4vbm9kZV9tb2R1bGVzL2NvcmUtanMvaW50ZXJuYWxzL2lzLWNvbnN0cnVjdG9yLmpzIiwid2VicGFjazovLy8uLi8uLi9ub2RlX21vZHVsZXMvY29yZS1qcy9pbnRlcm5hbHMvaXMtZm9yY2VkLmpzIiwid2VicGFjazovLy8uLi8uLi9ub2RlX21vZHVsZXMvY29yZS1qcy9pbnRlcm5hbHMvaXMtbnVsbC1vci11bmRlZmluZWQuanMiLCJ3ZWJwYWNrOi8vLy4uLy4uL25vZGVfbW9kdWxlcy9jb3JlLWpzL2ludGVybmFscy9pcy1vYmplY3QuanMiLCJ3ZWJwYWNrOi8vLy4uLy4uL25vZGVfbW9kdWxlcy9jb3JlLWpzL2ludGVybmFscy9pcy1wb3NzaWJsZS1wcm90b3R5cGUuanMiLCJ3ZWJwYWNrOi8vLy4uLy4uL25vZGVfbW9kdWxlcy9jb3JlLWpzL2ludGVybmFscy9pcy1wdXJlLmpzIiwid2VicGFjazovLy8uLi8uLi9ub2RlX21vZHVsZXMvY29yZS1qcy9pbnRlcm5hbHMvaXMtcmVnZXhwLmpzIiwid2VicGFjazovLy8uLi8uLi9ub2RlX21vZHVsZXMvY29yZS1qcy9pbnRlcm5hbHMvaXMtc3ltYm9sLmpzIiwid2VicGFjazovLy8uLi8uLi9ub2RlX21vZHVsZXMvY29yZS1qcy9pbnRlcm5hbHMvaXRlcmF0b3ItY2xvc2UuanMiLCJ3ZWJwYWNrOi8vLy4uLy4uL25vZGVfbW9kdWxlcy9jb3JlLWpzL2ludGVybmFscy9pdGVyYXRvci1jcmVhdGUtY29uc3RydWN0b3IuanMiLCJ3ZWJwYWNrOi8vLy4uLy4uL25vZGVfbW9kdWxlcy9jb3JlLWpzL2ludGVybmFscy9pdGVyYXRvci1kZWZpbmUuanMiLCJ3ZWJwYWNrOi8vLy4uLy4uL25vZGVfbW9kdWxlcy9jb3JlLWpzL2ludGVybmFscy9pdGVyYXRvcnMtY29yZS5qcyIsIndlYnBhY2s6Ly8vLi4vLi4vbm9kZV9tb2R1bGVzL2NvcmUtanMvaW50ZXJuYWxzL2l0ZXJhdG9ycy5qcyIsIndlYnBhY2s6Ly8vLi4vLi4vbm9kZV9tb2R1bGVzL2NvcmUtanMvaW50ZXJuYWxzL2xlbmd0aC1vZi1hcnJheS1saWtlLmpzIiwid2VicGFjazovLy8uLi8uLi9ub2RlX21vZHVsZXMvY29yZS1qcy9pbnRlcm5hbHMvbWFrZS1idWlsdC1pbi5qcyIsIndlYnBhY2s6Ly8vLi4vLi4vbm9kZV9tb2R1bGVzL2NvcmUtanMvaW50ZXJuYWxzL21hdGgtdHJ1bmMuanMiLCJ3ZWJwYWNrOi8vLy4uLy4uL25vZGVfbW9kdWxlcy9jb3JlLWpzL2ludGVybmFscy9vYmplY3QtYXNzaWduLmpzIiwid2VicGFjazovLy8uLi8uLi9ub2RlX21vZHVsZXMvY29yZS1qcy9pbnRlcm5hbHMvb2JqZWN0LWNyZWF0ZS5qcyIsIndlYnBhY2s6Ly8vLi4vLi4vbm9kZV9tb2R1bGVzL2NvcmUtanMvaW50ZXJuYWxzL29iamVjdC1kZWZpbmUtcHJvcGVydGllcy5qcyIsIndlYnBhY2s6Ly8vLi4vLi4vbm9kZV9tb2R1bGVzL2NvcmUtanMvaW50ZXJuYWxzL29iamVjdC1kZWZpbmUtcHJvcGVydHkuanMiLCJ3ZWJwYWNrOi8vLy4uLy4uL25vZGVfbW9kdWxlcy9jb3JlLWpzL2ludGVybmFscy9vYmplY3QtZ2V0LW93bi1wcm9wZXJ0eS1kZXNjcmlwdG9yLmpzIiwid2VicGFjazovLy8uLi8uLi9ub2RlX21vZHVsZXMvY29yZS1qcy9pbnRlcm5hbHMvb2JqZWN0LWdldC1vd24tcHJvcGVydHktbmFtZXMuanMiLCJ3ZWJwYWNrOi8vLy4uLy4uL25vZGVfbW9kdWxlcy9jb3JlLWpzL2ludGVybmFscy9vYmplY3QtZ2V0LW93bi1wcm9wZXJ0eS1zeW1ib2xzLmpzIiwid2VicGFjazovLy8uLi8uLi9ub2RlX21vZHVsZXMvY29yZS1qcy9pbnRlcm5hbHMvb2JqZWN0LWdldC1wcm90b3R5cGUtb2YuanMiLCJ3ZWJwYWNrOi8vLy4uLy4uL25vZGVfbW9kdWxlcy9jb3JlLWpzL2ludGVybmFscy9vYmplY3QtaXMtcHJvdG90eXBlLW9mLmpzIiwid2VicGFjazovLy8uLi8uLi9ub2RlX21vZHVsZXMvY29yZS1qcy9pbnRlcm5hbHMvb2JqZWN0LWtleXMtaW50ZXJuYWwuanMiLCJ3ZWJwYWNrOi8vLy4uLy4uL25vZGVfbW9kdWxlcy9jb3JlLWpzL2ludGVybmFscy9vYmplY3Qta2V5cy5qcyIsIndlYnBhY2s6Ly8vLi4vLi4vbm9kZV9tb2R1bGVzL2NvcmUtanMvaW50ZXJuYWxzL29iamVjdC1wcm9wZXJ0eS1pcy1lbnVtZXJhYmxlLmpzIiwid2VicGFjazovLy8uLi8uLi9ub2RlX21vZHVsZXMvY29yZS1qcy9pbnRlcm5hbHMvb2JqZWN0LXNldC1wcm90b3R5cGUtb2YuanMiLCJ3ZWJwYWNrOi8vLy4uLy4uL25vZGVfbW9kdWxlcy9jb3JlLWpzL2ludGVybmFscy9vcmRpbmFyeS10by1wcmltaXRpdmUuanMiLCJ3ZWJwYWNrOi8vLy4uLy4uL25vZGVfbW9kdWxlcy9jb3JlLWpzL2ludGVybmFscy9vd24ta2V5cy5qcyIsIndlYnBhY2s6Ly8vLi4vLi4vbm9kZV9tb2R1bGVzL2NvcmUtanMvaW50ZXJuYWxzL3Byb3h5LWFjY2Vzc29yLmpzIiwid2VicGFjazovLy8uLi8uLi9ub2RlX21vZHVsZXMvY29yZS1qcy9pbnRlcm5hbHMvcmVnZXhwLWV4ZWMtYWJzdHJhY3QuanMiLCJ3ZWJwYWNrOi8vLy4uLy4uL25vZGVfbW9kdWxlcy9jb3JlLWpzL2ludGVybmFscy9yZWdleHAtZXhlYy5qcyIsIndlYnBhY2s6Ly8vLi4vLi4vbm9kZV9tb2R1bGVzL2NvcmUtanMvaW50ZXJuYWxzL3JlZ2V4cC1mbGFncy5qcyIsIndlYnBhY2s6Ly8vLi4vLi4vbm9kZV9tb2R1bGVzL2NvcmUtanMvaW50ZXJuYWxzL3JlZ2V4cC1nZXQtZmxhZ3MuanMiLCJ3ZWJwYWNrOi8vLy4uLy4uL25vZGVfbW9kdWxlcy9jb3JlLWpzL2ludGVybmFscy9yZWdleHAtc3RpY2t5LWhlbHBlcnMuanMiLCJ3ZWJwYWNrOi8vLy4uLy4uL25vZGVfbW9kdWxlcy9jb3JlLWpzL2ludGVybmFscy9yZWdleHAtdW5zdXBwb3J0ZWQtZG90LWFsbC5qcyIsIndlYnBhY2s6Ly8vLi4vLi4vbm9kZV9tb2R1bGVzL2NvcmUtanMvaW50ZXJuYWxzL3JlZ2V4cC11bnN1cHBvcnRlZC1uY2cuanMiLCJ3ZWJwYWNrOi8vLy4uLy4uL25vZGVfbW9kdWxlcy9jb3JlLWpzL2ludGVybmFscy9yZXF1aXJlLW9iamVjdC1jb2VyY2libGUuanMiLCJ3ZWJwYWNrOi8vLy4uLy4uL25vZGVfbW9kdWxlcy9jb3JlLWpzL2ludGVybmFscy9zYWZlLWdldC1idWlsdC1pbi5qcyIsIndlYnBhY2s6Ly8vLi4vLi4vbm9kZV9tb2R1bGVzL2NvcmUtanMvaW50ZXJuYWxzL3NldC1zcGVjaWVzLmpzIiwid2VicGFjazovLy8uLi8uLi9ub2RlX21vZHVsZXMvY29yZS1qcy9pbnRlcm5hbHMvc2V0LXRvLXN0cmluZy10YWcuanMiLCJ3ZWJwYWNrOi8vLy4uLy4uL25vZGVfbW9kdWxlcy9jb3JlLWpzL2ludGVybmFscy9zaGFyZWQta2V5LmpzIiwid2VicGFjazovLy8uLi8uLi9ub2RlX21vZHVsZXMvY29yZS1qcy9pbnRlcm5hbHMvc2hhcmVkLXN0b3JlLmpzIiwid2VicGFjazovLy8uLi8uLi9ub2RlX21vZHVsZXMvY29yZS1qcy9pbnRlcm5hbHMvc2hhcmVkLmpzIiwid2VicGFjazovLy8uLi8uLi9ub2RlX21vZHVsZXMvY29yZS1qcy9pbnRlcm5hbHMvc3BlY2llcy1jb25zdHJ1Y3Rvci5qcyIsIndlYnBhY2s6Ly8vLi4vLi4vbm9kZV9tb2R1bGVzL2NvcmUtanMvaW50ZXJuYWxzL3N0cmluZy1tdWx0aWJ5dGUuanMiLCJ3ZWJwYWNrOi8vLy4uLy4uL25vZGVfbW9kdWxlcy9jb3JlLWpzL2ludGVybmFscy9zdHJpbmctcHVueWNvZGUtdG8tYXNjaWkuanMiLCJ3ZWJwYWNrOi8vLy4uLy4uL25vZGVfbW9kdWxlcy9jb3JlLWpzL2ludGVybmFscy9zeW1ib2wtY29uc3RydWN0b3ItZGV0ZWN0aW9uLmpzIiwid2VicGFjazovLy8uLi8uLi9ub2RlX21vZHVsZXMvY29yZS1qcy9pbnRlcm5hbHMvdG8tYWJzb2x1dGUtaW5kZXguanMiLCJ3ZWJwYWNrOi8vLy4uLy4uL25vZGVfbW9kdWxlcy9jb3JlLWpzL2ludGVybmFscy90by1pbmRleGVkLW9iamVjdC5qcyIsIndlYnBhY2s6Ly8vLi4vLi4vbm9kZV9tb2R1bGVzL2NvcmUtanMvaW50ZXJuYWxzL3RvLWludGVnZXItb3ItaW5maW5pdHkuanMiLCJ3ZWJwYWNrOi8vLy4uLy4uL25vZGVfbW9kdWxlcy9jb3JlLWpzL2ludGVybmFscy90by1sZW5ndGguanMiLCJ3ZWJwYWNrOi8vLy4uLy4uL25vZGVfbW9kdWxlcy9jb3JlLWpzL2ludGVybmFscy90by1vYmplY3QuanMiLCJ3ZWJwYWNrOi8vLy4uLy4uL25vZGVfbW9kdWxlcy9jb3JlLWpzL2ludGVybmFscy90by1wcmltaXRpdmUuanMiLCJ3ZWJwYWNrOi8vLy4uLy4uL25vZGVfbW9kdWxlcy9jb3JlLWpzL2ludGVybmFscy90by1wcm9wZXJ0eS1rZXkuanMiLCJ3ZWJwYWNrOi8vLy4uLy4uL25vZGVfbW9kdWxlcy9jb3JlLWpzL2ludGVybmFscy90by1zdHJpbmctdGFnLXN1cHBvcnQuanMiLCJ3ZWJwYWNrOi8vLy4uLy4uL25vZGVfbW9kdWxlcy9jb3JlLWpzL2ludGVybmFscy90by1zdHJpbmcuanMiLCJ3ZWJwYWNrOi8vLy4uLy4uL25vZGVfbW9kdWxlcy9jb3JlLWpzL2ludGVybmFscy90cnktdG8tc3RyaW5nLmpzIiwid2VicGFjazovLy8uLi8uLi9ub2RlX21vZHVsZXMvY29yZS1qcy9pbnRlcm5hbHMvdWlkLmpzIiwid2VicGFjazovLy8uLi8uLi9ub2RlX21vZHVsZXMvY29yZS1qcy9pbnRlcm5hbHMvdXJsLWNvbnN0cnVjdG9yLWRldGVjdGlvbi5qcyIsIndlYnBhY2s6Ly8vLi4vLi4vbm9kZV9tb2R1bGVzL2NvcmUtanMvaW50ZXJuYWxzL3VzZS1zeW1ib2wtYXMtdWlkLmpzIiwid2VicGFjazovLy8uLi8uLi9ub2RlX21vZHVsZXMvY29yZS1qcy9pbnRlcm5hbHMvdjgtcHJvdG90eXBlLWRlZmluZS1idWcuanMiLCJ3ZWJwYWNrOi8vLy4uLy4uL25vZGVfbW9kdWxlcy9jb3JlLWpzL2ludGVybmFscy92YWxpZGF0ZS1hcmd1bWVudHMtbGVuZ3RoLmpzIiwid2VicGFjazovLy8uLi8uLi9ub2RlX21vZHVsZXMvY29yZS1qcy9pbnRlcm5hbHMvd2Vhay1tYXAtYmFzaWMtZGV0ZWN0aW9uLmpzIiwid2VicGFjazovLy8uLi8uLi9ub2RlX21vZHVsZXMvY29yZS1qcy9pbnRlcm5hbHMvd2VsbC1rbm93bi1zeW1ib2wuanMiLCJ3ZWJwYWNrOi8vLy4uLy4uL25vZGVfbW9kdWxlcy9jb3JlLWpzL21vZHVsZXMvZXMuYXJyYXkuaW5jbHVkZXMuanMiLCJ3ZWJwYWNrOi8vLy4uLy4uL25vZGVfbW9kdWxlcy9jb3JlLWpzL21vZHVsZXMvZXMuYXJyYXkuaXRlcmF0b3IuanMiLCJ3ZWJwYWNrOi8vLy4uLy4uL25vZGVfbW9kdWxlcy9jb3JlLWpzL21vZHVsZXMvZXMucmVnZXhwLmNvbnN0cnVjdG9yLmpzIiwid2VicGFjazovLy8uLi8uLi9ub2RlX21vZHVsZXMvY29yZS1qcy9tb2R1bGVzL2VzLnJlZ2V4cC5leGVjLmpzIiwid2VicGFjazovLy8uLi8uLi9ub2RlX21vZHVsZXMvY29yZS1qcy9tb2R1bGVzL2VzLnN0cmluZy5pdGVyYXRvci5qcyIsIndlYnBhY2s6Ly8vLi4vLi4vbm9kZV9tb2R1bGVzL2NvcmUtanMvbW9kdWxlcy9lcy5zdHJpbmcubWF0Y2gtYWxsLmpzIiwid2VicGFjazovLy8uLi8uLi9ub2RlX21vZHVsZXMvY29yZS1qcy9tb2R1bGVzL2VzLnN0cmluZy5yZXBsYWNlLWFsbC5qcyIsIndlYnBhY2s6Ly8vLi4vLi4vbm9kZV9tb2R1bGVzL2NvcmUtanMvbW9kdWxlcy9lcy5zdHJpbmcucmVwbGFjZS5qcyIsIndlYnBhY2s6Ly8vLi4vLi4vbm9kZV9tb2R1bGVzL2NvcmUtanMvbW9kdWxlcy9lc25leHQuc3RyaW5nLm1hdGNoLWFsbC5qcyIsIndlYnBhY2s6Ly8vLi4vLi4vbm9kZV9tb2R1bGVzL2NvcmUtanMvbW9kdWxlcy9lc25leHQuc3RyaW5nLnJlcGxhY2UtYWxsLmpzIiwid2VicGFjazovLy8uLi8uLi9ub2RlX21vZHVsZXMvY29yZS1qcy9tb2R1bGVzL3dlYi51cmwtc2VhcmNoLXBhcmFtcy5jb25zdHJ1Y3Rvci5qcyIsIndlYnBhY2s6Ly8vLi4vLi4vbm9kZV9tb2R1bGVzL2NvcmUtanMvbW9kdWxlcy93ZWIudXJsLXNlYXJjaC1wYXJhbXMuanMiLCJ3ZWJwYWNrOi8vLy4uLy4uL25vZGVfbW9kdWxlcy9jb3JlLWpzL21vZHVsZXMvd2ViLnVybC5jb25zdHJ1Y3Rvci5qcyIsIndlYnBhY2s6Ly8vLi4vLi4vbm9kZV9tb2R1bGVzL2NvcmUtanMvbW9kdWxlcy93ZWIudXJsLmpzIiwid2VicGFjazovLy93ZWJwYWNrL2Jvb3RzdHJhcCIsIndlYnBhY2s6Ly8vd2VicGFjay9ydW50aW1lL2NvbXBhdCBnZXQgZGVmYXVsdCBleHBvcnQiLCJ3ZWJwYWNrOi8vL3dlYnBhY2svcnVudGltZS9kZWZpbmUgcHJvcGVydHkgZ2V0dGVycyIsIndlYnBhY2s6Ly8vd2VicGFjay9ydW50aW1lL2Vuc3VyZSBjaHVuayIsIndlYnBhY2s6Ly8vd2VicGFjay9ydW50aW1lL2dldCBqYXZhc2NyaXB0IGNodW5rIGZpbGVuYW1lIiwid2VicGFjazovLy93ZWJwYWNrL3J1bnRpbWUvZ2V0IG1pbmktY3NzIGNodW5rIGZpbGVuYW1lIiwid2VicGFjazovLy93ZWJwYWNrL3J1bnRpbWUvZ2xvYmFsIiwid2VicGFjazovLy93ZWJwYWNrL3J1bnRpbWUvaGFzT3duUHJvcGVydHkgc2hvcnRoYW5kIiwid2VicGFjazovLy93ZWJwYWNrL3J1bnRpbWUvbG9hZCBzY3JpcHQiLCJ3ZWJwYWNrOi8vL3dlYnBhY2svcnVudGltZS9tYWtlIG5hbWVzcGFjZSBvYmplY3QiLCJ3ZWJwYWNrOi8vL3dlYnBhY2svcnVudGltZS9wdWJsaWNQYXRoIiwid2VicGFjazovLy93ZWJwYWNrL3J1bnRpbWUvanNvbnAgY2h1bmsgbG9hZGluZyIsIndlYnBhY2s6Ly8vLi9tYWluLmpzIl0sInNvdXJjZXNDb250ZW50IjpbIi8vLy8vLy8vLy8vLy8vLy9cbi8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vL1xuLy8vLy8vLy8vXG5pbXBvcnQgJy4uLy4uL2V4YW1wbGVzL3RleHRhcmVhSW5zZXJ0c18yY29scy5jc3MnXG4vLy8vLy8vLy8vXG5cbmltcG9ydCB7IHRleHRhcmVhSW5zZXJ0cywgdG9vbGJhck1hdGhPcGVyYXRvcnMsIHRvb2xiYXJGcmFjdGlvbiwgdG9vbGJhckNvbXBhcmlzb24sIHRvb2xiYXJQZXJjZW50LCB0b29sYmFyRXVybyB9IGZyb20gJy4uLy4uL2xpYnMvdGV4dGFyZWFJbnNlcnRzJ1xuXG5jb25zdCB0b29sYmFycyA9IHtcblx0Y29tcDogdG9vbGJhckNvbXBhcmlzb24sXG5cdG1hdGg6IHRvb2xiYXJNYXRoT3BlcmF0b3JzLFxuXHRmcmFjdDogdG9vbGJhckZyYWN0aW9uLFxuXHRwZXJjOiB0b29sYmFyUGVyY2VudCxcblx0ZXVybzogdG9vbGJhckV1cm8sXG59XG5cbmV4cG9ydCBjbGFzcyB0ZXh0YXJlYUluc2VydHNGcm9tU2NoZW1hIGV4dGVuZHMgdGV4dGFyZWFJbnNlcnRzIHtcblxuXHRjb25zdHJ1Y3RvciAoIGRpdlNlbGVjdG9yLCBvcHRzID0ge30sIGJhc2UgPSBudWxsICkge1xuXG5cdFx0aWYgKCBiYXNlLmZzbSAmJiBiYXNlLmZzbS5pbmNJbml0Q250ICkge1xuXHRcdFx0YmFzZS5mc20uaW5jSW5pdENudCgpO1xuXHRcdH1cblxuXHRcdGxldCB3aWR0aDtcbi8vLy8vLy8vLy8vLy8vLy8vL1xuXHRcdHdpZHRoID0gd2luZG93LmlubmVyV2lkdGg7XG4vLy8vLy8vLy9cbi8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy9cbi8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vXG4vLy8vLy8vLy8vXG5cdFx0bGV0IHdXaWR0aCA9ICBvcHRzLndpZHRoO1xuXHRcdGlmICggd1dpZHRoPD0wICkge1xuXHRcdFx0d1dpZHRoICs9IHdpZHRoO1xuXHRcdH07XG5cblx0XHQvLyBoZWlnaHQgaXMgY29udGFpbmVyIGhlaWdodCBvciB3aW5kb3cuaGVpZ2h0XG5cdFx0bGV0IGhlaWdodDtcbi8vLy8vLy8vLy8vLy8vLy8vL1xuXHRcdGhlaWdodCA9IHdpbmRvdy5pbm5lckhlaWdodDtcbi8vLy8vLy8vL1xuLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vL1xuLy8vLy8vLy8vL1xuXHRcdGxldCB3SGVpZ2h0ID0gb3B0cy5oZWlnaHQ7XG5cdFx0aWYgKCB3SGVpZ2h0PD0wICkge1xuXHRcdFx0d0hlaWdodCArPSBoZWlnaHQ7XG5cdFx0fVxuXHRcdGNvbnN0IHRvb2xiYXJDZWxsV2lkdGggPSBvcHRzLnRvb2xiYXJDZWxsV2lkdGg7XG5cblx0XHRjb25zdCBkZWZzID0ge1xuXHRcdFx0dG9vbGJhckRpcmVjdGlvbjogJ3JvdycsXG5cdFx0XHRkaXZTdHlsZXM6IHtcblx0XHRcdFx0d2lkdGg6IGAke3dXaWR0aC0yKnRvb2xiYXJDZWxsV2lkdGgtNX1weGAsXG5cdFx0XHRcdGhlaWdodDogYCR7d0hlaWdodH1weGAsXG5cdFx0XHR9LFxuXG5cdFx0XHR0b29sYmFyQ29udGFpbmVyU3R5bGVzOiB7XG5cdFx0XHRcdC8vIGxlZnQ6IGAke3dXaWR0aC02KnRvb2xiYXJDZWxsV2lkdGgtMTd9cHhgLFxuXHRcdFx0XHQvLyB0b3A6IGAke3dIZWlnaHQtdG9vbGJhckNlbGxXaWR0aC0xN31weGAsXG5cdFx0XHRcdHdpZHRoOiBgJHsyKnRvb2xiYXJDZWxsV2lkdGh9cHhgLFxuXHRcdFx0XHRoZWlnaHQ6IGAkezIqdG9vbGJhckNlbGxXaWR0aH1weGAsXG5cdFx0XHRcdCdmbGV4LXdyYXAnOiAnd3JhcCcsXG5cdFx0XHR9LFxuXG5cdFx0XHR0b29sYmFyQ2VsbFN0eWxlczoge1xuXHRcdFx0XHR3aWR0aDogYCR7dG9vbGJhckNlbGxXaWR0aH1weGAsXG5cdFx0XHRcdGhlaWdodDogYCR7dG9vbGJhckNlbGxXaWR0aH1weGAsXG5cdFx0XHR9LFxuXG5cdFx0XHR0b29sYmFyOiBbXSxcblx0XHR9O1xuXHRcdGlmICggb3B0cy5kYXRhU2V0dGluZ3MgKSB7XG5cdFx0XHRkZWZzLmRhdGFTZXR0aW5ncyA9IG9wdHMuZGF0YVNldHRpbmdzO1xuXHRcdH1cblxuXHRcdGZvciAoIGNvbnN0IHRiIGluIHRvb2xiYXJzICkge1xuXHRcdFx0aWYgKCBvcHRzLnRvb2xiYXJbdGJdICkge1xuXHRcdFx0XHRkZWZzLnRvb2xiYXIgPSBkZWZzLnRvb2xiYXIuY29uY2F0KCB0b29sYmFyc1t0Yl0gKVxuXHRcdFx0fVxuXHRcdH1cblxuXHRcdHN1cGVyKCBkaXZTZWxlY3RvciwgZGVmcywgYmFzZSApO1xuXG5cdFx0aWYgKCBiYXNlLmZzbSAmJiBiYXNlLmZzbS5kZWNJbml0Q250ICkge1xuXHRcdFx0YmFzZS5mc20uZGVjSW5pdENudCgpO1xuXHRcdH1cblx0fVxuXG5cdHNjb3JlRGVmICgpIHtcblxuXHRcdGNvbnN0IHByZWYgPSB0aGlzLmRhdGFTZXR0aW5ncy52YXJpYWJsZVByZWZpeDtcblx0XHRjb25zdCByZXMgPXtcblx0XHRcdFtgVl9JbnB1dF8ke3ByZWZ9YF06IHRoaXMuZXh0cmFjdCgpLFxuXHRcdH07XG5cdFx0cmV0dXJuIHJlcztcblx0fVxuXG59XG4iLCJleHBvcnQgZnVuY3Rpb24gY2xlYXJDZmdKc29uKCBqc29uICkge1xuXG5cdGlmICggdHlwZW9mIGpzb24gIT09ICdvYmplY3QnICkge1xuXHRcdHJldHVybiBqc29uO1xuXHR9XG5cdGlmICggQXJyYXkuaXNBcnJheShqc29uKSApIHtcblx0XHRyZXR1cm4ganNvbi5tYXAoIGEgPT4gY2xlYXJDZmdKc29uKGEpIClcblx0fVxuXG5cdGNvbnN0IHJlcyA9IHt9O1xuXG5cdE9iamVjdC5lbnRyaWVzKCBqc29uICkuZm9yRWFjaCggKFtrLHZdKSA9PiB7XG5cblx0XHRpZiAoIGsuc3Vic3RyaW5nKCAwLCAzICkgPT09ICdfX18nICkge1xuXG5cdFx0XHQvLyAvLyBLZXlzIGRlciBFbGVtZW50ZSBlaW5lcyBBcnJheXMgbmVobWVuXG5cdFx0XHQvLyBjb25zdCBhcmVsa2V5cyA9IGsubWF0Y2goIC9eX19fYXJlbGtleXNfKC4qKS8gKTtcblx0XHRcdC8vIGlmICggYXJlbGtleXMgKSB7XG5cdFx0XHQvLyBcdGpzb25bIGFyZWxrZXlzWzFdIF0gPSB2Lm1hcCggZSA9PiBPYmplY3Qua2V5cyhlKSApO1xuXHRcdFx0Ly8gfSBlbHNlIHtcblxuXHRcdFx0XHQvLyBWYWxzIGRlciBFbGVtZW50ZSBlaW5lcyBBcnJheXMgbmVobWVuXG5cdFx0XHRcdGNvbnN0IGFyZWx2YWxzID0gay5tYXRjaCggL15fX19hcmVsdmFsc18oLiopLyApO1xuXHRcdFx0XHRpZiAoIGFyZWx2YWxzICkge1xuXHRcdFx0XHRcdHJlc1sgYXJlbHZhbHNbMV0gXSA9IHYubWFwKCBlID0+IE9iamVjdC52YWx1ZXMoZSkubWFwKCBhID0+IGNsZWFyQ2ZnSnNvbihhKSApICk7XG5cdFx0XHRcdH0gZWxzZSB7XG5cblx0XHRcdFx0XHQvLyBBbHRlcm5hdGl2ZSBOYW1lbiBlaW5mYWNoIHNvIHNwZWljaGVyblxuXHRcdFx0XHRcdGNvbnN0IGFsdHMgPSBrLm1hdGNoKCAvXl9fX2FsdFteX10qXyguKikvICk7XG5cdFx0XHRcdFx0aWYgKCBhbHRzICkge1xuXHRcdFx0XHRcdFx0aWYgKCB2ICE9PSB1bmRlZmluZWQgKSB7XG5cdFx0XHRcdFx0XHRcdHJlc1sgYWx0c1sxXSBdID0gY2xlYXJDZmdKc29uKCB2ICk7XG5cdFx0XHRcdFx0XHR9XG5cdFx0XHRcdFx0fSBlbHNlIHtcblxuXHRcdFx0XHRcdFx0Ly8gX19fIE9iamVjdCBpbiBqc29uIGludGVncmllcmVuXG5cdFx0XHRcdFx0XHRpZiAoIHR5cGVvZiB2ID09PSAnb2JqZWN0JyApIHtcblx0XHRcdFx0XHRcdFx0T2JqZWN0LmFzc2lnbiggcmVzLCBjbGVhckNmZ0pzb24odikgKTtcblx0XHRcdFx0XHRcdH1cblxuXHRcdFx0XHRcdH1cblx0XHRcdFx0fVxuXHRcdFx0Ly8gfVxuXG5cdFx0fSBlbHNlIHtcblxuXHRcdFx0aWYgKCB2ICE9PSB1bmRlZmluZWQgKSB7XG5cdFx0XHRcdGNvbnN0IHN1Ym9iaiA9IGsubWF0Y2goIC9eKC4qPylfX18oLiopLyApO1xuXHRcdFx0XHRpZiAoIHN1Ym9iaiApIHtcblx0XHRcdFx0XHQvLyB7IGFiY19fX2RlZjogMTIzIH0gPT4geyBhYmM6IHsgZGVmOiAxMjMgfSB9XG5cdFx0XHRcdFx0Y29uc3QgbmV3T2JqID0gY2xlYXJDZmdKc29uKCB7IFsgc3Vib2JqWzJdIF06IHYgfSApO1xuXHRcdFx0XHRcdGlmICggISggc3Vib2JqWzFdIGluIHJlcyApICkge1xuXHRcdFx0XHRcdFx0cmVzWyBzdWJvYmpbMV0gXSA9IHt9O1xuXHRcdFx0XHRcdH1cblx0XHRcdFx0XHRPYmplY3QuYXNzaWduKCByZXNbIHN1Ym9ialsxXSBdLCBuZXdPYmogKTtcblx0XHRcdFx0fSBlbHNlIHtcblx0XHRcdFx0XHQvLyBjb3B5IHZhbHVlXG5cdFx0XHRcdFx0cmVzWyBrIF0gPSBjbGVhckNmZ0pzb24odik7XG5cdFx0XHRcdH1cblx0XHRcdH1cblxuXHRcdH1cblx0fSlcblxuXHRyZXR1cm4gcmVzO1xufVxuXG4vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy9cblxuaW1wb3J0IHsgaXNCZXR3ZWVuLCBpc051bVVuaXQgfSBmcm9tIFwiLi4vbGlicy9jb21tb25cIjtcblxuZnVuY3Rpb24gZGVidWdBbmRDb25zb2xlT3V0IChzKSB7XG5cdGlmICggdHlwZW9mIGRlYnVnT3V0ICE9PSAndW5kZWZpbmVkJyApXHR7XG5cdFx0ZGVidWdPdXQoIGA8c3BhbiBjbGFzcz1cImVycm9yXCI+JHtzfTwvc3Bhbj5gICk7XG5cdH1cblx0Y29uc29sZS5lcnJvcihzKTtcbn1cblxuZXhwb3J0IGZ1bmN0aW9uIGFkZFNjb3JpbmcgKCBvYmosIG9wdHMsIFBhcnNlcj1udWxsLCBhZGRGbmNzPXt9ICkge1xuXG5cdG9iai5jb21wdXRlU2NvcmluZ1ZhbHMgPSAoKSA9PiB7fTtcblx0aWYgKCAhUGFyc2VyICkge1xuXHRcdHJldHVybjtcblx0fVxuXG5cdC8vIGNyZWF0ZSBQYXJzZXIsIGFkZCBhZGRGbmNzXG5cdGNvbnN0IHBhcnNlciA9IG5ldyBQYXJzZXIoKTtcblx0T2JqZWN0LmFzc2lnbiggYWRkRm5jcywge1xuXHRcdGlzTnVsbDogdiA9PiB2PT09bnVsbCxcblx0XHRpc051bVVuaXQsXG5cdFx0aXNCZXR3ZWVuLFxuXHRcdG1hdGNoOiAoYSxyLGZsPScnKSA9PiBhLnRvU3RyaW5nKCkubWF0Y2goIG5ldyBSZWdFeHAocixmbCkgKSxcblx0XHQvLyByZWdleHA6IChhLGIpID0+IGEubWF0Y2goYiksXG5cdFx0c3RyRXF1YWw6IChhLGIpID0+IGEudG9Mb3dlckNhc2UgPT0gYi50b0xvd2VyQ2FzZSxcblx0fSk7XG5cdGZvciAoIGNvbnN0IGZuYyBpbiBhZGRGbmNzICkge1xuXHRcdHBhcnNlci5mdW5jdGlvbnNbZm5jXT0gYWRkRm5jc1tmbmNdO1xuXHR9XG5cblx0aWYgKCBvcHRzLmRhdGFTZXR0aW5ncyAmJiBvcHRzLmRhdGFTZXR0aW5ncy5zY29yaW5nVmFscyAmJiBvYmouc2NvcmVEZWYgKSB7XG5cblx0XHRjb25zdCBzY29yaW5nVmFscyA9IG9wdHMuZGF0YVNldHRpbmdzLnNjb3JpbmdWYWxzO1xuXG5cdFx0Y29uc3Qgc2NvcmVzID0gb2JqLnNjb3JlRGVmKCk7XG5cdFx0aWYgKCB0eXBlb2Ygc2NvcmVzID09PSAnb2JqZWN0JyApIHtcblx0XHRcdGNvbnN0IHZhck5hbWVzID0gT2JqZWN0LmtleXMoIHNjb3JlcyApO1xuXHRcdFx0aWYgKCB2YXJOYW1lcy5sZW5ndGg+MCApIHtcblxuXHRcdFx0XHRzY29yaW5nVmFscy5mb3JFYWNoKCBzdiA9PiB7XG5cdFx0XHRcdFx0bGV0IGNvbmQgPSBzdi5jb25kaXRpb247XG5cdFx0XHRcdFx0aWYgKCBjb25kICkge1xuXHRcdFx0XHRcdFx0bGV0IHNhdmVDb25kID0gY29uZDtcblx0XHRcdFx0XHRcdGNvbnN0IGFsbFZhcnNJbkNvbmQgPSBjb25kLm1hdGNoQWxsKCAvXFwkXFx7KFtefV0qKX0vZyApO1xuXHRcdFx0XHRcdFx0Zm9yICggY29uc3Qgdm4gb2YgYWxsVmFyc0luQ29uZCApIHtcblx0XHRcdFx0XHRcdFx0aWYgKCB2blsxXS5sZW5ndGggPT0gMCApIHtcblx0XHRcdFx0XHRcdFx0XHRkZWJ1Z0FuZENvbnNvbGVPdXQoIGBWYXJpYWJsZW4tTmFtZSAnXFwke30nIGluIFNjb3JpbmcgbmljaHQgenVsw6Rzc2lnYCApO1xuXHRcdFx0XHRcdFx0XHR9IGVsc2Uge1xuXHRcdFx0XHRcdFx0XHRcdGNvbnN0IHZhcnNlYXJjaCA9IG9wdHMuZGF0YVNldHRpbmdzLnZhcmlhYmxlUHJlZml4ID8gdm5bMV0ucmVwbGFjZSggLzxwcmVmPi9pLCBvcHRzLmRhdGFTZXR0aW5ncy52YXJpYWJsZVByZWZpeCApIDogdm5bMV07XG5cdFx0XHRcdFx0XHRcdFx0Y29uc3QgcmUgPSBuZXcgUmVnRXhwKCBgJHt2YXJzZWFyY2h9JGAsICdpJyApO1xuXHRcdFx0XHRcdFx0XHRcdGNvbnN0IHNlbFZhck5hbWVzID0gdmFyTmFtZXMuZmlsdGVyKCB2ID0+IHYubWF0Y2gocmUpICk7XG5cdFx0XHRcdFx0XHRcdFx0aWYgKCBzZWxWYXJOYW1lcy5sZW5ndGg+MSApIHtcblx0XHRcdFx0XHRcdFx0XHRcdGRlYnVnQW5kQ29uc29sZU91dCggYFZhcmlhYmxlbi1OYW1lICdcXCR7JHt2blsxXX19JyBpbiBTY29yaW5nIGlzdCBuaWNodCBlaW5kZXV0aWdgKTtcblx0XHRcdFx0XHRcdFx0XHRcdHNhdmVDb25kID0gJyc7XG5cdFx0XHRcdFx0XHRcdFx0fSBlbHNlIGlmICggc2VsVmFyTmFtZXMubGVuZ3RoID09IDAgKSB7XG5cdFx0XHRcdFx0XHRcdFx0XHRkZWJ1Z0FuZENvbnNvbGVPdXQoIGBWYXJpYWJsZW4tTmFtZSAnXFwkeyR7dm5bMV19fScgaW4gU2NvcmluZyB1bmJla2FubnRgKTtcblx0XHRcdFx0XHRcdFx0XHRcdHNhdmVDb25kID0gJyc7XG5cdFx0XHRcdFx0XHRcdFx0fSBlbHNlIHtcblx0XHRcdFx0XHRcdFx0XHRcdHNhdmVDb25kID0gc2F2ZUNvbmQucmVwbGFjZSggdm5bMF0sIHNlbFZhck5hbWVzWzBdICk7XG5cdFx0XHRcdFx0XHRcdFx0fVxuXHRcdFx0XHRcdFx0XHR9XG5cdFx0XHRcdFx0XHR9XG5cdFx0XHRcdFx0XHRpZiAoIHNhdmVDb25kICkge1xuXHRcdFx0XHRcdFx0XHQvLyBjaGVjayBlcnJvcnNcblxuXHRcdFx0XHRcdFx0XHQvLyBbXG5cdFx0XHRcdFx0XHRcdC8vIFx0WyAvKD88IVs9IT48XSk9KD8hWz0hXSkvZywgYFdlcnR6dXdlaXN1bmcgKD0pIHN0YXR0IFZlcmdsZWljaHNvcGVyYXRvciAoPT0pIGluIFwiJHtjb25kfVwiIGdlZnVuZGVuISBJc3QgZGFzIGJlYWJzaWNodGlndD9gIF0sXG5cdFx0XHRcdFx0XHRcdC8vIFx0WyAvPD4vZywgYFplaWNoZW5rZXR0ZSAoPD4pIHN0YXQgKCE9KSBpbiBcIiR7Y29uZH1cIiBnZWZ1bmRlbiEgSXN0IGRhcyBiZWFic2ljaHRpZ3Q/YCBdLFxuXHRcdFx0XHRcdFx0XHQvLyBcdFsgL3x8L2csIGBEb3BwZWx0ZXMgXCJ8fFwiIHN0YXR0IFwib3JcIiBpbiBcIiR7Y29uZH1cIiBnZWZ1bmRlbiEgSXN0IGRhcyBiZWFic2ljaHRpZ3Q/YCBdLFxuXHRcdFx0XHRcdFx0XHQvLyBcdFsgLyYmL2csIGBEb3BwZWx0ZXMgXCImJlwiIHN0YXR0IFwiYW5kXCIgaW4gXCIke2NvbmR9XCIgZ2VmdW5kZW4hIElzdCBkYXMgYmVhYnNpY2h0aWd0P2AgXSxcblx0XHRcdFx0XHRcdFx0Ly8gXHQvLyBbIC8oPzwhXFx8KShcXHwpKD8hXFx8KS9nLCBgRWluemVsbmVzIHwgc3RhdHQgfHwgaW4gXCIke2NvbmR9XCIgZ2VmdW5kZW4hIElzdCBkYXMgYmVhYnNpY2h0aWd0P2AgXSxcblx0XHRcdFx0XHRcdFx0Ly8gXHQvLyBbIC8oPzwhJikmKD8hXFwmKS9nLCBgRWluemVsbmVzICYgc3RhdHQgJiYgaW4gXCIke2NvbmR9XCIgZ2VmdW5kZW4hIElzdCBkYXMgYmVhYnNpY2h0aWd0P2AgXSxcblx0XHRcdFx0XHRcdFx0Ly8gXS5mb3JFYWNoKCAoW3JlLG1zZ10pID0+IHtcblx0XHRcdFx0XHRcdFx0Ly8gXHRpZiAoIHNhdmVDb25kLm1hdGNoKHJlKSApIHtcblx0XHRcdFx0XHRcdFx0Ly8gXHRcdGRlYnVnQW5kQ29uc29sZU91dChtc2cpO1xuXHRcdFx0XHRcdFx0XHQvLyBcdH1cblx0XHRcdFx0XHRcdFx0Ly8gfSk7XG5cdFx0XHRcdFx0XHRcdC8vIEhvdEZpeCBmb3IgSUIgSW1wb3J0RXh0ZXJuYWxWYXJpYWJsZXM6IGludGVybmFsIGJyb3dzZXIgZG9lcyBub3Qgc3VwcG9ydCBSZWdFeHAgbG9vay1iZWhpbmQvLWZvcndhcmRcblx0XHRcdFx0XHRcdFx0aWYgKCBBcnJheS5mcm9tKCBzYXZlQ29uZC5tYXRjaEFsbCggL1shPD5dPz0rL2cgKSApLnNvbWUoIG0gPT4gbVswXT09Jz0nICkgKSB7XG5cdFx0XHRcdFx0XHRcdFx0ZGVidWdBbmRDb25zb2xlT3V0KCBgV2VydHp1d2Vpc3VuZyAoPSkgc3RhdHQgVmVyZ2xlaWNoc29wZXJhdG9yICg9PSkgaW4gXCIke2NvbmR9XCIgZ2VmdW5kZW4hIElzdCBkYXMgYmVhYnNpY2h0aWd0P2AgKTtcblx0XHRcdFx0XHRcdFx0fVxuXHRcdFx0XHRcdFx0XHRpZiAoIHNhdmVDb25kLmluY2x1ZGVzKCc8PicpICkge1xuXHRcdFx0XHRcdFx0XHRcdGRlYnVnQW5kQ29uc29sZU91dCggYFplaWNoZW5rZXR0ZSAoPD4pIHN0YXQgKCE9KSBpbiBcIiR7Y29uZH1cIiBnZWZ1bmRlbiEgSXN0IGRhcyBiZWFic2ljaHRpZ3Q/YCApO1xuXHRcdFx0XHRcdFx0XHR9XG5cdFx0XHRcdFx0XHRcdGlmICggc2F2ZUNvbmQuaW5jbHVkZXMoJ3x8JykgKSB7XG5cdFx0XHRcdFx0XHRcdFx0ZGVidWdBbmRDb25zb2xlT3V0KCBgRG9wcGVsdGVzIFwifHxcIiBzdGF0dCBcIm9yXCIgaW4gXCIke2NvbmR9XCIgZ2VmdW5kZW4hIElzdCBkYXMgYmVhYnNpY2h0aWd0P2AgKTtcblx0XHRcdFx0XHRcdFx0fVxuXHRcdFx0XHRcdFx0XHRpZiAoIHNhdmVDb25kLmluY2x1ZGVzKCcmJicpICkge1xuXHRcdFx0XHRcdFx0XHRcdGRlYnVnQW5kQ29uc29sZU91dCggYERvcHBlbHRlcyBcIiYmXCIgc3RhdHQgXCJhbmRcIiBpbiBcIiR7Y29uZH1cIiBnZWZ1bmRlbiEgSXN0IGRhcyBiZWFic2ljaHRpZ3Q/YCApO1xuXHRcdFx0XHRcdFx0XHR9XG5cblx0XHRcdFx0XHRcdFx0aWYgKCAhKCAnc2NvcmluZ1ZhbHMnIGluIG9iaiApICkge1xuXHRcdFx0XHRcdFx0XHRcdG9iai5zY29yaW5nVmFscyA9IFtdO1xuXHRcdFx0XHRcdFx0XHR9XG5cdFx0XHRcdFx0XHRcdHRyeSB7XG5cdFx0XHRcdFx0XHRcdFx0b2JqLnNjb3JpbmdWYWxzLnB1c2goIFsgc3YudmFsLCBwYXJzZXIucGFyc2UoIHNhdmVDb25kICkgXSApO1xuXHRcdFx0XHRcdFx0XHR9IGNhdGNoIChlKSB7XG5cdFx0XHRcdFx0XHRcdFx0ZGVidWdBbmRDb25zb2xlT3V0KCBgRmVobGVyICgke2V9KSBpbiBTY29yaW5nLUNvbmRpdGlvbjogJHtjb25kfWAgKTtcblx0XHRcdFx0XHRcdFx0fVxuXHRcdFx0XHRcdFx0fVxuXHRcdFx0XHRcdH1cblx0XHRcdFx0fSk7XG5cdFx0XHR9XG5cdFx0fVxuXHR9XG5cblx0aWYgKCBvYmouc2NvcmluZ1ZhbHMgKSB7XG5cdFx0b2JqLmNvbXB1dGVTY29yaW5nVmFscyA9IGZ1bmN0aW9uIChyZXMpIHtcblx0XHRcdGxldCBzY29yZSA9IG51bGw7XG5cdFx0XHRjb25zdCBzY29yZURhdCA9IHRoaXMuc2NvcmluZ1ZhbHM7XG5cdFx0XHRmb3IgKCBsZXQgaD0wOyBzY29yZT09PW51bGwgJiYgaDxzY29yZURhdC5sZW5ndGg7IGgrKyApIHtcblx0XHRcdFx0Y29uc3QgW3YsY10gPSBzY29yZURhdFtoXTtcblx0XHRcdFx0dHJ5IHtcblx0XHRcdFx0XHRpZiAoIGMuZXZhbHVhdGUoIHJlcyApICkge1xuXHRcdFx0XHRcdFx0c2NvcmUgPSB2O1xuXHRcdFx0XHRcdH1cblx0XHRcdFx0fSBjYXRjaCAoZSkge1xuXHRcdFx0XHRcdGRlYnVnQW5kQ29uc29sZU91dCggYEVycm9yIGluIHNjb3JpbmctY29uZGl0aW9uOiAke2V9LCAke3Jlc31gICk7XG5cdFx0XHRcdH1cblx0XHRcdH1cblx0XHRcdGNvbnN0IG4gPSBOdW1iZXIoc2NvcmUpXG5cdFx0XHRyZXNbIGBWX1Njb3JlXyR7dGhpcy5kYXRhU2V0dGluZ3MudmFyaWFibGVQcmVmaXh9YCBdID0gc2NvcmUhPT0gbnVsbCAmJiBuIT09TmFOID8gbiA6IHNjb3JlO1xuXHRcdH1cblxuXHRcdGlmICggb2JqLnNjb3JlRGVmICYmIG9iai5iYXNlICkge1xuXHRcdFx0b2JqLmJhc2Uuc2VuZENoYW5nZVN0YXRlKCBvYmogKTtcblx0XHR9XG5cdH1cblxufVxuXG4vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy9cblxuZXhwb3J0IGZ1bmN0aW9uIGFkZFN0YXR1c1ZhckRlZiAoIG9iaiwganNvbiApIHtcblxuXHRpZiAoICFvYmouc3RhdHVzVmFyRGVmICYmIGpzb24uZGF0YVNldHRpbmdzICYmIGpzb24uZGF0YVNldHRpbmdzLnZhcmlhYmxlUHJlZml4ICkge1xuXHRcdGNvbnN0IHN0YXRWYXJOYW1lID0gYFZfU3RhdHVzXyR7anNvbi5kYXRhU2V0dGluZ3MudmFyaWFibGVQcmVmaXh9YDtcblx0XHRvYmouc3RhdHVzVmFyRGVmID0gZnVuY3Rpb24gKCkge1xuXHRcdFx0cmV0dXJuIHtcblx0XHRcdFx0W3N0YXRWYXJOYW1lXTogK3RoaXMuZ2V0RGVmYXVsdENoYW5nZVN0YXRlKCksXG5cdFx0XHR9XG5cdFx0fVxuXHR9XG5cbn1cblxuXG4vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vL1xuXG4vLyBjb252ZXJ0IFwiMSAzNCw1OjYtOVwiIHRvIFsxLDM0LDUsNiw3LDgsOV1cbi8qKlxuICogUGFyc2VzIGEgc3RyaW5nIGNvbnRhaW5pbmcgcmFuZ2UgdmFsdWVzIGFuZCByZXR1cm5zIGFuIGFycmF5IG9mIG51bWJlcnMuXG4gKiBAcGFyYW0ge3N0cmluZ30gcyAtIFRoZSBzdHJpbmcgY29udGFpbmluZyB0aGUgcmFuZ2UgdmFsdWVzLlxuICogQHJldHVybnMge251bWJlcltdfSAtIEFuIGFycmF5IG9mIG51bWJlcnMgcGFyc2VkIGZyb20gdGhlIHJhbmdlIHZhbHVlcy5cbiAqL1xuZXhwb3J0IGNvbnN0IHJlYWRSYW5nZUFycmF5ID0gKHMpID0+IHtcblx0Y29uc3QgcmVzID0gW107XG5cblx0Zm9yICggY29uc3QgcnIgb2Ygcy5tYXRjaEFsbCggLyhbMC05XSspICooPzotICooWzAtOV0rKSk/L2cgKSApIHtcblx0XHRpZiAoIHJyWzJdICYmIHJyWzFdPHJyWzJdICkge1xuXHRcdFx0Y29uc3QgcnIyPU51bWJlcihyclsyXSk7XG5cdFx0XHRmb3IgKCBsZXQgaD1OdW1iZXIocnJbMV0pOyBoPD1ycjI7IGgrKyApIHtcblx0XHRcdFx0cmVzLnB1c2goaCk7XG5cdFx0XHR9XG5cdFx0fSBlbHNlIHtcblx0XHRcdHJlcy5wdXNoKCBOdW1iZXIocnJbMV0pIClcblx0XHR9XG5cdH1cblxuXHRyZXR1cm4gcmVzO1xufVxuXG4vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vL1xuXG4vKipcbiAqIENvbnZlcnRzIGFuIG9iamVjdCBjb250YWluaW5nIHByb3BlcnRpZXMgZm9yIGRlY2ltYWwgcGxhY2VzLCBkZWNpbWFsIHByZWNpc2lvbiwgYW5kIHVuaXRzIGludG8gYSByZWd1bGFyIGV4cHJlc3Npb24gZm9yIGlucHV0IHZhbGlkYXRpb24uXG4gKiBAcGFyYW0ge09iamVjdH0gb2JqIC0gVGhlIG9iamVjdCBjb250YWluaW5nIHByb3BlcnRpZXMgZm9yIGRlY2ltYWwgcGxhY2VzLCBkZWNpbWFsIHByZWNpc2lvbiwgYW5kIHVuaXRzLlxuICovXG5leHBvcnQgY29uc3QgZHAyaW5wdXRSZWdFeHAgPSAob2JqKSA9PiB7XG5cblx0LyoqXG5cdCAqIEdlbmVyYXRlcyBhIHJlZ3VsYXIgZXhwcmVzc2lvbiBwYXR0ZXJuIGZvciBhIGdpdmVuIHVuaXQuIChjYXNlIGluc2Vuc2l0aXZlIGNvbmNhdGVuYXRpb24gb2YgdXBwZXIgYW5kIGxvd2VyIGNhc2UgY2hhcmFjdGVycylcblx0ICogQHBhcmFtIHtzdHJpbmd9IHUgLSBUaGUgdW5pdCBzdHJpbmcuXG5cdCAqIEByZXR1cm5zIHtzdHJpbmd9IFRoZSByZWd1bGFyIGV4cHJlc3Npb24gcGF0dGVybiBmb3IgdGhlIHVuaXQuXG5cdCAqL1xuXHRjb25zdCB1bml0UmVnRXhwID0gKHUpID0+IHtcblx0XHRsZXQgciA9ICcnO1xuXHRcdGZvciAoIGNvbnN0IGMgb2YgdS50cmltKCkgKSB7XG5cdFx0XHRjb25zdCB1ID0gYy50b1VwcGVyQ2FzZSgpO1xuXHRcdFx0Y29uc3QgbCA9IGMudG9Mb3dlckNhc2UoKTtcblx0XHRcdHIgKz0gdSAhPSBsID8gYFske2x9JHt1fV0/YCA6IGAke2N9P2A7XG5cdFx0fVxuXHRcdHJldHVybiByO1xuXHR9O1xuXG5cdGlmICggb2JqLnBkcCB8fCBvYmouZHAgKSB7XG5cdFx0bGV0IHJlID0gYF5bMC05XSR7IG9iai5wZHAgPyBgezAsJHtvYmoucGRwfX1gIDogJyonIH1gO1xuXHRcdGlmICggb2JqLmRwICkge1xuXHRcdFx0cmUgKz0gYChbLC5dWzAtOV17MCwke29iai5kcH19KT9gO1xuXHRcdH1cblx0XHRpZiAoIG9iai51bml0cyApIHtcblx0XHRcdHJlICs9IGAgPygke29iai51bml0cy5zcGxpdCgnfCcpLm1hcCggdSA9PiB1bml0UmVnRXhwKHUpICkuam9pbignfCcpfSk/YDtcblx0XHR9XG5cdFx0b2JqLmlucHV0UmVnZXhwID0gcmUgKyAnJCc7XG5cdH1cblx0ZGVsZXRlIG9iai5wZHA7XG5cdGRlbGV0ZSBvYmouZHA7XG5cdGRlbGV0ZSBvYmoudW5pdHM7XG59XG5cbmV4cG9ydCBjb25zdCBkcDJsYWJGbmNJbnB1dFJlZ0V4cCA9ICggb2JqLCBvcHRzLCBuYW09JycgKSA9PiB7XG5cdGxldCBsVkYsIGxUO1xuXHRpZiAoICFvYmogKSB7XG5cdFx0cmV0dXJuXG5cdH1cblxuXHRpZiAoIG9iai5kcCAmJiAhb2JqLnVuaXRzICkge1xuXHRcdGxWRiA9IHN0clRvTnVtO1xuXHRcdGxUID0gJ051bWJlcic7XG5cdH0gZWxzZSBpZiAoIG9iai5wZHAgJiYgIW9iai51bml0cyApIHtcblx0XHRsVkYgPSBzdHJUb0ludDtcblx0XHRsVCA9ICdJbnRlZ2VyJztcblx0fSBlbHNlIHtcblx0XHRsVkYgPSB2ID0+IHY7XG5cdFx0bFQgPSAnU3RyaW5nJztcblx0fVxuXHRvcHRzW2BsYWIke25hbX1WYWxGbmNgXSA9IGxWRjtcblx0b3B0c1tgbGFiJHtuYW19VHlwZWBdID0gbFQ7XG5cblx0ZHAyaW5wdXRSZWdFeHAob2JqKTtcbn1cblxuLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy9cblxuZXhwb3J0IGNvbnN0IHN0clRvSW50ID0gKHMpID0+IHtcblx0Y29uc3QgbiA9IHBhcnNlSW50KHMpO1xuXHRyZXR1cm4gTnVtYmVyLmlzTmFOKG4pID8gMCA6IG47XG59XG5cbmV4cG9ydCBjb25zdCBzdHJUb051bSA9IChzKSA9PiB7XG5cdHMgPSBzLnJlcGxhY2UoICcsJywgJy4nICk7XG5cdHJldHVybiBwYXJzZUZsb2F0KCBzICk7XG5cdC8vIGNvbnN0IG4gPSBwYXJzZUZsb2F0KCBzICk7XG5cdC8vIHJldHVybiBpc05hTihuKSA/IDAgOiBuO1xufVxuXG4vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vL1xuXG5leHBvcnQgY2xhc3MgUmVzb2x2YWJsZVByb21pc2Uge1xuXG5cdGNvbnN0cnVjdG9yKCkge1xuXHRcdHRoaXMucHJvbSA9IG5ldyBQcm9taXNlKCAocmVzLHJlaikgPT4ge1xuXHRcdFx0dGhpcy5yZXMgPSByZXM7XG5cdFx0XHR0aGlzLnJlaiA9IHJlajtcblx0XHR9KTtcblx0fVxuXG5cdHJlc29sdmVQcm9taXNlKCByZXMgKSB7XG5cdFx0dGhpcy5yZXMoIHJlcyApO1xuXHR9XG5cblx0cmVqZWN0UHJvbWlzZSggcmVqICkge1xuXHRcdHRoaXMucmVqKCByZWogKTtcblx0fVxuXG5cdGdldCBwcm9taXNlKCkge1xuXHRcdHJldHVybiB0aGlzLnByb207XG5cdH1cbn1cblxuLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vXG5cblxuLy8gZ2V0IHRoZSBmb2xkZXIgbmFtZSBvZiB0aGUgRVBGXG5leHBvcnQgY29uc3QgZ2V0RVBGRm9sZGVyTmFtZSA9ICggZW1wdHlWYWw9Jy4nICkgPT4ge1xuXHRjb25zdCByZWdleHAgPSB3aW5kb3cubG9jYXRpb24ucGF0aG5hbWUubWF0Y2goIC9cXC8oW14vXSspXFwvW14vXSokLyApO1xuXHRyZXR1cm4gcmVnZXhwID8gcmVnZXhwWzFdIDogZW1wdHlWYWw7XG59XG5cbi8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vL1xuXG4vLyBJMThOIHN1cHBvcnRcblxuZXhwb3J0IGZ1bmN0aW9uIGdldEkxOG5EZXNjciAoIGpzb24sIG5hbWVGbmM9Z2V0RVBGRm9sZGVyTmFtZSApIHtcblxuXHRjb25zdCBuYW1lID0gbmFtZUZuYygnJykucmVwbGFjZUFsbCggJy8nLCAnXycgKTtcblxuXHRpZiAoICFqc29uLmRhdGFTZXR0aW5ncyB8fCAhanNvbi5kYXRhU2V0dGluZ3MuaTE4bktleXNDdHhzICkge1xuXHRcdHJldHVybiBbXTtcblx0fVxuXG5cdGNvbnN0IGkxOG5EYXRhID0gW107XG5cblx0Ly8gQ29sbGVjdCBJbmZvXG5cdE9iamVjdC5lbnRyaWVzKCBqc29uLmRhdGFTZXR0aW5ncy5pMThuS2V5c0N0eHMgKS5mb3JFYWNoKCAoW2tleSwgY3R4XSkgPT4ge1xuXG5cdFx0Ly8gUGZhZCBpbiBKU09OIHN1Y2hlblxuXHRcdGNvbnN0IGtleVBhcnRzID0ga2V5LnNwbGl0KCAnLicgKTtcblx0XHRsZXQgdmFsID0ganNvbjtcblx0XHR3aGlsZSAoMSkge1xuXHRcdFx0Y29uc3QgayA9IGtleVBhcnRzLnNoaWZ0KCk7XG5cdFx0XHRpZiAoICEoIGsgaW4gdmFsICkgKSB7XG5cdFx0XHRcdC8vIFBGYWQgbmljaHQgZ2VmdW5kZW5cblx0XHRcdFx0dmFsID0gbnVsbDtcblx0XHRcdFx0YnJlYWs7XG5cdFx0XHR9XG5cdFx0XHR2YWwgPSB2YWxbIGsgXTtcblx0XHRcdGlmICgga2V5UGFydHMubGVuZ3RoID09PSAwICkge1xuXHRcdFx0XHQvLyBFaW56ZWxuZXIgV2VydCBnZWZ1bmRlblxuXHRcdFx0XHRicmVhaztcblx0XHRcdH1cblx0XHRcdGlmICggdHlwZW9mIHZhbCAhPT0gJ29iamVjdCcgKSB7XG5cdFx0XHRcdC8vIFBmYWQgZ2VodCBuaWNodCB3ZWl0ZXJcblx0XHRcdFx0dmFsID0gbnVsbDtcblx0XHRcdFx0YnJlYWs7XG5cdFx0XHR9XG5cdFx0XHRpZiAoIEFycmF5LmlzQXJyYXkodmFsKSApIHtcblx0XHRcdFx0aWYgKCBrZXlQYXJ0cy5sZW5ndGg8PTEgKSB7XG5cdFx0XHRcdFx0Ly8gQXJyYXkgZ2VmdW5kZW5cblx0XHRcdFx0XHRicmVhaztcblx0XHRcdFx0fSBlbHNlIHtcblx0XHRcdFx0XHQvLyBhcnJheSBtaXR0ZW5kcmluLCBGZWhsZXJcblx0XHRcdFx0XHR2YWwgPSBudWxsO1xuXHRcdFx0XHRcdGJyZWFrO1xuXHRcdFx0XHR9XG5cdFx0XHR9XG5cdFx0fVxuXG5cdFx0Y29uc3QgYWRkID0gKHRleHQsY3VycmtleSkgPT4ge1xuXHRcdFx0Ly8gRWluZW4gV2VydCBhZGRlbiwgd2VubiB3aXJrbGljaCBUZXh0XG5cdFx0XHR0ZXh0ID0gdGV4dC50cmltKCk7XG5cdFx0XHRpZiAoIHRleHQgJiYgIXRleHQubWF0Y2goIC9eWzAtOSwuICVdKyQvICkgKXtcblx0XHRcdFx0Y29uc3QgZGVzY3IgPSBjdHgucmVwbGFjZUFsbCggJyR7fScsIG5hbWUgKS50cmltKCk7XG5cdFx0XHRcdGNvbnN0IGVudHJ5ID0ge1xuXHRcdFx0XHRcdGtleTogbmFtZS5sZW5ndGg+MCA/IGAke25hbWV9LiR7Y3VycmtleX1gIDogY3VycmtleSxcblx0XHRcdFx0XHR0ZXh0LFxuXHRcdFx0XHRcdGRlc2NyLFxuXHRcdFx0XHR9XG5cdFx0XHRcdGkxOG5EYXRhLnB1c2goIGVudHJ5ICk7XG5cdFx0XHR9XG5cdFx0fVxuXG5cdFx0aWYgKCB2YWwgIT09IG51bGwgKSB7XG5cdFx0XHRpZiAoIHR5cGVvZiB2YWwgIT09ICdvYmplY3QnICkge1xuXHRcdFx0XHQvLyBFaW56ZWxuZW4gV2VydCBzY2hyZWliZW5cblx0XHRcdFx0YWRkKCB2YWwsIGtleSApO1xuXHRcdFx0fSBlbHNlIHtcblx0XHRcdFx0Ly8gQXJyYXktV2VydGUgc2NocmVpYmVuXG5cdFx0XHRcdGNvbnN0IGsgPSBrZXlQYXJ0cy5wb3AoKTtcblx0XHRcdFx0Y29uc3Qgc3RhbW1LZXkgPSBrID8ga2V5LnN1YnN0cmluZyggMCwga2V5Lmxlbmd0aC1rLmxlbmd0aC0xICkgOiBrZXk7XG5cdFx0XHRcdHZhbC5mb3JFYWNoKCAodixpKSA9PiB7XG5cdFx0XHRcdFx0aWYgKCBrICkge1xuXHRcdFx0XHRcdFx0aWYgKCBrIGluIHYgKSB7XG5cdFx0XHRcdFx0XHRcdGFkZCggdltrXSwgYCR7c3RhbW1LZXl9LiR7aX0uJHtrfWAgKTtcblx0XHRcdFx0XHRcdH1cblx0XHRcdFx0XHR9IGVsc2Uge1xuXHRcdFx0XHRcdFx0YWRkKCB2LCBgJHtzdGFtbUtleX0uJHtpfWAgKTtcblx0XHRcdFx0XHR9XG5cdFx0XHRcdH0pO1xuXHRcdFx0fVxuXHRcdH1cblx0fSlcbi8vIGNvbnNvbGUubG9nKCBcIj09PT09PT09PT09PT09IGkxOG5EYXRhXCIsIGkxOG5EYXRhICk7XG5cblx0cmV0dXJuIGkxOG5EYXRhO1xufVxuXG4vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy9cblxuZXhwb3J0IGZ1bmN0aW9uIHBhdGNoQ2ZnSTE4biAoIGpzb24sIGkxOG4sIG5hbWVGbmM9Z2V0RVBGRm9sZGVyTmFtZSApIHtcblxuXHRjb25zdCBuYW1lID0gbmFtZUZuYygnJykucmVwbGFjZUFsbCggJy8nLCAnXycgKTtcblxuXHRpMThuLmZvckVhY2goICh7IGtleSwgdGV4dCB9KSA9PiB7XG5cblx0XHQvLyBFUEYgTmFtZSArICcuJyBtdXNzIGFtIEFuZmFuZyB3ZWduZWhtZW5cblx0XHRpZiAoIG5hbWUubGVuZ3RoPjAgKSB7XG5cdFx0XHRpZiAoICFrZXkuc3RhcnRzV2l0aCggbmFtZSArICcuJyApICkge1xuXHRcdFx0XHRyZXR1cm47XG5cdFx0XHR9XG5cdFx0XHRrZXkgPSBrZXkuc3Vic3RyaW5nKCBuYW1lLmxlbmd0aCsxICk7XG5cdFx0fVxuXHRcdGNvbnN0IGtleVBhcnRzID0ga2V5LnNwbGl0KCAnLicgKTtcblx0XHRsZXQgdmFsID0ganNvbjtcblxuXHRcdHdoaWxlICgxKSB7XG5cdFx0XHRjb25zdCBrID0ga2V5UGFydHMuc2hpZnQoKTtcblx0XHRcdGlmICggISggayBpbiB2YWwgKSApIHtcblx0XHRcdFx0Ly8gUEZhZCBuaWNodCBnZWZ1bmRlblxuXHRcdFx0XHRicmVhaztcblx0XHRcdH1cblx0XHRcdGlmICgga2V5UGFydHMubGVuZ3RoID09PSAwICkge1xuXHRcdFx0XHQvLyBFaW56ZWxuZXIgV2VydCBnZWZ1bmRlblxuXHRcdFx0XHR2YWxbIGsgXSA9IHRleHQ7XG5cdFx0XHRcdGJyZWFrO1xuXHRcdFx0fVxuXHRcdFx0dmFsID0gdmFsWyBrIF07XG5cdFx0fVxuXHR9KVxufVxuIiwiaW1wb3J0IHsgb2JqZWN0X2VxdWFscyB9IGZyb20gJy4vY29tbW9uJ1xuaW1wb3J0IHsgZnNtU2VuZCB9IGZyb20gJy4vZnNtJ1xuXG4vLyBLb252YSBzaG91bGQgYmVpIGltcG9ydGVkLCBidXQgZG9lbnMndCBzZWVtIHRvIHN1cHBvcnQgdHJlZSBzaGFraW5nLCBzbyBsZWF2ZSBpdCBvdXRcbi8vIGltcG9ydCBLb252YSBmcm9tICdrb252YS9saWIvQ29yZSdcblxuZXhwb3J0IGNsYXNzIGJhc2VJbml0cyB7XG5cblx0Y29uc3RydWN0b3IgKCBvcHRzID0ge30gKSB7XG5cblx0XHQvLyBPcHRpb25zIGFuZCBkZWZhdWx0c1xuXHRcdGNvbnN0IGRlZmF1bHRzID0ge1xuXHRcdFx0Y29udGFpbmVyOiBudWxsLFxuXHRcdFx0YWRkU2VuZENoYW5nZVN0YXRlOiBudWxsLFxuXHRcdH1cblx0XHRPYmplY3QuYXNzaWduKCB0aGlzLCBkZWZhdWx0cywgb3B0cyApO1xuXG5cdFx0Ly8gY3JlYXRlIGZzbSBvYmplY3QsIGlmIG5vdCBwcm92aWRlZFxuXHRcdGlmICggIXRoaXMuZnNtICkge1xuXHRcdFx0dGhpcy5mc20gPSBuZXcgZnNtU2VuZCgpO1xuXHRcdFx0dGhpcy5mc20uc3RhcnRMaXN0ZW5pbmdUb1ZhckRlY2xSZXEoIHRoaXMuZGVjbGFyZVZhcmlhYmxlcy5iaW5kKHRoaXMpICk7XG5cdFx0fVxuXG5cdFx0Ly8gaW5pdCBzdGFnZSAmIGxheWVyXG5cdFx0aWYgKCBvcHRzLmNvbnRhaW5lciApIHtcblx0XHRcdGlmICggIXRoaXMud2lkdGggKSB7XG5cdFx0XHRcdHRoaXMud2lkdGggPSB3aW5kb3cuaW5uZXJXaWR0aDtcblx0XHRcdH1cblx0XHRcdGlmICggIXRoaXMuaGVpZ2h0ICkge1xuXHRcdFx0XHR0aGlzLmhlaWdodCA9IHdpbmRvdy5pbm5lckhlaWdodDtcblx0XHRcdH1cblxuXHRcdFx0dGhpcy5zdGFnZSA9IG5ldyBLb252YS5TdGFnZSh7XG5cdFx0XHRcdGNvbnRhaW5lcjogdGhpcy5jb250YWluZXIsXG5cdFx0XHRcdHdpZHRoOiB0aGlzLndpZHRoLFxuXHRcdFx0XHRoZWlnaHQ6IHRoaXMuaGVpZ2h0LFxuXHRcdFx0fSk7XG5cblxuXHRcdFx0Y29uc3Qgc3RhZ2VWTiA9IFwiQldfSUJfRVhUUkVTX1NUQUdFU1wiO1xuXHRcdFx0aWYgKCAhKCBzdGFnZVZOIGluIHdpbmRvdyApICkge1xuXHRcdFx0XHR3aW5kb3dbc3RhZ2VWTl0gPSBbXTtcblx0XHRcdH1cblx0XHRcdHdpbmRvd1tzdGFnZVZOXS5wdXNoKCB0aGlzLnN0YWdlICk7XG5cblxuXHRcdFx0Ly8gdGhpcy5sYXllciA9IG5ldyBLb252YS5MYXllcigpO1xuXHRcdFx0Ly8gdGhpcy5zdGFnZS5hZGQoIHRoaXMubGF5ZXIgKTtcblx0XHR9XG5cblx0XHQvLyBkaXNhYmxlIG1vdXNlIHJpZ2h0IGNsaWNrXG5cdFx0ZG9jdW1lbnQuYWRkRXZlbnRMaXN0ZW5lciggJ2NvbnRleHRtZW51JywgKGV2KSA9PiBldi5wcmV2ZW50RGVmYXVsdCgpICk7XG5cblx0XHR0aGlzLkZTTVZhcnNTZW50ID0ge307XG5cdH1cblxuXHQvLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vL1xuXG5cdC8vIG1ldGhvZCB3cmFwcGVyIGZvciBwb3N0aW5nIHRvIEZTTVxuXG5cdHBvc3RMb2cgKCBldmVudCwgZGF0YT17fSApIHtcblx0XHRpZiAoICF0aGlzLnN0YWdlIHx8ICF0aGlzLnN0YWdlLmlzRGVtb0FuaSApIHtcblx0XHRcdHRoaXMuZnNtLnBvc3RMb2dFdmVudCggT2JqZWN0LmFzc2lnbigge30sIGRhdGEsIHsgZXZlbnQ6IGV2ZW50IH0gKSApO1xuXHRcdH1cblx0fVxuXG5cdHBvc3RWYXJpYWJsZSAoIG5hbWUsIHZhbCApIHtcblx0XHR0aGlzLkZTTVZhcnNTZW50W25hbWVdID0gdmFsO1xuXHRcdHRoaXMuZnNtLnNldEZTTVZhcmlhYmxlKCBuYW1lLCB2YWwgKTtcblx0fVxuXG5cdHRyaWdnZXJJbnB1dFZhbGlkYXRpb25FdmVudCAoKSB7XG5cdFx0aWYgKCB0aGlzLmZzbS50cmlnZ2VyRXZlbnQgKSB7XG4vLy8vLy8vLy8vLy8vLy8vLy8vL1xuXHRcdFx0aWYgKCB0aGlzLmRhdGFTZXR0aW5ncyAmJiB0aGlzLmRhdGFTZXR0aW5ncy52YXJpYWJsZVByZWZpeCApIHtcblx0XHRcdFx0dGhpcy5mc20udHJpZ2dlckV2ZW50KCAnZXZfSW5wdXRWYWxpZGF0aW9uXycgKyB0aGlzLmRhdGFTZXR0aW5ncy52YXJpYWJsZVByZWZpeCApO1xuXHRcdFx0fVxuLy8vLy8vLy8vXG4vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vL1xuLy8vLy8vLy8vL1xuXHRcdFx0dGhpcy5mc20udHJpZ2dlckV2ZW50KCAnZXZfSW5wdXRWYWxpZGF0aW9uX0V4dFJlcycgKTtcblx0XHR9XG5cdH1cblxuXHQvLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vL1xuXG5cdC8vIGdldCBzdGF0ZS12YXJzIG9mIG9ialxuXHRnZXRDaGFuZ2VTdGF0ZSAoIG9iaiApIHtcblxuXHRcdC8vIHN0YXR1c1ZhckRlZiBkZWZpbmVkIGluIG9iaj9cblx0XHRpZiAoIG9iai5zdGF0dXNWYXJEZWYgKSB7XG5cblx0XHRcdHJldHVybiBvYmouc3RhdHVzVmFyRGVmLmNhbGwob2JqKTtcblxuXHRcdH0gZWxzZSB7XG5cblx0XHRcdC8vIGNhbGwgZGVmYXVsdENoYW5nZVN0YXRlKClcblx0XHRcdHJldHVybiArb2JqLmdldERlZmF1bHRDaGFuZ2VTdGF0ZSgpO1xuXG5cdFx0fVxuXHR9XG5cblx0c2VuZENoYW5nZVN0YXRlICggb2JqLCBuZXdTdGF0ZT1udWxsICkge1xuXG5cdFx0Ly8gRG9udCBzZW5kIHN0YXRlcyBvciBzY29yZSBpbiBkZW1vQW5pXG5cdFx0aWYgKCBvYmouc3RhZ2UgJiYgb2JqLnN0YWdlLmlzRGVtb0FuaSApIHtcblx0XHRcdHJldHVybjtcblx0XHR9XG5cblx0XHQvLyBzdGF0ZSBWYXJpYWJsZSAoY2hhbmdlU3RhdGUpIGNoYW5nZWQ/XG5cdFx0Y29uc3QgY2hhbmdlU3RhdGUgPSAoIG5ld1N0YXRlPT09bnVsbCA/IHRoaXMuZ2V0Q2hhbmdlU3RhdGUob2JqKSA6IG5ld1N0YXRlICk7XG5cblx0XHQvLyBpcyBzdGF0ZSBjaGFuZ2VkPyAtPiBzZW5kIG1zZ3Ncblx0XHRpZiAoIHR5cGVvZiBvYmoub2xkQ2hhbmdlU3RhdGUgPT09ICd1bmRlZmluZWQnIHx8ICFvYmplY3RfZXF1YWxzKCBjaGFuZ2VTdGF0ZSwgb2JqLm9sZENoYW5nZVN0YXRlICkgKSB7XG5cblx0XHRcdGlmICggdHlwZW9mIGNoYW5nZVN0YXRlID09PSAnb2JqZWN0JyApIHtcblx0XHRcdFx0Ly8gY2hhbmdlU3RhdGUgPSB7IEZTTVN0YXRlVmFyMTogc3RhdGUxLCBGU01TdGF0ZVZhcjI6IHN0YXRlMiwgLi4uIH1cblx0XHRcdFx0Zm9yICggbGV0IGsgaW4gY2hhbmdlU3RhdGUgKSB7XG5cdFx0XHRcdFx0aWYgKCB0eXBlb2Ygb2JqLm9sZENoYW5nZVN0YXRlICE9PSAnb2JqZWN0JyB8fCBjaGFuZ2VTdGF0ZVtrXSAhPT0gb2JqLm9sZENoYW5nZVN0YXRlW2tdICkge1xuXHRcdFx0XHRcdFx0dGhpcy5wb3N0VmFyaWFibGUoIGssIGNoYW5nZVN0YXRlW2tdICk7XG5cdFx0XHRcdFx0fVxuXHRcdFx0XHR9XG5cblx0XHRcdH0gZWxzZSBpZiAoIG9iai5GU01WYXJpYWJsZU5hbWUgKSB7XG5cdFx0XHRcdC8vIFNpbXBsZSAxLXZhbHVlIHN0YXRlXG5cdFx0XHRcdHRoaXMucG9zdFZhcmlhYmxlKCBgVl9TdGF0dXNfJHtvYmouRlNNVmFyaWFibGVOYW1lfWAsICtjaGFuZ2VTdGF0ZSApO1xuXHRcdFx0fVxuXG5cdFx0XHRvYmoub2xkQ2hhbmdlU3RhdGUgPSBjaGFuZ2VTdGF0ZTtcblx0XHR9XG5cblx0XHQvLyBzY29yZSBjaGFuZ2VkP1xuXHRcdGlmICggb2JqLnNjb3JlRGVmICkge1xuXG5cdFx0XHRjb25zdCBzY29yZSA9IG9iai5zY29yZURlZi5jYWxsKG9iaik7XG5cdFx0XHR0aGlzLnNjb3JlT2JqID0gb2JqO1xuXG5cdFx0XHRpZiAoIHR5cGVvZiBvYmoub2xkU2NvcmUgPT09ICd1bmRlZmluZWQnIHx8ICFvYmplY3RfZXF1YWxzKCBzY29yZSwgb2JqLm9sZFNjb3JlICkgKSB7XG5cdFx0XHRcdGlmICggdHlwZW9mIHNjb3JlID09PSAnb2JqZWN0JyApIHtcblx0XHRcdFx0XHQvLyBzY29yZSA9IHsgRlNNU3RhdGVWYXIxOiBzdGF0ZTEsIEZTTVN0YXRlVmFyMjogc3RhdGUyLCAuLi4gfVxuXHRcdFx0XHRcdGZvciAoIGxldCBrIGluIHNjb3JlICkge1xuXHRcdFx0XHRcdFx0aWYgKCB0eXBlb2Ygb2JqLm9sZFNjb3JlICE9PSAnb2JqZWN0JyB8fCBzY29yZVtrXSAhPT0gb2JqLm9sZFNjb3JlW2tdICkge1xuXHRcdFx0XHRcdFx0XHR0aGlzLnBvc3RWYXJpYWJsZSggaywgc2NvcmVba10gKTtcblx0XHRcdFx0XHRcdH1cblx0XHRcdFx0XHR9XG5cblx0XHRcdFx0fSBlbHNlIGlmICggb2JqLkZTTVZhcmlhYmxlTmFtZSB8fCBvYmouc2NvcmVWYXJpYWJsZU5hbWUgKSB7XG5cdFx0XHRcdFx0Ly8gU2ltcGxlIDEtdmFsdWUgc2NvcmVcblx0XHRcdFx0XHRpZiAoIHR5cGVvZiBzY29yZSAhPT0gJ3VuZGVmaW5lZCcgKSB7XG5cdFx0XHRcdFx0XHR0aGlzLnBvc3RWYXJpYWJsZSggb2JqLnNjb3JlVmFyaWFibGVOYW1lIHx8IGBWX1Njb3JlXyR7b2JqLkZTTVZhcmlhYmxlTmFtZX1gLCBzY29yZSApO1xuXHRcdFx0XHRcdH1cblx0XHRcdFx0fVxuXHRcdFx0fVxuXG5cdFx0XHRvYmoub2xkU2NvcmUgPSBzY29yZTtcblx0XHR9XG5cblx0XHRpZiAoIHR5cGVvZiB0aGlzLmFkZFNlbmRDaGFuZ2VTdGF0ZSA9PT0gJ2Z1bmN0aW9uJyApIHtcblx0XHRcdCh0aGlzLmFkZFNlbmRDaGFuZ2VTdGF0ZSkoKTtcblx0XHR9XG5cdH1cblxuXHQvLyBzZW5kIGluZm9ybWF0aW9uIGFib3V0IHZhcmlhYmxlcyBzZW50XG5cdGRlY2xhcmVWYXJpYWJsZXMgKCkge1xuXG5cdFx0Y29uc3QgdmFyRGVmcyA9IFtdO1xuXHRcdGNvbnN0IHR5cGV0cmFucyA9IHtcblx0XHRcdCdzdHJpbmcnOiAnU3RyaW5nJyxcblx0XHRcdCdudW1iZXInOiAnSW50ZWdlcicsXG5cdFx0XHQnYm9vbGVhbic6ICdCb29sZWFuJyxcblx0XHR9XG5cblx0XHRmb3IgKCBjb25zdCB2bmFtZSBpbiB0aGlzLkZTTVZhcnNTZW50ICkge1xuXG5cdFx0XHRjb25zdCB2YWwgPSB0aGlzLkZTTVZhcnNTZW50W3ZuYW1lXTtcblx0XHRcdGxldCB0eXBlID0gJyc7XG5cdFx0XHRpZiAoIHRoaXMuc2NvcmVPYmogJiYgdGhpcy5zY29yZU9iai5zY29yZURlZlR5cGUgKSB7XG5cdFx0XHRcdHR5cGUgPSB0aGlzLnNjb3JlT2JqLnNjb3JlRGVmVHlwZS5jYWxsKHRoaXMuc2NvcmVPYmosIHZuYW1lKTtcblx0XHRcdH1cblx0XHRcdGlmICggIXR5cGUgKSB7XG5cdFx0XHRcdHR5cGUgPSB2YWw9PT1udWxsID8gJ0ludGVnZXInIDogdHlwZXRyYW5zWyB0eXBlb2YgdmFsIF07XG5cdFx0XHR9XG5cblx0XHRcdGNvbnN0IHZkZWYgPSB7XG5cdFx0XHRcdG5hbWU6IHZuYW1lLFxuXHRcdFx0XHR0eXBlLFxuXHRcdFx0XHRkZWZhdWx0VmFsdWU6IE51bWJlci5pc05hTih2YWwpIHx8IHZhbD09PW51bGwgPyAwIDogKCB2YWwgPT09ICcnID8gJ0VNUFRZJyA6IHZhbCApLFxuXHRcdFx0XHRuYW1lZFZhbHVlczogW10sXG5cdFx0XHR9XG5cdFx0XHR2YXJEZWZzLnB1c2goIHZkZWYgKTtcblx0XHR9XG5cblx0XHRyZXR1cm4gdmFyRGVmcztcblx0fVxufVxuIiwiXHJcbi8vIGltcG9ydCB7IGlzQmV0d2VlbiwgZGVsRGVmYXVsdHMsIG1lcmdlRGVlcCwgb2JqZWN0X2VxdWFscywgZ2V0WG9mRXZlbnQsIGdldFlvZkV2ZW50LCBnZXRQb3NPZkV2ZW50IH0gZnJvbSAnLi9jb21tb24nXHJcblxyXG5leHBvcnQgZnVuY3Rpb24gaXNCZXR3ZWVuICggdiwgdzEsIHcyICkge1xyXG5cdHJldHVybiB2ID49IE1hdGgubWluKCB3MSwgdzIgKSAmJiB2IDw9IE1hdGgubWF4KCB3MSwgdzIgKTtcclxufTtcclxuXHJcblxyXG5leHBvcnQgZnVuY3Rpb24gaXNOdW1Vbml0ICggdiwgbnVtLCB1bml0UkUsIHVuaXRPcHQsIG9yRW1wdHkgKSB7XHJcblx0Y29uc3QgbnVtUkUgPSBgMCoke251bX0oPzpbLC5dMCopP2A7XHJcblx0Y29uc3QgciA9IHVuaXRPcHQgPyBgJHtudW1SRX0oPzogKiR7dW5pdFJFfSk/fCg/OiR7dW5pdFJFfSAqKT8ke251bVJFfWAgOiBgJHtudW1SRX0gKiR7dW5pdFJFfXwke3VuaXRSRX0gKiR7bnVtUkV9YDtcclxuXHRjb25zdCByZSA9IG5ldyBSZWdFeHAoIGBeKD86JHtyfSkkeyBvckVtcHR5ID8gJz8nIDogJycgfSRgICk7XHJcblx0cmV0dXJuIHYudHJpbSgpLm1hdGNoKHJlKTtcclxufVxyXG5cclxuXHJcbi8vIERlbGV0ZXMgZGVsS2V5cyAmIHVuY2hhbmdlZCBkZWZhdWx0cyBmcm9tIG9ialxyXG4vLyBvYmplY3QgZGVlcCBjbG9uZSwgb21pdHRpbmcgc29tZSBkYXRhIGRlZmluZWQgYnkgZGVmYXVsdHMgYW5kIGRlbEtleXNcclxuLy8gYWRvcHRlZCBmcm9tIGh0dHBzOi8vc3RhY2tvdmVyZmxvdy5jb20vcXVlc3Rpb25zLzQ0NTk5MjgvaG93LXRvLWRlZXAtY2xvbmUtaW4tamF2YXNjcmlwdFxyXG5leHBvcnQgZnVuY3Rpb24gZGVsRGVmYXVsdHMgKCBvYmogPSB7fSwgZGVmYXVsdHMgPSB7fSwgZGVsS2V5cyA9IFtdICkge1xyXG5cclxuXHQvLyBpZiBvYmogaXMgYXJyYXkgb2Ygb2JqZWN0czogYXBwbHkgZGVsRGVmYXVsdHMgdG8gZXZlcnkgbWVtYmVyIG9mIGFycmF5XHJcblx0aWYgKCBBcnJheS5pc0FycmF5KG9iaikgKSB7XHJcblx0XHRsZXQgYSA9IFtdO1xyXG5cdFx0b2JqLmZvckVhY2goIGUgPT4ge1xyXG5cdFx0XHRpZiAoIHR5cGVvZiBlPT09J29iamVjdCcgKSB7XHJcblx0XHRcdFx0YS5wdXNoKCBkZWxEZWZhdWx0cyggZSwgZGVmYXVsdHMsIGRlbEtleXMgKSApO1xyXG5cdFx0XHR9IGVsc2Uge1xyXG5cdFx0XHRcdGEucHVzaChlKTtcclxuXHRcdFx0fVxyXG5cdFx0fSlcclxuXHRcdHJldHVybiBhO1xyXG5cdH1cclxuXHJcblx0aWYgKCAhb2JqICkge1xyXG5cdFx0cmV0dXJuIG9iajtcclxuXHR9XHJcblxyXG5cdGxldCB2O1xyXG5cdGxldCBiT2JqZWN0ID0ge307XHJcblx0Zm9yICggY29uc3QgayBpbiBvYmogKSB7XHJcblx0XHRpZiAoICFkZWxLZXlzLmluY2x1ZGVzKGspICkge1xyXG5cdFx0XHR2ID0gb2JqW2tdO1xyXG5cdFx0XHRpZiAoICFkZWZhdWx0cyB8fCBkZWZhdWx0c1trXSE9PXYgKSB7XHJcblx0XHRcdFx0Yk9iamVjdFtrXSA9ICh0eXBlb2YgdiA9PT0gXCJvYmplY3RcIikgPyBkZWxEZWZhdWx0cyggdiwgZGVmYXVsdHMgPyBkZWZhdWx0c1trXSA6IFtdICkgOiB2O1xyXG5cdFx0XHR9XHJcblx0XHR9XHJcblx0fVxyXG5cclxuXHRyZXR1cm4gYk9iamVjdDtcclxufVxyXG5cclxuLyoqXHJcbiAqIEZyb206IGh0dHBzOi8vZ2lzdC5naXRodWIuY29tL2FodGN4LzBjZDk0ZTYyNjkxZjUzOTE2MGIzMmVjZGExOGFmM2Q2XHJcbiAqIFBlcmZvcm1zIGEgZGVlcCBtZXJnZSBvZiBgc291cmNlYCBpbnRvIGB0YXJnZXRgLlxyXG4gKiBNdXRhdGVzIGB0YXJnZXRgIG9ubHkgYnV0IG5vdCBpdHMgb2JqZWN0cyBhbmQgYXJyYXlzLlxyXG4gKlxyXG4gKiBAYXV0aG9yIGluc3BpcmVkIGJ5IFtqaGlsZGVuYmlkZGxlXShodHRwczovL3N0YWNrb3ZlcmZsb3cuY29tL2EvNDgyMTgyMDkpLlxyXG4gKi9cclxuZXhwb3J0IGZ1bmN0aW9uIG1lcmdlRGVlcCAodGFyZ2V0LCBzb3VyY2UpIHtcclxuXHRjb25zdCBpc09iamVjdCA9IChvYmopID0+IG9iaiAmJiB0eXBlb2Ygb2JqID09PSAnb2JqZWN0JztcclxuXHJcblx0aWYgKCFpc09iamVjdCh0YXJnZXQpIHx8ICFpc09iamVjdChzb3VyY2UpKSB7XHJcblx0XHRyZXR1cm4gc291cmNlO1xyXG5cdH1cclxuXHJcblx0T2JqZWN0LmtleXMoc291cmNlKS5mb3JFYWNoKGtleSA9PiB7XHJcblx0XHRjb25zdCB0YXJnZXRWYWx1ZSA9IHRhcmdldFtrZXldO1xyXG5cdFx0Y29uc3Qgc291cmNlVmFsdWUgPSBzb3VyY2Vba2V5XTtcclxuXHJcblx0XHRpZiAoIC8qQXJyYXkuaXNBcnJheSh0YXJnZXRWYWx1ZSkgJiYqLyBBcnJheS5pc0FycmF5KHNvdXJjZVZhbHVlKSkge1xyXG5cdFx0XHQvLyBOTyBDT05DQVRFTkFUSU9OIE9GIEFSUkFZUyFcclxuXHRcdFx0Ly8gdGFyZ2V0W2tleV0gPSB0YXJnZXRWYWx1ZS5jb25jYXQoc291cmNlVmFsdWUpO1xyXG5cdFx0XHR0YXJnZXRba2V5XSA9IHNvdXJjZVZhbHVlO1xyXG5cdFx0fSBlbHNlIGlmIChpc09iamVjdCh0YXJnZXRWYWx1ZSkgJiYgaXNPYmplY3Qoc291cmNlVmFsdWUpKSB7XHJcblx0XHRcdHRhcmdldFtrZXldID0gbWVyZ2VEZWVwKE9iamVjdC5hc3NpZ24oe30sIHRhcmdldFZhbHVlKSwgc291cmNlVmFsdWUpO1xyXG5cdFx0fSBlbHNlIHtcclxuXHRcdFx0dGFyZ2V0W2tleV0gPSBzb3VyY2VWYWx1ZTtcclxuXHRcdH1cclxuXHR9KTtcclxuXHJcblx0cmV0dXJuIHRhcmdldDtcclxufVxyXG5cclxuLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy9cclxuXHJcbi8vIGFkb3B0ZWQgZnJvbSBodHRwczovL3N0YWNrb3ZlcmZsb3cuY29tL3F1ZXN0aW9ucy8xMDY4ODM0L29iamVjdC1jb21wYXJpc29uLWluLWphdmFzY3JpcHRcclxuZXhwb3J0IGZ1bmN0aW9uIG9iamVjdF9lcXVhbHMgKCB4LCB5ICkge1xyXG5cdGlmICggeCA9PT0geSApIHJldHVybiB0cnVlO1xyXG5cdC8vIGlmIGJvdGggeCBhbmQgeSBhcmUgbnVsbCBvciB1bmRlZmluZWQgYW5kIGV4YWN0bHkgdGhlIHNhbWVcclxuXHJcblx0aWYgKCAhICggeCBpbnN0YW5jZW9mIE9iamVjdCApIHx8ICEgKCB5IGluc3RhbmNlb2YgT2JqZWN0ICkgKSByZXR1cm4gZmFsc2U7XHJcblx0Ly8gaWYgdGhleSBhcmUgbm90IHN0cmljdGx5IGVxdWFsLCB0aGV5IGJvdGggbmVlZCB0byBiZSBPYmplY3RzXHJcblxyXG5cdGlmICggeC5jb25zdHJ1Y3RvciAhPT0geS5jb25zdHJ1Y3RvciApIHJldHVybiBmYWxzZTtcclxuXHQvLyB0aGV5IG11c3QgaGF2ZSB0aGUgZXhhY3Qgc2FtZSBwcm90b3R5cGUgY2hhaW4sIHRoZSBjbG9zZXN0IHdlIGNhbiBkbyBpc1xyXG5cdC8vIHRlc3QgdGhlcmUgY29uc3RydWN0b3IuXHJcblxyXG5cdC8vIGlmIGJvdGggYXJlIGFycmF5czogdW5vcmRlcmVkIGNvbXBhcmUgKGNoZWNrIGlmIGFsbCBlbGVtZW50cyBhcmUgY29udGFpbmVkKVxyXG5cdGlmICggQXJyYXkuaXNBcnJheSh5KSAmJiBBcnJheS5pc0FycmF5KHgpICkge1xyXG5cdFx0aWYgKCB4Lmxlbmd0aCAhPSB5Lmxlbmd0aCApIHJldHVybiBmYWxzZTtcclxuXHRcdGNvbnN0IHkyID0gQXJyYXkuZnJvbSggeSApO1xyXG5cdFx0aWYgKCAheC5ldmVyeSggeGUgPT5cclxuXHRcdFx0eTIuc29tZSggKCB5ZSwgaSApID0+IHtcclxuXHRcdFx0XHRpZiAoIG9iamVjdF9lcXVhbHMoIHhlLCB5ZSApICkge1xyXG5cdFx0XHRcdFx0eTIuc3BsaWNlKCBpLCAxICk7XHJcblx0XHRcdFx0XHRyZXR1cm4gdHJ1ZTtcclxuXHRcdFx0XHR9XHJcblx0XHRcdFx0cmV0dXJuIGZhbHNlO1xyXG5cdFx0XHR9KVxyXG5cdFx0KSkgcmV0dXJuIGZhbHNlO1xyXG5cdFx0cmV0dXJuIHkyLmxlbmd0aD09PTA7XHJcblx0fVxyXG5cclxuXHRmb3IgKCB2YXIgcCBpbiB4ICkge1xyXG5cdFx0aWYgKCAhIHguaGFzT3duUHJvcGVydHkoIHAgKSApIGNvbnRpbnVlO1xyXG5cdFx0XHQvLyBvdGhlciBwcm9wZXJ0aWVzIHdlcmUgdGVzdGVkIHVzaW5nIHguY29uc3RydWN0b3IgPT09IHkuY29uc3RydWN0b3JcclxuXHJcblx0XHRpZiAoICEgeS5oYXNPd25Qcm9wZXJ0eSggcCApICkgcmV0dXJuIGZhbHNlO1xyXG5cdFx0XHQvLyBhbGxvd3MgdG8gY29tcGFyZSB4WyBwIF0gYW5kIHlbIHAgXSB3aGVuIHNldCB0byB1bmRlZmluZWRcclxuXHJcblx0XHRpZiAoIHhbIHAgXSA9PT0geVsgcCBdICkgY29udGludWU7XHJcblx0XHRcdC8vIGlmIHRoZXkgaGF2ZSB0aGUgc2FtZSBzdHJpY3QgdmFsdWUgb3IgaWRlbnRpdHkgdGhlbiB0aGV5IGFyZSBlcXVhbFxyXG5cclxuXHRcdGlmICggdHlwZW9mKCB4WyBwIF0gKSAhPT0gXCJvYmplY3RcIiApIHJldHVybiBmYWxzZTtcclxuXHRcdFx0Ly8gTnVtYmVycywgU3RyaW5ncywgRnVuY3Rpb25zLCBCb29sZWFucyBtdXN0IGJlIHN0cmljdGx5IGVxdWFsXHJcblxyXG5cdFx0aWYgKCAhIG9iamVjdF9lcXVhbHMoIHhbIHAgXSwgIHlbIHAgXSApICkgcmV0dXJuIGZhbHNlO1xyXG5cdFx0XHQvLyBPYmplY3RzIGFuZCBBcnJheXMgbXVzdCBiZSB0ZXN0ZWQgcmVjdXJzaXZlbHlcclxuXHR9XHJcblxyXG5cdGZvciAoIHAgaW4geSApXHJcblx0aWYgKCB5Lmhhc093blByb3BlcnR5KCBwICkgJiYgISB4Lmhhc093blByb3BlcnR5KCBwICkgKVxyXG5cdFx0cmV0dXJuIGZhbHNlO1xyXG5cdFx0Ly8gYWxsb3dzIHhbIHAgXSB0byBiZSBzZXQgdG8gdW5kZWZpbmVkXHJcblxyXG5cdHJldHVybiB0cnVlO1xyXG59XHJcblxyXG4vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vL1xyXG5cclxuZXhwb3J0IGZ1bmN0aW9uIGdldFhvZkV2ZW50ICggc3RhZ2UsIGV2ZW50ICkge1xyXG5cdGlmICggZXZlbnQgKSB7XHJcblx0XHRpZiAoIGV2ZW50LnNpbVggKSB7XHJcblx0XHRcdHJldHVybiBldmVudC5zaW1YO1xyXG5cdFx0fVxyXG5cdFx0Ly8gaWYgKCBldmVudC5ldnQgJiYgZXZlbnQuZXZ0LmNsaWVudFggKSB7XHJcblx0XHQvLyBcdHJldHVybiBldmVudC5ldnQuY2xpZW50WDtcclxuXHRcdC8vIH1cclxuXHR9XHJcblx0cmV0dXJuIHN0YWdlLmdldFBvaW50ZXJQb3NpdGlvbigpLng7XHJcbn1cclxuXHJcblxyXG5leHBvcnQgZnVuY3Rpb24gZ2V0WW9mRXZlbnQgKCBzdGFnZSwgZXZlbnQgKSB7XHJcblx0aWYgKCBldmVudCApIHtcclxuXHRcdGlmICggZXZlbnQuc2ltWSApIHtcclxuXHRcdFx0cmV0dXJuIGV2ZW50LnNpbVk7XHJcblx0XHR9XHJcblx0XHQvLyBpZiAoIGV2ZW50LmV2dCAmJiBldmVudC5ldnQuY2xpZW50WSApIHtcclxuXHRcdC8vIFx0cmV0dXJuIGV2ZW50LmV2dC5jbGllbnRZO1xyXG5cdFx0Ly8gfVxyXG5cdH1cclxuXHRyZXR1cm4gc3RhZ2UuZ2V0UG9pbnRlclBvc2l0aW9uKCkueTtcclxufVxyXG5cclxuXHJcbmV4cG9ydCBmdW5jdGlvbiBnZXRQb3NPZkV2ZW50ICggc3RhZ2UsIGV2ICkge1xyXG5cdHJldHVybiB7XHJcblx0XHR4OiBnZXRYb2ZFdmVudCggc3RhZ2UsIGV2ICksXHJcblx0XHR5OiBnZXRZb2ZFdmVudCggc3RhZ2UsIGV2ICksXHJcblx0fVxyXG59XHJcblxyXG5cclxuLy8gaXMgaW4gRGVtb0FuaTogaWdub3JlIG5hdGl2ZSBFdmVudHMgKHByZXZlbnQgZS5nLiBzdGFnZS5vbihtb3VzZWxlYXZlKSlcclxuZXhwb3J0IGZ1bmN0aW9uIGlnbm9yZUV2ZW50ICggc3RhZ2UsIGV2ICkge1xyXG5cdHJldHVybiAoIHN0YWdlICYmIHN0YWdlLmlzRGVtb0FuaSAmJiAhKCBcInNpbVhcIiBpbiBldiApICk7XHJcbn1cclxuXHJcblxyXG4vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vL1xyXG5cclxuZXhwb3J0IGNvbnN0IHNldFN0YXRlUG9zdFByb2MgPSBmdW5jdGlvbiAob2JqKSB7XHJcblxyXG5cdGlmICggb2JqLnN0YWdlICYmIG9iai5zdGFnZS5pc0RlbW9BbmkgJiYgb2JqLnN0YWdlLmlzRGVtb0FuaS5lbmRBbmkgKSB7XHJcblx0XHRvYmouc3RhZ2UuaXNEZW1vQW5pLmVuZEFuaSggZmFsc2UgKTtcclxuXHR9XHJcblxyXG5cdGlmICggb2JqLmJhc2UgKSB7XHJcblx0XHRvYmouYmFzZS5zZW5kQ2hhbmdlU3RhdGUoIG9iaiApO1x0Ly8gaW5pdCAmIHNlbmQgY2hhbmdlU3RhdGUgJiBzY29yZVxyXG5cdH1cclxuXHQvLyBvYmoub2xkQ2hhbmdlU3RhdGUgPSBvYmouYmFzZS5nZXRDaGFuZ2VTdGF0ZShvYmopO1xyXG5cdC8vIGlmICggb2JqLnNjb3JlRGVmICkge1xyXG5cdC8vIFx0b2JqLm9sZFNjb3JlID0gb2JqLnNjb3JlRGVmKCk7XHJcblx0Ly8gfVxyXG59XHJcblxyXG4vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vL1xyXG5cclxuZXhwb3J0IGNvbnN0IGdldEFic1Bvc2l0aW9uID0gZnVuY3Rpb24gKGVsZW1lbnQpIHtcclxuXHRjb25zdCBib3ggPSBlbGVtZW50LmdldEJvdW5kaW5nQ2xpZW50UmVjdCgpO1xyXG5cdGNvbnN0IHNjcm9sbFggPSB3aW5kb3cuc2Nyb2xsWCB8fCB3aW5kb3cucGFnZVhPZmZzZXQ7XHJcblx0Y29uc3Qgc2Nyb2xsWSA9IHdpbmRvdy5zY3JvbGxZIHx8IHdpbmRvdy5wYWdlWU9mZnNldDtcclxuXHRyZXR1cm4ge1xyXG5cdFx0bGVmdDogYm94LmxlZnQgKyBzY3JvbGxYLFxyXG5cdFx0dG9wOiBib3gudG9wICsgc2Nyb2xsWVxyXG5cdH1cclxufVxyXG5cclxuLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy9cclxuXHJcbmV4cG9ydCBmdW5jdGlvbiByZWdleENhbkxvb2tCZWhpbmQoKSB7XHJcblx0aWYgKCByZWdleENhbkxvb2tCZWhpbmQuciAhPT0gdW5kZWZpbmVkICkge1xyXG5cdFx0cmV0dXJuIHJlZ2V4Q2FuTG9va0JlaGluZC5yO1xyXG5cdH1cclxuXHR0cnkge1xyXG5cdFx0bmV3IFJlZ0V4cCggJyg/PCFhKWInICk7XHJcblx0XHRyZWdleENhbkxvb2tCZWhpbmQuciA9IHRydWU7XHJcblx0XHRyZXR1cm4gdHJ1ZTtcclxuXHR9IGNhdGNoIChlKSB7XHJcblx0XHRyZWdleENhbkxvb2tCZWhpbmQuciA9IGZhbHNlO1xyXG5cdFx0cmV0dXJuIGZhbHNlO1xyXG5cdH1cclxufVxyXG4iLCIvLyBTZXQgRlNNIHZhcmlhYmxlXHJcblxyXG5leHBvcnQgY2xhc3MgZnNtU2VuZCB7XHJcblxyXG5cdGNvbnN0cnVjdG9yICgpIHtcclxuXHRcdHRoaXMuaW5kZXhQYXRoID0gdGhpcy5nZXRRdWVyeVZhcmlhYmxlKCdpbmRleFBhdGgnKTtcclxuXHRcdHRoaXMudXNlckRlZklkUGF0aCA9IHRoaXMuZ2V0UXVlcnlWYXJpYWJsZSgndXNlckRlZklkUGF0aCcpO1xyXG5cclxuXHRcdC8vIFRyYWNlIENvdW50ZXJcclxuXHRcdHRoaXMudHJhY2VDb3VudCA9IDA7XHJcblxyXG5cdFx0Ly8gSW5pdCBkb25lIHByb21pc2VcclxuXHRcdHRoaXMucHJJbml0RG9uZSA9IG5ldyBQcm9taXNlKCAocmVzb2x2ZSkgPT4ge1xyXG5cdFx0XHRpZiAoIHByb2Nlc3MuZW52Lk5PREVfRU5WID09PSAncHJvZHVjdGlvbicgKSB7XHJcblx0XHRcdFx0dGhpcy5wckluaXREb25lUmVzb2x2ZSA9IHJlc29sdmU7XHJcblx0XHRcdH0gZWxzZSB7XHJcblx0XHRcdFx0dGhpcy5wckluaXREb25lUmVzb2x2ZSA9ICgpID0+IHtcclxuXHRcdFx0XHRcdHRoaXMuZGVidWdPdXQoIFwiZnNtU2VuZDogSW5pdCBkb25lIHByb21pc2UgcmVzb2x2ZWRcIiApO1xyXG5cdFx0XHRcdFx0cmVzb2x2ZSgpO1xyXG5cdFx0XHRcdH07XHJcblx0XHRcdH1cclxuXHRcdH0pO1xyXG5cdFx0dGhpcy5pbml0RG9uZUNudCA9IDA7XHJcblxyXG5cdFx0aWYgKCBwcm9jZXNzLmVudi5OT0RFX0VOViAhPT0gJ3Byb2R1Y3Rpb24nICkge1xyXG5cdFx0XHR3aW5kb3cuYndfX2RlYnVnT3V0ID0gdGhpcy5kZWJ1Z091dC5iaW5kKHRoaXMpO1xyXG5cdFx0fVxyXG5cdH1cclxuXHJcblx0c2V0RlNNVmFyaWFibGUgKCB2YXJpYWJsZU5hbWUsIG5ld1ZhbHVlICkge1xyXG5cclxuXHRcdGlmICggQXJyYXkuaXNBcnJheShuZXdWYWx1ZSkgKSB7XHJcblx0XHRcdG5ld1ZhbHVlID0gbmV3VmFsdWUuam9pbignLCcpO1xyXG5cdFx0fVxyXG5cclxuXHRcdGlmICggcHJvY2Vzcy5lbnYuTk9ERV9FTlYgIT09ICdwcm9kdWN0aW9uJyApIHtcclxuXHRcdFx0dGhpcy5kZWJ1Z091dCggYFNldCBGU00gdmFyaWFibGU6ICR7dmFyaWFibGVOYW1lfSB0byB2YWx1ZSA+JHtuZXdWYWx1ZX08ICgke3R5cGVvZiBuZXdWYWx1ZX0pYCApO1xyXG5cdFx0fVxyXG5cclxuXHRcdHRoaXMucG9zdE1lc3NhZ2VXaXRoUGF0aHNBbmRUcmFjZUNvdW50KHtcclxuXHRcdFx0c2V0VmFyaWFibGU6IHtcclxuXHRcdFx0XHR2YXJpYWJsZU5hbWUsXHJcblx0XHRcdFx0bmV3VmFsdWU6IE51bWJlci5pc05hTihuZXdWYWx1ZSkgPyAwIDogbmV3VmFsdWUsXHJcblx0XHRcdH0sXHJcblx0XHR9KVxyXG5cdH1cclxuXHJcblx0Ly8gU2VuZCBhIHRyYWNlIG1lc3NhZ2VcclxuXHRwb3N0TG9nRXZlbnQgKCB0cmFjZU1lc3NhZ2UgKSB7XHJcblxyXG5cdFx0aWYgKCBwcm9jZXNzLmVudi5OT0RFX0VOViAhPT0gJ3Byb2R1Y3Rpb24nICkge1xyXG5cdFx0XHR0aGlzLmRlYnVnT3V0KCBgUG9zdGluZyBldmVudCAnJHt0cmFjZU1lc3NhZ2UuZXZlbnR9JywgbWVzc2FnZSAke0pTT04uc3RyaW5naWZ5KCB0cmFjZU1lc3NhZ2UsIChrLHYpID0+IGs9PT0nZXZlbnQnID8gdW5kZWZpbmVkIDogdiApfWAgKTtcclxuXHRcdH1cclxuXHJcblx0XHR0aGlzLnBvc3RNZXNzYWdlV2l0aFBhdGhzQW5kVHJhY2VDb3VudCh7XHJcblx0XHRcdHRyYWNlTWVzc2FnZSxcclxuXHRcdH0pXHJcblxyXG5cdH1cclxuXHJcblx0dHJpZ2dlckV2ZW50ICggZXZlbnQgKSB7XHJcblxyXG5cdFx0aWYgKCBwcm9jZXNzLmVudi5OT0RFX0VOViAhPT0gJ3Byb2R1Y3Rpb24nICkge1xyXG5cdFx0XHR0aGlzLmRlYnVnT3V0KFwidHJpZ2dlckV2ZW50OiBcIiArIGV2ZW50KTtcclxuXHRcdH1cclxuXHJcblx0XHR0aGlzLnBvc3RNZXNzYWdlV2l0aFBhdGhzQW5kVHJhY2VDb3VudCh7XHJcblx0XHRcdG1pY3JvZmluRXZlbnQ6IGV2ZW50LFxyXG5cdFx0fSlcclxuXHR9XHJcblxyXG5cdHBvc3RNZXNzYWdlV2l0aFBhdGhzQW5kVHJhY2VDb3VudCggcGF5bG9hZCApIHtcclxuXHJcblx0XHR0cnlcclxuXHRcdHtcclxuXHRcdFx0cGF5bG9hZC5pbmRleFBhdGggPSB0aGlzLmluZGV4UGF0aDtcclxuXHRcdFx0cGF5bG9hZC51c2VyRGVmSWRQYXRoID0gdGhpcy51c2VyRGVmSWRQYXRoO1xyXG5cdFx0XHRwYXlsb2FkLnRyYWNlQ291bnQgPSB0aGlzLnRyYWNlQ291bnQrKztcclxuXHJcblx0XHRcdHRoaXMucG9zdE1lc3NhZ2UoIEpTT04uc3RyaW5naWZ5KCBwYXlsb2FkICkgKTtcclxuXHJcblx0XHR9IGNhdGNoIChlKSB7XHJcblx0XHRcdGNvbnNvbGUuZXJyb3IoZSk7XHJcblx0XHR9XHJcblxyXG5cdH1cclxuXHJcblx0cG9zdE1lc3NhZ2UgKCBwYXlsb2FkICkge1xyXG5cdFx0aWYgKCBwcm9jZXNzLmVudi5OT0RFX0VOViAhPT0gJ3Byb2R1Y3Rpb24nICkge1xyXG5cdFx0XHR0aGlzLmRlYnVnT3V0KCBgUG9zdGluZyBtZXNzYWdlOiAke3BheWxvYWR9YCApO1xyXG5cdFx0XHRpZiAoIHdpbmRvdy5wYXJlbnQgIT09IHdpbmRvdyApIHtcclxuXHRcdFx0XHR3aW5kb3cucGFyZW50LnBvc3RNZXNzYWdlKCBwYXlsb2FkLCAnKicgKTtcclxuXHRcdFx0fVxyXG5cdFx0XHRpZiAoIHdpbmRvdy5fX0JXX19jYWxsYmFjayApIHtcclxuXHRcdFx0XHR3aW5kb3cuX19CV19fY2FsbGJhY2soIHBheWxvYWQgKTtcclxuXHRcdFx0fVxyXG5cdFx0fSBlbHNlIHtcclxuXHRcdFx0d2luZG93LnBhcmVudC5wb3N0TWVzc2FnZSggcGF5bG9hZCwgJyonICk7XHJcblx0XHR9XHJcblx0fVxyXG5cclxuXHQvLyBIZWxwZXJcclxuXHRnZXRRdWVyeVZhcmlhYmxlICh2YXJpYWJsZSkge1xyXG5cdFx0Y29uc3QgcGFyc2VkVXJsID0gbmV3IFVSTCggd2luZG93LmxvY2F0aW9uLmhyZWYgKTtcclxuXHRcdHJldHVybiBwYXJzZWRVcmwuc2VhcmNoUGFyYW1zLmdldCh2YXJpYWJsZSk7XHJcblx0fVxyXG5cclxuXHRzdGFydExpc3RlbmluZ1RvVmFyRGVjbFJlcSAoZGVjbGFyZVZhcmlhYmxlQ2FsbGJhY2spIHtcclxuXHJcblx0XHRjb25zdCBwckluaXREb25lID0gdGhpcy5nZXRJbml0RG9uZVByb21pc2UoKTtcclxuXHJcblx0XHR0aGlzLmFuc3dlclZhckRlY2xSZXEgPSBmdW5jdGlvbiAoY2FsbElkKSB7XHJcblx0XHRcdHBySW5pdERvbmUudGhlbiggKCkgPT4ge1xyXG5cdFx0XHRcdGNvbnN0IHZhcmlhYmxlcyA9IGRlY2xhcmVWYXJpYWJsZUNhbGxiYWNrKCk7XHJcblx0XHRcdFx0Y29uc3QgcGFzc19kYXRhID0ge1xyXG5cdFx0XHRcdFx0aW5pdGlhbFZhcmlhYmxlczogdmFyaWFibGVzLFxyXG5cdFx0XHRcdFx0Y2FsbElkXHJcblx0XHRcdFx0fVxyXG5cclxuXHRcdFx0XHR0aGlzLnBvc3RNZXNzYWdlKCBKU09OLnN0cmluZ2lmeSggcGFzc19kYXRhICkgKTtcclxuXHRcdFx0fSk7XHJcblx0XHR9XHJcblxyXG5cdFx0Ly8gbGlzdGVuZXIgZm9yIHByb3ZpZGluZyBpbml0aWFsIHZhcmlhYmxlIGRhdGEgc2lnbmFsLlxyXG5cdFx0d2luZG93LmFkZEV2ZW50TGlzdGVuZXIoXHJcblx0XHRcdFwibWVzc2FnZVwiLFxyXG5cdFx0XHQoZXZlbnQpID0+IHtcclxuXHJcblx0XHRcdFx0dHJ5IHtcclxuXHRcdFx0XHRcdGNvbnN0IHsgY2FsbElkIH0gPSBKU09OLnBhcnNlKGV2ZW50LmRhdGEpO1xyXG5cdFx0XHRcdFx0aWYgKCBjYWxsSWQgIT09IHVuZGVmaW5lZCAmJiBjYWxsSWQuaW5jbHVkZXMoXCJpbXBvcnRWYXJpYWJsZXNcIikgKSB7XHJcblx0XHRcdFx0XHRcdHRoaXMuYW5zd2VyVmFyRGVjbFJlcShjYWxsSWQpO1xyXG5cdFx0XHRcdFx0fVxyXG5cdFx0XHRcdH0gY2F0Y2ggKGVycm9yKSB7XHJcblx0XHRcdFx0XHRpZiAoIHByb2Nlc3MuZW52Lk5PREVfRU5WICE9PSAncHJvZHVjdGlvbicgKSB7XHJcblx0XHRcdFx0XHRcdGNvbnNvbGUubG9nKFwiZXJyb3Igb24gZXh0ZXJuYWwgbGlzdGVuZXIgLSBcIiwgZXJyb3IpO1xyXG5cdFx0XHRcdFx0fVxyXG5cdFx0XHRcdH1cclxuXHRcdFx0fSxcclxuXHRcdFx0ZmFsc2UgKTtcclxuXHQgfVxyXG5cclxuXHQgZGVidWdPdXQgKHMpIHtcclxuXHRcdGlmICggcHJvY2Vzcy5lbnYuTk9ERV9FTlYgIT09ICdwcm9kdWN0aW9uJyApIHtcclxuXHJcblx0XHRcdC8vIGlmICggIXRoaXMuZGVidWdPdXRwdXQgKSB7XHJcblx0XHRcdC8vIFx0Y29uc3QgaGVpZ3RoPTIwMCwgd2lkdGg9NTAwO1xyXG5cdFx0XHQvLyBcdC8vIGRvY3VtZW50LmJvZHkuaW5uZXJIVE1MICs9IGA8ZGl2IGlkPVwiYndfRGVidWdPdXRwdXRcIiBzdHlsZT1cIndpZHRoOiR7d2lkdGh9cHg7aGVpZ2h0OiR7aGVpZ3RofXB4O3Bvc2l0aW9uOmFic29sdXRlO2JvdHRvbTowcHg7bGVmdDowcHg7ei1pbmRleDoxMDAwMDA7d2hpdGUtc3BhY2U6cHJlO2JvcmRlcjoxcHggc29saWQgYmxhY2s7YmFja2dyb3VuZDpsaWdodHllbGxvd1wiPjwvZGl2PmA7XHJcblx0XHRcdC8vIFx0Y29uc3QgZGl2ID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcIkRJVlwiKTtcclxuXHRcdFx0Ly8gXHRjb25zdCBzdCA9IHtcclxuXHRcdFx0Ly8gXHRcdHdpZHRoOmAke3dpZHRofXB4YCxcclxuXHRcdFx0Ly8gXHRcdGhlaWdodDpgJHtoZWlndGh9cHhgLFxyXG5cdFx0XHQvLyBcdFx0b3ZlcmZsb3c6XCJzY3JvbGxcIixcclxuXHRcdFx0Ly8gXHRcdHBvc2l0aW9uOlwiYWJzb2x1dGVcIixcclxuXHRcdFx0Ly8gXHRcdGJvdHRvbTpcIjBweFwiLFxyXG5cdFx0XHQvLyBcdFx0bGVmdDpcIjBweFwiLFxyXG5cdFx0XHQvLyBcdFx0XCJ6LWluZGV4XCI6MTAwMDAwLFxyXG5cdFx0XHQvLyBcdFx0XCJ3aGl0ZS1zcGFjZVwiOlwicHJlXCIsXHJcblx0XHRcdC8vIFx0XHRib3JkZXI6XCIxcHggc29saWQgYmxhY2tcIixcclxuXHRcdFx0Ly8gXHRcdGJhY2tncm91bmQ6XCJsaWdodHllbGxvd1wiLFxyXG5cdFx0XHQvLyBcdH1cclxuXHRcdFx0Ly8gXHRPYmplY3QuYXNzaWduKCBkaXYuc3R5bGUsIHN0ICk7XHJcblx0XHRcdC8vIFx0ZG9jdW1lbnQuYm9keS5hcHBlbmRDaGlsZChkaXYpO1xyXG5cdFx0XHQvLyBcdHRoaXMuZGVidWdPdXRwdXQgPSBkaXY7XHJcblx0XHRcdC8vIH1cclxuXHRcdFx0Ly8gdGhpcy5kZWJ1Z091dHB1dC5pbm5lckhUTUwgKz0gXCJcXG5cIitzO1xyXG5cdFx0XHQvLyB0aGlzLmRlYnVnT3V0cHV0LnNjcm9sbFRvcCA9IHRoaXMuZGVidWdPdXRwdXQuc2Nyb2xsSGVpZ2h0O1xyXG5cclxuXHRcdFx0Y29uc29sZS5sb2cocyk7XHJcblx0XHRcdC8vIGNvbnNvbGUudHJhY2UoKTtcclxuXHJcblx0XHR9XHJcblx0IH1cclxuXHJcblx0Ly8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy9cclxuXHJcblx0Z2V0SW5pdERvbmVQcm9taXNlICgpIHtcclxuXHRcdHJldHVybiB0aGlzLnBySW5pdERvbmU7XHJcblx0fVxyXG5cclxuXHRpbmNJbml0Q250ICgpIHtcclxuXHRcdHJldHVybiArK3RoaXMuaW5pdERvbmVDbnQ7XHJcblx0fVxyXG5cclxuXHRkZWNJbml0Q250ICgpIHtcclxuXHRcdGlmICggdGhpcy5pbml0RG9uZUNudCA+IDAgKSB7XHJcblx0XHRcdHRoaXMuaW5pdERvbmVDbnQtLTtcclxuXHRcdFx0aWYgKHRoaXMuaW5pdERvbmVDbnQgPT09IDApIHtcclxuXHRcdFx0XHR0aGlzLnBySW5pdERvbmVSZXNvbHZlKCk7XHJcblx0XHRcdH1cclxuXHRcdH1cclxuXHRcdHJldHVybiB0aGlzLmluaXREb25lQ250O1xyXG5cdH1cclxuXHJcbn1cclxuIiwiaW1wb3J0ICcuL3RleHRhcmVhSW5zZXJ0cy5jc3MnXHJcblxyXG5pbXBvcnQgeyBtZXJnZURlZXAsIHNldFN0YXRlUG9zdFByb2MsIHJlZ2V4Q2FuTG9va0JlaGluZCB9IGZyb20gJy4vY29tbW9uJ1xyXG5cclxuZXhwb3J0IGNsYXNzIHRleHRhcmVhQ29udGFpbmVyIHtcclxuXHJcblx0Y29uc3RydWN0b3IgKCBkaXZTZWxlY3Rvciwgb3B0cyA9IHt9LCBiYXNlID0gbnVsbCApIHtcclxuXHJcblx0XHRpZiAoIGJhc2UuZnNtICYmIGJhc2UuZnNtLmluY0luaXRDbnQgKSB7XHJcblx0XHRcdGJhc2UuZnNtLmluY0luaXRDbnQoKTtcclxuXHRcdH1cclxuXHJcblx0XHRjb25zdCBkZWZhdWx0cyA9IHtcclxuXHRcdFx0b3V0ZXJEaXZTdHlsZXM6IHtcdC8vIHN0eWxlcyBvZiBjcmVhdGVkIG91dGVyIGRpdiAoY29udGFpbmluZyB0ZXh0YXJlYSBhbmQgdG9vbGJhcilcclxuXHRcdFx0fSxcclxuXHRcdFx0ZGl2U3R5bGVzOiB7XHQvLyBzdHlsZXMgb2YgXCJ0ZXh0YXJlYVwiLWRpdlxyXG5cdFx0XHRcdC8vIHdpZHRoOiAnMzAwcHgnLFxyXG5cdFx0XHRcdC8vIGhlaWdodDogJzIwMHB4JyxcclxuXHRcdFx0fSxcclxuXHRcdH1cclxuXHRcdG1lcmdlRGVlcCggT2JqZWN0LmFzc2lnbiggdGhpcywgZGVmYXVsdHMgKSwgb3B0cyApO1xyXG5cdFx0Ly8gYmFzZSBpcyBvbmx5IHVzZWQgZm9yIHNlbmRDaGFuZ2VTdGF0ZSgpIGFuZCBwb3N0TG9nKClcclxuXHRcdHRoaXMuYmFzZSA9IGJhc2U7XHJcblxyXG5cdFx0Ly8gbW92ZSBkaXYgaW4gYSBkaXYudGV4dGFyZWFJbnNlcnRzICgtPnRoaXMub3V0ZXJEaXYpXHJcblx0XHR0aGlzLm91dGVyRGl2ID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnRElWJyk7XHJcblx0XHR0aGlzLm91dGVyRGl2LmNsYXNzTGlzdC5hZGQoICd0ZXh0YXJlYUluc2VydHMnICk7XHJcblx0XHR0aGlzLnNldFN0eWxlcyggdGhpcy5vdXRlckRpdiwgdGhpcy5vdXRlckRpdlN0eWxlcyApO1xyXG5cclxuXHRcdHRoaXMuZGl2ID0gdHlwZW9mIGRpdlNlbGVjdG9yID09PSAnc3RyaW5nJyA/IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoIGRpdlNlbGVjdG9yICkgOiBkaXZTZWxlY3RvcjtcclxuXHRcdHRoaXMuZGl2LnBhcmVudE5vZGUucmVwbGFjZUNoaWxkKCB0aGlzLm91dGVyRGl2LCB0aGlzLmRpdiApO1xyXG5cdFx0dGhpcy5zZXRTdHlsZXMoIHRoaXMuZGl2LCB0aGlzLmRpdlN0eWxlcyApO1xyXG5cclxuXHRcdHRoaXMub3V0ZXJEaXYuYXBwZW5kQ2hpbGQoIHRoaXMuZGl2ICk7XHJcblx0XHR0aGlzLmluaXREYXRhID0gdGhpcy5kaXYuaW5uZXJIVE1MLnRyaW0oKTtcclxuXHJcblx0XHRpZiAoIGJhc2UuZnNtICYmIGJhc2UuZnNtLmRlY0luaXRDbnQgKSB7XHJcblx0XHRcdGJhc2UuZnNtLmRlY0luaXRDbnQoKTtcclxuXHRcdH1cclxuXHR9XHJcblxyXG5cdGV2X2lucHV0ICgpIHtcclxuXHR9XHJcblxyXG5cdHNldFN0eWxlcyAoIGVsLCBzdHlsZXMgKSB7XHJcblx0XHRmb3IgKCBjb25zdCBzdCBpbiBzdHlsZXMgKSB7XHJcblx0XHRcdGVsLnN0eWxlW3N0XSA9IHN0eWxlc1tzdF07XHJcblx0XHR9XHJcblx0fVxyXG5cclxuXHRleHRyYWN0ICgpIHtcclxuXHRcdHJldHVybiAnJztcclxuXHR9XHJcblxyXG5cdC8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vXHJcblxyXG5cdGdldERlZmF1bHRDaGFuZ2VTdGF0ZSAoKSB7XHJcblx0XHRyZXR1cm4gdGhpcy5kaXYuaW5uZXJIVE1MLnRyaW0oKSAhPT0gdGhpcy5pbml0RGF0YTtcclxuXHR9XHJcblxyXG5cdGdldFN0YXRlICgpIHtcclxuXHRcdHJldHVybiAne30nO1xyXG5cdH1cclxuXHJcblx0c2V0U3RhdGUgKCkge1xyXG5cdH1cclxufVxyXG5cclxuZXhwb3J0IGNsYXNzIHRleHRhcmVhQmFzZSBleHRlbmRzIHRleHRhcmVhQ29udGFpbmVyIHtcclxuXHJcblx0Y29uc3RydWN0b3IgKCBkaXZTZWxlY3Rvciwgb3B0cyA9IHt9LCBiYXNlID0gbnVsbCApIHtcclxuXHJcblx0XHRpZiAoIGJhc2UuZnNtICYmIGJhc2UuZnNtLmluY0luaXRDbnQgKSB7XHJcblx0XHRcdGJhc2UuZnNtLmluY0luaXRDbnQoKTtcclxuXHRcdH1cclxuXHJcbmNvbnNvbGUubG9nKFwiKisqKyorKisqKyorXCIscmVnZXhDYW5Mb29rQmVoaW5kKCkpXHJcblx0XHRjb25zdCBkZWZhdWx0cyA9IHtcclxuXHRcdFx0bXVsdGlMaW5lOiB0cnVlLFxyXG5cdFx0XHRzdHJpcFRhZ3M6IGZhbHNlLFx0Ly8gdHJ1ZTogb25seSBhbGxvdyB0ZXh0LW5vZGUsIGRlbGV0ZSBhbGwgSFRNTC10YWdzIChmaXJlb2Z4IGluc2VydHMgPGJyPiBzb21ldGltZXMpXHJcblx0XHRcdGlucHV0UmVnZXhwOiBudWxsLFx0Ly8gcmVnZXhwIGV2YWx1YXRlZCBhZ2FpbnN0IGRpdi5pbm5lckhUTUxcclxuXHRcdFx0bWF4bGVuZ3RoOiBudWxsLFx0Ly8gbWF4IG51bWJlcnMgY2hhcmFjdGVyc1xyXG5cclxuXHRcdFx0Ly8gUmVwbGFjZXMgZG9uZSBieSB0aGlzLmV4dHJhY3QoKVxyXG5cdFx0XHQvLyAoZS5nLiB0b29sYmFyLmV4dHJhY3RSZXBsYWNlIGFyZSBpbnNlcnRlZCBoZXJlKVxyXG5cdFx0XHRleHRyYWN0UmVwbGFjZXM6IFtcclxuXHRcdFx0XHQvLyB7IGZyb206IC9yZWdleHAvLCB0bzogXCJyZXBsYWNlXCIgfSxcclxuXHJcblx0XHRcdFx0cmVnZXhDYW5Mb29rQmVoaW5kKCkgP1xyXG5cdFx0XHRcdFx0eyBmcm9tOiAgLyg/PCFcXCopXFwqKD8hXFwqKS9nICwgdG86IFwiXFx1MjJjNVwiIH0gOlx0Ly8gcmVwbGFjZSAnKicgdG8gXFx1MjJjNVxyXG5cdFx0XHRcdFx0Ly8gSUIgaW50ZXJuYWwgYnJvd3NlciBkb2VzIG5vdCBzdXBwb3J0IG5lZ2F0aXZlIGxvb2stYmVoaW5kLy1mb3J3YXJkXHJcblx0XHRcdFx0XHQvLyB3b3JrYXJvdW5kOlxyXG5cdFx0XHRcdFx0eyBmcm9tOiAvKF58W14qXSlcXCooW14qXXwkKS9nLCB0bzogXCIkMVxcdTIyYzUkMlwiIH0sXHQvLyByZXBsYWNlICcqJyB0byBcXHUyMmM1XHJcblxyXG5cdFx0XHRcdHsgZnJvbTogL1xcdTIwMjJ8XFx1MjVjZi9nLCB0bzogXCJcXHUyMmM1XCIgfSxcdC8vIHJlcGxhY2Ug4oCiIGFuZCDil48gdG8gXFx1MjJjNVxyXG5cdFx0XHRdXHJcblx0XHR9XHJcblx0XHRtZXJnZURlZXAoIGRlZmF1bHRzLCBvcHRzICk7XHJcblx0XHRzdXBlciggZGl2U2VsZWN0b3IsIGRlZmF1bHRzLCBiYXNlICk7XHJcblxyXG5cdFx0dGhpcy5kaXYuc2V0QXR0cmlidXRlKCAnY29udGVudGVkaXRhYmxlJywgJ3RydWUnICk7XHJcblxyXG5cdFx0dGhpcy5kaXYuYWRkRXZlbnRMaXN0ZW5lciggJ2tleWRvd24nLCB0aGlzLmV2X2tleWRvd24uYmluZCh0aGlzKSApO1xyXG5cdFx0dGhpcy5kaXYuYWRkRXZlbnRMaXN0ZW5lciggJ2lucHV0JywgdGhpcy5ldl9pbnB1dC5iaW5kKHRoaXMpICk7XHJcblx0XHQvLyB0aGlzLmRpdi5hZGRFdmVudExpc3RlbmVyKCAndG91Y2hlbmQnLCB0aGlzLmV2X3RvdWNoZW5kLmJpbmQodGhpcykgKTtcclxuXHRcdC8vIFsnY2xpY2snLCd0b3VjaHN0YXJ0JywnY2hhbmdlJywnaW5wdXQnLCdrZXlwcmVzcycsJ2tleXVwJ10uZm9yRWFjaCggZSA9PiB7XHJcblx0XHQvL1x0dGhpcy5kaXYuYWRkRXZlbnRMaXN0ZW5lciggZSwgdGhpcy5jaGVja05vZGVzLmJpbmQodGhpcykgKTtcclxuXHRcdC8vIH0pXHJcblxyXG5cdFx0aWYgKCAhdGhpcy5kaXYudGV4dENvbnRlbnQubGVuZ3RoICYmIHRoaXMubXVsdGlMaW5lICkge1xyXG5cdFx0XHR0aGlzLmRpdi50ZXh0Q29udGVudCA9IFwiXFxuXCI7XHJcblx0XHRcdC8vIHRoaXMuZGl2LmFwcGVuZENoaWxkKCBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdkaXYnKSApO1xyXG5cdFx0fVxyXG5cclxuXHRcdHRoaXMuZGl2LmFkZEV2ZW50TGlzdGVuZXIoICdwYXN0ZScsIChldikgPT4gZXYucHJldmVudERlZmF1bHQoKSApO1xyXG5cclxuXHRcdGlmICggdGhpcy5pbnB1dFJlZ2V4cCApIHtcclxuXHRcdFx0dGhpcy5pbnB1dFJFID0gbmV3IFJlZ0V4cCggdGhpcy5pbnB1dFJlZ2V4cCApO1xyXG5cdFx0XHR0aGlzLnNhdmVWYWx1ZSgpO1xyXG5cdFx0fVxyXG5cclxuXHRcdHRoaXMuZGl2LmFkZEV2ZW50TGlzdGVuZXIoICdmb2N1cycsXHJcblx0XHRcdFx0KCkgPT4gc2V0VGltZW91dCggKCkgPT4gdGhpcy5iYXNlLnBvc3RMb2coICd0ZXh0YXJlYUZvY3VzJywgdGhpcy5nZXRUZXh0UG9zKCkgKSwgMCApICk7XHJcblx0XHR0aGlzLmRpdi5hZGRFdmVudExpc3RlbmVyKCAnYmx1cicsICgpID0+IHRoaXMuYmFzZS5wb3N0TG9nKCAndGV4dGFyZWFCbHVyJyApICk7XHJcblxyXG5cclxuXHRcdHRoaXMub2xkVmFsdWUgPSBcIlwiO1xyXG5cdFx0dGhpcy5vbGRGb2N1c0VsZW1JbmRleCA9IG51bGw7XHJcblxyXG5cdFx0Ly8gU2F2ZSBpbml0RGF0YSAmIGluaXQgU3RhdGVWYXJzXHJcblx0XHR0aGlzLmluaXREYXRhID0gdGhpcy5kaXYuaW5uZXJIVE1MLnRyaW0oKTtcclxuXHRcdHRoaXMuYmFzZS5zZW5kQ2hhbmdlU3RhdGUoIHRoaXMgKTtcdC8vIGluaXQgJiBzZW5kIGNoYW5nZVN0YXRlICYgc2NvcmVcclxuXHJcblx0XHRpZiAoIGJhc2UuZnNtICYmIGJhc2UuZnNtLmRlY0luaXRDbnQgKSB7XHJcblx0XHRcdGJhc2UuZnNtLmRlY0luaXRDbnQoKTtcclxuXHRcdH1cclxuXHR9XHJcblxyXG5cdC8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vXHJcblxyXG5cdGV2X2tleWRvd24gKGV2ZW50KSB7XHJcbi8vIGNvbnNvbGUubG9nKGV2ZW50KTtcclxuXHJcblx0XHRsZXQgcmVzY29yZSA9IDA7XHJcblxyXG5cdFx0Ly8gbG9nP1xyXG5cdFx0aWYgKCB0aGlzLmJhc2UgKSB7XHJcblx0XHRcdGNvbnN0IGRhdGEgPSB7XHJcblx0XHRcdFx0d2hpY2g6IGV2ZW50LndoaWNoIHx8IGV2ZW50LmtleUNvZGUsXHJcblx0XHRcdFx0Ly8gZXh0cmFjdDogdGhpcy5leHRyYWN0KCksXHQvLyBvbGQsIHVuY2hhbmdlZCB2YWx1ZVxyXG5cdFx0XHR9O1xyXG5cdFx0XHRbICdrZXknLCAnY29kZScsICdzaGlmdEtleScsICdhbHRLZXknLCAnY3RybEtleScsICdtZXRhS2V5JywgJ2lzQ29tcG9zaW5nJywgJ3JlcGVhdCcgXS5mb3JFYWNoKCBrID0+IHtcclxuXHRcdFx0XHRpZiAoIGV2ZW50W2tdICkge1xyXG5cdFx0XHRcdFx0ZGF0YVtrXSA9IGV2ZW50W2tdO1xyXG5cdFx0XHRcdH1cclxuXHRcdFx0fSlcclxuXHJcbi8vICEhISEhIERPTlQgTE9HIE9OIENIUk9NRS9BTkRST0lEICEhISEhXHJcbi8vICEhISEhIERPTlQgTE9HIE9OIENIUk9NRS9BTkRST0lEICEhISEhXHJcbi8vICEhISEhIERPTlQgTE9HIE9OIENIUk9NRS9BTkRST0lEICEhISEhXHJcblx0XHRcdHRoaXMuYmFzZS5wb3N0TG9nKCAna2V5RG93bicsIE9iamVjdC5hc3NpZ24oIGRhdGEsIHRoaXMuZ2V0VGV4dFBvcygpICkgKTtcclxuXHRcdH1cclxuXHJcblx0XHQvLyBPbiBFTlRFUiBpbnNlcnQgPGJyPiwgcHJldmVudCBpbnNlcnRpbmcgPGRpdnM+XHJcblx0XHRpZiAoIGV2ZW50LmtleT09PVwiRW50ZXJcIiB8fCBldmVudC53aGljaD09MTMgfHwgZXZlbnQua2V5Q29kZT09MTMgKSB7XHJcblx0XHRcdGlmICggIXRoaXMudGFiVG9OZXh0SW5wdXRGaWVsZChldmVudCkgKSB7XHJcblx0XHRcdC8vIFx0aWYgKCAhdGhpcy5tdWx0aUxpbmUgKSB7XHJcblx0XHRcdC8vIFx0XHRldmVudC5wcmV2ZW50RGVmYXVsdCgpO1xyXG5cdFx0XHQvLyBcdFx0ZXZlbnQuc3RvcFByb3BhZ2F0aW9uKCk7XHJcblx0XHRcdC8vIFx0fVxyXG5cdFx0XHQvLyB9XHJcblx0XHRcdFx0aWYgKCAhdGhpcy5tdWx0aUxpbmUgfHwgdGhpcy5wYXN0ZUh0bWxBdENhcmV0KFwiXFxuXCIpICkge1xyXG5cclxuXHRcdFx0XHRcdC8vIC8vIENocm9tZTogSWYgRW50ZXIgd2FzIGhpdCBiZWhpbmQgbGFzdCBjaGFyYWN0ZXIsXHJcblx0XHRcdFx0XHQvLyAvLyBhbiA8ZGl2Pjxicj48ZGl2PiBpcyBpbnNlcnRlZFxyXG5cdFx0XHRcdFx0Ly8gLy8gSG90Rml4OiBkZWxldGUgbGFzdCA8ZGl2PlxyXG5cdFx0XHRcdFx0Ly8gY29uc3Qgc2VsID0gd2luZG93LmdldFNlbGVjdGlvbigpO1xyXG5cdFx0XHRcdFx0Ly8gaWYgKCBzZWwgJiYgc2VsLmlzQ29sbGFwc2VkICYmIHNlbC5mb2N1c05vZGUgJiZcclxuXHRcdFx0XHRcdC8vIFx0XHRzZWwuZm9jdXNOb2RlPT10aGlzLmRpdiAmJiBzZWwuZm9jdXNPZmZzZXQ9PXRoaXMuZGl2LmNoaWxkTm9kZXMubGVuZ3RoICkge1xyXG5cclxuXHRcdFx0XHRcdC8vIFx0bGV0IGxhc3ROb2RlID0gdGhpcy5kaXYuY2hpbGROb2Rlc1sgdGhpcy5kaXYuY2hpbGROb2Rlcy5sZW5ndGgtMSBdO1xyXG5cdFx0XHRcdFx0Ly8gXHRpZiAoIGxhc3ROb2RlLnRhZ05hbWU9PSdESVYnICYmICFsYXN0Tm9kZS5jbGFzc0xpc3QuY29udGFpbnMoJ2luc2VydGVkJykgKSB7XHJcblx0XHRcdFx0XHQvLyBcdFx0bGFzdE5vZGUucmVtb3ZlKCk7XHJcblx0XHRcdFx0XHQvLyBcdH1cclxuXHRcdFx0XHRcdC8vIH1cclxuXHJcblx0XHRcdFx0XHRldmVudC5wcmV2ZW50RGVmYXVsdCgpO1xyXG5cdFx0XHRcdFx0ZXZlbnQuc3RvcFByb3BhZ2F0aW9uKCk7XHJcblx0XHRcdFx0fVxyXG5cdFx0XHR9XHJcblx0XHRcdHJlc2NvcmUgPSAxO1xyXG5cclxuXHRcdC8vIE9uIFRBQiBpbnNlcnQgdGFiXHJcblx0XHR9IGVsc2UgaWYgKCBldmVudC5rZXk9PT1cIlRhYlwiIHx8IGV2ZW50LndoaWNoPT05IHx8IGV2ZW50LmtleUNvZGU9PTkgKSB7XHJcblx0XHRcdGlmICggIXRoaXMudGFiVG9OZXh0SW5wdXRGaWVsZChldmVudCkgKSB7XHJcblx0XHRcdFx0aWYgKCB0aGlzLnBhc3RlSHRtbEF0Q2FyZXQoJyYjMDk7JykgKSB7XHJcblx0XHRcdFx0XHRldmVudC5wcmV2ZW50RGVmYXVsdCgpO1xyXG5cdFx0XHRcdFx0ZXZlbnQuc3RvcFByb3BhZ2F0aW9uKCk7XHJcblx0XHRcdFx0fVxyXG5cdFx0XHR9XHJcblx0XHRcdHJlc2NvcmUgPSAxO1xyXG5cclxuXHRcdC8vIEJhY2tzcGFjZTogRGVsZXRlIGRpdiBiZWZvcmUgY3Vyc29yP1xyXG5cdFx0fSBlbHNlIGlmICggZXZlbnQua2V5PT09XCJCYWNrc3BhY2VcIiB8fCBldmVudC53aGljaD09OCB8fCBldmVudC5rZXlDb2RlPT04ICkge1xyXG5cdFx0XHQvLyBzaG91bGQgZGl2IGJlIGRlbGV0ZWRcclxuXHRcdFx0aWYgKCAhdGhpcy5kZWxJZkRpdiggLTEsIGV2ZW50ICkgKSB7XHJcblx0XHRcdFx0Ly8gLy8gSXMgY3Vyc29yIGluL2FmdGVyIGxhc3QgdGV4dCBub2RlICcgJyAoZG9uJ3QgZGVsZXRlLCBqdXN0IHJlcG9zIGN1cnNvcilcclxuXHRcdFx0XHQvLyBjb25zdCBzZWwgPSB3aW5kb3cuZ2V0U2VsZWN0aW9uKCk7XHJcblx0XHRcdFx0Ly8gaWYgKCBzZWwgJiYgc2VsLmlzQ29sbGFwc2VkICYmIHNlbC5mb2N1c05vZGUgKSB7XHJcblx0XHRcdFx0Ly8gXHRjb25zdCBub2RlcyA9IHRoaXMuZGl2LmNoaWxkTm9kZXM7XHJcblx0XHRcdFx0Ly8gXHRpZiAoIG5vZGVzW25vZGVzLmxlbmd0aC0xXS50ZXh0Q29udGVudD09JyAnICYmXHJcblx0XHRcdFx0Ly8gXHRcdFx0KCBzZWwuZm9jdXNOb2RlPT10aGlzLmRpdiAmJiBzZWwuZm9jdXNPZmZzZXQ+PXRoaXMuZGl2LmNoaWxkTm9kZXMubGVuZ3RoIHx8XHQvLyBDdXJzb3IgYmVoaW5kIGxhc3Qgbm9kZVxyXG5cdFx0XHRcdC8vIFx0XHRcdHNlbC5mb2N1c05vZGU9PW5vZGVzW25vZGVzLmxlbmd0aC0xXSAmJiBzZWwuZm9jdXNPZmZzZXQ9PTEgKSApIHtcdC8vIGN1cnNvciBhZnRlciBzcGFjZSBpbiBsYXN0IHRleHRub2RlXHJcblxyXG5cdFx0XHRcdC8vIFx0XHQvLyBtb3ZlIGN1cnNvciBiZWZvcmUgc3BhY2UgaW4gbGFzdCB0ZXh0IG5vZGVcclxuXHRcdFx0XHQvLyBcdFx0Y29uc3QgcmFuZ2UgPSBzZWwuZ2V0UmFuZ2VBdCgwKS5jbG9uZVJhbmdlKCk7XHJcblx0XHRcdFx0Ly8gXHRcdHJhbmdlLnNldFN0YXJ0KCBub2Rlc1tub2Rlcy5sZW5ndGgtMV0sIDAgKTtcclxuXHRcdFx0XHQvLyBcdFx0cmFuZ2UuY29sbGFwc2UodHJ1ZSk7XHJcblx0XHRcdFx0Ly8gXHRcdHNlbC5yZW1vdmVBbGxSYW5nZXMoKTtcclxuXHRcdFx0XHQvLyBcdFx0c2VsLmFkZFJhbmdlKHJhbmdlKTtcclxuXHJcblx0XHRcdFx0Ly8gXHRcdGV2ZW50LnByZXZlbnREZWZhdWx0KCk7XHJcblx0XHRcdFx0Ly8gXHRcdGV2ZW50LnN0b3BQcm9wYWdhdGlvbigpO1xyXG5cdFx0XHRcdC8vIFx0fVxyXG5cdFx0XHRcdC8vIH1cclxuXHRcdFx0fVxyXG5cdFx0XHRyZXNjb3JlID0gMTtcclxuXHJcblx0XHQvLyBEZWxldGU6IERlbGV0ZSBkaXYgYWZ0ZXIgY3Vyc29yP1xyXG5cdFx0fSBlbHNlIGlmICggZXZlbnQua2V5PT09XCJEZWxldGVcIiB8fCAoIGV2ZW50LndoaWNoIHx8IGV2ZW50LmtleUNvZGUgKT09NDYgKSB7XHJcblx0XHRcdHRoaXMuZGVsSWZEaXYoIDEsIGV2ZW50ICk7XHJcblx0XHRcdHJlc2NvcmUgPSAxO1xyXG5cdFx0fVxyXG5cclxuXHRcdGlmICggdGhpcy5iYXNlICYmIHJlc2NvcmU+MCApIHtcclxuXHRcdFx0dGhpcy5iYXNlLnNlbmRDaGFuZ2VTdGF0ZSggdGhpcyApO1xyXG5cdFx0fVxyXG5cdH1cclxuXHJcblx0Ly8gY2hyb21lIEAgYW5kcm9pZCBkb2VzIG5vdCBzZW5kIGtleUNvZGVzIG9uIGtleWRvd24gZXZlbnRzXHJcblx0Ly8gdGhlcmVmb3JlIGlucHV0IGV2ZW50IG11c3QgYmUgZXZhbHVhdGVkIGZvciAnZGVsZXRlQ29udGVudEJhY2t3YXJkJyBiZWhpbmQgaW5zZXJ0ZWQgZWxlbWVudHNcclxuXHRldl9pbnB1dCAoZXZlbnQpIHtcclxuXHJcblx0XHRsZXQgc2F2ZU5ld1ZhbHVlID0gZmFsc2U7XHJcblxyXG4vLyBjb25zb2xlLmxvZyggd2luZG93LmdldFNlbGVjdGlvbigpICk7XHJcblx0XHRjb25zdCBzZWwgPSB3aW5kb3cuZ2V0U2VsZWN0aW9uKCk7XHJcblxyXG5cdFx0Ly8gd2FzIFwiaW5zZXJ0ZWRcIiBub2RlIHNhdmVkIGZvciBkZWxldGlvbiBhbmQgd2FzIGJhY2tzcGFjZSBwcm9jZXNzZWQ/XHJcblx0XHRpZiAoIGV2ZW50ICYmIGV2ZW50LmlucHV0VHlwZT09J2RlbGV0ZUNvbnRlbnRCYWNrd2FyZCcgJiYgdGhpcy5kZWxQb3NFbGVtZW50ICkge1xyXG5cclxuLy8gY29uc29sZS5sb2codGhpcy5kZWxQb3NUZXh0KTtcclxuXHRcdFx0Ly8gaXMgY3Vyc29yIElOIGluc2VydGVkIGVsZW1lbnQ/XHJcblx0XHRcdGxldCBpbnNlcnRlZCA9IG51bGwsIHNlYXJjaCA9IHNlbC5mb2N1c05vZGU7XHJcblx0XHRcdGlmICggdGhpcy5kZWxQb3NUZXh0ICkge1xyXG5cdFx0XHRcdHdoaWxlICggIWluc2VydGVkICYmIHNlYXJjaCAmJiAoICFzZWFyY2guY2xhc3NMaXN0IHx8ICFzZWFyY2guY2xhc3NMaXN0LmNvbnRhaW5zKCd0ZXh0YXJlYUluc2VydHMnKSApICkge1xyXG4vLyBjb25zb2xlLmxvZyhzZWFyY2gpO1xyXG5cdFx0XHRcdFx0aWYgKCBzZWFyY2guY2xhc3NMaXN0ICYmIHNlYXJjaC5jbGFzc0xpc3QuY29udGFpbnMoJ2luc2VydGVkJykgKSB7XHJcblx0XHRcdFx0XHRcdGluc2VydGVkID0gc2VhcmNoO1xyXG5cdFx0XHRcdFx0fVxyXG5cdFx0XHRcdFx0c2VhcmNoID0gc2VhcmNoLnBhcmVudE5vZGU7XHJcblx0XHRcdFx0fVxyXG5cdFx0XHR9XHJcblx0XHRcdGlmICggaW5zZXJ0ZWQgKSAge1xyXG4vLyBjb25zb2xlLmxvZyh0aGlzLmRlbFBvc1RleHQsdGhpcy5kZWxQb3NFbGVtZW50KVxyXG5cdFx0XHRcdC8vIHBvcyBjdXJzb3JcclxuXHRcdFx0XHRpZiAoIHNlbC5nZXRSYW5nZUF0ICYmIHNlbC5yYW5nZUNvdW50ICkge1xyXG5cdFx0XHRcdFx0Y29uc3QgcmFuZ2UgPSBzZWwuZ2V0UmFuZ2VBdCgwKS5jbG9uZVJhbmdlKCk7XHJcblx0XHRcdFx0XHRyYW5nZS5zZXRTdGFydEJlZm9yZShpbnNlcnRlZCk7XHJcblx0XHRcdFx0XHRyYW5nZS5jb2xsYXBzZSh0cnVlKTtcclxuXHRcdFx0XHRcdHNlbC5yZW1vdmVBbGxSYW5nZXMoKTtcclxuXHRcdFx0XHRcdHNlbC5hZGRSYW5nZShyYW5nZSk7XHJcblx0XHRcdFx0fVxyXG5cdFx0XHRcdC8vIHJlcGxhY2UgaW5zZXJ0ZWQgd2l0aCB0ZXh0XHJcblx0XHRcdFx0dGhpcy5kaXYucmVwbGFjZUNoaWxkKCB0aGlzLmRlbFBvc1RleHQsIHRoaXMuZGVsUG9zRWxlbWVudCApO1xyXG5cdFx0XHRcdHRoaXMuZGl2Lm5vcm1hbGl6ZSgpO1xyXG5cdFx0XHR9IGVsc2Uge1xyXG5cdFx0XHRcdHRoaXMuZGVsUG9zRWxlbWVudC5yZW1vdmUoKTtcclxuXHRcdFx0fVxyXG5cdFx0XHR0aGlzLmRlbFBvc0VsZW1lbnQgPSBudWxsO1xyXG5cdFx0XHR0aGlzLmRlbFBvc1RleHQgPSBudWxsO1xyXG5cclxuXHRcdFx0c2F2ZU5ld1ZhbHVlID0gKCB0aGlzLmlucHV0UkUgfHwgIXRoaXMubXVsdGlMaW5lICk7XHJcblxyXG5cdFx0fSBlbHNlIHtcclxuXHJcblx0XHRcdC8vIGN1cnNvciBhZnRlciBkZWxldGVhYmxlLCBpbnNlcnRlZCBlbGVtZW50P1xyXG5cdFx0XHQvLyBjb25zb2xlLmxvZyhzZWwsc2VsLmZvY3VzTm9kZSx0aGlzLmRpdilcclxuXHRcdFx0aWYgKCBzZWwgJiYgc2VsLmlzQ29sbGFwc2VkICYmIHNlbC5mb2N1c05vZGUgJiZcclxuXHRcdFx0XHRcdHNlbC5mb2N1c05vZGUucGFyZW50Tm9kZT09dGhpcy5kaXYgJiYgc2VsLmZvY3VzT2Zmc2V0PT09MCAmJlxyXG5cdFx0XHRcdFx0c2VsLmZvY3VzTm9kZS5wcmV2aW91c1NpYmxpbmcgJiYgc2VsLmZvY3VzTm9kZS5wcmV2aW91c1NpYmxpbmcuY2xhc3NMaXN0ICYmXHJcblx0XHRcdFx0XHRzZWwuZm9jdXNOb2RlLnByZXZpb3VzU2libGluZy5jbGFzc0xpc3QuY29udGFpbnMoJ2luc2VydGVkJyApICkge1xyXG5cdFx0XHRcdHRoaXMuZGVsUG9zVGV4dCA9IHNlbC5mb2N1c05vZGUuY2xvbmVOb2RlKHRydWUpO1xyXG5cdFx0XHRcdHRoaXMuZGVsUG9zRWxlbWVudCA9IHNlbC5mb2N1c05vZGUucHJldmlvdXNTaWJsaW5nO1xyXG5cdFx0XHR9IGVsc2Uge1xyXG5cdFx0XHRcdHRoaXMuZGVsUG9zRWxlbWVudCA9IG51bGw7XHJcblx0XHRcdFx0dGhpcy5kZWxQb3NUZXh0ID0gbnVsbDtcclxuXHRcdFx0fVxyXG5cdFx0XHQvLyAvLyBJZiB0aGUgbGFzdCBlbGVtZW50IGlzIFwiaW5zZXJ0ZWRcIiBhbmQgdGhlcmUgaXMgbm8gdGV4dCBiZWhpbmQgaXQsIHRoZSBlbGVtZW50IGlzIG5vdCBkZWxldGFibGVcclxuXHRcdFx0Ly8gLy8gYmVjYXVzZSB0aGVyZSBpcyBubyBcImlucHV0XCIgZXZlbnQgb24gYmFja3NwYWNlXHJcblx0XHRcdC8vIC8vIHBvc3NpYmxlIGZpeDogYWx3YXlzIGhhdmUgYSBcInNwYWNlXCIgYXMgbGFzdCBlbGVtZW50XHJcblx0XHRcdC8vIGVsc2UgaWYgKCBzZWwuZm9jdXNOb2RlPT10aGlzLmRpdiAmJiBzZWwuZm9jdXNPZmZzZXQ8PXRoaXMuZGl2LmNoaWxkTm9kZXMubGVuZ3RoICkge1xyXG5cdFx0XHQvLyBcdHRoaXMuZGVsUG9zVGV4dCA9IG51bGw7XHJcblx0XHRcdC8vIFx0dGhpcy5kZWxQb3NFbGVtZW50ID0gdGhpcy5kaXYuY2hpbGROb2Rlc1sgc2VsLmZvY3VzT2Zmc2V0LTEgXTtcclxuXHRcdFx0Ly8gfVxyXG5cclxuXHRcdFx0Ly8gaGFuZGxlIG11bHRpTGluZSBlLmcuIGluIGFuZHJvaWQgKG5vIGtleS1ldmVudHMsIGp1c3QgaW5wdXQgZXZlbnRzISlcclxuXHRcdFx0aWYgKCAhdGhpcy5tdWx0aUxpbmUgKSB7XHJcblx0XHRcdFx0aWYgKCB0aGlzLmRpdi50ZXh0Q29udGVudC5tYXRjaCggL1tcXG5cXHJdLyApICkge1xyXG4vLyBjb25zb2xlLmxvZyh0aGlzLmRpdi50ZXh0Q29udGVudClcclxuLy8gY29uc29sZS5sb2codGhpcy5kaXYudGV4dENvbnRlbnQubWF0Y2goIC9bXFxuXFxyXS8gKSlcclxuXHRcdFx0XHRcdHRoaXMucmVzdG9yZVZhbHVlKCk7XHJcblx0XHRcdFx0fSBlbHNlIHtcclxuXHRcdFx0XHRcdHNhdmVOZXdWYWx1ZSA9IHRydWU7XHJcblx0XHRcdFx0fVxyXG5cdFx0XHR9IGVsc2Uge1xyXG5cdFx0XHRcdC8vIEhvdEZpeCBmb3IgQ2hyb21lIChFbnRlciBiZWhpbmQgbGFzdCBjaGFyYWN0ZXIgbm90IGFsd2F5cyBwcm9jZXNzZWQpXHJcblx0XHRcdFx0Ly8gQWx3YXlzIGhhdmUgYSAnXFxuJyBhcyBsYXN0IGNoYXJhY3RlclxyXG5cdFx0XHRcdGNvbnN0IGxhc3ROb2RlID0gdGhpcy5kaXYuY2hpbGROb2Rlcy5sZW5ndGg+MCA/IHRoaXMuZGl2LmNoaWxkTm9kZXNbIHRoaXMuZGl2LmNoaWxkTm9kZXMubGVuZ3RoLTEgXSA6IG51bGw7XHJcblx0XHRcdFx0aWYgKCBsYXN0Tm9kZSAmJiBsYXN0Tm9kZS5ub2RlVHlwZT09Tm9kZS5URVhUX05PREUgJiYgIWxhc3ROb2RlLnRleHRDb250ZW50LmVuZHNXaXRoKFwiXFxuXCIpICkge1xyXG5cdFx0XHRcdFx0Y29uc3QgcG9zID0gKCBzZWwgJiYgc2VsLmZvY3VzTm9kZT09bGFzdE5vZGUgPyBzZWwuZm9jdXNPZmZzZXQgOiBudWxsICk7XHJcblx0XHRcdFx0XHRsYXN0Tm9kZS50ZXh0Q29udGVudCA9IGxhc3ROb2RlLnRleHRDb250ZW50K1wiXFxuXCI7XHJcblx0XHRcdFx0XHRpZiAoIHBvcyE9PW51bGwgKSB7XHJcblx0XHRcdFx0XHRcdHRoaXMuc2V0Q3VyUG9zKCBsYXN0Tm9kZSwgcG9zICk7XHJcblx0XHRcdFx0XHR9XHJcblx0XHRcdFx0fVxyXG5cdFx0XHR9XHJcblxyXG5cdFx0XHQvLyBoYW5kZWwgc3RyaXBUYWdzXHJcblx0XHRcdGlmICggdGhpcy5zdHJpcFRhZ3MgKSB7XHJcblx0XHRcdFx0aWYgKCB0aGlzLmRpdi5pbm5lckhUTUwubWF0Y2goIC88W14+XSo+LyApICkge1xyXG5cdFx0XHRcdFx0dGhpcy5kaXYuaW5uZXJIVE1MID0gdGhpcy5kaXYuaW5uZXJIVE1MLnJlcGxhY2UoIC88W14+XSo+L2csICcnICk7XHJcblx0XHRcdFx0fVxyXG5cdFx0XHR9IGVsc2Uge1xyXG5cdFx0XHRcdC8vIGRlbGV0ZSBhbGwgZGl2Om5vdCguaW5zZXJ0ZWQpXHJcblx0XHRcdFx0Ly8gVEhJUyBTSE9VTEQgTkVWRVIgSEFQUEVOLCBidXQgaXQgc2hvdWxkIGJlIGNvcnJlY3RlZFxyXG5cdFx0XHRcdGxldCBub2RlID0gdGhpcy5kaXYuY2hpbGROb2Rlc1swXTtcclxuXHRcdFx0XHR3aGlsZSAoIG5vZGUgKSB7XHJcblx0XHRcdFx0XHRjb25zdCBlbCA9IG5vZGU7XHJcblx0XHRcdFx0XHRub2RlID0gbm9kZS5uZXh0U2libGluZztcclxuXHRcdFx0XHRcdGlmICggZWwudGFnTmFtZT09J0RJVicgJiYgZWwuY2xhc3NMaXN0ICYmICFlbC5jbGFzc0xpc3QuY29udGFpbnMoJ2luc2VydGVkJykgKSB7XHJcblx0XHRcdFx0XHRcdC8vIGNvbnZlcnQgdGV4dGNvbnRlbnQgdG8gdGV4dG5vZGVcclxuXHRcdFx0XHRcdFx0Y29uc3QgdGV4dCA9IGVsLnRleHRDb250ZW50O1xyXG5cdFx0XHRcdFx0XHRpZiAoIHRleHQubGVuZ3RoICkge1xyXG5cdFx0XHRcdFx0XHRcdGNvbnN0IHRub2RlID0gZG9jdW1lbnQuY3JlYXRlVGV4dE5vZGUoJycpO1xyXG5cdFx0XHRcdFx0XHRcdHRub2RlLnRleHRDb250ZW50ID0gdGV4dDtcclxuXHRcdFx0XHRcdFx0XHR0aGlzLmRpdi5yZXBsYWNlQ2hpbGQoIHRub2RlLCBlbCApO1xyXG5cdFx0XHRcdFx0XHRcdHRoaXMuZGl2Lm5vcm1hbGl6ZSgpO1xyXG5cdFx0XHRcdFx0XHR9IGVsc2Uge1xyXG5cdFx0XHRcdFx0XHRcdGVsLnJlbW92ZSgpO1xyXG5cdFx0XHRcdFx0XHR9XHJcblx0XHRcdFx0XHR9XHJcblx0XHRcdFx0fVxyXG5cdFx0XHRcdC8vIGRlbGV0ZSBzb2xlbHkgPGJyPlxyXG5cdFx0XHRcdGlmICggdGhpcy5kaXYuaW5uZXJIVE1MLnRyaW0oKSA9PT0gJzxicj4nICkge1xyXG5cdFx0XHRcdFx0dGhpcy5kaXYuaW5uZXJIVE1MID0gJyc7XHJcblx0XHRcdFx0XHR0aGlzLmRpdi50ZXh0Q29udGVudCA9IFwiXFxuXCI7XHJcblx0XHRcdFx0fVxyXG5cdFx0XHR9XHJcblxyXG5cdFx0XHQvLyBoYW5kbGUgaW5wdXRSZWdleHBcclxuXHRcdFx0aWYgKCB0aGlzLmlucHV0UkUgfHwgdGhpcy5tYXhsZW5ndGggKSB7XHJcbi8vIGNvbnNvbGUubG9nKHRoaXMuZGl2LmlubmVySFRNTCk7XHJcbi8vIGNvbnNvbGUubG9nKHRoaXMuZGl2LmlubmVySFRNTC5tYXRjaCggdGhpcy5pbnB1dFJFICkpO1xyXG5cdFx0XHRcdGlmICggXHQoIHRoaXMuaW5wdXRSRSAmJiAhdGhpcy5kaXYuaW5uZXJIVE1MLm1hdGNoKCB0aGlzLmlucHV0UkUgKSApIHx8XHJcblx0XHRcdFx0XHRcdCggdGhpcy5tYXhsZW5ndGggJiYgdGhpcy5kaXYuaW5uZXJIVE1MLmxlbmd0aD50aGlzLm1heGxlbmd0aCApICkge1xyXG5cdFx0XHRcdFx0dGhpcy5yZXN0b3JlVmFsdWUoKTtcclxuXHRcdFx0XHRcdGlmICggdGhpcy5iYXNlICkge1xyXG5cdFx0XHRcdFx0XHR0aGlzLmJhc2UucG9zdExvZyggJ2lucHV0UmV2ZXJ0Jywge1xyXG5cdFx0XHRcdFx0XHRcdHRvVGV4dDogdGhpcy5kaXYuaW5uZXJIVE1MLFxyXG5cdFx0XHRcdFx0XHRcdGV4dHJhY3Q6IHRoaXMuZXh0cmFjdCgpLFxyXG5cdFx0XHRcdFx0XHR9ICk7XHJcblx0XHRcdFx0XHRcdHRoaXMuYmFzZS50cmlnZ2VySW5wdXRWYWxpZGF0aW9uRXZlbnQoKTtcclxuXHRcdFx0XHRcdH1cclxuXHRcdFx0XHR9IGVsc2Uge1xyXG5cdFx0XHRcdFx0c2F2ZU5ld1ZhbHVlID0gdHJ1ZTtcclxuXHRcdFx0XHR9XHJcblx0XHRcdH1cclxuXHRcdH1cclxuXHJcblx0XHRpZiAoIHNhdmVOZXdWYWx1ZSApIHtcclxuXHRcdFx0dGhpcy5zYXZlVmFsdWUoKTtcclxuXHRcdH1cclxuXHRcdGlmICggc2F2ZU5ld1ZhbHVlIHx8ICF0aGlzLmlucHV0UkUgfHwgdGhpcy5tdWx0aUxpbmUgKSB7XHJcblx0XHRcdHRoaXMuYmFzZS5wb3N0TG9nKCAnbmV3VmFsdWUnLCB7XHJcblx0XHRcdFx0ZXh0cmFjdDogdGhpcy5leHRyYWN0KCksXHJcblx0XHRcdH0pO1xyXG5cdFx0fVxyXG5cdFx0aWYgKCB0aGlzLmJhc2UgKSB7XHJcblx0XHRcdHRoaXMuYmFzZS5zZW5kQ2hhbmdlU3RhdGUoIHRoaXMgKTtcclxuXHRcdH1cclxuXHR9XHJcblxyXG5cdC8vIC8vIG9uIHRvdWNoYWJsZXM6IGxhc3QgZWxlbWVudCBzaG91bGQgbm90IGJlICcuaW5zZXJ0ZWQnIChhcHBlbmQgdGV4dG5vZGUgd2l0aCAnICcpXHJcblx0Ly8gZXZfdG91Y2hlbmQgKCkge1xyXG5cclxuXHQvLyBcdGNvbnN0IHNlbCA9IHdpbmRvdy5nZXRTZWxlY3Rpb24oKTtcclxuXHQvLyBcdC8vIEN1cnNvciBhdCBcImVuZFwiIG9mIHRleHRcclxuXHQvLyBcdGlmICggc2VsICYmIHNlbC5pc0NvbGxhcHNlZCAmJiBzZWwuZm9jdXNOb2RlPT10aGlzLmRpdiApIHtcclxuXHQvLyBcdFx0Y29uc3QgY2hpbGRuID0gdGhpcy5kaXYuY2hpbGROb2RlcztcclxuXHQvLyBcdFx0Ly8gYW5kIGxhc3Qgbm9kZSA9PSAnLmluc2VydGVkJ1xyXG5cdC8vIFx0XHRpZiAoIHNlbC5mb2N1c09mZnNldD09Y2hpbGRuLmxlbmd0aCAmJiBjaGlsZG5bY2hpbGRuLmxlbmd0aC0xXS5jbGFzc0xpc3QgJiZcclxuXHQvLyBcdFx0XHRcdGNoaWxkbltjaGlsZG4ubGVuZ3RoLTFdLmNsYXNzTGlzdC5jb250YWlucygnaW5zZXJ0ZWQnKSApIHtcclxuXHJcblx0Ly8gXHRcdFx0Y29uc3QgdGV4dCA9IGRvY3VtZW50LmNyZWF0ZVRleHROb2RlKCcgJylcclxuXHQvLyBcdFx0XHR0aGlzLmRpdi5hcHBlbmRDaGlsZCggdGV4dCApO1xyXG5cdC8vIFx0XHRcdC8vIHNldCBjdXJzb3IgdG8gc3RhcnQgb2YgdGV4dCAnICdcdCEhISEhIFRPRE8gISEhISFcclxuXHQvLyBcdFx0XHQvLyBpZiAoIHNlbC5nZXRSYW5nZUF0ICYmIHNlbC5yYW5nZUNvdW50ICkge1xyXG5cdC8vIFx0XHRcdC8vIFx0Y29uc3QgcmFuZ2UgPSBzZWwuZ2V0UmFuZ2VBdCgwKS5jbG9uZVJhbmdlKCk7XHJcblx0Ly8gXHRcdFx0Ly8gY29uc3QgcmFuZ2UgPSBkb2N1bWVudC5jcmVhdGVSYW5nZSgpO1xyXG5cdC8vIFx0XHRcdC8vIHJhbmdlLnNldFN0YXJ0KCB0ZXh0LCAwICk7XHJcblx0Ly8gXHRcdFx0Ly8gcmFuZ2UuY29sbGFwc2UodHJ1ZSk7XHJcblx0Ly8gXHRcdFx0Ly8gc2VsLnJlbW92ZUFsbFJhbmdlcygpO1xyXG5cdC8vIFx0XHRcdC8vIHNlbC5hZGRSYW5nZShyYW5nZSk7XHJcblx0Ly8gXHRcdFx0Ly8gfVxyXG5cdC8vIFx0XHR9XHJcblx0Ly8gXHR9XHJcblx0Ly8gfVxyXG5cclxuXHQvLyBjaGVja05vZGVzICgpIHtcclxuXHJcblx0Ly8gXHR0aGlzLmRpdi5ub3JtYWxpemUoKTtcclxuXHJcblx0Ly8gXHQvLyBlbnN1cmUgbGFzdCBlbGVtZW50IGlzIHRleHRub2RlIChob3RmaXggZm9yIHBvc2l0aW9uaW5nIGN1cnNvciBhZnRlciBsYXN0IC5mcmFjKVxyXG5cdC8vIFx0Ly8gY29uc3Qgbm9kZXMgPSB0aGlzLmRpdi5jaGlsZE5vZGVzO1xyXG5cdC8vIFx0Ly8gaWYgKCAhbm9kZXMubGVuZ3RoIHx8IG5vZGVzW25vZGVzLmxlbmd0aC0xXS5ub2RlVHlwZSE9Tm9kZS5URVhUX05PREUgKSB7XHJcblx0Ly8gXHQvLyBcdHRoaXMuZGl2LmFwcGVuZENoaWxkKCBkb2N1bWVudC5jcmVhdGVUZXh0Tm9kZSgnICcpICk7XHJcblx0Ly8gXHQvLyB9XHJcblx0Ly8gfVxyXG5cclxuXHQvLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vL1xyXG5cclxuXHQvLyBodHRwczovL3N0YWNrb3ZlcmZsb3cuY29tL3F1ZXN0aW9ucy82NjkwNzUyL2luc2VydC1odG1sLWF0LWNhcmV0LWluLWEtY29udGVudGVkaXRhYmxlLWRpdlxyXG5cdHBhc3RlSHRtbEF0Q2FyZXQgKCBodG1sLCBpbnNlcnRTcGFjZXMsIGxvZ05hbWUgKSB7XHJcblxyXG5cdFx0Y29uc3Qgc2VsID0gd2luZG93LmdldFNlbGVjdGlvbigpO1xyXG5cdFx0Ly8gb25seSBpbnNlcnQgaWYgc2VsZWN0aW9uIGlzIHdpdGhpbiB0aGlzLmRpdlxyXG5cdFx0aWYgKCAhc2VsIHx8ICFzZWwuZm9jdXNOb2RlIHx8ICF0aGlzLmRpdi5jb250YWlucyggc2VsLmZvY3VzTm9kZSApICkge1xyXG5cdFx0XHRyZXR1cm4gZmFsc2U7XHJcblx0XHR9XHJcblxyXG5cdFx0aWYgKHNlbC5nZXRSYW5nZUF0ICYmIHNlbC5yYW5nZUNvdW50KSB7XHJcblx0XHRcdGxldCByYW5nZSA9IHNlbC5nZXRSYW5nZUF0KDApO1xyXG5cdFx0XHRyYW5nZS5kZWxldGVDb250ZW50cygpO1xyXG5cclxuXHRcdFx0Ly8gUmFuZ2UuY3JlYXRlQ29udGV4dHVhbEZyYWdtZW50KCkgd291bGQgYmUgdXNlZnVsIGhlcmUgYnV0IGlzXHJcblx0XHRcdC8vIG9ubHkgcmVsYXRpdmVseSByZWNlbnRseSBzdGFuZGFyZGl6ZWQgYW5kIGlzIG5vdCBzdXBwb3J0ZWQgaW5cclxuXHRcdFx0Ly8gc29tZSBicm93c2VycyAoSUU5LCBmb3Igb25lKVxyXG5cdFx0XHRsZXQgaW5zO1xyXG5cdFx0XHRpZiAoIGluc2VydFNwYWNlcyApIHtcclxuXHRcdFx0XHRjb25zdCBwcmVTcGFjZSA9ICggIXNlbC5mb2N1c09mZnNldCB8fCBzZWwuZm9jdXNOb2RlLnRleHRDb250ZW50WyBzZWwuZm9jdXNPZmZzZXQtMSBdIT0nICcgKSA/ICcgJyA6ICcnO1xyXG5cdFx0XHRcdGlucyA9IGAke3ByZVNwYWNlfSR7aHRtbH0gYDtcclxuXHRcdFx0fSBlbHNlIHtcclxuXHRcdFx0XHRpbnMgPSBodG1sO1xyXG5cdFx0XHR9XHJcblx0XHRcdGNvbnN0IGVsID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcImRpdlwiKTtcclxuXHRcdFx0ZWwuaW5uZXJIVE1MID0gaW5zO1xyXG5cclxuXHRcdFx0dmFyIGZyYWcgPSBkb2N1bWVudC5jcmVhdGVEb2N1bWVudEZyYWdtZW50KCksIG5vZGUsIGxhc3ROb2RlO1xyXG5cdFx0XHR3aGlsZSAoIChub2RlID0gZWwuZmlyc3RDaGlsZCkgKSB7XHJcblx0XHRcdFx0aWYgKCBub2RlLmNsYXNzTGlzdCApIHtcclxuXHRcdFx0XHRcdG5vZGUuY2xhc3NMaXN0LmFkZCgnaW5zZXJ0ZWQnKTtcclxuXHRcdFx0XHR9XHJcblx0XHRcdFx0bGFzdE5vZGUgPSBmcmFnLmFwcGVuZENoaWxkKG5vZGUpO1xyXG5cdFx0XHR9XHJcblx0XHRcdGNvbnN0IHN0YXJ0Q3VyUG9zID0gZnJhZy5xdWVyeVNlbGVjdG9yKCcuc3RhcnRDdXJzb3JQb3MnKTtcclxuXHRcdFx0cmFuZ2UuaW5zZXJ0Tm9kZShmcmFnKTtcclxuXHJcblx0XHRcdC8vIFByZXNlcnZlIHRoZSBzZWxlY3Rpb25cclxuXHRcdFx0aWYgKGxhc3ROb2RlKSB7XHJcblx0XHRcdFx0cmFuZ2UgPSByYW5nZS5jbG9uZVJhbmdlKCk7XHJcblx0XHRcdFx0c3RhcnRDdXJQb3MgPyByYW5nZS5zZXRTdGFydCggc3RhcnRDdXJQb3MsIDAgKSA6IHJhbmdlLnNldFN0YXJ0QWZ0ZXIobGFzdE5vZGUpO1xyXG5cdFx0XHRcdHJhbmdlLmNvbGxhcHNlKHRydWUpO1xyXG5cdFx0XHRcdHNlbC5yZW1vdmVBbGxSYW5nZXMoKTtcclxuXHRcdFx0XHRzZWwuYWRkUmFuZ2UocmFuZ2UpO1xyXG5cdFx0XHR9XHJcblxyXG5cdFx0XHR0aGlzLm5vcm1hbGl6ZSgpO1xyXG5cclxuXHRcdFx0Ly8gbG9nIGJ1dHRvblxyXG5cdFx0XHRpZiAoIGxvZ05hbWUgJiYgdGhpcy5iYXNlICkge1xyXG5cdFx0XHRcdGNvbnN0IGRhdGEgPSB7XHJcblx0XHRcdFx0XHR0ZXh0OiBpbnMsXHJcblx0XHRcdFx0XHRuYW1lOiBsb2dOYW1lLFxyXG5cdFx0XHRcdFx0ZXh0cmFjdDogdGhpcy5leHRyYWN0KCksXHJcblx0XHRcdFx0fTtcclxuXHRcdFx0XHR0aGlzLmJhc2UucG9zdExvZyggJ2luc2VydEJ1dHRvblByZXNzZWQnLCBPYmplY3QuYXNzaWduKCBkYXRhLCB0aGlzLmdldFRleHRQb3MoKSApICk7XHJcblx0XHRcdH1cclxuXHRcdH1cclxuXHJcblx0XHRyZXR1cm4gdHJ1ZTtcclxuXHR9XHJcblxyXG5cdGRlbElmRGl2ICggb2ZmcywgZXZlbnQgKSB7XHJcblxyXG5cdFx0Y29uc3Qgc2VsID0gd2luZG93LmdldFNlbGVjdGlvbigpO1xyXG5cdFx0aWYgKCBzZWwgJiYgc2VsLmlzQ29sbGFwc2VkICkge1xyXG5cdFx0XHRjb25zdCBmb2N1cyA9IHNlbC5mb2N1c05vZGU7XHJcbi8vIGNvbnNvbGUubG9nKHNlbCxvZmZzLGZvY3VzPT10aGlzLmRpdix0aGlzLmRpdi5jaGlsZE5vZGVzLmxlbmd0aCx0aGlzLmRpdi5jaGlsZE5vZGVzKTtcclxuXHRcdFx0Ly8gZGVsZXRlIHByZXZpb3VzL25leHQgbm9kZT9cclxuXHRcdFx0aWYgKCBmb2N1cyAmJlxyXG5cdFx0XHRcdFx0KCBvZmZzPjAgJiYgc2VsLmZvY3VzT2Zmc2V0PT1mb2N1cy50ZXh0Q29udGVudC5sZW5ndGggfHxcclxuXHRcdFx0XHRcdG9mZnM8MCAmJiAoICFzZWwuZm9jdXNPZmZzZXQgfHxcdC8vIEJlZ2lubmluZyBvZiBhIFRleHQgb3JcclxuXHRcdFx0XHRcdFx0XHRcdGZvY3VzPT10aGlzLmRpdiAmJiBzZWwuZm9jdXNPZmZzZXQ8PXRoaXMuZGl2LmNoaWxkTm9kZXMubGVuZ3RoICkgKSApIHsgLy8gbm9kZS1sZXZlbCwgZm9jdXNPZmZzZXQgaXMgbm9kZS1pbmRleFxyXG5cclxuXHRcdFx0XHRjb25zdCB0b0RlbGV0ZSA9ICggZm9jdXM9PXRoaXMuZGl2ID9cclxuXHRcdFx0XHRcdFx0XHRcdFx0dGhpcy5kaXYuY2hpbGROb2Rlc1sgc2VsLmZvY3VzT2Zmc2V0LTEgXSA6XHJcblx0XHRcdFx0XHRcdFx0XHRcdCggb2ZmczwwID8gZm9jdXMucHJldmlvdXNTaWJsaW5nIDogZm9jdXMubmV4dFNpYmxpbmcgKSApO1xyXG4vLyBjb25zb2xlLmxvZyh0b0RlbGV0ZSlcclxuXHRcdFx0XHQvLyBjaGVjayBpZiBub2RlIGlzIGRpdi5pbnNlcnRlZFxyXG5cdFx0XHRcdGlmICggdG9EZWxldGUgJiYgdG9EZWxldGUudGFnTmFtZT09J0RJVicgJiYgdG9EZWxldGUuY2xhc3NMaXN0LmNvbnRhaW5zKCdpbnNlcnRlZCcpICkge1xyXG5cdFx0XHRcdFx0Ly8gc2V0IGN1cnNvciBiZWZvcmUgZWxlbWVudCAoZml4IGZvciBzYWZhcmkpXHJcblx0XHRcdFx0XHRjb25zdCByYW5nZSA9IHNlbC5nZXRSYW5nZUF0KDApO1xyXG5cdFx0XHRcdFx0aWYgKCByYW5nZSApIHtcclxuXHRcdFx0XHRcdFx0aWYgKCB0b0RlbGV0ZS5wcmV2aW91c1NpYmxpbmcgKSB7XHJcblx0XHRcdFx0XHRcdFx0cmFuZ2Uuc2V0U3RhcnRBZnRlciggdG9EZWxldGUucHJldmlvdXNTaWJsaW5nICk7XHJcblx0XHRcdFx0XHRcdH0gZWxzZSBpZiAoIHRvRGVsZXRlLm5leHRTaWJsaW5nICkge1xyXG5cdFx0XHRcdFx0XHRcdHJhbmdlLnNldFN0YXJ0KCB0b0RlbGV0ZS5uZXh0U2libGluZywgMCApO1xyXG5cdFx0XHRcdFx0XHR9XHJcblx0XHRcdFx0XHRcdHJhbmdlLmNvbGxhcHNlKHRydWUpO1xyXG5cdFx0XHRcdFx0XHRzZWwucmVtb3ZlQWxsUmFuZ2VzKCk7XHJcblx0XHRcdFx0XHRcdHNlbC5hZGRSYW5nZShyYW5nZSk7XHJcblx0XHRcdFx0XHR9XHJcblx0XHRcdFx0XHQvLyBkZWxldGUgbm9kZVxyXG5cdFx0XHRcdFx0dG9EZWxldGUucmVtb3ZlKCk7XHJcblx0XHRcdFx0XHR0aGlzLmRpdi5ub3JtYWxpemUoKTtcclxuXHJcblx0XHRcdFx0XHRldmVudC5wcmV2ZW50RGVmYXVsdCgpO1xyXG5cdFx0XHRcdFx0ZXZlbnQuc3RvcFByb3BhZ2F0aW9uKCk7XHJcblx0XHRcdFx0XHRyZXR1cm4gdHJ1ZTtcclxuXHRcdFx0XHR9XHJcblx0XHRcdH1cclxuXHRcdH1cclxuXHJcblx0XHRyZXR1cm4gZmFsc2U7XHJcblx0fVxyXG5cclxuXHQvLyBpcyBjdXJzb3Igd2l0aGluIC5pbnB1dGZpZWxkPyB0YWIgdG8gbmV4dFNpYmxpbmdcclxuXHR0YWJUb05leHRJbnB1dEZpZWxkIChldmVudCkge1xyXG5cclxuXHRcdGNvbnN0IHNlbCA9IHdpbmRvdy5nZXRTZWxlY3Rpb24oKTtcclxuXHRcdGlmICggc2VsICYmIHNlbC5pc0NvbGxhcHNlZCAmJiBzZWwuZm9jdXNOb2RlICYmIHNlbC5nZXRSYW5nZUF0ICYmIHNlbC5yYW5nZUNvdW50ICkge1xyXG5cclxuXHRcdFx0Ly8gaW4gLmlucHV0ZmllbGQ/XHJcblx0XHRcdGxldCBub2RlO1xyXG5cdFx0XHRmb3IgKCBub2RlPXNlbC5mb2N1c05vZGU7IG5vZGUgJiYgIW5vZGUuY2xhc3NMaXN0OyApIHtcclxuXHRcdFx0XHRub2RlID0gbm9kZS5wYXJlbnROb2RlO1xyXG5cdFx0XHR9XHJcblx0XHRcdGlmICggbm9kZSAmJiBub2RlLmNsYXNzTGlzdC5jb250YWlucygnaW5wdXRGaWVsZCcpICkge1xyXG5cclxuXHRcdFx0XHQvLyBzZWFyY2ggbmV4dCBhdmFpbGFibGUgc2libGluZ1xyXG5cdFx0XHRcdHdoaWxlICggbm9kZSAmJiAhbm9kZS5uZXh0U2libGluZyAmJiBub2RlIT10aGlzLmRpdiApIHtcclxuXHRcdFx0XHRcdG5vZGUgPSBub2RlLnBhcmVudE5vZGU7XHJcblx0XHRcdFx0fVxyXG5cdFx0XHRcdGlmICggbm9kZSAmJiBub2RlIT10aGlzLmRpdiApIHtcclxuXHRcdFx0XHRcdG5vZGUgPSBub2RlLm5leHRTaWJsaW5nO1xyXG5cclxuXHRcdFx0XHRcdC8vIHNldCBjdXJzb3JcclxuXHRcdFx0XHRcdHRoaXMuc2V0Q3VyUG9zKCBub2RlLCBub2RlLm5vZGVUeXBlPT1Ob2RlLlRFWFRfTk9ERSAmJiBub2RlLnRleHRDb250ZW50LnN0YXJ0c1dpdGgoJyAnKSA/IDEgOiAwICk7XHJcblxyXG5cdFx0XHRcdFx0ZXZlbnQucHJldmVudERlZmF1bHQoKTtcclxuXHRcdFx0XHRcdGV2ZW50LnN0b3BQcm9wYWdhdGlvbigpO1xyXG5cdFx0XHRcdFx0cmV0dXJuIHRydWU7XHJcblx0XHRcdFx0fVxyXG5cdFx0XHR9XHJcblx0XHR9XHJcblxyXG5cdFx0cmV0dXJuIGZhbHNlO1xyXG5cdH1cclxuXHJcblx0Ly8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy9cclxuXHJcblx0c2F2ZVZhbHVlICgpIHtcclxuXHRcdHRoaXMub2xkVmFsdWUgPSB0aGlzLmRpdi5pbm5lckhUTUw7XHJcblx0XHQvLyBzYXZlIGN1cnNvciBwb3NpdGlvblxyXG5cdFx0Y29uc3Qgc2VsID0gd2luZG93LmdldFNlbGVjdGlvbigpO1xyXG5cdFx0aWYgKCBzZWwgJiYgc2VsLmZvY3VzTm9kZSApIHtcclxuXHRcdFx0Y29uc3Qgbm9kZXMgPSBBcnJheS5mcm9tKCB0aGlzLmRpdi5jaGlsZE5vZGVzICk7XHJcblx0XHRcdHRoaXMub2xkRm9jdXNFbGVtSW5kZXggPSBub2Rlcy5maW5kSW5kZXgoIGkgPT4gaT09PXNlbC5mb2N1c05vZGUgKTtcclxuXHRcdFx0dGhpcy5vbGRGb2N1c09mZnNldCA9IHNlbC5mb2N1c09mZnNldDtcclxuXHRcdH0gZWxzZSB7XHJcblx0XHRcdHRoaXMub2xkRm9jdXNFbGVtSW5kZXggPSBudWxsO1xyXG5cdFx0fVxyXG5cdH1cclxuXHJcblx0cmVzdG9yZVZhbHVlICgpIHtcclxuXHRcdGlmICggdGhpcy5vbGRWYWx1ZSE9PW51bGwgKSB7XHJcblx0XHRcdHRoaXMuZGl2LmlubmVySFRNTCA9IHRoaXMub2xkVmFsdWU7XHJcblx0XHRcdC8vIHJlc3RvcmUgb2xkIGN1cnNvciBwb3NpdGlvblxyXG5cdFx0XHRjb25zdCBzZWwgPSB3aW5kb3cuZ2V0U2VsZWN0aW9uKCk7XHJcblx0XHRcdGlmICggc2VsICkge1xyXG5cdFx0XHRcdHNlbC5yZW1vdmVBbGxSYW5nZXMoKTtcclxuXHRcdFx0XHRpZiAoIHRoaXMub2xkRm9jdXNFbGVtSW5kZXghPT1udWxsICYmIHRoaXMub2xkRm9jdXNFbGVtSW5kZXg+LTEgKSB7XHJcblx0XHRcdFx0XHR0aGlzLnNldEN1clBvcyggdGhpcy5kaXYuY2hpbGROb2Rlc1sgdGhpcy5vbGRGb2N1c0VsZW1JbmRleCBdLCB0aGlzLm9sZEZvY3VzT2Zmc2V0ICk7XHJcblx0XHRcdFx0fVxyXG5cdFx0XHR9XHJcblx0XHR9XHJcblx0fVxyXG5cclxuXHRzZXRDdXJQb3MgKCBub2RlLCBvZmZzZXQgKSB7XHJcblx0XHRjb25zdCBzZWwgPSB3aW5kb3cuZ2V0U2VsZWN0aW9uKCk7XHJcblx0XHRpZiAoIHNlbCApIHtcclxuXHRcdFx0Y29uc3QgcmFuZ2UgPSBkb2N1bWVudC5jcmVhdGVSYW5nZSgpO1xyXG5cdFx0XHRyYW5nZS5zZXRTdGFydCggbm9kZSwgb2Zmc2V0ICk7XHJcblx0XHRcdHJhbmdlLmNvbGxhcHNlKCB0cnVlICk7XHJcblxyXG5cdFx0XHRzZWwucmVtb3ZlQWxsUmFuZ2VzKCk7XHJcblx0XHRcdHNlbC5hZGRSYW5nZShyYW5nZSk7XHJcblx0XHR9XHJcblx0fVxyXG5cclxuXHQvLyBjYWxsIHRoaXMuZGl2Lm5vcm1hbGl6ZSgpIGFuZCB0cnkgdG8gc2F2ZS9yZXN0b3JlIGN1cnNvciBwb3NpdGlvblxyXG5cdG5vcm1hbGl6ZSAoKSB7XHJcblxyXG5cdFx0Ly8gdHJ5IHRvIHNhdmUgY3Vyc29yIHBvc2l0aW9uIGluIHRleHRub2RlKHMpXHJcblx0XHRsZXQgY3VyUG9zID0gbnVsbCwgcHJldkVsbWVudCwgcGFyZW50RWxtZW50O1xyXG5cdFx0Y29uc3Qgc2VsID0gd2luZG93LmdldFNlbGVjdGlvbigpO1xyXG5cdFx0aWYgKCBzZWwgJiYgc2VsLnJhbmdlQ291bnQ9PTEgKSB7XHJcblx0XHRcdGxldCBmb2N1cyA9IHNlbC5mb2N1c05vZGU7XHJcblx0XHRcdGxldCBmb2N1c09mZnNldCA9IHNlbC5mb2N1c09mZnNldDtcclxuXHRcdFx0aWYgKCBmb2N1cyApIHtcclxuXHRcdFx0XHRpZiAoIGZvY3VzLm5vZGVUeXBlPT1Ob2RlLkVMRU1FTlRfTk9ERSAmJiBmb2N1c09mZnNldD4wICkge1xyXG5cdFx0XHRcdFx0Ly8gSWYgZm9jdXNOb2RlIGlzIGFuIGVsZW1lbnQsIGZvY3VzT2Zmc2V0IGlzIHRoZSBudW1iZXIgb2YgY2hpbGQgbm9kZXMgb2YgdGhlXHJcblx0XHRcdFx0XHQvLyBmb2N1c05vZGUgcHJlY2VkaW5nIHRoZSBmb2N1c1xyXG5cdFx0XHRcdFx0Zm9jdXMgPSBmb2N1cy5jaGlsZE5vZGVzWyBmb2N1c09mZnNldCBdO1xyXG5cdFx0XHRcdFx0Zm9jdXNPZmZzZXQgPSAwO1xyXG5cdFx0XHRcdH1cclxuXHRcdFx0XHRpZiAoIGZvY3VzLm5vZGVUeXBlPT1Ob2RlLlRFWFRfTk9ERSAmJlxyXG5cdFx0XHRcdFx0XHQoICggZm9jdXMucHJldmlvdXNTaWJsaW5nICYmIGZvY3VzLnByZXZpb3VzU2libGluZy5ub2RlVHlwZT09Tm9kZS5URVhUX05PREUgKSB8fFxyXG5cdFx0XHRcdFx0XHRcdCggZm9jdXMubmV4dFNpYmxpbmcgJiYgZm9jdXMubmV4dFNpYmxpbmcubm9kZVR5cGU9PU5vZGUuVEVYVF9OT0RFICkgKSApIHtcclxuXHRcdFx0XHRcdC8vIGN1cnNvciBpcyBwYXJ0IG9mIHNldmVyYWwgY29uc2VjdXRpdmUgdGV4dCBlbGVtZW50cyB0aGF0IGFyZSBjb21iaW5lZCBieSBub21hbGl6ZSgpXHJcblx0XHRcdFx0XHQvLyAtPiBzYXZlIHBvc2l0aW9uIGluIHRleHQgJiBwcmV2aW91c1NpYmxpbmcvcGFyZW50RWxlbWVudFxyXG5cclxuXHRcdFx0XHRcdGN1clBvcyA9IGZvY3VzT2Zmc2V0O1xyXG5cdFx0XHRcdFx0cGFyZW50RWxtZW50ID0gZm9jdXMucGFyZW50RWxlbWVudDtcclxuXHJcblx0XHRcdFx0XHQvLyBBZGQgbGVuZ3RoIG9mIGFsbCBwcmV2aW91cyB0ZXh0IGVsZW1lbnRzIHRvIHBvc2l0aW9uXHJcblx0XHRcdFx0XHR3aGlsZSAoIGZvY3VzLnByZXZpb3VzU2libGluZyAmJiBmb2N1cy5wcmV2aW91c1NpYmxpbmcubm9kZVR5cGU9PU5vZGUuVEVYVF9OT0RFICkge1xyXG5cdFx0XHRcdFx0XHRmb2N1cyA9IGZvY3VzLnByZXZpb3VzU2libGluZztcclxuXHRcdFx0XHRcdFx0Y3VyUG9zICs9IGZvY3VzLnRleHRDb250ZW50Lmxlbmd0aDtcclxuXHRcdFx0XHRcdH1cclxuXHRcdFx0XHRcdHByZXZFbG1lbnQgPSBmb2N1cy5wcmV2aW91c1NpYmxpbmc7XHJcblx0XHRcdFx0fVxyXG5cdFx0XHR9XHJcblx0XHR9XHJcblxyXG5cdFx0dGhpcy5kaXYubm9ybWFsaXplKCk7XHJcblxyXG5cdFx0Ly8gcmVzdG9yZSBwb3NpdGlvbiBpbiAoY29uY2F0ZW5hdGVkKSB0ZXh0XHJcblx0XHRpZiAoIGN1clBvcyE9PW51bGwgKSB7XHJcblx0XHRcdGNvbnN0IG5ld0VsZW0gPSBwcmV2RWxtZW50ID8gcHJldkVsbWVudC5uZXh0U2libGluZyA6IHBhcmVudEVsbWVudC5maXJzdENoaWxkO1xyXG5cdFx0XHRjb25zdCBuZXdSYW5nZSA9IGRvY3VtZW50LmNyZWF0ZVJhbmdlKCk7XHJcblx0XHRcdG5ld1JhbmdlLnNldFN0YXJ0KCBuZXdFbGVtLCBjdXJQb3MgKTtcclxuXHRcdFx0bmV3UmFuZ2UuY29sbGFwc2UoIHRydWUgKTtcclxuXHRcdFx0c2VsLnJlbW92ZUFsbFJhbmdlcygpO1xyXG5cdFx0XHRzZWwuYWRkUmFuZ2UobmV3UmFuZ2UpO1xyXG5cdFx0fVxyXG5cdH1cclxuXHJcblx0Ly8gR2V0IFBvc2l0aW9uIChpbiB0aGlzLmRpdi50ZXh0Q29udGVudCkgYW5kIHNwZWNpYWwgY2xhc3NlcyBzZXQgaW4gZm9jdXNub2RlXHJcblx0Z2V0VGV4dFBvcyAoc2VsPW51bGwpIHtcclxuXHRcdGlmICggc2VsPT09bnVsbCApIHtcclxuXHRcdFx0c2VsID0gd2luZG93LmdldFNlbGVjdGlvbigpO1xyXG5cdFx0fVxyXG5cdFx0aWYgKCBzZWwgJiYgc2VsLmZvY3VzTm9kZSApIHtcclxuXHRcdFx0bGV0IHBvcyA9IHNlbC5mb2N1c09mZnNldDtcclxuXHRcdFx0bGV0IG5vZGUgPSBzZWwuZm9jdXNOb2RlO1xyXG5cdFx0XHQvLyBhZGQgbGVuZ3RocyBvZiB0ZXh0Q29udGVudHMgb2YgYWxsIHBldmlvdXMgRWxlbWVudHNcclxuXHRcdFx0d2hpbGUgKCAoIG5vZGUgPSBub2RlLnByZXZpb3VzU2libGluZyB8fCBub2RlLnBhcmVudE5vZGUgKSAmJiBub2RlICE9IHRoaXMuZGl2ICYmIG5vZGUgKSB7XHJcblx0XHRcdFx0aWYgKCBub2RlLnRleHRDb250ZW50ICkge1xyXG5cdFx0XHRcdFx0cG9zICs9IG5vZGUudGV4dENvbnRlbnQubGVuZ3RoO1xyXG5cdFx0XHRcdH1cclxuXHRcdFx0fVxyXG5cdFx0XHRjb25zdCBkYXRhID0geyB0ZXh0UG9zOiBwb3MsIH07XHJcblx0XHRcdC8vIGNoZWNrIGZvciBmcmFjIGNsYXNzZXNcclxuXHRcdFx0bm9kZSA9IHNlbC5mb2N1c05vZGU7XHJcblx0XHRcdHdoaWxlICggbm9kZSAmJiBub2RlICE9IHRoaXMuZGl2ICYmICFub2RlLmNsYXNzTGlzdCApIHtcclxuXHRcdFx0XHRub2RlID0gbm9kZS5wYXJlbnROb2RlO1xyXG5cdFx0XHR9XHJcblx0XHRcdGlmICggbm9kZS5jbGFzc0xpc3QgJiYgbm9kZS5jbGFzc0xpc3QuY29udGFpbnMoJ2ZyYWMnKSApIHtcclxuXHRcdFx0XHRpZiAoIG5vZGUuY2xhc3NMaXN0LmNvbnRhaW5zKCd0b3AnKSApIGRhdGEuY2xhc3M9XCJmcmFjIHRvcFwiO1xyXG5cdFx0XHRcdGlmICggbm9kZS5jbGFzc0xpc3QuY29udGFpbnMoJ2JvdHRvbScpICkgZGF0YS5jbGFzcz1cImZyYWMgYm90dG9tXCI7XHJcblx0XHRcdH07XHJcblx0XHRcdHJldHVybiBkYXRhO1xyXG5cdFx0fVxyXG5cclxuXHRcdHJldHVybiB7fTtcclxuXHR9XHJcblxyXG5cdGV4dHJhY3QgKCkge1xyXG5cdFx0bGV0IHMgPSB0aGlzLmRpdi5pbm5lckhUTUw7XHJcblxyXG5cdFx0dGhpcy5leHRyYWN0UmVwbGFjZXMuZm9yRWFjaCggciA9PiB7XHJcblx0XHRcdHMgPSBzLnJlcGxhY2VBbGwoIHIuZnJvbSwgci50byApO1xyXG5cdFx0fSlcclxuXHJcblx0XHRyZXR1cm4gcy50cmltKCk7XHJcblx0fVxyXG5cclxuXHQvLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vL1xyXG5cclxuXHRnZXRTdGF0ZSAoKSB7XHJcblx0XHRyZXR1cm4gSlNPTi5zdHJpbmdpZnkoIHRoaXMuZGl2LmlubmVySFRNTCApO1xyXG5cdH1cclxuXHJcblx0c2V0U3RhdGUgKHN0YXRlKSB7XHJcblxyXG5cdFx0dHJ5IHtcclxuXHJcblx0XHRcdHRoaXMuZGl2LmlubmVySFRNTCA9IEpTT04ucGFyc2UoIHN0YXRlICk7XHJcblxyXG5cdFx0fSBjYXRjaCAoZSkge1xyXG5cdFx0XHRjb25zb2xlLmVycm9yKGUpO1xyXG5cdFx0fVxyXG5cclxuXHRcdHNldFN0YXRlUG9zdFByb2ModGhpcyk7XHJcblx0fVxyXG5cclxuXHRzY29yZURlZiAoKSB7XHJcblx0XHRyZXR1cm4gdGhpcy5zY29yZVZhcmlhYmxlTmFtZSB8fCB0aGlzLkZTTVZhcmlhYmxlTmFtZSA/XHJcblx0XHRcdHtcclxuXHRcdFx0XHRbIHRoaXMuc2NvcmVWYXJpYWJsZU5hbWUgfHwgYFZfSW5wdXRfJHt0aGlzLkZTTVZhcmlhYmxlTmFtZX1gIF06IHRoaXMuZXh0cmFjdCgpLFxyXG5cdFx0XHR9IDpcclxuXHRcdFx0e307XHJcblx0fVxyXG59XHJcblxyXG4vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy9cclxuXHJcbmV4cG9ydCBjbGFzcyB0ZXh0YXJlYUluc2VydHMgZXh0ZW5kcyB0ZXh0YXJlYUJhc2Uge1xyXG5cclxuXHRjb25zdHJ1Y3RvciAoIGRpdlNlbGVjdG9yLCBvcHRzID0ge30sIGJhc2UgPSBudWxsICkge1xyXG5cclxuXHRcdGlmICggYmFzZS5mc20gJiYgYmFzZS5mc20uaW5jSW5pdENudCApIHtcclxuXHRcdFx0YmFzZS5mc20uaW5jSW5pdENudCgpO1xyXG5cdFx0fVxyXG5cclxuXHRcdGNvbnN0IGluc2VydHNEZWZhdWx0cyA9IHtcclxuXHJcblx0XHRcdC8vIHRvb2xiYXJYLCB0b29sYmFyWSAgIC8vIHBvc2l0aW9uIHJlbGF0aXZlIHRvIGRpdiAodG9wLGxlZnQpXHJcblx0XHRcdHRvb2xiYXI6IFtcclxuXHRcdFx0XHQvLyB7IGRpc3BsYXk6IChodG1sKSwgKGluc2VydDogKGh0bWwpLClcclxuXHRcdFx0XHQvLyBcdFx0KHRvb2x0aXA6ICcnLCkgLFx0Ly8gc2hvd2VkIHRvb2x0aXBcclxuXHRcdFx0XHQvLyBcdFx0KGRvbnRJbnNlcnRSZWN1cnNpdmU6IHRydWV8ZmFsc2UpLFx0Ly8gY2FuIGVsZW1lbnQgYmUgaW5zZXJ0ZWQgaW5zaWRlIG90aGVyIGVsZW1lbnRzP1xyXG5cdFx0XHRcdC8vXHRcdChub0V4dHJhU3BhY2VzOiB0cnVlfGZhbHNlKSxcdC8vIGRvbnQgaW5zZXJ0IHNwYWNlcyBiZWZvcmUgYW5kIGFmdGVyIGVsZW1lbnRcclxuXHRcdFx0XHQvL1x0XHQoZXh0cmFjdFJlcGxhY2U6IHsgZnJvbTogL3JlZ2V4cC8sIHRvOiBcInRleHRcIiB9ICksXHQvLyBSZXBsYWNlIGRvbmUgYnkgZXh0cmFjdCgpXHJcblx0XHRcdFx0Ly8gfVxyXG5cdFx0XHRdLFxyXG5cdFx0XHR0b29sYmFyRGlyZWN0aW9uOiAnY29sdW1uJyxcclxuXHRcdFx0Ly8gdG9vbGJhckhpZGU6IHRydWUsXHQvLyB0b29sYmFyIGhpZGRlbiB3aGVuIG5vIGZvY3VzXHJcblxyXG5cdFx0XHR0b29sYmFyQ29udGFpbmVyU3R5bGVzOiB7XHJcblx0XHRcdFx0Ly8gbGVmdDogJzMwMHB4JywgXHQvLyBwb3NpdGlvbiByZWxhdGl2ZSB0byBvdXRlckRpdiwgZGVmYXVsdHMgdG8gd2lkdGggb2YgZGl2U3R5bGVcclxuXHRcdFx0XHQvLyB0b3A6ICcyMDBweCcsXHJcblx0XHRcdH0sXHJcblx0XHRcdHRvb2xiYXJDZWxsU3R5bGVzOiB7XHJcblx0XHRcdH0sXHJcblx0XHRcdHRvb2xiYXJDZWxsU3BhblN0eWxlczoge1x0Ly8gc3BhbnMgd2l0aGluIHRvb2xiYXItY2VsbHMgKGZvciB2ZXJ0aWNhbCBjZW50ZXJpbmcpXHJcblx0XHRcdH0sXHJcblxyXG5cdFx0fVxyXG5cdFx0bWVyZ2VEZWVwKCBpbnNlcnRzRGVmYXVsdHMsIG9wdHMgKTtcclxuXHRcdHN1cGVyKCBkaXZTZWxlY3RvciwgaW5zZXJ0c0RlZmF1bHRzLCBiYXNlICk7XHJcblxyXG5cdFx0Ly8gY3JlYXRlIHRvb2xiYXIgY29udGFpbmVyXHJcblx0XHR0aGlzLnRvb2xiYXJDb250YWluZXIgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdESVYnKTtcclxuXHRcdHRoaXMudG9vbGJhckNvbnRhaW5lci5jbGFzc0xpc3QuYWRkKCAndG9vbGJhcicsIGB0aSR7dGhpcy50b29sYmFyRGlyZWN0aW9ufWAsICdkaXNhYmxlZCcgKTtcclxuXHRcdGlmICggIXRoaXMudG9vbGJhckNvbnRhaW5lclN0eWxlcy5sZWZ0ICkge1xyXG5cdFx0XHR0aGlzLnRvb2xiYXJDb250YWluZXJTdHlsZXMubGVmdCA9IHRoaXMuZGl2U3R5bGVzLndpZHRoXHJcblx0XHR9XHJcblx0XHRpZiAoICF0aGlzLnRvb2xiYXJDb250YWluZXJTdHlsZXMudG9wICkge1xyXG5cdFx0XHR0aGlzLnRvb2xiYXJDb250YWluZXJTdHlsZXMudG9wID0gXCIwcHhcIjtcclxuXHRcdH1cclxuXHRcdHRoaXMuc2V0U3R5bGVzKCB0aGlzLnRvb2xiYXJDb250YWluZXIsIHRoaXMudG9vbGJhckNvbnRhaW5lclN0eWxlcyApO1xyXG5cdFx0Ly8gdGhpcy50b29sYmFyQ29udGFpbmVyLnNldEF0dHJpYnV0ZSggJ2NvbnRlbnRlZGl0YWJsZScsICdmYWxzZScgKTtcclxuXHJcblx0XHQvLyBjcmVhdGUgdG9vbGJhckNlbGxzXHJcblx0XHR0aGlzLnRvb2xiYXIuZm9yRWFjaCggKCB0YiwgbnIgKSA9PiB7XHJcblx0XHRcdC8vIEZMT1dpbmcgZGl2XHJcblx0XHRcdGNvbnN0IHRvb2xiYXJDZWxsID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnRElWJyk7XHJcblx0XHRcdHRoaXMuc2V0U3R5bGVzKCB0b29sYmFyQ2VsbCwgdGhpcy50b29sYmFyQ2VsbFN0eWxlcyApO1xyXG5cdFx0XHRbICdtb3VzZWRvd24nLCAndG91Y2hzdGFydCcgXS5mb3JFYWNoKCBldiA9PlxyXG5cdFx0XHRcdHRvb2xiYXJDZWxsLmFkZEV2ZW50TGlzdGVuZXIoIGV2LCBmdW5jdGlvbiAoZXZlbnQpIHtcclxuXHRcdFx0XHRcdGlmICggZG9jdW1lbnQuYWN0aXZlRWxlbWVudCAmJiAhdGhpcy50b29sYmFyQ29udGFpbmVyLmNsYXNzTGlzdC5jb250YWlucygnZGlzYWJsZWQnKSAmJiB0aGlzLmRpdi5jb250YWlucyggZG9jdW1lbnQuYWN0aXZlRWxlbWVudCApICkge1xyXG5cdFx0XHRcdFx0XHR0aGlzLmluc2VydCggbnIsIGV2ZW50ICk7XHJcblx0XHRcdFx0XHR9XHJcblx0XHRcdFx0fS5iaW5kKHRoaXMpICkgKTtcclxuXHRcdFx0Ly8gIHRvb2xiYXJDZWxsLnNldEF0dHJpYnV0ZSggJ2NvbnRlbnRlZGl0YWJsZScsICdmYWxzZScgKTtcclxuXHJcblx0XHRcdC8vIHNwYW4gaW4gZGl2IGZvciB2ZXJ0aWNhbCBhbGlnbmluZ1xyXG5cdFx0XHRjb25zdCBpbm5lclNwYW4gPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdTUEFOJyk7XHJcblx0XHRcdHRoaXMuc2V0U3R5bGVzKCBpbm5lclNwYW4sIHRoaXMudG9vbGJhckNlbGxTcGFuU3R5bGVzICk7XHJcblx0XHRcdHRvb2xiYXJDZWxsLmFwcGVuZENoaWxkKCBpbm5lclNwYW4gKTtcclxuXHJcblx0XHRcdGlubmVyU3Bhbi5pbm5lckhUTUwgPSB0Yi5kaXNwbGF5O1xyXG5cdFx0XHR0aGlzLnRvb2xiYXJDb250YWluZXIuYXBwZW5kQ2hpbGQoIHRvb2xiYXJDZWxsICk7XHJcblxyXG5cdFx0XHQvLyBjb3B5IGV4dHJhY3RSZXBsYWNlXHJcblx0XHRcdGlmICggdGIuZXh0cmFjdFJlcGxhY2UgJiYgdGIuZXh0cmFjdFJlcGxhY2UuZnJvbSAmJiB0Yi5leHRyYWN0UmVwbGFjZS50byApIHtcclxuXHRcdFx0XHR0aGlzLmV4dHJhY3RSZXBsYWNlcy5wdXNoKCB0Yi5leHRyYWN0UmVwbGFjZSApO1xyXG5cdFx0XHR9XHJcblx0XHR9KTtcclxuXHJcblx0XHQvLyBIYW5kbGUgdG9vbGJhckNvbnRhaW5lciB2aXNpYmlsaXR5XHJcblx0XHQvLyBpZiAoIHRoaXMudG9vbGJhckhpZGUgKSB7XHJcblx0XHQvLyBcdHRoaXMudG9vbGJhckNvbnRhaW5lci5zdHlsZS52aXNpYmlsaXR5ID0gdGhpcy5kaXYuYWN0aXZlRWxlbWVudCA/ICd2aXNpYmxlJyA6ICdoaWRkZW4nO1xyXG5cclxuXHRcdC8vIFx0dGhpcy5kaXYuYWRkRXZlbnRMaXN0ZW5lciggJ2ZvY3VzJywgKCkgPT4gdGhpcy50b29sYmFyQ29udGFpbmVyLnN0eWxlLnZpc2liaWxpdHkgPSAndmlzaWJsZScgKTtcclxuXHRcdC8vIFx0dGhpcy5kaXYuYWRkRXZlbnRMaXN0ZW5lciggJ2JsdXInLCAoZXYpID0+IGNvbnNvbGUubG9nKGV2KSApO1xyXG5cdFx0Ly8gfVxyXG5cdFx0dGhpcy5vdXRlckRpdi5hcHBlbmRDaGlsZCggdGhpcy50b29sYmFyQ29udGFpbmVyICk7XHJcblx0XHR0aGlzLmRpdi5hZGRFdmVudExpc3RlbmVyKCAnZm9jdXMnLFxyXG5cdFx0XHRcdCgpID0+IHRoaXMudG9vbGJhckNvbnRhaW5lci5jbGFzc0xpc3QucmVtb3ZlKCdkaXNhYmxlZCcpLFxyXG5cdFx0XHRcdHsgY2FwdHVyZTogdHJ1ZSB9ICk7XHJcblx0XHR0aGlzLmRpdi5hZGRFdmVudExpc3RlbmVyKCAnYmx1cicsXHJcblx0XHRcdFx0KCkgPT4gdGhpcy50b29sYmFyQ29udGFpbmVyLmNsYXNzTGlzdC5hZGQoJ2Rpc2FibGVkJyksXHJcblx0XHRcdFx0eyBjYXB0dXJlOiB0cnVlIH0gKTtcclxuXHJcblxyXG5cdFx0aWYgKCBiYXNlLmZzbSAmJiBiYXNlLmZzbS5kZWNJbml0Q250ICkge1xyXG5cdFx0XHRiYXNlLmZzbS5kZWNJbml0Q250KCk7XHJcblx0XHR9XHJcblx0fVxyXG5cclxuXHQvLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vL1xyXG5cclxuXHRpbnNlcnQgKCBuciwgZXZlbnQgKSB7XHJcblxyXG5cdFx0aWYgKCB0aGlzLnRvb2xiYXJbbnJdLmRvbnRJbnNlcnRSZWN1cnNpdmUgKSB7XHJcblx0XHRcdC8vIHNlYXJjaCBwYXJlbnQgXCIuaW5zZXJ0ZWRcIiAoLT4gaW5zaWRlIGFub3RoZXIgaW5zZXJ0ZWQgZWxlbWVudClcclxuXHRcdFx0Y29uc3Qgc2VsID0gd2luZG93LmdldFNlbGVjdGlvbigpO1xyXG5cdFx0XHRpZiAoIHNlbCAmJiBzZWwuZm9jdXNOb2RlICkge1xyXG5cdFx0XHRcdGxldCBwbm9kZSA9IHNlbC5mb2N1c05vZGU7XHJcblx0XHRcdFx0d2hpbGUgKCBwbm9kZSAmJiAoICFwbm9kZS5jbGFzc0xpc3QgfHwgIXBub2RlLmNsYXNzTGlzdC5jb250YWlucygndGV4dGFyZWFJbnNlcnRzJykgJiYgIXBub2RlLmNsYXNzTGlzdC5jb250YWlucygnaW5zZXJ0ZWQnKSApICkge1xyXG5cdFx0XHRcdFx0cG5vZGUgPSBwbm9kZS5wYXJlbnROb2RlO1xyXG5cdFx0XHRcdH1cclxuXHRcdFx0XHRpZiAoIHBub2RlLmNsYXNzTGlzdCAmJiBwbm9kZS5jbGFzc0xpc3QuY29udGFpbnMoJ2luc2VydGVkJykgKSB7XHJcblx0XHRcdFx0XHRyZXR1cm47XHJcblx0XHRcdFx0fVxyXG5cdFx0XHR9XHJcblx0XHR9XHJcblxyXG5cdFx0aWYgKCB0aGlzLnBhc3RlSHRtbEF0Q2FyZXQoIHRoaXMudG9vbGJhcltucl0uaW5zZXJ0IHx8IHRoaXMudG9vbGJhcltucl0uZGlzcGxheSwgIXRoaXMudG9vbGJhcltucl0ubm9FeHRyYVNwYWNlcywgdGhpcy50b29sYmFyW25yXS5sb2dOYW1lICkgKSB7XHJcblx0XHRcdHRoaXMuZXZfaW5wdXQoKTtcdC8vIGNoZWNrIHJlZ2V4cCBldGMuXHJcblx0XHRcdGV2ZW50LnByZXZlbnREZWZhdWx0KCk7XHJcblx0XHRcdGV2ZW50LnN0b3BQcm9wYWdhdGlvbigpO1xyXG5cdFx0fVxyXG5cclxuXHRcdGlmICggdGhpcy5iYXNlICkge1xyXG5cdFx0XHR0aGlzLmJhc2Uuc2VuZENoYW5nZVN0YXRlKCB0aGlzICk7XHJcblx0XHR9XHJcblx0fVxyXG5cclxufVxyXG5cclxuLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vXHJcblxyXG4vLyBleHBvcnQgc29tZSBkZWZhdWx0IHRvb2xiYXJzXHJcblxyXG5leHBvcnQgY29uc3QgdG9vbGJhck1hdGhPcGVyYXRvcnMgPSBbXHJcblx0eyBkaXNwbGF5OiBcIiZwbHVzO1wiLCBsb2dOYW1lOiBcInBsdXNcIiwgfSxcdFx0Ly8gKyBcXHUwMDJiXHJcblx0eyBkaXNwbGF5OiBcIiZtaW51cztcIiwgbG9nTmFtZTogXCJtaW51c1wiLCB9LFx0XHQvLyAtIFxcdTIyMTJcclxuXHQvLyB7IGRpc3BsYXk6IFwiJmNlbnRlcmRvdDtcIiwgfSxcdC8vICpcclxuXHR7IGRpc3BsYXk6IFwiJnNkb3Q7XCIsIGxvZ05hbWU6IFwiZG90XCIsIH0sXHRcdFx0Ly8gKiBcXHUyMmM1XHJcblx0eyBkaXNwbGF5OiBcIiZyYXRpbztcIiwgbG9nTmFtZTogXCJyYXRpb1wiLCB9LFx0XHQvLyAvIFxcdTIyMzZcclxuXHR7IGRpc3BsYXk6IFwiJmVxdWFscztcIiwgbG9nTmFtZTogXCJlcXVhbHNcIiwgfSxcdC8vID0gXFx1MDAzZFxyXG5cclxuXTtcclxuXHJcbmNvbnN0IGZyYWNfaHRtbCA9ICc8ZGl2IGNvbnRlbnRlZGl0YWJsZT1cImZhbHNlXCIgY2xhc3M9XCJmcmFjXCI+JytcclxuXHQnPHNwYW4gY29udGVudGVkaXRhYmxlPVwidHJ1ZVwiIGNsYXNzPVwiZnJhYyB0b3Agc3RhcnRDdXJzb3JQb3MgaW5wdXRGaWVsZFwiPjwvc3Bhbj4nK1xyXG5cdCc8c3BhbiBjb250ZW50ZWRpdGFibGU9XCJ0cnVlXCIgY2xhc3M9XCJmcmFjIGJvdHRvbSBpbnB1dEZpZWxkXCI+PC9zcGFuPicrXHJcbic8L2Rpdj4nO1xyXG5cclxuaW1wb3J0IGZyYWN0c3ZnIGZyb20gJy4vaW1nL2ZyYWN0LnN2ZydcclxuY29uc3QgZnJhY19odG1sX3Rvb2xiYXIgPSBgPGRpdiBjbGFzcz1cImZyYWNcIj48aW1nIHNyYz1cIiR7ZnJhY3Rzdmd9XCI+PC9kaXY+YDtcclxuXHJcblxyXG5leHBvcnQgY29uc3QgdG9vbGJhckZyYWN0aW9uID0gW3tcclxuXHRkaXNwbGF5OiBmcmFjX2h0bWxfdG9vbGJhcixcclxuXHRpbnNlcnQ6IGZyYWNfaHRtbCxcclxuXHRkb250SW5zZXJ0UmVjdXJzaXZlOiB0cnVlLFxyXG5cdGxvZ05hbWU6IFwiZnJhY3Rpb25cIixcclxuXHRleHRyYWN0UmVwbGFjZToge1xyXG5cdFx0ZnJvbTogLzxkaXZbXj5dKmNsYXNzPVwiZnJhY1tePl0qPlxccyo8c3BhbltePl0qY2xhc3M9XCJmcmFjIHRvcFtePl0qPiguKj8pPFxcL3NwYW4+XFxzKjxzcGFuW14+XSpjbGFzcz1cImZyYWMgYm90dG9tW14+XSo+KC4qPyk8XFwvc3Bhbj5cXHMqPFxcL2Rpdj4vZyxcclxuXHRcdHRvOiBcIigkMSkvKCQyKVwiXHJcblx0fSxcclxufSxcclxuXVxyXG5cclxuZXhwb3J0IGNvbnN0IHRvb2xiYXJQZXJjZW50ID0gW1xyXG5cdHsgZGlzcGxheTogXCIlXCIsIGxvZ05hbWU6IFwicGVyY2VudFwiLCB9LFxyXG5dO1xyXG5cclxuZXhwb3J0IGNvbnN0IHRvb2xiYXJFdXJvID0gW1xyXG5cdHsgZGlzcGxheTogXCLigqxcIiwgbG9nTmFtZTogXCJldXJvXCIsIH0sXHJcbl07XHJcblxyXG5leHBvcnQgY29uc3QgdG9vbGJhckNvbXBhcmlzb24gPSBbXHJcblx0eyBkaXNwbGF5OiBcIiZsdDtcIiwgbG9nTmFtZTogXCJsZXNzXCIsIH0sXHJcblx0eyBkaXNwbGF5OiBcIiZndDtcIiwgbG9nTmFtZTogXCJncmVhdGVyXCIsIH0sXHJcbl1cclxuXHJcbmV4cG9ydCBjb25zdCB0b29sYmFyTWF0aE9wZXJhdG9yc0ZyYWN0aW9uID0gdG9vbGJhck1hdGhPcGVyYXRvcnMuY29uY2F0KCB0b29sYmFyRnJhY3Rpb24gKTtcclxuXHJcbmV4cG9ydCBjb25zdCB0b29sYmFyTWF0aE9wZXJhdG9yc0ZyYWN0aW9uQ29tcGFyaXNvbiA9IFtdLmNvbmNhdCh0b29sYmFyRnJhY3Rpb24pLmNvbmNhdCggdG9vbGJhck1hdGhPcGVyYXRvcnNGcmFjdGlvbiApO1xyXG5cclxuZXhwb3J0IGNvbnN0IHRvb2xiYXJNYXRoT3BlcmF0b3JzRnJhY3Rpb25QZXJjZW50ID0gdG9vbGJhck1hdGhPcGVyYXRvcnNGcmFjdGlvbi5jb25jYXQoIHRvb2xiYXJQZXJjZW50ICk7XHJcbiIsIi8vIGV4dHJhY3RlZCBieSBtaW5pLWNzcy1leHRyYWN0LXBsdWdpblxuZXhwb3J0IHt9OyIsIi8vIGV4dHJhY3RlZCBieSBtaW5pLWNzcy1leHRyYWN0LXBsdWdpblxuZXhwb3J0IHt9OyIsIi8vIGV4dHJhY3RlZCBieSBtaW5pLWNzcy1leHRyYWN0LXBsdWdpblxuZXhwb3J0IHt9OyIsIid1c2Ugc3RyaWN0JztcbnZhciBpc0NhbGxhYmxlID0gcmVxdWlyZSgnLi4vaW50ZXJuYWxzL2lzLWNhbGxhYmxlJyk7XG52YXIgdHJ5VG9TdHJpbmcgPSByZXF1aXJlKCcuLi9pbnRlcm5hbHMvdHJ5LXRvLXN0cmluZycpO1xuXG52YXIgJFR5cGVFcnJvciA9IFR5cGVFcnJvcjtcblxuLy8gYEFzc2VydDogSXNDYWxsYWJsZShhcmd1bWVudCkgaXMgdHJ1ZWBcbm1vZHVsZS5leHBvcnRzID0gZnVuY3Rpb24gKGFyZ3VtZW50KSB7XG4gIGlmIChpc0NhbGxhYmxlKGFyZ3VtZW50KSkgcmV0dXJuIGFyZ3VtZW50O1xuICB0aHJvdyBuZXcgJFR5cGVFcnJvcih0cnlUb1N0cmluZyhhcmd1bWVudCkgKyAnIGlzIG5vdCBhIGZ1bmN0aW9uJyk7XG59O1xuIiwiJ3VzZSBzdHJpY3QnO1xudmFyIGlzQ29uc3RydWN0b3IgPSByZXF1aXJlKCcuLi9pbnRlcm5hbHMvaXMtY29uc3RydWN0b3InKTtcbnZhciB0cnlUb1N0cmluZyA9IHJlcXVpcmUoJy4uL2ludGVybmFscy90cnktdG8tc3RyaW5nJyk7XG5cbnZhciAkVHlwZUVycm9yID0gVHlwZUVycm9yO1xuXG4vLyBgQXNzZXJ0OiBJc0NvbnN0cnVjdG9yKGFyZ3VtZW50KSBpcyB0cnVlYFxubW9kdWxlLmV4cG9ydHMgPSBmdW5jdGlvbiAoYXJndW1lbnQpIHtcbiAgaWYgKGlzQ29uc3RydWN0b3IoYXJndW1lbnQpKSByZXR1cm4gYXJndW1lbnQ7XG4gIHRocm93IG5ldyAkVHlwZUVycm9yKHRyeVRvU3RyaW5nKGFyZ3VtZW50KSArICcgaXMgbm90IGEgY29uc3RydWN0b3InKTtcbn07XG4iLCIndXNlIHN0cmljdCc7XG52YXIgaXNQb3NzaWJsZVByb3RvdHlwZSA9IHJlcXVpcmUoJy4uL2ludGVybmFscy9pcy1wb3NzaWJsZS1wcm90b3R5cGUnKTtcblxudmFyICRTdHJpbmcgPSBTdHJpbmc7XG52YXIgJFR5cGVFcnJvciA9IFR5cGVFcnJvcjtcblxubW9kdWxlLmV4cG9ydHMgPSBmdW5jdGlvbiAoYXJndW1lbnQpIHtcbiAgaWYgKGlzUG9zc2libGVQcm90b3R5cGUoYXJndW1lbnQpKSByZXR1cm4gYXJndW1lbnQ7XG4gIHRocm93IG5ldyAkVHlwZUVycm9yKFwiQ2FuJ3Qgc2V0IFwiICsgJFN0cmluZyhhcmd1bWVudCkgKyAnIGFzIGEgcHJvdG90eXBlJyk7XG59O1xuIiwiJ3VzZSBzdHJpY3QnO1xudmFyIHdlbGxLbm93blN5bWJvbCA9IHJlcXVpcmUoJy4uL2ludGVybmFscy93ZWxsLWtub3duLXN5bWJvbCcpO1xudmFyIGNyZWF0ZSA9IHJlcXVpcmUoJy4uL2ludGVybmFscy9vYmplY3QtY3JlYXRlJyk7XG52YXIgZGVmaW5lUHJvcGVydHkgPSByZXF1aXJlKCcuLi9pbnRlcm5hbHMvb2JqZWN0LWRlZmluZS1wcm9wZXJ0eScpLmY7XG5cbnZhciBVTlNDT1BBQkxFUyA9IHdlbGxLbm93blN5bWJvbCgndW5zY29wYWJsZXMnKTtcbnZhciBBcnJheVByb3RvdHlwZSA9IEFycmF5LnByb3RvdHlwZTtcblxuLy8gQXJyYXkucHJvdG90eXBlW0BAdW5zY29wYWJsZXNdXG4vLyBodHRwczovL3RjMzkuZXMvZWNtYTI2Mi8jc2VjLWFycmF5LnByb3RvdHlwZS1AQHVuc2NvcGFibGVzXG5pZiAoQXJyYXlQcm90b3R5cGVbVU5TQ09QQUJMRVNdID09PSB1bmRlZmluZWQpIHtcbiAgZGVmaW5lUHJvcGVydHkoQXJyYXlQcm90b3R5cGUsIFVOU0NPUEFCTEVTLCB7XG4gICAgY29uZmlndXJhYmxlOiB0cnVlLFxuICAgIHZhbHVlOiBjcmVhdGUobnVsbClcbiAgfSk7XG59XG5cbi8vIGFkZCBhIGtleSB0byBBcnJheS5wcm90b3R5cGVbQEB1bnNjb3BhYmxlc11cbm1vZHVsZS5leHBvcnRzID0gZnVuY3Rpb24gKGtleSkge1xuICBBcnJheVByb3RvdHlwZVtVTlNDT1BBQkxFU11ba2V5XSA9IHRydWU7XG59O1xuIiwiJ3VzZSBzdHJpY3QnO1xudmFyIGNoYXJBdCA9IHJlcXVpcmUoJy4uL2ludGVybmFscy9zdHJpbmctbXVsdGlieXRlJykuY2hhckF0O1xuXG4vLyBgQWR2YW5jZVN0cmluZ0luZGV4YCBhYnN0cmFjdCBvcGVyYXRpb25cbi8vIGh0dHBzOi8vdGMzOS5lcy9lY21hMjYyLyNzZWMtYWR2YW5jZXN0cmluZ2luZGV4XG5tb2R1bGUuZXhwb3J0cyA9IGZ1bmN0aW9uIChTLCBpbmRleCwgdW5pY29kZSkge1xuICByZXR1cm4gaW5kZXggKyAodW5pY29kZSA/IGNoYXJBdChTLCBpbmRleCkubGVuZ3RoIDogMSk7XG59O1xuIiwiJ3VzZSBzdHJpY3QnO1xudmFyIGlzUHJvdG90eXBlT2YgPSByZXF1aXJlKCcuLi9pbnRlcm5hbHMvb2JqZWN0LWlzLXByb3RvdHlwZS1vZicpO1xuXG52YXIgJFR5cGVFcnJvciA9IFR5cGVFcnJvcjtcblxubW9kdWxlLmV4cG9ydHMgPSBmdW5jdGlvbiAoaXQsIFByb3RvdHlwZSkge1xuICBpZiAoaXNQcm90b3R5cGVPZihQcm90b3R5cGUsIGl0KSkgcmV0dXJuIGl0O1xuICB0aHJvdyBuZXcgJFR5cGVFcnJvcignSW5jb3JyZWN0IGludm9jYXRpb24nKTtcbn07XG4iLCIndXNlIHN0cmljdCc7XG52YXIgaXNPYmplY3QgPSByZXF1aXJlKCcuLi9pbnRlcm5hbHMvaXMtb2JqZWN0Jyk7XG5cbnZhciAkU3RyaW5nID0gU3RyaW5nO1xudmFyICRUeXBlRXJyb3IgPSBUeXBlRXJyb3I7XG5cbi8vIGBBc3NlcnQ6IFR5cGUoYXJndW1lbnQpIGlzIE9iamVjdGBcbm1vZHVsZS5leHBvcnRzID0gZnVuY3Rpb24gKGFyZ3VtZW50KSB7XG4gIGlmIChpc09iamVjdChhcmd1bWVudCkpIHJldHVybiBhcmd1bWVudDtcbiAgdGhyb3cgbmV3ICRUeXBlRXJyb3IoJFN0cmluZyhhcmd1bWVudCkgKyAnIGlzIG5vdCBhbiBvYmplY3QnKTtcbn07XG4iLCIndXNlIHN0cmljdCc7XG52YXIgYmluZCA9IHJlcXVpcmUoJy4uL2ludGVybmFscy9mdW5jdGlvbi1iaW5kLWNvbnRleHQnKTtcbnZhciBjYWxsID0gcmVxdWlyZSgnLi4vaW50ZXJuYWxzL2Z1bmN0aW9uLWNhbGwnKTtcbnZhciB0b09iamVjdCA9IHJlcXVpcmUoJy4uL2ludGVybmFscy90by1vYmplY3QnKTtcbnZhciBjYWxsV2l0aFNhZmVJdGVyYXRpb25DbG9zaW5nID0gcmVxdWlyZSgnLi4vaW50ZXJuYWxzL2NhbGwtd2l0aC1zYWZlLWl0ZXJhdGlvbi1jbG9zaW5nJyk7XG52YXIgaXNBcnJheUl0ZXJhdG9yTWV0aG9kID0gcmVxdWlyZSgnLi4vaW50ZXJuYWxzL2lzLWFycmF5LWl0ZXJhdG9yLW1ldGhvZCcpO1xudmFyIGlzQ29uc3RydWN0b3IgPSByZXF1aXJlKCcuLi9pbnRlcm5hbHMvaXMtY29uc3RydWN0b3InKTtcbnZhciBsZW5ndGhPZkFycmF5TGlrZSA9IHJlcXVpcmUoJy4uL2ludGVybmFscy9sZW5ndGgtb2YtYXJyYXktbGlrZScpO1xudmFyIGNyZWF0ZVByb3BlcnR5ID0gcmVxdWlyZSgnLi4vaW50ZXJuYWxzL2NyZWF0ZS1wcm9wZXJ0eScpO1xudmFyIGdldEl0ZXJhdG9yID0gcmVxdWlyZSgnLi4vaW50ZXJuYWxzL2dldC1pdGVyYXRvcicpO1xudmFyIGdldEl0ZXJhdG9yTWV0aG9kID0gcmVxdWlyZSgnLi4vaW50ZXJuYWxzL2dldC1pdGVyYXRvci1tZXRob2QnKTtcblxudmFyICRBcnJheSA9IEFycmF5O1xuXG4vLyBgQXJyYXkuZnJvbWAgbWV0aG9kIGltcGxlbWVudGF0aW9uXG4vLyBodHRwczovL3RjMzkuZXMvZWNtYTI2Mi8jc2VjLWFycmF5LmZyb21cbm1vZHVsZS5leHBvcnRzID0gZnVuY3Rpb24gZnJvbShhcnJheUxpa2UgLyogLCBtYXBmbiA9IHVuZGVmaW5lZCwgdGhpc0FyZyA9IHVuZGVmaW5lZCAqLykge1xuICB2YXIgTyA9IHRvT2JqZWN0KGFycmF5TGlrZSk7XG4gIHZhciBJU19DT05TVFJVQ1RPUiA9IGlzQ29uc3RydWN0b3IodGhpcyk7XG4gIHZhciBhcmd1bWVudHNMZW5ndGggPSBhcmd1bWVudHMubGVuZ3RoO1xuICB2YXIgbWFwZm4gPSBhcmd1bWVudHNMZW5ndGggPiAxID8gYXJndW1lbnRzWzFdIDogdW5kZWZpbmVkO1xuICB2YXIgbWFwcGluZyA9IG1hcGZuICE9PSB1bmRlZmluZWQ7XG4gIGlmIChtYXBwaW5nKSBtYXBmbiA9IGJpbmQobWFwZm4sIGFyZ3VtZW50c0xlbmd0aCA+IDIgPyBhcmd1bWVudHNbMl0gOiB1bmRlZmluZWQpO1xuICB2YXIgaXRlcmF0b3JNZXRob2QgPSBnZXRJdGVyYXRvck1ldGhvZChPKTtcbiAgdmFyIGluZGV4ID0gMDtcbiAgdmFyIGxlbmd0aCwgcmVzdWx0LCBzdGVwLCBpdGVyYXRvciwgbmV4dCwgdmFsdWU7XG4gIC8vIGlmIHRoZSB0YXJnZXQgaXMgbm90IGl0ZXJhYmxlIG9yIGl0J3MgYW4gYXJyYXkgd2l0aCB0aGUgZGVmYXVsdCBpdGVyYXRvciAtIHVzZSBhIHNpbXBsZSBjYXNlXG4gIGlmIChpdGVyYXRvck1ldGhvZCAmJiAhKHRoaXMgPT09ICRBcnJheSAmJiBpc0FycmF5SXRlcmF0b3JNZXRob2QoaXRlcmF0b3JNZXRob2QpKSkge1xuICAgIHJlc3VsdCA9IElTX0NPTlNUUlVDVE9SID8gbmV3IHRoaXMoKSA6IFtdO1xuICAgIGl0ZXJhdG9yID0gZ2V0SXRlcmF0b3IoTywgaXRlcmF0b3JNZXRob2QpO1xuICAgIG5leHQgPSBpdGVyYXRvci5uZXh0O1xuICAgIGZvciAoOyEoc3RlcCA9IGNhbGwobmV4dCwgaXRlcmF0b3IpKS5kb25lOyBpbmRleCsrKSB7XG4gICAgICB2YWx1ZSA9IG1hcHBpbmcgPyBjYWxsV2l0aFNhZmVJdGVyYXRpb25DbG9zaW5nKGl0ZXJhdG9yLCBtYXBmbiwgW3N0ZXAudmFsdWUsIGluZGV4XSwgdHJ1ZSkgOiBzdGVwLnZhbHVlO1xuICAgICAgY3JlYXRlUHJvcGVydHkocmVzdWx0LCBpbmRleCwgdmFsdWUpO1xuICAgIH1cbiAgfSBlbHNlIHtcbiAgICBsZW5ndGggPSBsZW5ndGhPZkFycmF5TGlrZShPKTtcbiAgICByZXN1bHQgPSBJU19DT05TVFJVQ1RPUiA/IG5ldyB0aGlzKGxlbmd0aCkgOiAkQXJyYXkobGVuZ3RoKTtcbiAgICBmb3IgKDtsZW5ndGggPiBpbmRleDsgaW5kZXgrKykge1xuICAgICAgdmFsdWUgPSBtYXBwaW5nID8gbWFwZm4oT1tpbmRleF0sIGluZGV4KSA6IE9baW5kZXhdO1xuICAgICAgY3JlYXRlUHJvcGVydHkocmVzdWx0LCBpbmRleCwgdmFsdWUpO1xuICAgIH1cbiAgfVxuICByZXN1bHQubGVuZ3RoID0gaW5kZXg7XG4gIHJldHVybiByZXN1bHQ7XG59O1xuIiwiJ3VzZSBzdHJpY3QnO1xudmFyIHRvSW5kZXhlZE9iamVjdCA9IHJlcXVpcmUoJy4uL2ludGVybmFscy90by1pbmRleGVkLW9iamVjdCcpO1xudmFyIHRvQWJzb2x1dGVJbmRleCA9IHJlcXVpcmUoJy4uL2ludGVybmFscy90by1hYnNvbHV0ZS1pbmRleCcpO1xudmFyIGxlbmd0aE9mQXJyYXlMaWtlID0gcmVxdWlyZSgnLi4vaW50ZXJuYWxzL2xlbmd0aC1vZi1hcnJheS1saWtlJyk7XG5cbi8vIGBBcnJheS5wcm90b3R5cGUueyBpbmRleE9mLCBpbmNsdWRlcyB9YCBtZXRob2RzIGltcGxlbWVudGF0aW9uXG52YXIgY3JlYXRlTWV0aG9kID0gZnVuY3Rpb24gKElTX0lOQ0xVREVTKSB7XG4gIHJldHVybiBmdW5jdGlvbiAoJHRoaXMsIGVsLCBmcm9tSW5kZXgpIHtcbiAgICB2YXIgTyA9IHRvSW5kZXhlZE9iamVjdCgkdGhpcyk7XG4gICAgdmFyIGxlbmd0aCA9IGxlbmd0aE9mQXJyYXlMaWtlKE8pO1xuICAgIGlmIChsZW5ndGggPT09IDApIHJldHVybiAhSVNfSU5DTFVERVMgJiYgLTE7XG4gICAgdmFyIGluZGV4ID0gdG9BYnNvbHV0ZUluZGV4KGZyb21JbmRleCwgbGVuZ3RoKTtcbiAgICB2YXIgdmFsdWU7XG4gICAgLy8gQXJyYXkjaW5jbHVkZXMgdXNlcyBTYW1lVmFsdWVaZXJvIGVxdWFsaXR5IGFsZ29yaXRobVxuICAgIC8vIGVzbGludC1kaXNhYmxlLW5leHQtbGluZSBuby1zZWxmLWNvbXBhcmUgLS0gTmFOIGNoZWNrXG4gICAgaWYgKElTX0lOQ0xVREVTICYmIGVsICE9PSBlbCkgd2hpbGUgKGxlbmd0aCA+IGluZGV4KSB7XG4gICAgICB2YWx1ZSA9IE9baW5kZXgrK107XG4gICAgICAvLyBlc2xpbnQtZGlzYWJsZS1uZXh0LWxpbmUgbm8tc2VsZi1jb21wYXJlIC0tIE5hTiBjaGVja1xuICAgICAgaWYgKHZhbHVlICE9PSB2YWx1ZSkgcmV0dXJuIHRydWU7XG4gICAgLy8gQXJyYXkjaW5kZXhPZiBpZ25vcmVzIGhvbGVzLCBBcnJheSNpbmNsdWRlcyAtIG5vdFxuICAgIH0gZWxzZSBmb3IgKDtsZW5ndGggPiBpbmRleDsgaW5kZXgrKykge1xuICAgICAgaWYgKChJU19JTkNMVURFUyB8fCBpbmRleCBpbiBPKSAmJiBPW2luZGV4XSA9PT0gZWwpIHJldHVybiBJU19JTkNMVURFUyB8fCBpbmRleCB8fCAwO1xuICAgIH0gcmV0dXJuICFJU19JTkNMVURFUyAmJiAtMTtcbiAgfTtcbn07XG5cbm1vZHVsZS5leHBvcnRzID0ge1xuICAvLyBgQXJyYXkucHJvdG90eXBlLmluY2x1ZGVzYCBtZXRob2RcbiAgLy8gaHR0cHM6Ly90YzM5LmVzL2VjbWEyNjIvI3NlYy1hcnJheS5wcm90b3R5cGUuaW5jbHVkZXNcbiAgaW5jbHVkZXM6IGNyZWF0ZU1ldGhvZCh0cnVlKSxcbiAgLy8gYEFycmF5LnByb3RvdHlwZS5pbmRleE9mYCBtZXRob2RcbiAgLy8gaHR0cHM6Ly90YzM5LmVzL2VjbWEyNjIvI3NlYy1hcnJheS5wcm90b3R5cGUuaW5kZXhvZlxuICBpbmRleE9mOiBjcmVhdGVNZXRob2QoZmFsc2UpXG59O1xuIiwiJ3VzZSBzdHJpY3QnO1xudmFyIHVuY3VycnlUaGlzID0gcmVxdWlyZSgnLi4vaW50ZXJuYWxzL2Z1bmN0aW9uLXVuY3VycnktdGhpcycpO1xuXG5tb2R1bGUuZXhwb3J0cyA9IHVuY3VycnlUaGlzKFtdLnNsaWNlKTtcbiIsIid1c2Ugc3RyaWN0JztcbnZhciBhcnJheVNsaWNlID0gcmVxdWlyZSgnLi4vaW50ZXJuYWxzL2FycmF5LXNsaWNlJyk7XG5cbnZhciBmbG9vciA9IE1hdGguZmxvb3I7XG5cbnZhciBzb3J0ID0gZnVuY3Rpb24gKGFycmF5LCBjb21wYXJlZm4pIHtcbiAgdmFyIGxlbmd0aCA9IGFycmF5Lmxlbmd0aDtcblxuICBpZiAobGVuZ3RoIDwgOCkge1xuICAgIC8vIGluc2VydGlvbiBzb3J0XG4gICAgdmFyIGkgPSAxO1xuICAgIHZhciBlbGVtZW50LCBqO1xuXG4gICAgd2hpbGUgKGkgPCBsZW5ndGgpIHtcbiAgICAgIGogPSBpO1xuICAgICAgZWxlbWVudCA9IGFycmF5W2ldO1xuICAgICAgd2hpbGUgKGogJiYgY29tcGFyZWZuKGFycmF5W2ogLSAxXSwgZWxlbWVudCkgPiAwKSB7XG4gICAgICAgIGFycmF5W2pdID0gYXJyYXlbLS1qXTtcbiAgICAgIH1cbiAgICAgIGlmIChqICE9PSBpKyspIGFycmF5W2pdID0gZWxlbWVudDtcbiAgICB9XG4gIH0gZWxzZSB7XG4gICAgLy8gbWVyZ2Ugc29ydFxuICAgIHZhciBtaWRkbGUgPSBmbG9vcihsZW5ndGggLyAyKTtcbiAgICB2YXIgbGVmdCA9IHNvcnQoYXJyYXlTbGljZShhcnJheSwgMCwgbWlkZGxlKSwgY29tcGFyZWZuKTtcbiAgICB2YXIgcmlnaHQgPSBzb3J0KGFycmF5U2xpY2UoYXJyYXksIG1pZGRsZSksIGNvbXBhcmVmbik7XG4gICAgdmFyIGxsZW5ndGggPSBsZWZ0Lmxlbmd0aDtcbiAgICB2YXIgcmxlbmd0aCA9IHJpZ2h0Lmxlbmd0aDtcbiAgICB2YXIgbGluZGV4ID0gMDtcbiAgICB2YXIgcmluZGV4ID0gMDtcblxuICAgIHdoaWxlIChsaW5kZXggPCBsbGVuZ3RoIHx8IHJpbmRleCA8IHJsZW5ndGgpIHtcbiAgICAgIGFycmF5W2xpbmRleCArIHJpbmRleF0gPSAobGluZGV4IDwgbGxlbmd0aCAmJiByaW5kZXggPCBybGVuZ3RoKVxuICAgICAgICA/IGNvbXBhcmVmbihsZWZ0W2xpbmRleF0sIHJpZ2h0W3JpbmRleF0pIDw9IDAgPyBsZWZ0W2xpbmRleCsrXSA6IHJpZ2h0W3JpbmRleCsrXVxuICAgICAgICA6IGxpbmRleCA8IGxsZW5ndGggPyBsZWZ0W2xpbmRleCsrXSA6IHJpZ2h0W3JpbmRleCsrXTtcbiAgICB9XG4gIH1cblxuICByZXR1cm4gYXJyYXk7XG59O1xuXG5tb2R1bGUuZXhwb3J0cyA9IHNvcnQ7XG4iLCIndXNlIHN0cmljdCc7XG52YXIgYW5PYmplY3QgPSByZXF1aXJlKCcuLi9pbnRlcm5hbHMvYW4tb2JqZWN0Jyk7XG52YXIgaXRlcmF0b3JDbG9zZSA9IHJlcXVpcmUoJy4uL2ludGVybmFscy9pdGVyYXRvci1jbG9zZScpO1xuXG4vLyBjYWxsIHNvbWV0aGluZyBvbiBpdGVyYXRvciBzdGVwIHdpdGggc2FmZSBjbG9zaW5nIG9uIGVycm9yXG5tb2R1bGUuZXhwb3J0cyA9IGZ1bmN0aW9uIChpdGVyYXRvciwgZm4sIHZhbHVlLCBFTlRSSUVTKSB7XG4gIHRyeSB7XG4gICAgcmV0dXJuIEVOVFJJRVMgPyBmbihhbk9iamVjdCh2YWx1ZSlbMF0sIHZhbHVlWzFdKSA6IGZuKHZhbHVlKTtcbiAgfSBjYXRjaCAoZXJyb3IpIHtcbiAgICBpdGVyYXRvckNsb3NlKGl0ZXJhdG9yLCAndGhyb3cnLCBlcnJvcik7XG4gIH1cbn07XG4iLCIndXNlIHN0cmljdCc7XG52YXIgdW5jdXJyeVRoaXMgPSByZXF1aXJlKCcuLi9pbnRlcm5hbHMvZnVuY3Rpb24tdW5jdXJyeS10aGlzJyk7XG5cbnZhciB0b1N0cmluZyA9IHVuY3VycnlUaGlzKHt9LnRvU3RyaW5nKTtcbnZhciBzdHJpbmdTbGljZSA9IHVuY3VycnlUaGlzKCcnLnNsaWNlKTtcblxubW9kdWxlLmV4cG9ydHMgPSBmdW5jdGlvbiAoaXQpIHtcbiAgcmV0dXJuIHN0cmluZ1NsaWNlKHRvU3RyaW5nKGl0KSwgOCwgLTEpO1xufTtcbiIsIid1c2Ugc3RyaWN0JztcbnZhciBUT19TVFJJTkdfVEFHX1NVUFBPUlQgPSByZXF1aXJlKCcuLi9pbnRlcm5hbHMvdG8tc3RyaW5nLXRhZy1zdXBwb3J0Jyk7XG52YXIgaXNDYWxsYWJsZSA9IHJlcXVpcmUoJy4uL2ludGVybmFscy9pcy1jYWxsYWJsZScpO1xudmFyIGNsYXNzb2ZSYXcgPSByZXF1aXJlKCcuLi9pbnRlcm5hbHMvY2xhc3NvZi1yYXcnKTtcbnZhciB3ZWxsS25vd25TeW1ib2wgPSByZXF1aXJlKCcuLi9pbnRlcm5hbHMvd2VsbC1rbm93bi1zeW1ib2wnKTtcblxudmFyIFRPX1NUUklOR19UQUcgPSB3ZWxsS25vd25TeW1ib2woJ3RvU3RyaW5nVGFnJyk7XG52YXIgJE9iamVjdCA9IE9iamVjdDtcblxuLy8gRVMzIHdyb25nIGhlcmVcbnZhciBDT1JSRUNUX0FSR1VNRU5UUyA9IGNsYXNzb2ZSYXcoZnVuY3Rpb24gKCkgeyByZXR1cm4gYXJndW1lbnRzOyB9KCkpID09PSAnQXJndW1lbnRzJztcblxuLy8gZmFsbGJhY2sgZm9yIElFMTEgU2NyaXB0IEFjY2VzcyBEZW5pZWQgZXJyb3JcbnZhciB0cnlHZXQgPSBmdW5jdGlvbiAoaXQsIGtleSkge1xuICB0cnkge1xuICAgIHJldHVybiBpdFtrZXldO1xuICB9IGNhdGNoIChlcnJvcikgeyAvKiBlbXB0eSAqLyB9XG59O1xuXG4vLyBnZXR0aW5nIHRhZyBmcm9tIEVTNisgYE9iamVjdC5wcm90b3R5cGUudG9TdHJpbmdgXG5tb2R1bGUuZXhwb3J0cyA9IFRPX1NUUklOR19UQUdfU1VQUE9SVCA/IGNsYXNzb2ZSYXcgOiBmdW5jdGlvbiAoaXQpIHtcbiAgdmFyIE8sIHRhZywgcmVzdWx0O1xuICByZXR1cm4gaXQgPT09IHVuZGVmaW5lZCA/ICdVbmRlZmluZWQnIDogaXQgPT09IG51bGwgPyAnTnVsbCdcbiAgICAvLyBAQHRvU3RyaW5nVGFnIGNhc2VcbiAgICA6IHR5cGVvZiAodGFnID0gdHJ5R2V0KE8gPSAkT2JqZWN0KGl0KSwgVE9fU1RSSU5HX1RBRykpID09ICdzdHJpbmcnID8gdGFnXG4gICAgLy8gYnVpbHRpblRhZyBjYXNlXG4gICAgOiBDT1JSRUNUX0FSR1VNRU5UUyA/IGNsYXNzb2ZSYXcoTylcbiAgICAvLyBFUzMgYXJndW1lbnRzIGZhbGxiYWNrXG4gICAgOiAocmVzdWx0ID0gY2xhc3NvZlJhdyhPKSkgPT09ICdPYmplY3QnICYmIGlzQ2FsbGFibGUoTy5jYWxsZWUpID8gJ0FyZ3VtZW50cycgOiByZXN1bHQ7XG59O1xuIiwiJ3VzZSBzdHJpY3QnO1xudmFyIGhhc093biA9IHJlcXVpcmUoJy4uL2ludGVybmFscy9oYXMtb3duLXByb3BlcnR5Jyk7XG52YXIgb3duS2V5cyA9IHJlcXVpcmUoJy4uL2ludGVybmFscy9vd24ta2V5cycpO1xudmFyIGdldE93blByb3BlcnR5RGVzY3JpcHRvck1vZHVsZSA9IHJlcXVpcmUoJy4uL2ludGVybmFscy9vYmplY3QtZ2V0LW93bi1wcm9wZXJ0eS1kZXNjcmlwdG9yJyk7XG52YXIgZGVmaW5lUHJvcGVydHlNb2R1bGUgPSByZXF1aXJlKCcuLi9pbnRlcm5hbHMvb2JqZWN0LWRlZmluZS1wcm9wZXJ0eScpO1xuXG5tb2R1bGUuZXhwb3J0cyA9IGZ1bmN0aW9uICh0YXJnZXQsIHNvdXJjZSwgZXhjZXB0aW9ucykge1xuICB2YXIga2V5cyA9IG93bktleXMoc291cmNlKTtcbiAgdmFyIGRlZmluZVByb3BlcnR5ID0gZGVmaW5lUHJvcGVydHlNb2R1bGUuZjtcbiAgdmFyIGdldE93blByb3BlcnR5RGVzY3JpcHRvciA9IGdldE93blByb3BlcnR5RGVzY3JpcHRvck1vZHVsZS5mO1xuICBmb3IgKHZhciBpID0gMDsgaSA8IGtleXMubGVuZ3RoOyBpKyspIHtcbiAgICB2YXIga2V5ID0ga2V5c1tpXTtcbiAgICBpZiAoIWhhc093bih0YXJnZXQsIGtleSkgJiYgIShleGNlcHRpb25zICYmIGhhc093bihleGNlcHRpb25zLCBrZXkpKSkge1xuICAgICAgZGVmaW5lUHJvcGVydHkodGFyZ2V0LCBrZXksIGdldE93blByb3BlcnR5RGVzY3JpcHRvcihzb3VyY2UsIGtleSkpO1xuICAgIH1cbiAgfVxufTtcbiIsIid1c2Ugc3RyaWN0JztcbnZhciBmYWlscyA9IHJlcXVpcmUoJy4uL2ludGVybmFscy9mYWlscycpO1xuXG5tb2R1bGUuZXhwb3J0cyA9ICFmYWlscyhmdW5jdGlvbiAoKSB7XG4gIGZ1bmN0aW9uIEYoKSB7IC8qIGVtcHR5ICovIH1cbiAgRi5wcm90b3R5cGUuY29uc3RydWN0b3IgPSBudWxsO1xuICAvLyBlc2xpbnQtZGlzYWJsZS1uZXh0LWxpbmUgZXMvbm8tb2JqZWN0LWdldHByb3RvdHlwZW9mIC0tIHJlcXVpcmVkIGZvciB0ZXN0aW5nXG4gIHJldHVybiBPYmplY3QuZ2V0UHJvdG90eXBlT2YobmV3IEYoKSkgIT09IEYucHJvdG90eXBlO1xufSk7XG4iLCIndXNlIHN0cmljdCc7XG4vLyBgQ3JlYXRlSXRlclJlc3VsdE9iamVjdGAgYWJzdHJhY3Qgb3BlcmF0aW9uXG4vLyBodHRwczovL3RjMzkuZXMvZWNtYTI2Mi8jc2VjLWNyZWF0ZWl0ZXJyZXN1bHRvYmplY3Rcbm1vZHVsZS5leHBvcnRzID0gZnVuY3Rpb24gKHZhbHVlLCBkb25lKSB7XG4gIHJldHVybiB7IHZhbHVlOiB2YWx1ZSwgZG9uZTogZG9uZSB9O1xufTtcbiIsIid1c2Ugc3RyaWN0JztcbnZhciBERVNDUklQVE9SUyA9IHJlcXVpcmUoJy4uL2ludGVybmFscy9kZXNjcmlwdG9ycycpO1xudmFyIGRlZmluZVByb3BlcnR5TW9kdWxlID0gcmVxdWlyZSgnLi4vaW50ZXJuYWxzL29iamVjdC1kZWZpbmUtcHJvcGVydHknKTtcbnZhciBjcmVhdGVQcm9wZXJ0eURlc2NyaXB0b3IgPSByZXF1aXJlKCcuLi9pbnRlcm5hbHMvY3JlYXRlLXByb3BlcnR5LWRlc2NyaXB0b3InKTtcblxubW9kdWxlLmV4cG9ydHMgPSBERVNDUklQVE9SUyA/IGZ1bmN0aW9uIChvYmplY3QsIGtleSwgdmFsdWUpIHtcbiAgcmV0dXJuIGRlZmluZVByb3BlcnR5TW9kdWxlLmYob2JqZWN0LCBrZXksIGNyZWF0ZVByb3BlcnR5RGVzY3JpcHRvcigxLCB2YWx1ZSkpO1xufSA6IGZ1bmN0aW9uIChvYmplY3QsIGtleSwgdmFsdWUpIHtcbiAgb2JqZWN0W2tleV0gPSB2YWx1ZTtcbiAgcmV0dXJuIG9iamVjdDtcbn07XG4iLCIndXNlIHN0cmljdCc7XG5tb2R1bGUuZXhwb3J0cyA9IGZ1bmN0aW9uIChiaXRtYXAsIHZhbHVlKSB7XG4gIHJldHVybiB7XG4gICAgZW51bWVyYWJsZTogIShiaXRtYXAgJiAxKSxcbiAgICBjb25maWd1cmFibGU6ICEoYml0bWFwICYgMiksXG4gICAgd3JpdGFibGU6ICEoYml0bWFwICYgNCksXG4gICAgdmFsdWU6IHZhbHVlXG4gIH07XG59O1xuIiwiJ3VzZSBzdHJpY3QnO1xudmFyIERFU0NSSVBUT1JTID0gcmVxdWlyZSgnLi4vaW50ZXJuYWxzL2Rlc2NyaXB0b3JzJyk7XG52YXIgZGVmaW5lUHJvcGVydHlNb2R1bGUgPSByZXF1aXJlKCcuLi9pbnRlcm5hbHMvb2JqZWN0LWRlZmluZS1wcm9wZXJ0eScpO1xudmFyIGNyZWF0ZVByb3BlcnR5RGVzY3JpcHRvciA9IHJlcXVpcmUoJy4uL2ludGVybmFscy9jcmVhdGUtcHJvcGVydHktZGVzY3JpcHRvcicpO1xuXG5tb2R1bGUuZXhwb3J0cyA9IGZ1bmN0aW9uIChvYmplY3QsIGtleSwgdmFsdWUpIHtcbiAgaWYgKERFU0NSSVBUT1JTKSBkZWZpbmVQcm9wZXJ0eU1vZHVsZS5mKG9iamVjdCwga2V5LCBjcmVhdGVQcm9wZXJ0eURlc2NyaXB0b3IoMCwgdmFsdWUpKTtcbiAgZWxzZSBvYmplY3Rba2V5XSA9IHZhbHVlO1xufTtcbiIsIid1c2Ugc3RyaWN0JztcbnZhciBtYWtlQnVpbHRJbiA9IHJlcXVpcmUoJy4uL2ludGVybmFscy9tYWtlLWJ1aWx0LWluJyk7XG52YXIgZGVmaW5lUHJvcGVydHkgPSByZXF1aXJlKCcuLi9pbnRlcm5hbHMvb2JqZWN0LWRlZmluZS1wcm9wZXJ0eScpO1xuXG5tb2R1bGUuZXhwb3J0cyA9IGZ1bmN0aW9uICh0YXJnZXQsIG5hbWUsIGRlc2NyaXB0b3IpIHtcbiAgaWYgKGRlc2NyaXB0b3IuZ2V0KSBtYWtlQnVpbHRJbihkZXNjcmlwdG9yLmdldCwgbmFtZSwgeyBnZXR0ZXI6IHRydWUgfSk7XG4gIGlmIChkZXNjcmlwdG9yLnNldCkgbWFrZUJ1aWx0SW4oZGVzY3JpcHRvci5zZXQsIG5hbWUsIHsgc2V0dGVyOiB0cnVlIH0pO1xuICByZXR1cm4gZGVmaW5lUHJvcGVydHkuZih0YXJnZXQsIG5hbWUsIGRlc2NyaXB0b3IpO1xufTtcbiIsIid1c2Ugc3RyaWN0JztcbnZhciBpc0NhbGxhYmxlID0gcmVxdWlyZSgnLi4vaW50ZXJuYWxzL2lzLWNhbGxhYmxlJyk7XG52YXIgZGVmaW5lUHJvcGVydHlNb2R1bGUgPSByZXF1aXJlKCcuLi9pbnRlcm5hbHMvb2JqZWN0LWRlZmluZS1wcm9wZXJ0eScpO1xudmFyIG1ha2VCdWlsdEluID0gcmVxdWlyZSgnLi4vaW50ZXJuYWxzL21ha2UtYnVpbHQtaW4nKTtcbnZhciBkZWZpbmVHbG9iYWxQcm9wZXJ0eSA9IHJlcXVpcmUoJy4uL2ludGVybmFscy9kZWZpbmUtZ2xvYmFsLXByb3BlcnR5Jyk7XG5cbm1vZHVsZS5leHBvcnRzID0gZnVuY3Rpb24gKE8sIGtleSwgdmFsdWUsIG9wdGlvbnMpIHtcbiAgaWYgKCFvcHRpb25zKSBvcHRpb25zID0ge307XG4gIHZhciBzaW1wbGUgPSBvcHRpb25zLmVudW1lcmFibGU7XG4gIHZhciBuYW1lID0gb3B0aW9ucy5uYW1lICE9PSB1bmRlZmluZWQgPyBvcHRpb25zLm5hbWUgOiBrZXk7XG4gIGlmIChpc0NhbGxhYmxlKHZhbHVlKSkgbWFrZUJ1aWx0SW4odmFsdWUsIG5hbWUsIG9wdGlvbnMpO1xuICBpZiAob3B0aW9ucy5nbG9iYWwpIHtcbiAgICBpZiAoc2ltcGxlKSBPW2tleV0gPSB2YWx1ZTtcbiAgICBlbHNlIGRlZmluZUdsb2JhbFByb3BlcnR5KGtleSwgdmFsdWUpO1xuICB9IGVsc2Uge1xuICAgIHRyeSB7XG4gICAgICBpZiAoIW9wdGlvbnMudW5zYWZlKSBkZWxldGUgT1trZXldO1xuICAgICAgZWxzZSBpZiAoT1trZXldKSBzaW1wbGUgPSB0cnVlO1xuICAgIH0gY2F0Y2ggKGVycm9yKSB7IC8qIGVtcHR5ICovIH1cbiAgICBpZiAoc2ltcGxlKSBPW2tleV0gPSB2YWx1ZTtcbiAgICBlbHNlIGRlZmluZVByb3BlcnR5TW9kdWxlLmYoTywga2V5LCB7XG4gICAgICB2YWx1ZTogdmFsdWUsXG4gICAgICBlbnVtZXJhYmxlOiBmYWxzZSxcbiAgICAgIGNvbmZpZ3VyYWJsZTogIW9wdGlvbnMubm9uQ29uZmlndXJhYmxlLFxuICAgICAgd3JpdGFibGU6ICFvcHRpb25zLm5vbldyaXRhYmxlXG4gICAgfSk7XG4gIH0gcmV0dXJuIE87XG59O1xuIiwiJ3VzZSBzdHJpY3QnO1xudmFyIGRlZmluZUJ1aWx0SW4gPSByZXF1aXJlKCcuLi9pbnRlcm5hbHMvZGVmaW5lLWJ1aWx0LWluJyk7XG5cbm1vZHVsZS5leHBvcnRzID0gZnVuY3Rpb24gKHRhcmdldCwgc3JjLCBvcHRpb25zKSB7XG4gIGZvciAodmFyIGtleSBpbiBzcmMpIGRlZmluZUJ1aWx0SW4odGFyZ2V0LCBrZXksIHNyY1trZXldLCBvcHRpb25zKTtcbiAgcmV0dXJuIHRhcmdldDtcbn07XG4iLCIndXNlIHN0cmljdCc7XG52YXIgZ2xvYmFsID0gcmVxdWlyZSgnLi4vaW50ZXJuYWxzL2dsb2JhbCcpO1xuXG4vLyBlc2xpbnQtZGlzYWJsZS1uZXh0LWxpbmUgZXMvbm8tb2JqZWN0LWRlZmluZXByb3BlcnR5IC0tIHNhZmVcbnZhciBkZWZpbmVQcm9wZXJ0eSA9IE9iamVjdC5kZWZpbmVQcm9wZXJ0eTtcblxubW9kdWxlLmV4cG9ydHMgPSBmdW5jdGlvbiAoa2V5LCB2YWx1ZSkge1xuICB0cnkge1xuICAgIGRlZmluZVByb3BlcnR5KGdsb2JhbCwga2V5LCB7IHZhbHVlOiB2YWx1ZSwgY29uZmlndXJhYmxlOiB0cnVlLCB3cml0YWJsZTogdHJ1ZSB9KTtcbiAgfSBjYXRjaCAoZXJyb3IpIHtcbiAgICBnbG9iYWxba2V5XSA9IHZhbHVlO1xuICB9IHJldHVybiB2YWx1ZTtcbn07XG4iLCIndXNlIHN0cmljdCc7XG52YXIgZmFpbHMgPSByZXF1aXJlKCcuLi9pbnRlcm5hbHMvZmFpbHMnKTtcblxuLy8gRGV0ZWN0IElFOCdzIGluY29tcGxldGUgZGVmaW5lUHJvcGVydHkgaW1wbGVtZW50YXRpb25cbm1vZHVsZS5leHBvcnRzID0gIWZhaWxzKGZ1bmN0aW9uICgpIHtcbiAgLy8gZXNsaW50LWRpc2FibGUtbmV4dC1saW5lIGVzL25vLW9iamVjdC1kZWZpbmVwcm9wZXJ0eSAtLSByZXF1aXJlZCBmb3IgdGVzdGluZ1xuICByZXR1cm4gT2JqZWN0LmRlZmluZVByb3BlcnR5KHt9LCAxLCB7IGdldDogZnVuY3Rpb24gKCkgeyByZXR1cm4gNzsgfSB9KVsxXSAhPT0gNztcbn0pO1xuIiwiJ3VzZSBzdHJpY3QnO1xudmFyIGdsb2JhbCA9IHJlcXVpcmUoJy4uL2ludGVybmFscy9nbG9iYWwnKTtcbnZhciBpc09iamVjdCA9IHJlcXVpcmUoJy4uL2ludGVybmFscy9pcy1vYmplY3QnKTtcblxudmFyIGRvY3VtZW50ID0gZ2xvYmFsLmRvY3VtZW50O1xuLy8gdHlwZW9mIGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQgaXMgJ29iamVjdCcgaW4gb2xkIElFXG52YXIgRVhJU1RTID0gaXNPYmplY3QoZG9jdW1lbnQpICYmIGlzT2JqZWN0KGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQpO1xuXG5tb2R1bGUuZXhwb3J0cyA9IGZ1bmN0aW9uIChpdCkge1xuICByZXR1cm4gRVhJU1RTID8gZG9jdW1lbnQuY3JlYXRlRWxlbWVudChpdCkgOiB7fTtcbn07XG4iLCIndXNlIHN0cmljdCc7XG5tb2R1bGUuZXhwb3J0cyA9IHR5cGVvZiBuYXZpZ2F0b3IgIT0gJ3VuZGVmaW5lZCcgJiYgU3RyaW5nKG5hdmlnYXRvci51c2VyQWdlbnQpIHx8ICcnO1xuIiwiJ3VzZSBzdHJpY3QnO1xudmFyIGdsb2JhbCA9IHJlcXVpcmUoJy4uL2ludGVybmFscy9nbG9iYWwnKTtcbnZhciB1c2VyQWdlbnQgPSByZXF1aXJlKCcuLi9pbnRlcm5hbHMvZW5naW5lLXVzZXItYWdlbnQnKTtcblxudmFyIHByb2Nlc3MgPSBnbG9iYWwucHJvY2VzcztcbnZhciBEZW5vID0gZ2xvYmFsLkRlbm87XG52YXIgdmVyc2lvbnMgPSBwcm9jZXNzICYmIHByb2Nlc3MudmVyc2lvbnMgfHwgRGVubyAmJiBEZW5vLnZlcnNpb247XG52YXIgdjggPSB2ZXJzaW9ucyAmJiB2ZXJzaW9ucy52ODtcbnZhciBtYXRjaCwgdmVyc2lvbjtcblxuaWYgKHY4KSB7XG4gIG1hdGNoID0gdjguc3BsaXQoJy4nKTtcbiAgLy8gaW4gb2xkIENocm9tZSwgdmVyc2lvbnMgb2YgVjggaXNuJ3QgVjggPSBDaHJvbWUgLyAxMFxuICAvLyBidXQgdGhlaXIgY29ycmVjdCB2ZXJzaW9ucyBhcmUgbm90IGludGVyZXN0aW5nIGZvciB1c1xuICB2ZXJzaW9uID0gbWF0Y2hbMF0gPiAwICYmIG1hdGNoWzBdIDwgNCA/IDEgOiArKG1hdGNoWzBdICsgbWF0Y2hbMV0pO1xufVxuXG4vLyBCcm93c2VyRlMgTm9kZUpTIGBwcm9jZXNzYCBwb2x5ZmlsbCBpbmNvcnJlY3RseSBzZXQgYC52OGAgdG8gYDAuMGBcbi8vIHNvIGNoZWNrIGB1c2VyQWdlbnRgIGV2ZW4gaWYgYC52OGAgZXhpc3RzLCBidXQgMFxuaWYgKCF2ZXJzaW9uICYmIHVzZXJBZ2VudCkge1xuICBtYXRjaCA9IHVzZXJBZ2VudC5tYXRjaCgvRWRnZVxcLyhcXGQrKS8pO1xuICBpZiAoIW1hdGNoIHx8IG1hdGNoWzFdID49IDc0KSB7XG4gICAgbWF0Y2ggPSB1c2VyQWdlbnQubWF0Y2goL0Nocm9tZVxcLyhcXGQrKS8pO1xuICAgIGlmIChtYXRjaCkgdmVyc2lvbiA9ICttYXRjaFsxXTtcbiAgfVxufVxuXG5tb2R1bGUuZXhwb3J0cyA9IHZlcnNpb247XG4iLCIndXNlIHN0cmljdCc7XG4vLyBJRTgtIGRvbid0IGVudW0gYnVnIGtleXNcbm1vZHVsZS5leHBvcnRzID0gW1xuICAnY29uc3RydWN0b3InLFxuICAnaGFzT3duUHJvcGVydHknLFxuICAnaXNQcm90b3R5cGVPZicsXG4gICdwcm9wZXJ0eUlzRW51bWVyYWJsZScsXG4gICd0b0xvY2FsZVN0cmluZycsXG4gICd0b1N0cmluZycsXG4gICd2YWx1ZU9mJ1xuXTtcbiIsIid1c2Ugc3RyaWN0JztcbnZhciBnbG9iYWwgPSByZXF1aXJlKCcuLi9pbnRlcm5hbHMvZ2xvYmFsJyk7XG52YXIgZ2V0T3duUHJvcGVydHlEZXNjcmlwdG9yID0gcmVxdWlyZSgnLi4vaW50ZXJuYWxzL29iamVjdC1nZXQtb3duLXByb3BlcnR5LWRlc2NyaXB0b3InKS5mO1xudmFyIGNyZWF0ZU5vbkVudW1lcmFibGVQcm9wZXJ0eSA9IHJlcXVpcmUoJy4uL2ludGVybmFscy9jcmVhdGUtbm9uLWVudW1lcmFibGUtcHJvcGVydHknKTtcbnZhciBkZWZpbmVCdWlsdEluID0gcmVxdWlyZSgnLi4vaW50ZXJuYWxzL2RlZmluZS1idWlsdC1pbicpO1xudmFyIGRlZmluZUdsb2JhbFByb3BlcnR5ID0gcmVxdWlyZSgnLi4vaW50ZXJuYWxzL2RlZmluZS1nbG9iYWwtcHJvcGVydHknKTtcbnZhciBjb3B5Q29uc3RydWN0b3JQcm9wZXJ0aWVzID0gcmVxdWlyZSgnLi4vaW50ZXJuYWxzL2NvcHktY29uc3RydWN0b3ItcHJvcGVydGllcycpO1xudmFyIGlzRm9yY2VkID0gcmVxdWlyZSgnLi4vaW50ZXJuYWxzL2lzLWZvcmNlZCcpO1xuXG4vKlxuICBvcHRpb25zLnRhcmdldCAgICAgICAgIC0gbmFtZSBvZiB0aGUgdGFyZ2V0IG9iamVjdFxuICBvcHRpb25zLmdsb2JhbCAgICAgICAgIC0gdGFyZ2V0IGlzIHRoZSBnbG9iYWwgb2JqZWN0XG4gIG9wdGlvbnMuc3RhdCAgICAgICAgICAgLSBleHBvcnQgYXMgc3RhdGljIG1ldGhvZHMgb2YgdGFyZ2V0XG4gIG9wdGlvbnMucHJvdG8gICAgICAgICAgLSBleHBvcnQgYXMgcHJvdG90eXBlIG1ldGhvZHMgb2YgdGFyZ2V0XG4gIG9wdGlvbnMucmVhbCAgICAgICAgICAgLSByZWFsIHByb3RvdHlwZSBtZXRob2QgZm9yIHRoZSBgcHVyZWAgdmVyc2lvblxuICBvcHRpb25zLmZvcmNlZCAgICAgICAgIC0gZXhwb3J0IGV2ZW4gaWYgdGhlIG5hdGl2ZSBmZWF0dXJlIGlzIGF2YWlsYWJsZVxuICBvcHRpb25zLmJpbmQgICAgICAgICAgIC0gYmluZCBtZXRob2RzIHRvIHRoZSB0YXJnZXQsIHJlcXVpcmVkIGZvciB0aGUgYHB1cmVgIHZlcnNpb25cbiAgb3B0aW9ucy53cmFwICAgICAgICAgICAtIHdyYXAgY29uc3RydWN0b3JzIHRvIHByZXZlbnRpbmcgZ2xvYmFsIHBvbGx1dGlvbiwgcmVxdWlyZWQgZm9yIHRoZSBgcHVyZWAgdmVyc2lvblxuICBvcHRpb25zLnVuc2FmZSAgICAgICAgIC0gdXNlIHRoZSBzaW1wbGUgYXNzaWdubWVudCBvZiBwcm9wZXJ0eSBpbnN0ZWFkIG9mIGRlbGV0ZSArIGRlZmluZVByb3BlcnR5XG4gIG9wdGlvbnMuc2hhbSAgICAgICAgICAgLSBhZGQgYSBmbGFnIHRvIG5vdCBjb21wbGV0ZWx5IGZ1bGwgcG9seWZpbGxzXG4gIG9wdGlvbnMuZW51bWVyYWJsZSAgICAgLSBleHBvcnQgYXMgZW51bWVyYWJsZSBwcm9wZXJ0eVxuICBvcHRpb25zLmRvbnRDYWxsR2V0U2V0IC0gcHJldmVudCBjYWxsaW5nIGEgZ2V0dGVyIG9uIHRhcmdldFxuICBvcHRpb25zLm5hbWUgICAgICAgICAgIC0gdGhlIC5uYW1lIG9mIHRoZSBmdW5jdGlvbiBpZiBpdCBkb2VzIG5vdCBtYXRjaCB0aGUga2V5XG4qL1xubW9kdWxlLmV4cG9ydHMgPSBmdW5jdGlvbiAob3B0aW9ucywgc291cmNlKSB7XG4gIHZhciBUQVJHRVQgPSBvcHRpb25zLnRhcmdldDtcbiAgdmFyIEdMT0JBTCA9IG9wdGlvbnMuZ2xvYmFsO1xuICB2YXIgU1RBVElDID0gb3B0aW9ucy5zdGF0O1xuICB2YXIgRk9SQ0VELCB0YXJnZXQsIGtleSwgdGFyZ2V0UHJvcGVydHksIHNvdXJjZVByb3BlcnR5LCBkZXNjcmlwdG9yO1xuICBpZiAoR0xPQkFMKSB7XG4gICAgdGFyZ2V0ID0gZ2xvYmFsO1xuICB9IGVsc2UgaWYgKFNUQVRJQykge1xuICAgIHRhcmdldCA9IGdsb2JhbFtUQVJHRVRdIHx8IGRlZmluZUdsb2JhbFByb3BlcnR5KFRBUkdFVCwge30pO1xuICB9IGVsc2Uge1xuICAgIHRhcmdldCA9IGdsb2JhbFtUQVJHRVRdICYmIGdsb2JhbFtUQVJHRVRdLnByb3RvdHlwZTtcbiAgfVxuICBpZiAodGFyZ2V0KSBmb3IgKGtleSBpbiBzb3VyY2UpIHtcbiAgICBzb3VyY2VQcm9wZXJ0eSA9IHNvdXJjZVtrZXldO1xuICAgIGlmIChvcHRpb25zLmRvbnRDYWxsR2V0U2V0KSB7XG4gICAgICBkZXNjcmlwdG9yID0gZ2V0T3duUHJvcGVydHlEZXNjcmlwdG9yKHRhcmdldCwga2V5KTtcbiAgICAgIHRhcmdldFByb3BlcnR5ID0gZGVzY3JpcHRvciAmJiBkZXNjcmlwdG9yLnZhbHVlO1xuICAgIH0gZWxzZSB0YXJnZXRQcm9wZXJ0eSA9IHRhcmdldFtrZXldO1xuICAgIEZPUkNFRCA9IGlzRm9yY2VkKEdMT0JBTCA/IGtleSA6IFRBUkdFVCArIChTVEFUSUMgPyAnLicgOiAnIycpICsga2V5LCBvcHRpb25zLmZvcmNlZCk7XG4gICAgLy8gY29udGFpbmVkIGluIHRhcmdldFxuICAgIGlmICghRk9SQ0VEICYmIHRhcmdldFByb3BlcnR5ICE9PSB1bmRlZmluZWQpIHtcbiAgICAgIGlmICh0eXBlb2Ygc291cmNlUHJvcGVydHkgPT0gdHlwZW9mIHRhcmdldFByb3BlcnR5KSBjb250aW51ZTtcbiAgICAgIGNvcHlDb25zdHJ1Y3RvclByb3BlcnRpZXMoc291cmNlUHJvcGVydHksIHRhcmdldFByb3BlcnR5KTtcbiAgICB9XG4gICAgLy8gYWRkIGEgZmxhZyB0byBub3QgY29tcGxldGVseSBmdWxsIHBvbHlmaWxsc1xuICAgIGlmIChvcHRpb25zLnNoYW0gfHwgKHRhcmdldFByb3BlcnR5ICYmIHRhcmdldFByb3BlcnR5LnNoYW0pKSB7XG4gICAgICBjcmVhdGVOb25FbnVtZXJhYmxlUHJvcGVydHkoc291cmNlUHJvcGVydHksICdzaGFtJywgdHJ1ZSk7XG4gICAgfVxuICAgIGRlZmluZUJ1aWx0SW4odGFyZ2V0LCBrZXksIHNvdXJjZVByb3BlcnR5LCBvcHRpb25zKTtcbiAgfVxufTtcbiIsIid1c2Ugc3RyaWN0Jztcbm1vZHVsZS5leHBvcnRzID0gZnVuY3Rpb24gKGV4ZWMpIHtcbiAgdHJ5IHtcbiAgICByZXR1cm4gISFleGVjKCk7XG4gIH0gY2F0Y2ggKGVycm9yKSB7XG4gICAgcmV0dXJuIHRydWU7XG4gIH1cbn07XG4iLCIndXNlIHN0cmljdCc7XG4vLyBUT0RPOiBSZW1vdmUgZnJvbSBgY29yZS1qc0A0YCBzaW5jZSBpdCdzIG1vdmVkIHRvIGVudHJ5IHBvaW50c1xucmVxdWlyZSgnLi4vbW9kdWxlcy9lcy5yZWdleHAuZXhlYycpO1xudmFyIGNhbGwgPSByZXF1aXJlKCcuLi9pbnRlcm5hbHMvZnVuY3Rpb24tY2FsbCcpO1xudmFyIGRlZmluZUJ1aWx0SW4gPSByZXF1aXJlKCcuLi9pbnRlcm5hbHMvZGVmaW5lLWJ1aWx0LWluJyk7XG52YXIgcmVnZXhwRXhlYyA9IHJlcXVpcmUoJy4uL2ludGVybmFscy9yZWdleHAtZXhlYycpO1xudmFyIGZhaWxzID0gcmVxdWlyZSgnLi4vaW50ZXJuYWxzL2ZhaWxzJyk7XG52YXIgd2VsbEtub3duU3ltYm9sID0gcmVxdWlyZSgnLi4vaW50ZXJuYWxzL3dlbGwta25vd24tc3ltYm9sJyk7XG52YXIgY3JlYXRlTm9uRW51bWVyYWJsZVByb3BlcnR5ID0gcmVxdWlyZSgnLi4vaW50ZXJuYWxzL2NyZWF0ZS1ub24tZW51bWVyYWJsZS1wcm9wZXJ0eScpO1xuXG52YXIgU1BFQ0lFUyA9IHdlbGxLbm93blN5bWJvbCgnc3BlY2llcycpO1xudmFyIFJlZ0V4cFByb3RvdHlwZSA9IFJlZ0V4cC5wcm90b3R5cGU7XG5cbm1vZHVsZS5leHBvcnRzID0gZnVuY3Rpb24gKEtFWSwgZXhlYywgRk9SQ0VELCBTSEFNKSB7XG4gIHZhciBTWU1CT0wgPSB3ZWxsS25vd25TeW1ib2woS0VZKTtcblxuICB2YXIgREVMRUdBVEVTX1RPX1NZTUJPTCA9ICFmYWlscyhmdW5jdGlvbiAoKSB7XG4gICAgLy8gU3RyaW5nIG1ldGhvZHMgY2FsbCBzeW1ib2wtbmFtZWQgUmVnRXhwIG1ldGhvZHNcbiAgICB2YXIgTyA9IHt9O1xuICAgIE9bU1lNQk9MXSA9IGZ1bmN0aW9uICgpIHsgcmV0dXJuIDc7IH07XG4gICAgcmV0dXJuICcnW0tFWV0oTykgIT09IDc7XG4gIH0pO1xuXG4gIHZhciBERUxFR0FURVNfVE9fRVhFQyA9IERFTEVHQVRFU19UT19TWU1CT0wgJiYgIWZhaWxzKGZ1bmN0aW9uICgpIHtcbiAgICAvLyBTeW1ib2wtbmFtZWQgUmVnRXhwIG1ldGhvZHMgY2FsbCAuZXhlY1xuICAgIHZhciBleGVjQ2FsbGVkID0gZmFsc2U7XG4gICAgdmFyIHJlID0gL2EvO1xuXG4gICAgaWYgKEtFWSA9PT0gJ3NwbGl0Jykge1xuICAgICAgLy8gV2UgY2FuJ3QgdXNlIHJlYWwgcmVnZXggaGVyZSBzaW5jZSBpdCBjYXVzZXMgZGVvcHRpbWl6YXRpb25cbiAgICAgIC8vIGFuZCBzZXJpb3VzIHBlcmZvcm1hbmNlIGRlZ3JhZGF0aW9uIGluIFY4XG4gICAgICAvLyBodHRwczovL2dpdGh1Yi5jb20vemxvaXJvY2svY29yZS1qcy9pc3N1ZXMvMzA2XG4gICAgICByZSA9IHt9O1xuICAgICAgLy8gUmVnRXhwW0BAc3BsaXRdIGRvZXNuJ3QgY2FsbCB0aGUgcmVnZXgncyBleGVjIG1ldGhvZCwgYnV0IGZpcnN0IGNyZWF0ZXNcbiAgICAgIC8vIGEgbmV3IG9uZS4gV2UgbmVlZCB0byByZXR1cm4gdGhlIHBhdGNoZWQgcmVnZXggd2hlbiBjcmVhdGluZyB0aGUgbmV3IG9uZS5cbiAgICAgIHJlLmNvbnN0cnVjdG9yID0ge307XG4gICAgICByZS5jb25zdHJ1Y3RvcltTUEVDSUVTXSA9IGZ1bmN0aW9uICgpIHsgcmV0dXJuIHJlOyB9O1xuICAgICAgcmUuZmxhZ3MgPSAnJztcbiAgICAgIHJlW1NZTUJPTF0gPSAvLi9bU1lNQk9MXTtcbiAgICB9XG5cbiAgICByZS5leGVjID0gZnVuY3Rpb24gKCkge1xuICAgICAgZXhlY0NhbGxlZCA9IHRydWU7XG4gICAgICByZXR1cm4gbnVsbDtcbiAgICB9O1xuXG4gICAgcmVbU1lNQk9MXSgnJyk7XG4gICAgcmV0dXJuICFleGVjQ2FsbGVkO1xuICB9KTtcblxuICBpZiAoXG4gICAgIURFTEVHQVRFU19UT19TWU1CT0wgfHxcbiAgICAhREVMRUdBVEVTX1RPX0VYRUMgfHxcbiAgICBGT1JDRURcbiAgKSB7XG4gICAgdmFyIG5hdGl2ZVJlZ0V4cE1ldGhvZCA9IC8uL1tTWU1CT0xdO1xuICAgIHZhciBtZXRob2RzID0gZXhlYyhTWU1CT0wsICcnW0tFWV0sIGZ1bmN0aW9uIChuYXRpdmVNZXRob2QsIHJlZ2V4cCwgc3RyLCBhcmcyLCBmb3JjZVN0cmluZ01ldGhvZCkge1xuICAgICAgdmFyICRleGVjID0gcmVnZXhwLmV4ZWM7XG4gICAgICBpZiAoJGV4ZWMgPT09IHJlZ2V4cEV4ZWMgfHwgJGV4ZWMgPT09IFJlZ0V4cFByb3RvdHlwZS5leGVjKSB7XG4gICAgICAgIGlmIChERUxFR0FURVNfVE9fU1lNQk9MICYmICFmb3JjZVN0cmluZ01ldGhvZCkge1xuICAgICAgICAgIC8vIFRoZSBuYXRpdmUgU3RyaW5nIG1ldGhvZCBhbHJlYWR5IGRlbGVnYXRlcyB0byBAQG1ldGhvZCAodGhpc1xuICAgICAgICAgIC8vIHBvbHlmaWxsZWQgZnVuY3Rpb24pLCBsZWFzaW5nIHRvIGluZmluaXRlIHJlY3Vyc2lvbi5cbiAgICAgICAgICAvLyBXZSBhdm9pZCBpdCBieSBkaXJlY3RseSBjYWxsaW5nIHRoZSBuYXRpdmUgQEBtZXRob2QgbWV0aG9kLlxuICAgICAgICAgIHJldHVybiB7IGRvbmU6IHRydWUsIHZhbHVlOiBjYWxsKG5hdGl2ZVJlZ0V4cE1ldGhvZCwgcmVnZXhwLCBzdHIsIGFyZzIpIH07XG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuIHsgZG9uZTogdHJ1ZSwgdmFsdWU6IGNhbGwobmF0aXZlTWV0aG9kLCBzdHIsIHJlZ2V4cCwgYXJnMikgfTtcbiAgICAgIH1cbiAgICAgIHJldHVybiB7IGRvbmU6IGZhbHNlIH07XG4gICAgfSk7XG5cbiAgICBkZWZpbmVCdWlsdEluKFN0cmluZy5wcm90b3R5cGUsIEtFWSwgbWV0aG9kc1swXSk7XG4gICAgZGVmaW5lQnVpbHRJbihSZWdFeHBQcm90b3R5cGUsIFNZTUJPTCwgbWV0aG9kc1sxXSk7XG4gIH1cblxuICBpZiAoU0hBTSkgY3JlYXRlTm9uRW51bWVyYWJsZVByb3BlcnR5KFJlZ0V4cFByb3RvdHlwZVtTWU1CT0xdLCAnc2hhbScsIHRydWUpO1xufTtcbiIsIid1c2Ugc3RyaWN0JztcbnZhciBOQVRJVkVfQklORCA9IHJlcXVpcmUoJy4uL2ludGVybmFscy9mdW5jdGlvbi1iaW5kLW5hdGl2ZScpO1xuXG52YXIgRnVuY3Rpb25Qcm90b3R5cGUgPSBGdW5jdGlvbi5wcm90b3R5cGU7XG52YXIgYXBwbHkgPSBGdW5jdGlvblByb3RvdHlwZS5hcHBseTtcbnZhciBjYWxsID0gRnVuY3Rpb25Qcm90b3R5cGUuY2FsbDtcblxuLy8gZXNsaW50LWRpc2FibGUtbmV4dC1saW5lIGVzL25vLXJlZmxlY3QgLS0gc2FmZVxubW9kdWxlLmV4cG9ydHMgPSB0eXBlb2YgUmVmbGVjdCA9PSAnb2JqZWN0JyAmJiBSZWZsZWN0LmFwcGx5IHx8IChOQVRJVkVfQklORCA/IGNhbGwuYmluZChhcHBseSkgOiBmdW5jdGlvbiAoKSB7XG4gIHJldHVybiBjYWxsLmFwcGx5KGFwcGx5LCBhcmd1bWVudHMpO1xufSk7XG4iLCIndXNlIHN0cmljdCc7XG52YXIgdW5jdXJyeVRoaXMgPSByZXF1aXJlKCcuLi9pbnRlcm5hbHMvZnVuY3Rpb24tdW5jdXJyeS10aGlzLWNsYXVzZScpO1xudmFyIGFDYWxsYWJsZSA9IHJlcXVpcmUoJy4uL2ludGVybmFscy9hLWNhbGxhYmxlJyk7XG52YXIgTkFUSVZFX0JJTkQgPSByZXF1aXJlKCcuLi9pbnRlcm5hbHMvZnVuY3Rpb24tYmluZC1uYXRpdmUnKTtcblxudmFyIGJpbmQgPSB1bmN1cnJ5VGhpcyh1bmN1cnJ5VGhpcy5iaW5kKTtcblxuLy8gb3B0aW9uYWwgLyBzaW1wbGUgY29udGV4dCBiaW5kaW5nXG5tb2R1bGUuZXhwb3J0cyA9IGZ1bmN0aW9uIChmbiwgdGhhdCkge1xuICBhQ2FsbGFibGUoZm4pO1xuICByZXR1cm4gdGhhdCA9PT0gdW5kZWZpbmVkID8gZm4gOiBOQVRJVkVfQklORCA/IGJpbmQoZm4sIHRoYXQpIDogZnVuY3Rpb24gKC8qIC4uLmFyZ3MgKi8pIHtcbiAgICByZXR1cm4gZm4uYXBwbHkodGhhdCwgYXJndW1lbnRzKTtcbiAgfTtcbn07XG4iLCIndXNlIHN0cmljdCc7XG52YXIgZmFpbHMgPSByZXF1aXJlKCcuLi9pbnRlcm5hbHMvZmFpbHMnKTtcblxubW9kdWxlLmV4cG9ydHMgPSAhZmFpbHMoZnVuY3Rpb24gKCkge1xuICAvLyBlc2xpbnQtZGlzYWJsZS1uZXh0LWxpbmUgZXMvbm8tZnVuY3Rpb24tcHJvdG90eXBlLWJpbmQgLS0gc2FmZVxuICB2YXIgdGVzdCA9IChmdW5jdGlvbiAoKSB7IC8qIGVtcHR5ICovIH0pLmJpbmQoKTtcbiAgLy8gZXNsaW50LWRpc2FibGUtbmV4dC1saW5lIG5vLXByb3RvdHlwZS1idWlsdGlucyAtLSBzYWZlXG4gIHJldHVybiB0eXBlb2YgdGVzdCAhPSAnZnVuY3Rpb24nIHx8IHRlc3QuaGFzT3duUHJvcGVydHkoJ3Byb3RvdHlwZScpO1xufSk7XG4iLCIndXNlIHN0cmljdCc7XG52YXIgTkFUSVZFX0JJTkQgPSByZXF1aXJlKCcuLi9pbnRlcm5hbHMvZnVuY3Rpb24tYmluZC1uYXRpdmUnKTtcblxudmFyIGNhbGwgPSBGdW5jdGlvbi5wcm90b3R5cGUuY2FsbDtcblxubW9kdWxlLmV4cG9ydHMgPSBOQVRJVkVfQklORCA/IGNhbGwuYmluZChjYWxsKSA6IGZ1bmN0aW9uICgpIHtcbiAgcmV0dXJuIGNhbGwuYXBwbHkoY2FsbCwgYXJndW1lbnRzKTtcbn07XG4iLCIndXNlIHN0cmljdCc7XG52YXIgREVTQ1JJUFRPUlMgPSByZXF1aXJlKCcuLi9pbnRlcm5hbHMvZGVzY3JpcHRvcnMnKTtcbnZhciBoYXNPd24gPSByZXF1aXJlKCcuLi9pbnRlcm5hbHMvaGFzLW93bi1wcm9wZXJ0eScpO1xuXG52YXIgRnVuY3Rpb25Qcm90b3R5cGUgPSBGdW5jdGlvbi5wcm90b3R5cGU7XG4vLyBlc2xpbnQtZGlzYWJsZS1uZXh0LWxpbmUgZXMvbm8tb2JqZWN0LWdldG93bnByb3BlcnR5ZGVzY3JpcHRvciAtLSBzYWZlXG52YXIgZ2V0RGVzY3JpcHRvciA9IERFU0NSSVBUT1JTICYmIE9iamVjdC5nZXRPd25Qcm9wZXJ0eURlc2NyaXB0b3I7XG5cbnZhciBFWElTVFMgPSBoYXNPd24oRnVuY3Rpb25Qcm90b3R5cGUsICduYW1lJyk7XG4vLyBhZGRpdGlvbmFsIHByb3RlY3Rpb24gZnJvbSBtaW5pZmllZCAvIG1hbmdsZWQgLyBkcm9wcGVkIGZ1bmN0aW9uIG5hbWVzXG52YXIgUFJPUEVSID0gRVhJU1RTICYmIChmdW5jdGlvbiBzb21ldGhpbmcoKSB7IC8qIGVtcHR5ICovIH0pLm5hbWUgPT09ICdzb21ldGhpbmcnO1xudmFyIENPTkZJR1VSQUJMRSA9IEVYSVNUUyAmJiAoIURFU0NSSVBUT1JTIHx8IChERVNDUklQVE9SUyAmJiBnZXREZXNjcmlwdG9yKEZ1bmN0aW9uUHJvdG90eXBlLCAnbmFtZScpLmNvbmZpZ3VyYWJsZSkpO1xuXG5tb2R1bGUuZXhwb3J0cyA9IHtcbiAgRVhJU1RTOiBFWElTVFMsXG4gIFBST1BFUjogUFJPUEVSLFxuICBDT05GSUdVUkFCTEU6IENPTkZJR1VSQUJMRVxufTtcbiIsIid1c2Ugc3RyaWN0JztcbnZhciB1bmN1cnJ5VGhpcyA9IHJlcXVpcmUoJy4uL2ludGVybmFscy9mdW5jdGlvbi11bmN1cnJ5LXRoaXMnKTtcbnZhciBhQ2FsbGFibGUgPSByZXF1aXJlKCcuLi9pbnRlcm5hbHMvYS1jYWxsYWJsZScpO1xuXG5tb2R1bGUuZXhwb3J0cyA9IGZ1bmN0aW9uIChvYmplY3QsIGtleSwgbWV0aG9kKSB7XG4gIHRyeSB7XG4gICAgLy8gZXNsaW50LWRpc2FibGUtbmV4dC1saW5lIGVzL25vLW9iamVjdC1nZXRvd25wcm9wZXJ0eWRlc2NyaXB0b3IgLS0gc2FmZVxuICAgIHJldHVybiB1bmN1cnJ5VGhpcyhhQ2FsbGFibGUoT2JqZWN0LmdldE93blByb3BlcnR5RGVzY3JpcHRvcihvYmplY3QsIGtleSlbbWV0aG9kXSkpO1xuICB9IGNhdGNoIChlcnJvcikgeyAvKiBlbXB0eSAqLyB9XG59O1xuIiwiJ3VzZSBzdHJpY3QnO1xudmFyIGNsYXNzb2ZSYXcgPSByZXF1aXJlKCcuLi9pbnRlcm5hbHMvY2xhc3NvZi1yYXcnKTtcbnZhciB1bmN1cnJ5VGhpcyA9IHJlcXVpcmUoJy4uL2ludGVybmFscy9mdW5jdGlvbi11bmN1cnJ5LXRoaXMnKTtcblxubW9kdWxlLmV4cG9ydHMgPSBmdW5jdGlvbiAoZm4pIHtcbiAgLy8gTmFzaG9ybiBidWc6XG4gIC8vICAgaHR0cHM6Ly9naXRodWIuY29tL3psb2lyb2NrL2NvcmUtanMvaXNzdWVzLzExMjhcbiAgLy8gICBodHRwczovL2dpdGh1Yi5jb20vemxvaXJvY2svY29yZS1qcy9pc3N1ZXMvMTEzMFxuICBpZiAoY2xhc3NvZlJhdyhmbikgPT09ICdGdW5jdGlvbicpIHJldHVybiB1bmN1cnJ5VGhpcyhmbik7XG59O1xuIiwiJ3VzZSBzdHJpY3QnO1xudmFyIE5BVElWRV9CSU5EID0gcmVxdWlyZSgnLi4vaW50ZXJuYWxzL2Z1bmN0aW9uLWJpbmQtbmF0aXZlJyk7XG5cbnZhciBGdW5jdGlvblByb3RvdHlwZSA9IEZ1bmN0aW9uLnByb3RvdHlwZTtcbnZhciBjYWxsID0gRnVuY3Rpb25Qcm90b3R5cGUuY2FsbDtcbnZhciB1bmN1cnJ5VGhpc1dpdGhCaW5kID0gTkFUSVZFX0JJTkQgJiYgRnVuY3Rpb25Qcm90b3R5cGUuYmluZC5iaW5kKGNhbGwsIGNhbGwpO1xuXG5tb2R1bGUuZXhwb3J0cyA9IE5BVElWRV9CSU5EID8gdW5jdXJyeVRoaXNXaXRoQmluZCA6IGZ1bmN0aW9uIChmbikge1xuICByZXR1cm4gZnVuY3Rpb24gKCkge1xuICAgIHJldHVybiBjYWxsLmFwcGx5KGZuLCBhcmd1bWVudHMpO1xuICB9O1xufTtcbiIsIid1c2Ugc3RyaWN0JztcbnZhciBnbG9iYWwgPSByZXF1aXJlKCcuLi9pbnRlcm5hbHMvZ2xvYmFsJyk7XG52YXIgaXNDYWxsYWJsZSA9IHJlcXVpcmUoJy4uL2ludGVybmFscy9pcy1jYWxsYWJsZScpO1xuXG52YXIgYUZ1bmN0aW9uID0gZnVuY3Rpb24gKGFyZ3VtZW50KSB7XG4gIHJldHVybiBpc0NhbGxhYmxlKGFyZ3VtZW50KSA/IGFyZ3VtZW50IDogdW5kZWZpbmVkO1xufTtcblxubW9kdWxlLmV4cG9ydHMgPSBmdW5jdGlvbiAobmFtZXNwYWNlLCBtZXRob2QpIHtcbiAgcmV0dXJuIGFyZ3VtZW50cy5sZW5ndGggPCAyID8gYUZ1bmN0aW9uKGdsb2JhbFtuYW1lc3BhY2VdKSA6IGdsb2JhbFtuYW1lc3BhY2VdICYmIGdsb2JhbFtuYW1lc3BhY2VdW21ldGhvZF07XG59O1xuIiwiJ3VzZSBzdHJpY3QnO1xudmFyIGNsYXNzb2YgPSByZXF1aXJlKCcuLi9pbnRlcm5hbHMvY2xhc3NvZicpO1xudmFyIGdldE1ldGhvZCA9IHJlcXVpcmUoJy4uL2ludGVybmFscy9nZXQtbWV0aG9kJyk7XG52YXIgaXNOdWxsT3JVbmRlZmluZWQgPSByZXF1aXJlKCcuLi9pbnRlcm5hbHMvaXMtbnVsbC1vci11bmRlZmluZWQnKTtcbnZhciBJdGVyYXRvcnMgPSByZXF1aXJlKCcuLi9pbnRlcm5hbHMvaXRlcmF0b3JzJyk7XG52YXIgd2VsbEtub3duU3ltYm9sID0gcmVxdWlyZSgnLi4vaW50ZXJuYWxzL3dlbGwta25vd24tc3ltYm9sJyk7XG5cbnZhciBJVEVSQVRPUiA9IHdlbGxLbm93blN5bWJvbCgnaXRlcmF0b3InKTtcblxubW9kdWxlLmV4cG9ydHMgPSBmdW5jdGlvbiAoaXQpIHtcbiAgaWYgKCFpc051bGxPclVuZGVmaW5lZChpdCkpIHJldHVybiBnZXRNZXRob2QoaXQsIElURVJBVE9SKVxuICAgIHx8IGdldE1ldGhvZChpdCwgJ0BAaXRlcmF0b3InKVxuICAgIHx8IEl0ZXJhdG9yc1tjbGFzc29mKGl0KV07XG59O1xuIiwiJ3VzZSBzdHJpY3QnO1xudmFyIGNhbGwgPSByZXF1aXJlKCcuLi9pbnRlcm5hbHMvZnVuY3Rpb24tY2FsbCcpO1xudmFyIGFDYWxsYWJsZSA9IHJlcXVpcmUoJy4uL2ludGVybmFscy9hLWNhbGxhYmxlJyk7XG52YXIgYW5PYmplY3QgPSByZXF1aXJlKCcuLi9pbnRlcm5hbHMvYW4tb2JqZWN0Jyk7XG52YXIgdHJ5VG9TdHJpbmcgPSByZXF1aXJlKCcuLi9pbnRlcm5hbHMvdHJ5LXRvLXN0cmluZycpO1xudmFyIGdldEl0ZXJhdG9yTWV0aG9kID0gcmVxdWlyZSgnLi4vaW50ZXJuYWxzL2dldC1pdGVyYXRvci1tZXRob2QnKTtcblxudmFyICRUeXBlRXJyb3IgPSBUeXBlRXJyb3I7XG5cbm1vZHVsZS5leHBvcnRzID0gZnVuY3Rpb24gKGFyZ3VtZW50LCB1c2luZ0l0ZXJhdG9yKSB7XG4gIHZhciBpdGVyYXRvck1ldGhvZCA9IGFyZ3VtZW50cy5sZW5ndGggPCAyID8gZ2V0SXRlcmF0b3JNZXRob2QoYXJndW1lbnQpIDogdXNpbmdJdGVyYXRvcjtcbiAgaWYgKGFDYWxsYWJsZShpdGVyYXRvck1ldGhvZCkpIHJldHVybiBhbk9iamVjdChjYWxsKGl0ZXJhdG9yTWV0aG9kLCBhcmd1bWVudCkpO1xuICB0aHJvdyBuZXcgJFR5cGVFcnJvcih0cnlUb1N0cmluZyhhcmd1bWVudCkgKyAnIGlzIG5vdCBpdGVyYWJsZScpO1xufTtcbiIsIid1c2Ugc3RyaWN0JztcbnZhciBhQ2FsbGFibGUgPSByZXF1aXJlKCcuLi9pbnRlcm5hbHMvYS1jYWxsYWJsZScpO1xudmFyIGlzTnVsbE9yVW5kZWZpbmVkID0gcmVxdWlyZSgnLi4vaW50ZXJuYWxzL2lzLW51bGwtb3ItdW5kZWZpbmVkJyk7XG5cbi8vIGBHZXRNZXRob2RgIGFic3RyYWN0IG9wZXJhdGlvblxuLy8gaHR0cHM6Ly90YzM5LmVzL2VjbWEyNjIvI3NlYy1nZXRtZXRob2Rcbm1vZHVsZS5leHBvcnRzID0gZnVuY3Rpb24gKFYsIFApIHtcbiAgdmFyIGZ1bmMgPSBWW1BdO1xuICByZXR1cm4gaXNOdWxsT3JVbmRlZmluZWQoZnVuYykgPyB1bmRlZmluZWQgOiBhQ2FsbGFibGUoZnVuYyk7XG59O1xuIiwiJ3VzZSBzdHJpY3QnO1xudmFyIHVuY3VycnlUaGlzID0gcmVxdWlyZSgnLi4vaW50ZXJuYWxzL2Z1bmN0aW9uLXVuY3VycnktdGhpcycpO1xudmFyIHRvT2JqZWN0ID0gcmVxdWlyZSgnLi4vaW50ZXJuYWxzL3RvLW9iamVjdCcpO1xuXG52YXIgZmxvb3IgPSBNYXRoLmZsb29yO1xudmFyIGNoYXJBdCA9IHVuY3VycnlUaGlzKCcnLmNoYXJBdCk7XG52YXIgcmVwbGFjZSA9IHVuY3VycnlUaGlzKCcnLnJlcGxhY2UpO1xudmFyIHN0cmluZ1NsaWNlID0gdW5jdXJyeVRoaXMoJycuc2xpY2UpO1xuLy8gZXNsaW50LWRpc2FibGUtbmV4dC1saW5lIHJlZG9zL25vLXZ1bG5lcmFibGUgLS0gc2FmZVxudmFyIFNVQlNUSVRVVElPTl9TWU1CT0xTID0gL1xcJChbJCYnYF18XFxkezEsMn18PFtePl0qPikvZztcbnZhciBTVUJTVElUVVRJT05fU1lNQk9MU19OT19OQU1FRCA9IC9cXCQoWyQmJ2BdfFxcZHsxLDJ9KS9nO1xuXG4vLyBgR2V0U3Vic3RpdHV0aW9uYCBhYnN0cmFjdCBvcGVyYXRpb25cbi8vIGh0dHBzOi8vdGMzOS5lcy9lY21hMjYyLyNzZWMtZ2V0c3Vic3RpdHV0aW9uXG5tb2R1bGUuZXhwb3J0cyA9IGZ1bmN0aW9uIChtYXRjaGVkLCBzdHIsIHBvc2l0aW9uLCBjYXB0dXJlcywgbmFtZWRDYXB0dXJlcywgcmVwbGFjZW1lbnQpIHtcbiAgdmFyIHRhaWxQb3MgPSBwb3NpdGlvbiArIG1hdGNoZWQubGVuZ3RoO1xuICB2YXIgbSA9IGNhcHR1cmVzLmxlbmd0aDtcbiAgdmFyIHN5bWJvbHMgPSBTVUJTVElUVVRJT05fU1lNQk9MU19OT19OQU1FRDtcbiAgaWYgKG5hbWVkQ2FwdHVyZXMgIT09IHVuZGVmaW5lZCkge1xuICAgIG5hbWVkQ2FwdHVyZXMgPSB0b09iamVjdChuYW1lZENhcHR1cmVzKTtcbiAgICBzeW1ib2xzID0gU1VCU1RJVFVUSU9OX1NZTUJPTFM7XG4gIH1cbiAgcmV0dXJuIHJlcGxhY2UocmVwbGFjZW1lbnQsIHN5bWJvbHMsIGZ1bmN0aW9uIChtYXRjaCwgY2gpIHtcbiAgICB2YXIgY2FwdHVyZTtcbiAgICBzd2l0Y2ggKGNoYXJBdChjaCwgMCkpIHtcbiAgICAgIGNhc2UgJyQnOiByZXR1cm4gJyQnO1xuICAgICAgY2FzZSAnJic6IHJldHVybiBtYXRjaGVkO1xuICAgICAgY2FzZSAnYCc6IHJldHVybiBzdHJpbmdTbGljZShzdHIsIDAsIHBvc2l0aW9uKTtcbiAgICAgIGNhc2UgXCInXCI6IHJldHVybiBzdHJpbmdTbGljZShzdHIsIHRhaWxQb3MpO1xuICAgICAgY2FzZSAnPCc6XG4gICAgICAgIGNhcHR1cmUgPSBuYW1lZENhcHR1cmVzW3N0cmluZ1NsaWNlKGNoLCAxLCAtMSldO1xuICAgICAgICBicmVhaztcbiAgICAgIGRlZmF1bHQ6IC8vIFxcZFxcZD9cbiAgICAgICAgdmFyIG4gPSArY2g7XG4gICAgICAgIGlmIChuID09PSAwKSByZXR1cm4gbWF0Y2g7XG4gICAgICAgIGlmIChuID4gbSkge1xuICAgICAgICAgIHZhciBmID0gZmxvb3IobiAvIDEwKTtcbiAgICAgICAgICBpZiAoZiA9PT0gMCkgcmV0dXJuIG1hdGNoO1xuICAgICAgICAgIGlmIChmIDw9IG0pIHJldHVybiBjYXB0dXJlc1tmIC0gMV0gPT09IHVuZGVmaW5lZCA/IGNoYXJBdChjaCwgMSkgOiBjYXB0dXJlc1tmIC0gMV0gKyBjaGFyQXQoY2gsIDEpO1xuICAgICAgICAgIHJldHVybiBtYXRjaDtcbiAgICAgICAgfVxuICAgICAgICBjYXB0dXJlID0gY2FwdHVyZXNbbiAtIDFdO1xuICAgIH1cbiAgICByZXR1cm4gY2FwdHVyZSA9PT0gdW5kZWZpbmVkID8gJycgOiBjYXB0dXJlO1xuICB9KTtcbn07XG4iLCIndXNlIHN0cmljdCc7XG52YXIgY2hlY2sgPSBmdW5jdGlvbiAoaXQpIHtcbiAgcmV0dXJuIGl0ICYmIGl0Lk1hdGggPT09IE1hdGggJiYgaXQ7XG59O1xuXG4vLyBodHRwczovL2dpdGh1Yi5jb20vemxvaXJvY2svY29yZS1qcy9pc3N1ZXMvODYjaXNzdWVjb21tZW50LTExNTc1OTAyOFxubW9kdWxlLmV4cG9ydHMgPVxuICAvLyBlc2xpbnQtZGlzYWJsZS1uZXh0LWxpbmUgZXMvbm8tZ2xvYmFsLXRoaXMgLS0gc2FmZVxuICBjaGVjayh0eXBlb2YgZ2xvYmFsVGhpcyA9PSAnb2JqZWN0JyAmJiBnbG9iYWxUaGlzKSB8fFxuICBjaGVjayh0eXBlb2Ygd2luZG93ID09ICdvYmplY3QnICYmIHdpbmRvdykgfHxcbiAgLy8gZXNsaW50LWRpc2FibGUtbmV4dC1saW5lIG5vLXJlc3RyaWN0ZWQtZ2xvYmFscyAtLSBzYWZlXG4gIGNoZWNrKHR5cGVvZiBzZWxmID09ICdvYmplY3QnICYmIHNlbGYpIHx8XG4gIGNoZWNrKHR5cGVvZiBnbG9iYWwgPT0gJ29iamVjdCcgJiYgZ2xvYmFsKSB8fFxuICBjaGVjayh0eXBlb2YgdGhpcyA9PSAnb2JqZWN0JyAmJiB0aGlzKSB8fFxuICAvLyBlc2xpbnQtZGlzYWJsZS1uZXh0LWxpbmUgbm8tbmV3LWZ1bmMgLS0gZmFsbGJhY2tcbiAgKGZ1bmN0aW9uICgpIHsgcmV0dXJuIHRoaXM7IH0pKCkgfHwgRnVuY3Rpb24oJ3JldHVybiB0aGlzJykoKTtcbiIsIid1c2Ugc3RyaWN0JztcbnZhciB1bmN1cnJ5VGhpcyA9IHJlcXVpcmUoJy4uL2ludGVybmFscy9mdW5jdGlvbi11bmN1cnJ5LXRoaXMnKTtcbnZhciB0b09iamVjdCA9IHJlcXVpcmUoJy4uL2ludGVybmFscy90by1vYmplY3QnKTtcblxudmFyIGhhc093blByb3BlcnR5ID0gdW5jdXJyeVRoaXMoe30uaGFzT3duUHJvcGVydHkpO1xuXG4vLyBgSGFzT3duUHJvcGVydHlgIGFic3RyYWN0IG9wZXJhdGlvblxuLy8gaHR0cHM6Ly90YzM5LmVzL2VjbWEyNjIvI3NlYy1oYXNvd25wcm9wZXJ0eVxuLy8gZXNsaW50LWRpc2FibGUtbmV4dC1saW5lIGVzL25vLW9iamVjdC1oYXNvd24gLS0gc2FmZVxubW9kdWxlLmV4cG9ydHMgPSBPYmplY3QuaGFzT3duIHx8IGZ1bmN0aW9uIGhhc093bihpdCwga2V5KSB7XG4gIHJldHVybiBoYXNPd25Qcm9wZXJ0eSh0b09iamVjdChpdCksIGtleSk7XG59O1xuIiwiJ3VzZSBzdHJpY3QnO1xubW9kdWxlLmV4cG9ydHMgPSB7fTtcbiIsIid1c2Ugc3RyaWN0JztcbnZhciBnZXRCdWlsdEluID0gcmVxdWlyZSgnLi4vaW50ZXJuYWxzL2dldC1idWlsdC1pbicpO1xuXG5tb2R1bGUuZXhwb3J0cyA9IGdldEJ1aWx0SW4oJ2RvY3VtZW50JywgJ2RvY3VtZW50RWxlbWVudCcpO1xuIiwiJ3VzZSBzdHJpY3QnO1xudmFyIERFU0NSSVBUT1JTID0gcmVxdWlyZSgnLi4vaW50ZXJuYWxzL2Rlc2NyaXB0b3JzJyk7XG52YXIgZmFpbHMgPSByZXF1aXJlKCcuLi9pbnRlcm5hbHMvZmFpbHMnKTtcbnZhciBjcmVhdGVFbGVtZW50ID0gcmVxdWlyZSgnLi4vaW50ZXJuYWxzL2RvY3VtZW50LWNyZWF0ZS1lbGVtZW50Jyk7XG5cbi8vIFRoYW5rcyB0byBJRTggZm9yIGl0cyBmdW5ueSBkZWZpbmVQcm9wZXJ0eVxubW9kdWxlLmV4cG9ydHMgPSAhREVTQ1JJUFRPUlMgJiYgIWZhaWxzKGZ1bmN0aW9uICgpIHtcbiAgLy8gZXNsaW50LWRpc2FibGUtbmV4dC1saW5lIGVzL25vLW9iamVjdC1kZWZpbmVwcm9wZXJ0eSAtLSByZXF1aXJlZCBmb3IgdGVzdGluZ1xuICByZXR1cm4gT2JqZWN0LmRlZmluZVByb3BlcnR5KGNyZWF0ZUVsZW1lbnQoJ2RpdicpLCAnYScsIHtcbiAgICBnZXQ6IGZ1bmN0aW9uICgpIHsgcmV0dXJuIDc7IH1cbiAgfSkuYSAhPT0gNztcbn0pO1xuIiwiJ3VzZSBzdHJpY3QnO1xudmFyIHVuY3VycnlUaGlzID0gcmVxdWlyZSgnLi4vaW50ZXJuYWxzL2Z1bmN0aW9uLXVuY3VycnktdGhpcycpO1xudmFyIGZhaWxzID0gcmVxdWlyZSgnLi4vaW50ZXJuYWxzL2ZhaWxzJyk7XG52YXIgY2xhc3NvZiA9IHJlcXVpcmUoJy4uL2ludGVybmFscy9jbGFzc29mLXJhdycpO1xuXG52YXIgJE9iamVjdCA9IE9iamVjdDtcbnZhciBzcGxpdCA9IHVuY3VycnlUaGlzKCcnLnNwbGl0KTtcblxuLy8gZmFsbGJhY2sgZm9yIG5vbi1hcnJheS1saWtlIEVTMyBhbmQgbm9uLWVudW1lcmFibGUgb2xkIFY4IHN0cmluZ3Ncbm1vZHVsZS5leHBvcnRzID0gZmFpbHMoZnVuY3Rpb24gKCkge1xuICAvLyB0aHJvd3MgYW4gZXJyb3IgaW4gcmhpbm8sIHNlZSBodHRwczovL2dpdGh1Yi5jb20vbW96aWxsYS9yaGluby9pc3N1ZXMvMzQ2XG4gIC8vIGVzbGludC1kaXNhYmxlLW5leHQtbGluZSBuby1wcm90b3R5cGUtYnVpbHRpbnMgLS0gc2FmZVxuICByZXR1cm4gISRPYmplY3QoJ3onKS5wcm9wZXJ0eUlzRW51bWVyYWJsZSgwKTtcbn0pID8gZnVuY3Rpb24gKGl0KSB7XG4gIHJldHVybiBjbGFzc29mKGl0KSA9PT0gJ1N0cmluZycgPyBzcGxpdChpdCwgJycpIDogJE9iamVjdChpdCk7XG59IDogJE9iamVjdDtcbiIsIid1c2Ugc3RyaWN0JztcbnZhciBpc0NhbGxhYmxlID0gcmVxdWlyZSgnLi4vaW50ZXJuYWxzL2lzLWNhbGxhYmxlJyk7XG52YXIgaXNPYmplY3QgPSByZXF1aXJlKCcuLi9pbnRlcm5hbHMvaXMtb2JqZWN0Jyk7XG52YXIgc2V0UHJvdG90eXBlT2YgPSByZXF1aXJlKCcuLi9pbnRlcm5hbHMvb2JqZWN0LXNldC1wcm90b3R5cGUtb2YnKTtcblxuLy8gbWFrZXMgc3ViY2xhc3Npbmcgd29yayBjb3JyZWN0IGZvciB3cmFwcGVkIGJ1aWx0LWluc1xubW9kdWxlLmV4cG9ydHMgPSBmdW5jdGlvbiAoJHRoaXMsIGR1bW15LCBXcmFwcGVyKSB7XG4gIHZhciBOZXdUYXJnZXQsIE5ld1RhcmdldFByb3RvdHlwZTtcbiAgaWYgKFxuICAgIC8vIGl0IGNhbiB3b3JrIG9ubHkgd2l0aCBuYXRpdmUgYHNldFByb3RvdHlwZU9mYFxuICAgIHNldFByb3RvdHlwZU9mICYmXG4gICAgLy8gd2UgaGF2ZW4ndCBjb21wbGV0ZWx5IGNvcnJlY3QgcHJlLUVTNiB3YXkgZm9yIGdldHRpbmcgYG5ldy50YXJnZXRgLCBzbyB1c2UgdGhpc1xuICAgIGlzQ2FsbGFibGUoTmV3VGFyZ2V0ID0gZHVtbXkuY29uc3RydWN0b3IpICYmXG4gICAgTmV3VGFyZ2V0ICE9PSBXcmFwcGVyICYmXG4gICAgaXNPYmplY3QoTmV3VGFyZ2V0UHJvdG90eXBlID0gTmV3VGFyZ2V0LnByb3RvdHlwZSkgJiZcbiAgICBOZXdUYXJnZXRQcm90b3R5cGUgIT09IFdyYXBwZXIucHJvdG90eXBlXG4gICkgc2V0UHJvdG90eXBlT2YoJHRoaXMsIE5ld1RhcmdldFByb3RvdHlwZSk7XG4gIHJldHVybiAkdGhpcztcbn07XG4iLCIndXNlIHN0cmljdCc7XG52YXIgdW5jdXJyeVRoaXMgPSByZXF1aXJlKCcuLi9pbnRlcm5hbHMvZnVuY3Rpb24tdW5jdXJyeS10aGlzJyk7XG52YXIgaXNDYWxsYWJsZSA9IHJlcXVpcmUoJy4uL2ludGVybmFscy9pcy1jYWxsYWJsZScpO1xudmFyIHN0b3JlID0gcmVxdWlyZSgnLi4vaW50ZXJuYWxzL3NoYXJlZC1zdG9yZScpO1xuXG52YXIgZnVuY3Rpb25Ub1N0cmluZyA9IHVuY3VycnlUaGlzKEZ1bmN0aW9uLnRvU3RyaW5nKTtcblxuLy8gdGhpcyBoZWxwZXIgYnJva2VuIGluIGBjb3JlLWpzQDMuNC4xLTMuNC40YCwgc28gd2UgY2FuJ3QgdXNlIGBzaGFyZWRgIGhlbHBlclxuaWYgKCFpc0NhbGxhYmxlKHN0b3JlLmluc3BlY3RTb3VyY2UpKSB7XG4gIHN0b3JlLmluc3BlY3RTb3VyY2UgPSBmdW5jdGlvbiAoaXQpIHtcbiAgICByZXR1cm4gZnVuY3Rpb25Ub1N0cmluZyhpdCk7XG4gIH07XG59XG5cbm1vZHVsZS5leHBvcnRzID0gc3RvcmUuaW5zcGVjdFNvdXJjZTtcbiIsIid1c2Ugc3RyaWN0JztcbnZhciBOQVRJVkVfV0VBS19NQVAgPSByZXF1aXJlKCcuLi9pbnRlcm5hbHMvd2Vhay1tYXAtYmFzaWMtZGV0ZWN0aW9uJyk7XG52YXIgZ2xvYmFsID0gcmVxdWlyZSgnLi4vaW50ZXJuYWxzL2dsb2JhbCcpO1xudmFyIGlzT2JqZWN0ID0gcmVxdWlyZSgnLi4vaW50ZXJuYWxzL2lzLW9iamVjdCcpO1xudmFyIGNyZWF0ZU5vbkVudW1lcmFibGVQcm9wZXJ0eSA9IHJlcXVpcmUoJy4uL2ludGVybmFscy9jcmVhdGUtbm9uLWVudW1lcmFibGUtcHJvcGVydHknKTtcbnZhciBoYXNPd24gPSByZXF1aXJlKCcuLi9pbnRlcm5hbHMvaGFzLW93bi1wcm9wZXJ0eScpO1xudmFyIHNoYXJlZCA9IHJlcXVpcmUoJy4uL2ludGVybmFscy9zaGFyZWQtc3RvcmUnKTtcbnZhciBzaGFyZWRLZXkgPSByZXF1aXJlKCcuLi9pbnRlcm5hbHMvc2hhcmVkLWtleScpO1xudmFyIGhpZGRlbktleXMgPSByZXF1aXJlKCcuLi9pbnRlcm5hbHMvaGlkZGVuLWtleXMnKTtcblxudmFyIE9CSkVDVF9BTFJFQURZX0lOSVRJQUxJWkVEID0gJ09iamVjdCBhbHJlYWR5IGluaXRpYWxpemVkJztcbnZhciBUeXBlRXJyb3IgPSBnbG9iYWwuVHlwZUVycm9yO1xudmFyIFdlYWtNYXAgPSBnbG9iYWwuV2Vha01hcDtcbnZhciBzZXQsIGdldCwgaGFzO1xuXG52YXIgZW5mb3JjZSA9IGZ1bmN0aW9uIChpdCkge1xuICByZXR1cm4gaGFzKGl0KSA/IGdldChpdCkgOiBzZXQoaXQsIHt9KTtcbn07XG5cbnZhciBnZXR0ZXJGb3IgPSBmdW5jdGlvbiAoVFlQRSkge1xuICByZXR1cm4gZnVuY3Rpb24gKGl0KSB7XG4gICAgdmFyIHN0YXRlO1xuICAgIGlmICghaXNPYmplY3QoaXQpIHx8IChzdGF0ZSA9IGdldChpdCkpLnR5cGUgIT09IFRZUEUpIHtcbiAgICAgIHRocm93IG5ldyBUeXBlRXJyb3IoJ0luY29tcGF0aWJsZSByZWNlaXZlciwgJyArIFRZUEUgKyAnIHJlcXVpcmVkJyk7XG4gICAgfSByZXR1cm4gc3RhdGU7XG4gIH07XG59O1xuXG5pZiAoTkFUSVZFX1dFQUtfTUFQIHx8IHNoYXJlZC5zdGF0ZSkge1xuICB2YXIgc3RvcmUgPSBzaGFyZWQuc3RhdGUgfHwgKHNoYXJlZC5zdGF0ZSA9IG5ldyBXZWFrTWFwKCkpO1xuICAvKiBlc2xpbnQtZGlzYWJsZSBuby1zZWxmLWFzc2lnbiAtLSBwcm90b3R5cGUgbWV0aG9kcyBwcm90ZWN0aW9uICovXG4gIHN0b3JlLmdldCA9IHN0b3JlLmdldDtcbiAgc3RvcmUuaGFzID0gc3RvcmUuaGFzO1xuICBzdG9yZS5zZXQgPSBzdG9yZS5zZXQ7XG4gIC8qIGVzbGludC1lbmFibGUgbm8tc2VsZi1hc3NpZ24gLS0gcHJvdG90eXBlIG1ldGhvZHMgcHJvdGVjdGlvbiAqL1xuICBzZXQgPSBmdW5jdGlvbiAoaXQsIG1ldGFkYXRhKSB7XG4gICAgaWYgKHN0b3JlLmhhcyhpdCkpIHRocm93IG5ldyBUeXBlRXJyb3IoT0JKRUNUX0FMUkVBRFlfSU5JVElBTElaRUQpO1xuICAgIG1ldGFkYXRhLmZhY2FkZSA9IGl0O1xuICAgIHN0b3JlLnNldChpdCwgbWV0YWRhdGEpO1xuICAgIHJldHVybiBtZXRhZGF0YTtcbiAgfTtcbiAgZ2V0ID0gZnVuY3Rpb24gKGl0KSB7XG4gICAgcmV0dXJuIHN0b3JlLmdldChpdCkgfHwge307XG4gIH07XG4gIGhhcyA9IGZ1bmN0aW9uIChpdCkge1xuICAgIHJldHVybiBzdG9yZS5oYXMoaXQpO1xuICB9O1xufSBlbHNlIHtcbiAgdmFyIFNUQVRFID0gc2hhcmVkS2V5KCdzdGF0ZScpO1xuICBoaWRkZW5LZXlzW1NUQVRFXSA9IHRydWU7XG4gIHNldCA9IGZ1bmN0aW9uIChpdCwgbWV0YWRhdGEpIHtcbiAgICBpZiAoaGFzT3duKGl0LCBTVEFURSkpIHRocm93IG5ldyBUeXBlRXJyb3IoT0JKRUNUX0FMUkVBRFlfSU5JVElBTElaRUQpO1xuICAgIG1ldGFkYXRhLmZhY2FkZSA9IGl0O1xuICAgIGNyZWF0ZU5vbkVudW1lcmFibGVQcm9wZXJ0eShpdCwgU1RBVEUsIG1ldGFkYXRhKTtcbiAgICByZXR1cm4gbWV0YWRhdGE7XG4gIH07XG4gIGdldCA9IGZ1bmN0aW9uIChpdCkge1xuICAgIHJldHVybiBoYXNPd24oaXQsIFNUQVRFKSA/IGl0W1NUQVRFXSA6IHt9O1xuICB9O1xuICBoYXMgPSBmdW5jdGlvbiAoaXQpIHtcbiAgICByZXR1cm4gaGFzT3duKGl0LCBTVEFURSk7XG4gIH07XG59XG5cbm1vZHVsZS5leHBvcnRzID0ge1xuICBzZXQ6IHNldCxcbiAgZ2V0OiBnZXQsXG4gIGhhczogaGFzLFxuICBlbmZvcmNlOiBlbmZvcmNlLFxuICBnZXR0ZXJGb3I6IGdldHRlckZvclxufTtcbiIsIid1c2Ugc3RyaWN0JztcbnZhciB3ZWxsS25vd25TeW1ib2wgPSByZXF1aXJlKCcuLi9pbnRlcm5hbHMvd2VsbC1rbm93bi1zeW1ib2wnKTtcbnZhciBJdGVyYXRvcnMgPSByZXF1aXJlKCcuLi9pbnRlcm5hbHMvaXRlcmF0b3JzJyk7XG5cbnZhciBJVEVSQVRPUiA9IHdlbGxLbm93blN5bWJvbCgnaXRlcmF0b3InKTtcbnZhciBBcnJheVByb3RvdHlwZSA9IEFycmF5LnByb3RvdHlwZTtcblxuLy8gY2hlY2sgb24gZGVmYXVsdCBBcnJheSBpdGVyYXRvclxubW9kdWxlLmV4cG9ydHMgPSBmdW5jdGlvbiAoaXQpIHtcbiAgcmV0dXJuIGl0ICE9PSB1bmRlZmluZWQgJiYgKEl0ZXJhdG9ycy5BcnJheSA9PT0gaXQgfHwgQXJyYXlQcm90b3R5cGVbSVRFUkFUT1JdID09PSBpdCk7XG59O1xuIiwiJ3VzZSBzdHJpY3QnO1xuLy8gaHR0cHM6Ly90YzM5LmVzL2VjbWEyNjIvI3NlYy1Jc0hUTUxEREEtaW50ZXJuYWwtc2xvdFxudmFyIGRvY3VtZW50QWxsID0gdHlwZW9mIGRvY3VtZW50ID09ICdvYmplY3QnICYmIGRvY3VtZW50LmFsbDtcblxuLy8gYElzQ2FsbGFibGVgIGFic3RyYWN0IG9wZXJhdGlvblxuLy8gaHR0cHM6Ly90YzM5LmVzL2VjbWEyNjIvI3NlYy1pc2NhbGxhYmxlXG4vLyBlc2xpbnQtZGlzYWJsZS1uZXh0LWxpbmUgdW5pY29ybi9uby10eXBlb2YtdW5kZWZpbmVkIC0tIHJlcXVpcmVkIGZvciB0ZXN0aW5nXG5tb2R1bGUuZXhwb3J0cyA9IHR5cGVvZiBkb2N1bWVudEFsbCA9PSAndW5kZWZpbmVkJyAmJiBkb2N1bWVudEFsbCAhPT0gdW5kZWZpbmVkID8gZnVuY3Rpb24gKGFyZ3VtZW50KSB7XG4gIHJldHVybiB0eXBlb2YgYXJndW1lbnQgPT0gJ2Z1bmN0aW9uJyB8fCBhcmd1bWVudCA9PT0gZG9jdW1lbnRBbGw7XG59IDogZnVuY3Rpb24gKGFyZ3VtZW50KSB7XG4gIHJldHVybiB0eXBlb2YgYXJndW1lbnQgPT0gJ2Z1bmN0aW9uJztcbn07XG4iLCIndXNlIHN0cmljdCc7XG52YXIgdW5jdXJyeVRoaXMgPSByZXF1aXJlKCcuLi9pbnRlcm5hbHMvZnVuY3Rpb24tdW5jdXJyeS10aGlzJyk7XG52YXIgZmFpbHMgPSByZXF1aXJlKCcuLi9pbnRlcm5hbHMvZmFpbHMnKTtcbnZhciBpc0NhbGxhYmxlID0gcmVxdWlyZSgnLi4vaW50ZXJuYWxzL2lzLWNhbGxhYmxlJyk7XG52YXIgY2xhc3NvZiA9IHJlcXVpcmUoJy4uL2ludGVybmFscy9jbGFzc29mJyk7XG52YXIgZ2V0QnVpbHRJbiA9IHJlcXVpcmUoJy4uL2ludGVybmFscy9nZXQtYnVpbHQtaW4nKTtcbnZhciBpbnNwZWN0U291cmNlID0gcmVxdWlyZSgnLi4vaW50ZXJuYWxzL2luc3BlY3Qtc291cmNlJyk7XG5cbnZhciBub29wID0gZnVuY3Rpb24gKCkgeyAvKiBlbXB0eSAqLyB9O1xudmFyIGNvbnN0cnVjdCA9IGdldEJ1aWx0SW4oJ1JlZmxlY3QnLCAnY29uc3RydWN0Jyk7XG52YXIgY29uc3RydWN0b3JSZWdFeHAgPSAvXlxccyooPzpjbGFzc3xmdW5jdGlvbilcXGIvO1xudmFyIGV4ZWMgPSB1bmN1cnJ5VGhpcyhjb25zdHJ1Y3RvclJlZ0V4cC5leGVjKTtcbnZhciBJTkNPUlJFQ1RfVE9fU1RSSU5HID0gIWNvbnN0cnVjdG9yUmVnRXhwLnRlc3Qobm9vcCk7XG5cbnZhciBpc0NvbnN0cnVjdG9yTW9kZXJuID0gZnVuY3Rpb24gaXNDb25zdHJ1Y3Rvcihhcmd1bWVudCkge1xuICBpZiAoIWlzQ2FsbGFibGUoYXJndW1lbnQpKSByZXR1cm4gZmFsc2U7XG4gIHRyeSB7XG4gICAgY29uc3RydWN0KG5vb3AsIFtdLCBhcmd1bWVudCk7XG4gICAgcmV0dXJuIHRydWU7XG4gIH0gY2F0Y2ggKGVycm9yKSB7XG4gICAgcmV0dXJuIGZhbHNlO1xuICB9XG59O1xuXG52YXIgaXNDb25zdHJ1Y3RvckxlZ2FjeSA9IGZ1bmN0aW9uIGlzQ29uc3RydWN0b3IoYXJndW1lbnQpIHtcbiAgaWYgKCFpc0NhbGxhYmxlKGFyZ3VtZW50KSkgcmV0dXJuIGZhbHNlO1xuICBzd2l0Y2ggKGNsYXNzb2YoYXJndW1lbnQpKSB7XG4gICAgY2FzZSAnQXN5bmNGdW5jdGlvbic6XG4gICAgY2FzZSAnR2VuZXJhdG9yRnVuY3Rpb24nOlxuICAgIGNhc2UgJ0FzeW5jR2VuZXJhdG9yRnVuY3Rpb24nOiByZXR1cm4gZmFsc2U7XG4gIH1cbiAgdHJ5IHtcbiAgICAvLyB3ZSBjYW4ndCBjaGVjayAucHJvdG90eXBlIHNpbmNlIGNvbnN0cnVjdG9ycyBwcm9kdWNlZCBieSAuYmluZCBoYXZlbid0IGl0XG4gICAgLy8gYEZ1bmN0aW9uI3RvU3RyaW5nYCB0aHJvd3Mgb24gc29tZSBidWlsdC1pdCBmdW5jdGlvbiBpbiBzb21lIGxlZ2FjeSBlbmdpbmVzXG4gICAgLy8gKGZvciBleGFtcGxlLCBgRE9NUXVhZGAgYW5kIHNpbWlsYXIgaW4gRkY0MS0pXG4gICAgcmV0dXJuIElOQ09SUkVDVF9UT19TVFJJTkcgfHwgISFleGVjKGNvbnN0cnVjdG9yUmVnRXhwLCBpbnNwZWN0U291cmNlKGFyZ3VtZW50KSk7XG4gIH0gY2F0Y2ggKGVycm9yKSB7XG4gICAgcmV0dXJuIHRydWU7XG4gIH1cbn07XG5cbmlzQ29uc3RydWN0b3JMZWdhY3kuc2hhbSA9IHRydWU7XG5cbi8vIGBJc0NvbnN0cnVjdG9yYCBhYnN0cmFjdCBvcGVyYXRpb25cbi8vIGh0dHBzOi8vdGMzOS5lcy9lY21hMjYyLyNzZWMtaXNjb25zdHJ1Y3RvclxubW9kdWxlLmV4cG9ydHMgPSAhY29uc3RydWN0IHx8IGZhaWxzKGZ1bmN0aW9uICgpIHtcbiAgdmFyIGNhbGxlZDtcbiAgcmV0dXJuIGlzQ29uc3RydWN0b3JNb2Rlcm4oaXNDb25zdHJ1Y3Rvck1vZGVybi5jYWxsKVxuICAgIHx8ICFpc0NvbnN0cnVjdG9yTW9kZXJuKE9iamVjdClcbiAgICB8fCAhaXNDb25zdHJ1Y3Rvck1vZGVybihmdW5jdGlvbiAoKSB7IGNhbGxlZCA9IHRydWU7IH0pXG4gICAgfHwgY2FsbGVkO1xufSkgPyBpc0NvbnN0cnVjdG9yTGVnYWN5IDogaXNDb25zdHJ1Y3Rvck1vZGVybjtcbiIsIid1c2Ugc3RyaWN0JztcbnZhciBmYWlscyA9IHJlcXVpcmUoJy4uL2ludGVybmFscy9mYWlscycpO1xudmFyIGlzQ2FsbGFibGUgPSByZXF1aXJlKCcuLi9pbnRlcm5hbHMvaXMtY2FsbGFibGUnKTtcblxudmFyIHJlcGxhY2VtZW50ID0gLyN8XFwucHJvdG90eXBlXFwuLztcblxudmFyIGlzRm9yY2VkID0gZnVuY3Rpb24gKGZlYXR1cmUsIGRldGVjdGlvbikge1xuICB2YXIgdmFsdWUgPSBkYXRhW25vcm1hbGl6ZShmZWF0dXJlKV07XG4gIHJldHVybiB2YWx1ZSA9PT0gUE9MWUZJTEwgPyB0cnVlXG4gICAgOiB2YWx1ZSA9PT0gTkFUSVZFID8gZmFsc2VcbiAgICA6IGlzQ2FsbGFibGUoZGV0ZWN0aW9uKSA/IGZhaWxzKGRldGVjdGlvbilcbiAgICA6ICEhZGV0ZWN0aW9uO1xufTtcblxudmFyIG5vcm1hbGl6ZSA9IGlzRm9yY2VkLm5vcm1hbGl6ZSA9IGZ1bmN0aW9uIChzdHJpbmcpIHtcbiAgcmV0dXJuIFN0cmluZyhzdHJpbmcpLnJlcGxhY2UocmVwbGFjZW1lbnQsICcuJykudG9Mb3dlckNhc2UoKTtcbn07XG5cbnZhciBkYXRhID0gaXNGb3JjZWQuZGF0YSA9IHt9O1xudmFyIE5BVElWRSA9IGlzRm9yY2VkLk5BVElWRSA9ICdOJztcbnZhciBQT0xZRklMTCA9IGlzRm9yY2VkLlBPTFlGSUxMID0gJ1AnO1xuXG5tb2R1bGUuZXhwb3J0cyA9IGlzRm9yY2VkO1xuIiwiJ3VzZSBzdHJpY3QnO1xuLy8gd2UgY2FuJ3QgdXNlIGp1c3QgYGl0ID09IG51bGxgIHNpbmNlIG9mIGBkb2N1bWVudC5hbGxgIHNwZWNpYWwgY2FzZVxuLy8gaHR0cHM6Ly90YzM5LmVzL2VjbWEyNjIvI3NlYy1Jc0hUTUxEREEtaW50ZXJuYWwtc2xvdC1hZWNcbm1vZHVsZS5leHBvcnRzID0gZnVuY3Rpb24gKGl0KSB7XG4gIHJldHVybiBpdCA9PT0gbnVsbCB8fCBpdCA9PT0gdW5kZWZpbmVkO1xufTtcbiIsIid1c2Ugc3RyaWN0JztcbnZhciBpc0NhbGxhYmxlID0gcmVxdWlyZSgnLi4vaW50ZXJuYWxzL2lzLWNhbGxhYmxlJyk7XG5cbm1vZHVsZS5leHBvcnRzID0gZnVuY3Rpb24gKGl0KSB7XG4gIHJldHVybiB0eXBlb2YgaXQgPT0gJ29iamVjdCcgPyBpdCAhPT0gbnVsbCA6IGlzQ2FsbGFibGUoaXQpO1xufTtcbiIsIid1c2Ugc3RyaWN0JztcbnZhciBpc09iamVjdCA9IHJlcXVpcmUoJy4uL2ludGVybmFscy9pcy1vYmplY3QnKTtcblxubW9kdWxlLmV4cG9ydHMgPSBmdW5jdGlvbiAoYXJndW1lbnQpIHtcbiAgcmV0dXJuIGlzT2JqZWN0KGFyZ3VtZW50KSB8fCBhcmd1bWVudCA9PT0gbnVsbDtcbn07XG4iLCIndXNlIHN0cmljdCc7XG5tb2R1bGUuZXhwb3J0cyA9IGZhbHNlO1xuIiwiJ3VzZSBzdHJpY3QnO1xudmFyIGlzT2JqZWN0ID0gcmVxdWlyZSgnLi4vaW50ZXJuYWxzL2lzLW9iamVjdCcpO1xudmFyIGNsYXNzb2YgPSByZXF1aXJlKCcuLi9pbnRlcm5hbHMvY2xhc3NvZi1yYXcnKTtcbnZhciB3ZWxsS25vd25TeW1ib2wgPSByZXF1aXJlKCcuLi9pbnRlcm5hbHMvd2VsbC1rbm93bi1zeW1ib2wnKTtcblxudmFyIE1BVENIID0gd2VsbEtub3duU3ltYm9sKCdtYXRjaCcpO1xuXG4vLyBgSXNSZWdFeHBgIGFic3RyYWN0IG9wZXJhdGlvblxuLy8gaHR0cHM6Ly90YzM5LmVzL2VjbWEyNjIvI3NlYy1pc3JlZ2V4cFxubW9kdWxlLmV4cG9ydHMgPSBmdW5jdGlvbiAoaXQpIHtcbiAgdmFyIGlzUmVnRXhwO1xuICByZXR1cm4gaXNPYmplY3QoaXQpICYmICgoaXNSZWdFeHAgPSBpdFtNQVRDSF0pICE9PSB1bmRlZmluZWQgPyAhIWlzUmVnRXhwIDogY2xhc3NvZihpdCkgPT09ICdSZWdFeHAnKTtcbn07XG4iLCIndXNlIHN0cmljdCc7XG52YXIgZ2V0QnVpbHRJbiA9IHJlcXVpcmUoJy4uL2ludGVybmFscy9nZXQtYnVpbHQtaW4nKTtcbnZhciBpc0NhbGxhYmxlID0gcmVxdWlyZSgnLi4vaW50ZXJuYWxzL2lzLWNhbGxhYmxlJyk7XG52YXIgaXNQcm90b3R5cGVPZiA9IHJlcXVpcmUoJy4uL2ludGVybmFscy9vYmplY3QtaXMtcHJvdG90eXBlLW9mJyk7XG52YXIgVVNFX1NZTUJPTF9BU19VSUQgPSByZXF1aXJlKCcuLi9pbnRlcm5hbHMvdXNlLXN5bWJvbC1hcy11aWQnKTtcblxudmFyICRPYmplY3QgPSBPYmplY3Q7XG5cbm1vZHVsZS5leHBvcnRzID0gVVNFX1NZTUJPTF9BU19VSUQgPyBmdW5jdGlvbiAoaXQpIHtcbiAgcmV0dXJuIHR5cGVvZiBpdCA9PSAnc3ltYm9sJztcbn0gOiBmdW5jdGlvbiAoaXQpIHtcbiAgdmFyICRTeW1ib2wgPSBnZXRCdWlsdEluKCdTeW1ib2wnKTtcbiAgcmV0dXJuIGlzQ2FsbGFibGUoJFN5bWJvbCkgJiYgaXNQcm90b3R5cGVPZigkU3ltYm9sLnByb3RvdHlwZSwgJE9iamVjdChpdCkpO1xufTtcbiIsIid1c2Ugc3RyaWN0JztcbnZhciBjYWxsID0gcmVxdWlyZSgnLi4vaW50ZXJuYWxzL2Z1bmN0aW9uLWNhbGwnKTtcbnZhciBhbk9iamVjdCA9IHJlcXVpcmUoJy4uL2ludGVybmFscy9hbi1vYmplY3QnKTtcbnZhciBnZXRNZXRob2QgPSByZXF1aXJlKCcuLi9pbnRlcm5hbHMvZ2V0LW1ldGhvZCcpO1xuXG5tb2R1bGUuZXhwb3J0cyA9IGZ1bmN0aW9uIChpdGVyYXRvciwga2luZCwgdmFsdWUpIHtcbiAgdmFyIGlubmVyUmVzdWx0LCBpbm5lckVycm9yO1xuICBhbk9iamVjdChpdGVyYXRvcik7XG4gIHRyeSB7XG4gICAgaW5uZXJSZXN1bHQgPSBnZXRNZXRob2QoaXRlcmF0b3IsICdyZXR1cm4nKTtcbiAgICBpZiAoIWlubmVyUmVzdWx0KSB7XG4gICAgICBpZiAoa2luZCA9PT0gJ3Rocm93JykgdGhyb3cgdmFsdWU7XG4gICAgICByZXR1cm4gdmFsdWU7XG4gICAgfVxuICAgIGlubmVyUmVzdWx0ID0gY2FsbChpbm5lclJlc3VsdCwgaXRlcmF0b3IpO1xuICB9IGNhdGNoIChlcnJvcikge1xuICAgIGlubmVyRXJyb3IgPSB0cnVlO1xuICAgIGlubmVyUmVzdWx0ID0gZXJyb3I7XG4gIH1cbiAgaWYgKGtpbmQgPT09ICd0aHJvdycpIHRocm93IHZhbHVlO1xuICBpZiAoaW5uZXJFcnJvcikgdGhyb3cgaW5uZXJSZXN1bHQ7XG4gIGFuT2JqZWN0KGlubmVyUmVzdWx0KTtcbiAgcmV0dXJuIHZhbHVlO1xufTtcbiIsIid1c2Ugc3RyaWN0JztcbnZhciBJdGVyYXRvclByb3RvdHlwZSA9IHJlcXVpcmUoJy4uL2ludGVybmFscy9pdGVyYXRvcnMtY29yZScpLkl0ZXJhdG9yUHJvdG90eXBlO1xudmFyIGNyZWF0ZSA9IHJlcXVpcmUoJy4uL2ludGVybmFscy9vYmplY3QtY3JlYXRlJyk7XG52YXIgY3JlYXRlUHJvcGVydHlEZXNjcmlwdG9yID0gcmVxdWlyZSgnLi4vaW50ZXJuYWxzL2NyZWF0ZS1wcm9wZXJ0eS1kZXNjcmlwdG9yJyk7XG52YXIgc2V0VG9TdHJpbmdUYWcgPSByZXF1aXJlKCcuLi9pbnRlcm5hbHMvc2V0LXRvLXN0cmluZy10YWcnKTtcbnZhciBJdGVyYXRvcnMgPSByZXF1aXJlKCcuLi9pbnRlcm5hbHMvaXRlcmF0b3JzJyk7XG5cbnZhciByZXR1cm5UaGlzID0gZnVuY3Rpb24gKCkgeyByZXR1cm4gdGhpczsgfTtcblxubW9kdWxlLmV4cG9ydHMgPSBmdW5jdGlvbiAoSXRlcmF0b3JDb25zdHJ1Y3RvciwgTkFNRSwgbmV4dCwgRU5VTUVSQUJMRV9ORVhUKSB7XG4gIHZhciBUT19TVFJJTkdfVEFHID0gTkFNRSArICcgSXRlcmF0b3InO1xuICBJdGVyYXRvckNvbnN0cnVjdG9yLnByb3RvdHlwZSA9IGNyZWF0ZShJdGVyYXRvclByb3RvdHlwZSwgeyBuZXh0OiBjcmVhdGVQcm9wZXJ0eURlc2NyaXB0b3IoKyFFTlVNRVJBQkxFX05FWFQsIG5leHQpIH0pO1xuICBzZXRUb1N0cmluZ1RhZyhJdGVyYXRvckNvbnN0cnVjdG9yLCBUT19TVFJJTkdfVEFHLCBmYWxzZSwgdHJ1ZSk7XG4gIEl0ZXJhdG9yc1tUT19TVFJJTkdfVEFHXSA9IHJldHVyblRoaXM7XG4gIHJldHVybiBJdGVyYXRvckNvbnN0cnVjdG9yO1xufTtcbiIsIid1c2Ugc3RyaWN0JztcbnZhciAkID0gcmVxdWlyZSgnLi4vaW50ZXJuYWxzL2V4cG9ydCcpO1xudmFyIGNhbGwgPSByZXF1aXJlKCcuLi9pbnRlcm5hbHMvZnVuY3Rpb24tY2FsbCcpO1xudmFyIElTX1BVUkUgPSByZXF1aXJlKCcuLi9pbnRlcm5hbHMvaXMtcHVyZScpO1xudmFyIEZ1bmN0aW9uTmFtZSA9IHJlcXVpcmUoJy4uL2ludGVybmFscy9mdW5jdGlvbi1uYW1lJyk7XG52YXIgaXNDYWxsYWJsZSA9IHJlcXVpcmUoJy4uL2ludGVybmFscy9pcy1jYWxsYWJsZScpO1xudmFyIGNyZWF0ZUl0ZXJhdG9yQ29uc3RydWN0b3IgPSByZXF1aXJlKCcuLi9pbnRlcm5hbHMvaXRlcmF0b3ItY3JlYXRlLWNvbnN0cnVjdG9yJyk7XG52YXIgZ2V0UHJvdG90eXBlT2YgPSByZXF1aXJlKCcuLi9pbnRlcm5hbHMvb2JqZWN0LWdldC1wcm90b3R5cGUtb2YnKTtcbnZhciBzZXRQcm90b3R5cGVPZiA9IHJlcXVpcmUoJy4uL2ludGVybmFscy9vYmplY3Qtc2V0LXByb3RvdHlwZS1vZicpO1xudmFyIHNldFRvU3RyaW5nVGFnID0gcmVxdWlyZSgnLi4vaW50ZXJuYWxzL3NldC10by1zdHJpbmctdGFnJyk7XG52YXIgY3JlYXRlTm9uRW51bWVyYWJsZVByb3BlcnR5ID0gcmVxdWlyZSgnLi4vaW50ZXJuYWxzL2NyZWF0ZS1ub24tZW51bWVyYWJsZS1wcm9wZXJ0eScpO1xudmFyIGRlZmluZUJ1aWx0SW4gPSByZXF1aXJlKCcuLi9pbnRlcm5hbHMvZGVmaW5lLWJ1aWx0LWluJyk7XG52YXIgd2VsbEtub3duU3ltYm9sID0gcmVxdWlyZSgnLi4vaW50ZXJuYWxzL3dlbGwta25vd24tc3ltYm9sJyk7XG52YXIgSXRlcmF0b3JzID0gcmVxdWlyZSgnLi4vaW50ZXJuYWxzL2l0ZXJhdG9ycycpO1xudmFyIEl0ZXJhdG9yc0NvcmUgPSByZXF1aXJlKCcuLi9pbnRlcm5hbHMvaXRlcmF0b3JzLWNvcmUnKTtcblxudmFyIFBST1BFUl9GVU5DVElPTl9OQU1FID0gRnVuY3Rpb25OYW1lLlBST1BFUjtcbnZhciBDT05GSUdVUkFCTEVfRlVOQ1RJT05fTkFNRSA9IEZ1bmN0aW9uTmFtZS5DT05GSUdVUkFCTEU7XG52YXIgSXRlcmF0b3JQcm90b3R5cGUgPSBJdGVyYXRvcnNDb3JlLkl0ZXJhdG9yUHJvdG90eXBlO1xudmFyIEJVR0dZX1NBRkFSSV9JVEVSQVRPUlMgPSBJdGVyYXRvcnNDb3JlLkJVR0dZX1NBRkFSSV9JVEVSQVRPUlM7XG52YXIgSVRFUkFUT1IgPSB3ZWxsS25vd25TeW1ib2woJ2l0ZXJhdG9yJyk7XG52YXIgS0VZUyA9ICdrZXlzJztcbnZhciBWQUxVRVMgPSAndmFsdWVzJztcbnZhciBFTlRSSUVTID0gJ2VudHJpZXMnO1xuXG52YXIgcmV0dXJuVGhpcyA9IGZ1bmN0aW9uICgpIHsgcmV0dXJuIHRoaXM7IH07XG5cbm1vZHVsZS5leHBvcnRzID0gZnVuY3Rpb24gKEl0ZXJhYmxlLCBOQU1FLCBJdGVyYXRvckNvbnN0cnVjdG9yLCBuZXh0LCBERUZBVUxULCBJU19TRVQsIEZPUkNFRCkge1xuICBjcmVhdGVJdGVyYXRvckNvbnN0cnVjdG9yKEl0ZXJhdG9yQ29uc3RydWN0b3IsIE5BTUUsIG5leHQpO1xuXG4gIHZhciBnZXRJdGVyYXRpb25NZXRob2QgPSBmdW5jdGlvbiAoS0lORCkge1xuICAgIGlmIChLSU5EID09PSBERUZBVUxUICYmIGRlZmF1bHRJdGVyYXRvcikgcmV0dXJuIGRlZmF1bHRJdGVyYXRvcjtcbiAgICBpZiAoIUJVR0dZX1NBRkFSSV9JVEVSQVRPUlMgJiYgS0lORCAmJiBLSU5EIGluIEl0ZXJhYmxlUHJvdG90eXBlKSByZXR1cm4gSXRlcmFibGVQcm90b3R5cGVbS0lORF07XG5cbiAgICBzd2l0Y2ggKEtJTkQpIHtcbiAgICAgIGNhc2UgS0VZUzogcmV0dXJuIGZ1bmN0aW9uIGtleXMoKSB7IHJldHVybiBuZXcgSXRlcmF0b3JDb25zdHJ1Y3Rvcih0aGlzLCBLSU5EKTsgfTtcbiAgICAgIGNhc2UgVkFMVUVTOiByZXR1cm4gZnVuY3Rpb24gdmFsdWVzKCkgeyByZXR1cm4gbmV3IEl0ZXJhdG9yQ29uc3RydWN0b3IodGhpcywgS0lORCk7IH07XG4gICAgICBjYXNlIEVOVFJJRVM6IHJldHVybiBmdW5jdGlvbiBlbnRyaWVzKCkgeyByZXR1cm4gbmV3IEl0ZXJhdG9yQ29uc3RydWN0b3IodGhpcywgS0lORCk7IH07XG4gICAgfVxuXG4gICAgcmV0dXJuIGZ1bmN0aW9uICgpIHsgcmV0dXJuIG5ldyBJdGVyYXRvckNvbnN0cnVjdG9yKHRoaXMpOyB9O1xuICB9O1xuXG4gIHZhciBUT19TVFJJTkdfVEFHID0gTkFNRSArICcgSXRlcmF0b3InO1xuICB2YXIgSU5DT1JSRUNUX1ZBTFVFU19OQU1FID0gZmFsc2U7XG4gIHZhciBJdGVyYWJsZVByb3RvdHlwZSA9IEl0ZXJhYmxlLnByb3RvdHlwZTtcbiAgdmFyIG5hdGl2ZUl0ZXJhdG9yID0gSXRlcmFibGVQcm90b3R5cGVbSVRFUkFUT1JdXG4gICAgfHwgSXRlcmFibGVQcm90b3R5cGVbJ0BAaXRlcmF0b3InXVxuICAgIHx8IERFRkFVTFQgJiYgSXRlcmFibGVQcm90b3R5cGVbREVGQVVMVF07XG4gIHZhciBkZWZhdWx0SXRlcmF0b3IgPSAhQlVHR1lfU0FGQVJJX0lURVJBVE9SUyAmJiBuYXRpdmVJdGVyYXRvciB8fCBnZXRJdGVyYXRpb25NZXRob2QoREVGQVVMVCk7XG4gIHZhciBhbnlOYXRpdmVJdGVyYXRvciA9IE5BTUUgPT09ICdBcnJheScgPyBJdGVyYWJsZVByb3RvdHlwZS5lbnRyaWVzIHx8IG5hdGl2ZUl0ZXJhdG9yIDogbmF0aXZlSXRlcmF0b3I7XG4gIHZhciBDdXJyZW50SXRlcmF0b3JQcm90b3R5cGUsIG1ldGhvZHMsIEtFWTtcblxuICAvLyBmaXggbmF0aXZlXG4gIGlmIChhbnlOYXRpdmVJdGVyYXRvcikge1xuICAgIEN1cnJlbnRJdGVyYXRvclByb3RvdHlwZSA9IGdldFByb3RvdHlwZU9mKGFueU5hdGl2ZUl0ZXJhdG9yLmNhbGwobmV3IEl0ZXJhYmxlKCkpKTtcbiAgICBpZiAoQ3VycmVudEl0ZXJhdG9yUHJvdG90eXBlICE9PSBPYmplY3QucHJvdG90eXBlICYmIEN1cnJlbnRJdGVyYXRvclByb3RvdHlwZS5uZXh0KSB7XG4gICAgICBpZiAoIUlTX1BVUkUgJiYgZ2V0UHJvdG90eXBlT2YoQ3VycmVudEl0ZXJhdG9yUHJvdG90eXBlKSAhPT0gSXRlcmF0b3JQcm90b3R5cGUpIHtcbiAgICAgICAgaWYgKHNldFByb3RvdHlwZU9mKSB7XG4gICAgICAgICAgc2V0UHJvdG90eXBlT2YoQ3VycmVudEl0ZXJhdG9yUHJvdG90eXBlLCBJdGVyYXRvclByb3RvdHlwZSk7XG4gICAgICAgIH0gZWxzZSBpZiAoIWlzQ2FsbGFibGUoQ3VycmVudEl0ZXJhdG9yUHJvdG90eXBlW0lURVJBVE9SXSkpIHtcbiAgICAgICAgICBkZWZpbmVCdWlsdEluKEN1cnJlbnRJdGVyYXRvclByb3RvdHlwZSwgSVRFUkFUT1IsIHJldHVyblRoaXMpO1xuICAgICAgICB9XG4gICAgICB9XG4gICAgICAvLyBTZXQgQEB0b1N0cmluZ1RhZyB0byBuYXRpdmUgaXRlcmF0b3JzXG4gICAgICBzZXRUb1N0cmluZ1RhZyhDdXJyZW50SXRlcmF0b3JQcm90b3R5cGUsIFRPX1NUUklOR19UQUcsIHRydWUsIHRydWUpO1xuICAgICAgaWYgKElTX1BVUkUpIEl0ZXJhdG9yc1tUT19TVFJJTkdfVEFHXSA9IHJldHVyblRoaXM7XG4gICAgfVxuICB9XG5cbiAgLy8gZml4IEFycmF5LnByb3RvdHlwZS57IHZhbHVlcywgQEBpdGVyYXRvciB9Lm5hbWUgaW4gVjggLyBGRlxuICBpZiAoUFJPUEVSX0ZVTkNUSU9OX05BTUUgJiYgREVGQVVMVCA9PT0gVkFMVUVTICYmIG5hdGl2ZUl0ZXJhdG9yICYmIG5hdGl2ZUl0ZXJhdG9yLm5hbWUgIT09IFZBTFVFUykge1xuICAgIGlmICghSVNfUFVSRSAmJiBDT05GSUdVUkFCTEVfRlVOQ1RJT05fTkFNRSkge1xuICAgICAgY3JlYXRlTm9uRW51bWVyYWJsZVByb3BlcnR5KEl0ZXJhYmxlUHJvdG90eXBlLCAnbmFtZScsIFZBTFVFUyk7XG4gICAgfSBlbHNlIHtcbiAgICAgIElOQ09SUkVDVF9WQUxVRVNfTkFNRSA9IHRydWU7XG4gICAgICBkZWZhdWx0SXRlcmF0b3IgPSBmdW5jdGlvbiB2YWx1ZXMoKSB7IHJldHVybiBjYWxsKG5hdGl2ZUl0ZXJhdG9yLCB0aGlzKTsgfTtcbiAgICB9XG4gIH1cblxuICAvLyBleHBvcnQgYWRkaXRpb25hbCBtZXRob2RzXG4gIGlmIChERUZBVUxUKSB7XG4gICAgbWV0aG9kcyA9IHtcbiAgICAgIHZhbHVlczogZ2V0SXRlcmF0aW9uTWV0aG9kKFZBTFVFUyksXG4gICAgICBrZXlzOiBJU19TRVQgPyBkZWZhdWx0SXRlcmF0b3IgOiBnZXRJdGVyYXRpb25NZXRob2QoS0VZUyksXG4gICAgICBlbnRyaWVzOiBnZXRJdGVyYXRpb25NZXRob2QoRU5UUklFUylcbiAgICB9O1xuICAgIGlmIChGT1JDRUQpIGZvciAoS0VZIGluIG1ldGhvZHMpIHtcbiAgICAgIGlmIChCVUdHWV9TQUZBUklfSVRFUkFUT1JTIHx8IElOQ09SUkVDVF9WQUxVRVNfTkFNRSB8fCAhKEtFWSBpbiBJdGVyYWJsZVByb3RvdHlwZSkpIHtcbiAgICAgICAgZGVmaW5lQnVpbHRJbihJdGVyYWJsZVByb3RvdHlwZSwgS0VZLCBtZXRob2RzW0tFWV0pO1xuICAgICAgfVxuICAgIH0gZWxzZSAkKHsgdGFyZ2V0OiBOQU1FLCBwcm90bzogdHJ1ZSwgZm9yY2VkOiBCVUdHWV9TQUZBUklfSVRFUkFUT1JTIHx8IElOQ09SUkVDVF9WQUxVRVNfTkFNRSB9LCBtZXRob2RzKTtcbiAgfVxuXG4gIC8vIGRlZmluZSBpdGVyYXRvclxuICBpZiAoKCFJU19QVVJFIHx8IEZPUkNFRCkgJiYgSXRlcmFibGVQcm90b3R5cGVbSVRFUkFUT1JdICE9PSBkZWZhdWx0SXRlcmF0b3IpIHtcbiAgICBkZWZpbmVCdWlsdEluKEl0ZXJhYmxlUHJvdG90eXBlLCBJVEVSQVRPUiwgZGVmYXVsdEl0ZXJhdG9yLCB7IG5hbWU6IERFRkFVTFQgfSk7XG4gIH1cbiAgSXRlcmF0b3JzW05BTUVdID0gZGVmYXVsdEl0ZXJhdG9yO1xuXG4gIHJldHVybiBtZXRob2RzO1xufTtcbiIsIid1c2Ugc3RyaWN0JztcbnZhciBmYWlscyA9IHJlcXVpcmUoJy4uL2ludGVybmFscy9mYWlscycpO1xudmFyIGlzQ2FsbGFibGUgPSByZXF1aXJlKCcuLi9pbnRlcm5hbHMvaXMtY2FsbGFibGUnKTtcbnZhciBpc09iamVjdCA9IHJlcXVpcmUoJy4uL2ludGVybmFscy9pcy1vYmplY3QnKTtcbnZhciBjcmVhdGUgPSByZXF1aXJlKCcuLi9pbnRlcm5hbHMvb2JqZWN0LWNyZWF0ZScpO1xudmFyIGdldFByb3RvdHlwZU9mID0gcmVxdWlyZSgnLi4vaW50ZXJuYWxzL29iamVjdC1nZXQtcHJvdG90eXBlLW9mJyk7XG52YXIgZGVmaW5lQnVpbHRJbiA9IHJlcXVpcmUoJy4uL2ludGVybmFscy9kZWZpbmUtYnVpbHQtaW4nKTtcbnZhciB3ZWxsS25vd25TeW1ib2wgPSByZXF1aXJlKCcuLi9pbnRlcm5hbHMvd2VsbC1rbm93bi1zeW1ib2wnKTtcbnZhciBJU19QVVJFID0gcmVxdWlyZSgnLi4vaW50ZXJuYWxzL2lzLXB1cmUnKTtcblxudmFyIElURVJBVE9SID0gd2VsbEtub3duU3ltYm9sKCdpdGVyYXRvcicpO1xudmFyIEJVR0dZX1NBRkFSSV9JVEVSQVRPUlMgPSBmYWxzZTtcblxuLy8gYCVJdGVyYXRvclByb3RvdHlwZSVgIG9iamVjdFxuLy8gaHR0cHM6Ly90YzM5LmVzL2VjbWEyNjIvI3NlYy0laXRlcmF0b3Jwcm90b3R5cGUlLW9iamVjdFxudmFyIEl0ZXJhdG9yUHJvdG90eXBlLCBQcm90b3R5cGVPZkFycmF5SXRlcmF0b3JQcm90b3R5cGUsIGFycmF5SXRlcmF0b3I7XG5cbi8qIGVzbGludC1kaXNhYmxlIGVzL25vLWFycmF5LXByb3RvdHlwZS1rZXlzIC0tIHNhZmUgKi9cbmlmIChbXS5rZXlzKSB7XG4gIGFycmF5SXRlcmF0b3IgPSBbXS5rZXlzKCk7XG4gIC8vIFNhZmFyaSA4IGhhcyBidWdneSBpdGVyYXRvcnMgdy9vIGBuZXh0YFxuICBpZiAoISgnbmV4dCcgaW4gYXJyYXlJdGVyYXRvcikpIEJVR0dZX1NBRkFSSV9JVEVSQVRPUlMgPSB0cnVlO1xuICBlbHNlIHtcbiAgICBQcm90b3R5cGVPZkFycmF5SXRlcmF0b3JQcm90b3R5cGUgPSBnZXRQcm90b3R5cGVPZihnZXRQcm90b3R5cGVPZihhcnJheUl0ZXJhdG9yKSk7XG4gICAgaWYgKFByb3RvdHlwZU9mQXJyYXlJdGVyYXRvclByb3RvdHlwZSAhPT0gT2JqZWN0LnByb3RvdHlwZSkgSXRlcmF0b3JQcm90b3R5cGUgPSBQcm90b3R5cGVPZkFycmF5SXRlcmF0b3JQcm90b3R5cGU7XG4gIH1cbn1cblxudmFyIE5FV19JVEVSQVRPUl9QUk9UT1RZUEUgPSAhaXNPYmplY3QoSXRlcmF0b3JQcm90b3R5cGUpIHx8IGZhaWxzKGZ1bmN0aW9uICgpIHtcbiAgdmFyIHRlc3QgPSB7fTtcbiAgLy8gRkY0NC0gbGVnYWN5IGl0ZXJhdG9ycyBjYXNlXG4gIHJldHVybiBJdGVyYXRvclByb3RvdHlwZVtJVEVSQVRPUl0uY2FsbCh0ZXN0KSAhPT0gdGVzdDtcbn0pO1xuXG5pZiAoTkVXX0lURVJBVE9SX1BST1RPVFlQRSkgSXRlcmF0b3JQcm90b3R5cGUgPSB7fTtcbmVsc2UgaWYgKElTX1BVUkUpIEl0ZXJhdG9yUHJvdG90eXBlID0gY3JlYXRlKEl0ZXJhdG9yUHJvdG90eXBlKTtcblxuLy8gYCVJdGVyYXRvclByb3RvdHlwZSVbQEBpdGVyYXRvcl0oKWAgbWV0aG9kXG4vLyBodHRwczovL3RjMzkuZXMvZWNtYTI2Mi8jc2VjLSVpdGVyYXRvcnByb3RvdHlwZSUtQEBpdGVyYXRvclxuaWYgKCFpc0NhbGxhYmxlKEl0ZXJhdG9yUHJvdG90eXBlW0lURVJBVE9SXSkpIHtcbiAgZGVmaW5lQnVpbHRJbihJdGVyYXRvclByb3RvdHlwZSwgSVRFUkFUT1IsIGZ1bmN0aW9uICgpIHtcbiAgICByZXR1cm4gdGhpcztcbiAgfSk7XG59XG5cbm1vZHVsZS5leHBvcnRzID0ge1xuICBJdGVyYXRvclByb3RvdHlwZTogSXRlcmF0b3JQcm90b3R5cGUsXG4gIEJVR0dZX1NBRkFSSV9JVEVSQVRPUlM6IEJVR0dZX1NBRkFSSV9JVEVSQVRPUlNcbn07XG4iLCIndXNlIHN0cmljdCc7XG5tb2R1bGUuZXhwb3J0cyA9IHt9O1xuIiwiJ3VzZSBzdHJpY3QnO1xudmFyIHRvTGVuZ3RoID0gcmVxdWlyZSgnLi4vaW50ZXJuYWxzL3RvLWxlbmd0aCcpO1xuXG4vLyBgTGVuZ3RoT2ZBcnJheUxpa2VgIGFic3RyYWN0IG9wZXJhdGlvblxuLy8gaHR0cHM6Ly90YzM5LmVzL2VjbWEyNjIvI3NlYy1sZW5ndGhvZmFycmF5bGlrZVxubW9kdWxlLmV4cG9ydHMgPSBmdW5jdGlvbiAob2JqKSB7XG4gIHJldHVybiB0b0xlbmd0aChvYmoubGVuZ3RoKTtcbn07XG4iLCIndXNlIHN0cmljdCc7XG52YXIgdW5jdXJyeVRoaXMgPSByZXF1aXJlKCcuLi9pbnRlcm5hbHMvZnVuY3Rpb24tdW5jdXJyeS10aGlzJyk7XG52YXIgZmFpbHMgPSByZXF1aXJlKCcuLi9pbnRlcm5hbHMvZmFpbHMnKTtcbnZhciBpc0NhbGxhYmxlID0gcmVxdWlyZSgnLi4vaW50ZXJuYWxzL2lzLWNhbGxhYmxlJyk7XG52YXIgaGFzT3duID0gcmVxdWlyZSgnLi4vaW50ZXJuYWxzL2hhcy1vd24tcHJvcGVydHknKTtcbnZhciBERVNDUklQVE9SUyA9IHJlcXVpcmUoJy4uL2ludGVybmFscy9kZXNjcmlwdG9ycycpO1xudmFyIENPTkZJR1VSQUJMRV9GVU5DVElPTl9OQU1FID0gcmVxdWlyZSgnLi4vaW50ZXJuYWxzL2Z1bmN0aW9uLW5hbWUnKS5DT05GSUdVUkFCTEU7XG52YXIgaW5zcGVjdFNvdXJjZSA9IHJlcXVpcmUoJy4uL2ludGVybmFscy9pbnNwZWN0LXNvdXJjZScpO1xudmFyIEludGVybmFsU3RhdGVNb2R1bGUgPSByZXF1aXJlKCcuLi9pbnRlcm5hbHMvaW50ZXJuYWwtc3RhdGUnKTtcblxudmFyIGVuZm9yY2VJbnRlcm5hbFN0YXRlID0gSW50ZXJuYWxTdGF0ZU1vZHVsZS5lbmZvcmNlO1xudmFyIGdldEludGVybmFsU3RhdGUgPSBJbnRlcm5hbFN0YXRlTW9kdWxlLmdldDtcbnZhciAkU3RyaW5nID0gU3RyaW5nO1xuLy8gZXNsaW50LWRpc2FibGUtbmV4dC1saW5lIGVzL25vLW9iamVjdC1kZWZpbmVwcm9wZXJ0eSAtLSBzYWZlXG52YXIgZGVmaW5lUHJvcGVydHkgPSBPYmplY3QuZGVmaW5lUHJvcGVydHk7XG52YXIgc3RyaW5nU2xpY2UgPSB1bmN1cnJ5VGhpcygnJy5zbGljZSk7XG52YXIgcmVwbGFjZSA9IHVuY3VycnlUaGlzKCcnLnJlcGxhY2UpO1xudmFyIGpvaW4gPSB1bmN1cnJ5VGhpcyhbXS5qb2luKTtcblxudmFyIENPTkZJR1VSQUJMRV9MRU5HVEggPSBERVNDUklQVE9SUyAmJiAhZmFpbHMoZnVuY3Rpb24gKCkge1xuICByZXR1cm4gZGVmaW5lUHJvcGVydHkoZnVuY3Rpb24gKCkgeyAvKiBlbXB0eSAqLyB9LCAnbGVuZ3RoJywgeyB2YWx1ZTogOCB9KS5sZW5ndGggIT09IDg7XG59KTtcblxudmFyIFRFTVBMQVRFID0gU3RyaW5nKFN0cmluZykuc3BsaXQoJ1N0cmluZycpO1xuXG52YXIgbWFrZUJ1aWx0SW4gPSBtb2R1bGUuZXhwb3J0cyA9IGZ1bmN0aW9uICh2YWx1ZSwgbmFtZSwgb3B0aW9ucykge1xuICBpZiAoc3RyaW5nU2xpY2UoJFN0cmluZyhuYW1lKSwgMCwgNykgPT09ICdTeW1ib2woJykge1xuICAgIG5hbWUgPSAnWycgKyByZXBsYWNlKCRTdHJpbmcobmFtZSksIC9eU3ltYm9sXFwoKFteKV0qKVxcKS4qJC8sICckMScpICsgJ10nO1xuICB9XG4gIGlmIChvcHRpb25zICYmIG9wdGlvbnMuZ2V0dGVyKSBuYW1lID0gJ2dldCAnICsgbmFtZTtcbiAgaWYgKG9wdGlvbnMgJiYgb3B0aW9ucy5zZXR0ZXIpIG5hbWUgPSAnc2V0ICcgKyBuYW1lO1xuICBpZiAoIWhhc093bih2YWx1ZSwgJ25hbWUnKSB8fCAoQ09ORklHVVJBQkxFX0ZVTkNUSU9OX05BTUUgJiYgdmFsdWUubmFtZSAhPT0gbmFtZSkpIHtcbiAgICBpZiAoREVTQ1JJUFRPUlMpIGRlZmluZVByb3BlcnR5KHZhbHVlLCAnbmFtZScsIHsgdmFsdWU6IG5hbWUsIGNvbmZpZ3VyYWJsZTogdHJ1ZSB9KTtcbiAgICBlbHNlIHZhbHVlLm5hbWUgPSBuYW1lO1xuICB9XG4gIGlmIChDT05GSUdVUkFCTEVfTEVOR1RIICYmIG9wdGlvbnMgJiYgaGFzT3duKG9wdGlvbnMsICdhcml0eScpICYmIHZhbHVlLmxlbmd0aCAhPT0gb3B0aW9ucy5hcml0eSkge1xuICAgIGRlZmluZVByb3BlcnR5KHZhbHVlLCAnbGVuZ3RoJywgeyB2YWx1ZTogb3B0aW9ucy5hcml0eSB9KTtcbiAgfVxuICB0cnkge1xuICAgIGlmIChvcHRpb25zICYmIGhhc093bihvcHRpb25zLCAnY29uc3RydWN0b3InKSAmJiBvcHRpb25zLmNvbnN0cnVjdG9yKSB7XG4gICAgICBpZiAoREVTQ1JJUFRPUlMpIGRlZmluZVByb3BlcnR5KHZhbHVlLCAncHJvdG90eXBlJywgeyB3cml0YWJsZTogZmFsc2UgfSk7XG4gICAgLy8gaW4gVjggfiBDaHJvbWUgNTMsIHByb3RvdHlwZXMgb2Ygc29tZSBtZXRob2RzLCBsaWtlIGBBcnJheS5wcm90b3R5cGUudmFsdWVzYCwgYXJlIG5vbi13cml0YWJsZVxuICAgIH0gZWxzZSBpZiAodmFsdWUucHJvdG90eXBlKSB2YWx1ZS5wcm90b3R5cGUgPSB1bmRlZmluZWQ7XG4gIH0gY2F0Y2ggKGVycm9yKSB7IC8qIGVtcHR5ICovIH1cbiAgdmFyIHN0YXRlID0gZW5mb3JjZUludGVybmFsU3RhdGUodmFsdWUpO1xuICBpZiAoIWhhc093bihzdGF0ZSwgJ3NvdXJjZScpKSB7XG4gICAgc3RhdGUuc291cmNlID0gam9pbihURU1QTEFURSwgdHlwZW9mIG5hbWUgPT0gJ3N0cmluZycgPyBuYW1lIDogJycpO1xuICB9IHJldHVybiB2YWx1ZTtcbn07XG5cbi8vIGFkZCBmYWtlIEZ1bmN0aW9uI3RvU3RyaW5nIGZvciBjb3JyZWN0IHdvcmsgd3JhcHBlZCBtZXRob2RzIC8gY29uc3RydWN0b3JzIHdpdGggbWV0aG9kcyBsaWtlIExvRGFzaCBpc05hdGl2ZVxuLy8gZXNsaW50LWRpc2FibGUtbmV4dC1saW5lIG5vLWV4dGVuZC1uYXRpdmUgLS0gcmVxdWlyZWRcbkZ1bmN0aW9uLnByb3RvdHlwZS50b1N0cmluZyA9IG1ha2VCdWlsdEluKGZ1bmN0aW9uIHRvU3RyaW5nKCkge1xuICByZXR1cm4gaXNDYWxsYWJsZSh0aGlzKSAmJiBnZXRJbnRlcm5hbFN0YXRlKHRoaXMpLnNvdXJjZSB8fCBpbnNwZWN0U291cmNlKHRoaXMpO1xufSwgJ3RvU3RyaW5nJyk7XG4iLCIndXNlIHN0cmljdCc7XG52YXIgY2VpbCA9IE1hdGguY2VpbDtcbnZhciBmbG9vciA9IE1hdGguZmxvb3I7XG5cbi8vIGBNYXRoLnRydW5jYCBtZXRob2Rcbi8vIGh0dHBzOi8vdGMzOS5lcy9lY21hMjYyLyNzZWMtbWF0aC50cnVuY1xuLy8gZXNsaW50LWRpc2FibGUtbmV4dC1saW5lIGVzL25vLW1hdGgtdHJ1bmMgLS0gc2FmZVxubW9kdWxlLmV4cG9ydHMgPSBNYXRoLnRydW5jIHx8IGZ1bmN0aW9uIHRydW5jKHgpIHtcbiAgdmFyIG4gPSAreDtcbiAgcmV0dXJuIChuID4gMCA/IGZsb29yIDogY2VpbCkobik7XG59O1xuIiwiJ3VzZSBzdHJpY3QnO1xudmFyIERFU0NSSVBUT1JTID0gcmVxdWlyZSgnLi4vaW50ZXJuYWxzL2Rlc2NyaXB0b3JzJyk7XG52YXIgdW5jdXJyeVRoaXMgPSByZXF1aXJlKCcuLi9pbnRlcm5hbHMvZnVuY3Rpb24tdW5jdXJyeS10aGlzJyk7XG52YXIgY2FsbCA9IHJlcXVpcmUoJy4uL2ludGVybmFscy9mdW5jdGlvbi1jYWxsJyk7XG52YXIgZmFpbHMgPSByZXF1aXJlKCcuLi9pbnRlcm5hbHMvZmFpbHMnKTtcbnZhciBvYmplY3RLZXlzID0gcmVxdWlyZSgnLi4vaW50ZXJuYWxzL29iamVjdC1rZXlzJyk7XG52YXIgZ2V0T3duUHJvcGVydHlTeW1ib2xzTW9kdWxlID0gcmVxdWlyZSgnLi4vaW50ZXJuYWxzL29iamVjdC1nZXQtb3duLXByb3BlcnR5LXN5bWJvbHMnKTtcbnZhciBwcm9wZXJ0eUlzRW51bWVyYWJsZU1vZHVsZSA9IHJlcXVpcmUoJy4uL2ludGVybmFscy9vYmplY3QtcHJvcGVydHktaXMtZW51bWVyYWJsZScpO1xudmFyIHRvT2JqZWN0ID0gcmVxdWlyZSgnLi4vaW50ZXJuYWxzL3RvLW9iamVjdCcpO1xudmFyIEluZGV4ZWRPYmplY3QgPSByZXF1aXJlKCcuLi9pbnRlcm5hbHMvaW5kZXhlZC1vYmplY3QnKTtcblxuLy8gZXNsaW50LWRpc2FibGUtbmV4dC1saW5lIGVzL25vLW9iamVjdC1hc3NpZ24gLS0gc2FmZVxudmFyICRhc3NpZ24gPSBPYmplY3QuYXNzaWduO1xuLy8gZXNsaW50LWRpc2FibGUtbmV4dC1saW5lIGVzL25vLW9iamVjdC1kZWZpbmVwcm9wZXJ0eSAtLSByZXF1aXJlZCBmb3IgdGVzdGluZ1xudmFyIGRlZmluZVByb3BlcnR5ID0gT2JqZWN0LmRlZmluZVByb3BlcnR5O1xudmFyIGNvbmNhdCA9IHVuY3VycnlUaGlzKFtdLmNvbmNhdCk7XG5cbi8vIGBPYmplY3QuYXNzaWduYCBtZXRob2Rcbi8vIGh0dHBzOi8vdGMzOS5lcy9lY21hMjYyLyNzZWMtb2JqZWN0LmFzc2lnblxubW9kdWxlLmV4cG9ydHMgPSAhJGFzc2lnbiB8fCBmYWlscyhmdW5jdGlvbiAoKSB7XG4gIC8vIHNob3VsZCBoYXZlIGNvcnJlY3Qgb3JkZXIgb2Ygb3BlcmF0aW9ucyAoRWRnZSBidWcpXG4gIGlmIChERVNDUklQVE9SUyAmJiAkYXNzaWduKHsgYjogMSB9LCAkYXNzaWduKGRlZmluZVByb3BlcnR5KHt9LCAnYScsIHtcbiAgICBlbnVtZXJhYmxlOiB0cnVlLFxuICAgIGdldDogZnVuY3Rpb24gKCkge1xuICAgICAgZGVmaW5lUHJvcGVydHkodGhpcywgJ2InLCB7XG4gICAgICAgIHZhbHVlOiAzLFxuICAgICAgICBlbnVtZXJhYmxlOiBmYWxzZVxuICAgICAgfSk7XG4gICAgfVxuICB9KSwgeyBiOiAyIH0pKS5iICE9PSAxKSByZXR1cm4gdHJ1ZTtcbiAgLy8gc2hvdWxkIHdvcmsgd2l0aCBzeW1ib2xzIGFuZCBzaG91bGQgaGF2ZSBkZXRlcm1pbmlzdGljIHByb3BlcnR5IG9yZGVyIChWOCBidWcpXG4gIHZhciBBID0ge307XG4gIHZhciBCID0ge307XG4gIC8vIGVzbGludC1kaXNhYmxlLW5leHQtbGluZSBlcy9uby1zeW1ib2wgLS0gc2FmZVxuICB2YXIgc3ltYm9sID0gU3ltYm9sKCdhc3NpZ24gZGV0ZWN0aW9uJyk7XG4gIHZhciBhbHBoYWJldCA9ICdhYmNkZWZnaGlqa2xtbm9wcXJzdCc7XG4gIEFbc3ltYm9sXSA9IDc7XG4gIGFscGhhYmV0LnNwbGl0KCcnKS5mb3JFYWNoKGZ1bmN0aW9uIChjaHIpIHsgQltjaHJdID0gY2hyOyB9KTtcbiAgcmV0dXJuICRhc3NpZ24oe30sIEEpW3N5bWJvbF0gIT09IDcgfHwgb2JqZWN0S2V5cygkYXNzaWduKHt9LCBCKSkuam9pbignJykgIT09IGFscGhhYmV0O1xufSkgPyBmdW5jdGlvbiBhc3NpZ24odGFyZ2V0LCBzb3VyY2UpIHsgLy8gZXNsaW50LWRpc2FibGUtbGluZSBuby11bnVzZWQtdmFycyAtLSByZXF1aXJlZCBmb3IgYC5sZW5ndGhgXG4gIHZhciBUID0gdG9PYmplY3QodGFyZ2V0KTtcbiAgdmFyIGFyZ3VtZW50c0xlbmd0aCA9IGFyZ3VtZW50cy5sZW5ndGg7XG4gIHZhciBpbmRleCA9IDE7XG4gIHZhciBnZXRPd25Qcm9wZXJ0eVN5bWJvbHMgPSBnZXRPd25Qcm9wZXJ0eVN5bWJvbHNNb2R1bGUuZjtcbiAgdmFyIHByb3BlcnR5SXNFbnVtZXJhYmxlID0gcHJvcGVydHlJc0VudW1lcmFibGVNb2R1bGUuZjtcbiAgd2hpbGUgKGFyZ3VtZW50c0xlbmd0aCA+IGluZGV4KSB7XG4gICAgdmFyIFMgPSBJbmRleGVkT2JqZWN0KGFyZ3VtZW50c1tpbmRleCsrXSk7XG4gICAgdmFyIGtleXMgPSBnZXRPd25Qcm9wZXJ0eVN5bWJvbHMgPyBjb25jYXQob2JqZWN0S2V5cyhTKSwgZ2V0T3duUHJvcGVydHlTeW1ib2xzKFMpKSA6IG9iamVjdEtleXMoUyk7XG4gICAgdmFyIGxlbmd0aCA9IGtleXMubGVuZ3RoO1xuICAgIHZhciBqID0gMDtcbiAgICB2YXIga2V5O1xuICAgIHdoaWxlIChsZW5ndGggPiBqKSB7XG4gICAgICBrZXkgPSBrZXlzW2orK107XG4gICAgICBpZiAoIURFU0NSSVBUT1JTIHx8IGNhbGwocHJvcGVydHlJc0VudW1lcmFibGUsIFMsIGtleSkpIFRba2V5XSA9IFNba2V5XTtcbiAgICB9XG4gIH0gcmV0dXJuIFQ7XG59IDogJGFzc2lnbjtcbiIsIid1c2Ugc3RyaWN0Jztcbi8qIGdsb2JhbCBBY3RpdmVYT2JqZWN0IC0tIG9sZCBJRSwgV1NIICovXG52YXIgYW5PYmplY3QgPSByZXF1aXJlKCcuLi9pbnRlcm5hbHMvYW4tb2JqZWN0Jyk7XG52YXIgZGVmaW5lUHJvcGVydGllc01vZHVsZSA9IHJlcXVpcmUoJy4uL2ludGVybmFscy9vYmplY3QtZGVmaW5lLXByb3BlcnRpZXMnKTtcbnZhciBlbnVtQnVnS2V5cyA9IHJlcXVpcmUoJy4uL2ludGVybmFscy9lbnVtLWJ1Zy1rZXlzJyk7XG52YXIgaGlkZGVuS2V5cyA9IHJlcXVpcmUoJy4uL2ludGVybmFscy9oaWRkZW4ta2V5cycpO1xudmFyIGh0bWwgPSByZXF1aXJlKCcuLi9pbnRlcm5hbHMvaHRtbCcpO1xudmFyIGRvY3VtZW50Q3JlYXRlRWxlbWVudCA9IHJlcXVpcmUoJy4uL2ludGVybmFscy9kb2N1bWVudC1jcmVhdGUtZWxlbWVudCcpO1xudmFyIHNoYXJlZEtleSA9IHJlcXVpcmUoJy4uL2ludGVybmFscy9zaGFyZWQta2V5Jyk7XG5cbnZhciBHVCA9ICc+JztcbnZhciBMVCA9ICc8JztcbnZhciBQUk9UT1RZUEUgPSAncHJvdG90eXBlJztcbnZhciBTQ1JJUFQgPSAnc2NyaXB0JztcbnZhciBJRV9QUk9UTyA9IHNoYXJlZEtleSgnSUVfUFJPVE8nKTtcblxudmFyIEVtcHR5Q29uc3RydWN0b3IgPSBmdW5jdGlvbiAoKSB7IC8qIGVtcHR5ICovIH07XG5cbnZhciBzY3JpcHRUYWcgPSBmdW5jdGlvbiAoY29udGVudCkge1xuICByZXR1cm4gTFQgKyBTQ1JJUFQgKyBHVCArIGNvbnRlbnQgKyBMVCArICcvJyArIFNDUklQVCArIEdUO1xufTtcblxuLy8gQ3JlYXRlIG9iamVjdCB3aXRoIGZha2UgYG51bGxgIHByb3RvdHlwZTogdXNlIEFjdGl2ZVggT2JqZWN0IHdpdGggY2xlYXJlZCBwcm90b3R5cGVcbnZhciBOdWxsUHJvdG9PYmplY3RWaWFBY3RpdmVYID0gZnVuY3Rpb24gKGFjdGl2ZVhEb2N1bWVudCkge1xuICBhY3RpdmVYRG9jdW1lbnQud3JpdGUoc2NyaXB0VGFnKCcnKSk7XG4gIGFjdGl2ZVhEb2N1bWVudC5jbG9zZSgpO1xuICB2YXIgdGVtcCA9IGFjdGl2ZVhEb2N1bWVudC5wYXJlbnRXaW5kb3cuT2JqZWN0O1xuICBhY3RpdmVYRG9jdW1lbnQgPSBudWxsOyAvLyBhdm9pZCBtZW1vcnkgbGVha1xuICByZXR1cm4gdGVtcDtcbn07XG5cbi8vIENyZWF0ZSBvYmplY3Qgd2l0aCBmYWtlIGBudWxsYCBwcm90b3R5cGU6IHVzZSBpZnJhbWUgT2JqZWN0IHdpdGggY2xlYXJlZCBwcm90b3R5cGVcbnZhciBOdWxsUHJvdG9PYmplY3RWaWFJRnJhbWUgPSBmdW5jdGlvbiAoKSB7XG4gIC8vIFRocmFzaCwgd2FzdGUgYW5kIHNvZG9teTogSUUgR0MgYnVnXG4gIHZhciBpZnJhbWUgPSBkb2N1bWVudENyZWF0ZUVsZW1lbnQoJ2lmcmFtZScpO1xuICB2YXIgSlMgPSAnamF2YScgKyBTQ1JJUFQgKyAnOic7XG4gIHZhciBpZnJhbWVEb2N1bWVudDtcbiAgaWZyYW1lLnN0eWxlLmRpc3BsYXkgPSAnbm9uZSc7XG4gIGh0bWwuYXBwZW5kQ2hpbGQoaWZyYW1lKTtcbiAgLy8gaHR0cHM6Ly9naXRodWIuY29tL3psb2lyb2NrL2NvcmUtanMvaXNzdWVzLzQ3NVxuICBpZnJhbWUuc3JjID0gU3RyaW5nKEpTKTtcbiAgaWZyYW1lRG9jdW1lbnQgPSBpZnJhbWUuY29udGVudFdpbmRvdy5kb2N1bWVudDtcbiAgaWZyYW1lRG9jdW1lbnQub3BlbigpO1xuICBpZnJhbWVEb2N1bWVudC53cml0ZShzY3JpcHRUYWcoJ2RvY3VtZW50LkY9T2JqZWN0JykpO1xuICBpZnJhbWVEb2N1bWVudC5jbG9zZSgpO1xuICByZXR1cm4gaWZyYW1lRG9jdW1lbnQuRjtcbn07XG5cbi8vIENoZWNrIGZvciBkb2N1bWVudC5kb21haW4gYW5kIGFjdGl2ZSB4IHN1cHBvcnRcbi8vIE5vIG5lZWQgdG8gdXNlIGFjdGl2ZSB4IGFwcHJvYWNoIHdoZW4gZG9jdW1lbnQuZG9tYWluIGlzIG5vdCBzZXRcbi8vIHNlZSBodHRwczovL2dpdGh1Yi5jb20vZXMtc2hpbXMvZXM1LXNoaW0vaXNzdWVzLzE1MFxuLy8gdmFyaWF0aW9uIG9mIGh0dHBzOi8vZ2l0aHViLmNvbS9raXRjYW1icmlkZ2UvZXM1LXNoaW0vY29tbWl0LzRmNzM4YWMwNjYzNDZcbi8vIGF2b2lkIElFIEdDIGJ1Z1xudmFyIGFjdGl2ZVhEb2N1bWVudDtcbnZhciBOdWxsUHJvdG9PYmplY3QgPSBmdW5jdGlvbiAoKSB7XG4gIHRyeSB7XG4gICAgYWN0aXZlWERvY3VtZW50ID0gbmV3IEFjdGl2ZVhPYmplY3QoJ2h0bWxmaWxlJyk7XG4gIH0gY2F0Y2ggKGVycm9yKSB7IC8qIGlnbm9yZSAqLyB9XG4gIE51bGxQcm90b09iamVjdCA9IHR5cGVvZiBkb2N1bWVudCAhPSAndW5kZWZpbmVkJ1xuICAgID8gZG9jdW1lbnQuZG9tYWluICYmIGFjdGl2ZVhEb2N1bWVudFxuICAgICAgPyBOdWxsUHJvdG9PYmplY3RWaWFBY3RpdmVYKGFjdGl2ZVhEb2N1bWVudCkgLy8gb2xkIElFXG4gICAgICA6IE51bGxQcm90b09iamVjdFZpYUlGcmFtZSgpXG4gICAgOiBOdWxsUHJvdG9PYmplY3RWaWFBY3RpdmVYKGFjdGl2ZVhEb2N1bWVudCk7IC8vIFdTSFxuICB2YXIgbGVuZ3RoID0gZW51bUJ1Z0tleXMubGVuZ3RoO1xuICB3aGlsZSAobGVuZ3RoLS0pIGRlbGV0ZSBOdWxsUHJvdG9PYmplY3RbUFJPVE9UWVBFXVtlbnVtQnVnS2V5c1tsZW5ndGhdXTtcbiAgcmV0dXJuIE51bGxQcm90b09iamVjdCgpO1xufTtcblxuaGlkZGVuS2V5c1tJRV9QUk9UT10gPSB0cnVlO1xuXG4vLyBgT2JqZWN0LmNyZWF0ZWAgbWV0aG9kXG4vLyBodHRwczovL3RjMzkuZXMvZWNtYTI2Mi8jc2VjLW9iamVjdC5jcmVhdGVcbi8vIGVzbGludC1kaXNhYmxlLW5leHQtbGluZSBlcy9uby1vYmplY3QtY3JlYXRlIC0tIHNhZmVcbm1vZHVsZS5leHBvcnRzID0gT2JqZWN0LmNyZWF0ZSB8fCBmdW5jdGlvbiBjcmVhdGUoTywgUHJvcGVydGllcykge1xuICB2YXIgcmVzdWx0O1xuICBpZiAoTyAhPT0gbnVsbCkge1xuICAgIEVtcHR5Q29uc3RydWN0b3JbUFJPVE9UWVBFXSA9IGFuT2JqZWN0KE8pO1xuICAgIHJlc3VsdCA9IG5ldyBFbXB0eUNvbnN0cnVjdG9yKCk7XG4gICAgRW1wdHlDb25zdHJ1Y3RvcltQUk9UT1RZUEVdID0gbnVsbDtcbiAgICAvLyBhZGQgXCJfX3Byb3RvX19cIiBmb3IgT2JqZWN0LmdldFByb3RvdHlwZU9mIHBvbHlmaWxsXG4gICAgcmVzdWx0W0lFX1BST1RPXSA9IE87XG4gIH0gZWxzZSByZXN1bHQgPSBOdWxsUHJvdG9PYmplY3QoKTtcbiAgcmV0dXJuIFByb3BlcnRpZXMgPT09IHVuZGVmaW5lZCA/IHJlc3VsdCA6IGRlZmluZVByb3BlcnRpZXNNb2R1bGUuZihyZXN1bHQsIFByb3BlcnRpZXMpO1xufTtcbiIsIid1c2Ugc3RyaWN0JztcbnZhciBERVNDUklQVE9SUyA9IHJlcXVpcmUoJy4uL2ludGVybmFscy9kZXNjcmlwdG9ycycpO1xudmFyIFY4X1BST1RPVFlQRV9ERUZJTkVfQlVHID0gcmVxdWlyZSgnLi4vaW50ZXJuYWxzL3Y4LXByb3RvdHlwZS1kZWZpbmUtYnVnJyk7XG52YXIgZGVmaW5lUHJvcGVydHlNb2R1bGUgPSByZXF1aXJlKCcuLi9pbnRlcm5hbHMvb2JqZWN0LWRlZmluZS1wcm9wZXJ0eScpO1xudmFyIGFuT2JqZWN0ID0gcmVxdWlyZSgnLi4vaW50ZXJuYWxzL2FuLW9iamVjdCcpO1xudmFyIHRvSW5kZXhlZE9iamVjdCA9IHJlcXVpcmUoJy4uL2ludGVybmFscy90by1pbmRleGVkLW9iamVjdCcpO1xudmFyIG9iamVjdEtleXMgPSByZXF1aXJlKCcuLi9pbnRlcm5hbHMvb2JqZWN0LWtleXMnKTtcblxuLy8gYE9iamVjdC5kZWZpbmVQcm9wZXJ0aWVzYCBtZXRob2Rcbi8vIGh0dHBzOi8vdGMzOS5lcy9lY21hMjYyLyNzZWMtb2JqZWN0LmRlZmluZXByb3BlcnRpZXNcbi8vIGVzbGludC1kaXNhYmxlLW5leHQtbGluZSBlcy9uby1vYmplY3QtZGVmaW5lcHJvcGVydGllcyAtLSBzYWZlXG5leHBvcnRzLmYgPSBERVNDUklQVE9SUyAmJiAhVjhfUFJPVE9UWVBFX0RFRklORV9CVUcgPyBPYmplY3QuZGVmaW5lUHJvcGVydGllcyA6IGZ1bmN0aW9uIGRlZmluZVByb3BlcnRpZXMoTywgUHJvcGVydGllcykge1xuICBhbk9iamVjdChPKTtcbiAgdmFyIHByb3BzID0gdG9JbmRleGVkT2JqZWN0KFByb3BlcnRpZXMpO1xuICB2YXIga2V5cyA9IG9iamVjdEtleXMoUHJvcGVydGllcyk7XG4gIHZhciBsZW5ndGggPSBrZXlzLmxlbmd0aDtcbiAgdmFyIGluZGV4ID0gMDtcbiAgdmFyIGtleTtcbiAgd2hpbGUgKGxlbmd0aCA+IGluZGV4KSBkZWZpbmVQcm9wZXJ0eU1vZHVsZS5mKE8sIGtleSA9IGtleXNbaW5kZXgrK10sIHByb3BzW2tleV0pO1xuICByZXR1cm4gTztcbn07XG4iLCIndXNlIHN0cmljdCc7XG52YXIgREVTQ1JJUFRPUlMgPSByZXF1aXJlKCcuLi9pbnRlcm5hbHMvZGVzY3JpcHRvcnMnKTtcbnZhciBJRThfRE9NX0RFRklORSA9IHJlcXVpcmUoJy4uL2ludGVybmFscy9pZTgtZG9tLWRlZmluZScpO1xudmFyIFY4X1BST1RPVFlQRV9ERUZJTkVfQlVHID0gcmVxdWlyZSgnLi4vaW50ZXJuYWxzL3Y4LXByb3RvdHlwZS1kZWZpbmUtYnVnJyk7XG52YXIgYW5PYmplY3QgPSByZXF1aXJlKCcuLi9pbnRlcm5hbHMvYW4tb2JqZWN0Jyk7XG52YXIgdG9Qcm9wZXJ0eUtleSA9IHJlcXVpcmUoJy4uL2ludGVybmFscy90by1wcm9wZXJ0eS1rZXknKTtcblxudmFyICRUeXBlRXJyb3IgPSBUeXBlRXJyb3I7XG4vLyBlc2xpbnQtZGlzYWJsZS1uZXh0LWxpbmUgZXMvbm8tb2JqZWN0LWRlZmluZXByb3BlcnR5IC0tIHNhZmVcbnZhciAkZGVmaW5lUHJvcGVydHkgPSBPYmplY3QuZGVmaW5lUHJvcGVydHk7XG4vLyBlc2xpbnQtZGlzYWJsZS1uZXh0LWxpbmUgZXMvbm8tb2JqZWN0LWdldG93bnByb3BlcnR5ZGVzY3JpcHRvciAtLSBzYWZlXG52YXIgJGdldE93blByb3BlcnR5RGVzY3JpcHRvciA9IE9iamVjdC5nZXRPd25Qcm9wZXJ0eURlc2NyaXB0b3I7XG52YXIgRU5VTUVSQUJMRSA9ICdlbnVtZXJhYmxlJztcbnZhciBDT05GSUdVUkFCTEUgPSAnY29uZmlndXJhYmxlJztcbnZhciBXUklUQUJMRSA9ICd3cml0YWJsZSc7XG5cbi8vIGBPYmplY3QuZGVmaW5lUHJvcGVydHlgIG1ldGhvZFxuLy8gaHR0cHM6Ly90YzM5LmVzL2VjbWEyNjIvI3NlYy1vYmplY3QuZGVmaW5lcHJvcGVydHlcbmV4cG9ydHMuZiA9IERFU0NSSVBUT1JTID8gVjhfUFJPVE9UWVBFX0RFRklORV9CVUcgPyBmdW5jdGlvbiBkZWZpbmVQcm9wZXJ0eShPLCBQLCBBdHRyaWJ1dGVzKSB7XG4gIGFuT2JqZWN0KE8pO1xuICBQID0gdG9Qcm9wZXJ0eUtleShQKTtcbiAgYW5PYmplY3QoQXR0cmlidXRlcyk7XG4gIGlmICh0eXBlb2YgTyA9PT0gJ2Z1bmN0aW9uJyAmJiBQID09PSAncHJvdG90eXBlJyAmJiAndmFsdWUnIGluIEF0dHJpYnV0ZXMgJiYgV1JJVEFCTEUgaW4gQXR0cmlidXRlcyAmJiAhQXR0cmlidXRlc1tXUklUQUJMRV0pIHtcbiAgICB2YXIgY3VycmVudCA9ICRnZXRPd25Qcm9wZXJ0eURlc2NyaXB0b3IoTywgUCk7XG4gICAgaWYgKGN1cnJlbnQgJiYgY3VycmVudFtXUklUQUJMRV0pIHtcbiAgICAgIE9bUF0gPSBBdHRyaWJ1dGVzLnZhbHVlO1xuICAgICAgQXR0cmlidXRlcyA9IHtcbiAgICAgICAgY29uZmlndXJhYmxlOiBDT05GSUdVUkFCTEUgaW4gQXR0cmlidXRlcyA/IEF0dHJpYnV0ZXNbQ09ORklHVVJBQkxFXSA6IGN1cnJlbnRbQ09ORklHVVJBQkxFXSxcbiAgICAgICAgZW51bWVyYWJsZTogRU5VTUVSQUJMRSBpbiBBdHRyaWJ1dGVzID8gQXR0cmlidXRlc1tFTlVNRVJBQkxFXSA6IGN1cnJlbnRbRU5VTUVSQUJMRV0sXG4gICAgICAgIHdyaXRhYmxlOiBmYWxzZVxuICAgICAgfTtcbiAgICB9XG4gIH0gcmV0dXJuICRkZWZpbmVQcm9wZXJ0eShPLCBQLCBBdHRyaWJ1dGVzKTtcbn0gOiAkZGVmaW5lUHJvcGVydHkgOiBmdW5jdGlvbiBkZWZpbmVQcm9wZXJ0eShPLCBQLCBBdHRyaWJ1dGVzKSB7XG4gIGFuT2JqZWN0KE8pO1xuICBQID0gdG9Qcm9wZXJ0eUtleShQKTtcbiAgYW5PYmplY3QoQXR0cmlidXRlcyk7XG4gIGlmIChJRThfRE9NX0RFRklORSkgdHJ5IHtcbiAgICByZXR1cm4gJGRlZmluZVByb3BlcnR5KE8sIFAsIEF0dHJpYnV0ZXMpO1xuICB9IGNhdGNoIChlcnJvcikgeyAvKiBlbXB0eSAqLyB9XG4gIGlmICgnZ2V0JyBpbiBBdHRyaWJ1dGVzIHx8ICdzZXQnIGluIEF0dHJpYnV0ZXMpIHRocm93IG5ldyAkVHlwZUVycm9yKCdBY2Nlc3NvcnMgbm90IHN1cHBvcnRlZCcpO1xuICBpZiAoJ3ZhbHVlJyBpbiBBdHRyaWJ1dGVzKSBPW1BdID0gQXR0cmlidXRlcy52YWx1ZTtcbiAgcmV0dXJuIE87XG59O1xuIiwiJ3VzZSBzdHJpY3QnO1xudmFyIERFU0NSSVBUT1JTID0gcmVxdWlyZSgnLi4vaW50ZXJuYWxzL2Rlc2NyaXB0b3JzJyk7XG52YXIgY2FsbCA9IHJlcXVpcmUoJy4uL2ludGVybmFscy9mdW5jdGlvbi1jYWxsJyk7XG52YXIgcHJvcGVydHlJc0VudW1lcmFibGVNb2R1bGUgPSByZXF1aXJlKCcuLi9pbnRlcm5hbHMvb2JqZWN0LXByb3BlcnR5LWlzLWVudW1lcmFibGUnKTtcbnZhciBjcmVhdGVQcm9wZXJ0eURlc2NyaXB0b3IgPSByZXF1aXJlKCcuLi9pbnRlcm5hbHMvY3JlYXRlLXByb3BlcnR5LWRlc2NyaXB0b3InKTtcbnZhciB0b0luZGV4ZWRPYmplY3QgPSByZXF1aXJlKCcuLi9pbnRlcm5hbHMvdG8taW5kZXhlZC1vYmplY3QnKTtcbnZhciB0b1Byb3BlcnR5S2V5ID0gcmVxdWlyZSgnLi4vaW50ZXJuYWxzL3RvLXByb3BlcnR5LWtleScpO1xudmFyIGhhc093biA9IHJlcXVpcmUoJy4uL2ludGVybmFscy9oYXMtb3duLXByb3BlcnR5Jyk7XG52YXIgSUU4X0RPTV9ERUZJTkUgPSByZXF1aXJlKCcuLi9pbnRlcm5hbHMvaWU4LWRvbS1kZWZpbmUnKTtcblxuLy8gZXNsaW50LWRpc2FibGUtbmV4dC1saW5lIGVzL25vLW9iamVjdC1nZXRvd25wcm9wZXJ0eWRlc2NyaXB0b3IgLS0gc2FmZVxudmFyICRnZXRPd25Qcm9wZXJ0eURlc2NyaXB0b3IgPSBPYmplY3QuZ2V0T3duUHJvcGVydHlEZXNjcmlwdG9yO1xuXG4vLyBgT2JqZWN0LmdldE93blByb3BlcnR5RGVzY3JpcHRvcmAgbWV0aG9kXG4vLyBodHRwczovL3RjMzkuZXMvZWNtYTI2Mi8jc2VjLW9iamVjdC5nZXRvd25wcm9wZXJ0eWRlc2NyaXB0b3JcbmV4cG9ydHMuZiA9IERFU0NSSVBUT1JTID8gJGdldE93blByb3BlcnR5RGVzY3JpcHRvciA6IGZ1bmN0aW9uIGdldE93blByb3BlcnR5RGVzY3JpcHRvcihPLCBQKSB7XG4gIE8gPSB0b0luZGV4ZWRPYmplY3QoTyk7XG4gIFAgPSB0b1Byb3BlcnR5S2V5KFApO1xuICBpZiAoSUU4X0RPTV9ERUZJTkUpIHRyeSB7XG4gICAgcmV0dXJuICRnZXRPd25Qcm9wZXJ0eURlc2NyaXB0b3IoTywgUCk7XG4gIH0gY2F0Y2ggKGVycm9yKSB7IC8qIGVtcHR5ICovIH1cbiAgaWYgKGhhc093bihPLCBQKSkgcmV0dXJuIGNyZWF0ZVByb3BlcnR5RGVzY3JpcHRvcighY2FsbChwcm9wZXJ0eUlzRW51bWVyYWJsZU1vZHVsZS5mLCBPLCBQKSwgT1tQXSk7XG59O1xuIiwiJ3VzZSBzdHJpY3QnO1xudmFyIGludGVybmFsT2JqZWN0S2V5cyA9IHJlcXVpcmUoJy4uL2ludGVybmFscy9vYmplY3Qta2V5cy1pbnRlcm5hbCcpO1xudmFyIGVudW1CdWdLZXlzID0gcmVxdWlyZSgnLi4vaW50ZXJuYWxzL2VudW0tYnVnLWtleXMnKTtcblxudmFyIGhpZGRlbktleXMgPSBlbnVtQnVnS2V5cy5jb25jYXQoJ2xlbmd0aCcsICdwcm90b3R5cGUnKTtcblxuLy8gYE9iamVjdC5nZXRPd25Qcm9wZXJ0eU5hbWVzYCBtZXRob2Rcbi8vIGh0dHBzOi8vdGMzOS5lcy9lY21hMjYyLyNzZWMtb2JqZWN0LmdldG93bnByb3BlcnR5bmFtZXNcbi8vIGVzbGludC1kaXNhYmxlLW5leHQtbGluZSBlcy9uby1vYmplY3QtZ2V0b3ducHJvcGVydHluYW1lcyAtLSBzYWZlXG5leHBvcnRzLmYgPSBPYmplY3QuZ2V0T3duUHJvcGVydHlOYW1lcyB8fCBmdW5jdGlvbiBnZXRPd25Qcm9wZXJ0eU5hbWVzKE8pIHtcbiAgcmV0dXJuIGludGVybmFsT2JqZWN0S2V5cyhPLCBoaWRkZW5LZXlzKTtcbn07XG4iLCIndXNlIHN0cmljdCc7XG4vLyBlc2xpbnQtZGlzYWJsZS1uZXh0LWxpbmUgZXMvbm8tb2JqZWN0LWdldG93bnByb3BlcnR5c3ltYm9scyAtLSBzYWZlXG5leHBvcnRzLmYgPSBPYmplY3QuZ2V0T3duUHJvcGVydHlTeW1ib2xzO1xuIiwiJ3VzZSBzdHJpY3QnO1xudmFyIGhhc093biA9IHJlcXVpcmUoJy4uL2ludGVybmFscy9oYXMtb3duLXByb3BlcnR5Jyk7XG52YXIgaXNDYWxsYWJsZSA9IHJlcXVpcmUoJy4uL2ludGVybmFscy9pcy1jYWxsYWJsZScpO1xudmFyIHRvT2JqZWN0ID0gcmVxdWlyZSgnLi4vaW50ZXJuYWxzL3RvLW9iamVjdCcpO1xudmFyIHNoYXJlZEtleSA9IHJlcXVpcmUoJy4uL2ludGVybmFscy9zaGFyZWQta2V5Jyk7XG52YXIgQ09SUkVDVF9QUk9UT1RZUEVfR0VUVEVSID0gcmVxdWlyZSgnLi4vaW50ZXJuYWxzL2NvcnJlY3QtcHJvdG90eXBlLWdldHRlcicpO1xuXG52YXIgSUVfUFJPVE8gPSBzaGFyZWRLZXkoJ0lFX1BST1RPJyk7XG52YXIgJE9iamVjdCA9IE9iamVjdDtcbnZhciBPYmplY3RQcm90b3R5cGUgPSAkT2JqZWN0LnByb3RvdHlwZTtcblxuLy8gYE9iamVjdC5nZXRQcm90b3R5cGVPZmAgbWV0aG9kXG4vLyBodHRwczovL3RjMzkuZXMvZWNtYTI2Mi8jc2VjLW9iamVjdC5nZXRwcm90b3R5cGVvZlxuLy8gZXNsaW50LWRpc2FibGUtbmV4dC1saW5lIGVzL25vLW9iamVjdC1nZXRwcm90b3R5cGVvZiAtLSBzYWZlXG5tb2R1bGUuZXhwb3J0cyA9IENPUlJFQ1RfUFJPVE9UWVBFX0dFVFRFUiA/ICRPYmplY3QuZ2V0UHJvdG90eXBlT2YgOiBmdW5jdGlvbiAoTykge1xuICB2YXIgb2JqZWN0ID0gdG9PYmplY3QoTyk7XG4gIGlmIChoYXNPd24ob2JqZWN0LCBJRV9QUk9UTykpIHJldHVybiBvYmplY3RbSUVfUFJPVE9dO1xuICB2YXIgY29uc3RydWN0b3IgPSBvYmplY3QuY29uc3RydWN0b3I7XG4gIGlmIChpc0NhbGxhYmxlKGNvbnN0cnVjdG9yKSAmJiBvYmplY3QgaW5zdGFuY2VvZiBjb25zdHJ1Y3Rvcikge1xuICAgIHJldHVybiBjb25zdHJ1Y3Rvci5wcm90b3R5cGU7XG4gIH0gcmV0dXJuIG9iamVjdCBpbnN0YW5jZW9mICRPYmplY3QgPyBPYmplY3RQcm90b3R5cGUgOiBudWxsO1xufTtcbiIsIid1c2Ugc3RyaWN0JztcbnZhciB1bmN1cnJ5VGhpcyA9IHJlcXVpcmUoJy4uL2ludGVybmFscy9mdW5jdGlvbi11bmN1cnJ5LXRoaXMnKTtcblxubW9kdWxlLmV4cG9ydHMgPSB1bmN1cnJ5VGhpcyh7fS5pc1Byb3RvdHlwZU9mKTtcbiIsIid1c2Ugc3RyaWN0JztcbnZhciB1bmN1cnJ5VGhpcyA9IHJlcXVpcmUoJy4uL2ludGVybmFscy9mdW5jdGlvbi11bmN1cnJ5LXRoaXMnKTtcbnZhciBoYXNPd24gPSByZXF1aXJlKCcuLi9pbnRlcm5hbHMvaGFzLW93bi1wcm9wZXJ0eScpO1xudmFyIHRvSW5kZXhlZE9iamVjdCA9IHJlcXVpcmUoJy4uL2ludGVybmFscy90by1pbmRleGVkLW9iamVjdCcpO1xudmFyIGluZGV4T2YgPSByZXF1aXJlKCcuLi9pbnRlcm5hbHMvYXJyYXktaW5jbHVkZXMnKS5pbmRleE9mO1xudmFyIGhpZGRlbktleXMgPSByZXF1aXJlKCcuLi9pbnRlcm5hbHMvaGlkZGVuLWtleXMnKTtcblxudmFyIHB1c2ggPSB1bmN1cnJ5VGhpcyhbXS5wdXNoKTtcblxubW9kdWxlLmV4cG9ydHMgPSBmdW5jdGlvbiAob2JqZWN0LCBuYW1lcykge1xuICB2YXIgTyA9IHRvSW5kZXhlZE9iamVjdChvYmplY3QpO1xuICB2YXIgaSA9IDA7XG4gIHZhciByZXN1bHQgPSBbXTtcbiAgdmFyIGtleTtcbiAgZm9yIChrZXkgaW4gTykgIWhhc093bihoaWRkZW5LZXlzLCBrZXkpICYmIGhhc093bihPLCBrZXkpICYmIHB1c2gocmVzdWx0LCBrZXkpO1xuICAvLyBEb24ndCBlbnVtIGJ1ZyAmIGhpZGRlbiBrZXlzXG4gIHdoaWxlIChuYW1lcy5sZW5ndGggPiBpKSBpZiAoaGFzT3duKE8sIGtleSA9IG5hbWVzW2krK10pKSB7XG4gICAgfmluZGV4T2YocmVzdWx0LCBrZXkpIHx8IHB1c2gocmVzdWx0LCBrZXkpO1xuICB9XG4gIHJldHVybiByZXN1bHQ7XG59O1xuIiwiJ3VzZSBzdHJpY3QnO1xudmFyIGludGVybmFsT2JqZWN0S2V5cyA9IHJlcXVpcmUoJy4uL2ludGVybmFscy9vYmplY3Qta2V5cy1pbnRlcm5hbCcpO1xudmFyIGVudW1CdWdLZXlzID0gcmVxdWlyZSgnLi4vaW50ZXJuYWxzL2VudW0tYnVnLWtleXMnKTtcblxuLy8gYE9iamVjdC5rZXlzYCBtZXRob2Rcbi8vIGh0dHBzOi8vdGMzOS5lcy9lY21hMjYyLyNzZWMtb2JqZWN0LmtleXNcbi8vIGVzbGludC1kaXNhYmxlLW5leHQtbGluZSBlcy9uby1vYmplY3Qta2V5cyAtLSBzYWZlXG5tb2R1bGUuZXhwb3J0cyA9IE9iamVjdC5rZXlzIHx8IGZ1bmN0aW9uIGtleXMoTykge1xuICByZXR1cm4gaW50ZXJuYWxPYmplY3RLZXlzKE8sIGVudW1CdWdLZXlzKTtcbn07XG4iLCIndXNlIHN0cmljdCc7XG52YXIgJHByb3BlcnR5SXNFbnVtZXJhYmxlID0ge30ucHJvcGVydHlJc0VudW1lcmFibGU7XG4vLyBlc2xpbnQtZGlzYWJsZS1uZXh0LWxpbmUgZXMvbm8tb2JqZWN0LWdldG93bnByb3BlcnR5ZGVzY3JpcHRvciAtLSBzYWZlXG52YXIgZ2V0T3duUHJvcGVydHlEZXNjcmlwdG9yID0gT2JqZWN0LmdldE93blByb3BlcnR5RGVzY3JpcHRvcjtcblxuLy8gTmFzaG9ybiB+IEpESzggYnVnXG52YXIgTkFTSE9STl9CVUcgPSBnZXRPd25Qcm9wZXJ0eURlc2NyaXB0b3IgJiYgISRwcm9wZXJ0eUlzRW51bWVyYWJsZS5jYWxsKHsgMTogMiB9LCAxKTtcblxuLy8gYE9iamVjdC5wcm90b3R5cGUucHJvcGVydHlJc0VudW1lcmFibGVgIG1ldGhvZCBpbXBsZW1lbnRhdGlvblxuLy8gaHR0cHM6Ly90YzM5LmVzL2VjbWEyNjIvI3NlYy1vYmplY3QucHJvdG90eXBlLnByb3BlcnR5aXNlbnVtZXJhYmxlXG5leHBvcnRzLmYgPSBOQVNIT1JOX0JVRyA/IGZ1bmN0aW9uIHByb3BlcnR5SXNFbnVtZXJhYmxlKFYpIHtcbiAgdmFyIGRlc2NyaXB0b3IgPSBnZXRPd25Qcm9wZXJ0eURlc2NyaXB0b3IodGhpcywgVik7XG4gIHJldHVybiAhIWRlc2NyaXB0b3IgJiYgZGVzY3JpcHRvci5lbnVtZXJhYmxlO1xufSA6ICRwcm9wZXJ0eUlzRW51bWVyYWJsZTtcbiIsIid1c2Ugc3RyaWN0Jztcbi8qIGVzbGludC1kaXNhYmxlIG5vLXByb3RvIC0tIHNhZmUgKi9cbnZhciB1bmN1cnJ5VGhpc0FjY2Vzc29yID0gcmVxdWlyZSgnLi4vaW50ZXJuYWxzL2Z1bmN0aW9uLXVuY3VycnktdGhpcy1hY2Nlc3NvcicpO1xudmFyIGlzT2JqZWN0ID0gcmVxdWlyZSgnLi4vaW50ZXJuYWxzL2lzLW9iamVjdCcpO1xudmFyIHJlcXVpcmVPYmplY3RDb2VyY2libGUgPSByZXF1aXJlKCcuLi9pbnRlcm5hbHMvcmVxdWlyZS1vYmplY3QtY29lcmNpYmxlJyk7XG52YXIgYVBvc3NpYmxlUHJvdG90eXBlID0gcmVxdWlyZSgnLi4vaW50ZXJuYWxzL2EtcG9zc2libGUtcHJvdG90eXBlJyk7XG5cbi8vIGBPYmplY3Quc2V0UHJvdG90eXBlT2ZgIG1ldGhvZFxuLy8gaHR0cHM6Ly90YzM5LmVzL2VjbWEyNjIvI3NlYy1vYmplY3Quc2V0cHJvdG90eXBlb2Zcbi8vIFdvcmtzIHdpdGggX19wcm90b19fIG9ubHkuIE9sZCB2OCBjYW4ndCB3b3JrIHdpdGggbnVsbCBwcm90byBvYmplY3RzLlxuLy8gZXNsaW50LWRpc2FibGUtbmV4dC1saW5lIGVzL25vLW9iamVjdC1zZXRwcm90b3R5cGVvZiAtLSBzYWZlXG5tb2R1bGUuZXhwb3J0cyA9IE9iamVjdC5zZXRQcm90b3R5cGVPZiB8fCAoJ19fcHJvdG9fXycgaW4ge30gPyBmdW5jdGlvbiAoKSB7XG4gIHZhciBDT1JSRUNUX1NFVFRFUiA9IGZhbHNlO1xuICB2YXIgdGVzdCA9IHt9O1xuICB2YXIgc2V0dGVyO1xuICB0cnkge1xuICAgIHNldHRlciA9IHVuY3VycnlUaGlzQWNjZXNzb3IoT2JqZWN0LnByb3RvdHlwZSwgJ19fcHJvdG9fXycsICdzZXQnKTtcbiAgICBzZXR0ZXIodGVzdCwgW10pO1xuICAgIENPUlJFQ1RfU0VUVEVSID0gdGVzdCBpbnN0YW5jZW9mIEFycmF5O1xuICB9IGNhdGNoIChlcnJvcikgeyAvKiBlbXB0eSAqLyB9XG4gIHJldHVybiBmdW5jdGlvbiBzZXRQcm90b3R5cGVPZihPLCBwcm90bykge1xuICAgIHJlcXVpcmVPYmplY3RDb2VyY2libGUoTyk7XG4gICAgYVBvc3NpYmxlUHJvdG90eXBlKHByb3RvKTtcbiAgICBpZiAoIWlzT2JqZWN0KE8pKSByZXR1cm4gTztcbiAgICBpZiAoQ09SUkVDVF9TRVRURVIpIHNldHRlcihPLCBwcm90byk7XG4gICAgZWxzZSBPLl9fcHJvdG9fXyA9IHByb3RvO1xuICAgIHJldHVybiBPO1xuICB9O1xufSgpIDogdW5kZWZpbmVkKTtcbiIsIid1c2Ugc3RyaWN0JztcbnZhciBjYWxsID0gcmVxdWlyZSgnLi4vaW50ZXJuYWxzL2Z1bmN0aW9uLWNhbGwnKTtcbnZhciBpc0NhbGxhYmxlID0gcmVxdWlyZSgnLi4vaW50ZXJuYWxzL2lzLWNhbGxhYmxlJyk7XG52YXIgaXNPYmplY3QgPSByZXF1aXJlKCcuLi9pbnRlcm5hbHMvaXMtb2JqZWN0Jyk7XG5cbnZhciAkVHlwZUVycm9yID0gVHlwZUVycm9yO1xuXG4vLyBgT3JkaW5hcnlUb1ByaW1pdGl2ZWAgYWJzdHJhY3Qgb3BlcmF0aW9uXG4vLyBodHRwczovL3RjMzkuZXMvZWNtYTI2Mi8jc2VjLW9yZGluYXJ5dG9wcmltaXRpdmVcbm1vZHVsZS5leHBvcnRzID0gZnVuY3Rpb24gKGlucHV0LCBwcmVmKSB7XG4gIHZhciBmbiwgdmFsO1xuICBpZiAocHJlZiA9PT0gJ3N0cmluZycgJiYgaXNDYWxsYWJsZShmbiA9IGlucHV0LnRvU3RyaW5nKSAmJiAhaXNPYmplY3QodmFsID0gY2FsbChmbiwgaW5wdXQpKSkgcmV0dXJuIHZhbDtcbiAgaWYgKGlzQ2FsbGFibGUoZm4gPSBpbnB1dC52YWx1ZU9mKSAmJiAhaXNPYmplY3QodmFsID0gY2FsbChmbiwgaW5wdXQpKSkgcmV0dXJuIHZhbDtcbiAgaWYgKHByZWYgIT09ICdzdHJpbmcnICYmIGlzQ2FsbGFibGUoZm4gPSBpbnB1dC50b1N0cmluZykgJiYgIWlzT2JqZWN0KHZhbCA9IGNhbGwoZm4sIGlucHV0KSkpIHJldHVybiB2YWw7XG4gIHRocm93IG5ldyAkVHlwZUVycm9yKFwiQ2FuJ3QgY29udmVydCBvYmplY3QgdG8gcHJpbWl0aXZlIHZhbHVlXCIpO1xufTtcbiIsIid1c2Ugc3RyaWN0JztcbnZhciBnZXRCdWlsdEluID0gcmVxdWlyZSgnLi4vaW50ZXJuYWxzL2dldC1idWlsdC1pbicpO1xudmFyIHVuY3VycnlUaGlzID0gcmVxdWlyZSgnLi4vaW50ZXJuYWxzL2Z1bmN0aW9uLXVuY3VycnktdGhpcycpO1xudmFyIGdldE93blByb3BlcnR5TmFtZXNNb2R1bGUgPSByZXF1aXJlKCcuLi9pbnRlcm5hbHMvb2JqZWN0LWdldC1vd24tcHJvcGVydHktbmFtZXMnKTtcbnZhciBnZXRPd25Qcm9wZXJ0eVN5bWJvbHNNb2R1bGUgPSByZXF1aXJlKCcuLi9pbnRlcm5hbHMvb2JqZWN0LWdldC1vd24tcHJvcGVydHktc3ltYm9scycpO1xudmFyIGFuT2JqZWN0ID0gcmVxdWlyZSgnLi4vaW50ZXJuYWxzL2FuLW9iamVjdCcpO1xuXG52YXIgY29uY2F0ID0gdW5jdXJyeVRoaXMoW10uY29uY2F0KTtcblxuLy8gYWxsIG9iamVjdCBrZXlzLCBpbmNsdWRlcyBub24tZW51bWVyYWJsZSBhbmQgc3ltYm9sc1xubW9kdWxlLmV4cG9ydHMgPSBnZXRCdWlsdEluKCdSZWZsZWN0JywgJ293bktleXMnKSB8fCBmdW5jdGlvbiBvd25LZXlzKGl0KSB7XG4gIHZhciBrZXlzID0gZ2V0T3duUHJvcGVydHlOYW1lc01vZHVsZS5mKGFuT2JqZWN0KGl0KSk7XG4gIHZhciBnZXRPd25Qcm9wZXJ0eVN5bWJvbHMgPSBnZXRPd25Qcm9wZXJ0eVN5bWJvbHNNb2R1bGUuZjtcbiAgcmV0dXJuIGdldE93blByb3BlcnR5U3ltYm9scyA/IGNvbmNhdChrZXlzLCBnZXRPd25Qcm9wZXJ0eVN5bWJvbHMoaXQpKSA6IGtleXM7XG59O1xuIiwiJ3VzZSBzdHJpY3QnO1xudmFyIGRlZmluZVByb3BlcnR5ID0gcmVxdWlyZSgnLi4vaW50ZXJuYWxzL29iamVjdC1kZWZpbmUtcHJvcGVydHknKS5mO1xuXG5tb2R1bGUuZXhwb3J0cyA9IGZ1bmN0aW9uIChUYXJnZXQsIFNvdXJjZSwga2V5KSB7XG4gIGtleSBpbiBUYXJnZXQgfHwgZGVmaW5lUHJvcGVydHkoVGFyZ2V0LCBrZXksIHtcbiAgICBjb25maWd1cmFibGU6IHRydWUsXG4gICAgZ2V0OiBmdW5jdGlvbiAoKSB7IHJldHVybiBTb3VyY2Vba2V5XTsgfSxcbiAgICBzZXQ6IGZ1bmN0aW9uIChpdCkgeyBTb3VyY2Vba2V5XSA9IGl0OyB9XG4gIH0pO1xufTtcbiIsIid1c2Ugc3RyaWN0JztcbnZhciBjYWxsID0gcmVxdWlyZSgnLi4vaW50ZXJuYWxzL2Z1bmN0aW9uLWNhbGwnKTtcbnZhciBhbk9iamVjdCA9IHJlcXVpcmUoJy4uL2ludGVybmFscy9hbi1vYmplY3QnKTtcbnZhciBpc0NhbGxhYmxlID0gcmVxdWlyZSgnLi4vaW50ZXJuYWxzL2lzLWNhbGxhYmxlJyk7XG52YXIgY2xhc3NvZiA9IHJlcXVpcmUoJy4uL2ludGVybmFscy9jbGFzc29mLXJhdycpO1xudmFyIHJlZ2V4cEV4ZWMgPSByZXF1aXJlKCcuLi9pbnRlcm5hbHMvcmVnZXhwLWV4ZWMnKTtcblxudmFyICRUeXBlRXJyb3IgPSBUeXBlRXJyb3I7XG5cbi8vIGBSZWdFeHBFeGVjYCBhYnN0cmFjdCBvcGVyYXRpb25cbi8vIGh0dHBzOi8vdGMzOS5lcy9lY21hMjYyLyNzZWMtcmVnZXhwZXhlY1xubW9kdWxlLmV4cG9ydHMgPSBmdW5jdGlvbiAoUiwgUykge1xuICB2YXIgZXhlYyA9IFIuZXhlYztcbiAgaWYgKGlzQ2FsbGFibGUoZXhlYykpIHtcbiAgICB2YXIgcmVzdWx0ID0gY2FsbChleGVjLCBSLCBTKTtcbiAgICBpZiAocmVzdWx0ICE9PSBudWxsKSBhbk9iamVjdChyZXN1bHQpO1xuICAgIHJldHVybiByZXN1bHQ7XG4gIH1cbiAgaWYgKGNsYXNzb2YoUikgPT09ICdSZWdFeHAnKSByZXR1cm4gY2FsbChyZWdleHBFeGVjLCBSLCBTKTtcbiAgdGhyb3cgbmV3ICRUeXBlRXJyb3IoJ1JlZ0V4cCNleGVjIGNhbGxlZCBvbiBpbmNvbXBhdGlibGUgcmVjZWl2ZXInKTtcbn07XG4iLCIndXNlIHN0cmljdCc7XG4vKiBlc2xpbnQtZGlzYWJsZSByZWdleHAvbm8tZW1wdHktY2FwdHVyaW5nLWdyb3VwLCByZWdleHAvbm8tZW1wdHktZ3JvdXAsIHJlZ2V4cC9uby1sYXp5LWVuZHMgLS0gdGVzdGluZyAqL1xuLyogZXNsaW50LWRpc2FibGUgcmVnZXhwL25vLXVzZWxlc3MtcXVhbnRpZmllciAtLSB0ZXN0aW5nICovXG52YXIgY2FsbCA9IHJlcXVpcmUoJy4uL2ludGVybmFscy9mdW5jdGlvbi1jYWxsJyk7XG52YXIgdW5jdXJyeVRoaXMgPSByZXF1aXJlKCcuLi9pbnRlcm5hbHMvZnVuY3Rpb24tdW5jdXJyeS10aGlzJyk7XG52YXIgdG9TdHJpbmcgPSByZXF1aXJlKCcuLi9pbnRlcm5hbHMvdG8tc3RyaW5nJyk7XG52YXIgcmVnZXhwRmxhZ3MgPSByZXF1aXJlKCcuLi9pbnRlcm5hbHMvcmVnZXhwLWZsYWdzJyk7XG52YXIgc3RpY2t5SGVscGVycyA9IHJlcXVpcmUoJy4uL2ludGVybmFscy9yZWdleHAtc3RpY2t5LWhlbHBlcnMnKTtcbnZhciBzaGFyZWQgPSByZXF1aXJlKCcuLi9pbnRlcm5hbHMvc2hhcmVkJyk7XG52YXIgY3JlYXRlID0gcmVxdWlyZSgnLi4vaW50ZXJuYWxzL29iamVjdC1jcmVhdGUnKTtcbnZhciBnZXRJbnRlcm5hbFN0YXRlID0gcmVxdWlyZSgnLi4vaW50ZXJuYWxzL2ludGVybmFsLXN0YXRlJykuZ2V0O1xudmFyIFVOU1VQUE9SVEVEX0RPVF9BTEwgPSByZXF1aXJlKCcuLi9pbnRlcm5hbHMvcmVnZXhwLXVuc3VwcG9ydGVkLWRvdC1hbGwnKTtcbnZhciBVTlNVUFBPUlRFRF9OQ0cgPSByZXF1aXJlKCcuLi9pbnRlcm5hbHMvcmVnZXhwLXVuc3VwcG9ydGVkLW5jZycpO1xuXG52YXIgbmF0aXZlUmVwbGFjZSA9IHNoYXJlZCgnbmF0aXZlLXN0cmluZy1yZXBsYWNlJywgU3RyaW5nLnByb3RvdHlwZS5yZXBsYWNlKTtcbnZhciBuYXRpdmVFeGVjID0gUmVnRXhwLnByb3RvdHlwZS5leGVjO1xudmFyIHBhdGNoZWRFeGVjID0gbmF0aXZlRXhlYztcbnZhciBjaGFyQXQgPSB1bmN1cnJ5VGhpcygnJy5jaGFyQXQpO1xudmFyIGluZGV4T2YgPSB1bmN1cnJ5VGhpcygnJy5pbmRleE9mKTtcbnZhciByZXBsYWNlID0gdW5jdXJyeVRoaXMoJycucmVwbGFjZSk7XG52YXIgc3RyaW5nU2xpY2UgPSB1bmN1cnJ5VGhpcygnJy5zbGljZSk7XG5cbnZhciBVUERBVEVTX0xBU1RfSU5ERVhfV1JPTkcgPSAoZnVuY3Rpb24gKCkge1xuICB2YXIgcmUxID0gL2EvO1xuICB2YXIgcmUyID0gL2IqL2c7XG4gIGNhbGwobmF0aXZlRXhlYywgcmUxLCAnYScpO1xuICBjYWxsKG5hdGl2ZUV4ZWMsIHJlMiwgJ2EnKTtcbiAgcmV0dXJuIHJlMS5sYXN0SW5kZXggIT09IDAgfHwgcmUyLmxhc3RJbmRleCAhPT0gMDtcbn0pKCk7XG5cbnZhciBVTlNVUFBPUlRFRF9ZID0gc3RpY2t5SGVscGVycy5CUk9LRU5fQ0FSRVQ7XG5cbi8vIG5vbnBhcnRpY2lwYXRpbmcgY2FwdHVyaW5nIGdyb3VwLCBjb3BpZWQgZnJvbSBlczUtc2hpbSdzIFN0cmluZyNzcGxpdCBwYXRjaC5cbnZhciBOUENHX0lOQ0xVREVEID0gLygpPz8vLmV4ZWMoJycpWzFdICE9PSB1bmRlZmluZWQ7XG5cbnZhciBQQVRDSCA9IFVQREFURVNfTEFTVF9JTkRFWF9XUk9ORyB8fCBOUENHX0lOQ0xVREVEIHx8IFVOU1VQUE9SVEVEX1kgfHwgVU5TVVBQT1JURURfRE9UX0FMTCB8fCBVTlNVUFBPUlRFRF9OQ0c7XG5cbmlmIChQQVRDSCkge1xuICBwYXRjaGVkRXhlYyA9IGZ1bmN0aW9uIGV4ZWMoc3RyaW5nKSB7XG4gICAgdmFyIHJlID0gdGhpcztcbiAgICB2YXIgc3RhdGUgPSBnZXRJbnRlcm5hbFN0YXRlKHJlKTtcbiAgICB2YXIgc3RyID0gdG9TdHJpbmcoc3RyaW5nKTtcbiAgICB2YXIgcmF3ID0gc3RhdGUucmF3O1xuICAgIHZhciByZXN1bHQsIHJlQ29weSwgbGFzdEluZGV4LCBtYXRjaCwgaSwgb2JqZWN0LCBncm91cDtcblxuICAgIGlmIChyYXcpIHtcbiAgICAgIHJhdy5sYXN0SW5kZXggPSByZS5sYXN0SW5kZXg7XG4gICAgICByZXN1bHQgPSBjYWxsKHBhdGNoZWRFeGVjLCByYXcsIHN0cik7XG4gICAgICByZS5sYXN0SW5kZXggPSByYXcubGFzdEluZGV4O1xuICAgICAgcmV0dXJuIHJlc3VsdDtcbiAgICB9XG5cbiAgICB2YXIgZ3JvdXBzID0gc3RhdGUuZ3JvdXBzO1xuICAgIHZhciBzdGlja3kgPSBVTlNVUFBPUlRFRF9ZICYmIHJlLnN0aWNreTtcbiAgICB2YXIgZmxhZ3MgPSBjYWxsKHJlZ2V4cEZsYWdzLCByZSk7XG4gICAgdmFyIHNvdXJjZSA9IHJlLnNvdXJjZTtcbiAgICB2YXIgY2hhcnNBZGRlZCA9IDA7XG4gICAgdmFyIHN0ckNvcHkgPSBzdHI7XG5cbiAgICBpZiAoc3RpY2t5KSB7XG4gICAgICBmbGFncyA9IHJlcGxhY2UoZmxhZ3MsICd5JywgJycpO1xuICAgICAgaWYgKGluZGV4T2YoZmxhZ3MsICdnJykgPT09IC0xKSB7XG4gICAgICAgIGZsYWdzICs9ICdnJztcbiAgICAgIH1cblxuICAgICAgc3RyQ29weSA9IHN0cmluZ1NsaWNlKHN0ciwgcmUubGFzdEluZGV4KTtcbiAgICAgIC8vIFN1cHBvcnQgYW5jaG9yZWQgc3RpY2t5IGJlaGF2aW9yLlxuICAgICAgaWYgKHJlLmxhc3RJbmRleCA+IDAgJiYgKCFyZS5tdWx0aWxpbmUgfHwgcmUubXVsdGlsaW5lICYmIGNoYXJBdChzdHIsIHJlLmxhc3RJbmRleCAtIDEpICE9PSAnXFxuJykpIHtcbiAgICAgICAgc291cmNlID0gJyg/OiAnICsgc291cmNlICsgJyknO1xuICAgICAgICBzdHJDb3B5ID0gJyAnICsgc3RyQ29weTtcbiAgICAgICAgY2hhcnNBZGRlZCsrO1xuICAgICAgfVxuICAgICAgLy8gXig/ICsgcnggKyApIGlzIG5lZWRlZCwgaW4gY29tYmluYXRpb24gd2l0aCBzb21lIHN0ciBzbGljaW5nLCB0b1xuICAgICAgLy8gc2ltdWxhdGUgdGhlICd5JyBmbGFnLlxuICAgICAgcmVDb3B5ID0gbmV3IFJlZ0V4cCgnXig/OicgKyBzb3VyY2UgKyAnKScsIGZsYWdzKTtcbiAgICB9XG5cbiAgICBpZiAoTlBDR19JTkNMVURFRCkge1xuICAgICAgcmVDb3B5ID0gbmV3IFJlZ0V4cCgnXicgKyBzb3VyY2UgKyAnJCg/IVxcXFxzKScsIGZsYWdzKTtcbiAgICB9XG4gICAgaWYgKFVQREFURVNfTEFTVF9JTkRFWF9XUk9ORykgbGFzdEluZGV4ID0gcmUubGFzdEluZGV4O1xuXG4gICAgbWF0Y2ggPSBjYWxsKG5hdGl2ZUV4ZWMsIHN0aWNreSA/IHJlQ29weSA6IHJlLCBzdHJDb3B5KTtcblxuICAgIGlmIChzdGlja3kpIHtcbiAgICAgIGlmIChtYXRjaCkge1xuICAgICAgICBtYXRjaC5pbnB1dCA9IHN0cmluZ1NsaWNlKG1hdGNoLmlucHV0LCBjaGFyc0FkZGVkKTtcbiAgICAgICAgbWF0Y2hbMF0gPSBzdHJpbmdTbGljZShtYXRjaFswXSwgY2hhcnNBZGRlZCk7XG4gICAgICAgIG1hdGNoLmluZGV4ID0gcmUubGFzdEluZGV4O1xuICAgICAgICByZS5sYXN0SW5kZXggKz0gbWF0Y2hbMF0ubGVuZ3RoO1xuICAgICAgfSBlbHNlIHJlLmxhc3RJbmRleCA9IDA7XG4gICAgfSBlbHNlIGlmIChVUERBVEVTX0xBU1RfSU5ERVhfV1JPTkcgJiYgbWF0Y2gpIHtcbiAgICAgIHJlLmxhc3RJbmRleCA9IHJlLmdsb2JhbCA/IG1hdGNoLmluZGV4ICsgbWF0Y2hbMF0ubGVuZ3RoIDogbGFzdEluZGV4O1xuICAgIH1cbiAgICBpZiAoTlBDR19JTkNMVURFRCAmJiBtYXRjaCAmJiBtYXRjaC5sZW5ndGggPiAxKSB7XG4gICAgICAvLyBGaXggYnJvd3NlcnMgd2hvc2UgYGV4ZWNgIG1ldGhvZHMgZG9uJ3QgY29uc2lzdGVudGx5IHJldHVybiBgdW5kZWZpbmVkYFxuICAgICAgLy8gZm9yIE5QQ0csIGxpa2UgSUU4LiBOT1RFOiBUaGlzIGRvZXNuJ3Qgd29yayBmb3IgLyguPyk/L1xuICAgICAgY2FsbChuYXRpdmVSZXBsYWNlLCBtYXRjaFswXSwgcmVDb3B5LCBmdW5jdGlvbiAoKSB7XG4gICAgICAgIGZvciAoaSA9IDE7IGkgPCBhcmd1bWVudHMubGVuZ3RoIC0gMjsgaSsrKSB7XG4gICAgICAgICAgaWYgKGFyZ3VtZW50c1tpXSA9PT0gdW5kZWZpbmVkKSBtYXRjaFtpXSA9IHVuZGVmaW5lZDtcbiAgICAgICAgfVxuICAgICAgfSk7XG4gICAgfVxuXG4gICAgaWYgKG1hdGNoICYmIGdyb3Vwcykge1xuICAgICAgbWF0Y2guZ3JvdXBzID0gb2JqZWN0ID0gY3JlYXRlKG51bGwpO1xuICAgICAgZm9yIChpID0gMDsgaSA8IGdyb3Vwcy5sZW5ndGg7IGkrKykge1xuICAgICAgICBncm91cCA9IGdyb3Vwc1tpXTtcbiAgICAgICAgb2JqZWN0W2dyb3VwWzBdXSA9IG1hdGNoW2dyb3VwWzFdXTtcbiAgICAgIH1cbiAgICB9XG5cbiAgICByZXR1cm4gbWF0Y2g7XG4gIH07XG59XG5cbm1vZHVsZS5leHBvcnRzID0gcGF0Y2hlZEV4ZWM7XG4iLCIndXNlIHN0cmljdCc7XG52YXIgYW5PYmplY3QgPSByZXF1aXJlKCcuLi9pbnRlcm5hbHMvYW4tb2JqZWN0Jyk7XG5cbi8vIGBSZWdFeHAucHJvdG90eXBlLmZsYWdzYCBnZXR0ZXIgaW1wbGVtZW50YXRpb25cbi8vIGh0dHBzOi8vdGMzOS5lcy9lY21hMjYyLyNzZWMtZ2V0LXJlZ2V4cC5wcm90b3R5cGUuZmxhZ3Ncbm1vZHVsZS5leHBvcnRzID0gZnVuY3Rpb24gKCkge1xuICB2YXIgdGhhdCA9IGFuT2JqZWN0KHRoaXMpO1xuICB2YXIgcmVzdWx0ID0gJyc7XG4gIGlmICh0aGF0Lmhhc0luZGljZXMpIHJlc3VsdCArPSAnZCc7XG4gIGlmICh0aGF0Lmdsb2JhbCkgcmVzdWx0ICs9ICdnJztcbiAgaWYgKHRoYXQuaWdub3JlQ2FzZSkgcmVzdWx0ICs9ICdpJztcbiAgaWYgKHRoYXQubXVsdGlsaW5lKSByZXN1bHQgKz0gJ20nO1xuICBpZiAodGhhdC5kb3RBbGwpIHJlc3VsdCArPSAncyc7XG4gIGlmICh0aGF0LnVuaWNvZGUpIHJlc3VsdCArPSAndSc7XG4gIGlmICh0aGF0LnVuaWNvZGVTZXRzKSByZXN1bHQgKz0gJ3YnO1xuICBpZiAodGhhdC5zdGlja3kpIHJlc3VsdCArPSAneSc7XG4gIHJldHVybiByZXN1bHQ7XG59O1xuIiwiJ3VzZSBzdHJpY3QnO1xudmFyIGNhbGwgPSByZXF1aXJlKCcuLi9pbnRlcm5hbHMvZnVuY3Rpb24tY2FsbCcpO1xudmFyIGhhc093biA9IHJlcXVpcmUoJy4uL2ludGVybmFscy9oYXMtb3duLXByb3BlcnR5Jyk7XG52YXIgaXNQcm90b3R5cGVPZiA9IHJlcXVpcmUoJy4uL2ludGVybmFscy9vYmplY3QtaXMtcHJvdG90eXBlLW9mJyk7XG52YXIgcmVnRXhwRmxhZ3MgPSByZXF1aXJlKCcuLi9pbnRlcm5hbHMvcmVnZXhwLWZsYWdzJyk7XG5cbnZhciBSZWdFeHBQcm90b3R5cGUgPSBSZWdFeHAucHJvdG90eXBlO1xuXG5tb2R1bGUuZXhwb3J0cyA9IGZ1bmN0aW9uIChSKSB7XG4gIHZhciBmbGFncyA9IFIuZmxhZ3M7XG4gIHJldHVybiBmbGFncyA9PT0gdW5kZWZpbmVkICYmICEoJ2ZsYWdzJyBpbiBSZWdFeHBQcm90b3R5cGUpICYmICFoYXNPd24oUiwgJ2ZsYWdzJykgJiYgaXNQcm90b3R5cGVPZihSZWdFeHBQcm90b3R5cGUsIFIpXG4gICAgPyBjYWxsKHJlZ0V4cEZsYWdzLCBSKSA6IGZsYWdzO1xufTtcbiIsIid1c2Ugc3RyaWN0JztcbnZhciBmYWlscyA9IHJlcXVpcmUoJy4uL2ludGVybmFscy9mYWlscycpO1xudmFyIGdsb2JhbCA9IHJlcXVpcmUoJy4uL2ludGVybmFscy9nbG9iYWwnKTtcblxuLy8gYmFiZWwtbWluaWZ5IGFuZCBDbG9zdXJlIENvbXBpbGVyIHRyYW5zcGlsZXMgUmVnRXhwKCdhJywgJ3knKSAtPiAvYS95IGFuZCBpdCBjYXVzZXMgU3ludGF4RXJyb3JcbnZhciAkUmVnRXhwID0gZ2xvYmFsLlJlZ0V4cDtcblxudmFyIFVOU1VQUE9SVEVEX1kgPSBmYWlscyhmdW5jdGlvbiAoKSB7XG4gIHZhciByZSA9ICRSZWdFeHAoJ2EnLCAneScpO1xuICByZS5sYXN0SW5kZXggPSAyO1xuICByZXR1cm4gcmUuZXhlYygnYWJjZCcpICE9PSBudWxsO1xufSk7XG5cbi8vIFVDIEJyb3dzZXIgYnVnXG4vLyBodHRwczovL2dpdGh1Yi5jb20vemxvaXJvY2svY29yZS1qcy9pc3N1ZXMvMTAwOFxudmFyIE1JU1NFRF9TVElDS1kgPSBVTlNVUFBPUlRFRF9ZIHx8IGZhaWxzKGZ1bmN0aW9uICgpIHtcbiAgcmV0dXJuICEkUmVnRXhwKCdhJywgJ3knKS5zdGlja3k7XG59KTtcblxudmFyIEJST0tFTl9DQVJFVCA9IFVOU1VQUE9SVEVEX1kgfHwgZmFpbHMoZnVuY3Rpb24gKCkge1xuICAvLyBodHRwczovL2J1Z3ppbGxhLm1vemlsbGEub3JnL3Nob3dfYnVnLmNnaT9pZD03NzM2ODdcbiAgdmFyIHJlID0gJFJlZ0V4cCgnXnInLCAnZ3knKTtcbiAgcmUubGFzdEluZGV4ID0gMjtcbiAgcmV0dXJuIHJlLmV4ZWMoJ3N0cicpICE9PSBudWxsO1xufSk7XG5cbm1vZHVsZS5leHBvcnRzID0ge1xuICBCUk9LRU5fQ0FSRVQ6IEJST0tFTl9DQVJFVCxcbiAgTUlTU0VEX1NUSUNLWTogTUlTU0VEX1NUSUNLWSxcbiAgVU5TVVBQT1JURURfWTogVU5TVVBQT1JURURfWVxufTtcbiIsIid1c2Ugc3RyaWN0JztcbnZhciBmYWlscyA9IHJlcXVpcmUoJy4uL2ludGVybmFscy9mYWlscycpO1xudmFyIGdsb2JhbCA9IHJlcXVpcmUoJy4uL2ludGVybmFscy9nbG9iYWwnKTtcblxuLy8gYmFiZWwtbWluaWZ5IGFuZCBDbG9zdXJlIENvbXBpbGVyIHRyYW5zcGlsZXMgUmVnRXhwKCcuJywgJ3MnKSAtPiAvLi9zIGFuZCBpdCBjYXVzZXMgU3ludGF4RXJyb3JcbnZhciAkUmVnRXhwID0gZ2xvYmFsLlJlZ0V4cDtcblxubW9kdWxlLmV4cG9ydHMgPSBmYWlscyhmdW5jdGlvbiAoKSB7XG4gIHZhciByZSA9ICRSZWdFeHAoJy4nLCAncycpO1xuICByZXR1cm4gIShyZS5kb3RBbGwgJiYgcmUudGVzdCgnXFxuJykgJiYgcmUuZmxhZ3MgPT09ICdzJyk7XG59KTtcbiIsIid1c2Ugc3RyaWN0JztcbnZhciBmYWlscyA9IHJlcXVpcmUoJy4uL2ludGVybmFscy9mYWlscycpO1xudmFyIGdsb2JhbCA9IHJlcXVpcmUoJy4uL2ludGVybmFscy9nbG9iYWwnKTtcblxuLy8gYmFiZWwtbWluaWZ5IGFuZCBDbG9zdXJlIENvbXBpbGVyIHRyYW5zcGlsZXMgUmVnRXhwKCcoPzxhPmIpJywgJ2cnKSAtPiAvKD88YT5iKS9nIGFuZCBpdCBjYXVzZXMgU3ludGF4RXJyb3JcbnZhciAkUmVnRXhwID0gZ2xvYmFsLlJlZ0V4cDtcblxubW9kdWxlLmV4cG9ydHMgPSBmYWlscyhmdW5jdGlvbiAoKSB7XG4gIHZhciByZSA9ICRSZWdFeHAoJyg/PGE+YiknLCAnZycpO1xuICByZXR1cm4gcmUuZXhlYygnYicpLmdyb3Vwcy5hICE9PSAnYicgfHxcbiAgICAnYicucmVwbGFjZShyZSwgJyQ8YT5jJykgIT09ICdiYyc7XG59KTtcbiIsIid1c2Ugc3RyaWN0JztcbnZhciBpc051bGxPclVuZGVmaW5lZCA9IHJlcXVpcmUoJy4uL2ludGVybmFscy9pcy1udWxsLW9yLXVuZGVmaW5lZCcpO1xuXG52YXIgJFR5cGVFcnJvciA9IFR5cGVFcnJvcjtcblxuLy8gYFJlcXVpcmVPYmplY3RDb2VyY2libGVgIGFic3RyYWN0IG9wZXJhdGlvblxuLy8gaHR0cHM6Ly90YzM5LmVzL2VjbWEyNjIvI3NlYy1yZXF1aXJlb2JqZWN0Y29lcmNpYmxlXG5tb2R1bGUuZXhwb3J0cyA9IGZ1bmN0aW9uIChpdCkge1xuICBpZiAoaXNOdWxsT3JVbmRlZmluZWQoaXQpKSB0aHJvdyBuZXcgJFR5cGVFcnJvcihcIkNhbid0IGNhbGwgbWV0aG9kIG9uIFwiICsgaXQpO1xuICByZXR1cm4gaXQ7XG59O1xuIiwiJ3VzZSBzdHJpY3QnO1xudmFyIGdsb2JhbCA9IHJlcXVpcmUoJy4uL2ludGVybmFscy9nbG9iYWwnKTtcbnZhciBERVNDUklQVE9SUyA9IHJlcXVpcmUoJy4uL2ludGVybmFscy9kZXNjcmlwdG9ycycpO1xuXG4vLyBlc2xpbnQtZGlzYWJsZS1uZXh0LWxpbmUgZXMvbm8tb2JqZWN0LWdldG93bnByb3BlcnR5ZGVzY3JpcHRvciAtLSBzYWZlXG52YXIgZ2V0T3duUHJvcGVydHlEZXNjcmlwdG9yID0gT2JqZWN0LmdldE93blByb3BlcnR5RGVzY3JpcHRvcjtcblxuLy8gQXZvaWQgTm9kZUpTIGV4cGVyaW1lbnRhbCB3YXJuaW5nXG5tb2R1bGUuZXhwb3J0cyA9IGZ1bmN0aW9uIChuYW1lKSB7XG4gIGlmICghREVTQ1JJUFRPUlMpIHJldHVybiBnbG9iYWxbbmFtZV07XG4gIHZhciBkZXNjcmlwdG9yID0gZ2V0T3duUHJvcGVydHlEZXNjcmlwdG9yKGdsb2JhbCwgbmFtZSk7XG4gIHJldHVybiBkZXNjcmlwdG9yICYmIGRlc2NyaXB0b3IudmFsdWU7XG59O1xuIiwiJ3VzZSBzdHJpY3QnO1xudmFyIGdldEJ1aWx0SW4gPSByZXF1aXJlKCcuLi9pbnRlcm5hbHMvZ2V0LWJ1aWx0LWluJyk7XG52YXIgZGVmaW5lQnVpbHRJbkFjY2Vzc29yID0gcmVxdWlyZSgnLi4vaW50ZXJuYWxzL2RlZmluZS1idWlsdC1pbi1hY2Nlc3NvcicpO1xudmFyIHdlbGxLbm93blN5bWJvbCA9IHJlcXVpcmUoJy4uL2ludGVybmFscy93ZWxsLWtub3duLXN5bWJvbCcpO1xudmFyIERFU0NSSVBUT1JTID0gcmVxdWlyZSgnLi4vaW50ZXJuYWxzL2Rlc2NyaXB0b3JzJyk7XG5cbnZhciBTUEVDSUVTID0gd2VsbEtub3duU3ltYm9sKCdzcGVjaWVzJyk7XG5cbm1vZHVsZS5leHBvcnRzID0gZnVuY3Rpb24gKENPTlNUUlVDVE9SX05BTUUpIHtcbiAgdmFyIENvbnN0cnVjdG9yID0gZ2V0QnVpbHRJbihDT05TVFJVQ1RPUl9OQU1FKTtcblxuICBpZiAoREVTQ1JJUFRPUlMgJiYgQ29uc3RydWN0b3IgJiYgIUNvbnN0cnVjdG9yW1NQRUNJRVNdKSB7XG4gICAgZGVmaW5lQnVpbHRJbkFjY2Vzc29yKENvbnN0cnVjdG9yLCBTUEVDSUVTLCB7XG4gICAgICBjb25maWd1cmFibGU6IHRydWUsXG4gICAgICBnZXQ6IGZ1bmN0aW9uICgpIHsgcmV0dXJuIHRoaXM7IH1cbiAgICB9KTtcbiAgfVxufTtcbiIsIid1c2Ugc3RyaWN0JztcbnZhciBkZWZpbmVQcm9wZXJ0eSA9IHJlcXVpcmUoJy4uL2ludGVybmFscy9vYmplY3QtZGVmaW5lLXByb3BlcnR5JykuZjtcbnZhciBoYXNPd24gPSByZXF1aXJlKCcuLi9pbnRlcm5hbHMvaGFzLW93bi1wcm9wZXJ0eScpO1xudmFyIHdlbGxLbm93blN5bWJvbCA9IHJlcXVpcmUoJy4uL2ludGVybmFscy93ZWxsLWtub3duLXN5bWJvbCcpO1xuXG52YXIgVE9fU1RSSU5HX1RBRyA9IHdlbGxLbm93blN5bWJvbCgndG9TdHJpbmdUYWcnKTtcblxubW9kdWxlLmV4cG9ydHMgPSBmdW5jdGlvbiAodGFyZ2V0LCBUQUcsIFNUQVRJQykge1xuICBpZiAodGFyZ2V0ICYmICFTVEFUSUMpIHRhcmdldCA9IHRhcmdldC5wcm90b3R5cGU7XG4gIGlmICh0YXJnZXQgJiYgIWhhc093bih0YXJnZXQsIFRPX1NUUklOR19UQUcpKSB7XG4gICAgZGVmaW5lUHJvcGVydHkodGFyZ2V0LCBUT19TVFJJTkdfVEFHLCB7IGNvbmZpZ3VyYWJsZTogdHJ1ZSwgdmFsdWU6IFRBRyB9KTtcbiAgfVxufTtcbiIsIid1c2Ugc3RyaWN0JztcbnZhciBzaGFyZWQgPSByZXF1aXJlKCcuLi9pbnRlcm5hbHMvc2hhcmVkJyk7XG52YXIgdWlkID0gcmVxdWlyZSgnLi4vaW50ZXJuYWxzL3VpZCcpO1xuXG52YXIga2V5cyA9IHNoYXJlZCgna2V5cycpO1xuXG5tb2R1bGUuZXhwb3J0cyA9IGZ1bmN0aW9uIChrZXkpIHtcbiAgcmV0dXJuIGtleXNba2V5XSB8fCAoa2V5c1trZXldID0gdWlkKGtleSkpO1xufTtcbiIsIid1c2Ugc3RyaWN0JztcbnZhciBJU19QVVJFID0gcmVxdWlyZSgnLi4vaW50ZXJuYWxzL2lzLXB1cmUnKTtcbnZhciBnbG9iYWxUaGlzID0gcmVxdWlyZSgnLi4vaW50ZXJuYWxzL2dsb2JhbCcpO1xudmFyIGRlZmluZUdsb2JhbFByb3BlcnR5ID0gcmVxdWlyZSgnLi4vaW50ZXJuYWxzL2RlZmluZS1nbG9iYWwtcHJvcGVydHknKTtcblxudmFyIFNIQVJFRCA9ICdfX2NvcmUtanNfc2hhcmVkX18nO1xudmFyIHN0b3JlID0gbW9kdWxlLmV4cG9ydHMgPSBnbG9iYWxUaGlzW1NIQVJFRF0gfHwgZGVmaW5lR2xvYmFsUHJvcGVydHkoU0hBUkVELCB7fSk7XG5cbihzdG9yZS52ZXJzaW9ucyB8fCAoc3RvcmUudmVyc2lvbnMgPSBbXSkpLnB1c2goe1xuICB2ZXJzaW9uOiAnMy4zNy4xJyxcbiAgbW9kZTogSVNfUFVSRSA/ICdwdXJlJyA6ICdnbG9iYWwnLFxuICBjb3B5cmlnaHQ6ICfCqSAyMDE0LTIwMjQgRGVuaXMgUHVzaGthcmV2ICh6bG9pcm9jay5ydSknLFxuICBsaWNlbnNlOiAnaHR0cHM6Ly9naXRodWIuY29tL3psb2lyb2NrL2NvcmUtanMvYmxvYi92My4zNy4xL0xJQ0VOU0UnLFxuICBzb3VyY2U6ICdodHRwczovL2dpdGh1Yi5jb20vemxvaXJvY2svY29yZS1qcydcbn0pO1xuIiwiJ3VzZSBzdHJpY3QnO1xudmFyIHN0b3JlID0gcmVxdWlyZSgnLi4vaW50ZXJuYWxzL3NoYXJlZC1zdG9yZScpO1xuXG5tb2R1bGUuZXhwb3J0cyA9IGZ1bmN0aW9uIChrZXksIHZhbHVlKSB7XG4gIHJldHVybiBzdG9yZVtrZXldIHx8IChzdG9yZVtrZXldID0gdmFsdWUgfHwge30pO1xufTtcbiIsIid1c2Ugc3RyaWN0JztcbnZhciBhbk9iamVjdCA9IHJlcXVpcmUoJy4uL2ludGVybmFscy9hbi1vYmplY3QnKTtcbnZhciBhQ29uc3RydWN0b3IgPSByZXF1aXJlKCcuLi9pbnRlcm5hbHMvYS1jb25zdHJ1Y3RvcicpO1xudmFyIGlzTnVsbE9yVW5kZWZpbmVkID0gcmVxdWlyZSgnLi4vaW50ZXJuYWxzL2lzLW51bGwtb3ItdW5kZWZpbmVkJyk7XG52YXIgd2VsbEtub3duU3ltYm9sID0gcmVxdWlyZSgnLi4vaW50ZXJuYWxzL3dlbGwta25vd24tc3ltYm9sJyk7XG5cbnZhciBTUEVDSUVTID0gd2VsbEtub3duU3ltYm9sKCdzcGVjaWVzJyk7XG5cbi8vIGBTcGVjaWVzQ29uc3RydWN0b3JgIGFic3RyYWN0IG9wZXJhdGlvblxuLy8gaHR0cHM6Ly90YzM5LmVzL2VjbWEyNjIvI3NlYy1zcGVjaWVzY29uc3RydWN0b3Jcbm1vZHVsZS5leHBvcnRzID0gZnVuY3Rpb24gKE8sIGRlZmF1bHRDb25zdHJ1Y3Rvcikge1xuICB2YXIgQyA9IGFuT2JqZWN0KE8pLmNvbnN0cnVjdG9yO1xuICB2YXIgUztcbiAgcmV0dXJuIEMgPT09IHVuZGVmaW5lZCB8fCBpc051bGxPclVuZGVmaW5lZChTID0gYW5PYmplY3QoQylbU1BFQ0lFU10pID8gZGVmYXVsdENvbnN0cnVjdG9yIDogYUNvbnN0cnVjdG9yKFMpO1xufTtcbiIsIid1c2Ugc3RyaWN0JztcbnZhciB1bmN1cnJ5VGhpcyA9IHJlcXVpcmUoJy4uL2ludGVybmFscy9mdW5jdGlvbi11bmN1cnJ5LXRoaXMnKTtcbnZhciB0b0ludGVnZXJPckluZmluaXR5ID0gcmVxdWlyZSgnLi4vaW50ZXJuYWxzL3RvLWludGVnZXItb3ItaW5maW5pdHknKTtcbnZhciB0b1N0cmluZyA9IHJlcXVpcmUoJy4uL2ludGVybmFscy90by1zdHJpbmcnKTtcbnZhciByZXF1aXJlT2JqZWN0Q29lcmNpYmxlID0gcmVxdWlyZSgnLi4vaW50ZXJuYWxzL3JlcXVpcmUtb2JqZWN0LWNvZXJjaWJsZScpO1xuXG52YXIgY2hhckF0ID0gdW5jdXJyeVRoaXMoJycuY2hhckF0KTtcbnZhciBjaGFyQ29kZUF0ID0gdW5jdXJyeVRoaXMoJycuY2hhckNvZGVBdCk7XG52YXIgc3RyaW5nU2xpY2UgPSB1bmN1cnJ5VGhpcygnJy5zbGljZSk7XG5cbnZhciBjcmVhdGVNZXRob2QgPSBmdW5jdGlvbiAoQ09OVkVSVF9UT19TVFJJTkcpIHtcbiAgcmV0dXJuIGZ1bmN0aW9uICgkdGhpcywgcG9zKSB7XG4gICAgdmFyIFMgPSB0b1N0cmluZyhyZXF1aXJlT2JqZWN0Q29lcmNpYmxlKCR0aGlzKSk7XG4gICAgdmFyIHBvc2l0aW9uID0gdG9JbnRlZ2VyT3JJbmZpbml0eShwb3MpO1xuICAgIHZhciBzaXplID0gUy5sZW5ndGg7XG4gICAgdmFyIGZpcnN0LCBzZWNvbmQ7XG4gICAgaWYgKHBvc2l0aW9uIDwgMCB8fCBwb3NpdGlvbiA+PSBzaXplKSByZXR1cm4gQ09OVkVSVF9UT19TVFJJTkcgPyAnJyA6IHVuZGVmaW5lZDtcbiAgICBmaXJzdCA9IGNoYXJDb2RlQXQoUywgcG9zaXRpb24pO1xuICAgIHJldHVybiBmaXJzdCA8IDB4RDgwMCB8fCBmaXJzdCA+IDB4REJGRiB8fCBwb3NpdGlvbiArIDEgPT09IHNpemVcbiAgICAgIHx8IChzZWNvbmQgPSBjaGFyQ29kZUF0KFMsIHBvc2l0aW9uICsgMSkpIDwgMHhEQzAwIHx8IHNlY29uZCA+IDB4REZGRlxuICAgICAgICA/IENPTlZFUlRfVE9fU1RSSU5HXG4gICAgICAgICAgPyBjaGFyQXQoUywgcG9zaXRpb24pXG4gICAgICAgICAgOiBmaXJzdFxuICAgICAgICA6IENPTlZFUlRfVE9fU1RSSU5HXG4gICAgICAgICAgPyBzdHJpbmdTbGljZShTLCBwb3NpdGlvbiwgcG9zaXRpb24gKyAyKVxuICAgICAgICAgIDogKGZpcnN0IC0gMHhEODAwIDw8IDEwKSArIChzZWNvbmQgLSAweERDMDApICsgMHgxMDAwMDtcbiAgfTtcbn07XG5cbm1vZHVsZS5leHBvcnRzID0ge1xuICAvLyBgU3RyaW5nLnByb3RvdHlwZS5jb2RlUG9pbnRBdGAgbWV0aG9kXG4gIC8vIGh0dHBzOi8vdGMzOS5lcy9lY21hMjYyLyNzZWMtc3RyaW5nLnByb3RvdHlwZS5jb2RlcG9pbnRhdFxuICBjb2RlQXQ6IGNyZWF0ZU1ldGhvZChmYWxzZSksXG4gIC8vIGBTdHJpbmcucHJvdG90eXBlLmF0YCBtZXRob2RcbiAgLy8gaHR0cHM6Ly9naXRodWIuY29tL21hdGhpYXNieW5lbnMvU3RyaW5nLnByb3RvdHlwZS5hdFxuICBjaGFyQXQ6IGNyZWF0ZU1ldGhvZCh0cnVlKVxufTtcbiIsIid1c2Ugc3RyaWN0Jztcbi8vIGJhc2VkIG9uIGh0dHBzOi8vZ2l0aHViLmNvbS9iZXN0aWVqcy9wdW55Y29kZS5qcy9ibG9iL21hc3Rlci9wdW55Y29kZS5qc1xudmFyIHVuY3VycnlUaGlzID0gcmVxdWlyZSgnLi4vaW50ZXJuYWxzL2Z1bmN0aW9uLXVuY3VycnktdGhpcycpO1xuXG52YXIgbWF4SW50ID0gMjE0NzQ4MzY0NzsgLy8gYWthLiAweDdGRkZGRkZGIG9yIDJeMzEtMVxudmFyIGJhc2UgPSAzNjtcbnZhciB0TWluID0gMTtcbnZhciB0TWF4ID0gMjY7XG52YXIgc2tldyA9IDM4O1xudmFyIGRhbXAgPSA3MDA7XG52YXIgaW5pdGlhbEJpYXMgPSA3MjtcbnZhciBpbml0aWFsTiA9IDEyODsgLy8gMHg4MFxudmFyIGRlbGltaXRlciA9ICctJzsgLy8gJ1xceDJEJ1xudmFyIHJlZ2V4Tm9uQVNDSUkgPSAvW15cXDAtXFx1MDA3RV0vOyAvLyBub24tQVNDSUkgY2hhcnNcbnZhciByZWdleFNlcGFyYXRvcnMgPSAvWy5cXHUzMDAyXFx1RkYwRVxcdUZGNjFdL2c7IC8vIFJGQyAzNDkwIHNlcGFyYXRvcnNcbnZhciBPVkVSRkxPV19FUlJPUiA9ICdPdmVyZmxvdzogaW5wdXQgbmVlZHMgd2lkZXIgaW50ZWdlcnMgdG8gcHJvY2Vzcyc7XG52YXIgYmFzZU1pbnVzVE1pbiA9IGJhc2UgLSB0TWluO1xuXG52YXIgJFJhbmdlRXJyb3IgPSBSYW5nZUVycm9yO1xudmFyIGV4ZWMgPSB1bmN1cnJ5VGhpcyhyZWdleFNlcGFyYXRvcnMuZXhlYyk7XG52YXIgZmxvb3IgPSBNYXRoLmZsb29yO1xudmFyIGZyb21DaGFyQ29kZSA9IFN0cmluZy5mcm9tQ2hhckNvZGU7XG52YXIgY2hhckNvZGVBdCA9IHVuY3VycnlUaGlzKCcnLmNoYXJDb2RlQXQpO1xudmFyIGpvaW4gPSB1bmN1cnJ5VGhpcyhbXS5qb2luKTtcbnZhciBwdXNoID0gdW5jdXJyeVRoaXMoW10ucHVzaCk7XG52YXIgcmVwbGFjZSA9IHVuY3VycnlUaGlzKCcnLnJlcGxhY2UpO1xudmFyIHNwbGl0ID0gdW5jdXJyeVRoaXMoJycuc3BsaXQpO1xudmFyIHRvTG93ZXJDYXNlID0gdW5jdXJyeVRoaXMoJycudG9Mb3dlckNhc2UpO1xuXG4vKipcbiAqIENyZWF0ZXMgYW4gYXJyYXkgY29udGFpbmluZyB0aGUgbnVtZXJpYyBjb2RlIHBvaW50cyBvZiBlYWNoIFVuaWNvZGVcbiAqIGNoYXJhY3RlciBpbiB0aGUgc3RyaW5nLiBXaGlsZSBKYXZhU2NyaXB0IHVzZXMgVUNTLTIgaW50ZXJuYWxseSxcbiAqIHRoaXMgZnVuY3Rpb24gd2lsbCBjb252ZXJ0IGEgcGFpciBvZiBzdXJyb2dhdGUgaGFsdmVzIChlYWNoIG9mIHdoaWNoXG4gKiBVQ1MtMiBleHBvc2VzIGFzIHNlcGFyYXRlIGNoYXJhY3RlcnMpIGludG8gYSBzaW5nbGUgY29kZSBwb2ludCxcbiAqIG1hdGNoaW5nIFVURi0xNi5cbiAqL1xudmFyIHVjczJkZWNvZGUgPSBmdW5jdGlvbiAoc3RyaW5nKSB7XG4gIHZhciBvdXRwdXQgPSBbXTtcbiAgdmFyIGNvdW50ZXIgPSAwO1xuICB2YXIgbGVuZ3RoID0gc3RyaW5nLmxlbmd0aDtcbiAgd2hpbGUgKGNvdW50ZXIgPCBsZW5ndGgpIHtcbiAgICB2YXIgdmFsdWUgPSBjaGFyQ29kZUF0KHN0cmluZywgY291bnRlcisrKTtcbiAgICBpZiAodmFsdWUgPj0gMHhEODAwICYmIHZhbHVlIDw9IDB4REJGRiAmJiBjb3VudGVyIDwgbGVuZ3RoKSB7XG4gICAgICAvLyBJdCdzIGEgaGlnaCBzdXJyb2dhdGUsIGFuZCB0aGVyZSBpcyBhIG5leHQgY2hhcmFjdGVyLlxuICAgICAgdmFyIGV4dHJhID0gY2hhckNvZGVBdChzdHJpbmcsIGNvdW50ZXIrKyk7XG4gICAgICBpZiAoKGV4dHJhICYgMHhGQzAwKSA9PT0gMHhEQzAwKSB7IC8vIExvdyBzdXJyb2dhdGUuXG4gICAgICAgIHB1c2gob3V0cHV0LCAoKHZhbHVlICYgMHgzRkYpIDw8IDEwKSArIChleHRyYSAmIDB4M0ZGKSArIDB4MTAwMDApO1xuICAgICAgfSBlbHNlIHtcbiAgICAgICAgLy8gSXQncyBhbiB1bm1hdGNoZWQgc3Vycm9nYXRlOyBvbmx5IGFwcGVuZCB0aGlzIGNvZGUgdW5pdCwgaW4gY2FzZSB0aGVcbiAgICAgICAgLy8gbmV4dCBjb2RlIHVuaXQgaXMgdGhlIGhpZ2ggc3Vycm9nYXRlIG9mIGEgc3Vycm9nYXRlIHBhaXIuXG4gICAgICAgIHB1c2gob3V0cHV0LCB2YWx1ZSk7XG4gICAgICAgIGNvdW50ZXItLTtcbiAgICAgIH1cbiAgICB9IGVsc2Uge1xuICAgICAgcHVzaChvdXRwdXQsIHZhbHVlKTtcbiAgICB9XG4gIH1cbiAgcmV0dXJuIG91dHB1dDtcbn07XG5cbi8qKlxuICogQ29udmVydHMgYSBkaWdpdC9pbnRlZ2VyIGludG8gYSBiYXNpYyBjb2RlIHBvaW50LlxuICovXG52YXIgZGlnaXRUb0Jhc2ljID0gZnVuY3Rpb24gKGRpZ2l0KSB7XG4gIC8vICAwLi4yNSBtYXAgdG8gQVNDSUkgYS4ueiBvciBBLi5aXG4gIC8vIDI2Li4zNSBtYXAgdG8gQVNDSUkgMC4uOVxuICByZXR1cm4gZGlnaXQgKyAyMiArIDc1ICogKGRpZ2l0IDwgMjYpO1xufTtcblxuLyoqXG4gKiBCaWFzIGFkYXB0YXRpb24gZnVuY3Rpb24gYXMgcGVyIHNlY3Rpb24gMy40IG9mIFJGQyAzNDkyLlxuICogaHR0cHM6Ly90b29scy5pZXRmLm9yZy9odG1sL3JmYzM0OTIjc2VjdGlvbi0zLjRcbiAqL1xudmFyIGFkYXB0ID0gZnVuY3Rpb24gKGRlbHRhLCBudW1Qb2ludHMsIGZpcnN0VGltZSkge1xuICB2YXIgayA9IDA7XG4gIGRlbHRhID0gZmlyc3RUaW1lID8gZmxvb3IoZGVsdGEgLyBkYW1wKSA6IGRlbHRhID4+IDE7XG4gIGRlbHRhICs9IGZsb29yKGRlbHRhIC8gbnVtUG9pbnRzKTtcbiAgd2hpbGUgKGRlbHRhID4gYmFzZU1pbnVzVE1pbiAqIHRNYXggPj4gMSkge1xuICAgIGRlbHRhID0gZmxvb3IoZGVsdGEgLyBiYXNlTWludXNUTWluKTtcbiAgICBrICs9IGJhc2U7XG4gIH1cbiAgcmV0dXJuIGZsb29yKGsgKyAoYmFzZU1pbnVzVE1pbiArIDEpICogZGVsdGEgLyAoZGVsdGEgKyBza2V3KSk7XG59O1xuXG4vKipcbiAqIENvbnZlcnRzIGEgc3RyaW5nIG9mIFVuaWNvZGUgc3ltYm9scyAoZS5nLiBhIGRvbWFpbiBuYW1lIGxhYmVsKSB0byBhXG4gKiBQdW55Y29kZSBzdHJpbmcgb2YgQVNDSUktb25seSBzeW1ib2xzLlxuICovXG52YXIgZW5jb2RlID0gZnVuY3Rpb24gKGlucHV0KSB7XG4gIHZhciBvdXRwdXQgPSBbXTtcblxuICAvLyBDb252ZXJ0IHRoZSBpbnB1dCBpbiBVQ1MtMiB0byBhbiBhcnJheSBvZiBVbmljb2RlIGNvZGUgcG9pbnRzLlxuICBpbnB1dCA9IHVjczJkZWNvZGUoaW5wdXQpO1xuXG4gIC8vIENhY2hlIHRoZSBsZW5ndGguXG4gIHZhciBpbnB1dExlbmd0aCA9IGlucHV0Lmxlbmd0aDtcblxuICAvLyBJbml0aWFsaXplIHRoZSBzdGF0ZS5cbiAgdmFyIG4gPSBpbml0aWFsTjtcbiAgdmFyIGRlbHRhID0gMDtcbiAgdmFyIGJpYXMgPSBpbml0aWFsQmlhcztcbiAgdmFyIGksIGN1cnJlbnRWYWx1ZTtcblxuICAvLyBIYW5kbGUgdGhlIGJhc2ljIGNvZGUgcG9pbnRzLlxuICBmb3IgKGkgPSAwOyBpIDwgaW5wdXQubGVuZ3RoOyBpKyspIHtcbiAgICBjdXJyZW50VmFsdWUgPSBpbnB1dFtpXTtcbiAgICBpZiAoY3VycmVudFZhbHVlIDwgMHg4MCkge1xuICAgICAgcHVzaChvdXRwdXQsIGZyb21DaGFyQ29kZShjdXJyZW50VmFsdWUpKTtcbiAgICB9XG4gIH1cblxuICB2YXIgYmFzaWNMZW5ndGggPSBvdXRwdXQubGVuZ3RoOyAvLyBudW1iZXIgb2YgYmFzaWMgY29kZSBwb2ludHMuXG4gIHZhciBoYW5kbGVkQ1BDb3VudCA9IGJhc2ljTGVuZ3RoOyAvLyBudW1iZXIgb2YgY29kZSBwb2ludHMgdGhhdCBoYXZlIGJlZW4gaGFuZGxlZDtcblxuICAvLyBGaW5pc2ggdGhlIGJhc2ljIHN0cmluZyB3aXRoIGEgZGVsaW1pdGVyIHVubGVzcyBpdCdzIGVtcHR5LlxuICBpZiAoYmFzaWNMZW5ndGgpIHtcbiAgICBwdXNoKG91dHB1dCwgZGVsaW1pdGVyKTtcbiAgfVxuXG4gIC8vIE1haW4gZW5jb2RpbmcgbG9vcDpcbiAgd2hpbGUgKGhhbmRsZWRDUENvdW50IDwgaW5wdXRMZW5ndGgpIHtcbiAgICAvLyBBbGwgbm9uLWJhc2ljIGNvZGUgcG9pbnRzIDwgbiBoYXZlIGJlZW4gaGFuZGxlZCBhbHJlYWR5LiBGaW5kIHRoZSBuZXh0IGxhcmdlciBvbmU6XG4gICAgdmFyIG0gPSBtYXhJbnQ7XG4gICAgZm9yIChpID0gMDsgaSA8IGlucHV0Lmxlbmd0aDsgaSsrKSB7XG4gICAgICBjdXJyZW50VmFsdWUgPSBpbnB1dFtpXTtcbiAgICAgIGlmIChjdXJyZW50VmFsdWUgPj0gbiAmJiBjdXJyZW50VmFsdWUgPCBtKSB7XG4gICAgICAgIG0gPSBjdXJyZW50VmFsdWU7XG4gICAgICB9XG4gICAgfVxuXG4gICAgLy8gSW5jcmVhc2UgYGRlbHRhYCBlbm91Z2ggdG8gYWR2YW5jZSB0aGUgZGVjb2RlcidzIDxuLGk+IHN0YXRlIHRvIDxtLDA+LCBidXQgZ3VhcmQgYWdhaW5zdCBvdmVyZmxvdy5cbiAgICB2YXIgaGFuZGxlZENQQ291bnRQbHVzT25lID0gaGFuZGxlZENQQ291bnQgKyAxO1xuICAgIGlmIChtIC0gbiA+IGZsb29yKChtYXhJbnQgLSBkZWx0YSkgLyBoYW5kbGVkQ1BDb3VudFBsdXNPbmUpKSB7XG4gICAgICB0aHJvdyBuZXcgJFJhbmdlRXJyb3IoT1ZFUkZMT1dfRVJST1IpO1xuICAgIH1cblxuICAgIGRlbHRhICs9IChtIC0gbikgKiBoYW5kbGVkQ1BDb3VudFBsdXNPbmU7XG4gICAgbiA9IG07XG5cbiAgICBmb3IgKGkgPSAwOyBpIDwgaW5wdXQubGVuZ3RoOyBpKyspIHtcbiAgICAgIGN1cnJlbnRWYWx1ZSA9IGlucHV0W2ldO1xuICAgICAgaWYgKGN1cnJlbnRWYWx1ZSA8IG4gJiYgKytkZWx0YSA+IG1heEludCkge1xuICAgICAgICB0aHJvdyBuZXcgJFJhbmdlRXJyb3IoT1ZFUkZMT1dfRVJST1IpO1xuICAgICAgfVxuICAgICAgaWYgKGN1cnJlbnRWYWx1ZSA9PT0gbikge1xuICAgICAgICAvLyBSZXByZXNlbnQgZGVsdGEgYXMgYSBnZW5lcmFsaXplZCB2YXJpYWJsZS1sZW5ndGggaW50ZWdlci5cbiAgICAgICAgdmFyIHEgPSBkZWx0YTtcbiAgICAgICAgdmFyIGsgPSBiYXNlO1xuICAgICAgICB3aGlsZSAodHJ1ZSkge1xuICAgICAgICAgIHZhciB0ID0gayA8PSBiaWFzID8gdE1pbiA6IGsgPj0gYmlhcyArIHRNYXggPyB0TWF4IDogayAtIGJpYXM7XG4gICAgICAgICAgaWYgKHEgPCB0KSBicmVhaztcbiAgICAgICAgICB2YXIgcU1pbnVzVCA9IHEgLSB0O1xuICAgICAgICAgIHZhciBiYXNlTWludXNUID0gYmFzZSAtIHQ7XG4gICAgICAgICAgcHVzaChvdXRwdXQsIGZyb21DaGFyQ29kZShkaWdpdFRvQmFzaWModCArIHFNaW51c1QgJSBiYXNlTWludXNUKSkpO1xuICAgICAgICAgIHEgPSBmbG9vcihxTWludXNUIC8gYmFzZU1pbnVzVCk7XG4gICAgICAgICAgayArPSBiYXNlO1xuICAgICAgICB9XG5cbiAgICAgICAgcHVzaChvdXRwdXQsIGZyb21DaGFyQ29kZShkaWdpdFRvQmFzaWMocSkpKTtcbiAgICAgICAgYmlhcyA9IGFkYXB0KGRlbHRhLCBoYW5kbGVkQ1BDb3VudFBsdXNPbmUsIGhhbmRsZWRDUENvdW50ID09PSBiYXNpY0xlbmd0aCk7XG4gICAgICAgIGRlbHRhID0gMDtcbiAgICAgICAgaGFuZGxlZENQQ291bnQrKztcbiAgICAgIH1cbiAgICB9XG5cbiAgICBkZWx0YSsrO1xuICAgIG4rKztcbiAgfVxuICByZXR1cm4gam9pbihvdXRwdXQsICcnKTtcbn07XG5cbm1vZHVsZS5leHBvcnRzID0gZnVuY3Rpb24gKGlucHV0KSB7XG4gIHZhciBlbmNvZGVkID0gW107XG4gIHZhciBsYWJlbHMgPSBzcGxpdChyZXBsYWNlKHRvTG93ZXJDYXNlKGlucHV0KSwgcmVnZXhTZXBhcmF0b3JzLCAnXFx1MDAyRScpLCAnLicpO1xuICB2YXIgaSwgbGFiZWw7XG4gIGZvciAoaSA9IDA7IGkgPCBsYWJlbHMubGVuZ3RoOyBpKyspIHtcbiAgICBsYWJlbCA9IGxhYmVsc1tpXTtcbiAgICBwdXNoKGVuY29kZWQsIGV4ZWMocmVnZXhOb25BU0NJSSwgbGFiZWwpID8gJ3huLS0nICsgZW5jb2RlKGxhYmVsKSA6IGxhYmVsKTtcbiAgfVxuICByZXR1cm4gam9pbihlbmNvZGVkLCAnLicpO1xufTtcbiIsIid1c2Ugc3RyaWN0Jztcbi8qIGVzbGludC1kaXNhYmxlIGVzL25vLXN5bWJvbCAtLSByZXF1aXJlZCBmb3IgdGVzdGluZyAqL1xudmFyIFY4X1ZFUlNJT04gPSByZXF1aXJlKCcuLi9pbnRlcm5hbHMvZW5naW5lLXY4LXZlcnNpb24nKTtcbnZhciBmYWlscyA9IHJlcXVpcmUoJy4uL2ludGVybmFscy9mYWlscycpO1xudmFyIGdsb2JhbCA9IHJlcXVpcmUoJy4uL2ludGVybmFscy9nbG9iYWwnKTtcblxudmFyICRTdHJpbmcgPSBnbG9iYWwuU3RyaW5nO1xuXG4vLyBlc2xpbnQtZGlzYWJsZS1uZXh0LWxpbmUgZXMvbm8tb2JqZWN0LWdldG93bnByb3BlcnR5c3ltYm9scyAtLSByZXF1aXJlZCBmb3IgdGVzdGluZ1xubW9kdWxlLmV4cG9ydHMgPSAhIU9iamVjdC5nZXRPd25Qcm9wZXJ0eVN5bWJvbHMgJiYgIWZhaWxzKGZ1bmN0aW9uICgpIHtcbiAgdmFyIHN5bWJvbCA9IFN5bWJvbCgnc3ltYm9sIGRldGVjdGlvbicpO1xuICAvLyBDaHJvbWUgMzggU3ltYm9sIGhhcyBpbmNvcnJlY3QgdG9TdHJpbmcgY29udmVyc2lvblxuICAvLyBgZ2V0LW93bi1wcm9wZXJ0eS1zeW1ib2xzYCBwb2x5ZmlsbCBzeW1ib2xzIGNvbnZlcnRlZCB0byBvYmplY3QgYXJlIG5vdCBTeW1ib2wgaW5zdGFuY2VzXG4gIC8vIG5iOiBEbyBub3QgY2FsbCBgU3RyaW5nYCBkaXJlY3RseSB0byBhdm9pZCB0aGlzIGJlaW5nIG9wdGltaXplZCBvdXQgdG8gYHN5bWJvbCsnJ2Agd2hpY2ggd2lsbCxcbiAgLy8gb2YgY291cnNlLCBmYWlsLlxuICByZXR1cm4gISRTdHJpbmcoc3ltYm9sKSB8fCAhKE9iamVjdChzeW1ib2wpIGluc3RhbmNlb2YgU3ltYm9sKSB8fFxuICAgIC8vIENocm9tZSAzOC00MCBzeW1ib2xzIGFyZSBub3QgaW5oZXJpdGVkIGZyb20gRE9NIGNvbGxlY3Rpb25zIHByb3RvdHlwZXMgdG8gaW5zdGFuY2VzXG4gICAgIVN5bWJvbC5zaGFtICYmIFY4X1ZFUlNJT04gJiYgVjhfVkVSU0lPTiA8IDQxO1xufSk7XG4iLCIndXNlIHN0cmljdCc7XG52YXIgdG9JbnRlZ2VyT3JJbmZpbml0eSA9IHJlcXVpcmUoJy4uL2ludGVybmFscy90by1pbnRlZ2VyLW9yLWluZmluaXR5Jyk7XG5cbnZhciBtYXggPSBNYXRoLm1heDtcbnZhciBtaW4gPSBNYXRoLm1pbjtcblxuLy8gSGVscGVyIGZvciBhIHBvcHVsYXIgcmVwZWF0aW5nIGNhc2Ugb2YgdGhlIHNwZWM6XG4vLyBMZXQgaW50ZWdlciBiZSA/IFRvSW50ZWdlcihpbmRleCkuXG4vLyBJZiBpbnRlZ2VyIDwgMCwgbGV0IHJlc3VsdCBiZSBtYXgoKGxlbmd0aCArIGludGVnZXIpLCAwKTsgZWxzZSBsZXQgcmVzdWx0IGJlIG1pbihpbnRlZ2VyLCBsZW5ndGgpLlxubW9kdWxlLmV4cG9ydHMgPSBmdW5jdGlvbiAoaW5kZXgsIGxlbmd0aCkge1xuICB2YXIgaW50ZWdlciA9IHRvSW50ZWdlck9ySW5maW5pdHkoaW5kZXgpO1xuICByZXR1cm4gaW50ZWdlciA8IDAgPyBtYXgoaW50ZWdlciArIGxlbmd0aCwgMCkgOiBtaW4oaW50ZWdlciwgbGVuZ3RoKTtcbn07XG4iLCIndXNlIHN0cmljdCc7XG4vLyB0b09iamVjdCB3aXRoIGZhbGxiYWNrIGZvciBub24tYXJyYXktbGlrZSBFUzMgc3RyaW5nc1xudmFyIEluZGV4ZWRPYmplY3QgPSByZXF1aXJlKCcuLi9pbnRlcm5hbHMvaW5kZXhlZC1vYmplY3QnKTtcbnZhciByZXF1aXJlT2JqZWN0Q29lcmNpYmxlID0gcmVxdWlyZSgnLi4vaW50ZXJuYWxzL3JlcXVpcmUtb2JqZWN0LWNvZXJjaWJsZScpO1xuXG5tb2R1bGUuZXhwb3J0cyA9IGZ1bmN0aW9uIChpdCkge1xuICByZXR1cm4gSW5kZXhlZE9iamVjdChyZXF1aXJlT2JqZWN0Q29lcmNpYmxlKGl0KSk7XG59O1xuIiwiJ3VzZSBzdHJpY3QnO1xudmFyIHRydW5jID0gcmVxdWlyZSgnLi4vaW50ZXJuYWxzL21hdGgtdHJ1bmMnKTtcblxuLy8gYFRvSW50ZWdlck9ySW5maW5pdHlgIGFic3RyYWN0IG9wZXJhdGlvblxuLy8gaHR0cHM6Ly90YzM5LmVzL2VjbWEyNjIvI3NlYy10b2ludGVnZXJvcmluZmluaXR5XG5tb2R1bGUuZXhwb3J0cyA9IGZ1bmN0aW9uIChhcmd1bWVudCkge1xuICB2YXIgbnVtYmVyID0gK2FyZ3VtZW50O1xuICAvLyBlc2xpbnQtZGlzYWJsZS1uZXh0LWxpbmUgbm8tc2VsZi1jb21wYXJlIC0tIE5hTiBjaGVja1xuICByZXR1cm4gbnVtYmVyICE9PSBudW1iZXIgfHwgbnVtYmVyID09PSAwID8gMCA6IHRydW5jKG51bWJlcik7XG59O1xuIiwiJ3VzZSBzdHJpY3QnO1xudmFyIHRvSW50ZWdlck9ySW5maW5pdHkgPSByZXF1aXJlKCcuLi9pbnRlcm5hbHMvdG8taW50ZWdlci1vci1pbmZpbml0eScpO1xuXG52YXIgbWluID0gTWF0aC5taW47XG5cbi8vIGBUb0xlbmd0aGAgYWJzdHJhY3Qgb3BlcmF0aW9uXG4vLyBodHRwczovL3RjMzkuZXMvZWNtYTI2Mi8jc2VjLXRvbGVuZ3RoXG5tb2R1bGUuZXhwb3J0cyA9IGZ1bmN0aW9uIChhcmd1bWVudCkge1xuICB2YXIgbGVuID0gdG9JbnRlZ2VyT3JJbmZpbml0eShhcmd1bWVudCk7XG4gIHJldHVybiBsZW4gPiAwID8gbWluKGxlbiwgMHgxRkZGRkZGRkZGRkZGRikgOiAwOyAvLyAyICoqIDUzIC0gMSA9PSA5MDA3MTk5MjU0NzQwOTkxXG59O1xuIiwiJ3VzZSBzdHJpY3QnO1xudmFyIHJlcXVpcmVPYmplY3RDb2VyY2libGUgPSByZXF1aXJlKCcuLi9pbnRlcm5hbHMvcmVxdWlyZS1vYmplY3QtY29lcmNpYmxlJyk7XG5cbnZhciAkT2JqZWN0ID0gT2JqZWN0O1xuXG4vLyBgVG9PYmplY3RgIGFic3RyYWN0IG9wZXJhdGlvblxuLy8gaHR0cHM6Ly90YzM5LmVzL2VjbWEyNjIvI3NlYy10b29iamVjdFxubW9kdWxlLmV4cG9ydHMgPSBmdW5jdGlvbiAoYXJndW1lbnQpIHtcbiAgcmV0dXJuICRPYmplY3QocmVxdWlyZU9iamVjdENvZXJjaWJsZShhcmd1bWVudCkpO1xufTtcbiIsIid1c2Ugc3RyaWN0JztcbnZhciBjYWxsID0gcmVxdWlyZSgnLi4vaW50ZXJuYWxzL2Z1bmN0aW9uLWNhbGwnKTtcbnZhciBpc09iamVjdCA9IHJlcXVpcmUoJy4uL2ludGVybmFscy9pcy1vYmplY3QnKTtcbnZhciBpc1N5bWJvbCA9IHJlcXVpcmUoJy4uL2ludGVybmFscy9pcy1zeW1ib2wnKTtcbnZhciBnZXRNZXRob2QgPSByZXF1aXJlKCcuLi9pbnRlcm5hbHMvZ2V0LW1ldGhvZCcpO1xudmFyIG9yZGluYXJ5VG9QcmltaXRpdmUgPSByZXF1aXJlKCcuLi9pbnRlcm5hbHMvb3JkaW5hcnktdG8tcHJpbWl0aXZlJyk7XG52YXIgd2VsbEtub3duU3ltYm9sID0gcmVxdWlyZSgnLi4vaW50ZXJuYWxzL3dlbGwta25vd24tc3ltYm9sJyk7XG5cbnZhciAkVHlwZUVycm9yID0gVHlwZUVycm9yO1xudmFyIFRPX1BSSU1JVElWRSA9IHdlbGxLbm93blN5bWJvbCgndG9QcmltaXRpdmUnKTtcblxuLy8gYFRvUHJpbWl0aXZlYCBhYnN0cmFjdCBvcGVyYXRpb25cbi8vIGh0dHBzOi8vdGMzOS5lcy9lY21hMjYyLyNzZWMtdG9wcmltaXRpdmVcbm1vZHVsZS5leHBvcnRzID0gZnVuY3Rpb24gKGlucHV0LCBwcmVmKSB7XG4gIGlmICghaXNPYmplY3QoaW5wdXQpIHx8IGlzU3ltYm9sKGlucHV0KSkgcmV0dXJuIGlucHV0O1xuICB2YXIgZXhvdGljVG9QcmltID0gZ2V0TWV0aG9kKGlucHV0LCBUT19QUklNSVRJVkUpO1xuICB2YXIgcmVzdWx0O1xuICBpZiAoZXhvdGljVG9QcmltKSB7XG4gICAgaWYgKHByZWYgPT09IHVuZGVmaW5lZCkgcHJlZiA9ICdkZWZhdWx0JztcbiAgICByZXN1bHQgPSBjYWxsKGV4b3RpY1RvUHJpbSwgaW5wdXQsIHByZWYpO1xuICAgIGlmICghaXNPYmplY3QocmVzdWx0KSB8fCBpc1N5bWJvbChyZXN1bHQpKSByZXR1cm4gcmVzdWx0O1xuICAgIHRocm93IG5ldyAkVHlwZUVycm9yKFwiQ2FuJ3QgY29udmVydCBvYmplY3QgdG8gcHJpbWl0aXZlIHZhbHVlXCIpO1xuICB9XG4gIGlmIChwcmVmID09PSB1bmRlZmluZWQpIHByZWYgPSAnbnVtYmVyJztcbiAgcmV0dXJuIG9yZGluYXJ5VG9QcmltaXRpdmUoaW5wdXQsIHByZWYpO1xufTtcbiIsIid1c2Ugc3RyaWN0JztcbnZhciB0b1ByaW1pdGl2ZSA9IHJlcXVpcmUoJy4uL2ludGVybmFscy90by1wcmltaXRpdmUnKTtcbnZhciBpc1N5bWJvbCA9IHJlcXVpcmUoJy4uL2ludGVybmFscy9pcy1zeW1ib2wnKTtcblxuLy8gYFRvUHJvcGVydHlLZXlgIGFic3RyYWN0IG9wZXJhdGlvblxuLy8gaHR0cHM6Ly90YzM5LmVzL2VjbWEyNjIvI3NlYy10b3Byb3BlcnR5a2V5XG5tb2R1bGUuZXhwb3J0cyA9IGZ1bmN0aW9uIChhcmd1bWVudCkge1xuICB2YXIga2V5ID0gdG9QcmltaXRpdmUoYXJndW1lbnQsICdzdHJpbmcnKTtcbiAgcmV0dXJuIGlzU3ltYm9sKGtleSkgPyBrZXkgOiBrZXkgKyAnJztcbn07XG4iLCIndXNlIHN0cmljdCc7XG52YXIgd2VsbEtub3duU3ltYm9sID0gcmVxdWlyZSgnLi4vaW50ZXJuYWxzL3dlbGwta25vd24tc3ltYm9sJyk7XG5cbnZhciBUT19TVFJJTkdfVEFHID0gd2VsbEtub3duU3ltYm9sKCd0b1N0cmluZ1RhZycpO1xudmFyIHRlc3QgPSB7fTtcblxudGVzdFtUT19TVFJJTkdfVEFHXSA9ICd6JztcblxubW9kdWxlLmV4cG9ydHMgPSBTdHJpbmcodGVzdCkgPT09ICdbb2JqZWN0IHpdJztcbiIsIid1c2Ugc3RyaWN0JztcbnZhciBjbGFzc29mID0gcmVxdWlyZSgnLi4vaW50ZXJuYWxzL2NsYXNzb2YnKTtcblxudmFyICRTdHJpbmcgPSBTdHJpbmc7XG5cbm1vZHVsZS5leHBvcnRzID0gZnVuY3Rpb24gKGFyZ3VtZW50KSB7XG4gIGlmIChjbGFzc29mKGFyZ3VtZW50KSA9PT0gJ1N5bWJvbCcpIHRocm93IG5ldyBUeXBlRXJyb3IoJ0Nhbm5vdCBjb252ZXJ0IGEgU3ltYm9sIHZhbHVlIHRvIGEgc3RyaW5nJyk7XG4gIHJldHVybiAkU3RyaW5nKGFyZ3VtZW50KTtcbn07XG4iLCIndXNlIHN0cmljdCc7XG52YXIgJFN0cmluZyA9IFN0cmluZztcblxubW9kdWxlLmV4cG9ydHMgPSBmdW5jdGlvbiAoYXJndW1lbnQpIHtcbiAgdHJ5IHtcbiAgICByZXR1cm4gJFN0cmluZyhhcmd1bWVudCk7XG4gIH0gY2F0Y2ggKGVycm9yKSB7XG4gICAgcmV0dXJuICdPYmplY3QnO1xuICB9XG59O1xuIiwiJ3VzZSBzdHJpY3QnO1xudmFyIHVuY3VycnlUaGlzID0gcmVxdWlyZSgnLi4vaW50ZXJuYWxzL2Z1bmN0aW9uLXVuY3VycnktdGhpcycpO1xuXG52YXIgaWQgPSAwO1xudmFyIHBvc3RmaXggPSBNYXRoLnJhbmRvbSgpO1xudmFyIHRvU3RyaW5nID0gdW5jdXJyeVRoaXMoMS4wLnRvU3RyaW5nKTtcblxubW9kdWxlLmV4cG9ydHMgPSBmdW5jdGlvbiAoa2V5KSB7XG4gIHJldHVybiAnU3ltYm9sKCcgKyAoa2V5ID09PSB1bmRlZmluZWQgPyAnJyA6IGtleSkgKyAnKV8nICsgdG9TdHJpbmcoKytpZCArIHBvc3RmaXgsIDM2KTtcbn07XG4iLCIndXNlIHN0cmljdCc7XG52YXIgZmFpbHMgPSByZXF1aXJlKCcuLi9pbnRlcm5hbHMvZmFpbHMnKTtcbnZhciB3ZWxsS25vd25TeW1ib2wgPSByZXF1aXJlKCcuLi9pbnRlcm5hbHMvd2VsbC1rbm93bi1zeW1ib2wnKTtcbnZhciBERVNDUklQVE9SUyA9IHJlcXVpcmUoJy4uL2ludGVybmFscy9kZXNjcmlwdG9ycycpO1xudmFyIElTX1BVUkUgPSByZXF1aXJlKCcuLi9pbnRlcm5hbHMvaXMtcHVyZScpO1xuXG52YXIgSVRFUkFUT1IgPSB3ZWxsS25vd25TeW1ib2woJ2l0ZXJhdG9yJyk7XG5cbm1vZHVsZS5leHBvcnRzID0gIWZhaWxzKGZ1bmN0aW9uICgpIHtcbiAgLy8gZXNsaW50LWRpc2FibGUtbmV4dC1saW5lIHVuaWNvcm4vcmVsYXRpdmUtdXJsLXN0eWxlIC0tIHJlcXVpcmVkIGZvciB0ZXN0aW5nXG4gIHZhciB1cmwgPSBuZXcgVVJMKCdiP2E9MSZiPTImYz0zJywgJ2h0dHA6Ly9hJyk7XG4gIHZhciBwYXJhbXMgPSB1cmwuc2VhcmNoUGFyYW1zO1xuICB2YXIgcGFyYW1zMiA9IG5ldyBVUkxTZWFyY2hQYXJhbXMoJ2E9MSZhPTImYj0zJyk7XG4gIHZhciByZXN1bHQgPSAnJztcbiAgdXJsLnBhdGhuYW1lID0gJ2MlMjBkJztcbiAgcGFyYW1zLmZvckVhY2goZnVuY3Rpb24gKHZhbHVlLCBrZXkpIHtcbiAgICBwYXJhbXNbJ2RlbGV0ZSddKCdiJyk7XG4gICAgcmVzdWx0ICs9IGtleSArIHZhbHVlO1xuICB9KTtcbiAgcGFyYW1zMlsnZGVsZXRlJ10oJ2EnLCAyKTtcbiAgLy8gYHVuZGVmaW5lZGAgY2FzZSBpcyBhIENocm9taXVtIDExNyBidWdcbiAgLy8gaHR0cHM6Ly9idWdzLmNocm9taXVtLm9yZy9wL3Y4L2lzc3Vlcy9kZXRhaWw/aWQ9MTQyMjJcbiAgcGFyYW1zMlsnZGVsZXRlJ10oJ2InLCB1bmRlZmluZWQpO1xuICByZXR1cm4gKElTX1BVUkUgJiYgKCF1cmwudG9KU09OIHx8ICFwYXJhbXMyLmhhcygnYScsIDEpIHx8IHBhcmFtczIuaGFzKCdhJywgMikgfHwgIXBhcmFtczIuaGFzKCdhJywgdW5kZWZpbmVkKSB8fCBwYXJhbXMyLmhhcygnYicpKSlcbiAgICB8fCAoIXBhcmFtcy5zaXplICYmIChJU19QVVJFIHx8ICFERVNDUklQVE9SUykpXG4gICAgfHwgIXBhcmFtcy5zb3J0XG4gICAgfHwgdXJsLmhyZWYgIT09ICdodHRwOi8vYS9jJTIwZD9hPTEmYz0zJ1xuICAgIHx8IHBhcmFtcy5nZXQoJ2MnKSAhPT0gJzMnXG4gICAgfHwgU3RyaW5nKG5ldyBVUkxTZWFyY2hQYXJhbXMoJz9hPTEnKSkgIT09ICdhPTEnXG4gICAgfHwgIXBhcmFtc1tJVEVSQVRPUl1cbiAgICAvLyB0aHJvd3MgaW4gRWRnZVxuICAgIHx8IG5ldyBVUkwoJ2h0dHBzOi8vYUBiJykudXNlcm5hbWUgIT09ICdhJ1xuICAgIHx8IG5ldyBVUkxTZWFyY2hQYXJhbXMobmV3IFVSTFNlYXJjaFBhcmFtcygnYT1iJykpLmdldCgnYScpICE9PSAnYidcbiAgICAvLyBub3QgcHVueWNvZGVkIGluIEVkZ2VcbiAgICB8fCBuZXcgVVJMKCdodHRwOi8v0YLQtdGB0YInKS5ob3N0ICE9PSAneG4tLWUxYXliYydcbiAgICAvLyBub3QgZXNjYXBlZCBpbiBDaHJvbWUgNjItXG4gICAgfHwgbmV3IFVSTCgnaHR0cDovL2Ej0LEnKS5oYXNoICE9PSAnIyVEMCVCMSdcbiAgICAvLyBmYWlscyBpbiBDaHJvbWUgNjYtXG4gICAgfHwgcmVzdWx0ICE9PSAnYTFjMydcbiAgICAvLyB0aHJvd3MgaW4gU2FmYXJpXG4gICAgfHwgbmV3IFVSTCgnaHR0cDovL3gnLCB1bmRlZmluZWQpLmhvc3QgIT09ICd4Jztcbn0pO1xuIiwiJ3VzZSBzdHJpY3QnO1xuLyogZXNsaW50LWRpc2FibGUgZXMvbm8tc3ltYm9sIC0tIHJlcXVpcmVkIGZvciB0ZXN0aW5nICovXG52YXIgTkFUSVZFX1NZTUJPTCA9IHJlcXVpcmUoJy4uL2ludGVybmFscy9zeW1ib2wtY29uc3RydWN0b3ItZGV0ZWN0aW9uJyk7XG5cbm1vZHVsZS5leHBvcnRzID0gTkFUSVZFX1NZTUJPTFxuICAmJiAhU3ltYm9sLnNoYW1cbiAgJiYgdHlwZW9mIFN5bWJvbC5pdGVyYXRvciA9PSAnc3ltYm9sJztcbiIsIid1c2Ugc3RyaWN0JztcbnZhciBERVNDUklQVE9SUyA9IHJlcXVpcmUoJy4uL2ludGVybmFscy9kZXNjcmlwdG9ycycpO1xudmFyIGZhaWxzID0gcmVxdWlyZSgnLi4vaW50ZXJuYWxzL2ZhaWxzJyk7XG5cbi8vIFY4IH4gQ2hyb21lIDM2LVxuLy8gaHR0cHM6Ly9idWdzLmNocm9taXVtLm9yZy9wL3Y4L2lzc3Vlcy9kZXRhaWw/aWQ9MzMzNFxubW9kdWxlLmV4cG9ydHMgPSBERVNDUklQVE9SUyAmJiBmYWlscyhmdW5jdGlvbiAoKSB7XG4gIC8vIGVzbGludC1kaXNhYmxlLW5leHQtbGluZSBlcy9uby1vYmplY3QtZGVmaW5lcHJvcGVydHkgLS0gcmVxdWlyZWQgZm9yIHRlc3RpbmdcbiAgcmV0dXJuIE9iamVjdC5kZWZpbmVQcm9wZXJ0eShmdW5jdGlvbiAoKSB7IC8qIGVtcHR5ICovIH0sICdwcm90b3R5cGUnLCB7XG4gICAgdmFsdWU6IDQyLFxuICAgIHdyaXRhYmxlOiBmYWxzZVxuICB9KS5wcm90b3R5cGUgIT09IDQyO1xufSk7XG4iLCIndXNlIHN0cmljdCc7XG52YXIgJFR5cGVFcnJvciA9IFR5cGVFcnJvcjtcblxubW9kdWxlLmV4cG9ydHMgPSBmdW5jdGlvbiAocGFzc2VkLCByZXF1aXJlZCkge1xuICBpZiAocGFzc2VkIDwgcmVxdWlyZWQpIHRocm93IG5ldyAkVHlwZUVycm9yKCdOb3QgZW5vdWdoIGFyZ3VtZW50cycpO1xuICByZXR1cm4gcGFzc2VkO1xufTtcbiIsIid1c2Ugc3RyaWN0JztcbnZhciBnbG9iYWwgPSByZXF1aXJlKCcuLi9pbnRlcm5hbHMvZ2xvYmFsJyk7XG52YXIgaXNDYWxsYWJsZSA9IHJlcXVpcmUoJy4uL2ludGVybmFscy9pcy1jYWxsYWJsZScpO1xuXG52YXIgV2Vha01hcCA9IGdsb2JhbC5XZWFrTWFwO1xuXG5tb2R1bGUuZXhwb3J0cyA9IGlzQ2FsbGFibGUoV2Vha01hcCkgJiYgL25hdGl2ZSBjb2RlLy50ZXN0KFN0cmluZyhXZWFrTWFwKSk7XG4iLCIndXNlIHN0cmljdCc7XG52YXIgZ2xvYmFsID0gcmVxdWlyZSgnLi4vaW50ZXJuYWxzL2dsb2JhbCcpO1xudmFyIHNoYXJlZCA9IHJlcXVpcmUoJy4uL2ludGVybmFscy9zaGFyZWQnKTtcbnZhciBoYXNPd24gPSByZXF1aXJlKCcuLi9pbnRlcm5hbHMvaGFzLW93bi1wcm9wZXJ0eScpO1xudmFyIHVpZCA9IHJlcXVpcmUoJy4uL2ludGVybmFscy91aWQnKTtcbnZhciBOQVRJVkVfU1lNQk9MID0gcmVxdWlyZSgnLi4vaW50ZXJuYWxzL3N5bWJvbC1jb25zdHJ1Y3Rvci1kZXRlY3Rpb24nKTtcbnZhciBVU0VfU1lNQk9MX0FTX1VJRCA9IHJlcXVpcmUoJy4uL2ludGVybmFscy91c2Utc3ltYm9sLWFzLXVpZCcpO1xuXG52YXIgU3ltYm9sID0gZ2xvYmFsLlN5bWJvbDtcbnZhciBXZWxsS25vd25TeW1ib2xzU3RvcmUgPSBzaGFyZWQoJ3drcycpO1xudmFyIGNyZWF0ZVdlbGxLbm93blN5bWJvbCA9IFVTRV9TWU1CT0xfQVNfVUlEID8gU3ltYm9sWydmb3InXSB8fCBTeW1ib2wgOiBTeW1ib2wgJiYgU3ltYm9sLndpdGhvdXRTZXR0ZXIgfHwgdWlkO1xuXG5tb2R1bGUuZXhwb3J0cyA9IGZ1bmN0aW9uIChuYW1lKSB7XG4gIGlmICghaGFzT3duKFdlbGxLbm93blN5bWJvbHNTdG9yZSwgbmFtZSkpIHtcbiAgICBXZWxsS25vd25TeW1ib2xzU3RvcmVbbmFtZV0gPSBOQVRJVkVfU1lNQk9MICYmIGhhc093bihTeW1ib2wsIG5hbWUpXG4gICAgICA/IFN5bWJvbFtuYW1lXVxuICAgICAgOiBjcmVhdGVXZWxsS25vd25TeW1ib2woJ1N5bWJvbC4nICsgbmFtZSk7XG4gIH0gcmV0dXJuIFdlbGxLbm93blN5bWJvbHNTdG9yZVtuYW1lXTtcbn07XG4iLCIndXNlIHN0cmljdCc7XG52YXIgJCA9IHJlcXVpcmUoJy4uL2ludGVybmFscy9leHBvcnQnKTtcbnZhciAkaW5jbHVkZXMgPSByZXF1aXJlKCcuLi9pbnRlcm5hbHMvYXJyYXktaW5jbHVkZXMnKS5pbmNsdWRlcztcbnZhciBmYWlscyA9IHJlcXVpcmUoJy4uL2ludGVybmFscy9mYWlscycpO1xudmFyIGFkZFRvVW5zY29wYWJsZXMgPSByZXF1aXJlKCcuLi9pbnRlcm5hbHMvYWRkLXRvLXVuc2NvcGFibGVzJyk7XG5cbi8vIEZGOTkrIGJ1Z1xudmFyIEJST0tFTl9PTl9TUEFSU0UgPSBmYWlscyhmdW5jdGlvbiAoKSB7XG4gIC8vIGVzbGludC1kaXNhYmxlLW5leHQtbGluZSBlcy9uby1hcnJheS1wcm90b3R5cGUtaW5jbHVkZXMgLS0gZGV0ZWN0aW9uXG4gIHJldHVybiAhQXJyYXkoMSkuaW5jbHVkZXMoKTtcbn0pO1xuXG4vLyBgQXJyYXkucHJvdG90eXBlLmluY2x1ZGVzYCBtZXRob2Rcbi8vIGh0dHBzOi8vdGMzOS5lcy9lY21hMjYyLyNzZWMtYXJyYXkucHJvdG90eXBlLmluY2x1ZGVzXG4kKHsgdGFyZ2V0OiAnQXJyYXknLCBwcm90bzogdHJ1ZSwgZm9yY2VkOiBCUk9LRU5fT05fU1BBUlNFIH0sIHtcbiAgaW5jbHVkZXM6IGZ1bmN0aW9uIGluY2x1ZGVzKGVsIC8qICwgZnJvbUluZGV4ID0gMCAqLykge1xuICAgIHJldHVybiAkaW5jbHVkZXModGhpcywgZWwsIGFyZ3VtZW50cy5sZW5ndGggPiAxID8gYXJndW1lbnRzWzFdIDogdW5kZWZpbmVkKTtcbiAgfVxufSk7XG5cbi8vIGh0dHBzOi8vdGMzOS5lcy9lY21hMjYyLyNzZWMtYXJyYXkucHJvdG90eXBlLUBAdW5zY29wYWJsZXNcbmFkZFRvVW5zY29wYWJsZXMoJ2luY2x1ZGVzJyk7XG4iLCIndXNlIHN0cmljdCc7XG52YXIgdG9JbmRleGVkT2JqZWN0ID0gcmVxdWlyZSgnLi4vaW50ZXJuYWxzL3RvLWluZGV4ZWQtb2JqZWN0Jyk7XG52YXIgYWRkVG9VbnNjb3BhYmxlcyA9IHJlcXVpcmUoJy4uL2ludGVybmFscy9hZGQtdG8tdW5zY29wYWJsZXMnKTtcbnZhciBJdGVyYXRvcnMgPSByZXF1aXJlKCcuLi9pbnRlcm5hbHMvaXRlcmF0b3JzJyk7XG52YXIgSW50ZXJuYWxTdGF0ZU1vZHVsZSA9IHJlcXVpcmUoJy4uL2ludGVybmFscy9pbnRlcm5hbC1zdGF0ZScpO1xudmFyIGRlZmluZVByb3BlcnR5ID0gcmVxdWlyZSgnLi4vaW50ZXJuYWxzL29iamVjdC1kZWZpbmUtcHJvcGVydHknKS5mO1xudmFyIGRlZmluZUl0ZXJhdG9yID0gcmVxdWlyZSgnLi4vaW50ZXJuYWxzL2l0ZXJhdG9yLWRlZmluZScpO1xudmFyIGNyZWF0ZUl0ZXJSZXN1bHRPYmplY3QgPSByZXF1aXJlKCcuLi9pbnRlcm5hbHMvY3JlYXRlLWl0ZXItcmVzdWx0LW9iamVjdCcpO1xudmFyIElTX1BVUkUgPSByZXF1aXJlKCcuLi9pbnRlcm5hbHMvaXMtcHVyZScpO1xudmFyIERFU0NSSVBUT1JTID0gcmVxdWlyZSgnLi4vaW50ZXJuYWxzL2Rlc2NyaXB0b3JzJyk7XG5cbnZhciBBUlJBWV9JVEVSQVRPUiA9ICdBcnJheSBJdGVyYXRvcic7XG52YXIgc2V0SW50ZXJuYWxTdGF0ZSA9IEludGVybmFsU3RhdGVNb2R1bGUuc2V0O1xudmFyIGdldEludGVybmFsU3RhdGUgPSBJbnRlcm5hbFN0YXRlTW9kdWxlLmdldHRlckZvcihBUlJBWV9JVEVSQVRPUik7XG5cbi8vIGBBcnJheS5wcm90b3R5cGUuZW50cmllc2AgbWV0aG9kXG4vLyBodHRwczovL3RjMzkuZXMvZWNtYTI2Mi8jc2VjLWFycmF5LnByb3RvdHlwZS5lbnRyaWVzXG4vLyBgQXJyYXkucHJvdG90eXBlLmtleXNgIG1ldGhvZFxuLy8gaHR0cHM6Ly90YzM5LmVzL2VjbWEyNjIvI3NlYy1hcnJheS5wcm90b3R5cGUua2V5c1xuLy8gYEFycmF5LnByb3RvdHlwZS52YWx1ZXNgIG1ldGhvZFxuLy8gaHR0cHM6Ly90YzM5LmVzL2VjbWEyNjIvI3NlYy1hcnJheS5wcm90b3R5cGUudmFsdWVzXG4vLyBgQXJyYXkucHJvdG90eXBlW0BAaXRlcmF0b3JdYCBtZXRob2Rcbi8vIGh0dHBzOi8vdGMzOS5lcy9lY21hMjYyLyNzZWMtYXJyYXkucHJvdG90eXBlLUBAaXRlcmF0b3Jcbi8vIGBDcmVhdGVBcnJheUl0ZXJhdG9yYCBpbnRlcm5hbCBtZXRob2Rcbi8vIGh0dHBzOi8vdGMzOS5lcy9lY21hMjYyLyNzZWMtY3JlYXRlYXJyYXlpdGVyYXRvclxubW9kdWxlLmV4cG9ydHMgPSBkZWZpbmVJdGVyYXRvcihBcnJheSwgJ0FycmF5JywgZnVuY3Rpb24gKGl0ZXJhdGVkLCBraW5kKSB7XG4gIHNldEludGVybmFsU3RhdGUodGhpcywge1xuICAgIHR5cGU6IEFSUkFZX0lURVJBVE9SLFxuICAgIHRhcmdldDogdG9JbmRleGVkT2JqZWN0KGl0ZXJhdGVkKSwgLy8gdGFyZ2V0XG4gICAgaW5kZXg6IDAsICAgICAgICAgICAgICAgICAgICAgICAgICAvLyBuZXh0IGluZGV4XG4gICAga2luZDoga2luZCAgICAgICAgICAgICAgICAgICAgICAgICAvLyBraW5kXG4gIH0pO1xuLy8gYCVBcnJheUl0ZXJhdG9yUHJvdG90eXBlJS5uZXh0YCBtZXRob2Rcbi8vIGh0dHBzOi8vdGMzOS5lcy9lY21hMjYyLyNzZWMtJWFycmF5aXRlcmF0b3Jwcm90b3R5cGUlLm5leHRcbn0sIGZ1bmN0aW9uICgpIHtcbiAgdmFyIHN0YXRlID0gZ2V0SW50ZXJuYWxTdGF0ZSh0aGlzKTtcbiAgdmFyIHRhcmdldCA9IHN0YXRlLnRhcmdldDtcbiAgdmFyIGluZGV4ID0gc3RhdGUuaW5kZXgrKztcbiAgaWYgKCF0YXJnZXQgfHwgaW5kZXggPj0gdGFyZ2V0Lmxlbmd0aCkge1xuICAgIHN0YXRlLnRhcmdldCA9IHVuZGVmaW5lZDtcbiAgICByZXR1cm4gY3JlYXRlSXRlclJlc3VsdE9iamVjdCh1bmRlZmluZWQsIHRydWUpO1xuICB9XG4gIHN3aXRjaCAoc3RhdGUua2luZCkge1xuICAgIGNhc2UgJ2tleXMnOiByZXR1cm4gY3JlYXRlSXRlclJlc3VsdE9iamVjdChpbmRleCwgZmFsc2UpO1xuICAgIGNhc2UgJ3ZhbHVlcyc6IHJldHVybiBjcmVhdGVJdGVyUmVzdWx0T2JqZWN0KHRhcmdldFtpbmRleF0sIGZhbHNlKTtcbiAgfSByZXR1cm4gY3JlYXRlSXRlclJlc3VsdE9iamVjdChbaW5kZXgsIHRhcmdldFtpbmRleF1dLCBmYWxzZSk7XG59LCAndmFsdWVzJyk7XG5cbi8vIGFyZ3VtZW50c0xpc3RbQEBpdGVyYXRvcl0gaXMgJUFycmF5UHJvdG9fdmFsdWVzJVxuLy8gaHR0cHM6Ly90YzM5LmVzL2VjbWEyNjIvI3NlYy1jcmVhdGV1bm1hcHBlZGFyZ3VtZW50c29iamVjdFxuLy8gaHR0cHM6Ly90YzM5LmVzL2VjbWEyNjIvI3NlYy1jcmVhdGVtYXBwZWRhcmd1bWVudHNvYmplY3RcbnZhciB2YWx1ZXMgPSBJdGVyYXRvcnMuQXJndW1lbnRzID0gSXRlcmF0b3JzLkFycmF5O1xuXG4vLyBodHRwczovL3RjMzkuZXMvZWNtYTI2Mi8jc2VjLWFycmF5LnByb3RvdHlwZS1AQHVuc2NvcGFibGVzXG5hZGRUb1Vuc2NvcGFibGVzKCdrZXlzJyk7XG5hZGRUb1Vuc2NvcGFibGVzKCd2YWx1ZXMnKTtcbmFkZFRvVW5zY29wYWJsZXMoJ2VudHJpZXMnKTtcblxuLy8gVjggfiBDaHJvbWUgNDUtIGJ1Z1xuaWYgKCFJU19QVVJFICYmIERFU0NSSVBUT1JTICYmIHZhbHVlcy5uYW1lICE9PSAndmFsdWVzJykgdHJ5IHtcbiAgZGVmaW5lUHJvcGVydHkodmFsdWVzLCAnbmFtZScsIHsgdmFsdWU6ICd2YWx1ZXMnIH0pO1xufSBjYXRjaCAoZXJyb3IpIHsgLyogZW1wdHkgKi8gfVxuIiwiJ3VzZSBzdHJpY3QnO1xudmFyIERFU0NSSVBUT1JTID0gcmVxdWlyZSgnLi4vaW50ZXJuYWxzL2Rlc2NyaXB0b3JzJyk7XG52YXIgZ2xvYmFsID0gcmVxdWlyZSgnLi4vaW50ZXJuYWxzL2dsb2JhbCcpO1xudmFyIHVuY3VycnlUaGlzID0gcmVxdWlyZSgnLi4vaW50ZXJuYWxzL2Z1bmN0aW9uLXVuY3VycnktdGhpcycpO1xudmFyIGlzRm9yY2VkID0gcmVxdWlyZSgnLi4vaW50ZXJuYWxzL2lzLWZvcmNlZCcpO1xudmFyIGluaGVyaXRJZlJlcXVpcmVkID0gcmVxdWlyZSgnLi4vaW50ZXJuYWxzL2luaGVyaXQtaWYtcmVxdWlyZWQnKTtcbnZhciBjcmVhdGVOb25FbnVtZXJhYmxlUHJvcGVydHkgPSByZXF1aXJlKCcuLi9pbnRlcm5hbHMvY3JlYXRlLW5vbi1lbnVtZXJhYmxlLXByb3BlcnR5Jyk7XG52YXIgY3JlYXRlID0gcmVxdWlyZSgnLi4vaW50ZXJuYWxzL29iamVjdC1jcmVhdGUnKTtcbnZhciBnZXRPd25Qcm9wZXJ0eU5hbWVzID0gcmVxdWlyZSgnLi4vaW50ZXJuYWxzL29iamVjdC1nZXQtb3duLXByb3BlcnR5LW5hbWVzJykuZjtcbnZhciBpc1Byb3RvdHlwZU9mID0gcmVxdWlyZSgnLi4vaW50ZXJuYWxzL29iamVjdC1pcy1wcm90b3R5cGUtb2YnKTtcbnZhciBpc1JlZ0V4cCA9IHJlcXVpcmUoJy4uL2ludGVybmFscy9pcy1yZWdleHAnKTtcbnZhciB0b1N0cmluZyA9IHJlcXVpcmUoJy4uL2ludGVybmFscy90by1zdHJpbmcnKTtcbnZhciBnZXRSZWdFeHBGbGFncyA9IHJlcXVpcmUoJy4uL2ludGVybmFscy9yZWdleHAtZ2V0LWZsYWdzJyk7XG52YXIgc3RpY2t5SGVscGVycyA9IHJlcXVpcmUoJy4uL2ludGVybmFscy9yZWdleHAtc3RpY2t5LWhlbHBlcnMnKTtcbnZhciBwcm94eUFjY2Vzc29yID0gcmVxdWlyZSgnLi4vaW50ZXJuYWxzL3Byb3h5LWFjY2Vzc29yJyk7XG52YXIgZGVmaW5lQnVpbHRJbiA9IHJlcXVpcmUoJy4uL2ludGVybmFscy9kZWZpbmUtYnVpbHQtaW4nKTtcbnZhciBmYWlscyA9IHJlcXVpcmUoJy4uL2ludGVybmFscy9mYWlscycpO1xudmFyIGhhc093biA9IHJlcXVpcmUoJy4uL2ludGVybmFscy9oYXMtb3duLXByb3BlcnR5Jyk7XG52YXIgZW5mb3JjZUludGVybmFsU3RhdGUgPSByZXF1aXJlKCcuLi9pbnRlcm5hbHMvaW50ZXJuYWwtc3RhdGUnKS5lbmZvcmNlO1xudmFyIHNldFNwZWNpZXMgPSByZXF1aXJlKCcuLi9pbnRlcm5hbHMvc2V0LXNwZWNpZXMnKTtcbnZhciB3ZWxsS25vd25TeW1ib2wgPSByZXF1aXJlKCcuLi9pbnRlcm5hbHMvd2VsbC1rbm93bi1zeW1ib2wnKTtcbnZhciBVTlNVUFBPUlRFRF9ET1RfQUxMID0gcmVxdWlyZSgnLi4vaW50ZXJuYWxzL3JlZ2V4cC11bnN1cHBvcnRlZC1kb3QtYWxsJyk7XG52YXIgVU5TVVBQT1JURURfTkNHID0gcmVxdWlyZSgnLi4vaW50ZXJuYWxzL3JlZ2V4cC11bnN1cHBvcnRlZC1uY2cnKTtcblxudmFyIE1BVENIID0gd2VsbEtub3duU3ltYm9sKCdtYXRjaCcpO1xudmFyIE5hdGl2ZVJlZ0V4cCA9IGdsb2JhbC5SZWdFeHA7XG52YXIgUmVnRXhwUHJvdG90eXBlID0gTmF0aXZlUmVnRXhwLnByb3RvdHlwZTtcbnZhciBTeW50YXhFcnJvciA9IGdsb2JhbC5TeW50YXhFcnJvcjtcbnZhciBleGVjID0gdW5jdXJyeVRoaXMoUmVnRXhwUHJvdG90eXBlLmV4ZWMpO1xudmFyIGNoYXJBdCA9IHVuY3VycnlUaGlzKCcnLmNoYXJBdCk7XG52YXIgcmVwbGFjZSA9IHVuY3VycnlUaGlzKCcnLnJlcGxhY2UpO1xudmFyIHN0cmluZ0luZGV4T2YgPSB1bmN1cnJ5VGhpcygnJy5pbmRleE9mKTtcbnZhciBzdHJpbmdTbGljZSA9IHVuY3VycnlUaGlzKCcnLnNsaWNlKTtcbi8vIFRPRE86IFVzZSBvbmx5IHByb3BlciBSZWdFeHBJZGVudGlmaWVyTmFtZVxudmFyIElTX05DRyA9IC9eXFw/PFteXFxzXFxkISMlJiorPD0+QF5dW15cXHMhIyUmKis8PT5AXl0qPi87XG52YXIgcmUxID0gL2EvZztcbnZhciByZTIgPSAvYS9nO1xuXG4vLyBcIm5ld1wiIHNob3VsZCBjcmVhdGUgYSBuZXcgb2JqZWN0LCBvbGQgd2Via2l0IGJ1Z1xudmFyIENPUlJFQ1RfTkVXID0gbmV3IE5hdGl2ZVJlZ0V4cChyZTEpICE9PSByZTE7XG5cbnZhciBNSVNTRURfU1RJQ0tZID0gc3RpY2t5SGVscGVycy5NSVNTRURfU1RJQ0tZO1xudmFyIFVOU1VQUE9SVEVEX1kgPSBzdGlja3lIZWxwZXJzLlVOU1VQUE9SVEVEX1k7XG5cbnZhciBCQVNFX0ZPUkNFRCA9IERFU0NSSVBUT1JTICYmXG4gICghQ09SUkVDVF9ORVcgfHwgTUlTU0VEX1NUSUNLWSB8fCBVTlNVUFBPUlRFRF9ET1RfQUxMIHx8IFVOU1VQUE9SVEVEX05DRyB8fCBmYWlscyhmdW5jdGlvbiAoKSB7XG4gICAgcmUyW01BVENIXSA9IGZhbHNlO1xuICAgIC8vIFJlZ0V4cCBjb25zdHJ1Y3RvciBjYW4gYWx0ZXIgZmxhZ3MgYW5kIElzUmVnRXhwIHdvcmtzIGNvcnJlY3Qgd2l0aCBAQG1hdGNoXG4gICAgcmV0dXJuIE5hdGl2ZVJlZ0V4cChyZTEpICE9PSByZTEgfHwgTmF0aXZlUmVnRXhwKHJlMikgPT09IHJlMiB8fCBTdHJpbmcoTmF0aXZlUmVnRXhwKHJlMSwgJ2knKSkgIT09ICcvYS9pJztcbiAgfSkpO1xuXG52YXIgaGFuZGxlRG90QWxsID0gZnVuY3Rpb24gKHN0cmluZykge1xuICB2YXIgbGVuZ3RoID0gc3RyaW5nLmxlbmd0aDtcbiAgdmFyIGluZGV4ID0gMDtcbiAgdmFyIHJlc3VsdCA9ICcnO1xuICB2YXIgYnJhY2tldHMgPSBmYWxzZTtcbiAgdmFyIGNocjtcbiAgZm9yICg7IGluZGV4IDw9IGxlbmd0aDsgaW5kZXgrKykge1xuICAgIGNociA9IGNoYXJBdChzdHJpbmcsIGluZGV4KTtcbiAgICBpZiAoY2hyID09PSAnXFxcXCcpIHtcbiAgICAgIHJlc3VsdCArPSBjaHIgKyBjaGFyQXQoc3RyaW5nLCArK2luZGV4KTtcbiAgICAgIGNvbnRpbnVlO1xuICAgIH1cbiAgICBpZiAoIWJyYWNrZXRzICYmIGNociA9PT0gJy4nKSB7XG4gICAgICByZXN1bHQgKz0gJ1tcXFxcc1xcXFxTXSc7XG4gICAgfSBlbHNlIHtcbiAgICAgIGlmIChjaHIgPT09ICdbJykge1xuICAgICAgICBicmFja2V0cyA9IHRydWU7XG4gICAgICB9IGVsc2UgaWYgKGNociA9PT0gJ10nKSB7XG4gICAgICAgIGJyYWNrZXRzID0gZmFsc2U7XG4gICAgICB9IHJlc3VsdCArPSBjaHI7XG4gICAgfVxuICB9IHJldHVybiByZXN1bHQ7XG59O1xuXG52YXIgaGFuZGxlTkNHID0gZnVuY3Rpb24gKHN0cmluZykge1xuICB2YXIgbGVuZ3RoID0gc3RyaW5nLmxlbmd0aDtcbiAgdmFyIGluZGV4ID0gMDtcbiAgdmFyIHJlc3VsdCA9ICcnO1xuICB2YXIgbmFtZWQgPSBbXTtcbiAgdmFyIG5hbWVzID0gY3JlYXRlKG51bGwpO1xuICB2YXIgYnJhY2tldHMgPSBmYWxzZTtcbiAgdmFyIG5jZyA9IGZhbHNlO1xuICB2YXIgZ3JvdXBpZCA9IDA7XG4gIHZhciBncm91cG5hbWUgPSAnJztcbiAgdmFyIGNocjtcbiAgZm9yICg7IGluZGV4IDw9IGxlbmd0aDsgaW5kZXgrKykge1xuICAgIGNociA9IGNoYXJBdChzdHJpbmcsIGluZGV4KTtcbiAgICBpZiAoY2hyID09PSAnXFxcXCcpIHtcbiAgICAgIGNociArPSBjaGFyQXQoc3RyaW5nLCArK2luZGV4KTtcbiAgICB9IGVsc2UgaWYgKGNociA9PT0gJ10nKSB7XG4gICAgICBicmFja2V0cyA9IGZhbHNlO1xuICAgIH0gZWxzZSBpZiAoIWJyYWNrZXRzKSBzd2l0Y2ggKHRydWUpIHtcbiAgICAgIGNhc2UgY2hyID09PSAnWyc6XG4gICAgICAgIGJyYWNrZXRzID0gdHJ1ZTtcbiAgICAgICAgYnJlYWs7XG4gICAgICBjYXNlIGNociA9PT0gJygnOlxuICAgICAgICBpZiAoZXhlYyhJU19OQ0csIHN0cmluZ1NsaWNlKHN0cmluZywgaW5kZXggKyAxKSkpIHtcbiAgICAgICAgICBpbmRleCArPSAyO1xuICAgICAgICAgIG5jZyA9IHRydWU7XG4gICAgICAgIH1cbiAgICAgICAgcmVzdWx0ICs9IGNocjtcbiAgICAgICAgZ3JvdXBpZCsrO1xuICAgICAgICBjb250aW51ZTtcbiAgICAgIGNhc2UgY2hyID09PSAnPicgJiYgbmNnOlxuICAgICAgICBpZiAoZ3JvdXBuYW1lID09PSAnJyB8fCBoYXNPd24obmFtZXMsIGdyb3VwbmFtZSkpIHtcbiAgICAgICAgICB0aHJvdyBuZXcgU3ludGF4RXJyb3IoJ0ludmFsaWQgY2FwdHVyZSBncm91cCBuYW1lJyk7XG4gICAgICAgIH1cbiAgICAgICAgbmFtZXNbZ3JvdXBuYW1lXSA9IHRydWU7XG4gICAgICAgIG5hbWVkW25hbWVkLmxlbmd0aF0gPSBbZ3JvdXBuYW1lLCBncm91cGlkXTtcbiAgICAgICAgbmNnID0gZmFsc2U7XG4gICAgICAgIGdyb3VwbmFtZSA9ICcnO1xuICAgICAgICBjb250aW51ZTtcbiAgICB9XG4gICAgaWYgKG5jZykgZ3JvdXBuYW1lICs9IGNocjtcbiAgICBlbHNlIHJlc3VsdCArPSBjaHI7XG4gIH0gcmV0dXJuIFtyZXN1bHQsIG5hbWVkXTtcbn07XG5cbi8vIGBSZWdFeHBgIGNvbnN0cnVjdG9yXG4vLyBodHRwczovL3RjMzkuZXMvZWNtYTI2Mi8jc2VjLXJlZ2V4cC1jb25zdHJ1Y3RvclxuaWYgKGlzRm9yY2VkKCdSZWdFeHAnLCBCQVNFX0ZPUkNFRCkpIHtcbiAgdmFyIFJlZ0V4cFdyYXBwZXIgPSBmdW5jdGlvbiBSZWdFeHAocGF0dGVybiwgZmxhZ3MpIHtcbiAgICB2YXIgdGhpc0lzUmVnRXhwID0gaXNQcm90b3R5cGVPZihSZWdFeHBQcm90b3R5cGUsIHRoaXMpO1xuICAgIHZhciBwYXR0ZXJuSXNSZWdFeHAgPSBpc1JlZ0V4cChwYXR0ZXJuKTtcbiAgICB2YXIgZmxhZ3NBcmVVbmRlZmluZWQgPSBmbGFncyA9PT0gdW5kZWZpbmVkO1xuICAgIHZhciBncm91cHMgPSBbXTtcbiAgICB2YXIgcmF3UGF0dGVybiA9IHBhdHRlcm47XG4gICAgdmFyIHJhd0ZsYWdzLCBkb3RBbGwsIHN0aWNreSwgaGFuZGxlZCwgcmVzdWx0LCBzdGF0ZTtcblxuICAgIGlmICghdGhpc0lzUmVnRXhwICYmIHBhdHRlcm5Jc1JlZ0V4cCAmJiBmbGFnc0FyZVVuZGVmaW5lZCAmJiBwYXR0ZXJuLmNvbnN0cnVjdG9yID09PSBSZWdFeHBXcmFwcGVyKSB7XG4gICAgICByZXR1cm4gcGF0dGVybjtcbiAgICB9XG5cbiAgICBpZiAocGF0dGVybklzUmVnRXhwIHx8IGlzUHJvdG90eXBlT2YoUmVnRXhwUHJvdG90eXBlLCBwYXR0ZXJuKSkge1xuICAgICAgcGF0dGVybiA9IHBhdHRlcm4uc291cmNlO1xuICAgICAgaWYgKGZsYWdzQXJlVW5kZWZpbmVkKSBmbGFncyA9IGdldFJlZ0V4cEZsYWdzKHJhd1BhdHRlcm4pO1xuICAgIH1cblxuICAgIHBhdHRlcm4gPSBwYXR0ZXJuID09PSB1bmRlZmluZWQgPyAnJyA6IHRvU3RyaW5nKHBhdHRlcm4pO1xuICAgIGZsYWdzID0gZmxhZ3MgPT09IHVuZGVmaW5lZCA/ICcnIDogdG9TdHJpbmcoZmxhZ3MpO1xuICAgIHJhd1BhdHRlcm4gPSBwYXR0ZXJuO1xuXG4gICAgaWYgKFVOU1VQUE9SVEVEX0RPVF9BTEwgJiYgJ2RvdEFsbCcgaW4gcmUxKSB7XG4gICAgICBkb3RBbGwgPSAhIWZsYWdzICYmIHN0cmluZ0luZGV4T2YoZmxhZ3MsICdzJykgPiAtMTtcbiAgICAgIGlmIChkb3RBbGwpIGZsYWdzID0gcmVwbGFjZShmbGFncywgL3MvZywgJycpO1xuICAgIH1cblxuICAgIHJhd0ZsYWdzID0gZmxhZ3M7XG5cbiAgICBpZiAoTUlTU0VEX1NUSUNLWSAmJiAnc3RpY2t5JyBpbiByZTEpIHtcbiAgICAgIHN0aWNreSA9ICEhZmxhZ3MgJiYgc3RyaW5nSW5kZXhPZihmbGFncywgJ3knKSA+IC0xO1xuICAgICAgaWYgKHN0aWNreSAmJiBVTlNVUFBPUlRFRF9ZKSBmbGFncyA9IHJlcGxhY2UoZmxhZ3MsIC95L2csICcnKTtcbiAgICB9XG5cbiAgICBpZiAoVU5TVVBQT1JURURfTkNHKSB7XG4gICAgICBoYW5kbGVkID0gaGFuZGxlTkNHKHBhdHRlcm4pO1xuICAgICAgcGF0dGVybiA9IGhhbmRsZWRbMF07XG4gICAgICBncm91cHMgPSBoYW5kbGVkWzFdO1xuICAgIH1cblxuICAgIHJlc3VsdCA9IGluaGVyaXRJZlJlcXVpcmVkKE5hdGl2ZVJlZ0V4cChwYXR0ZXJuLCBmbGFncyksIHRoaXNJc1JlZ0V4cCA/IHRoaXMgOiBSZWdFeHBQcm90b3R5cGUsIFJlZ0V4cFdyYXBwZXIpO1xuXG4gICAgaWYgKGRvdEFsbCB8fCBzdGlja3kgfHwgZ3JvdXBzLmxlbmd0aCkge1xuICAgICAgc3RhdGUgPSBlbmZvcmNlSW50ZXJuYWxTdGF0ZShyZXN1bHQpO1xuICAgICAgaWYgKGRvdEFsbCkge1xuICAgICAgICBzdGF0ZS5kb3RBbGwgPSB0cnVlO1xuICAgICAgICBzdGF0ZS5yYXcgPSBSZWdFeHBXcmFwcGVyKGhhbmRsZURvdEFsbChwYXR0ZXJuKSwgcmF3RmxhZ3MpO1xuICAgICAgfVxuICAgICAgaWYgKHN0aWNreSkgc3RhdGUuc3RpY2t5ID0gdHJ1ZTtcbiAgICAgIGlmIChncm91cHMubGVuZ3RoKSBzdGF0ZS5ncm91cHMgPSBncm91cHM7XG4gICAgfVxuXG4gICAgaWYgKHBhdHRlcm4gIT09IHJhd1BhdHRlcm4pIHRyeSB7XG4gICAgICAvLyBmYWlscyBpbiBvbGQgZW5naW5lcywgYnV0IHdlIGhhdmUgbm8gYWx0ZXJuYXRpdmVzIGZvciB1bnN1cHBvcnRlZCByZWdleCBzeW50YXhcbiAgICAgIGNyZWF0ZU5vbkVudW1lcmFibGVQcm9wZXJ0eShyZXN1bHQsICdzb3VyY2UnLCByYXdQYXR0ZXJuID09PSAnJyA/ICcoPzopJyA6IHJhd1BhdHRlcm4pO1xuICAgIH0gY2F0Y2ggKGVycm9yKSB7IC8qIGVtcHR5ICovIH1cblxuICAgIHJldHVybiByZXN1bHQ7XG4gIH07XG5cbiAgZm9yICh2YXIga2V5cyA9IGdldE93blByb3BlcnR5TmFtZXMoTmF0aXZlUmVnRXhwKSwgaW5kZXggPSAwOyBrZXlzLmxlbmd0aCA+IGluZGV4Oykge1xuICAgIHByb3h5QWNjZXNzb3IoUmVnRXhwV3JhcHBlciwgTmF0aXZlUmVnRXhwLCBrZXlzW2luZGV4KytdKTtcbiAgfVxuXG4gIFJlZ0V4cFByb3RvdHlwZS5jb25zdHJ1Y3RvciA9IFJlZ0V4cFdyYXBwZXI7XG4gIFJlZ0V4cFdyYXBwZXIucHJvdG90eXBlID0gUmVnRXhwUHJvdG90eXBlO1xuICBkZWZpbmVCdWlsdEluKGdsb2JhbCwgJ1JlZ0V4cCcsIFJlZ0V4cFdyYXBwZXIsIHsgY29uc3RydWN0b3I6IHRydWUgfSk7XG59XG5cbi8vIGh0dHBzOi8vdGMzOS5lcy9lY21hMjYyLyNzZWMtZ2V0LXJlZ2V4cC1AQHNwZWNpZXNcbnNldFNwZWNpZXMoJ1JlZ0V4cCcpO1xuIiwiJ3VzZSBzdHJpY3QnO1xudmFyICQgPSByZXF1aXJlKCcuLi9pbnRlcm5hbHMvZXhwb3J0Jyk7XG52YXIgZXhlYyA9IHJlcXVpcmUoJy4uL2ludGVybmFscy9yZWdleHAtZXhlYycpO1xuXG4vLyBgUmVnRXhwLnByb3RvdHlwZS5leGVjYCBtZXRob2Rcbi8vIGh0dHBzOi8vdGMzOS5lcy9lY21hMjYyLyNzZWMtcmVnZXhwLnByb3RvdHlwZS5leGVjXG4kKHsgdGFyZ2V0OiAnUmVnRXhwJywgcHJvdG86IHRydWUsIGZvcmNlZDogLy4vLmV4ZWMgIT09IGV4ZWMgfSwge1xuICBleGVjOiBleGVjXG59KTtcbiIsIid1c2Ugc3RyaWN0JztcbnZhciBjaGFyQXQgPSByZXF1aXJlKCcuLi9pbnRlcm5hbHMvc3RyaW5nLW11bHRpYnl0ZScpLmNoYXJBdDtcbnZhciB0b1N0cmluZyA9IHJlcXVpcmUoJy4uL2ludGVybmFscy90by1zdHJpbmcnKTtcbnZhciBJbnRlcm5hbFN0YXRlTW9kdWxlID0gcmVxdWlyZSgnLi4vaW50ZXJuYWxzL2ludGVybmFsLXN0YXRlJyk7XG52YXIgZGVmaW5lSXRlcmF0b3IgPSByZXF1aXJlKCcuLi9pbnRlcm5hbHMvaXRlcmF0b3ItZGVmaW5lJyk7XG52YXIgY3JlYXRlSXRlclJlc3VsdE9iamVjdCA9IHJlcXVpcmUoJy4uL2ludGVybmFscy9jcmVhdGUtaXRlci1yZXN1bHQtb2JqZWN0Jyk7XG5cbnZhciBTVFJJTkdfSVRFUkFUT1IgPSAnU3RyaW5nIEl0ZXJhdG9yJztcbnZhciBzZXRJbnRlcm5hbFN0YXRlID0gSW50ZXJuYWxTdGF0ZU1vZHVsZS5zZXQ7XG52YXIgZ2V0SW50ZXJuYWxTdGF0ZSA9IEludGVybmFsU3RhdGVNb2R1bGUuZ2V0dGVyRm9yKFNUUklOR19JVEVSQVRPUik7XG5cbi8vIGBTdHJpbmcucHJvdG90eXBlW0BAaXRlcmF0b3JdYCBtZXRob2Rcbi8vIGh0dHBzOi8vdGMzOS5lcy9lY21hMjYyLyNzZWMtc3RyaW5nLnByb3RvdHlwZS1AQGl0ZXJhdG9yXG5kZWZpbmVJdGVyYXRvcihTdHJpbmcsICdTdHJpbmcnLCBmdW5jdGlvbiAoaXRlcmF0ZWQpIHtcbiAgc2V0SW50ZXJuYWxTdGF0ZSh0aGlzLCB7XG4gICAgdHlwZTogU1RSSU5HX0lURVJBVE9SLFxuICAgIHN0cmluZzogdG9TdHJpbmcoaXRlcmF0ZWQpLFxuICAgIGluZGV4OiAwXG4gIH0pO1xuLy8gYCVTdHJpbmdJdGVyYXRvclByb3RvdHlwZSUubmV4dGAgbWV0aG9kXG4vLyBodHRwczovL3RjMzkuZXMvZWNtYTI2Mi8jc2VjLSVzdHJpbmdpdGVyYXRvcnByb3RvdHlwZSUubmV4dFxufSwgZnVuY3Rpb24gbmV4dCgpIHtcbiAgdmFyIHN0YXRlID0gZ2V0SW50ZXJuYWxTdGF0ZSh0aGlzKTtcbiAgdmFyIHN0cmluZyA9IHN0YXRlLnN0cmluZztcbiAgdmFyIGluZGV4ID0gc3RhdGUuaW5kZXg7XG4gIHZhciBwb2ludDtcbiAgaWYgKGluZGV4ID49IHN0cmluZy5sZW5ndGgpIHJldHVybiBjcmVhdGVJdGVyUmVzdWx0T2JqZWN0KHVuZGVmaW5lZCwgdHJ1ZSk7XG4gIHBvaW50ID0gY2hhckF0KHN0cmluZywgaW5kZXgpO1xuICBzdGF0ZS5pbmRleCArPSBwb2ludC5sZW5ndGg7XG4gIHJldHVybiBjcmVhdGVJdGVyUmVzdWx0T2JqZWN0KHBvaW50LCBmYWxzZSk7XG59KTtcbiIsIid1c2Ugc3RyaWN0Jztcbi8qIGVzbGludC1kaXNhYmxlIGVzL25vLXN0cmluZy1wcm90b3R5cGUtbWF0Y2hhbGwgLS0gc2FmZSAqL1xudmFyICQgPSByZXF1aXJlKCcuLi9pbnRlcm5hbHMvZXhwb3J0Jyk7XG52YXIgY2FsbCA9IHJlcXVpcmUoJy4uL2ludGVybmFscy9mdW5jdGlvbi1jYWxsJyk7XG52YXIgdW5jdXJyeVRoaXMgPSByZXF1aXJlKCcuLi9pbnRlcm5hbHMvZnVuY3Rpb24tdW5jdXJyeS10aGlzLWNsYXVzZScpO1xudmFyIGNyZWF0ZUl0ZXJhdG9yQ29uc3RydWN0b3IgPSByZXF1aXJlKCcuLi9pbnRlcm5hbHMvaXRlcmF0b3ItY3JlYXRlLWNvbnN0cnVjdG9yJyk7XG52YXIgY3JlYXRlSXRlclJlc3VsdE9iamVjdCA9IHJlcXVpcmUoJy4uL2ludGVybmFscy9jcmVhdGUtaXRlci1yZXN1bHQtb2JqZWN0Jyk7XG52YXIgcmVxdWlyZU9iamVjdENvZXJjaWJsZSA9IHJlcXVpcmUoJy4uL2ludGVybmFscy9yZXF1aXJlLW9iamVjdC1jb2VyY2libGUnKTtcbnZhciB0b0xlbmd0aCA9IHJlcXVpcmUoJy4uL2ludGVybmFscy90by1sZW5ndGgnKTtcbnZhciB0b1N0cmluZyA9IHJlcXVpcmUoJy4uL2ludGVybmFscy90by1zdHJpbmcnKTtcbnZhciBhbk9iamVjdCA9IHJlcXVpcmUoJy4uL2ludGVybmFscy9hbi1vYmplY3QnKTtcbnZhciBpc051bGxPclVuZGVmaW5lZCA9IHJlcXVpcmUoJy4uL2ludGVybmFscy9pcy1udWxsLW9yLXVuZGVmaW5lZCcpO1xudmFyIGNsYXNzb2YgPSByZXF1aXJlKCcuLi9pbnRlcm5hbHMvY2xhc3NvZi1yYXcnKTtcbnZhciBpc1JlZ0V4cCA9IHJlcXVpcmUoJy4uL2ludGVybmFscy9pcy1yZWdleHAnKTtcbnZhciBnZXRSZWdFeHBGbGFncyA9IHJlcXVpcmUoJy4uL2ludGVybmFscy9yZWdleHAtZ2V0LWZsYWdzJyk7XG52YXIgZ2V0TWV0aG9kID0gcmVxdWlyZSgnLi4vaW50ZXJuYWxzL2dldC1tZXRob2QnKTtcbnZhciBkZWZpbmVCdWlsdEluID0gcmVxdWlyZSgnLi4vaW50ZXJuYWxzL2RlZmluZS1idWlsdC1pbicpO1xudmFyIGZhaWxzID0gcmVxdWlyZSgnLi4vaW50ZXJuYWxzL2ZhaWxzJyk7XG52YXIgd2VsbEtub3duU3ltYm9sID0gcmVxdWlyZSgnLi4vaW50ZXJuYWxzL3dlbGwta25vd24tc3ltYm9sJyk7XG52YXIgc3BlY2llc0NvbnN0cnVjdG9yID0gcmVxdWlyZSgnLi4vaW50ZXJuYWxzL3NwZWNpZXMtY29uc3RydWN0b3InKTtcbnZhciBhZHZhbmNlU3RyaW5nSW5kZXggPSByZXF1aXJlKCcuLi9pbnRlcm5hbHMvYWR2YW5jZS1zdHJpbmctaW5kZXgnKTtcbnZhciByZWdFeHBFeGVjID0gcmVxdWlyZSgnLi4vaW50ZXJuYWxzL3JlZ2V4cC1leGVjLWFic3RyYWN0Jyk7XG52YXIgSW50ZXJuYWxTdGF0ZU1vZHVsZSA9IHJlcXVpcmUoJy4uL2ludGVybmFscy9pbnRlcm5hbC1zdGF0ZScpO1xudmFyIElTX1BVUkUgPSByZXF1aXJlKCcuLi9pbnRlcm5hbHMvaXMtcHVyZScpO1xuXG52YXIgTUFUQ0hfQUxMID0gd2VsbEtub3duU3ltYm9sKCdtYXRjaEFsbCcpO1xudmFyIFJFR0VYUF9TVFJJTkcgPSAnUmVnRXhwIFN0cmluZyc7XG52YXIgUkVHRVhQX1NUUklOR19JVEVSQVRPUiA9IFJFR0VYUF9TVFJJTkcgKyAnIEl0ZXJhdG9yJztcbnZhciBzZXRJbnRlcm5hbFN0YXRlID0gSW50ZXJuYWxTdGF0ZU1vZHVsZS5zZXQ7XG52YXIgZ2V0SW50ZXJuYWxTdGF0ZSA9IEludGVybmFsU3RhdGVNb2R1bGUuZ2V0dGVyRm9yKFJFR0VYUF9TVFJJTkdfSVRFUkFUT1IpO1xudmFyIFJlZ0V4cFByb3RvdHlwZSA9IFJlZ0V4cC5wcm90b3R5cGU7XG52YXIgJFR5cGVFcnJvciA9IFR5cGVFcnJvcjtcbnZhciBzdHJpbmdJbmRleE9mID0gdW5jdXJyeVRoaXMoJycuaW5kZXhPZik7XG52YXIgbmF0aXZlTWF0Y2hBbGwgPSB1bmN1cnJ5VGhpcygnJy5tYXRjaEFsbCk7XG5cbnZhciBXT1JLU19XSVRIX05PTl9HTE9CQUxfUkVHRVggPSAhIW5hdGl2ZU1hdGNoQWxsICYmICFmYWlscyhmdW5jdGlvbiAoKSB7XG4gIG5hdGl2ZU1hdGNoQWxsKCdhJywgLy4vKTtcbn0pO1xuXG52YXIgJFJlZ0V4cFN0cmluZ0l0ZXJhdG9yID0gY3JlYXRlSXRlcmF0b3JDb25zdHJ1Y3RvcihmdW5jdGlvbiBSZWdFeHBTdHJpbmdJdGVyYXRvcihyZWdleHAsIHN0cmluZywgJGdsb2JhbCwgZnVsbFVuaWNvZGUpIHtcbiAgc2V0SW50ZXJuYWxTdGF0ZSh0aGlzLCB7XG4gICAgdHlwZTogUkVHRVhQX1NUUklOR19JVEVSQVRPUixcbiAgICByZWdleHA6IHJlZ2V4cCxcbiAgICBzdHJpbmc6IHN0cmluZyxcbiAgICBnbG9iYWw6ICRnbG9iYWwsXG4gICAgdW5pY29kZTogZnVsbFVuaWNvZGUsXG4gICAgZG9uZTogZmFsc2VcbiAgfSk7XG59LCBSRUdFWFBfU1RSSU5HLCBmdW5jdGlvbiBuZXh0KCkge1xuICB2YXIgc3RhdGUgPSBnZXRJbnRlcm5hbFN0YXRlKHRoaXMpO1xuICBpZiAoc3RhdGUuZG9uZSkgcmV0dXJuIGNyZWF0ZUl0ZXJSZXN1bHRPYmplY3QodW5kZWZpbmVkLCB0cnVlKTtcbiAgdmFyIFIgPSBzdGF0ZS5yZWdleHA7XG4gIHZhciBTID0gc3RhdGUuc3RyaW5nO1xuICB2YXIgbWF0Y2ggPSByZWdFeHBFeGVjKFIsIFMpO1xuICBpZiAobWF0Y2ggPT09IG51bGwpIHtcbiAgICBzdGF0ZS5kb25lID0gdHJ1ZTtcbiAgICByZXR1cm4gY3JlYXRlSXRlclJlc3VsdE9iamVjdCh1bmRlZmluZWQsIHRydWUpO1xuICB9XG4gIGlmIChzdGF0ZS5nbG9iYWwpIHtcbiAgICBpZiAodG9TdHJpbmcobWF0Y2hbMF0pID09PSAnJykgUi5sYXN0SW5kZXggPSBhZHZhbmNlU3RyaW5nSW5kZXgoUywgdG9MZW5ndGgoUi5sYXN0SW5kZXgpLCBzdGF0ZS51bmljb2RlKTtcbiAgICByZXR1cm4gY3JlYXRlSXRlclJlc3VsdE9iamVjdChtYXRjaCwgZmFsc2UpO1xuICB9XG4gIHN0YXRlLmRvbmUgPSB0cnVlO1xuICByZXR1cm4gY3JlYXRlSXRlclJlc3VsdE9iamVjdChtYXRjaCwgZmFsc2UpO1xufSk7XG5cbnZhciAkbWF0Y2hBbGwgPSBmdW5jdGlvbiAoc3RyaW5nKSB7XG4gIHZhciBSID0gYW5PYmplY3QodGhpcyk7XG4gIHZhciBTID0gdG9TdHJpbmcoc3RyaW5nKTtcbiAgdmFyIEMgPSBzcGVjaWVzQ29uc3RydWN0b3IoUiwgUmVnRXhwKTtcbiAgdmFyIGZsYWdzID0gdG9TdHJpbmcoZ2V0UmVnRXhwRmxhZ3MoUikpO1xuICB2YXIgbWF0Y2hlciwgJGdsb2JhbCwgZnVsbFVuaWNvZGU7XG4gIG1hdGNoZXIgPSBuZXcgQyhDID09PSBSZWdFeHAgPyBSLnNvdXJjZSA6IFIsIGZsYWdzKTtcbiAgJGdsb2JhbCA9ICEhfnN0cmluZ0luZGV4T2YoZmxhZ3MsICdnJyk7XG4gIGZ1bGxVbmljb2RlID0gISF+c3RyaW5nSW5kZXhPZihmbGFncywgJ3UnKTtcbiAgbWF0Y2hlci5sYXN0SW5kZXggPSB0b0xlbmd0aChSLmxhc3RJbmRleCk7XG4gIHJldHVybiBuZXcgJFJlZ0V4cFN0cmluZ0l0ZXJhdG9yKG1hdGNoZXIsIFMsICRnbG9iYWwsIGZ1bGxVbmljb2RlKTtcbn07XG5cbi8vIGBTdHJpbmcucHJvdG90eXBlLm1hdGNoQWxsYCBtZXRob2Rcbi8vIGh0dHBzOi8vdGMzOS5lcy9lY21hMjYyLyNzZWMtc3RyaW5nLnByb3RvdHlwZS5tYXRjaGFsbFxuJCh7IHRhcmdldDogJ1N0cmluZycsIHByb3RvOiB0cnVlLCBmb3JjZWQ6IFdPUktTX1dJVEhfTk9OX0dMT0JBTF9SRUdFWCB9LCB7XG4gIG1hdGNoQWxsOiBmdW5jdGlvbiBtYXRjaEFsbChyZWdleHApIHtcbiAgICB2YXIgTyA9IHJlcXVpcmVPYmplY3RDb2VyY2libGUodGhpcyk7XG4gICAgdmFyIGZsYWdzLCBTLCBtYXRjaGVyLCByeDtcbiAgICBpZiAoIWlzTnVsbE9yVW5kZWZpbmVkKHJlZ2V4cCkpIHtcbiAgICAgIGlmIChpc1JlZ0V4cChyZWdleHApKSB7XG4gICAgICAgIGZsYWdzID0gdG9TdHJpbmcocmVxdWlyZU9iamVjdENvZXJjaWJsZShnZXRSZWdFeHBGbGFncyhyZWdleHApKSk7XG4gICAgICAgIGlmICghfnN0cmluZ0luZGV4T2YoZmxhZ3MsICdnJykpIHRocm93IG5ldyAkVHlwZUVycm9yKCdgLm1hdGNoQWxsYCBkb2VzIG5vdCBhbGxvdyBub24tZ2xvYmFsIHJlZ2V4ZXMnKTtcbiAgICAgIH1cbiAgICAgIGlmIChXT1JLU19XSVRIX05PTl9HTE9CQUxfUkVHRVgpIHJldHVybiBuYXRpdmVNYXRjaEFsbChPLCByZWdleHApO1xuICAgICAgbWF0Y2hlciA9IGdldE1ldGhvZChyZWdleHAsIE1BVENIX0FMTCk7XG4gICAgICBpZiAobWF0Y2hlciA9PT0gdW5kZWZpbmVkICYmIElTX1BVUkUgJiYgY2xhc3NvZihyZWdleHApID09PSAnUmVnRXhwJykgbWF0Y2hlciA9ICRtYXRjaEFsbDtcbiAgICAgIGlmIChtYXRjaGVyKSByZXR1cm4gY2FsbChtYXRjaGVyLCByZWdleHAsIE8pO1xuICAgIH0gZWxzZSBpZiAoV09SS1NfV0lUSF9OT05fR0xPQkFMX1JFR0VYKSByZXR1cm4gbmF0aXZlTWF0Y2hBbGwoTywgcmVnZXhwKTtcbiAgICBTID0gdG9TdHJpbmcoTyk7XG4gICAgcnggPSBuZXcgUmVnRXhwKHJlZ2V4cCwgJ2cnKTtcbiAgICByZXR1cm4gSVNfUFVSRSA/IGNhbGwoJG1hdGNoQWxsLCByeCwgUykgOiByeFtNQVRDSF9BTExdKFMpO1xuICB9XG59KTtcblxuSVNfUFVSRSB8fCBNQVRDSF9BTEwgaW4gUmVnRXhwUHJvdG90eXBlIHx8IGRlZmluZUJ1aWx0SW4oUmVnRXhwUHJvdG90eXBlLCBNQVRDSF9BTEwsICRtYXRjaEFsbCk7XG4iLCIndXNlIHN0cmljdCc7XG52YXIgJCA9IHJlcXVpcmUoJy4uL2ludGVybmFscy9leHBvcnQnKTtcbnZhciBjYWxsID0gcmVxdWlyZSgnLi4vaW50ZXJuYWxzL2Z1bmN0aW9uLWNhbGwnKTtcbnZhciB1bmN1cnJ5VGhpcyA9IHJlcXVpcmUoJy4uL2ludGVybmFscy9mdW5jdGlvbi11bmN1cnJ5LXRoaXMnKTtcbnZhciByZXF1aXJlT2JqZWN0Q29lcmNpYmxlID0gcmVxdWlyZSgnLi4vaW50ZXJuYWxzL3JlcXVpcmUtb2JqZWN0LWNvZXJjaWJsZScpO1xudmFyIGlzQ2FsbGFibGUgPSByZXF1aXJlKCcuLi9pbnRlcm5hbHMvaXMtY2FsbGFibGUnKTtcbnZhciBpc051bGxPclVuZGVmaW5lZCA9IHJlcXVpcmUoJy4uL2ludGVybmFscy9pcy1udWxsLW9yLXVuZGVmaW5lZCcpO1xudmFyIGlzUmVnRXhwID0gcmVxdWlyZSgnLi4vaW50ZXJuYWxzL2lzLXJlZ2V4cCcpO1xudmFyIHRvU3RyaW5nID0gcmVxdWlyZSgnLi4vaW50ZXJuYWxzL3RvLXN0cmluZycpO1xudmFyIGdldE1ldGhvZCA9IHJlcXVpcmUoJy4uL2ludGVybmFscy9nZXQtbWV0aG9kJyk7XG52YXIgZ2V0UmVnRXhwRmxhZ3MgPSByZXF1aXJlKCcuLi9pbnRlcm5hbHMvcmVnZXhwLWdldC1mbGFncycpO1xudmFyIGdldFN1YnN0aXR1dGlvbiA9IHJlcXVpcmUoJy4uL2ludGVybmFscy9nZXQtc3Vic3RpdHV0aW9uJyk7XG52YXIgd2VsbEtub3duU3ltYm9sID0gcmVxdWlyZSgnLi4vaW50ZXJuYWxzL3dlbGwta25vd24tc3ltYm9sJyk7XG52YXIgSVNfUFVSRSA9IHJlcXVpcmUoJy4uL2ludGVybmFscy9pcy1wdXJlJyk7XG5cbnZhciBSRVBMQUNFID0gd2VsbEtub3duU3ltYm9sKCdyZXBsYWNlJyk7XG52YXIgJFR5cGVFcnJvciA9IFR5cGVFcnJvcjtcbnZhciBpbmRleE9mID0gdW5jdXJyeVRoaXMoJycuaW5kZXhPZik7XG52YXIgcmVwbGFjZSA9IHVuY3VycnlUaGlzKCcnLnJlcGxhY2UpO1xudmFyIHN0cmluZ1NsaWNlID0gdW5jdXJyeVRoaXMoJycuc2xpY2UpO1xudmFyIG1heCA9IE1hdGgubWF4O1xuXG4vLyBgU3RyaW5nLnByb3RvdHlwZS5yZXBsYWNlQWxsYCBtZXRob2Rcbi8vIGh0dHBzOi8vdGMzOS5lcy9lY21hMjYyLyNzZWMtc3RyaW5nLnByb3RvdHlwZS5yZXBsYWNlYWxsXG4kKHsgdGFyZ2V0OiAnU3RyaW5nJywgcHJvdG86IHRydWUgfSwge1xuICByZXBsYWNlQWxsOiBmdW5jdGlvbiByZXBsYWNlQWxsKHNlYXJjaFZhbHVlLCByZXBsYWNlVmFsdWUpIHtcbiAgICB2YXIgTyA9IHJlcXVpcmVPYmplY3RDb2VyY2libGUodGhpcyk7XG4gICAgdmFyIElTX1JFR19FWFAsIGZsYWdzLCByZXBsYWNlciwgc3RyaW5nLCBzZWFyY2hTdHJpbmcsIGZ1bmN0aW9uYWxSZXBsYWNlLCBzZWFyY2hMZW5ndGgsIGFkdmFuY2VCeSwgcmVwbGFjZW1lbnQ7XG4gICAgdmFyIHBvc2l0aW9uID0gMDtcbiAgICB2YXIgZW5kT2ZMYXN0TWF0Y2ggPSAwO1xuICAgIHZhciByZXN1bHQgPSAnJztcbiAgICBpZiAoIWlzTnVsbE9yVW5kZWZpbmVkKHNlYXJjaFZhbHVlKSkge1xuICAgICAgSVNfUkVHX0VYUCA9IGlzUmVnRXhwKHNlYXJjaFZhbHVlKTtcbiAgICAgIGlmIChJU19SRUdfRVhQKSB7XG4gICAgICAgIGZsYWdzID0gdG9TdHJpbmcocmVxdWlyZU9iamVjdENvZXJjaWJsZShnZXRSZWdFeHBGbGFncyhzZWFyY2hWYWx1ZSkpKTtcbiAgICAgICAgaWYgKCF+aW5kZXhPZihmbGFncywgJ2cnKSkgdGhyb3cgbmV3ICRUeXBlRXJyb3IoJ2AucmVwbGFjZUFsbGAgZG9lcyBub3QgYWxsb3cgbm9uLWdsb2JhbCByZWdleGVzJyk7XG4gICAgICB9XG4gICAgICByZXBsYWNlciA9IGdldE1ldGhvZChzZWFyY2hWYWx1ZSwgUkVQTEFDRSk7XG4gICAgICBpZiAocmVwbGFjZXIpIHtcbiAgICAgICAgcmV0dXJuIGNhbGwocmVwbGFjZXIsIHNlYXJjaFZhbHVlLCBPLCByZXBsYWNlVmFsdWUpO1xuICAgICAgfSBlbHNlIGlmIChJU19QVVJFICYmIElTX1JFR19FWFApIHtcbiAgICAgICAgcmV0dXJuIHJlcGxhY2UodG9TdHJpbmcoTyksIHNlYXJjaFZhbHVlLCByZXBsYWNlVmFsdWUpO1xuICAgICAgfVxuICAgIH1cbiAgICBzdHJpbmcgPSB0b1N0cmluZyhPKTtcbiAgICBzZWFyY2hTdHJpbmcgPSB0b1N0cmluZyhzZWFyY2hWYWx1ZSk7XG4gICAgZnVuY3Rpb25hbFJlcGxhY2UgPSBpc0NhbGxhYmxlKHJlcGxhY2VWYWx1ZSk7XG4gICAgaWYgKCFmdW5jdGlvbmFsUmVwbGFjZSkgcmVwbGFjZVZhbHVlID0gdG9TdHJpbmcocmVwbGFjZVZhbHVlKTtcbiAgICBzZWFyY2hMZW5ndGggPSBzZWFyY2hTdHJpbmcubGVuZ3RoO1xuICAgIGFkdmFuY2VCeSA9IG1heCgxLCBzZWFyY2hMZW5ndGgpO1xuICAgIHBvc2l0aW9uID0gaW5kZXhPZihzdHJpbmcsIHNlYXJjaFN0cmluZyk7XG4gICAgd2hpbGUgKHBvc2l0aW9uICE9PSAtMSkge1xuICAgICAgcmVwbGFjZW1lbnQgPSBmdW5jdGlvbmFsUmVwbGFjZVxuICAgICAgICA/IHRvU3RyaW5nKHJlcGxhY2VWYWx1ZShzZWFyY2hTdHJpbmcsIHBvc2l0aW9uLCBzdHJpbmcpKVxuICAgICAgICA6IGdldFN1YnN0aXR1dGlvbihzZWFyY2hTdHJpbmcsIHN0cmluZywgcG9zaXRpb24sIFtdLCB1bmRlZmluZWQsIHJlcGxhY2VWYWx1ZSk7XG4gICAgICByZXN1bHQgKz0gc3RyaW5nU2xpY2Uoc3RyaW5nLCBlbmRPZkxhc3RNYXRjaCwgcG9zaXRpb24pICsgcmVwbGFjZW1lbnQ7XG4gICAgICBlbmRPZkxhc3RNYXRjaCA9IHBvc2l0aW9uICsgc2VhcmNoTGVuZ3RoO1xuICAgICAgcG9zaXRpb24gPSBwb3NpdGlvbiArIGFkdmFuY2VCeSA+IHN0cmluZy5sZW5ndGggPyAtMSA6IGluZGV4T2Yoc3RyaW5nLCBzZWFyY2hTdHJpbmcsIHBvc2l0aW9uICsgYWR2YW5jZUJ5KTtcbiAgICB9XG4gICAgaWYgKGVuZE9mTGFzdE1hdGNoIDwgc3RyaW5nLmxlbmd0aCkge1xuICAgICAgcmVzdWx0ICs9IHN0cmluZ1NsaWNlKHN0cmluZywgZW5kT2ZMYXN0TWF0Y2gpO1xuICAgIH1cbiAgICByZXR1cm4gcmVzdWx0O1xuICB9XG59KTtcbiIsIid1c2Ugc3RyaWN0JztcbnZhciBhcHBseSA9IHJlcXVpcmUoJy4uL2ludGVybmFscy9mdW5jdGlvbi1hcHBseScpO1xudmFyIGNhbGwgPSByZXF1aXJlKCcuLi9pbnRlcm5hbHMvZnVuY3Rpb24tY2FsbCcpO1xudmFyIHVuY3VycnlUaGlzID0gcmVxdWlyZSgnLi4vaW50ZXJuYWxzL2Z1bmN0aW9uLXVuY3VycnktdGhpcycpO1xudmFyIGZpeFJlZ0V4cFdlbGxLbm93blN5bWJvbExvZ2ljID0gcmVxdWlyZSgnLi4vaW50ZXJuYWxzL2ZpeC1yZWdleHAtd2VsbC1rbm93bi1zeW1ib2wtbG9naWMnKTtcbnZhciBmYWlscyA9IHJlcXVpcmUoJy4uL2ludGVybmFscy9mYWlscycpO1xudmFyIGFuT2JqZWN0ID0gcmVxdWlyZSgnLi4vaW50ZXJuYWxzL2FuLW9iamVjdCcpO1xudmFyIGlzQ2FsbGFibGUgPSByZXF1aXJlKCcuLi9pbnRlcm5hbHMvaXMtY2FsbGFibGUnKTtcbnZhciBpc051bGxPclVuZGVmaW5lZCA9IHJlcXVpcmUoJy4uL2ludGVybmFscy9pcy1udWxsLW9yLXVuZGVmaW5lZCcpO1xudmFyIHRvSW50ZWdlck9ySW5maW5pdHkgPSByZXF1aXJlKCcuLi9pbnRlcm5hbHMvdG8taW50ZWdlci1vci1pbmZpbml0eScpO1xudmFyIHRvTGVuZ3RoID0gcmVxdWlyZSgnLi4vaW50ZXJuYWxzL3RvLWxlbmd0aCcpO1xudmFyIHRvU3RyaW5nID0gcmVxdWlyZSgnLi4vaW50ZXJuYWxzL3RvLXN0cmluZycpO1xudmFyIHJlcXVpcmVPYmplY3RDb2VyY2libGUgPSByZXF1aXJlKCcuLi9pbnRlcm5hbHMvcmVxdWlyZS1vYmplY3QtY29lcmNpYmxlJyk7XG52YXIgYWR2YW5jZVN0cmluZ0luZGV4ID0gcmVxdWlyZSgnLi4vaW50ZXJuYWxzL2FkdmFuY2Utc3RyaW5nLWluZGV4Jyk7XG52YXIgZ2V0TWV0aG9kID0gcmVxdWlyZSgnLi4vaW50ZXJuYWxzL2dldC1tZXRob2QnKTtcbnZhciBnZXRTdWJzdGl0dXRpb24gPSByZXF1aXJlKCcuLi9pbnRlcm5hbHMvZ2V0LXN1YnN0aXR1dGlvbicpO1xudmFyIHJlZ0V4cEV4ZWMgPSByZXF1aXJlKCcuLi9pbnRlcm5hbHMvcmVnZXhwLWV4ZWMtYWJzdHJhY3QnKTtcbnZhciB3ZWxsS25vd25TeW1ib2wgPSByZXF1aXJlKCcuLi9pbnRlcm5hbHMvd2VsbC1rbm93bi1zeW1ib2wnKTtcblxudmFyIFJFUExBQ0UgPSB3ZWxsS25vd25TeW1ib2woJ3JlcGxhY2UnKTtcbnZhciBtYXggPSBNYXRoLm1heDtcbnZhciBtaW4gPSBNYXRoLm1pbjtcbnZhciBjb25jYXQgPSB1bmN1cnJ5VGhpcyhbXS5jb25jYXQpO1xudmFyIHB1c2ggPSB1bmN1cnJ5VGhpcyhbXS5wdXNoKTtcbnZhciBzdHJpbmdJbmRleE9mID0gdW5jdXJyeVRoaXMoJycuaW5kZXhPZik7XG52YXIgc3RyaW5nU2xpY2UgPSB1bmN1cnJ5VGhpcygnJy5zbGljZSk7XG5cbnZhciBtYXliZVRvU3RyaW5nID0gZnVuY3Rpb24gKGl0KSB7XG4gIHJldHVybiBpdCA9PT0gdW5kZWZpbmVkID8gaXQgOiBTdHJpbmcoaXQpO1xufTtcblxuLy8gSUUgPD0gMTEgcmVwbGFjZXMgJDAgd2l0aCB0aGUgd2hvbGUgbWF0Y2gsIGFzIGlmIGl0IHdhcyAkJlxuLy8gaHR0cHM6Ly9zdGFja292ZXJmbG93LmNvbS9xdWVzdGlvbnMvNjAyNDY2Ni9nZXR0aW5nLWllLXRvLXJlcGxhY2UtYS1yZWdleC13aXRoLXRoZS1saXRlcmFsLXN0cmluZy0wXG52YXIgUkVQTEFDRV9LRUVQU18kMCA9IChmdW5jdGlvbiAoKSB7XG4gIC8vIGVzbGludC1kaXNhYmxlLW5leHQtbGluZSByZWdleHAvcHJlZmVyLWVzY2FwZS1yZXBsYWNlbWVudC1kb2xsYXItY2hhciAtLSByZXF1aXJlZCBmb3IgdGVzdGluZ1xuICByZXR1cm4gJ2EnLnJlcGxhY2UoLy4vLCAnJDAnKSA9PT0gJyQwJztcbn0pKCk7XG5cbi8vIFNhZmFyaSA8PSAxMy4wLjMoPykgc3Vic3RpdHV0ZXMgbnRoIGNhcHR1cmUgd2hlcmUgbj5tIHdpdGggYW4gZW1wdHkgc3RyaW5nXG52YXIgUkVHRVhQX1JFUExBQ0VfU1VCU1RJVFVURVNfVU5ERUZJTkVEX0NBUFRVUkUgPSAoZnVuY3Rpb24gKCkge1xuICBpZiAoLy4vW1JFUExBQ0VdKSB7XG4gICAgcmV0dXJuIC8uL1tSRVBMQUNFXSgnYScsICckMCcpID09PSAnJztcbiAgfVxuICByZXR1cm4gZmFsc2U7XG59KSgpO1xuXG52YXIgUkVQTEFDRV9TVVBQT1JUU19OQU1FRF9HUk9VUFMgPSAhZmFpbHMoZnVuY3Rpb24gKCkge1xuICB2YXIgcmUgPSAvLi87XG4gIHJlLmV4ZWMgPSBmdW5jdGlvbiAoKSB7XG4gICAgdmFyIHJlc3VsdCA9IFtdO1xuICAgIHJlc3VsdC5ncm91cHMgPSB7IGE6ICc3JyB9O1xuICAgIHJldHVybiByZXN1bHQ7XG4gIH07XG4gIC8vIGVzbGludC1kaXNhYmxlLW5leHQtbGluZSByZWdleHAvbm8tdXNlbGVzcy1kb2xsYXItcmVwbGFjZW1lbnRzIC0tIGZhbHNlIHBvc2l0aXZlXG4gIHJldHVybiAnJy5yZXBsYWNlKHJlLCAnJDxhPicpICE9PSAnNyc7XG59KTtcblxuLy8gQEByZXBsYWNlIGxvZ2ljXG5maXhSZWdFeHBXZWxsS25vd25TeW1ib2xMb2dpYygncmVwbGFjZScsIGZ1bmN0aW9uIChfLCBuYXRpdmVSZXBsYWNlLCBtYXliZUNhbGxOYXRpdmUpIHtcbiAgdmFyIFVOU0FGRV9TVUJTVElUVVRFID0gUkVHRVhQX1JFUExBQ0VfU1VCU1RJVFVURVNfVU5ERUZJTkVEX0NBUFRVUkUgPyAnJCcgOiAnJDAnO1xuXG4gIHJldHVybiBbXG4gICAgLy8gYFN0cmluZy5wcm90b3R5cGUucmVwbGFjZWAgbWV0aG9kXG4gICAgLy8gaHR0cHM6Ly90YzM5LmVzL2VjbWEyNjIvI3NlYy1zdHJpbmcucHJvdG90eXBlLnJlcGxhY2VcbiAgICBmdW5jdGlvbiByZXBsYWNlKHNlYXJjaFZhbHVlLCByZXBsYWNlVmFsdWUpIHtcbiAgICAgIHZhciBPID0gcmVxdWlyZU9iamVjdENvZXJjaWJsZSh0aGlzKTtcbiAgICAgIHZhciByZXBsYWNlciA9IGlzTnVsbE9yVW5kZWZpbmVkKHNlYXJjaFZhbHVlKSA/IHVuZGVmaW5lZCA6IGdldE1ldGhvZChzZWFyY2hWYWx1ZSwgUkVQTEFDRSk7XG4gICAgICByZXR1cm4gcmVwbGFjZXJcbiAgICAgICAgPyBjYWxsKHJlcGxhY2VyLCBzZWFyY2hWYWx1ZSwgTywgcmVwbGFjZVZhbHVlKVxuICAgICAgICA6IGNhbGwobmF0aXZlUmVwbGFjZSwgdG9TdHJpbmcoTyksIHNlYXJjaFZhbHVlLCByZXBsYWNlVmFsdWUpO1xuICAgIH0sXG4gICAgLy8gYFJlZ0V4cC5wcm90b3R5cGVbQEByZXBsYWNlXWAgbWV0aG9kXG4gICAgLy8gaHR0cHM6Ly90YzM5LmVzL2VjbWEyNjIvI3NlYy1yZWdleHAucHJvdG90eXBlLUBAcmVwbGFjZVxuICAgIGZ1bmN0aW9uIChzdHJpbmcsIHJlcGxhY2VWYWx1ZSkge1xuICAgICAgdmFyIHJ4ID0gYW5PYmplY3QodGhpcyk7XG4gICAgICB2YXIgUyA9IHRvU3RyaW5nKHN0cmluZyk7XG5cbiAgICAgIGlmIChcbiAgICAgICAgdHlwZW9mIHJlcGxhY2VWYWx1ZSA9PSAnc3RyaW5nJyAmJlxuICAgICAgICBzdHJpbmdJbmRleE9mKHJlcGxhY2VWYWx1ZSwgVU5TQUZFX1NVQlNUSVRVVEUpID09PSAtMSAmJlxuICAgICAgICBzdHJpbmdJbmRleE9mKHJlcGxhY2VWYWx1ZSwgJyQ8JykgPT09IC0xXG4gICAgICApIHtcbiAgICAgICAgdmFyIHJlcyA9IG1heWJlQ2FsbE5hdGl2ZShuYXRpdmVSZXBsYWNlLCByeCwgUywgcmVwbGFjZVZhbHVlKTtcbiAgICAgICAgaWYgKHJlcy5kb25lKSByZXR1cm4gcmVzLnZhbHVlO1xuICAgICAgfVxuXG4gICAgICB2YXIgZnVuY3Rpb25hbFJlcGxhY2UgPSBpc0NhbGxhYmxlKHJlcGxhY2VWYWx1ZSk7XG4gICAgICBpZiAoIWZ1bmN0aW9uYWxSZXBsYWNlKSByZXBsYWNlVmFsdWUgPSB0b1N0cmluZyhyZXBsYWNlVmFsdWUpO1xuXG4gICAgICB2YXIgZ2xvYmFsID0gcnguZ2xvYmFsO1xuICAgICAgdmFyIGZ1bGxVbmljb2RlO1xuICAgICAgaWYgKGdsb2JhbCkge1xuICAgICAgICBmdWxsVW5pY29kZSA9IHJ4LnVuaWNvZGU7XG4gICAgICAgIHJ4Lmxhc3RJbmRleCA9IDA7XG4gICAgICB9XG5cbiAgICAgIHZhciByZXN1bHRzID0gW107XG4gICAgICB2YXIgcmVzdWx0O1xuICAgICAgd2hpbGUgKHRydWUpIHtcbiAgICAgICAgcmVzdWx0ID0gcmVnRXhwRXhlYyhyeCwgUyk7XG4gICAgICAgIGlmIChyZXN1bHQgPT09IG51bGwpIGJyZWFrO1xuXG4gICAgICAgIHB1c2gocmVzdWx0cywgcmVzdWx0KTtcbiAgICAgICAgaWYgKCFnbG9iYWwpIGJyZWFrO1xuXG4gICAgICAgIHZhciBtYXRjaFN0ciA9IHRvU3RyaW5nKHJlc3VsdFswXSk7XG4gICAgICAgIGlmIChtYXRjaFN0ciA9PT0gJycpIHJ4Lmxhc3RJbmRleCA9IGFkdmFuY2VTdHJpbmdJbmRleChTLCB0b0xlbmd0aChyeC5sYXN0SW5kZXgpLCBmdWxsVW5pY29kZSk7XG4gICAgICB9XG5cbiAgICAgIHZhciBhY2N1bXVsYXRlZFJlc3VsdCA9ICcnO1xuICAgICAgdmFyIG5leHRTb3VyY2VQb3NpdGlvbiA9IDA7XG4gICAgICBmb3IgKHZhciBpID0gMDsgaSA8IHJlc3VsdHMubGVuZ3RoOyBpKyspIHtcbiAgICAgICAgcmVzdWx0ID0gcmVzdWx0c1tpXTtcblxuICAgICAgICB2YXIgbWF0Y2hlZCA9IHRvU3RyaW5nKHJlc3VsdFswXSk7XG4gICAgICAgIHZhciBwb3NpdGlvbiA9IG1heChtaW4odG9JbnRlZ2VyT3JJbmZpbml0eShyZXN1bHQuaW5kZXgpLCBTLmxlbmd0aCksIDApO1xuICAgICAgICB2YXIgY2FwdHVyZXMgPSBbXTtcbiAgICAgICAgdmFyIHJlcGxhY2VtZW50O1xuICAgICAgICAvLyBOT1RFOiBUaGlzIGlzIGVxdWl2YWxlbnQgdG9cbiAgICAgICAgLy8gICBjYXB0dXJlcyA9IHJlc3VsdC5zbGljZSgxKS5tYXAobWF5YmVUb1N0cmluZylcbiAgICAgICAgLy8gYnV0IGZvciBzb21lIHJlYXNvbiBgbmF0aXZlU2xpY2UuY2FsbChyZXN1bHQsIDEsIHJlc3VsdC5sZW5ndGgpYCAoY2FsbGVkIGluXG4gICAgICAgIC8vIHRoZSBzbGljZSBwb2x5ZmlsbCB3aGVuIHNsaWNpbmcgbmF0aXZlIGFycmF5cykgXCJkb2Vzbid0IHdvcmtcIiBpbiBzYWZhcmkgOSBhbmRcbiAgICAgICAgLy8gY2F1c2VzIGEgY3Jhc2ggKGh0dHBzOi8vcGFzdGViaW4uY29tL04yMVF6ZVFBKSB3aGVuIHRyeWluZyB0byBkZWJ1ZyBpdC5cbiAgICAgICAgZm9yICh2YXIgaiA9IDE7IGogPCByZXN1bHQubGVuZ3RoOyBqKyspIHB1c2goY2FwdHVyZXMsIG1heWJlVG9TdHJpbmcocmVzdWx0W2pdKSk7XG4gICAgICAgIHZhciBuYW1lZENhcHR1cmVzID0gcmVzdWx0Lmdyb3VwcztcbiAgICAgICAgaWYgKGZ1bmN0aW9uYWxSZXBsYWNlKSB7XG4gICAgICAgICAgdmFyIHJlcGxhY2VyQXJncyA9IGNvbmNhdChbbWF0Y2hlZF0sIGNhcHR1cmVzLCBwb3NpdGlvbiwgUyk7XG4gICAgICAgICAgaWYgKG5hbWVkQ2FwdHVyZXMgIT09IHVuZGVmaW5lZCkgcHVzaChyZXBsYWNlckFyZ3MsIG5hbWVkQ2FwdHVyZXMpO1xuICAgICAgICAgIHJlcGxhY2VtZW50ID0gdG9TdHJpbmcoYXBwbHkocmVwbGFjZVZhbHVlLCB1bmRlZmluZWQsIHJlcGxhY2VyQXJncykpO1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgIHJlcGxhY2VtZW50ID0gZ2V0U3Vic3RpdHV0aW9uKG1hdGNoZWQsIFMsIHBvc2l0aW9uLCBjYXB0dXJlcywgbmFtZWRDYXB0dXJlcywgcmVwbGFjZVZhbHVlKTtcbiAgICAgICAgfVxuICAgICAgICBpZiAocG9zaXRpb24gPj0gbmV4dFNvdXJjZVBvc2l0aW9uKSB7XG4gICAgICAgICAgYWNjdW11bGF0ZWRSZXN1bHQgKz0gc3RyaW5nU2xpY2UoUywgbmV4dFNvdXJjZVBvc2l0aW9uLCBwb3NpdGlvbikgKyByZXBsYWNlbWVudDtcbiAgICAgICAgICBuZXh0U291cmNlUG9zaXRpb24gPSBwb3NpdGlvbiArIG1hdGNoZWQubGVuZ3RoO1xuICAgICAgICB9XG4gICAgICB9XG5cbiAgICAgIHJldHVybiBhY2N1bXVsYXRlZFJlc3VsdCArIHN0cmluZ1NsaWNlKFMsIG5leHRTb3VyY2VQb3NpdGlvbik7XG4gICAgfVxuICBdO1xufSwgIVJFUExBQ0VfU1VQUE9SVFNfTkFNRURfR1JPVVBTIHx8ICFSRVBMQUNFX0tFRVBTXyQwIHx8IFJFR0VYUF9SRVBMQUNFX1NVQlNUSVRVVEVTX1VOREVGSU5FRF9DQVBUVVJFKTtcbiIsIid1c2Ugc3RyaWN0Jztcbi8vIFRPRE86IFJlbW92ZSBmcm9tIGBjb3JlLWpzQDRgXG5yZXF1aXJlKCcuLi9tb2R1bGVzL2VzLnN0cmluZy5tYXRjaC1hbGwnKTtcbiIsIid1c2Ugc3RyaWN0Jztcbi8vIFRPRE86IFJlbW92ZSBmcm9tIGBjb3JlLWpzQDRgXG5yZXF1aXJlKCcuLi9tb2R1bGVzL2VzLnN0cmluZy5yZXBsYWNlLWFsbCcpO1xuIiwiJ3VzZSBzdHJpY3QnO1xuLy8gVE9ETzogaW4gY29yZS1qc0A0LCBtb3ZlIC9tb2R1bGVzLyBkZXBlbmRlbmNpZXMgdG8gcHVibGljIGVudHJpZXMgZm9yIGJldHRlciBvcHRpbWl6YXRpb24gYnkgdG9vbHMgbGlrZSBgcHJlc2V0LWVudmBcbnJlcXVpcmUoJy4uL21vZHVsZXMvZXMuYXJyYXkuaXRlcmF0b3InKTtcbnZhciAkID0gcmVxdWlyZSgnLi4vaW50ZXJuYWxzL2V4cG9ydCcpO1xudmFyIGdsb2JhbCA9IHJlcXVpcmUoJy4uL2ludGVybmFscy9nbG9iYWwnKTtcbnZhciBzYWZlR2V0QnVpbHRJbiA9IHJlcXVpcmUoJy4uL2ludGVybmFscy9zYWZlLWdldC1idWlsdC1pbicpO1xudmFyIGNhbGwgPSByZXF1aXJlKCcuLi9pbnRlcm5hbHMvZnVuY3Rpb24tY2FsbCcpO1xudmFyIHVuY3VycnlUaGlzID0gcmVxdWlyZSgnLi4vaW50ZXJuYWxzL2Z1bmN0aW9uLXVuY3VycnktdGhpcycpO1xudmFyIERFU0NSSVBUT1JTID0gcmVxdWlyZSgnLi4vaW50ZXJuYWxzL2Rlc2NyaXB0b3JzJyk7XG52YXIgVVNFX05BVElWRV9VUkwgPSByZXF1aXJlKCcuLi9pbnRlcm5hbHMvdXJsLWNvbnN0cnVjdG9yLWRldGVjdGlvbicpO1xudmFyIGRlZmluZUJ1aWx0SW4gPSByZXF1aXJlKCcuLi9pbnRlcm5hbHMvZGVmaW5lLWJ1aWx0LWluJyk7XG52YXIgZGVmaW5lQnVpbHRJbkFjY2Vzc29yID0gcmVxdWlyZSgnLi4vaW50ZXJuYWxzL2RlZmluZS1idWlsdC1pbi1hY2Nlc3NvcicpO1xudmFyIGRlZmluZUJ1aWx0SW5zID0gcmVxdWlyZSgnLi4vaW50ZXJuYWxzL2RlZmluZS1idWlsdC1pbnMnKTtcbnZhciBzZXRUb1N0cmluZ1RhZyA9IHJlcXVpcmUoJy4uL2ludGVybmFscy9zZXQtdG8tc3RyaW5nLXRhZycpO1xudmFyIGNyZWF0ZUl0ZXJhdG9yQ29uc3RydWN0b3IgPSByZXF1aXJlKCcuLi9pbnRlcm5hbHMvaXRlcmF0b3ItY3JlYXRlLWNvbnN0cnVjdG9yJyk7XG52YXIgSW50ZXJuYWxTdGF0ZU1vZHVsZSA9IHJlcXVpcmUoJy4uL2ludGVybmFscy9pbnRlcm5hbC1zdGF0ZScpO1xudmFyIGFuSW5zdGFuY2UgPSByZXF1aXJlKCcuLi9pbnRlcm5hbHMvYW4taW5zdGFuY2UnKTtcbnZhciBpc0NhbGxhYmxlID0gcmVxdWlyZSgnLi4vaW50ZXJuYWxzL2lzLWNhbGxhYmxlJyk7XG52YXIgaGFzT3duID0gcmVxdWlyZSgnLi4vaW50ZXJuYWxzL2hhcy1vd24tcHJvcGVydHknKTtcbnZhciBiaW5kID0gcmVxdWlyZSgnLi4vaW50ZXJuYWxzL2Z1bmN0aW9uLWJpbmQtY29udGV4dCcpO1xudmFyIGNsYXNzb2YgPSByZXF1aXJlKCcuLi9pbnRlcm5hbHMvY2xhc3NvZicpO1xudmFyIGFuT2JqZWN0ID0gcmVxdWlyZSgnLi4vaW50ZXJuYWxzL2FuLW9iamVjdCcpO1xudmFyIGlzT2JqZWN0ID0gcmVxdWlyZSgnLi4vaW50ZXJuYWxzL2lzLW9iamVjdCcpO1xudmFyICR0b1N0cmluZyA9IHJlcXVpcmUoJy4uL2ludGVybmFscy90by1zdHJpbmcnKTtcbnZhciBjcmVhdGUgPSByZXF1aXJlKCcuLi9pbnRlcm5hbHMvb2JqZWN0LWNyZWF0ZScpO1xudmFyIGNyZWF0ZVByb3BlcnR5RGVzY3JpcHRvciA9IHJlcXVpcmUoJy4uL2ludGVybmFscy9jcmVhdGUtcHJvcGVydHktZGVzY3JpcHRvcicpO1xudmFyIGdldEl0ZXJhdG9yID0gcmVxdWlyZSgnLi4vaW50ZXJuYWxzL2dldC1pdGVyYXRvcicpO1xudmFyIGdldEl0ZXJhdG9yTWV0aG9kID0gcmVxdWlyZSgnLi4vaW50ZXJuYWxzL2dldC1pdGVyYXRvci1tZXRob2QnKTtcbnZhciBjcmVhdGVJdGVyUmVzdWx0T2JqZWN0ID0gcmVxdWlyZSgnLi4vaW50ZXJuYWxzL2NyZWF0ZS1pdGVyLXJlc3VsdC1vYmplY3QnKTtcbnZhciB2YWxpZGF0ZUFyZ3VtZW50c0xlbmd0aCA9IHJlcXVpcmUoJy4uL2ludGVybmFscy92YWxpZGF0ZS1hcmd1bWVudHMtbGVuZ3RoJyk7XG52YXIgd2VsbEtub3duU3ltYm9sID0gcmVxdWlyZSgnLi4vaW50ZXJuYWxzL3dlbGwta25vd24tc3ltYm9sJyk7XG52YXIgYXJyYXlTb3J0ID0gcmVxdWlyZSgnLi4vaW50ZXJuYWxzL2FycmF5LXNvcnQnKTtcblxudmFyIElURVJBVE9SID0gd2VsbEtub3duU3ltYm9sKCdpdGVyYXRvcicpO1xudmFyIFVSTF9TRUFSQ0hfUEFSQU1TID0gJ1VSTFNlYXJjaFBhcmFtcyc7XG52YXIgVVJMX1NFQVJDSF9QQVJBTVNfSVRFUkFUT1IgPSBVUkxfU0VBUkNIX1BBUkFNUyArICdJdGVyYXRvcic7XG52YXIgc2V0SW50ZXJuYWxTdGF0ZSA9IEludGVybmFsU3RhdGVNb2R1bGUuc2V0O1xudmFyIGdldEludGVybmFsUGFyYW1zU3RhdGUgPSBJbnRlcm5hbFN0YXRlTW9kdWxlLmdldHRlckZvcihVUkxfU0VBUkNIX1BBUkFNUyk7XG52YXIgZ2V0SW50ZXJuYWxJdGVyYXRvclN0YXRlID0gSW50ZXJuYWxTdGF0ZU1vZHVsZS5nZXR0ZXJGb3IoVVJMX1NFQVJDSF9QQVJBTVNfSVRFUkFUT1IpO1xuXG52YXIgbmF0aXZlRmV0Y2ggPSBzYWZlR2V0QnVpbHRJbignZmV0Y2gnKTtcbnZhciBOYXRpdmVSZXF1ZXN0ID0gc2FmZUdldEJ1aWx0SW4oJ1JlcXVlc3QnKTtcbnZhciBIZWFkZXJzID0gc2FmZUdldEJ1aWx0SW4oJ0hlYWRlcnMnKTtcbnZhciBSZXF1ZXN0UHJvdG90eXBlID0gTmF0aXZlUmVxdWVzdCAmJiBOYXRpdmVSZXF1ZXN0LnByb3RvdHlwZTtcbnZhciBIZWFkZXJzUHJvdG90eXBlID0gSGVhZGVycyAmJiBIZWFkZXJzLnByb3RvdHlwZTtcbnZhciBSZWdFeHAgPSBnbG9iYWwuUmVnRXhwO1xudmFyIFR5cGVFcnJvciA9IGdsb2JhbC5UeXBlRXJyb3I7XG52YXIgZGVjb2RlVVJJQ29tcG9uZW50ID0gZ2xvYmFsLmRlY29kZVVSSUNvbXBvbmVudDtcbnZhciBlbmNvZGVVUklDb21wb25lbnQgPSBnbG9iYWwuZW5jb2RlVVJJQ29tcG9uZW50O1xudmFyIGNoYXJBdCA9IHVuY3VycnlUaGlzKCcnLmNoYXJBdCk7XG52YXIgam9pbiA9IHVuY3VycnlUaGlzKFtdLmpvaW4pO1xudmFyIHB1c2ggPSB1bmN1cnJ5VGhpcyhbXS5wdXNoKTtcbnZhciByZXBsYWNlID0gdW5jdXJyeVRoaXMoJycucmVwbGFjZSk7XG52YXIgc2hpZnQgPSB1bmN1cnJ5VGhpcyhbXS5zaGlmdCk7XG52YXIgc3BsaWNlID0gdW5jdXJyeVRoaXMoW10uc3BsaWNlKTtcbnZhciBzcGxpdCA9IHVuY3VycnlUaGlzKCcnLnNwbGl0KTtcbnZhciBzdHJpbmdTbGljZSA9IHVuY3VycnlUaGlzKCcnLnNsaWNlKTtcblxudmFyIHBsdXMgPSAvXFwrL2c7XG52YXIgc2VxdWVuY2VzID0gQXJyYXkoNCk7XG5cbnZhciBwZXJjZW50U2VxdWVuY2UgPSBmdW5jdGlvbiAoYnl0ZXMpIHtcbiAgcmV0dXJuIHNlcXVlbmNlc1tieXRlcyAtIDFdIHx8IChzZXF1ZW5jZXNbYnl0ZXMgLSAxXSA9IFJlZ0V4cCgnKCg/OiVbXFxcXGRhLWZdezJ9KXsnICsgYnl0ZXMgKyAnfSknLCAnZ2knKSk7XG59O1xuXG52YXIgcGVyY2VudERlY29kZSA9IGZ1bmN0aW9uIChzZXF1ZW5jZSkge1xuICB0cnkge1xuICAgIHJldHVybiBkZWNvZGVVUklDb21wb25lbnQoc2VxdWVuY2UpO1xuICB9IGNhdGNoIChlcnJvcikge1xuICAgIHJldHVybiBzZXF1ZW5jZTtcbiAgfVxufTtcblxudmFyIGRlc2VyaWFsaXplID0gZnVuY3Rpb24gKGl0KSB7XG4gIHZhciByZXN1bHQgPSByZXBsYWNlKGl0LCBwbHVzLCAnICcpO1xuICB2YXIgYnl0ZXMgPSA0O1xuICB0cnkge1xuICAgIHJldHVybiBkZWNvZGVVUklDb21wb25lbnQocmVzdWx0KTtcbiAgfSBjYXRjaCAoZXJyb3IpIHtcbiAgICB3aGlsZSAoYnl0ZXMpIHtcbiAgICAgIHJlc3VsdCA9IHJlcGxhY2UocmVzdWx0LCBwZXJjZW50U2VxdWVuY2UoYnl0ZXMtLSksIHBlcmNlbnREZWNvZGUpO1xuICAgIH1cbiAgICByZXR1cm4gcmVzdWx0O1xuICB9XG59O1xuXG52YXIgZmluZCA9IC9bIScoKX5dfCUyMC9nO1xuXG52YXIgcmVwbGFjZW1lbnRzID0ge1xuICAnISc6ICclMjEnLFxuICBcIidcIjogJyUyNycsXG4gICcoJzogJyUyOCcsXG4gICcpJzogJyUyOScsXG4gICd+JzogJyU3RScsXG4gICclMjAnOiAnKydcbn07XG5cbnZhciByZXBsYWNlciA9IGZ1bmN0aW9uIChtYXRjaCkge1xuICByZXR1cm4gcmVwbGFjZW1lbnRzW21hdGNoXTtcbn07XG5cbnZhciBzZXJpYWxpemUgPSBmdW5jdGlvbiAoaXQpIHtcbiAgcmV0dXJuIHJlcGxhY2UoZW5jb2RlVVJJQ29tcG9uZW50KGl0KSwgZmluZCwgcmVwbGFjZXIpO1xufTtcblxudmFyIFVSTFNlYXJjaFBhcmFtc0l0ZXJhdG9yID0gY3JlYXRlSXRlcmF0b3JDb25zdHJ1Y3RvcihmdW5jdGlvbiBJdGVyYXRvcihwYXJhbXMsIGtpbmQpIHtcbiAgc2V0SW50ZXJuYWxTdGF0ZSh0aGlzLCB7XG4gICAgdHlwZTogVVJMX1NFQVJDSF9QQVJBTVNfSVRFUkFUT1IsXG4gICAgdGFyZ2V0OiBnZXRJbnRlcm5hbFBhcmFtc1N0YXRlKHBhcmFtcykuZW50cmllcyxcbiAgICBpbmRleDogMCxcbiAgICBraW5kOiBraW5kXG4gIH0pO1xufSwgVVJMX1NFQVJDSF9QQVJBTVMsIGZ1bmN0aW9uIG5leHQoKSB7XG4gIHZhciBzdGF0ZSA9IGdldEludGVybmFsSXRlcmF0b3JTdGF0ZSh0aGlzKTtcbiAgdmFyIHRhcmdldCA9IHN0YXRlLnRhcmdldDtcbiAgdmFyIGluZGV4ID0gc3RhdGUuaW5kZXgrKztcbiAgaWYgKCF0YXJnZXQgfHwgaW5kZXggPj0gdGFyZ2V0Lmxlbmd0aCkge1xuICAgIHN0YXRlLnRhcmdldCA9IHVuZGVmaW5lZDtcbiAgICByZXR1cm4gY3JlYXRlSXRlclJlc3VsdE9iamVjdCh1bmRlZmluZWQsIHRydWUpO1xuICB9XG4gIHZhciBlbnRyeSA9IHRhcmdldFtpbmRleF07XG4gIHN3aXRjaCAoc3RhdGUua2luZCkge1xuICAgIGNhc2UgJ2tleXMnOiByZXR1cm4gY3JlYXRlSXRlclJlc3VsdE9iamVjdChlbnRyeS5rZXksIGZhbHNlKTtcbiAgICBjYXNlICd2YWx1ZXMnOiByZXR1cm4gY3JlYXRlSXRlclJlc3VsdE9iamVjdChlbnRyeS52YWx1ZSwgZmFsc2UpO1xuICB9IHJldHVybiBjcmVhdGVJdGVyUmVzdWx0T2JqZWN0KFtlbnRyeS5rZXksIGVudHJ5LnZhbHVlXSwgZmFsc2UpO1xufSwgdHJ1ZSk7XG5cbnZhciBVUkxTZWFyY2hQYXJhbXNTdGF0ZSA9IGZ1bmN0aW9uIChpbml0KSB7XG4gIHRoaXMuZW50cmllcyA9IFtdO1xuICB0aGlzLnVybCA9IG51bGw7XG5cbiAgaWYgKGluaXQgIT09IHVuZGVmaW5lZCkge1xuICAgIGlmIChpc09iamVjdChpbml0KSkgdGhpcy5wYXJzZU9iamVjdChpbml0KTtcbiAgICBlbHNlIHRoaXMucGFyc2VRdWVyeSh0eXBlb2YgaW5pdCA9PSAnc3RyaW5nJyA/IGNoYXJBdChpbml0LCAwKSA9PT0gJz8nID8gc3RyaW5nU2xpY2UoaW5pdCwgMSkgOiBpbml0IDogJHRvU3RyaW5nKGluaXQpKTtcbiAgfVxufTtcblxuVVJMU2VhcmNoUGFyYW1zU3RhdGUucHJvdG90eXBlID0ge1xuICB0eXBlOiBVUkxfU0VBUkNIX1BBUkFNUyxcbiAgYmluZFVSTDogZnVuY3Rpb24gKHVybCkge1xuICAgIHRoaXMudXJsID0gdXJsO1xuICAgIHRoaXMudXBkYXRlKCk7XG4gIH0sXG4gIHBhcnNlT2JqZWN0OiBmdW5jdGlvbiAob2JqZWN0KSB7XG4gICAgdmFyIGVudHJpZXMgPSB0aGlzLmVudHJpZXM7XG4gICAgdmFyIGl0ZXJhdG9yTWV0aG9kID0gZ2V0SXRlcmF0b3JNZXRob2Qob2JqZWN0KTtcbiAgICB2YXIgaXRlcmF0b3IsIG5leHQsIHN0ZXAsIGVudHJ5SXRlcmF0b3IsIGVudHJ5TmV4dCwgZmlyc3QsIHNlY29uZDtcblxuICAgIGlmIChpdGVyYXRvck1ldGhvZCkge1xuICAgICAgaXRlcmF0b3IgPSBnZXRJdGVyYXRvcihvYmplY3QsIGl0ZXJhdG9yTWV0aG9kKTtcbiAgICAgIG5leHQgPSBpdGVyYXRvci5uZXh0O1xuICAgICAgd2hpbGUgKCEoc3RlcCA9IGNhbGwobmV4dCwgaXRlcmF0b3IpKS5kb25lKSB7XG4gICAgICAgIGVudHJ5SXRlcmF0b3IgPSBnZXRJdGVyYXRvcihhbk9iamVjdChzdGVwLnZhbHVlKSk7XG4gICAgICAgIGVudHJ5TmV4dCA9IGVudHJ5SXRlcmF0b3IubmV4dDtcbiAgICAgICAgaWYgKFxuICAgICAgICAgIChmaXJzdCA9IGNhbGwoZW50cnlOZXh0LCBlbnRyeUl0ZXJhdG9yKSkuZG9uZSB8fFxuICAgICAgICAgIChzZWNvbmQgPSBjYWxsKGVudHJ5TmV4dCwgZW50cnlJdGVyYXRvcikpLmRvbmUgfHxcbiAgICAgICAgICAhY2FsbChlbnRyeU5leHQsIGVudHJ5SXRlcmF0b3IpLmRvbmVcbiAgICAgICAgKSB0aHJvdyBuZXcgVHlwZUVycm9yKCdFeHBlY3RlZCBzZXF1ZW5jZSB3aXRoIGxlbmd0aCAyJyk7XG4gICAgICAgIHB1c2goZW50cmllcywgeyBrZXk6ICR0b1N0cmluZyhmaXJzdC52YWx1ZSksIHZhbHVlOiAkdG9TdHJpbmcoc2Vjb25kLnZhbHVlKSB9KTtcbiAgICAgIH1cbiAgICB9IGVsc2UgZm9yICh2YXIga2V5IGluIG9iamVjdCkgaWYgKGhhc093bihvYmplY3QsIGtleSkpIHtcbiAgICAgIHB1c2goZW50cmllcywgeyBrZXk6IGtleSwgdmFsdWU6ICR0b1N0cmluZyhvYmplY3Rba2V5XSkgfSk7XG4gICAgfVxuICB9LFxuICBwYXJzZVF1ZXJ5OiBmdW5jdGlvbiAocXVlcnkpIHtcbiAgICBpZiAocXVlcnkpIHtcbiAgICAgIHZhciBlbnRyaWVzID0gdGhpcy5lbnRyaWVzO1xuICAgICAgdmFyIGF0dHJpYnV0ZXMgPSBzcGxpdChxdWVyeSwgJyYnKTtcbiAgICAgIHZhciBpbmRleCA9IDA7XG4gICAgICB2YXIgYXR0cmlidXRlLCBlbnRyeTtcbiAgICAgIHdoaWxlIChpbmRleCA8IGF0dHJpYnV0ZXMubGVuZ3RoKSB7XG4gICAgICAgIGF0dHJpYnV0ZSA9IGF0dHJpYnV0ZXNbaW5kZXgrK107XG4gICAgICAgIGlmIChhdHRyaWJ1dGUubGVuZ3RoKSB7XG4gICAgICAgICAgZW50cnkgPSBzcGxpdChhdHRyaWJ1dGUsICc9Jyk7XG4gICAgICAgICAgcHVzaChlbnRyaWVzLCB7XG4gICAgICAgICAgICBrZXk6IGRlc2VyaWFsaXplKHNoaWZ0KGVudHJ5KSksXG4gICAgICAgICAgICB2YWx1ZTogZGVzZXJpYWxpemUoam9pbihlbnRyeSwgJz0nKSlcbiAgICAgICAgICB9KTtcbiAgICAgICAgfVxuICAgICAgfVxuICAgIH1cbiAgfSxcbiAgc2VyaWFsaXplOiBmdW5jdGlvbiAoKSB7XG4gICAgdmFyIGVudHJpZXMgPSB0aGlzLmVudHJpZXM7XG4gICAgdmFyIHJlc3VsdCA9IFtdO1xuICAgIHZhciBpbmRleCA9IDA7XG4gICAgdmFyIGVudHJ5O1xuICAgIHdoaWxlIChpbmRleCA8IGVudHJpZXMubGVuZ3RoKSB7XG4gICAgICBlbnRyeSA9IGVudHJpZXNbaW5kZXgrK107XG4gICAgICBwdXNoKHJlc3VsdCwgc2VyaWFsaXplKGVudHJ5LmtleSkgKyAnPScgKyBzZXJpYWxpemUoZW50cnkudmFsdWUpKTtcbiAgICB9IHJldHVybiBqb2luKHJlc3VsdCwgJyYnKTtcbiAgfSxcbiAgdXBkYXRlOiBmdW5jdGlvbiAoKSB7XG4gICAgdGhpcy5lbnRyaWVzLmxlbmd0aCA9IDA7XG4gICAgdGhpcy5wYXJzZVF1ZXJ5KHRoaXMudXJsLnF1ZXJ5KTtcbiAgfSxcbiAgdXBkYXRlVVJMOiBmdW5jdGlvbiAoKSB7XG4gICAgaWYgKHRoaXMudXJsKSB0aGlzLnVybC51cGRhdGUoKTtcbiAgfVxufTtcblxuLy8gYFVSTFNlYXJjaFBhcmFtc2AgY29uc3RydWN0b3Jcbi8vIGh0dHBzOi8vdXJsLnNwZWMud2hhdHdnLm9yZy8jaW50ZXJmYWNlLXVybHNlYXJjaHBhcmFtc1xudmFyIFVSTFNlYXJjaFBhcmFtc0NvbnN0cnVjdG9yID0gZnVuY3Rpb24gVVJMU2VhcmNoUGFyYW1zKC8qIGluaXQgKi8pIHtcbiAgYW5JbnN0YW5jZSh0aGlzLCBVUkxTZWFyY2hQYXJhbXNQcm90b3R5cGUpO1xuICB2YXIgaW5pdCA9IGFyZ3VtZW50cy5sZW5ndGggPiAwID8gYXJndW1lbnRzWzBdIDogdW5kZWZpbmVkO1xuICB2YXIgc3RhdGUgPSBzZXRJbnRlcm5hbFN0YXRlKHRoaXMsIG5ldyBVUkxTZWFyY2hQYXJhbXNTdGF0ZShpbml0KSk7XG4gIGlmICghREVTQ1JJUFRPUlMpIHRoaXMuc2l6ZSA9IHN0YXRlLmVudHJpZXMubGVuZ3RoO1xufTtcblxudmFyIFVSTFNlYXJjaFBhcmFtc1Byb3RvdHlwZSA9IFVSTFNlYXJjaFBhcmFtc0NvbnN0cnVjdG9yLnByb3RvdHlwZTtcblxuZGVmaW5lQnVpbHRJbnMoVVJMU2VhcmNoUGFyYW1zUHJvdG90eXBlLCB7XG4gIC8vIGBVUkxTZWFyY2hQYXJhbXMucHJvdG90eXBlLmFwcGVuZGAgbWV0aG9kXG4gIC8vIGh0dHBzOi8vdXJsLnNwZWMud2hhdHdnLm9yZy8jZG9tLXVybHNlYXJjaHBhcmFtcy1hcHBlbmRcbiAgYXBwZW5kOiBmdW5jdGlvbiBhcHBlbmQobmFtZSwgdmFsdWUpIHtcbiAgICB2YXIgc3RhdGUgPSBnZXRJbnRlcm5hbFBhcmFtc1N0YXRlKHRoaXMpO1xuICAgIHZhbGlkYXRlQXJndW1lbnRzTGVuZ3RoKGFyZ3VtZW50cy5sZW5ndGgsIDIpO1xuICAgIHB1c2goc3RhdGUuZW50cmllcywgeyBrZXk6ICR0b1N0cmluZyhuYW1lKSwgdmFsdWU6ICR0b1N0cmluZyh2YWx1ZSkgfSk7XG4gICAgaWYgKCFERVNDUklQVE9SUykgdGhpcy5sZW5ndGgrKztcbiAgICBzdGF0ZS51cGRhdGVVUkwoKTtcbiAgfSxcbiAgLy8gYFVSTFNlYXJjaFBhcmFtcy5wcm90b3R5cGUuZGVsZXRlYCBtZXRob2RcbiAgLy8gaHR0cHM6Ly91cmwuc3BlYy53aGF0d2cub3JnLyNkb20tdXJsc2VhcmNocGFyYW1zLWRlbGV0ZVxuICAnZGVsZXRlJzogZnVuY3Rpb24gKG5hbWUgLyogLCB2YWx1ZSAqLykge1xuICAgIHZhciBzdGF0ZSA9IGdldEludGVybmFsUGFyYW1zU3RhdGUodGhpcyk7XG4gICAgdmFyIGxlbmd0aCA9IHZhbGlkYXRlQXJndW1lbnRzTGVuZ3RoKGFyZ3VtZW50cy5sZW5ndGgsIDEpO1xuICAgIHZhciBlbnRyaWVzID0gc3RhdGUuZW50cmllcztcbiAgICB2YXIga2V5ID0gJHRvU3RyaW5nKG5hbWUpO1xuICAgIHZhciAkdmFsdWUgPSBsZW5ndGggPCAyID8gdW5kZWZpbmVkIDogYXJndW1lbnRzWzFdO1xuICAgIHZhciB2YWx1ZSA9ICR2YWx1ZSA9PT0gdW5kZWZpbmVkID8gJHZhbHVlIDogJHRvU3RyaW5nKCR2YWx1ZSk7XG4gICAgdmFyIGluZGV4ID0gMDtcbiAgICB3aGlsZSAoaW5kZXggPCBlbnRyaWVzLmxlbmd0aCkge1xuICAgICAgdmFyIGVudHJ5ID0gZW50cmllc1tpbmRleF07XG4gICAgICBpZiAoZW50cnkua2V5ID09PSBrZXkgJiYgKHZhbHVlID09PSB1bmRlZmluZWQgfHwgZW50cnkudmFsdWUgPT09IHZhbHVlKSkge1xuICAgICAgICBzcGxpY2UoZW50cmllcywgaW5kZXgsIDEpO1xuICAgICAgICBpZiAodmFsdWUgIT09IHVuZGVmaW5lZCkgYnJlYWs7XG4gICAgICB9IGVsc2UgaW5kZXgrKztcbiAgICB9XG4gICAgaWYgKCFERVNDUklQVE9SUykgdGhpcy5zaXplID0gZW50cmllcy5sZW5ndGg7XG4gICAgc3RhdGUudXBkYXRlVVJMKCk7XG4gIH0sXG4gIC8vIGBVUkxTZWFyY2hQYXJhbXMucHJvdG90eXBlLmdldGAgbWV0aG9kXG4gIC8vIGh0dHBzOi8vdXJsLnNwZWMud2hhdHdnLm9yZy8jZG9tLXVybHNlYXJjaHBhcmFtcy1nZXRcbiAgZ2V0OiBmdW5jdGlvbiBnZXQobmFtZSkge1xuICAgIHZhciBlbnRyaWVzID0gZ2V0SW50ZXJuYWxQYXJhbXNTdGF0ZSh0aGlzKS5lbnRyaWVzO1xuICAgIHZhbGlkYXRlQXJndW1lbnRzTGVuZ3RoKGFyZ3VtZW50cy5sZW5ndGgsIDEpO1xuICAgIHZhciBrZXkgPSAkdG9TdHJpbmcobmFtZSk7XG4gICAgdmFyIGluZGV4ID0gMDtcbiAgICBmb3IgKDsgaW5kZXggPCBlbnRyaWVzLmxlbmd0aDsgaW5kZXgrKykge1xuICAgICAgaWYgKGVudHJpZXNbaW5kZXhdLmtleSA9PT0ga2V5KSByZXR1cm4gZW50cmllc1tpbmRleF0udmFsdWU7XG4gICAgfVxuICAgIHJldHVybiBudWxsO1xuICB9LFxuICAvLyBgVVJMU2VhcmNoUGFyYW1zLnByb3RvdHlwZS5nZXRBbGxgIG1ldGhvZFxuICAvLyBodHRwczovL3VybC5zcGVjLndoYXR3Zy5vcmcvI2RvbS11cmxzZWFyY2hwYXJhbXMtZ2V0YWxsXG4gIGdldEFsbDogZnVuY3Rpb24gZ2V0QWxsKG5hbWUpIHtcbiAgICB2YXIgZW50cmllcyA9IGdldEludGVybmFsUGFyYW1zU3RhdGUodGhpcykuZW50cmllcztcbiAgICB2YWxpZGF0ZUFyZ3VtZW50c0xlbmd0aChhcmd1bWVudHMubGVuZ3RoLCAxKTtcbiAgICB2YXIga2V5ID0gJHRvU3RyaW5nKG5hbWUpO1xuICAgIHZhciByZXN1bHQgPSBbXTtcbiAgICB2YXIgaW5kZXggPSAwO1xuICAgIGZvciAoOyBpbmRleCA8IGVudHJpZXMubGVuZ3RoOyBpbmRleCsrKSB7XG4gICAgICBpZiAoZW50cmllc1tpbmRleF0ua2V5ID09PSBrZXkpIHB1c2gocmVzdWx0LCBlbnRyaWVzW2luZGV4XS52YWx1ZSk7XG4gICAgfVxuICAgIHJldHVybiByZXN1bHQ7XG4gIH0sXG4gIC8vIGBVUkxTZWFyY2hQYXJhbXMucHJvdG90eXBlLmhhc2AgbWV0aG9kXG4gIC8vIGh0dHBzOi8vdXJsLnNwZWMud2hhdHdnLm9yZy8jZG9tLXVybHNlYXJjaHBhcmFtcy1oYXNcbiAgaGFzOiBmdW5jdGlvbiBoYXMobmFtZSAvKiAsIHZhbHVlICovKSB7XG4gICAgdmFyIGVudHJpZXMgPSBnZXRJbnRlcm5hbFBhcmFtc1N0YXRlKHRoaXMpLmVudHJpZXM7XG4gICAgdmFyIGxlbmd0aCA9IHZhbGlkYXRlQXJndW1lbnRzTGVuZ3RoKGFyZ3VtZW50cy5sZW5ndGgsIDEpO1xuICAgIHZhciBrZXkgPSAkdG9TdHJpbmcobmFtZSk7XG4gICAgdmFyICR2YWx1ZSA9IGxlbmd0aCA8IDIgPyB1bmRlZmluZWQgOiBhcmd1bWVudHNbMV07XG4gICAgdmFyIHZhbHVlID0gJHZhbHVlID09PSB1bmRlZmluZWQgPyAkdmFsdWUgOiAkdG9TdHJpbmcoJHZhbHVlKTtcbiAgICB2YXIgaW5kZXggPSAwO1xuICAgIHdoaWxlIChpbmRleCA8IGVudHJpZXMubGVuZ3RoKSB7XG4gICAgICB2YXIgZW50cnkgPSBlbnRyaWVzW2luZGV4KytdO1xuICAgICAgaWYgKGVudHJ5LmtleSA9PT0ga2V5ICYmICh2YWx1ZSA9PT0gdW5kZWZpbmVkIHx8IGVudHJ5LnZhbHVlID09PSB2YWx1ZSkpIHJldHVybiB0cnVlO1xuICAgIH1cbiAgICByZXR1cm4gZmFsc2U7XG4gIH0sXG4gIC8vIGBVUkxTZWFyY2hQYXJhbXMucHJvdG90eXBlLnNldGAgbWV0aG9kXG4gIC8vIGh0dHBzOi8vdXJsLnNwZWMud2hhdHdnLm9yZy8jZG9tLXVybHNlYXJjaHBhcmFtcy1zZXRcbiAgc2V0OiBmdW5jdGlvbiBzZXQobmFtZSwgdmFsdWUpIHtcbiAgICB2YXIgc3RhdGUgPSBnZXRJbnRlcm5hbFBhcmFtc1N0YXRlKHRoaXMpO1xuICAgIHZhbGlkYXRlQXJndW1lbnRzTGVuZ3RoKGFyZ3VtZW50cy5sZW5ndGgsIDEpO1xuICAgIHZhciBlbnRyaWVzID0gc3RhdGUuZW50cmllcztcbiAgICB2YXIgZm91bmQgPSBmYWxzZTtcbiAgICB2YXIga2V5ID0gJHRvU3RyaW5nKG5hbWUpO1xuICAgIHZhciB2YWwgPSAkdG9TdHJpbmcodmFsdWUpO1xuICAgIHZhciBpbmRleCA9IDA7XG4gICAgdmFyIGVudHJ5O1xuICAgIGZvciAoOyBpbmRleCA8IGVudHJpZXMubGVuZ3RoOyBpbmRleCsrKSB7XG4gICAgICBlbnRyeSA9IGVudHJpZXNbaW5kZXhdO1xuICAgICAgaWYgKGVudHJ5LmtleSA9PT0ga2V5KSB7XG4gICAgICAgIGlmIChmb3VuZCkgc3BsaWNlKGVudHJpZXMsIGluZGV4LS0sIDEpO1xuICAgICAgICBlbHNlIHtcbiAgICAgICAgICBmb3VuZCA9IHRydWU7XG4gICAgICAgICAgZW50cnkudmFsdWUgPSB2YWw7XG4gICAgICAgIH1cbiAgICAgIH1cbiAgICB9XG4gICAgaWYgKCFmb3VuZCkgcHVzaChlbnRyaWVzLCB7IGtleToga2V5LCB2YWx1ZTogdmFsIH0pO1xuICAgIGlmICghREVTQ1JJUFRPUlMpIHRoaXMuc2l6ZSA9IGVudHJpZXMubGVuZ3RoO1xuICAgIHN0YXRlLnVwZGF0ZVVSTCgpO1xuICB9LFxuICAvLyBgVVJMU2VhcmNoUGFyYW1zLnByb3RvdHlwZS5zb3J0YCBtZXRob2RcbiAgLy8gaHR0cHM6Ly91cmwuc3BlYy53aGF0d2cub3JnLyNkb20tdXJsc2VhcmNocGFyYW1zLXNvcnRcbiAgc29ydDogZnVuY3Rpb24gc29ydCgpIHtcbiAgICB2YXIgc3RhdGUgPSBnZXRJbnRlcm5hbFBhcmFtc1N0YXRlKHRoaXMpO1xuICAgIGFycmF5U29ydChzdGF0ZS5lbnRyaWVzLCBmdW5jdGlvbiAoYSwgYikge1xuICAgICAgcmV0dXJuIGEua2V5ID4gYi5rZXkgPyAxIDogLTE7XG4gICAgfSk7XG4gICAgc3RhdGUudXBkYXRlVVJMKCk7XG4gIH0sXG4gIC8vIGBVUkxTZWFyY2hQYXJhbXMucHJvdG90eXBlLmZvckVhY2hgIG1ldGhvZFxuICBmb3JFYWNoOiBmdW5jdGlvbiBmb3JFYWNoKGNhbGxiYWNrIC8qICwgdGhpc0FyZyAqLykge1xuICAgIHZhciBlbnRyaWVzID0gZ2V0SW50ZXJuYWxQYXJhbXNTdGF0ZSh0aGlzKS5lbnRyaWVzO1xuICAgIHZhciBib3VuZEZ1bmN0aW9uID0gYmluZChjYWxsYmFjaywgYXJndW1lbnRzLmxlbmd0aCA+IDEgPyBhcmd1bWVudHNbMV0gOiB1bmRlZmluZWQpO1xuICAgIHZhciBpbmRleCA9IDA7XG4gICAgdmFyIGVudHJ5O1xuICAgIHdoaWxlIChpbmRleCA8IGVudHJpZXMubGVuZ3RoKSB7XG4gICAgICBlbnRyeSA9IGVudHJpZXNbaW5kZXgrK107XG4gICAgICBib3VuZEZ1bmN0aW9uKGVudHJ5LnZhbHVlLCBlbnRyeS5rZXksIHRoaXMpO1xuICAgIH1cbiAgfSxcbiAgLy8gYFVSTFNlYXJjaFBhcmFtcy5wcm90b3R5cGUua2V5c2AgbWV0aG9kXG4gIGtleXM6IGZ1bmN0aW9uIGtleXMoKSB7XG4gICAgcmV0dXJuIG5ldyBVUkxTZWFyY2hQYXJhbXNJdGVyYXRvcih0aGlzLCAna2V5cycpO1xuICB9LFxuICAvLyBgVVJMU2VhcmNoUGFyYW1zLnByb3RvdHlwZS52YWx1ZXNgIG1ldGhvZFxuICB2YWx1ZXM6IGZ1bmN0aW9uIHZhbHVlcygpIHtcbiAgICByZXR1cm4gbmV3IFVSTFNlYXJjaFBhcmFtc0l0ZXJhdG9yKHRoaXMsICd2YWx1ZXMnKTtcbiAgfSxcbiAgLy8gYFVSTFNlYXJjaFBhcmFtcy5wcm90b3R5cGUuZW50cmllc2AgbWV0aG9kXG4gIGVudHJpZXM6IGZ1bmN0aW9uIGVudHJpZXMoKSB7XG4gICAgcmV0dXJuIG5ldyBVUkxTZWFyY2hQYXJhbXNJdGVyYXRvcih0aGlzLCAnZW50cmllcycpO1xuICB9XG59LCB7IGVudW1lcmFibGU6IHRydWUgfSk7XG5cbi8vIGBVUkxTZWFyY2hQYXJhbXMucHJvdG90eXBlW0BAaXRlcmF0b3JdYCBtZXRob2RcbmRlZmluZUJ1aWx0SW4oVVJMU2VhcmNoUGFyYW1zUHJvdG90eXBlLCBJVEVSQVRPUiwgVVJMU2VhcmNoUGFyYW1zUHJvdG90eXBlLmVudHJpZXMsIHsgbmFtZTogJ2VudHJpZXMnIH0pO1xuXG4vLyBgVVJMU2VhcmNoUGFyYW1zLnByb3RvdHlwZS50b1N0cmluZ2AgbWV0aG9kXG4vLyBodHRwczovL3VybC5zcGVjLndoYXR3Zy5vcmcvI3VybHNlYXJjaHBhcmFtcy1zdHJpbmdpZmljYXRpb24tYmVoYXZpb3JcbmRlZmluZUJ1aWx0SW4oVVJMU2VhcmNoUGFyYW1zUHJvdG90eXBlLCAndG9TdHJpbmcnLCBmdW5jdGlvbiB0b1N0cmluZygpIHtcbiAgcmV0dXJuIGdldEludGVybmFsUGFyYW1zU3RhdGUodGhpcykuc2VyaWFsaXplKCk7XG59LCB7IGVudW1lcmFibGU6IHRydWUgfSk7XG5cbi8vIGBVUkxTZWFyY2hQYXJhbXMucHJvdG90eXBlLnNpemVgIGdldHRlclxuLy8gaHR0cHM6Ly9naXRodWIuY29tL3doYXR3Zy91cmwvcHVsbC83MzRcbmlmIChERVNDUklQVE9SUykgZGVmaW5lQnVpbHRJbkFjY2Vzc29yKFVSTFNlYXJjaFBhcmFtc1Byb3RvdHlwZSwgJ3NpemUnLCB7XG4gIGdldDogZnVuY3Rpb24gc2l6ZSgpIHtcbiAgICByZXR1cm4gZ2V0SW50ZXJuYWxQYXJhbXNTdGF0ZSh0aGlzKS5lbnRyaWVzLmxlbmd0aDtcbiAgfSxcbiAgY29uZmlndXJhYmxlOiB0cnVlLFxuICBlbnVtZXJhYmxlOiB0cnVlXG59KTtcblxuc2V0VG9TdHJpbmdUYWcoVVJMU2VhcmNoUGFyYW1zQ29uc3RydWN0b3IsIFVSTF9TRUFSQ0hfUEFSQU1TKTtcblxuJCh7IGdsb2JhbDogdHJ1ZSwgY29uc3RydWN0b3I6IHRydWUsIGZvcmNlZDogIVVTRV9OQVRJVkVfVVJMIH0sIHtcbiAgVVJMU2VhcmNoUGFyYW1zOiBVUkxTZWFyY2hQYXJhbXNDb25zdHJ1Y3RvclxufSk7XG5cbi8vIFdyYXAgYGZldGNoYCBhbmQgYFJlcXVlc3RgIGZvciBjb3JyZWN0IHdvcmsgd2l0aCBwb2x5ZmlsbGVkIGBVUkxTZWFyY2hQYXJhbXNgXG5pZiAoIVVTRV9OQVRJVkVfVVJMICYmIGlzQ2FsbGFibGUoSGVhZGVycykpIHtcbiAgdmFyIGhlYWRlcnNIYXMgPSB1bmN1cnJ5VGhpcyhIZWFkZXJzUHJvdG90eXBlLmhhcyk7XG4gIHZhciBoZWFkZXJzU2V0ID0gdW5jdXJyeVRoaXMoSGVhZGVyc1Byb3RvdHlwZS5zZXQpO1xuXG4gIHZhciB3cmFwUmVxdWVzdE9wdGlvbnMgPSBmdW5jdGlvbiAoaW5pdCkge1xuICAgIGlmIChpc09iamVjdChpbml0KSkge1xuICAgICAgdmFyIGJvZHkgPSBpbml0LmJvZHk7XG4gICAgICB2YXIgaGVhZGVycztcbiAgICAgIGlmIChjbGFzc29mKGJvZHkpID09PSBVUkxfU0VBUkNIX1BBUkFNUykge1xuICAgICAgICBoZWFkZXJzID0gaW5pdC5oZWFkZXJzID8gbmV3IEhlYWRlcnMoaW5pdC5oZWFkZXJzKSA6IG5ldyBIZWFkZXJzKCk7XG4gICAgICAgIGlmICghaGVhZGVyc0hhcyhoZWFkZXJzLCAnY29udGVudC10eXBlJykpIHtcbiAgICAgICAgICBoZWFkZXJzU2V0KGhlYWRlcnMsICdjb250ZW50LXR5cGUnLCAnYXBwbGljYXRpb24veC13d3ctZm9ybS11cmxlbmNvZGVkO2NoYXJzZXQ9VVRGLTgnKTtcbiAgICAgICAgfVxuICAgICAgICByZXR1cm4gY3JlYXRlKGluaXQsIHtcbiAgICAgICAgICBib2R5OiBjcmVhdGVQcm9wZXJ0eURlc2NyaXB0b3IoMCwgJHRvU3RyaW5nKGJvZHkpKSxcbiAgICAgICAgICBoZWFkZXJzOiBjcmVhdGVQcm9wZXJ0eURlc2NyaXB0b3IoMCwgaGVhZGVycylcbiAgICAgICAgfSk7XG4gICAgICB9XG4gICAgfSByZXR1cm4gaW5pdDtcbiAgfTtcblxuICBpZiAoaXNDYWxsYWJsZShuYXRpdmVGZXRjaCkpIHtcbiAgICAkKHsgZ2xvYmFsOiB0cnVlLCBlbnVtZXJhYmxlOiB0cnVlLCBkb250Q2FsbEdldFNldDogdHJ1ZSwgZm9yY2VkOiB0cnVlIH0sIHtcbiAgICAgIGZldGNoOiBmdW5jdGlvbiBmZXRjaChpbnB1dCAvKiAsIGluaXQgKi8pIHtcbiAgICAgICAgcmV0dXJuIG5hdGl2ZUZldGNoKGlucHV0LCBhcmd1bWVudHMubGVuZ3RoID4gMSA/IHdyYXBSZXF1ZXN0T3B0aW9ucyhhcmd1bWVudHNbMV0pIDoge30pO1xuICAgICAgfVxuICAgIH0pO1xuICB9XG5cbiAgaWYgKGlzQ2FsbGFibGUoTmF0aXZlUmVxdWVzdCkpIHtcbiAgICB2YXIgUmVxdWVzdENvbnN0cnVjdG9yID0gZnVuY3Rpb24gUmVxdWVzdChpbnB1dCAvKiAsIGluaXQgKi8pIHtcbiAgICAgIGFuSW5zdGFuY2UodGhpcywgUmVxdWVzdFByb3RvdHlwZSk7XG4gICAgICByZXR1cm4gbmV3IE5hdGl2ZVJlcXVlc3QoaW5wdXQsIGFyZ3VtZW50cy5sZW5ndGggPiAxID8gd3JhcFJlcXVlc3RPcHRpb25zKGFyZ3VtZW50c1sxXSkgOiB7fSk7XG4gICAgfTtcblxuICAgIFJlcXVlc3RQcm90b3R5cGUuY29uc3RydWN0b3IgPSBSZXF1ZXN0Q29uc3RydWN0b3I7XG4gICAgUmVxdWVzdENvbnN0cnVjdG9yLnByb3RvdHlwZSA9IFJlcXVlc3RQcm90b3R5cGU7XG5cbiAgICAkKHsgZ2xvYmFsOiB0cnVlLCBjb25zdHJ1Y3RvcjogdHJ1ZSwgZG9udENhbGxHZXRTZXQ6IHRydWUsIGZvcmNlZDogdHJ1ZSB9LCB7XG4gICAgICBSZXF1ZXN0OiBSZXF1ZXN0Q29uc3RydWN0b3JcbiAgICB9KTtcbiAgfVxufVxuXG5tb2R1bGUuZXhwb3J0cyA9IHtcbiAgVVJMU2VhcmNoUGFyYW1zOiBVUkxTZWFyY2hQYXJhbXNDb25zdHJ1Y3RvcixcbiAgZ2V0U3RhdGU6IGdldEludGVybmFsUGFyYW1zU3RhdGVcbn07XG4iLCIndXNlIHN0cmljdCc7XG4vLyBUT0RPOiBSZW1vdmUgdGhpcyBtb2R1bGUgZnJvbSBgY29yZS1qc0A0YCBzaW5jZSBpdCdzIHJlcGxhY2VkIHRvIG1vZHVsZSBiZWxvd1xucmVxdWlyZSgnLi4vbW9kdWxlcy93ZWIudXJsLXNlYXJjaC1wYXJhbXMuY29uc3RydWN0b3InKTtcbiIsIid1c2Ugc3RyaWN0Jztcbi8vIFRPRE86IGluIGNvcmUtanNANCwgbW92ZSAvbW9kdWxlcy8gZGVwZW5kZW5jaWVzIHRvIHB1YmxpYyBlbnRyaWVzIGZvciBiZXR0ZXIgb3B0aW1pemF0aW9uIGJ5IHRvb2xzIGxpa2UgYHByZXNldC1lbnZgXG5yZXF1aXJlKCcuLi9tb2R1bGVzL2VzLnN0cmluZy5pdGVyYXRvcicpO1xudmFyICQgPSByZXF1aXJlKCcuLi9pbnRlcm5hbHMvZXhwb3J0Jyk7XG52YXIgREVTQ1JJUFRPUlMgPSByZXF1aXJlKCcuLi9pbnRlcm5hbHMvZGVzY3JpcHRvcnMnKTtcbnZhciBVU0VfTkFUSVZFX1VSTCA9IHJlcXVpcmUoJy4uL2ludGVybmFscy91cmwtY29uc3RydWN0b3ItZGV0ZWN0aW9uJyk7XG52YXIgZ2xvYmFsID0gcmVxdWlyZSgnLi4vaW50ZXJuYWxzL2dsb2JhbCcpO1xudmFyIGJpbmQgPSByZXF1aXJlKCcuLi9pbnRlcm5hbHMvZnVuY3Rpb24tYmluZC1jb250ZXh0Jyk7XG52YXIgdW5jdXJyeVRoaXMgPSByZXF1aXJlKCcuLi9pbnRlcm5hbHMvZnVuY3Rpb24tdW5jdXJyeS10aGlzJyk7XG52YXIgZGVmaW5lQnVpbHRJbiA9IHJlcXVpcmUoJy4uL2ludGVybmFscy9kZWZpbmUtYnVpbHQtaW4nKTtcbnZhciBkZWZpbmVCdWlsdEluQWNjZXNzb3IgPSByZXF1aXJlKCcuLi9pbnRlcm5hbHMvZGVmaW5lLWJ1aWx0LWluLWFjY2Vzc29yJyk7XG52YXIgYW5JbnN0YW5jZSA9IHJlcXVpcmUoJy4uL2ludGVybmFscy9hbi1pbnN0YW5jZScpO1xudmFyIGhhc093biA9IHJlcXVpcmUoJy4uL2ludGVybmFscy9oYXMtb3duLXByb3BlcnR5Jyk7XG52YXIgYXNzaWduID0gcmVxdWlyZSgnLi4vaW50ZXJuYWxzL29iamVjdC1hc3NpZ24nKTtcbnZhciBhcnJheUZyb20gPSByZXF1aXJlKCcuLi9pbnRlcm5hbHMvYXJyYXktZnJvbScpO1xudmFyIGFycmF5U2xpY2UgPSByZXF1aXJlKCcuLi9pbnRlcm5hbHMvYXJyYXktc2xpY2UnKTtcbnZhciBjb2RlQXQgPSByZXF1aXJlKCcuLi9pbnRlcm5hbHMvc3RyaW5nLW11bHRpYnl0ZScpLmNvZGVBdDtcbnZhciB0b0FTQ0lJID0gcmVxdWlyZSgnLi4vaW50ZXJuYWxzL3N0cmluZy1wdW55Y29kZS10by1hc2NpaScpO1xudmFyICR0b1N0cmluZyA9IHJlcXVpcmUoJy4uL2ludGVybmFscy90by1zdHJpbmcnKTtcbnZhciBzZXRUb1N0cmluZ1RhZyA9IHJlcXVpcmUoJy4uL2ludGVybmFscy9zZXQtdG8tc3RyaW5nLXRhZycpO1xudmFyIHZhbGlkYXRlQXJndW1lbnRzTGVuZ3RoID0gcmVxdWlyZSgnLi4vaW50ZXJuYWxzL3ZhbGlkYXRlLWFyZ3VtZW50cy1sZW5ndGgnKTtcbnZhciBVUkxTZWFyY2hQYXJhbXNNb2R1bGUgPSByZXF1aXJlKCcuLi9tb2R1bGVzL3dlYi51cmwtc2VhcmNoLXBhcmFtcy5jb25zdHJ1Y3RvcicpO1xudmFyIEludGVybmFsU3RhdGVNb2R1bGUgPSByZXF1aXJlKCcuLi9pbnRlcm5hbHMvaW50ZXJuYWwtc3RhdGUnKTtcblxudmFyIHNldEludGVybmFsU3RhdGUgPSBJbnRlcm5hbFN0YXRlTW9kdWxlLnNldDtcbnZhciBnZXRJbnRlcm5hbFVSTFN0YXRlID0gSW50ZXJuYWxTdGF0ZU1vZHVsZS5nZXR0ZXJGb3IoJ1VSTCcpO1xudmFyIFVSTFNlYXJjaFBhcmFtcyA9IFVSTFNlYXJjaFBhcmFtc01vZHVsZS5VUkxTZWFyY2hQYXJhbXM7XG52YXIgZ2V0SW50ZXJuYWxTZWFyY2hQYXJhbXNTdGF0ZSA9IFVSTFNlYXJjaFBhcmFtc01vZHVsZS5nZXRTdGF0ZTtcblxudmFyIE5hdGl2ZVVSTCA9IGdsb2JhbC5VUkw7XG52YXIgVHlwZUVycm9yID0gZ2xvYmFsLlR5cGVFcnJvcjtcbnZhciBwYXJzZUludCA9IGdsb2JhbC5wYXJzZUludDtcbnZhciBmbG9vciA9IE1hdGguZmxvb3I7XG52YXIgcG93ID0gTWF0aC5wb3c7XG52YXIgY2hhckF0ID0gdW5jdXJyeVRoaXMoJycuY2hhckF0KTtcbnZhciBleGVjID0gdW5jdXJyeVRoaXMoLy4vLmV4ZWMpO1xudmFyIGpvaW4gPSB1bmN1cnJ5VGhpcyhbXS5qb2luKTtcbnZhciBudW1iZXJUb1N0cmluZyA9IHVuY3VycnlUaGlzKDEuMC50b1N0cmluZyk7XG52YXIgcG9wID0gdW5jdXJyeVRoaXMoW10ucG9wKTtcbnZhciBwdXNoID0gdW5jdXJyeVRoaXMoW10ucHVzaCk7XG52YXIgcmVwbGFjZSA9IHVuY3VycnlUaGlzKCcnLnJlcGxhY2UpO1xudmFyIHNoaWZ0ID0gdW5jdXJyeVRoaXMoW10uc2hpZnQpO1xudmFyIHNwbGl0ID0gdW5jdXJyeVRoaXMoJycuc3BsaXQpO1xudmFyIHN0cmluZ1NsaWNlID0gdW5jdXJyeVRoaXMoJycuc2xpY2UpO1xudmFyIHRvTG93ZXJDYXNlID0gdW5jdXJyeVRoaXMoJycudG9Mb3dlckNhc2UpO1xudmFyIHVuc2hpZnQgPSB1bmN1cnJ5VGhpcyhbXS51bnNoaWZ0KTtcblxudmFyIElOVkFMSURfQVVUSE9SSVRZID0gJ0ludmFsaWQgYXV0aG9yaXR5JztcbnZhciBJTlZBTElEX1NDSEVNRSA9ICdJbnZhbGlkIHNjaGVtZSc7XG52YXIgSU5WQUxJRF9IT1NUID0gJ0ludmFsaWQgaG9zdCc7XG52YXIgSU5WQUxJRF9QT1JUID0gJ0ludmFsaWQgcG9ydCc7XG5cbnZhciBBTFBIQSA9IC9bYS16XS9pO1xuLy8gZXNsaW50LWRpc2FibGUtbmV4dC1saW5lIHJlZ2V4cC9uby1vYnNjdXJlLXJhbmdlIC0tIHNhZmVcbnZhciBBTFBIQU5VTUVSSUMgPSAvW1xcZCstLmEtel0vaTtcbnZhciBESUdJVCA9IC9cXGQvO1xudmFyIEhFWF9TVEFSVCA9IC9eMHgvaTtcbnZhciBPQ1QgPSAvXlswLTddKyQvO1xudmFyIERFQyA9IC9eXFxkKyQvO1xudmFyIEhFWCA9IC9eW1xcZGEtZl0rJC9pO1xuLyogZXNsaW50LWRpc2FibGUgcmVnZXhwL25vLWNvbnRyb2wtY2hhcmFjdGVyIC0tIHNhZmUgKi9cbnZhciBGT1JCSURERU5fSE9TVF9DT0RFX1BPSU5UID0gL1tcXDBcXHRcXG5cXHIgIyUvOjw+P0BbXFxcXFxcXV58XS87XG52YXIgRk9SQklEREVOX0hPU1RfQ09ERV9QT0lOVF9FWENMVURJTkdfUEVSQ0VOVCA9IC9bXFwwXFx0XFxuXFxyICMvOjw+P0BbXFxcXFxcXV58XS87XG52YXIgTEVBRElOR19DMF9DT05UUk9MX09SX1NQQUNFID0gL15bXFx1MDAwMC1cXHUwMDIwXSsvO1xudmFyIFRSQUlMSU5HX0MwX0NPTlRST0xfT1JfU1BBQ0UgPSAvKF58W15cXHUwMDAwLVxcdTAwMjBdKVtcXHUwMDAwLVxcdTAwMjBdKyQvO1xudmFyIFRBQl9BTkRfTkVXX0xJTkUgPSAvW1xcdFxcblxccl0vZztcbi8qIGVzbGludC1lbmFibGUgcmVnZXhwL25vLWNvbnRyb2wtY2hhcmFjdGVyIC0tIHNhZmUgKi9cbnZhciBFT0Y7XG5cbi8vIGh0dHBzOi8vdXJsLnNwZWMud2hhdHdnLm9yZy8jaXB2NC1udW1iZXItcGFyc2VyXG52YXIgcGFyc2VJUHY0ID0gZnVuY3Rpb24gKGlucHV0KSB7XG4gIHZhciBwYXJ0cyA9IHNwbGl0KGlucHV0LCAnLicpO1xuICB2YXIgcGFydHNMZW5ndGgsIG51bWJlcnMsIGluZGV4LCBwYXJ0LCByYWRpeCwgbnVtYmVyLCBpcHY0O1xuICBpZiAocGFydHMubGVuZ3RoICYmIHBhcnRzW3BhcnRzLmxlbmd0aCAtIDFdID09PSAnJykge1xuICAgIHBhcnRzLmxlbmd0aC0tO1xuICB9XG4gIHBhcnRzTGVuZ3RoID0gcGFydHMubGVuZ3RoO1xuICBpZiAocGFydHNMZW5ndGggPiA0KSByZXR1cm4gaW5wdXQ7XG4gIG51bWJlcnMgPSBbXTtcbiAgZm9yIChpbmRleCA9IDA7IGluZGV4IDwgcGFydHNMZW5ndGg7IGluZGV4KyspIHtcbiAgICBwYXJ0ID0gcGFydHNbaW5kZXhdO1xuICAgIGlmIChwYXJ0ID09PSAnJykgcmV0dXJuIGlucHV0O1xuICAgIHJhZGl4ID0gMTA7XG4gICAgaWYgKHBhcnQubGVuZ3RoID4gMSAmJiBjaGFyQXQocGFydCwgMCkgPT09ICcwJykge1xuICAgICAgcmFkaXggPSBleGVjKEhFWF9TVEFSVCwgcGFydCkgPyAxNiA6IDg7XG4gICAgICBwYXJ0ID0gc3RyaW5nU2xpY2UocGFydCwgcmFkaXggPT09IDggPyAxIDogMik7XG4gICAgfVxuICAgIGlmIChwYXJ0ID09PSAnJykge1xuICAgICAgbnVtYmVyID0gMDtcbiAgICB9IGVsc2Uge1xuICAgICAgaWYgKCFleGVjKHJhZGl4ID09PSAxMCA/IERFQyA6IHJhZGl4ID09PSA4ID8gT0NUIDogSEVYLCBwYXJ0KSkgcmV0dXJuIGlucHV0O1xuICAgICAgbnVtYmVyID0gcGFyc2VJbnQocGFydCwgcmFkaXgpO1xuICAgIH1cbiAgICBwdXNoKG51bWJlcnMsIG51bWJlcik7XG4gIH1cbiAgZm9yIChpbmRleCA9IDA7IGluZGV4IDwgcGFydHNMZW5ndGg7IGluZGV4KyspIHtcbiAgICBudW1iZXIgPSBudW1iZXJzW2luZGV4XTtcbiAgICBpZiAoaW5kZXggPT09IHBhcnRzTGVuZ3RoIC0gMSkge1xuICAgICAgaWYgKG51bWJlciA+PSBwb3coMjU2LCA1IC0gcGFydHNMZW5ndGgpKSByZXR1cm4gbnVsbDtcbiAgICB9IGVsc2UgaWYgKG51bWJlciA+IDI1NSkgcmV0dXJuIG51bGw7XG4gIH1cbiAgaXB2NCA9IHBvcChudW1iZXJzKTtcbiAgZm9yIChpbmRleCA9IDA7IGluZGV4IDwgbnVtYmVycy5sZW5ndGg7IGluZGV4KyspIHtcbiAgICBpcHY0ICs9IG51bWJlcnNbaW5kZXhdICogcG93KDI1NiwgMyAtIGluZGV4KTtcbiAgfVxuICByZXR1cm4gaXB2NDtcbn07XG5cbi8vIGh0dHBzOi8vdXJsLnNwZWMud2hhdHdnLm9yZy8jY29uY2VwdC1pcHY2LXBhcnNlclxuLy8gZXNsaW50LWRpc2FibGUtbmV4dC1saW5lIG1heC1zdGF0ZW1lbnRzIC0tIFRPRE9cbnZhciBwYXJzZUlQdjYgPSBmdW5jdGlvbiAoaW5wdXQpIHtcbiAgdmFyIGFkZHJlc3MgPSBbMCwgMCwgMCwgMCwgMCwgMCwgMCwgMF07XG4gIHZhciBwaWVjZUluZGV4ID0gMDtcbiAgdmFyIGNvbXByZXNzID0gbnVsbDtcbiAgdmFyIHBvaW50ZXIgPSAwO1xuICB2YXIgdmFsdWUsIGxlbmd0aCwgbnVtYmVyc1NlZW4sIGlwdjRQaWVjZSwgbnVtYmVyLCBzd2Fwcywgc3dhcDtcblxuICB2YXIgY2hyID0gZnVuY3Rpb24gKCkge1xuICAgIHJldHVybiBjaGFyQXQoaW5wdXQsIHBvaW50ZXIpO1xuICB9O1xuXG4gIGlmIChjaHIoKSA9PT0gJzonKSB7XG4gICAgaWYgKGNoYXJBdChpbnB1dCwgMSkgIT09ICc6JykgcmV0dXJuO1xuICAgIHBvaW50ZXIgKz0gMjtcbiAgICBwaWVjZUluZGV4Kys7XG4gICAgY29tcHJlc3MgPSBwaWVjZUluZGV4O1xuICB9XG4gIHdoaWxlIChjaHIoKSkge1xuICAgIGlmIChwaWVjZUluZGV4ID09PSA4KSByZXR1cm47XG4gICAgaWYgKGNocigpID09PSAnOicpIHtcbiAgICAgIGlmIChjb21wcmVzcyAhPT0gbnVsbCkgcmV0dXJuO1xuICAgICAgcG9pbnRlcisrO1xuICAgICAgcGllY2VJbmRleCsrO1xuICAgICAgY29tcHJlc3MgPSBwaWVjZUluZGV4O1xuICAgICAgY29udGludWU7XG4gICAgfVxuICAgIHZhbHVlID0gbGVuZ3RoID0gMDtcbiAgICB3aGlsZSAobGVuZ3RoIDwgNCAmJiBleGVjKEhFWCwgY2hyKCkpKSB7XG4gICAgICB2YWx1ZSA9IHZhbHVlICogMTYgKyBwYXJzZUludChjaHIoKSwgMTYpO1xuICAgICAgcG9pbnRlcisrO1xuICAgICAgbGVuZ3RoKys7XG4gICAgfVxuICAgIGlmIChjaHIoKSA9PT0gJy4nKSB7XG4gICAgICBpZiAobGVuZ3RoID09PSAwKSByZXR1cm47XG4gICAgICBwb2ludGVyIC09IGxlbmd0aDtcbiAgICAgIGlmIChwaWVjZUluZGV4ID4gNikgcmV0dXJuO1xuICAgICAgbnVtYmVyc1NlZW4gPSAwO1xuICAgICAgd2hpbGUgKGNocigpKSB7XG4gICAgICAgIGlwdjRQaWVjZSA9IG51bGw7XG4gICAgICAgIGlmIChudW1iZXJzU2VlbiA+IDApIHtcbiAgICAgICAgICBpZiAoY2hyKCkgPT09ICcuJyAmJiBudW1iZXJzU2VlbiA8IDQpIHBvaW50ZXIrKztcbiAgICAgICAgICBlbHNlIHJldHVybjtcbiAgICAgICAgfVxuICAgICAgICBpZiAoIWV4ZWMoRElHSVQsIGNocigpKSkgcmV0dXJuO1xuICAgICAgICB3aGlsZSAoZXhlYyhESUdJVCwgY2hyKCkpKSB7XG4gICAgICAgICAgbnVtYmVyID0gcGFyc2VJbnQoY2hyKCksIDEwKTtcbiAgICAgICAgICBpZiAoaXB2NFBpZWNlID09PSBudWxsKSBpcHY0UGllY2UgPSBudW1iZXI7XG4gICAgICAgICAgZWxzZSBpZiAoaXB2NFBpZWNlID09PSAwKSByZXR1cm47XG4gICAgICAgICAgZWxzZSBpcHY0UGllY2UgPSBpcHY0UGllY2UgKiAxMCArIG51bWJlcjtcbiAgICAgICAgICBpZiAoaXB2NFBpZWNlID4gMjU1KSByZXR1cm47XG4gICAgICAgICAgcG9pbnRlcisrO1xuICAgICAgICB9XG4gICAgICAgIGFkZHJlc3NbcGllY2VJbmRleF0gPSBhZGRyZXNzW3BpZWNlSW5kZXhdICogMjU2ICsgaXB2NFBpZWNlO1xuICAgICAgICBudW1iZXJzU2VlbisrO1xuICAgICAgICBpZiAobnVtYmVyc1NlZW4gPT09IDIgfHwgbnVtYmVyc1NlZW4gPT09IDQpIHBpZWNlSW5kZXgrKztcbiAgICAgIH1cbiAgICAgIGlmIChudW1iZXJzU2VlbiAhPT0gNCkgcmV0dXJuO1xuICAgICAgYnJlYWs7XG4gICAgfSBlbHNlIGlmIChjaHIoKSA9PT0gJzonKSB7XG4gICAgICBwb2ludGVyKys7XG4gICAgICBpZiAoIWNocigpKSByZXR1cm47XG4gICAgfSBlbHNlIGlmIChjaHIoKSkgcmV0dXJuO1xuICAgIGFkZHJlc3NbcGllY2VJbmRleCsrXSA9IHZhbHVlO1xuICB9XG4gIGlmIChjb21wcmVzcyAhPT0gbnVsbCkge1xuICAgIHN3YXBzID0gcGllY2VJbmRleCAtIGNvbXByZXNzO1xuICAgIHBpZWNlSW5kZXggPSA3O1xuICAgIHdoaWxlIChwaWVjZUluZGV4ICE9PSAwICYmIHN3YXBzID4gMCkge1xuICAgICAgc3dhcCA9IGFkZHJlc3NbcGllY2VJbmRleF07XG4gICAgICBhZGRyZXNzW3BpZWNlSW5kZXgtLV0gPSBhZGRyZXNzW2NvbXByZXNzICsgc3dhcHMgLSAxXTtcbiAgICAgIGFkZHJlc3NbY29tcHJlc3MgKyAtLXN3YXBzXSA9IHN3YXA7XG4gICAgfVxuICB9IGVsc2UgaWYgKHBpZWNlSW5kZXggIT09IDgpIHJldHVybjtcbiAgcmV0dXJuIGFkZHJlc3M7XG59O1xuXG52YXIgZmluZExvbmdlc3RaZXJvU2VxdWVuY2UgPSBmdW5jdGlvbiAoaXB2Nikge1xuICB2YXIgbWF4SW5kZXggPSBudWxsO1xuICB2YXIgbWF4TGVuZ3RoID0gMTtcbiAgdmFyIGN1cnJTdGFydCA9IG51bGw7XG4gIHZhciBjdXJyTGVuZ3RoID0gMDtcbiAgdmFyIGluZGV4ID0gMDtcbiAgZm9yICg7IGluZGV4IDwgODsgaW5kZXgrKykge1xuICAgIGlmIChpcHY2W2luZGV4XSAhPT0gMCkge1xuICAgICAgaWYgKGN1cnJMZW5ndGggPiBtYXhMZW5ndGgpIHtcbiAgICAgICAgbWF4SW5kZXggPSBjdXJyU3RhcnQ7XG4gICAgICAgIG1heExlbmd0aCA9IGN1cnJMZW5ndGg7XG4gICAgICB9XG4gICAgICBjdXJyU3RhcnQgPSBudWxsO1xuICAgICAgY3Vyckxlbmd0aCA9IDA7XG4gICAgfSBlbHNlIHtcbiAgICAgIGlmIChjdXJyU3RhcnQgPT09IG51bGwpIGN1cnJTdGFydCA9IGluZGV4O1xuICAgICAgKytjdXJyTGVuZ3RoO1xuICAgIH1cbiAgfVxuICBpZiAoY3Vyckxlbmd0aCA+IG1heExlbmd0aCkge1xuICAgIG1heEluZGV4ID0gY3VyclN0YXJ0O1xuICAgIG1heExlbmd0aCA9IGN1cnJMZW5ndGg7XG4gIH1cbiAgcmV0dXJuIG1heEluZGV4O1xufTtcblxuLy8gaHR0cHM6Ly91cmwuc3BlYy53aGF0d2cub3JnLyNob3N0LXNlcmlhbGl6aW5nXG52YXIgc2VyaWFsaXplSG9zdCA9IGZ1bmN0aW9uIChob3N0KSB7XG4gIHZhciByZXN1bHQsIGluZGV4LCBjb21wcmVzcywgaWdub3JlMDtcbiAgLy8gaXB2NFxuICBpZiAodHlwZW9mIGhvc3QgPT0gJ251bWJlcicpIHtcbiAgICByZXN1bHQgPSBbXTtcbiAgICBmb3IgKGluZGV4ID0gMDsgaW5kZXggPCA0OyBpbmRleCsrKSB7XG4gICAgICB1bnNoaWZ0KHJlc3VsdCwgaG9zdCAlIDI1Nik7XG4gICAgICBob3N0ID0gZmxvb3IoaG9zdCAvIDI1Nik7XG4gICAgfSByZXR1cm4gam9pbihyZXN1bHQsICcuJyk7XG4gIC8vIGlwdjZcbiAgfSBlbHNlIGlmICh0eXBlb2YgaG9zdCA9PSAnb2JqZWN0Jykge1xuICAgIHJlc3VsdCA9ICcnO1xuICAgIGNvbXByZXNzID0gZmluZExvbmdlc3RaZXJvU2VxdWVuY2UoaG9zdCk7XG4gICAgZm9yIChpbmRleCA9IDA7IGluZGV4IDwgODsgaW5kZXgrKykge1xuICAgICAgaWYgKGlnbm9yZTAgJiYgaG9zdFtpbmRleF0gPT09IDApIGNvbnRpbnVlO1xuICAgICAgaWYgKGlnbm9yZTApIGlnbm9yZTAgPSBmYWxzZTtcbiAgICAgIGlmIChjb21wcmVzcyA9PT0gaW5kZXgpIHtcbiAgICAgICAgcmVzdWx0ICs9IGluZGV4ID8gJzonIDogJzo6JztcbiAgICAgICAgaWdub3JlMCA9IHRydWU7XG4gICAgICB9IGVsc2Uge1xuICAgICAgICByZXN1bHQgKz0gbnVtYmVyVG9TdHJpbmcoaG9zdFtpbmRleF0sIDE2KTtcbiAgICAgICAgaWYgKGluZGV4IDwgNykgcmVzdWx0ICs9ICc6JztcbiAgICAgIH1cbiAgICB9XG4gICAgcmV0dXJuICdbJyArIHJlc3VsdCArICddJztcbiAgfSByZXR1cm4gaG9zdDtcbn07XG5cbnZhciBDMENvbnRyb2xQZXJjZW50RW5jb2RlU2V0ID0ge307XG52YXIgZnJhZ21lbnRQZXJjZW50RW5jb2RlU2V0ID0gYXNzaWduKHt9LCBDMENvbnRyb2xQZXJjZW50RW5jb2RlU2V0LCB7XG4gICcgJzogMSwgJ1wiJzogMSwgJzwnOiAxLCAnPic6IDEsICdgJzogMVxufSk7XG52YXIgcGF0aFBlcmNlbnRFbmNvZGVTZXQgPSBhc3NpZ24oe30sIGZyYWdtZW50UGVyY2VudEVuY29kZVNldCwge1xuICAnIyc6IDEsICc/JzogMSwgJ3snOiAxLCAnfSc6IDFcbn0pO1xudmFyIHVzZXJpbmZvUGVyY2VudEVuY29kZVNldCA9IGFzc2lnbih7fSwgcGF0aFBlcmNlbnRFbmNvZGVTZXQsIHtcbiAgJy8nOiAxLCAnOic6IDEsICc7JzogMSwgJz0nOiAxLCAnQCc6IDEsICdbJzogMSwgJ1xcXFwnOiAxLCAnXSc6IDEsICdeJzogMSwgJ3wnOiAxXG59KTtcblxudmFyIHBlcmNlbnRFbmNvZGUgPSBmdW5jdGlvbiAoY2hyLCBzZXQpIHtcbiAgdmFyIGNvZGUgPSBjb2RlQXQoY2hyLCAwKTtcbiAgcmV0dXJuIGNvZGUgPiAweDIwICYmIGNvZGUgPCAweDdGICYmICFoYXNPd24oc2V0LCBjaHIpID8gY2hyIDogZW5jb2RlVVJJQ29tcG9uZW50KGNocik7XG59O1xuXG4vLyBodHRwczovL3VybC5zcGVjLndoYXR3Zy5vcmcvI3NwZWNpYWwtc2NoZW1lXG52YXIgc3BlY2lhbFNjaGVtZXMgPSB7XG4gIGZ0cDogMjEsXG4gIGZpbGU6IG51bGwsXG4gIGh0dHA6IDgwLFxuICBodHRwczogNDQzLFxuICB3czogODAsXG4gIHdzczogNDQzXG59O1xuXG4vLyBodHRwczovL3VybC5zcGVjLndoYXR3Zy5vcmcvI3dpbmRvd3MtZHJpdmUtbGV0dGVyXG52YXIgaXNXaW5kb3dzRHJpdmVMZXR0ZXIgPSBmdW5jdGlvbiAoc3RyaW5nLCBub3JtYWxpemVkKSB7XG4gIHZhciBzZWNvbmQ7XG4gIHJldHVybiBzdHJpbmcubGVuZ3RoID09PSAyICYmIGV4ZWMoQUxQSEEsIGNoYXJBdChzdHJpbmcsIDApKVxuICAgICYmICgoc2Vjb25kID0gY2hhckF0KHN0cmluZywgMSkpID09PSAnOicgfHwgKCFub3JtYWxpemVkICYmIHNlY29uZCA9PT0gJ3wnKSk7XG59O1xuXG4vLyBodHRwczovL3VybC5zcGVjLndoYXR3Zy5vcmcvI3N0YXJ0LXdpdGgtYS13aW5kb3dzLWRyaXZlLWxldHRlclxudmFyIHN0YXJ0c1dpdGhXaW5kb3dzRHJpdmVMZXR0ZXIgPSBmdW5jdGlvbiAoc3RyaW5nKSB7XG4gIHZhciB0aGlyZDtcbiAgcmV0dXJuIHN0cmluZy5sZW5ndGggPiAxICYmIGlzV2luZG93c0RyaXZlTGV0dGVyKHN0cmluZ1NsaWNlKHN0cmluZywgMCwgMikpICYmIChcbiAgICBzdHJpbmcubGVuZ3RoID09PSAyIHx8XG4gICAgKCh0aGlyZCA9IGNoYXJBdChzdHJpbmcsIDIpKSA9PT0gJy8nIHx8IHRoaXJkID09PSAnXFxcXCcgfHwgdGhpcmQgPT09ICc/JyB8fCB0aGlyZCA9PT0gJyMnKVxuICApO1xufTtcblxuLy8gaHR0cHM6Ly91cmwuc3BlYy53aGF0d2cub3JnLyNzaW5nbGUtZG90LXBhdGgtc2VnbWVudFxudmFyIGlzU2luZ2xlRG90ID0gZnVuY3Rpb24gKHNlZ21lbnQpIHtcbiAgcmV0dXJuIHNlZ21lbnQgPT09ICcuJyB8fCB0b0xvd2VyQ2FzZShzZWdtZW50KSA9PT0gJyUyZSc7XG59O1xuXG4vLyBodHRwczovL3VybC5zcGVjLndoYXR3Zy5vcmcvI2RvdWJsZS1kb3QtcGF0aC1zZWdtZW50XG52YXIgaXNEb3VibGVEb3QgPSBmdW5jdGlvbiAoc2VnbWVudCkge1xuICBzZWdtZW50ID0gdG9Mb3dlckNhc2Uoc2VnbWVudCk7XG4gIHJldHVybiBzZWdtZW50ID09PSAnLi4nIHx8IHNlZ21lbnQgPT09ICclMmUuJyB8fCBzZWdtZW50ID09PSAnLiUyZScgfHwgc2VnbWVudCA9PT0gJyUyZSUyZSc7XG59O1xuXG4vLyBTdGF0ZXM6XG52YXIgU0NIRU1FX1NUQVJUID0ge307XG52YXIgU0NIRU1FID0ge307XG52YXIgTk9fU0NIRU1FID0ge307XG52YXIgU1BFQ0lBTF9SRUxBVElWRV9PUl9BVVRIT1JJVFkgPSB7fTtcbnZhciBQQVRIX09SX0FVVEhPUklUWSA9IHt9O1xudmFyIFJFTEFUSVZFID0ge307XG52YXIgUkVMQVRJVkVfU0xBU0ggPSB7fTtcbnZhciBTUEVDSUFMX0FVVEhPUklUWV9TTEFTSEVTID0ge307XG52YXIgU1BFQ0lBTF9BVVRIT1JJVFlfSUdOT1JFX1NMQVNIRVMgPSB7fTtcbnZhciBBVVRIT1JJVFkgPSB7fTtcbnZhciBIT1NUID0ge307XG52YXIgSE9TVE5BTUUgPSB7fTtcbnZhciBQT1JUID0ge307XG52YXIgRklMRSA9IHt9O1xudmFyIEZJTEVfU0xBU0ggPSB7fTtcbnZhciBGSUxFX0hPU1QgPSB7fTtcbnZhciBQQVRIX1NUQVJUID0ge307XG52YXIgUEFUSCA9IHt9O1xudmFyIENBTk5PVF9CRV9BX0JBU0VfVVJMX1BBVEggPSB7fTtcbnZhciBRVUVSWSA9IHt9O1xudmFyIEZSQUdNRU5UID0ge307XG5cbnZhciBVUkxTdGF0ZSA9IGZ1bmN0aW9uICh1cmwsIGlzQmFzZSwgYmFzZSkge1xuICB2YXIgdXJsU3RyaW5nID0gJHRvU3RyaW5nKHVybCk7XG4gIHZhciBiYXNlU3RhdGUsIGZhaWx1cmUsIHNlYXJjaFBhcmFtcztcbiAgaWYgKGlzQmFzZSkge1xuICAgIGZhaWx1cmUgPSB0aGlzLnBhcnNlKHVybFN0cmluZyk7XG4gICAgaWYgKGZhaWx1cmUpIHRocm93IG5ldyBUeXBlRXJyb3IoZmFpbHVyZSk7XG4gICAgdGhpcy5zZWFyY2hQYXJhbXMgPSBudWxsO1xuICB9IGVsc2Uge1xuICAgIGlmIChiYXNlICE9PSB1bmRlZmluZWQpIGJhc2VTdGF0ZSA9IG5ldyBVUkxTdGF0ZShiYXNlLCB0cnVlKTtcbiAgICBmYWlsdXJlID0gdGhpcy5wYXJzZSh1cmxTdHJpbmcsIG51bGwsIGJhc2VTdGF0ZSk7XG4gICAgaWYgKGZhaWx1cmUpIHRocm93IG5ldyBUeXBlRXJyb3IoZmFpbHVyZSk7XG4gICAgc2VhcmNoUGFyYW1zID0gZ2V0SW50ZXJuYWxTZWFyY2hQYXJhbXNTdGF0ZShuZXcgVVJMU2VhcmNoUGFyYW1zKCkpO1xuICAgIHNlYXJjaFBhcmFtcy5iaW5kVVJMKHRoaXMpO1xuICAgIHRoaXMuc2VhcmNoUGFyYW1zID0gc2VhcmNoUGFyYW1zO1xuICB9XG59O1xuXG5VUkxTdGF0ZS5wcm90b3R5cGUgPSB7XG4gIHR5cGU6ICdVUkwnLFxuICAvLyBodHRwczovL3VybC5zcGVjLndoYXR3Zy5vcmcvI3VybC1wYXJzaW5nXG4gIC8vIGVzbGludC1kaXNhYmxlLW5leHQtbGluZSBtYXgtc3RhdGVtZW50cyAtLSBUT0RPXG4gIHBhcnNlOiBmdW5jdGlvbiAoaW5wdXQsIHN0YXRlT3ZlcnJpZGUsIGJhc2UpIHtcbiAgICB2YXIgdXJsID0gdGhpcztcbiAgICB2YXIgc3RhdGUgPSBzdGF0ZU92ZXJyaWRlIHx8IFNDSEVNRV9TVEFSVDtcbiAgICB2YXIgcG9pbnRlciA9IDA7XG4gICAgdmFyIGJ1ZmZlciA9ICcnO1xuICAgIHZhciBzZWVuQXQgPSBmYWxzZTtcbiAgICB2YXIgc2VlbkJyYWNrZXQgPSBmYWxzZTtcbiAgICB2YXIgc2VlblBhc3N3b3JkVG9rZW4gPSBmYWxzZTtcbiAgICB2YXIgY29kZVBvaW50cywgY2hyLCBidWZmZXJDb2RlUG9pbnRzLCBmYWlsdXJlO1xuXG4gICAgaW5wdXQgPSAkdG9TdHJpbmcoaW5wdXQpO1xuXG4gICAgaWYgKCFzdGF0ZU92ZXJyaWRlKSB7XG4gICAgICB1cmwuc2NoZW1lID0gJyc7XG4gICAgICB1cmwudXNlcm5hbWUgPSAnJztcbiAgICAgIHVybC5wYXNzd29yZCA9ICcnO1xuICAgICAgdXJsLmhvc3QgPSBudWxsO1xuICAgICAgdXJsLnBvcnQgPSBudWxsO1xuICAgICAgdXJsLnBhdGggPSBbXTtcbiAgICAgIHVybC5xdWVyeSA9IG51bGw7XG4gICAgICB1cmwuZnJhZ21lbnQgPSBudWxsO1xuICAgICAgdXJsLmNhbm5vdEJlQUJhc2VVUkwgPSBmYWxzZTtcbiAgICAgIGlucHV0ID0gcmVwbGFjZShpbnB1dCwgTEVBRElOR19DMF9DT05UUk9MX09SX1NQQUNFLCAnJyk7XG4gICAgICBpbnB1dCA9IHJlcGxhY2UoaW5wdXQsIFRSQUlMSU5HX0MwX0NPTlRST0xfT1JfU1BBQ0UsICckMScpO1xuICAgIH1cblxuICAgIGlucHV0ID0gcmVwbGFjZShpbnB1dCwgVEFCX0FORF9ORVdfTElORSwgJycpO1xuXG4gICAgY29kZVBvaW50cyA9IGFycmF5RnJvbShpbnB1dCk7XG5cbiAgICB3aGlsZSAocG9pbnRlciA8PSBjb2RlUG9pbnRzLmxlbmd0aCkge1xuICAgICAgY2hyID0gY29kZVBvaW50c1twb2ludGVyXTtcbiAgICAgIHN3aXRjaCAoc3RhdGUpIHtcbiAgICAgICAgY2FzZSBTQ0hFTUVfU1RBUlQ6XG4gICAgICAgICAgaWYgKGNociAmJiBleGVjKEFMUEhBLCBjaHIpKSB7XG4gICAgICAgICAgICBidWZmZXIgKz0gdG9Mb3dlckNhc2UoY2hyKTtcbiAgICAgICAgICAgIHN0YXRlID0gU0NIRU1FO1xuICAgICAgICAgIH0gZWxzZSBpZiAoIXN0YXRlT3ZlcnJpZGUpIHtcbiAgICAgICAgICAgIHN0YXRlID0gTk9fU0NIRU1FO1xuICAgICAgICAgICAgY29udGludWU7XG4gICAgICAgICAgfSBlbHNlIHJldHVybiBJTlZBTElEX1NDSEVNRTtcbiAgICAgICAgICBicmVhaztcblxuICAgICAgICBjYXNlIFNDSEVNRTpcbiAgICAgICAgICBpZiAoY2hyICYmIChleGVjKEFMUEhBTlVNRVJJQywgY2hyKSB8fCBjaHIgPT09ICcrJyB8fCBjaHIgPT09ICctJyB8fCBjaHIgPT09ICcuJykpIHtcbiAgICAgICAgICAgIGJ1ZmZlciArPSB0b0xvd2VyQ2FzZShjaHIpO1xuICAgICAgICAgIH0gZWxzZSBpZiAoY2hyID09PSAnOicpIHtcbiAgICAgICAgICAgIGlmIChzdGF0ZU92ZXJyaWRlICYmIChcbiAgICAgICAgICAgICAgKHVybC5pc1NwZWNpYWwoKSAhPT0gaGFzT3duKHNwZWNpYWxTY2hlbWVzLCBidWZmZXIpKSB8fFxuICAgICAgICAgICAgICAoYnVmZmVyID09PSAnZmlsZScgJiYgKHVybC5pbmNsdWRlc0NyZWRlbnRpYWxzKCkgfHwgdXJsLnBvcnQgIT09IG51bGwpKSB8fFxuICAgICAgICAgICAgICAodXJsLnNjaGVtZSA9PT0gJ2ZpbGUnICYmICF1cmwuaG9zdClcbiAgICAgICAgICAgICkpIHJldHVybjtcbiAgICAgICAgICAgIHVybC5zY2hlbWUgPSBidWZmZXI7XG4gICAgICAgICAgICBpZiAoc3RhdGVPdmVycmlkZSkge1xuICAgICAgICAgICAgICBpZiAodXJsLmlzU3BlY2lhbCgpICYmIHNwZWNpYWxTY2hlbWVzW3VybC5zY2hlbWVdID09PSB1cmwucG9ydCkgdXJsLnBvcnQgPSBudWxsO1xuICAgICAgICAgICAgICByZXR1cm47XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBidWZmZXIgPSAnJztcbiAgICAgICAgICAgIGlmICh1cmwuc2NoZW1lID09PSAnZmlsZScpIHtcbiAgICAgICAgICAgICAgc3RhdGUgPSBGSUxFO1xuICAgICAgICAgICAgfSBlbHNlIGlmICh1cmwuaXNTcGVjaWFsKCkgJiYgYmFzZSAmJiBiYXNlLnNjaGVtZSA9PT0gdXJsLnNjaGVtZSkge1xuICAgICAgICAgICAgICBzdGF0ZSA9IFNQRUNJQUxfUkVMQVRJVkVfT1JfQVVUSE9SSVRZO1xuICAgICAgICAgICAgfSBlbHNlIGlmICh1cmwuaXNTcGVjaWFsKCkpIHtcbiAgICAgICAgICAgICAgc3RhdGUgPSBTUEVDSUFMX0FVVEhPUklUWV9TTEFTSEVTO1xuICAgICAgICAgICAgfSBlbHNlIGlmIChjb2RlUG9pbnRzW3BvaW50ZXIgKyAxXSA9PT0gJy8nKSB7XG4gICAgICAgICAgICAgIHN0YXRlID0gUEFUSF9PUl9BVVRIT1JJVFk7XG4gICAgICAgICAgICAgIHBvaW50ZXIrKztcbiAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgIHVybC5jYW5ub3RCZUFCYXNlVVJMID0gdHJ1ZTtcbiAgICAgICAgICAgICAgcHVzaCh1cmwucGF0aCwgJycpO1xuICAgICAgICAgICAgICBzdGF0ZSA9IENBTk5PVF9CRV9BX0JBU0VfVVJMX1BBVEg7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgfSBlbHNlIGlmICghc3RhdGVPdmVycmlkZSkge1xuICAgICAgICAgICAgYnVmZmVyID0gJyc7XG4gICAgICAgICAgICBzdGF0ZSA9IE5PX1NDSEVNRTtcbiAgICAgICAgICAgIHBvaW50ZXIgPSAwO1xuICAgICAgICAgICAgY29udGludWU7XG4gICAgICAgICAgfSBlbHNlIHJldHVybiBJTlZBTElEX1NDSEVNRTtcbiAgICAgICAgICBicmVhaztcblxuICAgICAgICBjYXNlIE5PX1NDSEVNRTpcbiAgICAgICAgICBpZiAoIWJhc2UgfHwgKGJhc2UuY2Fubm90QmVBQmFzZVVSTCAmJiBjaHIgIT09ICcjJykpIHJldHVybiBJTlZBTElEX1NDSEVNRTtcbiAgICAgICAgICBpZiAoYmFzZS5jYW5ub3RCZUFCYXNlVVJMICYmIGNociA9PT0gJyMnKSB7XG4gICAgICAgICAgICB1cmwuc2NoZW1lID0gYmFzZS5zY2hlbWU7XG4gICAgICAgICAgICB1cmwucGF0aCA9IGFycmF5U2xpY2UoYmFzZS5wYXRoKTtcbiAgICAgICAgICAgIHVybC5xdWVyeSA9IGJhc2UucXVlcnk7XG4gICAgICAgICAgICB1cmwuZnJhZ21lbnQgPSAnJztcbiAgICAgICAgICAgIHVybC5jYW5ub3RCZUFCYXNlVVJMID0gdHJ1ZTtcbiAgICAgICAgICAgIHN0YXRlID0gRlJBR01FTlQ7XG4gICAgICAgICAgICBicmVhaztcbiAgICAgICAgICB9XG4gICAgICAgICAgc3RhdGUgPSBiYXNlLnNjaGVtZSA9PT0gJ2ZpbGUnID8gRklMRSA6IFJFTEFUSVZFO1xuICAgICAgICAgIGNvbnRpbnVlO1xuXG4gICAgICAgIGNhc2UgU1BFQ0lBTF9SRUxBVElWRV9PUl9BVVRIT1JJVFk6XG4gICAgICAgICAgaWYgKGNociA9PT0gJy8nICYmIGNvZGVQb2ludHNbcG9pbnRlciArIDFdID09PSAnLycpIHtcbiAgICAgICAgICAgIHN0YXRlID0gU1BFQ0lBTF9BVVRIT1JJVFlfSUdOT1JFX1NMQVNIRVM7XG4gICAgICAgICAgICBwb2ludGVyKys7XG4gICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgIHN0YXRlID0gUkVMQVRJVkU7XG4gICAgICAgICAgICBjb250aW51ZTtcbiAgICAgICAgICB9IGJyZWFrO1xuXG4gICAgICAgIGNhc2UgUEFUSF9PUl9BVVRIT1JJVFk6XG4gICAgICAgICAgaWYgKGNociA9PT0gJy8nKSB7XG4gICAgICAgICAgICBzdGF0ZSA9IEFVVEhPUklUWTtcbiAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICBzdGF0ZSA9IFBBVEg7XG4gICAgICAgICAgICBjb250aW51ZTtcbiAgICAgICAgICB9XG5cbiAgICAgICAgY2FzZSBSRUxBVElWRTpcbiAgICAgICAgICB1cmwuc2NoZW1lID0gYmFzZS5zY2hlbWU7XG4gICAgICAgICAgaWYgKGNociA9PT0gRU9GKSB7XG4gICAgICAgICAgICB1cmwudXNlcm5hbWUgPSBiYXNlLnVzZXJuYW1lO1xuICAgICAgICAgICAgdXJsLnBhc3N3b3JkID0gYmFzZS5wYXNzd29yZDtcbiAgICAgICAgICAgIHVybC5ob3N0ID0gYmFzZS5ob3N0O1xuICAgICAgICAgICAgdXJsLnBvcnQgPSBiYXNlLnBvcnQ7XG4gICAgICAgICAgICB1cmwucGF0aCA9IGFycmF5U2xpY2UoYmFzZS5wYXRoKTtcbiAgICAgICAgICAgIHVybC5xdWVyeSA9IGJhc2UucXVlcnk7XG4gICAgICAgICAgfSBlbHNlIGlmIChjaHIgPT09ICcvJyB8fCAoY2hyID09PSAnXFxcXCcgJiYgdXJsLmlzU3BlY2lhbCgpKSkge1xuICAgICAgICAgICAgc3RhdGUgPSBSRUxBVElWRV9TTEFTSDtcbiAgICAgICAgICB9IGVsc2UgaWYgKGNociA9PT0gJz8nKSB7XG4gICAgICAgICAgICB1cmwudXNlcm5hbWUgPSBiYXNlLnVzZXJuYW1lO1xuICAgICAgICAgICAgdXJsLnBhc3N3b3JkID0gYmFzZS5wYXNzd29yZDtcbiAgICAgICAgICAgIHVybC5ob3N0ID0gYmFzZS5ob3N0O1xuICAgICAgICAgICAgdXJsLnBvcnQgPSBiYXNlLnBvcnQ7XG4gICAgICAgICAgICB1cmwucGF0aCA9IGFycmF5U2xpY2UoYmFzZS5wYXRoKTtcbiAgICAgICAgICAgIHVybC5xdWVyeSA9ICcnO1xuICAgICAgICAgICAgc3RhdGUgPSBRVUVSWTtcbiAgICAgICAgICB9IGVsc2UgaWYgKGNociA9PT0gJyMnKSB7XG4gICAgICAgICAgICB1cmwudXNlcm5hbWUgPSBiYXNlLnVzZXJuYW1lO1xuICAgICAgICAgICAgdXJsLnBhc3N3b3JkID0gYmFzZS5wYXNzd29yZDtcbiAgICAgICAgICAgIHVybC5ob3N0ID0gYmFzZS5ob3N0O1xuICAgICAgICAgICAgdXJsLnBvcnQgPSBiYXNlLnBvcnQ7XG4gICAgICAgICAgICB1cmwucGF0aCA9IGFycmF5U2xpY2UoYmFzZS5wYXRoKTtcbiAgICAgICAgICAgIHVybC5xdWVyeSA9IGJhc2UucXVlcnk7XG4gICAgICAgICAgICB1cmwuZnJhZ21lbnQgPSAnJztcbiAgICAgICAgICAgIHN0YXRlID0gRlJBR01FTlQ7XG4gICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgIHVybC51c2VybmFtZSA9IGJhc2UudXNlcm5hbWU7XG4gICAgICAgICAgICB1cmwucGFzc3dvcmQgPSBiYXNlLnBhc3N3b3JkO1xuICAgICAgICAgICAgdXJsLmhvc3QgPSBiYXNlLmhvc3Q7XG4gICAgICAgICAgICB1cmwucG9ydCA9IGJhc2UucG9ydDtcbiAgICAgICAgICAgIHVybC5wYXRoID0gYXJyYXlTbGljZShiYXNlLnBhdGgpO1xuICAgICAgICAgICAgdXJsLnBhdGgubGVuZ3RoLS07XG4gICAgICAgICAgICBzdGF0ZSA9IFBBVEg7XG4gICAgICAgICAgICBjb250aW51ZTtcbiAgICAgICAgICB9IGJyZWFrO1xuXG4gICAgICAgIGNhc2UgUkVMQVRJVkVfU0xBU0g6XG4gICAgICAgICAgaWYgKHVybC5pc1NwZWNpYWwoKSAmJiAoY2hyID09PSAnLycgfHwgY2hyID09PSAnXFxcXCcpKSB7XG4gICAgICAgICAgICBzdGF0ZSA9IFNQRUNJQUxfQVVUSE9SSVRZX0lHTk9SRV9TTEFTSEVTO1xuICAgICAgICAgIH0gZWxzZSBpZiAoY2hyID09PSAnLycpIHtcbiAgICAgICAgICAgIHN0YXRlID0gQVVUSE9SSVRZO1xuICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICB1cmwudXNlcm5hbWUgPSBiYXNlLnVzZXJuYW1lO1xuICAgICAgICAgICAgdXJsLnBhc3N3b3JkID0gYmFzZS5wYXNzd29yZDtcbiAgICAgICAgICAgIHVybC5ob3N0ID0gYmFzZS5ob3N0O1xuICAgICAgICAgICAgdXJsLnBvcnQgPSBiYXNlLnBvcnQ7XG4gICAgICAgICAgICBzdGF0ZSA9IFBBVEg7XG4gICAgICAgICAgICBjb250aW51ZTtcbiAgICAgICAgICB9IGJyZWFrO1xuXG4gICAgICAgIGNhc2UgU1BFQ0lBTF9BVVRIT1JJVFlfU0xBU0hFUzpcbiAgICAgICAgICBzdGF0ZSA9IFNQRUNJQUxfQVVUSE9SSVRZX0lHTk9SRV9TTEFTSEVTO1xuICAgICAgICAgIGlmIChjaHIgIT09ICcvJyB8fCBjaGFyQXQoYnVmZmVyLCBwb2ludGVyICsgMSkgIT09ICcvJykgY29udGludWU7XG4gICAgICAgICAgcG9pbnRlcisrO1xuICAgICAgICAgIGJyZWFrO1xuXG4gICAgICAgIGNhc2UgU1BFQ0lBTF9BVVRIT1JJVFlfSUdOT1JFX1NMQVNIRVM6XG4gICAgICAgICAgaWYgKGNociAhPT0gJy8nICYmIGNociAhPT0gJ1xcXFwnKSB7XG4gICAgICAgICAgICBzdGF0ZSA9IEFVVEhPUklUWTtcbiAgICAgICAgICAgIGNvbnRpbnVlO1xuICAgICAgICAgIH0gYnJlYWs7XG5cbiAgICAgICAgY2FzZSBBVVRIT1JJVFk6XG4gICAgICAgICAgaWYgKGNociA9PT0gJ0AnKSB7XG4gICAgICAgICAgICBpZiAoc2VlbkF0KSBidWZmZXIgPSAnJTQwJyArIGJ1ZmZlcjtcbiAgICAgICAgICAgIHNlZW5BdCA9IHRydWU7XG4gICAgICAgICAgICBidWZmZXJDb2RlUG9pbnRzID0gYXJyYXlGcm9tKGJ1ZmZlcik7XG4gICAgICAgICAgICBmb3IgKHZhciBpID0gMDsgaSA8IGJ1ZmZlckNvZGVQb2ludHMubGVuZ3RoOyBpKyspIHtcbiAgICAgICAgICAgICAgdmFyIGNvZGVQb2ludCA9IGJ1ZmZlckNvZGVQb2ludHNbaV07XG4gICAgICAgICAgICAgIGlmIChjb2RlUG9pbnQgPT09ICc6JyAmJiAhc2VlblBhc3N3b3JkVG9rZW4pIHtcbiAgICAgICAgICAgICAgICBzZWVuUGFzc3dvcmRUb2tlbiA9IHRydWU7XG4gICAgICAgICAgICAgICAgY29udGludWU7XG4gICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgdmFyIGVuY29kZWRDb2RlUG9pbnRzID0gcGVyY2VudEVuY29kZShjb2RlUG9pbnQsIHVzZXJpbmZvUGVyY2VudEVuY29kZVNldCk7XG4gICAgICAgICAgICAgIGlmIChzZWVuUGFzc3dvcmRUb2tlbikgdXJsLnBhc3N3b3JkICs9IGVuY29kZWRDb2RlUG9pbnRzO1xuICAgICAgICAgICAgICBlbHNlIHVybC51c2VybmFtZSArPSBlbmNvZGVkQ29kZVBvaW50cztcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGJ1ZmZlciA9ICcnO1xuICAgICAgICAgIH0gZWxzZSBpZiAoXG4gICAgICAgICAgICBjaHIgPT09IEVPRiB8fCBjaHIgPT09ICcvJyB8fCBjaHIgPT09ICc/JyB8fCBjaHIgPT09ICcjJyB8fFxuICAgICAgICAgICAgKGNociA9PT0gJ1xcXFwnICYmIHVybC5pc1NwZWNpYWwoKSlcbiAgICAgICAgICApIHtcbiAgICAgICAgICAgIGlmIChzZWVuQXQgJiYgYnVmZmVyID09PSAnJykgcmV0dXJuIElOVkFMSURfQVVUSE9SSVRZO1xuICAgICAgICAgICAgcG9pbnRlciAtPSBhcnJheUZyb20oYnVmZmVyKS5sZW5ndGggKyAxO1xuICAgICAgICAgICAgYnVmZmVyID0gJyc7XG4gICAgICAgICAgICBzdGF0ZSA9IEhPU1Q7XG4gICAgICAgICAgfSBlbHNlIGJ1ZmZlciArPSBjaHI7XG4gICAgICAgICAgYnJlYWs7XG5cbiAgICAgICAgY2FzZSBIT1NUOlxuICAgICAgICBjYXNlIEhPU1ROQU1FOlxuICAgICAgICAgIGlmIChzdGF0ZU92ZXJyaWRlICYmIHVybC5zY2hlbWUgPT09ICdmaWxlJykge1xuICAgICAgICAgICAgc3RhdGUgPSBGSUxFX0hPU1Q7XG4gICAgICAgICAgICBjb250aW51ZTtcbiAgICAgICAgICB9IGVsc2UgaWYgKGNociA9PT0gJzonICYmICFzZWVuQnJhY2tldCkge1xuICAgICAgICAgICAgaWYgKGJ1ZmZlciA9PT0gJycpIHJldHVybiBJTlZBTElEX0hPU1Q7XG4gICAgICAgICAgICBmYWlsdXJlID0gdXJsLnBhcnNlSG9zdChidWZmZXIpO1xuICAgICAgICAgICAgaWYgKGZhaWx1cmUpIHJldHVybiBmYWlsdXJlO1xuICAgICAgICAgICAgYnVmZmVyID0gJyc7XG4gICAgICAgICAgICBzdGF0ZSA9IFBPUlQ7XG4gICAgICAgICAgICBpZiAoc3RhdGVPdmVycmlkZSA9PT0gSE9TVE5BTUUpIHJldHVybjtcbiAgICAgICAgICB9IGVsc2UgaWYgKFxuICAgICAgICAgICAgY2hyID09PSBFT0YgfHwgY2hyID09PSAnLycgfHwgY2hyID09PSAnPycgfHwgY2hyID09PSAnIycgfHxcbiAgICAgICAgICAgIChjaHIgPT09ICdcXFxcJyAmJiB1cmwuaXNTcGVjaWFsKCkpXG4gICAgICAgICAgKSB7XG4gICAgICAgICAgICBpZiAodXJsLmlzU3BlY2lhbCgpICYmIGJ1ZmZlciA9PT0gJycpIHJldHVybiBJTlZBTElEX0hPU1Q7XG4gICAgICAgICAgICBpZiAoc3RhdGVPdmVycmlkZSAmJiBidWZmZXIgPT09ICcnICYmICh1cmwuaW5jbHVkZXNDcmVkZW50aWFscygpIHx8IHVybC5wb3J0ICE9PSBudWxsKSkgcmV0dXJuO1xuICAgICAgICAgICAgZmFpbHVyZSA9IHVybC5wYXJzZUhvc3QoYnVmZmVyKTtcbiAgICAgICAgICAgIGlmIChmYWlsdXJlKSByZXR1cm4gZmFpbHVyZTtcbiAgICAgICAgICAgIGJ1ZmZlciA9ICcnO1xuICAgICAgICAgICAgc3RhdGUgPSBQQVRIX1NUQVJUO1xuICAgICAgICAgICAgaWYgKHN0YXRlT3ZlcnJpZGUpIHJldHVybjtcbiAgICAgICAgICAgIGNvbnRpbnVlO1xuICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICBpZiAoY2hyID09PSAnWycpIHNlZW5CcmFja2V0ID0gdHJ1ZTtcbiAgICAgICAgICAgIGVsc2UgaWYgKGNociA9PT0gJ10nKSBzZWVuQnJhY2tldCA9IGZhbHNlO1xuICAgICAgICAgICAgYnVmZmVyICs9IGNocjtcbiAgICAgICAgICB9IGJyZWFrO1xuXG4gICAgICAgIGNhc2UgUE9SVDpcbiAgICAgICAgICBpZiAoZXhlYyhESUdJVCwgY2hyKSkge1xuICAgICAgICAgICAgYnVmZmVyICs9IGNocjtcbiAgICAgICAgICB9IGVsc2UgaWYgKFxuICAgICAgICAgICAgY2hyID09PSBFT0YgfHwgY2hyID09PSAnLycgfHwgY2hyID09PSAnPycgfHwgY2hyID09PSAnIycgfHxcbiAgICAgICAgICAgIChjaHIgPT09ICdcXFxcJyAmJiB1cmwuaXNTcGVjaWFsKCkpIHx8XG4gICAgICAgICAgICBzdGF0ZU92ZXJyaWRlXG4gICAgICAgICAgKSB7XG4gICAgICAgICAgICBpZiAoYnVmZmVyICE9PSAnJykge1xuICAgICAgICAgICAgICB2YXIgcG9ydCA9IHBhcnNlSW50KGJ1ZmZlciwgMTApO1xuICAgICAgICAgICAgICBpZiAocG9ydCA+IDB4RkZGRikgcmV0dXJuIElOVkFMSURfUE9SVDtcbiAgICAgICAgICAgICAgdXJsLnBvcnQgPSAodXJsLmlzU3BlY2lhbCgpICYmIHBvcnQgPT09IHNwZWNpYWxTY2hlbWVzW3VybC5zY2hlbWVdKSA/IG51bGwgOiBwb3J0O1xuICAgICAgICAgICAgICBidWZmZXIgPSAnJztcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGlmIChzdGF0ZU92ZXJyaWRlKSByZXR1cm47XG4gICAgICAgICAgICBzdGF0ZSA9IFBBVEhfU1RBUlQ7XG4gICAgICAgICAgICBjb250aW51ZTtcbiAgICAgICAgICB9IGVsc2UgcmV0dXJuIElOVkFMSURfUE9SVDtcbiAgICAgICAgICBicmVhaztcblxuICAgICAgICBjYXNlIEZJTEU6XG4gICAgICAgICAgdXJsLnNjaGVtZSA9ICdmaWxlJztcbiAgICAgICAgICBpZiAoY2hyID09PSAnLycgfHwgY2hyID09PSAnXFxcXCcpIHN0YXRlID0gRklMRV9TTEFTSDtcbiAgICAgICAgICBlbHNlIGlmIChiYXNlICYmIGJhc2Uuc2NoZW1lID09PSAnZmlsZScpIHtcbiAgICAgICAgICAgIHN3aXRjaCAoY2hyKSB7XG4gICAgICAgICAgICAgIGNhc2UgRU9GOlxuICAgICAgICAgICAgICAgIHVybC5ob3N0ID0gYmFzZS5ob3N0O1xuICAgICAgICAgICAgICAgIHVybC5wYXRoID0gYXJyYXlTbGljZShiYXNlLnBhdGgpO1xuICAgICAgICAgICAgICAgIHVybC5xdWVyeSA9IGJhc2UucXVlcnk7XG4gICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICAgIGNhc2UgJz8nOlxuICAgICAgICAgICAgICAgIHVybC5ob3N0ID0gYmFzZS5ob3N0O1xuICAgICAgICAgICAgICAgIHVybC5wYXRoID0gYXJyYXlTbGljZShiYXNlLnBhdGgpO1xuICAgICAgICAgICAgICAgIHVybC5xdWVyeSA9ICcnO1xuICAgICAgICAgICAgICAgIHN0YXRlID0gUVVFUlk7XG4gICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICAgIGNhc2UgJyMnOlxuICAgICAgICAgICAgICAgIHVybC5ob3N0ID0gYmFzZS5ob3N0O1xuICAgICAgICAgICAgICAgIHVybC5wYXRoID0gYXJyYXlTbGljZShiYXNlLnBhdGgpO1xuICAgICAgICAgICAgICAgIHVybC5xdWVyeSA9IGJhc2UucXVlcnk7XG4gICAgICAgICAgICAgICAgdXJsLmZyYWdtZW50ID0gJyc7XG4gICAgICAgICAgICAgICAgc3RhdGUgPSBGUkFHTUVOVDtcbiAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgICAgZGVmYXVsdDpcbiAgICAgICAgICAgICAgICBpZiAoIXN0YXJ0c1dpdGhXaW5kb3dzRHJpdmVMZXR0ZXIoam9pbihhcnJheVNsaWNlKGNvZGVQb2ludHMsIHBvaW50ZXIpLCAnJykpKSB7XG4gICAgICAgICAgICAgICAgICB1cmwuaG9zdCA9IGJhc2UuaG9zdDtcbiAgICAgICAgICAgICAgICAgIHVybC5wYXRoID0gYXJyYXlTbGljZShiYXNlLnBhdGgpO1xuICAgICAgICAgICAgICAgICAgdXJsLnNob3J0ZW5QYXRoKCk7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIHN0YXRlID0gUEFUSDtcbiAgICAgICAgICAgICAgICBjb250aW51ZTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgc3RhdGUgPSBQQVRIO1xuICAgICAgICAgICAgY29udGludWU7XG4gICAgICAgICAgfSBicmVhaztcblxuICAgICAgICBjYXNlIEZJTEVfU0xBU0g6XG4gICAgICAgICAgaWYgKGNociA9PT0gJy8nIHx8IGNociA9PT0gJ1xcXFwnKSB7XG4gICAgICAgICAgICBzdGF0ZSA9IEZJTEVfSE9TVDtcbiAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgIH1cbiAgICAgICAgICBpZiAoYmFzZSAmJiBiYXNlLnNjaGVtZSA9PT0gJ2ZpbGUnICYmICFzdGFydHNXaXRoV2luZG93c0RyaXZlTGV0dGVyKGpvaW4oYXJyYXlTbGljZShjb2RlUG9pbnRzLCBwb2ludGVyKSwgJycpKSkge1xuICAgICAgICAgICAgaWYgKGlzV2luZG93c0RyaXZlTGV0dGVyKGJhc2UucGF0aFswXSwgdHJ1ZSkpIHB1c2godXJsLnBhdGgsIGJhc2UucGF0aFswXSk7XG4gICAgICAgICAgICBlbHNlIHVybC5ob3N0ID0gYmFzZS5ob3N0O1xuICAgICAgICAgIH1cbiAgICAgICAgICBzdGF0ZSA9IFBBVEg7XG4gICAgICAgICAgY29udGludWU7XG5cbiAgICAgICAgY2FzZSBGSUxFX0hPU1Q6XG4gICAgICAgICAgaWYgKGNociA9PT0gRU9GIHx8IGNociA9PT0gJy8nIHx8IGNociA9PT0gJ1xcXFwnIHx8IGNociA9PT0gJz8nIHx8IGNociA9PT0gJyMnKSB7XG4gICAgICAgICAgICBpZiAoIXN0YXRlT3ZlcnJpZGUgJiYgaXNXaW5kb3dzRHJpdmVMZXR0ZXIoYnVmZmVyKSkge1xuICAgICAgICAgICAgICBzdGF0ZSA9IFBBVEg7XG4gICAgICAgICAgICB9IGVsc2UgaWYgKGJ1ZmZlciA9PT0gJycpIHtcbiAgICAgICAgICAgICAgdXJsLmhvc3QgPSAnJztcbiAgICAgICAgICAgICAgaWYgKHN0YXRlT3ZlcnJpZGUpIHJldHVybjtcbiAgICAgICAgICAgICAgc3RhdGUgPSBQQVRIX1NUQVJUO1xuICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgZmFpbHVyZSA9IHVybC5wYXJzZUhvc3QoYnVmZmVyKTtcbiAgICAgICAgICAgICAgaWYgKGZhaWx1cmUpIHJldHVybiBmYWlsdXJlO1xuICAgICAgICAgICAgICBpZiAodXJsLmhvc3QgPT09ICdsb2NhbGhvc3QnKSB1cmwuaG9zdCA9ICcnO1xuICAgICAgICAgICAgICBpZiAoc3RhdGVPdmVycmlkZSkgcmV0dXJuO1xuICAgICAgICAgICAgICBidWZmZXIgPSAnJztcbiAgICAgICAgICAgICAgc3RhdGUgPSBQQVRIX1NUQVJUO1xuICAgICAgICAgICAgfSBjb250aW51ZTtcbiAgICAgICAgICB9IGVsc2UgYnVmZmVyICs9IGNocjtcbiAgICAgICAgICBicmVhaztcblxuICAgICAgICBjYXNlIFBBVEhfU1RBUlQ6XG4gICAgICAgICAgaWYgKHVybC5pc1NwZWNpYWwoKSkge1xuICAgICAgICAgICAgc3RhdGUgPSBQQVRIO1xuICAgICAgICAgICAgaWYgKGNociAhPT0gJy8nICYmIGNociAhPT0gJ1xcXFwnKSBjb250aW51ZTtcbiAgICAgICAgICB9IGVsc2UgaWYgKCFzdGF0ZU92ZXJyaWRlICYmIGNociA9PT0gJz8nKSB7XG4gICAgICAgICAgICB1cmwucXVlcnkgPSAnJztcbiAgICAgICAgICAgIHN0YXRlID0gUVVFUlk7XG4gICAgICAgICAgfSBlbHNlIGlmICghc3RhdGVPdmVycmlkZSAmJiBjaHIgPT09ICcjJykge1xuICAgICAgICAgICAgdXJsLmZyYWdtZW50ID0gJyc7XG4gICAgICAgICAgICBzdGF0ZSA9IEZSQUdNRU5UO1xuICAgICAgICAgIH0gZWxzZSBpZiAoY2hyICE9PSBFT0YpIHtcbiAgICAgICAgICAgIHN0YXRlID0gUEFUSDtcbiAgICAgICAgICAgIGlmIChjaHIgIT09ICcvJykgY29udGludWU7XG4gICAgICAgICAgfSBicmVhaztcblxuICAgICAgICBjYXNlIFBBVEg6XG4gICAgICAgICAgaWYgKFxuICAgICAgICAgICAgY2hyID09PSBFT0YgfHwgY2hyID09PSAnLycgfHxcbiAgICAgICAgICAgIChjaHIgPT09ICdcXFxcJyAmJiB1cmwuaXNTcGVjaWFsKCkpIHx8XG4gICAgICAgICAgICAoIXN0YXRlT3ZlcnJpZGUgJiYgKGNociA9PT0gJz8nIHx8IGNociA9PT0gJyMnKSlcbiAgICAgICAgICApIHtcbiAgICAgICAgICAgIGlmIChpc0RvdWJsZURvdChidWZmZXIpKSB7XG4gICAgICAgICAgICAgIHVybC5zaG9ydGVuUGF0aCgpO1xuICAgICAgICAgICAgICBpZiAoY2hyICE9PSAnLycgJiYgIShjaHIgPT09ICdcXFxcJyAmJiB1cmwuaXNTcGVjaWFsKCkpKSB7XG4gICAgICAgICAgICAgICAgcHVzaCh1cmwucGF0aCwgJycpO1xuICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9IGVsc2UgaWYgKGlzU2luZ2xlRG90KGJ1ZmZlcikpIHtcbiAgICAgICAgICAgICAgaWYgKGNociAhPT0gJy8nICYmICEoY2hyID09PSAnXFxcXCcgJiYgdXJsLmlzU3BlY2lhbCgpKSkge1xuICAgICAgICAgICAgICAgIHB1c2godXJsLnBhdGgsICcnKTtcbiAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgaWYgKHVybC5zY2hlbWUgPT09ICdmaWxlJyAmJiAhdXJsLnBhdGgubGVuZ3RoICYmIGlzV2luZG93c0RyaXZlTGV0dGVyKGJ1ZmZlcikpIHtcbiAgICAgICAgICAgICAgICBpZiAodXJsLmhvc3QpIHVybC5ob3N0ID0gJyc7XG4gICAgICAgICAgICAgICAgYnVmZmVyID0gY2hhckF0KGJ1ZmZlciwgMCkgKyAnOic7IC8vIG5vcm1hbGl6ZSB3aW5kb3dzIGRyaXZlIGxldHRlclxuICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgIHB1c2godXJsLnBhdGgsIGJ1ZmZlcik7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBidWZmZXIgPSAnJztcbiAgICAgICAgICAgIGlmICh1cmwuc2NoZW1lID09PSAnZmlsZScgJiYgKGNociA9PT0gRU9GIHx8IGNociA9PT0gJz8nIHx8IGNociA9PT0gJyMnKSkge1xuICAgICAgICAgICAgICB3aGlsZSAodXJsLnBhdGgubGVuZ3RoID4gMSAmJiB1cmwucGF0aFswXSA9PT0gJycpIHtcbiAgICAgICAgICAgICAgICBzaGlmdCh1cmwucGF0aCk7XG4gICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGlmIChjaHIgPT09ICc/Jykge1xuICAgICAgICAgICAgICB1cmwucXVlcnkgPSAnJztcbiAgICAgICAgICAgICAgc3RhdGUgPSBRVUVSWTtcbiAgICAgICAgICAgIH0gZWxzZSBpZiAoY2hyID09PSAnIycpIHtcbiAgICAgICAgICAgICAgdXJsLmZyYWdtZW50ID0gJyc7XG4gICAgICAgICAgICAgIHN0YXRlID0gRlJBR01FTlQ7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgIGJ1ZmZlciArPSBwZXJjZW50RW5jb2RlKGNociwgcGF0aFBlcmNlbnRFbmNvZGVTZXQpO1xuICAgICAgICAgIH0gYnJlYWs7XG5cbiAgICAgICAgY2FzZSBDQU5OT1RfQkVfQV9CQVNFX1VSTF9QQVRIOlxuICAgICAgICAgIGlmIChjaHIgPT09ICc/Jykge1xuICAgICAgICAgICAgdXJsLnF1ZXJ5ID0gJyc7XG4gICAgICAgICAgICBzdGF0ZSA9IFFVRVJZO1xuICAgICAgICAgIH0gZWxzZSBpZiAoY2hyID09PSAnIycpIHtcbiAgICAgICAgICAgIHVybC5mcmFnbWVudCA9ICcnO1xuICAgICAgICAgICAgc3RhdGUgPSBGUkFHTUVOVDtcbiAgICAgICAgICB9IGVsc2UgaWYgKGNociAhPT0gRU9GKSB7XG4gICAgICAgICAgICB1cmwucGF0aFswXSArPSBwZXJjZW50RW5jb2RlKGNociwgQzBDb250cm9sUGVyY2VudEVuY29kZVNldCk7XG4gICAgICAgICAgfSBicmVhaztcblxuICAgICAgICBjYXNlIFFVRVJZOlxuICAgICAgICAgIGlmICghc3RhdGVPdmVycmlkZSAmJiBjaHIgPT09ICcjJykge1xuICAgICAgICAgICAgdXJsLmZyYWdtZW50ID0gJyc7XG4gICAgICAgICAgICBzdGF0ZSA9IEZSQUdNRU5UO1xuICAgICAgICAgIH0gZWxzZSBpZiAoY2hyICE9PSBFT0YpIHtcbiAgICAgICAgICAgIGlmIChjaHIgPT09IFwiJ1wiICYmIHVybC5pc1NwZWNpYWwoKSkgdXJsLnF1ZXJ5ICs9ICclMjcnO1xuICAgICAgICAgICAgZWxzZSBpZiAoY2hyID09PSAnIycpIHVybC5xdWVyeSArPSAnJTIzJztcbiAgICAgICAgICAgIGVsc2UgdXJsLnF1ZXJ5ICs9IHBlcmNlbnRFbmNvZGUoY2hyLCBDMENvbnRyb2xQZXJjZW50RW5jb2RlU2V0KTtcbiAgICAgICAgICB9IGJyZWFrO1xuXG4gICAgICAgIGNhc2UgRlJBR01FTlQ6XG4gICAgICAgICAgaWYgKGNociAhPT0gRU9GKSB1cmwuZnJhZ21lbnQgKz0gcGVyY2VudEVuY29kZShjaHIsIGZyYWdtZW50UGVyY2VudEVuY29kZVNldCk7XG4gICAgICAgICAgYnJlYWs7XG4gICAgICB9XG5cbiAgICAgIHBvaW50ZXIrKztcbiAgICB9XG4gIH0sXG4gIC8vIGh0dHBzOi8vdXJsLnNwZWMud2hhdHdnLm9yZy8jaG9zdC1wYXJzaW5nXG4gIHBhcnNlSG9zdDogZnVuY3Rpb24gKGlucHV0KSB7XG4gICAgdmFyIHJlc3VsdCwgY29kZVBvaW50cywgaW5kZXg7XG4gICAgaWYgKGNoYXJBdChpbnB1dCwgMCkgPT09ICdbJykge1xuICAgICAgaWYgKGNoYXJBdChpbnB1dCwgaW5wdXQubGVuZ3RoIC0gMSkgIT09ICddJykgcmV0dXJuIElOVkFMSURfSE9TVDtcbiAgICAgIHJlc3VsdCA9IHBhcnNlSVB2NihzdHJpbmdTbGljZShpbnB1dCwgMSwgLTEpKTtcbiAgICAgIGlmICghcmVzdWx0KSByZXR1cm4gSU5WQUxJRF9IT1NUO1xuICAgICAgdGhpcy5ob3N0ID0gcmVzdWx0O1xuICAgIC8vIG9wYXF1ZSBob3N0XG4gICAgfSBlbHNlIGlmICghdGhpcy5pc1NwZWNpYWwoKSkge1xuICAgICAgaWYgKGV4ZWMoRk9SQklEREVOX0hPU1RfQ09ERV9QT0lOVF9FWENMVURJTkdfUEVSQ0VOVCwgaW5wdXQpKSByZXR1cm4gSU5WQUxJRF9IT1NUO1xuICAgICAgcmVzdWx0ID0gJyc7XG4gICAgICBjb2RlUG9pbnRzID0gYXJyYXlGcm9tKGlucHV0KTtcbiAgICAgIGZvciAoaW5kZXggPSAwOyBpbmRleCA8IGNvZGVQb2ludHMubGVuZ3RoOyBpbmRleCsrKSB7XG4gICAgICAgIHJlc3VsdCArPSBwZXJjZW50RW5jb2RlKGNvZGVQb2ludHNbaW5kZXhdLCBDMENvbnRyb2xQZXJjZW50RW5jb2RlU2V0KTtcbiAgICAgIH1cbiAgICAgIHRoaXMuaG9zdCA9IHJlc3VsdDtcbiAgICB9IGVsc2Uge1xuICAgICAgaW5wdXQgPSB0b0FTQ0lJKGlucHV0KTtcbiAgICAgIGlmIChleGVjKEZPUkJJRERFTl9IT1NUX0NPREVfUE9JTlQsIGlucHV0KSkgcmV0dXJuIElOVkFMSURfSE9TVDtcbiAgICAgIHJlc3VsdCA9IHBhcnNlSVB2NChpbnB1dCk7XG4gICAgICBpZiAocmVzdWx0ID09PSBudWxsKSByZXR1cm4gSU5WQUxJRF9IT1NUO1xuICAgICAgdGhpcy5ob3N0ID0gcmVzdWx0O1xuICAgIH1cbiAgfSxcbiAgLy8gaHR0cHM6Ly91cmwuc3BlYy53aGF0d2cub3JnLyNjYW5ub3QtaGF2ZS1hLXVzZXJuYW1lLXBhc3N3b3JkLXBvcnRcbiAgY2Fubm90SGF2ZVVzZXJuYW1lUGFzc3dvcmRQb3J0OiBmdW5jdGlvbiAoKSB7XG4gICAgcmV0dXJuICF0aGlzLmhvc3QgfHwgdGhpcy5jYW5ub3RCZUFCYXNlVVJMIHx8IHRoaXMuc2NoZW1lID09PSAnZmlsZSc7XG4gIH0sXG4gIC8vIGh0dHBzOi8vdXJsLnNwZWMud2hhdHdnLm9yZy8jaW5jbHVkZS1jcmVkZW50aWFsc1xuICBpbmNsdWRlc0NyZWRlbnRpYWxzOiBmdW5jdGlvbiAoKSB7XG4gICAgcmV0dXJuIHRoaXMudXNlcm5hbWUgIT09ICcnIHx8IHRoaXMucGFzc3dvcmQgIT09ICcnO1xuICB9LFxuICAvLyBodHRwczovL3VybC5zcGVjLndoYXR3Zy5vcmcvI2lzLXNwZWNpYWxcbiAgaXNTcGVjaWFsOiBmdW5jdGlvbiAoKSB7XG4gICAgcmV0dXJuIGhhc093bihzcGVjaWFsU2NoZW1lcywgdGhpcy5zY2hlbWUpO1xuICB9LFxuICAvLyBodHRwczovL3VybC5zcGVjLndoYXR3Zy5vcmcvI3Nob3J0ZW4tYS11cmxzLXBhdGhcbiAgc2hvcnRlblBhdGg6IGZ1bmN0aW9uICgpIHtcbiAgICB2YXIgcGF0aCA9IHRoaXMucGF0aDtcbiAgICB2YXIgcGF0aFNpemUgPSBwYXRoLmxlbmd0aDtcbiAgICBpZiAocGF0aFNpemUgJiYgKHRoaXMuc2NoZW1lICE9PSAnZmlsZScgfHwgcGF0aFNpemUgIT09IDEgfHwgIWlzV2luZG93c0RyaXZlTGV0dGVyKHBhdGhbMF0sIHRydWUpKSkge1xuICAgICAgcGF0aC5sZW5ndGgtLTtcbiAgICB9XG4gIH0sXG4gIC8vIGh0dHBzOi8vdXJsLnNwZWMud2hhdHdnLm9yZy8jY29uY2VwdC11cmwtc2VyaWFsaXplclxuICBzZXJpYWxpemU6IGZ1bmN0aW9uICgpIHtcbiAgICB2YXIgdXJsID0gdGhpcztcbiAgICB2YXIgc2NoZW1lID0gdXJsLnNjaGVtZTtcbiAgICB2YXIgdXNlcm5hbWUgPSB1cmwudXNlcm5hbWU7XG4gICAgdmFyIHBhc3N3b3JkID0gdXJsLnBhc3N3b3JkO1xuICAgIHZhciBob3N0ID0gdXJsLmhvc3Q7XG4gICAgdmFyIHBvcnQgPSB1cmwucG9ydDtcbiAgICB2YXIgcGF0aCA9IHVybC5wYXRoO1xuICAgIHZhciBxdWVyeSA9IHVybC5xdWVyeTtcbiAgICB2YXIgZnJhZ21lbnQgPSB1cmwuZnJhZ21lbnQ7XG4gICAgdmFyIG91dHB1dCA9IHNjaGVtZSArICc6JztcbiAgICBpZiAoaG9zdCAhPT0gbnVsbCkge1xuICAgICAgb3V0cHV0ICs9ICcvLyc7XG4gICAgICBpZiAodXJsLmluY2x1ZGVzQ3JlZGVudGlhbHMoKSkge1xuICAgICAgICBvdXRwdXQgKz0gdXNlcm5hbWUgKyAocGFzc3dvcmQgPyAnOicgKyBwYXNzd29yZCA6ICcnKSArICdAJztcbiAgICAgIH1cbiAgICAgIG91dHB1dCArPSBzZXJpYWxpemVIb3N0KGhvc3QpO1xuICAgICAgaWYgKHBvcnQgIT09IG51bGwpIG91dHB1dCArPSAnOicgKyBwb3J0O1xuICAgIH0gZWxzZSBpZiAoc2NoZW1lID09PSAnZmlsZScpIG91dHB1dCArPSAnLy8nO1xuICAgIG91dHB1dCArPSB1cmwuY2Fubm90QmVBQmFzZVVSTCA/IHBhdGhbMF0gOiBwYXRoLmxlbmd0aCA/ICcvJyArIGpvaW4ocGF0aCwgJy8nKSA6ICcnO1xuICAgIGlmIChxdWVyeSAhPT0gbnVsbCkgb3V0cHV0ICs9ICc/JyArIHF1ZXJ5O1xuICAgIGlmIChmcmFnbWVudCAhPT0gbnVsbCkgb3V0cHV0ICs9ICcjJyArIGZyYWdtZW50O1xuICAgIHJldHVybiBvdXRwdXQ7XG4gIH0sXG4gIC8vIGh0dHBzOi8vdXJsLnNwZWMud2hhdHdnLm9yZy8jZG9tLXVybC1ocmVmXG4gIHNldEhyZWY6IGZ1bmN0aW9uIChocmVmKSB7XG4gICAgdmFyIGZhaWx1cmUgPSB0aGlzLnBhcnNlKGhyZWYpO1xuICAgIGlmIChmYWlsdXJlKSB0aHJvdyBuZXcgVHlwZUVycm9yKGZhaWx1cmUpO1xuICAgIHRoaXMuc2VhcmNoUGFyYW1zLnVwZGF0ZSgpO1xuICB9LFxuICAvLyBodHRwczovL3VybC5zcGVjLndoYXR3Zy5vcmcvI2RvbS11cmwtb3JpZ2luXG4gIGdldE9yaWdpbjogZnVuY3Rpb24gKCkge1xuICAgIHZhciBzY2hlbWUgPSB0aGlzLnNjaGVtZTtcbiAgICB2YXIgcG9ydCA9IHRoaXMucG9ydDtcbiAgICBpZiAoc2NoZW1lID09PSAnYmxvYicpIHRyeSB7XG4gICAgICByZXR1cm4gbmV3IFVSTENvbnN0cnVjdG9yKHNjaGVtZS5wYXRoWzBdKS5vcmlnaW47XG4gICAgfSBjYXRjaCAoZXJyb3IpIHtcbiAgICAgIHJldHVybiAnbnVsbCc7XG4gICAgfVxuICAgIGlmIChzY2hlbWUgPT09ICdmaWxlJyB8fCAhdGhpcy5pc1NwZWNpYWwoKSkgcmV0dXJuICdudWxsJztcbiAgICByZXR1cm4gc2NoZW1lICsgJzovLycgKyBzZXJpYWxpemVIb3N0KHRoaXMuaG9zdCkgKyAocG9ydCAhPT0gbnVsbCA/ICc6JyArIHBvcnQgOiAnJyk7XG4gIH0sXG4gIC8vIGh0dHBzOi8vdXJsLnNwZWMud2hhdHdnLm9yZy8jZG9tLXVybC1wcm90b2NvbFxuICBnZXRQcm90b2NvbDogZnVuY3Rpb24gKCkge1xuICAgIHJldHVybiB0aGlzLnNjaGVtZSArICc6JztcbiAgfSxcbiAgc2V0UHJvdG9jb2w6IGZ1bmN0aW9uIChwcm90b2NvbCkge1xuICAgIHRoaXMucGFyc2UoJHRvU3RyaW5nKHByb3RvY29sKSArICc6JywgU0NIRU1FX1NUQVJUKTtcbiAgfSxcbiAgLy8gaHR0cHM6Ly91cmwuc3BlYy53aGF0d2cub3JnLyNkb20tdXJsLXVzZXJuYW1lXG4gIGdldFVzZXJuYW1lOiBmdW5jdGlvbiAoKSB7XG4gICAgcmV0dXJuIHRoaXMudXNlcm5hbWU7XG4gIH0sXG4gIHNldFVzZXJuYW1lOiBmdW5jdGlvbiAodXNlcm5hbWUpIHtcbiAgICB2YXIgY29kZVBvaW50cyA9IGFycmF5RnJvbSgkdG9TdHJpbmcodXNlcm5hbWUpKTtcbiAgICBpZiAodGhpcy5jYW5ub3RIYXZlVXNlcm5hbWVQYXNzd29yZFBvcnQoKSkgcmV0dXJuO1xuICAgIHRoaXMudXNlcm5hbWUgPSAnJztcbiAgICBmb3IgKHZhciBpID0gMDsgaSA8IGNvZGVQb2ludHMubGVuZ3RoOyBpKyspIHtcbiAgICAgIHRoaXMudXNlcm5hbWUgKz0gcGVyY2VudEVuY29kZShjb2RlUG9pbnRzW2ldLCB1c2VyaW5mb1BlcmNlbnRFbmNvZGVTZXQpO1xuICAgIH1cbiAgfSxcbiAgLy8gaHR0cHM6Ly91cmwuc3BlYy53aGF0d2cub3JnLyNkb20tdXJsLXBhc3N3b3JkXG4gIGdldFBhc3N3b3JkOiBmdW5jdGlvbiAoKSB7XG4gICAgcmV0dXJuIHRoaXMucGFzc3dvcmQ7XG4gIH0sXG4gIHNldFBhc3N3b3JkOiBmdW5jdGlvbiAocGFzc3dvcmQpIHtcbiAgICB2YXIgY29kZVBvaW50cyA9IGFycmF5RnJvbSgkdG9TdHJpbmcocGFzc3dvcmQpKTtcbiAgICBpZiAodGhpcy5jYW5ub3RIYXZlVXNlcm5hbWVQYXNzd29yZFBvcnQoKSkgcmV0dXJuO1xuICAgIHRoaXMucGFzc3dvcmQgPSAnJztcbiAgICBmb3IgKHZhciBpID0gMDsgaSA8IGNvZGVQb2ludHMubGVuZ3RoOyBpKyspIHtcbiAgICAgIHRoaXMucGFzc3dvcmQgKz0gcGVyY2VudEVuY29kZShjb2RlUG9pbnRzW2ldLCB1c2VyaW5mb1BlcmNlbnRFbmNvZGVTZXQpO1xuICAgIH1cbiAgfSxcbiAgLy8gaHR0cHM6Ly91cmwuc3BlYy53aGF0d2cub3JnLyNkb20tdXJsLWhvc3RcbiAgZ2V0SG9zdDogZnVuY3Rpb24gKCkge1xuICAgIHZhciBob3N0ID0gdGhpcy5ob3N0O1xuICAgIHZhciBwb3J0ID0gdGhpcy5wb3J0O1xuICAgIHJldHVybiBob3N0ID09PSBudWxsID8gJydcbiAgICAgIDogcG9ydCA9PT0gbnVsbCA/IHNlcmlhbGl6ZUhvc3QoaG9zdClcbiAgICAgIDogc2VyaWFsaXplSG9zdChob3N0KSArICc6JyArIHBvcnQ7XG4gIH0sXG4gIHNldEhvc3Q6IGZ1bmN0aW9uIChob3N0KSB7XG4gICAgaWYgKHRoaXMuY2Fubm90QmVBQmFzZVVSTCkgcmV0dXJuO1xuICAgIHRoaXMucGFyc2UoaG9zdCwgSE9TVCk7XG4gIH0sXG4gIC8vIGh0dHBzOi8vdXJsLnNwZWMud2hhdHdnLm9yZy8jZG9tLXVybC1ob3N0bmFtZVxuICBnZXRIb3N0bmFtZTogZnVuY3Rpb24gKCkge1xuICAgIHZhciBob3N0ID0gdGhpcy5ob3N0O1xuICAgIHJldHVybiBob3N0ID09PSBudWxsID8gJycgOiBzZXJpYWxpemVIb3N0KGhvc3QpO1xuICB9LFxuICBzZXRIb3N0bmFtZTogZnVuY3Rpb24gKGhvc3RuYW1lKSB7XG4gICAgaWYgKHRoaXMuY2Fubm90QmVBQmFzZVVSTCkgcmV0dXJuO1xuICAgIHRoaXMucGFyc2UoaG9zdG5hbWUsIEhPU1ROQU1FKTtcbiAgfSxcbiAgLy8gaHR0cHM6Ly91cmwuc3BlYy53aGF0d2cub3JnLyNkb20tdXJsLXBvcnRcbiAgZ2V0UG9ydDogZnVuY3Rpb24gKCkge1xuICAgIHZhciBwb3J0ID0gdGhpcy5wb3J0O1xuICAgIHJldHVybiBwb3J0ID09PSBudWxsID8gJycgOiAkdG9TdHJpbmcocG9ydCk7XG4gIH0sXG4gIHNldFBvcnQ6IGZ1bmN0aW9uIChwb3J0KSB7XG4gICAgaWYgKHRoaXMuY2Fubm90SGF2ZVVzZXJuYW1lUGFzc3dvcmRQb3J0KCkpIHJldHVybjtcbiAgICBwb3J0ID0gJHRvU3RyaW5nKHBvcnQpO1xuICAgIGlmIChwb3J0ID09PSAnJykgdGhpcy5wb3J0ID0gbnVsbDtcbiAgICBlbHNlIHRoaXMucGFyc2UocG9ydCwgUE9SVCk7XG4gIH0sXG4gIC8vIGh0dHBzOi8vdXJsLnNwZWMud2hhdHdnLm9yZy8jZG9tLXVybC1wYXRobmFtZVxuICBnZXRQYXRobmFtZTogZnVuY3Rpb24gKCkge1xuICAgIHZhciBwYXRoID0gdGhpcy5wYXRoO1xuICAgIHJldHVybiB0aGlzLmNhbm5vdEJlQUJhc2VVUkwgPyBwYXRoWzBdIDogcGF0aC5sZW5ndGggPyAnLycgKyBqb2luKHBhdGgsICcvJykgOiAnJztcbiAgfSxcbiAgc2V0UGF0aG5hbWU6IGZ1bmN0aW9uIChwYXRobmFtZSkge1xuICAgIGlmICh0aGlzLmNhbm5vdEJlQUJhc2VVUkwpIHJldHVybjtcbiAgICB0aGlzLnBhdGggPSBbXTtcbiAgICB0aGlzLnBhcnNlKHBhdGhuYW1lLCBQQVRIX1NUQVJUKTtcbiAgfSxcbiAgLy8gaHR0cHM6Ly91cmwuc3BlYy53aGF0d2cub3JnLyNkb20tdXJsLXNlYXJjaFxuICBnZXRTZWFyY2g6IGZ1bmN0aW9uICgpIHtcbiAgICB2YXIgcXVlcnkgPSB0aGlzLnF1ZXJ5O1xuICAgIHJldHVybiBxdWVyeSA/ICc/JyArIHF1ZXJ5IDogJyc7XG4gIH0sXG4gIHNldFNlYXJjaDogZnVuY3Rpb24gKHNlYXJjaCkge1xuICAgIHNlYXJjaCA9ICR0b1N0cmluZyhzZWFyY2gpO1xuICAgIGlmIChzZWFyY2ggPT09ICcnKSB7XG4gICAgICB0aGlzLnF1ZXJ5ID0gbnVsbDtcbiAgICB9IGVsc2Uge1xuICAgICAgaWYgKGNoYXJBdChzZWFyY2gsIDApID09PSAnPycpIHNlYXJjaCA9IHN0cmluZ1NsaWNlKHNlYXJjaCwgMSk7XG4gICAgICB0aGlzLnF1ZXJ5ID0gJyc7XG4gICAgICB0aGlzLnBhcnNlKHNlYXJjaCwgUVVFUlkpO1xuICAgIH1cbiAgICB0aGlzLnNlYXJjaFBhcmFtcy51cGRhdGUoKTtcbiAgfSxcbiAgLy8gaHR0cHM6Ly91cmwuc3BlYy53aGF0d2cub3JnLyNkb20tdXJsLXNlYXJjaHBhcmFtc1xuICBnZXRTZWFyY2hQYXJhbXM6IGZ1bmN0aW9uICgpIHtcbiAgICByZXR1cm4gdGhpcy5zZWFyY2hQYXJhbXMuZmFjYWRlO1xuICB9LFxuICAvLyBodHRwczovL3VybC5zcGVjLndoYXR3Zy5vcmcvI2RvbS11cmwtaGFzaFxuICBnZXRIYXNoOiBmdW5jdGlvbiAoKSB7XG4gICAgdmFyIGZyYWdtZW50ID0gdGhpcy5mcmFnbWVudDtcbiAgICByZXR1cm4gZnJhZ21lbnQgPyAnIycgKyBmcmFnbWVudCA6ICcnO1xuICB9LFxuICBzZXRIYXNoOiBmdW5jdGlvbiAoaGFzaCkge1xuICAgIGhhc2ggPSAkdG9TdHJpbmcoaGFzaCk7XG4gICAgaWYgKGhhc2ggPT09ICcnKSB7XG4gICAgICB0aGlzLmZyYWdtZW50ID0gbnVsbDtcbiAgICAgIHJldHVybjtcbiAgICB9XG4gICAgaWYgKGNoYXJBdChoYXNoLCAwKSA9PT0gJyMnKSBoYXNoID0gc3RyaW5nU2xpY2UoaGFzaCwgMSk7XG4gICAgdGhpcy5mcmFnbWVudCA9ICcnO1xuICAgIHRoaXMucGFyc2UoaGFzaCwgRlJBR01FTlQpO1xuICB9LFxuICB1cGRhdGU6IGZ1bmN0aW9uICgpIHtcbiAgICB0aGlzLnF1ZXJ5ID0gdGhpcy5zZWFyY2hQYXJhbXMuc2VyaWFsaXplKCkgfHwgbnVsbDtcbiAgfVxufTtcblxuLy8gYFVSTGAgY29uc3RydWN0b3Jcbi8vIGh0dHBzOi8vdXJsLnNwZWMud2hhdHdnLm9yZy8jdXJsLWNsYXNzXG52YXIgVVJMQ29uc3RydWN0b3IgPSBmdW5jdGlvbiBVUkwodXJsIC8qICwgYmFzZSAqLykge1xuICB2YXIgdGhhdCA9IGFuSW5zdGFuY2UodGhpcywgVVJMUHJvdG90eXBlKTtcbiAgdmFyIGJhc2UgPSB2YWxpZGF0ZUFyZ3VtZW50c0xlbmd0aChhcmd1bWVudHMubGVuZ3RoLCAxKSA+IDEgPyBhcmd1bWVudHNbMV0gOiB1bmRlZmluZWQ7XG4gIHZhciBzdGF0ZSA9IHNldEludGVybmFsU3RhdGUodGhhdCwgbmV3IFVSTFN0YXRlKHVybCwgZmFsc2UsIGJhc2UpKTtcbiAgaWYgKCFERVNDUklQVE9SUykge1xuICAgIHRoYXQuaHJlZiA9IHN0YXRlLnNlcmlhbGl6ZSgpO1xuICAgIHRoYXQub3JpZ2luID0gc3RhdGUuZ2V0T3JpZ2luKCk7XG4gICAgdGhhdC5wcm90b2NvbCA9IHN0YXRlLmdldFByb3RvY29sKCk7XG4gICAgdGhhdC51c2VybmFtZSA9IHN0YXRlLmdldFVzZXJuYW1lKCk7XG4gICAgdGhhdC5wYXNzd29yZCA9IHN0YXRlLmdldFBhc3N3b3JkKCk7XG4gICAgdGhhdC5ob3N0ID0gc3RhdGUuZ2V0SG9zdCgpO1xuICAgIHRoYXQuaG9zdG5hbWUgPSBzdGF0ZS5nZXRIb3N0bmFtZSgpO1xuICAgIHRoYXQucG9ydCA9IHN0YXRlLmdldFBvcnQoKTtcbiAgICB0aGF0LnBhdGhuYW1lID0gc3RhdGUuZ2V0UGF0aG5hbWUoKTtcbiAgICB0aGF0LnNlYXJjaCA9IHN0YXRlLmdldFNlYXJjaCgpO1xuICAgIHRoYXQuc2VhcmNoUGFyYW1zID0gc3RhdGUuZ2V0U2VhcmNoUGFyYW1zKCk7XG4gICAgdGhhdC5oYXNoID0gc3RhdGUuZ2V0SGFzaCgpO1xuICB9XG59O1xuXG52YXIgVVJMUHJvdG90eXBlID0gVVJMQ29uc3RydWN0b3IucHJvdG90eXBlO1xuXG52YXIgYWNjZXNzb3JEZXNjcmlwdG9yID0gZnVuY3Rpb24gKGdldHRlciwgc2V0dGVyKSB7XG4gIHJldHVybiB7XG4gICAgZ2V0OiBmdW5jdGlvbiAoKSB7XG4gICAgICByZXR1cm4gZ2V0SW50ZXJuYWxVUkxTdGF0ZSh0aGlzKVtnZXR0ZXJdKCk7XG4gICAgfSxcbiAgICBzZXQ6IHNldHRlciAmJiBmdW5jdGlvbiAodmFsdWUpIHtcbiAgICAgIHJldHVybiBnZXRJbnRlcm5hbFVSTFN0YXRlKHRoaXMpW3NldHRlcl0odmFsdWUpO1xuICAgIH0sXG4gICAgY29uZmlndXJhYmxlOiB0cnVlLFxuICAgIGVudW1lcmFibGU6IHRydWVcbiAgfTtcbn07XG5cbmlmIChERVNDUklQVE9SUykge1xuICAvLyBgVVJMLnByb3RvdHlwZS5ocmVmYCBhY2Nlc3NvcnMgcGFpclxuICAvLyBodHRwczovL3VybC5zcGVjLndoYXR3Zy5vcmcvI2RvbS11cmwtaHJlZlxuICBkZWZpbmVCdWlsdEluQWNjZXNzb3IoVVJMUHJvdG90eXBlLCAnaHJlZicsIGFjY2Vzc29yRGVzY3JpcHRvcignc2VyaWFsaXplJywgJ3NldEhyZWYnKSk7XG4gIC8vIGBVUkwucHJvdG90eXBlLm9yaWdpbmAgZ2V0dGVyXG4gIC8vIGh0dHBzOi8vdXJsLnNwZWMud2hhdHdnLm9yZy8jZG9tLXVybC1vcmlnaW5cbiAgZGVmaW5lQnVpbHRJbkFjY2Vzc29yKFVSTFByb3RvdHlwZSwgJ29yaWdpbicsIGFjY2Vzc29yRGVzY3JpcHRvcignZ2V0T3JpZ2luJykpO1xuICAvLyBgVVJMLnByb3RvdHlwZS5wcm90b2NvbGAgYWNjZXNzb3JzIHBhaXJcbiAgLy8gaHR0cHM6Ly91cmwuc3BlYy53aGF0d2cub3JnLyNkb20tdXJsLXByb3RvY29sXG4gIGRlZmluZUJ1aWx0SW5BY2Nlc3NvcihVUkxQcm90b3R5cGUsICdwcm90b2NvbCcsIGFjY2Vzc29yRGVzY3JpcHRvcignZ2V0UHJvdG9jb2wnLCAnc2V0UHJvdG9jb2wnKSk7XG4gIC8vIGBVUkwucHJvdG90eXBlLnVzZXJuYW1lYCBhY2Nlc3NvcnMgcGFpclxuICAvLyBodHRwczovL3VybC5zcGVjLndoYXR3Zy5vcmcvI2RvbS11cmwtdXNlcm5hbWVcbiAgZGVmaW5lQnVpbHRJbkFjY2Vzc29yKFVSTFByb3RvdHlwZSwgJ3VzZXJuYW1lJywgYWNjZXNzb3JEZXNjcmlwdG9yKCdnZXRVc2VybmFtZScsICdzZXRVc2VybmFtZScpKTtcbiAgLy8gYFVSTC5wcm90b3R5cGUucGFzc3dvcmRgIGFjY2Vzc29ycyBwYWlyXG4gIC8vIGh0dHBzOi8vdXJsLnNwZWMud2hhdHdnLm9yZy8jZG9tLXVybC1wYXNzd29yZFxuICBkZWZpbmVCdWlsdEluQWNjZXNzb3IoVVJMUHJvdG90eXBlLCAncGFzc3dvcmQnLCBhY2Nlc3NvckRlc2NyaXB0b3IoJ2dldFBhc3N3b3JkJywgJ3NldFBhc3N3b3JkJykpO1xuICAvLyBgVVJMLnByb3RvdHlwZS5ob3N0YCBhY2Nlc3NvcnMgcGFpclxuICAvLyBodHRwczovL3VybC5zcGVjLndoYXR3Zy5vcmcvI2RvbS11cmwtaG9zdFxuICBkZWZpbmVCdWlsdEluQWNjZXNzb3IoVVJMUHJvdG90eXBlLCAnaG9zdCcsIGFjY2Vzc29yRGVzY3JpcHRvcignZ2V0SG9zdCcsICdzZXRIb3N0JykpO1xuICAvLyBgVVJMLnByb3RvdHlwZS5ob3N0bmFtZWAgYWNjZXNzb3JzIHBhaXJcbiAgLy8gaHR0cHM6Ly91cmwuc3BlYy53aGF0d2cub3JnLyNkb20tdXJsLWhvc3RuYW1lXG4gIGRlZmluZUJ1aWx0SW5BY2Nlc3NvcihVUkxQcm90b3R5cGUsICdob3N0bmFtZScsIGFjY2Vzc29yRGVzY3JpcHRvcignZ2V0SG9zdG5hbWUnLCAnc2V0SG9zdG5hbWUnKSk7XG4gIC8vIGBVUkwucHJvdG90eXBlLnBvcnRgIGFjY2Vzc29ycyBwYWlyXG4gIC8vIGh0dHBzOi8vdXJsLnNwZWMud2hhdHdnLm9yZy8jZG9tLXVybC1wb3J0XG4gIGRlZmluZUJ1aWx0SW5BY2Nlc3NvcihVUkxQcm90b3R5cGUsICdwb3J0JywgYWNjZXNzb3JEZXNjcmlwdG9yKCdnZXRQb3J0JywgJ3NldFBvcnQnKSk7XG4gIC8vIGBVUkwucHJvdG90eXBlLnBhdGhuYW1lYCBhY2Nlc3NvcnMgcGFpclxuICAvLyBodHRwczovL3VybC5zcGVjLndoYXR3Zy5vcmcvI2RvbS11cmwtcGF0aG5hbWVcbiAgZGVmaW5lQnVpbHRJbkFjY2Vzc29yKFVSTFByb3RvdHlwZSwgJ3BhdGhuYW1lJywgYWNjZXNzb3JEZXNjcmlwdG9yKCdnZXRQYXRobmFtZScsICdzZXRQYXRobmFtZScpKTtcbiAgLy8gYFVSTC5wcm90b3R5cGUuc2VhcmNoYCBhY2Nlc3NvcnMgcGFpclxuICAvLyBodHRwczovL3VybC5zcGVjLndoYXR3Zy5vcmcvI2RvbS11cmwtc2VhcmNoXG4gIGRlZmluZUJ1aWx0SW5BY2Nlc3NvcihVUkxQcm90b3R5cGUsICdzZWFyY2gnLCBhY2Nlc3NvckRlc2NyaXB0b3IoJ2dldFNlYXJjaCcsICdzZXRTZWFyY2gnKSk7XG4gIC8vIGBVUkwucHJvdG90eXBlLnNlYXJjaFBhcmFtc2AgZ2V0dGVyXG4gIC8vIGh0dHBzOi8vdXJsLnNwZWMud2hhdHdnLm9yZy8jZG9tLXVybC1zZWFyY2hwYXJhbXNcbiAgZGVmaW5lQnVpbHRJbkFjY2Vzc29yKFVSTFByb3RvdHlwZSwgJ3NlYXJjaFBhcmFtcycsIGFjY2Vzc29yRGVzY3JpcHRvcignZ2V0U2VhcmNoUGFyYW1zJykpO1xuICAvLyBgVVJMLnByb3RvdHlwZS5oYXNoYCBhY2Nlc3NvcnMgcGFpclxuICAvLyBodHRwczovL3VybC5zcGVjLndoYXR3Zy5vcmcvI2RvbS11cmwtaGFzaFxuICBkZWZpbmVCdWlsdEluQWNjZXNzb3IoVVJMUHJvdG90eXBlLCAnaGFzaCcsIGFjY2Vzc29yRGVzY3JpcHRvcignZ2V0SGFzaCcsICdzZXRIYXNoJykpO1xufVxuXG4vLyBgVVJMLnByb3RvdHlwZS50b0pTT05gIG1ldGhvZFxuLy8gaHR0cHM6Ly91cmwuc3BlYy53aGF0d2cub3JnLyNkb20tdXJsLXRvanNvblxuZGVmaW5lQnVpbHRJbihVUkxQcm90b3R5cGUsICd0b0pTT04nLCBmdW5jdGlvbiB0b0pTT04oKSB7XG4gIHJldHVybiBnZXRJbnRlcm5hbFVSTFN0YXRlKHRoaXMpLnNlcmlhbGl6ZSgpO1xufSwgeyBlbnVtZXJhYmxlOiB0cnVlIH0pO1xuXG4vLyBgVVJMLnByb3RvdHlwZS50b1N0cmluZ2AgbWV0aG9kXG4vLyBodHRwczovL3VybC5zcGVjLndoYXR3Zy5vcmcvI1VSTC1zdHJpbmdpZmljYXRpb24tYmVoYXZpb3JcbmRlZmluZUJ1aWx0SW4oVVJMUHJvdG90eXBlLCAndG9TdHJpbmcnLCBmdW5jdGlvbiB0b1N0cmluZygpIHtcbiAgcmV0dXJuIGdldEludGVybmFsVVJMU3RhdGUodGhpcykuc2VyaWFsaXplKCk7XG59LCB7IGVudW1lcmFibGU6IHRydWUgfSk7XG5cbmlmIChOYXRpdmVVUkwpIHtcbiAgdmFyIG5hdGl2ZUNyZWF0ZU9iamVjdFVSTCA9IE5hdGl2ZVVSTC5jcmVhdGVPYmplY3RVUkw7XG4gIHZhciBuYXRpdmVSZXZva2VPYmplY3RVUkwgPSBOYXRpdmVVUkwucmV2b2tlT2JqZWN0VVJMO1xuICAvLyBgVVJMLmNyZWF0ZU9iamVjdFVSTGAgbWV0aG9kXG4gIC8vIGh0dHBzOi8vZGV2ZWxvcGVyLm1vemlsbGEub3JnL2VuLVVTL2RvY3MvV2ViL0FQSS9VUkwvY3JlYXRlT2JqZWN0VVJMXG4gIGlmIChuYXRpdmVDcmVhdGVPYmplY3RVUkwpIGRlZmluZUJ1aWx0SW4oVVJMQ29uc3RydWN0b3IsICdjcmVhdGVPYmplY3RVUkwnLCBiaW5kKG5hdGl2ZUNyZWF0ZU9iamVjdFVSTCwgTmF0aXZlVVJMKSk7XG4gIC8vIGBVUkwucmV2b2tlT2JqZWN0VVJMYCBtZXRob2RcbiAgLy8gaHR0cHM6Ly9kZXZlbG9wZXIubW96aWxsYS5vcmcvZW4tVVMvZG9jcy9XZWIvQVBJL1VSTC9yZXZva2VPYmplY3RVUkxcbiAgaWYgKG5hdGl2ZVJldm9rZU9iamVjdFVSTCkgZGVmaW5lQnVpbHRJbihVUkxDb25zdHJ1Y3RvciwgJ3Jldm9rZU9iamVjdFVSTCcsIGJpbmQobmF0aXZlUmV2b2tlT2JqZWN0VVJMLCBOYXRpdmVVUkwpKTtcbn1cblxuc2V0VG9TdHJpbmdUYWcoVVJMQ29uc3RydWN0b3IsICdVUkwnKTtcblxuJCh7IGdsb2JhbDogdHJ1ZSwgY29uc3RydWN0b3I6IHRydWUsIGZvcmNlZDogIVVTRV9OQVRJVkVfVVJMLCBzaGFtOiAhREVTQ1JJUFRPUlMgfSwge1xuICBVUkw6IFVSTENvbnN0cnVjdG9yXG59KTtcbiIsIid1c2Ugc3RyaWN0Jztcbi8vIFRPRE86IFJlbW92ZSB0aGlzIG1vZHVsZSBmcm9tIGBjb3JlLWpzQDRgIHNpbmNlIGl0J3MgcmVwbGFjZWQgdG8gbW9kdWxlIGJlbG93XG5yZXF1aXJlKCcuLi9tb2R1bGVzL3dlYi51cmwuY29uc3RydWN0b3InKTtcbiIsIi8vIFRoZSBtb2R1bGUgY2FjaGVcbnZhciBfX3dlYnBhY2tfbW9kdWxlX2NhY2hlX18gPSB7fTtcblxuLy8gVGhlIHJlcXVpcmUgZnVuY3Rpb25cbmZ1bmN0aW9uIF9fd2VicGFja19yZXF1aXJlX18obW9kdWxlSWQpIHtcblx0Ly8gQ2hlY2sgaWYgbW9kdWxlIGlzIGluIGNhY2hlXG5cdHZhciBjYWNoZWRNb2R1bGUgPSBfX3dlYnBhY2tfbW9kdWxlX2NhY2hlX19bbW9kdWxlSWRdO1xuXHRpZiAoY2FjaGVkTW9kdWxlICE9PSB1bmRlZmluZWQpIHtcblx0XHRyZXR1cm4gY2FjaGVkTW9kdWxlLmV4cG9ydHM7XG5cdH1cblx0Ly8gQ3JlYXRlIGEgbmV3IG1vZHVsZSAoYW5kIHB1dCBpdCBpbnRvIHRoZSBjYWNoZSlcblx0dmFyIG1vZHVsZSA9IF9fd2VicGFja19tb2R1bGVfY2FjaGVfX1ttb2R1bGVJZF0gPSB7XG5cdFx0Ly8gbm8gbW9kdWxlLmlkIG5lZWRlZFxuXHRcdC8vIG5vIG1vZHVsZS5sb2FkZWQgbmVlZGVkXG5cdFx0ZXhwb3J0czoge31cblx0fTtcblxuXHQvLyBFeGVjdXRlIHRoZSBtb2R1bGUgZnVuY3Rpb25cblx0X193ZWJwYWNrX21vZHVsZXNfX1ttb2R1bGVJZF0uY2FsbChtb2R1bGUuZXhwb3J0cywgbW9kdWxlLCBtb2R1bGUuZXhwb3J0cywgX193ZWJwYWNrX3JlcXVpcmVfXyk7XG5cblx0Ly8gUmV0dXJuIHRoZSBleHBvcnRzIG9mIHRoZSBtb2R1bGVcblx0cmV0dXJuIG1vZHVsZS5leHBvcnRzO1xufVxuXG4vLyBleHBvc2UgdGhlIG1vZHVsZXMgb2JqZWN0IChfX3dlYnBhY2tfbW9kdWxlc19fKVxuX193ZWJwYWNrX3JlcXVpcmVfXy5tID0gX193ZWJwYWNrX21vZHVsZXNfXztcblxuIiwiLy8gZ2V0RGVmYXVsdEV4cG9ydCBmdW5jdGlvbiBmb3IgY29tcGF0aWJpbGl0eSB3aXRoIG5vbi1oYXJtb255IG1vZHVsZXNcbl9fd2VicGFja19yZXF1aXJlX18ubiA9IChtb2R1bGUpID0+IHtcblx0dmFyIGdldHRlciA9IG1vZHVsZSAmJiBtb2R1bGUuX19lc01vZHVsZSA/XG5cdFx0KCkgPT4gKG1vZHVsZVsnZGVmYXVsdCddKSA6XG5cdFx0KCkgPT4gKG1vZHVsZSk7XG5cdF9fd2VicGFja19yZXF1aXJlX18uZChnZXR0ZXIsIHsgYTogZ2V0dGVyIH0pO1xuXHRyZXR1cm4gZ2V0dGVyO1xufTsiLCIvLyBkZWZpbmUgZ2V0dGVyIGZ1bmN0aW9ucyBmb3IgaGFybW9ueSBleHBvcnRzXG5fX3dlYnBhY2tfcmVxdWlyZV9fLmQgPSAoZXhwb3J0cywgZGVmaW5pdGlvbikgPT4ge1xuXHRmb3IodmFyIGtleSBpbiBkZWZpbml0aW9uKSB7XG5cdFx0aWYoX193ZWJwYWNrX3JlcXVpcmVfXy5vKGRlZmluaXRpb24sIGtleSkgJiYgIV9fd2VicGFja19yZXF1aXJlX18ubyhleHBvcnRzLCBrZXkpKSB7XG5cdFx0XHRPYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywga2V5LCB7IGVudW1lcmFibGU6IHRydWUsIGdldDogZGVmaW5pdGlvbltrZXldIH0pO1xuXHRcdH1cblx0fVxufTsiLCJfX3dlYnBhY2tfcmVxdWlyZV9fLmYgPSB7fTtcbi8vIFRoaXMgZmlsZSBjb250YWlucyBvbmx5IHRoZSBlbnRyeSBjaHVuay5cbi8vIFRoZSBjaHVuayBsb2FkaW5nIGZ1bmN0aW9uIGZvciBhZGRpdGlvbmFsIGNodW5rc1xuX193ZWJwYWNrX3JlcXVpcmVfXy5lID0gKGNodW5rSWQpID0+IHtcblx0cmV0dXJuIFByb21pc2UuYWxsKE9iamVjdC5rZXlzKF9fd2VicGFja19yZXF1aXJlX18uZikucmVkdWNlKChwcm9taXNlcywga2V5KSA9PiB7XG5cdFx0X193ZWJwYWNrX3JlcXVpcmVfXy5mW2tleV0oY2h1bmtJZCwgcHJvbWlzZXMpO1xuXHRcdHJldHVybiBwcm9taXNlcztcblx0fSwgW10pKTtcbn07IiwiLy8gVGhpcyBmdW5jdGlvbiBhbGxvdyB0byByZWZlcmVuY2UgYXN5bmMgY2h1bmtzXG5fX3dlYnBhY2tfcmVxdWlyZV9fLnUgPSAoY2h1bmtJZCkgPT4ge1xuXHQvLyByZXR1cm4gdXJsIGZvciBmaWxlbmFtZXMgYmFzZWQgb24gdGVtcGxhdGVcblx0cmV0dXJuIFwiXCIgKyBjaHVua0lkICsgXCIuanNcIjtcbn07IiwiLy8gVGhpcyBmdW5jdGlvbiBhbGxvdyB0byByZWZlcmVuY2UgYXN5bmMgY2h1bmtzXG5fX3dlYnBhY2tfcmVxdWlyZV9fLm1pbmlDc3NGID0gKGNodW5rSWQpID0+IHtcblx0Ly8gcmV0dXJuIHVybCBmb3IgZmlsZW5hbWVzIGJhc2VkIG9uIHRlbXBsYXRlXG5cdHJldHVybiB1bmRlZmluZWQ7XG59OyIsIl9fd2VicGFja19yZXF1aXJlX18uZyA9IChmdW5jdGlvbigpIHtcblx0aWYgKHR5cGVvZiBnbG9iYWxUaGlzID09PSAnb2JqZWN0JykgcmV0dXJuIGdsb2JhbFRoaXM7XG5cdHRyeSB7XG5cdFx0cmV0dXJuIHRoaXMgfHwgbmV3IEZ1bmN0aW9uKCdyZXR1cm4gdGhpcycpKCk7XG5cdH0gY2F0Y2ggKGUpIHtcblx0XHRpZiAodHlwZW9mIHdpbmRvdyA9PT0gJ29iamVjdCcpIHJldHVybiB3aW5kb3c7XG5cdH1cbn0pKCk7IiwiX193ZWJwYWNrX3JlcXVpcmVfXy5vID0gKG9iaiwgcHJvcCkgPT4gKE9iamVjdC5wcm90b3R5cGUuaGFzT3duUHJvcGVydHkuY2FsbChvYmosIHByb3ApKSIsInZhciBpblByb2dyZXNzID0ge307XG4vLyBkYXRhLXdlYnBhY2sgaXMgbm90IHVzZWQgYXMgYnVpbGQgaGFzIG5vIHVuaXF1ZU5hbWVcbi8vIGxvYWRTY3JpcHQgZnVuY3Rpb24gdG8gbG9hZCBhIHNjcmlwdCB2aWEgc2NyaXB0IHRhZ1xuX193ZWJwYWNrX3JlcXVpcmVfXy5sID0gKHVybCwgZG9uZSwga2V5LCBjaHVua0lkKSA9PiB7XG5cdGlmKGluUHJvZ3Jlc3NbdXJsXSkgeyBpblByb2dyZXNzW3VybF0ucHVzaChkb25lKTsgcmV0dXJuOyB9XG5cdHZhciBzY3JpcHQsIG5lZWRBdHRhY2g7XG5cdGlmKGtleSAhPT0gdW5kZWZpbmVkKSB7XG5cdFx0dmFyIHNjcmlwdHMgPSBkb2N1bWVudC5nZXRFbGVtZW50c0J5VGFnTmFtZShcInNjcmlwdFwiKTtcblx0XHRmb3IodmFyIGkgPSAwOyBpIDwgc2NyaXB0cy5sZW5ndGg7IGkrKykge1xuXHRcdFx0dmFyIHMgPSBzY3JpcHRzW2ldO1xuXHRcdFx0aWYocy5nZXRBdHRyaWJ1dGUoXCJzcmNcIikgPT0gdXJsKSB7IHNjcmlwdCA9IHM7IGJyZWFrOyB9XG5cdFx0fVxuXHR9XG5cdGlmKCFzY3JpcHQpIHtcblx0XHRuZWVkQXR0YWNoID0gdHJ1ZTtcblx0XHRzY3JpcHQgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdzY3JpcHQnKTtcblxuXHRcdHNjcmlwdC5jaGFyc2V0ID0gJ3V0Zi04Jztcblx0XHRzY3JpcHQudGltZW91dCA9IDEyMDtcblx0XHRpZiAoX193ZWJwYWNrX3JlcXVpcmVfXy5uYykge1xuXHRcdFx0c2NyaXB0LnNldEF0dHJpYnV0ZShcIm5vbmNlXCIsIF9fd2VicGFja19yZXF1aXJlX18ubmMpO1xuXHRcdH1cblxuXHRcdHNjcmlwdC5zcmMgPSB1cmw7XG5cdH1cblx0aW5Qcm9ncmVzc1t1cmxdID0gW2RvbmVdO1xuXHR2YXIgb25TY3JpcHRDb21wbGV0ZSA9IChwcmV2LCBldmVudCkgPT4ge1xuXHRcdC8vIGF2b2lkIG1lbSBsZWFrcyBpbiBJRS5cblx0XHRzY3JpcHQub25lcnJvciA9IHNjcmlwdC5vbmxvYWQgPSBudWxsO1xuXHRcdGNsZWFyVGltZW91dCh0aW1lb3V0KTtcblx0XHR2YXIgZG9uZUZucyA9IGluUHJvZ3Jlc3NbdXJsXTtcblx0XHRkZWxldGUgaW5Qcm9ncmVzc1t1cmxdO1xuXHRcdHNjcmlwdC5wYXJlbnROb2RlICYmIHNjcmlwdC5wYXJlbnROb2RlLnJlbW92ZUNoaWxkKHNjcmlwdCk7XG5cdFx0ZG9uZUZucyAmJiBkb25lRm5zLmZvckVhY2goKGZuKSA9PiAoZm4oZXZlbnQpKSk7XG5cdFx0aWYocHJldikgcmV0dXJuIHByZXYoZXZlbnQpO1xuXHR9O1xuXHR2YXIgdGltZW91dCA9IHNldFRpbWVvdXQob25TY3JpcHRDb21wbGV0ZS5iaW5kKG51bGwsIHVuZGVmaW5lZCwgeyB0eXBlOiAndGltZW91dCcsIHRhcmdldDogc2NyaXB0IH0pLCAxMjAwMDApO1xuXHRzY3JpcHQub25lcnJvciA9IG9uU2NyaXB0Q29tcGxldGUuYmluZChudWxsLCBzY3JpcHQub25lcnJvcik7XG5cdHNjcmlwdC5vbmxvYWQgPSBvblNjcmlwdENvbXBsZXRlLmJpbmQobnVsbCwgc2NyaXB0Lm9ubG9hZCk7XG5cdG5lZWRBdHRhY2ggJiYgZG9jdW1lbnQuaGVhZC5hcHBlbmRDaGlsZChzY3JpcHQpO1xufTsiLCIvLyBkZWZpbmUgX19lc01vZHVsZSBvbiBleHBvcnRzXG5fX3dlYnBhY2tfcmVxdWlyZV9fLnIgPSAoZXhwb3J0cykgPT4ge1xuXHRpZih0eXBlb2YgU3ltYm9sICE9PSAndW5kZWZpbmVkJyAmJiBTeW1ib2wudG9TdHJpbmdUYWcpIHtcblx0XHRPYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgU3ltYm9sLnRvU3RyaW5nVGFnLCB7IHZhbHVlOiAnTW9kdWxlJyB9KTtcblx0fVxuXHRPYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgJ19fZXNNb2R1bGUnLCB7IHZhbHVlOiB0cnVlIH0pO1xufTsiLCJ2YXIgc2NyaXB0VXJsO1xuaWYgKF9fd2VicGFja19yZXF1aXJlX18uZy5pbXBvcnRTY3JpcHRzKSBzY3JpcHRVcmwgPSBfX3dlYnBhY2tfcmVxdWlyZV9fLmcubG9jYXRpb24gKyBcIlwiO1xudmFyIGRvY3VtZW50ID0gX193ZWJwYWNrX3JlcXVpcmVfXy5nLmRvY3VtZW50O1xuaWYgKCFzY3JpcHRVcmwgJiYgZG9jdW1lbnQpIHtcblx0aWYgKGRvY3VtZW50LmN1cnJlbnRTY3JpcHQpXG5cdFx0c2NyaXB0VXJsID0gZG9jdW1lbnQuY3VycmVudFNjcmlwdC5zcmNcblx0aWYgKCFzY3JpcHRVcmwpIHtcblx0XHR2YXIgc2NyaXB0cyA9IGRvY3VtZW50LmdldEVsZW1lbnRzQnlUYWdOYW1lKFwic2NyaXB0XCIpO1xuXHRcdGlmKHNjcmlwdHMubGVuZ3RoKSBzY3JpcHRVcmwgPSBzY3JpcHRzW3NjcmlwdHMubGVuZ3RoIC0gMV0uc3JjXG5cdH1cbn1cbi8vIFdoZW4gc3VwcG9ydGluZyBicm93c2VycyB3aGVyZSBhbiBhdXRvbWF0aWMgcHVibGljUGF0aCBpcyBub3Qgc3VwcG9ydGVkIHlvdSBtdXN0IHNwZWNpZnkgYW4gb3V0cHV0LnB1YmxpY1BhdGggbWFudWFsbHkgdmlhIGNvbmZpZ3VyYXRpb25cbi8vIG9yIHBhc3MgYW4gZW1wdHkgc3RyaW5nIChcIlwiKSBhbmQgc2V0IHRoZSBfX3dlYnBhY2tfcHVibGljX3BhdGhfXyB2YXJpYWJsZSBmcm9tIHlvdXIgY29kZSB0byB1c2UgeW91ciBvd24gbG9naWMuXG5pZiAoIXNjcmlwdFVybCkgdGhyb3cgbmV3IEVycm9yKFwiQXV0b21hdGljIHB1YmxpY1BhdGggaXMgbm90IHN1cHBvcnRlZCBpbiB0aGlzIGJyb3dzZXJcIik7XG5zY3JpcHRVcmwgPSBzY3JpcHRVcmwucmVwbGFjZSgvIy4qJC8sIFwiXCIpLnJlcGxhY2UoL1xcPy4qJC8sIFwiXCIpLnJlcGxhY2UoL1xcL1teXFwvXSskLywgXCIvXCIpO1xuX193ZWJwYWNrX3JlcXVpcmVfXy5wID0gc2NyaXB0VXJsOyIsIi8vIG5vIGJhc2VVUklcblxuLy8gb2JqZWN0IHRvIHN0b3JlIGxvYWRlZCBhbmQgbG9hZGluZyBjaHVua3Ncbi8vIHVuZGVmaW5lZCA9IGNodW5rIG5vdCBsb2FkZWQsIG51bGwgPSBjaHVuayBwcmVsb2FkZWQvcHJlZmV0Y2hlZFxuLy8gW3Jlc29sdmUsIHJlamVjdCwgUHJvbWlzZV0gPSBjaHVuayBsb2FkaW5nLCAwID0gY2h1bmsgbG9hZGVkXG52YXIgaW5zdGFsbGVkQ2h1bmtzID0ge1xuXHRcIm1haW5cIjogMFxufTtcblxuX193ZWJwYWNrX3JlcXVpcmVfXy5mLmogPSAoY2h1bmtJZCwgcHJvbWlzZXMpID0+IHtcblx0XHQvLyBKU09OUCBjaHVuayBsb2FkaW5nIGZvciBqYXZhc2NyaXB0XG5cdFx0dmFyIGluc3RhbGxlZENodW5rRGF0YSA9IF9fd2VicGFja19yZXF1aXJlX18ubyhpbnN0YWxsZWRDaHVua3MsIGNodW5rSWQpID8gaW5zdGFsbGVkQ2h1bmtzW2NodW5rSWRdIDogdW5kZWZpbmVkO1xuXHRcdGlmKGluc3RhbGxlZENodW5rRGF0YSAhPT0gMCkgeyAvLyAwIG1lYW5zIFwiYWxyZWFkeSBpbnN0YWxsZWRcIi5cblxuXHRcdFx0Ly8gYSBQcm9taXNlIG1lYW5zIFwiY3VycmVudGx5IGxvYWRpbmdcIi5cblx0XHRcdGlmKGluc3RhbGxlZENodW5rRGF0YSkge1xuXHRcdFx0XHRwcm9taXNlcy5wdXNoKGluc3RhbGxlZENodW5rRGF0YVsyXSk7XG5cdFx0XHR9IGVsc2Uge1xuXHRcdFx0XHRpZih0cnVlKSB7IC8vIGFsbCBjaHVua3MgaGF2ZSBKU1xuXHRcdFx0XHRcdC8vIHNldHVwIFByb21pc2UgaW4gY2h1bmsgY2FjaGVcblx0XHRcdFx0XHR2YXIgcHJvbWlzZSA9IG5ldyBQcm9taXNlKChyZXNvbHZlLCByZWplY3QpID0+IChpbnN0YWxsZWRDaHVua0RhdGEgPSBpbnN0YWxsZWRDaHVua3NbY2h1bmtJZF0gPSBbcmVzb2x2ZSwgcmVqZWN0XSkpO1xuXHRcdFx0XHRcdHByb21pc2VzLnB1c2goaW5zdGFsbGVkQ2h1bmtEYXRhWzJdID0gcHJvbWlzZSk7XG5cblx0XHRcdFx0XHQvLyBzdGFydCBjaHVuayBsb2FkaW5nXG5cdFx0XHRcdFx0dmFyIHVybCA9IF9fd2VicGFja19yZXF1aXJlX18ucCArIF9fd2VicGFja19yZXF1aXJlX18udShjaHVua0lkKTtcblx0XHRcdFx0XHQvLyBjcmVhdGUgZXJyb3IgYmVmb3JlIHN0YWNrIHVud291bmQgdG8gZ2V0IHVzZWZ1bCBzdGFja3RyYWNlIGxhdGVyXG5cdFx0XHRcdFx0dmFyIGVycm9yID0gbmV3IEVycm9yKCk7XG5cdFx0XHRcdFx0dmFyIGxvYWRpbmdFbmRlZCA9IChldmVudCkgPT4ge1xuXHRcdFx0XHRcdFx0aWYoX193ZWJwYWNrX3JlcXVpcmVfXy5vKGluc3RhbGxlZENodW5rcywgY2h1bmtJZCkpIHtcblx0XHRcdFx0XHRcdFx0aW5zdGFsbGVkQ2h1bmtEYXRhID0gaW5zdGFsbGVkQ2h1bmtzW2NodW5rSWRdO1xuXHRcdFx0XHRcdFx0XHRpZihpbnN0YWxsZWRDaHVua0RhdGEgIT09IDApIGluc3RhbGxlZENodW5rc1tjaHVua0lkXSA9IHVuZGVmaW5lZDtcblx0XHRcdFx0XHRcdFx0aWYoaW5zdGFsbGVkQ2h1bmtEYXRhKSB7XG5cdFx0XHRcdFx0XHRcdFx0dmFyIGVycm9yVHlwZSA9IGV2ZW50ICYmIChldmVudC50eXBlID09PSAnbG9hZCcgPyAnbWlzc2luZycgOiBldmVudC50eXBlKTtcblx0XHRcdFx0XHRcdFx0XHR2YXIgcmVhbFNyYyA9IGV2ZW50ICYmIGV2ZW50LnRhcmdldCAmJiBldmVudC50YXJnZXQuc3JjO1xuXHRcdFx0XHRcdFx0XHRcdGVycm9yLm1lc3NhZ2UgPSAnTG9hZGluZyBjaHVuayAnICsgY2h1bmtJZCArICcgZmFpbGVkLlxcbignICsgZXJyb3JUeXBlICsgJzogJyArIHJlYWxTcmMgKyAnKSc7XG5cdFx0XHRcdFx0XHRcdFx0ZXJyb3IubmFtZSA9ICdDaHVua0xvYWRFcnJvcic7XG5cdFx0XHRcdFx0XHRcdFx0ZXJyb3IudHlwZSA9IGVycm9yVHlwZTtcblx0XHRcdFx0XHRcdFx0XHRlcnJvci5yZXF1ZXN0ID0gcmVhbFNyYztcblx0XHRcdFx0XHRcdFx0XHRpbnN0YWxsZWRDaHVua0RhdGFbMV0oZXJyb3IpO1xuXHRcdFx0XHRcdFx0XHR9XG5cdFx0XHRcdFx0XHR9XG5cdFx0XHRcdFx0fTtcblx0XHRcdFx0XHRfX3dlYnBhY2tfcmVxdWlyZV9fLmwodXJsLCBsb2FkaW5nRW5kZWQsIFwiY2h1bmstXCIgKyBjaHVua0lkLCBjaHVua0lkKTtcblx0XHRcdFx0fSBlbHNlIGluc3RhbGxlZENodW5rc1tjaHVua0lkXSA9IDA7XG5cdFx0XHR9XG5cdFx0fVxufTtcblxuLy8gbm8gcHJlZmV0Y2hpbmdcblxuLy8gbm8gcHJlbG9hZGVkXG5cbi8vIG5vIEhNUlxuXG4vLyBubyBITVIgbWFuaWZlc3RcblxuLy8gbm8gb24gY2h1bmtzIGxvYWRlZFxuXG4vLyBpbnN0YWxsIGEgSlNPTlAgY2FsbGJhY2sgZm9yIGNodW5rIGxvYWRpbmdcbnZhciB3ZWJwYWNrSnNvbnBDYWxsYmFjayA9IChwYXJlbnRDaHVua0xvYWRpbmdGdW5jdGlvbiwgZGF0YSkgPT4ge1xuXHR2YXIgW2NodW5rSWRzLCBtb3JlTW9kdWxlcywgcnVudGltZV0gPSBkYXRhO1xuXHQvLyBhZGQgXCJtb3JlTW9kdWxlc1wiIHRvIHRoZSBtb2R1bGVzIG9iamVjdCxcblx0Ly8gdGhlbiBmbGFnIGFsbCBcImNodW5rSWRzXCIgYXMgbG9hZGVkIGFuZCBmaXJlIGNhbGxiYWNrXG5cdHZhciBtb2R1bGVJZCwgY2h1bmtJZCwgaSA9IDA7XG5cdGlmKGNodW5rSWRzLnNvbWUoKGlkKSA9PiAoaW5zdGFsbGVkQ2h1bmtzW2lkXSAhPT0gMCkpKSB7XG5cdFx0Zm9yKG1vZHVsZUlkIGluIG1vcmVNb2R1bGVzKSB7XG5cdFx0XHRpZihfX3dlYnBhY2tfcmVxdWlyZV9fLm8obW9yZU1vZHVsZXMsIG1vZHVsZUlkKSkge1xuXHRcdFx0XHRfX3dlYnBhY2tfcmVxdWlyZV9fLm1bbW9kdWxlSWRdID0gbW9yZU1vZHVsZXNbbW9kdWxlSWRdO1xuXHRcdFx0fVxuXHRcdH1cblx0XHRpZihydW50aW1lKSB2YXIgcmVzdWx0ID0gcnVudGltZShfX3dlYnBhY2tfcmVxdWlyZV9fKTtcblx0fVxuXHRpZihwYXJlbnRDaHVua0xvYWRpbmdGdW5jdGlvbikgcGFyZW50Q2h1bmtMb2FkaW5nRnVuY3Rpb24oZGF0YSk7XG5cdGZvcig7aSA8IGNodW5rSWRzLmxlbmd0aDsgaSsrKSB7XG5cdFx0Y2h1bmtJZCA9IGNodW5rSWRzW2ldO1xuXHRcdGlmKF9fd2VicGFja19yZXF1aXJlX18ubyhpbnN0YWxsZWRDaHVua3MsIGNodW5rSWQpICYmIGluc3RhbGxlZENodW5rc1tjaHVua0lkXSkge1xuXHRcdFx0aW5zdGFsbGVkQ2h1bmtzW2NodW5rSWRdWzBdKCk7XG5cdFx0fVxuXHRcdGluc3RhbGxlZENodW5rc1tjaHVua0lkXSA9IDA7XG5cdH1cblxufVxuXG52YXIgY2h1bmtMb2FkaW5nR2xvYmFsID0gc2VsZltcIndlYnBhY2tDaHVua1wiXSA9IHNlbGZbXCJ3ZWJwYWNrQ2h1bmtcIl0gfHwgW107XG5jaHVua0xvYWRpbmdHbG9iYWwuZm9yRWFjaCh3ZWJwYWNrSnNvbnBDYWxsYmFjay5iaW5kKG51bGwsIDApKTtcbmNodW5rTG9hZGluZ0dsb2JhbC5wdXNoID0gd2VicGFja0pzb25wQ2FsbGJhY2suYmluZChudWxsLCBjaHVua0xvYWRpbmdHbG9iYWwucHVzaC5iaW5kKGNodW5rTG9hZGluZ0dsb2JhbCkpOyIsImltcG9ydCAnLi4vLi4vZXhhbXBsZXMvbWFpbi5jc3MnO1xuXG5jb25zdCBjb25maWdGaWxlTmFtZSA9IFwiZXh0cmVzX2NvbmZpZy5qc29uXCI7XG5jb25zdCBzY2hlbWFGaWxlTmFtZSA9IFwiZXh0cmVzX2NvbmZpZy5zY2hlbWEuanNvblwiO1xuXG5mdW5jdGlvbiBsb2FkSlNPTiAoKSB7XG5cblx0ZmV0Y2goIGNvbmZpZ0ZpbGVOYW1lIClcblx0XHQudGhlbiggcmVzcG9uc2UgPT4ge1xuXHRcdFx0aWYgKCAhcmVzcG9uc2Uub2sgKSB7XG5cdFx0XHRcdHRocm93IG5ldyBFcnJvciggYEV4dFJlczogRXJyb3IgcmVhZGluZyAnJHtjb25maWdGaWxlTmFtZX0nIWAgKTtcblx0XHRcdH1cblx0XHRcdHJldHVybiByZXNwb25zZS5qc29uKCk7XG5cdFx0fSlcblx0XHQudGhlbigganNvbiA9PiBpbml0SlNPTigganNvbiApIClcblx0XHQuY2F0Y2goIGVycm9yID0+IGNvbnNvbGUuZXJyb3IoIGVycm9yICkgKTtcblxufVxuXG5pbXBvcnQgeyBnZXRFUEZGb2xkZXJOYW1lIH0gZnJvbSAnLi4vY29tbW9uJztcblxuZnVuY3Rpb24gc3RhcnRJbXBvcnRTY2hlbWFMaXN0ZW5lciAoKSB7XG5cblx0Ly8gbGlzdGVuZXIgZm9yIHByb3ZpZGluZyBKU09OIFNDSEVNQSB0byBJdGVtQnVpbGRlclxuXHR3aW5kb3cuYWRkRXZlbnRMaXN0ZW5lcihcblx0XHRcIm1lc3NhZ2VcIixcblx0XHQoZXZlbnQpID0+IHtcblxuXHRcdFx0dHJ5IHtcblx0XHRcdFx0Y29uc3QgeyBjYWxsSWQgfSA9IEpTT04ucGFyc2UoZXZlbnQuZGF0YSk7XG5cdFx0XHRcdGlmICggY2FsbElkICE9PSB1bmRlZmluZWQgJiYgY2FsbElkLmluY2x1ZGVzKFwiaW1wb3J0SnNvbkRhdGFcIikgKSB7XG5cblx0XHRcdFx0XHRmZXRjaCggc2NoZW1hRmlsZU5hbWUgKVxuXHRcdFx0XHRcdFx0LnRoZW4oIHJlc3BvbnNlID0+IHtcblx0XHRcdFx0XHRcdFx0aWYgKCAhcmVzcG9uc2Uub2sgKSB7XG5cdFx0XHRcdFx0XHRcdFx0dGhyb3cgbmV3IEVycm9yKCBgRXh0UmVzOiBFcnJvciByZWFkaW5nICcke3NjaGVtYUZpbGVOYW1lfSchYCApO1xuXHRcdFx0XHRcdFx0XHR9XG5cdFx0XHRcdFx0XHRcdHJldHVybiByZXNwb25zZS5qc29uKCk7XG5cdFx0XHRcdFx0XHR9KVxuXHRcdFx0XHRcdFx0LnRoZW4oIGpzb25TY2hlbWEgPT4ge1xuXG5cdFx0XHRcdFx0XHRcdGNvbnN0IHBhc3NfZGF0YSA9IHtcblx0XHRcdFx0XHRcdFx0XHRqc29uU2NoZW1hLFxuXHRcdFx0XHRcdFx0XHRcdGNvbmZpZ0ZpbGVOYW1lOiBnZXRFUEZGb2xkZXJOYW1lKCkgKyAnLycgKyBjb25maWdGaWxlTmFtZSxcblx0XHRcdFx0XHRcdFx0XHRjYWxsSWRcblx0XHRcdFx0XHRcdFx0fTtcblx0XHRcdFx0XHRcdFx0d2luZG93LnBhcmVudC5wb3N0TWVzc2FnZSggSlNPTi5zdHJpbmdpZnkoIHBhc3NfZGF0YSApLCAnKicgKTtcblxuXHRcdFx0XHRcdFx0fSlcblx0XHRcdFx0XHRcdC5jYXRjaCggZXJyb3IgPT4gY29uc29sZS5lcnJvciggZXJyb3IgKSApO1xuXG5cdFx0XHRcdH1cblx0XHRcdH0gY2F0Y2ggKGUpIHt9XG5cdFx0fSxcblx0XHRmYWxzZSApO1xufVxuXG5mdW5jdGlvbiBpbml0RXh0UmVzICgpIHtcblx0c3RhcnRJbXBvcnRTY2hlbWFMaXN0ZW5lcigpO1xuXHRsb2FkSlNPTigpO1xufVxuXG5cbmltcG9ydCB7IGJhc2VJbml0cyB9IGZyb20gJy4uLy4uL2xpYnMvYmFzZUluaXRzJztcbmltcG9ydCB7IGNsZWFyQ2ZnSnNvbiwgYWRkU3RhdHVzVmFyRGVmIH0gZnJvbSAnLi4vY29tbW9uJztcblxuLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vL1xuLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vL1xuLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy9cbi8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vXG4vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy9cbi8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy9cbi8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vXG4vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vL1xuLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy9cbi8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vXG4vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vL1xuLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy9cbi8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vXG4vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vL1xuLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vL1xuLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vXG4vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy9cbi8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy9cbi8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vL1xuLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vL1xuLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy9cbi8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vXG4vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vL1xuLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy9cbi8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy9cbi8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vL1xuLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vL1xuLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vXG4vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vL1xuLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy9cbi8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vXG5pbXBvcnQgeyB0ZXh0YXJlYUluc2VydHNGcm9tU2NoZW1hIH0gZnJvbSAnLi90ZXh0YXJlYUluc2VydHMnO1xuLy8vLy8vLy8vL1xuXG5pbXBvcnQgeyBSZXNvbHZhYmxlUHJvbWlzZSB9IGZyb20gJy4uL2NvbW1vbic7XG5sZXQgYmFzZUluaXRpYWxpemVkID0gbmV3IFJlc29sdmFibGVQcm9taXNlKCk7XG4vLyBsZXQganNvbkxvYWRlZCA9IG5ldyBSZXNvbHZhYmxlUHJvbWlzZSgpO1x0Ly8gZm9yIEkxOE5cblxuZnVuY3Rpb24gaW5pdEpTT04gKCBqc29uICkge1xuXG5cdGlmICggdHlwZW9mIGpzb24gPT09ICdzdHJpbmcnICkge1xuXHRcdHRyeSB7XG5cdFx0XHRqc29uID0gSlNPTi5wYXJzZSgganNvbiwgdHJ1ZSApO1xuXHRcdH0gY2F0Y2ggKGUpIHtcblx0XHRcdGNvbnNvbGUuZXJyb3IoIGBGb3JtYXQtRXJyb3IgaW4gSlNPTiBmaWxlICcke2NvbmZpZ0ZpbGVOYW1lfSdgICk7XG5cdFx0XHRyZXR1cm47XG5cdFx0fVxuXHR9XG5cdC8vIGpzb25Mb2FkZWQucmVzb2x2ZVByb21pc2UoIGpzb24gKTtcdC8vIGZvciBJMThOXG5cblx0Y29uc3QgY2ZnID0gY2xlYXJDZmdKc29uKCBqc29uICk7XG5cbi8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vXG5cdGNvbnN0IGJhc2UgPSBuZXcgYmFzZUluaXRzKCk7XG4vLy8vLy8vLy9cbi8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy9cbi8vLy8vLy8vLy9cblx0YmFzZUluaXRpYWxpemVkLnJlc29sdmVQcm9taXNlKCBiYXNlICk7XG5cblx0aWYgKCBjZmcuZGF0YVNldHRpbmdzICkge1xuXHRcdGJhc2UuZGF0YVNldHRpbmdzID0gY2ZnLmRhdGFTZXR0aW5ncztcblx0fVxuXG5cdC8vIGxvYWQgUGFyc2VyIGxhenkgb3Igbm90XG5cdChcblxuXHRcdCggY2ZnLmRhdGFTZXR0aW5ncyAmJiBjZmcuZGF0YVNldHRpbmdzLnNjb3JpbmdWYWxzICYmIGNmZy5kYXRhU2V0dGluZ3Muc2NvcmluZ1ZhbHMubGVuZ3RoPjAgKSA/XG5cdFx0XHRpbXBvcnQoIC8qIHdlYnBhY2tDaHVua05hbWU6IFwic2NlXCIgKi8gJ2V4cHItZXZhbCcgKS50aGVuKCAoeyBQYXJzZXIgfSkgPT4gKHsgUGFyc2VyIH0pICkgOlxuXHRcdFx0UHJvbWlzZS5yZXNvbHZlKHt9KVxuXG5cdCkudGhlbiggYWRkTW9kcyA9PiB7XG5cblx0XHQvLyB0aGVyZSB3aWxsIGJlIHN1YnNlcXVlbnQgaW5pdHNcblx0XHRpZiAoIGJhc2UuZnNtICYmIGJhc2UuZnNtLmluY0luaXRDbnQgKSB7XG5cdFx0XHRiYXNlLmZzbS5pbmNJbml0Q250KCk7XG5cdFx0fVxuXG4vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vXG4vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy9cbi8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vXG4vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vL1xuLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vXG4vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy9cbi8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vXG4vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vL1xuLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy9cbi8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vXG4vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vL1xuLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy9cbi8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vXG4vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vL1xuLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vL1xuLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vL1xuLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vXG4vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy9cbi8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vL1xuLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vXG4vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vL1xuLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy9cbi8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vXG4vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vL1xuLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vL1xuLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vL1xuLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vL1xuLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vL1xuLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy9cbi8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy9cbi8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vXG5cdFx0Y29uc3QgaW8gPSBuZXcgdGV4dGFyZWFJbnNlcnRzRnJvbVNjaGVtYSggJyNjb250YWluZXInLCBjZmcsIGJhc2UgKTtcbi8vLy8vLy8vLy9cblxuXHRcdGFkZFN0YXR1c1ZhckRlZiggaW8sIGpzb24gKTtcblx0XHRiYXNlLnNlbmRDaGFuZ2VTdGF0ZSggaW8gKTtcblxuXG5cdFx0aWYgKCBpby5nZXRTdGF0ZSApIHtcblx0XHRcdHdpbmRvdy5nZXRTdGF0ZSA9IGlvLmdldFN0YXRlLmJpbmQoaW8pO1xuXHRcdH1cblx0XHRpZiAoIGlvLnNldFN0YXRlICkge1xuXHRcdFx0d2luZG93LnNldFN0YXRlID0gaW8uc2V0U3RhdGUuYmluZChpbyk7XG5cdFx0fVxuXG5cdFx0aWYgKCBiYXNlLmZzbSAmJiBiYXNlLmZzbS5kZWNJbml0Q250ICkge1xuXHRcdFx0YmFzZS5mc20uZGVjSW5pdENudCgpO1xuXHRcdH1cblx0fSlcbn1cblxuZG9jdW1lbnQuYWRkRXZlbnRMaXN0ZW5lciggXCJET01Db250ZW50TG9hZGVkXCIsIGluaXRFeHRSZXMgKTtcblxuLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vXG5cbi8vIGhhY2sgZm9yIElCIHJlcXVlc3QgXCJpbXBvcnRWYXJpYWJsZXNcIiBiZWZvcmUgYmFzZSBpcyBpbml0aWFsaXplZFxuXG5mdW5jdGlvbiBzZW5kVmFyRGVjbCAoZXZlbnQpIHtcblxuXHR0cnkge1xuXHRcdGNvbnN0IHsgY2FsbElkIH0gPSBKU09OLnBhcnNlKGV2ZW50LmRhdGEpO1xuXHRcdGlmICggY2FsbElkICE9PSB1bmRlZmluZWQgJiYgY2FsbElkLmluY2x1ZGVzKFwiaW1wb3J0VmFyaWFibGVzXCIpICkge1xuXHRcdFx0Ly8gYW5zd2VyIG1lc3NhZ2Ugd2hlbiBiYXNlIGlzIGluaXRpYWxpemVkXG5cdFx0XHRiYXNlSW5pdGlhbGl6ZWQucHJvbWlzZS50aGVuKCBiYXNlID0+IGJhc2UuZnNtLmFuc3dlclZhckRlY2xSZXEoY2FsbElkKSApO1xuXHRcdH1cblx0fSBjYXRjaCAoZSkge31cblxufVxuXG5mdW5jdGlvbiBoYW5kbGVJQmVhcmx5VmFySW1wb3J0ICgpIHtcblx0d2luZG93LmFkZEV2ZW50TGlzdGVuZXIoIFwibWVzc2FnZVwiLCBzZW5kVmFyRGVjbCwgZmFsc2UgKTtcblx0YmFzZUluaXRpYWxpemVkLnByb21pc2UudGhlbiggKCkgPT4gd2luZG93LnJlbW92ZUV2ZW50TGlzdGVuZXIoIFwibWVzc2FnZVwiLCBzZW5kVmFyRGVjbCApICk7XG59XG5cbmhhbmRsZUlCZWFybHlWYXJJbXBvcnQoKTtcblxuLy8gLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vXG5cbi8vIC8vIEkxOE4gc3VwcG9ydFxuXG4vLyBpbXBvcnQgeyBnZXRJMThuRGVzY3IgfSBmcm9tICcuLi9jb21tb24nO1xuXG4vLyBhc3luYyBmdW5jdGlvbiBzZW5kSTE4bkRlc2NyIChjYWxsSWQpIHtcblxuLy8gXHRjb25zdCBqc29uID0gYXdhaXQganNvbkxvYWRlZC5wcm9taXNlO1xuXG4vLyBcdGNvbnN0IGkxOG5EYXRhID0gZ2V0STE4bkRlc2NyKCBqc29uICk7XG5cbi8vIFx0Ly8gU2VuZCBNZXNzYWdlXG4vLyBcdGNvbnN0IGRhdGEgPSB7XG4vLyBcdFx0Y2FsbElkLFxuLy8gXHRcdGkxOG5EYXRhLFxuLy8gXHR9XG4vLyBcdGJhc2VJbml0aWFsaXplZC5wcm9taXNlLnRoZW4oIGJhc2UgPT4gYmFzZS5mc20ucG9zdE1lc3NhZ2UoIEpTT04uc3RyaW5naWZ5KCBkYXRhICkgKSApO1xuXG4vLyB9XG5cbi8vIC8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vL1xuXG4vLyBpbXBvcnQgeyBwYXRjaENmZ0kxOG4gfSBmcm9tICcuLi9jb21tb24nO1xuXG4vLyBhc3luYyBmdW5jdGlvbiBsb2FkSTE4biAoIGkxOG4gKSB7XG5cbi8vIFx0Ly8gV2VubiBqc29uIGdlbGFkZW5cbi8vIFx0Y29uc3QganNvbiA9IGF3YWl0IGpzb25Mb2FkZWQucHJvbWlzZTtcbi8vIFx0Ly8gcGF0Y2ggdGhlIENGRy1KU09OIHdpdGggdGhlIEkxOE4tU3RyaW5nc1xuLy8gXHRwYXRjaENmZ0kxOG4oIGpzb24sIGkxOG4gKTtcbi8vIC8vIGNvbnNvbGUubG9nKGpzb24pO1xuXG4vLyBcdC8vIFdlbm4gYWxsZXMgZmVydGlnIGluaXRpYWxpc2llcnRcbi8vIFx0Y29uc3QgYmFzZSA9IGF3YWl0IGJhc2VJbml0aWFsaXplZC5wcm9taXNlO1xuLy8gXHRhd2FpdCBiYXNlLmZzbS5nZXRJbml0RG9uZVByb21pc2UoKTtcblxuLy8gXHQvLyBkYW5uIGFscyBuw6RjaHN0ZXIgU2Nocml0dCBkaWUgSTE4Ti1TdHJpbmdzIGxhZGVuXG4vLyBcdHNldFRpbWVvdXQoICgpID0+IHtcbi8vIFx0XHRiYXNlSW5pdGlhbGl6ZWQgPSBuZXcgUmVzb2x2YWJsZVByb21pc2UoKTtcbi8vIFx0XHRqc29uTG9hZGVkID0gbmV3IFJlc29sdmFibGVQcm9taXNlKCk7XG4vLyBcdFx0aGFuZGxlSUJlYXJseVZhckltcG9ydCgpO1xuXG4vLyBcdFx0bGV0IHN0YXRlID0gbnVsbDtcbi8vIFx0XHRpZiAoIHdpbmRvdy5nZXRTdGF0ZSApIHtcbi8vIFx0XHRcdHN0YXRlID0gd2luZG93LmdldFN0YXRlKCk7XG4vLyBcdFx0fVxuLy8gXHRcdGluaXRKU09OKCBqc29uICk7XG4vLyBcdFx0aWYgKCBzdGF0ZSApIHtcbi8vIFx0XHRcdHdpbmRvdy5zZXRTdGF0ZSggc3RhdGUgKTtcbi8vIFx0XHR9XG4vLyBcdH0pXG4vLyB9XG5cbi8vIC8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vL1xuXG4vLyBmdW5jdGlvbiBpMThuTGlzdGVuZXIgKGV2ZW50KSB7XG5cbi8vIFx0dHJ5IHtcbi8vIFx0XHRjb25zdCB7IGNhbGxJZCwgaTE4biB9ID0gSlNPTi5wYXJzZShldmVudC5kYXRhKTtcbi8vIFx0XHRpZiAoIGNhbGxJZCAhPT0gdW5kZWZpbmVkICYmIGNhbGxJZC5pbmNsdWRlcyhcImltcG9ydEkxOG5cIikgKSB7XG4vLyBcdFx0XHRzZW5kSTE4bkRlc2NyKCBjYWxsSWQgKTtcbi8vIFx0XHR9IGVsc2UgaWYgKCBjYWxsSWQgIT09IHVuZGVmaW5lZCAmJiBjYWxsSWQuaW5jbHVkZXMoXCJzZXRJMThuXCIpICkge1xuLy8gXHRcdFx0bG9hZEkxOG4oIGkxOG4gKTtcbi8vIFx0XHR9XG4vLyBcdH1cbi8vIFx0Y2F0Y2ggKGUpIHt9XG5cbi8vIH1cblxuLy8gd2luZG93LmFkZEV2ZW50TGlzdGVuZXIoIFwibWVzc2FnZVwiLCBpMThuTGlzdGVuZXIsIGZhbHNlICk7XG5cbi8vIC8vIHdpbmRvdy5zZW5kSTE4bkRlc2NyID0gc2VuZEkxOG5EZXNjcjtcbi8vIC8vIHdpbmRvdy5sb2FkSTE4biA9IGxvYWRJMThuO1xuIl0sIm5hbWVzIjpbInRleHRhcmVhSW5zZXJ0cyIsInRvb2xiYXJNYXRoT3BlcmF0b3JzIiwidG9vbGJhckZyYWN0aW9uIiwidG9vbGJhckNvbXBhcmlzb24iLCJ0b29sYmFyUGVyY2VudCIsInRvb2xiYXJFdXJvIiwidG9vbGJhcnMiLCJjb21wIiwibWF0aCIsImZyYWN0IiwicGVyYyIsImV1cm8iLCJ0ZXh0YXJlYUluc2VydHNGcm9tU2NoZW1hIiwiY29uc3RydWN0b3IiLCJkaXZTZWxlY3RvciIsIm9wdHMiLCJiYXNlIiwiZnNtIiwiaW5jSW5pdENudCIsIndpZHRoIiwid2luZG93IiwiaW5uZXJXaWR0aCIsIndXaWR0aCIsImhlaWdodCIsImlubmVySGVpZ2h0Iiwid0hlaWdodCIsInRvb2xiYXJDZWxsV2lkdGgiLCJkZWZzIiwidG9vbGJhckRpcmVjdGlvbiIsImRpdlN0eWxlcyIsInRvb2xiYXJDb250YWluZXJTdHlsZXMiLCJ0b29sYmFyQ2VsbFN0eWxlcyIsInRvb2xiYXIiLCJkYXRhU2V0dGluZ3MiLCJ0YiIsImNvbmNhdCIsImRlY0luaXRDbnQiLCJzY29yZURlZiIsInByZWYiLCJ2YXJpYWJsZVByZWZpeCIsInJlcyIsImV4dHJhY3QiLCJjbGVhckNmZ0pzb24iLCJqc29uIiwiQXJyYXkiLCJpc0FycmF5IiwibWFwIiwiYSIsIk9iamVjdCIsImVudHJpZXMiLCJmb3JFYWNoIiwiayIsInYiLCJzdWJzdHJpbmciLCJhcmVsdmFscyIsIm1hdGNoIiwiZSIsInZhbHVlcyIsImFsdHMiLCJ1bmRlZmluZWQiLCJhc3NpZ24iLCJzdWJvYmoiLCJuZXdPYmoiLCJpc0JldHdlZW4iLCJpc051bVVuaXQiLCJkZWJ1Z0FuZENvbnNvbGVPdXQiLCJzIiwiZGVidWdPdXQiLCJjb25zb2xlIiwiZXJyb3IiLCJhZGRTY29yaW5nIiwib2JqIiwiUGFyc2VyIiwiYWRkRm5jcyIsImNvbXB1dGVTY29yaW5nVmFscyIsInBhcnNlciIsImlzTnVsbCIsInIiLCJmbCIsInRvU3RyaW5nIiwiUmVnRXhwIiwic3RyRXF1YWwiLCJiIiwidG9Mb3dlckNhc2UiLCJmbmMiLCJmdW5jdGlvbnMiLCJzY29yaW5nVmFscyIsInNjb3JlcyIsInZhck5hbWVzIiwia2V5cyIsImxlbmd0aCIsInN2IiwiY29uZCIsImNvbmRpdGlvbiIsInNhdmVDb25kIiwiYWxsVmFyc0luQ29uZCIsIm1hdGNoQWxsIiwidm4iLCJ2YXJzZWFyY2giLCJyZXBsYWNlIiwicmUiLCJzZWxWYXJOYW1lcyIsImZpbHRlciIsImZyb20iLCJzb21lIiwibSIsImluY2x1ZGVzIiwicHVzaCIsInZhbCIsInBhcnNlIiwic2NvcmUiLCJzY29yZURhdCIsImgiLCJjIiwiZXZhbHVhdGUiLCJuIiwiTnVtYmVyIiwiTmFOIiwic2VuZENoYW5nZVN0YXRlIiwiYWRkU3RhdHVzVmFyRGVmIiwic3RhdHVzVmFyRGVmIiwic3RhdFZhck5hbWUiLCJnZXREZWZhdWx0Q2hhbmdlU3RhdGUiLCJyZWFkUmFuZ2VBcnJheSIsInJyIiwicnIyIiwiZHAyaW5wdXRSZWdFeHAiLCJ1bml0UmVnRXhwIiwidSIsInRyaW0iLCJ0b1VwcGVyQ2FzZSIsImwiLCJwZHAiLCJkcCIsInVuaXRzIiwic3BsaXQiLCJqb2luIiwiaW5wdXRSZWdleHAiLCJkcDJsYWJGbmNJbnB1dFJlZ0V4cCIsIm5hbSIsImxWRiIsImxUIiwic3RyVG9OdW0iLCJzdHJUb0ludCIsInBhcnNlSW50IiwiaXNOYU4iLCJwYXJzZUZsb2F0IiwiUmVzb2x2YWJsZVByb21pc2UiLCJwcm9tIiwiUHJvbWlzZSIsInJlaiIsInJlc29sdmVQcm9taXNlIiwicmVqZWN0UHJvbWlzZSIsInByb21pc2UiLCJnZXRFUEZGb2xkZXJOYW1lIiwiZW1wdHlWYWwiLCJyZWdleHAiLCJsb2NhdGlvbiIsInBhdGhuYW1lIiwiZ2V0STE4bkRlc2NyIiwibmFtZUZuYyIsIm5hbWUiLCJyZXBsYWNlQWxsIiwiaTE4bktleXNDdHhzIiwiaTE4bkRhdGEiLCJrZXkiLCJjdHgiLCJrZXlQYXJ0cyIsInNoaWZ0IiwiYWRkIiwidGV4dCIsImN1cnJrZXkiLCJkZXNjciIsImVudHJ5IiwicG9wIiwic3RhbW1LZXkiLCJpIiwicGF0Y2hDZmdJMThuIiwiaTE4biIsInN0YXJ0c1dpdGgiLCJvYmplY3RfZXF1YWxzIiwiZnNtU2VuZCIsImJhc2VJbml0cyIsImRlZmF1bHRzIiwiY29udGFpbmVyIiwiYWRkU2VuZENoYW5nZVN0YXRlIiwic3RhcnRMaXN0ZW5pbmdUb1ZhckRlY2xSZXEiLCJkZWNsYXJlVmFyaWFibGVzIiwiYmluZCIsInN0YWdlIiwiS29udmEiLCJTdGFnZSIsInN0YWdlVk4iLCJkb2N1bWVudCIsImFkZEV2ZW50TGlzdGVuZXIiLCJldiIsInByZXZlbnREZWZhdWx0IiwiRlNNVmFyc1NlbnQiLCJwb3N0TG9nIiwiZXZlbnQiLCJkYXRhIiwiaXNEZW1vQW5pIiwicG9zdExvZ0V2ZW50IiwicG9zdFZhcmlhYmxlIiwic2V0RlNNVmFyaWFibGUiLCJ0cmlnZ2VySW5wdXRWYWxpZGF0aW9uRXZlbnQiLCJ0cmlnZ2VyRXZlbnQiLCJnZXRDaGFuZ2VTdGF0ZSIsImNhbGwiLCJuZXdTdGF0ZSIsImNoYW5nZVN0YXRlIiwib2xkQ2hhbmdlU3RhdGUiLCJGU01WYXJpYWJsZU5hbWUiLCJzY29yZU9iaiIsIm9sZFNjb3JlIiwic2NvcmVWYXJpYWJsZU5hbWUiLCJ2YXJEZWZzIiwidHlwZXRyYW5zIiwidm5hbWUiLCJ0eXBlIiwic2NvcmVEZWZUeXBlIiwidmRlZiIsImRlZmF1bHRWYWx1ZSIsIm5hbWVkVmFsdWVzIiwidzEiLCJ3MiIsIk1hdGgiLCJtaW4iLCJtYXgiLCJudW0iLCJ1bml0UkUiLCJ1bml0T3B0Iiwib3JFbXB0eSIsIm51bVJFIiwiZGVsRGVmYXVsdHMiLCJkZWxLZXlzIiwiYk9iamVjdCIsIm1lcmdlRGVlcCIsInRhcmdldCIsInNvdXJjZSIsImlzT2JqZWN0IiwidGFyZ2V0VmFsdWUiLCJzb3VyY2VWYWx1ZSIsIngiLCJ5IiwieTIiLCJldmVyeSIsInhlIiwieWUiLCJzcGxpY2UiLCJwIiwiaGFzT3duUHJvcGVydHkiLCJnZXRYb2ZFdmVudCIsInNpbVgiLCJnZXRQb2ludGVyUG9zaXRpb24iLCJnZXRZb2ZFdmVudCIsInNpbVkiLCJnZXRQb3NPZkV2ZW50IiwiaWdub3JlRXZlbnQiLCJzZXRTdGF0ZVBvc3RQcm9jIiwiZW5kQW5pIiwiZ2V0QWJzUG9zaXRpb24iLCJlbGVtZW50IiwiYm94IiwiZ2V0Qm91bmRpbmdDbGllbnRSZWN0Iiwic2Nyb2xsWCIsInBhZ2VYT2Zmc2V0Iiwic2Nyb2xsWSIsInBhZ2VZT2Zmc2V0IiwibGVmdCIsInRvcCIsInJlZ2V4Q2FuTG9va0JlaGluZCIsImluZGV4UGF0aCIsImdldFF1ZXJ5VmFyaWFibGUiLCJ1c2VyRGVmSWRQYXRoIiwidHJhY2VDb3VudCIsInBySW5pdERvbmUiLCJyZXNvbHZlIiwicHJvY2VzcyIsImVudiIsIk5PREVfRU5WIiwicHJJbml0RG9uZVJlc29sdmUiLCJpbml0RG9uZUNudCIsImJ3X19kZWJ1Z091dCIsInZhcmlhYmxlTmFtZSIsIm5ld1ZhbHVlIiwicG9zdE1lc3NhZ2VXaXRoUGF0aHNBbmRUcmFjZUNvdW50Iiwic2V0VmFyaWFibGUiLCJ0cmFjZU1lc3NhZ2UiLCJKU09OIiwic3RyaW5naWZ5IiwibWljcm9maW5FdmVudCIsInBheWxvYWQiLCJwb3N0TWVzc2FnZSIsInBhcmVudCIsIl9fQldfX2NhbGxiYWNrIiwidmFyaWFibGUiLCJwYXJzZWRVcmwiLCJVUkwiLCJocmVmIiwic2VhcmNoUGFyYW1zIiwiZ2V0IiwiZGVjbGFyZVZhcmlhYmxlQ2FsbGJhY2siLCJnZXRJbml0RG9uZVByb21pc2UiLCJhbnN3ZXJWYXJEZWNsUmVxIiwiY2FsbElkIiwidGhlbiIsInZhcmlhYmxlcyIsInBhc3NfZGF0YSIsImluaXRpYWxWYXJpYWJsZXMiLCJsb2ciLCJ0ZXh0YXJlYUNvbnRhaW5lciIsIm91dGVyRGl2U3R5bGVzIiwib3V0ZXJEaXYiLCJjcmVhdGVFbGVtZW50IiwiY2xhc3NMaXN0Iiwic2V0U3R5bGVzIiwiZGl2IiwicXVlcnlTZWxlY3RvciIsInBhcmVudE5vZGUiLCJyZXBsYWNlQ2hpbGQiLCJhcHBlbmRDaGlsZCIsImluaXREYXRhIiwiaW5uZXJIVE1MIiwiZXZfaW5wdXQiLCJlbCIsInN0eWxlcyIsInN0Iiwic3R5bGUiLCJnZXRTdGF0ZSIsInNldFN0YXRlIiwidGV4dGFyZWFCYXNlIiwibXVsdGlMaW5lIiwic3RyaXBUYWdzIiwibWF4bGVuZ3RoIiwiZXh0cmFjdFJlcGxhY2VzIiwidG8iLCJzZXRBdHRyaWJ1dGUiLCJldl9rZXlkb3duIiwidGV4dENvbnRlbnQiLCJpbnB1dFJFIiwic2F2ZVZhbHVlIiwic2V0VGltZW91dCIsImdldFRleHRQb3MiLCJvbGRWYWx1ZSIsIm9sZEZvY3VzRWxlbUluZGV4IiwicmVzY29yZSIsIndoaWNoIiwia2V5Q29kZSIsInRhYlRvTmV4dElucHV0RmllbGQiLCJwYXN0ZUh0bWxBdENhcmV0Iiwic3RvcFByb3BhZ2F0aW9uIiwiZGVsSWZEaXYiLCJzYXZlTmV3VmFsdWUiLCJzZWwiLCJnZXRTZWxlY3Rpb24iLCJpbnB1dFR5cGUiLCJkZWxQb3NFbGVtZW50IiwiaW5zZXJ0ZWQiLCJzZWFyY2giLCJmb2N1c05vZGUiLCJkZWxQb3NUZXh0IiwiY29udGFpbnMiLCJnZXRSYW5nZUF0IiwicmFuZ2VDb3VudCIsInJhbmdlIiwiY2xvbmVSYW5nZSIsInNldFN0YXJ0QmVmb3JlIiwiY29sbGFwc2UiLCJyZW1vdmVBbGxSYW5nZXMiLCJhZGRSYW5nZSIsIm5vcm1hbGl6ZSIsInJlbW92ZSIsImlzQ29sbGFwc2VkIiwiZm9jdXNPZmZzZXQiLCJwcmV2aW91c1NpYmxpbmciLCJjbG9uZU5vZGUiLCJyZXN0b3JlVmFsdWUiLCJsYXN0Tm9kZSIsImNoaWxkTm9kZXMiLCJub2RlVHlwZSIsIk5vZGUiLCJURVhUX05PREUiLCJlbmRzV2l0aCIsInBvcyIsInNldEN1clBvcyIsIm5vZGUiLCJuZXh0U2libGluZyIsInRhZ05hbWUiLCJ0bm9kZSIsImNyZWF0ZVRleHROb2RlIiwidG9UZXh0IiwiaHRtbCIsImluc2VydFNwYWNlcyIsImxvZ05hbWUiLCJkZWxldGVDb250ZW50cyIsImlucyIsInByZVNwYWNlIiwiZnJhZyIsImNyZWF0ZURvY3VtZW50RnJhZ21lbnQiLCJmaXJzdENoaWxkIiwic3RhcnRDdXJQb3MiLCJpbnNlcnROb2RlIiwic2V0U3RhcnQiLCJzZXRTdGFydEFmdGVyIiwib2ZmcyIsImZvY3VzIiwidG9EZWxldGUiLCJub2RlcyIsImZpbmRJbmRleCIsIm9sZEZvY3VzT2Zmc2V0Iiwib2Zmc2V0IiwiY3JlYXRlUmFuZ2UiLCJjdXJQb3MiLCJwcmV2RWxtZW50IiwicGFyZW50RWxtZW50IiwiRUxFTUVOVF9OT0RFIiwicGFyZW50RWxlbWVudCIsIm5ld0VsZW0iLCJuZXdSYW5nZSIsInRleHRQb3MiLCJjbGFzcyIsInN0YXRlIiwiaW5zZXJ0c0RlZmF1bHRzIiwidG9vbGJhckNlbGxTcGFuU3R5bGVzIiwidG9vbGJhckNvbnRhaW5lciIsIm5yIiwidG9vbGJhckNlbGwiLCJhY3RpdmVFbGVtZW50IiwiaW5zZXJ0IiwiaW5uZXJTcGFuIiwiZGlzcGxheSIsImV4dHJhY3RSZXBsYWNlIiwiY2FwdHVyZSIsImRvbnRJbnNlcnRSZWN1cnNpdmUiLCJwbm9kZSIsIm5vRXh0cmFTcGFjZXMiLCJmcmFjX2h0bWwiLCJmcmFjdHN2ZyIsImZyYWNfaHRtbF90b29sYmFyIiwidG9vbGJhck1hdGhPcGVyYXRvcnNGcmFjdGlvbiIsInRvb2xiYXJNYXRoT3BlcmF0b3JzRnJhY3Rpb25Db21wYXJpc29uIiwidG9vbGJhck1hdGhPcGVyYXRvcnNGcmFjdGlvblBlcmNlbnQiLCJjb25maWdGaWxlTmFtZSIsInNjaGVtYUZpbGVOYW1lIiwibG9hZEpTT04iLCJmZXRjaCIsInJlc3BvbnNlIiwib2siLCJFcnJvciIsImluaXRKU09OIiwiY2F0Y2giLCJzdGFydEltcG9ydFNjaGVtYUxpc3RlbmVyIiwianNvblNjaGVtYSIsImluaXRFeHRSZXMiLCJiYXNlSW5pdGlhbGl6ZWQiLCJjZmciLCJhZGRNb2RzIiwiaW8iLCJzZW5kVmFyRGVjbCIsImhhbmRsZUlCZWFybHlWYXJJbXBvcnQiLCJyZW1vdmVFdmVudExpc3RlbmVyIl0sInNvdXJjZVJvb3QiOiIifQ==