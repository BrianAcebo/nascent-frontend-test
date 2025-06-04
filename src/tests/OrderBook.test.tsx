// OrderBook.test.tsx
import { render, screen, fireEvent, waitFor } from '@testing-library/react'
import { OrderBook } from '../components/orders/OrderBook'
import '@testing-library/jest-dom'

// Enable fake timers
beforeEach(() => {
	jest.useFakeTimers()
	global.fetch = jest.fn(
		() =>
			new Promise((resolve) => {
				setTimeout(() => {
					resolve({
						ok: true,
						json: () =>
							Promise.resolve({
								bids: [
									[10000, 0.5],
									[9990, 1.2]
								],
								asks: [
									[10100, 0.3],
									[10200, 0.8]
								]
							})
					})
				}, 3000)
			})
	) as unknown as typeof fetch
})

afterEach(() => {
	jest.useRealTimers()
	jest.clearAllMocks()
})

test('renders order book and allows switching to trade history', async () => {
	render(<OrderBook selectedCoin="BTC" />)

	// Initially shows loading
	expect(screen.getByText(/loading/i)).toBeInTheDocument()

	// Fast-forward 3s to simulate fetch delay
	jest.advanceTimersByTime(3000)

	// Wait for updated UI
	await waitFor(() => {
		expect(screen.getByText('Bids')).toBeInTheDocument()
		expect(screen.getByText('Asks')).toBeInTheDocument()
	})

	// Switch tab
	fireEvent.click(screen.getByText(/Trade History/i))

	// Confirm switch
	expect(await screen.findByText(/Time/i)).toBeInTheDocument()
})
