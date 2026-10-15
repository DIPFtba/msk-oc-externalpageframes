
export class dummy {

	constructor (base) {
		base.incInitCnt();
		this.base = base;

		this.initData = this.getChState();
		this.base.sendChangeState( this );	// init & send changeState & score
		base.decInitCnt();
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