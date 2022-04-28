import { browser } from '$app/env';

export function getCookie(name: string, initialCookies?: string): string {
	let cookies = initialCookies;

	if (!cookies) {
		if (!browser) {
			return undefined;
		}
		cookies = document.cookie;
	}

	const splitPairs = cookies.split(';');
	const kv = splitPairs.find((part) => part.trim().startsWith(`${name}=`));

	if (!kv) return undefined;

	const cookieValue = kv.split('=')[1];
	if (!cookieValue) return undefined;
	try {
		return JSON.parse(cookieValue);
	} catch (e) {
		return cookieValue;
	}
}
