const config = ({ message, title }) => ({
	body: message,
	title: title || 'Error',
	icon: 'error',
	type: 'error'
});

export default config;
