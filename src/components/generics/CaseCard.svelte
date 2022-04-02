<script lang="ts">
	import { goto } from '$app/navigation';
	import type { Case } from '$generated/graphql';
	import { convertPenniesToDollars } from '$libs/currencyConversion';
	import { ButtonBase, Card, Text } from '@csgamble-gg/nebula-ui';
	import { writable } from 'svelte/store';

	export let box: Case;

	function handleClick() {
		goto('/unboxing/' + box.slug);
	}

	const hovered = writable<boolean>(false);
</script>

<div
	class="case-wrapper"
	role="button"
	on:mouseenter={() => hovered.set(true)}
	on:mouseleave={() => hovered.set(false)}
	on:click={handleClick}
>
	<Card variant="gradient" fullWidth>
		<div class="case">
			<img
				src={box.image}
				alt="case"
				width="165px"
				height="165px"
				class="image"
				class:hovered={$hovered}
			/>
			<Text variant="subtle" tag="span" weight="semibold">{box.name}</Text>
		</div>
		<ButtonBase fullWidth variant="overlay">
			<div class="price">
				{#if $hovered}
					<Text weight="semibold" align="center">Open Case</Text>
				{:else}
					<Text variant="lime">Price</Text>
					<Text weight="semibold"
						>{convertPenniesToDollars(box.price)}</Text
					>
				{/if}
			</div>
		</ButtonBase>
	</Card>
</div>

<style lang="scss">
	.case-wrapper {
	}

	.case {
		display: flex;
		flex-direction: column;
		align-items: center;
		padding: 0 22px 23px 22px;
	}

	.price {
		display: inline;
	}

	.image {
		width: 165px;
		height: 165px;
		transition: 0.1s ease-in-out;

		&.hovered {
			transform: translate3d(0, -7px, 0);
		}
	}
</style>
