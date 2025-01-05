import { prisma } from '@/lib/prisma'
import { PrismaAdapter } from '@auth/prisma-adapter'
import type { NextAuthOptions } from 'next-auth'
import NextAuth from 'next-auth/next'
import CredentialsProvider from 'next-auth/providers/credentials'
import GithubProvider from 'next-auth/providers/github'

const authOptions: NextAuthOptions = {
	adapter: PrismaAdapter(prisma),
	session: {
		strategy: 'jwt',
		maxAge: 10, // 10sec
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
				if (!credentials?.email || !credentials?.password) {
					return null
				}

				const user = await prisma.user.findUnique({
					where: {
						email: credentials.email,
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
