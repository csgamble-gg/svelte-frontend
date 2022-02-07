import { LeonSans } from '$libs/leon-sans/leon';
import * as PIXI from 'pixi.js';
import { View } from './BaseView';
import type { ViewManager } from './ViewManager';

export class StartingView extends View {
	graphics: PIXI.Graphics;
	header: any;
	app: PIXI.Application;
	startsAt: Date;
	seconds: number;
	constructor(
		viewManager: ViewManager,
		app: PIXI.Application,
		params: any
	) {
		super(viewManager, app);
		this.startsAt = params.startsAt;
		this.seconds = 0;
	}

	onCreate() {
		this.graphics = new PIXI.Graphics();
		this.header = new LeonSans({
			text: `Starting soon`,
			color: ['0xffffff'],
			size: 70,
			weight: 800
		});

		this.addChild(this.graphics);
	}

	drawText() {
		const { width, height, header } = this;

		this.graphics.clear();

		header.text = `Starting in ${this.seconds.toFixed(2)} seconds`;

		header.position(
			width / 2 - header.rect.w / 2,
			height / 2 - header.rect.h / 2
		);
		header.drawPixi(this.graphics);
	}

	onResize(width: number, height: number): void {
		this.drawText();
	}

	tick() {
		const now = new Date();
		const elapsed = new Date(this.startsAt).getTime() - now;

		if (elapsed > 0) {
			this.seconds = elapsed / 1000;
			this.drawText();
		}
	}

	onDestroy() {}
}
