import {
	BattleUpdatedDocument,
	BattleUpdatedSubscription
} from '$generated/graphql';
import { subscriptionClient } from '$libs/urql/urqlClient';
import { print } from 'graphql';
import { get } from 'svelte/store';
import { service } from './machine';
import { currentBattle } from './state/game';

let subscriptionStream: ReturnType<typeof subscribeToStream>;

let subscribeToStream = (client: typeof subscriptionClient) => {
	return client.subscribe<BattleUpdatedSubscription>(
		{ query: print(BattleUpdatedDocument) },
		{
			next: (value) => {
				const battle = value.data.battleUpdated;

				if (battle) {
					const _currentBattle = get(currentBattle);
					// if the battle is one that we are currently apart of
					// we need to send the data to our machine
					if (battle._id === _currentBattle._id) {
						// determine what changed

						// check the player count against what we have now
						if (battle.players.length > _currentBattle.players.length) {
							// a player joined
							service.send({
								type: 'PLAYER_JOINED',
								payload: battle.players[1]
							});
						}

						// update our battle in state
						currentBattle.set(battle);
						// service.send({ type: 'GAME_UPDATE', payload: battle });
					}
				}
			},
			complete: () => {},
			error: () => {}
		}
	);
};

export function initialize(): { unsubscribe: () => void } {
	subscriptionStream = subscribeToStream(subscriptionClient);

	return {
		unsubscribe: () => {
			if (subscriptionStream) {
				subscriptionStream();
				subscriptionStream = null;
			}
		}
	};
}
