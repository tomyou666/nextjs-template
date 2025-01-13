import { getServerSession } from 'next-auth/next'
import type { NextRequest, NextResponse } from 'next/server'
import { authOptions } from './auth'

// APIハンドラー関数の型定義
type HandlerFunction<T> = (req: NextRequest) => Promise<NextResponse<T>>

/**
 * API認証用のラッパー関数
 * @param handler - 保護したいAPIハンドラー関数
 * @returns 認証チェック付きのハンドラー関数
 *
 * @example
 * // APIルートファイル (app/api/protected/route.ts) での使用例
 * import { auth } from '@/lib/api-auth'
 *
 * export const GET = auth(async (req) => {
 *   // このコードは認証済みユーザーのみ実行される
 *   return Response.json({ message: "認証済みデータ" })
 * })
 *
 * @example
 * // POSTリクエストの例
 * export const POST = auth(async (req) => {
 *   const data = await req.json()
 *   // 保護されたデータ処理
 *   return Response.json({ status: "success" })
 * })
 */
export function auth<T>(handler: HandlerFunction<T>): HandlerFunction<T> {
	return (async (req: NextRequest) => {
		// NextAuthのセッション情報を取得
		const session = await getServerSession(authOptions)

		// セッションが存在しない場合は未認証エラーを返す
		if (!session) {
			return new Response('Unauthorized', {
				status: 401,
			})
		}

		// 認証済みの場合、元のハンドラーを実行
		return await handler(req)
	}) as HandlerFunction<T>
}
