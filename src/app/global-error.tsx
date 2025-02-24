'use client'

import { Button } from '@/components/ui/button'
import { useEffect } from 'react'

export default function GlobalError({
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
		<html lang="ja">
			<body>
				<div className="flex h-screen w-screen flex-col items-center justify-center bg-background text-foreground">
					<div className="text-center">
						<h1 className="mb-2 font-bold text-4xl">アプリケーションエラー</h1>
						<p className="mb-8 text-muted-foreground text-xl">
							申し訳ありません。予期せぬエラーが発生しました。
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
			</body>
		</html>
	)
}
