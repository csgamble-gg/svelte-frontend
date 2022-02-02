import { createMachine, interpret } from 'xstate';
import * as general from '../state/general';
import type { BettingEvents } from './betting';
import betting from './betting';
import * as services from './services';

export type RouletteContext = {};

type RouletteSchema = { value: 'betting'; context: {} };

export type RouletteMachineEvents = BettingEvents;

const machine = createMachine<
	RouletteContext,
	RouletteMachineEvents,
	RouletteSchema
>(
	{
		id: 'roulette',
		initial: 'betting',
		states: {
			betting: {
				...betting
			}
		}
	},
	{ services: { ...services } }
);

export const service = interpret(machine, {
	devTools: true
})
	.start()
	.onTransition((state) => {
		general.machineState.set(state.value);
	});
