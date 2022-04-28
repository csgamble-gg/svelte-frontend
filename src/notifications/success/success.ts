import type { ConfigProps } from '../index';

const config = ({
	message,
	title
}: ConfigProps): {
	body: string;
	title: string;
	icon: string;
	type: string;
} => ({
	body: message,
	title: title || 'Success',
	icon: 'success',
	type: 'success'
});

export default config;
