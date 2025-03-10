import { MarkdownHelpDialog } from '@/components/markdown-help-dialog'
import { stateHelpContent } from '@/lib/frontend/markdown/stateHelp'
import { StateContent } from './components/state-content'
import { StateWrapper } from './components/state-wrapper'

// サーバーコンポーネント
export default function StatePage() {
	return (
		<div className="space-y-4 p-4">
			<div className="flex items-center justify-between">
				<h1 className="font-bold text-2xl">状態管理ページ</h1>
				<MarkdownHelpDialog
					title="Next.jsでの状態管理について"
					content={stateHelpContent}
					ariaLabel="状態管理についてのヘルプ"
				/>
			</div>
			<StateWrapper>
				<StateContent />
			</StateWrapper>
		</div>
	)
}
