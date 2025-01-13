'use client'

import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
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
import { signOut, useSession } from 'next-auth/react'
import { useState } from 'react'

export function UserNav() {
	const [openDialog, setOpenDialog] = useState<string | null>(null)
	const { data: session } = useSession()

	return (
		<>
			<DropdownMenu>
				<DropdownMenuTrigger asChild>
					<Button variant="ghost" className="relative h-8 w-8 rounded-full">
						<Avatar className="h-8 w-8">
							<AvatarImage
								src={session?.user?.image || ''}
								alt={session?.user?.name || ''}
							/>
							<AvatarFallback>
								<User className="h-4 w-4" />
							</AvatarFallback>
						</Avatar>
					</Button>
				</DropdownMenuTrigger>
				<DropdownMenuContent className="w-56" align="end" forceMount>
					<DropdownMenuLabel className="font-normal">
						<div className="flex flex-col space-y-1">
							<p className="font-medium text-sm leading-none">
								{session?.user?.name || 'ゲスト'}
							</p>
							<p className="text-muted-foreground text-xs leading-none">
								{session?.user?.email || '未ログイン'}
							</p>
						</div>
					</DropdownMenuLabel>
					<DropdownMenuSeparator />
					<DropdownMenuGroup>
						<DropdownMenuItem onSelect={() => setOpenDialog('profile')}>
							プロフィール
						</DropdownMenuItem>
						<DropdownMenuItem onSelect={() => setOpenDialog('settings')}>
							設定
						</DropdownMenuItem>
					</DropdownMenuGroup>
					<DropdownMenuSeparator />
					<DropdownMenuItem onSelect={() => signOut()}>
						ログアウト
					</DropdownMenuItem>
				</DropdownMenuContent>
			</DropdownMenu>

			<Dialog
				open={openDialog === 'profile'}
				onOpenChange={() => setOpenDialog(null)}
			>
				<DialogContent>
					<DialogHeader>
						<DialogTitle>プロフィール</DialogTitle>
						<DialogDescription>プロフィール情報の確認と編集</DialogDescription>
					</DialogHeader>
					{/* プロフィールコンテンツをここに追加 */}
				</DialogContent>
			</Dialog>

			<Dialog
				open={openDialog === 'settings'}
				onOpenChange={() => setOpenDialog(null)}
			>
				<DialogContent>
					<DialogHeader>
						<DialogTitle>設定</DialogTitle>
						<DialogDescription>アカウント設定の管理</DialogDescription>
					</DialogHeader>
					{/* 設定コンテンツをここに追加 */}
				</DialogContent>
			</Dialog>
		</>
	)
}
