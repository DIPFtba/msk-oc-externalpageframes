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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,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QUc7QUFDSDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsTUFBTTtBQUNOLEdBQUc7QUFDSDtBQUNBO0FBQ0E7QUFDQSxHQUFHO0FBQ0g7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSwwQkFBMEIsK0NBQStDO0FBQ3pFO0FBQ0E7QUFDQSxHQUFHO0FBQ0g7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsUUFBUTtBQUNSO0FBQ0E7QUFDQTtBQUNBLEdBQUc7QUFDSDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLFdBQVcsd0JBQXdCO0FBQ25DO0FBQ0E7QUFDQTtBQUNBLEdBQUc7QUFDSDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsV0FBVyx3QkFBd0I7QUFDbkM7QUFDQTtBQUNBO0FBQ0EsR0FBRztBQUNIO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxHQUFHO0FBQ0g7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLFdBQVcsd0JBQXdCO0FBQ25DO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLGdDQUFnQyxzQkFBc0I7QUFDdEQ7QUFDQTtBQUNBLEdBQUc7QUFDSDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxLQUFLO0FBQ0w7QUFDQSxHQUFHO0FBQ0g7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxHQUFHO0FBQ0g7QUFDQTtBQUNBO0FBQ0EsR0FBRztBQUNIO0FBQ0E7QUFDQTtBQUNBLEdBQUc7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QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsSUFBSTtBQUNKO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7O0FBRUE7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxZQUFZO0FBQ1o7QUFDQTtBQUNBLFlBQVk7QUFDWjs7QUFFQTtBQUNBO0FBQ0E7QUFDQSxZQUFZO0FBQ1o7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxjQUFjO0FBQ2Q7QUFDQSxjQUFjO0FBQ2Q7QUFDQSxjQUFjO0FBQ2Q7QUFDQTtBQUNBLGNBQWM7QUFDZDtBQUNBO0FBQ0E7QUFDQTtBQUNBLFlBQVk7QUFDWjtBQUNBO0FBQ0E7QUFDQTtBQUNBLFlBQVk7QUFDWjs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLFlBQVk7QUFDWjtBQUNBO0FBQ0EsWUFBWTs7QUFFWjtBQUNBO0FBQ0E7QUFDQTtBQUNBLFlBQVk7QUFDWjtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsWUFBWTtBQUNaO0FBQ0EsWUFBWTtBQUNaO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsWUFBWTtBQUNaO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxZQUFZO0FBQ1o7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLFlBQVk7O0FBRVo7QUFDQTtBQUNBO0FBQ0EsWUFBWTtBQUNaO0FBQ0EsWUFBWTtBQUNaO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLFlBQVk7O0FBRVo7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLFlBQVk7O0FBRVo7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLDRCQUE0Qiw2QkFBNkI7QUFDekQ7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxZQUFZO0FBQ1o7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxZQUFZO0FBQ1o7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLFlBQVk7QUFDWjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxZQUFZO0FBQ1o7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLFlBQVk7QUFDWjtBQUNBO0FBQ0E7QUFDQSxZQUFZOztBQUVaO0FBQ0E7QUFDQTtBQUNBLFlBQVk7QUFDWjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLFlBQVk7QUFDWjs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsWUFBWTtBQUNaO0FBQ0E7QUFDQSxZQUFZOztBQUVaO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQSxjQUFjO0FBQ2Q7QUFDQTtBQUNBO0FBQ0EsY0FBYztBQUNkO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLGNBQWM7QUFDZCxZQUFZO0FBQ1o7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQSxZQUFZO0FBQ1o7QUFDQTtBQUNBLFlBQVk7QUFDWjtBQUNBO0FBQ0EsWUFBWTtBQUNaO0FBQ0E7QUFDQSxZQUFZOztBQUVaO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxjQUFjO0FBQ2Q7QUFDQTtBQUNBO0FBQ0EsY0FBYztBQUNkO0FBQ0E7QUFDQSxrREFBa0Q7QUFDbEQ7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsY0FBYztBQUNkO0FBQ0E7QUFDQTtBQUNBLFlBQVk7QUFDWjtBQUNBLFlBQVk7O0FBRVo7QUFDQTtBQUNBO0FBQ0E7QUFDQSxZQUFZO0FBQ1o7QUFDQTtBQUNBLFlBQVk7QUFDWjtBQUNBLFlBQVk7O0FBRVo7QUFDQTtBQUNBO0FBQ0E7QUFDQSxZQUFZO0FBQ1o7QUFDQTtBQUNBO0FBQ0EsWUFBWTs7QUFFWjtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0EsR0FBRztBQUNIO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLE1BQU07QUFDTjtBQUNBO0FBQ0E7QUFDQSxzQkFBc0IsMkJBQTJCO0FBQ2pEO0FBQ0E7QUFDQTtBQUNBLE1BQU07QUFDTjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxHQUFHO0FBQ0g7QUFDQTtBQUNBO0FBQ0EsR0FBRztBQUNIO0FBQ0E7QUFDQTtBQUNBLEdBQUc7QUFDSDtBQUNBO0FBQ0E7QUFDQSxHQUFHO0FBQ0g7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxHQUFHO0FBQ0g7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxNQUFNO0FBQ047QUFDQTtBQUNBO0FBQ0E7QUFDQSxHQUFHO0FBQ0g7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLEdBQUc7QUFDSDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxNQUFNO0FBQ047QUFDQTtBQUNBO0FBQ0E7QUFDQSxHQUFHO0FBQ0g7QUFDQTtBQUNBO0FBQ0EsR0FBRztBQUNIO0FBQ0E7QUFDQSxHQUFHO0FBQ0g7QUFDQTtBQUNBO0FBQ0EsR0FBRztBQUNIO0FBQ0E7QUFDQTtBQUNBO0FBQ0Esb0JBQW9CLHVCQUF1QjtBQUMzQztBQUNBO0FBQ0EsR0FBRztBQUNIO0FBQ0E7QUFDQTtBQUNBLEdBQUc7QUFDSDtBQUNBO0FBQ0E7QUFDQTtBQUNBLG9CQUFvQix1QkFBdUI7QUFDM0M7QUFDQTtBQUNBLEdBQUc7QUFDSDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLEdBQUc7QUFDSDtBQUNBO0FBQ0E7QUFDQSxHQUFHO0FBQ0g7QUFDQTtBQUNBO0FBQ0E7QUFDQSxHQUFHO0FBQ0g7QUFDQTtBQUNBO0FBQ0EsR0FBRztBQUNIO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsR0FBRztBQUNIO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxHQUFHO0FBQ0g7QUFDQTtBQUNBO0FBQ0E7QUFDQSxHQUFHO0FBQ0g7QUFDQTtBQUNBO0FBQ0E7QUFDQSxHQUFHO0FBQ0g7QUFDQTtBQUNBO0FBQ0E7QUFDQSxHQUFHO0FBQ0g7QUFDQTtBQUNBO0FBQ0E7QUFDQSxNQUFNO0FBQ047QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLEdBQUc7QUFDSDtBQUNBO0FBQ0E7QUFDQSxHQUFHO0FBQ0g7QUFDQTtBQUNBO0FBQ0E7QUFDQSxHQUFHO0FBQ0g7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsR0FBRztBQUNIO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNB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QUFDLEVBQUUsQ0FBQztBQUVkO0FBRUEsU0FBU29aLHNCQUFzQixHQUFJO0VBQ2xDeGIsTUFBTSxDQUFDOEssZ0JBQWdCLENBQUUsU0FBUyxFQUFFeVEsV0FBVyxFQUFFLEtBQUssQ0FBRTtFQUN4REosZUFBZSxDQUFDOVMsT0FBTyxDQUFDeUosSUFBSSxDQUFFLE1BQU05UixNQUFNLENBQUN5YixtQkFBbUIsQ0FBRSxTQUFTLEVBQUVGLFdBQVcsQ0FBRSxDQUFFO0FBQzNGO0FBRUFDLHNCQUFzQixFQUFFOztBQUV4Qjs7QUFFQTs7QUFFQTs7QUFFQTs7QUFFQTs7QUFFQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7O0FBRUE7O0FBRUE7O0FBRUE7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTs7QUFFQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7O0FBRUE7O0FBRUE7QUFDQSxpQyIsInNvdXJjZXMiOlsid2VicGFjazovLy8uL3RleHRhcmVhSW5zZXJ0cy5qcyIsIndlYnBhY2s6Ly8vLi4vY29tbW9uLmpzIiwid2VicGFjazovLy8uLi8uLi9saWJzL2Jhc2VJbml0cy5qcyIsIndlYnBhY2s6Ly8vLi4vLi4vbGlicy9jb21tb24uanMiLCJ3ZWJwYWNrOi8vLy4uLy4uL2xpYnMvZnNtLmpzIiwid2VicGFjazovLy8uLi8uLi9saWJzL3RleHRhcmVhSW5zZXJ0cy5qcyIsIndlYnBhY2s6Ly8vLi4vLi4vZXhhbXBsZXMvbWFpbi5jc3M/YTM4NCIsIndlYnBhY2s6Ly8vLi4vLi4vZXhhbXBsZXMvdGV4dGFyZWFJbnNlcnRzXzJjb2xzLmNzcz80YmEyIiwid2VicGFjazovLy8uLi8uLi9saWJzL3RleHRhcmVhSW5zZXJ0cy5jc3M/Y2UyMyIsIndlYnBhY2s6Ly8vLi4vLi4vbm9kZV9tb2R1bGVzL2NvcmUtanMvaW50ZXJuYWxzL2EtY2FsbGFibGUuanMiLCJ3ZWJwYWNrOi8vLy4uLy4uL25vZGVfbW9kdWxlcy9jb3JlLWpzL2ludGVybmFscy9hLWNvbnN0cnVjdG9yLmpzIiwid2VicGFjazovLy8uLi8uLi9ub2RlX21vZHVsZXMvY29yZS1qcy9pbnRlcm5hbHMvYS1wb3NzaWJsZS1wcm90b3R5cGUuanMiLCJ3ZWJwYWNrOi8vLy4uLy4uL25vZGVfbW9kdWxlcy9jb3JlLWpzL2ludGVybmFscy9hZGQtdG8tdW5zY29wYWJsZXMuanMiLCJ3ZWJwYWNrOi8vLy4uLy4uL25vZGVfbW9kdWxlcy9jb3JlLWpzL2ludGVybmFscy9hZHZhbmNlLXN0cmluZy1pbmRleC5qcyIsIndlYnBhY2s6Ly8vLi4vLi4vbm9kZV9tb2R1bGVzL2NvcmUtanMvaW50ZXJuYWxzL2FuLWluc3RhbmNlLmpzIiwid2VicGFjazovLy8uLi8uLi9ub2RlX21vZHVsZXMvY29yZS1qcy9pbnRlcm5hbHMvYW4tb2JqZWN0LmpzIiwid2VicGFjazovLy8uLi8uLi9ub2RlX21vZHVsZXMvY29yZS1qcy9pbnRlcm5hbHMvYXJyYXktZnJvbS5qcyIsIndlYnBhY2s6Ly8vLi4vLi4vbm9kZV9tb2R1bGVzL2NvcmUtanMvaW50ZXJuYWxzL2FycmF5LWluY2x1ZGVzLmpzIiwid2VicGFjazovLy8uLi8uLi9ub2RlX21vZHVsZXMvY29yZS1qcy9pbnRlcm5hbHMvYXJyYXktc2xpY2UuanMiLCJ3ZWJwYWNrOi8vLy4uLy4uL25vZGVfbW9kdWxlcy9jb3JlLWpzL2ludGVybmFscy9hcnJheS1zb3J0LmpzIiwid2VicGFjazovLy8uLi8uLi9ub2RlX21vZHVsZXMvY29yZS1qcy9pbnRlcm5hbHMvY2FsbC13aXRoLXNhZmUtaXRlcmF0aW9uLWNsb3NpbmcuanMiLCJ3ZWJwYWNrOi8vLy4uLy4uL25vZGVfbW9kdWxlcy9jb3JlLWpzL2ludGVybmFscy9jbGFzc29mLXJhdy5qcyIsIndlYnBhY2s6Ly8vLi4vLi4vbm9kZV9tb2R1bGVzL2NvcmUtanMvaW50ZXJuYWxzL2NsYXNzb2YuanMiLCJ3ZWJwYWNrOi8vLy4uLy4uL25vZGVfbW9kdWxlcy9jb3JlLWpzL2ludGVybmFscy9jb3B5LWNvbnN0cnVjdG9yLXByb3BlcnRpZXMuanMiLCJ3ZWJwYWNrOi8vLy4uLy4uL25vZGVfbW9kdWxlcy9jb3JlLWpzL2ludGVybmFscy9jb3JyZWN0LXByb3RvdHlwZS1nZXR0ZXIuanMiLCJ3ZWJwYWNrOi8vLy4uLy4uL25vZGVfbW9kdWxlcy9jb3JlLWpzL2ludGVybmFscy9jcmVhdGUtaXRlci1yZXN1bHQtb2JqZWN0LmpzIiwid2VicGFjazovLy8uLi8uLi9ub2RlX21vZHVsZXMvY29yZS1qcy9pbnRlcm5hbHMvY3JlYXRlLW5vbi1lbnVtZXJhYmxlLXByb3BlcnR5LmpzIiwid2VicGFjazovLy8uLi8uLi9ub2RlX21vZHVsZXMvY29yZS1qcy9pbnRlcm5hbHMvY3JlYXRlLXByb3BlcnR5LWRlc2NyaXB0b3IuanMiLCJ3ZWJwYWNrOi8vLy4uLy4uL25vZGVfbW9kdWxlcy9jb3JlLWpzL2ludGVybmFscy9jcmVhdGUtcHJvcGVydHkuanMiLCJ3ZWJwYWNrOi8vLy4uLy4uL25vZGVfbW9kdWxlcy9jb3JlLWpzL2ludGVybmFscy9kZWZpbmUtYnVpbHQtaW4tYWNjZXNzb3IuanMiLCJ3ZWJwYWNrOi8vLy4uLy4uL25vZGVfbW9kdWxlcy9jb3JlLWpzL2ludGVybmFscy9kZWZpbmUtYnVpbHQtaW4uanMiLCJ3ZWJwYWNrOi8vLy4uLy4uL25vZGVfbW9kdWxlcy9jb3JlLWpzL2ludGVybmFscy9kZWZpbmUtYnVpbHQtaW5zLmpzIiwid2VicGFjazovLy8uLi8uLi9ub2RlX21vZHVsZXMvY29yZS1qcy9pbnRlcm5hbHMvZGVmaW5lLWdsb2JhbC1wcm9wZXJ0eS5qcyIsIndlYnBhY2s6Ly8vLi4vLi4vbm9kZV9tb2R1bGVzL2NvcmUtanMvaW50ZXJuYWxzL2Rlc2NyaXB0b3JzLmpzIiwid2VicGFjazovLy8uLi8uLi9ub2RlX21vZHVsZXMvY29yZS1qcy9pbnRlcm5hbHMvZG9jdW1lbnQtY3JlYXRlLWVsZW1lbnQuanMiLCJ3ZWJwYWNrOi8vLy4uLy4uL25vZGVfbW9kdWxlcy9jb3JlLWpzL2ludGVybmFscy9lbmdpbmUtdXNlci1hZ2VudC5qcyIsIndlYnBhY2s6Ly8vLi4vLi4vbm9kZV9tb2R1bGVzL2NvcmUtanMvaW50ZXJuYWxzL2VuZ2luZS12OC12ZXJzaW9uLmpzIiwid2VicGFjazovLy8uLi8uLi9ub2RlX21vZHVsZXMvY29yZS1qcy9pbnRlcm5hbHMvZW51bS1idWcta2V5cy5qcyIsIndlYnBhY2s6Ly8vLi4vLi4vbm9kZV9tb2R1bGVzL2NvcmUtanMvaW50ZXJuYWxzL2V4cG9ydC5qcyIsIndlYnBhY2s6Ly8vLi4vLi4vbm9kZV9tb2R1bGVzL2NvcmUtanMvaW50ZXJuYWxzL2ZhaWxzLmpzIiwid2VicGFjazovLy8uLi8uLi9ub2RlX21vZHVsZXMvY29yZS1qcy9pbnRlcm5hbHMvZml4LXJlZ2V4cC13ZWxsLWtub3duLXN5bWJvbC1sb2dpYy5qcyIsIndlYnBhY2s6Ly8vLi4vLi4vbm9kZV9tb2R1bGVzL2NvcmUtanMvaW50ZXJuYWxzL2Z1bmN0aW9uLWFwcGx5LmpzIiwid2VicGFjazovLy8uLi8uLi9ub2RlX21vZHVsZXMvY29yZS1qcy9pbnRlcm5hbHMvZnVuY3Rpb24tYmluZC1jb250ZXh0LmpzIiwid2VicGFjazovLy8uLi8uLi9ub2RlX21vZHVsZXMvY29yZS1qcy9pbnRlcm5hbHMvZnVuY3Rpb24tYmluZC1uYXRpdmUuanMiLCJ3ZWJwYWNrOi8vLy4uLy4uL25vZGVfbW9kdWxlcy9jb3JlLWpzL2ludGVybmFscy9mdW5jdGlvbi1jYWxsLmpzIiwid2VicGFjazovLy8uLi8uLi9ub2RlX21vZHVsZXMvY29yZS1qcy9pbnRlcm5hbHMvZnVuY3Rpb24tbmFtZS5qcyIsIndlYnBhY2s6Ly8vLi4vLi4vbm9kZV9tb2R1bGVzL2NvcmUtanMvaW50ZXJuYWxzL2Z1bmN0aW9uLXVuY3VycnktdGhpcy1hY2Nlc3Nvci5qcyIsIndlYnBhY2s6Ly8vLi4vLi4vbm9kZV9tb2R1bGVzL2NvcmUtanMvaW50ZXJuYWxzL2Z1bmN0aW9uLXVuY3VycnktdGhpcy1jbGF1c2UuanMiLCJ3ZWJwYWNrOi8vLy4uLy4uL25vZGVfbW9kdWxlcy9jb3JlLWpzL2ludGVybmFscy9mdW5jdGlvbi11bmN1cnJ5LXRoaXMuanMiLCJ3ZWJwYWNrOi8vLy4uLy4uL25vZGVfbW9kdWxlcy9jb3JlLWpzL2ludGVybmFscy9nZXQtYnVpbHQtaW4uanMiLCJ3ZWJwYWNrOi8vLy4uLy4uL25vZGVfbW9kdWxlcy9jb3JlLWpzL2ludGVybmFscy9nZXQtaXRlcmF0b3ItbWV0aG9kLmpzIiwid2VicGFjazovLy8uLi8uLi9ub2RlX21vZHVsZXMvY29yZS1qcy9pbnRlcm5hbHMvZ2V0LWl0ZXJhdG9yLmpzIiwid2VicGFjazovLy8uLi8uLi9ub2RlX21vZHVsZXMvY29yZS1qcy9pbnRlcm5hbHMvZ2V0LW1ldGhvZC5qcyIsIndlYnBhY2s6Ly8vLi4vLi4vbm9kZV9tb2R1bGVzL2NvcmUtanMvaW50ZXJuYWxzL2dldC1zdWJzdGl0dXRpb24uanMiLCJ3ZWJwYWNrOi8vLy4uLy4uL25vZGVfbW9kdWxlcy9jb3JlLWpzL2ludGVybmFscy9nbG9iYWwuanMiLCJ3ZWJwYWNrOi8vLy4uLy4uL25vZGVfbW9kdWxlcy9jb3JlLWpzL2ludGVybmFscy9oYXMtb3duLXByb3BlcnR5LmpzIiwid2VicGFjazovLy8uLi8uLi9ub2RlX21vZHVsZXMvY29yZS1qcy9pbnRlcm5hbHMvaGlkZGVuLWtleXMuanMiLCJ3ZWJwYWNrOi8vLy4uLy4uL25vZGVfbW9kdWxlcy9jb3JlLWpzL2ludGVybmFscy9odG1sLmpzIiwid2VicGFjazovLy8uLi8uLi9ub2RlX21vZHVsZXMvY29yZS1qcy9pbnRlcm5hbHMvaWU4LWRvbS1kZWZpbmUuanMiLCJ3ZWJwYWNrOi8vLy4uLy4uL25vZGVfbW9kdWxlcy9jb3JlLWpzL2ludGVybmFscy9pbmRleGVkLW9iamVjdC5qcyIsIndlYnBhY2s6Ly8vLi4vLi4vbm9kZV9tb2R1bGVzL2NvcmUtanMvaW50ZXJuYWxzL2luaGVyaXQtaWYtcmVxdWlyZWQuanMiLCJ3ZWJwYWNrOi8vLy4uLy4uL25vZGVfbW9kdWxlcy9jb3JlLWpzL2ludGVybmFscy9pbnNwZWN0LXNvdXJjZS5qcyIsIndlYnBhY2s6Ly8vLi4vLi4vbm9kZV9tb2R1bGVzL2NvcmUtanMvaW50ZXJuYWxzL2ludGVybmFsLXN0YXRlLmpzIiwid2VicGFjazovLy8uLi8uLi9ub2RlX21vZHVsZXMvY29yZS1qcy9pbnRlcm5hbHMvaXMtYXJyYXktaXRlcmF0b3ItbWV0aG9kLmpzIiwid2VicGFjazovLy8uLi8uLi9ub2RlX21vZHVsZXMvY29yZS1qcy9pbnRlcm5hbHMvaXMtY2FsbGFibGUuanMiLCJ3ZWJwYWNrOi8vLy4uLy4uL25vZGVfbW9kdWxlcy9jb3JlLWpzL2ludGVybmFscy9pcy1jb25zdHJ1Y3Rvci5qcyIsIndlYnBhY2s6Ly8vLi4vLi4vbm9kZV9tb2R1bGVzL2NvcmUtanMvaW50ZXJuYWxzL2lzLWZvcmNlZC5qcyIsIndlYnBhY2s6Ly8vLi4vLi4vbm9kZV9tb2R1bGVzL2NvcmUtanMvaW50ZXJuYWxzL2lzLW51bGwtb3ItdW5kZWZpbmVkLmpzIiwid2VicGFjazovLy8uLi8uLi9ub2RlX21vZHVsZXMvY29yZS1qcy9pbnRlcm5hbHMvaXMtb2JqZWN0LmpzIiwid2VicGFjazovLy8uLi8uLi9ub2RlX21vZHVsZXMvY29yZS1qcy9pbnRlcm5hbHMvaXMtcG9zc2libGUtcHJvdG90eXBlLmpzIiwid2VicGFjazovLy8uLi8uLi9ub2RlX21vZHVsZXMvY29yZS1qcy9pbnRlcm5hbHMvaXMtcHVyZS5qcyIsIndlYnBhY2s6Ly8vLi4vLi4vbm9kZV9tb2R1bGVzL2NvcmUtanMvaW50ZXJuYWxzL2lzLXJlZ2V4cC5qcyIsIndlYnBhY2s6Ly8vLi4vLi4vbm9kZV9tb2R1bGVzL2NvcmUtanMvaW50ZXJuYWxzL2lzLXN5bWJvbC5qcyIsIndlYnBhY2s6Ly8vLi4vLi4vbm9kZV9tb2R1bGVzL2NvcmUtanMvaW50ZXJuYWxzL2l0ZXJhdG9yLWNsb3NlLmpzIiwid2VicGFjazovLy8uLi8uLi9ub2RlX21vZHVsZXMvY29yZS1qcy9pbnRlcm5hbHMvaXRlcmF0b3ItY3JlYXRlLWNvbnN0cnVjdG9yLmpzIiwid2VicGFjazovLy8uLi8uLi9ub2RlX21vZHVsZXMvY29yZS1qcy9pbnRlcm5hbHMvaXRlcmF0b3ItZGVmaW5lLmpzIiwid2VicGFjazovLy8uLi8uLi9ub2RlX21vZHVsZXMvY29yZS1qcy9pbnRlcm5hbHMvaXRlcmF0b3JzLWNvcmUuanMiLCJ3ZWJwYWNrOi8vLy4uLy4uL25vZGVfbW9kdWxlcy9jb3JlLWpzL2ludGVybmFscy9pdGVyYXRvcnMuanMiLCJ3ZWJwYWNrOi8vLy4uLy4uL25vZGVfbW9kdWxlcy9jb3JlLWpzL2ludGVybmFscy9sZW5ndGgtb2YtYXJyYXktbGlrZS5qcyIsIndlYnBhY2s6Ly8vLi4vLi4vbm9kZV9tb2R1bGVzL2NvcmUtanMvaW50ZXJuYWxzL21ha2UtYnVpbHQtaW4uanMiLCJ3ZWJwYWNrOi8vLy4uLy4uL25vZGVfbW9kdWxlcy9jb3JlLWpzL2ludGVybmFscy9tYXRoLXRydW5jLmpzIiwid2VicGFjazovLy8uLi8uLi9ub2RlX21vZHVsZXMvY29yZS1qcy9pbnRlcm5hbHMvb2JqZWN0LWFzc2lnbi5qcyIsIndlYnBhY2s6Ly8vLi4vLi4vbm9kZV9tb2R1bGVzL2NvcmUtanMvaW50ZXJuYWxzL29iamVjdC1jcmVhdGUuanMiLCJ3ZWJwYWNrOi8vLy4uLy4uL25vZGVfbW9kdWxlcy9jb3JlLWpzL2ludGVybmFscy9vYmplY3QtZGVmaW5lLXByb3BlcnRpZXMuanMiLCJ3ZWJwYWNrOi8vLy4uLy4uL25vZGVfbW9kdWxlcy9jb3JlLWpzL2ludGVybmFscy9vYmplY3QtZGVmaW5lLXByb3BlcnR5LmpzIiwid2VicGFjazovLy8uLi8uLi9ub2RlX21vZHVsZXMvY29yZS1qcy9pbnRlcm5hbHMvb2JqZWN0LWdldC1vd24tcHJvcGVydHktZGVzY3JpcHRvci5qcyIsIndlYnBhY2s6Ly8vLi4vLi4vbm9kZV9tb2R1bGVzL2NvcmUtanMvaW50ZXJuYWxzL29iamVjdC1nZXQtb3duLXByb3BlcnR5LW5hbWVzLmpzIiwid2VicGFjazovLy8uLi8uLi9ub2RlX21vZHVsZXMvY29yZS1qcy9pbnRlcm5hbHMvb2JqZWN0LWdldC1vd24tcHJvcGVydHktc3ltYm9scy5qcyIsIndlYnBhY2s6Ly8vLi4vLi4vbm9kZV9tb2R1bGVzL2NvcmUtanMvaW50ZXJuYWxzL29iamVjdC1nZXQtcHJvdG90eXBlLW9mLmpzIiwid2VicGFjazovLy8uLi8uLi9ub2RlX21vZHVsZXMvY29yZS1qcy9pbnRlcm5hbHMvb2JqZWN0LWlzLXByb3RvdHlwZS1vZi5qcyIsIndlYnBhY2s6Ly8vLi4vLi4vbm9kZV9tb2R1bGVzL2NvcmUtanMvaW50ZXJuYWxzL29iamVjdC1rZXlzLWludGVybmFsLmpzIiwid2VicGFjazovLy8uLi8uLi9ub2RlX21vZHVsZXMvY29yZS1qcy9pbnRlcm5hbHMvb2JqZWN0LWtleXMuanMiLCJ3ZWJwYWNrOi8vLy4uLy4uL25vZGVfbW9kdWxlcy9jb3JlLWpzL2ludGVybmFscy9vYmplY3QtcHJvcGVydHktaXMtZW51bWVyYWJsZS5qcyIsIndlYnBhY2s6Ly8vLi4vLi4vbm9kZV9tb2R1bGVzL2NvcmUtanMvaW50ZXJuYWxzL29iamVjdC1zZXQtcHJvdG90eXBlLW9mLmpzIiwid2VicGFjazovLy8uLi8uLi9ub2RlX21vZHVsZXMvY29yZS1qcy9pbnRlcm5hbHMvb3JkaW5hcnktdG8tcHJpbWl0aXZlLmpzIiwid2VicGFjazovLy8uLi8uLi9ub2RlX21vZHVsZXMvY29yZS1qcy9pbnRlcm5hbHMvb3duLWtleXMuanMiLCJ3ZWJwYWNrOi8vLy4uLy4uL25vZGVfbW9kdWxlcy9jb3JlLWpzL2ludGVybmFscy9wcm94eS1hY2Nlc3Nvci5qcyIsIndlYnBhY2s6Ly8vLi4vLi4vbm9kZV9tb2R1bGVzL2NvcmUtanMvaW50ZXJuYWxzL3JlZ2V4cC1leGVjLWFic3RyYWN0LmpzIiwid2VicGFjazovLy8uLi8uLi9ub2RlX21vZHVsZXMvY29yZS1qcy9pbnRlcm5hbHMvcmVnZXhwLWV4ZWMuanMiLCJ3ZWJwYWNrOi8vLy4uLy4uL25vZGVfbW9kdWxlcy9jb3JlLWpzL2ludGVybmFscy9yZWdleHAtZmxhZ3MuanMiLCJ3ZWJwYWNrOi8vLy4uLy4uL25vZGVfbW9kdWxlcy9jb3JlLWpzL2ludGVybmFscy9yZWdleHAtZ2V0LWZsYWdzLmpzIiwid2VicGFjazovLy8uLi8uLi9ub2RlX21vZHVsZXMvY29yZS1qcy9pbnRlcm5hbHMvcmVnZXhwLXN0aWNreS1oZWxwZXJzLmpzIiwid2VicGFjazovLy8uLi8uLi9ub2RlX21vZHVsZXMvY29yZS1qcy9pbnRlcm5hbHMvcmVnZXhwLXVuc3VwcG9ydGVkLWRvdC1hbGwuanMiLCJ3ZWJwYWNrOi8vLy4uLy4uL25vZGVfbW9kdWxlcy9jb3JlLWpzL2ludGVybmFscy9yZWdleHAtdW5zdXBwb3J0ZWQtbmNnLmpzIiwid2VicGFjazovLy8uLi8uLi9ub2RlX21vZHVsZXMvY29yZS1qcy9pbnRlcm5hbHMvcmVxdWlyZS1vYmplY3QtY29lcmNpYmxlLmpzIiwid2VicGFjazovLy8uLi8uLi9ub2RlX21vZHVsZXMvY29yZS1qcy9pbnRlcm5hbHMvc2FmZS1nZXQtYnVpbHQtaW4uanMiLCJ3ZWJwYWNrOi8vLy4uLy4uL25vZGVfbW9kdWxlcy9jb3JlLWpzL2ludGVybmFscy9zZXQtc3BlY2llcy5qcyIsIndlYnBhY2s6Ly8vLi4vLi4vbm9kZV9tb2R1bGVzL2NvcmUtanMvaW50ZXJuYWxzL3NldC10by1zdHJpbmctdGFnLmpzIiwid2VicGFjazovLy8uLi8uLi9ub2RlX21vZHVsZXMvY29yZS1qcy9pbnRlcm5hbHMvc2hhcmVkLWtleS5qcyIsIndlYnBhY2s6Ly8vLi4vLi4vbm9kZV9tb2R1bGVzL2NvcmUtanMvaW50ZXJuYWxzL3NoYXJlZC1zdG9yZS5qcyIsIndlYnBhY2s6Ly8vLi4vLi4vbm9kZV9tb2R1bGVzL2NvcmUtanMvaW50ZXJuYWxzL3NoYXJlZC5qcyIsIndlYnBhY2s6Ly8vLi4vLi4vbm9kZV9tb2R1bGVzL2NvcmUtanMvaW50ZXJuYWxzL3NwZWNpZXMtY29uc3RydWN0b3IuanMiLCJ3ZWJwYWNrOi8vLy4uLy4uL25vZGVfbW9kdWxlcy9jb3JlLWpzL2ludGVybmFscy9zdHJpbmctbXVsdGlieXRlLmpzIiwid2VicGFjazovLy8uLi8uLi9ub2RlX21vZHVsZXMvY29yZS1qcy9pbnRlcm5hbHMvc3RyaW5nLXB1bnljb2RlLXRvLWFzY2lpLmpzIiwid2VicGFjazovLy8uLi8uLi9ub2RlX21vZHVsZXMvY29yZS1qcy9pbnRlcm5hbHMvc3ltYm9sLWNvbnN0cnVjdG9yLWRldGVjdGlvbi5qcyIsIndlYnBhY2s6Ly8vLi4vLi4vbm9kZV9tb2R1bGVzL2NvcmUtanMvaW50ZXJuYWxzL3RvLWFic29sdXRlLWluZGV4LmpzIiwid2VicGFjazovLy8uLi8uLi9ub2RlX21vZHVsZXMvY29yZS1qcy9pbnRlcm5hbHMvdG8taW5kZXhlZC1vYmplY3QuanMiLCJ3ZWJwYWNrOi8vLy4uLy4uL25vZGVfbW9kdWxlcy9jb3JlLWpzL2ludGVybmFscy90by1pbnRlZ2VyLW9yLWluZmluaXR5LmpzIiwid2VicGFjazovLy8uLi8uLi9ub2RlX21vZHVsZXMvY29yZS1qcy9pbnRlcm5hbHMvdG8tbGVuZ3RoLmpzIiwid2VicGFjazovLy8uLi8uLi9ub2RlX21vZHVsZXMvY29yZS1qcy9pbnRlcm5hbHMvdG8tb2JqZWN0LmpzIiwid2VicGFjazovLy8uLi8uLi9ub2RlX21vZHVsZXMvY29yZS1qcy9pbnRlcm5hbHMvdG8tcHJpbWl0aXZlLmpzIiwid2VicGFjazovLy8uLi8uLi9ub2RlX21vZHVsZXMvY29yZS1qcy9pbnRlcm5hbHMvdG8tcHJvcGVydHkta2V5LmpzIiwid2VicGFjazovLy8uLi8uLi9ub2RlX21vZHVsZXMvY29yZS1qcy9pbnRlcm5hbHMvdG8tc3RyaW5nLXRhZy1zdXBwb3J0LmpzIiwid2VicGFjazovLy8uLi8uLi9ub2RlX21vZHVsZXMvY29yZS1qcy9pbnRlcm5hbHMvdG8tc3RyaW5nLmpzIiwid2VicGFjazovLy8uLi8uLi9ub2RlX21vZHVsZXMvY29yZS1qcy9pbnRlcm5hbHMvdHJ5LXRvLXN0cmluZy5qcyIsIndlYnBhY2s6Ly8vLi4vLi4vbm9kZV9tb2R1bGVzL2NvcmUtanMvaW50ZXJuYWxzL3VpZC5qcyIsIndlYnBhY2s6Ly8vLi4vLi4vbm9kZV9tb2R1bGVzL2NvcmUtanMvaW50ZXJuYWxzL3VybC1jb25zdHJ1Y3Rvci1kZXRlY3Rpb24uanMiLCJ3ZWJwYWNrOi8vLy4uLy4uL25vZGVfbW9kdWxlcy9jb3JlLWpzL2ludGVybmFscy91c2Utc3ltYm9sLWFzLXVpZC5qcyIsIndlYnBhY2s6Ly8vLi4vLi4vbm9kZV9tb2R1bGVzL2NvcmUtanMvaW50ZXJuYWxzL3Y4LXByb3RvdHlwZS1kZWZpbmUtYnVnLmpzIiwid2VicGFjazovLy8uLi8uLi9ub2RlX21vZHVsZXMvY29yZS1qcy9pbnRlcm5hbHMvdmFsaWRhdGUtYXJndW1lbnRzLWxlbmd0aC5qcyIsIndlYnBhY2s6Ly8vLi4vLi4vbm9kZV9tb2R1bGVzL2NvcmUtanMvaW50ZXJuYWxzL3dlYWstbWFwLWJhc2ljLWRldGVjdGlvbi5qcyIsIndlYnBhY2s6Ly8vLi4vLi4vbm9kZV9tb2R1bGVzL2NvcmUtanMvaW50ZXJuYWxzL3dlbGwta25vd24tc3ltYm9sLmpzIiwid2VicGFjazovLy8uLi8uLi9ub2RlX21vZHVsZXMvY29yZS1qcy9tb2R1bGVzL2VzLmFycmF5LmluY2x1ZGVzLmpzIiwid2VicGFjazovLy8uLi8uLi9ub2RlX21vZHVsZXMvY29yZS1qcy9tb2R1bGVzL2VzLmFycmF5Lml0ZXJhdG9yLmpzIiwid2VicGFjazovLy8uLi8uLi9ub2RlX21vZHVsZXMvY29yZS1qcy9tb2R1bGVzL2VzLnJlZ2V4cC5jb25zdHJ1Y3Rvci5qcyIsIndlYnBhY2s6Ly8vLi4vLi4vbm9kZV9tb2R1bGVzL2NvcmUtanMvbW9kdWxlcy9lcy5yZWdleHAuZXhlYy5qcyIsIndlYnBhY2s6Ly8vLi4vLi4vbm9kZV9tb2R1bGVzL2NvcmUtanMvbW9kdWxlcy9lcy5zdHJpbmcuaXRlcmF0b3IuanMiLCJ3ZWJwYWNrOi8vLy4uLy4uL25vZGVfbW9kdWxlcy9jb3JlLWpzL21vZHVsZXMvZXMuc3RyaW5nLm1hdGNoLWFsbC5qcyIsIndlYnBhY2s6Ly8vLi4vLi4vbm9kZV9tb2R1bGVzL2NvcmUtanMvbW9kdWxlcy9lcy5zdHJpbmcucmVwbGFjZS1hbGwuanMiLCJ3ZWJwYWNrOi8vLy4uLy4uL25vZGVfbW9kdWxlcy9jb3JlLWpzL21vZHVsZXMvZXMuc3RyaW5nLnJlcGxhY2UuanMiLCJ3ZWJwYWNrOi8vLy4uLy4uL25vZGVfbW9kdWxlcy9jb3JlLWpzL21vZHVsZXMvZXNuZXh0LnN0cmluZy5tYXRjaC1hbGwuanMiLCJ3ZWJwYWNrOi8vLy4uLy4uL25vZGVfbW9kdWxlcy9jb3JlLWpzL21vZHVsZXMvZXNuZXh0LnN0cmluZy5yZXBsYWNlLWFsbC5qcyIsIndlYnBhY2s6Ly8vLi4vLi4vbm9kZV9tb2R1bGVzL2NvcmUtanMvbW9kdWxlcy93ZWIudXJsLXNlYXJjaC1wYXJhbXMuY29uc3RydWN0b3IuanMiLCJ3ZWJwYWNrOi8vLy4uLy4uL25vZGVfbW9kdWxlcy9jb3JlLWpzL21vZHVsZXMvd2ViLnVybC1zZWFyY2gtcGFyYW1zLmpzIiwid2VicGFjazovLy8uLi8uLi9ub2RlX21vZHVsZXMvY29yZS1qcy9tb2R1bGVzL3dlYi51cmwuY29uc3RydWN0b3IuanMiLCJ3ZWJwYWNrOi8vLy4uLy4uL25vZGVfbW9kdWxlcy9jb3JlLWpzL21vZHVsZXMvd2ViLnVybC5qcyIsIndlYnBhY2s6Ly8vd2VicGFjay9ib290c3RyYXAiLCJ3ZWJwYWNrOi8vL3dlYnBhY2svcnVudGltZS9jb21wYXQgZ2V0IGRlZmF1bHQgZXhwb3J0Iiwid2VicGFjazovLy93ZWJwYWNrL3J1bnRpbWUvZGVmaW5lIHByb3BlcnR5IGdldHRlcnMiLCJ3ZWJwYWNrOi8vL3dlYnBhY2svcnVudGltZS9lbnN1cmUgY2h1bmsiLCJ3ZWJwYWNrOi8vL3dlYnBhY2svcnVudGltZS9nZXQgamF2YXNjcmlwdCBjaHVuayBmaWxlbmFtZSIsIndlYnBhY2s6Ly8vd2VicGFjay9ydW50aW1lL2dldCBtaW5pLWNzcyBjaHVuayBmaWxlbmFtZSIsIndlYnBhY2s6Ly8vd2VicGFjay9ydW50aW1lL2dsb2JhbCIsIndlYnBhY2s6Ly8vd2VicGFjay9ydW50aW1lL2hhc093blByb3BlcnR5IHNob3J0aGFuZCIsIndlYnBhY2s6Ly8vd2VicGFjay9ydW50aW1lL2xvYWQgc2NyaXB0Iiwid2VicGFjazovLy93ZWJwYWNrL3J1bnRpbWUvbWFrZSBuYW1lc3BhY2Ugb2JqZWN0Iiwid2VicGFjazovLy93ZWJwYWNrL3J1bnRpbWUvcHVibGljUGF0aCIsIndlYnBhY2s6Ly8vd2VicGFjay9ydW50aW1lL2pzb25wIGNodW5rIGxvYWRpbmciLCJ3ZWJwYWNrOi8vLy4vbWFpbi5qcyJdLCJzb3VyY2VzQ29udGVudCI6WyIvLy8vLy8vLy8vLy8vLy8vXG4vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy9cbi8vLy8vLy8vL1xuaW1wb3J0ICcuLi8uLi9leGFtcGxlcy90ZXh0YXJlYUluc2VydHNfMmNvbHMuY3NzJ1xuLy8vLy8vLy8vL1xuXG5pbXBvcnQgeyB0ZXh0YXJlYUluc2VydHMsIHRvb2xiYXJNYXRoT3BlcmF0b3JzLCB0b29sYmFyRnJhY3Rpb24sIHRvb2xiYXJDb21wYXJpc29uLCB0b29sYmFyUGVyY2VudCwgdG9vbGJhckV1cm8gfSBmcm9tICcuLi8uLi9saWJzL3RleHRhcmVhSW5zZXJ0cydcblxuY29uc3QgdG9vbGJhcnMgPSB7XG5cdGNvbXA6IHRvb2xiYXJDb21wYXJpc29uLFxuXHRtYXRoOiB0b29sYmFyTWF0aE9wZXJhdG9ycyxcblx0ZnJhY3Q6IHRvb2xiYXJGcmFjdGlvbixcblx0cGVyYzogdG9vbGJhclBlcmNlbnQsXG5cdGV1cm86IHRvb2xiYXJFdXJvLFxufVxuXG5leHBvcnQgY2xhc3MgdGV4dGFyZWFJbnNlcnRzRnJvbVNjaGVtYSBleHRlbmRzIHRleHRhcmVhSW5zZXJ0cyB7XG5cblx0Y29uc3RydWN0b3IgKCBkaXZTZWxlY3Rvciwgb3B0cyA9IHt9LCBiYXNlID0gbnVsbCApIHtcblxuXHRcdGlmICggYmFzZS5mc20gJiYgYmFzZS5mc20uaW5jSW5pdENudCApIHtcblx0XHRcdGJhc2UuZnNtLmluY0luaXRDbnQoKTtcblx0XHR9XG5cblx0XHRsZXQgd2lkdGg7XG4vLy8vLy8vLy8vLy8vLy8vLy9cblx0XHR3aWR0aCA9IHdpbmRvdy5pbm5lcldpZHRoO1xuLy8vLy8vLy8vXG4vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vXG4vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vL1xuLy8vLy8vLy8vL1xuXHRcdGxldCB3V2lkdGggPSAgb3B0cy53aWR0aDtcblx0XHRpZiAoIHdXaWR0aDw9MCApIHtcblx0XHRcdHdXaWR0aCArPSB3aWR0aDtcblx0XHR9O1xuXG5cdFx0Ly8gaGVpZ2h0IGlzIGNvbnRhaW5lciBoZWlnaHQgb3Igd2luZG93LmhlaWdodFxuXHRcdGxldCBoZWlnaHQ7XG4vLy8vLy8vLy8vLy8vLy8vLy9cblx0XHRoZWlnaHQgPSB3aW5kb3cuaW5uZXJIZWlnaHQ7XG4vLy8vLy8vLy9cbi8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy9cbi8vLy8vLy8vLy9cblx0XHRsZXQgd0hlaWdodCA9IG9wdHMuaGVpZ2h0O1xuXHRcdGlmICggd0hlaWdodDw9MCApIHtcblx0XHRcdHdIZWlnaHQgKz0gaGVpZ2h0O1xuXHRcdH1cblx0XHRjb25zdCB0b29sYmFyQ2VsbFdpZHRoID0gb3B0cy50b29sYmFyQ2VsbFdpZHRoO1xuXG5cdFx0Y29uc3QgZGVmcyA9IHtcblx0XHRcdHRvb2xiYXJEaXJlY3Rpb246ICdyb3cnLFxuXHRcdFx0ZGl2U3R5bGVzOiB7XG5cdFx0XHRcdHdpZHRoOiBgJHt3V2lkdGgtMip0b29sYmFyQ2VsbFdpZHRoLTV9cHhgLFxuXHRcdFx0XHRoZWlnaHQ6IGAke3dIZWlnaHR9cHhgLFxuXHRcdFx0fSxcblxuXHRcdFx0dG9vbGJhckNvbnRhaW5lclN0eWxlczoge1xuXHRcdFx0XHQvLyBsZWZ0OiBgJHt3V2lkdGgtNip0b29sYmFyQ2VsbFdpZHRoLTE3fXB4YCxcblx0XHRcdFx0Ly8gdG9wOiBgJHt3SGVpZ2h0LXRvb2xiYXJDZWxsV2lkdGgtMTd9cHhgLFxuXHRcdFx0XHR3aWR0aDogYCR7Mip0b29sYmFyQ2VsbFdpZHRofXB4YCxcblx0XHRcdFx0aGVpZ2h0OiBgJHsyKnRvb2xiYXJDZWxsV2lkdGh9cHhgLFxuXHRcdFx0XHQnZmxleC13cmFwJzogJ3dyYXAnLFxuXHRcdFx0fSxcblxuXHRcdFx0dG9vbGJhckNlbGxTdHlsZXM6IHtcblx0XHRcdFx0d2lkdGg6IGAke3Rvb2xiYXJDZWxsV2lkdGh9cHhgLFxuXHRcdFx0XHRoZWlnaHQ6IGAke3Rvb2xiYXJDZWxsV2lkdGh9cHhgLFxuXHRcdFx0fSxcblxuXHRcdFx0dG9vbGJhcjogW10sXG5cdFx0fTtcblx0XHRpZiAoIG9wdHMuZGF0YVNldHRpbmdzICkge1xuXHRcdFx0ZGVmcy5kYXRhU2V0dGluZ3MgPSBvcHRzLmRhdGFTZXR0aW5ncztcblx0XHR9XG5cblx0XHRmb3IgKCBjb25zdCB0YiBpbiB0b29sYmFycyApIHtcblx0XHRcdGlmICggb3B0cy50b29sYmFyW3RiXSApIHtcblx0XHRcdFx0ZGVmcy50b29sYmFyID0gZGVmcy50b29sYmFyLmNvbmNhdCggdG9vbGJhcnNbdGJdIClcblx0XHRcdH1cblx0XHR9XG5cblx0XHRzdXBlciggZGl2U2VsZWN0b3IsIGRlZnMsIGJhc2UgKTtcblxuXHRcdGlmICggYmFzZS5mc20gJiYgYmFzZS5mc20uZGVjSW5pdENudCApIHtcblx0XHRcdGJhc2UuZnNtLmRlY0luaXRDbnQoKTtcblx0XHR9XG5cdH1cblxuXHRzY29yZURlZiAoKSB7XG5cblx0XHRjb25zdCBwcmVmID0gdGhpcy5kYXRhU2V0dGluZ3MudmFyaWFibGVQcmVmaXg7XG5cdFx0Y29uc3QgcmVzID17XG5cdFx0XHRbYFZfSW5wdXRfJHtwcmVmfWBdOiB0aGlzLmV4dHJhY3QoKSxcblx0XHR9O1xuXHRcdHJldHVybiByZXM7XG5cdH1cblxufVxuIiwiZXhwb3J0IGZ1bmN0aW9uIGNsZWFyQ2ZnSnNvbigganNvbiApIHtcblxuXHRpZiAoIHR5cGVvZiBqc29uICE9PSAnb2JqZWN0JyApIHtcblx0XHRyZXR1cm4ganNvbjtcblx0fVxuXHRpZiAoIEFycmF5LmlzQXJyYXkoanNvbikgKSB7XG5cdFx0cmV0dXJuIGpzb24ubWFwKCBhID0+IGNsZWFyQ2ZnSnNvbihhKSApXG5cdH1cblxuXHRjb25zdCByZXMgPSB7fTtcblxuXHRPYmplY3QuZW50cmllcygganNvbiApLmZvckVhY2goIChbayx2XSkgPT4ge1xuXG5cdFx0aWYgKCBrLnN1YnN0cmluZyggMCwgMyApID09PSAnX19fJyApIHtcblxuXHRcdFx0Ly8gLy8gS2V5cyBkZXIgRWxlbWVudGUgZWluZXMgQXJyYXlzIG5laG1lblxuXHRcdFx0Ly8gY29uc3QgYXJlbGtleXMgPSBrLm1hdGNoKCAvXl9fX2FyZWxrZXlzXyguKikvICk7XG5cdFx0XHQvLyBpZiAoIGFyZWxrZXlzICkge1xuXHRcdFx0Ly8gXHRqc29uWyBhcmVsa2V5c1sxXSBdID0gdi5tYXAoIGUgPT4gT2JqZWN0LmtleXMoZSkgKTtcblx0XHRcdC8vIH0gZWxzZSB7XG5cblx0XHRcdFx0Ly8gVmFscyBkZXIgRWxlbWVudGUgZWluZXMgQXJyYXlzIG5laG1lblxuXHRcdFx0XHRjb25zdCBhcmVsdmFscyA9IGsubWF0Y2goIC9eX19fYXJlbHZhbHNfKC4qKS8gKTtcblx0XHRcdFx0aWYgKCBhcmVsdmFscyApIHtcblx0XHRcdFx0XHRyZXNbIGFyZWx2YWxzWzFdIF0gPSB2Lm1hcCggZSA9PiBPYmplY3QudmFsdWVzKGUpLm1hcCggYSA9PiBjbGVhckNmZ0pzb24oYSkgKSApO1xuXHRcdFx0XHR9IGVsc2Uge1xuXG5cdFx0XHRcdFx0Ly8gQWx0ZXJuYXRpdmUgTmFtZW4gZWluZmFjaCBzbyBzcGVpY2hlcm5cblx0XHRcdFx0XHRjb25zdCBhbHRzID0gay5tYXRjaCggL15fX19hbHRbXl9dKl8oLiopLyApO1xuXHRcdFx0XHRcdGlmICggYWx0cyApIHtcblx0XHRcdFx0XHRcdGlmICggdiAhPT0gdW5kZWZpbmVkICkge1xuXHRcdFx0XHRcdFx0XHRyZXNbIGFsdHNbMV0gXSA9IGNsZWFyQ2ZnSnNvbiggdiApO1xuXHRcdFx0XHRcdFx0fVxuXHRcdFx0XHRcdH0gZWxzZSB7XG5cblx0XHRcdFx0XHRcdC8vIF9fXyBPYmplY3QgaW4ganNvbiBpbnRlZ3JpZXJlblxuXHRcdFx0XHRcdFx0aWYgKCB0eXBlb2YgdiA9PT0gJ29iamVjdCcgKSB7XG5cdFx0XHRcdFx0XHRcdE9iamVjdC5hc3NpZ24oIHJlcywgY2xlYXJDZmdKc29uKHYpICk7XG5cdFx0XHRcdFx0XHR9XG5cblx0XHRcdFx0XHR9XG5cdFx0XHRcdH1cblx0XHRcdC8vIH1cblxuXHRcdH0gZWxzZSB7XG5cblx0XHRcdGlmICggdiAhPT0gdW5kZWZpbmVkICkge1xuXHRcdFx0XHRjb25zdCBzdWJvYmogPSBrLm1hdGNoKCAvXiguKj8pX19fKC4qKS8gKTtcblx0XHRcdFx0aWYgKCBzdWJvYmogKSB7XG5cdFx0XHRcdFx0Ly8geyBhYmNfX19kZWY6IDEyMyB9ID0+IHsgYWJjOiB7IGRlZjogMTIzIH0gfVxuXHRcdFx0XHRcdGNvbnN0IG5ld09iaiA9IGNsZWFyQ2ZnSnNvbiggeyBbIHN1Ym9ialsyXSBdOiB2IH0gKTtcblx0XHRcdFx0XHRpZiAoICEoIHN1Ym9ialsxXSBpbiByZXMgKSApIHtcblx0XHRcdFx0XHRcdHJlc1sgc3Vib2JqWzFdIF0gPSB7fTtcblx0XHRcdFx0XHR9XG5cdFx0XHRcdFx0T2JqZWN0LmFzc2lnbiggcmVzWyBzdWJvYmpbMV0gXSwgbmV3T2JqICk7XG5cdFx0XHRcdH0gZWxzZSB7XG5cdFx0XHRcdFx0Ly8gY29weSB2YWx1ZVxuXHRcdFx0XHRcdHJlc1sgayBdID0gY2xlYXJDZmdKc29uKHYpO1xuXHRcdFx0XHR9XG5cdFx0XHR9XG5cblx0XHR9XG5cdH0pXG5cblx0cmV0dXJuIHJlcztcbn1cblxuLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vXG5cbmltcG9ydCB7IGlzQmV0d2VlbiwgaXNOdW1Vbml0IH0gZnJvbSBcIi4uL2xpYnMvY29tbW9uXCI7XG5cbmZ1bmN0aW9uIGRlYnVnQW5kQ29uc29sZU91dCAocykge1xuXHRpZiAoIHR5cGVvZiBkZWJ1Z091dCAhPT0gJ3VuZGVmaW5lZCcgKVx0e1xuXHRcdGRlYnVnT3V0KCBgPHNwYW4gY2xhc3M9XCJlcnJvclwiPiR7c308L3NwYW4+YCApO1xuXHR9XG5cdGNvbnNvbGUuZXJyb3Iocyk7XG59XG5cbmV4cG9ydCBmdW5jdGlvbiBhZGRTY29yaW5nICggb2JqLCBvcHRzLCBQYXJzZXI9bnVsbCwgYWRkRm5jcz17fSApIHtcblxuXHRvYmouY29tcHV0ZVNjb3JpbmdWYWxzID0gKCkgPT4ge307XG5cdGlmICggIVBhcnNlciApIHtcblx0XHRyZXR1cm47XG5cdH1cblxuXHQvLyBjcmVhdGUgUGFyc2VyLCBhZGQgYWRkRm5jc1xuXHRjb25zdCBwYXJzZXIgPSBuZXcgUGFyc2VyKCk7XG5cdE9iamVjdC5hc3NpZ24oIGFkZEZuY3MsIHtcblx0XHRpc051bGw6IHYgPT4gdj09PW51bGwsXG5cdFx0aXNOdW1Vbml0LFxuXHRcdGlzQmV0d2Vlbixcblx0XHRtYXRjaDogKGEscixmbD0nJykgPT4gYS50b1N0cmluZygpLm1hdGNoKCBuZXcgUmVnRXhwKHIsZmwpICksXG5cdFx0Ly8gcmVnZXhwOiAoYSxiKSA9PiBhLm1hdGNoKGIpLFxuXHRcdHN0ckVxdWFsOiAoYSxiKSA9PiBhLnRvTG93ZXJDYXNlID09IGIudG9Mb3dlckNhc2UsXG5cdH0pO1xuXHRmb3IgKCBjb25zdCBmbmMgaW4gYWRkRm5jcyApIHtcblx0XHRwYXJzZXIuZnVuY3Rpb25zW2ZuY109IGFkZEZuY3NbZm5jXTtcblx0fVxuXG5cdGlmICggb3B0cy5kYXRhU2V0dGluZ3MgJiYgb3B0cy5kYXRhU2V0dGluZ3Muc2NvcmluZ1ZhbHMgJiYgb2JqLnNjb3JlRGVmICkge1xuXG5cdFx0Y29uc3Qgc2NvcmluZ1ZhbHMgPSBvcHRzLmRhdGFTZXR0aW5ncy5zY29yaW5nVmFscztcblxuXHRcdGNvbnN0IHNjb3JlcyA9IG9iai5zY29yZURlZigpO1xuXHRcdGlmICggdHlwZW9mIHNjb3JlcyA9PT0gJ29iamVjdCcgKSB7XG5cdFx0XHRjb25zdCB2YXJOYW1lcyA9IE9iamVjdC5rZXlzKCBzY29yZXMgKTtcblx0XHRcdGlmICggdmFyTmFtZXMubGVuZ3RoPjAgKSB7XG5cblx0XHRcdFx0c2NvcmluZ1ZhbHMuZm9yRWFjaCggc3YgPT4ge1xuXHRcdFx0XHRcdGxldCBjb25kID0gc3YuY29uZGl0aW9uO1xuXHRcdFx0XHRcdGlmICggY29uZCApIHtcblx0XHRcdFx0XHRcdGxldCBzYXZlQ29uZCA9IGNvbmQ7XG5cdFx0XHRcdFx0XHRjb25zdCBhbGxWYXJzSW5Db25kID0gY29uZC5tYXRjaEFsbCggL1xcJFxceyhbXn1dKil9L2cgKTtcblx0XHRcdFx0XHRcdGZvciAoIGNvbnN0IHZuIG9mIGFsbFZhcnNJbkNvbmQgKSB7XG5cdFx0XHRcdFx0XHRcdGlmICggdm5bMV0ubGVuZ3RoID09IDAgKSB7XG5cdFx0XHRcdFx0XHRcdFx0ZGVidWdBbmRDb25zb2xlT3V0KCBgVmFyaWFibGVuLU5hbWUgJ1xcJHt9JyBpbiBTY29yaW5nIG5pY2h0IHp1bMOkc3NpZ2AgKTtcblx0XHRcdFx0XHRcdFx0fSBlbHNlIHtcblx0XHRcdFx0XHRcdFx0XHRjb25zdCB2YXJzZWFyY2ggPSBvcHRzLmRhdGFTZXR0aW5ncy52YXJpYWJsZVByZWZpeCA/IHZuWzFdLnJlcGxhY2UoIC88cHJlZj4vaSwgb3B0cy5kYXRhU2V0dGluZ3MudmFyaWFibGVQcmVmaXggKSA6IHZuWzFdO1xuXHRcdFx0XHRcdFx0XHRcdGNvbnN0IHJlID0gbmV3IFJlZ0V4cCggYCR7dmFyc2VhcmNofSRgLCAnaScgKTtcblx0XHRcdFx0XHRcdFx0XHRjb25zdCBzZWxWYXJOYW1lcyA9IHZhck5hbWVzLmZpbHRlciggdiA9PiB2Lm1hdGNoKHJlKSApO1xuXHRcdFx0XHRcdFx0XHRcdGlmICggc2VsVmFyTmFtZXMubGVuZ3RoPjEgKSB7XG5cdFx0XHRcdFx0XHRcdFx0XHRkZWJ1Z0FuZENvbnNvbGVPdXQoIGBWYXJpYWJsZW4tTmFtZSAnXFwkeyR7dm5bMV19fScgaW4gU2NvcmluZyBpc3QgbmljaHQgZWluZGV1dGlnYCk7XG5cdFx0XHRcdFx0XHRcdFx0XHRzYXZlQ29uZCA9ICcnO1xuXHRcdFx0XHRcdFx0XHRcdH0gZWxzZSBpZiAoIHNlbFZhck5hbWVzLmxlbmd0aCA9PSAwICkge1xuXHRcdFx0XHRcdFx0XHRcdFx0ZGVidWdBbmRDb25zb2xlT3V0KCBgVmFyaWFibGVuLU5hbWUgJ1xcJHske3ZuWzFdfX0nIGluIFNjb3JpbmcgdW5iZWthbm50YCk7XG5cdFx0XHRcdFx0XHRcdFx0XHRzYXZlQ29uZCA9ICcnO1xuXHRcdFx0XHRcdFx0XHRcdH0gZWxzZSB7XG5cdFx0XHRcdFx0XHRcdFx0XHRzYXZlQ29uZCA9IHNhdmVDb25kLnJlcGxhY2UoIHZuWzBdLCBzZWxWYXJOYW1lc1swXSApO1xuXHRcdFx0XHRcdFx0XHRcdH1cblx0XHRcdFx0XHRcdFx0fVxuXHRcdFx0XHRcdFx0fVxuXHRcdFx0XHRcdFx0aWYgKCBzYXZlQ29uZCApIHtcblx0XHRcdFx0XHRcdFx0Ly8gY2hlY2sgZXJyb3JzXG5cblx0XHRcdFx0XHRcdFx0Ly8gW1xuXHRcdFx0XHRcdFx0XHQvLyBcdFsgLyg/PCFbPSE+PF0pPSg/IVs9IV0pL2csIGBXZXJ0enV3ZWlzdW5nICg9KSBzdGF0dCBWZXJnbGVpY2hzb3BlcmF0b3IgKD09KSBpbiBcIiR7Y29uZH1cIiBnZWZ1bmRlbiEgSXN0IGRhcyBiZWFic2ljaHRpZ3Q/YCBdLFxuXHRcdFx0XHRcdFx0XHQvLyBcdFsgLzw+L2csIGBaZWljaGVua2V0dGUgKDw+KSBzdGF0ICghPSkgaW4gXCIke2NvbmR9XCIgZ2VmdW5kZW4hIElzdCBkYXMgYmVhYnNpY2h0aWd0P2AgXSxcblx0XHRcdFx0XHRcdFx0Ly8gXHRbIC98fC9nLCBgRG9wcGVsdGVzIFwifHxcIiBzdGF0dCBcIm9yXCIgaW4gXCIke2NvbmR9XCIgZ2VmdW5kZW4hIElzdCBkYXMgYmVhYnNpY2h0aWd0P2AgXSxcblx0XHRcdFx0XHRcdFx0Ly8gXHRbIC8mJi9nLCBgRG9wcGVsdGVzIFwiJiZcIiBzdGF0dCBcImFuZFwiIGluIFwiJHtjb25kfVwiIGdlZnVuZGVuISBJc3QgZGFzIGJlYWJzaWNodGlndD9gIF0sXG5cdFx0XHRcdFx0XHRcdC8vIFx0Ly8gWyAvKD88IVxcfCkoXFx8KSg/IVxcfCkvZywgYEVpbnplbG5lcyB8IHN0YXR0IHx8IGluIFwiJHtjb25kfVwiIGdlZnVuZGVuISBJc3QgZGFzIGJlYWJzaWNodGlndD9gIF0sXG5cdFx0XHRcdFx0XHRcdC8vIFx0Ly8gWyAvKD88ISYpJig/IVxcJikvZywgYEVpbnplbG5lcyAmIHN0YXR0ICYmIGluIFwiJHtjb25kfVwiIGdlZnVuZGVuISBJc3QgZGFzIGJlYWJzaWNodGlndD9gIF0sXG5cdFx0XHRcdFx0XHRcdC8vIF0uZm9yRWFjaCggKFtyZSxtc2ddKSA9PiB7XG5cdFx0XHRcdFx0XHRcdC8vIFx0aWYgKCBzYXZlQ29uZC5tYXRjaChyZSkgKSB7XG5cdFx0XHRcdFx0XHRcdC8vIFx0XHRkZWJ1Z0FuZENvbnNvbGVPdXQobXNnKTtcblx0XHRcdFx0XHRcdFx0Ly8gXHR9XG5cdFx0XHRcdFx0XHRcdC8vIH0pO1xuXHRcdFx0XHRcdFx0XHQvLyBIb3RGaXggZm9yIElCIEltcG9ydEV4dGVybmFsVmFyaWFibGVzOiBpbnRlcm5hbCBicm93c2VyIGRvZXMgbm90IHN1cHBvcnQgUmVnRXhwIGxvb2stYmVoaW5kLy1mb3J3YXJkXG5cdFx0XHRcdFx0XHRcdGlmICggQXJyYXkuZnJvbSggc2F2ZUNvbmQubWF0Y2hBbGwoIC9bITw+XT89Ky9nICkgKS5zb21lKCBtID0+IG1bMF09PSc9JyApICkge1xuXHRcdFx0XHRcdFx0XHRcdGRlYnVnQW5kQ29uc29sZU91dCggYFdlcnR6dXdlaXN1bmcgKD0pIHN0YXR0IFZlcmdsZWljaHNvcGVyYXRvciAoPT0pIGluIFwiJHtjb25kfVwiIGdlZnVuZGVuISBJc3QgZGFzIGJlYWJzaWNodGlndD9gICk7XG5cdFx0XHRcdFx0XHRcdH1cblx0XHRcdFx0XHRcdFx0aWYgKCBzYXZlQ29uZC5pbmNsdWRlcygnPD4nKSApIHtcblx0XHRcdFx0XHRcdFx0XHRkZWJ1Z0FuZENvbnNvbGVPdXQoIGBaZWljaGVua2V0dGUgKDw+KSBzdGF0ICghPSkgaW4gXCIke2NvbmR9XCIgZ2VmdW5kZW4hIElzdCBkYXMgYmVhYnNpY2h0aWd0P2AgKTtcblx0XHRcdFx0XHRcdFx0fVxuXHRcdFx0XHRcdFx0XHRpZiAoIHNhdmVDb25kLmluY2x1ZGVzKCd8fCcpICkge1xuXHRcdFx0XHRcdFx0XHRcdGRlYnVnQW5kQ29uc29sZU91dCggYERvcHBlbHRlcyBcInx8XCIgc3RhdHQgXCJvclwiIGluIFwiJHtjb25kfVwiIGdlZnVuZGVuISBJc3QgZGFzIGJlYWJzaWNodGlndD9gICk7XG5cdFx0XHRcdFx0XHRcdH1cblx0XHRcdFx0XHRcdFx0aWYgKCBzYXZlQ29uZC5pbmNsdWRlcygnJiYnKSApIHtcblx0XHRcdFx0XHRcdFx0XHRkZWJ1Z0FuZENvbnNvbGVPdXQoIGBEb3BwZWx0ZXMgXCImJlwiIHN0YXR0IFwiYW5kXCIgaW4gXCIke2NvbmR9XCIgZ2VmdW5kZW4hIElzdCBkYXMgYmVhYnNpY2h0aWd0P2AgKTtcblx0XHRcdFx0XHRcdFx0fVxuXG5cdFx0XHRcdFx0XHRcdGlmICggISggJ3Njb3JpbmdWYWxzJyBpbiBvYmogKSApIHtcblx0XHRcdFx0XHRcdFx0XHRvYmouc2NvcmluZ1ZhbHMgPSBbXTtcblx0XHRcdFx0XHRcdFx0fVxuXHRcdFx0XHRcdFx0XHR0cnkge1xuXHRcdFx0XHRcdFx0XHRcdG9iai5zY29yaW5nVmFscy5wdXNoKCBbIHN2LnZhbCwgcGFyc2VyLnBhcnNlKCBzYXZlQ29uZCApIF0gKTtcblx0XHRcdFx0XHRcdFx0fSBjYXRjaCAoZSkge1xuXHRcdFx0XHRcdFx0XHRcdGRlYnVnQW5kQ29uc29sZU91dCggYEZlaGxlciAoJHtlfSkgaW4gU2NvcmluZy1Db25kaXRpb246ICR7Y29uZH1gICk7XG5cdFx0XHRcdFx0XHRcdH1cblx0XHRcdFx0XHRcdH1cblx0XHRcdFx0XHR9XG5cdFx0XHRcdH0pO1xuXHRcdFx0fVxuXHRcdH1cblx0fVxuXG5cdGlmICggb2JqLnNjb3JpbmdWYWxzICkge1xuXHRcdG9iai5jb21wdXRlU2NvcmluZ1ZhbHMgPSBmdW5jdGlvbiAocmVzKSB7XG5cdFx0XHRsZXQgc2NvcmUgPSBudWxsO1xuXHRcdFx0Y29uc3Qgc2NvcmVEYXQgPSB0aGlzLnNjb3JpbmdWYWxzO1xuXHRcdFx0Zm9yICggbGV0IGg9MDsgc2NvcmU9PT1udWxsICYmIGg8c2NvcmVEYXQubGVuZ3RoOyBoKysgKSB7XG5cdFx0XHRcdGNvbnN0IFt2LGNdID0gc2NvcmVEYXRbaF07XG5cdFx0XHRcdHRyeSB7XG5cdFx0XHRcdFx0aWYgKCBjLmV2YWx1YXRlKCByZXMgKSApIHtcblx0XHRcdFx0XHRcdHNjb3JlID0gdjtcblx0XHRcdFx0XHR9XG5cdFx0XHRcdH0gY2F0Y2ggKGUpIHtcblx0XHRcdFx0XHRkZWJ1Z0FuZENvbnNvbGVPdXQoIGBFcnJvciBpbiBzY29yaW5nLWNvbmRpdGlvbjogJHtlfSwgJHtyZXN9YCApO1xuXHRcdFx0XHR9XG5cdFx0XHR9XG5cdFx0XHRjb25zdCBuID0gTnVtYmVyKHNjb3JlKVxuXHRcdFx0cmVzWyBgVl9TY29yZV8ke3RoaXMuZGF0YVNldHRpbmdzLnZhcmlhYmxlUHJlZml4fWAgXSA9IHNjb3JlIT09IG51bGwgJiYgbiE9PU5hTiA/IG4gOiBzY29yZTtcblx0XHR9XG5cblx0XHRpZiAoIG9iai5zY29yZURlZiAmJiBvYmouYmFzZSApIHtcblx0XHRcdG9iai5iYXNlLnNlbmRDaGFuZ2VTdGF0ZSggb2JqICk7XG5cdFx0fVxuXHR9XG5cbn1cblxuLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vXG5cbmV4cG9ydCBmdW5jdGlvbiBhZGRTdGF0dXNWYXJEZWYgKCBvYmosIGpzb24gKSB7XG5cblx0aWYgKCAhb2JqLnN0YXR1c1ZhckRlZiAmJiBqc29uLmRhdGFTZXR0aW5ncyAmJiBqc29uLmRhdGFTZXR0aW5ncy52YXJpYWJsZVByZWZpeCApIHtcblx0XHRjb25zdCBzdGF0VmFyTmFtZSA9IGBWX1N0YXR1c18ke2pzb24uZGF0YVNldHRpbmdzLnZhcmlhYmxlUHJlZml4fWA7XG5cdFx0b2JqLnN0YXR1c1ZhckRlZiA9IGZ1bmN0aW9uICgpIHtcblx0XHRcdHJldHVybiB7XG5cdFx0XHRcdFtzdGF0VmFyTmFtZV06ICt0aGlzLmdldERlZmF1bHRDaGFuZ2VTdGF0ZSgpLFxuXHRcdFx0fVxuXHRcdH1cblx0fVxuXG59XG5cblxuLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy9cblxuLy8gY29udmVydCBcIjEgMzQsNTo2LTlcIiB0byBbMSwzNCw1LDYsNyw4LDldXG4vKipcbiAqIFBhcnNlcyBhIHN0cmluZyBjb250YWluaW5nIHJhbmdlIHZhbHVlcyBhbmQgcmV0dXJucyBhbiBhcnJheSBvZiBudW1iZXJzLlxuICogQHBhcmFtIHtzdHJpbmd9IHMgLSBUaGUgc3RyaW5nIGNvbnRhaW5pbmcgdGhlIHJhbmdlIHZhbHVlcy5cbiAqIEByZXR1cm5zIHtudW1iZXJbXX0gLSBBbiBhcnJheSBvZiBudW1iZXJzIHBhcnNlZCBmcm9tIHRoZSByYW5nZSB2YWx1ZXMuXG4gKi9cbmV4cG9ydCBjb25zdCByZWFkUmFuZ2VBcnJheSA9IChzKSA9PiB7XG5cdGNvbnN0IHJlcyA9IFtdO1xuXG5cdGZvciAoIGNvbnN0IHJyIG9mIHMubWF0Y2hBbGwoIC8oWzAtOV0rKSAqKD86LSAqKFswLTldKykpPy9nICkgKSB7XG5cdFx0aWYgKCByclsyXSAmJiByclsxXTxyclsyXSApIHtcblx0XHRcdGNvbnN0IHJyMj1OdW1iZXIocnJbMl0pO1xuXHRcdFx0Zm9yICggbGV0IGg9TnVtYmVyKHJyWzFdKTsgaDw9cnIyOyBoKysgKSB7XG5cdFx0XHRcdHJlcy5wdXNoKGgpO1xuXHRcdFx0fVxuXHRcdH0gZWxzZSB7XG5cdFx0XHRyZXMucHVzaCggTnVtYmVyKHJyWzFdKSApXG5cdFx0fVxuXHR9XG5cblx0cmV0dXJuIHJlcztcbn1cblxuLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy9cblxuLyoqXG4gKiBDb252ZXJ0cyBhbiBvYmplY3QgY29udGFpbmluZyBwcm9wZXJ0aWVzIGZvciBkZWNpbWFsIHBsYWNlcywgZGVjaW1hbCBwcmVjaXNpb24sIGFuZCB1bml0cyBpbnRvIGEgcmVndWxhciBleHByZXNzaW9uIGZvciBpbnB1dCB2YWxpZGF0aW9uLlxuICogQHBhcmFtIHtPYmplY3R9IG9iaiAtIFRoZSBvYmplY3QgY29udGFpbmluZyBwcm9wZXJ0aWVzIGZvciBkZWNpbWFsIHBsYWNlcywgZGVjaW1hbCBwcmVjaXNpb24sIGFuZCB1bml0cy5cbiAqL1xuZXhwb3J0IGNvbnN0IGRwMmlucHV0UmVnRXhwID0gKG9iaikgPT4ge1xuXG5cdC8qKlxuXHQgKiBHZW5lcmF0ZXMgYSByZWd1bGFyIGV4cHJlc3Npb24gcGF0dGVybiBmb3IgYSBnaXZlbiB1bml0LiAoY2FzZSBpbnNlbnNpdGl2ZSBjb25jYXRlbmF0aW9uIG9mIHVwcGVyIGFuZCBsb3dlciBjYXNlIGNoYXJhY3RlcnMpXG5cdCAqIEBwYXJhbSB7c3RyaW5nfSB1IC0gVGhlIHVuaXQgc3RyaW5nLlxuXHQgKiBAcmV0dXJucyB7c3RyaW5nfSBUaGUgcmVndWxhciBleHByZXNzaW9uIHBhdHRlcm4gZm9yIHRoZSB1bml0LlxuXHQgKi9cblx0Y29uc3QgdW5pdFJlZ0V4cCA9ICh1KSA9PiB7XG5cdFx0bGV0IHIgPSAnJztcblx0XHRmb3IgKCBjb25zdCBjIG9mIHUudHJpbSgpICkge1xuXHRcdFx0Y29uc3QgdSA9IGMudG9VcHBlckNhc2UoKTtcblx0XHRcdGNvbnN0IGwgPSBjLnRvTG93ZXJDYXNlKCk7XG5cdFx0XHRyICs9IHUgIT0gbCA/IGBbJHtsfSR7dX1dP2AgOiBgJHtjfT9gO1xuXHRcdH1cblx0XHRyZXR1cm4gcjtcblx0fTtcblxuXHRpZiAoIG9iai5wZHAgfHwgb2JqLmRwICkge1xuXHRcdGxldCByZSA9IGBeWzAtOV0keyBvYmoucGRwID8gYHswLCR7b2JqLnBkcH19YCA6ICcqJyB9YDtcblx0XHRpZiAoIG9iai5kcCApIHtcblx0XHRcdHJlICs9IGAoWywuXVswLTldezAsJHtvYmouZHB9fSk/YDtcblx0XHR9XG5cdFx0aWYgKCBvYmoudW5pdHMgKSB7XG5cdFx0XHRyZSArPSBgID8oJHtvYmoudW5pdHMuc3BsaXQoJ3wnKS5tYXAoIHUgPT4gdW5pdFJlZ0V4cCh1KSApLmpvaW4oJ3wnKX0pP2A7XG5cdFx0fVxuXHRcdG9iai5pbnB1dFJlZ2V4cCA9IHJlICsgJyQnO1xuXHR9XG5cdGRlbGV0ZSBvYmoucGRwO1xuXHRkZWxldGUgb2JqLmRwO1xuXHRkZWxldGUgb2JqLnVuaXRzO1xufVxuXG5leHBvcnQgY29uc3QgZHAybGFiRm5jSW5wdXRSZWdFeHAgPSAoIG9iaiwgb3B0cywgbmFtPScnICkgPT4ge1xuXHRsZXQgbFZGLCBsVDtcblx0aWYgKCAhb2JqICkge1xuXHRcdHJldHVyblxuXHR9XG5cblx0aWYgKCBvYmouZHAgJiYgIW9iai51bml0cyApIHtcblx0XHRsVkYgPSBzdHJUb051bTtcblx0XHRsVCA9ICdOdW1iZXInO1xuXHR9IGVsc2UgaWYgKCBvYmoucGRwICYmICFvYmoudW5pdHMgKSB7XG5cdFx0bFZGID0gc3RyVG9JbnQ7XG5cdFx0bFQgPSAnSW50ZWdlcic7XG5cdH0gZWxzZSB7XG5cdFx0bFZGID0gdiA9PiB2O1xuXHRcdGxUID0gJ1N0cmluZyc7XG5cdH1cblx0b3B0c1tgbGFiJHtuYW19VmFsRm5jYF0gPSBsVkY7XG5cdG9wdHNbYGxhYiR7bmFtfVR5cGVgXSA9IGxUO1xuXG5cdGRwMmlucHV0UmVnRXhwKG9iaik7XG59XG5cbi8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vXG5cbmV4cG9ydCBjb25zdCBzdHJUb0ludCA9IChzKSA9PiB7XG5cdGNvbnN0IG4gPSBwYXJzZUludChzKTtcblx0cmV0dXJuIE51bWJlci5pc05hTihuKSA/IDAgOiBuO1xufVxuXG5leHBvcnQgY29uc3Qgc3RyVG9OdW0gPSAocykgPT4ge1xuXHRzID0gcy5yZXBsYWNlKCAnLCcsICcuJyApO1xuXHRyZXR1cm4gcGFyc2VGbG9hdCggcyApO1xuXHQvLyBjb25zdCBuID0gcGFyc2VGbG9hdCggcyApO1xuXHQvLyByZXR1cm4gaXNOYU4obikgPyAwIDogbjtcbn1cblxuLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy9cblxuZXhwb3J0IGNsYXNzIFJlc29sdmFibGVQcm9taXNlIHtcblxuXHRjb25zdHJ1Y3RvcigpIHtcblx0XHR0aGlzLnByb20gPSBuZXcgUHJvbWlzZSggKHJlcyxyZWopID0+IHtcblx0XHRcdHRoaXMucmVzID0gcmVzO1xuXHRcdFx0dGhpcy5yZWogPSByZWo7XG5cdFx0fSk7XG5cdH1cblxuXHRyZXNvbHZlUHJvbWlzZSggcmVzICkge1xuXHRcdHRoaXMucmVzKCByZXMgKTtcblx0fVxuXG5cdHJlamVjdFByb21pc2UoIHJlaiApIHtcblx0XHR0aGlzLnJlaiggcmVqICk7XG5cdH1cblxuXHRnZXQgcHJvbWlzZSgpIHtcblx0XHRyZXR1cm4gdGhpcy5wcm9tO1xuXHR9XG59XG5cbi8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vL1xuXG5cbi8vIGdldCB0aGUgZm9sZGVyIG5hbWUgb2YgdGhlIEVQRlxuZXhwb3J0IGNvbnN0IGdldEVQRkZvbGRlck5hbWUgPSAoIGVtcHR5VmFsPScuJyApID0+IHtcblx0Y29uc3QgcmVnZXhwID0gd2luZG93LmxvY2F0aW9uLnBhdGhuYW1lLm1hdGNoKCAvXFwvKFteL10rKVxcL1teL10qJC8gKTtcblx0cmV0dXJuIHJlZ2V4cCA/IHJlZ2V4cFsxXSA6IGVtcHR5VmFsO1xufVxuXG4vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy9cblxuLy8gSTE4TiBzdXBwb3J0XG5cbmV4cG9ydCBmdW5jdGlvbiBnZXRJMThuRGVzY3IgKCBqc29uLCBuYW1lRm5jPWdldEVQRkZvbGRlck5hbWUgKSB7XG5cblx0Y29uc3QgbmFtZSA9IG5hbWVGbmMoJycpLnJlcGxhY2VBbGwoICcvJywgJ18nICk7XG5cblx0aWYgKCAhanNvbi5kYXRhU2V0dGluZ3MgfHwgIWpzb24uZGF0YVNldHRpbmdzLmkxOG5LZXlzQ3R4cyApIHtcblx0XHRyZXR1cm4gW107XG5cdH1cblxuXHRjb25zdCBpMThuRGF0YSA9IFtdO1xuXG5cdC8vIENvbGxlY3QgSW5mb1xuXHRPYmplY3QuZW50cmllcygganNvbi5kYXRhU2V0dGluZ3MuaTE4bktleXNDdHhzICkuZm9yRWFjaCggKFtrZXksIGN0eF0pID0+IHtcblxuXHRcdC8vIFBmYWQgaW4gSlNPTiBzdWNoZW5cblx0XHRjb25zdCBrZXlQYXJ0cyA9IGtleS5zcGxpdCggJy4nICk7XG5cdFx0bGV0IHZhbCA9IGpzb247XG5cdFx0d2hpbGUgKDEpIHtcblx0XHRcdGNvbnN0IGsgPSBrZXlQYXJ0cy5zaGlmdCgpO1xuXHRcdFx0aWYgKCAhKCBrIGluIHZhbCApICkge1xuXHRcdFx0XHQvLyBQRmFkIG5pY2h0IGdlZnVuZGVuXG5cdFx0XHRcdHZhbCA9IG51bGw7XG5cdFx0XHRcdGJyZWFrO1xuXHRcdFx0fVxuXHRcdFx0dmFsID0gdmFsWyBrIF07XG5cdFx0XHRpZiAoIGtleVBhcnRzLmxlbmd0aCA9PT0gMCApIHtcblx0XHRcdFx0Ly8gRWluemVsbmVyIFdlcnQgZ2VmdW5kZW5cblx0XHRcdFx0YnJlYWs7XG5cdFx0XHR9XG5cdFx0XHRpZiAoIHR5cGVvZiB2YWwgIT09ICdvYmplY3QnICkge1xuXHRcdFx0XHQvLyBQZmFkIGdlaHQgbmljaHQgd2VpdGVyXG5cdFx0XHRcdHZhbCA9IG51bGw7XG5cdFx0XHRcdGJyZWFrO1xuXHRcdFx0fVxuXHRcdFx0aWYgKCBBcnJheS5pc0FycmF5KHZhbCkgKSB7XG5cdFx0XHRcdGlmICgga2V5UGFydHMubGVuZ3RoPD0xICkge1xuXHRcdFx0XHRcdC8vIEFycmF5IGdlZnVuZGVuXG5cdFx0XHRcdFx0YnJlYWs7XG5cdFx0XHRcdH0gZWxzZSB7XG5cdFx0XHRcdFx0Ly8gYXJyYXkgbWl0dGVuZHJpbiwgRmVobGVyXG5cdFx0XHRcdFx0dmFsID0gbnVsbDtcblx0XHRcdFx0XHRicmVhaztcblx0XHRcdFx0fVxuXHRcdFx0fVxuXHRcdH1cblxuXHRcdGNvbnN0IGFkZCA9ICh0ZXh0LGN1cnJrZXkpID0+IHtcblx0XHRcdC8vIEVpbmVuIFdlcnQgYWRkZW4sIHdlbm4gd2lya2xpY2ggVGV4dFxuXHRcdFx0dGV4dCA9IHRleHQudHJpbSgpO1xuXHRcdFx0aWYgKCB0ZXh0ICYmICF0ZXh0Lm1hdGNoKCAvXlswLTksLiAlXSskLyApICl7XG5cdFx0XHRcdGNvbnN0IGRlc2NyID0gY3R4LnJlcGxhY2VBbGwoICcke30nLCBuYW1lICkudHJpbSgpO1xuXHRcdFx0XHRjb25zdCBlbnRyeSA9IHtcblx0XHRcdFx0XHRrZXk6IG5hbWUubGVuZ3RoPjAgPyBgJHtuYW1lfS4ke2N1cnJrZXl9YCA6IGN1cnJrZXksXG5cdFx0XHRcdFx0dGV4dCxcblx0XHRcdFx0XHRkZXNjcixcblx0XHRcdFx0fVxuXHRcdFx0XHRpMThuRGF0YS5wdXNoKCBlbnRyeSApO1xuXHRcdFx0fVxuXHRcdH1cblxuXHRcdGlmICggdmFsICE9PSBudWxsICkge1xuXHRcdFx0aWYgKCB0eXBlb2YgdmFsICE9PSAnb2JqZWN0JyApIHtcblx0XHRcdFx0Ly8gRWluemVsbmVuIFdlcnQgc2NocmVpYmVuXG5cdFx0XHRcdGFkZCggdmFsLCBrZXkgKTtcblx0XHRcdH0gZWxzZSB7XG5cdFx0XHRcdC8vIEFycmF5LVdlcnRlIHNjaHJlaWJlblxuXHRcdFx0XHRjb25zdCBrID0ga2V5UGFydHMucG9wKCk7XG5cdFx0XHRcdGNvbnN0IHN0YW1tS2V5ID0gayA/IGtleS5zdWJzdHJpbmcoIDAsIGtleS5sZW5ndGgtay5sZW5ndGgtMSApIDoga2V5O1xuXHRcdFx0XHR2YWwuZm9yRWFjaCggKHYsaSkgPT4ge1xuXHRcdFx0XHRcdGlmICggayApIHtcblx0XHRcdFx0XHRcdGlmICggayBpbiB2ICkge1xuXHRcdFx0XHRcdFx0XHRhZGQoIHZba10sIGAke3N0YW1tS2V5fS4ke2l9LiR7a31gICk7XG5cdFx0XHRcdFx0XHR9XG5cdFx0XHRcdFx0fSBlbHNlIHtcblx0XHRcdFx0XHRcdGFkZCggdiwgYCR7c3RhbW1LZXl9LiR7aX1gICk7XG5cdFx0XHRcdFx0fVxuXHRcdFx0XHR9KTtcblx0XHRcdH1cblx0XHR9XG5cdH0pXG4vLyBjb25zb2xlLmxvZyggXCI9PT09PT09PT09PT09PSBpMThuRGF0YVwiLCBpMThuRGF0YSApO1xuXG5cdHJldHVybiBpMThuRGF0YTtcbn1cblxuLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vXG5cbmV4cG9ydCBmdW5jdGlvbiBwYXRjaENmZ0kxOG4gKCBqc29uLCBpMThuLCBuYW1lRm5jPWdldEVQRkZvbGRlck5hbWUgKSB7XG5cblx0Y29uc3QgbmFtZSA9IG5hbWVGbmMoJycpLnJlcGxhY2VBbGwoICcvJywgJ18nICk7XG5cblx0aTE4bi5mb3JFYWNoKCAoeyBrZXksIHRleHQgfSkgPT4ge1xuXG5cdFx0Ly8gRVBGIE5hbWUgKyAnLicgbXVzcyBhbSBBbmZhbmcgd2VnbmVobWVuXG5cdFx0aWYgKCBuYW1lLmxlbmd0aD4wICkge1xuXHRcdFx0aWYgKCAha2V5LnN0YXJ0c1dpdGgoIG5hbWUgKyAnLicgKSApIHtcblx0XHRcdFx0cmV0dXJuO1xuXHRcdFx0fVxuXHRcdFx0a2V5ID0ga2V5LnN1YnN0cmluZyggbmFtZS5sZW5ndGgrMSApO1xuXHRcdH1cblx0XHRjb25zdCBrZXlQYXJ0cyA9IGtleS5zcGxpdCggJy4nICk7XG5cdFx0bGV0IHZhbCA9IGpzb247XG5cblx0XHR3aGlsZSAoMSkge1xuXHRcdFx0Y29uc3QgayA9IGtleVBhcnRzLnNoaWZ0KCk7XG5cdFx0XHRpZiAoICEoIGsgaW4gdmFsICkgKSB7XG5cdFx0XHRcdC8vIFBGYWQgbmljaHQgZ2VmdW5kZW5cblx0XHRcdFx0YnJlYWs7XG5cdFx0XHR9XG5cdFx0XHRpZiAoIGtleVBhcnRzLmxlbmd0aCA9PT0gMCApIHtcblx0XHRcdFx0Ly8gRWluemVsbmVyIFdlcnQgZ2VmdW5kZW5cblx0XHRcdFx0dmFsWyBrIF0gPSB0ZXh0O1xuXHRcdFx0XHRicmVhaztcblx0XHRcdH1cblx0XHRcdHZhbCA9IHZhbFsgayBdO1xuXHRcdH1cblx0fSlcbn1cbiIsImltcG9ydCB7IG9iamVjdF9lcXVhbHMgfSBmcm9tICcuL2NvbW1vbidcbmltcG9ydCB7IGZzbVNlbmQgfSBmcm9tICcuL2ZzbSdcblxuLy8gS29udmEgc2hvdWxkIGJlaSBpbXBvcnRlZCwgYnV0IGRvZW5zJ3Qgc2VlbSB0byBzdXBwb3J0IHRyZWUgc2hha2luZywgc28gbGVhdmUgaXQgb3V0XG4vLyBpbXBvcnQgS29udmEgZnJvbSAna29udmEvbGliL0NvcmUnXG5cbmV4cG9ydCBjbGFzcyBiYXNlSW5pdHMge1xuXG5cdGNvbnN0cnVjdG9yICggb3B0cyA9IHt9ICkge1xuXG5cdFx0Ly8gT3B0aW9ucyBhbmQgZGVmYXVsdHNcblx0XHRjb25zdCBkZWZhdWx0cyA9IHtcblx0XHRcdGNvbnRhaW5lcjogbnVsbCxcblx0XHRcdGFkZFNlbmRDaGFuZ2VTdGF0ZTogbnVsbCxcblx0XHR9XG5cdFx0T2JqZWN0LmFzc2lnbiggdGhpcywgZGVmYXVsdHMsIG9wdHMgKTtcblxuXHRcdC8vIGNyZWF0ZSBmc20gb2JqZWN0LCBpZiBub3QgcHJvdmlkZWRcblx0XHRpZiAoICF0aGlzLmZzbSApIHtcblx0XHRcdHRoaXMuZnNtID0gbmV3IGZzbVNlbmQoKTtcblx0XHRcdHRoaXMuZnNtLnN0YXJ0TGlzdGVuaW5nVG9WYXJEZWNsUmVxKCB0aGlzLmRlY2xhcmVWYXJpYWJsZXMuYmluZCh0aGlzKSApO1xuXHRcdH1cblxuXHRcdC8vIGluaXQgc3RhZ2UgJiBsYXllclxuXHRcdGlmICggb3B0cy5jb250YWluZXIgKSB7XG5cdFx0XHRpZiAoICF0aGlzLndpZHRoICkge1xuXHRcdFx0XHR0aGlzLndpZHRoID0gd2luZG93LmlubmVyV2lkdGg7XG5cdFx0XHR9XG5cdFx0XHRpZiAoICF0aGlzLmhlaWdodCApIHtcblx0XHRcdFx0dGhpcy5oZWlnaHQgPSB3aW5kb3cuaW5uZXJIZWlnaHQ7XG5cdFx0XHR9XG5cblx0XHRcdHRoaXMuc3RhZ2UgPSBuZXcgS29udmEuU3RhZ2Uoe1xuXHRcdFx0XHRjb250YWluZXI6IHRoaXMuY29udGFpbmVyLFxuXHRcdFx0XHR3aWR0aDogdGhpcy53aWR0aCxcblx0XHRcdFx0aGVpZ2h0OiB0aGlzLmhlaWdodCxcblx0XHRcdH0pO1xuXG5cblx0XHRcdGNvbnN0IHN0YWdlVk4gPSBcIkJXX0lCX0VYVFJFU19TVEFHRVNcIjtcblx0XHRcdGlmICggISggc3RhZ2VWTiBpbiB3aW5kb3cgKSApIHtcblx0XHRcdFx0d2luZG93W3N0YWdlVk5dID0gW107XG5cdFx0XHR9XG5cdFx0XHR3aW5kb3dbc3RhZ2VWTl0ucHVzaCggdGhpcy5zdGFnZSApO1xuXG5cblx0XHRcdC8vIHRoaXMubGF5ZXIgPSBuZXcgS29udmEuTGF5ZXIoKTtcblx0XHRcdC8vIHRoaXMuc3RhZ2UuYWRkKCB0aGlzLmxheWVyICk7XG5cdFx0fVxuXG5cdFx0Ly8gZGlzYWJsZSBtb3VzZSByaWdodCBjbGlja1xuXHRcdGRvY3VtZW50LmFkZEV2ZW50TGlzdGVuZXIoICdjb250ZXh0bWVudScsIChldikgPT4gZXYucHJldmVudERlZmF1bHQoKSApO1xuXG5cdFx0dGhpcy5GU01WYXJzU2VudCA9IHt9O1xuXHR9XG5cblx0Ly8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy9cblxuXHQvLyBtZXRob2Qgd3JhcHBlciBmb3IgcG9zdGluZyB0byBGU01cblxuXHRwb3N0TG9nICggZXZlbnQsIGRhdGE9e30gKSB7XG5cdFx0aWYgKCAhdGhpcy5zdGFnZSB8fCAhdGhpcy5zdGFnZS5pc0RlbW9BbmkgKSB7XG5cdFx0XHR0aGlzLmZzbS5wb3N0TG9nRXZlbnQoIE9iamVjdC5hc3NpZ24oIHt9LCBkYXRhLCB7IGV2ZW50OiBldmVudCB9ICkgKTtcblx0XHR9XG5cdH1cblxuXHRwb3N0VmFyaWFibGUgKCBuYW1lLCB2YWwgKSB7XG5cdFx0dGhpcy5GU01WYXJzU2VudFtuYW1lXSA9IHZhbDtcblx0XHR0aGlzLmZzbS5zZXRGU01WYXJpYWJsZSggbmFtZSwgdmFsICk7XG5cdH1cblxuXHR0cmlnZ2VySW5wdXRWYWxpZGF0aW9uRXZlbnQgKCkge1xuXHRcdGlmICggdGhpcy5mc20udHJpZ2dlckV2ZW50ICkge1xuLy8vLy8vLy8vLy8vLy8vLy8vLy9cblx0XHRcdGlmICggdGhpcy5kYXRhU2V0dGluZ3MgJiYgdGhpcy5kYXRhU2V0dGluZ3MudmFyaWFibGVQcmVmaXggKSB7XG5cdFx0XHRcdHRoaXMuZnNtLnRyaWdnZXJFdmVudCggJ2V2X0lucHV0VmFsaWRhdGlvbl8nICsgdGhpcy5kYXRhU2V0dGluZ3MudmFyaWFibGVQcmVmaXggKTtcblx0XHRcdH1cbi8vLy8vLy8vL1xuLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy9cbi8vLy8vLy8vLy9cblx0XHRcdHRoaXMuZnNtLnRyaWdnZXJFdmVudCggJ2V2X0lucHV0VmFsaWRhdGlvbl9FeHRSZXMnICk7XG5cdFx0fVxuXHR9XG5cblx0Ly8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy9cblxuXHQvLyBnZXQgc3RhdGUtdmFycyBvZiBvYmpcblx0Z2V0Q2hhbmdlU3RhdGUgKCBvYmogKSB7XG5cblx0XHQvLyBzdGF0dXNWYXJEZWYgZGVmaW5lZCBpbiBvYmo/XG5cdFx0aWYgKCBvYmouc3RhdHVzVmFyRGVmICkge1xuXG5cdFx0XHRyZXR1cm4gb2JqLnN0YXR1c1ZhckRlZi5jYWxsKG9iaik7XG5cblx0XHR9IGVsc2Uge1xuXG5cdFx0XHQvLyBjYWxsIGRlZmF1bHRDaGFuZ2VTdGF0ZSgpXG5cdFx0XHRyZXR1cm4gK29iai5nZXREZWZhdWx0Q2hhbmdlU3RhdGUoKTtcblxuXHRcdH1cblx0fVxuXG5cdHNlbmRDaGFuZ2VTdGF0ZSAoIG9iaiwgbmV3U3RhdGU9bnVsbCApIHtcblxuXHRcdC8vIERvbnQgc2VuZCBzdGF0ZXMgb3Igc2NvcmUgaW4gZGVtb0FuaVxuXHRcdGlmICggb2JqLnN0YWdlICYmIG9iai5zdGFnZS5pc0RlbW9BbmkgKSB7XG5cdFx0XHRyZXR1cm47XG5cdFx0fVxuXG5cdFx0Ly8gc3RhdGUgVmFyaWFibGUgKGNoYW5nZVN0YXRlKSBjaGFuZ2VkP1xuXHRcdGNvbnN0IGNoYW5nZVN0YXRlID0gKCBuZXdTdGF0ZT09PW51bGwgPyB0aGlzLmdldENoYW5nZVN0YXRlKG9iaikgOiBuZXdTdGF0ZSApO1xuXG5cdFx0Ly8gaXMgc3RhdGUgY2hhbmdlZD8gLT4gc2VuZCBtc2dzXG5cdFx0aWYgKCB0eXBlb2Ygb2JqLm9sZENoYW5nZVN0YXRlID09PSAndW5kZWZpbmVkJyB8fCAhb2JqZWN0X2VxdWFscyggY2hhbmdlU3RhdGUsIG9iai5vbGRDaGFuZ2VTdGF0ZSApICkge1xuXG5cdFx0XHRpZiAoIHR5cGVvZiBjaGFuZ2VTdGF0ZSA9PT0gJ29iamVjdCcgKSB7XG5cdFx0XHRcdC8vIGNoYW5nZVN0YXRlID0geyBGU01TdGF0ZVZhcjE6IHN0YXRlMSwgRlNNU3RhdGVWYXIyOiBzdGF0ZTIsIC4uLiB9XG5cdFx0XHRcdGZvciAoIGxldCBrIGluIGNoYW5nZVN0YXRlICkge1xuXHRcdFx0XHRcdGlmICggdHlwZW9mIG9iai5vbGRDaGFuZ2VTdGF0ZSAhPT0gJ29iamVjdCcgfHwgY2hhbmdlU3RhdGVba10gIT09IG9iai5vbGRDaGFuZ2VTdGF0ZVtrXSApIHtcblx0XHRcdFx0XHRcdHRoaXMucG9zdFZhcmlhYmxlKCBrLCBjaGFuZ2VTdGF0ZVtrXSApO1xuXHRcdFx0XHRcdH1cblx0XHRcdFx0fVxuXG5cdFx0XHR9IGVsc2UgaWYgKCBvYmouRlNNVmFyaWFibGVOYW1lICkge1xuXHRcdFx0XHQvLyBTaW1wbGUgMS12YWx1ZSBzdGF0ZVxuXHRcdFx0XHR0aGlzLnBvc3RWYXJpYWJsZSggYFZfU3RhdHVzXyR7b2JqLkZTTVZhcmlhYmxlTmFtZX1gLCArY2hhbmdlU3RhdGUgKTtcblx0XHRcdH1cblxuXHRcdFx0b2JqLm9sZENoYW5nZVN0YXRlID0gY2hhbmdlU3RhdGU7XG5cdFx0fVxuXG5cdFx0Ly8gc2NvcmUgY2hhbmdlZD9cblx0XHRpZiAoIG9iai5zY29yZURlZiApIHtcblxuXHRcdFx0Y29uc3Qgc2NvcmUgPSBvYmouc2NvcmVEZWYuY2FsbChvYmopO1xuXHRcdFx0dGhpcy5zY29yZU9iaiA9IG9iajtcblxuXHRcdFx0aWYgKCB0eXBlb2Ygb2JqLm9sZFNjb3JlID09PSAndW5kZWZpbmVkJyB8fCAhb2JqZWN0X2VxdWFscyggc2NvcmUsIG9iai5vbGRTY29yZSApICkge1xuXHRcdFx0XHRpZiAoIHR5cGVvZiBzY29yZSA9PT0gJ29iamVjdCcgKSB7XG5cdFx0XHRcdFx0Ly8gc2NvcmUgPSB7IEZTTVN0YXRlVmFyMTogc3RhdGUxLCBGU01TdGF0ZVZhcjI6IHN0YXRlMiwgLi4uIH1cblx0XHRcdFx0XHRmb3IgKCBsZXQgayBpbiBzY29yZSApIHtcblx0XHRcdFx0XHRcdGlmICggdHlwZW9mIG9iai5vbGRTY29yZSAhPT0gJ29iamVjdCcgfHwgc2NvcmVba10gIT09IG9iai5vbGRTY29yZVtrXSApIHtcblx0XHRcdFx0XHRcdFx0dGhpcy5wb3N0VmFyaWFibGUoIGssIHNjb3JlW2tdICk7XG5cdFx0XHRcdFx0XHR9XG5cdFx0XHRcdFx0fVxuXG5cdFx0XHRcdH0gZWxzZSBpZiAoIG9iai5GU01WYXJpYWJsZU5hbWUgfHwgb2JqLnNjb3JlVmFyaWFibGVOYW1lICkge1xuXHRcdFx0XHRcdC8vIFNpbXBsZSAxLXZhbHVlIHNjb3JlXG5cdFx0XHRcdFx0aWYgKCB0eXBlb2Ygc2NvcmUgIT09ICd1bmRlZmluZWQnICkge1xuXHRcdFx0XHRcdFx0dGhpcy5wb3N0VmFyaWFibGUoIG9iai5zY29yZVZhcmlhYmxlTmFtZSB8fCBgVl9TY29yZV8ke29iai5GU01WYXJpYWJsZU5hbWV9YCwgc2NvcmUgKTtcblx0XHRcdFx0XHR9XG5cdFx0XHRcdH1cblx0XHRcdH1cblxuXHRcdFx0b2JqLm9sZFNjb3JlID0gc2NvcmU7XG5cdFx0fVxuXG5cdFx0aWYgKCB0eXBlb2YgdGhpcy5hZGRTZW5kQ2hhbmdlU3RhdGUgPT09ICdmdW5jdGlvbicgKSB7XG5cdFx0XHQodGhpcy5hZGRTZW5kQ2hhbmdlU3RhdGUpKCk7XG5cdFx0fVxuXHR9XG5cblx0Ly8gc2VuZCBpbmZvcm1hdGlvbiBhYm91dCB2YXJpYWJsZXMgc2VudFxuXHRkZWNsYXJlVmFyaWFibGVzICgpIHtcblxuXHRcdGNvbnN0IHZhckRlZnMgPSBbXTtcblx0XHRjb25zdCB0eXBldHJhbnMgPSB7XG5cdFx0XHQnc3RyaW5nJzogJ1N0cmluZycsXG5cdFx0XHQnbnVtYmVyJzogJ0ludGVnZXInLFxuXHRcdFx0J2Jvb2xlYW4nOiAnQm9vbGVhbicsXG5cdFx0fVxuXG5cdFx0Zm9yICggY29uc3Qgdm5hbWUgaW4gdGhpcy5GU01WYXJzU2VudCApIHtcblxuXHRcdFx0Y29uc3QgdmFsID0gdGhpcy5GU01WYXJzU2VudFt2bmFtZV07XG5cdFx0XHRsZXQgdHlwZSA9ICcnO1xuXHRcdFx0aWYgKCB0aGlzLnNjb3JlT2JqICYmIHRoaXMuc2NvcmVPYmouc2NvcmVEZWZUeXBlICkge1xuXHRcdFx0XHR0eXBlID0gdGhpcy5zY29yZU9iai5zY29yZURlZlR5cGUuY2FsbCh0aGlzLnNjb3JlT2JqLCB2bmFtZSk7XG5cdFx0XHR9XG5cdFx0XHRpZiAoICF0eXBlICkge1xuXHRcdFx0XHR0eXBlID0gdmFsPT09bnVsbCA/ICdJbnRlZ2VyJyA6IHR5cGV0cmFuc1sgdHlwZW9mIHZhbCBdO1xuXHRcdFx0fVxuXG5cdFx0XHRjb25zdCB2ZGVmID0ge1xuXHRcdFx0XHRuYW1lOiB2bmFtZSxcblx0XHRcdFx0dHlwZSxcblx0XHRcdFx0ZGVmYXVsdFZhbHVlOiBOdW1iZXIuaXNOYU4odmFsKSB8fCB2YWw9PT1udWxsID8gMCA6ICggdmFsID09PSAnJyA/ICdFTVBUWScgOiB2YWwgKSxcblx0XHRcdFx0bmFtZWRWYWx1ZXM6IFtdLFxuXHRcdFx0fVxuXHRcdFx0dmFyRGVmcy5wdXNoKCB2ZGVmICk7XG5cdFx0fVxuXG5cdFx0cmV0dXJuIHZhckRlZnM7XG5cdH1cbn1cbiIsIlxyXG4vLyBpbXBvcnQgeyBpc0JldHdlZW4sIGRlbERlZmF1bHRzLCBtZXJnZURlZXAsIG9iamVjdF9lcXVhbHMsIGdldFhvZkV2ZW50LCBnZXRZb2ZFdmVudCwgZ2V0UG9zT2ZFdmVudCB9IGZyb20gJy4vY29tbW9uJ1xyXG5cclxuZXhwb3J0IGZ1bmN0aW9uIGlzQmV0d2VlbiAoIHYsIHcxLCB3MiApIHtcclxuXHRyZXR1cm4gdiA+PSBNYXRoLm1pbiggdzEsIHcyICkgJiYgdiA8PSBNYXRoLm1heCggdzEsIHcyICk7XHJcbn07XHJcblxyXG5cclxuZXhwb3J0IGZ1bmN0aW9uIGlzTnVtVW5pdCAoIHYsIG51bSwgdW5pdFJFLCB1bml0T3B0LCBvckVtcHR5ICkge1xyXG5cdGNvbnN0IG51bVJFID0gYDAqJHtudW19KD86WywuXTAqKT9gO1xyXG5cdGNvbnN0IHIgPSB1bml0T3B0ID8gYCR7bnVtUkV9KD86ICoke3VuaXRSRX0pP3woPzoke3VuaXRSRX0gKik/JHtudW1SRX1gIDogYCR7bnVtUkV9ICoke3VuaXRSRX18JHt1bml0UkV9ICoke251bVJFfWA7XHJcblx0Y29uc3QgcmUgPSBuZXcgUmVnRXhwKCBgXig/OiR7cn0pJHsgb3JFbXB0eSA/ICc/JyA6ICcnIH0kYCApO1xyXG5cdHJldHVybiB2LnRyaW0oKS5tYXRjaChyZSk7XHJcbn1cclxuXHJcblxyXG4vLyBEZWxldGVzIGRlbEtleXMgJiB1bmNoYW5nZWQgZGVmYXVsdHMgZnJvbSBvYmpcclxuLy8gb2JqZWN0IGRlZXAgY2xvbmUsIG9taXR0aW5nIHNvbWUgZGF0YSBkZWZpbmVkIGJ5IGRlZmF1bHRzIGFuZCBkZWxLZXlzXHJcbi8vIGFkb3B0ZWQgZnJvbSBodHRwczovL3N0YWNrb3ZlcmZsb3cuY29tL3F1ZXN0aW9ucy80NDU5OTI4L2hvdy10by1kZWVwLWNsb25lLWluLWphdmFzY3JpcHRcclxuZXhwb3J0IGZ1bmN0aW9uIGRlbERlZmF1bHRzICggb2JqID0ge30sIGRlZmF1bHRzID0ge30sIGRlbEtleXMgPSBbXSApIHtcclxuXHJcblx0Ly8gaWYgb2JqIGlzIGFycmF5IG9mIG9iamVjdHM6IGFwcGx5IGRlbERlZmF1bHRzIHRvIGV2ZXJ5IG1lbWJlciBvZiBhcnJheVxyXG5cdGlmICggQXJyYXkuaXNBcnJheShvYmopICkge1xyXG5cdFx0bGV0IGEgPSBbXTtcclxuXHRcdG9iai5mb3JFYWNoKCBlID0+IHtcclxuXHRcdFx0aWYgKCB0eXBlb2YgZT09PSdvYmplY3QnICkge1xyXG5cdFx0XHRcdGEucHVzaCggZGVsRGVmYXVsdHMoIGUsIGRlZmF1bHRzLCBkZWxLZXlzICkgKTtcclxuXHRcdFx0fSBlbHNlIHtcclxuXHRcdFx0XHRhLnB1c2goZSk7XHJcblx0XHRcdH1cclxuXHRcdH0pXHJcblx0XHRyZXR1cm4gYTtcclxuXHR9XHJcblxyXG5cdGlmICggIW9iaiApIHtcclxuXHRcdHJldHVybiBvYmo7XHJcblx0fVxyXG5cclxuXHRsZXQgdjtcclxuXHRsZXQgYk9iamVjdCA9IHt9O1xyXG5cdGZvciAoIGNvbnN0IGsgaW4gb2JqICkge1xyXG5cdFx0aWYgKCAhZGVsS2V5cy5pbmNsdWRlcyhrKSApIHtcclxuXHRcdFx0diA9IG9ialtrXTtcclxuXHRcdFx0aWYgKCAhZGVmYXVsdHMgfHwgZGVmYXVsdHNba10hPT12ICkge1xyXG5cdFx0XHRcdGJPYmplY3Rba10gPSAodHlwZW9mIHYgPT09IFwib2JqZWN0XCIpID8gZGVsRGVmYXVsdHMoIHYsIGRlZmF1bHRzID8gZGVmYXVsdHNba10gOiBbXSApIDogdjtcclxuXHRcdFx0fVxyXG5cdFx0fVxyXG5cdH1cclxuXHJcblx0cmV0dXJuIGJPYmplY3Q7XHJcbn1cclxuXHJcbi8qKlxyXG4gKiBGcm9tOiBodHRwczovL2dpc3QuZ2l0aHViLmNvbS9haHRjeC8wY2Q5NGU2MjY5MWY1MzkxNjBiMzJlY2RhMThhZjNkNlxyXG4gKiBQZXJmb3JtcyBhIGRlZXAgbWVyZ2Ugb2YgYHNvdXJjZWAgaW50byBgdGFyZ2V0YC5cclxuICogTXV0YXRlcyBgdGFyZ2V0YCBvbmx5IGJ1dCBub3QgaXRzIG9iamVjdHMgYW5kIGFycmF5cy5cclxuICpcclxuICogQGF1dGhvciBpbnNwaXJlZCBieSBbamhpbGRlbmJpZGRsZV0oaHR0cHM6Ly9zdGFja292ZXJmbG93LmNvbS9hLzQ4MjE4MjA5KS5cclxuICovXHJcbmV4cG9ydCBmdW5jdGlvbiBtZXJnZURlZXAgKHRhcmdldCwgc291cmNlKSB7XHJcblx0Y29uc3QgaXNPYmplY3QgPSAob2JqKSA9PiBvYmogJiYgdHlwZW9mIG9iaiA9PT0gJ29iamVjdCc7XHJcblxyXG5cdGlmICghaXNPYmplY3QodGFyZ2V0KSB8fCAhaXNPYmplY3Qoc291cmNlKSkge1xyXG5cdFx0cmV0dXJuIHNvdXJjZTtcclxuXHR9XHJcblxyXG5cdE9iamVjdC5rZXlzKHNvdXJjZSkuZm9yRWFjaChrZXkgPT4ge1xyXG5cdFx0Y29uc3QgdGFyZ2V0VmFsdWUgPSB0YXJnZXRba2V5XTtcclxuXHRcdGNvbnN0IHNvdXJjZVZhbHVlID0gc291cmNlW2tleV07XHJcblxyXG5cdFx0aWYgKCAvKkFycmF5LmlzQXJyYXkodGFyZ2V0VmFsdWUpICYmKi8gQXJyYXkuaXNBcnJheShzb3VyY2VWYWx1ZSkpIHtcclxuXHRcdFx0Ly8gTk8gQ09OQ0FURU5BVElPTiBPRiBBUlJBWVMhXHJcblx0XHRcdC8vIHRhcmdldFtrZXldID0gdGFyZ2V0VmFsdWUuY29uY2F0KHNvdXJjZVZhbHVlKTtcclxuXHRcdFx0dGFyZ2V0W2tleV0gPSBzb3VyY2VWYWx1ZTtcclxuXHRcdH0gZWxzZSBpZiAoaXNPYmplY3QodGFyZ2V0VmFsdWUpICYmIGlzT2JqZWN0KHNvdXJjZVZhbHVlKSkge1xyXG5cdFx0XHR0YXJnZXRba2V5XSA9IG1lcmdlRGVlcChPYmplY3QuYXNzaWduKHt9LCB0YXJnZXRWYWx1ZSksIHNvdXJjZVZhbHVlKTtcclxuXHRcdH0gZWxzZSB7XHJcblx0XHRcdHRhcmdldFtrZXldID0gc291cmNlVmFsdWU7XHJcblx0XHR9XHJcblx0fSk7XHJcblxyXG5cdHJldHVybiB0YXJnZXQ7XHJcbn1cclxuXHJcbi8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vXHJcblxyXG4vLyBhZG9wdGVkIGZyb20gaHR0cHM6Ly9zdGFja292ZXJmbG93LmNvbS9xdWVzdGlvbnMvMTA2ODgzNC9vYmplY3QtY29tcGFyaXNvbi1pbi1qYXZhc2NyaXB0XHJcbmV4cG9ydCBmdW5jdGlvbiBvYmplY3RfZXF1YWxzICggeCwgeSApIHtcclxuXHRpZiAoIHggPT09IHkgKSByZXR1cm4gdHJ1ZTtcclxuXHQvLyBpZiBib3RoIHggYW5kIHkgYXJlIG51bGwgb3IgdW5kZWZpbmVkIGFuZCBleGFjdGx5IHRoZSBzYW1lXHJcblxyXG5cdGlmICggISAoIHggaW5zdGFuY2VvZiBPYmplY3QgKSB8fCAhICggeSBpbnN0YW5jZW9mIE9iamVjdCApICkgcmV0dXJuIGZhbHNlO1xyXG5cdC8vIGlmIHRoZXkgYXJlIG5vdCBzdHJpY3RseSBlcXVhbCwgdGhleSBib3RoIG5lZWQgdG8gYmUgT2JqZWN0c1xyXG5cclxuXHRpZiAoIHguY29uc3RydWN0b3IgIT09IHkuY29uc3RydWN0b3IgKSByZXR1cm4gZmFsc2U7XHJcblx0Ly8gdGhleSBtdXN0IGhhdmUgdGhlIGV4YWN0IHNhbWUgcHJvdG90eXBlIGNoYWluLCB0aGUgY2xvc2VzdCB3ZSBjYW4gZG8gaXNcclxuXHQvLyB0ZXN0IHRoZXJlIGNvbnN0cnVjdG9yLlxyXG5cclxuXHQvLyBpZiBib3RoIGFyZSBhcnJheXM6IHVub3JkZXJlZCBjb21wYXJlIChjaGVjayBpZiBhbGwgZWxlbWVudHMgYXJlIGNvbnRhaW5lZClcclxuXHRpZiAoIEFycmF5LmlzQXJyYXkoeSkgJiYgQXJyYXkuaXNBcnJheSh4KSApIHtcclxuXHRcdGlmICggeC5sZW5ndGggIT0geS5sZW5ndGggKSByZXR1cm4gZmFsc2U7XHJcblx0XHRjb25zdCB5MiA9IEFycmF5LmZyb20oIHkgKTtcclxuXHRcdGlmICggIXguZXZlcnkoIHhlID0+XHJcblx0XHRcdHkyLnNvbWUoICggeWUsIGkgKSA9PiB7XHJcblx0XHRcdFx0aWYgKCBvYmplY3RfZXF1YWxzKCB4ZSwgeWUgKSApIHtcclxuXHRcdFx0XHRcdHkyLnNwbGljZSggaSwgMSApO1xyXG5cdFx0XHRcdFx0cmV0dXJuIHRydWU7XHJcblx0XHRcdFx0fVxyXG5cdFx0XHRcdHJldHVybiBmYWxzZTtcclxuXHRcdFx0fSlcclxuXHRcdCkpIHJldHVybiBmYWxzZTtcclxuXHRcdHJldHVybiB5Mi5sZW5ndGg9PT0wO1xyXG5cdH1cclxuXHJcblx0Zm9yICggdmFyIHAgaW4geCApIHtcclxuXHRcdGlmICggISB4Lmhhc093blByb3BlcnR5KCBwICkgKSBjb250aW51ZTtcclxuXHRcdFx0Ly8gb3RoZXIgcHJvcGVydGllcyB3ZXJlIHRlc3RlZCB1c2luZyB4LmNvbnN0cnVjdG9yID09PSB5LmNvbnN0cnVjdG9yXHJcblxyXG5cdFx0aWYgKCAhIHkuaGFzT3duUHJvcGVydHkoIHAgKSApIHJldHVybiBmYWxzZTtcclxuXHRcdFx0Ly8gYWxsb3dzIHRvIGNvbXBhcmUgeFsgcCBdIGFuZCB5WyBwIF0gd2hlbiBzZXQgdG8gdW5kZWZpbmVkXHJcblxyXG5cdFx0aWYgKCB4WyBwIF0gPT09IHlbIHAgXSApIGNvbnRpbnVlO1xyXG5cdFx0XHQvLyBpZiB0aGV5IGhhdmUgdGhlIHNhbWUgc3RyaWN0IHZhbHVlIG9yIGlkZW50aXR5IHRoZW4gdGhleSBhcmUgZXF1YWxcclxuXHJcblx0XHRpZiAoIHR5cGVvZiggeFsgcCBdICkgIT09IFwib2JqZWN0XCIgKSByZXR1cm4gZmFsc2U7XHJcblx0XHRcdC8vIE51bWJlcnMsIFN0cmluZ3MsIEZ1bmN0aW9ucywgQm9vbGVhbnMgbXVzdCBiZSBzdHJpY3RseSBlcXVhbFxyXG5cclxuXHRcdGlmICggISBvYmplY3RfZXF1YWxzKCB4WyBwIF0sICB5WyBwIF0gKSApIHJldHVybiBmYWxzZTtcclxuXHRcdFx0Ly8gT2JqZWN0cyBhbmQgQXJyYXlzIG11c3QgYmUgdGVzdGVkIHJlY3Vyc2l2ZWx5XHJcblx0fVxyXG5cclxuXHRmb3IgKCBwIGluIHkgKVxyXG5cdGlmICggeS5oYXNPd25Qcm9wZXJ0eSggcCApICYmICEgeC5oYXNPd25Qcm9wZXJ0eSggcCApIClcclxuXHRcdHJldHVybiBmYWxzZTtcclxuXHRcdC8vIGFsbG93cyB4WyBwIF0gdG8gYmUgc2V0IHRvIHVuZGVmaW5lZFxyXG5cclxuXHRyZXR1cm4gdHJ1ZTtcclxufVxyXG5cclxuLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy9cclxuXHJcbmV4cG9ydCBmdW5jdGlvbiBnZXRYb2ZFdmVudCAoIHN0YWdlLCBldmVudCApIHtcclxuXHRpZiAoIGV2ZW50ICkge1xyXG5cdFx0aWYgKCBldmVudC5zaW1YICkge1xyXG5cdFx0XHRyZXR1cm4gZXZlbnQuc2ltWDtcclxuXHRcdH1cclxuXHRcdC8vIGlmICggZXZlbnQuZXZ0ICYmIGV2ZW50LmV2dC5jbGllbnRYICkge1xyXG5cdFx0Ly8gXHRyZXR1cm4gZXZlbnQuZXZ0LmNsaWVudFg7XHJcblx0XHQvLyB9XHJcblx0fVxyXG5cdHJldHVybiBzdGFnZS5nZXRQb2ludGVyUG9zaXRpb24oKS54O1xyXG59XHJcblxyXG5cclxuZXhwb3J0IGZ1bmN0aW9uIGdldFlvZkV2ZW50ICggc3RhZ2UsIGV2ZW50ICkge1xyXG5cdGlmICggZXZlbnQgKSB7XHJcblx0XHRpZiAoIGV2ZW50LnNpbVkgKSB7XHJcblx0XHRcdHJldHVybiBldmVudC5zaW1ZO1xyXG5cdFx0fVxyXG5cdFx0Ly8gaWYgKCBldmVudC5ldnQgJiYgZXZlbnQuZXZ0LmNsaWVudFkgKSB7XHJcblx0XHQvLyBcdHJldHVybiBldmVudC5ldnQuY2xpZW50WTtcclxuXHRcdC8vIH1cclxuXHR9XHJcblx0cmV0dXJuIHN0YWdlLmdldFBvaW50ZXJQb3NpdGlvbigpLnk7XHJcbn1cclxuXHJcblxyXG5leHBvcnQgZnVuY3Rpb24gZ2V0UG9zT2ZFdmVudCAoIHN0YWdlLCBldiApIHtcclxuXHRyZXR1cm4ge1xyXG5cdFx0eDogZ2V0WG9mRXZlbnQoIHN0YWdlLCBldiApLFxyXG5cdFx0eTogZ2V0WW9mRXZlbnQoIHN0YWdlLCBldiApLFxyXG5cdH1cclxufVxyXG5cclxuXHJcbi8vIGlzIGluIERlbW9Bbmk6IGlnbm9yZSBuYXRpdmUgRXZlbnRzIChwcmV2ZW50IGUuZy4gc3RhZ2Uub24obW91c2VsZWF2ZSkpXHJcbmV4cG9ydCBmdW5jdGlvbiBpZ25vcmVFdmVudCAoIHN0YWdlLCBldiApIHtcclxuXHRyZXR1cm4gKCBzdGFnZSAmJiBzdGFnZS5pc0RlbW9BbmkgJiYgISggXCJzaW1YXCIgaW4gZXYgKSApO1xyXG59XHJcblxyXG5cclxuLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy9cclxuXHJcbmV4cG9ydCBjb25zdCBzZXRTdGF0ZVBvc3RQcm9jID0gZnVuY3Rpb24gKG9iaikge1xyXG5cclxuXHRpZiAoIG9iai5zdGFnZSAmJiBvYmouc3RhZ2UuaXNEZW1vQW5pICYmIG9iai5zdGFnZS5pc0RlbW9BbmkuZW5kQW5pICkge1xyXG5cdFx0b2JqLnN0YWdlLmlzRGVtb0FuaS5lbmRBbmkoIGZhbHNlICk7XHJcblx0fVxyXG5cclxuXHRpZiAoIG9iai5iYXNlICkge1xyXG5cdFx0b2JqLmJhc2Uuc2VuZENoYW5nZVN0YXRlKCBvYmogKTtcdC8vIGluaXQgJiBzZW5kIGNoYW5nZVN0YXRlICYgc2NvcmVcclxuXHR9XHJcblx0Ly8gb2JqLm9sZENoYW5nZVN0YXRlID0gb2JqLmJhc2UuZ2V0Q2hhbmdlU3RhdGUob2JqKTtcclxuXHQvLyBpZiAoIG9iai5zY29yZURlZiApIHtcclxuXHQvLyBcdG9iai5vbGRTY29yZSA9IG9iai5zY29yZURlZigpO1xyXG5cdC8vIH1cclxufVxyXG5cclxuLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy9cclxuXHJcbmV4cG9ydCBjb25zdCBnZXRBYnNQb3NpdGlvbiA9IGZ1bmN0aW9uIChlbGVtZW50KSB7XHJcblx0Y29uc3QgYm94ID0gZWxlbWVudC5nZXRCb3VuZGluZ0NsaWVudFJlY3QoKTtcclxuXHRjb25zdCBzY3JvbGxYID0gd2luZG93LnNjcm9sbFggfHwgd2luZG93LnBhZ2VYT2Zmc2V0O1xyXG5cdGNvbnN0IHNjcm9sbFkgPSB3aW5kb3cuc2Nyb2xsWSB8fCB3aW5kb3cucGFnZVlPZmZzZXQ7XHJcblx0cmV0dXJuIHtcclxuXHRcdGxlZnQ6IGJveC5sZWZ0ICsgc2Nyb2xsWCxcclxuXHRcdHRvcDogYm94LnRvcCArIHNjcm9sbFlcclxuXHR9XHJcbn1cclxuXHJcbi8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vXHJcblxyXG5leHBvcnQgZnVuY3Rpb24gcmVnZXhDYW5Mb29rQmVoaW5kKCkge1xyXG5cdGlmICggcmVnZXhDYW5Mb29rQmVoaW5kLnIgIT09IHVuZGVmaW5lZCApIHtcclxuXHRcdHJldHVybiByZWdleENhbkxvb2tCZWhpbmQucjtcclxuXHR9XHJcblx0dHJ5IHtcclxuXHRcdG5ldyBSZWdFeHAoICcoPzwhYSliJyApO1xyXG5cdFx0cmVnZXhDYW5Mb29rQmVoaW5kLnIgPSB0cnVlO1xyXG5cdFx0cmV0dXJuIHRydWU7XHJcblx0fSBjYXRjaCAoZSkge1xyXG5cdFx0cmVnZXhDYW5Mb29rQmVoaW5kLnIgPSBmYWxzZTtcclxuXHRcdHJldHVybiBmYWxzZTtcclxuXHR9XHJcbn1cclxuIiwiLy8gU2V0IEZTTSB2YXJpYWJsZVxyXG5cclxuZXhwb3J0IGNsYXNzIGZzbVNlbmQge1xyXG5cclxuXHRjb25zdHJ1Y3RvciAoKSB7XHJcblx0XHR0aGlzLmluZGV4UGF0aCA9IHRoaXMuZ2V0UXVlcnlWYXJpYWJsZSgnaW5kZXhQYXRoJyk7XHJcblx0XHR0aGlzLnVzZXJEZWZJZFBhdGggPSB0aGlzLmdldFF1ZXJ5VmFyaWFibGUoJ3VzZXJEZWZJZFBhdGgnKTtcclxuXHJcblx0XHQvLyBUcmFjZSBDb3VudGVyXHJcblx0XHR0aGlzLnRyYWNlQ291bnQgPSAwO1xyXG5cclxuXHRcdC8vIEluaXQgZG9uZSBwcm9taXNlXHJcblx0XHR0aGlzLnBySW5pdERvbmUgPSBuZXcgUHJvbWlzZSggKHJlc29sdmUpID0+IHtcclxuXHRcdFx0aWYgKCBwcm9jZXNzLmVudi5OT0RFX0VOViA9PT0gJ3Byb2R1Y3Rpb24nICkge1xyXG5cdFx0XHRcdHRoaXMucHJJbml0RG9uZVJlc29sdmUgPSByZXNvbHZlO1xyXG5cdFx0XHR9IGVsc2Uge1xyXG5cdFx0XHRcdHRoaXMucHJJbml0RG9uZVJlc29sdmUgPSAoKSA9PiB7XHJcblx0XHRcdFx0XHR0aGlzLmRlYnVnT3V0KCBcImZzbVNlbmQ6IEluaXQgZG9uZSBwcm9taXNlIHJlc29sdmVkXCIgKTtcclxuXHRcdFx0XHRcdHJlc29sdmUoKTtcclxuXHRcdFx0XHR9O1xyXG5cdFx0XHR9XHJcblx0XHR9KTtcclxuXHRcdHRoaXMuaW5pdERvbmVDbnQgPSAwO1xyXG5cclxuXHRcdGlmICggcHJvY2Vzcy5lbnYuTk9ERV9FTlYgIT09ICdwcm9kdWN0aW9uJyApIHtcclxuXHRcdFx0d2luZG93LmJ3X19kZWJ1Z091dCA9IHRoaXMuZGVidWdPdXQuYmluZCh0aGlzKTtcclxuXHRcdH1cclxuXHR9XHJcblxyXG5cdHNldEZTTVZhcmlhYmxlICggdmFyaWFibGVOYW1lLCBuZXdWYWx1ZSApIHtcclxuXHJcblx0XHRpZiAoIEFycmF5LmlzQXJyYXkobmV3VmFsdWUpICkge1xyXG5cdFx0XHRuZXdWYWx1ZSA9IG5ld1ZhbHVlLmpvaW4oJywnKTtcclxuXHRcdH1cclxuXHJcblx0XHRpZiAoIHByb2Nlc3MuZW52Lk5PREVfRU5WICE9PSAncHJvZHVjdGlvbicgKSB7XHJcblx0XHRcdHRoaXMuZGVidWdPdXQoIGBTZXQgRlNNIHZhcmlhYmxlOiAke3ZhcmlhYmxlTmFtZX0gdG8gdmFsdWUgPiR7bmV3VmFsdWV9PCAoJHt0eXBlb2YgbmV3VmFsdWV9KWAgKTtcclxuXHRcdH1cclxuXHJcblx0XHR0aGlzLnBvc3RNZXNzYWdlV2l0aFBhdGhzQW5kVHJhY2VDb3VudCh7XHJcblx0XHRcdHNldFZhcmlhYmxlOiB7XHJcblx0XHRcdFx0dmFyaWFibGVOYW1lLFxyXG5cdFx0XHRcdG5ld1ZhbHVlOiBOdW1iZXIuaXNOYU4obmV3VmFsdWUpID8gMCA6IG5ld1ZhbHVlLFxyXG5cdFx0XHR9LFxyXG5cdFx0fSlcclxuXHR9XHJcblxyXG5cdC8vIFNlbmQgYSB0cmFjZSBtZXNzYWdlXHJcblx0cG9zdExvZ0V2ZW50ICggdHJhY2VNZXNzYWdlICkge1xyXG5cclxuXHRcdGlmICggcHJvY2Vzcy5lbnYuTk9ERV9FTlYgIT09ICdwcm9kdWN0aW9uJyApIHtcclxuXHRcdFx0dGhpcy5kZWJ1Z091dCggYFBvc3RpbmcgZXZlbnQgJyR7dHJhY2VNZXNzYWdlLmV2ZW50fScsIG1lc3NhZ2UgJHtKU09OLnN0cmluZ2lmeSggdHJhY2VNZXNzYWdlLCAoayx2KSA9PiBrPT09J2V2ZW50JyA/IHVuZGVmaW5lZCA6IHYgKX1gICk7XHJcblx0XHR9XHJcblxyXG5cdFx0dGhpcy5wb3N0TWVzc2FnZVdpdGhQYXRoc0FuZFRyYWNlQ291bnQoe1xyXG5cdFx0XHR0cmFjZU1lc3NhZ2UsXHJcblx0XHR9KVxyXG5cclxuXHR9XHJcblxyXG5cdHRyaWdnZXJFdmVudCAoIGV2ZW50ICkge1xyXG5cclxuXHRcdGlmICggcHJvY2Vzcy5lbnYuTk9ERV9FTlYgIT09ICdwcm9kdWN0aW9uJyApIHtcclxuXHRcdFx0dGhpcy5kZWJ1Z091dChcInRyaWdnZXJFdmVudDogXCIgKyBldmVudCk7XHJcblx0XHR9XHJcblxyXG5cdFx0dGhpcy5wb3N0TWVzc2FnZVdpdGhQYXRoc0FuZFRyYWNlQ291bnQoe1xyXG5cdFx0XHRtaWNyb2ZpbkV2ZW50OiBldmVudCxcclxuXHRcdH0pXHJcblx0fVxyXG5cclxuXHRwb3N0TWVzc2FnZVdpdGhQYXRoc0FuZFRyYWNlQ291bnQoIHBheWxvYWQgKSB7XHJcblxyXG5cdFx0dHJ5XHJcblx0XHR7XHJcblx0XHRcdHBheWxvYWQuaW5kZXhQYXRoID0gdGhpcy5pbmRleFBhdGg7XHJcblx0XHRcdHBheWxvYWQudXNlckRlZklkUGF0aCA9IHRoaXMudXNlckRlZklkUGF0aDtcclxuXHRcdFx0cGF5bG9hZC50cmFjZUNvdW50ID0gdGhpcy50cmFjZUNvdW50Kys7XHJcblxyXG5cdFx0XHR0aGlzLnBvc3RNZXNzYWdlKCBKU09OLnN0cmluZ2lmeSggcGF5bG9hZCApICk7XHJcblxyXG5cdFx0fSBjYXRjaCAoZSkge1xyXG5cdFx0XHRjb25zb2xlLmVycm9yKGUpO1xyXG5cdFx0fVxyXG5cclxuXHR9XHJcblxyXG5cdHBvc3RNZXNzYWdlICggcGF5bG9hZCApIHtcclxuXHRcdGlmICggcHJvY2Vzcy5lbnYuTk9ERV9FTlYgIT09ICdwcm9kdWN0aW9uJyApIHtcclxuXHRcdFx0dGhpcy5kZWJ1Z091dCggYFBvc3RpbmcgbWVzc2FnZTogJHtwYXlsb2FkfWAgKTtcclxuXHRcdFx0aWYgKCB3aW5kb3cucGFyZW50ICE9PSB3aW5kb3cgKSB7XHJcblx0XHRcdFx0d2luZG93LnBhcmVudC5wb3N0TWVzc2FnZSggcGF5bG9hZCwgJyonICk7XHJcblx0XHRcdH1cclxuXHRcdFx0aWYgKCB3aW5kb3cuX19CV19fY2FsbGJhY2sgKSB7XHJcblx0XHRcdFx0d2luZG93Ll9fQldfX2NhbGxiYWNrKCBwYXlsb2FkICk7XHJcblx0XHRcdH1cclxuXHRcdH0gZWxzZSB7XHJcblx0XHRcdHdpbmRvdy5wYXJlbnQucG9zdE1lc3NhZ2UoIHBheWxvYWQsICcqJyApO1xyXG5cdFx0fVxyXG5cdH1cclxuXHJcblx0Ly8gSGVscGVyXHJcblx0Z2V0UXVlcnlWYXJpYWJsZSAodmFyaWFibGUpIHtcclxuXHRcdGNvbnN0IHBhcnNlZFVybCA9IG5ldyBVUkwoIHdpbmRvdy5sb2NhdGlvbi5ocmVmICk7XHJcblx0XHRyZXR1cm4gcGFyc2VkVXJsLnNlYXJjaFBhcmFtcy5nZXQodmFyaWFibGUpO1xyXG5cdH1cclxuXHJcblx0c3RhcnRMaXN0ZW5pbmdUb1ZhckRlY2xSZXEgKGRlY2xhcmVWYXJpYWJsZUNhbGxiYWNrKSB7XHJcblxyXG5cdFx0Y29uc3QgcHJJbml0RG9uZSA9IHRoaXMuZ2V0SW5pdERvbmVQcm9taXNlKCk7XHJcblxyXG5cdFx0dGhpcy5hbnN3ZXJWYXJEZWNsUmVxID0gZnVuY3Rpb24gKGNhbGxJZCkge1xyXG5cdFx0XHRwckluaXREb25lLnRoZW4oICgpID0+IHtcclxuXHRcdFx0XHRjb25zdCB2YXJpYWJsZXMgPSBkZWNsYXJlVmFyaWFibGVDYWxsYmFjaygpO1xyXG5cdFx0XHRcdGNvbnN0IHBhc3NfZGF0YSA9IHtcclxuXHRcdFx0XHRcdGluaXRpYWxWYXJpYWJsZXM6IHZhcmlhYmxlcyxcclxuXHRcdFx0XHRcdGNhbGxJZFxyXG5cdFx0XHRcdH1cclxuXHJcblx0XHRcdFx0dGhpcy5wb3N0TWVzc2FnZSggSlNPTi5zdHJpbmdpZnkoIHBhc3NfZGF0YSApICk7XHJcblx0XHRcdH0pO1xyXG5cdFx0fVxyXG5cclxuXHRcdC8vIGxpc3RlbmVyIGZvciBwcm92aWRpbmcgaW5pdGlhbCB2YXJpYWJsZSBkYXRhIHNpZ25hbC5cclxuXHRcdHdpbmRvdy5hZGRFdmVudExpc3RlbmVyKFxyXG5cdFx0XHRcIm1lc3NhZ2VcIixcclxuXHRcdFx0KGV2ZW50KSA9PiB7XHJcblxyXG5cdFx0XHRcdHRyeSB7XHJcblx0XHRcdFx0XHRjb25zdCB7IGNhbGxJZCB9ID0gSlNPTi5wYXJzZShldmVudC5kYXRhKTtcclxuXHRcdFx0XHRcdGlmICggY2FsbElkICE9PSB1bmRlZmluZWQgJiYgY2FsbElkLmluY2x1ZGVzKFwiaW1wb3J0VmFyaWFibGVzXCIpICkge1xyXG5cdFx0XHRcdFx0XHR0aGlzLmFuc3dlclZhckRlY2xSZXEoY2FsbElkKTtcclxuXHRcdFx0XHRcdH1cclxuXHRcdFx0XHR9IGNhdGNoIChlcnJvcikge1xyXG5cdFx0XHRcdFx0aWYgKCBwcm9jZXNzLmVudi5OT0RFX0VOViAhPT0gJ3Byb2R1Y3Rpb24nICkge1xyXG5cdFx0XHRcdFx0XHRjb25zb2xlLmxvZyhcImVycm9yIG9uIGV4dGVybmFsIGxpc3RlbmVyIC0gXCIsIGVycm9yKTtcclxuXHRcdFx0XHRcdH1cclxuXHRcdFx0XHR9XHJcblx0XHRcdH0sXHJcblx0XHRcdGZhbHNlICk7XHJcblx0IH1cclxuXHJcblx0IGRlYnVnT3V0IChzKSB7XHJcblx0XHRpZiAoIHByb2Nlc3MuZW52Lk5PREVfRU5WICE9PSAncHJvZHVjdGlvbicgKSB7XHJcblxyXG5cdFx0XHQvLyBpZiAoICF0aGlzLmRlYnVnT3V0cHV0ICkge1xyXG5cdFx0XHQvLyBcdGNvbnN0IGhlaWd0aD0yMDAsIHdpZHRoPTUwMDtcclxuXHRcdFx0Ly8gXHQvLyBkb2N1bWVudC5ib2R5LmlubmVySFRNTCArPSBgPGRpdiBpZD1cImJ3X0RlYnVnT3V0cHV0XCIgc3R5bGU9XCJ3aWR0aDoke3dpZHRofXB4O2hlaWdodDoke2hlaWd0aH1weDtwb3NpdGlvbjphYnNvbHV0ZTtib3R0b206MHB4O2xlZnQ6MHB4O3otaW5kZXg6MTAwMDAwO3doaXRlLXNwYWNlOnByZTtib3JkZXI6MXB4IHNvbGlkIGJsYWNrO2JhY2tncm91bmQ6bGlnaHR5ZWxsb3dcIj48L2Rpdj5gO1xyXG5cdFx0XHQvLyBcdGNvbnN0IGRpdiA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoXCJESVZcIik7XHJcblx0XHRcdC8vIFx0Y29uc3Qgc3QgPSB7XHJcblx0XHRcdC8vIFx0XHR3aWR0aDpgJHt3aWR0aH1weGAsXHJcblx0XHRcdC8vIFx0XHRoZWlnaHQ6YCR7aGVpZ3RofXB4YCxcclxuXHRcdFx0Ly8gXHRcdG92ZXJmbG93Olwic2Nyb2xsXCIsXHJcblx0XHRcdC8vIFx0XHRwb3NpdGlvbjpcImFic29sdXRlXCIsXHJcblx0XHRcdC8vIFx0XHRib3R0b206XCIwcHhcIixcclxuXHRcdFx0Ly8gXHRcdGxlZnQ6XCIwcHhcIixcclxuXHRcdFx0Ly8gXHRcdFwiei1pbmRleFwiOjEwMDAwMCxcclxuXHRcdFx0Ly8gXHRcdFwid2hpdGUtc3BhY2VcIjpcInByZVwiLFxyXG5cdFx0XHQvLyBcdFx0Ym9yZGVyOlwiMXB4IHNvbGlkIGJsYWNrXCIsXHJcblx0XHRcdC8vIFx0XHRiYWNrZ3JvdW5kOlwibGlnaHR5ZWxsb3dcIixcclxuXHRcdFx0Ly8gXHR9XHJcblx0XHRcdC8vIFx0T2JqZWN0LmFzc2lnbiggZGl2LnN0eWxlLCBzdCApO1xyXG5cdFx0XHQvLyBcdGRvY3VtZW50LmJvZHkuYXBwZW5kQ2hpbGQoZGl2KTtcclxuXHRcdFx0Ly8gXHR0aGlzLmRlYnVnT3V0cHV0ID0gZGl2O1xyXG5cdFx0XHQvLyB9XHJcblx0XHRcdC8vIHRoaXMuZGVidWdPdXRwdXQuaW5uZXJIVE1MICs9IFwiXFxuXCIrcztcclxuXHRcdFx0Ly8gdGhpcy5kZWJ1Z091dHB1dC5zY3JvbGxUb3AgPSB0aGlzLmRlYnVnT3V0cHV0LnNjcm9sbEhlaWdodDtcclxuXHJcblx0XHRcdGNvbnNvbGUubG9nKHMpO1xyXG5cdFx0XHQvLyBjb25zb2xlLnRyYWNlKCk7XHJcblxyXG5cdFx0fVxyXG5cdCB9XHJcblxyXG5cdC8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vXHJcblxyXG5cdGdldEluaXREb25lUHJvbWlzZSAoKSB7XHJcblx0XHRyZXR1cm4gdGhpcy5wckluaXREb25lO1xyXG5cdH1cclxuXHJcblx0aW5jSW5pdENudCAoKSB7XHJcblx0XHRyZXR1cm4gKyt0aGlzLmluaXREb25lQ250O1xyXG5cdH1cclxuXHJcblx0ZGVjSW5pdENudCAoKSB7XHJcblx0XHRpZiAoIHRoaXMuaW5pdERvbmVDbnQgPiAwICkge1xyXG5cdFx0XHR0aGlzLmluaXREb25lQ250LS07XHJcblx0XHRcdGlmICh0aGlzLmluaXREb25lQ250ID09PSAwKSB7XHJcblx0XHRcdFx0dGhpcy5wckluaXREb25lUmVzb2x2ZSgpO1xyXG5cdFx0XHR9XHJcblx0XHR9XHJcblx0XHRyZXR1cm4gdGhpcy5pbml0RG9uZUNudDtcclxuXHR9XHJcblxyXG59XHJcbiIsImltcG9ydCAnLi90ZXh0YXJlYUluc2VydHMuY3NzJ1xyXG5cclxuaW1wb3J0IHsgbWVyZ2VEZWVwLCBzZXRTdGF0ZVBvc3RQcm9jLCByZWdleENhbkxvb2tCZWhpbmQgfSBmcm9tICcuL2NvbW1vbidcclxuXHJcbmV4cG9ydCBjbGFzcyB0ZXh0YXJlYUNvbnRhaW5lciB7XHJcblxyXG5cdGNvbnN0cnVjdG9yICggZGl2U2VsZWN0b3IsIG9wdHMgPSB7fSwgYmFzZSA9IG51bGwgKSB7XHJcblxyXG5cdFx0aWYgKCBiYXNlLmZzbSAmJiBiYXNlLmZzbS5pbmNJbml0Q250ICkge1xyXG5cdFx0XHRiYXNlLmZzbS5pbmNJbml0Q250KCk7XHJcblx0XHR9XHJcblxyXG5cdFx0Y29uc3QgZGVmYXVsdHMgPSB7XHJcblx0XHRcdG91dGVyRGl2U3R5bGVzOiB7XHQvLyBzdHlsZXMgb2YgY3JlYXRlZCBvdXRlciBkaXYgKGNvbnRhaW5pbmcgdGV4dGFyZWEgYW5kIHRvb2xiYXIpXHJcblx0XHRcdH0sXHJcblx0XHRcdGRpdlN0eWxlczoge1x0Ly8gc3R5bGVzIG9mIFwidGV4dGFyZWFcIi1kaXZcclxuXHRcdFx0XHQvLyB3aWR0aDogJzMwMHB4JyxcclxuXHRcdFx0XHQvLyBoZWlnaHQ6ICcyMDBweCcsXHJcblx0XHRcdH0sXHJcblx0XHR9XHJcblx0XHRtZXJnZURlZXAoIE9iamVjdC5hc3NpZ24oIHRoaXMsIGRlZmF1bHRzICksIG9wdHMgKTtcclxuXHRcdC8vIGJhc2UgaXMgb25seSB1c2VkIGZvciBzZW5kQ2hhbmdlU3RhdGUoKSBhbmQgcG9zdExvZygpXHJcblx0XHR0aGlzLmJhc2UgPSBiYXNlO1xyXG5cclxuXHRcdC8vIG1vdmUgZGl2IGluIGEgZGl2LnRleHRhcmVhSW5zZXJ0cyAoLT50aGlzLm91dGVyRGl2KVxyXG5cdFx0dGhpcy5vdXRlckRpdiA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ0RJVicpO1xyXG5cdFx0dGhpcy5vdXRlckRpdi5jbGFzc0xpc3QuYWRkKCAndGV4dGFyZWFJbnNlcnRzJyApO1xyXG5cdFx0dGhpcy5zZXRTdHlsZXMoIHRoaXMub3V0ZXJEaXYsIHRoaXMub3V0ZXJEaXZTdHlsZXMgKTtcclxuXHJcblx0XHR0aGlzLmRpdiA9IHR5cGVvZiBkaXZTZWxlY3RvciA9PT0gJ3N0cmluZycgPyBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCBkaXZTZWxlY3RvciApIDogZGl2U2VsZWN0b3I7XHJcblx0XHR0aGlzLmRpdi5wYXJlbnROb2RlLnJlcGxhY2VDaGlsZCggdGhpcy5vdXRlckRpdiwgdGhpcy5kaXYgKTtcclxuXHRcdHRoaXMuc2V0U3R5bGVzKCB0aGlzLmRpdiwgdGhpcy5kaXZTdHlsZXMgKTtcclxuXHJcblx0XHR0aGlzLm91dGVyRGl2LmFwcGVuZENoaWxkKCB0aGlzLmRpdiApO1xyXG5cdFx0dGhpcy5pbml0RGF0YSA9IHRoaXMuZGl2LmlubmVySFRNTC50cmltKCk7XHJcblxyXG5cdFx0aWYgKCBiYXNlLmZzbSAmJiBiYXNlLmZzbS5kZWNJbml0Q250ICkge1xyXG5cdFx0XHRiYXNlLmZzbS5kZWNJbml0Q250KCk7XHJcblx0XHR9XHJcblx0fVxyXG5cclxuXHRldl9pbnB1dCAoKSB7XHJcblx0fVxyXG5cclxuXHRzZXRTdHlsZXMgKCBlbCwgc3R5bGVzICkge1xyXG5cdFx0Zm9yICggY29uc3Qgc3QgaW4gc3R5bGVzICkge1xyXG5cdFx0XHRlbC5zdHlsZVtzdF0gPSBzdHlsZXNbc3RdO1xyXG5cdFx0fVxyXG5cdH1cclxuXHJcblx0ZXh0cmFjdCAoKSB7XHJcblx0XHRyZXR1cm4gJyc7XHJcblx0fVxyXG5cclxuXHQvLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vL1xyXG5cclxuXHRnZXREZWZhdWx0Q2hhbmdlU3RhdGUgKCkge1xyXG5cdFx0cmV0dXJuIHRoaXMuZGl2LmlubmVySFRNTC50cmltKCkgIT09IHRoaXMuaW5pdERhdGE7XHJcblx0fVxyXG5cclxuXHRnZXRTdGF0ZSAoKSB7XHJcblx0XHRyZXR1cm4gJ3t9JztcclxuXHR9XHJcblxyXG5cdHNldFN0YXRlICgpIHtcclxuXHR9XHJcbn1cclxuXHJcbmV4cG9ydCBjbGFzcyB0ZXh0YXJlYUJhc2UgZXh0ZW5kcyB0ZXh0YXJlYUNvbnRhaW5lciB7XHJcblxyXG5cdGNvbnN0cnVjdG9yICggZGl2U2VsZWN0b3IsIG9wdHMgPSB7fSwgYmFzZSA9IG51bGwgKSB7XHJcblxyXG5cdFx0aWYgKCBiYXNlLmZzbSAmJiBiYXNlLmZzbS5pbmNJbml0Q250ICkge1xyXG5cdFx0XHRiYXNlLmZzbS5pbmNJbml0Q250KCk7XHJcblx0XHR9XHJcblxyXG5cdFx0Y29uc3QgZGVmYXVsdHMgPSB7XHJcblx0XHRcdG11bHRpTGluZTogdHJ1ZSxcclxuXHRcdFx0c3RyaXBUYWdzOiBmYWxzZSxcdC8vIHRydWU6IG9ubHkgYWxsb3cgdGV4dC1ub2RlLCBkZWxldGUgYWxsIEhUTUwtdGFncyAoZmlyZW9meCBpbnNlcnRzIDxicj4gc29tZXRpbWVzKVxyXG5cdFx0XHRpbnB1dFJlZ2V4cDogbnVsbCxcdC8vIHJlZ2V4cCBldmFsdWF0ZWQgYWdhaW5zdCBkaXYuaW5uZXJIVE1MXHJcblx0XHRcdG1heGxlbmd0aDogbnVsbCxcdC8vIG1heCBudW1iZXJzIGNoYXJhY3RlcnNcclxuXHJcblx0XHRcdC8vIFJlcGxhY2VzIGRvbmUgYnkgdGhpcy5leHRyYWN0KClcclxuXHRcdFx0Ly8gKGUuZy4gdG9vbGJhci5leHRyYWN0UmVwbGFjZSBhcmUgaW5zZXJ0ZWQgaGVyZSlcclxuXHRcdFx0ZXh0cmFjdFJlcGxhY2VzOiBbXHJcblx0XHRcdFx0Ly8geyBmcm9tOiAvcmVnZXhwLywgdG86IFwicmVwbGFjZVwiIH0sXHJcblxyXG5cdFx0XHRcdHJlZ2V4Q2FuTG9va0JlaGluZCgpID9cclxuXHRcdFx0XHRcdHsgZnJvbTogIC8oPzwhXFwqKVxcKig/IVxcKikvZyAsIHRvOiBcIlxcdTIyYzVcIiB9IDpcdC8vIHJlcGxhY2UgJyonIHRvIFxcdTIyYzVcclxuXHRcdFx0XHRcdC8vIElCIGludGVybmFsIGJyb3dzZXIgZG9lcyBub3Qgc3VwcG9ydCBuZWdhdGl2ZSBsb29rLWJlaGluZC8tZm9yd2FyZFxyXG5cdFx0XHRcdFx0Ly8gd29ya2Fyb3VuZDpcclxuXHRcdFx0XHRcdHsgZnJvbTogLyhefFteKl0pXFwqKFteKl18JCkvZywgdG86IFwiJDFcXHUyMmM1JDJcIiB9LFx0Ly8gcmVwbGFjZSAnKicgdG8gXFx1MjJjNVxyXG5cclxuXHRcdFx0XHR7IGZyb206IC9cXHUyMDIyfFxcdTI1Y2YvZywgdG86IFwiXFx1MjJjNVwiIH0sXHQvLyByZXBsYWNlIOKAoiBhbmQg4pePIHRvIFxcdTIyYzVcclxuXHRcdFx0XVxyXG5cdFx0fVxyXG5cdFx0bWVyZ2VEZWVwKCBkZWZhdWx0cywgb3B0cyApO1xyXG5cdFx0c3VwZXIoIGRpdlNlbGVjdG9yLCBkZWZhdWx0cywgYmFzZSApO1xyXG5cclxuXHRcdHRoaXMuZGl2LnNldEF0dHJpYnV0ZSggJ2NvbnRlbnRlZGl0YWJsZScsICd0cnVlJyApO1xyXG5cclxuXHRcdHRoaXMuZGl2LmFkZEV2ZW50TGlzdGVuZXIoICdrZXlkb3duJywgdGhpcy5ldl9rZXlkb3duLmJpbmQodGhpcykgKTtcclxuXHRcdHRoaXMuZGl2LmFkZEV2ZW50TGlzdGVuZXIoICdpbnB1dCcsIHRoaXMuZXZfaW5wdXQuYmluZCh0aGlzKSApO1xyXG5cdFx0Ly8gdGhpcy5kaXYuYWRkRXZlbnRMaXN0ZW5lciggJ3RvdWNoZW5kJywgdGhpcy5ldl90b3VjaGVuZC5iaW5kKHRoaXMpICk7XHJcblx0XHQvLyBbJ2NsaWNrJywndG91Y2hzdGFydCcsJ2NoYW5nZScsJ2lucHV0Jywna2V5cHJlc3MnLCdrZXl1cCddLmZvckVhY2goIGUgPT4ge1xyXG5cdFx0Ly9cdHRoaXMuZGl2LmFkZEV2ZW50TGlzdGVuZXIoIGUsIHRoaXMuY2hlY2tOb2Rlcy5iaW5kKHRoaXMpICk7XHJcblx0XHQvLyB9KVxyXG5cclxuXHRcdGlmICggIXRoaXMuZGl2LnRleHRDb250ZW50Lmxlbmd0aCAmJiB0aGlzLm11bHRpTGluZSApIHtcclxuXHRcdFx0dGhpcy5kaXYudGV4dENvbnRlbnQgPSBcIlxcblwiO1xyXG5cdFx0XHQvLyB0aGlzLmRpdi5hcHBlbmRDaGlsZCggZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnZGl2JykgKTtcclxuXHRcdH1cclxuXHJcblx0XHR0aGlzLmRpdi5hZGRFdmVudExpc3RlbmVyKCAncGFzdGUnLCAoZXYpID0+IGV2LnByZXZlbnREZWZhdWx0KCkgKTtcclxuXHJcblx0XHRpZiAoIHRoaXMuaW5wdXRSZWdleHAgKSB7XHJcblx0XHRcdHRoaXMuaW5wdXRSRSA9IG5ldyBSZWdFeHAoIHRoaXMuaW5wdXRSZWdleHAgKTtcclxuXHRcdFx0dGhpcy5zYXZlVmFsdWUoKTtcclxuXHRcdH1cclxuXHJcblx0XHR0aGlzLmRpdi5hZGRFdmVudExpc3RlbmVyKCAnZm9jdXMnLFxyXG5cdFx0XHRcdCgpID0+IHNldFRpbWVvdXQoICgpID0+IHRoaXMuYmFzZS5wb3N0TG9nKCAndGV4dGFyZWFGb2N1cycsIHRoaXMuZ2V0VGV4dFBvcygpICksIDAgKSApO1xyXG5cdFx0dGhpcy5kaXYuYWRkRXZlbnRMaXN0ZW5lciggJ2JsdXInLCAoKSA9PiB0aGlzLmJhc2UucG9zdExvZyggJ3RleHRhcmVhQmx1cicgKSApO1xyXG5cclxuXHJcblx0XHR0aGlzLm9sZFZhbHVlID0gXCJcIjtcclxuXHRcdHRoaXMub2xkRm9jdXNFbGVtSW5kZXggPSBudWxsO1xyXG5cclxuXHRcdC8vIFNhdmUgaW5pdERhdGEgJiBpbml0IFN0YXRlVmFyc1xyXG5cdFx0dGhpcy5pbml0RGF0YSA9IHRoaXMuZGl2LmlubmVySFRNTC50cmltKCk7XHJcblx0XHR0aGlzLmJhc2Uuc2VuZENoYW5nZVN0YXRlKCB0aGlzICk7XHQvLyBpbml0ICYgc2VuZCBjaGFuZ2VTdGF0ZSAmIHNjb3JlXHJcblxyXG5cdFx0aWYgKCBiYXNlLmZzbSAmJiBiYXNlLmZzbS5kZWNJbml0Q250ICkge1xyXG5cdFx0XHRiYXNlLmZzbS5kZWNJbml0Q250KCk7XHJcblx0XHR9XHJcblx0fVxyXG5cclxuXHQvLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vL1xyXG5cclxuXHRldl9rZXlkb3duIChldmVudCkge1xyXG4vLyBjb25zb2xlLmxvZyhldmVudCk7XHJcblxyXG5cdFx0bGV0IHJlc2NvcmUgPSAwO1xyXG5cclxuXHRcdC8vIGxvZz9cclxuXHRcdGlmICggdGhpcy5iYXNlICkge1xyXG5cdFx0XHRjb25zdCBkYXRhID0ge1xyXG5cdFx0XHRcdHdoaWNoOiBldmVudC53aGljaCB8fCBldmVudC5rZXlDb2RlLFxyXG5cdFx0XHRcdC8vIGV4dHJhY3Q6IHRoaXMuZXh0cmFjdCgpLFx0Ly8gb2xkLCB1bmNoYW5nZWQgdmFsdWVcclxuXHRcdFx0fTtcclxuXHRcdFx0WyAna2V5JywgJ2NvZGUnLCAnc2hpZnRLZXknLCAnYWx0S2V5JywgJ2N0cmxLZXknLCAnbWV0YUtleScsICdpc0NvbXBvc2luZycsICdyZXBlYXQnIF0uZm9yRWFjaCggayA9PiB7XHJcblx0XHRcdFx0aWYgKCBldmVudFtrXSApIHtcclxuXHRcdFx0XHRcdGRhdGFba10gPSBldmVudFtrXTtcclxuXHRcdFx0XHR9XHJcblx0XHRcdH0pXHJcblxyXG4vLyAhISEhISBET05UIExPRyBPTiBDSFJPTUUvQU5EUk9JRCAhISEhIVxyXG4vLyAhISEhISBET05UIExPRyBPTiBDSFJPTUUvQU5EUk9JRCAhISEhIVxyXG4vLyAhISEhISBET05UIExPRyBPTiBDSFJPTUUvQU5EUk9JRCAhISEhIVxyXG5cdFx0XHR0aGlzLmJhc2UucG9zdExvZyggJ2tleURvd24nLCBPYmplY3QuYXNzaWduKCBkYXRhLCB0aGlzLmdldFRleHRQb3MoKSApICk7XHJcblx0XHR9XHJcblxyXG5cdFx0Ly8gT24gRU5URVIgaW5zZXJ0IDxicj4sIHByZXZlbnQgaW5zZXJ0aW5nIDxkaXZzPlxyXG5cdFx0aWYgKCBldmVudC5rZXk9PT1cIkVudGVyXCIgfHwgZXZlbnQud2hpY2g9PTEzIHx8IGV2ZW50LmtleUNvZGU9PTEzICkge1xyXG5cdFx0XHRpZiAoICF0aGlzLnRhYlRvTmV4dElucHV0RmllbGQoZXZlbnQpICkge1xyXG5cdFx0XHQvLyBcdGlmICggIXRoaXMubXVsdGlMaW5lICkge1xyXG5cdFx0XHQvLyBcdFx0ZXZlbnQucHJldmVudERlZmF1bHQoKTtcclxuXHRcdFx0Ly8gXHRcdGV2ZW50LnN0b3BQcm9wYWdhdGlvbigpO1xyXG5cdFx0XHQvLyBcdH1cclxuXHRcdFx0Ly8gfVxyXG5cdFx0XHRcdGlmICggIXRoaXMubXVsdGlMaW5lIHx8IHRoaXMucGFzdGVIdG1sQXRDYXJldChcIlxcblwiKSApIHtcclxuXHJcblx0XHRcdFx0XHQvLyAvLyBDaHJvbWU6IElmIEVudGVyIHdhcyBoaXQgYmVoaW5kIGxhc3QgY2hhcmFjdGVyLFxyXG5cdFx0XHRcdFx0Ly8gLy8gYW4gPGRpdj48YnI+PGRpdj4gaXMgaW5zZXJ0ZWRcclxuXHRcdFx0XHRcdC8vIC8vIEhvdEZpeDogZGVsZXRlIGxhc3QgPGRpdj5cclxuXHRcdFx0XHRcdC8vIGNvbnN0IHNlbCA9IHdpbmRvdy5nZXRTZWxlY3Rpb24oKTtcclxuXHRcdFx0XHRcdC8vIGlmICggc2VsICYmIHNlbC5pc0NvbGxhcHNlZCAmJiBzZWwuZm9jdXNOb2RlICYmXHJcblx0XHRcdFx0XHQvLyBcdFx0c2VsLmZvY3VzTm9kZT09dGhpcy5kaXYgJiYgc2VsLmZvY3VzT2Zmc2V0PT10aGlzLmRpdi5jaGlsZE5vZGVzLmxlbmd0aCApIHtcclxuXHJcblx0XHRcdFx0XHQvLyBcdGxldCBsYXN0Tm9kZSA9IHRoaXMuZGl2LmNoaWxkTm9kZXNbIHRoaXMuZGl2LmNoaWxkTm9kZXMubGVuZ3RoLTEgXTtcclxuXHRcdFx0XHRcdC8vIFx0aWYgKCBsYXN0Tm9kZS50YWdOYW1lPT0nRElWJyAmJiAhbGFzdE5vZGUuY2xhc3NMaXN0LmNvbnRhaW5zKCdpbnNlcnRlZCcpICkge1xyXG5cdFx0XHRcdFx0Ly8gXHRcdGxhc3ROb2RlLnJlbW92ZSgpO1xyXG5cdFx0XHRcdFx0Ly8gXHR9XHJcblx0XHRcdFx0XHQvLyB9XHJcblxyXG5cdFx0XHRcdFx0ZXZlbnQucHJldmVudERlZmF1bHQoKTtcclxuXHRcdFx0XHRcdGV2ZW50LnN0b3BQcm9wYWdhdGlvbigpO1xyXG5cdFx0XHRcdH1cclxuXHRcdFx0fVxyXG5cdFx0XHRyZXNjb3JlID0gMTtcclxuXHJcblx0XHQvLyBPbiBUQUIgaW5zZXJ0IHRhYlxyXG5cdFx0fSBlbHNlIGlmICggZXZlbnQua2V5PT09XCJUYWJcIiB8fCBldmVudC53aGljaD09OSB8fCBldmVudC5rZXlDb2RlPT05ICkge1xyXG5cdFx0XHRpZiAoICF0aGlzLnRhYlRvTmV4dElucHV0RmllbGQoZXZlbnQpICkge1xyXG5cdFx0XHRcdGlmICggdGhpcy5wYXN0ZUh0bWxBdENhcmV0KCcmIzA5OycpICkge1xyXG5cdFx0XHRcdFx0ZXZlbnQucHJldmVudERlZmF1bHQoKTtcclxuXHRcdFx0XHRcdGV2ZW50LnN0b3BQcm9wYWdhdGlvbigpO1xyXG5cdFx0XHRcdH1cclxuXHRcdFx0fVxyXG5cdFx0XHRyZXNjb3JlID0gMTtcclxuXHJcblx0XHQvLyBCYWNrc3BhY2U6IERlbGV0ZSBkaXYgYmVmb3JlIGN1cnNvcj9cclxuXHRcdH0gZWxzZSBpZiAoIGV2ZW50LmtleT09PVwiQmFja3NwYWNlXCIgfHwgZXZlbnQud2hpY2g9PTggfHwgZXZlbnQua2V5Q29kZT09OCApIHtcclxuXHRcdFx0Ly8gc2hvdWxkIGRpdiBiZSBkZWxldGVkXHJcblx0XHRcdGlmICggIXRoaXMuZGVsSWZEaXYoIC0xLCBldmVudCApICkge1xyXG5cdFx0XHRcdC8vIC8vIElzIGN1cnNvciBpbi9hZnRlciBsYXN0IHRleHQgbm9kZSAnICcgKGRvbid0IGRlbGV0ZSwganVzdCByZXBvcyBjdXJzb3IpXHJcblx0XHRcdFx0Ly8gY29uc3Qgc2VsID0gd2luZG93LmdldFNlbGVjdGlvbigpO1xyXG5cdFx0XHRcdC8vIGlmICggc2VsICYmIHNlbC5pc0NvbGxhcHNlZCAmJiBzZWwuZm9jdXNOb2RlICkge1xyXG5cdFx0XHRcdC8vIFx0Y29uc3Qgbm9kZXMgPSB0aGlzLmRpdi5jaGlsZE5vZGVzO1xyXG5cdFx0XHRcdC8vIFx0aWYgKCBub2Rlc1tub2Rlcy5sZW5ndGgtMV0udGV4dENvbnRlbnQ9PScgJyAmJlxyXG5cdFx0XHRcdC8vIFx0XHRcdCggc2VsLmZvY3VzTm9kZT09dGhpcy5kaXYgJiYgc2VsLmZvY3VzT2Zmc2V0Pj10aGlzLmRpdi5jaGlsZE5vZGVzLmxlbmd0aCB8fFx0Ly8gQ3Vyc29yIGJlaGluZCBsYXN0IG5vZGVcclxuXHRcdFx0XHQvLyBcdFx0XHRzZWwuZm9jdXNOb2RlPT1ub2Rlc1tub2Rlcy5sZW5ndGgtMV0gJiYgc2VsLmZvY3VzT2Zmc2V0PT0xICkgKSB7XHQvLyBjdXJzb3IgYWZ0ZXIgc3BhY2UgaW4gbGFzdCB0ZXh0bm9kZVxyXG5cclxuXHRcdFx0XHQvLyBcdFx0Ly8gbW92ZSBjdXJzb3IgYmVmb3JlIHNwYWNlIGluIGxhc3QgdGV4dCBub2RlXHJcblx0XHRcdFx0Ly8gXHRcdGNvbnN0IHJhbmdlID0gc2VsLmdldFJhbmdlQXQoMCkuY2xvbmVSYW5nZSgpO1xyXG5cdFx0XHRcdC8vIFx0XHRyYW5nZS5zZXRTdGFydCggbm9kZXNbbm9kZXMubGVuZ3RoLTFdLCAwICk7XHJcblx0XHRcdFx0Ly8gXHRcdHJhbmdlLmNvbGxhcHNlKHRydWUpO1xyXG5cdFx0XHRcdC8vIFx0XHRzZWwucmVtb3ZlQWxsUmFuZ2VzKCk7XHJcblx0XHRcdFx0Ly8gXHRcdHNlbC5hZGRSYW5nZShyYW5nZSk7XHJcblxyXG5cdFx0XHRcdC8vIFx0XHRldmVudC5wcmV2ZW50RGVmYXVsdCgpO1xyXG5cdFx0XHRcdC8vIFx0XHRldmVudC5zdG9wUHJvcGFnYXRpb24oKTtcclxuXHRcdFx0XHQvLyBcdH1cclxuXHRcdFx0XHQvLyB9XHJcblx0XHRcdH1cclxuXHRcdFx0cmVzY29yZSA9IDE7XHJcblxyXG5cdFx0Ly8gRGVsZXRlOiBEZWxldGUgZGl2IGFmdGVyIGN1cnNvcj9cclxuXHRcdH0gZWxzZSBpZiAoIGV2ZW50LmtleT09PVwiRGVsZXRlXCIgfHwgKCBldmVudC53aGljaCB8fCBldmVudC5rZXlDb2RlICk9PTQ2ICkge1xyXG5cdFx0XHR0aGlzLmRlbElmRGl2KCAxLCBldmVudCApO1xyXG5cdFx0XHRyZXNjb3JlID0gMTtcclxuXHRcdH1cclxuXHJcblx0XHRpZiAoIHRoaXMuYmFzZSAmJiByZXNjb3JlPjAgKSB7XHJcblx0XHRcdHRoaXMuYmFzZS5zZW5kQ2hhbmdlU3RhdGUoIHRoaXMgKTtcclxuXHRcdH1cclxuXHR9XHJcblxyXG5cdC8vIGNocm9tZSBAIGFuZHJvaWQgZG9lcyBub3Qgc2VuZCBrZXlDb2RlcyBvbiBrZXlkb3duIGV2ZW50c1xyXG5cdC8vIHRoZXJlZm9yZSBpbnB1dCBldmVudCBtdXN0IGJlIGV2YWx1YXRlZCBmb3IgJ2RlbGV0ZUNvbnRlbnRCYWNrd2FyZCcgYmVoaW5kIGluc2VydGVkIGVsZW1lbnRzXHJcblx0ZXZfaW5wdXQgKGV2ZW50KSB7XHJcblxyXG5cdFx0bGV0IHNhdmVOZXdWYWx1ZSA9IGZhbHNlO1xyXG5cclxuLy8gY29uc29sZS5sb2coIHdpbmRvdy5nZXRTZWxlY3Rpb24oKSApO1xyXG5cdFx0Y29uc3Qgc2VsID0gd2luZG93LmdldFNlbGVjdGlvbigpO1xyXG5cclxuXHRcdC8vIHdhcyBcImluc2VydGVkXCIgbm9kZSBzYXZlZCBmb3IgZGVsZXRpb24gYW5kIHdhcyBiYWNrc3BhY2UgcHJvY2Vzc2VkP1xyXG5cdFx0aWYgKCBldmVudCAmJiBldmVudC5pbnB1dFR5cGU9PSdkZWxldGVDb250ZW50QmFja3dhcmQnICYmIHRoaXMuZGVsUG9zRWxlbWVudCApIHtcclxuXHJcbi8vIGNvbnNvbGUubG9nKHRoaXMuZGVsUG9zVGV4dCk7XHJcblx0XHRcdC8vIGlzIGN1cnNvciBJTiBpbnNlcnRlZCBlbGVtZW50P1xyXG5cdFx0XHRsZXQgaW5zZXJ0ZWQgPSBudWxsLCBzZWFyY2ggPSBzZWwuZm9jdXNOb2RlO1xyXG5cdFx0XHRpZiAoIHRoaXMuZGVsUG9zVGV4dCApIHtcclxuXHRcdFx0XHR3aGlsZSAoICFpbnNlcnRlZCAmJiBzZWFyY2ggJiYgKCAhc2VhcmNoLmNsYXNzTGlzdCB8fCAhc2VhcmNoLmNsYXNzTGlzdC5jb250YWlucygndGV4dGFyZWFJbnNlcnRzJykgKSApIHtcclxuLy8gY29uc29sZS5sb2coc2VhcmNoKTtcclxuXHRcdFx0XHRcdGlmICggc2VhcmNoLmNsYXNzTGlzdCAmJiBzZWFyY2guY2xhc3NMaXN0LmNvbnRhaW5zKCdpbnNlcnRlZCcpICkge1xyXG5cdFx0XHRcdFx0XHRpbnNlcnRlZCA9IHNlYXJjaDtcclxuXHRcdFx0XHRcdH1cclxuXHRcdFx0XHRcdHNlYXJjaCA9IHNlYXJjaC5wYXJlbnROb2RlO1xyXG5cdFx0XHRcdH1cclxuXHRcdFx0fVxyXG5cdFx0XHRpZiAoIGluc2VydGVkICkgIHtcclxuLy8gY29uc29sZS5sb2codGhpcy5kZWxQb3NUZXh0LHRoaXMuZGVsUG9zRWxlbWVudClcclxuXHRcdFx0XHQvLyBwb3MgY3Vyc29yXHJcblx0XHRcdFx0aWYgKCBzZWwuZ2V0UmFuZ2VBdCAmJiBzZWwucmFuZ2VDb3VudCApIHtcclxuXHRcdFx0XHRcdGNvbnN0IHJhbmdlID0gc2VsLmdldFJhbmdlQXQoMCkuY2xvbmVSYW5nZSgpO1xyXG5cdFx0XHRcdFx0cmFuZ2Uuc2V0U3RhcnRCZWZvcmUoaW5zZXJ0ZWQpO1xyXG5cdFx0XHRcdFx0cmFuZ2UuY29sbGFwc2UodHJ1ZSk7XHJcblx0XHRcdFx0XHRzZWwucmVtb3ZlQWxsUmFuZ2VzKCk7XHJcblx0XHRcdFx0XHRzZWwuYWRkUmFuZ2UocmFuZ2UpO1xyXG5cdFx0XHRcdH1cclxuXHRcdFx0XHQvLyByZXBsYWNlIGluc2VydGVkIHdpdGggdGV4dFxyXG5cdFx0XHRcdHRoaXMuZGl2LnJlcGxhY2VDaGlsZCggdGhpcy5kZWxQb3NUZXh0LCB0aGlzLmRlbFBvc0VsZW1lbnQgKTtcclxuXHRcdFx0XHR0aGlzLmRpdi5ub3JtYWxpemUoKTtcclxuXHRcdFx0fSBlbHNlIHtcclxuXHRcdFx0XHR0aGlzLmRlbFBvc0VsZW1lbnQucmVtb3ZlKCk7XHJcblx0XHRcdH1cclxuXHRcdFx0dGhpcy5kZWxQb3NFbGVtZW50ID0gbnVsbDtcclxuXHRcdFx0dGhpcy5kZWxQb3NUZXh0ID0gbnVsbDtcclxuXHJcblx0XHRcdHNhdmVOZXdWYWx1ZSA9ICggdGhpcy5pbnB1dFJFIHx8ICF0aGlzLm11bHRpTGluZSApO1xyXG5cclxuXHRcdH0gZWxzZSB7XHJcblxyXG5cdFx0XHQvLyBjdXJzb3IgYWZ0ZXIgZGVsZXRlYWJsZSwgaW5zZXJ0ZWQgZWxlbWVudD9cclxuXHRcdFx0Ly8gY29uc29sZS5sb2coc2VsLHNlbC5mb2N1c05vZGUsdGhpcy5kaXYpXHJcblx0XHRcdGlmICggc2VsICYmIHNlbC5pc0NvbGxhcHNlZCAmJiBzZWwuZm9jdXNOb2RlICYmXHJcblx0XHRcdFx0XHRzZWwuZm9jdXNOb2RlLnBhcmVudE5vZGU9PXRoaXMuZGl2ICYmIHNlbC5mb2N1c09mZnNldD09PTAgJiZcclxuXHRcdFx0XHRcdHNlbC5mb2N1c05vZGUucHJldmlvdXNTaWJsaW5nICYmIHNlbC5mb2N1c05vZGUucHJldmlvdXNTaWJsaW5nLmNsYXNzTGlzdCAmJlxyXG5cdFx0XHRcdFx0c2VsLmZvY3VzTm9kZS5wcmV2aW91c1NpYmxpbmcuY2xhc3NMaXN0LmNvbnRhaW5zKCdpbnNlcnRlZCcgKSApIHtcclxuXHRcdFx0XHR0aGlzLmRlbFBvc1RleHQgPSBzZWwuZm9jdXNOb2RlLmNsb25lTm9kZSh0cnVlKTtcclxuXHRcdFx0XHR0aGlzLmRlbFBvc0VsZW1lbnQgPSBzZWwuZm9jdXNOb2RlLnByZXZpb3VzU2libGluZztcclxuXHRcdFx0fSBlbHNlIHtcclxuXHRcdFx0XHR0aGlzLmRlbFBvc0VsZW1lbnQgPSBudWxsO1xyXG5cdFx0XHRcdHRoaXMuZGVsUG9zVGV4dCA9IG51bGw7XHJcblx0XHRcdH1cclxuXHRcdFx0Ly8gLy8gSWYgdGhlIGxhc3QgZWxlbWVudCBpcyBcImluc2VydGVkXCIgYW5kIHRoZXJlIGlzIG5vIHRleHQgYmVoaW5kIGl0LCB0aGUgZWxlbWVudCBpcyBub3QgZGVsZXRhYmxlXHJcblx0XHRcdC8vIC8vIGJlY2F1c2UgdGhlcmUgaXMgbm8gXCJpbnB1dFwiIGV2ZW50IG9uIGJhY2tzcGFjZVxyXG5cdFx0XHQvLyAvLyBwb3NzaWJsZSBmaXg6IGFsd2F5cyBoYXZlIGEgXCJzcGFjZVwiIGFzIGxhc3QgZWxlbWVudFxyXG5cdFx0XHQvLyBlbHNlIGlmICggc2VsLmZvY3VzTm9kZT09dGhpcy5kaXYgJiYgc2VsLmZvY3VzT2Zmc2V0PD10aGlzLmRpdi5jaGlsZE5vZGVzLmxlbmd0aCApIHtcclxuXHRcdFx0Ly8gXHR0aGlzLmRlbFBvc1RleHQgPSBudWxsO1xyXG5cdFx0XHQvLyBcdHRoaXMuZGVsUG9zRWxlbWVudCA9IHRoaXMuZGl2LmNoaWxkTm9kZXNbIHNlbC5mb2N1c09mZnNldC0xIF07XHJcblx0XHRcdC8vIH1cclxuXHJcblx0XHRcdC8vIGhhbmRsZSBtdWx0aUxpbmUgZS5nLiBpbiBhbmRyb2lkIChubyBrZXktZXZlbnRzLCBqdXN0IGlucHV0IGV2ZW50cyEpXHJcblx0XHRcdGlmICggIXRoaXMubXVsdGlMaW5lICkge1xyXG5cdFx0XHRcdGlmICggdGhpcy5kaXYudGV4dENvbnRlbnQubWF0Y2goIC9bXFxuXFxyXS8gKSApIHtcclxuLy8gY29uc29sZS5sb2codGhpcy5kaXYudGV4dENvbnRlbnQpXHJcbi8vIGNvbnNvbGUubG9nKHRoaXMuZGl2LnRleHRDb250ZW50Lm1hdGNoKCAvW1xcblxccl0vICkpXHJcblx0XHRcdFx0XHR0aGlzLnJlc3RvcmVWYWx1ZSgpO1xyXG5cdFx0XHRcdH0gZWxzZSB7XHJcblx0XHRcdFx0XHRzYXZlTmV3VmFsdWUgPSB0cnVlO1xyXG5cdFx0XHRcdH1cclxuXHRcdFx0fSBlbHNlIHtcclxuXHRcdFx0XHQvLyBIb3RGaXggZm9yIENocm9tZSAoRW50ZXIgYmVoaW5kIGxhc3QgY2hhcmFjdGVyIG5vdCBhbHdheXMgcHJvY2Vzc2VkKVxyXG5cdFx0XHRcdC8vIEFsd2F5cyBoYXZlIGEgJ1xcbicgYXMgbGFzdCBjaGFyYWN0ZXJcclxuXHRcdFx0XHRjb25zdCBsYXN0Tm9kZSA9IHRoaXMuZGl2LmNoaWxkTm9kZXMubGVuZ3RoPjAgPyB0aGlzLmRpdi5jaGlsZE5vZGVzWyB0aGlzLmRpdi5jaGlsZE5vZGVzLmxlbmd0aC0xIF0gOiBudWxsO1xyXG5cdFx0XHRcdGlmICggbGFzdE5vZGUgJiYgbGFzdE5vZGUubm9kZVR5cGU9PU5vZGUuVEVYVF9OT0RFICYmICFsYXN0Tm9kZS50ZXh0Q29udGVudC5lbmRzV2l0aChcIlxcblwiKSApIHtcclxuXHRcdFx0XHRcdGNvbnN0IHBvcyA9ICggc2VsICYmIHNlbC5mb2N1c05vZGU9PWxhc3ROb2RlID8gc2VsLmZvY3VzT2Zmc2V0IDogbnVsbCApO1xyXG5cdFx0XHRcdFx0bGFzdE5vZGUudGV4dENvbnRlbnQgPSBsYXN0Tm9kZS50ZXh0Q29udGVudCtcIlxcblwiO1xyXG5cdFx0XHRcdFx0aWYgKCBwb3MhPT1udWxsICkge1xyXG5cdFx0XHRcdFx0XHR0aGlzLnNldEN1clBvcyggbGFzdE5vZGUsIHBvcyApO1xyXG5cdFx0XHRcdFx0fVxyXG5cdFx0XHRcdH1cclxuXHRcdFx0fVxyXG5cclxuXHRcdFx0Ly8gaGFuZGVsIHN0cmlwVGFnc1xyXG5cdFx0XHRpZiAoIHRoaXMuc3RyaXBUYWdzICkge1xyXG5cdFx0XHRcdGlmICggdGhpcy5kaXYuaW5uZXJIVE1MLm1hdGNoKCAvPFtePl0qPi8gKSApIHtcclxuXHRcdFx0XHRcdHRoaXMuZGl2LmlubmVySFRNTCA9IHRoaXMuZGl2LmlubmVySFRNTC5yZXBsYWNlKCAvPFtePl0qPi9nLCAnJyApO1xyXG5cdFx0XHRcdH1cclxuXHRcdFx0fSBlbHNlIHtcclxuXHRcdFx0XHQvLyBkZWxldGUgYWxsIGRpdjpub3QoLmluc2VydGVkKVxyXG5cdFx0XHRcdC8vIFRISVMgU0hPVUxEIE5FVkVSIEhBUFBFTiwgYnV0IGl0IHNob3VsZCBiZSBjb3JyZWN0ZWRcclxuXHRcdFx0XHRsZXQgbm9kZSA9IHRoaXMuZGl2LmNoaWxkTm9kZXNbMF07XHJcblx0XHRcdFx0d2hpbGUgKCBub2RlICkge1xyXG5cdFx0XHRcdFx0Y29uc3QgZWwgPSBub2RlO1xyXG5cdFx0XHRcdFx0bm9kZSA9IG5vZGUubmV4dFNpYmxpbmc7XHJcblx0XHRcdFx0XHRpZiAoIGVsLnRhZ05hbWU9PSdESVYnICYmIGVsLmNsYXNzTGlzdCAmJiAhZWwuY2xhc3NMaXN0LmNvbnRhaW5zKCdpbnNlcnRlZCcpICkge1xyXG5cdFx0XHRcdFx0XHQvLyBjb252ZXJ0IHRleHRjb250ZW50IHRvIHRleHRub2RlXHJcblx0XHRcdFx0XHRcdGNvbnN0IHRleHQgPSBlbC50ZXh0Q29udGVudDtcclxuXHRcdFx0XHRcdFx0aWYgKCB0ZXh0Lmxlbmd0aCApIHtcclxuXHRcdFx0XHRcdFx0XHRjb25zdCB0bm9kZSA9IGRvY3VtZW50LmNyZWF0ZVRleHROb2RlKCcnKTtcclxuXHRcdFx0XHRcdFx0XHR0bm9kZS50ZXh0Q29udGVudCA9IHRleHQ7XHJcblx0XHRcdFx0XHRcdFx0dGhpcy5kaXYucmVwbGFjZUNoaWxkKCB0bm9kZSwgZWwgKTtcclxuXHRcdFx0XHRcdFx0XHR0aGlzLmRpdi5ub3JtYWxpemUoKTtcclxuXHRcdFx0XHRcdFx0fSBlbHNlIHtcclxuXHRcdFx0XHRcdFx0XHRlbC5yZW1vdmUoKTtcclxuXHRcdFx0XHRcdFx0fVxyXG5cdFx0XHRcdFx0fVxyXG5cdFx0XHRcdH1cclxuXHRcdFx0XHQvLyBkZWxldGUgc29sZWx5IDxicj5cclxuXHRcdFx0XHRpZiAoIHRoaXMuZGl2LmlubmVySFRNTC50cmltKCkgPT09ICc8YnI+JyApIHtcclxuXHRcdFx0XHRcdHRoaXMuZGl2LmlubmVySFRNTCA9ICcnO1xyXG5cdFx0XHRcdFx0dGhpcy5kaXYudGV4dENvbnRlbnQgPSBcIlxcblwiO1xyXG5cdFx0XHRcdH1cclxuXHRcdFx0fVxyXG5cclxuXHRcdFx0Ly8gaGFuZGxlIGlucHV0UmVnZXhwXHJcblx0XHRcdGlmICggdGhpcy5pbnB1dFJFIHx8IHRoaXMubWF4bGVuZ3RoICkge1xyXG4vLyBjb25zb2xlLmxvZyh0aGlzLmRpdi5pbm5lckhUTUwpO1xyXG4vLyBjb25zb2xlLmxvZyh0aGlzLmRpdi5pbm5lckhUTUwubWF0Y2goIHRoaXMuaW5wdXRSRSApKTtcclxuXHRcdFx0XHRpZiAoIFx0KCB0aGlzLmlucHV0UkUgJiYgIXRoaXMuZGl2LmlubmVySFRNTC5tYXRjaCggdGhpcy5pbnB1dFJFICkgKSB8fFxyXG5cdFx0XHRcdFx0XHQoIHRoaXMubWF4bGVuZ3RoICYmIHRoaXMuZGl2LmlubmVySFRNTC5sZW5ndGg+dGhpcy5tYXhsZW5ndGggKSApIHtcclxuXHRcdFx0XHRcdHRoaXMucmVzdG9yZVZhbHVlKCk7XHJcblx0XHRcdFx0XHRpZiAoIHRoaXMuYmFzZSApIHtcclxuXHRcdFx0XHRcdFx0dGhpcy5iYXNlLnBvc3RMb2coICdpbnB1dFJldmVydCcsIHtcclxuXHRcdFx0XHRcdFx0XHR0b1RleHQ6IHRoaXMuZGl2LmlubmVySFRNTCxcclxuXHRcdFx0XHRcdFx0XHRleHRyYWN0OiB0aGlzLmV4dHJhY3QoKSxcclxuXHRcdFx0XHRcdFx0fSApO1xyXG5cdFx0XHRcdFx0XHR0aGlzLmJhc2UudHJpZ2dlcklucHV0VmFsaWRhdGlvbkV2ZW50KCk7XHJcblx0XHRcdFx0XHR9XHJcblx0XHRcdFx0fSBlbHNlIHtcclxuXHRcdFx0XHRcdHNhdmVOZXdWYWx1ZSA9IHRydWU7XHJcblx0XHRcdFx0fVxyXG5cdFx0XHR9XHJcblx0XHR9XHJcblxyXG5cdFx0aWYgKCBzYXZlTmV3VmFsdWUgKSB7XHJcblx0XHRcdHRoaXMuc2F2ZVZhbHVlKCk7XHJcblx0XHR9XHJcblx0XHRpZiAoIHNhdmVOZXdWYWx1ZSB8fCAhdGhpcy5pbnB1dFJFIHx8IHRoaXMubXVsdGlMaW5lICkge1xyXG5cdFx0XHR0aGlzLmJhc2UucG9zdExvZyggJ25ld1ZhbHVlJywge1xyXG5cdFx0XHRcdGV4dHJhY3Q6IHRoaXMuZXh0cmFjdCgpLFxyXG5cdFx0XHR9KTtcclxuXHRcdH1cclxuXHRcdGlmICggdGhpcy5iYXNlICkge1xyXG5cdFx0XHR0aGlzLmJhc2Uuc2VuZENoYW5nZVN0YXRlKCB0aGlzICk7XHJcblx0XHR9XHJcblx0fVxyXG5cclxuXHQvLyAvLyBvbiB0b3VjaGFibGVzOiBsYXN0IGVsZW1lbnQgc2hvdWxkIG5vdCBiZSAnLmluc2VydGVkJyAoYXBwZW5kIHRleHRub2RlIHdpdGggJyAnKVxyXG5cdC8vIGV2X3RvdWNoZW5kICgpIHtcclxuXHJcblx0Ly8gXHRjb25zdCBzZWwgPSB3aW5kb3cuZ2V0U2VsZWN0aW9uKCk7XHJcblx0Ly8gXHQvLyBDdXJzb3IgYXQgXCJlbmRcIiBvZiB0ZXh0XHJcblx0Ly8gXHRpZiAoIHNlbCAmJiBzZWwuaXNDb2xsYXBzZWQgJiYgc2VsLmZvY3VzTm9kZT09dGhpcy5kaXYgKSB7XHJcblx0Ly8gXHRcdGNvbnN0IGNoaWxkbiA9IHRoaXMuZGl2LmNoaWxkTm9kZXM7XHJcblx0Ly8gXHRcdC8vIGFuZCBsYXN0IG5vZGUgPT0gJy5pbnNlcnRlZCdcclxuXHQvLyBcdFx0aWYgKCBzZWwuZm9jdXNPZmZzZXQ9PWNoaWxkbi5sZW5ndGggJiYgY2hpbGRuW2NoaWxkbi5sZW5ndGgtMV0uY2xhc3NMaXN0ICYmXHJcblx0Ly8gXHRcdFx0XHRjaGlsZG5bY2hpbGRuLmxlbmd0aC0xXS5jbGFzc0xpc3QuY29udGFpbnMoJ2luc2VydGVkJykgKSB7XHJcblxyXG5cdC8vIFx0XHRcdGNvbnN0IHRleHQgPSBkb2N1bWVudC5jcmVhdGVUZXh0Tm9kZSgnICcpXHJcblx0Ly8gXHRcdFx0dGhpcy5kaXYuYXBwZW5kQ2hpbGQoIHRleHQgKTtcclxuXHQvLyBcdFx0XHQvLyBzZXQgY3Vyc29yIHRvIHN0YXJ0IG9mIHRleHQgJyAnXHQhISEhISBUT0RPICEhISEhXHJcblx0Ly8gXHRcdFx0Ly8gaWYgKCBzZWwuZ2V0UmFuZ2VBdCAmJiBzZWwucmFuZ2VDb3VudCApIHtcclxuXHQvLyBcdFx0XHQvLyBcdGNvbnN0IHJhbmdlID0gc2VsLmdldFJhbmdlQXQoMCkuY2xvbmVSYW5nZSgpO1xyXG5cdC8vIFx0XHRcdC8vIGNvbnN0IHJhbmdlID0gZG9jdW1lbnQuY3JlYXRlUmFuZ2UoKTtcclxuXHQvLyBcdFx0XHQvLyByYW5nZS5zZXRTdGFydCggdGV4dCwgMCApO1xyXG5cdC8vIFx0XHRcdC8vIHJhbmdlLmNvbGxhcHNlKHRydWUpO1xyXG5cdC8vIFx0XHRcdC8vIHNlbC5yZW1vdmVBbGxSYW5nZXMoKTtcclxuXHQvLyBcdFx0XHQvLyBzZWwuYWRkUmFuZ2UocmFuZ2UpO1xyXG5cdC8vIFx0XHRcdC8vIH1cclxuXHQvLyBcdFx0fVxyXG5cdC8vIFx0fVxyXG5cdC8vIH1cclxuXHJcblx0Ly8gY2hlY2tOb2RlcyAoKSB7XHJcblxyXG5cdC8vIFx0dGhpcy5kaXYubm9ybWFsaXplKCk7XHJcblxyXG5cdC8vIFx0Ly8gZW5zdXJlIGxhc3QgZWxlbWVudCBpcyB0ZXh0bm9kZSAoaG90Zml4IGZvciBwb3NpdGlvbmluZyBjdXJzb3IgYWZ0ZXIgbGFzdCAuZnJhYylcclxuXHQvLyBcdC8vIGNvbnN0IG5vZGVzID0gdGhpcy5kaXYuY2hpbGROb2RlcztcclxuXHQvLyBcdC8vIGlmICggIW5vZGVzLmxlbmd0aCB8fCBub2Rlc1tub2Rlcy5sZW5ndGgtMV0ubm9kZVR5cGUhPU5vZGUuVEVYVF9OT0RFICkge1xyXG5cdC8vIFx0Ly8gXHR0aGlzLmRpdi5hcHBlbmRDaGlsZCggZG9jdW1lbnQuY3JlYXRlVGV4dE5vZGUoJyAnKSApO1xyXG5cdC8vIFx0Ly8gfVxyXG5cdC8vIH1cclxuXHJcblx0Ly8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy9cclxuXHJcblx0Ly8gaHR0cHM6Ly9zdGFja292ZXJmbG93LmNvbS9xdWVzdGlvbnMvNjY5MDc1Mi9pbnNlcnQtaHRtbC1hdC1jYXJldC1pbi1hLWNvbnRlbnRlZGl0YWJsZS1kaXZcclxuXHRwYXN0ZUh0bWxBdENhcmV0ICggaHRtbCwgaW5zZXJ0U3BhY2VzLCBsb2dOYW1lICkge1xyXG5cclxuXHRcdGNvbnN0IHNlbCA9IHdpbmRvdy5nZXRTZWxlY3Rpb24oKTtcclxuXHRcdC8vIG9ubHkgaW5zZXJ0IGlmIHNlbGVjdGlvbiBpcyB3aXRoaW4gdGhpcy5kaXZcclxuXHRcdGlmICggIXNlbCB8fCAhc2VsLmZvY3VzTm9kZSB8fCAhdGhpcy5kaXYuY29udGFpbnMoIHNlbC5mb2N1c05vZGUgKSApIHtcclxuXHRcdFx0cmV0dXJuIGZhbHNlO1xyXG5cdFx0fVxyXG5cclxuXHRcdGlmIChzZWwuZ2V0UmFuZ2VBdCAmJiBzZWwucmFuZ2VDb3VudCkge1xyXG5cdFx0XHRsZXQgcmFuZ2UgPSBzZWwuZ2V0UmFuZ2VBdCgwKTtcclxuXHRcdFx0cmFuZ2UuZGVsZXRlQ29udGVudHMoKTtcclxuXHJcblx0XHRcdC8vIFJhbmdlLmNyZWF0ZUNvbnRleHR1YWxGcmFnbWVudCgpIHdvdWxkIGJlIHVzZWZ1bCBoZXJlIGJ1dCBpc1xyXG5cdFx0XHQvLyBvbmx5IHJlbGF0aXZlbHkgcmVjZW50bHkgc3RhbmRhcmRpemVkIGFuZCBpcyBub3Qgc3VwcG9ydGVkIGluXHJcblx0XHRcdC8vIHNvbWUgYnJvd3NlcnMgKElFOSwgZm9yIG9uZSlcclxuXHRcdFx0bGV0IGlucztcclxuXHRcdFx0aWYgKCBpbnNlcnRTcGFjZXMgKSB7XHJcblx0XHRcdFx0Y29uc3QgcHJlU3BhY2UgPSAoICFzZWwuZm9jdXNPZmZzZXQgfHwgc2VsLmZvY3VzTm9kZS50ZXh0Q29udGVudFsgc2VsLmZvY3VzT2Zmc2V0LTEgXSE9JyAnICkgPyAnICcgOiAnJztcclxuXHRcdFx0XHRpbnMgPSBgJHtwcmVTcGFjZX0ke2h0bWx9IGA7XHJcblx0XHRcdH0gZWxzZSB7XHJcblx0XHRcdFx0aW5zID0gaHRtbDtcclxuXHRcdFx0fVxyXG5cdFx0XHRjb25zdCBlbCA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoXCJkaXZcIik7XHJcblx0XHRcdGVsLmlubmVySFRNTCA9IGlucztcclxuXHJcblx0XHRcdHZhciBmcmFnID0gZG9jdW1lbnQuY3JlYXRlRG9jdW1lbnRGcmFnbWVudCgpLCBub2RlLCBsYXN0Tm9kZTtcclxuXHRcdFx0d2hpbGUgKCAobm9kZSA9IGVsLmZpcnN0Q2hpbGQpICkge1xyXG5cdFx0XHRcdGlmICggbm9kZS5jbGFzc0xpc3QgKSB7XHJcblx0XHRcdFx0XHRub2RlLmNsYXNzTGlzdC5hZGQoJ2luc2VydGVkJyk7XHJcblx0XHRcdFx0fVxyXG5cdFx0XHRcdGxhc3ROb2RlID0gZnJhZy5hcHBlbmRDaGlsZChub2RlKTtcclxuXHRcdFx0fVxyXG5cdFx0XHRjb25zdCBzdGFydEN1clBvcyA9IGZyYWcucXVlcnlTZWxlY3RvcignLnN0YXJ0Q3Vyc29yUG9zJyk7XHJcblx0XHRcdHJhbmdlLmluc2VydE5vZGUoZnJhZyk7XHJcblxyXG5cdFx0XHQvLyBQcmVzZXJ2ZSB0aGUgc2VsZWN0aW9uXHJcblx0XHRcdGlmIChsYXN0Tm9kZSkge1xyXG5cdFx0XHRcdHJhbmdlID0gcmFuZ2UuY2xvbmVSYW5nZSgpO1xyXG5cdFx0XHRcdHN0YXJ0Q3VyUG9zID8gcmFuZ2Uuc2V0U3RhcnQoIHN0YXJ0Q3VyUG9zLCAwICkgOiByYW5nZS5zZXRTdGFydEFmdGVyKGxhc3ROb2RlKTtcclxuXHRcdFx0XHRyYW5nZS5jb2xsYXBzZSh0cnVlKTtcclxuXHRcdFx0XHRzZWwucmVtb3ZlQWxsUmFuZ2VzKCk7XHJcblx0XHRcdFx0c2VsLmFkZFJhbmdlKHJhbmdlKTtcclxuXHRcdFx0fVxyXG5cclxuXHRcdFx0dGhpcy5ub3JtYWxpemUoKTtcclxuXHJcblx0XHRcdC8vIGxvZyBidXR0b25cclxuXHRcdFx0aWYgKCBsb2dOYW1lICYmIHRoaXMuYmFzZSApIHtcclxuXHRcdFx0XHRjb25zdCBkYXRhID0ge1xyXG5cdFx0XHRcdFx0dGV4dDogaW5zLFxyXG5cdFx0XHRcdFx0bmFtZTogbG9nTmFtZSxcclxuXHRcdFx0XHRcdGV4dHJhY3Q6IHRoaXMuZXh0cmFjdCgpLFxyXG5cdFx0XHRcdH07XHJcblx0XHRcdFx0dGhpcy5iYXNlLnBvc3RMb2coICdpbnNlcnRCdXR0b25QcmVzc2VkJywgT2JqZWN0LmFzc2lnbiggZGF0YSwgdGhpcy5nZXRUZXh0UG9zKCkgKSApO1xyXG5cdFx0XHR9XHJcblx0XHR9XHJcblxyXG5cdFx0cmV0dXJuIHRydWU7XHJcblx0fVxyXG5cclxuXHRkZWxJZkRpdiAoIG9mZnMsIGV2ZW50ICkge1xyXG5cclxuXHRcdGNvbnN0IHNlbCA9IHdpbmRvdy5nZXRTZWxlY3Rpb24oKTtcclxuXHRcdGlmICggc2VsICYmIHNlbC5pc0NvbGxhcHNlZCApIHtcclxuXHRcdFx0Y29uc3QgZm9jdXMgPSBzZWwuZm9jdXNOb2RlO1xyXG4vLyBjb25zb2xlLmxvZyhzZWwsb2Zmcyxmb2N1cz09dGhpcy5kaXYsdGhpcy5kaXYuY2hpbGROb2Rlcy5sZW5ndGgsdGhpcy5kaXYuY2hpbGROb2Rlcyk7XHJcblx0XHRcdC8vIGRlbGV0ZSBwcmV2aW91cy9uZXh0IG5vZGU/XHJcblx0XHRcdGlmICggZm9jdXMgJiZcclxuXHRcdFx0XHRcdCggb2Zmcz4wICYmIHNlbC5mb2N1c09mZnNldD09Zm9jdXMudGV4dENvbnRlbnQubGVuZ3RoIHx8XHJcblx0XHRcdFx0XHRvZmZzPDAgJiYgKCAhc2VsLmZvY3VzT2Zmc2V0IHx8XHQvLyBCZWdpbm5pbmcgb2YgYSBUZXh0IG9yXHJcblx0XHRcdFx0XHRcdFx0XHRmb2N1cz09dGhpcy5kaXYgJiYgc2VsLmZvY3VzT2Zmc2V0PD10aGlzLmRpdi5jaGlsZE5vZGVzLmxlbmd0aCApICkgKSB7IC8vIG5vZGUtbGV2ZWwsIGZvY3VzT2Zmc2V0IGlzIG5vZGUtaW5kZXhcclxuXHJcblx0XHRcdFx0Y29uc3QgdG9EZWxldGUgPSAoIGZvY3VzPT10aGlzLmRpdiA/XHJcblx0XHRcdFx0XHRcdFx0XHRcdHRoaXMuZGl2LmNoaWxkTm9kZXNbIHNlbC5mb2N1c09mZnNldC0xIF0gOlxyXG5cdFx0XHRcdFx0XHRcdFx0XHQoIG9mZnM8MCA/IGZvY3VzLnByZXZpb3VzU2libGluZyA6IGZvY3VzLm5leHRTaWJsaW5nICkgKTtcclxuLy8gY29uc29sZS5sb2codG9EZWxldGUpXHJcblx0XHRcdFx0Ly8gY2hlY2sgaWYgbm9kZSBpcyBkaXYuaW5zZXJ0ZWRcclxuXHRcdFx0XHRpZiAoIHRvRGVsZXRlICYmIHRvRGVsZXRlLnRhZ05hbWU9PSdESVYnICYmIHRvRGVsZXRlLmNsYXNzTGlzdC5jb250YWlucygnaW5zZXJ0ZWQnKSApIHtcclxuXHRcdFx0XHRcdC8vIHNldCBjdXJzb3IgYmVmb3JlIGVsZW1lbnQgKGZpeCBmb3Igc2FmYXJpKVxyXG5cdFx0XHRcdFx0Y29uc3QgcmFuZ2UgPSBzZWwuZ2V0UmFuZ2VBdCgwKTtcclxuXHRcdFx0XHRcdGlmICggcmFuZ2UgKSB7XHJcblx0XHRcdFx0XHRcdGlmICggdG9EZWxldGUucHJldmlvdXNTaWJsaW5nICkge1xyXG5cdFx0XHRcdFx0XHRcdHJhbmdlLnNldFN0YXJ0QWZ0ZXIoIHRvRGVsZXRlLnByZXZpb3VzU2libGluZyApO1xyXG5cdFx0XHRcdFx0XHR9IGVsc2UgaWYgKCB0b0RlbGV0ZS5uZXh0U2libGluZyApIHtcclxuXHRcdFx0XHRcdFx0XHRyYW5nZS5zZXRTdGFydCggdG9EZWxldGUubmV4dFNpYmxpbmcsIDAgKTtcclxuXHRcdFx0XHRcdFx0fVxyXG5cdFx0XHRcdFx0XHRyYW5nZS5jb2xsYXBzZSh0cnVlKTtcclxuXHRcdFx0XHRcdFx0c2VsLnJlbW92ZUFsbFJhbmdlcygpO1xyXG5cdFx0XHRcdFx0XHRzZWwuYWRkUmFuZ2UocmFuZ2UpO1xyXG5cdFx0XHRcdFx0fVxyXG5cdFx0XHRcdFx0Ly8gZGVsZXRlIG5vZGVcclxuXHRcdFx0XHRcdHRvRGVsZXRlLnJlbW92ZSgpO1xyXG5cdFx0XHRcdFx0dGhpcy5kaXYubm9ybWFsaXplKCk7XHJcblxyXG5cdFx0XHRcdFx0ZXZlbnQucHJldmVudERlZmF1bHQoKTtcclxuXHRcdFx0XHRcdGV2ZW50LnN0b3BQcm9wYWdhdGlvbigpO1xyXG5cdFx0XHRcdFx0cmV0dXJuIHRydWU7XHJcblx0XHRcdFx0fVxyXG5cdFx0XHR9XHJcblx0XHR9XHJcblxyXG5cdFx0cmV0dXJuIGZhbHNlO1xyXG5cdH1cclxuXHJcblx0Ly8gaXMgY3Vyc29yIHdpdGhpbiAuaW5wdXRmaWVsZD8gdGFiIHRvIG5leHRTaWJsaW5nXHJcblx0dGFiVG9OZXh0SW5wdXRGaWVsZCAoZXZlbnQpIHtcclxuXHJcblx0XHRjb25zdCBzZWwgPSB3aW5kb3cuZ2V0U2VsZWN0aW9uKCk7XHJcblx0XHRpZiAoIHNlbCAmJiBzZWwuaXNDb2xsYXBzZWQgJiYgc2VsLmZvY3VzTm9kZSAmJiBzZWwuZ2V0UmFuZ2VBdCAmJiBzZWwucmFuZ2VDb3VudCApIHtcclxuXHJcblx0XHRcdC8vIGluIC5pbnB1dGZpZWxkP1xyXG5cdFx0XHRsZXQgbm9kZTtcclxuXHRcdFx0Zm9yICggbm9kZT1zZWwuZm9jdXNOb2RlOyBub2RlICYmICFub2RlLmNsYXNzTGlzdDsgKSB7XHJcblx0XHRcdFx0bm9kZSA9IG5vZGUucGFyZW50Tm9kZTtcclxuXHRcdFx0fVxyXG5cdFx0XHRpZiAoIG5vZGUgJiYgbm9kZS5jbGFzc0xpc3QuY29udGFpbnMoJ2lucHV0RmllbGQnKSApIHtcclxuXHJcblx0XHRcdFx0Ly8gc2VhcmNoIG5leHQgYXZhaWxhYmxlIHNpYmxpbmdcclxuXHRcdFx0XHR3aGlsZSAoIG5vZGUgJiYgIW5vZGUubmV4dFNpYmxpbmcgJiYgbm9kZSE9dGhpcy5kaXYgKSB7XHJcblx0XHRcdFx0XHRub2RlID0gbm9kZS5wYXJlbnROb2RlO1xyXG5cdFx0XHRcdH1cclxuXHRcdFx0XHRpZiAoIG5vZGUgJiYgbm9kZSE9dGhpcy5kaXYgKSB7XHJcblx0XHRcdFx0XHRub2RlID0gbm9kZS5uZXh0U2libGluZztcclxuXHJcblx0XHRcdFx0XHQvLyBzZXQgY3Vyc29yXHJcblx0XHRcdFx0XHR0aGlzLnNldEN1clBvcyggbm9kZSwgbm9kZS5ub2RlVHlwZT09Tm9kZS5URVhUX05PREUgJiYgbm9kZS50ZXh0Q29udGVudC5zdGFydHNXaXRoKCcgJykgPyAxIDogMCApO1xyXG5cclxuXHRcdFx0XHRcdGV2ZW50LnByZXZlbnREZWZhdWx0KCk7XHJcblx0XHRcdFx0XHRldmVudC5zdG9wUHJvcGFnYXRpb24oKTtcclxuXHRcdFx0XHRcdHJldHVybiB0cnVlO1xyXG5cdFx0XHRcdH1cclxuXHRcdFx0fVxyXG5cdFx0fVxyXG5cclxuXHRcdHJldHVybiBmYWxzZTtcclxuXHR9XHJcblxyXG5cdC8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vXHJcblxyXG5cdHNhdmVWYWx1ZSAoKSB7XHJcblx0XHR0aGlzLm9sZFZhbHVlID0gdGhpcy5kaXYuaW5uZXJIVE1MO1xyXG5cdFx0Ly8gc2F2ZSBjdXJzb3IgcG9zaXRpb25cclxuXHRcdGNvbnN0IHNlbCA9IHdpbmRvdy5nZXRTZWxlY3Rpb24oKTtcclxuXHRcdGlmICggc2VsICYmIHNlbC5mb2N1c05vZGUgKSB7XHJcblx0XHRcdGNvbnN0IG5vZGVzID0gQXJyYXkuZnJvbSggdGhpcy5kaXYuY2hpbGROb2RlcyApO1xyXG5cdFx0XHR0aGlzLm9sZEZvY3VzRWxlbUluZGV4ID0gbm9kZXMuZmluZEluZGV4KCBpID0+IGk9PT1zZWwuZm9jdXNOb2RlICk7XHJcblx0XHRcdHRoaXMub2xkRm9jdXNPZmZzZXQgPSBzZWwuZm9jdXNPZmZzZXQ7XHJcblx0XHR9IGVsc2Uge1xyXG5cdFx0XHR0aGlzLm9sZEZvY3VzRWxlbUluZGV4ID0gbnVsbDtcclxuXHRcdH1cclxuXHR9XHJcblxyXG5cdHJlc3RvcmVWYWx1ZSAoKSB7XHJcblx0XHRpZiAoIHRoaXMub2xkVmFsdWUhPT1udWxsICkge1xyXG5cdFx0XHR0aGlzLmRpdi5pbm5lckhUTUwgPSB0aGlzLm9sZFZhbHVlO1xyXG5cdFx0XHQvLyByZXN0b3JlIG9sZCBjdXJzb3IgcG9zaXRpb25cclxuXHRcdFx0Y29uc3Qgc2VsID0gd2luZG93LmdldFNlbGVjdGlvbigpO1xyXG5cdFx0XHRpZiAoIHNlbCApIHtcclxuXHRcdFx0XHRzZWwucmVtb3ZlQWxsUmFuZ2VzKCk7XHJcblx0XHRcdFx0aWYgKCB0aGlzLm9sZEZvY3VzRWxlbUluZGV4IT09bnVsbCAmJiB0aGlzLm9sZEZvY3VzRWxlbUluZGV4Pi0xICkge1xyXG5cdFx0XHRcdFx0dGhpcy5zZXRDdXJQb3MoIHRoaXMuZGl2LmNoaWxkTm9kZXNbIHRoaXMub2xkRm9jdXNFbGVtSW5kZXggXSwgdGhpcy5vbGRGb2N1c09mZnNldCApO1xyXG5cdFx0XHRcdH1cclxuXHRcdFx0fVxyXG5cdFx0fVxyXG5cdH1cclxuXHJcblx0c2V0Q3VyUG9zICggbm9kZSwgb2Zmc2V0ICkge1xyXG5cdFx0Y29uc3Qgc2VsID0gd2luZG93LmdldFNlbGVjdGlvbigpO1xyXG5cdFx0aWYgKCBzZWwgKSB7XHJcblx0XHRcdGNvbnN0IHJhbmdlID0gZG9jdW1lbnQuY3JlYXRlUmFuZ2UoKTtcclxuXHRcdFx0cmFuZ2Uuc2V0U3RhcnQoIG5vZGUsIG9mZnNldCApO1xyXG5cdFx0XHRyYW5nZS5jb2xsYXBzZSggdHJ1ZSApO1xyXG5cclxuXHRcdFx0c2VsLnJlbW92ZUFsbFJhbmdlcygpO1xyXG5cdFx0XHRzZWwuYWRkUmFuZ2UocmFuZ2UpO1xyXG5cdFx0fVxyXG5cdH1cclxuXHJcblx0Ly8gY2FsbCB0aGlzLmRpdi5ub3JtYWxpemUoKSBhbmQgdHJ5IHRvIHNhdmUvcmVzdG9yZSBjdXJzb3IgcG9zaXRpb25cclxuXHRub3JtYWxpemUgKCkge1xyXG5cclxuXHRcdC8vIHRyeSB0byBzYXZlIGN1cnNvciBwb3NpdGlvbiBpbiB0ZXh0bm9kZShzKVxyXG5cdFx0bGV0IGN1clBvcyA9IG51bGwsIHByZXZFbG1lbnQsIHBhcmVudEVsbWVudDtcclxuXHRcdGNvbnN0IHNlbCA9IHdpbmRvdy5nZXRTZWxlY3Rpb24oKTtcclxuXHRcdGlmICggc2VsICYmIHNlbC5yYW5nZUNvdW50PT0xICkge1xyXG5cdFx0XHRsZXQgZm9jdXMgPSBzZWwuZm9jdXNOb2RlO1xyXG5cdFx0XHRsZXQgZm9jdXNPZmZzZXQgPSBzZWwuZm9jdXNPZmZzZXQ7XHJcblx0XHRcdGlmICggZm9jdXMgKSB7XHJcblx0XHRcdFx0aWYgKCBmb2N1cy5ub2RlVHlwZT09Tm9kZS5FTEVNRU5UX05PREUgJiYgZm9jdXNPZmZzZXQ+MCApIHtcclxuXHRcdFx0XHRcdC8vIElmIGZvY3VzTm9kZSBpcyBhbiBlbGVtZW50LCBmb2N1c09mZnNldCBpcyB0aGUgbnVtYmVyIG9mIGNoaWxkIG5vZGVzIG9mIHRoZVxyXG5cdFx0XHRcdFx0Ly8gZm9jdXNOb2RlIHByZWNlZGluZyB0aGUgZm9jdXNcclxuXHRcdFx0XHRcdGZvY3VzID0gZm9jdXMuY2hpbGROb2Rlc1sgZm9jdXNPZmZzZXQgXTtcclxuXHRcdFx0XHRcdGZvY3VzT2Zmc2V0ID0gMDtcclxuXHRcdFx0XHR9XHJcblx0XHRcdFx0aWYgKCBmb2N1cy5ub2RlVHlwZT09Tm9kZS5URVhUX05PREUgJiZcclxuXHRcdFx0XHRcdFx0KCAoIGZvY3VzLnByZXZpb3VzU2libGluZyAmJiBmb2N1cy5wcmV2aW91c1NpYmxpbmcubm9kZVR5cGU9PU5vZGUuVEVYVF9OT0RFICkgfHxcclxuXHRcdFx0XHRcdFx0XHQoIGZvY3VzLm5leHRTaWJsaW5nICYmIGZvY3VzLm5leHRTaWJsaW5nLm5vZGVUeXBlPT1Ob2RlLlRFWFRfTk9ERSApICkgKSB7XHJcblx0XHRcdFx0XHQvLyBjdXJzb3IgaXMgcGFydCBvZiBzZXZlcmFsIGNvbnNlY3V0aXZlIHRleHQgZWxlbWVudHMgdGhhdCBhcmUgY29tYmluZWQgYnkgbm9tYWxpemUoKVxyXG5cdFx0XHRcdFx0Ly8gLT4gc2F2ZSBwb3NpdGlvbiBpbiB0ZXh0ICYgcHJldmlvdXNTaWJsaW5nL3BhcmVudEVsZW1lbnRcclxuXHJcblx0XHRcdFx0XHRjdXJQb3MgPSBmb2N1c09mZnNldDtcclxuXHRcdFx0XHRcdHBhcmVudEVsbWVudCA9IGZvY3VzLnBhcmVudEVsZW1lbnQ7XHJcblxyXG5cdFx0XHRcdFx0Ly8gQWRkIGxlbmd0aCBvZiBhbGwgcHJldmlvdXMgdGV4dCBlbGVtZW50cyB0byBwb3NpdGlvblxyXG5cdFx0XHRcdFx0d2hpbGUgKCBmb2N1cy5wcmV2aW91c1NpYmxpbmcgJiYgZm9jdXMucHJldmlvdXNTaWJsaW5nLm5vZGVUeXBlPT1Ob2RlLlRFWFRfTk9ERSApIHtcclxuXHRcdFx0XHRcdFx0Zm9jdXMgPSBmb2N1cy5wcmV2aW91c1NpYmxpbmc7XHJcblx0XHRcdFx0XHRcdGN1clBvcyArPSBmb2N1cy50ZXh0Q29udGVudC5sZW5ndGg7XHJcblx0XHRcdFx0XHR9XHJcblx0XHRcdFx0XHRwcmV2RWxtZW50ID0gZm9jdXMucHJldmlvdXNTaWJsaW5nO1xyXG5cdFx0XHRcdH1cclxuXHRcdFx0fVxyXG5cdFx0fVxyXG5cclxuXHRcdHRoaXMuZGl2Lm5vcm1hbGl6ZSgpO1xyXG5cclxuXHRcdC8vIHJlc3RvcmUgcG9zaXRpb24gaW4gKGNvbmNhdGVuYXRlZCkgdGV4dFxyXG5cdFx0aWYgKCBjdXJQb3MhPT1udWxsICkge1xyXG5cdFx0XHRjb25zdCBuZXdFbGVtID0gcHJldkVsbWVudCA/IHByZXZFbG1lbnQubmV4dFNpYmxpbmcgOiBwYXJlbnRFbG1lbnQuZmlyc3RDaGlsZDtcclxuXHRcdFx0Y29uc3QgbmV3UmFuZ2UgPSBkb2N1bWVudC5jcmVhdGVSYW5nZSgpO1xyXG5cdFx0XHRuZXdSYW5nZS5zZXRTdGFydCggbmV3RWxlbSwgY3VyUG9zICk7XHJcblx0XHRcdG5ld1JhbmdlLmNvbGxhcHNlKCB0cnVlICk7XHJcblx0XHRcdHNlbC5yZW1vdmVBbGxSYW5nZXMoKTtcclxuXHRcdFx0c2VsLmFkZFJhbmdlKG5ld1JhbmdlKTtcclxuXHRcdH1cclxuXHR9XHJcblxyXG5cdC8vIEdldCBQb3NpdGlvbiAoaW4gdGhpcy5kaXYudGV4dENvbnRlbnQpIGFuZCBzcGVjaWFsIGNsYXNzZXMgc2V0IGluIGZvY3Vzbm9kZVxyXG5cdGdldFRleHRQb3MgKHNlbD1udWxsKSB7XHJcblx0XHRpZiAoIHNlbD09PW51bGwgKSB7XHJcblx0XHRcdHNlbCA9IHdpbmRvdy5nZXRTZWxlY3Rpb24oKTtcclxuXHRcdH1cclxuXHRcdGlmICggc2VsICYmIHNlbC5mb2N1c05vZGUgKSB7XHJcblx0XHRcdGxldCBwb3MgPSBzZWwuZm9jdXNPZmZzZXQ7XHJcblx0XHRcdGxldCBub2RlID0gc2VsLmZvY3VzTm9kZTtcclxuXHRcdFx0Ly8gYWRkIGxlbmd0aHMgb2YgdGV4dENvbnRlbnRzIG9mIGFsbCBwZXZpb3VzIEVsZW1lbnRzXHJcblx0XHRcdHdoaWxlICggKCBub2RlID0gbm9kZS5wcmV2aW91c1NpYmxpbmcgfHwgbm9kZS5wYXJlbnROb2RlICkgJiYgbm9kZSAhPSB0aGlzLmRpdiAmJiBub2RlICkge1xyXG5cdFx0XHRcdGlmICggbm9kZS50ZXh0Q29udGVudCApIHtcclxuXHRcdFx0XHRcdHBvcyArPSBub2RlLnRleHRDb250ZW50Lmxlbmd0aDtcclxuXHRcdFx0XHR9XHJcblx0XHRcdH1cclxuXHRcdFx0Y29uc3QgZGF0YSA9IHsgdGV4dFBvczogcG9zLCB9O1xyXG5cdFx0XHQvLyBjaGVjayBmb3IgZnJhYyBjbGFzc2VzXHJcblx0XHRcdG5vZGUgPSBzZWwuZm9jdXNOb2RlO1xyXG5cdFx0XHR3aGlsZSAoIG5vZGUgJiYgbm9kZSAhPSB0aGlzLmRpdiAmJiAhbm9kZS5jbGFzc0xpc3QgKSB7XHJcblx0XHRcdFx0bm9kZSA9IG5vZGUucGFyZW50Tm9kZTtcclxuXHRcdFx0fVxyXG5cdFx0XHRpZiAoIG5vZGUuY2xhc3NMaXN0ICYmIG5vZGUuY2xhc3NMaXN0LmNvbnRhaW5zKCdmcmFjJykgKSB7XHJcblx0XHRcdFx0aWYgKCBub2RlLmNsYXNzTGlzdC5jb250YWlucygndG9wJykgKSBkYXRhLmNsYXNzPVwiZnJhYyB0b3BcIjtcclxuXHRcdFx0XHRpZiAoIG5vZGUuY2xhc3NMaXN0LmNvbnRhaW5zKCdib3R0b20nKSApIGRhdGEuY2xhc3M9XCJmcmFjIGJvdHRvbVwiO1xyXG5cdFx0XHR9O1xyXG5cdFx0XHRyZXR1cm4gZGF0YTtcclxuXHRcdH1cclxuXHJcblx0XHRyZXR1cm4ge307XHJcblx0fVxyXG5cclxuXHRleHRyYWN0ICgpIHtcclxuXHRcdGxldCBzID0gdGhpcy5kaXYuaW5uZXJIVE1MO1xyXG5cclxuXHRcdHRoaXMuZXh0cmFjdFJlcGxhY2VzLmZvckVhY2goIHIgPT4ge1xyXG5cdFx0XHRzID0gcy5yZXBsYWNlQWxsKCByLmZyb20sIHIudG8gKTtcclxuXHRcdH0pXHJcblxyXG5cdFx0cmV0dXJuIHMudHJpbSgpO1xyXG5cdH1cclxuXHJcblx0Ly8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy9cclxuXHJcblx0Z2V0U3RhdGUgKCkge1xyXG5cdFx0cmV0dXJuIEpTT04uc3RyaW5naWZ5KCB0aGlzLmRpdi5pbm5lckhUTUwgKTtcclxuXHR9XHJcblxyXG5cdHNldFN0YXRlIChzdGF0ZSkge1xyXG5cclxuXHRcdHRyeSB7XHJcblxyXG5cdFx0XHR0aGlzLmRpdi5pbm5lckhUTUwgPSBKU09OLnBhcnNlKCBzdGF0ZSApO1xyXG5cclxuXHRcdH0gY2F0Y2ggKGUpIHtcclxuXHRcdFx0Y29uc29sZS5lcnJvcihlKTtcclxuXHRcdH1cclxuXHJcblx0XHRzZXRTdGF0ZVBvc3RQcm9jKHRoaXMpO1xyXG5cdH1cclxuXHJcblx0c2NvcmVEZWYgKCkge1xyXG5cdFx0cmV0dXJuIHRoaXMuc2NvcmVWYXJpYWJsZU5hbWUgfHwgdGhpcy5GU01WYXJpYWJsZU5hbWUgP1xyXG5cdFx0XHR7XHJcblx0XHRcdFx0WyB0aGlzLnNjb3JlVmFyaWFibGVOYW1lIHx8IGBWX0lucHV0XyR7dGhpcy5GU01WYXJpYWJsZU5hbWV9YCBdOiB0aGlzLmV4dHJhY3QoKSxcclxuXHRcdFx0fSA6XHJcblx0XHRcdHt9O1xyXG5cdH1cclxufVxyXG5cclxuLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vXHJcblxyXG5leHBvcnQgY2xhc3MgdGV4dGFyZWFJbnNlcnRzIGV4dGVuZHMgdGV4dGFyZWFCYXNlIHtcclxuXHJcblx0Y29uc3RydWN0b3IgKCBkaXZTZWxlY3Rvciwgb3B0cyA9IHt9LCBiYXNlID0gbnVsbCApIHtcclxuXHJcblx0XHRpZiAoIGJhc2UuZnNtICYmIGJhc2UuZnNtLmluY0luaXRDbnQgKSB7XHJcblx0XHRcdGJhc2UuZnNtLmluY0luaXRDbnQoKTtcclxuXHRcdH1cclxuXHJcblx0XHRjb25zdCBpbnNlcnRzRGVmYXVsdHMgPSB7XHJcblxyXG5cdFx0XHQvLyB0b29sYmFyWCwgdG9vbGJhclkgICAvLyBwb3NpdGlvbiByZWxhdGl2ZSB0byBkaXYgKHRvcCxsZWZ0KVxyXG5cdFx0XHR0b29sYmFyOiBbXHJcblx0XHRcdFx0Ly8geyBkaXNwbGF5OiAoaHRtbCksIChpbnNlcnQ6IChodG1sKSwpXHJcblx0XHRcdFx0Ly8gXHRcdCh0b29sdGlwOiAnJywpICxcdC8vIHNob3dlZCB0b29sdGlwXHJcblx0XHRcdFx0Ly8gXHRcdChkb250SW5zZXJ0UmVjdXJzaXZlOiB0cnVlfGZhbHNlKSxcdC8vIGNhbiBlbGVtZW50IGJlIGluc2VydGVkIGluc2lkZSBvdGhlciBlbGVtZW50cz9cclxuXHRcdFx0XHQvL1x0XHQobm9FeHRyYVNwYWNlczogdHJ1ZXxmYWxzZSksXHQvLyBkb250IGluc2VydCBzcGFjZXMgYmVmb3JlIGFuZCBhZnRlciBlbGVtZW50XHJcblx0XHRcdFx0Ly9cdFx0KGV4dHJhY3RSZXBsYWNlOiB7IGZyb206IC9yZWdleHAvLCB0bzogXCJ0ZXh0XCIgfSApLFx0Ly8gUmVwbGFjZSBkb25lIGJ5IGV4dHJhY3QoKVxyXG5cdFx0XHRcdC8vIH1cclxuXHRcdFx0XSxcclxuXHRcdFx0dG9vbGJhckRpcmVjdGlvbjogJ2NvbHVtbicsXHJcblx0XHRcdC8vIHRvb2xiYXJIaWRlOiB0cnVlLFx0Ly8gdG9vbGJhciBoaWRkZW4gd2hlbiBubyBmb2N1c1xyXG5cclxuXHRcdFx0dG9vbGJhckNvbnRhaW5lclN0eWxlczoge1xyXG5cdFx0XHRcdC8vIGxlZnQ6ICczMDBweCcsIFx0Ly8gcG9zaXRpb24gcmVsYXRpdmUgdG8gb3V0ZXJEaXYsIGRlZmF1bHRzIHRvIHdpZHRoIG9mIGRpdlN0eWxlXHJcblx0XHRcdFx0Ly8gdG9wOiAnMjAwcHgnLFxyXG5cdFx0XHR9LFxyXG5cdFx0XHR0b29sYmFyQ2VsbFN0eWxlczoge1xyXG5cdFx0XHR9LFxyXG5cdFx0XHR0b29sYmFyQ2VsbFNwYW5TdHlsZXM6IHtcdC8vIHNwYW5zIHdpdGhpbiB0b29sYmFyLWNlbGxzIChmb3IgdmVydGljYWwgY2VudGVyaW5nKVxyXG5cdFx0XHR9LFxyXG5cclxuXHRcdH1cclxuXHRcdG1lcmdlRGVlcCggaW5zZXJ0c0RlZmF1bHRzLCBvcHRzICk7XHJcblx0XHRzdXBlciggZGl2U2VsZWN0b3IsIGluc2VydHNEZWZhdWx0cywgYmFzZSApO1xyXG5cclxuXHRcdC8vIGNyZWF0ZSB0b29sYmFyIGNvbnRhaW5lclxyXG5cdFx0dGhpcy50b29sYmFyQ29udGFpbmVyID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnRElWJyk7XHJcblx0XHR0aGlzLnRvb2xiYXJDb250YWluZXIuY2xhc3NMaXN0LmFkZCggJ3Rvb2xiYXInLCBgdGkke3RoaXMudG9vbGJhckRpcmVjdGlvbn1gLCAnZGlzYWJsZWQnICk7XHJcblx0XHRpZiAoICF0aGlzLnRvb2xiYXJDb250YWluZXJTdHlsZXMubGVmdCApIHtcclxuXHRcdFx0dGhpcy50b29sYmFyQ29udGFpbmVyU3R5bGVzLmxlZnQgPSB0aGlzLmRpdlN0eWxlcy53aWR0aFxyXG5cdFx0fVxyXG5cdFx0aWYgKCAhdGhpcy50b29sYmFyQ29udGFpbmVyU3R5bGVzLnRvcCApIHtcclxuXHRcdFx0dGhpcy50b29sYmFyQ29udGFpbmVyU3R5bGVzLnRvcCA9IFwiMHB4XCI7XHJcblx0XHR9XHJcblx0XHR0aGlzLnNldFN0eWxlcyggdGhpcy50b29sYmFyQ29udGFpbmVyLCB0aGlzLnRvb2xiYXJDb250YWluZXJTdHlsZXMgKTtcclxuXHRcdC8vIHRoaXMudG9vbGJhckNvbnRhaW5lci5zZXRBdHRyaWJ1dGUoICdjb250ZW50ZWRpdGFibGUnLCAnZmFsc2UnICk7XHJcblxyXG5cdFx0Ly8gY3JlYXRlIHRvb2xiYXJDZWxsc1xyXG5cdFx0dGhpcy50b29sYmFyLmZvckVhY2goICggdGIsIG5yICkgPT4ge1xyXG5cdFx0XHQvLyBGTE9XaW5nIGRpdlxyXG5cdFx0XHRjb25zdCB0b29sYmFyQ2VsbCA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ0RJVicpO1xyXG5cdFx0XHR0aGlzLnNldFN0eWxlcyggdG9vbGJhckNlbGwsIHRoaXMudG9vbGJhckNlbGxTdHlsZXMgKTtcclxuXHRcdFx0WyAnbW91c2Vkb3duJywgJ3RvdWNoc3RhcnQnIF0uZm9yRWFjaCggZXYgPT5cclxuXHRcdFx0XHR0b29sYmFyQ2VsbC5hZGRFdmVudExpc3RlbmVyKCBldiwgZnVuY3Rpb24gKGV2ZW50KSB7XHJcblx0XHRcdFx0XHRpZiAoIGRvY3VtZW50LmFjdGl2ZUVsZW1lbnQgJiYgIXRoaXMudG9vbGJhckNvbnRhaW5lci5jbGFzc0xpc3QuY29udGFpbnMoJ2Rpc2FibGVkJykgJiYgdGhpcy5kaXYuY29udGFpbnMoIGRvY3VtZW50LmFjdGl2ZUVsZW1lbnQgKSApIHtcclxuXHRcdFx0XHRcdFx0dGhpcy5pbnNlcnQoIG5yLCBldmVudCApO1xyXG5cdFx0XHRcdFx0fVxyXG5cdFx0XHRcdH0uYmluZCh0aGlzKSApICk7XHJcblx0XHRcdC8vICB0b29sYmFyQ2VsbC5zZXRBdHRyaWJ1dGUoICdjb250ZW50ZWRpdGFibGUnLCAnZmFsc2UnICk7XHJcblxyXG5cdFx0XHQvLyBzcGFuIGluIGRpdiBmb3IgdmVydGljYWwgYWxpZ25pbmdcclxuXHRcdFx0Y29uc3QgaW5uZXJTcGFuID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnU1BBTicpO1xyXG5cdFx0XHR0aGlzLnNldFN0eWxlcyggaW5uZXJTcGFuLCB0aGlzLnRvb2xiYXJDZWxsU3BhblN0eWxlcyApO1xyXG5cdFx0XHR0b29sYmFyQ2VsbC5hcHBlbmRDaGlsZCggaW5uZXJTcGFuICk7XHJcblxyXG5cdFx0XHRpbm5lclNwYW4uaW5uZXJIVE1MID0gdGIuZGlzcGxheTtcclxuXHRcdFx0dGhpcy50b29sYmFyQ29udGFpbmVyLmFwcGVuZENoaWxkKCB0b29sYmFyQ2VsbCApO1xyXG5cclxuXHRcdFx0Ly8gY29weSBleHRyYWN0UmVwbGFjZVxyXG5cdFx0XHRpZiAoIHRiLmV4dHJhY3RSZXBsYWNlICYmIHRiLmV4dHJhY3RSZXBsYWNlLmZyb20gJiYgdGIuZXh0cmFjdFJlcGxhY2UudG8gKSB7XHJcblx0XHRcdFx0dGhpcy5leHRyYWN0UmVwbGFjZXMucHVzaCggdGIuZXh0cmFjdFJlcGxhY2UgKTtcclxuXHRcdFx0fVxyXG5cdFx0fSk7XHJcblxyXG5cdFx0Ly8gSGFuZGxlIHRvb2xiYXJDb250YWluZXIgdmlzaWJpbGl0eVxyXG5cdFx0Ly8gaWYgKCB0aGlzLnRvb2xiYXJIaWRlICkge1xyXG5cdFx0Ly8gXHR0aGlzLnRvb2xiYXJDb250YWluZXIuc3R5bGUudmlzaWJpbGl0eSA9IHRoaXMuZGl2LmFjdGl2ZUVsZW1lbnQgPyAndmlzaWJsZScgOiAnaGlkZGVuJztcclxuXHJcblx0XHQvLyBcdHRoaXMuZGl2LmFkZEV2ZW50TGlzdGVuZXIoICdmb2N1cycsICgpID0+IHRoaXMudG9vbGJhckNvbnRhaW5lci5zdHlsZS52aXNpYmlsaXR5ID0gJ3Zpc2libGUnICk7XHJcblx0XHQvLyBcdHRoaXMuZGl2LmFkZEV2ZW50TGlzdGVuZXIoICdibHVyJywgKGV2KSA9PiBjb25zb2xlLmxvZyhldikgKTtcclxuXHRcdC8vIH1cclxuXHRcdHRoaXMub3V0ZXJEaXYuYXBwZW5kQ2hpbGQoIHRoaXMudG9vbGJhckNvbnRhaW5lciApO1xyXG5cdFx0dGhpcy5kaXYuYWRkRXZlbnRMaXN0ZW5lciggJ2ZvY3VzJyxcclxuXHRcdFx0XHQoKSA9PiB0aGlzLnRvb2xiYXJDb250YWluZXIuY2xhc3NMaXN0LnJlbW92ZSgnZGlzYWJsZWQnKSxcclxuXHRcdFx0XHR7IGNhcHR1cmU6IHRydWUgfSApO1xyXG5cdFx0dGhpcy5kaXYuYWRkRXZlbnRMaXN0ZW5lciggJ2JsdXInLFxyXG5cdFx0XHRcdCgpID0+IHRoaXMudG9vbGJhckNvbnRhaW5lci5jbGFzc0xpc3QuYWRkKCdkaXNhYmxlZCcpLFxyXG5cdFx0XHRcdHsgY2FwdHVyZTogdHJ1ZSB9ICk7XHJcblxyXG5cclxuXHRcdGlmICggYmFzZS5mc20gJiYgYmFzZS5mc20uZGVjSW5pdENudCApIHtcclxuXHRcdFx0YmFzZS5mc20uZGVjSW5pdENudCgpO1xyXG5cdFx0fVxyXG5cdH1cclxuXHJcblx0Ly8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy9cclxuXHJcblx0aW5zZXJ0ICggbnIsIGV2ZW50ICkge1xyXG5cclxuXHRcdGlmICggdGhpcy50b29sYmFyW25yXS5kb250SW5zZXJ0UmVjdXJzaXZlICkge1xyXG5cdFx0XHQvLyBzZWFyY2ggcGFyZW50IFwiLmluc2VydGVkXCIgKC0+IGluc2lkZSBhbm90aGVyIGluc2VydGVkIGVsZW1lbnQpXHJcblx0XHRcdGNvbnN0IHNlbCA9IHdpbmRvdy5nZXRTZWxlY3Rpb24oKTtcclxuXHRcdFx0aWYgKCBzZWwgJiYgc2VsLmZvY3VzTm9kZSApIHtcclxuXHRcdFx0XHRsZXQgcG5vZGUgPSBzZWwuZm9jdXNOb2RlO1xyXG5cdFx0XHRcdHdoaWxlICggcG5vZGUgJiYgKCAhcG5vZGUuY2xhc3NMaXN0IHx8ICFwbm9kZS5jbGFzc0xpc3QuY29udGFpbnMoJ3RleHRhcmVhSW5zZXJ0cycpICYmICFwbm9kZS5jbGFzc0xpc3QuY29udGFpbnMoJ2luc2VydGVkJykgKSApIHtcclxuXHRcdFx0XHRcdHBub2RlID0gcG5vZGUucGFyZW50Tm9kZTtcclxuXHRcdFx0XHR9XHJcblx0XHRcdFx0aWYgKCBwbm9kZS5jbGFzc0xpc3QgJiYgcG5vZGUuY2xhc3NMaXN0LmNvbnRhaW5zKCdpbnNlcnRlZCcpICkge1xyXG5cdFx0XHRcdFx0cmV0dXJuO1xyXG5cdFx0XHRcdH1cclxuXHRcdFx0fVxyXG5cdFx0fVxyXG5cclxuXHRcdGlmICggdGhpcy5wYXN0ZUh0bWxBdENhcmV0KCB0aGlzLnRvb2xiYXJbbnJdLmluc2VydCB8fCB0aGlzLnRvb2xiYXJbbnJdLmRpc3BsYXksICF0aGlzLnRvb2xiYXJbbnJdLm5vRXh0cmFTcGFjZXMsIHRoaXMudG9vbGJhcltucl0ubG9nTmFtZSApICkge1xyXG5cdFx0XHR0aGlzLmV2X2lucHV0KCk7XHQvLyBjaGVjayByZWdleHAgZXRjLlxyXG5cdFx0XHRldmVudC5wcmV2ZW50RGVmYXVsdCgpO1xyXG5cdFx0XHRldmVudC5zdG9wUHJvcGFnYXRpb24oKTtcclxuXHRcdH1cclxuXHJcblx0XHRpZiAoIHRoaXMuYmFzZSApIHtcclxuXHRcdFx0dGhpcy5iYXNlLnNlbmRDaGFuZ2VTdGF0ZSggdGhpcyApO1xyXG5cdFx0fVxyXG5cdH1cclxuXHJcbn1cclxuXHJcbi8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vL1xyXG5cclxuLy8gZXhwb3J0IHNvbWUgZGVmYXVsdCB0b29sYmFyc1xyXG5cclxuZXhwb3J0IGNvbnN0IHRvb2xiYXJNYXRoT3BlcmF0b3JzID0gW1xyXG5cdHsgZGlzcGxheTogXCImcGx1cztcIiwgbG9nTmFtZTogXCJwbHVzXCIsIH0sXHRcdC8vICsgXFx1MDAyYlxyXG5cdHsgZGlzcGxheTogXCImbWludXM7XCIsIGxvZ05hbWU6IFwibWludXNcIiwgfSxcdFx0Ly8gLSBcXHUyMjEyXHJcblx0Ly8geyBkaXNwbGF5OiBcIiZjZW50ZXJkb3Q7XCIsIH0sXHQvLyAqXHJcblx0eyBkaXNwbGF5OiBcIiZzZG90O1wiLCBsb2dOYW1lOiBcImRvdFwiLCB9LFx0XHRcdC8vICogXFx1MjJjNVxyXG5cdHsgZGlzcGxheTogXCImcmF0aW87XCIsIGxvZ05hbWU6IFwicmF0aW9cIiwgfSxcdFx0Ly8gLyBcXHUyMjM2XHJcblx0eyBkaXNwbGF5OiBcIiZlcXVhbHM7XCIsIGxvZ05hbWU6IFwiZXF1YWxzXCIsIH0sXHQvLyA9IFxcdTAwM2RcclxuXHJcbl07XHJcblxyXG5jb25zdCBmcmFjX2h0bWwgPSAnPGRpdiBjb250ZW50ZWRpdGFibGU9XCJmYWxzZVwiIGNsYXNzPVwiZnJhY1wiPicrXHJcblx0JzxzcGFuIGNvbnRlbnRlZGl0YWJsZT1cInRydWVcIiBjbGFzcz1cImZyYWMgdG9wIHN0YXJ0Q3Vyc29yUG9zIGlucHV0RmllbGRcIj48L3NwYW4+JytcclxuXHQnPHNwYW4gY29udGVudGVkaXRhYmxlPVwidHJ1ZVwiIGNsYXNzPVwiZnJhYyBib3R0b20gaW5wdXRGaWVsZFwiPjwvc3Bhbj4nK1xyXG4nPC9kaXY+JztcclxuXHJcbmltcG9ydCBmcmFjdHN2ZyBmcm9tICcuL2ltZy9mcmFjdC5zdmcnXHJcbmNvbnN0IGZyYWNfaHRtbF90b29sYmFyID0gYDxkaXYgY2xhc3M9XCJmcmFjXCI+PGltZyBzcmM9XCIke2ZyYWN0c3ZnfVwiPjwvZGl2PmA7XHJcblxyXG5cclxuZXhwb3J0IGNvbnN0IHRvb2xiYXJGcmFjdGlvbiA9IFt7XHJcblx0ZGlzcGxheTogZnJhY19odG1sX3Rvb2xiYXIsXHJcblx0aW5zZXJ0OiBmcmFjX2h0bWwsXHJcblx0ZG9udEluc2VydFJlY3Vyc2l2ZTogdHJ1ZSxcclxuXHRsb2dOYW1lOiBcImZyYWN0aW9uXCIsXHJcblx0ZXh0cmFjdFJlcGxhY2U6IHtcclxuXHRcdGZyb206IC88ZGl2W14+XSpjbGFzcz1cImZyYWNbXj5dKj5cXHMqPHNwYW5bXj5dKmNsYXNzPVwiZnJhYyB0b3BbXj5dKj4oLio/KTxcXC9zcGFuPlxccyo8c3BhbltePl0qY2xhc3M9XCJmcmFjIGJvdHRvbVtePl0qPiguKj8pPFxcL3NwYW4+XFxzKjxcXC9kaXY+L2csXHJcblx0XHR0bzogXCIoJDEpLygkMilcIlxyXG5cdH0sXHJcbn0sXHJcbl1cclxuXHJcbmV4cG9ydCBjb25zdCB0b29sYmFyUGVyY2VudCA9IFtcclxuXHR7IGRpc3BsYXk6IFwiJVwiLCBsb2dOYW1lOiBcInBlcmNlbnRcIiwgfSxcclxuXTtcclxuXHJcbmV4cG9ydCBjb25zdCB0b29sYmFyRXVybyA9IFtcclxuXHR7IGRpc3BsYXk6IFwi4oKsXCIsIGxvZ05hbWU6IFwiZXVyb1wiLCB9LFxyXG5dO1xyXG5cclxuZXhwb3J0IGNvbnN0IHRvb2xiYXJDb21wYXJpc29uID0gW1xyXG5cdHsgZGlzcGxheTogXCImbHQ7XCIsIGxvZ05hbWU6IFwibGVzc1wiLCB9LFxyXG5cdHsgZGlzcGxheTogXCImZ3Q7XCIsIGxvZ05hbWU6IFwiZ3JlYXRlclwiLCB9LFxyXG5dXHJcblxyXG5leHBvcnQgY29uc3QgdG9vbGJhck1hdGhPcGVyYXRvcnNGcmFjdGlvbiA9IHRvb2xiYXJNYXRoT3BlcmF0b3JzLmNvbmNhdCggdG9vbGJhckZyYWN0aW9uICk7XHJcblxyXG5leHBvcnQgY29uc3QgdG9vbGJhck1hdGhPcGVyYXRvcnNGcmFjdGlvbkNvbXBhcmlzb24gPSBbXS5jb25jYXQodG9vbGJhckZyYWN0aW9uKS5jb25jYXQoIHRvb2xiYXJNYXRoT3BlcmF0b3JzRnJhY3Rpb24gKTtcclxuXHJcbmV4cG9ydCBjb25zdCB0b29sYmFyTWF0aE9wZXJhdG9yc0ZyYWN0aW9uUGVyY2VudCA9IHRvb2xiYXJNYXRoT3BlcmF0b3JzRnJhY3Rpb24uY29uY2F0KCB0b29sYmFyUGVyY2VudCApO1xyXG4iLCIvLyBleHRyYWN0ZWQgYnkgbWluaS1jc3MtZXh0cmFjdC1wbHVnaW5cbmV4cG9ydCB7fTsiLCIvLyBleHRyYWN0ZWQgYnkgbWluaS1jc3MtZXh0cmFjdC1wbHVnaW5cbmV4cG9ydCB7fTsiLCIvLyBleHRyYWN0ZWQgYnkgbWluaS1jc3MtZXh0cmFjdC1wbHVnaW5cbmV4cG9ydCB7fTsiLCIndXNlIHN0cmljdCc7XG52YXIgaXNDYWxsYWJsZSA9IHJlcXVpcmUoJy4uL2ludGVybmFscy9pcy1jYWxsYWJsZScpO1xudmFyIHRyeVRvU3RyaW5nID0gcmVxdWlyZSgnLi4vaW50ZXJuYWxzL3RyeS10by1zdHJpbmcnKTtcblxudmFyICRUeXBlRXJyb3IgPSBUeXBlRXJyb3I7XG5cbi8vIGBBc3NlcnQ6IElzQ2FsbGFibGUoYXJndW1lbnQpIGlzIHRydWVgXG5tb2R1bGUuZXhwb3J0cyA9IGZ1bmN0aW9uIChhcmd1bWVudCkge1xuICBpZiAoaXNDYWxsYWJsZShhcmd1bWVudCkpIHJldHVybiBhcmd1bWVudDtcbiAgdGhyb3cgbmV3ICRUeXBlRXJyb3IodHJ5VG9TdHJpbmcoYXJndW1lbnQpICsgJyBpcyBub3QgYSBmdW5jdGlvbicpO1xufTtcbiIsIid1c2Ugc3RyaWN0JztcbnZhciBpc0NvbnN0cnVjdG9yID0gcmVxdWlyZSgnLi4vaW50ZXJuYWxzL2lzLWNvbnN0cnVjdG9yJyk7XG52YXIgdHJ5VG9TdHJpbmcgPSByZXF1aXJlKCcuLi9pbnRlcm5hbHMvdHJ5LXRvLXN0cmluZycpO1xuXG52YXIgJFR5cGVFcnJvciA9IFR5cGVFcnJvcjtcblxuLy8gYEFzc2VydDogSXNDb25zdHJ1Y3Rvcihhcmd1bWVudCkgaXMgdHJ1ZWBcbm1vZHVsZS5leHBvcnRzID0gZnVuY3Rpb24gKGFyZ3VtZW50KSB7XG4gIGlmIChpc0NvbnN0cnVjdG9yKGFyZ3VtZW50KSkgcmV0dXJuIGFyZ3VtZW50O1xuICB0aHJvdyBuZXcgJFR5cGVFcnJvcih0cnlUb1N0cmluZyhhcmd1bWVudCkgKyAnIGlzIG5vdCBhIGNvbnN0cnVjdG9yJyk7XG59O1xuIiwiJ3VzZSBzdHJpY3QnO1xudmFyIGlzUG9zc2libGVQcm90b3R5cGUgPSByZXF1aXJlKCcuLi9pbnRlcm5hbHMvaXMtcG9zc2libGUtcHJvdG90eXBlJyk7XG5cbnZhciAkU3RyaW5nID0gU3RyaW5nO1xudmFyICRUeXBlRXJyb3IgPSBUeXBlRXJyb3I7XG5cbm1vZHVsZS5leHBvcnRzID0gZnVuY3Rpb24gKGFyZ3VtZW50KSB7XG4gIGlmIChpc1Bvc3NpYmxlUHJvdG90eXBlKGFyZ3VtZW50KSkgcmV0dXJuIGFyZ3VtZW50O1xuICB0aHJvdyBuZXcgJFR5cGVFcnJvcihcIkNhbid0IHNldCBcIiArICRTdHJpbmcoYXJndW1lbnQpICsgJyBhcyBhIHByb3RvdHlwZScpO1xufTtcbiIsIid1c2Ugc3RyaWN0JztcbnZhciB3ZWxsS25vd25TeW1ib2wgPSByZXF1aXJlKCcuLi9pbnRlcm5hbHMvd2VsbC1rbm93bi1zeW1ib2wnKTtcbnZhciBjcmVhdGUgPSByZXF1aXJlKCcuLi9pbnRlcm5hbHMvb2JqZWN0LWNyZWF0ZScpO1xudmFyIGRlZmluZVByb3BlcnR5ID0gcmVxdWlyZSgnLi4vaW50ZXJuYWxzL29iamVjdC1kZWZpbmUtcHJvcGVydHknKS5mO1xuXG52YXIgVU5TQ09QQUJMRVMgPSB3ZWxsS25vd25TeW1ib2woJ3Vuc2NvcGFibGVzJyk7XG52YXIgQXJyYXlQcm90b3R5cGUgPSBBcnJheS5wcm90b3R5cGU7XG5cbi8vIEFycmF5LnByb3RvdHlwZVtAQHVuc2NvcGFibGVzXVxuLy8gaHR0cHM6Ly90YzM5LmVzL2VjbWEyNjIvI3NlYy1hcnJheS5wcm90b3R5cGUtQEB1bnNjb3BhYmxlc1xuaWYgKEFycmF5UHJvdG90eXBlW1VOU0NPUEFCTEVTXSA9PT0gdW5kZWZpbmVkKSB7XG4gIGRlZmluZVByb3BlcnR5KEFycmF5UHJvdG90eXBlLCBVTlNDT1BBQkxFUywge1xuICAgIGNvbmZpZ3VyYWJsZTogdHJ1ZSxcbiAgICB2YWx1ZTogY3JlYXRlKG51bGwpXG4gIH0pO1xufVxuXG4vLyBhZGQgYSBrZXkgdG8gQXJyYXkucHJvdG90eXBlW0BAdW5zY29wYWJsZXNdXG5tb2R1bGUuZXhwb3J0cyA9IGZ1bmN0aW9uIChrZXkpIHtcbiAgQXJyYXlQcm90b3R5cGVbVU5TQ09QQUJMRVNdW2tleV0gPSB0cnVlO1xufTtcbiIsIid1c2Ugc3RyaWN0JztcbnZhciBjaGFyQXQgPSByZXF1aXJlKCcuLi9pbnRlcm5hbHMvc3RyaW5nLW11bHRpYnl0ZScpLmNoYXJBdDtcblxuLy8gYEFkdmFuY2VTdHJpbmdJbmRleGAgYWJzdHJhY3Qgb3BlcmF0aW9uXG4vLyBodHRwczovL3RjMzkuZXMvZWNtYTI2Mi8jc2VjLWFkdmFuY2VzdHJpbmdpbmRleFxubW9kdWxlLmV4cG9ydHMgPSBmdW5jdGlvbiAoUywgaW5kZXgsIHVuaWNvZGUpIHtcbiAgcmV0dXJuIGluZGV4ICsgKHVuaWNvZGUgPyBjaGFyQXQoUywgaW5kZXgpLmxlbmd0aCA6IDEpO1xufTtcbiIsIid1c2Ugc3RyaWN0JztcbnZhciBpc1Byb3RvdHlwZU9mID0gcmVxdWlyZSgnLi4vaW50ZXJuYWxzL29iamVjdC1pcy1wcm90b3R5cGUtb2YnKTtcblxudmFyICRUeXBlRXJyb3IgPSBUeXBlRXJyb3I7XG5cbm1vZHVsZS5leHBvcnRzID0gZnVuY3Rpb24gKGl0LCBQcm90b3R5cGUpIHtcbiAgaWYgKGlzUHJvdG90eXBlT2YoUHJvdG90eXBlLCBpdCkpIHJldHVybiBpdDtcbiAgdGhyb3cgbmV3ICRUeXBlRXJyb3IoJ0luY29ycmVjdCBpbnZvY2F0aW9uJyk7XG59O1xuIiwiJ3VzZSBzdHJpY3QnO1xudmFyIGlzT2JqZWN0ID0gcmVxdWlyZSgnLi4vaW50ZXJuYWxzL2lzLW9iamVjdCcpO1xuXG52YXIgJFN0cmluZyA9IFN0cmluZztcbnZhciAkVHlwZUVycm9yID0gVHlwZUVycm9yO1xuXG4vLyBgQXNzZXJ0OiBUeXBlKGFyZ3VtZW50KSBpcyBPYmplY3RgXG5tb2R1bGUuZXhwb3J0cyA9IGZ1bmN0aW9uIChhcmd1bWVudCkge1xuICBpZiAoaXNPYmplY3QoYXJndW1lbnQpKSByZXR1cm4gYXJndW1lbnQ7XG4gIHRocm93IG5ldyAkVHlwZUVycm9yKCRTdHJpbmcoYXJndW1lbnQpICsgJyBpcyBub3QgYW4gb2JqZWN0Jyk7XG59O1xuIiwiJ3VzZSBzdHJpY3QnO1xudmFyIGJpbmQgPSByZXF1aXJlKCcuLi9pbnRlcm5hbHMvZnVuY3Rpb24tYmluZC1jb250ZXh0Jyk7XG52YXIgY2FsbCA9IHJlcXVpcmUoJy4uL2ludGVybmFscy9mdW5jdGlvbi1jYWxsJyk7XG52YXIgdG9PYmplY3QgPSByZXF1aXJlKCcuLi9pbnRlcm5hbHMvdG8tb2JqZWN0Jyk7XG52YXIgY2FsbFdpdGhTYWZlSXRlcmF0aW9uQ2xvc2luZyA9IHJlcXVpcmUoJy4uL2ludGVybmFscy9jYWxsLXdpdGgtc2FmZS1pdGVyYXRpb24tY2xvc2luZycpO1xudmFyIGlzQXJyYXlJdGVyYXRvck1ldGhvZCA9IHJlcXVpcmUoJy4uL2ludGVybmFscy9pcy1hcnJheS1pdGVyYXRvci1tZXRob2QnKTtcbnZhciBpc0NvbnN0cnVjdG9yID0gcmVxdWlyZSgnLi4vaW50ZXJuYWxzL2lzLWNvbnN0cnVjdG9yJyk7XG52YXIgbGVuZ3RoT2ZBcnJheUxpa2UgPSByZXF1aXJlKCcuLi9pbnRlcm5hbHMvbGVuZ3RoLW9mLWFycmF5LWxpa2UnKTtcbnZhciBjcmVhdGVQcm9wZXJ0eSA9IHJlcXVpcmUoJy4uL2ludGVybmFscy9jcmVhdGUtcHJvcGVydHknKTtcbnZhciBnZXRJdGVyYXRvciA9IHJlcXVpcmUoJy4uL2ludGVybmFscy9nZXQtaXRlcmF0b3InKTtcbnZhciBnZXRJdGVyYXRvck1ldGhvZCA9IHJlcXVpcmUoJy4uL2ludGVybmFscy9nZXQtaXRlcmF0b3ItbWV0aG9kJyk7XG5cbnZhciAkQXJyYXkgPSBBcnJheTtcblxuLy8gYEFycmF5LmZyb21gIG1ldGhvZCBpbXBsZW1lbnRhdGlvblxuLy8gaHR0cHM6Ly90YzM5LmVzL2VjbWEyNjIvI3NlYy1hcnJheS5mcm9tXG5tb2R1bGUuZXhwb3J0cyA9IGZ1bmN0aW9uIGZyb20oYXJyYXlMaWtlIC8qICwgbWFwZm4gPSB1bmRlZmluZWQsIHRoaXNBcmcgPSB1bmRlZmluZWQgKi8pIHtcbiAgdmFyIE8gPSB0b09iamVjdChhcnJheUxpa2UpO1xuICB2YXIgSVNfQ09OU1RSVUNUT1IgPSBpc0NvbnN0cnVjdG9yKHRoaXMpO1xuICB2YXIgYXJndW1lbnRzTGVuZ3RoID0gYXJndW1lbnRzLmxlbmd0aDtcbiAgdmFyIG1hcGZuID0gYXJndW1lbnRzTGVuZ3RoID4gMSA/IGFyZ3VtZW50c1sxXSA6IHVuZGVmaW5lZDtcbiAgdmFyIG1hcHBpbmcgPSBtYXBmbiAhPT0gdW5kZWZpbmVkO1xuICBpZiAobWFwcGluZykgbWFwZm4gPSBiaW5kKG1hcGZuLCBhcmd1bWVudHNMZW5ndGggPiAyID8gYXJndW1lbnRzWzJdIDogdW5kZWZpbmVkKTtcbiAgdmFyIGl0ZXJhdG9yTWV0aG9kID0gZ2V0SXRlcmF0b3JNZXRob2QoTyk7XG4gIHZhciBpbmRleCA9IDA7XG4gIHZhciBsZW5ndGgsIHJlc3VsdCwgc3RlcCwgaXRlcmF0b3IsIG5leHQsIHZhbHVlO1xuICAvLyBpZiB0aGUgdGFyZ2V0IGlzIG5vdCBpdGVyYWJsZSBvciBpdCdzIGFuIGFycmF5IHdpdGggdGhlIGRlZmF1bHQgaXRlcmF0b3IgLSB1c2UgYSBzaW1wbGUgY2FzZVxuICBpZiAoaXRlcmF0b3JNZXRob2QgJiYgISh0aGlzID09PSAkQXJyYXkgJiYgaXNBcnJheUl0ZXJhdG9yTWV0aG9kKGl0ZXJhdG9yTWV0aG9kKSkpIHtcbiAgICByZXN1bHQgPSBJU19DT05TVFJVQ1RPUiA/IG5ldyB0aGlzKCkgOiBbXTtcbiAgICBpdGVyYXRvciA9IGdldEl0ZXJhdG9yKE8sIGl0ZXJhdG9yTWV0aG9kKTtcbiAgICBuZXh0ID0gaXRlcmF0b3IubmV4dDtcbiAgICBmb3IgKDshKHN0ZXAgPSBjYWxsKG5leHQsIGl0ZXJhdG9yKSkuZG9uZTsgaW5kZXgrKykge1xuICAgICAgdmFsdWUgPSBtYXBwaW5nID8gY2FsbFdpdGhTYWZlSXRlcmF0aW9uQ2xvc2luZyhpdGVyYXRvciwgbWFwZm4sIFtzdGVwLnZhbHVlLCBpbmRleF0sIHRydWUpIDogc3RlcC52YWx1ZTtcbiAgICAgIGNyZWF0ZVByb3BlcnR5KHJlc3VsdCwgaW5kZXgsIHZhbHVlKTtcbiAgICB9XG4gIH0gZWxzZSB7XG4gICAgbGVuZ3RoID0gbGVuZ3RoT2ZBcnJheUxpa2UoTyk7XG4gICAgcmVzdWx0ID0gSVNfQ09OU1RSVUNUT1IgPyBuZXcgdGhpcyhsZW5ndGgpIDogJEFycmF5KGxlbmd0aCk7XG4gICAgZm9yICg7bGVuZ3RoID4gaW5kZXg7IGluZGV4KyspIHtcbiAgICAgIHZhbHVlID0gbWFwcGluZyA/IG1hcGZuKE9baW5kZXhdLCBpbmRleCkgOiBPW2luZGV4XTtcbiAgICAgIGNyZWF0ZVByb3BlcnR5KHJlc3VsdCwgaW5kZXgsIHZhbHVlKTtcbiAgICB9XG4gIH1cbiAgcmVzdWx0Lmxlbmd0aCA9IGluZGV4O1xuICByZXR1cm4gcmVzdWx0O1xufTtcbiIsIid1c2Ugc3RyaWN0JztcbnZhciB0b0luZGV4ZWRPYmplY3QgPSByZXF1aXJlKCcuLi9pbnRlcm5hbHMvdG8taW5kZXhlZC1vYmplY3QnKTtcbnZhciB0b0Fic29sdXRlSW5kZXggPSByZXF1aXJlKCcuLi9pbnRlcm5hbHMvdG8tYWJzb2x1dGUtaW5kZXgnKTtcbnZhciBsZW5ndGhPZkFycmF5TGlrZSA9IHJlcXVpcmUoJy4uL2ludGVybmFscy9sZW5ndGgtb2YtYXJyYXktbGlrZScpO1xuXG4vLyBgQXJyYXkucHJvdG90eXBlLnsgaW5kZXhPZiwgaW5jbHVkZXMgfWAgbWV0aG9kcyBpbXBsZW1lbnRhdGlvblxudmFyIGNyZWF0ZU1ldGhvZCA9IGZ1bmN0aW9uIChJU19JTkNMVURFUykge1xuICByZXR1cm4gZnVuY3Rpb24gKCR0aGlzLCBlbCwgZnJvbUluZGV4KSB7XG4gICAgdmFyIE8gPSB0b0luZGV4ZWRPYmplY3QoJHRoaXMpO1xuICAgIHZhciBsZW5ndGggPSBsZW5ndGhPZkFycmF5TGlrZShPKTtcbiAgICBpZiAobGVuZ3RoID09PSAwKSByZXR1cm4gIUlTX0lOQ0xVREVTICYmIC0xO1xuICAgIHZhciBpbmRleCA9IHRvQWJzb2x1dGVJbmRleChmcm9tSW5kZXgsIGxlbmd0aCk7XG4gICAgdmFyIHZhbHVlO1xuICAgIC8vIEFycmF5I2luY2x1ZGVzIHVzZXMgU2FtZVZhbHVlWmVybyBlcXVhbGl0eSBhbGdvcml0aG1cbiAgICAvLyBlc2xpbnQtZGlzYWJsZS1uZXh0LWxpbmUgbm8tc2VsZi1jb21wYXJlIC0tIE5hTiBjaGVja1xuICAgIGlmIChJU19JTkNMVURFUyAmJiBlbCAhPT0gZWwpIHdoaWxlIChsZW5ndGggPiBpbmRleCkge1xuICAgICAgdmFsdWUgPSBPW2luZGV4KytdO1xuICAgICAgLy8gZXNsaW50LWRpc2FibGUtbmV4dC1saW5lIG5vLXNlbGYtY29tcGFyZSAtLSBOYU4gY2hlY2tcbiAgICAgIGlmICh2YWx1ZSAhPT0gdmFsdWUpIHJldHVybiB0cnVlO1xuICAgIC8vIEFycmF5I2luZGV4T2YgaWdub3JlcyBob2xlcywgQXJyYXkjaW5jbHVkZXMgLSBub3RcbiAgICB9IGVsc2UgZm9yICg7bGVuZ3RoID4gaW5kZXg7IGluZGV4KyspIHtcbiAgICAgIGlmICgoSVNfSU5DTFVERVMgfHwgaW5kZXggaW4gTykgJiYgT1tpbmRleF0gPT09IGVsKSByZXR1cm4gSVNfSU5DTFVERVMgfHwgaW5kZXggfHwgMDtcbiAgICB9IHJldHVybiAhSVNfSU5DTFVERVMgJiYgLTE7XG4gIH07XG59O1xuXG5tb2R1bGUuZXhwb3J0cyA9IHtcbiAgLy8gYEFycmF5LnByb3RvdHlwZS5pbmNsdWRlc2AgbWV0aG9kXG4gIC8vIGh0dHBzOi8vdGMzOS5lcy9lY21hMjYyLyNzZWMtYXJyYXkucHJvdG90eXBlLmluY2x1ZGVzXG4gIGluY2x1ZGVzOiBjcmVhdGVNZXRob2QodHJ1ZSksXG4gIC8vIGBBcnJheS5wcm90b3R5cGUuaW5kZXhPZmAgbWV0aG9kXG4gIC8vIGh0dHBzOi8vdGMzOS5lcy9lY21hMjYyLyNzZWMtYXJyYXkucHJvdG90eXBlLmluZGV4b2ZcbiAgaW5kZXhPZjogY3JlYXRlTWV0aG9kKGZhbHNlKVxufTtcbiIsIid1c2Ugc3RyaWN0JztcbnZhciB1bmN1cnJ5VGhpcyA9IHJlcXVpcmUoJy4uL2ludGVybmFscy9mdW5jdGlvbi11bmN1cnJ5LXRoaXMnKTtcblxubW9kdWxlLmV4cG9ydHMgPSB1bmN1cnJ5VGhpcyhbXS5zbGljZSk7XG4iLCIndXNlIHN0cmljdCc7XG52YXIgYXJyYXlTbGljZSA9IHJlcXVpcmUoJy4uL2ludGVybmFscy9hcnJheS1zbGljZScpO1xuXG52YXIgZmxvb3IgPSBNYXRoLmZsb29yO1xuXG52YXIgc29ydCA9IGZ1bmN0aW9uIChhcnJheSwgY29tcGFyZWZuKSB7XG4gIHZhciBsZW5ndGggPSBhcnJheS5sZW5ndGg7XG5cbiAgaWYgKGxlbmd0aCA8IDgpIHtcbiAgICAvLyBpbnNlcnRpb24gc29ydFxuICAgIHZhciBpID0gMTtcbiAgICB2YXIgZWxlbWVudCwgajtcblxuICAgIHdoaWxlIChpIDwgbGVuZ3RoKSB7XG4gICAgICBqID0gaTtcbiAgICAgIGVsZW1lbnQgPSBhcnJheVtpXTtcbiAgICAgIHdoaWxlIChqICYmIGNvbXBhcmVmbihhcnJheVtqIC0gMV0sIGVsZW1lbnQpID4gMCkge1xuICAgICAgICBhcnJheVtqXSA9IGFycmF5Wy0tal07XG4gICAgICB9XG4gICAgICBpZiAoaiAhPT0gaSsrKSBhcnJheVtqXSA9IGVsZW1lbnQ7XG4gICAgfVxuICB9IGVsc2Uge1xuICAgIC8vIG1lcmdlIHNvcnRcbiAgICB2YXIgbWlkZGxlID0gZmxvb3IobGVuZ3RoIC8gMik7XG4gICAgdmFyIGxlZnQgPSBzb3J0KGFycmF5U2xpY2UoYXJyYXksIDAsIG1pZGRsZSksIGNvbXBhcmVmbik7XG4gICAgdmFyIHJpZ2h0ID0gc29ydChhcnJheVNsaWNlKGFycmF5LCBtaWRkbGUpLCBjb21wYXJlZm4pO1xuICAgIHZhciBsbGVuZ3RoID0gbGVmdC5sZW5ndGg7XG4gICAgdmFyIHJsZW5ndGggPSByaWdodC5sZW5ndGg7XG4gICAgdmFyIGxpbmRleCA9IDA7XG4gICAgdmFyIHJpbmRleCA9IDA7XG5cbiAgICB3aGlsZSAobGluZGV4IDwgbGxlbmd0aCB8fCByaW5kZXggPCBybGVuZ3RoKSB7XG4gICAgICBhcnJheVtsaW5kZXggKyByaW5kZXhdID0gKGxpbmRleCA8IGxsZW5ndGggJiYgcmluZGV4IDwgcmxlbmd0aClcbiAgICAgICAgPyBjb21wYXJlZm4obGVmdFtsaW5kZXhdLCByaWdodFtyaW5kZXhdKSA8PSAwID8gbGVmdFtsaW5kZXgrK10gOiByaWdodFtyaW5kZXgrK11cbiAgICAgICAgOiBsaW5kZXggPCBsbGVuZ3RoID8gbGVmdFtsaW5kZXgrK10gOiByaWdodFtyaW5kZXgrK107XG4gICAgfVxuICB9XG5cbiAgcmV0dXJuIGFycmF5O1xufTtcblxubW9kdWxlLmV4cG9ydHMgPSBzb3J0O1xuIiwiJ3VzZSBzdHJpY3QnO1xudmFyIGFuT2JqZWN0ID0gcmVxdWlyZSgnLi4vaW50ZXJuYWxzL2FuLW9iamVjdCcpO1xudmFyIGl0ZXJhdG9yQ2xvc2UgPSByZXF1aXJlKCcuLi9pbnRlcm5hbHMvaXRlcmF0b3ItY2xvc2UnKTtcblxuLy8gY2FsbCBzb21ldGhpbmcgb24gaXRlcmF0b3Igc3RlcCB3aXRoIHNhZmUgY2xvc2luZyBvbiBlcnJvclxubW9kdWxlLmV4cG9ydHMgPSBmdW5jdGlvbiAoaXRlcmF0b3IsIGZuLCB2YWx1ZSwgRU5UUklFUykge1xuICB0cnkge1xuICAgIHJldHVybiBFTlRSSUVTID8gZm4oYW5PYmplY3QodmFsdWUpWzBdLCB2YWx1ZVsxXSkgOiBmbih2YWx1ZSk7XG4gIH0gY2F0Y2ggKGVycm9yKSB7XG4gICAgaXRlcmF0b3JDbG9zZShpdGVyYXRvciwgJ3Rocm93JywgZXJyb3IpO1xuICB9XG59O1xuIiwiJ3VzZSBzdHJpY3QnO1xudmFyIHVuY3VycnlUaGlzID0gcmVxdWlyZSgnLi4vaW50ZXJuYWxzL2Z1bmN0aW9uLXVuY3VycnktdGhpcycpO1xuXG52YXIgdG9TdHJpbmcgPSB1bmN1cnJ5VGhpcyh7fS50b1N0cmluZyk7XG52YXIgc3RyaW5nU2xpY2UgPSB1bmN1cnJ5VGhpcygnJy5zbGljZSk7XG5cbm1vZHVsZS5leHBvcnRzID0gZnVuY3Rpb24gKGl0KSB7XG4gIHJldHVybiBzdHJpbmdTbGljZSh0b1N0cmluZyhpdCksIDgsIC0xKTtcbn07XG4iLCIndXNlIHN0cmljdCc7XG52YXIgVE9fU1RSSU5HX1RBR19TVVBQT1JUID0gcmVxdWlyZSgnLi4vaW50ZXJuYWxzL3RvLXN0cmluZy10YWctc3VwcG9ydCcpO1xudmFyIGlzQ2FsbGFibGUgPSByZXF1aXJlKCcuLi9pbnRlcm5hbHMvaXMtY2FsbGFibGUnKTtcbnZhciBjbGFzc29mUmF3ID0gcmVxdWlyZSgnLi4vaW50ZXJuYWxzL2NsYXNzb2YtcmF3Jyk7XG52YXIgd2VsbEtub3duU3ltYm9sID0gcmVxdWlyZSgnLi4vaW50ZXJuYWxzL3dlbGwta25vd24tc3ltYm9sJyk7XG5cbnZhciBUT19TVFJJTkdfVEFHID0gd2VsbEtub3duU3ltYm9sKCd0b1N0cmluZ1RhZycpO1xudmFyICRPYmplY3QgPSBPYmplY3Q7XG5cbi8vIEVTMyB3cm9uZyBoZXJlXG52YXIgQ09SUkVDVF9BUkdVTUVOVFMgPSBjbGFzc29mUmF3KGZ1bmN0aW9uICgpIHsgcmV0dXJuIGFyZ3VtZW50czsgfSgpKSA9PT0gJ0FyZ3VtZW50cyc7XG5cbi8vIGZhbGxiYWNrIGZvciBJRTExIFNjcmlwdCBBY2Nlc3MgRGVuaWVkIGVycm9yXG52YXIgdHJ5R2V0ID0gZnVuY3Rpb24gKGl0LCBrZXkpIHtcbiAgdHJ5IHtcbiAgICByZXR1cm4gaXRba2V5XTtcbiAgfSBjYXRjaCAoZXJyb3IpIHsgLyogZW1wdHkgKi8gfVxufTtcblxuLy8gZ2V0dGluZyB0YWcgZnJvbSBFUzYrIGBPYmplY3QucHJvdG90eXBlLnRvU3RyaW5nYFxubW9kdWxlLmV4cG9ydHMgPSBUT19TVFJJTkdfVEFHX1NVUFBPUlQgPyBjbGFzc29mUmF3IDogZnVuY3Rpb24gKGl0KSB7XG4gIHZhciBPLCB0YWcsIHJlc3VsdDtcbiAgcmV0dXJuIGl0ID09PSB1bmRlZmluZWQgPyAnVW5kZWZpbmVkJyA6IGl0ID09PSBudWxsID8gJ051bGwnXG4gICAgLy8gQEB0b1N0cmluZ1RhZyBjYXNlXG4gICAgOiB0eXBlb2YgKHRhZyA9IHRyeUdldChPID0gJE9iamVjdChpdCksIFRPX1NUUklOR19UQUcpKSA9PSAnc3RyaW5nJyA/IHRhZ1xuICAgIC8vIGJ1aWx0aW5UYWcgY2FzZVxuICAgIDogQ09SUkVDVF9BUkdVTUVOVFMgPyBjbGFzc29mUmF3KE8pXG4gICAgLy8gRVMzIGFyZ3VtZW50cyBmYWxsYmFja1xuICAgIDogKHJlc3VsdCA9IGNsYXNzb2ZSYXcoTykpID09PSAnT2JqZWN0JyAmJiBpc0NhbGxhYmxlKE8uY2FsbGVlKSA/ICdBcmd1bWVudHMnIDogcmVzdWx0O1xufTtcbiIsIid1c2Ugc3RyaWN0JztcbnZhciBoYXNPd24gPSByZXF1aXJlKCcuLi9pbnRlcm5hbHMvaGFzLW93bi1wcm9wZXJ0eScpO1xudmFyIG93bktleXMgPSByZXF1aXJlKCcuLi9pbnRlcm5hbHMvb3duLWtleXMnKTtcbnZhciBnZXRPd25Qcm9wZXJ0eURlc2NyaXB0b3JNb2R1bGUgPSByZXF1aXJlKCcuLi9pbnRlcm5hbHMvb2JqZWN0LWdldC1vd24tcHJvcGVydHktZGVzY3JpcHRvcicpO1xudmFyIGRlZmluZVByb3BlcnR5TW9kdWxlID0gcmVxdWlyZSgnLi4vaW50ZXJuYWxzL29iamVjdC1kZWZpbmUtcHJvcGVydHknKTtcblxubW9kdWxlLmV4cG9ydHMgPSBmdW5jdGlvbiAodGFyZ2V0LCBzb3VyY2UsIGV4Y2VwdGlvbnMpIHtcbiAgdmFyIGtleXMgPSBvd25LZXlzKHNvdXJjZSk7XG4gIHZhciBkZWZpbmVQcm9wZXJ0eSA9IGRlZmluZVByb3BlcnR5TW9kdWxlLmY7XG4gIHZhciBnZXRPd25Qcm9wZXJ0eURlc2NyaXB0b3IgPSBnZXRPd25Qcm9wZXJ0eURlc2NyaXB0b3JNb2R1bGUuZjtcbiAgZm9yICh2YXIgaSA9IDA7IGkgPCBrZXlzLmxlbmd0aDsgaSsrKSB7XG4gICAgdmFyIGtleSA9IGtleXNbaV07XG4gICAgaWYgKCFoYXNPd24odGFyZ2V0LCBrZXkpICYmICEoZXhjZXB0aW9ucyAmJiBoYXNPd24oZXhjZXB0aW9ucywga2V5KSkpIHtcbiAgICAgIGRlZmluZVByb3BlcnR5KHRhcmdldCwga2V5LCBnZXRPd25Qcm9wZXJ0eURlc2NyaXB0b3Ioc291cmNlLCBrZXkpKTtcbiAgICB9XG4gIH1cbn07XG4iLCIndXNlIHN0cmljdCc7XG52YXIgZmFpbHMgPSByZXF1aXJlKCcuLi9pbnRlcm5hbHMvZmFpbHMnKTtcblxubW9kdWxlLmV4cG9ydHMgPSAhZmFpbHMoZnVuY3Rpb24gKCkge1xuICBmdW5jdGlvbiBGKCkgeyAvKiBlbXB0eSAqLyB9XG4gIEYucHJvdG90eXBlLmNvbnN0cnVjdG9yID0gbnVsbDtcbiAgLy8gZXNsaW50LWRpc2FibGUtbmV4dC1saW5lIGVzL25vLW9iamVjdC1nZXRwcm90b3R5cGVvZiAtLSByZXF1aXJlZCBmb3IgdGVzdGluZ1xuICByZXR1cm4gT2JqZWN0LmdldFByb3RvdHlwZU9mKG5ldyBGKCkpICE9PSBGLnByb3RvdHlwZTtcbn0pO1xuIiwiJ3VzZSBzdHJpY3QnO1xuLy8gYENyZWF0ZUl0ZXJSZXN1bHRPYmplY3RgIGFic3RyYWN0IG9wZXJhdGlvblxuLy8gaHR0cHM6Ly90YzM5LmVzL2VjbWEyNjIvI3NlYy1jcmVhdGVpdGVycmVzdWx0b2JqZWN0XG5tb2R1bGUuZXhwb3J0cyA9IGZ1bmN0aW9uICh2YWx1ZSwgZG9uZSkge1xuICByZXR1cm4geyB2YWx1ZTogdmFsdWUsIGRvbmU6IGRvbmUgfTtcbn07XG4iLCIndXNlIHN0cmljdCc7XG52YXIgREVTQ1JJUFRPUlMgPSByZXF1aXJlKCcuLi9pbnRlcm5hbHMvZGVzY3JpcHRvcnMnKTtcbnZhciBkZWZpbmVQcm9wZXJ0eU1vZHVsZSA9IHJlcXVpcmUoJy4uL2ludGVybmFscy9vYmplY3QtZGVmaW5lLXByb3BlcnR5Jyk7XG52YXIgY3JlYXRlUHJvcGVydHlEZXNjcmlwdG9yID0gcmVxdWlyZSgnLi4vaW50ZXJuYWxzL2NyZWF0ZS1wcm9wZXJ0eS1kZXNjcmlwdG9yJyk7XG5cbm1vZHVsZS5leHBvcnRzID0gREVTQ1JJUFRPUlMgPyBmdW5jdGlvbiAob2JqZWN0LCBrZXksIHZhbHVlKSB7XG4gIHJldHVybiBkZWZpbmVQcm9wZXJ0eU1vZHVsZS5mKG9iamVjdCwga2V5LCBjcmVhdGVQcm9wZXJ0eURlc2NyaXB0b3IoMSwgdmFsdWUpKTtcbn0gOiBmdW5jdGlvbiAob2JqZWN0LCBrZXksIHZhbHVlKSB7XG4gIG9iamVjdFtrZXldID0gdmFsdWU7XG4gIHJldHVybiBvYmplY3Q7XG59O1xuIiwiJ3VzZSBzdHJpY3QnO1xubW9kdWxlLmV4cG9ydHMgPSBmdW5jdGlvbiAoYml0bWFwLCB2YWx1ZSkge1xuICByZXR1cm4ge1xuICAgIGVudW1lcmFibGU6ICEoYml0bWFwICYgMSksXG4gICAgY29uZmlndXJhYmxlOiAhKGJpdG1hcCAmIDIpLFxuICAgIHdyaXRhYmxlOiAhKGJpdG1hcCAmIDQpLFxuICAgIHZhbHVlOiB2YWx1ZVxuICB9O1xufTtcbiIsIid1c2Ugc3RyaWN0JztcbnZhciBERVNDUklQVE9SUyA9IHJlcXVpcmUoJy4uL2ludGVybmFscy9kZXNjcmlwdG9ycycpO1xudmFyIGRlZmluZVByb3BlcnR5TW9kdWxlID0gcmVxdWlyZSgnLi4vaW50ZXJuYWxzL29iamVjdC1kZWZpbmUtcHJvcGVydHknKTtcbnZhciBjcmVhdGVQcm9wZXJ0eURlc2NyaXB0b3IgPSByZXF1aXJlKCcuLi9pbnRlcm5hbHMvY3JlYXRlLXByb3BlcnR5LWRlc2NyaXB0b3InKTtcblxubW9kdWxlLmV4cG9ydHMgPSBmdW5jdGlvbiAob2JqZWN0LCBrZXksIHZhbHVlKSB7XG4gIGlmIChERVNDUklQVE9SUykgZGVmaW5lUHJvcGVydHlNb2R1bGUuZihvYmplY3QsIGtleSwgY3JlYXRlUHJvcGVydHlEZXNjcmlwdG9yKDAsIHZhbHVlKSk7XG4gIGVsc2Ugb2JqZWN0W2tleV0gPSB2YWx1ZTtcbn07XG4iLCIndXNlIHN0cmljdCc7XG52YXIgbWFrZUJ1aWx0SW4gPSByZXF1aXJlKCcuLi9pbnRlcm5hbHMvbWFrZS1idWlsdC1pbicpO1xudmFyIGRlZmluZVByb3BlcnR5ID0gcmVxdWlyZSgnLi4vaW50ZXJuYWxzL29iamVjdC1kZWZpbmUtcHJvcGVydHknKTtcblxubW9kdWxlLmV4cG9ydHMgPSBmdW5jdGlvbiAodGFyZ2V0LCBuYW1lLCBkZXNjcmlwdG9yKSB7XG4gIGlmIChkZXNjcmlwdG9yLmdldCkgbWFrZUJ1aWx0SW4oZGVzY3JpcHRvci5nZXQsIG5hbWUsIHsgZ2V0dGVyOiB0cnVlIH0pO1xuICBpZiAoZGVzY3JpcHRvci5zZXQpIG1ha2VCdWlsdEluKGRlc2NyaXB0b3Iuc2V0LCBuYW1lLCB7IHNldHRlcjogdHJ1ZSB9KTtcbiAgcmV0dXJuIGRlZmluZVByb3BlcnR5LmYodGFyZ2V0LCBuYW1lLCBkZXNjcmlwdG9yKTtcbn07XG4iLCIndXNlIHN0cmljdCc7XG52YXIgaXNDYWxsYWJsZSA9IHJlcXVpcmUoJy4uL2ludGVybmFscy9pcy1jYWxsYWJsZScpO1xudmFyIGRlZmluZVByb3BlcnR5TW9kdWxlID0gcmVxdWlyZSgnLi4vaW50ZXJuYWxzL29iamVjdC1kZWZpbmUtcHJvcGVydHknKTtcbnZhciBtYWtlQnVpbHRJbiA9IHJlcXVpcmUoJy4uL2ludGVybmFscy9tYWtlLWJ1aWx0LWluJyk7XG52YXIgZGVmaW5lR2xvYmFsUHJvcGVydHkgPSByZXF1aXJlKCcuLi9pbnRlcm5hbHMvZGVmaW5lLWdsb2JhbC1wcm9wZXJ0eScpO1xuXG5tb2R1bGUuZXhwb3J0cyA9IGZ1bmN0aW9uIChPLCBrZXksIHZhbHVlLCBvcHRpb25zKSB7XG4gIGlmICghb3B0aW9ucykgb3B0aW9ucyA9IHt9O1xuICB2YXIgc2ltcGxlID0gb3B0aW9ucy5lbnVtZXJhYmxlO1xuICB2YXIgbmFtZSA9IG9wdGlvbnMubmFtZSAhPT0gdW5kZWZpbmVkID8gb3B0aW9ucy5uYW1lIDoga2V5O1xuICBpZiAoaXNDYWxsYWJsZSh2YWx1ZSkpIG1ha2VCdWlsdEluKHZhbHVlLCBuYW1lLCBvcHRpb25zKTtcbiAgaWYgKG9wdGlvbnMuZ2xvYmFsKSB7XG4gICAgaWYgKHNpbXBsZSkgT1trZXldID0gdmFsdWU7XG4gICAgZWxzZSBkZWZpbmVHbG9iYWxQcm9wZXJ0eShrZXksIHZhbHVlKTtcbiAgfSBlbHNlIHtcbiAgICB0cnkge1xuICAgICAgaWYgKCFvcHRpb25zLnVuc2FmZSkgZGVsZXRlIE9ba2V5XTtcbiAgICAgIGVsc2UgaWYgKE9ba2V5XSkgc2ltcGxlID0gdHJ1ZTtcbiAgICB9IGNhdGNoIChlcnJvcikgeyAvKiBlbXB0eSAqLyB9XG4gICAgaWYgKHNpbXBsZSkgT1trZXldID0gdmFsdWU7XG4gICAgZWxzZSBkZWZpbmVQcm9wZXJ0eU1vZHVsZS5mKE8sIGtleSwge1xuICAgICAgdmFsdWU6IHZhbHVlLFxuICAgICAgZW51bWVyYWJsZTogZmFsc2UsXG4gICAgICBjb25maWd1cmFibGU6ICFvcHRpb25zLm5vbkNvbmZpZ3VyYWJsZSxcbiAgICAgIHdyaXRhYmxlOiAhb3B0aW9ucy5ub25Xcml0YWJsZVxuICAgIH0pO1xuICB9IHJldHVybiBPO1xufTtcbiIsIid1c2Ugc3RyaWN0JztcbnZhciBkZWZpbmVCdWlsdEluID0gcmVxdWlyZSgnLi4vaW50ZXJuYWxzL2RlZmluZS1idWlsdC1pbicpO1xuXG5tb2R1bGUuZXhwb3J0cyA9IGZ1bmN0aW9uICh0YXJnZXQsIHNyYywgb3B0aW9ucykge1xuICBmb3IgKHZhciBrZXkgaW4gc3JjKSBkZWZpbmVCdWlsdEluKHRhcmdldCwga2V5LCBzcmNba2V5XSwgb3B0aW9ucyk7XG4gIHJldHVybiB0YXJnZXQ7XG59O1xuIiwiJ3VzZSBzdHJpY3QnO1xudmFyIGdsb2JhbCA9IHJlcXVpcmUoJy4uL2ludGVybmFscy9nbG9iYWwnKTtcblxuLy8gZXNsaW50LWRpc2FibGUtbmV4dC1saW5lIGVzL25vLW9iamVjdC1kZWZpbmVwcm9wZXJ0eSAtLSBzYWZlXG52YXIgZGVmaW5lUHJvcGVydHkgPSBPYmplY3QuZGVmaW5lUHJvcGVydHk7XG5cbm1vZHVsZS5leHBvcnRzID0gZnVuY3Rpb24gKGtleSwgdmFsdWUpIHtcbiAgdHJ5IHtcbiAgICBkZWZpbmVQcm9wZXJ0eShnbG9iYWwsIGtleSwgeyB2YWx1ZTogdmFsdWUsIGNvbmZpZ3VyYWJsZTogdHJ1ZSwgd3JpdGFibGU6IHRydWUgfSk7XG4gIH0gY2F0Y2ggKGVycm9yKSB7XG4gICAgZ2xvYmFsW2tleV0gPSB2YWx1ZTtcbiAgfSByZXR1cm4gdmFsdWU7XG59O1xuIiwiJ3VzZSBzdHJpY3QnO1xudmFyIGZhaWxzID0gcmVxdWlyZSgnLi4vaW50ZXJuYWxzL2ZhaWxzJyk7XG5cbi8vIERldGVjdCBJRTgncyBpbmNvbXBsZXRlIGRlZmluZVByb3BlcnR5IGltcGxlbWVudGF0aW9uXG5tb2R1bGUuZXhwb3J0cyA9ICFmYWlscyhmdW5jdGlvbiAoKSB7XG4gIC8vIGVzbGludC1kaXNhYmxlLW5leHQtbGluZSBlcy9uby1vYmplY3QtZGVmaW5lcHJvcGVydHkgLS0gcmVxdWlyZWQgZm9yIHRlc3RpbmdcbiAgcmV0dXJuIE9iamVjdC5kZWZpbmVQcm9wZXJ0eSh7fSwgMSwgeyBnZXQ6IGZ1bmN0aW9uICgpIHsgcmV0dXJuIDc7IH0gfSlbMV0gIT09IDc7XG59KTtcbiIsIid1c2Ugc3RyaWN0JztcbnZhciBnbG9iYWwgPSByZXF1aXJlKCcuLi9pbnRlcm5hbHMvZ2xvYmFsJyk7XG52YXIgaXNPYmplY3QgPSByZXF1aXJlKCcuLi9pbnRlcm5hbHMvaXMtb2JqZWN0Jyk7XG5cbnZhciBkb2N1bWVudCA9IGdsb2JhbC5kb2N1bWVudDtcbi8vIHR5cGVvZiBkb2N1bWVudC5jcmVhdGVFbGVtZW50IGlzICdvYmplY3QnIGluIG9sZCBJRVxudmFyIEVYSVNUUyA9IGlzT2JqZWN0KGRvY3VtZW50KSAmJiBpc09iamVjdChkb2N1bWVudC5jcmVhdGVFbGVtZW50KTtcblxubW9kdWxlLmV4cG9ydHMgPSBmdW5jdGlvbiAoaXQpIHtcbiAgcmV0dXJuIEVYSVNUUyA/IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoaXQpIDoge307XG59O1xuIiwiJ3VzZSBzdHJpY3QnO1xubW9kdWxlLmV4cG9ydHMgPSB0eXBlb2YgbmF2aWdhdG9yICE9ICd1bmRlZmluZWQnICYmIFN0cmluZyhuYXZpZ2F0b3IudXNlckFnZW50KSB8fCAnJztcbiIsIid1c2Ugc3RyaWN0JztcbnZhciBnbG9iYWwgPSByZXF1aXJlKCcuLi9pbnRlcm5hbHMvZ2xvYmFsJyk7XG52YXIgdXNlckFnZW50ID0gcmVxdWlyZSgnLi4vaW50ZXJuYWxzL2VuZ2luZS11c2VyLWFnZW50Jyk7XG5cbnZhciBwcm9jZXNzID0gZ2xvYmFsLnByb2Nlc3M7XG52YXIgRGVubyA9IGdsb2JhbC5EZW5vO1xudmFyIHZlcnNpb25zID0gcHJvY2VzcyAmJiBwcm9jZXNzLnZlcnNpb25zIHx8IERlbm8gJiYgRGVuby52ZXJzaW9uO1xudmFyIHY4ID0gdmVyc2lvbnMgJiYgdmVyc2lvbnMudjg7XG52YXIgbWF0Y2gsIHZlcnNpb247XG5cbmlmICh2OCkge1xuICBtYXRjaCA9IHY4LnNwbGl0KCcuJyk7XG4gIC8vIGluIG9sZCBDaHJvbWUsIHZlcnNpb25zIG9mIFY4IGlzbid0IFY4ID0gQ2hyb21lIC8gMTBcbiAgLy8gYnV0IHRoZWlyIGNvcnJlY3QgdmVyc2lvbnMgYXJlIG5vdCBpbnRlcmVzdGluZyBmb3IgdXNcbiAgdmVyc2lvbiA9IG1hdGNoWzBdID4gMCAmJiBtYXRjaFswXSA8IDQgPyAxIDogKyhtYXRjaFswXSArIG1hdGNoWzFdKTtcbn1cblxuLy8gQnJvd3NlckZTIE5vZGVKUyBgcHJvY2Vzc2AgcG9seWZpbGwgaW5jb3JyZWN0bHkgc2V0IGAudjhgIHRvIGAwLjBgXG4vLyBzbyBjaGVjayBgdXNlckFnZW50YCBldmVuIGlmIGAudjhgIGV4aXN0cywgYnV0IDBcbmlmICghdmVyc2lvbiAmJiB1c2VyQWdlbnQpIHtcbiAgbWF0Y2ggPSB1c2VyQWdlbnQubWF0Y2goL0VkZ2VcXC8oXFxkKykvKTtcbiAgaWYgKCFtYXRjaCB8fCBtYXRjaFsxXSA+PSA3NCkge1xuICAgIG1hdGNoID0gdXNlckFnZW50Lm1hdGNoKC9DaHJvbWVcXC8oXFxkKykvKTtcbiAgICBpZiAobWF0Y2gpIHZlcnNpb24gPSArbWF0Y2hbMV07XG4gIH1cbn1cblxubW9kdWxlLmV4cG9ydHMgPSB2ZXJzaW9uO1xuIiwiJ3VzZSBzdHJpY3QnO1xuLy8gSUU4LSBkb24ndCBlbnVtIGJ1ZyBrZXlzXG5tb2R1bGUuZXhwb3J0cyA9IFtcbiAgJ2NvbnN0cnVjdG9yJyxcbiAgJ2hhc093blByb3BlcnR5JyxcbiAgJ2lzUHJvdG90eXBlT2YnLFxuICAncHJvcGVydHlJc0VudW1lcmFibGUnLFxuICAndG9Mb2NhbGVTdHJpbmcnLFxuICAndG9TdHJpbmcnLFxuICAndmFsdWVPZidcbl07XG4iLCIndXNlIHN0cmljdCc7XG52YXIgZ2xvYmFsID0gcmVxdWlyZSgnLi4vaW50ZXJuYWxzL2dsb2JhbCcpO1xudmFyIGdldE93blByb3BlcnR5RGVzY3JpcHRvciA9IHJlcXVpcmUoJy4uL2ludGVybmFscy9vYmplY3QtZ2V0LW93bi1wcm9wZXJ0eS1kZXNjcmlwdG9yJykuZjtcbnZhciBjcmVhdGVOb25FbnVtZXJhYmxlUHJvcGVydHkgPSByZXF1aXJlKCcuLi9pbnRlcm5hbHMvY3JlYXRlLW5vbi1lbnVtZXJhYmxlLXByb3BlcnR5Jyk7XG52YXIgZGVmaW5lQnVpbHRJbiA9IHJlcXVpcmUoJy4uL2ludGVybmFscy9kZWZpbmUtYnVpbHQtaW4nKTtcbnZhciBkZWZpbmVHbG9iYWxQcm9wZXJ0eSA9IHJlcXVpcmUoJy4uL2ludGVybmFscy9kZWZpbmUtZ2xvYmFsLXByb3BlcnR5Jyk7XG52YXIgY29weUNvbnN0cnVjdG9yUHJvcGVydGllcyA9IHJlcXVpcmUoJy4uL2ludGVybmFscy9jb3B5LWNvbnN0cnVjdG9yLXByb3BlcnRpZXMnKTtcbnZhciBpc0ZvcmNlZCA9IHJlcXVpcmUoJy4uL2ludGVybmFscy9pcy1mb3JjZWQnKTtcblxuLypcbiAgb3B0aW9ucy50YXJnZXQgICAgICAgICAtIG5hbWUgb2YgdGhlIHRhcmdldCBvYmplY3RcbiAgb3B0aW9ucy5nbG9iYWwgICAgICAgICAtIHRhcmdldCBpcyB0aGUgZ2xvYmFsIG9iamVjdFxuICBvcHRpb25zLnN0YXQgICAgICAgICAgIC0gZXhwb3J0IGFzIHN0YXRpYyBtZXRob2RzIG9mIHRhcmdldFxuICBvcHRpb25zLnByb3RvICAgICAgICAgIC0gZXhwb3J0IGFzIHByb3RvdHlwZSBtZXRob2RzIG9mIHRhcmdldFxuICBvcHRpb25zLnJlYWwgICAgICAgICAgIC0gcmVhbCBwcm90b3R5cGUgbWV0aG9kIGZvciB0aGUgYHB1cmVgIHZlcnNpb25cbiAgb3B0aW9ucy5mb3JjZWQgICAgICAgICAtIGV4cG9ydCBldmVuIGlmIHRoZSBuYXRpdmUgZmVhdHVyZSBpcyBhdmFpbGFibGVcbiAgb3B0aW9ucy5iaW5kICAgICAgICAgICAtIGJpbmQgbWV0aG9kcyB0byB0aGUgdGFyZ2V0LCByZXF1aXJlZCBmb3IgdGhlIGBwdXJlYCB2ZXJzaW9uXG4gIG9wdGlvbnMud3JhcCAgICAgICAgICAgLSB3cmFwIGNvbnN0cnVjdG9ycyB0byBwcmV2ZW50aW5nIGdsb2JhbCBwb2xsdXRpb24sIHJlcXVpcmVkIGZvciB0aGUgYHB1cmVgIHZlcnNpb25cbiAgb3B0aW9ucy51bnNhZmUgICAgICAgICAtIHVzZSB0aGUgc2ltcGxlIGFzc2lnbm1lbnQgb2YgcHJvcGVydHkgaW5zdGVhZCBvZiBkZWxldGUgKyBkZWZpbmVQcm9wZXJ0eVxuICBvcHRpb25zLnNoYW0gICAgICAgICAgIC0gYWRkIGEgZmxhZyB0byBub3QgY29tcGxldGVseSBmdWxsIHBvbHlmaWxsc1xuICBvcHRpb25zLmVudW1lcmFibGUgICAgIC0gZXhwb3J0IGFzIGVudW1lcmFibGUgcHJvcGVydHlcbiAgb3B0aW9ucy5kb250Q2FsbEdldFNldCAtIHByZXZlbnQgY2FsbGluZyBhIGdldHRlciBvbiB0YXJnZXRcbiAgb3B0aW9ucy5uYW1lICAgICAgICAgICAtIHRoZSAubmFtZSBvZiB0aGUgZnVuY3Rpb24gaWYgaXQgZG9lcyBub3QgbWF0Y2ggdGhlIGtleVxuKi9cbm1vZHVsZS5leHBvcnRzID0gZnVuY3Rpb24gKG9wdGlvbnMsIHNvdXJjZSkge1xuICB2YXIgVEFSR0VUID0gb3B0aW9ucy50YXJnZXQ7XG4gIHZhciBHTE9CQUwgPSBvcHRpb25zLmdsb2JhbDtcbiAgdmFyIFNUQVRJQyA9IG9wdGlvbnMuc3RhdDtcbiAgdmFyIEZPUkNFRCwgdGFyZ2V0LCBrZXksIHRhcmdldFByb3BlcnR5LCBzb3VyY2VQcm9wZXJ0eSwgZGVzY3JpcHRvcjtcbiAgaWYgKEdMT0JBTCkge1xuICAgIHRhcmdldCA9IGdsb2JhbDtcbiAgfSBlbHNlIGlmIChTVEFUSUMpIHtcbiAgICB0YXJnZXQgPSBnbG9iYWxbVEFSR0VUXSB8fCBkZWZpbmVHbG9iYWxQcm9wZXJ0eShUQVJHRVQsIHt9KTtcbiAgfSBlbHNlIHtcbiAgICB0YXJnZXQgPSBnbG9iYWxbVEFSR0VUXSAmJiBnbG9iYWxbVEFSR0VUXS5wcm90b3R5cGU7XG4gIH1cbiAgaWYgKHRhcmdldCkgZm9yIChrZXkgaW4gc291cmNlKSB7XG4gICAgc291cmNlUHJvcGVydHkgPSBzb3VyY2Vba2V5XTtcbiAgICBpZiAob3B0aW9ucy5kb250Q2FsbEdldFNldCkge1xuICAgICAgZGVzY3JpcHRvciA9IGdldE93blByb3BlcnR5RGVzY3JpcHRvcih0YXJnZXQsIGtleSk7XG4gICAgICB0YXJnZXRQcm9wZXJ0eSA9IGRlc2NyaXB0b3IgJiYgZGVzY3JpcHRvci52YWx1ZTtcbiAgICB9IGVsc2UgdGFyZ2V0UHJvcGVydHkgPSB0YXJnZXRba2V5XTtcbiAgICBGT1JDRUQgPSBpc0ZvcmNlZChHTE9CQUwgPyBrZXkgOiBUQVJHRVQgKyAoU1RBVElDID8gJy4nIDogJyMnKSArIGtleSwgb3B0aW9ucy5mb3JjZWQpO1xuICAgIC8vIGNvbnRhaW5lZCBpbiB0YXJnZXRcbiAgICBpZiAoIUZPUkNFRCAmJiB0YXJnZXRQcm9wZXJ0eSAhPT0gdW5kZWZpbmVkKSB7XG4gICAgICBpZiAodHlwZW9mIHNvdXJjZVByb3BlcnR5ID09IHR5cGVvZiB0YXJnZXRQcm9wZXJ0eSkgY29udGludWU7XG4gICAgICBjb3B5Q29uc3RydWN0b3JQcm9wZXJ0aWVzKHNvdXJjZVByb3BlcnR5LCB0YXJnZXRQcm9wZXJ0eSk7XG4gICAgfVxuICAgIC8vIGFkZCBhIGZsYWcgdG8gbm90IGNvbXBsZXRlbHkgZnVsbCBwb2x5ZmlsbHNcbiAgICBpZiAob3B0aW9ucy5zaGFtIHx8ICh0YXJnZXRQcm9wZXJ0eSAmJiB0YXJnZXRQcm9wZXJ0eS5zaGFtKSkge1xuICAgICAgY3JlYXRlTm9uRW51bWVyYWJsZVByb3BlcnR5KHNvdXJjZVByb3BlcnR5LCAnc2hhbScsIHRydWUpO1xuICAgIH1cbiAgICBkZWZpbmVCdWlsdEluKHRhcmdldCwga2V5LCBzb3VyY2VQcm9wZXJ0eSwgb3B0aW9ucyk7XG4gIH1cbn07XG4iLCIndXNlIHN0cmljdCc7XG5tb2R1bGUuZXhwb3J0cyA9IGZ1bmN0aW9uIChleGVjKSB7XG4gIHRyeSB7XG4gICAgcmV0dXJuICEhZXhlYygpO1xuICB9IGNhdGNoIChlcnJvcikge1xuICAgIHJldHVybiB0cnVlO1xuICB9XG59O1xuIiwiJ3VzZSBzdHJpY3QnO1xuLy8gVE9ETzogUmVtb3ZlIGZyb20gYGNvcmUtanNANGAgc2luY2UgaXQncyBtb3ZlZCB0byBlbnRyeSBwb2ludHNcbnJlcXVpcmUoJy4uL21vZHVsZXMvZXMucmVnZXhwLmV4ZWMnKTtcbnZhciBjYWxsID0gcmVxdWlyZSgnLi4vaW50ZXJuYWxzL2Z1bmN0aW9uLWNhbGwnKTtcbnZhciBkZWZpbmVCdWlsdEluID0gcmVxdWlyZSgnLi4vaW50ZXJuYWxzL2RlZmluZS1idWlsdC1pbicpO1xudmFyIHJlZ2V4cEV4ZWMgPSByZXF1aXJlKCcuLi9pbnRlcm5hbHMvcmVnZXhwLWV4ZWMnKTtcbnZhciBmYWlscyA9IHJlcXVpcmUoJy4uL2ludGVybmFscy9mYWlscycpO1xudmFyIHdlbGxLbm93blN5bWJvbCA9IHJlcXVpcmUoJy4uL2ludGVybmFscy93ZWxsLWtub3duLXN5bWJvbCcpO1xudmFyIGNyZWF0ZU5vbkVudW1lcmFibGVQcm9wZXJ0eSA9IHJlcXVpcmUoJy4uL2ludGVybmFscy9jcmVhdGUtbm9uLWVudW1lcmFibGUtcHJvcGVydHknKTtcblxudmFyIFNQRUNJRVMgPSB3ZWxsS25vd25TeW1ib2woJ3NwZWNpZXMnKTtcbnZhciBSZWdFeHBQcm90b3R5cGUgPSBSZWdFeHAucHJvdG90eXBlO1xuXG5tb2R1bGUuZXhwb3J0cyA9IGZ1bmN0aW9uIChLRVksIGV4ZWMsIEZPUkNFRCwgU0hBTSkge1xuICB2YXIgU1lNQk9MID0gd2VsbEtub3duU3ltYm9sKEtFWSk7XG5cbiAgdmFyIERFTEVHQVRFU19UT19TWU1CT0wgPSAhZmFpbHMoZnVuY3Rpb24gKCkge1xuICAgIC8vIFN0cmluZyBtZXRob2RzIGNhbGwgc3ltYm9sLW5hbWVkIFJlZ0V4cCBtZXRob2RzXG4gICAgdmFyIE8gPSB7fTtcbiAgICBPW1NZTUJPTF0gPSBmdW5jdGlvbiAoKSB7IHJldHVybiA3OyB9O1xuICAgIHJldHVybiAnJ1tLRVldKE8pICE9PSA3O1xuICB9KTtcblxuICB2YXIgREVMRUdBVEVTX1RPX0VYRUMgPSBERUxFR0FURVNfVE9fU1lNQk9MICYmICFmYWlscyhmdW5jdGlvbiAoKSB7XG4gICAgLy8gU3ltYm9sLW5hbWVkIFJlZ0V4cCBtZXRob2RzIGNhbGwgLmV4ZWNcbiAgICB2YXIgZXhlY0NhbGxlZCA9IGZhbHNlO1xuICAgIHZhciByZSA9IC9hLztcblxuICAgIGlmIChLRVkgPT09ICdzcGxpdCcpIHtcbiAgICAgIC8vIFdlIGNhbid0IHVzZSByZWFsIHJlZ2V4IGhlcmUgc2luY2UgaXQgY2F1c2VzIGRlb3B0aW1pemF0aW9uXG4gICAgICAvLyBhbmQgc2VyaW91cyBwZXJmb3JtYW5jZSBkZWdyYWRhdGlvbiBpbiBWOFxuICAgICAgLy8gaHR0cHM6Ly9naXRodWIuY29tL3psb2lyb2NrL2NvcmUtanMvaXNzdWVzLzMwNlxuICAgICAgcmUgPSB7fTtcbiAgICAgIC8vIFJlZ0V4cFtAQHNwbGl0XSBkb2Vzbid0IGNhbGwgdGhlIHJlZ2V4J3MgZXhlYyBtZXRob2QsIGJ1dCBmaXJzdCBjcmVhdGVzXG4gICAgICAvLyBhIG5ldyBvbmUuIFdlIG5lZWQgdG8gcmV0dXJuIHRoZSBwYXRjaGVkIHJlZ2V4IHdoZW4gY3JlYXRpbmcgdGhlIG5ldyBvbmUuXG4gICAgICByZS5jb25zdHJ1Y3RvciA9IHt9O1xuICAgICAgcmUuY29uc3RydWN0b3JbU1BFQ0lFU10gPSBmdW5jdGlvbiAoKSB7IHJldHVybiByZTsgfTtcbiAgICAgIHJlLmZsYWdzID0gJyc7XG4gICAgICByZVtTWU1CT0xdID0gLy4vW1NZTUJPTF07XG4gICAgfVxuXG4gICAgcmUuZXhlYyA9IGZ1bmN0aW9uICgpIHtcbiAgICAgIGV4ZWNDYWxsZWQgPSB0cnVlO1xuICAgICAgcmV0dXJuIG51bGw7XG4gICAgfTtcblxuICAgIHJlW1NZTUJPTF0oJycpO1xuICAgIHJldHVybiAhZXhlY0NhbGxlZDtcbiAgfSk7XG5cbiAgaWYgKFxuICAgICFERUxFR0FURVNfVE9fU1lNQk9MIHx8XG4gICAgIURFTEVHQVRFU19UT19FWEVDIHx8XG4gICAgRk9SQ0VEXG4gICkge1xuICAgIHZhciBuYXRpdmVSZWdFeHBNZXRob2QgPSAvLi9bU1lNQk9MXTtcbiAgICB2YXIgbWV0aG9kcyA9IGV4ZWMoU1lNQk9MLCAnJ1tLRVldLCBmdW5jdGlvbiAobmF0aXZlTWV0aG9kLCByZWdleHAsIHN0ciwgYXJnMiwgZm9yY2VTdHJpbmdNZXRob2QpIHtcbiAgICAgIHZhciAkZXhlYyA9IHJlZ2V4cC5leGVjO1xuICAgICAgaWYgKCRleGVjID09PSByZWdleHBFeGVjIHx8ICRleGVjID09PSBSZWdFeHBQcm90b3R5cGUuZXhlYykge1xuICAgICAgICBpZiAoREVMRUdBVEVTX1RPX1NZTUJPTCAmJiAhZm9yY2VTdHJpbmdNZXRob2QpIHtcbiAgICAgICAgICAvLyBUaGUgbmF0aXZlIFN0cmluZyBtZXRob2QgYWxyZWFkeSBkZWxlZ2F0ZXMgdG8gQEBtZXRob2QgKHRoaXNcbiAgICAgICAgICAvLyBwb2x5ZmlsbGVkIGZ1bmN0aW9uKSwgbGVhc2luZyB0byBpbmZpbml0ZSByZWN1cnNpb24uXG4gICAgICAgICAgLy8gV2UgYXZvaWQgaXQgYnkgZGlyZWN0bHkgY2FsbGluZyB0aGUgbmF0aXZlIEBAbWV0aG9kIG1ldGhvZC5cbiAgICAgICAgICByZXR1cm4geyBkb25lOiB0cnVlLCB2YWx1ZTogY2FsbChuYXRpdmVSZWdFeHBNZXRob2QsIHJlZ2V4cCwgc3RyLCBhcmcyKSB9O1xuICAgICAgICB9XG4gICAgICAgIHJldHVybiB7IGRvbmU6IHRydWUsIHZhbHVlOiBjYWxsKG5hdGl2ZU1ldGhvZCwgc3RyLCByZWdleHAsIGFyZzIpIH07XG4gICAgICB9XG4gICAgICByZXR1cm4geyBkb25lOiBmYWxzZSB9O1xuICAgIH0pO1xuXG4gICAgZGVmaW5lQnVpbHRJbihTdHJpbmcucHJvdG90eXBlLCBLRVksIG1ldGhvZHNbMF0pO1xuICAgIGRlZmluZUJ1aWx0SW4oUmVnRXhwUHJvdG90eXBlLCBTWU1CT0wsIG1ldGhvZHNbMV0pO1xuICB9XG5cbiAgaWYgKFNIQU0pIGNyZWF0ZU5vbkVudW1lcmFibGVQcm9wZXJ0eShSZWdFeHBQcm90b3R5cGVbU1lNQk9MXSwgJ3NoYW0nLCB0cnVlKTtcbn07XG4iLCIndXNlIHN0cmljdCc7XG52YXIgTkFUSVZFX0JJTkQgPSByZXF1aXJlKCcuLi9pbnRlcm5hbHMvZnVuY3Rpb24tYmluZC1uYXRpdmUnKTtcblxudmFyIEZ1bmN0aW9uUHJvdG90eXBlID0gRnVuY3Rpb24ucHJvdG90eXBlO1xudmFyIGFwcGx5ID0gRnVuY3Rpb25Qcm90b3R5cGUuYXBwbHk7XG52YXIgY2FsbCA9IEZ1bmN0aW9uUHJvdG90eXBlLmNhbGw7XG5cbi8vIGVzbGludC1kaXNhYmxlLW5leHQtbGluZSBlcy9uby1yZWZsZWN0IC0tIHNhZmVcbm1vZHVsZS5leHBvcnRzID0gdHlwZW9mIFJlZmxlY3QgPT0gJ29iamVjdCcgJiYgUmVmbGVjdC5hcHBseSB8fCAoTkFUSVZFX0JJTkQgPyBjYWxsLmJpbmQoYXBwbHkpIDogZnVuY3Rpb24gKCkge1xuICByZXR1cm4gY2FsbC5hcHBseShhcHBseSwgYXJndW1lbnRzKTtcbn0pO1xuIiwiJ3VzZSBzdHJpY3QnO1xudmFyIHVuY3VycnlUaGlzID0gcmVxdWlyZSgnLi4vaW50ZXJuYWxzL2Z1bmN0aW9uLXVuY3VycnktdGhpcy1jbGF1c2UnKTtcbnZhciBhQ2FsbGFibGUgPSByZXF1aXJlKCcuLi9pbnRlcm5hbHMvYS1jYWxsYWJsZScpO1xudmFyIE5BVElWRV9CSU5EID0gcmVxdWlyZSgnLi4vaW50ZXJuYWxzL2Z1bmN0aW9uLWJpbmQtbmF0aXZlJyk7XG5cbnZhciBiaW5kID0gdW5jdXJyeVRoaXModW5jdXJyeVRoaXMuYmluZCk7XG5cbi8vIG9wdGlvbmFsIC8gc2ltcGxlIGNvbnRleHQgYmluZGluZ1xubW9kdWxlLmV4cG9ydHMgPSBmdW5jdGlvbiAoZm4sIHRoYXQpIHtcbiAgYUNhbGxhYmxlKGZuKTtcbiAgcmV0dXJuIHRoYXQgPT09IHVuZGVmaW5lZCA/IGZuIDogTkFUSVZFX0JJTkQgPyBiaW5kKGZuLCB0aGF0KSA6IGZ1bmN0aW9uICgvKiAuLi5hcmdzICovKSB7XG4gICAgcmV0dXJuIGZuLmFwcGx5KHRoYXQsIGFyZ3VtZW50cyk7XG4gIH07XG59O1xuIiwiJ3VzZSBzdHJpY3QnO1xudmFyIGZhaWxzID0gcmVxdWlyZSgnLi4vaW50ZXJuYWxzL2ZhaWxzJyk7XG5cbm1vZHVsZS5leHBvcnRzID0gIWZhaWxzKGZ1bmN0aW9uICgpIHtcbiAgLy8gZXNsaW50LWRpc2FibGUtbmV4dC1saW5lIGVzL25vLWZ1bmN0aW9uLXByb3RvdHlwZS1iaW5kIC0tIHNhZmVcbiAgdmFyIHRlc3QgPSAoZnVuY3Rpb24gKCkgeyAvKiBlbXB0eSAqLyB9KS5iaW5kKCk7XG4gIC8vIGVzbGludC1kaXNhYmxlLW5leHQtbGluZSBuby1wcm90b3R5cGUtYnVpbHRpbnMgLS0gc2FmZVxuICByZXR1cm4gdHlwZW9mIHRlc3QgIT0gJ2Z1bmN0aW9uJyB8fCB0ZXN0Lmhhc093blByb3BlcnR5KCdwcm90b3R5cGUnKTtcbn0pO1xuIiwiJ3VzZSBzdHJpY3QnO1xudmFyIE5BVElWRV9CSU5EID0gcmVxdWlyZSgnLi4vaW50ZXJuYWxzL2Z1bmN0aW9uLWJpbmQtbmF0aXZlJyk7XG5cbnZhciBjYWxsID0gRnVuY3Rpb24ucHJvdG90eXBlLmNhbGw7XG5cbm1vZHVsZS5leHBvcnRzID0gTkFUSVZFX0JJTkQgPyBjYWxsLmJpbmQoY2FsbCkgOiBmdW5jdGlvbiAoKSB7XG4gIHJldHVybiBjYWxsLmFwcGx5KGNhbGwsIGFyZ3VtZW50cyk7XG59O1xuIiwiJ3VzZSBzdHJpY3QnO1xudmFyIERFU0NSSVBUT1JTID0gcmVxdWlyZSgnLi4vaW50ZXJuYWxzL2Rlc2NyaXB0b3JzJyk7XG52YXIgaGFzT3duID0gcmVxdWlyZSgnLi4vaW50ZXJuYWxzL2hhcy1vd24tcHJvcGVydHknKTtcblxudmFyIEZ1bmN0aW9uUHJvdG90eXBlID0gRnVuY3Rpb24ucHJvdG90eXBlO1xuLy8gZXNsaW50LWRpc2FibGUtbmV4dC1saW5lIGVzL25vLW9iamVjdC1nZXRvd25wcm9wZXJ0eWRlc2NyaXB0b3IgLS0gc2FmZVxudmFyIGdldERlc2NyaXB0b3IgPSBERVNDUklQVE9SUyAmJiBPYmplY3QuZ2V0T3duUHJvcGVydHlEZXNjcmlwdG9yO1xuXG52YXIgRVhJU1RTID0gaGFzT3duKEZ1bmN0aW9uUHJvdG90eXBlLCAnbmFtZScpO1xuLy8gYWRkaXRpb25hbCBwcm90ZWN0aW9uIGZyb20gbWluaWZpZWQgLyBtYW5nbGVkIC8gZHJvcHBlZCBmdW5jdGlvbiBuYW1lc1xudmFyIFBST1BFUiA9IEVYSVNUUyAmJiAoZnVuY3Rpb24gc29tZXRoaW5nKCkgeyAvKiBlbXB0eSAqLyB9KS5uYW1lID09PSAnc29tZXRoaW5nJztcbnZhciBDT05GSUdVUkFCTEUgPSBFWElTVFMgJiYgKCFERVNDUklQVE9SUyB8fCAoREVTQ1JJUFRPUlMgJiYgZ2V0RGVzY3JpcHRvcihGdW5jdGlvblByb3RvdHlwZSwgJ25hbWUnKS5jb25maWd1cmFibGUpKTtcblxubW9kdWxlLmV4cG9ydHMgPSB7XG4gIEVYSVNUUzogRVhJU1RTLFxuICBQUk9QRVI6IFBST1BFUixcbiAgQ09ORklHVVJBQkxFOiBDT05GSUdVUkFCTEVcbn07XG4iLCIndXNlIHN0cmljdCc7XG52YXIgdW5jdXJyeVRoaXMgPSByZXF1aXJlKCcuLi9pbnRlcm5hbHMvZnVuY3Rpb24tdW5jdXJyeS10aGlzJyk7XG52YXIgYUNhbGxhYmxlID0gcmVxdWlyZSgnLi4vaW50ZXJuYWxzL2EtY2FsbGFibGUnKTtcblxubW9kdWxlLmV4cG9ydHMgPSBmdW5jdGlvbiAob2JqZWN0LCBrZXksIG1ldGhvZCkge1xuICB0cnkge1xuICAgIC8vIGVzbGludC1kaXNhYmxlLW5leHQtbGluZSBlcy9uby1vYmplY3QtZ2V0b3ducHJvcGVydHlkZXNjcmlwdG9yIC0tIHNhZmVcbiAgICByZXR1cm4gdW5jdXJyeVRoaXMoYUNhbGxhYmxlKE9iamVjdC5nZXRPd25Qcm9wZXJ0eURlc2NyaXB0b3Iob2JqZWN0LCBrZXkpW21ldGhvZF0pKTtcbiAgfSBjYXRjaCAoZXJyb3IpIHsgLyogZW1wdHkgKi8gfVxufTtcbiIsIid1c2Ugc3RyaWN0JztcbnZhciBjbGFzc29mUmF3ID0gcmVxdWlyZSgnLi4vaW50ZXJuYWxzL2NsYXNzb2YtcmF3Jyk7XG52YXIgdW5jdXJyeVRoaXMgPSByZXF1aXJlKCcuLi9pbnRlcm5hbHMvZnVuY3Rpb24tdW5jdXJyeS10aGlzJyk7XG5cbm1vZHVsZS5leHBvcnRzID0gZnVuY3Rpb24gKGZuKSB7XG4gIC8vIE5hc2hvcm4gYnVnOlxuICAvLyAgIGh0dHBzOi8vZ2l0aHViLmNvbS96bG9pcm9jay9jb3JlLWpzL2lzc3Vlcy8xMTI4XG4gIC8vICAgaHR0cHM6Ly9naXRodWIuY29tL3psb2lyb2NrL2NvcmUtanMvaXNzdWVzLzExMzBcbiAgaWYgKGNsYXNzb2ZSYXcoZm4pID09PSAnRnVuY3Rpb24nKSByZXR1cm4gdW5jdXJyeVRoaXMoZm4pO1xufTtcbiIsIid1c2Ugc3RyaWN0JztcbnZhciBOQVRJVkVfQklORCA9IHJlcXVpcmUoJy4uL2ludGVybmFscy9mdW5jdGlvbi1iaW5kLW5hdGl2ZScpO1xuXG52YXIgRnVuY3Rpb25Qcm90b3R5cGUgPSBGdW5jdGlvbi5wcm90b3R5cGU7XG52YXIgY2FsbCA9IEZ1bmN0aW9uUHJvdG90eXBlLmNhbGw7XG52YXIgdW5jdXJyeVRoaXNXaXRoQmluZCA9IE5BVElWRV9CSU5EICYmIEZ1bmN0aW9uUHJvdG90eXBlLmJpbmQuYmluZChjYWxsLCBjYWxsKTtcblxubW9kdWxlLmV4cG9ydHMgPSBOQVRJVkVfQklORCA/IHVuY3VycnlUaGlzV2l0aEJpbmQgOiBmdW5jdGlvbiAoZm4pIHtcbiAgcmV0dXJuIGZ1bmN0aW9uICgpIHtcbiAgICByZXR1cm4gY2FsbC5hcHBseShmbiwgYXJndW1lbnRzKTtcbiAgfTtcbn07XG4iLCIndXNlIHN0cmljdCc7XG52YXIgZ2xvYmFsID0gcmVxdWlyZSgnLi4vaW50ZXJuYWxzL2dsb2JhbCcpO1xudmFyIGlzQ2FsbGFibGUgPSByZXF1aXJlKCcuLi9pbnRlcm5hbHMvaXMtY2FsbGFibGUnKTtcblxudmFyIGFGdW5jdGlvbiA9IGZ1bmN0aW9uIChhcmd1bWVudCkge1xuICByZXR1cm4gaXNDYWxsYWJsZShhcmd1bWVudCkgPyBhcmd1bWVudCA6IHVuZGVmaW5lZDtcbn07XG5cbm1vZHVsZS5leHBvcnRzID0gZnVuY3Rpb24gKG5hbWVzcGFjZSwgbWV0aG9kKSB7XG4gIHJldHVybiBhcmd1bWVudHMubGVuZ3RoIDwgMiA/IGFGdW5jdGlvbihnbG9iYWxbbmFtZXNwYWNlXSkgOiBnbG9iYWxbbmFtZXNwYWNlXSAmJiBnbG9iYWxbbmFtZXNwYWNlXVttZXRob2RdO1xufTtcbiIsIid1c2Ugc3RyaWN0JztcbnZhciBjbGFzc29mID0gcmVxdWlyZSgnLi4vaW50ZXJuYWxzL2NsYXNzb2YnKTtcbnZhciBnZXRNZXRob2QgPSByZXF1aXJlKCcuLi9pbnRlcm5hbHMvZ2V0LW1ldGhvZCcpO1xudmFyIGlzTnVsbE9yVW5kZWZpbmVkID0gcmVxdWlyZSgnLi4vaW50ZXJuYWxzL2lzLW51bGwtb3ItdW5kZWZpbmVkJyk7XG52YXIgSXRlcmF0b3JzID0gcmVxdWlyZSgnLi4vaW50ZXJuYWxzL2l0ZXJhdG9ycycpO1xudmFyIHdlbGxLbm93blN5bWJvbCA9IHJlcXVpcmUoJy4uL2ludGVybmFscy93ZWxsLWtub3duLXN5bWJvbCcpO1xuXG52YXIgSVRFUkFUT1IgPSB3ZWxsS25vd25TeW1ib2woJ2l0ZXJhdG9yJyk7XG5cbm1vZHVsZS5leHBvcnRzID0gZnVuY3Rpb24gKGl0KSB7XG4gIGlmICghaXNOdWxsT3JVbmRlZmluZWQoaXQpKSByZXR1cm4gZ2V0TWV0aG9kKGl0LCBJVEVSQVRPUilcbiAgICB8fCBnZXRNZXRob2QoaXQsICdAQGl0ZXJhdG9yJylcbiAgICB8fCBJdGVyYXRvcnNbY2xhc3NvZihpdCldO1xufTtcbiIsIid1c2Ugc3RyaWN0JztcbnZhciBjYWxsID0gcmVxdWlyZSgnLi4vaW50ZXJuYWxzL2Z1bmN0aW9uLWNhbGwnKTtcbnZhciBhQ2FsbGFibGUgPSByZXF1aXJlKCcuLi9pbnRlcm5hbHMvYS1jYWxsYWJsZScpO1xudmFyIGFuT2JqZWN0ID0gcmVxdWlyZSgnLi4vaW50ZXJuYWxzL2FuLW9iamVjdCcpO1xudmFyIHRyeVRvU3RyaW5nID0gcmVxdWlyZSgnLi4vaW50ZXJuYWxzL3RyeS10by1zdHJpbmcnKTtcbnZhciBnZXRJdGVyYXRvck1ldGhvZCA9IHJlcXVpcmUoJy4uL2ludGVybmFscy9nZXQtaXRlcmF0b3ItbWV0aG9kJyk7XG5cbnZhciAkVHlwZUVycm9yID0gVHlwZUVycm9yO1xuXG5tb2R1bGUuZXhwb3J0cyA9IGZ1bmN0aW9uIChhcmd1bWVudCwgdXNpbmdJdGVyYXRvcikge1xuICB2YXIgaXRlcmF0b3JNZXRob2QgPSBhcmd1bWVudHMubGVuZ3RoIDwgMiA/IGdldEl0ZXJhdG9yTWV0aG9kKGFyZ3VtZW50KSA6IHVzaW5nSXRlcmF0b3I7XG4gIGlmIChhQ2FsbGFibGUoaXRlcmF0b3JNZXRob2QpKSByZXR1cm4gYW5PYmplY3QoY2FsbChpdGVyYXRvck1ldGhvZCwgYXJndW1lbnQpKTtcbiAgdGhyb3cgbmV3ICRUeXBlRXJyb3IodHJ5VG9TdHJpbmcoYXJndW1lbnQpICsgJyBpcyBub3QgaXRlcmFibGUnKTtcbn07XG4iLCIndXNlIHN0cmljdCc7XG52YXIgYUNhbGxhYmxlID0gcmVxdWlyZSgnLi4vaW50ZXJuYWxzL2EtY2FsbGFibGUnKTtcbnZhciBpc051bGxPclVuZGVmaW5lZCA9IHJlcXVpcmUoJy4uL2ludGVybmFscy9pcy1udWxsLW9yLXVuZGVmaW5lZCcpO1xuXG4vLyBgR2V0TWV0aG9kYCBhYnN0cmFjdCBvcGVyYXRpb25cbi8vIGh0dHBzOi8vdGMzOS5lcy9lY21hMjYyLyNzZWMtZ2V0bWV0aG9kXG5tb2R1bGUuZXhwb3J0cyA9IGZ1bmN0aW9uIChWLCBQKSB7XG4gIHZhciBmdW5jID0gVltQXTtcbiAgcmV0dXJuIGlzTnVsbE9yVW5kZWZpbmVkKGZ1bmMpID8gdW5kZWZpbmVkIDogYUNhbGxhYmxlKGZ1bmMpO1xufTtcbiIsIid1c2Ugc3RyaWN0JztcbnZhciB1bmN1cnJ5VGhpcyA9IHJlcXVpcmUoJy4uL2ludGVybmFscy9mdW5jdGlvbi11bmN1cnJ5LXRoaXMnKTtcbnZhciB0b09iamVjdCA9IHJlcXVpcmUoJy4uL2ludGVybmFscy90by1vYmplY3QnKTtcblxudmFyIGZsb29yID0gTWF0aC5mbG9vcjtcbnZhciBjaGFyQXQgPSB1bmN1cnJ5VGhpcygnJy5jaGFyQXQpO1xudmFyIHJlcGxhY2UgPSB1bmN1cnJ5VGhpcygnJy5yZXBsYWNlKTtcbnZhciBzdHJpbmdTbGljZSA9IHVuY3VycnlUaGlzKCcnLnNsaWNlKTtcbi8vIGVzbGludC1kaXNhYmxlLW5leHQtbGluZSByZWRvcy9uby12dWxuZXJhYmxlIC0tIHNhZmVcbnZhciBTVUJTVElUVVRJT05fU1lNQk9MUyA9IC9cXCQoWyQmJ2BdfFxcZHsxLDJ9fDxbXj5dKj4pL2c7XG52YXIgU1VCU1RJVFVUSU9OX1NZTUJPTFNfTk9fTkFNRUQgPSAvXFwkKFskJidgXXxcXGR7MSwyfSkvZztcblxuLy8gYEdldFN1YnN0aXR1dGlvbmAgYWJzdHJhY3Qgb3BlcmF0aW9uXG4vLyBodHRwczovL3RjMzkuZXMvZWNtYTI2Mi8jc2VjLWdldHN1YnN0aXR1dGlvblxubW9kdWxlLmV4cG9ydHMgPSBmdW5jdGlvbiAobWF0Y2hlZCwgc3RyLCBwb3NpdGlvbiwgY2FwdHVyZXMsIG5hbWVkQ2FwdHVyZXMsIHJlcGxhY2VtZW50KSB7XG4gIHZhciB0YWlsUG9zID0gcG9zaXRpb24gKyBtYXRjaGVkLmxlbmd0aDtcbiAgdmFyIG0gPSBjYXB0dXJlcy5sZW5ndGg7XG4gIHZhciBzeW1ib2xzID0gU1VCU1RJVFVUSU9OX1NZTUJPTFNfTk9fTkFNRUQ7XG4gIGlmIChuYW1lZENhcHR1cmVzICE9PSB1bmRlZmluZWQpIHtcbiAgICBuYW1lZENhcHR1cmVzID0gdG9PYmplY3QobmFtZWRDYXB0dXJlcyk7XG4gICAgc3ltYm9scyA9IFNVQlNUSVRVVElPTl9TWU1CT0xTO1xuICB9XG4gIHJldHVybiByZXBsYWNlKHJlcGxhY2VtZW50LCBzeW1ib2xzLCBmdW5jdGlvbiAobWF0Y2gsIGNoKSB7XG4gICAgdmFyIGNhcHR1cmU7XG4gICAgc3dpdGNoIChjaGFyQXQoY2gsIDApKSB7XG4gICAgICBjYXNlICckJzogcmV0dXJuICckJztcbiAgICAgIGNhc2UgJyYnOiByZXR1cm4gbWF0Y2hlZDtcbiAgICAgIGNhc2UgJ2AnOiByZXR1cm4gc3RyaW5nU2xpY2Uoc3RyLCAwLCBwb3NpdGlvbik7XG4gICAgICBjYXNlIFwiJ1wiOiByZXR1cm4gc3RyaW5nU2xpY2Uoc3RyLCB0YWlsUG9zKTtcbiAgICAgIGNhc2UgJzwnOlxuICAgICAgICBjYXB0dXJlID0gbmFtZWRDYXB0dXJlc1tzdHJpbmdTbGljZShjaCwgMSwgLTEpXTtcbiAgICAgICAgYnJlYWs7XG4gICAgICBkZWZhdWx0OiAvLyBcXGRcXGQ/XG4gICAgICAgIHZhciBuID0gK2NoO1xuICAgICAgICBpZiAobiA9PT0gMCkgcmV0dXJuIG1hdGNoO1xuICAgICAgICBpZiAobiA+IG0pIHtcbiAgICAgICAgICB2YXIgZiA9IGZsb29yKG4gLyAxMCk7XG4gICAgICAgICAgaWYgKGYgPT09IDApIHJldHVybiBtYXRjaDtcbiAgICAgICAgICBpZiAoZiA8PSBtKSByZXR1cm4gY2FwdHVyZXNbZiAtIDFdID09PSB1bmRlZmluZWQgPyBjaGFyQXQoY2gsIDEpIDogY2FwdHVyZXNbZiAtIDFdICsgY2hhckF0KGNoLCAxKTtcbiAgICAgICAgICByZXR1cm4gbWF0Y2g7XG4gICAgICAgIH1cbiAgICAgICAgY2FwdHVyZSA9IGNhcHR1cmVzW24gLSAxXTtcbiAgICB9XG4gICAgcmV0dXJuIGNhcHR1cmUgPT09IHVuZGVmaW5lZCA/ICcnIDogY2FwdHVyZTtcbiAgfSk7XG59O1xuIiwiJ3VzZSBzdHJpY3QnO1xudmFyIGNoZWNrID0gZnVuY3Rpb24gKGl0KSB7XG4gIHJldHVybiBpdCAmJiBpdC5NYXRoID09PSBNYXRoICYmIGl0O1xufTtcblxuLy8gaHR0cHM6Ly9naXRodWIuY29tL3psb2lyb2NrL2NvcmUtanMvaXNzdWVzLzg2I2lzc3VlY29tbWVudC0xMTU3NTkwMjhcbm1vZHVsZS5leHBvcnRzID1cbiAgLy8gZXNsaW50LWRpc2FibGUtbmV4dC1saW5lIGVzL25vLWdsb2JhbC10aGlzIC0tIHNhZmVcbiAgY2hlY2sodHlwZW9mIGdsb2JhbFRoaXMgPT0gJ29iamVjdCcgJiYgZ2xvYmFsVGhpcykgfHxcbiAgY2hlY2sodHlwZW9mIHdpbmRvdyA9PSAnb2JqZWN0JyAmJiB3aW5kb3cpIHx8XG4gIC8vIGVzbGludC1kaXNhYmxlLW5leHQtbGluZSBuby1yZXN0cmljdGVkLWdsb2JhbHMgLS0gc2FmZVxuICBjaGVjayh0eXBlb2Ygc2VsZiA9PSAnb2JqZWN0JyAmJiBzZWxmKSB8fFxuICBjaGVjayh0eXBlb2YgZ2xvYmFsID09ICdvYmplY3QnICYmIGdsb2JhbCkgfHxcbiAgY2hlY2sodHlwZW9mIHRoaXMgPT0gJ29iamVjdCcgJiYgdGhpcykgfHxcbiAgLy8gZXNsaW50LWRpc2FibGUtbmV4dC1saW5lIG5vLW5ldy1mdW5jIC0tIGZhbGxiYWNrXG4gIChmdW5jdGlvbiAoKSB7IHJldHVybiB0aGlzOyB9KSgpIHx8IEZ1bmN0aW9uKCdyZXR1cm4gdGhpcycpKCk7XG4iLCIndXNlIHN0cmljdCc7XG52YXIgdW5jdXJyeVRoaXMgPSByZXF1aXJlKCcuLi9pbnRlcm5hbHMvZnVuY3Rpb24tdW5jdXJyeS10aGlzJyk7XG52YXIgdG9PYmplY3QgPSByZXF1aXJlKCcuLi9pbnRlcm5hbHMvdG8tb2JqZWN0Jyk7XG5cbnZhciBoYXNPd25Qcm9wZXJ0eSA9IHVuY3VycnlUaGlzKHt9Lmhhc093blByb3BlcnR5KTtcblxuLy8gYEhhc093blByb3BlcnR5YCBhYnN0cmFjdCBvcGVyYXRpb25cbi8vIGh0dHBzOi8vdGMzOS5lcy9lY21hMjYyLyNzZWMtaGFzb3ducHJvcGVydHlcbi8vIGVzbGludC1kaXNhYmxlLW5leHQtbGluZSBlcy9uby1vYmplY3QtaGFzb3duIC0tIHNhZmVcbm1vZHVsZS5leHBvcnRzID0gT2JqZWN0Lmhhc093biB8fCBmdW5jdGlvbiBoYXNPd24oaXQsIGtleSkge1xuICByZXR1cm4gaGFzT3duUHJvcGVydHkodG9PYmplY3QoaXQpLCBrZXkpO1xufTtcbiIsIid1c2Ugc3RyaWN0Jztcbm1vZHVsZS5leHBvcnRzID0ge307XG4iLCIndXNlIHN0cmljdCc7XG52YXIgZ2V0QnVpbHRJbiA9IHJlcXVpcmUoJy4uL2ludGVybmFscy9nZXQtYnVpbHQtaW4nKTtcblxubW9kdWxlLmV4cG9ydHMgPSBnZXRCdWlsdEluKCdkb2N1bWVudCcsICdkb2N1bWVudEVsZW1lbnQnKTtcbiIsIid1c2Ugc3RyaWN0JztcbnZhciBERVNDUklQVE9SUyA9IHJlcXVpcmUoJy4uL2ludGVybmFscy9kZXNjcmlwdG9ycycpO1xudmFyIGZhaWxzID0gcmVxdWlyZSgnLi4vaW50ZXJuYWxzL2ZhaWxzJyk7XG52YXIgY3JlYXRlRWxlbWVudCA9IHJlcXVpcmUoJy4uL2ludGVybmFscy9kb2N1bWVudC1jcmVhdGUtZWxlbWVudCcpO1xuXG4vLyBUaGFua3MgdG8gSUU4IGZvciBpdHMgZnVubnkgZGVmaW5lUHJvcGVydHlcbm1vZHVsZS5leHBvcnRzID0gIURFU0NSSVBUT1JTICYmICFmYWlscyhmdW5jdGlvbiAoKSB7XG4gIC8vIGVzbGludC1kaXNhYmxlLW5leHQtbGluZSBlcy9uby1vYmplY3QtZGVmaW5lcHJvcGVydHkgLS0gcmVxdWlyZWQgZm9yIHRlc3RpbmdcbiAgcmV0dXJuIE9iamVjdC5kZWZpbmVQcm9wZXJ0eShjcmVhdGVFbGVtZW50KCdkaXYnKSwgJ2EnLCB7XG4gICAgZ2V0OiBmdW5jdGlvbiAoKSB7IHJldHVybiA3OyB9XG4gIH0pLmEgIT09IDc7XG59KTtcbiIsIid1c2Ugc3RyaWN0JztcbnZhciB1bmN1cnJ5VGhpcyA9IHJlcXVpcmUoJy4uL2ludGVybmFscy9mdW5jdGlvbi11bmN1cnJ5LXRoaXMnKTtcbnZhciBmYWlscyA9IHJlcXVpcmUoJy4uL2ludGVybmFscy9mYWlscycpO1xudmFyIGNsYXNzb2YgPSByZXF1aXJlKCcuLi9pbnRlcm5hbHMvY2xhc3NvZi1yYXcnKTtcblxudmFyICRPYmplY3QgPSBPYmplY3Q7XG52YXIgc3BsaXQgPSB1bmN1cnJ5VGhpcygnJy5zcGxpdCk7XG5cbi8vIGZhbGxiYWNrIGZvciBub24tYXJyYXktbGlrZSBFUzMgYW5kIG5vbi1lbnVtZXJhYmxlIG9sZCBWOCBzdHJpbmdzXG5tb2R1bGUuZXhwb3J0cyA9IGZhaWxzKGZ1bmN0aW9uICgpIHtcbiAgLy8gdGhyb3dzIGFuIGVycm9yIGluIHJoaW5vLCBzZWUgaHR0cHM6Ly9naXRodWIuY29tL21vemlsbGEvcmhpbm8vaXNzdWVzLzM0NlxuICAvLyBlc2xpbnQtZGlzYWJsZS1uZXh0LWxpbmUgbm8tcHJvdG90eXBlLWJ1aWx0aW5zIC0tIHNhZmVcbiAgcmV0dXJuICEkT2JqZWN0KCd6JykucHJvcGVydHlJc0VudW1lcmFibGUoMCk7XG59KSA/IGZ1bmN0aW9uIChpdCkge1xuICByZXR1cm4gY2xhc3NvZihpdCkgPT09ICdTdHJpbmcnID8gc3BsaXQoaXQsICcnKSA6ICRPYmplY3QoaXQpO1xufSA6ICRPYmplY3Q7XG4iLCIndXNlIHN0cmljdCc7XG52YXIgaXNDYWxsYWJsZSA9IHJlcXVpcmUoJy4uL2ludGVybmFscy9pcy1jYWxsYWJsZScpO1xudmFyIGlzT2JqZWN0ID0gcmVxdWlyZSgnLi4vaW50ZXJuYWxzL2lzLW9iamVjdCcpO1xudmFyIHNldFByb3RvdHlwZU9mID0gcmVxdWlyZSgnLi4vaW50ZXJuYWxzL29iamVjdC1zZXQtcHJvdG90eXBlLW9mJyk7XG5cbi8vIG1ha2VzIHN1YmNsYXNzaW5nIHdvcmsgY29ycmVjdCBmb3Igd3JhcHBlZCBidWlsdC1pbnNcbm1vZHVsZS5leHBvcnRzID0gZnVuY3Rpb24gKCR0aGlzLCBkdW1teSwgV3JhcHBlcikge1xuICB2YXIgTmV3VGFyZ2V0LCBOZXdUYXJnZXRQcm90b3R5cGU7XG4gIGlmIChcbiAgICAvLyBpdCBjYW4gd29yayBvbmx5IHdpdGggbmF0aXZlIGBzZXRQcm90b3R5cGVPZmBcbiAgICBzZXRQcm90b3R5cGVPZiAmJlxuICAgIC8vIHdlIGhhdmVuJ3QgY29tcGxldGVseSBjb3JyZWN0IHByZS1FUzYgd2F5IGZvciBnZXR0aW5nIGBuZXcudGFyZ2V0YCwgc28gdXNlIHRoaXNcbiAgICBpc0NhbGxhYmxlKE5ld1RhcmdldCA9IGR1bW15LmNvbnN0cnVjdG9yKSAmJlxuICAgIE5ld1RhcmdldCAhPT0gV3JhcHBlciAmJlxuICAgIGlzT2JqZWN0KE5ld1RhcmdldFByb3RvdHlwZSA9IE5ld1RhcmdldC5wcm90b3R5cGUpICYmXG4gICAgTmV3VGFyZ2V0UHJvdG90eXBlICE9PSBXcmFwcGVyLnByb3RvdHlwZVxuICApIHNldFByb3RvdHlwZU9mKCR0aGlzLCBOZXdUYXJnZXRQcm90b3R5cGUpO1xuICByZXR1cm4gJHRoaXM7XG59O1xuIiwiJ3VzZSBzdHJpY3QnO1xudmFyIHVuY3VycnlUaGlzID0gcmVxdWlyZSgnLi4vaW50ZXJuYWxzL2Z1bmN0aW9uLXVuY3VycnktdGhpcycpO1xudmFyIGlzQ2FsbGFibGUgPSByZXF1aXJlKCcuLi9pbnRlcm5hbHMvaXMtY2FsbGFibGUnKTtcbnZhciBzdG9yZSA9IHJlcXVpcmUoJy4uL2ludGVybmFscy9zaGFyZWQtc3RvcmUnKTtcblxudmFyIGZ1bmN0aW9uVG9TdHJpbmcgPSB1bmN1cnJ5VGhpcyhGdW5jdGlvbi50b1N0cmluZyk7XG5cbi8vIHRoaXMgaGVscGVyIGJyb2tlbiBpbiBgY29yZS1qc0AzLjQuMS0zLjQuNGAsIHNvIHdlIGNhbid0IHVzZSBgc2hhcmVkYCBoZWxwZXJcbmlmICghaXNDYWxsYWJsZShzdG9yZS5pbnNwZWN0U291cmNlKSkge1xuICBzdG9yZS5pbnNwZWN0U291cmNlID0gZnVuY3Rpb24gKGl0KSB7XG4gICAgcmV0dXJuIGZ1bmN0aW9uVG9TdHJpbmcoaXQpO1xuICB9O1xufVxuXG5tb2R1bGUuZXhwb3J0cyA9IHN0b3JlLmluc3BlY3RTb3VyY2U7XG4iLCIndXNlIHN0cmljdCc7XG52YXIgTkFUSVZFX1dFQUtfTUFQID0gcmVxdWlyZSgnLi4vaW50ZXJuYWxzL3dlYWstbWFwLWJhc2ljLWRldGVjdGlvbicpO1xudmFyIGdsb2JhbCA9IHJlcXVpcmUoJy4uL2ludGVybmFscy9nbG9iYWwnKTtcbnZhciBpc09iamVjdCA9IHJlcXVpcmUoJy4uL2ludGVybmFscy9pcy1vYmplY3QnKTtcbnZhciBjcmVhdGVOb25FbnVtZXJhYmxlUHJvcGVydHkgPSByZXF1aXJlKCcuLi9pbnRlcm5hbHMvY3JlYXRlLW5vbi1lbnVtZXJhYmxlLXByb3BlcnR5Jyk7XG52YXIgaGFzT3duID0gcmVxdWlyZSgnLi4vaW50ZXJuYWxzL2hhcy1vd24tcHJvcGVydHknKTtcbnZhciBzaGFyZWQgPSByZXF1aXJlKCcuLi9pbnRlcm5hbHMvc2hhcmVkLXN0b3JlJyk7XG52YXIgc2hhcmVkS2V5ID0gcmVxdWlyZSgnLi4vaW50ZXJuYWxzL3NoYXJlZC1rZXknKTtcbnZhciBoaWRkZW5LZXlzID0gcmVxdWlyZSgnLi4vaW50ZXJuYWxzL2hpZGRlbi1rZXlzJyk7XG5cbnZhciBPQkpFQ1RfQUxSRUFEWV9JTklUSUFMSVpFRCA9ICdPYmplY3QgYWxyZWFkeSBpbml0aWFsaXplZCc7XG52YXIgVHlwZUVycm9yID0gZ2xvYmFsLlR5cGVFcnJvcjtcbnZhciBXZWFrTWFwID0gZ2xvYmFsLldlYWtNYXA7XG52YXIgc2V0LCBnZXQsIGhhcztcblxudmFyIGVuZm9yY2UgPSBmdW5jdGlvbiAoaXQpIHtcbiAgcmV0dXJuIGhhcyhpdCkgPyBnZXQoaXQpIDogc2V0KGl0LCB7fSk7XG59O1xuXG52YXIgZ2V0dGVyRm9yID0gZnVuY3Rpb24gKFRZUEUpIHtcbiAgcmV0dXJuIGZ1bmN0aW9uIChpdCkge1xuICAgIHZhciBzdGF0ZTtcbiAgICBpZiAoIWlzT2JqZWN0KGl0KSB8fCAoc3RhdGUgPSBnZXQoaXQpKS50eXBlICE9PSBUWVBFKSB7XG4gICAgICB0aHJvdyBuZXcgVHlwZUVycm9yKCdJbmNvbXBhdGlibGUgcmVjZWl2ZXIsICcgKyBUWVBFICsgJyByZXF1aXJlZCcpO1xuICAgIH0gcmV0dXJuIHN0YXRlO1xuICB9O1xufTtcblxuaWYgKE5BVElWRV9XRUFLX01BUCB8fCBzaGFyZWQuc3RhdGUpIHtcbiAgdmFyIHN0b3JlID0gc2hhcmVkLnN0YXRlIHx8IChzaGFyZWQuc3RhdGUgPSBuZXcgV2Vha01hcCgpKTtcbiAgLyogZXNsaW50LWRpc2FibGUgbm8tc2VsZi1hc3NpZ24gLS0gcHJvdG90eXBlIG1ldGhvZHMgcHJvdGVjdGlvbiAqL1xuICBzdG9yZS5nZXQgPSBzdG9yZS5nZXQ7XG4gIHN0b3JlLmhhcyA9IHN0b3JlLmhhcztcbiAgc3RvcmUuc2V0ID0gc3RvcmUuc2V0O1xuICAvKiBlc2xpbnQtZW5hYmxlIG5vLXNlbGYtYXNzaWduIC0tIHByb3RvdHlwZSBtZXRob2RzIHByb3RlY3Rpb24gKi9cbiAgc2V0ID0gZnVuY3Rpb24gKGl0LCBtZXRhZGF0YSkge1xuICAgIGlmIChzdG9yZS5oYXMoaXQpKSB0aHJvdyBuZXcgVHlwZUVycm9yKE9CSkVDVF9BTFJFQURZX0lOSVRJQUxJWkVEKTtcbiAgICBtZXRhZGF0YS5mYWNhZGUgPSBpdDtcbiAgICBzdG9yZS5zZXQoaXQsIG1ldGFkYXRhKTtcbiAgICByZXR1cm4gbWV0YWRhdGE7XG4gIH07XG4gIGdldCA9IGZ1bmN0aW9uIChpdCkge1xuICAgIHJldHVybiBzdG9yZS5nZXQoaXQpIHx8IHt9O1xuICB9O1xuICBoYXMgPSBmdW5jdGlvbiAoaXQpIHtcbiAgICByZXR1cm4gc3RvcmUuaGFzKGl0KTtcbiAgfTtcbn0gZWxzZSB7XG4gIHZhciBTVEFURSA9IHNoYXJlZEtleSgnc3RhdGUnKTtcbiAgaGlkZGVuS2V5c1tTVEFURV0gPSB0cnVlO1xuICBzZXQgPSBmdW5jdGlvbiAoaXQsIG1ldGFkYXRhKSB7XG4gICAgaWYgKGhhc093bihpdCwgU1RBVEUpKSB0aHJvdyBuZXcgVHlwZUVycm9yKE9CSkVDVF9BTFJFQURZX0lOSVRJQUxJWkVEKTtcbiAgICBtZXRhZGF0YS5mYWNhZGUgPSBpdDtcbiAgICBjcmVhdGVOb25FbnVtZXJhYmxlUHJvcGVydHkoaXQsIFNUQVRFLCBtZXRhZGF0YSk7XG4gICAgcmV0dXJuIG1ldGFkYXRhO1xuICB9O1xuICBnZXQgPSBmdW5jdGlvbiAoaXQpIHtcbiAgICByZXR1cm4gaGFzT3duKGl0LCBTVEFURSkgPyBpdFtTVEFURV0gOiB7fTtcbiAgfTtcbiAgaGFzID0gZnVuY3Rpb24gKGl0KSB7XG4gICAgcmV0dXJuIGhhc093bihpdCwgU1RBVEUpO1xuICB9O1xufVxuXG5tb2R1bGUuZXhwb3J0cyA9IHtcbiAgc2V0OiBzZXQsXG4gIGdldDogZ2V0LFxuICBoYXM6IGhhcyxcbiAgZW5mb3JjZTogZW5mb3JjZSxcbiAgZ2V0dGVyRm9yOiBnZXR0ZXJGb3Jcbn07XG4iLCIndXNlIHN0cmljdCc7XG52YXIgd2VsbEtub3duU3ltYm9sID0gcmVxdWlyZSgnLi4vaW50ZXJuYWxzL3dlbGwta25vd24tc3ltYm9sJyk7XG52YXIgSXRlcmF0b3JzID0gcmVxdWlyZSgnLi4vaW50ZXJuYWxzL2l0ZXJhdG9ycycpO1xuXG52YXIgSVRFUkFUT1IgPSB3ZWxsS25vd25TeW1ib2woJ2l0ZXJhdG9yJyk7XG52YXIgQXJyYXlQcm90b3R5cGUgPSBBcnJheS5wcm90b3R5cGU7XG5cbi8vIGNoZWNrIG9uIGRlZmF1bHQgQXJyYXkgaXRlcmF0b3Jcbm1vZHVsZS5leHBvcnRzID0gZnVuY3Rpb24gKGl0KSB7XG4gIHJldHVybiBpdCAhPT0gdW5kZWZpbmVkICYmIChJdGVyYXRvcnMuQXJyYXkgPT09IGl0IHx8IEFycmF5UHJvdG90eXBlW0lURVJBVE9SXSA9PT0gaXQpO1xufTtcbiIsIid1c2Ugc3RyaWN0Jztcbi8vIGh0dHBzOi8vdGMzOS5lcy9lY21hMjYyLyNzZWMtSXNIVE1MRERBLWludGVybmFsLXNsb3RcbnZhciBkb2N1bWVudEFsbCA9IHR5cGVvZiBkb2N1bWVudCA9PSAnb2JqZWN0JyAmJiBkb2N1bWVudC5hbGw7XG5cbi8vIGBJc0NhbGxhYmxlYCBhYnN0cmFjdCBvcGVyYXRpb25cbi8vIGh0dHBzOi8vdGMzOS5lcy9lY21hMjYyLyNzZWMtaXNjYWxsYWJsZVxuLy8gZXNsaW50LWRpc2FibGUtbmV4dC1saW5lIHVuaWNvcm4vbm8tdHlwZW9mLXVuZGVmaW5lZCAtLSByZXF1aXJlZCBmb3IgdGVzdGluZ1xubW9kdWxlLmV4cG9ydHMgPSB0eXBlb2YgZG9jdW1lbnRBbGwgPT0gJ3VuZGVmaW5lZCcgJiYgZG9jdW1lbnRBbGwgIT09IHVuZGVmaW5lZCA/IGZ1bmN0aW9uIChhcmd1bWVudCkge1xuICByZXR1cm4gdHlwZW9mIGFyZ3VtZW50ID09ICdmdW5jdGlvbicgfHwgYXJndW1lbnQgPT09IGRvY3VtZW50QWxsO1xufSA6IGZ1bmN0aW9uIChhcmd1bWVudCkge1xuICByZXR1cm4gdHlwZW9mIGFyZ3VtZW50ID09ICdmdW5jdGlvbic7XG59O1xuIiwiJ3VzZSBzdHJpY3QnO1xudmFyIHVuY3VycnlUaGlzID0gcmVxdWlyZSgnLi4vaW50ZXJuYWxzL2Z1bmN0aW9uLXVuY3VycnktdGhpcycpO1xudmFyIGZhaWxzID0gcmVxdWlyZSgnLi4vaW50ZXJuYWxzL2ZhaWxzJyk7XG52YXIgaXNDYWxsYWJsZSA9IHJlcXVpcmUoJy4uL2ludGVybmFscy9pcy1jYWxsYWJsZScpO1xudmFyIGNsYXNzb2YgPSByZXF1aXJlKCcuLi9pbnRlcm5hbHMvY2xhc3NvZicpO1xudmFyIGdldEJ1aWx0SW4gPSByZXF1aXJlKCcuLi9pbnRlcm5hbHMvZ2V0LWJ1aWx0LWluJyk7XG52YXIgaW5zcGVjdFNvdXJjZSA9IHJlcXVpcmUoJy4uL2ludGVybmFscy9pbnNwZWN0LXNvdXJjZScpO1xuXG52YXIgbm9vcCA9IGZ1bmN0aW9uICgpIHsgLyogZW1wdHkgKi8gfTtcbnZhciBjb25zdHJ1Y3QgPSBnZXRCdWlsdEluKCdSZWZsZWN0JywgJ2NvbnN0cnVjdCcpO1xudmFyIGNvbnN0cnVjdG9yUmVnRXhwID0gL15cXHMqKD86Y2xhc3N8ZnVuY3Rpb24pXFxiLztcbnZhciBleGVjID0gdW5jdXJyeVRoaXMoY29uc3RydWN0b3JSZWdFeHAuZXhlYyk7XG52YXIgSU5DT1JSRUNUX1RPX1NUUklORyA9ICFjb25zdHJ1Y3RvclJlZ0V4cC50ZXN0KG5vb3ApO1xuXG52YXIgaXNDb25zdHJ1Y3Rvck1vZGVybiA9IGZ1bmN0aW9uIGlzQ29uc3RydWN0b3IoYXJndW1lbnQpIHtcbiAgaWYgKCFpc0NhbGxhYmxlKGFyZ3VtZW50KSkgcmV0dXJuIGZhbHNlO1xuICB0cnkge1xuICAgIGNvbnN0cnVjdChub29wLCBbXSwgYXJndW1lbnQpO1xuICAgIHJldHVybiB0cnVlO1xuICB9IGNhdGNoIChlcnJvcikge1xuICAgIHJldHVybiBmYWxzZTtcbiAgfVxufTtcblxudmFyIGlzQ29uc3RydWN0b3JMZWdhY3kgPSBmdW5jdGlvbiBpc0NvbnN0cnVjdG9yKGFyZ3VtZW50KSB7XG4gIGlmICghaXNDYWxsYWJsZShhcmd1bWVudCkpIHJldHVybiBmYWxzZTtcbiAgc3dpdGNoIChjbGFzc29mKGFyZ3VtZW50KSkge1xuICAgIGNhc2UgJ0FzeW5jRnVuY3Rpb24nOlxuICAgIGNhc2UgJ0dlbmVyYXRvckZ1bmN0aW9uJzpcbiAgICBjYXNlICdBc3luY0dlbmVyYXRvckZ1bmN0aW9uJzogcmV0dXJuIGZhbHNlO1xuICB9XG4gIHRyeSB7XG4gICAgLy8gd2UgY2FuJ3QgY2hlY2sgLnByb3RvdHlwZSBzaW5jZSBjb25zdHJ1Y3RvcnMgcHJvZHVjZWQgYnkgLmJpbmQgaGF2ZW4ndCBpdFxuICAgIC8vIGBGdW5jdGlvbiN0b1N0cmluZ2AgdGhyb3dzIG9uIHNvbWUgYnVpbHQtaXQgZnVuY3Rpb24gaW4gc29tZSBsZWdhY3kgZW5naW5lc1xuICAgIC8vIChmb3IgZXhhbXBsZSwgYERPTVF1YWRgIGFuZCBzaW1pbGFyIGluIEZGNDEtKVxuICAgIHJldHVybiBJTkNPUlJFQ1RfVE9fU1RSSU5HIHx8ICEhZXhlYyhjb25zdHJ1Y3RvclJlZ0V4cCwgaW5zcGVjdFNvdXJjZShhcmd1bWVudCkpO1xuICB9IGNhdGNoIChlcnJvcikge1xuICAgIHJldHVybiB0cnVlO1xuICB9XG59O1xuXG5pc0NvbnN0cnVjdG9yTGVnYWN5LnNoYW0gPSB0cnVlO1xuXG4vLyBgSXNDb25zdHJ1Y3RvcmAgYWJzdHJhY3Qgb3BlcmF0aW9uXG4vLyBodHRwczovL3RjMzkuZXMvZWNtYTI2Mi8jc2VjLWlzY29uc3RydWN0b3Jcbm1vZHVsZS5leHBvcnRzID0gIWNvbnN0cnVjdCB8fCBmYWlscyhmdW5jdGlvbiAoKSB7XG4gIHZhciBjYWxsZWQ7XG4gIHJldHVybiBpc0NvbnN0cnVjdG9yTW9kZXJuKGlzQ29uc3RydWN0b3JNb2Rlcm4uY2FsbClcbiAgICB8fCAhaXNDb25zdHJ1Y3Rvck1vZGVybihPYmplY3QpXG4gICAgfHwgIWlzQ29uc3RydWN0b3JNb2Rlcm4oZnVuY3Rpb24gKCkgeyBjYWxsZWQgPSB0cnVlOyB9KVxuICAgIHx8IGNhbGxlZDtcbn0pID8gaXNDb25zdHJ1Y3RvckxlZ2FjeSA6IGlzQ29uc3RydWN0b3JNb2Rlcm47XG4iLCIndXNlIHN0cmljdCc7XG52YXIgZmFpbHMgPSByZXF1aXJlKCcuLi9pbnRlcm5hbHMvZmFpbHMnKTtcbnZhciBpc0NhbGxhYmxlID0gcmVxdWlyZSgnLi4vaW50ZXJuYWxzL2lzLWNhbGxhYmxlJyk7XG5cbnZhciByZXBsYWNlbWVudCA9IC8jfFxcLnByb3RvdHlwZVxcLi87XG5cbnZhciBpc0ZvcmNlZCA9IGZ1bmN0aW9uIChmZWF0dXJlLCBkZXRlY3Rpb24pIHtcbiAgdmFyIHZhbHVlID0gZGF0YVtub3JtYWxpemUoZmVhdHVyZSldO1xuICByZXR1cm4gdmFsdWUgPT09IFBPTFlGSUxMID8gdHJ1ZVxuICAgIDogdmFsdWUgPT09IE5BVElWRSA/IGZhbHNlXG4gICAgOiBpc0NhbGxhYmxlKGRldGVjdGlvbikgPyBmYWlscyhkZXRlY3Rpb24pXG4gICAgOiAhIWRldGVjdGlvbjtcbn07XG5cbnZhciBub3JtYWxpemUgPSBpc0ZvcmNlZC5ub3JtYWxpemUgPSBmdW5jdGlvbiAoc3RyaW5nKSB7XG4gIHJldHVybiBTdHJpbmcoc3RyaW5nKS5yZXBsYWNlKHJlcGxhY2VtZW50LCAnLicpLnRvTG93ZXJDYXNlKCk7XG59O1xuXG52YXIgZGF0YSA9IGlzRm9yY2VkLmRhdGEgPSB7fTtcbnZhciBOQVRJVkUgPSBpc0ZvcmNlZC5OQVRJVkUgPSAnTic7XG52YXIgUE9MWUZJTEwgPSBpc0ZvcmNlZC5QT0xZRklMTCA9ICdQJztcblxubW9kdWxlLmV4cG9ydHMgPSBpc0ZvcmNlZDtcbiIsIid1c2Ugc3RyaWN0Jztcbi8vIHdlIGNhbid0IHVzZSBqdXN0IGBpdCA9PSBudWxsYCBzaW5jZSBvZiBgZG9jdW1lbnQuYWxsYCBzcGVjaWFsIGNhc2Vcbi8vIGh0dHBzOi8vdGMzOS5lcy9lY21hMjYyLyNzZWMtSXNIVE1MRERBLWludGVybmFsLXNsb3QtYWVjXG5tb2R1bGUuZXhwb3J0cyA9IGZ1bmN0aW9uIChpdCkge1xuICByZXR1cm4gaXQgPT09IG51bGwgfHwgaXQgPT09IHVuZGVmaW5lZDtcbn07XG4iLCIndXNlIHN0cmljdCc7XG52YXIgaXNDYWxsYWJsZSA9IHJlcXVpcmUoJy4uL2ludGVybmFscy9pcy1jYWxsYWJsZScpO1xuXG5tb2R1bGUuZXhwb3J0cyA9IGZ1bmN0aW9uIChpdCkge1xuICByZXR1cm4gdHlwZW9mIGl0ID09ICdvYmplY3QnID8gaXQgIT09IG51bGwgOiBpc0NhbGxhYmxlKGl0KTtcbn07XG4iLCIndXNlIHN0cmljdCc7XG52YXIgaXNPYmplY3QgPSByZXF1aXJlKCcuLi9pbnRlcm5hbHMvaXMtb2JqZWN0Jyk7XG5cbm1vZHVsZS5leHBvcnRzID0gZnVuY3Rpb24gKGFyZ3VtZW50KSB7XG4gIHJldHVybiBpc09iamVjdChhcmd1bWVudCkgfHwgYXJndW1lbnQgPT09IG51bGw7XG59O1xuIiwiJ3VzZSBzdHJpY3QnO1xubW9kdWxlLmV4cG9ydHMgPSBmYWxzZTtcbiIsIid1c2Ugc3RyaWN0JztcbnZhciBpc09iamVjdCA9IHJlcXVpcmUoJy4uL2ludGVybmFscy9pcy1vYmplY3QnKTtcbnZhciBjbGFzc29mID0gcmVxdWlyZSgnLi4vaW50ZXJuYWxzL2NsYXNzb2YtcmF3Jyk7XG52YXIgd2VsbEtub3duU3ltYm9sID0gcmVxdWlyZSgnLi4vaW50ZXJuYWxzL3dlbGwta25vd24tc3ltYm9sJyk7XG5cbnZhciBNQVRDSCA9IHdlbGxLbm93blN5bWJvbCgnbWF0Y2gnKTtcblxuLy8gYElzUmVnRXhwYCBhYnN0cmFjdCBvcGVyYXRpb25cbi8vIGh0dHBzOi8vdGMzOS5lcy9lY21hMjYyLyNzZWMtaXNyZWdleHBcbm1vZHVsZS5leHBvcnRzID0gZnVuY3Rpb24gKGl0KSB7XG4gIHZhciBpc1JlZ0V4cDtcbiAgcmV0dXJuIGlzT2JqZWN0KGl0KSAmJiAoKGlzUmVnRXhwID0gaXRbTUFUQ0hdKSAhPT0gdW5kZWZpbmVkID8gISFpc1JlZ0V4cCA6IGNsYXNzb2YoaXQpID09PSAnUmVnRXhwJyk7XG59O1xuIiwiJ3VzZSBzdHJpY3QnO1xudmFyIGdldEJ1aWx0SW4gPSByZXF1aXJlKCcuLi9pbnRlcm5hbHMvZ2V0LWJ1aWx0LWluJyk7XG52YXIgaXNDYWxsYWJsZSA9IHJlcXVpcmUoJy4uL2ludGVybmFscy9pcy1jYWxsYWJsZScpO1xudmFyIGlzUHJvdG90eXBlT2YgPSByZXF1aXJlKCcuLi9pbnRlcm5hbHMvb2JqZWN0LWlzLXByb3RvdHlwZS1vZicpO1xudmFyIFVTRV9TWU1CT0xfQVNfVUlEID0gcmVxdWlyZSgnLi4vaW50ZXJuYWxzL3VzZS1zeW1ib2wtYXMtdWlkJyk7XG5cbnZhciAkT2JqZWN0ID0gT2JqZWN0O1xuXG5tb2R1bGUuZXhwb3J0cyA9IFVTRV9TWU1CT0xfQVNfVUlEID8gZnVuY3Rpb24gKGl0KSB7XG4gIHJldHVybiB0eXBlb2YgaXQgPT0gJ3N5bWJvbCc7XG59IDogZnVuY3Rpb24gKGl0KSB7XG4gIHZhciAkU3ltYm9sID0gZ2V0QnVpbHRJbignU3ltYm9sJyk7XG4gIHJldHVybiBpc0NhbGxhYmxlKCRTeW1ib2wpICYmIGlzUHJvdG90eXBlT2YoJFN5bWJvbC5wcm90b3R5cGUsICRPYmplY3QoaXQpKTtcbn07XG4iLCIndXNlIHN0cmljdCc7XG52YXIgY2FsbCA9IHJlcXVpcmUoJy4uL2ludGVybmFscy9mdW5jdGlvbi1jYWxsJyk7XG52YXIgYW5PYmplY3QgPSByZXF1aXJlKCcuLi9pbnRlcm5hbHMvYW4tb2JqZWN0Jyk7XG52YXIgZ2V0TWV0aG9kID0gcmVxdWlyZSgnLi4vaW50ZXJuYWxzL2dldC1tZXRob2QnKTtcblxubW9kdWxlLmV4cG9ydHMgPSBmdW5jdGlvbiAoaXRlcmF0b3IsIGtpbmQsIHZhbHVlKSB7XG4gIHZhciBpbm5lclJlc3VsdCwgaW5uZXJFcnJvcjtcbiAgYW5PYmplY3QoaXRlcmF0b3IpO1xuICB0cnkge1xuICAgIGlubmVyUmVzdWx0ID0gZ2V0TWV0aG9kKGl0ZXJhdG9yLCAncmV0dXJuJyk7XG4gICAgaWYgKCFpbm5lclJlc3VsdCkge1xuICAgICAgaWYgKGtpbmQgPT09ICd0aHJvdycpIHRocm93IHZhbHVlO1xuICAgICAgcmV0dXJuIHZhbHVlO1xuICAgIH1cbiAgICBpbm5lclJlc3VsdCA9IGNhbGwoaW5uZXJSZXN1bHQsIGl0ZXJhdG9yKTtcbiAgfSBjYXRjaCAoZXJyb3IpIHtcbiAgICBpbm5lckVycm9yID0gdHJ1ZTtcbiAgICBpbm5lclJlc3VsdCA9IGVycm9yO1xuICB9XG4gIGlmIChraW5kID09PSAndGhyb3cnKSB0aHJvdyB2YWx1ZTtcbiAgaWYgKGlubmVyRXJyb3IpIHRocm93IGlubmVyUmVzdWx0O1xuICBhbk9iamVjdChpbm5lclJlc3VsdCk7XG4gIHJldHVybiB2YWx1ZTtcbn07XG4iLCIndXNlIHN0cmljdCc7XG52YXIgSXRlcmF0b3JQcm90b3R5cGUgPSByZXF1aXJlKCcuLi9pbnRlcm5hbHMvaXRlcmF0b3JzLWNvcmUnKS5JdGVyYXRvclByb3RvdHlwZTtcbnZhciBjcmVhdGUgPSByZXF1aXJlKCcuLi9pbnRlcm5hbHMvb2JqZWN0LWNyZWF0ZScpO1xudmFyIGNyZWF0ZVByb3BlcnR5RGVzY3JpcHRvciA9IHJlcXVpcmUoJy4uL2ludGVybmFscy9jcmVhdGUtcHJvcGVydHktZGVzY3JpcHRvcicpO1xudmFyIHNldFRvU3RyaW5nVGFnID0gcmVxdWlyZSgnLi4vaW50ZXJuYWxzL3NldC10by1zdHJpbmctdGFnJyk7XG52YXIgSXRlcmF0b3JzID0gcmVxdWlyZSgnLi4vaW50ZXJuYWxzL2l0ZXJhdG9ycycpO1xuXG52YXIgcmV0dXJuVGhpcyA9IGZ1bmN0aW9uICgpIHsgcmV0dXJuIHRoaXM7IH07XG5cbm1vZHVsZS5leHBvcnRzID0gZnVuY3Rpb24gKEl0ZXJhdG9yQ29uc3RydWN0b3IsIE5BTUUsIG5leHQsIEVOVU1FUkFCTEVfTkVYVCkge1xuICB2YXIgVE9fU1RSSU5HX1RBRyA9IE5BTUUgKyAnIEl0ZXJhdG9yJztcbiAgSXRlcmF0b3JDb25zdHJ1Y3Rvci5wcm90b3R5cGUgPSBjcmVhdGUoSXRlcmF0b3JQcm90b3R5cGUsIHsgbmV4dDogY3JlYXRlUHJvcGVydHlEZXNjcmlwdG9yKCshRU5VTUVSQUJMRV9ORVhULCBuZXh0KSB9KTtcbiAgc2V0VG9TdHJpbmdUYWcoSXRlcmF0b3JDb25zdHJ1Y3RvciwgVE9fU1RSSU5HX1RBRywgZmFsc2UsIHRydWUpO1xuICBJdGVyYXRvcnNbVE9fU1RSSU5HX1RBR10gPSByZXR1cm5UaGlzO1xuICByZXR1cm4gSXRlcmF0b3JDb25zdHJ1Y3Rvcjtcbn07XG4iLCIndXNlIHN0cmljdCc7XG52YXIgJCA9IHJlcXVpcmUoJy4uL2ludGVybmFscy9leHBvcnQnKTtcbnZhciBjYWxsID0gcmVxdWlyZSgnLi4vaW50ZXJuYWxzL2Z1bmN0aW9uLWNhbGwnKTtcbnZhciBJU19QVVJFID0gcmVxdWlyZSgnLi4vaW50ZXJuYWxzL2lzLXB1cmUnKTtcbnZhciBGdW5jdGlvbk5hbWUgPSByZXF1aXJlKCcuLi9pbnRlcm5hbHMvZnVuY3Rpb24tbmFtZScpO1xudmFyIGlzQ2FsbGFibGUgPSByZXF1aXJlKCcuLi9pbnRlcm5hbHMvaXMtY2FsbGFibGUnKTtcbnZhciBjcmVhdGVJdGVyYXRvckNvbnN0cnVjdG9yID0gcmVxdWlyZSgnLi4vaW50ZXJuYWxzL2l0ZXJhdG9yLWNyZWF0ZS1jb25zdHJ1Y3RvcicpO1xudmFyIGdldFByb3RvdHlwZU9mID0gcmVxdWlyZSgnLi4vaW50ZXJuYWxzL29iamVjdC1nZXQtcHJvdG90eXBlLW9mJyk7XG52YXIgc2V0UHJvdG90eXBlT2YgPSByZXF1aXJlKCcuLi9pbnRlcm5hbHMvb2JqZWN0LXNldC1wcm90b3R5cGUtb2YnKTtcbnZhciBzZXRUb1N0cmluZ1RhZyA9IHJlcXVpcmUoJy4uL2ludGVybmFscy9zZXQtdG8tc3RyaW5nLXRhZycpO1xudmFyIGNyZWF0ZU5vbkVudW1lcmFibGVQcm9wZXJ0eSA9IHJlcXVpcmUoJy4uL2ludGVybmFscy9jcmVhdGUtbm9uLWVudW1lcmFibGUtcHJvcGVydHknKTtcbnZhciBkZWZpbmVCdWlsdEluID0gcmVxdWlyZSgnLi4vaW50ZXJuYWxzL2RlZmluZS1idWlsdC1pbicpO1xudmFyIHdlbGxLbm93blN5bWJvbCA9IHJlcXVpcmUoJy4uL2ludGVybmFscy93ZWxsLWtub3duLXN5bWJvbCcpO1xudmFyIEl0ZXJhdG9ycyA9IHJlcXVpcmUoJy4uL2ludGVybmFscy9pdGVyYXRvcnMnKTtcbnZhciBJdGVyYXRvcnNDb3JlID0gcmVxdWlyZSgnLi4vaW50ZXJuYWxzL2l0ZXJhdG9ycy1jb3JlJyk7XG5cbnZhciBQUk9QRVJfRlVOQ1RJT05fTkFNRSA9IEZ1bmN0aW9uTmFtZS5QUk9QRVI7XG52YXIgQ09ORklHVVJBQkxFX0ZVTkNUSU9OX05BTUUgPSBGdW5jdGlvbk5hbWUuQ09ORklHVVJBQkxFO1xudmFyIEl0ZXJhdG9yUHJvdG90eXBlID0gSXRlcmF0b3JzQ29yZS5JdGVyYXRvclByb3RvdHlwZTtcbnZhciBCVUdHWV9TQUZBUklfSVRFUkFUT1JTID0gSXRlcmF0b3JzQ29yZS5CVUdHWV9TQUZBUklfSVRFUkFUT1JTO1xudmFyIElURVJBVE9SID0gd2VsbEtub3duU3ltYm9sKCdpdGVyYXRvcicpO1xudmFyIEtFWVMgPSAna2V5cyc7XG52YXIgVkFMVUVTID0gJ3ZhbHVlcyc7XG52YXIgRU5UUklFUyA9ICdlbnRyaWVzJztcblxudmFyIHJldHVyblRoaXMgPSBmdW5jdGlvbiAoKSB7IHJldHVybiB0aGlzOyB9O1xuXG5tb2R1bGUuZXhwb3J0cyA9IGZ1bmN0aW9uIChJdGVyYWJsZSwgTkFNRSwgSXRlcmF0b3JDb25zdHJ1Y3RvciwgbmV4dCwgREVGQVVMVCwgSVNfU0VULCBGT1JDRUQpIHtcbiAgY3JlYXRlSXRlcmF0b3JDb25zdHJ1Y3RvcihJdGVyYXRvckNvbnN0cnVjdG9yLCBOQU1FLCBuZXh0KTtcblxuICB2YXIgZ2V0SXRlcmF0aW9uTWV0aG9kID0gZnVuY3Rpb24gKEtJTkQpIHtcbiAgICBpZiAoS0lORCA9PT0gREVGQVVMVCAmJiBkZWZhdWx0SXRlcmF0b3IpIHJldHVybiBkZWZhdWx0SXRlcmF0b3I7XG4gICAgaWYgKCFCVUdHWV9TQUZBUklfSVRFUkFUT1JTICYmIEtJTkQgJiYgS0lORCBpbiBJdGVyYWJsZVByb3RvdHlwZSkgcmV0dXJuIEl0ZXJhYmxlUHJvdG90eXBlW0tJTkRdO1xuXG4gICAgc3dpdGNoIChLSU5EKSB7XG4gICAgICBjYXNlIEtFWVM6IHJldHVybiBmdW5jdGlvbiBrZXlzKCkgeyByZXR1cm4gbmV3IEl0ZXJhdG9yQ29uc3RydWN0b3IodGhpcywgS0lORCk7IH07XG4gICAgICBjYXNlIFZBTFVFUzogcmV0dXJuIGZ1bmN0aW9uIHZhbHVlcygpIHsgcmV0dXJuIG5ldyBJdGVyYXRvckNvbnN0cnVjdG9yKHRoaXMsIEtJTkQpOyB9O1xuICAgICAgY2FzZSBFTlRSSUVTOiByZXR1cm4gZnVuY3Rpb24gZW50cmllcygpIHsgcmV0dXJuIG5ldyBJdGVyYXRvckNvbnN0cnVjdG9yKHRoaXMsIEtJTkQpOyB9O1xuICAgIH1cblxuICAgIHJldHVybiBmdW5jdGlvbiAoKSB7IHJldHVybiBuZXcgSXRlcmF0b3JDb25zdHJ1Y3Rvcih0aGlzKTsgfTtcbiAgfTtcblxuICB2YXIgVE9fU1RSSU5HX1RBRyA9IE5BTUUgKyAnIEl0ZXJhdG9yJztcbiAgdmFyIElOQ09SUkVDVF9WQUxVRVNfTkFNRSA9IGZhbHNlO1xuICB2YXIgSXRlcmFibGVQcm90b3R5cGUgPSBJdGVyYWJsZS5wcm90b3R5cGU7XG4gIHZhciBuYXRpdmVJdGVyYXRvciA9IEl0ZXJhYmxlUHJvdG90eXBlW0lURVJBVE9SXVxuICAgIHx8IEl0ZXJhYmxlUHJvdG90eXBlWydAQGl0ZXJhdG9yJ11cbiAgICB8fCBERUZBVUxUICYmIEl0ZXJhYmxlUHJvdG90eXBlW0RFRkFVTFRdO1xuICB2YXIgZGVmYXVsdEl0ZXJhdG9yID0gIUJVR0dZX1NBRkFSSV9JVEVSQVRPUlMgJiYgbmF0aXZlSXRlcmF0b3IgfHwgZ2V0SXRlcmF0aW9uTWV0aG9kKERFRkFVTFQpO1xuICB2YXIgYW55TmF0aXZlSXRlcmF0b3IgPSBOQU1FID09PSAnQXJyYXknID8gSXRlcmFibGVQcm90b3R5cGUuZW50cmllcyB8fCBuYXRpdmVJdGVyYXRvciA6IG5hdGl2ZUl0ZXJhdG9yO1xuICB2YXIgQ3VycmVudEl0ZXJhdG9yUHJvdG90eXBlLCBtZXRob2RzLCBLRVk7XG5cbiAgLy8gZml4IG5hdGl2ZVxuICBpZiAoYW55TmF0aXZlSXRlcmF0b3IpIHtcbiAgICBDdXJyZW50SXRlcmF0b3JQcm90b3R5cGUgPSBnZXRQcm90b3R5cGVPZihhbnlOYXRpdmVJdGVyYXRvci5jYWxsKG5ldyBJdGVyYWJsZSgpKSk7XG4gICAgaWYgKEN1cnJlbnRJdGVyYXRvclByb3RvdHlwZSAhPT0gT2JqZWN0LnByb3RvdHlwZSAmJiBDdXJyZW50SXRlcmF0b3JQcm90b3R5cGUubmV4dCkge1xuICAgICAgaWYgKCFJU19QVVJFICYmIGdldFByb3RvdHlwZU9mKEN1cnJlbnRJdGVyYXRvclByb3RvdHlwZSkgIT09IEl0ZXJhdG9yUHJvdG90eXBlKSB7XG4gICAgICAgIGlmIChzZXRQcm90b3R5cGVPZikge1xuICAgICAgICAgIHNldFByb3RvdHlwZU9mKEN1cnJlbnRJdGVyYXRvclByb3RvdHlwZSwgSXRlcmF0b3JQcm90b3R5cGUpO1xuICAgICAgICB9IGVsc2UgaWYgKCFpc0NhbGxhYmxlKEN1cnJlbnRJdGVyYXRvclByb3RvdHlwZVtJVEVSQVRPUl0pKSB7XG4gICAgICAgICAgZGVmaW5lQnVpbHRJbihDdXJyZW50SXRlcmF0b3JQcm90b3R5cGUsIElURVJBVE9SLCByZXR1cm5UaGlzKTtcbiAgICAgICAgfVxuICAgICAgfVxuICAgICAgLy8gU2V0IEBAdG9TdHJpbmdUYWcgdG8gbmF0aXZlIGl0ZXJhdG9yc1xuICAgICAgc2V0VG9TdHJpbmdUYWcoQ3VycmVudEl0ZXJhdG9yUHJvdG90eXBlLCBUT19TVFJJTkdfVEFHLCB0cnVlLCB0cnVlKTtcbiAgICAgIGlmIChJU19QVVJFKSBJdGVyYXRvcnNbVE9fU1RSSU5HX1RBR10gPSByZXR1cm5UaGlzO1xuICAgIH1cbiAgfVxuXG4gIC8vIGZpeCBBcnJheS5wcm90b3R5cGUueyB2YWx1ZXMsIEBAaXRlcmF0b3IgfS5uYW1lIGluIFY4IC8gRkZcbiAgaWYgKFBST1BFUl9GVU5DVElPTl9OQU1FICYmIERFRkFVTFQgPT09IFZBTFVFUyAmJiBuYXRpdmVJdGVyYXRvciAmJiBuYXRpdmVJdGVyYXRvci5uYW1lICE9PSBWQUxVRVMpIHtcbiAgICBpZiAoIUlTX1BVUkUgJiYgQ09ORklHVVJBQkxFX0ZVTkNUSU9OX05BTUUpIHtcbiAgICAgIGNyZWF0ZU5vbkVudW1lcmFibGVQcm9wZXJ0eShJdGVyYWJsZVByb3RvdHlwZSwgJ25hbWUnLCBWQUxVRVMpO1xuICAgIH0gZWxzZSB7XG4gICAgICBJTkNPUlJFQ1RfVkFMVUVTX05BTUUgPSB0cnVlO1xuICAgICAgZGVmYXVsdEl0ZXJhdG9yID0gZnVuY3Rpb24gdmFsdWVzKCkgeyByZXR1cm4gY2FsbChuYXRpdmVJdGVyYXRvciwgdGhpcyk7IH07XG4gICAgfVxuICB9XG5cbiAgLy8gZXhwb3J0IGFkZGl0aW9uYWwgbWV0aG9kc1xuICBpZiAoREVGQVVMVCkge1xuICAgIG1ldGhvZHMgPSB7XG4gICAgICB2YWx1ZXM6IGdldEl0ZXJhdGlvbk1ldGhvZChWQUxVRVMpLFxuICAgICAga2V5czogSVNfU0VUID8gZGVmYXVsdEl0ZXJhdG9yIDogZ2V0SXRlcmF0aW9uTWV0aG9kKEtFWVMpLFxuICAgICAgZW50cmllczogZ2V0SXRlcmF0aW9uTWV0aG9kKEVOVFJJRVMpXG4gICAgfTtcbiAgICBpZiAoRk9SQ0VEKSBmb3IgKEtFWSBpbiBtZXRob2RzKSB7XG4gICAgICBpZiAoQlVHR1lfU0FGQVJJX0lURVJBVE9SUyB8fCBJTkNPUlJFQ1RfVkFMVUVTX05BTUUgfHwgIShLRVkgaW4gSXRlcmFibGVQcm90b3R5cGUpKSB7XG4gICAgICAgIGRlZmluZUJ1aWx0SW4oSXRlcmFibGVQcm90b3R5cGUsIEtFWSwgbWV0aG9kc1tLRVldKTtcbiAgICAgIH1cbiAgICB9IGVsc2UgJCh7IHRhcmdldDogTkFNRSwgcHJvdG86IHRydWUsIGZvcmNlZDogQlVHR1lfU0FGQVJJX0lURVJBVE9SUyB8fCBJTkNPUlJFQ1RfVkFMVUVTX05BTUUgfSwgbWV0aG9kcyk7XG4gIH1cblxuICAvLyBkZWZpbmUgaXRlcmF0b3JcbiAgaWYgKCghSVNfUFVSRSB8fCBGT1JDRUQpICYmIEl0ZXJhYmxlUHJvdG90eXBlW0lURVJBVE9SXSAhPT0gZGVmYXVsdEl0ZXJhdG9yKSB7XG4gICAgZGVmaW5lQnVpbHRJbihJdGVyYWJsZVByb3RvdHlwZSwgSVRFUkFUT1IsIGRlZmF1bHRJdGVyYXRvciwgeyBuYW1lOiBERUZBVUxUIH0pO1xuICB9XG4gIEl0ZXJhdG9yc1tOQU1FXSA9IGRlZmF1bHRJdGVyYXRvcjtcblxuICByZXR1cm4gbWV0aG9kcztcbn07XG4iLCIndXNlIHN0cmljdCc7XG52YXIgZmFpbHMgPSByZXF1aXJlKCcuLi9pbnRlcm5hbHMvZmFpbHMnKTtcbnZhciBpc0NhbGxhYmxlID0gcmVxdWlyZSgnLi4vaW50ZXJuYWxzL2lzLWNhbGxhYmxlJyk7XG52YXIgaXNPYmplY3QgPSByZXF1aXJlKCcuLi9pbnRlcm5hbHMvaXMtb2JqZWN0Jyk7XG52YXIgY3JlYXRlID0gcmVxdWlyZSgnLi4vaW50ZXJuYWxzL29iamVjdC1jcmVhdGUnKTtcbnZhciBnZXRQcm90b3R5cGVPZiA9IHJlcXVpcmUoJy4uL2ludGVybmFscy9vYmplY3QtZ2V0LXByb3RvdHlwZS1vZicpO1xudmFyIGRlZmluZUJ1aWx0SW4gPSByZXF1aXJlKCcuLi9pbnRlcm5hbHMvZGVmaW5lLWJ1aWx0LWluJyk7XG52YXIgd2VsbEtub3duU3ltYm9sID0gcmVxdWlyZSgnLi4vaW50ZXJuYWxzL3dlbGwta25vd24tc3ltYm9sJyk7XG52YXIgSVNfUFVSRSA9IHJlcXVpcmUoJy4uL2ludGVybmFscy9pcy1wdXJlJyk7XG5cbnZhciBJVEVSQVRPUiA9IHdlbGxLbm93blN5bWJvbCgnaXRlcmF0b3InKTtcbnZhciBCVUdHWV9TQUZBUklfSVRFUkFUT1JTID0gZmFsc2U7XG5cbi8vIGAlSXRlcmF0b3JQcm90b3R5cGUlYCBvYmplY3Rcbi8vIGh0dHBzOi8vdGMzOS5lcy9lY21hMjYyLyNzZWMtJWl0ZXJhdG9ycHJvdG90eXBlJS1vYmplY3RcbnZhciBJdGVyYXRvclByb3RvdHlwZSwgUHJvdG90eXBlT2ZBcnJheUl0ZXJhdG9yUHJvdG90eXBlLCBhcnJheUl0ZXJhdG9yO1xuXG4vKiBlc2xpbnQtZGlzYWJsZSBlcy9uby1hcnJheS1wcm90b3R5cGUta2V5cyAtLSBzYWZlICovXG5pZiAoW10ua2V5cykge1xuICBhcnJheUl0ZXJhdG9yID0gW10ua2V5cygpO1xuICAvLyBTYWZhcmkgOCBoYXMgYnVnZ3kgaXRlcmF0b3JzIHcvbyBgbmV4dGBcbiAgaWYgKCEoJ25leHQnIGluIGFycmF5SXRlcmF0b3IpKSBCVUdHWV9TQUZBUklfSVRFUkFUT1JTID0gdHJ1ZTtcbiAgZWxzZSB7XG4gICAgUHJvdG90eXBlT2ZBcnJheUl0ZXJhdG9yUHJvdG90eXBlID0gZ2V0UHJvdG90eXBlT2YoZ2V0UHJvdG90eXBlT2YoYXJyYXlJdGVyYXRvcikpO1xuICAgIGlmIChQcm90b3R5cGVPZkFycmF5SXRlcmF0b3JQcm90b3R5cGUgIT09IE9iamVjdC5wcm90b3R5cGUpIEl0ZXJhdG9yUHJvdG90eXBlID0gUHJvdG90eXBlT2ZBcnJheUl0ZXJhdG9yUHJvdG90eXBlO1xuICB9XG59XG5cbnZhciBORVdfSVRFUkFUT1JfUFJPVE9UWVBFID0gIWlzT2JqZWN0KEl0ZXJhdG9yUHJvdG90eXBlKSB8fCBmYWlscyhmdW5jdGlvbiAoKSB7XG4gIHZhciB0ZXN0ID0ge307XG4gIC8vIEZGNDQtIGxlZ2FjeSBpdGVyYXRvcnMgY2FzZVxuICByZXR1cm4gSXRlcmF0b3JQcm90b3R5cGVbSVRFUkFUT1JdLmNhbGwodGVzdCkgIT09IHRlc3Q7XG59KTtcblxuaWYgKE5FV19JVEVSQVRPUl9QUk9UT1RZUEUpIEl0ZXJhdG9yUHJvdG90eXBlID0ge307XG5lbHNlIGlmIChJU19QVVJFKSBJdGVyYXRvclByb3RvdHlwZSA9IGNyZWF0ZShJdGVyYXRvclByb3RvdHlwZSk7XG5cbi8vIGAlSXRlcmF0b3JQcm90b3R5cGUlW0BAaXRlcmF0b3JdKClgIG1ldGhvZFxuLy8gaHR0cHM6Ly90YzM5LmVzL2VjbWEyNjIvI3NlYy0laXRlcmF0b3Jwcm90b3R5cGUlLUBAaXRlcmF0b3JcbmlmICghaXNDYWxsYWJsZShJdGVyYXRvclByb3RvdHlwZVtJVEVSQVRPUl0pKSB7XG4gIGRlZmluZUJ1aWx0SW4oSXRlcmF0b3JQcm90b3R5cGUsIElURVJBVE9SLCBmdW5jdGlvbiAoKSB7XG4gICAgcmV0dXJuIHRoaXM7XG4gIH0pO1xufVxuXG5tb2R1bGUuZXhwb3J0cyA9IHtcbiAgSXRlcmF0b3JQcm90b3R5cGU6IEl0ZXJhdG9yUHJvdG90eXBlLFxuICBCVUdHWV9TQUZBUklfSVRFUkFUT1JTOiBCVUdHWV9TQUZBUklfSVRFUkFUT1JTXG59O1xuIiwiJ3VzZSBzdHJpY3QnO1xubW9kdWxlLmV4cG9ydHMgPSB7fTtcbiIsIid1c2Ugc3RyaWN0JztcbnZhciB0b0xlbmd0aCA9IHJlcXVpcmUoJy4uL2ludGVybmFscy90by1sZW5ndGgnKTtcblxuLy8gYExlbmd0aE9mQXJyYXlMaWtlYCBhYnN0cmFjdCBvcGVyYXRpb25cbi8vIGh0dHBzOi8vdGMzOS5lcy9lY21hMjYyLyNzZWMtbGVuZ3Rob2ZhcnJheWxpa2Vcbm1vZHVsZS5leHBvcnRzID0gZnVuY3Rpb24gKG9iaikge1xuICByZXR1cm4gdG9MZW5ndGgob2JqLmxlbmd0aCk7XG59O1xuIiwiJ3VzZSBzdHJpY3QnO1xudmFyIHVuY3VycnlUaGlzID0gcmVxdWlyZSgnLi4vaW50ZXJuYWxzL2Z1bmN0aW9uLXVuY3VycnktdGhpcycpO1xudmFyIGZhaWxzID0gcmVxdWlyZSgnLi4vaW50ZXJuYWxzL2ZhaWxzJyk7XG52YXIgaXNDYWxsYWJsZSA9IHJlcXVpcmUoJy4uL2ludGVybmFscy9pcy1jYWxsYWJsZScpO1xudmFyIGhhc093biA9IHJlcXVpcmUoJy4uL2ludGVybmFscy9oYXMtb3duLXByb3BlcnR5Jyk7XG52YXIgREVTQ1JJUFRPUlMgPSByZXF1aXJlKCcuLi9pbnRlcm5hbHMvZGVzY3JpcHRvcnMnKTtcbnZhciBDT05GSUdVUkFCTEVfRlVOQ1RJT05fTkFNRSA9IHJlcXVpcmUoJy4uL2ludGVybmFscy9mdW5jdGlvbi1uYW1lJykuQ09ORklHVVJBQkxFO1xudmFyIGluc3BlY3RTb3VyY2UgPSByZXF1aXJlKCcuLi9pbnRlcm5hbHMvaW5zcGVjdC1zb3VyY2UnKTtcbnZhciBJbnRlcm5hbFN0YXRlTW9kdWxlID0gcmVxdWlyZSgnLi4vaW50ZXJuYWxzL2ludGVybmFsLXN0YXRlJyk7XG5cbnZhciBlbmZvcmNlSW50ZXJuYWxTdGF0ZSA9IEludGVybmFsU3RhdGVNb2R1bGUuZW5mb3JjZTtcbnZhciBnZXRJbnRlcm5hbFN0YXRlID0gSW50ZXJuYWxTdGF0ZU1vZHVsZS5nZXQ7XG52YXIgJFN0cmluZyA9IFN0cmluZztcbi8vIGVzbGludC1kaXNhYmxlLW5leHQtbGluZSBlcy9uby1vYmplY3QtZGVmaW5lcHJvcGVydHkgLS0gc2FmZVxudmFyIGRlZmluZVByb3BlcnR5ID0gT2JqZWN0LmRlZmluZVByb3BlcnR5O1xudmFyIHN0cmluZ1NsaWNlID0gdW5jdXJyeVRoaXMoJycuc2xpY2UpO1xudmFyIHJlcGxhY2UgPSB1bmN1cnJ5VGhpcygnJy5yZXBsYWNlKTtcbnZhciBqb2luID0gdW5jdXJyeVRoaXMoW10uam9pbik7XG5cbnZhciBDT05GSUdVUkFCTEVfTEVOR1RIID0gREVTQ1JJUFRPUlMgJiYgIWZhaWxzKGZ1bmN0aW9uICgpIHtcbiAgcmV0dXJuIGRlZmluZVByb3BlcnR5KGZ1bmN0aW9uICgpIHsgLyogZW1wdHkgKi8gfSwgJ2xlbmd0aCcsIHsgdmFsdWU6IDggfSkubGVuZ3RoICE9PSA4O1xufSk7XG5cbnZhciBURU1QTEFURSA9IFN0cmluZyhTdHJpbmcpLnNwbGl0KCdTdHJpbmcnKTtcblxudmFyIG1ha2VCdWlsdEluID0gbW9kdWxlLmV4cG9ydHMgPSBmdW5jdGlvbiAodmFsdWUsIG5hbWUsIG9wdGlvbnMpIHtcbiAgaWYgKHN0cmluZ1NsaWNlKCRTdHJpbmcobmFtZSksIDAsIDcpID09PSAnU3ltYm9sKCcpIHtcbiAgICBuYW1lID0gJ1snICsgcmVwbGFjZSgkU3RyaW5nKG5hbWUpLCAvXlN5bWJvbFxcKChbXildKilcXCkuKiQvLCAnJDEnKSArICddJztcbiAgfVxuICBpZiAob3B0aW9ucyAmJiBvcHRpb25zLmdldHRlcikgbmFtZSA9ICdnZXQgJyArIG5hbWU7XG4gIGlmIChvcHRpb25zICYmIG9wdGlvbnMuc2V0dGVyKSBuYW1lID0gJ3NldCAnICsgbmFtZTtcbiAgaWYgKCFoYXNPd24odmFsdWUsICduYW1lJykgfHwgKENPTkZJR1VSQUJMRV9GVU5DVElPTl9OQU1FICYmIHZhbHVlLm5hbWUgIT09IG5hbWUpKSB7XG4gICAgaWYgKERFU0NSSVBUT1JTKSBkZWZpbmVQcm9wZXJ0eSh2YWx1ZSwgJ25hbWUnLCB7IHZhbHVlOiBuYW1lLCBjb25maWd1cmFibGU6IHRydWUgfSk7XG4gICAgZWxzZSB2YWx1ZS5uYW1lID0gbmFtZTtcbiAgfVxuICBpZiAoQ09ORklHVVJBQkxFX0xFTkdUSCAmJiBvcHRpb25zICYmIGhhc093bihvcHRpb25zLCAnYXJpdHknKSAmJiB2YWx1ZS5sZW5ndGggIT09IG9wdGlvbnMuYXJpdHkpIHtcbiAgICBkZWZpbmVQcm9wZXJ0eSh2YWx1ZSwgJ2xlbmd0aCcsIHsgdmFsdWU6IG9wdGlvbnMuYXJpdHkgfSk7XG4gIH1cbiAgdHJ5IHtcbiAgICBpZiAob3B0aW9ucyAmJiBoYXNPd24ob3B0aW9ucywgJ2NvbnN0cnVjdG9yJykgJiYgb3B0aW9ucy5jb25zdHJ1Y3Rvcikge1xuICAgICAgaWYgKERFU0NSSVBUT1JTKSBkZWZpbmVQcm9wZXJ0eSh2YWx1ZSwgJ3Byb3RvdHlwZScsIHsgd3JpdGFibGU6IGZhbHNlIH0pO1xuICAgIC8vIGluIFY4IH4gQ2hyb21lIDUzLCBwcm90b3R5cGVzIG9mIHNvbWUgbWV0aG9kcywgbGlrZSBgQXJyYXkucHJvdG90eXBlLnZhbHVlc2AsIGFyZSBub24td3JpdGFibGVcbiAgICB9IGVsc2UgaWYgKHZhbHVlLnByb3RvdHlwZSkgdmFsdWUucHJvdG90eXBlID0gdW5kZWZpbmVkO1xuICB9IGNhdGNoIChlcnJvcikgeyAvKiBlbXB0eSAqLyB9XG4gIHZhciBzdGF0ZSA9IGVuZm9yY2VJbnRlcm5hbFN0YXRlKHZhbHVlKTtcbiAgaWYgKCFoYXNPd24oc3RhdGUsICdzb3VyY2UnKSkge1xuICAgIHN0YXRlLnNvdXJjZSA9IGpvaW4oVEVNUExBVEUsIHR5cGVvZiBuYW1lID09ICdzdHJpbmcnID8gbmFtZSA6ICcnKTtcbiAgfSByZXR1cm4gdmFsdWU7XG59O1xuXG4vLyBhZGQgZmFrZSBGdW5jdGlvbiN0b1N0cmluZyBmb3IgY29ycmVjdCB3b3JrIHdyYXBwZWQgbWV0aG9kcyAvIGNvbnN0cnVjdG9ycyB3aXRoIG1ldGhvZHMgbGlrZSBMb0Rhc2ggaXNOYXRpdmVcbi8vIGVzbGludC1kaXNhYmxlLW5leHQtbGluZSBuby1leHRlbmQtbmF0aXZlIC0tIHJlcXVpcmVkXG5GdW5jdGlvbi5wcm90b3R5cGUudG9TdHJpbmcgPSBtYWtlQnVpbHRJbihmdW5jdGlvbiB0b1N0cmluZygpIHtcbiAgcmV0dXJuIGlzQ2FsbGFibGUodGhpcykgJiYgZ2V0SW50ZXJuYWxTdGF0ZSh0aGlzKS5zb3VyY2UgfHwgaW5zcGVjdFNvdXJjZSh0aGlzKTtcbn0sICd0b1N0cmluZycpO1xuIiwiJ3VzZSBzdHJpY3QnO1xudmFyIGNlaWwgPSBNYXRoLmNlaWw7XG52YXIgZmxvb3IgPSBNYXRoLmZsb29yO1xuXG4vLyBgTWF0aC50cnVuY2AgbWV0aG9kXG4vLyBodHRwczovL3RjMzkuZXMvZWNtYTI2Mi8jc2VjLW1hdGgudHJ1bmNcbi8vIGVzbGludC1kaXNhYmxlLW5leHQtbGluZSBlcy9uby1tYXRoLXRydW5jIC0tIHNhZmVcbm1vZHVsZS5leHBvcnRzID0gTWF0aC50cnVuYyB8fCBmdW5jdGlvbiB0cnVuYyh4KSB7XG4gIHZhciBuID0gK3g7XG4gIHJldHVybiAobiA+IDAgPyBmbG9vciA6IGNlaWwpKG4pO1xufTtcbiIsIid1c2Ugc3RyaWN0JztcbnZhciBERVNDUklQVE9SUyA9IHJlcXVpcmUoJy4uL2ludGVybmFscy9kZXNjcmlwdG9ycycpO1xudmFyIHVuY3VycnlUaGlzID0gcmVxdWlyZSgnLi4vaW50ZXJuYWxzL2Z1bmN0aW9uLXVuY3VycnktdGhpcycpO1xudmFyIGNhbGwgPSByZXF1aXJlKCcuLi9pbnRlcm5hbHMvZnVuY3Rpb24tY2FsbCcpO1xudmFyIGZhaWxzID0gcmVxdWlyZSgnLi4vaW50ZXJuYWxzL2ZhaWxzJyk7XG52YXIgb2JqZWN0S2V5cyA9IHJlcXVpcmUoJy4uL2ludGVybmFscy9vYmplY3Qta2V5cycpO1xudmFyIGdldE93blByb3BlcnR5U3ltYm9sc01vZHVsZSA9IHJlcXVpcmUoJy4uL2ludGVybmFscy9vYmplY3QtZ2V0LW93bi1wcm9wZXJ0eS1zeW1ib2xzJyk7XG52YXIgcHJvcGVydHlJc0VudW1lcmFibGVNb2R1bGUgPSByZXF1aXJlKCcuLi9pbnRlcm5hbHMvb2JqZWN0LXByb3BlcnR5LWlzLWVudW1lcmFibGUnKTtcbnZhciB0b09iamVjdCA9IHJlcXVpcmUoJy4uL2ludGVybmFscy90by1vYmplY3QnKTtcbnZhciBJbmRleGVkT2JqZWN0ID0gcmVxdWlyZSgnLi4vaW50ZXJuYWxzL2luZGV4ZWQtb2JqZWN0Jyk7XG5cbi8vIGVzbGludC1kaXNhYmxlLW5leHQtbGluZSBlcy9uby1vYmplY3QtYXNzaWduIC0tIHNhZmVcbnZhciAkYXNzaWduID0gT2JqZWN0LmFzc2lnbjtcbi8vIGVzbGludC1kaXNhYmxlLW5leHQtbGluZSBlcy9uby1vYmplY3QtZGVmaW5lcHJvcGVydHkgLS0gcmVxdWlyZWQgZm9yIHRlc3RpbmdcbnZhciBkZWZpbmVQcm9wZXJ0eSA9IE9iamVjdC5kZWZpbmVQcm9wZXJ0eTtcbnZhciBjb25jYXQgPSB1bmN1cnJ5VGhpcyhbXS5jb25jYXQpO1xuXG4vLyBgT2JqZWN0LmFzc2lnbmAgbWV0aG9kXG4vLyBodHRwczovL3RjMzkuZXMvZWNtYTI2Mi8jc2VjLW9iamVjdC5hc3NpZ25cbm1vZHVsZS5leHBvcnRzID0gISRhc3NpZ24gfHwgZmFpbHMoZnVuY3Rpb24gKCkge1xuICAvLyBzaG91bGQgaGF2ZSBjb3JyZWN0IG9yZGVyIG9mIG9wZXJhdGlvbnMgKEVkZ2UgYnVnKVxuICBpZiAoREVTQ1JJUFRPUlMgJiYgJGFzc2lnbih7IGI6IDEgfSwgJGFzc2lnbihkZWZpbmVQcm9wZXJ0eSh7fSwgJ2EnLCB7XG4gICAgZW51bWVyYWJsZTogdHJ1ZSxcbiAgICBnZXQ6IGZ1bmN0aW9uICgpIHtcbiAgICAgIGRlZmluZVByb3BlcnR5KHRoaXMsICdiJywge1xuICAgICAgICB2YWx1ZTogMyxcbiAgICAgICAgZW51bWVyYWJsZTogZmFsc2VcbiAgICAgIH0pO1xuICAgIH1cbiAgfSksIHsgYjogMiB9KSkuYiAhPT0gMSkgcmV0dXJuIHRydWU7XG4gIC8vIHNob3VsZCB3b3JrIHdpdGggc3ltYm9scyBhbmQgc2hvdWxkIGhhdmUgZGV0ZXJtaW5pc3RpYyBwcm9wZXJ0eSBvcmRlciAoVjggYnVnKVxuICB2YXIgQSA9IHt9O1xuICB2YXIgQiA9IHt9O1xuICAvLyBlc2xpbnQtZGlzYWJsZS1uZXh0LWxpbmUgZXMvbm8tc3ltYm9sIC0tIHNhZmVcbiAgdmFyIHN5bWJvbCA9IFN5bWJvbCgnYXNzaWduIGRldGVjdGlvbicpO1xuICB2YXIgYWxwaGFiZXQgPSAnYWJjZGVmZ2hpamtsbW5vcHFyc3QnO1xuICBBW3N5bWJvbF0gPSA3O1xuICBhbHBoYWJldC5zcGxpdCgnJykuZm9yRWFjaChmdW5jdGlvbiAoY2hyKSB7IEJbY2hyXSA9IGNocjsgfSk7XG4gIHJldHVybiAkYXNzaWduKHt9LCBBKVtzeW1ib2xdICE9PSA3IHx8IG9iamVjdEtleXMoJGFzc2lnbih7fSwgQikpLmpvaW4oJycpICE9PSBhbHBoYWJldDtcbn0pID8gZnVuY3Rpb24gYXNzaWduKHRhcmdldCwgc291cmNlKSB7IC8vIGVzbGludC1kaXNhYmxlLWxpbmUgbm8tdW51c2VkLXZhcnMgLS0gcmVxdWlyZWQgZm9yIGAubGVuZ3RoYFxuICB2YXIgVCA9IHRvT2JqZWN0KHRhcmdldCk7XG4gIHZhciBhcmd1bWVudHNMZW5ndGggPSBhcmd1bWVudHMubGVuZ3RoO1xuICB2YXIgaW5kZXggPSAxO1xuICB2YXIgZ2V0T3duUHJvcGVydHlTeW1ib2xzID0gZ2V0T3duUHJvcGVydHlTeW1ib2xzTW9kdWxlLmY7XG4gIHZhciBwcm9wZXJ0eUlzRW51bWVyYWJsZSA9IHByb3BlcnR5SXNFbnVtZXJhYmxlTW9kdWxlLmY7XG4gIHdoaWxlIChhcmd1bWVudHNMZW5ndGggPiBpbmRleCkge1xuICAgIHZhciBTID0gSW5kZXhlZE9iamVjdChhcmd1bWVudHNbaW5kZXgrK10pO1xuICAgIHZhciBrZXlzID0gZ2V0T3duUHJvcGVydHlTeW1ib2xzID8gY29uY2F0KG9iamVjdEtleXMoUyksIGdldE93blByb3BlcnR5U3ltYm9scyhTKSkgOiBvYmplY3RLZXlzKFMpO1xuICAgIHZhciBsZW5ndGggPSBrZXlzLmxlbmd0aDtcbiAgICB2YXIgaiA9IDA7XG4gICAgdmFyIGtleTtcbiAgICB3aGlsZSAobGVuZ3RoID4gaikge1xuICAgICAga2V5ID0ga2V5c1tqKytdO1xuICAgICAgaWYgKCFERVNDUklQVE9SUyB8fCBjYWxsKHByb3BlcnR5SXNFbnVtZXJhYmxlLCBTLCBrZXkpKSBUW2tleV0gPSBTW2tleV07XG4gICAgfVxuICB9IHJldHVybiBUO1xufSA6ICRhc3NpZ247XG4iLCIndXNlIHN0cmljdCc7XG4vKiBnbG9iYWwgQWN0aXZlWE9iamVjdCAtLSBvbGQgSUUsIFdTSCAqL1xudmFyIGFuT2JqZWN0ID0gcmVxdWlyZSgnLi4vaW50ZXJuYWxzL2FuLW9iamVjdCcpO1xudmFyIGRlZmluZVByb3BlcnRpZXNNb2R1bGUgPSByZXF1aXJlKCcuLi9pbnRlcm5hbHMvb2JqZWN0LWRlZmluZS1wcm9wZXJ0aWVzJyk7XG52YXIgZW51bUJ1Z0tleXMgPSByZXF1aXJlKCcuLi9pbnRlcm5hbHMvZW51bS1idWcta2V5cycpO1xudmFyIGhpZGRlbktleXMgPSByZXF1aXJlKCcuLi9pbnRlcm5hbHMvaGlkZGVuLWtleXMnKTtcbnZhciBodG1sID0gcmVxdWlyZSgnLi4vaW50ZXJuYWxzL2h0bWwnKTtcbnZhciBkb2N1bWVudENyZWF0ZUVsZW1lbnQgPSByZXF1aXJlKCcuLi9pbnRlcm5hbHMvZG9jdW1lbnQtY3JlYXRlLWVsZW1lbnQnKTtcbnZhciBzaGFyZWRLZXkgPSByZXF1aXJlKCcuLi9pbnRlcm5hbHMvc2hhcmVkLWtleScpO1xuXG52YXIgR1QgPSAnPic7XG52YXIgTFQgPSAnPCc7XG52YXIgUFJPVE9UWVBFID0gJ3Byb3RvdHlwZSc7XG52YXIgU0NSSVBUID0gJ3NjcmlwdCc7XG52YXIgSUVfUFJPVE8gPSBzaGFyZWRLZXkoJ0lFX1BST1RPJyk7XG5cbnZhciBFbXB0eUNvbnN0cnVjdG9yID0gZnVuY3Rpb24gKCkgeyAvKiBlbXB0eSAqLyB9O1xuXG52YXIgc2NyaXB0VGFnID0gZnVuY3Rpb24gKGNvbnRlbnQpIHtcbiAgcmV0dXJuIExUICsgU0NSSVBUICsgR1QgKyBjb250ZW50ICsgTFQgKyAnLycgKyBTQ1JJUFQgKyBHVDtcbn07XG5cbi8vIENyZWF0ZSBvYmplY3Qgd2l0aCBmYWtlIGBudWxsYCBwcm90b3R5cGU6IHVzZSBBY3RpdmVYIE9iamVjdCB3aXRoIGNsZWFyZWQgcHJvdG90eXBlXG52YXIgTnVsbFByb3RvT2JqZWN0VmlhQWN0aXZlWCA9IGZ1bmN0aW9uIChhY3RpdmVYRG9jdW1lbnQpIHtcbiAgYWN0aXZlWERvY3VtZW50LndyaXRlKHNjcmlwdFRhZygnJykpO1xuICBhY3RpdmVYRG9jdW1lbnQuY2xvc2UoKTtcbiAgdmFyIHRlbXAgPSBhY3RpdmVYRG9jdW1lbnQucGFyZW50V2luZG93Lk9iamVjdDtcbiAgYWN0aXZlWERvY3VtZW50ID0gbnVsbDsgLy8gYXZvaWQgbWVtb3J5IGxlYWtcbiAgcmV0dXJuIHRlbXA7XG59O1xuXG4vLyBDcmVhdGUgb2JqZWN0IHdpdGggZmFrZSBgbnVsbGAgcHJvdG90eXBlOiB1c2UgaWZyYW1lIE9iamVjdCB3aXRoIGNsZWFyZWQgcHJvdG90eXBlXG52YXIgTnVsbFByb3RvT2JqZWN0VmlhSUZyYW1lID0gZnVuY3Rpb24gKCkge1xuICAvLyBUaHJhc2gsIHdhc3RlIGFuZCBzb2RvbXk6IElFIEdDIGJ1Z1xuICB2YXIgaWZyYW1lID0gZG9jdW1lbnRDcmVhdGVFbGVtZW50KCdpZnJhbWUnKTtcbiAgdmFyIEpTID0gJ2phdmEnICsgU0NSSVBUICsgJzonO1xuICB2YXIgaWZyYW1lRG9jdW1lbnQ7XG4gIGlmcmFtZS5zdHlsZS5kaXNwbGF5ID0gJ25vbmUnO1xuICBodG1sLmFwcGVuZENoaWxkKGlmcmFtZSk7XG4gIC8vIGh0dHBzOi8vZ2l0aHViLmNvbS96bG9pcm9jay9jb3JlLWpzL2lzc3Vlcy80NzVcbiAgaWZyYW1lLnNyYyA9IFN0cmluZyhKUyk7XG4gIGlmcmFtZURvY3VtZW50ID0gaWZyYW1lLmNvbnRlbnRXaW5kb3cuZG9jdW1lbnQ7XG4gIGlmcmFtZURvY3VtZW50Lm9wZW4oKTtcbiAgaWZyYW1lRG9jdW1lbnQud3JpdGUoc2NyaXB0VGFnKCdkb2N1bWVudC5GPU9iamVjdCcpKTtcbiAgaWZyYW1lRG9jdW1lbnQuY2xvc2UoKTtcbiAgcmV0dXJuIGlmcmFtZURvY3VtZW50LkY7XG59O1xuXG4vLyBDaGVjayBmb3IgZG9jdW1lbnQuZG9tYWluIGFuZCBhY3RpdmUgeCBzdXBwb3J0XG4vLyBObyBuZWVkIHRvIHVzZSBhY3RpdmUgeCBhcHByb2FjaCB3aGVuIGRvY3VtZW50LmRvbWFpbiBpcyBub3Qgc2V0XG4vLyBzZWUgaHR0cHM6Ly9naXRodWIuY29tL2VzLXNoaW1zL2VzNS1zaGltL2lzc3Vlcy8xNTBcbi8vIHZhcmlhdGlvbiBvZiBodHRwczovL2dpdGh1Yi5jb20va2l0Y2FtYnJpZGdlL2VzNS1zaGltL2NvbW1pdC80ZjczOGFjMDY2MzQ2XG4vLyBhdm9pZCBJRSBHQyBidWdcbnZhciBhY3RpdmVYRG9jdW1lbnQ7XG52YXIgTnVsbFByb3RvT2JqZWN0ID0gZnVuY3Rpb24gKCkge1xuICB0cnkge1xuICAgIGFjdGl2ZVhEb2N1bWVudCA9IG5ldyBBY3RpdmVYT2JqZWN0KCdodG1sZmlsZScpO1xuICB9IGNhdGNoIChlcnJvcikgeyAvKiBpZ25vcmUgKi8gfVxuICBOdWxsUHJvdG9PYmplY3QgPSB0eXBlb2YgZG9jdW1lbnQgIT0gJ3VuZGVmaW5lZCdcbiAgICA/IGRvY3VtZW50LmRvbWFpbiAmJiBhY3RpdmVYRG9jdW1lbnRcbiAgICAgID8gTnVsbFByb3RvT2JqZWN0VmlhQWN0aXZlWChhY3RpdmVYRG9jdW1lbnQpIC8vIG9sZCBJRVxuICAgICAgOiBOdWxsUHJvdG9PYmplY3RWaWFJRnJhbWUoKVxuICAgIDogTnVsbFByb3RvT2JqZWN0VmlhQWN0aXZlWChhY3RpdmVYRG9jdW1lbnQpOyAvLyBXU0hcbiAgdmFyIGxlbmd0aCA9IGVudW1CdWdLZXlzLmxlbmd0aDtcbiAgd2hpbGUgKGxlbmd0aC0tKSBkZWxldGUgTnVsbFByb3RvT2JqZWN0W1BST1RPVFlQRV1bZW51bUJ1Z0tleXNbbGVuZ3RoXV07XG4gIHJldHVybiBOdWxsUHJvdG9PYmplY3QoKTtcbn07XG5cbmhpZGRlbktleXNbSUVfUFJPVE9dID0gdHJ1ZTtcblxuLy8gYE9iamVjdC5jcmVhdGVgIG1ldGhvZFxuLy8gaHR0cHM6Ly90YzM5LmVzL2VjbWEyNjIvI3NlYy1vYmplY3QuY3JlYXRlXG4vLyBlc2xpbnQtZGlzYWJsZS1uZXh0LWxpbmUgZXMvbm8tb2JqZWN0LWNyZWF0ZSAtLSBzYWZlXG5tb2R1bGUuZXhwb3J0cyA9IE9iamVjdC5jcmVhdGUgfHwgZnVuY3Rpb24gY3JlYXRlKE8sIFByb3BlcnRpZXMpIHtcbiAgdmFyIHJlc3VsdDtcbiAgaWYgKE8gIT09IG51bGwpIHtcbiAgICBFbXB0eUNvbnN0cnVjdG9yW1BST1RPVFlQRV0gPSBhbk9iamVjdChPKTtcbiAgICByZXN1bHQgPSBuZXcgRW1wdHlDb25zdHJ1Y3RvcigpO1xuICAgIEVtcHR5Q29uc3RydWN0b3JbUFJPVE9UWVBFXSA9IG51bGw7XG4gICAgLy8gYWRkIFwiX19wcm90b19fXCIgZm9yIE9iamVjdC5nZXRQcm90b3R5cGVPZiBwb2x5ZmlsbFxuICAgIHJlc3VsdFtJRV9QUk9UT10gPSBPO1xuICB9IGVsc2UgcmVzdWx0ID0gTnVsbFByb3RvT2JqZWN0KCk7XG4gIHJldHVybiBQcm9wZXJ0aWVzID09PSB1bmRlZmluZWQgPyByZXN1bHQgOiBkZWZpbmVQcm9wZXJ0aWVzTW9kdWxlLmYocmVzdWx0LCBQcm9wZXJ0aWVzKTtcbn07XG4iLCIndXNlIHN0cmljdCc7XG52YXIgREVTQ1JJUFRPUlMgPSByZXF1aXJlKCcuLi9pbnRlcm5hbHMvZGVzY3JpcHRvcnMnKTtcbnZhciBWOF9QUk9UT1RZUEVfREVGSU5FX0JVRyA9IHJlcXVpcmUoJy4uL2ludGVybmFscy92OC1wcm90b3R5cGUtZGVmaW5lLWJ1ZycpO1xudmFyIGRlZmluZVByb3BlcnR5TW9kdWxlID0gcmVxdWlyZSgnLi4vaW50ZXJuYWxzL29iamVjdC1kZWZpbmUtcHJvcGVydHknKTtcbnZhciBhbk9iamVjdCA9IHJlcXVpcmUoJy4uL2ludGVybmFscy9hbi1vYmplY3QnKTtcbnZhciB0b0luZGV4ZWRPYmplY3QgPSByZXF1aXJlKCcuLi9pbnRlcm5hbHMvdG8taW5kZXhlZC1vYmplY3QnKTtcbnZhciBvYmplY3RLZXlzID0gcmVxdWlyZSgnLi4vaW50ZXJuYWxzL29iamVjdC1rZXlzJyk7XG5cbi8vIGBPYmplY3QuZGVmaW5lUHJvcGVydGllc2AgbWV0aG9kXG4vLyBodHRwczovL3RjMzkuZXMvZWNtYTI2Mi8jc2VjLW9iamVjdC5kZWZpbmVwcm9wZXJ0aWVzXG4vLyBlc2xpbnQtZGlzYWJsZS1uZXh0LWxpbmUgZXMvbm8tb2JqZWN0LWRlZmluZXByb3BlcnRpZXMgLS0gc2FmZVxuZXhwb3J0cy5mID0gREVTQ1JJUFRPUlMgJiYgIVY4X1BST1RPVFlQRV9ERUZJTkVfQlVHID8gT2JqZWN0LmRlZmluZVByb3BlcnRpZXMgOiBmdW5jdGlvbiBkZWZpbmVQcm9wZXJ0aWVzKE8sIFByb3BlcnRpZXMpIHtcbiAgYW5PYmplY3QoTyk7XG4gIHZhciBwcm9wcyA9IHRvSW5kZXhlZE9iamVjdChQcm9wZXJ0aWVzKTtcbiAgdmFyIGtleXMgPSBvYmplY3RLZXlzKFByb3BlcnRpZXMpO1xuICB2YXIgbGVuZ3RoID0ga2V5cy5sZW5ndGg7XG4gIHZhciBpbmRleCA9IDA7XG4gIHZhciBrZXk7XG4gIHdoaWxlIChsZW5ndGggPiBpbmRleCkgZGVmaW5lUHJvcGVydHlNb2R1bGUuZihPLCBrZXkgPSBrZXlzW2luZGV4KytdLCBwcm9wc1trZXldKTtcbiAgcmV0dXJuIE87XG59O1xuIiwiJ3VzZSBzdHJpY3QnO1xudmFyIERFU0NSSVBUT1JTID0gcmVxdWlyZSgnLi4vaW50ZXJuYWxzL2Rlc2NyaXB0b3JzJyk7XG52YXIgSUU4X0RPTV9ERUZJTkUgPSByZXF1aXJlKCcuLi9pbnRlcm5hbHMvaWU4LWRvbS1kZWZpbmUnKTtcbnZhciBWOF9QUk9UT1RZUEVfREVGSU5FX0JVRyA9IHJlcXVpcmUoJy4uL2ludGVybmFscy92OC1wcm90b3R5cGUtZGVmaW5lLWJ1ZycpO1xudmFyIGFuT2JqZWN0ID0gcmVxdWlyZSgnLi4vaW50ZXJuYWxzL2FuLW9iamVjdCcpO1xudmFyIHRvUHJvcGVydHlLZXkgPSByZXF1aXJlKCcuLi9pbnRlcm5hbHMvdG8tcHJvcGVydHkta2V5Jyk7XG5cbnZhciAkVHlwZUVycm9yID0gVHlwZUVycm9yO1xuLy8gZXNsaW50LWRpc2FibGUtbmV4dC1saW5lIGVzL25vLW9iamVjdC1kZWZpbmVwcm9wZXJ0eSAtLSBzYWZlXG52YXIgJGRlZmluZVByb3BlcnR5ID0gT2JqZWN0LmRlZmluZVByb3BlcnR5O1xuLy8gZXNsaW50LWRpc2FibGUtbmV4dC1saW5lIGVzL25vLW9iamVjdC1nZXRvd25wcm9wZXJ0eWRlc2NyaXB0b3IgLS0gc2FmZVxudmFyICRnZXRPd25Qcm9wZXJ0eURlc2NyaXB0b3IgPSBPYmplY3QuZ2V0T3duUHJvcGVydHlEZXNjcmlwdG9yO1xudmFyIEVOVU1FUkFCTEUgPSAnZW51bWVyYWJsZSc7XG52YXIgQ09ORklHVVJBQkxFID0gJ2NvbmZpZ3VyYWJsZSc7XG52YXIgV1JJVEFCTEUgPSAnd3JpdGFibGUnO1xuXG4vLyBgT2JqZWN0LmRlZmluZVByb3BlcnR5YCBtZXRob2Rcbi8vIGh0dHBzOi8vdGMzOS5lcy9lY21hMjYyLyNzZWMtb2JqZWN0LmRlZmluZXByb3BlcnR5XG5leHBvcnRzLmYgPSBERVNDUklQVE9SUyA/IFY4X1BST1RPVFlQRV9ERUZJTkVfQlVHID8gZnVuY3Rpb24gZGVmaW5lUHJvcGVydHkoTywgUCwgQXR0cmlidXRlcykge1xuICBhbk9iamVjdChPKTtcbiAgUCA9IHRvUHJvcGVydHlLZXkoUCk7XG4gIGFuT2JqZWN0KEF0dHJpYnV0ZXMpO1xuICBpZiAodHlwZW9mIE8gPT09ICdmdW5jdGlvbicgJiYgUCA9PT0gJ3Byb3RvdHlwZScgJiYgJ3ZhbHVlJyBpbiBBdHRyaWJ1dGVzICYmIFdSSVRBQkxFIGluIEF0dHJpYnV0ZXMgJiYgIUF0dHJpYnV0ZXNbV1JJVEFCTEVdKSB7XG4gICAgdmFyIGN1cnJlbnQgPSAkZ2V0T3duUHJvcGVydHlEZXNjcmlwdG9yKE8sIFApO1xuICAgIGlmIChjdXJyZW50ICYmIGN1cnJlbnRbV1JJVEFCTEVdKSB7XG4gICAgICBPW1BdID0gQXR0cmlidXRlcy52YWx1ZTtcbiAgICAgIEF0dHJpYnV0ZXMgPSB7XG4gICAgICAgIGNvbmZpZ3VyYWJsZTogQ09ORklHVVJBQkxFIGluIEF0dHJpYnV0ZXMgPyBBdHRyaWJ1dGVzW0NPTkZJR1VSQUJMRV0gOiBjdXJyZW50W0NPTkZJR1VSQUJMRV0sXG4gICAgICAgIGVudW1lcmFibGU6IEVOVU1FUkFCTEUgaW4gQXR0cmlidXRlcyA/IEF0dHJpYnV0ZXNbRU5VTUVSQUJMRV0gOiBjdXJyZW50W0VOVU1FUkFCTEVdLFxuICAgICAgICB3cml0YWJsZTogZmFsc2VcbiAgICAgIH07XG4gICAgfVxuICB9IHJldHVybiAkZGVmaW5lUHJvcGVydHkoTywgUCwgQXR0cmlidXRlcyk7XG59IDogJGRlZmluZVByb3BlcnR5IDogZnVuY3Rpb24gZGVmaW5lUHJvcGVydHkoTywgUCwgQXR0cmlidXRlcykge1xuICBhbk9iamVjdChPKTtcbiAgUCA9IHRvUHJvcGVydHlLZXkoUCk7XG4gIGFuT2JqZWN0KEF0dHJpYnV0ZXMpO1xuICBpZiAoSUU4X0RPTV9ERUZJTkUpIHRyeSB7XG4gICAgcmV0dXJuICRkZWZpbmVQcm9wZXJ0eShPLCBQLCBBdHRyaWJ1dGVzKTtcbiAgfSBjYXRjaCAoZXJyb3IpIHsgLyogZW1wdHkgKi8gfVxuICBpZiAoJ2dldCcgaW4gQXR0cmlidXRlcyB8fCAnc2V0JyBpbiBBdHRyaWJ1dGVzKSB0aHJvdyBuZXcgJFR5cGVFcnJvcignQWNjZXNzb3JzIG5vdCBzdXBwb3J0ZWQnKTtcbiAgaWYgKCd2YWx1ZScgaW4gQXR0cmlidXRlcykgT1tQXSA9IEF0dHJpYnV0ZXMudmFsdWU7XG4gIHJldHVybiBPO1xufTtcbiIsIid1c2Ugc3RyaWN0JztcbnZhciBERVNDUklQVE9SUyA9IHJlcXVpcmUoJy4uL2ludGVybmFscy9kZXNjcmlwdG9ycycpO1xudmFyIGNhbGwgPSByZXF1aXJlKCcuLi9pbnRlcm5hbHMvZnVuY3Rpb24tY2FsbCcpO1xudmFyIHByb3BlcnR5SXNFbnVtZXJhYmxlTW9kdWxlID0gcmVxdWlyZSgnLi4vaW50ZXJuYWxzL29iamVjdC1wcm9wZXJ0eS1pcy1lbnVtZXJhYmxlJyk7XG52YXIgY3JlYXRlUHJvcGVydHlEZXNjcmlwdG9yID0gcmVxdWlyZSgnLi4vaW50ZXJuYWxzL2NyZWF0ZS1wcm9wZXJ0eS1kZXNjcmlwdG9yJyk7XG52YXIgdG9JbmRleGVkT2JqZWN0ID0gcmVxdWlyZSgnLi4vaW50ZXJuYWxzL3RvLWluZGV4ZWQtb2JqZWN0Jyk7XG52YXIgdG9Qcm9wZXJ0eUtleSA9IHJlcXVpcmUoJy4uL2ludGVybmFscy90by1wcm9wZXJ0eS1rZXknKTtcbnZhciBoYXNPd24gPSByZXF1aXJlKCcuLi9pbnRlcm5hbHMvaGFzLW93bi1wcm9wZXJ0eScpO1xudmFyIElFOF9ET01fREVGSU5FID0gcmVxdWlyZSgnLi4vaW50ZXJuYWxzL2llOC1kb20tZGVmaW5lJyk7XG5cbi8vIGVzbGludC1kaXNhYmxlLW5leHQtbGluZSBlcy9uby1vYmplY3QtZ2V0b3ducHJvcGVydHlkZXNjcmlwdG9yIC0tIHNhZmVcbnZhciAkZ2V0T3duUHJvcGVydHlEZXNjcmlwdG9yID0gT2JqZWN0LmdldE93blByb3BlcnR5RGVzY3JpcHRvcjtcblxuLy8gYE9iamVjdC5nZXRPd25Qcm9wZXJ0eURlc2NyaXB0b3JgIG1ldGhvZFxuLy8gaHR0cHM6Ly90YzM5LmVzL2VjbWEyNjIvI3NlYy1vYmplY3QuZ2V0b3ducHJvcGVydHlkZXNjcmlwdG9yXG5leHBvcnRzLmYgPSBERVNDUklQVE9SUyA/ICRnZXRPd25Qcm9wZXJ0eURlc2NyaXB0b3IgOiBmdW5jdGlvbiBnZXRPd25Qcm9wZXJ0eURlc2NyaXB0b3IoTywgUCkge1xuICBPID0gdG9JbmRleGVkT2JqZWN0KE8pO1xuICBQID0gdG9Qcm9wZXJ0eUtleShQKTtcbiAgaWYgKElFOF9ET01fREVGSU5FKSB0cnkge1xuICAgIHJldHVybiAkZ2V0T3duUHJvcGVydHlEZXNjcmlwdG9yKE8sIFApO1xuICB9IGNhdGNoIChlcnJvcikgeyAvKiBlbXB0eSAqLyB9XG4gIGlmIChoYXNPd24oTywgUCkpIHJldHVybiBjcmVhdGVQcm9wZXJ0eURlc2NyaXB0b3IoIWNhbGwocHJvcGVydHlJc0VudW1lcmFibGVNb2R1bGUuZiwgTywgUCksIE9bUF0pO1xufTtcbiIsIid1c2Ugc3RyaWN0JztcbnZhciBpbnRlcm5hbE9iamVjdEtleXMgPSByZXF1aXJlKCcuLi9pbnRlcm5hbHMvb2JqZWN0LWtleXMtaW50ZXJuYWwnKTtcbnZhciBlbnVtQnVnS2V5cyA9IHJlcXVpcmUoJy4uL2ludGVybmFscy9lbnVtLWJ1Zy1rZXlzJyk7XG5cbnZhciBoaWRkZW5LZXlzID0gZW51bUJ1Z0tleXMuY29uY2F0KCdsZW5ndGgnLCAncHJvdG90eXBlJyk7XG5cbi8vIGBPYmplY3QuZ2V0T3duUHJvcGVydHlOYW1lc2AgbWV0aG9kXG4vLyBodHRwczovL3RjMzkuZXMvZWNtYTI2Mi8jc2VjLW9iamVjdC5nZXRvd25wcm9wZXJ0eW5hbWVzXG4vLyBlc2xpbnQtZGlzYWJsZS1uZXh0LWxpbmUgZXMvbm8tb2JqZWN0LWdldG93bnByb3BlcnR5bmFtZXMgLS0gc2FmZVxuZXhwb3J0cy5mID0gT2JqZWN0LmdldE93blByb3BlcnR5TmFtZXMgfHwgZnVuY3Rpb24gZ2V0T3duUHJvcGVydHlOYW1lcyhPKSB7XG4gIHJldHVybiBpbnRlcm5hbE9iamVjdEtleXMoTywgaGlkZGVuS2V5cyk7XG59O1xuIiwiJ3VzZSBzdHJpY3QnO1xuLy8gZXNsaW50LWRpc2FibGUtbmV4dC1saW5lIGVzL25vLW9iamVjdC1nZXRvd25wcm9wZXJ0eXN5bWJvbHMgLS0gc2FmZVxuZXhwb3J0cy5mID0gT2JqZWN0LmdldE93blByb3BlcnR5U3ltYm9scztcbiIsIid1c2Ugc3RyaWN0JztcbnZhciBoYXNPd24gPSByZXF1aXJlKCcuLi9pbnRlcm5hbHMvaGFzLW93bi1wcm9wZXJ0eScpO1xudmFyIGlzQ2FsbGFibGUgPSByZXF1aXJlKCcuLi9pbnRlcm5hbHMvaXMtY2FsbGFibGUnKTtcbnZhciB0b09iamVjdCA9IHJlcXVpcmUoJy4uL2ludGVybmFscy90by1vYmplY3QnKTtcbnZhciBzaGFyZWRLZXkgPSByZXF1aXJlKCcuLi9pbnRlcm5hbHMvc2hhcmVkLWtleScpO1xudmFyIENPUlJFQ1RfUFJPVE9UWVBFX0dFVFRFUiA9IHJlcXVpcmUoJy4uL2ludGVybmFscy9jb3JyZWN0LXByb3RvdHlwZS1nZXR0ZXInKTtcblxudmFyIElFX1BST1RPID0gc2hhcmVkS2V5KCdJRV9QUk9UTycpO1xudmFyICRPYmplY3QgPSBPYmplY3Q7XG52YXIgT2JqZWN0UHJvdG90eXBlID0gJE9iamVjdC5wcm90b3R5cGU7XG5cbi8vIGBPYmplY3QuZ2V0UHJvdG90eXBlT2ZgIG1ldGhvZFxuLy8gaHR0cHM6Ly90YzM5LmVzL2VjbWEyNjIvI3NlYy1vYmplY3QuZ2V0cHJvdG90eXBlb2Zcbi8vIGVzbGludC1kaXNhYmxlLW5leHQtbGluZSBlcy9uby1vYmplY3QtZ2V0cHJvdG90eXBlb2YgLS0gc2FmZVxubW9kdWxlLmV4cG9ydHMgPSBDT1JSRUNUX1BST1RPVFlQRV9HRVRURVIgPyAkT2JqZWN0LmdldFByb3RvdHlwZU9mIDogZnVuY3Rpb24gKE8pIHtcbiAgdmFyIG9iamVjdCA9IHRvT2JqZWN0KE8pO1xuICBpZiAoaGFzT3duKG9iamVjdCwgSUVfUFJPVE8pKSByZXR1cm4gb2JqZWN0W0lFX1BST1RPXTtcbiAgdmFyIGNvbnN0cnVjdG9yID0gb2JqZWN0LmNvbnN0cnVjdG9yO1xuICBpZiAoaXNDYWxsYWJsZShjb25zdHJ1Y3RvcikgJiYgb2JqZWN0IGluc3RhbmNlb2YgY29uc3RydWN0b3IpIHtcbiAgICByZXR1cm4gY29uc3RydWN0b3IucHJvdG90eXBlO1xuICB9IHJldHVybiBvYmplY3QgaW5zdGFuY2VvZiAkT2JqZWN0ID8gT2JqZWN0UHJvdG90eXBlIDogbnVsbDtcbn07XG4iLCIndXNlIHN0cmljdCc7XG52YXIgdW5jdXJyeVRoaXMgPSByZXF1aXJlKCcuLi9pbnRlcm5hbHMvZnVuY3Rpb24tdW5jdXJyeS10aGlzJyk7XG5cbm1vZHVsZS5leHBvcnRzID0gdW5jdXJyeVRoaXMoe30uaXNQcm90b3R5cGVPZik7XG4iLCIndXNlIHN0cmljdCc7XG52YXIgdW5jdXJyeVRoaXMgPSByZXF1aXJlKCcuLi9pbnRlcm5hbHMvZnVuY3Rpb24tdW5jdXJyeS10aGlzJyk7XG52YXIgaGFzT3duID0gcmVxdWlyZSgnLi4vaW50ZXJuYWxzL2hhcy1vd24tcHJvcGVydHknKTtcbnZhciB0b0luZGV4ZWRPYmplY3QgPSByZXF1aXJlKCcuLi9pbnRlcm5hbHMvdG8taW5kZXhlZC1vYmplY3QnKTtcbnZhciBpbmRleE9mID0gcmVxdWlyZSgnLi4vaW50ZXJuYWxzL2FycmF5LWluY2x1ZGVzJykuaW5kZXhPZjtcbnZhciBoaWRkZW5LZXlzID0gcmVxdWlyZSgnLi4vaW50ZXJuYWxzL2hpZGRlbi1rZXlzJyk7XG5cbnZhciBwdXNoID0gdW5jdXJyeVRoaXMoW10ucHVzaCk7XG5cbm1vZHVsZS5leHBvcnRzID0gZnVuY3Rpb24gKG9iamVjdCwgbmFtZXMpIHtcbiAgdmFyIE8gPSB0b0luZGV4ZWRPYmplY3Qob2JqZWN0KTtcbiAgdmFyIGkgPSAwO1xuICB2YXIgcmVzdWx0ID0gW107XG4gIHZhciBrZXk7XG4gIGZvciAoa2V5IGluIE8pICFoYXNPd24oaGlkZGVuS2V5cywga2V5KSAmJiBoYXNPd24oTywga2V5KSAmJiBwdXNoKHJlc3VsdCwga2V5KTtcbiAgLy8gRG9uJ3QgZW51bSBidWcgJiBoaWRkZW4ga2V5c1xuICB3aGlsZSAobmFtZXMubGVuZ3RoID4gaSkgaWYgKGhhc093bihPLCBrZXkgPSBuYW1lc1tpKytdKSkge1xuICAgIH5pbmRleE9mKHJlc3VsdCwga2V5KSB8fCBwdXNoKHJlc3VsdCwga2V5KTtcbiAgfVxuICByZXR1cm4gcmVzdWx0O1xufTtcbiIsIid1c2Ugc3RyaWN0JztcbnZhciBpbnRlcm5hbE9iamVjdEtleXMgPSByZXF1aXJlKCcuLi9pbnRlcm5hbHMvb2JqZWN0LWtleXMtaW50ZXJuYWwnKTtcbnZhciBlbnVtQnVnS2V5cyA9IHJlcXVpcmUoJy4uL2ludGVybmFscy9lbnVtLWJ1Zy1rZXlzJyk7XG5cbi8vIGBPYmplY3Qua2V5c2AgbWV0aG9kXG4vLyBodHRwczovL3RjMzkuZXMvZWNtYTI2Mi8jc2VjLW9iamVjdC5rZXlzXG4vLyBlc2xpbnQtZGlzYWJsZS1uZXh0LWxpbmUgZXMvbm8tb2JqZWN0LWtleXMgLS0gc2FmZVxubW9kdWxlLmV4cG9ydHMgPSBPYmplY3Qua2V5cyB8fCBmdW5jdGlvbiBrZXlzKE8pIHtcbiAgcmV0dXJuIGludGVybmFsT2JqZWN0S2V5cyhPLCBlbnVtQnVnS2V5cyk7XG59O1xuIiwiJ3VzZSBzdHJpY3QnO1xudmFyICRwcm9wZXJ0eUlzRW51bWVyYWJsZSA9IHt9LnByb3BlcnR5SXNFbnVtZXJhYmxlO1xuLy8gZXNsaW50LWRpc2FibGUtbmV4dC1saW5lIGVzL25vLW9iamVjdC1nZXRvd25wcm9wZXJ0eWRlc2NyaXB0b3IgLS0gc2FmZVxudmFyIGdldE93blByb3BlcnR5RGVzY3JpcHRvciA9IE9iamVjdC5nZXRPd25Qcm9wZXJ0eURlc2NyaXB0b3I7XG5cbi8vIE5hc2hvcm4gfiBKREs4IGJ1Z1xudmFyIE5BU0hPUk5fQlVHID0gZ2V0T3duUHJvcGVydHlEZXNjcmlwdG9yICYmICEkcHJvcGVydHlJc0VudW1lcmFibGUuY2FsbCh7IDE6IDIgfSwgMSk7XG5cbi8vIGBPYmplY3QucHJvdG90eXBlLnByb3BlcnR5SXNFbnVtZXJhYmxlYCBtZXRob2QgaW1wbGVtZW50YXRpb25cbi8vIGh0dHBzOi8vdGMzOS5lcy9lY21hMjYyLyNzZWMtb2JqZWN0LnByb3RvdHlwZS5wcm9wZXJ0eWlzZW51bWVyYWJsZVxuZXhwb3J0cy5mID0gTkFTSE9STl9CVUcgPyBmdW5jdGlvbiBwcm9wZXJ0eUlzRW51bWVyYWJsZShWKSB7XG4gIHZhciBkZXNjcmlwdG9yID0gZ2V0T3duUHJvcGVydHlEZXNjcmlwdG9yKHRoaXMsIFYpO1xuICByZXR1cm4gISFkZXNjcmlwdG9yICYmIGRlc2NyaXB0b3IuZW51bWVyYWJsZTtcbn0gOiAkcHJvcGVydHlJc0VudW1lcmFibGU7XG4iLCIndXNlIHN0cmljdCc7XG4vKiBlc2xpbnQtZGlzYWJsZSBuby1wcm90byAtLSBzYWZlICovXG52YXIgdW5jdXJyeVRoaXNBY2Nlc3NvciA9IHJlcXVpcmUoJy4uL2ludGVybmFscy9mdW5jdGlvbi11bmN1cnJ5LXRoaXMtYWNjZXNzb3InKTtcbnZhciBpc09iamVjdCA9IHJlcXVpcmUoJy4uL2ludGVybmFscy9pcy1vYmplY3QnKTtcbnZhciByZXF1aXJlT2JqZWN0Q29lcmNpYmxlID0gcmVxdWlyZSgnLi4vaW50ZXJuYWxzL3JlcXVpcmUtb2JqZWN0LWNvZXJjaWJsZScpO1xudmFyIGFQb3NzaWJsZVByb3RvdHlwZSA9IHJlcXVpcmUoJy4uL2ludGVybmFscy9hLXBvc3NpYmxlLXByb3RvdHlwZScpO1xuXG4vLyBgT2JqZWN0LnNldFByb3RvdHlwZU9mYCBtZXRob2Rcbi8vIGh0dHBzOi8vdGMzOS5lcy9lY21hMjYyLyNzZWMtb2JqZWN0LnNldHByb3RvdHlwZW9mXG4vLyBXb3JrcyB3aXRoIF9fcHJvdG9fXyBvbmx5LiBPbGQgdjggY2FuJ3Qgd29yayB3aXRoIG51bGwgcHJvdG8gb2JqZWN0cy5cbi8vIGVzbGludC1kaXNhYmxlLW5leHQtbGluZSBlcy9uby1vYmplY3Qtc2V0cHJvdG90eXBlb2YgLS0gc2FmZVxubW9kdWxlLmV4cG9ydHMgPSBPYmplY3Quc2V0UHJvdG90eXBlT2YgfHwgKCdfX3Byb3RvX18nIGluIHt9ID8gZnVuY3Rpb24gKCkge1xuICB2YXIgQ09SUkVDVF9TRVRURVIgPSBmYWxzZTtcbiAgdmFyIHRlc3QgPSB7fTtcbiAgdmFyIHNldHRlcjtcbiAgdHJ5IHtcbiAgICBzZXR0ZXIgPSB1bmN1cnJ5VGhpc0FjY2Vzc29yKE9iamVjdC5wcm90b3R5cGUsICdfX3Byb3RvX18nLCAnc2V0Jyk7XG4gICAgc2V0dGVyKHRlc3QsIFtdKTtcbiAgICBDT1JSRUNUX1NFVFRFUiA9IHRlc3QgaW5zdGFuY2VvZiBBcnJheTtcbiAgfSBjYXRjaCAoZXJyb3IpIHsgLyogZW1wdHkgKi8gfVxuICByZXR1cm4gZnVuY3Rpb24gc2V0UHJvdG90eXBlT2YoTywgcHJvdG8pIHtcbiAgICByZXF1aXJlT2JqZWN0Q29lcmNpYmxlKE8pO1xuICAgIGFQb3NzaWJsZVByb3RvdHlwZShwcm90byk7XG4gICAgaWYgKCFpc09iamVjdChPKSkgcmV0dXJuIE87XG4gICAgaWYgKENPUlJFQ1RfU0VUVEVSKSBzZXR0ZXIoTywgcHJvdG8pO1xuICAgIGVsc2UgTy5fX3Byb3RvX18gPSBwcm90bztcbiAgICByZXR1cm4gTztcbiAgfTtcbn0oKSA6IHVuZGVmaW5lZCk7XG4iLCIndXNlIHN0cmljdCc7XG52YXIgY2FsbCA9IHJlcXVpcmUoJy4uL2ludGVybmFscy9mdW5jdGlvbi1jYWxsJyk7XG52YXIgaXNDYWxsYWJsZSA9IHJlcXVpcmUoJy4uL2ludGVybmFscy9pcy1jYWxsYWJsZScpO1xudmFyIGlzT2JqZWN0ID0gcmVxdWlyZSgnLi4vaW50ZXJuYWxzL2lzLW9iamVjdCcpO1xuXG52YXIgJFR5cGVFcnJvciA9IFR5cGVFcnJvcjtcblxuLy8gYE9yZGluYXJ5VG9QcmltaXRpdmVgIGFic3RyYWN0IG9wZXJhdGlvblxuLy8gaHR0cHM6Ly90YzM5LmVzL2VjbWEyNjIvI3NlYy1vcmRpbmFyeXRvcHJpbWl0aXZlXG5tb2R1bGUuZXhwb3J0cyA9IGZ1bmN0aW9uIChpbnB1dCwgcHJlZikge1xuICB2YXIgZm4sIHZhbDtcbiAgaWYgKHByZWYgPT09ICdzdHJpbmcnICYmIGlzQ2FsbGFibGUoZm4gPSBpbnB1dC50b1N0cmluZykgJiYgIWlzT2JqZWN0KHZhbCA9IGNhbGwoZm4sIGlucHV0KSkpIHJldHVybiB2YWw7XG4gIGlmIChpc0NhbGxhYmxlKGZuID0gaW5wdXQudmFsdWVPZikgJiYgIWlzT2JqZWN0KHZhbCA9IGNhbGwoZm4sIGlucHV0KSkpIHJldHVybiB2YWw7XG4gIGlmIChwcmVmICE9PSAnc3RyaW5nJyAmJiBpc0NhbGxhYmxlKGZuID0gaW5wdXQudG9TdHJpbmcpICYmICFpc09iamVjdCh2YWwgPSBjYWxsKGZuLCBpbnB1dCkpKSByZXR1cm4gdmFsO1xuICB0aHJvdyBuZXcgJFR5cGVFcnJvcihcIkNhbid0IGNvbnZlcnQgb2JqZWN0IHRvIHByaW1pdGl2ZSB2YWx1ZVwiKTtcbn07XG4iLCIndXNlIHN0cmljdCc7XG52YXIgZ2V0QnVpbHRJbiA9IHJlcXVpcmUoJy4uL2ludGVybmFscy9nZXQtYnVpbHQtaW4nKTtcbnZhciB1bmN1cnJ5VGhpcyA9IHJlcXVpcmUoJy4uL2ludGVybmFscy9mdW5jdGlvbi11bmN1cnJ5LXRoaXMnKTtcbnZhciBnZXRPd25Qcm9wZXJ0eU5hbWVzTW9kdWxlID0gcmVxdWlyZSgnLi4vaW50ZXJuYWxzL29iamVjdC1nZXQtb3duLXByb3BlcnR5LW5hbWVzJyk7XG52YXIgZ2V0T3duUHJvcGVydHlTeW1ib2xzTW9kdWxlID0gcmVxdWlyZSgnLi4vaW50ZXJuYWxzL29iamVjdC1nZXQtb3duLXByb3BlcnR5LXN5bWJvbHMnKTtcbnZhciBhbk9iamVjdCA9IHJlcXVpcmUoJy4uL2ludGVybmFscy9hbi1vYmplY3QnKTtcblxudmFyIGNvbmNhdCA9IHVuY3VycnlUaGlzKFtdLmNvbmNhdCk7XG5cbi8vIGFsbCBvYmplY3Qga2V5cywgaW5jbHVkZXMgbm9uLWVudW1lcmFibGUgYW5kIHN5bWJvbHNcbm1vZHVsZS5leHBvcnRzID0gZ2V0QnVpbHRJbignUmVmbGVjdCcsICdvd25LZXlzJykgfHwgZnVuY3Rpb24gb3duS2V5cyhpdCkge1xuICB2YXIga2V5cyA9IGdldE93blByb3BlcnR5TmFtZXNNb2R1bGUuZihhbk9iamVjdChpdCkpO1xuICB2YXIgZ2V0T3duUHJvcGVydHlTeW1ib2xzID0gZ2V0T3duUHJvcGVydHlTeW1ib2xzTW9kdWxlLmY7XG4gIHJldHVybiBnZXRPd25Qcm9wZXJ0eVN5bWJvbHMgPyBjb25jYXQoa2V5cywgZ2V0T3duUHJvcGVydHlTeW1ib2xzKGl0KSkgOiBrZXlzO1xufTtcbiIsIid1c2Ugc3RyaWN0JztcbnZhciBkZWZpbmVQcm9wZXJ0eSA9IHJlcXVpcmUoJy4uL2ludGVybmFscy9vYmplY3QtZGVmaW5lLXByb3BlcnR5JykuZjtcblxubW9kdWxlLmV4cG9ydHMgPSBmdW5jdGlvbiAoVGFyZ2V0LCBTb3VyY2UsIGtleSkge1xuICBrZXkgaW4gVGFyZ2V0IHx8IGRlZmluZVByb3BlcnR5KFRhcmdldCwga2V5LCB7XG4gICAgY29uZmlndXJhYmxlOiB0cnVlLFxuICAgIGdldDogZnVuY3Rpb24gKCkgeyByZXR1cm4gU291cmNlW2tleV07IH0sXG4gICAgc2V0OiBmdW5jdGlvbiAoaXQpIHsgU291cmNlW2tleV0gPSBpdDsgfVxuICB9KTtcbn07XG4iLCIndXNlIHN0cmljdCc7XG52YXIgY2FsbCA9IHJlcXVpcmUoJy4uL2ludGVybmFscy9mdW5jdGlvbi1jYWxsJyk7XG52YXIgYW5PYmplY3QgPSByZXF1aXJlKCcuLi9pbnRlcm5hbHMvYW4tb2JqZWN0Jyk7XG52YXIgaXNDYWxsYWJsZSA9IHJlcXVpcmUoJy4uL2ludGVybmFscy9pcy1jYWxsYWJsZScpO1xudmFyIGNsYXNzb2YgPSByZXF1aXJlKCcuLi9pbnRlcm5hbHMvY2xhc3NvZi1yYXcnKTtcbnZhciByZWdleHBFeGVjID0gcmVxdWlyZSgnLi4vaW50ZXJuYWxzL3JlZ2V4cC1leGVjJyk7XG5cbnZhciAkVHlwZUVycm9yID0gVHlwZUVycm9yO1xuXG4vLyBgUmVnRXhwRXhlY2AgYWJzdHJhY3Qgb3BlcmF0aW9uXG4vLyBodHRwczovL3RjMzkuZXMvZWNtYTI2Mi8jc2VjLXJlZ2V4cGV4ZWNcbm1vZHVsZS5leHBvcnRzID0gZnVuY3Rpb24gKFIsIFMpIHtcbiAgdmFyIGV4ZWMgPSBSLmV4ZWM7XG4gIGlmIChpc0NhbGxhYmxlKGV4ZWMpKSB7XG4gICAgdmFyIHJlc3VsdCA9IGNhbGwoZXhlYywgUiwgUyk7XG4gICAgaWYgKHJlc3VsdCAhPT0gbnVsbCkgYW5PYmplY3QocmVzdWx0KTtcbiAgICByZXR1cm4gcmVzdWx0O1xuICB9XG4gIGlmIChjbGFzc29mKFIpID09PSAnUmVnRXhwJykgcmV0dXJuIGNhbGwocmVnZXhwRXhlYywgUiwgUyk7XG4gIHRocm93IG5ldyAkVHlwZUVycm9yKCdSZWdFeHAjZXhlYyBjYWxsZWQgb24gaW5jb21wYXRpYmxlIHJlY2VpdmVyJyk7XG59O1xuIiwiJ3VzZSBzdHJpY3QnO1xuLyogZXNsaW50LWRpc2FibGUgcmVnZXhwL25vLWVtcHR5LWNhcHR1cmluZy1ncm91cCwgcmVnZXhwL25vLWVtcHR5LWdyb3VwLCByZWdleHAvbm8tbGF6eS1lbmRzIC0tIHRlc3RpbmcgKi9cbi8qIGVzbGludC1kaXNhYmxlIHJlZ2V4cC9uby11c2VsZXNzLXF1YW50aWZpZXIgLS0gdGVzdGluZyAqL1xudmFyIGNhbGwgPSByZXF1aXJlKCcuLi9pbnRlcm5hbHMvZnVuY3Rpb24tY2FsbCcpO1xudmFyIHVuY3VycnlUaGlzID0gcmVxdWlyZSgnLi4vaW50ZXJuYWxzL2Z1bmN0aW9uLXVuY3VycnktdGhpcycpO1xudmFyIHRvU3RyaW5nID0gcmVxdWlyZSgnLi4vaW50ZXJuYWxzL3RvLXN0cmluZycpO1xudmFyIHJlZ2V4cEZsYWdzID0gcmVxdWlyZSgnLi4vaW50ZXJuYWxzL3JlZ2V4cC1mbGFncycpO1xudmFyIHN0aWNreUhlbHBlcnMgPSByZXF1aXJlKCcuLi9pbnRlcm5hbHMvcmVnZXhwLXN0aWNreS1oZWxwZXJzJyk7XG52YXIgc2hhcmVkID0gcmVxdWlyZSgnLi4vaW50ZXJuYWxzL3NoYXJlZCcpO1xudmFyIGNyZWF0ZSA9IHJlcXVpcmUoJy4uL2ludGVybmFscy9vYmplY3QtY3JlYXRlJyk7XG52YXIgZ2V0SW50ZXJuYWxTdGF0ZSA9IHJlcXVpcmUoJy4uL2ludGVybmFscy9pbnRlcm5hbC1zdGF0ZScpLmdldDtcbnZhciBVTlNVUFBPUlRFRF9ET1RfQUxMID0gcmVxdWlyZSgnLi4vaW50ZXJuYWxzL3JlZ2V4cC11bnN1cHBvcnRlZC1kb3QtYWxsJyk7XG52YXIgVU5TVVBQT1JURURfTkNHID0gcmVxdWlyZSgnLi4vaW50ZXJuYWxzL3JlZ2V4cC11bnN1cHBvcnRlZC1uY2cnKTtcblxudmFyIG5hdGl2ZVJlcGxhY2UgPSBzaGFyZWQoJ25hdGl2ZS1zdHJpbmctcmVwbGFjZScsIFN0cmluZy5wcm90b3R5cGUucmVwbGFjZSk7XG52YXIgbmF0aXZlRXhlYyA9IFJlZ0V4cC5wcm90b3R5cGUuZXhlYztcbnZhciBwYXRjaGVkRXhlYyA9IG5hdGl2ZUV4ZWM7XG52YXIgY2hhckF0ID0gdW5jdXJyeVRoaXMoJycuY2hhckF0KTtcbnZhciBpbmRleE9mID0gdW5jdXJyeVRoaXMoJycuaW5kZXhPZik7XG52YXIgcmVwbGFjZSA9IHVuY3VycnlUaGlzKCcnLnJlcGxhY2UpO1xudmFyIHN0cmluZ1NsaWNlID0gdW5jdXJyeVRoaXMoJycuc2xpY2UpO1xuXG52YXIgVVBEQVRFU19MQVNUX0lOREVYX1dST05HID0gKGZ1bmN0aW9uICgpIHtcbiAgdmFyIHJlMSA9IC9hLztcbiAgdmFyIHJlMiA9IC9iKi9nO1xuICBjYWxsKG5hdGl2ZUV4ZWMsIHJlMSwgJ2EnKTtcbiAgY2FsbChuYXRpdmVFeGVjLCByZTIsICdhJyk7XG4gIHJldHVybiByZTEubGFzdEluZGV4ICE9PSAwIHx8IHJlMi5sYXN0SW5kZXggIT09IDA7XG59KSgpO1xuXG52YXIgVU5TVVBQT1JURURfWSA9IHN0aWNreUhlbHBlcnMuQlJPS0VOX0NBUkVUO1xuXG4vLyBub25wYXJ0aWNpcGF0aW5nIGNhcHR1cmluZyBncm91cCwgY29waWVkIGZyb20gZXM1LXNoaW0ncyBTdHJpbmcjc3BsaXQgcGF0Y2guXG52YXIgTlBDR19JTkNMVURFRCA9IC8oKT8/Ly5leGVjKCcnKVsxXSAhPT0gdW5kZWZpbmVkO1xuXG52YXIgUEFUQ0ggPSBVUERBVEVTX0xBU1RfSU5ERVhfV1JPTkcgfHwgTlBDR19JTkNMVURFRCB8fCBVTlNVUFBPUlRFRF9ZIHx8IFVOU1VQUE9SVEVEX0RPVF9BTEwgfHwgVU5TVVBQT1JURURfTkNHO1xuXG5pZiAoUEFUQ0gpIHtcbiAgcGF0Y2hlZEV4ZWMgPSBmdW5jdGlvbiBleGVjKHN0cmluZykge1xuICAgIHZhciByZSA9IHRoaXM7XG4gICAgdmFyIHN0YXRlID0gZ2V0SW50ZXJuYWxTdGF0ZShyZSk7XG4gICAgdmFyIHN0ciA9IHRvU3RyaW5nKHN0cmluZyk7XG4gICAgdmFyIHJhdyA9IHN0YXRlLnJhdztcbiAgICB2YXIgcmVzdWx0LCByZUNvcHksIGxhc3RJbmRleCwgbWF0Y2gsIGksIG9iamVjdCwgZ3JvdXA7XG5cbiAgICBpZiAocmF3KSB7XG4gICAgICByYXcubGFzdEluZGV4ID0gcmUubGFzdEluZGV4O1xuICAgICAgcmVzdWx0ID0gY2FsbChwYXRjaGVkRXhlYywgcmF3LCBzdHIpO1xuICAgICAgcmUubGFzdEluZGV4ID0gcmF3Lmxhc3RJbmRleDtcbiAgICAgIHJldHVybiByZXN1bHQ7XG4gICAgfVxuXG4gICAgdmFyIGdyb3VwcyA9IHN0YXRlLmdyb3VwcztcbiAgICB2YXIgc3RpY2t5ID0gVU5TVVBQT1JURURfWSAmJiByZS5zdGlja3k7XG4gICAgdmFyIGZsYWdzID0gY2FsbChyZWdleHBGbGFncywgcmUpO1xuICAgIHZhciBzb3VyY2UgPSByZS5zb3VyY2U7XG4gICAgdmFyIGNoYXJzQWRkZWQgPSAwO1xuICAgIHZhciBzdHJDb3B5ID0gc3RyO1xuXG4gICAgaWYgKHN0aWNreSkge1xuICAgICAgZmxhZ3MgPSByZXBsYWNlKGZsYWdzLCAneScsICcnKTtcbiAgICAgIGlmIChpbmRleE9mKGZsYWdzLCAnZycpID09PSAtMSkge1xuICAgICAgICBmbGFncyArPSAnZyc7XG4gICAgICB9XG5cbiAgICAgIHN0ckNvcHkgPSBzdHJpbmdTbGljZShzdHIsIHJlLmxhc3RJbmRleCk7XG4gICAgICAvLyBTdXBwb3J0IGFuY2hvcmVkIHN0aWNreSBiZWhhdmlvci5cbiAgICAgIGlmIChyZS5sYXN0SW5kZXggPiAwICYmICghcmUubXVsdGlsaW5lIHx8IHJlLm11bHRpbGluZSAmJiBjaGFyQXQoc3RyLCByZS5sYXN0SW5kZXggLSAxKSAhPT0gJ1xcbicpKSB7XG4gICAgICAgIHNvdXJjZSA9ICcoPzogJyArIHNvdXJjZSArICcpJztcbiAgICAgICAgc3RyQ29weSA9ICcgJyArIHN0ckNvcHk7XG4gICAgICAgIGNoYXJzQWRkZWQrKztcbiAgICAgIH1cbiAgICAgIC8vIF4oPyArIHJ4ICsgKSBpcyBuZWVkZWQsIGluIGNvbWJpbmF0aW9uIHdpdGggc29tZSBzdHIgc2xpY2luZywgdG9cbiAgICAgIC8vIHNpbXVsYXRlIHRoZSAneScgZmxhZy5cbiAgICAgIHJlQ29weSA9IG5ldyBSZWdFeHAoJ14oPzonICsgc291cmNlICsgJyknLCBmbGFncyk7XG4gICAgfVxuXG4gICAgaWYgKE5QQ0dfSU5DTFVERUQpIHtcbiAgICAgIHJlQ29weSA9IG5ldyBSZWdFeHAoJ14nICsgc291cmNlICsgJyQoPyFcXFxccyknLCBmbGFncyk7XG4gICAgfVxuICAgIGlmIChVUERBVEVTX0xBU1RfSU5ERVhfV1JPTkcpIGxhc3RJbmRleCA9IHJlLmxhc3RJbmRleDtcblxuICAgIG1hdGNoID0gY2FsbChuYXRpdmVFeGVjLCBzdGlja3kgPyByZUNvcHkgOiByZSwgc3RyQ29weSk7XG5cbiAgICBpZiAoc3RpY2t5KSB7XG4gICAgICBpZiAobWF0Y2gpIHtcbiAgICAgICAgbWF0Y2guaW5wdXQgPSBzdHJpbmdTbGljZShtYXRjaC5pbnB1dCwgY2hhcnNBZGRlZCk7XG4gICAgICAgIG1hdGNoWzBdID0gc3RyaW5nU2xpY2UobWF0Y2hbMF0sIGNoYXJzQWRkZWQpO1xuICAgICAgICBtYXRjaC5pbmRleCA9IHJlLmxhc3RJbmRleDtcbiAgICAgICAgcmUubGFzdEluZGV4ICs9IG1hdGNoWzBdLmxlbmd0aDtcbiAgICAgIH0gZWxzZSByZS5sYXN0SW5kZXggPSAwO1xuICAgIH0gZWxzZSBpZiAoVVBEQVRFU19MQVNUX0lOREVYX1dST05HICYmIG1hdGNoKSB7XG4gICAgICByZS5sYXN0SW5kZXggPSByZS5nbG9iYWwgPyBtYXRjaC5pbmRleCArIG1hdGNoWzBdLmxlbmd0aCA6IGxhc3RJbmRleDtcbiAgICB9XG4gICAgaWYgKE5QQ0dfSU5DTFVERUQgJiYgbWF0Y2ggJiYgbWF0Y2gubGVuZ3RoID4gMSkge1xuICAgICAgLy8gRml4IGJyb3dzZXJzIHdob3NlIGBleGVjYCBtZXRob2RzIGRvbid0IGNvbnNpc3RlbnRseSByZXR1cm4gYHVuZGVmaW5lZGBcbiAgICAgIC8vIGZvciBOUENHLCBsaWtlIElFOC4gTk9URTogVGhpcyBkb2Vzbid0IHdvcmsgZm9yIC8oLj8pPy9cbiAgICAgIGNhbGwobmF0aXZlUmVwbGFjZSwgbWF0Y2hbMF0sIHJlQ29weSwgZnVuY3Rpb24gKCkge1xuICAgICAgICBmb3IgKGkgPSAxOyBpIDwgYXJndW1lbnRzLmxlbmd0aCAtIDI7IGkrKykge1xuICAgICAgICAgIGlmIChhcmd1bWVudHNbaV0gPT09IHVuZGVmaW5lZCkgbWF0Y2hbaV0gPSB1bmRlZmluZWQ7XG4gICAgICAgIH1cbiAgICAgIH0pO1xuICAgIH1cblxuICAgIGlmIChtYXRjaCAmJiBncm91cHMpIHtcbiAgICAgIG1hdGNoLmdyb3VwcyA9IG9iamVjdCA9IGNyZWF0ZShudWxsKTtcbiAgICAgIGZvciAoaSA9IDA7IGkgPCBncm91cHMubGVuZ3RoOyBpKyspIHtcbiAgICAgICAgZ3JvdXAgPSBncm91cHNbaV07XG4gICAgICAgIG9iamVjdFtncm91cFswXV0gPSBtYXRjaFtncm91cFsxXV07XG4gICAgICB9XG4gICAgfVxuXG4gICAgcmV0dXJuIG1hdGNoO1xuICB9O1xufVxuXG5tb2R1bGUuZXhwb3J0cyA9IHBhdGNoZWRFeGVjO1xuIiwiJ3VzZSBzdHJpY3QnO1xudmFyIGFuT2JqZWN0ID0gcmVxdWlyZSgnLi4vaW50ZXJuYWxzL2FuLW9iamVjdCcpO1xuXG4vLyBgUmVnRXhwLnByb3RvdHlwZS5mbGFnc2AgZ2V0dGVyIGltcGxlbWVudGF0aW9uXG4vLyBodHRwczovL3RjMzkuZXMvZWNtYTI2Mi8jc2VjLWdldC1yZWdleHAucHJvdG90eXBlLmZsYWdzXG5tb2R1bGUuZXhwb3J0cyA9IGZ1bmN0aW9uICgpIHtcbiAgdmFyIHRoYXQgPSBhbk9iamVjdCh0aGlzKTtcbiAgdmFyIHJlc3VsdCA9ICcnO1xuICBpZiAodGhhdC5oYXNJbmRpY2VzKSByZXN1bHQgKz0gJ2QnO1xuICBpZiAodGhhdC5nbG9iYWwpIHJlc3VsdCArPSAnZyc7XG4gIGlmICh0aGF0Lmlnbm9yZUNhc2UpIHJlc3VsdCArPSAnaSc7XG4gIGlmICh0aGF0Lm11bHRpbGluZSkgcmVzdWx0ICs9ICdtJztcbiAgaWYgKHRoYXQuZG90QWxsKSByZXN1bHQgKz0gJ3MnO1xuICBpZiAodGhhdC51bmljb2RlKSByZXN1bHQgKz0gJ3UnO1xuICBpZiAodGhhdC51bmljb2RlU2V0cykgcmVzdWx0ICs9ICd2JztcbiAgaWYgKHRoYXQuc3RpY2t5KSByZXN1bHQgKz0gJ3knO1xuICByZXR1cm4gcmVzdWx0O1xufTtcbiIsIid1c2Ugc3RyaWN0JztcbnZhciBjYWxsID0gcmVxdWlyZSgnLi4vaW50ZXJuYWxzL2Z1bmN0aW9uLWNhbGwnKTtcbnZhciBoYXNPd24gPSByZXF1aXJlKCcuLi9pbnRlcm5hbHMvaGFzLW93bi1wcm9wZXJ0eScpO1xudmFyIGlzUHJvdG90eXBlT2YgPSByZXF1aXJlKCcuLi9pbnRlcm5hbHMvb2JqZWN0LWlzLXByb3RvdHlwZS1vZicpO1xudmFyIHJlZ0V4cEZsYWdzID0gcmVxdWlyZSgnLi4vaW50ZXJuYWxzL3JlZ2V4cC1mbGFncycpO1xuXG52YXIgUmVnRXhwUHJvdG90eXBlID0gUmVnRXhwLnByb3RvdHlwZTtcblxubW9kdWxlLmV4cG9ydHMgPSBmdW5jdGlvbiAoUikge1xuICB2YXIgZmxhZ3MgPSBSLmZsYWdzO1xuICByZXR1cm4gZmxhZ3MgPT09IHVuZGVmaW5lZCAmJiAhKCdmbGFncycgaW4gUmVnRXhwUHJvdG90eXBlKSAmJiAhaGFzT3duKFIsICdmbGFncycpICYmIGlzUHJvdG90eXBlT2YoUmVnRXhwUHJvdG90eXBlLCBSKVxuICAgID8gY2FsbChyZWdFeHBGbGFncywgUikgOiBmbGFncztcbn07XG4iLCIndXNlIHN0cmljdCc7XG52YXIgZmFpbHMgPSByZXF1aXJlKCcuLi9pbnRlcm5hbHMvZmFpbHMnKTtcbnZhciBnbG9iYWwgPSByZXF1aXJlKCcuLi9pbnRlcm5hbHMvZ2xvYmFsJyk7XG5cbi8vIGJhYmVsLW1pbmlmeSBhbmQgQ2xvc3VyZSBDb21waWxlciB0cmFuc3BpbGVzIFJlZ0V4cCgnYScsICd5JykgLT4gL2EveSBhbmQgaXQgY2F1c2VzIFN5bnRheEVycm9yXG52YXIgJFJlZ0V4cCA9IGdsb2JhbC5SZWdFeHA7XG5cbnZhciBVTlNVUFBPUlRFRF9ZID0gZmFpbHMoZnVuY3Rpb24gKCkge1xuICB2YXIgcmUgPSAkUmVnRXhwKCdhJywgJ3knKTtcbiAgcmUubGFzdEluZGV4ID0gMjtcbiAgcmV0dXJuIHJlLmV4ZWMoJ2FiY2QnKSAhPT0gbnVsbDtcbn0pO1xuXG4vLyBVQyBCcm93c2VyIGJ1Z1xuLy8gaHR0cHM6Ly9naXRodWIuY29tL3psb2lyb2NrL2NvcmUtanMvaXNzdWVzLzEwMDhcbnZhciBNSVNTRURfU1RJQ0tZID0gVU5TVVBQT1JURURfWSB8fCBmYWlscyhmdW5jdGlvbiAoKSB7XG4gIHJldHVybiAhJFJlZ0V4cCgnYScsICd5Jykuc3RpY2t5O1xufSk7XG5cbnZhciBCUk9LRU5fQ0FSRVQgPSBVTlNVUFBPUlRFRF9ZIHx8IGZhaWxzKGZ1bmN0aW9uICgpIHtcbiAgLy8gaHR0cHM6Ly9idWd6aWxsYS5tb3ppbGxhLm9yZy9zaG93X2J1Zy5jZ2k/aWQ9NzczNjg3XG4gIHZhciByZSA9ICRSZWdFeHAoJ15yJywgJ2d5Jyk7XG4gIHJlLmxhc3RJbmRleCA9IDI7XG4gIHJldHVybiByZS5leGVjKCdzdHInKSAhPT0gbnVsbDtcbn0pO1xuXG5tb2R1bGUuZXhwb3J0cyA9IHtcbiAgQlJPS0VOX0NBUkVUOiBCUk9LRU5fQ0FSRVQsXG4gIE1JU1NFRF9TVElDS1k6IE1JU1NFRF9TVElDS1ksXG4gIFVOU1VQUE9SVEVEX1k6IFVOU1VQUE9SVEVEX1lcbn07XG4iLCIndXNlIHN0cmljdCc7XG52YXIgZmFpbHMgPSByZXF1aXJlKCcuLi9pbnRlcm5hbHMvZmFpbHMnKTtcbnZhciBnbG9iYWwgPSByZXF1aXJlKCcuLi9pbnRlcm5hbHMvZ2xvYmFsJyk7XG5cbi8vIGJhYmVsLW1pbmlmeSBhbmQgQ2xvc3VyZSBDb21waWxlciB0cmFuc3BpbGVzIFJlZ0V4cCgnLicsICdzJykgLT4gLy4vcyBhbmQgaXQgY2F1c2VzIFN5bnRheEVycm9yXG52YXIgJFJlZ0V4cCA9IGdsb2JhbC5SZWdFeHA7XG5cbm1vZHVsZS5leHBvcnRzID0gZmFpbHMoZnVuY3Rpb24gKCkge1xuICB2YXIgcmUgPSAkUmVnRXhwKCcuJywgJ3MnKTtcbiAgcmV0dXJuICEocmUuZG90QWxsICYmIHJlLnRlc3QoJ1xcbicpICYmIHJlLmZsYWdzID09PSAncycpO1xufSk7XG4iLCIndXNlIHN0cmljdCc7XG52YXIgZmFpbHMgPSByZXF1aXJlKCcuLi9pbnRlcm5hbHMvZmFpbHMnKTtcbnZhciBnbG9iYWwgPSByZXF1aXJlKCcuLi9pbnRlcm5hbHMvZ2xvYmFsJyk7XG5cbi8vIGJhYmVsLW1pbmlmeSBhbmQgQ2xvc3VyZSBDb21waWxlciB0cmFuc3BpbGVzIFJlZ0V4cCgnKD88YT5iKScsICdnJykgLT4gLyg/PGE+YikvZyBhbmQgaXQgY2F1c2VzIFN5bnRheEVycm9yXG52YXIgJFJlZ0V4cCA9IGdsb2JhbC5SZWdFeHA7XG5cbm1vZHVsZS5leHBvcnRzID0gZmFpbHMoZnVuY3Rpb24gKCkge1xuICB2YXIgcmUgPSAkUmVnRXhwKCcoPzxhPmIpJywgJ2cnKTtcbiAgcmV0dXJuIHJlLmV4ZWMoJ2InKS5ncm91cHMuYSAhPT0gJ2InIHx8XG4gICAgJ2InLnJlcGxhY2UocmUsICckPGE+YycpICE9PSAnYmMnO1xufSk7XG4iLCIndXNlIHN0cmljdCc7XG52YXIgaXNOdWxsT3JVbmRlZmluZWQgPSByZXF1aXJlKCcuLi9pbnRlcm5hbHMvaXMtbnVsbC1vci11bmRlZmluZWQnKTtcblxudmFyICRUeXBlRXJyb3IgPSBUeXBlRXJyb3I7XG5cbi8vIGBSZXF1aXJlT2JqZWN0Q29lcmNpYmxlYCBhYnN0cmFjdCBvcGVyYXRpb25cbi8vIGh0dHBzOi8vdGMzOS5lcy9lY21hMjYyLyNzZWMtcmVxdWlyZW9iamVjdGNvZXJjaWJsZVxubW9kdWxlLmV4cG9ydHMgPSBmdW5jdGlvbiAoaXQpIHtcbiAgaWYgKGlzTnVsbE9yVW5kZWZpbmVkKGl0KSkgdGhyb3cgbmV3ICRUeXBlRXJyb3IoXCJDYW4ndCBjYWxsIG1ldGhvZCBvbiBcIiArIGl0KTtcbiAgcmV0dXJuIGl0O1xufTtcbiIsIid1c2Ugc3RyaWN0JztcbnZhciBnbG9iYWwgPSByZXF1aXJlKCcuLi9pbnRlcm5hbHMvZ2xvYmFsJyk7XG52YXIgREVTQ1JJUFRPUlMgPSByZXF1aXJlKCcuLi9pbnRlcm5hbHMvZGVzY3JpcHRvcnMnKTtcblxuLy8gZXNsaW50LWRpc2FibGUtbmV4dC1saW5lIGVzL25vLW9iamVjdC1nZXRvd25wcm9wZXJ0eWRlc2NyaXB0b3IgLS0gc2FmZVxudmFyIGdldE93blByb3BlcnR5RGVzY3JpcHRvciA9IE9iamVjdC5nZXRPd25Qcm9wZXJ0eURlc2NyaXB0b3I7XG5cbi8vIEF2b2lkIE5vZGVKUyBleHBlcmltZW50YWwgd2FybmluZ1xubW9kdWxlLmV4cG9ydHMgPSBmdW5jdGlvbiAobmFtZSkge1xuICBpZiAoIURFU0NSSVBUT1JTKSByZXR1cm4gZ2xvYmFsW25hbWVdO1xuICB2YXIgZGVzY3JpcHRvciA9IGdldE93blByb3BlcnR5RGVzY3JpcHRvcihnbG9iYWwsIG5hbWUpO1xuICByZXR1cm4gZGVzY3JpcHRvciAmJiBkZXNjcmlwdG9yLnZhbHVlO1xufTtcbiIsIid1c2Ugc3RyaWN0JztcbnZhciBnZXRCdWlsdEluID0gcmVxdWlyZSgnLi4vaW50ZXJuYWxzL2dldC1idWlsdC1pbicpO1xudmFyIGRlZmluZUJ1aWx0SW5BY2Nlc3NvciA9IHJlcXVpcmUoJy4uL2ludGVybmFscy9kZWZpbmUtYnVpbHQtaW4tYWNjZXNzb3InKTtcbnZhciB3ZWxsS25vd25TeW1ib2wgPSByZXF1aXJlKCcuLi9pbnRlcm5hbHMvd2VsbC1rbm93bi1zeW1ib2wnKTtcbnZhciBERVNDUklQVE9SUyA9IHJlcXVpcmUoJy4uL2ludGVybmFscy9kZXNjcmlwdG9ycycpO1xuXG52YXIgU1BFQ0lFUyA9IHdlbGxLbm93blN5bWJvbCgnc3BlY2llcycpO1xuXG5tb2R1bGUuZXhwb3J0cyA9IGZ1bmN0aW9uIChDT05TVFJVQ1RPUl9OQU1FKSB7XG4gIHZhciBDb25zdHJ1Y3RvciA9IGdldEJ1aWx0SW4oQ09OU1RSVUNUT1JfTkFNRSk7XG5cbiAgaWYgKERFU0NSSVBUT1JTICYmIENvbnN0cnVjdG9yICYmICFDb25zdHJ1Y3RvcltTUEVDSUVTXSkge1xuICAgIGRlZmluZUJ1aWx0SW5BY2Nlc3NvcihDb25zdHJ1Y3RvciwgU1BFQ0lFUywge1xuICAgICAgY29uZmlndXJhYmxlOiB0cnVlLFxuICAgICAgZ2V0OiBmdW5jdGlvbiAoKSB7IHJldHVybiB0aGlzOyB9XG4gICAgfSk7XG4gIH1cbn07XG4iLCIndXNlIHN0cmljdCc7XG52YXIgZGVmaW5lUHJvcGVydHkgPSByZXF1aXJlKCcuLi9pbnRlcm5hbHMvb2JqZWN0LWRlZmluZS1wcm9wZXJ0eScpLmY7XG52YXIgaGFzT3duID0gcmVxdWlyZSgnLi4vaW50ZXJuYWxzL2hhcy1vd24tcHJvcGVydHknKTtcbnZhciB3ZWxsS25vd25TeW1ib2wgPSByZXF1aXJlKCcuLi9pbnRlcm5hbHMvd2VsbC1rbm93bi1zeW1ib2wnKTtcblxudmFyIFRPX1NUUklOR19UQUcgPSB3ZWxsS25vd25TeW1ib2woJ3RvU3RyaW5nVGFnJyk7XG5cbm1vZHVsZS5leHBvcnRzID0gZnVuY3Rpb24gKHRhcmdldCwgVEFHLCBTVEFUSUMpIHtcbiAgaWYgKHRhcmdldCAmJiAhU1RBVElDKSB0YXJnZXQgPSB0YXJnZXQucHJvdG90eXBlO1xuICBpZiAodGFyZ2V0ICYmICFoYXNPd24odGFyZ2V0LCBUT19TVFJJTkdfVEFHKSkge1xuICAgIGRlZmluZVByb3BlcnR5KHRhcmdldCwgVE9fU1RSSU5HX1RBRywgeyBjb25maWd1cmFibGU6IHRydWUsIHZhbHVlOiBUQUcgfSk7XG4gIH1cbn07XG4iLCIndXNlIHN0cmljdCc7XG52YXIgc2hhcmVkID0gcmVxdWlyZSgnLi4vaW50ZXJuYWxzL3NoYXJlZCcpO1xudmFyIHVpZCA9IHJlcXVpcmUoJy4uL2ludGVybmFscy91aWQnKTtcblxudmFyIGtleXMgPSBzaGFyZWQoJ2tleXMnKTtcblxubW9kdWxlLmV4cG9ydHMgPSBmdW5jdGlvbiAoa2V5KSB7XG4gIHJldHVybiBrZXlzW2tleV0gfHwgKGtleXNba2V5XSA9IHVpZChrZXkpKTtcbn07XG4iLCIndXNlIHN0cmljdCc7XG52YXIgSVNfUFVSRSA9IHJlcXVpcmUoJy4uL2ludGVybmFscy9pcy1wdXJlJyk7XG52YXIgZ2xvYmFsVGhpcyA9IHJlcXVpcmUoJy4uL2ludGVybmFscy9nbG9iYWwnKTtcbnZhciBkZWZpbmVHbG9iYWxQcm9wZXJ0eSA9IHJlcXVpcmUoJy4uL2ludGVybmFscy9kZWZpbmUtZ2xvYmFsLXByb3BlcnR5Jyk7XG5cbnZhciBTSEFSRUQgPSAnX19jb3JlLWpzX3NoYXJlZF9fJztcbnZhciBzdG9yZSA9IG1vZHVsZS5leHBvcnRzID0gZ2xvYmFsVGhpc1tTSEFSRURdIHx8IGRlZmluZUdsb2JhbFByb3BlcnR5KFNIQVJFRCwge30pO1xuXG4oc3RvcmUudmVyc2lvbnMgfHwgKHN0b3JlLnZlcnNpb25zID0gW10pKS5wdXNoKHtcbiAgdmVyc2lvbjogJzMuMzcuMScsXG4gIG1vZGU6IElTX1BVUkUgPyAncHVyZScgOiAnZ2xvYmFsJyxcbiAgY29weXJpZ2h0OiAnwqkgMjAxNC0yMDI0IERlbmlzIFB1c2hrYXJldiAoemxvaXJvY2sucnUpJyxcbiAgbGljZW5zZTogJ2h0dHBzOi8vZ2l0aHViLmNvbS96bG9pcm9jay9jb3JlLWpzL2Jsb2IvdjMuMzcuMS9MSUNFTlNFJyxcbiAgc291cmNlOiAnaHR0cHM6Ly9naXRodWIuY29tL3psb2lyb2NrL2NvcmUtanMnXG59KTtcbiIsIid1c2Ugc3RyaWN0JztcbnZhciBzdG9yZSA9IHJlcXVpcmUoJy4uL2ludGVybmFscy9zaGFyZWQtc3RvcmUnKTtcblxubW9kdWxlLmV4cG9ydHMgPSBmdW5jdGlvbiAoa2V5LCB2YWx1ZSkge1xuICByZXR1cm4gc3RvcmVba2V5XSB8fCAoc3RvcmVba2V5XSA9IHZhbHVlIHx8IHt9KTtcbn07XG4iLCIndXNlIHN0cmljdCc7XG52YXIgYW5PYmplY3QgPSByZXF1aXJlKCcuLi9pbnRlcm5hbHMvYW4tb2JqZWN0Jyk7XG52YXIgYUNvbnN0cnVjdG9yID0gcmVxdWlyZSgnLi4vaW50ZXJuYWxzL2EtY29uc3RydWN0b3InKTtcbnZhciBpc051bGxPclVuZGVmaW5lZCA9IHJlcXVpcmUoJy4uL2ludGVybmFscy9pcy1udWxsLW9yLXVuZGVmaW5lZCcpO1xudmFyIHdlbGxLbm93blN5bWJvbCA9IHJlcXVpcmUoJy4uL2ludGVybmFscy93ZWxsLWtub3duLXN5bWJvbCcpO1xuXG52YXIgU1BFQ0lFUyA9IHdlbGxLbm93blN5bWJvbCgnc3BlY2llcycpO1xuXG4vLyBgU3BlY2llc0NvbnN0cnVjdG9yYCBhYnN0cmFjdCBvcGVyYXRpb25cbi8vIGh0dHBzOi8vdGMzOS5lcy9lY21hMjYyLyNzZWMtc3BlY2llc2NvbnN0cnVjdG9yXG5tb2R1bGUuZXhwb3J0cyA9IGZ1bmN0aW9uIChPLCBkZWZhdWx0Q29uc3RydWN0b3IpIHtcbiAgdmFyIEMgPSBhbk9iamVjdChPKS5jb25zdHJ1Y3RvcjtcbiAgdmFyIFM7XG4gIHJldHVybiBDID09PSB1bmRlZmluZWQgfHwgaXNOdWxsT3JVbmRlZmluZWQoUyA9IGFuT2JqZWN0KEMpW1NQRUNJRVNdKSA/IGRlZmF1bHRDb25zdHJ1Y3RvciA6IGFDb25zdHJ1Y3RvcihTKTtcbn07XG4iLCIndXNlIHN0cmljdCc7XG52YXIgdW5jdXJyeVRoaXMgPSByZXF1aXJlKCcuLi9pbnRlcm5hbHMvZnVuY3Rpb24tdW5jdXJyeS10aGlzJyk7XG52YXIgdG9JbnRlZ2VyT3JJbmZpbml0eSA9IHJlcXVpcmUoJy4uL2ludGVybmFscy90by1pbnRlZ2VyLW9yLWluZmluaXR5Jyk7XG52YXIgdG9TdHJpbmcgPSByZXF1aXJlKCcuLi9pbnRlcm5hbHMvdG8tc3RyaW5nJyk7XG52YXIgcmVxdWlyZU9iamVjdENvZXJjaWJsZSA9IHJlcXVpcmUoJy4uL2ludGVybmFscy9yZXF1aXJlLW9iamVjdC1jb2VyY2libGUnKTtcblxudmFyIGNoYXJBdCA9IHVuY3VycnlUaGlzKCcnLmNoYXJBdCk7XG52YXIgY2hhckNvZGVBdCA9IHVuY3VycnlUaGlzKCcnLmNoYXJDb2RlQXQpO1xudmFyIHN0cmluZ1NsaWNlID0gdW5jdXJyeVRoaXMoJycuc2xpY2UpO1xuXG52YXIgY3JlYXRlTWV0aG9kID0gZnVuY3Rpb24gKENPTlZFUlRfVE9fU1RSSU5HKSB7XG4gIHJldHVybiBmdW5jdGlvbiAoJHRoaXMsIHBvcykge1xuICAgIHZhciBTID0gdG9TdHJpbmcocmVxdWlyZU9iamVjdENvZXJjaWJsZSgkdGhpcykpO1xuICAgIHZhciBwb3NpdGlvbiA9IHRvSW50ZWdlck9ySW5maW5pdHkocG9zKTtcbiAgICB2YXIgc2l6ZSA9IFMubGVuZ3RoO1xuICAgIHZhciBmaXJzdCwgc2Vjb25kO1xuICAgIGlmIChwb3NpdGlvbiA8IDAgfHwgcG9zaXRpb24gPj0gc2l6ZSkgcmV0dXJuIENPTlZFUlRfVE9fU1RSSU5HID8gJycgOiB1bmRlZmluZWQ7XG4gICAgZmlyc3QgPSBjaGFyQ29kZUF0KFMsIHBvc2l0aW9uKTtcbiAgICByZXR1cm4gZmlyc3QgPCAweEQ4MDAgfHwgZmlyc3QgPiAweERCRkYgfHwgcG9zaXRpb24gKyAxID09PSBzaXplXG4gICAgICB8fCAoc2Vjb25kID0gY2hhckNvZGVBdChTLCBwb3NpdGlvbiArIDEpKSA8IDB4REMwMCB8fCBzZWNvbmQgPiAweERGRkZcbiAgICAgICAgPyBDT05WRVJUX1RPX1NUUklOR1xuICAgICAgICAgID8gY2hhckF0KFMsIHBvc2l0aW9uKVxuICAgICAgICAgIDogZmlyc3RcbiAgICAgICAgOiBDT05WRVJUX1RPX1NUUklOR1xuICAgICAgICAgID8gc3RyaW5nU2xpY2UoUywgcG9zaXRpb24sIHBvc2l0aW9uICsgMilcbiAgICAgICAgICA6IChmaXJzdCAtIDB4RDgwMCA8PCAxMCkgKyAoc2Vjb25kIC0gMHhEQzAwKSArIDB4MTAwMDA7XG4gIH07XG59O1xuXG5tb2R1bGUuZXhwb3J0cyA9IHtcbiAgLy8gYFN0cmluZy5wcm90b3R5cGUuY29kZVBvaW50QXRgIG1ldGhvZFxuICAvLyBodHRwczovL3RjMzkuZXMvZWNtYTI2Mi8jc2VjLXN0cmluZy5wcm90b3R5cGUuY29kZXBvaW50YXRcbiAgY29kZUF0OiBjcmVhdGVNZXRob2QoZmFsc2UpLFxuICAvLyBgU3RyaW5nLnByb3RvdHlwZS5hdGAgbWV0aG9kXG4gIC8vIGh0dHBzOi8vZ2l0aHViLmNvbS9tYXRoaWFzYnluZW5zL1N0cmluZy5wcm90b3R5cGUuYXRcbiAgY2hhckF0OiBjcmVhdGVNZXRob2QodHJ1ZSlcbn07XG4iLCIndXNlIHN0cmljdCc7XG4vLyBiYXNlZCBvbiBodHRwczovL2dpdGh1Yi5jb20vYmVzdGllanMvcHVueWNvZGUuanMvYmxvYi9tYXN0ZXIvcHVueWNvZGUuanNcbnZhciB1bmN1cnJ5VGhpcyA9IHJlcXVpcmUoJy4uL2ludGVybmFscy9mdW5jdGlvbi11bmN1cnJ5LXRoaXMnKTtcblxudmFyIG1heEludCA9IDIxNDc0ODM2NDc7IC8vIGFrYS4gMHg3RkZGRkZGRiBvciAyXjMxLTFcbnZhciBiYXNlID0gMzY7XG52YXIgdE1pbiA9IDE7XG52YXIgdE1heCA9IDI2O1xudmFyIHNrZXcgPSAzODtcbnZhciBkYW1wID0gNzAwO1xudmFyIGluaXRpYWxCaWFzID0gNzI7XG52YXIgaW5pdGlhbE4gPSAxMjg7IC8vIDB4ODBcbnZhciBkZWxpbWl0ZXIgPSAnLSc7IC8vICdcXHgyRCdcbnZhciByZWdleE5vbkFTQ0lJID0gL1teXFwwLVxcdTAwN0VdLzsgLy8gbm9uLUFTQ0lJIGNoYXJzXG52YXIgcmVnZXhTZXBhcmF0b3JzID0gL1suXFx1MzAwMlxcdUZGMEVcXHVGRjYxXS9nOyAvLyBSRkMgMzQ5MCBzZXBhcmF0b3JzXG52YXIgT1ZFUkZMT1dfRVJST1IgPSAnT3ZlcmZsb3c6IGlucHV0IG5lZWRzIHdpZGVyIGludGVnZXJzIHRvIHByb2Nlc3MnO1xudmFyIGJhc2VNaW51c1RNaW4gPSBiYXNlIC0gdE1pbjtcblxudmFyICRSYW5nZUVycm9yID0gUmFuZ2VFcnJvcjtcbnZhciBleGVjID0gdW5jdXJyeVRoaXMocmVnZXhTZXBhcmF0b3JzLmV4ZWMpO1xudmFyIGZsb29yID0gTWF0aC5mbG9vcjtcbnZhciBmcm9tQ2hhckNvZGUgPSBTdHJpbmcuZnJvbUNoYXJDb2RlO1xudmFyIGNoYXJDb2RlQXQgPSB1bmN1cnJ5VGhpcygnJy5jaGFyQ29kZUF0KTtcbnZhciBqb2luID0gdW5jdXJyeVRoaXMoW10uam9pbik7XG52YXIgcHVzaCA9IHVuY3VycnlUaGlzKFtdLnB1c2gpO1xudmFyIHJlcGxhY2UgPSB1bmN1cnJ5VGhpcygnJy5yZXBsYWNlKTtcbnZhciBzcGxpdCA9IHVuY3VycnlUaGlzKCcnLnNwbGl0KTtcbnZhciB0b0xvd2VyQ2FzZSA9IHVuY3VycnlUaGlzKCcnLnRvTG93ZXJDYXNlKTtcblxuLyoqXG4gKiBDcmVhdGVzIGFuIGFycmF5IGNvbnRhaW5pbmcgdGhlIG51bWVyaWMgY29kZSBwb2ludHMgb2YgZWFjaCBVbmljb2RlXG4gKiBjaGFyYWN0ZXIgaW4gdGhlIHN0cmluZy4gV2hpbGUgSmF2YVNjcmlwdCB1c2VzIFVDUy0yIGludGVybmFsbHksXG4gKiB0aGlzIGZ1bmN0aW9uIHdpbGwgY29udmVydCBhIHBhaXIgb2Ygc3Vycm9nYXRlIGhhbHZlcyAoZWFjaCBvZiB3aGljaFxuICogVUNTLTIgZXhwb3NlcyBhcyBzZXBhcmF0ZSBjaGFyYWN0ZXJzKSBpbnRvIGEgc2luZ2xlIGNvZGUgcG9pbnQsXG4gKiBtYXRjaGluZyBVVEYtMTYuXG4gKi9cbnZhciB1Y3MyZGVjb2RlID0gZnVuY3Rpb24gKHN0cmluZykge1xuICB2YXIgb3V0cHV0ID0gW107XG4gIHZhciBjb3VudGVyID0gMDtcbiAgdmFyIGxlbmd0aCA9IHN0cmluZy5sZW5ndGg7XG4gIHdoaWxlIChjb3VudGVyIDwgbGVuZ3RoKSB7XG4gICAgdmFyIHZhbHVlID0gY2hhckNvZGVBdChzdHJpbmcsIGNvdW50ZXIrKyk7XG4gICAgaWYgKHZhbHVlID49IDB4RDgwMCAmJiB2YWx1ZSA8PSAweERCRkYgJiYgY291bnRlciA8IGxlbmd0aCkge1xuICAgICAgLy8gSXQncyBhIGhpZ2ggc3Vycm9nYXRlLCBhbmQgdGhlcmUgaXMgYSBuZXh0IGNoYXJhY3Rlci5cbiAgICAgIHZhciBleHRyYSA9IGNoYXJDb2RlQXQoc3RyaW5nLCBjb3VudGVyKyspO1xuICAgICAgaWYgKChleHRyYSAmIDB4RkMwMCkgPT09IDB4REMwMCkgeyAvLyBMb3cgc3Vycm9nYXRlLlxuICAgICAgICBwdXNoKG91dHB1dCwgKCh2YWx1ZSAmIDB4M0ZGKSA8PCAxMCkgKyAoZXh0cmEgJiAweDNGRikgKyAweDEwMDAwKTtcbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIC8vIEl0J3MgYW4gdW5tYXRjaGVkIHN1cnJvZ2F0ZTsgb25seSBhcHBlbmQgdGhpcyBjb2RlIHVuaXQsIGluIGNhc2UgdGhlXG4gICAgICAgIC8vIG5leHQgY29kZSB1bml0IGlzIHRoZSBoaWdoIHN1cnJvZ2F0ZSBvZiBhIHN1cnJvZ2F0ZSBwYWlyLlxuICAgICAgICBwdXNoKG91dHB1dCwgdmFsdWUpO1xuICAgICAgICBjb3VudGVyLS07XG4gICAgICB9XG4gICAgfSBlbHNlIHtcbiAgICAgIHB1c2gob3V0cHV0LCB2YWx1ZSk7XG4gICAgfVxuICB9XG4gIHJldHVybiBvdXRwdXQ7XG59O1xuXG4vKipcbiAqIENvbnZlcnRzIGEgZGlnaXQvaW50ZWdlciBpbnRvIGEgYmFzaWMgY29kZSBwb2ludC5cbiAqL1xudmFyIGRpZ2l0VG9CYXNpYyA9IGZ1bmN0aW9uIChkaWdpdCkge1xuICAvLyAgMC4uMjUgbWFwIHRvIEFTQ0lJIGEuLnogb3IgQS4uWlxuICAvLyAyNi4uMzUgbWFwIHRvIEFTQ0lJIDAuLjlcbiAgcmV0dXJuIGRpZ2l0ICsgMjIgKyA3NSAqIChkaWdpdCA8IDI2KTtcbn07XG5cbi8qKlxuICogQmlhcyBhZGFwdGF0aW9uIGZ1bmN0aW9uIGFzIHBlciBzZWN0aW9uIDMuNCBvZiBSRkMgMzQ5Mi5cbiAqIGh0dHBzOi8vdG9vbHMuaWV0Zi5vcmcvaHRtbC9yZmMzNDkyI3NlY3Rpb24tMy40XG4gKi9cbnZhciBhZGFwdCA9IGZ1bmN0aW9uIChkZWx0YSwgbnVtUG9pbnRzLCBmaXJzdFRpbWUpIHtcbiAgdmFyIGsgPSAwO1xuICBkZWx0YSA9IGZpcnN0VGltZSA/IGZsb29yKGRlbHRhIC8gZGFtcCkgOiBkZWx0YSA+PiAxO1xuICBkZWx0YSArPSBmbG9vcihkZWx0YSAvIG51bVBvaW50cyk7XG4gIHdoaWxlIChkZWx0YSA+IGJhc2VNaW51c1RNaW4gKiB0TWF4ID4+IDEpIHtcbiAgICBkZWx0YSA9IGZsb29yKGRlbHRhIC8gYmFzZU1pbnVzVE1pbik7XG4gICAgayArPSBiYXNlO1xuICB9XG4gIHJldHVybiBmbG9vcihrICsgKGJhc2VNaW51c1RNaW4gKyAxKSAqIGRlbHRhIC8gKGRlbHRhICsgc2tldykpO1xufTtcblxuLyoqXG4gKiBDb252ZXJ0cyBhIHN0cmluZyBvZiBVbmljb2RlIHN5bWJvbHMgKGUuZy4gYSBkb21haW4gbmFtZSBsYWJlbCkgdG8gYVxuICogUHVueWNvZGUgc3RyaW5nIG9mIEFTQ0lJLW9ubHkgc3ltYm9scy5cbiAqL1xudmFyIGVuY29kZSA9IGZ1bmN0aW9uIChpbnB1dCkge1xuICB2YXIgb3V0cHV0ID0gW107XG5cbiAgLy8gQ29udmVydCB0aGUgaW5wdXQgaW4gVUNTLTIgdG8gYW4gYXJyYXkgb2YgVW5pY29kZSBjb2RlIHBvaW50cy5cbiAgaW5wdXQgPSB1Y3MyZGVjb2RlKGlucHV0KTtcblxuICAvLyBDYWNoZSB0aGUgbGVuZ3RoLlxuICB2YXIgaW5wdXRMZW5ndGggPSBpbnB1dC5sZW5ndGg7XG5cbiAgLy8gSW5pdGlhbGl6ZSB0aGUgc3RhdGUuXG4gIHZhciBuID0gaW5pdGlhbE47XG4gIHZhciBkZWx0YSA9IDA7XG4gIHZhciBiaWFzID0gaW5pdGlhbEJpYXM7XG4gIHZhciBpLCBjdXJyZW50VmFsdWU7XG5cbiAgLy8gSGFuZGxlIHRoZSBiYXNpYyBjb2RlIHBvaW50cy5cbiAgZm9yIChpID0gMDsgaSA8IGlucHV0Lmxlbmd0aDsgaSsrKSB7XG4gICAgY3VycmVudFZhbHVlID0gaW5wdXRbaV07XG4gICAgaWYgKGN1cnJlbnRWYWx1ZSA8IDB4ODApIHtcbiAgICAgIHB1c2gob3V0cHV0LCBmcm9tQ2hhckNvZGUoY3VycmVudFZhbHVlKSk7XG4gICAgfVxuICB9XG5cbiAgdmFyIGJhc2ljTGVuZ3RoID0gb3V0cHV0Lmxlbmd0aDsgLy8gbnVtYmVyIG9mIGJhc2ljIGNvZGUgcG9pbnRzLlxuICB2YXIgaGFuZGxlZENQQ291bnQgPSBiYXNpY0xlbmd0aDsgLy8gbnVtYmVyIG9mIGNvZGUgcG9pbnRzIHRoYXQgaGF2ZSBiZWVuIGhhbmRsZWQ7XG5cbiAgLy8gRmluaXNoIHRoZSBiYXNpYyBzdHJpbmcgd2l0aCBhIGRlbGltaXRlciB1bmxlc3MgaXQncyBlbXB0eS5cbiAgaWYgKGJhc2ljTGVuZ3RoKSB7XG4gICAgcHVzaChvdXRwdXQsIGRlbGltaXRlcik7XG4gIH1cblxuICAvLyBNYWluIGVuY29kaW5nIGxvb3A6XG4gIHdoaWxlIChoYW5kbGVkQ1BDb3VudCA8IGlucHV0TGVuZ3RoKSB7XG4gICAgLy8gQWxsIG5vbi1iYXNpYyBjb2RlIHBvaW50cyA8IG4gaGF2ZSBiZWVuIGhhbmRsZWQgYWxyZWFkeS4gRmluZCB0aGUgbmV4dCBsYXJnZXIgb25lOlxuICAgIHZhciBtID0gbWF4SW50O1xuICAgIGZvciAoaSA9IDA7IGkgPCBpbnB1dC5sZW5ndGg7IGkrKykge1xuICAgICAgY3VycmVudFZhbHVlID0gaW5wdXRbaV07XG4gICAgICBpZiAoY3VycmVudFZhbHVlID49IG4gJiYgY3VycmVudFZhbHVlIDwgbSkge1xuICAgICAgICBtID0gY3VycmVudFZhbHVlO1xuICAgICAgfVxuICAgIH1cblxuICAgIC8vIEluY3JlYXNlIGBkZWx0YWAgZW5vdWdoIHRvIGFkdmFuY2UgdGhlIGRlY29kZXIncyA8bixpPiBzdGF0ZSB0byA8bSwwPiwgYnV0IGd1YXJkIGFnYWluc3Qgb3ZlcmZsb3cuXG4gICAgdmFyIGhhbmRsZWRDUENvdW50UGx1c09uZSA9IGhhbmRsZWRDUENvdW50ICsgMTtcbiAgICBpZiAobSAtIG4gPiBmbG9vcigobWF4SW50IC0gZGVsdGEpIC8gaGFuZGxlZENQQ291bnRQbHVzT25lKSkge1xuICAgICAgdGhyb3cgbmV3ICRSYW5nZUVycm9yKE9WRVJGTE9XX0VSUk9SKTtcbiAgICB9XG5cbiAgICBkZWx0YSArPSAobSAtIG4pICogaGFuZGxlZENQQ291bnRQbHVzT25lO1xuICAgIG4gPSBtO1xuXG4gICAgZm9yIChpID0gMDsgaSA8IGlucHV0Lmxlbmd0aDsgaSsrKSB7XG4gICAgICBjdXJyZW50VmFsdWUgPSBpbnB1dFtpXTtcbiAgICAgIGlmIChjdXJyZW50VmFsdWUgPCBuICYmICsrZGVsdGEgPiBtYXhJbnQpIHtcbiAgICAgICAgdGhyb3cgbmV3ICRSYW5nZUVycm9yKE9WRVJGTE9XX0VSUk9SKTtcbiAgICAgIH1cbiAgICAgIGlmIChjdXJyZW50VmFsdWUgPT09IG4pIHtcbiAgICAgICAgLy8gUmVwcmVzZW50IGRlbHRhIGFzIGEgZ2VuZXJhbGl6ZWQgdmFyaWFibGUtbGVuZ3RoIGludGVnZXIuXG4gICAgICAgIHZhciBxID0gZGVsdGE7XG4gICAgICAgIHZhciBrID0gYmFzZTtcbiAgICAgICAgd2hpbGUgKHRydWUpIHtcbiAgICAgICAgICB2YXIgdCA9IGsgPD0gYmlhcyA/IHRNaW4gOiBrID49IGJpYXMgKyB0TWF4ID8gdE1heCA6IGsgLSBiaWFzO1xuICAgICAgICAgIGlmIChxIDwgdCkgYnJlYWs7XG4gICAgICAgICAgdmFyIHFNaW51c1QgPSBxIC0gdDtcbiAgICAgICAgICB2YXIgYmFzZU1pbnVzVCA9IGJhc2UgLSB0O1xuICAgICAgICAgIHB1c2gob3V0cHV0LCBmcm9tQ2hhckNvZGUoZGlnaXRUb0Jhc2ljKHQgKyBxTWludXNUICUgYmFzZU1pbnVzVCkpKTtcbiAgICAgICAgICBxID0gZmxvb3IocU1pbnVzVCAvIGJhc2VNaW51c1QpO1xuICAgICAgICAgIGsgKz0gYmFzZTtcbiAgICAgICAgfVxuXG4gICAgICAgIHB1c2gob3V0cHV0LCBmcm9tQ2hhckNvZGUoZGlnaXRUb0Jhc2ljKHEpKSk7XG4gICAgICAgIGJpYXMgPSBhZGFwdChkZWx0YSwgaGFuZGxlZENQQ291bnRQbHVzT25lLCBoYW5kbGVkQ1BDb3VudCA9PT0gYmFzaWNMZW5ndGgpO1xuICAgICAgICBkZWx0YSA9IDA7XG4gICAgICAgIGhhbmRsZWRDUENvdW50Kys7XG4gICAgICB9XG4gICAgfVxuXG4gICAgZGVsdGErKztcbiAgICBuKys7XG4gIH1cbiAgcmV0dXJuIGpvaW4ob3V0cHV0LCAnJyk7XG59O1xuXG5tb2R1bGUuZXhwb3J0cyA9IGZ1bmN0aW9uIChpbnB1dCkge1xuICB2YXIgZW5jb2RlZCA9IFtdO1xuICB2YXIgbGFiZWxzID0gc3BsaXQocmVwbGFjZSh0b0xvd2VyQ2FzZShpbnB1dCksIHJlZ2V4U2VwYXJhdG9ycywgJ1xcdTAwMkUnKSwgJy4nKTtcbiAgdmFyIGksIGxhYmVsO1xuICBmb3IgKGkgPSAwOyBpIDwgbGFiZWxzLmxlbmd0aDsgaSsrKSB7XG4gICAgbGFiZWwgPSBsYWJlbHNbaV07XG4gICAgcHVzaChlbmNvZGVkLCBleGVjKHJlZ2V4Tm9uQVNDSUksIGxhYmVsKSA/ICd4bi0tJyArIGVuY29kZShsYWJlbCkgOiBsYWJlbCk7XG4gIH1cbiAgcmV0dXJuIGpvaW4oZW5jb2RlZCwgJy4nKTtcbn07XG4iLCIndXNlIHN0cmljdCc7XG4vKiBlc2xpbnQtZGlzYWJsZSBlcy9uby1zeW1ib2wgLS0gcmVxdWlyZWQgZm9yIHRlc3RpbmcgKi9cbnZhciBWOF9WRVJTSU9OID0gcmVxdWlyZSgnLi4vaW50ZXJuYWxzL2VuZ2luZS12OC12ZXJzaW9uJyk7XG52YXIgZmFpbHMgPSByZXF1aXJlKCcuLi9pbnRlcm5hbHMvZmFpbHMnKTtcbnZhciBnbG9iYWwgPSByZXF1aXJlKCcuLi9pbnRlcm5hbHMvZ2xvYmFsJyk7XG5cbnZhciAkU3RyaW5nID0gZ2xvYmFsLlN0cmluZztcblxuLy8gZXNsaW50LWRpc2FibGUtbmV4dC1saW5lIGVzL25vLW9iamVjdC1nZXRvd25wcm9wZXJ0eXN5bWJvbHMgLS0gcmVxdWlyZWQgZm9yIHRlc3Rpbmdcbm1vZHVsZS5leHBvcnRzID0gISFPYmplY3QuZ2V0T3duUHJvcGVydHlTeW1ib2xzICYmICFmYWlscyhmdW5jdGlvbiAoKSB7XG4gIHZhciBzeW1ib2wgPSBTeW1ib2woJ3N5bWJvbCBkZXRlY3Rpb24nKTtcbiAgLy8gQ2hyb21lIDM4IFN5bWJvbCBoYXMgaW5jb3JyZWN0IHRvU3RyaW5nIGNvbnZlcnNpb25cbiAgLy8gYGdldC1vd24tcHJvcGVydHktc3ltYm9sc2AgcG9seWZpbGwgc3ltYm9scyBjb252ZXJ0ZWQgdG8gb2JqZWN0IGFyZSBub3QgU3ltYm9sIGluc3RhbmNlc1xuICAvLyBuYjogRG8gbm90IGNhbGwgYFN0cmluZ2AgZGlyZWN0bHkgdG8gYXZvaWQgdGhpcyBiZWluZyBvcHRpbWl6ZWQgb3V0IHRvIGBzeW1ib2wrJydgIHdoaWNoIHdpbGwsXG4gIC8vIG9mIGNvdXJzZSwgZmFpbC5cbiAgcmV0dXJuICEkU3RyaW5nKHN5bWJvbCkgfHwgIShPYmplY3Qoc3ltYm9sKSBpbnN0YW5jZW9mIFN5bWJvbCkgfHxcbiAgICAvLyBDaHJvbWUgMzgtNDAgc3ltYm9scyBhcmUgbm90IGluaGVyaXRlZCBmcm9tIERPTSBjb2xsZWN0aW9ucyBwcm90b3R5cGVzIHRvIGluc3RhbmNlc1xuICAgICFTeW1ib2wuc2hhbSAmJiBWOF9WRVJTSU9OICYmIFY4X1ZFUlNJT04gPCA0MTtcbn0pO1xuIiwiJ3VzZSBzdHJpY3QnO1xudmFyIHRvSW50ZWdlck9ySW5maW5pdHkgPSByZXF1aXJlKCcuLi9pbnRlcm5hbHMvdG8taW50ZWdlci1vci1pbmZpbml0eScpO1xuXG52YXIgbWF4ID0gTWF0aC5tYXg7XG52YXIgbWluID0gTWF0aC5taW47XG5cbi8vIEhlbHBlciBmb3IgYSBwb3B1bGFyIHJlcGVhdGluZyBjYXNlIG9mIHRoZSBzcGVjOlxuLy8gTGV0IGludGVnZXIgYmUgPyBUb0ludGVnZXIoaW5kZXgpLlxuLy8gSWYgaW50ZWdlciA8IDAsIGxldCByZXN1bHQgYmUgbWF4KChsZW5ndGggKyBpbnRlZ2VyKSwgMCk7IGVsc2UgbGV0IHJlc3VsdCBiZSBtaW4oaW50ZWdlciwgbGVuZ3RoKS5cbm1vZHVsZS5leHBvcnRzID0gZnVuY3Rpb24gKGluZGV4LCBsZW5ndGgpIHtcbiAgdmFyIGludGVnZXIgPSB0b0ludGVnZXJPckluZmluaXR5KGluZGV4KTtcbiAgcmV0dXJuIGludGVnZXIgPCAwID8gbWF4KGludGVnZXIgKyBsZW5ndGgsIDApIDogbWluKGludGVnZXIsIGxlbmd0aCk7XG59O1xuIiwiJ3VzZSBzdHJpY3QnO1xuLy8gdG9PYmplY3Qgd2l0aCBmYWxsYmFjayBmb3Igbm9uLWFycmF5LWxpa2UgRVMzIHN0cmluZ3NcbnZhciBJbmRleGVkT2JqZWN0ID0gcmVxdWlyZSgnLi4vaW50ZXJuYWxzL2luZGV4ZWQtb2JqZWN0Jyk7XG52YXIgcmVxdWlyZU9iamVjdENvZXJjaWJsZSA9IHJlcXVpcmUoJy4uL2ludGVybmFscy9yZXF1aXJlLW9iamVjdC1jb2VyY2libGUnKTtcblxubW9kdWxlLmV4cG9ydHMgPSBmdW5jdGlvbiAoaXQpIHtcbiAgcmV0dXJuIEluZGV4ZWRPYmplY3QocmVxdWlyZU9iamVjdENvZXJjaWJsZShpdCkpO1xufTtcbiIsIid1c2Ugc3RyaWN0JztcbnZhciB0cnVuYyA9IHJlcXVpcmUoJy4uL2ludGVybmFscy9tYXRoLXRydW5jJyk7XG5cbi8vIGBUb0ludGVnZXJPckluZmluaXR5YCBhYnN0cmFjdCBvcGVyYXRpb25cbi8vIGh0dHBzOi8vdGMzOS5lcy9lY21hMjYyLyNzZWMtdG9pbnRlZ2Vyb3JpbmZpbml0eVxubW9kdWxlLmV4cG9ydHMgPSBmdW5jdGlvbiAoYXJndW1lbnQpIHtcbiAgdmFyIG51bWJlciA9ICthcmd1bWVudDtcbiAgLy8gZXNsaW50LWRpc2FibGUtbmV4dC1saW5lIG5vLXNlbGYtY29tcGFyZSAtLSBOYU4gY2hlY2tcbiAgcmV0dXJuIG51bWJlciAhPT0gbnVtYmVyIHx8IG51bWJlciA9PT0gMCA/IDAgOiB0cnVuYyhudW1iZXIpO1xufTtcbiIsIid1c2Ugc3RyaWN0JztcbnZhciB0b0ludGVnZXJPckluZmluaXR5ID0gcmVxdWlyZSgnLi4vaW50ZXJuYWxzL3RvLWludGVnZXItb3ItaW5maW5pdHknKTtcblxudmFyIG1pbiA9IE1hdGgubWluO1xuXG4vLyBgVG9MZW5ndGhgIGFic3RyYWN0IG9wZXJhdGlvblxuLy8gaHR0cHM6Ly90YzM5LmVzL2VjbWEyNjIvI3NlYy10b2xlbmd0aFxubW9kdWxlLmV4cG9ydHMgPSBmdW5jdGlvbiAoYXJndW1lbnQpIHtcbiAgdmFyIGxlbiA9IHRvSW50ZWdlck9ySW5maW5pdHkoYXJndW1lbnQpO1xuICByZXR1cm4gbGVuID4gMCA/IG1pbihsZW4sIDB4MUZGRkZGRkZGRkZGRkYpIDogMDsgLy8gMiAqKiA1MyAtIDEgPT0gOTAwNzE5OTI1NDc0MDk5MVxufTtcbiIsIid1c2Ugc3RyaWN0JztcbnZhciByZXF1aXJlT2JqZWN0Q29lcmNpYmxlID0gcmVxdWlyZSgnLi4vaW50ZXJuYWxzL3JlcXVpcmUtb2JqZWN0LWNvZXJjaWJsZScpO1xuXG52YXIgJE9iamVjdCA9IE9iamVjdDtcblxuLy8gYFRvT2JqZWN0YCBhYnN0cmFjdCBvcGVyYXRpb25cbi8vIGh0dHBzOi8vdGMzOS5lcy9lY21hMjYyLyNzZWMtdG9vYmplY3Rcbm1vZHVsZS5leHBvcnRzID0gZnVuY3Rpb24gKGFyZ3VtZW50KSB7XG4gIHJldHVybiAkT2JqZWN0KHJlcXVpcmVPYmplY3RDb2VyY2libGUoYXJndW1lbnQpKTtcbn07XG4iLCIndXNlIHN0cmljdCc7XG52YXIgY2FsbCA9IHJlcXVpcmUoJy4uL2ludGVybmFscy9mdW5jdGlvbi1jYWxsJyk7XG52YXIgaXNPYmplY3QgPSByZXF1aXJlKCcuLi9pbnRlcm5hbHMvaXMtb2JqZWN0Jyk7XG52YXIgaXNTeW1ib2wgPSByZXF1aXJlKCcuLi9pbnRlcm5hbHMvaXMtc3ltYm9sJyk7XG52YXIgZ2V0TWV0aG9kID0gcmVxdWlyZSgnLi4vaW50ZXJuYWxzL2dldC1tZXRob2QnKTtcbnZhciBvcmRpbmFyeVRvUHJpbWl0aXZlID0gcmVxdWlyZSgnLi4vaW50ZXJuYWxzL29yZGluYXJ5LXRvLXByaW1pdGl2ZScpO1xudmFyIHdlbGxLbm93blN5bWJvbCA9IHJlcXVpcmUoJy4uL2ludGVybmFscy93ZWxsLWtub3duLXN5bWJvbCcpO1xuXG52YXIgJFR5cGVFcnJvciA9IFR5cGVFcnJvcjtcbnZhciBUT19QUklNSVRJVkUgPSB3ZWxsS25vd25TeW1ib2woJ3RvUHJpbWl0aXZlJyk7XG5cbi8vIGBUb1ByaW1pdGl2ZWAgYWJzdHJhY3Qgb3BlcmF0aW9uXG4vLyBodHRwczovL3RjMzkuZXMvZWNtYTI2Mi8jc2VjLXRvcHJpbWl0aXZlXG5tb2R1bGUuZXhwb3J0cyA9IGZ1bmN0aW9uIChpbnB1dCwgcHJlZikge1xuICBpZiAoIWlzT2JqZWN0KGlucHV0KSB8fCBpc1N5bWJvbChpbnB1dCkpIHJldHVybiBpbnB1dDtcbiAgdmFyIGV4b3RpY1RvUHJpbSA9IGdldE1ldGhvZChpbnB1dCwgVE9fUFJJTUlUSVZFKTtcbiAgdmFyIHJlc3VsdDtcbiAgaWYgKGV4b3RpY1RvUHJpbSkge1xuICAgIGlmIChwcmVmID09PSB1bmRlZmluZWQpIHByZWYgPSAnZGVmYXVsdCc7XG4gICAgcmVzdWx0ID0gY2FsbChleG90aWNUb1ByaW0sIGlucHV0LCBwcmVmKTtcbiAgICBpZiAoIWlzT2JqZWN0KHJlc3VsdCkgfHwgaXNTeW1ib2wocmVzdWx0KSkgcmV0dXJuIHJlc3VsdDtcbiAgICB0aHJvdyBuZXcgJFR5cGVFcnJvcihcIkNhbid0IGNvbnZlcnQgb2JqZWN0IHRvIHByaW1pdGl2ZSB2YWx1ZVwiKTtcbiAgfVxuICBpZiAocHJlZiA9PT0gdW5kZWZpbmVkKSBwcmVmID0gJ251bWJlcic7XG4gIHJldHVybiBvcmRpbmFyeVRvUHJpbWl0aXZlKGlucHV0LCBwcmVmKTtcbn07XG4iLCIndXNlIHN0cmljdCc7XG52YXIgdG9QcmltaXRpdmUgPSByZXF1aXJlKCcuLi9pbnRlcm5hbHMvdG8tcHJpbWl0aXZlJyk7XG52YXIgaXNTeW1ib2wgPSByZXF1aXJlKCcuLi9pbnRlcm5hbHMvaXMtc3ltYm9sJyk7XG5cbi8vIGBUb1Byb3BlcnR5S2V5YCBhYnN0cmFjdCBvcGVyYXRpb25cbi8vIGh0dHBzOi8vdGMzOS5lcy9lY21hMjYyLyNzZWMtdG9wcm9wZXJ0eWtleVxubW9kdWxlLmV4cG9ydHMgPSBmdW5jdGlvbiAoYXJndW1lbnQpIHtcbiAgdmFyIGtleSA9IHRvUHJpbWl0aXZlKGFyZ3VtZW50LCAnc3RyaW5nJyk7XG4gIHJldHVybiBpc1N5bWJvbChrZXkpID8ga2V5IDoga2V5ICsgJyc7XG59O1xuIiwiJ3VzZSBzdHJpY3QnO1xudmFyIHdlbGxLbm93blN5bWJvbCA9IHJlcXVpcmUoJy4uL2ludGVybmFscy93ZWxsLWtub3duLXN5bWJvbCcpO1xuXG52YXIgVE9fU1RSSU5HX1RBRyA9IHdlbGxLbm93blN5bWJvbCgndG9TdHJpbmdUYWcnKTtcbnZhciB0ZXN0ID0ge307XG5cbnRlc3RbVE9fU1RSSU5HX1RBR10gPSAneic7XG5cbm1vZHVsZS5leHBvcnRzID0gU3RyaW5nKHRlc3QpID09PSAnW29iamVjdCB6XSc7XG4iLCIndXNlIHN0cmljdCc7XG52YXIgY2xhc3NvZiA9IHJlcXVpcmUoJy4uL2ludGVybmFscy9jbGFzc29mJyk7XG5cbnZhciAkU3RyaW5nID0gU3RyaW5nO1xuXG5tb2R1bGUuZXhwb3J0cyA9IGZ1bmN0aW9uIChhcmd1bWVudCkge1xuICBpZiAoY2xhc3NvZihhcmd1bWVudCkgPT09ICdTeW1ib2wnKSB0aHJvdyBuZXcgVHlwZUVycm9yKCdDYW5ub3QgY29udmVydCBhIFN5bWJvbCB2YWx1ZSB0byBhIHN0cmluZycpO1xuICByZXR1cm4gJFN0cmluZyhhcmd1bWVudCk7XG59O1xuIiwiJ3VzZSBzdHJpY3QnO1xudmFyICRTdHJpbmcgPSBTdHJpbmc7XG5cbm1vZHVsZS5leHBvcnRzID0gZnVuY3Rpb24gKGFyZ3VtZW50KSB7XG4gIHRyeSB7XG4gICAgcmV0dXJuICRTdHJpbmcoYXJndW1lbnQpO1xuICB9IGNhdGNoIChlcnJvcikge1xuICAgIHJldHVybiAnT2JqZWN0JztcbiAgfVxufTtcbiIsIid1c2Ugc3RyaWN0JztcbnZhciB1bmN1cnJ5VGhpcyA9IHJlcXVpcmUoJy4uL2ludGVybmFscy9mdW5jdGlvbi11bmN1cnJ5LXRoaXMnKTtcblxudmFyIGlkID0gMDtcbnZhciBwb3N0Zml4ID0gTWF0aC5yYW5kb20oKTtcbnZhciB0b1N0cmluZyA9IHVuY3VycnlUaGlzKDEuMC50b1N0cmluZyk7XG5cbm1vZHVsZS5leHBvcnRzID0gZnVuY3Rpb24gKGtleSkge1xuICByZXR1cm4gJ1N5bWJvbCgnICsgKGtleSA9PT0gdW5kZWZpbmVkID8gJycgOiBrZXkpICsgJylfJyArIHRvU3RyaW5nKCsraWQgKyBwb3N0Zml4LCAzNik7XG59O1xuIiwiJ3VzZSBzdHJpY3QnO1xudmFyIGZhaWxzID0gcmVxdWlyZSgnLi4vaW50ZXJuYWxzL2ZhaWxzJyk7XG52YXIgd2VsbEtub3duU3ltYm9sID0gcmVxdWlyZSgnLi4vaW50ZXJuYWxzL3dlbGwta25vd24tc3ltYm9sJyk7XG52YXIgREVTQ1JJUFRPUlMgPSByZXF1aXJlKCcuLi9pbnRlcm5hbHMvZGVzY3JpcHRvcnMnKTtcbnZhciBJU19QVVJFID0gcmVxdWlyZSgnLi4vaW50ZXJuYWxzL2lzLXB1cmUnKTtcblxudmFyIElURVJBVE9SID0gd2VsbEtub3duU3ltYm9sKCdpdGVyYXRvcicpO1xuXG5tb2R1bGUuZXhwb3J0cyA9ICFmYWlscyhmdW5jdGlvbiAoKSB7XG4gIC8vIGVzbGludC1kaXNhYmxlLW5leHQtbGluZSB1bmljb3JuL3JlbGF0aXZlLXVybC1zdHlsZSAtLSByZXF1aXJlZCBmb3IgdGVzdGluZ1xuICB2YXIgdXJsID0gbmV3IFVSTCgnYj9hPTEmYj0yJmM9MycsICdodHRwOi8vYScpO1xuICB2YXIgcGFyYW1zID0gdXJsLnNlYXJjaFBhcmFtcztcbiAgdmFyIHBhcmFtczIgPSBuZXcgVVJMU2VhcmNoUGFyYW1zKCdhPTEmYT0yJmI9MycpO1xuICB2YXIgcmVzdWx0ID0gJyc7XG4gIHVybC5wYXRobmFtZSA9ICdjJTIwZCc7XG4gIHBhcmFtcy5mb3JFYWNoKGZ1bmN0aW9uICh2YWx1ZSwga2V5KSB7XG4gICAgcGFyYW1zWydkZWxldGUnXSgnYicpO1xuICAgIHJlc3VsdCArPSBrZXkgKyB2YWx1ZTtcbiAgfSk7XG4gIHBhcmFtczJbJ2RlbGV0ZSddKCdhJywgMik7XG4gIC8vIGB1bmRlZmluZWRgIGNhc2UgaXMgYSBDaHJvbWl1bSAxMTcgYnVnXG4gIC8vIGh0dHBzOi8vYnVncy5jaHJvbWl1bS5vcmcvcC92OC9pc3N1ZXMvZGV0YWlsP2lkPTE0MjIyXG4gIHBhcmFtczJbJ2RlbGV0ZSddKCdiJywgdW5kZWZpbmVkKTtcbiAgcmV0dXJuIChJU19QVVJFICYmICghdXJsLnRvSlNPTiB8fCAhcGFyYW1zMi5oYXMoJ2EnLCAxKSB8fCBwYXJhbXMyLmhhcygnYScsIDIpIHx8ICFwYXJhbXMyLmhhcygnYScsIHVuZGVmaW5lZCkgfHwgcGFyYW1zMi5oYXMoJ2InKSkpXG4gICAgfHwgKCFwYXJhbXMuc2l6ZSAmJiAoSVNfUFVSRSB8fCAhREVTQ1JJUFRPUlMpKVxuICAgIHx8ICFwYXJhbXMuc29ydFxuICAgIHx8IHVybC5ocmVmICE9PSAnaHR0cDovL2EvYyUyMGQ/YT0xJmM9MydcbiAgICB8fCBwYXJhbXMuZ2V0KCdjJykgIT09ICczJ1xuICAgIHx8IFN0cmluZyhuZXcgVVJMU2VhcmNoUGFyYW1zKCc/YT0xJykpICE9PSAnYT0xJ1xuICAgIHx8ICFwYXJhbXNbSVRFUkFUT1JdXG4gICAgLy8gdGhyb3dzIGluIEVkZ2VcbiAgICB8fCBuZXcgVVJMKCdodHRwczovL2FAYicpLnVzZXJuYW1lICE9PSAnYSdcbiAgICB8fCBuZXcgVVJMU2VhcmNoUGFyYW1zKG5ldyBVUkxTZWFyY2hQYXJhbXMoJ2E9YicpKS5nZXQoJ2EnKSAhPT0gJ2InXG4gICAgLy8gbm90IHB1bnljb2RlZCBpbiBFZGdlXG4gICAgfHwgbmV3IFVSTCgnaHR0cDovL9GC0LXRgdGCJykuaG9zdCAhPT0gJ3huLS1lMWF5YmMnXG4gICAgLy8gbm90IGVzY2FwZWQgaW4gQ2hyb21lIDYyLVxuICAgIHx8IG5ldyBVUkwoJ2h0dHA6Ly9hI9CxJykuaGFzaCAhPT0gJyMlRDAlQjEnXG4gICAgLy8gZmFpbHMgaW4gQ2hyb21lIDY2LVxuICAgIHx8IHJlc3VsdCAhPT0gJ2ExYzMnXG4gICAgLy8gdGhyb3dzIGluIFNhZmFyaVxuICAgIHx8IG5ldyBVUkwoJ2h0dHA6Ly94JywgdW5kZWZpbmVkKS5ob3N0ICE9PSAneCc7XG59KTtcbiIsIid1c2Ugc3RyaWN0Jztcbi8qIGVzbGludC1kaXNhYmxlIGVzL25vLXN5bWJvbCAtLSByZXF1aXJlZCBmb3IgdGVzdGluZyAqL1xudmFyIE5BVElWRV9TWU1CT0wgPSByZXF1aXJlKCcuLi9pbnRlcm5hbHMvc3ltYm9sLWNvbnN0cnVjdG9yLWRldGVjdGlvbicpO1xuXG5tb2R1bGUuZXhwb3J0cyA9IE5BVElWRV9TWU1CT0xcbiAgJiYgIVN5bWJvbC5zaGFtXG4gICYmIHR5cGVvZiBTeW1ib2wuaXRlcmF0b3IgPT0gJ3N5bWJvbCc7XG4iLCIndXNlIHN0cmljdCc7XG52YXIgREVTQ1JJUFRPUlMgPSByZXF1aXJlKCcuLi9pbnRlcm5hbHMvZGVzY3JpcHRvcnMnKTtcbnZhciBmYWlscyA9IHJlcXVpcmUoJy4uL2ludGVybmFscy9mYWlscycpO1xuXG4vLyBWOCB+IENocm9tZSAzNi1cbi8vIGh0dHBzOi8vYnVncy5jaHJvbWl1bS5vcmcvcC92OC9pc3N1ZXMvZGV0YWlsP2lkPTMzMzRcbm1vZHVsZS5leHBvcnRzID0gREVTQ1JJUFRPUlMgJiYgZmFpbHMoZnVuY3Rpb24gKCkge1xuICAvLyBlc2xpbnQtZGlzYWJsZS1uZXh0LWxpbmUgZXMvbm8tb2JqZWN0LWRlZmluZXByb3BlcnR5IC0tIHJlcXVpcmVkIGZvciB0ZXN0aW5nXG4gIHJldHVybiBPYmplY3QuZGVmaW5lUHJvcGVydHkoZnVuY3Rpb24gKCkgeyAvKiBlbXB0eSAqLyB9LCAncHJvdG90eXBlJywge1xuICAgIHZhbHVlOiA0MixcbiAgICB3cml0YWJsZTogZmFsc2VcbiAgfSkucHJvdG90eXBlICE9PSA0Mjtcbn0pO1xuIiwiJ3VzZSBzdHJpY3QnO1xudmFyICRUeXBlRXJyb3IgPSBUeXBlRXJyb3I7XG5cbm1vZHVsZS5leHBvcnRzID0gZnVuY3Rpb24gKHBhc3NlZCwgcmVxdWlyZWQpIHtcbiAgaWYgKHBhc3NlZCA8IHJlcXVpcmVkKSB0aHJvdyBuZXcgJFR5cGVFcnJvcignTm90IGVub3VnaCBhcmd1bWVudHMnKTtcbiAgcmV0dXJuIHBhc3NlZDtcbn07XG4iLCIndXNlIHN0cmljdCc7XG52YXIgZ2xvYmFsID0gcmVxdWlyZSgnLi4vaW50ZXJuYWxzL2dsb2JhbCcpO1xudmFyIGlzQ2FsbGFibGUgPSByZXF1aXJlKCcuLi9pbnRlcm5hbHMvaXMtY2FsbGFibGUnKTtcblxudmFyIFdlYWtNYXAgPSBnbG9iYWwuV2Vha01hcDtcblxubW9kdWxlLmV4cG9ydHMgPSBpc0NhbGxhYmxlKFdlYWtNYXApICYmIC9uYXRpdmUgY29kZS8udGVzdChTdHJpbmcoV2Vha01hcCkpO1xuIiwiJ3VzZSBzdHJpY3QnO1xudmFyIGdsb2JhbCA9IHJlcXVpcmUoJy4uL2ludGVybmFscy9nbG9iYWwnKTtcbnZhciBzaGFyZWQgPSByZXF1aXJlKCcuLi9pbnRlcm5hbHMvc2hhcmVkJyk7XG52YXIgaGFzT3duID0gcmVxdWlyZSgnLi4vaW50ZXJuYWxzL2hhcy1vd24tcHJvcGVydHknKTtcbnZhciB1aWQgPSByZXF1aXJlKCcuLi9pbnRlcm5hbHMvdWlkJyk7XG52YXIgTkFUSVZFX1NZTUJPTCA9IHJlcXVpcmUoJy4uL2ludGVybmFscy9zeW1ib2wtY29uc3RydWN0b3ItZGV0ZWN0aW9uJyk7XG52YXIgVVNFX1NZTUJPTF9BU19VSUQgPSByZXF1aXJlKCcuLi9pbnRlcm5hbHMvdXNlLXN5bWJvbC1hcy11aWQnKTtcblxudmFyIFN5bWJvbCA9IGdsb2JhbC5TeW1ib2w7XG52YXIgV2VsbEtub3duU3ltYm9sc1N0b3JlID0gc2hhcmVkKCd3a3MnKTtcbnZhciBjcmVhdGVXZWxsS25vd25TeW1ib2wgPSBVU0VfU1lNQk9MX0FTX1VJRCA/IFN5bWJvbFsnZm9yJ10gfHwgU3ltYm9sIDogU3ltYm9sICYmIFN5bWJvbC53aXRob3V0U2V0dGVyIHx8IHVpZDtcblxubW9kdWxlLmV4cG9ydHMgPSBmdW5jdGlvbiAobmFtZSkge1xuICBpZiAoIWhhc093bihXZWxsS25vd25TeW1ib2xzU3RvcmUsIG5hbWUpKSB7XG4gICAgV2VsbEtub3duU3ltYm9sc1N0b3JlW25hbWVdID0gTkFUSVZFX1NZTUJPTCAmJiBoYXNPd24oU3ltYm9sLCBuYW1lKVxuICAgICAgPyBTeW1ib2xbbmFtZV1cbiAgICAgIDogY3JlYXRlV2VsbEtub3duU3ltYm9sKCdTeW1ib2wuJyArIG5hbWUpO1xuICB9IHJldHVybiBXZWxsS25vd25TeW1ib2xzU3RvcmVbbmFtZV07XG59O1xuIiwiJ3VzZSBzdHJpY3QnO1xudmFyICQgPSByZXF1aXJlKCcuLi9pbnRlcm5hbHMvZXhwb3J0Jyk7XG52YXIgJGluY2x1ZGVzID0gcmVxdWlyZSgnLi4vaW50ZXJuYWxzL2FycmF5LWluY2x1ZGVzJykuaW5jbHVkZXM7XG52YXIgZmFpbHMgPSByZXF1aXJlKCcuLi9pbnRlcm5hbHMvZmFpbHMnKTtcbnZhciBhZGRUb1Vuc2NvcGFibGVzID0gcmVxdWlyZSgnLi4vaW50ZXJuYWxzL2FkZC10by11bnNjb3BhYmxlcycpO1xuXG4vLyBGRjk5KyBidWdcbnZhciBCUk9LRU5fT05fU1BBUlNFID0gZmFpbHMoZnVuY3Rpb24gKCkge1xuICAvLyBlc2xpbnQtZGlzYWJsZS1uZXh0LWxpbmUgZXMvbm8tYXJyYXktcHJvdG90eXBlLWluY2x1ZGVzIC0tIGRldGVjdGlvblxuICByZXR1cm4gIUFycmF5KDEpLmluY2x1ZGVzKCk7XG59KTtcblxuLy8gYEFycmF5LnByb3RvdHlwZS5pbmNsdWRlc2AgbWV0aG9kXG4vLyBodHRwczovL3RjMzkuZXMvZWNtYTI2Mi8jc2VjLWFycmF5LnByb3RvdHlwZS5pbmNsdWRlc1xuJCh7IHRhcmdldDogJ0FycmF5JywgcHJvdG86IHRydWUsIGZvcmNlZDogQlJPS0VOX09OX1NQQVJTRSB9LCB7XG4gIGluY2x1ZGVzOiBmdW5jdGlvbiBpbmNsdWRlcyhlbCAvKiAsIGZyb21JbmRleCA9IDAgKi8pIHtcbiAgICByZXR1cm4gJGluY2x1ZGVzKHRoaXMsIGVsLCBhcmd1bWVudHMubGVuZ3RoID4gMSA/IGFyZ3VtZW50c1sxXSA6IHVuZGVmaW5lZCk7XG4gIH1cbn0pO1xuXG4vLyBodHRwczovL3RjMzkuZXMvZWNtYTI2Mi8jc2VjLWFycmF5LnByb3RvdHlwZS1AQHVuc2NvcGFibGVzXG5hZGRUb1Vuc2NvcGFibGVzKCdpbmNsdWRlcycpO1xuIiwiJ3VzZSBzdHJpY3QnO1xudmFyIHRvSW5kZXhlZE9iamVjdCA9IHJlcXVpcmUoJy4uL2ludGVybmFscy90by1pbmRleGVkLW9iamVjdCcpO1xudmFyIGFkZFRvVW5zY29wYWJsZXMgPSByZXF1aXJlKCcuLi9pbnRlcm5hbHMvYWRkLXRvLXVuc2NvcGFibGVzJyk7XG52YXIgSXRlcmF0b3JzID0gcmVxdWlyZSgnLi4vaW50ZXJuYWxzL2l0ZXJhdG9ycycpO1xudmFyIEludGVybmFsU3RhdGVNb2R1bGUgPSByZXF1aXJlKCcuLi9pbnRlcm5hbHMvaW50ZXJuYWwtc3RhdGUnKTtcbnZhciBkZWZpbmVQcm9wZXJ0eSA9IHJlcXVpcmUoJy4uL2ludGVybmFscy9vYmplY3QtZGVmaW5lLXByb3BlcnR5JykuZjtcbnZhciBkZWZpbmVJdGVyYXRvciA9IHJlcXVpcmUoJy4uL2ludGVybmFscy9pdGVyYXRvci1kZWZpbmUnKTtcbnZhciBjcmVhdGVJdGVyUmVzdWx0T2JqZWN0ID0gcmVxdWlyZSgnLi4vaW50ZXJuYWxzL2NyZWF0ZS1pdGVyLXJlc3VsdC1vYmplY3QnKTtcbnZhciBJU19QVVJFID0gcmVxdWlyZSgnLi4vaW50ZXJuYWxzL2lzLXB1cmUnKTtcbnZhciBERVNDUklQVE9SUyA9IHJlcXVpcmUoJy4uL2ludGVybmFscy9kZXNjcmlwdG9ycycpO1xuXG52YXIgQVJSQVlfSVRFUkFUT1IgPSAnQXJyYXkgSXRlcmF0b3InO1xudmFyIHNldEludGVybmFsU3RhdGUgPSBJbnRlcm5hbFN0YXRlTW9kdWxlLnNldDtcbnZhciBnZXRJbnRlcm5hbFN0YXRlID0gSW50ZXJuYWxTdGF0ZU1vZHVsZS5nZXR0ZXJGb3IoQVJSQVlfSVRFUkFUT1IpO1xuXG4vLyBgQXJyYXkucHJvdG90eXBlLmVudHJpZXNgIG1ldGhvZFxuLy8gaHR0cHM6Ly90YzM5LmVzL2VjbWEyNjIvI3NlYy1hcnJheS5wcm90b3R5cGUuZW50cmllc1xuLy8gYEFycmF5LnByb3RvdHlwZS5rZXlzYCBtZXRob2Rcbi8vIGh0dHBzOi8vdGMzOS5lcy9lY21hMjYyLyNzZWMtYXJyYXkucHJvdG90eXBlLmtleXNcbi8vIGBBcnJheS5wcm90b3R5cGUudmFsdWVzYCBtZXRob2Rcbi8vIGh0dHBzOi8vdGMzOS5lcy9lY21hMjYyLyNzZWMtYXJyYXkucHJvdG90eXBlLnZhbHVlc1xuLy8gYEFycmF5LnByb3RvdHlwZVtAQGl0ZXJhdG9yXWAgbWV0aG9kXG4vLyBodHRwczovL3RjMzkuZXMvZWNtYTI2Mi8jc2VjLWFycmF5LnByb3RvdHlwZS1AQGl0ZXJhdG9yXG4vLyBgQ3JlYXRlQXJyYXlJdGVyYXRvcmAgaW50ZXJuYWwgbWV0aG9kXG4vLyBodHRwczovL3RjMzkuZXMvZWNtYTI2Mi8jc2VjLWNyZWF0ZWFycmF5aXRlcmF0b3Jcbm1vZHVsZS5leHBvcnRzID0gZGVmaW5lSXRlcmF0b3IoQXJyYXksICdBcnJheScsIGZ1bmN0aW9uIChpdGVyYXRlZCwga2luZCkge1xuICBzZXRJbnRlcm5hbFN0YXRlKHRoaXMsIHtcbiAgICB0eXBlOiBBUlJBWV9JVEVSQVRPUixcbiAgICB0YXJnZXQ6IHRvSW5kZXhlZE9iamVjdChpdGVyYXRlZCksIC8vIHRhcmdldFxuICAgIGluZGV4OiAwLCAgICAgICAgICAgICAgICAgICAgICAgICAgLy8gbmV4dCBpbmRleFxuICAgIGtpbmQ6IGtpbmQgICAgICAgICAgICAgICAgICAgICAgICAgLy8ga2luZFxuICB9KTtcbi8vIGAlQXJyYXlJdGVyYXRvclByb3RvdHlwZSUubmV4dGAgbWV0aG9kXG4vLyBodHRwczovL3RjMzkuZXMvZWNtYTI2Mi8jc2VjLSVhcnJheWl0ZXJhdG9ycHJvdG90eXBlJS5uZXh0XG59LCBmdW5jdGlvbiAoKSB7XG4gIHZhciBzdGF0ZSA9IGdldEludGVybmFsU3RhdGUodGhpcyk7XG4gIHZhciB0YXJnZXQgPSBzdGF0ZS50YXJnZXQ7XG4gIHZhciBpbmRleCA9IHN0YXRlLmluZGV4Kys7XG4gIGlmICghdGFyZ2V0IHx8IGluZGV4ID49IHRhcmdldC5sZW5ndGgpIHtcbiAgICBzdGF0ZS50YXJnZXQgPSB1bmRlZmluZWQ7XG4gICAgcmV0dXJuIGNyZWF0ZUl0ZXJSZXN1bHRPYmplY3QodW5kZWZpbmVkLCB0cnVlKTtcbiAgfVxuICBzd2l0Y2ggKHN0YXRlLmtpbmQpIHtcbiAgICBjYXNlICdrZXlzJzogcmV0dXJuIGNyZWF0ZUl0ZXJSZXN1bHRPYmplY3QoaW5kZXgsIGZhbHNlKTtcbiAgICBjYXNlICd2YWx1ZXMnOiByZXR1cm4gY3JlYXRlSXRlclJlc3VsdE9iamVjdCh0YXJnZXRbaW5kZXhdLCBmYWxzZSk7XG4gIH0gcmV0dXJuIGNyZWF0ZUl0ZXJSZXN1bHRPYmplY3QoW2luZGV4LCB0YXJnZXRbaW5kZXhdXSwgZmFsc2UpO1xufSwgJ3ZhbHVlcycpO1xuXG4vLyBhcmd1bWVudHNMaXN0W0BAaXRlcmF0b3JdIGlzICVBcnJheVByb3RvX3ZhbHVlcyVcbi8vIGh0dHBzOi8vdGMzOS5lcy9lY21hMjYyLyNzZWMtY3JlYXRldW5tYXBwZWRhcmd1bWVudHNvYmplY3Rcbi8vIGh0dHBzOi8vdGMzOS5lcy9lY21hMjYyLyNzZWMtY3JlYXRlbWFwcGVkYXJndW1lbnRzb2JqZWN0XG52YXIgdmFsdWVzID0gSXRlcmF0b3JzLkFyZ3VtZW50cyA9IEl0ZXJhdG9ycy5BcnJheTtcblxuLy8gaHR0cHM6Ly90YzM5LmVzL2VjbWEyNjIvI3NlYy1hcnJheS5wcm90b3R5cGUtQEB1bnNjb3BhYmxlc1xuYWRkVG9VbnNjb3BhYmxlcygna2V5cycpO1xuYWRkVG9VbnNjb3BhYmxlcygndmFsdWVzJyk7XG5hZGRUb1Vuc2NvcGFibGVzKCdlbnRyaWVzJyk7XG5cbi8vIFY4IH4gQ2hyb21lIDQ1LSBidWdcbmlmICghSVNfUFVSRSAmJiBERVNDUklQVE9SUyAmJiB2YWx1ZXMubmFtZSAhPT0gJ3ZhbHVlcycpIHRyeSB7XG4gIGRlZmluZVByb3BlcnR5KHZhbHVlcywgJ25hbWUnLCB7IHZhbHVlOiAndmFsdWVzJyB9KTtcbn0gY2F0Y2ggKGVycm9yKSB7IC8qIGVtcHR5ICovIH1cbiIsIid1c2Ugc3RyaWN0JztcbnZhciBERVNDUklQVE9SUyA9IHJlcXVpcmUoJy4uL2ludGVybmFscy9kZXNjcmlwdG9ycycpO1xudmFyIGdsb2JhbCA9IHJlcXVpcmUoJy4uL2ludGVybmFscy9nbG9iYWwnKTtcbnZhciB1bmN1cnJ5VGhpcyA9IHJlcXVpcmUoJy4uL2ludGVybmFscy9mdW5jdGlvbi11bmN1cnJ5LXRoaXMnKTtcbnZhciBpc0ZvcmNlZCA9IHJlcXVpcmUoJy4uL2ludGVybmFscy9pcy1mb3JjZWQnKTtcbnZhciBpbmhlcml0SWZSZXF1aXJlZCA9IHJlcXVpcmUoJy4uL2ludGVybmFscy9pbmhlcml0LWlmLXJlcXVpcmVkJyk7XG52YXIgY3JlYXRlTm9uRW51bWVyYWJsZVByb3BlcnR5ID0gcmVxdWlyZSgnLi4vaW50ZXJuYWxzL2NyZWF0ZS1ub24tZW51bWVyYWJsZS1wcm9wZXJ0eScpO1xudmFyIGNyZWF0ZSA9IHJlcXVpcmUoJy4uL2ludGVybmFscy9vYmplY3QtY3JlYXRlJyk7XG52YXIgZ2V0T3duUHJvcGVydHlOYW1lcyA9IHJlcXVpcmUoJy4uL2ludGVybmFscy9vYmplY3QtZ2V0LW93bi1wcm9wZXJ0eS1uYW1lcycpLmY7XG52YXIgaXNQcm90b3R5cGVPZiA9IHJlcXVpcmUoJy4uL2ludGVybmFscy9vYmplY3QtaXMtcHJvdG90eXBlLW9mJyk7XG52YXIgaXNSZWdFeHAgPSByZXF1aXJlKCcuLi9pbnRlcm5hbHMvaXMtcmVnZXhwJyk7XG52YXIgdG9TdHJpbmcgPSByZXF1aXJlKCcuLi9pbnRlcm5hbHMvdG8tc3RyaW5nJyk7XG52YXIgZ2V0UmVnRXhwRmxhZ3MgPSByZXF1aXJlKCcuLi9pbnRlcm5hbHMvcmVnZXhwLWdldC1mbGFncycpO1xudmFyIHN0aWNreUhlbHBlcnMgPSByZXF1aXJlKCcuLi9pbnRlcm5hbHMvcmVnZXhwLXN0aWNreS1oZWxwZXJzJyk7XG52YXIgcHJveHlBY2Nlc3NvciA9IHJlcXVpcmUoJy4uL2ludGVybmFscy9wcm94eS1hY2Nlc3NvcicpO1xudmFyIGRlZmluZUJ1aWx0SW4gPSByZXF1aXJlKCcuLi9pbnRlcm5hbHMvZGVmaW5lLWJ1aWx0LWluJyk7XG52YXIgZmFpbHMgPSByZXF1aXJlKCcuLi9pbnRlcm5hbHMvZmFpbHMnKTtcbnZhciBoYXNPd24gPSByZXF1aXJlKCcuLi9pbnRlcm5hbHMvaGFzLW93bi1wcm9wZXJ0eScpO1xudmFyIGVuZm9yY2VJbnRlcm5hbFN0YXRlID0gcmVxdWlyZSgnLi4vaW50ZXJuYWxzL2ludGVybmFsLXN0YXRlJykuZW5mb3JjZTtcbnZhciBzZXRTcGVjaWVzID0gcmVxdWlyZSgnLi4vaW50ZXJuYWxzL3NldC1zcGVjaWVzJyk7XG52YXIgd2VsbEtub3duU3ltYm9sID0gcmVxdWlyZSgnLi4vaW50ZXJuYWxzL3dlbGwta25vd24tc3ltYm9sJyk7XG52YXIgVU5TVVBQT1JURURfRE9UX0FMTCA9IHJlcXVpcmUoJy4uL2ludGVybmFscy9yZWdleHAtdW5zdXBwb3J0ZWQtZG90LWFsbCcpO1xudmFyIFVOU1VQUE9SVEVEX05DRyA9IHJlcXVpcmUoJy4uL2ludGVybmFscy9yZWdleHAtdW5zdXBwb3J0ZWQtbmNnJyk7XG5cbnZhciBNQVRDSCA9IHdlbGxLbm93blN5bWJvbCgnbWF0Y2gnKTtcbnZhciBOYXRpdmVSZWdFeHAgPSBnbG9iYWwuUmVnRXhwO1xudmFyIFJlZ0V4cFByb3RvdHlwZSA9IE5hdGl2ZVJlZ0V4cC5wcm90b3R5cGU7XG52YXIgU3ludGF4RXJyb3IgPSBnbG9iYWwuU3ludGF4RXJyb3I7XG52YXIgZXhlYyA9IHVuY3VycnlUaGlzKFJlZ0V4cFByb3RvdHlwZS5leGVjKTtcbnZhciBjaGFyQXQgPSB1bmN1cnJ5VGhpcygnJy5jaGFyQXQpO1xudmFyIHJlcGxhY2UgPSB1bmN1cnJ5VGhpcygnJy5yZXBsYWNlKTtcbnZhciBzdHJpbmdJbmRleE9mID0gdW5jdXJyeVRoaXMoJycuaW5kZXhPZik7XG52YXIgc3RyaW5nU2xpY2UgPSB1bmN1cnJ5VGhpcygnJy5zbGljZSk7XG4vLyBUT0RPOiBVc2Ugb25seSBwcm9wZXIgUmVnRXhwSWRlbnRpZmllck5hbWVcbnZhciBJU19OQ0cgPSAvXlxcPzxbXlxcc1xcZCEjJSYqKzw9PkBeXVteXFxzISMlJiorPD0+QF5dKj4vO1xudmFyIHJlMSA9IC9hL2c7XG52YXIgcmUyID0gL2EvZztcblxuLy8gXCJuZXdcIiBzaG91bGQgY3JlYXRlIGEgbmV3IG9iamVjdCwgb2xkIHdlYmtpdCBidWdcbnZhciBDT1JSRUNUX05FVyA9IG5ldyBOYXRpdmVSZWdFeHAocmUxKSAhPT0gcmUxO1xuXG52YXIgTUlTU0VEX1NUSUNLWSA9IHN0aWNreUhlbHBlcnMuTUlTU0VEX1NUSUNLWTtcbnZhciBVTlNVUFBPUlRFRF9ZID0gc3RpY2t5SGVscGVycy5VTlNVUFBPUlRFRF9ZO1xuXG52YXIgQkFTRV9GT1JDRUQgPSBERVNDUklQVE9SUyAmJlxuICAoIUNPUlJFQ1RfTkVXIHx8IE1JU1NFRF9TVElDS1kgfHwgVU5TVVBQT1JURURfRE9UX0FMTCB8fCBVTlNVUFBPUlRFRF9OQ0cgfHwgZmFpbHMoZnVuY3Rpb24gKCkge1xuICAgIHJlMltNQVRDSF0gPSBmYWxzZTtcbiAgICAvLyBSZWdFeHAgY29uc3RydWN0b3IgY2FuIGFsdGVyIGZsYWdzIGFuZCBJc1JlZ0V4cCB3b3JrcyBjb3JyZWN0IHdpdGggQEBtYXRjaFxuICAgIHJldHVybiBOYXRpdmVSZWdFeHAocmUxKSAhPT0gcmUxIHx8IE5hdGl2ZVJlZ0V4cChyZTIpID09PSByZTIgfHwgU3RyaW5nKE5hdGl2ZVJlZ0V4cChyZTEsICdpJykpICE9PSAnL2EvaSc7XG4gIH0pKTtcblxudmFyIGhhbmRsZURvdEFsbCA9IGZ1bmN0aW9uIChzdHJpbmcpIHtcbiAgdmFyIGxlbmd0aCA9IHN0cmluZy5sZW5ndGg7XG4gIHZhciBpbmRleCA9IDA7XG4gIHZhciByZXN1bHQgPSAnJztcbiAgdmFyIGJyYWNrZXRzID0gZmFsc2U7XG4gIHZhciBjaHI7XG4gIGZvciAoOyBpbmRleCA8PSBsZW5ndGg7IGluZGV4KyspIHtcbiAgICBjaHIgPSBjaGFyQXQoc3RyaW5nLCBpbmRleCk7XG4gICAgaWYgKGNociA9PT0gJ1xcXFwnKSB7XG4gICAgICByZXN1bHQgKz0gY2hyICsgY2hhckF0KHN0cmluZywgKytpbmRleCk7XG4gICAgICBjb250aW51ZTtcbiAgICB9XG4gICAgaWYgKCFicmFja2V0cyAmJiBjaHIgPT09ICcuJykge1xuICAgICAgcmVzdWx0ICs9ICdbXFxcXHNcXFxcU10nO1xuICAgIH0gZWxzZSB7XG4gICAgICBpZiAoY2hyID09PSAnWycpIHtcbiAgICAgICAgYnJhY2tldHMgPSB0cnVlO1xuICAgICAgfSBlbHNlIGlmIChjaHIgPT09ICddJykge1xuICAgICAgICBicmFja2V0cyA9IGZhbHNlO1xuICAgICAgfSByZXN1bHQgKz0gY2hyO1xuICAgIH1cbiAgfSByZXR1cm4gcmVzdWx0O1xufTtcblxudmFyIGhhbmRsZU5DRyA9IGZ1bmN0aW9uIChzdHJpbmcpIHtcbiAgdmFyIGxlbmd0aCA9IHN0cmluZy5sZW5ndGg7XG4gIHZhciBpbmRleCA9IDA7XG4gIHZhciByZXN1bHQgPSAnJztcbiAgdmFyIG5hbWVkID0gW107XG4gIHZhciBuYW1lcyA9IGNyZWF0ZShudWxsKTtcbiAgdmFyIGJyYWNrZXRzID0gZmFsc2U7XG4gIHZhciBuY2cgPSBmYWxzZTtcbiAgdmFyIGdyb3VwaWQgPSAwO1xuICB2YXIgZ3JvdXBuYW1lID0gJyc7XG4gIHZhciBjaHI7XG4gIGZvciAoOyBpbmRleCA8PSBsZW5ndGg7IGluZGV4KyspIHtcbiAgICBjaHIgPSBjaGFyQXQoc3RyaW5nLCBpbmRleCk7XG4gICAgaWYgKGNociA9PT0gJ1xcXFwnKSB7XG4gICAgICBjaHIgKz0gY2hhckF0KHN0cmluZywgKytpbmRleCk7XG4gICAgfSBlbHNlIGlmIChjaHIgPT09ICddJykge1xuICAgICAgYnJhY2tldHMgPSBmYWxzZTtcbiAgICB9IGVsc2UgaWYgKCFicmFja2V0cykgc3dpdGNoICh0cnVlKSB7XG4gICAgICBjYXNlIGNociA9PT0gJ1snOlxuICAgICAgICBicmFja2V0cyA9IHRydWU7XG4gICAgICAgIGJyZWFrO1xuICAgICAgY2FzZSBjaHIgPT09ICcoJzpcbiAgICAgICAgaWYgKGV4ZWMoSVNfTkNHLCBzdHJpbmdTbGljZShzdHJpbmcsIGluZGV4ICsgMSkpKSB7XG4gICAgICAgICAgaW5kZXggKz0gMjtcbiAgICAgICAgICBuY2cgPSB0cnVlO1xuICAgICAgICB9XG4gICAgICAgIHJlc3VsdCArPSBjaHI7XG4gICAgICAgIGdyb3VwaWQrKztcbiAgICAgICAgY29udGludWU7XG4gICAgICBjYXNlIGNociA9PT0gJz4nICYmIG5jZzpcbiAgICAgICAgaWYgKGdyb3VwbmFtZSA9PT0gJycgfHwgaGFzT3duKG5hbWVzLCBncm91cG5hbWUpKSB7XG4gICAgICAgICAgdGhyb3cgbmV3IFN5bnRheEVycm9yKCdJbnZhbGlkIGNhcHR1cmUgZ3JvdXAgbmFtZScpO1xuICAgICAgICB9XG4gICAgICAgIG5hbWVzW2dyb3VwbmFtZV0gPSB0cnVlO1xuICAgICAgICBuYW1lZFtuYW1lZC5sZW5ndGhdID0gW2dyb3VwbmFtZSwgZ3JvdXBpZF07XG4gICAgICAgIG5jZyA9IGZhbHNlO1xuICAgICAgICBncm91cG5hbWUgPSAnJztcbiAgICAgICAgY29udGludWU7XG4gICAgfVxuICAgIGlmIChuY2cpIGdyb3VwbmFtZSArPSBjaHI7XG4gICAgZWxzZSByZXN1bHQgKz0gY2hyO1xuICB9IHJldHVybiBbcmVzdWx0LCBuYW1lZF07XG59O1xuXG4vLyBgUmVnRXhwYCBjb25zdHJ1Y3RvclxuLy8gaHR0cHM6Ly90YzM5LmVzL2VjbWEyNjIvI3NlYy1yZWdleHAtY29uc3RydWN0b3JcbmlmIChpc0ZvcmNlZCgnUmVnRXhwJywgQkFTRV9GT1JDRUQpKSB7XG4gIHZhciBSZWdFeHBXcmFwcGVyID0gZnVuY3Rpb24gUmVnRXhwKHBhdHRlcm4sIGZsYWdzKSB7XG4gICAgdmFyIHRoaXNJc1JlZ0V4cCA9IGlzUHJvdG90eXBlT2YoUmVnRXhwUHJvdG90eXBlLCB0aGlzKTtcbiAgICB2YXIgcGF0dGVybklzUmVnRXhwID0gaXNSZWdFeHAocGF0dGVybik7XG4gICAgdmFyIGZsYWdzQXJlVW5kZWZpbmVkID0gZmxhZ3MgPT09IHVuZGVmaW5lZDtcbiAgICB2YXIgZ3JvdXBzID0gW107XG4gICAgdmFyIHJhd1BhdHRlcm4gPSBwYXR0ZXJuO1xuICAgIHZhciByYXdGbGFncywgZG90QWxsLCBzdGlja3ksIGhhbmRsZWQsIHJlc3VsdCwgc3RhdGU7XG5cbiAgICBpZiAoIXRoaXNJc1JlZ0V4cCAmJiBwYXR0ZXJuSXNSZWdFeHAgJiYgZmxhZ3NBcmVVbmRlZmluZWQgJiYgcGF0dGVybi5jb25zdHJ1Y3RvciA9PT0gUmVnRXhwV3JhcHBlcikge1xuICAgICAgcmV0dXJuIHBhdHRlcm47XG4gICAgfVxuXG4gICAgaWYgKHBhdHRlcm5Jc1JlZ0V4cCB8fCBpc1Byb3RvdHlwZU9mKFJlZ0V4cFByb3RvdHlwZSwgcGF0dGVybikpIHtcbiAgICAgIHBhdHRlcm4gPSBwYXR0ZXJuLnNvdXJjZTtcbiAgICAgIGlmIChmbGFnc0FyZVVuZGVmaW5lZCkgZmxhZ3MgPSBnZXRSZWdFeHBGbGFncyhyYXdQYXR0ZXJuKTtcbiAgICB9XG5cbiAgICBwYXR0ZXJuID0gcGF0dGVybiA9PT0gdW5kZWZpbmVkID8gJycgOiB0b1N0cmluZyhwYXR0ZXJuKTtcbiAgICBmbGFncyA9IGZsYWdzID09PSB1bmRlZmluZWQgPyAnJyA6IHRvU3RyaW5nKGZsYWdzKTtcbiAgICByYXdQYXR0ZXJuID0gcGF0dGVybjtcblxuICAgIGlmIChVTlNVUFBPUlRFRF9ET1RfQUxMICYmICdkb3RBbGwnIGluIHJlMSkge1xuICAgICAgZG90QWxsID0gISFmbGFncyAmJiBzdHJpbmdJbmRleE9mKGZsYWdzLCAncycpID4gLTE7XG4gICAgICBpZiAoZG90QWxsKSBmbGFncyA9IHJlcGxhY2UoZmxhZ3MsIC9zL2csICcnKTtcbiAgICB9XG5cbiAgICByYXdGbGFncyA9IGZsYWdzO1xuXG4gICAgaWYgKE1JU1NFRF9TVElDS1kgJiYgJ3N0aWNreScgaW4gcmUxKSB7XG4gICAgICBzdGlja3kgPSAhIWZsYWdzICYmIHN0cmluZ0luZGV4T2YoZmxhZ3MsICd5JykgPiAtMTtcbiAgICAgIGlmIChzdGlja3kgJiYgVU5TVVBQT1JURURfWSkgZmxhZ3MgPSByZXBsYWNlKGZsYWdzLCAveS9nLCAnJyk7XG4gICAgfVxuXG4gICAgaWYgKFVOU1VQUE9SVEVEX05DRykge1xuICAgICAgaGFuZGxlZCA9IGhhbmRsZU5DRyhwYXR0ZXJuKTtcbiAgICAgIHBhdHRlcm4gPSBoYW5kbGVkWzBdO1xuICAgICAgZ3JvdXBzID0gaGFuZGxlZFsxXTtcbiAgICB9XG5cbiAgICByZXN1bHQgPSBpbmhlcml0SWZSZXF1aXJlZChOYXRpdmVSZWdFeHAocGF0dGVybiwgZmxhZ3MpLCB0aGlzSXNSZWdFeHAgPyB0aGlzIDogUmVnRXhwUHJvdG90eXBlLCBSZWdFeHBXcmFwcGVyKTtcblxuICAgIGlmIChkb3RBbGwgfHwgc3RpY2t5IHx8IGdyb3Vwcy5sZW5ndGgpIHtcbiAgICAgIHN0YXRlID0gZW5mb3JjZUludGVybmFsU3RhdGUocmVzdWx0KTtcbiAgICAgIGlmIChkb3RBbGwpIHtcbiAgICAgICAgc3RhdGUuZG90QWxsID0gdHJ1ZTtcbiAgICAgICAgc3RhdGUucmF3ID0gUmVnRXhwV3JhcHBlcihoYW5kbGVEb3RBbGwocGF0dGVybiksIHJhd0ZsYWdzKTtcbiAgICAgIH1cbiAgICAgIGlmIChzdGlja3kpIHN0YXRlLnN0aWNreSA9IHRydWU7XG4gICAgICBpZiAoZ3JvdXBzLmxlbmd0aCkgc3RhdGUuZ3JvdXBzID0gZ3JvdXBzO1xuICAgIH1cblxuICAgIGlmIChwYXR0ZXJuICE9PSByYXdQYXR0ZXJuKSB0cnkge1xuICAgICAgLy8gZmFpbHMgaW4gb2xkIGVuZ2luZXMsIGJ1dCB3ZSBoYXZlIG5vIGFsdGVybmF0aXZlcyBmb3IgdW5zdXBwb3J0ZWQgcmVnZXggc3ludGF4XG4gICAgICBjcmVhdGVOb25FbnVtZXJhYmxlUHJvcGVydHkocmVzdWx0LCAnc291cmNlJywgcmF3UGF0dGVybiA9PT0gJycgPyAnKD86KScgOiByYXdQYXR0ZXJuKTtcbiAgICB9IGNhdGNoIChlcnJvcikgeyAvKiBlbXB0eSAqLyB9XG5cbiAgICByZXR1cm4gcmVzdWx0O1xuICB9O1xuXG4gIGZvciAodmFyIGtleXMgPSBnZXRPd25Qcm9wZXJ0eU5hbWVzKE5hdGl2ZVJlZ0V4cCksIGluZGV4ID0gMDsga2V5cy5sZW5ndGggPiBpbmRleDspIHtcbiAgICBwcm94eUFjY2Vzc29yKFJlZ0V4cFdyYXBwZXIsIE5hdGl2ZVJlZ0V4cCwga2V5c1tpbmRleCsrXSk7XG4gIH1cblxuICBSZWdFeHBQcm90b3R5cGUuY29uc3RydWN0b3IgPSBSZWdFeHBXcmFwcGVyO1xuICBSZWdFeHBXcmFwcGVyLnByb3RvdHlwZSA9IFJlZ0V4cFByb3RvdHlwZTtcbiAgZGVmaW5lQnVpbHRJbihnbG9iYWwsICdSZWdFeHAnLCBSZWdFeHBXcmFwcGVyLCB7IGNvbnN0cnVjdG9yOiB0cnVlIH0pO1xufVxuXG4vLyBodHRwczovL3RjMzkuZXMvZWNtYTI2Mi8jc2VjLWdldC1yZWdleHAtQEBzcGVjaWVzXG5zZXRTcGVjaWVzKCdSZWdFeHAnKTtcbiIsIid1c2Ugc3RyaWN0JztcbnZhciAkID0gcmVxdWlyZSgnLi4vaW50ZXJuYWxzL2V4cG9ydCcpO1xudmFyIGV4ZWMgPSByZXF1aXJlKCcuLi9pbnRlcm5hbHMvcmVnZXhwLWV4ZWMnKTtcblxuLy8gYFJlZ0V4cC5wcm90b3R5cGUuZXhlY2AgbWV0aG9kXG4vLyBodHRwczovL3RjMzkuZXMvZWNtYTI2Mi8jc2VjLXJlZ2V4cC5wcm90b3R5cGUuZXhlY1xuJCh7IHRhcmdldDogJ1JlZ0V4cCcsIHByb3RvOiB0cnVlLCBmb3JjZWQ6IC8uLy5leGVjICE9PSBleGVjIH0sIHtcbiAgZXhlYzogZXhlY1xufSk7XG4iLCIndXNlIHN0cmljdCc7XG52YXIgY2hhckF0ID0gcmVxdWlyZSgnLi4vaW50ZXJuYWxzL3N0cmluZy1tdWx0aWJ5dGUnKS5jaGFyQXQ7XG52YXIgdG9TdHJpbmcgPSByZXF1aXJlKCcuLi9pbnRlcm5hbHMvdG8tc3RyaW5nJyk7XG52YXIgSW50ZXJuYWxTdGF0ZU1vZHVsZSA9IHJlcXVpcmUoJy4uL2ludGVybmFscy9pbnRlcm5hbC1zdGF0ZScpO1xudmFyIGRlZmluZUl0ZXJhdG9yID0gcmVxdWlyZSgnLi4vaW50ZXJuYWxzL2l0ZXJhdG9yLWRlZmluZScpO1xudmFyIGNyZWF0ZUl0ZXJSZXN1bHRPYmplY3QgPSByZXF1aXJlKCcuLi9pbnRlcm5hbHMvY3JlYXRlLWl0ZXItcmVzdWx0LW9iamVjdCcpO1xuXG52YXIgU1RSSU5HX0lURVJBVE9SID0gJ1N0cmluZyBJdGVyYXRvcic7XG52YXIgc2V0SW50ZXJuYWxTdGF0ZSA9IEludGVybmFsU3RhdGVNb2R1bGUuc2V0O1xudmFyIGdldEludGVybmFsU3RhdGUgPSBJbnRlcm5hbFN0YXRlTW9kdWxlLmdldHRlckZvcihTVFJJTkdfSVRFUkFUT1IpO1xuXG4vLyBgU3RyaW5nLnByb3RvdHlwZVtAQGl0ZXJhdG9yXWAgbWV0aG9kXG4vLyBodHRwczovL3RjMzkuZXMvZWNtYTI2Mi8jc2VjLXN0cmluZy5wcm90b3R5cGUtQEBpdGVyYXRvclxuZGVmaW5lSXRlcmF0b3IoU3RyaW5nLCAnU3RyaW5nJywgZnVuY3Rpb24gKGl0ZXJhdGVkKSB7XG4gIHNldEludGVybmFsU3RhdGUodGhpcywge1xuICAgIHR5cGU6IFNUUklOR19JVEVSQVRPUixcbiAgICBzdHJpbmc6IHRvU3RyaW5nKGl0ZXJhdGVkKSxcbiAgICBpbmRleDogMFxuICB9KTtcbi8vIGAlU3RyaW5nSXRlcmF0b3JQcm90b3R5cGUlLm5leHRgIG1ldGhvZFxuLy8gaHR0cHM6Ly90YzM5LmVzL2VjbWEyNjIvI3NlYy0lc3RyaW5naXRlcmF0b3Jwcm90b3R5cGUlLm5leHRcbn0sIGZ1bmN0aW9uIG5leHQoKSB7XG4gIHZhciBzdGF0ZSA9IGdldEludGVybmFsU3RhdGUodGhpcyk7XG4gIHZhciBzdHJpbmcgPSBzdGF0ZS5zdHJpbmc7XG4gIHZhciBpbmRleCA9IHN0YXRlLmluZGV4O1xuICB2YXIgcG9pbnQ7XG4gIGlmIChpbmRleCA+PSBzdHJpbmcubGVuZ3RoKSByZXR1cm4gY3JlYXRlSXRlclJlc3VsdE9iamVjdCh1bmRlZmluZWQsIHRydWUpO1xuICBwb2ludCA9IGNoYXJBdChzdHJpbmcsIGluZGV4KTtcbiAgc3RhdGUuaW5kZXggKz0gcG9pbnQubGVuZ3RoO1xuICByZXR1cm4gY3JlYXRlSXRlclJlc3VsdE9iamVjdChwb2ludCwgZmFsc2UpO1xufSk7XG4iLCIndXNlIHN0cmljdCc7XG4vKiBlc2xpbnQtZGlzYWJsZSBlcy9uby1zdHJpbmctcHJvdG90eXBlLW1hdGNoYWxsIC0tIHNhZmUgKi9cbnZhciAkID0gcmVxdWlyZSgnLi4vaW50ZXJuYWxzL2V4cG9ydCcpO1xudmFyIGNhbGwgPSByZXF1aXJlKCcuLi9pbnRlcm5hbHMvZnVuY3Rpb24tY2FsbCcpO1xudmFyIHVuY3VycnlUaGlzID0gcmVxdWlyZSgnLi4vaW50ZXJuYWxzL2Z1bmN0aW9uLXVuY3VycnktdGhpcy1jbGF1c2UnKTtcbnZhciBjcmVhdGVJdGVyYXRvckNvbnN0cnVjdG9yID0gcmVxdWlyZSgnLi4vaW50ZXJuYWxzL2l0ZXJhdG9yLWNyZWF0ZS1jb25zdHJ1Y3RvcicpO1xudmFyIGNyZWF0ZUl0ZXJSZXN1bHRPYmplY3QgPSByZXF1aXJlKCcuLi9pbnRlcm5hbHMvY3JlYXRlLWl0ZXItcmVzdWx0LW9iamVjdCcpO1xudmFyIHJlcXVpcmVPYmplY3RDb2VyY2libGUgPSByZXF1aXJlKCcuLi9pbnRlcm5hbHMvcmVxdWlyZS1vYmplY3QtY29lcmNpYmxlJyk7XG52YXIgdG9MZW5ndGggPSByZXF1aXJlKCcuLi9pbnRlcm5hbHMvdG8tbGVuZ3RoJyk7XG52YXIgdG9TdHJpbmcgPSByZXF1aXJlKCcuLi9pbnRlcm5hbHMvdG8tc3RyaW5nJyk7XG52YXIgYW5PYmplY3QgPSByZXF1aXJlKCcuLi9pbnRlcm5hbHMvYW4tb2JqZWN0Jyk7XG52YXIgaXNOdWxsT3JVbmRlZmluZWQgPSByZXF1aXJlKCcuLi9pbnRlcm5hbHMvaXMtbnVsbC1vci11bmRlZmluZWQnKTtcbnZhciBjbGFzc29mID0gcmVxdWlyZSgnLi4vaW50ZXJuYWxzL2NsYXNzb2YtcmF3Jyk7XG52YXIgaXNSZWdFeHAgPSByZXF1aXJlKCcuLi9pbnRlcm5hbHMvaXMtcmVnZXhwJyk7XG52YXIgZ2V0UmVnRXhwRmxhZ3MgPSByZXF1aXJlKCcuLi9pbnRlcm5hbHMvcmVnZXhwLWdldC1mbGFncycpO1xudmFyIGdldE1ldGhvZCA9IHJlcXVpcmUoJy4uL2ludGVybmFscy9nZXQtbWV0aG9kJyk7XG52YXIgZGVmaW5lQnVpbHRJbiA9IHJlcXVpcmUoJy4uL2ludGVybmFscy9kZWZpbmUtYnVpbHQtaW4nKTtcbnZhciBmYWlscyA9IHJlcXVpcmUoJy4uL2ludGVybmFscy9mYWlscycpO1xudmFyIHdlbGxLbm93blN5bWJvbCA9IHJlcXVpcmUoJy4uL2ludGVybmFscy93ZWxsLWtub3duLXN5bWJvbCcpO1xudmFyIHNwZWNpZXNDb25zdHJ1Y3RvciA9IHJlcXVpcmUoJy4uL2ludGVybmFscy9zcGVjaWVzLWNvbnN0cnVjdG9yJyk7XG52YXIgYWR2YW5jZVN0cmluZ0luZGV4ID0gcmVxdWlyZSgnLi4vaW50ZXJuYWxzL2FkdmFuY2Utc3RyaW5nLWluZGV4Jyk7XG52YXIgcmVnRXhwRXhlYyA9IHJlcXVpcmUoJy4uL2ludGVybmFscy9yZWdleHAtZXhlYy1hYnN0cmFjdCcpO1xudmFyIEludGVybmFsU3RhdGVNb2R1bGUgPSByZXF1aXJlKCcuLi9pbnRlcm5hbHMvaW50ZXJuYWwtc3RhdGUnKTtcbnZhciBJU19QVVJFID0gcmVxdWlyZSgnLi4vaW50ZXJuYWxzL2lzLXB1cmUnKTtcblxudmFyIE1BVENIX0FMTCA9IHdlbGxLbm93blN5bWJvbCgnbWF0Y2hBbGwnKTtcbnZhciBSRUdFWFBfU1RSSU5HID0gJ1JlZ0V4cCBTdHJpbmcnO1xudmFyIFJFR0VYUF9TVFJJTkdfSVRFUkFUT1IgPSBSRUdFWFBfU1RSSU5HICsgJyBJdGVyYXRvcic7XG52YXIgc2V0SW50ZXJuYWxTdGF0ZSA9IEludGVybmFsU3RhdGVNb2R1bGUuc2V0O1xudmFyIGdldEludGVybmFsU3RhdGUgPSBJbnRlcm5hbFN0YXRlTW9kdWxlLmdldHRlckZvcihSRUdFWFBfU1RSSU5HX0lURVJBVE9SKTtcbnZhciBSZWdFeHBQcm90b3R5cGUgPSBSZWdFeHAucHJvdG90eXBlO1xudmFyICRUeXBlRXJyb3IgPSBUeXBlRXJyb3I7XG52YXIgc3RyaW5nSW5kZXhPZiA9IHVuY3VycnlUaGlzKCcnLmluZGV4T2YpO1xudmFyIG5hdGl2ZU1hdGNoQWxsID0gdW5jdXJyeVRoaXMoJycubWF0Y2hBbGwpO1xuXG52YXIgV09SS1NfV0lUSF9OT05fR0xPQkFMX1JFR0VYID0gISFuYXRpdmVNYXRjaEFsbCAmJiAhZmFpbHMoZnVuY3Rpb24gKCkge1xuICBuYXRpdmVNYXRjaEFsbCgnYScsIC8uLyk7XG59KTtcblxudmFyICRSZWdFeHBTdHJpbmdJdGVyYXRvciA9IGNyZWF0ZUl0ZXJhdG9yQ29uc3RydWN0b3IoZnVuY3Rpb24gUmVnRXhwU3RyaW5nSXRlcmF0b3IocmVnZXhwLCBzdHJpbmcsICRnbG9iYWwsIGZ1bGxVbmljb2RlKSB7XG4gIHNldEludGVybmFsU3RhdGUodGhpcywge1xuICAgIHR5cGU6IFJFR0VYUF9TVFJJTkdfSVRFUkFUT1IsXG4gICAgcmVnZXhwOiByZWdleHAsXG4gICAgc3RyaW5nOiBzdHJpbmcsXG4gICAgZ2xvYmFsOiAkZ2xvYmFsLFxuICAgIHVuaWNvZGU6IGZ1bGxVbmljb2RlLFxuICAgIGRvbmU6IGZhbHNlXG4gIH0pO1xufSwgUkVHRVhQX1NUUklORywgZnVuY3Rpb24gbmV4dCgpIHtcbiAgdmFyIHN0YXRlID0gZ2V0SW50ZXJuYWxTdGF0ZSh0aGlzKTtcbiAgaWYgKHN0YXRlLmRvbmUpIHJldHVybiBjcmVhdGVJdGVyUmVzdWx0T2JqZWN0KHVuZGVmaW5lZCwgdHJ1ZSk7XG4gIHZhciBSID0gc3RhdGUucmVnZXhwO1xuICB2YXIgUyA9IHN0YXRlLnN0cmluZztcbiAgdmFyIG1hdGNoID0gcmVnRXhwRXhlYyhSLCBTKTtcbiAgaWYgKG1hdGNoID09PSBudWxsKSB7XG4gICAgc3RhdGUuZG9uZSA9IHRydWU7XG4gICAgcmV0dXJuIGNyZWF0ZUl0ZXJSZXN1bHRPYmplY3QodW5kZWZpbmVkLCB0cnVlKTtcbiAgfVxuICBpZiAoc3RhdGUuZ2xvYmFsKSB7XG4gICAgaWYgKHRvU3RyaW5nKG1hdGNoWzBdKSA9PT0gJycpIFIubGFzdEluZGV4ID0gYWR2YW5jZVN0cmluZ0luZGV4KFMsIHRvTGVuZ3RoKFIubGFzdEluZGV4KSwgc3RhdGUudW5pY29kZSk7XG4gICAgcmV0dXJuIGNyZWF0ZUl0ZXJSZXN1bHRPYmplY3QobWF0Y2gsIGZhbHNlKTtcbiAgfVxuICBzdGF0ZS5kb25lID0gdHJ1ZTtcbiAgcmV0dXJuIGNyZWF0ZUl0ZXJSZXN1bHRPYmplY3QobWF0Y2gsIGZhbHNlKTtcbn0pO1xuXG52YXIgJG1hdGNoQWxsID0gZnVuY3Rpb24gKHN0cmluZykge1xuICB2YXIgUiA9IGFuT2JqZWN0KHRoaXMpO1xuICB2YXIgUyA9IHRvU3RyaW5nKHN0cmluZyk7XG4gIHZhciBDID0gc3BlY2llc0NvbnN0cnVjdG9yKFIsIFJlZ0V4cCk7XG4gIHZhciBmbGFncyA9IHRvU3RyaW5nKGdldFJlZ0V4cEZsYWdzKFIpKTtcbiAgdmFyIG1hdGNoZXIsICRnbG9iYWwsIGZ1bGxVbmljb2RlO1xuICBtYXRjaGVyID0gbmV3IEMoQyA9PT0gUmVnRXhwID8gUi5zb3VyY2UgOiBSLCBmbGFncyk7XG4gICRnbG9iYWwgPSAhIX5zdHJpbmdJbmRleE9mKGZsYWdzLCAnZycpO1xuICBmdWxsVW5pY29kZSA9ICEhfnN0cmluZ0luZGV4T2YoZmxhZ3MsICd1Jyk7XG4gIG1hdGNoZXIubGFzdEluZGV4ID0gdG9MZW5ndGgoUi5sYXN0SW5kZXgpO1xuICByZXR1cm4gbmV3ICRSZWdFeHBTdHJpbmdJdGVyYXRvcihtYXRjaGVyLCBTLCAkZ2xvYmFsLCBmdWxsVW5pY29kZSk7XG59O1xuXG4vLyBgU3RyaW5nLnByb3RvdHlwZS5tYXRjaEFsbGAgbWV0aG9kXG4vLyBodHRwczovL3RjMzkuZXMvZWNtYTI2Mi8jc2VjLXN0cmluZy5wcm90b3R5cGUubWF0Y2hhbGxcbiQoeyB0YXJnZXQ6ICdTdHJpbmcnLCBwcm90bzogdHJ1ZSwgZm9yY2VkOiBXT1JLU19XSVRIX05PTl9HTE9CQUxfUkVHRVggfSwge1xuICBtYXRjaEFsbDogZnVuY3Rpb24gbWF0Y2hBbGwocmVnZXhwKSB7XG4gICAgdmFyIE8gPSByZXF1aXJlT2JqZWN0Q29lcmNpYmxlKHRoaXMpO1xuICAgIHZhciBmbGFncywgUywgbWF0Y2hlciwgcng7XG4gICAgaWYgKCFpc051bGxPclVuZGVmaW5lZChyZWdleHApKSB7XG4gICAgICBpZiAoaXNSZWdFeHAocmVnZXhwKSkge1xuICAgICAgICBmbGFncyA9IHRvU3RyaW5nKHJlcXVpcmVPYmplY3RDb2VyY2libGUoZ2V0UmVnRXhwRmxhZ3MocmVnZXhwKSkpO1xuICAgICAgICBpZiAoIX5zdHJpbmdJbmRleE9mKGZsYWdzLCAnZycpKSB0aHJvdyBuZXcgJFR5cGVFcnJvcignYC5tYXRjaEFsbGAgZG9lcyBub3QgYWxsb3cgbm9uLWdsb2JhbCByZWdleGVzJyk7XG4gICAgICB9XG4gICAgICBpZiAoV09SS1NfV0lUSF9OT05fR0xPQkFMX1JFR0VYKSByZXR1cm4gbmF0aXZlTWF0Y2hBbGwoTywgcmVnZXhwKTtcbiAgICAgIG1hdGNoZXIgPSBnZXRNZXRob2QocmVnZXhwLCBNQVRDSF9BTEwpO1xuICAgICAgaWYgKG1hdGNoZXIgPT09IHVuZGVmaW5lZCAmJiBJU19QVVJFICYmIGNsYXNzb2YocmVnZXhwKSA9PT0gJ1JlZ0V4cCcpIG1hdGNoZXIgPSAkbWF0Y2hBbGw7XG4gICAgICBpZiAobWF0Y2hlcikgcmV0dXJuIGNhbGwobWF0Y2hlciwgcmVnZXhwLCBPKTtcbiAgICB9IGVsc2UgaWYgKFdPUktTX1dJVEhfTk9OX0dMT0JBTF9SRUdFWCkgcmV0dXJuIG5hdGl2ZU1hdGNoQWxsKE8sIHJlZ2V4cCk7XG4gICAgUyA9IHRvU3RyaW5nKE8pO1xuICAgIHJ4ID0gbmV3IFJlZ0V4cChyZWdleHAsICdnJyk7XG4gICAgcmV0dXJuIElTX1BVUkUgPyBjYWxsKCRtYXRjaEFsbCwgcngsIFMpIDogcnhbTUFUQ0hfQUxMXShTKTtcbiAgfVxufSk7XG5cbklTX1BVUkUgfHwgTUFUQ0hfQUxMIGluIFJlZ0V4cFByb3RvdHlwZSB8fCBkZWZpbmVCdWlsdEluKFJlZ0V4cFByb3RvdHlwZSwgTUFUQ0hfQUxMLCAkbWF0Y2hBbGwpO1xuIiwiJ3VzZSBzdHJpY3QnO1xudmFyICQgPSByZXF1aXJlKCcuLi9pbnRlcm5hbHMvZXhwb3J0Jyk7XG52YXIgY2FsbCA9IHJlcXVpcmUoJy4uL2ludGVybmFscy9mdW5jdGlvbi1jYWxsJyk7XG52YXIgdW5jdXJyeVRoaXMgPSByZXF1aXJlKCcuLi9pbnRlcm5hbHMvZnVuY3Rpb24tdW5jdXJyeS10aGlzJyk7XG52YXIgcmVxdWlyZU9iamVjdENvZXJjaWJsZSA9IHJlcXVpcmUoJy4uL2ludGVybmFscy9yZXF1aXJlLW9iamVjdC1jb2VyY2libGUnKTtcbnZhciBpc0NhbGxhYmxlID0gcmVxdWlyZSgnLi4vaW50ZXJuYWxzL2lzLWNhbGxhYmxlJyk7XG52YXIgaXNOdWxsT3JVbmRlZmluZWQgPSByZXF1aXJlKCcuLi9pbnRlcm5hbHMvaXMtbnVsbC1vci11bmRlZmluZWQnKTtcbnZhciBpc1JlZ0V4cCA9IHJlcXVpcmUoJy4uL2ludGVybmFscy9pcy1yZWdleHAnKTtcbnZhciB0b1N0cmluZyA9IHJlcXVpcmUoJy4uL2ludGVybmFscy90by1zdHJpbmcnKTtcbnZhciBnZXRNZXRob2QgPSByZXF1aXJlKCcuLi9pbnRlcm5hbHMvZ2V0LW1ldGhvZCcpO1xudmFyIGdldFJlZ0V4cEZsYWdzID0gcmVxdWlyZSgnLi4vaW50ZXJuYWxzL3JlZ2V4cC1nZXQtZmxhZ3MnKTtcbnZhciBnZXRTdWJzdGl0dXRpb24gPSByZXF1aXJlKCcuLi9pbnRlcm5hbHMvZ2V0LXN1YnN0aXR1dGlvbicpO1xudmFyIHdlbGxLbm93blN5bWJvbCA9IHJlcXVpcmUoJy4uL2ludGVybmFscy93ZWxsLWtub3duLXN5bWJvbCcpO1xudmFyIElTX1BVUkUgPSByZXF1aXJlKCcuLi9pbnRlcm5hbHMvaXMtcHVyZScpO1xuXG52YXIgUkVQTEFDRSA9IHdlbGxLbm93blN5bWJvbCgncmVwbGFjZScpO1xudmFyICRUeXBlRXJyb3IgPSBUeXBlRXJyb3I7XG52YXIgaW5kZXhPZiA9IHVuY3VycnlUaGlzKCcnLmluZGV4T2YpO1xudmFyIHJlcGxhY2UgPSB1bmN1cnJ5VGhpcygnJy5yZXBsYWNlKTtcbnZhciBzdHJpbmdTbGljZSA9IHVuY3VycnlUaGlzKCcnLnNsaWNlKTtcbnZhciBtYXggPSBNYXRoLm1heDtcblxuLy8gYFN0cmluZy5wcm90b3R5cGUucmVwbGFjZUFsbGAgbWV0aG9kXG4vLyBodHRwczovL3RjMzkuZXMvZWNtYTI2Mi8jc2VjLXN0cmluZy5wcm90b3R5cGUucmVwbGFjZWFsbFxuJCh7IHRhcmdldDogJ1N0cmluZycsIHByb3RvOiB0cnVlIH0sIHtcbiAgcmVwbGFjZUFsbDogZnVuY3Rpb24gcmVwbGFjZUFsbChzZWFyY2hWYWx1ZSwgcmVwbGFjZVZhbHVlKSB7XG4gICAgdmFyIE8gPSByZXF1aXJlT2JqZWN0Q29lcmNpYmxlKHRoaXMpO1xuICAgIHZhciBJU19SRUdfRVhQLCBmbGFncywgcmVwbGFjZXIsIHN0cmluZywgc2VhcmNoU3RyaW5nLCBmdW5jdGlvbmFsUmVwbGFjZSwgc2VhcmNoTGVuZ3RoLCBhZHZhbmNlQnksIHJlcGxhY2VtZW50O1xuICAgIHZhciBwb3NpdGlvbiA9IDA7XG4gICAgdmFyIGVuZE9mTGFzdE1hdGNoID0gMDtcbiAgICB2YXIgcmVzdWx0ID0gJyc7XG4gICAgaWYgKCFpc051bGxPclVuZGVmaW5lZChzZWFyY2hWYWx1ZSkpIHtcbiAgICAgIElTX1JFR19FWFAgPSBpc1JlZ0V4cChzZWFyY2hWYWx1ZSk7XG4gICAgICBpZiAoSVNfUkVHX0VYUCkge1xuICAgICAgICBmbGFncyA9IHRvU3RyaW5nKHJlcXVpcmVPYmplY3RDb2VyY2libGUoZ2V0UmVnRXhwRmxhZ3Moc2VhcmNoVmFsdWUpKSk7XG4gICAgICAgIGlmICghfmluZGV4T2YoZmxhZ3MsICdnJykpIHRocm93IG5ldyAkVHlwZUVycm9yKCdgLnJlcGxhY2VBbGxgIGRvZXMgbm90IGFsbG93IG5vbi1nbG9iYWwgcmVnZXhlcycpO1xuICAgICAgfVxuICAgICAgcmVwbGFjZXIgPSBnZXRNZXRob2Qoc2VhcmNoVmFsdWUsIFJFUExBQ0UpO1xuICAgICAgaWYgKHJlcGxhY2VyKSB7XG4gICAgICAgIHJldHVybiBjYWxsKHJlcGxhY2VyLCBzZWFyY2hWYWx1ZSwgTywgcmVwbGFjZVZhbHVlKTtcbiAgICAgIH0gZWxzZSBpZiAoSVNfUFVSRSAmJiBJU19SRUdfRVhQKSB7XG4gICAgICAgIHJldHVybiByZXBsYWNlKHRvU3RyaW5nKE8pLCBzZWFyY2hWYWx1ZSwgcmVwbGFjZVZhbHVlKTtcbiAgICAgIH1cbiAgICB9XG4gICAgc3RyaW5nID0gdG9TdHJpbmcoTyk7XG4gICAgc2VhcmNoU3RyaW5nID0gdG9TdHJpbmcoc2VhcmNoVmFsdWUpO1xuICAgIGZ1bmN0aW9uYWxSZXBsYWNlID0gaXNDYWxsYWJsZShyZXBsYWNlVmFsdWUpO1xuICAgIGlmICghZnVuY3Rpb25hbFJlcGxhY2UpIHJlcGxhY2VWYWx1ZSA9IHRvU3RyaW5nKHJlcGxhY2VWYWx1ZSk7XG4gICAgc2VhcmNoTGVuZ3RoID0gc2VhcmNoU3RyaW5nLmxlbmd0aDtcbiAgICBhZHZhbmNlQnkgPSBtYXgoMSwgc2VhcmNoTGVuZ3RoKTtcbiAgICBwb3NpdGlvbiA9IGluZGV4T2Yoc3RyaW5nLCBzZWFyY2hTdHJpbmcpO1xuICAgIHdoaWxlIChwb3NpdGlvbiAhPT0gLTEpIHtcbiAgICAgIHJlcGxhY2VtZW50ID0gZnVuY3Rpb25hbFJlcGxhY2VcbiAgICAgICAgPyB0b1N0cmluZyhyZXBsYWNlVmFsdWUoc2VhcmNoU3RyaW5nLCBwb3NpdGlvbiwgc3RyaW5nKSlcbiAgICAgICAgOiBnZXRTdWJzdGl0dXRpb24oc2VhcmNoU3RyaW5nLCBzdHJpbmcsIHBvc2l0aW9uLCBbXSwgdW5kZWZpbmVkLCByZXBsYWNlVmFsdWUpO1xuICAgICAgcmVzdWx0ICs9IHN0cmluZ1NsaWNlKHN0cmluZywgZW5kT2ZMYXN0TWF0Y2gsIHBvc2l0aW9uKSArIHJlcGxhY2VtZW50O1xuICAgICAgZW5kT2ZMYXN0TWF0Y2ggPSBwb3NpdGlvbiArIHNlYXJjaExlbmd0aDtcbiAgICAgIHBvc2l0aW9uID0gcG9zaXRpb24gKyBhZHZhbmNlQnkgPiBzdHJpbmcubGVuZ3RoID8gLTEgOiBpbmRleE9mKHN0cmluZywgc2VhcmNoU3RyaW5nLCBwb3NpdGlvbiArIGFkdmFuY2VCeSk7XG4gICAgfVxuICAgIGlmIChlbmRPZkxhc3RNYXRjaCA8IHN0cmluZy5sZW5ndGgpIHtcbiAgICAgIHJlc3VsdCArPSBzdHJpbmdTbGljZShzdHJpbmcsIGVuZE9mTGFzdE1hdGNoKTtcbiAgICB9XG4gICAgcmV0dXJuIHJlc3VsdDtcbiAgfVxufSk7XG4iLCIndXNlIHN0cmljdCc7XG52YXIgYXBwbHkgPSByZXF1aXJlKCcuLi9pbnRlcm5hbHMvZnVuY3Rpb24tYXBwbHknKTtcbnZhciBjYWxsID0gcmVxdWlyZSgnLi4vaW50ZXJuYWxzL2Z1bmN0aW9uLWNhbGwnKTtcbnZhciB1bmN1cnJ5VGhpcyA9IHJlcXVpcmUoJy4uL2ludGVybmFscy9mdW5jdGlvbi11bmN1cnJ5LXRoaXMnKTtcbnZhciBmaXhSZWdFeHBXZWxsS25vd25TeW1ib2xMb2dpYyA9IHJlcXVpcmUoJy4uL2ludGVybmFscy9maXgtcmVnZXhwLXdlbGwta25vd24tc3ltYm9sLWxvZ2ljJyk7XG52YXIgZmFpbHMgPSByZXF1aXJlKCcuLi9pbnRlcm5hbHMvZmFpbHMnKTtcbnZhciBhbk9iamVjdCA9IHJlcXVpcmUoJy4uL2ludGVybmFscy9hbi1vYmplY3QnKTtcbnZhciBpc0NhbGxhYmxlID0gcmVxdWlyZSgnLi4vaW50ZXJuYWxzL2lzLWNhbGxhYmxlJyk7XG52YXIgaXNOdWxsT3JVbmRlZmluZWQgPSByZXF1aXJlKCcuLi9pbnRlcm5hbHMvaXMtbnVsbC1vci11bmRlZmluZWQnKTtcbnZhciB0b0ludGVnZXJPckluZmluaXR5ID0gcmVxdWlyZSgnLi4vaW50ZXJuYWxzL3RvLWludGVnZXItb3ItaW5maW5pdHknKTtcbnZhciB0b0xlbmd0aCA9IHJlcXVpcmUoJy4uL2ludGVybmFscy90by1sZW5ndGgnKTtcbnZhciB0b1N0cmluZyA9IHJlcXVpcmUoJy4uL2ludGVybmFscy90by1zdHJpbmcnKTtcbnZhciByZXF1aXJlT2JqZWN0Q29lcmNpYmxlID0gcmVxdWlyZSgnLi4vaW50ZXJuYWxzL3JlcXVpcmUtb2JqZWN0LWNvZXJjaWJsZScpO1xudmFyIGFkdmFuY2VTdHJpbmdJbmRleCA9IHJlcXVpcmUoJy4uL2ludGVybmFscy9hZHZhbmNlLXN0cmluZy1pbmRleCcpO1xudmFyIGdldE1ldGhvZCA9IHJlcXVpcmUoJy4uL2ludGVybmFscy9nZXQtbWV0aG9kJyk7XG52YXIgZ2V0U3Vic3RpdHV0aW9uID0gcmVxdWlyZSgnLi4vaW50ZXJuYWxzL2dldC1zdWJzdGl0dXRpb24nKTtcbnZhciByZWdFeHBFeGVjID0gcmVxdWlyZSgnLi4vaW50ZXJuYWxzL3JlZ2V4cC1leGVjLWFic3RyYWN0Jyk7XG52YXIgd2VsbEtub3duU3ltYm9sID0gcmVxdWlyZSgnLi4vaW50ZXJuYWxzL3dlbGwta25vd24tc3ltYm9sJyk7XG5cbnZhciBSRVBMQUNFID0gd2VsbEtub3duU3ltYm9sKCdyZXBsYWNlJyk7XG52YXIgbWF4ID0gTWF0aC5tYXg7XG52YXIgbWluID0gTWF0aC5taW47XG52YXIgY29uY2F0ID0gdW5jdXJyeVRoaXMoW10uY29uY2F0KTtcbnZhciBwdXNoID0gdW5jdXJyeVRoaXMoW10ucHVzaCk7XG52YXIgc3RyaW5nSW5kZXhPZiA9IHVuY3VycnlUaGlzKCcnLmluZGV4T2YpO1xudmFyIHN0cmluZ1NsaWNlID0gdW5jdXJyeVRoaXMoJycuc2xpY2UpO1xuXG52YXIgbWF5YmVUb1N0cmluZyA9IGZ1bmN0aW9uIChpdCkge1xuICByZXR1cm4gaXQgPT09IHVuZGVmaW5lZCA/IGl0IDogU3RyaW5nKGl0KTtcbn07XG5cbi8vIElFIDw9IDExIHJlcGxhY2VzICQwIHdpdGggdGhlIHdob2xlIG1hdGNoLCBhcyBpZiBpdCB3YXMgJCZcbi8vIGh0dHBzOi8vc3RhY2tvdmVyZmxvdy5jb20vcXVlc3Rpb25zLzYwMjQ2NjYvZ2V0dGluZy1pZS10by1yZXBsYWNlLWEtcmVnZXgtd2l0aC10aGUtbGl0ZXJhbC1zdHJpbmctMFxudmFyIFJFUExBQ0VfS0VFUFNfJDAgPSAoZnVuY3Rpb24gKCkge1xuICAvLyBlc2xpbnQtZGlzYWJsZS1uZXh0LWxpbmUgcmVnZXhwL3ByZWZlci1lc2NhcGUtcmVwbGFjZW1lbnQtZG9sbGFyLWNoYXIgLS0gcmVxdWlyZWQgZm9yIHRlc3RpbmdcbiAgcmV0dXJuICdhJy5yZXBsYWNlKC8uLywgJyQwJykgPT09ICckMCc7XG59KSgpO1xuXG4vLyBTYWZhcmkgPD0gMTMuMC4zKD8pIHN1YnN0aXR1dGVzIG50aCBjYXB0dXJlIHdoZXJlIG4+bSB3aXRoIGFuIGVtcHR5IHN0cmluZ1xudmFyIFJFR0VYUF9SRVBMQUNFX1NVQlNUSVRVVEVTX1VOREVGSU5FRF9DQVBUVVJFID0gKGZ1bmN0aW9uICgpIHtcbiAgaWYgKC8uL1tSRVBMQUNFXSkge1xuICAgIHJldHVybiAvLi9bUkVQTEFDRV0oJ2EnLCAnJDAnKSA9PT0gJyc7XG4gIH1cbiAgcmV0dXJuIGZhbHNlO1xufSkoKTtcblxudmFyIFJFUExBQ0VfU1VQUE9SVFNfTkFNRURfR1JPVVBTID0gIWZhaWxzKGZ1bmN0aW9uICgpIHtcbiAgdmFyIHJlID0gLy4vO1xuICByZS5leGVjID0gZnVuY3Rpb24gKCkge1xuICAgIHZhciByZXN1bHQgPSBbXTtcbiAgICByZXN1bHQuZ3JvdXBzID0geyBhOiAnNycgfTtcbiAgICByZXR1cm4gcmVzdWx0O1xuICB9O1xuICAvLyBlc2xpbnQtZGlzYWJsZS1uZXh0LWxpbmUgcmVnZXhwL25vLXVzZWxlc3MtZG9sbGFyLXJlcGxhY2VtZW50cyAtLSBmYWxzZSBwb3NpdGl2ZVxuICByZXR1cm4gJycucmVwbGFjZShyZSwgJyQ8YT4nKSAhPT0gJzcnO1xufSk7XG5cbi8vIEBAcmVwbGFjZSBsb2dpY1xuZml4UmVnRXhwV2VsbEtub3duU3ltYm9sTG9naWMoJ3JlcGxhY2UnLCBmdW5jdGlvbiAoXywgbmF0aXZlUmVwbGFjZSwgbWF5YmVDYWxsTmF0aXZlKSB7XG4gIHZhciBVTlNBRkVfU1VCU1RJVFVURSA9IFJFR0VYUF9SRVBMQUNFX1NVQlNUSVRVVEVTX1VOREVGSU5FRF9DQVBUVVJFID8gJyQnIDogJyQwJztcblxuICByZXR1cm4gW1xuICAgIC8vIGBTdHJpbmcucHJvdG90eXBlLnJlcGxhY2VgIG1ldGhvZFxuICAgIC8vIGh0dHBzOi8vdGMzOS5lcy9lY21hMjYyLyNzZWMtc3RyaW5nLnByb3RvdHlwZS5yZXBsYWNlXG4gICAgZnVuY3Rpb24gcmVwbGFjZShzZWFyY2hWYWx1ZSwgcmVwbGFjZVZhbHVlKSB7XG4gICAgICB2YXIgTyA9IHJlcXVpcmVPYmplY3RDb2VyY2libGUodGhpcyk7XG4gICAgICB2YXIgcmVwbGFjZXIgPSBpc051bGxPclVuZGVmaW5lZChzZWFyY2hWYWx1ZSkgPyB1bmRlZmluZWQgOiBnZXRNZXRob2Qoc2VhcmNoVmFsdWUsIFJFUExBQ0UpO1xuICAgICAgcmV0dXJuIHJlcGxhY2VyXG4gICAgICAgID8gY2FsbChyZXBsYWNlciwgc2VhcmNoVmFsdWUsIE8sIHJlcGxhY2VWYWx1ZSlcbiAgICAgICAgOiBjYWxsKG5hdGl2ZVJlcGxhY2UsIHRvU3RyaW5nKE8pLCBzZWFyY2hWYWx1ZSwgcmVwbGFjZVZhbHVlKTtcbiAgICB9LFxuICAgIC8vIGBSZWdFeHAucHJvdG90eXBlW0BAcmVwbGFjZV1gIG1ldGhvZFxuICAgIC8vIGh0dHBzOi8vdGMzOS5lcy9lY21hMjYyLyNzZWMtcmVnZXhwLnByb3RvdHlwZS1AQHJlcGxhY2VcbiAgICBmdW5jdGlvbiAoc3RyaW5nLCByZXBsYWNlVmFsdWUpIHtcbiAgICAgIHZhciByeCA9IGFuT2JqZWN0KHRoaXMpO1xuICAgICAgdmFyIFMgPSB0b1N0cmluZyhzdHJpbmcpO1xuXG4gICAgICBpZiAoXG4gICAgICAgIHR5cGVvZiByZXBsYWNlVmFsdWUgPT0gJ3N0cmluZycgJiZcbiAgICAgICAgc3RyaW5nSW5kZXhPZihyZXBsYWNlVmFsdWUsIFVOU0FGRV9TVUJTVElUVVRFKSA9PT0gLTEgJiZcbiAgICAgICAgc3RyaW5nSW5kZXhPZihyZXBsYWNlVmFsdWUsICckPCcpID09PSAtMVxuICAgICAgKSB7XG4gICAgICAgIHZhciByZXMgPSBtYXliZUNhbGxOYXRpdmUobmF0aXZlUmVwbGFjZSwgcngsIFMsIHJlcGxhY2VWYWx1ZSk7XG4gICAgICAgIGlmIChyZXMuZG9uZSkgcmV0dXJuIHJlcy52YWx1ZTtcbiAgICAgIH1cblxuICAgICAgdmFyIGZ1bmN0aW9uYWxSZXBsYWNlID0gaXNDYWxsYWJsZShyZXBsYWNlVmFsdWUpO1xuICAgICAgaWYgKCFmdW5jdGlvbmFsUmVwbGFjZSkgcmVwbGFjZVZhbHVlID0gdG9TdHJpbmcocmVwbGFjZVZhbHVlKTtcblxuICAgICAgdmFyIGdsb2JhbCA9IHJ4Lmdsb2JhbDtcbiAgICAgIHZhciBmdWxsVW5pY29kZTtcbiAgICAgIGlmIChnbG9iYWwpIHtcbiAgICAgICAgZnVsbFVuaWNvZGUgPSByeC51bmljb2RlO1xuICAgICAgICByeC5sYXN0SW5kZXggPSAwO1xuICAgICAgfVxuXG4gICAgICB2YXIgcmVzdWx0cyA9IFtdO1xuICAgICAgdmFyIHJlc3VsdDtcbiAgICAgIHdoaWxlICh0cnVlKSB7XG4gICAgICAgIHJlc3VsdCA9IHJlZ0V4cEV4ZWMocngsIFMpO1xuICAgICAgICBpZiAocmVzdWx0ID09PSBudWxsKSBicmVhaztcblxuICAgICAgICBwdXNoKHJlc3VsdHMsIHJlc3VsdCk7XG4gICAgICAgIGlmICghZ2xvYmFsKSBicmVhaztcblxuICAgICAgICB2YXIgbWF0Y2hTdHIgPSB0b1N0cmluZyhyZXN1bHRbMF0pO1xuICAgICAgICBpZiAobWF0Y2hTdHIgPT09ICcnKSByeC5sYXN0SW5kZXggPSBhZHZhbmNlU3RyaW5nSW5kZXgoUywgdG9MZW5ndGgocngubGFzdEluZGV4KSwgZnVsbFVuaWNvZGUpO1xuICAgICAgfVxuXG4gICAgICB2YXIgYWNjdW11bGF0ZWRSZXN1bHQgPSAnJztcbiAgICAgIHZhciBuZXh0U291cmNlUG9zaXRpb24gPSAwO1xuICAgICAgZm9yICh2YXIgaSA9IDA7IGkgPCByZXN1bHRzLmxlbmd0aDsgaSsrKSB7XG4gICAgICAgIHJlc3VsdCA9IHJlc3VsdHNbaV07XG5cbiAgICAgICAgdmFyIG1hdGNoZWQgPSB0b1N0cmluZyhyZXN1bHRbMF0pO1xuICAgICAgICB2YXIgcG9zaXRpb24gPSBtYXgobWluKHRvSW50ZWdlck9ySW5maW5pdHkocmVzdWx0LmluZGV4KSwgUy5sZW5ndGgpLCAwKTtcbiAgICAgICAgdmFyIGNhcHR1cmVzID0gW107XG4gICAgICAgIHZhciByZXBsYWNlbWVudDtcbiAgICAgICAgLy8gTk9URTogVGhpcyBpcyBlcXVpdmFsZW50IHRvXG4gICAgICAgIC8vICAgY2FwdHVyZXMgPSByZXN1bHQuc2xpY2UoMSkubWFwKG1heWJlVG9TdHJpbmcpXG4gICAgICAgIC8vIGJ1dCBmb3Igc29tZSByZWFzb24gYG5hdGl2ZVNsaWNlLmNhbGwocmVzdWx0LCAxLCByZXN1bHQubGVuZ3RoKWAgKGNhbGxlZCBpblxuICAgICAgICAvLyB0aGUgc2xpY2UgcG9seWZpbGwgd2hlbiBzbGljaW5nIG5hdGl2ZSBhcnJheXMpIFwiZG9lc24ndCB3b3JrXCIgaW4gc2FmYXJpIDkgYW5kXG4gICAgICAgIC8vIGNhdXNlcyBhIGNyYXNoIChodHRwczovL3Bhc3RlYmluLmNvbS9OMjFRemVRQSkgd2hlbiB0cnlpbmcgdG8gZGVidWcgaXQuXG4gICAgICAgIGZvciAodmFyIGogPSAxOyBqIDwgcmVzdWx0Lmxlbmd0aDsgaisrKSBwdXNoKGNhcHR1cmVzLCBtYXliZVRvU3RyaW5nKHJlc3VsdFtqXSkpO1xuICAgICAgICB2YXIgbmFtZWRDYXB0dXJlcyA9IHJlc3VsdC5ncm91cHM7XG4gICAgICAgIGlmIChmdW5jdGlvbmFsUmVwbGFjZSkge1xuICAgICAgICAgIHZhciByZXBsYWNlckFyZ3MgPSBjb25jYXQoW21hdGNoZWRdLCBjYXB0dXJlcywgcG9zaXRpb24sIFMpO1xuICAgICAgICAgIGlmIChuYW1lZENhcHR1cmVzICE9PSB1bmRlZmluZWQpIHB1c2gocmVwbGFjZXJBcmdzLCBuYW1lZENhcHR1cmVzKTtcbiAgICAgICAgICByZXBsYWNlbWVudCA9IHRvU3RyaW5nKGFwcGx5KHJlcGxhY2VWYWx1ZSwgdW5kZWZpbmVkLCByZXBsYWNlckFyZ3MpKTtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICByZXBsYWNlbWVudCA9IGdldFN1YnN0aXR1dGlvbihtYXRjaGVkLCBTLCBwb3NpdGlvbiwgY2FwdHVyZXMsIG5hbWVkQ2FwdHVyZXMsIHJlcGxhY2VWYWx1ZSk7XG4gICAgICAgIH1cbiAgICAgICAgaWYgKHBvc2l0aW9uID49IG5leHRTb3VyY2VQb3NpdGlvbikge1xuICAgICAgICAgIGFjY3VtdWxhdGVkUmVzdWx0ICs9IHN0cmluZ1NsaWNlKFMsIG5leHRTb3VyY2VQb3NpdGlvbiwgcG9zaXRpb24pICsgcmVwbGFjZW1lbnQ7XG4gICAgICAgICAgbmV4dFNvdXJjZVBvc2l0aW9uID0gcG9zaXRpb24gKyBtYXRjaGVkLmxlbmd0aDtcbiAgICAgICAgfVxuICAgICAgfVxuXG4gICAgICByZXR1cm4gYWNjdW11bGF0ZWRSZXN1bHQgKyBzdHJpbmdTbGljZShTLCBuZXh0U291cmNlUG9zaXRpb24pO1xuICAgIH1cbiAgXTtcbn0sICFSRVBMQUNFX1NVUFBPUlRTX05BTUVEX0dST1VQUyB8fCAhUkVQTEFDRV9LRUVQU18kMCB8fCBSRUdFWFBfUkVQTEFDRV9TVUJTVElUVVRFU19VTkRFRklORURfQ0FQVFVSRSk7XG4iLCIndXNlIHN0cmljdCc7XG4vLyBUT0RPOiBSZW1vdmUgZnJvbSBgY29yZS1qc0A0YFxucmVxdWlyZSgnLi4vbW9kdWxlcy9lcy5zdHJpbmcubWF0Y2gtYWxsJyk7XG4iLCIndXNlIHN0cmljdCc7XG4vLyBUT0RPOiBSZW1vdmUgZnJvbSBgY29yZS1qc0A0YFxucmVxdWlyZSgnLi4vbW9kdWxlcy9lcy5zdHJpbmcucmVwbGFjZS1hbGwnKTtcbiIsIid1c2Ugc3RyaWN0Jztcbi8vIFRPRE86IGluIGNvcmUtanNANCwgbW92ZSAvbW9kdWxlcy8gZGVwZW5kZW5jaWVzIHRvIHB1YmxpYyBlbnRyaWVzIGZvciBiZXR0ZXIgb3B0aW1pemF0aW9uIGJ5IHRvb2xzIGxpa2UgYHByZXNldC1lbnZgXG5yZXF1aXJlKCcuLi9tb2R1bGVzL2VzLmFycmF5Lml0ZXJhdG9yJyk7XG52YXIgJCA9IHJlcXVpcmUoJy4uL2ludGVybmFscy9leHBvcnQnKTtcbnZhciBnbG9iYWwgPSByZXF1aXJlKCcuLi9pbnRlcm5hbHMvZ2xvYmFsJyk7XG52YXIgc2FmZUdldEJ1aWx0SW4gPSByZXF1aXJlKCcuLi9pbnRlcm5hbHMvc2FmZS1nZXQtYnVpbHQtaW4nKTtcbnZhciBjYWxsID0gcmVxdWlyZSgnLi4vaW50ZXJuYWxzL2Z1bmN0aW9uLWNhbGwnKTtcbnZhciB1bmN1cnJ5VGhpcyA9IHJlcXVpcmUoJy4uL2ludGVybmFscy9mdW5jdGlvbi11bmN1cnJ5LXRoaXMnKTtcbnZhciBERVNDUklQVE9SUyA9IHJlcXVpcmUoJy4uL2ludGVybmFscy9kZXNjcmlwdG9ycycpO1xudmFyIFVTRV9OQVRJVkVfVVJMID0gcmVxdWlyZSgnLi4vaW50ZXJuYWxzL3VybC1jb25zdHJ1Y3Rvci1kZXRlY3Rpb24nKTtcbnZhciBkZWZpbmVCdWlsdEluID0gcmVxdWlyZSgnLi4vaW50ZXJuYWxzL2RlZmluZS1idWlsdC1pbicpO1xudmFyIGRlZmluZUJ1aWx0SW5BY2Nlc3NvciA9IHJlcXVpcmUoJy4uL2ludGVybmFscy9kZWZpbmUtYnVpbHQtaW4tYWNjZXNzb3InKTtcbnZhciBkZWZpbmVCdWlsdElucyA9IHJlcXVpcmUoJy4uL2ludGVybmFscy9kZWZpbmUtYnVpbHQtaW5zJyk7XG52YXIgc2V0VG9TdHJpbmdUYWcgPSByZXF1aXJlKCcuLi9pbnRlcm5hbHMvc2V0LXRvLXN0cmluZy10YWcnKTtcbnZhciBjcmVhdGVJdGVyYXRvckNvbnN0cnVjdG9yID0gcmVxdWlyZSgnLi4vaW50ZXJuYWxzL2l0ZXJhdG9yLWNyZWF0ZS1jb25zdHJ1Y3RvcicpO1xudmFyIEludGVybmFsU3RhdGVNb2R1bGUgPSByZXF1aXJlKCcuLi9pbnRlcm5hbHMvaW50ZXJuYWwtc3RhdGUnKTtcbnZhciBhbkluc3RhbmNlID0gcmVxdWlyZSgnLi4vaW50ZXJuYWxzL2FuLWluc3RhbmNlJyk7XG52YXIgaXNDYWxsYWJsZSA9IHJlcXVpcmUoJy4uL2ludGVybmFscy9pcy1jYWxsYWJsZScpO1xudmFyIGhhc093biA9IHJlcXVpcmUoJy4uL2ludGVybmFscy9oYXMtb3duLXByb3BlcnR5Jyk7XG52YXIgYmluZCA9IHJlcXVpcmUoJy4uL2ludGVybmFscy9mdW5jdGlvbi1iaW5kLWNvbnRleHQnKTtcbnZhciBjbGFzc29mID0gcmVxdWlyZSgnLi4vaW50ZXJuYWxzL2NsYXNzb2YnKTtcbnZhciBhbk9iamVjdCA9IHJlcXVpcmUoJy4uL2ludGVybmFscy9hbi1vYmplY3QnKTtcbnZhciBpc09iamVjdCA9IHJlcXVpcmUoJy4uL2ludGVybmFscy9pcy1vYmplY3QnKTtcbnZhciAkdG9TdHJpbmcgPSByZXF1aXJlKCcuLi9pbnRlcm5hbHMvdG8tc3RyaW5nJyk7XG52YXIgY3JlYXRlID0gcmVxdWlyZSgnLi4vaW50ZXJuYWxzL29iamVjdC1jcmVhdGUnKTtcbnZhciBjcmVhdGVQcm9wZXJ0eURlc2NyaXB0b3IgPSByZXF1aXJlKCcuLi9pbnRlcm5hbHMvY3JlYXRlLXByb3BlcnR5LWRlc2NyaXB0b3InKTtcbnZhciBnZXRJdGVyYXRvciA9IHJlcXVpcmUoJy4uL2ludGVybmFscy9nZXQtaXRlcmF0b3InKTtcbnZhciBnZXRJdGVyYXRvck1ldGhvZCA9IHJlcXVpcmUoJy4uL2ludGVybmFscy9nZXQtaXRlcmF0b3ItbWV0aG9kJyk7XG52YXIgY3JlYXRlSXRlclJlc3VsdE9iamVjdCA9IHJlcXVpcmUoJy4uL2ludGVybmFscy9jcmVhdGUtaXRlci1yZXN1bHQtb2JqZWN0Jyk7XG52YXIgdmFsaWRhdGVBcmd1bWVudHNMZW5ndGggPSByZXF1aXJlKCcuLi9pbnRlcm5hbHMvdmFsaWRhdGUtYXJndW1lbnRzLWxlbmd0aCcpO1xudmFyIHdlbGxLbm93blN5bWJvbCA9IHJlcXVpcmUoJy4uL2ludGVybmFscy93ZWxsLWtub3duLXN5bWJvbCcpO1xudmFyIGFycmF5U29ydCA9IHJlcXVpcmUoJy4uL2ludGVybmFscy9hcnJheS1zb3J0Jyk7XG5cbnZhciBJVEVSQVRPUiA9IHdlbGxLbm93blN5bWJvbCgnaXRlcmF0b3InKTtcbnZhciBVUkxfU0VBUkNIX1BBUkFNUyA9ICdVUkxTZWFyY2hQYXJhbXMnO1xudmFyIFVSTF9TRUFSQ0hfUEFSQU1TX0lURVJBVE9SID0gVVJMX1NFQVJDSF9QQVJBTVMgKyAnSXRlcmF0b3InO1xudmFyIHNldEludGVybmFsU3RhdGUgPSBJbnRlcm5hbFN0YXRlTW9kdWxlLnNldDtcbnZhciBnZXRJbnRlcm5hbFBhcmFtc1N0YXRlID0gSW50ZXJuYWxTdGF0ZU1vZHVsZS5nZXR0ZXJGb3IoVVJMX1NFQVJDSF9QQVJBTVMpO1xudmFyIGdldEludGVybmFsSXRlcmF0b3JTdGF0ZSA9IEludGVybmFsU3RhdGVNb2R1bGUuZ2V0dGVyRm9yKFVSTF9TRUFSQ0hfUEFSQU1TX0lURVJBVE9SKTtcblxudmFyIG5hdGl2ZUZldGNoID0gc2FmZUdldEJ1aWx0SW4oJ2ZldGNoJyk7XG52YXIgTmF0aXZlUmVxdWVzdCA9IHNhZmVHZXRCdWlsdEluKCdSZXF1ZXN0Jyk7XG52YXIgSGVhZGVycyA9IHNhZmVHZXRCdWlsdEluKCdIZWFkZXJzJyk7XG52YXIgUmVxdWVzdFByb3RvdHlwZSA9IE5hdGl2ZVJlcXVlc3QgJiYgTmF0aXZlUmVxdWVzdC5wcm90b3R5cGU7XG52YXIgSGVhZGVyc1Byb3RvdHlwZSA9IEhlYWRlcnMgJiYgSGVhZGVycy5wcm90b3R5cGU7XG52YXIgUmVnRXhwID0gZ2xvYmFsLlJlZ0V4cDtcbnZhciBUeXBlRXJyb3IgPSBnbG9iYWwuVHlwZUVycm9yO1xudmFyIGRlY29kZVVSSUNvbXBvbmVudCA9IGdsb2JhbC5kZWNvZGVVUklDb21wb25lbnQ7XG52YXIgZW5jb2RlVVJJQ29tcG9uZW50ID0gZ2xvYmFsLmVuY29kZVVSSUNvbXBvbmVudDtcbnZhciBjaGFyQXQgPSB1bmN1cnJ5VGhpcygnJy5jaGFyQXQpO1xudmFyIGpvaW4gPSB1bmN1cnJ5VGhpcyhbXS5qb2luKTtcbnZhciBwdXNoID0gdW5jdXJyeVRoaXMoW10ucHVzaCk7XG52YXIgcmVwbGFjZSA9IHVuY3VycnlUaGlzKCcnLnJlcGxhY2UpO1xudmFyIHNoaWZ0ID0gdW5jdXJyeVRoaXMoW10uc2hpZnQpO1xudmFyIHNwbGljZSA9IHVuY3VycnlUaGlzKFtdLnNwbGljZSk7XG52YXIgc3BsaXQgPSB1bmN1cnJ5VGhpcygnJy5zcGxpdCk7XG52YXIgc3RyaW5nU2xpY2UgPSB1bmN1cnJ5VGhpcygnJy5zbGljZSk7XG5cbnZhciBwbHVzID0gL1xcKy9nO1xudmFyIHNlcXVlbmNlcyA9IEFycmF5KDQpO1xuXG52YXIgcGVyY2VudFNlcXVlbmNlID0gZnVuY3Rpb24gKGJ5dGVzKSB7XG4gIHJldHVybiBzZXF1ZW5jZXNbYnl0ZXMgLSAxXSB8fCAoc2VxdWVuY2VzW2J5dGVzIC0gMV0gPSBSZWdFeHAoJygoPzolW1xcXFxkYS1mXXsyfSl7JyArIGJ5dGVzICsgJ30pJywgJ2dpJykpO1xufTtcblxudmFyIHBlcmNlbnREZWNvZGUgPSBmdW5jdGlvbiAoc2VxdWVuY2UpIHtcbiAgdHJ5IHtcbiAgICByZXR1cm4gZGVjb2RlVVJJQ29tcG9uZW50KHNlcXVlbmNlKTtcbiAgfSBjYXRjaCAoZXJyb3IpIHtcbiAgICByZXR1cm4gc2VxdWVuY2U7XG4gIH1cbn07XG5cbnZhciBkZXNlcmlhbGl6ZSA9IGZ1bmN0aW9uIChpdCkge1xuICB2YXIgcmVzdWx0ID0gcmVwbGFjZShpdCwgcGx1cywgJyAnKTtcbiAgdmFyIGJ5dGVzID0gNDtcbiAgdHJ5IHtcbiAgICByZXR1cm4gZGVjb2RlVVJJQ29tcG9uZW50KHJlc3VsdCk7XG4gIH0gY2F0Y2ggKGVycm9yKSB7XG4gICAgd2hpbGUgKGJ5dGVzKSB7XG4gICAgICByZXN1bHQgPSByZXBsYWNlKHJlc3VsdCwgcGVyY2VudFNlcXVlbmNlKGJ5dGVzLS0pLCBwZXJjZW50RGVjb2RlKTtcbiAgICB9XG4gICAgcmV0dXJuIHJlc3VsdDtcbiAgfVxufTtcblxudmFyIGZpbmQgPSAvWyEnKCl+XXwlMjAvZztcblxudmFyIHJlcGxhY2VtZW50cyA9IHtcbiAgJyEnOiAnJTIxJyxcbiAgXCInXCI6ICclMjcnLFxuICAnKCc6ICclMjgnLFxuICAnKSc6ICclMjknLFxuICAnfic6ICclN0UnLFxuICAnJTIwJzogJysnXG59O1xuXG52YXIgcmVwbGFjZXIgPSBmdW5jdGlvbiAobWF0Y2gpIHtcbiAgcmV0dXJuIHJlcGxhY2VtZW50c1ttYXRjaF07XG59O1xuXG52YXIgc2VyaWFsaXplID0gZnVuY3Rpb24gKGl0KSB7XG4gIHJldHVybiByZXBsYWNlKGVuY29kZVVSSUNvbXBvbmVudChpdCksIGZpbmQsIHJlcGxhY2VyKTtcbn07XG5cbnZhciBVUkxTZWFyY2hQYXJhbXNJdGVyYXRvciA9IGNyZWF0ZUl0ZXJhdG9yQ29uc3RydWN0b3IoZnVuY3Rpb24gSXRlcmF0b3IocGFyYW1zLCBraW5kKSB7XG4gIHNldEludGVybmFsU3RhdGUodGhpcywge1xuICAgIHR5cGU6IFVSTF9TRUFSQ0hfUEFSQU1TX0lURVJBVE9SLFxuICAgIHRhcmdldDogZ2V0SW50ZXJuYWxQYXJhbXNTdGF0ZShwYXJhbXMpLmVudHJpZXMsXG4gICAgaW5kZXg6IDAsXG4gICAga2luZDoga2luZFxuICB9KTtcbn0sIFVSTF9TRUFSQ0hfUEFSQU1TLCBmdW5jdGlvbiBuZXh0KCkge1xuICB2YXIgc3RhdGUgPSBnZXRJbnRlcm5hbEl0ZXJhdG9yU3RhdGUodGhpcyk7XG4gIHZhciB0YXJnZXQgPSBzdGF0ZS50YXJnZXQ7XG4gIHZhciBpbmRleCA9IHN0YXRlLmluZGV4Kys7XG4gIGlmICghdGFyZ2V0IHx8IGluZGV4ID49IHRhcmdldC5sZW5ndGgpIHtcbiAgICBzdGF0ZS50YXJnZXQgPSB1bmRlZmluZWQ7XG4gICAgcmV0dXJuIGNyZWF0ZUl0ZXJSZXN1bHRPYmplY3QodW5kZWZpbmVkLCB0cnVlKTtcbiAgfVxuICB2YXIgZW50cnkgPSB0YXJnZXRbaW5kZXhdO1xuICBzd2l0Y2ggKHN0YXRlLmtpbmQpIHtcbiAgICBjYXNlICdrZXlzJzogcmV0dXJuIGNyZWF0ZUl0ZXJSZXN1bHRPYmplY3QoZW50cnkua2V5LCBmYWxzZSk7XG4gICAgY2FzZSAndmFsdWVzJzogcmV0dXJuIGNyZWF0ZUl0ZXJSZXN1bHRPYmplY3QoZW50cnkudmFsdWUsIGZhbHNlKTtcbiAgfSByZXR1cm4gY3JlYXRlSXRlclJlc3VsdE9iamVjdChbZW50cnkua2V5LCBlbnRyeS52YWx1ZV0sIGZhbHNlKTtcbn0sIHRydWUpO1xuXG52YXIgVVJMU2VhcmNoUGFyYW1zU3RhdGUgPSBmdW5jdGlvbiAoaW5pdCkge1xuICB0aGlzLmVudHJpZXMgPSBbXTtcbiAgdGhpcy51cmwgPSBudWxsO1xuXG4gIGlmIChpbml0ICE9PSB1bmRlZmluZWQpIHtcbiAgICBpZiAoaXNPYmplY3QoaW5pdCkpIHRoaXMucGFyc2VPYmplY3QoaW5pdCk7XG4gICAgZWxzZSB0aGlzLnBhcnNlUXVlcnkodHlwZW9mIGluaXQgPT0gJ3N0cmluZycgPyBjaGFyQXQoaW5pdCwgMCkgPT09ICc/JyA/IHN0cmluZ1NsaWNlKGluaXQsIDEpIDogaW5pdCA6ICR0b1N0cmluZyhpbml0KSk7XG4gIH1cbn07XG5cblVSTFNlYXJjaFBhcmFtc1N0YXRlLnByb3RvdHlwZSA9IHtcbiAgdHlwZTogVVJMX1NFQVJDSF9QQVJBTVMsXG4gIGJpbmRVUkw6IGZ1bmN0aW9uICh1cmwpIHtcbiAgICB0aGlzLnVybCA9IHVybDtcbiAgICB0aGlzLnVwZGF0ZSgpO1xuICB9LFxuICBwYXJzZU9iamVjdDogZnVuY3Rpb24gKG9iamVjdCkge1xuICAgIHZhciBlbnRyaWVzID0gdGhpcy5lbnRyaWVzO1xuICAgIHZhciBpdGVyYXRvck1ldGhvZCA9IGdldEl0ZXJhdG9yTWV0aG9kKG9iamVjdCk7XG4gICAgdmFyIGl0ZXJhdG9yLCBuZXh0LCBzdGVwLCBlbnRyeUl0ZXJhdG9yLCBlbnRyeU5leHQsIGZpcnN0LCBzZWNvbmQ7XG5cbiAgICBpZiAoaXRlcmF0b3JNZXRob2QpIHtcbiAgICAgIGl0ZXJhdG9yID0gZ2V0SXRlcmF0b3Iob2JqZWN0LCBpdGVyYXRvck1ldGhvZCk7XG4gICAgICBuZXh0ID0gaXRlcmF0b3IubmV4dDtcbiAgICAgIHdoaWxlICghKHN0ZXAgPSBjYWxsKG5leHQsIGl0ZXJhdG9yKSkuZG9uZSkge1xuICAgICAgICBlbnRyeUl0ZXJhdG9yID0gZ2V0SXRlcmF0b3IoYW5PYmplY3Qoc3RlcC52YWx1ZSkpO1xuICAgICAgICBlbnRyeU5leHQgPSBlbnRyeUl0ZXJhdG9yLm5leHQ7XG4gICAgICAgIGlmIChcbiAgICAgICAgICAoZmlyc3QgPSBjYWxsKGVudHJ5TmV4dCwgZW50cnlJdGVyYXRvcikpLmRvbmUgfHxcbiAgICAgICAgICAoc2Vjb25kID0gY2FsbChlbnRyeU5leHQsIGVudHJ5SXRlcmF0b3IpKS5kb25lIHx8XG4gICAgICAgICAgIWNhbGwoZW50cnlOZXh0LCBlbnRyeUl0ZXJhdG9yKS5kb25lXG4gICAgICAgICkgdGhyb3cgbmV3IFR5cGVFcnJvcignRXhwZWN0ZWQgc2VxdWVuY2Ugd2l0aCBsZW5ndGggMicpO1xuICAgICAgICBwdXNoKGVudHJpZXMsIHsga2V5OiAkdG9TdHJpbmcoZmlyc3QudmFsdWUpLCB2YWx1ZTogJHRvU3RyaW5nKHNlY29uZC52YWx1ZSkgfSk7XG4gICAgICB9XG4gICAgfSBlbHNlIGZvciAodmFyIGtleSBpbiBvYmplY3QpIGlmIChoYXNPd24ob2JqZWN0LCBrZXkpKSB7XG4gICAgICBwdXNoKGVudHJpZXMsIHsga2V5OiBrZXksIHZhbHVlOiAkdG9TdHJpbmcob2JqZWN0W2tleV0pIH0pO1xuICAgIH1cbiAgfSxcbiAgcGFyc2VRdWVyeTogZnVuY3Rpb24gKHF1ZXJ5KSB7XG4gICAgaWYgKHF1ZXJ5KSB7XG4gICAgICB2YXIgZW50cmllcyA9IHRoaXMuZW50cmllcztcbiAgICAgIHZhciBhdHRyaWJ1dGVzID0gc3BsaXQocXVlcnksICcmJyk7XG4gICAgICB2YXIgaW5kZXggPSAwO1xuICAgICAgdmFyIGF0dHJpYnV0ZSwgZW50cnk7XG4gICAgICB3aGlsZSAoaW5kZXggPCBhdHRyaWJ1dGVzLmxlbmd0aCkge1xuICAgICAgICBhdHRyaWJ1dGUgPSBhdHRyaWJ1dGVzW2luZGV4KytdO1xuICAgICAgICBpZiAoYXR0cmlidXRlLmxlbmd0aCkge1xuICAgICAgICAgIGVudHJ5ID0gc3BsaXQoYXR0cmlidXRlLCAnPScpO1xuICAgICAgICAgIHB1c2goZW50cmllcywge1xuICAgICAgICAgICAga2V5OiBkZXNlcmlhbGl6ZShzaGlmdChlbnRyeSkpLFxuICAgICAgICAgICAgdmFsdWU6IGRlc2VyaWFsaXplKGpvaW4oZW50cnksICc9JykpXG4gICAgICAgICAgfSk7XG4gICAgICAgIH1cbiAgICAgIH1cbiAgICB9XG4gIH0sXG4gIHNlcmlhbGl6ZTogZnVuY3Rpb24gKCkge1xuICAgIHZhciBlbnRyaWVzID0gdGhpcy5lbnRyaWVzO1xuICAgIHZhciByZXN1bHQgPSBbXTtcbiAgICB2YXIgaW5kZXggPSAwO1xuICAgIHZhciBlbnRyeTtcbiAgICB3aGlsZSAoaW5kZXggPCBlbnRyaWVzLmxlbmd0aCkge1xuICAgICAgZW50cnkgPSBlbnRyaWVzW2luZGV4KytdO1xuICAgICAgcHVzaChyZXN1bHQsIHNlcmlhbGl6ZShlbnRyeS5rZXkpICsgJz0nICsgc2VyaWFsaXplKGVudHJ5LnZhbHVlKSk7XG4gICAgfSByZXR1cm4gam9pbihyZXN1bHQsICcmJyk7XG4gIH0sXG4gIHVwZGF0ZTogZnVuY3Rpb24gKCkge1xuICAgIHRoaXMuZW50cmllcy5sZW5ndGggPSAwO1xuICAgIHRoaXMucGFyc2VRdWVyeSh0aGlzLnVybC5xdWVyeSk7XG4gIH0sXG4gIHVwZGF0ZVVSTDogZnVuY3Rpb24gKCkge1xuICAgIGlmICh0aGlzLnVybCkgdGhpcy51cmwudXBkYXRlKCk7XG4gIH1cbn07XG5cbi8vIGBVUkxTZWFyY2hQYXJhbXNgIGNvbnN0cnVjdG9yXG4vLyBodHRwczovL3VybC5zcGVjLndoYXR3Zy5vcmcvI2ludGVyZmFjZS11cmxzZWFyY2hwYXJhbXNcbnZhciBVUkxTZWFyY2hQYXJhbXNDb25zdHJ1Y3RvciA9IGZ1bmN0aW9uIFVSTFNlYXJjaFBhcmFtcygvKiBpbml0ICovKSB7XG4gIGFuSW5zdGFuY2UodGhpcywgVVJMU2VhcmNoUGFyYW1zUHJvdG90eXBlKTtcbiAgdmFyIGluaXQgPSBhcmd1bWVudHMubGVuZ3RoID4gMCA/IGFyZ3VtZW50c1swXSA6IHVuZGVmaW5lZDtcbiAgdmFyIHN0YXRlID0gc2V0SW50ZXJuYWxTdGF0ZSh0aGlzLCBuZXcgVVJMU2VhcmNoUGFyYW1zU3RhdGUoaW5pdCkpO1xuICBpZiAoIURFU0NSSVBUT1JTKSB0aGlzLnNpemUgPSBzdGF0ZS5lbnRyaWVzLmxlbmd0aDtcbn07XG5cbnZhciBVUkxTZWFyY2hQYXJhbXNQcm90b3R5cGUgPSBVUkxTZWFyY2hQYXJhbXNDb25zdHJ1Y3Rvci5wcm90b3R5cGU7XG5cbmRlZmluZUJ1aWx0SW5zKFVSTFNlYXJjaFBhcmFtc1Byb3RvdHlwZSwge1xuICAvLyBgVVJMU2VhcmNoUGFyYW1zLnByb3RvdHlwZS5hcHBlbmRgIG1ldGhvZFxuICAvLyBodHRwczovL3VybC5zcGVjLndoYXR3Zy5vcmcvI2RvbS11cmxzZWFyY2hwYXJhbXMtYXBwZW5kXG4gIGFwcGVuZDogZnVuY3Rpb24gYXBwZW5kKG5hbWUsIHZhbHVlKSB7XG4gICAgdmFyIHN0YXRlID0gZ2V0SW50ZXJuYWxQYXJhbXNTdGF0ZSh0aGlzKTtcbiAgICB2YWxpZGF0ZUFyZ3VtZW50c0xlbmd0aChhcmd1bWVudHMubGVuZ3RoLCAyKTtcbiAgICBwdXNoKHN0YXRlLmVudHJpZXMsIHsga2V5OiAkdG9TdHJpbmcobmFtZSksIHZhbHVlOiAkdG9TdHJpbmcodmFsdWUpIH0pO1xuICAgIGlmICghREVTQ1JJUFRPUlMpIHRoaXMubGVuZ3RoKys7XG4gICAgc3RhdGUudXBkYXRlVVJMKCk7XG4gIH0sXG4gIC8vIGBVUkxTZWFyY2hQYXJhbXMucHJvdG90eXBlLmRlbGV0ZWAgbWV0aG9kXG4gIC8vIGh0dHBzOi8vdXJsLnNwZWMud2hhdHdnLm9yZy8jZG9tLXVybHNlYXJjaHBhcmFtcy1kZWxldGVcbiAgJ2RlbGV0ZSc6IGZ1bmN0aW9uIChuYW1lIC8qICwgdmFsdWUgKi8pIHtcbiAgICB2YXIgc3RhdGUgPSBnZXRJbnRlcm5hbFBhcmFtc1N0YXRlKHRoaXMpO1xuICAgIHZhciBsZW5ndGggPSB2YWxpZGF0ZUFyZ3VtZW50c0xlbmd0aChhcmd1bWVudHMubGVuZ3RoLCAxKTtcbiAgICB2YXIgZW50cmllcyA9IHN0YXRlLmVudHJpZXM7XG4gICAgdmFyIGtleSA9ICR0b1N0cmluZyhuYW1lKTtcbiAgICB2YXIgJHZhbHVlID0gbGVuZ3RoIDwgMiA/IHVuZGVmaW5lZCA6IGFyZ3VtZW50c1sxXTtcbiAgICB2YXIgdmFsdWUgPSAkdmFsdWUgPT09IHVuZGVmaW5lZCA/ICR2YWx1ZSA6ICR0b1N0cmluZygkdmFsdWUpO1xuICAgIHZhciBpbmRleCA9IDA7XG4gICAgd2hpbGUgKGluZGV4IDwgZW50cmllcy5sZW5ndGgpIHtcbiAgICAgIHZhciBlbnRyeSA9IGVudHJpZXNbaW5kZXhdO1xuICAgICAgaWYgKGVudHJ5LmtleSA9PT0ga2V5ICYmICh2YWx1ZSA9PT0gdW5kZWZpbmVkIHx8IGVudHJ5LnZhbHVlID09PSB2YWx1ZSkpIHtcbiAgICAgICAgc3BsaWNlKGVudHJpZXMsIGluZGV4LCAxKTtcbiAgICAgICAgaWYgKHZhbHVlICE9PSB1bmRlZmluZWQpIGJyZWFrO1xuICAgICAgfSBlbHNlIGluZGV4Kys7XG4gICAgfVxuICAgIGlmICghREVTQ1JJUFRPUlMpIHRoaXMuc2l6ZSA9IGVudHJpZXMubGVuZ3RoO1xuICAgIHN0YXRlLnVwZGF0ZVVSTCgpO1xuICB9LFxuICAvLyBgVVJMU2VhcmNoUGFyYW1zLnByb3RvdHlwZS5nZXRgIG1ldGhvZFxuICAvLyBodHRwczovL3VybC5zcGVjLndoYXR3Zy5vcmcvI2RvbS11cmxzZWFyY2hwYXJhbXMtZ2V0XG4gIGdldDogZnVuY3Rpb24gZ2V0KG5hbWUpIHtcbiAgICB2YXIgZW50cmllcyA9IGdldEludGVybmFsUGFyYW1zU3RhdGUodGhpcykuZW50cmllcztcbiAgICB2YWxpZGF0ZUFyZ3VtZW50c0xlbmd0aChhcmd1bWVudHMubGVuZ3RoLCAxKTtcbiAgICB2YXIga2V5ID0gJHRvU3RyaW5nKG5hbWUpO1xuICAgIHZhciBpbmRleCA9IDA7XG4gICAgZm9yICg7IGluZGV4IDwgZW50cmllcy5sZW5ndGg7IGluZGV4KyspIHtcbiAgICAgIGlmIChlbnRyaWVzW2luZGV4XS5rZXkgPT09IGtleSkgcmV0dXJuIGVudHJpZXNbaW5kZXhdLnZhbHVlO1xuICAgIH1cbiAgICByZXR1cm4gbnVsbDtcbiAgfSxcbiAgLy8gYFVSTFNlYXJjaFBhcmFtcy5wcm90b3R5cGUuZ2V0QWxsYCBtZXRob2RcbiAgLy8gaHR0cHM6Ly91cmwuc3BlYy53aGF0d2cub3JnLyNkb20tdXJsc2VhcmNocGFyYW1zLWdldGFsbFxuICBnZXRBbGw6IGZ1bmN0aW9uIGdldEFsbChuYW1lKSB7XG4gICAgdmFyIGVudHJpZXMgPSBnZXRJbnRlcm5hbFBhcmFtc1N0YXRlKHRoaXMpLmVudHJpZXM7XG4gICAgdmFsaWRhdGVBcmd1bWVudHNMZW5ndGgoYXJndW1lbnRzLmxlbmd0aCwgMSk7XG4gICAgdmFyIGtleSA9ICR0b1N0cmluZyhuYW1lKTtcbiAgICB2YXIgcmVzdWx0ID0gW107XG4gICAgdmFyIGluZGV4ID0gMDtcbiAgICBmb3IgKDsgaW5kZXggPCBlbnRyaWVzLmxlbmd0aDsgaW5kZXgrKykge1xuICAgICAgaWYgKGVudHJpZXNbaW5kZXhdLmtleSA9PT0ga2V5KSBwdXNoKHJlc3VsdCwgZW50cmllc1tpbmRleF0udmFsdWUpO1xuICAgIH1cbiAgICByZXR1cm4gcmVzdWx0O1xuICB9LFxuICAvLyBgVVJMU2VhcmNoUGFyYW1zLnByb3RvdHlwZS5oYXNgIG1ldGhvZFxuICAvLyBodHRwczovL3VybC5zcGVjLndoYXR3Zy5vcmcvI2RvbS11cmxzZWFyY2hwYXJhbXMtaGFzXG4gIGhhczogZnVuY3Rpb24gaGFzKG5hbWUgLyogLCB2YWx1ZSAqLykge1xuICAgIHZhciBlbnRyaWVzID0gZ2V0SW50ZXJuYWxQYXJhbXNTdGF0ZSh0aGlzKS5lbnRyaWVzO1xuICAgIHZhciBsZW5ndGggPSB2YWxpZGF0ZUFyZ3VtZW50c0xlbmd0aChhcmd1bWVudHMubGVuZ3RoLCAxKTtcbiAgICB2YXIga2V5ID0gJHRvU3RyaW5nKG5hbWUpO1xuICAgIHZhciAkdmFsdWUgPSBsZW5ndGggPCAyID8gdW5kZWZpbmVkIDogYXJndW1lbnRzWzFdO1xuICAgIHZhciB2YWx1ZSA9ICR2YWx1ZSA9PT0gdW5kZWZpbmVkID8gJHZhbHVlIDogJHRvU3RyaW5nKCR2YWx1ZSk7XG4gICAgdmFyIGluZGV4ID0gMDtcbiAgICB3aGlsZSAoaW5kZXggPCBlbnRyaWVzLmxlbmd0aCkge1xuICAgICAgdmFyIGVudHJ5ID0gZW50cmllc1tpbmRleCsrXTtcbiAgICAgIGlmIChlbnRyeS5rZXkgPT09IGtleSAmJiAodmFsdWUgPT09IHVuZGVmaW5lZCB8fCBlbnRyeS52YWx1ZSA9PT0gdmFsdWUpKSByZXR1cm4gdHJ1ZTtcbiAgICB9XG4gICAgcmV0dXJuIGZhbHNlO1xuICB9LFxuICAvLyBgVVJMU2VhcmNoUGFyYW1zLnByb3RvdHlwZS5zZXRgIG1ldGhvZFxuICAvLyBodHRwczovL3VybC5zcGVjLndoYXR3Zy5vcmcvI2RvbS11cmxzZWFyY2hwYXJhbXMtc2V0XG4gIHNldDogZnVuY3Rpb24gc2V0KG5hbWUsIHZhbHVlKSB7XG4gICAgdmFyIHN0YXRlID0gZ2V0SW50ZXJuYWxQYXJhbXNTdGF0ZSh0aGlzKTtcbiAgICB2YWxpZGF0ZUFyZ3VtZW50c0xlbmd0aChhcmd1bWVudHMubGVuZ3RoLCAxKTtcbiAgICB2YXIgZW50cmllcyA9IHN0YXRlLmVudHJpZXM7XG4gICAgdmFyIGZvdW5kID0gZmFsc2U7XG4gICAgdmFyIGtleSA9ICR0b1N0cmluZyhuYW1lKTtcbiAgICB2YXIgdmFsID0gJHRvU3RyaW5nKHZhbHVlKTtcbiAgICB2YXIgaW5kZXggPSAwO1xuICAgIHZhciBlbnRyeTtcbiAgICBmb3IgKDsgaW5kZXggPCBlbnRyaWVzLmxlbmd0aDsgaW5kZXgrKykge1xuICAgICAgZW50cnkgPSBlbnRyaWVzW2luZGV4XTtcbiAgICAgIGlmIChlbnRyeS5rZXkgPT09IGtleSkge1xuICAgICAgICBpZiAoZm91bmQpIHNwbGljZShlbnRyaWVzLCBpbmRleC0tLCAxKTtcbiAgICAgICAgZWxzZSB7XG4gICAgICAgICAgZm91bmQgPSB0cnVlO1xuICAgICAgICAgIGVudHJ5LnZhbHVlID0gdmFsO1xuICAgICAgICB9XG4gICAgICB9XG4gICAgfVxuICAgIGlmICghZm91bmQpIHB1c2goZW50cmllcywgeyBrZXk6IGtleSwgdmFsdWU6IHZhbCB9KTtcbiAgICBpZiAoIURFU0NSSVBUT1JTKSB0aGlzLnNpemUgPSBlbnRyaWVzLmxlbmd0aDtcbiAgICBzdGF0ZS51cGRhdGVVUkwoKTtcbiAgfSxcbiAgLy8gYFVSTFNlYXJjaFBhcmFtcy5wcm90b3R5cGUuc29ydGAgbWV0aG9kXG4gIC8vIGh0dHBzOi8vdXJsLnNwZWMud2hhdHdnLm9yZy8jZG9tLXVybHNlYXJjaHBhcmFtcy1zb3J0XG4gIHNvcnQ6IGZ1bmN0aW9uIHNvcnQoKSB7XG4gICAgdmFyIHN0YXRlID0gZ2V0SW50ZXJuYWxQYXJhbXNTdGF0ZSh0aGlzKTtcbiAgICBhcnJheVNvcnQoc3RhdGUuZW50cmllcywgZnVuY3Rpb24gKGEsIGIpIHtcbiAgICAgIHJldHVybiBhLmtleSA+IGIua2V5ID8gMSA6IC0xO1xuICAgIH0pO1xuICAgIHN0YXRlLnVwZGF0ZVVSTCgpO1xuICB9LFxuICAvLyBgVVJMU2VhcmNoUGFyYW1zLnByb3RvdHlwZS5mb3JFYWNoYCBtZXRob2RcbiAgZm9yRWFjaDogZnVuY3Rpb24gZm9yRWFjaChjYWxsYmFjayAvKiAsIHRoaXNBcmcgKi8pIHtcbiAgICB2YXIgZW50cmllcyA9IGdldEludGVybmFsUGFyYW1zU3RhdGUodGhpcykuZW50cmllcztcbiAgICB2YXIgYm91bmRGdW5jdGlvbiA9IGJpbmQoY2FsbGJhY2ssIGFyZ3VtZW50cy5sZW5ndGggPiAxID8gYXJndW1lbnRzWzFdIDogdW5kZWZpbmVkKTtcbiAgICB2YXIgaW5kZXggPSAwO1xuICAgIHZhciBlbnRyeTtcbiAgICB3aGlsZSAoaW5kZXggPCBlbnRyaWVzLmxlbmd0aCkge1xuICAgICAgZW50cnkgPSBlbnRyaWVzW2luZGV4KytdO1xuICAgICAgYm91bmRGdW5jdGlvbihlbnRyeS52YWx1ZSwgZW50cnkua2V5LCB0aGlzKTtcbiAgICB9XG4gIH0sXG4gIC8vIGBVUkxTZWFyY2hQYXJhbXMucHJvdG90eXBlLmtleXNgIG1ldGhvZFxuICBrZXlzOiBmdW5jdGlvbiBrZXlzKCkge1xuICAgIHJldHVybiBuZXcgVVJMU2VhcmNoUGFyYW1zSXRlcmF0b3IodGhpcywgJ2tleXMnKTtcbiAgfSxcbiAgLy8gYFVSTFNlYXJjaFBhcmFtcy5wcm90b3R5cGUudmFsdWVzYCBtZXRob2RcbiAgdmFsdWVzOiBmdW5jdGlvbiB2YWx1ZXMoKSB7XG4gICAgcmV0dXJuIG5ldyBVUkxTZWFyY2hQYXJhbXNJdGVyYXRvcih0aGlzLCAndmFsdWVzJyk7XG4gIH0sXG4gIC8vIGBVUkxTZWFyY2hQYXJhbXMucHJvdG90eXBlLmVudHJpZXNgIG1ldGhvZFxuICBlbnRyaWVzOiBmdW5jdGlvbiBlbnRyaWVzKCkge1xuICAgIHJldHVybiBuZXcgVVJMU2VhcmNoUGFyYW1zSXRlcmF0b3IodGhpcywgJ2VudHJpZXMnKTtcbiAgfVxufSwgeyBlbnVtZXJhYmxlOiB0cnVlIH0pO1xuXG4vLyBgVVJMU2VhcmNoUGFyYW1zLnByb3RvdHlwZVtAQGl0ZXJhdG9yXWAgbWV0aG9kXG5kZWZpbmVCdWlsdEluKFVSTFNlYXJjaFBhcmFtc1Byb3RvdHlwZSwgSVRFUkFUT1IsIFVSTFNlYXJjaFBhcmFtc1Byb3RvdHlwZS5lbnRyaWVzLCB7IG5hbWU6ICdlbnRyaWVzJyB9KTtcblxuLy8gYFVSTFNlYXJjaFBhcmFtcy5wcm90b3R5cGUudG9TdHJpbmdgIG1ldGhvZFxuLy8gaHR0cHM6Ly91cmwuc3BlYy53aGF0d2cub3JnLyN1cmxzZWFyY2hwYXJhbXMtc3RyaW5naWZpY2F0aW9uLWJlaGF2aW9yXG5kZWZpbmVCdWlsdEluKFVSTFNlYXJjaFBhcmFtc1Byb3RvdHlwZSwgJ3RvU3RyaW5nJywgZnVuY3Rpb24gdG9TdHJpbmcoKSB7XG4gIHJldHVybiBnZXRJbnRlcm5hbFBhcmFtc1N0YXRlKHRoaXMpLnNlcmlhbGl6ZSgpO1xufSwgeyBlbnVtZXJhYmxlOiB0cnVlIH0pO1xuXG4vLyBgVVJMU2VhcmNoUGFyYW1zLnByb3RvdHlwZS5zaXplYCBnZXR0ZXJcbi8vIGh0dHBzOi8vZ2l0aHViLmNvbS93aGF0d2cvdXJsL3B1bGwvNzM0XG5pZiAoREVTQ1JJUFRPUlMpIGRlZmluZUJ1aWx0SW5BY2Nlc3NvcihVUkxTZWFyY2hQYXJhbXNQcm90b3R5cGUsICdzaXplJywge1xuICBnZXQ6IGZ1bmN0aW9uIHNpemUoKSB7XG4gICAgcmV0dXJuIGdldEludGVybmFsUGFyYW1zU3RhdGUodGhpcykuZW50cmllcy5sZW5ndGg7XG4gIH0sXG4gIGNvbmZpZ3VyYWJsZTogdHJ1ZSxcbiAgZW51bWVyYWJsZTogdHJ1ZVxufSk7XG5cbnNldFRvU3RyaW5nVGFnKFVSTFNlYXJjaFBhcmFtc0NvbnN0cnVjdG9yLCBVUkxfU0VBUkNIX1BBUkFNUyk7XG5cbiQoeyBnbG9iYWw6IHRydWUsIGNvbnN0cnVjdG9yOiB0cnVlLCBmb3JjZWQ6ICFVU0VfTkFUSVZFX1VSTCB9LCB7XG4gIFVSTFNlYXJjaFBhcmFtczogVVJMU2VhcmNoUGFyYW1zQ29uc3RydWN0b3Jcbn0pO1xuXG4vLyBXcmFwIGBmZXRjaGAgYW5kIGBSZXF1ZXN0YCBmb3IgY29ycmVjdCB3b3JrIHdpdGggcG9seWZpbGxlZCBgVVJMU2VhcmNoUGFyYW1zYFxuaWYgKCFVU0VfTkFUSVZFX1VSTCAmJiBpc0NhbGxhYmxlKEhlYWRlcnMpKSB7XG4gIHZhciBoZWFkZXJzSGFzID0gdW5jdXJyeVRoaXMoSGVhZGVyc1Byb3RvdHlwZS5oYXMpO1xuICB2YXIgaGVhZGVyc1NldCA9IHVuY3VycnlUaGlzKEhlYWRlcnNQcm90b3R5cGUuc2V0KTtcblxuICB2YXIgd3JhcFJlcXVlc3RPcHRpb25zID0gZnVuY3Rpb24gKGluaXQpIHtcbiAgICBpZiAoaXNPYmplY3QoaW5pdCkpIHtcbiAgICAgIHZhciBib2R5ID0gaW5pdC5ib2R5O1xuICAgICAgdmFyIGhlYWRlcnM7XG4gICAgICBpZiAoY2xhc3NvZihib2R5KSA9PT0gVVJMX1NFQVJDSF9QQVJBTVMpIHtcbiAgICAgICAgaGVhZGVycyA9IGluaXQuaGVhZGVycyA/IG5ldyBIZWFkZXJzKGluaXQuaGVhZGVycykgOiBuZXcgSGVhZGVycygpO1xuICAgICAgICBpZiAoIWhlYWRlcnNIYXMoaGVhZGVycywgJ2NvbnRlbnQtdHlwZScpKSB7XG4gICAgICAgICAgaGVhZGVyc1NldChoZWFkZXJzLCAnY29udGVudC10eXBlJywgJ2FwcGxpY2F0aW9uL3gtd3d3LWZvcm0tdXJsZW5jb2RlZDtjaGFyc2V0PVVURi04Jyk7XG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuIGNyZWF0ZShpbml0LCB7XG4gICAgICAgICAgYm9keTogY3JlYXRlUHJvcGVydHlEZXNjcmlwdG9yKDAsICR0b1N0cmluZyhib2R5KSksXG4gICAgICAgICAgaGVhZGVyczogY3JlYXRlUHJvcGVydHlEZXNjcmlwdG9yKDAsIGhlYWRlcnMpXG4gICAgICAgIH0pO1xuICAgICAgfVxuICAgIH0gcmV0dXJuIGluaXQ7XG4gIH07XG5cbiAgaWYgKGlzQ2FsbGFibGUobmF0aXZlRmV0Y2gpKSB7XG4gICAgJCh7IGdsb2JhbDogdHJ1ZSwgZW51bWVyYWJsZTogdHJ1ZSwgZG9udENhbGxHZXRTZXQ6IHRydWUsIGZvcmNlZDogdHJ1ZSB9LCB7XG4gICAgICBmZXRjaDogZnVuY3Rpb24gZmV0Y2goaW5wdXQgLyogLCBpbml0ICovKSB7XG4gICAgICAgIHJldHVybiBuYXRpdmVGZXRjaChpbnB1dCwgYXJndW1lbnRzLmxlbmd0aCA+IDEgPyB3cmFwUmVxdWVzdE9wdGlvbnMoYXJndW1lbnRzWzFdKSA6IHt9KTtcbiAgICAgIH1cbiAgICB9KTtcbiAgfVxuXG4gIGlmIChpc0NhbGxhYmxlKE5hdGl2ZVJlcXVlc3QpKSB7XG4gICAgdmFyIFJlcXVlc3RDb25zdHJ1Y3RvciA9IGZ1bmN0aW9uIFJlcXVlc3QoaW5wdXQgLyogLCBpbml0ICovKSB7XG4gICAgICBhbkluc3RhbmNlKHRoaXMsIFJlcXVlc3RQcm90b3R5cGUpO1xuICAgICAgcmV0dXJuIG5ldyBOYXRpdmVSZXF1ZXN0KGlucHV0LCBhcmd1bWVudHMubGVuZ3RoID4gMSA/IHdyYXBSZXF1ZXN0T3B0aW9ucyhhcmd1bWVudHNbMV0pIDoge30pO1xuICAgIH07XG5cbiAgICBSZXF1ZXN0UHJvdG90eXBlLmNvbnN0cnVjdG9yID0gUmVxdWVzdENvbnN0cnVjdG9yO1xuICAgIFJlcXVlc3RDb25zdHJ1Y3Rvci5wcm90b3R5cGUgPSBSZXF1ZXN0UHJvdG90eXBlO1xuXG4gICAgJCh7IGdsb2JhbDogdHJ1ZSwgY29uc3RydWN0b3I6IHRydWUsIGRvbnRDYWxsR2V0U2V0OiB0cnVlLCBmb3JjZWQ6IHRydWUgfSwge1xuICAgICAgUmVxdWVzdDogUmVxdWVzdENvbnN0cnVjdG9yXG4gICAgfSk7XG4gIH1cbn1cblxubW9kdWxlLmV4cG9ydHMgPSB7XG4gIFVSTFNlYXJjaFBhcmFtczogVVJMU2VhcmNoUGFyYW1zQ29uc3RydWN0b3IsXG4gIGdldFN0YXRlOiBnZXRJbnRlcm5hbFBhcmFtc1N0YXRlXG59O1xuIiwiJ3VzZSBzdHJpY3QnO1xuLy8gVE9ETzogUmVtb3ZlIHRoaXMgbW9kdWxlIGZyb20gYGNvcmUtanNANGAgc2luY2UgaXQncyByZXBsYWNlZCB0byBtb2R1bGUgYmVsb3dcbnJlcXVpcmUoJy4uL21vZHVsZXMvd2ViLnVybC1zZWFyY2gtcGFyYW1zLmNvbnN0cnVjdG9yJyk7XG4iLCIndXNlIHN0cmljdCc7XG4vLyBUT0RPOiBpbiBjb3JlLWpzQDQsIG1vdmUgL21vZHVsZXMvIGRlcGVuZGVuY2llcyB0byBwdWJsaWMgZW50cmllcyBmb3IgYmV0dGVyIG9wdGltaXphdGlvbiBieSB0b29scyBsaWtlIGBwcmVzZXQtZW52YFxucmVxdWlyZSgnLi4vbW9kdWxlcy9lcy5zdHJpbmcuaXRlcmF0b3InKTtcbnZhciAkID0gcmVxdWlyZSgnLi4vaW50ZXJuYWxzL2V4cG9ydCcpO1xudmFyIERFU0NSSVBUT1JTID0gcmVxdWlyZSgnLi4vaW50ZXJuYWxzL2Rlc2NyaXB0b3JzJyk7XG52YXIgVVNFX05BVElWRV9VUkwgPSByZXF1aXJlKCcuLi9pbnRlcm5hbHMvdXJsLWNvbnN0cnVjdG9yLWRldGVjdGlvbicpO1xudmFyIGdsb2JhbCA9IHJlcXVpcmUoJy4uL2ludGVybmFscy9nbG9iYWwnKTtcbnZhciBiaW5kID0gcmVxdWlyZSgnLi4vaW50ZXJuYWxzL2Z1bmN0aW9uLWJpbmQtY29udGV4dCcpO1xudmFyIHVuY3VycnlUaGlzID0gcmVxdWlyZSgnLi4vaW50ZXJuYWxzL2Z1bmN0aW9uLXVuY3VycnktdGhpcycpO1xudmFyIGRlZmluZUJ1aWx0SW4gPSByZXF1aXJlKCcuLi9pbnRlcm5hbHMvZGVmaW5lLWJ1aWx0LWluJyk7XG52YXIgZGVmaW5lQnVpbHRJbkFjY2Vzc29yID0gcmVxdWlyZSgnLi4vaW50ZXJuYWxzL2RlZmluZS1idWlsdC1pbi1hY2Nlc3NvcicpO1xudmFyIGFuSW5zdGFuY2UgPSByZXF1aXJlKCcuLi9pbnRlcm5hbHMvYW4taW5zdGFuY2UnKTtcbnZhciBoYXNPd24gPSByZXF1aXJlKCcuLi9pbnRlcm5hbHMvaGFzLW93bi1wcm9wZXJ0eScpO1xudmFyIGFzc2lnbiA9IHJlcXVpcmUoJy4uL2ludGVybmFscy9vYmplY3QtYXNzaWduJyk7XG52YXIgYXJyYXlGcm9tID0gcmVxdWlyZSgnLi4vaW50ZXJuYWxzL2FycmF5LWZyb20nKTtcbnZhciBhcnJheVNsaWNlID0gcmVxdWlyZSgnLi4vaW50ZXJuYWxzL2FycmF5LXNsaWNlJyk7XG52YXIgY29kZUF0ID0gcmVxdWlyZSgnLi4vaW50ZXJuYWxzL3N0cmluZy1tdWx0aWJ5dGUnKS5jb2RlQXQ7XG52YXIgdG9BU0NJSSA9IHJlcXVpcmUoJy4uL2ludGVybmFscy9zdHJpbmctcHVueWNvZGUtdG8tYXNjaWknKTtcbnZhciAkdG9TdHJpbmcgPSByZXF1aXJlKCcuLi9pbnRlcm5hbHMvdG8tc3RyaW5nJyk7XG52YXIgc2V0VG9TdHJpbmdUYWcgPSByZXF1aXJlKCcuLi9pbnRlcm5hbHMvc2V0LXRvLXN0cmluZy10YWcnKTtcbnZhciB2YWxpZGF0ZUFyZ3VtZW50c0xlbmd0aCA9IHJlcXVpcmUoJy4uL2ludGVybmFscy92YWxpZGF0ZS1hcmd1bWVudHMtbGVuZ3RoJyk7XG52YXIgVVJMU2VhcmNoUGFyYW1zTW9kdWxlID0gcmVxdWlyZSgnLi4vbW9kdWxlcy93ZWIudXJsLXNlYXJjaC1wYXJhbXMuY29uc3RydWN0b3InKTtcbnZhciBJbnRlcm5hbFN0YXRlTW9kdWxlID0gcmVxdWlyZSgnLi4vaW50ZXJuYWxzL2ludGVybmFsLXN0YXRlJyk7XG5cbnZhciBzZXRJbnRlcm5hbFN0YXRlID0gSW50ZXJuYWxTdGF0ZU1vZHVsZS5zZXQ7XG52YXIgZ2V0SW50ZXJuYWxVUkxTdGF0ZSA9IEludGVybmFsU3RhdGVNb2R1bGUuZ2V0dGVyRm9yKCdVUkwnKTtcbnZhciBVUkxTZWFyY2hQYXJhbXMgPSBVUkxTZWFyY2hQYXJhbXNNb2R1bGUuVVJMU2VhcmNoUGFyYW1zO1xudmFyIGdldEludGVybmFsU2VhcmNoUGFyYW1zU3RhdGUgPSBVUkxTZWFyY2hQYXJhbXNNb2R1bGUuZ2V0U3RhdGU7XG5cbnZhciBOYXRpdmVVUkwgPSBnbG9iYWwuVVJMO1xudmFyIFR5cGVFcnJvciA9IGdsb2JhbC5UeXBlRXJyb3I7XG52YXIgcGFyc2VJbnQgPSBnbG9iYWwucGFyc2VJbnQ7XG52YXIgZmxvb3IgPSBNYXRoLmZsb29yO1xudmFyIHBvdyA9IE1hdGgucG93O1xudmFyIGNoYXJBdCA9IHVuY3VycnlUaGlzKCcnLmNoYXJBdCk7XG52YXIgZXhlYyA9IHVuY3VycnlUaGlzKC8uLy5leGVjKTtcbnZhciBqb2luID0gdW5jdXJyeVRoaXMoW10uam9pbik7XG52YXIgbnVtYmVyVG9TdHJpbmcgPSB1bmN1cnJ5VGhpcygxLjAudG9TdHJpbmcpO1xudmFyIHBvcCA9IHVuY3VycnlUaGlzKFtdLnBvcCk7XG52YXIgcHVzaCA9IHVuY3VycnlUaGlzKFtdLnB1c2gpO1xudmFyIHJlcGxhY2UgPSB1bmN1cnJ5VGhpcygnJy5yZXBsYWNlKTtcbnZhciBzaGlmdCA9IHVuY3VycnlUaGlzKFtdLnNoaWZ0KTtcbnZhciBzcGxpdCA9IHVuY3VycnlUaGlzKCcnLnNwbGl0KTtcbnZhciBzdHJpbmdTbGljZSA9IHVuY3VycnlUaGlzKCcnLnNsaWNlKTtcbnZhciB0b0xvd2VyQ2FzZSA9IHVuY3VycnlUaGlzKCcnLnRvTG93ZXJDYXNlKTtcbnZhciB1bnNoaWZ0ID0gdW5jdXJyeVRoaXMoW10udW5zaGlmdCk7XG5cbnZhciBJTlZBTElEX0FVVEhPUklUWSA9ICdJbnZhbGlkIGF1dGhvcml0eSc7XG52YXIgSU5WQUxJRF9TQ0hFTUUgPSAnSW52YWxpZCBzY2hlbWUnO1xudmFyIElOVkFMSURfSE9TVCA9ICdJbnZhbGlkIGhvc3QnO1xudmFyIElOVkFMSURfUE9SVCA9ICdJbnZhbGlkIHBvcnQnO1xuXG52YXIgQUxQSEEgPSAvW2Etel0vaTtcbi8vIGVzbGludC1kaXNhYmxlLW5leHQtbGluZSByZWdleHAvbm8tb2JzY3VyZS1yYW5nZSAtLSBzYWZlXG52YXIgQUxQSEFOVU1FUklDID0gL1tcXGQrLS5hLXpdL2k7XG52YXIgRElHSVQgPSAvXFxkLztcbnZhciBIRVhfU1RBUlQgPSAvXjB4L2k7XG52YXIgT0NUID0gL15bMC03XSskLztcbnZhciBERUMgPSAvXlxcZCskLztcbnZhciBIRVggPSAvXltcXGRhLWZdKyQvaTtcbi8qIGVzbGludC1kaXNhYmxlIHJlZ2V4cC9uby1jb250cm9sLWNoYXJhY3RlciAtLSBzYWZlICovXG52YXIgRk9SQklEREVOX0hPU1RfQ09ERV9QT0lOVCA9IC9bXFwwXFx0XFxuXFxyICMlLzo8Pj9AW1xcXFxcXF1efF0vO1xudmFyIEZPUkJJRERFTl9IT1NUX0NPREVfUE9JTlRfRVhDTFVESU5HX1BFUkNFTlQgPSAvW1xcMFxcdFxcblxcciAjLzo8Pj9AW1xcXFxcXF1efF0vO1xudmFyIExFQURJTkdfQzBfQ09OVFJPTF9PUl9TUEFDRSA9IC9eW1xcdTAwMDAtXFx1MDAyMF0rLztcbnZhciBUUkFJTElOR19DMF9DT05UUk9MX09SX1NQQUNFID0gLyhefFteXFx1MDAwMC1cXHUwMDIwXSlbXFx1MDAwMC1cXHUwMDIwXSskLztcbnZhciBUQUJfQU5EX05FV19MSU5FID0gL1tcXHRcXG5cXHJdL2c7XG4vKiBlc2xpbnQtZW5hYmxlIHJlZ2V4cC9uby1jb250cm9sLWNoYXJhY3RlciAtLSBzYWZlICovXG52YXIgRU9GO1xuXG4vLyBodHRwczovL3VybC5zcGVjLndoYXR3Zy5vcmcvI2lwdjQtbnVtYmVyLXBhcnNlclxudmFyIHBhcnNlSVB2NCA9IGZ1bmN0aW9uIChpbnB1dCkge1xuICB2YXIgcGFydHMgPSBzcGxpdChpbnB1dCwgJy4nKTtcbiAgdmFyIHBhcnRzTGVuZ3RoLCBudW1iZXJzLCBpbmRleCwgcGFydCwgcmFkaXgsIG51bWJlciwgaXB2NDtcbiAgaWYgKHBhcnRzLmxlbmd0aCAmJiBwYXJ0c1twYXJ0cy5sZW5ndGggLSAxXSA9PT0gJycpIHtcbiAgICBwYXJ0cy5sZW5ndGgtLTtcbiAgfVxuICBwYXJ0c0xlbmd0aCA9IHBhcnRzLmxlbmd0aDtcbiAgaWYgKHBhcnRzTGVuZ3RoID4gNCkgcmV0dXJuIGlucHV0O1xuICBudW1iZXJzID0gW107XG4gIGZvciAoaW5kZXggPSAwOyBpbmRleCA8IHBhcnRzTGVuZ3RoOyBpbmRleCsrKSB7XG4gICAgcGFydCA9IHBhcnRzW2luZGV4XTtcbiAgICBpZiAocGFydCA9PT0gJycpIHJldHVybiBpbnB1dDtcbiAgICByYWRpeCA9IDEwO1xuICAgIGlmIChwYXJ0Lmxlbmd0aCA+IDEgJiYgY2hhckF0KHBhcnQsIDApID09PSAnMCcpIHtcbiAgICAgIHJhZGl4ID0gZXhlYyhIRVhfU1RBUlQsIHBhcnQpID8gMTYgOiA4O1xuICAgICAgcGFydCA9IHN0cmluZ1NsaWNlKHBhcnQsIHJhZGl4ID09PSA4ID8gMSA6IDIpO1xuICAgIH1cbiAgICBpZiAocGFydCA9PT0gJycpIHtcbiAgICAgIG51bWJlciA9IDA7XG4gICAgfSBlbHNlIHtcbiAgICAgIGlmICghZXhlYyhyYWRpeCA9PT0gMTAgPyBERUMgOiByYWRpeCA9PT0gOCA/IE9DVCA6IEhFWCwgcGFydCkpIHJldHVybiBpbnB1dDtcbiAgICAgIG51bWJlciA9IHBhcnNlSW50KHBhcnQsIHJhZGl4KTtcbiAgICB9XG4gICAgcHVzaChudW1iZXJzLCBudW1iZXIpO1xuICB9XG4gIGZvciAoaW5kZXggPSAwOyBpbmRleCA8IHBhcnRzTGVuZ3RoOyBpbmRleCsrKSB7XG4gICAgbnVtYmVyID0gbnVtYmVyc1tpbmRleF07XG4gICAgaWYgKGluZGV4ID09PSBwYXJ0c0xlbmd0aCAtIDEpIHtcbiAgICAgIGlmIChudW1iZXIgPj0gcG93KDI1NiwgNSAtIHBhcnRzTGVuZ3RoKSkgcmV0dXJuIG51bGw7XG4gICAgfSBlbHNlIGlmIChudW1iZXIgPiAyNTUpIHJldHVybiBudWxsO1xuICB9XG4gIGlwdjQgPSBwb3AobnVtYmVycyk7XG4gIGZvciAoaW5kZXggPSAwOyBpbmRleCA8IG51bWJlcnMubGVuZ3RoOyBpbmRleCsrKSB7XG4gICAgaXB2NCArPSBudW1iZXJzW2luZGV4XSAqIHBvdygyNTYsIDMgLSBpbmRleCk7XG4gIH1cbiAgcmV0dXJuIGlwdjQ7XG59O1xuXG4vLyBodHRwczovL3VybC5zcGVjLndoYXR3Zy5vcmcvI2NvbmNlcHQtaXB2Ni1wYXJzZXJcbi8vIGVzbGludC1kaXNhYmxlLW5leHQtbGluZSBtYXgtc3RhdGVtZW50cyAtLSBUT0RPXG52YXIgcGFyc2VJUHY2ID0gZnVuY3Rpb24gKGlucHV0KSB7XG4gIHZhciBhZGRyZXNzID0gWzAsIDAsIDAsIDAsIDAsIDAsIDAsIDBdO1xuICB2YXIgcGllY2VJbmRleCA9IDA7XG4gIHZhciBjb21wcmVzcyA9IG51bGw7XG4gIHZhciBwb2ludGVyID0gMDtcbiAgdmFyIHZhbHVlLCBsZW5ndGgsIG51bWJlcnNTZWVuLCBpcHY0UGllY2UsIG51bWJlciwgc3dhcHMsIHN3YXA7XG5cbiAgdmFyIGNociA9IGZ1bmN0aW9uICgpIHtcbiAgICByZXR1cm4gY2hhckF0KGlucHV0LCBwb2ludGVyKTtcbiAgfTtcblxuICBpZiAoY2hyKCkgPT09ICc6Jykge1xuICAgIGlmIChjaGFyQXQoaW5wdXQsIDEpICE9PSAnOicpIHJldHVybjtcbiAgICBwb2ludGVyICs9IDI7XG4gICAgcGllY2VJbmRleCsrO1xuICAgIGNvbXByZXNzID0gcGllY2VJbmRleDtcbiAgfVxuICB3aGlsZSAoY2hyKCkpIHtcbiAgICBpZiAocGllY2VJbmRleCA9PT0gOCkgcmV0dXJuO1xuICAgIGlmIChjaHIoKSA9PT0gJzonKSB7XG4gICAgICBpZiAoY29tcHJlc3MgIT09IG51bGwpIHJldHVybjtcbiAgICAgIHBvaW50ZXIrKztcbiAgICAgIHBpZWNlSW5kZXgrKztcbiAgICAgIGNvbXByZXNzID0gcGllY2VJbmRleDtcbiAgICAgIGNvbnRpbnVlO1xuICAgIH1cbiAgICB2YWx1ZSA9IGxlbmd0aCA9IDA7XG4gICAgd2hpbGUgKGxlbmd0aCA8IDQgJiYgZXhlYyhIRVgsIGNocigpKSkge1xuICAgICAgdmFsdWUgPSB2YWx1ZSAqIDE2ICsgcGFyc2VJbnQoY2hyKCksIDE2KTtcbiAgICAgIHBvaW50ZXIrKztcbiAgICAgIGxlbmd0aCsrO1xuICAgIH1cbiAgICBpZiAoY2hyKCkgPT09ICcuJykge1xuICAgICAgaWYgKGxlbmd0aCA9PT0gMCkgcmV0dXJuO1xuICAgICAgcG9pbnRlciAtPSBsZW5ndGg7XG4gICAgICBpZiAocGllY2VJbmRleCA+IDYpIHJldHVybjtcbiAgICAgIG51bWJlcnNTZWVuID0gMDtcbiAgICAgIHdoaWxlIChjaHIoKSkge1xuICAgICAgICBpcHY0UGllY2UgPSBudWxsO1xuICAgICAgICBpZiAobnVtYmVyc1NlZW4gPiAwKSB7XG4gICAgICAgICAgaWYgKGNocigpID09PSAnLicgJiYgbnVtYmVyc1NlZW4gPCA0KSBwb2ludGVyKys7XG4gICAgICAgICAgZWxzZSByZXR1cm47XG4gICAgICAgIH1cbiAgICAgICAgaWYgKCFleGVjKERJR0lULCBjaHIoKSkpIHJldHVybjtcbiAgICAgICAgd2hpbGUgKGV4ZWMoRElHSVQsIGNocigpKSkge1xuICAgICAgICAgIG51bWJlciA9IHBhcnNlSW50KGNocigpLCAxMCk7XG4gICAgICAgICAgaWYgKGlwdjRQaWVjZSA9PT0gbnVsbCkgaXB2NFBpZWNlID0gbnVtYmVyO1xuICAgICAgICAgIGVsc2UgaWYgKGlwdjRQaWVjZSA9PT0gMCkgcmV0dXJuO1xuICAgICAgICAgIGVsc2UgaXB2NFBpZWNlID0gaXB2NFBpZWNlICogMTAgKyBudW1iZXI7XG4gICAgICAgICAgaWYgKGlwdjRQaWVjZSA+IDI1NSkgcmV0dXJuO1xuICAgICAgICAgIHBvaW50ZXIrKztcbiAgICAgICAgfVxuICAgICAgICBhZGRyZXNzW3BpZWNlSW5kZXhdID0gYWRkcmVzc1twaWVjZUluZGV4XSAqIDI1NiArIGlwdjRQaWVjZTtcbiAgICAgICAgbnVtYmVyc1NlZW4rKztcbiAgICAgICAgaWYgKG51bWJlcnNTZWVuID09PSAyIHx8IG51bWJlcnNTZWVuID09PSA0KSBwaWVjZUluZGV4Kys7XG4gICAgICB9XG4gICAgICBpZiAobnVtYmVyc1NlZW4gIT09IDQpIHJldHVybjtcbiAgICAgIGJyZWFrO1xuICAgIH0gZWxzZSBpZiAoY2hyKCkgPT09ICc6Jykge1xuICAgICAgcG9pbnRlcisrO1xuICAgICAgaWYgKCFjaHIoKSkgcmV0dXJuO1xuICAgIH0gZWxzZSBpZiAoY2hyKCkpIHJldHVybjtcbiAgICBhZGRyZXNzW3BpZWNlSW5kZXgrK10gPSB2YWx1ZTtcbiAgfVxuICBpZiAoY29tcHJlc3MgIT09IG51bGwpIHtcbiAgICBzd2FwcyA9IHBpZWNlSW5kZXggLSBjb21wcmVzcztcbiAgICBwaWVjZUluZGV4ID0gNztcbiAgICB3aGlsZSAocGllY2VJbmRleCAhPT0gMCAmJiBzd2FwcyA+IDApIHtcbiAgICAgIHN3YXAgPSBhZGRyZXNzW3BpZWNlSW5kZXhdO1xuICAgICAgYWRkcmVzc1twaWVjZUluZGV4LS1dID0gYWRkcmVzc1tjb21wcmVzcyArIHN3YXBzIC0gMV07XG4gICAgICBhZGRyZXNzW2NvbXByZXNzICsgLS1zd2Fwc10gPSBzd2FwO1xuICAgIH1cbiAgfSBlbHNlIGlmIChwaWVjZUluZGV4ICE9PSA4KSByZXR1cm47XG4gIHJldHVybiBhZGRyZXNzO1xufTtcblxudmFyIGZpbmRMb25nZXN0WmVyb1NlcXVlbmNlID0gZnVuY3Rpb24gKGlwdjYpIHtcbiAgdmFyIG1heEluZGV4ID0gbnVsbDtcbiAgdmFyIG1heExlbmd0aCA9IDE7XG4gIHZhciBjdXJyU3RhcnQgPSBudWxsO1xuICB2YXIgY3Vyckxlbmd0aCA9IDA7XG4gIHZhciBpbmRleCA9IDA7XG4gIGZvciAoOyBpbmRleCA8IDg7IGluZGV4KyspIHtcbiAgICBpZiAoaXB2NltpbmRleF0gIT09IDApIHtcbiAgICAgIGlmIChjdXJyTGVuZ3RoID4gbWF4TGVuZ3RoKSB7XG4gICAgICAgIG1heEluZGV4ID0gY3VyclN0YXJ0O1xuICAgICAgICBtYXhMZW5ndGggPSBjdXJyTGVuZ3RoO1xuICAgICAgfVxuICAgICAgY3VyclN0YXJ0ID0gbnVsbDtcbiAgICAgIGN1cnJMZW5ndGggPSAwO1xuICAgIH0gZWxzZSB7XG4gICAgICBpZiAoY3VyclN0YXJ0ID09PSBudWxsKSBjdXJyU3RhcnQgPSBpbmRleDtcbiAgICAgICsrY3Vyckxlbmd0aDtcbiAgICB9XG4gIH1cbiAgaWYgKGN1cnJMZW5ndGggPiBtYXhMZW5ndGgpIHtcbiAgICBtYXhJbmRleCA9IGN1cnJTdGFydDtcbiAgICBtYXhMZW5ndGggPSBjdXJyTGVuZ3RoO1xuICB9XG4gIHJldHVybiBtYXhJbmRleDtcbn07XG5cbi8vIGh0dHBzOi8vdXJsLnNwZWMud2hhdHdnLm9yZy8jaG9zdC1zZXJpYWxpemluZ1xudmFyIHNlcmlhbGl6ZUhvc3QgPSBmdW5jdGlvbiAoaG9zdCkge1xuICB2YXIgcmVzdWx0LCBpbmRleCwgY29tcHJlc3MsIGlnbm9yZTA7XG4gIC8vIGlwdjRcbiAgaWYgKHR5cGVvZiBob3N0ID09ICdudW1iZXInKSB7XG4gICAgcmVzdWx0ID0gW107XG4gICAgZm9yIChpbmRleCA9IDA7IGluZGV4IDwgNDsgaW5kZXgrKykge1xuICAgICAgdW5zaGlmdChyZXN1bHQsIGhvc3QgJSAyNTYpO1xuICAgICAgaG9zdCA9IGZsb29yKGhvc3QgLyAyNTYpO1xuICAgIH0gcmV0dXJuIGpvaW4ocmVzdWx0LCAnLicpO1xuICAvLyBpcHY2XG4gIH0gZWxzZSBpZiAodHlwZW9mIGhvc3QgPT0gJ29iamVjdCcpIHtcbiAgICByZXN1bHQgPSAnJztcbiAgICBjb21wcmVzcyA9IGZpbmRMb25nZXN0WmVyb1NlcXVlbmNlKGhvc3QpO1xuICAgIGZvciAoaW5kZXggPSAwOyBpbmRleCA8IDg7IGluZGV4KyspIHtcbiAgICAgIGlmIChpZ25vcmUwICYmIGhvc3RbaW5kZXhdID09PSAwKSBjb250aW51ZTtcbiAgICAgIGlmIChpZ25vcmUwKSBpZ25vcmUwID0gZmFsc2U7XG4gICAgICBpZiAoY29tcHJlc3MgPT09IGluZGV4KSB7XG4gICAgICAgIHJlc3VsdCArPSBpbmRleCA/ICc6JyA6ICc6Oic7XG4gICAgICAgIGlnbm9yZTAgPSB0cnVlO1xuICAgICAgfSBlbHNlIHtcbiAgICAgICAgcmVzdWx0ICs9IG51bWJlclRvU3RyaW5nKGhvc3RbaW5kZXhdLCAxNik7XG4gICAgICAgIGlmIChpbmRleCA8IDcpIHJlc3VsdCArPSAnOic7XG4gICAgICB9XG4gICAgfVxuICAgIHJldHVybiAnWycgKyByZXN1bHQgKyAnXSc7XG4gIH0gcmV0dXJuIGhvc3Q7XG59O1xuXG52YXIgQzBDb250cm9sUGVyY2VudEVuY29kZVNldCA9IHt9O1xudmFyIGZyYWdtZW50UGVyY2VudEVuY29kZVNldCA9IGFzc2lnbih7fSwgQzBDb250cm9sUGVyY2VudEVuY29kZVNldCwge1xuICAnICc6IDEsICdcIic6IDEsICc8JzogMSwgJz4nOiAxLCAnYCc6IDFcbn0pO1xudmFyIHBhdGhQZXJjZW50RW5jb2RlU2V0ID0gYXNzaWduKHt9LCBmcmFnbWVudFBlcmNlbnRFbmNvZGVTZXQsIHtcbiAgJyMnOiAxLCAnPyc6IDEsICd7JzogMSwgJ30nOiAxXG59KTtcbnZhciB1c2VyaW5mb1BlcmNlbnRFbmNvZGVTZXQgPSBhc3NpZ24oe30sIHBhdGhQZXJjZW50RW5jb2RlU2V0LCB7XG4gICcvJzogMSwgJzonOiAxLCAnOyc6IDEsICc9JzogMSwgJ0AnOiAxLCAnWyc6IDEsICdcXFxcJzogMSwgJ10nOiAxLCAnXic6IDEsICd8JzogMVxufSk7XG5cbnZhciBwZXJjZW50RW5jb2RlID0gZnVuY3Rpb24gKGNociwgc2V0KSB7XG4gIHZhciBjb2RlID0gY29kZUF0KGNociwgMCk7XG4gIHJldHVybiBjb2RlID4gMHgyMCAmJiBjb2RlIDwgMHg3RiAmJiAhaGFzT3duKHNldCwgY2hyKSA/IGNociA6IGVuY29kZVVSSUNvbXBvbmVudChjaHIpO1xufTtcblxuLy8gaHR0cHM6Ly91cmwuc3BlYy53aGF0d2cub3JnLyNzcGVjaWFsLXNjaGVtZVxudmFyIHNwZWNpYWxTY2hlbWVzID0ge1xuICBmdHA6IDIxLFxuICBmaWxlOiBudWxsLFxuICBodHRwOiA4MCxcbiAgaHR0cHM6IDQ0MyxcbiAgd3M6IDgwLFxuICB3c3M6IDQ0M1xufTtcblxuLy8gaHR0cHM6Ly91cmwuc3BlYy53aGF0d2cub3JnLyN3aW5kb3dzLWRyaXZlLWxldHRlclxudmFyIGlzV2luZG93c0RyaXZlTGV0dGVyID0gZnVuY3Rpb24gKHN0cmluZywgbm9ybWFsaXplZCkge1xuICB2YXIgc2Vjb25kO1xuICByZXR1cm4gc3RyaW5nLmxlbmd0aCA9PT0gMiAmJiBleGVjKEFMUEhBLCBjaGFyQXQoc3RyaW5nLCAwKSlcbiAgICAmJiAoKHNlY29uZCA9IGNoYXJBdChzdHJpbmcsIDEpKSA9PT0gJzonIHx8ICghbm9ybWFsaXplZCAmJiBzZWNvbmQgPT09ICd8JykpO1xufTtcblxuLy8gaHR0cHM6Ly91cmwuc3BlYy53aGF0d2cub3JnLyNzdGFydC13aXRoLWEtd2luZG93cy1kcml2ZS1sZXR0ZXJcbnZhciBzdGFydHNXaXRoV2luZG93c0RyaXZlTGV0dGVyID0gZnVuY3Rpb24gKHN0cmluZykge1xuICB2YXIgdGhpcmQ7XG4gIHJldHVybiBzdHJpbmcubGVuZ3RoID4gMSAmJiBpc1dpbmRvd3NEcml2ZUxldHRlcihzdHJpbmdTbGljZShzdHJpbmcsIDAsIDIpKSAmJiAoXG4gICAgc3RyaW5nLmxlbmd0aCA9PT0gMiB8fFxuICAgICgodGhpcmQgPSBjaGFyQXQoc3RyaW5nLCAyKSkgPT09ICcvJyB8fCB0aGlyZCA9PT0gJ1xcXFwnIHx8IHRoaXJkID09PSAnPycgfHwgdGhpcmQgPT09ICcjJylcbiAgKTtcbn07XG5cbi8vIGh0dHBzOi8vdXJsLnNwZWMud2hhdHdnLm9yZy8jc2luZ2xlLWRvdC1wYXRoLXNlZ21lbnRcbnZhciBpc1NpbmdsZURvdCA9IGZ1bmN0aW9uIChzZWdtZW50KSB7XG4gIHJldHVybiBzZWdtZW50ID09PSAnLicgfHwgdG9Mb3dlckNhc2Uoc2VnbWVudCkgPT09ICclMmUnO1xufTtcblxuLy8gaHR0cHM6Ly91cmwuc3BlYy53aGF0d2cub3JnLyNkb3VibGUtZG90LXBhdGgtc2VnbWVudFxudmFyIGlzRG91YmxlRG90ID0gZnVuY3Rpb24gKHNlZ21lbnQpIHtcbiAgc2VnbWVudCA9IHRvTG93ZXJDYXNlKHNlZ21lbnQpO1xuICByZXR1cm4gc2VnbWVudCA9PT0gJy4uJyB8fCBzZWdtZW50ID09PSAnJTJlLicgfHwgc2VnbWVudCA9PT0gJy4lMmUnIHx8IHNlZ21lbnQgPT09ICclMmUlMmUnO1xufTtcblxuLy8gU3RhdGVzOlxudmFyIFNDSEVNRV9TVEFSVCA9IHt9O1xudmFyIFNDSEVNRSA9IHt9O1xudmFyIE5PX1NDSEVNRSA9IHt9O1xudmFyIFNQRUNJQUxfUkVMQVRJVkVfT1JfQVVUSE9SSVRZID0ge307XG52YXIgUEFUSF9PUl9BVVRIT1JJVFkgPSB7fTtcbnZhciBSRUxBVElWRSA9IHt9O1xudmFyIFJFTEFUSVZFX1NMQVNIID0ge307XG52YXIgU1BFQ0lBTF9BVVRIT1JJVFlfU0xBU0hFUyA9IHt9O1xudmFyIFNQRUNJQUxfQVVUSE9SSVRZX0lHTk9SRV9TTEFTSEVTID0ge307XG52YXIgQVVUSE9SSVRZID0ge307XG52YXIgSE9TVCA9IHt9O1xudmFyIEhPU1ROQU1FID0ge307XG52YXIgUE9SVCA9IHt9O1xudmFyIEZJTEUgPSB7fTtcbnZhciBGSUxFX1NMQVNIID0ge307XG52YXIgRklMRV9IT1NUID0ge307XG52YXIgUEFUSF9TVEFSVCA9IHt9O1xudmFyIFBBVEggPSB7fTtcbnZhciBDQU5OT1RfQkVfQV9CQVNFX1VSTF9QQVRIID0ge307XG52YXIgUVVFUlkgPSB7fTtcbnZhciBGUkFHTUVOVCA9IHt9O1xuXG52YXIgVVJMU3RhdGUgPSBmdW5jdGlvbiAodXJsLCBpc0Jhc2UsIGJhc2UpIHtcbiAgdmFyIHVybFN0cmluZyA9ICR0b1N0cmluZyh1cmwpO1xuICB2YXIgYmFzZVN0YXRlLCBmYWlsdXJlLCBzZWFyY2hQYXJhbXM7XG4gIGlmIChpc0Jhc2UpIHtcbiAgICBmYWlsdXJlID0gdGhpcy5wYXJzZSh1cmxTdHJpbmcpO1xuICAgIGlmIChmYWlsdXJlKSB0aHJvdyBuZXcgVHlwZUVycm9yKGZhaWx1cmUpO1xuICAgIHRoaXMuc2VhcmNoUGFyYW1zID0gbnVsbDtcbiAgfSBlbHNlIHtcbiAgICBpZiAoYmFzZSAhPT0gdW5kZWZpbmVkKSBiYXNlU3RhdGUgPSBuZXcgVVJMU3RhdGUoYmFzZSwgdHJ1ZSk7XG4gICAgZmFpbHVyZSA9IHRoaXMucGFyc2UodXJsU3RyaW5nLCBudWxsLCBiYXNlU3RhdGUpO1xuICAgIGlmIChmYWlsdXJlKSB0aHJvdyBuZXcgVHlwZUVycm9yKGZhaWx1cmUpO1xuICAgIHNlYXJjaFBhcmFtcyA9IGdldEludGVybmFsU2VhcmNoUGFyYW1zU3RhdGUobmV3IFVSTFNlYXJjaFBhcmFtcygpKTtcbiAgICBzZWFyY2hQYXJhbXMuYmluZFVSTCh0aGlzKTtcbiAgICB0aGlzLnNlYXJjaFBhcmFtcyA9IHNlYXJjaFBhcmFtcztcbiAgfVxufTtcblxuVVJMU3RhdGUucHJvdG90eXBlID0ge1xuICB0eXBlOiAnVVJMJyxcbiAgLy8gaHR0cHM6Ly91cmwuc3BlYy53aGF0d2cub3JnLyN1cmwtcGFyc2luZ1xuICAvLyBlc2xpbnQtZGlzYWJsZS1uZXh0LWxpbmUgbWF4LXN0YXRlbWVudHMgLS0gVE9ET1xuICBwYXJzZTogZnVuY3Rpb24gKGlucHV0LCBzdGF0ZU92ZXJyaWRlLCBiYXNlKSB7XG4gICAgdmFyIHVybCA9IHRoaXM7XG4gICAgdmFyIHN0YXRlID0gc3RhdGVPdmVycmlkZSB8fCBTQ0hFTUVfU1RBUlQ7XG4gICAgdmFyIHBvaW50ZXIgPSAwO1xuICAgIHZhciBidWZmZXIgPSAnJztcbiAgICB2YXIgc2VlbkF0ID0gZmFsc2U7XG4gICAgdmFyIHNlZW5CcmFja2V0ID0gZmFsc2U7XG4gICAgdmFyIHNlZW5QYXNzd29yZFRva2VuID0gZmFsc2U7XG4gICAgdmFyIGNvZGVQb2ludHMsIGNociwgYnVmZmVyQ29kZVBvaW50cywgZmFpbHVyZTtcblxuICAgIGlucHV0ID0gJHRvU3RyaW5nKGlucHV0KTtcblxuICAgIGlmICghc3RhdGVPdmVycmlkZSkge1xuICAgICAgdXJsLnNjaGVtZSA9ICcnO1xuICAgICAgdXJsLnVzZXJuYW1lID0gJyc7XG4gICAgICB1cmwucGFzc3dvcmQgPSAnJztcbiAgICAgIHVybC5ob3N0ID0gbnVsbDtcbiAgICAgIHVybC5wb3J0ID0gbnVsbDtcbiAgICAgIHVybC5wYXRoID0gW107XG4gICAgICB1cmwucXVlcnkgPSBudWxsO1xuICAgICAgdXJsLmZyYWdtZW50ID0gbnVsbDtcbiAgICAgIHVybC5jYW5ub3RCZUFCYXNlVVJMID0gZmFsc2U7XG4gICAgICBpbnB1dCA9IHJlcGxhY2UoaW5wdXQsIExFQURJTkdfQzBfQ09OVFJPTF9PUl9TUEFDRSwgJycpO1xuICAgICAgaW5wdXQgPSByZXBsYWNlKGlucHV0LCBUUkFJTElOR19DMF9DT05UUk9MX09SX1NQQUNFLCAnJDEnKTtcbiAgICB9XG5cbiAgICBpbnB1dCA9IHJlcGxhY2UoaW5wdXQsIFRBQl9BTkRfTkVXX0xJTkUsICcnKTtcblxuICAgIGNvZGVQb2ludHMgPSBhcnJheUZyb20oaW5wdXQpO1xuXG4gICAgd2hpbGUgKHBvaW50ZXIgPD0gY29kZVBvaW50cy5sZW5ndGgpIHtcbiAgICAgIGNociA9IGNvZGVQb2ludHNbcG9pbnRlcl07XG4gICAgICBzd2l0Y2ggKHN0YXRlKSB7XG4gICAgICAgIGNhc2UgU0NIRU1FX1NUQVJUOlxuICAgICAgICAgIGlmIChjaHIgJiYgZXhlYyhBTFBIQSwgY2hyKSkge1xuICAgICAgICAgICAgYnVmZmVyICs9IHRvTG93ZXJDYXNlKGNocik7XG4gICAgICAgICAgICBzdGF0ZSA9IFNDSEVNRTtcbiAgICAgICAgICB9IGVsc2UgaWYgKCFzdGF0ZU92ZXJyaWRlKSB7XG4gICAgICAgICAgICBzdGF0ZSA9IE5PX1NDSEVNRTtcbiAgICAgICAgICAgIGNvbnRpbnVlO1xuICAgICAgICAgIH0gZWxzZSByZXR1cm4gSU5WQUxJRF9TQ0hFTUU7XG4gICAgICAgICAgYnJlYWs7XG5cbiAgICAgICAgY2FzZSBTQ0hFTUU6XG4gICAgICAgICAgaWYgKGNociAmJiAoZXhlYyhBTFBIQU5VTUVSSUMsIGNocikgfHwgY2hyID09PSAnKycgfHwgY2hyID09PSAnLScgfHwgY2hyID09PSAnLicpKSB7XG4gICAgICAgICAgICBidWZmZXIgKz0gdG9Mb3dlckNhc2UoY2hyKTtcbiAgICAgICAgICB9IGVsc2UgaWYgKGNociA9PT0gJzonKSB7XG4gICAgICAgICAgICBpZiAoc3RhdGVPdmVycmlkZSAmJiAoXG4gICAgICAgICAgICAgICh1cmwuaXNTcGVjaWFsKCkgIT09IGhhc093bihzcGVjaWFsU2NoZW1lcywgYnVmZmVyKSkgfHxcbiAgICAgICAgICAgICAgKGJ1ZmZlciA9PT0gJ2ZpbGUnICYmICh1cmwuaW5jbHVkZXNDcmVkZW50aWFscygpIHx8IHVybC5wb3J0ICE9PSBudWxsKSkgfHxcbiAgICAgICAgICAgICAgKHVybC5zY2hlbWUgPT09ICdmaWxlJyAmJiAhdXJsLmhvc3QpXG4gICAgICAgICAgICApKSByZXR1cm47XG4gICAgICAgICAgICB1cmwuc2NoZW1lID0gYnVmZmVyO1xuICAgICAgICAgICAgaWYgKHN0YXRlT3ZlcnJpZGUpIHtcbiAgICAgICAgICAgICAgaWYgKHVybC5pc1NwZWNpYWwoKSAmJiBzcGVjaWFsU2NoZW1lc1t1cmwuc2NoZW1lXSA9PT0gdXJsLnBvcnQpIHVybC5wb3J0ID0gbnVsbDtcbiAgICAgICAgICAgICAgcmV0dXJuO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgYnVmZmVyID0gJyc7XG4gICAgICAgICAgICBpZiAodXJsLnNjaGVtZSA9PT0gJ2ZpbGUnKSB7XG4gICAgICAgICAgICAgIHN0YXRlID0gRklMRTtcbiAgICAgICAgICAgIH0gZWxzZSBpZiAodXJsLmlzU3BlY2lhbCgpICYmIGJhc2UgJiYgYmFzZS5zY2hlbWUgPT09IHVybC5zY2hlbWUpIHtcbiAgICAgICAgICAgICAgc3RhdGUgPSBTUEVDSUFMX1JFTEFUSVZFX09SX0FVVEhPUklUWTtcbiAgICAgICAgICAgIH0gZWxzZSBpZiAodXJsLmlzU3BlY2lhbCgpKSB7XG4gICAgICAgICAgICAgIHN0YXRlID0gU1BFQ0lBTF9BVVRIT1JJVFlfU0xBU0hFUztcbiAgICAgICAgICAgIH0gZWxzZSBpZiAoY29kZVBvaW50c1twb2ludGVyICsgMV0gPT09ICcvJykge1xuICAgICAgICAgICAgICBzdGF0ZSA9IFBBVEhfT1JfQVVUSE9SSVRZO1xuICAgICAgICAgICAgICBwb2ludGVyKys7XG4gICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICB1cmwuY2Fubm90QmVBQmFzZVVSTCA9IHRydWU7XG4gICAgICAgICAgICAgIHB1c2godXJsLnBhdGgsICcnKTtcbiAgICAgICAgICAgICAgc3RhdGUgPSBDQU5OT1RfQkVfQV9CQVNFX1VSTF9QQVRIO1xuICAgICAgICAgICAgfVxuICAgICAgICAgIH0gZWxzZSBpZiAoIXN0YXRlT3ZlcnJpZGUpIHtcbiAgICAgICAgICAgIGJ1ZmZlciA9ICcnO1xuICAgICAgICAgICAgc3RhdGUgPSBOT19TQ0hFTUU7XG4gICAgICAgICAgICBwb2ludGVyID0gMDtcbiAgICAgICAgICAgIGNvbnRpbnVlO1xuICAgICAgICAgIH0gZWxzZSByZXR1cm4gSU5WQUxJRF9TQ0hFTUU7XG4gICAgICAgICAgYnJlYWs7XG5cbiAgICAgICAgY2FzZSBOT19TQ0hFTUU6XG4gICAgICAgICAgaWYgKCFiYXNlIHx8IChiYXNlLmNhbm5vdEJlQUJhc2VVUkwgJiYgY2hyICE9PSAnIycpKSByZXR1cm4gSU5WQUxJRF9TQ0hFTUU7XG4gICAgICAgICAgaWYgKGJhc2UuY2Fubm90QmVBQmFzZVVSTCAmJiBjaHIgPT09ICcjJykge1xuICAgICAgICAgICAgdXJsLnNjaGVtZSA9IGJhc2Uuc2NoZW1lO1xuICAgICAgICAgICAgdXJsLnBhdGggPSBhcnJheVNsaWNlKGJhc2UucGF0aCk7XG4gICAgICAgICAgICB1cmwucXVlcnkgPSBiYXNlLnF1ZXJ5O1xuICAgICAgICAgICAgdXJsLmZyYWdtZW50ID0gJyc7XG4gICAgICAgICAgICB1cmwuY2Fubm90QmVBQmFzZVVSTCA9IHRydWU7XG4gICAgICAgICAgICBzdGF0ZSA9IEZSQUdNRU5UO1xuICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgfVxuICAgICAgICAgIHN0YXRlID0gYmFzZS5zY2hlbWUgPT09ICdmaWxlJyA/IEZJTEUgOiBSRUxBVElWRTtcbiAgICAgICAgICBjb250aW51ZTtcblxuICAgICAgICBjYXNlIFNQRUNJQUxfUkVMQVRJVkVfT1JfQVVUSE9SSVRZOlxuICAgICAgICAgIGlmIChjaHIgPT09ICcvJyAmJiBjb2RlUG9pbnRzW3BvaW50ZXIgKyAxXSA9PT0gJy8nKSB7XG4gICAgICAgICAgICBzdGF0ZSA9IFNQRUNJQUxfQVVUSE9SSVRZX0lHTk9SRV9TTEFTSEVTO1xuICAgICAgICAgICAgcG9pbnRlcisrO1xuICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICBzdGF0ZSA9IFJFTEFUSVZFO1xuICAgICAgICAgICAgY29udGludWU7XG4gICAgICAgICAgfSBicmVhaztcblxuICAgICAgICBjYXNlIFBBVEhfT1JfQVVUSE9SSVRZOlxuICAgICAgICAgIGlmIChjaHIgPT09ICcvJykge1xuICAgICAgICAgICAgc3RhdGUgPSBBVVRIT1JJVFk7XG4gICAgICAgICAgICBicmVhaztcbiAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgc3RhdGUgPSBQQVRIO1xuICAgICAgICAgICAgY29udGludWU7XG4gICAgICAgICAgfVxuXG4gICAgICAgIGNhc2UgUkVMQVRJVkU6XG4gICAgICAgICAgdXJsLnNjaGVtZSA9IGJhc2Uuc2NoZW1lO1xuICAgICAgICAgIGlmIChjaHIgPT09IEVPRikge1xuICAgICAgICAgICAgdXJsLnVzZXJuYW1lID0gYmFzZS51c2VybmFtZTtcbiAgICAgICAgICAgIHVybC5wYXNzd29yZCA9IGJhc2UucGFzc3dvcmQ7XG4gICAgICAgICAgICB1cmwuaG9zdCA9IGJhc2UuaG9zdDtcbiAgICAgICAgICAgIHVybC5wb3J0ID0gYmFzZS5wb3J0O1xuICAgICAgICAgICAgdXJsLnBhdGggPSBhcnJheVNsaWNlKGJhc2UucGF0aCk7XG4gICAgICAgICAgICB1cmwucXVlcnkgPSBiYXNlLnF1ZXJ5O1xuICAgICAgICAgIH0gZWxzZSBpZiAoY2hyID09PSAnLycgfHwgKGNociA9PT0gJ1xcXFwnICYmIHVybC5pc1NwZWNpYWwoKSkpIHtcbiAgICAgICAgICAgIHN0YXRlID0gUkVMQVRJVkVfU0xBU0g7XG4gICAgICAgICAgfSBlbHNlIGlmIChjaHIgPT09ICc/Jykge1xuICAgICAgICAgICAgdXJsLnVzZXJuYW1lID0gYmFzZS51c2VybmFtZTtcbiAgICAgICAgICAgIHVybC5wYXNzd29yZCA9IGJhc2UucGFzc3dvcmQ7XG4gICAgICAgICAgICB1cmwuaG9zdCA9IGJhc2UuaG9zdDtcbiAgICAgICAgICAgIHVybC5wb3J0ID0gYmFzZS5wb3J0O1xuICAgICAgICAgICAgdXJsLnBhdGggPSBhcnJheVNsaWNlKGJhc2UucGF0aCk7XG4gICAgICAgICAgICB1cmwucXVlcnkgPSAnJztcbiAgICAgICAgICAgIHN0YXRlID0gUVVFUlk7XG4gICAgICAgICAgfSBlbHNlIGlmIChjaHIgPT09ICcjJykge1xuICAgICAgICAgICAgdXJsLnVzZXJuYW1lID0gYmFzZS51c2VybmFtZTtcbiAgICAgICAgICAgIHVybC5wYXNzd29yZCA9IGJhc2UucGFzc3dvcmQ7XG4gICAgICAgICAgICB1cmwuaG9zdCA9IGJhc2UuaG9zdDtcbiAgICAgICAgICAgIHVybC5wb3J0ID0gYmFzZS5wb3J0O1xuICAgICAgICAgICAgdXJsLnBhdGggPSBhcnJheVNsaWNlKGJhc2UucGF0aCk7XG4gICAgICAgICAgICB1cmwucXVlcnkgPSBiYXNlLnF1ZXJ5O1xuICAgICAgICAgICAgdXJsLmZyYWdtZW50ID0gJyc7XG4gICAgICAgICAgICBzdGF0ZSA9IEZSQUdNRU5UO1xuICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICB1cmwudXNlcm5hbWUgPSBiYXNlLnVzZXJuYW1lO1xuICAgICAgICAgICAgdXJsLnBhc3N3b3JkID0gYmFzZS5wYXNzd29yZDtcbiAgICAgICAgICAgIHVybC5ob3N0ID0gYmFzZS5ob3N0O1xuICAgICAgICAgICAgdXJsLnBvcnQgPSBiYXNlLnBvcnQ7XG4gICAgICAgICAgICB1cmwucGF0aCA9IGFycmF5U2xpY2UoYmFzZS5wYXRoKTtcbiAgICAgICAgICAgIHVybC5wYXRoLmxlbmd0aC0tO1xuICAgICAgICAgICAgc3RhdGUgPSBQQVRIO1xuICAgICAgICAgICAgY29udGludWU7XG4gICAgICAgICAgfSBicmVhaztcblxuICAgICAgICBjYXNlIFJFTEFUSVZFX1NMQVNIOlxuICAgICAgICAgIGlmICh1cmwuaXNTcGVjaWFsKCkgJiYgKGNociA9PT0gJy8nIHx8IGNociA9PT0gJ1xcXFwnKSkge1xuICAgICAgICAgICAgc3RhdGUgPSBTUEVDSUFMX0FVVEhPUklUWV9JR05PUkVfU0xBU0hFUztcbiAgICAgICAgICB9IGVsc2UgaWYgKGNociA9PT0gJy8nKSB7XG4gICAgICAgICAgICBzdGF0ZSA9IEFVVEhPUklUWTtcbiAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgdXJsLnVzZXJuYW1lID0gYmFzZS51c2VybmFtZTtcbiAgICAgICAgICAgIHVybC5wYXNzd29yZCA9IGJhc2UucGFzc3dvcmQ7XG4gICAgICAgICAgICB1cmwuaG9zdCA9IGJhc2UuaG9zdDtcbiAgICAgICAgICAgIHVybC5wb3J0ID0gYmFzZS5wb3J0O1xuICAgICAgICAgICAgc3RhdGUgPSBQQVRIO1xuICAgICAgICAgICAgY29udGludWU7XG4gICAgICAgICAgfSBicmVhaztcblxuICAgICAgICBjYXNlIFNQRUNJQUxfQVVUSE9SSVRZX1NMQVNIRVM6XG4gICAgICAgICAgc3RhdGUgPSBTUEVDSUFMX0FVVEhPUklUWV9JR05PUkVfU0xBU0hFUztcbiAgICAgICAgICBpZiAoY2hyICE9PSAnLycgfHwgY2hhckF0KGJ1ZmZlciwgcG9pbnRlciArIDEpICE9PSAnLycpIGNvbnRpbnVlO1xuICAgICAgICAgIHBvaW50ZXIrKztcbiAgICAgICAgICBicmVhaztcblxuICAgICAgICBjYXNlIFNQRUNJQUxfQVVUSE9SSVRZX0lHTk9SRV9TTEFTSEVTOlxuICAgICAgICAgIGlmIChjaHIgIT09ICcvJyAmJiBjaHIgIT09ICdcXFxcJykge1xuICAgICAgICAgICAgc3RhdGUgPSBBVVRIT1JJVFk7XG4gICAgICAgICAgICBjb250aW51ZTtcbiAgICAgICAgICB9IGJyZWFrO1xuXG4gICAgICAgIGNhc2UgQVVUSE9SSVRZOlxuICAgICAgICAgIGlmIChjaHIgPT09ICdAJykge1xuICAgICAgICAgICAgaWYgKHNlZW5BdCkgYnVmZmVyID0gJyU0MCcgKyBidWZmZXI7XG4gICAgICAgICAgICBzZWVuQXQgPSB0cnVlO1xuICAgICAgICAgICAgYnVmZmVyQ29kZVBvaW50cyA9IGFycmF5RnJvbShidWZmZXIpO1xuICAgICAgICAgICAgZm9yICh2YXIgaSA9IDA7IGkgPCBidWZmZXJDb2RlUG9pbnRzLmxlbmd0aDsgaSsrKSB7XG4gICAgICAgICAgICAgIHZhciBjb2RlUG9pbnQgPSBidWZmZXJDb2RlUG9pbnRzW2ldO1xuICAgICAgICAgICAgICBpZiAoY29kZVBvaW50ID09PSAnOicgJiYgIXNlZW5QYXNzd29yZFRva2VuKSB7XG4gICAgICAgICAgICAgICAgc2VlblBhc3N3b3JkVG9rZW4gPSB0cnVlO1xuICAgICAgICAgICAgICAgIGNvbnRpbnVlO1xuICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgIHZhciBlbmNvZGVkQ29kZVBvaW50cyA9IHBlcmNlbnRFbmNvZGUoY29kZVBvaW50LCB1c2VyaW5mb1BlcmNlbnRFbmNvZGVTZXQpO1xuICAgICAgICAgICAgICBpZiAoc2VlblBhc3N3b3JkVG9rZW4pIHVybC5wYXNzd29yZCArPSBlbmNvZGVkQ29kZVBvaW50cztcbiAgICAgICAgICAgICAgZWxzZSB1cmwudXNlcm5hbWUgKz0gZW5jb2RlZENvZGVQb2ludHM7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBidWZmZXIgPSAnJztcbiAgICAgICAgICB9IGVsc2UgaWYgKFxuICAgICAgICAgICAgY2hyID09PSBFT0YgfHwgY2hyID09PSAnLycgfHwgY2hyID09PSAnPycgfHwgY2hyID09PSAnIycgfHxcbiAgICAgICAgICAgIChjaHIgPT09ICdcXFxcJyAmJiB1cmwuaXNTcGVjaWFsKCkpXG4gICAgICAgICAgKSB7XG4gICAgICAgICAgICBpZiAoc2VlbkF0ICYmIGJ1ZmZlciA9PT0gJycpIHJldHVybiBJTlZBTElEX0FVVEhPUklUWTtcbiAgICAgICAgICAgIHBvaW50ZXIgLT0gYXJyYXlGcm9tKGJ1ZmZlcikubGVuZ3RoICsgMTtcbiAgICAgICAgICAgIGJ1ZmZlciA9ICcnO1xuICAgICAgICAgICAgc3RhdGUgPSBIT1NUO1xuICAgICAgICAgIH0gZWxzZSBidWZmZXIgKz0gY2hyO1xuICAgICAgICAgIGJyZWFrO1xuXG4gICAgICAgIGNhc2UgSE9TVDpcbiAgICAgICAgY2FzZSBIT1NUTkFNRTpcbiAgICAgICAgICBpZiAoc3RhdGVPdmVycmlkZSAmJiB1cmwuc2NoZW1lID09PSAnZmlsZScpIHtcbiAgICAgICAgICAgIHN0YXRlID0gRklMRV9IT1NUO1xuICAgICAgICAgICAgY29udGludWU7XG4gICAgICAgICAgfSBlbHNlIGlmIChjaHIgPT09ICc6JyAmJiAhc2VlbkJyYWNrZXQpIHtcbiAgICAgICAgICAgIGlmIChidWZmZXIgPT09ICcnKSByZXR1cm4gSU5WQUxJRF9IT1NUO1xuICAgICAgICAgICAgZmFpbHVyZSA9IHVybC5wYXJzZUhvc3QoYnVmZmVyKTtcbiAgICAgICAgICAgIGlmIChmYWlsdXJlKSByZXR1cm4gZmFpbHVyZTtcbiAgICAgICAgICAgIGJ1ZmZlciA9ICcnO1xuICAgICAgICAgICAgc3RhdGUgPSBQT1JUO1xuICAgICAgICAgICAgaWYgKHN0YXRlT3ZlcnJpZGUgPT09IEhPU1ROQU1FKSByZXR1cm47XG4gICAgICAgICAgfSBlbHNlIGlmIChcbiAgICAgICAgICAgIGNociA9PT0gRU9GIHx8IGNociA9PT0gJy8nIHx8IGNociA9PT0gJz8nIHx8IGNociA9PT0gJyMnIHx8XG4gICAgICAgICAgICAoY2hyID09PSAnXFxcXCcgJiYgdXJsLmlzU3BlY2lhbCgpKVxuICAgICAgICAgICkge1xuICAgICAgICAgICAgaWYgKHVybC5pc1NwZWNpYWwoKSAmJiBidWZmZXIgPT09ICcnKSByZXR1cm4gSU5WQUxJRF9IT1NUO1xuICAgICAgICAgICAgaWYgKHN0YXRlT3ZlcnJpZGUgJiYgYnVmZmVyID09PSAnJyAmJiAodXJsLmluY2x1ZGVzQ3JlZGVudGlhbHMoKSB8fCB1cmwucG9ydCAhPT0gbnVsbCkpIHJldHVybjtcbiAgICAgICAgICAgIGZhaWx1cmUgPSB1cmwucGFyc2VIb3N0KGJ1ZmZlcik7XG4gICAgICAgICAgICBpZiAoZmFpbHVyZSkgcmV0dXJuIGZhaWx1cmU7XG4gICAgICAgICAgICBidWZmZXIgPSAnJztcbiAgICAgICAgICAgIHN0YXRlID0gUEFUSF9TVEFSVDtcbiAgICAgICAgICAgIGlmIChzdGF0ZU92ZXJyaWRlKSByZXR1cm47XG4gICAgICAgICAgICBjb250aW51ZTtcbiAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgaWYgKGNociA9PT0gJ1snKSBzZWVuQnJhY2tldCA9IHRydWU7XG4gICAgICAgICAgICBlbHNlIGlmIChjaHIgPT09ICddJykgc2VlbkJyYWNrZXQgPSBmYWxzZTtcbiAgICAgICAgICAgIGJ1ZmZlciArPSBjaHI7XG4gICAgICAgICAgfSBicmVhaztcblxuICAgICAgICBjYXNlIFBPUlQ6XG4gICAgICAgICAgaWYgKGV4ZWMoRElHSVQsIGNocikpIHtcbiAgICAgICAgICAgIGJ1ZmZlciArPSBjaHI7XG4gICAgICAgICAgfSBlbHNlIGlmIChcbiAgICAgICAgICAgIGNociA9PT0gRU9GIHx8IGNociA9PT0gJy8nIHx8IGNociA9PT0gJz8nIHx8IGNociA9PT0gJyMnIHx8XG4gICAgICAgICAgICAoY2hyID09PSAnXFxcXCcgJiYgdXJsLmlzU3BlY2lhbCgpKSB8fFxuICAgICAgICAgICAgc3RhdGVPdmVycmlkZVxuICAgICAgICAgICkge1xuICAgICAgICAgICAgaWYgKGJ1ZmZlciAhPT0gJycpIHtcbiAgICAgICAgICAgICAgdmFyIHBvcnQgPSBwYXJzZUludChidWZmZXIsIDEwKTtcbiAgICAgICAgICAgICAgaWYgKHBvcnQgPiAweEZGRkYpIHJldHVybiBJTlZBTElEX1BPUlQ7XG4gICAgICAgICAgICAgIHVybC5wb3J0ID0gKHVybC5pc1NwZWNpYWwoKSAmJiBwb3J0ID09PSBzcGVjaWFsU2NoZW1lc1t1cmwuc2NoZW1lXSkgPyBudWxsIDogcG9ydDtcbiAgICAgICAgICAgICAgYnVmZmVyID0gJyc7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBpZiAoc3RhdGVPdmVycmlkZSkgcmV0dXJuO1xuICAgICAgICAgICAgc3RhdGUgPSBQQVRIX1NUQVJUO1xuICAgICAgICAgICAgY29udGludWU7XG4gICAgICAgICAgfSBlbHNlIHJldHVybiBJTlZBTElEX1BPUlQ7XG4gICAgICAgICAgYnJlYWs7XG5cbiAgICAgICAgY2FzZSBGSUxFOlxuICAgICAgICAgIHVybC5zY2hlbWUgPSAnZmlsZSc7XG4gICAgICAgICAgaWYgKGNociA9PT0gJy8nIHx8IGNociA9PT0gJ1xcXFwnKSBzdGF0ZSA9IEZJTEVfU0xBU0g7XG4gICAgICAgICAgZWxzZSBpZiAoYmFzZSAmJiBiYXNlLnNjaGVtZSA9PT0gJ2ZpbGUnKSB7XG4gICAgICAgICAgICBzd2l0Y2ggKGNocikge1xuICAgICAgICAgICAgICBjYXNlIEVPRjpcbiAgICAgICAgICAgICAgICB1cmwuaG9zdCA9IGJhc2UuaG9zdDtcbiAgICAgICAgICAgICAgICB1cmwucGF0aCA9IGFycmF5U2xpY2UoYmFzZS5wYXRoKTtcbiAgICAgICAgICAgICAgICB1cmwucXVlcnkgPSBiYXNlLnF1ZXJ5O1xuICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgICBjYXNlICc/JzpcbiAgICAgICAgICAgICAgICB1cmwuaG9zdCA9IGJhc2UuaG9zdDtcbiAgICAgICAgICAgICAgICB1cmwucGF0aCA9IGFycmF5U2xpY2UoYmFzZS5wYXRoKTtcbiAgICAgICAgICAgICAgICB1cmwucXVlcnkgPSAnJztcbiAgICAgICAgICAgICAgICBzdGF0ZSA9IFFVRVJZO1xuICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgICBjYXNlICcjJzpcbiAgICAgICAgICAgICAgICB1cmwuaG9zdCA9IGJhc2UuaG9zdDtcbiAgICAgICAgICAgICAgICB1cmwucGF0aCA9IGFycmF5U2xpY2UoYmFzZS5wYXRoKTtcbiAgICAgICAgICAgICAgICB1cmwucXVlcnkgPSBiYXNlLnF1ZXJ5O1xuICAgICAgICAgICAgICAgIHVybC5mcmFnbWVudCA9ICcnO1xuICAgICAgICAgICAgICAgIHN0YXRlID0gRlJBR01FTlQ7XG4gICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICAgIGRlZmF1bHQ6XG4gICAgICAgICAgICAgICAgaWYgKCFzdGFydHNXaXRoV2luZG93c0RyaXZlTGV0dGVyKGpvaW4oYXJyYXlTbGljZShjb2RlUG9pbnRzLCBwb2ludGVyKSwgJycpKSkge1xuICAgICAgICAgICAgICAgICAgdXJsLmhvc3QgPSBiYXNlLmhvc3Q7XG4gICAgICAgICAgICAgICAgICB1cmwucGF0aCA9IGFycmF5U2xpY2UoYmFzZS5wYXRoKTtcbiAgICAgICAgICAgICAgICAgIHVybC5zaG9ydGVuUGF0aCgpO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICBzdGF0ZSA9IFBBVEg7XG4gICAgICAgICAgICAgICAgY29udGludWU7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgIHN0YXRlID0gUEFUSDtcbiAgICAgICAgICAgIGNvbnRpbnVlO1xuICAgICAgICAgIH0gYnJlYWs7XG5cbiAgICAgICAgY2FzZSBGSUxFX1NMQVNIOlxuICAgICAgICAgIGlmIChjaHIgPT09ICcvJyB8fCBjaHIgPT09ICdcXFxcJykge1xuICAgICAgICAgICAgc3RhdGUgPSBGSUxFX0hPU1Q7XG4gICAgICAgICAgICBicmVhaztcbiAgICAgICAgICB9XG4gICAgICAgICAgaWYgKGJhc2UgJiYgYmFzZS5zY2hlbWUgPT09ICdmaWxlJyAmJiAhc3RhcnRzV2l0aFdpbmRvd3NEcml2ZUxldHRlcihqb2luKGFycmF5U2xpY2UoY29kZVBvaW50cywgcG9pbnRlciksICcnKSkpIHtcbiAgICAgICAgICAgIGlmIChpc1dpbmRvd3NEcml2ZUxldHRlcihiYXNlLnBhdGhbMF0sIHRydWUpKSBwdXNoKHVybC5wYXRoLCBiYXNlLnBhdGhbMF0pO1xuICAgICAgICAgICAgZWxzZSB1cmwuaG9zdCA9IGJhc2UuaG9zdDtcbiAgICAgICAgICB9XG4gICAgICAgICAgc3RhdGUgPSBQQVRIO1xuICAgICAgICAgIGNvbnRpbnVlO1xuXG4gICAgICAgIGNhc2UgRklMRV9IT1NUOlxuICAgICAgICAgIGlmIChjaHIgPT09IEVPRiB8fCBjaHIgPT09ICcvJyB8fCBjaHIgPT09ICdcXFxcJyB8fCBjaHIgPT09ICc/JyB8fCBjaHIgPT09ICcjJykge1xuICAgICAgICAgICAgaWYgKCFzdGF0ZU92ZXJyaWRlICYmIGlzV2luZG93c0RyaXZlTGV0dGVyKGJ1ZmZlcikpIHtcbiAgICAgICAgICAgICAgc3RhdGUgPSBQQVRIO1xuICAgICAgICAgICAgfSBlbHNlIGlmIChidWZmZXIgPT09ICcnKSB7XG4gICAgICAgICAgICAgIHVybC5ob3N0ID0gJyc7XG4gICAgICAgICAgICAgIGlmIChzdGF0ZU92ZXJyaWRlKSByZXR1cm47XG4gICAgICAgICAgICAgIHN0YXRlID0gUEFUSF9TVEFSVDtcbiAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgIGZhaWx1cmUgPSB1cmwucGFyc2VIb3N0KGJ1ZmZlcik7XG4gICAgICAgICAgICAgIGlmIChmYWlsdXJlKSByZXR1cm4gZmFpbHVyZTtcbiAgICAgICAgICAgICAgaWYgKHVybC5ob3N0ID09PSAnbG9jYWxob3N0JykgdXJsLmhvc3QgPSAnJztcbiAgICAgICAgICAgICAgaWYgKHN0YXRlT3ZlcnJpZGUpIHJldHVybjtcbiAgICAgICAgICAgICAgYnVmZmVyID0gJyc7XG4gICAgICAgICAgICAgIHN0YXRlID0gUEFUSF9TVEFSVDtcbiAgICAgICAgICAgIH0gY29udGludWU7XG4gICAgICAgICAgfSBlbHNlIGJ1ZmZlciArPSBjaHI7XG4gICAgICAgICAgYnJlYWs7XG5cbiAgICAgICAgY2FzZSBQQVRIX1NUQVJUOlxuICAgICAgICAgIGlmICh1cmwuaXNTcGVjaWFsKCkpIHtcbiAgICAgICAgICAgIHN0YXRlID0gUEFUSDtcbiAgICAgICAgICAgIGlmIChjaHIgIT09ICcvJyAmJiBjaHIgIT09ICdcXFxcJykgY29udGludWU7XG4gICAgICAgICAgfSBlbHNlIGlmICghc3RhdGVPdmVycmlkZSAmJiBjaHIgPT09ICc/Jykge1xuICAgICAgICAgICAgdXJsLnF1ZXJ5ID0gJyc7XG4gICAgICAgICAgICBzdGF0ZSA9IFFVRVJZO1xuICAgICAgICAgIH0gZWxzZSBpZiAoIXN0YXRlT3ZlcnJpZGUgJiYgY2hyID09PSAnIycpIHtcbiAgICAgICAgICAgIHVybC5mcmFnbWVudCA9ICcnO1xuICAgICAgICAgICAgc3RhdGUgPSBGUkFHTUVOVDtcbiAgICAgICAgICB9IGVsc2UgaWYgKGNociAhPT0gRU9GKSB7XG4gICAgICAgICAgICBzdGF0ZSA9IFBBVEg7XG4gICAgICAgICAgICBpZiAoY2hyICE9PSAnLycpIGNvbnRpbnVlO1xuICAgICAgICAgIH0gYnJlYWs7XG5cbiAgICAgICAgY2FzZSBQQVRIOlxuICAgICAgICAgIGlmIChcbiAgICAgICAgICAgIGNociA9PT0gRU9GIHx8IGNociA9PT0gJy8nIHx8XG4gICAgICAgICAgICAoY2hyID09PSAnXFxcXCcgJiYgdXJsLmlzU3BlY2lhbCgpKSB8fFxuICAgICAgICAgICAgKCFzdGF0ZU92ZXJyaWRlICYmIChjaHIgPT09ICc/JyB8fCBjaHIgPT09ICcjJykpXG4gICAgICAgICAgKSB7XG4gICAgICAgICAgICBpZiAoaXNEb3VibGVEb3QoYnVmZmVyKSkge1xuICAgICAgICAgICAgICB1cmwuc2hvcnRlblBhdGgoKTtcbiAgICAgICAgICAgICAgaWYgKGNociAhPT0gJy8nICYmICEoY2hyID09PSAnXFxcXCcgJiYgdXJsLmlzU3BlY2lhbCgpKSkge1xuICAgICAgICAgICAgICAgIHB1c2godXJsLnBhdGgsICcnKTtcbiAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfSBlbHNlIGlmIChpc1NpbmdsZURvdChidWZmZXIpKSB7XG4gICAgICAgICAgICAgIGlmIChjaHIgIT09ICcvJyAmJiAhKGNociA9PT0gJ1xcXFwnICYmIHVybC5pc1NwZWNpYWwoKSkpIHtcbiAgICAgICAgICAgICAgICBwdXNoKHVybC5wYXRoLCAnJyk7XG4gICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgIGlmICh1cmwuc2NoZW1lID09PSAnZmlsZScgJiYgIXVybC5wYXRoLmxlbmd0aCAmJiBpc1dpbmRvd3NEcml2ZUxldHRlcihidWZmZXIpKSB7XG4gICAgICAgICAgICAgICAgaWYgKHVybC5ob3N0KSB1cmwuaG9zdCA9ICcnO1xuICAgICAgICAgICAgICAgIGJ1ZmZlciA9IGNoYXJBdChidWZmZXIsIDApICsgJzonOyAvLyBub3JtYWxpemUgd2luZG93cyBkcml2ZSBsZXR0ZXJcbiAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICBwdXNoKHVybC5wYXRoLCBidWZmZXIpO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgYnVmZmVyID0gJyc7XG4gICAgICAgICAgICBpZiAodXJsLnNjaGVtZSA9PT0gJ2ZpbGUnICYmIChjaHIgPT09IEVPRiB8fCBjaHIgPT09ICc/JyB8fCBjaHIgPT09ICcjJykpIHtcbiAgICAgICAgICAgICAgd2hpbGUgKHVybC5wYXRoLmxlbmd0aCA+IDEgJiYgdXJsLnBhdGhbMF0gPT09ICcnKSB7XG4gICAgICAgICAgICAgICAgc2hpZnQodXJsLnBhdGgpO1xuICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBpZiAoY2hyID09PSAnPycpIHtcbiAgICAgICAgICAgICAgdXJsLnF1ZXJ5ID0gJyc7XG4gICAgICAgICAgICAgIHN0YXRlID0gUVVFUlk7XG4gICAgICAgICAgICB9IGVsc2UgaWYgKGNociA9PT0gJyMnKSB7XG4gICAgICAgICAgICAgIHVybC5mcmFnbWVudCA9ICcnO1xuICAgICAgICAgICAgICBzdGF0ZSA9IEZSQUdNRU5UO1xuICAgICAgICAgICAgfVxuICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICBidWZmZXIgKz0gcGVyY2VudEVuY29kZShjaHIsIHBhdGhQZXJjZW50RW5jb2RlU2V0KTtcbiAgICAgICAgICB9IGJyZWFrO1xuXG4gICAgICAgIGNhc2UgQ0FOTk9UX0JFX0FfQkFTRV9VUkxfUEFUSDpcbiAgICAgICAgICBpZiAoY2hyID09PSAnPycpIHtcbiAgICAgICAgICAgIHVybC5xdWVyeSA9ICcnO1xuICAgICAgICAgICAgc3RhdGUgPSBRVUVSWTtcbiAgICAgICAgICB9IGVsc2UgaWYgKGNociA9PT0gJyMnKSB7XG4gICAgICAgICAgICB1cmwuZnJhZ21lbnQgPSAnJztcbiAgICAgICAgICAgIHN0YXRlID0gRlJBR01FTlQ7XG4gICAgICAgICAgfSBlbHNlIGlmIChjaHIgIT09IEVPRikge1xuICAgICAgICAgICAgdXJsLnBhdGhbMF0gKz0gcGVyY2VudEVuY29kZShjaHIsIEMwQ29udHJvbFBlcmNlbnRFbmNvZGVTZXQpO1xuICAgICAgICAgIH0gYnJlYWs7XG5cbiAgICAgICAgY2FzZSBRVUVSWTpcbiAgICAgICAgICBpZiAoIXN0YXRlT3ZlcnJpZGUgJiYgY2hyID09PSAnIycpIHtcbiAgICAgICAgICAgIHVybC5mcmFnbWVudCA9ICcnO1xuICAgICAgICAgICAgc3RhdGUgPSBGUkFHTUVOVDtcbiAgICAgICAgICB9IGVsc2UgaWYgKGNociAhPT0gRU9GKSB7XG4gICAgICAgICAgICBpZiAoY2hyID09PSBcIidcIiAmJiB1cmwuaXNTcGVjaWFsKCkpIHVybC5xdWVyeSArPSAnJTI3JztcbiAgICAgICAgICAgIGVsc2UgaWYgKGNociA9PT0gJyMnKSB1cmwucXVlcnkgKz0gJyUyMyc7XG4gICAgICAgICAgICBlbHNlIHVybC5xdWVyeSArPSBwZXJjZW50RW5jb2RlKGNociwgQzBDb250cm9sUGVyY2VudEVuY29kZVNldCk7XG4gICAgICAgICAgfSBicmVhaztcblxuICAgICAgICBjYXNlIEZSQUdNRU5UOlxuICAgICAgICAgIGlmIChjaHIgIT09IEVPRikgdXJsLmZyYWdtZW50ICs9IHBlcmNlbnRFbmNvZGUoY2hyLCBmcmFnbWVudFBlcmNlbnRFbmNvZGVTZXQpO1xuICAgICAgICAgIGJyZWFrO1xuICAgICAgfVxuXG4gICAgICBwb2ludGVyKys7XG4gICAgfVxuICB9LFxuICAvLyBodHRwczovL3VybC5zcGVjLndoYXR3Zy5vcmcvI2hvc3QtcGFyc2luZ1xuICBwYXJzZUhvc3Q6IGZ1bmN0aW9uIChpbnB1dCkge1xuICAgIHZhciByZXN1bHQsIGNvZGVQb2ludHMsIGluZGV4O1xuICAgIGlmIChjaGFyQXQoaW5wdXQsIDApID09PSAnWycpIHtcbiAgICAgIGlmIChjaGFyQXQoaW5wdXQsIGlucHV0Lmxlbmd0aCAtIDEpICE9PSAnXScpIHJldHVybiBJTlZBTElEX0hPU1Q7XG4gICAgICByZXN1bHQgPSBwYXJzZUlQdjYoc3RyaW5nU2xpY2UoaW5wdXQsIDEsIC0xKSk7XG4gICAgICBpZiAoIXJlc3VsdCkgcmV0dXJuIElOVkFMSURfSE9TVDtcbiAgICAgIHRoaXMuaG9zdCA9IHJlc3VsdDtcbiAgICAvLyBvcGFxdWUgaG9zdFxuICAgIH0gZWxzZSBpZiAoIXRoaXMuaXNTcGVjaWFsKCkpIHtcbiAgICAgIGlmIChleGVjKEZPUkJJRERFTl9IT1NUX0NPREVfUE9JTlRfRVhDTFVESU5HX1BFUkNFTlQsIGlucHV0KSkgcmV0dXJuIElOVkFMSURfSE9TVDtcbiAgICAgIHJlc3VsdCA9ICcnO1xuICAgICAgY29kZVBvaW50cyA9IGFycmF5RnJvbShpbnB1dCk7XG4gICAgICBmb3IgKGluZGV4ID0gMDsgaW5kZXggPCBjb2RlUG9pbnRzLmxlbmd0aDsgaW5kZXgrKykge1xuICAgICAgICByZXN1bHQgKz0gcGVyY2VudEVuY29kZShjb2RlUG9pbnRzW2luZGV4XSwgQzBDb250cm9sUGVyY2VudEVuY29kZVNldCk7XG4gICAgICB9XG4gICAgICB0aGlzLmhvc3QgPSByZXN1bHQ7XG4gICAgfSBlbHNlIHtcbiAgICAgIGlucHV0ID0gdG9BU0NJSShpbnB1dCk7XG4gICAgICBpZiAoZXhlYyhGT1JCSURERU5fSE9TVF9DT0RFX1BPSU5ULCBpbnB1dCkpIHJldHVybiBJTlZBTElEX0hPU1Q7XG4gICAgICByZXN1bHQgPSBwYXJzZUlQdjQoaW5wdXQpO1xuICAgICAgaWYgKHJlc3VsdCA9PT0gbnVsbCkgcmV0dXJuIElOVkFMSURfSE9TVDtcbiAgICAgIHRoaXMuaG9zdCA9IHJlc3VsdDtcbiAgICB9XG4gIH0sXG4gIC8vIGh0dHBzOi8vdXJsLnNwZWMud2hhdHdnLm9yZy8jY2Fubm90LWhhdmUtYS11c2VybmFtZS1wYXNzd29yZC1wb3J0XG4gIGNhbm5vdEhhdmVVc2VybmFtZVBhc3N3b3JkUG9ydDogZnVuY3Rpb24gKCkge1xuICAgIHJldHVybiAhdGhpcy5ob3N0IHx8IHRoaXMuY2Fubm90QmVBQmFzZVVSTCB8fCB0aGlzLnNjaGVtZSA9PT0gJ2ZpbGUnO1xuICB9LFxuICAvLyBodHRwczovL3VybC5zcGVjLndoYXR3Zy5vcmcvI2luY2x1ZGUtY3JlZGVudGlhbHNcbiAgaW5jbHVkZXNDcmVkZW50aWFsczogZnVuY3Rpb24gKCkge1xuICAgIHJldHVybiB0aGlzLnVzZXJuYW1lICE9PSAnJyB8fCB0aGlzLnBhc3N3b3JkICE9PSAnJztcbiAgfSxcbiAgLy8gaHR0cHM6Ly91cmwuc3BlYy53aGF0d2cub3JnLyNpcy1zcGVjaWFsXG4gIGlzU3BlY2lhbDogZnVuY3Rpb24gKCkge1xuICAgIHJldHVybiBoYXNPd24oc3BlY2lhbFNjaGVtZXMsIHRoaXMuc2NoZW1lKTtcbiAgfSxcbiAgLy8gaHR0cHM6Ly91cmwuc3BlYy53aGF0d2cub3JnLyNzaG9ydGVuLWEtdXJscy1wYXRoXG4gIHNob3J0ZW5QYXRoOiBmdW5jdGlvbiAoKSB7XG4gICAgdmFyIHBhdGggPSB0aGlzLnBhdGg7XG4gICAgdmFyIHBhdGhTaXplID0gcGF0aC5sZW5ndGg7XG4gICAgaWYgKHBhdGhTaXplICYmICh0aGlzLnNjaGVtZSAhPT0gJ2ZpbGUnIHx8IHBhdGhTaXplICE9PSAxIHx8ICFpc1dpbmRvd3NEcml2ZUxldHRlcihwYXRoWzBdLCB0cnVlKSkpIHtcbiAgICAgIHBhdGgubGVuZ3RoLS07XG4gICAgfVxuICB9LFxuICAvLyBodHRwczovL3VybC5zcGVjLndoYXR3Zy5vcmcvI2NvbmNlcHQtdXJsLXNlcmlhbGl6ZXJcbiAgc2VyaWFsaXplOiBmdW5jdGlvbiAoKSB7XG4gICAgdmFyIHVybCA9IHRoaXM7XG4gICAgdmFyIHNjaGVtZSA9IHVybC5zY2hlbWU7XG4gICAgdmFyIHVzZXJuYW1lID0gdXJsLnVzZXJuYW1lO1xuICAgIHZhciBwYXNzd29yZCA9IHVybC5wYXNzd29yZDtcbiAgICB2YXIgaG9zdCA9IHVybC5ob3N0O1xuICAgIHZhciBwb3J0ID0gdXJsLnBvcnQ7XG4gICAgdmFyIHBhdGggPSB1cmwucGF0aDtcbiAgICB2YXIgcXVlcnkgPSB1cmwucXVlcnk7XG4gICAgdmFyIGZyYWdtZW50ID0gdXJsLmZyYWdtZW50O1xuICAgIHZhciBvdXRwdXQgPSBzY2hlbWUgKyAnOic7XG4gICAgaWYgKGhvc3QgIT09IG51bGwpIHtcbiAgICAgIG91dHB1dCArPSAnLy8nO1xuICAgICAgaWYgKHVybC5pbmNsdWRlc0NyZWRlbnRpYWxzKCkpIHtcbiAgICAgICAgb3V0cHV0ICs9IHVzZXJuYW1lICsgKHBhc3N3b3JkID8gJzonICsgcGFzc3dvcmQgOiAnJykgKyAnQCc7XG4gICAgICB9XG4gICAgICBvdXRwdXQgKz0gc2VyaWFsaXplSG9zdChob3N0KTtcbiAgICAgIGlmIChwb3J0ICE9PSBudWxsKSBvdXRwdXQgKz0gJzonICsgcG9ydDtcbiAgICB9IGVsc2UgaWYgKHNjaGVtZSA9PT0gJ2ZpbGUnKSBvdXRwdXQgKz0gJy8vJztcbiAgICBvdXRwdXQgKz0gdXJsLmNhbm5vdEJlQUJhc2VVUkwgPyBwYXRoWzBdIDogcGF0aC5sZW5ndGggPyAnLycgKyBqb2luKHBhdGgsICcvJykgOiAnJztcbiAgICBpZiAocXVlcnkgIT09IG51bGwpIG91dHB1dCArPSAnPycgKyBxdWVyeTtcbiAgICBpZiAoZnJhZ21lbnQgIT09IG51bGwpIG91dHB1dCArPSAnIycgKyBmcmFnbWVudDtcbiAgICByZXR1cm4gb3V0cHV0O1xuICB9LFxuICAvLyBodHRwczovL3VybC5zcGVjLndoYXR3Zy5vcmcvI2RvbS11cmwtaHJlZlxuICBzZXRIcmVmOiBmdW5jdGlvbiAoaHJlZikge1xuICAgIHZhciBmYWlsdXJlID0gdGhpcy5wYXJzZShocmVmKTtcbiAgICBpZiAoZmFpbHVyZSkgdGhyb3cgbmV3IFR5cGVFcnJvcihmYWlsdXJlKTtcbiAgICB0aGlzLnNlYXJjaFBhcmFtcy51cGRhdGUoKTtcbiAgfSxcbiAgLy8gaHR0cHM6Ly91cmwuc3BlYy53aGF0d2cub3JnLyNkb20tdXJsLW9yaWdpblxuICBnZXRPcmlnaW46IGZ1bmN0aW9uICgpIHtcbiAgICB2YXIgc2NoZW1lID0gdGhpcy5zY2hlbWU7XG4gICAgdmFyIHBvcnQgPSB0aGlzLnBvcnQ7XG4gICAgaWYgKHNjaGVtZSA9PT0gJ2Jsb2InKSB0cnkge1xuICAgICAgcmV0dXJuIG5ldyBVUkxDb25zdHJ1Y3RvcihzY2hlbWUucGF0aFswXSkub3JpZ2luO1xuICAgIH0gY2F0Y2ggKGVycm9yKSB7XG4gICAgICByZXR1cm4gJ251bGwnO1xuICAgIH1cbiAgICBpZiAoc2NoZW1lID09PSAnZmlsZScgfHwgIXRoaXMuaXNTcGVjaWFsKCkpIHJldHVybiAnbnVsbCc7XG4gICAgcmV0dXJuIHNjaGVtZSArICc6Ly8nICsgc2VyaWFsaXplSG9zdCh0aGlzLmhvc3QpICsgKHBvcnQgIT09IG51bGwgPyAnOicgKyBwb3J0IDogJycpO1xuICB9LFxuICAvLyBodHRwczovL3VybC5zcGVjLndoYXR3Zy5vcmcvI2RvbS11cmwtcHJvdG9jb2xcbiAgZ2V0UHJvdG9jb2w6IGZ1bmN0aW9uICgpIHtcbiAgICByZXR1cm4gdGhpcy5zY2hlbWUgKyAnOic7XG4gIH0sXG4gIHNldFByb3RvY29sOiBmdW5jdGlvbiAocHJvdG9jb2wpIHtcbiAgICB0aGlzLnBhcnNlKCR0b1N0cmluZyhwcm90b2NvbCkgKyAnOicsIFNDSEVNRV9TVEFSVCk7XG4gIH0sXG4gIC8vIGh0dHBzOi8vdXJsLnNwZWMud2hhdHdnLm9yZy8jZG9tLXVybC11c2VybmFtZVxuICBnZXRVc2VybmFtZTogZnVuY3Rpb24gKCkge1xuICAgIHJldHVybiB0aGlzLnVzZXJuYW1lO1xuICB9LFxuICBzZXRVc2VybmFtZTogZnVuY3Rpb24gKHVzZXJuYW1lKSB7XG4gICAgdmFyIGNvZGVQb2ludHMgPSBhcnJheUZyb20oJHRvU3RyaW5nKHVzZXJuYW1lKSk7XG4gICAgaWYgKHRoaXMuY2Fubm90SGF2ZVVzZXJuYW1lUGFzc3dvcmRQb3J0KCkpIHJldHVybjtcbiAgICB0aGlzLnVzZXJuYW1lID0gJyc7XG4gICAgZm9yICh2YXIgaSA9IDA7IGkgPCBjb2RlUG9pbnRzLmxlbmd0aDsgaSsrKSB7XG4gICAgICB0aGlzLnVzZXJuYW1lICs9IHBlcmNlbnRFbmNvZGUoY29kZVBvaW50c1tpXSwgdXNlcmluZm9QZXJjZW50RW5jb2RlU2V0KTtcbiAgICB9XG4gIH0sXG4gIC8vIGh0dHBzOi8vdXJsLnNwZWMud2hhdHdnLm9yZy8jZG9tLXVybC1wYXNzd29yZFxuICBnZXRQYXNzd29yZDogZnVuY3Rpb24gKCkge1xuICAgIHJldHVybiB0aGlzLnBhc3N3b3JkO1xuICB9LFxuICBzZXRQYXNzd29yZDogZnVuY3Rpb24gKHBhc3N3b3JkKSB7XG4gICAgdmFyIGNvZGVQb2ludHMgPSBhcnJheUZyb20oJHRvU3RyaW5nKHBhc3N3b3JkKSk7XG4gICAgaWYgKHRoaXMuY2Fubm90SGF2ZVVzZXJuYW1lUGFzc3dvcmRQb3J0KCkpIHJldHVybjtcbiAgICB0aGlzLnBhc3N3b3JkID0gJyc7XG4gICAgZm9yICh2YXIgaSA9IDA7IGkgPCBjb2RlUG9pbnRzLmxlbmd0aDsgaSsrKSB7XG4gICAgICB0aGlzLnBhc3N3b3JkICs9IHBlcmNlbnRFbmNvZGUoY29kZVBvaW50c1tpXSwgdXNlcmluZm9QZXJjZW50RW5jb2RlU2V0KTtcbiAgICB9XG4gIH0sXG4gIC8vIGh0dHBzOi8vdXJsLnNwZWMud2hhdHdnLm9yZy8jZG9tLXVybC1ob3N0XG4gIGdldEhvc3Q6IGZ1bmN0aW9uICgpIHtcbiAgICB2YXIgaG9zdCA9IHRoaXMuaG9zdDtcbiAgICB2YXIgcG9ydCA9IHRoaXMucG9ydDtcbiAgICByZXR1cm4gaG9zdCA9PT0gbnVsbCA/ICcnXG4gICAgICA6IHBvcnQgPT09IG51bGwgPyBzZXJpYWxpemVIb3N0KGhvc3QpXG4gICAgICA6IHNlcmlhbGl6ZUhvc3QoaG9zdCkgKyAnOicgKyBwb3J0O1xuICB9LFxuICBzZXRIb3N0OiBmdW5jdGlvbiAoaG9zdCkge1xuICAgIGlmICh0aGlzLmNhbm5vdEJlQUJhc2VVUkwpIHJldHVybjtcbiAgICB0aGlzLnBhcnNlKGhvc3QsIEhPU1QpO1xuICB9LFxuICAvLyBodHRwczovL3VybC5zcGVjLndoYXR3Zy5vcmcvI2RvbS11cmwtaG9zdG5hbWVcbiAgZ2V0SG9zdG5hbWU6IGZ1bmN0aW9uICgpIHtcbiAgICB2YXIgaG9zdCA9IHRoaXMuaG9zdDtcbiAgICByZXR1cm4gaG9zdCA9PT0gbnVsbCA/ICcnIDogc2VyaWFsaXplSG9zdChob3N0KTtcbiAgfSxcbiAgc2V0SG9zdG5hbWU6IGZ1bmN0aW9uIChob3N0bmFtZSkge1xuICAgIGlmICh0aGlzLmNhbm5vdEJlQUJhc2VVUkwpIHJldHVybjtcbiAgICB0aGlzLnBhcnNlKGhvc3RuYW1lLCBIT1NUTkFNRSk7XG4gIH0sXG4gIC8vIGh0dHBzOi8vdXJsLnNwZWMud2hhdHdnLm9yZy8jZG9tLXVybC1wb3J0XG4gIGdldFBvcnQ6IGZ1bmN0aW9uICgpIHtcbiAgICB2YXIgcG9ydCA9IHRoaXMucG9ydDtcbiAgICByZXR1cm4gcG9ydCA9PT0gbnVsbCA/ICcnIDogJHRvU3RyaW5nKHBvcnQpO1xuICB9LFxuICBzZXRQb3J0OiBmdW5jdGlvbiAocG9ydCkge1xuICAgIGlmICh0aGlzLmNhbm5vdEhhdmVVc2VybmFtZVBhc3N3b3JkUG9ydCgpKSByZXR1cm47XG4gICAgcG9ydCA9ICR0b1N0cmluZyhwb3J0KTtcbiAgICBpZiAocG9ydCA9PT0gJycpIHRoaXMucG9ydCA9IG51bGw7XG4gICAgZWxzZSB0aGlzLnBhcnNlKHBvcnQsIFBPUlQpO1xuICB9LFxuICAvLyBodHRwczovL3VybC5zcGVjLndoYXR3Zy5vcmcvI2RvbS11cmwtcGF0aG5hbWVcbiAgZ2V0UGF0aG5hbWU6IGZ1bmN0aW9uICgpIHtcbiAgICB2YXIgcGF0aCA9IHRoaXMucGF0aDtcbiAgICByZXR1cm4gdGhpcy5jYW5ub3RCZUFCYXNlVVJMID8gcGF0aFswXSA6IHBhdGgubGVuZ3RoID8gJy8nICsgam9pbihwYXRoLCAnLycpIDogJyc7XG4gIH0sXG4gIHNldFBhdGhuYW1lOiBmdW5jdGlvbiAocGF0aG5hbWUpIHtcbiAgICBpZiAodGhpcy5jYW5ub3RCZUFCYXNlVVJMKSByZXR1cm47XG4gICAgdGhpcy5wYXRoID0gW107XG4gICAgdGhpcy5wYXJzZShwYXRobmFtZSwgUEFUSF9TVEFSVCk7XG4gIH0sXG4gIC8vIGh0dHBzOi8vdXJsLnNwZWMud2hhdHdnLm9yZy8jZG9tLXVybC1zZWFyY2hcbiAgZ2V0U2VhcmNoOiBmdW5jdGlvbiAoKSB7XG4gICAgdmFyIHF1ZXJ5ID0gdGhpcy5xdWVyeTtcbiAgICByZXR1cm4gcXVlcnkgPyAnPycgKyBxdWVyeSA6ICcnO1xuICB9LFxuICBzZXRTZWFyY2g6IGZ1bmN0aW9uIChzZWFyY2gpIHtcbiAgICBzZWFyY2ggPSAkdG9TdHJpbmcoc2VhcmNoKTtcbiAgICBpZiAoc2VhcmNoID09PSAnJykge1xuICAgICAgdGhpcy5xdWVyeSA9IG51bGw7XG4gICAgfSBlbHNlIHtcbiAgICAgIGlmIChjaGFyQXQoc2VhcmNoLCAwKSA9PT0gJz8nKSBzZWFyY2ggPSBzdHJpbmdTbGljZShzZWFyY2gsIDEpO1xuICAgICAgdGhpcy5xdWVyeSA9ICcnO1xuICAgICAgdGhpcy5wYXJzZShzZWFyY2gsIFFVRVJZKTtcbiAgICB9XG4gICAgdGhpcy5zZWFyY2hQYXJhbXMudXBkYXRlKCk7XG4gIH0sXG4gIC8vIGh0dHBzOi8vdXJsLnNwZWMud2hhdHdnLm9yZy8jZG9tLXVybC1zZWFyY2hwYXJhbXNcbiAgZ2V0U2VhcmNoUGFyYW1zOiBmdW5jdGlvbiAoKSB7XG4gICAgcmV0dXJuIHRoaXMuc2VhcmNoUGFyYW1zLmZhY2FkZTtcbiAgfSxcbiAgLy8gaHR0cHM6Ly91cmwuc3BlYy53aGF0d2cub3JnLyNkb20tdXJsLWhhc2hcbiAgZ2V0SGFzaDogZnVuY3Rpb24gKCkge1xuICAgIHZhciBmcmFnbWVudCA9IHRoaXMuZnJhZ21lbnQ7XG4gICAgcmV0dXJuIGZyYWdtZW50ID8gJyMnICsgZnJhZ21lbnQgOiAnJztcbiAgfSxcbiAgc2V0SGFzaDogZnVuY3Rpb24gKGhhc2gpIHtcbiAgICBoYXNoID0gJHRvU3RyaW5nKGhhc2gpO1xuICAgIGlmIChoYXNoID09PSAnJykge1xuICAgICAgdGhpcy5mcmFnbWVudCA9IG51bGw7XG4gICAgICByZXR1cm47XG4gICAgfVxuICAgIGlmIChjaGFyQXQoaGFzaCwgMCkgPT09ICcjJykgaGFzaCA9IHN0cmluZ1NsaWNlKGhhc2gsIDEpO1xuICAgIHRoaXMuZnJhZ21lbnQgPSAnJztcbiAgICB0aGlzLnBhcnNlKGhhc2gsIEZSQUdNRU5UKTtcbiAgfSxcbiAgdXBkYXRlOiBmdW5jdGlvbiAoKSB7XG4gICAgdGhpcy5xdWVyeSA9IHRoaXMuc2VhcmNoUGFyYW1zLnNlcmlhbGl6ZSgpIHx8IG51bGw7XG4gIH1cbn07XG5cbi8vIGBVUkxgIGNvbnN0cnVjdG9yXG4vLyBodHRwczovL3VybC5zcGVjLndoYXR3Zy5vcmcvI3VybC1jbGFzc1xudmFyIFVSTENvbnN0cnVjdG9yID0gZnVuY3Rpb24gVVJMKHVybCAvKiAsIGJhc2UgKi8pIHtcbiAgdmFyIHRoYXQgPSBhbkluc3RhbmNlKHRoaXMsIFVSTFByb3RvdHlwZSk7XG4gIHZhciBiYXNlID0gdmFsaWRhdGVBcmd1bWVudHNMZW5ndGgoYXJndW1lbnRzLmxlbmd0aCwgMSkgPiAxID8gYXJndW1lbnRzWzFdIDogdW5kZWZpbmVkO1xuICB2YXIgc3RhdGUgPSBzZXRJbnRlcm5hbFN0YXRlKHRoYXQsIG5ldyBVUkxTdGF0ZSh1cmwsIGZhbHNlLCBiYXNlKSk7XG4gIGlmICghREVTQ1JJUFRPUlMpIHtcbiAgICB0aGF0LmhyZWYgPSBzdGF0ZS5zZXJpYWxpemUoKTtcbiAgICB0aGF0Lm9yaWdpbiA9IHN0YXRlLmdldE9yaWdpbigpO1xuICAgIHRoYXQucHJvdG9jb2wgPSBzdGF0ZS5nZXRQcm90b2NvbCgpO1xuICAgIHRoYXQudXNlcm5hbWUgPSBzdGF0ZS5nZXRVc2VybmFtZSgpO1xuICAgIHRoYXQucGFzc3dvcmQgPSBzdGF0ZS5nZXRQYXNzd29yZCgpO1xuICAgIHRoYXQuaG9zdCA9IHN0YXRlLmdldEhvc3QoKTtcbiAgICB0aGF0Lmhvc3RuYW1lID0gc3RhdGUuZ2V0SG9zdG5hbWUoKTtcbiAgICB0aGF0LnBvcnQgPSBzdGF0ZS5nZXRQb3J0KCk7XG4gICAgdGhhdC5wYXRobmFtZSA9IHN0YXRlLmdldFBhdGhuYW1lKCk7XG4gICAgdGhhdC5zZWFyY2ggPSBzdGF0ZS5nZXRTZWFyY2goKTtcbiAgICB0aGF0LnNlYXJjaFBhcmFtcyA9IHN0YXRlLmdldFNlYXJjaFBhcmFtcygpO1xuICAgIHRoYXQuaGFzaCA9IHN0YXRlLmdldEhhc2goKTtcbiAgfVxufTtcblxudmFyIFVSTFByb3RvdHlwZSA9IFVSTENvbnN0cnVjdG9yLnByb3RvdHlwZTtcblxudmFyIGFjY2Vzc29yRGVzY3JpcHRvciA9IGZ1bmN0aW9uIChnZXR0ZXIsIHNldHRlcikge1xuICByZXR1cm4ge1xuICAgIGdldDogZnVuY3Rpb24gKCkge1xuICAgICAgcmV0dXJuIGdldEludGVybmFsVVJMU3RhdGUodGhpcylbZ2V0dGVyXSgpO1xuICAgIH0sXG4gICAgc2V0OiBzZXR0ZXIgJiYgZnVuY3Rpb24gKHZhbHVlKSB7XG4gICAgICByZXR1cm4gZ2V0SW50ZXJuYWxVUkxTdGF0ZSh0aGlzKVtzZXR0ZXJdKHZhbHVlKTtcbiAgICB9LFxuICAgIGNvbmZpZ3VyYWJsZTogdHJ1ZSxcbiAgICBlbnVtZXJhYmxlOiB0cnVlXG4gIH07XG59O1xuXG5pZiAoREVTQ1JJUFRPUlMpIHtcbiAgLy8gYFVSTC5wcm90b3R5cGUuaHJlZmAgYWNjZXNzb3JzIHBhaXJcbiAgLy8gaHR0cHM6Ly91cmwuc3BlYy53aGF0d2cub3JnLyNkb20tdXJsLWhyZWZcbiAgZGVmaW5lQnVpbHRJbkFjY2Vzc29yKFVSTFByb3RvdHlwZSwgJ2hyZWYnLCBhY2Nlc3NvckRlc2NyaXB0b3IoJ3NlcmlhbGl6ZScsICdzZXRIcmVmJykpO1xuICAvLyBgVVJMLnByb3RvdHlwZS5vcmlnaW5gIGdldHRlclxuICAvLyBodHRwczovL3VybC5zcGVjLndoYXR3Zy5vcmcvI2RvbS11cmwtb3JpZ2luXG4gIGRlZmluZUJ1aWx0SW5BY2Nlc3NvcihVUkxQcm90b3R5cGUsICdvcmlnaW4nLCBhY2Nlc3NvckRlc2NyaXB0b3IoJ2dldE9yaWdpbicpKTtcbiAgLy8gYFVSTC5wcm90b3R5cGUucHJvdG9jb2xgIGFjY2Vzc29ycyBwYWlyXG4gIC8vIGh0dHBzOi8vdXJsLnNwZWMud2hhdHdnLm9yZy8jZG9tLXVybC1wcm90b2NvbFxuICBkZWZpbmVCdWlsdEluQWNjZXNzb3IoVVJMUHJvdG90eXBlLCAncHJvdG9jb2wnLCBhY2Nlc3NvckRlc2NyaXB0b3IoJ2dldFByb3RvY29sJywgJ3NldFByb3RvY29sJykpO1xuICAvLyBgVVJMLnByb3RvdHlwZS51c2VybmFtZWAgYWNjZXNzb3JzIHBhaXJcbiAgLy8gaHR0cHM6Ly91cmwuc3BlYy53aGF0d2cub3JnLyNkb20tdXJsLXVzZXJuYW1lXG4gIGRlZmluZUJ1aWx0SW5BY2Nlc3NvcihVUkxQcm90b3R5cGUsICd1c2VybmFtZScsIGFjY2Vzc29yRGVzY3JpcHRvcignZ2V0VXNlcm5hbWUnLCAnc2V0VXNlcm5hbWUnKSk7XG4gIC8vIGBVUkwucHJvdG90eXBlLnBhc3N3b3JkYCBhY2Nlc3NvcnMgcGFpclxuICAvLyBodHRwczovL3VybC5zcGVjLndoYXR3Zy5vcmcvI2RvbS11cmwtcGFzc3dvcmRcbiAgZGVmaW5lQnVpbHRJbkFjY2Vzc29yKFVSTFByb3RvdHlwZSwgJ3Bhc3N3b3JkJywgYWNjZXNzb3JEZXNjcmlwdG9yKCdnZXRQYXNzd29yZCcsICdzZXRQYXNzd29yZCcpKTtcbiAgLy8gYFVSTC5wcm90b3R5cGUuaG9zdGAgYWNjZXNzb3JzIHBhaXJcbiAgLy8gaHR0cHM6Ly91cmwuc3BlYy53aGF0d2cub3JnLyNkb20tdXJsLWhvc3RcbiAgZGVmaW5lQnVpbHRJbkFjY2Vzc29yKFVSTFByb3RvdHlwZSwgJ2hvc3QnLCBhY2Nlc3NvckRlc2NyaXB0b3IoJ2dldEhvc3QnLCAnc2V0SG9zdCcpKTtcbiAgLy8gYFVSTC5wcm90b3R5cGUuaG9zdG5hbWVgIGFjY2Vzc29ycyBwYWlyXG4gIC8vIGh0dHBzOi8vdXJsLnNwZWMud2hhdHdnLm9yZy8jZG9tLXVybC1ob3N0bmFtZVxuICBkZWZpbmVCdWlsdEluQWNjZXNzb3IoVVJMUHJvdG90eXBlLCAnaG9zdG5hbWUnLCBhY2Nlc3NvckRlc2NyaXB0b3IoJ2dldEhvc3RuYW1lJywgJ3NldEhvc3RuYW1lJykpO1xuICAvLyBgVVJMLnByb3RvdHlwZS5wb3J0YCBhY2Nlc3NvcnMgcGFpclxuICAvLyBodHRwczovL3VybC5zcGVjLndoYXR3Zy5vcmcvI2RvbS11cmwtcG9ydFxuICBkZWZpbmVCdWlsdEluQWNjZXNzb3IoVVJMUHJvdG90eXBlLCAncG9ydCcsIGFjY2Vzc29yRGVzY3JpcHRvcignZ2V0UG9ydCcsICdzZXRQb3J0JykpO1xuICAvLyBgVVJMLnByb3RvdHlwZS5wYXRobmFtZWAgYWNjZXNzb3JzIHBhaXJcbiAgLy8gaHR0cHM6Ly91cmwuc3BlYy53aGF0d2cub3JnLyNkb20tdXJsLXBhdGhuYW1lXG4gIGRlZmluZUJ1aWx0SW5BY2Nlc3NvcihVUkxQcm90b3R5cGUsICdwYXRobmFtZScsIGFjY2Vzc29yRGVzY3JpcHRvcignZ2V0UGF0aG5hbWUnLCAnc2V0UGF0aG5hbWUnKSk7XG4gIC8vIGBVUkwucHJvdG90eXBlLnNlYXJjaGAgYWNjZXNzb3JzIHBhaXJcbiAgLy8gaHR0cHM6Ly91cmwuc3BlYy53aGF0d2cub3JnLyNkb20tdXJsLXNlYXJjaFxuICBkZWZpbmVCdWlsdEluQWNjZXNzb3IoVVJMUHJvdG90eXBlLCAnc2VhcmNoJywgYWNjZXNzb3JEZXNjcmlwdG9yKCdnZXRTZWFyY2gnLCAnc2V0U2VhcmNoJykpO1xuICAvLyBgVVJMLnByb3RvdHlwZS5zZWFyY2hQYXJhbXNgIGdldHRlclxuICAvLyBodHRwczovL3VybC5zcGVjLndoYXR3Zy5vcmcvI2RvbS11cmwtc2VhcmNocGFyYW1zXG4gIGRlZmluZUJ1aWx0SW5BY2Nlc3NvcihVUkxQcm90b3R5cGUsICdzZWFyY2hQYXJhbXMnLCBhY2Nlc3NvckRlc2NyaXB0b3IoJ2dldFNlYXJjaFBhcmFtcycpKTtcbiAgLy8gYFVSTC5wcm90b3R5cGUuaGFzaGAgYWNjZXNzb3JzIHBhaXJcbiAgLy8gaHR0cHM6Ly91cmwuc3BlYy53aGF0d2cub3JnLyNkb20tdXJsLWhhc2hcbiAgZGVmaW5lQnVpbHRJbkFjY2Vzc29yKFVSTFByb3RvdHlwZSwgJ2hhc2gnLCBhY2Nlc3NvckRlc2NyaXB0b3IoJ2dldEhhc2gnLCAnc2V0SGFzaCcpKTtcbn1cblxuLy8gYFVSTC5wcm90b3R5cGUudG9KU09OYCBtZXRob2Rcbi8vIGh0dHBzOi8vdXJsLnNwZWMud2hhdHdnLm9yZy8jZG9tLXVybC10b2pzb25cbmRlZmluZUJ1aWx0SW4oVVJMUHJvdG90eXBlLCAndG9KU09OJywgZnVuY3Rpb24gdG9KU09OKCkge1xuICByZXR1cm4gZ2V0SW50ZXJuYWxVUkxTdGF0ZSh0aGlzKS5zZXJpYWxpemUoKTtcbn0sIHsgZW51bWVyYWJsZTogdHJ1ZSB9KTtcblxuLy8gYFVSTC5wcm90b3R5cGUudG9TdHJpbmdgIG1ldGhvZFxuLy8gaHR0cHM6Ly91cmwuc3BlYy53aGF0d2cub3JnLyNVUkwtc3RyaW5naWZpY2F0aW9uLWJlaGF2aW9yXG5kZWZpbmVCdWlsdEluKFVSTFByb3RvdHlwZSwgJ3RvU3RyaW5nJywgZnVuY3Rpb24gdG9TdHJpbmcoKSB7XG4gIHJldHVybiBnZXRJbnRlcm5hbFVSTFN0YXRlKHRoaXMpLnNlcmlhbGl6ZSgpO1xufSwgeyBlbnVtZXJhYmxlOiB0cnVlIH0pO1xuXG5pZiAoTmF0aXZlVVJMKSB7XG4gIHZhciBuYXRpdmVDcmVhdGVPYmplY3RVUkwgPSBOYXRpdmVVUkwuY3JlYXRlT2JqZWN0VVJMO1xuICB2YXIgbmF0aXZlUmV2b2tlT2JqZWN0VVJMID0gTmF0aXZlVVJMLnJldm9rZU9iamVjdFVSTDtcbiAgLy8gYFVSTC5jcmVhdGVPYmplY3RVUkxgIG1ldGhvZFxuICAvLyBodHRwczovL2RldmVsb3Blci5tb3ppbGxhLm9yZy9lbi1VUy9kb2NzL1dlYi9BUEkvVVJML2NyZWF0ZU9iamVjdFVSTFxuICBpZiAobmF0aXZlQ3JlYXRlT2JqZWN0VVJMKSBkZWZpbmVCdWlsdEluKFVSTENvbnN0cnVjdG9yLCAnY3JlYXRlT2JqZWN0VVJMJywgYmluZChuYXRpdmVDcmVhdGVPYmplY3RVUkwsIE5hdGl2ZVVSTCkpO1xuICAvLyBgVVJMLnJldm9rZU9iamVjdFVSTGAgbWV0aG9kXG4gIC8vIGh0dHBzOi8vZGV2ZWxvcGVyLm1vemlsbGEub3JnL2VuLVVTL2RvY3MvV2ViL0FQSS9VUkwvcmV2b2tlT2JqZWN0VVJMXG4gIGlmIChuYXRpdmVSZXZva2VPYmplY3RVUkwpIGRlZmluZUJ1aWx0SW4oVVJMQ29uc3RydWN0b3IsICdyZXZva2VPYmplY3RVUkwnLCBiaW5kKG5hdGl2ZVJldm9rZU9iamVjdFVSTCwgTmF0aXZlVVJMKSk7XG59XG5cbnNldFRvU3RyaW5nVGFnKFVSTENvbnN0cnVjdG9yLCAnVVJMJyk7XG5cbiQoeyBnbG9iYWw6IHRydWUsIGNvbnN0cnVjdG9yOiB0cnVlLCBmb3JjZWQ6ICFVU0VfTkFUSVZFX1VSTCwgc2hhbTogIURFU0NSSVBUT1JTIH0sIHtcbiAgVVJMOiBVUkxDb25zdHJ1Y3RvclxufSk7XG4iLCIndXNlIHN0cmljdCc7XG4vLyBUT0RPOiBSZW1vdmUgdGhpcyBtb2R1bGUgZnJvbSBgY29yZS1qc0A0YCBzaW5jZSBpdCdzIHJlcGxhY2VkIHRvIG1vZHVsZSBiZWxvd1xucmVxdWlyZSgnLi4vbW9kdWxlcy93ZWIudXJsLmNvbnN0cnVjdG9yJyk7XG4iLCIvLyBUaGUgbW9kdWxlIGNhY2hlXG52YXIgX193ZWJwYWNrX21vZHVsZV9jYWNoZV9fID0ge307XG5cbi8vIFRoZSByZXF1aXJlIGZ1bmN0aW9uXG5mdW5jdGlvbiBfX3dlYnBhY2tfcmVxdWlyZV9fKG1vZHVsZUlkKSB7XG5cdC8vIENoZWNrIGlmIG1vZHVsZSBpcyBpbiBjYWNoZVxuXHR2YXIgY2FjaGVkTW9kdWxlID0gX193ZWJwYWNrX21vZHVsZV9jYWNoZV9fW21vZHVsZUlkXTtcblx0aWYgKGNhY2hlZE1vZHVsZSAhPT0gdW5kZWZpbmVkKSB7XG5cdFx0cmV0dXJuIGNhY2hlZE1vZHVsZS5leHBvcnRzO1xuXHR9XG5cdC8vIENyZWF0ZSBhIG5ldyBtb2R1bGUgKGFuZCBwdXQgaXQgaW50byB0aGUgY2FjaGUpXG5cdHZhciBtb2R1bGUgPSBfX3dlYnBhY2tfbW9kdWxlX2NhY2hlX19bbW9kdWxlSWRdID0ge1xuXHRcdC8vIG5vIG1vZHVsZS5pZCBuZWVkZWRcblx0XHQvLyBubyBtb2R1bGUubG9hZGVkIG5lZWRlZFxuXHRcdGV4cG9ydHM6IHt9XG5cdH07XG5cblx0Ly8gRXhlY3V0ZSB0aGUgbW9kdWxlIGZ1bmN0aW9uXG5cdF9fd2VicGFja19tb2R1bGVzX19bbW9kdWxlSWRdLmNhbGwobW9kdWxlLmV4cG9ydHMsIG1vZHVsZSwgbW9kdWxlLmV4cG9ydHMsIF9fd2VicGFja19yZXF1aXJlX18pO1xuXG5cdC8vIFJldHVybiB0aGUgZXhwb3J0cyBvZiB0aGUgbW9kdWxlXG5cdHJldHVybiBtb2R1bGUuZXhwb3J0cztcbn1cblxuLy8gZXhwb3NlIHRoZSBtb2R1bGVzIG9iamVjdCAoX193ZWJwYWNrX21vZHVsZXNfXylcbl9fd2VicGFja19yZXF1aXJlX18ubSA9IF9fd2VicGFja19tb2R1bGVzX187XG5cbiIsIi8vIGdldERlZmF1bHRFeHBvcnQgZnVuY3Rpb24gZm9yIGNvbXBhdGliaWxpdHkgd2l0aCBub24taGFybW9ueSBtb2R1bGVzXG5fX3dlYnBhY2tfcmVxdWlyZV9fLm4gPSAobW9kdWxlKSA9PiB7XG5cdHZhciBnZXR0ZXIgPSBtb2R1bGUgJiYgbW9kdWxlLl9fZXNNb2R1bGUgP1xuXHRcdCgpID0+IChtb2R1bGVbJ2RlZmF1bHQnXSkgOlxuXHRcdCgpID0+IChtb2R1bGUpO1xuXHRfX3dlYnBhY2tfcmVxdWlyZV9fLmQoZ2V0dGVyLCB7IGE6IGdldHRlciB9KTtcblx0cmV0dXJuIGdldHRlcjtcbn07IiwiLy8gZGVmaW5lIGdldHRlciBmdW5jdGlvbnMgZm9yIGhhcm1vbnkgZXhwb3J0c1xuX193ZWJwYWNrX3JlcXVpcmVfXy5kID0gKGV4cG9ydHMsIGRlZmluaXRpb24pID0+IHtcblx0Zm9yKHZhciBrZXkgaW4gZGVmaW5pdGlvbikge1xuXHRcdGlmKF9fd2VicGFja19yZXF1aXJlX18ubyhkZWZpbml0aW9uLCBrZXkpICYmICFfX3dlYnBhY2tfcmVxdWlyZV9fLm8oZXhwb3J0cywga2V5KSkge1xuXHRcdFx0T2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIGtleSwgeyBlbnVtZXJhYmxlOiB0cnVlLCBnZXQ6IGRlZmluaXRpb25ba2V5XSB9KTtcblx0XHR9XG5cdH1cbn07IiwiX193ZWJwYWNrX3JlcXVpcmVfXy5mID0ge307XG4vLyBUaGlzIGZpbGUgY29udGFpbnMgb25seSB0aGUgZW50cnkgY2h1bmsuXG4vLyBUaGUgY2h1bmsgbG9hZGluZyBmdW5jdGlvbiBmb3IgYWRkaXRpb25hbCBjaHVua3Ncbl9fd2VicGFja19yZXF1aXJlX18uZSA9IChjaHVua0lkKSA9PiB7XG5cdHJldHVybiBQcm9taXNlLmFsbChPYmplY3Qua2V5cyhfX3dlYnBhY2tfcmVxdWlyZV9fLmYpLnJlZHVjZSgocHJvbWlzZXMsIGtleSkgPT4ge1xuXHRcdF9fd2VicGFja19yZXF1aXJlX18uZltrZXldKGNodW5rSWQsIHByb21pc2VzKTtcblx0XHRyZXR1cm4gcHJvbWlzZXM7XG5cdH0sIFtdKSk7XG59OyIsIi8vIFRoaXMgZnVuY3Rpb24gYWxsb3cgdG8gcmVmZXJlbmNlIGFzeW5jIGNodW5rc1xuX193ZWJwYWNrX3JlcXVpcmVfXy51ID0gKGNodW5rSWQpID0+IHtcblx0Ly8gcmV0dXJuIHVybCBmb3IgZmlsZW5hbWVzIGJhc2VkIG9uIHRlbXBsYXRlXG5cdHJldHVybiBcIlwiICsgY2h1bmtJZCArIFwiLmpzXCI7XG59OyIsIi8vIFRoaXMgZnVuY3Rpb24gYWxsb3cgdG8gcmVmZXJlbmNlIGFzeW5jIGNodW5rc1xuX193ZWJwYWNrX3JlcXVpcmVfXy5taW5pQ3NzRiA9IChjaHVua0lkKSA9PiB7XG5cdC8vIHJldHVybiB1cmwgZm9yIGZpbGVuYW1lcyBiYXNlZCBvbiB0ZW1wbGF0ZVxuXHRyZXR1cm4gdW5kZWZpbmVkO1xufTsiLCJfX3dlYnBhY2tfcmVxdWlyZV9fLmcgPSAoZnVuY3Rpb24oKSB7XG5cdGlmICh0eXBlb2YgZ2xvYmFsVGhpcyA9PT0gJ29iamVjdCcpIHJldHVybiBnbG9iYWxUaGlzO1xuXHR0cnkge1xuXHRcdHJldHVybiB0aGlzIHx8IG5ldyBGdW5jdGlvbigncmV0dXJuIHRoaXMnKSgpO1xuXHR9IGNhdGNoIChlKSB7XG5cdFx0aWYgKHR5cGVvZiB3aW5kb3cgPT09ICdvYmplY3QnKSByZXR1cm4gd2luZG93O1xuXHR9XG59KSgpOyIsIl9fd2VicGFja19yZXF1aXJlX18ubyA9IChvYmosIHByb3ApID0+IChPYmplY3QucHJvdG90eXBlLmhhc093blByb3BlcnR5LmNhbGwob2JqLCBwcm9wKSkiLCJ2YXIgaW5Qcm9ncmVzcyA9IHt9O1xuLy8gZGF0YS13ZWJwYWNrIGlzIG5vdCB1c2VkIGFzIGJ1aWxkIGhhcyBubyB1bmlxdWVOYW1lXG4vLyBsb2FkU2NyaXB0IGZ1bmN0aW9uIHRvIGxvYWQgYSBzY3JpcHQgdmlhIHNjcmlwdCB0YWdcbl9fd2VicGFja19yZXF1aXJlX18ubCA9ICh1cmwsIGRvbmUsIGtleSwgY2h1bmtJZCkgPT4ge1xuXHRpZihpblByb2dyZXNzW3VybF0pIHsgaW5Qcm9ncmVzc1t1cmxdLnB1c2goZG9uZSk7IHJldHVybjsgfVxuXHR2YXIgc2NyaXB0LCBuZWVkQXR0YWNoO1xuXHRpZihrZXkgIT09IHVuZGVmaW5lZCkge1xuXHRcdHZhciBzY3JpcHRzID0gZG9jdW1lbnQuZ2V0RWxlbWVudHNCeVRhZ05hbWUoXCJzY3JpcHRcIik7XG5cdFx0Zm9yKHZhciBpID0gMDsgaSA8IHNjcmlwdHMubGVuZ3RoOyBpKyspIHtcblx0XHRcdHZhciBzID0gc2NyaXB0c1tpXTtcblx0XHRcdGlmKHMuZ2V0QXR0cmlidXRlKFwic3JjXCIpID09IHVybCkgeyBzY3JpcHQgPSBzOyBicmVhazsgfVxuXHRcdH1cblx0fVxuXHRpZighc2NyaXB0KSB7XG5cdFx0bmVlZEF0dGFjaCA9IHRydWU7XG5cdFx0c2NyaXB0ID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnc2NyaXB0Jyk7XG5cblx0XHRzY3JpcHQuY2hhcnNldCA9ICd1dGYtOCc7XG5cdFx0c2NyaXB0LnRpbWVvdXQgPSAxMjA7XG5cdFx0aWYgKF9fd2VicGFja19yZXF1aXJlX18ubmMpIHtcblx0XHRcdHNjcmlwdC5zZXRBdHRyaWJ1dGUoXCJub25jZVwiLCBfX3dlYnBhY2tfcmVxdWlyZV9fLm5jKTtcblx0XHR9XG5cblx0XHRzY3JpcHQuc3JjID0gdXJsO1xuXHR9XG5cdGluUHJvZ3Jlc3NbdXJsXSA9IFtkb25lXTtcblx0dmFyIG9uU2NyaXB0Q29tcGxldGUgPSAocHJldiwgZXZlbnQpID0+IHtcblx0XHQvLyBhdm9pZCBtZW0gbGVha3MgaW4gSUUuXG5cdFx0c2NyaXB0Lm9uZXJyb3IgPSBzY3JpcHQub25sb2FkID0gbnVsbDtcblx0XHRjbGVhclRpbWVvdXQodGltZW91dCk7XG5cdFx0dmFyIGRvbmVGbnMgPSBpblByb2dyZXNzW3VybF07XG5cdFx0ZGVsZXRlIGluUHJvZ3Jlc3NbdXJsXTtcblx0XHRzY3JpcHQucGFyZW50Tm9kZSAmJiBzY3JpcHQucGFyZW50Tm9kZS5yZW1vdmVDaGlsZChzY3JpcHQpO1xuXHRcdGRvbmVGbnMgJiYgZG9uZUZucy5mb3JFYWNoKChmbikgPT4gKGZuKGV2ZW50KSkpO1xuXHRcdGlmKHByZXYpIHJldHVybiBwcmV2KGV2ZW50KTtcblx0fTtcblx0dmFyIHRpbWVvdXQgPSBzZXRUaW1lb3V0KG9uU2NyaXB0Q29tcGxldGUuYmluZChudWxsLCB1bmRlZmluZWQsIHsgdHlwZTogJ3RpbWVvdXQnLCB0YXJnZXQ6IHNjcmlwdCB9KSwgMTIwMDAwKTtcblx0c2NyaXB0Lm9uZXJyb3IgPSBvblNjcmlwdENvbXBsZXRlLmJpbmQobnVsbCwgc2NyaXB0Lm9uZXJyb3IpO1xuXHRzY3JpcHQub25sb2FkID0gb25TY3JpcHRDb21wbGV0ZS5iaW5kKG51bGwsIHNjcmlwdC5vbmxvYWQpO1xuXHRuZWVkQXR0YWNoICYmIGRvY3VtZW50LmhlYWQuYXBwZW5kQ2hpbGQoc2NyaXB0KTtcbn07IiwiLy8gZGVmaW5lIF9fZXNNb2R1bGUgb24gZXhwb3J0c1xuX193ZWJwYWNrX3JlcXVpcmVfXy5yID0gKGV4cG9ydHMpID0+IHtcblx0aWYodHlwZW9mIFN5bWJvbCAhPT0gJ3VuZGVmaW5lZCcgJiYgU3ltYm9sLnRvU3RyaW5nVGFnKSB7XG5cdFx0T2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIFN5bWJvbC50b1N0cmluZ1RhZywgeyB2YWx1ZTogJ01vZHVsZScgfSk7XG5cdH1cblx0T2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsICdfX2VzTW9kdWxlJywgeyB2YWx1ZTogdHJ1ZSB9KTtcbn07IiwidmFyIHNjcmlwdFVybDtcbmlmIChfX3dlYnBhY2tfcmVxdWlyZV9fLmcuaW1wb3J0U2NyaXB0cykgc2NyaXB0VXJsID0gX193ZWJwYWNrX3JlcXVpcmVfXy5nLmxvY2F0aW9uICsgXCJcIjtcbnZhciBkb2N1bWVudCA9IF9fd2VicGFja19yZXF1aXJlX18uZy5kb2N1bWVudDtcbmlmICghc2NyaXB0VXJsICYmIGRvY3VtZW50KSB7XG5cdGlmIChkb2N1bWVudC5jdXJyZW50U2NyaXB0KVxuXHRcdHNjcmlwdFVybCA9IGRvY3VtZW50LmN1cnJlbnRTY3JpcHQuc3JjXG5cdGlmICghc2NyaXB0VXJsKSB7XG5cdFx0dmFyIHNjcmlwdHMgPSBkb2N1bWVudC5nZXRFbGVtZW50c0J5VGFnTmFtZShcInNjcmlwdFwiKTtcblx0XHRpZihzY3JpcHRzLmxlbmd0aCkgc2NyaXB0VXJsID0gc2NyaXB0c1tzY3JpcHRzLmxlbmd0aCAtIDFdLnNyY1xuXHR9XG59XG4vLyBXaGVuIHN1cHBvcnRpbmcgYnJvd3NlcnMgd2hlcmUgYW4gYXV0b21hdGljIHB1YmxpY1BhdGggaXMgbm90IHN1cHBvcnRlZCB5b3UgbXVzdCBzcGVjaWZ5IGFuIG91dHB1dC5wdWJsaWNQYXRoIG1hbnVhbGx5IHZpYSBjb25maWd1cmF0aW9uXG4vLyBvciBwYXNzIGFuIGVtcHR5IHN0cmluZyAoXCJcIikgYW5kIHNldCB0aGUgX193ZWJwYWNrX3B1YmxpY19wYXRoX18gdmFyaWFibGUgZnJvbSB5b3VyIGNvZGUgdG8gdXNlIHlvdXIgb3duIGxvZ2ljLlxuaWYgKCFzY3JpcHRVcmwpIHRocm93IG5ldyBFcnJvcihcIkF1dG9tYXRpYyBwdWJsaWNQYXRoIGlzIG5vdCBzdXBwb3J0ZWQgaW4gdGhpcyBicm93c2VyXCIpO1xuc2NyaXB0VXJsID0gc2NyaXB0VXJsLnJlcGxhY2UoLyMuKiQvLCBcIlwiKS5yZXBsYWNlKC9cXD8uKiQvLCBcIlwiKS5yZXBsYWNlKC9cXC9bXlxcL10rJC8sIFwiL1wiKTtcbl9fd2VicGFja19yZXF1aXJlX18ucCA9IHNjcmlwdFVybDsiLCIvLyBubyBiYXNlVVJJXG5cbi8vIG9iamVjdCB0byBzdG9yZSBsb2FkZWQgYW5kIGxvYWRpbmcgY2h1bmtzXG4vLyB1bmRlZmluZWQgPSBjaHVuayBub3QgbG9hZGVkLCBudWxsID0gY2h1bmsgcHJlbG9hZGVkL3ByZWZldGNoZWRcbi8vIFtyZXNvbHZlLCByZWplY3QsIFByb21pc2VdID0gY2h1bmsgbG9hZGluZywgMCA9IGNodW5rIGxvYWRlZFxudmFyIGluc3RhbGxlZENodW5rcyA9IHtcblx0XCJtYWluXCI6IDBcbn07XG5cbl9fd2VicGFja19yZXF1aXJlX18uZi5qID0gKGNodW5rSWQsIHByb21pc2VzKSA9PiB7XG5cdFx0Ly8gSlNPTlAgY2h1bmsgbG9hZGluZyBmb3IgamF2YXNjcmlwdFxuXHRcdHZhciBpbnN0YWxsZWRDaHVua0RhdGEgPSBfX3dlYnBhY2tfcmVxdWlyZV9fLm8oaW5zdGFsbGVkQ2h1bmtzLCBjaHVua0lkKSA/IGluc3RhbGxlZENodW5rc1tjaHVua0lkXSA6IHVuZGVmaW5lZDtcblx0XHRpZihpbnN0YWxsZWRDaHVua0RhdGEgIT09IDApIHsgLy8gMCBtZWFucyBcImFscmVhZHkgaW5zdGFsbGVkXCIuXG5cblx0XHRcdC8vIGEgUHJvbWlzZSBtZWFucyBcImN1cnJlbnRseSBsb2FkaW5nXCIuXG5cdFx0XHRpZihpbnN0YWxsZWRDaHVua0RhdGEpIHtcblx0XHRcdFx0cHJvbWlzZXMucHVzaChpbnN0YWxsZWRDaHVua0RhdGFbMl0pO1xuXHRcdFx0fSBlbHNlIHtcblx0XHRcdFx0aWYodHJ1ZSkgeyAvLyBhbGwgY2h1bmtzIGhhdmUgSlNcblx0XHRcdFx0XHQvLyBzZXR1cCBQcm9taXNlIGluIGNodW5rIGNhY2hlXG5cdFx0XHRcdFx0dmFyIHByb21pc2UgPSBuZXcgUHJvbWlzZSgocmVzb2x2ZSwgcmVqZWN0KSA9PiAoaW5zdGFsbGVkQ2h1bmtEYXRhID0gaW5zdGFsbGVkQ2h1bmtzW2NodW5rSWRdID0gW3Jlc29sdmUsIHJlamVjdF0pKTtcblx0XHRcdFx0XHRwcm9taXNlcy5wdXNoKGluc3RhbGxlZENodW5rRGF0YVsyXSA9IHByb21pc2UpO1xuXG5cdFx0XHRcdFx0Ly8gc3RhcnQgY2h1bmsgbG9hZGluZ1xuXHRcdFx0XHRcdHZhciB1cmwgPSBfX3dlYnBhY2tfcmVxdWlyZV9fLnAgKyBfX3dlYnBhY2tfcmVxdWlyZV9fLnUoY2h1bmtJZCk7XG5cdFx0XHRcdFx0Ly8gY3JlYXRlIGVycm9yIGJlZm9yZSBzdGFjayB1bndvdW5kIHRvIGdldCB1c2VmdWwgc3RhY2t0cmFjZSBsYXRlclxuXHRcdFx0XHRcdHZhciBlcnJvciA9IG5ldyBFcnJvcigpO1xuXHRcdFx0XHRcdHZhciBsb2FkaW5nRW5kZWQgPSAoZXZlbnQpID0+IHtcblx0XHRcdFx0XHRcdGlmKF9fd2VicGFja19yZXF1aXJlX18ubyhpbnN0YWxsZWRDaHVua3MsIGNodW5rSWQpKSB7XG5cdFx0XHRcdFx0XHRcdGluc3RhbGxlZENodW5rRGF0YSA9IGluc3RhbGxlZENodW5rc1tjaHVua0lkXTtcblx0XHRcdFx0XHRcdFx0aWYoaW5zdGFsbGVkQ2h1bmtEYXRhICE9PSAwKSBpbnN0YWxsZWRDaHVua3NbY2h1bmtJZF0gPSB1bmRlZmluZWQ7XG5cdFx0XHRcdFx0XHRcdGlmKGluc3RhbGxlZENodW5rRGF0YSkge1xuXHRcdFx0XHRcdFx0XHRcdHZhciBlcnJvclR5cGUgPSBldmVudCAmJiAoZXZlbnQudHlwZSA9PT0gJ2xvYWQnID8gJ21pc3NpbmcnIDogZXZlbnQudHlwZSk7XG5cdFx0XHRcdFx0XHRcdFx0dmFyIHJlYWxTcmMgPSBldmVudCAmJiBldmVudC50YXJnZXQgJiYgZXZlbnQudGFyZ2V0LnNyYztcblx0XHRcdFx0XHRcdFx0XHRlcnJvci5tZXNzYWdlID0gJ0xvYWRpbmcgY2h1bmsgJyArIGNodW5rSWQgKyAnIGZhaWxlZC5cXG4oJyArIGVycm9yVHlwZSArICc6ICcgKyByZWFsU3JjICsgJyknO1xuXHRcdFx0XHRcdFx0XHRcdGVycm9yLm5hbWUgPSAnQ2h1bmtMb2FkRXJyb3InO1xuXHRcdFx0XHRcdFx0XHRcdGVycm9yLnR5cGUgPSBlcnJvclR5cGU7XG5cdFx0XHRcdFx0XHRcdFx0ZXJyb3IucmVxdWVzdCA9IHJlYWxTcmM7XG5cdFx0XHRcdFx0XHRcdFx0aW5zdGFsbGVkQ2h1bmtEYXRhWzFdKGVycm9yKTtcblx0XHRcdFx0XHRcdFx0fVxuXHRcdFx0XHRcdFx0fVxuXHRcdFx0XHRcdH07XG5cdFx0XHRcdFx0X193ZWJwYWNrX3JlcXVpcmVfXy5sKHVybCwgbG9hZGluZ0VuZGVkLCBcImNodW5rLVwiICsgY2h1bmtJZCwgY2h1bmtJZCk7XG5cdFx0XHRcdH0gZWxzZSBpbnN0YWxsZWRDaHVua3NbY2h1bmtJZF0gPSAwO1xuXHRcdFx0fVxuXHRcdH1cbn07XG5cbi8vIG5vIHByZWZldGNoaW5nXG5cbi8vIG5vIHByZWxvYWRlZFxuXG4vLyBubyBITVJcblxuLy8gbm8gSE1SIG1hbmlmZXN0XG5cbi8vIG5vIG9uIGNodW5rcyBsb2FkZWRcblxuLy8gaW5zdGFsbCBhIEpTT05QIGNhbGxiYWNrIGZvciBjaHVuayBsb2FkaW5nXG52YXIgd2VicGFja0pzb25wQ2FsbGJhY2sgPSAocGFyZW50Q2h1bmtMb2FkaW5nRnVuY3Rpb24sIGRhdGEpID0+IHtcblx0dmFyIFtjaHVua0lkcywgbW9yZU1vZHVsZXMsIHJ1bnRpbWVdID0gZGF0YTtcblx0Ly8gYWRkIFwibW9yZU1vZHVsZXNcIiB0byB0aGUgbW9kdWxlcyBvYmplY3QsXG5cdC8vIHRoZW4gZmxhZyBhbGwgXCJjaHVua0lkc1wiIGFzIGxvYWRlZCBhbmQgZmlyZSBjYWxsYmFja1xuXHR2YXIgbW9kdWxlSWQsIGNodW5rSWQsIGkgPSAwO1xuXHRpZihjaHVua0lkcy5zb21lKChpZCkgPT4gKGluc3RhbGxlZENodW5rc1tpZF0gIT09IDApKSkge1xuXHRcdGZvcihtb2R1bGVJZCBpbiBtb3JlTW9kdWxlcykge1xuXHRcdFx0aWYoX193ZWJwYWNrX3JlcXVpcmVfXy5vKG1vcmVNb2R1bGVzLCBtb2R1bGVJZCkpIHtcblx0XHRcdFx0X193ZWJwYWNrX3JlcXVpcmVfXy5tW21vZHVsZUlkXSA9IG1vcmVNb2R1bGVzW21vZHVsZUlkXTtcblx0XHRcdH1cblx0XHR9XG5cdFx0aWYocnVudGltZSkgdmFyIHJlc3VsdCA9IHJ1bnRpbWUoX193ZWJwYWNrX3JlcXVpcmVfXyk7XG5cdH1cblx0aWYocGFyZW50Q2h1bmtMb2FkaW5nRnVuY3Rpb24pIHBhcmVudENodW5rTG9hZGluZ0Z1bmN0aW9uKGRhdGEpO1xuXHRmb3IoO2kgPCBjaHVua0lkcy5sZW5ndGg7IGkrKykge1xuXHRcdGNodW5rSWQgPSBjaHVua0lkc1tpXTtcblx0XHRpZihfX3dlYnBhY2tfcmVxdWlyZV9fLm8oaW5zdGFsbGVkQ2h1bmtzLCBjaHVua0lkKSAmJiBpbnN0YWxsZWRDaHVua3NbY2h1bmtJZF0pIHtcblx0XHRcdGluc3RhbGxlZENodW5rc1tjaHVua0lkXVswXSgpO1xuXHRcdH1cblx0XHRpbnN0YWxsZWRDaHVua3NbY2h1bmtJZF0gPSAwO1xuXHR9XG5cbn1cblxudmFyIGNodW5rTG9hZGluZ0dsb2JhbCA9IHNlbGZbXCJ3ZWJwYWNrQ2h1bmtcIl0gPSBzZWxmW1wid2VicGFja0NodW5rXCJdIHx8IFtdO1xuY2h1bmtMb2FkaW5nR2xvYmFsLmZvckVhY2god2VicGFja0pzb25wQ2FsbGJhY2suYmluZChudWxsLCAwKSk7XG5jaHVua0xvYWRpbmdHbG9iYWwucHVzaCA9IHdlYnBhY2tKc29ucENhbGxiYWNrLmJpbmQobnVsbCwgY2h1bmtMb2FkaW5nR2xvYmFsLnB1c2guYmluZChjaHVua0xvYWRpbmdHbG9iYWwpKTsiLCJpbXBvcnQgJy4uLy4uL2V4YW1wbGVzL21haW4uY3NzJztcblxuY29uc3QgY29uZmlnRmlsZU5hbWUgPSBcImV4dHJlc19jb25maWcuanNvblwiO1xuY29uc3Qgc2NoZW1hRmlsZU5hbWUgPSBcImV4dHJlc19jb25maWcuc2NoZW1hLmpzb25cIjtcblxuZnVuY3Rpb24gbG9hZEpTT04gKCkge1xuXG5cdGZldGNoKCBjb25maWdGaWxlTmFtZSApXG5cdFx0LnRoZW4oIHJlc3BvbnNlID0+IHtcblx0XHRcdGlmICggIXJlc3BvbnNlLm9rICkge1xuXHRcdFx0XHR0aHJvdyBuZXcgRXJyb3IoIGBFeHRSZXM6IEVycm9yIHJlYWRpbmcgJyR7Y29uZmlnRmlsZU5hbWV9JyFgICk7XG5cdFx0XHR9XG5cdFx0XHRyZXR1cm4gcmVzcG9uc2UuanNvbigpO1xuXHRcdH0pXG5cdFx0LnRoZW4oIGpzb24gPT4gaW5pdEpTT04oIGpzb24gKSApXG5cdFx0LmNhdGNoKCBlcnJvciA9PiBjb25zb2xlLmVycm9yKCBlcnJvciApICk7XG5cbn1cblxuaW1wb3J0IHsgZ2V0RVBGRm9sZGVyTmFtZSB9IGZyb20gJy4uL2NvbW1vbic7XG5cbmZ1bmN0aW9uIHN0YXJ0SW1wb3J0U2NoZW1hTGlzdGVuZXIgKCkge1xuXG5cdC8vIGxpc3RlbmVyIGZvciBwcm92aWRpbmcgSlNPTiBTQ0hFTUEgdG8gSXRlbUJ1aWxkZXJcblx0d2luZG93LmFkZEV2ZW50TGlzdGVuZXIoXG5cdFx0XCJtZXNzYWdlXCIsXG5cdFx0KGV2ZW50KSA9PiB7XG5cblx0XHRcdHRyeSB7XG5cdFx0XHRcdGNvbnN0IHsgY2FsbElkIH0gPSBKU09OLnBhcnNlKGV2ZW50LmRhdGEpO1xuXHRcdFx0XHRpZiAoIGNhbGxJZCAhPT0gdW5kZWZpbmVkICYmIGNhbGxJZC5pbmNsdWRlcyhcImltcG9ydEpzb25EYXRhXCIpICkge1xuXG5cdFx0XHRcdFx0ZmV0Y2goIHNjaGVtYUZpbGVOYW1lIClcblx0XHRcdFx0XHRcdC50aGVuKCByZXNwb25zZSA9PiB7XG5cdFx0XHRcdFx0XHRcdGlmICggIXJlc3BvbnNlLm9rICkge1xuXHRcdFx0XHRcdFx0XHRcdHRocm93IG5ldyBFcnJvciggYEV4dFJlczogRXJyb3IgcmVhZGluZyAnJHtzY2hlbWFGaWxlTmFtZX0nIWAgKTtcblx0XHRcdFx0XHRcdFx0fVxuXHRcdFx0XHRcdFx0XHRyZXR1cm4gcmVzcG9uc2UuanNvbigpO1xuXHRcdFx0XHRcdFx0fSlcblx0XHRcdFx0XHRcdC50aGVuKCBqc29uU2NoZW1hID0+IHtcblxuXHRcdFx0XHRcdFx0XHRjb25zdCBwYXNzX2RhdGEgPSB7XG5cdFx0XHRcdFx0XHRcdFx0anNvblNjaGVtYSxcblx0XHRcdFx0XHRcdFx0XHRjb25maWdGaWxlTmFtZTogZ2V0RVBGRm9sZGVyTmFtZSgpICsgJy8nICsgY29uZmlnRmlsZU5hbWUsXG5cdFx0XHRcdFx0XHRcdFx0Y2FsbElkXG5cdFx0XHRcdFx0XHRcdH07XG5cdFx0XHRcdFx0XHRcdHdpbmRvdy5wYXJlbnQucG9zdE1lc3NhZ2UoIEpTT04uc3RyaW5naWZ5KCBwYXNzX2RhdGEgKSwgJyonICk7XG5cblx0XHRcdFx0XHRcdH0pXG5cdFx0XHRcdFx0XHQuY2F0Y2goIGVycm9yID0+IGNvbnNvbGUuZXJyb3IoIGVycm9yICkgKTtcblxuXHRcdFx0XHR9XG5cdFx0XHR9IGNhdGNoIChlKSB7fVxuXHRcdH0sXG5cdFx0ZmFsc2UgKTtcbn1cblxuZnVuY3Rpb24gaW5pdEV4dFJlcyAoKSB7XG5cdHN0YXJ0SW1wb3J0U2NoZW1hTGlzdGVuZXIoKTtcblx0bG9hZEpTT04oKTtcbn1cblxuXG5pbXBvcnQgeyBiYXNlSW5pdHMgfSBmcm9tICcuLi8uLi9saWJzL2Jhc2VJbml0cyc7XG5pbXBvcnQgeyBjbGVhckNmZ0pzb24sIGFkZFN0YXR1c1ZhckRlZiB9IGZyb20gJy4uL2NvbW1vbic7XG5cbi8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy9cbi8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy9cbi8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vXG4vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vL1xuLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vXG4vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vXG4vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vL1xuLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy9cbi8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vXG4vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vL1xuLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy9cbi8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vXG4vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vL1xuLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy9cbi8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy9cbi8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vL1xuLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vXG4vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vXG4vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy9cbi8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy9cbi8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vXG4vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vL1xuLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy9cbi8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vXG4vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vXG4vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy9cbi8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy9cbi8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vL1xuLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy9cbi8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vXG4vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vL1xuaW1wb3J0IHsgdGV4dGFyZWFJbnNlcnRzRnJvbVNjaGVtYSB9IGZyb20gJy4vdGV4dGFyZWFJbnNlcnRzJztcbi8vLy8vLy8vLy9cblxuaW1wb3J0IHsgUmVzb2x2YWJsZVByb21pc2UgfSBmcm9tICcuLi9jb21tb24nO1xubGV0IGJhc2VJbml0aWFsaXplZCA9IG5ldyBSZXNvbHZhYmxlUHJvbWlzZSgpO1xuLy8gbGV0IGpzb25Mb2FkZWQgPSBuZXcgUmVzb2x2YWJsZVByb21pc2UoKTtcdC8vIGZvciBJMThOXG5cbmZ1bmN0aW9uIGluaXRKU09OICgganNvbiApIHtcblxuXHRpZiAoIHR5cGVvZiBqc29uID09PSAnc3RyaW5nJyApIHtcblx0XHR0cnkge1xuXHRcdFx0anNvbiA9IEpTT04ucGFyc2UoIGpzb24sIHRydWUgKTtcblx0XHR9IGNhdGNoIChlKSB7XG5cdFx0XHRjb25zb2xlLmVycm9yKCBgRm9ybWF0LUVycm9yIGluIEpTT04gZmlsZSAnJHtjb25maWdGaWxlTmFtZX0nYCApO1xuXHRcdFx0cmV0dXJuO1xuXHRcdH1cblx0fVxuXHQvLyBqc29uTG9hZGVkLnJlc29sdmVQcm9taXNlKCBqc29uICk7XHQvLyBmb3IgSTE4TlxuXG5cdGNvbnN0IGNmZyA9IGNsZWFyQ2ZnSnNvbigganNvbiApO1xuXG4vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vL1xuXHRjb25zdCBiYXNlID0gbmV3IGJhc2VJbml0cygpO1xuLy8vLy8vLy8vXG4vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vXG4vLy8vLy8vLy8vXG5cdGJhc2VJbml0aWFsaXplZC5yZXNvbHZlUHJvbWlzZSggYmFzZSApO1xuXG5cdGlmICggY2ZnLmRhdGFTZXR0aW5ncyApIHtcblx0XHRiYXNlLmRhdGFTZXR0aW5ncyA9IGNmZy5kYXRhU2V0dGluZ3M7XG5cdH1cblxuXHQvLyBsb2FkIFBhcnNlciBsYXp5IG9yIG5vdFxuXHQoXG5cblx0XHQoIGNmZy5kYXRhU2V0dGluZ3MgJiYgY2ZnLmRhdGFTZXR0aW5ncy5zY29yaW5nVmFscyAmJiBjZmcuZGF0YVNldHRpbmdzLnNjb3JpbmdWYWxzLmxlbmd0aD4wICkgP1xuXHRcdFx0aW1wb3J0KCAvKiB3ZWJwYWNrQ2h1bmtOYW1lOiBcInNjZVwiICovICdleHByLWV2YWwnICkudGhlbiggKHsgUGFyc2VyIH0pID0+ICh7IFBhcnNlciB9KSApIDpcblx0XHRcdFByb21pc2UucmVzb2x2ZSh7fSlcblxuXHQpLnRoZW4oIGFkZE1vZHMgPT4ge1xuXG5cdFx0Ly8gdGhlcmUgd2lsbCBiZSBzdWJzZXF1ZW50IGluaXRzXG5cdFx0aWYgKCBiYXNlLmZzbSAmJiBiYXNlLmZzbS5pbmNJbml0Q250ICkge1xuXHRcdFx0YmFzZS5mc20uaW5jSW5pdENudCgpO1xuXHRcdH1cblxuLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vL1xuLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vXG4vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vL1xuLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy9cbi8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vL1xuLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vXG4vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vL1xuLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy9cbi8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vXG4vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vL1xuLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy9cbi8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vXG4vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vL1xuLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy9cbi8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy9cbi8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy9cbi8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vL1xuLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vXG4vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy9cbi8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vL1xuLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy9cbi8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vXG4vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vL1xuLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy9cbi8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy9cbi8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy9cbi8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy9cbi8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy9cbi8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vXG4vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vXG4vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vL1xuXHRcdGNvbnN0IGlvID0gbmV3IHRleHRhcmVhSW5zZXJ0c0Zyb21TY2hlbWEoICcjY29udGFpbmVyJywgY2ZnLCBiYXNlICk7XG4vLy8vLy8vLy8vXG5cblx0XHRhZGRTdGF0dXNWYXJEZWYoIGlvLCBqc29uICk7XG5cdFx0YmFzZS5zZW5kQ2hhbmdlU3RhdGUoIGlvICk7XG5cblxuXHRcdGlmICggaW8uZ2V0U3RhdGUgKSB7XG5cdFx0XHR3aW5kb3cuZ2V0U3RhdGUgPSBpby5nZXRTdGF0ZS5iaW5kKGlvKTtcblx0XHR9XG5cdFx0aWYgKCBpby5zZXRTdGF0ZSApIHtcblx0XHRcdHdpbmRvdy5zZXRTdGF0ZSA9IGlvLnNldFN0YXRlLmJpbmQoaW8pO1xuXHRcdH1cblxuXHRcdGlmICggYmFzZS5mc20gJiYgYmFzZS5mc20uZGVjSW5pdENudCApIHtcblx0XHRcdGJhc2UuZnNtLmRlY0luaXRDbnQoKTtcblx0XHR9XG5cdH0pXG59XG5cbmRvY3VtZW50LmFkZEV2ZW50TGlzdGVuZXIoIFwiRE9NQ29udGVudExvYWRlZFwiLCBpbml0RXh0UmVzICk7XG5cbi8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vL1xuXG4vLyBoYWNrIGZvciBJQiByZXF1ZXN0IFwiaW1wb3J0VmFyaWFibGVzXCIgYmVmb3JlIGJhc2UgaXMgaW5pdGlhbGl6ZWRcblxuZnVuY3Rpb24gc2VuZFZhckRlY2wgKGV2ZW50KSB7XG5cblx0dHJ5IHtcblx0XHRjb25zdCB7IGNhbGxJZCB9ID0gSlNPTi5wYXJzZShldmVudC5kYXRhKTtcblx0XHRpZiAoIGNhbGxJZCAhPT0gdW5kZWZpbmVkICYmIGNhbGxJZC5pbmNsdWRlcyhcImltcG9ydFZhcmlhYmxlc1wiKSApIHtcblx0XHRcdC8vIGFuc3dlciBtZXNzYWdlIHdoZW4gYmFzZSBpcyBpbml0aWFsaXplZFxuXHRcdFx0YmFzZUluaXRpYWxpemVkLnByb21pc2UudGhlbiggYmFzZSA9PiBiYXNlLmZzbS5hbnN3ZXJWYXJEZWNsUmVxKGNhbGxJZCkgKTtcblx0XHR9XG5cdH0gY2F0Y2ggKGUpIHt9XG5cbn1cblxuZnVuY3Rpb24gaGFuZGxlSUJlYXJseVZhckltcG9ydCAoKSB7XG5cdHdpbmRvdy5hZGRFdmVudExpc3RlbmVyKCBcIm1lc3NhZ2VcIiwgc2VuZFZhckRlY2wsIGZhbHNlICk7XG5cdGJhc2VJbml0aWFsaXplZC5wcm9taXNlLnRoZW4oICgpID0+IHdpbmRvdy5yZW1vdmVFdmVudExpc3RlbmVyKCBcIm1lc3NhZ2VcIiwgc2VuZFZhckRlY2wgKSApO1xufVxuXG5oYW5kbGVJQmVhcmx5VmFySW1wb3J0KCk7XG5cbi8vIC8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vL1xuXG4vLyAvLyBJMThOIHN1cHBvcnRcblxuLy8gaW1wb3J0IHsgZ2V0STE4bkRlc2NyIH0gZnJvbSAnLi4vY29tbW9uJztcblxuLy8gYXN5bmMgZnVuY3Rpb24gc2VuZEkxOG5EZXNjciAoY2FsbElkKSB7XG5cbi8vIFx0Y29uc3QganNvbiA9IGF3YWl0IGpzb25Mb2FkZWQucHJvbWlzZTtcblxuLy8gXHRjb25zdCBpMThuRGF0YSA9IGdldEkxOG5EZXNjcigganNvbiApO1xuXG4vLyBcdC8vIFNlbmQgTWVzc2FnZVxuLy8gXHRjb25zdCBkYXRhID0ge1xuLy8gXHRcdGNhbGxJZCxcbi8vIFx0XHRpMThuRGF0YSxcbi8vIFx0fVxuLy8gXHRiYXNlSW5pdGlhbGl6ZWQucHJvbWlzZS50aGVuKCBiYXNlID0+IGJhc2UuZnNtLnBvc3RNZXNzYWdlKCBKU09OLnN0cmluZ2lmeSggZGF0YSApICkgKTtcblxuLy8gfVxuXG4vLyAvLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy9cblxuLy8gaW1wb3J0IHsgcGF0Y2hDZmdJMThuIH0gZnJvbSAnLi4vY29tbW9uJztcblxuLy8gYXN5bmMgZnVuY3Rpb24gbG9hZEkxOG4gKCBpMThuICkge1xuXG4vLyBcdC8vIFdlbm4ganNvbiBnZWxhZGVuXG4vLyBcdGNvbnN0IGpzb24gPSBhd2FpdCBqc29uTG9hZGVkLnByb21pc2U7XG4vLyBcdC8vIHBhdGNoIHRoZSBDRkctSlNPTiB3aXRoIHRoZSBJMThOLVN0cmluZ3Ncbi8vIFx0cGF0Y2hDZmdJMThuKCBqc29uLCBpMThuICk7XG4vLyAvLyBjb25zb2xlLmxvZyhqc29uKTtcblxuLy8gXHQvLyBXZW5uIGFsbGVzIGZlcnRpZyBpbml0aWFsaXNpZXJ0XG4vLyBcdGNvbnN0IGJhc2UgPSBhd2FpdCBiYXNlSW5pdGlhbGl6ZWQucHJvbWlzZTtcbi8vIFx0YXdhaXQgYmFzZS5mc20uZ2V0SW5pdERvbmVQcm9taXNlKCk7XG5cbi8vIFx0Ly8gZGFubiBhbHMgbsOkY2hzdGVyIFNjaHJpdHQgZGllIEkxOE4tU3RyaW5ncyBsYWRlblxuLy8gXHRzZXRUaW1lb3V0KCAoKSA9PiB7XG4vLyBcdFx0YmFzZUluaXRpYWxpemVkID0gbmV3IFJlc29sdmFibGVQcm9taXNlKCk7XG4vLyBcdFx0anNvbkxvYWRlZCA9IG5ldyBSZXNvbHZhYmxlUHJvbWlzZSgpO1xuLy8gXHRcdGhhbmRsZUlCZWFybHlWYXJJbXBvcnQoKTtcblxuLy8gXHRcdGxldCBzdGF0ZSA9IG51bGw7XG4vLyBcdFx0aWYgKCB3aW5kb3cuZ2V0U3RhdGUgKSB7XG4vLyBcdFx0XHRzdGF0ZSA9IHdpbmRvdy5nZXRTdGF0ZSgpO1xuLy8gXHRcdH1cbi8vIFx0XHRpbml0SlNPTigganNvbiApO1xuLy8gXHRcdGlmICggc3RhdGUgKSB7XG4vLyBcdFx0XHR3aW5kb3cuc2V0U3RhdGUoIHN0YXRlICk7XG4vLyBcdFx0fVxuLy8gXHR9KVxuLy8gfVxuXG4vLyAvLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy9cblxuLy8gZnVuY3Rpb24gaTE4bkxpc3RlbmVyIChldmVudCkge1xuXG4vLyBcdHRyeSB7XG4vLyBcdFx0Y29uc3QgeyBjYWxsSWQsIGkxOG4gfSA9IEpTT04ucGFyc2UoZXZlbnQuZGF0YSk7XG4vLyBcdFx0aWYgKCBjYWxsSWQgIT09IHVuZGVmaW5lZCAmJiBjYWxsSWQuaW5jbHVkZXMoXCJpbXBvcnRJMThuXCIpICkge1xuLy8gXHRcdFx0c2VuZEkxOG5EZXNjciggY2FsbElkICk7XG4vLyBcdFx0fSBlbHNlIGlmICggY2FsbElkICE9PSB1bmRlZmluZWQgJiYgY2FsbElkLmluY2x1ZGVzKFwic2V0STE4blwiKSApIHtcbi8vIFx0XHRcdGxvYWRJMThuKCBpMThuICk7XG4vLyBcdFx0fVxuLy8gXHR9XG4vLyBcdGNhdGNoIChlKSB7fVxuXG4vLyB9XG5cbi8vIHdpbmRvdy5hZGRFdmVudExpc3RlbmVyKCBcIm1lc3NhZ2VcIiwgaTE4bkxpc3RlbmVyLCBmYWxzZSApO1xuXG4vLyAvLyB3aW5kb3cuc2VuZEkxOG5EZXNjciA9IHNlbmRJMThuRGVzY3I7XG4vLyAvLyB3aW5kb3cubG9hZEkxOG4gPSBsb2FkSTE4bjtcbiJdLCJuYW1lcyI6WyJ0ZXh0YXJlYUluc2VydHMiLCJ0b29sYmFyTWF0aE9wZXJhdG9ycyIsInRvb2xiYXJGcmFjdGlvbiIsInRvb2xiYXJDb21wYXJpc29uIiwidG9vbGJhclBlcmNlbnQiLCJ0b29sYmFyRXVybyIsInRvb2xiYXJzIiwiY29tcCIsIm1hdGgiLCJmcmFjdCIsInBlcmMiLCJldXJvIiwidGV4dGFyZWFJbnNlcnRzRnJvbVNjaGVtYSIsImNvbnN0cnVjdG9yIiwiZGl2U2VsZWN0b3IiLCJvcHRzIiwiYmFzZSIsImZzbSIsImluY0luaXRDbnQiLCJ3aWR0aCIsIndpbmRvdyIsImlubmVyV2lkdGgiLCJ3V2lkdGgiLCJoZWlnaHQiLCJpbm5lckhlaWdodCIsIndIZWlnaHQiLCJ0b29sYmFyQ2VsbFdpZHRoIiwiZGVmcyIsInRvb2xiYXJEaXJlY3Rpb24iLCJkaXZTdHlsZXMiLCJ0b29sYmFyQ29udGFpbmVyU3R5bGVzIiwidG9vbGJhckNlbGxTdHlsZXMiLCJ0b29sYmFyIiwiZGF0YVNldHRpbmdzIiwidGIiLCJjb25jYXQiLCJkZWNJbml0Q250Iiwic2NvcmVEZWYiLCJwcmVmIiwidmFyaWFibGVQcmVmaXgiLCJyZXMiLCJleHRyYWN0IiwiY2xlYXJDZmdKc29uIiwianNvbiIsIkFycmF5IiwiaXNBcnJheSIsIm1hcCIsImEiLCJPYmplY3QiLCJlbnRyaWVzIiwiZm9yRWFjaCIsImsiLCJ2Iiwic3Vic3RyaW5nIiwiYXJlbHZhbHMiLCJtYXRjaCIsImUiLCJ2YWx1ZXMiLCJhbHRzIiwidW5kZWZpbmVkIiwiYXNzaWduIiwic3Vib2JqIiwibmV3T2JqIiwiaXNCZXR3ZWVuIiwiaXNOdW1Vbml0IiwiZGVidWdBbmRDb25zb2xlT3V0IiwicyIsImRlYnVnT3V0IiwiY29uc29sZSIsImVycm9yIiwiYWRkU2NvcmluZyIsIm9iaiIsIlBhcnNlciIsImFkZEZuY3MiLCJjb21wdXRlU2NvcmluZ1ZhbHMiLCJwYXJzZXIiLCJpc051bGwiLCJyIiwiZmwiLCJ0b1N0cmluZyIsIlJlZ0V4cCIsInN0ckVxdWFsIiwiYiIsInRvTG93ZXJDYXNlIiwiZm5jIiwiZnVuY3Rpb25zIiwic2NvcmluZ1ZhbHMiLCJzY29yZXMiLCJ2YXJOYW1lcyIsImtleXMiLCJsZW5ndGgiLCJzdiIsImNvbmQiLCJjb25kaXRpb24iLCJzYXZlQ29uZCIsImFsbFZhcnNJbkNvbmQiLCJtYXRjaEFsbCIsInZuIiwidmFyc2VhcmNoIiwicmVwbGFjZSIsInJlIiwic2VsVmFyTmFtZXMiLCJmaWx0ZXIiLCJmcm9tIiwic29tZSIsIm0iLCJpbmNsdWRlcyIsInB1c2giLCJ2YWwiLCJwYXJzZSIsInNjb3JlIiwic2NvcmVEYXQiLCJoIiwiYyIsImV2YWx1YXRlIiwibiIsIk51bWJlciIsIk5hTiIsInNlbmRDaGFuZ2VTdGF0ZSIsImFkZFN0YXR1c1ZhckRlZiIsInN0YXR1c1ZhckRlZiIsInN0YXRWYXJOYW1lIiwiZ2V0RGVmYXVsdENoYW5nZVN0YXRlIiwicmVhZFJhbmdlQXJyYXkiLCJyciIsInJyMiIsImRwMmlucHV0UmVnRXhwIiwidW5pdFJlZ0V4cCIsInUiLCJ0cmltIiwidG9VcHBlckNhc2UiLCJsIiwicGRwIiwiZHAiLCJ1bml0cyIsInNwbGl0Iiwiam9pbiIsImlucHV0UmVnZXhwIiwiZHAybGFiRm5jSW5wdXRSZWdFeHAiLCJuYW0iLCJsVkYiLCJsVCIsInN0clRvTnVtIiwic3RyVG9JbnQiLCJwYXJzZUludCIsImlzTmFOIiwicGFyc2VGbG9hdCIsIlJlc29sdmFibGVQcm9taXNlIiwicHJvbSIsIlByb21pc2UiLCJyZWoiLCJyZXNvbHZlUHJvbWlzZSIsInJlamVjdFByb21pc2UiLCJwcm9taXNlIiwiZ2V0RVBGRm9sZGVyTmFtZSIsImVtcHR5VmFsIiwicmVnZXhwIiwibG9jYXRpb24iLCJwYXRobmFtZSIsImdldEkxOG5EZXNjciIsIm5hbWVGbmMiLCJuYW1lIiwicmVwbGFjZUFsbCIsImkxOG5LZXlzQ3R4cyIsImkxOG5EYXRhIiwia2V5IiwiY3R4Iiwia2V5UGFydHMiLCJzaGlmdCIsImFkZCIsInRleHQiLCJjdXJya2V5IiwiZGVzY3IiLCJlbnRyeSIsInBvcCIsInN0YW1tS2V5IiwiaSIsInBhdGNoQ2ZnSTE4biIsImkxOG4iLCJzdGFydHNXaXRoIiwib2JqZWN0X2VxdWFscyIsImZzbVNlbmQiLCJiYXNlSW5pdHMiLCJkZWZhdWx0cyIsImNvbnRhaW5lciIsImFkZFNlbmRDaGFuZ2VTdGF0ZSIsInN0YXJ0TGlzdGVuaW5nVG9WYXJEZWNsUmVxIiwiZGVjbGFyZVZhcmlhYmxlcyIsImJpbmQiLCJzdGFnZSIsIktvbnZhIiwiU3RhZ2UiLCJzdGFnZVZOIiwiZG9jdW1lbnQiLCJhZGRFdmVudExpc3RlbmVyIiwiZXYiLCJwcmV2ZW50RGVmYXVsdCIsIkZTTVZhcnNTZW50IiwicG9zdExvZyIsImV2ZW50IiwiZGF0YSIsImlzRGVtb0FuaSIsInBvc3RMb2dFdmVudCIsInBvc3RWYXJpYWJsZSIsInNldEZTTVZhcmlhYmxlIiwidHJpZ2dlcklucHV0VmFsaWRhdGlvbkV2ZW50IiwidHJpZ2dlckV2ZW50IiwiZ2V0Q2hhbmdlU3RhdGUiLCJjYWxsIiwibmV3U3RhdGUiLCJjaGFuZ2VTdGF0ZSIsIm9sZENoYW5nZVN0YXRlIiwiRlNNVmFyaWFibGVOYW1lIiwic2NvcmVPYmoiLCJvbGRTY29yZSIsInNjb3JlVmFyaWFibGVOYW1lIiwidmFyRGVmcyIsInR5cGV0cmFucyIsInZuYW1lIiwidHlwZSIsInNjb3JlRGVmVHlwZSIsInZkZWYiLCJkZWZhdWx0VmFsdWUiLCJuYW1lZFZhbHVlcyIsIncxIiwidzIiLCJNYXRoIiwibWluIiwibWF4IiwibnVtIiwidW5pdFJFIiwidW5pdE9wdCIsIm9yRW1wdHkiLCJudW1SRSIsImRlbERlZmF1bHRzIiwiZGVsS2V5cyIsImJPYmplY3QiLCJtZXJnZURlZXAiLCJ0YXJnZXQiLCJzb3VyY2UiLCJpc09iamVjdCIsInRhcmdldFZhbHVlIiwic291cmNlVmFsdWUiLCJ4IiwieSIsInkyIiwiZXZlcnkiLCJ4ZSIsInllIiwic3BsaWNlIiwicCIsImhhc093blByb3BlcnR5IiwiZ2V0WG9mRXZlbnQiLCJzaW1YIiwiZ2V0UG9pbnRlclBvc2l0aW9uIiwiZ2V0WW9mRXZlbnQiLCJzaW1ZIiwiZ2V0UG9zT2ZFdmVudCIsImlnbm9yZUV2ZW50Iiwic2V0U3RhdGVQb3N0UHJvYyIsImVuZEFuaSIsImdldEFic1Bvc2l0aW9uIiwiZWxlbWVudCIsImJveCIsImdldEJvdW5kaW5nQ2xpZW50UmVjdCIsInNjcm9sbFgiLCJwYWdlWE9mZnNldCIsInNjcm9sbFkiLCJwYWdlWU9mZnNldCIsImxlZnQiLCJ0b3AiLCJyZWdleENhbkxvb2tCZWhpbmQiLCJpbmRleFBhdGgiLCJnZXRRdWVyeVZhcmlhYmxlIiwidXNlckRlZklkUGF0aCIsInRyYWNlQ291bnQiLCJwckluaXREb25lIiwicmVzb2x2ZSIsInByb2Nlc3MiLCJlbnYiLCJOT0RFX0VOViIsInBySW5pdERvbmVSZXNvbHZlIiwiaW5pdERvbmVDbnQiLCJid19fZGVidWdPdXQiLCJ2YXJpYWJsZU5hbWUiLCJuZXdWYWx1ZSIsInBvc3RNZXNzYWdlV2l0aFBhdGhzQW5kVHJhY2VDb3VudCIsInNldFZhcmlhYmxlIiwidHJhY2VNZXNzYWdlIiwiSlNPTiIsInN0cmluZ2lmeSIsIm1pY3JvZmluRXZlbnQiLCJwYXlsb2FkIiwicG9zdE1lc3NhZ2UiLCJwYXJlbnQiLCJfX0JXX19jYWxsYmFjayIsInZhcmlhYmxlIiwicGFyc2VkVXJsIiwiVVJMIiwiaHJlZiIsInNlYXJjaFBhcmFtcyIsImdldCIsImRlY2xhcmVWYXJpYWJsZUNhbGxiYWNrIiwiZ2V0SW5pdERvbmVQcm9taXNlIiwiYW5zd2VyVmFyRGVjbFJlcSIsImNhbGxJZCIsInRoZW4iLCJ2YXJpYWJsZXMiLCJwYXNzX2RhdGEiLCJpbml0aWFsVmFyaWFibGVzIiwibG9nIiwidGV4dGFyZWFDb250YWluZXIiLCJvdXRlckRpdlN0eWxlcyIsIm91dGVyRGl2IiwiY3JlYXRlRWxlbWVudCIsImNsYXNzTGlzdCIsInNldFN0eWxlcyIsImRpdiIsInF1ZXJ5U2VsZWN0b3IiLCJwYXJlbnROb2RlIiwicmVwbGFjZUNoaWxkIiwiYXBwZW5kQ2hpbGQiLCJpbml0RGF0YSIsImlubmVySFRNTCIsImV2X2lucHV0IiwiZWwiLCJzdHlsZXMiLCJzdCIsInN0eWxlIiwiZ2V0U3RhdGUiLCJzZXRTdGF0ZSIsInRleHRhcmVhQmFzZSIsIm11bHRpTGluZSIsInN0cmlwVGFncyIsIm1heGxlbmd0aCIsImV4dHJhY3RSZXBsYWNlcyIsInRvIiwic2V0QXR0cmlidXRlIiwiZXZfa2V5ZG93biIsInRleHRDb250ZW50IiwiaW5wdXRSRSIsInNhdmVWYWx1ZSIsInNldFRpbWVvdXQiLCJnZXRUZXh0UG9zIiwib2xkVmFsdWUiLCJvbGRGb2N1c0VsZW1JbmRleCIsInJlc2NvcmUiLCJ3aGljaCIsImtleUNvZGUiLCJ0YWJUb05leHRJbnB1dEZpZWxkIiwicGFzdGVIdG1sQXRDYXJldCIsInN0b3BQcm9wYWdhdGlvbiIsImRlbElmRGl2Iiwic2F2ZU5ld1ZhbHVlIiwic2VsIiwiZ2V0U2VsZWN0aW9uIiwiaW5wdXRUeXBlIiwiZGVsUG9zRWxlbWVudCIsImluc2VydGVkIiwic2VhcmNoIiwiZm9jdXNOb2RlIiwiZGVsUG9zVGV4dCIsImNvbnRhaW5zIiwiZ2V0UmFuZ2VBdCIsInJhbmdlQ291bnQiLCJyYW5nZSIsImNsb25lUmFuZ2UiLCJzZXRTdGFydEJlZm9yZSIsImNvbGxhcHNlIiwicmVtb3ZlQWxsUmFuZ2VzIiwiYWRkUmFuZ2UiLCJub3JtYWxpemUiLCJyZW1vdmUiLCJpc0NvbGxhcHNlZCIsImZvY3VzT2Zmc2V0IiwicHJldmlvdXNTaWJsaW5nIiwiY2xvbmVOb2RlIiwicmVzdG9yZVZhbHVlIiwibGFzdE5vZGUiLCJjaGlsZE5vZGVzIiwibm9kZVR5cGUiLCJOb2RlIiwiVEVYVF9OT0RFIiwiZW5kc1dpdGgiLCJwb3MiLCJzZXRDdXJQb3MiLCJub2RlIiwibmV4dFNpYmxpbmciLCJ0YWdOYW1lIiwidG5vZGUiLCJjcmVhdGVUZXh0Tm9kZSIsInRvVGV4dCIsImh0bWwiLCJpbnNlcnRTcGFjZXMiLCJsb2dOYW1lIiwiZGVsZXRlQ29udGVudHMiLCJpbnMiLCJwcmVTcGFjZSIsImZyYWciLCJjcmVhdGVEb2N1bWVudEZyYWdtZW50IiwiZmlyc3RDaGlsZCIsInN0YXJ0Q3VyUG9zIiwiaW5zZXJ0Tm9kZSIsInNldFN0YXJ0Iiwic2V0U3RhcnRBZnRlciIsIm9mZnMiLCJmb2N1cyIsInRvRGVsZXRlIiwibm9kZXMiLCJmaW5kSW5kZXgiLCJvbGRGb2N1c09mZnNldCIsIm9mZnNldCIsImNyZWF0ZVJhbmdlIiwiY3VyUG9zIiwicHJldkVsbWVudCIsInBhcmVudEVsbWVudCIsIkVMRU1FTlRfTk9ERSIsInBhcmVudEVsZW1lbnQiLCJuZXdFbGVtIiwibmV3UmFuZ2UiLCJ0ZXh0UG9zIiwiY2xhc3MiLCJzdGF0ZSIsImluc2VydHNEZWZhdWx0cyIsInRvb2xiYXJDZWxsU3BhblN0eWxlcyIsInRvb2xiYXJDb250YWluZXIiLCJuciIsInRvb2xiYXJDZWxsIiwiYWN0aXZlRWxlbWVudCIsImluc2VydCIsImlubmVyU3BhbiIsImRpc3BsYXkiLCJleHRyYWN0UmVwbGFjZSIsImNhcHR1cmUiLCJkb250SW5zZXJ0UmVjdXJzaXZlIiwicG5vZGUiLCJub0V4dHJhU3BhY2VzIiwiZnJhY19odG1sIiwiZnJhY3RzdmciLCJmcmFjX2h0bWxfdG9vbGJhciIsInRvb2xiYXJNYXRoT3BlcmF0b3JzRnJhY3Rpb24iLCJ0b29sYmFyTWF0aE9wZXJhdG9yc0ZyYWN0aW9uQ29tcGFyaXNvbiIsInRvb2xiYXJNYXRoT3BlcmF0b3JzRnJhY3Rpb25QZXJjZW50IiwiY29uZmlnRmlsZU5hbWUiLCJzY2hlbWFGaWxlTmFtZSIsImxvYWRKU09OIiwiZmV0Y2giLCJyZXNwb25zZSIsIm9rIiwiRXJyb3IiLCJpbml0SlNPTiIsImNhdGNoIiwic3RhcnRJbXBvcnRTY2hlbWFMaXN0ZW5lciIsImpzb25TY2hlbWEiLCJpbml0RXh0UmVzIiwiYmFzZUluaXRpYWxpemVkIiwiY2ZnIiwiYWRkTW9kcyIsImlvIiwic2VuZFZhckRlY2wiLCJoYW5kbGVJQmVhcmx5VmFySW1wb3J0IiwicmVtb3ZlRXZlbnRMaXN0ZW5lciJdLCJzb3VyY2VSb290IjoiIn0=