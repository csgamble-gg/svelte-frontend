<script lang="ts">
	import BetBlue from './BetBlue.svelte';
	import BetInput from './BetInput.svelte';
	import BetOrange from './BetOrange.svelte';
	import BetPurple from './BetPurple.svelte';
</script>

<div class="betting-area">
	<BetInput />
	<div class="bet-cards">
		<BetPurple />
		<BetBlue />
		<BetOrange />
	</div>
</div>

<style lang="scss">
	@use '../../../styles/_breakpoints' as *;

	.betting-area {
		display: flex;
		flex-direction: column;
		align-items: center;
		padding: 1vw;
	}

	.bet-cards {
		width: 100%;
		gap: 28px;
		padding: 16px 0 0 0;
		display: grid;
		grid-template-columns: 1fr 1fr 1fr;
		gap: 2.5rem;

		@include break-at('mobile') {
			grid-template-columns: 1fr 1fr;
			gap: 0.25rem;
		}
	}
</style>
