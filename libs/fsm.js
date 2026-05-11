// Set FSM variable

export class fsmSend {

	constructor () {
		this.indexPath = this.getQueryVariable('indexPath');
		this.userDefIdPath = this.getQueryVariable('userDefIdPath');

		this.callEPFcbs = [];
		this.sendVDcb = null;

		// Trace Counter
		this.traceCount = 0;

		// Init done promise
		this.prInitDone = new Promise( (resolve) => {
			if ( process.env.NODE_ENV === 'production' ) {
				this.prInitDoneResolve = resolve;
			} else {
				this.prInitDoneResolve = () => {
					this.debugOut( "fsmSend: Init done promise resolved" );
					resolve();
				};
			}
		});
		this.initDoneCnt = 0;

		this.startListener();

		if ( process.env.NODE_ENV !== 'production' ) {
			window.bw__debugOut = this.debugOut.bind(this);
		}
	}

	setFSMVariable ( variableName, newValue ) {

		if ( Array.isArray(newValue) ) {
			newValue = newValue.join(',');
		}

		if ( process.env.NODE_ENV !== 'production' ) {
			this.debugOut( `Set FSM variable: ${variableName} to value >${newValue}< (${typeof newValue})` );
		}

		this.postMessageWithPathsAndTraceCount({
			setVariable: {
				variableName,
				newValue: Number.isNaN(newValue) ? 0 : newValue,
			},
		})
	}

	// Send a trace message
	postLogEvent ( traceMessage ) {

		if ( process.env.NODE_ENV !== 'production' ) {
			this.debugOut( `Posting event '${traceMessage.event}', message ${JSON.stringify( traceMessage, (k,v) => k==='event' ? undefined : v )}` );
		}

		this.postMessageWithPathsAndTraceCount({
			traceMessage,
		})

	}

	triggerEvent ( event ) {
		if ( process.env.NODE_ENV !== 'production' ) {
			this.debugOut("triggerEvent: " + event);
		}

		this.postMessageWithPathsAndTraceCount({
			microfinEvent: event,
		})
	}

	postMessageWithPathsAndTraceCount( payload ) {
		try
		{
			payload.indexPath = this.indexPath;
			payload.userDefIdPath = this.userDefIdPath;
			payload.traceCount = this.traceCount++;

			this.postMessage( JSON.stringify( payload ) );

		} catch (e) {
			console.error(e);
		}
	}

	postMessage ( payload ) {
		if ( process.env.NODE_ENV !== 'production' ) {
			this.debugOut( `Posting message: ${payload}` );
			if ( window.parent !== window ) {
				window.parent.postMessage( payload, '*' );
			}
			if ( window.__BW__callback ) {
				window.__BW__callback( payload );
			}
		} else {
			window.parent.postMessage( payload, '*' );
		}
	}

	// Helper
	getQueryVariable (variable) {
		const parsedUrl = new URL( window.location.href );
		return parsedUrl.searchParams.get(variable);
	}

	// Listener
	startListeningToVarDeclReq (declareVariableCallback) {
		if ( typeof declareVariableCallback === 'function' ) {
			this.sendVDcb = declareVariableCallback;
		}
	}

	startListeningToCallEPFOp (callEPFOptionsCallback) {
		if ( typeof callEPFOptionsCallback === 'function' ) {
			this.callEPFcbs.push( callEPFOptionsCallback );
		}
	}

	startListener () {
		this.answerVarDeclReq = function (callId) {
			this.prInitDone.then( () => {
				let variables = []
				if ( this.sendVDcb ) {
					variables = this.sendVDcb();
				}

				const pass_data = {
					initialVariables: variables,
					callId
				}

				this.postMessage( JSON.stringify( pass_data ) );
			});
		}

		const callCbs = (data) => this.prInitDone.then( () => {
			if ( process.env.NODE_ENV !== 'production' ) {
				this.debugOut( `callExternalPageFrameOperator ${this.callEPFcbs.length} listener(s) called with data: ${JSON.stringify(data)}` );
			};
			for ( const cb of this.callEPFcbs ) {
				cb( ...data );
			}
		});

		window.addEventListener(
			"message",
			(json) => {

				try {
					const data = JSON.parse(json.data);
					if ( typeof data === 'object' && data !== null  ) {
						if ( !Array.isArray(data) ) {

							// sendVariableDeclarationReq?
							if ( typeof data.callId === 'string' && data.callId.includes("importVariables") ) {
								this.answerVarDeclReq(data.callId);
							}
							// callExternalPageFrameOperator? (runtime >= 10.5)
							else if ( data.messageKey==='callExternalPageFrameOperator' && Array.isArray(data.parameters) ) {
								callCbs( data.parameters );
							}

						} else {
							// Array message, callEPFcbs? (runtime < 10.5)
							callCbs( data );
						}
					}
				} catch (e) {}
			},
			false );
	}

	debugOut (s) {
		if ( process.env.NODE_ENV !== 'production' ) {

			// if ( !this.debugOutput ) {
			// 	const heigth=200, width=500;
			// 	// document.body.innerHTML += `<div id="bw_DebugOutput" style="width:${width}px;height:${heigth}px;position:absolute;bottom:0px;left:0px;z-index:100000;white-space:pre;border:1px solid black;background:lightyellow"></div>`;
			// 	const div = document.createElement("DIV");
			// 	const st = {
			// 		width:`${width}px`,
			// 		height:`${heigth}px`,
			// 		overflow:"scroll",
			// 		position:"absolute",
			// 		bottom:"0px",
			// 		left:"0px",
			// 		"z-index":100000,
			// 		"white-space":"pre",
			// 		border:"1px solid black",
			// 		background:"lightyellow",
			// 	}
			// 	Object.assign( div.style, st );
			// 	document.body.appendChild(div);
			// 	this.debugOutput = div;
			// }
			// this.debugOutput.innerHTML += "\n"+s;
			// this.debugOutput.scrollTop = this.debugOutput.scrollHeight;

			console.log(s);
			// console.trace();

		}
	}

	///////////////////////////////////

	getInitDonePromise () {
		return this.prInitDone;
	}

	incInitCnt () {
		return ++this.initDoneCnt;
	}

	decInitCnt () {
		if ( this.initDoneCnt > 0 ) {
			this.initDoneCnt--;
			if ( this.initDoneCnt === 0 ) {
				this.prInitDoneResolve();
			}
		}
		return this.initDoneCnt;
	}

}
