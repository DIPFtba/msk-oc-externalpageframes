//
// Very very simple test script of ScoringPatterns of inputInserts
//
// inputInsertsFromSchema must be loaded and initialized in dev mode
// in Editor before
// (window.extres must be set)
//
// script can be run in browser console
//      var script = document.createElement('script'); script.src = 'scoringMuster.js'; document.head.appendChild(script);
// or execute in console
//


// !!!!!
// !!!!! Findet bei perm=1 und Verwendung von "!" falsche "Fehler" (die eigentlich korrekt sind)
// !!!!! es lohnt sich aber nicht, das zu "reparieren" (da es nur ein Testscript ist)
// !!!!!

var opi1=0, opi2=0;

const extres = window.extres;
const pref = extres.dataSettings.variablePrefix;

function gen () {
	[
		[ '*', [3,5] ],
		[ '*', [2,5,6] ],
		[ '/', [20,4] ],
		[ '+', [3,1] ],
		[ '+', [5,13] ],
		[ '+', [7,16,4] ],
		[ '+', [3.32,1] ],
		[ '+', [5.23,13.54] ],
		[ '+', [7.5,16,4.45] ],
		[ '-', [40,26] ],
		[ '-', [20,6,3] ],
		[ '-', [400,26.53] ],
		[ '-', [1000.38,6.45,3.15] ],
	].forEach( ([operator,operanden]) => {

		['',' '/*,'  '*/].forEach( space => {
			( ['+','*'].includes(operator) ? [0,1] : [0] ).forEach( perm => {
				[0,1].forEach( res => {
					( res ? [0,1] : [0] ).forEach( resOpt => {

						let pattern = operanden.join(`${space}${operator}${space}`);
						const result = eval( pattern );
						if ( res ) {
							pattern += resOpt ? `${space}[${space}=${space}${result}${space}]${space}` : `${space}=${space}${result}${space}`;
						}
						check( { name:"chk", pattern, perm, add:false }, operator, operanden, result, res, resOpt );

						// zufällig ! in Pattern einstreuen
						let notAr;
						do {
							notAr = operanden.map( () => Math.random() < 0.5 );
						} while ( notAr.every( x => !x ) || ( perm && notAr.reduce( (acc,v) => acc + ( v ? 1 : 0 ), 0 ) > 1 ) );

						pattern = operanden.map( (op,i) => ( notAr[i] ? '!' : '' )+op ).join(`${space}${operator}${space}`);
						if ( res ) {
							pattern += resOpt ? `${space}[${space}=${space}${result}${space}]${space}` : `${space}=${space}${result}${space}`;
						}
						check( { name:"chk", pattern, perm, add:false }, operator,
							operanden.map( (op,i) => notAr[i] ? '!'+op : op ),
							result, res, resOpt );

						// zufällig . in Pattern einstreuen
						do {
							notAr = operanden.map( () => Math.random() < 0.5 );
						} while ( notAr.every( x => !x ) );

						pattern = operanden.map( (op,i) => notAr[i] ? '.' : op ).join(`${space}${operator}${space}`);
						const resTmp = Math.random() < 0.2 ? '.' : result.toString();
						if ( res ) {
							pattern += resOpt ? `${space}[${space}=${space}${resTmp}${space}]${space}` : `${space}=${space}${resTmp}${space}`;
						}
						check( { name:"chk", pattern, perm, add:false }, operator,
							operanden.map( (op,i) => notAr[i] ? '.' : op ),
							resTmp, res, resOpt );

					});
				});
			});
		});
	});
}

///////////////////////////////////////

function bin2arr( bin, len ) {
	const arr = [];
	for ( let i = 0; i < len; i++ ) {
		arr.unshift( bin & 1 );
		bin >>= 1;
	}
	return arr;
}

function getRandomArrayElement(arr) {
	const randomIndex = Math.floor(Math.random() * arr.length);
	return arr[randomIndex];
}

