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
        from: new RegExp('(?<!\\*)\\*(?!\\*)', 'g'),
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,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Q0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLElBQUk7QUFDSjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBOztBQUVBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsWUFBWTtBQUNaO0FBQ0E7QUFDQSxZQUFZO0FBQ1o7O0FBRUE7QUFDQTtBQUNBO0FBQ0EsWUFBWTtBQUNaO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsY0FBYztBQUNkO0FBQ0EsY0FBYztBQUNkO0FBQ0EsY0FBYztBQUNkO0FBQ0E7QUFDQSxjQUFjO0FBQ2Q7QUFDQTtBQUNBO0FBQ0E7QUFDQSxZQUFZO0FBQ1o7QUFDQTtBQUNBO0FBQ0E7QUFDQSxZQUFZO0FBQ1o7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQSxZQUFZO0FBQ1o7QUFDQTtBQUNBLFlBQVk7O0FBRVo7QUFDQTtBQUNBO0FBQ0E7QUFDQSxZQUFZO0FBQ1o7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLFlBQVk7QUFDWjtBQUNBLFlBQVk7QUFDWjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLFlBQVk7QUFDWjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsWUFBWTtBQUNaO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxZQUFZOztBQUVaO0FBQ0E7QUFDQTtBQUNBLFlBQVk7QUFDWjtBQUNBLFlBQVk7QUFDWjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxZQUFZOztBQUVaO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQSxZQUFZOztBQUVaO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSw0QkFBNEIsNkJBQTZCO0FBQ3pEO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsWUFBWTtBQUNaO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsWUFBWTtBQUNaOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxZQUFZO0FBQ1o7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsWUFBWTtBQUNaO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxZQUFZO0FBQ1o7QUFDQTtBQUNBO0FBQ0EsWUFBWTs7QUFFWjtBQUNBO0FBQ0E7QUFDQSxZQUFZO0FBQ1o7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxZQUFZO0FBQ1o7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLFlBQVk7QUFDWjtBQUNBO0FBQ0EsWUFBWTs7QUFFWjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsY0FBYztBQUNkO0FBQ0E7QUFDQTtBQUNBLGNBQWM7QUFDZDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxjQUFjO0FBQ2QsWUFBWTtBQUNaOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsWUFBWTtBQUNaO0FBQ0E7QUFDQSxZQUFZO0FBQ1o7QUFDQTtBQUNBLFlBQVk7QUFDWjtBQUNBO0FBQ0EsWUFBWTs7QUFFWjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsY0FBYztBQUNkO0FBQ0E7QUFDQTtBQUNBLGNBQWM7QUFDZDtBQUNBO0FBQ0Esa0RBQWtEO0FBQ2xEO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLGNBQWM7QUFDZDtBQUNBO0FBQ0E7QUFDQSxZQUFZO0FBQ1o7QUFDQSxZQUFZOztBQUVaO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsWUFBWTtBQUNaO0FBQ0E7QUFDQSxZQUFZO0FBQ1o7QUFDQSxZQUFZOztBQUVaO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsWUFBWTtBQUNaO0FBQ0E7QUFDQTtBQUNBLFlBQVk7O0FBRVo7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBLEdBQUc7QUFDSDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxNQUFNO0FBQ047QUFDQTtBQUNBO0FBQ0Esc0JBQXNCLDJCQUEyQjtBQUNqRDtBQUNBO0FBQ0E7QUFDQSxNQUFNO0FBQ047QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsR0FBRztBQUNIO0FBQ0E7QUFDQTtBQUNBLEdBQUc7QUFDSDtBQUNBO0FBQ0E7QUFDQSxHQUFHO0FBQ0g7QUFDQTtBQUNBO0FBQ0EsR0FBRztBQUNIO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsR0FBRztBQUNIO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsTUFBTTtBQUNOO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsR0FBRztBQUNIO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxHQUFHO0FBQ0g7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsTUFBTTtBQUNOO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsR0FBRztBQUNIO0FBQ0E7QUFDQTtBQUNBLEdBQUc7QUFDSDtBQUNBO0FBQ0EsR0FBRztBQUNIO0FBQ0E7QUFDQTtBQUNBLEdBQUc7QUFDSDtBQUNBO0FBQ0E7QUFDQTtBQUNBLG9CQUFvQix1QkFBdUI7QUFDM0M7QUFDQTtBQUNBLEdBQUc7QUFDSDtBQUNBO0FBQ0E7QUFDQSxHQUFHO0FBQ0g7QUFDQTtBQUNBO0FBQ0E7QUFDQSxvQkFBb0IsdUJBQXVCO0FBQzNDO0FBQ0E7QUFDQSxHQUFHO0FBQ0g7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxHQUFHO0FBQ0g7QUFDQTtBQUNBO0FBQ0EsR0FBRztBQUNIO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsR0FBRztBQUNIO0FBQ0E7QUFDQTtBQUNBLEdBQUc7QUFDSDtBQUNBO0FBQ0E7QUFDQTtBQUNBLEdBQUc7QUFDSDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsR0FBRztBQUNIO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsR0FBRztBQUNIO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsR0FBRztBQUNIO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsR0FBRztBQUNIO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsTUFBTTtBQUNOO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxHQUFHO0FBQ0g7QUFDQTtBQUNBO0FBQ0EsR0FBRztBQUNIO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsR0FBRztBQUNI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SUFBSSxJQUFJQSxJQUFJLENBQUNDLEdBQUcsQ0FBQytSLGdCQUFnQixDQUFDQyxNQUFNLENBQUMsQ0FBRTtJQUMxRTtFQUNELENBQUMsQ0FBQyxPQUFPelAsQ0FBQyxFQUFFLENBQUM7QUFFZDtBQUVBLFNBQVNvWixzQkFBc0IsR0FBSTtFQUNsQ3hiLE1BQU0sQ0FBQzhLLGdCQUFnQixDQUFFLFNBQVMsRUFBRXlRLFdBQVcsRUFBRSxLQUFLLENBQUU7RUFDeERKLGVBQWUsQ0FBQzlTLE9BQU8sQ0FBQ3lKLElBQUksQ0FBRSxNQUFNOVIsTUFBTSxDQUFDeWIsbUJBQW1CLENBQUUsU0FBUyxFQUFFRixXQUFXLENBQUUsQ0FBRTtBQUMzRjtBQUVBQyxzQkFBc0IsRUFBRTs7QUFFeEI7O0FBRUE7O0FBRUE7O0FBRUE7O0FBRUE7O0FBRUE7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBOztBQUVBOztBQUVBOztBQUVBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7O0FBRUE7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBOztBQUVBOztBQUVBO0FBQ0EsaUMiLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8vLi90ZXh0YXJlYUluc2VydHMuanMiLCJ3ZWJwYWNrOi8vLy4uL2NvbW1vbi5qcyIsIndlYnBhY2s6Ly8vLi4vLi4vbGlicy9iYXNlSW5pdHMuanMiLCJ3ZWJwYWNrOi8vLy4uLy4uL2xpYnMvY29tbW9uLmpzIiwid2VicGFjazovLy8uLi8uLi9saWJzL2ZzbS5qcyIsIndlYnBhY2s6Ly8vLi4vLi4vbGlicy90ZXh0YXJlYUluc2VydHMuanMiLCJ3ZWJwYWNrOi8vLy4uLy4uL2V4YW1wbGVzL21haW4uY3NzP2EzODQiLCJ3ZWJwYWNrOi8vLy4uLy4uL2V4YW1wbGVzL3RleHRhcmVhSW5zZXJ0c18yY29scy5jc3M/NGJhMiIsIndlYnBhY2s6Ly8vLi4vLi4vbGlicy90ZXh0YXJlYUluc2VydHMuY3NzP2NlMjMiLCJ3ZWJwYWNrOi8vLy4uLy4uL25vZGVfbW9kdWxlcy9jb3JlLWpzL2ludGVybmFscy9hLWNhbGxhYmxlLmpzIiwid2VicGFjazovLy8uLi8uLi9ub2RlX21vZHVsZXMvY29yZS1qcy9pbnRlcm5hbHMvYS1jb25zdHJ1Y3Rvci5qcyIsIndlYnBhY2s6Ly8vLi4vLi4vbm9kZV9tb2R1bGVzL2NvcmUtanMvaW50ZXJuYWxzL2EtcG9zc2libGUtcHJvdG90eXBlLmpzIiwid2VicGFjazovLy8uLi8uLi9ub2RlX21vZHVsZXMvY29yZS1qcy9pbnRlcm5hbHMvYWRkLXRvLXVuc2NvcGFibGVzLmpzIiwid2VicGFjazovLy8uLi8uLi9ub2RlX21vZHVsZXMvY29yZS1qcy9pbnRlcm5hbHMvYWR2YW5jZS1zdHJpbmctaW5kZXguanMiLCJ3ZWJwYWNrOi8vLy4uLy4uL25vZGVfbW9kdWxlcy9jb3JlLWpzL2ludGVybmFscy9hbi1pbnN0YW5jZS5qcyIsIndlYnBhY2s6Ly8vLi4vLi4vbm9kZV9tb2R1bGVzL2NvcmUtanMvaW50ZXJuYWxzL2FuLW9iamVjdC5qcyIsIndlYnBhY2s6Ly8vLi4vLi4vbm9kZV9tb2R1bGVzL2NvcmUtanMvaW50ZXJuYWxzL2FycmF5LWZyb20uanMiLCJ3ZWJwYWNrOi8vLy4uLy4uL25vZGVfbW9kdWxlcy9jb3JlLWpzL2ludGVybmFscy9hcnJheS1pbmNsdWRlcy5qcyIsIndlYnBhY2s6Ly8vLi4vLi4vbm9kZV9tb2R1bGVzL2NvcmUtanMvaW50ZXJuYWxzL2FycmF5LXNsaWNlLmpzIiwid2VicGFjazovLy8uLi8uLi9ub2RlX21vZHVsZXMvY29yZS1qcy9pbnRlcm5hbHMvYXJyYXktc29ydC5qcyIsIndlYnBhY2s6Ly8vLi4vLi4vbm9kZV9tb2R1bGVzL2NvcmUtanMvaW50ZXJuYWxzL2NhbGwtd2l0aC1zYWZlLWl0ZXJhdGlvbi1jbG9zaW5nLmpzIiwid2VicGFjazovLy8uLi8uLi9ub2RlX21vZHVsZXMvY29yZS1qcy9pbnRlcm5hbHMvY2xhc3NvZi1yYXcuanMiLCJ3ZWJwYWNrOi8vLy4uLy4uL25vZGVfbW9kdWxlcy9jb3JlLWpzL2ludGVybmFscy9jbGFzc29mLmpzIiwid2VicGFjazovLy8uLi8uLi9ub2RlX21vZHVsZXMvY29yZS1qcy9pbnRlcm5hbHMvY29weS1jb25zdHJ1Y3Rvci1wcm9wZXJ0aWVzLmpzIiwid2VicGFjazovLy8uLi8uLi9ub2RlX21vZHVsZXMvY29yZS1qcy9pbnRlcm5hbHMvY29ycmVjdC1wcm90b3R5cGUtZ2V0dGVyLmpzIiwid2VicGFjazovLy8uLi8uLi9ub2RlX21vZHVsZXMvY29yZS1qcy9pbnRlcm5hbHMvY3JlYXRlLWl0ZXItcmVzdWx0LW9iamVjdC5qcyIsIndlYnBhY2s6Ly8vLi4vLi4vbm9kZV9tb2R1bGVzL2NvcmUtanMvaW50ZXJuYWxzL2NyZWF0ZS1ub24tZW51bWVyYWJsZS1wcm9wZXJ0eS5qcyIsIndlYnBhY2s6Ly8vLi4vLi4vbm9kZV9tb2R1bGVzL2NvcmUtanMvaW50ZXJuYWxzL2NyZWF0ZS1wcm9wZXJ0eS1kZXNjcmlwdG9yLmpzIiwid2VicGFjazovLy8uLi8uLi9ub2RlX21vZHVsZXMvY29yZS1qcy9pbnRlcm5hbHMvY3JlYXRlLXByb3BlcnR5LmpzIiwid2VicGFjazovLy8uLi8uLi9ub2RlX21vZHVsZXMvY29yZS1qcy9pbnRlcm5hbHMvZGVmaW5lLWJ1aWx0LWluLWFjY2Vzc29yLmpzIiwid2VicGFjazovLy8uLi8uLi9ub2RlX21vZHVsZXMvY29yZS1qcy9pbnRlcm5hbHMvZGVmaW5lLWJ1aWx0LWluLmpzIiwid2VicGFjazovLy8uLi8uLi9ub2RlX21vZHVsZXMvY29yZS1qcy9pbnRlcm5hbHMvZGVmaW5lLWJ1aWx0LWlucy5qcyIsIndlYnBhY2s6Ly8vLi4vLi4vbm9kZV9tb2R1bGVzL2NvcmUtanMvaW50ZXJuYWxzL2RlZmluZS1nbG9iYWwtcHJvcGVydHkuanMiLCJ3ZWJwYWNrOi8vLy4uLy4uL25vZGVfbW9kdWxlcy9jb3JlLWpzL2ludGVybmFscy9kZXNjcmlwdG9ycy5qcyIsIndlYnBhY2s6Ly8vLi4vLi4vbm9kZV9tb2R1bGVzL2NvcmUtanMvaW50ZXJuYWxzL2RvY3VtZW50LWNyZWF0ZS1lbGVtZW50LmpzIiwid2VicGFjazovLy8uLi8uLi9ub2RlX21vZHVsZXMvY29yZS1qcy9pbnRlcm5hbHMvZW5naW5lLXVzZXItYWdlbnQuanMiLCJ3ZWJwYWNrOi8vLy4uLy4uL25vZGVfbW9kdWxlcy9jb3JlLWpzL2ludGVybmFscy9lbmdpbmUtdjgtdmVyc2lvbi5qcyIsIndlYnBhY2s6Ly8vLi4vLi4vbm9kZV9tb2R1bGVzL2NvcmUtanMvaW50ZXJuYWxzL2VudW0tYnVnLWtleXMuanMiLCJ3ZWJwYWNrOi8vLy4uLy4uL25vZGVfbW9kdWxlcy9jb3JlLWpzL2ludGVybmFscy9leHBvcnQuanMiLCJ3ZWJwYWNrOi8vLy4uLy4uL25vZGVfbW9kdWxlcy9jb3JlLWpzL2ludGVybmFscy9mYWlscy5qcyIsIndlYnBhY2s6Ly8vLi4vLi4vbm9kZV9tb2R1bGVzL2NvcmUtanMvaW50ZXJuYWxzL2ZpeC1yZWdleHAtd2VsbC1rbm93bi1zeW1ib2wtbG9naWMuanMiLCJ3ZWJwYWNrOi8vLy4uLy4uL25vZGVfbW9kdWxlcy9jb3JlLWpzL2ludGVybmFscy9mdW5jdGlvbi1hcHBseS5qcyIsIndlYnBhY2s6Ly8vLi4vLi4vbm9kZV9tb2R1bGVzL2NvcmUtanMvaW50ZXJuYWxzL2Z1bmN0aW9uLWJpbmQtY29udGV4dC5qcyIsIndlYnBhY2s6Ly8vLi4vLi4vbm9kZV9tb2R1bGVzL2NvcmUtanMvaW50ZXJuYWxzL2Z1bmN0aW9uLWJpbmQtbmF0aXZlLmpzIiwid2VicGFjazovLy8uLi8uLi9ub2RlX21vZHVsZXMvY29yZS1qcy9pbnRlcm5hbHMvZnVuY3Rpb24tY2FsbC5qcyIsIndlYnBhY2s6Ly8vLi4vLi4vbm9kZV9tb2R1bGVzL2NvcmUtanMvaW50ZXJuYWxzL2Z1bmN0aW9uLW5hbWUuanMiLCJ3ZWJwYWNrOi8vLy4uLy4uL25vZGVfbW9kdWxlcy9jb3JlLWpzL2ludGVybmFscy9mdW5jdGlvbi11bmN1cnJ5LXRoaXMtYWNjZXNzb3IuanMiLCJ3ZWJwYWNrOi8vLy4uLy4uL25vZGVfbW9kdWxlcy9jb3JlLWpzL2ludGVybmFscy9mdW5jdGlvbi11bmN1cnJ5LXRoaXMtY2xhdXNlLmpzIiwid2VicGFjazovLy8uLi8uLi9ub2RlX21vZHVsZXMvY29yZS1qcy9pbnRlcm5hbHMvZnVuY3Rpb24tdW5jdXJyeS10aGlzLmpzIiwid2VicGFjazovLy8uLi8uLi9ub2RlX21vZHVsZXMvY29yZS1qcy9pbnRlcm5hbHMvZ2V0LWJ1aWx0LWluLmpzIiwid2VicGFjazovLy8uLi8uLi9ub2RlX21vZHVsZXMvY29yZS1qcy9pbnRlcm5hbHMvZ2V0LWl0ZXJhdG9yLW1ldGhvZC5qcyIsIndlYnBhY2s6Ly8vLi4vLi4vbm9kZV9tb2R1bGVzL2NvcmUtanMvaW50ZXJuYWxzL2dldC1pdGVyYXRvci5qcyIsIndlYnBhY2s6Ly8vLi4vLi4vbm9kZV9tb2R1bGVzL2NvcmUtanMvaW50ZXJuYWxzL2dldC1tZXRob2QuanMiLCJ3ZWJwYWNrOi8vLy4uLy4uL25vZGVfbW9kdWxlcy9jb3JlLWpzL2ludGVybmFscy9nZXQtc3Vic3RpdHV0aW9uLmpzIiwid2VicGFjazovLy8uLi8uLi9ub2RlX21vZHVsZXMvY29yZS1qcy9pbnRlcm5hbHMvZ2xvYmFsLmpzIiwid2VicGFjazovLy8uLi8uLi9ub2RlX21vZHVsZXMvY29yZS1qcy9pbnRlcm5hbHMvaGFzLW93bi1wcm9wZXJ0eS5qcyIsIndlYnBhY2s6Ly8vLi4vLi4vbm9kZV9tb2R1bGVzL2NvcmUtanMvaW50ZXJuYWxzL2hpZGRlbi1rZXlzLmpzIiwid2VicGFjazovLy8uLi8uLi9ub2RlX21vZHVsZXMvY29yZS1qcy9pbnRlcm5hbHMvaHRtbC5qcyIsIndlYnBhY2s6Ly8vLi4vLi4vbm9kZV9tb2R1bGVzL2NvcmUtanMvaW50ZXJuYWxzL2llOC1kb20tZGVmaW5lLmpzIiwid2VicGFjazovLy8uLi8uLi9ub2RlX21vZHVsZXMvY29yZS1qcy9pbnRlcm5hbHMvaW5kZXhlZC1vYmplY3QuanMiLCJ3ZWJwYWNrOi8vLy4uLy4uL25vZGVfbW9kdWxlcy9jb3JlLWpzL2ludGVybmFscy9pbmhlcml0LWlmLXJlcXVpcmVkLmpzIiwid2VicGFjazovLy8uLi8uLi9ub2RlX21vZHVsZXMvY29yZS1qcy9pbnRlcm5hbHMvaW5zcGVjdC1zb3VyY2UuanMiLCJ3ZWJwYWNrOi8vLy4uLy4uL25vZGVfbW9kdWxlcy9jb3JlLWpzL2ludGVybmFscy9pbnRlcm5hbC1zdGF0ZS5qcyIsIndlYnBhY2s6Ly8vLi4vLi4vbm9kZV9tb2R1bGVzL2NvcmUtanMvaW50ZXJuYWxzL2lzLWFycmF5LWl0ZXJhdG9yLW1ldGhvZC5qcyIsIndlYnBhY2s6Ly8vLi4vLi4vbm9kZV9tb2R1bGVzL2NvcmUtanMvaW50ZXJuYWxzL2lzLWNhbGxhYmxlLmpzIiwid2VicGFjazovLy8uLi8uLi9ub2RlX21vZHVsZXMvY29yZS1qcy9pbnRlcm5hbHMvaXMtY29uc3RydWN0b3IuanMiLCJ3ZWJwYWNrOi8vLy4uLy4uL25vZGVfbW9kdWxlcy9jb3JlLWpzL2ludGVybmFscy9pcy1mb3JjZWQuanMiLCJ3ZWJwYWNrOi8vLy4uLy4uL25vZGVfbW9kdWxlcy9jb3JlLWpzL2ludGVybmFscy9pcy1udWxsLW9yLXVuZGVmaW5lZC5qcyIsIndlYnBhY2s6Ly8vLi4vLi4vbm9kZV9tb2R1bGVzL2NvcmUtanMvaW50ZXJuYWxzL2lzLW9iamVjdC5qcyIsIndlYnBhY2s6Ly8vLi4vLi4vbm9kZV9tb2R1bGVzL2NvcmUtanMvaW50ZXJuYWxzL2lzLXBvc3NpYmxlLXByb3RvdHlwZS5qcyIsIndlYnBhY2s6Ly8vLi4vLi4vbm9kZV9tb2R1bGVzL2NvcmUtanMvaW50ZXJuYWxzL2lzLXB1cmUuanMiLCJ3ZWJwYWNrOi8vLy4uLy4uL25vZGVfbW9kdWxlcy9jb3JlLWpzL2ludGVybmFscy9pcy1yZWdleHAuanMiLCJ3ZWJwYWNrOi8vLy4uLy4uL25vZGVfbW9kdWxlcy9jb3JlLWpzL2ludGVybmFscy9pcy1zeW1ib2wuanMiLCJ3ZWJwYWNrOi8vLy4uLy4uL25vZGVfbW9kdWxlcy9jb3JlLWpzL2ludGVybmFscy9pdGVyYXRvci1jbG9zZS5qcyIsIndlYnBhY2s6Ly8vLi4vLi4vbm9kZV9tb2R1bGVzL2NvcmUtanMvaW50ZXJuYWxzL2l0ZXJhdG9yLWNyZWF0ZS1jb25zdHJ1Y3Rvci5qcyIsIndlYnBhY2s6Ly8vLi4vLi4vbm9kZV9tb2R1bGVzL2NvcmUtanMvaW50ZXJuYWxzL2l0ZXJhdG9yLWRlZmluZS5qcyIsIndlYnBhY2s6Ly8vLi4vLi4vbm9kZV9tb2R1bGVzL2NvcmUtanMvaW50ZXJuYWxzL2l0ZXJhdG9ycy1jb3JlLmpzIiwid2VicGFjazovLy8uLi8uLi9ub2RlX21vZHVsZXMvY29yZS1qcy9pbnRlcm5hbHMvaXRlcmF0b3JzLmpzIiwid2VicGFjazovLy8uLi8uLi9ub2RlX21vZHVsZXMvY29yZS1qcy9pbnRlcm5hbHMvbGVuZ3RoLW9mLWFycmF5LWxpa2UuanMiLCJ3ZWJwYWNrOi8vLy4uLy4uL25vZGVfbW9kdWxlcy9jb3JlLWpzL2ludGVybmFscy9tYWtlLWJ1aWx0LWluLmpzIiwid2VicGFjazovLy8uLi8uLi9ub2RlX21vZHVsZXMvY29yZS1qcy9pbnRlcm5hbHMvbWF0aC10cnVuYy5qcyIsIndlYnBhY2s6Ly8vLi4vLi4vbm9kZV9tb2R1bGVzL2NvcmUtanMvaW50ZXJuYWxzL29iamVjdC1hc3NpZ24uanMiLCJ3ZWJwYWNrOi8vLy4uLy4uL25vZGVfbW9kdWxlcy9jb3JlLWpzL2ludGVybmFscy9vYmplY3QtY3JlYXRlLmpzIiwid2VicGFjazovLy8uLi8uLi9ub2RlX21vZHVsZXMvY29yZS1qcy9pbnRlcm5hbHMvb2JqZWN0LWRlZmluZS1wcm9wZXJ0aWVzLmpzIiwid2VicGFjazovLy8uLi8uLi9ub2RlX21vZHVsZXMvY29yZS1qcy9pbnRlcm5hbHMvb2JqZWN0LWRlZmluZS1wcm9wZXJ0eS5qcyIsIndlYnBhY2s6Ly8vLi4vLi4vbm9kZV9tb2R1bGVzL2NvcmUtanMvaW50ZXJuYWxzL29iamVjdC1nZXQtb3duLXByb3BlcnR5LWRlc2NyaXB0b3IuanMiLCJ3ZWJwYWNrOi8vLy4uLy4uL25vZGVfbW9kdWxlcy9jb3JlLWpzL2ludGVybmFscy9vYmplY3QtZ2V0LW93bi1wcm9wZXJ0eS1uYW1lcy5qcyIsIndlYnBhY2s6Ly8vLi4vLi4vbm9kZV9tb2R1bGVzL2NvcmUtanMvaW50ZXJuYWxzL29iamVjdC1nZXQtb3duLXByb3BlcnR5LXN5bWJvbHMuanMiLCJ3ZWJwYWNrOi8vLy4uLy4uL25vZGVfbW9kdWxlcy9jb3JlLWpzL2ludGVybmFscy9vYmplY3QtZ2V0LXByb3RvdHlwZS1vZi5qcyIsIndlYnBhY2s6Ly8vLi4vLi4vbm9kZV9tb2R1bGVzL2NvcmUtanMvaW50ZXJuYWxzL29iamVjdC1pcy1wcm90b3R5cGUtb2YuanMiLCJ3ZWJwYWNrOi8vLy4uLy4uL25vZGVfbW9kdWxlcy9jb3JlLWpzL2ludGVybmFscy9vYmplY3Qta2V5cy1pbnRlcm5hbC5qcyIsIndlYnBhY2s6Ly8vLi4vLi4vbm9kZV9tb2R1bGVzL2NvcmUtanMvaW50ZXJuYWxzL29iamVjdC1rZXlzLmpzIiwid2VicGFjazovLy8uLi8uLi9ub2RlX21vZHVsZXMvY29yZS1qcy9pbnRlcm5hbHMvb2JqZWN0LXByb3BlcnR5LWlzLWVudW1lcmFibGUuanMiLCJ3ZWJwYWNrOi8vLy4uLy4uL25vZGVfbW9kdWxlcy9jb3JlLWpzL2ludGVybmFscy9vYmplY3Qtc2V0LXByb3RvdHlwZS1vZi5qcyIsIndlYnBhY2s6Ly8vLi4vLi4vbm9kZV9tb2R1bGVzL2NvcmUtanMvaW50ZXJuYWxzL29yZGluYXJ5LXRvLXByaW1pdGl2ZS5qcyIsIndlYnBhY2s6Ly8vLi4vLi4vbm9kZV9tb2R1bGVzL2NvcmUtanMvaW50ZXJuYWxzL293bi1rZXlzLmpzIiwid2VicGFjazovLy8uLi8uLi9ub2RlX21vZHVsZXMvY29yZS1qcy9pbnRlcm5hbHMvcHJveHktYWNjZXNzb3IuanMiLCJ3ZWJwYWNrOi8vLy4uLy4uL25vZGVfbW9kdWxlcy9jb3JlLWpzL2ludGVybmFscy9yZWdleHAtZXhlYy1hYnN0cmFjdC5qcyIsIndlYnBhY2s6Ly8vLi4vLi4vbm9kZV9tb2R1bGVzL2NvcmUtanMvaW50ZXJuYWxzL3JlZ2V4cC1leGVjLmpzIiwid2VicGFjazovLy8uLi8uLi9ub2RlX21vZHVsZXMvY29yZS1qcy9pbnRlcm5hbHMvcmVnZXhwLWZsYWdzLmpzIiwid2VicGFjazovLy8uLi8uLi9ub2RlX21vZHVsZXMvY29yZS1qcy9pbnRlcm5hbHMvcmVnZXhwLWdldC1mbGFncy5qcyIsIndlYnBhY2s6Ly8vLi4vLi4vbm9kZV9tb2R1bGVzL2NvcmUtanMvaW50ZXJuYWxzL3JlZ2V4cC1zdGlja3ktaGVscGVycy5qcyIsIndlYnBhY2s6Ly8vLi4vLi4vbm9kZV9tb2R1bGVzL2NvcmUtanMvaW50ZXJuYWxzL3JlZ2V4cC11bnN1cHBvcnRlZC1kb3QtYWxsLmpzIiwid2VicGFjazovLy8uLi8uLi9ub2RlX21vZHVsZXMvY29yZS1qcy9pbnRlcm5hbHMvcmVnZXhwLXVuc3VwcG9ydGVkLW5jZy5qcyIsIndlYnBhY2s6Ly8vLi4vLi4vbm9kZV9tb2R1bGVzL2NvcmUtanMvaW50ZXJuYWxzL3JlcXVpcmUtb2JqZWN0LWNvZXJjaWJsZS5qcyIsIndlYnBhY2s6Ly8vLi4vLi4vbm9kZV9tb2R1bGVzL2NvcmUtanMvaW50ZXJuYWxzL3NhZmUtZ2V0LWJ1aWx0LWluLmpzIiwid2VicGFjazovLy8uLi8uLi9ub2RlX21vZHVsZXMvY29yZS1qcy9pbnRlcm5hbHMvc2V0LXNwZWNpZXMuanMiLCJ3ZWJwYWNrOi8vLy4uLy4uL25vZGVfbW9kdWxlcy9jb3JlLWpzL2ludGVybmFscy9zZXQtdG8tc3RyaW5nLXRhZy5qcyIsIndlYnBhY2s6Ly8vLi4vLi4vbm9kZV9tb2R1bGVzL2NvcmUtanMvaW50ZXJuYWxzL3NoYXJlZC1rZXkuanMiLCJ3ZWJwYWNrOi8vLy4uLy4uL25vZGVfbW9kdWxlcy9jb3JlLWpzL2ludGVybmFscy9zaGFyZWQtc3RvcmUuanMiLCJ3ZWJwYWNrOi8vLy4uLy4uL25vZGVfbW9kdWxlcy9jb3JlLWpzL2ludGVybmFscy9zaGFyZWQuanMiLCJ3ZWJwYWNrOi8vLy4uLy4uL25vZGVfbW9kdWxlcy9jb3JlLWpzL2ludGVybmFscy9zcGVjaWVzLWNvbnN0cnVjdG9yLmpzIiwid2VicGFjazovLy8uLi8uLi9ub2RlX21vZHVsZXMvY29yZS1qcy9pbnRlcm5hbHMvc3RyaW5nLW11bHRpYnl0ZS5qcyIsIndlYnBhY2s6Ly8vLi4vLi4vbm9kZV9tb2R1bGVzL2NvcmUtanMvaW50ZXJuYWxzL3N0cmluZy1wdW55Y29kZS10by1hc2NpaS5qcyIsIndlYnBhY2s6Ly8vLi4vLi4vbm9kZV9tb2R1bGVzL2NvcmUtanMvaW50ZXJuYWxzL3N5bWJvbC1jb25zdHJ1Y3Rvci1kZXRlY3Rpb24uanMiLCJ3ZWJwYWNrOi8vLy4uLy4uL25vZGVfbW9kdWxlcy9jb3JlLWpzL2ludGVybmFscy90by1hYnNvbHV0ZS1pbmRleC5qcyIsIndlYnBhY2s6Ly8vLi4vLi4vbm9kZV9tb2R1bGVzL2NvcmUtanMvaW50ZXJuYWxzL3RvLWluZGV4ZWQtb2JqZWN0LmpzIiwid2VicGFjazovLy8uLi8uLi9ub2RlX21vZHVsZXMvY29yZS1qcy9pbnRlcm5hbHMvdG8taW50ZWdlci1vci1pbmZpbml0eS5qcyIsIndlYnBhY2s6Ly8vLi4vLi4vbm9kZV9tb2R1bGVzL2NvcmUtanMvaW50ZXJuYWxzL3RvLWxlbmd0aC5qcyIsIndlYnBhY2s6Ly8vLi4vLi4vbm9kZV9tb2R1bGVzL2NvcmUtanMvaW50ZXJuYWxzL3RvLW9iamVjdC5qcyIsIndlYnBhY2s6Ly8vLi4vLi4vbm9kZV9tb2R1bGVzL2NvcmUtanMvaW50ZXJuYWxzL3RvLXByaW1pdGl2ZS5qcyIsIndlYnBhY2s6Ly8vLi4vLi4vbm9kZV9tb2R1bGVzL2NvcmUtanMvaW50ZXJuYWxzL3RvLXByb3BlcnR5LWtleS5qcyIsIndlYnBhY2s6Ly8vLi4vLi4vbm9kZV9tb2R1bGVzL2NvcmUtanMvaW50ZXJuYWxzL3RvLXN0cmluZy10YWctc3VwcG9ydC5qcyIsIndlYnBhY2s6Ly8vLi4vLi4vbm9kZV9tb2R1bGVzL2NvcmUtanMvaW50ZXJuYWxzL3RvLXN0cmluZy5qcyIsIndlYnBhY2s6Ly8vLi4vLi4vbm9kZV9tb2R1bGVzL2NvcmUtanMvaW50ZXJuYWxzL3RyeS10by1zdHJpbmcuanMiLCJ3ZWJwYWNrOi8vLy4uLy4uL25vZGVfbW9kdWxlcy9jb3JlLWpzL2ludGVybmFscy91aWQuanMiLCJ3ZWJwYWNrOi8vLy4uLy4uL25vZGVfbW9kdWxlcy9jb3JlLWpzL2ludGVybmFscy91cmwtY29uc3RydWN0b3ItZGV0ZWN0aW9uLmpzIiwid2VicGFjazovLy8uLi8uLi9ub2RlX21vZHVsZXMvY29yZS1qcy9pbnRlcm5hbHMvdXNlLXN5bWJvbC1hcy11aWQuanMiLCJ3ZWJwYWNrOi8vLy4uLy4uL25vZGVfbW9kdWxlcy9jb3JlLWpzL2ludGVybmFscy92OC1wcm90b3R5cGUtZGVmaW5lLWJ1Zy5qcyIsIndlYnBhY2s6Ly8vLi4vLi4vbm9kZV9tb2R1bGVzL2NvcmUtanMvaW50ZXJuYWxzL3ZhbGlkYXRlLWFyZ3VtZW50cy1sZW5ndGguanMiLCJ3ZWJwYWNrOi8vLy4uLy4uL25vZGVfbW9kdWxlcy9jb3JlLWpzL2ludGVybmFscy93ZWFrLW1hcC1iYXNpYy1kZXRlY3Rpb24uanMiLCJ3ZWJwYWNrOi8vLy4uLy4uL25vZGVfbW9kdWxlcy9jb3JlLWpzL2ludGVybmFscy93ZWxsLWtub3duLXN5bWJvbC5qcyIsIndlYnBhY2s6Ly8vLi4vLi4vbm9kZV9tb2R1bGVzL2NvcmUtanMvbW9kdWxlcy9lcy5hcnJheS5pbmNsdWRlcy5qcyIsIndlYnBhY2s6Ly8vLi4vLi4vbm9kZV9tb2R1bGVzL2NvcmUtanMvbW9kdWxlcy9lcy5hcnJheS5pdGVyYXRvci5qcyIsIndlYnBhY2s6Ly8vLi4vLi4vbm9kZV9tb2R1bGVzL2NvcmUtanMvbW9kdWxlcy9lcy5yZWdleHAuY29uc3RydWN0b3IuanMiLCJ3ZWJwYWNrOi8vLy4uLy4uL25vZGVfbW9kdWxlcy9jb3JlLWpzL21vZHVsZXMvZXMucmVnZXhwLmV4ZWMuanMiLCJ3ZWJwYWNrOi8vLy4uLy4uL25vZGVfbW9kdWxlcy9jb3JlLWpzL21vZHVsZXMvZXMuc3RyaW5nLml0ZXJhdG9yLmpzIiwid2VicGFjazovLy8uLi8uLi9ub2RlX21vZHVsZXMvY29yZS1qcy9tb2R1bGVzL2VzLnN0cmluZy5tYXRjaC1hbGwuanMiLCJ3ZWJwYWNrOi8vLy4uLy4uL25vZGVfbW9kdWxlcy9jb3JlLWpzL21vZHVsZXMvZXMuc3RyaW5nLnJlcGxhY2UtYWxsLmpzIiwid2VicGFjazovLy8uLi8uLi9ub2RlX21vZHVsZXMvY29yZS1qcy9tb2R1bGVzL2VzLnN0cmluZy5yZXBsYWNlLmpzIiwid2VicGFjazovLy8uLi8uLi9ub2RlX21vZHVsZXMvY29yZS1qcy9tb2R1bGVzL2VzbmV4dC5zdHJpbmcubWF0Y2gtYWxsLmpzIiwid2VicGFjazovLy8uLi8uLi9ub2RlX21vZHVsZXMvY29yZS1qcy9tb2R1bGVzL2VzbmV4dC5zdHJpbmcucmVwbGFjZS1hbGwuanMiLCJ3ZWJwYWNrOi8vLy4uLy4uL25vZGVfbW9kdWxlcy9jb3JlLWpzL21vZHVsZXMvd2ViLnVybC1zZWFyY2gtcGFyYW1zLmNvbnN0cnVjdG9yLmpzIiwid2VicGFjazovLy8uLi8uLi9ub2RlX21vZHVsZXMvY29yZS1qcy9tb2R1bGVzL3dlYi51cmwtc2VhcmNoLXBhcmFtcy5qcyIsIndlYnBhY2s6Ly8vLi4vLi4vbm9kZV9tb2R1bGVzL2NvcmUtanMvbW9kdWxlcy93ZWIudXJsLmNvbnN0cnVjdG9yLmpzIiwid2VicGFjazovLy8uLi8uLi9ub2RlX21vZHVsZXMvY29yZS1qcy9tb2R1bGVzL3dlYi51cmwuanMiLCJ3ZWJwYWNrOi8vL3dlYnBhY2svYm9vdHN0cmFwIiwid2VicGFjazovLy93ZWJwYWNrL3J1bnRpbWUvY29tcGF0IGdldCBkZWZhdWx0IGV4cG9ydCIsIndlYnBhY2s6Ly8vd2VicGFjay9ydW50aW1lL2RlZmluZSBwcm9wZXJ0eSBnZXR0ZXJzIiwid2VicGFjazovLy93ZWJwYWNrL3J1bnRpbWUvZW5zdXJlIGNodW5rIiwid2VicGFjazovLy93ZWJwYWNrL3J1bnRpbWUvZ2V0IGphdmFzY3JpcHQgY2h1bmsgZmlsZW5hbWUiLCJ3ZWJwYWNrOi8vL3dlYnBhY2svcnVudGltZS9nZXQgbWluaS1jc3MgY2h1bmsgZmlsZW5hbWUiLCJ3ZWJwYWNrOi8vL3dlYnBhY2svcnVudGltZS9nbG9iYWwiLCJ3ZWJwYWNrOi8vL3dlYnBhY2svcnVudGltZS9oYXNPd25Qcm9wZXJ0eSBzaG9ydGhhbmQiLCJ3ZWJwYWNrOi8vL3dlYnBhY2svcnVudGltZS9sb2FkIHNjcmlwdCIsIndlYnBhY2s6Ly8vd2VicGFjay9ydW50aW1lL21ha2UgbmFtZXNwYWNlIG9iamVjdCIsIndlYnBhY2s6Ly8vd2VicGFjay9ydW50aW1lL3B1YmxpY1BhdGgiLCJ3ZWJwYWNrOi8vL3dlYnBhY2svcnVudGltZS9qc29ucCBjaHVuayBsb2FkaW5nIiwid2VicGFjazovLy8uL21haW4uanMiXSwic291cmNlc0NvbnRlbnQiOlsiLy8vLy8vLy8vLy8vLy8vL1xuLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vXG4vLy8vLy8vLy9cbmltcG9ydCAnLi4vLi4vZXhhbXBsZXMvdGV4dGFyZWFJbnNlcnRzXzJjb2xzLmNzcydcbi8vLy8vLy8vLy9cblxuaW1wb3J0IHsgdGV4dGFyZWFJbnNlcnRzLCB0b29sYmFyTWF0aE9wZXJhdG9ycywgdG9vbGJhckZyYWN0aW9uLCB0b29sYmFyQ29tcGFyaXNvbiwgdG9vbGJhclBlcmNlbnQsIHRvb2xiYXJFdXJvIH0gZnJvbSAnLi4vLi4vbGlicy90ZXh0YXJlYUluc2VydHMnXG5cbmNvbnN0IHRvb2xiYXJzID0ge1xuXHRjb21wOiB0b29sYmFyQ29tcGFyaXNvbixcblx0bWF0aDogdG9vbGJhck1hdGhPcGVyYXRvcnMsXG5cdGZyYWN0OiB0b29sYmFyRnJhY3Rpb24sXG5cdHBlcmM6IHRvb2xiYXJQZXJjZW50LFxuXHRldXJvOiB0b29sYmFyRXVybyxcbn1cblxuZXhwb3J0IGNsYXNzIHRleHRhcmVhSW5zZXJ0c0Zyb21TY2hlbWEgZXh0ZW5kcyB0ZXh0YXJlYUluc2VydHMge1xuXG5cdGNvbnN0cnVjdG9yICggZGl2U2VsZWN0b3IsIG9wdHMgPSB7fSwgYmFzZSA9IG51bGwgKSB7XG5cblx0XHRpZiAoIGJhc2UuZnNtICYmIGJhc2UuZnNtLmluY0luaXRDbnQgKSB7XG5cdFx0XHRiYXNlLmZzbS5pbmNJbml0Q250KCk7XG5cdFx0fVxuXG5cdFx0bGV0IHdpZHRoO1xuLy8vLy8vLy8vLy8vLy8vLy8vXG5cdFx0d2lkdGggPSB3aW5kb3cuaW5uZXJXaWR0aDtcbi8vLy8vLy8vL1xuLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vL1xuLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy9cbi8vLy8vLy8vLy9cblx0XHRsZXQgd1dpZHRoID0gIG9wdHMud2lkdGg7XG5cdFx0aWYgKCB3V2lkdGg8PTAgKSB7XG5cdFx0XHR3V2lkdGggKz0gd2lkdGg7XG5cdFx0fTtcblxuXHRcdC8vIGhlaWdodCBpcyBjb250YWluZXIgaGVpZ2h0IG9yIHdpbmRvdy5oZWlnaHRcblx0XHRsZXQgaGVpZ2h0O1xuLy8vLy8vLy8vLy8vLy8vLy8vXG5cdFx0aGVpZ2h0ID0gd2luZG93LmlubmVySGVpZ2h0O1xuLy8vLy8vLy8vXG4vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vXG4vLy8vLy8vLy8vXG5cdFx0bGV0IHdIZWlnaHQgPSBvcHRzLmhlaWdodDtcblx0XHRpZiAoIHdIZWlnaHQ8PTAgKSB7XG5cdFx0XHR3SGVpZ2h0ICs9IGhlaWdodDtcblx0XHR9XG5cdFx0Y29uc3QgdG9vbGJhckNlbGxXaWR0aCA9IG9wdHMudG9vbGJhckNlbGxXaWR0aDtcblxuXHRcdGNvbnN0IGRlZnMgPSB7XG5cdFx0XHR0b29sYmFyRGlyZWN0aW9uOiAncm93Jyxcblx0XHRcdGRpdlN0eWxlczoge1xuXHRcdFx0XHR3aWR0aDogYCR7d1dpZHRoLTIqdG9vbGJhckNlbGxXaWR0aC01fXB4YCxcblx0XHRcdFx0aGVpZ2h0OiBgJHt3SGVpZ2h0fXB4YCxcblx0XHRcdH0sXG5cblx0XHRcdHRvb2xiYXJDb250YWluZXJTdHlsZXM6IHtcblx0XHRcdFx0Ly8gbGVmdDogYCR7d1dpZHRoLTYqdG9vbGJhckNlbGxXaWR0aC0xN31weGAsXG5cdFx0XHRcdC8vIHRvcDogYCR7d0hlaWdodC10b29sYmFyQ2VsbFdpZHRoLTE3fXB4YCxcblx0XHRcdFx0d2lkdGg6IGAkezIqdG9vbGJhckNlbGxXaWR0aH1weGAsXG5cdFx0XHRcdGhlaWdodDogYCR7Mip0b29sYmFyQ2VsbFdpZHRofXB4YCxcblx0XHRcdFx0J2ZsZXgtd3JhcCc6ICd3cmFwJyxcblx0XHRcdH0sXG5cblx0XHRcdHRvb2xiYXJDZWxsU3R5bGVzOiB7XG5cdFx0XHRcdHdpZHRoOiBgJHt0b29sYmFyQ2VsbFdpZHRofXB4YCxcblx0XHRcdFx0aGVpZ2h0OiBgJHt0b29sYmFyQ2VsbFdpZHRofXB4YCxcblx0XHRcdH0sXG5cblx0XHRcdHRvb2xiYXI6IFtdLFxuXHRcdH07XG5cdFx0aWYgKCBvcHRzLmRhdGFTZXR0aW5ncyApIHtcblx0XHRcdGRlZnMuZGF0YVNldHRpbmdzID0gb3B0cy5kYXRhU2V0dGluZ3M7XG5cdFx0fVxuXG5cdFx0Zm9yICggY29uc3QgdGIgaW4gdG9vbGJhcnMgKSB7XG5cdFx0XHRpZiAoIG9wdHMudG9vbGJhclt0Yl0gKSB7XG5cdFx0XHRcdGRlZnMudG9vbGJhciA9IGRlZnMudG9vbGJhci5jb25jYXQoIHRvb2xiYXJzW3RiXSApXG5cdFx0XHR9XG5cdFx0fVxuXG5cdFx0c3VwZXIoIGRpdlNlbGVjdG9yLCBkZWZzLCBiYXNlICk7XG5cblx0XHRpZiAoIGJhc2UuZnNtICYmIGJhc2UuZnNtLmRlY0luaXRDbnQgKSB7XG5cdFx0XHRiYXNlLmZzbS5kZWNJbml0Q250KCk7XG5cdFx0fVxuXHR9XG5cblx0c2NvcmVEZWYgKCkge1xuXG5cdFx0Y29uc3QgcHJlZiA9IHRoaXMuZGF0YVNldHRpbmdzLnZhcmlhYmxlUHJlZml4O1xuXHRcdGNvbnN0IHJlcyA9e1xuXHRcdFx0W2BWX0lucHV0XyR7cHJlZn1gXTogdGhpcy5leHRyYWN0KCksXG5cdFx0fTtcblx0XHRyZXR1cm4gcmVzO1xuXHR9XG5cbn1cbiIsImV4cG9ydCBmdW5jdGlvbiBjbGVhckNmZ0pzb24oIGpzb24gKSB7XG5cblx0aWYgKCB0eXBlb2YganNvbiAhPT0gJ29iamVjdCcgKSB7XG5cdFx0cmV0dXJuIGpzb247XG5cdH1cblx0aWYgKCBBcnJheS5pc0FycmF5KGpzb24pICkge1xuXHRcdHJldHVybiBqc29uLm1hcCggYSA9PiBjbGVhckNmZ0pzb24oYSkgKVxuXHR9XG5cblx0Y29uc3QgcmVzID0ge307XG5cblx0T2JqZWN0LmVudHJpZXMoIGpzb24gKS5mb3JFYWNoKCAoW2ssdl0pID0+IHtcblxuXHRcdGlmICggay5zdWJzdHJpbmcoIDAsIDMgKSA9PT0gJ19fXycgKSB7XG5cblx0XHRcdC8vIC8vIEtleXMgZGVyIEVsZW1lbnRlIGVpbmVzIEFycmF5cyBuZWhtZW5cblx0XHRcdC8vIGNvbnN0IGFyZWxrZXlzID0gay5tYXRjaCggL15fX19hcmVsa2V5c18oLiopLyApO1xuXHRcdFx0Ly8gaWYgKCBhcmVsa2V5cyApIHtcblx0XHRcdC8vIFx0anNvblsgYXJlbGtleXNbMV0gXSA9IHYubWFwKCBlID0+IE9iamVjdC5rZXlzKGUpICk7XG5cdFx0XHQvLyB9IGVsc2Uge1xuXG5cdFx0XHRcdC8vIFZhbHMgZGVyIEVsZW1lbnRlIGVpbmVzIEFycmF5cyBuZWhtZW5cblx0XHRcdFx0Y29uc3QgYXJlbHZhbHMgPSBrLm1hdGNoKCAvXl9fX2FyZWx2YWxzXyguKikvICk7XG5cdFx0XHRcdGlmICggYXJlbHZhbHMgKSB7XG5cdFx0XHRcdFx0cmVzWyBhcmVsdmFsc1sxXSBdID0gdi5tYXAoIGUgPT4gT2JqZWN0LnZhbHVlcyhlKS5tYXAoIGEgPT4gY2xlYXJDZmdKc29uKGEpICkgKTtcblx0XHRcdFx0fSBlbHNlIHtcblxuXHRcdFx0XHRcdC8vIEFsdGVybmF0aXZlIE5hbWVuIGVpbmZhY2ggc28gc3BlaWNoZXJuXG5cdFx0XHRcdFx0Y29uc3QgYWx0cyA9IGsubWF0Y2goIC9eX19fYWx0W15fXSpfKC4qKS8gKTtcblx0XHRcdFx0XHRpZiAoIGFsdHMgKSB7XG5cdFx0XHRcdFx0XHRpZiAoIHYgIT09IHVuZGVmaW5lZCApIHtcblx0XHRcdFx0XHRcdFx0cmVzWyBhbHRzWzFdIF0gPSBjbGVhckNmZ0pzb24oIHYgKTtcblx0XHRcdFx0XHRcdH1cblx0XHRcdFx0XHR9IGVsc2Uge1xuXG5cdFx0XHRcdFx0XHQvLyBfX18gT2JqZWN0IGluIGpzb24gaW50ZWdyaWVyZW5cblx0XHRcdFx0XHRcdGlmICggdHlwZW9mIHYgPT09ICdvYmplY3QnICkge1xuXHRcdFx0XHRcdFx0XHRPYmplY3QuYXNzaWduKCByZXMsIGNsZWFyQ2ZnSnNvbih2KSApO1xuXHRcdFx0XHRcdFx0fVxuXG5cdFx0XHRcdFx0fVxuXHRcdFx0XHR9XG5cdFx0XHQvLyB9XG5cblx0XHR9IGVsc2Uge1xuXG5cdFx0XHRpZiAoIHYgIT09IHVuZGVmaW5lZCApIHtcblx0XHRcdFx0Y29uc3Qgc3Vib2JqID0gay5tYXRjaCggL14oLio/KV9fXyguKikvICk7XG5cdFx0XHRcdGlmICggc3Vib2JqICkge1xuXHRcdFx0XHRcdC8vIHsgYWJjX19fZGVmOiAxMjMgfSA9PiB7IGFiYzogeyBkZWY6IDEyMyB9IH1cblx0XHRcdFx0XHRjb25zdCBuZXdPYmogPSBjbGVhckNmZ0pzb24oIHsgWyBzdWJvYmpbMl0gXTogdiB9ICk7XG5cdFx0XHRcdFx0aWYgKCAhKCBzdWJvYmpbMV0gaW4gcmVzICkgKSB7XG5cdFx0XHRcdFx0XHRyZXNbIHN1Ym9ialsxXSBdID0ge307XG5cdFx0XHRcdFx0fVxuXHRcdFx0XHRcdE9iamVjdC5hc3NpZ24oIHJlc1sgc3Vib2JqWzFdIF0sIG5ld09iaiApO1xuXHRcdFx0XHR9IGVsc2Uge1xuXHRcdFx0XHRcdC8vIGNvcHkgdmFsdWVcblx0XHRcdFx0XHRyZXNbIGsgXSA9IGNsZWFyQ2ZnSnNvbih2KTtcblx0XHRcdFx0fVxuXHRcdFx0fVxuXG5cdFx0fVxuXHR9KVxuXG5cdHJldHVybiByZXM7XG59XG5cbi8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vL1xuXG5pbXBvcnQgeyBpc0JldHdlZW4sIGlzTnVtVW5pdCB9IGZyb20gXCIuLi9saWJzL2NvbW1vblwiO1xuXG5mdW5jdGlvbiBkZWJ1Z0FuZENvbnNvbGVPdXQgKHMpIHtcblx0aWYgKCB0eXBlb2YgZGVidWdPdXQgIT09ICd1bmRlZmluZWQnIClcdHtcblx0XHRkZWJ1Z091dCggYDxzcGFuIGNsYXNzPVwiZXJyb3JcIj4ke3N9PC9zcGFuPmAgKTtcblx0fVxuXHRjb25zb2xlLmVycm9yKHMpO1xufVxuXG5leHBvcnQgZnVuY3Rpb24gYWRkU2NvcmluZyAoIG9iaiwgb3B0cywgUGFyc2VyPW51bGwsIGFkZEZuY3M9e30gKSB7XG5cblx0b2JqLmNvbXB1dGVTY29yaW5nVmFscyA9ICgpID0+IHt9O1xuXHRpZiAoICFQYXJzZXIgKSB7XG5cdFx0cmV0dXJuO1xuXHR9XG5cblx0Ly8gY3JlYXRlIFBhcnNlciwgYWRkIGFkZEZuY3Ncblx0Y29uc3QgcGFyc2VyID0gbmV3IFBhcnNlcigpO1xuXHRPYmplY3QuYXNzaWduKCBhZGRGbmNzLCB7XG5cdFx0aXNOdWxsOiB2ID0+IHY9PT1udWxsLFxuXHRcdGlzTnVtVW5pdCxcblx0XHRpc0JldHdlZW4sXG5cdFx0bWF0Y2g6IChhLHIsZmw9JycpID0+IGEudG9TdHJpbmcoKS5tYXRjaCggbmV3IFJlZ0V4cChyLGZsKSApLFxuXHRcdC8vIHJlZ2V4cDogKGEsYikgPT4gYS5tYXRjaChiKSxcblx0XHRzdHJFcXVhbDogKGEsYikgPT4gYS50b0xvd2VyQ2FzZSA9PSBiLnRvTG93ZXJDYXNlLFxuXHR9KTtcblx0Zm9yICggY29uc3QgZm5jIGluIGFkZEZuY3MgKSB7XG5cdFx0cGFyc2VyLmZ1bmN0aW9uc1tmbmNdPSBhZGRGbmNzW2ZuY107XG5cdH1cblxuXHRpZiAoIG9wdHMuZGF0YVNldHRpbmdzICYmIG9wdHMuZGF0YVNldHRpbmdzLnNjb3JpbmdWYWxzICYmIG9iai5zY29yZURlZiApIHtcblxuXHRcdGNvbnN0IHNjb3JpbmdWYWxzID0gb3B0cy5kYXRhU2V0dGluZ3Muc2NvcmluZ1ZhbHM7XG5cblx0XHRjb25zdCBzY29yZXMgPSBvYmouc2NvcmVEZWYoKTtcblx0XHRpZiAoIHR5cGVvZiBzY29yZXMgPT09ICdvYmplY3QnICkge1xuXHRcdFx0Y29uc3QgdmFyTmFtZXMgPSBPYmplY3Qua2V5cyggc2NvcmVzICk7XG5cdFx0XHRpZiAoIHZhck5hbWVzLmxlbmd0aD4wICkge1xuXG5cdFx0XHRcdHNjb3JpbmdWYWxzLmZvckVhY2goIHN2ID0+IHtcblx0XHRcdFx0XHRsZXQgY29uZCA9IHN2LmNvbmRpdGlvbjtcblx0XHRcdFx0XHRpZiAoIGNvbmQgKSB7XG5cdFx0XHRcdFx0XHRsZXQgc2F2ZUNvbmQgPSBjb25kO1xuXHRcdFx0XHRcdFx0Y29uc3QgYWxsVmFyc0luQ29uZCA9IGNvbmQubWF0Y2hBbGwoIC9cXCRcXHsoW159XSopfS9nICk7XG5cdFx0XHRcdFx0XHRmb3IgKCBjb25zdCB2biBvZiBhbGxWYXJzSW5Db25kICkge1xuXHRcdFx0XHRcdFx0XHRpZiAoIHZuWzFdLmxlbmd0aCA9PSAwICkge1xuXHRcdFx0XHRcdFx0XHRcdGRlYnVnQW5kQ29uc29sZU91dCggYFZhcmlhYmxlbi1OYW1lICdcXCR7fScgaW4gU2NvcmluZyBuaWNodCB6dWzDpHNzaWdgICk7XG5cdFx0XHRcdFx0XHRcdH0gZWxzZSB7XG5cdFx0XHRcdFx0XHRcdFx0Y29uc3QgdmFyc2VhcmNoID0gb3B0cy5kYXRhU2V0dGluZ3MudmFyaWFibGVQcmVmaXggPyB2blsxXS5yZXBsYWNlKCAvPHByZWY+L2ksIG9wdHMuZGF0YVNldHRpbmdzLnZhcmlhYmxlUHJlZml4ICkgOiB2blsxXTtcblx0XHRcdFx0XHRcdFx0XHRjb25zdCByZSA9IG5ldyBSZWdFeHAoIGAke3ZhcnNlYXJjaH0kYCwgJ2knICk7XG5cdFx0XHRcdFx0XHRcdFx0Y29uc3Qgc2VsVmFyTmFtZXMgPSB2YXJOYW1lcy5maWx0ZXIoIHYgPT4gdi5tYXRjaChyZSkgKTtcblx0XHRcdFx0XHRcdFx0XHRpZiAoIHNlbFZhck5hbWVzLmxlbmd0aD4xICkge1xuXHRcdFx0XHRcdFx0XHRcdFx0ZGVidWdBbmRDb25zb2xlT3V0KCBgVmFyaWFibGVuLU5hbWUgJ1xcJHske3ZuWzFdfX0nIGluIFNjb3JpbmcgaXN0IG5pY2h0IGVpbmRldXRpZ2ApO1xuXHRcdFx0XHRcdFx0XHRcdFx0c2F2ZUNvbmQgPSAnJztcblx0XHRcdFx0XHRcdFx0XHR9IGVsc2UgaWYgKCBzZWxWYXJOYW1lcy5sZW5ndGggPT0gMCApIHtcblx0XHRcdFx0XHRcdFx0XHRcdGRlYnVnQW5kQ29uc29sZU91dCggYFZhcmlhYmxlbi1OYW1lICdcXCR7JHt2blsxXX19JyBpbiBTY29yaW5nIHVuYmVrYW5udGApO1xuXHRcdFx0XHRcdFx0XHRcdFx0c2F2ZUNvbmQgPSAnJztcblx0XHRcdFx0XHRcdFx0XHR9IGVsc2Uge1xuXHRcdFx0XHRcdFx0XHRcdFx0c2F2ZUNvbmQgPSBzYXZlQ29uZC5yZXBsYWNlKCB2blswXSwgc2VsVmFyTmFtZXNbMF0gKTtcblx0XHRcdFx0XHRcdFx0XHR9XG5cdFx0XHRcdFx0XHRcdH1cblx0XHRcdFx0XHRcdH1cblx0XHRcdFx0XHRcdGlmICggc2F2ZUNvbmQgKSB7XG5cdFx0XHRcdFx0XHRcdC8vIGNoZWNrIGVycm9yc1xuXG5cdFx0XHRcdFx0XHRcdC8vIFtcblx0XHRcdFx0XHRcdFx0Ly8gXHRbIC8oPzwhWz0hPjxdKT0oPyFbPSFdKS9nLCBgV2VydHp1d2Vpc3VuZyAoPSkgc3RhdHQgVmVyZ2xlaWNoc29wZXJhdG9yICg9PSkgaW4gXCIke2NvbmR9XCIgZ2VmdW5kZW4hIElzdCBkYXMgYmVhYnNpY2h0aWd0P2AgXSxcblx0XHRcdFx0XHRcdFx0Ly8gXHRbIC88Pi9nLCBgWmVpY2hlbmtldHRlICg8Pikgc3RhdCAoIT0pIGluIFwiJHtjb25kfVwiIGdlZnVuZGVuISBJc3QgZGFzIGJlYWJzaWNodGlndD9gIF0sXG5cdFx0XHRcdFx0XHRcdC8vIFx0WyAvfHwvZywgYERvcHBlbHRlcyBcInx8XCIgc3RhdHQgXCJvclwiIGluIFwiJHtjb25kfVwiIGdlZnVuZGVuISBJc3QgZGFzIGJlYWJzaWNodGlndD9gIF0sXG5cdFx0XHRcdFx0XHRcdC8vIFx0WyAvJiYvZywgYERvcHBlbHRlcyBcIiYmXCIgc3RhdHQgXCJhbmRcIiBpbiBcIiR7Y29uZH1cIiBnZWZ1bmRlbiEgSXN0IGRhcyBiZWFic2ljaHRpZ3Q/YCBdLFxuXHRcdFx0XHRcdFx0XHQvLyBcdC8vIFsgLyg/PCFcXHwpKFxcfCkoPyFcXHwpL2csIGBFaW56ZWxuZXMgfCBzdGF0dCB8fCBpbiBcIiR7Y29uZH1cIiBnZWZ1bmRlbiEgSXN0IGRhcyBiZWFic2ljaHRpZ3Q/YCBdLFxuXHRcdFx0XHRcdFx0XHQvLyBcdC8vIFsgLyg/PCEmKSYoPyFcXCYpL2csIGBFaW56ZWxuZXMgJiBzdGF0dCAmJiBpbiBcIiR7Y29uZH1cIiBnZWZ1bmRlbiEgSXN0IGRhcyBiZWFic2ljaHRpZ3Q/YCBdLFxuXHRcdFx0XHRcdFx0XHQvLyBdLmZvckVhY2goIChbcmUsbXNnXSkgPT4ge1xuXHRcdFx0XHRcdFx0XHQvLyBcdGlmICggc2F2ZUNvbmQubWF0Y2gocmUpICkge1xuXHRcdFx0XHRcdFx0XHQvLyBcdFx0ZGVidWdBbmRDb25zb2xlT3V0KG1zZyk7XG5cdFx0XHRcdFx0XHRcdC8vIFx0fVxuXHRcdFx0XHRcdFx0XHQvLyB9KTtcblx0XHRcdFx0XHRcdFx0Ly8gSG90Rml4IGZvciBJQiBJbXBvcnRFeHRlcm5hbFZhcmlhYmxlczogaW50ZXJuYWwgYnJvd3NlciBkb2VzIG5vdCBzdXBwb3J0IFJlZ0V4cCBsb29rLWJlaGluZC8tZm9yd2FyZFxuXHRcdFx0XHRcdFx0XHRpZiAoIEFycmF5LmZyb20oIHNhdmVDb25kLm1hdGNoQWxsKCAvWyE8Pl0/PSsvZyApICkuc29tZSggbSA9PiBtWzBdPT0nPScgKSApIHtcblx0XHRcdFx0XHRcdFx0XHRkZWJ1Z0FuZENvbnNvbGVPdXQoIGBXZXJ0enV3ZWlzdW5nICg9KSBzdGF0dCBWZXJnbGVpY2hzb3BlcmF0b3IgKD09KSBpbiBcIiR7Y29uZH1cIiBnZWZ1bmRlbiEgSXN0IGRhcyBiZWFic2ljaHRpZ3Q/YCApO1xuXHRcdFx0XHRcdFx0XHR9XG5cdFx0XHRcdFx0XHRcdGlmICggc2F2ZUNvbmQuaW5jbHVkZXMoJzw+JykgKSB7XG5cdFx0XHRcdFx0XHRcdFx0ZGVidWdBbmRDb25zb2xlT3V0KCBgWmVpY2hlbmtldHRlICg8Pikgc3RhdCAoIT0pIGluIFwiJHtjb25kfVwiIGdlZnVuZGVuISBJc3QgZGFzIGJlYWJzaWNodGlndD9gICk7XG5cdFx0XHRcdFx0XHRcdH1cblx0XHRcdFx0XHRcdFx0aWYgKCBzYXZlQ29uZC5pbmNsdWRlcygnfHwnKSApIHtcblx0XHRcdFx0XHRcdFx0XHRkZWJ1Z0FuZENvbnNvbGVPdXQoIGBEb3BwZWx0ZXMgXCJ8fFwiIHN0YXR0IFwib3JcIiBpbiBcIiR7Y29uZH1cIiBnZWZ1bmRlbiEgSXN0IGRhcyBiZWFic2ljaHRpZ3Q/YCApO1xuXHRcdFx0XHRcdFx0XHR9XG5cdFx0XHRcdFx0XHRcdGlmICggc2F2ZUNvbmQuaW5jbHVkZXMoJyYmJykgKSB7XG5cdFx0XHRcdFx0XHRcdFx0ZGVidWdBbmRDb25zb2xlT3V0KCBgRG9wcGVsdGVzIFwiJiZcIiBzdGF0dCBcImFuZFwiIGluIFwiJHtjb25kfVwiIGdlZnVuZGVuISBJc3QgZGFzIGJlYWJzaWNodGlndD9gICk7XG5cdFx0XHRcdFx0XHRcdH1cblxuXHRcdFx0XHRcdFx0XHRpZiAoICEoICdzY29yaW5nVmFscycgaW4gb2JqICkgKSB7XG5cdFx0XHRcdFx0XHRcdFx0b2JqLnNjb3JpbmdWYWxzID0gW107XG5cdFx0XHRcdFx0XHRcdH1cblx0XHRcdFx0XHRcdFx0dHJ5IHtcblx0XHRcdFx0XHRcdFx0XHRvYmouc2NvcmluZ1ZhbHMucHVzaCggWyBzdi52YWwsIHBhcnNlci5wYXJzZSggc2F2ZUNvbmQgKSBdICk7XG5cdFx0XHRcdFx0XHRcdH0gY2F0Y2ggKGUpIHtcblx0XHRcdFx0XHRcdFx0XHRkZWJ1Z0FuZENvbnNvbGVPdXQoIGBGZWhsZXIgKCR7ZX0pIGluIFNjb3JpbmctQ29uZGl0aW9uOiAke2NvbmR9YCApO1xuXHRcdFx0XHRcdFx0XHR9XG5cdFx0XHRcdFx0XHR9XG5cdFx0XHRcdFx0fVxuXHRcdFx0XHR9KTtcblx0XHRcdH1cblx0XHR9XG5cdH1cblxuXHRpZiAoIG9iai5zY29yaW5nVmFscyApIHtcblx0XHRvYmouY29tcHV0ZVNjb3JpbmdWYWxzID0gZnVuY3Rpb24gKHJlcykge1xuXHRcdFx0bGV0IHNjb3JlID0gbnVsbDtcblx0XHRcdGNvbnN0IHNjb3JlRGF0ID0gdGhpcy5zY29yaW5nVmFscztcblx0XHRcdGZvciAoIGxldCBoPTA7IHNjb3JlPT09bnVsbCAmJiBoPHNjb3JlRGF0Lmxlbmd0aDsgaCsrICkge1xuXHRcdFx0XHRjb25zdCBbdixjXSA9IHNjb3JlRGF0W2hdO1xuXHRcdFx0XHR0cnkge1xuXHRcdFx0XHRcdGlmICggYy5ldmFsdWF0ZSggcmVzICkgKSB7XG5cdFx0XHRcdFx0XHRzY29yZSA9IHY7XG5cdFx0XHRcdFx0fVxuXHRcdFx0XHR9IGNhdGNoIChlKSB7XG5cdFx0XHRcdFx0ZGVidWdBbmRDb25zb2xlT3V0KCBgRXJyb3IgaW4gc2NvcmluZy1jb25kaXRpb246ICR7ZX0sICR7cmVzfWAgKTtcblx0XHRcdFx0fVxuXHRcdFx0fVxuXHRcdFx0Y29uc3QgbiA9IE51bWJlcihzY29yZSlcblx0XHRcdHJlc1sgYFZfU2NvcmVfJHt0aGlzLmRhdGFTZXR0aW5ncy52YXJpYWJsZVByZWZpeH1gIF0gPSBzY29yZSE9PSBudWxsICYmIG4hPT1OYU4gPyBuIDogc2NvcmU7XG5cdFx0fVxuXG5cdFx0aWYgKCBvYmouc2NvcmVEZWYgJiYgb2JqLmJhc2UgKSB7XG5cdFx0XHRvYmouYmFzZS5zZW5kQ2hhbmdlU3RhdGUoIG9iaiApO1xuXHRcdH1cblx0fVxuXG59XG5cbi8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vL1xuXG5leHBvcnQgZnVuY3Rpb24gYWRkU3RhdHVzVmFyRGVmICggb2JqLCBqc29uICkge1xuXG5cdGlmICggIW9iai5zdGF0dXNWYXJEZWYgJiYganNvbi5kYXRhU2V0dGluZ3MgJiYganNvbi5kYXRhU2V0dGluZ3MudmFyaWFibGVQcmVmaXggKSB7XG5cdFx0Y29uc3Qgc3RhdFZhck5hbWUgPSBgVl9TdGF0dXNfJHtqc29uLmRhdGFTZXR0aW5ncy52YXJpYWJsZVByZWZpeH1gO1xuXHRcdG9iai5zdGF0dXNWYXJEZWYgPSBmdW5jdGlvbiAoKSB7XG5cdFx0XHRyZXR1cm4ge1xuXHRcdFx0XHRbc3RhdFZhck5hbWVdOiArdGhpcy5nZXREZWZhdWx0Q2hhbmdlU3RhdGUoKSxcblx0XHRcdH1cblx0XHR9XG5cdH1cblxufVxuXG5cbi8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vXG5cbi8vIGNvbnZlcnQgXCIxIDM0LDU6Ni05XCIgdG8gWzEsMzQsNSw2LDcsOCw5XVxuLyoqXG4gKiBQYXJzZXMgYSBzdHJpbmcgY29udGFpbmluZyByYW5nZSB2YWx1ZXMgYW5kIHJldHVybnMgYW4gYXJyYXkgb2YgbnVtYmVycy5cbiAqIEBwYXJhbSB7c3RyaW5nfSBzIC0gVGhlIHN0cmluZyBjb250YWluaW5nIHRoZSByYW5nZSB2YWx1ZXMuXG4gKiBAcmV0dXJucyB7bnVtYmVyW119IC0gQW4gYXJyYXkgb2YgbnVtYmVycyBwYXJzZWQgZnJvbSB0aGUgcmFuZ2UgdmFsdWVzLlxuICovXG5leHBvcnQgY29uc3QgcmVhZFJhbmdlQXJyYXkgPSAocykgPT4ge1xuXHRjb25zdCByZXMgPSBbXTtcblxuXHRmb3IgKCBjb25zdCByciBvZiBzLm1hdGNoQWxsKCAvKFswLTldKykgKig/Oi0gKihbMC05XSspKT8vZyApICkge1xuXHRcdGlmICggcnJbMl0gJiYgcnJbMV08cnJbMl0gKSB7XG5cdFx0XHRjb25zdCBycjI9TnVtYmVyKHJyWzJdKTtcblx0XHRcdGZvciAoIGxldCBoPU51bWJlcihyclsxXSk7IGg8PXJyMjsgaCsrICkge1xuXHRcdFx0XHRyZXMucHVzaChoKTtcblx0XHRcdH1cblx0XHR9IGVsc2Uge1xuXHRcdFx0cmVzLnB1c2goIE51bWJlcihyclsxXSkgKVxuXHRcdH1cblx0fVxuXG5cdHJldHVybiByZXM7XG59XG5cbi8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vXG5cbi8qKlxuICogQ29udmVydHMgYW4gb2JqZWN0IGNvbnRhaW5pbmcgcHJvcGVydGllcyBmb3IgZGVjaW1hbCBwbGFjZXMsIGRlY2ltYWwgcHJlY2lzaW9uLCBhbmQgdW5pdHMgaW50byBhIHJlZ3VsYXIgZXhwcmVzc2lvbiBmb3IgaW5wdXQgdmFsaWRhdGlvbi5cbiAqIEBwYXJhbSB7T2JqZWN0fSBvYmogLSBUaGUgb2JqZWN0IGNvbnRhaW5pbmcgcHJvcGVydGllcyBmb3IgZGVjaW1hbCBwbGFjZXMsIGRlY2ltYWwgcHJlY2lzaW9uLCBhbmQgdW5pdHMuXG4gKi9cbmV4cG9ydCBjb25zdCBkcDJpbnB1dFJlZ0V4cCA9IChvYmopID0+IHtcblxuXHQvKipcblx0ICogR2VuZXJhdGVzIGEgcmVndWxhciBleHByZXNzaW9uIHBhdHRlcm4gZm9yIGEgZ2l2ZW4gdW5pdC4gKGNhc2UgaW5zZW5zaXRpdmUgY29uY2F0ZW5hdGlvbiBvZiB1cHBlciBhbmQgbG93ZXIgY2FzZSBjaGFyYWN0ZXJzKVxuXHQgKiBAcGFyYW0ge3N0cmluZ30gdSAtIFRoZSB1bml0IHN0cmluZy5cblx0ICogQHJldHVybnMge3N0cmluZ30gVGhlIHJlZ3VsYXIgZXhwcmVzc2lvbiBwYXR0ZXJuIGZvciB0aGUgdW5pdC5cblx0ICovXG5cdGNvbnN0IHVuaXRSZWdFeHAgPSAodSkgPT4ge1xuXHRcdGxldCByID0gJyc7XG5cdFx0Zm9yICggY29uc3QgYyBvZiB1LnRyaW0oKSApIHtcblx0XHRcdGNvbnN0IHUgPSBjLnRvVXBwZXJDYXNlKCk7XG5cdFx0XHRjb25zdCBsID0gYy50b0xvd2VyQ2FzZSgpO1xuXHRcdFx0ciArPSB1ICE9IGwgPyBgWyR7bH0ke3V9XT9gIDogYCR7Y30/YDtcblx0XHR9XG5cdFx0cmV0dXJuIHI7XG5cdH07XG5cblx0aWYgKCBvYmoucGRwIHx8IG9iai5kcCApIHtcblx0XHRsZXQgcmUgPSBgXlswLTldJHsgb2JqLnBkcCA/IGB7MCwke29iai5wZHB9fWAgOiAnKicgfWA7XG5cdFx0aWYgKCBvYmouZHAgKSB7XG5cdFx0XHRyZSArPSBgKFssLl1bMC05XXswLCR7b2JqLmRwfX0pP2A7XG5cdFx0fVxuXHRcdGlmICggb2JqLnVuaXRzICkge1xuXHRcdFx0cmUgKz0gYCA/KCR7b2JqLnVuaXRzLnNwbGl0KCd8JykubWFwKCB1ID0+IHVuaXRSZWdFeHAodSkgKS5qb2luKCd8Jyl9KT9gO1xuXHRcdH1cblx0XHRvYmouaW5wdXRSZWdleHAgPSByZSArICckJztcblx0fVxuXHRkZWxldGUgb2JqLnBkcDtcblx0ZGVsZXRlIG9iai5kcDtcblx0ZGVsZXRlIG9iai51bml0cztcbn1cblxuZXhwb3J0IGNvbnN0IGRwMmxhYkZuY0lucHV0UmVnRXhwID0gKCBvYmosIG9wdHMsIG5hbT0nJyApID0+IHtcblx0bGV0IGxWRiwgbFQ7XG5cdGlmICggIW9iaiApIHtcblx0XHRyZXR1cm5cblx0fVxuXG5cdGlmICggb2JqLmRwICYmICFvYmoudW5pdHMgKSB7XG5cdFx0bFZGID0gc3RyVG9OdW07XG5cdFx0bFQgPSAnTnVtYmVyJztcblx0fSBlbHNlIGlmICggb2JqLnBkcCAmJiAhb2JqLnVuaXRzICkge1xuXHRcdGxWRiA9IHN0clRvSW50O1xuXHRcdGxUID0gJ0ludGVnZXInO1xuXHR9IGVsc2Uge1xuXHRcdGxWRiA9IHYgPT4gdjtcblx0XHRsVCA9ICdTdHJpbmcnO1xuXHR9XG5cdG9wdHNbYGxhYiR7bmFtfVZhbEZuY2BdID0gbFZGO1xuXHRvcHRzW2BsYWIke25hbX1UeXBlYF0gPSBsVDtcblxuXHRkcDJpbnB1dFJlZ0V4cChvYmopO1xufVxuXG4vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vL1xuXG5leHBvcnQgY29uc3Qgc3RyVG9JbnQgPSAocykgPT4ge1xuXHRjb25zdCBuID0gcGFyc2VJbnQocyk7XG5cdHJldHVybiBOdW1iZXIuaXNOYU4obikgPyAwIDogbjtcbn1cblxuZXhwb3J0IGNvbnN0IHN0clRvTnVtID0gKHMpID0+IHtcblx0cyA9IHMucmVwbGFjZSggJywnLCAnLicgKTtcblx0cmV0dXJuIHBhcnNlRmxvYXQoIHMgKTtcblx0Ly8gY29uc3QgbiA9IHBhcnNlRmxvYXQoIHMgKTtcblx0Ly8gcmV0dXJuIGlzTmFOKG4pID8gMCA6IG47XG59XG5cbi8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vXG5cbmV4cG9ydCBjbGFzcyBSZXNvbHZhYmxlUHJvbWlzZSB7XG5cblx0Y29uc3RydWN0b3IoKSB7XG5cdFx0dGhpcy5wcm9tID0gbmV3IFByb21pc2UoIChyZXMscmVqKSA9PiB7XG5cdFx0XHR0aGlzLnJlcyA9IHJlcztcblx0XHRcdHRoaXMucmVqID0gcmVqO1xuXHRcdH0pO1xuXHR9XG5cblx0cmVzb2x2ZVByb21pc2UoIHJlcyApIHtcblx0XHR0aGlzLnJlcyggcmVzICk7XG5cdH1cblxuXHRyZWplY3RQcm9taXNlKCByZWogKSB7XG5cdFx0dGhpcy5yZWooIHJlaiApO1xuXHR9XG5cblx0Z2V0IHByb21pc2UoKSB7XG5cdFx0cmV0dXJuIHRoaXMucHJvbTtcblx0fVxufVxuXG4vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy9cblxuXG4vLyBnZXQgdGhlIGZvbGRlciBuYW1lIG9mIHRoZSBFUEZcbmV4cG9ydCBjb25zdCBnZXRFUEZGb2xkZXJOYW1lID0gKCBlbXB0eVZhbD0nLicgKSA9PiB7XG5cdGNvbnN0IHJlZ2V4cCA9IHdpbmRvdy5sb2NhdGlvbi5wYXRobmFtZS5tYXRjaCggL1xcLyhbXi9dKylcXC9bXi9dKiQvICk7XG5cdHJldHVybiByZWdleHAgPyByZWdleHBbMV0gOiBlbXB0eVZhbDtcbn1cblxuLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vXG5cbi8vIEkxOE4gc3VwcG9ydFxuXG5leHBvcnQgZnVuY3Rpb24gZ2V0STE4bkRlc2NyICgganNvbiwgbmFtZUZuYz1nZXRFUEZGb2xkZXJOYW1lICkge1xuXG5cdGNvbnN0IG5hbWUgPSBuYW1lRm5jKCcnKS5yZXBsYWNlQWxsKCAnLycsICdfJyApO1xuXG5cdGlmICggIWpzb24uZGF0YVNldHRpbmdzIHx8ICFqc29uLmRhdGFTZXR0aW5ncy5pMThuS2V5c0N0eHMgKSB7XG5cdFx0cmV0dXJuIFtdO1xuXHR9XG5cblx0Y29uc3QgaTE4bkRhdGEgPSBbXTtcblxuXHQvLyBDb2xsZWN0IEluZm9cblx0T2JqZWN0LmVudHJpZXMoIGpzb24uZGF0YVNldHRpbmdzLmkxOG5LZXlzQ3R4cyApLmZvckVhY2goIChba2V5LCBjdHhdKSA9PiB7XG5cblx0XHQvLyBQZmFkIGluIEpTT04gc3VjaGVuXG5cdFx0Y29uc3Qga2V5UGFydHMgPSBrZXkuc3BsaXQoICcuJyApO1xuXHRcdGxldCB2YWwgPSBqc29uO1xuXHRcdHdoaWxlICgxKSB7XG5cdFx0XHRjb25zdCBrID0ga2V5UGFydHMuc2hpZnQoKTtcblx0XHRcdGlmICggISggayBpbiB2YWwgKSApIHtcblx0XHRcdFx0Ly8gUEZhZCBuaWNodCBnZWZ1bmRlblxuXHRcdFx0XHR2YWwgPSBudWxsO1xuXHRcdFx0XHRicmVhaztcblx0XHRcdH1cblx0XHRcdHZhbCA9IHZhbFsgayBdO1xuXHRcdFx0aWYgKCBrZXlQYXJ0cy5sZW5ndGggPT09IDAgKSB7XG5cdFx0XHRcdC8vIEVpbnplbG5lciBXZXJ0IGdlZnVuZGVuXG5cdFx0XHRcdGJyZWFrO1xuXHRcdFx0fVxuXHRcdFx0aWYgKCB0eXBlb2YgdmFsICE9PSAnb2JqZWN0JyApIHtcblx0XHRcdFx0Ly8gUGZhZCBnZWh0IG5pY2h0IHdlaXRlclxuXHRcdFx0XHR2YWwgPSBudWxsO1xuXHRcdFx0XHRicmVhaztcblx0XHRcdH1cblx0XHRcdGlmICggQXJyYXkuaXNBcnJheSh2YWwpICkge1xuXHRcdFx0XHRpZiAoIGtleVBhcnRzLmxlbmd0aDw9MSApIHtcblx0XHRcdFx0XHQvLyBBcnJheSBnZWZ1bmRlblxuXHRcdFx0XHRcdGJyZWFrO1xuXHRcdFx0XHR9IGVsc2Uge1xuXHRcdFx0XHRcdC8vIGFycmF5IG1pdHRlbmRyaW4sIEZlaGxlclxuXHRcdFx0XHRcdHZhbCA9IG51bGw7XG5cdFx0XHRcdFx0YnJlYWs7XG5cdFx0XHRcdH1cblx0XHRcdH1cblx0XHR9XG5cblx0XHRjb25zdCBhZGQgPSAodGV4dCxjdXJya2V5KSA9PiB7XG5cdFx0XHQvLyBFaW5lbiBXZXJ0IGFkZGVuLCB3ZW5uIHdpcmtsaWNoIFRleHRcblx0XHRcdHRleHQgPSB0ZXh0LnRyaW0oKTtcblx0XHRcdGlmICggdGV4dCAmJiAhdGV4dC5tYXRjaCggL15bMC05LC4gJV0rJC8gKSApe1xuXHRcdFx0XHRjb25zdCBkZXNjciA9IGN0eC5yZXBsYWNlQWxsKCAnJHt9JywgbmFtZSApLnRyaW0oKTtcblx0XHRcdFx0Y29uc3QgZW50cnkgPSB7XG5cdFx0XHRcdFx0a2V5OiBuYW1lLmxlbmd0aD4wID8gYCR7bmFtZX0uJHtjdXJya2V5fWAgOiBjdXJya2V5LFxuXHRcdFx0XHRcdHRleHQsXG5cdFx0XHRcdFx0ZGVzY3IsXG5cdFx0XHRcdH1cblx0XHRcdFx0aTE4bkRhdGEucHVzaCggZW50cnkgKTtcblx0XHRcdH1cblx0XHR9XG5cblx0XHRpZiAoIHZhbCAhPT0gbnVsbCApIHtcblx0XHRcdGlmICggdHlwZW9mIHZhbCAhPT0gJ29iamVjdCcgKSB7XG5cdFx0XHRcdC8vIEVpbnplbG5lbiBXZXJ0IHNjaHJlaWJlblxuXHRcdFx0XHRhZGQoIHZhbCwga2V5ICk7XG5cdFx0XHR9IGVsc2Uge1xuXHRcdFx0XHQvLyBBcnJheS1XZXJ0ZSBzY2hyZWliZW5cblx0XHRcdFx0Y29uc3QgayA9IGtleVBhcnRzLnBvcCgpO1xuXHRcdFx0XHRjb25zdCBzdGFtbUtleSA9IGsgPyBrZXkuc3Vic3RyaW5nKCAwLCBrZXkubGVuZ3RoLWsubGVuZ3RoLTEgKSA6IGtleTtcblx0XHRcdFx0dmFsLmZvckVhY2goICh2LGkpID0+IHtcblx0XHRcdFx0XHRpZiAoIGsgKSB7XG5cdFx0XHRcdFx0XHRpZiAoIGsgaW4gdiApIHtcblx0XHRcdFx0XHRcdFx0YWRkKCB2W2tdLCBgJHtzdGFtbUtleX0uJHtpfS4ke2t9YCApO1xuXHRcdFx0XHRcdFx0fVxuXHRcdFx0XHRcdH0gZWxzZSB7XG5cdFx0XHRcdFx0XHRhZGQoIHYsIGAke3N0YW1tS2V5fS4ke2l9YCApO1xuXHRcdFx0XHRcdH1cblx0XHRcdFx0fSk7XG5cdFx0XHR9XG5cdFx0fVxuXHR9KVxuLy8gY29uc29sZS5sb2coIFwiPT09PT09PT09PT09PT0gaTE4bkRhdGFcIiwgaTE4bkRhdGEgKTtcblxuXHRyZXR1cm4gaTE4bkRhdGE7XG59XG5cbi8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vL1xuXG5leHBvcnQgZnVuY3Rpb24gcGF0Y2hDZmdJMThuICgganNvbiwgaTE4biwgbmFtZUZuYz1nZXRFUEZGb2xkZXJOYW1lICkge1xuXG5cdGNvbnN0IG5hbWUgPSBuYW1lRm5jKCcnKS5yZXBsYWNlQWxsKCAnLycsICdfJyApO1xuXG5cdGkxOG4uZm9yRWFjaCggKHsga2V5LCB0ZXh0IH0pID0+IHtcblxuXHRcdC8vIEVQRiBOYW1lICsgJy4nIG11c3MgYW0gQW5mYW5nIHdlZ25laG1lblxuXHRcdGlmICggbmFtZS5sZW5ndGg+MCApIHtcblx0XHRcdGlmICggIWtleS5zdGFydHNXaXRoKCBuYW1lICsgJy4nICkgKSB7XG5cdFx0XHRcdHJldHVybjtcblx0XHRcdH1cblx0XHRcdGtleSA9IGtleS5zdWJzdHJpbmcoIG5hbWUubGVuZ3RoKzEgKTtcblx0XHR9XG5cdFx0Y29uc3Qga2V5UGFydHMgPSBrZXkuc3BsaXQoICcuJyApO1xuXHRcdGxldCB2YWwgPSBqc29uO1xuXG5cdFx0d2hpbGUgKDEpIHtcblx0XHRcdGNvbnN0IGsgPSBrZXlQYXJ0cy5zaGlmdCgpO1xuXHRcdFx0aWYgKCAhKCBrIGluIHZhbCApICkge1xuXHRcdFx0XHQvLyBQRmFkIG5pY2h0IGdlZnVuZGVuXG5cdFx0XHRcdGJyZWFrO1xuXHRcdFx0fVxuXHRcdFx0aWYgKCBrZXlQYXJ0cy5sZW5ndGggPT09IDAgKSB7XG5cdFx0XHRcdC8vIEVpbnplbG5lciBXZXJ0IGdlZnVuZGVuXG5cdFx0XHRcdHZhbFsgayBdID0gdGV4dDtcblx0XHRcdFx0YnJlYWs7XG5cdFx0XHR9XG5cdFx0XHR2YWwgPSB2YWxbIGsgXTtcblx0XHR9XG5cdH0pXG59XG4iLCJpbXBvcnQgeyBvYmplY3RfZXF1YWxzIH0gZnJvbSAnLi9jb21tb24nXG5pbXBvcnQgeyBmc21TZW5kIH0gZnJvbSAnLi9mc20nXG5cbi8vIEtvbnZhIHNob3VsZCBiZWkgaW1wb3J0ZWQsIGJ1dCBkb2Vucyd0IHNlZW0gdG8gc3VwcG9ydCB0cmVlIHNoYWtpbmcsIHNvIGxlYXZlIGl0IG91dFxuLy8gaW1wb3J0IEtvbnZhIGZyb20gJ2tvbnZhL2xpYi9Db3JlJ1xuXG5leHBvcnQgY2xhc3MgYmFzZUluaXRzIHtcblxuXHRjb25zdHJ1Y3RvciAoIG9wdHMgPSB7fSApIHtcblxuXHRcdC8vIE9wdGlvbnMgYW5kIGRlZmF1bHRzXG5cdFx0Y29uc3QgZGVmYXVsdHMgPSB7XG5cdFx0XHRjb250YWluZXI6IG51bGwsXG5cdFx0XHRhZGRTZW5kQ2hhbmdlU3RhdGU6IG51bGwsXG5cdFx0fVxuXHRcdE9iamVjdC5hc3NpZ24oIHRoaXMsIGRlZmF1bHRzLCBvcHRzICk7XG5cblx0XHQvLyBjcmVhdGUgZnNtIG9iamVjdCwgaWYgbm90IHByb3ZpZGVkXG5cdFx0aWYgKCAhdGhpcy5mc20gKSB7XG5cdFx0XHR0aGlzLmZzbSA9IG5ldyBmc21TZW5kKCk7XG5cdFx0XHR0aGlzLmZzbS5zdGFydExpc3RlbmluZ1RvVmFyRGVjbFJlcSggdGhpcy5kZWNsYXJlVmFyaWFibGVzLmJpbmQodGhpcykgKTtcblx0XHR9XG5cblx0XHQvLyBpbml0IHN0YWdlICYgbGF5ZXJcblx0XHRpZiAoIG9wdHMuY29udGFpbmVyICkge1xuXHRcdFx0aWYgKCAhdGhpcy53aWR0aCApIHtcblx0XHRcdFx0dGhpcy53aWR0aCA9IHdpbmRvdy5pbm5lcldpZHRoO1xuXHRcdFx0fVxuXHRcdFx0aWYgKCAhdGhpcy5oZWlnaHQgKSB7XG5cdFx0XHRcdHRoaXMuaGVpZ2h0ID0gd2luZG93LmlubmVySGVpZ2h0O1xuXHRcdFx0fVxuXG5cdFx0XHR0aGlzLnN0YWdlID0gbmV3IEtvbnZhLlN0YWdlKHtcblx0XHRcdFx0Y29udGFpbmVyOiB0aGlzLmNvbnRhaW5lcixcblx0XHRcdFx0d2lkdGg6IHRoaXMud2lkdGgsXG5cdFx0XHRcdGhlaWdodDogdGhpcy5oZWlnaHQsXG5cdFx0XHR9KTtcblxuXG5cdFx0XHRjb25zdCBzdGFnZVZOID0gXCJCV19JQl9FWFRSRVNfU1RBR0VTXCI7XG5cdFx0XHRpZiAoICEoIHN0YWdlVk4gaW4gd2luZG93ICkgKSB7XG5cdFx0XHRcdHdpbmRvd1tzdGFnZVZOXSA9IFtdO1xuXHRcdFx0fVxuXHRcdFx0d2luZG93W3N0YWdlVk5dLnB1c2goIHRoaXMuc3RhZ2UgKTtcblxuXG5cdFx0XHQvLyB0aGlzLmxheWVyID0gbmV3IEtvbnZhLkxheWVyKCk7XG5cdFx0XHQvLyB0aGlzLnN0YWdlLmFkZCggdGhpcy5sYXllciApO1xuXHRcdH1cblxuXHRcdC8vIGRpc2FibGUgbW91c2UgcmlnaHQgY2xpY2tcblx0XHRkb2N1bWVudC5hZGRFdmVudExpc3RlbmVyKCAnY29udGV4dG1lbnUnLCAoZXYpID0+IGV2LnByZXZlbnREZWZhdWx0KCkgKTtcblxuXHRcdHRoaXMuRlNNVmFyc1NlbnQgPSB7fTtcblx0fVxuXG5cdC8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vXG5cblx0Ly8gbWV0aG9kIHdyYXBwZXIgZm9yIHBvc3RpbmcgdG8gRlNNXG5cblx0cG9zdExvZyAoIGV2ZW50LCBkYXRhPXt9ICkge1xuXHRcdGlmICggIXRoaXMuc3RhZ2UgfHwgIXRoaXMuc3RhZ2UuaXNEZW1vQW5pICkge1xuXHRcdFx0dGhpcy5mc20ucG9zdExvZ0V2ZW50KCBPYmplY3QuYXNzaWduKCB7fSwgZGF0YSwgeyBldmVudDogZXZlbnQgfSApICk7XG5cdFx0fVxuXHR9XG5cblx0cG9zdFZhcmlhYmxlICggbmFtZSwgdmFsICkge1xuXHRcdHRoaXMuRlNNVmFyc1NlbnRbbmFtZV0gPSB2YWw7XG5cdFx0dGhpcy5mc20uc2V0RlNNVmFyaWFibGUoIG5hbWUsIHZhbCApO1xuXHR9XG5cblx0dHJpZ2dlcklucHV0VmFsaWRhdGlvbkV2ZW50ICgpIHtcblx0XHRpZiAoIHRoaXMuZnNtLnRyaWdnZXJFdmVudCApIHtcbi8vLy8vLy8vLy8vLy8vLy8vLy8vXG5cdFx0XHRpZiAoIHRoaXMuZGF0YVNldHRpbmdzICYmIHRoaXMuZGF0YVNldHRpbmdzLnZhcmlhYmxlUHJlZml4ICkge1xuXHRcdFx0XHR0aGlzLmZzbS50cmlnZ2VyRXZlbnQoICdldl9JbnB1dFZhbGlkYXRpb25fJyArIHRoaXMuZGF0YVNldHRpbmdzLnZhcmlhYmxlUHJlZml4ICk7XG5cdFx0XHR9XG4vLy8vLy8vLy9cbi8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vXG4vLy8vLy8vLy8vXG5cdFx0XHR0aGlzLmZzbS50cmlnZ2VyRXZlbnQoICdldl9JbnB1dFZhbGlkYXRpb25fRXh0UmVzJyApO1xuXHRcdH1cblx0fVxuXG5cdC8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vXG5cblx0Ly8gZ2V0IHN0YXRlLXZhcnMgb2Ygb2JqXG5cdGdldENoYW5nZVN0YXRlICggb2JqICkge1xuXG5cdFx0Ly8gc3RhdHVzVmFyRGVmIGRlZmluZWQgaW4gb2JqP1xuXHRcdGlmICggb2JqLnN0YXR1c1ZhckRlZiApIHtcblxuXHRcdFx0cmV0dXJuIG9iai5zdGF0dXNWYXJEZWYuY2FsbChvYmopO1xuXG5cdFx0fSBlbHNlIHtcblxuXHRcdFx0Ly8gY2FsbCBkZWZhdWx0Q2hhbmdlU3RhdGUoKVxuXHRcdFx0cmV0dXJuICtvYmouZ2V0RGVmYXVsdENoYW5nZVN0YXRlKCk7XG5cblx0XHR9XG5cdH1cblxuXHRzZW5kQ2hhbmdlU3RhdGUgKCBvYmosIG5ld1N0YXRlPW51bGwgKSB7XG5cblx0XHQvLyBEb250IHNlbmQgc3RhdGVzIG9yIHNjb3JlIGluIGRlbW9Bbmlcblx0XHRpZiAoIG9iai5zdGFnZSAmJiBvYmouc3RhZ2UuaXNEZW1vQW5pICkge1xuXHRcdFx0cmV0dXJuO1xuXHRcdH1cblxuXHRcdC8vIHN0YXRlIFZhcmlhYmxlIChjaGFuZ2VTdGF0ZSkgY2hhbmdlZD9cblx0XHRjb25zdCBjaGFuZ2VTdGF0ZSA9ICggbmV3U3RhdGU9PT1udWxsID8gdGhpcy5nZXRDaGFuZ2VTdGF0ZShvYmopIDogbmV3U3RhdGUgKTtcblxuXHRcdC8vIGlzIHN0YXRlIGNoYW5nZWQ/IC0+IHNlbmQgbXNnc1xuXHRcdGlmICggdHlwZW9mIG9iai5vbGRDaGFuZ2VTdGF0ZSA9PT0gJ3VuZGVmaW5lZCcgfHwgIW9iamVjdF9lcXVhbHMoIGNoYW5nZVN0YXRlLCBvYmoub2xkQ2hhbmdlU3RhdGUgKSApIHtcblxuXHRcdFx0aWYgKCB0eXBlb2YgY2hhbmdlU3RhdGUgPT09ICdvYmplY3QnICkge1xuXHRcdFx0XHQvLyBjaGFuZ2VTdGF0ZSA9IHsgRlNNU3RhdGVWYXIxOiBzdGF0ZTEsIEZTTVN0YXRlVmFyMjogc3RhdGUyLCAuLi4gfVxuXHRcdFx0XHRmb3IgKCBsZXQgayBpbiBjaGFuZ2VTdGF0ZSApIHtcblx0XHRcdFx0XHRpZiAoIHR5cGVvZiBvYmoub2xkQ2hhbmdlU3RhdGUgIT09ICdvYmplY3QnIHx8IGNoYW5nZVN0YXRlW2tdICE9PSBvYmoub2xkQ2hhbmdlU3RhdGVba10gKSB7XG5cdFx0XHRcdFx0XHR0aGlzLnBvc3RWYXJpYWJsZSggaywgY2hhbmdlU3RhdGVba10gKTtcblx0XHRcdFx0XHR9XG5cdFx0XHRcdH1cblxuXHRcdFx0fSBlbHNlIGlmICggb2JqLkZTTVZhcmlhYmxlTmFtZSApIHtcblx0XHRcdFx0Ly8gU2ltcGxlIDEtdmFsdWUgc3RhdGVcblx0XHRcdFx0dGhpcy5wb3N0VmFyaWFibGUoIGBWX1N0YXR1c18ke29iai5GU01WYXJpYWJsZU5hbWV9YCwgK2NoYW5nZVN0YXRlICk7XG5cdFx0XHR9XG5cblx0XHRcdG9iai5vbGRDaGFuZ2VTdGF0ZSA9IGNoYW5nZVN0YXRlO1xuXHRcdH1cblxuXHRcdC8vIHNjb3JlIGNoYW5nZWQ/XG5cdFx0aWYgKCBvYmouc2NvcmVEZWYgKSB7XG5cblx0XHRcdGNvbnN0IHNjb3JlID0gb2JqLnNjb3JlRGVmLmNhbGwob2JqKTtcblx0XHRcdHRoaXMuc2NvcmVPYmogPSBvYmo7XG5cblx0XHRcdGlmICggdHlwZW9mIG9iai5vbGRTY29yZSA9PT0gJ3VuZGVmaW5lZCcgfHwgIW9iamVjdF9lcXVhbHMoIHNjb3JlLCBvYmoub2xkU2NvcmUgKSApIHtcblx0XHRcdFx0aWYgKCB0eXBlb2Ygc2NvcmUgPT09ICdvYmplY3QnICkge1xuXHRcdFx0XHRcdC8vIHNjb3JlID0geyBGU01TdGF0ZVZhcjE6IHN0YXRlMSwgRlNNU3RhdGVWYXIyOiBzdGF0ZTIsIC4uLiB9XG5cdFx0XHRcdFx0Zm9yICggbGV0IGsgaW4gc2NvcmUgKSB7XG5cdFx0XHRcdFx0XHRpZiAoIHR5cGVvZiBvYmoub2xkU2NvcmUgIT09ICdvYmplY3QnIHx8IHNjb3JlW2tdICE9PSBvYmoub2xkU2NvcmVba10gKSB7XG5cdFx0XHRcdFx0XHRcdHRoaXMucG9zdFZhcmlhYmxlKCBrLCBzY29yZVtrXSApO1xuXHRcdFx0XHRcdFx0fVxuXHRcdFx0XHRcdH1cblxuXHRcdFx0XHR9IGVsc2UgaWYgKCBvYmouRlNNVmFyaWFibGVOYW1lIHx8IG9iai5zY29yZVZhcmlhYmxlTmFtZSApIHtcblx0XHRcdFx0XHQvLyBTaW1wbGUgMS12YWx1ZSBzY29yZVxuXHRcdFx0XHRcdGlmICggdHlwZW9mIHNjb3JlICE9PSAndW5kZWZpbmVkJyApIHtcblx0XHRcdFx0XHRcdHRoaXMucG9zdFZhcmlhYmxlKCBvYmouc2NvcmVWYXJpYWJsZU5hbWUgfHwgYFZfU2NvcmVfJHtvYmouRlNNVmFyaWFibGVOYW1lfWAsIHNjb3JlICk7XG5cdFx0XHRcdFx0fVxuXHRcdFx0XHR9XG5cdFx0XHR9XG5cblx0XHRcdG9iai5vbGRTY29yZSA9IHNjb3JlO1xuXHRcdH1cblxuXHRcdGlmICggdHlwZW9mIHRoaXMuYWRkU2VuZENoYW5nZVN0YXRlID09PSAnZnVuY3Rpb24nICkge1xuXHRcdFx0KHRoaXMuYWRkU2VuZENoYW5nZVN0YXRlKSgpO1xuXHRcdH1cblx0fVxuXG5cdC8vIHNlbmQgaW5mb3JtYXRpb24gYWJvdXQgdmFyaWFibGVzIHNlbnRcblx0ZGVjbGFyZVZhcmlhYmxlcyAoKSB7XG5cblx0XHRjb25zdCB2YXJEZWZzID0gW107XG5cdFx0Y29uc3QgdHlwZXRyYW5zID0ge1xuXHRcdFx0J3N0cmluZyc6ICdTdHJpbmcnLFxuXHRcdFx0J251bWJlcic6ICdJbnRlZ2VyJyxcblx0XHRcdCdib29sZWFuJzogJ0Jvb2xlYW4nLFxuXHRcdH1cblxuXHRcdGZvciAoIGNvbnN0IHZuYW1lIGluIHRoaXMuRlNNVmFyc1NlbnQgKSB7XG5cblx0XHRcdGNvbnN0IHZhbCA9IHRoaXMuRlNNVmFyc1NlbnRbdm5hbWVdO1xuXHRcdFx0bGV0IHR5cGUgPSAnJztcblx0XHRcdGlmICggdGhpcy5zY29yZU9iaiAmJiB0aGlzLnNjb3JlT2JqLnNjb3JlRGVmVHlwZSApIHtcblx0XHRcdFx0dHlwZSA9IHRoaXMuc2NvcmVPYmouc2NvcmVEZWZUeXBlLmNhbGwodGhpcy5zY29yZU9iaiwgdm5hbWUpO1xuXHRcdFx0fVxuXHRcdFx0aWYgKCAhdHlwZSApIHtcblx0XHRcdFx0dHlwZSA9IHZhbD09PW51bGwgPyAnSW50ZWdlcicgOiB0eXBldHJhbnNbIHR5cGVvZiB2YWwgXTtcblx0XHRcdH1cblxuXHRcdFx0Y29uc3QgdmRlZiA9IHtcblx0XHRcdFx0bmFtZTogdm5hbWUsXG5cdFx0XHRcdHR5cGUsXG5cdFx0XHRcdGRlZmF1bHRWYWx1ZTogTnVtYmVyLmlzTmFOKHZhbCkgfHwgdmFsPT09bnVsbCA/IDAgOiAoIHZhbCA9PT0gJycgPyAnRU1QVFknIDogdmFsICksXG5cdFx0XHRcdG5hbWVkVmFsdWVzOiBbXSxcblx0XHRcdH1cblx0XHRcdHZhckRlZnMucHVzaCggdmRlZiApO1xuXHRcdH1cblxuXHRcdHJldHVybiB2YXJEZWZzO1xuXHR9XG59XG4iLCJcclxuLy8gaW1wb3J0IHsgaXNCZXR3ZWVuLCBkZWxEZWZhdWx0cywgbWVyZ2VEZWVwLCBvYmplY3RfZXF1YWxzLCBnZXRYb2ZFdmVudCwgZ2V0WW9mRXZlbnQsIGdldFBvc09mRXZlbnQgfSBmcm9tICcuL2NvbW1vbidcclxuXHJcbmV4cG9ydCBmdW5jdGlvbiBpc0JldHdlZW4gKCB2LCB3MSwgdzIgKSB7XHJcblx0cmV0dXJuIHYgPj0gTWF0aC5taW4oIHcxLCB3MiApICYmIHYgPD0gTWF0aC5tYXgoIHcxLCB3MiApO1xyXG59O1xyXG5cclxuXHJcbmV4cG9ydCBmdW5jdGlvbiBpc051bVVuaXQgKCB2LCBudW0sIHVuaXRSRSwgdW5pdE9wdCwgb3JFbXB0eSApIHtcclxuXHRjb25zdCBudW1SRSA9IGAwKiR7bnVtfSg/OlssLl0wKik/YDtcclxuXHRjb25zdCByID0gdW5pdE9wdCA/IGAke251bVJFfSg/OiAqJHt1bml0UkV9KT98KD86JHt1bml0UkV9ICopPyR7bnVtUkV9YCA6IGAke251bVJFfSAqJHt1bml0UkV9fCR7dW5pdFJFfSAqJHtudW1SRX1gO1xyXG5cdGNvbnN0IHJlID0gbmV3IFJlZ0V4cCggYF4oPzoke3J9KSR7IG9yRW1wdHkgPyAnPycgOiAnJyB9JGAgKTtcclxuXHRyZXR1cm4gdi50cmltKCkubWF0Y2gocmUpO1xyXG59XHJcblxyXG5cclxuLy8gRGVsZXRlcyBkZWxLZXlzICYgdW5jaGFuZ2VkIGRlZmF1bHRzIGZyb20gb2JqXHJcbi8vIG9iamVjdCBkZWVwIGNsb25lLCBvbWl0dGluZyBzb21lIGRhdGEgZGVmaW5lZCBieSBkZWZhdWx0cyBhbmQgZGVsS2V5c1xyXG4vLyBhZG9wdGVkIGZyb20gaHR0cHM6Ly9zdGFja292ZXJmbG93LmNvbS9xdWVzdGlvbnMvNDQ1OTkyOC9ob3ctdG8tZGVlcC1jbG9uZS1pbi1qYXZhc2NyaXB0XHJcbmV4cG9ydCBmdW5jdGlvbiBkZWxEZWZhdWx0cyAoIG9iaiA9IHt9LCBkZWZhdWx0cyA9IHt9LCBkZWxLZXlzID0gW10gKSB7XHJcblxyXG5cdC8vIGlmIG9iaiBpcyBhcnJheSBvZiBvYmplY3RzOiBhcHBseSBkZWxEZWZhdWx0cyB0byBldmVyeSBtZW1iZXIgb2YgYXJyYXlcclxuXHRpZiAoIEFycmF5LmlzQXJyYXkob2JqKSApIHtcclxuXHRcdGxldCBhID0gW107XHJcblx0XHRvYmouZm9yRWFjaCggZSA9PiB7XHJcblx0XHRcdGlmICggdHlwZW9mIGU9PT0nb2JqZWN0JyApIHtcclxuXHRcdFx0XHRhLnB1c2goIGRlbERlZmF1bHRzKCBlLCBkZWZhdWx0cywgZGVsS2V5cyApICk7XHJcblx0XHRcdH0gZWxzZSB7XHJcblx0XHRcdFx0YS5wdXNoKGUpO1xyXG5cdFx0XHR9XHJcblx0XHR9KVxyXG5cdFx0cmV0dXJuIGE7XHJcblx0fVxyXG5cclxuXHRpZiAoICFvYmogKSB7XHJcblx0XHRyZXR1cm4gb2JqO1xyXG5cdH1cclxuXHJcblx0bGV0IHY7XHJcblx0bGV0IGJPYmplY3QgPSB7fTtcclxuXHRmb3IgKCBjb25zdCBrIGluIG9iaiApIHtcclxuXHRcdGlmICggIWRlbEtleXMuaW5jbHVkZXMoaykgKSB7XHJcblx0XHRcdHYgPSBvYmpba107XHJcblx0XHRcdGlmICggIWRlZmF1bHRzIHx8IGRlZmF1bHRzW2tdIT09diApIHtcclxuXHRcdFx0XHRiT2JqZWN0W2tdID0gKHR5cGVvZiB2ID09PSBcIm9iamVjdFwiKSA/IGRlbERlZmF1bHRzKCB2LCBkZWZhdWx0cyA/IGRlZmF1bHRzW2tdIDogW10gKSA6IHY7XHJcblx0XHRcdH1cclxuXHRcdH1cclxuXHR9XHJcblxyXG5cdHJldHVybiBiT2JqZWN0O1xyXG59XHJcblxyXG4vKipcclxuICogRnJvbTogaHR0cHM6Ly9naXN0LmdpdGh1Yi5jb20vYWh0Y3gvMGNkOTRlNjI2OTFmNTM5MTYwYjMyZWNkYTE4YWYzZDZcclxuICogUGVyZm9ybXMgYSBkZWVwIG1lcmdlIG9mIGBzb3VyY2VgIGludG8gYHRhcmdldGAuXHJcbiAqIE11dGF0ZXMgYHRhcmdldGAgb25seSBidXQgbm90IGl0cyBvYmplY3RzIGFuZCBhcnJheXMuXHJcbiAqXHJcbiAqIEBhdXRob3IgaW5zcGlyZWQgYnkgW2poaWxkZW5iaWRkbGVdKGh0dHBzOi8vc3RhY2tvdmVyZmxvdy5jb20vYS80ODIxODIwOSkuXHJcbiAqL1xyXG5leHBvcnQgZnVuY3Rpb24gbWVyZ2VEZWVwICh0YXJnZXQsIHNvdXJjZSkge1xyXG5cdGNvbnN0IGlzT2JqZWN0ID0gKG9iaikgPT4gb2JqICYmIHR5cGVvZiBvYmogPT09ICdvYmplY3QnO1xyXG5cclxuXHRpZiAoIWlzT2JqZWN0KHRhcmdldCkgfHwgIWlzT2JqZWN0KHNvdXJjZSkpIHtcclxuXHRcdHJldHVybiBzb3VyY2U7XHJcblx0fVxyXG5cclxuXHRPYmplY3Qua2V5cyhzb3VyY2UpLmZvckVhY2goa2V5ID0+IHtcclxuXHRcdGNvbnN0IHRhcmdldFZhbHVlID0gdGFyZ2V0W2tleV07XHJcblx0XHRjb25zdCBzb3VyY2VWYWx1ZSA9IHNvdXJjZVtrZXldO1xyXG5cclxuXHRcdGlmICggLypBcnJheS5pc0FycmF5KHRhcmdldFZhbHVlKSAmJiovIEFycmF5LmlzQXJyYXkoc291cmNlVmFsdWUpKSB7XHJcblx0XHRcdC8vIE5PIENPTkNBVEVOQVRJT04gT0YgQVJSQVlTIVxyXG5cdFx0XHQvLyB0YXJnZXRba2V5XSA9IHRhcmdldFZhbHVlLmNvbmNhdChzb3VyY2VWYWx1ZSk7XHJcblx0XHRcdHRhcmdldFtrZXldID0gc291cmNlVmFsdWU7XHJcblx0XHR9IGVsc2UgaWYgKGlzT2JqZWN0KHRhcmdldFZhbHVlKSAmJiBpc09iamVjdChzb3VyY2VWYWx1ZSkpIHtcclxuXHRcdFx0dGFyZ2V0W2tleV0gPSBtZXJnZURlZXAoT2JqZWN0LmFzc2lnbih7fSwgdGFyZ2V0VmFsdWUpLCBzb3VyY2VWYWx1ZSk7XHJcblx0XHR9IGVsc2Uge1xyXG5cdFx0XHR0YXJnZXRba2V5XSA9IHNvdXJjZVZhbHVlO1xyXG5cdFx0fVxyXG5cdH0pO1xyXG5cclxuXHRyZXR1cm4gdGFyZ2V0O1xyXG59XHJcblxyXG4vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vL1xyXG5cclxuLy8gYWRvcHRlZCBmcm9tIGh0dHBzOi8vc3RhY2tvdmVyZmxvdy5jb20vcXVlc3Rpb25zLzEwNjg4MzQvb2JqZWN0LWNvbXBhcmlzb24taW4tamF2YXNjcmlwdFxyXG5leHBvcnQgZnVuY3Rpb24gb2JqZWN0X2VxdWFscyAoIHgsIHkgKSB7XHJcblx0aWYgKCB4ID09PSB5ICkgcmV0dXJuIHRydWU7XHJcblx0Ly8gaWYgYm90aCB4IGFuZCB5IGFyZSBudWxsIG9yIHVuZGVmaW5lZCBhbmQgZXhhY3RseSB0aGUgc2FtZVxyXG5cclxuXHRpZiAoICEgKCB4IGluc3RhbmNlb2YgT2JqZWN0ICkgfHwgISAoIHkgaW5zdGFuY2VvZiBPYmplY3QgKSApIHJldHVybiBmYWxzZTtcclxuXHQvLyBpZiB0aGV5IGFyZSBub3Qgc3RyaWN0bHkgZXF1YWwsIHRoZXkgYm90aCBuZWVkIHRvIGJlIE9iamVjdHNcclxuXHJcblx0aWYgKCB4LmNvbnN0cnVjdG9yICE9PSB5LmNvbnN0cnVjdG9yICkgcmV0dXJuIGZhbHNlO1xyXG5cdC8vIHRoZXkgbXVzdCBoYXZlIHRoZSBleGFjdCBzYW1lIHByb3RvdHlwZSBjaGFpbiwgdGhlIGNsb3Nlc3Qgd2UgY2FuIGRvIGlzXHJcblx0Ly8gdGVzdCB0aGVyZSBjb25zdHJ1Y3Rvci5cclxuXHJcblx0Ly8gaWYgYm90aCBhcmUgYXJyYXlzOiB1bm9yZGVyZWQgY29tcGFyZSAoY2hlY2sgaWYgYWxsIGVsZW1lbnRzIGFyZSBjb250YWluZWQpXHJcblx0aWYgKCBBcnJheS5pc0FycmF5KHkpICYmIEFycmF5LmlzQXJyYXkoeCkgKSB7XHJcblx0XHRpZiAoIHgubGVuZ3RoICE9IHkubGVuZ3RoICkgcmV0dXJuIGZhbHNlO1xyXG5cdFx0Y29uc3QgeTIgPSBBcnJheS5mcm9tKCB5ICk7XHJcblx0XHRpZiAoICF4LmV2ZXJ5KCB4ZSA9PlxyXG5cdFx0XHR5Mi5zb21lKCAoIHllLCBpICkgPT4ge1xyXG5cdFx0XHRcdGlmICggb2JqZWN0X2VxdWFscyggeGUsIHllICkgKSB7XHJcblx0XHRcdFx0XHR5Mi5zcGxpY2UoIGksIDEgKTtcclxuXHRcdFx0XHRcdHJldHVybiB0cnVlO1xyXG5cdFx0XHRcdH1cclxuXHRcdFx0XHRyZXR1cm4gZmFsc2U7XHJcblx0XHRcdH0pXHJcblx0XHQpKSByZXR1cm4gZmFsc2U7XHJcblx0XHRyZXR1cm4geTIubGVuZ3RoPT09MDtcclxuXHR9XHJcblxyXG5cdGZvciAoIHZhciBwIGluIHggKSB7XHJcblx0XHRpZiAoICEgeC5oYXNPd25Qcm9wZXJ0eSggcCApICkgY29udGludWU7XHJcblx0XHRcdC8vIG90aGVyIHByb3BlcnRpZXMgd2VyZSB0ZXN0ZWQgdXNpbmcgeC5jb25zdHJ1Y3RvciA9PT0geS5jb25zdHJ1Y3RvclxyXG5cclxuXHRcdGlmICggISB5Lmhhc093blByb3BlcnR5KCBwICkgKSByZXR1cm4gZmFsc2U7XHJcblx0XHRcdC8vIGFsbG93cyB0byBjb21wYXJlIHhbIHAgXSBhbmQgeVsgcCBdIHdoZW4gc2V0IHRvIHVuZGVmaW5lZFxyXG5cclxuXHRcdGlmICggeFsgcCBdID09PSB5WyBwIF0gKSBjb250aW51ZTtcclxuXHRcdFx0Ly8gaWYgdGhleSBoYXZlIHRoZSBzYW1lIHN0cmljdCB2YWx1ZSBvciBpZGVudGl0eSB0aGVuIHRoZXkgYXJlIGVxdWFsXHJcblxyXG5cdFx0aWYgKCB0eXBlb2YoIHhbIHAgXSApICE9PSBcIm9iamVjdFwiICkgcmV0dXJuIGZhbHNlO1xyXG5cdFx0XHQvLyBOdW1iZXJzLCBTdHJpbmdzLCBGdW5jdGlvbnMsIEJvb2xlYW5zIG11c3QgYmUgc3RyaWN0bHkgZXF1YWxcclxuXHJcblx0XHRpZiAoICEgb2JqZWN0X2VxdWFscyggeFsgcCBdLCAgeVsgcCBdICkgKSByZXR1cm4gZmFsc2U7XHJcblx0XHRcdC8vIE9iamVjdHMgYW5kIEFycmF5cyBtdXN0IGJlIHRlc3RlZCByZWN1cnNpdmVseVxyXG5cdH1cclxuXHJcblx0Zm9yICggcCBpbiB5IClcclxuXHRpZiAoIHkuaGFzT3duUHJvcGVydHkoIHAgKSAmJiAhIHguaGFzT3duUHJvcGVydHkoIHAgKSApXHJcblx0XHRyZXR1cm4gZmFsc2U7XHJcblx0XHQvLyBhbGxvd3MgeFsgcCBdIHRvIGJlIHNldCB0byB1bmRlZmluZWRcclxuXHJcblx0cmV0dXJuIHRydWU7XHJcbn1cclxuXHJcbi8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vXHJcblxyXG5leHBvcnQgZnVuY3Rpb24gZ2V0WG9mRXZlbnQgKCBzdGFnZSwgZXZlbnQgKSB7XHJcblx0aWYgKCBldmVudCApIHtcclxuXHRcdGlmICggZXZlbnQuc2ltWCApIHtcclxuXHRcdFx0cmV0dXJuIGV2ZW50LnNpbVg7XHJcblx0XHR9XHJcblx0XHQvLyBpZiAoIGV2ZW50LmV2dCAmJiBldmVudC5ldnQuY2xpZW50WCApIHtcclxuXHRcdC8vIFx0cmV0dXJuIGV2ZW50LmV2dC5jbGllbnRYO1xyXG5cdFx0Ly8gfVxyXG5cdH1cclxuXHRyZXR1cm4gc3RhZ2UuZ2V0UG9pbnRlclBvc2l0aW9uKCkueDtcclxufVxyXG5cclxuXHJcbmV4cG9ydCBmdW5jdGlvbiBnZXRZb2ZFdmVudCAoIHN0YWdlLCBldmVudCApIHtcclxuXHRpZiAoIGV2ZW50ICkge1xyXG5cdFx0aWYgKCBldmVudC5zaW1ZICkge1xyXG5cdFx0XHRyZXR1cm4gZXZlbnQuc2ltWTtcclxuXHRcdH1cclxuXHRcdC8vIGlmICggZXZlbnQuZXZ0ICYmIGV2ZW50LmV2dC5jbGllbnRZICkge1xyXG5cdFx0Ly8gXHRyZXR1cm4gZXZlbnQuZXZ0LmNsaWVudFk7XHJcblx0XHQvLyB9XHJcblx0fVxyXG5cdHJldHVybiBzdGFnZS5nZXRQb2ludGVyUG9zaXRpb24oKS55O1xyXG59XHJcblxyXG5cclxuZXhwb3J0IGZ1bmN0aW9uIGdldFBvc09mRXZlbnQgKCBzdGFnZSwgZXYgKSB7XHJcblx0cmV0dXJuIHtcclxuXHRcdHg6IGdldFhvZkV2ZW50KCBzdGFnZSwgZXYgKSxcclxuXHRcdHk6IGdldFlvZkV2ZW50KCBzdGFnZSwgZXYgKSxcclxuXHR9XHJcbn1cclxuXHJcblxyXG4vLyBpcyBpbiBEZW1vQW5pOiBpZ25vcmUgbmF0aXZlIEV2ZW50cyAocHJldmVudCBlLmcuIHN0YWdlLm9uKG1vdXNlbGVhdmUpKVxyXG5leHBvcnQgZnVuY3Rpb24gaWdub3JlRXZlbnQgKCBzdGFnZSwgZXYgKSB7XHJcblx0cmV0dXJuICggc3RhZ2UgJiYgc3RhZ2UuaXNEZW1vQW5pICYmICEoIFwic2ltWFwiIGluIGV2ICkgKTtcclxufVxyXG5cclxuXHJcbi8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vXHJcblxyXG5leHBvcnQgY29uc3Qgc2V0U3RhdGVQb3N0UHJvYyA9IGZ1bmN0aW9uIChvYmopIHtcclxuXHJcblx0aWYgKCBvYmouc3RhZ2UgJiYgb2JqLnN0YWdlLmlzRGVtb0FuaSAmJiBvYmouc3RhZ2UuaXNEZW1vQW5pLmVuZEFuaSApIHtcclxuXHRcdG9iai5zdGFnZS5pc0RlbW9BbmkuZW5kQW5pKCBmYWxzZSApO1xyXG5cdH1cclxuXHJcblx0aWYgKCBvYmouYmFzZSApIHtcclxuXHRcdG9iai5iYXNlLnNlbmRDaGFuZ2VTdGF0ZSggb2JqICk7XHQvLyBpbml0ICYgc2VuZCBjaGFuZ2VTdGF0ZSAmIHNjb3JlXHJcblx0fVxyXG5cdC8vIG9iai5vbGRDaGFuZ2VTdGF0ZSA9IG9iai5iYXNlLmdldENoYW5nZVN0YXRlKG9iaik7XHJcblx0Ly8gaWYgKCBvYmouc2NvcmVEZWYgKSB7XHJcblx0Ly8gXHRvYmoub2xkU2NvcmUgPSBvYmouc2NvcmVEZWYoKTtcclxuXHQvLyB9XHJcbn1cclxuXHJcbi8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vXHJcblxyXG5leHBvcnQgY29uc3QgZ2V0QWJzUG9zaXRpb24gPSBmdW5jdGlvbiAoZWxlbWVudCkge1xyXG5cdGNvbnN0IGJveCA9IGVsZW1lbnQuZ2V0Qm91bmRpbmdDbGllbnRSZWN0KCk7XHJcblx0Y29uc3Qgc2Nyb2xsWCA9IHdpbmRvdy5zY3JvbGxYIHx8IHdpbmRvdy5wYWdlWE9mZnNldDtcclxuXHRjb25zdCBzY3JvbGxZID0gd2luZG93LnNjcm9sbFkgfHwgd2luZG93LnBhZ2VZT2Zmc2V0O1xyXG5cdHJldHVybiB7XHJcblx0XHRsZWZ0OiBib3gubGVmdCArIHNjcm9sbFgsXHJcblx0XHR0b3A6IGJveC50b3AgKyBzY3JvbGxZXHJcblx0fVxyXG59XHJcblxyXG4vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vL1xyXG5cclxuZXhwb3J0IGZ1bmN0aW9uIHJlZ2V4Q2FuTG9va0JlaGluZCgpIHtcclxuXHRpZiAoIHJlZ2V4Q2FuTG9va0JlaGluZC5yICE9PSB1bmRlZmluZWQgKSB7XHJcblx0XHRyZXR1cm4gcmVnZXhDYW5Mb29rQmVoaW5kLnI7XHJcblx0fVxyXG5cdHRyeSB7XHJcblx0XHRuZXcgUmVnRXhwKCAnKD88IWEpYicgKTtcclxuXHRcdHJlZ2V4Q2FuTG9va0JlaGluZC5yID0gdHJ1ZTtcclxuXHRcdHJldHVybiB0cnVlO1xyXG5cdH0gY2F0Y2ggKGUpIHtcclxuXHRcdHJlZ2V4Q2FuTG9va0JlaGluZC5yID0gZmFsc2U7XHJcblx0XHRyZXR1cm4gZmFsc2U7XHJcblx0fVxyXG59XHJcbiIsIi8vIFNldCBGU00gdmFyaWFibGVcclxuXHJcbmV4cG9ydCBjbGFzcyBmc21TZW5kIHtcclxuXHJcblx0Y29uc3RydWN0b3IgKCkge1xyXG5cdFx0dGhpcy5pbmRleFBhdGggPSB0aGlzLmdldFF1ZXJ5VmFyaWFibGUoJ2luZGV4UGF0aCcpO1xyXG5cdFx0dGhpcy51c2VyRGVmSWRQYXRoID0gdGhpcy5nZXRRdWVyeVZhcmlhYmxlKCd1c2VyRGVmSWRQYXRoJyk7XHJcblxyXG5cdFx0Ly8gVHJhY2UgQ291bnRlclxyXG5cdFx0dGhpcy50cmFjZUNvdW50ID0gMDtcclxuXHJcblx0XHQvLyBJbml0IGRvbmUgcHJvbWlzZVxyXG5cdFx0dGhpcy5wckluaXREb25lID0gbmV3IFByb21pc2UoIChyZXNvbHZlKSA9PiB7XHJcblx0XHRcdGlmICggcHJvY2Vzcy5lbnYuTk9ERV9FTlYgPT09ICdwcm9kdWN0aW9uJyApIHtcclxuXHRcdFx0XHR0aGlzLnBySW5pdERvbmVSZXNvbHZlID0gcmVzb2x2ZTtcclxuXHRcdFx0fSBlbHNlIHtcclxuXHRcdFx0XHR0aGlzLnBySW5pdERvbmVSZXNvbHZlID0gKCkgPT4ge1xyXG5cdFx0XHRcdFx0dGhpcy5kZWJ1Z091dCggXCJmc21TZW5kOiBJbml0IGRvbmUgcHJvbWlzZSByZXNvbHZlZFwiICk7XHJcblx0XHRcdFx0XHRyZXNvbHZlKCk7XHJcblx0XHRcdFx0fTtcclxuXHRcdFx0fVxyXG5cdFx0fSk7XHJcblx0XHR0aGlzLmluaXREb25lQ250ID0gMDtcclxuXHJcblx0XHRpZiAoIHByb2Nlc3MuZW52Lk5PREVfRU5WICE9PSAncHJvZHVjdGlvbicgKSB7XHJcblx0XHRcdHdpbmRvdy5id19fZGVidWdPdXQgPSB0aGlzLmRlYnVnT3V0LmJpbmQodGhpcyk7XHJcblx0XHR9XHJcblx0fVxyXG5cclxuXHRzZXRGU01WYXJpYWJsZSAoIHZhcmlhYmxlTmFtZSwgbmV3VmFsdWUgKSB7XHJcblxyXG5cdFx0aWYgKCBBcnJheS5pc0FycmF5KG5ld1ZhbHVlKSApIHtcclxuXHRcdFx0bmV3VmFsdWUgPSBuZXdWYWx1ZS5qb2luKCcsJyk7XHJcblx0XHR9XHJcblxyXG5cdFx0aWYgKCBwcm9jZXNzLmVudi5OT0RFX0VOViAhPT0gJ3Byb2R1Y3Rpb24nICkge1xyXG5cdFx0XHR0aGlzLmRlYnVnT3V0KCBgU2V0IEZTTSB2YXJpYWJsZTogJHt2YXJpYWJsZU5hbWV9IHRvIHZhbHVlID4ke25ld1ZhbHVlfTwgKCR7dHlwZW9mIG5ld1ZhbHVlfSlgICk7XHJcblx0XHR9XHJcblxyXG5cdFx0dGhpcy5wb3N0TWVzc2FnZVdpdGhQYXRoc0FuZFRyYWNlQ291bnQoe1xyXG5cdFx0XHRzZXRWYXJpYWJsZToge1xyXG5cdFx0XHRcdHZhcmlhYmxlTmFtZSxcclxuXHRcdFx0XHRuZXdWYWx1ZTogTnVtYmVyLmlzTmFOKG5ld1ZhbHVlKSA/IDAgOiBuZXdWYWx1ZSxcclxuXHRcdFx0fSxcclxuXHRcdH0pXHJcblx0fVxyXG5cclxuXHQvLyBTZW5kIGEgdHJhY2UgbWVzc2FnZVxyXG5cdHBvc3RMb2dFdmVudCAoIHRyYWNlTWVzc2FnZSApIHtcclxuXHJcblx0XHRpZiAoIHByb2Nlc3MuZW52Lk5PREVfRU5WICE9PSAncHJvZHVjdGlvbicgKSB7XHJcblx0XHRcdHRoaXMuZGVidWdPdXQoIGBQb3N0aW5nIGV2ZW50ICcke3RyYWNlTWVzc2FnZS5ldmVudH0nLCBtZXNzYWdlICR7SlNPTi5zdHJpbmdpZnkoIHRyYWNlTWVzc2FnZSwgKGssdikgPT4gaz09PSdldmVudCcgPyB1bmRlZmluZWQgOiB2ICl9YCApO1xyXG5cdFx0fVxyXG5cclxuXHRcdHRoaXMucG9zdE1lc3NhZ2VXaXRoUGF0aHNBbmRUcmFjZUNvdW50KHtcclxuXHRcdFx0dHJhY2VNZXNzYWdlLFxyXG5cdFx0fSlcclxuXHJcblx0fVxyXG5cclxuXHR0cmlnZ2VyRXZlbnQgKCBldmVudCApIHtcclxuXHJcblx0XHRpZiAoIHByb2Nlc3MuZW52Lk5PREVfRU5WICE9PSAncHJvZHVjdGlvbicgKSB7XHJcblx0XHRcdHRoaXMuZGVidWdPdXQoXCJ0cmlnZ2VyRXZlbnQ6IFwiICsgZXZlbnQpO1xyXG5cdFx0fVxyXG5cclxuXHRcdHRoaXMucG9zdE1lc3NhZ2VXaXRoUGF0aHNBbmRUcmFjZUNvdW50KHtcclxuXHRcdFx0bWljcm9maW5FdmVudDogZXZlbnQsXHJcblx0XHR9KVxyXG5cdH1cclxuXHJcblx0cG9zdE1lc3NhZ2VXaXRoUGF0aHNBbmRUcmFjZUNvdW50KCBwYXlsb2FkICkge1xyXG5cclxuXHRcdHRyeVxyXG5cdFx0e1xyXG5cdFx0XHRwYXlsb2FkLmluZGV4UGF0aCA9IHRoaXMuaW5kZXhQYXRoO1xyXG5cdFx0XHRwYXlsb2FkLnVzZXJEZWZJZFBhdGggPSB0aGlzLnVzZXJEZWZJZFBhdGg7XHJcblx0XHRcdHBheWxvYWQudHJhY2VDb3VudCA9IHRoaXMudHJhY2VDb3VudCsrO1xyXG5cclxuXHRcdFx0dGhpcy5wb3N0TWVzc2FnZSggSlNPTi5zdHJpbmdpZnkoIHBheWxvYWQgKSApO1xyXG5cclxuXHRcdH0gY2F0Y2ggKGUpIHtcclxuXHRcdFx0Y29uc29sZS5lcnJvcihlKTtcclxuXHRcdH1cclxuXHJcblx0fVxyXG5cclxuXHRwb3N0TWVzc2FnZSAoIHBheWxvYWQgKSB7XHJcblx0XHRpZiAoIHByb2Nlc3MuZW52Lk5PREVfRU5WICE9PSAncHJvZHVjdGlvbicgKSB7XHJcblx0XHRcdHRoaXMuZGVidWdPdXQoIGBQb3N0aW5nIG1lc3NhZ2U6ICR7cGF5bG9hZH1gICk7XHJcblx0XHRcdGlmICggd2luZG93LnBhcmVudCAhPT0gd2luZG93ICkge1xyXG5cdFx0XHRcdHdpbmRvdy5wYXJlbnQucG9zdE1lc3NhZ2UoIHBheWxvYWQsICcqJyApO1xyXG5cdFx0XHR9XHJcblx0XHRcdGlmICggd2luZG93Ll9fQldfX2NhbGxiYWNrICkge1xyXG5cdFx0XHRcdHdpbmRvdy5fX0JXX19jYWxsYmFjayggcGF5bG9hZCApO1xyXG5cdFx0XHR9XHJcblx0XHR9IGVsc2Uge1xyXG5cdFx0XHR3aW5kb3cucGFyZW50LnBvc3RNZXNzYWdlKCBwYXlsb2FkLCAnKicgKTtcclxuXHRcdH1cclxuXHR9XHJcblxyXG5cdC8vIEhlbHBlclxyXG5cdGdldFF1ZXJ5VmFyaWFibGUgKHZhcmlhYmxlKSB7XHJcblx0XHRjb25zdCBwYXJzZWRVcmwgPSBuZXcgVVJMKCB3aW5kb3cubG9jYXRpb24uaHJlZiApO1xyXG5cdFx0cmV0dXJuIHBhcnNlZFVybC5zZWFyY2hQYXJhbXMuZ2V0KHZhcmlhYmxlKTtcclxuXHR9XHJcblxyXG5cdHN0YXJ0TGlzdGVuaW5nVG9WYXJEZWNsUmVxIChkZWNsYXJlVmFyaWFibGVDYWxsYmFjaykge1xyXG5cclxuXHRcdGNvbnN0IHBySW5pdERvbmUgPSB0aGlzLmdldEluaXREb25lUHJvbWlzZSgpO1xyXG5cclxuXHRcdHRoaXMuYW5zd2VyVmFyRGVjbFJlcSA9IGZ1bmN0aW9uIChjYWxsSWQpIHtcclxuXHRcdFx0cHJJbml0RG9uZS50aGVuKCAoKSA9PiB7XHJcblx0XHRcdFx0Y29uc3QgdmFyaWFibGVzID0gZGVjbGFyZVZhcmlhYmxlQ2FsbGJhY2soKTtcclxuXHRcdFx0XHRjb25zdCBwYXNzX2RhdGEgPSB7XHJcblx0XHRcdFx0XHRpbml0aWFsVmFyaWFibGVzOiB2YXJpYWJsZXMsXHJcblx0XHRcdFx0XHRjYWxsSWRcclxuXHRcdFx0XHR9XHJcblxyXG5cdFx0XHRcdHRoaXMucG9zdE1lc3NhZ2UoIEpTT04uc3RyaW5naWZ5KCBwYXNzX2RhdGEgKSApO1xyXG5cdFx0XHR9KTtcclxuXHRcdH1cclxuXHJcblx0XHQvLyBsaXN0ZW5lciBmb3IgcHJvdmlkaW5nIGluaXRpYWwgdmFyaWFibGUgZGF0YSBzaWduYWwuXHJcblx0XHR3aW5kb3cuYWRkRXZlbnRMaXN0ZW5lcihcclxuXHRcdFx0XCJtZXNzYWdlXCIsXHJcblx0XHRcdChldmVudCkgPT4ge1xyXG5cclxuXHRcdFx0XHR0cnkge1xyXG5cdFx0XHRcdFx0Y29uc3QgeyBjYWxsSWQgfSA9IEpTT04ucGFyc2UoZXZlbnQuZGF0YSk7XHJcblx0XHRcdFx0XHRpZiAoIGNhbGxJZCAhPT0gdW5kZWZpbmVkICYmIGNhbGxJZC5pbmNsdWRlcyhcImltcG9ydFZhcmlhYmxlc1wiKSApIHtcclxuXHRcdFx0XHRcdFx0dGhpcy5hbnN3ZXJWYXJEZWNsUmVxKGNhbGxJZCk7XHJcblx0XHRcdFx0XHR9XHJcblx0XHRcdFx0fSBjYXRjaCAoZXJyb3IpIHtcclxuXHRcdFx0XHRcdGlmICggcHJvY2Vzcy5lbnYuTk9ERV9FTlYgIT09ICdwcm9kdWN0aW9uJyApIHtcclxuXHRcdFx0XHRcdFx0Y29uc29sZS5sb2coXCJlcnJvciBvbiBleHRlcm5hbCBsaXN0ZW5lciAtIFwiLCBlcnJvcik7XHJcblx0XHRcdFx0XHR9XHJcblx0XHRcdFx0fVxyXG5cdFx0XHR9LFxyXG5cdFx0XHRmYWxzZSApO1xyXG5cdCB9XHJcblxyXG5cdCBkZWJ1Z091dCAocykge1xyXG5cdFx0aWYgKCBwcm9jZXNzLmVudi5OT0RFX0VOViAhPT0gJ3Byb2R1Y3Rpb24nICkge1xyXG5cclxuXHRcdFx0Ly8gaWYgKCAhdGhpcy5kZWJ1Z091dHB1dCApIHtcclxuXHRcdFx0Ly8gXHRjb25zdCBoZWlndGg9MjAwLCB3aWR0aD01MDA7XHJcblx0XHRcdC8vIFx0Ly8gZG9jdW1lbnQuYm9keS5pbm5lckhUTUwgKz0gYDxkaXYgaWQ9XCJid19EZWJ1Z091dHB1dFwiIHN0eWxlPVwid2lkdGg6JHt3aWR0aH1weDtoZWlnaHQ6JHtoZWlndGh9cHg7cG9zaXRpb246YWJzb2x1dGU7Ym90dG9tOjBweDtsZWZ0OjBweDt6LWluZGV4OjEwMDAwMDt3aGl0ZS1zcGFjZTpwcmU7Ym9yZGVyOjFweCBzb2xpZCBibGFjaztiYWNrZ3JvdW5kOmxpZ2h0eWVsbG93XCI+PC9kaXY+YDtcclxuXHRcdFx0Ly8gXHRjb25zdCBkaXYgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KFwiRElWXCIpO1xyXG5cdFx0XHQvLyBcdGNvbnN0IHN0ID0ge1xyXG5cdFx0XHQvLyBcdFx0d2lkdGg6YCR7d2lkdGh9cHhgLFxyXG5cdFx0XHQvLyBcdFx0aGVpZ2h0OmAke2hlaWd0aH1weGAsXHJcblx0XHRcdC8vIFx0XHRvdmVyZmxvdzpcInNjcm9sbFwiLFxyXG5cdFx0XHQvLyBcdFx0cG9zaXRpb246XCJhYnNvbHV0ZVwiLFxyXG5cdFx0XHQvLyBcdFx0Ym90dG9tOlwiMHB4XCIsXHJcblx0XHRcdC8vIFx0XHRsZWZ0OlwiMHB4XCIsXHJcblx0XHRcdC8vIFx0XHRcInotaW5kZXhcIjoxMDAwMDAsXHJcblx0XHRcdC8vIFx0XHRcIndoaXRlLXNwYWNlXCI6XCJwcmVcIixcclxuXHRcdFx0Ly8gXHRcdGJvcmRlcjpcIjFweCBzb2xpZCBibGFja1wiLFxyXG5cdFx0XHQvLyBcdFx0YmFja2dyb3VuZDpcImxpZ2h0eWVsbG93XCIsXHJcblx0XHRcdC8vIFx0fVxyXG5cdFx0XHQvLyBcdE9iamVjdC5hc3NpZ24oIGRpdi5zdHlsZSwgc3QgKTtcclxuXHRcdFx0Ly8gXHRkb2N1bWVudC5ib2R5LmFwcGVuZENoaWxkKGRpdik7XHJcblx0XHRcdC8vIFx0dGhpcy5kZWJ1Z091dHB1dCA9IGRpdjtcclxuXHRcdFx0Ly8gfVxyXG5cdFx0XHQvLyB0aGlzLmRlYnVnT3V0cHV0LmlubmVySFRNTCArPSBcIlxcblwiK3M7XHJcblx0XHRcdC8vIHRoaXMuZGVidWdPdXRwdXQuc2Nyb2xsVG9wID0gdGhpcy5kZWJ1Z091dHB1dC5zY3JvbGxIZWlnaHQ7XHJcblxyXG5cdFx0XHRjb25zb2xlLmxvZyhzKTtcclxuXHRcdFx0Ly8gY29uc29sZS50cmFjZSgpO1xyXG5cclxuXHRcdH1cclxuXHQgfVxyXG5cclxuXHQvLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vL1xyXG5cclxuXHRnZXRJbml0RG9uZVByb21pc2UgKCkge1xyXG5cdFx0cmV0dXJuIHRoaXMucHJJbml0RG9uZTtcclxuXHR9XHJcblxyXG5cdGluY0luaXRDbnQgKCkge1xyXG5cdFx0cmV0dXJuICsrdGhpcy5pbml0RG9uZUNudDtcclxuXHR9XHJcblxyXG5cdGRlY0luaXRDbnQgKCkge1xyXG5cdFx0aWYgKCB0aGlzLmluaXREb25lQ250ID4gMCApIHtcclxuXHRcdFx0dGhpcy5pbml0RG9uZUNudC0tO1xyXG5cdFx0XHRpZiAodGhpcy5pbml0RG9uZUNudCA9PT0gMCkge1xyXG5cdFx0XHRcdHRoaXMucHJJbml0RG9uZVJlc29sdmUoKTtcclxuXHRcdFx0fVxyXG5cdFx0fVxyXG5cdFx0cmV0dXJuIHRoaXMuaW5pdERvbmVDbnQ7XHJcblx0fVxyXG5cclxufVxyXG4iLCJpbXBvcnQgJy4vdGV4dGFyZWFJbnNlcnRzLmNzcydcclxuXHJcbmltcG9ydCB7IG1lcmdlRGVlcCwgc2V0U3RhdGVQb3N0UHJvYywgcmVnZXhDYW5Mb29rQmVoaW5kIH0gZnJvbSAnLi9jb21tb24nXHJcblxyXG5leHBvcnQgY2xhc3MgdGV4dGFyZWFDb250YWluZXIge1xyXG5cclxuXHRjb25zdHJ1Y3RvciAoIGRpdlNlbGVjdG9yLCBvcHRzID0ge30sIGJhc2UgPSBudWxsICkge1xyXG5cclxuXHRcdGlmICggYmFzZS5mc20gJiYgYmFzZS5mc20uaW5jSW5pdENudCApIHtcclxuXHRcdFx0YmFzZS5mc20uaW5jSW5pdENudCgpO1xyXG5cdFx0fVxyXG5cclxuXHRcdGNvbnN0IGRlZmF1bHRzID0ge1xyXG5cdFx0XHRvdXRlckRpdlN0eWxlczoge1x0Ly8gc3R5bGVzIG9mIGNyZWF0ZWQgb3V0ZXIgZGl2IChjb250YWluaW5nIHRleHRhcmVhIGFuZCB0b29sYmFyKVxyXG5cdFx0XHR9LFxyXG5cdFx0XHRkaXZTdHlsZXM6IHtcdC8vIHN0eWxlcyBvZiBcInRleHRhcmVhXCItZGl2XHJcblx0XHRcdFx0Ly8gd2lkdGg6ICczMDBweCcsXHJcblx0XHRcdFx0Ly8gaGVpZ2h0OiAnMjAwcHgnLFxyXG5cdFx0XHR9LFxyXG5cdFx0fVxyXG5cdFx0bWVyZ2VEZWVwKCBPYmplY3QuYXNzaWduKCB0aGlzLCBkZWZhdWx0cyApLCBvcHRzICk7XHJcblx0XHQvLyBiYXNlIGlzIG9ubHkgdXNlZCBmb3Igc2VuZENoYW5nZVN0YXRlKCkgYW5kIHBvc3RMb2coKVxyXG5cdFx0dGhpcy5iYXNlID0gYmFzZTtcclxuXHJcblx0XHQvLyBtb3ZlIGRpdiBpbiBhIGRpdi50ZXh0YXJlYUluc2VydHMgKC0+dGhpcy5vdXRlckRpdilcclxuXHRcdHRoaXMub3V0ZXJEaXYgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdESVYnKTtcclxuXHRcdHRoaXMub3V0ZXJEaXYuY2xhc3NMaXN0LmFkZCggJ3RleHRhcmVhSW5zZXJ0cycgKTtcclxuXHRcdHRoaXMuc2V0U3R5bGVzKCB0aGlzLm91dGVyRGl2LCB0aGlzLm91dGVyRGl2U3R5bGVzICk7XHJcblxyXG5cdFx0dGhpcy5kaXYgPSB0eXBlb2YgZGl2U2VsZWN0b3IgPT09ICdzdHJpbmcnID8gZG9jdW1lbnQucXVlcnlTZWxlY3RvciggZGl2U2VsZWN0b3IgKSA6IGRpdlNlbGVjdG9yO1xyXG5cdFx0dGhpcy5kaXYucGFyZW50Tm9kZS5yZXBsYWNlQ2hpbGQoIHRoaXMub3V0ZXJEaXYsIHRoaXMuZGl2ICk7XHJcblx0XHR0aGlzLnNldFN0eWxlcyggdGhpcy5kaXYsIHRoaXMuZGl2U3R5bGVzICk7XHJcblxyXG5cdFx0dGhpcy5vdXRlckRpdi5hcHBlbmRDaGlsZCggdGhpcy5kaXYgKTtcclxuXHRcdHRoaXMuaW5pdERhdGEgPSB0aGlzLmRpdi5pbm5lckhUTUwudHJpbSgpO1xyXG5cclxuXHRcdGlmICggYmFzZS5mc20gJiYgYmFzZS5mc20uZGVjSW5pdENudCApIHtcclxuXHRcdFx0YmFzZS5mc20uZGVjSW5pdENudCgpO1xyXG5cdFx0fVxyXG5cdH1cclxuXHJcblx0ZXZfaW5wdXQgKCkge1xyXG5cdH1cclxuXHJcblx0c2V0U3R5bGVzICggZWwsIHN0eWxlcyApIHtcclxuXHRcdGZvciAoIGNvbnN0IHN0IGluIHN0eWxlcyApIHtcclxuXHRcdFx0ZWwuc3R5bGVbc3RdID0gc3R5bGVzW3N0XTtcclxuXHRcdH1cclxuXHR9XHJcblxyXG5cdGV4dHJhY3QgKCkge1xyXG5cdFx0cmV0dXJuICcnO1xyXG5cdH1cclxuXHJcblx0Ly8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy9cclxuXHJcblx0Z2V0RGVmYXVsdENoYW5nZVN0YXRlICgpIHtcclxuXHRcdHJldHVybiB0aGlzLmRpdi5pbm5lckhUTUwudHJpbSgpICE9PSB0aGlzLmluaXREYXRhO1xyXG5cdH1cclxuXHJcblx0Z2V0U3RhdGUgKCkge1xyXG5cdFx0cmV0dXJuICd7fSc7XHJcblx0fVxyXG5cclxuXHRzZXRTdGF0ZSAoKSB7XHJcblx0fVxyXG59XHJcblxyXG5leHBvcnQgY2xhc3MgdGV4dGFyZWFCYXNlIGV4dGVuZHMgdGV4dGFyZWFDb250YWluZXIge1xyXG5cclxuXHRjb25zdHJ1Y3RvciAoIGRpdlNlbGVjdG9yLCBvcHRzID0ge30sIGJhc2UgPSBudWxsICkge1xyXG5cclxuXHRcdGlmICggYmFzZS5mc20gJiYgYmFzZS5mc20uaW5jSW5pdENudCApIHtcclxuXHRcdFx0YmFzZS5mc20uaW5jSW5pdENudCgpO1xyXG5cdFx0fVxyXG5cclxuY29uc29sZS5sb2coXCIqKyorKisqKyorKitcIixyZWdleENhbkxvb2tCZWhpbmQoKSlcclxuXHRcdGNvbnN0IGRlZmF1bHRzID0ge1xyXG5cdFx0XHRtdWx0aUxpbmU6IHRydWUsXHJcblx0XHRcdHN0cmlwVGFnczogZmFsc2UsXHQvLyB0cnVlOiBvbmx5IGFsbG93IHRleHQtbm9kZSwgZGVsZXRlIGFsbCBIVE1MLXRhZ3MgKGZpcmVvZnggaW5zZXJ0cyA8YnI+IHNvbWV0aW1lcylcclxuXHRcdFx0aW5wdXRSZWdleHA6IG51bGwsXHQvLyByZWdleHAgZXZhbHVhdGVkIGFnYWluc3QgZGl2LmlubmVySFRNTFxyXG5cdFx0XHRtYXhsZW5ndGg6IG51bGwsXHQvLyBtYXggbnVtYmVycyBjaGFyYWN0ZXJzXHJcblxyXG5cdFx0XHQvLyBSZXBsYWNlcyBkb25lIGJ5IHRoaXMuZXh0cmFjdCgpXHJcblx0XHRcdC8vIChlLmcuIHRvb2xiYXIuZXh0cmFjdFJlcGxhY2UgYXJlIGluc2VydGVkIGhlcmUpXHJcblx0XHRcdGV4dHJhY3RSZXBsYWNlczogW1xyXG5cdFx0XHRcdC8vIHsgZnJvbTogL3JlZ2V4cC8sIHRvOiBcInJlcGxhY2VcIiB9LFxyXG5cclxuXHRcdFx0XHRyZWdleENhbkxvb2tCZWhpbmQoKSA/XHJcblx0XHRcdFx0XHR7IGZyb206ICBuZXcgUmVnRXhwKCcoPzwhXFxcXCopXFxcXCooPyFcXFxcKiknLCdnJykgLCB0bzogXCJcXHUyMmM1XCIgfSA6XHQvLyByZXBsYWNlICcqJyB0byBcXHUyMmM1XHJcblx0XHRcdFx0XHQvLyBJQiBpbnRlcm5hbCBicm93c2VyIGRvZXMgbm90IHN1cHBvcnQgbmVnYXRpdmUgbG9vay1iZWhpbmQvLWZvcndhcmRcclxuXHRcdFx0XHRcdC8vIHdvcmthcm91bmQ6XHJcblx0XHRcdFx0XHR7IGZyb206IC8oXnxbXipdKVxcKihbXipdfCQpL2csIHRvOiBcIiQxXFx1MjJjNSQyXCIgfSxcdC8vIHJlcGxhY2UgJyonIHRvIFxcdTIyYzVcclxuXHJcblx0XHRcdFx0eyBmcm9tOiAvXFx1MjAyMnxcXHUyNWNmL2csIHRvOiBcIlxcdTIyYzVcIiB9LFx0Ly8gcmVwbGFjZSDigKIgYW5kIOKXjyB0byBcXHUyMmM1XHJcblx0XHRcdF1cclxuXHRcdH1cclxuXHRcdG1lcmdlRGVlcCggZGVmYXVsdHMsIG9wdHMgKTtcclxuXHRcdHN1cGVyKCBkaXZTZWxlY3RvciwgZGVmYXVsdHMsIGJhc2UgKTtcclxuXHJcblx0XHR0aGlzLmRpdi5zZXRBdHRyaWJ1dGUoICdjb250ZW50ZWRpdGFibGUnLCAndHJ1ZScgKTtcclxuXHJcblx0XHR0aGlzLmRpdi5hZGRFdmVudExpc3RlbmVyKCAna2V5ZG93bicsIHRoaXMuZXZfa2V5ZG93bi5iaW5kKHRoaXMpICk7XHJcblx0XHR0aGlzLmRpdi5hZGRFdmVudExpc3RlbmVyKCAnaW5wdXQnLCB0aGlzLmV2X2lucHV0LmJpbmQodGhpcykgKTtcclxuXHRcdC8vIHRoaXMuZGl2LmFkZEV2ZW50TGlzdGVuZXIoICd0b3VjaGVuZCcsIHRoaXMuZXZfdG91Y2hlbmQuYmluZCh0aGlzKSApO1xyXG5cdFx0Ly8gWydjbGljaycsJ3RvdWNoc3RhcnQnLCdjaGFuZ2UnLCdpbnB1dCcsJ2tleXByZXNzJywna2V5dXAnXS5mb3JFYWNoKCBlID0+IHtcclxuXHRcdC8vXHR0aGlzLmRpdi5hZGRFdmVudExpc3RlbmVyKCBlLCB0aGlzLmNoZWNrTm9kZXMuYmluZCh0aGlzKSApO1xyXG5cdFx0Ly8gfSlcclxuXHJcblx0XHRpZiAoICF0aGlzLmRpdi50ZXh0Q29udGVudC5sZW5ndGggJiYgdGhpcy5tdWx0aUxpbmUgKSB7XHJcblx0XHRcdHRoaXMuZGl2LnRleHRDb250ZW50ID0gXCJcXG5cIjtcclxuXHRcdFx0Ly8gdGhpcy5kaXYuYXBwZW5kQ2hpbGQoIGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2RpdicpICk7XHJcblx0XHR9XHJcblxyXG5cdFx0dGhpcy5kaXYuYWRkRXZlbnRMaXN0ZW5lciggJ3Bhc3RlJywgKGV2KSA9PiBldi5wcmV2ZW50RGVmYXVsdCgpICk7XHJcblxyXG5cdFx0aWYgKCB0aGlzLmlucHV0UmVnZXhwICkge1xyXG5cdFx0XHR0aGlzLmlucHV0UkUgPSBuZXcgUmVnRXhwKCB0aGlzLmlucHV0UmVnZXhwICk7XHJcblx0XHRcdHRoaXMuc2F2ZVZhbHVlKCk7XHJcblx0XHR9XHJcblxyXG5cdFx0dGhpcy5kaXYuYWRkRXZlbnRMaXN0ZW5lciggJ2ZvY3VzJyxcclxuXHRcdFx0XHQoKSA9PiBzZXRUaW1lb3V0KCAoKSA9PiB0aGlzLmJhc2UucG9zdExvZyggJ3RleHRhcmVhRm9jdXMnLCB0aGlzLmdldFRleHRQb3MoKSApLCAwICkgKTtcclxuXHRcdHRoaXMuZGl2LmFkZEV2ZW50TGlzdGVuZXIoICdibHVyJywgKCkgPT4gdGhpcy5iYXNlLnBvc3RMb2coICd0ZXh0YXJlYUJsdXInICkgKTtcclxuXHJcblxyXG5cdFx0dGhpcy5vbGRWYWx1ZSA9IFwiXCI7XHJcblx0XHR0aGlzLm9sZEZvY3VzRWxlbUluZGV4ID0gbnVsbDtcclxuXHJcblx0XHQvLyBTYXZlIGluaXREYXRhICYgaW5pdCBTdGF0ZVZhcnNcclxuXHRcdHRoaXMuaW5pdERhdGEgPSB0aGlzLmRpdi5pbm5lckhUTUwudHJpbSgpO1xyXG5cdFx0dGhpcy5iYXNlLnNlbmRDaGFuZ2VTdGF0ZSggdGhpcyApO1x0Ly8gaW5pdCAmIHNlbmQgY2hhbmdlU3RhdGUgJiBzY29yZVxyXG5cclxuXHRcdGlmICggYmFzZS5mc20gJiYgYmFzZS5mc20uZGVjSW5pdENudCApIHtcclxuXHRcdFx0YmFzZS5mc20uZGVjSW5pdENudCgpO1xyXG5cdFx0fVxyXG5cdH1cclxuXHJcblx0Ly8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy9cclxuXHJcblx0ZXZfa2V5ZG93biAoZXZlbnQpIHtcclxuLy8gY29uc29sZS5sb2coZXZlbnQpO1xyXG5cclxuXHRcdGxldCByZXNjb3JlID0gMDtcclxuXHJcblx0XHQvLyBsb2c/XHJcblx0XHRpZiAoIHRoaXMuYmFzZSApIHtcclxuXHRcdFx0Y29uc3QgZGF0YSA9IHtcclxuXHRcdFx0XHR3aGljaDogZXZlbnQud2hpY2ggfHwgZXZlbnQua2V5Q29kZSxcclxuXHRcdFx0XHQvLyBleHRyYWN0OiB0aGlzLmV4dHJhY3QoKSxcdC8vIG9sZCwgdW5jaGFuZ2VkIHZhbHVlXHJcblx0XHRcdH07XHJcblx0XHRcdFsgJ2tleScsICdjb2RlJywgJ3NoaWZ0S2V5JywgJ2FsdEtleScsICdjdHJsS2V5JywgJ21ldGFLZXknLCAnaXNDb21wb3NpbmcnLCAncmVwZWF0JyBdLmZvckVhY2goIGsgPT4ge1xyXG5cdFx0XHRcdGlmICggZXZlbnRba10gKSB7XHJcblx0XHRcdFx0XHRkYXRhW2tdID0gZXZlbnRba107XHJcblx0XHRcdFx0fVxyXG5cdFx0XHR9KVxyXG5cclxuLy8gISEhISEgRE9OVCBMT0cgT04gQ0hST01FL0FORFJPSUQgISEhISFcclxuLy8gISEhISEgRE9OVCBMT0cgT04gQ0hST01FL0FORFJPSUQgISEhISFcclxuLy8gISEhISEgRE9OVCBMT0cgT04gQ0hST01FL0FORFJPSUQgISEhISFcclxuXHRcdFx0dGhpcy5iYXNlLnBvc3RMb2coICdrZXlEb3duJywgT2JqZWN0LmFzc2lnbiggZGF0YSwgdGhpcy5nZXRUZXh0UG9zKCkgKSApO1xyXG5cdFx0fVxyXG5cclxuXHRcdC8vIE9uIEVOVEVSIGluc2VydCA8YnI+LCBwcmV2ZW50IGluc2VydGluZyA8ZGl2cz5cclxuXHRcdGlmICggZXZlbnQua2V5PT09XCJFbnRlclwiIHx8IGV2ZW50LndoaWNoPT0xMyB8fCBldmVudC5rZXlDb2RlPT0xMyApIHtcclxuXHRcdFx0aWYgKCAhdGhpcy50YWJUb05leHRJbnB1dEZpZWxkKGV2ZW50KSApIHtcclxuXHRcdFx0Ly8gXHRpZiAoICF0aGlzLm11bHRpTGluZSApIHtcclxuXHRcdFx0Ly8gXHRcdGV2ZW50LnByZXZlbnREZWZhdWx0KCk7XHJcblx0XHRcdC8vIFx0XHRldmVudC5zdG9wUHJvcGFnYXRpb24oKTtcclxuXHRcdFx0Ly8gXHR9XHJcblx0XHRcdC8vIH1cclxuXHRcdFx0XHRpZiAoICF0aGlzLm11bHRpTGluZSB8fCB0aGlzLnBhc3RlSHRtbEF0Q2FyZXQoXCJcXG5cIikgKSB7XHJcblxyXG5cdFx0XHRcdFx0Ly8gLy8gQ2hyb21lOiBJZiBFbnRlciB3YXMgaGl0IGJlaGluZCBsYXN0IGNoYXJhY3RlcixcclxuXHRcdFx0XHRcdC8vIC8vIGFuIDxkaXY+PGJyPjxkaXY+IGlzIGluc2VydGVkXHJcblx0XHRcdFx0XHQvLyAvLyBIb3RGaXg6IGRlbGV0ZSBsYXN0IDxkaXY+XHJcblx0XHRcdFx0XHQvLyBjb25zdCBzZWwgPSB3aW5kb3cuZ2V0U2VsZWN0aW9uKCk7XHJcblx0XHRcdFx0XHQvLyBpZiAoIHNlbCAmJiBzZWwuaXNDb2xsYXBzZWQgJiYgc2VsLmZvY3VzTm9kZSAmJlxyXG5cdFx0XHRcdFx0Ly8gXHRcdHNlbC5mb2N1c05vZGU9PXRoaXMuZGl2ICYmIHNlbC5mb2N1c09mZnNldD09dGhpcy5kaXYuY2hpbGROb2Rlcy5sZW5ndGggKSB7XHJcblxyXG5cdFx0XHRcdFx0Ly8gXHRsZXQgbGFzdE5vZGUgPSB0aGlzLmRpdi5jaGlsZE5vZGVzWyB0aGlzLmRpdi5jaGlsZE5vZGVzLmxlbmd0aC0xIF07XHJcblx0XHRcdFx0XHQvLyBcdGlmICggbGFzdE5vZGUudGFnTmFtZT09J0RJVicgJiYgIWxhc3ROb2RlLmNsYXNzTGlzdC5jb250YWlucygnaW5zZXJ0ZWQnKSApIHtcclxuXHRcdFx0XHRcdC8vIFx0XHRsYXN0Tm9kZS5yZW1vdmUoKTtcclxuXHRcdFx0XHRcdC8vIFx0fVxyXG5cdFx0XHRcdFx0Ly8gfVxyXG5cclxuXHRcdFx0XHRcdGV2ZW50LnByZXZlbnREZWZhdWx0KCk7XHJcblx0XHRcdFx0XHRldmVudC5zdG9wUHJvcGFnYXRpb24oKTtcclxuXHRcdFx0XHR9XHJcblx0XHRcdH1cclxuXHRcdFx0cmVzY29yZSA9IDE7XHJcblxyXG5cdFx0Ly8gT24gVEFCIGluc2VydCB0YWJcclxuXHRcdH0gZWxzZSBpZiAoIGV2ZW50LmtleT09PVwiVGFiXCIgfHwgZXZlbnQud2hpY2g9PTkgfHwgZXZlbnQua2V5Q29kZT09OSApIHtcclxuXHRcdFx0aWYgKCAhdGhpcy50YWJUb05leHRJbnB1dEZpZWxkKGV2ZW50KSApIHtcclxuXHRcdFx0XHRpZiAoIHRoaXMucGFzdGVIdG1sQXRDYXJldCgnJiMwOTsnKSApIHtcclxuXHRcdFx0XHRcdGV2ZW50LnByZXZlbnREZWZhdWx0KCk7XHJcblx0XHRcdFx0XHRldmVudC5zdG9wUHJvcGFnYXRpb24oKTtcclxuXHRcdFx0XHR9XHJcblx0XHRcdH1cclxuXHRcdFx0cmVzY29yZSA9IDE7XHJcblxyXG5cdFx0Ly8gQmFja3NwYWNlOiBEZWxldGUgZGl2IGJlZm9yZSBjdXJzb3I/XHJcblx0XHR9IGVsc2UgaWYgKCBldmVudC5rZXk9PT1cIkJhY2tzcGFjZVwiIHx8IGV2ZW50LndoaWNoPT04IHx8IGV2ZW50LmtleUNvZGU9PTggKSB7XHJcblx0XHRcdC8vIHNob3VsZCBkaXYgYmUgZGVsZXRlZFxyXG5cdFx0XHRpZiAoICF0aGlzLmRlbElmRGl2KCAtMSwgZXZlbnQgKSApIHtcclxuXHRcdFx0XHQvLyAvLyBJcyBjdXJzb3IgaW4vYWZ0ZXIgbGFzdCB0ZXh0IG5vZGUgJyAnIChkb24ndCBkZWxldGUsIGp1c3QgcmVwb3MgY3Vyc29yKVxyXG5cdFx0XHRcdC8vIGNvbnN0IHNlbCA9IHdpbmRvdy5nZXRTZWxlY3Rpb24oKTtcclxuXHRcdFx0XHQvLyBpZiAoIHNlbCAmJiBzZWwuaXNDb2xsYXBzZWQgJiYgc2VsLmZvY3VzTm9kZSApIHtcclxuXHRcdFx0XHQvLyBcdGNvbnN0IG5vZGVzID0gdGhpcy5kaXYuY2hpbGROb2RlcztcclxuXHRcdFx0XHQvLyBcdGlmICggbm9kZXNbbm9kZXMubGVuZ3RoLTFdLnRleHRDb250ZW50PT0nICcgJiZcclxuXHRcdFx0XHQvLyBcdFx0XHQoIHNlbC5mb2N1c05vZGU9PXRoaXMuZGl2ICYmIHNlbC5mb2N1c09mZnNldD49dGhpcy5kaXYuY2hpbGROb2Rlcy5sZW5ndGggfHxcdC8vIEN1cnNvciBiZWhpbmQgbGFzdCBub2RlXHJcblx0XHRcdFx0Ly8gXHRcdFx0c2VsLmZvY3VzTm9kZT09bm9kZXNbbm9kZXMubGVuZ3RoLTFdICYmIHNlbC5mb2N1c09mZnNldD09MSApICkge1x0Ly8gY3Vyc29yIGFmdGVyIHNwYWNlIGluIGxhc3QgdGV4dG5vZGVcclxuXHJcblx0XHRcdFx0Ly8gXHRcdC8vIG1vdmUgY3Vyc29yIGJlZm9yZSBzcGFjZSBpbiBsYXN0IHRleHQgbm9kZVxyXG5cdFx0XHRcdC8vIFx0XHRjb25zdCByYW5nZSA9IHNlbC5nZXRSYW5nZUF0KDApLmNsb25lUmFuZ2UoKTtcclxuXHRcdFx0XHQvLyBcdFx0cmFuZ2Uuc2V0U3RhcnQoIG5vZGVzW25vZGVzLmxlbmd0aC0xXSwgMCApO1xyXG5cdFx0XHRcdC8vIFx0XHRyYW5nZS5jb2xsYXBzZSh0cnVlKTtcclxuXHRcdFx0XHQvLyBcdFx0c2VsLnJlbW92ZUFsbFJhbmdlcygpO1xyXG5cdFx0XHRcdC8vIFx0XHRzZWwuYWRkUmFuZ2UocmFuZ2UpO1xyXG5cclxuXHRcdFx0XHQvLyBcdFx0ZXZlbnQucHJldmVudERlZmF1bHQoKTtcclxuXHRcdFx0XHQvLyBcdFx0ZXZlbnQuc3RvcFByb3BhZ2F0aW9uKCk7XHJcblx0XHRcdFx0Ly8gXHR9XHJcblx0XHRcdFx0Ly8gfVxyXG5cdFx0XHR9XHJcblx0XHRcdHJlc2NvcmUgPSAxO1xyXG5cclxuXHRcdC8vIERlbGV0ZTogRGVsZXRlIGRpdiBhZnRlciBjdXJzb3I/XHJcblx0XHR9IGVsc2UgaWYgKCBldmVudC5rZXk9PT1cIkRlbGV0ZVwiIHx8ICggZXZlbnQud2hpY2ggfHwgZXZlbnQua2V5Q29kZSApPT00NiApIHtcclxuXHRcdFx0dGhpcy5kZWxJZkRpdiggMSwgZXZlbnQgKTtcclxuXHRcdFx0cmVzY29yZSA9IDE7XHJcblx0XHR9XHJcblxyXG5cdFx0aWYgKCB0aGlzLmJhc2UgJiYgcmVzY29yZT4wICkge1xyXG5cdFx0XHR0aGlzLmJhc2Uuc2VuZENoYW5nZVN0YXRlKCB0aGlzICk7XHJcblx0XHR9XHJcblx0fVxyXG5cclxuXHQvLyBjaHJvbWUgQCBhbmRyb2lkIGRvZXMgbm90IHNlbmQga2V5Q29kZXMgb24ga2V5ZG93biBldmVudHNcclxuXHQvLyB0aGVyZWZvcmUgaW5wdXQgZXZlbnQgbXVzdCBiZSBldmFsdWF0ZWQgZm9yICdkZWxldGVDb250ZW50QmFja3dhcmQnIGJlaGluZCBpbnNlcnRlZCBlbGVtZW50c1xyXG5cdGV2X2lucHV0IChldmVudCkge1xyXG5cclxuXHRcdGxldCBzYXZlTmV3VmFsdWUgPSBmYWxzZTtcclxuXHJcbi8vIGNvbnNvbGUubG9nKCB3aW5kb3cuZ2V0U2VsZWN0aW9uKCkgKTtcclxuXHRcdGNvbnN0IHNlbCA9IHdpbmRvdy5nZXRTZWxlY3Rpb24oKTtcclxuXHJcblx0XHQvLyB3YXMgXCJpbnNlcnRlZFwiIG5vZGUgc2F2ZWQgZm9yIGRlbGV0aW9uIGFuZCB3YXMgYmFja3NwYWNlIHByb2Nlc3NlZD9cclxuXHRcdGlmICggZXZlbnQgJiYgZXZlbnQuaW5wdXRUeXBlPT0nZGVsZXRlQ29udGVudEJhY2t3YXJkJyAmJiB0aGlzLmRlbFBvc0VsZW1lbnQgKSB7XHJcblxyXG4vLyBjb25zb2xlLmxvZyh0aGlzLmRlbFBvc1RleHQpO1xyXG5cdFx0XHQvLyBpcyBjdXJzb3IgSU4gaW5zZXJ0ZWQgZWxlbWVudD9cclxuXHRcdFx0bGV0IGluc2VydGVkID0gbnVsbCwgc2VhcmNoID0gc2VsLmZvY3VzTm9kZTtcclxuXHRcdFx0aWYgKCB0aGlzLmRlbFBvc1RleHQgKSB7XHJcblx0XHRcdFx0d2hpbGUgKCAhaW5zZXJ0ZWQgJiYgc2VhcmNoICYmICggIXNlYXJjaC5jbGFzc0xpc3QgfHwgIXNlYXJjaC5jbGFzc0xpc3QuY29udGFpbnMoJ3RleHRhcmVhSW5zZXJ0cycpICkgKSB7XHJcbi8vIGNvbnNvbGUubG9nKHNlYXJjaCk7XHJcblx0XHRcdFx0XHRpZiAoIHNlYXJjaC5jbGFzc0xpc3QgJiYgc2VhcmNoLmNsYXNzTGlzdC5jb250YWlucygnaW5zZXJ0ZWQnKSApIHtcclxuXHRcdFx0XHRcdFx0aW5zZXJ0ZWQgPSBzZWFyY2g7XHJcblx0XHRcdFx0XHR9XHJcblx0XHRcdFx0XHRzZWFyY2ggPSBzZWFyY2gucGFyZW50Tm9kZTtcclxuXHRcdFx0XHR9XHJcblx0XHRcdH1cclxuXHRcdFx0aWYgKCBpbnNlcnRlZCApICB7XHJcbi8vIGNvbnNvbGUubG9nKHRoaXMuZGVsUG9zVGV4dCx0aGlzLmRlbFBvc0VsZW1lbnQpXHJcblx0XHRcdFx0Ly8gcG9zIGN1cnNvclxyXG5cdFx0XHRcdGlmICggc2VsLmdldFJhbmdlQXQgJiYgc2VsLnJhbmdlQ291bnQgKSB7XHJcblx0XHRcdFx0XHRjb25zdCByYW5nZSA9IHNlbC5nZXRSYW5nZUF0KDApLmNsb25lUmFuZ2UoKTtcclxuXHRcdFx0XHRcdHJhbmdlLnNldFN0YXJ0QmVmb3JlKGluc2VydGVkKTtcclxuXHRcdFx0XHRcdHJhbmdlLmNvbGxhcHNlKHRydWUpO1xyXG5cdFx0XHRcdFx0c2VsLnJlbW92ZUFsbFJhbmdlcygpO1xyXG5cdFx0XHRcdFx0c2VsLmFkZFJhbmdlKHJhbmdlKTtcclxuXHRcdFx0XHR9XHJcblx0XHRcdFx0Ly8gcmVwbGFjZSBpbnNlcnRlZCB3aXRoIHRleHRcclxuXHRcdFx0XHR0aGlzLmRpdi5yZXBsYWNlQ2hpbGQoIHRoaXMuZGVsUG9zVGV4dCwgdGhpcy5kZWxQb3NFbGVtZW50ICk7XHJcblx0XHRcdFx0dGhpcy5kaXYubm9ybWFsaXplKCk7XHJcblx0XHRcdH0gZWxzZSB7XHJcblx0XHRcdFx0dGhpcy5kZWxQb3NFbGVtZW50LnJlbW92ZSgpO1xyXG5cdFx0XHR9XHJcblx0XHRcdHRoaXMuZGVsUG9zRWxlbWVudCA9IG51bGw7XHJcblx0XHRcdHRoaXMuZGVsUG9zVGV4dCA9IG51bGw7XHJcblxyXG5cdFx0XHRzYXZlTmV3VmFsdWUgPSAoIHRoaXMuaW5wdXRSRSB8fCAhdGhpcy5tdWx0aUxpbmUgKTtcclxuXHJcblx0XHR9IGVsc2Uge1xyXG5cclxuXHRcdFx0Ly8gY3Vyc29yIGFmdGVyIGRlbGV0ZWFibGUsIGluc2VydGVkIGVsZW1lbnQ/XHJcblx0XHRcdC8vIGNvbnNvbGUubG9nKHNlbCxzZWwuZm9jdXNOb2RlLHRoaXMuZGl2KVxyXG5cdFx0XHRpZiAoIHNlbCAmJiBzZWwuaXNDb2xsYXBzZWQgJiYgc2VsLmZvY3VzTm9kZSAmJlxyXG5cdFx0XHRcdFx0c2VsLmZvY3VzTm9kZS5wYXJlbnROb2RlPT10aGlzLmRpdiAmJiBzZWwuZm9jdXNPZmZzZXQ9PT0wICYmXHJcblx0XHRcdFx0XHRzZWwuZm9jdXNOb2RlLnByZXZpb3VzU2libGluZyAmJiBzZWwuZm9jdXNOb2RlLnByZXZpb3VzU2libGluZy5jbGFzc0xpc3QgJiZcclxuXHRcdFx0XHRcdHNlbC5mb2N1c05vZGUucHJldmlvdXNTaWJsaW5nLmNsYXNzTGlzdC5jb250YWlucygnaW5zZXJ0ZWQnICkgKSB7XHJcblx0XHRcdFx0dGhpcy5kZWxQb3NUZXh0ID0gc2VsLmZvY3VzTm9kZS5jbG9uZU5vZGUodHJ1ZSk7XHJcblx0XHRcdFx0dGhpcy5kZWxQb3NFbGVtZW50ID0gc2VsLmZvY3VzTm9kZS5wcmV2aW91c1NpYmxpbmc7XHJcblx0XHRcdH0gZWxzZSB7XHJcblx0XHRcdFx0dGhpcy5kZWxQb3NFbGVtZW50ID0gbnVsbDtcclxuXHRcdFx0XHR0aGlzLmRlbFBvc1RleHQgPSBudWxsO1xyXG5cdFx0XHR9XHJcblx0XHRcdC8vIC8vIElmIHRoZSBsYXN0IGVsZW1lbnQgaXMgXCJpbnNlcnRlZFwiIGFuZCB0aGVyZSBpcyBubyB0ZXh0IGJlaGluZCBpdCwgdGhlIGVsZW1lbnQgaXMgbm90IGRlbGV0YWJsZVxyXG5cdFx0XHQvLyAvLyBiZWNhdXNlIHRoZXJlIGlzIG5vIFwiaW5wdXRcIiBldmVudCBvbiBiYWNrc3BhY2VcclxuXHRcdFx0Ly8gLy8gcG9zc2libGUgZml4OiBhbHdheXMgaGF2ZSBhIFwic3BhY2VcIiBhcyBsYXN0IGVsZW1lbnRcclxuXHRcdFx0Ly8gZWxzZSBpZiAoIHNlbC5mb2N1c05vZGU9PXRoaXMuZGl2ICYmIHNlbC5mb2N1c09mZnNldDw9dGhpcy5kaXYuY2hpbGROb2Rlcy5sZW5ndGggKSB7XHJcblx0XHRcdC8vIFx0dGhpcy5kZWxQb3NUZXh0ID0gbnVsbDtcclxuXHRcdFx0Ly8gXHR0aGlzLmRlbFBvc0VsZW1lbnQgPSB0aGlzLmRpdi5jaGlsZE5vZGVzWyBzZWwuZm9jdXNPZmZzZXQtMSBdO1xyXG5cdFx0XHQvLyB9XHJcblxyXG5cdFx0XHQvLyBoYW5kbGUgbXVsdGlMaW5lIGUuZy4gaW4gYW5kcm9pZCAobm8ga2V5LWV2ZW50cywganVzdCBpbnB1dCBldmVudHMhKVxyXG5cdFx0XHRpZiAoICF0aGlzLm11bHRpTGluZSApIHtcclxuXHRcdFx0XHRpZiAoIHRoaXMuZGl2LnRleHRDb250ZW50Lm1hdGNoKCAvW1xcblxccl0vICkgKSB7XHJcbi8vIGNvbnNvbGUubG9nKHRoaXMuZGl2LnRleHRDb250ZW50KVxyXG4vLyBjb25zb2xlLmxvZyh0aGlzLmRpdi50ZXh0Q29udGVudC5tYXRjaCggL1tcXG5cXHJdLyApKVxyXG5cdFx0XHRcdFx0dGhpcy5yZXN0b3JlVmFsdWUoKTtcclxuXHRcdFx0XHR9IGVsc2Uge1xyXG5cdFx0XHRcdFx0c2F2ZU5ld1ZhbHVlID0gdHJ1ZTtcclxuXHRcdFx0XHR9XHJcblx0XHRcdH0gZWxzZSB7XHJcblx0XHRcdFx0Ly8gSG90Rml4IGZvciBDaHJvbWUgKEVudGVyIGJlaGluZCBsYXN0IGNoYXJhY3RlciBub3QgYWx3YXlzIHByb2Nlc3NlZClcclxuXHRcdFx0XHQvLyBBbHdheXMgaGF2ZSBhICdcXG4nIGFzIGxhc3QgY2hhcmFjdGVyXHJcblx0XHRcdFx0Y29uc3QgbGFzdE5vZGUgPSB0aGlzLmRpdi5jaGlsZE5vZGVzLmxlbmd0aD4wID8gdGhpcy5kaXYuY2hpbGROb2Rlc1sgdGhpcy5kaXYuY2hpbGROb2Rlcy5sZW5ndGgtMSBdIDogbnVsbDtcclxuXHRcdFx0XHRpZiAoIGxhc3ROb2RlICYmIGxhc3ROb2RlLm5vZGVUeXBlPT1Ob2RlLlRFWFRfTk9ERSAmJiAhbGFzdE5vZGUudGV4dENvbnRlbnQuZW5kc1dpdGgoXCJcXG5cIikgKSB7XHJcblx0XHRcdFx0XHRjb25zdCBwb3MgPSAoIHNlbCAmJiBzZWwuZm9jdXNOb2RlPT1sYXN0Tm9kZSA/IHNlbC5mb2N1c09mZnNldCA6IG51bGwgKTtcclxuXHRcdFx0XHRcdGxhc3ROb2RlLnRleHRDb250ZW50ID0gbGFzdE5vZGUudGV4dENvbnRlbnQrXCJcXG5cIjtcclxuXHRcdFx0XHRcdGlmICggcG9zIT09bnVsbCApIHtcclxuXHRcdFx0XHRcdFx0dGhpcy5zZXRDdXJQb3MoIGxhc3ROb2RlLCBwb3MgKTtcclxuXHRcdFx0XHRcdH1cclxuXHRcdFx0XHR9XHJcblx0XHRcdH1cclxuXHJcblx0XHRcdC8vIGhhbmRlbCBzdHJpcFRhZ3NcclxuXHRcdFx0aWYgKCB0aGlzLnN0cmlwVGFncyApIHtcclxuXHRcdFx0XHRpZiAoIHRoaXMuZGl2LmlubmVySFRNTC5tYXRjaCggLzxbXj5dKj4vICkgKSB7XHJcblx0XHRcdFx0XHR0aGlzLmRpdi5pbm5lckhUTUwgPSB0aGlzLmRpdi5pbm5lckhUTUwucmVwbGFjZSggLzxbXj5dKj4vZywgJycgKTtcclxuXHRcdFx0XHR9XHJcblx0XHRcdH0gZWxzZSB7XHJcblx0XHRcdFx0Ly8gZGVsZXRlIGFsbCBkaXY6bm90KC5pbnNlcnRlZClcclxuXHRcdFx0XHQvLyBUSElTIFNIT1VMRCBORVZFUiBIQVBQRU4sIGJ1dCBpdCBzaG91bGQgYmUgY29ycmVjdGVkXHJcblx0XHRcdFx0bGV0IG5vZGUgPSB0aGlzLmRpdi5jaGlsZE5vZGVzWzBdO1xyXG5cdFx0XHRcdHdoaWxlICggbm9kZSApIHtcclxuXHRcdFx0XHRcdGNvbnN0IGVsID0gbm9kZTtcclxuXHRcdFx0XHRcdG5vZGUgPSBub2RlLm5leHRTaWJsaW5nO1xyXG5cdFx0XHRcdFx0aWYgKCBlbC50YWdOYW1lPT0nRElWJyAmJiBlbC5jbGFzc0xpc3QgJiYgIWVsLmNsYXNzTGlzdC5jb250YWlucygnaW5zZXJ0ZWQnKSApIHtcclxuXHRcdFx0XHRcdFx0Ly8gY29udmVydCB0ZXh0Y29udGVudCB0byB0ZXh0bm9kZVxyXG5cdFx0XHRcdFx0XHRjb25zdCB0ZXh0ID0gZWwudGV4dENvbnRlbnQ7XHJcblx0XHRcdFx0XHRcdGlmICggdGV4dC5sZW5ndGggKSB7XHJcblx0XHRcdFx0XHRcdFx0Y29uc3QgdG5vZGUgPSBkb2N1bWVudC5jcmVhdGVUZXh0Tm9kZSgnJyk7XHJcblx0XHRcdFx0XHRcdFx0dG5vZGUudGV4dENvbnRlbnQgPSB0ZXh0O1xyXG5cdFx0XHRcdFx0XHRcdHRoaXMuZGl2LnJlcGxhY2VDaGlsZCggdG5vZGUsIGVsICk7XHJcblx0XHRcdFx0XHRcdFx0dGhpcy5kaXYubm9ybWFsaXplKCk7XHJcblx0XHRcdFx0XHRcdH0gZWxzZSB7XHJcblx0XHRcdFx0XHRcdFx0ZWwucmVtb3ZlKCk7XHJcblx0XHRcdFx0XHRcdH1cclxuXHRcdFx0XHRcdH1cclxuXHRcdFx0XHR9XHJcblx0XHRcdFx0Ly8gZGVsZXRlIHNvbGVseSA8YnI+XHJcblx0XHRcdFx0aWYgKCB0aGlzLmRpdi5pbm5lckhUTUwudHJpbSgpID09PSAnPGJyPicgKSB7XHJcblx0XHRcdFx0XHR0aGlzLmRpdi5pbm5lckhUTUwgPSAnJztcclxuXHRcdFx0XHRcdHRoaXMuZGl2LnRleHRDb250ZW50ID0gXCJcXG5cIjtcclxuXHRcdFx0XHR9XHJcblx0XHRcdH1cclxuXHJcblx0XHRcdC8vIGhhbmRsZSBpbnB1dFJlZ2V4cFxyXG5cdFx0XHRpZiAoIHRoaXMuaW5wdXRSRSB8fCB0aGlzLm1heGxlbmd0aCApIHtcclxuLy8gY29uc29sZS5sb2codGhpcy5kaXYuaW5uZXJIVE1MKTtcclxuLy8gY29uc29sZS5sb2codGhpcy5kaXYuaW5uZXJIVE1MLm1hdGNoKCB0aGlzLmlucHV0UkUgKSk7XHJcblx0XHRcdFx0aWYgKCBcdCggdGhpcy5pbnB1dFJFICYmICF0aGlzLmRpdi5pbm5lckhUTUwubWF0Y2goIHRoaXMuaW5wdXRSRSApICkgfHxcclxuXHRcdFx0XHRcdFx0KCB0aGlzLm1heGxlbmd0aCAmJiB0aGlzLmRpdi5pbm5lckhUTUwubGVuZ3RoPnRoaXMubWF4bGVuZ3RoICkgKSB7XHJcblx0XHRcdFx0XHR0aGlzLnJlc3RvcmVWYWx1ZSgpO1xyXG5cdFx0XHRcdFx0aWYgKCB0aGlzLmJhc2UgKSB7XHJcblx0XHRcdFx0XHRcdHRoaXMuYmFzZS5wb3N0TG9nKCAnaW5wdXRSZXZlcnQnLCB7XHJcblx0XHRcdFx0XHRcdFx0dG9UZXh0OiB0aGlzLmRpdi5pbm5lckhUTUwsXHJcblx0XHRcdFx0XHRcdFx0ZXh0cmFjdDogdGhpcy5leHRyYWN0KCksXHJcblx0XHRcdFx0XHRcdH0gKTtcclxuXHRcdFx0XHRcdFx0dGhpcy5iYXNlLnRyaWdnZXJJbnB1dFZhbGlkYXRpb25FdmVudCgpO1xyXG5cdFx0XHRcdFx0fVxyXG5cdFx0XHRcdH0gZWxzZSB7XHJcblx0XHRcdFx0XHRzYXZlTmV3VmFsdWUgPSB0cnVlO1xyXG5cdFx0XHRcdH1cclxuXHRcdFx0fVxyXG5cdFx0fVxyXG5cclxuXHRcdGlmICggc2F2ZU5ld1ZhbHVlICkge1xyXG5cdFx0XHR0aGlzLnNhdmVWYWx1ZSgpO1xyXG5cdFx0fVxyXG5cdFx0aWYgKCBzYXZlTmV3VmFsdWUgfHwgIXRoaXMuaW5wdXRSRSB8fCB0aGlzLm11bHRpTGluZSApIHtcclxuXHRcdFx0dGhpcy5iYXNlLnBvc3RMb2coICduZXdWYWx1ZScsIHtcclxuXHRcdFx0XHRleHRyYWN0OiB0aGlzLmV4dHJhY3QoKSxcclxuXHRcdFx0fSk7XHJcblx0XHR9XHJcblx0XHRpZiAoIHRoaXMuYmFzZSApIHtcclxuXHRcdFx0dGhpcy5iYXNlLnNlbmRDaGFuZ2VTdGF0ZSggdGhpcyApO1xyXG5cdFx0fVxyXG5cdH1cclxuXHJcblx0Ly8gLy8gb24gdG91Y2hhYmxlczogbGFzdCBlbGVtZW50IHNob3VsZCBub3QgYmUgJy5pbnNlcnRlZCcgKGFwcGVuZCB0ZXh0bm9kZSB3aXRoICcgJylcclxuXHQvLyBldl90b3VjaGVuZCAoKSB7XHJcblxyXG5cdC8vIFx0Y29uc3Qgc2VsID0gd2luZG93LmdldFNlbGVjdGlvbigpO1xyXG5cdC8vIFx0Ly8gQ3Vyc29yIGF0IFwiZW5kXCIgb2YgdGV4dFxyXG5cdC8vIFx0aWYgKCBzZWwgJiYgc2VsLmlzQ29sbGFwc2VkICYmIHNlbC5mb2N1c05vZGU9PXRoaXMuZGl2ICkge1xyXG5cdC8vIFx0XHRjb25zdCBjaGlsZG4gPSB0aGlzLmRpdi5jaGlsZE5vZGVzO1xyXG5cdC8vIFx0XHQvLyBhbmQgbGFzdCBub2RlID09ICcuaW5zZXJ0ZWQnXHJcblx0Ly8gXHRcdGlmICggc2VsLmZvY3VzT2Zmc2V0PT1jaGlsZG4ubGVuZ3RoICYmIGNoaWxkbltjaGlsZG4ubGVuZ3RoLTFdLmNsYXNzTGlzdCAmJlxyXG5cdC8vIFx0XHRcdFx0Y2hpbGRuW2NoaWxkbi5sZW5ndGgtMV0uY2xhc3NMaXN0LmNvbnRhaW5zKCdpbnNlcnRlZCcpICkge1xyXG5cclxuXHQvLyBcdFx0XHRjb25zdCB0ZXh0ID0gZG9jdW1lbnQuY3JlYXRlVGV4dE5vZGUoJyAnKVxyXG5cdC8vIFx0XHRcdHRoaXMuZGl2LmFwcGVuZENoaWxkKCB0ZXh0ICk7XHJcblx0Ly8gXHRcdFx0Ly8gc2V0IGN1cnNvciB0byBzdGFydCBvZiB0ZXh0ICcgJ1x0ISEhISEgVE9ETyAhISEhIVxyXG5cdC8vIFx0XHRcdC8vIGlmICggc2VsLmdldFJhbmdlQXQgJiYgc2VsLnJhbmdlQ291bnQgKSB7XHJcblx0Ly8gXHRcdFx0Ly8gXHRjb25zdCByYW5nZSA9IHNlbC5nZXRSYW5nZUF0KDApLmNsb25lUmFuZ2UoKTtcclxuXHQvLyBcdFx0XHQvLyBjb25zdCByYW5nZSA9IGRvY3VtZW50LmNyZWF0ZVJhbmdlKCk7XHJcblx0Ly8gXHRcdFx0Ly8gcmFuZ2Uuc2V0U3RhcnQoIHRleHQsIDAgKTtcclxuXHQvLyBcdFx0XHQvLyByYW5nZS5jb2xsYXBzZSh0cnVlKTtcclxuXHQvLyBcdFx0XHQvLyBzZWwucmVtb3ZlQWxsUmFuZ2VzKCk7XHJcblx0Ly8gXHRcdFx0Ly8gc2VsLmFkZFJhbmdlKHJhbmdlKTtcclxuXHQvLyBcdFx0XHQvLyB9XHJcblx0Ly8gXHRcdH1cclxuXHQvLyBcdH1cclxuXHQvLyB9XHJcblxyXG5cdC8vIGNoZWNrTm9kZXMgKCkge1xyXG5cclxuXHQvLyBcdHRoaXMuZGl2Lm5vcm1hbGl6ZSgpO1xyXG5cclxuXHQvLyBcdC8vIGVuc3VyZSBsYXN0IGVsZW1lbnQgaXMgdGV4dG5vZGUgKGhvdGZpeCBmb3IgcG9zaXRpb25pbmcgY3Vyc29yIGFmdGVyIGxhc3QgLmZyYWMpXHJcblx0Ly8gXHQvLyBjb25zdCBub2RlcyA9IHRoaXMuZGl2LmNoaWxkTm9kZXM7XHJcblx0Ly8gXHQvLyBpZiAoICFub2Rlcy5sZW5ndGggfHwgbm9kZXNbbm9kZXMubGVuZ3RoLTFdLm5vZGVUeXBlIT1Ob2RlLlRFWFRfTk9ERSApIHtcclxuXHQvLyBcdC8vIFx0dGhpcy5kaXYuYXBwZW5kQ2hpbGQoIGRvY3VtZW50LmNyZWF0ZVRleHROb2RlKCcgJykgKTtcclxuXHQvLyBcdC8vIH1cclxuXHQvLyB9XHJcblxyXG5cdC8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vXHJcblxyXG5cdC8vIGh0dHBzOi8vc3RhY2tvdmVyZmxvdy5jb20vcXVlc3Rpb25zLzY2OTA3NTIvaW5zZXJ0LWh0bWwtYXQtY2FyZXQtaW4tYS1jb250ZW50ZWRpdGFibGUtZGl2XHJcblx0cGFzdGVIdG1sQXRDYXJldCAoIGh0bWwsIGluc2VydFNwYWNlcywgbG9nTmFtZSApIHtcclxuXHJcblx0XHRjb25zdCBzZWwgPSB3aW5kb3cuZ2V0U2VsZWN0aW9uKCk7XHJcblx0XHQvLyBvbmx5IGluc2VydCBpZiBzZWxlY3Rpb24gaXMgd2l0aGluIHRoaXMuZGl2XHJcblx0XHRpZiAoICFzZWwgfHwgIXNlbC5mb2N1c05vZGUgfHwgIXRoaXMuZGl2LmNvbnRhaW5zKCBzZWwuZm9jdXNOb2RlICkgKSB7XHJcblx0XHRcdHJldHVybiBmYWxzZTtcclxuXHRcdH1cclxuXHJcblx0XHRpZiAoc2VsLmdldFJhbmdlQXQgJiYgc2VsLnJhbmdlQ291bnQpIHtcclxuXHRcdFx0bGV0IHJhbmdlID0gc2VsLmdldFJhbmdlQXQoMCk7XHJcblx0XHRcdHJhbmdlLmRlbGV0ZUNvbnRlbnRzKCk7XHJcblxyXG5cdFx0XHQvLyBSYW5nZS5jcmVhdGVDb250ZXh0dWFsRnJhZ21lbnQoKSB3b3VsZCBiZSB1c2VmdWwgaGVyZSBidXQgaXNcclxuXHRcdFx0Ly8gb25seSByZWxhdGl2ZWx5IHJlY2VudGx5IHN0YW5kYXJkaXplZCBhbmQgaXMgbm90IHN1cHBvcnRlZCBpblxyXG5cdFx0XHQvLyBzb21lIGJyb3dzZXJzIChJRTksIGZvciBvbmUpXHJcblx0XHRcdGxldCBpbnM7XHJcblx0XHRcdGlmICggaW5zZXJ0U3BhY2VzICkge1xyXG5cdFx0XHRcdGNvbnN0IHByZVNwYWNlID0gKCAhc2VsLmZvY3VzT2Zmc2V0IHx8IHNlbC5mb2N1c05vZGUudGV4dENvbnRlbnRbIHNlbC5mb2N1c09mZnNldC0xIF0hPScgJyApID8gJyAnIDogJyc7XHJcblx0XHRcdFx0aW5zID0gYCR7cHJlU3BhY2V9JHtodG1sfSBgO1xyXG5cdFx0XHR9IGVsc2Uge1xyXG5cdFx0XHRcdGlucyA9IGh0bWw7XHJcblx0XHRcdH1cclxuXHRcdFx0Y29uc3QgZWwgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KFwiZGl2XCIpO1xyXG5cdFx0XHRlbC5pbm5lckhUTUwgPSBpbnM7XHJcblxyXG5cdFx0XHR2YXIgZnJhZyA9IGRvY3VtZW50LmNyZWF0ZURvY3VtZW50RnJhZ21lbnQoKSwgbm9kZSwgbGFzdE5vZGU7XHJcblx0XHRcdHdoaWxlICggKG5vZGUgPSBlbC5maXJzdENoaWxkKSApIHtcclxuXHRcdFx0XHRpZiAoIG5vZGUuY2xhc3NMaXN0ICkge1xyXG5cdFx0XHRcdFx0bm9kZS5jbGFzc0xpc3QuYWRkKCdpbnNlcnRlZCcpO1xyXG5cdFx0XHRcdH1cclxuXHRcdFx0XHRsYXN0Tm9kZSA9IGZyYWcuYXBwZW5kQ2hpbGQobm9kZSk7XHJcblx0XHRcdH1cclxuXHRcdFx0Y29uc3Qgc3RhcnRDdXJQb3MgPSBmcmFnLnF1ZXJ5U2VsZWN0b3IoJy5zdGFydEN1cnNvclBvcycpO1xyXG5cdFx0XHRyYW5nZS5pbnNlcnROb2RlKGZyYWcpO1xyXG5cclxuXHRcdFx0Ly8gUHJlc2VydmUgdGhlIHNlbGVjdGlvblxyXG5cdFx0XHRpZiAobGFzdE5vZGUpIHtcclxuXHRcdFx0XHRyYW5nZSA9IHJhbmdlLmNsb25lUmFuZ2UoKTtcclxuXHRcdFx0XHRzdGFydEN1clBvcyA/IHJhbmdlLnNldFN0YXJ0KCBzdGFydEN1clBvcywgMCApIDogcmFuZ2Uuc2V0U3RhcnRBZnRlcihsYXN0Tm9kZSk7XHJcblx0XHRcdFx0cmFuZ2UuY29sbGFwc2UodHJ1ZSk7XHJcblx0XHRcdFx0c2VsLnJlbW92ZUFsbFJhbmdlcygpO1xyXG5cdFx0XHRcdHNlbC5hZGRSYW5nZShyYW5nZSk7XHJcblx0XHRcdH1cclxuXHJcblx0XHRcdHRoaXMubm9ybWFsaXplKCk7XHJcblxyXG5cdFx0XHQvLyBsb2cgYnV0dG9uXHJcblx0XHRcdGlmICggbG9nTmFtZSAmJiB0aGlzLmJhc2UgKSB7XHJcblx0XHRcdFx0Y29uc3QgZGF0YSA9IHtcclxuXHRcdFx0XHRcdHRleHQ6IGlucyxcclxuXHRcdFx0XHRcdG5hbWU6IGxvZ05hbWUsXHJcblx0XHRcdFx0XHRleHRyYWN0OiB0aGlzLmV4dHJhY3QoKSxcclxuXHRcdFx0XHR9O1xyXG5cdFx0XHRcdHRoaXMuYmFzZS5wb3N0TG9nKCAnaW5zZXJ0QnV0dG9uUHJlc3NlZCcsIE9iamVjdC5hc3NpZ24oIGRhdGEsIHRoaXMuZ2V0VGV4dFBvcygpICkgKTtcclxuXHRcdFx0fVxyXG5cdFx0fVxyXG5cclxuXHRcdHJldHVybiB0cnVlO1xyXG5cdH1cclxuXHJcblx0ZGVsSWZEaXYgKCBvZmZzLCBldmVudCApIHtcclxuXHJcblx0XHRjb25zdCBzZWwgPSB3aW5kb3cuZ2V0U2VsZWN0aW9uKCk7XHJcblx0XHRpZiAoIHNlbCAmJiBzZWwuaXNDb2xsYXBzZWQgKSB7XHJcblx0XHRcdGNvbnN0IGZvY3VzID0gc2VsLmZvY3VzTm9kZTtcclxuLy8gY29uc29sZS5sb2coc2VsLG9mZnMsZm9jdXM9PXRoaXMuZGl2LHRoaXMuZGl2LmNoaWxkTm9kZXMubGVuZ3RoLHRoaXMuZGl2LmNoaWxkTm9kZXMpO1xyXG5cdFx0XHQvLyBkZWxldGUgcHJldmlvdXMvbmV4dCBub2RlP1xyXG5cdFx0XHRpZiAoIGZvY3VzICYmXHJcblx0XHRcdFx0XHQoIG9mZnM+MCAmJiBzZWwuZm9jdXNPZmZzZXQ9PWZvY3VzLnRleHRDb250ZW50Lmxlbmd0aCB8fFxyXG5cdFx0XHRcdFx0b2ZmczwwICYmICggIXNlbC5mb2N1c09mZnNldCB8fFx0Ly8gQmVnaW5uaW5nIG9mIGEgVGV4dCBvclxyXG5cdFx0XHRcdFx0XHRcdFx0Zm9jdXM9PXRoaXMuZGl2ICYmIHNlbC5mb2N1c09mZnNldDw9dGhpcy5kaXYuY2hpbGROb2Rlcy5sZW5ndGggKSApICkgeyAvLyBub2RlLWxldmVsLCBmb2N1c09mZnNldCBpcyBub2RlLWluZGV4XHJcblxyXG5cdFx0XHRcdGNvbnN0IHRvRGVsZXRlID0gKCBmb2N1cz09dGhpcy5kaXYgP1xyXG5cdFx0XHRcdFx0XHRcdFx0XHR0aGlzLmRpdi5jaGlsZE5vZGVzWyBzZWwuZm9jdXNPZmZzZXQtMSBdIDpcclxuXHRcdFx0XHRcdFx0XHRcdFx0KCBvZmZzPDAgPyBmb2N1cy5wcmV2aW91c1NpYmxpbmcgOiBmb2N1cy5uZXh0U2libGluZyApICk7XHJcbi8vIGNvbnNvbGUubG9nKHRvRGVsZXRlKVxyXG5cdFx0XHRcdC8vIGNoZWNrIGlmIG5vZGUgaXMgZGl2Lmluc2VydGVkXHJcblx0XHRcdFx0aWYgKCB0b0RlbGV0ZSAmJiB0b0RlbGV0ZS50YWdOYW1lPT0nRElWJyAmJiB0b0RlbGV0ZS5jbGFzc0xpc3QuY29udGFpbnMoJ2luc2VydGVkJykgKSB7XHJcblx0XHRcdFx0XHQvLyBzZXQgY3Vyc29yIGJlZm9yZSBlbGVtZW50IChmaXggZm9yIHNhZmFyaSlcclxuXHRcdFx0XHRcdGNvbnN0IHJhbmdlID0gc2VsLmdldFJhbmdlQXQoMCk7XHJcblx0XHRcdFx0XHRpZiAoIHJhbmdlICkge1xyXG5cdFx0XHRcdFx0XHRpZiAoIHRvRGVsZXRlLnByZXZpb3VzU2libGluZyApIHtcclxuXHRcdFx0XHRcdFx0XHRyYW5nZS5zZXRTdGFydEFmdGVyKCB0b0RlbGV0ZS5wcmV2aW91c1NpYmxpbmcgKTtcclxuXHRcdFx0XHRcdFx0fSBlbHNlIGlmICggdG9EZWxldGUubmV4dFNpYmxpbmcgKSB7XHJcblx0XHRcdFx0XHRcdFx0cmFuZ2Uuc2V0U3RhcnQoIHRvRGVsZXRlLm5leHRTaWJsaW5nLCAwICk7XHJcblx0XHRcdFx0XHRcdH1cclxuXHRcdFx0XHRcdFx0cmFuZ2UuY29sbGFwc2UodHJ1ZSk7XHJcblx0XHRcdFx0XHRcdHNlbC5yZW1vdmVBbGxSYW5nZXMoKTtcclxuXHRcdFx0XHRcdFx0c2VsLmFkZFJhbmdlKHJhbmdlKTtcclxuXHRcdFx0XHRcdH1cclxuXHRcdFx0XHRcdC8vIGRlbGV0ZSBub2RlXHJcblx0XHRcdFx0XHR0b0RlbGV0ZS5yZW1vdmUoKTtcclxuXHRcdFx0XHRcdHRoaXMuZGl2Lm5vcm1hbGl6ZSgpO1xyXG5cclxuXHRcdFx0XHRcdGV2ZW50LnByZXZlbnREZWZhdWx0KCk7XHJcblx0XHRcdFx0XHRldmVudC5zdG9wUHJvcGFnYXRpb24oKTtcclxuXHRcdFx0XHRcdHJldHVybiB0cnVlO1xyXG5cdFx0XHRcdH1cclxuXHRcdFx0fVxyXG5cdFx0fVxyXG5cclxuXHRcdHJldHVybiBmYWxzZTtcclxuXHR9XHJcblxyXG5cdC8vIGlzIGN1cnNvciB3aXRoaW4gLmlucHV0ZmllbGQ/IHRhYiB0byBuZXh0U2libGluZ1xyXG5cdHRhYlRvTmV4dElucHV0RmllbGQgKGV2ZW50KSB7XHJcblxyXG5cdFx0Y29uc3Qgc2VsID0gd2luZG93LmdldFNlbGVjdGlvbigpO1xyXG5cdFx0aWYgKCBzZWwgJiYgc2VsLmlzQ29sbGFwc2VkICYmIHNlbC5mb2N1c05vZGUgJiYgc2VsLmdldFJhbmdlQXQgJiYgc2VsLnJhbmdlQ291bnQgKSB7XHJcblxyXG5cdFx0XHQvLyBpbiAuaW5wdXRmaWVsZD9cclxuXHRcdFx0bGV0IG5vZGU7XHJcblx0XHRcdGZvciAoIG5vZGU9c2VsLmZvY3VzTm9kZTsgbm9kZSAmJiAhbm9kZS5jbGFzc0xpc3Q7ICkge1xyXG5cdFx0XHRcdG5vZGUgPSBub2RlLnBhcmVudE5vZGU7XHJcblx0XHRcdH1cclxuXHRcdFx0aWYgKCBub2RlICYmIG5vZGUuY2xhc3NMaXN0LmNvbnRhaW5zKCdpbnB1dEZpZWxkJykgKSB7XHJcblxyXG5cdFx0XHRcdC8vIHNlYXJjaCBuZXh0IGF2YWlsYWJsZSBzaWJsaW5nXHJcblx0XHRcdFx0d2hpbGUgKCBub2RlICYmICFub2RlLm5leHRTaWJsaW5nICYmIG5vZGUhPXRoaXMuZGl2ICkge1xyXG5cdFx0XHRcdFx0bm9kZSA9IG5vZGUucGFyZW50Tm9kZTtcclxuXHRcdFx0XHR9XHJcblx0XHRcdFx0aWYgKCBub2RlICYmIG5vZGUhPXRoaXMuZGl2ICkge1xyXG5cdFx0XHRcdFx0bm9kZSA9IG5vZGUubmV4dFNpYmxpbmc7XHJcblxyXG5cdFx0XHRcdFx0Ly8gc2V0IGN1cnNvclxyXG5cdFx0XHRcdFx0dGhpcy5zZXRDdXJQb3MoIG5vZGUsIG5vZGUubm9kZVR5cGU9PU5vZGUuVEVYVF9OT0RFICYmIG5vZGUudGV4dENvbnRlbnQuc3RhcnRzV2l0aCgnICcpID8gMSA6IDAgKTtcclxuXHJcblx0XHRcdFx0XHRldmVudC5wcmV2ZW50RGVmYXVsdCgpO1xyXG5cdFx0XHRcdFx0ZXZlbnQuc3RvcFByb3BhZ2F0aW9uKCk7XHJcblx0XHRcdFx0XHRyZXR1cm4gdHJ1ZTtcclxuXHRcdFx0XHR9XHJcblx0XHRcdH1cclxuXHRcdH1cclxuXHJcblx0XHRyZXR1cm4gZmFsc2U7XHJcblx0fVxyXG5cclxuXHQvLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vL1xyXG5cclxuXHRzYXZlVmFsdWUgKCkge1xyXG5cdFx0dGhpcy5vbGRWYWx1ZSA9IHRoaXMuZGl2LmlubmVySFRNTDtcclxuXHRcdC8vIHNhdmUgY3Vyc29yIHBvc2l0aW9uXHJcblx0XHRjb25zdCBzZWwgPSB3aW5kb3cuZ2V0U2VsZWN0aW9uKCk7XHJcblx0XHRpZiAoIHNlbCAmJiBzZWwuZm9jdXNOb2RlICkge1xyXG5cdFx0XHRjb25zdCBub2RlcyA9IEFycmF5LmZyb20oIHRoaXMuZGl2LmNoaWxkTm9kZXMgKTtcclxuXHRcdFx0dGhpcy5vbGRGb2N1c0VsZW1JbmRleCA9IG5vZGVzLmZpbmRJbmRleCggaSA9PiBpPT09c2VsLmZvY3VzTm9kZSApO1xyXG5cdFx0XHR0aGlzLm9sZEZvY3VzT2Zmc2V0ID0gc2VsLmZvY3VzT2Zmc2V0O1xyXG5cdFx0fSBlbHNlIHtcclxuXHRcdFx0dGhpcy5vbGRGb2N1c0VsZW1JbmRleCA9IG51bGw7XHJcblx0XHR9XHJcblx0fVxyXG5cclxuXHRyZXN0b3JlVmFsdWUgKCkge1xyXG5cdFx0aWYgKCB0aGlzLm9sZFZhbHVlIT09bnVsbCApIHtcclxuXHRcdFx0dGhpcy5kaXYuaW5uZXJIVE1MID0gdGhpcy5vbGRWYWx1ZTtcclxuXHRcdFx0Ly8gcmVzdG9yZSBvbGQgY3Vyc29yIHBvc2l0aW9uXHJcblx0XHRcdGNvbnN0IHNlbCA9IHdpbmRvdy5nZXRTZWxlY3Rpb24oKTtcclxuXHRcdFx0aWYgKCBzZWwgKSB7XHJcblx0XHRcdFx0c2VsLnJlbW92ZUFsbFJhbmdlcygpO1xyXG5cdFx0XHRcdGlmICggdGhpcy5vbGRGb2N1c0VsZW1JbmRleCE9PW51bGwgJiYgdGhpcy5vbGRGb2N1c0VsZW1JbmRleD4tMSApIHtcclxuXHRcdFx0XHRcdHRoaXMuc2V0Q3VyUG9zKCB0aGlzLmRpdi5jaGlsZE5vZGVzWyB0aGlzLm9sZEZvY3VzRWxlbUluZGV4IF0sIHRoaXMub2xkRm9jdXNPZmZzZXQgKTtcclxuXHRcdFx0XHR9XHJcblx0XHRcdH1cclxuXHRcdH1cclxuXHR9XHJcblxyXG5cdHNldEN1clBvcyAoIG5vZGUsIG9mZnNldCApIHtcclxuXHRcdGNvbnN0IHNlbCA9IHdpbmRvdy5nZXRTZWxlY3Rpb24oKTtcclxuXHRcdGlmICggc2VsICkge1xyXG5cdFx0XHRjb25zdCByYW5nZSA9IGRvY3VtZW50LmNyZWF0ZVJhbmdlKCk7XHJcblx0XHRcdHJhbmdlLnNldFN0YXJ0KCBub2RlLCBvZmZzZXQgKTtcclxuXHRcdFx0cmFuZ2UuY29sbGFwc2UoIHRydWUgKTtcclxuXHJcblx0XHRcdHNlbC5yZW1vdmVBbGxSYW5nZXMoKTtcclxuXHRcdFx0c2VsLmFkZFJhbmdlKHJhbmdlKTtcclxuXHRcdH1cclxuXHR9XHJcblxyXG5cdC8vIGNhbGwgdGhpcy5kaXYubm9ybWFsaXplKCkgYW5kIHRyeSB0byBzYXZlL3Jlc3RvcmUgY3Vyc29yIHBvc2l0aW9uXHJcblx0bm9ybWFsaXplICgpIHtcclxuXHJcblx0XHQvLyB0cnkgdG8gc2F2ZSBjdXJzb3IgcG9zaXRpb24gaW4gdGV4dG5vZGUocylcclxuXHRcdGxldCBjdXJQb3MgPSBudWxsLCBwcmV2RWxtZW50LCBwYXJlbnRFbG1lbnQ7XHJcblx0XHRjb25zdCBzZWwgPSB3aW5kb3cuZ2V0U2VsZWN0aW9uKCk7XHJcblx0XHRpZiAoIHNlbCAmJiBzZWwucmFuZ2VDb3VudD09MSApIHtcclxuXHRcdFx0bGV0IGZvY3VzID0gc2VsLmZvY3VzTm9kZTtcclxuXHRcdFx0bGV0IGZvY3VzT2Zmc2V0ID0gc2VsLmZvY3VzT2Zmc2V0O1xyXG5cdFx0XHRpZiAoIGZvY3VzICkge1xyXG5cdFx0XHRcdGlmICggZm9jdXMubm9kZVR5cGU9PU5vZGUuRUxFTUVOVF9OT0RFICYmIGZvY3VzT2Zmc2V0PjAgKSB7XHJcblx0XHRcdFx0XHQvLyBJZiBmb2N1c05vZGUgaXMgYW4gZWxlbWVudCwgZm9jdXNPZmZzZXQgaXMgdGhlIG51bWJlciBvZiBjaGlsZCBub2RlcyBvZiB0aGVcclxuXHRcdFx0XHRcdC8vIGZvY3VzTm9kZSBwcmVjZWRpbmcgdGhlIGZvY3VzXHJcblx0XHRcdFx0XHRmb2N1cyA9IGZvY3VzLmNoaWxkTm9kZXNbIGZvY3VzT2Zmc2V0IF07XHJcblx0XHRcdFx0XHRmb2N1c09mZnNldCA9IDA7XHJcblx0XHRcdFx0fVxyXG5cdFx0XHRcdGlmICggZm9jdXMubm9kZVR5cGU9PU5vZGUuVEVYVF9OT0RFICYmXHJcblx0XHRcdFx0XHRcdCggKCBmb2N1cy5wcmV2aW91c1NpYmxpbmcgJiYgZm9jdXMucHJldmlvdXNTaWJsaW5nLm5vZGVUeXBlPT1Ob2RlLlRFWFRfTk9ERSApIHx8XHJcblx0XHRcdFx0XHRcdFx0KCBmb2N1cy5uZXh0U2libGluZyAmJiBmb2N1cy5uZXh0U2libGluZy5ub2RlVHlwZT09Tm9kZS5URVhUX05PREUgKSApICkge1xyXG5cdFx0XHRcdFx0Ly8gY3Vyc29yIGlzIHBhcnQgb2Ygc2V2ZXJhbCBjb25zZWN1dGl2ZSB0ZXh0IGVsZW1lbnRzIHRoYXQgYXJlIGNvbWJpbmVkIGJ5IG5vbWFsaXplKClcclxuXHRcdFx0XHRcdC8vIC0+IHNhdmUgcG9zaXRpb24gaW4gdGV4dCAmIHByZXZpb3VzU2libGluZy9wYXJlbnRFbGVtZW50XHJcblxyXG5cdFx0XHRcdFx0Y3VyUG9zID0gZm9jdXNPZmZzZXQ7XHJcblx0XHRcdFx0XHRwYXJlbnRFbG1lbnQgPSBmb2N1cy5wYXJlbnRFbGVtZW50O1xyXG5cclxuXHRcdFx0XHRcdC8vIEFkZCBsZW5ndGggb2YgYWxsIHByZXZpb3VzIHRleHQgZWxlbWVudHMgdG8gcG9zaXRpb25cclxuXHRcdFx0XHRcdHdoaWxlICggZm9jdXMucHJldmlvdXNTaWJsaW5nICYmIGZvY3VzLnByZXZpb3VzU2libGluZy5ub2RlVHlwZT09Tm9kZS5URVhUX05PREUgKSB7XHJcblx0XHRcdFx0XHRcdGZvY3VzID0gZm9jdXMucHJldmlvdXNTaWJsaW5nO1xyXG5cdFx0XHRcdFx0XHRjdXJQb3MgKz0gZm9jdXMudGV4dENvbnRlbnQubGVuZ3RoO1xyXG5cdFx0XHRcdFx0fVxyXG5cdFx0XHRcdFx0cHJldkVsbWVudCA9IGZvY3VzLnByZXZpb3VzU2libGluZztcclxuXHRcdFx0XHR9XHJcblx0XHRcdH1cclxuXHRcdH1cclxuXHJcblx0XHR0aGlzLmRpdi5ub3JtYWxpemUoKTtcclxuXHJcblx0XHQvLyByZXN0b3JlIHBvc2l0aW9uIGluIChjb25jYXRlbmF0ZWQpIHRleHRcclxuXHRcdGlmICggY3VyUG9zIT09bnVsbCApIHtcclxuXHRcdFx0Y29uc3QgbmV3RWxlbSA9IHByZXZFbG1lbnQgPyBwcmV2RWxtZW50Lm5leHRTaWJsaW5nIDogcGFyZW50RWxtZW50LmZpcnN0Q2hpbGQ7XHJcblx0XHRcdGNvbnN0IG5ld1JhbmdlID0gZG9jdW1lbnQuY3JlYXRlUmFuZ2UoKTtcclxuXHRcdFx0bmV3UmFuZ2Uuc2V0U3RhcnQoIG5ld0VsZW0sIGN1clBvcyApO1xyXG5cdFx0XHRuZXdSYW5nZS5jb2xsYXBzZSggdHJ1ZSApO1xyXG5cdFx0XHRzZWwucmVtb3ZlQWxsUmFuZ2VzKCk7XHJcblx0XHRcdHNlbC5hZGRSYW5nZShuZXdSYW5nZSk7XHJcblx0XHR9XHJcblx0fVxyXG5cclxuXHQvLyBHZXQgUG9zaXRpb24gKGluIHRoaXMuZGl2LnRleHRDb250ZW50KSBhbmQgc3BlY2lhbCBjbGFzc2VzIHNldCBpbiBmb2N1c25vZGVcclxuXHRnZXRUZXh0UG9zIChzZWw9bnVsbCkge1xyXG5cdFx0aWYgKCBzZWw9PT1udWxsICkge1xyXG5cdFx0XHRzZWwgPSB3aW5kb3cuZ2V0U2VsZWN0aW9uKCk7XHJcblx0XHR9XHJcblx0XHRpZiAoIHNlbCAmJiBzZWwuZm9jdXNOb2RlICkge1xyXG5cdFx0XHRsZXQgcG9zID0gc2VsLmZvY3VzT2Zmc2V0O1xyXG5cdFx0XHRsZXQgbm9kZSA9IHNlbC5mb2N1c05vZGU7XHJcblx0XHRcdC8vIGFkZCBsZW5ndGhzIG9mIHRleHRDb250ZW50cyBvZiBhbGwgcGV2aW91cyBFbGVtZW50c1xyXG5cdFx0XHR3aGlsZSAoICggbm9kZSA9IG5vZGUucHJldmlvdXNTaWJsaW5nIHx8IG5vZGUucGFyZW50Tm9kZSApICYmIG5vZGUgIT0gdGhpcy5kaXYgJiYgbm9kZSApIHtcclxuXHRcdFx0XHRpZiAoIG5vZGUudGV4dENvbnRlbnQgKSB7XHJcblx0XHRcdFx0XHRwb3MgKz0gbm9kZS50ZXh0Q29udGVudC5sZW5ndGg7XHJcblx0XHRcdFx0fVxyXG5cdFx0XHR9XHJcblx0XHRcdGNvbnN0IGRhdGEgPSB7IHRleHRQb3M6IHBvcywgfTtcclxuXHRcdFx0Ly8gY2hlY2sgZm9yIGZyYWMgY2xhc3Nlc1xyXG5cdFx0XHRub2RlID0gc2VsLmZvY3VzTm9kZTtcclxuXHRcdFx0d2hpbGUgKCBub2RlICYmIG5vZGUgIT0gdGhpcy5kaXYgJiYgIW5vZGUuY2xhc3NMaXN0ICkge1xyXG5cdFx0XHRcdG5vZGUgPSBub2RlLnBhcmVudE5vZGU7XHJcblx0XHRcdH1cclxuXHRcdFx0aWYgKCBub2RlLmNsYXNzTGlzdCAmJiBub2RlLmNsYXNzTGlzdC5jb250YWlucygnZnJhYycpICkge1xyXG5cdFx0XHRcdGlmICggbm9kZS5jbGFzc0xpc3QuY29udGFpbnMoJ3RvcCcpICkgZGF0YS5jbGFzcz1cImZyYWMgdG9wXCI7XHJcblx0XHRcdFx0aWYgKCBub2RlLmNsYXNzTGlzdC5jb250YWlucygnYm90dG9tJykgKSBkYXRhLmNsYXNzPVwiZnJhYyBib3R0b21cIjtcclxuXHRcdFx0fTtcclxuXHRcdFx0cmV0dXJuIGRhdGE7XHJcblx0XHR9XHJcblxyXG5cdFx0cmV0dXJuIHt9O1xyXG5cdH1cclxuXHJcblx0ZXh0cmFjdCAoKSB7XHJcblx0XHRsZXQgcyA9IHRoaXMuZGl2LmlubmVySFRNTDtcclxuXHJcblx0XHR0aGlzLmV4dHJhY3RSZXBsYWNlcy5mb3JFYWNoKCByID0+IHtcclxuXHRcdFx0cyA9IHMucmVwbGFjZUFsbCggci5mcm9tLCByLnRvICk7XHJcblx0XHR9KVxyXG5cclxuXHRcdHJldHVybiBzLnRyaW0oKTtcclxuXHR9XHJcblxyXG5cdC8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vXHJcblxyXG5cdGdldFN0YXRlICgpIHtcclxuXHRcdHJldHVybiBKU09OLnN0cmluZ2lmeSggdGhpcy5kaXYuaW5uZXJIVE1MICk7XHJcblx0fVxyXG5cclxuXHRzZXRTdGF0ZSAoc3RhdGUpIHtcclxuXHJcblx0XHR0cnkge1xyXG5cclxuXHRcdFx0dGhpcy5kaXYuaW5uZXJIVE1MID0gSlNPTi5wYXJzZSggc3RhdGUgKTtcclxuXHJcblx0XHR9IGNhdGNoIChlKSB7XHJcblx0XHRcdGNvbnNvbGUuZXJyb3IoZSk7XHJcblx0XHR9XHJcblxyXG5cdFx0c2V0U3RhdGVQb3N0UHJvYyh0aGlzKTtcclxuXHR9XHJcblxyXG5cdHNjb3JlRGVmICgpIHtcclxuXHRcdHJldHVybiB0aGlzLnNjb3JlVmFyaWFibGVOYW1lIHx8IHRoaXMuRlNNVmFyaWFibGVOYW1lID9cclxuXHRcdFx0e1xyXG5cdFx0XHRcdFsgdGhpcy5zY29yZVZhcmlhYmxlTmFtZSB8fCBgVl9JbnB1dF8ke3RoaXMuRlNNVmFyaWFibGVOYW1lfWAgXTogdGhpcy5leHRyYWN0KCksXHJcblx0XHRcdH0gOlxyXG5cdFx0XHR7fTtcclxuXHR9XHJcbn1cclxuXHJcbi8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vL1xyXG5cclxuZXhwb3J0IGNsYXNzIHRleHRhcmVhSW5zZXJ0cyBleHRlbmRzIHRleHRhcmVhQmFzZSB7XHJcblxyXG5cdGNvbnN0cnVjdG9yICggZGl2U2VsZWN0b3IsIG9wdHMgPSB7fSwgYmFzZSA9IG51bGwgKSB7XHJcblxyXG5cdFx0aWYgKCBiYXNlLmZzbSAmJiBiYXNlLmZzbS5pbmNJbml0Q250ICkge1xyXG5cdFx0XHRiYXNlLmZzbS5pbmNJbml0Q250KCk7XHJcblx0XHR9XHJcblxyXG5cdFx0Y29uc3QgaW5zZXJ0c0RlZmF1bHRzID0ge1xyXG5cclxuXHRcdFx0Ly8gdG9vbGJhclgsIHRvb2xiYXJZICAgLy8gcG9zaXRpb24gcmVsYXRpdmUgdG8gZGl2ICh0b3AsbGVmdClcclxuXHRcdFx0dG9vbGJhcjogW1xyXG5cdFx0XHRcdC8vIHsgZGlzcGxheTogKGh0bWwpLCAoaW5zZXJ0OiAoaHRtbCksKVxyXG5cdFx0XHRcdC8vIFx0XHQodG9vbHRpcDogJycsKSAsXHQvLyBzaG93ZWQgdG9vbHRpcFxyXG5cdFx0XHRcdC8vIFx0XHQoZG9udEluc2VydFJlY3Vyc2l2ZTogdHJ1ZXxmYWxzZSksXHQvLyBjYW4gZWxlbWVudCBiZSBpbnNlcnRlZCBpbnNpZGUgb3RoZXIgZWxlbWVudHM/XHJcblx0XHRcdFx0Ly9cdFx0KG5vRXh0cmFTcGFjZXM6IHRydWV8ZmFsc2UpLFx0Ly8gZG9udCBpbnNlcnQgc3BhY2VzIGJlZm9yZSBhbmQgYWZ0ZXIgZWxlbWVudFxyXG5cdFx0XHRcdC8vXHRcdChleHRyYWN0UmVwbGFjZTogeyBmcm9tOiAvcmVnZXhwLywgdG86IFwidGV4dFwiIH0gKSxcdC8vIFJlcGxhY2UgZG9uZSBieSBleHRyYWN0KClcclxuXHRcdFx0XHQvLyB9XHJcblx0XHRcdF0sXHJcblx0XHRcdHRvb2xiYXJEaXJlY3Rpb246ICdjb2x1bW4nLFxyXG5cdFx0XHQvLyB0b29sYmFySGlkZTogdHJ1ZSxcdC8vIHRvb2xiYXIgaGlkZGVuIHdoZW4gbm8gZm9jdXNcclxuXHJcblx0XHRcdHRvb2xiYXJDb250YWluZXJTdHlsZXM6IHtcclxuXHRcdFx0XHQvLyBsZWZ0OiAnMzAwcHgnLCBcdC8vIHBvc2l0aW9uIHJlbGF0aXZlIHRvIG91dGVyRGl2LCBkZWZhdWx0cyB0byB3aWR0aCBvZiBkaXZTdHlsZVxyXG5cdFx0XHRcdC8vIHRvcDogJzIwMHB4JyxcclxuXHRcdFx0fSxcclxuXHRcdFx0dG9vbGJhckNlbGxTdHlsZXM6IHtcclxuXHRcdFx0fSxcclxuXHRcdFx0dG9vbGJhckNlbGxTcGFuU3R5bGVzOiB7XHQvLyBzcGFucyB3aXRoaW4gdG9vbGJhci1jZWxscyAoZm9yIHZlcnRpY2FsIGNlbnRlcmluZylcclxuXHRcdFx0fSxcclxuXHJcblx0XHR9XHJcblx0XHRtZXJnZURlZXAoIGluc2VydHNEZWZhdWx0cywgb3B0cyApO1xyXG5cdFx0c3VwZXIoIGRpdlNlbGVjdG9yLCBpbnNlcnRzRGVmYXVsdHMsIGJhc2UgKTtcclxuXHJcblx0XHQvLyBjcmVhdGUgdG9vbGJhciBjb250YWluZXJcclxuXHRcdHRoaXMudG9vbGJhckNvbnRhaW5lciA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ0RJVicpO1xyXG5cdFx0dGhpcy50b29sYmFyQ29udGFpbmVyLmNsYXNzTGlzdC5hZGQoICd0b29sYmFyJywgYHRpJHt0aGlzLnRvb2xiYXJEaXJlY3Rpb259YCwgJ2Rpc2FibGVkJyApO1xyXG5cdFx0aWYgKCAhdGhpcy50b29sYmFyQ29udGFpbmVyU3R5bGVzLmxlZnQgKSB7XHJcblx0XHRcdHRoaXMudG9vbGJhckNvbnRhaW5lclN0eWxlcy5sZWZ0ID0gdGhpcy5kaXZTdHlsZXMud2lkdGhcclxuXHRcdH1cclxuXHRcdGlmICggIXRoaXMudG9vbGJhckNvbnRhaW5lclN0eWxlcy50b3AgKSB7XHJcblx0XHRcdHRoaXMudG9vbGJhckNvbnRhaW5lclN0eWxlcy50b3AgPSBcIjBweFwiO1xyXG5cdFx0fVxyXG5cdFx0dGhpcy5zZXRTdHlsZXMoIHRoaXMudG9vbGJhckNvbnRhaW5lciwgdGhpcy50b29sYmFyQ29udGFpbmVyU3R5bGVzICk7XHJcblx0XHQvLyB0aGlzLnRvb2xiYXJDb250YWluZXIuc2V0QXR0cmlidXRlKCAnY29udGVudGVkaXRhYmxlJywgJ2ZhbHNlJyApO1xyXG5cclxuXHRcdC8vIGNyZWF0ZSB0b29sYmFyQ2VsbHNcclxuXHRcdHRoaXMudG9vbGJhci5mb3JFYWNoKCAoIHRiLCBuciApID0+IHtcclxuXHRcdFx0Ly8gRkxPV2luZyBkaXZcclxuXHRcdFx0Y29uc3QgdG9vbGJhckNlbGwgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdESVYnKTtcclxuXHRcdFx0dGhpcy5zZXRTdHlsZXMoIHRvb2xiYXJDZWxsLCB0aGlzLnRvb2xiYXJDZWxsU3R5bGVzICk7XHJcblx0XHRcdFsgJ21vdXNlZG93bicsICd0b3VjaHN0YXJ0JyBdLmZvckVhY2goIGV2ID0+XHJcblx0XHRcdFx0dG9vbGJhckNlbGwuYWRkRXZlbnRMaXN0ZW5lciggZXYsIGZ1bmN0aW9uIChldmVudCkge1xyXG5cdFx0XHRcdFx0aWYgKCBkb2N1bWVudC5hY3RpdmVFbGVtZW50ICYmICF0aGlzLnRvb2xiYXJDb250YWluZXIuY2xhc3NMaXN0LmNvbnRhaW5zKCdkaXNhYmxlZCcpICYmIHRoaXMuZGl2LmNvbnRhaW5zKCBkb2N1bWVudC5hY3RpdmVFbGVtZW50ICkgKSB7XHJcblx0XHRcdFx0XHRcdHRoaXMuaW5zZXJ0KCBuciwgZXZlbnQgKTtcclxuXHRcdFx0XHRcdH1cclxuXHRcdFx0XHR9LmJpbmQodGhpcykgKSApO1xyXG5cdFx0XHQvLyAgdG9vbGJhckNlbGwuc2V0QXR0cmlidXRlKCAnY29udGVudGVkaXRhYmxlJywgJ2ZhbHNlJyApO1xyXG5cclxuXHRcdFx0Ly8gc3BhbiBpbiBkaXYgZm9yIHZlcnRpY2FsIGFsaWduaW5nXHJcblx0XHRcdGNvbnN0IGlubmVyU3BhbiA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ1NQQU4nKTtcclxuXHRcdFx0dGhpcy5zZXRTdHlsZXMoIGlubmVyU3BhbiwgdGhpcy50b29sYmFyQ2VsbFNwYW5TdHlsZXMgKTtcclxuXHRcdFx0dG9vbGJhckNlbGwuYXBwZW5kQ2hpbGQoIGlubmVyU3BhbiApO1xyXG5cclxuXHRcdFx0aW5uZXJTcGFuLmlubmVySFRNTCA9IHRiLmRpc3BsYXk7XHJcblx0XHRcdHRoaXMudG9vbGJhckNvbnRhaW5lci5hcHBlbmRDaGlsZCggdG9vbGJhckNlbGwgKTtcclxuXHJcblx0XHRcdC8vIGNvcHkgZXh0cmFjdFJlcGxhY2VcclxuXHRcdFx0aWYgKCB0Yi5leHRyYWN0UmVwbGFjZSAmJiB0Yi5leHRyYWN0UmVwbGFjZS5mcm9tICYmIHRiLmV4dHJhY3RSZXBsYWNlLnRvICkge1xyXG5cdFx0XHRcdHRoaXMuZXh0cmFjdFJlcGxhY2VzLnB1c2goIHRiLmV4dHJhY3RSZXBsYWNlICk7XHJcblx0XHRcdH1cclxuXHRcdH0pO1xyXG5cclxuXHRcdC8vIEhhbmRsZSB0b29sYmFyQ29udGFpbmVyIHZpc2liaWxpdHlcclxuXHRcdC8vIGlmICggdGhpcy50b29sYmFySGlkZSApIHtcclxuXHRcdC8vIFx0dGhpcy50b29sYmFyQ29udGFpbmVyLnN0eWxlLnZpc2liaWxpdHkgPSB0aGlzLmRpdi5hY3RpdmVFbGVtZW50ID8gJ3Zpc2libGUnIDogJ2hpZGRlbic7XHJcblxyXG5cdFx0Ly8gXHR0aGlzLmRpdi5hZGRFdmVudExpc3RlbmVyKCAnZm9jdXMnLCAoKSA9PiB0aGlzLnRvb2xiYXJDb250YWluZXIuc3R5bGUudmlzaWJpbGl0eSA9ICd2aXNpYmxlJyApO1xyXG5cdFx0Ly8gXHR0aGlzLmRpdi5hZGRFdmVudExpc3RlbmVyKCAnYmx1cicsIChldikgPT4gY29uc29sZS5sb2coZXYpICk7XHJcblx0XHQvLyB9XHJcblx0XHR0aGlzLm91dGVyRGl2LmFwcGVuZENoaWxkKCB0aGlzLnRvb2xiYXJDb250YWluZXIgKTtcclxuXHRcdHRoaXMuZGl2LmFkZEV2ZW50TGlzdGVuZXIoICdmb2N1cycsXHJcblx0XHRcdFx0KCkgPT4gdGhpcy50b29sYmFyQ29udGFpbmVyLmNsYXNzTGlzdC5yZW1vdmUoJ2Rpc2FibGVkJyksXHJcblx0XHRcdFx0eyBjYXB0dXJlOiB0cnVlIH0gKTtcclxuXHRcdHRoaXMuZGl2LmFkZEV2ZW50TGlzdGVuZXIoICdibHVyJyxcclxuXHRcdFx0XHQoKSA9PiB0aGlzLnRvb2xiYXJDb250YWluZXIuY2xhc3NMaXN0LmFkZCgnZGlzYWJsZWQnKSxcclxuXHRcdFx0XHR7IGNhcHR1cmU6IHRydWUgfSApO1xyXG5cclxuXHJcblx0XHRpZiAoIGJhc2UuZnNtICYmIGJhc2UuZnNtLmRlY0luaXRDbnQgKSB7XHJcblx0XHRcdGJhc2UuZnNtLmRlY0luaXRDbnQoKTtcclxuXHRcdH1cclxuXHR9XHJcblxyXG5cdC8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vXHJcblxyXG5cdGluc2VydCAoIG5yLCBldmVudCApIHtcclxuXHJcblx0XHRpZiAoIHRoaXMudG9vbGJhcltucl0uZG9udEluc2VydFJlY3Vyc2l2ZSApIHtcclxuXHRcdFx0Ly8gc2VhcmNoIHBhcmVudCBcIi5pbnNlcnRlZFwiICgtPiBpbnNpZGUgYW5vdGhlciBpbnNlcnRlZCBlbGVtZW50KVxyXG5cdFx0XHRjb25zdCBzZWwgPSB3aW5kb3cuZ2V0U2VsZWN0aW9uKCk7XHJcblx0XHRcdGlmICggc2VsICYmIHNlbC5mb2N1c05vZGUgKSB7XHJcblx0XHRcdFx0bGV0IHBub2RlID0gc2VsLmZvY3VzTm9kZTtcclxuXHRcdFx0XHR3aGlsZSAoIHBub2RlICYmICggIXBub2RlLmNsYXNzTGlzdCB8fCAhcG5vZGUuY2xhc3NMaXN0LmNvbnRhaW5zKCd0ZXh0YXJlYUluc2VydHMnKSAmJiAhcG5vZGUuY2xhc3NMaXN0LmNvbnRhaW5zKCdpbnNlcnRlZCcpICkgKSB7XHJcblx0XHRcdFx0XHRwbm9kZSA9IHBub2RlLnBhcmVudE5vZGU7XHJcblx0XHRcdFx0fVxyXG5cdFx0XHRcdGlmICggcG5vZGUuY2xhc3NMaXN0ICYmIHBub2RlLmNsYXNzTGlzdC5jb250YWlucygnaW5zZXJ0ZWQnKSApIHtcclxuXHRcdFx0XHRcdHJldHVybjtcclxuXHRcdFx0XHR9XHJcblx0XHRcdH1cclxuXHRcdH1cclxuXHJcblx0XHRpZiAoIHRoaXMucGFzdGVIdG1sQXRDYXJldCggdGhpcy50b29sYmFyW25yXS5pbnNlcnQgfHwgdGhpcy50b29sYmFyW25yXS5kaXNwbGF5LCAhdGhpcy50b29sYmFyW25yXS5ub0V4dHJhU3BhY2VzLCB0aGlzLnRvb2xiYXJbbnJdLmxvZ05hbWUgKSApIHtcclxuXHRcdFx0dGhpcy5ldl9pbnB1dCgpO1x0Ly8gY2hlY2sgcmVnZXhwIGV0Yy5cclxuXHRcdFx0ZXZlbnQucHJldmVudERlZmF1bHQoKTtcclxuXHRcdFx0ZXZlbnQuc3RvcFByb3BhZ2F0aW9uKCk7XHJcblx0XHR9XHJcblxyXG5cdFx0aWYgKCB0aGlzLmJhc2UgKSB7XHJcblx0XHRcdHRoaXMuYmFzZS5zZW5kQ2hhbmdlU3RhdGUoIHRoaXMgKTtcclxuXHRcdH1cclxuXHR9XHJcblxyXG59XHJcblxyXG4vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy9cclxuXHJcbi8vIGV4cG9ydCBzb21lIGRlZmF1bHQgdG9vbGJhcnNcclxuXHJcbmV4cG9ydCBjb25zdCB0b29sYmFyTWF0aE9wZXJhdG9ycyA9IFtcclxuXHR7IGRpc3BsYXk6IFwiJnBsdXM7XCIsIGxvZ05hbWU6IFwicGx1c1wiLCB9LFx0XHQvLyArIFxcdTAwMmJcclxuXHR7IGRpc3BsYXk6IFwiJm1pbnVzO1wiLCBsb2dOYW1lOiBcIm1pbnVzXCIsIH0sXHRcdC8vIC0gXFx1MjIxMlxyXG5cdC8vIHsgZGlzcGxheTogXCImY2VudGVyZG90O1wiLCB9LFx0Ly8gKlxyXG5cdHsgZGlzcGxheTogXCImc2RvdDtcIiwgbG9nTmFtZTogXCJkb3RcIiwgfSxcdFx0XHQvLyAqIFxcdTIyYzVcclxuXHR7IGRpc3BsYXk6IFwiJnJhdGlvO1wiLCBsb2dOYW1lOiBcInJhdGlvXCIsIH0sXHRcdC8vIC8gXFx1MjIzNlxyXG5cdHsgZGlzcGxheTogXCImZXF1YWxzO1wiLCBsb2dOYW1lOiBcImVxdWFsc1wiLCB9LFx0Ly8gPSBcXHUwMDNkXHJcblxyXG5dO1xyXG5cclxuY29uc3QgZnJhY19odG1sID0gJzxkaXYgY29udGVudGVkaXRhYmxlPVwiZmFsc2VcIiBjbGFzcz1cImZyYWNcIj4nK1xyXG5cdCc8c3BhbiBjb250ZW50ZWRpdGFibGU9XCJ0cnVlXCIgY2xhc3M9XCJmcmFjIHRvcCBzdGFydEN1cnNvclBvcyBpbnB1dEZpZWxkXCI+PC9zcGFuPicrXHJcblx0JzxzcGFuIGNvbnRlbnRlZGl0YWJsZT1cInRydWVcIiBjbGFzcz1cImZyYWMgYm90dG9tIGlucHV0RmllbGRcIj48L3NwYW4+JytcclxuJzwvZGl2Pic7XHJcblxyXG5pbXBvcnQgZnJhY3RzdmcgZnJvbSAnLi9pbWcvZnJhY3Quc3ZnJ1xyXG5jb25zdCBmcmFjX2h0bWxfdG9vbGJhciA9IGA8ZGl2IGNsYXNzPVwiZnJhY1wiPjxpbWcgc3JjPVwiJHtmcmFjdHN2Z31cIj48L2Rpdj5gO1xyXG5cclxuXHJcbmV4cG9ydCBjb25zdCB0b29sYmFyRnJhY3Rpb24gPSBbe1xyXG5cdGRpc3BsYXk6IGZyYWNfaHRtbF90b29sYmFyLFxyXG5cdGluc2VydDogZnJhY19odG1sLFxyXG5cdGRvbnRJbnNlcnRSZWN1cnNpdmU6IHRydWUsXHJcblx0bG9nTmFtZTogXCJmcmFjdGlvblwiLFxyXG5cdGV4dHJhY3RSZXBsYWNlOiB7XHJcblx0XHRmcm9tOiAvPGRpdltePl0qY2xhc3M9XCJmcmFjW14+XSo+XFxzKjxzcGFuW14+XSpjbGFzcz1cImZyYWMgdG9wW14+XSo+KC4qPyk8XFwvc3Bhbj5cXHMqPHNwYW5bXj5dKmNsYXNzPVwiZnJhYyBib3R0b21bXj5dKj4oLio/KTxcXC9zcGFuPlxccyo8XFwvZGl2Pi9nLFxyXG5cdFx0dG86IFwiKCQxKS8oJDIpXCJcclxuXHR9LFxyXG59LFxyXG5dXHJcblxyXG5leHBvcnQgY29uc3QgdG9vbGJhclBlcmNlbnQgPSBbXHJcblx0eyBkaXNwbGF5OiBcIiVcIiwgbG9nTmFtZTogXCJwZXJjZW50XCIsIH0sXHJcbl07XHJcblxyXG5leHBvcnQgY29uc3QgdG9vbGJhckV1cm8gPSBbXHJcblx0eyBkaXNwbGF5OiBcIuKCrFwiLCBsb2dOYW1lOiBcImV1cm9cIiwgfSxcclxuXTtcclxuXHJcbmV4cG9ydCBjb25zdCB0b29sYmFyQ29tcGFyaXNvbiA9IFtcclxuXHR7IGRpc3BsYXk6IFwiJmx0O1wiLCBsb2dOYW1lOiBcImxlc3NcIiwgfSxcclxuXHR7IGRpc3BsYXk6IFwiJmd0O1wiLCBsb2dOYW1lOiBcImdyZWF0ZXJcIiwgfSxcclxuXVxyXG5cclxuZXhwb3J0IGNvbnN0IHRvb2xiYXJNYXRoT3BlcmF0b3JzRnJhY3Rpb24gPSB0b29sYmFyTWF0aE9wZXJhdG9ycy5jb25jYXQoIHRvb2xiYXJGcmFjdGlvbiApO1xyXG5cclxuZXhwb3J0IGNvbnN0IHRvb2xiYXJNYXRoT3BlcmF0b3JzRnJhY3Rpb25Db21wYXJpc29uID0gW10uY29uY2F0KHRvb2xiYXJGcmFjdGlvbikuY29uY2F0KCB0b29sYmFyTWF0aE9wZXJhdG9yc0ZyYWN0aW9uICk7XHJcblxyXG5leHBvcnQgY29uc3QgdG9vbGJhck1hdGhPcGVyYXRvcnNGcmFjdGlvblBlcmNlbnQgPSB0b29sYmFyTWF0aE9wZXJhdG9yc0ZyYWN0aW9uLmNvbmNhdCggdG9vbGJhclBlcmNlbnQgKTtcclxuIiwiLy8gZXh0cmFjdGVkIGJ5IG1pbmktY3NzLWV4dHJhY3QtcGx1Z2luXG5leHBvcnQge307IiwiLy8gZXh0cmFjdGVkIGJ5IG1pbmktY3NzLWV4dHJhY3QtcGx1Z2luXG5leHBvcnQge307IiwiLy8gZXh0cmFjdGVkIGJ5IG1pbmktY3NzLWV4dHJhY3QtcGx1Z2luXG5leHBvcnQge307IiwiJ3VzZSBzdHJpY3QnO1xudmFyIGlzQ2FsbGFibGUgPSByZXF1aXJlKCcuLi9pbnRlcm5hbHMvaXMtY2FsbGFibGUnKTtcbnZhciB0cnlUb1N0cmluZyA9IHJlcXVpcmUoJy4uL2ludGVybmFscy90cnktdG8tc3RyaW5nJyk7XG5cbnZhciAkVHlwZUVycm9yID0gVHlwZUVycm9yO1xuXG4vLyBgQXNzZXJ0OiBJc0NhbGxhYmxlKGFyZ3VtZW50KSBpcyB0cnVlYFxubW9kdWxlLmV4cG9ydHMgPSBmdW5jdGlvbiAoYXJndW1lbnQpIHtcbiAgaWYgKGlzQ2FsbGFibGUoYXJndW1lbnQpKSByZXR1cm4gYXJndW1lbnQ7XG4gIHRocm93IG5ldyAkVHlwZUVycm9yKHRyeVRvU3RyaW5nKGFyZ3VtZW50KSArICcgaXMgbm90IGEgZnVuY3Rpb24nKTtcbn07XG4iLCIndXNlIHN0cmljdCc7XG52YXIgaXNDb25zdHJ1Y3RvciA9IHJlcXVpcmUoJy4uL2ludGVybmFscy9pcy1jb25zdHJ1Y3RvcicpO1xudmFyIHRyeVRvU3RyaW5nID0gcmVxdWlyZSgnLi4vaW50ZXJuYWxzL3RyeS10by1zdHJpbmcnKTtcblxudmFyICRUeXBlRXJyb3IgPSBUeXBlRXJyb3I7XG5cbi8vIGBBc3NlcnQ6IElzQ29uc3RydWN0b3IoYXJndW1lbnQpIGlzIHRydWVgXG5tb2R1bGUuZXhwb3J0cyA9IGZ1bmN0aW9uIChhcmd1bWVudCkge1xuICBpZiAoaXNDb25zdHJ1Y3Rvcihhcmd1bWVudCkpIHJldHVybiBhcmd1bWVudDtcbiAgdGhyb3cgbmV3ICRUeXBlRXJyb3IodHJ5VG9TdHJpbmcoYXJndW1lbnQpICsgJyBpcyBub3QgYSBjb25zdHJ1Y3RvcicpO1xufTtcbiIsIid1c2Ugc3RyaWN0JztcbnZhciBpc1Bvc3NpYmxlUHJvdG90eXBlID0gcmVxdWlyZSgnLi4vaW50ZXJuYWxzL2lzLXBvc3NpYmxlLXByb3RvdHlwZScpO1xuXG52YXIgJFN0cmluZyA9IFN0cmluZztcbnZhciAkVHlwZUVycm9yID0gVHlwZUVycm9yO1xuXG5tb2R1bGUuZXhwb3J0cyA9IGZ1bmN0aW9uIChhcmd1bWVudCkge1xuICBpZiAoaXNQb3NzaWJsZVByb3RvdHlwZShhcmd1bWVudCkpIHJldHVybiBhcmd1bWVudDtcbiAgdGhyb3cgbmV3ICRUeXBlRXJyb3IoXCJDYW4ndCBzZXQgXCIgKyAkU3RyaW5nKGFyZ3VtZW50KSArICcgYXMgYSBwcm90b3R5cGUnKTtcbn07XG4iLCIndXNlIHN0cmljdCc7XG52YXIgd2VsbEtub3duU3ltYm9sID0gcmVxdWlyZSgnLi4vaW50ZXJuYWxzL3dlbGwta25vd24tc3ltYm9sJyk7XG52YXIgY3JlYXRlID0gcmVxdWlyZSgnLi4vaW50ZXJuYWxzL29iamVjdC1jcmVhdGUnKTtcbnZhciBkZWZpbmVQcm9wZXJ0eSA9IHJlcXVpcmUoJy4uL2ludGVybmFscy9vYmplY3QtZGVmaW5lLXByb3BlcnR5JykuZjtcblxudmFyIFVOU0NPUEFCTEVTID0gd2VsbEtub3duU3ltYm9sKCd1bnNjb3BhYmxlcycpO1xudmFyIEFycmF5UHJvdG90eXBlID0gQXJyYXkucHJvdG90eXBlO1xuXG4vLyBBcnJheS5wcm90b3R5cGVbQEB1bnNjb3BhYmxlc11cbi8vIGh0dHBzOi8vdGMzOS5lcy9lY21hMjYyLyNzZWMtYXJyYXkucHJvdG90eXBlLUBAdW5zY29wYWJsZXNcbmlmIChBcnJheVByb3RvdHlwZVtVTlNDT1BBQkxFU10gPT09IHVuZGVmaW5lZCkge1xuICBkZWZpbmVQcm9wZXJ0eShBcnJheVByb3RvdHlwZSwgVU5TQ09QQUJMRVMsIHtcbiAgICBjb25maWd1cmFibGU6IHRydWUsXG4gICAgdmFsdWU6IGNyZWF0ZShudWxsKVxuICB9KTtcbn1cblxuLy8gYWRkIGEga2V5IHRvIEFycmF5LnByb3RvdHlwZVtAQHVuc2NvcGFibGVzXVxubW9kdWxlLmV4cG9ydHMgPSBmdW5jdGlvbiAoa2V5KSB7XG4gIEFycmF5UHJvdG90eXBlW1VOU0NPUEFCTEVTXVtrZXldID0gdHJ1ZTtcbn07XG4iLCIndXNlIHN0cmljdCc7XG52YXIgY2hhckF0ID0gcmVxdWlyZSgnLi4vaW50ZXJuYWxzL3N0cmluZy1tdWx0aWJ5dGUnKS5jaGFyQXQ7XG5cbi8vIGBBZHZhbmNlU3RyaW5nSW5kZXhgIGFic3RyYWN0IG9wZXJhdGlvblxuLy8gaHR0cHM6Ly90YzM5LmVzL2VjbWEyNjIvI3NlYy1hZHZhbmNlc3RyaW5naW5kZXhcbm1vZHVsZS5leHBvcnRzID0gZnVuY3Rpb24gKFMsIGluZGV4LCB1bmljb2RlKSB7XG4gIHJldHVybiBpbmRleCArICh1bmljb2RlID8gY2hhckF0KFMsIGluZGV4KS5sZW5ndGggOiAxKTtcbn07XG4iLCIndXNlIHN0cmljdCc7XG52YXIgaXNQcm90b3R5cGVPZiA9IHJlcXVpcmUoJy4uL2ludGVybmFscy9vYmplY3QtaXMtcHJvdG90eXBlLW9mJyk7XG5cbnZhciAkVHlwZUVycm9yID0gVHlwZUVycm9yO1xuXG5tb2R1bGUuZXhwb3J0cyA9IGZ1bmN0aW9uIChpdCwgUHJvdG90eXBlKSB7XG4gIGlmIChpc1Byb3RvdHlwZU9mKFByb3RvdHlwZSwgaXQpKSByZXR1cm4gaXQ7XG4gIHRocm93IG5ldyAkVHlwZUVycm9yKCdJbmNvcnJlY3QgaW52b2NhdGlvbicpO1xufTtcbiIsIid1c2Ugc3RyaWN0JztcbnZhciBpc09iamVjdCA9IHJlcXVpcmUoJy4uL2ludGVybmFscy9pcy1vYmplY3QnKTtcblxudmFyICRTdHJpbmcgPSBTdHJpbmc7XG52YXIgJFR5cGVFcnJvciA9IFR5cGVFcnJvcjtcblxuLy8gYEFzc2VydDogVHlwZShhcmd1bWVudCkgaXMgT2JqZWN0YFxubW9kdWxlLmV4cG9ydHMgPSBmdW5jdGlvbiAoYXJndW1lbnQpIHtcbiAgaWYgKGlzT2JqZWN0KGFyZ3VtZW50KSkgcmV0dXJuIGFyZ3VtZW50O1xuICB0aHJvdyBuZXcgJFR5cGVFcnJvcigkU3RyaW5nKGFyZ3VtZW50KSArICcgaXMgbm90IGFuIG9iamVjdCcpO1xufTtcbiIsIid1c2Ugc3RyaWN0JztcbnZhciBiaW5kID0gcmVxdWlyZSgnLi4vaW50ZXJuYWxzL2Z1bmN0aW9uLWJpbmQtY29udGV4dCcpO1xudmFyIGNhbGwgPSByZXF1aXJlKCcuLi9pbnRlcm5hbHMvZnVuY3Rpb24tY2FsbCcpO1xudmFyIHRvT2JqZWN0ID0gcmVxdWlyZSgnLi4vaW50ZXJuYWxzL3RvLW9iamVjdCcpO1xudmFyIGNhbGxXaXRoU2FmZUl0ZXJhdGlvbkNsb3NpbmcgPSByZXF1aXJlKCcuLi9pbnRlcm5hbHMvY2FsbC13aXRoLXNhZmUtaXRlcmF0aW9uLWNsb3NpbmcnKTtcbnZhciBpc0FycmF5SXRlcmF0b3JNZXRob2QgPSByZXF1aXJlKCcuLi9pbnRlcm5hbHMvaXMtYXJyYXktaXRlcmF0b3ItbWV0aG9kJyk7XG52YXIgaXNDb25zdHJ1Y3RvciA9IHJlcXVpcmUoJy4uL2ludGVybmFscy9pcy1jb25zdHJ1Y3RvcicpO1xudmFyIGxlbmd0aE9mQXJyYXlMaWtlID0gcmVxdWlyZSgnLi4vaW50ZXJuYWxzL2xlbmd0aC1vZi1hcnJheS1saWtlJyk7XG52YXIgY3JlYXRlUHJvcGVydHkgPSByZXF1aXJlKCcuLi9pbnRlcm5hbHMvY3JlYXRlLXByb3BlcnR5Jyk7XG52YXIgZ2V0SXRlcmF0b3IgPSByZXF1aXJlKCcuLi9pbnRlcm5hbHMvZ2V0LWl0ZXJhdG9yJyk7XG52YXIgZ2V0SXRlcmF0b3JNZXRob2QgPSByZXF1aXJlKCcuLi9pbnRlcm5hbHMvZ2V0LWl0ZXJhdG9yLW1ldGhvZCcpO1xuXG52YXIgJEFycmF5ID0gQXJyYXk7XG5cbi8vIGBBcnJheS5mcm9tYCBtZXRob2QgaW1wbGVtZW50YXRpb25cbi8vIGh0dHBzOi8vdGMzOS5lcy9lY21hMjYyLyNzZWMtYXJyYXkuZnJvbVxubW9kdWxlLmV4cG9ydHMgPSBmdW5jdGlvbiBmcm9tKGFycmF5TGlrZSAvKiAsIG1hcGZuID0gdW5kZWZpbmVkLCB0aGlzQXJnID0gdW5kZWZpbmVkICovKSB7XG4gIHZhciBPID0gdG9PYmplY3QoYXJyYXlMaWtlKTtcbiAgdmFyIElTX0NPTlNUUlVDVE9SID0gaXNDb25zdHJ1Y3Rvcih0aGlzKTtcbiAgdmFyIGFyZ3VtZW50c0xlbmd0aCA9IGFyZ3VtZW50cy5sZW5ndGg7XG4gIHZhciBtYXBmbiA9IGFyZ3VtZW50c0xlbmd0aCA+IDEgPyBhcmd1bWVudHNbMV0gOiB1bmRlZmluZWQ7XG4gIHZhciBtYXBwaW5nID0gbWFwZm4gIT09IHVuZGVmaW5lZDtcbiAgaWYgKG1hcHBpbmcpIG1hcGZuID0gYmluZChtYXBmbiwgYXJndW1lbnRzTGVuZ3RoID4gMiA/IGFyZ3VtZW50c1syXSA6IHVuZGVmaW5lZCk7XG4gIHZhciBpdGVyYXRvck1ldGhvZCA9IGdldEl0ZXJhdG9yTWV0aG9kKE8pO1xuICB2YXIgaW5kZXggPSAwO1xuICB2YXIgbGVuZ3RoLCByZXN1bHQsIHN0ZXAsIGl0ZXJhdG9yLCBuZXh0LCB2YWx1ZTtcbiAgLy8gaWYgdGhlIHRhcmdldCBpcyBub3QgaXRlcmFibGUgb3IgaXQncyBhbiBhcnJheSB3aXRoIHRoZSBkZWZhdWx0IGl0ZXJhdG9yIC0gdXNlIGEgc2ltcGxlIGNhc2VcbiAgaWYgKGl0ZXJhdG9yTWV0aG9kICYmICEodGhpcyA9PT0gJEFycmF5ICYmIGlzQXJyYXlJdGVyYXRvck1ldGhvZChpdGVyYXRvck1ldGhvZCkpKSB7XG4gICAgcmVzdWx0ID0gSVNfQ09OU1RSVUNUT1IgPyBuZXcgdGhpcygpIDogW107XG4gICAgaXRlcmF0b3IgPSBnZXRJdGVyYXRvcihPLCBpdGVyYXRvck1ldGhvZCk7XG4gICAgbmV4dCA9IGl0ZXJhdG9yLm5leHQ7XG4gICAgZm9yICg7IShzdGVwID0gY2FsbChuZXh0LCBpdGVyYXRvcikpLmRvbmU7IGluZGV4KyspIHtcbiAgICAgIHZhbHVlID0gbWFwcGluZyA/IGNhbGxXaXRoU2FmZUl0ZXJhdGlvbkNsb3NpbmcoaXRlcmF0b3IsIG1hcGZuLCBbc3RlcC52YWx1ZSwgaW5kZXhdLCB0cnVlKSA6IHN0ZXAudmFsdWU7XG4gICAgICBjcmVhdGVQcm9wZXJ0eShyZXN1bHQsIGluZGV4LCB2YWx1ZSk7XG4gICAgfVxuICB9IGVsc2Uge1xuICAgIGxlbmd0aCA9IGxlbmd0aE9mQXJyYXlMaWtlKE8pO1xuICAgIHJlc3VsdCA9IElTX0NPTlNUUlVDVE9SID8gbmV3IHRoaXMobGVuZ3RoKSA6ICRBcnJheShsZW5ndGgpO1xuICAgIGZvciAoO2xlbmd0aCA+IGluZGV4OyBpbmRleCsrKSB7XG4gICAgICB2YWx1ZSA9IG1hcHBpbmcgPyBtYXBmbihPW2luZGV4XSwgaW5kZXgpIDogT1tpbmRleF07XG4gICAgICBjcmVhdGVQcm9wZXJ0eShyZXN1bHQsIGluZGV4LCB2YWx1ZSk7XG4gICAgfVxuICB9XG4gIHJlc3VsdC5sZW5ndGggPSBpbmRleDtcbiAgcmV0dXJuIHJlc3VsdDtcbn07XG4iLCIndXNlIHN0cmljdCc7XG52YXIgdG9JbmRleGVkT2JqZWN0ID0gcmVxdWlyZSgnLi4vaW50ZXJuYWxzL3RvLWluZGV4ZWQtb2JqZWN0Jyk7XG52YXIgdG9BYnNvbHV0ZUluZGV4ID0gcmVxdWlyZSgnLi4vaW50ZXJuYWxzL3RvLWFic29sdXRlLWluZGV4Jyk7XG52YXIgbGVuZ3RoT2ZBcnJheUxpa2UgPSByZXF1aXJlKCcuLi9pbnRlcm5hbHMvbGVuZ3RoLW9mLWFycmF5LWxpa2UnKTtcblxuLy8gYEFycmF5LnByb3RvdHlwZS57IGluZGV4T2YsIGluY2x1ZGVzIH1gIG1ldGhvZHMgaW1wbGVtZW50YXRpb25cbnZhciBjcmVhdGVNZXRob2QgPSBmdW5jdGlvbiAoSVNfSU5DTFVERVMpIHtcbiAgcmV0dXJuIGZ1bmN0aW9uICgkdGhpcywgZWwsIGZyb21JbmRleCkge1xuICAgIHZhciBPID0gdG9JbmRleGVkT2JqZWN0KCR0aGlzKTtcbiAgICB2YXIgbGVuZ3RoID0gbGVuZ3RoT2ZBcnJheUxpa2UoTyk7XG4gICAgaWYgKGxlbmd0aCA9PT0gMCkgcmV0dXJuICFJU19JTkNMVURFUyAmJiAtMTtcbiAgICB2YXIgaW5kZXggPSB0b0Fic29sdXRlSW5kZXgoZnJvbUluZGV4LCBsZW5ndGgpO1xuICAgIHZhciB2YWx1ZTtcbiAgICAvLyBBcnJheSNpbmNsdWRlcyB1c2VzIFNhbWVWYWx1ZVplcm8gZXF1YWxpdHkgYWxnb3JpdGhtXG4gICAgLy8gZXNsaW50LWRpc2FibGUtbmV4dC1saW5lIG5vLXNlbGYtY29tcGFyZSAtLSBOYU4gY2hlY2tcbiAgICBpZiAoSVNfSU5DTFVERVMgJiYgZWwgIT09IGVsKSB3aGlsZSAobGVuZ3RoID4gaW5kZXgpIHtcbiAgICAgIHZhbHVlID0gT1tpbmRleCsrXTtcbiAgICAgIC8vIGVzbGludC1kaXNhYmxlLW5leHQtbGluZSBuby1zZWxmLWNvbXBhcmUgLS0gTmFOIGNoZWNrXG4gICAgICBpZiAodmFsdWUgIT09IHZhbHVlKSByZXR1cm4gdHJ1ZTtcbiAgICAvLyBBcnJheSNpbmRleE9mIGlnbm9yZXMgaG9sZXMsIEFycmF5I2luY2x1ZGVzIC0gbm90XG4gICAgfSBlbHNlIGZvciAoO2xlbmd0aCA+IGluZGV4OyBpbmRleCsrKSB7XG4gICAgICBpZiAoKElTX0lOQ0xVREVTIHx8IGluZGV4IGluIE8pICYmIE9baW5kZXhdID09PSBlbCkgcmV0dXJuIElTX0lOQ0xVREVTIHx8IGluZGV4IHx8IDA7XG4gICAgfSByZXR1cm4gIUlTX0lOQ0xVREVTICYmIC0xO1xuICB9O1xufTtcblxubW9kdWxlLmV4cG9ydHMgPSB7XG4gIC8vIGBBcnJheS5wcm90b3R5cGUuaW5jbHVkZXNgIG1ldGhvZFxuICAvLyBodHRwczovL3RjMzkuZXMvZWNtYTI2Mi8jc2VjLWFycmF5LnByb3RvdHlwZS5pbmNsdWRlc1xuICBpbmNsdWRlczogY3JlYXRlTWV0aG9kKHRydWUpLFxuICAvLyBgQXJyYXkucHJvdG90eXBlLmluZGV4T2ZgIG1ldGhvZFxuICAvLyBodHRwczovL3RjMzkuZXMvZWNtYTI2Mi8jc2VjLWFycmF5LnByb3RvdHlwZS5pbmRleG9mXG4gIGluZGV4T2Y6IGNyZWF0ZU1ldGhvZChmYWxzZSlcbn07XG4iLCIndXNlIHN0cmljdCc7XG52YXIgdW5jdXJyeVRoaXMgPSByZXF1aXJlKCcuLi9pbnRlcm5hbHMvZnVuY3Rpb24tdW5jdXJyeS10aGlzJyk7XG5cbm1vZHVsZS5leHBvcnRzID0gdW5jdXJyeVRoaXMoW10uc2xpY2UpO1xuIiwiJ3VzZSBzdHJpY3QnO1xudmFyIGFycmF5U2xpY2UgPSByZXF1aXJlKCcuLi9pbnRlcm5hbHMvYXJyYXktc2xpY2UnKTtcblxudmFyIGZsb29yID0gTWF0aC5mbG9vcjtcblxudmFyIHNvcnQgPSBmdW5jdGlvbiAoYXJyYXksIGNvbXBhcmVmbikge1xuICB2YXIgbGVuZ3RoID0gYXJyYXkubGVuZ3RoO1xuXG4gIGlmIChsZW5ndGggPCA4KSB7XG4gICAgLy8gaW5zZXJ0aW9uIHNvcnRcbiAgICB2YXIgaSA9IDE7XG4gICAgdmFyIGVsZW1lbnQsIGo7XG5cbiAgICB3aGlsZSAoaSA8IGxlbmd0aCkge1xuICAgICAgaiA9IGk7XG4gICAgICBlbGVtZW50ID0gYXJyYXlbaV07XG4gICAgICB3aGlsZSAoaiAmJiBjb21wYXJlZm4oYXJyYXlbaiAtIDFdLCBlbGVtZW50KSA+IDApIHtcbiAgICAgICAgYXJyYXlbal0gPSBhcnJheVstLWpdO1xuICAgICAgfVxuICAgICAgaWYgKGogIT09IGkrKykgYXJyYXlbal0gPSBlbGVtZW50O1xuICAgIH1cbiAgfSBlbHNlIHtcbiAgICAvLyBtZXJnZSBzb3J0XG4gICAgdmFyIG1pZGRsZSA9IGZsb29yKGxlbmd0aCAvIDIpO1xuICAgIHZhciBsZWZ0ID0gc29ydChhcnJheVNsaWNlKGFycmF5LCAwLCBtaWRkbGUpLCBjb21wYXJlZm4pO1xuICAgIHZhciByaWdodCA9IHNvcnQoYXJyYXlTbGljZShhcnJheSwgbWlkZGxlKSwgY29tcGFyZWZuKTtcbiAgICB2YXIgbGxlbmd0aCA9IGxlZnQubGVuZ3RoO1xuICAgIHZhciBybGVuZ3RoID0gcmlnaHQubGVuZ3RoO1xuICAgIHZhciBsaW5kZXggPSAwO1xuICAgIHZhciByaW5kZXggPSAwO1xuXG4gICAgd2hpbGUgKGxpbmRleCA8IGxsZW5ndGggfHwgcmluZGV4IDwgcmxlbmd0aCkge1xuICAgICAgYXJyYXlbbGluZGV4ICsgcmluZGV4XSA9IChsaW5kZXggPCBsbGVuZ3RoICYmIHJpbmRleCA8IHJsZW5ndGgpXG4gICAgICAgID8gY29tcGFyZWZuKGxlZnRbbGluZGV4XSwgcmlnaHRbcmluZGV4XSkgPD0gMCA/IGxlZnRbbGluZGV4KytdIDogcmlnaHRbcmluZGV4KytdXG4gICAgICAgIDogbGluZGV4IDwgbGxlbmd0aCA/IGxlZnRbbGluZGV4KytdIDogcmlnaHRbcmluZGV4KytdO1xuICAgIH1cbiAgfVxuXG4gIHJldHVybiBhcnJheTtcbn07XG5cbm1vZHVsZS5leHBvcnRzID0gc29ydDtcbiIsIid1c2Ugc3RyaWN0JztcbnZhciBhbk9iamVjdCA9IHJlcXVpcmUoJy4uL2ludGVybmFscy9hbi1vYmplY3QnKTtcbnZhciBpdGVyYXRvckNsb3NlID0gcmVxdWlyZSgnLi4vaW50ZXJuYWxzL2l0ZXJhdG9yLWNsb3NlJyk7XG5cbi8vIGNhbGwgc29tZXRoaW5nIG9uIGl0ZXJhdG9yIHN0ZXAgd2l0aCBzYWZlIGNsb3Npbmcgb24gZXJyb3Jcbm1vZHVsZS5leHBvcnRzID0gZnVuY3Rpb24gKGl0ZXJhdG9yLCBmbiwgdmFsdWUsIEVOVFJJRVMpIHtcbiAgdHJ5IHtcbiAgICByZXR1cm4gRU5UUklFUyA/IGZuKGFuT2JqZWN0KHZhbHVlKVswXSwgdmFsdWVbMV0pIDogZm4odmFsdWUpO1xuICB9IGNhdGNoIChlcnJvcikge1xuICAgIGl0ZXJhdG9yQ2xvc2UoaXRlcmF0b3IsICd0aHJvdycsIGVycm9yKTtcbiAgfVxufTtcbiIsIid1c2Ugc3RyaWN0JztcbnZhciB1bmN1cnJ5VGhpcyA9IHJlcXVpcmUoJy4uL2ludGVybmFscy9mdW5jdGlvbi11bmN1cnJ5LXRoaXMnKTtcblxudmFyIHRvU3RyaW5nID0gdW5jdXJyeVRoaXMoe30udG9TdHJpbmcpO1xudmFyIHN0cmluZ1NsaWNlID0gdW5jdXJyeVRoaXMoJycuc2xpY2UpO1xuXG5tb2R1bGUuZXhwb3J0cyA9IGZ1bmN0aW9uIChpdCkge1xuICByZXR1cm4gc3RyaW5nU2xpY2UodG9TdHJpbmcoaXQpLCA4LCAtMSk7XG59O1xuIiwiJ3VzZSBzdHJpY3QnO1xudmFyIFRPX1NUUklOR19UQUdfU1VQUE9SVCA9IHJlcXVpcmUoJy4uL2ludGVybmFscy90by1zdHJpbmctdGFnLXN1cHBvcnQnKTtcbnZhciBpc0NhbGxhYmxlID0gcmVxdWlyZSgnLi4vaW50ZXJuYWxzL2lzLWNhbGxhYmxlJyk7XG52YXIgY2xhc3NvZlJhdyA9IHJlcXVpcmUoJy4uL2ludGVybmFscy9jbGFzc29mLXJhdycpO1xudmFyIHdlbGxLbm93blN5bWJvbCA9IHJlcXVpcmUoJy4uL2ludGVybmFscy93ZWxsLWtub3duLXN5bWJvbCcpO1xuXG52YXIgVE9fU1RSSU5HX1RBRyA9IHdlbGxLbm93blN5bWJvbCgndG9TdHJpbmdUYWcnKTtcbnZhciAkT2JqZWN0ID0gT2JqZWN0O1xuXG4vLyBFUzMgd3JvbmcgaGVyZVxudmFyIENPUlJFQ1RfQVJHVU1FTlRTID0gY2xhc3NvZlJhdyhmdW5jdGlvbiAoKSB7IHJldHVybiBhcmd1bWVudHM7IH0oKSkgPT09ICdBcmd1bWVudHMnO1xuXG4vLyBmYWxsYmFjayBmb3IgSUUxMSBTY3JpcHQgQWNjZXNzIERlbmllZCBlcnJvclxudmFyIHRyeUdldCA9IGZ1bmN0aW9uIChpdCwga2V5KSB7XG4gIHRyeSB7XG4gICAgcmV0dXJuIGl0W2tleV07XG4gIH0gY2F0Y2ggKGVycm9yKSB7IC8qIGVtcHR5ICovIH1cbn07XG5cbi8vIGdldHRpbmcgdGFnIGZyb20gRVM2KyBgT2JqZWN0LnByb3RvdHlwZS50b1N0cmluZ2Bcbm1vZHVsZS5leHBvcnRzID0gVE9fU1RSSU5HX1RBR19TVVBQT1JUID8gY2xhc3NvZlJhdyA6IGZ1bmN0aW9uIChpdCkge1xuICB2YXIgTywgdGFnLCByZXN1bHQ7XG4gIHJldHVybiBpdCA9PT0gdW5kZWZpbmVkID8gJ1VuZGVmaW5lZCcgOiBpdCA9PT0gbnVsbCA/ICdOdWxsJ1xuICAgIC8vIEBAdG9TdHJpbmdUYWcgY2FzZVxuICAgIDogdHlwZW9mICh0YWcgPSB0cnlHZXQoTyA9ICRPYmplY3QoaXQpLCBUT19TVFJJTkdfVEFHKSkgPT0gJ3N0cmluZycgPyB0YWdcbiAgICAvLyBidWlsdGluVGFnIGNhc2VcbiAgICA6IENPUlJFQ1RfQVJHVU1FTlRTID8gY2xhc3NvZlJhdyhPKVxuICAgIC8vIEVTMyBhcmd1bWVudHMgZmFsbGJhY2tcbiAgICA6IChyZXN1bHQgPSBjbGFzc29mUmF3KE8pKSA9PT0gJ09iamVjdCcgJiYgaXNDYWxsYWJsZShPLmNhbGxlZSkgPyAnQXJndW1lbnRzJyA6IHJlc3VsdDtcbn07XG4iLCIndXNlIHN0cmljdCc7XG52YXIgaGFzT3duID0gcmVxdWlyZSgnLi4vaW50ZXJuYWxzL2hhcy1vd24tcHJvcGVydHknKTtcbnZhciBvd25LZXlzID0gcmVxdWlyZSgnLi4vaW50ZXJuYWxzL293bi1rZXlzJyk7XG52YXIgZ2V0T3duUHJvcGVydHlEZXNjcmlwdG9yTW9kdWxlID0gcmVxdWlyZSgnLi4vaW50ZXJuYWxzL29iamVjdC1nZXQtb3duLXByb3BlcnR5LWRlc2NyaXB0b3InKTtcbnZhciBkZWZpbmVQcm9wZXJ0eU1vZHVsZSA9IHJlcXVpcmUoJy4uL2ludGVybmFscy9vYmplY3QtZGVmaW5lLXByb3BlcnR5Jyk7XG5cbm1vZHVsZS5leHBvcnRzID0gZnVuY3Rpb24gKHRhcmdldCwgc291cmNlLCBleGNlcHRpb25zKSB7XG4gIHZhciBrZXlzID0gb3duS2V5cyhzb3VyY2UpO1xuICB2YXIgZGVmaW5lUHJvcGVydHkgPSBkZWZpbmVQcm9wZXJ0eU1vZHVsZS5mO1xuICB2YXIgZ2V0T3duUHJvcGVydHlEZXNjcmlwdG9yID0gZ2V0T3duUHJvcGVydHlEZXNjcmlwdG9yTW9kdWxlLmY7XG4gIGZvciAodmFyIGkgPSAwOyBpIDwga2V5cy5sZW5ndGg7IGkrKykge1xuICAgIHZhciBrZXkgPSBrZXlzW2ldO1xuICAgIGlmICghaGFzT3duKHRhcmdldCwga2V5KSAmJiAhKGV4Y2VwdGlvbnMgJiYgaGFzT3duKGV4Y2VwdGlvbnMsIGtleSkpKSB7XG4gICAgICBkZWZpbmVQcm9wZXJ0eSh0YXJnZXQsIGtleSwgZ2V0T3duUHJvcGVydHlEZXNjcmlwdG9yKHNvdXJjZSwga2V5KSk7XG4gICAgfVxuICB9XG59O1xuIiwiJ3VzZSBzdHJpY3QnO1xudmFyIGZhaWxzID0gcmVxdWlyZSgnLi4vaW50ZXJuYWxzL2ZhaWxzJyk7XG5cbm1vZHVsZS5leHBvcnRzID0gIWZhaWxzKGZ1bmN0aW9uICgpIHtcbiAgZnVuY3Rpb24gRigpIHsgLyogZW1wdHkgKi8gfVxuICBGLnByb3RvdHlwZS5jb25zdHJ1Y3RvciA9IG51bGw7XG4gIC8vIGVzbGludC1kaXNhYmxlLW5leHQtbGluZSBlcy9uby1vYmplY3QtZ2V0cHJvdG90eXBlb2YgLS0gcmVxdWlyZWQgZm9yIHRlc3RpbmdcbiAgcmV0dXJuIE9iamVjdC5nZXRQcm90b3R5cGVPZihuZXcgRigpKSAhPT0gRi5wcm90b3R5cGU7XG59KTtcbiIsIid1c2Ugc3RyaWN0Jztcbi8vIGBDcmVhdGVJdGVyUmVzdWx0T2JqZWN0YCBhYnN0cmFjdCBvcGVyYXRpb25cbi8vIGh0dHBzOi8vdGMzOS5lcy9lY21hMjYyLyNzZWMtY3JlYXRlaXRlcnJlc3VsdG9iamVjdFxubW9kdWxlLmV4cG9ydHMgPSBmdW5jdGlvbiAodmFsdWUsIGRvbmUpIHtcbiAgcmV0dXJuIHsgdmFsdWU6IHZhbHVlLCBkb25lOiBkb25lIH07XG59O1xuIiwiJ3VzZSBzdHJpY3QnO1xudmFyIERFU0NSSVBUT1JTID0gcmVxdWlyZSgnLi4vaW50ZXJuYWxzL2Rlc2NyaXB0b3JzJyk7XG52YXIgZGVmaW5lUHJvcGVydHlNb2R1bGUgPSByZXF1aXJlKCcuLi9pbnRlcm5hbHMvb2JqZWN0LWRlZmluZS1wcm9wZXJ0eScpO1xudmFyIGNyZWF0ZVByb3BlcnR5RGVzY3JpcHRvciA9IHJlcXVpcmUoJy4uL2ludGVybmFscy9jcmVhdGUtcHJvcGVydHktZGVzY3JpcHRvcicpO1xuXG5tb2R1bGUuZXhwb3J0cyA9IERFU0NSSVBUT1JTID8gZnVuY3Rpb24gKG9iamVjdCwga2V5LCB2YWx1ZSkge1xuICByZXR1cm4gZGVmaW5lUHJvcGVydHlNb2R1bGUuZihvYmplY3QsIGtleSwgY3JlYXRlUHJvcGVydHlEZXNjcmlwdG9yKDEsIHZhbHVlKSk7XG59IDogZnVuY3Rpb24gKG9iamVjdCwga2V5LCB2YWx1ZSkge1xuICBvYmplY3Rba2V5XSA9IHZhbHVlO1xuICByZXR1cm4gb2JqZWN0O1xufTtcbiIsIid1c2Ugc3RyaWN0Jztcbm1vZHVsZS5leHBvcnRzID0gZnVuY3Rpb24gKGJpdG1hcCwgdmFsdWUpIHtcbiAgcmV0dXJuIHtcbiAgICBlbnVtZXJhYmxlOiAhKGJpdG1hcCAmIDEpLFxuICAgIGNvbmZpZ3VyYWJsZTogIShiaXRtYXAgJiAyKSxcbiAgICB3cml0YWJsZTogIShiaXRtYXAgJiA0KSxcbiAgICB2YWx1ZTogdmFsdWVcbiAgfTtcbn07XG4iLCIndXNlIHN0cmljdCc7XG52YXIgREVTQ1JJUFRPUlMgPSByZXF1aXJlKCcuLi9pbnRlcm5hbHMvZGVzY3JpcHRvcnMnKTtcbnZhciBkZWZpbmVQcm9wZXJ0eU1vZHVsZSA9IHJlcXVpcmUoJy4uL2ludGVybmFscy9vYmplY3QtZGVmaW5lLXByb3BlcnR5Jyk7XG52YXIgY3JlYXRlUHJvcGVydHlEZXNjcmlwdG9yID0gcmVxdWlyZSgnLi4vaW50ZXJuYWxzL2NyZWF0ZS1wcm9wZXJ0eS1kZXNjcmlwdG9yJyk7XG5cbm1vZHVsZS5leHBvcnRzID0gZnVuY3Rpb24gKG9iamVjdCwga2V5LCB2YWx1ZSkge1xuICBpZiAoREVTQ1JJUFRPUlMpIGRlZmluZVByb3BlcnR5TW9kdWxlLmYob2JqZWN0LCBrZXksIGNyZWF0ZVByb3BlcnR5RGVzY3JpcHRvcigwLCB2YWx1ZSkpO1xuICBlbHNlIG9iamVjdFtrZXldID0gdmFsdWU7XG59O1xuIiwiJ3VzZSBzdHJpY3QnO1xudmFyIG1ha2VCdWlsdEluID0gcmVxdWlyZSgnLi4vaW50ZXJuYWxzL21ha2UtYnVpbHQtaW4nKTtcbnZhciBkZWZpbmVQcm9wZXJ0eSA9IHJlcXVpcmUoJy4uL2ludGVybmFscy9vYmplY3QtZGVmaW5lLXByb3BlcnR5Jyk7XG5cbm1vZHVsZS5leHBvcnRzID0gZnVuY3Rpb24gKHRhcmdldCwgbmFtZSwgZGVzY3JpcHRvcikge1xuICBpZiAoZGVzY3JpcHRvci5nZXQpIG1ha2VCdWlsdEluKGRlc2NyaXB0b3IuZ2V0LCBuYW1lLCB7IGdldHRlcjogdHJ1ZSB9KTtcbiAgaWYgKGRlc2NyaXB0b3Iuc2V0KSBtYWtlQnVpbHRJbihkZXNjcmlwdG9yLnNldCwgbmFtZSwgeyBzZXR0ZXI6IHRydWUgfSk7XG4gIHJldHVybiBkZWZpbmVQcm9wZXJ0eS5mKHRhcmdldCwgbmFtZSwgZGVzY3JpcHRvcik7XG59O1xuIiwiJ3VzZSBzdHJpY3QnO1xudmFyIGlzQ2FsbGFibGUgPSByZXF1aXJlKCcuLi9pbnRlcm5hbHMvaXMtY2FsbGFibGUnKTtcbnZhciBkZWZpbmVQcm9wZXJ0eU1vZHVsZSA9IHJlcXVpcmUoJy4uL2ludGVybmFscy9vYmplY3QtZGVmaW5lLXByb3BlcnR5Jyk7XG52YXIgbWFrZUJ1aWx0SW4gPSByZXF1aXJlKCcuLi9pbnRlcm5hbHMvbWFrZS1idWlsdC1pbicpO1xudmFyIGRlZmluZUdsb2JhbFByb3BlcnR5ID0gcmVxdWlyZSgnLi4vaW50ZXJuYWxzL2RlZmluZS1nbG9iYWwtcHJvcGVydHknKTtcblxubW9kdWxlLmV4cG9ydHMgPSBmdW5jdGlvbiAoTywga2V5LCB2YWx1ZSwgb3B0aW9ucykge1xuICBpZiAoIW9wdGlvbnMpIG9wdGlvbnMgPSB7fTtcbiAgdmFyIHNpbXBsZSA9IG9wdGlvbnMuZW51bWVyYWJsZTtcbiAgdmFyIG5hbWUgPSBvcHRpb25zLm5hbWUgIT09IHVuZGVmaW5lZCA/IG9wdGlvbnMubmFtZSA6IGtleTtcbiAgaWYgKGlzQ2FsbGFibGUodmFsdWUpKSBtYWtlQnVpbHRJbih2YWx1ZSwgbmFtZSwgb3B0aW9ucyk7XG4gIGlmIChvcHRpb25zLmdsb2JhbCkge1xuICAgIGlmIChzaW1wbGUpIE9ba2V5XSA9IHZhbHVlO1xuICAgIGVsc2UgZGVmaW5lR2xvYmFsUHJvcGVydHkoa2V5LCB2YWx1ZSk7XG4gIH0gZWxzZSB7XG4gICAgdHJ5IHtcbiAgICAgIGlmICghb3B0aW9ucy51bnNhZmUpIGRlbGV0ZSBPW2tleV07XG4gICAgICBlbHNlIGlmIChPW2tleV0pIHNpbXBsZSA9IHRydWU7XG4gICAgfSBjYXRjaCAoZXJyb3IpIHsgLyogZW1wdHkgKi8gfVxuICAgIGlmIChzaW1wbGUpIE9ba2V5XSA9IHZhbHVlO1xuICAgIGVsc2UgZGVmaW5lUHJvcGVydHlNb2R1bGUuZihPLCBrZXksIHtcbiAgICAgIHZhbHVlOiB2YWx1ZSxcbiAgICAgIGVudW1lcmFibGU6IGZhbHNlLFxuICAgICAgY29uZmlndXJhYmxlOiAhb3B0aW9ucy5ub25Db25maWd1cmFibGUsXG4gICAgICB3cml0YWJsZTogIW9wdGlvbnMubm9uV3JpdGFibGVcbiAgICB9KTtcbiAgfSByZXR1cm4gTztcbn07XG4iLCIndXNlIHN0cmljdCc7XG52YXIgZGVmaW5lQnVpbHRJbiA9IHJlcXVpcmUoJy4uL2ludGVybmFscy9kZWZpbmUtYnVpbHQtaW4nKTtcblxubW9kdWxlLmV4cG9ydHMgPSBmdW5jdGlvbiAodGFyZ2V0LCBzcmMsIG9wdGlvbnMpIHtcbiAgZm9yICh2YXIga2V5IGluIHNyYykgZGVmaW5lQnVpbHRJbih0YXJnZXQsIGtleSwgc3JjW2tleV0sIG9wdGlvbnMpO1xuICByZXR1cm4gdGFyZ2V0O1xufTtcbiIsIid1c2Ugc3RyaWN0JztcbnZhciBnbG9iYWwgPSByZXF1aXJlKCcuLi9pbnRlcm5hbHMvZ2xvYmFsJyk7XG5cbi8vIGVzbGludC1kaXNhYmxlLW5leHQtbGluZSBlcy9uby1vYmplY3QtZGVmaW5lcHJvcGVydHkgLS0gc2FmZVxudmFyIGRlZmluZVByb3BlcnR5ID0gT2JqZWN0LmRlZmluZVByb3BlcnR5O1xuXG5tb2R1bGUuZXhwb3J0cyA9IGZ1bmN0aW9uIChrZXksIHZhbHVlKSB7XG4gIHRyeSB7XG4gICAgZGVmaW5lUHJvcGVydHkoZ2xvYmFsLCBrZXksIHsgdmFsdWU6IHZhbHVlLCBjb25maWd1cmFibGU6IHRydWUsIHdyaXRhYmxlOiB0cnVlIH0pO1xuICB9IGNhdGNoIChlcnJvcikge1xuICAgIGdsb2JhbFtrZXldID0gdmFsdWU7XG4gIH0gcmV0dXJuIHZhbHVlO1xufTtcbiIsIid1c2Ugc3RyaWN0JztcbnZhciBmYWlscyA9IHJlcXVpcmUoJy4uL2ludGVybmFscy9mYWlscycpO1xuXG4vLyBEZXRlY3QgSUU4J3MgaW5jb21wbGV0ZSBkZWZpbmVQcm9wZXJ0eSBpbXBsZW1lbnRhdGlvblxubW9kdWxlLmV4cG9ydHMgPSAhZmFpbHMoZnVuY3Rpb24gKCkge1xuICAvLyBlc2xpbnQtZGlzYWJsZS1uZXh0LWxpbmUgZXMvbm8tb2JqZWN0LWRlZmluZXByb3BlcnR5IC0tIHJlcXVpcmVkIGZvciB0ZXN0aW5nXG4gIHJldHVybiBPYmplY3QuZGVmaW5lUHJvcGVydHkoe30sIDEsIHsgZ2V0OiBmdW5jdGlvbiAoKSB7IHJldHVybiA3OyB9IH0pWzFdICE9PSA3O1xufSk7XG4iLCIndXNlIHN0cmljdCc7XG52YXIgZ2xvYmFsID0gcmVxdWlyZSgnLi4vaW50ZXJuYWxzL2dsb2JhbCcpO1xudmFyIGlzT2JqZWN0ID0gcmVxdWlyZSgnLi4vaW50ZXJuYWxzL2lzLW9iamVjdCcpO1xuXG52YXIgZG9jdW1lbnQgPSBnbG9iYWwuZG9jdW1lbnQ7XG4vLyB0eXBlb2YgZG9jdW1lbnQuY3JlYXRlRWxlbWVudCBpcyAnb2JqZWN0JyBpbiBvbGQgSUVcbnZhciBFWElTVFMgPSBpc09iamVjdChkb2N1bWVudCkgJiYgaXNPYmplY3QoZG9jdW1lbnQuY3JlYXRlRWxlbWVudCk7XG5cbm1vZHVsZS5leHBvcnRzID0gZnVuY3Rpb24gKGl0KSB7XG4gIHJldHVybiBFWElTVFMgPyBkb2N1bWVudC5jcmVhdGVFbGVtZW50KGl0KSA6IHt9O1xufTtcbiIsIid1c2Ugc3RyaWN0Jztcbm1vZHVsZS5leHBvcnRzID0gdHlwZW9mIG5hdmlnYXRvciAhPSAndW5kZWZpbmVkJyAmJiBTdHJpbmcobmF2aWdhdG9yLnVzZXJBZ2VudCkgfHwgJyc7XG4iLCIndXNlIHN0cmljdCc7XG52YXIgZ2xvYmFsID0gcmVxdWlyZSgnLi4vaW50ZXJuYWxzL2dsb2JhbCcpO1xudmFyIHVzZXJBZ2VudCA9IHJlcXVpcmUoJy4uL2ludGVybmFscy9lbmdpbmUtdXNlci1hZ2VudCcpO1xuXG52YXIgcHJvY2VzcyA9IGdsb2JhbC5wcm9jZXNzO1xudmFyIERlbm8gPSBnbG9iYWwuRGVubztcbnZhciB2ZXJzaW9ucyA9IHByb2Nlc3MgJiYgcHJvY2Vzcy52ZXJzaW9ucyB8fCBEZW5vICYmIERlbm8udmVyc2lvbjtcbnZhciB2OCA9IHZlcnNpb25zICYmIHZlcnNpb25zLnY4O1xudmFyIG1hdGNoLCB2ZXJzaW9uO1xuXG5pZiAodjgpIHtcbiAgbWF0Y2ggPSB2OC5zcGxpdCgnLicpO1xuICAvLyBpbiBvbGQgQ2hyb21lLCB2ZXJzaW9ucyBvZiBWOCBpc24ndCBWOCA9IENocm9tZSAvIDEwXG4gIC8vIGJ1dCB0aGVpciBjb3JyZWN0IHZlcnNpb25zIGFyZSBub3QgaW50ZXJlc3RpbmcgZm9yIHVzXG4gIHZlcnNpb24gPSBtYXRjaFswXSA+IDAgJiYgbWF0Y2hbMF0gPCA0ID8gMSA6ICsobWF0Y2hbMF0gKyBtYXRjaFsxXSk7XG59XG5cbi8vIEJyb3dzZXJGUyBOb2RlSlMgYHByb2Nlc3NgIHBvbHlmaWxsIGluY29ycmVjdGx5IHNldCBgLnY4YCB0byBgMC4wYFxuLy8gc28gY2hlY2sgYHVzZXJBZ2VudGAgZXZlbiBpZiBgLnY4YCBleGlzdHMsIGJ1dCAwXG5pZiAoIXZlcnNpb24gJiYgdXNlckFnZW50KSB7XG4gIG1hdGNoID0gdXNlckFnZW50Lm1hdGNoKC9FZGdlXFwvKFxcZCspLyk7XG4gIGlmICghbWF0Y2ggfHwgbWF0Y2hbMV0gPj0gNzQpIHtcbiAgICBtYXRjaCA9IHVzZXJBZ2VudC5tYXRjaCgvQ2hyb21lXFwvKFxcZCspLyk7XG4gICAgaWYgKG1hdGNoKSB2ZXJzaW9uID0gK21hdGNoWzFdO1xuICB9XG59XG5cbm1vZHVsZS5leHBvcnRzID0gdmVyc2lvbjtcbiIsIid1c2Ugc3RyaWN0Jztcbi8vIElFOC0gZG9uJ3QgZW51bSBidWcga2V5c1xubW9kdWxlLmV4cG9ydHMgPSBbXG4gICdjb25zdHJ1Y3RvcicsXG4gICdoYXNPd25Qcm9wZXJ0eScsXG4gICdpc1Byb3RvdHlwZU9mJyxcbiAgJ3Byb3BlcnR5SXNFbnVtZXJhYmxlJyxcbiAgJ3RvTG9jYWxlU3RyaW5nJyxcbiAgJ3RvU3RyaW5nJyxcbiAgJ3ZhbHVlT2YnXG5dO1xuIiwiJ3VzZSBzdHJpY3QnO1xudmFyIGdsb2JhbCA9IHJlcXVpcmUoJy4uL2ludGVybmFscy9nbG9iYWwnKTtcbnZhciBnZXRPd25Qcm9wZXJ0eURlc2NyaXB0b3IgPSByZXF1aXJlKCcuLi9pbnRlcm5hbHMvb2JqZWN0LWdldC1vd24tcHJvcGVydHktZGVzY3JpcHRvcicpLmY7XG52YXIgY3JlYXRlTm9uRW51bWVyYWJsZVByb3BlcnR5ID0gcmVxdWlyZSgnLi4vaW50ZXJuYWxzL2NyZWF0ZS1ub24tZW51bWVyYWJsZS1wcm9wZXJ0eScpO1xudmFyIGRlZmluZUJ1aWx0SW4gPSByZXF1aXJlKCcuLi9pbnRlcm5hbHMvZGVmaW5lLWJ1aWx0LWluJyk7XG52YXIgZGVmaW5lR2xvYmFsUHJvcGVydHkgPSByZXF1aXJlKCcuLi9pbnRlcm5hbHMvZGVmaW5lLWdsb2JhbC1wcm9wZXJ0eScpO1xudmFyIGNvcHlDb25zdHJ1Y3RvclByb3BlcnRpZXMgPSByZXF1aXJlKCcuLi9pbnRlcm5hbHMvY29weS1jb25zdHJ1Y3Rvci1wcm9wZXJ0aWVzJyk7XG52YXIgaXNGb3JjZWQgPSByZXF1aXJlKCcuLi9pbnRlcm5hbHMvaXMtZm9yY2VkJyk7XG5cbi8qXG4gIG9wdGlvbnMudGFyZ2V0ICAgICAgICAgLSBuYW1lIG9mIHRoZSB0YXJnZXQgb2JqZWN0XG4gIG9wdGlvbnMuZ2xvYmFsICAgICAgICAgLSB0YXJnZXQgaXMgdGhlIGdsb2JhbCBvYmplY3RcbiAgb3B0aW9ucy5zdGF0ICAgICAgICAgICAtIGV4cG9ydCBhcyBzdGF0aWMgbWV0aG9kcyBvZiB0YXJnZXRcbiAgb3B0aW9ucy5wcm90byAgICAgICAgICAtIGV4cG9ydCBhcyBwcm90b3R5cGUgbWV0aG9kcyBvZiB0YXJnZXRcbiAgb3B0aW9ucy5yZWFsICAgICAgICAgICAtIHJlYWwgcHJvdG90eXBlIG1ldGhvZCBmb3IgdGhlIGBwdXJlYCB2ZXJzaW9uXG4gIG9wdGlvbnMuZm9yY2VkICAgICAgICAgLSBleHBvcnQgZXZlbiBpZiB0aGUgbmF0aXZlIGZlYXR1cmUgaXMgYXZhaWxhYmxlXG4gIG9wdGlvbnMuYmluZCAgICAgICAgICAgLSBiaW5kIG1ldGhvZHMgdG8gdGhlIHRhcmdldCwgcmVxdWlyZWQgZm9yIHRoZSBgcHVyZWAgdmVyc2lvblxuICBvcHRpb25zLndyYXAgICAgICAgICAgIC0gd3JhcCBjb25zdHJ1Y3RvcnMgdG8gcHJldmVudGluZyBnbG9iYWwgcG9sbHV0aW9uLCByZXF1aXJlZCBmb3IgdGhlIGBwdXJlYCB2ZXJzaW9uXG4gIG9wdGlvbnMudW5zYWZlICAgICAgICAgLSB1c2UgdGhlIHNpbXBsZSBhc3NpZ25tZW50IG9mIHByb3BlcnR5IGluc3RlYWQgb2YgZGVsZXRlICsgZGVmaW5lUHJvcGVydHlcbiAgb3B0aW9ucy5zaGFtICAgICAgICAgICAtIGFkZCBhIGZsYWcgdG8gbm90IGNvbXBsZXRlbHkgZnVsbCBwb2x5ZmlsbHNcbiAgb3B0aW9ucy5lbnVtZXJhYmxlICAgICAtIGV4cG9ydCBhcyBlbnVtZXJhYmxlIHByb3BlcnR5XG4gIG9wdGlvbnMuZG9udENhbGxHZXRTZXQgLSBwcmV2ZW50IGNhbGxpbmcgYSBnZXR0ZXIgb24gdGFyZ2V0XG4gIG9wdGlvbnMubmFtZSAgICAgICAgICAgLSB0aGUgLm5hbWUgb2YgdGhlIGZ1bmN0aW9uIGlmIGl0IGRvZXMgbm90IG1hdGNoIHRoZSBrZXlcbiovXG5tb2R1bGUuZXhwb3J0cyA9IGZ1bmN0aW9uIChvcHRpb25zLCBzb3VyY2UpIHtcbiAgdmFyIFRBUkdFVCA9IG9wdGlvbnMudGFyZ2V0O1xuICB2YXIgR0xPQkFMID0gb3B0aW9ucy5nbG9iYWw7XG4gIHZhciBTVEFUSUMgPSBvcHRpb25zLnN0YXQ7XG4gIHZhciBGT1JDRUQsIHRhcmdldCwga2V5LCB0YXJnZXRQcm9wZXJ0eSwgc291cmNlUHJvcGVydHksIGRlc2NyaXB0b3I7XG4gIGlmIChHTE9CQUwpIHtcbiAgICB0YXJnZXQgPSBnbG9iYWw7XG4gIH0gZWxzZSBpZiAoU1RBVElDKSB7XG4gICAgdGFyZ2V0ID0gZ2xvYmFsW1RBUkdFVF0gfHwgZGVmaW5lR2xvYmFsUHJvcGVydHkoVEFSR0VULCB7fSk7XG4gIH0gZWxzZSB7XG4gICAgdGFyZ2V0ID0gZ2xvYmFsW1RBUkdFVF0gJiYgZ2xvYmFsW1RBUkdFVF0ucHJvdG90eXBlO1xuICB9XG4gIGlmICh0YXJnZXQpIGZvciAoa2V5IGluIHNvdXJjZSkge1xuICAgIHNvdXJjZVByb3BlcnR5ID0gc291cmNlW2tleV07XG4gICAgaWYgKG9wdGlvbnMuZG9udENhbGxHZXRTZXQpIHtcbiAgICAgIGRlc2NyaXB0b3IgPSBnZXRPd25Qcm9wZXJ0eURlc2NyaXB0b3IodGFyZ2V0LCBrZXkpO1xuICAgICAgdGFyZ2V0UHJvcGVydHkgPSBkZXNjcmlwdG9yICYmIGRlc2NyaXB0b3IudmFsdWU7XG4gICAgfSBlbHNlIHRhcmdldFByb3BlcnR5ID0gdGFyZ2V0W2tleV07XG4gICAgRk9SQ0VEID0gaXNGb3JjZWQoR0xPQkFMID8ga2V5IDogVEFSR0VUICsgKFNUQVRJQyA/ICcuJyA6ICcjJykgKyBrZXksIG9wdGlvbnMuZm9yY2VkKTtcbiAgICAvLyBjb250YWluZWQgaW4gdGFyZ2V0XG4gICAgaWYgKCFGT1JDRUQgJiYgdGFyZ2V0UHJvcGVydHkgIT09IHVuZGVmaW5lZCkge1xuICAgICAgaWYgKHR5cGVvZiBzb3VyY2VQcm9wZXJ0eSA9PSB0eXBlb2YgdGFyZ2V0UHJvcGVydHkpIGNvbnRpbnVlO1xuICAgICAgY29weUNvbnN0cnVjdG9yUHJvcGVydGllcyhzb3VyY2VQcm9wZXJ0eSwgdGFyZ2V0UHJvcGVydHkpO1xuICAgIH1cbiAgICAvLyBhZGQgYSBmbGFnIHRvIG5vdCBjb21wbGV0ZWx5IGZ1bGwgcG9seWZpbGxzXG4gICAgaWYgKG9wdGlvbnMuc2hhbSB8fCAodGFyZ2V0UHJvcGVydHkgJiYgdGFyZ2V0UHJvcGVydHkuc2hhbSkpIHtcbiAgICAgIGNyZWF0ZU5vbkVudW1lcmFibGVQcm9wZXJ0eShzb3VyY2VQcm9wZXJ0eSwgJ3NoYW0nLCB0cnVlKTtcbiAgICB9XG4gICAgZGVmaW5lQnVpbHRJbih0YXJnZXQsIGtleSwgc291cmNlUHJvcGVydHksIG9wdGlvbnMpO1xuICB9XG59O1xuIiwiJ3VzZSBzdHJpY3QnO1xubW9kdWxlLmV4cG9ydHMgPSBmdW5jdGlvbiAoZXhlYykge1xuICB0cnkge1xuICAgIHJldHVybiAhIWV4ZWMoKTtcbiAgfSBjYXRjaCAoZXJyb3IpIHtcbiAgICByZXR1cm4gdHJ1ZTtcbiAgfVxufTtcbiIsIid1c2Ugc3RyaWN0Jztcbi8vIFRPRE86IFJlbW92ZSBmcm9tIGBjb3JlLWpzQDRgIHNpbmNlIGl0J3MgbW92ZWQgdG8gZW50cnkgcG9pbnRzXG5yZXF1aXJlKCcuLi9tb2R1bGVzL2VzLnJlZ2V4cC5leGVjJyk7XG52YXIgY2FsbCA9IHJlcXVpcmUoJy4uL2ludGVybmFscy9mdW5jdGlvbi1jYWxsJyk7XG52YXIgZGVmaW5lQnVpbHRJbiA9IHJlcXVpcmUoJy4uL2ludGVybmFscy9kZWZpbmUtYnVpbHQtaW4nKTtcbnZhciByZWdleHBFeGVjID0gcmVxdWlyZSgnLi4vaW50ZXJuYWxzL3JlZ2V4cC1leGVjJyk7XG52YXIgZmFpbHMgPSByZXF1aXJlKCcuLi9pbnRlcm5hbHMvZmFpbHMnKTtcbnZhciB3ZWxsS25vd25TeW1ib2wgPSByZXF1aXJlKCcuLi9pbnRlcm5hbHMvd2VsbC1rbm93bi1zeW1ib2wnKTtcbnZhciBjcmVhdGVOb25FbnVtZXJhYmxlUHJvcGVydHkgPSByZXF1aXJlKCcuLi9pbnRlcm5hbHMvY3JlYXRlLW5vbi1lbnVtZXJhYmxlLXByb3BlcnR5Jyk7XG5cbnZhciBTUEVDSUVTID0gd2VsbEtub3duU3ltYm9sKCdzcGVjaWVzJyk7XG52YXIgUmVnRXhwUHJvdG90eXBlID0gUmVnRXhwLnByb3RvdHlwZTtcblxubW9kdWxlLmV4cG9ydHMgPSBmdW5jdGlvbiAoS0VZLCBleGVjLCBGT1JDRUQsIFNIQU0pIHtcbiAgdmFyIFNZTUJPTCA9IHdlbGxLbm93blN5bWJvbChLRVkpO1xuXG4gIHZhciBERUxFR0FURVNfVE9fU1lNQk9MID0gIWZhaWxzKGZ1bmN0aW9uICgpIHtcbiAgICAvLyBTdHJpbmcgbWV0aG9kcyBjYWxsIHN5bWJvbC1uYW1lZCBSZWdFeHAgbWV0aG9kc1xuICAgIHZhciBPID0ge307XG4gICAgT1tTWU1CT0xdID0gZnVuY3Rpb24gKCkgeyByZXR1cm4gNzsgfTtcbiAgICByZXR1cm4gJydbS0VZXShPKSAhPT0gNztcbiAgfSk7XG5cbiAgdmFyIERFTEVHQVRFU19UT19FWEVDID0gREVMRUdBVEVTX1RPX1NZTUJPTCAmJiAhZmFpbHMoZnVuY3Rpb24gKCkge1xuICAgIC8vIFN5bWJvbC1uYW1lZCBSZWdFeHAgbWV0aG9kcyBjYWxsIC5leGVjXG4gICAgdmFyIGV4ZWNDYWxsZWQgPSBmYWxzZTtcbiAgICB2YXIgcmUgPSAvYS87XG5cbiAgICBpZiAoS0VZID09PSAnc3BsaXQnKSB7XG4gICAgICAvLyBXZSBjYW4ndCB1c2UgcmVhbCByZWdleCBoZXJlIHNpbmNlIGl0IGNhdXNlcyBkZW9wdGltaXphdGlvblxuICAgICAgLy8gYW5kIHNlcmlvdXMgcGVyZm9ybWFuY2UgZGVncmFkYXRpb24gaW4gVjhcbiAgICAgIC8vIGh0dHBzOi8vZ2l0aHViLmNvbS96bG9pcm9jay9jb3JlLWpzL2lzc3Vlcy8zMDZcbiAgICAgIHJlID0ge307XG4gICAgICAvLyBSZWdFeHBbQEBzcGxpdF0gZG9lc24ndCBjYWxsIHRoZSByZWdleCdzIGV4ZWMgbWV0aG9kLCBidXQgZmlyc3QgY3JlYXRlc1xuICAgICAgLy8gYSBuZXcgb25lLiBXZSBuZWVkIHRvIHJldHVybiB0aGUgcGF0Y2hlZCByZWdleCB3aGVuIGNyZWF0aW5nIHRoZSBuZXcgb25lLlxuICAgICAgcmUuY29uc3RydWN0b3IgPSB7fTtcbiAgICAgIHJlLmNvbnN0cnVjdG9yW1NQRUNJRVNdID0gZnVuY3Rpb24gKCkgeyByZXR1cm4gcmU7IH07XG4gICAgICByZS5mbGFncyA9ICcnO1xuICAgICAgcmVbU1lNQk9MXSA9IC8uL1tTWU1CT0xdO1xuICAgIH1cblxuICAgIHJlLmV4ZWMgPSBmdW5jdGlvbiAoKSB7XG4gICAgICBleGVjQ2FsbGVkID0gdHJ1ZTtcbiAgICAgIHJldHVybiBudWxsO1xuICAgIH07XG5cbiAgICByZVtTWU1CT0xdKCcnKTtcbiAgICByZXR1cm4gIWV4ZWNDYWxsZWQ7XG4gIH0pO1xuXG4gIGlmIChcbiAgICAhREVMRUdBVEVTX1RPX1NZTUJPTCB8fFxuICAgICFERUxFR0FURVNfVE9fRVhFQyB8fFxuICAgIEZPUkNFRFxuICApIHtcbiAgICB2YXIgbmF0aXZlUmVnRXhwTWV0aG9kID0gLy4vW1NZTUJPTF07XG4gICAgdmFyIG1ldGhvZHMgPSBleGVjKFNZTUJPTCwgJydbS0VZXSwgZnVuY3Rpb24gKG5hdGl2ZU1ldGhvZCwgcmVnZXhwLCBzdHIsIGFyZzIsIGZvcmNlU3RyaW5nTWV0aG9kKSB7XG4gICAgICB2YXIgJGV4ZWMgPSByZWdleHAuZXhlYztcbiAgICAgIGlmICgkZXhlYyA9PT0gcmVnZXhwRXhlYyB8fCAkZXhlYyA9PT0gUmVnRXhwUHJvdG90eXBlLmV4ZWMpIHtcbiAgICAgICAgaWYgKERFTEVHQVRFU19UT19TWU1CT0wgJiYgIWZvcmNlU3RyaW5nTWV0aG9kKSB7XG4gICAgICAgICAgLy8gVGhlIG5hdGl2ZSBTdHJpbmcgbWV0aG9kIGFscmVhZHkgZGVsZWdhdGVzIHRvIEBAbWV0aG9kICh0aGlzXG4gICAgICAgICAgLy8gcG9seWZpbGxlZCBmdW5jdGlvbiksIGxlYXNpbmcgdG8gaW5maW5pdGUgcmVjdXJzaW9uLlxuICAgICAgICAgIC8vIFdlIGF2b2lkIGl0IGJ5IGRpcmVjdGx5IGNhbGxpbmcgdGhlIG5hdGl2ZSBAQG1ldGhvZCBtZXRob2QuXG4gICAgICAgICAgcmV0dXJuIHsgZG9uZTogdHJ1ZSwgdmFsdWU6IGNhbGwobmF0aXZlUmVnRXhwTWV0aG9kLCByZWdleHAsIHN0ciwgYXJnMikgfTtcbiAgICAgICAgfVxuICAgICAgICByZXR1cm4geyBkb25lOiB0cnVlLCB2YWx1ZTogY2FsbChuYXRpdmVNZXRob2QsIHN0ciwgcmVnZXhwLCBhcmcyKSB9O1xuICAgICAgfVxuICAgICAgcmV0dXJuIHsgZG9uZTogZmFsc2UgfTtcbiAgICB9KTtcblxuICAgIGRlZmluZUJ1aWx0SW4oU3RyaW5nLnByb3RvdHlwZSwgS0VZLCBtZXRob2RzWzBdKTtcbiAgICBkZWZpbmVCdWlsdEluKFJlZ0V4cFByb3RvdHlwZSwgU1lNQk9MLCBtZXRob2RzWzFdKTtcbiAgfVxuXG4gIGlmIChTSEFNKSBjcmVhdGVOb25FbnVtZXJhYmxlUHJvcGVydHkoUmVnRXhwUHJvdG90eXBlW1NZTUJPTF0sICdzaGFtJywgdHJ1ZSk7XG59O1xuIiwiJ3VzZSBzdHJpY3QnO1xudmFyIE5BVElWRV9CSU5EID0gcmVxdWlyZSgnLi4vaW50ZXJuYWxzL2Z1bmN0aW9uLWJpbmQtbmF0aXZlJyk7XG5cbnZhciBGdW5jdGlvblByb3RvdHlwZSA9IEZ1bmN0aW9uLnByb3RvdHlwZTtcbnZhciBhcHBseSA9IEZ1bmN0aW9uUHJvdG90eXBlLmFwcGx5O1xudmFyIGNhbGwgPSBGdW5jdGlvblByb3RvdHlwZS5jYWxsO1xuXG4vLyBlc2xpbnQtZGlzYWJsZS1uZXh0LWxpbmUgZXMvbm8tcmVmbGVjdCAtLSBzYWZlXG5tb2R1bGUuZXhwb3J0cyA9IHR5cGVvZiBSZWZsZWN0ID09ICdvYmplY3QnICYmIFJlZmxlY3QuYXBwbHkgfHwgKE5BVElWRV9CSU5EID8gY2FsbC5iaW5kKGFwcGx5KSA6IGZ1bmN0aW9uICgpIHtcbiAgcmV0dXJuIGNhbGwuYXBwbHkoYXBwbHksIGFyZ3VtZW50cyk7XG59KTtcbiIsIid1c2Ugc3RyaWN0JztcbnZhciB1bmN1cnJ5VGhpcyA9IHJlcXVpcmUoJy4uL2ludGVybmFscy9mdW5jdGlvbi11bmN1cnJ5LXRoaXMtY2xhdXNlJyk7XG52YXIgYUNhbGxhYmxlID0gcmVxdWlyZSgnLi4vaW50ZXJuYWxzL2EtY2FsbGFibGUnKTtcbnZhciBOQVRJVkVfQklORCA9IHJlcXVpcmUoJy4uL2ludGVybmFscy9mdW5jdGlvbi1iaW5kLW5hdGl2ZScpO1xuXG52YXIgYmluZCA9IHVuY3VycnlUaGlzKHVuY3VycnlUaGlzLmJpbmQpO1xuXG4vLyBvcHRpb25hbCAvIHNpbXBsZSBjb250ZXh0IGJpbmRpbmdcbm1vZHVsZS5leHBvcnRzID0gZnVuY3Rpb24gKGZuLCB0aGF0KSB7XG4gIGFDYWxsYWJsZShmbik7XG4gIHJldHVybiB0aGF0ID09PSB1bmRlZmluZWQgPyBmbiA6IE5BVElWRV9CSU5EID8gYmluZChmbiwgdGhhdCkgOiBmdW5jdGlvbiAoLyogLi4uYXJncyAqLykge1xuICAgIHJldHVybiBmbi5hcHBseSh0aGF0LCBhcmd1bWVudHMpO1xuICB9O1xufTtcbiIsIid1c2Ugc3RyaWN0JztcbnZhciBmYWlscyA9IHJlcXVpcmUoJy4uL2ludGVybmFscy9mYWlscycpO1xuXG5tb2R1bGUuZXhwb3J0cyA9ICFmYWlscyhmdW5jdGlvbiAoKSB7XG4gIC8vIGVzbGludC1kaXNhYmxlLW5leHQtbGluZSBlcy9uby1mdW5jdGlvbi1wcm90b3R5cGUtYmluZCAtLSBzYWZlXG4gIHZhciB0ZXN0ID0gKGZ1bmN0aW9uICgpIHsgLyogZW1wdHkgKi8gfSkuYmluZCgpO1xuICAvLyBlc2xpbnQtZGlzYWJsZS1uZXh0LWxpbmUgbm8tcHJvdG90eXBlLWJ1aWx0aW5zIC0tIHNhZmVcbiAgcmV0dXJuIHR5cGVvZiB0ZXN0ICE9ICdmdW5jdGlvbicgfHwgdGVzdC5oYXNPd25Qcm9wZXJ0eSgncHJvdG90eXBlJyk7XG59KTtcbiIsIid1c2Ugc3RyaWN0JztcbnZhciBOQVRJVkVfQklORCA9IHJlcXVpcmUoJy4uL2ludGVybmFscy9mdW5jdGlvbi1iaW5kLW5hdGl2ZScpO1xuXG52YXIgY2FsbCA9IEZ1bmN0aW9uLnByb3RvdHlwZS5jYWxsO1xuXG5tb2R1bGUuZXhwb3J0cyA9IE5BVElWRV9CSU5EID8gY2FsbC5iaW5kKGNhbGwpIDogZnVuY3Rpb24gKCkge1xuICByZXR1cm4gY2FsbC5hcHBseShjYWxsLCBhcmd1bWVudHMpO1xufTtcbiIsIid1c2Ugc3RyaWN0JztcbnZhciBERVNDUklQVE9SUyA9IHJlcXVpcmUoJy4uL2ludGVybmFscy9kZXNjcmlwdG9ycycpO1xudmFyIGhhc093biA9IHJlcXVpcmUoJy4uL2ludGVybmFscy9oYXMtb3duLXByb3BlcnR5Jyk7XG5cbnZhciBGdW5jdGlvblByb3RvdHlwZSA9IEZ1bmN0aW9uLnByb3RvdHlwZTtcbi8vIGVzbGludC1kaXNhYmxlLW5leHQtbGluZSBlcy9uby1vYmplY3QtZ2V0b3ducHJvcGVydHlkZXNjcmlwdG9yIC0tIHNhZmVcbnZhciBnZXREZXNjcmlwdG9yID0gREVTQ1JJUFRPUlMgJiYgT2JqZWN0LmdldE93blByb3BlcnR5RGVzY3JpcHRvcjtcblxudmFyIEVYSVNUUyA9IGhhc093bihGdW5jdGlvblByb3RvdHlwZSwgJ25hbWUnKTtcbi8vIGFkZGl0aW9uYWwgcHJvdGVjdGlvbiBmcm9tIG1pbmlmaWVkIC8gbWFuZ2xlZCAvIGRyb3BwZWQgZnVuY3Rpb24gbmFtZXNcbnZhciBQUk9QRVIgPSBFWElTVFMgJiYgKGZ1bmN0aW9uIHNvbWV0aGluZygpIHsgLyogZW1wdHkgKi8gfSkubmFtZSA9PT0gJ3NvbWV0aGluZyc7XG52YXIgQ09ORklHVVJBQkxFID0gRVhJU1RTICYmICghREVTQ1JJUFRPUlMgfHwgKERFU0NSSVBUT1JTICYmIGdldERlc2NyaXB0b3IoRnVuY3Rpb25Qcm90b3R5cGUsICduYW1lJykuY29uZmlndXJhYmxlKSk7XG5cbm1vZHVsZS5leHBvcnRzID0ge1xuICBFWElTVFM6IEVYSVNUUyxcbiAgUFJPUEVSOiBQUk9QRVIsXG4gIENPTkZJR1VSQUJMRTogQ09ORklHVVJBQkxFXG59O1xuIiwiJ3VzZSBzdHJpY3QnO1xudmFyIHVuY3VycnlUaGlzID0gcmVxdWlyZSgnLi4vaW50ZXJuYWxzL2Z1bmN0aW9uLXVuY3VycnktdGhpcycpO1xudmFyIGFDYWxsYWJsZSA9IHJlcXVpcmUoJy4uL2ludGVybmFscy9hLWNhbGxhYmxlJyk7XG5cbm1vZHVsZS5leHBvcnRzID0gZnVuY3Rpb24gKG9iamVjdCwga2V5LCBtZXRob2QpIHtcbiAgdHJ5IHtcbiAgICAvLyBlc2xpbnQtZGlzYWJsZS1uZXh0LWxpbmUgZXMvbm8tb2JqZWN0LWdldG93bnByb3BlcnR5ZGVzY3JpcHRvciAtLSBzYWZlXG4gICAgcmV0dXJuIHVuY3VycnlUaGlzKGFDYWxsYWJsZShPYmplY3QuZ2V0T3duUHJvcGVydHlEZXNjcmlwdG9yKG9iamVjdCwga2V5KVttZXRob2RdKSk7XG4gIH0gY2F0Y2ggKGVycm9yKSB7IC8qIGVtcHR5ICovIH1cbn07XG4iLCIndXNlIHN0cmljdCc7XG52YXIgY2xhc3NvZlJhdyA9IHJlcXVpcmUoJy4uL2ludGVybmFscy9jbGFzc29mLXJhdycpO1xudmFyIHVuY3VycnlUaGlzID0gcmVxdWlyZSgnLi4vaW50ZXJuYWxzL2Z1bmN0aW9uLXVuY3VycnktdGhpcycpO1xuXG5tb2R1bGUuZXhwb3J0cyA9IGZ1bmN0aW9uIChmbikge1xuICAvLyBOYXNob3JuIGJ1ZzpcbiAgLy8gICBodHRwczovL2dpdGh1Yi5jb20vemxvaXJvY2svY29yZS1qcy9pc3N1ZXMvMTEyOFxuICAvLyAgIGh0dHBzOi8vZ2l0aHViLmNvbS96bG9pcm9jay9jb3JlLWpzL2lzc3Vlcy8xMTMwXG4gIGlmIChjbGFzc29mUmF3KGZuKSA9PT0gJ0Z1bmN0aW9uJykgcmV0dXJuIHVuY3VycnlUaGlzKGZuKTtcbn07XG4iLCIndXNlIHN0cmljdCc7XG52YXIgTkFUSVZFX0JJTkQgPSByZXF1aXJlKCcuLi9pbnRlcm5hbHMvZnVuY3Rpb24tYmluZC1uYXRpdmUnKTtcblxudmFyIEZ1bmN0aW9uUHJvdG90eXBlID0gRnVuY3Rpb24ucHJvdG90eXBlO1xudmFyIGNhbGwgPSBGdW5jdGlvblByb3RvdHlwZS5jYWxsO1xudmFyIHVuY3VycnlUaGlzV2l0aEJpbmQgPSBOQVRJVkVfQklORCAmJiBGdW5jdGlvblByb3RvdHlwZS5iaW5kLmJpbmQoY2FsbCwgY2FsbCk7XG5cbm1vZHVsZS5leHBvcnRzID0gTkFUSVZFX0JJTkQgPyB1bmN1cnJ5VGhpc1dpdGhCaW5kIDogZnVuY3Rpb24gKGZuKSB7XG4gIHJldHVybiBmdW5jdGlvbiAoKSB7XG4gICAgcmV0dXJuIGNhbGwuYXBwbHkoZm4sIGFyZ3VtZW50cyk7XG4gIH07XG59O1xuIiwiJ3VzZSBzdHJpY3QnO1xudmFyIGdsb2JhbCA9IHJlcXVpcmUoJy4uL2ludGVybmFscy9nbG9iYWwnKTtcbnZhciBpc0NhbGxhYmxlID0gcmVxdWlyZSgnLi4vaW50ZXJuYWxzL2lzLWNhbGxhYmxlJyk7XG5cbnZhciBhRnVuY3Rpb24gPSBmdW5jdGlvbiAoYXJndW1lbnQpIHtcbiAgcmV0dXJuIGlzQ2FsbGFibGUoYXJndW1lbnQpID8gYXJndW1lbnQgOiB1bmRlZmluZWQ7XG59O1xuXG5tb2R1bGUuZXhwb3J0cyA9IGZ1bmN0aW9uIChuYW1lc3BhY2UsIG1ldGhvZCkge1xuICByZXR1cm4gYXJndW1lbnRzLmxlbmd0aCA8IDIgPyBhRnVuY3Rpb24oZ2xvYmFsW25hbWVzcGFjZV0pIDogZ2xvYmFsW25hbWVzcGFjZV0gJiYgZ2xvYmFsW25hbWVzcGFjZV1bbWV0aG9kXTtcbn07XG4iLCIndXNlIHN0cmljdCc7XG52YXIgY2xhc3NvZiA9IHJlcXVpcmUoJy4uL2ludGVybmFscy9jbGFzc29mJyk7XG52YXIgZ2V0TWV0aG9kID0gcmVxdWlyZSgnLi4vaW50ZXJuYWxzL2dldC1tZXRob2QnKTtcbnZhciBpc051bGxPclVuZGVmaW5lZCA9IHJlcXVpcmUoJy4uL2ludGVybmFscy9pcy1udWxsLW9yLXVuZGVmaW5lZCcpO1xudmFyIEl0ZXJhdG9ycyA9IHJlcXVpcmUoJy4uL2ludGVybmFscy9pdGVyYXRvcnMnKTtcbnZhciB3ZWxsS25vd25TeW1ib2wgPSByZXF1aXJlKCcuLi9pbnRlcm5hbHMvd2VsbC1rbm93bi1zeW1ib2wnKTtcblxudmFyIElURVJBVE9SID0gd2VsbEtub3duU3ltYm9sKCdpdGVyYXRvcicpO1xuXG5tb2R1bGUuZXhwb3J0cyA9IGZ1bmN0aW9uIChpdCkge1xuICBpZiAoIWlzTnVsbE9yVW5kZWZpbmVkKGl0KSkgcmV0dXJuIGdldE1ldGhvZChpdCwgSVRFUkFUT1IpXG4gICAgfHwgZ2V0TWV0aG9kKGl0LCAnQEBpdGVyYXRvcicpXG4gICAgfHwgSXRlcmF0b3JzW2NsYXNzb2YoaXQpXTtcbn07XG4iLCIndXNlIHN0cmljdCc7XG52YXIgY2FsbCA9IHJlcXVpcmUoJy4uL2ludGVybmFscy9mdW5jdGlvbi1jYWxsJyk7XG52YXIgYUNhbGxhYmxlID0gcmVxdWlyZSgnLi4vaW50ZXJuYWxzL2EtY2FsbGFibGUnKTtcbnZhciBhbk9iamVjdCA9IHJlcXVpcmUoJy4uL2ludGVybmFscy9hbi1vYmplY3QnKTtcbnZhciB0cnlUb1N0cmluZyA9IHJlcXVpcmUoJy4uL2ludGVybmFscy90cnktdG8tc3RyaW5nJyk7XG52YXIgZ2V0SXRlcmF0b3JNZXRob2QgPSByZXF1aXJlKCcuLi9pbnRlcm5hbHMvZ2V0LWl0ZXJhdG9yLW1ldGhvZCcpO1xuXG52YXIgJFR5cGVFcnJvciA9IFR5cGVFcnJvcjtcblxubW9kdWxlLmV4cG9ydHMgPSBmdW5jdGlvbiAoYXJndW1lbnQsIHVzaW5nSXRlcmF0b3IpIHtcbiAgdmFyIGl0ZXJhdG9yTWV0aG9kID0gYXJndW1lbnRzLmxlbmd0aCA8IDIgPyBnZXRJdGVyYXRvck1ldGhvZChhcmd1bWVudCkgOiB1c2luZ0l0ZXJhdG9yO1xuICBpZiAoYUNhbGxhYmxlKGl0ZXJhdG9yTWV0aG9kKSkgcmV0dXJuIGFuT2JqZWN0KGNhbGwoaXRlcmF0b3JNZXRob2QsIGFyZ3VtZW50KSk7XG4gIHRocm93IG5ldyAkVHlwZUVycm9yKHRyeVRvU3RyaW5nKGFyZ3VtZW50KSArICcgaXMgbm90IGl0ZXJhYmxlJyk7XG59O1xuIiwiJ3VzZSBzdHJpY3QnO1xudmFyIGFDYWxsYWJsZSA9IHJlcXVpcmUoJy4uL2ludGVybmFscy9hLWNhbGxhYmxlJyk7XG52YXIgaXNOdWxsT3JVbmRlZmluZWQgPSByZXF1aXJlKCcuLi9pbnRlcm5hbHMvaXMtbnVsbC1vci11bmRlZmluZWQnKTtcblxuLy8gYEdldE1ldGhvZGAgYWJzdHJhY3Qgb3BlcmF0aW9uXG4vLyBodHRwczovL3RjMzkuZXMvZWNtYTI2Mi8jc2VjLWdldG1ldGhvZFxubW9kdWxlLmV4cG9ydHMgPSBmdW5jdGlvbiAoViwgUCkge1xuICB2YXIgZnVuYyA9IFZbUF07XG4gIHJldHVybiBpc051bGxPclVuZGVmaW5lZChmdW5jKSA/IHVuZGVmaW5lZCA6IGFDYWxsYWJsZShmdW5jKTtcbn07XG4iLCIndXNlIHN0cmljdCc7XG52YXIgdW5jdXJyeVRoaXMgPSByZXF1aXJlKCcuLi9pbnRlcm5hbHMvZnVuY3Rpb24tdW5jdXJyeS10aGlzJyk7XG52YXIgdG9PYmplY3QgPSByZXF1aXJlKCcuLi9pbnRlcm5hbHMvdG8tb2JqZWN0Jyk7XG5cbnZhciBmbG9vciA9IE1hdGguZmxvb3I7XG52YXIgY2hhckF0ID0gdW5jdXJyeVRoaXMoJycuY2hhckF0KTtcbnZhciByZXBsYWNlID0gdW5jdXJyeVRoaXMoJycucmVwbGFjZSk7XG52YXIgc3RyaW5nU2xpY2UgPSB1bmN1cnJ5VGhpcygnJy5zbGljZSk7XG4vLyBlc2xpbnQtZGlzYWJsZS1uZXh0LWxpbmUgcmVkb3Mvbm8tdnVsbmVyYWJsZSAtLSBzYWZlXG52YXIgU1VCU1RJVFVUSU9OX1NZTUJPTFMgPSAvXFwkKFskJidgXXxcXGR7MSwyfXw8W14+XSo+KS9nO1xudmFyIFNVQlNUSVRVVElPTl9TWU1CT0xTX05PX05BTUVEID0gL1xcJChbJCYnYF18XFxkezEsMn0pL2c7XG5cbi8vIGBHZXRTdWJzdGl0dXRpb25gIGFic3RyYWN0IG9wZXJhdGlvblxuLy8gaHR0cHM6Ly90YzM5LmVzL2VjbWEyNjIvI3NlYy1nZXRzdWJzdGl0dXRpb25cbm1vZHVsZS5leHBvcnRzID0gZnVuY3Rpb24gKG1hdGNoZWQsIHN0ciwgcG9zaXRpb24sIGNhcHR1cmVzLCBuYW1lZENhcHR1cmVzLCByZXBsYWNlbWVudCkge1xuICB2YXIgdGFpbFBvcyA9IHBvc2l0aW9uICsgbWF0Y2hlZC5sZW5ndGg7XG4gIHZhciBtID0gY2FwdHVyZXMubGVuZ3RoO1xuICB2YXIgc3ltYm9scyA9IFNVQlNUSVRVVElPTl9TWU1CT0xTX05PX05BTUVEO1xuICBpZiAobmFtZWRDYXB0dXJlcyAhPT0gdW5kZWZpbmVkKSB7XG4gICAgbmFtZWRDYXB0dXJlcyA9IHRvT2JqZWN0KG5hbWVkQ2FwdHVyZXMpO1xuICAgIHN5bWJvbHMgPSBTVUJTVElUVVRJT05fU1lNQk9MUztcbiAgfVxuICByZXR1cm4gcmVwbGFjZShyZXBsYWNlbWVudCwgc3ltYm9scywgZnVuY3Rpb24gKG1hdGNoLCBjaCkge1xuICAgIHZhciBjYXB0dXJlO1xuICAgIHN3aXRjaCAoY2hhckF0KGNoLCAwKSkge1xuICAgICAgY2FzZSAnJCc6IHJldHVybiAnJCc7XG4gICAgICBjYXNlICcmJzogcmV0dXJuIG1hdGNoZWQ7XG4gICAgICBjYXNlICdgJzogcmV0dXJuIHN0cmluZ1NsaWNlKHN0ciwgMCwgcG9zaXRpb24pO1xuICAgICAgY2FzZSBcIidcIjogcmV0dXJuIHN0cmluZ1NsaWNlKHN0ciwgdGFpbFBvcyk7XG4gICAgICBjYXNlICc8JzpcbiAgICAgICAgY2FwdHVyZSA9IG5hbWVkQ2FwdHVyZXNbc3RyaW5nU2xpY2UoY2gsIDEsIC0xKV07XG4gICAgICAgIGJyZWFrO1xuICAgICAgZGVmYXVsdDogLy8gXFxkXFxkP1xuICAgICAgICB2YXIgbiA9ICtjaDtcbiAgICAgICAgaWYgKG4gPT09IDApIHJldHVybiBtYXRjaDtcbiAgICAgICAgaWYgKG4gPiBtKSB7XG4gICAgICAgICAgdmFyIGYgPSBmbG9vcihuIC8gMTApO1xuICAgICAgICAgIGlmIChmID09PSAwKSByZXR1cm4gbWF0Y2g7XG4gICAgICAgICAgaWYgKGYgPD0gbSkgcmV0dXJuIGNhcHR1cmVzW2YgLSAxXSA9PT0gdW5kZWZpbmVkID8gY2hhckF0KGNoLCAxKSA6IGNhcHR1cmVzW2YgLSAxXSArIGNoYXJBdChjaCwgMSk7XG4gICAgICAgICAgcmV0dXJuIG1hdGNoO1xuICAgICAgICB9XG4gICAgICAgIGNhcHR1cmUgPSBjYXB0dXJlc1tuIC0gMV07XG4gICAgfVxuICAgIHJldHVybiBjYXB0dXJlID09PSB1bmRlZmluZWQgPyAnJyA6IGNhcHR1cmU7XG4gIH0pO1xufTtcbiIsIid1c2Ugc3RyaWN0JztcbnZhciBjaGVjayA9IGZ1bmN0aW9uIChpdCkge1xuICByZXR1cm4gaXQgJiYgaXQuTWF0aCA9PT0gTWF0aCAmJiBpdDtcbn07XG5cbi8vIGh0dHBzOi8vZ2l0aHViLmNvbS96bG9pcm9jay9jb3JlLWpzL2lzc3Vlcy84NiNpc3N1ZWNvbW1lbnQtMTE1NzU5MDI4XG5tb2R1bGUuZXhwb3J0cyA9XG4gIC8vIGVzbGludC1kaXNhYmxlLW5leHQtbGluZSBlcy9uby1nbG9iYWwtdGhpcyAtLSBzYWZlXG4gIGNoZWNrKHR5cGVvZiBnbG9iYWxUaGlzID09ICdvYmplY3QnICYmIGdsb2JhbFRoaXMpIHx8XG4gIGNoZWNrKHR5cGVvZiB3aW5kb3cgPT0gJ29iamVjdCcgJiYgd2luZG93KSB8fFxuICAvLyBlc2xpbnQtZGlzYWJsZS1uZXh0LWxpbmUgbm8tcmVzdHJpY3RlZC1nbG9iYWxzIC0tIHNhZmVcbiAgY2hlY2sodHlwZW9mIHNlbGYgPT0gJ29iamVjdCcgJiYgc2VsZikgfHxcbiAgY2hlY2sodHlwZW9mIGdsb2JhbCA9PSAnb2JqZWN0JyAmJiBnbG9iYWwpIHx8XG4gIGNoZWNrKHR5cGVvZiB0aGlzID09ICdvYmplY3QnICYmIHRoaXMpIHx8XG4gIC8vIGVzbGludC1kaXNhYmxlLW5leHQtbGluZSBuby1uZXctZnVuYyAtLSBmYWxsYmFja1xuICAoZnVuY3Rpb24gKCkgeyByZXR1cm4gdGhpczsgfSkoKSB8fCBGdW5jdGlvbigncmV0dXJuIHRoaXMnKSgpO1xuIiwiJ3VzZSBzdHJpY3QnO1xudmFyIHVuY3VycnlUaGlzID0gcmVxdWlyZSgnLi4vaW50ZXJuYWxzL2Z1bmN0aW9uLXVuY3VycnktdGhpcycpO1xudmFyIHRvT2JqZWN0ID0gcmVxdWlyZSgnLi4vaW50ZXJuYWxzL3RvLW9iamVjdCcpO1xuXG52YXIgaGFzT3duUHJvcGVydHkgPSB1bmN1cnJ5VGhpcyh7fS5oYXNPd25Qcm9wZXJ0eSk7XG5cbi8vIGBIYXNPd25Qcm9wZXJ0eWAgYWJzdHJhY3Qgb3BlcmF0aW9uXG4vLyBodHRwczovL3RjMzkuZXMvZWNtYTI2Mi8jc2VjLWhhc293bnByb3BlcnR5XG4vLyBlc2xpbnQtZGlzYWJsZS1uZXh0LWxpbmUgZXMvbm8tb2JqZWN0LWhhc293biAtLSBzYWZlXG5tb2R1bGUuZXhwb3J0cyA9IE9iamVjdC5oYXNPd24gfHwgZnVuY3Rpb24gaGFzT3duKGl0LCBrZXkpIHtcbiAgcmV0dXJuIGhhc093blByb3BlcnR5KHRvT2JqZWN0KGl0KSwga2V5KTtcbn07XG4iLCIndXNlIHN0cmljdCc7XG5tb2R1bGUuZXhwb3J0cyA9IHt9O1xuIiwiJ3VzZSBzdHJpY3QnO1xudmFyIGdldEJ1aWx0SW4gPSByZXF1aXJlKCcuLi9pbnRlcm5hbHMvZ2V0LWJ1aWx0LWluJyk7XG5cbm1vZHVsZS5leHBvcnRzID0gZ2V0QnVpbHRJbignZG9jdW1lbnQnLCAnZG9jdW1lbnRFbGVtZW50Jyk7XG4iLCIndXNlIHN0cmljdCc7XG52YXIgREVTQ1JJUFRPUlMgPSByZXF1aXJlKCcuLi9pbnRlcm5hbHMvZGVzY3JpcHRvcnMnKTtcbnZhciBmYWlscyA9IHJlcXVpcmUoJy4uL2ludGVybmFscy9mYWlscycpO1xudmFyIGNyZWF0ZUVsZW1lbnQgPSByZXF1aXJlKCcuLi9pbnRlcm5hbHMvZG9jdW1lbnQtY3JlYXRlLWVsZW1lbnQnKTtcblxuLy8gVGhhbmtzIHRvIElFOCBmb3IgaXRzIGZ1bm55IGRlZmluZVByb3BlcnR5XG5tb2R1bGUuZXhwb3J0cyA9ICFERVNDUklQVE9SUyAmJiAhZmFpbHMoZnVuY3Rpb24gKCkge1xuICAvLyBlc2xpbnQtZGlzYWJsZS1uZXh0LWxpbmUgZXMvbm8tb2JqZWN0LWRlZmluZXByb3BlcnR5IC0tIHJlcXVpcmVkIGZvciB0ZXN0aW5nXG4gIHJldHVybiBPYmplY3QuZGVmaW5lUHJvcGVydHkoY3JlYXRlRWxlbWVudCgnZGl2JyksICdhJywge1xuICAgIGdldDogZnVuY3Rpb24gKCkgeyByZXR1cm4gNzsgfVxuICB9KS5hICE9PSA3O1xufSk7XG4iLCIndXNlIHN0cmljdCc7XG52YXIgdW5jdXJyeVRoaXMgPSByZXF1aXJlKCcuLi9pbnRlcm5hbHMvZnVuY3Rpb24tdW5jdXJyeS10aGlzJyk7XG52YXIgZmFpbHMgPSByZXF1aXJlKCcuLi9pbnRlcm5hbHMvZmFpbHMnKTtcbnZhciBjbGFzc29mID0gcmVxdWlyZSgnLi4vaW50ZXJuYWxzL2NsYXNzb2YtcmF3Jyk7XG5cbnZhciAkT2JqZWN0ID0gT2JqZWN0O1xudmFyIHNwbGl0ID0gdW5jdXJyeVRoaXMoJycuc3BsaXQpO1xuXG4vLyBmYWxsYmFjayBmb3Igbm9uLWFycmF5LWxpa2UgRVMzIGFuZCBub24tZW51bWVyYWJsZSBvbGQgVjggc3RyaW5nc1xubW9kdWxlLmV4cG9ydHMgPSBmYWlscyhmdW5jdGlvbiAoKSB7XG4gIC8vIHRocm93cyBhbiBlcnJvciBpbiByaGlubywgc2VlIGh0dHBzOi8vZ2l0aHViLmNvbS9tb3ppbGxhL3JoaW5vL2lzc3Vlcy8zNDZcbiAgLy8gZXNsaW50LWRpc2FibGUtbmV4dC1saW5lIG5vLXByb3RvdHlwZS1idWlsdGlucyAtLSBzYWZlXG4gIHJldHVybiAhJE9iamVjdCgneicpLnByb3BlcnR5SXNFbnVtZXJhYmxlKDApO1xufSkgPyBmdW5jdGlvbiAoaXQpIHtcbiAgcmV0dXJuIGNsYXNzb2YoaXQpID09PSAnU3RyaW5nJyA/IHNwbGl0KGl0LCAnJykgOiAkT2JqZWN0KGl0KTtcbn0gOiAkT2JqZWN0O1xuIiwiJ3VzZSBzdHJpY3QnO1xudmFyIGlzQ2FsbGFibGUgPSByZXF1aXJlKCcuLi9pbnRlcm5hbHMvaXMtY2FsbGFibGUnKTtcbnZhciBpc09iamVjdCA9IHJlcXVpcmUoJy4uL2ludGVybmFscy9pcy1vYmplY3QnKTtcbnZhciBzZXRQcm90b3R5cGVPZiA9IHJlcXVpcmUoJy4uL2ludGVybmFscy9vYmplY3Qtc2V0LXByb3RvdHlwZS1vZicpO1xuXG4vLyBtYWtlcyBzdWJjbGFzc2luZyB3b3JrIGNvcnJlY3QgZm9yIHdyYXBwZWQgYnVpbHQtaW5zXG5tb2R1bGUuZXhwb3J0cyA9IGZ1bmN0aW9uICgkdGhpcywgZHVtbXksIFdyYXBwZXIpIHtcbiAgdmFyIE5ld1RhcmdldCwgTmV3VGFyZ2V0UHJvdG90eXBlO1xuICBpZiAoXG4gICAgLy8gaXQgY2FuIHdvcmsgb25seSB3aXRoIG5hdGl2ZSBgc2V0UHJvdG90eXBlT2ZgXG4gICAgc2V0UHJvdG90eXBlT2YgJiZcbiAgICAvLyB3ZSBoYXZlbid0IGNvbXBsZXRlbHkgY29ycmVjdCBwcmUtRVM2IHdheSBmb3IgZ2V0dGluZyBgbmV3LnRhcmdldGAsIHNvIHVzZSB0aGlzXG4gICAgaXNDYWxsYWJsZShOZXdUYXJnZXQgPSBkdW1teS5jb25zdHJ1Y3RvcikgJiZcbiAgICBOZXdUYXJnZXQgIT09IFdyYXBwZXIgJiZcbiAgICBpc09iamVjdChOZXdUYXJnZXRQcm90b3R5cGUgPSBOZXdUYXJnZXQucHJvdG90eXBlKSAmJlxuICAgIE5ld1RhcmdldFByb3RvdHlwZSAhPT0gV3JhcHBlci5wcm90b3R5cGVcbiAgKSBzZXRQcm90b3R5cGVPZigkdGhpcywgTmV3VGFyZ2V0UHJvdG90eXBlKTtcbiAgcmV0dXJuICR0aGlzO1xufTtcbiIsIid1c2Ugc3RyaWN0JztcbnZhciB1bmN1cnJ5VGhpcyA9IHJlcXVpcmUoJy4uL2ludGVybmFscy9mdW5jdGlvbi11bmN1cnJ5LXRoaXMnKTtcbnZhciBpc0NhbGxhYmxlID0gcmVxdWlyZSgnLi4vaW50ZXJuYWxzL2lzLWNhbGxhYmxlJyk7XG52YXIgc3RvcmUgPSByZXF1aXJlKCcuLi9pbnRlcm5hbHMvc2hhcmVkLXN0b3JlJyk7XG5cbnZhciBmdW5jdGlvblRvU3RyaW5nID0gdW5jdXJyeVRoaXMoRnVuY3Rpb24udG9TdHJpbmcpO1xuXG4vLyB0aGlzIGhlbHBlciBicm9rZW4gaW4gYGNvcmUtanNAMy40LjEtMy40LjRgLCBzbyB3ZSBjYW4ndCB1c2UgYHNoYXJlZGAgaGVscGVyXG5pZiAoIWlzQ2FsbGFibGUoc3RvcmUuaW5zcGVjdFNvdXJjZSkpIHtcbiAgc3RvcmUuaW5zcGVjdFNvdXJjZSA9IGZ1bmN0aW9uIChpdCkge1xuICAgIHJldHVybiBmdW5jdGlvblRvU3RyaW5nKGl0KTtcbiAgfTtcbn1cblxubW9kdWxlLmV4cG9ydHMgPSBzdG9yZS5pbnNwZWN0U291cmNlO1xuIiwiJ3VzZSBzdHJpY3QnO1xudmFyIE5BVElWRV9XRUFLX01BUCA9IHJlcXVpcmUoJy4uL2ludGVybmFscy93ZWFrLW1hcC1iYXNpYy1kZXRlY3Rpb24nKTtcbnZhciBnbG9iYWwgPSByZXF1aXJlKCcuLi9pbnRlcm5hbHMvZ2xvYmFsJyk7XG52YXIgaXNPYmplY3QgPSByZXF1aXJlKCcuLi9pbnRlcm5hbHMvaXMtb2JqZWN0Jyk7XG52YXIgY3JlYXRlTm9uRW51bWVyYWJsZVByb3BlcnR5ID0gcmVxdWlyZSgnLi4vaW50ZXJuYWxzL2NyZWF0ZS1ub24tZW51bWVyYWJsZS1wcm9wZXJ0eScpO1xudmFyIGhhc093biA9IHJlcXVpcmUoJy4uL2ludGVybmFscy9oYXMtb3duLXByb3BlcnR5Jyk7XG52YXIgc2hhcmVkID0gcmVxdWlyZSgnLi4vaW50ZXJuYWxzL3NoYXJlZC1zdG9yZScpO1xudmFyIHNoYXJlZEtleSA9IHJlcXVpcmUoJy4uL2ludGVybmFscy9zaGFyZWQta2V5Jyk7XG52YXIgaGlkZGVuS2V5cyA9IHJlcXVpcmUoJy4uL2ludGVybmFscy9oaWRkZW4ta2V5cycpO1xuXG52YXIgT0JKRUNUX0FMUkVBRFlfSU5JVElBTElaRUQgPSAnT2JqZWN0IGFscmVhZHkgaW5pdGlhbGl6ZWQnO1xudmFyIFR5cGVFcnJvciA9IGdsb2JhbC5UeXBlRXJyb3I7XG52YXIgV2Vha01hcCA9IGdsb2JhbC5XZWFrTWFwO1xudmFyIHNldCwgZ2V0LCBoYXM7XG5cbnZhciBlbmZvcmNlID0gZnVuY3Rpb24gKGl0KSB7XG4gIHJldHVybiBoYXMoaXQpID8gZ2V0KGl0KSA6IHNldChpdCwge30pO1xufTtcblxudmFyIGdldHRlckZvciA9IGZ1bmN0aW9uIChUWVBFKSB7XG4gIHJldHVybiBmdW5jdGlvbiAoaXQpIHtcbiAgICB2YXIgc3RhdGU7XG4gICAgaWYgKCFpc09iamVjdChpdCkgfHwgKHN0YXRlID0gZ2V0KGl0KSkudHlwZSAhPT0gVFlQRSkge1xuICAgICAgdGhyb3cgbmV3IFR5cGVFcnJvcignSW5jb21wYXRpYmxlIHJlY2VpdmVyLCAnICsgVFlQRSArICcgcmVxdWlyZWQnKTtcbiAgICB9IHJldHVybiBzdGF0ZTtcbiAgfTtcbn07XG5cbmlmIChOQVRJVkVfV0VBS19NQVAgfHwgc2hhcmVkLnN0YXRlKSB7XG4gIHZhciBzdG9yZSA9IHNoYXJlZC5zdGF0ZSB8fCAoc2hhcmVkLnN0YXRlID0gbmV3IFdlYWtNYXAoKSk7XG4gIC8qIGVzbGludC1kaXNhYmxlIG5vLXNlbGYtYXNzaWduIC0tIHByb3RvdHlwZSBtZXRob2RzIHByb3RlY3Rpb24gKi9cbiAgc3RvcmUuZ2V0ID0gc3RvcmUuZ2V0O1xuICBzdG9yZS5oYXMgPSBzdG9yZS5oYXM7XG4gIHN0b3JlLnNldCA9IHN0b3JlLnNldDtcbiAgLyogZXNsaW50LWVuYWJsZSBuby1zZWxmLWFzc2lnbiAtLSBwcm90b3R5cGUgbWV0aG9kcyBwcm90ZWN0aW9uICovXG4gIHNldCA9IGZ1bmN0aW9uIChpdCwgbWV0YWRhdGEpIHtcbiAgICBpZiAoc3RvcmUuaGFzKGl0KSkgdGhyb3cgbmV3IFR5cGVFcnJvcihPQkpFQ1RfQUxSRUFEWV9JTklUSUFMSVpFRCk7XG4gICAgbWV0YWRhdGEuZmFjYWRlID0gaXQ7XG4gICAgc3RvcmUuc2V0KGl0LCBtZXRhZGF0YSk7XG4gICAgcmV0dXJuIG1ldGFkYXRhO1xuICB9O1xuICBnZXQgPSBmdW5jdGlvbiAoaXQpIHtcbiAgICByZXR1cm4gc3RvcmUuZ2V0KGl0KSB8fCB7fTtcbiAgfTtcbiAgaGFzID0gZnVuY3Rpb24gKGl0KSB7XG4gICAgcmV0dXJuIHN0b3JlLmhhcyhpdCk7XG4gIH07XG59IGVsc2Uge1xuICB2YXIgU1RBVEUgPSBzaGFyZWRLZXkoJ3N0YXRlJyk7XG4gIGhpZGRlbktleXNbU1RBVEVdID0gdHJ1ZTtcbiAgc2V0ID0gZnVuY3Rpb24gKGl0LCBtZXRhZGF0YSkge1xuICAgIGlmIChoYXNPd24oaXQsIFNUQVRFKSkgdGhyb3cgbmV3IFR5cGVFcnJvcihPQkpFQ1RfQUxSRUFEWV9JTklUSUFMSVpFRCk7XG4gICAgbWV0YWRhdGEuZmFjYWRlID0gaXQ7XG4gICAgY3JlYXRlTm9uRW51bWVyYWJsZVByb3BlcnR5KGl0LCBTVEFURSwgbWV0YWRhdGEpO1xuICAgIHJldHVybiBtZXRhZGF0YTtcbiAgfTtcbiAgZ2V0ID0gZnVuY3Rpb24gKGl0KSB7XG4gICAgcmV0dXJuIGhhc093bihpdCwgU1RBVEUpID8gaXRbU1RBVEVdIDoge307XG4gIH07XG4gIGhhcyA9IGZ1bmN0aW9uIChpdCkge1xuICAgIHJldHVybiBoYXNPd24oaXQsIFNUQVRFKTtcbiAgfTtcbn1cblxubW9kdWxlLmV4cG9ydHMgPSB7XG4gIHNldDogc2V0LFxuICBnZXQ6IGdldCxcbiAgaGFzOiBoYXMsXG4gIGVuZm9yY2U6IGVuZm9yY2UsXG4gIGdldHRlckZvcjogZ2V0dGVyRm9yXG59O1xuIiwiJ3VzZSBzdHJpY3QnO1xudmFyIHdlbGxLbm93blN5bWJvbCA9IHJlcXVpcmUoJy4uL2ludGVybmFscy93ZWxsLWtub3duLXN5bWJvbCcpO1xudmFyIEl0ZXJhdG9ycyA9IHJlcXVpcmUoJy4uL2ludGVybmFscy9pdGVyYXRvcnMnKTtcblxudmFyIElURVJBVE9SID0gd2VsbEtub3duU3ltYm9sKCdpdGVyYXRvcicpO1xudmFyIEFycmF5UHJvdG90eXBlID0gQXJyYXkucHJvdG90eXBlO1xuXG4vLyBjaGVjayBvbiBkZWZhdWx0IEFycmF5IGl0ZXJhdG9yXG5tb2R1bGUuZXhwb3J0cyA9IGZ1bmN0aW9uIChpdCkge1xuICByZXR1cm4gaXQgIT09IHVuZGVmaW5lZCAmJiAoSXRlcmF0b3JzLkFycmF5ID09PSBpdCB8fCBBcnJheVByb3RvdHlwZVtJVEVSQVRPUl0gPT09IGl0KTtcbn07XG4iLCIndXNlIHN0cmljdCc7XG4vLyBodHRwczovL3RjMzkuZXMvZWNtYTI2Mi8jc2VjLUlzSFRNTEREQS1pbnRlcm5hbC1zbG90XG52YXIgZG9jdW1lbnRBbGwgPSB0eXBlb2YgZG9jdW1lbnQgPT0gJ29iamVjdCcgJiYgZG9jdW1lbnQuYWxsO1xuXG4vLyBgSXNDYWxsYWJsZWAgYWJzdHJhY3Qgb3BlcmF0aW9uXG4vLyBodHRwczovL3RjMzkuZXMvZWNtYTI2Mi8jc2VjLWlzY2FsbGFibGVcbi8vIGVzbGludC1kaXNhYmxlLW5leHQtbGluZSB1bmljb3JuL25vLXR5cGVvZi11bmRlZmluZWQgLS0gcmVxdWlyZWQgZm9yIHRlc3Rpbmdcbm1vZHVsZS5leHBvcnRzID0gdHlwZW9mIGRvY3VtZW50QWxsID09ICd1bmRlZmluZWQnICYmIGRvY3VtZW50QWxsICE9PSB1bmRlZmluZWQgPyBmdW5jdGlvbiAoYXJndW1lbnQpIHtcbiAgcmV0dXJuIHR5cGVvZiBhcmd1bWVudCA9PSAnZnVuY3Rpb24nIHx8IGFyZ3VtZW50ID09PSBkb2N1bWVudEFsbDtcbn0gOiBmdW5jdGlvbiAoYXJndW1lbnQpIHtcbiAgcmV0dXJuIHR5cGVvZiBhcmd1bWVudCA9PSAnZnVuY3Rpb24nO1xufTtcbiIsIid1c2Ugc3RyaWN0JztcbnZhciB1bmN1cnJ5VGhpcyA9IHJlcXVpcmUoJy4uL2ludGVybmFscy9mdW5jdGlvbi11bmN1cnJ5LXRoaXMnKTtcbnZhciBmYWlscyA9IHJlcXVpcmUoJy4uL2ludGVybmFscy9mYWlscycpO1xudmFyIGlzQ2FsbGFibGUgPSByZXF1aXJlKCcuLi9pbnRlcm5hbHMvaXMtY2FsbGFibGUnKTtcbnZhciBjbGFzc29mID0gcmVxdWlyZSgnLi4vaW50ZXJuYWxzL2NsYXNzb2YnKTtcbnZhciBnZXRCdWlsdEluID0gcmVxdWlyZSgnLi4vaW50ZXJuYWxzL2dldC1idWlsdC1pbicpO1xudmFyIGluc3BlY3RTb3VyY2UgPSByZXF1aXJlKCcuLi9pbnRlcm5hbHMvaW5zcGVjdC1zb3VyY2UnKTtcblxudmFyIG5vb3AgPSBmdW5jdGlvbiAoKSB7IC8qIGVtcHR5ICovIH07XG52YXIgY29uc3RydWN0ID0gZ2V0QnVpbHRJbignUmVmbGVjdCcsICdjb25zdHJ1Y3QnKTtcbnZhciBjb25zdHJ1Y3RvclJlZ0V4cCA9IC9eXFxzKig/OmNsYXNzfGZ1bmN0aW9uKVxcYi87XG52YXIgZXhlYyA9IHVuY3VycnlUaGlzKGNvbnN0cnVjdG9yUmVnRXhwLmV4ZWMpO1xudmFyIElOQ09SUkVDVF9UT19TVFJJTkcgPSAhY29uc3RydWN0b3JSZWdFeHAudGVzdChub29wKTtcblxudmFyIGlzQ29uc3RydWN0b3JNb2Rlcm4gPSBmdW5jdGlvbiBpc0NvbnN0cnVjdG9yKGFyZ3VtZW50KSB7XG4gIGlmICghaXNDYWxsYWJsZShhcmd1bWVudCkpIHJldHVybiBmYWxzZTtcbiAgdHJ5IHtcbiAgICBjb25zdHJ1Y3Qobm9vcCwgW10sIGFyZ3VtZW50KTtcbiAgICByZXR1cm4gdHJ1ZTtcbiAgfSBjYXRjaCAoZXJyb3IpIHtcbiAgICByZXR1cm4gZmFsc2U7XG4gIH1cbn07XG5cbnZhciBpc0NvbnN0cnVjdG9yTGVnYWN5ID0gZnVuY3Rpb24gaXNDb25zdHJ1Y3Rvcihhcmd1bWVudCkge1xuICBpZiAoIWlzQ2FsbGFibGUoYXJndW1lbnQpKSByZXR1cm4gZmFsc2U7XG4gIHN3aXRjaCAoY2xhc3NvZihhcmd1bWVudCkpIHtcbiAgICBjYXNlICdBc3luY0Z1bmN0aW9uJzpcbiAgICBjYXNlICdHZW5lcmF0b3JGdW5jdGlvbic6XG4gICAgY2FzZSAnQXN5bmNHZW5lcmF0b3JGdW5jdGlvbic6IHJldHVybiBmYWxzZTtcbiAgfVxuICB0cnkge1xuICAgIC8vIHdlIGNhbid0IGNoZWNrIC5wcm90b3R5cGUgc2luY2UgY29uc3RydWN0b3JzIHByb2R1Y2VkIGJ5IC5iaW5kIGhhdmVuJ3QgaXRcbiAgICAvLyBgRnVuY3Rpb24jdG9TdHJpbmdgIHRocm93cyBvbiBzb21lIGJ1aWx0LWl0IGZ1bmN0aW9uIGluIHNvbWUgbGVnYWN5IGVuZ2luZXNcbiAgICAvLyAoZm9yIGV4YW1wbGUsIGBET01RdWFkYCBhbmQgc2ltaWxhciBpbiBGRjQxLSlcbiAgICByZXR1cm4gSU5DT1JSRUNUX1RPX1NUUklORyB8fCAhIWV4ZWMoY29uc3RydWN0b3JSZWdFeHAsIGluc3BlY3RTb3VyY2UoYXJndW1lbnQpKTtcbiAgfSBjYXRjaCAoZXJyb3IpIHtcbiAgICByZXR1cm4gdHJ1ZTtcbiAgfVxufTtcblxuaXNDb25zdHJ1Y3RvckxlZ2FjeS5zaGFtID0gdHJ1ZTtcblxuLy8gYElzQ29uc3RydWN0b3JgIGFic3RyYWN0IG9wZXJhdGlvblxuLy8gaHR0cHM6Ly90YzM5LmVzL2VjbWEyNjIvI3NlYy1pc2NvbnN0cnVjdG9yXG5tb2R1bGUuZXhwb3J0cyA9ICFjb25zdHJ1Y3QgfHwgZmFpbHMoZnVuY3Rpb24gKCkge1xuICB2YXIgY2FsbGVkO1xuICByZXR1cm4gaXNDb25zdHJ1Y3Rvck1vZGVybihpc0NvbnN0cnVjdG9yTW9kZXJuLmNhbGwpXG4gICAgfHwgIWlzQ29uc3RydWN0b3JNb2Rlcm4oT2JqZWN0KVxuICAgIHx8ICFpc0NvbnN0cnVjdG9yTW9kZXJuKGZ1bmN0aW9uICgpIHsgY2FsbGVkID0gdHJ1ZTsgfSlcbiAgICB8fCBjYWxsZWQ7XG59KSA/IGlzQ29uc3RydWN0b3JMZWdhY3kgOiBpc0NvbnN0cnVjdG9yTW9kZXJuO1xuIiwiJ3VzZSBzdHJpY3QnO1xudmFyIGZhaWxzID0gcmVxdWlyZSgnLi4vaW50ZXJuYWxzL2ZhaWxzJyk7XG52YXIgaXNDYWxsYWJsZSA9IHJlcXVpcmUoJy4uL2ludGVybmFscy9pcy1jYWxsYWJsZScpO1xuXG52YXIgcmVwbGFjZW1lbnQgPSAvI3xcXC5wcm90b3R5cGVcXC4vO1xuXG52YXIgaXNGb3JjZWQgPSBmdW5jdGlvbiAoZmVhdHVyZSwgZGV0ZWN0aW9uKSB7XG4gIHZhciB2YWx1ZSA9IGRhdGFbbm9ybWFsaXplKGZlYXR1cmUpXTtcbiAgcmV0dXJuIHZhbHVlID09PSBQT0xZRklMTCA/IHRydWVcbiAgICA6IHZhbHVlID09PSBOQVRJVkUgPyBmYWxzZVxuICAgIDogaXNDYWxsYWJsZShkZXRlY3Rpb24pID8gZmFpbHMoZGV0ZWN0aW9uKVxuICAgIDogISFkZXRlY3Rpb247XG59O1xuXG52YXIgbm9ybWFsaXplID0gaXNGb3JjZWQubm9ybWFsaXplID0gZnVuY3Rpb24gKHN0cmluZykge1xuICByZXR1cm4gU3RyaW5nKHN0cmluZykucmVwbGFjZShyZXBsYWNlbWVudCwgJy4nKS50b0xvd2VyQ2FzZSgpO1xufTtcblxudmFyIGRhdGEgPSBpc0ZvcmNlZC5kYXRhID0ge307XG52YXIgTkFUSVZFID0gaXNGb3JjZWQuTkFUSVZFID0gJ04nO1xudmFyIFBPTFlGSUxMID0gaXNGb3JjZWQuUE9MWUZJTEwgPSAnUCc7XG5cbm1vZHVsZS5leHBvcnRzID0gaXNGb3JjZWQ7XG4iLCIndXNlIHN0cmljdCc7XG4vLyB3ZSBjYW4ndCB1c2UganVzdCBgaXQgPT0gbnVsbGAgc2luY2Ugb2YgYGRvY3VtZW50LmFsbGAgc3BlY2lhbCBjYXNlXG4vLyBodHRwczovL3RjMzkuZXMvZWNtYTI2Mi8jc2VjLUlzSFRNTEREQS1pbnRlcm5hbC1zbG90LWFlY1xubW9kdWxlLmV4cG9ydHMgPSBmdW5jdGlvbiAoaXQpIHtcbiAgcmV0dXJuIGl0ID09PSBudWxsIHx8IGl0ID09PSB1bmRlZmluZWQ7XG59O1xuIiwiJ3VzZSBzdHJpY3QnO1xudmFyIGlzQ2FsbGFibGUgPSByZXF1aXJlKCcuLi9pbnRlcm5hbHMvaXMtY2FsbGFibGUnKTtcblxubW9kdWxlLmV4cG9ydHMgPSBmdW5jdGlvbiAoaXQpIHtcbiAgcmV0dXJuIHR5cGVvZiBpdCA9PSAnb2JqZWN0JyA/IGl0ICE9PSBudWxsIDogaXNDYWxsYWJsZShpdCk7XG59O1xuIiwiJ3VzZSBzdHJpY3QnO1xudmFyIGlzT2JqZWN0ID0gcmVxdWlyZSgnLi4vaW50ZXJuYWxzL2lzLW9iamVjdCcpO1xuXG5tb2R1bGUuZXhwb3J0cyA9IGZ1bmN0aW9uIChhcmd1bWVudCkge1xuICByZXR1cm4gaXNPYmplY3QoYXJndW1lbnQpIHx8IGFyZ3VtZW50ID09PSBudWxsO1xufTtcbiIsIid1c2Ugc3RyaWN0Jztcbm1vZHVsZS5leHBvcnRzID0gZmFsc2U7XG4iLCIndXNlIHN0cmljdCc7XG52YXIgaXNPYmplY3QgPSByZXF1aXJlKCcuLi9pbnRlcm5hbHMvaXMtb2JqZWN0Jyk7XG52YXIgY2xhc3NvZiA9IHJlcXVpcmUoJy4uL2ludGVybmFscy9jbGFzc29mLXJhdycpO1xudmFyIHdlbGxLbm93blN5bWJvbCA9IHJlcXVpcmUoJy4uL2ludGVybmFscy93ZWxsLWtub3duLXN5bWJvbCcpO1xuXG52YXIgTUFUQ0ggPSB3ZWxsS25vd25TeW1ib2woJ21hdGNoJyk7XG5cbi8vIGBJc1JlZ0V4cGAgYWJzdHJhY3Qgb3BlcmF0aW9uXG4vLyBodHRwczovL3RjMzkuZXMvZWNtYTI2Mi8jc2VjLWlzcmVnZXhwXG5tb2R1bGUuZXhwb3J0cyA9IGZ1bmN0aW9uIChpdCkge1xuICB2YXIgaXNSZWdFeHA7XG4gIHJldHVybiBpc09iamVjdChpdCkgJiYgKChpc1JlZ0V4cCA9IGl0W01BVENIXSkgIT09IHVuZGVmaW5lZCA/ICEhaXNSZWdFeHAgOiBjbGFzc29mKGl0KSA9PT0gJ1JlZ0V4cCcpO1xufTtcbiIsIid1c2Ugc3RyaWN0JztcbnZhciBnZXRCdWlsdEluID0gcmVxdWlyZSgnLi4vaW50ZXJuYWxzL2dldC1idWlsdC1pbicpO1xudmFyIGlzQ2FsbGFibGUgPSByZXF1aXJlKCcuLi9pbnRlcm5hbHMvaXMtY2FsbGFibGUnKTtcbnZhciBpc1Byb3RvdHlwZU9mID0gcmVxdWlyZSgnLi4vaW50ZXJuYWxzL29iamVjdC1pcy1wcm90b3R5cGUtb2YnKTtcbnZhciBVU0VfU1lNQk9MX0FTX1VJRCA9IHJlcXVpcmUoJy4uL2ludGVybmFscy91c2Utc3ltYm9sLWFzLXVpZCcpO1xuXG52YXIgJE9iamVjdCA9IE9iamVjdDtcblxubW9kdWxlLmV4cG9ydHMgPSBVU0VfU1lNQk9MX0FTX1VJRCA/IGZ1bmN0aW9uIChpdCkge1xuICByZXR1cm4gdHlwZW9mIGl0ID09ICdzeW1ib2wnO1xufSA6IGZ1bmN0aW9uIChpdCkge1xuICB2YXIgJFN5bWJvbCA9IGdldEJ1aWx0SW4oJ1N5bWJvbCcpO1xuICByZXR1cm4gaXNDYWxsYWJsZSgkU3ltYm9sKSAmJiBpc1Byb3RvdHlwZU9mKCRTeW1ib2wucHJvdG90eXBlLCAkT2JqZWN0KGl0KSk7XG59O1xuIiwiJ3VzZSBzdHJpY3QnO1xudmFyIGNhbGwgPSByZXF1aXJlKCcuLi9pbnRlcm5hbHMvZnVuY3Rpb24tY2FsbCcpO1xudmFyIGFuT2JqZWN0ID0gcmVxdWlyZSgnLi4vaW50ZXJuYWxzL2FuLW9iamVjdCcpO1xudmFyIGdldE1ldGhvZCA9IHJlcXVpcmUoJy4uL2ludGVybmFscy9nZXQtbWV0aG9kJyk7XG5cbm1vZHVsZS5leHBvcnRzID0gZnVuY3Rpb24gKGl0ZXJhdG9yLCBraW5kLCB2YWx1ZSkge1xuICB2YXIgaW5uZXJSZXN1bHQsIGlubmVyRXJyb3I7XG4gIGFuT2JqZWN0KGl0ZXJhdG9yKTtcbiAgdHJ5IHtcbiAgICBpbm5lclJlc3VsdCA9IGdldE1ldGhvZChpdGVyYXRvciwgJ3JldHVybicpO1xuICAgIGlmICghaW5uZXJSZXN1bHQpIHtcbiAgICAgIGlmIChraW5kID09PSAndGhyb3cnKSB0aHJvdyB2YWx1ZTtcbiAgICAgIHJldHVybiB2YWx1ZTtcbiAgICB9XG4gICAgaW5uZXJSZXN1bHQgPSBjYWxsKGlubmVyUmVzdWx0LCBpdGVyYXRvcik7XG4gIH0gY2F0Y2ggKGVycm9yKSB7XG4gICAgaW5uZXJFcnJvciA9IHRydWU7XG4gICAgaW5uZXJSZXN1bHQgPSBlcnJvcjtcbiAgfVxuICBpZiAoa2luZCA9PT0gJ3Rocm93JykgdGhyb3cgdmFsdWU7XG4gIGlmIChpbm5lckVycm9yKSB0aHJvdyBpbm5lclJlc3VsdDtcbiAgYW5PYmplY3QoaW5uZXJSZXN1bHQpO1xuICByZXR1cm4gdmFsdWU7XG59O1xuIiwiJ3VzZSBzdHJpY3QnO1xudmFyIEl0ZXJhdG9yUHJvdG90eXBlID0gcmVxdWlyZSgnLi4vaW50ZXJuYWxzL2l0ZXJhdG9ycy1jb3JlJykuSXRlcmF0b3JQcm90b3R5cGU7XG52YXIgY3JlYXRlID0gcmVxdWlyZSgnLi4vaW50ZXJuYWxzL29iamVjdC1jcmVhdGUnKTtcbnZhciBjcmVhdGVQcm9wZXJ0eURlc2NyaXB0b3IgPSByZXF1aXJlKCcuLi9pbnRlcm5hbHMvY3JlYXRlLXByb3BlcnR5LWRlc2NyaXB0b3InKTtcbnZhciBzZXRUb1N0cmluZ1RhZyA9IHJlcXVpcmUoJy4uL2ludGVybmFscy9zZXQtdG8tc3RyaW5nLXRhZycpO1xudmFyIEl0ZXJhdG9ycyA9IHJlcXVpcmUoJy4uL2ludGVybmFscy9pdGVyYXRvcnMnKTtcblxudmFyIHJldHVyblRoaXMgPSBmdW5jdGlvbiAoKSB7IHJldHVybiB0aGlzOyB9O1xuXG5tb2R1bGUuZXhwb3J0cyA9IGZ1bmN0aW9uIChJdGVyYXRvckNvbnN0cnVjdG9yLCBOQU1FLCBuZXh0LCBFTlVNRVJBQkxFX05FWFQpIHtcbiAgdmFyIFRPX1NUUklOR19UQUcgPSBOQU1FICsgJyBJdGVyYXRvcic7XG4gIEl0ZXJhdG9yQ29uc3RydWN0b3IucHJvdG90eXBlID0gY3JlYXRlKEl0ZXJhdG9yUHJvdG90eXBlLCB7IG5leHQ6IGNyZWF0ZVByb3BlcnR5RGVzY3JpcHRvcigrIUVOVU1FUkFCTEVfTkVYVCwgbmV4dCkgfSk7XG4gIHNldFRvU3RyaW5nVGFnKEl0ZXJhdG9yQ29uc3RydWN0b3IsIFRPX1NUUklOR19UQUcsIGZhbHNlLCB0cnVlKTtcbiAgSXRlcmF0b3JzW1RPX1NUUklOR19UQUddID0gcmV0dXJuVGhpcztcbiAgcmV0dXJuIEl0ZXJhdG9yQ29uc3RydWN0b3I7XG59O1xuIiwiJ3VzZSBzdHJpY3QnO1xudmFyICQgPSByZXF1aXJlKCcuLi9pbnRlcm5hbHMvZXhwb3J0Jyk7XG52YXIgY2FsbCA9IHJlcXVpcmUoJy4uL2ludGVybmFscy9mdW5jdGlvbi1jYWxsJyk7XG52YXIgSVNfUFVSRSA9IHJlcXVpcmUoJy4uL2ludGVybmFscy9pcy1wdXJlJyk7XG52YXIgRnVuY3Rpb25OYW1lID0gcmVxdWlyZSgnLi4vaW50ZXJuYWxzL2Z1bmN0aW9uLW5hbWUnKTtcbnZhciBpc0NhbGxhYmxlID0gcmVxdWlyZSgnLi4vaW50ZXJuYWxzL2lzLWNhbGxhYmxlJyk7XG52YXIgY3JlYXRlSXRlcmF0b3JDb25zdHJ1Y3RvciA9IHJlcXVpcmUoJy4uL2ludGVybmFscy9pdGVyYXRvci1jcmVhdGUtY29uc3RydWN0b3InKTtcbnZhciBnZXRQcm90b3R5cGVPZiA9IHJlcXVpcmUoJy4uL2ludGVybmFscy9vYmplY3QtZ2V0LXByb3RvdHlwZS1vZicpO1xudmFyIHNldFByb3RvdHlwZU9mID0gcmVxdWlyZSgnLi4vaW50ZXJuYWxzL29iamVjdC1zZXQtcHJvdG90eXBlLW9mJyk7XG52YXIgc2V0VG9TdHJpbmdUYWcgPSByZXF1aXJlKCcuLi9pbnRlcm5hbHMvc2V0LXRvLXN0cmluZy10YWcnKTtcbnZhciBjcmVhdGVOb25FbnVtZXJhYmxlUHJvcGVydHkgPSByZXF1aXJlKCcuLi9pbnRlcm5hbHMvY3JlYXRlLW5vbi1lbnVtZXJhYmxlLXByb3BlcnR5Jyk7XG52YXIgZGVmaW5lQnVpbHRJbiA9IHJlcXVpcmUoJy4uL2ludGVybmFscy9kZWZpbmUtYnVpbHQtaW4nKTtcbnZhciB3ZWxsS25vd25TeW1ib2wgPSByZXF1aXJlKCcuLi9pbnRlcm5hbHMvd2VsbC1rbm93bi1zeW1ib2wnKTtcbnZhciBJdGVyYXRvcnMgPSByZXF1aXJlKCcuLi9pbnRlcm5hbHMvaXRlcmF0b3JzJyk7XG52YXIgSXRlcmF0b3JzQ29yZSA9IHJlcXVpcmUoJy4uL2ludGVybmFscy9pdGVyYXRvcnMtY29yZScpO1xuXG52YXIgUFJPUEVSX0ZVTkNUSU9OX05BTUUgPSBGdW5jdGlvbk5hbWUuUFJPUEVSO1xudmFyIENPTkZJR1VSQUJMRV9GVU5DVElPTl9OQU1FID0gRnVuY3Rpb25OYW1lLkNPTkZJR1VSQUJMRTtcbnZhciBJdGVyYXRvclByb3RvdHlwZSA9IEl0ZXJhdG9yc0NvcmUuSXRlcmF0b3JQcm90b3R5cGU7XG52YXIgQlVHR1lfU0FGQVJJX0lURVJBVE9SUyA9IEl0ZXJhdG9yc0NvcmUuQlVHR1lfU0FGQVJJX0lURVJBVE9SUztcbnZhciBJVEVSQVRPUiA9IHdlbGxLbm93blN5bWJvbCgnaXRlcmF0b3InKTtcbnZhciBLRVlTID0gJ2tleXMnO1xudmFyIFZBTFVFUyA9ICd2YWx1ZXMnO1xudmFyIEVOVFJJRVMgPSAnZW50cmllcyc7XG5cbnZhciByZXR1cm5UaGlzID0gZnVuY3Rpb24gKCkgeyByZXR1cm4gdGhpczsgfTtcblxubW9kdWxlLmV4cG9ydHMgPSBmdW5jdGlvbiAoSXRlcmFibGUsIE5BTUUsIEl0ZXJhdG9yQ29uc3RydWN0b3IsIG5leHQsIERFRkFVTFQsIElTX1NFVCwgRk9SQ0VEKSB7XG4gIGNyZWF0ZUl0ZXJhdG9yQ29uc3RydWN0b3IoSXRlcmF0b3JDb25zdHJ1Y3RvciwgTkFNRSwgbmV4dCk7XG5cbiAgdmFyIGdldEl0ZXJhdGlvbk1ldGhvZCA9IGZ1bmN0aW9uIChLSU5EKSB7XG4gICAgaWYgKEtJTkQgPT09IERFRkFVTFQgJiYgZGVmYXVsdEl0ZXJhdG9yKSByZXR1cm4gZGVmYXVsdEl0ZXJhdG9yO1xuICAgIGlmICghQlVHR1lfU0FGQVJJX0lURVJBVE9SUyAmJiBLSU5EICYmIEtJTkQgaW4gSXRlcmFibGVQcm90b3R5cGUpIHJldHVybiBJdGVyYWJsZVByb3RvdHlwZVtLSU5EXTtcblxuICAgIHN3aXRjaCAoS0lORCkge1xuICAgICAgY2FzZSBLRVlTOiByZXR1cm4gZnVuY3Rpb24ga2V5cygpIHsgcmV0dXJuIG5ldyBJdGVyYXRvckNvbnN0cnVjdG9yKHRoaXMsIEtJTkQpOyB9O1xuICAgICAgY2FzZSBWQUxVRVM6IHJldHVybiBmdW5jdGlvbiB2YWx1ZXMoKSB7IHJldHVybiBuZXcgSXRlcmF0b3JDb25zdHJ1Y3Rvcih0aGlzLCBLSU5EKTsgfTtcbiAgICAgIGNhc2UgRU5UUklFUzogcmV0dXJuIGZ1bmN0aW9uIGVudHJpZXMoKSB7IHJldHVybiBuZXcgSXRlcmF0b3JDb25zdHJ1Y3Rvcih0aGlzLCBLSU5EKTsgfTtcbiAgICB9XG5cbiAgICByZXR1cm4gZnVuY3Rpb24gKCkgeyByZXR1cm4gbmV3IEl0ZXJhdG9yQ29uc3RydWN0b3IodGhpcyk7IH07XG4gIH07XG5cbiAgdmFyIFRPX1NUUklOR19UQUcgPSBOQU1FICsgJyBJdGVyYXRvcic7XG4gIHZhciBJTkNPUlJFQ1RfVkFMVUVTX05BTUUgPSBmYWxzZTtcbiAgdmFyIEl0ZXJhYmxlUHJvdG90eXBlID0gSXRlcmFibGUucHJvdG90eXBlO1xuICB2YXIgbmF0aXZlSXRlcmF0b3IgPSBJdGVyYWJsZVByb3RvdHlwZVtJVEVSQVRPUl1cbiAgICB8fCBJdGVyYWJsZVByb3RvdHlwZVsnQEBpdGVyYXRvciddXG4gICAgfHwgREVGQVVMVCAmJiBJdGVyYWJsZVByb3RvdHlwZVtERUZBVUxUXTtcbiAgdmFyIGRlZmF1bHRJdGVyYXRvciA9ICFCVUdHWV9TQUZBUklfSVRFUkFUT1JTICYmIG5hdGl2ZUl0ZXJhdG9yIHx8IGdldEl0ZXJhdGlvbk1ldGhvZChERUZBVUxUKTtcbiAgdmFyIGFueU5hdGl2ZUl0ZXJhdG9yID0gTkFNRSA9PT0gJ0FycmF5JyA/IEl0ZXJhYmxlUHJvdG90eXBlLmVudHJpZXMgfHwgbmF0aXZlSXRlcmF0b3IgOiBuYXRpdmVJdGVyYXRvcjtcbiAgdmFyIEN1cnJlbnRJdGVyYXRvclByb3RvdHlwZSwgbWV0aG9kcywgS0VZO1xuXG4gIC8vIGZpeCBuYXRpdmVcbiAgaWYgKGFueU5hdGl2ZUl0ZXJhdG9yKSB7XG4gICAgQ3VycmVudEl0ZXJhdG9yUHJvdG90eXBlID0gZ2V0UHJvdG90eXBlT2YoYW55TmF0aXZlSXRlcmF0b3IuY2FsbChuZXcgSXRlcmFibGUoKSkpO1xuICAgIGlmIChDdXJyZW50SXRlcmF0b3JQcm90b3R5cGUgIT09IE9iamVjdC5wcm90b3R5cGUgJiYgQ3VycmVudEl0ZXJhdG9yUHJvdG90eXBlLm5leHQpIHtcbiAgICAgIGlmICghSVNfUFVSRSAmJiBnZXRQcm90b3R5cGVPZihDdXJyZW50SXRlcmF0b3JQcm90b3R5cGUpICE9PSBJdGVyYXRvclByb3RvdHlwZSkge1xuICAgICAgICBpZiAoc2V0UHJvdG90eXBlT2YpIHtcbiAgICAgICAgICBzZXRQcm90b3R5cGVPZihDdXJyZW50SXRlcmF0b3JQcm90b3R5cGUsIEl0ZXJhdG9yUHJvdG90eXBlKTtcbiAgICAgICAgfSBlbHNlIGlmICghaXNDYWxsYWJsZShDdXJyZW50SXRlcmF0b3JQcm90b3R5cGVbSVRFUkFUT1JdKSkge1xuICAgICAgICAgIGRlZmluZUJ1aWx0SW4oQ3VycmVudEl0ZXJhdG9yUHJvdG90eXBlLCBJVEVSQVRPUiwgcmV0dXJuVGhpcyk7XG4gICAgICAgIH1cbiAgICAgIH1cbiAgICAgIC8vIFNldCBAQHRvU3RyaW5nVGFnIHRvIG5hdGl2ZSBpdGVyYXRvcnNcbiAgICAgIHNldFRvU3RyaW5nVGFnKEN1cnJlbnRJdGVyYXRvclByb3RvdHlwZSwgVE9fU1RSSU5HX1RBRywgdHJ1ZSwgdHJ1ZSk7XG4gICAgICBpZiAoSVNfUFVSRSkgSXRlcmF0b3JzW1RPX1NUUklOR19UQUddID0gcmV0dXJuVGhpcztcbiAgICB9XG4gIH1cblxuICAvLyBmaXggQXJyYXkucHJvdG90eXBlLnsgdmFsdWVzLCBAQGl0ZXJhdG9yIH0ubmFtZSBpbiBWOCAvIEZGXG4gIGlmIChQUk9QRVJfRlVOQ1RJT05fTkFNRSAmJiBERUZBVUxUID09PSBWQUxVRVMgJiYgbmF0aXZlSXRlcmF0b3IgJiYgbmF0aXZlSXRlcmF0b3IubmFtZSAhPT0gVkFMVUVTKSB7XG4gICAgaWYgKCFJU19QVVJFICYmIENPTkZJR1VSQUJMRV9GVU5DVElPTl9OQU1FKSB7XG4gICAgICBjcmVhdGVOb25FbnVtZXJhYmxlUHJvcGVydHkoSXRlcmFibGVQcm90b3R5cGUsICduYW1lJywgVkFMVUVTKTtcbiAgICB9IGVsc2Uge1xuICAgICAgSU5DT1JSRUNUX1ZBTFVFU19OQU1FID0gdHJ1ZTtcbiAgICAgIGRlZmF1bHRJdGVyYXRvciA9IGZ1bmN0aW9uIHZhbHVlcygpIHsgcmV0dXJuIGNhbGwobmF0aXZlSXRlcmF0b3IsIHRoaXMpOyB9O1xuICAgIH1cbiAgfVxuXG4gIC8vIGV4cG9ydCBhZGRpdGlvbmFsIG1ldGhvZHNcbiAgaWYgKERFRkFVTFQpIHtcbiAgICBtZXRob2RzID0ge1xuICAgICAgdmFsdWVzOiBnZXRJdGVyYXRpb25NZXRob2QoVkFMVUVTKSxcbiAgICAgIGtleXM6IElTX1NFVCA/IGRlZmF1bHRJdGVyYXRvciA6IGdldEl0ZXJhdGlvbk1ldGhvZChLRVlTKSxcbiAgICAgIGVudHJpZXM6IGdldEl0ZXJhdGlvbk1ldGhvZChFTlRSSUVTKVxuICAgIH07XG4gICAgaWYgKEZPUkNFRCkgZm9yIChLRVkgaW4gbWV0aG9kcykge1xuICAgICAgaWYgKEJVR0dZX1NBRkFSSV9JVEVSQVRPUlMgfHwgSU5DT1JSRUNUX1ZBTFVFU19OQU1FIHx8ICEoS0VZIGluIEl0ZXJhYmxlUHJvdG90eXBlKSkge1xuICAgICAgICBkZWZpbmVCdWlsdEluKEl0ZXJhYmxlUHJvdG90eXBlLCBLRVksIG1ldGhvZHNbS0VZXSk7XG4gICAgICB9XG4gICAgfSBlbHNlICQoeyB0YXJnZXQ6IE5BTUUsIHByb3RvOiB0cnVlLCBmb3JjZWQ6IEJVR0dZX1NBRkFSSV9JVEVSQVRPUlMgfHwgSU5DT1JSRUNUX1ZBTFVFU19OQU1FIH0sIG1ldGhvZHMpO1xuICB9XG5cbiAgLy8gZGVmaW5lIGl0ZXJhdG9yXG4gIGlmICgoIUlTX1BVUkUgfHwgRk9SQ0VEKSAmJiBJdGVyYWJsZVByb3RvdHlwZVtJVEVSQVRPUl0gIT09IGRlZmF1bHRJdGVyYXRvcikge1xuICAgIGRlZmluZUJ1aWx0SW4oSXRlcmFibGVQcm90b3R5cGUsIElURVJBVE9SLCBkZWZhdWx0SXRlcmF0b3IsIHsgbmFtZTogREVGQVVMVCB9KTtcbiAgfVxuICBJdGVyYXRvcnNbTkFNRV0gPSBkZWZhdWx0SXRlcmF0b3I7XG5cbiAgcmV0dXJuIG1ldGhvZHM7XG59O1xuIiwiJ3VzZSBzdHJpY3QnO1xudmFyIGZhaWxzID0gcmVxdWlyZSgnLi4vaW50ZXJuYWxzL2ZhaWxzJyk7XG52YXIgaXNDYWxsYWJsZSA9IHJlcXVpcmUoJy4uL2ludGVybmFscy9pcy1jYWxsYWJsZScpO1xudmFyIGlzT2JqZWN0ID0gcmVxdWlyZSgnLi4vaW50ZXJuYWxzL2lzLW9iamVjdCcpO1xudmFyIGNyZWF0ZSA9IHJlcXVpcmUoJy4uL2ludGVybmFscy9vYmplY3QtY3JlYXRlJyk7XG52YXIgZ2V0UHJvdG90eXBlT2YgPSByZXF1aXJlKCcuLi9pbnRlcm5hbHMvb2JqZWN0LWdldC1wcm90b3R5cGUtb2YnKTtcbnZhciBkZWZpbmVCdWlsdEluID0gcmVxdWlyZSgnLi4vaW50ZXJuYWxzL2RlZmluZS1idWlsdC1pbicpO1xudmFyIHdlbGxLbm93blN5bWJvbCA9IHJlcXVpcmUoJy4uL2ludGVybmFscy93ZWxsLWtub3duLXN5bWJvbCcpO1xudmFyIElTX1BVUkUgPSByZXF1aXJlKCcuLi9pbnRlcm5hbHMvaXMtcHVyZScpO1xuXG52YXIgSVRFUkFUT1IgPSB3ZWxsS25vd25TeW1ib2woJ2l0ZXJhdG9yJyk7XG52YXIgQlVHR1lfU0FGQVJJX0lURVJBVE9SUyA9IGZhbHNlO1xuXG4vLyBgJUl0ZXJhdG9yUHJvdG90eXBlJWAgb2JqZWN0XG4vLyBodHRwczovL3RjMzkuZXMvZWNtYTI2Mi8jc2VjLSVpdGVyYXRvcnByb3RvdHlwZSUtb2JqZWN0XG52YXIgSXRlcmF0b3JQcm90b3R5cGUsIFByb3RvdHlwZU9mQXJyYXlJdGVyYXRvclByb3RvdHlwZSwgYXJyYXlJdGVyYXRvcjtcblxuLyogZXNsaW50LWRpc2FibGUgZXMvbm8tYXJyYXktcHJvdG90eXBlLWtleXMgLS0gc2FmZSAqL1xuaWYgKFtdLmtleXMpIHtcbiAgYXJyYXlJdGVyYXRvciA9IFtdLmtleXMoKTtcbiAgLy8gU2FmYXJpIDggaGFzIGJ1Z2d5IGl0ZXJhdG9ycyB3L28gYG5leHRgXG4gIGlmICghKCduZXh0JyBpbiBhcnJheUl0ZXJhdG9yKSkgQlVHR1lfU0FGQVJJX0lURVJBVE9SUyA9IHRydWU7XG4gIGVsc2Uge1xuICAgIFByb3RvdHlwZU9mQXJyYXlJdGVyYXRvclByb3RvdHlwZSA9IGdldFByb3RvdHlwZU9mKGdldFByb3RvdHlwZU9mKGFycmF5SXRlcmF0b3IpKTtcbiAgICBpZiAoUHJvdG90eXBlT2ZBcnJheUl0ZXJhdG9yUHJvdG90eXBlICE9PSBPYmplY3QucHJvdG90eXBlKSBJdGVyYXRvclByb3RvdHlwZSA9IFByb3RvdHlwZU9mQXJyYXlJdGVyYXRvclByb3RvdHlwZTtcbiAgfVxufVxuXG52YXIgTkVXX0lURVJBVE9SX1BST1RPVFlQRSA9ICFpc09iamVjdChJdGVyYXRvclByb3RvdHlwZSkgfHwgZmFpbHMoZnVuY3Rpb24gKCkge1xuICB2YXIgdGVzdCA9IHt9O1xuICAvLyBGRjQ0LSBsZWdhY3kgaXRlcmF0b3JzIGNhc2VcbiAgcmV0dXJuIEl0ZXJhdG9yUHJvdG90eXBlW0lURVJBVE9SXS5jYWxsKHRlc3QpICE9PSB0ZXN0O1xufSk7XG5cbmlmIChORVdfSVRFUkFUT1JfUFJPVE9UWVBFKSBJdGVyYXRvclByb3RvdHlwZSA9IHt9O1xuZWxzZSBpZiAoSVNfUFVSRSkgSXRlcmF0b3JQcm90b3R5cGUgPSBjcmVhdGUoSXRlcmF0b3JQcm90b3R5cGUpO1xuXG4vLyBgJUl0ZXJhdG9yUHJvdG90eXBlJVtAQGl0ZXJhdG9yXSgpYCBtZXRob2Rcbi8vIGh0dHBzOi8vdGMzOS5lcy9lY21hMjYyLyNzZWMtJWl0ZXJhdG9ycHJvdG90eXBlJS1AQGl0ZXJhdG9yXG5pZiAoIWlzQ2FsbGFibGUoSXRlcmF0b3JQcm90b3R5cGVbSVRFUkFUT1JdKSkge1xuICBkZWZpbmVCdWlsdEluKEl0ZXJhdG9yUHJvdG90eXBlLCBJVEVSQVRPUiwgZnVuY3Rpb24gKCkge1xuICAgIHJldHVybiB0aGlzO1xuICB9KTtcbn1cblxubW9kdWxlLmV4cG9ydHMgPSB7XG4gIEl0ZXJhdG9yUHJvdG90eXBlOiBJdGVyYXRvclByb3RvdHlwZSxcbiAgQlVHR1lfU0FGQVJJX0lURVJBVE9SUzogQlVHR1lfU0FGQVJJX0lURVJBVE9SU1xufTtcbiIsIid1c2Ugc3RyaWN0Jztcbm1vZHVsZS5leHBvcnRzID0ge307XG4iLCIndXNlIHN0cmljdCc7XG52YXIgdG9MZW5ndGggPSByZXF1aXJlKCcuLi9pbnRlcm5hbHMvdG8tbGVuZ3RoJyk7XG5cbi8vIGBMZW5ndGhPZkFycmF5TGlrZWAgYWJzdHJhY3Qgb3BlcmF0aW9uXG4vLyBodHRwczovL3RjMzkuZXMvZWNtYTI2Mi8jc2VjLWxlbmd0aG9mYXJyYXlsaWtlXG5tb2R1bGUuZXhwb3J0cyA9IGZ1bmN0aW9uIChvYmopIHtcbiAgcmV0dXJuIHRvTGVuZ3RoKG9iai5sZW5ndGgpO1xufTtcbiIsIid1c2Ugc3RyaWN0JztcbnZhciB1bmN1cnJ5VGhpcyA9IHJlcXVpcmUoJy4uL2ludGVybmFscy9mdW5jdGlvbi11bmN1cnJ5LXRoaXMnKTtcbnZhciBmYWlscyA9IHJlcXVpcmUoJy4uL2ludGVybmFscy9mYWlscycpO1xudmFyIGlzQ2FsbGFibGUgPSByZXF1aXJlKCcuLi9pbnRlcm5hbHMvaXMtY2FsbGFibGUnKTtcbnZhciBoYXNPd24gPSByZXF1aXJlKCcuLi9pbnRlcm5hbHMvaGFzLW93bi1wcm9wZXJ0eScpO1xudmFyIERFU0NSSVBUT1JTID0gcmVxdWlyZSgnLi4vaW50ZXJuYWxzL2Rlc2NyaXB0b3JzJyk7XG52YXIgQ09ORklHVVJBQkxFX0ZVTkNUSU9OX05BTUUgPSByZXF1aXJlKCcuLi9pbnRlcm5hbHMvZnVuY3Rpb24tbmFtZScpLkNPTkZJR1VSQUJMRTtcbnZhciBpbnNwZWN0U291cmNlID0gcmVxdWlyZSgnLi4vaW50ZXJuYWxzL2luc3BlY3Qtc291cmNlJyk7XG52YXIgSW50ZXJuYWxTdGF0ZU1vZHVsZSA9IHJlcXVpcmUoJy4uL2ludGVybmFscy9pbnRlcm5hbC1zdGF0ZScpO1xuXG52YXIgZW5mb3JjZUludGVybmFsU3RhdGUgPSBJbnRlcm5hbFN0YXRlTW9kdWxlLmVuZm9yY2U7XG52YXIgZ2V0SW50ZXJuYWxTdGF0ZSA9IEludGVybmFsU3RhdGVNb2R1bGUuZ2V0O1xudmFyICRTdHJpbmcgPSBTdHJpbmc7XG4vLyBlc2xpbnQtZGlzYWJsZS1uZXh0LWxpbmUgZXMvbm8tb2JqZWN0LWRlZmluZXByb3BlcnR5IC0tIHNhZmVcbnZhciBkZWZpbmVQcm9wZXJ0eSA9IE9iamVjdC5kZWZpbmVQcm9wZXJ0eTtcbnZhciBzdHJpbmdTbGljZSA9IHVuY3VycnlUaGlzKCcnLnNsaWNlKTtcbnZhciByZXBsYWNlID0gdW5jdXJyeVRoaXMoJycucmVwbGFjZSk7XG52YXIgam9pbiA9IHVuY3VycnlUaGlzKFtdLmpvaW4pO1xuXG52YXIgQ09ORklHVVJBQkxFX0xFTkdUSCA9IERFU0NSSVBUT1JTICYmICFmYWlscyhmdW5jdGlvbiAoKSB7XG4gIHJldHVybiBkZWZpbmVQcm9wZXJ0eShmdW5jdGlvbiAoKSB7IC8qIGVtcHR5ICovIH0sICdsZW5ndGgnLCB7IHZhbHVlOiA4IH0pLmxlbmd0aCAhPT0gODtcbn0pO1xuXG52YXIgVEVNUExBVEUgPSBTdHJpbmcoU3RyaW5nKS5zcGxpdCgnU3RyaW5nJyk7XG5cbnZhciBtYWtlQnVpbHRJbiA9IG1vZHVsZS5leHBvcnRzID0gZnVuY3Rpb24gKHZhbHVlLCBuYW1lLCBvcHRpb25zKSB7XG4gIGlmIChzdHJpbmdTbGljZSgkU3RyaW5nKG5hbWUpLCAwLCA3KSA9PT0gJ1N5bWJvbCgnKSB7XG4gICAgbmFtZSA9ICdbJyArIHJlcGxhY2UoJFN0cmluZyhuYW1lKSwgL15TeW1ib2xcXCgoW14pXSopXFwpLiokLywgJyQxJykgKyAnXSc7XG4gIH1cbiAgaWYgKG9wdGlvbnMgJiYgb3B0aW9ucy5nZXR0ZXIpIG5hbWUgPSAnZ2V0ICcgKyBuYW1lO1xuICBpZiAob3B0aW9ucyAmJiBvcHRpb25zLnNldHRlcikgbmFtZSA9ICdzZXQgJyArIG5hbWU7XG4gIGlmICghaGFzT3duKHZhbHVlLCAnbmFtZScpIHx8IChDT05GSUdVUkFCTEVfRlVOQ1RJT05fTkFNRSAmJiB2YWx1ZS5uYW1lICE9PSBuYW1lKSkge1xuICAgIGlmIChERVNDUklQVE9SUykgZGVmaW5lUHJvcGVydHkodmFsdWUsICduYW1lJywgeyB2YWx1ZTogbmFtZSwgY29uZmlndXJhYmxlOiB0cnVlIH0pO1xuICAgIGVsc2UgdmFsdWUubmFtZSA9IG5hbWU7XG4gIH1cbiAgaWYgKENPTkZJR1VSQUJMRV9MRU5HVEggJiYgb3B0aW9ucyAmJiBoYXNPd24ob3B0aW9ucywgJ2FyaXR5JykgJiYgdmFsdWUubGVuZ3RoICE9PSBvcHRpb25zLmFyaXR5KSB7XG4gICAgZGVmaW5lUHJvcGVydHkodmFsdWUsICdsZW5ndGgnLCB7IHZhbHVlOiBvcHRpb25zLmFyaXR5IH0pO1xuICB9XG4gIHRyeSB7XG4gICAgaWYgKG9wdGlvbnMgJiYgaGFzT3duKG9wdGlvbnMsICdjb25zdHJ1Y3RvcicpICYmIG9wdGlvbnMuY29uc3RydWN0b3IpIHtcbiAgICAgIGlmIChERVNDUklQVE9SUykgZGVmaW5lUHJvcGVydHkodmFsdWUsICdwcm90b3R5cGUnLCB7IHdyaXRhYmxlOiBmYWxzZSB9KTtcbiAgICAvLyBpbiBWOCB+IENocm9tZSA1MywgcHJvdG90eXBlcyBvZiBzb21lIG1ldGhvZHMsIGxpa2UgYEFycmF5LnByb3RvdHlwZS52YWx1ZXNgLCBhcmUgbm9uLXdyaXRhYmxlXG4gICAgfSBlbHNlIGlmICh2YWx1ZS5wcm90b3R5cGUpIHZhbHVlLnByb3RvdHlwZSA9IHVuZGVmaW5lZDtcbiAgfSBjYXRjaCAoZXJyb3IpIHsgLyogZW1wdHkgKi8gfVxuICB2YXIgc3RhdGUgPSBlbmZvcmNlSW50ZXJuYWxTdGF0ZSh2YWx1ZSk7XG4gIGlmICghaGFzT3duKHN0YXRlLCAnc291cmNlJykpIHtcbiAgICBzdGF0ZS5zb3VyY2UgPSBqb2luKFRFTVBMQVRFLCB0eXBlb2YgbmFtZSA9PSAnc3RyaW5nJyA/IG5hbWUgOiAnJyk7XG4gIH0gcmV0dXJuIHZhbHVlO1xufTtcblxuLy8gYWRkIGZha2UgRnVuY3Rpb24jdG9TdHJpbmcgZm9yIGNvcnJlY3Qgd29yayB3cmFwcGVkIG1ldGhvZHMgLyBjb25zdHJ1Y3RvcnMgd2l0aCBtZXRob2RzIGxpa2UgTG9EYXNoIGlzTmF0aXZlXG4vLyBlc2xpbnQtZGlzYWJsZS1uZXh0LWxpbmUgbm8tZXh0ZW5kLW5hdGl2ZSAtLSByZXF1aXJlZFxuRnVuY3Rpb24ucHJvdG90eXBlLnRvU3RyaW5nID0gbWFrZUJ1aWx0SW4oZnVuY3Rpb24gdG9TdHJpbmcoKSB7XG4gIHJldHVybiBpc0NhbGxhYmxlKHRoaXMpICYmIGdldEludGVybmFsU3RhdGUodGhpcykuc291cmNlIHx8IGluc3BlY3RTb3VyY2UodGhpcyk7XG59LCAndG9TdHJpbmcnKTtcbiIsIid1c2Ugc3RyaWN0JztcbnZhciBjZWlsID0gTWF0aC5jZWlsO1xudmFyIGZsb29yID0gTWF0aC5mbG9vcjtcblxuLy8gYE1hdGgudHJ1bmNgIG1ldGhvZFxuLy8gaHR0cHM6Ly90YzM5LmVzL2VjbWEyNjIvI3NlYy1tYXRoLnRydW5jXG4vLyBlc2xpbnQtZGlzYWJsZS1uZXh0LWxpbmUgZXMvbm8tbWF0aC10cnVuYyAtLSBzYWZlXG5tb2R1bGUuZXhwb3J0cyA9IE1hdGgudHJ1bmMgfHwgZnVuY3Rpb24gdHJ1bmMoeCkge1xuICB2YXIgbiA9ICt4O1xuICByZXR1cm4gKG4gPiAwID8gZmxvb3IgOiBjZWlsKShuKTtcbn07XG4iLCIndXNlIHN0cmljdCc7XG52YXIgREVTQ1JJUFRPUlMgPSByZXF1aXJlKCcuLi9pbnRlcm5hbHMvZGVzY3JpcHRvcnMnKTtcbnZhciB1bmN1cnJ5VGhpcyA9IHJlcXVpcmUoJy4uL2ludGVybmFscy9mdW5jdGlvbi11bmN1cnJ5LXRoaXMnKTtcbnZhciBjYWxsID0gcmVxdWlyZSgnLi4vaW50ZXJuYWxzL2Z1bmN0aW9uLWNhbGwnKTtcbnZhciBmYWlscyA9IHJlcXVpcmUoJy4uL2ludGVybmFscy9mYWlscycpO1xudmFyIG9iamVjdEtleXMgPSByZXF1aXJlKCcuLi9pbnRlcm5hbHMvb2JqZWN0LWtleXMnKTtcbnZhciBnZXRPd25Qcm9wZXJ0eVN5bWJvbHNNb2R1bGUgPSByZXF1aXJlKCcuLi9pbnRlcm5hbHMvb2JqZWN0LWdldC1vd24tcHJvcGVydHktc3ltYm9scycpO1xudmFyIHByb3BlcnR5SXNFbnVtZXJhYmxlTW9kdWxlID0gcmVxdWlyZSgnLi4vaW50ZXJuYWxzL29iamVjdC1wcm9wZXJ0eS1pcy1lbnVtZXJhYmxlJyk7XG52YXIgdG9PYmplY3QgPSByZXF1aXJlKCcuLi9pbnRlcm5hbHMvdG8tb2JqZWN0Jyk7XG52YXIgSW5kZXhlZE9iamVjdCA9IHJlcXVpcmUoJy4uL2ludGVybmFscy9pbmRleGVkLW9iamVjdCcpO1xuXG4vLyBlc2xpbnQtZGlzYWJsZS1uZXh0LWxpbmUgZXMvbm8tb2JqZWN0LWFzc2lnbiAtLSBzYWZlXG52YXIgJGFzc2lnbiA9IE9iamVjdC5hc3NpZ247XG4vLyBlc2xpbnQtZGlzYWJsZS1uZXh0LWxpbmUgZXMvbm8tb2JqZWN0LWRlZmluZXByb3BlcnR5IC0tIHJlcXVpcmVkIGZvciB0ZXN0aW5nXG52YXIgZGVmaW5lUHJvcGVydHkgPSBPYmplY3QuZGVmaW5lUHJvcGVydHk7XG52YXIgY29uY2F0ID0gdW5jdXJyeVRoaXMoW10uY29uY2F0KTtcblxuLy8gYE9iamVjdC5hc3NpZ25gIG1ldGhvZFxuLy8gaHR0cHM6Ly90YzM5LmVzL2VjbWEyNjIvI3NlYy1vYmplY3QuYXNzaWduXG5tb2R1bGUuZXhwb3J0cyA9ICEkYXNzaWduIHx8IGZhaWxzKGZ1bmN0aW9uICgpIHtcbiAgLy8gc2hvdWxkIGhhdmUgY29ycmVjdCBvcmRlciBvZiBvcGVyYXRpb25zIChFZGdlIGJ1ZylcbiAgaWYgKERFU0NSSVBUT1JTICYmICRhc3NpZ24oeyBiOiAxIH0sICRhc3NpZ24oZGVmaW5lUHJvcGVydHkoe30sICdhJywge1xuICAgIGVudW1lcmFibGU6IHRydWUsXG4gICAgZ2V0OiBmdW5jdGlvbiAoKSB7XG4gICAgICBkZWZpbmVQcm9wZXJ0eSh0aGlzLCAnYicsIHtcbiAgICAgICAgdmFsdWU6IDMsXG4gICAgICAgIGVudW1lcmFibGU6IGZhbHNlXG4gICAgICB9KTtcbiAgICB9XG4gIH0pLCB7IGI6IDIgfSkpLmIgIT09IDEpIHJldHVybiB0cnVlO1xuICAvLyBzaG91bGQgd29yayB3aXRoIHN5bWJvbHMgYW5kIHNob3VsZCBoYXZlIGRldGVybWluaXN0aWMgcHJvcGVydHkgb3JkZXIgKFY4IGJ1ZylcbiAgdmFyIEEgPSB7fTtcbiAgdmFyIEIgPSB7fTtcbiAgLy8gZXNsaW50LWRpc2FibGUtbmV4dC1saW5lIGVzL25vLXN5bWJvbCAtLSBzYWZlXG4gIHZhciBzeW1ib2wgPSBTeW1ib2woJ2Fzc2lnbiBkZXRlY3Rpb24nKTtcbiAgdmFyIGFscGhhYmV0ID0gJ2FiY2RlZmdoaWprbG1ub3BxcnN0JztcbiAgQVtzeW1ib2xdID0gNztcbiAgYWxwaGFiZXQuc3BsaXQoJycpLmZvckVhY2goZnVuY3Rpb24gKGNocikgeyBCW2Nocl0gPSBjaHI7IH0pO1xuICByZXR1cm4gJGFzc2lnbih7fSwgQSlbc3ltYm9sXSAhPT0gNyB8fCBvYmplY3RLZXlzKCRhc3NpZ24oe30sIEIpKS5qb2luKCcnKSAhPT0gYWxwaGFiZXQ7XG59KSA/IGZ1bmN0aW9uIGFzc2lnbih0YXJnZXQsIHNvdXJjZSkgeyAvLyBlc2xpbnQtZGlzYWJsZS1saW5lIG5vLXVudXNlZC12YXJzIC0tIHJlcXVpcmVkIGZvciBgLmxlbmd0aGBcbiAgdmFyIFQgPSB0b09iamVjdCh0YXJnZXQpO1xuICB2YXIgYXJndW1lbnRzTGVuZ3RoID0gYXJndW1lbnRzLmxlbmd0aDtcbiAgdmFyIGluZGV4ID0gMTtcbiAgdmFyIGdldE93blByb3BlcnR5U3ltYm9scyA9IGdldE93blByb3BlcnR5U3ltYm9sc01vZHVsZS5mO1xuICB2YXIgcHJvcGVydHlJc0VudW1lcmFibGUgPSBwcm9wZXJ0eUlzRW51bWVyYWJsZU1vZHVsZS5mO1xuICB3aGlsZSAoYXJndW1lbnRzTGVuZ3RoID4gaW5kZXgpIHtcbiAgICB2YXIgUyA9IEluZGV4ZWRPYmplY3QoYXJndW1lbnRzW2luZGV4KytdKTtcbiAgICB2YXIga2V5cyA9IGdldE93blByb3BlcnR5U3ltYm9scyA/IGNvbmNhdChvYmplY3RLZXlzKFMpLCBnZXRPd25Qcm9wZXJ0eVN5bWJvbHMoUykpIDogb2JqZWN0S2V5cyhTKTtcbiAgICB2YXIgbGVuZ3RoID0ga2V5cy5sZW5ndGg7XG4gICAgdmFyIGogPSAwO1xuICAgIHZhciBrZXk7XG4gICAgd2hpbGUgKGxlbmd0aCA+IGopIHtcbiAgICAgIGtleSA9IGtleXNbaisrXTtcbiAgICAgIGlmICghREVTQ1JJUFRPUlMgfHwgY2FsbChwcm9wZXJ0eUlzRW51bWVyYWJsZSwgUywga2V5KSkgVFtrZXldID0gU1trZXldO1xuICAgIH1cbiAgfSByZXR1cm4gVDtcbn0gOiAkYXNzaWduO1xuIiwiJ3VzZSBzdHJpY3QnO1xuLyogZ2xvYmFsIEFjdGl2ZVhPYmplY3QgLS0gb2xkIElFLCBXU0ggKi9cbnZhciBhbk9iamVjdCA9IHJlcXVpcmUoJy4uL2ludGVybmFscy9hbi1vYmplY3QnKTtcbnZhciBkZWZpbmVQcm9wZXJ0aWVzTW9kdWxlID0gcmVxdWlyZSgnLi4vaW50ZXJuYWxzL29iamVjdC1kZWZpbmUtcHJvcGVydGllcycpO1xudmFyIGVudW1CdWdLZXlzID0gcmVxdWlyZSgnLi4vaW50ZXJuYWxzL2VudW0tYnVnLWtleXMnKTtcbnZhciBoaWRkZW5LZXlzID0gcmVxdWlyZSgnLi4vaW50ZXJuYWxzL2hpZGRlbi1rZXlzJyk7XG52YXIgaHRtbCA9IHJlcXVpcmUoJy4uL2ludGVybmFscy9odG1sJyk7XG52YXIgZG9jdW1lbnRDcmVhdGVFbGVtZW50ID0gcmVxdWlyZSgnLi4vaW50ZXJuYWxzL2RvY3VtZW50LWNyZWF0ZS1lbGVtZW50Jyk7XG52YXIgc2hhcmVkS2V5ID0gcmVxdWlyZSgnLi4vaW50ZXJuYWxzL3NoYXJlZC1rZXknKTtcblxudmFyIEdUID0gJz4nO1xudmFyIExUID0gJzwnO1xudmFyIFBST1RPVFlQRSA9ICdwcm90b3R5cGUnO1xudmFyIFNDUklQVCA9ICdzY3JpcHQnO1xudmFyIElFX1BST1RPID0gc2hhcmVkS2V5KCdJRV9QUk9UTycpO1xuXG52YXIgRW1wdHlDb25zdHJ1Y3RvciA9IGZ1bmN0aW9uICgpIHsgLyogZW1wdHkgKi8gfTtcblxudmFyIHNjcmlwdFRhZyA9IGZ1bmN0aW9uIChjb250ZW50KSB7XG4gIHJldHVybiBMVCArIFNDUklQVCArIEdUICsgY29udGVudCArIExUICsgJy8nICsgU0NSSVBUICsgR1Q7XG59O1xuXG4vLyBDcmVhdGUgb2JqZWN0IHdpdGggZmFrZSBgbnVsbGAgcHJvdG90eXBlOiB1c2UgQWN0aXZlWCBPYmplY3Qgd2l0aCBjbGVhcmVkIHByb3RvdHlwZVxudmFyIE51bGxQcm90b09iamVjdFZpYUFjdGl2ZVggPSBmdW5jdGlvbiAoYWN0aXZlWERvY3VtZW50KSB7XG4gIGFjdGl2ZVhEb2N1bWVudC53cml0ZShzY3JpcHRUYWcoJycpKTtcbiAgYWN0aXZlWERvY3VtZW50LmNsb3NlKCk7XG4gIHZhciB0ZW1wID0gYWN0aXZlWERvY3VtZW50LnBhcmVudFdpbmRvdy5PYmplY3Q7XG4gIGFjdGl2ZVhEb2N1bWVudCA9IG51bGw7IC8vIGF2b2lkIG1lbW9yeSBsZWFrXG4gIHJldHVybiB0ZW1wO1xufTtcblxuLy8gQ3JlYXRlIG9iamVjdCB3aXRoIGZha2UgYG51bGxgIHByb3RvdHlwZTogdXNlIGlmcmFtZSBPYmplY3Qgd2l0aCBjbGVhcmVkIHByb3RvdHlwZVxudmFyIE51bGxQcm90b09iamVjdFZpYUlGcmFtZSA9IGZ1bmN0aW9uICgpIHtcbiAgLy8gVGhyYXNoLCB3YXN0ZSBhbmQgc29kb215OiBJRSBHQyBidWdcbiAgdmFyIGlmcmFtZSA9IGRvY3VtZW50Q3JlYXRlRWxlbWVudCgnaWZyYW1lJyk7XG4gIHZhciBKUyA9ICdqYXZhJyArIFNDUklQVCArICc6JztcbiAgdmFyIGlmcmFtZURvY3VtZW50O1xuICBpZnJhbWUuc3R5bGUuZGlzcGxheSA9ICdub25lJztcbiAgaHRtbC5hcHBlbmRDaGlsZChpZnJhbWUpO1xuICAvLyBodHRwczovL2dpdGh1Yi5jb20vemxvaXJvY2svY29yZS1qcy9pc3N1ZXMvNDc1XG4gIGlmcmFtZS5zcmMgPSBTdHJpbmcoSlMpO1xuICBpZnJhbWVEb2N1bWVudCA9IGlmcmFtZS5jb250ZW50V2luZG93LmRvY3VtZW50O1xuICBpZnJhbWVEb2N1bWVudC5vcGVuKCk7XG4gIGlmcmFtZURvY3VtZW50LndyaXRlKHNjcmlwdFRhZygnZG9jdW1lbnQuRj1PYmplY3QnKSk7XG4gIGlmcmFtZURvY3VtZW50LmNsb3NlKCk7XG4gIHJldHVybiBpZnJhbWVEb2N1bWVudC5GO1xufTtcblxuLy8gQ2hlY2sgZm9yIGRvY3VtZW50LmRvbWFpbiBhbmQgYWN0aXZlIHggc3VwcG9ydFxuLy8gTm8gbmVlZCB0byB1c2UgYWN0aXZlIHggYXBwcm9hY2ggd2hlbiBkb2N1bWVudC5kb21haW4gaXMgbm90IHNldFxuLy8gc2VlIGh0dHBzOi8vZ2l0aHViLmNvbS9lcy1zaGltcy9lczUtc2hpbS9pc3N1ZXMvMTUwXG4vLyB2YXJpYXRpb24gb2YgaHR0cHM6Ly9naXRodWIuY29tL2tpdGNhbWJyaWRnZS9lczUtc2hpbS9jb21taXQvNGY3MzhhYzA2NjM0NlxuLy8gYXZvaWQgSUUgR0MgYnVnXG52YXIgYWN0aXZlWERvY3VtZW50O1xudmFyIE51bGxQcm90b09iamVjdCA9IGZ1bmN0aW9uICgpIHtcbiAgdHJ5IHtcbiAgICBhY3RpdmVYRG9jdW1lbnQgPSBuZXcgQWN0aXZlWE9iamVjdCgnaHRtbGZpbGUnKTtcbiAgfSBjYXRjaCAoZXJyb3IpIHsgLyogaWdub3JlICovIH1cbiAgTnVsbFByb3RvT2JqZWN0ID0gdHlwZW9mIGRvY3VtZW50ICE9ICd1bmRlZmluZWQnXG4gICAgPyBkb2N1bWVudC5kb21haW4gJiYgYWN0aXZlWERvY3VtZW50XG4gICAgICA/IE51bGxQcm90b09iamVjdFZpYUFjdGl2ZVgoYWN0aXZlWERvY3VtZW50KSAvLyBvbGQgSUVcbiAgICAgIDogTnVsbFByb3RvT2JqZWN0VmlhSUZyYW1lKClcbiAgICA6IE51bGxQcm90b09iamVjdFZpYUFjdGl2ZVgoYWN0aXZlWERvY3VtZW50KTsgLy8gV1NIXG4gIHZhciBsZW5ndGggPSBlbnVtQnVnS2V5cy5sZW5ndGg7XG4gIHdoaWxlIChsZW5ndGgtLSkgZGVsZXRlIE51bGxQcm90b09iamVjdFtQUk9UT1RZUEVdW2VudW1CdWdLZXlzW2xlbmd0aF1dO1xuICByZXR1cm4gTnVsbFByb3RvT2JqZWN0KCk7XG59O1xuXG5oaWRkZW5LZXlzW0lFX1BST1RPXSA9IHRydWU7XG5cbi8vIGBPYmplY3QuY3JlYXRlYCBtZXRob2Rcbi8vIGh0dHBzOi8vdGMzOS5lcy9lY21hMjYyLyNzZWMtb2JqZWN0LmNyZWF0ZVxuLy8gZXNsaW50LWRpc2FibGUtbmV4dC1saW5lIGVzL25vLW9iamVjdC1jcmVhdGUgLS0gc2FmZVxubW9kdWxlLmV4cG9ydHMgPSBPYmplY3QuY3JlYXRlIHx8IGZ1bmN0aW9uIGNyZWF0ZShPLCBQcm9wZXJ0aWVzKSB7XG4gIHZhciByZXN1bHQ7XG4gIGlmIChPICE9PSBudWxsKSB7XG4gICAgRW1wdHlDb25zdHJ1Y3RvcltQUk9UT1RZUEVdID0gYW5PYmplY3QoTyk7XG4gICAgcmVzdWx0ID0gbmV3IEVtcHR5Q29uc3RydWN0b3IoKTtcbiAgICBFbXB0eUNvbnN0cnVjdG9yW1BST1RPVFlQRV0gPSBudWxsO1xuICAgIC8vIGFkZCBcIl9fcHJvdG9fX1wiIGZvciBPYmplY3QuZ2V0UHJvdG90eXBlT2YgcG9seWZpbGxcbiAgICByZXN1bHRbSUVfUFJPVE9dID0gTztcbiAgfSBlbHNlIHJlc3VsdCA9IE51bGxQcm90b09iamVjdCgpO1xuICByZXR1cm4gUHJvcGVydGllcyA9PT0gdW5kZWZpbmVkID8gcmVzdWx0IDogZGVmaW5lUHJvcGVydGllc01vZHVsZS5mKHJlc3VsdCwgUHJvcGVydGllcyk7XG59O1xuIiwiJ3VzZSBzdHJpY3QnO1xudmFyIERFU0NSSVBUT1JTID0gcmVxdWlyZSgnLi4vaW50ZXJuYWxzL2Rlc2NyaXB0b3JzJyk7XG52YXIgVjhfUFJPVE9UWVBFX0RFRklORV9CVUcgPSByZXF1aXJlKCcuLi9pbnRlcm5hbHMvdjgtcHJvdG90eXBlLWRlZmluZS1idWcnKTtcbnZhciBkZWZpbmVQcm9wZXJ0eU1vZHVsZSA9IHJlcXVpcmUoJy4uL2ludGVybmFscy9vYmplY3QtZGVmaW5lLXByb3BlcnR5Jyk7XG52YXIgYW5PYmplY3QgPSByZXF1aXJlKCcuLi9pbnRlcm5hbHMvYW4tb2JqZWN0Jyk7XG52YXIgdG9JbmRleGVkT2JqZWN0ID0gcmVxdWlyZSgnLi4vaW50ZXJuYWxzL3RvLWluZGV4ZWQtb2JqZWN0Jyk7XG52YXIgb2JqZWN0S2V5cyA9IHJlcXVpcmUoJy4uL2ludGVybmFscy9vYmplY3Qta2V5cycpO1xuXG4vLyBgT2JqZWN0LmRlZmluZVByb3BlcnRpZXNgIG1ldGhvZFxuLy8gaHR0cHM6Ly90YzM5LmVzL2VjbWEyNjIvI3NlYy1vYmplY3QuZGVmaW5lcHJvcGVydGllc1xuLy8gZXNsaW50LWRpc2FibGUtbmV4dC1saW5lIGVzL25vLW9iamVjdC1kZWZpbmVwcm9wZXJ0aWVzIC0tIHNhZmVcbmV4cG9ydHMuZiA9IERFU0NSSVBUT1JTICYmICFWOF9QUk9UT1RZUEVfREVGSU5FX0JVRyA/IE9iamVjdC5kZWZpbmVQcm9wZXJ0aWVzIDogZnVuY3Rpb24gZGVmaW5lUHJvcGVydGllcyhPLCBQcm9wZXJ0aWVzKSB7XG4gIGFuT2JqZWN0KE8pO1xuICB2YXIgcHJvcHMgPSB0b0luZGV4ZWRPYmplY3QoUHJvcGVydGllcyk7XG4gIHZhciBrZXlzID0gb2JqZWN0S2V5cyhQcm9wZXJ0aWVzKTtcbiAgdmFyIGxlbmd0aCA9IGtleXMubGVuZ3RoO1xuICB2YXIgaW5kZXggPSAwO1xuICB2YXIga2V5O1xuICB3aGlsZSAobGVuZ3RoID4gaW5kZXgpIGRlZmluZVByb3BlcnR5TW9kdWxlLmYoTywga2V5ID0ga2V5c1tpbmRleCsrXSwgcHJvcHNba2V5XSk7XG4gIHJldHVybiBPO1xufTtcbiIsIid1c2Ugc3RyaWN0JztcbnZhciBERVNDUklQVE9SUyA9IHJlcXVpcmUoJy4uL2ludGVybmFscy9kZXNjcmlwdG9ycycpO1xudmFyIElFOF9ET01fREVGSU5FID0gcmVxdWlyZSgnLi4vaW50ZXJuYWxzL2llOC1kb20tZGVmaW5lJyk7XG52YXIgVjhfUFJPVE9UWVBFX0RFRklORV9CVUcgPSByZXF1aXJlKCcuLi9pbnRlcm5hbHMvdjgtcHJvdG90eXBlLWRlZmluZS1idWcnKTtcbnZhciBhbk9iamVjdCA9IHJlcXVpcmUoJy4uL2ludGVybmFscy9hbi1vYmplY3QnKTtcbnZhciB0b1Byb3BlcnR5S2V5ID0gcmVxdWlyZSgnLi4vaW50ZXJuYWxzL3RvLXByb3BlcnR5LWtleScpO1xuXG52YXIgJFR5cGVFcnJvciA9IFR5cGVFcnJvcjtcbi8vIGVzbGludC1kaXNhYmxlLW5leHQtbGluZSBlcy9uby1vYmplY3QtZGVmaW5lcHJvcGVydHkgLS0gc2FmZVxudmFyICRkZWZpbmVQcm9wZXJ0eSA9IE9iamVjdC5kZWZpbmVQcm9wZXJ0eTtcbi8vIGVzbGludC1kaXNhYmxlLW5leHQtbGluZSBlcy9uby1vYmplY3QtZ2V0b3ducHJvcGVydHlkZXNjcmlwdG9yIC0tIHNhZmVcbnZhciAkZ2V0T3duUHJvcGVydHlEZXNjcmlwdG9yID0gT2JqZWN0LmdldE93blByb3BlcnR5RGVzY3JpcHRvcjtcbnZhciBFTlVNRVJBQkxFID0gJ2VudW1lcmFibGUnO1xudmFyIENPTkZJR1VSQUJMRSA9ICdjb25maWd1cmFibGUnO1xudmFyIFdSSVRBQkxFID0gJ3dyaXRhYmxlJztcblxuLy8gYE9iamVjdC5kZWZpbmVQcm9wZXJ0eWAgbWV0aG9kXG4vLyBodHRwczovL3RjMzkuZXMvZWNtYTI2Mi8jc2VjLW9iamVjdC5kZWZpbmVwcm9wZXJ0eVxuZXhwb3J0cy5mID0gREVTQ1JJUFRPUlMgPyBWOF9QUk9UT1RZUEVfREVGSU5FX0JVRyA/IGZ1bmN0aW9uIGRlZmluZVByb3BlcnR5KE8sIFAsIEF0dHJpYnV0ZXMpIHtcbiAgYW5PYmplY3QoTyk7XG4gIFAgPSB0b1Byb3BlcnR5S2V5KFApO1xuICBhbk9iamVjdChBdHRyaWJ1dGVzKTtcbiAgaWYgKHR5cGVvZiBPID09PSAnZnVuY3Rpb24nICYmIFAgPT09ICdwcm90b3R5cGUnICYmICd2YWx1ZScgaW4gQXR0cmlidXRlcyAmJiBXUklUQUJMRSBpbiBBdHRyaWJ1dGVzICYmICFBdHRyaWJ1dGVzW1dSSVRBQkxFXSkge1xuICAgIHZhciBjdXJyZW50ID0gJGdldE93blByb3BlcnR5RGVzY3JpcHRvcihPLCBQKTtcbiAgICBpZiAoY3VycmVudCAmJiBjdXJyZW50W1dSSVRBQkxFXSkge1xuICAgICAgT1tQXSA9IEF0dHJpYnV0ZXMudmFsdWU7XG4gICAgICBBdHRyaWJ1dGVzID0ge1xuICAgICAgICBjb25maWd1cmFibGU6IENPTkZJR1VSQUJMRSBpbiBBdHRyaWJ1dGVzID8gQXR0cmlidXRlc1tDT05GSUdVUkFCTEVdIDogY3VycmVudFtDT05GSUdVUkFCTEVdLFxuICAgICAgICBlbnVtZXJhYmxlOiBFTlVNRVJBQkxFIGluIEF0dHJpYnV0ZXMgPyBBdHRyaWJ1dGVzW0VOVU1FUkFCTEVdIDogY3VycmVudFtFTlVNRVJBQkxFXSxcbiAgICAgICAgd3JpdGFibGU6IGZhbHNlXG4gICAgICB9O1xuICAgIH1cbiAgfSByZXR1cm4gJGRlZmluZVByb3BlcnR5KE8sIFAsIEF0dHJpYnV0ZXMpO1xufSA6ICRkZWZpbmVQcm9wZXJ0eSA6IGZ1bmN0aW9uIGRlZmluZVByb3BlcnR5KE8sIFAsIEF0dHJpYnV0ZXMpIHtcbiAgYW5PYmplY3QoTyk7XG4gIFAgPSB0b1Byb3BlcnR5S2V5KFApO1xuICBhbk9iamVjdChBdHRyaWJ1dGVzKTtcbiAgaWYgKElFOF9ET01fREVGSU5FKSB0cnkge1xuICAgIHJldHVybiAkZGVmaW5lUHJvcGVydHkoTywgUCwgQXR0cmlidXRlcyk7XG4gIH0gY2F0Y2ggKGVycm9yKSB7IC8qIGVtcHR5ICovIH1cbiAgaWYgKCdnZXQnIGluIEF0dHJpYnV0ZXMgfHwgJ3NldCcgaW4gQXR0cmlidXRlcykgdGhyb3cgbmV3ICRUeXBlRXJyb3IoJ0FjY2Vzc29ycyBub3Qgc3VwcG9ydGVkJyk7XG4gIGlmICgndmFsdWUnIGluIEF0dHJpYnV0ZXMpIE9bUF0gPSBBdHRyaWJ1dGVzLnZhbHVlO1xuICByZXR1cm4gTztcbn07XG4iLCIndXNlIHN0cmljdCc7XG52YXIgREVTQ1JJUFRPUlMgPSByZXF1aXJlKCcuLi9pbnRlcm5hbHMvZGVzY3JpcHRvcnMnKTtcbnZhciBjYWxsID0gcmVxdWlyZSgnLi4vaW50ZXJuYWxzL2Z1bmN0aW9uLWNhbGwnKTtcbnZhciBwcm9wZXJ0eUlzRW51bWVyYWJsZU1vZHVsZSA9IHJlcXVpcmUoJy4uL2ludGVybmFscy9vYmplY3QtcHJvcGVydHktaXMtZW51bWVyYWJsZScpO1xudmFyIGNyZWF0ZVByb3BlcnR5RGVzY3JpcHRvciA9IHJlcXVpcmUoJy4uL2ludGVybmFscy9jcmVhdGUtcHJvcGVydHktZGVzY3JpcHRvcicpO1xudmFyIHRvSW5kZXhlZE9iamVjdCA9IHJlcXVpcmUoJy4uL2ludGVybmFscy90by1pbmRleGVkLW9iamVjdCcpO1xudmFyIHRvUHJvcGVydHlLZXkgPSByZXF1aXJlKCcuLi9pbnRlcm5hbHMvdG8tcHJvcGVydHkta2V5Jyk7XG52YXIgaGFzT3duID0gcmVxdWlyZSgnLi4vaW50ZXJuYWxzL2hhcy1vd24tcHJvcGVydHknKTtcbnZhciBJRThfRE9NX0RFRklORSA9IHJlcXVpcmUoJy4uL2ludGVybmFscy9pZTgtZG9tLWRlZmluZScpO1xuXG4vLyBlc2xpbnQtZGlzYWJsZS1uZXh0LWxpbmUgZXMvbm8tb2JqZWN0LWdldG93bnByb3BlcnR5ZGVzY3JpcHRvciAtLSBzYWZlXG52YXIgJGdldE93blByb3BlcnR5RGVzY3JpcHRvciA9IE9iamVjdC5nZXRPd25Qcm9wZXJ0eURlc2NyaXB0b3I7XG5cbi8vIGBPYmplY3QuZ2V0T3duUHJvcGVydHlEZXNjcmlwdG9yYCBtZXRob2Rcbi8vIGh0dHBzOi8vdGMzOS5lcy9lY21hMjYyLyNzZWMtb2JqZWN0LmdldG93bnByb3BlcnR5ZGVzY3JpcHRvclxuZXhwb3J0cy5mID0gREVTQ1JJUFRPUlMgPyAkZ2V0T3duUHJvcGVydHlEZXNjcmlwdG9yIDogZnVuY3Rpb24gZ2V0T3duUHJvcGVydHlEZXNjcmlwdG9yKE8sIFApIHtcbiAgTyA9IHRvSW5kZXhlZE9iamVjdChPKTtcbiAgUCA9IHRvUHJvcGVydHlLZXkoUCk7XG4gIGlmIChJRThfRE9NX0RFRklORSkgdHJ5IHtcbiAgICByZXR1cm4gJGdldE93blByb3BlcnR5RGVzY3JpcHRvcihPLCBQKTtcbiAgfSBjYXRjaCAoZXJyb3IpIHsgLyogZW1wdHkgKi8gfVxuICBpZiAoaGFzT3duKE8sIFApKSByZXR1cm4gY3JlYXRlUHJvcGVydHlEZXNjcmlwdG9yKCFjYWxsKHByb3BlcnR5SXNFbnVtZXJhYmxlTW9kdWxlLmYsIE8sIFApLCBPW1BdKTtcbn07XG4iLCIndXNlIHN0cmljdCc7XG52YXIgaW50ZXJuYWxPYmplY3RLZXlzID0gcmVxdWlyZSgnLi4vaW50ZXJuYWxzL29iamVjdC1rZXlzLWludGVybmFsJyk7XG52YXIgZW51bUJ1Z0tleXMgPSByZXF1aXJlKCcuLi9pbnRlcm5hbHMvZW51bS1idWcta2V5cycpO1xuXG52YXIgaGlkZGVuS2V5cyA9IGVudW1CdWdLZXlzLmNvbmNhdCgnbGVuZ3RoJywgJ3Byb3RvdHlwZScpO1xuXG4vLyBgT2JqZWN0LmdldE93blByb3BlcnR5TmFtZXNgIG1ldGhvZFxuLy8gaHR0cHM6Ly90YzM5LmVzL2VjbWEyNjIvI3NlYy1vYmplY3QuZ2V0b3ducHJvcGVydHluYW1lc1xuLy8gZXNsaW50LWRpc2FibGUtbmV4dC1saW5lIGVzL25vLW9iamVjdC1nZXRvd25wcm9wZXJ0eW5hbWVzIC0tIHNhZmVcbmV4cG9ydHMuZiA9IE9iamVjdC5nZXRPd25Qcm9wZXJ0eU5hbWVzIHx8IGZ1bmN0aW9uIGdldE93blByb3BlcnR5TmFtZXMoTykge1xuICByZXR1cm4gaW50ZXJuYWxPYmplY3RLZXlzKE8sIGhpZGRlbktleXMpO1xufTtcbiIsIid1c2Ugc3RyaWN0Jztcbi8vIGVzbGludC1kaXNhYmxlLW5leHQtbGluZSBlcy9uby1vYmplY3QtZ2V0b3ducHJvcGVydHlzeW1ib2xzIC0tIHNhZmVcbmV4cG9ydHMuZiA9IE9iamVjdC5nZXRPd25Qcm9wZXJ0eVN5bWJvbHM7XG4iLCIndXNlIHN0cmljdCc7XG52YXIgaGFzT3duID0gcmVxdWlyZSgnLi4vaW50ZXJuYWxzL2hhcy1vd24tcHJvcGVydHknKTtcbnZhciBpc0NhbGxhYmxlID0gcmVxdWlyZSgnLi4vaW50ZXJuYWxzL2lzLWNhbGxhYmxlJyk7XG52YXIgdG9PYmplY3QgPSByZXF1aXJlKCcuLi9pbnRlcm5hbHMvdG8tb2JqZWN0Jyk7XG52YXIgc2hhcmVkS2V5ID0gcmVxdWlyZSgnLi4vaW50ZXJuYWxzL3NoYXJlZC1rZXknKTtcbnZhciBDT1JSRUNUX1BST1RPVFlQRV9HRVRURVIgPSByZXF1aXJlKCcuLi9pbnRlcm5hbHMvY29ycmVjdC1wcm90b3R5cGUtZ2V0dGVyJyk7XG5cbnZhciBJRV9QUk9UTyA9IHNoYXJlZEtleSgnSUVfUFJPVE8nKTtcbnZhciAkT2JqZWN0ID0gT2JqZWN0O1xudmFyIE9iamVjdFByb3RvdHlwZSA9ICRPYmplY3QucHJvdG90eXBlO1xuXG4vLyBgT2JqZWN0LmdldFByb3RvdHlwZU9mYCBtZXRob2Rcbi8vIGh0dHBzOi8vdGMzOS5lcy9lY21hMjYyLyNzZWMtb2JqZWN0LmdldHByb3RvdHlwZW9mXG4vLyBlc2xpbnQtZGlzYWJsZS1uZXh0LWxpbmUgZXMvbm8tb2JqZWN0LWdldHByb3RvdHlwZW9mIC0tIHNhZmVcbm1vZHVsZS5leHBvcnRzID0gQ09SUkVDVF9QUk9UT1RZUEVfR0VUVEVSID8gJE9iamVjdC5nZXRQcm90b3R5cGVPZiA6IGZ1bmN0aW9uIChPKSB7XG4gIHZhciBvYmplY3QgPSB0b09iamVjdChPKTtcbiAgaWYgKGhhc093bihvYmplY3QsIElFX1BST1RPKSkgcmV0dXJuIG9iamVjdFtJRV9QUk9UT107XG4gIHZhciBjb25zdHJ1Y3RvciA9IG9iamVjdC5jb25zdHJ1Y3RvcjtcbiAgaWYgKGlzQ2FsbGFibGUoY29uc3RydWN0b3IpICYmIG9iamVjdCBpbnN0YW5jZW9mIGNvbnN0cnVjdG9yKSB7XG4gICAgcmV0dXJuIGNvbnN0cnVjdG9yLnByb3RvdHlwZTtcbiAgfSByZXR1cm4gb2JqZWN0IGluc3RhbmNlb2YgJE9iamVjdCA/IE9iamVjdFByb3RvdHlwZSA6IG51bGw7XG59O1xuIiwiJ3VzZSBzdHJpY3QnO1xudmFyIHVuY3VycnlUaGlzID0gcmVxdWlyZSgnLi4vaW50ZXJuYWxzL2Z1bmN0aW9uLXVuY3VycnktdGhpcycpO1xuXG5tb2R1bGUuZXhwb3J0cyA9IHVuY3VycnlUaGlzKHt9LmlzUHJvdG90eXBlT2YpO1xuIiwiJ3VzZSBzdHJpY3QnO1xudmFyIHVuY3VycnlUaGlzID0gcmVxdWlyZSgnLi4vaW50ZXJuYWxzL2Z1bmN0aW9uLXVuY3VycnktdGhpcycpO1xudmFyIGhhc093biA9IHJlcXVpcmUoJy4uL2ludGVybmFscy9oYXMtb3duLXByb3BlcnR5Jyk7XG52YXIgdG9JbmRleGVkT2JqZWN0ID0gcmVxdWlyZSgnLi4vaW50ZXJuYWxzL3RvLWluZGV4ZWQtb2JqZWN0Jyk7XG52YXIgaW5kZXhPZiA9IHJlcXVpcmUoJy4uL2ludGVybmFscy9hcnJheS1pbmNsdWRlcycpLmluZGV4T2Y7XG52YXIgaGlkZGVuS2V5cyA9IHJlcXVpcmUoJy4uL2ludGVybmFscy9oaWRkZW4ta2V5cycpO1xuXG52YXIgcHVzaCA9IHVuY3VycnlUaGlzKFtdLnB1c2gpO1xuXG5tb2R1bGUuZXhwb3J0cyA9IGZ1bmN0aW9uIChvYmplY3QsIG5hbWVzKSB7XG4gIHZhciBPID0gdG9JbmRleGVkT2JqZWN0KG9iamVjdCk7XG4gIHZhciBpID0gMDtcbiAgdmFyIHJlc3VsdCA9IFtdO1xuICB2YXIga2V5O1xuICBmb3IgKGtleSBpbiBPKSAhaGFzT3duKGhpZGRlbktleXMsIGtleSkgJiYgaGFzT3duKE8sIGtleSkgJiYgcHVzaChyZXN1bHQsIGtleSk7XG4gIC8vIERvbid0IGVudW0gYnVnICYgaGlkZGVuIGtleXNcbiAgd2hpbGUgKG5hbWVzLmxlbmd0aCA+IGkpIGlmIChoYXNPd24oTywga2V5ID0gbmFtZXNbaSsrXSkpIHtcbiAgICB+aW5kZXhPZihyZXN1bHQsIGtleSkgfHwgcHVzaChyZXN1bHQsIGtleSk7XG4gIH1cbiAgcmV0dXJuIHJlc3VsdDtcbn07XG4iLCIndXNlIHN0cmljdCc7XG52YXIgaW50ZXJuYWxPYmplY3RLZXlzID0gcmVxdWlyZSgnLi4vaW50ZXJuYWxzL29iamVjdC1rZXlzLWludGVybmFsJyk7XG52YXIgZW51bUJ1Z0tleXMgPSByZXF1aXJlKCcuLi9pbnRlcm5hbHMvZW51bS1idWcta2V5cycpO1xuXG4vLyBgT2JqZWN0LmtleXNgIG1ldGhvZFxuLy8gaHR0cHM6Ly90YzM5LmVzL2VjbWEyNjIvI3NlYy1vYmplY3Qua2V5c1xuLy8gZXNsaW50LWRpc2FibGUtbmV4dC1saW5lIGVzL25vLW9iamVjdC1rZXlzIC0tIHNhZmVcbm1vZHVsZS5leHBvcnRzID0gT2JqZWN0LmtleXMgfHwgZnVuY3Rpb24ga2V5cyhPKSB7XG4gIHJldHVybiBpbnRlcm5hbE9iamVjdEtleXMoTywgZW51bUJ1Z0tleXMpO1xufTtcbiIsIid1c2Ugc3RyaWN0JztcbnZhciAkcHJvcGVydHlJc0VudW1lcmFibGUgPSB7fS5wcm9wZXJ0eUlzRW51bWVyYWJsZTtcbi8vIGVzbGludC1kaXNhYmxlLW5leHQtbGluZSBlcy9uby1vYmplY3QtZ2V0b3ducHJvcGVydHlkZXNjcmlwdG9yIC0tIHNhZmVcbnZhciBnZXRPd25Qcm9wZXJ0eURlc2NyaXB0b3IgPSBPYmplY3QuZ2V0T3duUHJvcGVydHlEZXNjcmlwdG9yO1xuXG4vLyBOYXNob3JuIH4gSkRLOCBidWdcbnZhciBOQVNIT1JOX0JVRyA9IGdldE93blByb3BlcnR5RGVzY3JpcHRvciAmJiAhJHByb3BlcnR5SXNFbnVtZXJhYmxlLmNhbGwoeyAxOiAyIH0sIDEpO1xuXG4vLyBgT2JqZWN0LnByb3RvdHlwZS5wcm9wZXJ0eUlzRW51bWVyYWJsZWAgbWV0aG9kIGltcGxlbWVudGF0aW9uXG4vLyBodHRwczovL3RjMzkuZXMvZWNtYTI2Mi8jc2VjLW9iamVjdC5wcm90b3R5cGUucHJvcGVydHlpc2VudW1lcmFibGVcbmV4cG9ydHMuZiA9IE5BU0hPUk5fQlVHID8gZnVuY3Rpb24gcHJvcGVydHlJc0VudW1lcmFibGUoVikge1xuICB2YXIgZGVzY3JpcHRvciA9IGdldE93blByb3BlcnR5RGVzY3JpcHRvcih0aGlzLCBWKTtcbiAgcmV0dXJuICEhZGVzY3JpcHRvciAmJiBkZXNjcmlwdG9yLmVudW1lcmFibGU7XG59IDogJHByb3BlcnR5SXNFbnVtZXJhYmxlO1xuIiwiJ3VzZSBzdHJpY3QnO1xuLyogZXNsaW50LWRpc2FibGUgbm8tcHJvdG8gLS0gc2FmZSAqL1xudmFyIHVuY3VycnlUaGlzQWNjZXNzb3IgPSByZXF1aXJlKCcuLi9pbnRlcm5hbHMvZnVuY3Rpb24tdW5jdXJyeS10aGlzLWFjY2Vzc29yJyk7XG52YXIgaXNPYmplY3QgPSByZXF1aXJlKCcuLi9pbnRlcm5hbHMvaXMtb2JqZWN0Jyk7XG52YXIgcmVxdWlyZU9iamVjdENvZXJjaWJsZSA9IHJlcXVpcmUoJy4uL2ludGVybmFscy9yZXF1aXJlLW9iamVjdC1jb2VyY2libGUnKTtcbnZhciBhUG9zc2libGVQcm90b3R5cGUgPSByZXF1aXJlKCcuLi9pbnRlcm5hbHMvYS1wb3NzaWJsZS1wcm90b3R5cGUnKTtcblxuLy8gYE9iamVjdC5zZXRQcm90b3R5cGVPZmAgbWV0aG9kXG4vLyBodHRwczovL3RjMzkuZXMvZWNtYTI2Mi8jc2VjLW9iamVjdC5zZXRwcm90b3R5cGVvZlxuLy8gV29ya3Mgd2l0aCBfX3Byb3RvX18gb25seS4gT2xkIHY4IGNhbid0IHdvcmsgd2l0aCBudWxsIHByb3RvIG9iamVjdHMuXG4vLyBlc2xpbnQtZGlzYWJsZS1uZXh0LWxpbmUgZXMvbm8tb2JqZWN0LXNldHByb3RvdHlwZW9mIC0tIHNhZmVcbm1vZHVsZS5leHBvcnRzID0gT2JqZWN0LnNldFByb3RvdHlwZU9mIHx8ICgnX19wcm90b19fJyBpbiB7fSA/IGZ1bmN0aW9uICgpIHtcbiAgdmFyIENPUlJFQ1RfU0VUVEVSID0gZmFsc2U7XG4gIHZhciB0ZXN0ID0ge307XG4gIHZhciBzZXR0ZXI7XG4gIHRyeSB7XG4gICAgc2V0dGVyID0gdW5jdXJyeVRoaXNBY2Nlc3NvcihPYmplY3QucHJvdG90eXBlLCAnX19wcm90b19fJywgJ3NldCcpO1xuICAgIHNldHRlcih0ZXN0LCBbXSk7XG4gICAgQ09SUkVDVF9TRVRURVIgPSB0ZXN0IGluc3RhbmNlb2YgQXJyYXk7XG4gIH0gY2F0Y2ggKGVycm9yKSB7IC8qIGVtcHR5ICovIH1cbiAgcmV0dXJuIGZ1bmN0aW9uIHNldFByb3RvdHlwZU9mKE8sIHByb3RvKSB7XG4gICAgcmVxdWlyZU9iamVjdENvZXJjaWJsZShPKTtcbiAgICBhUG9zc2libGVQcm90b3R5cGUocHJvdG8pO1xuICAgIGlmICghaXNPYmplY3QoTykpIHJldHVybiBPO1xuICAgIGlmIChDT1JSRUNUX1NFVFRFUikgc2V0dGVyKE8sIHByb3RvKTtcbiAgICBlbHNlIE8uX19wcm90b19fID0gcHJvdG87XG4gICAgcmV0dXJuIE87XG4gIH07XG59KCkgOiB1bmRlZmluZWQpO1xuIiwiJ3VzZSBzdHJpY3QnO1xudmFyIGNhbGwgPSByZXF1aXJlKCcuLi9pbnRlcm5hbHMvZnVuY3Rpb24tY2FsbCcpO1xudmFyIGlzQ2FsbGFibGUgPSByZXF1aXJlKCcuLi9pbnRlcm5hbHMvaXMtY2FsbGFibGUnKTtcbnZhciBpc09iamVjdCA9IHJlcXVpcmUoJy4uL2ludGVybmFscy9pcy1vYmplY3QnKTtcblxudmFyICRUeXBlRXJyb3IgPSBUeXBlRXJyb3I7XG5cbi8vIGBPcmRpbmFyeVRvUHJpbWl0aXZlYCBhYnN0cmFjdCBvcGVyYXRpb25cbi8vIGh0dHBzOi8vdGMzOS5lcy9lY21hMjYyLyNzZWMtb3JkaW5hcnl0b3ByaW1pdGl2ZVxubW9kdWxlLmV4cG9ydHMgPSBmdW5jdGlvbiAoaW5wdXQsIHByZWYpIHtcbiAgdmFyIGZuLCB2YWw7XG4gIGlmIChwcmVmID09PSAnc3RyaW5nJyAmJiBpc0NhbGxhYmxlKGZuID0gaW5wdXQudG9TdHJpbmcpICYmICFpc09iamVjdCh2YWwgPSBjYWxsKGZuLCBpbnB1dCkpKSByZXR1cm4gdmFsO1xuICBpZiAoaXNDYWxsYWJsZShmbiA9IGlucHV0LnZhbHVlT2YpICYmICFpc09iamVjdCh2YWwgPSBjYWxsKGZuLCBpbnB1dCkpKSByZXR1cm4gdmFsO1xuICBpZiAocHJlZiAhPT0gJ3N0cmluZycgJiYgaXNDYWxsYWJsZShmbiA9IGlucHV0LnRvU3RyaW5nKSAmJiAhaXNPYmplY3QodmFsID0gY2FsbChmbiwgaW5wdXQpKSkgcmV0dXJuIHZhbDtcbiAgdGhyb3cgbmV3ICRUeXBlRXJyb3IoXCJDYW4ndCBjb252ZXJ0IG9iamVjdCB0byBwcmltaXRpdmUgdmFsdWVcIik7XG59O1xuIiwiJ3VzZSBzdHJpY3QnO1xudmFyIGdldEJ1aWx0SW4gPSByZXF1aXJlKCcuLi9pbnRlcm5hbHMvZ2V0LWJ1aWx0LWluJyk7XG52YXIgdW5jdXJyeVRoaXMgPSByZXF1aXJlKCcuLi9pbnRlcm5hbHMvZnVuY3Rpb24tdW5jdXJyeS10aGlzJyk7XG52YXIgZ2V0T3duUHJvcGVydHlOYW1lc01vZHVsZSA9IHJlcXVpcmUoJy4uL2ludGVybmFscy9vYmplY3QtZ2V0LW93bi1wcm9wZXJ0eS1uYW1lcycpO1xudmFyIGdldE93blByb3BlcnR5U3ltYm9sc01vZHVsZSA9IHJlcXVpcmUoJy4uL2ludGVybmFscy9vYmplY3QtZ2V0LW93bi1wcm9wZXJ0eS1zeW1ib2xzJyk7XG52YXIgYW5PYmplY3QgPSByZXF1aXJlKCcuLi9pbnRlcm5hbHMvYW4tb2JqZWN0Jyk7XG5cbnZhciBjb25jYXQgPSB1bmN1cnJ5VGhpcyhbXS5jb25jYXQpO1xuXG4vLyBhbGwgb2JqZWN0IGtleXMsIGluY2x1ZGVzIG5vbi1lbnVtZXJhYmxlIGFuZCBzeW1ib2xzXG5tb2R1bGUuZXhwb3J0cyA9IGdldEJ1aWx0SW4oJ1JlZmxlY3QnLCAnb3duS2V5cycpIHx8IGZ1bmN0aW9uIG93bktleXMoaXQpIHtcbiAgdmFyIGtleXMgPSBnZXRPd25Qcm9wZXJ0eU5hbWVzTW9kdWxlLmYoYW5PYmplY3QoaXQpKTtcbiAgdmFyIGdldE93blByb3BlcnR5U3ltYm9scyA9IGdldE93blByb3BlcnR5U3ltYm9sc01vZHVsZS5mO1xuICByZXR1cm4gZ2V0T3duUHJvcGVydHlTeW1ib2xzID8gY29uY2F0KGtleXMsIGdldE93blByb3BlcnR5U3ltYm9scyhpdCkpIDoga2V5cztcbn07XG4iLCIndXNlIHN0cmljdCc7XG52YXIgZGVmaW5lUHJvcGVydHkgPSByZXF1aXJlKCcuLi9pbnRlcm5hbHMvb2JqZWN0LWRlZmluZS1wcm9wZXJ0eScpLmY7XG5cbm1vZHVsZS5leHBvcnRzID0gZnVuY3Rpb24gKFRhcmdldCwgU291cmNlLCBrZXkpIHtcbiAga2V5IGluIFRhcmdldCB8fCBkZWZpbmVQcm9wZXJ0eShUYXJnZXQsIGtleSwge1xuICAgIGNvbmZpZ3VyYWJsZTogdHJ1ZSxcbiAgICBnZXQ6IGZ1bmN0aW9uICgpIHsgcmV0dXJuIFNvdXJjZVtrZXldOyB9LFxuICAgIHNldDogZnVuY3Rpb24gKGl0KSB7IFNvdXJjZVtrZXldID0gaXQ7IH1cbiAgfSk7XG59O1xuIiwiJ3VzZSBzdHJpY3QnO1xudmFyIGNhbGwgPSByZXF1aXJlKCcuLi9pbnRlcm5hbHMvZnVuY3Rpb24tY2FsbCcpO1xudmFyIGFuT2JqZWN0ID0gcmVxdWlyZSgnLi4vaW50ZXJuYWxzL2FuLW9iamVjdCcpO1xudmFyIGlzQ2FsbGFibGUgPSByZXF1aXJlKCcuLi9pbnRlcm5hbHMvaXMtY2FsbGFibGUnKTtcbnZhciBjbGFzc29mID0gcmVxdWlyZSgnLi4vaW50ZXJuYWxzL2NsYXNzb2YtcmF3Jyk7XG52YXIgcmVnZXhwRXhlYyA9IHJlcXVpcmUoJy4uL2ludGVybmFscy9yZWdleHAtZXhlYycpO1xuXG52YXIgJFR5cGVFcnJvciA9IFR5cGVFcnJvcjtcblxuLy8gYFJlZ0V4cEV4ZWNgIGFic3RyYWN0IG9wZXJhdGlvblxuLy8gaHR0cHM6Ly90YzM5LmVzL2VjbWEyNjIvI3NlYy1yZWdleHBleGVjXG5tb2R1bGUuZXhwb3J0cyA9IGZ1bmN0aW9uIChSLCBTKSB7XG4gIHZhciBleGVjID0gUi5leGVjO1xuICBpZiAoaXNDYWxsYWJsZShleGVjKSkge1xuICAgIHZhciByZXN1bHQgPSBjYWxsKGV4ZWMsIFIsIFMpO1xuICAgIGlmIChyZXN1bHQgIT09IG51bGwpIGFuT2JqZWN0KHJlc3VsdCk7XG4gICAgcmV0dXJuIHJlc3VsdDtcbiAgfVxuICBpZiAoY2xhc3NvZihSKSA9PT0gJ1JlZ0V4cCcpIHJldHVybiBjYWxsKHJlZ2V4cEV4ZWMsIFIsIFMpO1xuICB0aHJvdyBuZXcgJFR5cGVFcnJvcignUmVnRXhwI2V4ZWMgY2FsbGVkIG9uIGluY29tcGF0aWJsZSByZWNlaXZlcicpO1xufTtcbiIsIid1c2Ugc3RyaWN0Jztcbi8qIGVzbGludC1kaXNhYmxlIHJlZ2V4cC9uby1lbXB0eS1jYXB0dXJpbmctZ3JvdXAsIHJlZ2V4cC9uby1lbXB0eS1ncm91cCwgcmVnZXhwL25vLWxhenktZW5kcyAtLSB0ZXN0aW5nICovXG4vKiBlc2xpbnQtZGlzYWJsZSByZWdleHAvbm8tdXNlbGVzcy1xdWFudGlmaWVyIC0tIHRlc3RpbmcgKi9cbnZhciBjYWxsID0gcmVxdWlyZSgnLi4vaW50ZXJuYWxzL2Z1bmN0aW9uLWNhbGwnKTtcbnZhciB1bmN1cnJ5VGhpcyA9IHJlcXVpcmUoJy4uL2ludGVybmFscy9mdW5jdGlvbi11bmN1cnJ5LXRoaXMnKTtcbnZhciB0b1N0cmluZyA9IHJlcXVpcmUoJy4uL2ludGVybmFscy90by1zdHJpbmcnKTtcbnZhciByZWdleHBGbGFncyA9IHJlcXVpcmUoJy4uL2ludGVybmFscy9yZWdleHAtZmxhZ3MnKTtcbnZhciBzdGlja3lIZWxwZXJzID0gcmVxdWlyZSgnLi4vaW50ZXJuYWxzL3JlZ2V4cC1zdGlja3ktaGVscGVycycpO1xudmFyIHNoYXJlZCA9IHJlcXVpcmUoJy4uL2ludGVybmFscy9zaGFyZWQnKTtcbnZhciBjcmVhdGUgPSByZXF1aXJlKCcuLi9pbnRlcm5hbHMvb2JqZWN0LWNyZWF0ZScpO1xudmFyIGdldEludGVybmFsU3RhdGUgPSByZXF1aXJlKCcuLi9pbnRlcm5hbHMvaW50ZXJuYWwtc3RhdGUnKS5nZXQ7XG52YXIgVU5TVVBQT1JURURfRE9UX0FMTCA9IHJlcXVpcmUoJy4uL2ludGVybmFscy9yZWdleHAtdW5zdXBwb3J0ZWQtZG90LWFsbCcpO1xudmFyIFVOU1VQUE9SVEVEX05DRyA9IHJlcXVpcmUoJy4uL2ludGVybmFscy9yZWdleHAtdW5zdXBwb3J0ZWQtbmNnJyk7XG5cbnZhciBuYXRpdmVSZXBsYWNlID0gc2hhcmVkKCduYXRpdmUtc3RyaW5nLXJlcGxhY2UnLCBTdHJpbmcucHJvdG90eXBlLnJlcGxhY2UpO1xudmFyIG5hdGl2ZUV4ZWMgPSBSZWdFeHAucHJvdG90eXBlLmV4ZWM7XG52YXIgcGF0Y2hlZEV4ZWMgPSBuYXRpdmVFeGVjO1xudmFyIGNoYXJBdCA9IHVuY3VycnlUaGlzKCcnLmNoYXJBdCk7XG52YXIgaW5kZXhPZiA9IHVuY3VycnlUaGlzKCcnLmluZGV4T2YpO1xudmFyIHJlcGxhY2UgPSB1bmN1cnJ5VGhpcygnJy5yZXBsYWNlKTtcbnZhciBzdHJpbmdTbGljZSA9IHVuY3VycnlUaGlzKCcnLnNsaWNlKTtcblxudmFyIFVQREFURVNfTEFTVF9JTkRFWF9XUk9ORyA9IChmdW5jdGlvbiAoKSB7XG4gIHZhciByZTEgPSAvYS87XG4gIHZhciByZTIgPSAvYiovZztcbiAgY2FsbChuYXRpdmVFeGVjLCByZTEsICdhJyk7XG4gIGNhbGwobmF0aXZlRXhlYywgcmUyLCAnYScpO1xuICByZXR1cm4gcmUxLmxhc3RJbmRleCAhPT0gMCB8fCByZTIubGFzdEluZGV4ICE9PSAwO1xufSkoKTtcblxudmFyIFVOU1VQUE9SVEVEX1kgPSBzdGlja3lIZWxwZXJzLkJST0tFTl9DQVJFVDtcblxuLy8gbm9ucGFydGljaXBhdGluZyBjYXB0dXJpbmcgZ3JvdXAsIGNvcGllZCBmcm9tIGVzNS1zaGltJ3MgU3RyaW5nI3NwbGl0IHBhdGNoLlxudmFyIE5QQ0dfSU5DTFVERUQgPSAvKCk/Py8uZXhlYygnJylbMV0gIT09IHVuZGVmaW5lZDtcblxudmFyIFBBVENIID0gVVBEQVRFU19MQVNUX0lOREVYX1dST05HIHx8IE5QQ0dfSU5DTFVERUQgfHwgVU5TVVBQT1JURURfWSB8fCBVTlNVUFBPUlRFRF9ET1RfQUxMIHx8IFVOU1VQUE9SVEVEX05DRztcblxuaWYgKFBBVENIKSB7XG4gIHBhdGNoZWRFeGVjID0gZnVuY3Rpb24gZXhlYyhzdHJpbmcpIHtcbiAgICB2YXIgcmUgPSB0aGlzO1xuICAgIHZhciBzdGF0ZSA9IGdldEludGVybmFsU3RhdGUocmUpO1xuICAgIHZhciBzdHIgPSB0b1N0cmluZyhzdHJpbmcpO1xuICAgIHZhciByYXcgPSBzdGF0ZS5yYXc7XG4gICAgdmFyIHJlc3VsdCwgcmVDb3B5LCBsYXN0SW5kZXgsIG1hdGNoLCBpLCBvYmplY3QsIGdyb3VwO1xuXG4gICAgaWYgKHJhdykge1xuICAgICAgcmF3Lmxhc3RJbmRleCA9IHJlLmxhc3RJbmRleDtcbiAgICAgIHJlc3VsdCA9IGNhbGwocGF0Y2hlZEV4ZWMsIHJhdywgc3RyKTtcbiAgICAgIHJlLmxhc3RJbmRleCA9IHJhdy5sYXN0SW5kZXg7XG4gICAgICByZXR1cm4gcmVzdWx0O1xuICAgIH1cblxuICAgIHZhciBncm91cHMgPSBzdGF0ZS5ncm91cHM7XG4gICAgdmFyIHN0aWNreSA9IFVOU1VQUE9SVEVEX1kgJiYgcmUuc3RpY2t5O1xuICAgIHZhciBmbGFncyA9IGNhbGwocmVnZXhwRmxhZ3MsIHJlKTtcbiAgICB2YXIgc291cmNlID0gcmUuc291cmNlO1xuICAgIHZhciBjaGFyc0FkZGVkID0gMDtcbiAgICB2YXIgc3RyQ29weSA9IHN0cjtcblxuICAgIGlmIChzdGlja3kpIHtcbiAgICAgIGZsYWdzID0gcmVwbGFjZShmbGFncywgJ3knLCAnJyk7XG4gICAgICBpZiAoaW5kZXhPZihmbGFncywgJ2cnKSA9PT0gLTEpIHtcbiAgICAgICAgZmxhZ3MgKz0gJ2cnO1xuICAgICAgfVxuXG4gICAgICBzdHJDb3B5ID0gc3RyaW5nU2xpY2Uoc3RyLCByZS5sYXN0SW5kZXgpO1xuICAgICAgLy8gU3VwcG9ydCBhbmNob3JlZCBzdGlja3kgYmVoYXZpb3IuXG4gICAgICBpZiAocmUubGFzdEluZGV4ID4gMCAmJiAoIXJlLm11bHRpbGluZSB8fCByZS5tdWx0aWxpbmUgJiYgY2hhckF0KHN0ciwgcmUubGFzdEluZGV4IC0gMSkgIT09ICdcXG4nKSkge1xuICAgICAgICBzb3VyY2UgPSAnKD86ICcgKyBzb3VyY2UgKyAnKSc7XG4gICAgICAgIHN0ckNvcHkgPSAnICcgKyBzdHJDb3B5O1xuICAgICAgICBjaGFyc0FkZGVkKys7XG4gICAgICB9XG4gICAgICAvLyBeKD8gKyByeCArICkgaXMgbmVlZGVkLCBpbiBjb21iaW5hdGlvbiB3aXRoIHNvbWUgc3RyIHNsaWNpbmcsIHRvXG4gICAgICAvLyBzaW11bGF0ZSB0aGUgJ3knIGZsYWcuXG4gICAgICByZUNvcHkgPSBuZXcgUmVnRXhwKCdeKD86JyArIHNvdXJjZSArICcpJywgZmxhZ3MpO1xuICAgIH1cblxuICAgIGlmIChOUENHX0lOQ0xVREVEKSB7XG4gICAgICByZUNvcHkgPSBuZXcgUmVnRXhwKCdeJyArIHNvdXJjZSArICckKD8hXFxcXHMpJywgZmxhZ3MpO1xuICAgIH1cbiAgICBpZiAoVVBEQVRFU19MQVNUX0lOREVYX1dST05HKSBsYXN0SW5kZXggPSByZS5sYXN0SW5kZXg7XG5cbiAgICBtYXRjaCA9IGNhbGwobmF0aXZlRXhlYywgc3RpY2t5ID8gcmVDb3B5IDogcmUsIHN0ckNvcHkpO1xuXG4gICAgaWYgKHN0aWNreSkge1xuICAgICAgaWYgKG1hdGNoKSB7XG4gICAgICAgIG1hdGNoLmlucHV0ID0gc3RyaW5nU2xpY2UobWF0Y2guaW5wdXQsIGNoYXJzQWRkZWQpO1xuICAgICAgICBtYXRjaFswXSA9IHN0cmluZ1NsaWNlKG1hdGNoWzBdLCBjaGFyc0FkZGVkKTtcbiAgICAgICAgbWF0Y2guaW5kZXggPSByZS5sYXN0SW5kZXg7XG4gICAgICAgIHJlLmxhc3RJbmRleCArPSBtYXRjaFswXS5sZW5ndGg7XG4gICAgICB9IGVsc2UgcmUubGFzdEluZGV4ID0gMDtcbiAgICB9IGVsc2UgaWYgKFVQREFURVNfTEFTVF9JTkRFWF9XUk9ORyAmJiBtYXRjaCkge1xuICAgICAgcmUubGFzdEluZGV4ID0gcmUuZ2xvYmFsID8gbWF0Y2guaW5kZXggKyBtYXRjaFswXS5sZW5ndGggOiBsYXN0SW5kZXg7XG4gICAgfVxuICAgIGlmIChOUENHX0lOQ0xVREVEICYmIG1hdGNoICYmIG1hdGNoLmxlbmd0aCA+IDEpIHtcbiAgICAgIC8vIEZpeCBicm93c2VycyB3aG9zZSBgZXhlY2AgbWV0aG9kcyBkb24ndCBjb25zaXN0ZW50bHkgcmV0dXJuIGB1bmRlZmluZWRgXG4gICAgICAvLyBmb3IgTlBDRywgbGlrZSBJRTguIE5PVEU6IFRoaXMgZG9lc24ndCB3b3JrIGZvciAvKC4/KT8vXG4gICAgICBjYWxsKG5hdGl2ZVJlcGxhY2UsIG1hdGNoWzBdLCByZUNvcHksIGZ1bmN0aW9uICgpIHtcbiAgICAgICAgZm9yIChpID0gMTsgaSA8IGFyZ3VtZW50cy5sZW5ndGggLSAyOyBpKyspIHtcbiAgICAgICAgICBpZiAoYXJndW1lbnRzW2ldID09PSB1bmRlZmluZWQpIG1hdGNoW2ldID0gdW5kZWZpbmVkO1xuICAgICAgICB9XG4gICAgICB9KTtcbiAgICB9XG5cbiAgICBpZiAobWF0Y2ggJiYgZ3JvdXBzKSB7XG4gICAgICBtYXRjaC5ncm91cHMgPSBvYmplY3QgPSBjcmVhdGUobnVsbCk7XG4gICAgICBmb3IgKGkgPSAwOyBpIDwgZ3JvdXBzLmxlbmd0aDsgaSsrKSB7XG4gICAgICAgIGdyb3VwID0gZ3JvdXBzW2ldO1xuICAgICAgICBvYmplY3RbZ3JvdXBbMF1dID0gbWF0Y2hbZ3JvdXBbMV1dO1xuICAgICAgfVxuICAgIH1cblxuICAgIHJldHVybiBtYXRjaDtcbiAgfTtcbn1cblxubW9kdWxlLmV4cG9ydHMgPSBwYXRjaGVkRXhlYztcbiIsIid1c2Ugc3RyaWN0JztcbnZhciBhbk9iamVjdCA9IHJlcXVpcmUoJy4uL2ludGVybmFscy9hbi1vYmplY3QnKTtcblxuLy8gYFJlZ0V4cC5wcm90b3R5cGUuZmxhZ3NgIGdldHRlciBpbXBsZW1lbnRhdGlvblxuLy8gaHR0cHM6Ly90YzM5LmVzL2VjbWEyNjIvI3NlYy1nZXQtcmVnZXhwLnByb3RvdHlwZS5mbGFnc1xubW9kdWxlLmV4cG9ydHMgPSBmdW5jdGlvbiAoKSB7XG4gIHZhciB0aGF0ID0gYW5PYmplY3QodGhpcyk7XG4gIHZhciByZXN1bHQgPSAnJztcbiAgaWYgKHRoYXQuaGFzSW5kaWNlcykgcmVzdWx0ICs9ICdkJztcbiAgaWYgKHRoYXQuZ2xvYmFsKSByZXN1bHQgKz0gJ2cnO1xuICBpZiAodGhhdC5pZ25vcmVDYXNlKSByZXN1bHQgKz0gJ2knO1xuICBpZiAodGhhdC5tdWx0aWxpbmUpIHJlc3VsdCArPSAnbSc7XG4gIGlmICh0aGF0LmRvdEFsbCkgcmVzdWx0ICs9ICdzJztcbiAgaWYgKHRoYXQudW5pY29kZSkgcmVzdWx0ICs9ICd1JztcbiAgaWYgKHRoYXQudW5pY29kZVNldHMpIHJlc3VsdCArPSAndic7XG4gIGlmICh0aGF0LnN0aWNreSkgcmVzdWx0ICs9ICd5JztcbiAgcmV0dXJuIHJlc3VsdDtcbn07XG4iLCIndXNlIHN0cmljdCc7XG52YXIgY2FsbCA9IHJlcXVpcmUoJy4uL2ludGVybmFscy9mdW5jdGlvbi1jYWxsJyk7XG52YXIgaGFzT3duID0gcmVxdWlyZSgnLi4vaW50ZXJuYWxzL2hhcy1vd24tcHJvcGVydHknKTtcbnZhciBpc1Byb3RvdHlwZU9mID0gcmVxdWlyZSgnLi4vaW50ZXJuYWxzL29iamVjdC1pcy1wcm90b3R5cGUtb2YnKTtcbnZhciByZWdFeHBGbGFncyA9IHJlcXVpcmUoJy4uL2ludGVybmFscy9yZWdleHAtZmxhZ3MnKTtcblxudmFyIFJlZ0V4cFByb3RvdHlwZSA9IFJlZ0V4cC5wcm90b3R5cGU7XG5cbm1vZHVsZS5leHBvcnRzID0gZnVuY3Rpb24gKFIpIHtcbiAgdmFyIGZsYWdzID0gUi5mbGFncztcbiAgcmV0dXJuIGZsYWdzID09PSB1bmRlZmluZWQgJiYgISgnZmxhZ3MnIGluIFJlZ0V4cFByb3RvdHlwZSkgJiYgIWhhc093bihSLCAnZmxhZ3MnKSAmJiBpc1Byb3RvdHlwZU9mKFJlZ0V4cFByb3RvdHlwZSwgUilcbiAgICA/IGNhbGwocmVnRXhwRmxhZ3MsIFIpIDogZmxhZ3M7XG59O1xuIiwiJ3VzZSBzdHJpY3QnO1xudmFyIGZhaWxzID0gcmVxdWlyZSgnLi4vaW50ZXJuYWxzL2ZhaWxzJyk7XG52YXIgZ2xvYmFsID0gcmVxdWlyZSgnLi4vaW50ZXJuYWxzL2dsb2JhbCcpO1xuXG4vLyBiYWJlbC1taW5pZnkgYW5kIENsb3N1cmUgQ29tcGlsZXIgdHJhbnNwaWxlcyBSZWdFeHAoJ2EnLCAneScpIC0+IC9hL3kgYW5kIGl0IGNhdXNlcyBTeW50YXhFcnJvclxudmFyICRSZWdFeHAgPSBnbG9iYWwuUmVnRXhwO1xuXG52YXIgVU5TVVBQT1JURURfWSA9IGZhaWxzKGZ1bmN0aW9uICgpIHtcbiAgdmFyIHJlID0gJFJlZ0V4cCgnYScsICd5Jyk7XG4gIHJlLmxhc3RJbmRleCA9IDI7XG4gIHJldHVybiByZS5leGVjKCdhYmNkJykgIT09IG51bGw7XG59KTtcblxuLy8gVUMgQnJvd3NlciBidWdcbi8vIGh0dHBzOi8vZ2l0aHViLmNvbS96bG9pcm9jay9jb3JlLWpzL2lzc3Vlcy8xMDA4XG52YXIgTUlTU0VEX1NUSUNLWSA9IFVOU1VQUE9SVEVEX1kgfHwgZmFpbHMoZnVuY3Rpb24gKCkge1xuICByZXR1cm4gISRSZWdFeHAoJ2EnLCAneScpLnN0aWNreTtcbn0pO1xuXG52YXIgQlJPS0VOX0NBUkVUID0gVU5TVVBQT1JURURfWSB8fCBmYWlscyhmdW5jdGlvbiAoKSB7XG4gIC8vIGh0dHBzOi8vYnVnemlsbGEubW96aWxsYS5vcmcvc2hvd19idWcuY2dpP2lkPTc3MzY4N1xuICB2YXIgcmUgPSAkUmVnRXhwKCdecicsICdneScpO1xuICByZS5sYXN0SW5kZXggPSAyO1xuICByZXR1cm4gcmUuZXhlYygnc3RyJykgIT09IG51bGw7XG59KTtcblxubW9kdWxlLmV4cG9ydHMgPSB7XG4gIEJST0tFTl9DQVJFVDogQlJPS0VOX0NBUkVULFxuICBNSVNTRURfU1RJQ0tZOiBNSVNTRURfU1RJQ0tZLFxuICBVTlNVUFBPUlRFRF9ZOiBVTlNVUFBPUlRFRF9ZXG59O1xuIiwiJ3VzZSBzdHJpY3QnO1xudmFyIGZhaWxzID0gcmVxdWlyZSgnLi4vaW50ZXJuYWxzL2ZhaWxzJyk7XG52YXIgZ2xvYmFsID0gcmVxdWlyZSgnLi4vaW50ZXJuYWxzL2dsb2JhbCcpO1xuXG4vLyBiYWJlbC1taW5pZnkgYW5kIENsb3N1cmUgQ29tcGlsZXIgdHJhbnNwaWxlcyBSZWdFeHAoJy4nLCAncycpIC0+IC8uL3MgYW5kIGl0IGNhdXNlcyBTeW50YXhFcnJvclxudmFyICRSZWdFeHAgPSBnbG9iYWwuUmVnRXhwO1xuXG5tb2R1bGUuZXhwb3J0cyA9IGZhaWxzKGZ1bmN0aW9uICgpIHtcbiAgdmFyIHJlID0gJFJlZ0V4cCgnLicsICdzJyk7XG4gIHJldHVybiAhKHJlLmRvdEFsbCAmJiByZS50ZXN0KCdcXG4nKSAmJiByZS5mbGFncyA9PT0gJ3MnKTtcbn0pO1xuIiwiJ3VzZSBzdHJpY3QnO1xudmFyIGZhaWxzID0gcmVxdWlyZSgnLi4vaW50ZXJuYWxzL2ZhaWxzJyk7XG52YXIgZ2xvYmFsID0gcmVxdWlyZSgnLi4vaW50ZXJuYWxzL2dsb2JhbCcpO1xuXG4vLyBiYWJlbC1taW5pZnkgYW5kIENsb3N1cmUgQ29tcGlsZXIgdHJhbnNwaWxlcyBSZWdFeHAoJyg/PGE+YiknLCAnZycpIC0+IC8oPzxhPmIpL2cgYW5kIGl0IGNhdXNlcyBTeW50YXhFcnJvclxudmFyICRSZWdFeHAgPSBnbG9iYWwuUmVnRXhwO1xuXG5tb2R1bGUuZXhwb3J0cyA9IGZhaWxzKGZ1bmN0aW9uICgpIHtcbiAgdmFyIHJlID0gJFJlZ0V4cCgnKD88YT5iKScsICdnJyk7XG4gIHJldHVybiByZS5leGVjKCdiJykuZ3JvdXBzLmEgIT09ICdiJyB8fFxuICAgICdiJy5yZXBsYWNlKHJlLCAnJDxhPmMnKSAhPT0gJ2JjJztcbn0pO1xuIiwiJ3VzZSBzdHJpY3QnO1xudmFyIGlzTnVsbE9yVW5kZWZpbmVkID0gcmVxdWlyZSgnLi4vaW50ZXJuYWxzL2lzLW51bGwtb3ItdW5kZWZpbmVkJyk7XG5cbnZhciAkVHlwZUVycm9yID0gVHlwZUVycm9yO1xuXG4vLyBgUmVxdWlyZU9iamVjdENvZXJjaWJsZWAgYWJzdHJhY3Qgb3BlcmF0aW9uXG4vLyBodHRwczovL3RjMzkuZXMvZWNtYTI2Mi8jc2VjLXJlcXVpcmVvYmplY3Rjb2VyY2libGVcbm1vZHVsZS5leHBvcnRzID0gZnVuY3Rpb24gKGl0KSB7XG4gIGlmIChpc051bGxPclVuZGVmaW5lZChpdCkpIHRocm93IG5ldyAkVHlwZUVycm9yKFwiQ2FuJ3QgY2FsbCBtZXRob2Qgb24gXCIgKyBpdCk7XG4gIHJldHVybiBpdDtcbn07XG4iLCIndXNlIHN0cmljdCc7XG52YXIgZ2xvYmFsID0gcmVxdWlyZSgnLi4vaW50ZXJuYWxzL2dsb2JhbCcpO1xudmFyIERFU0NSSVBUT1JTID0gcmVxdWlyZSgnLi4vaW50ZXJuYWxzL2Rlc2NyaXB0b3JzJyk7XG5cbi8vIGVzbGludC1kaXNhYmxlLW5leHQtbGluZSBlcy9uby1vYmplY3QtZ2V0b3ducHJvcGVydHlkZXNjcmlwdG9yIC0tIHNhZmVcbnZhciBnZXRPd25Qcm9wZXJ0eURlc2NyaXB0b3IgPSBPYmplY3QuZ2V0T3duUHJvcGVydHlEZXNjcmlwdG9yO1xuXG4vLyBBdm9pZCBOb2RlSlMgZXhwZXJpbWVudGFsIHdhcm5pbmdcbm1vZHVsZS5leHBvcnRzID0gZnVuY3Rpb24gKG5hbWUpIHtcbiAgaWYgKCFERVNDUklQVE9SUykgcmV0dXJuIGdsb2JhbFtuYW1lXTtcbiAgdmFyIGRlc2NyaXB0b3IgPSBnZXRPd25Qcm9wZXJ0eURlc2NyaXB0b3IoZ2xvYmFsLCBuYW1lKTtcbiAgcmV0dXJuIGRlc2NyaXB0b3IgJiYgZGVzY3JpcHRvci52YWx1ZTtcbn07XG4iLCIndXNlIHN0cmljdCc7XG52YXIgZ2V0QnVpbHRJbiA9IHJlcXVpcmUoJy4uL2ludGVybmFscy9nZXQtYnVpbHQtaW4nKTtcbnZhciBkZWZpbmVCdWlsdEluQWNjZXNzb3IgPSByZXF1aXJlKCcuLi9pbnRlcm5hbHMvZGVmaW5lLWJ1aWx0LWluLWFjY2Vzc29yJyk7XG52YXIgd2VsbEtub3duU3ltYm9sID0gcmVxdWlyZSgnLi4vaW50ZXJuYWxzL3dlbGwta25vd24tc3ltYm9sJyk7XG52YXIgREVTQ1JJUFRPUlMgPSByZXF1aXJlKCcuLi9pbnRlcm5hbHMvZGVzY3JpcHRvcnMnKTtcblxudmFyIFNQRUNJRVMgPSB3ZWxsS25vd25TeW1ib2woJ3NwZWNpZXMnKTtcblxubW9kdWxlLmV4cG9ydHMgPSBmdW5jdGlvbiAoQ09OU1RSVUNUT1JfTkFNRSkge1xuICB2YXIgQ29uc3RydWN0b3IgPSBnZXRCdWlsdEluKENPTlNUUlVDVE9SX05BTUUpO1xuXG4gIGlmIChERVNDUklQVE9SUyAmJiBDb25zdHJ1Y3RvciAmJiAhQ29uc3RydWN0b3JbU1BFQ0lFU10pIHtcbiAgICBkZWZpbmVCdWlsdEluQWNjZXNzb3IoQ29uc3RydWN0b3IsIFNQRUNJRVMsIHtcbiAgICAgIGNvbmZpZ3VyYWJsZTogdHJ1ZSxcbiAgICAgIGdldDogZnVuY3Rpb24gKCkgeyByZXR1cm4gdGhpczsgfVxuICAgIH0pO1xuICB9XG59O1xuIiwiJ3VzZSBzdHJpY3QnO1xudmFyIGRlZmluZVByb3BlcnR5ID0gcmVxdWlyZSgnLi4vaW50ZXJuYWxzL29iamVjdC1kZWZpbmUtcHJvcGVydHknKS5mO1xudmFyIGhhc093biA9IHJlcXVpcmUoJy4uL2ludGVybmFscy9oYXMtb3duLXByb3BlcnR5Jyk7XG52YXIgd2VsbEtub3duU3ltYm9sID0gcmVxdWlyZSgnLi4vaW50ZXJuYWxzL3dlbGwta25vd24tc3ltYm9sJyk7XG5cbnZhciBUT19TVFJJTkdfVEFHID0gd2VsbEtub3duU3ltYm9sKCd0b1N0cmluZ1RhZycpO1xuXG5tb2R1bGUuZXhwb3J0cyA9IGZ1bmN0aW9uICh0YXJnZXQsIFRBRywgU1RBVElDKSB7XG4gIGlmICh0YXJnZXQgJiYgIVNUQVRJQykgdGFyZ2V0ID0gdGFyZ2V0LnByb3RvdHlwZTtcbiAgaWYgKHRhcmdldCAmJiAhaGFzT3duKHRhcmdldCwgVE9fU1RSSU5HX1RBRykpIHtcbiAgICBkZWZpbmVQcm9wZXJ0eSh0YXJnZXQsIFRPX1NUUklOR19UQUcsIHsgY29uZmlndXJhYmxlOiB0cnVlLCB2YWx1ZTogVEFHIH0pO1xuICB9XG59O1xuIiwiJ3VzZSBzdHJpY3QnO1xudmFyIHNoYXJlZCA9IHJlcXVpcmUoJy4uL2ludGVybmFscy9zaGFyZWQnKTtcbnZhciB1aWQgPSByZXF1aXJlKCcuLi9pbnRlcm5hbHMvdWlkJyk7XG5cbnZhciBrZXlzID0gc2hhcmVkKCdrZXlzJyk7XG5cbm1vZHVsZS5leHBvcnRzID0gZnVuY3Rpb24gKGtleSkge1xuICByZXR1cm4ga2V5c1trZXldIHx8IChrZXlzW2tleV0gPSB1aWQoa2V5KSk7XG59O1xuIiwiJ3VzZSBzdHJpY3QnO1xudmFyIElTX1BVUkUgPSByZXF1aXJlKCcuLi9pbnRlcm5hbHMvaXMtcHVyZScpO1xudmFyIGdsb2JhbFRoaXMgPSByZXF1aXJlKCcuLi9pbnRlcm5hbHMvZ2xvYmFsJyk7XG52YXIgZGVmaW5lR2xvYmFsUHJvcGVydHkgPSByZXF1aXJlKCcuLi9pbnRlcm5hbHMvZGVmaW5lLWdsb2JhbC1wcm9wZXJ0eScpO1xuXG52YXIgU0hBUkVEID0gJ19fY29yZS1qc19zaGFyZWRfXyc7XG52YXIgc3RvcmUgPSBtb2R1bGUuZXhwb3J0cyA9IGdsb2JhbFRoaXNbU0hBUkVEXSB8fCBkZWZpbmVHbG9iYWxQcm9wZXJ0eShTSEFSRUQsIHt9KTtcblxuKHN0b3JlLnZlcnNpb25zIHx8IChzdG9yZS52ZXJzaW9ucyA9IFtdKSkucHVzaCh7XG4gIHZlcnNpb246ICczLjM3LjEnLFxuICBtb2RlOiBJU19QVVJFID8gJ3B1cmUnIDogJ2dsb2JhbCcsXG4gIGNvcHlyaWdodDogJ8KpIDIwMTQtMjAyNCBEZW5pcyBQdXNoa2FyZXYgKHpsb2lyb2NrLnJ1KScsXG4gIGxpY2Vuc2U6ICdodHRwczovL2dpdGh1Yi5jb20vemxvaXJvY2svY29yZS1qcy9ibG9iL3YzLjM3LjEvTElDRU5TRScsXG4gIHNvdXJjZTogJ2h0dHBzOi8vZ2l0aHViLmNvbS96bG9pcm9jay9jb3JlLWpzJ1xufSk7XG4iLCIndXNlIHN0cmljdCc7XG52YXIgc3RvcmUgPSByZXF1aXJlKCcuLi9pbnRlcm5hbHMvc2hhcmVkLXN0b3JlJyk7XG5cbm1vZHVsZS5leHBvcnRzID0gZnVuY3Rpb24gKGtleSwgdmFsdWUpIHtcbiAgcmV0dXJuIHN0b3JlW2tleV0gfHwgKHN0b3JlW2tleV0gPSB2YWx1ZSB8fCB7fSk7XG59O1xuIiwiJ3VzZSBzdHJpY3QnO1xudmFyIGFuT2JqZWN0ID0gcmVxdWlyZSgnLi4vaW50ZXJuYWxzL2FuLW9iamVjdCcpO1xudmFyIGFDb25zdHJ1Y3RvciA9IHJlcXVpcmUoJy4uL2ludGVybmFscy9hLWNvbnN0cnVjdG9yJyk7XG52YXIgaXNOdWxsT3JVbmRlZmluZWQgPSByZXF1aXJlKCcuLi9pbnRlcm5hbHMvaXMtbnVsbC1vci11bmRlZmluZWQnKTtcbnZhciB3ZWxsS25vd25TeW1ib2wgPSByZXF1aXJlKCcuLi9pbnRlcm5hbHMvd2VsbC1rbm93bi1zeW1ib2wnKTtcblxudmFyIFNQRUNJRVMgPSB3ZWxsS25vd25TeW1ib2woJ3NwZWNpZXMnKTtcblxuLy8gYFNwZWNpZXNDb25zdHJ1Y3RvcmAgYWJzdHJhY3Qgb3BlcmF0aW9uXG4vLyBodHRwczovL3RjMzkuZXMvZWNtYTI2Mi8jc2VjLXNwZWNpZXNjb25zdHJ1Y3RvclxubW9kdWxlLmV4cG9ydHMgPSBmdW5jdGlvbiAoTywgZGVmYXVsdENvbnN0cnVjdG9yKSB7XG4gIHZhciBDID0gYW5PYmplY3QoTykuY29uc3RydWN0b3I7XG4gIHZhciBTO1xuICByZXR1cm4gQyA9PT0gdW5kZWZpbmVkIHx8IGlzTnVsbE9yVW5kZWZpbmVkKFMgPSBhbk9iamVjdChDKVtTUEVDSUVTXSkgPyBkZWZhdWx0Q29uc3RydWN0b3IgOiBhQ29uc3RydWN0b3IoUyk7XG59O1xuIiwiJ3VzZSBzdHJpY3QnO1xudmFyIHVuY3VycnlUaGlzID0gcmVxdWlyZSgnLi4vaW50ZXJuYWxzL2Z1bmN0aW9uLXVuY3VycnktdGhpcycpO1xudmFyIHRvSW50ZWdlck9ySW5maW5pdHkgPSByZXF1aXJlKCcuLi9pbnRlcm5hbHMvdG8taW50ZWdlci1vci1pbmZpbml0eScpO1xudmFyIHRvU3RyaW5nID0gcmVxdWlyZSgnLi4vaW50ZXJuYWxzL3RvLXN0cmluZycpO1xudmFyIHJlcXVpcmVPYmplY3RDb2VyY2libGUgPSByZXF1aXJlKCcuLi9pbnRlcm5hbHMvcmVxdWlyZS1vYmplY3QtY29lcmNpYmxlJyk7XG5cbnZhciBjaGFyQXQgPSB1bmN1cnJ5VGhpcygnJy5jaGFyQXQpO1xudmFyIGNoYXJDb2RlQXQgPSB1bmN1cnJ5VGhpcygnJy5jaGFyQ29kZUF0KTtcbnZhciBzdHJpbmdTbGljZSA9IHVuY3VycnlUaGlzKCcnLnNsaWNlKTtcblxudmFyIGNyZWF0ZU1ldGhvZCA9IGZ1bmN0aW9uIChDT05WRVJUX1RPX1NUUklORykge1xuICByZXR1cm4gZnVuY3Rpb24gKCR0aGlzLCBwb3MpIHtcbiAgICB2YXIgUyA9IHRvU3RyaW5nKHJlcXVpcmVPYmplY3RDb2VyY2libGUoJHRoaXMpKTtcbiAgICB2YXIgcG9zaXRpb24gPSB0b0ludGVnZXJPckluZmluaXR5KHBvcyk7XG4gICAgdmFyIHNpemUgPSBTLmxlbmd0aDtcbiAgICB2YXIgZmlyc3QsIHNlY29uZDtcbiAgICBpZiAocG9zaXRpb24gPCAwIHx8IHBvc2l0aW9uID49IHNpemUpIHJldHVybiBDT05WRVJUX1RPX1NUUklORyA/ICcnIDogdW5kZWZpbmVkO1xuICAgIGZpcnN0ID0gY2hhckNvZGVBdChTLCBwb3NpdGlvbik7XG4gICAgcmV0dXJuIGZpcnN0IDwgMHhEODAwIHx8IGZpcnN0ID4gMHhEQkZGIHx8IHBvc2l0aW9uICsgMSA9PT0gc2l6ZVxuICAgICAgfHwgKHNlY29uZCA9IGNoYXJDb2RlQXQoUywgcG9zaXRpb24gKyAxKSkgPCAweERDMDAgfHwgc2Vjb25kID4gMHhERkZGXG4gICAgICAgID8gQ09OVkVSVF9UT19TVFJJTkdcbiAgICAgICAgICA/IGNoYXJBdChTLCBwb3NpdGlvbilcbiAgICAgICAgICA6IGZpcnN0XG4gICAgICAgIDogQ09OVkVSVF9UT19TVFJJTkdcbiAgICAgICAgICA/IHN0cmluZ1NsaWNlKFMsIHBvc2l0aW9uLCBwb3NpdGlvbiArIDIpXG4gICAgICAgICAgOiAoZmlyc3QgLSAweEQ4MDAgPDwgMTApICsgKHNlY29uZCAtIDB4REMwMCkgKyAweDEwMDAwO1xuICB9O1xufTtcblxubW9kdWxlLmV4cG9ydHMgPSB7XG4gIC8vIGBTdHJpbmcucHJvdG90eXBlLmNvZGVQb2ludEF0YCBtZXRob2RcbiAgLy8gaHR0cHM6Ly90YzM5LmVzL2VjbWEyNjIvI3NlYy1zdHJpbmcucHJvdG90eXBlLmNvZGVwb2ludGF0XG4gIGNvZGVBdDogY3JlYXRlTWV0aG9kKGZhbHNlKSxcbiAgLy8gYFN0cmluZy5wcm90b3R5cGUuYXRgIG1ldGhvZFxuICAvLyBodHRwczovL2dpdGh1Yi5jb20vbWF0aGlhc2J5bmVucy9TdHJpbmcucHJvdG90eXBlLmF0XG4gIGNoYXJBdDogY3JlYXRlTWV0aG9kKHRydWUpXG59O1xuIiwiJ3VzZSBzdHJpY3QnO1xuLy8gYmFzZWQgb24gaHR0cHM6Ly9naXRodWIuY29tL2Jlc3RpZWpzL3B1bnljb2RlLmpzL2Jsb2IvbWFzdGVyL3B1bnljb2RlLmpzXG52YXIgdW5jdXJyeVRoaXMgPSByZXF1aXJlKCcuLi9pbnRlcm5hbHMvZnVuY3Rpb24tdW5jdXJyeS10aGlzJyk7XG5cbnZhciBtYXhJbnQgPSAyMTQ3NDgzNjQ3OyAvLyBha2EuIDB4N0ZGRkZGRkYgb3IgMl4zMS0xXG52YXIgYmFzZSA9IDM2O1xudmFyIHRNaW4gPSAxO1xudmFyIHRNYXggPSAyNjtcbnZhciBza2V3ID0gMzg7XG52YXIgZGFtcCA9IDcwMDtcbnZhciBpbml0aWFsQmlhcyA9IDcyO1xudmFyIGluaXRpYWxOID0gMTI4OyAvLyAweDgwXG52YXIgZGVsaW1pdGVyID0gJy0nOyAvLyAnXFx4MkQnXG52YXIgcmVnZXhOb25BU0NJSSA9IC9bXlxcMC1cXHUwMDdFXS87IC8vIG5vbi1BU0NJSSBjaGFyc1xudmFyIHJlZ2V4U2VwYXJhdG9ycyA9IC9bLlxcdTMwMDJcXHVGRjBFXFx1RkY2MV0vZzsgLy8gUkZDIDM0OTAgc2VwYXJhdG9yc1xudmFyIE9WRVJGTE9XX0VSUk9SID0gJ092ZXJmbG93OiBpbnB1dCBuZWVkcyB3aWRlciBpbnRlZ2VycyB0byBwcm9jZXNzJztcbnZhciBiYXNlTWludXNUTWluID0gYmFzZSAtIHRNaW47XG5cbnZhciAkUmFuZ2VFcnJvciA9IFJhbmdlRXJyb3I7XG52YXIgZXhlYyA9IHVuY3VycnlUaGlzKHJlZ2V4U2VwYXJhdG9ycy5leGVjKTtcbnZhciBmbG9vciA9IE1hdGguZmxvb3I7XG52YXIgZnJvbUNoYXJDb2RlID0gU3RyaW5nLmZyb21DaGFyQ29kZTtcbnZhciBjaGFyQ29kZUF0ID0gdW5jdXJyeVRoaXMoJycuY2hhckNvZGVBdCk7XG52YXIgam9pbiA9IHVuY3VycnlUaGlzKFtdLmpvaW4pO1xudmFyIHB1c2ggPSB1bmN1cnJ5VGhpcyhbXS5wdXNoKTtcbnZhciByZXBsYWNlID0gdW5jdXJyeVRoaXMoJycucmVwbGFjZSk7XG52YXIgc3BsaXQgPSB1bmN1cnJ5VGhpcygnJy5zcGxpdCk7XG52YXIgdG9Mb3dlckNhc2UgPSB1bmN1cnJ5VGhpcygnJy50b0xvd2VyQ2FzZSk7XG5cbi8qKlxuICogQ3JlYXRlcyBhbiBhcnJheSBjb250YWluaW5nIHRoZSBudW1lcmljIGNvZGUgcG9pbnRzIG9mIGVhY2ggVW5pY29kZVxuICogY2hhcmFjdGVyIGluIHRoZSBzdHJpbmcuIFdoaWxlIEphdmFTY3JpcHQgdXNlcyBVQ1MtMiBpbnRlcm5hbGx5LFxuICogdGhpcyBmdW5jdGlvbiB3aWxsIGNvbnZlcnQgYSBwYWlyIG9mIHN1cnJvZ2F0ZSBoYWx2ZXMgKGVhY2ggb2Ygd2hpY2hcbiAqIFVDUy0yIGV4cG9zZXMgYXMgc2VwYXJhdGUgY2hhcmFjdGVycykgaW50byBhIHNpbmdsZSBjb2RlIHBvaW50LFxuICogbWF0Y2hpbmcgVVRGLTE2LlxuICovXG52YXIgdWNzMmRlY29kZSA9IGZ1bmN0aW9uIChzdHJpbmcpIHtcbiAgdmFyIG91dHB1dCA9IFtdO1xuICB2YXIgY291bnRlciA9IDA7XG4gIHZhciBsZW5ndGggPSBzdHJpbmcubGVuZ3RoO1xuICB3aGlsZSAoY291bnRlciA8IGxlbmd0aCkge1xuICAgIHZhciB2YWx1ZSA9IGNoYXJDb2RlQXQoc3RyaW5nLCBjb3VudGVyKyspO1xuICAgIGlmICh2YWx1ZSA+PSAweEQ4MDAgJiYgdmFsdWUgPD0gMHhEQkZGICYmIGNvdW50ZXIgPCBsZW5ndGgpIHtcbiAgICAgIC8vIEl0J3MgYSBoaWdoIHN1cnJvZ2F0ZSwgYW5kIHRoZXJlIGlzIGEgbmV4dCBjaGFyYWN0ZXIuXG4gICAgICB2YXIgZXh0cmEgPSBjaGFyQ29kZUF0KHN0cmluZywgY291bnRlcisrKTtcbiAgICAgIGlmICgoZXh0cmEgJiAweEZDMDApID09PSAweERDMDApIHsgLy8gTG93IHN1cnJvZ2F0ZS5cbiAgICAgICAgcHVzaChvdXRwdXQsICgodmFsdWUgJiAweDNGRikgPDwgMTApICsgKGV4dHJhICYgMHgzRkYpICsgMHgxMDAwMCk7XG4gICAgICB9IGVsc2Uge1xuICAgICAgICAvLyBJdCdzIGFuIHVubWF0Y2hlZCBzdXJyb2dhdGU7IG9ubHkgYXBwZW5kIHRoaXMgY29kZSB1bml0LCBpbiBjYXNlIHRoZVxuICAgICAgICAvLyBuZXh0IGNvZGUgdW5pdCBpcyB0aGUgaGlnaCBzdXJyb2dhdGUgb2YgYSBzdXJyb2dhdGUgcGFpci5cbiAgICAgICAgcHVzaChvdXRwdXQsIHZhbHVlKTtcbiAgICAgICAgY291bnRlci0tO1xuICAgICAgfVxuICAgIH0gZWxzZSB7XG4gICAgICBwdXNoKG91dHB1dCwgdmFsdWUpO1xuICAgIH1cbiAgfVxuICByZXR1cm4gb3V0cHV0O1xufTtcblxuLyoqXG4gKiBDb252ZXJ0cyBhIGRpZ2l0L2ludGVnZXIgaW50byBhIGJhc2ljIGNvZGUgcG9pbnQuXG4gKi9cbnZhciBkaWdpdFRvQmFzaWMgPSBmdW5jdGlvbiAoZGlnaXQpIHtcbiAgLy8gIDAuLjI1IG1hcCB0byBBU0NJSSBhLi56IG9yIEEuLlpcbiAgLy8gMjYuLjM1IG1hcCB0byBBU0NJSSAwLi45XG4gIHJldHVybiBkaWdpdCArIDIyICsgNzUgKiAoZGlnaXQgPCAyNik7XG59O1xuXG4vKipcbiAqIEJpYXMgYWRhcHRhdGlvbiBmdW5jdGlvbiBhcyBwZXIgc2VjdGlvbiAzLjQgb2YgUkZDIDM0OTIuXG4gKiBodHRwczovL3Rvb2xzLmlldGYub3JnL2h0bWwvcmZjMzQ5MiNzZWN0aW9uLTMuNFxuICovXG52YXIgYWRhcHQgPSBmdW5jdGlvbiAoZGVsdGEsIG51bVBvaW50cywgZmlyc3RUaW1lKSB7XG4gIHZhciBrID0gMDtcbiAgZGVsdGEgPSBmaXJzdFRpbWUgPyBmbG9vcihkZWx0YSAvIGRhbXApIDogZGVsdGEgPj4gMTtcbiAgZGVsdGEgKz0gZmxvb3IoZGVsdGEgLyBudW1Qb2ludHMpO1xuICB3aGlsZSAoZGVsdGEgPiBiYXNlTWludXNUTWluICogdE1heCA+PiAxKSB7XG4gICAgZGVsdGEgPSBmbG9vcihkZWx0YSAvIGJhc2VNaW51c1RNaW4pO1xuICAgIGsgKz0gYmFzZTtcbiAgfVxuICByZXR1cm4gZmxvb3IoayArIChiYXNlTWludXNUTWluICsgMSkgKiBkZWx0YSAvIChkZWx0YSArIHNrZXcpKTtcbn07XG5cbi8qKlxuICogQ29udmVydHMgYSBzdHJpbmcgb2YgVW5pY29kZSBzeW1ib2xzIChlLmcuIGEgZG9tYWluIG5hbWUgbGFiZWwpIHRvIGFcbiAqIFB1bnljb2RlIHN0cmluZyBvZiBBU0NJSS1vbmx5IHN5bWJvbHMuXG4gKi9cbnZhciBlbmNvZGUgPSBmdW5jdGlvbiAoaW5wdXQpIHtcbiAgdmFyIG91dHB1dCA9IFtdO1xuXG4gIC8vIENvbnZlcnQgdGhlIGlucHV0IGluIFVDUy0yIHRvIGFuIGFycmF5IG9mIFVuaWNvZGUgY29kZSBwb2ludHMuXG4gIGlucHV0ID0gdWNzMmRlY29kZShpbnB1dCk7XG5cbiAgLy8gQ2FjaGUgdGhlIGxlbmd0aC5cbiAgdmFyIGlucHV0TGVuZ3RoID0gaW5wdXQubGVuZ3RoO1xuXG4gIC8vIEluaXRpYWxpemUgdGhlIHN0YXRlLlxuICB2YXIgbiA9IGluaXRpYWxOO1xuICB2YXIgZGVsdGEgPSAwO1xuICB2YXIgYmlhcyA9IGluaXRpYWxCaWFzO1xuICB2YXIgaSwgY3VycmVudFZhbHVlO1xuXG4gIC8vIEhhbmRsZSB0aGUgYmFzaWMgY29kZSBwb2ludHMuXG4gIGZvciAoaSA9IDA7IGkgPCBpbnB1dC5sZW5ndGg7IGkrKykge1xuICAgIGN1cnJlbnRWYWx1ZSA9IGlucHV0W2ldO1xuICAgIGlmIChjdXJyZW50VmFsdWUgPCAweDgwKSB7XG4gICAgICBwdXNoKG91dHB1dCwgZnJvbUNoYXJDb2RlKGN1cnJlbnRWYWx1ZSkpO1xuICAgIH1cbiAgfVxuXG4gIHZhciBiYXNpY0xlbmd0aCA9IG91dHB1dC5sZW5ndGg7IC8vIG51bWJlciBvZiBiYXNpYyBjb2RlIHBvaW50cy5cbiAgdmFyIGhhbmRsZWRDUENvdW50ID0gYmFzaWNMZW5ndGg7IC8vIG51bWJlciBvZiBjb2RlIHBvaW50cyB0aGF0IGhhdmUgYmVlbiBoYW5kbGVkO1xuXG4gIC8vIEZpbmlzaCB0aGUgYmFzaWMgc3RyaW5nIHdpdGggYSBkZWxpbWl0ZXIgdW5sZXNzIGl0J3MgZW1wdHkuXG4gIGlmIChiYXNpY0xlbmd0aCkge1xuICAgIHB1c2gob3V0cHV0LCBkZWxpbWl0ZXIpO1xuICB9XG5cbiAgLy8gTWFpbiBlbmNvZGluZyBsb29wOlxuICB3aGlsZSAoaGFuZGxlZENQQ291bnQgPCBpbnB1dExlbmd0aCkge1xuICAgIC8vIEFsbCBub24tYmFzaWMgY29kZSBwb2ludHMgPCBuIGhhdmUgYmVlbiBoYW5kbGVkIGFscmVhZHkuIEZpbmQgdGhlIG5leHQgbGFyZ2VyIG9uZTpcbiAgICB2YXIgbSA9IG1heEludDtcbiAgICBmb3IgKGkgPSAwOyBpIDwgaW5wdXQubGVuZ3RoOyBpKyspIHtcbiAgICAgIGN1cnJlbnRWYWx1ZSA9IGlucHV0W2ldO1xuICAgICAgaWYgKGN1cnJlbnRWYWx1ZSA+PSBuICYmIGN1cnJlbnRWYWx1ZSA8IG0pIHtcbiAgICAgICAgbSA9IGN1cnJlbnRWYWx1ZTtcbiAgICAgIH1cbiAgICB9XG5cbiAgICAvLyBJbmNyZWFzZSBgZGVsdGFgIGVub3VnaCB0byBhZHZhbmNlIHRoZSBkZWNvZGVyJ3MgPG4saT4gc3RhdGUgdG8gPG0sMD4sIGJ1dCBndWFyZCBhZ2FpbnN0IG92ZXJmbG93LlxuICAgIHZhciBoYW5kbGVkQ1BDb3VudFBsdXNPbmUgPSBoYW5kbGVkQ1BDb3VudCArIDE7XG4gICAgaWYgKG0gLSBuID4gZmxvb3IoKG1heEludCAtIGRlbHRhKSAvIGhhbmRsZWRDUENvdW50UGx1c09uZSkpIHtcbiAgICAgIHRocm93IG5ldyAkUmFuZ2VFcnJvcihPVkVSRkxPV19FUlJPUik7XG4gICAgfVxuXG4gICAgZGVsdGEgKz0gKG0gLSBuKSAqIGhhbmRsZWRDUENvdW50UGx1c09uZTtcbiAgICBuID0gbTtcblxuICAgIGZvciAoaSA9IDA7IGkgPCBpbnB1dC5sZW5ndGg7IGkrKykge1xuICAgICAgY3VycmVudFZhbHVlID0gaW5wdXRbaV07XG4gICAgICBpZiAoY3VycmVudFZhbHVlIDwgbiAmJiArK2RlbHRhID4gbWF4SW50KSB7XG4gICAgICAgIHRocm93IG5ldyAkUmFuZ2VFcnJvcihPVkVSRkxPV19FUlJPUik7XG4gICAgICB9XG4gICAgICBpZiAoY3VycmVudFZhbHVlID09PSBuKSB7XG4gICAgICAgIC8vIFJlcHJlc2VudCBkZWx0YSBhcyBhIGdlbmVyYWxpemVkIHZhcmlhYmxlLWxlbmd0aCBpbnRlZ2VyLlxuICAgICAgICB2YXIgcSA9IGRlbHRhO1xuICAgICAgICB2YXIgayA9IGJhc2U7XG4gICAgICAgIHdoaWxlICh0cnVlKSB7XG4gICAgICAgICAgdmFyIHQgPSBrIDw9IGJpYXMgPyB0TWluIDogayA+PSBiaWFzICsgdE1heCA/IHRNYXggOiBrIC0gYmlhcztcbiAgICAgICAgICBpZiAocSA8IHQpIGJyZWFrO1xuICAgICAgICAgIHZhciBxTWludXNUID0gcSAtIHQ7XG4gICAgICAgICAgdmFyIGJhc2VNaW51c1QgPSBiYXNlIC0gdDtcbiAgICAgICAgICBwdXNoKG91dHB1dCwgZnJvbUNoYXJDb2RlKGRpZ2l0VG9CYXNpYyh0ICsgcU1pbnVzVCAlIGJhc2VNaW51c1QpKSk7XG4gICAgICAgICAgcSA9IGZsb29yKHFNaW51c1QgLyBiYXNlTWludXNUKTtcbiAgICAgICAgICBrICs9IGJhc2U7XG4gICAgICAgIH1cblxuICAgICAgICBwdXNoKG91dHB1dCwgZnJvbUNoYXJDb2RlKGRpZ2l0VG9CYXNpYyhxKSkpO1xuICAgICAgICBiaWFzID0gYWRhcHQoZGVsdGEsIGhhbmRsZWRDUENvdW50UGx1c09uZSwgaGFuZGxlZENQQ291bnQgPT09IGJhc2ljTGVuZ3RoKTtcbiAgICAgICAgZGVsdGEgPSAwO1xuICAgICAgICBoYW5kbGVkQ1BDb3VudCsrO1xuICAgICAgfVxuICAgIH1cblxuICAgIGRlbHRhKys7XG4gICAgbisrO1xuICB9XG4gIHJldHVybiBqb2luKG91dHB1dCwgJycpO1xufTtcblxubW9kdWxlLmV4cG9ydHMgPSBmdW5jdGlvbiAoaW5wdXQpIHtcbiAgdmFyIGVuY29kZWQgPSBbXTtcbiAgdmFyIGxhYmVscyA9IHNwbGl0KHJlcGxhY2UodG9Mb3dlckNhc2UoaW5wdXQpLCByZWdleFNlcGFyYXRvcnMsICdcXHUwMDJFJyksICcuJyk7XG4gIHZhciBpLCBsYWJlbDtcbiAgZm9yIChpID0gMDsgaSA8IGxhYmVscy5sZW5ndGg7IGkrKykge1xuICAgIGxhYmVsID0gbGFiZWxzW2ldO1xuICAgIHB1c2goZW5jb2RlZCwgZXhlYyhyZWdleE5vbkFTQ0lJLCBsYWJlbCkgPyAneG4tLScgKyBlbmNvZGUobGFiZWwpIDogbGFiZWwpO1xuICB9XG4gIHJldHVybiBqb2luKGVuY29kZWQsICcuJyk7XG59O1xuIiwiJ3VzZSBzdHJpY3QnO1xuLyogZXNsaW50LWRpc2FibGUgZXMvbm8tc3ltYm9sIC0tIHJlcXVpcmVkIGZvciB0ZXN0aW5nICovXG52YXIgVjhfVkVSU0lPTiA9IHJlcXVpcmUoJy4uL2ludGVybmFscy9lbmdpbmUtdjgtdmVyc2lvbicpO1xudmFyIGZhaWxzID0gcmVxdWlyZSgnLi4vaW50ZXJuYWxzL2ZhaWxzJyk7XG52YXIgZ2xvYmFsID0gcmVxdWlyZSgnLi4vaW50ZXJuYWxzL2dsb2JhbCcpO1xuXG52YXIgJFN0cmluZyA9IGdsb2JhbC5TdHJpbmc7XG5cbi8vIGVzbGludC1kaXNhYmxlLW5leHQtbGluZSBlcy9uby1vYmplY3QtZ2V0b3ducHJvcGVydHlzeW1ib2xzIC0tIHJlcXVpcmVkIGZvciB0ZXN0aW5nXG5tb2R1bGUuZXhwb3J0cyA9ICEhT2JqZWN0LmdldE93blByb3BlcnR5U3ltYm9scyAmJiAhZmFpbHMoZnVuY3Rpb24gKCkge1xuICB2YXIgc3ltYm9sID0gU3ltYm9sKCdzeW1ib2wgZGV0ZWN0aW9uJyk7XG4gIC8vIENocm9tZSAzOCBTeW1ib2wgaGFzIGluY29ycmVjdCB0b1N0cmluZyBjb252ZXJzaW9uXG4gIC8vIGBnZXQtb3duLXByb3BlcnR5LXN5bWJvbHNgIHBvbHlmaWxsIHN5bWJvbHMgY29udmVydGVkIHRvIG9iamVjdCBhcmUgbm90IFN5bWJvbCBpbnN0YW5jZXNcbiAgLy8gbmI6IERvIG5vdCBjYWxsIGBTdHJpbmdgIGRpcmVjdGx5IHRvIGF2b2lkIHRoaXMgYmVpbmcgb3B0aW1pemVkIG91dCB0byBgc3ltYm9sKycnYCB3aGljaCB3aWxsLFxuICAvLyBvZiBjb3Vyc2UsIGZhaWwuXG4gIHJldHVybiAhJFN0cmluZyhzeW1ib2wpIHx8ICEoT2JqZWN0KHN5bWJvbCkgaW5zdGFuY2VvZiBTeW1ib2wpIHx8XG4gICAgLy8gQ2hyb21lIDM4LTQwIHN5bWJvbHMgYXJlIG5vdCBpbmhlcml0ZWQgZnJvbSBET00gY29sbGVjdGlvbnMgcHJvdG90eXBlcyB0byBpbnN0YW5jZXNcbiAgICAhU3ltYm9sLnNoYW0gJiYgVjhfVkVSU0lPTiAmJiBWOF9WRVJTSU9OIDwgNDE7XG59KTtcbiIsIid1c2Ugc3RyaWN0JztcbnZhciB0b0ludGVnZXJPckluZmluaXR5ID0gcmVxdWlyZSgnLi4vaW50ZXJuYWxzL3RvLWludGVnZXItb3ItaW5maW5pdHknKTtcblxudmFyIG1heCA9IE1hdGgubWF4O1xudmFyIG1pbiA9IE1hdGgubWluO1xuXG4vLyBIZWxwZXIgZm9yIGEgcG9wdWxhciByZXBlYXRpbmcgY2FzZSBvZiB0aGUgc3BlYzpcbi8vIExldCBpbnRlZ2VyIGJlID8gVG9JbnRlZ2VyKGluZGV4KS5cbi8vIElmIGludGVnZXIgPCAwLCBsZXQgcmVzdWx0IGJlIG1heCgobGVuZ3RoICsgaW50ZWdlciksIDApOyBlbHNlIGxldCByZXN1bHQgYmUgbWluKGludGVnZXIsIGxlbmd0aCkuXG5tb2R1bGUuZXhwb3J0cyA9IGZ1bmN0aW9uIChpbmRleCwgbGVuZ3RoKSB7XG4gIHZhciBpbnRlZ2VyID0gdG9JbnRlZ2VyT3JJbmZpbml0eShpbmRleCk7XG4gIHJldHVybiBpbnRlZ2VyIDwgMCA/IG1heChpbnRlZ2VyICsgbGVuZ3RoLCAwKSA6IG1pbihpbnRlZ2VyLCBsZW5ndGgpO1xufTtcbiIsIid1c2Ugc3RyaWN0Jztcbi8vIHRvT2JqZWN0IHdpdGggZmFsbGJhY2sgZm9yIG5vbi1hcnJheS1saWtlIEVTMyBzdHJpbmdzXG52YXIgSW5kZXhlZE9iamVjdCA9IHJlcXVpcmUoJy4uL2ludGVybmFscy9pbmRleGVkLW9iamVjdCcpO1xudmFyIHJlcXVpcmVPYmplY3RDb2VyY2libGUgPSByZXF1aXJlKCcuLi9pbnRlcm5hbHMvcmVxdWlyZS1vYmplY3QtY29lcmNpYmxlJyk7XG5cbm1vZHVsZS5leHBvcnRzID0gZnVuY3Rpb24gKGl0KSB7XG4gIHJldHVybiBJbmRleGVkT2JqZWN0KHJlcXVpcmVPYmplY3RDb2VyY2libGUoaXQpKTtcbn07XG4iLCIndXNlIHN0cmljdCc7XG52YXIgdHJ1bmMgPSByZXF1aXJlKCcuLi9pbnRlcm5hbHMvbWF0aC10cnVuYycpO1xuXG4vLyBgVG9JbnRlZ2VyT3JJbmZpbml0eWAgYWJzdHJhY3Qgb3BlcmF0aW9uXG4vLyBodHRwczovL3RjMzkuZXMvZWNtYTI2Mi8jc2VjLXRvaW50ZWdlcm9yaW5maW5pdHlcbm1vZHVsZS5leHBvcnRzID0gZnVuY3Rpb24gKGFyZ3VtZW50KSB7XG4gIHZhciBudW1iZXIgPSArYXJndW1lbnQ7XG4gIC8vIGVzbGludC1kaXNhYmxlLW5leHQtbGluZSBuby1zZWxmLWNvbXBhcmUgLS0gTmFOIGNoZWNrXG4gIHJldHVybiBudW1iZXIgIT09IG51bWJlciB8fCBudW1iZXIgPT09IDAgPyAwIDogdHJ1bmMobnVtYmVyKTtcbn07XG4iLCIndXNlIHN0cmljdCc7XG52YXIgdG9JbnRlZ2VyT3JJbmZpbml0eSA9IHJlcXVpcmUoJy4uL2ludGVybmFscy90by1pbnRlZ2VyLW9yLWluZmluaXR5Jyk7XG5cbnZhciBtaW4gPSBNYXRoLm1pbjtcblxuLy8gYFRvTGVuZ3RoYCBhYnN0cmFjdCBvcGVyYXRpb25cbi8vIGh0dHBzOi8vdGMzOS5lcy9lY21hMjYyLyNzZWMtdG9sZW5ndGhcbm1vZHVsZS5leHBvcnRzID0gZnVuY3Rpb24gKGFyZ3VtZW50KSB7XG4gIHZhciBsZW4gPSB0b0ludGVnZXJPckluZmluaXR5KGFyZ3VtZW50KTtcbiAgcmV0dXJuIGxlbiA+IDAgPyBtaW4obGVuLCAweDFGRkZGRkZGRkZGRkZGKSA6IDA7IC8vIDIgKiogNTMgLSAxID09IDkwMDcxOTkyNTQ3NDA5OTFcbn07XG4iLCIndXNlIHN0cmljdCc7XG52YXIgcmVxdWlyZU9iamVjdENvZXJjaWJsZSA9IHJlcXVpcmUoJy4uL2ludGVybmFscy9yZXF1aXJlLW9iamVjdC1jb2VyY2libGUnKTtcblxudmFyICRPYmplY3QgPSBPYmplY3Q7XG5cbi8vIGBUb09iamVjdGAgYWJzdHJhY3Qgb3BlcmF0aW9uXG4vLyBodHRwczovL3RjMzkuZXMvZWNtYTI2Mi8jc2VjLXRvb2JqZWN0XG5tb2R1bGUuZXhwb3J0cyA9IGZ1bmN0aW9uIChhcmd1bWVudCkge1xuICByZXR1cm4gJE9iamVjdChyZXF1aXJlT2JqZWN0Q29lcmNpYmxlKGFyZ3VtZW50KSk7XG59O1xuIiwiJ3VzZSBzdHJpY3QnO1xudmFyIGNhbGwgPSByZXF1aXJlKCcuLi9pbnRlcm5hbHMvZnVuY3Rpb24tY2FsbCcpO1xudmFyIGlzT2JqZWN0ID0gcmVxdWlyZSgnLi4vaW50ZXJuYWxzL2lzLW9iamVjdCcpO1xudmFyIGlzU3ltYm9sID0gcmVxdWlyZSgnLi4vaW50ZXJuYWxzL2lzLXN5bWJvbCcpO1xudmFyIGdldE1ldGhvZCA9IHJlcXVpcmUoJy4uL2ludGVybmFscy9nZXQtbWV0aG9kJyk7XG52YXIgb3JkaW5hcnlUb1ByaW1pdGl2ZSA9IHJlcXVpcmUoJy4uL2ludGVybmFscy9vcmRpbmFyeS10by1wcmltaXRpdmUnKTtcbnZhciB3ZWxsS25vd25TeW1ib2wgPSByZXF1aXJlKCcuLi9pbnRlcm5hbHMvd2VsbC1rbm93bi1zeW1ib2wnKTtcblxudmFyICRUeXBlRXJyb3IgPSBUeXBlRXJyb3I7XG52YXIgVE9fUFJJTUlUSVZFID0gd2VsbEtub3duU3ltYm9sKCd0b1ByaW1pdGl2ZScpO1xuXG4vLyBgVG9QcmltaXRpdmVgIGFic3RyYWN0IG9wZXJhdGlvblxuLy8gaHR0cHM6Ly90YzM5LmVzL2VjbWEyNjIvI3NlYy10b3ByaW1pdGl2ZVxubW9kdWxlLmV4cG9ydHMgPSBmdW5jdGlvbiAoaW5wdXQsIHByZWYpIHtcbiAgaWYgKCFpc09iamVjdChpbnB1dCkgfHwgaXNTeW1ib2woaW5wdXQpKSByZXR1cm4gaW5wdXQ7XG4gIHZhciBleG90aWNUb1ByaW0gPSBnZXRNZXRob2QoaW5wdXQsIFRPX1BSSU1JVElWRSk7XG4gIHZhciByZXN1bHQ7XG4gIGlmIChleG90aWNUb1ByaW0pIHtcbiAgICBpZiAocHJlZiA9PT0gdW5kZWZpbmVkKSBwcmVmID0gJ2RlZmF1bHQnO1xuICAgIHJlc3VsdCA9IGNhbGwoZXhvdGljVG9QcmltLCBpbnB1dCwgcHJlZik7XG4gICAgaWYgKCFpc09iamVjdChyZXN1bHQpIHx8IGlzU3ltYm9sKHJlc3VsdCkpIHJldHVybiByZXN1bHQ7XG4gICAgdGhyb3cgbmV3ICRUeXBlRXJyb3IoXCJDYW4ndCBjb252ZXJ0IG9iamVjdCB0byBwcmltaXRpdmUgdmFsdWVcIik7XG4gIH1cbiAgaWYgKHByZWYgPT09IHVuZGVmaW5lZCkgcHJlZiA9ICdudW1iZXInO1xuICByZXR1cm4gb3JkaW5hcnlUb1ByaW1pdGl2ZShpbnB1dCwgcHJlZik7XG59O1xuIiwiJ3VzZSBzdHJpY3QnO1xudmFyIHRvUHJpbWl0aXZlID0gcmVxdWlyZSgnLi4vaW50ZXJuYWxzL3RvLXByaW1pdGl2ZScpO1xudmFyIGlzU3ltYm9sID0gcmVxdWlyZSgnLi4vaW50ZXJuYWxzL2lzLXN5bWJvbCcpO1xuXG4vLyBgVG9Qcm9wZXJ0eUtleWAgYWJzdHJhY3Qgb3BlcmF0aW9uXG4vLyBodHRwczovL3RjMzkuZXMvZWNtYTI2Mi8jc2VjLXRvcHJvcGVydHlrZXlcbm1vZHVsZS5leHBvcnRzID0gZnVuY3Rpb24gKGFyZ3VtZW50KSB7XG4gIHZhciBrZXkgPSB0b1ByaW1pdGl2ZShhcmd1bWVudCwgJ3N0cmluZycpO1xuICByZXR1cm4gaXNTeW1ib2woa2V5KSA/IGtleSA6IGtleSArICcnO1xufTtcbiIsIid1c2Ugc3RyaWN0JztcbnZhciB3ZWxsS25vd25TeW1ib2wgPSByZXF1aXJlKCcuLi9pbnRlcm5hbHMvd2VsbC1rbm93bi1zeW1ib2wnKTtcblxudmFyIFRPX1NUUklOR19UQUcgPSB3ZWxsS25vd25TeW1ib2woJ3RvU3RyaW5nVGFnJyk7XG52YXIgdGVzdCA9IHt9O1xuXG50ZXN0W1RPX1NUUklOR19UQUddID0gJ3onO1xuXG5tb2R1bGUuZXhwb3J0cyA9IFN0cmluZyh0ZXN0KSA9PT0gJ1tvYmplY3Qgel0nO1xuIiwiJ3VzZSBzdHJpY3QnO1xudmFyIGNsYXNzb2YgPSByZXF1aXJlKCcuLi9pbnRlcm5hbHMvY2xhc3NvZicpO1xuXG52YXIgJFN0cmluZyA9IFN0cmluZztcblxubW9kdWxlLmV4cG9ydHMgPSBmdW5jdGlvbiAoYXJndW1lbnQpIHtcbiAgaWYgKGNsYXNzb2YoYXJndW1lbnQpID09PSAnU3ltYm9sJykgdGhyb3cgbmV3IFR5cGVFcnJvcignQ2Fubm90IGNvbnZlcnQgYSBTeW1ib2wgdmFsdWUgdG8gYSBzdHJpbmcnKTtcbiAgcmV0dXJuICRTdHJpbmcoYXJndW1lbnQpO1xufTtcbiIsIid1c2Ugc3RyaWN0JztcbnZhciAkU3RyaW5nID0gU3RyaW5nO1xuXG5tb2R1bGUuZXhwb3J0cyA9IGZ1bmN0aW9uIChhcmd1bWVudCkge1xuICB0cnkge1xuICAgIHJldHVybiAkU3RyaW5nKGFyZ3VtZW50KTtcbiAgfSBjYXRjaCAoZXJyb3IpIHtcbiAgICByZXR1cm4gJ09iamVjdCc7XG4gIH1cbn07XG4iLCIndXNlIHN0cmljdCc7XG52YXIgdW5jdXJyeVRoaXMgPSByZXF1aXJlKCcuLi9pbnRlcm5hbHMvZnVuY3Rpb24tdW5jdXJyeS10aGlzJyk7XG5cbnZhciBpZCA9IDA7XG52YXIgcG9zdGZpeCA9IE1hdGgucmFuZG9tKCk7XG52YXIgdG9TdHJpbmcgPSB1bmN1cnJ5VGhpcygxLjAudG9TdHJpbmcpO1xuXG5tb2R1bGUuZXhwb3J0cyA9IGZ1bmN0aW9uIChrZXkpIHtcbiAgcmV0dXJuICdTeW1ib2woJyArIChrZXkgPT09IHVuZGVmaW5lZCA/ICcnIDoga2V5KSArICcpXycgKyB0b1N0cmluZygrK2lkICsgcG9zdGZpeCwgMzYpO1xufTtcbiIsIid1c2Ugc3RyaWN0JztcbnZhciBmYWlscyA9IHJlcXVpcmUoJy4uL2ludGVybmFscy9mYWlscycpO1xudmFyIHdlbGxLbm93blN5bWJvbCA9IHJlcXVpcmUoJy4uL2ludGVybmFscy93ZWxsLWtub3duLXN5bWJvbCcpO1xudmFyIERFU0NSSVBUT1JTID0gcmVxdWlyZSgnLi4vaW50ZXJuYWxzL2Rlc2NyaXB0b3JzJyk7XG52YXIgSVNfUFVSRSA9IHJlcXVpcmUoJy4uL2ludGVybmFscy9pcy1wdXJlJyk7XG5cbnZhciBJVEVSQVRPUiA9IHdlbGxLbm93blN5bWJvbCgnaXRlcmF0b3InKTtcblxubW9kdWxlLmV4cG9ydHMgPSAhZmFpbHMoZnVuY3Rpb24gKCkge1xuICAvLyBlc2xpbnQtZGlzYWJsZS1uZXh0LWxpbmUgdW5pY29ybi9yZWxhdGl2ZS11cmwtc3R5bGUgLS0gcmVxdWlyZWQgZm9yIHRlc3RpbmdcbiAgdmFyIHVybCA9IG5ldyBVUkwoJ2I/YT0xJmI9MiZjPTMnLCAnaHR0cDovL2EnKTtcbiAgdmFyIHBhcmFtcyA9IHVybC5zZWFyY2hQYXJhbXM7XG4gIHZhciBwYXJhbXMyID0gbmV3IFVSTFNlYXJjaFBhcmFtcygnYT0xJmE9MiZiPTMnKTtcbiAgdmFyIHJlc3VsdCA9ICcnO1xuICB1cmwucGF0aG5hbWUgPSAnYyUyMGQnO1xuICBwYXJhbXMuZm9yRWFjaChmdW5jdGlvbiAodmFsdWUsIGtleSkge1xuICAgIHBhcmFtc1snZGVsZXRlJ10oJ2InKTtcbiAgICByZXN1bHQgKz0ga2V5ICsgdmFsdWU7XG4gIH0pO1xuICBwYXJhbXMyWydkZWxldGUnXSgnYScsIDIpO1xuICAvLyBgdW5kZWZpbmVkYCBjYXNlIGlzIGEgQ2hyb21pdW0gMTE3IGJ1Z1xuICAvLyBodHRwczovL2J1Z3MuY2hyb21pdW0ub3JnL3AvdjgvaXNzdWVzL2RldGFpbD9pZD0xNDIyMlxuICBwYXJhbXMyWydkZWxldGUnXSgnYicsIHVuZGVmaW5lZCk7XG4gIHJldHVybiAoSVNfUFVSRSAmJiAoIXVybC50b0pTT04gfHwgIXBhcmFtczIuaGFzKCdhJywgMSkgfHwgcGFyYW1zMi5oYXMoJ2EnLCAyKSB8fCAhcGFyYW1zMi5oYXMoJ2EnLCB1bmRlZmluZWQpIHx8IHBhcmFtczIuaGFzKCdiJykpKVxuICAgIHx8ICghcGFyYW1zLnNpemUgJiYgKElTX1BVUkUgfHwgIURFU0NSSVBUT1JTKSlcbiAgICB8fCAhcGFyYW1zLnNvcnRcbiAgICB8fCB1cmwuaHJlZiAhPT0gJ2h0dHA6Ly9hL2MlMjBkP2E9MSZjPTMnXG4gICAgfHwgcGFyYW1zLmdldCgnYycpICE9PSAnMydcbiAgICB8fCBTdHJpbmcobmV3IFVSTFNlYXJjaFBhcmFtcygnP2E9MScpKSAhPT0gJ2E9MSdcbiAgICB8fCAhcGFyYW1zW0lURVJBVE9SXVxuICAgIC8vIHRocm93cyBpbiBFZGdlXG4gICAgfHwgbmV3IFVSTCgnaHR0cHM6Ly9hQGInKS51c2VybmFtZSAhPT0gJ2EnXG4gICAgfHwgbmV3IFVSTFNlYXJjaFBhcmFtcyhuZXcgVVJMU2VhcmNoUGFyYW1zKCdhPWInKSkuZ2V0KCdhJykgIT09ICdiJ1xuICAgIC8vIG5vdCBwdW55Y29kZWQgaW4gRWRnZVxuICAgIHx8IG5ldyBVUkwoJ2h0dHA6Ly/RgtC10YHRgicpLmhvc3QgIT09ICd4bi0tZTFheWJjJ1xuICAgIC8vIG5vdCBlc2NhcGVkIGluIENocm9tZSA2Mi1cbiAgICB8fCBuZXcgVVJMKCdodHRwOi8vYSPQsScpLmhhc2ggIT09ICcjJUQwJUIxJ1xuICAgIC8vIGZhaWxzIGluIENocm9tZSA2Ni1cbiAgICB8fCByZXN1bHQgIT09ICdhMWMzJ1xuICAgIC8vIHRocm93cyBpbiBTYWZhcmlcbiAgICB8fCBuZXcgVVJMKCdodHRwOi8veCcsIHVuZGVmaW5lZCkuaG9zdCAhPT0gJ3gnO1xufSk7XG4iLCIndXNlIHN0cmljdCc7XG4vKiBlc2xpbnQtZGlzYWJsZSBlcy9uby1zeW1ib2wgLS0gcmVxdWlyZWQgZm9yIHRlc3RpbmcgKi9cbnZhciBOQVRJVkVfU1lNQk9MID0gcmVxdWlyZSgnLi4vaW50ZXJuYWxzL3N5bWJvbC1jb25zdHJ1Y3Rvci1kZXRlY3Rpb24nKTtcblxubW9kdWxlLmV4cG9ydHMgPSBOQVRJVkVfU1lNQk9MXG4gICYmICFTeW1ib2wuc2hhbVxuICAmJiB0eXBlb2YgU3ltYm9sLml0ZXJhdG9yID09ICdzeW1ib2wnO1xuIiwiJ3VzZSBzdHJpY3QnO1xudmFyIERFU0NSSVBUT1JTID0gcmVxdWlyZSgnLi4vaW50ZXJuYWxzL2Rlc2NyaXB0b3JzJyk7XG52YXIgZmFpbHMgPSByZXF1aXJlKCcuLi9pbnRlcm5hbHMvZmFpbHMnKTtcblxuLy8gVjggfiBDaHJvbWUgMzYtXG4vLyBodHRwczovL2J1Z3MuY2hyb21pdW0ub3JnL3AvdjgvaXNzdWVzL2RldGFpbD9pZD0zMzM0XG5tb2R1bGUuZXhwb3J0cyA9IERFU0NSSVBUT1JTICYmIGZhaWxzKGZ1bmN0aW9uICgpIHtcbiAgLy8gZXNsaW50LWRpc2FibGUtbmV4dC1saW5lIGVzL25vLW9iamVjdC1kZWZpbmVwcm9wZXJ0eSAtLSByZXF1aXJlZCBmb3IgdGVzdGluZ1xuICByZXR1cm4gT2JqZWN0LmRlZmluZVByb3BlcnR5KGZ1bmN0aW9uICgpIHsgLyogZW1wdHkgKi8gfSwgJ3Byb3RvdHlwZScsIHtcbiAgICB2YWx1ZTogNDIsXG4gICAgd3JpdGFibGU6IGZhbHNlXG4gIH0pLnByb3RvdHlwZSAhPT0gNDI7XG59KTtcbiIsIid1c2Ugc3RyaWN0JztcbnZhciAkVHlwZUVycm9yID0gVHlwZUVycm9yO1xuXG5tb2R1bGUuZXhwb3J0cyA9IGZ1bmN0aW9uIChwYXNzZWQsIHJlcXVpcmVkKSB7XG4gIGlmIChwYXNzZWQgPCByZXF1aXJlZCkgdGhyb3cgbmV3ICRUeXBlRXJyb3IoJ05vdCBlbm91Z2ggYXJndW1lbnRzJyk7XG4gIHJldHVybiBwYXNzZWQ7XG59O1xuIiwiJ3VzZSBzdHJpY3QnO1xudmFyIGdsb2JhbCA9IHJlcXVpcmUoJy4uL2ludGVybmFscy9nbG9iYWwnKTtcbnZhciBpc0NhbGxhYmxlID0gcmVxdWlyZSgnLi4vaW50ZXJuYWxzL2lzLWNhbGxhYmxlJyk7XG5cbnZhciBXZWFrTWFwID0gZ2xvYmFsLldlYWtNYXA7XG5cbm1vZHVsZS5leHBvcnRzID0gaXNDYWxsYWJsZShXZWFrTWFwKSAmJiAvbmF0aXZlIGNvZGUvLnRlc3QoU3RyaW5nKFdlYWtNYXApKTtcbiIsIid1c2Ugc3RyaWN0JztcbnZhciBnbG9iYWwgPSByZXF1aXJlKCcuLi9pbnRlcm5hbHMvZ2xvYmFsJyk7XG52YXIgc2hhcmVkID0gcmVxdWlyZSgnLi4vaW50ZXJuYWxzL3NoYXJlZCcpO1xudmFyIGhhc093biA9IHJlcXVpcmUoJy4uL2ludGVybmFscy9oYXMtb3duLXByb3BlcnR5Jyk7XG52YXIgdWlkID0gcmVxdWlyZSgnLi4vaW50ZXJuYWxzL3VpZCcpO1xudmFyIE5BVElWRV9TWU1CT0wgPSByZXF1aXJlKCcuLi9pbnRlcm5hbHMvc3ltYm9sLWNvbnN0cnVjdG9yLWRldGVjdGlvbicpO1xudmFyIFVTRV9TWU1CT0xfQVNfVUlEID0gcmVxdWlyZSgnLi4vaW50ZXJuYWxzL3VzZS1zeW1ib2wtYXMtdWlkJyk7XG5cbnZhciBTeW1ib2wgPSBnbG9iYWwuU3ltYm9sO1xudmFyIFdlbGxLbm93blN5bWJvbHNTdG9yZSA9IHNoYXJlZCgnd2tzJyk7XG52YXIgY3JlYXRlV2VsbEtub3duU3ltYm9sID0gVVNFX1NZTUJPTF9BU19VSUQgPyBTeW1ib2xbJ2ZvciddIHx8IFN5bWJvbCA6IFN5bWJvbCAmJiBTeW1ib2wud2l0aG91dFNldHRlciB8fCB1aWQ7XG5cbm1vZHVsZS5leHBvcnRzID0gZnVuY3Rpb24gKG5hbWUpIHtcbiAgaWYgKCFoYXNPd24oV2VsbEtub3duU3ltYm9sc1N0b3JlLCBuYW1lKSkge1xuICAgIFdlbGxLbm93blN5bWJvbHNTdG9yZVtuYW1lXSA9IE5BVElWRV9TWU1CT0wgJiYgaGFzT3duKFN5bWJvbCwgbmFtZSlcbiAgICAgID8gU3ltYm9sW25hbWVdXG4gICAgICA6IGNyZWF0ZVdlbGxLbm93blN5bWJvbCgnU3ltYm9sLicgKyBuYW1lKTtcbiAgfSByZXR1cm4gV2VsbEtub3duU3ltYm9sc1N0b3JlW25hbWVdO1xufTtcbiIsIid1c2Ugc3RyaWN0JztcbnZhciAkID0gcmVxdWlyZSgnLi4vaW50ZXJuYWxzL2V4cG9ydCcpO1xudmFyICRpbmNsdWRlcyA9IHJlcXVpcmUoJy4uL2ludGVybmFscy9hcnJheS1pbmNsdWRlcycpLmluY2x1ZGVzO1xudmFyIGZhaWxzID0gcmVxdWlyZSgnLi4vaW50ZXJuYWxzL2ZhaWxzJyk7XG52YXIgYWRkVG9VbnNjb3BhYmxlcyA9IHJlcXVpcmUoJy4uL2ludGVybmFscy9hZGQtdG8tdW5zY29wYWJsZXMnKTtcblxuLy8gRkY5OSsgYnVnXG52YXIgQlJPS0VOX09OX1NQQVJTRSA9IGZhaWxzKGZ1bmN0aW9uICgpIHtcbiAgLy8gZXNsaW50LWRpc2FibGUtbmV4dC1saW5lIGVzL25vLWFycmF5LXByb3RvdHlwZS1pbmNsdWRlcyAtLSBkZXRlY3Rpb25cbiAgcmV0dXJuICFBcnJheSgxKS5pbmNsdWRlcygpO1xufSk7XG5cbi8vIGBBcnJheS5wcm90b3R5cGUuaW5jbHVkZXNgIG1ldGhvZFxuLy8gaHR0cHM6Ly90YzM5LmVzL2VjbWEyNjIvI3NlYy1hcnJheS5wcm90b3R5cGUuaW5jbHVkZXNcbiQoeyB0YXJnZXQ6ICdBcnJheScsIHByb3RvOiB0cnVlLCBmb3JjZWQ6IEJST0tFTl9PTl9TUEFSU0UgfSwge1xuICBpbmNsdWRlczogZnVuY3Rpb24gaW5jbHVkZXMoZWwgLyogLCBmcm9tSW5kZXggPSAwICovKSB7XG4gICAgcmV0dXJuICRpbmNsdWRlcyh0aGlzLCBlbCwgYXJndW1lbnRzLmxlbmd0aCA+IDEgPyBhcmd1bWVudHNbMV0gOiB1bmRlZmluZWQpO1xuICB9XG59KTtcblxuLy8gaHR0cHM6Ly90YzM5LmVzL2VjbWEyNjIvI3NlYy1hcnJheS5wcm90b3R5cGUtQEB1bnNjb3BhYmxlc1xuYWRkVG9VbnNjb3BhYmxlcygnaW5jbHVkZXMnKTtcbiIsIid1c2Ugc3RyaWN0JztcbnZhciB0b0luZGV4ZWRPYmplY3QgPSByZXF1aXJlKCcuLi9pbnRlcm5hbHMvdG8taW5kZXhlZC1vYmplY3QnKTtcbnZhciBhZGRUb1Vuc2NvcGFibGVzID0gcmVxdWlyZSgnLi4vaW50ZXJuYWxzL2FkZC10by11bnNjb3BhYmxlcycpO1xudmFyIEl0ZXJhdG9ycyA9IHJlcXVpcmUoJy4uL2ludGVybmFscy9pdGVyYXRvcnMnKTtcbnZhciBJbnRlcm5hbFN0YXRlTW9kdWxlID0gcmVxdWlyZSgnLi4vaW50ZXJuYWxzL2ludGVybmFsLXN0YXRlJyk7XG52YXIgZGVmaW5lUHJvcGVydHkgPSByZXF1aXJlKCcuLi9pbnRlcm5hbHMvb2JqZWN0LWRlZmluZS1wcm9wZXJ0eScpLmY7XG52YXIgZGVmaW5lSXRlcmF0b3IgPSByZXF1aXJlKCcuLi9pbnRlcm5hbHMvaXRlcmF0b3ItZGVmaW5lJyk7XG52YXIgY3JlYXRlSXRlclJlc3VsdE9iamVjdCA9IHJlcXVpcmUoJy4uL2ludGVybmFscy9jcmVhdGUtaXRlci1yZXN1bHQtb2JqZWN0Jyk7XG52YXIgSVNfUFVSRSA9IHJlcXVpcmUoJy4uL2ludGVybmFscy9pcy1wdXJlJyk7XG52YXIgREVTQ1JJUFRPUlMgPSByZXF1aXJlKCcuLi9pbnRlcm5hbHMvZGVzY3JpcHRvcnMnKTtcblxudmFyIEFSUkFZX0lURVJBVE9SID0gJ0FycmF5IEl0ZXJhdG9yJztcbnZhciBzZXRJbnRlcm5hbFN0YXRlID0gSW50ZXJuYWxTdGF0ZU1vZHVsZS5zZXQ7XG52YXIgZ2V0SW50ZXJuYWxTdGF0ZSA9IEludGVybmFsU3RhdGVNb2R1bGUuZ2V0dGVyRm9yKEFSUkFZX0lURVJBVE9SKTtcblxuLy8gYEFycmF5LnByb3RvdHlwZS5lbnRyaWVzYCBtZXRob2Rcbi8vIGh0dHBzOi8vdGMzOS5lcy9lY21hMjYyLyNzZWMtYXJyYXkucHJvdG90eXBlLmVudHJpZXNcbi8vIGBBcnJheS5wcm90b3R5cGUua2V5c2AgbWV0aG9kXG4vLyBodHRwczovL3RjMzkuZXMvZWNtYTI2Mi8jc2VjLWFycmF5LnByb3RvdHlwZS5rZXlzXG4vLyBgQXJyYXkucHJvdG90eXBlLnZhbHVlc2AgbWV0aG9kXG4vLyBodHRwczovL3RjMzkuZXMvZWNtYTI2Mi8jc2VjLWFycmF5LnByb3RvdHlwZS52YWx1ZXNcbi8vIGBBcnJheS5wcm90b3R5cGVbQEBpdGVyYXRvcl1gIG1ldGhvZFxuLy8gaHR0cHM6Ly90YzM5LmVzL2VjbWEyNjIvI3NlYy1hcnJheS5wcm90b3R5cGUtQEBpdGVyYXRvclxuLy8gYENyZWF0ZUFycmF5SXRlcmF0b3JgIGludGVybmFsIG1ldGhvZFxuLy8gaHR0cHM6Ly90YzM5LmVzL2VjbWEyNjIvI3NlYy1jcmVhdGVhcnJheWl0ZXJhdG9yXG5tb2R1bGUuZXhwb3J0cyA9IGRlZmluZUl0ZXJhdG9yKEFycmF5LCAnQXJyYXknLCBmdW5jdGlvbiAoaXRlcmF0ZWQsIGtpbmQpIHtcbiAgc2V0SW50ZXJuYWxTdGF0ZSh0aGlzLCB7XG4gICAgdHlwZTogQVJSQVlfSVRFUkFUT1IsXG4gICAgdGFyZ2V0OiB0b0luZGV4ZWRPYmplY3QoaXRlcmF0ZWQpLCAvLyB0YXJnZXRcbiAgICBpbmRleDogMCwgICAgICAgICAgICAgICAgICAgICAgICAgIC8vIG5leHQgaW5kZXhcbiAgICBraW5kOiBraW5kICAgICAgICAgICAgICAgICAgICAgICAgIC8vIGtpbmRcbiAgfSk7XG4vLyBgJUFycmF5SXRlcmF0b3JQcm90b3R5cGUlLm5leHRgIG1ldGhvZFxuLy8gaHR0cHM6Ly90YzM5LmVzL2VjbWEyNjIvI3NlYy0lYXJyYXlpdGVyYXRvcnByb3RvdHlwZSUubmV4dFxufSwgZnVuY3Rpb24gKCkge1xuICB2YXIgc3RhdGUgPSBnZXRJbnRlcm5hbFN0YXRlKHRoaXMpO1xuICB2YXIgdGFyZ2V0ID0gc3RhdGUudGFyZ2V0O1xuICB2YXIgaW5kZXggPSBzdGF0ZS5pbmRleCsrO1xuICBpZiAoIXRhcmdldCB8fCBpbmRleCA+PSB0YXJnZXQubGVuZ3RoKSB7XG4gICAgc3RhdGUudGFyZ2V0ID0gdW5kZWZpbmVkO1xuICAgIHJldHVybiBjcmVhdGVJdGVyUmVzdWx0T2JqZWN0KHVuZGVmaW5lZCwgdHJ1ZSk7XG4gIH1cbiAgc3dpdGNoIChzdGF0ZS5raW5kKSB7XG4gICAgY2FzZSAna2V5cyc6IHJldHVybiBjcmVhdGVJdGVyUmVzdWx0T2JqZWN0KGluZGV4LCBmYWxzZSk7XG4gICAgY2FzZSAndmFsdWVzJzogcmV0dXJuIGNyZWF0ZUl0ZXJSZXN1bHRPYmplY3QodGFyZ2V0W2luZGV4XSwgZmFsc2UpO1xuICB9IHJldHVybiBjcmVhdGVJdGVyUmVzdWx0T2JqZWN0KFtpbmRleCwgdGFyZ2V0W2luZGV4XV0sIGZhbHNlKTtcbn0sICd2YWx1ZXMnKTtcblxuLy8gYXJndW1lbnRzTGlzdFtAQGl0ZXJhdG9yXSBpcyAlQXJyYXlQcm90b192YWx1ZXMlXG4vLyBodHRwczovL3RjMzkuZXMvZWNtYTI2Mi8jc2VjLWNyZWF0ZXVubWFwcGVkYXJndW1lbnRzb2JqZWN0XG4vLyBodHRwczovL3RjMzkuZXMvZWNtYTI2Mi8jc2VjLWNyZWF0ZW1hcHBlZGFyZ3VtZW50c29iamVjdFxudmFyIHZhbHVlcyA9IEl0ZXJhdG9ycy5Bcmd1bWVudHMgPSBJdGVyYXRvcnMuQXJyYXk7XG5cbi8vIGh0dHBzOi8vdGMzOS5lcy9lY21hMjYyLyNzZWMtYXJyYXkucHJvdG90eXBlLUBAdW5zY29wYWJsZXNcbmFkZFRvVW5zY29wYWJsZXMoJ2tleXMnKTtcbmFkZFRvVW5zY29wYWJsZXMoJ3ZhbHVlcycpO1xuYWRkVG9VbnNjb3BhYmxlcygnZW50cmllcycpO1xuXG4vLyBWOCB+IENocm9tZSA0NS0gYnVnXG5pZiAoIUlTX1BVUkUgJiYgREVTQ1JJUFRPUlMgJiYgdmFsdWVzLm5hbWUgIT09ICd2YWx1ZXMnKSB0cnkge1xuICBkZWZpbmVQcm9wZXJ0eSh2YWx1ZXMsICduYW1lJywgeyB2YWx1ZTogJ3ZhbHVlcycgfSk7XG59IGNhdGNoIChlcnJvcikgeyAvKiBlbXB0eSAqLyB9XG4iLCIndXNlIHN0cmljdCc7XG52YXIgREVTQ1JJUFRPUlMgPSByZXF1aXJlKCcuLi9pbnRlcm5hbHMvZGVzY3JpcHRvcnMnKTtcbnZhciBnbG9iYWwgPSByZXF1aXJlKCcuLi9pbnRlcm5hbHMvZ2xvYmFsJyk7XG52YXIgdW5jdXJyeVRoaXMgPSByZXF1aXJlKCcuLi9pbnRlcm5hbHMvZnVuY3Rpb24tdW5jdXJyeS10aGlzJyk7XG52YXIgaXNGb3JjZWQgPSByZXF1aXJlKCcuLi9pbnRlcm5hbHMvaXMtZm9yY2VkJyk7XG52YXIgaW5oZXJpdElmUmVxdWlyZWQgPSByZXF1aXJlKCcuLi9pbnRlcm5hbHMvaW5oZXJpdC1pZi1yZXF1aXJlZCcpO1xudmFyIGNyZWF0ZU5vbkVudW1lcmFibGVQcm9wZXJ0eSA9IHJlcXVpcmUoJy4uL2ludGVybmFscy9jcmVhdGUtbm9uLWVudW1lcmFibGUtcHJvcGVydHknKTtcbnZhciBjcmVhdGUgPSByZXF1aXJlKCcuLi9pbnRlcm5hbHMvb2JqZWN0LWNyZWF0ZScpO1xudmFyIGdldE93blByb3BlcnR5TmFtZXMgPSByZXF1aXJlKCcuLi9pbnRlcm5hbHMvb2JqZWN0LWdldC1vd24tcHJvcGVydHktbmFtZXMnKS5mO1xudmFyIGlzUHJvdG90eXBlT2YgPSByZXF1aXJlKCcuLi9pbnRlcm5hbHMvb2JqZWN0LWlzLXByb3RvdHlwZS1vZicpO1xudmFyIGlzUmVnRXhwID0gcmVxdWlyZSgnLi4vaW50ZXJuYWxzL2lzLXJlZ2V4cCcpO1xudmFyIHRvU3RyaW5nID0gcmVxdWlyZSgnLi4vaW50ZXJuYWxzL3RvLXN0cmluZycpO1xudmFyIGdldFJlZ0V4cEZsYWdzID0gcmVxdWlyZSgnLi4vaW50ZXJuYWxzL3JlZ2V4cC1nZXQtZmxhZ3MnKTtcbnZhciBzdGlja3lIZWxwZXJzID0gcmVxdWlyZSgnLi4vaW50ZXJuYWxzL3JlZ2V4cC1zdGlja3ktaGVscGVycycpO1xudmFyIHByb3h5QWNjZXNzb3IgPSByZXF1aXJlKCcuLi9pbnRlcm5hbHMvcHJveHktYWNjZXNzb3InKTtcbnZhciBkZWZpbmVCdWlsdEluID0gcmVxdWlyZSgnLi4vaW50ZXJuYWxzL2RlZmluZS1idWlsdC1pbicpO1xudmFyIGZhaWxzID0gcmVxdWlyZSgnLi4vaW50ZXJuYWxzL2ZhaWxzJyk7XG52YXIgaGFzT3duID0gcmVxdWlyZSgnLi4vaW50ZXJuYWxzL2hhcy1vd24tcHJvcGVydHknKTtcbnZhciBlbmZvcmNlSW50ZXJuYWxTdGF0ZSA9IHJlcXVpcmUoJy4uL2ludGVybmFscy9pbnRlcm5hbC1zdGF0ZScpLmVuZm9yY2U7XG52YXIgc2V0U3BlY2llcyA9IHJlcXVpcmUoJy4uL2ludGVybmFscy9zZXQtc3BlY2llcycpO1xudmFyIHdlbGxLbm93blN5bWJvbCA9IHJlcXVpcmUoJy4uL2ludGVybmFscy93ZWxsLWtub3duLXN5bWJvbCcpO1xudmFyIFVOU1VQUE9SVEVEX0RPVF9BTEwgPSByZXF1aXJlKCcuLi9pbnRlcm5hbHMvcmVnZXhwLXVuc3VwcG9ydGVkLWRvdC1hbGwnKTtcbnZhciBVTlNVUFBPUlRFRF9OQ0cgPSByZXF1aXJlKCcuLi9pbnRlcm5hbHMvcmVnZXhwLXVuc3VwcG9ydGVkLW5jZycpO1xuXG52YXIgTUFUQ0ggPSB3ZWxsS25vd25TeW1ib2woJ21hdGNoJyk7XG52YXIgTmF0aXZlUmVnRXhwID0gZ2xvYmFsLlJlZ0V4cDtcbnZhciBSZWdFeHBQcm90b3R5cGUgPSBOYXRpdmVSZWdFeHAucHJvdG90eXBlO1xudmFyIFN5bnRheEVycm9yID0gZ2xvYmFsLlN5bnRheEVycm9yO1xudmFyIGV4ZWMgPSB1bmN1cnJ5VGhpcyhSZWdFeHBQcm90b3R5cGUuZXhlYyk7XG52YXIgY2hhckF0ID0gdW5jdXJyeVRoaXMoJycuY2hhckF0KTtcbnZhciByZXBsYWNlID0gdW5jdXJyeVRoaXMoJycucmVwbGFjZSk7XG52YXIgc3RyaW5nSW5kZXhPZiA9IHVuY3VycnlUaGlzKCcnLmluZGV4T2YpO1xudmFyIHN0cmluZ1NsaWNlID0gdW5jdXJyeVRoaXMoJycuc2xpY2UpO1xuLy8gVE9ETzogVXNlIG9ubHkgcHJvcGVyIFJlZ0V4cElkZW50aWZpZXJOYW1lXG52YXIgSVNfTkNHID0gL15cXD88W15cXHNcXGQhIyUmKis8PT5AXl1bXlxccyEjJSYqKzw9PkBeXSo+LztcbnZhciByZTEgPSAvYS9nO1xudmFyIHJlMiA9IC9hL2c7XG5cbi8vIFwibmV3XCIgc2hvdWxkIGNyZWF0ZSBhIG5ldyBvYmplY3QsIG9sZCB3ZWJraXQgYnVnXG52YXIgQ09SUkVDVF9ORVcgPSBuZXcgTmF0aXZlUmVnRXhwKHJlMSkgIT09IHJlMTtcblxudmFyIE1JU1NFRF9TVElDS1kgPSBzdGlja3lIZWxwZXJzLk1JU1NFRF9TVElDS1k7XG52YXIgVU5TVVBQT1JURURfWSA9IHN0aWNreUhlbHBlcnMuVU5TVVBQT1JURURfWTtcblxudmFyIEJBU0VfRk9SQ0VEID0gREVTQ1JJUFRPUlMgJiZcbiAgKCFDT1JSRUNUX05FVyB8fCBNSVNTRURfU1RJQ0tZIHx8IFVOU1VQUE9SVEVEX0RPVF9BTEwgfHwgVU5TVVBQT1JURURfTkNHIHx8IGZhaWxzKGZ1bmN0aW9uICgpIHtcbiAgICByZTJbTUFUQ0hdID0gZmFsc2U7XG4gICAgLy8gUmVnRXhwIGNvbnN0cnVjdG9yIGNhbiBhbHRlciBmbGFncyBhbmQgSXNSZWdFeHAgd29ya3MgY29ycmVjdCB3aXRoIEBAbWF0Y2hcbiAgICByZXR1cm4gTmF0aXZlUmVnRXhwKHJlMSkgIT09IHJlMSB8fCBOYXRpdmVSZWdFeHAocmUyKSA9PT0gcmUyIHx8IFN0cmluZyhOYXRpdmVSZWdFeHAocmUxLCAnaScpKSAhPT0gJy9hL2knO1xuICB9KSk7XG5cbnZhciBoYW5kbGVEb3RBbGwgPSBmdW5jdGlvbiAoc3RyaW5nKSB7XG4gIHZhciBsZW5ndGggPSBzdHJpbmcubGVuZ3RoO1xuICB2YXIgaW5kZXggPSAwO1xuICB2YXIgcmVzdWx0ID0gJyc7XG4gIHZhciBicmFja2V0cyA9IGZhbHNlO1xuICB2YXIgY2hyO1xuICBmb3IgKDsgaW5kZXggPD0gbGVuZ3RoOyBpbmRleCsrKSB7XG4gICAgY2hyID0gY2hhckF0KHN0cmluZywgaW5kZXgpO1xuICAgIGlmIChjaHIgPT09ICdcXFxcJykge1xuICAgICAgcmVzdWx0ICs9IGNociArIGNoYXJBdChzdHJpbmcsICsraW5kZXgpO1xuICAgICAgY29udGludWU7XG4gICAgfVxuICAgIGlmICghYnJhY2tldHMgJiYgY2hyID09PSAnLicpIHtcbiAgICAgIHJlc3VsdCArPSAnW1xcXFxzXFxcXFNdJztcbiAgICB9IGVsc2Uge1xuICAgICAgaWYgKGNociA9PT0gJ1snKSB7XG4gICAgICAgIGJyYWNrZXRzID0gdHJ1ZTtcbiAgICAgIH0gZWxzZSBpZiAoY2hyID09PSAnXScpIHtcbiAgICAgICAgYnJhY2tldHMgPSBmYWxzZTtcbiAgICAgIH0gcmVzdWx0ICs9IGNocjtcbiAgICB9XG4gIH0gcmV0dXJuIHJlc3VsdDtcbn07XG5cbnZhciBoYW5kbGVOQ0cgPSBmdW5jdGlvbiAoc3RyaW5nKSB7XG4gIHZhciBsZW5ndGggPSBzdHJpbmcubGVuZ3RoO1xuICB2YXIgaW5kZXggPSAwO1xuICB2YXIgcmVzdWx0ID0gJyc7XG4gIHZhciBuYW1lZCA9IFtdO1xuICB2YXIgbmFtZXMgPSBjcmVhdGUobnVsbCk7XG4gIHZhciBicmFja2V0cyA9IGZhbHNlO1xuICB2YXIgbmNnID0gZmFsc2U7XG4gIHZhciBncm91cGlkID0gMDtcbiAgdmFyIGdyb3VwbmFtZSA9ICcnO1xuICB2YXIgY2hyO1xuICBmb3IgKDsgaW5kZXggPD0gbGVuZ3RoOyBpbmRleCsrKSB7XG4gICAgY2hyID0gY2hhckF0KHN0cmluZywgaW5kZXgpO1xuICAgIGlmIChjaHIgPT09ICdcXFxcJykge1xuICAgICAgY2hyICs9IGNoYXJBdChzdHJpbmcsICsraW5kZXgpO1xuICAgIH0gZWxzZSBpZiAoY2hyID09PSAnXScpIHtcbiAgICAgIGJyYWNrZXRzID0gZmFsc2U7XG4gICAgfSBlbHNlIGlmICghYnJhY2tldHMpIHN3aXRjaCAodHJ1ZSkge1xuICAgICAgY2FzZSBjaHIgPT09ICdbJzpcbiAgICAgICAgYnJhY2tldHMgPSB0cnVlO1xuICAgICAgICBicmVhaztcbiAgICAgIGNhc2UgY2hyID09PSAnKCc6XG4gICAgICAgIGlmIChleGVjKElTX05DRywgc3RyaW5nU2xpY2Uoc3RyaW5nLCBpbmRleCArIDEpKSkge1xuICAgICAgICAgIGluZGV4ICs9IDI7XG4gICAgICAgICAgbmNnID0gdHJ1ZTtcbiAgICAgICAgfVxuICAgICAgICByZXN1bHQgKz0gY2hyO1xuICAgICAgICBncm91cGlkKys7XG4gICAgICAgIGNvbnRpbnVlO1xuICAgICAgY2FzZSBjaHIgPT09ICc+JyAmJiBuY2c6XG4gICAgICAgIGlmIChncm91cG5hbWUgPT09ICcnIHx8IGhhc093bihuYW1lcywgZ3JvdXBuYW1lKSkge1xuICAgICAgICAgIHRocm93IG5ldyBTeW50YXhFcnJvcignSW52YWxpZCBjYXB0dXJlIGdyb3VwIG5hbWUnKTtcbiAgICAgICAgfVxuICAgICAgICBuYW1lc1tncm91cG5hbWVdID0gdHJ1ZTtcbiAgICAgICAgbmFtZWRbbmFtZWQubGVuZ3RoXSA9IFtncm91cG5hbWUsIGdyb3VwaWRdO1xuICAgICAgICBuY2cgPSBmYWxzZTtcbiAgICAgICAgZ3JvdXBuYW1lID0gJyc7XG4gICAgICAgIGNvbnRpbnVlO1xuICAgIH1cbiAgICBpZiAobmNnKSBncm91cG5hbWUgKz0gY2hyO1xuICAgIGVsc2UgcmVzdWx0ICs9IGNocjtcbiAgfSByZXR1cm4gW3Jlc3VsdCwgbmFtZWRdO1xufTtcblxuLy8gYFJlZ0V4cGAgY29uc3RydWN0b3Jcbi8vIGh0dHBzOi8vdGMzOS5lcy9lY21hMjYyLyNzZWMtcmVnZXhwLWNvbnN0cnVjdG9yXG5pZiAoaXNGb3JjZWQoJ1JlZ0V4cCcsIEJBU0VfRk9SQ0VEKSkge1xuICB2YXIgUmVnRXhwV3JhcHBlciA9IGZ1bmN0aW9uIFJlZ0V4cChwYXR0ZXJuLCBmbGFncykge1xuICAgIHZhciB0aGlzSXNSZWdFeHAgPSBpc1Byb3RvdHlwZU9mKFJlZ0V4cFByb3RvdHlwZSwgdGhpcyk7XG4gICAgdmFyIHBhdHRlcm5Jc1JlZ0V4cCA9IGlzUmVnRXhwKHBhdHRlcm4pO1xuICAgIHZhciBmbGFnc0FyZVVuZGVmaW5lZCA9IGZsYWdzID09PSB1bmRlZmluZWQ7XG4gICAgdmFyIGdyb3VwcyA9IFtdO1xuICAgIHZhciByYXdQYXR0ZXJuID0gcGF0dGVybjtcbiAgICB2YXIgcmF3RmxhZ3MsIGRvdEFsbCwgc3RpY2t5LCBoYW5kbGVkLCByZXN1bHQsIHN0YXRlO1xuXG4gICAgaWYgKCF0aGlzSXNSZWdFeHAgJiYgcGF0dGVybklzUmVnRXhwICYmIGZsYWdzQXJlVW5kZWZpbmVkICYmIHBhdHRlcm4uY29uc3RydWN0b3IgPT09IFJlZ0V4cFdyYXBwZXIpIHtcbiAgICAgIHJldHVybiBwYXR0ZXJuO1xuICAgIH1cblxuICAgIGlmIChwYXR0ZXJuSXNSZWdFeHAgfHwgaXNQcm90b3R5cGVPZihSZWdFeHBQcm90b3R5cGUsIHBhdHRlcm4pKSB7XG4gICAgICBwYXR0ZXJuID0gcGF0dGVybi5zb3VyY2U7XG4gICAgICBpZiAoZmxhZ3NBcmVVbmRlZmluZWQpIGZsYWdzID0gZ2V0UmVnRXhwRmxhZ3MocmF3UGF0dGVybik7XG4gICAgfVxuXG4gICAgcGF0dGVybiA9IHBhdHRlcm4gPT09IHVuZGVmaW5lZCA/ICcnIDogdG9TdHJpbmcocGF0dGVybik7XG4gICAgZmxhZ3MgPSBmbGFncyA9PT0gdW5kZWZpbmVkID8gJycgOiB0b1N0cmluZyhmbGFncyk7XG4gICAgcmF3UGF0dGVybiA9IHBhdHRlcm47XG5cbiAgICBpZiAoVU5TVVBQT1JURURfRE9UX0FMTCAmJiAnZG90QWxsJyBpbiByZTEpIHtcbiAgICAgIGRvdEFsbCA9ICEhZmxhZ3MgJiYgc3RyaW5nSW5kZXhPZihmbGFncywgJ3MnKSA+IC0xO1xuICAgICAgaWYgKGRvdEFsbCkgZmxhZ3MgPSByZXBsYWNlKGZsYWdzLCAvcy9nLCAnJyk7XG4gICAgfVxuXG4gICAgcmF3RmxhZ3MgPSBmbGFncztcblxuICAgIGlmIChNSVNTRURfU1RJQ0tZICYmICdzdGlja3knIGluIHJlMSkge1xuICAgICAgc3RpY2t5ID0gISFmbGFncyAmJiBzdHJpbmdJbmRleE9mKGZsYWdzLCAneScpID4gLTE7XG4gICAgICBpZiAoc3RpY2t5ICYmIFVOU1VQUE9SVEVEX1kpIGZsYWdzID0gcmVwbGFjZShmbGFncywgL3kvZywgJycpO1xuICAgIH1cblxuICAgIGlmIChVTlNVUFBPUlRFRF9OQ0cpIHtcbiAgICAgIGhhbmRsZWQgPSBoYW5kbGVOQ0cocGF0dGVybik7XG4gICAgICBwYXR0ZXJuID0gaGFuZGxlZFswXTtcbiAgICAgIGdyb3VwcyA9IGhhbmRsZWRbMV07XG4gICAgfVxuXG4gICAgcmVzdWx0ID0gaW5oZXJpdElmUmVxdWlyZWQoTmF0aXZlUmVnRXhwKHBhdHRlcm4sIGZsYWdzKSwgdGhpc0lzUmVnRXhwID8gdGhpcyA6IFJlZ0V4cFByb3RvdHlwZSwgUmVnRXhwV3JhcHBlcik7XG5cbiAgICBpZiAoZG90QWxsIHx8IHN0aWNreSB8fCBncm91cHMubGVuZ3RoKSB7XG4gICAgICBzdGF0ZSA9IGVuZm9yY2VJbnRlcm5hbFN0YXRlKHJlc3VsdCk7XG4gICAgICBpZiAoZG90QWxsKSB7XG4gICAgICAgIHN0YXRlLmRvdEFsbCA9IHRydWU7XG4gICAgICAgIHN0YXRlLnJhdyA9IFJlZ0V4cFdyYXBwZXIoaGFuZGxlRG90QWxsKHBhdHRlcm4pLCByYXdGbGFncyk7XG4gICAgICB9XG4gICAgICBpZiAoc3RpY2t5KSBzdGF0ZS5zdGlja3kgPSB0cnVlO1xuICAgICAgaWYgKGdyb3Vwcy5sZW5ndGgpIHN0YXRlLmdyb3VwcyA9IGdyb3VwcztcbiAgICB9XG5cbiAgICBpZiAocGF0dGVybiAhPT0gcmF3UGF0dGVybikgdHJ5IHtcbiAgICAgIC8vIGZhaWxzIGluIG9sZCBlbmdpbmVzLCBidXQgd2UgaGF2ZSBubyBhbHRlcm5hdGl2ZXMgZm9yIHVuc3VwcG9ydGVkIHJlZ2V4IHN5bnRheFxuICAgICAgY3JlYXRlTm9uRW51bWVyYWJsZVByb3BlcnR5KHJlc3VsdCwgJ3NvdXJjZScsIHJhd1BhdHRlcm4gPT09ICcnID8gJyg/OiknIDogcmF3UGF0dGVybik7XG4gICAgfSBjYXRjaCAoZXJyb3IpIHsgLyogZW1wdHkgKi8gfVxuXG4gICAgcmV0dXJuIHJlc3VsdDtcbiAgfTtcblxuICBmb3IgKHZhciBrZXlzID0gZ2V0T3duUHJvcGVydHlOYW1lcyhOYXRpdmVSZWdFeHApLCBpbmRleCA9IDA7IGtleXMubGVuZ3RoID4gaW5kZXg7KSB7XG4gICAgcHJveHlBY2Nlc3NvcihSZWdFeHBXcmFwcGVyLCBOYXRpdmVSZWdFeHAsIGtleXNbaW5kZXgrK10pO1xuICB9XG5cbiAgUmVnRXhwUHJvdG90eXBlLmNvbnN0cnVjdG9yID0gUmVnRXhwV3JhcHBlcjtcbiAgUmVnRXhwV3JhcHBlci5wcm90b3R5cGUgPSBSZWdFeHBQcm90b3R5cGU7XG4gIGRlZmluZUJ1aWx0SW4oZ2xvYmFsLCAnUmVnRXhwJywgUmVnRXhwV3JhcHBlciwgeyBjb25zdHJ1Y3RvcjogdHJ1ZSB9KTtcbn1cblxuLy8gaHR0cHM6Ly90YzM5LmVzL2VjbWEyNjIvI3NlYy1nZXQtcmVnZXhwLUBAc3BlY2llc1xuc2V0U3BlY2llcygnUmVnRXhwJyk7XG4iLCIndXNlIHN0cmljdCc7XG52YXIgJCA9IHJlcXVpcmUoJy4uL2ludGVybmFscy9leHBvcnQnKTtcbnZhciBleGVjID0gcmVxdWlyZSgnLi4vaW50ZXJuYWxzL3JlZ2V4cC1leGVjJyk7XG5cbi8vIGBSZWdFeHAucHJvdG90eXBlLmV4ZWNgIG1ldGhvZFxuLy8gaHR0cHM6Ly90YzM5LmVzL2VjbWEyNjIvI3NlYy1yZWdleHAucHJvdG90eXBlLmV4ZWNcbiQoeyB0YXJnZXQ6ICdSZWdFeHAnLCBwcm90bzogdHJ1ZSwgZm9yY2VkOiAvLi8uZXhlYyAhPT0gZXhlYyB9LCB7XG4gIGV4ZWM6IGV4ZWNcbn0pO1xuIiwiJ3VzZSBzdHJpY3QnO1xudmFyIGNoYXJBdCA9IHJlcXVpcmUoJy4uL2ludGVybmFscy9zdHJpbmctbXVsdGlieXRlJykuY2hhckF0O1xudmFyIHRvU3RyaW5nID0gcmVxdWlyZSgnLi4vaW50ZXJuYWxzL3RvLXN0cmluZycpO1xudmFyIEludGVybmFsU3RhdGVNb2R1bGUgPSByZXF1aXJlKCcuLi9pbnRlcm5hbHMvaW50ZXJuYWwtc3RhdGUnKTtcbnZhciBkZWZpbmVJdGVyYXRvciA9IHJlcXVpcmUoJy4uL2ludGVybmFscy9pdGVyYXRvci1kZWZpbmUnKTtcbnZhciBjcmVhdGVJdGVyUmVzdWx0T2JqZWN0ID0gcmVxdWlyZSgnLi4vaW50ZXJuYWxzL2NyZWF0ZS1pdGVyLXJlc3VsdC1vYmplY3QnKTtcblxudmFyIFNUUklOR19JVEVSQVRPUiA9ICdTdHJpbmcgSXRlcmF0b3InO1xudmFyIHNldEludGVybmFsU3RhdGUgPSBJbnRlcm5hbFN0YXRlTW9kdWxlLnNldDtcbnZhciBnZXRJbnRlcm5hbFN0YXRlID0gSW50ZXJuYWxTdGF0ZU1vZHVsZS5nZXR0ZXJGb3IoU1RSSU5HX0lURVJBVE9SKTtcblxuLy8gYFN0cmluZy5wcm90b3R5cGVbQEBpdGVyYXRvcl1gIG1ldGhvZFxuLy8gaHR0cHM6Ly90YzM5LmVzL2VjbWEyNjIvI3NlYy1zdHJpbmcucHJvdG90eXBlLUBAaXRlcmF0b3JcbmRlZmluZUl0ZXJhdG9yKFN0cmluZywgJ1N0cmluZycsIGZ1bmN0aW9uIChpdGVyYXRlZCkge1xuICBzZXRJbnRlcm5hbFN0YXRlKHRoaXMsIHtcbiAgICB0eXBlOiBTVFJJTkdfSVRFUkFUT1IsXG4gICAgc3RyaW5nOiB0b1N0cmluZyhpdGVyYXRlZCksXG4gICAgaW5kZXg6IDBcbiAgfSk7XG4vLyBgJVN0cmluZ0l0ZXJhdG9yUHJvdG90eXBlJS5uZXh0YCBtZXRob2Rcbi8vIGh0dHBzOi8vdGMzOS5lcy9lY21hMjYyLyNzZWMtJXN0cmluZ2l0ZXJhdG9ycHJvdG90eXBlJS5uZXh0XG59LCBmdW5jdGlvbiBuZXh0KCkge1xuICB2YXIgc3RhdGUgPSBnZXRJbnRlcm5hbFN0YXRlKHRoaXMpO1xuICB2YXIgc3RyaW5nID0gc3RhdGUuc3RyaW5nO1xuICB2YXIgaW5kZXggPSBzdGF0ZS5pbmRleDtcbiAgdmFyIHBvaW50O1xuICBpZiAoaW5kZXggPj0gc3RyaW5nLmxlbmd0aCkgcmV0dXJuIGNyZWF0ZUl0ZXJSZXN1bHRPYmplY3QodW5kZWZpbmVkLCB0cnVlKTtcbiAgcG9pbnQgPSBjaGFyQXQoc3RyaW5nLCBpbmRleCk7XG4gIHN0YXRlLmluZGV4ICs9IHBvaW50Lmxlbmd0aDtcbiAgcmV0dXJuIGNyZWF0ZUl0ZXJSZXN1bHRPYmplY3QocG9pbnQsIGZhbHNlKTtcbn0pO1xuIiwiJ3VzZSBzdHJpY3QnO1xuLyogZXNsaW50LWRpc2FibGUgZXMvbm8tc3RyaW5nLXByb3RvdHlwZS1tYXRjaGFsbCAtLSBzYWZlICovXG52YXIgJCA9IHJlcXVpcmUoJy4uL2ludGVybmFscy9leHBvcnQnKTtcbnZhciBjYWxsID0gcmVxdWlyZSgnLi4vaW50ZXJuYWxzL2Z1bmN0aW9uLWNhbGwnKTtcbnZhciB1bmN1cnJ5VGhpcyA9IHJlcXVpcmUoJy4uL2ludGVybmFscy9mdW5jdGlvbi11bmN1cnJ5LXRoaXMtY2xhdXNlJyk7XG52YXIgY3JlYXRlSXRlcmF0b3JDb25zdHJ1Y3RvciA9IHJlcXVpcmUoJy4uL2ludGVybmFscy9pdGVyYXRvci1jcmVhdGUtY29uc3RydWN0b3InKTtcbnZhciBjcmVhdGVJdGVyUmVzdWx0T2JqZWN0ID0gcmVxdWlyZSgnLi4vaW50ZXJuYWxzL2NyZWF0ZS1pdGVyLXJlc3VsdC1vYmplY3QnKTtcbnZhciByZXF1aXJlT2JqZWN0Q29lcmNpYmxlID0gcmVxdWlyZSgnLi4vaW50ZXJuYWxzL3JlcXVpcmUtb2JqZWN0LWNvZXJjaWJsZScpO1xudmFyIHRvTGVuZ3RoID0gcmVxdWlyZSgnLi4vaW50ZXJuYWxzL3RvLWxlbmd0aCcpO1xudmFyIHRvU3RyaW5nID0gcmVxdWlyZSgnLi4vaW50ZXJuYWxzL3RvLXN0cmluZycpO1xudmFyIGFuT2JqZWN0ID0gcmVxdWlyZSgnLi4vaW50ZXJuYWxzL2FuLW9iamVjdCcpO1xudmFyIGlzTnVsbE9yVW5kZWZpbmVkID0gcmVxdWlyZSgnLi4vaW50ZXJuYWxzL2lzLW51bGwtb3ItdW5kZWZpbmVkJyk7XG52YXIgY2xhc3NvZiA9IHJlcXVpcmUoJy4uL2ludGVybmFscy9jbGFzc29mLXJhdycpO1xudmFyIGlzUmVnRXhwID0gcmVxdWlyZSgnLi4vaW50ZXJuYWxzL2lzLXJlZ2V4cCcpO1xudmFyIGdldFJlZ0V4cEZsYWdzID0gcmVxdWlyZSgnLi4vaW50ZXJuYWxzL3JlZ2V4cC1nZXQtZmxhZ3MnKTtcbnZhciBnZXRNZXRob2QgPSByZXF1aXJlKCcuLi9pbnRlcm5hbHMvZ2V0LW1ldGhvZCcpO1xudmFyIGRlZmluZUJ1aWx0SW4gPSByZXF1aXJlKCcuLi9pbnRlcm5hbHMvZGVmaW5lLWJ1aWx0LWluJyk7XG52YXIgZmFpbHMgPSByZXF1aXJlKCcuLi9pbnRlcm5hbHMvZmFpbHMnKTtcbnZhciB3ZWxsS25vd25TeW1ib2wgPSByZXF1aXJlKCcuLi9pbnRlcm5hbHMvd2VsbC1rbm93bi1zeW1ib2wnKTtcbnZhciBzcGVjaWVzQ29uc3RydWN0b3IgPSByZXF1aXJlKCcuLi9pbnRlcm5hbHMvc3BlY2llcy1jb25zdHJ1Y3RvcicpO1xudmFyIGFkdmFuY2VTdHJpbmdJbmRleCA9IHJlcXVpcmUoJy4uL2ludGVybmFscy9hZHZhbmNlLXN0cmluZy1pbmRleCcpO1xudmFyIHJlZ0V4cEV4ZWMgPSByZXF1aXJlKCcuLi9pbnRlcm5hbHMvcmVnZXhwLWV4ZWMtYWJzdHJhY3QnKTtcbnZhciBJbnRlcm5hbFN0YXRlTW9kdWxlID0gcmVxdWlyZSgnLi4vaW50ZXJuYWxzL2ludGVybmFsLXN0YXRlJyk7XG52YXIgSVNfUFVSRSA9IHJlcXVpcmUoJy4uL2ludGVybmFscy9pcy1wdXJlJyk7XG5cbnZhciBNQVRDSF9BTEwgPSB3ZWxsS25vd25TeW1ib2woJ21hdGNoQWxsJyk7XG52YXIgUkVHRVhQX1NUUklORyA9ICdSZWdFeHAgU3RyaW5nJztcbnZhciBSRUdFWFBfU1RSSU5HX0lURVJBVE9SID0gUkVHRVhQX1NUUklORyArICcgSXRlcmF0b3InO1xudmFyIHNldEludGVybmFsU3RhdGUgPSBJbnRlcm5hbFN0YXRlTW9kdWxlLnNldDtcbnZhciBnZXRJbnRlcm5hbFN0YXRlID0gSW50ZXJuYWxTdGF0ZU1vZHVsZS5nZXR0ZXJGb3IoUkVHRVhQX1NUUklOR19JVEVSQVRPUik7XG52YXIgUmVnRXhwUHJvdG90eXBlID0gUmVnRXhwLnByb3RvdHlwZTtcbnZhciAkVHlwZUVycm9yID0gVHlwZUVycm9yO1xudmFyIHN0cmluZ0luZGV4T2YgPSB1bmN1cnJ5VGhpcygnJy5pbmRleE9mKTtcbnZhciBuYXRpdmVNYXRjaEFsbCA9IHVuY3VycnlUaGlzKCcnLm1hdGNoQWxsKTtcblxudmFyIFdPUktTX1dJVEhfTk9OX0dMT0JBTF9SRUdFWCA9ICEhbmF0aXZlTWF0Y2hBbGwgJiYgIWZhaWxzKGZ1bmN0aW9uICgpIHtcbiAgbmF0aXZlTWF0Y2hBbGwoJ2EnLCAvLi8pO1xufSk7XG5cbnZhciAkUmVnRXhwU3RyaW5nSXRlcmF0b3IgPSBjcmVhdGVJdGVyYXRvckNvbnN0cnVjdG9yKGZ1bmN0aW9uIFJlZ0V4cFN0cmluZ0l0ZXJhdG9yKHJlZ2V4cCwgc3RyaW5nLCAkZ2xvYmFsLCBmdWxsVW5pY29kZSkge1xuICBzZXRJbnRlcm5hbFN0YXRlKHRoaXMsIHtcbiAgICB0eXBlOiBSRUdFWFBfU1RSSU5HX0lURVJBVE9SLFxuICAgIHJlZ2V4cDogcmVnZXhwLFxuICAgIHN0cmluZzogc3RyaW5nLFxuICAgIGdsb2JhbDogJGdsb2JhbCxcbiAgICB1bmljb2RlOiBmdWxsVW5pY29kZSxcbiAgICBkb25lOiBmYWxzZVxuICB9KTtcbn0sIFJFR0VYUF9TVFJJTkcsIGZ1bmN0aW9uIG5leHQoKSB7XG4gIHZhciBzdGF0ZSA9IGdldEludGVybmFsU3RhdGUodGhpcyk7XG4gIGlmIChzdGF0ZS5kb25lKSByZXR1cm4gY3JlYXRlSXRlclJlc3VsdE9iamVjdCh1bmRlZmluZWQsIHRydWUpO1xuICB2YXIgUiA9IHN0YXRlLnJlZ2V4cDtcbiAgdmFyIFMgPSBzdGF0ZS5zdHJpbmc7XG4gIHZhciBtYXRjaCA9IHJlZ0V4cEV4ZWMoUiwgUyk7XG4gIGlmIChtYXRjaCA9PT0gbnVsbCkge1xuICAgIHN0YXRlLmRvbmUgPSB0cnVlO1xuICAgIHJldHVybiBjcmVhdGVJdGVyUmVzdWx0T2JqZWN0KHVuZGVmaW5lZCwgdHJ1ZSk7XG4gIH1cbiAgaWYgKHN0YXRlLmdsb2JhbCkge1xuICAgIGlmICh0b1N0cmluZyhtYXRjaFswXSkgPT09ICcnKSBSLmxhc3RJbmRleCA9IGFkdmFuY2VTdHJpbmdJbmRleChTLCB0b0xlbmd0aChSLmxhc3RJbmRleCksIHN0YXRlLnVuaWNvZGUpO1xuICAgIHJldHVybiBjcmVhdGVJdGVyUmVzdWx0T2JqZWN0KG1hdGNoLCBmYWxzZSk7XG4gIH1cbiAgc3RhdGUuZG9uZSA9IHRydWU7XG4gIHJldHVybiBjcmVhdGVJdGVyUmVzdWx0T2JqZWN0KG1hdGNoLCBmYWxzZSk7XG59KTtcblxudmFyICRtYXRjaEFsbCA9IGZ1bmN0aW9uIChzdHJpbmcpIHtcbiAgdmFyIFIgPSBhbk9iamVjdCh0aGlzKTtcbiAgdmFyIFMgPSB0b1N0cmluZyhzdHJpbmcpO1xuICB2YXIgQyA9IHNwZWNpZXNDb25zdHJ1Y3RvcihSLCBSZWdFeHApO1xuICB2YXIgZmxhZ3MgPSB0b1N0cmluZyhnZXRSZWdFeHBGbGFncyhSKSk7XG4gIHZhciBtYXRjaGVyLCAkZ2xvYmFsLCBmdWxsVW5pY29kZTtcbiAgbWF0Y2hlciA9IG5ldyBDKEMgPT09IFJlZ0V4cCA/IFIuc291cmNlIDogUiwgZmxhZ3MpO1xuICAkZ2xvYmFsID0gISF+c3RyaW5nSW5kZXhPZihmbGFncywgJ2cnKTtcbiAgZnVsbFVuaWNvZGUgPSAhIX5zdHJpbmdJbmRleE9mKGZsYWdzLCAndScpO1xuICBtYXRjaGVyLmxhc3RJbmRleCA9IHRvTGVuZ3RoKFIubGFzdEluZGV4KTtcbiAgcmV0dXJuIG5ldyAkUmVnRXhwU3RyaW5nSXRlcmF0b3IobWF0Y2hlciwgUywgJGdsb2JhbCwgZnVsbFVuaWNvZGUpO1xufTtcblxuLy8gYFN0cmluZy5wcm90b3R5cGUubWF0Y2hBbGxgIG1ldGhvZFxuLy8gaHR0cHM6Ly90YzM5LmVzL2VjbWEyNjIvI3NlYy1zdHJpbmcucHJvdG90eXBlLm1hdGNoYWxsXG4kKHsgdGFyZ2V0OiAnU3RyaW5nJywgcHJvdG86IHRydWUsIGZvcmNlZDogV09SS1NfV0lUSF9OT05fR0xPQkFMX1JFR0VYIH0sIHtcbiAgbWF0Y2hBbGw6IGZ1bmN0aW9uIG1hdGNoQWxsKHJlZ2V4cCkge1xuICAgIHZhciBPID0gcmVxdWlyZU9iamVjdENvZXJjaWJsZSh0aGlzKTtcbiAgICB2YXIgZmxhZ3MsIFMsIG1hdGNoZXIsIHJ4O1xuICAgIGlmICghaXNOdWxsT3JVbmRlZmluZWQocmVnZXhwKSkge1xuICAgICAgaWYgKGlzUmVnRXhwKHJlZ2V4cCkpIHtcbiAgICAgICAgZmxhZ3MgPSB0b1N0cmluZyhyZXF1aXJlT2JqZWN0Q29lcmNpYmxlKGdldFJlZ0V4cEZsYWdzKHJlZ2V4cCkpKTtcbiAgICAgICAgaWYgKCF+c3RyaW5nSW5kZXhPZihmbGFncywgJ2cnKSkgdGhyb3cgbmV3ICRUeXBlRXJyb3IoJ2AubWF0Y2hBbGxgIGRvZXMgbm90IGFsbG93IG5vbi1nbG9iYWwgcmVnZXhlcycpO1xuICAgICAgfVxuICAgICAgaWYgKFdPUktTX1dJVEhfTk9OX0dMT0JBTF9SRUdFWCkgcmV0dXJuIG5hdGl2ZU1hdGNoQWxsKE8sIHJlZ2V4cCk7XG4gICAgICBtYXRjaGVyID0gZ2V0TWV0aG9kKHJlZ2V4cCwgTUFUQ0hfQUxMKTtcbiAgICAgIGlmIChtYXRjaGVyID09PSB1bmRlZmluZWQgJiYgSVNfUFVSRSAmJiBjbGFzc29mKHJlZ2V4cCkgPT09ICdSZWdFeHAnKSBtYXRjaGVyID0gJG1hdGNoQWxsO1xuICAgICAgaWYgKG1hdGNoZXIpIHJldHVybiBjYWxsKG1hdGNoZXIsIHJlZ2V4cCwgTyk7XG4gICAgfSBlbHNlIGlmIChXT1JLU19XSVRIX05PTl9HTE9CQUxfUkVHRVgpIHJldHVybiBuYXRpdmVNYXRjaEFsbChPLCByZWdleHApO1xuICAgIFMgPSB0b1N0cmluZyhPKTtcbiAgICByeCA9IG5ldyBSZWdFeHAocmVnZXhwLCAnZycpO1xuICAgIHJldHVybiBJU19QVVJFID8gY2FsbCgkbWF0Y2hBbGwsIHJ4LCBTKSA6IHJ4W01BVENIX0FMTF0oUyk7XG4gIH1cbn0pO1xuXG5JU19QVVJFIHx8IE1BVENIX0FMTCBpbiBSZWdFeHBQcm90b3R5cGUgfHwgZGVmaW5lQnVpbHRJbihSZWdFeHBQcm90b3R5cGUsIE1BVENIX0FMTCwgJG1hdGNoQWxsKTtcbiIsIid1c2Ugc3RyaWN0JztcbnZhciAkID0gcmVxdWlyZSgnLi4vaW50ZXJuYWxzL2V4cG9ydCcpO1xudmFyIGNhbGwgPSByZXF1aXJlKCcuLi9pbnRlcm5hbHMvZnVuY3Rpb24tY2FsbCcpO1xudmFyIHVuY3VycnlUaGlzID0gcmVxdWlyZSgnLi4vaW50ZXJuYWxzL2Z1bmN0aW9uLXVuY3VycnktdGhpcycpO1xudmFyIHJlcXVpcmVPYmplY3RDb2VyY2libGUgPSByZXF1aXJlKCcuLi9pbnRlcm5hbHMvcmVxdWlyZS1vYmplY3QtY29lcmNpYmxlJyk7XG52YXIgaXNDYWxsYWJsZSA9IHJlcXVpcmUoJy4uL2ludGVybmFscy9pcy1jYWxsYWJsZScpO1xudmFyIGlzTnVsbE9yVW5kZWZpbmVkID0gcmVxdWlyZSgnLi4vaW50ZXJuYWxzL2lzLW51bGwtb3ItdW5kZWZpbmVkJyk7XG52YXIgaXNSZWdFeHAgPSByZXF1aXJlKCcuLi9pbnRlcm5hbHMvaXMtcmVnZXhwJyk7XG52YXIgdG9TdHJpbmcgPSByZXF1aXJlKCcuLi9pbnRlcm5hbHMvdG8tc3RyaW5nJyk7XG52YXIgZ2V0TWV0aG9kID0gcmVxdWlyZSgnLi4vaW50ZXJuYWxzL2dldC1tZXRob2QnKTtcbnZhciBnZXRSZWdFeHBGbGFncyA9IHJlcXVpcmUoJy4uL2ludGVybmFscy9yZWdleHAtZ2V0LWZsYWdzJyk7XG52YXIgZ2V0U3Vic3RpdHV0aW9uID0gcmVxdWlyZSgnLi4vaW50ZXJuYWxzL2dldC1zdWJzdGl0dXRpb24nKTtcbnZhciB3ZWxsS25vd25TeW1ib2wgPSByZXF1aXJlKCcuLi9pbnRlcm5hbHMvd2VsbC1rbm93bi1zeW1ib2wnKTtcbnZhciBJU19QVVJFID0gcmVxdWlyZSgnLi4vaW50ZXJuYWxzL2lzLXB1cmUnKTtcblxudmFyIFJFUExBQ0UgPSB3ZWxsS25vd25TeW1ib2woJ3JlcGxhY2UnKTtcbnZhciAkVHlwZUVycm9yID0gVHlwZUVycm9yO1xudmFyIGluZGV4T2YgPSB1bmN1cnJ5VGhpcygnJy5pbmRleE9mKTtcbnZhciByZXBsYWNlID0gdW5jdXJyeVRoaXMoJycucmVwbGFjZSk7XG52YXIgc3RyaW5nU2xpY2UgPSB1bmN1cnJ5VGhpcygnJy5zbGljZSk7XG52YXIgbWF4ID0gTWF0aC5tYXg7XG5cbi8vIGBTdHJpbmcucHJvdG90eXBlLnJlcGxhY2VBbGxgIG1ldGhvZFxuLy8gaHR0cHM6Ly90YzM5LmVzL2VjbWEyNjIvI3NlYy1zdHJpbmcucHJvdG90eXBlLnJlcGxhY2VhbGxcbiQoeyB0YXJnZXQ6ICdTdHJpbmcnLCBwcm90bzogdHJ1ZSB9LCB7XG4gIHJlcGxhY2VBbGw6IGZ1bmN0aW9uIHJlcGxhY2VBbGwoc2VhcmNoVmFsdWUsIHJlcGxhY2VWYWx1ZSkge1xuICAgIHZhciBPID0gcmVxdWlyZU9iamVjdENvZXJjaWJsZSh0aGlzKTtcbiAgICB2YXIgSVNfUkVHX0VYUCwgZmxhZ3MsIHJlcGxhY2VyLCBzdHJpbmcsIHNlYXJjaFN0cmluZywgZnVuY3Rpb25hbFJlcGxhY2UsIHNlYXJjaExlbmd0aCwgYWR2YW5jZUJ5LCByZXBsYWNlbWVudDtcbiAgICB2YXIgcG9zaXRpb24gPSAwO1xuICAgIHZhciBlbmRPZkxhc3RNYXRjaCA9IDA7XG4gICAgdmFyIHJlc3VsdCA9ICcnO1xuICAgIGlmICghaXNOdWxsT3JVbmRlZmluZWQoc2VhcmNoVmFsdWUpKSB7XG4gICAgICBJU19SRUdfRVhQID0gaXNSZWdFeHAoc2VhcmNoVmFsdWUpO1xuICAgICAgaWYgKElTX1JFR19FWFApIHtcbiAgICAgICAgZmxhZ3MgPSB0b1N0cmluZyhyZXF1aXJlT2JqZWN0Q29lcmNpYmxlKGdldFJlZ0V4cEZsYWdzKHNlYXJjaFZhbHVlKSkpO1xuICAgICAgICBpZiAoIX5pbmRleE9mKGZsYWdzLCAnZycpKSB0aHJvdyBuZXcgJFR5cGVFcnJvcignYC5yZXBsYWNlQWxsYCBkb2VzIG5vdCBhbGxvdyBub24tZ2xvYmFsIHJlZ2V4ZXMnKTtcbiAgICAgIH1cbiAgICAgIHJlcGxhY2VyID0gZ2V0TWV0aG9kKHNlYXJjaFZhbHVlLCBSRVBMQUNFKTtcbiAgICAgIGlmIChyZXBsYWNlcikge1xuICAgICAgICByZXR1cm4gY2FsbChyZXBsYWNlciwgc2VhcmNoVmFsdWUsIE8sIHJlcGxhY2VWYWx1ZSk7XG4gICAgICB9IGVsc2UgaWYgKElTX1BVUkUgJiYgSVNfUkVHX0VYUCkge1xuICAgICAgICByZXR1cm4gcmVwbGFjZSh0b1N0cmluZyhPKSwgc2VhcmNoVmFsdWUsIHJlcGxhY2VWYWx1ZSk7XG4gICAgICB9XG4gICAgfVxuICAgIHN0cmluZyA9IHRvU3RyaW5nKE8pO1xuICAgIHNlYXJjaFN0cmluZyA9IHRvU3RyaW5nKHNlYXJjaFZhbHVlKTtcbiAgICBmdW5jdGlvbmFsUmVwbGFjZSA9IGlzQ2FsbGFibGUocmVwbGFjZVZhbHVlKTtcbiAgICBpZiAoIWZ1bmN0aW9uYWxSZXBsYWNlKSByZXBsYWNlVmFsdWUgPSB0b1N0cmluZyhyZXBsYWNlVmFsdWUpO1xuICAgIHNlYXJjaExlbmd0aCA9IHNlYXJjaFN0cmluZy5sZW5ndGg7XG4gICAgYWR2YW5jZUJ5ID0gbWF4KDEsIHNlYXJjaExlbmd0aCk7XG4gICAgcG9zaXRpb24gPSBpbmRleE9mKHN0cmluZywgc2VhcmNoU3RyaW5nKTtcbiAgICB3aGlsZSAocG9zaXRpb24gIT09IC0xKSB7XG4gICAgICByZXBsYWNlbWVudCA9IGZ1bmN0aW9uYWxSZXBsYWNlXG4gICAgICAgID8gdG9TdHJpbmcocmVwbGFjZVZhbHVlKHNlYXJjaFN0cmluZywgcG9zaXRpb24sIHN0cmluZykpXG4gICAgICAgIDogZ2V0U3Vic3RpdHV0aW9uKHNlYXJjaFN0cmluZywgc3RyaW5nLCBwb3NpdGlvbiwgW10sIHVuZGVmaW5lZCwgcmVwbGFjZVZhbHVlKTtcbiAgICAgIHJlc3VsdCArPSBzdHJpbmdTbGljZShzdHJpbmcsIGVuZE9mTGFzdE1hdGNoLCBwb3NpdGlvbikgKyByZXBsYWNlbWVudDtcbiAgICAgIGVuZE9mTGFzdE1hdGNoID0gcG9zaXRpb24gKyBzZWFyY2hMZW5ndGg7XG4gICAgICBwb3NpdGlvbiA9IHBvc2l0aW9uICsgYWR2YW5jZUJ5ID4gc3RyaW5nLmxlbmd0aCA/IC0xIDogaW5kZXhPZihzdHJpbmcsIHNlYXJjaFN0cmluZywgcG9zaXRpb24gKyBhZHZhbmNlQnkpO1xuICAgIH1cbiAgICBpZiAoZW5kT2ZMYXN0TWF0Y2ggPCBzdHJpbmcubGVuZ3RoKSB7XG4gICAgICByZXN1bHQgKz0gc3RyaW5nU2xpY2Uoc3RyaW5nLCBlbmRPZkxhc3RNYXRjaCk7XG4gICAgfVxuICAgIHJldHVybiByZXN1bHQ7XG4gIH1cbn0pO1xuIiwiJ3VzZSBzdHJpY3QnO1xudmFyIGFwcGx5ID0gcmVxdWlyZSgnLi4vaW50ZXJuYWxzL2Z1bmN0aW9uLWFwcGx5Jyk7XG52YXIgY2FsbCA9IHJlcXVpcmUoJy4uL2ludGVybmFscy9mdW5jdGlvbi1jYWxsJyk7XG52YXIgdW5jdXJyeVRoaXMgPSByZXF1aXJlKCcuLi9pbnRlcm5hbHMvZnVuY3Rpb24tdW5jdXJyeS10aGlzJyk7XG52YXIgZml4UmVnRXhwV2VsbEtub3duU3ltYm9sTG9naWMgPSByZXF1aXJlKCcuLi9pbnRlcm5hbHMvZml4LXJlZ2V4cC13ZWxsLWtub3duLXN5bWJvbC1sb2dpYycpO1xudmFyIGZhaWxzID0gcmVxdWlyZSgnLi4vaW50ZXJuYWxzL2ZhaWxzJyk7XG52YXIgYW5PYmplY3QgPSByZXF1aXJlKCcuLi9pbnRlcm5hbHMvYW4tb2JqZWN0Jyk7XG52YXIgaXNDYWxsYWJsZSA9IHJlcXVpcmUoJy4uL2ludGVybmFscy9pcy1jYWxsYWJsZScpO1xudmFyIGlzTnVsbE9yVW5kZWZpbmVkID0gcmVxdWlyZSgnLi4vaW50ZXJuYWxzL2lzLW51bGwtb3ItdW5kZWZpbmVkJyk7XG52YXIgdG9JbnRlZ2VyT3JJbmZpbml0eSA9IHJlcXVpcmUoJy4uL2ludGVybmFscy90by1pbnRlZ2VyLW9yLWluZmluaXR5Jyk7XG52YXIgdG9MZW5ndGggPSByZXF1aXJlKCcuLi9pbnRlcm5hbHMvdG8tbGVuZ3RoJyk7XG52YXIgdG9TdHJpbmcgPSByZXF1aXJlKCcuLi9pbnRlcm5hbHMvdG8tc3RyaW5nJyk7XG52YXIgcmVxdWlyZU9iamVjdENvZXJjaWJsZSA9IHJlcXVpcmUoJy4uL2ludGVybmFscy9yZXF1aXJlLW9iamVjdC1jb2VyY2libGUnKTtcbnZhciBhZHZhbmNlU3RyaW5nSW5kZXggPSByZXF1aXJlKCcuLi9pbnRlcm5hbHMvYWR2YW5jZS1zdHJpbmctaW5kZXgnKTtcbnZhciBnZXRNZXRob2QgPSByZXF1aXJlKCcuLi9pbnRlcm5hbHMvZ2V0LW1ldGhvZCcpO1xudmFyIGdldFN1YnN0aXR1dGlvbiA9IHJlcXVpcmUoJy4uL2ludGVybmFscy9nZXQtc3Vic3RpdHV0aW9uJyk7XG52YXIgcmVnRXhwRXhlYyA9IHJlcXVpcmUoJy4uL2ludGVybmFscy9yZWdleHAtZXhlYy1hYnN0cmFjdCcpO1xudmFyIHdlbGxLbm93blN5bWJvbCA9IHJlcXVpcmUoJy4uL2ludGVybmFscy93ZWxsLWtub3duLXN5bWJvbCcpO1xuXG52YXIgUkVQTEFDRSA9IHdlbGxLbm93blN5bWJvbCgncmVwbGFjZScpO1xudmFyIG1heCA9IE1hdGgubWF4O1xudmFyIG1pbiA9IE1hdGgubWluO1xudmFyIGNvbmNhdCA9IHVuY3VycnlUaGlzKFtdLmNvbmNhdCk7XG52YXIgcHVzaCA9IHVuY3VycnlUaGlzKFtdLnB1c2gpO1xudmFyIHN0cmluZ0luZGV4T2YgPSB1bmN1cnJ5VGhpcygnJy5pbmRleE9mKTtcbnZhciBzdHJpbmdTbGljZSA9IHVuY3VycnlUaGlzKCcnLnNsaWNlKTtcblxudmFyIG1heWJlVG9TdHJpbmcgPSBmdW5jdGlvbiAoaXQpIHtcbiAgcmV0dXJuIGl0ID09PSB1bmRlZmluZWQgPyBpdCA6IFN0cmluZyhpdCk7XG59O1xuXG4vLyBJRSA8PSAxMSByZXBsYWNlcyAkMCB3aXRoIHRoZSB3aG9sZSBtYXRjaCwgYXMgaWYgaXQgd2FzICQmXG4vLyBodHRwczovL3N0YWNrb3ZlcmZsb3cuY29tL3F1ZXN0aW9ucy82MDI0NjY2L2dldHRpbmctaWUtdG8tcmVwbGFjZS1hLXJlZ2V4LXdpdGgtdGhlLWxpdGVyYWwtc3RyaW5nLTBcbnZhciBSRVBMQUNFX0tFRVBTXyQwID0gKGZ1bmN0aW9uICgpIHtcbiAgLy8gZXNsaW50LWRpc2FibGUtbmV4dC1saW5lIHJlZ2V4cC9wcmVmZXItZXNjYXBlLXJlcGxhY2VtZW50LWRvbGxhci1jaGFyIC0tIHJlcXVpcmVkIGZvciB0ZXN0aW5nXG4gIHJldHVybiAnYScucmVwbGFjZSgvLi8sICckMCcpID09PSAnJDAnO1xufSkoKTtcblxuLy8gU2FmYXJpIDw9IDEzLjAuMyg/KSBzdWJzdGl0dXRlcyBudGggY2FwdHVyZSB3aGVyZSBuPm0gd2l0aCBhbiBlbXB0eSBzdHJpbmdcbnZhciBSRUdFWFBfUkVQTEFDRV9TVUJTVElUVVRFU19VTkRFRklORURfQ0FQVFVSRSA9IChmdW5jdGlvbiAoKSB7XG4gIGlmICgvLi9bUkVQTEFDRV0pIHtcbiAgICByZXR1cm4gLy4vW1JFUExBQ0VdKCdhJywgJyQwJykgPT09ICcnO1xuICB9XG4gIHJldHVybiBmYWxzZTtcbn0pKCk7XG5cbnZhciBSRVBMQUNFX1NVUFBPUlRTX05BTUVEX0dST1VQUyA9ICFmYWlscyhmdW5jdGlvbiAoKSB7XG4gIHZhciByZSA9IC8uLztcbiAgcmUuZXhlYyA9IGZ1bmN0aW9uICgpIHtcbiAgICB2YXIgcmVzdWx0ID0gW107XG4gICAgcmVzdWx0Lmdyb3VwcyA9IHsgYTogJzcnIH07XG4gICAgcmV0dXJuIHJlc3VsdDtcbiAgfTtcbiAgLy8gZXNsaW50LWRpc2FibGUtbmV4dC1saW5lIHJlZ2V4cC9uby11c2VsZXNzLWRvbGxhci1yZXBsYWNlbWVudHMgLS0gZmFsc2UgcG9zaXRpdmVcbiAgcmV0dXJuICcnLnJlcGxhY2UocmUsICckPGE+JykgIT09ICc3Jztcbn0pO1xuXG4vLyBAQHJlcGxhY2UgbG9naWNcbmZpeFJlZ0V4cFdlbGxLbm93blN5bWJvbExvZ2ljKCdyZXBsYWNlJywgZnVuY3Rpb24gKF8sIG5hdGl2ZVJlcGxhY2UsIG1heWJlQ2FsbE5hdGl2ZSkge1xuICB2YXIgVU5TQUZFX1NVQlNUSVRVVEUgPSBSRUdFWFBfUkVQTEFDRV9TVUJTVElUVVRFU19VTkRFRklORURfQ0FQVFVSRSA/ICckJyA6ICckMCc7XG5cbiAgcmV0dXJuIFtcbiAgICAvLyBgU3RyaW5nLnByb3RvdHlwZS5yZXBsYWNlYCBtZXRob2RcbiAgICAvLyBodHRwczovL3RjMzkuZXMvZWNtYTI2Mi8jc2VjLXN0cmluZy5wcm90b3R5cGUucmVwbGFjZVxuICAgIGZ1bmN0aW9uIHJlcGxhY2Uoc2VhcmNoVmFsdWUsIHJlcGxhY2VWYWx1ZSkge1xuICAgICAgdmFyIE8gPSByZXF1aXJlT2JqZWN0Q29lcmNpYmxlKHRoaXMpO1xuICAgICAgdmFyIHJlcGxhY2VyID0gaXNOdWxsT3JVbmRlZmluZWQoc2VhcmNoVmFsdWUpID8gdW5kZWZpbmVkIDogZ2V0TWV0aG9kKHNlYXJjaFZhbHVlLCBSRVBMQUNFKTtcbiAgICAgIHJldHVybiByZXBsYWNlclxuICAgICAgICA/IGNhbGwocmVwbGFjZXIsIHNlYXJjaFZhbHVlLCBPLCByZXBsYWNlVmFsdWUpXG4gICAgICAgIDogY2FsbChuYXRpdmVSZXBsYWNlLCB0b1N0cmluZyhPKSwgc2VhcmNoVmFsdWUsIHJlcGxhY2VWYWx1ZSk7XG4gICAgfSxcbiAgICAvLyBgUmVnRXhwLnByb3RvdHlwZVtAQHJlcGxhY2VdYCBtZXRob2RcbiAgICAvLyBodHRwczovL3RjMzkuZXMvZWNtYTI2Mi8jc2VjLXJlZ2V4cC5wcm90b3R5cGUtQEByZXBsYWNlXG4gICAgZnVuY3Rpb24gKHN0cmluZywgcmVwbGFjZVZhbHVlKSB7XG4gICAgICB2YXIgcnggPSBhbk9iamVjdCh0aGlzKTtcbiAgICAgIHZhciBTID0gdG9TdHJpbmcoc3RyaW5nKTtcblxuICAgICAgaWYgKFxuICAgICAgICB0eXBlb2YgcmVwbGFjZVZhbHVlID09ICdzdHJpbmcnICYmXG4gICAgICAgIHN0cmluZ0luZGV4T2YocmVwbGFjZVZhbHVlLCBVTlNBRkVfU1VCU1RJVFVURSkgPT09IC0xICYmXG4gICAgICAgIHN0cmluZ0luZGV4T2YocmVwbGFjZVZhbHVlLCAnJDwnKSA9PT0gLTFcbiAgICAgICkge1xuICAgICAgICB2YXIgcmVzID0gbWF5YmVDYWxsTmF0aXZlKG5hdGl2ZVJlcGxhY2UsIHJ4LCBTLCByZXBsYWNlVmFsdWUpO1xuICAgICAgICBpZiAocmVzLmRvbmUpIHJldHVybiByZXMudmFsdWU7XG4gICAgICB9XG5cbiAgICAgIHZhciBmdW5jdGlvbmFsUmVwbGFjZSA9IGlzQ2FsbGFibGUocmVwbGFjZVZhbHVlKTtcbiAgICAgIGlmICghZnVuY3Rpb25hbFJlcGxhY2UpIHJlcGxhY2VWYWx1ZSA9IHRvU3RyaW5nKHJlcGxhY2VWYWx1ZSk7XG5cbiAgICAgIHZhciBnbG9iYWwgPSByeC5nbG9iYWw7XG4gICAgICB2YXIgZnVsbFVuaWNvZGU7XG4gICAgICBpZiAoZ2xvYmFsKSB7XG4gICAgICAgIGZ1bGxVbmljb2RlID0gcngudW5pY29kZTtcbiAgICAgICAgcngubGFzdEluZGV4ID0gMDtcbiAgICAgIH1cblxuICAgICAgdmFyIHJlc3VsdHMgPSBbXTtcbiAgICAgIHZhciByZXN1bHQ7XG4gICAgICB3aGlsZSAodHJ1ZSkge1xuICAgICAgICByZXN1bHQgPSByZWdFeHBFeGVjKHJ4LCBTKTtcbiAgICAgICAgaWYgKHJlc3VsdCA9PT0gbnVsbCkgYnJlYWs7XG5cbiAgICAgICAgcHVzaChyZXN1bHRzLCByZXN1bHQpO1xuICAgICAgICBpZiAoIWdsb2JhbCkgYnJlYWs7XG5cbiAgICAgICAgdmFyIG1hdGNoU3RyID0gdG9TdHJpbmcocmVzdWx0WzBdKTtcbiAgICAgICAgaWYgKG1hdGNoU3RyID09PSAnJykgcngubGFzdEluZGV4ID0gYWR2YW5jZVN0cmluZ0luZGV4KFMsIHRvTGVuZ3RoKHJ4Lmxhc3RJbmRleCksIGZ1bGxVbmljb2RlKTtcbiAgICAgIH1cblxuICAgICAgdmFyIGFjY3VtdWxhdGVkUmVzdWx0ID0gJyc7XG4gICAgICB2YXIgbmV4dFNvdXJjZVBvc2l0aW9uID0gMDtcbiAgICAgIGZvciAodmFyIGkgPSAwOyBpIDwgcmVzdWx0cy5sZW5ndGg7IGkrKykge1xuICAgICAgICByZXN1bHQgPSByZXN1bHRzW2ldO1xuXG4gICAgICAgIHZhciBtYXRjaGVkID0gdG9TdHJpbmcocmVzdWx0WzBdKTtcbiAgICAgICAgdmFyIHBvc2l0aW9uID0gbWF4KG1pbih0b0ludGVnZXJPckluZmluaXR5KHJlc3VsdC5pbmRleCksIFMubGVuZ3RoKSwgMCk7XG4gICAgICAgIHZhciBjYXB0dXJlcyA9IFtdO1xuICAgICAgICB2YXIgcmVwbGFjZW1lbnQ7XG4gICAgICAgIC8vIE5PVEU6IFRoaXMgaXMgZXF1aXZhbGVudCB0b1xuICAgICAgICAvLyAgIGNhcHR1cmVzID0gcmVzdWx0LnNsaWNlKDEpLm1hcChtYXliZVRvU3RyaW5nKVxuICAgICAgICAvLyBidXQgZm9yIHNvbWUgcmVhc29uIGBuYXRpdmVTbGljZS5jYWxsKHJlc3VsdCwgMSwgcmVzdWx0Lmxlbmd0aClgIChjYWxsZWQgaW5cbiAgICAgICAgLy8gdGhlIHNsaWNlIHBvbHlmaWxsIHdoZW4gc2xpY2luZyBuYXRpdmUgYXJyYXlzKSBcImRvZXNuJ3Qgd29ya1wiIGluIHNhZmFyaSA5IGFuZFxuICAgICAgICAvLyBjYXVzZXMgYSBjcmFzaCAoaHR0cHM6Ly9wYXN0ZWJpbi5jb20vTjIxUXplUUEpIHdoZW4gdHJ5aW5nIHRvIGRlYnVnIGl0LlxuICAgICAgICBmb3IgKHZhciBqID0gMTsgaiA8IHJlc3VsdC5sZW5ndGg7IGorKykgcHVzaChjYXB0dXJlcywgbWF5YmVUb1N0cmluZyhyZXN1bHRbal0pKTtcbiAgICAgICAgdmFyIG5hbWVkQ2FwdHVyZXMgPSByZXN1bHQuZ3JvdXBzO1xuICAgICAgICBpZiAoZnVuY3Rpb25hbFJlcGxhY2UpIHtcbiAgICAgICAgICB2YXIgcmVwbGFjZXJBcmdzID0gY29uY2F0KFttYXRjaGVkXSwgY2FwdHVyZXMsIHBvc2l0aW9uLCBTKTtcbiAgICAgICAgICBpZiAobmFtZWRDYXB0dXJlcyAhPT0gdW5kZWZpbmVkKSBwdXNoKHJlcGxhY2VyQXJncywgbmFtZWRDYXB0dXJlcyk7XG4gICAgICAgICAgcmVwbGFjZW1lbnQgPSB0b1N0cmluZyhhcHBseShyZXBsYWNlVmFsdWUsIHVuZGVmaW5lZCwgcmVwbGFjZXJBcmdzKSk7XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgcmVwbGFjZW1lbnQgPSBnZXRTdWJzdGl0dXRpb24obWF0Y2hlZCwgUywgcG9zaXRpb24sIGNhcHR1cmVzLCBuYW1lZENhcHR1cmVzLCByZXBsYWNlVmFsdWUpO1xuICAgICAgICB9XG4gICAgICAgIGlmIChwb3NpdGlvbiA+PSBuZXh0U291cmNlUG9zaXRpb24pIHtcbiAgICAgICAgICBhY2N1bXVsYXRlZFJlc3VsdCArPSBzdHJpbmdTbGljZShTLCBuZXh0U291cmNlUG9zaXRpb24sIHBvc2l0aW9uKSArIHJlcGxhY2VtZW50O1xuICAgICAgICAgIG5leHRTb3VyY2VQb3NpdGlvbiA9IHBvc2l0aW9uICsgbWF0Y2hlZC5sZW5ndGg7XG4gICAgICAgIH1cbiAgICAgIH1cblxuICAgICAgcmV0dXJuIGFjY3VtdWxhdGVkUmVzdWx0ICsgc3RyaW5nU2xpY2UoUywgbmV4dFNvdXJjZVBvc2l0aW9uKTtcbiAgICB9XG4gIF07XG59LCAhUkVQTEFDRV9TVVBQT1JUU19OQU1FRF9HUk9VUFMgfHwgIVJFUExBQ0VfS0VFUFNfJDAgfHwgUkVHRVhQX1JFUExBQ0VfU1VCU1RJVFVURVNfVU5ERUZJTkVEX0NBUFRVUkUpO1xuIiwiJ3VzZSBzdHJpY3QnO1xuLy8gVE9ETzogUmVtb3ZlIGZyb20gYGNvcmUtanNANGBcbnJlcXVpcmUoJy4uL21vZHVsZXMvZXMuc3RyaW5nLm1hdGNoLWFsbCcpO1xuIiwiJ3VzZSBzdHJpY3QnO1xuLy8gVE9ETzogUmVtb3ZlIGZyb20gYGNvcmUtanNANGBcbnJlcXVpcmUoJy4uL21vZHVsZXMvZXMuc3RyaW5nLnJlcGxhY2UtYWxsJyk7XG4iLCIndXNlIHN0cmljdCc7XG4vLyBUT0RPOiBpbiBjb3JlLWpzQDQsIG1vdmUgL21vZHVsZXMvIGRlcGVuZGVuY2llcyB0byBwdWJsaWMgZW50cmllcyBmb3IgYmV0dGVyIG9wdGltaXphdGlvbiBieSB0b29scyBsaWtlIGBwcmVzZXQtZW52YFxucmVxdWlyZSgnLi4vbW9kdWxlcy9lcy5hcnJheS5pdGVyYXRvcicpO1xudmFyICQgPSByZXF1aXJlKCcuLi9pbnRlcm5hbHMvZXhwb3J0Jyk7XG52YXIgZ2xvYmFsID0gcmVxdWlyZSgnLi4vaW50ZXJuYWxzL2dsb2JhbCcpO1xudmFyIHNhZmVHZXRCdWlsdEluID0gcmVxdWlyZSgnLi4vaW50ZXJuYWxzL3NhZmUtZ2V0LWJ1aWx0LWluJyk7XG52YXIgY2FsbCA9IHJlcXVpcmUoJy4uL2ludGVybmFscy9mdW5jdGlvbi1jYWxsJyk7XG52YXIgdW5jdXJyeVRoaXMgPSByZXF1aXJlKCcuLi9pbnRlcm5hbHMvZnVuY3Rpb24tdW5jdXJyeS10aGlzJyk7XG52YXIgREVTQ1JJUFRPUlMgPSByZXF1aXJlKCcuLi9pbnRlcm5hbHMvZGVzY3JpcHRvcnMnKTtcbnZhciBVU0VfTkFUSVZFX1VSTCA9IHJlcXVpcmUoJy4uL2ludGVybmFscy91cmwtY29uc3RydWN0b3ItZGV0ZWN0aW9uJyk7XG52YXIgZGVmaW5lQnVpbHRJbiA9IHJlcXVpcmUoJy4uL2ludGVybmFscy9kZWZpbmUtYnVpbHQtaW4nKTtcbnZhciBkZWZpbmVCdWlsdEluQWNjZXNzb3IgPSByZXF1aXJlKCcuLi9pbnRlcm5hbHMvZGVmaW5lLWJ1aWx0LWluLWFjY2Vzc29yJyk7XG52YXIgZGVmaW5lQnVpbHRJbnMgPSByZXF1aXJlKCcuLi9pbnRlcm5hbHMvZGVmaW5lLWJ1aWx0LWlucycpO1xudmFyIHNldFRvU3RyaW5nVGFnID0gcmVxdWlyZSgnLi4vaW50ZXJuYWxzL3NldC10by1zdHJpbmctdGFnJyk7XG52YXIgY3JlYXRlSXRlcmF0b3JDb25zdHJ1Y3RvciA9IHJlcXVpcmUoJy4uL2ludGVybmFscy9pdGVyYXRvci1jcmVhdGUtY29uc3RydWN0b3InKTtcbnZhciBJbnRlcm5hbFN0YXRlTW9kdWxlID0gcmVxdWlyZSgnLi4vaW50ZXJuYWxzL2ludGVybmFsLXN0YXRlJyk7XG52YXIgYW5JbnN0YW5jZSA9IHJlcXVpcmUoJy4uL2ludGVybmFscy9hbi1pbnN0YW5jZScpO1xudmFyIGlzQ2FsbGFibGUgPSByZXF1aXJlKCcuLi9pbnRlcm5hbHMvaXMtY2FsbGFibGUnKTtcbnZhciBoYXNPd24gPSByZXF1aXJlKCcuLi9pbnRlcm5hbHMvaGFzLW93bi1wcm9wZXJ0eScpO1xudmFyIGJpbmQgPSByZXF1aXJlKCcuLi9pbnRlcm5hbHMvZnVuY3Rpb24tYmluZC1jb250ZXh0Jyk7XG52YXIgY2xhc3NvZiA9IHJlcXVpcmUoJy4uL2ludGVybmFscy9jbGFzc29mJyk7XG52YXIgYW5PYmplY3QgPSByZXF1aXJlKCcuLi9pbnRlcm5hbHMvYW4tb2JqZWN0Jyk7XG52YXIgaXNPYmplY3QgPSByZXF1aXJlKCcuLi9pbnRlcm5hbHMvaXMtb2JqZWN0Jyk7XG52YXIgJHRvU3RyaW5nID0gcmVxdWlyZSgnLi4vaW50ZXJuYWxzL3RvLXN0cmluZycpO1xudmFyIGNyZWF0ZSA9IHJlcXVpcmUoJy4uL2ludGVybmFscy9vYmplY3QtY3JlYXRlJyk7XG52YXIgY3JlYXRlUHJvcGVydHlEZXNjcmlwdG9yID0gcmVxdWlyZSgnLi4vaW50ZXJuYWxzL2NyZWF0ZS1wcm9wZXJ0eS1kZXNjcmlwdG9yJyk7XG52YXIgZ2V0SXRlcmF0b3IgPSByZXF1aXJlKCcuLi9pbnRlcm5hbHMvZ2V0LWl0ZXJhdG9yJyk7XG52YXIgZ2V0SXRlcmF0b3JNZXRob2QgPSByZXF1aXJlKCcuLi9pbnRlcm5hbHMvZ2V0LWl0ZXJhdG9yLW1ldGhvZCcpO1xudmFyIGNyZWF0ZUl0ZXJSZXN1bHRPYmplY3QgPSByZXF1aXJlKCcuLi9pbnRlcm5hbHMvY3JlYXRlLWl0ZXItcmVzdWx0LW9iamVjdCcpO1xudmFyIHZhbGlkYXRlQXJndW1lbnRzTGVuZ3RoID0gcmVxdWlyZSgnLi4vaW50ZXJuYWxzL3ZhbGlkYXRlLWFyZ3VtZW50cy1sZW5ndGgnKTtcbnZhciB3ZWxsS25vd25TeW1ib2wgPSByZXF1aXJlKCcuLi9pbnRlcm5hbHMvd2VsbC1rbm93bi1zeW1ib2wnKTtcbnZhciBhcnJheVNvcnQgPSByZXF1aXJlKCcuLi9pbnRlcm5hbHMvYXJyYXktc29ydCcpO1xuXG52YXIgSVRFUkFUT1IgPSB3ZWxsS25vd25TeW1ib2woJ2l0ZXJhdG9yJyk7XG52YXIgVVJMX1NFQVJDSF9QQVJBTVMgPSAnVVJMU2VhcmNoUGFyYW1zJztcbnZhciBVUkxfU0VBUkNIX1BBUkFNU19JVEVSQVRPUiA9IFVSTF9TRUFSQ0hfUEFSQU1TICsgJ0l0ZXJhdG9yJztcbnZhciBzZXRJbnRlcm5hbFN0YXRlID0gSW50ZXJuYWxTdGF0ZU1vZHVsZS5zZXQ7XG52YXIgZ2V0SW50ZXJuYWxQYXJhbXNTdGF0ZSA9IEludGVybmFsU3RhdGVNb2R1bGUuZ2V0dGVyRm9yKFVSTF9TRUFSQ0hfUEFSQU1TKTtcbnZhciBnZXRJbnRlcm5hbEl0ZXJhdG9yU3RhdGUgPSBJbnRlcm5hbFN0YXRlTW9kdWxlLmdldHRlckZvcihVUkxfU0VBUkNIX1BBUkFNU19JVEVSQVRPUik7XG5cbnZhciBuYXRpdmVGZXRjaCA9IHNhZmVHZXRCdWlsdEluKCdmZXRjaCcpO1xudmFyIE5hdGl2ZVJlcXVlc3QgPSBzYWZlR2V0QnVpbHRJbignUmVxdWVzdCcpO1xudmFyIEhlYWRlcnMgPSBzYWZlR2V0QnVpbHRJbignSGVhZGVycycpO1xudmFyIFJlcXVlc3RQcm90b3R5cGUgPSBOYXRpdmVSZXF1ZXN0ICYmIE5hdGl2ZVJlcXVlc3QucHJvdG90eXBlO1xudmFyIEhlYWRlcnNQcm90b3R5cGUgPSBIZWFkZXJzICYmIEhlYWRlcnMucHJvdG90eXBlO1xudmFyIFJlZ0V4cCA9IGdsb2JhbC5SZWdFeHA7XG52YXIgVHlwZUVycm9yID0gZ2xvYmFsLlR5cGVFcnJvcjtcbnZhciBkZWNvZGVVUklDb21wb25lbnQgPSBnbG9iYWwuZGVjb2RlVVJJQ29tcG9uZW50O1xudmFyIGVuY29kZVVSSUNvbXBvbmVudCA9IGdsb2JhbC5lbmNvZGVVUklDb21wb25lbnQ7XG52YXIgY2hhckF0ID0gdW5jdXJyeVRoaXMoJycuY2hhckF0KTtcbnZhciBqb2luID0gdW5jdXJyeVRoaXMoW10uam9pbik7XG52YXIgcHVzaCA9IHVuY3VycnlUaGlzKFtdLnB1c2gpO1xudmFyIHJlcGxhY2UgPSB1bmN1cnJ5VGhpcygnJy5yZXBsYWNlKTtcbnZhciBzaGlmdCA9IHVuY3VycnlUaGlzKFtdLnNoaWZ0KTtcbnZhciBzcGxpY2UgPSB1bmN1cnJ5VGhpcyhbXS5zcGxpY2UpO1xudmFyIHNwbGl0ID0gdW5jdXJyeVRoaXMoJycuc3BsaXQpO1xudmFyIHN0cmluZ1NsaWNlID0gdW5jdXJyeVRoaXMoJycuc2xpY2UpO1xuXG52YXIgcGx1cyA9IC9cXCsvZztcbnZhciBzZXF1ZW5jZXMgPSBBcnJheSg0KTtcblxudmFyIHBlcmNlbnRTZXF1ZW5jZSA9IGZ1bmN0aW9uIChieXRlcykge1xuICByZXR1cm4gc2VxdWVuY2VzW2J5dGVzIC0gMV0gfHwgKHNlcXVlbmNlc1tieXRlcyAtIDFdID0gUmVnRXhwKCcoKD86JVtcXFxcZGEtZl17Mn0peycgKyBieXRlcyArICd9KScsICdnaScpKTtcbn07XG5cbnZhciBwZXJjZW50RGVjb2RlID0gZnVuY3Rpb24gKHNlcXVlbmNlKSB7XG4gIHRyeSB7XG4gICAgcmV0dXJuIGRlY29kZVVSSUNvbXBvbmVudChzZXF1ZW5jZSk7XG4gIH0gY2F0Y2ggKGVycm9yKSB7XG4gICAgcmV0dXJuIHNlcXVlbmNlO1xuICB9XG59O1xuXG52YXIgZGVzZXJpYWxpemUgPSBmdW5jdGlvbiAoaXQpIHtcbiAgdmFyIHJlc3VsdCA9IHJlcGxhY2UoaXQsIHBsdXMsICcgJyk7XG4gIHZhciBieXRlcyA9IDQ7XG4gIHRyeSB7XG4gICAgcmV0dXJuIGRlY29kZVVSSUNvbXBvbmVudChyZXN1bHQpO1xuICB9IGNhdGNoIChlcnJvcikge1xuICAgIHdoaWxlIChieXRlcykge1xuICAgICAgcmVzdWx0ID0gcmVwbGFjZShyZXN1bHQsIHBlcmNlbnRTZXF1ZW5jZShieXRlcy0tKSwgcGVyY2VudERlY29kZSk7XG4gICAgfVxuICAgIHJldHVybiByZXN1bHQ7XG4gIH1cbn07XG5cbnZhciBmaW5kID0gL1shJygpfl18JTIwL2c7XG5cbnZhciByZXBsYWNlbWVudHMgPSB7XG4gICchJzogJyUyMScsXG4gIFwiJ1wiOiAnJTI3JyxcbiAgJygnOiAnJTI4JyxcbiAgJyknOiAnJTI5JyxcbiAgJ34nOiAnJTdFJyxcbiAgJyUyMCc6ICcrJ1xufTtcblxudmFyIHJlcGxhY2VyID0gZnVuY3Rpb24gKG1hdGNoKSB7XG4gIHJldHVybiByZXBsYWNlbWVudHNbbWF0Y2hdO1xufTtcblxudmFyIHNlcmlhbGl6ZSA9IGZ1bmN0aW9uIChpdCkge1xuICByZXR1cm4gcmVwbGFjZShlbmNvZGVVUklDb21wb25lbnQoaXQpLCBmaW5kLCByZXBsYWNlcik7XG59O1xuXG52YXIgVVJMU2VhcmNoUGFyYW1zSXRlcmF0b3IgPSBjcmVhdGVJdGVyYXRvckNvbnN0cnVjdG9yKGZ1bmN0aW9uIEl0ZXJhdG9yKHBhcmFtcywga2luZCkge1xuICBzZXRJbnRlcm5hbFN0YXRlKHRoaXMsIHtcbiAgICB0eXBlOiBVUkxfU0VBUkNIX1BBUkFNU19JVEVSQVRPUixcbiAgICB0YXJnZXQ6IGdldEludGVybmFsUGFyYW1zU3RhdGUocGFyYW1zKS5lbnRyaWVzLFxuICAgIGluZGV4OiAwLFxuICAgIGtpbmQ6IGtpbmRcbiAgfSk7XG59LCBVUkxfU0VBUkNIX1BBUkFNUywgZnVuY3Rpb24gbmV4dCgpIHtcbiAgdmFyIHN0YXRlID0gZ2V0SW50ZXJuYWxJdGVyYXRvclN0YXRlKHRoaXMpO1xuICB2YXIgdGFyZ2V0ID0gc3RhdGUudGFyZ2V0O1xuICB2YXIgaW5kZXggPSBzdGF0ZS5pbmRleCsrO1xuICBpZiAoIXRhcmdldCB8fCBpbmRleCA+PSB0YXJnZXQubGVuZ3RoKSB7XG4gICAgc3RhdGUudGFyZ2V0ID0gdW5kZWZpbmVkO1xuICAgIHJldHVybiBjcmVhdGVJdGVyUmVzdWx0T2JqZWN0KHVuZGVmaW5lZCwgdHJ1ZSk7XG4gIH1cbiAgdmFyIGVudHJ5ID0gdGFyZ2V0W2luZGV4XTtcbiAgc3dpdGNoIChzdGF0ZS5raW5kKSB7XG4gICAgY2FzZSAna2V5cyc6IHJldHVybiBjcmVhdGVJdGVyUmVzdWx0T2JqZWN0KGVudHJ5LmtleSwgZmFsc2UpO1xuICAgIGNhc2UgJ3ZhbHVlcyc6IHJldHVybiBjcmVhdGVJdGVyUmVzdWx0T2JqZWN0KGVudHJ5LnZhbHVlLCBmYWxzZSk7XG4gIH0gcmV0dXJuIGNyZWF0ZUl0ZXJSZXN1bHRPYmplY3QoW2VudHJ5LmtleSwgZW50cnkudmFsdWVdLCBmYWxzZSk7XG59LCB0cnVlKTtcblxudmFyIFVSTFNlYXJjaFBhcmFtc1N0YXRlID0gZnVuY3Rpb24gKGluaXQpIHtcbiAgdGhpcy5lbnRyaWVzID0gW107XG4gIHRoaXMudXJsID0gbnVsbDtcblxuICBpZiAoaW5pdCAhPT0gdW5kZWZpbmVkKSB7XG4gICAgaWYgKGlzT2JqZWN0KGluaXQpKSB0aGlzLnBhcnNlT2JqZWN0KGluaXQpO1xuICAgIGVsc2UgdGhpcy5wYXJzZVF1ZXJ5KHR5cGVvZiBpbml0ID09ICdzdHJpbmcnID8gY2hhckF0KGluaXQsIDApID09PSAnPycgPyBzdHJpbmdTbGljZShpbml0LCAxKSA6IGluaXQgOiAkdG9TdHJpbmcoaW5pdCkpO1xuICB9XG59O1xuXG5VUkxTZWFyY2hQYXJhbXNTdGF0ZS5wcm90b3R5cGUgPSB7XG4gIHR5cGU6IFVSTF9TRUFSQ0hfUEFSQU1TLFxuICBiaW5kVVJMOiBmdW5jdGlvbiAodXJsKSB7XG4gICAgdGhpcy51cmwgPSB1cmw7XG4gICAgdGhpcy51cGRhdGUoKTtcbiAgfSxcbiAgcGFyc2VPYmplY3Q6IGZ1bmN0aW9uIChvYmplY3QpIHtcbiAgICB2YXIgZW50cmllcyA9IHRoaXMuZW50cmllcztcbiAgICB2YXIgaXRlcmF0b3JNZXRob2QgPSBnZXRJdGVyYXRvck1ldGhvZChvYmplY3QpO1xuICAgIHZhciBpdGVyYXRvciwgbmV4dCwgc3RlcCwgZW50cnlJdGVyYXRvciwgZW50cnlOZXh0LCBmaXJzdCwgc2Vjb25kO1xuXG4gICAgaWYgKGl0ZXJhdG9yTWV0aG9kKSB7XG4gICAgICBpdGVyYXRvciA9IGdldEl0ZXJhdG9yKG9iamVjdCwgaXRlcmF0b3JNZXRob2QpO1xuICAgICAgbmV4dCA9IGl0ZXJhdG9yLm5leHQ7XG4gICAgICB3aGlsZSAoIShzdGVwID0gY2FsbChuZXh0LCBpdGVyYXRvcikpLmRvbmUpIHtcbiAgICAgICAgZW50cnlJdGVyYXRvciA9IGdldEl0ZXJhdG9yKGFuT2JqZWN0KHN0ZXAudmFsdWUpKTtcbiAgICAgICAgZW50cnlOZXh0ID0gZW50cnlJdGVyYXRvci5uZXh0O1xuICAgICAgICBpZiAoXG4gICAgICAgICAgKGZpcnN0ID0gY2FsbChlbnRyeU5leHQsIGVudHJ5SXRlcmF0b3IpKS5kb25lIHx8XG4gICAgICAgICAgKHNlY29uZCA9IGNhbGwoZW50cnlOZXh0LCBlbnRyeUl0ZXJhdG9yKSkuZG9uZSB8fFxuICAgICAgICAgICFjYWxsKGVudHJ5TmV4dCwgZW50cnlJdGVyYXRvcikuZG9uZVxuICAgICAgICApIHRocm93IG5ldyBUeXBlRXJyb3IoJ0V4cGVjdGVkIHNlcXVlbmNlIHdpdGggbGVuZ3RoIDInKTtcbiAgICAgICAgcHVzaChlbnRyaWVzLCB7IGtleTogJHRvU3RyaW5nKGZpcnN0LnZhbHVlKSwgdmFsdWU6ICR0b1N0cmluZyhzZWNvbmQudmFsdWUpIH0pO1xuICAgICAgfVxuICAgIH0gZWxzZSBmb3IgKHZhciBrZXkgaW4gb2JqZWN0KSBpZiAoaGFzT3duKG9iamVjdCwga2V5KSkge1xuICAgICAgcHVzaChlbnRyaWVzLCB7IGtleToga2V5LCB2YWx1ZTogJHRvU3RyaW5nKG9iamVjdFtrZXldKSB9KTtcbiAgICB9XG4gIH0sXG4gIHBhcnNlUXVlcnk6IGZ1bmN0aW9uIChxdWVyeSkge1xuICAgIGlmIChxdWVyeSkge1xuICAgICAgdmFyIGVudHJpZXMgPSB0aGlzLmVudHJpZXM7XG4gICAgICB2YXIgYXR0cmlidXRlcyA9IHNwbGl0KHF1ZXJ5LCAnJicpO1xuICAgICAgdmFyIGluZGV4ID0gMDtcbiAgICAgIHZhciBhdHRyaWJ1dGUsIGVudHJ5O1xuICAgICAgd2hpbGUgKGluZGV4IDwgYXR0cmlidXRlcy5sZW5ndGgpIHtcbiAgICAgICAgYXR0cmlidXRlID0gYXR0cmlidXRlc1tpbmRleCsrXTtcbiAgICAgICAgaWYgKGF0dHJpYnV0ZS5sZW5ndGgpIHtcbiAgICAgICAgICBlbnRyeSA9IHNwbGl0KGF0dHJpYnV0ZSwgJz0nKTtcbiAgICAgICAgICBwdXNoKGVudHJpZXMsIHtcbiAgICAgICAgICAgIGtleTogZGVzZXJpYWxpemUoc2hpZnQoZW50cnkpKSxcbiAgICAgICAgICAgIHZhbHVlOiBkZXNlcmlhbGl6ZShqb2luKGVudHJ5LCAnPScpKVxuICAgICAgICAgIH0pO1xuICAgICAgICB9XG4gICAgICB9XG4gICAgfVxuICB9LFxuICBzZXJpYWxpemU6IGZ1bmN0aW9uICgpIHtcbiAgICB2YXIgZW50cmllcyA9IHRoaXMuZW50cmllcztcbiAgICB2YXIgcmVzdWx0ID0gW107XG4gICAgdmFyIGluZGV4ID0gMDtcbiAgICB2YXIgZW50cnk7XG4gICAgd2hpbGUgKGluZGV4IDwgZW50cmllcy5sZW5ndGgpIHtcbiAgICAgIGVudHJ5ID0gZW50cmllc1tpbmRleCsrXTtcbiAgICAgIHB1c2gocmVzdWx0LCBzZXJpYWxpemUoZW50cnkua2V5KSArICc9JyArIHNlcmlhbGl6ZShlbnRyeS52YWx1ZSkpO1xuICAgIH0gcmV0dXJuIGpvaW4ocmVzdWx0LCAnJicpO1xuICB9LFxuICB1cGRhdGU6IGZ1bmN0aW9uICgpIHtcbiAgICB0aGlzLmVudHJpZXMubGVuZ3RoID0gMDtcbiAgICB0aGlzLnBhcnNlUXVlcnkodGhpcy51cmwucXVlcnkpO1xuICB9LFxuICB1cGRhdGVVUkw6IGZ1bmN0aW9uICgpIHtcbiAgICBpZiAodGhpcy51cmwpIHRoaXMudXJsLnVwZGF0ZSgpO1xuICB9XG59O1xuXG4vLyBgVVJMU2VhcmNoUGFyYW1zYCBjb25zdHJ1Y3RvclxuLy8gaHR0cHM6Ly91cmwuc3BlYy53aGF0d2cub3JnLyNpbnRlcmZhY2UtdXJsc2VhcmNocGFyYW1zXG52YXIgVVJMU2VhcmNoUGFyYW1zQ29uc3RydWN0b3IgPSBmdW5jdGlvbiBVUkxTZWFyY2hQYXJhbXMoLyogaW5pdCAqLykge1xuICBhbkluc3RhbmNlKHRoaXMsIFVSTFNlYXJjaFBhcmFtc1Byb3RvdHlwZSk7XG4gIHZhciBpbml0ID0gYXJndW1lbnRzLmxlbmd0aCA+IDAgPyBhcmd1bWVudHNbMF0gOiB1bmRlZmluZWQ7XG4gIHZhciBzdGF0ZSA9IHNldEludGVybmFsU3RhdGUodGhpcywgbmV3IFVSTFNlYXJjaFBhcmFtc1N0YXRlKGluaXQpKTtcbiAgaWYgKCFERVNDUklQVE9SUykgdGhpcy5zaXplID0gc3RhdGUuZW50cmllcy5sZW5ndGg7XG59O1xuXG52YXIgVVJMU2VhcmNoUGFyYW1zUHJvdG90eXBlID0gVVJMU2VhcmNoUGFyYW1zQ29uc3RydWN0b3IucHJvdG90eXBlO1xuXG5kZWZpbmVCdWlsdElucyhVUkxTZWFyY2hQYXJhbXNQcm90b3R5cGUsIHtcbiAgLy8gYFVSTFNlYXJjaFBhcmFtcy5wcm90b3R5cGUuYXBwZW5kYCBtZXRob2RcbiAgLy8gaHR0cHM6Ly91cmwuc3BlYy53aGF0d2cub3JnLyNkb20tdXJsc2VhcmNocGFyYW1zLWFwcGVuZFxuICBhcHBlbmQ6IGZ1bmN0aW9uIGFwcGVuZChuYW1lLCB2YWx1ZSkge1xuICAgIHZhciBzdGF0ZSA9IGdldEludGVybmFsUGFyYW1zU3RhdGUodGhpcyk7XG4gICAgdmFsaWRhdGVBcmd1bWVudHNMZW5ndGgoYXJndW1lbnRzLmxlbmd0aCwgMik7XG4gICAgcHVzaChzdGF0ZS5lbnRyaWVzLCB7IGtleTogJHRvU3RyaW5nKG5hbWUpLCB2YWx1ZTogJHRvU3RyaW5nKHZhbHVlKSB9KTtcbiAgICBpZiAoIURFU0NSSVBUT1JTKSB0aGlzLmxlbmd0aCsrO1xuICAgIHN0YXRlLnVwZGF0ZVVSTCgpO1xuICB9LFxuICAvLyBgVVJMU2VhcmNoUGFyYW1zLnByb3RvdHlwZS5kZWxldGVgIG1ldGhvZFxuICAvLyBodHRwczovL3VybC5zcGVjLndoYXR3Zy5vcmcvI2RvbS11cmxzZWFyY2hwYXJhbXMtZGVsZXRlXG4gICdkZWxldGUnOiBmdW5jdGlvbiAobmFtZSAvKiAsIHZhbHVlICovKSB7XG4gICAgdmFyIHN0YXRlID0gZ2V0SW50ZXJuYWxQYXJhbXNTdGF0ZSh0aGlzKTtcbiAgICB2YXIgbGVuZ3RoID0gdmFsaWRhdGVBcmd1bWVudHNMZW5ndGgoYXJndW1lbnRzLmxlbmd0aCwgMSk7XG4gICAgdmFyIGVudHJpZXMgPSBzdGF0ZS5lbnRyaWVzO1xuICAgIHZhciBrZXkgPSAkdG9TdHJpbmcobmFtZSk7XG4gICAgdmFyICR2YWx1ZSA9IGxlbmd0aCA8IDIgPyB1bmRlZmluZWQgOiBhcmd1bWVudHNbMV07XG4gICAgdmFyIHZhbHVlID0gJHZhbHVlID09PSB1bmRlZmluZWQgPyAkdmFsdWUgOiAkdG9TdHJpbmcoJHZhbHVlKTtcbiAgICB2YXIgaW5kZXggPSAwO1xuICAgIHdoaWxlIChpbmRleCA8IGVudHJpZXMubGVuZ3RoKSB7XG4gICAgICB2YXIgZW50cnkgPSBlbnRyaWVzW2luZGV4XTtcbiAgICAgIGlmIChlbnRyeS5rZXkgPT09IGtleSAmJiAodmFsdWUgPT09IHVuZGVmaW5lZCB8fCBlbnRyeS52YWx1ZSA9PT0gdmFsdWUpKSB7XG4gICAgICAgIHNwbGljZShlbnRyaWVzLCBpbmRleCwgMSk7XG4gICAgICAgIGlmICh2YWx1ZSAhPT0gdW5kZWZpbmVkKSBicmVhaztcbiAgICAgIH0gZWxzZSBpbmRleCsrO1xuICAgIH1cbiAgICBpZiAoIURFU0NSSVBUT1JTKSB0aGlzLnNpemUgPSBlbnRyaWVzLmxlbmd0aDtcbiAgICBzdGF0ZS51cGRhdGVVUkwoKTtcbiAgfSxcbiAgLy8gYFVSTFNlYXJjaFBhcmFtcy5wcm90b3R5cGUuZ2V0YCBtZXRob2RcbiAgLy8gaHR0cHM6Ly91cmwuc3BlYy53aGF0d2cub3JnLyNkb20tdXJsc2VhcmNocGFyYW1zLWdldFxuICBnZXQ6IGZ1bmN0aW9uIGdldChuYW1lKSB7XG4gICAgdmFyIGVudHJpZXMgPSBnZXRJbnRlcm5hbFBhcmFtc1N0YXRlKHRoaXMpLmVudHJpZXM7XG4gICAgdmFsaWRhdGVBcmd1bWVudHNMZW5ndGgoYXJndW1lbnRzLmxlbmd0aCwgMSk7XG4gICAgdmFyIGtleSA9ICR0b1N0cmluZyhuYW1lKTtcbiAgICB2YXIgaW5kZXggPSAwO1xuICAgIGZvciAoOyBpbmRleCA8IGVudHJpZXMubGVuZ3RoOyBpbmRleCsrKSB7XG4gICAgICBpZiAoZW50cmllc1tpbmRleF0ua2V5ID09PSBrZXkpIHJldHVybiBlbnRyaWVzW2luZGV4XS52YWx1ZTtcbiAgICB9XG4gICAgcmV0dXJuIG51bGw7XG4gIH0sXG4gIC8vIGBVUkxTZWFyY2hQYXJhbXMucHJvdG90eXBlLmdldEFsbGAgbWV0aG9kXG4gIC8vIGh0dHBzOi8vdXJsLnNwZWMud2hhdHdnLm9yZy8jZG9tLXVybHNlYXJjaHBhcmFtcy1nZXRhbGxcbiAgZ2V0QWxsOiBmdW5jdGlvbiBnZXRBbGwobmFtZSkge1xuICAgIHZhciBlbnRyaWVzID0gZ2V0SW50ZXJuYWxQYXJhbXNTdGF0ZSh0aGlzKS5lbnRyaWVzO1xuICAgIHZhbGlkYXRlQXJndW1lbnRzTGVuZ3RoKGFyZ3VtZW50cy5sZW5ndGgsIDEpO1xuICAgIHZhciBrZXkgPSAkdG9TdHJpbmcobmFtZSk7XG4gICAgdmFyIHJlc3VsdCA9IFtdO1xuICAgIHZhciBpbmRleCA9IDA7XG4gICAgZm9yICg7IGluZGV4IDwgZW50cmllcy5sZW5ndGg7IGluZGV4KyspIHtcbiAgICAgIGlmIChlbnRyaWVzW2luZGV4XS5rZXkgPT09IGtleSkgcHVzaChyZXN1bHQsIGVudHJpZXNbaW5kZXhdLnZhbHVlKTtcbiAgICB9XG4gICAgcmV0dXJuIHJlc3VsdDtcbiAgfSxcbiAgLy8gYFVSTFNlYXJjaFBhcmFtcy5wcm90b3R5cGUuaGFzYCBtZXRob2RcbiAgLy8gaHR0cHM6Ly91cmwuc3BlYy53aGF0d2cub3JnLyNkb20tdXJsc2VhcmNocGFyYW1zLWhhc1xuICBoYXM6IGZ1bmN0aW9uIGhhcyhuYW1lIC8qICwgdmFsdWUgKi8pIHtcbiAgICB2YXIgZW50cmllcyA9IGdldEludGVybmFsUGFyYW1zU3RhdGUodGhpcykuZW50cmllcztcbiAgICB2YXIgbGVuZ3RoID0gdmFsaWRhdGVBcmd1bWVudHNMZW5ndGgoYXJndW1lbnRzLmxlbmd0aCwgMSk7XG4gICAgdmFyIGtleSA9ICR0b1N0cmluZyhuYW1lKTtcbiAgICB2YXIgJHZhbHVlID0gbGVuZ3RoIDwgMiA/IHVuZGVmaW5lZCA6IGFyZ3VtZW50c1sxXTtcbiAgICB2YXIgdmFsdWUgPSAkdmFsdWUgPT09IHVuZGVmaW5lZCA/ICR2YWx1ZSA6ICR0b1N0cmluZygkdmFsdWUpO1xuICAgIHZhciBpbmRleCA9IDA7XG4gICAgd2hpbGUgKGluZGV4IDwgZW50cmllcy5sZW5ndGgpIHtcbiAgICAgIHZhciBlbnRyeSA9IGVudHJpZXNbaW5kZXgrK107XG4gICAgICBpZiAoZW50cnkua2V5ID09PSBrZXkgJiYgKHZhbHVlID09PSB1bmRlZmluZWQgfHwgZW50cnkudmFsdWUgPT09IHZhbHVlKSkgcmV0dXJuIHRydWU7XG4gICAgfVxuICAgIHJldHVybiBmYWxzZTtcbiAgfSxcbiAgLy8gYFVSTFNlYXJjaFBhcmFtcy5wcm90b3R5cGUuc2V0YCBtZXRob2RcbiAgLy8gaHR0cHM6Ly91cmwuc3BlYy53aGF0d2cub3JnLyNkb20tdXJsc2VhcmNocGFyYW1zLXNldFxuICBzZXQ6IGZ1bmN0aW9uIHNldChuYW1lLCB2YWx1ZSkge1xuICAgIHZhciBzdGF0ZSA9IGdldEludGVybmFsUGFyYW1zU3RhdGUodGhpcyk7XG4gICAgdmFsaWRhdGVBcmd1bWVudHNMZW5ndGgoYXJndW1lbnRzLmxlbmd0aCwgMSk7XG4gICAgdmFyIGVudHJpZXMgPSBzdGF0ZS5lbnRyaWVzO1xuICAgIHZhciBmb3VuZCA9IGZhbHNlO1xuICAgIHZhciBrZXkgPSAkdG9TdHJpbmcobmFtZSk7XG4gICAgdmFyIHZhbCA9ICR0b1N0cmluZyh2YWx1ZSk7XG4gICAgdmFyIGluZGV4ID0gMDtcbiAgICB2YXIgZW50cnk7XG4gICAgZm9yICg7IGluZGV4IDwgZW50cmllcy5sZW5ndGg7IGluZGV4KyspIHtcbiAgICAgIGVudHJ5ID0gZW50cmllc1tpbmRleF07XG4gICAgICBpZiAoZW50cnkua2V5ID09PSBrZXkpIHtcbiAgICAgICAgaWYgKGZvdW5kKSBzcGxpY2UoZW50cmllcywgaW5kZXgtLSwgMSk7XG4gICAgICAgIGVsc2Uge1xuICAgICAgICAgIGZvdW5kID0gdHJ1ZTtcbiAgICAgICAgICBlbnRyeS52YWx1ZSA9IHZhbDtcbiAgICAgICAgfVxuICAgICAgfVxuICAgIH1cbiAgICBpZiAoIWZvdW5kKSBwdXNoKGVudHJpZXMsIHsga2V5OiBrZXksIHZhbHVlOiB2YWwgfSk7XG4gICAgaWYgKCFERVNDUklQVE9SUykgdGhpcy5zaXplID0gZW50cmllcy5sZW5ndGg7XG4gICAgc3RhdGUudXBkYXRlVVJMKCk7XG4gIH0sXG4gIC8vIGBVUkxTZWFyY2hQYXJhbXMucHJvdG90eXBlLnNvcnRgIG1ldGhvZFxuICAvLyBodHRwczovL3VybC5zcGVjLndoYXR3Zy5vcmcvI2RvbS11cmxzZWFyY2hwYXJhbXMtc29ydFxuICBzb3J0OiBmdW5jdGlvbiBzb3J0KCkge1xuICAgIHZhciBzdGF0ZSA9IGdldEludGVybmFsUGFyYW1zU3RhdGUodGhpcyk7XG4gICAgYXJyYXlTb3J0KHN0YXRlLmVudHJpZXMsIGZ1bmN0aW9uIChhLCBiKSB7XG4gICAgICByZXR1cm4gYS5rZXkgPiBiLmtleSA/IDEgOiAtMTtcbiAgICB9KTtcbiAgICBzdGF0ZS51cGRhdGVVUkwoKTtcbiAgfSxcbiAgLy8gYFVSTFNlYXJjaFBhcmFtcy5wcm90b3R5cGUuZm9yRWFjaGAgbWV0aG9kXG4gIGZvckVhY2g6IGZ1bmN0aW9uIGZvckVhY2goY2FsbGJhY2sgLyogLCB0aGlzQXJnICovKSB7XG4gICAgdmFyIGVudHJpZXMgPSBnZXRJbnRlcm5hbFBhcmFtc1N0YXRlKHRoaXMpLmVudHJpZXM7XG4gICAgdmFyIGJvdW5kRnVuY3Rpb24gPSBiaW5kKGNhbGxiYWNrLCBhcmd1bWVudHMubGVuZ3RoID4gMSA/IGFyZ3VtZW50c1sxXSA6IHVuZGVmaW5lZCk7XG4gICAgdmFyIGluZGV4ID0gMDtcbiAgICB2YXIgZW50cnk7XG4gICAgd2hpbGUgKGluZGV4IDwgZW50cmllcy5sZW5ndGgpIHtcbiAgICAgIGVudHJ5ID0gZW50cmllc1tpbmRleCsrXTtcbiAgICAgIGJvdW5kRnVuY3Rpb24oZW50cnkudmFsdWUsIGVudHJ5LmtleSwgdGhpcyk7XG4gICAgfVxuICB9LFxuICAvLyBgVVJMU2VhcmNoUGFyYW1zLnByb3RvdHlwZS5rZXlzYCBtZXRob2RcbiAga2V5czogZnVuY3Rpb24ga2V5cygpIHtcbiAgICByZXR1cm4gbmV3IFVSTFNlYXJjaFBhcmFtc0l0ZXJhdG9yKHRoaXMsICdrZXlzJyk7XG4gIH0sXG4gIC8vIGBVUkxTZWFyY2hQYXJhbXMucHJvdG90eXBlLnZhbHVlc2AgbWV0aG9kXG4gIHZhbHVlczogZnVuY3Rpb24gdmFsdWVzKCkge1xuICAgIHJldHVybiBuZXcgVVJMU2VhcmNoUGFyYW1zSXRlcmF0b3IodGhpcywgJ3ZhbHVlcycpO1xuICB9LFxuICAvLyBgVVJMU2VhcmNoUGFyYW1zLnByb3RvdHlwZS5lbnRyaWVzYCBtZXRob2RcbiAgZW50cmllczogZnVuY3Rpb24gZW50cmllcygpIHtcbiAgICByZXR1cm4gbmV3IFVSTFNlYXJjaFBhcmFtc0l0ZXJhdG9yKHRoaXMsICdlbnRyaWVzJyk7XG4gIH1cbn0sIHsgZW51bWVyYWJsZTogdHJ1ZSB9KTtcblxuLy8gYFVSTFNlYXJjaFBhcmFtcy5wcm90b3R5cGVbQEBpdGVyYXRvcl1gIG1ldGhvZFxuZGVmaW5lQnVpbHRJbihVUkxTZWFyY2hQYXJhbXNQcm90b3R5cGUsIElURVJBVE9SLCBVUkxTZWFyY2hQYXJhbXNQcm90b3R5cGUuZW50cmllcywgeyBuYW1lOiAnZW50cmllcycgfSk7XG5cbi8vIGBVUkxTZWFyY2hQYXJhbXMucHJvdG90eXBlLnRvU3RyaW5nYCBtZXRob2Rcbi8vIGh0dHBzOi8vdXJsLnNwZWMud2hhdHdnLm9yZy8jdXJsc2VhcmNocGFyYW1zLXN0cmluZ2lmaWNhdGlvbi1iZWhhdmlvclxuZGVmaW5lQnVpbHRJbihVUkxTZWFyY2hQYXJhbXNQcm90b3R5cGUsICd0b1N0cmluZycsIGZ1bmN0aW9uIHRvU3RyaW5nKCkge1xuICByZXR1cm4gZ2V0SW50ZXJuYWxQYXJhbXNTdGF0ZSh0aGlzKS5zZXJpYWxpemUoKTtcbn0sIHsgZW51bWVyYWJsZTogdHJ1ZSB9KTtcblxuLy8gYFVSTFNlYXJjaFBhcmFtcy5wcm90b3R5cGUuc2l6ZWAgZ2V0dGVyXG4vLyBodHRwczovL2dpdGh1Yi5jb20vd2hhdHdnL3VybC9wdWxsLzczNFxuaWYgKERFU0NSSVBUT1JTKSBkZWZpbmVCdWlsdEluQWNjZXNzb3IoVVJMU2VhcmNoUGFyYW1zUHJvdG90eXBlLCAnc2l6ZScsIHtcbiAgZ2V0OiBmdW5jdGlvbiBzaXplKCkge1xuICAgIHJldHVybiBnZXRJbnRlcm5hbFBhcmFtc1N0YXRlKHRoaXMpLmVudHJpZXMubGVuZ3RoO1xuICB9LFxuICBjb25maWd1cmFibGU6IHRydWUsXG4gIGVudW1lcmFibGU6IHRydWVcbn0pO1xuXG5zZXRUb1N0cmluZ1RhZyhVUkxTZWFyY2hQYXJhbXNDb25zdHJ1Y3RvciwgVVJMX1NFQVJDSF9QQVJBTVMpO1xuXG4kKHsgZ2xvYmFsOiB0cnVlLCBjb25zdHJ1Y3RvcjogdHJ1ZSwgZm9yY2VkOiAhVVNFX05BVElWRV9VUkwgfSwge1xuICBVUkxTZWFyY2hQYXJhbXM6IFVSTFNlYXJjaFBhcmFtc0NvbnN0cnVjdG9yXG59KTtcblxuLy8gV3JhcCBgZmV0Y2hgIGFuZCBgUmVxdWVzdGAgZm9yIGNvcnJlY3Qgd29yayB3aXRoIHBvbHlmaWxsZWQgYFVSTFNlYXJjaFBhcmFtc2BcbmlmICghVVNFX05BVElWRV9VUkwgJiYgaXNDYWxsYWJsZShIZWFkZXJzKSkge1xuICB2YXIgaGVhZGVyc0hhcyA9IHVuY3VycnlUaGlzKEhlYWRlcnNQcm90b3R5cGUuaGFzKTtcbiAgdmFyIGhlYWRlcnNTZXQgPSB1bmN1cnJ5VGhpcyhIZWFkZXJzUHJvdG90eXBlLnNldCk7XG5cbiAgdmFyIHdyYXBSZXF1ZXN0T3B0aW9ucyA9IGZ1bmN0aW9uIChpbml0KSB7XG4gICAgaWYgKGlzT2JqZWN0KGluaXQpKSB7XG4gICAgICB2YXIgYm9keSA9IGluaXQuYm9keTtcbiAgICAgIHZhciBoZWFkZXJzO1xuICAgICAgaWYgKGNsYXNzb2YoYm9keSkgPT09IFVSTF9TRUFSQ0hfUEFSQU1TKSB7XG4gICAgICAgIGhlYWRlcnMgPSBpbml0LmhlYWRlcnMgPyBuZXcgSGVhZGVycyhpbml0LmhlYWRlcnMpIDogbmV3IEhlYWRlcnMoKTtcbiAgICAgICAgaWYgKCFoZWFkZXJzSGFzKGhlYWRlcnMsICdjb250ZW50LXR5cGUnKSkge1xuICAgICAgICAgIGhlYWRlcnNTZXQoaGVhZGVycywgJ2NvbnRlbnQtdHlwZScsICdhcHBsaWNhdGlvbi94LXd3dy1mb3JtLXVybGVuY29kZWQ7Y2hhcnNldD1VVEYtOCcpO1xuICAgICAgICB9XG4gICAgICAgIHJldHVybiBjcmVhdGUoaW5pdCwge1xuICAgICAgICAgIGJvZHk6IGNyZWF0ZVByb3BlcnR5RGVzY3JpcHRvcigwLCAkdG9TdHJpbmcoYm9keSkpLFxuICAgICAgICAgIGhlYWRlcnM6IGNyZWF0ZVByb3BlcnR5RGVzY3JpcHRvcigwLCBoZWFkZXJzKVxuICAgICAgICB9KTtcbiAgICAgIH1cbiAgICB9IHJldHVybiBpbml0O1xuICB9O1xuXG4gIGlmIChpc0NhbGxhYmxlKG5hdGl2ZUZldGNoKSkge1xuICAgICQoeyBnbG9iYWw6IHRydWUsIGVudW1lcmFibGU6IHRydWUsIGRvbnRDYWxsR2V0U2V0OiB0cnVlLCBmb3JjZWQ6IHRydWUgfSwge1xuICAgICAgZmV0Y2g6IGZ1bmN0aW9uIGZldGNoKGlucHV0IC8qICwgaW5pdCAqLykge1xuICAgICAgICByZXR1cm4gbmF0aXZlRmV0Y2goaW5wdXQsIGFyZ3VtZW50cy5sZW5ndGggPiAxID8gd3JhcFJlcXVlc3RPcHRpb25zKGFyZ3VtZW50c1sxXSkgOiB7fSk7XG4gICAgICB9XG4gICAgfSk7XG4gIH1cblxuICBpZiAoaXNDYWxsYWJsZShOYXRpdmVSZXF1ZXN0KSkge1xuICAgIHZhciBSZXF1ZXN0Q29uc3RydWN0b3IgPSBmdW5jdGlvbiBSZXF1ZXN0KGlucHV0IC8qICwgaW5pdCAqLykge1xuICAgICAgYW5JbnN0YW5jZSh0aGlzLCBSZXF1ZXN0UHJvdG90eXBlKTtcbiAgICAgIHJldHVybiBuZXcgTmF0aXZlUmVxdWVzdChpbnB1dCwgYXJndW1lbnRzLmxlbmd0aCA+IDEgPyB3cmFwUmVxdWVzdE9wdGlvbnMoYXJndW1lbnRzWzFdKSA6IHt9KTtcbiAgICB9O1xuXG4gICAgUmVxdWVzdFByb3RvdHlwZS5jb25zdHJ1Y3RvciA9IFJlcXVlc3RDb25zdHJ1Y3RvcjtcbiAgICBSZXF1ZXN0Q29uc3RydWN0b3IucHJvdG90eXBlID0gUmVxdWVzdFByb3RvdHlwZTtcblxuICAgICQoeyBnbG9iYWw6IHRydWUsIGNvbnN0cnVjdG9yOiB0cnVlLCBkb250Q2FsbEdldFNldDogdHJ1ZSwgZm9yY2VkOiB0cnVlIH0sIHtcbiAgICAgIFJlcXVlc3Q6IFJlcXVlc3RDb25zdHJ1Y3RvclxuICAgIH0pO1xuICB9XG59XG5cbm1vZHVsZS5leHBvcnRzID0ge1xuICBVUkxTZWFyY2hQYXJhbXM6IFVSTFNlYXJjaFBhcmFtc0NvbnN0cnVjdG9yLFxuICBnZXRTdGF0ZTogZ2V0SW50ZXJuYWxQYXJhbXNTdGF0ZVxufTtcbiIsIid1c2Ugc3RyaWN0Jztcbi8vIFRPRE86IFJlbW92ZSB0aGlzIG1vZHVsZSBmcm9tIGBjb3JlLWpzQDRgIHNpbmNlIGl0J3MgcmVwbGFjZWQgdG8gbW9kdWxlIGJlbG93XG5yZXF1aXJlKCcuLi9tb2R1bGVzL3dlYi51cmwtc2VhcmNoLXBhcmFtcy5jb25zdHJ1Y3RvcicpO1xuIiwiJ3VzZSBzdHJpY3QnO1xuLy8gVE9ETzogaW4gY29yZS1qc0A0LCBtb3ZlIC9tb2R1bGVzLyBkZXBlbmRlbmNpZXMgdG8gcHVibGljIGVudHJpZXMgZm9yIGJldHRlciBvcHRpbWl6YXRpb24gYnkgdG9vbHMgbGlrZSBgcHJlc2V0LWVudmBcbnJlcXVpcmUoJy4uL21vZHVsZXMvZXMuc3RyaW5nLml0ZXJhdG9yJyk7XG52YXIgJCA9IHJlcXVpcmUoJy4uL2ludGVybmFscy9leHBvcnQnKTtcbnZhciBERVNDUklQVE9SUyA9IHJlcXVpcmUoJy4uL2ludGVybmFscy9kZXNjcmlwdG9ycycpO1xudmFyIFVTRV9OQVRJVkVfVVJMID0gcmVxdWlyZSgnLi4vaW50ZXJuYWxzL3VybC1jb25zdHJ1Y3Rvci1kZXRlY3Rpb24nKTtcbnZhciBnbG9iYWwgPSByZXF1aXJlKCcuLi9pbnRlcm5hbHMvZ2xvYmFsJyk7XG52YXIgYmluZCA9IHJlcXVpcmUoJy4uL2ludGVybmFscy9mdW5jdGlvbi1iaW5kLWNvbnRleHQnKTtcbnZhciB1bmN1cnJ5VGhpcyA9IHJlcXVpcmUoJy4uL2ludGVybmFscy9mdW5jdGlvbi11bmN1cnJ5LXRoaXMnKTtcbnZhciBkZWZpbmVCdWlsdEluID0gcmVxdWlyZSgnLi4vaW50ZXJuYWxzL2RlZmluZS1idWlsdC1pbicpO1xudmFyIGRlZmluZUJ1aWx0SW5BY2Nlc3NvciA9IHJlcXVpcmUoJy4uL2ludGVybmFscy9kZWZpbmUtYnVpbHQtaW4tYWNjZXNzb3InKTtcbnZhciBhbkluc3RhbmNlID0gcmVxdWlyZSgnLi4vaW50ZXJuYWxzL2FuLWluc3RhbmNlJyk7XG52YXIgaGFzT3duID0gcmVxdWlyZSgnLi4vaW50ZXJuYWxzL2hhcy1vd24tcHJvcGVydHknKTtcbnZhciBhc3NpZ24gPSByZXF1aXJlKCcuLi9pbnRlcm5hbHMvb2JqZWN0LWFzc2lnbicpO1xudmFyIGFycmF5RnJvbSA9IHJlcXVpcmUoJy4uL2ludGVybmFscy9hcnJheS1mcm9tJyk7XG52YXIgYXJyYXlTbGljZSA9IHJlcXVpcmUoJy4uL2ludGVybmFscy9hcnJheS1zbGljZScpO1xudmFyIGNvZGVBdCA9IHJlcXVpcmUoJy4uL2ludGVybmFscy9zdHJpbmctbXVsdGlieXRlJykuY29kZUF0O1xudmFyIHRvQVNDSUkgPSByZXF1aXJlKCcuLi9pbnRlcm5hbHMvc3RyaW5nLXB1bnljb2RlLXRvLWFzY2lpJyk7XG52YXIgJHRvU3RyaW5nID0gcmVxdWlyZSgnLi4vaW50ZXJuYWxzL3RvLXN0cmluZycpO1xudmFyIHNldFRvU3RyaW5nVGFnID0gcmVxdWlyZSgnLi4vaW50ZXJuYWxzL3NldC10by1zdHJpbmctdGFnJyk7XG52YXIgdmFsaWRhdGVBcmd1bWVudHNMZW5ndGggPSByZXF1aXJlKCcuLi9pbnRlcm5hbHMvdmFsaWRhdGUtYXJndW1lbnRzLWxlbmd0aCcpO1xudmFyIFVSTFNlYXJjaFBhcmFtc01vZHVsZSA9IHJlcXVpcmUoJy4uL21vZHVsZXMvd2ViLnVybC1zZWFyY2gtcGFyYW1zLmNvbnN0cnVjdG9yJyk7XG52YXIgSW50ZXJuYWxTdGF0ZU1vZHVsZSA9IHJlcXVpcmUoJy4uL2ludGVybmFscy9pbnRlcm5hbC1zdGF0ZScpO1xuXG52YXIgc2V0SW50ZXJuYWxTdGF0ZSA9IEludGVybmFsU3RhdGVNb2R1bGUuc2V0O1xudmFyIGdldEludGVybmFsVVJMU3RhdGUgPSBJbnRlcm5hbFN0YXRlTW9kdWxlLmdldHRlckZvcignVVJMJyk7XG52YXIgVVJMU2VhcmNoUGFyYW1zID0gVVJMU2VhcmNoUGFyYW1zTW9kdWxlLlVSTFNlYXJjaFBhcmFtcztcbnZhciBnZXRJbnRlcm5hbFNlYXJjaFBhcmFtc1N0YXRlID0gVVJMU2VhcmNoUGFyYW1zTW9kdWxlLmdldFN0YXRlO1xuXG52YXIgTmF0aXZlVVJMID0gZ2xvYmFsLlVSTDtcbnZhciBUeXBlRXJyb3IgPSBnbG9iYWwuVHlwZUVycm9yO1xudmFyIHBhcnNlSW50ID0gZ2xvYmFsLnBhcnNlSW50O1xudmFyIGZsb29yID0gTWF0aC5mbG9vcjtcbnZhciBwb3cgPSBNYXRoLnBvdztcbnZhciBjaGFyQXQgPSB1bmN1cnJ5VGhpcygnJy5jaGFyQXQpO1xudmFyIGV4ZWMgPSB1bmN1cnJ5VGhpcygvLi8uZXhlYyk7XG52YXIgam9pbiA9IHVuY3VycnlUaGlzKFtdLmpvaW4pO1xudmFyIG51bWJlclRvU3RyaW5nID0gdW5jdXJyeVRoaXMoMS4wLnRvU3RyaW5nKTtcbnZhciBwb3AgPSB1bmN1cnJ5VGhpcyhbXS5wb3ApO1xudmFyIHB1c2ggPSB1bmN1cnJ5VGhpcyhbXS5wdXNoKTtcbnZhciByZXBsYWNlID0gdW5jdXJyeVRoaXMoJycucmVwbGFjZSk7XG52YXIgc2hpZnQgPSB1bmN1cnJ5VGhpcyhbXS5zaGlmdCk7XG52YXIgc3BsaXQgPSB1bmN1cnJ5VGhpcygnJy5zcGxpdCk7XG52YXIgc3RyaW5nU2xpY2UgPSB1bmN1cnJ5VGhpcygnJy5zbGljZSk7XG52YXIgdG9Mb3dlckNhc2UgPSB1bmN1cnJ5VGhpcygnJy50b0xvd2VyQ2FzZSk7XG52YXIgdW5zaGlmdCA9IHVuY3VycnlUaGlzKFtdLnVuc2hpZnQpO1xuXG52YXIgSU5WQUxJRF9BVVRIT1JJVFkgPSAnSW52YWxpZCBhdXRob3JpdHknO1xudmFyIElOVkFMSURfU0NIRU1FID0gJ0ludmFsaWQgc2NoZW1lJztcbnZhciBJTlZBTElEX0hPU1QgPSAnSW52YWxpZCBob3N0JztcbnZhciBJTlZBTElEX1BPUlQgPSAnSW52YWxpZCBwb3J0JztcblxudmFyIEFMUEhBID0gL1thLXpdL2k7XG4vLyBlc2xpbnQtZGlzYWJsZS1uZXh0LWxpbmUgcmVnZXhwL25vLW9ic2N1cmUtcmFuZ2UgLS0gc2FmZVxudmFyIEFMUEhBTlVNRVJJQyA9IC9bXFxkKy0uYS16XS9pO1xudmFyIERJR0lUID0gL1xcZC87XG52YXIgSEVYX1NUQVJUID0gL14weC9pO1xudmFyIE9DVCA9IC9eWzAtN10rJC87XG52YXIgREVDID0gL15cXGQrJC87XG52YXIgSEVYID0gL15bXFxkYS1mXSskL2k7XG4vKiBlc2xpbnQtZGlzYWJsZSByZWdleHAvbm8tY29udHJvbC1jaGFyYWN0ZXIgLS0gc2FmZSAqL1xudmFyIEZPUkJJRERFTl9IT1NUX0NPREVfUE9JTlQgPSAvW1xcMFxcdFxcblxcciAjJS86PD4/QFtcXFxcXFxdXnxdLztcbnZhciBGT1JCSURERU5fSE9TVF9DT0RFX1BPSU5UX0VYQ0xVRElOR19QRVJDRU5UID0gL1tcXDBcXHRcXG5cXHIgIy86PD4/QFtcXFxcXFxdXnxdLztcbnZhciBMRUFESU5HX0MwX0NPTlRST0xfT1JfU1BBQ0UgPSAvXltcXHUwMDAwLVxcdTAwMjBdKy87XG52YXIgVFJBSUxJTkdfQzBfQ09OVFJPTF9PUl9TUEFDRSA9IC8oXnxbXlxcdTAwMDAtXFx1MDAyMF0pW1xcdTAwMDAtXFx1MDAyMF0rJC87XG52YXIgVEFCX0FORF9ORVdfTElORSA9IC9bXFx0XFxuXFxyXS9nO1xuLyogZXNsaW50LWVuYWJsZSByZWdleHAvbm8tY29udHJvbC1jaGFyYWN0ZXIgLS0gc2FmZSAqL1xudmFyIEVPRjtcblxuLy8gaHR0cHM6Ly91cmwuc3BlYy53aGF0d2cub3JnLyNpcHY0LW51bWJlci1wYXJzZXJcbnZhciBwYXJzZUlQdjQgPSBmdW5jdGlvbiAoaW5wdXQpIHtcbiAgdmFyIHBhcnRzID0gc3BsaXQoaW5wdXQsICcuJyk7XG4gIHZhciBwYXJ0c0xlbmd0aCwgbnVtYmVycywgaW5kZXgsIHBhcnQsIHJhZGl4LCBudW1iZXIsIGlwdjQ7XG4gIGlmIChwYXJ0cy5sZW5ndGggJiYgcGFydHNbcGFydHMubGVuZ3RoIC0gMV0gPT09ICcnKSB7XG4gICAgcGFydHMubGVuZ3RoLS07XG4gIH1cbiAgcGFydHNMZW5ndGggPSBwYXJ0cy5sZW5ndGg7XG4gIGlmIChwYXJ0c0xlbmd0aCA+IDQpIHJldHVybiBpbnB1dDtcbiAgbnVtYmVycyA9IFtdO1xuICBmb3IgKGluZGV4ID0gMDsgaW5kZXggPCBwYXJ0c0xlbmd0aDsgaW5kZXgrKykge1xuICAgIHBhcnQgPSBwYXJ0c1tpbmRleF07XG4gICAgaWYgKHBhcnQgPT09ICcnKSByZXR1cm4gaW5wdXQ7XG4gICAgcmFkaXggPSAxMDtcbiAgICBpZiAocGFydC5sZW5ndGggPiAxICYmIGNoYXJBdChwYXJ0LCAwKSA9PT0gJzAnKSB7XG4gICAgICByYWRpeCA9IGV4ZWMoSEVYX1NUQVJULCBwYXJ0KSA/IDE2IDogODtcbiAgICAgIHBhcnQgPSBzdHJpbmdTbGljZShwYXJ0LCByYWRpeCA9PT0gOCA/IDEgOiAyKTtcbiAgICB9XG4gICAgaWYgKHBhcnQgPT09ICcnKSB7XG4gICAgICBudW1iZXIgPSAwO1xuICAgIH0gZWxzZSB7XG4gICAgICBpZiAoIWV4ZWMocmFkaXggPT09IDEwID8gREVDIDogcmFkaXggPT09IDggPyBPQ1QgOiBIRVgsIHBhcnQpKSByZXR1cm4gaW5wdXQ7XG4gICAgICBudW1iZXIgPSBwYXJzZUludChwYXJ0LCByYWRpeCk7XG4gICAgfVxuICAgIHB1c2gobnVtYmVycywgbnVtYmVyKTtcbiAgfVxuICBmb3IgKGluZGV4ID0gMDsgaW5kZXggPCBwYXJ0c0xlbmd0aDsgaW5kZXgrKykge1xuICAgIG51bWJlciA9IG51bWJlcnNbaW5kZXhdO1xuICAgIGlmIChpbmRleCA9PT0gcGFydHNMZW5ndGggLSAxKSB7XG4gICAgICBpZiAobnVtYmVyID49IHBvdygyNTYsIDUgLSBwYXJ0c0xlbmd0aCkpIHJldHVybiBudWxsO1xuICAgIH0gZWxzZSBpZiAobnVtYmVyID4gMjU1KSByZXR1cm4gbnVsbDtcbiAgfVxuICBpcHY0ID0gcG9wKG51bWJlcnMpO1xuICBmb3IgKGluZGV4ID0gMDsgaW5kZXggPCBudW1iZXJzLmxlbmd0aDsgaW5kZXgrKykge1xuICAgIGlwdjQgKz0gbnVtYmVyc1tpbmRleF0gKiBwb3coMjU2LCAzIC0gaW5kZXgpO1xuICB9XG4gIHJldHVybiBpcHY0O1xufTtcblxuLy8gaHR0cHM6Ly91cmwuc3BlYy53aGF0d2cub3JnLyNjb25jZXB0LWlwdjYtcGFyc2VyXG4vLyBlc2xpbnQtZGlzYWJsZS1uZXh0LWxpbmUgbWF4LXN0YXRlbWVudHMgLS0gVE9ET1xudmFyIHBhcnNlSVB2NiA9IGZ1bmN0aW9uIChpbnB1dCkge1xuICB2YXIgYWRkcmVzcyA9IFswLCAwLCAwLCAwLCAwLCAwLCAwLCAwXTtcbiAgdmFyIHBpZWNlSW5kZXggPSAwO1xuICB2YXIgY29tcHJlc3MgPSBudWxsO1xuICB2YXIgcG9pbnRlciA9IDA7XG4gIHZhciB2YWx1ZSwgbGVuZ3RoLCBudW1iZXJzU2VlbiwgaXB2NFBpZWNlLCBudW1iZXIsIHN3YXBzLCBzd2FwO1xuXG4gIHZhciBjaHIgPSBmdW5jdGlvbiAoKSB7XG4gICAgcmV0dXJuIGNoYXJBdChpbnB1dCwgcG9pbnRlcik7XG4gIH07XG5cbiAgaWYgKGNocigpID09PSAnOicpIHtcbiAgICBpZiAoY2hhckF0KGlucHV0LCAxKSAhPT0gJzonKSByZXR1cm47XG4gICAgcG9pbnRlciArPSAyO1xuICAgIHBpZWNlSW5kZXgrKztcbiAgICBjb21wcmVzcyA9IHBpZWNlSW5kZXg7XG4gIH1cbiAgd2hpbGUgKGNocigpKSB7XG4gICAgaWYgKHBpZWNlSW5kZXggPT09IDgpIHJldHVybjtcbiAgICBpZiAoY2hyKCkgPT09ICc6Jykge1xuICAgICAgaWYgKGNvbXByZXNzICE9PSBudWxsKSByZXR1cm47XG4gICAgICBwb2ludGVyKys7XG4gICAgICBwaWVjZUluZGV4Kys7XG4gICAgICBjb21wcmVzcyA9IHBpZWNlSW5kZXg7XG4gICAgICBjb250aW51ZTtcbiAgICB9XG4gICAgdmFsdWUgPSBsZW5ndGggPSAwO1xuICAgIHdoaWxlIChsZW5ndGggPCA0ICYmIGV4ZWMoSEVYLCBjaHIoKSkpIHtcbiAgICAgIHZhbHVlID0gdmFsdWUgKiAxNiArIHBhcnNlSW50KGNocigpLCAxNik7XG4gICAgICBwb2ludGVyKys7XG4gICAgICBsZW5ndGgrKztcbiAgICB9XG4gICAgaWYgKGNocigpID09PSAnLicpIHtcbiAgICAgIGlmIChsZW5ndGggPT09IDApIHJldHVybjtcbiAgICAgIHBvaW50ZXIgLT0gbGVuZ3RoO1xuICAgICAgaWYgKHBpZWNlSW5kZXggPiA2KSByZXR1cm47XG4gICAgICBudW1iZXJzU2VlbiA9IDA7XG4gICAgICB3aGlsZSAoY2hyKCkpIHtcbiAgICAgICAgaXB2NFBpZWNlID0gbnVsbDtcbiAgICAgICAgaWYgKG51bWJlcnNTZWVuID4gMCkge1xuICAgICAgICAgIGlmIChjaHIoKSA9PT0gJy4nICYmIG51bWJlcnNTZWVuIDwgNCkgcG9pbnRlcisrO1xuICAgICAgICAgIGVsc2UgcmV0dXJuO1xuICAgICAgICB9XG4gICAgICAgIGlmICghZXhlYyhESUdJVCwgY2hyKCkpKSByZXR1cm47XG4gICAgICAgIHdoaWxlIChleGVjKERJR0lULCBjaHIoKSkpIHtcbiAgICAgICAgICBudW1iZXIgPSBwYXJzZUludChjaHIoKSwgMTApO1xuICAgICAgICAgIGlmIChpcHY0UGllY2UgPT09IG51bGwpIGlwdjRQaWVjZSA9IG51bWJlcjtcbiAgICAgICAgICBlbHNlIGlmIChpcHY0UGllY2UgPT09IDApIHJldHVybjtcbiAgICAgICAgICBlbHNlIGlwdjRQaWVjZSA9IGlwdjRQaWVjZSAqIDEwICsgbnVtYmVyO1xuICAgICAgICAgIGlmIChpcHY0UGllY2UgPiAyNTUpIHJldHVybjtcbiAgICAgICAgICBwb2ludGVyKys7XG4gICAgICAgIH1cbiAgICAgICAgYWRkcmVzc1twaWVjZUluZGV4XSA9IGFkZHJlc3NbcGllY2VJbmRleF0gKiAyNTYgKyBpcHY0UGllY2U7XG4gICAgICAgIG51bWJlcnNTZWVuKys7XG4gICAgICAgIGlmIChudW1iZXJzU2VlbiA9PT0gMiB8fCBudW1iZXJzU2VlbiA9PT0gNCkgcGllY2VJbmRleCsrO1xuICAgICAgfVxuICAgICAgaWYgKG51bWJlcnNTZWVuICE9PSA0KSByZXR1cm47XG4gICAgICBicmVhaztcbiAgICB9IGVsc2UgaWYgKGNocigpID09PSAnOicpIHtcbiAgICAgIHBvaW50ZXIrKztcbiAgICAgIGlmICghY2hyKCkpIHJldHVybjtcbiAgICB9IGVsc2UgaWYgKGNocigpKSByZXR1cm47XG4gICAgYWRkcmVzc1twaWVjZUluZGV4KytdID0gdmFsdWU7XG4gIH1cbiAgaWYgKGNvbXByZXNzICE9PSBudWxsKSB7XG4gICAgc3dhcHMgPSBwaWVjZUluZGV4IC0gY29tcHJlc3M7XG4gICAgcGllY2VJbmRleCA9IDc7XG4gICAgd2hpbGUgKHBpZWNlSW5kZXggIT09IDAgJiYgc3dhcHMgPiAwKSB7XG4gICAgICBzd2FwID0gYWRkcmVzc1twaWVjZUluZGV4XTtcbiAgICAgIGFkZHJlc3NbcGllY2VJbmRleC0tXSA9IGFkZHJlc3NbY29tcHJlc3MgKyBzd2FwcyAtIDFdO1xuICAgICAgYWRkcmVzc1tjb21wcmVzcyArIC0tc3dhcHNdID0gc3dhcDtcbiAgICB9XG4gIH0gZWxzZSBpZiAocGllY2VJbmRleCAhPT0gOCkgcmV0dXJuO1xuICByZXR1cm4gYWRkcmVzcztcbn07XG5cbnZhciBmaW5kTG9uZ2VzdFplcm9TZXF1ZW5jZSA9IGZ1bmN0aW9uIChpcHY2KSB7XG4gIHZhciBtYXhJbmRleCA9IG51bGw7XG4gIHZhciBtYXhMZW5ndGggPSAxO1xuICB2YXIgY3VyclN0YXJ0ID0gbnVsbDtcbiAgdmFyIGN1cnJMZW5ndGggPSAwO1xuICB2YXIgaW5kZXggPSAwO1xuICBmb3IgKDsgaW5kZXggPCA4OyBpbmRleCsrKSB7XG4gICAgaWYgKGlwdjZbaW5kZXhdICE9PSAwKSB7XG4gICAgICBpZiAoY3Vyckxlbmd0aCA+IG1heExlbmd0aCkge1xuICAgICAgICBtYXhJbmRleCA9IGN1cnJTdGFydDtcbiAgICAgICAgbWF4TGVuZ3RoID0gY3Vyckxlbmd0aDtcbiAgICAgIH1cbiAgICAgIGN1cnJTdGFydCA9IG51bGw7XG4gICAgICBjdXJyTGVuZ3RoID0gMDtcbiAgICB9IGVsc2Uge1xuICAgICAgaWYgKGN1cnJTdGFydCA9PT0gbnVsbCkgY3VyclN0YXJ0ID0gaW5kZXg7XG4gICAgICArK2N1cnJMZW5ndGg7XG4gICAgfVxuICB9XG4gIGlmIChjdXJyTGVuZ3RoID4gbWF4TGVuZ3RoKSB7XG4gICAgbWF4SW5kZXggPSBjdXJyU3RhcnQ7XG4gICAgbWF4TGVuZ3RoID0gY3Vyckxlbmd0aDtcbiAgfVxuICByZXR1cm4gbWF4SW5kZXg7XG59O1xuXG4vLyBodHRwczovL3VybC5zcGVjLndoYXR3Zy5vcmcvI2hvc3Qtc2VyaWFsaXppbmdcbnZhciBzZXJpYWxpemVIb3N0ID0gZnVuY3Rpb24gKGhvc3QpIHtcbiAgdmFyIHJlc3VsdCwgaW5kZXgsIGNvbXByZXNzLCBpZ25vcmUwO1xuICAvLyBpcHY0XG4gIGlmICh0eXBlb2YgaG9zdCA9PSAnbnVtYmVyJykge1xuICAgIHJlc3VsdCA9IFtdO1xuICAgIGZvciAoaW5kZXggPSAwOyBpbmRleCA8IDQ7IGluZGV4KyspIHtcbiAgICAgIHVuc2hpZnQocmVzdWx0LCBob3N0ICUgMjU2KTtcbiAgICAgIGhvc3QgPSBmbG9vcihob3N0IC8gMjU2KTtcbiAgICB9IHJldHVybiBqb2luKHJlc3VsdCwgJy4nKTtcbiAgLy8gaXB2NlxuICB9IGVsc2UgaWYgKHR5cGVvZiBob3N0ID09ICdvYmplY3QnKSB7XG4gICAgcmVzdWx0ID0gJyc7XG4gICAgY29tcHJlc3MgPSBmaW5kTG9uZ2VzdFplcm9TZXF1ZW5jZShob3N0KTtcbiAgICBmb3IgKGluZGV4ID0gMDsgaW5kZXggPCA4OyBpbmRleCsrKSB7XG4gICAgICBpZiAoaWdub3JlMCAmJiBob3N0W2luZGV4XSA9PT0gMCkgY29udGludWU7XG4gICAgICBpZiAoaWdub3JlMCkgaWdub3JlMCA9IGZhbHNlO1xuICAgICAgaWYgKGNvbXByZXNzID09PSBpbmRleCkge1xuICAgICAgICByZXN1bHQgKz0gaW5kZXggPyAnOicgOiAnOjonO1xuICAgICAgICBpZ25vcmUwID0gdHJ1ZTtcbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIHJlc3VsdCArPSBudW1iZXJUb1N0cmluZyhob3N0W2luZGV4XSwgMTYpO1xuICAgICAgICBpZiAoaW5kZXggPCA3KSByZXN1bHQgKz0gJzonO1xuICAgICAgfVxuICAgIH1cbiAgICByZXR1cm4gJ1snICsgcmVzdWx0ICsgJ10nO1xuICB9IHJldHVybiBob3N0O1xufTtcblxudmFyIEMwQ29udHJvbFBlcmNlbnRFbmNvZGVTZXQgPSB7fTtcbnZhciBmcmFnbWVudFBlcmNlbnRFbmNvZGVTZXQgPSBhc3NpZ24oe30sIEMwQ29udHJvbFBlcmNlbnRFbmNvZGVTZXQsIHtcbiAgJyAnOiAxLCAnXCInOiAxLCAnPCc6IDEsICc+JzogMSwgJ2AnOiAxXG59KTtcbnZhciBwYXRoUGVyY2VudEVuY29kZVNldCA9IGFzc2lnbih7fSwgZnJhZ21lbnRQZXJjZW50RW5jb2RlU2V0LCB7XG4gICcjJzogMSwgJz8nOiAxLCAneyc6IDEsICd9JzogMVxufSk7XG52YXIgdXNlcmluZm9QZXJjZW50RW5jb2RlU2V0ID0gYXNzaWduKHt9LCBwYXRoUGVyY2VudEVuY29kZVNldCwge1xuICAnLyc6IDEsICc6JzogMSwgJzsnOiAxLCAnPSc6IDEsICdAJzogMSwgJ1snOiAxLCAnXFxcXCc6IDEsICddJzogMSwgJ14nOiAxLCAnfCc6IDFcbn0pO1xuXG52YXIgcGVyY2VudEVuY29kZSA9IGZ1bmN0aW9uIChjaHIsIHNldCkge1xuICB2YXIgY29kZSA9IGNvZGVBdChjaHIsIDApO1xuICByZXR1cm4gY29kZSA+IDB4MjAgJiYgY29kZSA8IDB4N0YgJiYgIWhhc093bihzZXQsIGNocikgPyBjaHIgOiBlbmNvZGVVUklDb21wb25lbnQoY2hyKTtcbn07XG5cbi8vIGh0dHBzOi8vdXJsLnNwZWMud2hhdHdnLm9yZy8jc3BlY2lhbC1zY2hlbWVcbnZhciBzcGVjaWFsU2NoZW1lcyA9IHtcbiAgZnRwOiAyMSxcbiAgZmlsZTogbnVsbCxcbiAgaHR0cDogODAsXG4gIGh0dHBzOiA0NDMsXG4gIHdzOiA4MCxcbiAgd3NzOiA0NDNcbn07XG5cbi8vIGh0dHBzOi8vdXJsLnNwZWMud2hhdHdnLm9yZy8jd2luZG93cy1kcml2ZS1sZXR0ZXJcbnZhciBpc1dpbmRvd3NEcml2ZUxldHRlciA9IGZ1bmN0aW9uIChzdHJpbmcsIG5vcm1hbGl6ZWQpIHtcbiAgdmFyIHNlY29uZDtcbiAgcmV0dXJuIHN0cmluZy5sZW5ndGggPT09IDIgJiYgZXhlYyhBTFBIQSwgY2hhckF0KHN0cmluZywgMCkpXG4gICAgJiYgKChzZWNvbmQgPSBjaGFyQXQoc3RyaW5nLCAxKSkgPT09ICc6JyB8fCAoIW5vcm1hbGl6ZWQgJiYgc2Vjb25kID09PSAnfCcpKTtcbn07XG5cbi8vIGh0dHBzOi8vdXJsLnNwZWMud2hhdHdnLm9yZy8jc3RhcnQtd2l0aC1hLXdpbmRvd3MtZHJpdmUtbGV0dGVyXG52YXIgc3RhcnRzV2l0aFdpbmRvd3NEcml2ZUxldHRlciA9IGZ1bmN0aW9uIChzdHJpbmcpIHtcbiAgdmFyIHRoaXJkO1xuICByZXR1cm4gc3RyaW5nLmxlbmd0aCA+IDEgJiYgaXNXaW5kb3dzRHJpdmVMZXR0ZXIoc3RyaW5nU2xpY2Uoc3RyaW5nLCAwLCAyKSkgJiYgKFxuICAgIHN0cmluZy5sZW5ndGggPT09IDIgfHxcbiAgICAoKHRoaXJkID0gY2hhckF0KHN0cmluZywgMikpID09PSAnLycgfHwgdGhpcmQgPT09ICdcXFxcJyB8fCB0aGlyZCA9PT0gJz8nIHx8IHRoaXJkID09PSAnIycpXG4gICk7XG59O1xuXG4vLyBodHRwczovL3VybC5zcGVjLndoYXR3Zy5vcmcvI3NpbmdsZS1kb3QtcGF0aC1zZWdtZW50XG52YXIgaXNTaW5nbGVEb3QgPSBmdW5jdGlvbiAoc2VnbWVudCkge1xuICByZXR1cm4gc2VnbWVudCA9PT0gJy4nIHx8IHRvTG93ZXJDYXNlKHNlZ21lbnQpID09PSAnJTJlJztcbn07XG5cbi8vIGh0dHBzOi8vdXJsLnNwZWMud2hhdHdnLm9yZy8jZG91YmxlLWRvdC1wYXRoLXNlZ21lbnRcbnZhciBpc0RvdWJsZURvdCA9IGZ1bmN0aW9uIChzZWdtZW50KSB7XG4gIHNlZ21lbnQgPSB0b0xvd2VyQ2FzZShzZWdtZW50KTtcbiAgcmV0dXJuIHNlZ21lbnQgPT09ICcuLicgfHwgc2VnbWVudCA9PT0gJyUyZS4nIHx8IHNlZ21lbnQgPT09ICcuJTJlJyB8fCBzZWdtZW50ID09PSAnJTJlJTJlJztcbn07XG5cbi8vIFN0YXRlczpcbnZhciBTQ0hFTUVfU1RBUlQgPSB7fTtcbnZhciBTQ0hFTUUgPSB7fTtcbnZhciBOT19TQ0hFTUUgPSB7fTtcbnZhciBTUEVDSUFMX1JFTEFUSVZFX09SX0FVVEhPUklUWSA9IHt9O1xudmFyIFBBVEhfT1JfQVVUSE9SSVRZID0ge307XG52YXIgUkVMQVRJVkUgPSB7fTtcbnZhciBSRUxBVElWRV9TTEFTSCA9IHt9O1xudmFyIFNQRUNJQUxfQVVUSE9SSVRZX1NMQVNIRVMgPSB7fTtcbnZhciBTUEVDSUFMX0FVVEhPUklUWV9JR05PUkVfU0xBU0hFUyA9IHt9O1xudmFyIEFVVEhPUklUWSA9IHt9O1xudmFyIEhPU1QgPSB7fTtcbnZhciBIT1NUTkFNRSA9IHt9O1xudmFyIFBPUlQgPSB7fTtcbnZhciBGSUxFID0ge307XG52YXIgRklMRV9TTEFTSCA9IHt9O1xudmFyIEZJTEVfSE9TVCA9IHt9O1xudmFyIFBBVEhfU1RBUlQgPSB7fTtcbnZhciBQQVRIID0ge307XG52YXIgQ0FOTk9UX0JFX0FfQkFTRV9VUkxfUEFUSCA9IHt9O1xudmFyIFFVRVJZID0ge307XG52YXIgRlJBR01FTlQgPSB7fTtcblxudmFyIFVSTFN0YXRlID0gZnVuY3Rpb24gKHVybCwgaXNCYXNlLCBiYXNlKSB7XG4gIHZhciB1cmxTdHJpbmcgPSAkdG9TdHJpbmcodXJsKTtcbiAgdmFyIGJhc2VTdGF0ZSwgZmFpbHVyZSwgc2VhcmNoUGFyYW1zO1xuICBpZiAoaXNCYXNlKSB7XG4gICAgZmFpbHVyZSA9IHRoaXMucGFyc2UodXJsU3RyaW5nKTtcbiAgICBpZiAoZmFpbHVyZSkgdGhyb3cgbmV3IFR5cGVFcnJvcihmYWlsdXJlKTtcbiAgICB0aGlzLnNlYXJjaFBhcmFtcyA9IG51bGw7XG4gIH0gZWxzZSB7XG4gICAgaWYgKGJhc2UgIT09IHVuZGVmaW5lZCkgYmFzZVN0YXRlID0gbmV3IFVSTFN0YXRlKGJhc2UsIHRydWUpO1xuICAgIGZhaWx1cmUgPSB0aGlzLnBhcnNlKHVybFN0cmluZywgbnVsbCwgYmFzZVN0YXRlKTtcbiAgICBpZiAoZmFpbHVyZSkgdGhyb3cgbmV3IFR5cGVFcnJvcihmYWlsdXJlKTtcbiAgICBzZWFyY2hQYXJhbXMgPSBnZXRJbnRlcm5hbFNlYXJjaFBhcmFtc1N0YXRlKG5ldyBVUkxTZWFyY2hQYXJhbXMoKSk7XG4gICAgc2VhcmNoUGFyYW1zLmJpbmRVUkwodGhpcyk7XG4gICAgdGhpcy5zZWFyY2hQYXJhbXMgPSBzZWFyY2hQYXJhbXM7XG4gIH1cbn07XG5cblVSTFN0YXRlLnByb3RvdHlwZSA9IHtcbiAgdHlwZTogJ1VSTCcsXG4gIC8vIGh0dHBzOi8vdXJsLnNwZWMud2hhdHdnLm9yZy8jdXJsLXBhcnNpbmdcbiAgLy8gZXNsaW50LWRpc2FibGUtbmV4dC1saW5lIG1heC1zdGF0ZW1lbnRzIC0tIFRPRE9cbiAgcGFyc2U6IGZ1bmN0aW9uIChpbnB1dCwgc3RhdGVPdmVycmlkZSwgYmFzZSkge1xuICAgIHZhciB1cmwgPSB0aGlzO1xuICAgIHZhciBzdGF0ZSA9IHN0YXRlT3ZlcnJpZGUgfHwgU0NIRU1FX1NUQVJUO1xuICAgIHZhciBwb2ludGVyID0gMDtcbiAgICB2YXIgYnVmZmVyID0gJyc7XG4gICAgdmFyIHNlZW5BdCA9IGZhbHNlO1xuICAgIHZhciBzZWVuQnJhY2tldCA9IGZhbHNlO1xuICAgIHZhciBzZWVuUGFzc3dvcmRUb2tlbiA9IGZhbHNlO1xuICAgIHZhciBjb2RlUG9pbnRzLCBjaHIsIGJ1ZmZlckNvZGVQb2ludHMsIGZhaWx1cmU7XG5cbiAgICBpbnB1dCA9ICR0b1N0cmluZyhpbnB1dCk7XG5cbiAgICBpZiAoIXN0YXRlT3ZlcnJpZGUpIHtcbiAgICAgIHVybC5zY2hlbWUgPSAnJztcbiAgICAgIHVybC51c2VybmFtZSA9ICcnO1xuICAgICAgdXJsLnBhc3N3b3JkID0gJyc7XG4gICAgICB1cmwuaG9zdCA9IG51bGw7XG4gICAgICB1cmwucG9ydCA9IG51bGw7XG4gICAgICB1cmwucGF0aCA9IFtdO1xuICAgICAgdXJsLnF1ZXJ5ID0gbnVsbDtcbiAgICAgIHVybC5mcmFnbWVudCA9IG51bGw7XG4gICAgICB1cmwuY2Fubm90QmVBQmFzZVVSTCA9IGZhbHNlO1xuICAgICAgaW5wdXQgPSByZXBsYWNlKGlucHV0LCBMRUFESU5HX0MwX0NPTlRST0xfT1JfU1BBQ0UsICcnKTtcbiAgICAgIGlucHV0ID0gcmVwbGFjZShpbnB1dCwgVFJBSUxJTkdfQzBfQ09OVFJPTF9PUl9TUEFDRSwgJyQxJyk7XG4gICAgfVxuXG4gICAgaW5wdXQgPSByZXBsYWNlKGlucHV0LCBUQUJfQU5EX05FV19MSU5FLCAnJyk7XG5cbiAgICBjb2RlUG9pbnRzID0gYXJyYXlGcm9tKGlucHV0KTtcblxuICAgIHdoaWxlIChwb2ludGVyIDw9IGNvZGVQb2ludHMubGVuZ3RoKSB7XG4gICAgICBjaHIgPSBjb2RlUG9pbnRzW3BvaW50ZXJdO1xuICAgICAgc3dpdGNoIChzdGF0ZSkge1xuICAgICAgICBjYXNlIFNDSEVNRV9TVEFSVDpcbiAgICAgICAgICBpZiAoY2hyICYmIGV4ZWMoQUxQSEEsIGNocikpIHtcbiAgICAgICAgICAgIGJ1ZmZlciArPSB0b0xvd2VyQ2FzZShjaHIpO1xuICAgICAgICAgICAgc3RhdGUgPSBTQ0hFTUU7XG4gICAgICAgICAgfSBlbHNlIGlmICghc3RhdGVPdmVycmlkZSkge1xuICAgICAgICAgICAgc3RhdGUgPSBOT19TQ0hFTUU7XG4gICAgICAgICAgICBjb250aW51ZTtcbiAgICAgICAgICB9IGVsc2UgcmV0dXJuIElOVkFMSURfU0NIRU1FO1xuICAgICAgICAgIGJyZWFrO1xuXG4gICAgICAgIGNhc2UgU0NIRU1FOlxuICAgICAgICAgIGlmIChjaHIgJiYgKGV4ZWMoQUxQSEFOVU1FUklDLCBjaHIpIHx8IGNociA9PT0gJysnIHx8IGNociA9PT0gJy0nIHx8IGNociA9PT0gJy4nKSkge1xuICAgICAgICAgICAgYnVmZmVyICs9IHRvTG93ZXJDYXNlKGNocik7XG4gICAgICAgICAgfSBlbHNlIGlmIChjaHIgPT09ICc6Jykge1xuICAgICAgICAgICAgaWYgKHN0YXRlT3ZlcnJpZGUgJiYgKFxuICAgICAgICAgICAgICAodXJsLmlzU3BlY2lhbCgpICE9PSBoYXNPd24oc3BlY2lhbFNjaGVtZXMsIGJ1ZmZlcikpIHx8XG4gICAgICAgICAgICAgIChidWZmZXIgPT09ICdmaWxlJyAmJiAodXJsLmluY2x1ZGVzQ3JlZGVudGlhbHMoKSB8fCB1cmwucG9ydCAhPT0gbnVsbCkpIHx8XG4gICAgICAgICAgICAgICh1cmwuc2NoZW1lID09PSAnZmlsZScgJiYgIXVybC5ob3N0KVxuICAgICAgICAgICAgKSkgcmV0dXJuO1xuICAgICAgICAgICAgdXJsLnNjaGVtZSA9IGJ1ZmZlcjtcbiAgICAgICAgICAgIGlmIChzdGF0ZU92ZXJyaWRlKSB7XG4gICAgICAgICAgICAgIGlmICh1cmwuaXNTcGVjaWFsKCkgJiYgc3BlY2lhbFNjaGVtZXNbdXJsLnNjaGVtZV0gPT09IHVybC5wb3J0KSB1cmwucG9ydCA9IG51bGw7XG4gICAgICAgICAgICAgIHJldHVybjtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGJ1ZmZlciA9ICcnO1xuICAgICAgICAgICAgaWYgKHVybC5zY2hlbWUgPT09ICdmaWxlJykge1xuICAgICAgICAgICAgICBzdGF0ZSA9IEZJTEU7XG4gICAgICAgICAgICB9IGVsc2UgaWYgKHVybC5pc1NwZWNpYWwoKSAmJiBiYXNlICYmIGJhc2Uuc2NoZW1lID09PSB1cmwuc2NoZW1lKSB7XG4gICAgICAgICAgICAgIHN0YXRlID0gU1BFQ0lBTF9SRUxBVElWRV9PUl9BVVRIT1JJVFk7XG4gICAgICAgICAgICB9IGVsc2UgaWYgKHVybC5pc1NwZWNpYWwoKSkge1xuICAgICAgICAgICAgICBzdGF0ZSA9IFNQRUNJQUxfQVVUSE9SSVRZX1NMQVNIRVM7XG4gICAgICAgICAgICB9IGVsc2UgaWYgKGNvZGVQb2ludHNbcG9pbnRlciArIDFdID09PSAnLycpIHtcbiAgICAgICAgICAgICAgc3RhdGUgPSBQQVRIX09SX0FVVEhPUklUWTtcbiAgICAgICAgICAgICAgcG9pbnRlcisrO1xuICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgdXJsLmNhbm5vdEJlQUJhc2VVUkwgPSB0cnVlO1xuICAgICAgICAgICAgICBwdXNoKHVybC5wYXRoLCAnJyk7XG4gICAgICAgICAgICAgIHN0YXRlID0gQ0FOTk9UX0JFX0FfQkFTRV9VUkxfUEFUSDtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICB9IGVsc2UgaWYgKCFzdGF0ZU92ZXJyaWRlKSB7XG4gICAgICAgICAgICBidWZmZXIgPSAnJztcbiAgICAgICAgICAgIHN0YXRlID0gTk9fU0NIRU1FO1xuICAgICAgICAgICAgcG9pbnRlciA9IDA7XG4gICAgICAgICAgICBjb250aW51ZTtcbiAgICAgICAgICB9IGVsc2UgcmV0dXJuIElOVkFMSURfU0NIRU1FO1xuICAgICAgICAgIGJyZWFrO1xuXG4gICAgICAgIGNhc2UgTk9fU0NIRU1FOlxuICAgICAgICAgIGlmICghYmFzZSB8fCAoYmFzZS5jYW5ub3RCZUFCYXNlVVJMICYmIGNociAhPT0gJyMnKSkgcmV0dXJuIElOVkFMSURfU0NIRU1FO1xuICAgICAgICAgIGlmIChiYXNlLmNhbm5vdEJlQUJhc2VVUkwgJiYgY2hyID09PSAnIycpIHtcbiAgICAgICAgICAgIHVybC5zY2hlbWUgPSBiYXNlLnNjaGVtZTtcbiAgICAgICAgICAgIHVybC5wYXRoID0gYXJyYXlTbGljZShiYXNlLnBhdGgpO1xuICAgICAgICAgICAgdXJsLnF1ZXJ5ID0gYmFzZS5xdWVyeTtcbiAgICAgICAgICAgIHVybC5mcmFnbWVudCA9ICcnO1xuICAgICAgICAgICAgdXJsLmNhbm5vdEJlQUJhc2VVUkwgPSB0cnVlO1xuICAgICAgICAgICAgc3RhdGUgPSBGUkFHTUVOVDtcbiAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgIH1cbiAgICAgICAgICBzdGF0ZSA9IGJhc2Uuc2NoZW1lID09PSAnZmlsZScgPyBGSUxFIDogUkVMQVRJVkU7XG4gICAgICAgICAgY29udGludWU7XG5cbiAgICAgICAgY2FzZSBTUEVDSUFMX1JFTEFUSVZFX09SX0FVVEhPUklUWTpcbiAgICAgICAgICBpZiAoY2hyID09PSAnLycgJiYgY29kZVBvaW50c1twb2ludGVyICsgMV0gPT09ICcvJykge1xuICAgICAgICAgICAgc3RhdGUgPSBTUEVDSUFMX0FVVEhPUklUWV9JR05PUkVfU0xBU0hFUztcbiAgICAgICAgICAgIHBvaW50ZXIrKztcbiAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgc3RhdGUgPSBSRUxBVElWRTtcbiAgICAgICAgICAgIGNvbnRpbnVlO1xuICAgICAgICAgIH0gYnJlYWs7XG5cbiAgICAgICAgY2FzZSBQQVRIX09SX0FVVEhPUklUWTpcbiAgICAgICAgICBpZiAoY2hyID09PSAnLycpIHtcbiAgICAgICAgICAgIHN0YXRlID0gQVVUSE9SSVRZO1xuICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgIHN0YXRlID0gUEFUSDtcbiAgICAgICAgICAgIGNvbnRpbnVlO1xuICAgICAgICAgIH1cblxuICAgICAgICBjYXNlIFJFTEFUSVZFOlxuICAgICAgICAgIHVybC5zY2hlbWUgPSBiYXNlLnNjaGVtZTtcbiAgICAgICAgICBpZiAoY2hyID09PSBFT0YpIHtcbiAgICAgICAgICAgIHVybC51c2VybmFtZSA9IGJhc2UudXNlcm5hbWU7XG4gICAgICAgICAgICB1cmwucGFzc3dvcmQgPSBiYXNlLnBhc3N3b3JkO1xuICAgICAgICAgICAgdXJsLmhvc3QgPSBiYXNlLmhvc3Q7XG4gICAgICAgICAgICB1cmwucG9ydCA9IGJhc2UucG9ydDtcbiAgICAgICAgICAgIHVybC5wYXRoID0gYXJyYXlTbGljZShiYXNlLnBhdGgpO1xuICAgICAgICAgICAgdXJsLnF1ZXJ5ID0gYmFzZS5xdWVyeTtcbiAgICAgICAgICB9IGVsc2UgaWYgKGNociA9PT0gJy8nIHx8IChjaHIgPT09ICdcXFxcJyAmJiB1cmwuaXNTcGVjaWFsKCkpKSB7XG4gICAgICAgICAgICBzdGF0ZSA9IFJFTEFUSVZFX1NMQVNIO1xuICAgICAgICAgIH0gZWxzZSBpZiAoY2hyID09PSAnPycpIHtcbiAgICAgICAgICAgIHVybC51c2VybmFtZSA9IGJhc2UudXNlcm5hbWU7XG4gICAgICAgICAgICB1cmwucGFzc3dvcmQgPSBiYXNlLnBhc3N3b3JkO1xuICAgICAgICAgICAgdXJsLmhvc3QgPSBiYXNlLmhvc3Q7XG4gICAgICAgICAgICB1cmwucG9ydCA9IGJhc2UucG9ydDtcbiAgICAgICAgICAgIHVybC5wYXRoID0gYXJyYXlTbGljZShiYXNlLnBhdGgpO1xuICAgICAgICAgICAgdXJsLnF1ZXJ5ID0gJyc7XG4gICAgICAgICAgICBzdGF0ZSA9IFFVRVJZO1xuICAgICAgICAgIH0gZWxzZSBpZiAoY2hyID09PSAnIycpIHtcbiAgICAgICAgICAgIHVybC51c2VybmFtZSA9IGJhc2UudXNlcm5hbWU7XG4gICAgICAgICAgICB1cmwucGFzc3dvcmQgPSBiYXNlLnBhc3N3b3JkO1xuICAgICAgICAgICAgdXJsLmhvc3QgPSBiYXNlLmhvc3Q7XG4gICAgICAgICAgICB1cmwucG9ydCA9IGJhc2UucG9ydDtcbiAgICAgICAgICAgIHVybC5wYXRoID0gYXJyYXlTbGljZShiYXNlLnBhdGgpO1xuICAgICAgICAgICAgdXJsLnF1ZXJ5ID0gYmFzZS5xdWVyeTtcbiAgICAgICAgICAgIHVybC5mcmFnbWVudCA9ICcnO1xuICAgICAgICAgICAgc3RhdGUgPSBGUkFHTUVOVDtcbiAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgdXJsLnVzZXJuYW1lID0gYmFzZS51c2VybmFtZTtcbiAgICAgICAgICAgIHVybC5wYXNzd29yZCA9IGJhc2UucGFzc3dvcmQ7XG4gICAgICAgICAgICB1cmwuaG9zdCA9IGJhc2UuaG9zdDtcbiAgICAgICAgICAgIHVybC5wb3J0ID0gYmFzZS5wb3J0O1xuICAgICAgICAgICAgdXJsLnBhdGggPSBhcnJheVNsaWNlKGJhc2UucGF0aCk7XG4gICAgICAgICAgICB1cmwucGF0aC5sZW5ndGgtLTtcbiAgICAgICAgICAgIHN0YXRlID0gUEFUSDtcbiAgICAgICAgICAgIGNvbnRpbnVlO1xuICAgICAgICAgIH0gYnJlYWs7XG5cbiAgICAgICAgY2FzZSBSRUxBVElWRV9TTEFTSDpcbiAgICAgICAgICBpZiAodXJsLmlzU3BlY2lhbCgpICYmIChjaHIgPT09ICcvJyB8fCBjaHIgPT09ICdcXFxcJykpIHtcbiAgICAgICAgICAgIHN0YXRlID0gU1BFQ0lBTF9BVVRIT1JJVFlfSUdOT1JFX1NMQVNIRVM7XG4gICAgICAgICAgfSBlbHNlIGlmIChjaHIgPT09ICcvJykge1xuICAgICAgICAgICAgc3RhdGUgPSBBVVRIT1JJVFk7XG4gICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgIHVybC51c2VybmFtZSA9IGJhc2UudXNlcm5hbWU7XG4gICAgICAgICAgICB1cmwucGFzc3dvcmQgPSBiYXNlLnBhc3N3b3JkO1xuICAgICAgICAgICAgdXJsLmhvc3QgPSBiYXNlLmhvc3Q7XG4gICAgICAgICAgICB1cmwucG9ydCA9IGJhc2UucG9ydDtcbiAgICAgICAgICAgIHN0YXRlID0gUEFUSDtcbiAgICAgICAgICAgIGNvbnRpbnVlO1xuICAgICAgICAgIH0gYnJlYWs7XG5cbiAgICAgICAgY2FzZSBTUEVDSUFMX0FVVEhPUklUWV9TTEFTSEVTOlxuICAgICAgICAgIHN0YXRlID0gU1BFQ0lBTF9BVVRIT1JJVFlfSUdOT1JFX1NMQVNIRVM7XG4gICAgICAgICAgaWYgKGNociAhPT0gJy8nIHx8IGNoYXJBdChidWZmZXIsIHBvaW50ZXIgKyAxKSAhPT0gJy8nKSBjb250aW51ZTtcbiAgICAgICAgICBwb2ludGVyKys7XG4gICAgICAgICAgYnJlYWs7XG5cbiAgICAgICAgY2FzZSBTUEVDSUFMX0FVVEhPUklUWV9JR05PUkVfU0xBU0hFUzpcbiAgICAgICAgICBpZiAoY2hyICE9PSAnLycgJiYgY2hyICE9PSAnXFxcXCcpIHtcbiAgICAgICAgICAgIHN0YXRlID0gQVVUSE9SSVRZO1xuICAgICAgICAgICAgY29udGludWU7XG4gICAgICAgICAgfSBicmVhaztcblxuICAgICAgICBjYXNlIEFVVEhPUklUWTpcbiAgICAgICAgICBpZiAoY2hyID09PSAnQCcpIHtcbiAgICAgICAgICAgIGlmIChzZWVuQXQpIGJ1ZmZlciA9ICclNDAnICsgYnVmZmVyO1xuICAgICAgICAgICAgc2VlbkF0ID0gdHJ1ZTtcbiAgICAgICAgICAgIGJ1ZmZlckNvZGVQb2ludHMgPSBhcnJheUZyb20oYnVmZmVyKTtcbiAgICAgICAgICAgIGZvciAodmFyIGkgPSAwOyBpIDwgYnVmZmVyQ29kZVBvaW50cy5sZW5ndGg7IGkrKykge1xuICAgICAgICAgICAgICB2YXIgY29kZVBvaW50ID0gYnVmZmVyQ29kZVBvaW50c1tpXTtcbiAgICAgICAgICAgICAgaWYgKGNvZGVQb2ludCA9PT0gJzonICYmICFzZWVuUGFzc3dvcmRUb2tlbikge1xuICAgICAgICAgICAgICAgIHNlZW5QYXNzd29yZFRva2VuID0gdHJ1ZTtcbiAgICAgICAgICAgICAgICBjb250aW51ZTtcbiAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICB2YXIgZW5jb2RlZENvZGVQb2ludHMgPSBwZXJjZW50RW5jb2RlKGNvZGVQb2ludCwgdXNlcmluZm9QZXJjZW50RW5jb2RlU2V0KTtcbiAgICAgICAgICAgICAgaWYgKHNlZW5QYXNzd29yZFRva2VuKSB1cmwucGFzc3dvcmQgKz0gZW5jb2RlZENvZGVQb2ludHM7XG4gICAgICAgICAgICAgIGVsc2UgdXJsLnVzZXJuYW1lICs9IGVuY29kZWRDb2RlUG9pbnRzO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgYnVmZmVyID0gJyc7XG4gICAgICAgICAgfSBlbHNlIGlmIChcbiAgICAgICAgICAgIGNociA9PT0gRU9GIHx8IGNociA9PT0gJy8nIHx8IGNociA9PT0gJz8nIHx8IGNociA9PT0gJyMnIHx8XG4gICAgICAgICAgICAoY2hyID09PSAnXFxcXCcgJiYgdXJsLmlzU3BlY2lhbCgpKVxuICAgICAgICAgICkge1xuICAgICAgICAgICAgaWYgKHNlZW5BdCAmJiBidWZmZXIgPT09ICcnKSByZXR1cm4gSU5WQUxJRF9BVVRIT1JJVFk7XG4gICAgICAgICAgICBwb2ludGVyIC09IGFycmF5RnJvbShidWZmZXIpLmxlbmd0aCArIDE7XG4gICAgICAgICAgICBidWZmZXIgPSAnJztcbiAgICAgICAgICAgIHN0YXRlID0gSE9TVDtcbiAgICAgICAgICB9IGVsc2UgYnVmZmVyICs9IGNocjtcbiAgICAgICAgICBicmVhaztcblxuICAgICAgICBjYXNlIEhPU1Q6XG4gICAgICAgIGNhc2UgSE9TVE5BTUU6XG4gICAgICAgICAgaWYgKHN0YXRlT3ZlcnJpZGUgJiYgdXJsLnNjaGVtZSA9PT0gJ2ZpbGUnKSB7XG4gICAgICAgICAgICBzdGF0ZSA9IEZJTEVfSE9TVDtcbiAgICAgICAgICAgIGNvbnRpbnVlO1xuICAgICAgICAgIH0gZWxzZSBpZiAoY2hyID09PSAnOicgJiYgIXNlZW5CcmFja2V0KSB7XG4gICAgICAgICAgICBpZiAoYnVmZmVyID09PSAnJykgcmV0dXJuIElOVkFMSURfSE9TVDtcbiAgICAgICAgICAgIGZhaWx1cmUgPSB1cmwucGFyc2VIb3N0KGJ1ZmZlcik7XG4gICAgICAgICAgICBpZiAoZmFpbHVyZSkgcmV0dXJuIGZhaWx1cmU7XG4gICAgICAgICAgICBidWZmZXIgPSAnJztcbiAgICAgICAgICAgIHN0YXRlID0gUE9SVDtcbiAgICAgICAgICAgIGlmIChzdGF0ZU92ZXJyaWRlID09PSBIT1NUTkFNRSkgcmV0dXJuO1xuICAgICAgICAgIH0gZWxzZSBpZiAoXG4gICAgICAgICAgICBjaHIgPT09IEVPRiB8fCBjaHIgPT09ICcvJyB8fCBjaHIgPT09ICc/JyB8fCBjaHIgPT09ICcjJyB8fFxuICAgICAgICAgICAgKGNociA9PT0gJ1xcXFwnICYmIHVybC5pc1NwZWNpYWwoKSlcbiAgICAgICAgICApIHtcbiAgICAgICAgICAgIGlmICh1cmwuaXNTcGVjaWFsKCkgJiYgYnVmZmVyID09PSAnJykgcmV0dXJuIElOVkFMSURfSE9TVDtcbiAgICAgICAgICAgIGlmIChzdGF0ZU92ZXJyaWRlICYmIGJ1ZmZlciA9PT0gJycgJiYgKHVybC5pbmNsdWRlc0NyZWRlbnRpYWxzKCkgfHwgdXJsLnBvcnQgIT09IG51bGwpKSByZXR1cm47XG4gICAgICAgICAgICBmYWlsdXJlID0gdXJsLnBhcnNlSG9zdChidWZmZXIpO1xuICAgICAgICAgICAgaWYgKGZhaWx1cmUpIHJldHVybiBmYWlsdXJlO1xuICAgICAgICAgICAgYnVmZmVyID0gJyc7XG4gICAgICAgICAgICBzdGF0ZSA9IFBBVEhfU1RBUlQ7XG4gICAgICAgICAgICBpZiAoc3RhdGVPdmVycmlkZSkgcmV0dXJuO1xuICAgICAgICAgICAgY29udGludWU7XG4gICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgIGlmIChjaHIgPT09ICdbJykgc2VlbkJyYWNrZXQgPSB0cnVlO1xuICAgICAgICAgICAgZWxzZSBpZiAoY2hyID09PSAnXScpIHNlZW5CcmFja2V0ID0gZmFsc2U7XG4gICAgICAgICAgICBidWZmZXIgKz0gY2hyO1xuICAgICAgICAgIH0gYnJlYWs7XG5cbiAgICAgICAgY2FzZSBQT1JUOlxuICAgICAgICAgIGlmIChleGVjKERJR0lULCBjaHIpKSB7XG4gICAgICAgICAgICBidWZmZXIgKz0gY2hyO1xuICAgICAgICAgIH0gZWxzZSBpZiAoXG4gICAgICAgICAgICBjaHIgPT09IEVPRiB8fCBjaHIgPT09ICcvJyB8fCBjaHIgPT09ICc/JyB8fCBjaHIgPT09ICcjJyB8fFxuICAgICAgICAgICAgKGNociA9PT0gJ1xcXFwnICYmIHVybC5pc1NwZWNpYWwoKSkgfHxcbiAgICAgICAgICAgIHN0YXRlT3ZlcnJpZGVcbiAgICAgICAgICApIHtcbiAgICAgICAgICAgIGlmIChidWZmZXIgIT09ICcnKSB7XG4gICAgICAgICAgICAgIHZhciBwb3J0ID0gcGFyc2VJbnQoYnVmZmVyLCAxMCk7XG4gICAgICAgICAgICAgIGlmIChwb3J0ID4gMHhGRkZGKSByZXR1cm4gSU5WQUxJRF9QT1JUO1xuICAgICAgICAgICAgICB1cmwucG9ydCA9ICh1cmwuaXNTcGVjaWFsKCkgJiYgcG9ydCA9PT0gc3BlY2lhbFNjaGVtZXNbdXJsLnNjaGVtZV0pID8gbnVsbCA6IHBvcnQ7XG4gICAgICAgICAgICAgIGJ1ZmZlciA9ICcnO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgaWYgKHN0YXRlT3ZlcnJpZGUpIHJldHVybjtcbiAgICAgICAgICAgIHN0YXRlID0gUEFUSF9TVEFSVDtcbiAgICAgICAgICAgIGNvbnRpbnVlO1xuICAgICAgICAgIH0gZWxzZSByZXR1cm4gSU5WQUxJRF9QT1JUO1xuICAgICAgICAgIGJyZWFrO1xuXG4gICAgICAgIGNhc2UgRklMRTpcbiAgICAgICAgICB1cmwuc2NoZW1lID0gJ2ZpbGUnO1xuICAgICAgICAgIGlmIChjaHIgPT09ICcvJyB8fCBjaHIgPT09ICdcXFxcJykgc3RhdGUgPSBGSUxFX1NMQVNIO1xuICAgICAgICAgIGVsc2UgaWYgKGJhc2UgJiYgYmFzZS5zY2hlbWUgPT09ICdmaWxlJykge1xuICAgICAgICAgICAgc3dpdGNoIChjaHIpIHtcbiAgICAgICAgICAgICAgY2FzZSBFT0Y6XG4gICAgICAgICAgICAgICAgdXJsLmhvc3QgPSBiYXNlLmhvc3Q7XG4gICAgICAgICAgICAgICAgdXJsLnBhdGggPSBhcnJheVNsaWNlKGJhc2UucGF0aCk7XG4gICAgICAgICAgICAgICAgdXJsLnF1ZXJ5ID0gYmFzZS5xdWVyeTtcbiAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgICAgY2FzZSAnPyc6XG4gICAgICAgICAgICAgICAgdXJsLmhvc3QgPSBiYXNlLmhvc3Q7XG4gICAgICAgICAgICAgICAgdXJsLnBhdGggPSBhcnJheVNsaWNlKGJhc2UucGF0aCk7XG4gICAgICAgICAgICAgICAgdXJsLnF1ZXJ5ID0gJyc7XG4gICAgICAgICAgICAgICAgc3RhdGUgPSBRVUVSWTtcbiAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgICAgY2FzZSAnIyc6XG4gICAgICAgICAgICAgICAgdXJsLmhvc3QgPSBiYXNlLmhvc3Q7XG4gICAgICAgICAgICAgICAgdXJsLnBhdGggPSBhcnJheVNsaWNlKGJhc2UucGF0aCk7XG4gICAgICAgICAgICAgICAgdXJsLnF1ZXJ5ID0gYmFzZS5xdWVyeTtcbiAgICAgICAgICAgICAgICB1cmwuZnJhZ21lbnQgPSAnJztcbiAgICAgICAgICAgICAgICBzdGF0ZSA9IEZSQUdNRU5UO1xuICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgICBkZWZhdWx0OlxuICAgICAgICAgICAgICAgIGlmICghc3RhcnRzV2l0aFdpbmRvd3NEcml2ZUxldHRlcihqb2luKGFycmF5U2xpY2UoY29kZVBvaW50cywgcG9pbnRlciksICcnKSkpIHtcbiAgICAgICAgICAgICAgICAgIHVybC5ob3N0ID0gYmFzZS5ob3N0O1xuICAgICAgICAgICAgICAgICAgdXJsLnBhdGggPSBhcnJheVNsaWNlKGJhc2UucGF0aCk7XG4gICAgICAgICAgICAgICAgICB1cmwuc2hvcnRlblBhdGgoKTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgc3RhdGUgPSBQQVRIO1xuICAgICAgICAgICAgICAgIGNvbnRpbnVlO1xuICAgICAgICAgICAgfVxuICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICBzdGF0ZSA9IFBBVEg7XG4gICAgICAgICAgICBjb250aW51ZTtcbiAgICAgICAgICB9IGJyZWFrO1xuXG4gICAgICAgIGNhc2UgRklMRV9TTEFTSDpcbiAgICAgICAgICBpZiAoY2hyID09PSAnLycgfHwgY2hyID09PSAnXFxcXCcpIHtcbiAgICAgICAgICAgIHN0YXRlID0gRklMRV9IT1NUO1xuICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgfVxuICAgICAgICAgIGlmIChiYXNlICYmIGJhc2Uuc2NoZW1lID09PSAnZmlsZScgJiYgIXN0YXJ0c1dpdGhXaW5kb3dzRHJpdmVMZXR0ZXIoam9pbihhcnJheVNsaWNlKGNvZGVQb2ludHMsIHBvaW50ZXIpLCAnJykpKSB7XG4gICAgICAgICAgICBpZiAoaXNXaW5kb3dzRHJpdmVMZXR0ZXIoYmFzZS5wYXRoWzBdLCB0cnVlKSkgcHVzaCh1cmwucGF0aCwgYmFzZS5wYXRoWzBdKTtcbiAgICAgICAgICAgIGVsc2UgdXJsLmhvc3QgPSBiYXNlLmhvc3Q7XG4gICAgICAgICAgfVxuICAgICAgICAgIHN0YXRlID0gUEFUSDtcbiAgICAgICAgICBjb250aW51ZTtcblxuICAgICAgICBjYXNlIEZJTEVfSE9TVDpcbiAgICAgICAgICBpZiAoY2hyID09PSBFT0YgfHwgY2hyID09PSAnLycgfHwgY2hyID09PSAnXFxcXCcgfHwgY2hyID09PSAnPycgfHwgY2hyID09PSAnIycpIHtcbiAgICAgICAgICAgIGlmICghc3RhdGVPdmVycmlkZSAmJiBpc1dpbmRvd3NEcml2ZUxldHRlcihidWZmZXIpKSB7XG4gICAgICAgICAgICAgIHN0YXRlID0gUEFUSDtcbiAgICAgICAgICAgIH0gZWxzZSBpZiAoYnVmZmVyID09PSAnJykge1xuICAgICAgICAgICAgICB1cmwuaG9zdCA9ICcnO1xuICAgICAgICAgICAgICBpZiAoc3RhdGVPdmVycmlkZSkgcmV0dXJuO1xuICAgICAgICAgICAgICBzdGF0ZSA9IFBBVEhfU1RBUlQ7XG4gICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICBmYWlsdXJlID0gdXJsLnBhcnNlSG9zdChidWZmZXIpO1xuICAgICAgICAgICAgICBpZiAoZmFpbHVyZSkgcmV0dXJuIGZhaWx1cmU7XG4gICAgICAgICAgICAgIGlmICh1cmwuaG9zdCA9PT0gJ2xvY2FsaG9zdCcpIHVybC5ob3N0ID0gJyc7XG4gICAgICAgICAgICAgIGlmIChzdGF0ZU92ZXJyaWRlKSByZXR1cm47XG4gICAgICAgICAgICAgIGJ1ZmZlciA9ICcnO1xuICAgICAgICAgICAgICBzdGF0ZSA9IFBBVEhfU1RBUlQ7XG4gICAgICAgICAgICB9IGNvbnRpbnVlO1xuICAgICAgICAgIH0gZWxzZSBidWZmZXIgKz0gY2hyO1xuICAgICAgICAgIGJyZWFrO1xuXG4gICAgICAgIGNhc2UgUEFUSF9TVEFSVDpcbiAgICAgICAgICBpZiAodXJsLmlzU3BlY2lhbCgpKSB7XG4gICAgICAgICAgICBzdGF0ZSA9IFBBVEg7XG4gICAgICAgICAgICBpZiAoY2hyICE9PSAnLycgJiYgY2hyICE9PSAnXFxcXCcpIGNvbnRpbnVlO1xuICAgICAgICAgIH0gZWxzZSBpZiAoIXN0YXRlT3ZlcnJpZGUgJiYgY2hyID09PSAnPycpIHtcbiAgICAgICAgICAgIHVybC5xdWVyeSA9ICcnO1xuICAgICAgICAgICAgc3RhdGUgPSBRVUVSWTtcbiAgICAgICAgICB9IGVsc2UgaWYgKCFzdGF0ZU92ZXJyaWRlICYmIGNociA9PT0gJyMnKSB7XG4gICAgICAgICAgICB1cmwuZnJhZ21lbnQgPSAnJztcbiAgICAgICAgICAgIHN0YXRlID0gRlJBR01FTlQ7XG4gICAgICAgICAgfSBlbHNlIGlmIChjaHIgIT09IEVPRikge1xuICAgICAgICAgICAgc3RhdGUgPSBQQVRIO1xuICAgICAgICAgICAgaWYgKGNociAhPT0gJy8nKSBjb250aW51ZTtcbiAgICAgICAgICB9IGJyZWFrO1xuXG4gICAgICAgIGNhc2UgUEFUSDpcbiAgICAgICAgICBpZiAoXG4gICAgICAgICAgICBjaHIgPT09IEVPRiB8fCBjaHIgPT09ICcvJyB8fFxuICAgICAgICAgICAgKGNociA9PT0gJ1xcXFwnICYmIHVybC5pc1NwZWNpYWwoKSkgfHxcbiAgICAgICAgICAgICghc3RhdGVPdmVycmlkZSAmJiAoY2hyID09PSAnPycgfHwgY2hyID09PSAnIycpKVxuICAgICAgICAgICkge1xuICAgICAgICAgICAgaWYgKGlzRG91YmxlRG90KGJ1ZmZlcikpIHtcbiAgICAgICAgICAgICAgdXJsLnNob3J0ZW5QYXRoKCk7XG4gICAgICAgICAgICAgIGlmIChjaHIgIT09ICcvJyAmJiAhKGNociA9PT0gJ1xcXFwnICYmIHVybC5pc1NwZWNpYWwoKSkpIHtcbiAgICAgICAgICAgICAgICBwdXNoKHVybC5wYXRoLCAnJyk7XG4gICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH0gZWxzZSBpZiAoaXNTaW5nbGVEb3QoYnVmZmVyKSkge1xuICAgICAgICAgICAgICBpZiAoY2hyICE9PSAnLycgJiYgIShjaHIgPT09ICdcXFxcJyAmJiB1cmwuaXNTcGVjaWFsKCkpKSB7XG4gICAgICAgICAgICAgICAgcHVzaCh1cmwucGF0aCwgJycpO1xuICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICBpZiAodXJsLnNjaGVtZSA9PT0gJ2ZpbGUnICYmICF1cmwucGF0aC5sZW5ndGggJiYgaXNXaW5kb3dzRHJpdmVMZXR0ZXIoYnVmZmVyKSkge1xuICAgICAgICAgICAgICAgIGlmICh1cmwuaG9zdCkgdXJsLmhvc3QgPSAnJztcbiAgICAgICAgICAgICAgICBidWZmZXIgPSBjaGFyQXQoYnVmZmVyLCAwKSArICc6JzsgLy8gbm9ybWFsaXplIHdpbmRvd3MgZHJpdmUgbGV0dGVyXG4gICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgcHVzaCh1cmwucGF0aCwgYnVmZmVyKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGJ1ZmZlciA9ICcnO1xuICAgICAgICAgICAgaWYgKHVybC5zY2hlbWUgPT09ICdmaWxlJyAmJiAoY2hyID09PSBFT0YgfHwgY2hyID09PSAnPycgfHwgY2hyID09PSAnIycpKSB7XG4gICAgICAgICAgICAgIHdoaWxlICh1cmwucGF0aC5sZW5ndGggPiAxICYmIHVybC5wYXRoWzBdID09PSAnJykge1xuICAgICAgICAgICAgICAgIHNoaWZ0KHVybC5wYXRoKTtcbiAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfVxuICAgICAgICAgICAgaWYgKGNociA9PT0gJz8nKSB7XG4gICAgICAgICAgICAgIHVybC5xdWVyeSA9ICcnO1xuICAgICAgICAgICAgICBzdGF0ZSA9IFFVRVJZO1xuICAgICAgICAgICAgfSBlbHNlIGlmIChjaHIgPT09ICcjJykge1xuICAgICAgICAgICAgICB1cmwuZnJhZ21lbnQgPSAnJztcbiAgICAgICAgICAgICAgc3RhdGUgPSBGUkFHTUVOVDtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgYnVmZmVyICs9IHBlcmNlbnRFbmNvZGUoY2hyLCBwYXRoUGVyY2VudEVuY29kZVNldCk7XG4gICAgICAgICAgfSBicmVhaztcblxuICAgICAgICBjYXNlIENBTk5PVF9CRV9BX0JBU0VfVVJMX1BBVEg6XG4gICAgICAgICAgaWYgKGNociA9PT0gJz8nKSB7XG4gICAgICAgICAgICB1cmwucXVlcnkgPSAnJztcbiAgICAgICAgICAgIHN0YXRlID0gUVVFUlk7XG4gICAgICAgICAgfSBlbHNlIGlmIChjaHIgPT09ICcjJykge1xuICAgICAgICAgICAgdXJsLmZyYWdtZW50ID0gJyc7XG4gICAgICAgICAgICBzdGF0ZSA9IEZSQUdNRU5UO1xuICAgICAgICAgIH0gZWxzZSBpZiAoY2hyICE9PSBFT0YpIHtcbiAgICAgICAgICAgIHVybC5wYXRoWzBdICs9IHBlcmNlbnRFbmNvZGUoY2hyLCBDMENvbnRyb2xQZXJjZW50RW5jb2RlU2V0KTtcbiAgICAgICAgICB9IGJyZWFrO1xuXG4gICAgICAgIGNhc2UgUVVFUlk6XG4gICAgICAgICAgaWYgKCFzdGF0ZU92ZXJyaWRlICYmIGNociA9PT0gJyMnKSB7XG4gICAgICAgICAgICB1cmwuZnJhZ21lbnQgPSAnJztcbiAgICAgICAgICAgIHN0YXRlID0gRlJBR01FTlQ7XG4gICAgICAgICAgfSBlbHNlIGlmIChjaHIgIT09IEVPRikge1xuICAgICAgICAgICAgaWYgKGNociA9PT0gXCInXCIgJiYgdXJsLmlzU3BlY2lhbCgpKSB1cmwucXVlcnkgKz0gJyUyNyc7XG4gICAgICAgICAgICBlbHNlIGlmIChjaHIgPT09ICcjJykgdXJsLnF1ZXJ5ICs9ICclMjMnO1xuICAgICAgICAgICAgZWxzZSB1cmwucXVlcnkgKz0gcGVyY2VudEVuY29kZShjaHIsIEMwQ29udHJvbFBlcmNlbnRFbmNvZGVTZXQpO1xuICAgICAgICAgIH0gYnJlYWs7XG5cbiAgICAgICAgY2FzZSBGUkFHTUVOVDpcbiAgICAgICAgICBpZiAoY2hyICE9PSBFT0YpIHVybC5mcmFnbWVudCArPSBwZXJjZW50RW5jb2RlKGNociwgZnJhZ21lbnRQZXJjZW50RW5jb2RlU2V0KTtcbiAgICAgICAgICBicmVhaztcbiAgICAgIH1cblxuICAgICAgcG9pbnRlcisrO1xuICAgIH1cbiAgfSxcbiAgLy8gaHR0cHM6Ly91cmwuc3BlYy53aGF0d2cub3JnLyNob3N0LXBhcnNpbmdcbiAgcGFyc2VIb3N0OiBmdW5jdGlvbiAoaW5wdXQpIHtcbiAgICB2YXIgcmVzdWx0LCBjb2RlUG9pbnRzLCBpbmRleDtcbiAgICBpZiAoY2hhckF0KGlucHV0LCAwKSA9PT0gJ1snKSB7XG4gICAgICBpZiAoY2hhckF0KGlucHV0LCBpbnB1dC5sZW5ndGggLSAxKSAhPT0gJ10nKSByZXR1cm4gSU5WQUxJRF9IT1NUO1xuICAgICAgcmVzdWx0ID0gcGFyc2VJUHY2KHN0cmluZ1NsaWNlKGlucHV0LCAxLCAtMSkpO1xuICAgICAgaWYgKCFyZXN1bHQpIHJldHVybiBJTlZBTElEX0hPU1Q7XG4gICAgICB0aGlzLmhvc3QgPSByZXN1bHQ7XG4gICAgLy8gb3BhcXVlIGhvc3RcbiAgICB9IGVsc2UgaWYgKCF0aGlzLmlzU3BlY2lhbCgpKSB7XG4gICAgICBpZiAoZXhlYyhGT1JCSURERU5fSE9TVF9DT0RFX1BPSU5UX0VYQ0xVRElOR19QRVJDRU5ULCBpbnB1dCkpIHJldHVybiBJTlZBTElEX0hPU1Q7XG4gICAgICByZXN1bHQgPSAnJztcbiAgICAgIGNvZGVQb2ludHMgPSBhcnJheUZyb20oaW5wdXQpO1xuICAgICAgZm9yIChpbmRleCA9IDA7IGluZGV4IDwgY29kZVBvaW50cy5sZW5ndGg7IGluZGV4KyspIHtcbiAgICAgICAgcmVzdWx0ICs9IHBlcmNlbnRFbmNvZGUoY29kZVBvaW50c1tpbmRleF0sIEMwQ29udHJvbFBlcmNlbnRFbmNvZGVTZXQpO1xuICAgICAgfVxuICAgICAgdGhpcy5ob3N0ID0gcmVzdWx0O1xuICAgIH0gZWxzZSB7XG4gICAgICBpbnB1dCA9IHRvQVNDSUkoaW5wdXQpO1xuICAgICAgaWYgKGV4ZWMoRk9SQklEREVOX0hPU1RfQ09ERV9QT0lOVCwgaW5wdXQpKSByZXR1cm4gSU5WQUxJRF9IT1NUO1xuICAgICAgcmVzdWx0ID0gcGFyc2VJUHY0KGlucHV0KTtcbiAgICAgIGlmIChyZXN1bHQgPT09IG51bGwpIHJldHVybiBJTlZBTElEX0hPU1Q7XG4gICAgICB0aGlzLmhvc3QgPSByZXN1bHQ7XG4gICAgfVxuICB9LFxuICAvLyBodHRwczovL3VybC5zcGVjLndoYXR3Zy5vcmcvI2Nhbm5vdC1oYXZlLWEtdXNlcm5hbWUtcGFzc3dvcmQtcG9ydFxuICBjYW5ub3RIYXZlVXNlcm5hbWVQYXNzd29yZFBvcnQ6IGZ1bmN0aW9uICgpIHtcbiAgICByZXR1cm4gIXRoaXMuaG9zdCB8fCB0aGlzLmNhbm5vdEJlQUJhc2VVUkwgfHwgdGhpcy5zY2hlbWUgPT09ICdmaWxlJztcbiAgfSxcbiAgLy8gaHR0cHM6Ly91cmwuc3BlYy53aGF0d2cub3JnLyNpbmNsdWRlLWNyZWRlbnRpYWxzXG4gIGluY2x1ZGVzQ3JlZGVudGlhbHM6IGZ1bmN0aW9uICgpIHtcbiAgICByZXR1cm4gdGhpcy51c2VybmFtZSAhPT0gJycgfHwgdGhpcy5wYXNzd29yZCAhPT0gJyc7XG4gIH0sXG4gIC8vIGh0dHBzOi8vdXJsLnNwZWMud2hhdHdnLm9yZy8jaXMtc3BlY2lhbFxuICBpc1NwZWNpYWw6IGZ1bmN0aW9uICgpIHtcbiAgICByZXR1cm4gaGFzT3duKHNwZWNpYWxTY2hlbWVzLCB0aGlzLnNjaGVtZSk7XG4gIH0sXG4gIC8vIGh0dHBzOi8vdXJsLnNwZWMud2hhdHdnLm9yZy8jc2hvcnRlbi1hLXVybHMtcGF0aFxuICBzaG9ydGVuUGF0aDogZnVuY3Rpb24gKCkge1xuICAgIHZhciBwYXRoID0gdGhpcy5wYXRoO1xuICAgIHZhciBwYXRoU2l6ZSA9IHBhdGgubGVuZ3RoO1xuICAgIGlmIChwYXRoU2l6ZSAmJiAodGhpcy5zY2hlbWUgIT09ICdmaWxlJyB8fCBwYXRoU2l6ZSAhPT0gMSB8fCAhaXNXaW5kb3dzRHJpdmVMZXR0ZXIocGF0aFswXSwgdHJ1ZSkpKSB7XG4gICAgICBwYXRoLmxlbmd0aC0tO1xuICAgIH1cbiAgfSxcbiAgLy8gaHR0cHM6Ly91cmwuc3BlYy53aGF0d2cub3JnLyNjb25jZXB0LXVybC1zZXJpYWxpemVyXG4gIHNlcmlhbGl6ZTogZnVuY3Rpb24gKCkge1xuICAgIHZhciB1cmwgPSB0aGlzO1xuICAgIHZhciBzY2hlbWUgPSB1cmwuc2NoZW1lO1xuICAgIHZhciB1c2VybmFtZSA9IHVybC51c2VybmFtZTtcbiAgICB2YXIgcGFzc3dvcmQgPSB1cmwucGFzc3dvcmQ7XG4gICAgdmFyIGhvc3QgPSB1cmwuaG9zdDtcbiAgICB2YXIgcG9ydCA9IHVybC5wb3J0O1xuICAgIHZhciBwYXRoID0gdXJsLnBhdGg7XG4gICAgdmFyIHF1ZXJ5ID0gdXJsLnF1ZXJ5O1xuICAgIHZhciBmcmFnbWVudCA9IHVybC5mcmFnbWVudDtcbiAgICB2YXIgb3V0cHV0ID0gc2NoZW1lICsgJzonO1xuICAgIGlmIChob3N0ICE9PSBudWxsKSB7XG4gICAgICBvdXRwdXQgKz0gJy8vJztcbiAgICAgIGlmICh1cmwuaW5jbHVkZXNDcmVkZW50aWFscygpKSB7XG4gICAgICAgIG91dHB1dCArPSB1c2VybmFtZSArIChwYXNzd29yZCA/ICc6JyArIHBhc3N3b3JkIDogJycpICsgJ0AnO1xuICAgICAgfVxuICAgICAgb3V0cHV0ICs9IHNlcmlhbGl6ZUhvc3QoaG9zdCk7XG4gICAgICBpZiAocG9ydCAhPT0gbnVsbCkgb3V0cHV0ICs9ICc6JyArIHBvcnQ7XG4gICAgfSBlbHNlIGlmIChzY2hlbWUgPT09ICdmaWxlJykgb3V0cHV0ICs9ICcvLyc7XG4gICAgb3V0cHV0ICs9IHVybC5jYW5ub3RCZUFCYXNlVVJMID8gcGF0aFswXSA6IHBhdGgubGVuZ3RoID8gJy8nICsgam9pbihwYXRoLCAnLycpIDogJyc7XG4gICAgaWYgKHF1ZXJ5ICE9PSBudWxsKSBvdXRwdXQgKz0gJz8nICsgcXVlcnk7XG4gICAgaWYgKGZyYWdtZW50ICE9PSBudWxsKSBvdXRwdXQgKz0gJyMnICsgZnJhZ21lbnQ7XG4gICAgcmV0dXJuIG91dHB1dDtcbiAgfSxcbiAgLy8gaHR0cHM6Ly91cmwuc3BlYy53aGF0d2cub3JnLyNkb20tdXJsLWhyZWZcbiAgc2V0SHJlZjogZnVuY3Rpb24gKGhyZWYpIHtcbiAgICB2YXIgZmFpbHVyZSA9IHRoaXMucGFyc2UoaHJlZik7XG4gICAgaWYgKGZhaWx1cmUpIHRocm93IG5ldyBUeXBlRXJyb3IoZmFpbHVyZSk7XG4gICAgdGhpcy5zZWFyY2hQYXJhbXMudXBkYXRlKCk7XG4gIH0sXG4gIC8vIGh0dHBzOi8vdXJsLnNwZWMud2hhdHdnLm9yZy8jZG9tLXVybC1vcmlnaW5cbiAgZ2V0T3JpZ2luOiBmdW5jdGlvbiAoKSB7XG4gICAgdmFyIHNjaGVtZSA9IHRoaXMuc2NoZW1lO1xuICAgIHZhciBwb3J0ID0gdGhpcy5wb3J0O1xuICAgIGlmIChzY2hlbWUgPT09ICdibG9iJykgdHJ5IHtcbiAgICAgIHJldHVybiBuZXcgVVJMQ29uc3RydWN0b3Ioc2NoZW1lLnBhdGhbMF0pLm9yaWdpbjtcbiAgICB9IGNhdGNoIChlcnJvcikge1xuICAgICAgcmV0dXJuICdudWxsJztcbiAgICB9XG4gICAgaWYgKHNjaGVtZSA9PT0gJ2ZpbGUnIHx8ICF0aGlzLmlzU3BlY2lhbCgpKSByZXR1cm4gJ251bGwnO1xuICAgIHJldHVybiBzY2hlbWUgKyAnOi8vJyArIHNlcmlhbGl6ZUhvc3QodGhpcy5ob3N0KSArIChwb3J0ICE9PSBudWxsID8gJzonICsgcG9ydCA6ICcnKTtcbiAgfSxcbiAgLy8gaHR0cHM6Ly91cmwuc3BlYy53aGF0d2cub3JnLyNkb20tdXJsLXByb3RvY29sXG4gIGdldFByb3RvY29sOiBmdW5jdGlvbiAoKSB7XG4gICAgcmV0dXJuIHRoaXMuc2NoZW1lICsgJzonO1xuICB9LFxuICBzZXRQcm90b2NvbDogZnVuY3Rpb24gKHByb3RvY29sKSB7XG4gICAgdGhpcy5wYXJzZSgkdG9TdHJpbmcocHJvdG9jb2wpICsgJzonLCBTQ0hFTUVfU1RBUlQpO1xuICB9LFxuICAvLyBodHRwczovL3VybC5zcGVjLndoYXR3Zy5vcmcvI2RvbS11cmwtdXNlcm5hbWVcbiAgZ2V0VXNlcm5hbWU6IGZ1bmN0aW9uICgpIHtcbiAgICByZXR1cm4gdGhpcy51c2VybmFtZTtcbiAgfSxcbiAgc2V0VXNlcm5hbWU6IGZ1bmN0aW9uICh1c2VybmFtZSkge1xuICAgIHZhciBjb2RlUG9pbnRzID0gYXJyYXlGcm9tKCR0b1N0cmluZyh1c2VybmFtZSkpO1xuICAgIGlmICh0aGlzLmNhbm5vdEhhdmVVc2VybmFtZVBhc3N3b3JkUG9ydCgpKSByZXR1cm47XG4gICAgdGhpcy51c2VybmFtZSA9ICcnO1xuICAgIGZvciAodmFyIGkgPSAwOyBpIDwgY29kZVBvaW50cy5sZW5ndGg7IGkrKykge1xuICAgICAgdGhpcy51c2VybmFtZSArPSBwZXJjZW50RW5jb2RlKGNvZGVQb2ludHNbaV0sIHVzZXJpbmZvUGVyY2VudEVuY29kZVNldCk7XG4gICAgfVxuICB9LFxuICAvLyBodHRwczovL3VybC5zcGVjLndoYXR3Zy5vcmcvI2RvbS11cmwtcGFzc3dvcmRcbiAgZ2V0UGFzc3dvcmQ6IGZ1bmN0aW9uICgpIHtcbiAgICByZXR1cm4gdGhpcy5wYXNzd29yZDtcbiAgfSxcbiAgc2V0UGFzc3dvcmQ6IGZ1bmN0aW9uIChwYXNzd29yZCkge1xuICAgIHZhciBjb2RlUG9pbnRzID0gYXJyYXlGcm9tKCR0b1N0cmluZyhwYXNzd29yZCkpO1xuICAgIGlmICh0aGlzLmNhbm5vdEhhdmVVc2VybmFtZVBhc3N3b3JkUG9ydCgpKSByZXR1cm47XG4gICAgdGhpcy5wYXNzd29yZCA9ICcnO1xuICAgIGZvciAodmFyIGkgPSAwOyBpIDwgY29kZVBvaW50cy5sZW5ndGg7IGkrKykge1xuICAgICAgdGhpcy5wYXNzd29yZCArPSBwZXJjZW50RW5jb2RlKGNvZGVQb2ludHNbaV0sIHVzZXJpbmZvUGVyY2VudEVuY29kZVNldCk7XG4gICAgfVxuICB9LFxuICAvLyBodHRwczovL3VybC5zcGVjLndoYXR3Zy5vcmcvI2RvbS11cmwtaG9zdFxuICBnZXRIb3N0OiBmdW5jdGlvbiAoKSB7XG4gICAgdmFyIGhvc3QgPSB0aGlzLmhvc3Q7XG4gICAgdmFyIHBvcnQgPSB0aGlzLnBvcnQ7XG4gICAgcmV0dXJuIGhvc3QgPT09IG51bGwgPyAnJ1xuICAgICAgOiBwb3J0ID09PSBudWxsID8gc2VyaWFsaXplSG9zdChob3N0KVxuICAgICAgOiBzZXJpYWxpemVIb3N0KGhvc3QpICsgJzonICsgcG9ydDtcbiAgfSxcbiAgc2V0SG9zdDogZnVuY3Rpb24gKGhvc3QpIHtcbiAgICBpZiAodGhpcy5jYW5ub3RCZUFCYXNlVVJMKSByZXR1cm47XG4gICAgdGhpcy5wYXJzZShob3N0LCBIT1NUKTtcbiAgfSxcbiAgLy8gaHR0cHM6Ly91cmwuc3BlYy53aGF0d2cub3JnLyNkb20tdXJsLWhvc3RuYW1lXG4gIGdldEhvc3RuYW1lOiBmdW5jdGlvbiAoKSB7XG4gICAgdmFyIGhvc3QgPSB0aGlzLmhvc3Q7XG4gICAgcmV0dXJuIGhvc3QgPT09IG51bGwgPyAnJyA6IHNlcmlhbGl6ZUhvc3QoaG9zdCk7XG4gIH0sXG4gIHNldEhvc3RuYW1lOiBmdW5jdGlvbiAoaG9zdG5hbWUpIHtcbiAgICBpZiAodGhpcy5jYW5ub3RCZUFCYXNlVVJMKSByZXR1cm47XG4gICAgdGhpcy5wYXJzZShob3N0bmFtZSwgSE9TVE5BTUUpO1xuICB9LFxuICAvLyBodHRwczovL3VybC5zcGVjLndoYXR3Zy5vcmcvI2RvbS11cmwtcG9ydFxuICBnZXRQb3J0OiBmdW5jdGlvbiAoKSB7XG4gICAgdmFyIHBvcnQgPSB0aGlzLnBvcnQ7XG4gICAgcmV0dXJuIHBvcnQgPT09IG51bGwgPyAnJyA6ICR0b1N0cmluZyhwb3J0KTtcbiAgfSxcbiAgc2V0UG9ydDogZnVuY3Rpb24gKHBvcnQpIHtcbiAgICBpZiAodGhpcy5jYW5ub3RIYXZlVXNlcm5hbWVQYXNzd29yZFBvcnQoKSkgcmV0dXJuO1xuICAgIHBvcnQgPSAkdG9TdHJpbmcocG9ydCk7XG4gICAgaWYgKHBvcnQgPT09ICcnKSB0aGlzLnBvcnQgPSBudWxsO1xuICAgIGVsc2UgdGhpcy5wYXJzZShwb3J0LCBQT1JUKTtcbiAgfSxcbiAgLy8gaHR0cHM6Ly91cmwuc3BlYy53aGF0d2cub3JnLyNkb20tdXJsLXBhdGhuYW1lXG4gIGdldFBhdGhuYW1lOiBmdW5jdGlvbiAoKSB7XG4gICAgdmFyIHBhdGggPSB0aGlzLnBhdGg7XG4gICAgcmV0dXJuIHRoaXMuY2Fubm90QmVBQmFzZVVSTCA/IHBhdGhbMF0gOiBwYXRoLmxlbmd0aCA/ICcvJyArIGpvaW4ocGF0aCwgJy8nKSA6ICcnO1xuICB9LFxuICBzZXRQYXRobmFtZTogZnVuY3Rpb24gKHBhdGhuYW1lKSB7XG4gICAgaWYgKHRoaXMuY2Fubm90QmVBQmFzZVVSTCkgcmV0dXJuO1xuICAgIHRoaXMucGF0aCA9IFtdO1xuICAgIHRoaXMucGFyc2UocGF0aG5hbWUsIFBBVEhfU1RBUlQpO1xuICB9LFxuICAvLyBodHRwczovL3VybC5zcGVjLndoYXR3Zy5vcmcvI2RvbS11cmwtc2VhcmNoXG4gIGdldFNlYXJjaDogZnVuY3Rpb24gKCkge1xuICAgIHZhciBxdWVyeSA9IHRoaXMucXVlcnk7XG4gICAgcmV0dXJuIHF1ZXJ5ID8gJz8nICsgcXVlcnkgOiAnJztcbiAgfSxcbiAgc2V0U2VhcmNoOiBmdW5jdGlvbiAoc2VhcmNoKSB7XG4gICAgc2VhcmNoID0gJHRvU3RyaW5nKHNlYXJjaCk7XG4gICAgaWYgKHNlYXJjaCA9PT0gJycpIHtcbiAgICAgIHRoaXMucXVlcnkgPSBudWxsO1xuICAgIH0gZWxzZSB7XG4gICAgICBpZiAoY2hhckF0KHNlYXJjaCwgMCkgPT09ICc/Jykgc2VhcmNoID0gc3RyaW5nU2xpY2Uoc2VhcmNoLCAxKTtcbiAgICAgIHRoaXMucXVlcnkgPSAnJztcbiAgICAgIHRoaXMucGFyc2Uoc2VhcmNoLCBRVUVSWSk7XG4gICAgfVxuICAgIHRoaXMuc2VhcmNoUGFyYW1zLnVwZGF0ZSgpO1xuICB9LFxuICAvLyBodHRwczovL3VybC5zcGVjLndoYXR3Zy5vcmcvI2RvbS11cmwtc2VhcmNocGFyYW1zXG4gIGdldFNlYXJjaFBhcmFtczogZnVuY3Rpb24gKCkge1xuICAgIHJldHVybiB0aGlzLnNlYXJjaFBhcmFtcy5mYWNhZGU7XG4gIH0sXG4gIC8vIGh0dHBzOi8vdXJsLnNwZWMud2hhdHdnLm9yZy8jZG9tLXVybC1oYXNoXG4gIGdldEhhc2g6IGZ1bmN0aW9uICgpIHtcbiAgICB2YXIgZnJhZ21lbnQgPSB0aGlzLmZyYWdtZW50O1xuICAgIHJldHVybiBmcmFnbWVudCA/ICcjJyArIGZyYWdtZW50IDogJyc7XG4gIH0sXG4gIHNldEhhc2g6IGZ1bmN0aW9uIChoYXNoKSB7XG4gICAgaGFzaCA9ICR0b1N0cmluZyhoYXNoKTtcbiAgICBpZiAoaGFzaCA9PT0gJycpIHtcbiAgICAgIHRoaXMuZnJhZ21lbnQgPSBudWxsO1xuICAgICAgcmV0dXJuO1xuICAgIH1cbiAgICBpZiAoY2hhckF0KGhhc2gsIDApID09PSAnIycpIGhhc2ggPSBzdHJpbmdTbGljZShoYXNoLCAxKTtcbiAgICB0aGlzLmZyYWdtZW50ID0gJyc7XG4gICAgdGhpcy5wYXJzZShoYXNoLCBGUkFHTUVOVCk7XG4gIH0sXG4gIHVwZGF0ZTogZnVuY3Rpb24gKCkge1xuICAgIHRoaXMucXVlcnkgPSB0aGlzLnNlYXJjaFBhcmFtcy5zZXJpYWxpemUoKSB8fCBudWxsO1xuICB9XG59O1xuXG4vLyBgVVJMYCBjb25zdHJ1Y3RvclxuLy8gaHR0cHM6Ly91cmwuc3BlYy53aGF0d2cub3JnLyN1cmwtY2xhc3NcbnZhciBVUkxDb25zdHJ1Y3RvciA9IGZ1bmN0aW9uIFVSTCh1cmwgLyogLCBiYXNlICovKSB7XG4gIHZhciB0aGF0ID0gYW5JbnN0YW5jZSh0aGlzLCBVUkxQcm90b3R5cGUpO1xuICB2YXIgYmFzZSA9IHZhbGlkYXRlQXJndW1lbnRzTGVuZ3RoKGFyZ3VtZW50cy5sZW5ndGgsIDEpID4gMSA/IGFyZ3VtZW50c1sxXSA6IHVuZGVmaW5lZDtcbiAgdmFyIHN0YXRlID0gc2V0SW50ZXJuYWxTdGF0ZSh0aGF0LCBuZXcgVVJMU3RhdGUodXJsLCBmYWxzZSwgYmFzZSkpO1xuICBpZiAoIURFU0NSSVBUT1JTKSB7XG4gICAgdGhhdC5ocmVmID0gc3RhdGUuc2VyaWFsaXplKCk7XG4gICAgdGhhdC5vcmlnaW4gPSBzdGF0ZS5nZXRPcmlnaW4oKTtcbiAgICB0aGF0LnByb3RvY29sID0gc3RhdGUuZ2V0UHJvdG9jb2woKTtcbiAgICB0aGF0LnVzZXJuYW1lID0gc3RhdGUuZ2V0VXNlcm5hbWUoKTtcbiAgICB0aGF0LnBhc3N3b3JkID0gc3RhdGUuZ2V0UGFzc3dvcmQoKTtcbiAgICB0aGF0Lmhvc3QgPSBzdGF0ZS5nZXRIb3N0KCk7XG4gICAgdGhhdC5ob3N0bmFtZSA9IHN0YXRlLmdldEhvc3RuYW1lKCk7XG4gICAgdGhhdC5wb3J0ID0gc3RhdGUuZ2V0UG9ydCgpO1xuICAgIHRoYXQucGF0aG5hbWUgPSBzdGF0ZS5nZXRQYXRobmFtZSgpO1xuICAgIHRoYXQuc2VhcmNoID0gc3RhdGUuZ2V0U2VhcmNoKCk7XG4gICAgdGhhdC5zZWFyY2hQYXJhbXMgPSBzdGF0ZS5nZXRTZWFyY2hQYXJhbXMoKTtcbiAgICB0aGF0Lmhhc2ggPSBzdGF0ZS5nZXRIYXNoKCk7XG4gIH1cbn07XG5cbnZhciBVUkxQcm90b3R5cGUgPSBVUkxDb25zdHJ1Y3Rvci5wcm90b3R5cGU7XG5cbnZhciBhY2Nlc3NvckRlc2NyaXB0b3IgPSBmdW5jdGlvbiAoZ2V0dGVyLCBzZXR0ZXIpIHtcbiAgcmV0dXJuIHtcbiAgICBnZXQ6IGZ1bmN0aW9uICgpIHtcbiAgICAgIHJldHVybiBnZXRJbnRlcm5hbFVSTFN0YXRlKHRoaXMpW2dldHRlcl0oKTtcbiAgICB9LFxuICAgIHNldDogc2V0dGVyICYmIGZ1bmN0aW9uICh2YWx1ZSkge1xuICAgICAgcmV0dXJuIGdldEludGVybmFsVVJMU3RhdGUodGhpcylbc2V0dGVyXSh2YWx1ZSk7XG4gICAgfSxcbiAgICBjb25maWd1cmFibGU6IHRydWUsXG4gICAgZW51bWVyYWJsZTogdHJ1ZVxuICB9O1xufTtcblxuaWYgKERFU0NSSVBUT1JTKSB7XG4gIC8vIGBVUkwucHJvdG90eXBlLmhyZWZgIGFjY2Vzc29ycyBwYWlyXG4gIC8vIGh0dHBzOi8vdXJsLnNwZWMud2hhdHdnLm9yZy8jZG9tLXVybC1ocmVmXG4gIGRlZmluZUJ1aWx0SW5BY2Nlc3NvcihVUkxQcm90b3R5cGUsICdocmVmJywgYWNjZXNzb3JEZXNjcmlwdG9yKCdzZXJpYWxpemUnLCAnc2V0SHJlZicpKTtcbiAgLy8gYFVSTC5wcm90b3R5cGUub3JpZ2luYCBnZXR0ZXJcbiAgLy8gaHR0cHM6Ly91cmwuc3BlYy53aGF0d2cub3JnLyNkb20tdXJsLW9yaWdpblxuICBkZWZpbmVCdWlsdEluQWNjZXNzb3IoVVJMUHJvdG90eXBlLCAnb3JpZ2luJywgYWNjZXNzb3JEZXNjcmlwdG9yKCdnZXRPcmlnaW4nKSk7XG4gIC8vIGBVUkwucHJvdG90eXBlLnByb3RvY29sYCBhY2Nlc3NvcnMgcGFpclxuICAvLyBodHRwczovL3VybC5zcGVjLndoYXR3Zy5vcmcvI2RvbS11cmwtcHJvdG9jb2xcbiAgZGVmaW5lQnVpbHRJbkFjY2Vzc29yKFVSTFByb3RvdHlwZSwgJ3Byb3RvY29sJywgYWNjZXNzb3JEZXNjcmlwdG9yKCdnZXRQcm90b2NvbCcsICdzZXRQcm90b2NvbCcpKTtcbiAgLy8gYFVSTC5wcm90b3R5cGUudXNlcm5hbWVgIGFjY2Vzc29ycyBwYWlyXG4gIC8vIGh0dHBzOi8vdXJsLnNwZWMud2hhdHdnLm9yZy8jZG9tLXVybC11c2VybmFtZVxuICBkZWZpbmVCdWlsdEluQWNjZXNzb3IoVVJMUHJvdG90eXBlLCAndXNlcm5hbWUnLCBhY2Nlc3NvckRlc2NyaXB0b3IoJ2dldFVzZXJuYW1lJywgJ3NldFVzZXJuYW1lJykpO1xuICAvLyBgVVJMLnByb3RvdHlwZS5wYXNzd29yZGAgYWNjZXNzb3JzIHBhaXJcbiAgLy8gaHR0cHM6Ly91cmwuc3BlYy53aGF0d2cub3JnLyNkb20tdXJsLXBhc3N3b3JkXG4gIGRlZmluZUJ1aWx0SW5BY2Nlc3NvcihVUkxQcm90b3R5cGUsICdwYXNzd29yZCcsIGFjY2Vzc29yRGVzY3JpcHRvcignZ2V0UGFzc3dvcmQnLCAnc2V0UGFzc3dvcmQnKSk7XG4gIC8vIGBVUkwucHJvdG90eXBlLmhvc3RgIGFjY2Vzc29ycyBwYWlyXG4gIC8vIGh0dHBzOi8vdXJsLnNwZWMud2hhdHdnLm9yZy8jZG9tLXVybC1ob3N0XG4gIGRlZmluZUJ1aWx0SW5BY2Nlc3NvcihVUkxQcm90b3R5cGUsICdob3N0JywgYWNjZXNzb3JEZXNjcmlwdG9yKCdnZXRIb3N0JywgJ3NldEhvc3QnKSk7XG4gIC8vIGBVUkwucHJvdG90eXBlLmhvc3RuYW1lYCBhY2Nlc3NvcnMgcGFpclxuICAvLyBodHRwczovL3VybC5zcGVjLndoYXR3Zy5vcmcvI2RvbS11cmwtaG9zdG5hbWVcbiAgZGVmaW5lQnVpbHRJbkFjY2Vzc29yKFVSTFByb3RvdHlwZSwgJ2hvc3RuYW1lJywgYWNjZXNzb3JEZXNjcmlwdG9yKCdnZXRIb3N0bmFtZScsICdzZXRIb3N0bmFtZScpKTtcbiAgLy8gYFVSTC5wcm90b3R5cGUucG9ydGAgYWNjZXNzb3JzIHBhaXJcbiAgLy8gaHR0cHM6Ly91cmwuc3BlYy53aGF0d2cub3JnLyNkb20tdXJsLXBvcnRcbiAgZGVmaW5lQnVpbHRJbkFjY2Vzc29yKFVSTFByb3RvdHlwZSwgJ3BvcnQnLCBhY2Nlc3NvckRlc2NyaXB0b3IoJ2dldFBvcnQnLCAnc2V0UG9ydCcpKTtcbiAgLy8gYFVSTC5wcm90b3R5cGUucGF0aG5hbWVgIGFjY2Vzc29ycyBwYWlyXG4gIC8vIGh0dHBzOi8vdXJsLnNwZWMud2hhdHdnLm9yZy8jZG9tLXVybC1wYXRobmFtZVxuICBkZWZpbmVCdWlsdEluQWNjZXNzb3IoVVJMUHJvdG90eXBlLCAncGF0aG5hbWUnLCBhY2Nlc3NvckRlc2NyaXB0b3IoJ2dldFBhdGhuYW1lJywgJ3NldFBhdGhuYW1lJykpO1xuICAvLyBgVVJMLnByb3RvdHlwZS5zZWFyY2hgIGFjY2Vzc29ycyBwYWlyXG4gIC8vIGh0dHBzOi8vdXJsLnNwZWMud2hhdHdnLm9yZy8jZG9tLXVybC1zZWFyY2hcbiAgZGVmaW5lQnVpbHRJbkFjY2Vzc29yKFVSTFByb3RvdHlwZSwgJ3NlYXJjaCcsIGFjY2Vzc29yRGVzY3JpcHRvcignZ2V0U2VhcmNoJywgJ3NldFNlYXJjaCcpKTtcbiAgLy8gYFVSTC5wcm90b3R5cGUuc2VhcmNoUGFyYW1zYCBnZXR0ZXJcbiAgLy8gaHR0cHM6Ly91cmwuc3BlYy53aGF0d2cub3JnLyNkb20tdXJsLXNlYXJjaHBhcmFtc1xuICBkZWZpbmVCdWlsdEluQWNjZXNzb3IoVVJMUHJvdG90eXBlLCAnc2VhcmNoUGFyYW1zJywgYWNjZXNzb3JEZXNjcmlwdG9yKCdnZXRTZWFyY2hQYXJhbXMnKSk7XG4gIC8vIGBVUkwucHJvdG90eXBlLmhhc2hgIGFjY2Vzc29ycyBwYWlyXG4gIC8vIGh0dHBzOi8vdXJsLnNwZWMud2hhdHdnLm9yZy8jZG9tLXVybC1oYXNoXG4gIGRlZmluZUJ1aWx0SW5BY2Nlc3NvcihVUkxQcm90b3R5cGUsICdoYXNoJywgYWNjZXNzb3JEZXNjcmlwdG9yKCdnZXRIYXNoJywgJ3NldEhhc2gnKSk7XG59XG5cbi8vIGBVUkwucHJvdG90eXBlLnRvSlNPTmAgbWV0aG9kXG4vLyBodHRwczovL3VybC5zcGVjLndoYXR3Zy5vcmcvI2RvbS11cmwtdG9qc29uXG5kZWZpbmVCdWlsdEluKFVSTFByb3RvdHlwZSwgJ3RvSlNPTicsIGZ1bmN0aW9uIHRvSlNPTigpIHtcbiAgcmV0dXJuIGdldEludGVybmFsVVJMU3RhdGUodGhpcykuc2VyaWFsaXplKCk7XG59LCB7IGVudW1lcmFibGU6IHRydWUgfSk7XG5cbi8vIGBVUkwucHJvdG90eXBlLnRvU3RyaW5nYCBtZXRob2Rcbi8vIGh0dHBzOi8vdXJsLnNwZWMud2hhdHdnLm9yZy8jVVJMLXN0cmluZ2lmaWNhdGlvbi1iZWhhdmlvclxuZGVmaW5lQnVpbHRJbihVUkxQcm90b3R5cGUsICd0b1N0cmluZycsIGZ1bmN0aW9uIHRvU3RyaW5nKCkge1xuICByZXR1cm4gZ2V0SW50ZXJuYWxVUkxTdGF0ZSh0aGlzKS5zZXJpYWxpemUoKTtcbn0sIHsgZW51bWVyYWJsZTogdHJ1ZSB9KTtcblxuaWYgKE5hdGl2ZVVSTCkge1xuICB2YXIgbmF0aXZlQ3JlYXRlT2JqZWN0VVJMID0gTmF0aXZlVVJMLmNyZWF0ZU9iamVjdFVSTDtcbiAgdmFyIG5hdGl2ZVJldm9rZU9iamVjdFVSTCA9IE5hdGl2ZVVSTC5yZXZva2VPYmplY3RVUkw7XG4gIC8vIGBVUkwuY3JlYXRlT2JqZWN0VVJMYCBtZXRob2RcbiAgLy8gaHR0cHM6Ly9kZXZlbG9wZXIubW96aWxsYS5vcmcvZW4tVVMvZG9jcy9XZWIvQVBJL1VSTC9jcmVhdGVPYmplY3RVUkxcbiAgaWYgKG5hdGl2ZUNyZWF0ZU9iamVjdFVSTCkgZGVmaW5lQnVpbHRJbihVUkxDb25zdHJ1Y3RvciwgJ2NyZWF0ZU9iamVjdFVSTCcsIGJpbmQobmF0aXZlQ3JlYXRlT2JqZWN0VVJMLCBOYXRpdmVVUkwpKTtcbiAgLy8gYFVSTC5yZXZva2VPYmplY3RVUkxgIG1ldGhvZFxuICAvLyBodHRwczovL2RldmVsb3Blci5tb3ppbGxhLm9yZy9lbi1VUy9kb2NzL1dlYi9BUEkvVVJML3Jldm9rZU9iamVjdFVSTFxuICBpZiAobmF0aXZlUmV2b2tlT2JqZWN0VVJMKSBkZWZpbmVCdWlsdEluKFVSTENvbnN0cnVjdG9yLCAncmV2b2tlT2JqZWN0VVJMJywgYmluZChuYXRpdmVSZXZva2VPYmplY3RVUkwsIE5hdGl2ZVVSTCkpO1xufVxuXG5zZXRUb1N0cmluZ1RhZyhVUkxDb25zdHJ1Y3RvciwgJ1VSTCcpO1xuXG4kKHsgZ2xvYmFsOiB0cnVlLCBjb25zdHJ1Y3RvcjogdHJ1ZSwgZm9yY2VkOiAhVVNFX05BVElWRV9VUkwsIHNoYW06ICFERVNDUklQVE9SUyB9LCB7XG4gIFVSTDogVVJMQ29uc3RydWN0b3Jcbn0pO1xuIiwiJ3VzZSBzdHJpY3QnO1xuLy8gVE9ETzogUmVtb3ZlIHRoaXMgbW9kdWxlIGZyb20gYGNvcmUtanNANGAgc2luY2UgaXQncyByZXBsYWNlZCB0byBtb2R1bGUgYmVsb3dcbnJlcXVpcmUoJy4uL21vZHVsZXMvd2ViLnVybC5jb25zdHJ1Y3RvcicpO1xuIiwiLy8gVGhlIG1vZHVsZSBjYWNoZVxudmFyIF9fd2VicGFja19tb2R1bGVfY2FjaGVfXyA9IHt9O1xuXG4vLyBUaGUgcmVxdWlyZSBmdW5jdGlvblxuZnVuY3Rpb24gX193ZWJwYWNrX3JlcXVpcmVfXyhtb2R1bGVJZCkge1xuXHQvLyBDaGVjayBpZiBtb2R1bGUgaXMgaW4gY2FjaGVcblx0dmFyIGNhY2hlZE1vZHVsZSA9IF9fd2VicGFja19tb2R1bGVfY2FjaGVfX1ttb2R1bGVJZF07XG5cdGlmIChjYWNoZWRNb2R1bGUgIT09IHVuZGVmaW5lZCkge1xuXHRcdHJldHVybiBjYWNoZWRNb2R1bGUuZXhwb3J0cztcblx0fVxuXHQvLyBDcmVhdGUgYSBuZXcgbW9kdWxlIChhbmQgcHV0IGl0IGludG8gdGhlIGNhY2hlKVxuXHR2YXIgbW9kdWxlID0gX193ZWJwYWNrX21vZHVsZV9jYWNoZV9fW21vZHVsZUlkXSA9IHtcblx0XHQvLyBubyBtb2R1bGUuaWQgbmVlZGVkXG5cdFx0Ly8gbm8gbW9kdWxlLmxvYWRlZCBuZWVkZWRcblx0XHRleHBvcnRzOiB7fVxuXHR9O1xuXG5cdC8vIEV4ZWN1dGUgdGhlIG1vZHVsZSBmdW5jdGlvblxuXHRfX3dlYnBhY2tfbW9kdWxlc19fW21vZHVsZUlkXS5jYWxsKG1vZHVsZS5leHBvcnRzLCBtb2R1bGUsIG1vZHVsZS5leHBvcnRzLCBfX3dlYnBhY2tfcmVxdWlyZV9fKTtcblxuXHQvLyBSZXR1cm4gdGhlIGV4cG9ydHMgb2YgdGhlIG1vZHVsZVxuXHRyZXR1cm4gbW9kdWxlLmV4cG9ydHM7XG59XG5cbi8vIGV4cG9zZSB0aGUgbW9kdWxlcyBvYmplY3QgKF9fd2VicGFja19tb2R1bGVzX18pXG5fX3dlYnBhY2tfcmVxdWlyZV9fLm0gPSBfX3dlYnBhY2tfbW9kdWxlc19fO1xuXG4iLCIvLyBnZXREZWZhdWx0RXhwb3J0IGZ1bmN0aW9uIGZvciBjb21wYXRpYmlsaXR5IHdpdGggbm9uLWhhcm1vbnkgbW9kdWxlc1xuX193ZWJwYWNrX3JlcXVpcmVfXy5uID0gKG1vZHVsZSkgPT4ge1xuXHR2YXIgZ2V0dGVyID0gbW9kdWxlICYmIG1vZHVsZS5fX2VzTW9kdWxlID9cblx0XHQoKSA9PiAobW9kdWxlWydkZWZhdWx0J10pIDpcblx0XHQoKSA9PiAobW9kdWxlKTtcblx0X193ZWJwYWNrX3JlcXVpcmVfXy5kKGdldHRlciwgeyBhOiBnZXR0ZXIgfSk7XG5cdHJldHVybiBnZXR0ZXI7XG59OyIsIi8vIGRlZmluZSBnZXR0ZXIgZnVuY3Rpb25zIGZvciBoYXJtb255IGV4cG9ydHNcbl9fd2VicGFja19yZXF1aXJlX18uZCA9IChleHBvcnRzLCBkZWZpbml0aW9uKSA9PiB7XG5cdGZvcih2YXIga2V5IGluIGRlZmluaXRpb24pIHtcblx0XHRpZihfX3dlYnBhY2tfcmVxdWlyZV9fLm8oZGVmaW5pdGlvbiwga2V5KSAmJiAhX193ZWJwYWNrX3JlcXVpcmVfXy5vKGV4cG9ydHMsIGtleSkpIHtcblx0XHRcdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBrZXksIHsgZW51bWVyYWJsZTogdHJ1ZSwgZ2V0OiBkZWZpbml0aW9uW2tleV0gfSk7XG5cdFx0fVxuXHR9XG59OyIsIl9fd2VicGFja19yZXF1aXJlX18uZiA9IHt9O1xuLy8gVGhpcyBmaWxlIGNvbnRhaW5zIG9ubHkgdGhlIGVudHJ5IGNodW5rLlxuLy8gVGhlIGNodW5rIGxvYWRpbmcgZnVuY3Rpb24gZm9yIGFkZGl0aW9uYWwgY2h1bmtzXG5fX3dlYnBhY2tfcmVxdWlyZV9fLmUgPSAoY2h1bmtJZCkgPT4ge1xuXHRyZXR1cm4gUHJvbWlzZS5hbGwoT2JqZWN0LmtleXMoX193ZWJwYWNrX3JlcXVpcmVfXy5mKS5yZWR1Y2UoKHByb21pc2VzLCBrZXkpID0+IHtcblx0XHRfX3dlYnBhY2tfcmVxdWlyZV9fLmZba2V5XShjaHVua0lkLCBwcm9taXNlcyk7XG5cdFx0cmV0dXJuIHByb21pc2VzO1xuXHR9LCBbXSkpO1xufTsiLCIvLyBUaGlzIGZ1bmN0aW9uIGFsbG93IHRvIHJlZmVyZW5jZSBhc3luYyBjaHVua3Ncbl9fd2VicGFja19yZXF1aXJlX18udSA9IChjaHVua0lkKSA9PiB7XG5cdC8vIHJldHVybiB1cmwgZm9yIGZpbGVuYW1lcyBiYXNlZCBvbiB0ZW1wbGF0ZVxuXHRyZXR1cm4gXCJcIiArIGNodW5rSWQgKyBcIi5qc1wiO1xufTsiLCIvLyBUaGlzIGZ1bmN0aW9uIGFsbG93IHRvIHJlZmVyZW5jZSBhc3luYyBjaHVua3Ncbl9fd2VicGFja19yZXF1aXJlX18ubWluaUNzc0YgPSAoY2h1bmtJZCkgPT4ge1xuXHQvLyByZXR1cm4gdXJsIGZvciBmaWxlbmFtZXMgYmFzZWQgb24gdGVtcGxhdGVcblx0cmV0dXJuIHVuZGVmaW5lZDtcbn07IiwiX193ZWJwYWNrX3JlcXVpcmVfXy5nID0gKGZ1bmN0aW9uKCkge1xuXHRpZiAodHlwZW9mIGdsb2JhbFRoaXMgPT09ICdvYmplY3QnKSByZXR1cm4gZ2xvYmFsVGhpcztcblx0dHJ5IHtcblx0XHRyZXR1cm4gdGhpcyB8fCBuZXcgRnVuY3Rpb24oJ3JldHVybiB0aGlzJykoKTtcblx0fSBjYXRjaCAoZSkge1xuXHRcdGlmICh0eXBlb2Ygd2luZG93ID09PSAnb2JqZWN0JykgcmV0dXJuIHdpbmRvdztcblx0fVxufSkoKTsiLCJfX3dlYnBhY2tfcmVxdWlyZV9fLm8gPSAob2JqLCBwcm9wKSA9PiAoT2JqZWN0LnByb3RvdHlwZS5oYXNPd25Qcm9wZXJ0eS5jYWxsKG9iaiwgcHJvcCkpIiwidmFyIGluUHJvZ3Jlc3MgPSB7fTtcbi8vIGRhdGEtd2VicGFjayBpcyBub3QgdXNlZCBhcyBidWlsZCBoYXMgbm8gdW5pcXVlTmFtZVxuLy8gbG9hZFNjcmlwdCBmdW5jdGlvbiB0byBsb2FkIGEgc2NyaXB0IHZpYSBzY3JpcHQgdGFnXG5fX3dlYnBhY2tfcmVxdWlyZV9fLmwgPSAodXJsLCBkb25lLCBrZXksIGNodW5rSWQpID0+IHtcblx0aWYoaW5Qcm9ncmVzc1t1cmxdKSB7IGluUHJvZ3Jlc3NbdXJsXS5wdXNoKGRvbmUpOyByZXR1cm47IH1cblx0dmFyIHNjcmlwdCwgbmVlZEF0dGFjaDtcblx0aWYoa2V5ICE9PSB1bmRlZmluZWQpIHtcblx0XHR2YXIgc2NyaXB0cyA9IGRvY3VtZW50LmdldEVsZW1lbnRzQnlUYWdOYW1lKFwic2NyaXB0XCIpO1xuXHRcdGZvcih2YXIgaSA9IDA7IGkgPCBzY3JpcHRzLmxlbmd0aDsgaSsrKSB7XG5cdFx0XHR2YXIgcyA9IHNjcmlwdHNbaV07XG5cdFx0XHRpZihzLmdldEF0dHJpYnV0ZShcInNyY1wiKSA9PSB1cmwpIHsgc2NyaXB0ID0gczsgYnJlYWs7IH1cblx0XHR9XG5cdH1cblx0aWYoIXNjcmlwdCkge1xuXHRcdG5lZWRBdHRhY2ggPSB0cnVlO1xuXHRcdHNjcmlwdCA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ3NjcmlwdCcpO1xuXG5cdFx0c2NyaXB0LmNoYXJzZXQgPSAndXRmLTgnO1xuXHRcdHNjcmlwdC50aW1lb3V0ID0gMTIwO1xuXHRcdGlmIChfX3dlYnBhY2tfcmVxdWlyZV9fLm5jKSB7XG5cdFx0XHRzY3JpcHQuc2V0QXR0cmlidXRlKFwibm9uY2VcIiwgX193ZWJwYWNrX3JlcXVpcmVfXy5uYyk7XG5cdFx0fVxuXG5cdFx0c2NyaXB0LnNyYyA9IHVybDtcblx0fVxuXHRpblByb2dyZXNzW3VybF0gPSBbZG9uZV07XG5cdHZhciBvblNjcmlwdENvbXBsZXRlID0gKHByZXYsIGV2ZW50KSA9PiB7XG5cdFx0Ly8gYXZvaWQgbWVtIGxlYWtzIGluIElFLlxuXHRcdHNjcmlwdC5vbmVycm9yID0gc2NyaXB0Lm9ubG9hZCA9IG51bGw7XG5cdFx0Y2xlYXJUaW1lb3V0KHRpbWVvdXQpO1xuXHRcdHZhciBkb25lRm5zID0gaW5Qcm9ncmVzc1t1cmxdO1xuXHRcdGRlbGV0ZSBpblByb2dyZXNzW3VybF07XG5cdFx0c2NyaXB0LnBhcmVudE5vZGUgJiYgc2NyaXB0LnBhcmVudE5vZGUucmVtb3ZlQ2hpbGQoc2NyaXB0KTtcblx0XHRkb25lRm5zICYmIGRvbmVGbnMuZm9yRWFjaCgoZm4pID0+IChmbihldmVudCkpKTtcblx0XHRpZihwcmV2KSByZXR1cm4gcHJldihldmVudCk7XG5cdH07XG5cdHZhciB0aW1lb3V0ID0gc2V0VGltZW91dChvblNjcmlwdENvbXBsZXRlLmJpbmQobnVsbCwgdW5kZWZpbmVkLCB7IHR5cGU6ICd0aW1lb3V0JywgdGFyZ2V0OiBzY3JpcHQgfSksIDEyMDAwMCk7XG5cdHNjcmlwdC5vbmVycm9yID0gb25TY3JpcHRDb21wbGV0ZS5iaW5kKG51bGwsIHNjcmlwdC5vbmVycm9yKTtcblx0c2NyaXB0Lm9ubG9hZCA9IG9uU2NyaXB0Q29tcGxldGUuYmluZChudWxsLCBzY3JpcHQub25sb2FkKTtcblx0bmVlZEF0dGFjaCAmJiBkb2N1bWVudC5oZWFkLmFwcGVuZENoaWxkKHNjcmlwdCk7XG59OyIsIi8vIGRlZmluZSBfX2VzTW9kdWxlIG9uIGV4cG9ydHNcbl9fd2VicGFja19yZXF1aXJlX18uciA9IChleHBvcnRzKSA9PiB7XG5cdGlmKHR5cGVvZiBTeW1ib2wgIT09ICd1bmRlZmluZWQnICYmIFN5bWJvbC50b1N0cmluZ1RhZykge1xuXHRcdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBTeW1ib2wudG9TdHJpbmdUYWcsIHsgdmFsdWU6ICdNb2R1bGUnIH0pO1xuXHR9XG5cdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCAnX19lc01vZHVsZScsIHsgdmFsdWU6IHRydWUgfSk7XG59OyIsInZhciBzY3JpcHRVcmw7XG5pZiAoX193ZWJwYWNrX3JlcXVpcmVfXy5nLmltcG9ydFNjcmlwdHMpIHNjcmlwdFVybCA9IF9fd2VicGFja19yZXF1aXJlX18uZy5sb2NhdGlvbiArIFwiXCI7XG52YXIgZG9jdW1lbnQgPSBfX3dlYnBhY2tfcmVxdWlyZV9fLmcuZG9jdW1lbnQ7XG5pZiAoIXNjcmlwdFVybCAmJiBkb2N1bWVudCkge1xuXHRpZiAoZG9jdW1lbnQuY3VycmVudFNjcmlwdClcblx0XHRzY3JpcHRVcmwgPSBkb2N1bWVudC5jdXJyZW50U2NyaXB0LnNyY1xuXHRpZiAoIXNjcmlwdFVybCkge1xuXHRcdHZhciBzY3JpcHRzID0gZG9jdW1lbnQuZ2V0RWxlbWVudHNCeVRhZ05hbWUoXCJzY3JpcHRcIik7XG5cdFx0aWYoc2NyaXB0cy5sZW5ndGgpIHNjcmlwdFVybCA9IHNjcmlwdHNbc2NyaXB0cy5sZW5ndGggLSAxXS5zcmNcblx0fVxufVxuLy8gV2hlbiBzdXBwb3J0aW5nIGJyb3dzZXJzIHdoZXJlIGFuIGF1dG9tYXRpYyBwdWJsaWNQYXRoIGlzIG5vdCBzdXBwb3J0ZWQgeW91IG11c3Qgc3BlY2lmeSBhbiBvdXRwdXQucHVibGljUGF0aCBtYW51YWxseSB2aWEgY29uZmlndXJhdGlvblxuLy8gb3IgcGFzcyBhbiBlbXB0eSBzdHJpbmcgKFwiXCIpIGFuZCBzZXQgdGhlIF9fd2VicGFja19wdWJsaWNfcGF0aF9fIHZhcmlhYmxlIGZyb20geW91ciBjb2RlIHRvIHVzZSB5b3VyIG93biBsb2dpYy5cbmlmICghc2NyaXB0VXJsKSB0aHJvdyBuZXcgRXJyb3IoXCJBdXRvbWF0aWMgcHVibGljUGF0aCBpcyBub3Qgc3VwcG9ydGVkIGluIHRoaXMgYnJvd3NlclwiKTtcbnNjcmlwdFVybCA9IHNjcmlwdFVybC5yZXBsYWNlKC8jLiokLywgXCJcIikucmVwbGFjZSgvXFw/LiokLywgXCJcIikucmVwbGFjZSgvXFwvW15cXC9dKyQvLCBcIi9cIik7XG5fX3dlYnBhY2tfcmVxdWlyZV9fLnAgPSBzY3JpcHRVcmw7IiwiLy8gbm8gYmFzZVVSSVxuXG4vLyBvYmplY3QgdG8gc3RvcmUgbG9hZGVkIGFuZCBsb2FkaW5nIGNodW5rc1xuLy8gdW5kZWZpbmVkID0gY2h1bmsgbm90IGxvYWRlZCwgbnVsbCA9IGNodW5rIHByZWxvYWRlZC9wcmVmZXRjaGVkXG4vLyBbcmVzb2x2ZSwgcmVqZWN0LCBQcm9taXNlXSA9IGNodW5rIGxvYWRpbmcsIDAgPSBjaHVuayBsb2FkZWRcbnZhciBpbnN0YWxsZWRDaHVua3MgPSB7XG5cdFwibWFpblwiOiAwXG59O1xuXG5fX3dlYnBhY2tfcmVxdWlyZV9fLmYuaiA9IChjaHVua0lkLCBwcm9taXNlcykgPT4ge1xuXHRcdC8vIEpTT05QIGNodW5rIGxvYWRpbmcgZm9yIGphdmFzY3JpcHRcblx0XHR2YXIgaW5zdGFsbGVkQ2h1bmtEYXRhID0gX193ZWJwYWNrX3JlcXVpcmVfXy5vKGluc3RhbGxlZENodW5rcywgY2h1bmtJZCkgPyBpbnN0YWxsZWRDaHVua3NbY2h1bmtJZF0gOiB1bmRlZmluZWQ7XG5cdFx0aWYoaW5zdGFsbGVkQ2h1bmtEYXRhICE9PSAwKSB7IC8vIDAgbWVhbnMgXCJhbHJlYWR5IGluc3RhbGxlZFwiLlxuXG5cdFx0XHQvLyBhIFByb21pc2UgbWVhbnMgXCJjdXJyZW50bHkgbG9hZGluZ1wiLlxuXHRcdFx0aWYoaW5zdGFsbGVkQ2h1bmtEYXRhKSB7XG5cdFx0XHRcdHByb21pc2VzLnB1c2goaW5zdGFsbGVkQ2h1bmtEYXRhWzJdKTtcblx0XHRcdH0gZWxzZSB7XG5cdFx0XHRcdGlmKHRydWUpIHsgLy8gYWxsIGNodW5rcyBoYXZlIEpTXG5cdFx0XHRcdFx0Ly8gc2V0dXAgUHJvbWlzZSBpbiBjaHVuayBjYWNoZVxuXHRcdFx0XHRcdHZhciBwcm9taXNlID0gbmV3IFByb21pc2UoKHJlc29sdmUsIHJlamVjdCkgPT4gKGluc3RhbGxlZENodW5rRGF0YSA9IGluc3RhbGxlZENodW5rc1tjaHVua0lkXSA9IFtyZXNvbHZlLCByZWplY3RdKSk7XG5cdFx0XHRcdFx0cHJvbWlzZXMucHVzaChpbnN0YWxsZWRDaHVua0RhdGFbMl0gPSBwcm9taXNlKTtcblxuXHRcdFx0XHRcdC8vIHN0YXJ0IGNodW5rIGxvYWRpbmdcblx0XHRcdFx0XHR2YXIgdXJsID0gX193ZWJwYWNrX3JlcXVpcmVfXy5wICsgX193ZWJwYWNrX3JlcXVpcmVfXy51KGNodW5rSWQpO1xuXHRcdFx0XHRcdC8vIGNyZWF0ZSBlcnJvciBiZWZvcmUgc3RhY2sgdW53b3VuZCB0byBnZXQgdXNlZnVsIHN0YWNrdHJhY2UgbGF0ZXJcblx0XHRcdFx0XHR2YXIgZXJyb3IgPSBuZXcgRXJyb3IoKTtcblx0XHRcdFx0XHR2YXIgbG9hZGluZ0VuZGVkID0gKGV2ZW50KSA9PiB7XG5cdFx0XHRcdFx0XHRpZihfX3dlYnBhY2tfcmVxdWlyZV9fLm8oaW5zdGFsbGVkQ2h1bmtzLCBjaHVua0lkKSkge1xuXHRcdFx0XHRcdFx0XHRpbnN0YWxsZWRDaHVua0RhdGEgPSBpbnN0YWxsZWRDaHVua3NbY2h1bmtJZF07XG5cdFx0XHRcdFx0XHRcdGlmKGluc3RhbGxlZENodW5rRGF0YSAhPT0gMCkgaW5zdGFsbGVkQ2h1bmtzW2NodW5rSWRdID0gdW5kZWZpbmVkO1xuXHRcdFx0XHRcdFx0XHRpZihpbnN0YWxsZWRDaHVua0RhdGEpIHtcblx0XHRcdFx0XHRcdFx0XHR2YXIgZXJyb3JUeXBlID0gZXZlbnQgJiYgKGV2ZW50LnR5cGUgPT09ICdsb2FkJyA/ICdtaXNzaW5nJyA6IGV2ZW50LnR5cGUpO1xuXHRcdFx0XHRcdFx0XHRcdHZhciByZWFsU3JjID0gZXZlbnQgJiYgZXZlbnQudGFyZ2V0ICYmIGV2ZW50LnRhcmdldC5zcmM7XG5cdFx0XHRcdFx0XHRcdFx0ZXJyb3IubWVzc2FnZSA9ICdMb2FkaW5nIGNodW5rICcgKyBjaHVua0lkICsgJyBmYWlsZWQuXFxuKCcgKyBlcnJvclR5cGUgKyAnOiAnICsgcmVhbFNyYyArICcpJztcblx0XHRcdFx0XHRcdFx0XHRlcnJvci5uYW1lID0gJ0NodW5rTG9hZEVycm9yJztcblx0XHRcdFx0XHRcdFx0XHRlcnJvci50eXBlID0gZXJyb3JUeXBlO1xuXHRcdFx0XHRcdFx0XHRcdGVycm9yLnJlcXVlc3QgPSByZWFsU3JjO1xuXHRcdFx0XHRcdFx0XHRcdGluc3RhbGxlZENodW5rRGF0YVsxXShlcnJvcik7XG5cdFx0XHRcdFx0XHRcdH1cblx0XHRcdFx0XHRcdH1cblx0XHRcdFx0XHR9O1xuXHRcdFx0XHRcdF9fd2VicGFja19yZXF1aXJlX18ubCh1cmwsIGxvYWRpbmdFbmRlZCwgXCJjaHVuay1cIiArIGNodW5rSWQsIGNodW5rSWQpO1xuXHRcdFx0XHR9IGVsc2UgaW5zdGFsbGVkQ2h1bmtzW2NodW5rSWRdID0gMDtcblx0XHRcdH1cblx0XHR9XG59O1xuXG4vLyBubyBwcmVmZXRjaGluZ1xuXG4vLyBubyBwcmVsb2FkZWRcblxuLy8gbm8gSE1SXG5cbi8vIG5vIEhNUiBtYW5pZmVzdFxuXG4vLyBubyBvbiBjaHVua3MgbG9hZGVkXG5cbi8vIGluc3RhbGwgYSBKU09OUCBjYWxsYmFjayBmb3IgY2h1bmsgbG9hZGluZ1xudmFyIHdlYnBhY2tKc29ucENhbGxiYWNrID0gKHBhcmVudENodW5rTG9hZGluZ0Z1bmN0aW9uLCBkYXRhKSA9PiB7XG5cdHZhciBbY2h1bmtJZHMsIG1vcmVNb2R1bGVzLCBydW50aW1lXSA9IGRhdGE7XG5cdC8vIGFkZCBcIm1vcmVNb2R1bGVzXCIgdG8gdGhlIG1vZHVsZXMgb2JqZWN0LFxuXHQvLyB0aGVuIGZsYWcgYWxsIFwiY2h1bmtJZHNcIiBhcyBsb2FkZWQgYW5kIGZpcmUgY2FsbGJhY2tcblx0dmFyIG1vZHVsZUlkLCBjaHVua0lkLCBpID0gMDtcblx0aWYoY2h1bmtJZHMuc29tZSgoaWQpID0+IChpbnN0YWxsZWRDaHVua3NbaWRdICE9PSAwKSkpIHtcblx0XHRmb3IobW9kdWxlSWQgaW4gbW9yZU1vZHVsZXMpIHtcblx0XHRcdGlmKF9fd2VicGFja19yZXF1aXJlX18ubyhtb3JlTW9kdWxlcywgbW9kdWxlSWQpKSB7XG5cdFx0XHRcdF9fd2VicGFja19yZXF1aXJlX18ubVttb2R1bGVJZF0gPSBtb3JlTW9kdWxlc1ttb2R1bGVJZF07XG5cdFx0XHR9XG5cdFx0fVxuXHRcdGlmKHJ1bnRpbWUpIHZhciByZXN1bHQgPSBydW50aW1lKF9fd2VicGFja19yZXF1aXJlX18pO1xuXHR9XG5cdGlmKHBhcmVudENodW5rTG9hZGluZ0Z1bmN0aW9uKSBwYXJlbnRDaHVua0xvYWRpbmdGdW5jdGlvbihkYXRhKTtcblx0Zm9yKDtpIDwgY2h1bmtJZHMubGVuZ3RoOyBpKyspIHtcblx0XHRjaHVua0lkID0gY2h1bmtJZHNbaV07XG5cdFx0aWYoX193ZWJwYWNrX3JlcXVpcmVfXy5vKGluc3RhbGxlZENodW5rcywgY2h1bmtJZCkgJiYgaW5zdGFsbGVkQ2h1bmtzW2NodW5rSWRdKSB7XG5cdFx0XHRpbnN0YWxsZWRDaHVua3NbY2h1bmtJZF1bMF0oKTtcblx0XHR9XG5cdFx0aW5zdGFsbGVkQ2h1bmtzW2NodW5rSWRdID0gMDtcblx0fVxuXG59XG5cbnZhciBjaHVua0xvYWRpbmdHbG9iYWwgPSBzZWxmW1wid2VicGFja0NodW5rXCJdID0gc2VsZltcIndlYnBhY2tDaHVua1wiXSB8fCBbXTtcbmNodW5rTG9hZGluZ0dsb2JhbC5mb3JFYWNoKHdlYnBhY2tKc29ucENhbGxiYWNrLmJpbmQobnVsbCwgMCkpO1xuY2h1bmtMb2FkaW5nR2xvYmFsLnB1c2ggPSB3ZWJwYWNrSnNvbnBDYWxsYmFjay5iaW5kKG51bGwsIGNodW5rTG9hZGluZ0dsb2JhbC5wdXNoLmJpbmQoY2h1bmtMb2FkaW5nR2xvYmFsKSk7IiwiaW1wb3J0ICcuLi8uLi9leGFtcGxlcy9tYWluLmNzcyc7XG5cbmNvbnN0IGNvbmZpZ0ZpbGVOYW1lID0gXCJleHRyZXNfY29uZmlnLmpzb25cIjtcbmNvbnN0IHNjaGVtYUZpbGVOYW1lID0gXCJleHRyZXNfY29uZmlnLnNjaGVtYS5qc29uXCI7XG5cbmZ1bmN0aW9uIGxvYWRKU09OICgpIHtcblxuXHRmZXRjaCggY29uZmlnRmlsZU5hbWUgKVxuXHRcdC50aGVuKCByZXNwb25zZSA9PiB7XG5cdFx0XHRpZiAoICFyZXNwb25zZS5vayApIHtcblx0XHRcdFx0dGhyb3cgbmV3IEVycm9yKCBgRXh0UmVzOiBFcnJvciByZWFkaW5nICcke2NvbmZpZ0ZpbGVOYW1lfSchYCApO1xuXHRcdFx0fVxuXHRcdFx0cmV0dXJuIHJlc3BvbnNlLmpzb24oKTtcblx0XHR9KVxuXHRcdC50aGVuKCBqc29uID0+IGluaXRKU09OKCBqc29uICkgKVxuXHRcdC5jYXRjaCggZXJyb3IgPT4gY29uc29sZS5lcnJvciggZXJyb3IgKSApO1xuXG59XG5cbmltcG9ydCB7IGdldEVQRkZvbGRlck5hbWUgfSBmcm9tICcuLi9jb21tb24nO1xuXG5mdW5jdGlvbiBzdGFydEltcG9ydFNjaGVtYUxpc3RlbmVyICgpIHtcblxuXHQvLyBsaXN0ZW5lciBmb3IgcHJvdmlkaW5nIEpTT04gU0NIRU1BIHRvIEl0ZW1CdWlsZGVyXG5cdHdpbmRvdy5hZGRFdmVudExpc3RlbmVyKFxuXHRcdFwibWVzc2FnZVwiLFxuXHRcdChldmVudCkgPT4ge1xuXG5cdFx0XHR0cnkge1xuXHRcdFx0XHRjb25zdCB7IGNhbGxJZCB9ID0gSlNPTi5wYXJzZShldmVudC5kYXRhKTtcblx0XHRcdFx0aWYgKCBjYWxsSWQgIT09IHVuZGVmaW5lZCAmJiBjYWxsSWQuaW5jbHVkZXMoXCJpbXBvcnRKc29uRGF0YVwiKSApIHtcblxuXHRcdFx0XHRcdGZldGNoKCBzY2hlbWFGaWxlTmFtZSApXG5cdFx0XHRcdFx0XHQudGhlbiggcmVzcG9uc2UgPT4ge1xuXHRcdFx0XHRcdFx0XHRpZiAoICFyZXNwb25zZS5vayApIHtcblx0XHRcdFx0XHRcdFx0XHR0aHJvdyBuZXcgRXJyb3IoIGBFeHRSZXM6IEVycm9yIHJlYWRpbmcgJyR7c2NoZW1hRmlsZU5hbWV9JyFgICk7XG5cdFx0XHRcdFx0XHRcdH1cblx0XHRcdFx0XHRcdFx0cmV0dXJuIHJlc3BvbnNlLmpzb24oKTtcblx0XHRcdFx0XHRcdH0pXG5cdFx0XHRcdFx0XHQudGhlbigganNvblNjaGVtYSA9PiB7XG5cblx0XHRcdFx0XHRcdFx0Y29uc3QgcGFzc19kYXRhID0ge1xuXHRcdFx0XHRcdFx0XHRcdGpzb25TY2hlbWEsXG5cdFx0XHRcdFx0XHRcdFx0Y29uZmlnRmlsZU5hbWU6IGdldEVQRkZvbGRlck5hbWUoKSArICcvJyArIGNvbmZpZ0ZpbGVOYW1lLFxuXHRcdFx0XHRcdFx0XHRcdGNhbGxJZFxuXHRcdFx0XHRcdFx0XHR9O1xuXHRcdFx0XHRcdFx0XHR3aW5kb3cucGFyZW50LnBvc3RNZXNzYWdlKCBKU09OLnN0cmluZ2lmeSggcGFzc19kYXRhICksICcqJyApO1xuXG5cdFx0XHRcdFx0XHR9KVxuXHRcdFx0XHRcdFx0LmNhdGNoKCBlcnJvciA9PiBjb25zb2xlLmVycm9yKCBlcnJvciApICk7XG5cblx0XHRcdFx0fVxuXHRcdFx0fSBjYXRjaCAoZSkge31cblx0XHR9LFxuXHRcdGZhbHNlICk7XG59XG5cbmZ1bmN0aW9uIGluaXRFeHRSZXMgKCkge1xuXHRzdGFydEltcG9ydFNjaGVtYUxpc3RlbmVyKCk7XG5cdGxvYWRKU09OKCk7XG59XG5cblxuaW1wb3J0IHsgYmFzZUluaXRzIH0gZnJvbSAnLi4vLi4vbGlicy9iYXNlSW5pdHMnO1xuaW1wb3J0IHsgY2xlYXJDZmdKc29uLCBhZGRTdGF0dXNWYXJEZWYgfSBmcm9tICcuLi9jb21tb24nO1xuXG4vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vXG4vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vXG4vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vL1xuLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy9cbi8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vL1xuLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vL1xuLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy9cbi8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vXG4vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vL1xuLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy9cbi8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vXG4vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vL1xuLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy9cbi8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vXG4vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vXG4vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy9cbi8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vL1xuLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vL1xuLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vXG4vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vXG4vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vL1xuLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy9cbi8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vXG4vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vL1xuLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vL1xuLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vXG4vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vXG4vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy9cbi8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vXG4vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vL1xuLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy9cbmltcG9ydCB7IHRleHRhcmVhSW5zZXJ0c0Zyb21TY2hlbWEgfSBmcm9tICcuL3RleHRhcmVhSW5zZXJ0cyc7XG4vLy8vLy8vLy8vXG5cbmltcG9ydCB7IFJlc29sdmFibGVQcm9taXNlIH0gZnJvbSAnLi4vY29tbW9uJztcbmxldCBiYXNlSW5pdGlhbGl6ZWQgPSBuZXcgUmVzb2x2YWJsZVByb21pc2UoKTtcbi8vIGxldCBqc29uTG9hZGVkID0gbmV3IFJlc29sdmFibGVQcm9taXNlKCk7XHQvLyBmb3IgSTE4TlxuXG5mdW5jdGlvbiBpbml0SlNPTiAoIGpzb24gKSB7XG5cblx0aWYgKCB0eXBlb2YganNvbiA9PT0gJ3N0cmluZycgKSB7XG5cdFx0dHJ5IHtcblx0XHRcdGpzb24gPSBKU09OLnBhcnNlKCBqc29uLCB0cnVlICk7XG5cdFx0fSBjYXRjaCAoZSkge1xuXHRcdFx0Y29uc29sZS5lcnJvciggYEZvcm1hdC1FcnJvciBpbiBKU09OIGZpbGUgJyR7Y29uZmlnRmlsZU5hbWV9J2AgKTtcblx0XHRcdHJldHVybjtcblx0XHR9XG5cdH1cblx0Ly8ganNvbkxvYWRlZC5yZXNvbHZlUHJvbWlzZSgganNvbiApO1x0Ly8gZm9yIEkxOE5cblxuXHRjb25zdCBjZmcgPSBjbGVhckNmZ0pzb24oIGpzb24gKTtcblxuLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy9cblx0Y29uc3QgYmFzZSA9IG5ldyBiYXNlSW5pdHMoKTtcbi8vLy8vLy8vL1xuLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vL1xuLy8vLy8vLy8vL1xuXHRiYXNlSW5pdGlhbGl6ZWQucmVzb2x2ZVByb21pc2UoIGJhc2UgKTtcblxuXHRpZiAoIGNmZy5kYXRhU2V0dGluZ3MgKSB7XG5cdFx0YmFzZS5kYXRhU2V0dGluZ3MgPSBjZmcuZGF0YVNldHRpbmdzO1xuXHR9XG5cblx0Ly8gbG9hZCBQYXJzZXIgbGF6eSBvciBub3Rcblx0KFxuXG5cdFx0KCBjZmcuZGF0YVNldHRpbmdzICYmIGNmZy5kYXRhU2V0dGluZ3Muc2NvcmluZ1ZhbHMgJiYgY2ZnLmRhdGFTZXR0aW5ncy5zY29yaW5nVmFscy5sZW5ndGg+MCApID9cblx0XHRcdGltcG9ydCggLyogd2VicGFja0NodW5rTmFtZTogXCJzY2VcIiAqLyAnZXhwci1ldmFsJyApLnRoZW4oICh7IFBhcnNlciB9KSA9PiAoeyBQYXJzZXIgfSkgKSA6XG5cdFx0XHRQcm9taXNlLnJlc29sdmUoe30pXG5cblx0KS50aGVuKCBhZGRNb2RzID0+IHtcblxuXHRcdC8vIHRoZXJlIHdpbGwgYmUgc3Vic2VxdWVudCBpbml0c1xuXHRcdGlmICggYmFzZS5mc20gJiYgYmFzZS5mc20uaW5jSW5pdENudCApIHtcblx0XHRcdGJhc2UuZnNtLmluY0luaXRDbnQoKTtcblx0XHR9XG5cbi8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy9cbi8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vL1xuLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy9cbi8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vXG4vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy9cbi8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vL1xuLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy9cbi8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vXG4vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vL1xuLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy9cbi8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vXG4vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vL1xuLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy9cbi8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vXG4vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vXG4vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vXG4vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy9cbi8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vL1xuLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vXG4vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy9cbi8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vXG4vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vL1xuLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy9cbi8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vXG4vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vXG4vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vXG4vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vXG4vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vXG4vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vL1xuLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vL1xuLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy9cblx0XHRjb25zdCBpbyA9IG5ldyB0ZXh0YXJlYUluc2VydHNGcm9tU2NoZW1hKCAnI2NvbnRhaW5lcicsIGNmZywgYmFzZSApO1xuLy8vLy8vLy8vL1xuXG5cdFx0YWRkU3RhdHVzVmFyRGVmKCBpbywganNvbiApO1xuXHRcdGJhc2Uuc2VuZENoYW5nZVN0YXRlKCBpbyApO1xuXG5cblx0XHRpZiAoIGlvLmdldFN0YXRlICkge1xuXHRcdFx0d2luZG93LmdldFN0YXRlID0gaW8uZ2V0U3RhdGUuYmluZChpbyk7XG5cdFx0fVxuXHRcdGlmICggaW8uc2V0U3RhdGUgKSB7XG5cdFx0XHR3aW5kb3cuc2V0U3RhdGUgPSBpby5zZXRTdGF0ZS5iaW5kKGlvKTtcblx0XHR9XG5cblx0XHRpZiAoIGJhc2UuZnNtICYmIGJhc2UuZnNtLmRlY0luaXRDbnQgKSB7XG5cdFx0XHRiYXNlLmZzbS5kZWNJbml0Q250KCk7XG5cdFx0fVxuXHR9KVxufVxuXG5kb2N1bWVudC5hZGRFdmVudExpc3RlbmVyKCBcIkRPTUNvbnRlbnRMb2FkZWRcIiwgaW5pdEV4dFJlcyApO1xuXG4vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy9cblxuLy8gaGFjayBmb3IgSUIgcmVxdWVzdCBcImltcG9ydFZhcmlhYmxlc1wiIGJlZm9yZSBiYXNlIGlzIGluaXRpYWxpemVkXG5cbmZ1bmN0aW9uIHNlbmRWYXJEZWNsIChldmVudCkge1xuXG5cdHRyeSB7XG5cdFx0Y29uc3QgeyBjYWxsSWQgfSA9IEpTT04ucGFyc2UoZXZlbnQuZGF0YSk7XG5cdFx0aWYgKCBjYWxsSWQgIT09IHVuZGVmaW5lZCAmJiBjYWxsSWQuaW5jbHVkZXMoXCJpbXBvcnRWYXJpYWJsZXNcIikgKSB7XG5cdFx0XHQvLyBhbnN3ZXIgbWVzc2FnZSB3aGVuIGJhc2UgaXMgaW5pdGlhbGl6ZWRcblx0XHRcdGJhc2VJbml0aWFsaXplZC5wcm9taXNlLnRoZW4oIGJhc2UgPT4gYmFzZS5mc20uYW5zd2VyVmFyRGVjbFJlcShjYWxsSWQpICk7XG5cdFx0fVxuXHR9IGNhdGNoIChlKSB7fVxuXG59XG5cbmZ1bmN0aW9uIGhhbmRsZUlCZWFybHlWYXJJbXBvcnQgKCkge1xuXHR3aW5kb3cuYWRkRXZlbnRMaXN0ZW5lciggXCJtZXNzYWdlXCIsIHNlbmRWYXJEZWNsLCBmYWxzZSApO1xuXHRiYXNlSW5pdGlhbGl6ZWQucHJvbWlzZS50aGVuKCAoKSA9PiB3aW5kb3cucmVtb3ZlRXZlbnRMaXN0ZW5lciggXCJtZXNzYWdlXCIsIHNlbmRWYXJEZWNsICkgKTtcbn1cblxuaGFuZGxlSUJlYXJseVZhckltcG9ydCgpO1xuXG4vLyAvLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy9cblxuLy8gLy8gSTE4TiBzdXBwb3J0XG5cbi8vIGltcG9ydCB7IGdldEkxOG5EZXNjciB9IGZyb20gJy4uL2NvbW1vbic7XG5cbi8vIGFzeW5jIGZ1bmN0aW9uIHNlbmRJMThuRGVzY3IgKGNhbGxJZCkge1xuXG4vLyBcdGNvbnN0IGpzb24gPSBhd2FpdCBqc29uTG9hZGVkLnByb21pc2U7XG5cbi8vIFx0Y29uc3QgaTE4bkRhdGEgPSBnZXRJMThuRGVzY3IoIGpzb24gKTtcblxuLy8gXHQvLyBTZW5kIE1lc3NhZ2Vcbi8vIFx0Y29uc3QgZGF0YSA9IHtcbi8vIFx0XHRjYWxsSWQsXG4vLyBcdFx0aTE4bkRhdGEsXG4vLyBcdH1cbi8vIFx0YmFzZUluaXRpYWxpemVkLnByb21pc2UudGhlbiggYmFzZSA9PiBiYXNlLmZzbS5wb3N0TWVzc2FnZSggSlNPTi5zdHJpbmdpZnkoIGRhdGEgKSApICk7XG5cbi8vIH1cblxuLy8gLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vXG5cbi8vIGltcG9ydCB7IHBhdGNoQ2ZnSTE4biB9IGZyb20gJy4uL2NvbW1vbic7XG5cbi8vIGFzeW5jIGZ1bmN0aW9uIGxvYWRJMThuICggaTE4biApIHtcblxuLy8gXHQvLyBXZW5uIGpzb24gZ2VsYWRlblxuLy8gXHRjb25zdCBqc29uID0gYXdhaXQganNvbkxvYWRlZC5wcm9taXNlO1xuLy8gXHQvLyBwYXRjaCB0aGUgQ0ZHLUpTT04gd2l0aCB0aGUgSTE4Ti1TdHJpbmdzXG4vLyBcdHBhdGNoQ2ZnSTE4bigganNvbiwgaTE4biApO1xuLy8gLy8gY29uc29sZS5sb2coanNvbik7XG5cbi8vIFx0Ly8gV2VubiBhbGxlcyBmZXJ0aWcgaW5pdGlhbGlzaWVydFxuLy8gXHRjb25zdCBiYXNlID0gYXdhaXQgYmFzZUluaXRpYWxpemVkLnByb21pc2U7XG4vLyBcdGF3YWl0IGJhc2UuZnNtLmdldEluaXREb25lUHJvbWlzZSgpO1xuXG4vLyBcdC8vIGRhbm4gYWxzIG7DpGNoc3RlciBTY2hyaXR0IGRpZSBJMThOLVN0cmluZ3MgbGFkZW5cbi8vIFx0c2V0VGltZW91dCggKCkgPT4ge1xuLy8gXHRcdGJhc2VJbml0aWFsaXplZCA9IG5ldyBSZXNvbHZhYmxlUHJvbWlzZSgpO1xuLy8gXHRcdGpzb25Mb2FkZWQgPSBuZXcgUmVzb2x2YWJsZVByb21pc2UoKTtcbi8vIFx0XHRoYW5kbGVJQmVhcmx5VmFySW1wb3J0KCk7XG5cbi8vIFx0XHRsZXQgc3RhdGUgPSBudWxsO1xuLy8gXHRcdGlmICggd2luZG93LmdldFN0YXRlICkge1xuLy8gXHRcdFx0c3RhdGUgPSB3aW5kb3cuZ2V0U3RhdGUoKTtcbi8vIFx0XHR9XG4vLyBcdFx0aW5pdEpTT04oIGpzb24gKTtcbi8vIFx0XHRpZiAoIHN0YXRlICkge1xuLy8gXHRcdFx0d2luZG93LnNldFN0YXRlKCBzdGF0ZSApO1xuLy8gXHRcdH1cbi8vIFx0fSlcbi8vIH1cblxuLy8gLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vXG5cbi8vIGZ1bmN0aW9uIGkxOG5MaXN0ZW5lciAoZXZlbnQpIHtcblxuLy8gXHR0cnkge1xuLy8gXHRcdGNvbnN0IHsgY2FsbElkLCBpMThuIH0gPSBKU09OLnBhcnNlKGV2ZW50LmRhdGEpO1xuLy8gXHRcdGlmICggY2FsbElkICE9PSB1bmRlZmluZWQgJiYgY2FsbElkLmluY2x1ZGVzKFwiaW1wb3J0STE4blwiKSApIHtcbi8vIFx0XHRcdHNlbmRJMThuRGVzY3IoIGNhbGxJZCApO1xuLy8gXHRcdH0gZWxzZSBpZiAoIGNhbGxJZCAhPT0gdW5kZWZpbmVkICYmIGNhbGxJZC5pbmNsdWRlcyhcInNldEkxOG5cIikgKSB7XG4vLyBcdFx0XHRsb2FkSTE4biggaTE4biApO1xuLy8gXHRcdH1cbi8vIFx0fVxuLy8gXHRjYXRjaCAoZSkge31cblxuLy8gfVxuXG4vLyB3aW5kb3cuYWRkRXZlbnRMaXN0ZW5lciggXCJtZXNzYWdlXCIsIGkxOG5MaXN0ZW5lciwgZmFsc2UgKTtcblxuLy8gLy8gd2luZG93LnNlbmRJMThuRGVzY3IgPSBzZW5kSTE4bkRlc2NyO1xuLy8gLy8gd2luZG93LmxvYWRJMThuID0gbG9hZEkxOG47XG4iXSwibmFtZXMiOlsidGV4dGFyZWFJbnNlcnRzIiwidG9vbGJhck1hdGhPcGVyYXRvcnMiLCJ0b29sYmFyRnJhY3Rpb24iLCJ0b29sYmFyQ29tcGFyaXNvbiIsInRvb2xiYXJQZXJjZW50IiwidG9vbGJhckV1cm8iLCJ0b29sYmFycyIsImNvbXAiLCJtYXRoIiwiZnJhY3QiLCJwZXJjIiwiZXVybyIsInRleHRhcmVhSW5zZXJ0c0Zyb21TY2hlbWEiLCJjb25zdHJ1Y3RvciIsImRpdlNlbGVjdG9yIiwib3B0cyIsImJhc2UiLCJmc20iLCJpbmNJbml0Q250Iiwid2lkdGgiLCJ3aW5kb3ciLCJpbm5lcldpZHRoIiwid1dpZHRoIiwiaGVpZ2h0IiwiaW5uZXJIZWlnaHQiLCJ3SGVpZ2h0IiwidG9vbGJhckNlbGxXaWR0aCIsImRlZnMiLCJ0b29sYmFyRGlyZWN0aW9uIiwiZGl2U3R5bGVzIiwidG9vbGJhckNvbnRhaW5lclN0eWxlcyIsInRvb2xiYXJDZWxsU3R5bGVzIiwidG9vbGJhciIsImRhdGFTZXR0aW5ncyIsInRiIiwiY29uY2F0IiwiZGVjSW5pdENudCIsInNjb3JlRGVmIiwicHJlZiIsInZhcmlhYmxlUHJlZml4IiwicmVzIiwiZXh0cmFjdCIsImNsZWFyQ2ZnSnNvbiIsImpzb24iLCJBcnJheSIsImlzQXJyYXkiLCJtYXAiLCJhIiwiT2JqZWN0IiwiZW50cmllcyIsImZvckVhY2giLCJrIiwidiIsInN1YnN0cmluZyIsImFyZWx2YWxzIiwibWF0Y2giLCJlIiwidmFsdWVzIiwiYWx0cyIsInVuZGVmaW5lZCIsImFzc2lnbiIsInN1Ym9iaiIsIm5ld09iaiIsImlzQmV0d2VlbiIsImlzTnVtVW5pdCIsImRlYnVnQW5kQ29uc29sZU91dCIsInMiLCJkZWJ1Z091dCIsImNvbnNvbGUiLCJlcnJvciIsImFkZFNjb3JpbmciLCJvYmoiLCJQYXJzZXIiLCJhZGRGbmNzIiwiY29tcHV0ZVNjb3JpbmdWYWxzIiwicGFyc2VyIiwiaXNOdWxsIiwiciIsImZsIiwidG9TdHJpbmciLCJSZWdFeHAiLCJzdHJFcXVhbCIsImIiLCJ0b0xvd2VyQ2FzZSIsImZuYyIsImZ1bmN0aW9ucyIsInNjb3JpbmdWYWxzIiwic2NvcmVzIiwidmFyTmFtZXMiLCJrZXlzIiwibGVuZ3RoIiwic3YiLCJjb25kIiwiY29uZGl0aW9uIiwic2F2ZUNvbmQiLCJhbGxWYXJzSW5Db25kIiwibWF0Y2hBbGwiLCJ2biIsInZhcnNlYXJjaCIsInJlcGxhY2UiLCJyZSIsInNlbFZhck5hbWVzIiwiZmlsdGVyIiwiZnJvbSIsInNvbWUiLCJtIiwiaW5jbHVkZXMiLCJwdXNoIiwidmFsIiwicGFyc2UiLCJzY29yZSIsInNjb3JlRGF0IiwiaCIsImMiLCJldmFsdWF0ZSIsIm4iLCJOdW1iZXIiLCJOYU4iLCJzZW5kQ2hhbmdlU3RhdGUiLCJhZGRTdGF0dXNWYXJEZWYiLCJzdGF0dXNWYXJEZWYiLCJzdGF0VmFyTmFtZSIsImdldERlZmF1bHRDaGFuZ2VTdGF0ZSIsInJlYWRSYW5nZUFycmF5IiwicnIiLCJycjIiLCJkcDJpbnB1dFJlZ0V4cCIsInVuaXRSZWdFeHAiLCJ1IiwidHJpbSIsInRvVXBwZXJDYXNlIiwibCIsInBkcCIsImRwIiwidW5pdHMiLCJzcGxpdCIsImpvaW4iLCJpbnB1dFJlZ2V4cCIsImRwMmxhYkZuY0lucHV0UmVnRXhwIiwibmFtIiwibFZGIiwibFQiLCJzdHJUb051bSIsInN0clRvSW50IiwicGFyc2VJbnQiLCJpc05hTiIsInBhcnNlRmxvYXQiLCJSZXNvbHZhYmxlUHJvbWlzZSIsInByb20iLCJQcm9taXNlIiwicmVqIiwicmVzb2x2ZVByb21pc2UiLCJyZWplY3RQcm9taXNlIiwicHJvbWlzZSIsImdldEVQRkZvbGRlck5hbWUiLCJlbXB0eVZhbCIsInJlZ2V4cCIsImxvY2F0aW9uIiwicGF0aG5hbWUiLCJnZXRJMThuRGVzY3IiLCJuYW1lRm5jIiwibmFtZSIsInJlcGxhY2VBbGwiLCJpMThuS2V5c0N0eHMiLCJpMThuRGF0YSIsImtleSIsImN0eCIsImtleVBhcnRzIiwic2hpZnQiLCJhZGQiLCJ0ZXh0IiwiY3VycmtleSIsImRlc2NyIiwiZW50cnkiLCJwb3AiLCJzdGFtbUtleSIsImkiLCJwYXRjaENmZ0kxOG4iLCJpMThuIiwic3RhcnRzV2l0aCIsIm9iamVjdF9lcXVhbHMiLCJmc21TZW5kIiwiYmFzZUluaXRzIiwiZGVmYXVsdHMiLCJjb250YWluZXIiLCJhZGRTZW5kQ2hhbmdlU3RhdGUiLCJzdGFydExpc3RlbmluZ1RvVmFyRGVjbFJlcSIsImRlY2xhcmVWYXJpYWJsZXMiLCJiaW5kIiwic3RhZ2UiLCJLb252YSIsIlN0YWdlIiwic3RhZ2VWTiIsImRvY3VtZW50IiwiYWRkRXZlbnRMaXN0ZW5lciIsImV2IiwicHJldmVudERlZmF1bHQiLCJGU01WYXJzU2VudCIsInBvc3RMb2ciLCJldmVudCIsImRhdGEiLCJpc0RlbW9BbmkiLCJwb3N0TG9nRXZlbnQiLCJwb3N0VmFyaWFibGUiLCJzZXRGU01WYXJpYWJsZSIsInRyaWdnZXJJbnB1dFZhbGlkYXRpb25FdmVudCIsInRyaWdnZXJFdmVudCIsImdldENoYW5nZVN0YXRlIiwiY2FsbCIsIm5ld1N0YXRlIiwiY2hhbmdlU3RhdGUiLCJvbGRDaGFuZ2VTdGF0ZSIsIkZTTVZhcmlhYmxlTmFtZSIsInNjb3JlT2JqIiwib2xkU2NvcmUiLCJzY29yZVZhcmlhYmxlTmFtZSIsInZhckRlZnMiLCJ0eXBldHJhbnMiLCJ2bmFtZSIsInR5cGUiLCJzY29yZURlZlR5cGUiLCJ2ZGVmIiwiZGVmYXVsdFZhbHVlIiwibmFtZWRWYWx1ZXMiLCJ3MSIsIncyIiwiTWF0aCIsIm1pbiIsIm1heCIsIm51bSIsInVuaXRSRSIsInVuaXRPcHQiLCJvckVtcHR5IiwibnVtUkUiLCJkZWxEZWZhdWx0cyIsImRlbEtleXMiLCJiT2JqZWN0IiwibWVyZ2VEZWVwIiwidGFyZ2V0Iiwic291cmNlIiwiaXNPYmplY3QiLCJ0YXJnZXRWYWx1ZSIsInNvdXJjZVZhbHVlIiwieCIsInkiLCJ5MiIsImV2ZXJ5IiwieGUiLCJ5ZSIsInNwbGljZSIsInAiLCJoYXNPd25Qcm9wZXJ0eSIsImdldFhvZkV2ZW50Iiwic2ltWCIsImdldFBvaW50ZXJQb3NpdGlvbiIsImdldFlvZkV2ZW50Iiwic2ltWSIsImdldFBvc09mRXZlbnQiLCJpZ25vcmVFdmVudCIsInNldFN0YXRlUG9zdFByb2MiLCJlbmRBbmkiLCJnZXRBYnNQb3NpdGlvbiIsImVsZW1lbnQiLCJib3giLCJnZXRCb3VuZGluZ0NsaWVudFJlY3QiLCJzY3JvbGxYIiwicGFnZVhPZmZzZXQiLCJzY3JvbGxZIiwicGFnZVlPZmZzZXQiLCJsZWZ0IiwidG9wIiwicmVnZXhDYW5Mb29rQmVoaW5kIiwiaW5kZXhQYXRoIiwiZ2V0UXVlcnlWYXJpYWJsZSIsInVzZXJEZWZJZFBhdGgiLCJ0cmFjZUNvdW50IiwicHJJbml0RG9uZSIsInJlc29sdmUiLCJwcm9jZXNzIiwiZW52IiwiTk9ERV9FTlYiLCJwckluaXREb25lUmVzb2x2ZSIsImluaXREb25lQ250IiwiYndfX2RlYnVnT3V0IiwidmFyaWFibGVOYW1lIiwibmV3VmFsdWUiLCJwb3N0TWVzc2FnZVdpdGhQYXRoc0FuZFRyYWNlQ291bnQiLCJzZXRWYXJpYWJsZSIsInRyYWNlTWVzc2FnZSIsIkpTT04iLCJzdHJpbmdpZnkiLCJtaWNyb2ZpbkV2ZW50IiwicGF5bG9hZCIsInBvc3RNZXNzYWdlIiwicGFyZW50IiwiX19CV19fY2FsbGJhY2siLCJ2YXJpYWJsZSIsInBhcnNlZFVybCIsIlVSTCIsImhyZWYiLCJzZWFyY2hQYXJhbXMiLCJnZXQiLCJkZWNsYXJlVmFyaWFibGVDYWxsYmFjayIsImdldEluaXREb25lUHJvbWlzZSIsImFuc3dlclZhckRlY2xSZXEiLCJjYWxsSWQiLCJ0aGVuIiwidmFyaWFibGVzIiwicGFzc19kYXRhIiwiaW5pdGlhbFZhcmlhYmxlcyIsImxvZyIsInRleHRhcmVhQ29udGFpbmVyIiwib3V0ZXJEaXZTdHlsZXMiLCJvdXRlckRpdiIsImNyZWF0ZUVsZW1lbnQiLCJjbGFzc0xpc3QiLCJzZXRTdHlsZXMiLCJkaXYiLCJxdWVyeVNlbGVjdG9yIiwicGFyZW50Tm9kZSIsInJlcGxhY2VDaGlsZCIsImFwcGVuZENoaWxkIiwiaW5pdERhdGEiLCJpbm5lckhUTUwiLCJldl9pbnB1dCIsImVsIiwic3R5bGVzIiwic3QiLCJzdHlsZSIsImdldFN0YXRlIiwic2V0U3RhdGUiLCJ0ZXh0YXJlYUJhc2UiLCJtdWx0aUxpbmUiLCJzdHJpcFRhZ3MiLCJtYXhsZW5ndGgiLCJleHRyYWN0UmVwbGFjZXMiLCJ0byIsInNldEF0dHJpYnV0ZSIsImV2X2tleWRvd24iLCJ0ZXh0Q29udGVudCIsImlucHV0UkUiLCJzYXZlVmFsdWUiLCJzZXRUaW1lb3V0IiwiZ2V0VGV4dFBvcyIsIm9sZFZhbHVlIiwib2xkRm9jdXNFbGVtSW5kZXgiLCJyZXNjb3JlIiwid2hpY2giLCJrZXlDb2RlIiwidGFiVG9OZXh0SW5wdXRGaWVsZCIsInBhc3RlSHRtbEF0Q2FyZXQiLCJzdG9wUHJvcGFnYXRpb24iLCJkZWxJZkRpdiIsInNhdmVOZXdWYWx1ZSIsInNlbCIsImdldFNlbGVjdGlvbiIsImlucHV0VHlwZSIsImRlbFBvc0VsZW1lbnQiLCJpbnNlcnRlZCIsInNlYXJjaCIsImZvY3VzTm9kZSIsImRlbFBvc1RleHQiLCJjb250YWlucyIsImdldFJhbmdlQXQiLCJyYW5nZUNvdW50IiwicmFuZ2UiLCJjbG9uZVJhbmdlIiwic2V0U3RhcnRCZWZvcmUiLCJjb2xsYXBzZSIsInJlbW92ZUFsbFJhbmdlcyIsImFkZFJhbmdlIiwibm9ybWFsaXplIiwicmVtb3ZlIiwiaXNDb2xsYXBzZWQiLCJmb2N1c09mZnNldCIsInByZXZpb3VzU2libGluZyIsImNsb25lTm9kZSIsInJlc3RvcmVWYWx1ZSIsImxhc3ROb2RlIiwiY2hpbGROb2RlcyIsIm5vZGVUeXBlIiwiTm9kZSIsIlRFWFRfTk9ERSIsImVuZHNXaXRoIiwicG9zIiwic2V0Q3VyUG9zIiwibm9kZSIsIm5leHRTaWJsaW5nIiwidGFnTmFtZSIsInRub2RlIiwiY3JlYXRlVGV4dE5vZGUiLCJ0b1RleHQiLCJodG1sIiwiaW5zZXJ0U3BhY2VzIiwibG9nTmFtZSIsImRlbGV0ZUNvbnRlbnRzIiwiaW5zIiwicHJlU3BhY2UiLCJmcmFnIiwiY3JlYXRlRG9jdW1lbnRGcmFnbWVudCIsImZpcnN0Q2hpbGQiLCJzdGFydEN1clBvcyIsImluc2VydE5vZGUiLCJzZXRTdGFydCIsInNldFN0YXJ0QWZ0ZXIiLCJvZmZzIiwiZm9jdXMiLCJ0b0RlbGV0ZSIsIm5vZGVzIiwiZmluZEluZGV4Iiwib2xkRm9jdXNPZmZzZXQiLCJvZmZzZXQiLCJjcmVhdGVSYW5nZSIsImN1clBvcyIsInByZXZFbG1lbnQiLCJwYXJlbnRFbG1lbnQiLCJFTEVNRU5UX05PREUiLCJwYXJlbnRFbGVtZW50IiwibmV3RWxlbSIsIm5ld1JhbmdlIiwidGV4dFBvcyIsImNsYXNzIiwic3RhdGUiLCJpbnNlcnRzRGVmYXVsdHMiLCJ0b29sYmFyQ2VsbFNwYW5TdHlsZXMiLCJ0b29sYmFyQ29udGFpbmVyIiwibnIiLCJ0b29sYmFyQ2VsbCIsImFjdGl2ZUVsZW1lbnQiLCJpbnNlcnQiLCJpbm5lclNwYW4iLCJkaXNwbGF5IiwiZXh0cmFjdFJlcGxhY2UiLCJjYXB0dXJlIiwiZG9udEluc2VydFJlY3Vyc2l2ZSIsInBub2RlIiwibm9FeHRyYVNwYWNlcyIsImZyYWNfaHRtbCIsImZyYWN0c3ZnIiwiZnJhY19odG1sX3Rvb2xiYXIiLCJ0b29sYmFyTWF0aE9wZXJhdG9yc0ZyYWN0aW9uIiwidG9vbGJhck1hdGhPcGVyYXRvcnNGcmFjdGlvbkNvbXBhcmlzb24iLCJ0b29sYmFyTWF0aE9wZXJhdG9yc0ZyYWN0aW9uUGVyY2VudCIsImNvbmZpZ0ZpbGVOYW1lIiwic2NoZW1hRmlsZU5hbWUiLCJsb2FkSlNPTiIsImZldGNoIiwicmVzcG9uc2UiLCJvayIsIkVycm9yIiwiaW5pdEpTT04iLCJjYXRjaCIsInN0YXJ0SW1wb3J0U2NoZW1hTGlzdGVuZXIiLCJqc29uU2NoZW1hIiwiaW5pdEV4dFJlcyIsImJhc2VJbml0aWFsaXplZCIsImNmZyIsImFkZE1vZHMiLCJpbyIsInNlbmRWYXJEZWNsIiwiaGFuZGxlSUJlYXJseVZhckltcG9ydCIsInJlbW92ZUV2ZW50TGlzdGVuZXIiXSwic291cmNlUm9vdCI6IiJ9