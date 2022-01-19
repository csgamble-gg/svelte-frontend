import '@mszu/pixi-ssr-shim';
import * as PIXI from 'pixi.js';
import { Spine } from 'pixi-spine';
import lerp from 'lerp';
import { DropShadowFilter } from 'pixi-filters';
// import { gsap, Power4 } from 'gsap'
// import rand from 'random-seed'

// import { LeonSans } from 'src/vendors/leon'

// import { View } from './View'
import type { CrashEngine } from './CrashEngine';
// import { lerp, getDistance } from '../util'
// import { AxisMarker, CashoutPoint } from '../objects'
// import { MobileWidth } from '../constants'

// GrowMultiplier is when the effects start to happen to the multiplier
const GrowMultiplier = 1.2;

const AxisTickWidth = 2;

const YAxisLabelFontSize = 12;
const YAxisLabelFontSizeSmall = 11;
// const MobileWidth = 700;
const colors = {
	yAxis: 0x9cbbff
};

const settings = {
	mobilewidth: 700,
	yAxisLabelFontSize: 12,
	yAxisTickWidth: 50
};

export class CrashCanvasView {
	sizes: {
		paddingX: 20;
		paddingY: 20;
	};
	settings: {};
	xLabelIndex: number;
	yTickWidth: number;
	yLabelIndex: number;
	demoMode: boolean;
	betAmount: number;
	autoCashoutMultiplier: number | null;
	flipCashout: boolean;
	targetRocketX: number;
	targetRocketY: number;
	targetRocketAngle: number;
	cashoutsAngle: number;
	cashouts: Array<any>;
	crashEngine: CrashEngine;
	lastCashoutTick: number;
	isMobile: boolean;
	interactive: boolean;
	cursor: string;
	mousemove: any;
	app: PIXI.Application;
	multiplierText: PIXI.Text;
	gameContainer: PIXI.Container;
	labelsContainer: PIXI.Container;
	textGraphics: PIXI.Graphics;
	mainLine: PIXI.Graphics;
	multiplierHeader: PIXI.Text;
	width: number;
	height: number;
	xGraphics: PIXI.Graphics;
	yGraphics: PIXI.Graphics;
	rocket: Spine;
	yLabels: Array<any>;
	ready: boolean;

	constructor(crashEngine: CrashEngine, app: any) {
		this.xLabelIndex = 0;
		this.yTickWidth = 50;
		this.yLabelIndex = 1;

		this.demoMode = false;
		this.betAmount = 0;
		this.autoCashoutMultiplier = null;
		this.flipCashout = false;

		this.targetRocketX = 0;
		this.targetRocketY = 0;
		this.targetRocketAngle = 0;

		this.cashoutsAngle = 0;
		this.cashouts = [];
		this.crashEngine = crashEngine;
		this.lastCashoutTick = null;

		this.isMobile = false;

		this.multiplierText = null;

		this.app = app;
		this.ready = false;

		if (!this.isMobile) {
			this.interactive = true;
			this.cursor = 'crosshair';
			// this.mousemove = this.onMouseMove;
		}
	}

	getSize(size: number) {
		let ratio =
			Math.sqrt(this.width * this.width + this.height * this.height) /
			1800;

		if (ratio > 1) {
			ratio = 1;
		} else if (ratio < 0.4) {
			ratio = 0.4;
		}

		return size * ratio;
	}

	createRocket() {
		const rocket = new Spine(this.app.loader.resources.rocket.spineData);
		rocket.scale.set(0.8);
		const skins = rocket.skeleton.data.skins.map((s) => s.name).slice(1);
		rocket.skeleton.setSkinByName(skins[1]);
		rocket.skeleton.setSlotsToSetupPose();

		rocket.state.setAnimation(0, 'fly_yellow', true);
		rocket.state.timeScale = 0.8;
		rocket.angle = 90;
		rocket.x = 0;
		rocket.y = this.crashEngine.plotHeight;
		// rocket.blendMode = PIXI.BLEND_MODES.ADD;

		// rocket.skeleton.findSlot('flames').color.r = 1
		// rocket.skeleton.findSlot('flames').color.g = 0
		// rocket.skeleton.findSlot('flames').color.b = 0.5

		if (this.width > settings.mobilewidth) {
			rocket.filters = [
				new DropShadowFilter({
					alpha: 0.6,
					blur: 6,
					quality: 6,
					distance: 1,
					color: 0x8a73c4
				})
			];
		}

		return rocket;
	}

