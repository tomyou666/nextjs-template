import { LoginForm } from '@/app/login/LoginForm'
import { MarkdownHelpDialog } from '@/components/MarkDownHelpDIalog'
import { authOptions } from '@/lib/backend/auth/auth'
import { authHelpContent } from '@/lib/frontend/markdown/authHelp'
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
				<div className="flex items-center justify-between">
					<h2 className="font-bold text-2xl tracking-tight">ログイン</h2>
					<MarkdownHelpDialog
						title="認証システムについて"
						content={authHelpContent}
						ariaLabel="認証についてのヘルプ"
					/>
				</div>
				<LoginForm callbackUrl={params.callbackUrl} />
			</div>
		</div>
	)
}
