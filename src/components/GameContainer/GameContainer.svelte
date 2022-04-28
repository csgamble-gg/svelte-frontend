<script lang="ts">
	import Chat from '$components/Chat/Chat.svelte';
	import ChatBubble from '$icons/svgs/Chat/ChatBubble.svelte';

	import { chatStore } from '$stores/app';
	import { mobileView } from '$stores/window';
	import { ButtonBase, Text } from '@csgamble-gg/nebula-ui';

	export let title: string | undefined = undefined;
	export let subTitle: string | undefined = undefined;
	export let padding = true;
</script>

<div class="wrapper">
	<div class="game-wrapper">
		<div class="content" class:padded={padding}>
			<div>
				<div
					class="header"
					class:mobile={$mobileView}
					class:padded={!padding}
				>
					{#if title}
						<Text as="h1" size="3xl" tag="h1">{title}</Text>
					{/if}
					<slot name="header-content" />
				</div>
				{#if subTitle}
					<span>{subTitle}</span>
				{/if}
			</div>
			<slot />
		</div>
	</div>

	<Chat />
</div>

<style lang="scss">
	.wrapper {
		display: flex;
		flex: 1;
		flex-direction: row;
		margin: 21px 0px 0px 0px;
	}
	.game-wrapper {
		flex: 1;
		display: flex;
		flex-direction: row;
		width: 100%;
		border-radius: 24px;
		border: 1px solid #1a1f31;
		position: relative;
		background: no-repeat center center;
		z-index: 1;
		overflow-y: scroll;
		justify-content: center;
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
		border-radius: 24px;
	}

	.content {
		display: flex;
		flex-direction: column;
		max-width: 1700px;
		align-self: baseline;
		width: 100%;
		padding-bottom: 75px;
		position: relative;

		&.padded {
			padding: 43px 1vw 0px 1vw;
		}
	}

	.header {
		display: flex;
		flex-direction: row;
		justify-content: space-between;

		&.mobile {
			flex-wrap: wrap;
			gap: 5px;
		}

		&.padded {
			padding: 24px 1vw;
		}
	}
</style>
