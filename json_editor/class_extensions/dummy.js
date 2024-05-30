
export class dummy {

	constructor (base) {
		if ( base.fsm && base.fsm.incInitCnt ) {
			base.fsm.incInitCnt();
		}
		this.base = base;

		this.initData = this.getChState();
		this.base.sendChangeState( this );	// init & send changeState & score
		if ( base.fsm && base.fsm.decInitCnt ) {
			base.fsm.decInitCnt();
		}
	}

	getChState () {
		return {
			pos: 234
		};
	}

	getDefaultChangeState () {
		return false;
	}

	scoreDef () {
		return {
			abc: 123,
			def: "hi there!",
			ghi: NaN,
		}
	}

}