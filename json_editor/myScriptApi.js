import { mergeDeep } from "../libs/common";

// Create local file myScriptApiCfg.js with myScript keys:
// export default {
//     ak: "<myScript application key>",
//     hk: "<myScript hmac key>",
// }
import extCfg from "./myScriptApiCfg";

export class myScriptApi {

	constructor ( opts = {} ) {

		const defaultOpts = {

			url: "https://cloud.myscript.com/api/v4.0/iink/recognize",
			acceptHeader: "application/x-latex, application/json",

			custom_sk_enabled_subset: "0123456789+-*:=",
			reqOpts: {
				contentType: "Math",
				configuration: {
					alwaysConnected: true,
					math: {},
					recognition: {
						type: "math",
						math: {
						  mimeTypes: ["application/x-latex"]
						},
					},
				},
				gesture: {
					enable: false,
				},
				scaleX: 0.25,
				scaleY: 0.25,
			},
		}

		mergeDeep( Object.assign( this, defaultOpts, extCfg ), opts );

		if ( this.custom_sk_enabled_subset ) {
			mergeDeep( this.reqOpts.configuration.math, {
				"custom-sk": {
					type: "Math Enabled Subset",
					content: this.custom_sk_enabled_subset,
				}
			});
		}
	}

	///////////////////////////////////

	async startRecog ( strokes ) {

		this.cancelRecog();

		const reqOpts = this.reqOpts;
		reqOpts.strokes = strokes;
		const body = JSON.stringify(reqOpts);

		const headers = {
			"Accept": this.acceptHeader,
			"Content-Type": "application/json",
			"applicationKey": this.ak,
			"hmac": await this.getHk( body ),
		}

		this.reqController = new AbortController();

		const pr = new Promise( ( res, rej ) => {

			fetch( this.url, {
				method: "POST",
				headers,
				body,
				signal: this.reqController.signal,
			})
				.then( response => {

					if ( response.status != 200 ) {

						response.json()
							.then( data => {
								rej( `myScript Error '${data.code}': ${data.message}` );
							}).catch( () => {
								rej( `unknown myScript Error` );
							});

					} else {

						res( response.text() );

					}
				})
				.catch( err => {

					if ( this.aborted && err.name == "AbortError" ) {
						res( "" );
					} else {
						rej( `myScript Error: ${err.message}` );
					}
				})
				.finally( () => {
					this.reqController = null;
				});
		});

		return pr;
	}

	///////////////////////////////////

	cancelRecog () {
		if ( this.reqController ) {
			this.aborted = true;
			this.reqController.abort();
			this.aborted = false;
		}
	}

	///////////////////////////////////

	/**
	 * https://developer.myscript.com/support/account/registering-myscript-cloud/#computing-the-hmac-value
	 *
	 * Compute required value to return to the server with hmac SHA512 hash algorithm
	 * It prevents from man-in-the-middle key theft
	 *
	 * @applicationKey : applicationKey
	 * @hmackey :hmacKey
	 * @jsonInput: textInput, mathInput, shapeInput, musicInput or AnalyzerInput in REST mode, challenge in WebSocket mode
	 *
	 */
	async getHk (jsonInput) {
		const HMAC_SHA_512_ALGORITHM = { name: "HMAC", hash: { name: "SHA-512" } };
		const encoder = new TextEncoder();

		// Combine application key and HMAC key
		const userKey = this.ak + this.hk;

		try {
			// Import the key as a CryptoKey
			const cryptoKey = await crypto.subtle.importKey(
				"raw", // Raw key material
				encoder.encode(userKey), // Encode the key as Uint8Array
				HMAC_SHA_512_ALGORITHM, // Algorithm details
				false, // Key is not exportable
				["sign"] // Key usage: signing
			);

			// Generate the HMAC signature
			const signature = await crypto.subtle.sign(
				HMAC_SHA_512_ALGORITHM, // Algorithm details
				cryptoKey, // The imported key
				encoder.encode(jsonInput) // Encode the input data as Uint8Array
			);

			// Convert the ArrayBuffer to a hexadecimal string
			return Array.from(new Uint8Array(signature))
				.map((byte) => byte.toString(16).padStart(2, "0"))
				.join("");
		} catch (error) {
			throw new Error(`Failed to compute HMAC: ${error.message}`);
		}
	}

}
