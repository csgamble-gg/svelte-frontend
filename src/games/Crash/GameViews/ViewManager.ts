import type * as PIXI from 'pixi.js';
import type { View } from './BaseView';

export class ViewManager {
	app: PIXI.Application;
	views: any;
	currentView: any;
	attachments: any;
	constructor(app: PIXI.Application) {
		this.app = app;
		this.views = {};
		this.attachments = {};
		this.currentView = null;
	}

	setAttachment(key: string, value: any) {
		this.attachments[key] = value;
	}

	registerView(key: string, ViewClass: typeof View) {
		this.views[key] = ViewClass;
	}

	switchView(key: string, params = {}) {
		if (typeof this.views[key] === 'undefined') {
			throw new Error(`View ${key} does not exist`);
		}

		// check if view is already active
		if (
			this.currentView &&
			this.currentView.constructor === this.views[key]
		) {
			return;
		}

		// destroy the current view
		if (this.currentView) {
			this.currentView.destroy({
				children: true
			});
			this.currentView.onDestroy();

			this.app.stage.removeChildren();

			this.currentView = null;
		}

		this.currentView = new this.views[key](this, this.app, params);
		this.currentView.onCreate();

		const { renderer } = this.app;
		this.currentView.onResize(
			renderer.width / renderer.resolution,
			renderer.height / renderer.resolution
		);

		this.app.stage.addChild(this.currentView);
	}

	tick() {
		if (this.currentView) {
			this.currentView.tick();
		}
	}

	onResize(width: number, height: number) {
		if (this.currentView) {
			this.currentView.onResize(width, height);
		}
	}
}
