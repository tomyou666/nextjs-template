import { StateContent } from './components/state-content'
import { StateWrapper } from './components/state-wrapper'

// サーバーコンポーネント
export default function StatePage() {
	return (
		<div className="space-y-4 p-4">
			<h1 className="font-bold text-2xl">状態管理ページ</h1>
			<StateWrapper>
				<StateContent />
			</StateWrapper>
		</div>
	)
}
