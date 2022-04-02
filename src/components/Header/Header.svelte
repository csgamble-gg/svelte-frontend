<script lang="ts">
	import Caret from '$icons/svgs/Caret/Caret.svelte';
	import { sidebarStore } from '$stores/app';
	import { mobileView } from '$stores/window';
	import { cubicOut } from 'svelte/easing';
	import { spring } from 'svelte/motion';
	import { fly } from 'svelte/transition';
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

<nav>
	<div class="header">
		<div class="header-content">
			<div class="wrapper">
				<div class="toggle-logo">
					{#if !$mobileView}
						<button
							class="icon-button"
							on:click={() => handleClick()}
							style="transform: rotate({$rotation}deg);"
						>
							<Caret />
						</button>
					{/if}
					{#if $mobileView}
						<a
							class="small-logo"
							style="background-image: url({SiteLogoSmall});"
							href="/"
							in:fly={{ x: -400, duration: 400, easing: cubicOut }}
							out:fly={{ x: -400, duration: 400, easing: cubicOut }}
							><span /></a
						>
					{:else if $sidebarStore === 'hidden'}
						<a
							class="small-logo"
							style="background-image: url({SiteLogoSmall});"
							href="/"
							in:fly={{ x: -400, duration: 400, easing: cubicOut }}
							out:fly={{ x: -400, duration: 400, easing: cubicOut }}
							><span /></a
						>
					{/if}
				</div>
				<UserInfo />
			</div>
			<Divider />
		</div>
	</div>
</nav>

<style lang="scss">
	.header {
		height: 91px;
		width: 100%;
		display: flex;
		align-items: center;
		justify-content: space-between;
	}

	.header-content {
		width: 100%;
		display: flex;
		flex-direction: column;
		padding: 0 1vw;
	}

	.wrapper {
		display: flex;
		flex-direction: row;
		align-items: center;
		justify-content: space-between;
		height: 91px;
	}

	.icon-button {
		border-radius: 16px;
		background-color: var(--variant-alt-grey-color);
		border: none;
		width: 32px;
		height: 32px;
	}

	.logo-wrapper {
		position: relative;
		width: 208px;
	}

	.toggle-logo {
		display: flex;
		align-items: center;
		gap: 10px;
	}

	.logo {
		position: relative;
		left: 10px;
		top: 5px;
		z-index: 0;
	}

	.small-logo {
		width: 100%;
		background-size: cover;
		background-repeat: no-repeat;
		height: 50px;
		width: 50px;
		left: 60px;
		z-index: 0;
	}
</style>
