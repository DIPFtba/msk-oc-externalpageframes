(()=>{"use strict";var t,e={},s={};function i(t){var n=s[t];if(void 0!==n)return n.exports;var o=s[t]={exports:{}};return e[t](o,o.exports,i),o.exports}function n(t,e,s){return t>=Math.min(e,s)&&t<=Math.max(e,s)}function o(t,e,s,i,n){const o=`0*${e}(?:[,.]0*)?`,a=new RegExp(`^(?:${i?`${o}(?: *${s})?|(?:${s} *)?${o}`:`${o} *${s}|${s} *${o}`})${n?"?":""}$`);return t.trim().match(a)}function a(t,e){const s=t=>t&&"object"==typeof t;return s(t)&&s(e)?(Object.keys(e).forEach((i=>{const n=t[i],o=e[i];Array.isArray(o)?t[i]=o:s(n)&&s(o)?t[i]=a(Object.assign({},n),o):t[i]=o})),t):e}function r(t,e){if(t===e)return!0;if(!(t instanceof Object&&e instanceof Object))return!1;if(t.constructor!==e.constructor)return!1;if(Array.isArray(e)&&Array.isArray(t)){if(t.length!=e.length)return!1;const s=Array.from(e);return!!t.every((t=>s.some(((e,i)=>!!r(t,e)&&(s.splice(i,1),!0)))))&&0===s.length}for(var s in t)if(t.hasOwnProperty(s)){if(!e.hasOwnProperty(s))return!1;if(t[s]!==e[s]){if("object"!=typeof t[s])return!1;if(!r(t[s],e[s]))return!1}}for(s in e)if(e.hasOwnProperty(s)&&!t.hasOwnProperty(s))return!1;return!0}i.m=e,i.d=(t,e)=>{for(var s in e)i.o(e,s)&&!i.o(t,s)&&Object.defineProperty(t,s,{enumerable:!0,get:e[s]})},i.f={},i.e=t=>Promise.all(Object.keys(i.f).reduce(((e,s)=>(i.f[s](t,e),e)),[])),i.u=t=>"sce.js",i.miniCssF=t=>{},i.g=function(){if("object"==typeof globalThis)return globalThis;try{return this||new Function("return this")()}catch(t){if("object"==typeof window)return window}}(),i.o=(t,e)=>Object.prototype.hasOwnProperty.call(t,e),t={},i.l=(e,s,n,o)=>{if(t[e])t[e].push(s);else{var a,r;if(void 0!==n)for(var l=document.getElementsByTagName("script"),c=0;c<l.length;c++){var d=l[c];if(d.getAttribute("src")==e){a=d;break}}a||(r=!0,(a=document.createElement("script")).charset="utf-8",a.timeout=120,i.nc&&a.setAttribute("nonce",i.nc),a.src=e),t[e]=[s];var h=(s,i)=>{a.onerror=a.onload=null,clearTimeout(u);var n=t[e];if(delete t[e],a.parentNode&&a.parentNode.removeChild(a),n&&n.forEach((t=>t(i))),s)return s(i)},u=setTimeout(h.bind(null,void 0,{type:"timeout",target:a}),12e4);a.onerror=h.bind(null,a.onerror),a.onload=h.bind(null,a.onload),r&&document.head.appendChild(a)}},i.r=t=>{"undefined"!=typeof Symbol&&Symbol.toStringTag&&Object.defineProperty(t,Symbol.toStringTag,{value:"Module"}),Object.defineProperty(t,"__esModule",{value:!0})},(()=>{var t;i.g.importScripts&&(t=i.g.location+"");var e=i.g.document;if(!t&&e&&(e.currentScript&&(t=e.currentScript.src),!t)){var s=e.getElementsByTagName("script");s.length&&(t=s[s.length-1].src)}if(!t)throw new Error("Automatic publicPath is not supported in this browser");t=t.replace(/#.*$/,"").replace(/\?.*$/,"").replace(/\/[^\/]+$/,"/"),i.p=t})(),(()=>{var t={179:0};i.f.j=(e,s)=>{var n=i.o(t,e)?t[e]:void 0;if(0!==n)if(n)s.push(n[2]);else{var o=new Promise(((s,i)=>n=t[e]=[s,i]));s.push(n[2]=o);var a=i.p+i.u(e),r=new Error;i.l(a,(s=>{if(i.o(t,e)&&(0!==(n=t[e])&&(t[e]=void 0),n)){var o=s&&("load"===s.type?"missing":s.type),a=s&&s.target&&s.target.src;r.message="Loading chunk "+e+" failed.\n("+o+": "+a+")",r.name="ChunkLoadError",r.type=o,r.request=a,n[1](r)}}),"chunk-"+e,e)}};var e=(e,s)=>{var n,o,[a,r,l]=s,c=0;if(a.some((e=>0!==t[e]))){for(n in r)i.o(r,n)&&(i.m[n]=r[n]);l&&l(i)}for(e&&e(s);c<a.length;c++)o=a[c],i.o(t,o)&&t[o]&&t[o][0](),t[o]=0},s=self.webpackChunk=self.webpackChunk||[];s.forEach(e.bind(null,0)),s.push=e.bind(null,s.push.bind(s))})();class l{constructor(){this.indexPath=this.getQueryVariable("indexPath"),this.userDefIdPath=this.getQueryVariable("userDefIdPath"),this.traceCount=0}setFSMVariable(t,e){this.postMessageWithPathsAndTraceCount({setVariable:{variableName:t,newValue:e}})}postLogEvent(t){this.postMessageWithPathsAndTraceCount({traceMessage:t})}triggerEvent(t){this.postMessageWithPathsAndTraceCount({microfinEvent:t})}postMessageWithPathsAndTraceCount(t){try{t.indexPath=this.indexPath,t.userDefIdPath=this.userDefIdPath,t.traceCount=this.traceCount++,window.parent.postMessage(JSON.stringify(t),"*")}catch(t){console.error(t)}}getQueryVariable(t){return new URL(window.location.href).searchParams.get(t)}startListeningToVariableDeclarationRequests(t){window.addEventListener("message",(e=>{try{const{callId:s}=JSON.parse(e.data);if(void 0!==s&&s.includes("importVariables")){const e={initialVariables:t(),callId:s};window.parent.postMessage(JSON.stringify(e),"*")}}catch(t){}}),!1)}debugOut(t){}}class c{constructor(t={}){if(Object.assign(this,{container:null,addSendChangeState:null},t),this.fsm||(this.fsm=new l,this.fsm.startListeningToVariableDeclarationRequests(this.declareVariables.bind(this))),t.container){this.width||(this.width=window.innerWidth),this.height||(this.height=window.innerHeight),this.stage=new Konva.Stage({container:this.container,width:this.width,height:this.height});const t="BW_IB_EXTRES_STAGES";t in window||(window[t]=[]),window[t].push(this.stage)}document.addEventListener("contextmenu",(t=>t.preventDefault())),this.FSMVarsSent={}}postLog(t,e={}){this.stage&&this.stage.isDemoAni||this.fsm.postLogEvent(Object.assign({},e,{event:t}))}postVariable(t,e){this.FSMVarsSent[t]=e,this.fsm.setFSMVariable(t,e)}triggerInputValidationEvent(){this.fsm.triggerEvent&&(this.dataSettings&&this.dataSettings.variablePrefix&&this.fsm.triggerEvent("ev_InputValidation_"+this.dataSettings.variablePrefix),this.fsm.triggerEvent("ev_InputValidation_ExtRes"))}getChangeState(t){return t.statusVarDef?t.statusVarDef.call(t):+t.getDefaultChangeState()}sendChangeState(t,e=null){if(t.stage&&t.stage.isDemoAni)return;const s=null===e?this.getChangeState(t):e;if(void 0===t.oldChangeState||!r(s,t.oldChangeState)){if("object"==typeof s)for(let e in s)"object"==typeof t.oldChangeState&&s[e]===t.oldChangeState[e]||this.postVariable(e,s[e]);else t.FSMVariableName&&this.postVariable(`V_Status_${t.FSMVariableName}`,+s);t.oldChangeState=s}if(t.scoreDef){const e=t.scoreDef.call(t);if(void 0===t.oldScore||!r(e,t.oldScore))if("object"==typeof e)for(let s in e)"object"==typeof t.oldScore&&e[s]===t.oldScore[s]||this.postVariable(s,e[s]);else(t.FSMVariableName||t.scoreVariableName)&&void 0!==e&&this.postVariable(t.scoreVariableName||`V_Score_${t.FSMVariableName}`,e);t.oldScore=e}"function"==typeof this.addSendChangeState&&this.addSendChangeState()}declareVariables(){const t=[],e={string:"String",number:"Integer"};for(const s in this.FSMVarsSent){const i=this.FSMVarsSent[s],n={name:s,type:null===i?"Integer":e[typeof i],defaultValue:i,namedValues:[]};t.push(n)}return t}}function d(t){if("object"!=typeof t)return t;if(Array.isArray(t))return t.map((t=>d(t)));const e={};return Object.entries(t).forEach((([t,s])=>{if("___"===t.substring(0,3)){const i=t.match(/^___arelvals_(.*)/);if(i)e[i[1]]=s.map((t=>Object.values(t).map((t=>d(t)))));else{const i=t.match(/^___alt[^_]*_(.*)/);i?void 0!==s&&(e[i[1]]=d(s)):"object"==typeof s&&Object.assign(e,d(s))}}else if(void 0!==s){const i=t.match(/^(.*?)___(.*)/);if(i){const t=d({[i[2]]:s});i[1]in e||(e[i[1]]={}),Object.assign(e[i[1]],t)}else e[t]=d(s)}})),e}function h(t){debugOut&&debugOut(`<span class="error">${t}</span>`),console.error(t)}class u{constructor(t,e={},s=null){a(Object.assign(this,{outerDivStyles:{},divStyles:{}}),e),this.base=s,this.outerDiv=document.createElement("DIV"),this.outerDiv.classList.add("textareaInserts"),this.setStyles(this.outerDiv,this.outerDivStyles),this.div="string"==typeof t?document.querySelector(t):t,this.div.parentNode.replaceChild(this.outerDiv,this.div),this.setStyles(this.div,this.divStyles),this.outerDiv.appendChild(this.div),this.initData=this.div.innerHTML.trim()}ev_input(){}setStyles(t,e){for(const s in e)t.style[s]=e[s]}extract(){return""}getDefaultChangeState(){return this.div.innerHTML.trim()!==this.initData}getState(){return"{}"}setState(){}}class g extends u{constructor(t,e={},s=null){const i={multiLine:!0,stripTags:!1,inputRegexp:null,maxlength:null,extractReplaces:[{from:/([^*])\*([^*])/g,to:"$1⋅$2"},{from:/\u2022|\u25cf/g,to:"⋅"}]};a(i,e),super(t,i,s),this.div.setAttribute("contenteditable","true"),this.div.addEventListener("keydown",this.ev_keydown.bind(this)),this.div.addEventListener("input",this.ev_input.bind(this)),!this.div.textContent.length&&this.multiLine&&(this.div.textContent="\n"),this.div.addEventListener("paste",(t=>t.preventDefault())),this.inputRegexp&&(this.inputRE=new RegExp(this.inputRegexp),this.saveValue()),this.div.addEventListener("focus",(()=>setTimeout((()=>this.base.postLog("textareaFocus",this.getTextPos())),0))),this.div.addEventListener("blur",(()=>this.base.postLog("textareaBlur"))),this.oldValue="",this.oldFocusElemIndex=null,this.initData=this.div.innerHTML.trim(),this.base.sendChangeState(this)}ev_keydown(t){let e=0;if(this.base){const e={which:t.which||t.keyCode};["key","code","shiftKey","altKey","ctrlKey","metaKey","isComposing","repeat"].forEach((s=>{t[s]&&(e[s]=t[s])})),this.base.postLog("keyDown",Object.assign(e,this.getTextPos()))}"Enter"===t.key||13==t.which||13==t.keyCode?(this.tabToNextInputField(t)||this.multiLine&&!this.pasteHtmlAtCaret("\n")||(t.preventDefault(),t.stopPropagation()),e=1):"Tab"===t.key||9==t.which||9==t.keyCode?(this.tabToNextInputField(t)||this.pasteHtmlAtCaret("&#09;")&&(t.preventDefault(),t.stopPropagation()),e=1):"Backspace"===t.key||8==t.which||8==t.keyCode?(this.delIfDiv(-1,t),e=1):"Delete"!==t.key&&46!=(t.which||t.keyCode)||(this.delIfDiv(1,t),e=1),this.base&&e>0&&this.base.sendChangeState(this)}ev_input(t){let e=!1;const s=window.getSelection();if(t&&"deleteContentBackward"==t.inputType&&this.delPosElement){let t=null,i=s.focusNode;if(this.delPosText)for(;!t&&i&&(!i.classList||!i.classList.contains("textareaInserts"));)i.classList&&i.classList.contains("inserted")&&(t=i),i=i.parentNode;if(t){if(s.getRangeAt&&s.rangeCount){const e=s.getRangeAt(0).cloneRange();e.setStartBefore(t),e.collapse(!0),s.removeAllRanges(),s.addRange(e)}this.div.replaceChild(this.delPosText,this.delPosElement),this.div.normalize()}else this.delPosElement.remove();this.delPosElement=null,this.delPosText=null,e=this.inputRE||!this.multiLine}else{if(s&&s.isCollapsed&&s.focusNode&&s.focusNode.parentNode==this.div&&0===s.focusOffset&&s.focusNode.previousSibling&&s.focusNode.previousSibling.classList&&s.focusNode.previousSibling.classList.contains("inserted")?(this.delPosText=s.focusNode.cloneNode(!0),this.delPosElement=s.focusNode.previousSibling):(this.delPosElement=null,this.delPosText=null),this.multiLine){const t=this.div.childNodes.length>0?this.div.childNodes[this.div.childNodes.length-1]:null;if(t&&t.nodeType==Node.TEXT_NODE&&!t.textContent.endsWith("\n")){const e=s&&s.focusNode==t?s.focusOffset:null;t.textContent=t.textContent+"\n",null!==e&&this.setCurPos(t,e)}}else this.div.textContent.match(/[\n\r]/)?this.restoreValue():e=!0;if(this.stripTags)this.div.innerHTML.match(/<[^>]*>/)&&(this.div.innerHTML=this.div.innerHTML.replace(/<[^>]*>/g,""));else{let t=this.div.childNodes[0];for(;t;){const e=t;if(t=t.nextSibling,"DIV"==e.tagName&&e.classList&&!e.classList.contains("inserted")){const t=e.textContent;if(t.length){const s=document.createTextNode("");s.textContent=t,this.div.replaceChild(s,e),this.div.normalize()}else e.remove()}}"<br>"===this.div.innerHTML.trim()&&(this.div.innerHTML="",this.div.textContent="\n")}(this.inputRE||this.maxlength)&&(this.inputRE&&!this.div.innerHTML.match(this.inputRE)||this.maxlength&&this.div.innerHTML.length>this.maxlength?(this.restoreValue(),this.base&&(this.base.postLog("inputRevert",{toText:this.div.innerHTML,extract:this.extract()}),this.base.triggerInputValidationEvent())):e=!0)}e&&this.saveValue(),(e||!this.inputRE||this.multiLine)&&this.base.postLog("newValue",{extract:this.extract()}),this.base&&this.base.sendChangeState(this)}pasteHtmlAtCaret(t,e,s){const i=window.getSelection();if(!i||!i.focusNode||!this.div.contains(i.focusNode))return!1;if(i.getRangeAt&&i.rangeCount){let r,l=i.getRangeAt(0);l.deleteContents(),r=e?`${i.focusOffset&&" "==i.focusNode.textContent[i.focusOffset-1]?"":" "}${t} `:t;const c=document.createElement("div");c.innerHTML=r;for(var n,o,a=document.createDocumentFragment();n=c.firstChild;)n.classList&&n.classList.add("inserted"),o=a.appendChild(n);const d=a.querySelector(".startCursorPos");if(l.insertNode(a),o&&(l=l.cloneRange(),d?l.setStart(d,0):l.setStartAfter(o),l.collapse(!0),i.removeAllRanges(),i.addRange(l)),this.normalize(),s&&this.base){const t={text:r,name:s,extract:this.extract()};this.base.postLog("insertButtonPressed",Object.assign(t,this.getTextPos()))}}return!0}delIfDiv(t,e){const s=window.getSelection();if(s&&s.isCollapsed){const i=s.focusNode;if(i&&(t>0&&s.focusOffset==i.textContent.length||t<0&&(!s.focusOffset||i==this.div&&s.focusOffset<=this.div.childNodes.length))){const n=i==this.div?this.div.childNodes[s.focusOffset-1]:t<0?i.previousSibling:i.nextSibling;if(n&&"DIV"==n.tagName&&n.classList.contains("inserted")){const t=s.getRangeAt(0);return t&&(n.previousSibling?t.setStartAfter(n.previousSibling):n.nextSibling&&t.setStart(n.nextSibling,0),t.collapse(!0),s.removeAllRanges(),s.addRange(t)),n.remove(),this.div.normalize(),e.preventDefault(),e.stopPropagation(),!0}}}return!1}tabToNextInputField(t){const e=window.getSelection();if(e&&e.isCollapsed&&e.focusNode&&e.getRangeAt&&e.rangeCount){let s;for(s=e.focusNode;s&&!s.classList;)s=s.parentNode;if(s&&s.classList.contains("inputField")){for(;s&&!s.nextSibling&&s!=this.div;)s=s.parentNode;if(s&&s!=this.div)return s=s.nextSibling,this.setCurPos(s,s.nodeType==Node.TEXT_NODE&&s.textContent.startsWith(" ")?1:0),t.preventDefault(),t.stopPropagation(),!0}}return!1}saveValue(){this.oldValue=this.div.innerHTML;const t=window.getSelection();if(t&&t.focusNode){const e=Array.from(this.div.childNodes);this.oldFocusElemIndex=e.findIndex((e=>e===t.focusNode)),this.oldFocusOffset=t.focusOffset}else this.oldFocusElemIndex=null}restoreValue(){if(null!==this.oldValue){this.div.innerHTML=this.oldValue;const t=window.getSelection();t&&(t.removeAllRanges(),null!==this.oldFocusElemIndex&&this.oldFocusElemIndex>-1&&this.setCurPos(this.div.childNodes[this.oldFocusElemIndex],this.oldFocusOffset))}}setCurPos(t,e){const s=window.getSelection();if(s){const i=document.createRange();i.setStart(t,e),i.collapse(!0),s.removeAllRanges(),s.addRange(i)}}normalize(){let t,e,s=null;const i=window.getSelection();if(i&&i.getRangeAt&&i.rangeCount){let n=i.focusNode;if(n&&n.nodeType==Node.TEXT_NODE&&(n.previousSibling&&n.previousSibling.nodeType==Node.TEXT_NODE||n.nextSibling&&n.nextSibling.nodeType==Node.TEXT_NODE)){for(s=i.focusOffset,e=n.parentElement;n.previousSibling&&n.previousSibling.nodeType==Node.TEXT_NODE;)n=n.previousSibling,s+=n.textContent.length;t=n.previousSibling}}if(this.div.normalize(),null!==s){const n=t?t.nextSibling:e.firstChild,o=document.createRange();o.setStart(n,s),o.collapse(!0),i.removeAllRanges(),i.addRange(o)}}getTextPos(t=null){if(null===t&&(t=window.getSelection()),t&&t.focusNode){let e=t.focusOffset,s=t.focusNode;for(;(s=s.previousSibling||s.parentNode)&&s!=this.div&&s;)s.textContent&&(e+=s.textContent.length);const i={textPos:e};for(s=t.focusNode;s&&s!=this.div&&!s.classList;)s=s.parentNode;return s.classList&&s.classList.contains("frac")&&(s.classList.contains("top")&&(i.class="frac top"),s.classList.contains("bottom")&&(i.class="frac bottom")),i}return{}}extract(){let t=this.div.innerHTML;return this.extractReplaces.forEach((e=>{t=t.replace(e.from,e.to)})),t.trim()}getState(){return JSON.stringify(this.div.innerHTML)}setState(t){try{this.div.innerHTML=JSON.parse(t)}catch(t){console.error(t)}var e;(e=this).stage&&e.stage.isDemoAni&&e.stage.isDemoAni.endAni&&e.stage.isDemoAni.endAni(!1),e.base&&e.base.sendChangeState(e)}scoreDef(){return this.scoreVariableName||this.FSMVariableName?{[this.scoreVariableName||`V_Input_${this.FSMVariableName}`]:this.extract()}:{}}}class f extends g{constructor(t,e={},s=null){const i={toolbar:[],toolbarDirection:"column",toolbarContainerStyles:{},toolbarCellStyles:{},toolbarCellSpanStyles:{}};a(i,e),super(t,i,s),this.toolbarContainer=document.createElement("DIV"),this.toolbarContainer.classList.add("toolbar",`ti${this.toolbarDirection}`,"disabled"),this.toolbarContainerStyles.left||(this.toolbarContainerStyles.left=this.divStyles.width),this.toolbarContainerStyles.top||(this.toolbarContainerStyles.top="0px"),this.setStyles(this.toolbarContainer,this.toolbarContainerStyles),this.toolbar.forEach(((t,e)=>{const s=document.createElement("DIV");this.setStyles(s,this.toolbarCellStyles),["mousedown","touchstart"].forEach((t=>s.addEventListener(t,function(t){document.activeElement&&!this.toolbarContainer.classList.contains("disabled")&&this.div.contains(document.activeElement)&&this.insert(e,t)}.bind(this))));const i=document.createElement("SPAN");this.setStyles(i,this.toolbarCellSpanStyles),s.appendChild(i),i.innerHTML=t.display,this.toolbarContainer.appendChild(s),t.extractReplace&&t.extractReplace.from&&t.extractReplace.to&&this.extractReplaces.push(t.extractReplace)})),this.outerDiv.appendChild(this.toolbarContainer),this.div.addEventListener("focus",(()=>this.toolbarContainer.classList.remove("disabled")),{capture:!0}),this.div.addEventListener("blur",(()=>this.toolbarContainer.classList.add("disabled")),{capture:!0})}insert(t,e){if(this.toolbar[t].dontInsertRecursive){const t=window.getSelection();if(t&&t.focusNode){let e=t.focusNode;for(;e&&(!e.classList||!e.classList.contains("textareaInserts")&&!e.classList.contains("inserted"));)e=e.parentNode;if(e.classList&&e.classList.contains("inserted"))return}}this.pasteHtmlAtCaret(this.toolbar[t].insert||this.toolbar[t].display,!this.toolbar[t].noExtraSpaces,this.toolbar[t].logName)&&(this.ev_input(),e.preventDefault(),e.stopPropagation()),this.base&&this.base.sendChangeState(this)}}const p=[{display:"&plus;",logName:"plus"},{display:"&minus;",logName:"minus"},{display:"&sdot;",logName:"dot"},{display:"&ratio;",logName:"ratio"},{display:"&equals;",logName:"equals"}],m=[{display:'<div class="frac"><img src="data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSI5MC4wMDIiIGhlaWdodD0iMTA2Ljg5MyIgdmlld0JveD0iMCAwIDIzLjgxMyAyOC4yODIiIHhtbG5zOnY9Imh0dHBzOi8vdmVjdGEuaW8vbmFubyI+PHBhdGggZD0iTTUuOTUzLjM4M2gxMS45MDZ2MTAuNTgzSDUuOTUzem0wIDE2LjkzM2gxMS45MDZ2MTAuNTgzSDUuOTUzeiIgZmlsbD0ibm9uZSIgc3Ryb2tlPSIjMDAwIiBzdHJva2Utd2lkdGg9Ii43NjUiIHN0cm9rZS1saW5lam9pbj0icm91bmQiLz48cGF0aCBkPSJNMCAxNC4xNDFoMjMuODEyIiBmaWxsPSIjZDg2MjZjIiBmaWxsLW9wYWNpdHk9Ii4yNjIiIHN0cm9rZT0iIzAwMCIgc3Ryb2tlLXdpZHRoPSIxLjA2NSIvPjwvc3ZnPg=="></div>',insert:'<div contenteditable="false" class="frac"><span contenteditable="true" class="frac top startCursorPos inputField"></span><span contenteditable="true" class="frac bottom inputField"></span></div>',dontInsertRecursive:!0,logName:"fraction",extractReplace:{from:/<div[^>]*class="frac[^>]*>\s*<span[^>]*class="frac top[^>]*>(.*?)<\/span>\s*<span[^>]*class="frac bottom[^>]*>(.*?)<\/span>\s*<\/div>/g,to:"($1)/($2)"}}],b=p.concat(m);[].concat(m).concat(b),b.concat([{display:"%",logName:"percent"}]);class v extends f{constructor(t,e={},s=null){const i=Object.assign({},{toolbarCellWidth:22,inputHeight:22,toolbarDirection:"row",multiLine:!1,stripTags:!0},e),n={position:"absolute",left:"0px",top:`${i.toolbarCellWidth}px`,height:`${i.inputHeight}px`,"vertical-align":"middle",overflow:"hidden"};i.divStyles=Object.assign(n,i.divStyles||{});const o=i.divStyles.width.match("([0-9]+)px"),a={left:(o?o[1]:100)-i.toolbar.length*i.toolbarCellWidth+"px",top:"0px"};i.toolbarContainerStyles=Object.assign(a,i.toolbarContainerStyles||{});const r={width:`${i.toolbarCellWidth}px`,height:`${i.toolbarCellWidth}px`};i.toolbarCellStyles=Object.assign(r,i.toolbarCellStyles||{}),super(t,i,s)}getOpRE(t,e,s,i){const n=`(?:${e.map((e=>`(?:${e.map((t=>t.toString().replace(/[.,]/,"[.,]"))).join(`\\s*(?:${t})\\s*`)})`)).join("|")})`;return null!=s?(s=s.toString().replace(/[.,]/,"[.,]"),new RegExp(`^(?:(?:(?:${s}\\s*)?(=|=)\\s*)${n}|${n}(?:\\s*(=|=)(?:\\s*${s})?)${i?"?":""})$`)):new RegExp(null===s?`^${n}$`:`(?:^|\\s|[^0-9,.])${n}(?:\\s|[^0-9,.]|$)`)}isOpRE(t,e,s,i){return this.div.innerHTML.trim().match(this.getOpRE(t,e,s,i))}isSumRE(t,e,s=!0){return this.isOpRE("\\+",t,e,s)}isDiffRE(t,e,s=!0){return this.isOpRE("-|−",t,e,s)}isMultRE(t,e,s=!0){return this.isOpRE("\\*|⋅|•|●",t,e,s)}isDivRE(t,e,s=!0){return this.isOpRE("[/:]|∶",t,e,s)}perm(t){let e=[];for(let s=0;s<t.length;s+=1){let i=this.perm(t.slice(0,s).concat(t.slice(s+1)));if(i.length)for(let n=0;n<i.length;n+=1)e.push([t[s]].concat(i[n]));else e.push([t[s]])}return e}combinations(t){const e=[],s=Math.pow(2,t.length);for(let i=0;i<s;i++){let s=[];for(let e=0;e<t.length;e++)i&Math.pow(2,e)&&s.push(t[e]);s.length&&e.push(s)}return e}allCombPerm(t,e=2){const s=this.combinations(t).filter((t=>t.length>=e));let i=[];return s.forEach((t=>i=i.concat(this.perm(t)))),i}}class S extends v{constructor(t,e={},s=null,i={}){const a="string"==typeof t?document.querySelector(t):t;e.divStyles={width:`${e.width>0?e.width:a.offsetWidth+e.width}px`},e.toolbar=p,e.inputRegexp="^([0-9]*(?:[,.][0-9]*)?|[ +*/:=-]|−|⋅|•|●|∶|=)*$",super(t,e,s),e.dataSettings&&e.dataSettings.scoringPattern&&this.parseScoringPattern(e.dataSettings.scoringPattern,e.dataSettings.variablePrefix),function(t,e=null,s={}){if(!e)return t.parseScoringVals=()=>{},void(t.computeScoringVals=()=>{});const i=new e;Object.assign(s,{isNumUnit:o,isBetween:n,match:(t,e)=>t.match(e),strEqual:(t,e)=>t.toLowerCase==e.toLowerCase});for(const t in s)i.functions[t]=s[t];t.parseScoringVals=function(t){if(t.dataSettings&&t.dataSettings.scoringVals&&this.scoreDef){const e=t.dataSettings.scoringVals,s=this.scoreDef();if("object"==typeof s){const t=Object.keys(s);t.length>0&&e.forEach((e=>{let s=e.condition;if(s){let n=s;const o=s.matchAll(/\$\{([^}]*)}/g);for(const e of o)if(0==e[1].length)h("Variablen-Name '${}' in Scoring nicht zulässig");else{const s=new RegExp(e[1],"i"),i=t.filter((t=>t.match(s)));i.length>1?(h(`Variablen-Name '\${${e[1]}}' in Scoring ist nicht eindeutig`),n=""):0==i.length?(h(`Variablen-Name '\${${e[1]}}' in Scoring unbekannt`),n=""):n=n.replace(e[0],i[0])}if(n){"scoringVals"in this||(this.scoringVals={});try{this.scoringVals[e.val]=i.parse(n)}catch(t){h(`Syntax-Fehler in Scoring-Condition: ${s}`)}}}}))}}},t.computeScoringVals=function(t){if(this.scoringVals){let e=null;const s=Object.entries(this.scoringVals);for(let i=0;null==e&&i<s.length;i++){const[n,o]=s[i];try{o.evaluate(t)&&(e=n)}catch(t){h("Error in scoring-condition")}}const i=Number(e);t[`S_${this.dataSettings.variablePrefix}`]=null!==e&&NaN!==i?i:e}}}(this,i.Parser),this.parseScoringVals(e)}parseScoringPattern(t,e){this.scoringPattern={};const s=new RegExp("(\\d+(?:[,.]\\d+)?) *((?:([\\-+*\\/]) *(?:\\d+(?:[,.]\\d+)?) *)+)(\\[ *= *(\\d+(?:[,.]\\d+)?) *\\] *|= *(\\d+(?:[,.]\\d+)?) *)?"),i=new RegExp("(\\d+(?:[,.]\\d+)?)","g");t.forEach((t=>{const n=t.pattern.trim().match(s);if(n){const s={"+":"\\+","-":"-|−","*":"\\*|⋅|•|●","/":"[/:]|∶"}[n[3]],o=[n[1]];for(const t of n[2].matchAll(i))o.push(t[0]);let a,r;n[4]?(a=n[5]||n[6],r=void 0!==n[5]):(a=t.add?void 0:null,r=!1);const l=this.getOpRE(s,t.perm?this.perm(o):[o],a,r);this.scoringPattern[`S_${e}_${t.name}`]=l}}))}scoreDef(){const t={[`V_${this.dataSettings.variablePrefix}_Input`]:this.extract()};if(this.scoringPattern){const e=this.div.innerHTML.trim();Object.entries(this.scoringPattern).forEach((([s,i])=>t[s]=e.match(i)?1:0))}return this.computeScoringVals&&this.computeScoringVals(t),t}}const y="extres_cfg.json",x="extres_cfg.schema.json";function w(){fetch(y).then((t=>{if(!t.ok)throw new Error(`ExtRes: Error reading '${y}'!`);return t.json()})).then((t=>function(t){if("string"==typeof t)try{t=JSON.parse(t,!0)}catch(t){return void console.error(`Format-Error in JSON file '${y}'`)}const e=d(t),s=new c;e.dataSettings&&(s.dataSettings=e.dataSettings),new Promise((t=>{e.dataSettings&&e.dataSettings.scoringVals&&e.dataSettings.scoringVals.length>0?i.e(35).then(i.bind(i,830)).then((e=>t({Parser:e.Parser}))):t({})})).then((i=>{const n=new S("#container",e,s,i);!function(t,e){if(!t.statusVarDef&&e.dataSettings&&e.dataSettings.variablePrefix){const s=`S_${e.dataSettings.variablePrefix}_Status`;t.statusVarDef=function(){return{[s]:+this.getDefaultChangeState()}}}}(n,t),n.getState&&(window.getState=n.getState.bind(n)),n.setState&&(window.setState=n.setState.bind(n))}))}(t))).catch((t=>console.error(t)))}document.addEventListener("DOMContentLoaded",(function(){!function(){const t=()=>{const t=window.location.pathname.match(/\/([^/]+)\/[^/]*$/);return t?t[1]:"."};window.addEventListener("message",(e=>{try{const{callId:s}=JSON.parse(e.data);void 0!==s&&s.includes("importJsonData")&&fetch(x).then((t=>{if(!t.ok)throw new Error(`ExtRes: Error reading '${x}'!`);return t.json()})).then((e=>{const i={jsonSchema:e,configFileName:t()+"/"+y,callId:s};window.parent.postMessage(JSON.stringify(i),"*")})).catch((t=>console.error(t)))}catch(t){}}),!1)}(),w()}))})();