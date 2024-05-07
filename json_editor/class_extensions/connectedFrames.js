import { connectedFrames } from "../../libs/connectedFrames";

import { addScoringValsParser } from "../common";

export class connectedFramesFromSchema extends connectedFrames {

	constructor ( base, opts = {}, addMods={}  ) {

		const getConnectorPos = {
			t: (frame) => ({ x: frame.x + frame.width/2, y: frame.y }),
			r: (frame) => ({ x: frame.x + frame.width, y: frame.y + frame.height/2 }),
			b: (frame) => ({ x: frame.x + frame.width/2, y: frame.y + frame.height }),
			l: (frame) => ({ x: frame.x, y: frame.y + frame.height/2 }),
		};
		const canConnectTo = {
			't': function (frame) {
				const frameConnectorPos = frame.connectorPos;
				const myConnectorPos = this.connectorPos;
				return {
						t: false,
						r: frameConnectorPos.x < myConnectorPos.x,
						b: true,
						l: frameConnectorPos.x > myConnectorPos.x,
					}[ frame.connector ] &&
					frameConnectorPos.y < myConnectorPos.y;
			},
			'r': function (frame) {
				const frameConnectorPos = frame.connectorPos;
				const myConnectorPos = this.connectorPos;
				return  {
						t: frameConnectorPos.y > myConnectorPos.y,
						r: false,
						b: frameConnectorPos.y < myConnectorPos.y,
						l: true,
					}[ frame.connector ] &&
					frameConnectorPos.x > myConnectorPos.x;
			},
			'b': function (frame) {
				const frameConnectorPos = frame.connectorPos;
				const myConnectorPos = this.connectorPos;
				return {
						t: true,
						r: frameConnectorPos.x < myConnectorPos.x,
						b: false,
						l: frameConnectorPos.x > myConnectorPos.x,
					}[ frame.connector ] &&
					frameConnectorPos.y > myConnectorPos.y;
			},
			'l': function (frame) {
				const frameConnectorPos = frame.connectorPos;
				const myConnectorPos = this.connectorPos;
				return  {
					t: frameConnectorPos.y > myConnectorPos.y,
					r: true,
					b: frameConnectorPos.y < myConnectorPos.y,
					l: false,
				}[ frame.connector ] &&
				frameConnectorPos.x < myConnectorPos.x;
			},
		};
		opts.frames.forEach( (frame) => {
			frame.connectorPos = getConnectorPos[ frame.connector ]( frame );
			frame.getConnectorPos = function () { return this.connectorPos; };
			frame.canConnectTo = canConnectTo[ frame.connector ];
		});

		// connection indexes in Editor are 1..x
		opts.connections.forEach( (conn) => {
			conn.from--;
			conn.to--;
		});

		super( base, opts );

		addScoringValsParser( this, addMods.Parser );
		this.parseScoringVals(opts);

		this.__inpFrames = this.frames.filter( (frame) => !frame.readonly );
	}


	scoreDef () {
		let res = {};
		if ( !this.__inpFrames ) {
			return res;
		}
		const pref = this.dataSettings.variablePrefix;

		if ( pref ) {
			const inpFrames = this.__inpFrames;
			inpFrames.forEach( (frame,i) => {
				res[ `V_${pref}_Input_${i+1}` ] = frame.textFrame.value;
			});

			const connAr = Array( this.frames.length ).fill( [] );

			const inpConns = this.connections.filter( (conn) => !conn.readonly );
			inpConns.forEach( (conn) => {
				connAr[ conn.from ].push( conn.to );
				connAr[ conn.to ].push( conn.from );
			});

			connAr.forEach( (ar,i) => {
				if ( ar.length>0 ) {
					ar.sort();
				}
				res[ `V_${pref}_Conn_${i+1}` ] = ar;
			});
		}

		if ( this.computeScoringVals ) {
			this.computeScoringVals( res );
		}
		return res;
	}
}
