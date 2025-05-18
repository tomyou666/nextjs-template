'use client'

import { Button } from '@/components/ui/button'
import {
	Card,
	CardContent,
	CardDescription,
	CardHeader,
	CardTitle,
} from '@/components/ui/card'
import { randomRepository } from '@/lib/frontend/repository/randomRepository'
import { queryKeys } from '@/lib/utils/queryKeys'
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'

export function ClientDemo() {
	const queryClient = useQueryClient()

	// ランダムIDを取得するためのクエリ
	const { data: randomId, isLoading } = useQuery({
		queryKey: queryKeys.random.id,
		queryFn: randomRepository.getRandomId,
	})

	// 再取得するためのミューテーション
	const { mutate: getRandomId, isPending: isRefreshing } = useMutation({
		mutationFn: randomRepository.getRandomId,
		onSuccess: (newRandomId) => {
			// 成功したら、キャッシュを更新
			queryClient.setQueryData(queryKeys.random.id, newRandomId)
		},
	})

	function handleClick() {
		// ミューテーションを実行して新しいランダムIDを取得
		getRandomId(undefined)
	}

	return (
		<Card>
			<CardHeader>
				<CardTitle>クライアントサイドレンダリング</CardTitle>
				<CardDescription>
					useQueryとuseMutationを使用してデータをフェッチします
				</CardDescription>
			</CardHeader>
			<CardContent>
				<Button onClick={handleClick} disabled={isRefreshing}>
					{isRefreshing ? '更新中...' : '再取得'}
				</Button>
				{isLoading ? (
					<p>Loading...</p>
				) : (
					<p className="font-mono">{randomId}</p>
				)}
			</CardContent>
		</Card>
	)
}
