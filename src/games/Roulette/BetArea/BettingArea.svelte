<script lang="ts">
	import BetInput from './BetInput.svelte';
	import BetBlue from './BetBlue.svelte';
	import {
		BetCreatedDocument,
		BetCreatedSubscription
	} from '$generated/graphql';
	import { operationStore, subscription } from '@urql/svelte';
	import {
		getRouletteColorFromSelections,
		rouletteContext
	} from '../state/game';
	import BetOrange from './BetOrange.svelte';
	import Big from 'big.js';
	import BetPurple from './BetPurple.svelte';

	const handleBetCreated = (messages = [], data) => {
		const betColor = getRouletteColorFromSelections(
			data.betCreated.selections
		);
		let rawBet = data.betCreated;

		let newData = [...$rouletteContext.currentBets[betColor], rawBet];

		newData = Object.values(
			newData.reduce((acc: { [key: string]: any }, curr: any) => {
				if (!acc) return curr;
				if (acc[curr.user._id]) {
					acc[curr.user._id] = {
						...curr,
						amount: new Big(acc[curr.user._id].amount)
							.plus(curr.amount)
							.toNumber()
					};
				} else {
					acc[curr.user._id] = {
						...curr
					};
				}

				return acc;
			}, {})
		);

		rouletteContext.update((currentContext) => {
			return {
				...currentContext,
				currentBets: {
					...currentContext.currentBets,
					[betColor]: newData
				}
			};
		});
		return data;
	};

	const betCreated =
		operationStore<BetCreatedSubscription>(BetCreatedDocument);

	subscription(betCreated, handleBetCreated);
</script>

<div class="px-4 my-14 z-10">
	<BetInput />
	<div
		class="pt-16 flex flex-row sm:flex-nowrap flex-wrap gap-x-7 gap-y-7 justify-center"
	>
		<BetPurple />
		<BetBlue />
		<BetOrange />
	</div>
</div>
