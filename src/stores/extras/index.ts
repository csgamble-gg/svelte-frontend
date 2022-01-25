import { browser } from '$app/env';
import Cookies from 'js-cookie';
import { writable } from 'svelte/store';

export function cookieStore<T>(name: string, value: T) {
	const storedValue: T | null = (() => {
		if (browser) {
			const a = Cookies.get('sidebarVisibility');
			return a;
		}
		return null;
	})();

	const initialValue: T = Array.isArray(value)
		? storedValue || value
		: typeof value === 'object'
		? { ...value, ...(storedValue || {}) }
		: storedValue || value;

	const store = writable(initialValue);

	if (browser) {
		Cookies.set(name, initialValue);
	}

	if (browser) {
		let init = false;
		store.subscribe((val) => {
			if (init) {
				Cookies.set(name, val);
			}
		});

		init = true;
	}

	const hydrate = (cookie) => {
		const restoredValue = cookie[name] as T;

		if (restoredValue) {
			try {
				const parsed = JSON.parse(restoredValue) as T;
				store.set(parsed);
			} catch (e) {
				store.set(restoredValue);
			}
		}
	};

	return {
		type: 'cookie' as const,
		...store,
		hydrate
	};
}
