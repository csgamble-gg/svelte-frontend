const config = {
	// content: ['./src/**/*.{html,js,svelte,ts}', "./src/**/**/*.svelte"],
	content: ['./src/**/*.{html,js,svelte,ts}', './src/**/**/*.svelte'],
	purge: ['./src/**/*.svelte', './src/**/*.css', './src/**/**/*.svelte'],
	mode: 'jit',
	theme: {
		extend: {
			colors: {
				primaryBg: '#141826',
				foreground: '#242B43',
				lightblue: '#9CBBFF',
				lightBlue10: 'rgba(156, 187, 255, 0.1)',
				brown: '#574600'
			},
			fontFamily: {
				sans: ['Poppins']
			},
			borderRadius: {
				large: '16px'
			}
		},
		backgroundImage: {
			purplePlanet: 'url(\'/assets/BluePlanet.svg\')'
		}
	},

	plugins: []
};

module.exports = config;
