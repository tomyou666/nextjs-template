export const dynamic = 'force-dynamic'

import { RenderingTabs } from '@/components/rendering-tabs'

export default function RenderingPage() {
	return (
		<div className="flex flex-col gap-8 p-4">
			<div className="flex flex-col gap-2">
				<h2 className="font-bold text-2xl tracking-tight">レンダリング</h2>
				<p className="text-muted-foreground">
					Next.jsの各種レンダリング方式のデモンストレーション
				</p>
			</div>
			<RenderingTabs />
		</div>
	)
}
