import { mergeDeep } from './common'

import Konva from 'konva/lib/Core'
import { Line } from 'konva/lib/shapes/Line'
import { Arrow } from 'konva/lib/shapes/Arrow'
import { Circle } from 'konva/lib/shapes/Circle'
import { Text } from 'konva/lib/shapes/Text'

export class numberLine {

	constructor ( layer, opts = {} ) {
		// Defaults to opts
		const defaultOpts = {
			//type: 'none'|'ticks'|'chain'

			x: 20, y: 20,
			width: 500,
			valFrom: 0, valTo: 100,

			labelY: 5, labelSize: 20,
			labels: [], // [val1,val2] or [ [val1,text1], [val2,text2] ]
			labelsEvery: null, labelsMin: null, labelsMax: null,
		}
		const defTypeOpts = {
			none: { lineHeight: 5,
					labelTickHeight: 18, labelTickWidth: 3 },
			ticks: { lineHeight: 1,
					arrowHeight: 12, arrowWidth: 18, arrowDist: 25,
					minTicks: { vals: 1, height: 15, width: 1, min: null, max: null },
					midTicks: { vals: 5, height: 27, width: 1, min: null, max: null },
					majTicks: { vals: 10, height: 32, width: 3, min: null, max: null } },
			chain: { //radius: 5,
					len: 10, color1: 'black', color2: 'white',
					labelTickHeight: 26, labelTickWidth: 2,
					labelY: 10 }
		}
		mergeDeep( Object.assign( this, defaultOpts, defTypeOpts[opts.type || 'ticks'] ), opts );
		this.layer = layer;

		if ( this.width<=0 ) {
			this.width += layer.width() - this.x;
		}

		// this.numberLine
		if ( this.lineHeight ) {

			// Coord Calc
			this.unit = this.width / (this.valTo-this.valFrom);
			this.val2x = function (val) {
				return this.x + (val-this.valFrom)*this.unit;
			}
			this.x2val = function (x) {
				return (x-this.x)/this.unit + this.valFrom;
			}

			if ( this.arrowDist ) {
				// with arrow
				layer.add( new Konva.Arrow({
					points: [ this.x, this.y, this.x+this.width+this.arrowDist, this.y ],
					pointerLength: this.arrowWidth,
					pointerWidth: this.arrowHeight,
					fill: 'black',
					stroke: 'black',
					strokeWidth: this.lineHeight,
				}) );
			} else {
				// without arrow
				layer.add( new Konva.Line( {
					points: [ this.x, this.y, this.x+this.width, this.y ],
					stroke: 'black',
					strokeWidth: this.lineHeight,
				}));
			}

			// Ticks
			for ( const ticks of [ this.minTicks, this.midTicks, this.majTicks ] ) {
				if ( ticks && ticks.vals ) {
					this.labelY = Math.max( ticks.height/2, this.labelY );
					if ( ticks.min===null ) {
						ticks.min = this.valFrom;
					}
					if ( ticks.max===null ) {
						ticks.max = this.valTo;
					}
					for ( let v = Math.ceil(ticks.min/ticks.vals)*ticks.vals;
									v <= +ticks.max + 1e-8;
									v += ticks.vals ) {
						if ( ( !this.midTicks || !this.midTicks.vals || this.midTicks.vals<=ticks.vals || v % this.midTicks.vals > 1e-8 ) &&
								( !this.majTicks || !this.majTicks.vals || this.majTicks.vals<=ticks.vals || v % this.majTicks.vals > 1e-8 ) ) {
							const px = this.val2x(v);
							layer.add( new Konva.Line({
								points: [ px, this.y-ticks.height/2, px, this.y+ticks.height/2 ],
								stroke: 'black',
								strokeWidth: ticks.width
							}))
						}
					}
				}
			}

		} else {
			// CHAIN

			// Coord Calc
			if ( !this.radius ) {
				this.radius = this.width/(this.valTo-this.valFrom)/2*0.9;
			}

			this.unit = this.width/(this.valTo-this.valFrom);
			this.val2x = function (val) {
				return this.x + (Math.round(val)-this.valFrom)*this.unit;
			}
			this.x2val = function (x) {
				return Math.round( (x-this.x)/this.unit + this.valFrom );
			}

			// this.numberLine
			for ( let v=this.valFrom; v<this.valTo; v++ ) {
				layer.add( new Konva.Circle({
					x: this.val2x(v)+this.unit/2,
					y: this.y,
					radius: this.radius,
					fill: Math.floor(v/this.len) & 1 ? this.color1 : this.color2,
					stroke: this.color1,
					strokeWidth: 1
				}));
			}
		}


		// Labels
		if ( this.labels ) {
			this.labels.forEach( v => this.writeLabel(v) );
		}
		if ( this.labelsEvery ) {
			if ( this.labelsMin===null ) {
				this.labelsMin = this.valFrom;
			}
			if ( this.labelsMax===null ) {
				this.labelsMax = this.valTo;
			}
			for ( let v = Math.ceil(this.labelsMin/this.labelsEvery)*this.labelsEvery;
						v <= this.labelsMax;
						v += this.labelsEvery ) {
				this.writeLabel(v);
			}
		}


		// render hit-area in front of this.numberLine, ticks and labels
		this.kHitLine = new Konva.Line( {
			points: [ this.x, this.y, this.x+this.width, this.y ],
			hitStrokeWidth: this.annotationTickHeight(),
		})
		layer.add( this.kHitLine );

	}

	///////////////////////////////////

	writeLabel (v) {
		const x = this.val2x( Array.isArray(v) ? v[0] : v );
		const y = this.y + this.labelY+5;
		if ( this.labelTickHeight ) {
			this.layer.add( new Konva.Line({
				points: [ x, this.y-this.labelTickHeight/2, x, this.y+this.labelTickHeight/2 ],
				stroke: 'black',
				strokeWidth: this.labelTickWidth || 1,
			}))
		}
		const kText = new Konva.Text({
			text: Array.isArray(v) ? v[1] : v,
			x: x,
			y: y,
			fontSize: this.labelSize,
		});
		kText.offsetX( kText.width() / 2 );
		this.layer.add(kText);

		return this;
	}

	// val2x (v)
	// defined in constructor

	// x2val (x)
	// defined in constuctor

	annotationTickHeight () {
		return Math.max( 30,
				this.majTicks && this.majTicks.height ? this.majTicks.height+15 : 0,
				this.midTicks && this.midTicks.height ? this.midTicks.height+15 : 0,
				this.minTicks && this.minTicks.height ? this.minTicks.height+15 : 0 );
	}

	tickHitLineWidth () {
		return ( this.radius*2 || (this.minTicks || {}).vals*this.unit || this.width/100 )*3;
	}

}
