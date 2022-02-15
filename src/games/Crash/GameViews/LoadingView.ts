import { LeonSans } from '$libs/leon-sans/leon';
import * as PIXI from 'pixi.js';
import { View } from './BaseView';
import type { ViewManager } from './ViewManager';

export class LoadingView extends View {
	graphics: PIXI.Graphics;
	header: any;
	app: PIXI.Application;
	constructor(viewManager: ViewManager, app: PIXI.Application) {
		super(viewManager, app);
	}

	onCreate() {
		this.graphics = new PIXI.Graphics();
		this.header = new LeonSans({
			text: 'Loading Crash',
			color: ['0xffffff'],
			size: this.getSize(70),
			weight: 800
		});

		this.addChild(this.graphics);
	}

	drawText() {
		const { width, height, header } = this;
		this.graphics.clear();

		header.position(
			width / 2 - header.rect.w / 2,
			height / 2 - header.rect.h / 2
		);
		header.drawPixi(this.graphics);
	}

	onResize(width: number, height: number): void {
		this.drawText();
	}

	onDestroy() {}
}
