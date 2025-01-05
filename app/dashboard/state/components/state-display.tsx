'use client'

import { Badge } from '@/components/ui/badge'
import { useUrlStore } from '@/lib/store'

// クライアントコンポーネント2（Display）
export function StateDisplay() {
	const { isLoading } = useUrlStore()

	return (
		<div className="space-y-2">
			<div className="text-muted-foreground text-sm">
				読み込み状態:
				<Badge variant={isLoading ? 'default' : 'secondary'} className="ml-2">
					{isLoading ? '読み込み中' : '待機中'}
				</Badge>
			</div>
		</div>
	)
}
