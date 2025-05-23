//
// Im Prinzip wie textareaSpeechApiRec, aber ohne SpeechAPI
// und mit Support für mehrere audioChunks innerhalb einer Aufnahme,
// mit Lösch-Button für jede einzelne Aufnahme, Möglichkeit für
// "rückgängig" nach einzelnen Löschvorgängen und Speichern ALLER
// (auch gelöschter) Aufnahmen im State
//

import './recordAudio.css'

import { textareaContainer } from '../../libs/textareaInserts'
import { mergeDeep, setStatePostProc } from '../../libs/common';

import microSvg from '../../libs/img/micro.svg';
import trashSvg from '../../libs/img/trash.svg';

export class recordAudioFromSchema extends textareaContainer {

	constructor ( divSelector, opts = {}, base = null ) {

		base.regSendInitDone();
		base.incInitCnt();

		let width;
/// #if ! __EDITOR
		width = window.innerWidth;
/// #else
		const div = typeof divSelector === 'string' ? document.querySelector( divSelector ) : divSelector;
		width = div.offsetWidth;
/// #endif
		let wWidth =  opts.width;
		if ( wWidth<=0 ) {
			wWidth += width;
		};

		// height is container height or window.height
		let height;
/// #if ! __EDITOR
		height = window.innerHeight;
/// #else
		height = document.getElementById('EWK').offsetHeight;
/// #endif
		let wHeight = opts.height;
		if ( wHeight<=0 ) {
			wHeight += height;
		}

		const defaults = {

			outerDivStyles: {
				display: 'flex',
				'flex-direction': 'row',
				'align-items': 'flex-start',
			},

			divStyles: {
				width: `${wWidth-50}px`,
				height: `${wHeight}px`,
			},

			statContainerTemplate:
				'<div id=iconCont>'+
						'<div id=microCont><div id=microBg><div></div><div></div></div><img id=microImg src="'+microSvg+'"></div>'+
						( opts.deleteAllButton===undefined || opts.deleteAllButton ? '<div id=trashCont><img id=trashImg src="'+trashSvg+'"></div>' : '' )+
				'</div>',

			recordText: "<span style=\"color: darkred; font-weight: bold;\">... Neue Aufnahme läuft ...</span>",

			textareaStyle: {
				'background-color': 'white',
				padding: '10px',
				border: '1px solid gray',
			},

			audioBitsPerSecond: 32000,

			individualDelete: true,
			deleteAllButton: true,
		};
		mergeDeep( defaults, opts );

		super( divSelector, defaults, base );

		if ( this.textareaStyle ) {
			this.setStyles( this.div, this.textareaStyle );
		}

		// create statContainer
		const tmp = document.createElement('DIV');
		tmp.innerHTML = this.statContainerTemplate;
		const statContainer = tmp.firstChild;
		this.outerDiv.appendChild( statContainer );

		const imgs = ['microBg','microImg'];
		if ( this.deleteAllButton ) {
			imgs.push('trashImg');
		}
		imgs.forEach( id => {
			const el = document.getElementById( id );
			this[id] = el ? el : document.createElement('DIV');
		});
		if ( this.deleteAllButton ) {
			this.trashImg.addEventListener( 'click', this.deleteAll.bind(this) );
		}

		if ( !navigator.mediaDevices?.getUserMedia ) {
			this.setMicroStat('notAvailable');
			this.statLog('SPEECHAPI_NOT_AVAILABLE')
			return;
		}

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

		const preferredMimeTypes = [
			'audio/ogg;codecs=opus',
			'audio/webm;codecs=opus',
			'audio/webm',
			'audio/ogg',
			'audio/mp4',
		];
		for ( const type of preferredMimeTypes ) {
			if ( MediaRecorder.isTypeSupported(type) ) {
				this.mimeType = type;
				break;
			}
		}

		this.audioId = 0;
		this.audioList = [];
		this.deleteAudios();

		base.decInitCnt();
	}

	///////////////////////////////////

	audioRecStart () {
		const recorder = new MediaRecorder( this.audioStream, {
			audioBitsPerSecond: this.audioBitsPerSecond,
			...this.getMimeType('mimeType'),
		});
		if ( !recorder ) {
			this.setMicroStat('notAvailable');
			this.statLog('SPEECHAPI_NOT_AVAILABLE')
			return;
		}

		this.audioChunks = [];
		const evs = {
			dataavailable: this.audioRecOnDataAvailable,
			stop: this.audioRecOnStop,
		}
		for ( const key in evs ) {
			recorder.addEventListener( key, evs[key].bind(this) );
		}

		recorder.start();
		this.audioRecorder = recorder;
	}

	audioRecStop () {
		if ( this.audioRecorder ) {
			this.audioRecorder.stop();
		}
	}

	audioRecOnDataAvailable ( ev ) {
		this.audioChunks.push(ev.data);
	}

	audioRecOnStop () {
		// Muss alles geschlossen werden und neu initialisiert werden wg. iPads, die sonst
		// nach komplettem Abspielen der Aufnahme nicht mehr aufnehmen können
		this.audioStream.getTracks().forEach( track => track.stop() );
		this.audioStream = null;

		const audioBlob = new Blob(this.audioChunks, this.getMimeType('type') );
		const audioUrl = URL.createObjectURL(audioBlob);

		this.audioDisplay( audioUrl );

		this.audioList[ this.audioId++ ] = {
			a: audioUrl,
			v: 1,
		};
		this.base.sendChangeState(this);
	}

