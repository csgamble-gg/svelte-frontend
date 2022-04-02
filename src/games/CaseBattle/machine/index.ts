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
	  };
export type BattleSchema =
	| {
			value: 'WAITING_FOR_PLAYER';
			context: {};
	  }
	| {
			value: 'STARTING';
			context: {};
	  }
	| {
			value: 'JOINING';
			context: {};
	  };

const machine = createMachine<
	BattleContext,
	BattleMachineEvents,
	BattleSchema
>(
	{
		id: 'battle',
		initial: 'WAITING_FOR_PLAYER',
		states: {
			WAITING_FOR_PLAYER: {
				entry: () => console.log('MACHINE READY'),
				on: {
					JOIN_BATTLE: {
						target: 'JOINING'
					},
					PLAYER_JOINED: {}
				}
			},
			JOINING: {
				invoke: {
					id: 'mutationJoinBattle',
					src: 'mutationJoinBattle'
				}
			},
			STARTING: {}
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
