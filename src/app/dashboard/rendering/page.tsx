export const dynamic = 'force-dynamic'

import { MarkdownHelpDialog } from '@/components/MarkDownHelpDIalog'
import { RenderingTabs } from '@/components/RenderingTabs'
import { renderingHelpContent } from '@/lib/frontend/markdown/renderingHelp'

export default function RenderingPage() {
	return (
		<div className="flex flex-col gap-8 p-4">
			<div className="flex flex-col gap-2">
				<div className="flex items-center justify-between">
					<h2 className="font-bold text-2xl tracking-tight">レンダリング</h2>
					<MarkdownHelpDialog
						title="Next.jsのレンダリング方式について"
						content={renderingHelpContent}
						ariaLabel="レンダリングについてのヘルプ"
					/>
				</div>
				<p className="text-muted-foreground">
					Next.jsの各種レンダリング方式のデモンストレーション
				</p>
			</div>
			<RenderingTabs />
		</div>
	)
}
