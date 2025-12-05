export function clearCfgJson( json ) {

	if ( typeof json !== 'object' ) {
		return json;
	}
	if ( Array.isArray(json) ) {
		return json.map( a => clearCfgJson(a) )
	}

	const res = {};

	Object.entries( json ).forEach( ([k,v]) => {

		if ( k.substring( 0, 3 ) === '___' ) {

			// // Keys der Elemente eines Arrays nehmen
			// const arelkeys = k.match( /^___arelkeys_(.*)/ );
			// if ( arelkeys ) {
			// 	json[ arelkeys[1] ] = v.map( e => Object.keys(e) );
			// } else {

				// Vals der Elemente eines Arrays nehmen
				const arelvals = k.match( /^___arelvals_(.*)/ );
				if ( arelvals ) {
					res[ arelvals[1] ] = v.map( e => Object.values(e).map( a => clearCfgJson(a) ) );
				} else {

					// Alternative Namen einfach so speichern
					const alts = k.match( /^___alt[^_]*_(.*)/ );
					if ( alts ) {
						if ( v !== undefined ) {
							res[ alts[1] ] = clearCfgJson( v );
						}
					} else {

						// ___ Object in json integrieren
						if ( typeof v === 'object' ) {
							Object.assign( res, clearCfgJson(v) );
						}

					}
				}
			// }

		} else {

			if ( v !== undefined ) {
				const subobj = k.match( /^(.*?)___(.*)/ );
				if ( subobj ) {
					// { abc___def: 123 } => { abc: { def: 123 } }
					const newObj = clearCfgJson( { [ subobj[2] ]: v } );
					if ( !( subobj[1] in res ) ) {
						res[ subobj[1] ] = {};
					}
					Object.assign( res[ subobj[1] ], newObj );
				} else {
					// copy value
					res[ k ] = clearCfgJson(v);
				}
			}

		}
	})

	return res;
}

//////////////////////////////////////////////////////////////////////////////

import { isBetween, isNumUnit } from "../libs/common";

function debugAndConsoleOut (s) {
	if ( typeof debugOut !== 'undefined' )	{
		debugOut( `<span class="error">${s}</span>` );
	}
	console.error(s);
}

