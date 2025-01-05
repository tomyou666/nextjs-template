// サーバーコンポーネント
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { StateController } from './state-controller'
import { StateDisplay } from './state-display'

export function StateContent() {
	return (
		<Card>
			<CardHeader>
				<CardTitle>状態表示（サーバー）</CardTitle>
			</CardHeader>
			<CardContent className="space-y-4">
				<StateDisplay />
				<StateController />
			</CardContent>
		</Card>
	)
}
