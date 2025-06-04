import { CandlestickChart } from '../components/orders/CandlestickChart'
import { OrderForm } from '../components/orders/OrderForm'

export default function Home() {
	return (
		<>
			<div className="flex lg:flex-row flex-col gap-6 w-full relative lg:p-0 pb-64">
				<div className="lg:w-4/6 w-full">
					<CandlestickChart />
				</div>
				<div className="lg:sticky lg:w-2/6 w-full overflow-auto custom-scrollbar h-[calc(var(--screen-visible)-48px)] top-[calc(var(--header-height)+24px)]">
					<OrderForm />
				</div>
			</div>
		</>
	)
}
