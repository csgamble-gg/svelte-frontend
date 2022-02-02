<script lang="ts">
	import ToastIcon from '$components/ToastIcon/ToastIcon.svelte';
	import { toastList } from '$stores/toasts/toasts';
	import { onMount } from 'svelte';

	export let title: string;
	export let props: {
		message: string;
	};
	export let id: string;

	let timer: HTMLDivElement;

	const remove = () => {
		toastList.remove(id);
	};

	onMount(() => {
		timer.addEventListener('animationend', remove);

		return () => {
			if (timer) {
				timer.removeEventListener('animationend', remove);
			}
		};
	});
</script>

<div class="wrapper bg-foreground">
	<div>
		<div class="w-6 h-6">
			<ToastIcon icon="error" />
		</div>
		<span>{title}</span>
		<span>{props.message}</span>
	</div>
	<div class="timer" bind:this={timer} />
</div>

<style>
	.wrapper {
		width: 250px;
		height: 75px;
	}

	@keyframes countDown {
		from {
			transform: scaleX(100%);
		}
		to {
			transform: scaleX(0);
		}
	}

	.timer {
		height: 3px;
		position: absolute;
		bottom: 0;
		left: 0;
		right: 0;
		background: #fecb3e;
		transform-origin: left;
		animation-fill-mode: forwards;
		animation-timing-function: linear;
		animation-name: countDown;
		animation-duration: 5s;

		/* border-bottom-left-radius: var(--border-radius-0-25); */
	}
</style>
