import { PrismaAdapter } from '@auth/prisma-adapter'
import { compare } from 'bcryptjs'
import type { NextAuthOptions } from 'next-auth'
import CredentialsProvider from 'next-auth/providers/credentials'
import GithubProvider from 'next-auth/providers/github'
import { prisma } from '../../prisma'
import { AUTH_CONSTANTS } from '../../share/constants'
import { logger } from '../../share/logger'
import { formSchema } from '../../share/schemas'

// Email以外でログインしたい場合
// ➀ スキーマに追加したいカラム（usernameなど）を追加
// ➁ Providersに追加したいカラムを追加するようにする
// // @ts-ignore - カスタムアダプターの作成(Email以外でログインしたい場合)
// prismaAdapter.createUser = (data) => {
// 	return prisma.user.create({
// 		data: {
// 			name: data.name,
// 			username: data.username,
// 			// email関連のフィールドは省略など
// 		},
// 	})
// }

export const authOptions: NextAuthOptions = {
	adapter: PrismaAdapter(prisma),
	session: {
		strategy: 'jwt',
		maxAge: AUTH_CONSTANTS.SESSION_MAX_AGE,
	},
	providers: [
		GithubProvider({
			// biome-ignore lint/style/noNonNullAssertion: <explanation>
			clientId: process.env.AUTH_GITHUB_ID!,
			// biome-ignore lint/style/noNonNullAssertion: <explanation>
			clientSecret: process.env.AUTH_GITHUB_SECRET!,
		}),
		CredentialsProvider({
			name: 'Credentials',
			credentials: {
				// 認証で利用するformのフィールドを指定
				email: { label: 'Email', type: 'email' },
				password: { label: 'Password', type: 'password' },
			},
			async authorize(credentials) {
				try {
					const result = formSchema.safeParse(credentials)
					if (!result.success) {
						throw new Error('バリデーションエラー')
					}

					const user = await prisma.user.findUnique({
						where: {
							email: credentials?.email,
						},
					})

					if (!user || !user.password) {
						throw new Error('メールアドレスまたはパスワードが間違っています。')
					}

					const isPasswordValid = await compare(
						credentials?.password as string,
						user.password,
					)

					if (!isPasswordValid) {
						throw new Error('メールアドレスまたはパスワードが間違っています。')
					}
					// authorize関数の返り値 → jwt コールバック → JWTトークン内容 → セッション情報
					return {
						id: user.id,
						email: user.email,
						name: user.name,
						image: user.image,
					}
				} catch (error) {
					logger.error(error)
					throw new Error(
						error instanceof Error ? error.message : 'ログインに失敗しました',
					)
				}
			},
		}),
	],
	callbacks: {
		session: ({ session, token }) => {
			// セッションにユーザー情報を追加
			return {
				...session,
				user: {
					...session.user,
					id: token.id,
				},
			}
		},
		jwt: ({ token, user }) => {
			// トークンにユーザー情報を追加
			if (user) {
				return {
					...token,
					id: user.id,
				}
			}
			return token
		},
	},
	pages: {
		signIn: AUTH_CONSTANTS.LOGIN_PAGE,
	},
}