export function addScoring ( obj, opts, Parser=null, addFncs={} ) {

	obj.computeScoringVals = () => {};
	if ( !Parser ) {
		return;
	}

	// create Parser, add addFncs
	const parser = new Parser();
	Object.assign( addFncs, {
		isNull: v => v===null,
		isNumUnit,
		isBetween,
		match: (a,r,fl='') => a.toString().match( new RegExp(r,fl) ),
		// regexp: (a,b) => a.match(b),
		strEqual: (a,b) => a.toLowerCase == b.toLowerCase,
	});
	for ( const fnc in addFncs ) {
		parser.functions[fnc]= addFncs[fnc];
	}

	if ( opts.dataSettings && opts.dataSettings.scoringVals && obj.scoreDef ) {

		const scoringVals = opts.dataSettings.scoringVals;
		const pref = opts.dataSettings.variablePrefix || '';

		const scores = obj.scoreDef(true);
		if ( typeof scores === 'object' ) {
			// FIX: (sehr wahrscheinlich vorhandene) StatusVariable in res verfügbar machen
			if ( pref && !obj.readonly ) {
				scores[ `V_Status_${pref}` ] = 1;
				scores[ `V_StatHist_${pref}` ] = 1;
			}
			// Ende FIX
			const varNames = Object.keys( scores ).map( s => s.trim() );
			if ( varNames.length>0 ) {

				scoringVals.forEach( sv => {
					let cond = sv.condition.trim();
					if ( cond ) {
						let saveCond = cond;
						const allVarsInCond = cond.matchAll( /\$\{([^}]*)}/g );
						for ( const vn of allVarsInCond ) {
							if ( vn[1].length == 0 ) {
								debugAndConsoleOut( `Variablen-Name '\${}' in Scoring nicht zulässig` );
							} else {
								const varsearch = ( pref ? vn[1].replace( /<pref>/i, pref ) : vn[1] ).trim();
								const re = new RegExp( `${varsearch}$`, 'i' );
								const selVarNames = varNames.filter( v => v.match(re) );
								if ( selVarNames.length>1 ) {
									debugAndConsoleOut( `Variablen-Name '\${${vn[1]}}' in Scoring ist nicht eindeutig`);
									saveCond = '';
								} else if ( selVarNames.length == 0 ) {
									debugAndConsoleOut( `Variablen-Name '\${${vn[1]}}' in Scoring unbekannt`);
									saveCond = '';
								} else {
									saveCond = saveCond.replace( vn[0], selVarNames[0] );
								}
							}
						}
						if ( saveCond ) {
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
							if ( Array.from( saveCond.matchAll( /[!<>]?=+/g ) ).some( m => m[0]=='=' ) ) {
								debugAndConsoleOut( `Wertzuweisung (=) statt Vergleichsoperator (==) in "${cond}" gefunden! Ist das beabsichtigt?` );
							}
							if ( saveCond.includes('<>') ) {
								debugAndConsoleOut( `Zeichenkette (<>) stat (!=) in "${cond}" gefunden! Ist das beabsichtigt?` );
							}
							if ( saveCond.includes('||') ) {
								debugAndConsoleOut( `Doppeltes "||" statt "or" in "${cond}" gefunden! Ist das beabsichtigt?` );
							}
							if ( saveCond.includes('&&') ) {
								debugAndConsoleOut( `Doppeltes "&&" statt "and" in "${cond}" gefunden! Ist das beabsichtigt?` );
							}

							if ( !( 'scoringVals' in obj ) ) {
								obj.scoringVals = [];
							}
							try {
								const num = Number(sv.val);
								obj.scoringVals.push( [ !Number.isNaN(num) ? num : sv.val, parser.parse( saveCond ) ] );
							} catch (e) {
								debugAndConsoleOut( `Fehler (${e}) in Scoring-Condition: ${cond}` );
							}
						}
					}
				});
			}
		}
	}

	if ( obj.scoringVals && obj.scoringVals.length>0 ) {
		obj.computeScoringVals = function (res) {
			// FIX: StatusVariable in res verfügbar machen
			let res_in = res;
			const pref = this.dataSettings?.variablePrefix || '';
			if ( this.statusVarDef ) {
				res_in = Object.assign( {}, res, this.statusVarDef() );
			} else if ( pref && !this.readonly ) {
				// Ist noch nicht verfügbar, wird es aber (sehr wahrscheinlich) später sein
				res_in[ `V_Status_${pref}` ] = 1;
				res_in[ `V_StatHist_${pref}` ] = 1;
			}
			// Ende FIX
			const scoreDat = this.scoringVals;
			// Wenn die Werte von scoringVals Numbers sind, wird der erste, bei dem die Condition true ist,
			// in `V_Score_${pref}` geschrieben.
			// Gibt es auch String-Werte, werden die Vaiablen `V_<xyz>_${pref}` je nach Condition mit 0|1 gesetzt
			let score = null; // Hier wird der `V_Score_${pref}` "gesammelt"
			const evalVarNames = scoreDat.filter( sd => typeof sd[0]==='string' && sd[0] ).map( sd => sd[0] );
			evalVarNames.forEach( vn => {
				// Erstmal alle auf 0 setzen
				res[ `V_${vn}_${pref}` ] = 0;
			});
			const hasEvalVars = evalVarNames.length>0;

			for ( let h=0; ( score===null || hasEvalVars ) && h<scoreDat.length; h++ ) {
				const [v,c] = scoreDat[h];
				try {
					if ( c.evaluate( res_in ) ) {
						if ( typeof v === 'string' && v ) {
							// String-Wert: Setze die Variable auf 1
							res[ `V_${v}_${pref}` ] = 1;
						} else if ( score === null ) {
							// Number-Wert: Setze score, aber nur, wenn noch nicht gesetzt
							score = v;
						}
					}
				} catch (e) {
					debugAndConsoleOut( `Error in scoring-condition: ${e}` );
				}
			}
			if ( !hasEvalVars || evalVarNames.length<scoreDat.length ) {
				const n = Number(score)
				res[ `V_Score_${pref}` ] = score!== null && !Number.isNaN(n) ? n : score;
			}
		}

		if ( obj.scoreDef && obj.base ) {
			obj.base.sendChangeState( obj );
		}
	}

}

//////////////////////////////////////////////////////////////////////////////

