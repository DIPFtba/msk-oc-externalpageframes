(()=>{"use strict";var __webpack_modules__={231:(__unused_webpack_module,__webpack_exports__,__webpack_require__)=>{function clearCfgJson(e){if("object"!=typeof e)return e;if(Array.isArray(e))return e.map((e=>clearCfgJson(e)));const t={};return Object.entries(e).forEach((([e,a])=>{if("___"===e.substring(0,3)){const r=e.match(/^___arelvals_(.*)/);if(r)t[r[1]]=a.map((e=>Object.values(e).map((e=>clearCfgJson(e)))));else{const r=e.match(/^___alt[^_]*_(.*)/);r?void 0!==a&&(t[r[1]]=clearCfgJson(a)):"object"==typeof a&&Object.assign(t,clearCfgJson(a))}}else void 0!==a&&(t[e]=clearCfgJson(a))})),t}function addScoringValsParser(obj){obj.parseScoringVals=function(e){if(e.dataSettings&&e.dataSettings.scoringVals){const t=e.dataSettings.scoringVals,a=(e.dataSettings.variablePrefix,this.scoreDef());if("object"==typeof a){const e=Object.keys(a);e.length>0&&t.forEach((t=>{let a=t.condition;if(a){let r=a;const s=a.matchAll(/\[([^\]]*)]/g);for(const t of s)if(0==t[1].length)console.error("Variablen-Name '[]' in Scoring nicht zulässig");else{const a=new RegExp(t[1],"i"),s=e.filter((e=>e.match(a)));s.length>1?(console.error(`Variablen-Name '[${t[1]}]' in Scoring ist nicht eindeutig`),r=""):0==s.length?(console.error(`Variablen-Name '[${t[1]}]' in Scoring unbekannt`),r=""):r=r.replace(t[0],`res.${s[0]}`)}r&&("scoringVals"in this||(this.scoringVals={}),this.scoringVals[t.val]=r)}}))}}},obj.computeScoringVals=function(res){if(this.scoringVals){let score=null;const scoreDat=Object.entries(this.scoringVals);for(let h=0;null==score&&h<scoreDat.length;h++){const[v,c]=scoreDat[h];try{eval(c)&&(score=v)}catch(e){}}const n=Number(score);res[`S_${this.dataSettings.variablePrefix}`]=null!==score&&NaN!==n?n:score}}}function addStatusVarDef(e,t){if(!e.statusVarDef&&t.dataSettings&&t.dataSettings.variablePrefix){const a=`V_${t.dataSettings.variablePrefix}_Status`;e.statusVarDef=function(){return{[a]:+this.getDefaultChangeState()}}}}__webpack_require__.d(__webpack_exports__,{Qg:()=>clearCfgJson,iq:()=>addStatusVarDef});const readRangeArray=function(e){const t=[];for(const a of e.matchAll(/([0-9]+) *(?:- *([0-9]+))?/g))if(a[2]&&a[1]<a[2]){const e=Number(a[2]);for(let r=Number(a[1]);r<=e;r++)t.push(r)}else t.push(Number(a[1]));return t}}},__webpack_module_cache__={};function __webpack_require__(e){var t=__webpack_module_cache__[e];if(void 0!==t)return t.exports;var a=__webpack_module_cache__[e]={exports:{}};return __webpack_modules__[e](a,a.exports,__webpack_require__),a.exports}__webpack_require__.d=(e,t)=>{for(var a in t)__webpack_require__.o(t,a)&&!__webpack_require__.o(e,a)&&Object.defineProperty(e,a,{enumerable:!0,get:t[a]})},__webpack_require__.o=(e,t)=>Object.prototype.hasOwnProperty.call(e,t);var __webpack_exports__={};(()=>{function e(t,a){if(t===a)return!0;if(!(t instanceof Object&&a instanceof Object))return!1;if(t.constructor!==a.constructor)return!1;if(Array.isArray(a)&&Array.isArray(t)){if(t.length!=a.length)return!1;const r=Array.from(a);return!!t.every((t=>r.some(((a,s)=>!!e(t,a)&&(r.splice(s,1),!0)))))&&0===r.length}for(var r in t)if(t.hasOwnProperty(r)){if(!a.hasOwnProperty(r))return!1;if(t[r]!==a[r]){if("object"!=typeof t[r])return!1;if(!e(t[r],a[r]))return!1}}for(r in a)if(a.hasOwnProperty(r)&&!t.hasOwnProperty(r))return!1;return!0}class t{constructor(){this.indexPath=this.getQueryVariable("indexPath"),this.userDefIdPath=this.getQueryVariable("userDefIdPath"),this.traceCount=0}setFSMVariable(e,t){this.postMessageWithPathsAndTraceCount({setVariable:{variableName:e,newValue:t}})}postLogEvent(e){this.postMessageWithPathsAndTraceCount({traceMessage:e})}triggerEvent(e){this.postMessageWithPathsAndTraceCount({microfinEvent:e})}postMessageWithPathsAndTraceCount(e){try{e.indexPath=this.indexPath,e.userDefIdPath=this.userDefIdPath,e.traceCount=this.traceCount++,window.parent.postMessage(JSON.stringify(e),"*")}catch(e){console.error(e)}}getQueryVariable(e){return new URL(window.location.href).searchParams.get(e)}startListeningToVariableDeclarationRequests(e){window.addEventListener("message",(t=>{try{const{callId:a}=JSON.parse(t.data);if(void 0!==a&&a.includes("importVariables")){const t={initialVariables:e(),callId:a};window.parent.postMessage(JSON.stringify(t),"*")}}catch(e){}}),!1)}debugOut(e){}}class a{constructor(e={}){if(Object.assign(this,{container:null,addSendChangeState:null},e),this.fsm||(this.fsm=new t,this.fsm.startListeningToVariableDeclarationRequests(this.declareVariables.bind(this))),e.container){this.width||(this.width=window.innerWidth),this.height||(this.height=window.innerHeight),this.stage=new Konva.Stage({container:this.container,width:this.width,height:this.height});const e="BW_IB_EXTRES_STAGES";e in window||(window[e]=[]),window[e].push(this.stage)}document.addEventListener("contextmenu",(e=>e.preventDefault())),this.FSMVarsSent={}}postLog(e,t={}){this.stage&&this.stage.isDemoAni||this.fsm.postLogEvent(Object.assign({},t,{event:e}))}postVariable(e,t){this.FSMVarsSent[e]=t,this.fsm.setFSMVariable(e,t)}triggerInputValidationEvent(){this.fsm.triggerEvent&&(this.dataSettings&&this.dataSettings.variablePrefix&&this.fsm.triggerEvent("ev_InputValidation_"+this.dataSettings.variablePrefix),this.fsm.triggerEvent("ev_InputValidation_ExtRes"))}getChangeState(e){return e.statusVarDef?e.statusVarDef.call(e):+e.getDefaultChangeState()}sendChangeState(t,a=null){if(t.stage&&t.stage.isDemoAni)return;const r=null===a?this.getChangeState(t):a;if(void 0===t.oldChangeState||!e(r,t.oldChangeState)){if("object"==typeof r)for(let e in r)"object"==typeof t.oldChangeState&&r[e]===t.oldChangeState[e]||this.postVariable(e,r[e]);else t.FSMVariableName&&this.postVariable(`V_Status_${t.FSMVariableName}`,+r);t.oldChangeState=r}if(t.scoreDef){const a=t.scoreDef.call(t);if(void 0===t.oldScore||!e(a,t.oldScore))if("object"==typeof a)for(let e in a)"object"==typeof t.oldScore&&a[e]===t.oldScore[e]||this.postVariable(e,a[e]);else(t.FSMVariableName||t.scoreVariableName)&&void 0!==a&&this.postVariable(t.scoreVariableName||`V_Score_${t.FSMVariableName}`,a);t.oldScore=a}"function"==typeof this.addSendChangeState&&this.addSendChangeState()}declareVariables(){const e=[],t={string:"String",number:"Integer"};for(const a in this.FSMVarsSent){const r=this.FSMVarsSent[a],s={name:a,type:null===r?"Integer":t[typeof r],defaultValue:r,namedValues:[]};e.push(s)}return e}}var r=__webpack_require__(231);const s="extres_cfg.json",n=`ExtRes: Error reading '${s}'!`;document.addEventListener("DOMContentLoaded",(function(){const e=new XMLHttpRequest;e.open("GET",s,!0),e.onload=()=>{4===e.readyState&&(200===e.status?function(e){if("string"==typeof e)try{e=JSON.parse(e,!0)}catch(e){return void console.error(`Format-Error in JSON file '${s}'`)}const t=(0,r.Qg)(e),n=new a({container:"container"});t.dataSettings&&(n.dataSettings=t.dataSettings),(0,r.iq)(io,e),window.getState=io.getState.bind(io),window.setState=io.setState.bind(io)}(e.responseText):console.error(n))},e.onerror=()=>console.error(n),e.send(null)}))})()})();