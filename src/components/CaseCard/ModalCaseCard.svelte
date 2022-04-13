<script lang="ts">
	import type { Case } from '$generated/graphql';
	import { ButtonBase, Card, Text } from '@csgamble-gg/nebula-ui';
	import { writable } from 'svelte/store';

	export let box: Pick<Case, 'image' | 'name' | 'price'>;
	export let selected: boolean = false;

	const hovered = writable<boolean>(false);
</script>

<div
	class="case-wrapper"
	role="button"
	on:mouseenter={() => hovered.set(true)}
	on:mouseleave={() => hovered.set(false)}
	on:click
>
	<Card variant="gradient" fullWidth>
		<div class="case">
			<img
				src={box.image}
				alt="case"
				class="image"
				class:hovered={$hovered}
			/>
			<Text variant="subtle" tag="span" weight="semibold">{box.name}</Text>
		</div>
		<div class="button">
			<ButtonBase variant={selected ? 'secondary' : 'overlay'}>
				<div class="price">
					{#if selected}
						<Text weight="semibold" align="center">Remove Case</Text>
					{:else if $hovered}
						<Text weight="semibold" align="center">Add Case</Text>
					{:else}
						<Text variant="lime">Price</Text>
						<Text weight="semibold">{box.price}</Text>
					{/if}
				</div>
			</ButtonBase>
		</div>
	</Card>
</div>

<style lang="scss">
	.case-wrapper {
		cursor: pointer;
		position: relative;
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

	.button {
		position: relative;
		bottom: 17px;
		width: 100%;
		display: flex;
		align-items: center;
		justify-content: center;
	}

	.image {
		transition: 0.1s ease-in-out;
		width: 100%;

		&.hovered {
			transform: translate3d(0, -7px, 0);
		}
	}
</style>
