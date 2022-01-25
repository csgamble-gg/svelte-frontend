<script lang="ts">
	import { sidebarStore } from '$stores/app';
	import { cubicOut } from 'svelte/easing';
	import { spring } from 'svelte/motion';
	import { fly } from 'svelte/transition';
	import Caret from '../../icons/svgs/Caret/Caret.svelte';
	import SiteLogo from '../../svgs/MainLogo.svg';
	import SiteLogoSmall from '../../svgs/MainLogoSmall.svg';
	import Divider from '../generics/Divider.svelte';
	import UserInfo from './UserInfo.svelte';

	const defaultRotation = $sidebarStore === 'visible' ? 0 : 180;
	const rotation = spring(defaultRotation);

	sidebarStore.subscribe((val) => {
		rotation.update(() => (val === 'visible' ? 0 : 180));
	});

	function handleClick() {
		sidebarStore.toggle();
	}
</script>

<div>
	<div
		class="header flex flex-row items-center justify-between px-3 sm:px-6 relative"
	>
		<button
			class="rounded-full w-8 h-8 bg-foreground flex items-center justify-center z-10"
			on:click={handleClick}
			style="transform: rotate({$rotation}deg);"
		>
			<Caret width="8px" height="10px" />
		</button>
		{#if $sidebarStore === 'hidden'}
			<a
				class="absolute w-full bg-cover bg-no-repeat bg-center logo hidden sm:block"
				style="background-image: url({SiteLogo});"
				href="/"
				in:fly={{ x: -400, duration: 400, easing: cubicOut }}
				out:fly={{ x: -400, duration: 400, easing: cubicOut }}
			/>
			<a
				class="absolute w-full bg-cover bg-no-repeat bg-center visible sm:hidden small-logo"
				style="background-image: url({SiteLogoSmall});"
				href="/"
				in:fly={{ x: -400, duration: 400, easing: cubicOut }}
				out:fly={{ x: -400, duration: 400, easing: cubicOut }}
			/>
		{/if}
		<UserInfo />
	</div>
	<Divider />
</div>

<style>
	.header {
		height: 91px;
	}

	.logo {
		height: 91px;
		width: 210px;
		left: 40px;
		z-index: 0;
	}

	.small-logo {
		height: 50px;
		width: 50px;
		left: 60px;
		z-index: 0;
	}
</style>
