import { barSlider_freePaintMarker_freeLabels_insertButtons } from "../../libs/barSlider";
import { addScoringValsParser, dp2inputRegExp } from "../common";

export class barSliderFullFromSchema extends barSlider_freePaintMarker_freeLabels_insertButtons {

	constructor ( base, opts = {} ) {

		// BarSlider Defs
		if ( opts.width<= 0 ) {
			opts.width += base.width - opts.x;
		}

		// freePaint Defs
		if ( !opts.paintLines || !opts.modeIconBarDef ) {
			// no freePaint!
			opts.paintLines = null;
			opts.modeIconBarDef = null;
		} else {
			if ( opts.modeIconBarDef.x<0 ) {
				opts.modeIconBarDef.x += base.width;
			}
			if ( opts.modeIconBarDef.y<0 ) {
				opts.modeIconBarDef.y += base.height;
			}
		}

		// freeLabels Defs
		if ( opts.freeLabelDefs ) {
			const defEd = opts.freeLabelDefs.defEd;
			if ( defEd ) {
				if ( ( defEd.pdp || defEd.dp ) && opts.freeLabelDefs.insertButtons && opts.freeLabelDefs.insertButtons.texts && opts.freeLabelDefs.insertButtons.texts.length>0 ) {
					defEd.units = opts.freeLabelDefs.insertButtons.texts.join('|');
				}
				dp2inputRegExp( defEd );
			}
			opts.freeLabels = [];

			const hdefs = {
				left: {
					x: (def) => opts.x - def.width - 1,
					align: 'right',
				},
				middle: {
					xFnc: (def) => function () {
						return Math.min( opts.x+opts.width-def.width-1, Math.max( opts.x+1, this.val2x( this.pos )-def.width/2 ) )
					},
				},
				right: {
					x: opts.x + opts.width + 1,
					align: 'left',
				},
			};
			const vdefs = {
				top: {
					y: opts.y-29,
				},
				bottom: {
					y: opts.y+opts.height+6,
				}
			}
			for ( const hdef in hdefs) {
				for ( const vdef in vdefs ) {
					const hOpts = opts.freeLabelDefs[hdef];
					if ( hOpts && hOpts[vdef] ) {
						const def = hOpts[`${vdef}Edit`] ? opts.freeLabelDefs.defEd : opts.freeLabelDefs.defNonEd;
						const allOpts = Object.assign({
								value: hOpts[`${vdef}Text`],
							}, hdefs[hdef], vdefs[vdef], def
						);
						for ( const k in allOpts ) {
							if ( typeof(allOpts[k]) === 'function' ) {
								allOpts[k] = allOpts[k]( def )
							}
						}
						opts.freeLabels.push( allOpts );
					}
				}
			}

			// insertButtons Defs
			if ( opts.freeLabelDefs.insertButtons && opts.freeLabelDefs.insertButtons.texts && opts.freeLabelDefs.insertButtons.texts.length>0 ) {
				const buts = opts.freeLabelDefs.insertButtons;
				if ( buts.x<0 ) {
					buts.x += base.width;
				}
				if ( buts.y<0 ) {
					buts.y += base.height;
				}
				if ( !buts.height ) {
					buts.height = buts.width;
				}
				opts.insertIconDefs = [ buts ];
				if ( buts.fontSize ) {
					opts.insertIconBarDef = { fontSize: buts.fontSize };
				}
			}

			delete opts.freeLabelDefs;
		}


		super( base, opts );

		addScoringValsParser(this);
		this.parseScoringVals(opts);
	}

	scoreDef () {
		const res = {};
		if ( this.readonly ) {
			return res;
		}

		if ( this.dataSettings ) {
			const pref = this.dataSettings.variablePrefix;
			if ( pref ) {
				res[`V_${pref}_Value`] = Math.round( this.pos * this.dataSettings.xMult );
			}

			if ( this.freeLabels ) {
				let i=1;
				this.freeLabels.forEach( fl => {
					if ( !fl.readonly ) {
						res[`V_${pref}_Input_${i++}`] = fl.textObj ? fl.textObj.value : '';
					}
				})
			}
		}

		if ( this.computeScoringVals ) {
			this.computeScoringVals( res );
		}
		return res;
	}
}
