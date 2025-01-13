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

export async function SSGDemo() {
	const randomId = await getData()

	return (
		<Card>
			<CardHeader>
				<CardTitle>静的サイト生成（SSG）</CardTitle>
				<CardDescription>
					ビルド時にデータをフェッチし、静的なHTMLを生成します
				</CardDescription>
			</CardHeader>
			<CardContent>
				<p className="font-mono">{randomId}</p>
			</CardContent>
		</Card>
	)
}
