'use client'

import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { useUrlStore } from '@/lib/store'

// クライアントコンポーネント3（Controller）
export function StateController() {
	const { setIsLoading } = useUrlStore()

	return (
		<Card>
			<CardHeader>
				<CardTitle className="text-lg">状態操作（クライアント）</CardTitle>
			</CardHeader>
			<CardContent className="flex gap-2">
				<Button onClick={() => setIsLoading(true)} variant="default">
					読み込み開始
				</Button>
				<Button onClick={() => setIsLoading(false)} variant="destructive">
					読み込み停止
				</Button>
			</CardContent>
		</Card>
	)
}
