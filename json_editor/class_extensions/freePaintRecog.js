
import { freePaintMultFromSchema } from "./freePaintMult";
import { myScriptApi } from "../myScriptApi";

//
// Wie freePaintMultFromSchema, aber mit Erkennung des "gemalten" Mathe-Terms (myScript)
//
export class freePaintRecogFromSchema extends freePaintMultFromSchema {

	constructor ( base, opts = {} ) {

		base.incInitCnt();

		super( base, opts );

		this.startTs = +Date.now();
		this.recogTxt = "";
		this.recogTxtX = Array( opts.myScript.sk_enabled_subsets.length || 0 ).fill("");
		this.base.sendChangeState(this);

		this.myScriptApi = new myScriptApi( opts.myScript );

		base.decInitCnt();
	}

	scoreDef () {
		if ( !( "recogTxt" in this ) ) {
			// only freePaintMultFromSchema is initialized, no recogTxt yet
			return {};
		}

		const obj = {};

		if ( this.myScript.withOut_sk ) {
			obj[ `V_RecogTxt_${this.dataSettings.variablePrefix}` ] = this.recogTxt;
		}

		this.myScript.sk_enabled_subsets.forEach( (sk, i) => {
			obj[ `V_RecogTxt${i+1}_${this.dataSettings.variablePrefix}` ] = this.recogTxtX[i];
		});

		return obj;
	}

	///////////////////////////////////

	iStartDraw ( ev ) {
		this.cancelAllRecogs();
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

		const sendEvents = () => {
			this.base.sendChangeState( this );	// init & send changeState & score

			this.base.fsm.triggerEvent( 'EV_NewRecog' );
			if ( this.dataSettings.variablePrefix ) {
				this.base.fsm.triggerEvent( 'EV_NewRecog_' + this.dataSettings.variablePrefix );
			}
		}
		const catchError = ( err ) => {
			console.error( "freePaintRecog error:", err );
		}

		if ( this.myScript.withOut_sk ) {
			this.myScriptApi.startRecog( strokes )
				.then( text => {
					this.recogTxt = text;
					sendEvents();
				})
				.catch( catchError );
		}

		this.myScript.sk_enabled_subsets.forEach( (sk, i) => {
			this.myScriptApi.startRecog( strokes, sk )
				.then( text => {
					this.recogTxtX[i] = text;
					sendEvents();
				})
				.catch( catchError );
		});
	}

	cancelAllRecogs () {
		this.myScriptApi.cancelAllRecogs();
	}

}

//////////////////////////////////////////////////////////////////////////////
//////////////////////////////////////////////////////////////////////////////
//////////////////////////////////////////////////////////////////////////////
