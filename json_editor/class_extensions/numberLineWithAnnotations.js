import { numberLineWithAnnotations } from '../../libs/numberLineWithAnnotations'
import { dp2labFncInputRegExp, addScoring } from '../common';
export class numberLineWithAnnotationsFromSchema extends numberLineWithAnnotations {

	constructor ( base, opts = {}, addMods={}  ) {

		if ( base.fsm && base.fsm.incInitCnt ) {
			base.fsm.incInitCnt();
		}

		// pre-decimal places & decimal places --> inputRegexp
		dp2labFncInputRegExp( opts, opts );
		if ( opts.inputRegexp ) {
			opts.annotations.forEach( a => a.inputRegexp = opts.inputRegexp );
			delete opts.inputRegexp;
		}

		super( base, opts );

		addScoring( this, opts, addMods.Parser );

		if ( base.fsm && base.fsm.decInitCnt ) {
			base.fsm.decInitCnt();
		}
	}

	scoreDefType (varName) {
		return varName.match( /^V_Input_\w+_Lab_\d+$/ ) ? this.labType : 'Integer';
	}

	scoreDef () {
		const settings = this.dataSettings;
		const pref = settings.variablePrefix;
		const mult = settings.xMult;
		const scores = {};

		// Annotations
		const anns = this.annotations.filter( a => !a.textReadonly );
		anns.forEach( (v,i) => scores[ `V_Input_${pref}_Lab_${i+1}` ] = this.labValFnc( v.text ) );

		// Connections
		const conns = this.annotations.filter( a => !a.toValueReadonly );
		conns.forEach( (v,i) => scores[ `V_Input_${pref}_Conn_${i+1}` ] = v.toValue === null ? null : Math.round( v.toValue * mult ) );

		// Status vars
		let connSomeVars, connAllVars, inpSomeVars, inpAllVars;

		if ( settings.createInpSomeVars || settings.createSomeVars ) {
			inpSomeVars = anns.length>0 && anns.some( v => v.text.trim().length>0 );
			if ( settings.createInpSomeVars ) {
				scores[ `V_Status_${pref}_Lab_Any` ] = +inpSomeVars;
			}
		}
		if ( settings.createInpAllVars || settings.createAllVars ) {
			inpAllVars = anns.length>0 && anns.every( v => v.text.trim().length>0 );
			if ( settings.createInpAllVars ) {
				scores[ `V_Status_${pref}_Lab_All` ] = +inpAllVars;
			}
		}
		if ( settings.createConnSomeVars || settings.createSomeVars ) {
			connSomeVars = conns.length>0 && conns.some( v => v.toValue!==null );
			if ( settings.createConnSomeVars ) {
				scores[ `V_Status_${pref}_Conn_Any` ] = +connSomeVars;
			}
		}
		if ( settings.createConnAllVars || settings.createAllVars ) {
			connAllVars = conns.length>0 && conns.every( v => v.toValue!==null );
			if ( settings.createConnAllVars ) {
				scores[ `V_Status_${pref}_Conn_All` ] = +connAllVars;
			}
		}
		if ( settings.createSomeVars ) {
			scores[ `V_Status_${pref}_Any` ] = +( connSomeVars || inpSomeVars );
		}
		if ( settings.createAllVars ) {
			scores[ `V_Status_${pref}_All` ] = +( connAllVars && inpAllVars );
		}

		if ( this.computeScoringVals ) {
			this.computeScoringVals( scores );
		}
		return scores;
	}

}