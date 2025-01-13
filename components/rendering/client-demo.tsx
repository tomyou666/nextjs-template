'use client'

import {
	Card,
	CardContent,
	CardDescription,
	CardHeader,
	CardTitle,
} from '@/components/ui/card'
import { useEffect, useState } from 'react'

export function ClientDemo() {
	const [randomId, setRandomId] = useState<string | null>(null)
	const [loading, setLoading] = useState(true)

	useEffect(() => {
		const fetchData = async () => {
			try {
				const response = await fetch('/api/random')
				const data: ApiResponse<string> = await response.json()
				setRandomId(data.data ?? null)
			} catch (error) {
				console.error('Error fetching random ID:', error)
			} finally {
				setLoading(false)
			}
		}

		fetchData()
	}, [])

	return (
		<Card>
			<CardHeader>
				<CardTitle>クライアントサイドレンダリング</CardTitle>
				<CardDescription>
					useEffectを使用してクライアントサイドでデータをフェッチします
				</CardDescription>
			</CardHeader>
			<CardContent>
				{loading ? <p>Loading...</p> : <p className="font-mono">{randomId}</p>}
			</CardContent>
		</Card>
	)
}
