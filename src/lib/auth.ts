import { PrismaAdapter } from '@auth/prisma-adapter'
import { compare } from 'bcryptjs'
import type { NextAuthOptions } from 'next-auth'
import CredentialsProvider from 'next-auth/providers/credentials'
import GithubProvider from 'next-auth/providers/github'
import { logger } from './logger'
import { prisma } from './prisma'
import { formSchema } from './schemas'

export const authOptions: NextAuthOptions = {
	adapter: PrismaAdapter(prisma),
	session: {
		strategy: 'jwt',
		maxAge: 60 * 60 * 24 * 30, // 1month
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

					return {
						id: user.id,
						email: user.email,
						name: user.name,
						image: user.image,
					}
				} catch (error) {
					logger.error(error)
					// エラーメッセージを返すことで、クライアント側でエラーハンドリングが可能になります
					throw new Error(
						error instanceof Error ? error.message : 'ログインに失敗しました',
					)
				}
			},
		}),
	],
	callbacks: {
		session: ({ session, token }) => {
			return {
				...session,
				user: {
					...session.user,
					id: token.id,
				},
			}
		},
		jwt: ({ token, user }) => {
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
		signIn: '/login',
	},
}
