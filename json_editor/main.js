import './main.css';
import { clearCfgJson, addStatusVarDef } from './common';

//////////////////////////////////////////////////////////////////////////////

import { barPlotFromSchema } from './class_extensions/barPlot';
import barPlotJSONSchema from './schemes/barPlot.schema.json';
import barPlotSVG from './svgs/barPlot.svg';

import { barSliderFromSchema } from './class_extensions/barSlider';
import barSliderJSONSchema from './schemes/barSlider.schema.json';
import barSliderSVG from './svgs/barSlider.svg';

import { barSliderFullFromSchema } from './class_extensions/barSliderFull';
import barSliderFullJSONSchema from './schemes/barSliderFull.schema.json';
import barSliderFullSVG from './svgs/barSliderFull.svg';

import { chatTextAudioFromSchema } from './class_extensions/chatTextAudio';
import chatTextAudioJSONSchema from './schemes/chatTextAudio.schema.json';
import chatTextAudioSVG from './svgs/vue.svg';

/// #if __VueExamples
import { vueExamplePropsEmitFromSchema } from './class_extensions/vueExamplePropsEmit';
import vueExamplePropsEmitJSONSchema from './schemes/vueExamplePropsEmit.schema.json';
import vueExamplePropsEmitSVG from './svgs/vue.svg';

import { vueExamplePiniaFromSchema } from './class_extensions/vueExamplePinia';
import vueExamplePiniaJSONSchema from './schemes/vueExamplePinia.schema.json';
import vueExamplePiniaSVG from './svgs/vue.svg';
/// #endif

import { connectedFramesFromSchema } from './class_extensions/connectedFrames';
import connectedFramesJSONSchema from './schemes/connectedFrames.schema.json';
import connectedFramesSVG from './svgs/connectedFrames.svg';

import { filledBarFromSchema } from './class_extensions/filledBar';
import filledBarJSONSchema from './schemes/filledBar.schema.json';
import filledBarSVG from './svgs/filledBar.svg';

import { freePaintFromSchema } from './class_extensions/freePaint';
import freePaintJSONSchema from './schemes/freePaint.schema.json';
import freePaintSVG from './svgs/freePaint.svg';

import { freePaintMultFromSchema } from './class_extensions/freePaintMult';
import freePaintMultJSONSchema from './schemes/freePaintMult.schema.json';
import freePaintMultSVG from './svgs/freePaintMult.svg';

import { freePaintRecogFromSchema } from './class_extensions/freePaintRecog';
import freePaintRecogJSONSchema from './schemes/freePaintRecog.schema.json';
import freePaintRecogSVG from './svgs/freePaintMult.svg';

import { inputGridFromSchema } from './class_extensions/inputGrid';
import inputGridJSONSchema from './schemes/inputGrid.schema.json';
import inputGridSVG from './svgs/inputGrid.svg';

import { numbersByPicturesFromSchema } from './class_extensions/numbersByPictures';
import numbersByPicturesJSONSchema from './schemes/numbersByPictures.schema.json';
import numbersByPicturesSVG from './svgs/numbersByPictures.svg';

import { pikasTextEntryFromSchema } from './class_extensions/pikasTextEntry';
import pikasTextEntryJSONSchema from './schemes/pikasTextEntry.schema.json';
import pikasTextEntrySVG from './svgs/pikasTextEntry.svg';

import { numberLineFromSchema } from './class_extensions/numberLine';
import numberLineJSONSchema from './schemes/numberLine.schema.json';
import numberLineSVG from './svgs/numberLine.svg';

import { numberLineWithAnnotationsFromSchema } from './class_extensions/numberLineWithAnnotations';
import numberLineWithAnnotationsJSONSchema from './schemes/numberLineWithAnnotations.schema.json';
import numberLineWithAnnotationsSVG from './svgs/numberLineWithAnnotations.svg';

import { numberLineWithArcsFromSchema } from './class_extensions/numberLineWithArcs';
import numberLineWithArcsJSONSchema from './schemes/numberLineWithArcs.schema.json';
import numberLineWithArcsSVG from './svgs/numberLineWithArcs.png';

import { pointAreaFromSchema } from './class_extensions/pointArea';
import pointAreaJSONSchema from './schemes/pointArea.schema.json';
import pointAreaSVG from './svgs/pointArea.svg';

