<script lang="ts">
	import { differenceInMilliseconds, parseISO } from 'date-fns';
	import { rouletteContext } from '../state/game';
	import { readable, writable } from 'svelte/store';
	import { fade } from 'svelte/transition';
	import { browser } from '$app/env';

	function calculateTimeLeft(date: string, now: string): number {
		return differenceInMilliseconds(parseISO(date), parseISO(now));
	}

	$: timer = readable(0, (set) => {
		if (!$rouletteContext.game) return;
		let animationFrame;
		const next = () => {
			set(
				calculateTimeLeft(
					$rouletteContext.game.startsAt,
					new Date().toISOString()
				)
			);
			animationFrame = requestAnimationFrame(next);
		};
		if (browser) {
			next();
			return () => cancelAnimationFrame(animationFrame);
		}
	});
</script>

<div class="flex flex-col align-center items-center">
	{#if $timer > 0}
		<span class="text-4xl text-white" transition:fade={{ duration: 200 }}>
			{($timer / 1000).toFixed(2)}
		</span>
		<span class="text-lightblue mt-2">until the next round</span>
	{/if}
</div>
