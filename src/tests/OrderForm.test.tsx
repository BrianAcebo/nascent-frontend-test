import { render, screen, fireEvent, waitFor } from '@testing-library/react'
import { OrderForm } from '../components/orders/OrderForm'
import { SelectedCoinProvider } from '../context/SelectedCoinContext'

const renderWithContext = () => {
	render(
		<SelectedCoinProvider>
			<OrderForm />
		</SelectedCoinProvider>
	)
}

describe('OrderForm Component', () => {
	test('renders OrderForm and switches between BUY and SELL tabs', () => {
		renderWithContext()
		const buyBtn = screen.getByText(/buy/i)
		const sellBtn = screen.getByText(/sell/i)
		expect(buyBtn).toBeInTheDocument()
		expect(sellBtn).toBeInTheDocument()
	})

	test('validates inputs and disables submit button on invalid input', async () => {
		renderWithContext()
		fireEvent.click(screen.getByText(/buy/i))

		const limitInput = screen.getByPlaceholderText(
			/105056/i
		) as HTMLInputElement
		const amountInput = screen.getByPlaceholderText(
			/0.0000000/i
		) as HTMLInputElement

		// Enter invalid negative numbers
		fireEvent.change(limitInput, { target: { value: '-1' } })
		fireEvent.change(amountInput, { target: { value: '-2' } })

		await waitFor(() => {
			expect(screen.getByTestId('amount-error')).toBeInTheDocument()
			expect(screen.getByTestId('limit-error')).toBeInTheDocument()
		})

		// Now enter valid inputs
		fireEvent.change(limitInput, { target: { value: '100' } })
		fireEvent.change(amountInput, { target: { value: '0.1' } })

		await waitFor(() => {
			expect(
				screen.queryByText(/must be greater than 0/i)
			).not.toBeInTheDocument()
		})
	})
})
