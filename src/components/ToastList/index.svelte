<script lang="ts">
	import Portal from '$components/Portal/index.svelte';
	import Toast from '$components/Toast/Toast.svelte';
	import { toastList } from '$stores/toasts/toasts';
	import { fly } from 'svelte/transition';
	import { notificationMap } from '../../notifications/index';
</script>

<Portal>
	<div class="toasts-wrapper">
		{#each $toastList as toast, index (toast.id)}
			<div transition:fly={{ x: 100, duration: 250, opacity: 0 }}>
				<Toast
					{...toast}
					{index}
					props={notificationMap[toast.name]({
						...toast.props,
						createdAt: null
					})}
				/>
			</div>
		{/each}
	</div>
</Portal>

<style>
	.toasts-wrapper {
		display: flex;
		flex-direction: column;
		gap: 10px;
		position: fixed;
		top: 1rem;
		right: 1rem;
		z-index: 9999;
	}
</style>
