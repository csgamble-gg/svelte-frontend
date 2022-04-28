<script lang="ts">
	import { goto } from '$app/navigation';
	import CurrencyBalances from '$components/CurrencyBalances/CurrencyBalances.svelte';
	import InventoryDropdown from '$components/InventoryDropdown/InventoryDropdown.svelte';
	import { modals } from '$components/Modals/utils';
	import ChatBubble from '$icons/svgs/Chat/ChatBubble.svelte';
	import { chatStore } from '$stores/app';
	import { getStores } from '$stores/user/index';
	import { Avatar, Button } from '@csgamble-gg/nebula-ui';

	const handleSignIn = () => {
		goto(
			`${
				import.meta.env.VITE_API_URL
			}/auth/steam?redirectUri=${encodeURIComponent(window.location.href)}`
		);
	};

	const { userStore } = getStores();

	function handleChatClick() {
		chatStore.toggle();
	}
</script>

<div class="wrapper">
	{#if !$userStore.isAuthenticated}
		<div>
			<Button
				label="Login with Steam"
				size="medium"
				on:click={handleSignIn}
			/>
		</div>
	{:else}
		<div class="user-info">
			<button class="chat-button" on:click={handleChatClick}>
				<div class="chat-icon">
					<ChatBubble />
				</div>
			</button>
			<InventoryDropdown />
			<div>
				<Avatar image={$userStore.avatar} />
			</div>
			<CurrencyBalances />
			<Button
				on:click={() => modals.deposit.open()}
				label="Deposit"
				size="medium"
			/>
		</div>
	{/if}
</div>

<style lang="scss">
	.wrapper {
		display: flex;
		align-items: center;
	}
	.user-info {
		display: flex;
		flex-direction: row;
		align-items: center;
		justify-content: space-evenly;
		gap: 8px;
	}

	.chat-button {
		width: 40px;
		height: 40px;
		background: rgba(36, 42, 66, 0.5);
		border: none;
		border-radius: 6px;
		display: flex;
		align-items: center;
		justify-content: center;
		right: 0px;
		cursor: pointer;
		.chat-icon {
			width: 24px;
			height: 24px;
		}
	}
</style>