	updateRocketSize() {
		const isLarge = this.width > 800;
		this.rocket.scale.set(isLarge ? 0.85 : 0.5);
	}

	onCreate() {
		this.gameContainer = new PIXI.Container();
		this.labelsContainer = new PIXI.Container();

		this.textGraphics = new PIXI.Graphics();
		// this.textGraphics.alpha = 0.7

		// this.lagText = new PIXI.Text(
		// 	'Slow network detected, check your network connection',
		// 	{
		// 		fontFamily: 'Roboto',
		// 		fontWeight: '500',
		// 		fontSize: 14,
		// 		fill: 0xe6be4b
		// 	}
		// );

		// this.lagText.visible = this.crashEngine.lag;
		// this.lagText.anchor.set(0);
		// this.lagText.x = 5;
		// this.lagText.y = 5;
		// this.lagText.alpha = 0.5;

		this.multiplierHeader = new PIXI.Text('Current Payout', {
			fontSize: 14,
			fill: 0xffffff,
			fontFamily: 'Poppins'
		});
		// text: 'Current Payout',
		// color: [0x7a7a9a],
		// size: this.getSize(45),
		// weight: 800

		this.multiplierText = new PIXI.Text('0.00x', {
			fontFamily: 'Poppins',
			fontWeight: '800',
			fill: 0xffffff,
			dropShadow: true,
			dropShadowAngle: Math.PI / 2,
			dropShadowAlpha: 0.15,
			dropShadowDistance: 6
			// padding: 400
		});

		this.multiplierText.anchor.set(0);
		this.multiplierText.position.set(
			this.crashEngine.graphWidth / 2,
			this.crashEngine.graphHeight / 2
		);

		this.yLabels = Array.from(
			{
				length: 50
			},
			(_, i) => {
				const yLabel = new PIXI.Text(i === 0 ? '' : '', {
					fontFamily: 'Poppins',
					fontSize: YAxisLabelFontSize,
					fontWeight: '500',
					fill: colors.yAxis
				});

				yLabel.visible = false;
				yLabel.anchor.set(0, 0.5);
				yLabel.y = 0;
				this.labelsContainer.addChild(yLabel);
				return yLabel;
			}
		);

		this.mainLine = new PIXI.Graphics();
		this.xGraphics = new PIXI.Graphics();
		this.yGraphics = new PIXI.Graphics();

		this.rocket = this.createRocket();
		this.updateRocketSize();

		// this.profitText = new PIXI.Text(
		// 	this.demoMode ? 'Demo Mode' : '+ $0.00',
		// 	{
		// 		fontFamily: 'Poppins',
		// 		fontWeight: '600',
		// 		fontSize: 14,
		// 		fill: 0x8bc34a,
		// 		dropShadow: true,
		// 		dropShadowAngle: Math.PI / 2,
		// 		dropShadowAlpha: 0.15,
		// 		dropShadowDistance: 6,
		// 		letterSpacing: 2
		// 		// padding: 400
		// 	}
		// );

		// this.profitText.visible = false; // this.betAmount > 0
		// this.profitText.anchor.set(0.5);
		// this.profitText.scale.set(0);
		//
		// if (this.profitText.visible) {
		//   gsap.to(this.profitText.scale, 0.5, {
		//     x: 1,
		//     y: 1,
		//     ease: Power4.out
		//   })
		// }

		// const explosions = (this.explosions = new Spine(
		// 	this.app.loader.resources.explosions.spineData
		// ));
		// explosions.visible = this.crashEngine.getElapsedTime() <= 2000;
		// explosions.scale.set(0.5);

		// explosions.state.addListener({
		// 	start: () => {
		// 		explosions.visible = true;
		// 	},

		// 	complete: () => {
		// 		explosions.visible = false;
		// 	}
		// });

		// this.cashoutsContainer = new PIXI.Container();

		// this.cashoutYAxisMarker = new AxisMarker(this.crashEngine, 0x4caf50);
		// this.cashoutYAxisMarker.visible = false;

		this.gameContainer.addChild(
			// this.xGraphics,
			this.yGraphics,
			this.labelsContainer,
			this.mainLine,
			this.rocket
			// this.lagText
			// explosions
		);

		this.app.stage.addChild(
			// this.flag,
			this.gameContainer,
			// this.xGraphics,
			this.yGraphics,
			this.gameContainer,
			// this.cashoutYAxisMarker,
			this.textGraphics,
			this.multiplierText
			// this.profitText
		);

		// if (explosions.visible) {
		// 	explosions.x = -15;
		// 	explosions.y = this.crashEngine.plotHeight;
		// 	explosions.state.setAnimation(0, 'Fx04');
		// }
	}

