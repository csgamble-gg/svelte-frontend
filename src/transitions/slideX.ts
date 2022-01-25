import { cubicOut } from 'svelte/easing';
import type { TransitionConfig } from 'svelte/transition';

type EasingFunction = (t: number) => number;

type From = 'left' | 'right';

interface SlideParams {
	delay?: number;
	duration?: number;
	easing?: EasingFunction;
	skip?: boolean;
	from: From;
}

export function slideRight(
	node: Element,
	{
		delay = 0,
		duration = 250,
		easing = cubicOut,
		skip = false
	}: SlideParams
): TransitionConfig {
	const style = getComputedStyle(node);
	const opacity = +style.opacity;
	const width = parseFloat(style.width);
	const padding_left = parseFloat(style.paddingLeft);
	const padding_right = parseFloat(style.paddingRight);
	const margin_left = parseFloat(style.marginLeft);
	const margin_right = parseFloat(style.marginRight);
	const border_left_width = parseFloat(style.borderLeftWidth);
	const border_right_width = parseFloat(style.borderRightWidth);

	return {
		delay,
		duration,
		easing,
		css: (t) =>
			skip
				? `transform: translateX(${(1 - t) * 100}%);`
				: `overflow: hidden;` +
				  `opacity: ${Math.min(t * 20, 1) * opacity};` +
				  `width: ${width}px;` +
				  `padding-left: ${padding_left}px;` +
				  `padding-right: ${padding_right}px;` +
				  `margin-left: ${margin_left}px;` +
				  `margin-right: ${margin_right - (1 - t) * width}px;` +
				  `border-left-width: ${border_left_width}px;` +
				  `border-right-width: ${border_right_width}px;`
	};
}

export function slideLeft(
	node: Element,
	{
		delay = 0,
		duration = 250,
		easing = cubicOut,
		skip = false
	}: SlideParams
): TransitionConfig {
	const style = getComputedStyle(node);
	const opacity = +style.opacity;
	const width = parseFloat(style.width);
	const padding_left = parseFloat(style.paddingLeft);
	const padding_right = parseFloat(style.paddingRight);
	const margin_left = parseFloat(style.marginLeft);
	const margin_right = parseFloat(style.marginRight);
	const border_left_width = parseFloat(style.borderLeftWidth);
	const border_right_width = parseFloat(style.borderRightWidth);

	return {
		delay,
		duration,
		easing,
		css: (t) =>
			skip
				? `transform: translateX(-${(1 - t) * 100}%);`
				: `overflow: hidden;` +
				  `opacity: ${Math.min(t * 20, 1) * opacity};` +
				  `width: ${width}px;` +
				  `padding-left: ${padding_left}px;` +
				  `padding-right: ${padding_right}px;` +
				  `margin-left: ${margin_left - (1 - t) * width}px;` +
				  `margin-right: ${margin_right}px;` +
				  `border-left-width: ${border_left_width}px;` +
				  `border-right-width: ${border_right_width}px;`
	};
}
