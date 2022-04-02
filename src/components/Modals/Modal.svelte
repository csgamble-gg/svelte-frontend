<script lang="ts">
	import { browser } from '$app/env';
	import { Card, Exit, Text } from '@csgamble-gg/nebula-ui';
	import { onMount } from 'svelte';
	import { fade, fly } from 'svelte/transition';
	import { closeModal, modals } from './utils';

	export let modal: string;

	$: currentModal = modal in modals ? modals[modal] : null;

	$: {
		currentModal;
	}

	let close = () => {
		closeModal(currentModal);
	};

	const closeHandler = (e) => {
		const { key } = e;
		if (key === 'Escape') {
			close();
		}
	};

	onMount(() => {
		window.addEventListener('keydown', closeHandler);
		return () => {
			window.removeEventListener('keydown', closeHandler);
		};
	});

	let loading = false;
	let error = null;
	let component;

	const loadModal = async () => {
		try {
			const module = await currentModal.component();

			if (module && 'default' in module) {
				component = module.default;
			}
		} catch (e) {
			error = e;
		} finally {
			loading = false;
		}
	};

	$: if (currentModal && browser) {
		component = null;
		error = null;
		loading = true;
		loadModal();
	}
</script>

{#if currentModal}
	<div class="modal">
		<div class="overlay" in:fade={{ duration: 233 }} />
		<div
			class="modal-content"
			in:fly={{ duration: 250, opacity: 1, y: 30 }}
			out:fly={{ duration: 200, opacity: 0, y: 30 }}
		>
			<Card variant="default" fullWidth>
				<div class="header">
					<Text tag="h2">{currentModal.title}</Text>
					<button class="exit-button" on:click={close}>
						<Exit />
					</button>
				</div>
				<div class="content">
					{#key modal}
						{#if loading}
							<div />
						{:else if component}
							<svelte:component this={component} />
						{/if}
					{/key}
				</div>
			</Card>
		</div>
	</div>
{/if}

<style lang="scss">
	.modal {
		z-index: 9998;
		inset: 0;
		position: fixed;
		display: flex;
		align-items: center;
		justify-content: center;
	}

	.header {
		position: relative;
		display: flex;
		padding: 24px 2vw 0;
		align-items: center;
		justify-content: space-between;
	}

	.content {
		display: flex;
		flex-direction: column;
		position: relative;
		padding: 24px 2vw;
	}
	.modal-content {
		display: flex;
		align-items: center;
		flex-direction: column;
		z-index: 9998;
		border-radius: 16px;
	}
	.overlay {
		position: absolute;
		inset: 0;
		background-color: rgba(0, 0, 0, 0.6);
	}

	.exit-button {
		cursor: pointer;
		background: rgba(58, 87, 132, 0.15);
		box-shadow: 0px 14px 21px rgba(0, 0, 0, 0.07),
			inset 1px 1px 0px rgba(58, 113, 194, 0.15);
		border-radius: 6px;
		border: none;
		display: flex;
		align-items: center;
		justify-content: center;
		bottom: 0;
		width: 40px;
		height: 40px;
		z-index: 5;
	}
</style>
