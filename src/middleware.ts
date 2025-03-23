import withAuth, { type NextRequestWithAuth } from 'next-auth/middleware'
import { logger } from './lib/share/logger'

export const config = {
	matcher: [
		// 全体的な保護
		'/((?!api|_next/static|_next/image|favicon.ico|login|signup|$).*)',
		// ダッシュボード配下の保護
		// '/dashboard/:path*',
	],
}

// 認証以外の処理を行う場合
export default withAuth(
	// `withAuth` augments your `Request` with the user's token.
	function middleware(req: NextRequestWithAuth) {
		// 認証以外の処理
		// logger.debug(req)
	},
)

// シンプルな認証処理のみを行う場合
// export { default } from "next-auth/middleware"
