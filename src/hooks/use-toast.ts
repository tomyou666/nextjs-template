'use client'

import { useToastStore } from '@/lib/store'

/**
 * トースト通知を管理するカスタムフック
 *
 * 使用例:
 * ```tsx
 * const { toast } = useToast()
 *
 * // 基本的な使い方
 * toast({
 *   type: 'success',  // トーストタイプ
 *   title: '成功',    // タイトル（必須）
 *   description: '操作完了', // 説明（任意）
 *   duration: 3000,   // 表示時間（ミリ秒）
 * })
 *
 * // アクション付き
 * toast({
 *   type: 'warning',
 *   title: '警告',
 *   action: <ToastAction>保存</ToastAction>
 * })
 * ```
 *
 * タイプ: default, primary, secondary, destructive, success, warning, accent, muted
 */
export function useToast() {
	const { addToast, dismissToast, dismissAllToasts, updateToast } =
		useToastStore()

	return {
		// トースト表示
		toast: (props: Omit<Parameters<typeof addToast>[0], 'id' | 'open'>) => {
			return addToast(props)
		},
		// 特定のトーストを閉じる
		dismiss: dismissToast,
		// すべてのトーストを閉じる
		dismissAll: dismissAllToasts,
		// トースト更新
		update: updateToast,
	}
}
