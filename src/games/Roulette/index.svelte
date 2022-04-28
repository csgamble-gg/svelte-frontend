<script lang="ts">
	import GameContainer from '$components/GameContainer/GameContainer.svelte';
	import { setConfigContext, setup } from '$games/state/setup';
	import { mobileView } from '$stores/window';
	import { onMount } from 'svelte';
	import BettingArea from './BetArea/BettingArea.svelte';
	import { config } from './config';
	import { service } from './machine/index';
	import RecentRolls from './RecentRolls.svelte';
	import * as general from './state/general';
	import { initialize } from './subscriptionHandler';
	import Wheel from './Wheel/Wheel.svelte';

	onMount(() => {
		let { unsubscribe } = initialize();

		return () => unsubscribe();
	});

	setConfigContext(config);

	setup({
		generalContext: {
			...general,
			send: service.send
		}
	});
</script>

<GameContainer title="Roulette" padding={false}>
	{#if !$mobileView}
		<RecentRolls />
	{/if}
	<Wheel />
	<BettingArea />
</GameContainer>
