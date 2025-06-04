import { useState } from 'react'
import Select from '../form/Select'
import ComponentCard from '../common/ComponentCard'
import Label from '../form/Label'
import Input from '../form/input/InputField'
import Button from '../ui/button/Button'
import { useSelectedCoin } from '../../context/SelectedCoinContext'
import { X } from 'lucide-react'

type ErrorType = {
	[key: string]: {
		hasError: boolean
		hint?: string
	}
}

export const OrderForm: React.FC = () => {
	const { selectedCoin } = useSelectedCoin()
	const [activeTab, setActiveTab] = useState<'buy' | 'sell'>('buy')
	const [hasErrors, setHasErrors] = useState<boolean>(false)
	const [errors, setErrors] = useState<ErrorType>({
		limit: {
			hasError: false
		},
		amount: {
			hasError: false
		}
	})
	const [orderType, setOrderType] = useState<'limit' | 'market'>('limit')
	const [openOrderForm, setOpenOrderForm] = useState<boolean>(false)

	const typeOptions = [
		{ value: 'limit', label: 'Limit' },
		{ value: 'market', label: 'Market' }
	]

	const executionOptions = [
		{ value: 'taker', label: 'Allow taker' },
		{ value: 'post', label: 'Post Only' }
	]

	const timeOptions = [
		{ value: 'canceled', label: 'Good til cancelled' },
		{ value: 'time', label: 'Good til time' },
		{ value: 'immediate', label: 'Immediate or cancel' }
	]

	const handleSelectChange = (value: string) => {
		console.log('Selected value:', value)
	}

	const handleSelectOrderTypeChange = (value: string) => {
		if (value !== 'limit' && value !== 'market') return
		setOrderType(value as 'limit' | 'market')
	}

	const handleChangeTab = (name: 'buy' | 'sell') => {
		setActiveTab(name)
	}

	const validateInput = (e: React.InputEvent<HTMLInputElement>) => {
		const input = e.target as HTMLInputElement
		if (Number(input.value) < 0) {
			input.value = '0'

			setErrors((prev) => ({
				...prev,
				[input.name]: {
					hasError: true,
					hint: `${
						input.name.charAt(0).toUpperCase() + input.name.slice(1)
					} must be greater than 0`
				}
			}))

			setHasErrors(true)

			return
		}

		if (!parseInt(input.value)) {
			setErrors((prev) => ({
				...prev,
				[input.name]: {
					hasError: true,
					hint: `${
						input.name.charAt(0).toUpperCase() + input.name.slice(1)
					} must be greater than 0`
				}
			}))

			setHasErrors(true)

			return
		}

		setHasErrors(false)

		setErrors((prev) => ({
			...prev,
			[input.name]: {
				hasError: false,
				hint: ''
			}
		}))
	}

	return (
		<ComponentCard
			className={`
				lg:static fixed left-3 right-3 max-lg:dark:bg-gray-900/100 mx-auto
				bottom-6
				lg:h-auto
				max-h-[75vh] lg:max-h-none
				flex flex-col
				overflow-y-auto
				z-9999
				${openOrderForm ? 'top-[calc(var(--header-height)+10px)] h-[75vh]' : 'bottom-6'}
			`}
			title="Place Order"
		>
			<div
				className={`flex flex-col overflow-y-auto overscroll-contain space-y-6 h-full`}
			>
				{openOrderForm && (
					<button
						className="text-sm block mr-0 ml-auto text-white lg:hidden"
						onClick={() => setOpenOrderForm(false)}
					>
						<X className="w-5 h-5 text-current" />
					</button>
				)}

				<div className="flex justify-center items-center">
					<button
						onClick={() => {
							setOpenOrderForm(true)
							handleChangeTab('buy')
						}}
						className={`text-gray-500 border border-t-2 text-xs w-1/2 py-2 border-gray-200 dark:border-gray-800 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-300 transition-colors ${
							activeTab === 'buy'
								? 'bg-gray-400 dark:bg-gray-900 border-t-success-500 dark:border-t-success-500 text-white'
								: 'bg-gray-200 dark:bg-gray-800'
						}`}
					>
						BUY
					</button>
					<button
						onClick={() => {
							setOpenOrderForm(true)
							handleChangeTab('sell')
						}}
						className={`text-gray-500 border border-t-2 text-xs border-gray-200 w-1/2 py-2 dark:border-gray-800 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-300 transition-colors ${
							activeTab === 'sell'
								? 'bg-gray-400 dark:bg-gray-900 border-t-success-500 dark:border-t-success-500 text-white'
								: 'bg-gray-200 dark:bg-gray-800'
						}`}
					>
						SELL
					</button>
				</div>

				<div
					className={`space-y-6 lg:block ${openOrderForm ? 'block' : 'hidden'}`}
				>
					<Select
						options={typeOptions}
						onChange={handleSelectOrderTypeChange}
						className="dark:bg-dark-900"
					/>

					{orderType === 'limit' && (
						<div className="flex flex-col gap-2">
							<Label>Limit price</Label>
							<div className="relative">
								<Input
									placeholder="105056"
									type="number"
									className="pl-[80px] no-input-number-arrows"
									onInput={validateInput}
									error={errors.limit.hasError}
									hint={errors.limit.hint}
									name="limit"
								/>
								<span className="absolute text-xs left-0 top-1 border-r border-gray-200 px-3.5 py-3 text-gray-500 dark:border-gray-800 dark:text-gray-400">
									USDC
								</span>
							</div>
							<div className="grid grid-cols-4 gap-1">
								<button className="p-1.5 border border-gray-200 dark:border-gray-800 text-xs">
									Mid
								</button>
								<button className="p-1.5 border border-gray-200 dark:border-gray-800 text-xs">
									{activeTab === 'buy' ? 'Bid' : 'Ask'}
								</button>
								<button className="p-1.5 border border-gray-200 dark:border-gray-800 text-xs">
									1%
								</button>
								<button className="p-1.5 border border-gray-200 dark:border-gray-800 text-xs">
									5%
								</button>
							</div>
						</div>
					)}

					<div className="flex flex-col gap-2">
						<Label>Amount</Label>
						<div className="relative">
							<Input
								placeholder="0.0000000"
								type="number"
								className="pl-[80px] no-input-number-arrows"
								onInput={validateInput}
								error={errors.amount.hasError}
								hint={errors.amount.hint}
								name="amount"
							/>
							<span className="absolute text-xs left-0 top-0.5 border-r border-gray-200 px-3.5 py-3 text-gray-500 dark:border-gray-800 dark:text-gray-400">
								{selectedCoin}
							</span>
						</div>
						<div className="grid grid-cols-3 gap-1">
							<button className="p-1.5 border border-gray-200 dark:border-gray-800 text-xs">
								25%
							</button>
							<button className="p-1.5 border border-gray-200 dark:border-gray-800 text-xs">
								50%
							</button>
							<button className="p-1.5 border border-gray-200 dark:border-gray-800 text-xs">
								MAX
							</button>
						</div>
					</div>

					<div className="flex justify-between items-center">
						<p className="text-xs text-gray-700 dark:text-gray-400">
							{activeTab === 'buy' ? 'Pay with' : 'Add cash to'}
						</p>
						<p className="text-xs">USDC</p>
					</div>

					{orderType === 'limit' && (
						<>
							<Select
								options={executionOptions}
								onChange={handleSelectChange}
								className="dark:bg-dark-900"
							/>

							<Select
								options={timeOptions}
								onChange={handleSelectChange}
								className="dark:bg-dark-900"
							/>
						</>
					)}

					{orderType === 'market' && (
						<>
							<div className="flex justify-between items-center">
								<p className="text-xs text-gray-700 dark:text-gray-400">
									Slippage
								</p>
								<p className="text-xs">--</p>
							</div>

							<div className="flex justify-between items-center">
								<p className="text-xs text-gray-700 dark:text-gray-400">
									Average price
								</p>
								<p className="text-xs">--</p>
							</div>
						</>
					)}

					<div className="flex justify-between items-center">
						<p className="text-xs text-gray-700 dark:text-gray-400">Subtotal</p>
						<p className="text-xs">--</p>
					</div>

					<div className="flex justify-between items-center">
						<p className="text-xs text-gray-700 dark:text-gray-400">Fee</p>
						<p className="text-xs">--</p>
					</div>

					<div className="flex justify-between items-center">
						<p className="text-sm ">Total</p>
						<p className="text-xs">--</p>
					</div>

					<Button
						disabled={hasErrors}
						className="mx-auto block"
					>
						Add funds to continue
					</Button>
				</div>
			</div>
		</ComponentCard>
	)
}
