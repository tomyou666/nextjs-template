import withAuth, { type NextRequestWithAuth } from 'next-auth/middleware'
import { logger } from './lib/logger'
// export { default } from "next-auth/middleware"

export const config = {
	matcher: ['/((?!api|_next/static|_next/image|favicon.ico|login|$).*)'],
}
// export const config = {
//   matcher: ["/dashboard/:path* "],
// }

export default withAuth(
	// `withAuth` augments your `Request` with the user's token.
	function middleware(req: NextRequestWithAuth) {
		logger.debug(req)
	},
)
