import type { Skin } from '$generated/graphql';
import { random as randomNumber } from 'lodash-es';
import { get } from 'svelte/store';
import { createMachine, interpret, send } from 'xstate';
import { currentCase, winningIndex, winningItem } from '../state/game';
import * as general from '../state/general';
import { ROLL_TIME } from '../types';
import * as services from './services';

export type UnboxingContext = {};

type UnboxingSchema =
	| {
			value: 'idle';
			context: {};
	  }
	| {
			value: 'fetching';
			context: {};
	  }
	| {
			value: 'rolling';
			context: {};
	  };

export type UnboxingMachineEvents =
	| { type: 'OPEN_CASE'; mode: 'DEMO' | 'LIVE' }
	| { type: 'SUCCESS' }
	| { type: 'SUBSCRIPTION_NEXT'; payload: Skin }
	| { type: 'ERROR' };

const machine = createMachine<
	UnboxingContext,
	UnboxingMachineEvents,
	UnboxingSchema
>(
	{
		id: 'unboxing',
		initial: 'idle',
		context: { winningIndex: null },
		states: {
			idle: {
				// entry: ['quickShuffle'],
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
					SUBSCRIPTION_NEXT: { target: 'rolling', actions: 'liveRoll' }
				}
			},
			rolling: {
				// entry: ['injectItem'],
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
				// exit: ['quickShuffle']
			}
		}
	},
	{
		guards: {
			isDemoMode: (context, event) => event.mode === 'DEMO',
			isLiveMode: (context, event) => event.mode === 'LIVE'
		},
		services: {
			...services
		},
		actions: {
			// injectItem: (context, event) => {
			// 	const index = get(winningIndex);
			// 	// we inject the winning item into the winning index
			// 	// this allows for a smooth transition into a new roll
			// 	if (event.mode === 'LIVE') {
			// 		reelSlots.injectItem(index, event.payload);
			// 	}
			// },
			demoRoll: () => {
				const items = get(currentCase).items;
				const index = randomNumber(27, 34);

				const randomSkin = randomNumber(0, items.length - 1);
				const randomQuality = randomNumber(
					0,
					items[randomSkin].qualities.length - 1
				);

				winningIndex.set(index);
				winningItem.set(items[randomSkin].qualities[randomQuality]);
			},
			liveRoll: (context, event) => {
				// we need to put the item in an index between 27 and 34
				const index = randomNumber(27, 30);

				// winningItem.set(event.payload);
				winningIndex.set(index);
				winningItem.set(event.payload);
			}
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
