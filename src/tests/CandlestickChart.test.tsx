import { render, screen, fireEvent } from '@testing-library/react'
import { CandlestickChart } from '../components/orders/CandlestickChart'
import { ThemeProvider } from '../context/ThemeContext'

// Mock ApexCharts to avoid rendering issues in jsdom
jest.mock('react-apexcharts', () => {
	return () => <div data-testid="mock-apex-chart">Mock ApexChart</div>
})

const renderWithContext = () => {
	render(
		<ThemeProvider>
			<CandlestickChart />
		</ThemeProvider>
	)
}

describe('CandlestickChart Component', () => {
	it('renders CandlestickChart with title and chart', () => {
		renderWithContext()

		expect(screen.getByText(/Day View/i)).toBeInTheDocument()
		expect(screen.getByTestId('mock-apex-chart')).toBeInTheDocument()
	})

	it('renders tab buttons and switches active tab', () => {
		renderWithContext()

		const priceButton = screen.getByText(/Price Chart/i)
		const depthButton = screen.getByText(/Depth Chart/i)

		// Initially, 'price' tab is active
		expect(priceButton).toHaveClass('menu-item-active')
		expect(depthButton).toHaveClass('menu-item-inactive')

		// Switch to 'depth' tab
		fireEvent.click(depthButton)
		expect(priceButton).toHaveClass('menu-item-inactive')
		expect(depthButton).toHaveClass('menu-item-active')
	})
})
