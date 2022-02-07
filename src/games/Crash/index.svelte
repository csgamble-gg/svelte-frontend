<script lang="ts">
	import GameContainer from '$components/GameContainer/GameContainer.svelte';
	import {
		getGeneralContext,
		setConfigContext,
		setup
	} from '$games/state/setup';
	import { onMount } from 'svelte';
	import RoundStats from '../Crash/RoundStats/index.svelte';
	import BetInput from './BetInput.svelte';
	import { config } from './config';
	import CrashGame from './CrashGame.svelte';
	import GameInfo from './GameInfo.svelte';
	import RecentCrashes from './RecentCrashes.svelte';
	import { initialize } from './subscriptionHandler';

	onMount(() => {
		let { unsubscribe } = initialize();

		return () => unsubscribe();
	});

	setConfigContext(config);

	setup({
		generalContext: {
			...getGeneralContext,
			send: () => {}
		}
	});
</script>

<GameContainer title="Crash">
	<div slot="header-content">
		<RecentCrashes />
	</div>
	<div class="flex flex-row gap-9">
		<div class="">
			<RoundStats />
		</div>
		<div class="col-span-2 flex flex-col w-full">
			<GameInfo />
			<CrashGame />
			<BetInput />
		</div>
	</div>
</GameContainer>
