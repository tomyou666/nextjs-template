'use client'

import { ToastAction } from '@/components/ToastContainer'
import { Button } from '@/components/ui/button'
import {
	Card,
	CardContent,
	CardDescription,
	CardHeader,
	CardTitle,
} from '@/components/ui/card'
import { useToast } from '@/hooks/use-toast'

export const ToastButtonSample = () => {
	const { toast } = useToast()

	return (
		<Card>
			<CardHeader>
				<CardTitle>トーストサンプル</CardTitle>
				<CardDescription>
					ボタンをクリックして様々なグローバルトーストを表示
				</CardDescription>
			</CardHeader>
			<CardContent>
				<div className="grid grid-cols-1 gap-4">
					<Button
						variant="success"
						onClick={() => {
							toast({
								type: 'success',
								title: '成功',
								description: '購入が確認されました！',
								duration: 3000,
								action: <ToastAction altText="元に戻す">元に戻す</ToastAction>,
							})
						}}
					>
						成功トースト
					</Button>

					<Button
						variant="default"
						onClick={() => {
							toast({
								type: 'primary',
								title: '情報',
								description:
									'これはグローバル情報トーストのテストです。3秒後に非表示になります。',
								duration: 3000,
								action: <ToastAction altText="確認">確認</ToastAction>,
							})
						}}
					>
						情報トースト
					</Button>

					<Button
						variant="destructive"
						onClick={() => {
							toast({
								type: 'destructive',
								title: 'エラー',
								description:
									'これはグローバルエラートーストのテストです。3秒後に非表示になります。',
								duration: 3000,
								action: <ToastAction altText="再試行">再試行</ToastAction>,
							})
						}}
					>
						エラートースト
					</Button>

					<Button
						variant="warning"
						onClick={() => {
							toast({
								type: 'warning',
								title: '警告',
								description:
									'これはグローバル警告トーストのテストです。3秒後に非表示になります。',
								duration: 3000,
								action: <ToastAction altText="了解">了解</ToastAction>,
							})
						}}
					>
						警告トースト
					</Button>

					<Button
						variant="secondary"
						onClick={() => {
							toast({
								type: 'secondary',
								title: 'セカンダリー',
								description:
									'これはセカンダリートーストのテストです。3秒後に非表示になります。',
								duration: 3000,
								action: <ToastAction altText="閉じる">閉じる</ToastAction>,
							})
						}}
					>
						セカンダリートースト
					</Button>

					<Button
						variant="outline"
						onClick={() => {
							toast({
								type: 'accent',
								title: 'アクセント',
								description:
									'これはアクセントトーストのテストです。3秒後に非表示になります。',
								duration: 3000,
								action: <ToastAction altText="OK">OK</ToastAction>,
							})
						}}
					>
						アクセントトースト
					</Button>
				</div>
			</CardContent>
		</Card>
	)
}
