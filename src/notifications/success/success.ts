const config = ({ message, title }) => ({
	body: message,
	title: title || 'Success',
	icon: 'success',
	type: 'success'
});

export default config;