	crash(finalElapsed) {
		// this.hideProfitText();
		this.multiplierText.style.fill = 0xf44336;

		this.rocket.state.clearTrack(0);
		this.rocket.skeleton.setToSetupPose();
		this.rocket.state.setEmptyAnimation(0);

		this.explosions.visible = true;
		this.explosions.x = this.rocket.x - 25;
		this.explosions.y = this.rocket.y + 5;
		this.explosions.state.setAnimation(0, 'Fx03_text');

		this.textGraphics.alpha = 0.5;
		this.multiplierHeader.text = 'Round Over';

		this.drawText();
	}

	getRocketAngle(x: number, y: number) {
		const previousPosition = this.crashEngine.getElapsedPosition(
			this.crashEngine.elapsedTime - 1000
		);
		let rocketAngle =
			(Math.atan2(previousPosition.x - x, previousPosition.y - y) * 180) /
			Math.PI;

		if (rocketAngle < 0) {
			rocketAngle = Math.abs(rocketAngle);
		} else {
			rocketAngle = 360 - rocketAngle;
		}

		return rocketAngle;
	}

	updateCashouts() {
		const { cashouts } = this;
		const now = Date.now();

		const updateVisiblePoints =
			this.lastCashoutTick === null || now - this.lastCashoutTick > 300;

		let lastCashout = null;

		for (let i = 0; i < cashouts.length; i++) {
			const c = cashouts[i];
			const prev = cashouts[i - 1];

			if (i > 0) {
				const targetFlipped = !prev.flipped;

				if (c.flipped !== targetFlipped) {
					c.flipped = targetFlipped;
					c.updateFlipped();
				}
			}

			const position = this.crashEngine.getElapsedPosition(c.elapsed);
			c.x = lerp(c.x, position.x, 0.15);
			c.y = lerp(c.y, position.y, 0.15);

			if (c.hovered) {
				continue;
			}

			if (updateVisiblePoints) {
				let last = cashouts[i - 2];

				for (let j = i - 2; j >= 0; j -= 2) {
					if (cashouts[j].flipped === c.flipped && cashouts[j].visible) {
						last = cashouts[j];
						break;
					}
				}

				c.unminimize();

				if (last) {
					const distance = getDistance(c.x, c.y, last.x, last.y);

					if (distance > 60) {
						if (c.minimized) {
							c.unminimize();
						}
					} else {
						if (!c.minimized) {
							c.minimize();
						}
					}
				}
			}
		}

		if (updateVisiblePoints) {
			this.lastCashoutTick = now;
		}
	}

	hideProfitText() {
		if (this.demoMode) {
			return;
		}

		gsap.killTweensOf(this.profitText.scale);
		gsap.to(this.profitText.scale, 0.5, {
			x: 0,
			y: 0,
			ease: Power4.out,
			onComplete: () => {
				this.profitText.visible = false;
			}
		});
	}

	getTargetAnimation() {
		const { multiplier } = this.crashEngine;

		if (multiplier >= 2) {
			return 'fly_green';
		}

		// if (multiplier >= 10) {
		//   return 'fly_purple'
		// } else if (multiplier >= 5) {
		//   return 'fly_green'
		// } else if (multiplier >= 2) {
		//   return 'fly_blue'
		// }

		return 'fly_yellow';
		// return 'flames'
	}

