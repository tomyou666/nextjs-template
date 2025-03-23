import { ClientDemo } from '@/app/dashboard/rendering/ClientDemo'
import { SSGDemo } from '@/app/dashboard/rendering/SsgDemo'
import { SSRDemo } from '@/app/dashboard/rendering/SsrDemo'
import { Suspense } from 'react'
import { ISRContent } from './IsrDemoContent'
import { RenderingDemo } from './RenderingDemo'

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
