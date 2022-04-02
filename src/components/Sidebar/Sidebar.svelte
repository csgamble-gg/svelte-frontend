<script lang="ts">
	import { sidebarStore } from '$stores/app';
	import SidebarExpanded from './SidebarExpanded.svelte';

	const routes = [
		[
			{ name: 'All Games', route: '/' },
			// { name: 'Bonuses', route: '/bonus' },
			{ name: 'FAQ', route: '/faq' },
			{ name: 'Provably Fair', route: '/fairness' }
		],
		[
			{ name: 'Unboxing', route: '/unboxing/cases' },
			{ name: 'Roulette', route: '/roulette' },
			{ name: 'Jackpot', route: '/jackpot' },
			{ name: 'Battle', route: '/battle' },
			{ name: 'Crash', route: '/crash' },
			{ name: 'Upgrade', route: '/upgrade' }
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
