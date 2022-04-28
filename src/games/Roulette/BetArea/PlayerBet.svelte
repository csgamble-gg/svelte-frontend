<script lang="ts">
	import type { Bet } from '$generated/graphql';
	import { convertPenniesToDollars } from '$libs/currencyConversion';
	import { Avatar, CryptoIcon, Text } from '@csgamble-gg/nebula-ui';
	import { quintInOut } from 'svelte/easing';
	import { slide } from 'svelte/transition';
	export let bet: Bet;
</script>

<div class="player-bet" transition:slide={{ easing: quintInOut }}>
	<div class="start-content">
		<Avatar image={bet.user.avatar} />
		<Text weight="semibold" size="md">{bet.user.displayName}</Text>
	</div>
	<div class="end-content">
		<CryptoIcon type={bet.currency} />
		<Text weight="medium">{convertPenniesToDollars(bet.amount, 2)}</Text>
	</div>
</div>

<style lang="scss">
	.player-bet {
		display: flex;
		align-items: center;
	}
	.start-content {
		display: flex;
		align-items: center;
		gap: 15px;
	}
	.end-content {
		display: flex;
		align-items: center;
		margin-left: auto;
		gap: 17px;
	}
</style>
