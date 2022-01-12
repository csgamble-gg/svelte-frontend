<script lang="ts">
	import {
		CurrentUserDocument,
		ErrorDocument,
		ErrorSubscription,
		UserEventDocument,
		UserEventSubscription
	} from '../../generated/graphql';
	import { operationStore, query, subscription } from '@urql/svelte';
	import Flex from '../generics/Flex.svelte';
	import Gem from '../../icons/svgs/Gem/Gem.svelte';

	const handleSignIn = () => {
		window.location.replace(`${import.meta.env.VITE_API_URL}/auth/steam`);
	};

	const userEvents = operationStore<UserEventSubscription>(UserEventDocument);
	const userErrors = operationStore<ErrorSubscription>(ErrorDocument);

	subscription(userEvents, (_, data) => data);
	subscription(userErrors, (_, data) => data);

	let currentUser = operationStore(CurrentUserDocument);
	query(currentUser);
</script>

<div>
	{#if $currentUser.fetching}
		<div />
	{:else if !$currentUser.data.getCurrentUser}
		<div class="w-100 justify-self-end">
			<button
				class="h-10 px-2 button font-sans text-sm text-white font-semibold"
				on:click={handleSignIn}
			>
				Login with Steam
			</button>
		</div>
	{:else}
		<Flex class="flex-row">
			<img
				src={$currentUser.data.getCurrentUser.avatar}
				class="h-10 w-10 rounded mr-2"
				alt="profile"
			/>
			<Flex class="flex-col pr-5">
				<span class="text-lightblue">{$currentUser.data.getCurrentUser.displayName}</span>
				<Flex class="items-center">
					<span class="text-white font-semibold pr-2"
						>{$currentUser.data.getCurrentUser.balance.toFixed(2)}</span
					>
					<Gem width="20px" height="20px" color="green" />
				</Flex>
			</Flex>
			<button class="h-10 px-2 button font-sans text-sm text-white font-semibold"> Deposit</button>
		</Flex>
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
</style>
