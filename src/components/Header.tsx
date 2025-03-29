import { ModeToggle } from '@/components/ModeToggle'
import { UserNav } from '@/components/UserNav'
import { Button } from '@/components/ui/button'

export function Header() {
	return (
		<header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur-sm supports-backdrop-filter:bg-background/60">
			<div className="container flex h-14 items-center">
				<div className="mr-4 hidden md:flex">
					<Button variant="ghost" className="mr-2" asChild>
						<a href="/">Dashboard Template</a>
					</Button>
				</div>
				<div className="flex flex-1 items-center justify-between space-x-2 md:justify-end">
					<div className="w-full flex-1 md:w-auto md:flex-none">
						{/* Add search functionality here if needed */}
					</div>
					<nav className="flex items-center space-x-2 px-2">
						<ModeToggle />
						<UserNav />
					</nav>
				</div>
			</div>
		</header>
	)
}