	tick() {
		const { x, y } = this.crashEngine.getElapsedPosition(
			this.crashEngine.elapsedTime
		);

		// if (this.crashEngine.lag && !this.lagText.visible) {
		// 	this.lagText.visible = true;
		// } else if (!this.crashEngine.lag && this.lagText.visible) {
		// 	this.lagText.visible = false;
		// }

		this.updateCashouts();

		const calcDec = Math.pow(10, 2);
		this.multiplierText.text = `${
			Math.trunc(this.crashEngine.multiplier * calcDec) / calcDec
		}x`; // `${this.crashEngine.multiplier}x`
		const mstr = this.crashEngine.multiplier.toFixed(3);
		this.multiplierText.text = `${mstr.substring(0, mstr.length - 1)}x`;

		// if (
		// 	this.crashEngine.state === CrashEngine.States.Active &&
		// 	(this.crashEngine.betAmount > 0 || this.demoMode)
		// ) {
		// 	if (!this.profitText.visible) {
		// 		this.profitText.visible = true;

		// 		gsap.to(this.profitText.scale, 0.5, {
		// 			x: 1,
		// 			y: 1,
		// 			ease: Power4.out
		// 		});
		// 	}

		// 	if (!this.demoMode) {
		// 		const profit =
		// 			this.crashEngine.betAmount * this.crashEngine.multiplier;
		// 		this.profitText.text = `+ ${numeral(profit).format(
		// 			profit < 1 ? '$0,0.000' : '$0,0.00'
		// 		)}`;
		// 	}
		// }

		// if (this.profitText.visible) {
		//   const profit = this.betAmount * this.crashEngine.multiplier
		//   this.profitText.text = `+ ${numeral(profit).format(profit < 1 ? '$0,0.0000' : '$0,0.00')}`
		// }

		this.drawY();
		this.drawLine(
			this.mainLine,
			0xffeb71,
			0,
			this.crashEngine.elapsedTime
		);

		const targetAnimation = this.getTargetAnimation();

		// if (
		// 	this.rocket.state.getCurrent(0).animation.name !== targetAnimation
		// ) {
		// 	this.rocket.state.setAnimation(0, targetAnimation, true);
		// }

		this.targetRocketX = x;
		this.targetRocketY = y;
		this.targetRocketAngle = this.getRocketAngle(x, y);

		if (this.targetRocketAngle !== this.rocket.angle) {
			this.rocket.angle = lerp(
				this.rocket.angle,
				this.targetRocketAngle,
				0.1
			);
		}

		if (this.targetRocketX !== this.rocket.x) {
			this.rocket.x = lerp(this.rocket.x, this.targetRocketX, 0.1);
		}

		if (this.targetRocketY !== this.rocket.y) {
			this.rocket.y = lerp(this.rocket.y, this.targetRocketY, 0.25);
		}

		// this.explosions.x = this.rocket.x
		// this.explosions.y = this.rocket.y
	}

	onResize(width: number, height: number) {
		this.isMobile = width <= settings.mobilewidth;
		// this.isLarge = width > 800;

		// for (let c of this.cashoutsContainer.children) {
		// 	if (c.isLarge !== this.isLarge) {
		// 		c.isLarge = this.isLarge;
		// 	}
		// }

		this.updateRocketSize();

		const { plotWidth, plotHeight, plotOffsetX, graphWidth, graphHeight } =
			this.crashEngine;

		for (let yLabel of this.yLabels) {
			yLabel.x = plotWidth + 5;
		}

		this.yLabels[0].y = 0;
		this.yLabels[0].visible = true;

		this.multiplierText.x = (this.isMobile ? graphWidth : plotWidth) / 2;
		this.multiplierText.y = (this.isMobile ? graphHeight : plotHeight) / 3;
		this.multiplierText.style.fontSize = 44;

		this.drawText();

		// this.profitText.x = plotWidth / 2;
		// this.profitText.y =
		// this.multiplierHeader.rect.y + this.multiplierHeader.rect.h + 35;

		// this.flag.x = plotWidth - 20;

		// this.cashoutYAxisMarker.onResize();
	}

	drawText() {
		const { plotWidth } = this.crashEngine;

		const color = 0xf44336;

		this.textGraphics.clear();

		// this.multiplierHeader.color = '0xffffff';
		// this.multiplierHeader.position(250, 250);
		// this.multiplierHeader.drawPixi(this.textGraphics);
	}

	onDestroy() {
		this.cashouts = [];

		// const cashouts = this.cashoutsContainer.children;

		// for (let c of cashouts) {
		// 	c.onDestroy();
		// }

		// this.motionTimeline.kill()
		// if (this.yAxisMarker) {
		// 	gsap.killTweensOf(this.yAxisMarker);
		// }

		// gsap.killTweensOf(this.flag);
		// gsap.killTweensOf(this.gameContainer)
		// gsap.killTweensOf(this.profitText.scale);
	}

