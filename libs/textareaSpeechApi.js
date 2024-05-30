
import './textareaSpeechApi.css'

import { textareaContainer, textareaBase } from './textareaInserts'
import { mergeDeep } from './common';

import microSvg from './img/micro.svg';
import trashSvg from './img/trash.svg';

const speechApi = (baseClass) => class extends baseClass {

	constructor ( divSelector, opts = {}, base = null ) {

		if ( base.fsm && base.fsm.incInitCnt ) {
			base.fsm.incInitCnt();
		}

		const speechDefaults = {

			outerDivStyles: {
				display: 'flex',
				'flex-direction': 'row',
				'align-items': 'flex-start',
			},

			statContainerTemplate:
				'<div id=iconCont>'+
						'<div id=microCont><div id=microBg><div></div><div></div></div><img id=microImg src="'+microSvg+'"></div>'+
						'<div id=trashCont><img id=trashImg src="'+trashSvg+'"></div>'+
				'</div>',

			txtRecog: "<span style=\"color: darkred; font-weight: bold;\">[ ... gesprochener Text wird erkannt ... ]</span>",

			recAudio: true,

			insertParagr: true,
			audioBitsPerSecond: 32000,
		};
		mergeDeep( speechDefaults, opts );

		super( divSelector, speechDefaults, base );

		// create statContainer
		const tmp = document.createElement('DIV');
		tmp.innerHTML = this.statContainerTemplate;
		const statContainer = tmp.firstChild;
		this.outerDiv.appendChild( statContainer );

		['microBg','microImg','trashImg'].forEach( id => {
			const el = document.getElementById( id );
			this[id] = el ? el : document.createElement('DIV');
		});
		this.trashImg.addEventListener( 'click', this.deleteAll.bind(this) );

		// init speechApi
		const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
		if ( !SpeechRecognition || !navigator.mediaDevices || !navigator.mediaDevices.getUserMedia ) {
			this.setMicroStat('notAvailable');
			this.statLog('SPEECHAPI_NOT_AVAILABLE')
			return;
		}
		this.speechApi = new SpeechRecognition();
		this.setupSpeechApi();


		// is micro access enabled?
		this.getSavedStat().then( s0 => {
			this.savedStat = s0;
			if ( s0 === 'disabled' ) {
				this.showDisabled();
			} else if ( s0 === 'enabled' ) {
				this.showReady();
			} else {
				this.setMicroStat('allow');
				this.statLog('SPEECHAPI_MUST_ASK');
			}
		});

		this.enableTxtEdit(true);
		this.enableTrash(false);

		this.lastRASstart = 0;
		this.lastRASdur = 0;
		this.audioId = 0;

		if ( base.fsm && base.fsm.decInitCnt ) {
			base.fsm.decInitCnt();
		}
	}

	///////////////////////////////////

	setupSpeechApi () {
		const speechApi = this.speechApi;
		speechApi.continuous = true;
		speechApi.interimResults = true;
		speechApi.maxAlternatives = 1;
		speechApi.lang = 'de-DE';

		// set Handler
		Object.entries({
			result: this.onSpeechResult,
			end: this.onSpeechEnd,
		}).forEach( ([e,h]) => speechApi.addEventListener( e, h.bind(this) ) );
	}

	onSpeechResult (ev) {
		const lastRecogLen = this.lastRecogText.length;
		// get current Text
		const res = ev.results;
		let newText = '';
		let newParagr = true;
		for ( let h=0; h<res.length; h++ ) {
			let r = res[h][0].transcript.trim();
			if ( this.insertParagr ) {
				if ( newParagr ) {
					r = r[0].toUpperCase() + r.substring( 1, r.length );
				}
				newParagr = r.match( /[\w]$/) && res[h].isFinal;
				if ( newParagr ) {
					r += '.';
				}
			}
			newText += r + "\n";
		}
		// set recAni speeed
		this.resetRecAniSpeed();
		if ( newText.length>lastRecogLen ) {
			const chpm = ( newText.length - lastRecogLen ) / ( +Date.now() - this.lastRecogTS ) * 1000;
// console.log("CHPM",chpm)
			this.setRecAniSpd( chpm>12 ? 2 : 1 );
		}

		if ( res.length>0 ) {
			this.lastRecogTS = +Date.now();
		}
		this.lastRecogText = newText;
		this.onNewRecog( ev.results );
	}

	onNewRecog () {
		if ( !this.recording ) {
			this.updateRecogText();
		}
	}

	onSpeechEnd () {
		if ( this.recording ) {
			this.base.postLog('SPEECHAPI_BROWSER_REPORTS_END');
			if ( +Date.now() - this.lastRecogTS > 20*1000 ) {
				this.base.postLog('SPEECHAPI_STOP_NO_SPEECH');
				this.stopRecord( true );
			} else {
				this.base.postLog('SPEECHAPI_RESTART');
				this.speechApi.start( true )
			}
		}
	}

	///////////////////////////////////

	audioRecStart () {
		if ( this.recAudio ) {
			const recorder = new MediaRecorder( this.audioStream, {
				audioBitsPerSecond: this.audioBitsPerSecond
			});
			recorder.ondataavailable = this.audioRecOnData.bind(this);
			recorder.start();
			this.audioRecorder = recorder;
		}
		this.audioId++;
	}

	audioRecStop () {
		if ( this.audioRecorder ) {
			this.audioRecorder.stop();
		}
	}

	audioRecOnData (ev) {
		let reader = new FileReader();
		const audioId = this.audioId;
		reader.onloadend = () => {
			this.base.postLog( this.recording ? 'MIC_AUDIO' : 'MIC_AUDIO_LAST', { audio: reader.result, audioId } );
		}
		reader.readAsDataURL(ev.data);
	}

	///////////////////////////////////

	async getSavedStat () {
		return sessionStorage.getItem( '__IB_ExtRes_SpeechAPI_stat' );
	}

	async setSavedStat ( stat ) {
		return sessionStorage.setItem( '__IB_ExtRes_SpeechAPI_stat', stat );
	}

	///////////////////////////////////

	showDisabled () {
		this.setMicroStat('notAvailable');
		this.statLog('SPEECHAPI_DISABLED')
	}

	showReady () {
		this.setMicroStat('ready');
		this.statLog('SPEECHAPI_READY')
	}

	setMicroStat (stat) {

		if ( this.microListener ) {
			this.microImg.removeEventListener( 'click', this.microListener );
		}

		let newListener = null;
		switch (stat) {
			case 'notAvailable':
				this.microImg.style['opacity'] = 0.5;
				this.microImg.style['cursor'] = 'not-allowed';
				this.microImg.classList.add('striked');
				break;
			case 'allow':
				newListener = () => this.getUserMedia().catch();
				break;
			case 'ready':
				newListener = () => this.startRecord();
				this.microBg.classList.remove('recAni');
				break;
			case 'recording':
				this.setStyles( this.microImg, this.microRecordingStyles );
				newListener = () => this.stopRecord();
				this.setRecAniSpd(0);
				this.microBg.classList.add('recAni');
				break;
		}
		if ( newListener ) {
			this.microListener = newListener;
			this.microImg.addEventListener( 'click', newListener );
		}
	}

	updateRecogText () {
		this.div.innerHTML = this.lastText;
		if ( this.lastRecogText ) {
			if ( this.lastText.length ) {
				this.div.innerHTML += "\n";
			}
			this.div.innerHTML += this.lastRecogText;
			this.base.postLog( 'SPEECHAPI_TEXT', { text: this.lastRecogText, audioId: this.audioId } );
			this.ev_input();
		}
	}

	showtxtRecog () {
		this.div.innerHTML += this.txtRecog;
		this.div.scrollTop = this.div.scrollHeight;
	}

	enableTrash (stat) {
		let opacity, cursor;
		if ( stat ) {
			opacity = 1;
			cursor = 'pointer';
		} else {
			opacity = 0;
			cursor = 'default';
		}
		this.trashImg.style['opacity'] = opacity;
		this.trashImg.style['cursor'] = cursor;
		this.trashEnabled = stat;
	}

	enableTxtEdit ( stat ) {
		this.div.setAttribute( 'contenteditable', stat ? 'true' : 'false' );
	}

	setRecAniSpd (f) {
		// https://stackoverflow.com/questions/47578337/css-change-animation-duration-without-jumping
		const dur = [ 5, 2, 0.8 ][f];
// console.log("setspeeed",f,dur)
		if ( this.recording && dur && this.lastRASdur != dur ) {

			const now = +Date.now()/1000;
			const tdiff = now - this.lastRASstart;
			const tAni = this.lastRASdur ? ( tdiff % this.lastRASdur ) / this.lastRASdur * dur : 0 ;
			this.lastRASstart = now - tAni;
			this.lastRASdur = dur;

			const chd = this.microBg.children;
			chd.item(0).style['animation-duration'] = dur+'s';
			chd.item(1).style['animation-duration'] = dur+'s';
			chd.item(0).style['animation-delay'] = '-'+tAni+'s';
			chd.item(1).style['animation-delay'] = '-'+( tAni + dur/2 )+'s';

			// restart animation
			// https://stackoverflow.com/questions/6268508/restart-animation-in-css3-any-better-way-than-removing-the-element
			this.microBg.classList.remove('recAni');
			this.microBg.offsetHeight;
			this.microBg.classList.add('recAni');
		}
	}

	resetRecAniSpeed () {
		if ( this.resetRASt ) {
			clearTimeout( this.resetRASt );
		}
		this.resetRASt = setTimeout( () => this.setRecAniSpd(0), 1000 );
	}

	///////////////////////////////////

	async getUserMedia ( showReady=1 ) {

		const me = this;
		return new Promise( (res,rej) => {

			const onEnabled = (stream) => {
				const s = 'enabled';
				if ( me.savedStat !== s ) {
					me.setSavedStat( s, 0 );
					this.statLog('SPEECHAPI_MIC_ALLOWED');
				}
				if ( showReady ) {
					me.showReady();
				}
				me.audioStream = stream;
				res(stream);
			}

			const onDisabled = () => {
				const s = 'disabled';
				if ( me.savedStat !== s ) {
					me.setSavedStat( s, 0 );
					this.statLog('SPEECHAPI_MIC_NOT_ALLOWED');
				}
				me.showDisabled();
				rej();
			}

			const constraints = { audio: true };
			navigator.mediaDevices.getUserMedia( constraints ).then( onEnabled, onDisabled );
		})
	}

	///////////////////////////////////

	statLog ( stat, obj={} ) {
		this.base.postLog( stat, obj );
		this.base.fsm.setFSMVariable( 'SpeechApiStat', stat );
	}

	///////////////////////////////////

	async startRecord () {
		( this.audioStream ? Promise.resolve( this.audioStream ) : this.getUserMedia(0) )
			.then( () => {

				this.enableTxtEdit( false );
				this.enableTrash( false );
				this.lastText = this.div.innerHTML.trim();
				this.div.innerHTML = this.lastText;
				if ( this.lastText ) {
					this.div.innerHTML += "\n";
				}
				this.showtxtRecog();

				if ( this.speechApiStopT ) {
					this.stopRecordNow();
				}

				this.recording = true;
				this.lastRecogTS = +Date.now();
				this.lastRecogText = '';
				this.speechApi.start();
				this.audioRecStart();

				this.setMicroStat('recording');
				this.statLog( 'SPEECHAPI_STARTED', { audioId: this.audioId } );
			})
			.catch();
	}

	stopRecord ( isStopped=false ) {

		if ( this.recording ) {

			this.updateRecogText();

			this.recording = false;
			this.audioRecStop();
			if ( !isStopped ) {
				this.speechApiStopT = setTimeout( this.stopRecordNow.bind(this), 300 );
				this.statLog( 'SPEECHAPI_STOPPED', { audioId: this.audioId } );
			}

			this.showReady();

			this.enableTxtEdit( true );
			this.enableTrash( true );
		}
	}

	stopRecordNow () {
		clearTimeout( this.speechApiStopT );
		this.speechApiStopT = null;
		this.speechApi.stop();
	}

	deleteAll () {
		if ( this.trashEnabled ) {
			this.base.postLog('DELETE_ALL_PRESSED');
			this.showReady();
			this.div.textContent = '';
			this.ev_input();
			this.audioId = 0;
		}
	}

	// enable trash when text in textarea
	getDefaultChangeState () {
		const res = super.getDefaultChangeState();
		if ( 'trashEnabled' in this && this.trashEnabled != res ) {
			this.enableTrash( res );
		}
		return res;
	}
}