export function addStatusVarDef ( obj, json ) {

	const pref = json.dataSettings?.variablePrefix;
	if ( !obj.readonly && !obj.statusVarDef && pref ) {

		const statVarName = `V_Status_${pref}`;
		const statHistVarName = `V_StatHist_${pref}`;
		let statusHistory = 0;

		obj.statusVarDef = function () {
			const currStatus = +this.getDefaultChangeState();
			if ( currStatus ) {
				statusHistory = 1;
			}
			return {
				[statVarName]: currStatus,
				[statHistVarName]: statusHistory,
			}
		}

		// get/setState patchen, damit V_StatHist_... mit gespeichert wird
		const statusHistKey = "_statusHist";
		const valueWrapperKey = "_state";

		const oldGetStateFnc = obj.getState;
		if ( oldGetStateFnc ) {

			obj.getState = function () {
				// "alte" getState aufrufen
				let state = oldGetStateFnc.call( obj );
				let jsonFormat = 0;

				if ( typeof state === 'string' && state.length > 0 ) {
					try {
						const data = JSON.parse( state );
						state = data;
						jsonFormat = 1;
					} catch (e) {
						// Ignore JSON parse errors
					}
				}

				if ( typeof state === 'object' && !Array.isArray(state) && state !== null && !( statusHistKey in state ) ) {
					// Einfaches Objekt, in dem statusHistKey gesetzt wird
					state[ statusHistKey ] = statusHistory;
				} else {
					// Status wrappen
					state = {
						[ valueWrapperKey ]: state,
						[ statusHistKey ]: statusHistory,
					}
				}

				return jsonFormat ? JSON.stringify(state) : state;
			}
		}

		const oldSetStateFnc = obj.setState;
		if ( oldSetStateFnc ) {

			obj.setState = function ( state ) {
				let jsonFormat = 0;

				if ( typeof state === 'string' && state.length > 0 ) {
					try {
						const data = JSON.parse( state );
						state = data;
						jsonFormat = 1;
					} catch (e) {
						// Ignore JSON parse errors
					}
				}

				if ( typeof state === 'object' && !Array.isArray(state) && state !== null ) {
					const stateKeys = Object.keys( state );
					// Status gewrappt?
					if ( stateKeys.length === 2 && valueWrapperKey in state && statusHistKey in state ) {
						statusHistory = +state[ statusHistKey ];
						state = state[ valueWrapperKey ];
					} else {
						// Nur Object mit Key?
						if ( statusHistKey in state ) {
							statusHistory = +state[ statusHistKey ];
							delete state[ statusHistKey ];
						}
					}
				}

				// "alte" setState aufrufen
				oldSetStateFnc.call( obj, jsonFormat ? JSON.stringify(state) : state );
			}
		}

	}

}

//////////////////////////////////////

// convert "1 34,5:6-9" to [1,34,5,6,7,8,9]
/**
 * Parses a string containing range values and returns an array of numbers.
 * @param {string} s - The string containing the range values.
 * @returns {number[]} - An array of numbers parsed from the range values.
 */
export const readRangeArray = (s) => {
	const res = [];

	for ( const rr of s.matchAll( /([0-9]+) *(?:- *([0-9]+))?/g ) ) {
		if ( rr[2] && rr[1]<rr[2] ) {
			const rr2=Number(rr[2]);
			for ( let h=Number(rr[1]); h<=rr2; h++ ) {
				res.push(h);
			}
		} else {
			res.push( Number(rr[1]) )
		}
	}

	return res;
}

//////////////////////////////////////

/**
 * Converts an object containing properties for decimal places, decimal precision, and units into a regular expression for input validation.
 * @param {Object} obj - The object containing properties for decimal places, decimal precision, and units.
 */
export const dp2inputRegExp = (obj) => {

	/**
	 * Generates a regular expression pattern for a given unit. (case insensitive concatenation of upper and lower case characters)
	 * @param {string} u - The unit string.
	 * @returns {string} The regular expression pattern for the unit.
	 */
	const unitRegExp = (u) => {
		let r = '';
		for ( const c of u.trim() ) {
			const u = c.toUpperCase();
			const l = c.toLowerCase();
			r += u != l ? `[${l}${u}]?` : `${c}?`;
		}
		return r;
	};

	if ( obj.pdp || obj.dp ) {
		let re = `^$|^[0-9]${ obj.pdp ? `{1,${obj.pdp}}` : '+' }`;
		if ( obj.dp ) {
			re += `([,.][0-9]{0,${obj.dp}})?`;
		}
		if ( obj.units ) {
			re += ` ?(${obj.units.split('|').map( u => unitRegExp(u) ).join('|')})?`;
		}
		obj.inputRegexp = re + '$';
	}
	delete obj.pdp;
	delete obj.dp;
	delete obj.units;
}

export const dp2labFncInputRegExp = ( obj, opts, nam='' ) => {
	let lVF, lT;
	if ( !obj ) {
		return
	}

	if ( obj.dp && !obj.units ) {
		lVF = strToNum;
		lT = 'Number';
	} else if ( obj.pdp && !obj.dp && !obj.units ) {
		lVF = strToInt;
		lT = 'Integer';
	} else {
		lVF = v => v;
		lT = 'String';
	}
	opts[`lab${nam}ValFnc`] = lVF;
	opts[`lab${nam}Type`] = lT;

	dp2inputRegExp(obj);
}

//////////////////////////////////////

export const strToInt = (s) => {
	const n = parseInt(s);
	return Number.isNaN(n) ? 0 : n;
}

export const strToNum = (s) => {
	s = s.replace( ',', '.' );
	return parseFloat( s );
	// const n = parseFloat( s );
	// return isNaN(n) ? 0 : n;
}

