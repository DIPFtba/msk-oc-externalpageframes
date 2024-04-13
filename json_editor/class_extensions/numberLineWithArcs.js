import { numberLineWithArcs } from '../../libs/numberLineWithArcs'
import { dp2inputRegExp, addScoringValsParser } from '../common';
export class numberLineWithArcsFromSchema extends numberLineWithArcs {

	constructor ( base, opts = {} ) {

		// pre-decimal places & decimal places --> inputRegexp
		[ opts.defaultArcLabel, opts.defaultTickLabel ].forEach( ann => dp2inputRegExp(ann) );
		opts.newArcDefaults = { label: opts.newArcsHLabels ? '' : null };
		if ( opts.newArcsHTicks || opts.neverCreateArcs ) {
			opts.newTickLabelDefaults = { label: '' };
		} else {
			opts.newTickLabelDefaults = { label: null };
			opts.tickHeight = 0;
			opts.tickFrameWidth = 0;
		}

		super( base, opts );

		addScoringValsParser(this);
		this.parseScoringVals(opts);
	}

	scoreDef () {
		const settings = this.dataSettings;
		const pref = settings.variablePrefix;
		const mult = settings.xMult;

		const edArcs = this.arcs.filter( a => !a.arcReadonly || !a.labelReadonly );
		const edTicks = this.ticks.filter( t => !t.tickReadonly || !t.labelReadonly );
		const scores = {
			[`S_${pref}_ArcCnt`]: edArcs.length,
			[`S_${pref}_LabCnt`]: edTicks.length,
		};

		// save Arcs
		for ( let i=0; i<settings.saveArcs; i++ ) {
			scores[`S_${pref}_ArcFrom_${i+1}`] = i<edArcs.length ? Math.round( edArcs[i].from*mult ) : null;
			scores[`S_${pref}_ArcTo_${i+1}`] = i<edArcs.length ? Math.round( edArcs[i].to*mult ) : null;
			scores[`S_${pref}_ArcLab_${i+1}`] = i<edArcs.length && edArcs[i].labelObj ? edArcs[i].labelObj.value : '';
		}

		// save Ticks
		for ( let i=0; i<settings.saveTicks; i++ ) {
			scores[`S_${pref}_LabVal_${i+1}`] = i<edTicks.length ? Math.round( edTicks[i].value*mult ) : null;
			scores[`S_${pref}_Lab_${i+1}`] = i<edTicks.length && edTicks[i].labelObj ? edTicks[i].labelObj.value : '';
		}

		if ( this.computeScoringVals ) {
			this.computeScoringVals( scores );
		}
		return scores;
	}

}