export const textareaSpeechApi = speechApi( textareaBase );

//////////////////////////////////////////////////////////////////////////////

export class textareaSpeechApiRO extends speechApi( textareaContainer ) {

	constructor ( divSelector, opts = {}, base = null ) {

		if ( base.fsm && base.fsm.incInitCnt ) {
			base.fsm.incInitCnt();
		}

		const readOutDefaults = {

			statContainerTemplate:
				'<div id=iconCont>'+
						'<div id=microCont><div id=microBg><div></div><div></div></div><img id=microImg src="'+microSvg+'"></div>'+
				'</div>',

			textareaStyle: {
				'background-color': 'white',
				padding: '10px',
				border: '1px solid gray',
			},

			// readOutTxt: 'Text to read out.',
			insertParagr: false,
		};
		mergeDeep( readOutDefaults, opts );

		super( divSelector, readOutDefaults, base );

		if ( this.textareaStyle ) {
			this.setStyles( this.div, this.textareaStyle );
		}

		this.parseReadOutTxt();
		this.displayText();

		if ( base.fsm && base.fsm.decInitCnt ) {
			base.fsm.decInitCnt();
		}
	}

	///////////////////////////////////

	showtxtRecog () {
	}

	updateRecogText () {
	}

	enableTxtEdit () {
		super.enableTxtEdit(false);
	}

