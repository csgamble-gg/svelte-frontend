// This file was automatically generated. Edits will be overwritten

export interface Typegen0 {
	'@@xstate/typegen': true;
	eventsCausingActions: {
		demoRoll: 'OPEN_CASE';
		liveRoll: 'SUBSCRIPTION_NEXT';
	};
	internalEvents: {
		'done.invoke.mutationOpenCase': {
			type: 'done.invoke.mutationOpenCase';
			data: unknown;
			__tip: 'See the XState TS docs to learn how to strongly type this.';
		};
		'error.platform.mutationOpenCase': {
			type: 'error.platform.mutationOpenCase';
			data: unknown;
		};
		'xstate.init': { type: 'xstate.init' };
	};
	invokeSrcNameMap: {
		mutationOpenCase: 'done.invoke.mutationOpenCase';
	};
	missingImplementations: {
		actions: never;
		services: 'mutationOpenCase';
		guards: never;
		delays: never;
	};
	eventsCausingServices: {
		mutationOpenCase: 'OPEN_CASE';
	};
	eventsCausingGuards: {
		isDemoMode: 'OPEN_CASE';
		isLiveMode: 'OPEN_CASE';
	};
	eventsCausingDelays: {};
	matchesStates:
		| 'idle'
		| 'fetching'
		| 'waitOnSubscription'
		| 'rolling'
		| 'done';
	tags: never;
}
