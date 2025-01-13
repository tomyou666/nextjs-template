import { authOptions } from '@/app/api/auth/[...nextauth]/route'
import { LoginForm } from '@/components/login-form'
import { getServerSession } from 'next-auth'
import { redirect } from 'next/navigation'

export default async function LoginPage({
	searchParams,
}: {
	searchParams: { callbackUrl?: string }
}) {
	const session = await getServerSession(authOptions)

	// ログイン済みの場合、callbackUrlまたはデフォルトのダッシュボードにリダイレクト
	if (session) {
		redirect(searchParams.callbackUrl || '/dashboard')
	}

	return (
		<div className="flex min-h-svh flex-col items-center justify-center gap-6 bg-muted p-6 md:p-10">
			<div className="flex w-full max-w-sm flex-col gap-6">
				<LoginForm callbackUrl={searchParams.callbackUrl} />
			</div>
		</div>
	)
}
