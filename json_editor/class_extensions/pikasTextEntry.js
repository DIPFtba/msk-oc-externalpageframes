
import { setStatePostProc } from '../../libs/common';
import { addScoring, dp2labFncInputRegExp } from '../common';
import { SimpleInput } from './SimpleInput';

export class pikasTextEntryFromSchema {

	constructor ( divSelector, opts = {}, base = null, addMods={} ) {
		base.regSendInitDone();
		base.incInitCnt();
		this.base = base;

		// !!!!!
		// !!!!! ToDo: get/setState() testen
		// !!!!!

		const evs = [ 'focus', 'blur', 'change', 'input', 'invalid', 'maxlength', 'cursorPosChanged', 'enterPressed', 'escPressed' ];

		[ 'stylesNormal', 'stylesHover', 'stylesFocus' ].forEach( st => {
			[ 'borderWidth', 'borderRadius' ].forEach( stk => {
				opts.options[st][stk] += 'px'
			});
			delete opts.options[st].setBG;
		});
		dp2labFncInputRegExp( opts.options, this );
		this.dataSettings = opts.dataSettings || {};

		this.fields = opts.fields.map( (f,idx) => {

			const SimpleInputOpts = {
				...opts.options,
				...f,
				readonly: f.readonly || opts.readonly,
			};

			const inp = new SimpleInput( SimpleInputOpts, divSelector );

			evs.forEach( event => inp.on( event, (ev) => this.evh( event, idx+1, ev ) ) );

			return inp;
		});

		addScoring( this, opts, addMods.Parser );

		this.initData = this.getChState();

		base.decInitCnt();
	}

	scoreDefType () {
		return this.labType;
	}

	scoreDef () {
		const res = {};
		if ( this.readonly ) {
			return res;
		}

		const pref = this.dataSettings?.variablePrefix;
		if ( pref ) {
			this.fields.forEach( (f, i) => {
				if ( !f.readonly ) {
					res[`V_Input_${pref}_${i+1}`] = this.labValFnc( f.value );
				}
			});
		}

		if ( this.computeScoringVals ) {
			this.computeScoringVals( res );
		}

		return res;
	}

	///////////////////////////////////

	evh ( event, idx, ev ) {
		if ( this.base ) {
			const logDat = {
				...ev,
				idx,
			}
			delete logDat.type
			delete logDat.target;
			this.base.postLog( event, logDat );

			if ( event=='invalid' ) {
				this.base.triggerInputValidationEvent();
			} else if ( event=='change' ) {
				this.base.sendChangeState( this );	// init & send changeState & score
			}
		}
	}

	///////////////////////////////////

	getChState () {
		return this.fields.map( f => f.value );
	}

	// Check if User made changes
	getDefaultChangeState () {
		return this.getChState() !== this.initData;
	}

	getState () {
		return this.fields.map( f => f.value );
	}

	setState (state) {
		try {
			const saved = JSON.parse( state );
			saved.forEach( (val, i) => {
				if ( this.fields[i] ) {
					this.fields[i].value = val;
				}
			});
		} catch (e) {
			console.error(e);
		}

		setStatePostProc(this);
	}

}
