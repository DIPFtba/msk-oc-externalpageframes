import './main.css';
import { clearCfgJson, addStatusVarDef } from './common';

import C2S from "canvas2svg";

//////////////////////////////////////////////////////////////////////////////

import { numberLineWithAnnotationsFromSchema } from './class_extensions/numberLineWithAnnotations';
import numberLineWithAnnotationsJSONSchema from './schemes/numberLineWithAnnotations.schema.json';
import numberLineWithAnnotationsSVG from './svgs/numberLineWithAnnotations.svg';

import { filledBarFromSchema } from './class_extensions/filledBar';
import filledBarJSONSchema from './schemes/filledBar.schema.json';
// import filledBarSVG from './svgs/filledBar.svg';

import { numbersByPicturesFromSchema } from './class_extensions/numbersByPictures';
import numbersByPicturesJSONSchema from './schemes/numbersByPictures.schema.json';
import numbersByPicturesSVG from './svgs/numbersByPictures.svg';

import { rectArrayMarkableFromSchema } from './class_extensions/rectArrayMarkable';
import rectArrayMarkableJSONSchema from './schemes/rectArrayMarkable.schema.json';
import rectArrayMarkableSVG from './svgs/rectArrayMarkable.svg';

import { inputInsertsFromSchema } from './class_extensions/inputInserts';
import inputInsertsJSONchema from './schemes/inputInserts.schema.json';
import inputInsertsSVG from './svgs/inputInserts.svg';


import { baseInits } from '../libs/baseInits';
let base = getBase();
const textContainer = document.getElementById('ewk_textcontainer');

let creator = null;
let editor;
let schemaData;

import { JSONEditor } from './jsoneditor'
import { object_equals } from '../libs/common';
// window.JSONEditor = JSONEditor;

function searchSchemaData( json ) {

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


	const exportsvg = document.getElementById('exportsvg');
	exportsvg.removeEventListener( 'click', saveSVG );
	exportsvg.removeAttribute( 'disabled' );
	if (graph) {
		exportsvg.addEventListener( 'click', saveSVG );
	} else {
		exportsvg.setAttribute( 'disabled', 'disabled' );
	}


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
	window.editor = editor;
	editor.on( 'change', updateEWK );

	editor.on( 'ready', () => {
		const json = editor.getValue('root');
		schemaData = searchSchemaData(json);
		try {
			if ( schemaData && schemaData.___name ) {
				switch (schemaData.___name) {

					case 'filledBar':
						initContainer(true);
						creator = (cfgData) => new filledBarFromSchema( base, cfgData );
						break;
					case 'numberLineWithAnnotations':
						initContainer(true);
						creator = (cfgData) => new numberLineWithAnnotationsFromSchema( base, cfgData );
						break;
					case 'numbersByPictures':
						initContainer(true);
						creator = (cfgData) => new numbersByPicturesFromSchema( base, cfgData );
						break;
					case 'rectArrayMarkable':
						initContainer(true);
						creator = (cfgData) => new rectArrayMarkableFromSchema( base, cfgData );
						break;
					case 'inputInserts':
						creator = (cfgData) => {
							initContainer(false);
							return new inputInsertsFromSchema( textContainer.firstChild, cfgData, base );
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

/// #if __DEVELOP

// for Development: always load one JSON schema
loadSchema( filledBarJSONSchema );
window.updateEWK = updateEWK;

/// #else

// load schema Links
const templs = {
	filledBar: [ filledBarJSONSchema ],
	numberLineWithAnnotations: [ numberLineWithAnnotationsJSONSchema, numberLineWithAnnotationsSVG ],
	numbersByPictures: [ numbersByPicturesJSONSchema, numbersByPicturesSVG ],
	rectArrayMarkable: [ rectArrayMarkableJSONSchema, rectArrayMarkableSVG ],
	inputInsert: [ inputInsertsJSONchema, inputInsertsSVG ],
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

/// #endif

//////////////////////////////////////////////////////////////////////////////

function updateEWK () {

	// Alles löschen
	base.stage.destroyChildren();
	base.stage.setAttr( 'bw__IconBarLayer', null );

	try {

		if ( creator ) {
			const jsonData = editor.getValue('root');
// console.log(jsonData);
			const cfgData = clearCfgJson( jsonData );
// console.log(cfgData);

			const extres = creator( cfgData );

			// Patch scoreDef for output
			if ( extres.scoreDef ) {
				const oldScoreDef = extres.scoreDef.bind( extres );
				let oldScoreVals = {};
				extres.scoreDef = function () {
					const res = oldScoreDef();
					if ( typeof res === 'object' && !object_equals( res, oldScoreVals ) ) {
						console.log( '----- New Scores:' );
						Object.entries( res ).forEach( ([k,v]) => console.log( `${k}: ${JSON.stringify(v)}`) );
						oldScoreVals = res;
					}
					return res;
				}
				extres.scoreDef();
			}

			// Patch statusVarDef
			addStatusVarDef( extres, cfgData );
			if ( extres.statusVarDef ) {
				const oldStatusVarDef = extres.statusVarDef.bind( extres );
				let oldStatusVar = {};
				extres.statusVarDef = function () {
					const res = oldStatusVarDef();
					if ( typeof res === 'object' && !object_equals( res, oldStatusVar ) ) {
						console.log( '----- New Status:' );
						Object.entries( res ).forEach( ([k,v]) => console.log( `${k}: ${JSON.stringify(v)}`) );
						oldStatusVar = res;
					}
					return res;
				}
				extres.statusVarDef();
			}

			window.getState = extres.getState.bind(extres);
			window.setState = extres.setState.bind(extres);
		}

	} catch( error ) {
		console.error( "Fehler beim Erzeugen der EWK:", error );
		alert( `Fehler beim Erzeugen der EWK: ${error}` );
	}

}

//////////////////////////////////////////////////////////////////////////////

function saveSVG () {

	const stage = base.stage;

	const svgLayer = new Konva.Layer();
	const orgContext = svgLayer.canvas.context._context;
	const c2s = svgLayer.canvas.context._context = C2S({
			width: base.stage.width(),
			height: base.stage.height(),
			ctx: orgContext,
		});

	stage.add( svgLayer );
	stage.getLayers().forEach( layer => {
		if ( layer !== svgLayer ) {
			const chs = layer.getChildren();
			while ( chs.length>0 ) {
				chs[ chs.length-1 ].moveTo( svgLayer );
				stage.draw();
			}
		}
	})

	let svg = c2s.getSerializedSvg();
	// replace all scales by scale(1,1) (correct dpi distortion)
	svg = svg.replaceAll( /scale\([^)]+\)/g, 'scale(1,1)' );
	textOut( "extres.svg", svg, "image/svg" );

	updateEWK();
}

// window.saveSVG = saveSVG;

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
// console.log(reader.result);
				const json = JSON.parse( reader.result );
// console.log(json);
				if ( schemaData && schemaData.___name ) {
					const loadSchemaData = searchSchemaData( json );
					if ( loadSchemaData && loadSchemaData.___name && schemaData.___name!=loadSchemaData.___name ) {
						throw new Error( 'Diese JSON ist hat ein anderes Schema!' );
					}
				}
				editor.setValue( json );
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

function getBase () {
	const container = document.getElementById('ewk_container');
	return new baseInits({
		container,
		width: container.offsetWidth,
		height: container.offsetHeight,
	});
}

function updateSizeEwk () {
	base = getBase();
	updateEWK();
}

window.onresize = updateSizeEwk;
