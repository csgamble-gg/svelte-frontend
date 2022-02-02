<script lang="ts">
	import { goto } from '$app/navigation';
	import CurrencyBalances from '$components/CurrencyBalances/CurrencyBalances.svelte';
	import { modals } from '$components/Modals/utils';
	import Inventory from '$icons/svgs/Inventory/Inventory.svelte';
	import { getStores } from '$stores/user/index';

	const handleSignIn = () => {
		goto(
			`${
				import.meta.env.VITE_API_URL
			}/auth/steam?redirectUri=${encodeURIComponent(window.location.href)}`
		);
	};

	const { userStore } = getStores();
</script>

<div>
	{#if !$userStore.isAuthenticated}
		<div class="w-100 justify-self-end">
			<button
				class="h-10 px-2 button font-sans text-sm text-white font-semibold rounded"
				on:click={handleSignIn}
			>
				Login with Steam
			</button>
		</div>
	{:else}
		<div class="flex flex-row items-center">
			<button
				class="w-10 h-10 border-none inventory-button flex items-center justify-center mr-2"
			>
				<Inventory />
			</button>
			<img
				src={$userStore.avatar}
				class="h-10 w-10 rounded mr-2"
				alt="profile"
			/>

			<span class="text-lightblue pr-2">{$userStore.displayName}</span>
			<CurrencyBalances />
			<button
				class="h-10 px-2 button font-sans text-sm text-white font-semibold hidden sm:inline deposit-button"
				on:click={() => modals.deposit.open()}
			>
				Deposit
			</button>
		</div>
	{/if}
</div>

<style>
	.button {
		background: linear-gradient(
			321.77deg,
			#54cca8 -4.42%,
			#6cdb7d 50.67%,
			rgba(73, 202, 179, 0.69) 102.42%
		);
		box-shadow: inset 0 1px 0 rgba(64, 255, 140, 0.25);
		height: 48px;
		min-width: 94px;
	}

	.deposit-button {
		border-radius: 0 0.25rem 0.25rem 0;
	}

	.inventory-button {
		position: relative;
	}

	.inventory-button::before {
		content: '';
		width: 100%;
		height: 100%;
		position: absolute;
		inset: 0;
		background: linear-gradient(
			321.77deg,
			#ffeb71 -4.42%,
			#eac76c 50.67%,
			rgba(218, 194, 94, 0.69) 102.42%
		);
		opacity: 0.1;
		border-radius: 6px;
	}
</style>
