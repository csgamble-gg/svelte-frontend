import type { CrashBet } from '$generated/graphql';
import type { StateNodeConfig } from 'xstate';

export type Context = {};

export type GetStateEvents =
	| { type: 'HAS_STATE'; bet: Partial<CrashBet> }
	| { type: 'NO_STATE' };

export interface Schema {
	states: {
		fetching: {};
	};
}

const getState: StateNodeConfig<Context, Schema, GetStateEvents> = {
	initial: 'fetching',
	states: {
		fetching: {
			on: {
				NO_STATE: { target: '#betting.idle' },
				HAS_STATE: {
					target: '#betting.play',
					actions: (_, event) => {
						const { bet } = event;
					}
				}
			}
		}
	}
};

export default getState;
