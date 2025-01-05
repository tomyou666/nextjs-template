'use client'

import { Button } from '@/components/ui/button'
import {
	Dialog,
	DialogContent,
	DialogDescription,
	DialogHeader,
	DialogTitle,
} from '@/components/ui/dialog'
import {
	DropdownMenu,
	DropdownMenuContent,
	DropdownMenuGroup,
	DropdownMenuItem,
	DropdownMenuLabel,
	DropdownMenuSeparator,
	DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu'
import { User } from 'lucide-react'
import { signOut } from 'next-auth/react'
import { useState } from 'react'

export function UserNav() {
	const [openDialog, setOpenDialog] = useState<string | null>(null)

	return (
		<>
			<DropdownMenu>
				<DropdownMenuTrigger asChild>
					<Button variant="ghost" className="relative h-8 w-8 rounded-full">
						<div className="flex h-8 w-8 items-center justify-center rounded-full border">
							<User className="h-4 w-4" />
						</div>
					</Button>
				</DropdownMenuTrigger>
				<DropdownMenuContent className="w-56" align="end" forceMount>
					<DropdownMenuLabel className="font-normal">
						<div className="flex flex-col space-y-1">
							<p className="font-medium text-sm leading-none">username</p>
							<p className="text-muted-foreground text-xs leading-none">
								user@example.com
							</p>
						</div>
					</DropdownMenuLabel>
					<DropdownMenuSeparator />
					<DropdownMenuGroup>
						<DropdownMenuItem onSelect={() => setOpenDialog('profile')}>
							Profile
						</DropdownMenuItem>
						<DropdownMenuItem onSelect={() => setOpenDialog('settings')}>
							Settings
						</DropdownMenuItem>
					</DropdownMenuGroup>
					<DropdownMenuSeparator />
					<DropdownMenuItem onSelect={() => signOut()}>
						Log out
					</DropdownMenuItem>
				</DropdownMenuContent>
			</DropdownMenu>

			<Dialog
				open={openDialog === 'profile'}
				onOpenChange={() => setOpenDialog(null)}
			>
				<DialogContent>
					<DialogHeader>
						<DialogTitle>Profile</DialogTitle>
						<DialogDescription>
							View and edit your profile information.
						</DialogDescription>
					</DialogHeader>
					{/* Add profile content here */}
				</DialogContent>
			</Dialog>

			<Dialog
				open={openDialog === 'settings'}
				onOpenChange={() => setOpenDialog(null)}
			>
				<DialogContent>
					<DialogHeader>
						<DialogTitle>Settings</DialogTitle>
						<DialogDescription>Manage your account settings.</DialogDescription>
					</DialogHeader>
					{/* Add settings content here */}
				</DialogContent>
			</Dialog>
		</>
	)
}
