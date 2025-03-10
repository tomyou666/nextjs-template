import { APP_NAME, ROUTES } from '@/lib/share/constants'

/**
 * 与えられたパスからパンくずリストを生成するヘルパー関数
 *
 * このヘルパー関数は以下の機能を提供します:
 * - URLパスを解析してパンくずリストの配列を生成
 * - クエリパラメータとハッシュフラグメントを除去
 * - ROUTESオブジェクトに定義された階層構造に基づいてパンくずを構築
 * - 未定義のパスセグメントは自動的にラベル化
 *
 * 戻り値の配列の各要素は以下のプロパティを持つオブジェクト:
 * - path: パンくずリストの各階層のフルパス
 * - label: 表示用のラベル文字列
 *
 * 例:
 * - "/" -> [{ path: "/", label: "Next.JSテンプレート" }]
 * - "/dashboard" -> [{ path: "/", label: "Next.JSテンプレート" }, { path: "/dashboard", label: "ダッシュボード" }]
 * - "/dashboard/forms" -> [...上記に加えて, { path: "/dashboard/forms", label: "Forms" }]
 *
 * @param path - パンくずリストを生成するためのURLパス文字列
 * @returns パンくずリストを表すオブジェクトの配列
 */
export function getBreadcrumbsFromPath(path: string) {
	const cleanPath = path.split('?')[0].split('#')[0]
	const segments = cleanPath.split('/').filter((segment) => segment !== '')

	// ルートパスの場合は単純にホームを返す
	if (segments.length === 0) {
		return [{ path: '/', label: APP_NAME }]
	}

	// ネストされたパスの場合
	const breadcrumbs = [{ path: '/', label: APP_NAME }]
	let currentPath = ''
	let currentRoutes = ROUTES

	// パスセグメントを順番に処理
	for (const segment of segments) {
		currentPath += `/${segment}`

		// 特殊ケース: ダッシュボードのインデックスページ
		if (currentPath === '/dashboard' && ROUTES.dashboard) {
			breadcrumbs.push({
				path: ROUTES.dashboard.path,
				label: ROUTES.dashboard.label,
			})

			if (ROUTES.dashboard.children) {
				currentRoutes = ROUTES.dashboard.children
			}
			continue
		}

		// 現在のセグメントに一致するルートを探す
		const matchedRoute = Object.values(currentRoutes).find(
			(route) => route.path === currentPath,
		)

		if (matchedRoute) {
			breadcrumbs.push({
				path: matchedRoute.path,
				label: matchedRoute.label,
			})

			// 子ルートがあれば次のイテレーションのために設定
			if (matchedRoute.children) {
				currentRoutes = matchedRoute.children
			}
		} else {
			// 明示的に定義されていないパスの場合はセグメント名をそのまま使用
			breadcrumbs.push({
				path: currentPath,
				label:
					segment.charAt(0).toUpperCase() + segment.slice(1).replace(/-/g, ' '),
			})
		}
	}

	return breadcrumbs
}
