import { usePathname } from 'next/navigation'
import type * as React from 'react'

import {
	Sidebar,
	SidebarContent,
	SidebarGroup,
	SidebarGroupContent,
	SidebarGroupLabel,
	SidebarMenu,
	SidebarMenuButton,
	SidebarMenuItem,
	SidebarRail,
} from '@/components/ui/sidebar'
import { SIDEBAR_NAVIGATION } from '@/lib/share/constants'

export function AppSidebar({ ...props }: React.ComponentProps<typeof Sidebar>) {
	const pathname = usePathname()

	return (
		<Sidebar {...props}>
			<SidebarContent>
				{/* 統合されたナビゲーションデータを使用 */}
				{SIDEBAR_NAVIGATION.map((group) => (
					<SidebarGroup key={group.title}>
						<SidebarGroupLabel>{group.title}</SidebarGroupLabel>
						<SidebarGroupContent>
							<SidebarMenu>
								{group.items.map((item) => {
									// 現在のパスと一致するかチェック
									const isActive = pathname === item.path
									return (
										<SidebarMenuItem key={item.label}>
											<SidebarMenuButton asChild isActive={isActive}>
												<a href={item.path}>{item.label}</a>
											</SidebarMenuButton>
										</SidebarMenuItem>
									)
								})}
							</SidebarMenu>
						</SidebarGroupContent>
					</SidebarGroup>
				))}
			</SidebarContent>
			<SidebarRail />
		</Sidebar>
	)
}