	audioDisplay (data, audioId=this.audioId, displayDiv=this.displayDiv) {
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

		audio.dataset.audioId = audioId;
		audio.innerHTML = "(Wiedergabe nicht unterstützt)<br>";

		// Audio Element
		displayDiv.innerHTML = '';
		displayDiv.appendChild( audio );

		if ( this.individualDelete ) {
			// ggf. dazu Lösch-Button
			const delBtn = document.createElement('img');
			delBtn.src = trashSvg;
			delBtn.addEventListener( 'click', () => this.delOneAudio(displayDiv, audioId) );
			displayDiv.appendChild( delBtn );
		}
		displayDiv.scrollIntoView({ behavior: 'smooth', block: 'nearest' });

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

	async getSavedStat () {
		return sessionStorage.getItem( '__IB_ExtRes_SpeechAPI_stat' );
	}

	async setSavedStat ( stat ) {
		return sessionStorage.setItem( '__IB_ExtRes_SpeechAPI_stat', stat );
	}

	getMimeType (k) {
		return this.mimeType ? { [k]: this.mimeType } : {};
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
				this.setRecAniSpd(2);
				this.microBg.classList.add('recAni');
				break;
		}
		if ( newListener ) {
			this.microListener = newListener;
			this.microImg.addEventListener( 'click', newListener );
		}
	}

	enableTrash (stat) {
		if ( !this.deleteAllButton ) {
			return;
		}

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

	///////////////////////////////////

	async getUserMedia ( showReady=1 ) {

		const me = this;
		return new Promise( (resolve,reject) => {

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
				resolve(stream);
			}

			const onDisabled = () => {
				const s = 'disabled';
				if ( me.savedStat !== s ) {
					me.setSavedStat( s, 0 );
					this.statLog('SPEECHAPI_MIC_NOT_ALLOWED');
				}
				me.showDisabled();
				reject();
			}

			const constraints = { audio: true };
			navigator.mediaDevices.getUserMedia( constraints ).then( onEnabled, onDisabled );
		})
	}

	///////////////////////////////////

	newDisplayDiv (audioId) {
		const displayDiv = document.createElement('DIV');
		displayDiv.dataset.audioId = audioId;
		displayDiv.innerHTML = this.recordText;

		this.div.appendChild( displayDiv );
		displayDiv.scrollIntoView({ behavior: 'smooth', block: 'end' });

		return displayDiv;
	}

	async startRecord () {
		( this.audioStream ? Promise.resolve( this.audioStream ) : this.getUserMedia(0) )
			.then( () => {

				this.displayDiv = this.newDisplayDiv( this.audioId );

				this.recording = true;
				this.audioRecStart();

				this.setMicroStat('recording');
				this.statLog( 'SPEECHAPI_STARTED', { audioId: this.audioId } );
			})
			.catch();
	}

	stopRecord () {

		if ( this.recording ) {

			this.recording = false;
			this.audioRecStop();

			this.showReady();
			this.enableTrash( true );
		}
	}

	///////////////////////////////////

	delOneAudio ( div, audioId ) {
		this.base.postLog('DELETE_ONE_PRESSED', { audioId });
		this.audioList[ audioId ].v = 0;

		if ( div ) {
			const prevHeight = div.offsetHeight + "px";
			div.innerHTML = "<span>Aufnahme Gelöscht. <a href=\"#\">Rückgängig machen</a><span>";
			div.style.minHeight = prevHeight;
			div.style.maxHeight = prevHeight;
			div.style.height = prevHeight;
			div.classList.add('deleted');
			div.querySelector('a').addEventListener( 'click', this.undelOneAudio.bind( this, div, audioId ) );
			div.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
		}
		this.base.sendChangeState( this );
	}

	undelOneAudio ( div, audioId ) {
		this.base.postLog('UNDO_DELETE_ONE_PRESSED', { audioId });
		this.audioList[ audioId ].v = 1;

		div.classList.remove('deleted');
		this.audioDisplay( this.audioList[ audioId ].a, audioId, div );

		this.base.sendChangeState( this );
		this.enableTrash( true );
	}

	deleteAll () {
		if ( this.trashEnabled ) {
			this.base.postLog('DELETE_ALL_PRESSED');
			this.showReady();
			this.deleteAudios();
		}
	}

	deleteAudios () {
		this.div.innerHTML = '';
		this.audioList.forEach( a => a.v = 0 );
		this.base.sendChangeState( this );
	}

	getDefaultChangeState () {
		const res = Array.isArray( this.audioList ) && this.audioList.some( a => a.v );
		if ( !('trashEnabled' in this) || this.trashEnabled != res ) {
			this.enableTrash( res );
		}
		return res;
	}

	statLog ( stat, obj={} ) {
		this.base.postLog( stat, obj );
		this.base.fsm.setFSMVariable( 'SpeechApiStat', stat );
	}

	///////////////////////////////////

	getState () {
		return JSON.stringify( this.audioList);
	}

	setState ( state ) {
		try {
			this.audioList = JSON.parse( state );

			this.audioList.forEach( (a, i) => {
				if ( a.v ) {
					this.audioDisplay( a.a, i, this.newDisplayDiv(i) );
				}
			});
			this.audioId = this.audioList.length;

		} catch (e) {
			console.error(e);
		}

		setStatePostProc(this);
	}

}
