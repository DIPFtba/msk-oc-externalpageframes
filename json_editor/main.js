import './main.css';
import { clearCfgJson, addStatusVarDef } from './common';

//////////////////////////////////////////////////////////////////////////////

const editorPreInitCallbacks = [];

import { barPlotFromSchema } from './class_extensions/barPlot';
import barPlotJSONSchema from './schemes/barPlot.schema.json';
import barPlotSVG from './svgs/barPlot.svg';

import { barSliderFromSchema } from './class_extensions/barSlider';
import barSliderJSONSchema from './schemes/barSlider.schema.json';
import barSliderSVG from './svgs/barSlider.svg';

import { barSliderFullFromSchema } from './class_extensions/barSliderFull';
import barSliderFullJSONSchema from './schemes/barSliderFull.schema.json';
import barSliderFullSVG from './svgs/barSliderFull.svg';

import { chatBotJsonFromSchema } from './class_extensions/chatBotJson';
import chatBotJsonJSONSchema from './schemes/chatBotJson.schema.json';
import chatBotJsonSVG from './svgs/vue.svg';

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

import { imageHighlightingFromSchema } from './class_extensions/imageHighlighting';
import imageHighlightingJSONSchema from './schemes/imageHighlighting.schema.json';
import imageHighlightingSVG from './svgs/freePaintMult.svg';
import { edInitImageHighlighting } from './class_extensions/imageHighlighting_jsonEditorHitAreas';
editorPreInitCallbacks.push( edInitImageHighlighting );

import { inputfieldFromSchema } from './class_extensions/inputfield';
import inputfieldJSONSchema from './schemes/inputfield.schema.json';
import inputfieldSVG from './svgs/inputfield.svg';

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

import { ratingsFromSchema } from './class_extensions/ratings';
import ratingsJSONSchema from './schemes/ratings.schema.json';
import ratingsSVG from './svgs/ratings.svg';

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
	const base = new baseInits({
		container,
		width: container.offsetWidth,
		height: container.offsetHeight,
	});
	initNewBase( base );
	return base;
}

let creator = null;
let editor;

// import { JSONEditor } from '@json-editor/json-editor';
/// #if __DEVELOP
	window.JSONEditor = JSONEditor;
/// #endif
import { object_equals, mergeDeep } from '../libs/common';
import { Parser } from 'expr-eval';
import { konva2svg } from './konva2svg';

//////////////////////////////////////////////////////////////////////////////

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

function parseSchema ( schema ) {
	try {
		if ( typeof schema === 'string' ) {
			return JSON.parse( schema );
		}
	} catch(e) {
		return {};
	}

	return schema;
}

import { generateDefaultJsonFromSchema } from './common.js';

function compareSemVer(version1, version2) {
  // Strings in Arrays aus Zahlen umwandeln
  const v1 = version1.toString().split('.').map(Number);
  const v2 = version2.toString().split('.').map(Number);

  // Die Länge der längeren Version bestimmen
  const maxLength = Math.max(v1.length, v2.length);

  for (let i = 0; i < maxLength; i++) {
    // Falls ein Element fehlt, nimm 0
    const num1 = v1[i] || 0;
    const num2 = v2[i] || 0;

    if (num1 > num2) return 1;
    if (num1 < num2) return -1;
  }

  // Alles ist gleich
  return 0;
}

