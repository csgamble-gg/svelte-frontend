<script>
	import Flex from '../generics/Flex.svelte';
	import SiteLogo from '../../svgs/MainLogo.svg';
	import Divider from '../generics/Divider.svelte';
	import { isOpen } from './Sidebar.context.ts';
	import { tweened } from 'svelte/motion';
	import { backInOut, cubicOut } from 'svelte/easing';
	import Box from '../../icons/svgs/Box/Box.svelte';
	import MediaQuery from '../generics/MediaQuery.svelte';
	import {browser} from "$app/env";

	const secondRoutes = ['Roulette', 'Jackpot', 'Battles', 'Crash', 'Upgrade'];
	const firstRoutes = ['All Games', 'Bonuses', 'FAQ'];

	const tweenWidth = tweened(208, { duration: 400, easing: cubicOut });
	const tweenOpacity = tweened(1, { duration: 400, easing: cubicOut });
	const tweenPadding = tweened(15, { duration: 400, easing: cubicOut });

	isOpen.subscribe((isOpen) => {
		const isMobile = browser ? screen.width < 768 : false
		if (isOpen) {
			tweenWidth.set(isMobile ? 100 : 250);
			tweenOpacity.set(1);
			tweenPadding.set(31);
		} else {
			tweenWidth.set(0);
			tweenOpacity.set(0);
			tweenPadding.set(0);
		}
	});
</script>

<MediaQuery query="(min-width: 768px)" let:matches>
	{#if matches}
		<div class="flex flex-col pl-2" style="width: {$tweenWidth}px; opacity: {$tweenOpacity};">
			<div class="logo-wrapper relative">
				<a
					class="absolute w-full bg-cover bg-no-repeat bg-center logo"
					style="background-image: url({SiteLogo});"
					href="/"
				/>
			</div>
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
	{/if}
</MediaQuery>

<MediaQuery query="(min-width: 425px) and (max-width: 767px)" let:matches>
	{#if matches}
		<div class="flex flex-col pl-2 fixed z-10 h-screen bg-primaryBg" style="width: {$tweenWidth}vw; opacity: {$tweenOpacity};">
			<div class="logo-wrapper relative flex justify-center items-center w-full">
				<a
						class="w-full bg-cover bg-no-repeat bg-center logo-mobile"
						style="background-image: url({SiteLogo});"
						href="/"
				/>
			</div>
			<div class="mb-1">
				<Divider />
			</div>
			<Flex class="flex-col items-center">
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
