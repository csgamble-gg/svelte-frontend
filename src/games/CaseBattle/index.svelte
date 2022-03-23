<script lang="ts">
	import GameContainer from '$components/GameContainer/GameContainer.svelte';
	import BattleRound from './BattleRound.svelte';
</script>

<GameContainer title="Case Battle">
	<div slot="header-content">
		<button class="create-battle"> Create Battle </button>
	</div>
	<div class="flex flex-col h-full gap-y-4">
		{#each [0, 1, 2] as round}
			<BattleRound />
		{/each}
	</div>
</GameContainer>

<style>
	.create-battle {
		background: linear-gradient(
			321.77deg,
			#ffeb71 -4.42%,
			#eac76c 50.67%,
			rgba(218, 194, 94, 0.69) 102.42%
		);
		box-shadow: inset 0px 1px 0px rgba(255, 255, 255, 0.25);
		border-radius: 6px;
		color: white;
		padding: 5px;
		font-size: 16px;
		line-height: 26px;
		font-weight: 600;
		height: 45px;
		width: 125px;
		margin-left: 24px;
	}
</style>
