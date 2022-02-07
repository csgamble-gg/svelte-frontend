import { createMachine, interpret } from 'xstate';
import * as general from '../state/general';
import type { BettingEvents } from './betting';
import betting from './betting';
import * as services from './services';

export type CrashContext = {};

type CrashSchema = { value: 'betting'; context: {} };

export type CrashMachineEvents = BettingEvents;

const machine = createMachine<
	CrashContext,
	CrashMachineEvents,
	CrashSchema
>(
	{
		id: 'crash',
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
