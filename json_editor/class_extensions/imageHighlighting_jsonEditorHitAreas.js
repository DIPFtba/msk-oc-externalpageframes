import { imageHighlightingFromSchema, getObjImgPossScaledHashed, hitAreaScaled, validateHitAreaDef } from './imageHighlighting.js';

//////////////////////////////////////////////////////////////////////////////

export async function editHitAreas( vals, posneg, cfgJson ) {

	// Overlay darstellen, Imgs laden
	const dialog = document.querySelector( '#fullscreen-overlay' );
	dialog.innerHTML = '';
	const container = document.createElement( 'div' );
	dialog.appendChild( container );
	dialog.showModal();

	const io = new imageHighlightingFromSchema( container, cfgJson, {}, 1 );
	await io.base.getInitDonePromise();

	// Areas parsen, verifizieren, ggf. umrechnen
	// imgPoss gibt immer an, von wo bis wo die einzelnen Bilder ihre Koordinaten haben
	// Diese werden über Hash verifiziert
	const imgPossScaledHashed = getObjImgPossScaledHashed(io.imgPoss);
	let areaDef;
	const stageWidth = Math.round( io.stage.width() );
	const stageHeight = Math.round( io.stage.height() );

	if ( vals.trim() == '' ) {

		areaDef = {
			posHashs: imgPossScaledHashed,	// Für welches Bilder-Set wurden die Hit-Areas erzeugt?
			w: stageWidth,	// Damit können die Koordinaten später umgerechnet werden, falls die Hit-Areas für andere Stage erstellt wurden
			h: stageHeight,
			areas: [],	// Die Hit-Areas
		};

	} else {
		try {
			const json = JSON.parse( vals );

			// Haben die Bilder die gleichen Hashes?
			validateHitAreaDef( json, imgPossScaledHashed );
			// areaDef zusammenstellen
			areaDef = {
				posHashs: imgPossScaledHashed,
				w: stageWidth,
				h: stageHeight,
				areas: hitAreaScaled( json.areas, stageWidth, json.w, stageHeight, json.h ),
			}
		} catch (e) {
			alert( `Ungültige Format für Hit Area (${e.message}) bei '${vals}'` );
			dialog.close();
			return vals;
		}
	}

	areaDef.areas = await drawRects( io.stage, areaDef.areas, container, posneg=='pos' );

	dialog.close();

	// Rects sortieren
	for ( const area of areaDef.areas ) {
		area.x1 = Math.round( Math.min( area.x1, area.x2 ) );
		area.y1 = Math.round( Math.min( area.y1, area.y2 ) );
		area.x2 = Math.round( Math.max( area.x1, area.x2 ) );
		area.y2 = Math.round( Math.max( area.y1, area.y2 ) );
	};
	areaDef.areas.sort( (a,b) => a.y1 - b.y1 || a.x1 - b.x1 || a.y2 - b.y2 || a.x2 - b.x2 );

	return JSON.stringify( areaDef );
}

//////////////////////////////////////////////////////////////////////////////

