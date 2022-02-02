<script lang="ts">
	import Exit from '$icons/svgs/Exit/Exit.svelte';
	import { onMount } from 'svelte';
	import { fade, fly } from 'svelte/transition';
	import { closeModal, modals } from './utils';

	export let modal: string;

	$: currentModal = modal in modals ? modals[modal] : null;

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
</script>

<div class="modal">
	<div class="overlay" in:fade={{ duration: 233 }} />
	<div
		class="modal-content"
		in:fly={{ duration: 250, opacity: 1, y: 30 }}
		out:fly={{ duration: 200, opacity: 0, y: 30 }}
	>
		<div class="deposit bg-card-light flex flex-col relative">
			<button
				class="w-10 h-10 exit-button flex items-center justify-center absolute right-0 top-6 mr-6"
				on:click={close}
			>
				<div class="w-4 h-4">
					<Exit />
				</div>
			</button>
			<svelte:component this={currentModal.component} />
		</div>
	</div>
</div>

<style>
	.deposit {
		padding: 24px;
		margin-top: 20px;
		border-radius: 16px;
		box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
		max-width: 500px;
		width: 100%;
	}
	.modal {
		z-index: 9999;
		inset: 0;
		position: fixed;
		display: flex;
		align-items: center;
		justify-content: center;
	}
	.modal-content {
		flex: 1;
		display: flex;
		align-items: center;
		flex-direction: column;
		z-index: 9998;
	}
	.overlay {
		position: absolute;
		inset: 0;
		background-color: rgba(0, 0, 0, 0.2);
	}

	.exit-button {
		background: rgba(58, 87, 132, 0.15);
		box-shadow: 0px 14px 21px rgba(0, 0, 0, 0.07),
			inset 1px 1px 0px rgba(58, 113, 194, 0.15);
		border-radius: 6px;
		z-index: 9999;
	}
</style>
