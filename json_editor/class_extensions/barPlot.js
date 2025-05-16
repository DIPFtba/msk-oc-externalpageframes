import { barPlot } from "../../libs/barPlot";
import { dp2labFncInputRegExp, addScoring } from "../common";

export class barPlotFromSchema extends barPlot {

	constructor ( base, opts = {}, addMods={} ) {

		if ( base.fsm && base.fsm.incInitCnt ) {
			base.fsm.incInitCnt();
		}

		// basic
		if ( opts.origin.x < 0 ) {
			opts.origin.x += base.width;
		}
		if ( opts.origin.y < 0 ) {
			opts.origin.y += base.height;
		}
		if ( !opts.titleObj ) {
			opts.titleObj = null;
		}

		// Axis
		if ( opts.labYDefEd ) {
			dp2labFncInputRegExp( opts.labYDefEd, opts, 'Y' );
		}
		if ( opts.xAxis.width <= 0 ) {
			opts.xAxis.width += base.width - opts.origin.x;
		}
		if ( opts.yAxis.height <= 0 ) {
			opts.yAxis.height = opts.origin.y + opts.yAxis.height;
		}
		let yLabelObjs = opts.yAxis.labelObjs;
		if ( yLabelObjs ) {
			if ( opts.yAxis.labelInc && !opts.readonly ) {
				// fill min number of labels
				const anzFill =
					Math.floor( ( ( opts.yAxis.labelMax || opts.yAxis.maxVal ) - ( opts.yAxis.labelMin || 0 ) ) / opts.yAxis.labelInc )
					- yLabelObjs.length + 1;
				if ( anzFill > 0 ) {
					yLabelObjs.push( ...Array( anzFill ).fill( { value: '', readonly: false } ) );
				}
			}
			// apply defaults to every label
			yLabelObjs.forEach( lab => {
				Object.assign( lab, opts.readonly || lab.readonly ? opts.labYDefNonEd : opts.labYDefEd );
			});
		}
		opts.defaultYLabelOpts = Object.assign( { inputRegexp: null }, opts.labYDefNonEd );
		delete opts.labYDefNonEd;
		delete opts.labYDefEd;

		// Bars
		if ( opts.labBarDefEd ) {
			dp2labFncInputRegExp( opts.labBarDefEd, opts, 'B' );
		}
		if ( opts.bars && opts.bars.length > 0 ) {
			opts.bars.forEach( bar => {
				Object.assign( bar, opts.readonly || bar.readonly ? opts.defaultBarOptsRO : opts.defaultBarOpts );
				Object.assign( bar.labelObj, opts.readonly || bar.labelObj.readonly ? opts.labBarDefNonEd : opts.labBarDefEd );
			});
		}
		delete opts.defaultBarOptsRO;
		delete opts.labBarDefNonEd;
		delete opts.labBarDefEd;

		super( base, opts );

		this.rwBars = this.bars.filter( b => !b.readonly );
		this.rwBarLabels = this.bars.map( b => b.labelObj ).filter( l => !l.readonly );
		this.rwYLabels = this.yAxis?.labelObjs ? this.yAxis.labelObjs.filter( l => !l.readonly ) : [];

		addScoring( this, opts, addMods.Parser );

		if ( base.fsm && base.fsm.decInitCnt ) {
			base.fsm.decInitCnt();
		}
	}

	scoreDefType (varName) {
		if ( varName.match( /^V_Input_\w+_Lab_\d+$/ ) ) {
			return this.labBType;
		}
		if ( varName.match( /^V_Input_\w+_yLab_\d+$/ ) ) {
			return this.labYType;
		}
		if ( varName.match( /^V_Input_\w+_y?Title$/ ) ) {
			return 'String';
		}
		return 'Integer';
	}

	scoreDef () {
		const res = {};
		if ( this.readonly || !this.rwBars ) { // readonly or only super() initialized
			return res;
		}

		const pref = this.dataSettings?.variablePrefix;
		if ( pref ) {
			const yMult = this.dataSettings.yMult;

			this.rwBars.forEach( (bar,i) => {
				res[`V_Input_${pref}_Val_${i+1}`] = Math.round( bar.value * yMult );
			});
			this.rwBarLabels.forEach( (barLab,i) => {
				res[`V_Input_${pref}_Lab_${i+1}`] = this.labBValFnc( barLab.value || '' );
			});

			this.rwYLabels.forEach( (yLab,i) => {
				res[`V_Input_${pref}_yLab_${i+1}`] = this.labYValFnc( yLab.value || '' );
			});

			if ( this.titleObj && !this.titleObj.readonly ) {
				res[`V_Input_${pref}_Title`] = this.titleObj.value || '';
			}

			if ( this.yAxis?.axisLabelObj && !this.yAxis.axisLabelObj.readonly )	{
				res[`V_Input_${pref}_yTitle`] = this.yAxis.axisLabelObj.value || '';
			}

			if ( this.dataSettings.createStatusAllVars ) {
				res[`V_Status_${pref}_All`] =
					this.bars.every( (b,i) =>
							( b.readonly || b.value != this.initData.b[i].v ) &&
							( !b.labelObj || b.labelObj.readonly || b.labelObj.value != this.initData.b[i].l ) ) &&
					( !this.titleObj || this.titleObj.readonly || this.titleObj.value != this.initData.t ) &&
					( !this.yAxis?.labelObjs || this.yAxis.labelObjs.every( (yLab,i) => yLab.readonly || yLab.value != this.initData.l[i] ) ) &&
					( !this.yAxis?.axisLabelObj || this.yAxis.axisLabelObj.readonly || this.yAxis.axisLabelObj.value != this.initData.a );
			}
		}

		if ( this.computeScoringVals ) {
			this.computeScoringVals( res );
		}

		return res;
	}

}
