<script lang="ts">
	import {
		UserInventoryDocument,
		UserInventoryQuery,
		UserInventoryQueryVariables
	} from '$generated/graphql';
	import { createQuery } from '$libs/urql/urqlClient';
	import { SkinQualityEnum } from '$types/';
	import { clickOutside } from '$utils/clickOutside';
	import {
		Backpack,
		Button,
		ButtonBase,
		Exit,
		Radio,
		Text
	} from '@csgamble-gg/nebula-ui';
	import type { Instance as Popper } from '@popperjs/core';
	import { createPopper } from '@popperjs/core';
	import { onDestroy, onMount } from 'svelte';
	import { get, writable } from 'svelte/store';
	import { fade, slide } from 'svelte/transition';

	let isDropdownVisible = false;
	let dropdownButton: HTMLButtonElement;
	let popper: Popper;
	let dropdown: HTMLDivElement;

	onMount(() => {
		popper = createPopper(dropdownButton, dropdown, {
			placement: 'bottom',
			strategy: 'fixed',
			modifiers: [
				{
					name: 'offset',
					options: {
						offset: [-0, 11]
					}
				}
			]
		});

		return () => popper.destroy();
	});

	onDestroy(() => {
		if (popper) popper.destroy();
	});

	const toggleDropdown = () => {
		if (isDropdownVisible) {
			dropdown.removeAttribute('data-show');
			isDropdownVisible = false;
		} else {
			dropdown.setAttribute('data-show', '');
			popper.update();
			isDropdownVisible = true;
		}
	};

	const { query } = createQuery<
		UserInventoryQuery,
		UserInventoryQueryVariables
	>(UserInventoryDocument);

	const { data, loading } = query({ input: { limit: 4 } });

	const checkedItems = writable<Array<number>>([]);

	const handleCheckItem = (index: number) => {
		const items = get(checkedItems);
		if (items.includes(index)) {
			checkedItems.set(items.filter((item) => item !== index));
		} else {
			checkedItems.set([...items, index]);
		}
	};

	const checkAll = () => {
		checkedItems.set([0, 1, 2, 3]);
	};

	const uncheckAll = () => {
		checkedItems.set([]);
	};
</script>

{#if isDropdownVisible}
	<div class="overlay" in:fade={{ duration: 233 }} />
{/if}

<button
	class="inventory"
	bind:this={dropdownButton}
	on:click={toggleDropdown}
>
	<Backpack />
</button>
<div bind:this={dropdown} role="tooltip" class="dropdown">
	{#if isDropdownVisible}
		<div class="content" use:clickOutside on:clickOutside={toggleDropdown}>
			<div class="header">
				<Text tag="h3">Inventory</Text>
				<div class="close-button" role="button" on:click={toggleDropdown}>
					<Exit />
				</div>
			</div>
			<div class="buttons">
				<ButtonBase variant="overlay" fullWidth on:click={checkAll}>
					<Text variant="subtle" size="sm" weight="medium">Select All</Text
					>
				</ButtonBase>
				<ButtonBase variant="overlay" fullWidth on:click={uncheckAll}>
					<Text variant="subtle" size="sm" weight="medium"
						>Deselect All</Text
					>
				</ButtonBase>
			</div>
			<div class="inventory-list">
				{#if $loading}
					<div />
				{:else if $data}
					{#each $data.userInventory as item, index}
						{@const isChecked = $checkedItems.includes(index)}
						<div
							class="item"
							role="button"
							on:click={() => handleCheckItem(index)}
						>
							<img
								src={item.iconUrl}
								width="71px"
								height="54px"
								alt="skin"
							/>
							<div>
								<div>
									<Text size="md" weight="semibold">{item.name}</Text>
									<Text variant="subtle" size="sm" weight="medium"
										>{SkinQualityEnum[item.quality]}</Text
									>
								</div>
								<Text size="md" variant="subtle">{item.price}</Text>
							</div>
							<div class="checkbox">
								<Radio checked={isChecked} />
							</div>
						</div>
					{/each}
				{/if}
			</div>
			<div class="full-inventory" role="button">
				<Text size="md" weight="semibold" align="left"
					>View full inventory</Text
				>
			</div>
			{#if $checkedItems.length > 0}
				<div class="actions" transition:slide={{ duration: 200 }}>
					<div class="buttons">
						<Button
							label={`Sell ${$checkedItems.length} items`}
							fullWidth
						/>
						<Button
							label={`Upgrade ${$checkedItems.length} items`}
							fullWidth
							variant="secondary"
						/>
					</div>
				</div>
			{/if}
		</div>
	{/if}
</div>

<style lang="scss">
	@use '../../styles/_breakpoints' as *;

	.overlay {
		position: absolute;
		inset: 0;
		background-color: rgba(0, 0, 0, 0.1);
		z-index: 99;
	}

	.header {
		display: flex;
		align-items: center;
		justify-content: space-between;

		.close-button {
			width: 25px;
			height: 25px;
		}
	}
	.inventory {
		position: relative;
		cursor: pointer;
		width: 40px;
		height: 40px;
		border: none;
		border-radius: 6px;
		overflow: hidden;
		background-color: transparent;
		z-index: 100;

		&:after {
			content: '';
			width: 100%;
			height: 100%;
			position: absolute;
			left: 0;
			top: 0;
			opacity: 0.1;
			background: var(--variant-yellowGradient-color);
		}
	}

	.dropdown {
		z-index: 9999;
		position: relative;

		width: 470px;

		@include break-at('mobile') {
			width: 100%;
		}
		.content {
			background: #191e30;
			box-shadow: 0px 57px 80px rgba(0, 0, 0, 0.56);
			border-radius: 16px;
			padding: 24px;
			display: flex;
			flex-direction: column;
			gap: 20px;
			max-height: 578px;

			.buttons {
				display: flex;
				gap: 20px;
			}

			.inventory-list {
				display: flex;
				flex-direction: column;
				gap: 8px;

				.item {
					cursor: pointer;
					// width: 448px;
					width: 100%;
					padding: 12px 0;
					display: flex;
					flex-direction: row;
					align-items: center;
					background: rgba(0, 0, 0, 0.2);
					border-radius: 12px;
				}
			}

			.checkbox {
				margin-left: auto;
				margin-right: 15px;
			}
		}

		.full-inventory {
			cursor: pointer;
			background: transparent;
			border: 1px solid rgba(58, 87, 132, 0.2);
			box-sizing: border-box;
			border-radius: 6px;
			padding: 12px 17px;
		}

		.actions {
			position: absolute;
			left: 0;
			bottom: 0;
			width: 100%;
			background-color: var(--variant-grey-color);
			display: flex;
			flex-direction: row;
			border-radius: 16px;

			.buttons {
				padding: 25px;
				width: 100%;
				display: flex;
				gap: 20px;
			}
		}

		&[data-show] {
			display: block;
		}
		&:not([data-show]) {
			display: hidden;
		}
	}
</style>
