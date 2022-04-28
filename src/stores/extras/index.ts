import { browser } from '$app/env';
import Cookies from 'js-cookie';
import { Writable, writable } from 'svelte/store';

export function cookieStore<T>(
	name: string,
	value: T
): {
	type: string;
	store: Writable<T>;
	hydrate: () => void;
} {
	const storedValue: T | null = (() => {
		if (browser) {
			return Cookies.get(name);
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

	const hydrate = (cookie: string) => {
		const restoredValue = cookie[name] as T;

		if (restoredValue) {
			try {
				const parsed = restoredValue;
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
