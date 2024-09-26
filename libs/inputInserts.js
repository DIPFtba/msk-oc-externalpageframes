import { textareaInserts } from './textareaInserts'

export class inputInserts extends textareaInserts {

	constructor ( divSelector, opts = {}, base = null ) {

		if ( base.fsm && base.fsm.incInitCnt ) {
			base.fsm.incInitCnt();
		}

		// apply other defaults to textareaInserts

		const defaults = {
			toolbarCellWidth: 22,
			inputHeight: 22,
			toolbarDirection: 'row',
			multiLine: false,
			stripTags: true,
		}
		const newOpts = Object.assign( {}, defaults, opts );

		// alter styles of <div>
		const divStyles = {
			position: 'absolute',
			left: '0px',
			top: `${newOpts.toolbarCellWidth}px`,
			height: `${newOpts.inputHeight}px`,
			'vertical-align': 'middle',
			overflow: 'hidden',
		}
		newOpts.divStyles = Object.assign( divStyles, newOpts.divStyles || {} );

		// alter styles of toolbar container
		const rem = newOpts.divStyles.width.match( '([0-9]+)px' );
		const width = ( rem ? rem[1] : 100 );
		const toolbarContainerStyles = {
			left: `${width-newOpts.toolbar.length*newOpts.toolbarCellWidth}px`,
			top: '0px',
		};
		newOpts.toolbarContainerStyles = Object.assign( toolbarContainerStyles, newOpts.toolbarContainerStyles || {} );

		// alter styles of toolbar cells
		const toolbarCellStyles = {
			width: `${newOpts.toolbarCellWidth}px`,
			height: `${newOpts.toolbarCellWidth}px`,
		}
		newOpts.toolbarCellStyles = Object.assign( toolbarCellStyles, newOpts.toolbarCellStyles || {} );

		// init textareaInserts
		super( divSelector, newOpts, base );

		if ( base.fsm && base.fsm.decInitCnt ) {
			base.fsm.decInitCnt();
		}
	}

	///////////////////////////////////

	getOpRE( Ops, mult, res, resOpt ) {
		// res===null means "no result/extra text specified"
		// res===undefined means "result/extra text not checked"
		const numRe = num => {
			if ( num == '.' ) {
				return `\\d+(?:[,.]\\d+)?`
			}
			num = num.toString().replace( /[.,]/, "[.,]" )
			return num.startsWith( '!' ) ?
				`\\b(?!0*${num.slice(1)}${ !num.includes('.') ? '(?:[,.]0+)?' : '0*' }\\b)\\d+(?:[.,]\\d*)?` :
				`0*${num}${ !num.includes('.') ? '(?:[,.]0+)?' : '0*' }`;
		}
		const mrs = `(?:${mult.map( m => `(?:${m.map( d => numRe(d) ).join(`\\s*(?:${Ops})\\s*`)})` ).join('|')})`;
		if ( res !== null && res !== undefined ) {
			res = numRe(res);
			const rOpt = resOpt ? '?' : '';
			return new RegExp( `^(?:(?:(?:${res}\\s*)${rOpt}(?:=|\u003d)\\s*)${mrs}|${mrs}(?:\\s*(?:=|\u003d)(?:\\s*${res})${rOpt})${rOpt})$` );
		}
		return new RegExp( res === null ? `^${mrs}$` : `(?:^|\\s|[^0-9,.])${mrs}(?:\\s|[^0-9,.]|$)` );
	}

	isOpRE ( Ops, mult, res, resOpt ) {
		return this.div.innerHTML.trim().match( this.getOpRE( Ops, mult, res, resOpt ) );
	}

	isSumRE ( mult, res=undefined, resOpt=true ) {
		return this.isOpRE( '\\+', mult, res, resOpt );
	}

	isDiffRE ( mult, res=undefined, resOpt=true ) {
		return this.isOpRE( '-|\u2212', mult, res, resOpt );
	}

	isMultRE ( mult, res=undefined, resOpt=true ) {
		return this.isOpRE( '\\*|\u22c5|\u2022|\u25cf', mult, res, resOpt );
	}

	isDivRE ( mult, res=undefined, resOpt=true ) {
		return this.isOpRE( '[/:]|\u2236', mult, res, resOpt );
	}

	// https://stackoverflow.com/questions/37579994/generate-permutations-of-javascript-array
	perm (xs) {
		let ret = [];

		for (let i = 0; i < xs.length; i = i + 1) {
			let rest = this.perm(xs.slice(0, i).concat(xs.slice(i + 1)));

			if (!rest.length) {
				ret.push([xs[i]])
			} else {
				for(let j = 0; j < rest.length; j = j + 1) {
					ret.push([xs[i]].concat(rest[j]))
				}
			}
		}
		return ret;
	}

	// https://codereview.stackexchange.com/questions/7001/generating-all-combinations-of-an-array
	combinations ( arr ) {
		const comb = [];
		const letLen = Math.pow(2, arr.length);

		for ( let i = 0; i < letLen ; i++ ){
			let temp= [];
			for ( let j=0; j<arr.length; j++ ) {
				if ((i & Math.pow(2,j))) {
					temp.push( arr[j] );
				}
			}
			if ( temp.length ) {
				comb.push(temp);
			}
		}

		return comb;
	}

	allCombPerm ( arr, minLength=2 ) {

		const combs = this.combinations( arr ).filter( e => e.length>=minLength );

		let res = [];
		combs.forEach( c => res = res.concat( this.perm( c ) ) );

		return res;
	}
}
