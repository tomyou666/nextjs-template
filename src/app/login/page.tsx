import { LoginForm } from '@/app/login/LoginForm'
import { authOptions } from '@/lib/backend/auth/auth'
import { getServerSession } from 'next-auth'
import { redirect } from 'next/navigation'

export default async function LoginPage({
	searchParams,
}: {
	searchParams: Promise<{ callbackUrl?: string }>
}) {
	const session = await getServerSession(authOptions)
	const params = await searchParams

	// ログイン済みの場合、callbackUrlまたはデフォルトのダッシュボードにリダイレクト
	if (session) {
		redirect(params.callbackUrl || '/dashboard')
	}

	return (
		<div className="flex min-h-svh flex-col items-center justify-center gap-6 bg-muted p-6 md:p-10">
			<div className="flex w-full max-w-sm flex-col gap-6">
				<LoginForm callbackUrl={params.callbackUrl} />
			</div>
		</div>
	)
}
