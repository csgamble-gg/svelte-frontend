import * as PIXI from 'pixi.js';
import type { ViewManager } from './ViewManager';

export class View extends PIXI.Container {
	viewManager: ViewManager;
	app: PIXI.Application;
	renderer: PIXI.Application['renderer'];
	constructor(viewManager: ViewManager, app: PIXI.Application) {
		super();

		this.viewManager = viewManager;
		this.app = app;

		this.renderer = app.renderer;
	}

	get width() {
		return this.app.screen.width;
	}

	get height() {
		return this.app.screen.height;
	}

	getSize(size: number) {
		let ratio =
			Math.sqrt(this.width * this.height + this.height * this.width) /
			1800;

		if (ratio > 1) {
			ratio = 1;
		} else if (ratio < 0.4) {
			ratio = 0.4;
		}

		return size * ratio;
	}

	tick() {}

	onResize(width: number, height: number) {}

	onCreate() {}

	destroy() {}
}
