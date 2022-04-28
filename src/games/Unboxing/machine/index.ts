import type { InventorySkin } from '$generated/graphql';
import { random as randomNumber } from 'lodash-es';
import { get } from 'svelte/store';
import { createMachine, interpret, send } from 'xstate';
import { currentCase, winningIndex, winningItem } from '../state/game';
import * as general from '../state/general';
import { MAX_SLOT_LENGTH, ROLL_TIME } from '../types';
import * as services from './services';

export type OpenCaseEvent = {
	type: 'OPEN_CASE';
	amount: number;
	mode: 'DEMO' | 'LIVE';
};

export type UnboxingMachineEvents =
	| OpenCaseEvent
	| { type: 'SUCCESS' }
	| { type: 'SUBSCRIPTION_NEXT'; payload: InventorySkin[] }
	| { type: 'ERROR' };

export type UnboxingMachineGuards =
	| {
			type: 'isDemoMode';
	  }
	| {
			type: 'isLiveMode';
			event: {
				mode: 'DEMO' | 'LIVE';
			};
	  };

export type UnboxingMachineActions =
	| {
			type: 'demoRoll';
	  }
	| {
			type: 'liveRoll';
	  };

const machine = createMachine(
	{
		id: 'unboxing',
		initial: 'idle',
		context: {},
		tsTypes: {} as import('./index.typegen').Typegen0,
		schema: {
			guards: {} as UnboxingMachineGuards,
			events: {} as UnboxingMachineEvents,
			context: {},
			services: {},
			actions: {} as UnboxingMachineActions
		},
		states: {
			idle: {
				on: {
					OPEN_CASE: [
						{
							target: 'rolling',
							actions: 'demoRoll',
							cond: 'isDemoMode'
						},
						{
							target: 'fetching',
							cond: 'isLiveMode'
						}
					]
				}
			},
			fetching: {
				invoke: {
					id: 'mutationOpenCase',
					src: 'mutationOpenCase',
					onDone: {
						actions: send('SUCCESS')
					},
					onError: {
						actions: send('ERROR')
					}
				},
				on: {
					SUCCESS: { target: 'waitOnSubscription' },
					ERROR: {
						target: 'idle'
					}
				}
			},
			waitOnSubscription: {
				on: {
					SUBSCRIPTION_NEXT: { target: 'rolling', actions: 'liveRoll' },
					ERROR: {
						target: 'idle'
					}
				}
			},
			rolling: {
				after: {
					[ROLL_TIME]: 'done'
				}
			},
			done: {
				on: {
					OPEN_CASE: [
						{
							target: 'rolling',
							actions: 'demoRoll',
							cond: 'isDemoMode'
						},
						{
							target: 'fetching',
							cond: 'isLiveMode'
						}
					]
				}
			}
		}
	},
	{
		guards: {
			isDemoMode: (_, event) => event.mode === 'DEMO',
			isLiveMode: (_, event) => event.mode === 'LIVE'
		},
		services: {
			...(services as any)
		},
		actions: {
			demoRoll: (_, event) => {
				const items = get(currentCase).items;
				const index = randomNumber(25, MAX_SLOT_LENGTH - 2);

				const winningSkins = [];

				// determine how many items to roll
				for (let index = 0; index < event.amount; index++) {
					const randomSkin = randomNumber(0, items.length - 1);
					const randomWear = randomNumber(
						0,
						items[randomSkin].wears.length - 1
					);

					// modify the winningItem to match a live roll
					const winItem: Omit<
						InventorySkin,
						'__typename' | 'currency' | 'type'
					> = {
						...items[randomSkin].wears[randomWear],
						...items[randomSkin]
					};

					winningSkins.push(winItem);
				}

				winningIndex.set(index);
				winningItem.set(winningSkins);
			},
			liveRoll: (
				_,
				event: {
					type: 'SUBSCRIPTION_NEXT';
					payload: InventorySkin[];
				}
			) => {
				const index = randomNumber(25, MAX_SLOT_LENGTH - 2);

				winningIndex.set(index);
				winningItem.set(event.payload);
			}
		}
	}
);

// @ts-ignore
export const service = interpret(machine, {
	devTools: true
})
	.start()
	.onTransition((state) => {
		general.machineState.set(state.value);
	});
