<script lang="ts">
	import ChatBubble from '$icons/svgs/Chat/ChatBubble.svelte';

	export let title: string;
	export let subTitle: string = '';
</script>

<div class="game-wrapper">
	<div class="content">
		<div class="mb-4">
			<div class="flex items-center">
				<h1 class="text-white text-4xl font-bold">{title}</h1>
				<div style="max-width: 88%;">
					<slot name="header-content" />
				</div>
			</div>
			<span class="text-lightblue mt-3">{subTitle}</span>
		</div>
		<button class="absolute right-4">
			<div
				class="bg-foreground bg-opacity-50 w-10 h-10 rounded-md flex items-center justify-center"
			>
				<div class="h-6 w-6">
					<ChatBubble />
				</div>
			</div>
		</button>
		<slot />
	</div>
</div>

<style>
	.game-wrapper {
		display: flex;
		flex-direction: column;
		width: 100%;
		border-radius: 24px;
		height: 100%;
		border: 1px solid #1a1f31;
		position: relative;
		background: no-repeat center center;
		z-index: 1;
		overflow: hidden;
	}

	.game-wrapper::before {
		content: '';
		position: absolute;
		inset: 0;
		height: 100%;
		width: 100%;
		opacity: 0.4;
		z-index: -1;
		background: url('/assets/StarBackground.png');
	}

	.content {
		display: flex;
		flex-direction: column;
		max-width: 1700px;
		align-self: center;
		width: 100%;
		padding: 24px;
		position: relative;
	}
</style>
