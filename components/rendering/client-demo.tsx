'use client'

import { Button } from '@/components/ui/button'
import {
	Card,
	CardContent,
	CardDescription,
	CardHeader,
	CardTitle,
} from '@/components/ui/card'
import { useEffect, useReducer, useState } from 'react'

export function ClientDemo() {
	const [randomId, setRandomId] = useState<string | null>(null)
	const [loading, setLoading] = useState(true)
	const [ignored, forceUpdate] = useReducer((x) => x + 1, 0)
	function handleClick() {
		// 強制的に再レンダリングする
		forceUpdate()
	}

	// biome-ignore lint/correctness/useExhaustiveDependencies: <explanation>
	useEffect(() => {
		const fetchData = async () => {
			try {
				const response = await fetch(
					`${process.env.NEXT_PUBLIC_API_URL}/api/random`,
				)
				const data: ApiResponse<string> = await response.json()
				setRandomId(data.data ?? null)
			} catch (error) {
				console.error('Error fetching random ID:', error)
			} finally {
				setLoading(false)
			}
		}

		fetchData()
	}, [ignored])

	return (
		<Card>
			<CardHeader>
				<CardTitle>クライアントサイドレンダリング</CardTitle>
				<CardDescription>
					useEffectを使用してクライアントサイドでデータをフェッチします
				</CardDescription>
			</CardHeader>
			<CardContent>
				<Button onClick={handleClick}>再描画</Button>
				{loading ? <p>Loading...</p> : <p className="font-mono">{randomId}</p>}
			</CardContent>
		</Card>
	)
}
