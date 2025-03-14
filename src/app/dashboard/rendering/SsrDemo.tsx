import {
	Card,
	CardContent,
	CardDescription,
	CardHeader,
	CardTitle,
} from '@/components/ui/card'

async function getData() {
	const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/random`)
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