import { pointAreaExtFromSchema } from './class_extensions/pointAreaExt';
import pointAreaExtJSONSchema from './schemes/pointAreaExt.schema.json';
import pointAreaExtSVG from './svgs/pointAreaExt.svg';

import { rectArrayMarkableFromSchema } from './class_extensions/rectArrayMarkable';
import rectArrayMarkableJSONSchema from './schemes/rectArrayMarkable.schema.json';
import rectArrayMarkableSVG from './svgs/rectArrayMarkable.svg';

import { recordAudioFromSchema } from './class_extensions/recordAudio';
import recordAudioJSONSchema from './schemes/recordAudio.schema.json';
import recordAudioSVG from './svgs/recordAudio.svg';

import { stampImagesFromSchema } from './class_extensions/stampImages';
import stampImagesJSONSchema from './schemes/stampImages.schema.json';
import stampImagesSVG from './svgs/stampImages.svg';

import { textareaInsertsFromSchema } from './class_extensions/textareaInserts';
import textareaInsertsJSONSchema from './schemes/textareaInserts.schema.json';
import textareaInsertsSVG from './svgs/textareaInserts.svg';

import { inputInsertsFromSchema } from './class_extensions/inputInserts';
import inputInsertsJSONSchema from './schemes/inputInserts.schema.json';
import inputInsertsSVG from './svgs/inputInserts.svg';

//////////////////////////////////////////////////////////////////////////////

import { baseInits } from '../libs/baseInits';
let base = getBase();
const textContainer = document.getElementById('ewk_textcontainer');

function getBase () {
	const container = document.getElementById('ewk_container');
	return new baseInits({
		container,
		width: container.offsetWidth,
		height: container.offsetHeight,
	});
}

let creator = null;
let editor;

// import { JSONEditor } from '@json-editor/json-editor';
/// #if __DEVELOP
	window.JSONEditor = JSONEditor;
/// #endif
import { object_equals } from '../libs/common';
import { Parser } from 'expr-eval';
import { konva2svg } from './konva2svg';

function searchSchemaData( json ) {

	if ( json.___jsonSchemaData ) {
		return json.___jsonSchemaData;
	}
	// fix old version
	if ( json.__jsonSchemaData ) {
		return json.__jsonSchemaData;
	}

	for ( const v of Object.values(json) ) {
		if ( typeof v === 'object' && !Array.isArray(v) ) {
			const s = searchSchemaData(v);
			if ( s !== null ) {
				return s;
			}
		}
	}

	return null;
}


function initContainer (graph) {
	document.getElementById('ewk_container').style.display = graph ? 'block' : 'none';


	[ [ 'exportsvg', saveSVG ], [ 'exportpng', savePNG ] ].forEach( ([idstr,fn]) => {
		const btn = document.getElementById(idstr);
		btn.removeEventListener( 'click', fn );
		btn.removeAttribute( 'disabled' );
		if (graph) {
			btn.addEventListener( 'click', fn );
		} else {
			btn.setAttribute( 'disabled', 'disabled' );
		}
	});

	textContainer.style.display = graph ? 'none' : 'block';
	while ( textContainer.firstChild ) {
		textContainer.removeChild( textContainer.lastChild );
	}
	textContainer.appendChild( document.createElement('DIV') );
}


