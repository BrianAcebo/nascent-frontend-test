// tailwind.config.js
const plugin = require('tailwindcss/plugin')

module.exports = {
	content: ['./src/**/*.{html,js,jsx,ts,tsx,svelte}'],
	theme: {
		extend: {
			height: {
				'header-height': 'var(--header-height)',
				'screen-visible': 'var(--screen-visible)'
			},
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
					50: '#cea6ff',
					100: '#c494ff',
					200: '#ba82ff',
					300: '#b070ff',
					400: '#a65eff',
					500: '#9d4dff',
					600: '#8d45e5',
					700: '#7d3dcc',
					800: '#6d35b2',
					900: '#5e2e99',
					950: '#4e267f'
				},
				'blue-light': {
					25: '#f5fbff',
					50: '#f0f9ff',
					100: '#e0f2fe',
					200: '#b9e6fe',
					300: '#7cd4fd',
					400: '#36bffa',
					500: '#0ba5ec',
					600: '#0086c9',
					700: '#026aa2',
					800: '#065986',
					900: '#0b4a6f',
					950: '#062c41'
				},
				gray: {
					25: '#fcfcfd',
					50: '#f9fafb',
					100: '#f2f4f7',
					200: '#e4e7ec',
					300: '#d0d5dd',
					400: '#98a2b3',
					500: '#667085',
					600: '#475467',
					700: '#344054',
					800: '#1d2939',
					900: '#101828',
					950: '#0c111d',
					dark: '#1a2231'
				},
				orange: {
					25: '#fffaf5',
					50: '#fff6ed',
					100: '#ffead5',
					200: '#fddcab',
					300: '#feb273',
					400: '#fd853a',
					500: '#fb6514',
					600: '#ec4a0a',
					700: '#c4320a',
					800: '#9c2a10',
					900: '#7e2410',
					950: '#511c10'
				},
				success: {
					25: '#f6fef9',
					50: '#ecfdf3',
					100: '#d1fadf',
					200: '#a6f4c5',
					300: '#6ce9a6',
					400: '#32d583',
					500: '#12b76a',
					600: '#039855',
					700: '#027a48',
					800: '#05603a',
					900: '#054f31',
					950: '#053321'
				},
				error: {
					25: '#fffbfa',
					50: '#fef3f2',
					100: '#fee4e2',
					200: '#fecdca',
					300: '#fda29b',
					400: '#f97066',
					500: '#f04438',
					600: '#d92d20',
					700: '#b42318',
					800: '#912018',
					900: '#7a271a',
					950: '#55160c'
				},
				warning: {
					25: '#fffcf5',
					50: '#fffaeb',
					100: '#fef0c7',
					200: '#fedf89',
					300: '#fec84b',
					400: '#fdb022',
					500: '#f79009',
					600: '#dc6803',
					700: '#b54708',
					800: '#93370d',
					900: '#7a2e0e',
					950: '#4e1d09'
				},
				theme: {
					pink: { 500: '#ee46bc' },
					purple: { 500: '#7a5af8' }
				},
				black: {
					100: '#444444',
					300: '#221f1f',
					400: '#111111',
					800: '#0c0c0c',
					900: '#000000'
				},
				white: '#ffffff',
				transparent: 'transparent',
				current: 'currentColor'
			},
			boxShadow: {
				'theme-md':
					'0px 4px 8px -2px rgba(16, 24, 40, 0.1), 0px 2px 4px -2px rgba(16, 24, 40, 0.06)',
				'theme-lg':
					'0px 12px 16px -4px rgba(16, 24, 40, 0.08), 0px 4px 6px -2px rgba(16, 24, 40, 0.03)',
				'theme-sm':
					'0px 1px 3px 0px rgba(16, 24, 40, 0.1), 0px 1px 2px 0px rgba(16, 24, 40, 0.06)',
				'theme-xs': '0px 1px 2px 0px rgba(16, 24, 40, 0.05)',
				'theme-xl':
					'0px 20px 24px -4px rgba(16, 24, 40, 0.08), 0px 8px 8px -4px rgba(16, 24, 40, 0.03)',
				datepicker: '-5px 0 0 #262d3c, 5px 0 0 #262d3c',
				'focus-ring': '0px 0px 0px 4px rgba(70, 95, 255, 0.12)',
				'slider-navigation':
					'0px 1px 2px 0px rgba(16, 24, 40, 0.1), 0px 1px 3px 0px rgba(16, 24, 40, 0.1)',
				tooltip:
					'0px 4px 6px -2px rgba(16, 24, 40, 0.05), -8px 0px 20px 8px rgba(16, 24, 40, 0.05)'
			},
			dropShadow: {
				'4xl':
					'0 35px 35px rgba(0, 0, 0, 0.25), 0 45px 65px rgba(0, 0, 0, 0.15)'
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
	darkMode: 'class'
}
