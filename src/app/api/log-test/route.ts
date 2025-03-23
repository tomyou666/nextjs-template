import { logger } from '@/lib/share/logger'
import { type NextRequest, NextResponse } from 'next/server'

export async function POST(request: NextRequest) {
	try {
		const { level } = await request.json()

		switch (level) {
			case 'info':
				logger.info('バックエンドでinfoレベルのログを出力しました')
				break
			case 'warn':
				logger.warn('バックエンドでwarnレベルのログを出力しました')
				break
			case 'error':
				logger.error('バックエンドでerrorレベルのログを出力しました')
				break
			case 'debug':
				logger.debug('バックエンドでdebugレベルのログを出力しました')
				break
			default:
				logger.info('バックエンドでデフォルトログを出力しました')
		}

		return NextResponse.json({
			success: true,
			message: `${level}レベルのログを出力しました`,
		})
	} catch (error) {
		logger.error({ error }, 'ログ出力処理でエラーが発生しました')
		return NextResponse.json(
			{ success: false, message: 'ログ出力処理に失敗しました' },
			{ status: 500 },
		)
	}
}
