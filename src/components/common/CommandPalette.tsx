import { useEffect, useState, useRef } from 'react'
import { Link } from 'react-router'
import {
	X,
	House,
	ChartPie,
	Newspaper,
	Compass,
	ChevronsRight,
	SquareDivide
} from 'lucide-react'

type NavItem = {
	name: string
	icon: React.ReactNode
	path?: string
	subItems?: { name: string; path: string }[]
}

// Main navigation items
const navItems: NavItem[] = [
	{
		icon: <House />,
		name: 'Home',
		path: '/'
	},
	{
		icon: <ChartPie />,
		name: 'My Assets',
		path: '#'
	},
	{
		icon: <Newspaper />,
		name: 'Transactions',
		path: '#'
	},
	{
		icon: <Compass />,
		name: 'Explore',
		path: '#'
	},
	{
		icon: <ChevronsRight />,
		name: 'Derivatives',
		path: '#'
	},
	{
		icon: <SquareDivide />,
		name: 'Taxes',
		path: '#'
	}
]

export default function CommandPalette() {
	const [isOpen, setIsOpen] = useState<boolean>(false)
	const inputRef = useRef<HTMLInputElement>(null)

	useEffect(() => {
		const down = (e: KeyboardEvent) => {
			// Toggle the menu when ⌘K is pressed
			if (e.key === 'k' && (e.metaKey || e.ctrlKey)) {
				e.preventDefault()
				setIsOpen((open) => !open)
			}

			// Close the menu when Escape is pressed
			if (e.key === 'Escape') {
				e.preventDefault()
				setIsOpen(false)
			}
		}

		document.addEventListener('keydown', down)
		return () => document.removeEventListener('keydown', down)
	}, [])

	// Focus the input when the component mounts
	useEffect(() => {
		if (isOpen && inputRef.current) {
			inputRef.current.focus()
		}
	}, [isOpen])

	const handleCloseDialog = () => {
		setIsOpen(false)
	}

	const handleOverlayClick = (e: React.MouseEvent<HTMLDivElement>) => {
		const nativeEvent = e.nativeEvent as MouseEvent
		if (
			Array.from(nativeEvent.composedPath()).find(
				(el) => el instanceof HTMLDialogElement
			)
		) {
			// If the click is inside the dialog, do not close it
			return
		}

		handleCloseDialog()
	}

	if (!isOpen) return null

	return (
		<div
			onClick={handleOverlayClick}
			className="fixed inset-0 z-9999 flex items-center justify-center bg-gray-500/60"
		>
			<dialog
				open={isOpen}
				className="flex h-64 overflow-auto custom-scrollbar max-w-lg flex-col animate-slide-up rounded-2xl border border-gray-200 bg-white p-3 shadow-theme-lg dark:border-gray-800 dark:bg-gray-900  w-full space-y-4"
			>
				<button
					className="text-sm block mr-0 ml-auto text-white"
					onClick={handleCloseDialog}
				>
					<X className="w-5 h-5 text-current" />
				</button>

				<form className="mx-auto mb-3">
					<div className="relative">
						<span className="absolute -translate-y-1/2 pointer-events-none left-4 top-1/2">
							<svg
								className="fill-gray-500 dark:fill-gray-400"
								width="20"
								height="20"
								viewBox="0 0 20 20"
								fill="none"
								xmlns="http://www.w3.org/2000/svg"
							>
								<path
									fillRule="evenodd"
									clipRule="evenodd"
									d="M3.04175 9.37363C3.04175 5.87693 5.87711 3.04199 9.37508 3.04199C12.8731 3.04199 15.7084 5.87693 15.7084 9.37363C15.7084 12.8703 12.8731 15.7053 9.37508 15.7053C5.87711 15.7053 3.04175 12.8703 3.04175 9.37363ZM9.37508 1.54199C5.04902 1.54199 1.54175 5.04817 1.54175 9.37363C1.54175 13.6991 5.04902 17.2053 9.37508 17.2053C11.2674 17.2053 13.003 16.5344 14.357 15.4176L17.177 18.238C17.4699 18.5309 17.9448 18.5309 18.2377 18.238C18.5306 17.9451 18.5306 17.4703 18.2377 17.1774L15.418 14.3573C16.5365 13.0033 17.2084 11.2669 17.2084 9.37363C17.2084 5.04817 13.7011 1.54199 9.37508 1.54199Z"
									fill=""
								/>
							</svg>
						</span>
						<input
							ref={inputRef}
							type="text"
							placeholder="Search..."
							className="dark:bg-dark-900 h-11 w-full rounded-lg border border-gray-200 bg-transparent py-2.5 pl-12 pr-14 text-sm text-gray-800 shadow-theme-xs placeholder:text-gray-400 focus:border-brand-300 focus:outline-hidden focus:ring-3 focus:ring-brand-500/10 dark:border-gray-800 dark:bg-gray-900 dark:bg-white/[0.03] dark:text-white/90 dark:placeholder:text-white/30 dark:focus:border-brand-800 lg:w-[430px]"
						/>
					</div>
				</form>

				<ul className="mx-auto w-full lg:w-[430px]">
					<p className="text-gray-500 dark:text-gray-400 block mb-2">Pages</p>
					{navItems.map((item, i) => (
						<li key={i}>
							<Link
								to={item.path ?? '#'}
								className="menu-item group menu-item-inactive text-sm -ml-2"
							>
								<span className="menu-item-icon-size menu-item-icon-inactive">
									{item.icon}
								</span>
								<span className="menu-item-text">{item.name}</span>
							</Link>
						</li>
					))}
				</ul>
			</dialog>
		</div>
	)
}
