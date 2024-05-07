import { numberLineWithAnnotations } from '../../libs/numberLineWithAnnotations'
import { dp2inputRegExp, addScoringValsParser } from '../common';
export class numberLineWithAnnotationsFromSchema extends numberLineWithAnnotations {

	constructor ( base, opts = {}, addMods={}  ) {

		// pre-decimal places & decimal places --> inputRegexp
		opts.annotations.forEach( ann => dp2inputRegExp(ann) );

		super( base, opts );

		addScoringValsParser( this, addMods.Parser );
		this.parseScoringVals(opts);
	}

	scoreDef () {
		const settings = this.dataSettings;
		const pref = settings.variablePrefix;
		const mult = settings.xMult;
		const scores = {};

		// Annotations
		const anns = this.annotations.filter( a => !a.textReadonly );
		anns.forEach( (v,i) => scores[ `V_${pref}_Inp_${i+1}` ] = v.text );

		// Connections
		const conns = this.annotations.filter( a => !a.toValueReadonly );
		conns.forEach( (v,i) => scores[ `V_${pref}_Conn_${i+1}` ] = v.toValue === null ? null : Math.round( v.toValue * mult ) );

		// Status vars
		let connSomeVars, connAllVars, inpSomeVars, inpAllVars;

		if ( settings.createInpSomeVars || settings.createSomeVars ) {
			inpSomeVars = anns.length>0 && anns.some( v => v.text.trim().length>0 );
			if ( settings.createInpSomeVars ) {
				scores[ `S_${pref}_Inp_Some` ] = +inpSomeVars;
			}
		}
		if ( settings.createInpAllVars || settings.createAllVars ) {
			inpAllVars = anns.length>0 && anns.every( v => v.text.trim().length>0 );
			if ( settings.createInpAllVars ) {
				scores[ `S_${pref}_Inp_All` ] = +inpAllVars;
			}
		}
		if ( settings.createConnSomeVars || settings.createSomeVars ) {
			connSomeVars = conns.length>0 && conns.some( v => v.toValue!==null );
			if ( settings.createConnSomeVars ) {
				scores[ `S_${pref}_Conn_Some` ] = +connSomeVars;
			}
		}
		if ( settings.createConnAllVars || settings.createAllVars ) {
			connAllVars = conns.length>0 && conns.every( v => v.toValue!==null );
			if ( settings.createConnAllVars ) {
				scores[ `S_${pref}_Conn_All` ] = +connAllVars;
			}
		}
		if ( settings.createSomeVars ) {
			scores[ `S_${pref}_Some` ] = +( connSomeVars || inpSomeVars );
		}
		if ( settings.createAllVars ) {
			scores[ `S_${pref}_All` ] = +( connAllVars && inpAllVars );
		}

		if ( this.computeScoringVals ) {
			this.computeScoringVals( scores );
		}
		return scores;
	}

}