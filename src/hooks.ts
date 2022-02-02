import type { RequestEvent } from '@sveltejs/kit';
import { parse } from 'cookie';

/** @type {import('@sveltejs/kit').Handle} */
export async function handle({
	event,
	resolve
}: {
	event: RequestEvent;
	resolve: any;
}) {
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

/** @type {import('@sveltejs/kit').GetSession} */
export function getSession(event) {
	return event.locals.sessionId
		? {
				sessionId: event.locals.sessionId,
				sidebarVisibility: event.locals.sidebarVisibility
		  }
		: {};
}