function patchConfigJson ( schema, configJson, configJsonSchemaData=searchSchemaData(configJson) ) {
	const defaultJson = generateDefaultJsonFromSchema( schema );

	const schemaData = searchSchemaData( defaultJson );
	if ( !schemaData || !schemaData.___name || !configJsonSchemaData || configJsonSchemaData.___name !== schemaData.___name ) {
		alert( "Fehler in Schema-Data-Definition!" );
		return;
	}

	if ( !schemaData.___version || !configJsonSchemaData.___version || compareSemVer(schemaData.___version, configJsonSchemaData.___version) < 0 ) {
		alert( "Fehler in Schema-Data-Version! Editor ist veraltet!" );
		return;
	}

	const patchedConfigJson = mergeDeep(defaultJson, configJson);
	// console.log( '======= gepatchtes JSON:', patchedConfigJson );
	// console.log( '======= altes JSON:', configJson );
	// console.log( '======= gleich:', object_equals( patchedConfigJson, configJson ) );
	if ( !object_equals( patchedConfigJson, configJson ) ) {
		document.getElementById("loaderOut").innerHTML = '<div class="error">JSON-Config wurde gepatcht!</div>';
		const patchedSchemaData = searchSchemaData(patchedConfigJson);
		patchedSchemaData.___version = schemaData.___version;
		return patchedConfigJson;
	}

	return configJson;
}

//////////////////////////////////////////////////////////////////////////////

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

	schema = parseSchema( schema );

	// Alle preInitCallbacks ausführen, damit sie z.B. Callbacks definieren können, bevor der Editor initialisiert wird
	editorPreInitCallbacks.forEach( cb => cb() );

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
					case 'chatBotJson':
						creator = (cfgData) => {
							initContainer(false);
							return new chatBotJsonFromSchema( textContainer.firstChild, cfgData, base );
						}
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
					case 'imageHighlighting':
						creator = (cfgData) => {
							initContainer(false);
							// erzeugt base selbst!
							const io = new imageHighlightingFromSchema( textContainer.firstChild, cfgData, addMods );
							base = io.base;
							initNewBase( base );
							return io;
						}
						break;
					case 'inputfield':
						creator = (cfgData) => {
							initContainer(false);
							// wenn hier textContainer.firstChild asl Selektor übergeben wird, werden alle
							// input felder des editors mit gestylt - daher der Umweg über die ID
							return new inputfieldFromSchema( `#ewk_textcontainer > :first-child`, cfgData, base );
						}
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
							return new pikasTextEntryFromSchema( textContainer.firstChild, cfgData, base, addMods );
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
					case 'ratings':
						creator = (cfgData) => {
							initContainer(false);
							return new ratingsFromSchema( textContainer.firstChild, cfgData, base );
						}
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

		// updateEWK();
	});

	document.querySelector( '#json_button' ).style.display = "block";
}

//////////////////////////////////////////////////////////////////////////////

// /// #if __DEVELOP

// // for Development: always load one JSON schema
// loadSchema( pointAreaExtJSONSchema );
// window.updateEWK = updateEWK;

// /// #else

