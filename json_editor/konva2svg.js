import C2S from 'canvas2svg';

export function konva2svg_bitmap(konvaStage) {

	const c2s = new C2S({
		width: konvaStage.width(),
		height: konvaStage.height(),
	});

	const layers = konvaStage.children;

	for (let i = layers.length - 1; i >= 0; i--) {
		const layer = layers[i];
		const layerCanvas = layer.canvas._canvas;

		c2s.drawImage(
			layerCanvas,
			layer.x(),
			layer.y(),
			layer.width(),
			layer.height()
		);
	}

	return c2s.getSerializedSvg();
}

//////////////////////////////////////

// export function konva2svg(stage) {

// 	const svgLayer = new Konva.Layer();
// 	const orgContext = svgLayer.canvas.context._context;
// 	const c2s = svgLayer.canvas.context._context = C2S({
// 			width: stage.width(),
// 			height: stage.height(),
// 			ctx: orgContext,
// 		});

// 	stage.add( svgLayer );
// 	stage.getLayers().forEach( layer => {
// 		if ( layer !== svgLayer ) {
// 			const chs = layer.getChildren();
// 			while ( chs.length>0 ) {
// 				chs[0].moveTo( svgLayer );
// 				stage.draw();
// 			}
// 		}
// 	})

// 	return c2s.getSerializedSvg();
// }

export function konva2svg(stage) {

	const width = stage.width();
	const height = stage.height();

	const div = document.createElement('div');
	document.getElementById('editor_container').appendChild(div);
	// div.style.visibility = 'none';
	div.style.width = width + 'px';
	div.style.height = height + 'px';

	const newStage = new Konva.Stage({
		container: div,
		width: width,
		height: height,
	});
	const svgLayer = new Konva.Layer();
	const orgContext = svgLayer.canvas.context._context;
	const c2s = svgLayer.canvas.context._context = new C2S({
			width: width,
			height: height,
			ctx: orgContext,
	});
	newStage.add( svgLayer );

	// now copy all objects to the new stage
	const copyAllChildren = ( node, dest ) => {
		node.getChildren().forEach( child => {
			const cn = child.getClassName();
			switch (cn) {
				case 'Layer':
					copyAllChildren( child, dest );
				break;
				case 'Group':
					const newGroup = new Konva.Group( child.getAttrs() );
					copyAllChildren( child, newGroup );
					dest.add( newGroup );
				break;
				case 'Arrow':
					dest.add( addArrow( child.getAttrs() ) );
				break;
				case 'Ellipse':
				break;
				default:
					const newChild = child.clone();
					dest.add( newChild );
				break;
			}
		});
	}

	copyAllChildren( stage, svgLayer );
	newStage.draw();

	// const konvaOut = node => {
	// 	const obj = [];
	// 	node.getChildren().forEach( child => {
	// 		const k = {
	// 			c: child.getClassName(),
	// 		};
	// 		const a =  child.getAttrs();
	// 		if ( Object.keys(a).length>0 ) {
	// 			k.a = a;
	// 		}
	// 		if ( child.getChildren && child.getChildren().length>0 ) {
	// 			k.s = konvaOut( child );
	// 		}
	// 		obj.push(k);
	// 	});
	// 	return obj;
	// }
	// console.log( konvaOut( stage ) );
	// console.log( konvaOut( newStage ) );
	// return '';

	let svg = c2s.getSerializedSvg();
	// replace all scales by scale(1,1) (correct dpi distortion)
	svg = svg.replaceAll( /scale\([^)]+\)/g, 'scale(1,1)' );

	newStage.destroy();
	div.remove();

	return svg;
}

//////////////////////////////////////

const addArrow = function ( opts ) {
	const kGroup = new Konva.Group();
	kGroup.add(new Konva.Line(opts));

	const pointerLength = opts.pointerLength || 10;
	const pointerWidth = opts.pointerWidth/2 || 3;
	const s = { x: opts.points[0], y: opts.points[1] };
	const p0 = { x: opts.points[2], y: opts.points[3] };
	const dx = s.x - p0.x;
	const dy = s.y - p0.y;
	const norm = Math.sqrt(dx * dx + dy * dy);
	const u = { x: dx / norm, y: dy / norm };
	const v = { x: -u.y, y: u.x };
	const p1 = {
		x: p0.x + pointerLength * u.x + pointerWidth * v.x,
		y: p0.y + pointerLength * u.y + pointerWidth * v.y
	};
	const p2 = {
		x: p0.x + pointerLength * u.x - pointerWidth * v.x,
		y: p0.y + pointerLength * u.y - pointerWidth * v.y
	};

	const kOpts = Object.assign({
			fill: "black",
		},
			opts,
		{
			points: [p0.x, p0.y, p1.x, p1.y, p2.x, p2.y],
			closed: true
		}
	);
	kGroup.add(new Konva.Line(kOpts));

	return kGroup;
};

