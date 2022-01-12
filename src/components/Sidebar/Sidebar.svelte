<script>
	import Flex from '../generics/Flex.svelte';
	import SiteLogo from '../../svgs/MainLogo.svg';
	import Divider from '../generics/Divider.svelte';
	import { isOpen } from './Sidebar.context.ts';
	import { tweened } from 'svelte/motion';
	import Box from '../../icons/svgs/Box/Box.svelte';

	const secondRoutes = ['Roulette', 'Jackpot', 'Battles', 'Crash', 'Upgrade'];
	const firstRoutes = ['All Games', 'Bonuses', 'FAQ'];

	const tweenWidth = tweened(208, { duration: 400 });
	const tweenOpacity = tweened(1, { duration: 400 });
	const tweenPadding = tweened(15, { duration: 400 });

	isOpen.subscribe((isOpen) => {
		if (isOpen) {
			tweenWidth.set(208);
			tweenOpacity.set(1);
			tweenPadding.set(31);
		} else {
			tweenWidth.set(0);
			tweenOpacity.set(0);
			tweenPadding.set(0);
		}
	});
</script>

<div
	class="flex flex-col pl-2"
	style="width: {$tweenWidth}px; opacity: {$tweenOpacity};"
>
	<div
		class="w-full bg-cover bg-no-repeat bg-center logo"
		style="background-image: url({SiteLogo});"
	/>
	<div class="mb-1">
		<Divider />
	</div>
	<Flex class="flex-col">
		{#each firstRoutes as route, index}
			<Flex class="mt-5 mb-2">
				<span>
					<Box width="20px" height="20px" />
				</span>
				<a href={route.toLowerCase()} class="ml-4 text-white">{route}</a>
			</Flex>
		{/each}
		<div class="mt-3 mb-1">
			<Divider />
		</div>
		{#each secondRoutes as route}
			<Flex class="mt-5 mb-2">
				<span>
					<Box width="20px" height="20px" />
				</span>
				<a href={route.toLowerCase()} class="ml-4 text-white">{route}</a>
			</Flex>
		{/each}
	</Flex>
</div>

<style>
	.logo {
		height: 91px;
	}
</style>
