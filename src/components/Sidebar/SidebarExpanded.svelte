<script lang="ts">
	import MainLogo from '$icons/svgs/MainLogo/MainLogo.svelte';
	import { mobileView, sideBarSize } from '$stores/window';
	import { sizes } from '$styles/variables';
	import { Link } from '@csgamble-gg/nebula-ui';
	import BoxIcon from '../../icons/svgs/Box/Box.svelte';
	import { slideLeft } from '../../transitions/slideX';
	import Divider from '../generics/Divider.svelte';

	type Route = { route: string; name: string };
	export let routes: Array<Array<Route>>;

	// const handleClick = () => {
	// 	if ($mobileView) {
	// 		sidebarStore.toggle();
	// 	}
	// };
</script>

<div
	transition:slideLeft|local={{
		from: 'right',
		duration: 400,
		skip: false
	}}
	class="sidebar {$sideBarSize}"
	style="--width: {sizes.sidebarWidth}"
>
	<div>
		{#if !$mobileView}
			<div class="logo-wrapper">
				<MainLogo />
			</div>
		{/if}
		<Divider />
		<div>
			<div class="link-group">
				{#each routes[0] as route}
					<div class="link">
						<BoxIcon width="20px" height="20px" />
						<Link href={route.route}>{route.name}</Link>
					</div>
				{/each}
			</div>
			<Divider />
			<div class="link-group">
				{#each routes[1] as route}
					<div class="link">
						<BoxIcon width="20px" height="20px" />
						<Link href={route.route}>{route.name}</Link>
					</div>
				{/each}
			</div>
		</div>
	</div>
</div>

<style lang="scss">
	.sidebar {
		position: relative;
		width: auto;
		height: 100%;
		padding: 0 0 0 15px;
		background: var(--variant-grey-color);

		&.normal {
			width: var(--width);
		}

		&.full {
			position: fixed;
			inset: 0;
			width: 100%;
			top: var(--header-height);
			z-index: 100;
		}
	}

	.logo {
		height: 91px;
		width: 210px;
	}

	.logo-wrapper {
		height: 91px;
		display: flex;
		align-items: center;
	}

	.link-group {
		margin: 13.5px 0 13.5px 0;
	}

	.link {
		padding: 13px 5px;
		display: flex;
		align-items: center;
		gap: 22px;
	}
</style>
