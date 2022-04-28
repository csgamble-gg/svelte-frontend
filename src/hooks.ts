import type { LoadInput } from '@sveltejs/kit/types/internal';
import { parse } from 'cookie';
import type { HandleInput } from './types';

/** @type {Handle} */
export async function handle({
	event,
	resolve
}: HandleInput): Promise<unknown> {
	if (event.request.headers.get('cookie')) {
		const cookies = parse(event.request.headers.get('cookie'));

		if (cookies.session) {
			event.locals.sessionId = cookies.session;
		}

		if (cookies.sidebarVisibility) {
			event.locals.sidebarVisibility = cookies.sidebarVisibility;
		}

		return resolve(event);
	} else {
		return resolve(event);
	}
}

type LoadEvent = LoadInput & {
	locals: {
		sessionId: string;
		sidebarVisibility: boolean;
	};
};

export function getSession(event: LoadEvent): {
	sessionId?: string;
	sidebarVisibility?: boolean;
} {
	return event.locals.sessionId
		? {
				sessionId: event.locals.sessionId,
				sidebarVisibility: event.locals.sidebarVisibility
		  }
		: {};
}
