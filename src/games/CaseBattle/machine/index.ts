import type { User } from '$generated/graphql';
import { createMachine, interpret } from 'xstate';
import * as general from '../state/general';
import * as services from './services';

export type BattleContext = {};
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
			context: {};
	  }
	| {
			value: 'RUNNING';
			context: {};
	  }
	| {
			value: 'JOINING';
			context: {};
	  }
	| {
			value: 'ROLLING';
			context: {};
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
					PLAYER_JOINED: {
						target: 'RUNNING'
					}
				}
			},
			JOINING: {
				invoke: {
					id: 'mutationJoinBattle',
					src: 'mutationJoinBattle'
				}
			},
			RUNNING: {
				on: {
					ROLL: {
						target: 'ROLLING'
					}
				}
			},
			ROLLING: {
				after: {
					5000: 'RUNNING'
				}
			}
		}
	},
	{
		services: {
			...services
		}
	}
);

export const service = interpret(machine, {
	devTools: true
})
	.start()
	.onTransition((state) => {
		general.machineState.set(state.value);
	});
