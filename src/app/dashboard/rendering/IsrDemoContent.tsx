import {
	Card,
	CardContent,
	CardDescription,
	CardHeader,
	CardTitle,
} from '../../../components/ui/card'

export async function ISRContent() {
	async function getData() {
		const response = await fetch(
			`${process.env.NEXT_PUBLIC_API_URL}/api/random`,
			{
				next: { revalidate: 30 }, // 30秒ごとに再検証
			},
		)
		const data: ApiResponse<string> = await response.json()
		return data.data
	}
	const randomId = await getData()
	return (
		<Card>
			<CardHeader>
				<CardTitle>インクリメンタル静的再生成（ISR）</CardTitle>
				<CardDescription>
					30秒ごとにデータを再検証します。手動で更新することもできます。
				</CardDescription>
			</CardHeader>
			<CardContent>
				<p className="font-mono">{randomId}</p>
			</CardContent>
		</Card>
	)
}
