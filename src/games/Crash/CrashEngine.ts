interface BaseProps {
	width: number;
	height: number;
}
// TODO: rewrite this, its a mess
export class CrashEngine {
	gameId: string;
	startTime: number;
	elapsedTime: number;
	finalElapsed: number;
	finalMultiplier: number;
	crashPoint: number | null;
	betAmount: number;
	graphWidth: number;
	graphHeight: number;
	plotHeight: number;
	plotWidth: number;
	plotOffsetX: number;
	plotOffsetY: number;
	xAxis: number;
	yAxis: number;
	xIncrement: number;
	yIncrement: number;
	xAxisMinimum: number;
	yAxisMinimum: number;
	elapsedOffset: number;
	yAxisMultiplier: number;
	lastGameTick: number | null;
	tickTimeout: number | null;
	lag: boolean;
	lagTimeout: null;
	multiplier: number;

	static CrashSpeed = 0.00006;
	static PredictingLapse = 300;

	static getMultiplierElapsed(multiplier: number) {
		return (
			Math.ceil(
				Math.log(multiplier) /
					Math.log(Math.E) /
					CrashEngine.CrashSpeed /
					100
			) * 100
		);
	}

	static getElapsedPayout(elapsed: number) {
		const payout =
			~~(100 * Math.E ** (CrashEngine.CrashSpeed * elapsed)) / 100;

		if (!Number.isFinite(payout)) {
			throw new Error('Infinite payout');
		}

		return Math.max(payout, 1);
	}

	constructor(baseProps: BaseProps) {
		this.gameId = null;
		this.startTime = 0;
		this.elapsedTime = 0;
		this.finalElapsed = 0;
		this.finalMultiplier = 0;
		this.crashPoint = null;
		this.betAmount = 0;

		this.graphWidth = baseProps.width;
		this.graphHeight = baseProps.height;

		this.plotWidth = 0;
		this.plotHeight = 0;

		this.plotOffsetX = 100;
		this.plotOffsetY = 100;

		this.xAxis = 0;
		this.yAxis = 0;

		this.xIncrement = 0;
		this.yIncrement = 0;

		this.xAxisMinimum = 1000;
		this.yAxisMinimum = 1;
		this.elapsedOffset = 0;

		this.yAxisMultiplier = 1;

		this.lastGameTick = null;
		this.tickTimeout = null;

		this.lag = false;
		this.lastGameTick = null;
		this.lagTimeout = null;
		this.multiplier = 1;
	}

	onGameTick = (elapsed: number) => {
		this.lastGameTick = Date.now();

		const latency = this.lastGameTick - elapsed;

		if (this.startTime > latency) {
			this.startTime = latency;
		}
	};

	tick = () => {
		this.elapsedTime = this.getElapsedTime();
		this.multiplier = CrashEngine.getElapsedPayout(this.elapsedTime);

		this.yAxisMinimum = this.yAxisMultiplier;
		this.yAxis = this.yAxisMinimum;
		this.xAxis = Math.max(
			this.elapsedTime + this.elapsedOffset,
			this.xAxisMinimum
		);

		if (this.multiplier > this.yAxisMinimum) {
			this.yAxis = this.multiplier;
		}

		this.xIncrement = this.plotWidth / this.xAxis;
		this.yIncrement = this.plotHeight / this.yAxis;
	};

	clearTickTimeouts = () => {
		clearTimeout(this.tickTimeout);
	};

	destroy = () => {
		this.clearTickTimeouts();
	};

	getElapsedTime = () => {
		return Date.now() - this.startTime;
	};

	getElapsedPosition = (elapsedTime: number) => {
		const payout = CrashEngine.getElapsedPayout(elapsedTime) - 1;
		const x = elapsedTime * this.xIncrement;
		const y = this.plotHeight - payout * this.yIncrement;

		return { x, y };
	};

	getYMultiplier = (y: number) => {
		return (
			Math.ceil(
				(1 + (this.yAxis - (y / this.plotHeight) * this.yAxis)) * 1000
			) / 1000
		);
	};

	getMultiplierY(multiplier: number) {
		return this.plotHeight - (multiplier - 1) * this.yIncrement;
	}

	onResize(width: number, height: number) {
		this.graphWidth = width;
		this.graphHeight = height;

		this.plotOffsetX = 50;
		this.plotOffsetY = 40;

		this.plotWidth = width - this.plotOffsetX;
		this.plotHeight = height - this.plotOffsetY;
	}
}
