import './index.css'
import App from './App'
import { AppWrapper } from './components/common/PageMeta'
import { ThemeProvider } from './context/ThemeContext'
import { SelectedCoinProvider } from './context/SelectedCoinContext'
import { render, screen } from '@testing-library/react'

test('renders app component', () => {
	render(
		<ThemeProvider>
			<SelectedCoinProvider>
				<AppWrapper>
					<App />
				</AppWrapper>
			</SelectedCoinProvider>
		</ThemeProvider>
	)
	const linkElement = screen.getByText(/learn react/i)
	expect(linkElement).toBeInTheDocument()
})
