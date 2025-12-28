import { numberLineWithArcs } from '../../libs/numberLineWithArcs'
import { dp2labFncInputRegExp, addScoring } from '../common';
export class numberLineWithArcsFromSchema extends numberLineWithArcs {

	constructor ( base, opts = {}, addMods={}  ) {

		if ( base.fsm && base.fsm.incInitCnt ) {
			base.fsm.incInitCnt();
		}

		// pre-decimal places & decimal places --> inputRegexp
		[ /*opts.default*/'Arc'/*Label*/, /*opts.default*/'Tick'/*Label*/ ].forEach( nam => {
			dp2labFncInputRegExp( opts[`default${nam}Label`], opts, nam );
		});

		opts.newArcDefaults = opts.newArcsHLabels ? { label: '', labelReadonly: false } : { labels : null, labelReadonly: true };
		opts.newTickLabelDefaults = ( opts.newArcsHTicks || opts.neverCreateArcs ) ? { label: '', labelReadonly: false } : { labels : null, labelReadonly: true };

		super( base, opts );

		const me = this;
		const addFnc = {
			compArcs: (arcs,tol) => me.compArcs(arcs,tol),
		}
		addScoring( this, opts, addMods.Parser, addFnc );

		if ( base.fsm && base.fsm.decInitCnt ) {
			base.fsm.decInitCnt();
		}
	}

	scoreDefType (varName) {
		if ( varName.match( /^V_Input_\w+_ArcLab_\d+$/ ) ) {
			return this.labArcType;
		}
		if ( varName.match( /^V_Input_\w+_Lab_\d+$/ ) ) {
			return this.labTickType;
		}
		return 'Integer';
	}

	scoreDef ( exportAll=false ) {
		if ( this.readonly ) {
			return {};
		}
		const settings = this.dataSettings;
		const pref = settings.variablePrefix;
		const mult = settings.xMult;

		const edArcs = this.arcs.filter( a => !a.arcReadonly || !a.labelReadonly );
		const edTicks = this.ticks.filter( t => !t.tickReadonly || !t.labelReadonly );
		const scores = {
			[`V_Input_${pref}_ArcCnt`]: edArcs.length,
			[`V_Input_${pref}_LabCnt`]: edTicks.length,
		};

		// save Arcs
		for ( let i=0; i<settings.saveArcs; i++ ) {
			scores[`V_Input_${pref}_ArcFrom_${i+1}`] = i<edArcs.length ? Math.round( edArcs[i].from*mult ) : null;
			scores[`V_Input_${pref}_ArcTo_${i+1}`] = i<edArcs.length ? Math.round( edArcs[i].to*mult ) : null;
			scores[`V_Input_${pref}_ArcLab_${i+1}`] = this.labArcValFnc( i<edArcs.length && edArcs[i].labelObj ? edArcs[i].labelObj.value : '' );
		}

		// save Ticks
		for ( let i=0; i<settings.saveTicks; i++ ) {
			scores[`V_Input_${pref}_LabVal_${i+1}`] = i<edTicks.length ? Math.round( edTicks[i].value*mult ) : null;
			scores[`V_Input_${pref}_Lab_${i+1}`] = this.labTickValFnc( i<edTicks.length && edTicks[i].labelObj ? edTicks[i].labelObj.value : '' );
		}

		// Save V_Status_xy
		if ( settings.createInpArcLabAny || settings.createInpArcLabAll ) {
			const arcRwLabs = this.arcs.filter( a => !a.labelReadonly ).map( a => a.label!==null ? a.label : '' );
			if ( settings.createInpArcLabAny ) {
				scores[`V_Status_${pref}_ArcLab_Any`] = +arcRwLabs.some( a => a.length>0 );
			}
			if ( settings.createInpArcLabAll ) {
				scores[`V_Status_${pref}_ArcLab_All`] = +( arcRwLabs.length>0 && arcRwLabs.every( a => a.length>0 ) );
			}
		}
		if ( settings.createInpLabAny || settings.createInpLabAll ) {
			const tickRwLabs = this.ticks.filter( t => !t.labelReadonly ).map( t => t.label!==null ? t.label : '' );
			if ( settings.createInpLabAny ) {
				scores[`V_Status_${pref}_Lab_Any`] = +tickRwLabs.some( l => l.length>0 );
			}
			if ( settings.createInpLabAll ) {
				scores[`V_Status_${pref}_Lab_All`] = +( tickRwLabs.length>0 && tickRwLabs.every( l => l.length>0 ) );
			}
		}

		if ( this.computeScoringVals ) {
			this.computeScoringVals( scores, exportAll );
		}
		return scores;
	}

}