import { User } from 'lucide-react'

export function RecentSales() {
	return (
		<div className="space-y-8">
			<div className="flex items-center">
				<div className="flex h-9 w-9 items-center justify-center rounded-full border">
					<User className="h-4 w-4" />
				</div>
				<div className="ml-4 space-y-1">
					<p className="font-medium text-sm leading-none">Olivia Martin</p>
					<p className="text-muted-foreground text-sm">
						olivia.martin@email.com
					</p>
				</div>
				<div className="ml-auto font-medium">+$1,999.00</div>
			</div>
			<div className="flex items-center">
				<div className="flex h-9 w-9 items-center justify-center rounded-full border">
					<User className="h-4 w-4" />
				</div>
				<div className="ml-4 space-y-1">
					<p className="font-medium text-sm leading-none">Jackson Lee</p>
					<p className="text-muted-foreground text-sm">jackson.lee@email.com</p>
				</div>
				<div className="ml-auto font-medium">+$39.00</div>
			</div>
			<div className="flex items-center">
				<div className="flex h-9 w-9 items-center justify-center rounded-full border">
					<User className="h-4 w-4" />
				</div>
				<div className="ml-4 space-y-1">
					<p className="font-medium text-sm leading-none">Isabella Nguyen</p>
					<p className="text-muted-foreground text-sm">
						isabella.nguyen@email.com
					</p>
				</div>
				<div className="ml-auto font-medium">+$299.00</div>
			</div>
			<div className="flex items-center">
				<div className="flex h-9 w-9 items-center justify-center rounded-full border">
					<User className="h-4 w-4" />
				</div>
				<div className="ml-4 space-y-1">
					<p className="font-medium text-sm leading-none">William Kim</p>
					<p className="text-muted-foreground text-sm">will@email.com</p>
				</div>
				<div className="ml-auto font-medium">+$99.00</div>
			</div>
			<div className="flex items-center">
				<div className="flex h-9 w-9 items-center justify-center rounded-full border">
					<User className="h-4 w-4" />
				</div>
				<div className="ml-4 space-y-1">
					<p className="font-medium text-sm leading-none">Sofia Davis</p>
					<p className="text-muted-foreground text-sm">sofia.davis@email.com</p>
				</div>
				<div className="ml-auto font-medium">+$39.00</div>
			</div>
		</div>
	)
}
