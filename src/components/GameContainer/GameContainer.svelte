<script lang="ts">
	import { chatStore } from '$stores/app';
	import { mobileView } from '$stores/window';
	import { Text } from '@csgamble-gg/nebula-ui';

	export let title: string;
	export let subTitle: string = '';
	export let padding: boolean = true;

	function handleChatClick() {
		chatStore.toggle();
	}
</script>

<div class="game-wrapper">
	<div class="content" class:padded={padding}>
		<div>
			<div
				class="header"
				class:mobile={$mobileView}
				class:padded={!padding}
			>
				<Text as="h1" size="3xl" tag="h1">{title}</Text>
				<slot name="header-content" />
			</div>
			<span>{subTitle}</span>
		</div>
		<!-- <button class="chat-button" on:click={handleChatClick}>
			<div
				class="bg-foreground bg-opacity-50 w-10 h-10 rounded-md flex items-center justify-center"
			>
				<div class="h-6 w-6">
					<ChatBubble />
				</div>
			</div>
		</button> -->
		<slot />
	</div>
</div>

<style lang="scss">
	.game-wrapper {
		display: flex;
		flex-direction: row;
		width: 100%;
		border-radius: 24px;
		height: fit-content;
		border: 1px solid #1a1f31;
		position: relative;
		background: no-repeat center center;
		z-index: 1;
		margin: 21px 0;
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
		border-radius: 24px;
	}

	.content {
		display: flex;
		flex-direction: column;
		max-width: 1700px;
		align-self: center;
		width: 100%;
		padding-bottom: 75px;
		position: relative;
		/* height: 100vh; */
		margin: auto;

		&.padded {
			padding: 24px;
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
			padding: 24px;
		}
	}
</style>
