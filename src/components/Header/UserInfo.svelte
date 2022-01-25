<script lang="ts">
	import { goto } from '$app/navigation';
	import Gem from '$icons/svgs/Gem/Gem.svelte';
	import Inventory from '$icons/svgs/Inventory/Inventory.svelte';
	import { convertPenniesToDollars } from '$libs/currencyConversion';
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
				class="h-10 px-2 button font-sans text-sm text-white font-semibold"
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
			<div class="flex flex-col">
				<span class="text-lightblue">{$userStore.displayName}</span>
				<div class="flex items-center">
					<span class="text-white font-semibold pr-2"
						>{convertPenniesToDollars($userStore.balance, 2)}</span
					>
					<Gem width="20px" height="20px" color="green" />
				</div>
			</div>
			<button
				class="h-10 ml-2 px-2 button font-sans text-sm text-white font-semibold hidden sm:inline"
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
		border-radius: 6px;
		height: 48px;
		min-width: 94px;
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
