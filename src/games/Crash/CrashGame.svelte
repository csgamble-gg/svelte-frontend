<script lang="ts">
	import '@mszu/pixi-ssr-shim';
	import * as Pixi from 'pixi.js';
	import ResizeObserver from 'resize-observer-polyfill';
	import { onDestroy, onMount } from 'svelte';
	import { CrashCanvasView } from './CrashCanvasView';
	import { CrashEngine } from './CrashEngine';
	import { LoadingView } from './GameViews/LoadingView';
	import { StartingView } from './GameViews/StartingView';
	import { ViewManager } from './GameViews/ViewManager';
	import { state } from './state/game';

	Pixi.utils.skipHello();

	let width: number = 0;
	let height: number = 0;

	let app: Pixi.Application | null = null;
	let crashEngine: CrashEngine | null;
	let crashCanvasView: CrashCanvasView | null = null;
	let viewManager: ViewManager | null = null;

	let canvas: HTMLCanvasElement;
	let containerRef: HTMLDivElement;

	const crash = state;

	let active = true;

	let resizeTimeout: NodeJS.Timeout | null = null;

	onMount(() => {
		crashEngine = new CrashEngine();
		app = new Pixi.Application({
			width: width,
			height: height,
			resizeTo: containerRef,
			resolution: window.devicePixelRatio || 1,
			antialias: true,
			preserveDrawingBuffer: true,
			backgroundAlpha: 0,
			view: canvas,
			autoStart: false,
			sharedLoader: true
		});

		app.loader
			.add('rocket', '/assets/crash_rockets.json', {
				metadata: Pixi.BaseTexture.from('/assets/crash_rockets.png')
			})
			.add('explosions', '/assets/explosions.json', {
				// metadata: Pixi.BaseTexture.from('/assets/crash_explosions.png')
			})
			.load((_, resources) => {
				app.start();
			});

		// crashCanvasView = new CrashCanvasView(crashEngine, app);
		// loadingView = new LoadingView(app);

		const { renderer } = app;
		crashEngine.onResize(
			renderer.width / renderer.resolution,
			renderer.height / renderer.resolution
		);

		app.ticker.add(() => {
			// if (active) {
			// crashEngine.tick();
			// }
			// crashCanvasView.tick();
			viewManager.tick();
		});

		let unsubscribe = crash.subscribe((state) => {
			if (state) {
				// crashEngine.onGameTick(state.elapsed);
			}
		});

		// crashEngine.startTime = Date.now();
		// crashEngine.lastGameTick = crashEngine.startTime;

		const resizeObserver = new ResizeObserver((entries) => {
			clearTimeout(resizeTimeout);
			const entry = entries[0];

			if (entry) {
				const { width, height } = entry.contentRect;

				resizeTimeout = setTimeout(() => {
					app.resize();
					crashEngine.onResize(width, height);
					viewManager.currentView.onResize(width, height);
				}, 10);
			}
		});

		resizeObserver.observe(containerRef);

		// create view manager
		viewManager = new ViewManager(app);

		// register game views
		viewManager.setAttachment('crashEngine', crashEngine);
		viewManager.registerView('loading', LoadingView);
		viewManager.registerView('starting', StartingView);
		viewManager.registerView('game', CrashCanvasView);
		viewManager.switchView('loading');

		return () => {
			unsubscribe();
			crashEngine.destroy();
		};
	});

	onDestroy(() => {});

	setTimeout(() => {
		state.subscribe((state) => {
			if (state) {
				switch (state.status) {
					case 'created':
						viewManager.switchView('starting', {
							startsAt: state.startsAt
						});
						break;
					case 'in-progress':
						crashEngine.elapsedTime = state.elapsed;
						app.ticker.add(() => {
							crashEngine.tick();
						});
						viewManager.switchView('game');
						break;
					case 'crashed':
						viewManager.currentView.crash();
						break;

					default:
						viewManager.switchView('loading');
				}
			}
		});
	}, 500);
</script>

<div bind:this={containerRef} style="width: 100%; height: 590px;">
	<canvas
		style="width: 100%; height: 100%;"
		bind:this={canvas}
		bind:clientHeight={height}
		bind:clientWidth={width}
	/>
</div>
