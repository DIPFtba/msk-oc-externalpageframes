import { inputInserts } from '../../libs/inputInserts'

// import { toolbarMathOperators, toolbarMathOperatorsFraction, toolbarMathOperatorsFractionComparison, toolbarMathOperatorsFractionPercent } from '../../libs/textareaInserts'
// const toolbars = {
// 	base: toolbarMathOperators,
// 	baseFract: toolbarMathOperatorsFraction,
// 	baseFractComp: toolbarMathOperatorsFractionComparison,
// 	baseFractPerc: toolbarMathOperatorsFractionPercent
// }
import { toolbarMathOperators } from '../../libs/textareaInserts'
import { addScoring } from '../common';

export class inputInsertsFromSchema extends inputInserts {

	constructor ( divSelector, opts = {}, base = null, addMods={}  ) {

		if ( base.fsm && base.fsm.incInitCnt ) {
			base.fsm.incInitCnt();
		}

		const div = typeof divSelector === 'string' ? document.querySelector( divSelector ) : divSelector;
		opts.divStyles = {
			width: `${ opts.width > 0 ? opts.width : div.offsetWidth + opts.width }px`,
		};
		opts.toolbar = toolbarMathOperators;
		opts.inputRegexp = '^([0-9]*(?:[,.][0-9]*)?|[ +*/:=-]|\u2212|\u22c5|\u2022|\u25cf|\u2236|\u003d)*$';

		super( divSelector, opts, base );

		if ( opts.dataSettings && opts.dataSettings.scoringPattern ) {
			this.parseScoringPattern( opts.dataSettings.scoringPattern, opts.dataSettings.variablePrefix );
		}
		const addFnc = {
			perm: (arr) => this.perm(arr),
			combinations: (arr) => this.combinations(arr),
			allCombPerm: ( arr, minLength=2 ) => this.allCombPerm(arr, minLength),
			isSumRE: ( mult, res=undefined, resOpt=true ) => this.isSumRE( mult, res, resOpt ),
			isDiffRE: ( mult, res=undefined, resOpt=true ) => this.isDiffRE( mult, res, resOpt ),
			isMultRE: ( mult, res=undefined, resOpt=true ) => this.isMultRE( mult, res, resOpt ),
			isDivRE: ( mult, res=undefined, resOpt=true ) => this.isDivRE( mult, res, resOpt ),
		}
		addScoring( this, opts, addMods.Parser, addFnc );

		if ( base.fsm && base.fsm.decInitCnt ) {
			base.fsm.decInitCnt();
		}
	}

	parseScoringPattern ( pattern, pref ) {

		this.scoringPattern = {};
		const numRe = '(?:\\.|(?:(?<!!)!)?\\d+(?:\\.\\d+)?)'; // number, optionally prepended by one '!'
		const re1 = new RegExp( `(${numRe}) *((?:([\\-+*\\/]) *${numRe} *)+)(\\[ *= *(${numRe}) *\\] *|= *(${numRe}) *)?` );
		const re2 = new RegExp( `(${numRe})`, "g" );

		pattern.forEach( p => {

			const pat = p.pattern.trim().match( re1 );
			if ( pat ) {

				const optr = {
					'+': '\\+',
					'-': '-|\u2212',
					'*': '\\*|\u22c5|\u2022|\u25cf',
					'/': '[/:]|\u2236',
				}
				const ops = optr[ pat[3] ];

				const mult = [ pat[1] ];
				for ( const m of pat[2].matchAll( re2 ) ) {
					mult.push( m[0] );
				}

				let res, resOpt;
				if ( pat[4] ) {
					res = pat[5] || pat[6];
					resOpt = pat[5] !== undefined;
				} else {
					res = p.add ? undefined : null;
					resOpt = false;
				}

				const re = this.getOpRE( ops, p.perm ? this.perm( mult ) : [mult], res, resOpt);
// console.log( ops, mult, res, resOpt, re.toString() );
				this.scoringPattern[ `V_Score_${pref}_${p.name}` ] = re;
			}
		})
	}

	scoreDef () {

		const pref = this.dataSettings.variablePrefix;
		const res ={
			[`V_Input_${pref}`]: this.extract(),
		};

		if ( this.scoringPattern ) {
			const inp = this.div.innerHTML.trim();
			Object.entries( this.scoringPattern ).forEach( ([k,re]) => res[k] = inp.match(re) ? 1 : 0 )
		}

		if ( this.computeScoringVals ) {
			this.computeScoringVals( res );
		}
		return res;
	}

}
