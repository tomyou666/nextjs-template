'use client'

import { AppSidebar } from '@/components/app-sidebar'
import { Header } from '@/components/header'
import {
	Breadcrumb,
	BreadcrumbItem,
	BreadcrumbLink,
	BreadcrumbList,
	BreadcrumbPage,
	BreadcrumbSeparator,
} from '@/components/ui/breadcrumb'
import {
	SidebarInset,
	SidebarProvider,
	SidebarTrigger,
} from '@/components/ui/sidebar'
import { getBreadcrumbsFromPath } from '@/lib/frontend/utils/utils'
import { Separator } from '@radix-ui/react-separator'
import { usePathname } from 'next/navigation'
import React from 'react'

// パンくずリストコンポーネント
function DashboardBreadcrumb() {
	const pathname = usePathname()
	const breadcrumbs = getBreadcrumbsFromPath(pathname)

	return (
		<Breadcrumb>
			<BreadcrumbList>
				{breadcrumbs.map((crumb, index) => {
					const isLast = index === breadcrumbs.length - 1

					return (
						<React.Fragment key={crumb.path}>
							{index > 0 && (
								<BreadcrumbSeparator
									className={index === 1 ? 'hidden md:block' : ''}
								/>
							)}
							<BreadcrumbItem className={index === 1 ? 'hidden md:block' : ''}>
								{isLast ? (
									<BreadcrumbPage>{crumb.label}</BreadcrumbPage>
								) : (
									<BreadcrumbLink href={crumb.path}>
										{crumb.label}
									</BreadcrumbLink>
								)}
							</BreadcrumbItem>
						</React.Fragment>
					)
				})}
			</BreadcrumbList>
		</Breadcrumb>
	)
}

export default function DashboardLayout({
	children,
}: {
	children: React.ReactNode
}) {
	return (
		<SidebarProvider>
			<AppSidebar />
			<SidebarInset>
				<header className="flex h-16 shrink-0 items-center gap-2 border-b px-4">
					<SidebarTrigger className="-ml-1" />
					<Separator orientation="vertical" className="mr-2 h-4" />
					<DashboardBreadcrumb />
				</header>
				<div className="flex flex-1 flex-col overflow-hidden">
					<Header />
					<main className="flex-1 overflow-y-auto overflow-x-hidden bg-gray-100 dark:bg-gray-900">
						{children}
					</main>
				</div>
			</SidebarInset>
		</SidebarProvider>
	)
}
