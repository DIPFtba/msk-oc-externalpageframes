import '../../examples/main.css';

const cfgFile = "extres_cfg.json";
const errMsg = `ExtRes: Error reading '${cfgFile}'!`;

function loadJSON () {
	const xhr = new XMLHttpRequest();
	xhr.open( "GET", cfgFile, true );
	xhr.onload = () => {
		if ( xhr.readyState === 4 ) {
			if ( xhr.status === 200 ) {
				initJSON( xhr.responseText );
			} else {
				console.error( errMsg );
			}
		}
	};
	xhr.onerror = () => console.error( errMsg );
	xhr.send(null);
}


import { baseInits } from '../../libs/baseInits';
import { clearCfgJson, addStatusVarDef } from '../common';

/// #if __CLASS == 'barSlider'
import { barSliderFromSchema } from './barSlider';
/// #elif __CLASS == 'barSliderFull'
import { barSliderFullFromSchema } from './barSliderFull';
/// #elif __CLASS == 'filledBar'
import { filledBarFromSchema } from './filledBar';
/// #elif __CLASS == 'freePaint'
import { freePaintFromSchema } from './freePaint';
/// #elif __CLASS == 'numbersByPictures'
import { numbersByPicturesFromSchema } from './numbersByPictures';
/// #elif __CLASS == 'numberLine'
import { numberLineFromSchema } from './numberLine';
/// #elif __CLASS == 'numberLineWithAnnotations'
import { numberLineWithAnnotationsFromSchema } from './numberLineWithAnnotations';
/// #elif __CLASS == 'numberLineWithArcs'
import { numberLineWithArcsFromSchema } from './numberLineWithArcs';
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
			console.error( `Format-Error in JSON file '${cfgFile}'` );
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

/// #if __CLASS == 'barSlider'
	const io = new barSliderFromSchema( base, cfg );
/// #elif __CLASS == 'barSliderFull'
	const io = new barSliderFullFromSchema( base, cfg );
/// #elif __CLASS == 'filledBar'
	const io = new filledBarFromSchema( base, cfg );
/// #elif __CLASS == 'freePaint'
	const io = new freePaintFromSchema( base, cfg );
/// #elif __CLASS == 'numbersByPictures'
	const io = new numbersByPicturesFromSchema( base, cfg );
/// #elif __CLASS == 'numberLine'
	const io = new numberLineFromSchema( base, cfg );
/// #elif __CLASS == 'numberLineWithAnnotations'
	const io = new numberLineWithAnnotationsFromSchema( base, cfg );
/// #elif __CLASS == 'numberLineWithArcs'
	const io = new numberLineWithArcsFromSchema( base, cfg );
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

	window.getState = io.getState.bind(io);
	window.setState = io.setState.bind(io);
}

document.addEventListener( "DOMContentLoaded", loadJSON );
