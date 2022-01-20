<script>
	import Flex from '../generics/Flex.svelte';
	import SiteLogo from '../../svgs/MainLogo.svg';
	import Divider from '../generics/Divider.svelte';
	import { isOpen } from './Sidebar.context';
	import { tweened } from 'svelte/motion';
	import { backInOut, cubicOut } from 'svelte/easing';
	import Box from '../../icons/svgs/Box/Box.svelte';
	import MediaQuery from '../generics/MediaQuery.svelte';
	import { browser } from '$app/env';

	const secondRoutes = [
		{ name: 'Roulette', route: 'roulette' },
		{ name: 'Jackpot', route: 'jackpot' },
		{ name: 'Battles', route: 'battles' },
		{ name: 'Crash', route: 'crash' },
		{ name: 'Upgrade', route: 'upgrade' }
	];
	const firstRoutes = [
		{ name: 'All Games', route: 'games' },
		{ name: 'Bonuses', route: 'bonus' },
		{ name: 'FAQ', route: 'faq' },
		{ name: 'Provably Fair', route: 'fairness' }
	];

	const tweenWidth = tweened(0, { duration: 400, easing: cubicOut });
	const tweenOpacity = tweened(1, { duration: 400, easing: cubicOut });
	const tweenPadding = tweened(15, { duration: 400, easing: cubicOut });

	isOpen.subscribe((isOpen) => {
		const isMobile = browser ? screen.width < 768 : false;
		if (isOpen) {
			tweenWidth.update(() => (isMobile ? 100 : 250));
			tweenOpacity.update(() => 1);
			tweenPadding.update(() => 31);
		} else {
			tweenWidth.update(() => 0);
			tweenOpacity.update(() => 0);
			tweenPadding.update(() => 0);
		}
	});

	const handlePressRoute = () => {};
</script>

<MediaQuery query="(min-width: 768px)" let:matches>
	{#if matches}
		<div
			class="flex flex-col pl-2"
			style="width: {$tweenWidth}px; opacity: {$tweenOpacity}"
		>
			<div class="logo-wrapper relative">
				<a
					class="absolute w-full bg-cover bg-no-repeat bg-center logo"
					style="background-image: url({SiteLogo});"
					href="/"><span /></a
				>
			</div>
			<div class="mb-1">
				<Divider />
			</div>
			<div class="flex flex-col items-start justify-start">
				{#each firstRoutes as route}
					<div class="flex mt-5 mb-2">
						<span>
							<Box width="20px" height="20px" />
						</span>
						<a href={route.route} class="ml-4 text-white">{route.name}</a>
					</div>
				{/each}
				<div class="mt-3 mb-1">
					<Divider />
				</div>
				{#each secondRoutes as route}
					<div class="flex mt-5 mb-2">
						<span>
							<Box width="20px" height="20px" />
						</span>
						<a href={route.route} class="ml-4 text-white">{route.name}</a>
					</div>
				{/each}
			</div>
		</div>
	{/if}
</MediaQuery>

<MediaQuery query="(max-width: 767px)" let:matches>
	{#if matches}
		<div
			class="flex flex-col pl-2 fixed z-10 h-screen bg-primaryBg"
			style="width: {$tweenWidth}vw; opacity: {$tweenOpacity};"
		>
			<div
				class="logo-wrapper relative flex justify-center items-center w-full"
			>
				<a
					class="w-full bg-cover bg-no-repeat bg-center logo-mobile"
					style="background-image: url({SiteLogo});"
					href="/"><span /></a
				>
			</div>
			<div class="mb-1">
				<Divider />
			</div>
			<div class="flex-col items-center justify-center">
				{#each firstRoutes as route, index}
					<div class="flex items-start mt-5 mb-2 justify-center">
						<span>
							<Box width="20px" height="20px" />
						</span>
						<a href={route.route} class="ml-4 text-white">{route.name}</a>
					</div>
				{/each}
				<div class="mt-3 mb-1">
					<Divider />
				</div>
				{#each secondRoutes as route}
					<div class="flex mt-5 mb-2 justify-center">
						<span>
							<Box width="20px" height="20px" />
						</span>
						<a href={route.route} class="ml-4 text-white">{route.name}</a>
					</div>
				{/each}
			</div>
		</div>
	{/if}
</MediaQuery>

<style>
	.logo {
		height: 91px;
		width: 210px;
		right: 5px;
	}
	.logo-wrapper {
		height: 91px;
	}
	.logo-mobile {
		height: 91px;
		width: 300px;
	}
</style>
