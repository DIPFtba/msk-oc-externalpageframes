
import { freePaintMultFromSchema } from "./freePaintMult";
import { myScriptApi } from "../myScriptApi";

export class freePaintRecogFromSchema extends freePaintMultFromSchema {

	constructor ( base, opts = {} ) {

		const defaultOpts = {

			myScript: {
			},

		}

		base.incInitCnt();

		super( base, opts );

		this.startTs = +Date.now();
		this.recogText = "";

		this.myScriptApi = new myScriptApi( opts.myScript );

		base.decInitCnt();
	}

	scoreDef () {
		return {
			[ `V_RecogTxt_${this.dataSettings.variablePrefix}` ]: this.recogText,
		};
	}

	///////////////////////////////////

	iStartDraw ( ev ) {
		this.cancelRecog();
		const t = +Date.now() - this.startTs;
		const [ x, y ] = super.iStartDraw( ev );
		this.paintPointsWithTS = [{ x, y, t }];
	}

	iDraw ( ev ) {
		try {
			const t = +Date.now() - this.startTs;
			const [ x, y ] = super.iDraw( ev );
			this.paintPointsWithTS.push({ x, y, t });
		} catch (e) {}
	}

	iEndDraw ( ev ) {
		// super verwendet paintPoints nur zum speichern und loggen (nicht nochmal zum Darstellen),
		// dafür paintPointsWithTS verwenden
		// DANN STEHEN AUCH ALLE TIMESTAMPS IN DEN EVENT-LOGS!
		if ( this.paintPoints !== null ) {
			this.paintPoints = this.paintPointsWithTS;
			super.iEndDraw( ev );
		}
	}

	linesUpdated () {
		this.startRecog();
	}

	///////////////////////////////////

	unpack2KonvaOpts (l) {
		const dat = this.unpackLOpts( l );
		// dat.points ist ein Array von Arrays, die die Punkte und TS enthalten
		// Array nur mit Punkten erzeugen
		const xy = [];
		dat.points.forEach( d => {
			xy.push( d.x, d.y );
		})
		dat.points = xy;

		return dat;
	}

	corr4Log (p) {
		// Aus p-Einträgen (Objekten {x,y,t}) Arrays [x,y,t] machen, sehr viel kürzer für logs
		const pn = { ...p };
		if ( Array.isArray(p.p) && p.p.length > 0 ) {
			pn.p = p.p.map( d => [ d.x, d.y, d.t ] );
		}
		return pn;
	}

	setState ( state ) {
		super.setState( state );

		// neue startTs setzen, dass neue Punkte mit 10 sek Pause gemalt werden
		const lines =
			Array.isArray(this.undoClearAll) && this.undoClearAll.length>0 ? this.undoClearAll :
				Array.isArray(this.linesRedo) && this.linesRedo.length>0 ? this.linesRedo : this.linesCopy;

		if ( lines.length > 0 ) {
			const lastStroke = lines[ lines.length-1 ];
			const maxTs = lastStroke.p[ lastStroke.p.length-1 ].t;
			this.startTs = +Date.now() - 10000 - maxTs; // 10 sek Pause
		}
	}

	///////////////////////////////////
	///////////////////////////////////
	///////////////////////////////////

	startRecog () {

		const strokes = this.linesCopy.map( l => ({
			x: l.p.map( d => d.x ),
			y: l.p.map( d => d.y ),
			t: l.p.map( d => d.t ),
		}) );

		this.myScriptApi.startRecog( strokes )
			.then( text => {

				this.recogText = text;
				this.base.sendChangeState( this );	// init & send changeState & score

				this.base.fsm.triggerEvent( 'EV_NewRecog' );
				if ( this.dataSettings.variablePrefix ) {
					this.base.fsm.triggerEvent( 'EV_NewRecog_' + this.dataSettings.variablePrefix );
				}

			})
			.catch( err => {
				console.error( "freePaintRecog error:", err );
			});
	}

	cancelRecog () {
		this.myScriptApi.cancelRecog();
	}

}

//////////////////////////////////////////////////////////////////////////////
//////////////////////////////////////////////////////////////////////////////
//////////////////////////////////////////////////////////////////////////////