function loadSchema( schema ) {

	try {
		if ( typeof schema === 'string' ) {
			schema = JSON.parse( schema );
		}
	} catch(e) {
		schema = {};
	}

	const div = document.getElementById('JSON_EDITOR');
	editor = new JSONEditor( div, {
		schema: schema,
		theme: 'bootstrap4',
		iconlib: "fontawesome4",
	});
/// #if __DEVELOP
	window.editor = editor;
/// #endif
	editor.on( 'change', updateEWK );

	editor.on( 'ready', () => {
		const json = editor.getValue('root');
		const schemaData = searchSchemaData(json);
		const addMods = {
			Parser
		};

		try {
			if ( schemaData && schemaData.___name ) {
				switch (schemaData.___name) {

					case 'barPlot':
						initContainer(true);
						creator = (cfgData) => new barPlotFromSchema( base, cfgData, addMods );
						break;
					case 'barSlider':
						initContainer(true);
						creator = (cfgData) => new barSliderFromSchema( base, cfgData, addMods );
						break;
					case 'barSliderFull':
						initContainer(true);
						creator = (cfgData) => new barSliderFullFromSchema( base, cfgData, addMods );
						break;
					case 'chatTextAudio':
						creator = (cfgData) => {
							initContainer(false);
							return new chatTextAudioFromSchema( textContainer.firstChild, cfgData, base );
						}
						break;
/// #if __VueExamples
					case 'vueExamplePropsEmit':
						creator = (cfgData) => {
							initContainer(false);
							return new new vueExamplePropsEmitFromSchema( textContainer.firstChild, cfgData, base );
						}
						break;
					case 'vueExamplePinia':
						creator = (cfgData) => {
							initContainer(false);
							return new vueExamplePiniaFromSchema( textContainer.firstChild, cfgData, base );
						}
						break;
/// #endif
					case 'connectedFrames':
						initContainer(true);
						creator = (cfgData) => new connectedFramesFromSchema( base, cfgData, addMods );
						break;
					case 'filledBar':
						initContainer(true);
						creator = (cfgData) => new filledBarFromSchema( base, cfgData, addMods );
						break;
					case 'freePaint':
						initContainer(true);
						creator = (cfgData) => new freePaintFromSchema( base, cfgData );
						break;
					case 'freePaintMult':
						initContainer(true);
						creator = (cfgData) => new freePaintMultFromSchema( base, cfgData );
						break;
					case 'freePaintRecog':
						initContainer(true);
						creator = (cfgData) => new freePaintRecogFromSchema( base, cfgData );
						break;
					case 'inputGrid':
						initContainer(true);
						creator = (cfgData) => new inputGridFromSchema( base, cfgData );
						break;
					case 'numberLine':
						initContainer(true);
						creator = (cfgData) => new numberLineFromSchema( base, cfgData );
						break;
					case 'numberLineWithAnnotations':
						initContainer(true);
						creator = (cfgData) => new numberLineWithAnnotationsFromSchema( base, cfgData, addMods );
						break;
					case 'numberLineWithArcs':
						initContainer(true);
						creator = (cfgData) => new numberLineWithArcsFromSchema( base, cfgData, addMods );
						break;
					case 'numbersByPictures':
						initContainer(true);
						creator = (cfgData) => new numbersByPicturesFromSchema( base, cfgData, addMods );
						break;
					case 'pikasTextEntry':
						creator = (cfgData) => {
							initContainer(false);
							return new pikasTextEntryFromSchema( textContainer.firstChild, cfgData, base );
						}
						break;
					case 'pointArea':
						initContainer(true);
						creator = (cfgData) => new pointAreaFromSchema( base, cfgData, addMods );
						break;
					case 'pointAreaExt':
						initContainer(true);
						creator = (cfgData) => new pointAreaExtFromSchema( base, cfgData, addMods );
						break;
					case 'recordAudio':
						creator = (cfgData) => {
							initContainer(false);
							return  new recordAudioFromSchema( textContainer.firstChild, cfgData, base );
						}
						break;
					case 'rectArrayMarkable':
						initContainer(true);
						creator = (cfgData) => new rectArrayMarkableFromSchema( base, cfgData, addMods );
						break;
					case 'stampImages':
						initContainer(true);
						creator = (cfgData) => new stampImagesFromSchema( base, cfgData );
						break;
					case 'textareaInserts':
						import( '../examples/textareaInserts_2cols.css' );
						creator = (cfgData) => {
							initContainer(false);
							return new textareaInsertsFromSchema( textContainer.firstChild, cfgData, base );
						}
						break;
					case 'inputInserts':
						creator = (cfgData) => {
							initContainer(false);
							return new inputInsertsFromSchema( textContainer.firstChild, cfgData, base, addMods );
						}
						break;

					default:
						throw new Error( `Schema-Typ '${schemaData.___name}' unbekannt!` );
				}
			} else {
				throw new Error( 'Schema-Datei nicht auswertbar!' );
			}
		} catch (e) {
			console.error( "Fehler beim Laden eines Schema:", e );
			alert(e);
			window.location.reload();
		}

		updateEWK();
	});

	document.querySelector( '#json_button' ).style.display = "block";
}

