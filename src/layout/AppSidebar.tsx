import { useCallback, useEffect, useRef, useState } from 'react'
import { Link, useLocation } from 'react-router'
import { useSidebar } from '../context/SidebarContext'
import {
	House,
	ChartPie,
	Newspaper,
	Compass,
	ChevronsRight,
	SquareDivide,
	EllipsisVertical
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
	},
	{
		icon: <EllipsisVertical />,
		name: 'More',
		path: '#'
	}
]

const othersItems: NavItem[] = []

const AppSidebar: React.FC = () => {
	const { isExpanded, isMobileOpen } = useSidebar()
	const location = useLocation()

	const [openSubmenu, setOpenSubmenu] = useState<{
		type: 'main' | 'others'
		index: number
	} | null>(null)
	const [subMenuHeight, setSubMenuHeight] = useState<Record<string, number>>({})
	const subMenuRefs = useRef<Record<string, HTMLDivElement | null>>({})

	// const isActive = (path: string) => location.pathname === path;
	const isActive = useCallback(
		(path: string) => location.pathname === path,
		[location.pathname]
	)

	useEffect(() => {
		let submenuMatched = false
		;['main', 'others'].forEach((menuType) => {
			const items = menuType === 'main' ? navItems : othersItems
			items.forEach((nav, index) => {
				if (nav.subItems) {
					nav.subItems.forEach((subItem) => {
						if (isActive(subItem.path)) {
							setOpenSubmenu({
								type: menuType as 'main' | 'others',
								index
							})
							submenuMatched = true
						}
					})
				}
			})
		})

		if (!submenuMatched) {
			setOpenSubmenu(null)
		}
	}, [location, isActive])

	useEffect(() => {
		if (openSubmenu !== null) {
			const key = `${openSubmenu.type}-${openSubmenu.index}`
			if (subMenuRefs.current[key]) {
				setSubMenuHeight((prevHeights) => ({
					...prevHeights,
					[key]: subMenuRefs.current[key]?.scrollHeight || 0
				}))
			}
		}
	}, [openSubmenu])

	const handleSubmenuToggle = (index: number, menuType: 'main' | 'others') => {
		setOpenSubmenu((prevOpenSubmenu) => {
			if (
				prevOpenSubmenu &&
				prevOpenSubmenu.type === menuType &&
				prevOpenSubmenu.index === index
			) {
				return null
			}
			return { type: menuType, index }
		})
	}

	const renderMenuItems = (items: NavItem[], menuType: 'main' | 'others') => (
		<ul className="flex flex-col gap-4">
			{items.map((nav, index) => (
				<li key={nav.name}>
					{nav.subItems ? (
						<button
							onClick={() => handleSubmenuToggle(index, menuType)}
							className={`menu-item group ${
								openSubmenu?.type === menuType && openSubmenu?.index === index
									? 'menu-item-active'
									: 'menu-item-inactive'
							} cursor-pointer ${
								!isExpanded ? 'lg:justify-center' : 'lg:justify-start'
							}`}
						>
							<span
								className={`menu-item-icon-size  ${
									openSubmenu?.type === menuType && openSubmenu?.index === index
										? 'menu-item-icon-active'
										: 'menu-item-icon-inactive'
								}`}
							>
								{nav.icon}
							</span>
							{(isExpanded || isMobileOpen) && (
								<span className="menu-item-text">{nav.name}</span>
							)}
						</button>
					) : (
						nav.path && (
							<Link
								to={nav.path}
								className={`menu-item group ${
									isActive(nav.path) ? 'menu-item-active' : 'menu-item-inactive'
								}`}
							>
								<span
									className={`menu-item-icon-size ${
										isActive(nav.path)
											? 'menu-item-icon-active'
											: 'menu-item-icon-inactive'
									}`}
								>
									{nav.icon}
								</span>
								{(isExpanded || isMobileOpen) && (
									<span className="menu-item-text">{nav.name}</span>
								)}
							</Link>
						)
					)}
					{nav.subItems && (isExpanded || isMobileOpen) && (
						<div
							ref={(el) => {
								subMenuRefs.current[`${menuType}-${index}`] = el
							}}
							className="overflow-hidden transition-all duration-300"
							style={{
								height:
									openSubmenu?.type === menuType && openSubmenu?.index === index
										? `${subMenuHeight[`${menuType}-${index}`]}px`
										: '0px'
							}}
						>
							<ul className="mt-2 space-y-1 ml-9">
								{nav.subItems.map((subItem) => (
									<li key={subItem.name}>
										<Link
											to={subItem.path}
											className={`menu-dropdown-item ${
												isActive(subItem.path)
													? 'menu-dropdown-item-active'
													: 'menu-dropdown-item-inactive'
											}`}
										>
											{subItem.name}
										</Link>
									</li>
								))}
							</ul>
						</div>
					)}
				</li>
			))}
		</ul>
	)

	return (
		<aside
			className={`fixed mt-16 flex flex-col lg:mt-0 top-0 px-5 left-0 bg-white dark:bg-gray-900 dark:border-gray-800 text-gray-900 h-screen transition-all duration-300 ease-in-out z-50 border-r border-gray-200 
        ${isExpanded || isMobileOpen ? 'w-[290px]' : 'w-[90px]'}
        ${isMobileOpen ? 'translate-x-0' : '-translate-x-full'}
        lg:translate-x-0`}
		>
			<div className="py-6 mb-6 justify-center border-b border-gray-200 dark:border-gray-800 hidden lg:flex">
				<Link to="/">
					{isExpanded || isMobileOpen ? (
						<>
							<img
								className="dark:hidden size-16"
								src="/images/logo/logo.svg"
								alt="Logo"
								width={150}
								height={40}
							/>
							<img
								className="hidden dark:block size-16 text-center mx-auto"
								src="/images/logo/logo-dark.svg"
								alt="Logo"
								width={150}
								height={40}
							/>
						</>
					) : (
						<>
							<img
								className="block dark:hidden"
								src="/images/logo/logo-icon.svg"
								alt="Logo"
								width={32}
								height={32}
							/>
							<img
								className="hidden dark:block"
								src="/images/logo/logo-icon-dark.svg"
								alt="Logo"
								width={32}
								height={32}
							/>
						</>
					)}
				</Link>
			</div>
			<div className="flex flex-col overflow-y-auto duration-300 ease-linear no-scrollbar lg:p-0 pt-8">
				<nav className="mb-6">
					<div className="flex flex-col gap-4">
						<div>{renderMenuItems(navItems, 'main')}</div>
					</div>
				</nav>
			</div>
		</aside>
	)
}

export default AppSidebar
