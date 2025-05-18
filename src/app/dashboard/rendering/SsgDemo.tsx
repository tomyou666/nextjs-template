import {
	Card,
	CardContent,
	CardDescription,
	CardHeader,
	CardTitle,
} from '@/components/ui/card'
import { randomRepository } from '@/lib/frontend/repository/randomRepository'

export async function SSGDemo() {
	const randomId = await randomRepository.getRandomId({
		cache: 'force-cache',
	})

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