//////////////////////////////////////////////////////////////////////////////

// /// #if __DEVELOP

// // for Development: always load one JSON schema
// loadSchema( pikasTextEntryJSONSchema );
// window.updateEWK = updateEWK;

// /// #else

// load schema Links
const templs = {
	barPlot: [ barPlotJSONSchema, barPlotSVG ],
	barSlider: [ barSliderJSONSchema, barSliderSVG ],
	barSliderFull: [ barSliderFullJSONSchema, barSliderFullSVG ],
	chatTextAudio: [ chatTextAudioJSONSchema, chatTextAudioSVG ],
/// #if __VueExamples
	vueExamplePropsEmit: [ vueExamplePropsEmitJSONSchema, vueExamplePropsEmitSVG ],
	vueExamplePinia: [ vueExamplePiniaJSONSchema, vueExamplePiniaSVG ],
/// #endif
	connectedFrames: [ connectedFramesJSONSchema, connectedFramesSVG ],
	filledBar: [ filledBarJSONSchema, filledBarSVG ],
	freePaint: [ freePaintJSONSchema, freePaintSVG ],
	freePaintMult: [ freePaintMultJSONSchema, freePaintMultSVG ],
	freePaintRecog: [ freePaintRecogJSONSchema, freePaintRecogSVG ],
	inputGrid: [ inputGridJSONSchema, inputGridSVG ],
	numberLine: [ numberLineJSONSchema, numberLineSVG ],
	numberLineWithAnnotations: [ numberLineWithAnnotationsJSONSchema, numberLineWithAnnotationsSVG ],
	numberLineWithArcs: [ numberLineWithArcsJSONSchema, numberLineWithArcsSVG ],
	numbersByPictures: [ numbersByPicturesJSONSchema, numbersByPicturesSVG ],
	pikasTextEntry: [ pikasTextEntryJSONSchema, pikasTextEntrySVG ],
	pointArea: [ pointAreaJSONSchema, pointAreaSVG ],
	pointAreaExt: [ pointAreaExtJSONSchema, pointAreaExtSVG ],
	recordAudio: [ recordAudioJSONSchema, recordAudioSVG ],
	rectArrayMarkable: [ rectArrayMarkableJSONSchema, rectArrayMarkableSVG ],
	stampImages: [ stampImagesJSONSchema, stampImagesSVG ],
	textareaInserts: [ textareaInsertsJSONSchema, textareaInsertsSVG ],
	inputInserts: [ inputInsertsJSONSchema, inputInsertsSVG ],
}

const schSel = document.getElementById('schema_select');
schSel.style.visibility = 'visible';

Object.entries(templs).forEach( ([templ,[schema,svg]]) => {
	const a = document.createElement('DIV');
	a.addEventListener( 'click', () => {
		schSel.style.display = 'none';
		loadSchema( schema );
	});
	a.innerHTML = `<div class="templ">${templ}</div>`;
	if ( svg ) {
		a.innerHTML += `<br><img src="${svg}">`;
	}
	schSel.appendChild( a );
})

// /// #endif

//////////////////////////////////////////////////////////////////////////////

let dataSettingsVariablePrefix = '';

function updateEWK () {

	// Alles löschen
	base.stage.destroyChildren();
	base.stage.setAttr( 'bw__IconBarLayer', null );
	base.stage.off();
	debugOutClear();

	try {

		if ( creator ) {
			const jsonData = editor.getValue('root');
// console.log(jsonData);
			const cfgData = clearCfgJson( jsonData );
/// #if __DEVELOP
// console.log( '======= cfgData:', cfgData );
/// #endif
			if ( cfgData.dataSettings ) {
				base.dataSettings = cfgData.dataSettings;
				dataSettingsVariablePrefix = cfgData.dataSettings.variablePrefix;
			}

			const extres = creator( cfgData );
			// const extres = { getDefaultChangeState: () => ({}) };
			if ( process.env.NODE_ENV !== 'production' ) {
				window.extres = extres;
			}

			// Patch statusVarDef
			addStatusVarDef( extres, cfgData );
			if ( extres.statusVarDef ) {
				const oldStatusVarDef = extres.statusVarDef.bind( extres );
				let oldStatusVar = {};
				extres.statusVarDef = function () {
					const res = oldStatusVarDef();
					oldStatusVar = debugOutObj( 'Status', res, oldStatusVar );
					return res;
				}
				extres.statusVarDef();
			}

			// Patch scoreDef for output
			if ( extres.scoreDef ) {
				const oldScoreDef = extres.scoreDef.bind( extres );
				let oldScoreVals = {};
				extres.scoreDef = function () {
					const res = oldScoreDef();
					oldScoreVals = debugOutObj( 'Variables', res, oldScoreVals );
					return res;
				}
				extres.scoreDef();
			}

			if ( extres.getState ) {
				window.getState = extres.getState.bind(extres);
			}
			if ( extres.setState ) {
				window.setState = extres.setState.bind(extres);
			}
		}

	} catch( error ) {
		console.error( "Fehler beim Erzeugen der EWK:", error );
		alert( `Fehler beim Erzeugen der EWK: ${error}` );
	}

}

