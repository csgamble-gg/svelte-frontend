import type { User } from '$generated/graphql';
import { get } from 'svelte/store';
import { createMachine, interpret } from 'xstate';
import { send } from 'xstate/lib/actions';
import { currentRound, playerWins } from '../state/game';
import * as general from '../state/general';
import * as services from './services';

export type BattleContext = null;
export type BattleMachineEvents =
	| {
			type: 'JOIN_BATTLE';
	  }
	| {
			type: 'PLAYER_JOINED';
			payload: Pick<User, '_id' | 'avatar' | 'displayName'>;
	  }
	| {
			type: 'ROLL';
	  };
export type BattleSchema =
	| {
			value: 'WAITING_FOR_PLAYER';
			context: null;
	  }
	| {
			value: 'RUNNING';
			context: null;
	  }
	| {
			value: 'JOINING';
			context: null;
	  }
	| {
			value: 'ROLLING';
			context: null;
	  };

const machine = createMachine<
	BattleContext,
	BattleMachineEvents,
	BattleSchema
>(
	{
		id: 'battle',
		initial: 'IDLE',
		states: {
			IDLE: {
				on: {
					JOIN_BATTLE: {
						target: 'JOINING'
					},
					ROLL: {
						target: 'ROLLING'
					}
				}
			},
			JOINING: {
				invoke: {
					id: 'mutationJoinBattle',
					src: 'mutationJoinBattle'
				},
				on: {
					PLAYER_JOINED: {
						target: 'IDLE'
					}
				}
			},
			ROLLING: {
				after: {
					5000: 'IDLE'
				},
				exit: 'addToWins'
			}
		}
	},
	{
		services: {
			...(services as Record<string, unknown>)
		},
		actions: {
			addToWins: () => {
				get(currentRound).drops.map((playerDrop) => {
					playerWins.addSkinToPlayer(
						playerDrop.playerId,
						playerDrop.winningSkin
					);
				});

				send('IDLE');
			}
		}
	}
);

export const service = interpret(machine, {
	devTools: true
})
	.start()
	.onTransition((state) => {
		console.log(state.value);
		general.machineState.set(state.value);
	});
