import { useState } from 'react'
import { Dropdown } from '../ui/dropdown/Dropdown'
import { useSelectedCoin } from '../../context/SelectedCoinContext'
import Button from '../ui/button/Button'

export default function SelectCoinDropdown() {
	const [isOpen, setIsOpen] = useState(false)
	const { selectedCoin, handleSelectCoin } = useSelectedCoin()

	function toggleDropdown() {
		setIsOpen(!isOpen)
	}

	function closeDropdown() {
		setIsOpen(false)
	}

	return (
		<div className="relative">
			<Button
				className="h-11 w-11 text-xs"
				onClick={toggleDropdown}
			>
				{selectedCoin}
			</Button>
			<Dropdown
				isOpen={isOpen}
				onClose={closeDropdown}
				className="absolute mt-[17px] min-w-36 flex flex-col rounded-2xl border border-gray-200 bg-white p-3 shadow-theme-lg dark:border-gray-800 dark:bg-gray-900 sm:w-[361px] left-0"
			>
				<button
					onClick={() => {
						toggleDropdown()
						handleSelectCoin('BTC')
					}}
					className="block px-4 py-2 mt-3 text-sm font-medium text-center text-gray-700 bg-white border border-gray-300 rounded-lg hover:bg-gray-100 dark:border-gray-700 dark:bg-gray-800 dark:text-gray-400 dark:hover:bg-gray-700"
				>
					BTC
				</button>

				<button
					onClick={() => {
						toggleDropdown()
						handleSelectCoin('ETH')
					}}
					className="block px-4 py-2 mt-3 text-sm font-medium text-center text-gray-700 bg-white border border-gray-300 rounded-lg hover:bg-gray-100 dark:border-gray-700 dark:bg-gray-800 dark:text-gray-400 dark:hover:bg-gray-700"
				>
					ETH
				</button>
			</Dropdown>
		</div>
	)
}
