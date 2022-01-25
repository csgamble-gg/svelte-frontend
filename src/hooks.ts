import { parse } from 'cookie';

/** @type {import('@sveltejs/kit').Handle} */
export async function handle({ request, resolve }) {
	if (request.headers.cookie) {
		const cookies = parse(request.headers.cookie);

		if (cookies.session) {
			request.locals.sessionId = cookies.session;
		}

		if (cookies.sidebarVisibility) {
			request.locals.sidebarVisibility = cookies.sidebarVisibility;
		}

		return resolve(request);
	} else {
		return resolve(request);
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
