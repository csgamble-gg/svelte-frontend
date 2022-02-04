<script lang="ts">
	import GameContainer from '$components/GameContainer/GameContainer.svelte';
	import RoundStats from '../Crash/RoundStats/index.svelte';
	import BetInput from './BetInput.svelte';
	import CrashGame from './CrashGame.svelte';
	import GameInfo from './GameInfo.svelte';
	import RecentCrashes from './RecentCrashes.svelte';
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