	enableTrash () {
	}

	deleteAll () {
	}

	startRecord () {
		this.reset();
		super.startRecord();
	}

	stopRecord ( isStopped=false ) {
		this.currWord = this.recogWords.length;
		this.setNewMark();
		super.stopRecord(isStopped);
	}

	///////////////////////////////////

	reset () {
		this.currWord = 0;
		this.notRecogCnt = 0;
		this.setNewMark();
	}

	parseReadOutTxt () {
		const allWords = [];
		const re = ( this.readOutTxt.trim() || '' ).match( /[	 ]*(?:\r\n|\n|\r|<[bB][rR]>)[	 ]*|[	 ]+|(?:<[^>]+>|[^\r\n\s])+/g );
		if ( re ) {
			// for every newline, space or word
			re.forEach( c => {
				const el = document.createElement('SPAN');
				const word = {
					el,
				};
				const rel = c.match( /^\[([^\]]+?)(\|[^\]]+)?]([\\s,.-;:?!"'´[\]()]*)$/ );

				if ( c.match( /^(?:[	 ]*(?:\r\n|\n|\r|<[bB][rR]>)[	 ]*)$/ ) ) {
					// newline
					el.innerHTML = "<br>";
				} else if ( c.trim().length === 0 ) {
					// space
					el.innerText = ' ';
				} else if ( rel ) {
					// regexp '[word1|word2|word3]'?
					// first word is deisplayed, alternatives are used for regexp
					el.innerHTML = rel[1]+rel[3];
					word.recog = '(?:' + rel[1].replace( /<[^>]+>/g, '' ).toLowerCase().trim() + rel[2].toLowerCase() + ')';
				} else {
					// word
					el.innerHTML = c;
					word.recog = "\\b" + c.replace( /<[^>]+>/g, '' ).replace(/[^\u00C0-\u017FA-Za-z]/g, '').toLowerCase().trim() + "\\b";
				}
				allWords.push(word);
			})
		}
		this.allWords = allWords;
// console.log(allWords);

		this.recogWords = [];
		this.recogIdx = [];
		allWords.forEach( (w,i) => {
			if ( w.recog ) {
				this.recogWords.push( w.recog );
				this.recogIdx.push(i);
			}
		})
	}

	displayText () {
		this.div.innerHTML = '';
		this.allWords.forEach( w => this.div.appendChild(w.el) );
	}

	onNewRecog (res) {
		const currWord = this.currWord;
		const recogWords = this.recogWords;
		const lcRes = res[ res.length-1 ][0].transcript.toLowerCase();
// console.log(lcRes);
		const Re = new RegExp( `.*(${recogWords[ currWord ]}.*)` );
		const firstFound = lcRes.match( Re );
		if ( firstFound ) {
			this.notRecogCnt = 0;
			let foundWords = 1;
			let found;
			do {
				foundWords++;
				const reStr = `${ recogWords.slice( currWord, currWord+foundWords ).join( `[\\s,.-;:?!"'´[\]()]*` )}`;
				let mre = new RegExp( reStr );
				found = firstFound[1].match( mre );
//  console.log(reStr,found)
//  console.log(found , currWord+foundWords ,  this.recogWords.length);
			} while ( found && currWord+foundWords <= this.recogWords.length );
			foundWords--;

			this.base.postLog( 'SPEECHAPI_WORDS_RECOG', {
				cnt: foundWords,
				words: recogWords.slice( currWord, currWord+foundWords ),
				next: recogWords[ currWord+foundWords ],
			});

			this.currWord += foundWords;
			this.setNewMark();

			if ( this.currWord >= this.recogWords.length ) {
				this.statLog( 'SPEECHAPI_ALL_WORDS' );
				this.stopRecord();
			}
		} else {
			this.base.postLog( 'SPEECHAPI_NOT_RECOG', { cnt: ++this.notRecogCnt } );
		}
	}

	setNewMark () {
		// let markCnt = 3;
		const idx = this.recogIdx[ this.currWord ];
		for ( let i=0; i<this.allWords.length; i++ ) {
			const w = this.allWords[i];
			const el = this.div.children[i];
			if ( i === idx ) {
				el.className = 'mark first';
			} else if ( i>idx /*&& markCnt*/ ) {
				el.className = 'mark';
				// if ( w.recog && !--markCnt ) {
				// 	cl.add( 'last' );
				// 	break;
				// }
			} else {
				el.className = 'recog';
				// w.el.innerHTML="---";
			}
		};
	}
}

//////////////////////////////////////////////////////////////////////////////

export class textareaSpeechApiRec extends speechApi( textareaContainer ) {

	constructor ( divSelector, opts = {}, base = null ) {

		if ( base.fsm && base.fsm.incInitCnt ) {
			base.fsm.incInitCnt();
		}

		const recDefaults = {

			// statContainerTemplate:
			// 	'<div id=iconCont>'+
			// 			'<div id=microCont><div id=microBg><div></div><div></div></div><img id=microImg src="'+microSvg+'"></div>'+
			// 	'</div>',

			textareaStyle: {
				'background-color': 'white',
				padding: '10px',
				border: '1px solid gray',
			},

			recAudio: true,
			appendNewRecord: true,
		};
		mergeDeep( recDefaults, opts );

		super( divSelector, recDefaults, base );
		super.enableTxtEdit(false);

		if ( this.textareaStyle ) {
			this.setStyles( this.div, this.textareaStyle );
		}

		this.deleteAudios();
		this.base.sendChangeState( this );

		if ( base.fsm && base.fsm.decInitCnt ) {
			base.fsm.decInitCnt();
		}
	}

	enableTxtEdit () {
	}

	showtxtRecog () {
	}

	updateRecogText () {
		this.base.postLog( 'SPEECHAPI_TEXT', { text: this.lastRecogText, audioId: this.audioId } );
	}

	///////////////////////////////////

	audioRecStart () {
		if ( !this.appendNewRecord ) {
			this.deleteAudios();
		}
		super.audioRecStart();
	}

	audioRecOnData (ev) {
		let reader = new FileReader();
		reader.onloadend = () => {
			this.base.postLog( this.recording ? 'MIC_AUDIO' : 'MIC_AUDIO_LAST', { audio: reader.result, audioId: this.audioId } );
			if ( !this.recording ) {
				this.audioList[ this.audioId ] = reader.result;
				this.base.sendChangeState( this );
				this.audioDisplay( reader.result );
			}
		}
		reader.readAsDataURL(ev.data);
	}

	audioDisplay (data) {
		const audio = document.createElement('AUDIO');

		const attr = {
			controls: "controls",
			controlslist: "nodownload",
			preload: "auto",
			src: data,
		}
		for ( const key in attr ) {
			audio.setAttribute( key, attr[key] );
		}

		// // doesnt work:
		// const audioId = this.audioId;
		// const evs = {
		// 	ended: (ev) => this.base.postLog( "AUDIO_PLAY_ENDED", { audioId } ),
		// 	play: (ev) => this.base.postLog( "AUDIO_PLAY_START", { audioId } ),
		// 	pause: (ev) => this.base.postLog( "AUDIO_PLAY_PAUSE", { audioId } ),
		// 	seeked: (ev) => this.base.postLog( "AUDIO_PLAY_SEEKED", { audioId } ),
		// }
		// for ( const key in evs ) {
		// 	audio.addEventListener( key, evs[key].bind(this) );
		// }

		audio.dataset.audioId = this.audioId;
		audio.innerHTML = "(Wiedergabe nicht unterstützt)<br>";
		this.div.appendChild( audio );

		// add event listeners for all audio elements
		const evs = {
			ended: (ev) => this.base.postLog( "AUDIO_PLAY_ENDED", { audioId: ev.target.dataset.audioId } ),
			play: (ev) => this.base.postLog( "AUDIO_PLAY_START", { audioId: ev.target.dataset.audioId } ),
			pause: (ev) => this.base.postLog( "AUDIO_PLAY_PAUSE", { audioId: ev.target.dataset.audioId } ),
			seeked: (ev) => this.base.postLog( "AUDIO_PLAY_SEEKED", { audioId: ev.target.dataset.audioId } ),
		}
		Array.from( document.querySelectorAll('audio') ).forEach( el => {
			for ( const key in evs ) {
				el.removeEventListener( key, evs[key] );
				el.addEventListener( key, evs[key] );
			}
		})
	}

	///////////////////////////////////

	deleteAll () {
		if ( this.trashEnabled ) {
			this.base.postLog('DELETE_ALL_PRESSED');
			this.showReady();
			this.deleteAudios();
		}
	}

	deleteAudios () {
		this.div.innerHTML = '';
		this.audioList = [];
		this.audioId = 0;
		this.base.sendChangeState( this );
	}

	getDefaultChangeState () {
		const res = Array.isArray( this.audioList ) && this.audioList.length > 0;
		if ( 'trashEnabled' in this && this.trashEnabled != res ) {
			this.enableTrash( res );
		}
		return res;
	}
}
