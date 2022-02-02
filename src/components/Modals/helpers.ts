import { goto } from '$app/navigation';
import { entries, fromPairs } from 'lodash-es';
import queryString from 'query-string';

export function createModals<T extends object>(modals: T) {
	return fromPairs(
		entries(modals).map(([name, config]) => {
			const modal = {
				...config,
				open: (params: object) => {
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
	);
}