// load schema Links
const templs = {
	barPlot: [ barPlotJSONSchema, barPlotSVG ],
	barSlider: [ barSliderJSONSchema, barSliderSVG ],
	barSliderFull: [ barSliderFullJSONSchema, barSliderFullSVG ],
	chatBotJson: [ chatBotJsonJSONSchema, chatBotJsonSVG ],
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
	imageHighlighting: [ imageHighlightingJSONSchema, imageHighlightingSVG ],
	inputfield: [ inputfieldJSONSchema, inputfieldSVG ],
	inputGrid: [ inputGridJSONSchema, inputGridSVG ],
	numberLine: [ numberLineJSONSchema, numberLineSVG ],
	numberLineWithAnnotations: [ numberLineWithAnnotationsJSONSchema, numberLineWithAnnotationsSVG ],
	numberLineWithArcs: [ numberLineWithArcsJSONSchema, numberLineWithArcsSVG ],
	numbersByPictures: [ numbersByPicturesJSONSchema, numbersByPicturesSVG ],
	pikasTextEntry: [ pikasTextEntryJSONSchema, pikasTextEntrySVG ],
	pointArea: [ pointAreaJSONSchema, pointAreaSVG ],
	pointAreaExt: [ pointAreaExtJSONSchema, pointAreaExtSVG ],
	ratings: [ ratingsJSONSchema, ratingsSVG ],
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
	debugVarsOutClear();

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
					oldStatusVar = debugVarsOutObj( 'Status', res, oldStatusVar );
					return res;
				}
				extres.statusVarDef();
			}

			// Patch scoreDef for output
			if ( extres.scoreDef ) {
				const oldScoreDef = extres.scoreDef.bind( extres );
				let oldScoreVals = {};
				extres.scoreDef = function (exportAll=false) {
					const res = oldScoreDef(exportAll);
					if ( !exportAll && Object.keys(res).length > 0 ) {
						oldScoreVals = debugVarsOutObj( 'Variables', res, oldScoreVals );
					}
					return res;
				}
				extres.scoreDef();
			}

			///// getState Wrapper
			if ( extres.getState ) {
				if ( process.env.NODE_ENV === 'production' ) {

					window.getState = () => {
						if ( !base?.isInitDone() ) {
							console.error("*** getState() called before initialization is done! ***");
						}
						return extres.getState();
					}

				} else {

					window.getState = () => {
						if ( !base?.isInitDone() ) {
							console.error("*** getState() called before initialization is done! ***");
						}
						const jsonState = extres.getState();
						try {
							const state = JSON.parse( jsonState );
							console.log( "*** getState() called:", state );
						} catch (e) {
							console.error("*** getState() called - Error parsing state:", e);
						}
						return jsonState;
					}
				}
			}

			///// setState Wrapper
			if ( extres.setState ) {
				const prInitDone = base?.getInitDonePromise() ?? Promise.resolve();
				if ( process.env.NODE_ENV === 'production' ) {

					window.setState = (state) => prInitDone.then( extres.setState.bind(extres, state) );

				} else {

					window.setState = (jsonState) => {
						let state = {};
						try {
							state = JSON.parse( jsonState );
						} catch (e) {
							console.error("*** setState() called with invalid JSON state! ***");
						}
						if ( !base?.isInitDone() ) {
							console.warn("*** setState() called before initialization is done! The state will be applied after initialization. ***");
							return prInitDone.then( () => {
								console.log( "*** setState() executed:", state );
								extres.setState( jsonState );
							});
						} else {
							console.log( "*** setState() called:", state );
							return extres.setState( jsonState );
						}
					};
				}
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
			let configJson = JSON.parse( json );
			const schemaData = searchSchemaData(configJson);
// console.log(configJson);
			if ( !schemaData || !schemaData.___name || !( schemaData.___name in templs ) ) {
				throw new Error( 'Diese JSON hat kein bekanntes Schema!' );
			}

			// Schema selection ausblenden
			const schSel = document.getElementById('schema_select');
			schSel.style.display = 'none';

			// schema laden
			let [ schema ] = templs[schemaData.___name];
			schema = parseSchema( schema );
			loadSchema( schema );

			// Neue Default-Werte patchen (z.B. für Funktionen, die es in alten Versionen noch nicht gab)
			configJson = patchConfigJson( schema, configJson, schemaData );

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

let hrPosY = null, hrElement=null;
const ewk_div = document.getElementById('EWK');
const editor_div = document.getElementById('editor_container');

function hrmove (ev) {
	const diff = ev.clientY - hrPosY;
	hrElement.previousElementSibling.style.height = `${ hrElement.previousElementSibling.offsetHeight + diff }px`;
	hrElement.nextElementSibling.style.height = `${ hrElement.nextElementSibling.offsetHeight - diff }px`;
	hrPosY = ev.clientY;
	ev.stopPropagation();
	ev.preventDefault();
}
['ruler', 'ruler2'].forEach( el => {
	const hr = document.getElementById( el );
	hr.addEventListener( 'mousedown', (ev) => {
		if ( hrPosY === null ) {
			hrElement = hr;
			hrPosY = ev.clientY;
			document.addEventListener( 'mousemove', hrmove );
			ev.stopPropagation();
		}
	});
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
// Resize debugVarsOut
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

function debugVarsOutObj ( t, res, oldRes ) {

	if ( typeof res === 'object' && !object_equals( res, oldRes ) ) {
		// let dbg = `<span style="background-color:${ t == 'Scores' ? '#FADBD8' : '#FCF3CF'}">${t}:</span><br><table>`;
		// Object.entries( res )
		// 	// .sort( (a,b) => a[0]==b[0] ? NaN : a[0]<b[0] ? -1 : 1 )
		// 	.forEach( ([k,v]) => dbg += `<tr><td>${k}:</td><td>${JSON.stringify(v)}</td></tr>` );
		// debugVarsOut( dbg + "</table><br>" );
		let dbg = `<span class="${t}">${t}:</span>`;
		Object.entries( res )
			// .sort( (a,b) => a[0]==b[0] ? NaN : a[0]<b[0] ? -1 : 1 )
			.forEach( ([k,v]) => {
				dbg += `<span class="${ oldRes[k] !== v ? 'c' :'nc' }" onclick="var2clip(event,'${k}')">${k}: ${JSON.stringify(v)}</span>`
			});
		debugVarsOut( dbg + "<br>" );

		return res;
	}

	return oldRes;
}

function debugVarsOutClear () {
	debugVarsOutDiv.innerHTML = '';
}

const debugVarsOutDiv = document.getElementById( 'debugVarsOut' );
function debugVarsOut (s) {
	debugVarsOutDiv.innerHTML += "\n"+s.replace("<pref>","&lt;pref&gt;");
	debugVarsOutDiv.scrollTop = debugVarsOutDiv.scrollHeight;
}
window.debugVarsOut = debugVarsOut;

//////////////////////////////////////////////////////////////////////////////
//
// debugLogsOut
//

const debugLogsOut = document.getElementById('debugLogsOut');

// Enable/Disable type
const headers = Array.from( debugLogsOut.getElementsByClassName('header') );
headers.forEach( header => {
	header.addEventListener( 'click', ev => {
		const enabled = header.classList.toggle('enabled');
		const type = ['logs','events'].find( cl => header.id === cl );
		const divs = debugLogsOut.querySelectorAll('div');
		if ( divs ) {
			divs.forEach( el => {
				if ( el.classList.contains(type) ) {
					if ( enabled ) {
						el.classList.remove('hidden');
					} else {
						el.classList.add('hidden');
					}
				}
			});
		}
	});
})

// clear Button
const clearDebugLogOut = () => {
	const allDivs = debugLogsOut.querySelectorAll('div');
	allDivs.forEach( div => div.remove() )
}
const trash = debugLogsOut.querySelector('#clear');
trash.addEventListener( 'click', clearDebugLogOut )

// Ausgabe
const shortJsonOutput = data => {
	if ( typeof data === 'object' && data !== null ) {
		if ( Array.isArray(data) ) {
			if ( data.length > 15 ) {
				return [ ...data.slice(0, 14), "[..]" ];
			}
		} else {
			return Object.fromEntries( Object.entries(data).map( ([k,v]) => [k, shortJsonOutput(v)]) )
		}
	} else if ( typeof data === 'string' && data.length>30 ) {
		return data.substring( 0, 28 ) + "[..]";
	}
	return data
}

function debugLogsOutFnc (obj, method, type, transFnc) {
	const oldMethod = obj[method];

	obj[method] = function (...args) {
		const [ title, data ] = transFnc(...args);
		if ( !title && !data ) {
			return;
		}
		const headerEl = debugLogsOut.querySelector( '#'+type );
		const typeEnabled = !headerEl || headerEl.classList.contains('enabled');
		const div = document.createElement('DIV');
		div.classList.add(type);
		if ( !typeEnabled ) {
			div.classList.add('hidden');
		}
console.log("=======",data,shortJsonOutput(data));
		div.innerHTML = `${ title ? `<span class="title">${title}</span>` : '' }${data ? JSON.stringify( shortJsonOutput(data) ) : ''}`;
		debugLogsOut.appendChild(div);
		debugLogsOut.scrollTop = debugLogsOut.scrollHeight;

		oldMethod.apply( obj, args );
	}
}

const callEPFDescrs = [];

// Inits
function initNewBase (base) {
	debugLogsOutFnc( base.fsm, 'postLogEvent', 'logs', ({ event, ...rest }) => [ event, rest ] );
	debugLogsOutFnc( base.fsm, 'triggerEvent', 'events', obj => [ obj ] );
	debugLogsOutFnc( base.fsm, 'callCbs', 'messages', ([ cmd, ...params ]) => [ cmd, params.join(', ') ] );

	// Message Button
	base.getInitDonePromise().then( () => {
		const oldBtn = document.getElementById('msg_btn');
		if ( oldBtn ) {
			oldBtn.remove();
		}

		// Gibt es Callbacks?
		if ( base.fsm.callEPFcbs.length>0 ) {
			// Descrs holen
			callEPFDescrs.length = 0;
			base.fsm.callEPFcbs.forEach( cb => {
				const res = cb('__DESCRIBE_CALLBACK_PARAMS__');
				if ( Array.isArray(res) && res.length>0 && res.every( r => r.length===3 ) ) {
					callEPFDescrs.push( ...res );
				}
			})

			// Button darstellen
			const btn = document.createElement('BUTTON');
			btn.textContent = "Send Msg";
			btn.id = "msg_btn";
			btn.addEventListener( 'click', showSendMsgDialog );
			if ( callEPFDescrs.length==0 ) {
				btn.setAttribute('disabled','disabled');
			}
			debugLogsOut.querySelector('.flex-container')?.appendChild(btn);
		}

		clearDebugLogOut();
	})
}

//////////////////////////////////////////////////////////////////////////////

const sendMsgDialog = document.getElementById('send-msg');
document.getElementById( 'send-msg-ok' ).addEventListener( 'click', sendMsg );
document.getElementById( 'send-msg-cancel' ).addEventListener( 'click', () => sendMsgDialog.close() );

const sendMsgSelect = document.querySelector('#send-msg .select select');
const sendMsgData = document.getElementById('send-msg-data');
const updateDialog = (idx) => {
	if ( callEPFDescrs[idx] ) {
		sendMsgDescr.innerHTML = callEPFDescrs[idx][1];
		sendMsgData.value = callEPFDescrs[idx][2];
	}
}
sendMsgData.addEventListener( 'focus', e => e.target.select() );

sendMsgSelect.addEventListener( 'change', ev => updateDialog( ev.target.value ) );
const sendMsgDescr = document.getElementById('send-msg-descr');

function showSendMsgDialog () {
	sendMsgSelect.innerHTML = callEPFDescrs
		.map( ( item, idx ) => `<option value="${idx}">${item[0]}</option>`)
		.join('');

	updateDialog(0);
	sendMsgDialog.showModal();
	sendMsgData.focus();
}

function sendMsg () {
	try {
		const sel = callEPFDescrs[ sendMsgSelect.value ][0];
		const params = sendMsgData.value
			.trim()
			.split(',')
			.map( e => e.trim() )
			.map( e => e.match(/^[0-9]+(\.[0-9]+)?$/) ? Number(e) : e )
			.map( e => e[0]=='"' && e[e.length-1]=='"' ? e.substring(1,e.length-1) : e );

		const data = {
			messageKey: 'callExternalPageFrameOperator',
			parameters: [ sel, ...params ],
		}

		window.postMessage( JSON.stringify(data), '*' );
	} catch (e) {
		// console.error(e);
	};

	sendMsgDialog.close();
}

//////////////////////////////////////////////////////////////////////////////

window.onresize = updateSizeEwk;
