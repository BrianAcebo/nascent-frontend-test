import { type ClassValue, clsx } from 'clsx'
import { twMerge } from 'tailwind-merge'

// Merge tailwind classes
export const cn = (...inputs: ClassValue[]) => {
	return twMerge(clsx(inputs))
}

// Generates random times in sequential order
export const generateRandomTimes = (amount: number) => {
	const times = []

	for (let i = 0; i < amount; i++) {
		const hour = Math.floor(Math.random() * 24)
		const minute = Math.floor(Math.random() * 60)
		const timeStr =
			(hour < 10 ? '0' + hour : hour) +
			':' +
			(minute < 10 ? '0' + minute : minute)

		times.push({ hour, minute, timeStr })
	}

	// Sort by total minutes since midnight
	times.sort((a, b) => {
		const totalA = a.hour * 60 + a.minute
		const totalB = b.hour * 60 + b.minute
		return totalA - totalB
	})

	// Return just the formatted time strings
	return times.map((t) => t.timeStr)
}
