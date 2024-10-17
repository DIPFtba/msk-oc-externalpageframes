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
		isNumUnit,
		isBetween,
		match: (a,b) => a.toString().match(b),
		// regexp: (a,b) => a.match(b),
		strEqual: (a,b) => a.toLowerCase == b.toLowerCase,
	});
	for ( const fnc in addFncs ) {
		parser.functions[fnc]= addFncs[fnc];
	}

	if ( opts.dataSettings && opts.dataSettings.scoringVals && obj.scoreDef ) {

		const scoringVals = opts.dataSettings.scoringVals;

		const scores = obj.scoreDef();
		if ( typeof scores === 'object' ) {
			const varNames = Object.keys( scores );
			if ( varNames.length>0 ) {

				scoringVals.forEach( sv => {
					let cond = sv.condition;
					if ( cond ) {
						let saveCond = cond;
						const allVarsInCond = cond.matchAll( /\$\{([^}]*)}/g );
						for ( const vn of allVarsInCond ) {
							if ( vn[1].length == 0 ) {
								debugAndConsoleOut( `Variablen-Name '\${}' in Scoring nicht zulässig` );
							} else {
								const varsearch = opts.dataSettings.variablePrefix ? vn[1].replace( /<pref>/i, opts.dataSettings.variablePrefix ) : vn[1];
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
								obj.scoringVals = {};
							}
							try {
								obj.scoringVals[ sv.val ] = parser.parse( saveCond );
							} catch (e) {
								debugAndConsoleOut( `Fehler (${e}) in Scoring-Condition: ${cond}` );
							}
						}
					}
				});
			}
		}
	}

	if ( obj.scoringVals ) {
		obj.computeScoringVals = function (res) {
			let score = null;
			const scoreDat = Object.entries( this.scoringVals );
			for ( let h=0; score==null && h<scoreDat.length; h++ ) {
				const [v,c] = scoreDat[h];
				try {
					if ( c.evaluate( res ) ) {
						score = v;
					}
				} catch (e) {
					debugAndConsoleOut( `Error in scoring-condition: ${e}, ${res}` );
				}
			}
			const n = Number(score)
			res[ `V_Score_${this.dataSettings.variablePrefix}` ] = score!== null && n!==NaN ? n : score;
		}

		if ( obj.scoreDef && obj.base ) {
			obj.base.sendChangeState( obj );
		}
	}

}

//////////////////////////////////////////////////////////////////////////////

export function addStatusVarDef ( obj, json ) {

	if ( !obj.statusVarDef && json.dataSettings && json.dataSettings.variablePrefix ) {
		const statVarName = `V_Status_${json.dataSettings.variablePrefix}`;
		obj.statusVarDef = function () {
			return {
				[statVarName]: +this.getDefaultChangeState(),
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
		let re = `^[0-9]${ obj.pdp ? `{0,${obj.pdp}}` : '*' }`;
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
	} else if ( obj.pdp && !obj.units ) {
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
	return isNaN(n) ? 0 : n;
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
