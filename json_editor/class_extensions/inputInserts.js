import { inputInserts } from '../../libs/inputInserts'

// import { toolbarMathOperators, toolbarMathOperatorsFraction, toolbarMathOperatorsFractionComparison, toolbarMathOperatorsFractionPercent } from '../../libs/textareaInserts'
// const toolbars = {
// 	base: toolbarMathOperators,
// 	baseFract: toolbarMathOperatorsFraction,
// 	baseFractComp: toolbarMathOperatorsFractionComparison,
// 	baseFractPerc: toolbarMathOperatorsFractionPercent
// }
import { toolbarMathOperators } from '../../libs/textareaInserts'
import { addScoringValsParser } from '../common';

export class inputInsertsFromSchema extends inputInserts {

	constructor ( divSelector, opts = {}, base = null, addMods={}  ) {

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
		addScoringValsParser( this, addMods.Parser );
		this.parseScoringVals(opts);
	}

	parseScoringPattern ( pattern, pref ) {

		this.scoringPattern = {};
		const re1 = new RegExp( "(\\d+(?:[,.]\\d+)?) *((?:([\\-+*\\/]) *(?:\\d+(?:[,.]\\d+)?) *)+)(\\[ *= *(\\d+(?:[,.]\\d+)?) *\\] *|= *(\\d+(?:[,.]\\d+)?) *)?" );
		const re2 = new RegExp( "(\\d+(?:[,.]\\d+)?)", "g" );

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
				this.scoringPattern[ `S_${pref}_${p.name}` ] = re;
			}
		})
	}

	scoreDef () {

		const pref = this.dataSettings.variablePrefix;
		const res ={
			[`V_${pref}_Input`]: this.extract(),
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
