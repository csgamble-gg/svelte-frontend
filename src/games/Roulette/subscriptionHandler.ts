import type {
	RouletteGame,
	RouletteGameSubscription,
	RouletteInitialQuery
} from '$generated/graphql';
import {
	RouletteGameDocument,
	RouletteInitialDocument
} from '$generated/graphql';
import { createRawQuery, subscriptionClient } from '$libs/urql/urqlClient';
import { RouletteStatusEnum } from '$types/index';
import { print } from 'graphql';
import { get } from 'svelte/store';
import { currentBets, gameHistory, state, status } from './state/game';

let subscriptionStream: ReturnType<typeof subscribeToStream>;

let subscribeToStream = (client: typeof subscriptionClient) => {
	return client.subscribe(
		{ query: print(RouletteGameDocument) },
		{
			next: (value) => {
				const { currentBets: gameBets, rouletteGame } = value.data
					?.rouletteGame as RouletteGameSubscription['rouletteGame'];

				const $state = get(state);

				const sameGame = $state._id === rouletteGame._id;

				status.update(() => RouletteStatusEnum[rouletteGame.status]);
				state.update(() => rouletteGame);
				currentBets.set(gameBets);

				if (!sameGame) {
					gameHistory.addGame(rouletteGame);
				}
			},
			error: (error) => {
				console.log(error);
			},
			complete: () => {}
		}
	);
};

export const initialize = (): { unsubscribe: () => void } => {
	subscriptionStream = subscribeToStream(subscriptionClient);

	const query = createRawQuery();

	query<RouletteInitialQuery>(RouletteInitialDocument, {}).then(
		({ data }) => {
			const {
				rouletteGame,
				pastGames,
				currentBets: gameBets
			} = data.rouletteInitial;

			status.update(() => RouletteStatusEnum[rouletteGame.status]);
			state.update(() => rouletteGame);
			gameHistory.set(pastGames as RouletteGame[]);

			currentBets.set(gameBets);
		}
	);
	// const { query } = createQuery(RouletteInitialDocument);

	// const { data } = query({});

	return {
		unsubscribe: () => {
			if (subscriptionStream) {
				subscriptionStream();
				subscriptionStream = null;
			}
		}
	};
};
