'use client'

import { Button } from '@/components/ui/button'
import { refreshData } from '@/lib/backend/actions'
import { useRouter } from 'next/navigation'
import { startTransition, useState } from 'react'

export function RenderingDemo() {
	const router = useRouter()
	const [isRefreshing, setIsRefreshing] = useState(false)

	const handleIsrRefresh = async () => {
		setIsRefreshing(true)
		startTransition(async () => {
			await refreshData() // サーバーアクションを実行
			router.refresh()
		})
		setTimeout(() => setIsRefreshing(false), 1000)
	}

	const handleRefresh = async () => {
		setIsRefreshing(true)
		// リフレッシュ
		router.refresh()
		setTimeout(() => setIsRefreshing(false), 1000)
	}

	return (
		<div>
			<Button onClick={handleIsrRefresh} disabled={isRefreshing}>
				{isRefreshing ? '更新中...' : '検証実行'}
			</Button>
			<Button onClick={handleRefresh} disabled={isRefreshing}>
				{isRefreshing ? '更新中...' : 'SSR更新'}
			</Button>
		</div>
	)
}
