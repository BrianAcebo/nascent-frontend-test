import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App'
import { AppWrapper } from './components/common/PageMeta'
import { ThemeProvider } from './context/ThemeContext'
import { SelectedCoinProvider } from './context/SelectedCoinContext'

createRoot(document.getElementById('root')!).render(
	<StrictMode>
		<ThemeProvider>
			<SelectedCoinProvider>
				<AppWrapper>
					<App />
				</AppWrapper>
			</SelectedCoinProvider>
		</ThemeProvider>
	</StrictMode>
)
