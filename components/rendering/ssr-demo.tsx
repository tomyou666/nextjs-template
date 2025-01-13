// 強制的にSSRにする
export const dynamic = 'force-dynamic'

import {
	Card,
	CardContent,
	CardDescription,
	CardHeader,
	CardTitle,
} from '@/components/ui/card'

async function getData() {
	const response = await fetch('http://localhost:3000/api/random')
	const data: ApiResponse<string> = await response.json()
	return data.data
}

export async function SSRDemo() {
	const randomId = await getData()

	return (
		<Card>
			<CardHeader>
				<CardTitle>サーバーサイドレンダリング（SSR）</CardTitle>
				<CardDescription>
					リクエストごとにサーバーサイドでデータをフェッチします
				</CardDescription>
			</CardHeader>
			<CardContent>
				<p className="font-mono">{randomId}</p>
			</CardContent>
		</Card>
	)
}