//////////////////////////////////////

export class ResolvablePromise {

	constructor() {
		this.prom = new Promise( (res,rej) => {
			this.res = res;
			this.rej = rej;
		});
	}

	resolvePromise( res ) {
		this.res( res );
	}

	rejectPromise( rej ) {
		this.rej( rej );
	}

	get promise() {
		return this.prom;
	}
}

//////////////////////////////////////////////////////////////////////////////


// get the folder name of the EPF
export const getEPFFolderName = ( emptyVal='.' ) => {
	const regexp = window.location.pathname.match( /\/([^/]+)\/[^/]*$/ );
	return regexp ? regexp[1] : emptyVal;
}

//////////////////////////////////////////////////////////////////////////////

// I18N support

export function getI18nDescr ( json, nameFnc=getEPFFolderName ) {

	const name = nameFnc('').replaceAll( '/', '_' );

	if ( !json.dataSettings || !json.dataSettings.i18nKeysCtxs ) {
		return [];
	}

	const i18nData = [];

	// Collect Info
	Object.entries( json.dataSettings.i18nKeysCtxs ).forEach( ([key, ctx]) => {

		// Pfad in JSON suchen
		const keyParts = key.split( '.' );
		let val = json;
		while (1) {
			const k = keyParts.shift();
			if ( !( k in val ) ) {
				// PFad nicht gefunden
				val = null;
				break;
			}
			val = val[ k ];
			if ( keyParts.length === 0 ) {
				// Einzelner Wert gefunden
				break;
			}
			if ( typeof val !== 'object' ) {
				// Pfad geht nicht weiter
				val = null;
				break;
			}
			if ( Array.isArray(val) ) {
				if ( keyParts.length<=1 ) {
					// Array gefunden
					break;
				} else {
					// array mittendrin, Fehler
					val = null;
					break;
				}
			}
		}

		const add = (text,currkey) => {
			// Einen Wert adden, wenn wirklich Text
			text = text.trim();
			if ( text && !text.match( /^[0-9,. %]+$/ ) ){
				const descr = ctx.replaceAll( '${}', name ).trim();
				const entry = {
					key: name.length>0 ? `${name}.${currkey}` : currkey,
					text,
					descr,
				}
				i18nData.push( entry );
			}
		}

		if ( val !== null ) {
			if ( typeof val !== 'object' ) {
				// Einzelnen Wert schreiben
				add( val, key );
			} else {
				// Array-Werte schreiben
				const k = keyParts.pop();
				const stammKey = k ? key.substring( 0, key.length-k.length-1 ) : key;
				val.forEach( (v,i) => {
					if ( k ) {
						if ( k in v ) {
							add( v[k], `${stammKey}.${i}.${k}` );
						}
					} else {
						add( v, `${stammKey}.${i}` );
					}
				});
			}
		}
	})
// console.log( "============== i18nData", i18nData );

	return i18nData;
}

///////////////////////////////////////

export function patchCfgI18n ( json, i18n, nameFnc=getEPFFolderName ) {

	const name = nameFnc('').replaceAll( '/', '_' );

	i18n.forEach( ({ key, text }) => {

		// EPF Name + '.' muss am Anfang wegnehmen
		if ( name.length>0 ) {
			if ( !key.startsWith( name + '.' ) ) {
				return;
			}
			key = key.substring( name.length+1 );
		}
		const keyParts = key.split( '.' );
		let val = json;

		while (1) {
			const k = keyParts.shift();
			if ( !( k in val ) ) {
				// PFad nicht gefunden
				break;
			}
			if ( keyParts.length === 0 ) {
				// Einzelner Wert gefunden
				val[ k ] = text;
				break;
			}
			val = val[ k ];
		}
	})
}

///////////////////////////////////////

export function setBodyFont ( fontPath, extraCss={} ) {
	if ( !fontPath || typeof fontPath !== 'string' || fontPath.length === 0 ) {
		return;
	}

	// Erstelle ein neues <style> Element
	const styleElement = document.createElement('style');

	// Extrahiere den Font-Namen aus dem Dateinamen (ohne Pfad und Erweiterung)
	const fontName = fontPath.split('/').pop().split('.')[0];

	// Definiere die @font-face Regel und wende sie auf den body an
	styleElement.textContent = `
		@font-face {
			font-family: '${fontName}';
			src: url('${fontPath}');
		}
		body {
			font-family: '${fontName}', Arial, sans-serif;
			${Object.entries(extraCss).map(([key, value]) => `${key}: ${value};`).join('\n')}
		}
	`;

	// Füge das Style-Element zum <head> hinzu
	document.head.appendChild(styleElement);
}
