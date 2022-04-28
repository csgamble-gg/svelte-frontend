<script lang="ts">
	import ToastIcon from '$components/ToastIcon/ToastIcon.svelte';
	import { toastList } from '$stores/toasts/toasts';
	import { Text } from '@csgamble-gg/nebula-ui';
	import { onMount } from 'svelte';

	export let props: {
		body: string;
		title: string;
		icon: 'error' | 'info' | 'success';
		type: 'error' | 'success' | 'info';
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

<div class="wrapper {props.type}">
	<ToastIcon icon={props.type} />
	<div class="text">
		<Text weight="bold">{props.title}</Text>
		<Text size="sm">{props.body}</Text>
	</div>
	<div class="timer" bind:this={timer} />
</div>

<style lang="scss">
	.wrapper {
		backdrop-filter: blur(80px);
		overflow: hidden;
		border-radius: 12px;
		display: flex;
		align-items: center;
		padding: 15px 16px;
		gap: 12px;

		&.info {
			background: linear-gradient(
				321.77deg,
				rgba(156, 187, 255, 0.14) -4.42%,
				rgba(156, 187, 255, 0.5) 50.67%,
				rgba(156, 187, 255, 0.175) 102.42%
			);
			box-shadow: 3px 0px 10px rgba(9, 10, 16, 0.1),
				0px 20px 50px rgba(9, 10, 16, 0.2),
				inset 0px 1.4px 0px rgba(175, 200, 255, 0.3);
		}

		&.success {
			background: linear-gradient(
				321.77deg,
				rgba(84, 204, 168, 0.224) -4.42%,
				rgba(108, 219, 125, 0.8) 50.67%,
				rgba(73, 202, 179, 0.28) 102.42%
			);
			box-shadow: 3px 0px 10px rgba(9, 10, 16, 0.1),
				0px 20px 50px rgba(9, 10, 16, 0.2),
				inset 0px 1.4px 0px rgba(151, 255, 168, 0.35);
		}

		&.error {
			background: linear-gradient(
				321.77deg,
				rgba(244, 125, 125, 0.224) -4.42%,
				rgba(244, 91, 100, 0.8) 50.67%,
				rgba(204, 84, 84, 0.28) 102.42%
			);
			box-shadow: 3px 0px 10px rgba(9, 10, 16, 0.1),
				0px 20px 50px rgba(9, 10, 16, 0.2),
				inset 0px 1.4px 0px rgba(255, 155, 143, 0.36);
		}
		width: 250px;

		.text {
			display: flex;
			flex-direction: column;
		}
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
		bottom: 0.1px;
		left: 0;
		right: 0;
		background: #fecb3e;
		transform-origin: left;
		animation-fill-mode: forwards;
		animation-timing-function: linear;
		animation-name: countDown;
		animation-duration: 3s;
	}
</style>
