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

// トーストの型定義
export type ToastType =
	| 'default'
	| 'destructive'
	| 'primary'
	| 'secondary'
	| 'accent'
	| 'muted'
	| 'success'
	| 'warning'

// トーストの状態型定義
export interface Toast {
	id: string
	type: ToastType
	title: string
	description?: string
	duration?: number
	action?: React.ReactNode
	open: boolean
}

// トーストストアの型定義
interface ToastState {
	// トースト一覧
	toasts: Toast[]
	// トーストの最大表示数
	maxToasts: number
	// トーストを追加する関数
	addToast: (toast: Omit<Toast, 'id' | 'open'>) => string
	// トーストを更新する関数
	updateToast: (id: string, toast: Partial<Toast>) => void
	// トーストを削除する関数
	dismissToast: (id: string) => void
	// すべてのトーストを削除する関数
	dismissAllToasts: () => void
	// トーストのオープン状態を変更する関数
	setToastOpen: (id: string, open: boolean) => void
}

// トーストIDのカウンター
let toastCount = 0

// トーストストアの作成
export const useToastStore = create<ToastState>((set, get) => ({
	// 初期状態
	toasts: [],
	maxToasts: 3,

	// トーストを追加する関数
	addToast: (toast) => {
		const { toasts, maxToasts } = get()
		const id = String(++toastCount)

		// 新しいトーストを追加し、最大数を超えた古いトーストを削除
		set({
			toasts: [{ ...toast, id, open: true }, ...toasts].slice(0, maxToasts),
		})

		// 期間が指定されている場合は自動的に閉じる
		if (toast.duration && toast.duration > 0) {
			setTimeout(() => {
				get().setToastOpen(id, false)
			}, toast.duration)
		}

		return id
	},

	// トーストを更新する関数
	updateToast: (id, toast) => {
		set({
			toasts: get().toasts.map((t) => (t.id === id ? { ...t, ...toast } : t)),
		})
	},

	// トーストを削除する関数
	dismissToast: (id) => {
		set({
			toasts: get().toasts.filter((t) => t.id !== id),
		})
	},

	// すべてのトーストを削除する関数
	dismissAllToasts: () => {
		set({ toasts: [] })
	},

	// トーストのオープン状態を変更する関数
	setToastOpen: (id, open) => {
		const { toasts } = get()
		const targetToast = toasts.find((t) => t.id === id)

		if (targetToast) {
			// オープン状態を更新
			set({
				toasts: toasts.map((t) => (t.id === id ? { ...t, open } : t)),
			})

			// 閉じる場合は、アニメーション後に削除するためのタイマーを設定
			if (!open) {
				setTimeout(() => {
					get().dismissToast(id)
				}, 300) // アニメーション時間に合わせる
			}
		}
	},
}))
