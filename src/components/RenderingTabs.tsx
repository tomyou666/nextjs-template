import { ClientDemo } from '@/components/rendering/client-demo'
import { SSGDemo } from '@/components/rendering/ssg-demo'
import { SSRDemo } from '@/components/rendering/ssr-demo'
import { Suspense } from 'react'
import { ISRContent } from './rendering/isr-demo-content'
import { RenderingDemo } from './rendering/rendering-demo'

export function RenderingTabs() {
	return (
		<div>
			<div className="flex flex-col gap-4">
				<RenderingDemo />
				<ClientDemo />
				<Suspense fallback=<p>Loading...</p>>
					<SSRDemo />
				</Suspense>
				<SSGDemo />
				<ISRContent />
			</div>
		</div>
	)
}
