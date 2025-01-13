'use client'

import { Button } from '@/components/ui/button'
import {
	Card,
	CardContent,
	CardDescription,
	CardHeader,
	CardTitle,
} from '@/components/ui/card'
import { useRouter } from 'next/navigation'
import { Suspense, useState } from 'react'
import { ISRContent } from './isr-demo-content'

export function ISRDemo({ children }: { children: React.ReactNode }) {
	const router = useRouter()
	const [isRefreshing, setIsRefreshing] = useState(false)

	const handleRefresh = () => {
		setIsRefreshing(true)
		router.refresh()
		setTimeout(() => setIsRefreshing(false), 1000)
	}

	return (
		<Card>
			<CardHeader>
				<CardTitle>インクリメンタル静的再生成（ISR）</CardTitle>
				<CardDescription>
					30秒ごとにデータを再検証します。手動で更新することもできます。
				</CardDescription>
			</CardHeader>
			<CardContent className="space-y-4">
				<Button onClick={handleRefresh} disabled={isRefreshing}>
					{isRefreshing ? '更新中...' : '今すぐ更新'}
				</Button>
				<Suspense fallback={<p>Loading...</p>}>{children}</Suspense>
			</CardContent>
		</Card>
	)
}
