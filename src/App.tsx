import { BrowserRouter as Router, Routes, Route } from 'react-router'
import AppLayout from './layout/AppLayout'
import NotFound from './pages/Error/404'
import Home from './pages/Home'

export default function App() {
	return (
		<>
			<Router>
				<Routes>
					{/* Dashboard Layout */}
					<Route element={<AppLayout />}>
						<Route
							index
							path="/"
							element={<Home />}
						/>
					</Route>

					{/* Fallback Route */}
					<Route
						path="*"
						element={<NotFound />}
					/>
				</Routes>
			</Router>
		</>
	)
}
