import { browser } from '$app/env';

export const cachedRoutes = new Set(
	browser ? [window.location.pathname] : []
);
