import '../../examples/main.css';

const configFileName = "extres_config.json";
const schemaFileName = "extres_config.schema.json";

function loadJSON () {

	fetch( configFileName )
		.then( response => {
			if ( !response.ok ) {
				throw new Error( `ExtRes: Error reading '${configFileName}'!` );
			}
			return response.json();
		})
		.then( json => initJSON( json ) )
		.catch( error => console.error( error ) );

}

import { getEPFFolderName } from '../common';

function startImportSchemaListener () {

	// listener for providing JSON SCHEMA to ItemBuilder
	window.addEventListener(
		"message",
		(event) => {

			try {
				const { callId } = JSON.parse(event.data);
				if ( callId !== undefined && callId.includes("importJsonData") ) {

					fetch( schemaFileName )
						.then( response => {
							if ( !response.ok ) {
								throw new Error( `ExtRes: Error reading '${schemaFileName}'!` );
							}
							return response.json();
						})
						.then( jsonSchema => {

							const pass_data = {
								jsonSchema,
								configFileName: getEPFFolderName() + '/' + configFileName,
								callId
							};
							window.parent.postMessage( JSON.stringify( pass_data ), '*' );

						})
						.catch( error => console.error( error ) );

				}
			} catch (e) {}
		},
		false );
}

function initExtRes () {
	startImportSchemaListener();
	loadJSON();
}


import { baseInits } from '../../libs/baseInits';
import { clearCfgJson, addStatusVarDef } from '../common';

/// #if __CLASS == 'barPlot'
import { barPlotFromSchema } from './barPlot';
/// #elif __CLASS == 'barSlider'
import { barSliderFromSchema } from './barSlider';
/// #elif __CLASS == 'barSliderFull'
import { barSliderFullFromSchema } from './barSliderFull';
/// #elif __CLASS == 'connectedFrames'
import { connectedFramesFromSchema } from './connectedFrames';
/// #elif __CLASS == 'filledBar'
import { filledBarFromSchema } from './filledBar';
/// #elif __CLASS == 'freePaint'
import { freePaintFromSchema } from './freePaint';
/// #elif __CLASS == 'inputGrid'
import { inputGridFromSchema } from './inputGrid';
/// #elif __CLASS == 'numbersByPictures'
import { numbersByPicturesFromSchema } from './numbersByPictures';
/// #elif __CLASS == 'numberLine'
import { numberLineFromSchema } from './numberLine';
/// #elif __CLASS == 'numberLineWithAnnotations'
import { numberLineWithAnnotationsFromSchema } from './numberLineWithAnnotations';
/// #elif __CLASS == 'numberLineWithArcs'
import { numberLineWithArcsFromSchema } from './numberLineWithArcs';
/// #elif __CLASS == 'pointArea'
import { pointAreaFromSchema } from './pointArea';
/// #elif __CLASS == 'rectArrayMarkable'
import { rectArrayMarkableFromSchema } from './rectArrayMarkable';
/// #elif __CLASS == 'stampImages'
import { stampImagesFromSchema } from './stampImages';
/// #elif __CLASS == 'inputInserts'
import { inputInsertsFromSchema } from './inputInserts';
/// #elif __CLASS == 'textareaInserts'
import { textareaInsertsFromSchema } from './textareaInserts';
/// #endif

import { ResolvablePromise } from '../common';
let baseInitialized = new ResolvablePromise();
// let jsonLoaded = new ResolvablePromise();	// for I18N

function initJSON ( json ) {

	if ( typeof json === 'string' ) {
		try {
			json = JSON.parse( json, true );
		} catch (e) {
			console.error( `Format-Error in JSON file '${configFileName}'` );
			return;
		}
	}
	// jsonLoaded.resolvePromise( json );	// for I18N

	const cfg = clearCfgJson( json );

/// #if __CLASS == 'inputInserts' || __CLASS == 'textareaInserts'
	const base = new baseInits();
/// #else
	const base = new baseInits( { container: 'container' } );
/// #endif
	baseInitialized.resolvePromise( base );

	if ( cfg.dataSettings ) {
		base.dataSettings = cfg.dataSettings;
	}

	// load Parser lazy or not
	(

		( cfg.dataSettings && cfg.dataSettings.scoringVals && cfg.dataSettings.scoringVals.length>0 ) ?
			import( /* webpackChunkName: "sce" */ 'expr-eval' ).then( ({ Parser }) => ({ Parser }) ) :
			Promise.resolve({})

	).then( addMods => {

		// there will be subsequent inits
		if ( base.fsm && base.fsm.incInitCnt ) {
			base.fsm.incInitCnt();
		}

/// #if __CLASS == 'barPlot'
		const io = new barPlotFromSchema( base, cfg, addMods );
/// #elif __CLASS == 'barSlider'
		const io = new barSliderFromSchema( base, cfg, addMods );
/// #elif __CLASS == 'barSliderFull'
		const io = new barSliderFullFromSchema( base, cfg, addMods );
/// #elif __CLASS == 'connectedFrames'
		const io = new connectedFramesFromSchema( base, cfg, addMods );
/// #elif __CLASS == 'filledBar'
		const io = new filledBarFromSchema( base, cfg, addMods );
/// #elif __CLASS == 'freePaint'
		const io = new freePaintFromSchema( base, cfg );
/// #elif __CLASS == 'inputGrid'
		const io = new inputGridFromSchema( base, cfg );
/// #elif __CLASS == 'numbersByPictures'
		const io = new numbersByPicturesFromSchema( base, cfg, addMods );
/// #elif __CLASS == 'numberLine'
		const io = new numberLineFromSchema( base, cfg );
/// #elif __CLASS == 'numberLineWithAnnotations'
		const io = new numberLineWithAnnotationsFromSchema( base, cfg, addMods );
/// #elif __CLASS == 'numberLineWithArcs'
		const io = new numberLineWithArcsFromSchema( base, cfg, addMods );
/// #elif __CLASS == 'pointArea'
		const io = new pointAreaFromSchema( base, cfg, addMods );
/// #elif __CLASS == 'rectArrayMarkable'
		const io = new rectArrayMarkableFromSchema( base, cfg, addMods );
/// #elif __CLASS == 'stampImages'
		const io = new stampImagesFromSchema( base, cfg );
/// #elif __CLASS == 'inputInserts'
		const io = new inputInsertsFromSchema( '#container', cfg, base, addMods );
/// #elif __CLASS == 'textareaInserts'
		const io = new textareaInsertsFromSchema( '#container', cfg, base );
/// #endif

		addStatusVarDef( io, json );
		base.sendChangeState( io );


		if ( io.getState ) {
			window.getState = io.getState.bind(io);
		}
		if ( io.setState ) {
			window.setState = io.setState.bind(io);
		}

		if ( base.fsm && base.fsm.decInitCnt ) {
			base.fsm.decInitCnt();
		}
	})
}

document.addEventListener( "DOMContentLoaded", initExtRes );

//////////////////////////////////////////////////////////////////////////////

// hack for IB request "importVariables" before base is initialized

function sendVarDecl (event) {

	try {
		const { callId } = JSON.parse(event.data);
		if ( callId !== undefined && callId.includes("importVariables") ) {
			// answer message when base is initialized
			baseInitialized.promise.then( base => base.fsm.answerVarDeclReq(callId) );
		}
	} catch (e) {}

}

function handleIBearlyVarImport () {
	window.addEventListener( "message", sendVarDecl, false );
	baseInitialized.promise.then( () => window.removeEventListener( "message", sendVarDecl ) );
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
