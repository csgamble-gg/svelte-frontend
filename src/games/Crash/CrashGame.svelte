<script lang="ts">
	import { onDestroy, onMount } from 'svelte';
	import { CrashEngine } from './CrashEngine';
	import { writable } from 'svelte/store';
	import '@mszu/pixi-ssr-shim';
	import * as Pixi from 'pixi.js';
	import { CrashCanvasView } from './CrashCanvasView';
	import ResizeObservable from 'resize-observer-polyfill';

	let width: number = 0;
	let height: number = 0;

	let app: Pixi.Application | null = null;
	let crashEngine: CrashEngine | null = null;
	let crashCanvasView: CrashCanvasView | null = null;

	let canvas: HTMLCanvasElement;
	let containerRef: HTMLDivElement;

	const crash = writable({
		elapsed: 0,
		multiplier: 1
	});

	let active = false;

	// send event every second with new data
	// const mockApi = setInterval(() => {
	// 	crash.update((state) => {
	// 		const elapsedTime = state.elapsed + 10;
	// 		return {
	// 			...state,
	// 			elapsed: elapsedTime,
	// 			multiplier: state.multiplier + 0.01
	// 		};
	// 	});
	// }, 1);

	let resizeTimeout: NodeJS.Timeout | null = null;

	const resizeObserver = new ResizeObservable((entries) => {
		clearTimeout(resizeTimeout);
		const entry = entries[0];

		if (entry) {
			const { width, height } = entry.contentRect;

			resizeTimeout = setTimeout(() => {
				app.resize();
				crashEngine.onResize(width, height);
				crashCanvasView.onResize(width, height);
			}, 250);
		}
	});

	onMount(() => {
		app = new Pixi.Application({
			width: width,
			height: height,
			resizeTo: containerRef,
			resolution: window.devicePixelRatio || 1,
			antialias: true,
			preserveDrawingBuffer: true,
			transparent: true,
			view: canvas,
			autoStart: false,
			sharedLoader: true
		});

		crashEngine = new CrashEngine({ width, height });
		crashCanvasView = new CrashCanvasView(crashEngine, app);
		crashEngine.onResize(
			app.renderer.width / app.renderer.resolution,
			app.renderer.height / app.renderer.resolution
		);

		app.loader
			.add('rocket', '/assets/crash_rockets.json', {
				metadata: Pixi.BaseTexture.from('/assets/crash_rockets.png')
			})
			.add('explosions', '/assets/explosions.json', {
				metadata: Pixi.BaseTexture.from('/assets/crash_explosions.png')
			})
			.load(() => {
				crashCanvasView.onCreate();
				app.start();
			});

		app.ticker.add(() => {
			if (active) {
				crashEngine.tick();
			}
			crashCanvasView.tick();
		});

		let unsubscribe = crash.subscribe((state) => {
			crashEngine.onGameTick(state.elapsed);
		});

		crashEngine.startTime = Date.now();
		crashEngine.lastGameTick = crashEngine.startTime;

		resizeObserver.observe(containerRef);
		return () => {
			unsubscribe();
			crashEngine.destroy();
		};
	});

	onDestroy(() => {});

	function toggleGame() {
		active = !active;
	}

	function crashGame() {
		crashCanvasView.crash();
	}
</script>

<div bind:this={containerRef} style="width: 100%; height: 525px;">
	<button on:click={toggleGame}>start / stop</button>
	<button on:click={crashGame}>crash</button>
	<canvas
		style="width: 100%; height: 100%;"
		bind:this={canvas}
		bind:clientHeight={height}
		bind:clientWidth={width}
	/>
</div>
