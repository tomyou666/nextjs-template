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

// メニュー項目の型定義
// title: メニュー項目のタイトル
// url: メニュー項目のリンク先URL
// isActive: 現在アクティブなメニュー項目かどうか（オプショナル）
interface MenuItem {
	title: string
	url: string
	isActive?: boolean
}

// ナビゲーショングループの型定義
// title: グループのタイトル
// url: グループのリンク先URL
// items: グループ内のメニュー項目の配列
interface NavGroup {
	title: string
	url: string
	items: MenuItem[]
}

// サイドバー全体のデータ構造の型定義
// navMain: メインナビゲーションのグループ配列
interface SidebarData {
	navMain: NavGroup[]
}

// This is sample data.
const data: SidebarData = {
	navMain: [
		{
			title: 'Getting Started',
			url: '#',
			items: [
				{
					title: 'state',
					url: '/dashboard/state',
				},
				{
					title: 'Dashboard',
					url: '/dashboard',
				},
				{
					title: 'レンダリング',
					url: '/dashboard/rendering',
				},
				{
					title: 'Forms',
					url: '/dashboard/forms',
				},
				{
					title: 'Table',
					url: '/dashboard/table',
				},
				{
					title: 'Settings',
					url: '/dashboard/settings',
				},
				{
					title: '通知・エラーテスト',
					url: '/dashboard/error',
				},
			],
		},
	],
}

export function AppSidebar({ ...props }: React.ComponentProps<typeof Sidebar>) {
	return (
		<Sidebar {...props}>
			<SidebarContent>
				{/* We create a SidebarGroup for each parent. */}
				{data.navMain.map((item) => (
					<SidebarGroup key={item.title}>
						<SidebarGroupLabel>{item.title}</SidebarGroupLabel>
						<SidebarGroupContent>
							<SidebarMenu>
								{item.items.map((item) => (
									<SidebarMenuItem key={item.title}>
										<SidebarMenuButton asChild isActive={item.isActive}>
											<a href={item.url}>{item.title}</a>
										</SidebarMenuButton>
									</SidebarMenuItem>
								))}
							</SidebarMenu>
						</SidebarGroupContent>
					</SidebarGroup>
				))}
			</SidebarContent>
			<SidebarRail />
		</Sidebar>
	)
}
