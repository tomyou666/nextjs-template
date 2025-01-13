import { ClientDemo } from '@/components/rendering/client-demo'
import { ISRDemo } from '@/components/rendering/isr-demo'
import { SSGDemo } from '@/components/rendering/ssg-demo'
import { SSRDemo } from '@/components/rendering/ssr-demo'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { Suspense } from 'react'
import { ISRContent } from './rendering/isr-demo-content'

export function RenderingTabs() {
	return (
		<Tabs defaultValue="client" className="space-y-4">
			<TabsList>
				<TabsTrigger value="client">Client</TabsTrigger>
				<TabsTrigger value="ssg">SSG</TabsTrigger>
				<TabsTrigger value="isr">ISR</TabsTrigger>
				<TabsTrigger value="ssr">SSR</TabsTrigger>
			</TabsList>
			<TabsContent value="client" className="space-y-4">
				<ClientDemo />
			</TabsContent>
			<TabsContent value="ssg" className="space-y-4">
				<SSGDemo />
			</TabsContent>
			<TabsContent value="isr" className="space-y-4">
				<ISRDemo>
					<ISRContent />
				</ISRDemo>
			</TabsContent>
			<TabsContent value="ssr" className="space-y-4">
				<Suspense fallback={<p>Loading...</p>}>
					<SSRDemo />
				</Suspense>
			</TabsContent>
		</Tabs>
	)
}
