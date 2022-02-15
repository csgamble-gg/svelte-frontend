import { createMachine, interpret } from 'xstate';
import * as general from '../state/general';
import type { BettingEvents } from './betting';
import betting from './betting';
import type { GetStateEvents } from './getState';
import getState from './getState';
import * as services from './services';

export type CrashContext = {};

type CrashSchema = {
	states: {
		// getState: GetStateSchema;
	};
};

export type CrashMachineEvents = BettingEvents | GetStateEvents;

const machine = createMachine<
	CrashContext,
	CrashMachineEvents,
	CrashSchema
>(
	{
		id: 'crash',
		initial: 'getState',
		context: {},
		states: {
			getState,
			betting
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
