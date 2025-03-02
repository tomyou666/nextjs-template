import { AlertCircle, AlertTriangle, CheckCircle2, Info } from 'lucide-react'
import type { LucideIcon } from 'lucide-react'
// Zustandを使用してグローバルな状態管理を実装
import { create } from 'zustand'

// ローディングストアの型定義
type LoadingState = {
	// ローディング状態を管理
	isLoading: boolean
	// ローディング状態を更新する関数
	setIsLoading: (loading: boolean) => void
}

// Zustandストアの作成
export const useUrlStore = create<LoadingState>((set) => ({
	// ローディングの初期値はfalse
	isLoading: false,
	// ローディング状態を更新するアクション
	setIsLoading: (loading) => set({ isLoading: loading }),
}))

// アラートタイプの定義
export type AlertType =
	| 'info'
	| 'error'
	| 'warning'
	| 'success'
	| 'secondary'
	| 'accent'
	| null

// アラートストアの型定義
type AlertState = {
	// アラートの状態
	alertType: AlertType
	alertMessage: string
	// タイマーID
	timerId: NodeJS.Timeout | null
	// アラートを表示する関数（ミリ秒を指定可能）
	showAlert: (type: AlertType, message: string, durationInMs?: number) => void
	// アラートを非表示にする関数
	hideAlert: () => void
	// アラートのスタイルとアイコンを取得する関数
	getAlertStyle: () => {
		alertClassName: string
		AlertIcon: LucideIcon
	}
}

// アラートストアの作成
export const useAlertStore = create<AlertState>((set, get) => ({
	// 初期状態
	alertType: null,
	alertMessage: '',
	timerId: null,

	// アラートを表示する関数（ミリ秒を指定可能）
	showAlert: (type, message, durationInMs = 0) => {
		// 既存のタイマーがあればクリア
		const { timerId } = get()
		if (timerId) {
			clearTimeout(timerId)
		}

		// 新しいアラートを設定
		set({ alertType: type, alertMessage: message, timerId: null })

		// ミリ秒が指定されている場合は自動的に非表示にするタイマーを設定
		if (durationInMs > 0) {
			const newTimerId = setTimeout(() => {
				set({ alertType: null, timerId: null })
			}, durationInMs)

			set({ timerId: newTimerId })
		}
	},

	// アラートを非表示にする関数
	hideAlert: () => {
		const { timerId } = get()
		if (timerId) {
			clearTimeout(timerId)
		}
		set({ alertType: null, timerId: null })
	},

	// アラートのスタイルとアイコンを取得する関数
	getAlertStyle: () => {
		const { alertType } = get()
		let alertClassName = ''
		let AlertIcon = Info

		if (alertType === 'info') {
			alertClassName = 'bg-primary text-primary-foreground'
			AlertIcon = Info
		} else if (alertType === 'error') {
			alertClassName = 'bg-destructive text-destructive-foreground'
			AlertIcon = AlertCircle
		} else if (alertType === 'warning') {
			alertClassName = 'bg-warning text-warning-foreground'
			AlertIcon = AlertTriangle
		} else if (alertType === 'success') {
			alertClassName = 'bg-success text-success-foreground'
			AlertIcon = CheckCircle2
		} else if (alertType === 'secondary') {
			alertClassName = 'bg-secondary text-secondary-foreground'
			AlertIcon = Info
		} else if (alertType === 'accent') {
			alertClassName = 'bg-accent text-accent-foreground'
			AlertIcon = Info
		}

		return { alertClassName, AlertIcon }
	},
}))
