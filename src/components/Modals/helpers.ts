import { goto } from '$app/navigation';
import { entries, fromPairs } from 'lodash-es';
import queryString from 'query-string';

type LinkTo = ReturnType<typeof queryString.stringify>;

export type ModalConfig<T = undefined> = {
	title?: string;
	component: () => Promise<typeof import('*.svelte')>;
};

type ConfigType<T> = T extends ModalConfig<infer U> ? U : T;

export type DataMap<T> = {
	[t in keyof T]: T[t] &
		(ConfigType<T[t]> extends undefined
			? {
					open: () => void;
					to: () => LinkTo;
			  }
			: {
					open: (p: ConfigType<T[t]>) => void;
					to: (p: ConfigType<T[t]>) => LinkTo;
			  });
};

export function createModals<T extends Record<string, unknown>>(
	modals: T
): DataMap<T> {
	return fromPairs(
		entries(modals).map(([name, config]) => {
			const modal = {
				...(config as Record<string, unknown>),
				open: (params: Record<string, unknown>) => {
					const query = queryString.parse(window.location.search);

					const newUrl = queryString.stringify({
						...query,
						modal: name,
						...params
					});

					const nextUrl = `${window.location.pathname}?${newUrl}`;

					goto(nextUrl);
				}
			};

			return [name, modal];
		})
	) as DataMap<T>;
}