function drawRects( stage, initialAreas, zoomDiv, green=true ) {

	return new Promise( (resolve) => {

		const HANDLE_SZ = 8;

		const FILL_PALETTE = green
			? [ 'rgba(27,94,32,0.45)', 'rgba(56,142,60,0.45)', 'rgba(76,175,80,0.45)', 'rgba(129,199,132,0.45)', 'rgba(165,214,167,0.45)' ]
			: [ 'rgba(183,28,28,0.45)', 'rgba(198,40,40,0.45)', 'rgba(229,57,53,0.45)', 'rgba(239,83,80,0.45)', 'rgba(239,154,154,0.45)' ];
		const STROKE_PALETTE = green
			? [ '#1b5e20', '#388e3c', '#4caf50', '#81c784', '#a5d6a7' ]
			: [ '#b71c1c', '#c62828', '#e53935', '#ef5350', '#ef9a9a' ];

		const SEL_STROKE_COLOR = '#ff9800';
		const SEL_STROKE_WIDTH = 2.5;

		const HANDLE_CURSORS = [
			[ 'nw-resize', 'n-resize', 'ne-resize' ],
			[ 'w-resize', null, 'e-resize' ],
			[ 'sw-resize', 's-resize', 'se-resize' ],
		];

		let zoom = 1;
		let rects = initialAreas.map( a => ({ ...a }) );
		let selectedIdx = -1;

		const zoomParent = zoomDiv.parentElement;
		const outerWrapper = document.createElement( 'div' );
		outerWrapper.style.cssText = 'display:flex; flex-direction:column; width:100%; height:100%;';
		zoomParent.insertBefore( outerWrapper, zoomDiv );

		const scrollArea = document.createElement( 'div' );
		scrollArea.style.cssText = 'flex:1 1 auto; overflow:auto; position:relative; min-height:0;';
		outerWrapper.appendChild( scrollArea );

		const sizeDiv = document.createElement( 'div' );
		sizeDiv.style.cssText = `width:${stage.width()}px; height:${stage.height()}px; position:relative;`;
		scrollArea.appendChild( sizeDiv );

		const baseWidth = stage.width();
		const baseHeight = stage.height();

		zoomDiv.style.transformOrigin = 'top left';
		zoomDiv.style.position = 'absolute';
		zoomDiv.style.left = '0';
		zoomDiv.style.top = '0';
		zoomDiv.style.width = `${baseWidth}px`;
		zoomDiv.style.height = `${baseHeight}px`;
		sizeDiv.appendChild( zoomDiv );

		const layer = new Konva.Layer();
		stage.add( layer );

		const mkBtn = ( container, label, title, cb ) => {
			const b = document.createElement( 'button' );
			b.textContent = label;
			b.title = title;
			b.style.cssText = 'padding:4px 12px; cursor:pointer; font-size:13px;';
			b.addEventListener( 'click', cb );
			container.appendChild( b );
			return b;
		};

		const btnBar = document.createElement( 'div' );
		btnBar.style.cssText = 'display:flex; gap:6px; padding:6px 10px; background:lightyellow; border-top:1px solid #ccc; flex-shrink:0; align-items:center;';
		outerWrapper.appendChild( btnBar );

		mkBtn( btnBar, '✓ Übernehmen', 'ENTER - Änderungen übernehmen', () => finish( true ) );
		mkBtn( btnBar, '✗ Abbrechen', 'ESC - Abbrechen ohne Änderungen', () => finish( false ) );
		const delBtn = mkBtn( btnBar, 'Löschen', 'DEL - Markiertes Rechteck löschen', deleteSelected );
		delBtn.disabled = true;

		const spacer = document.createElement( 'span' );
		spacer.style.flex = '1';
		btnBar.appendChild( spacer );

		mkBtn( btnBar, 'Zoom +', 'Zoom vergrößern', () => setZoom( zoom * 1.25 ) );
		mkBtn( btnBar, 'Zoom -', 'Zoom verkleinern', () => setZoom( zoom / 1.25 ) );

		const clonePos = p => p ? { x: p.x, y: p.y } : null;
		const getStagePos = (ev) => {
			if ( ev && ev.evt ) {
				const rect = stage.container().getBoundingClientRect();
				return {
					x: ( ev.evt.clientX - rect.left ) / zoom,
					y: ( ev.evt.clientY - rect.top ) / zoom,
				};
			}
			return clonePos( stage.getPointerPosition() );
		};

		function setZoom ( z ) {
			const oldZoom = zoom;
			zoom = Math.max( 0.2, Math.min( 5, z ) );

			const cx = ( scrollArea.scrollLeft + scrollArea.clientWidth / 2 ) / oldZoom;
			const cy = ( scrollArea.scrollTop + scrollArea.clientHeight / 2 ) / oldZoom;

			zoomDiv.style.transform = `scale(${zoom})`;
			sizeDiv.style.width = ( baseWidth * zoom ) + 'px';
			sizeDiv.style.height = ( baseHeight * zoom ) + 'px';

			requestAnimationFrame( () => {
				const nextLeft = cx * zoom - scrollArea.clientWidth / 2;
				const nextTop = cy * zoom - scrollArea.clientHeight / 2;
				const maxLeft = Math.max( 0, sizeDiv.clientWidth - scrollArea.clientWidth );
				const maxTop = Math.max( 0, sizeDiv.clientHeight - scrollArea.clientHeight );
				scrollArea.scrollLeft = Math.max( 0, Math.min( maxLeft, nextLeft ) );
				scrollArea.scrollTop = Math.max( 0, Math.min( maxTop, nextTop ) );
			} );
		}

		function renderAll () {
			layer.destroyChildren();

			rects.forEach( (r, idx) => {
				const rx = Math.min( r.x1, r.x2 );
				const ry = Math.min( r.y1, r.y2 );
				const rw = Math.abs( r.x2 - r.x1 );
				const rh = Math.abs( r.y2 - r.y1 );
				const sel = idx === selectedIdx;

				const fillColor = FILL_PALETTE[idx % FILL_PALETTE.length];
				const strokeColor = sel ? SEL_STROKE_COLOR : STROKE_PALETTE[idx % STROKE_PALETTE.length];
				const strokeWidth = sel ? SEL_STROKE_WIDTH : 1.5;

				const kr = new Konva.Rect({
					x: rx, y: ry, width: rw, height: rh,
					fill: fillColor,
					stroke: strokeColor,
					strokeWidth: strokeWidth,
					hitStrokeWidth: 8,
				});

				kr.on( 'mouseenter', () => { stage.container().style.cursor = 'move'; } );
				kr.on( 'mouseleave', () => { stage.container().style.cursor = ''; } );

				kr.on( 'mousedown', (e) => {
					e.cancelBubble = true;
					selectedIdx = idx;
					delBtn.disabled = false;
					renderAll();
					isDraggingRect = true;
					dragStartPos = getStagePos( e );
					dragStartRect = { ...rects[idx] };
				} );
				layer.add( kr );

				if ( sel ) {
					for ( let hy = 0; hy < 3; hy++ ) {
						for ( let hx = 0; hx < 3; hx++ ) {
							if ( hx === 1 && hy === 1 ) continue;
							const hpx = rx + hx * rw / 2;
							const hpy = ry + hy * rh / 2;
							const cursor = HANDLE_CURSORS[hy][hx];

							const kh = new Konva.Rect({
								x: hpx - HANDLE_SZ / 2,
								y: hpy - HANDLE_SZ / 2,
								width: HANDLE_SZ,
								height: HANDLE_SZ,
								fill: '#ffffff',
								stroke: SEL_STROKE_COLOR,
								strokeWidth: 1.5,
							});

							kh.on( 'mouseenter', () => { stage.container().style.cursor = cursor; } );
							kh.on( 'mouseleave', () => { stage.container().style.cursor = ''; } );

							kh.on( 'mousedown', (e) => {
								e.cancelBubble = true;
								isDraggingHandle = { hx, hy };
								dragStartPos = getStagePos( e );
								dragStartRect = { ...rects[selectedIdx] };
							} );
							layer.add( kh );
						}
					}
				}
			} );

			layer.batchDraw();
		}

		let isDrawing = false;
		let drawStartPos = null;
		let drawKonvaRect = null;
		let isDraggingRect = false;
		let isDraggingHandle = null;
		let dragStartPos = null;
		let dragStartRect = null;

		stage.on( 'mousedown.drawRects', (e) => {
			if ( e.target !== stage ) return;
			selectedIdx = -1;
			delBtn.disabled = true;
			drawStartPos = getStagePos( e );
			if ( !drawStartPos ) return;

			isDrawing = true;
			drawKonvaRect = new Konva.Rect({
				x: drawStartPos.x,
				y: drawStartPos.y,
				width: 0,
				height: 0,
				fill: FILL_PALETTE[rects.length % FILL_PALETTE.length],
				stroke: STROKE_PALETTE[rects.length % STROKE_PALETTE.length],
				strokeWidth: 1.5,
			});
			layer.add( drawKonvaRect );
			layer.batchDraw();
		} );

		stage.on( 'mousemove.drawRects', (e) => {
			const pos = getStagePos( e );
			if ( !pos ) return;

			if ( isDrawing && drawKonvaRect ) {
				drawKonvaRect.setAttrs({
					x: Math.min( drawStartPos.x, pos.x ),
					y: Math.min( drawStartPos.y, pos.y ),
					width: Math.abs( pos.x - drawStartPos.x ),
					height: Math.abs( pos.y - drawStartPos.y ),
				});
				layer.batchDraw();
				return;
			}

			if ( isDraggingRect && dragStartRect ) {
				const dx = pos.x - dragStartPos.x;
				const dy = pos.y - dragStartPos.y;
				rects[selectedIdx] = {
					x1: dragStartRect.x1 + dx,
					y1: dragStartRect.y1 + dy,
					x2: dragStartRect.x2 + dx,
					y2: dragStartRect.y2 + dy,
				};
				renderAll();
				return;
			}

			if ( isDraggingHandle && dragStartRect ) {
				const { hx, hy } = isDraggingHandle;
				const dx = pos.x - dragStartPos.x;
				const dy = pos.y - dragStartPos.y;
				const x1 = Math.min( dragStartRect.x1, dragStartRect.x2 );
				const y1 = Math.min( dragStartRect.y1, dragStartRect.y2 );
				const x2 = Math.max( dragStartRect.x1, dragStartRect.x2 );
				const y2 = Math.max( dragStartRect.y1, dragStartRect.y2 );
				const nr = { x1, y1, x2, y2 };
				if ( hx === 0 ) nr.x1 = x1 + dx;
				if ( hx === 2 ) nr.x2 = x2 + dx;
				if ( hy === 0 ) nr.y1 = y1 + dy;
				if ( hy === 2 ) nr.y2 = y2 + dy;
				rects[selectedIdx] = nr;
				renderAll();
			}
		} );

		stage.on( 'mouseup.drawRects', (e) => {
			if ( isDrawing && drawKonvaRect ) {
				const pos = getStagePos( e );
				if ( pos ) {
					const rw = Math.abs( pos.x - drawStartPos.x );
					const rh = Math.abs( pos.y - drawStartPos.y );
					if ( rw > 3 && rh > 3 ) {
						rects.push({
							x1: Math.min( drawStartPos.x, pos.x ),
							y1: Math.min( drawStartPos.y, pos.y ),
							x2: Math.max( drawStartPos.x, pos.x ),
							y2: Math.max( drawStartPos.y, pos.y ),
						});
						selectedIdx = rects.length - 1;
						delBtn.disabled = false;
					}
				}
				drawKonvaRect.destroy();
				drawKonvaRect = null;
				isDrawing = false;
				renderAll();
				return;
			}
			isDraggingRect = false;
			isDraggingHandle = null;
		} );

		function onKeyDown ( e ) {
			if ( e.key === 'Delete' && selectedIdx >= 0 ) {
				deleteSelected();
			} else if ( e.key === 'Enter' ) {
				finish( true );
			} else if ( e.key === 'Escape' ) {
				finish( false );
			}
		}
		document.addEventListener( 'keydown', onKeyDown );

		function deleteSelected () {
			if ( selectedIdx < 0 ) return;
			rects.splice( selectedIdx, 1 );
			selectedIdx = -1;
			delBtn.disabled = true;
			renderAll();
		}

		function finish ( accept ) {
			document.removeEventListener( 'keydown', onKeyDown );
			stage.off( '.drawRects' );
			layer.destroy();
			stage.batchDraw();
			sizeDiv.removeChild( zoomDiv );
			zoomDiv.style.transform = '';
			zoomDiv.style.transformOrigin = '';
			zoomDiv.style.position = '';
			zoomDiv.style.left = '';
			zoomDiv.style.top = '';
			zoomDiv.style.width = '';
			zoomDiv.style.height = '';
			zoomParent.insertBefore( zoomDiv, outerWrapper );
			outerWrapper.remove();
			resolve( accept ? rects : initialAreas.map( a => ({ ...a }) ) );
		}

		renderAll();
	});

}
