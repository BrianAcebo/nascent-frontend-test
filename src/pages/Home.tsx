import { CandlestickChart } from '../components/orders/CandlestickChart'
import { OrderBook } from '../components/orders/OrderBook'
import { OrderForm } from '../components/orders/OrderForm'

export default function Home() {
	return (
		<>
			<div className="flex lg:flex-row flex-col gap-6 w-full relative lg:p-0 pb-48">
				<div className="lg:w-4/6 w-full flex gap-6 flex-wrap">
					<CandlestickChart />
					<OrderBook />
				</div>
				<div className="lg:sticky fixed lg:w-2/6 w-full overflow-auto custom-scrollbar lg:h-[calc(var(--screen-visible)-48px)] top-[calc(var(--header-height)+24px)]">
					<OrderForm />
				</div>
			</div>
		</>
	)
}