//////////////////////////////////////////////////////////////////////////////

function saveSVG () {

	const svg = konva2svg( base.stage );

	textOut( "extres.svg", svg, "image/svg" );

	// updateEWK();
}

function textOut( filename, text, type ) {
	// https://stackoverflow.com/questions/3665115/how-to-create-a-file-in-memory-for-user-to-download-but-not-through-server
	var element = document.createElement('a');
	element.setAttribute( 'href', `data:${type};charset=utf-8,${encodeURIComponent(text)}` );
	element.setAttribute( 'download', filename );

	element.style.display = 'none';
	document.body.appendChild(element);

	element.click();

	document.body.removeChild(element);
}



function savePNG () {

	const png = base.stage.toDataURL({ /*pixelRatio: 3*/ });

	downloadURI(png, 'extres.png');

	// updateEWK();
}

function downloadURI(uri, name) {
	const link = document.createElement('a');
	link.download = name;
	link.href = uri;
	document.body.appendChild(link);
	link.click();
	document.body.removeChild(link);
}


/// #if __DEVELOP
	window.saveSVG = saveSVG;
	window.savePNG = savePNG;
/// #endif



//////////////////////////////////////////////////////////////////////////////

function loadJsonFromStorage () {
	const json = sessionStorage.getItem('jsonData');
	if ( json ) {
		sessionStorage.removeItem('jsonData');

		try {
// console.log(reader.result);
			const configJson = JSON.parse( json );
			const schemaData = searchSchemaData(configJson);
// console.log(configJson);
			if ( !schemaData || !schemaData.___name || !( schemaData.___name in templs ) ) {
				throw new Error( 'Diese JSON hat kein bekanntes Schema!' );
			}

			// Schema selection ausblenden
			const schSel = document.getElementById('schema_select');
			schSel.style.display = 'none';

			// schema laden
			const [ schema ] = templs[schemaData.___name];
			loadSchema( schema );

			editor.on( 'ready', () => {
				// JSON laden
				editor.setValue( configJson );
			});

		} catch(e) {
			console.error( "Fehler beim JSON laden:", e );
			alert(e);
		}
	}
}

document.addEventListener( 'DOMContentLoaded', loadJsonFromStorage );

//////////////////////////////////////////////////////////////////////////////

function saveJson () {
	const json = editor.getValue('root');
	const text = JSON.stringify(json);

	textOut( 'extres_config.json', text, 'application/json' );
}

function uploadJson () {

	const [file] = this.files;
	if ( file ) {
		const reader = new FileReader();
		reader.addEventListener( 'load', () => {
			try {
				// direktes einlesen klappt nicht, also in Session Storage speichern und Reload!
				// Save reader.result in session storage
				sessionStorage.setItem('jsonData', reader.result);
				// relaod page
				location.reload();

			} catch(e) {
				console.error( "Fehler beim Upload:", e );
				alert(e);
			}
		}, false );
		reader.readAsText(file);
	}
}

// SAVE JSON Button
const saveButton = document.querySelector( '#json_button button#save' );
saveButton.addEventListener( 'click', saveJson );
saveButton.style.display = 'inline';

// LOAD JSON Button
const loadButton = document.querySelector( '#json_button button#load' );
const inp = document.getElementById('json_upload');
inp.addEventListener( 'change', uploadJson );
loadButton.addEventListener( 'click', () => {
	if ( inp ) {
		inp.click();
	}
}, false );
loadButton.style.display = 'inline';

