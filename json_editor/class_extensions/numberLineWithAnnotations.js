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

		this.rwAnns = this.annotations.filter( a => !a.textReadonly );
		this.rwConns = this.annotations.filter( a => !a.toValueReadonly );

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
		if ( !( "rwAnns" in this ) ) {	// only super() initialized
			return scores;
		}

		// Annotations
		this.rwAnns.forEach( (v,i) => {
			scores[ `V_Input_${pref}_Lab_${i+1}` ] = this.labValFnc( v.text );
			if ( settings.createInpXVars ) {
				scores[ `V_Status_${pref}_Lab_${i+1}` ] = +( v.text.length > 0 );
			}
		});


		// Connections
		this.rwConns.forEach( (v,i) => {
			const w = v.toValue === null ? null : Math.round( v.toValue * mult );
			scores[ `V_Input_${pref}_Conn_${i+1}` ] = w;
			if ( settings.createConnXVars ) {
				scores[ `V_Status_${pref}_Conn_${i+1}` ] = +( w !== null );
			}
		});

		// Status vars
		let connSomeVars, connAllVars, inpSomeVars, inpAllVars;

		if ( settings.createInpSomeVars || settings.createSomeVars ) {
			inpSomeVars = this.rwAnns.length>0 && this.rwAnns.some( v => v.text.trim().length>0 );
			if ( settings.createInpSomeVars ) {
				scores[ `V_Status_${pref}_Lab_Any` ] = +inpSomeVars;
			}
		}
		if ( settings.createInpAllVars || settings.createAllVars ) {
			inpAllVars = this.rwAnns.length>0 && this.rwAnns.every( v => v.text.trim().length>0 );
			if ( settings.createInpAllVars ) {
				scores[ `V_Status_${pref}_Lab_All` ] = +inpAllVars;
			}
		}
		if ( settings.createConnSomeVars || settings.createSomeVars ) {
			connSomeVars = this.rwConns.length>0 && this.rwConns.some( v => v.toValue!==null );
			if ( settings.createConnSomeVars ) {
				scores[ `V_Status_${pref}_Conn_Any` ] = +connSomeVars;
			}
		}
		if ( settings.createConnAllVars || settings.createAllVars ) {
			connAllVars = this.rwConns.length>0 && this.rwConns.every( v => v.toValue!==null );
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