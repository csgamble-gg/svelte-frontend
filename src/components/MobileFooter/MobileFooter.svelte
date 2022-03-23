<script lang="ts">
	import { goto } from '$app/navigation';
	import Menu from '$icons/svgs/MobileFooter/Menu.svelte';
	import { sidebarStore } from '$stores/app';
	import { sizes } from '$styles/variables';
	import { Text } from '@csgamble-gg/nebula-ui';
</script>

<div
	class="footer"
	style="--mobile-footer-height: {sizes.mobileFooterHeight}"
>
	<button on:click={() => sidebarStore.toggle()}>
		<div class="content">
			<Menu />
			<Text size="sm" weight="semibold">Menu</Text>
		</div>
	</button>

	<button on:click={() => goto('/unboxing/cases')}>
		<div class="content">
			<Menu />
			<Text size="sm" weight="semibold">Unboxing</Text>
		</div>
	</button>

	<button>
		<div class="content">
			<Menu />
			<Text size="sm" weight="semibold">Chat</Text>
		</div>
	</button>

	<button>
		<div class="content">
			<Menu />
			<Text size="sm" weight="semibold">Crash</Text>
		</div>
	</button>

	<button>
		<div class="content">
			<Menu />
			<Text size="sm" weight="semibold">Battles</Text>
		</div>
	</button>
</div>

<style lang="scss">
	.footer {
		display: grid;
		width: 100%;
		line-height: 1;
		background: var(--variant-buttonOverlay-color);
		box-shadow: 0 5px 6px rgba(0, 0, 0, 1);
		height: var(--mobile-footer-height);
		grid-template-columns: repeat(5, 1fr);
		overflow: hidden;
		z-index: 999;

		.content {
			display: grid;
			grid-auto-flow: row;
			place-items: center;
			width: 100%;
			gap: 0.25rem;
			position: relative;
		}

		button {
			border: none;
			background: transparent;
		}
	}
</style>
