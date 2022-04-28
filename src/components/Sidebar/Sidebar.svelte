<script lang="ts">
	import { sidebarStore } from '$stores/app';
	import SidebarExpanded from './SidebarExpanded.svelte';
	import {
		BoxesIcon,
		CategoryIcon,
		DocumentIcon,
		ShieldIcon,
		CaseIcon,
		WheelIcon,
		TicketIcon,
		ShootingStarIcon,
		TradeIcon
	} from '@csgamble-gg/nebula-ui';

	const routes = [
		[
			{ name: 'All Games', route: '/', icon: CategoryIcon },
			// { name: 'Bonuses', route: '/bonus' },
			{ name: 'FAQ', route: '/faq', icon: DocumentIcon },
			{ name: 'Provably Fair', route: '/fairness', icon: ShieldIcon }
		],
		[
			{ name: 'Unboxing', route: '/unboxing/cases', icon: CaseIcon },
			{ name: 'Roulette', route: '/roulette', icon: WheelIcon },
			{ name: 'Jackpot', route: '/jackpot', icon: TicketIcon },
			{ name: 'Battle', route: '/battle', icon: BoxesIcon },
			{ name: 'Crash', route: '/crash', icon: ShootingStarIcon },
			{ name: 'Upgrade', route: '/upgrade', icon: TradeIcon }
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