	stepValues(x, rm = 5, cm = 2) {
		let c = 0.4;
		let r = 0.1;

		while (true) {
			if (x < c) {
				return r;
			}

			c *= rm;
			r *= cm;

			if (x < c) {
				return r;
			}

			c *= cm;
			r *= rm;
		}
	}

	updateYLabel(text, y) {
		this.yLabelIndex += 1;

		if (this.yLabelIndex >= this.yLabels.length) {
			return false;
		}

		const label = this.yLabels[this.yLabelIndex];

		// if (this.scene.state === 0) {
		//   label.visible = false
		//   return
		// }

		if (label.text !== text) {
			label.text = text;
		}

		if (label.y !== y) {
			label.y = y;
			label.x = 10;
		}

		if (!label.visible) {
			label.visible = true;
		}

		return label;
	}

	drawY() {
		const { yAxis, multiplier, graphWidth, graphHeight } =
			this.crashEngine;
		const payoutSeparation = this.stepValues(!multiplier ? 1 : multiplier);
		const heightIncrement = graphHeight / yAxis;
		// const subTickSpacing = payoutSeparation * heightIncrement;
		// let subTicks = Math.max(
		// 	2,
		// 	Math.min(
		// 		16,
		// 		~~(subTickSpacing / Math.max(3, yAxis / payoutSeparation))
		// 	)
		// );

		// if (subTicks % 2 !== 0) {
		// 	subTicks += 1;
		// }

		this.yLabelIndex = 0;
		this.yGraphics.clear();

		let payout = payoutSeparation;
		let i = 0;

		for (; payout < yAxis; payout += payoutSeparation, i++) {
			this.yGraphics.lineStyle(AxisTickWidth, colors.yAxis, 0.25);

			const x = 0.5;
			const y = graphHeight - payout * heightIncrement;

			this.yGraphics.moveTo(x + this.yTickWidth, y);
			this.yGraphics.lineTo(graphWidth, y);

			const label = this.updateYLabel(`${(payout + 1).toFixed(2)}x`, y);

			if (label && label.style.fontSize !== YAxisLabelFontSize) {
				label.style.fill = colors.yAxis;
				label.style.fontSize = YAxisLabelFontSize;
				label.style.fontWeight = 500;
			}

			if (i > 100) {
				break;
			}
		}

		// if (!this.isMobile) {
		// 	// Draw the last yAxis subticks
		// 	this.drawYSubTicks(
		// 		~~plotWidth + 0.5,
		// 		plotHeight - payout * heightIncrement,
		// 		subTicks,
		// 		subTickSpacing
		// 	);
		// }

		// this.gridGraphics.moveTo(5, plotHeight)
		// this.gridGraphics.lineTo(plotWidth - this.yTickWidth - 5, plotHeight)

		// this.yGraphics.lineStyle(AxisTickWidth, 0xffffff, 0.25);
		// this.yGraphics.moveTo(~~plotWidth + 0.5 - this.yTickWidth, plotHeight);
		// this.yGraphics.lineTo(~~plotWidth + 0.5, plotHeight);

		// Clear any used yLabels
		for (let i = this.yLabelIndex + 1; i < this.yLabels.length; i++) {
			if (this.yLabels[i].visible) {
				this.yLabels[i].visible = false;
			}
		}
	}

	drawLine(
		graphics: PIXI.Graphics,
		fill,
		elapsedStart: number,
		elapsedEnd: number
	) {
		graphics.clear();
		graphics.lineStyle(this.isMobile ? 2 : this.isLarge ? 5 : 3, fill);

		let lastX = null;

		for (let t = elapsedStart, i = 0; t <= elapsedEnd; t += 100, i++) {
			let { x, y } = this.crashEngine.getElapsedPosition(t);

			// smoothly animate the line with the rocket
			if (
				this.rocket.children.length > 0 &&
				this.rocket.children[0].children.length > 0 &&
				this.rocket.children[0].children[0].containsPoint(
					new PIXI.Point(x, y)
				)
			) {
				graphics.lineTo(x, y);
				break;
			}

			if (t === elapsedStart) {
				graphics.moveTo(x, y);
			} else {
				if (i > 20 && lastX !== null && x - lastX < 10) {
					continue;
				}

				graphics.lineTo(x, y);
				lastX = x;
			}
		}
	}
}
