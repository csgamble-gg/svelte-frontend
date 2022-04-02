import ResizeObserver from 'resize-observer-polyfill';

export type ResizeObserverEvent = CustomEvent<{
	width: number;
	height: number;
}>;

export default function resize(node: HTMLDivElement) {
	let timeout: NodeJS.Timeout | null = null;
	const ro = new ResizeObserver((entries) => {
		clearTimeout(timeout);

		const entry = entries[0];

		const { width, height } = entry.contentRect;
		timeout = setTimeout(() => {
			node.dispatchEvent(
				new CustomEvent('resize', {
					detail: {
						width,
						height
					}
				})
			);
		}, 10);
	});

	ro.observe(node);

	return {
		destroy() {
			ro.disconnect();
		}
	};
}
