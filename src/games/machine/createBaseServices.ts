import type { create as generalCreate } from '$games/state/general';
import type { EventObject, InvokeCreator } from 'xstate';

type GeneralModule = ReturnType<typeof generalCreate>;

type ServiceNames =
	| 'mutationBet'
	| 'mutationCashout'
	| 'mutationOpenCase'
	| 'mutationJoinBattle';

export type HandlerArgs = {
	general: GeneralModule;
};

type Services = Record<
	ServiceNames,
	(event: EventObject) => PromiseLike<unknown>
>;

type BaseProps = {
	services: Partial<Services>;
	general: GeneralModule;
	// handler: (args: HandlerArgs<GameState>) => void;
	// getGameState: () => GameState;
};

export function createBaseServices<
	Context extends Record<string, unknown>
	// GameState extends Record<string, unknown>
>(props: { moduleName: string } & BaseProps): Record<string, unknown> {
	const { services } = props;

	const mutationBet: InvokeCreator<Context, EventObject> = (_, event) => {
		if ('mutationBet' in services) {
			return services.mutationBet(event);
		}
	};

	const mutationCashout: InvokeCreator<Context, EventObject> = (
		_,
		event
	) => {
		if ('mutationCashout' in services) {
			return services.mutationCashout(event);
		}
	};

	const mutationOpenCase: InvokeCreator<Context, EventObject> = (
		_,
		event
	) => {
		if ('mutationOpenCase' in services) {
			return services.mutationOpenCase(event);
		}
	};

	const mutationJoinBattle: InvokeCreator<Context, EventObject> = (
		_,
		event
	) => {
		if ('mutationJoinBattle' in services) {
			return services.mutationJoinBattle(event);
		}
	};

	return {
		mutationBet,
		mutationCashout,
		mutationOpenCase,
		mutationJoinBattle
	};
}
