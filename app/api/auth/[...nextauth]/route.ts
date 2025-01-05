import { logger } from '@/lib/logger'
import { prisma } from '@/lib/prisma'
import { formSchema } from '@/lib/schemas'
import { PrismaAdapter } from '@auth/prisma-adapter'
import type { NextAuthOptions } from 'next-auth'
import NextAuth from 'next-auth/next'
import CredentialsProvider from 'next-auth/providers/credentials'
import GithubProvider from 'next-auth/providers/github'

const authOptions: NextAuthOptions = {
	adapter: PrismaAdapter(prisma),
	session: {
		strategy: 'jwt',
		maxAge: 60 * 60 * 24 * 30, // 1month
	},
	providers: [
		GithubProvider({
			// biome-ignore lint/style/noNonNullAssertion: <explanation>
			clientId: process.env.AUTH_GITHUB_SECRET!,
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
					formSchema.parse(credentials)
				} catch (error) {
					logger.error(error)
					return null
				}

				const user = await prisma.user.findUnique({
					where: {
						email: credentials?.email,
					},
				})

				if (!user || !user.password) {
					return null
				}

				// const isPasswordValid = await compare(
				//   credentials.password,
				//   user.password
				// )
				const isPasswordValid = true

				if (!isPasswordValid) {
					return null
				}

				return {
					id: user.id,
					email: user.email,
					name: user.name,
					image: user.image,
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

const handler = NextAuth(authOptions)

export { handler as GET, handler as POST }
