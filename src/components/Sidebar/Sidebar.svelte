<script lang="ts">
	import { sidebarStore } from '$stores/app';
	import SidebarExpanded from './SidebarExpanded.svelte';

	const routes = [
		[
			{ name: 'All Games', route: 'games' },
			{ name: 'Bonuses', route: 'bonus' },
			{ name: 'FAQ', route: 'faq' },
			{ name: 'Provably Fair', route: 'fairness' }
		],
		[
			{ name: 'Roulette', route: 'roulette' },
			{ name: 'Jackpot', route: 'jackpot' },
			{ name: 'Battles', route: 'battles' },
			{ name: 'Crash', route: 'crash' },
			{ name: 'Upgrade', route: 'upgrade' }
		]
	];
</script>

<div>
	{#if $sidebarStore === 'visible'}
		<SidebarExpanded {routes} />
	{:else}
		<div />
	{/if}
</div>
