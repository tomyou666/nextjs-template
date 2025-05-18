import {
	Card,
	CardContent,
	CardDescription,
	CardHeader,
	CardTitle,
} from '@/components/ui/card'
import { randomRepository } from '@/lib/frontend/repository/randomRepository'

export async function ISRContent() {
	const randomId = await randomRepository.getRandomId({
		next: { revalidate: 30 },
	})

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
