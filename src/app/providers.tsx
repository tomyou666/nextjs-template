'use client'

import { GlobalAlert } from '@/components/GlobalAlert'
import { ToastContainer } from '@/components/ToastContainer'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { SessionProvider } from 'next-auth/react'

export const queryClient = new QueryClient({
	// defaultOptions: {
	// 	queries: {
	// 		refetchOnWindowFocus: false,
	// 		staleTime: Number.POSITIVE_INFINITY,
	// 		gcTime: 10 * 60 * 1000,
	// 		refetchInterval: 5 * 60 * 1000,
	// 	},
	// },
})

export function Providers({ children }: { children: React.ReactNode }) {
	return (
		<>
			<QueryClientProvider client={queryClient}>
				<SessionProvider>{children}</SessionProvider>
				<ToastContainer />
			</QueryClientProvider>
			<GlobalAlert />
		</>
	)
}
