'use client'

import { Button } from '@/components/ui/button'
import {
	Card,
	CardContent,
	CardDescription,
	CardHeader,
	CardTitle,
} from '@/components/ui/card'
import { useState } from 'react'

export const ErrorButtonSample = () => {
	const [shouldThrow, setShouldThrow] = useState(false)

	if (shouldThrow) {
		throw new Error('これはテスト用のエラーです')
	}

	const throwGlobalError = () => {
		// グローバルエラーをシミュレート
		const root = document.documentElement
		root.innerHTML = ''
		throw new Error('これはグローバルエラーのテストです')
	}

	return (
		<Card>
			<CardHeader>
				<CardTitle>エラーテスト</CardTitle>
				<CardDescription>
					さまざまなエラーハンドリングをテストするためのボタン
				</CardDescription>
			</CardHeader>
			<CardContent>
				<div className="flex flex-col gap-4">
					<div className="rounded-lg border p-4">
						<h2 className="mb-4 font-semibold text-xl">ページレベルのエラー</h2>
						<p className="mb-4 text-muted-foreground">
							error.tsxコンポーネントのテスト
						</p>
						<Button variant="destructive" onClick={() => setShouldThrow(true)}>
							エラーを発生させる
						</Button>
					</div>
				</div>
			</CardContent>
		</Card>
	)
}