//////////////////////////////////////////////////////////////////////////////
//
// Resize EWK
//

let hrPosY = null;
const ewk_div = document.getElementById('EWK');
const editor_div = document.getElementById('editor_container');

function hrmove (ev) {
	const diff = ev.clientY - hrPosY;
	ewk_div.style.height = `${ ewk_div.offsetHeight + diff }px`;
	editor_div.style.height = `${ editor_div.offsetHeight - diff }px`;
	hrPosY = ev.clientY;
	ev.stopPropagation();
	ev.preventDefault();
}

const hr = document.getElementById( 'ruler' );
hr.addEventListener( 'mousedown', (ev) => {
	if ( hrPosY === null ) {
		hrPosY = ev.clientY;
		document.addEventListener( 'mousemove', hrmove );
		ev.stopPropagation();
	}
});
document.addEventListener( 'mouseup', () => {
	if ( hrPosY !== null ) {
		hrPosY = null;
		document.removeEventListener( 'mousemove', hrmove );
		updateSizeEwk();
	}
});

function updateSizeEwk () {
	base = getBase();
	updateEWK();
}

//////////////////////////////////////////////////////////////////////////////
//
// Resize debugOut
//

let vrPosX = null;
const left_div = document.getElementById('left');
const right_div = document.getElementById('right');

function vrmove (ev) {
	const diff = ev.clientX - vrPosX;
	left_div.style.width = `${ left_div.offsetWidth + diff }px`;
	right_div.style.width = `${ right_div.offsetWidth - diff }px`;
	vrPosX = ev.clientX;
	ev.stopPropagation();
	ev.preventDefault();
}

const vr = document.getElementById( 'vruler' );
vr.addEventListener( 'mousedown', (ev) => {
	if ( vrPosX === null ) {
		vrPosX = ev.clientX;
		document.addEventListener( 'mousemove', vrmove );
		ev.stopPropagation();
	}
});
document.addEventListener( 'mouseup', () => {
	if ( vrPosX !== null ) {
		vrPosX = null;
		document.removeEventListener( 'mousemove', vrmove );
		updateSizeEwk();
	}
});

function var2clip( ev, k ) {
	const e = ev.target;
	if ( e.classList.contains('clipboard') ) {
		e.classList.remove('clipboard');
	}
	window.setTimeout( () => e.classList.add('clipboard'), 0 );

	navigator.clipboard.writeText( `\${${k.replace( `_${dataSettingsVariablePrefix}_`, '_<pref>_' )}}` );
}
window.var2clip = var2clip;

function debugOutObj ( t, res, oldRes ) {

	if ( typeof res === 'object' && !object_equals( res, oldRes ) ) {
		// let dbg = `<span style="background-color:${ t == 'Scores' ? '#FADBD8' : '#FCF3CF'}">${t}:</span><br><table>`;
		// Object.entries( res )
		// 	// .sort( (a,b) => a[0]==b[0] ? NaN : a[0]<b[0] ? -1 : 1 )
		// 	.forEach( ([k,v]) => dbg += `<tr><td>${k}:</td><td>${JSON.stringify(v)}</td></tr>` );
		// debugOut( dbg + "</table><br>" );
		let dbg = `<span class="${t}">${t}:</span>`;
		Object.entries( res )
			// .sort( (a,b) => a[0]==b[0] ? NaN : a[0]<b[0] ? -1 : 1 )
			.forEach( ([k,v]) => {
				dbg += `<span class="${ oldRes[k] !== v ? 'c' :'nc' }" onclick="var2clip(event,'${k}')">${k}: ${JSON.stringify(v)}</span>`
			});
		debugOut( dbg + "<br>" );

		return res;
	}

	return oldRes;
}

function debugOutClear () {
	debugOutDiv.innerHTML = '';
}

const debugOutDiv = document.getElementById( 'debugOut' );
function debugOut (s) {
	debugOutDiv.innerHTML += "\n"+s.replace("<pref>","&lt;pref&gt;");
	debugOutDiv.scrollTop = debugOutDiv.scrollHeight;
}
window.debugOut = debugOut;

//////////////////////////////////////////////////////////////////////////////

window.onresize = updateSizeEwk;
