import '../main.css';

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

/// #if __CLASS == 'numberLineWithAnnotations'
import { numberLineWithAnnotationsFromSchema } from './numberLineWithAnnotations';
/// #elif __CLASS == 'numbersByPictures'
import { numbersByPicturesFromSchema } from './numbersByPictures';
/// #elif __CLASS == 'inputInserts'
import { inputInsertsFromSchema } from './inputInserts';
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
/// #if __CLASS == 'inputInserts'
	const base = new baseInits();
/// #else
	const base = new baseInits( { container: 'container' } );
/// #endif
	if ( cfg.dataSettings ) {
		base.dataSettings = cfg.dataSettings;
	}

/// #if __CLASS == 'numberLineWithAnnotations'
	const io = new numberLineWithAnnotationsFromSchema( base, cfg );
/// #elif __CLASS == 'numbersByPictures'
	const io = new numbersByPicturesFromSchema( base, cfg );
/// #elif __CLASS == 'inputInserts'
	const io = new inputInsertsFromSchema( '#container', cfg, base );
/// #endif

	addStatusVarDef( io, json );

	window.getState = io.getState.bind(io);
	window.setState = io.setState.bind(io);
}

document.addEventListener( "DOMContentLoaded", loadJSON );
