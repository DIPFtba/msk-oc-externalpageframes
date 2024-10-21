// Set FSM variable

export class fsmSend {

	constructor () {
		this.indexPath = this.getQueryVariable('indexPath');
		this.userDefIdPath = this.getQueryVariable('userDefIdPath');

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

		if ( process.env.NODE_ENV !== 'production' ) {
			window.bw__debugOut = this.debugOut.bind(this);
		}
	}

	setFSMVariable ( variableName, newValue ) {

		if ( typeof newValue === 'object' && Array.isArray(newValue) ) {
			newValue = newValue.join(',');
		}

		if ( process.env.NODE_ENV !== 'production' ) {
			this.debugOut( `Set FSM variable: ${variableName} to value >${newValue}< (${typeof newValue})` );
		}

		this.postMessageWithPathsAndTraceCount({
			setVariable: {
				variableName,
				newValue: isNaN(newValue) ? 0 : newValue,
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
		}
		// if ( window.parent !== window ) {
			window.parent.postMessage( payload, '*' );
		// }
	}

	// Helper
	getQueryVariable (variable) {
		const parsedUrl = new URL( window.location.href );
		return parsedUrl.searchParams.get(variable);
	}

	startListeningToVarDeclReq (declareVariableCallback) {

		const prInitDone = this.getInitDonePromise();

		this.answerVarDeclReq = function (callId) {
			prInitDone.then( () => {
				const variables = declareVariableCallback();
				const pass_data = {
					initialVariables: variables,
					callId
				}

				this.postMessage( JSON.stringify( pass_data ) );
			});
		}

		// listener for providing initial variable data signal.
		window.addEventListener(
			"message",
			(event) => {

				try {
					const { callId } = JSON.parse(event.data);
					if ( callId !== undefined && callId.includes("importVariables") ) {
						this.answerVarDeclReq(callId);
					}
				} catch (error) {
					if ( process.env.NODE_ENV !== 'production' ) {
						console.log("error on external listener - ", error);
					}
				}
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
			if (this.initDoneCnt === 0) {
				this.prInitDoneResolve();
			}
		}
		return this.initDoneCnt;
	}

}
