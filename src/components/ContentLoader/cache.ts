import { browser } from '$app/env';

export let cachedRoutes = new Set(
	browser ? [window.location.pathname] : []
);
