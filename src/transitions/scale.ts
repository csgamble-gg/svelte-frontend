import { cubicOut } from 'svelte/easing';
import type { TransitionConfig } from 'svelte/transition';

export function scale(
	node: Element,
	{ delay = 0, duration = 250, easing = cubicOut, active = false }
): TransitionConfig {
	return {
		delay,
		duration,
		easing,
		css: (t) => {
			const eased = easing(t);

			return `transform: scale(${eased});`;
		}
	};
}
