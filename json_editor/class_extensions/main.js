import '../../examples/main.css';

const configFileName = "extres_cfg.json";
const schemaFileName = "extres_cfg.schema.json";

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

function startImportSchemaListener () {

	// get the folder name of the EPF
	const getEPFFolderName = () => {
		const regexp = window.location.pathname.match( /\/([^/]+)\/[^/]*$/ );
		return regexp ? regexp[1] : '.';
	}

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

function initJSON ( json ) {

	if ( typeof json === 'string' ) {
		try {
			json = JSON.parse( json, true );
		} catch (e) {
			console.error( `Format-Error in JSON file '${configFileName}'` );
			return;
		}
	}

	const cfg = clearCfgJson( json );
/// #if __CLASS == 'inputInserts' || __CLASS == 'textareaInserts'
	const base = new baseInits();
/// #else
	const base = new baseInits( { container: 'container' } );
/// #endif
	if ( cfg.dataSettings ) {
		base.dataSettings = cfg.dataSettings;
	}

/// #if __CLASS == 'barPlot'
	const io = new barPlotFromSchema( base, cfg );
/// #elif __CLASS == 'barSlider'
	const io = new barSliderFromSchema( base, cfg );
/// #elif __CLASS == 'barSliderFull'
	const io = new barSliderFullFromSchema( base, cfg );
/// #elif __CLASS == 'connectedFrames'
	const io = new connectedFramesFromSchema( base, cfg );
/// #elif __CLASS == 'filledBar'
	const io = new filledBarFromSchema( base, cfg );
/// #elif __CLASS == 'freePaint'
	const io = new freePaintFromSchema( base, cfg );
/// #elif __CLASS == 'inputGrid'
	const io = new inputGridFromSchema( base, cfg );
/// #elif __CLASS == 'numbersByPictures'
	const io = new numbersByPicturesFromSchema( base, cfg );
/// #elif __CLASS == 'numberLine'
	const io = new numberLineFromSchema( base, cfg );
/// #elif __CLASS == 'numberLineWithAnnotations'
	const io = new numberLineWithAnnotationsFromSchema( base, cfg );
/// #elif __CLASS == 'numberLineWithArcs'
	const io = new numberLineWithArcsFromSchema( base, cfg );
/// #elif __CLASS == 'pointArea'
	const io = new pointAreaFromSchema( base, cfg );
/// #elif __CLASS == 'rectArrayMarkable'
	const io = new rectArrayMarkableFromSchema( base, cfg );
/// #elif __CLASS == 'stampImages'
	const io = new stampImagesFromSchema( base, cfg );
/// #elif __CLASS == 'inputInserts'
	const io = new inputInsertsFromSchema( '#container', cfg, base );
/// #elif __CLASS == 'textareaInserts'
	const io = new textareaInsertsFromSchema( '#container', cfg, base );
/// #endif

	addStatusVarDef( io, json );

	if ( io.getState ) {
		window.getState = io.getState.bind(io);
	}
	if ( io.setState ) {
		window.setState = io.setState.bind(io);
	}
}

document.addEventListener( "DOMContentLoaded", initExtRes );
