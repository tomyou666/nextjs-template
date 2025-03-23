'use client'

import { Button } from '@/components/ui/button'
import { useEffect } from 'react'

export default function ErrorPage({
	error,
	reset,
}: {
	error: Error & { digest?: string }
	reset: () => void
}) {
	useEffect(() => {
		// エラーをログに記録
		console.error(error)
	}, [error])

	return (
		<div className="flex h-[calc(100vh-4rem)] flex-col items-center justify-center">
			<div className="text-center">
				<h2 className="mb-2 font-bold text-2xl">エラーが発生しました</h2>
				<p className="mb-4 text-muted-foreground">
					{error.message || 'ページの表示中にエラーが発生しました'}
				</p>
				<div className="flex gap-4">
					<Button
						variant="outline"
						onClick={() => {
							window.location.href = '/'
						}}
					>
						ホームに戻る
					</Button>
					<Button onClick={() => reset()}>再試行</Button>
				</div>
			</div>
		</div>
	)
}
