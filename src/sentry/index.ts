import { browser, dev } from '$app/env';
import * as Sentry from '@sentry/browser';
import { Integrations } from '@sentry/tracing';

if (browser && dev === false) {
	Sentry.init({
		dsn: 'https://5c82ca5fd735468c8054b0d025ebf59a@o1123688.ingest.sentry.io/6161830',
		integrations: [new Integrations.BrowserTracing()],
		tracesSampleRate: 1.0
	});
}
