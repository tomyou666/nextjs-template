'use client'

import { Button } from '@/components/ui/button'
import {
	Card,
	CardContent,
	CardDescription,
	CardHeader,
	CardTitle,
} from '@/components/ui/card'
import { useAlertStore } from '@/lib/store'

export const AlertButtonSample = () => {
	const { showAlert } = useAlertStore()

	return (
		<Card>
			<CardHeader>
				<CardTitle>アラートサンプル</CardTitle>
				<CardDescription>
					ボタンをクリックして様々なグローバルアラートを表示
				</CardDescription>
			</CardHeader>
			<CardContent>
				<div className="grid grid-cols-1 gap-4">
					<Button
						variant="success"
						onClick={() => {
							showAlert('success', 'Your purchase has been confirmed!', 3000)
						}}
					>
						成功アラート
					</Button>

					<Button
						variant="default"
						onClick={() => {
							showAlert(
								'info',
								'これはグローバル情報アラートのテストです。3秒後に非表示になります。',
								3000,
							)
						}}
					>
						情報アラート
					</Button>

					<Button
						variant="destructive"
						onClick={() => {
							showAlert(
								'error',
								'これはグローバルエラーアラートのテストです。3秒後に非表示になります。',
								3000,
							)
						}}
					>
						エラーアラート
					</Button>

					<Button
						variant="warning"
						onClick={() => {
							showAlert(
								'warning',
								'これはグローバル警告アラートのテストです。3秒後に非表示になります。',
								3000,
							)
						}}
					>
						警告アラート
					</Button>

					<Button
						variant="secondary"
						onClick={() => {
							showAlert(
								'secondary',
								'これはセカンダリーアラートのテストです。3秒後に非表示になります。',
								3000,
							)
						}}
					>
						セカンダリーアラート
					</Button>

					<Button
						variant="outline"
						onClick={() => {
							showAlert(
								'accent',
								'これはアクセントアラートのテストです。3秒後に非表示になります。',
								3000,
							)
						}}
					>
						アクセントアラート
					</Button>
				</div>
			</CardContent>
		</Card>
	)
}
