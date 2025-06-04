import { createContext, useContext, useState } from 'react'

type SelectedCoinContextType = {
	selectedCoin: 'BTC' | 'ETH'
	setSelectedCoin: (selectedCoin: 'BTC' | 'ETH') => void
	handleSelectCoin: (coin: 'BTC' | 'ETH') => void
}

const SelectedCoinContext = createContext<SelectedCoinContextType | undefined>(
	undefined
)

export const useSelectedCoin = () => {
	const context = useContext(SelectedCoinContext)
	if (!context) {
		throw new Error(
			'useSelectedCoin must be used within a SelectedCoinProvider'
		)
	}
	return context
}

export const SelectedCoinProvider: React.FC<{ children: React.ReactNode }> = ({
	children
}) => {
	const [selectedCoin, setSelectedCoin] = useState<'BTC' | 'ETH'>('BTC')

	const handleSelectCoin = (coin: 'BTC' | 'ETH') => {
		setSelectedCoin(coin)
	}

	return (
		<SelectedCoinContext.Provider
			value={{
				selectedCoin,
				setSelectedCoin,
				handleSelectCoin
			}}
		>
			{children}
		</SelectedCoinContext.Provider>
	)
}
