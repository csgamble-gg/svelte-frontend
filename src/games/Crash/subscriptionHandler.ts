import type {
	CrashInitialQuery,
	CrashSubscriptionResult
} from '$generated/graphql';
import {
	CrashInitialDocument,
	CrashSubscriptionDocument
} from '$generated/graphql';
import { createRawQuery, subscriptionClient } from '$libs/urql/urqlClient';
import { print } from 'graphql';
import { service } from './machine';
import { cashedIn, cashedOut, gameHistory, state } from './state/game';

let subscriptionStream: ReturnType<typeof subscribeToStream>;

let subscribeToStream = (client: typeof subscriptionClient) => {
	return client.subscribe(
		{ query: print(CrashSubscriptionDocument) },
		{
			next: (value) => {
				const {
					crashGame,
					cashedIn: cashedInBets,
					cashedOut: cashedOutBets
				} = value.data?.crashGame as CrashSubscriptionResult;

				state.update(() => crashGame);
				cashedIn.set(cashedInBets);
				cashedOut.set(cashedOutBets);

				if (crashGame.status === 'crashed') {
					service.send({ type: 'GAME_FINISHED' });
					gameHistory.addGame(crashGame);
				}
			},
			error: () => {},
			complete: () => {}
		}
	);
};

export const initialize = (): { unsubscribe: () => void } => {
	subscriptionStream = subscribeToStream(subscriptionClient);

	const query = createRawQuery();

	query<CrashInitialQuery>(CrashInitialDocument, {}).then(({ data }) => {
		const {
			crashGame,
			currentBet,
			cashedIn: cashedInBets,
			cashedOut: cashedOutBets,
			pastGames
		} = data.crashInitial;

		state.set(crashGame);
		cashedIn.set(cashedInBets);
		cashedOut.set(cashedOutBets);
		gameHistory.set(pastGames);

		if (currentBet) {
			service.send({ type: 'HAS_STATE', bet: currentBet });
		} else {
			service.send({ type: 'NO_STATE' });
		}
	});

	return {
		unsubscribe: () => {
			if (subscriptionStream) {
				subscriptionStream();
				subscriptionStream = null;
			}
		}
	};
};
