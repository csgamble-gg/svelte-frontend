const config = ({ message, title }) => ({
	body: message,
	title: title || 'Info',
	icon: 'info',
	type: 'info'
});

export default config;
