import '../../examples/textareaInserts_2cols.css'

import { textareaInserts, toolbarMathOperators, toolbarFraction, toolbarComparison, toolbarPercent } from '../../libs/textareaInserts'

const toolbars = {
	comp: toolbarComparison,
	math: toolbarMathOperators,
	fract: toolbarFraction,
	perc: toolbarPercent,
}

export class textareaInsertsFromSchema extends textareaInserts {

	constructor ( divSelector, opts = {}, base = null ) {

		let wWidth = opts.width;
		if ( wWidth==0 ) {
			wWidth = window.innerWidth;
		} else if ( wWidth<0 ) {
			wWidth += window.innerWidth;
		}

		// height is container height or window.height
		let height;
/// #if ! __EDITOR
		height = window.innerHeight;
/// #else
		height = document.getElementById('EWK').offsetHeight;
/// #endif
		let wHeight = opts.height;
		if ( wHeight==0 ) {
			wHeight = height;
		} else if ( wHeight<0 ) {
			wHeight += height;
		}
		const toolbarCellWidth = opts.toolbarCellWidth;

		const defs = {
			toolbarDirection: 'row',
			divStyles: {
				width: `${wWidth-2*toolbarCellWidth-5}px`,
				height: `${wHeight}px`,
			},

			toolbarContainerStyles: {
				// left: `${wWidth-6*toolbarCellWidth-17}px`,
				// top: `${wHeight-toolbarCellWidth-17}px`,
				width: `${2*toolbarCellWidth}px`,
				height: `${2*toolbarCellWidth}px`,
				'flex-wrap': 'wrap',
			},

			toolbarCellStyles: {
				width: `${toolbarCellWidth}px`,
				height: `${toolbarCellWidth}px`,
			},

			toolbar: [],
		};
		if ( opts.dataSettings ) {
			defs.dataSettings = opts.dataSettings;
		}

		for ( const tb in toolbars ) {
			if ( opts.toolbar[tb] ) {
				defs.toolbar = defs.toolbar.concat( toolbars[tb] )
			}
		}

		super( divSelector, defs, base );
	}

	scoreDef () {

		const pref = this.dataSettings.variablePrefix;
		const res ={
			[`V_${pref}_Input`]: this.extract(),
		};
		return res;
	}

}
