'use client'

import { Button } from '@/components/ui/button'
import { useState } from 'react'

export default function ErrorTestPage() {
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
		<div className="container mx-auto py-8">
			<h1 className="mb-8 font-bold text-2xl">エラーテストページ</h1>
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

				<div className="rounded-lg border p-4">
					<h2 className="mb-4 font-semibold text-xl">グローバルエラー</h2>
					<p className="mb-4 text-muted-foreground">
						global-error.tsxコンポーネントのテスト
					</p>
					<Button variant="destructive" onClick={throwGlobalError}>
						グローバルエラーを発生させる
					</Button>
				</div>
			</div>
		</div>
	)
}
