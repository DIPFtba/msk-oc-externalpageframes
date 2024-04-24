import { inputGrid_freePaint_InsertButtons_switch } from "../../libs/inputGrid";

export class inputGridFromSchema extends inputGrid_freePaint_InsertButtons_switch {

	constructor ( base, opts = {} ) {

		// insertButtons
		const sp = { extraSpace: opts.toolbarSpace };
		const insTexts = {
			comp: [ ['<'], ['>'] ],
			free1: [ [sp], [sp] ],
			euroPercent: [ ['€'], ['%'] ],
			free2: [ [sp], [sp] ],
			math: [ ['+','⋅','='], ['-','∶'] ],
		};
		const texts = [ [], [] ];
		for ( const k in insTexts ) {
			if ( opts.insertButtons[k] ) {
				texts[0].push( ...insTexts[k][0] );
				texts[1].push( ...insTexts[k][1] );
			}
		}
		delete opts.insertButtons;
		opts.mode ='text';
		let iconWidth = 1;

		if ( texts[0].length > 0) {
			opts.insertIconDefs = texts.map( (text,i) => ({
				x: opts.x + i*1.5*opts.cell.width,
				y: opts.y,
				width: 1.5*opts.cell.width-2,
				height: 1.5*opts.cell.height-2,
				texts: text
			}) );
			iconWidth = texts.length * ( opts.insertIconDefs[0].width + 2 );
		} else {
			opts.insertIconDefs = [];
		}

		// init textModeBar
		if ( opts.hasTextModeBar ) {
			const iconDefs = [ 'setTextMode', 'textClearAll' ];
			if ( opts.hasUnderlineMode ) {
				iconDefs.splice( 1, 0, 'toggleLine' );
			}
			if ( opts.hasCarryMode ) {
				iconDefs.splice( 1, 0, 'setCarryMode' );
			}
			opts.textModeBarDefs = {
				x: opts.x,
				y: opts.y,
				width: 1.5*opts.cell.width-2,
				height: 1.5*opts.cell.height-2,
				iconDefs
			}
			opts.insertIconDefs.forEach( bar => bar.y += opts.textModeBarDefs.iconDefs.length * ( opts.textModeBarDefs.height + 2 ) + opts.toolbarSpace );
			iconWidth = Math.max( iconWidth, opts.textModeBarDefs.width + 2 );
		} else {
			opts.textModeBarDefs = null;
		}

		// init FreePaint bar
		if ( opts.hasFreePaint ) {
			opts.modeIconBarDef = {
				x: opts.x,
				y: opts.y,
				width: 1.5*opts.cell.width-2,
				height: 1.5*opts.cell.height-2,
			}
			iconWidth = Math.max( iconWidth, opts.modeIconBarDef.width + 2 );
		} else {
			opts.modeIconBarDef = null;
		}

		// init text/paint switch
		if ( opts.hasFreePaint) {
			const width = 80;
			const height = 1.5*opts.cell.height;
			const dist = 10;
			opts.switchModeBarDef = {
				x: opts.x,
				y: opts.y,
				width,
				height,
				dist,
			};

			iconWidth = Math.max( iconWidth, width+2 );
			const switchOverAllHeight = 2*(height+2) + 2*dist;
			[ ...opts.insertIconDefs, opts.textModeBarDefs, opts.modeIconBarDef ].forEach( barDef => {
				if ( barDef ) {
					barDef.y += switchOverAllHeight;
				}
			});
			opts.mode = 'paint';
		} else {
			opts.switchModeBarDef = null;
		}

		// calc grid
		if ( !opts.grid.cols ) {
			opts.grid.cols = Math.floor( ( base.width - opts.x - iconWidth - opts.toolbarSpace ) / opts.cell.width );
		}
		if ( !opts.grid.rows ) {
			opts.grid.rows = Math.floor( ( base.height - opts.y ) / opts.cell.height );
		}

		// All bars to the right!
		const iconX = opts.grid.cols*opts.cell.width + opts.toolbarSpace;
		[ ...opts.insertIconDefs, opts.textModeBarDefs, opts.modeIconBarDef, opts.switchModeBarDef ].forEach( barDef => {
			if ( barDef ) {
				barDef.x += iconX;
			}
		});

		// styles
		const styleOpts = [0];
		if ( opts.elemStyle1 ) {
			styleOpts.push(1);
		}
		opts.cellTextStyles = styleOpts.map( i => ({
				fontSize: opts[`elemStyle${i}`].cellFontSize,
				opacity: opts[`elemStyle${i}`].cellOpacity,
		}) );
		opts.inputElemStyles = styleOpts.map( i => ({
				fontSize: `${opts[`elemStyle${i}`].inputFontSize}px`,
				background: opts[`elemStyle${i}`].inputBackground,
		}) );

		super( base, opts );
	}

}
