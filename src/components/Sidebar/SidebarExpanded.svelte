<script lang="ts">
	import Box from '../../icons/svgs/Box/Box.svelte';
	import SiteLogo from '../../svgs/MainLogo.svg';
	import { slideLeft } from '../../transitions/slideX';
	import Divider from '../generics/Divider.svelte';

	type Route = { route: string; name: string };
	export let routes: Array<Array<Route>>;
</script>

<div
	class="flex flex-col pl-2 relative h-full w-[208px]"
	transition:slideLeft|local={{
		from: 'right',
		duration: 400,
		skip: false
	}}
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
		{#each routes[0] as route}
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
		{#each routes[1] as route}
			<div class="flex mt-5 mb-2">
				<span>
					<Box width="20px" height="20px" />
				</span>
				<a href={route.route} class="ml-4 text-white">{route.name}</a>
			</div>
		{/each}
	</div>
</div>

<!-- <MediaQuery query="(max-width: 767px)" let:matches>
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
</MediaQuery> -->
<style>
	.logo {
		height: 91px;
		width: 210px;
	}
	.logo-wrapper {
		height: 91px;
	}
	.logo-mobile {
		height: 91px;
		width: 300px;
	}
</style>
