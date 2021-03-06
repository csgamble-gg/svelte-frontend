const config = {
	content: [
		'./src/**/*.{html,js,svelte,ts}',
		'./src/**/**/*.svelte',
		'./src/**/**/**/*.svelte',
		'./src/**/**/**/**/*.svelte'
	],
	mode: 'jit',
	theme: {
		extend: {
			colors: {
				primaryBg: '#141826',
				foreground: '#242B43',
				lightblue: '#9CBBFF',
				lightBlue10: 'rgba(156, 187, 255, 0.1)',
				lightBlue30: 'rgba(156, 187, 255, 0.3)',
				lightBlue70: 'rgba(156, 187, 255, 0.7)',
				brown: '#574600',
				darkBlue: '#0C0F1A',
				dazzledBlue: '#3A5784',
				yellowGold: '#FFEB71',
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
