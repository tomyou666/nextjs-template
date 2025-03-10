import { ThemeProvider } from '@/components/theme-provider'
import type { Metadata, Viewport } from 'next'
import { Inter } from 'next/font/google'
import './globals.css'
import { Footer } from '@/components/footer'
import { APP_NAME } from '@/lib/share/constants'
import { Providers } from './providers'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
	title: APP_NAME,
	description: 'Next.jsテンプレートアプリケーション',
}

export const viewport: Viewport = {
	themeColor: [
		{ media: '(prefers-color-scheme: light)', color: 'white' },
		{ media: '(prefers-color-scheme: dark)', color: 'black' },
	],
}

export default function RootLayout({
	children,
}: Readonly<{
	children: React.ReactNode
}>) {
	return (
		<html lang="ja" suppressHydrationWarning>
			<body className={inter.className}>
				<Providers>
					<div className="flex min-h-screen flex-col">
						<div className="flex-1">
							<ThemeProvider
								attribute="class"
								defaultTheme="system"
								enableSystem
								disableTransitionOnChange
							>
								{children}
							</ThemeProvider>
						</div>
						<Footer />
					</div>
				</Providers>
			</body>
		</html>
	)
}
