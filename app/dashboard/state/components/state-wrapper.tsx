'use client'

import { Badge } from '@/components/ui/badge'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { useUrlStore } from '@/lib/store'

// クライアントコンポーネント1（Wrapper）
export function StateWrapper({ children }: { children: React.ReactNode }) {
	const { isLoading } = useUrlStore()

	return (
		<>
			<Card className="bg-muted/50">
				<CardHeader>
					<CardTitle>親コンポーネント（クライアント）</CardTitle>
				</CardHeader>
				<CardContent>
					<div className="text-muted-foreground text-sm">
						現在の状態:
						<Badge variant={isLoading ? 'default' : 'outline'} className="ml-2">
							{isLoading ? '⚡ 読み込み中です' : '😴 待機中です'}
						</Badge>
					</div>
					{children}
				</CardContent>
			</Card>
		</>
	)
}