function createOperand( operand, opCorr ) {

	function replaceCharAt(str, index, newChar) {
		if (index < 0 || index >= str.length) {
		  throw new Error('Index out of bounds');
		}
		return str.substring(0, index) + newChar + str.substring(index + 1);
	}

	let op = operand.toString();

	if ( operand === '.' ) {
		if ( !opCorr ) {
			console.error( "Fehler: Operand '.' soll falsch sein!" );
			return '';
		}
		op = Math.floor( Math.random() * 10 ).toString();
		if ( Math.random() < 0.5 ) {
			op += '.' + Math.floor( Math.random() * 10 ).toString();
		}
	}

// console.log("operand,opCorr", op, opCorr,opi2);
	if (!opCorr) {
		switch ( opi2 % 3 ) {
			case 0: op = (operand-1).toString(); break;
			case 1: op = (operand+1).toString(); break;
			case 2:
				let i;
				do {
					i = Math.floor( Math.random() * op.length );
				} while ( op[i] == '.' );
				const old = op[i];
				let newChar;
				do {
					newChar = Math.floor(Math.random() * 10).toString();
				} while (newChar == old);
				op = replaceCharAt(op, i, newChar);
				break;
		}
		opi2++;
	}
// console.log("operand,opCorr", op, opCorr);

	switch ( opi1 % 5 ) {
		case 0: break;
		case 1: op = '0' + op; break;
		case 2: op = '00' + op; break;
		case 3: op = op + ( op.includes('.') ? '' : '.' ) + '0'; break;
		case 4: op = op + ( op.includes('.') ? '' : '.' ) + '00'; break;
	}
	opi1++;
// console.log("operand,opCorr", op, opCorr);

	return op;
}

///////////////////////////////////////

function test ( str, patternObj, corr ) {

	// console.log(str, corr);
	extres.div.innerHTML = str;
	const res = extres.scoreDef();

	// console.log( str, res, corr, pref, patternObj.name );
	if ( res[ `V_Score_${pref}_${patternObj.name}` ] != corr ) {
		console.error( patternObj, str, res, corr );
	}
}

function check( patternObj, operator, operanden, result, res, resOpt ) {

console.log("patternObj", patternObj.pattern, patternObj.perm, patternObj.add);

	extres.parseScoringPattern( [patternObj], pref );

	const spaces = () => ' '.repeat( Math.floor( Math.random() * 3 ) );

	for ( let i = 0; i < 2**operanden.length; i++ ) {

		// operatoren erzeugen
		const opCorr = bin2arr( i, operanden.length );
		const allOpCorr = opCorr.every( x => x );

		// permutieren
		// let allOperanden = patternObj.perm ? extres.perm( operanden ) : [ operanden ];
		// bei "PERM" nur eine zufällige Kombination!
		let allOperanden = patternObj.perm ? [ getRandomArrayElement( extres.perm( operanden ) ) ] : [ operanden ];
		allOperanden.forEach( nowOperanden => {

			if ( opCorr.some( (x,j) => !x && nowOperanden[j] == '.' ) ) {
				// Ein Operand '.' soll falsch sein -> das geht nicht
				return;
			}
	// if ( patternObj.perm ) console.log("nowOperanden", nowOperanden);

			const isNot = nowOperanden.map( operand => operand.toString().startsWith('!') );
			const hasNot = isNot.some( x => x );
			const notNot = isNot.map( (x,i) => isNot[i] ? nowOperanden[i].slice(1) : nowOperanden[i] );
			const hasDot = nowOperanden.some( x => x == '.' );

			let myops;
			try {
				do {
					myops = notNot.map( ( operand, j ) => createOperand( operand, isNot[j] ^ opCorr[j] ) );
				} while ( !hasDot && !hasNot && ( ( eval( myops.map( o => parseFloat(o).toString() ).join(operator) ) == result ) !== allOpCorr ) );
			} catch (e) {
				console.error( myops.join(operator) );
				throw(e);
			}
// console.log(nowOperanden,myops,isNot);

			// aufgaben string zusammensetzen
			let aufg = spaces();
			myops.forEach( (op,i) => {
				aufg += ( i>0 ? operator + spaces() : '' )  + op + spaces();
			})

			// Ohne Res testen
			test( aufg, patternObj, allOpCorr && ( !res || resOpt ) );

			// Mit Res testen
			[0,1].forEach( resCorr => {
				if ( result=='.' && !resCorr ) {
					// Ein Result '.' soll falsch sein -> das geht nicht
					return;
				}
				const resOp = createOperand( result, resCorr );
				const correct = ( allOpCorr && ( ( !res && patternObj.add ) || ( res && resCorr ) ) );

				str = aufg + spaces() + '=' + spaces() + resOp + spaces();
				test( str, patternObj, correct );
				str = spaces() + resOp + '=' + spaces() + aufg;
				test( str, patternObj, correct );
			})
		})
	}
}

//////////////////////////////////////////////////////////////////////////////

// const it = gen();
// while ( !it.done ) {
// 	setTimeout( () => {
// 		const [str, patternObj, corr] = it.next().value;
// 		// test( str, patternObj, corr );
// 		console.log( str, patternObj, corr );
// 	} , 0 );
// 	if ( window.quit ) {
// 		break;
// 	}
// }
// delete window.quit;

gen();
