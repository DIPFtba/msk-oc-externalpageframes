
// import { isBetween, delDefaults, mergeDeep, object_equals, getXofEvent, getYofEvent, getPosOfEvent } from './common'

export function isBetween ( v, w1, w2 ) {
	return v >= Math.min( w1, w2 ) && v <= Math.max( w1, w2 );
};


export function isNumUnit ( v, num, unitRE, unitOpt, orEmpty ) {
	const numRE = `0*${num}(?:[,.]0*)?`;
	const r = unitOpt ? `${numRE}(?: *${unitRE})?|(?:${unitRE} *)?${numRE}` : `${numRE} *${unitRE}|${unitRE} *${numRE}`;
	const re = new RegExp( `^(?:${r})${ orEmpty ? '?' : '' }$` );
	return v.trim().match(re);
}


// Deletes delKeys & unchanged defaults from obj
// object deep clone, omitting some data defined by defaults and delKeys
// adopted from https://stackoverflow.com/questions/4459928/how-to-deep-clone-in-javascript
export function delDefaults ( obj = {}, defaults = {}, delKeys = [] ) {

	// if obj is array of objects: apply delDefaults to every member of array
	if ( Array.isArray(obj) ) {
		let a = [];
		obj.forEach( e => {
			if ( typeof e==='object' ) {
				a.push( delDefaults( e, defaults, delKeys ) );
			} else {
				a.push(e);
			}
		})
		return a;
	}

	if ( !obj ) {
		return obj;
	}

	let v;
	let bObject = {};
	for ( const k in obj ) {
		if ( !delKeys.includes(k) ) {
			v = obj[k];
			if ( !defaults || defaults[k]!==v ) {
				bObject[k] = (typeof v === "object") ? delDefaults( v, defaults ? defaults[k] : [] ) : v;
			}
		}
	}

	return bObject;
}

/**
 * From: https://gist.github.com/ahtcx/0cd94e62691f539160b32ecda18af3d6
 * Performs a deep merge of `source` into `target`.
 * Mutates `target` only but not its objects and arrays.
 *
 * @author inspired by [jhildenbiddle](https://stackoverflow.com/a/48218209).
 */
export function mergeDeep (target, source) {
	const isObject = (obj) => obj && typeof obj === 'object';

	if (!isObject(target) || !isObject(source)) {
		return source;
	}

	Object.keys(source).forEach(key => {
		const targetValue = target[key];
		const sourceValue = source[key];

		if ( /*Array.isArray(targetValue) &&*/ Array.isArray(sourceValue)) {
			// NO CONCATENATION OF ARRAYS!
			// target[key] = targetValue.concat(sourceValue);
			target[key] = sourceValue;
		} else if (isObject(targetValue) && isObject(sourceValue)) {
			target[key] = mergeDeep(Object.assign({}, targetValue), sourceValue);
		} else {
			target[key] = sourceValue;
		}
	});

	return target;
}

//////////////////////////////////////

// adopted from https://stackoverflow.com/questions/1068834/object-comparison-in-javascript
export function object_equals ( x, y ) {
	if ( x === y ) return true;
	// if both x and y are null or undefined and exactly the same

	if ( ! ( x instanceof Object ) || ! ( y instanceof Object ) ) return false;
	// if they are not strictly equal, they both need to be Objects

	if ( x.constructor !== y.constructor ) return false;
	// they must have the exact same prototype chain, the closest we can do is
	// test there constructor.

	// if both are arrays: unordered compare (check if all elements are contained)
	if ( Array.isArray(y) && Array.isArray(x) ) {
		if ( x.length != y.length ) return false;
		const y2 = Array.from( y );
		if ( !x.every( xe =>
			y2.some( ( ye, i ) => {
				if ( object_equals( xe, ye ) ) {
					y2.splice( i, 1 );
					return true;
				}
				return false;
			})
		)) return false;
		return y2.length===0;
	}

	for ( var p in x ) {
		if ( ! x.hasOwnProperty( p ) ) continue;
			// other properties were tested using x.constructor === y.constructor

		if ( ! y.hasOwnProperty( p ) ) return false;
			// allows to compare x[ p ] and y[ p ] when set to undefined

		if ( x[ p ] === y[ p ] ) continue;
			// if they have the same strict value or identity then they are equal

		if ( typeof( x[ p ] ) !== "object" ) return false;
			// Numbers, Strings, Functions, Booleans must be strictly equal

		if ( ! object_equals( x[ p ],  y[ p ] ) ) return false;
			// Objects and Arrays must be tested recursively
	}

	for ( p in y )
	if ( y.hasOwnProperty( p ) && ! x.hasOwnProperty( p ) )
		return false;
		// allows x[ p ] to be set to undefined

	return true;
}

//////////////////////////////////////

export function getXofEvent ( stage, event ) {
	if ( event ) {
		if ( event.simX ) {
			return event.simX;
		}
		// if ( event.evt && event.evt.clientX ) {
		// 	return event.evt.clientX;
		// }
	}
	return stage.getPointerPosition().x;
}


export function getYofEvent ( stage, event ) {
	if ( event ) {
		if ( event.simY ) {
			return event.simY;
		}
		// if ( event.evt && event.evt.clientY ) {
		// 	return event.evt.clientY;
		// }
	}
	return stage.getPointerPosition().y;
}


export function getPosOfEvent ( stage, ev ) {
	return {
		x: getXofEvent( stage, ev ),
		y: getYofEvent( stage, ev ),
	}
}


// is in DemoAni: ignore native Events (prevent e.g. stage.on(mouseleave))
export function ignoreEvent ( stage, ev ) {
	return ( stage && stage.isDemoAni && !( "simX" in ev ) );
}


//////////////////////////////////////

export const setStatePostProc = function (obj) {

	if ( obj.stage && obj.stage.isDemoAni && obj.stage.isDemoAni.endAni ) {
		obj.stage.isDemoAni.endAni( false );
	}

	if ( obj.base ) {
		obj.base.sendChangeState( obj );	// init & send changeState & score
	}
	// obj.oldChangeState = obj.base.getChangeState(obj);
	// if ( obj.scoreDef ) {
	// 	obj.oldScore = obj.scoreDef();
	// }
}

//////////////////////////////////////

export const getAbsPosition = function (element) {
	const box = element.getBoundingClientRect();
	const scrollX = window.scrollX || window.pageXOffset;
	const scrollY = window.scrollY || window.pageYOffset;
	return {
		left: box.left + scrollX,
		top: box.top + scrollY
	}
}

//////////////////////////////////////

export function regexCanLookBehind() {
	if ( regexCanLookBehind.r !== undefined ) {
		return regexCanLookBehind.r;
	}
	try {
		new RegExp( '(?<!a)b' );
		regexCanLookBehind.r = true;
		return true;
	} catch (e) {
		regexCanLookBehind.r = false;
		return false;
	}
}
