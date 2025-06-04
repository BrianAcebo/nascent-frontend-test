import { type ClassValue, clsx } from 'clsx'
import { twMerge } from 'tailwind-merge'

// Merge tailwind classes
export const cn = (...inputs: ClassValue[]) => {
	return twMerge(clsx(inputs))
}
