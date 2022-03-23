<script lang="ts">
	import { browser } from '$app/env';
	import { Text } from '@csgamble-gg/nebula-ui';
	import { differenceInMilliseconds, parseISO } from 'date-fns';
	import { readable } from 'svelte/store';
	import { fade } from 'svelte/transition';
	import { state } from '../state/game';

	function calculateTimeLeft(date: string, now: string): number {
		return differenceInMilliseconds(parseISO(date), parseISO(now));
	}

	$: timer = readable(0, (set) => {
		if (!$state) return;
		let animationFrame;
		const next = () => {
			set(calculateTimeLeft($state.startsAt, new Date().toISOString()));
			animationFrame = requestAnimationFrame(next);
		};
		if (browser) {
			next();
			return () => cancelAnimationFrame(animationFrame);
		}
	});
</script>

<div class="timer">
	{#if $timer > 0}
		<span transition:fade={{ duration: 200 }}>
			<Text size="3xl">
				{($timer / 1000).toFixed(2)}
			</Text>
		</span>
		<Text variant="subtle" size="sm">until the next round</Text>
	{/if}
</div>

<style lang="scss">
	.timer {
		display: flex;
		flex-direction: column;
		align-items: center;
	}
</style>
