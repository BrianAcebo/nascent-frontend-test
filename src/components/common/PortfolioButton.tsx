import { SquareArrowOutUpRight } from 'lucide-react'

export const PortfolioButton: React.FC = () => {
	return (
		<a
			target="_blank"
			rel="noopener noreferrer"
			href="https://brianacebo.com"
			className="relative flex items-center justify-center text-gray-500 transition-colors bg-white border border-gray-200 rounded-full hover:text-dark-900 h-11 w-11 hover:bg-gray-100 hover:text-gray-700 dark:border-gray-800 dark:bg-gray-900 dark:text-gray-400 dark:hover:bg-gray-800 dark:hover:text-white"
		>
			<SquareArrowOutUpRight className="size-4 text-current" />
		</a>
	)
}
