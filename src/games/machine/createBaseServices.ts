import type { create as generalCreate } from '$games/state/general';
import type { EventObject, InvokeCreator } from 'xstate';

type GeneralModule = ReturnType<typeof generalCreate>;

type ServiceNames = 'mutationBet' | 'mutationCashout' | 'mutationOpenCase';

export type HandlerArgs<GameState extends Object> = {
	general: GeneralModule;
};

type Services = Record<
	ServiceNames,
	(event: EventObject) => PromiseLike<any>
>;

type BaseProps<GameState extends Object> = {
	services: Partial<Services>;
	general: GeneralModule;
	// handler: (args: HandlerArgs<GameState>) => void;
	// getGameState: () => GameState;
};

export function createBaseServices<
	Context extends object,
	GameState extends object
>(props: { moduleName: string } & BaseProps<GameState>) {
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

	return {
		mutationBet,
		mutationCashout,
		mutationOpenCase
	};
}
