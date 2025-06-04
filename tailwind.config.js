// tailwind.config.js
const plugin = require('tailwindcss/plugin')

module.exports = {
	content: ['./src/**/*.{html,js,jsx,ts,tsx,svelte}'], // adjust paths as needed
	theme: {
		extend: {
			keyframes: {
				'slide-up': {
					'0%': { transform: 'translateY(50%)', opacity: 0 },
					'100%': { transform: 'translateY(0)', opacity: 1 }
				}
			},
			animation: {
				'slide-up': 'slide-up 0.3s ease-out'
			},
			fontFamily: {
				outfit: ['Outfit', 'sans-serif']
			},
			screens: {
				'2xsm': '375px',
				xsm: '425px',
				'3xl': '2000px'
			},
			colors: {
				brand: {
					25: '#f2f7ff',
					50: '#ecf3ff',
					100: '#dde9ff',
					200: '#c2d6ff',
					300: '#9cb9ff',
					400: '#7592ff',
					500: '#465fff',
					600: '#3641f5',
					700: '#2a31d8',
					800: '#252dae',
					900: '#262e89',
					950: '#161950'
				}
				// Repeat for blue-light, gray, orange, success, error, warning...
			},
			boxShadow: {
				'theme-md':
					'0px 4px 8px -2px rgba(16, 24, 40, 0.1), 0px 2px 4px -2px rgba(16, 24, 40, 0.06)',
				'theme-lg':
					'0px 12px 16px -4px rgba(16, 24, 40, 0.08), 0px 4px 6px -2px rgba(16, 24, 40, 0.03)'
				// etc...
			},
			zIndex: {
				1: '1',
				9: '9',
				99: '99',
				999: '999',
				9999: '9999',
				99999: '99999',
				999999: '999999'
			}
		}
	},
	plugins: [
		plugin(function ({ addUtilities }) {
			addUtilities({
				'.no-scrollbar': {
					'scrollbar-width': 'none',
					'-ms-overflow-style': 'none'
				},
				'.no-scrollbar::-webkit-scrollbar': {
					display: 'none'
				},
				'.custom-scrollbar::-webkit-scrollbar': {
					width: '6px',
					height: '6px'
				},
				'.custom-scrollbar::-webkit-scrollbar-thumb': {
					'background-color': '#d0d5dd',
					'border-radius': '9999px'
				}
			})
		})
	],
	darkMode: 'class' // Already default
}
