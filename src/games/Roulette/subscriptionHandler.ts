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
import { print } from 'graphql';
import { currentBets, gameHistory, state } from './state/game';

let subscriptionStream: ReturnType<typeof subscribeToStream>;

const subscribeToStream = (client: typeof subscriptionClient) => {
	return client.subscribe(
		{ query: print(RouletteGameDocument) },
		{
			next: (value) => {
				const { currentBets: gameBets, rouletteGame } = value.data
					?.rouletteGame as RouletteGameSubscription['rouletteGame'];

				state.update(() => rouletteGame);
				currentBets.set(gameBets);

				if (rouletteGame.status === 'finished') {
					gameHistory.addGame(rouletteGame);
				}
			},
			error: (error) => {
				console.log(error);
			},
			complete: () => null
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

			state.update(() => rouletteGame);
			gameHistory.set(pastGames as RouletteGame[]);

			currentBets.set(gameBets);
		}
	);

	return {
		unsubscribe: () => {
			if (subscriptionStream) {
				subscriptionStream();
				subscriptionStream = null;
			}
		}
	};
};
