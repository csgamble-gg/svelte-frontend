const config = {
	content: ['./src/**/*.{html,js,svelte,ts}', './src/**/**/*.svelte'],
	purge: ['./src/**/*.svelte'],
	mode: 'jit',
	theme: {
		extend: {
			colors: {
				primaryBg: '#141826',
				foreground: '#242B43',
				lightblue: '#9CBBFF',
				lightBlue10: 'rgba(156, 187, 255, 0.1)',
				brown: '#574600',
				darkBlue: '#0C0F1A',
				dazzledBlue: '#3A5784',
				cryptos: {
					btc: '#f7931a',
					eth: '#627eea'
				},
				card: {
					light: '#181D2D',
					dark: '#131621'
				}
			},
			fontFamily: {
				sans: ['Poppins']
			},
			borderRadius: {
				large: '16px'
			}
		},
		backgroundImage: {
			purplePlanet: "url('/assets/BluePlanet.svg')"
		}
	},

	plugins: []
};

module.exports = config;
