import { useEffect, useState } from 'react'
import ComponentCard from '../common/ComponentCard'
import { generateRandomTimes } from '../../utils'

type Orders = {
	bids: [number, number][] // [price, amount]
	asks: [number, number][]
}

export const OrderBook = ({ selectedCoin }: { selectedCoin: string }) => {
	const [activeTab, setActiveTab] = useState<'orders' | 'trades'>('orders')
	const [orders, setOrders] = useState<Orders>({ bids: [], asks: [] })
	const [loading, setLoading] = useState(true)
	const [error, setError] = useState<string | null>(null)

	useEffect(() => {
		if (!selectedCoin) return

		const fetchOrders = async () => {
			try {
				setLoading(true)
				const res = await fetch(`/orderbook/${selectedCoin}`)
				if (!res.ok) throw new Error('Failed to fetch orders')
				const data = await res.json()
				setOrders(data)
			} catch (err) {
				setError((err as Error).message)
			} finally {
				setLoading(false)
			}
		}

		fetchOrders()
	}, [selectedCoin])

	return (
		<ComponentCard
			title="Orders"
			className="w-full"
		>
			<div className="flex gap-5 mb-4">
				<button
					onClick={() => setActiveTab('orders')}
					className={`text-sm font-semibold ${
						activeTab === 'orders'
							? 'text-brand-500 dark:text-brand-400 border-b border-brand-400'
							: 'text-gray-500 dark:text-gray-400'
					}`}
				>
					Order Book
				</button>

				<button
					onClick={() => setActiveTab('trades')}
					className={`text-sm font-semibold ${
						activeTab === 'trades'
							? 'text-brand-500 dark:text-brand-400 border-b border-brand-400'
							: 'text-gray-500 dark:text-gray-400'
					}`}
				>
					Trade History
				</button>
			</div>

			{loading && <p className="text-sm text-gray-500">Loading...</p>}
			{error && <p className="text-sm text-red-500">Error: {error}</p>}

			{!loading && !error && activeTab === 'orders' && (
				<>
					{orders.bids.length === 0 ? (
						<p>No order history yet</p>
					) : (
						<div className="grid grid-cols-2 md:gap-6 gap-2 text-xs font-mono">
							<div>
								<h3 className="font-semibold mb-1">Bids</h3>
								<ul className="space-y-1 max-h-96 overflow-y-auto custom-scrollbar overscroll-contain">
									{orders.bids.map(([price, amount], index) => (
										<li
											key={`bid-${index}`}
											className="flex justify-between"
										>
											<span>{Number(amount).toFixed(8)}</span>
											<span>{Number(price).toFixed(2)}</span>
										</li>
									))}
								</ul>
							</div>
							<div>
								<h3 className="text-green-400 font-semibold mb-1">Asks</h3>
								<ul className="space-y-1 max-h-96 overflow-y-auto custom-scrollbar overscroll-contain">
									{orders.asks.map(([price, amount], index) => (
										<li
											key={`bid-${index}`}
											className="flex justify-between text-green-400"
										>
											<span>{Number(amount).toFixed(8)}</span>
											<span>{Number(price).toFixed(2)}</span>
										</li>
									))}
								</ul>
							</div>
						</div>
					)}
				</>
			)}

			{!loading && !error && activeTab === 'trades' && (
				<>
					{orders.bids.length === 0 ? (
						<p>No trade history yet</p>
					) : (
						<div className="grid grid-cols-3 md:gap-6 gap-2 text-xs font-mono">
							<div>
								<h3 className="font-semibold mb-1">Bids</h3>
								<ul className="space-y-1 max-h-96 overflow-y-auto custom-scrollbar overscroll-contain">
									{orders.bids.map(([price, amount], index) => (
										<li
											key={`bid-${index}`}
											className="flex justify-between"
										>
											<span>{Number(amount).toFixed(8)}</span>
											<span>{Number(price).toFixed(2)}</span>
										</li>
									))}
								</ul>
							</div>

							<div>
								<h3 className="text-green-400 font-semibold mb-1">Asks</h3>
								<ul className="space-y-1 max-h-96 overflow-y-auto custom-scrollbar overscroll-contain">
									{orders.asks.map(([price, amount], index) => (
										<li
											key={`ask-${index}`}
											className="flex justify-between text-green-400"
										>
											<span>{Number(amount).toFixed(8)}</span>
											<span>{Number(price).toFixed(2)}</span>
										</li>
									))}
								</ul>
							</div>

							<div>
								<h3 className="text-red-400 font-semibold mb-1">Time</h3>
								<ul className="space-y-1 max-h-96 overflow-y-auto custom-scrollbar overscroll-contain">
									{generateRandomTimes(orders.bids.length).map(
										(time, index) => (
											<li
												key={`time-${index}`}
												className="flex justify-start text-red-400"
											>
												<span>{time}</span>
											</li>
										)
									)}
								</ul>
							</div>
						</div>
					)}
				</>
			)}
		</ComponentCard>
	)
}
