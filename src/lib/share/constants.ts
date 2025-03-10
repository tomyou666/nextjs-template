// package.jsonからバージョン情報を取得
import { version } from '@/../package.json'

export const APP_NAME = 'Next.JSテンプレート'
export const APP_VERSION = version
export const APP_COPYRIGHT = `© ${new Date().getFullYear()} Next.JSテンプレート`

// 認証関連の定数
export const AUTH_CONSTANTS = {
	SESSION_MAX_AGE: 60 * 60 * 24 * 30, // 1month (秒単位)
	LOGIN_PAGE: '/login',
}

// ロギング関連の定数
export const LOGGER_CONSTANTS = {
	PRODUCTION_LOG_LEVEL: 'debug',
	DEVELOPMENT_LOG_LEVEL: 'trace',
	PRETTY_OPTIONS: {
		colorize: true,
		translateTime: 'yyyy-mm-dd hh:MM:ss',
		sync: true,
		hideObject: false,
	} as const,
	LOG_FILE_PATH: 'logs/log',
	LOG_FILE_SIZE: '10m',
	LOG_FILE_COUNT: 10,
	LOG_DATE_FORMAT: 'yyyy-MM-dd',
}

type RouteItem = {
	path: string
	label: string
	isActive?: boolean
	children?: {
		[key: string]: RouteItem
	}
}

type Routes = {
	[key: string]: RouteItem
}

// パンくずリストとサイドバー用の統合ルート設定
export const ROUTES: Routes = {
	home: {
		path: '/',
		label: 'ホーム',
	},
	dashboard: {
		path: '/dashboard',
		label: 'ダッシュボード',
		children: {
			index: {
				path: '/dashboard',
				label: 'Dashboard',
			},
			state: {
				path: '/dashboard/state',
				label: '状態管理',
			},
			rendering: {
				path: '/dashboard/rendering',
				label: 'レンダリング',
			},
			forms: {
				path: '/dashboard/forms',
				label: 'Forms',
			},
			table: {
				path: '/dashboard/table',
				label: 'テーブル',
			},
			settings: {
				path: '/dashboard/settings',
				label: '設定',
			},
			error: {
				path: '/dashboard/error',
				label: '通知・エラーテスト',
			},
		},
	},
	// 他のメインルートをここに追加
}

// サイドバーナビゲーション用のグループ定義
export const SIDEBAR_NAVIGATION = [
	{
		title: 'Getting Started',
		url: '#',
		items: Object.values(ROUTES.dashboard.children || {}),
	},
	// 必要に応じて他のグループを追加
]
