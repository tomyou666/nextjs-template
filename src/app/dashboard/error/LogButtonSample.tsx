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
import { LogRepository } from '@/lib/backend/repository/logRepository'
import { logger } from '@/lib/share/logger'
import { queryKeys } from '@/lib/utils/queryKeys'
import { useMutation } from '@tanstack/react-query'

export const LogButtonSample = () => {
	const { toast } = useToast()

	// フロントエンドログ出力関数
	const handleFrontendLog = (level: string) => {
		switch (level) {
			case 'info':
				logger.info('フロントエンドでinfoレベルのログを出力しました')
				break
			case 'warn':
				logger.warn('フロントエンドでwarnレベルのログを出力しました')
				break
			case 'error':
				logger.error('フロントエンドでerrorレベルのログを出力しました')
				break
			case 'debug':
				logger.debug('フロントエンドでdebugレベルのログを出力しました')
				break
			default:
				logger.info('フロントエンドでデフォルトログを出力しました')
		}

		toast({
			type: 'success',
			title: 'フロントエンドログ',
			description: `${level}レベルのログを出力しました`,
			duration: 3000,
		})
	}

	// バックエンドログ出力のAPI呼び出し
	const backendLogMutation = useMutation({
		mutationKey: queryKeys.log.create,
		mutationFn: (level: string) => LogRepository.createLog(level),
		onSuccess: (data, variables) => {
			toast({
				type: 'success',
				title: 'バックエンドログ',
				description: `${variables}レベルのログをサーバーで出力しました`,
				duration: 3000,
			})
		},
		onError: (error) => {
			toast({
				type: 'destructive',
				title: 'エラー',
				description: `ログ出力に失敗しました: ${error.message}`,
				duration: 3000,
				action: <ToastAction altText="再試行">再試行</ToastAction>,
			})
		},
	})

	// バックエンドログ出力処理
	const handleBackendLog = (level: string) => {
		backendLogMutation.mutate(level)
	}

	return (
		<Card>
			<CardHeader>
				<CardTitle>ログテストサンプル</CardTitle>
				<CardDescription>
					ボタンをクリックして様々なレベルのログを出力
					<br />
					ログはすべてlogs/に出力されます
				</CardDescription>
			</CardHeader>
			<CardContent>
				<div className="grid grid-cols-1 gap-4">
					<h3 className="font-semibold text-lg">フロントエンドログ</h3>
					<div className="grid grid-cols-2 gap-2">
						<Button variant="default" onClick={() => handleFrontendLog('info')}>
							Info ログ
						</Button>
						<Button variant="warning" onClick={() => handleFrontendLog('warn')}>
							Warning ログ
						</Button>
						<Button
							variant="destructive"
							onClick={() => handleFrontendLog('error')}
						>
							Error ログ
						</Button>
						<Button
							variant="secondary"
							onClick={() => handleFrontendLog('debug')}
						>
							Debug ログ
						</Button>
					</div>

					<h3 className="mt-4 font-semibold text-lg">バックエンドログ</h3>
					<div className="grid grid-cols-2 gap-2">
						<Button
							variant="default"
							onClick={() => handleBackendLog('info')}
							disabled={backendLogMutation.isPending}
						>
							Info ログ
						</Button>
						<Button
							variant="warning"
							onClick={() => handleBackendLog('warn')}
							disabled={backendLogMutation.isPending}
						>
							Warning ログ
						</Button>
						<Button
							variant="destructive"
							onClick={() => handleBackendLog('error')}
							disabled={backendLogMutation.isPending}
						>
							Error ログ
						</Button>
						<Button
							variant="secondary"
							onClick={() => handleBackendLog('debug')}
							disabled={backendLogMutation.isPending}
						>
							Debug ログ
						</Button>
					</div>
				</div>
			</CardContent>
		</Card>
	)
}
