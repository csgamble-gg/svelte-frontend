<script lang="ts">
	import { goto } from '$app/navigation';
	import CurrencyBalances from '$components/CurrencyBalances/CurrencyBalances.svelte';
	import InventoryDropdown from '$components/InventoryDropdown/InventoryDropdown.svelte';
	import { modals } from '$components/Modals/utils';
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
</style>
