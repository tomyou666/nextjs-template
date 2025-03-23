'use client'

import { AlertButtonSample } from '@/app/dashboard/error/AlertButtonSample'
import { ErrorButtonSample } from '@/app/dashboard/error/ErrorButtonSample'
import { LogButtonSample } from '@/app/dashboard/error/LogButtonSample'
import { ToastButtonSample } from '@/app/dashboard/error/ToastButtonSample'
import { MarkdownHelpDialog } from '@/components/MarkDownHelpDIalog'
import { errorHelpContent } from '@/lib/frontend/markdown/errorHelp'

export default function ErrorPage() {
	return (
		<div className="flex-1 space-y-4 p-8 pt-6">
			<div className="flex items-center justify-between space-y-2">
				<h2 className="font-bold text-3xl tracking-tight">
					通知・エラー・ログテスト
				</h2>
				<MarkdownHelpDialog
					title="Next.jsでの通知・エラー処理について"
					content={errorHelpContent}
					ariaLabel="通知・エラー処理についてのヘルプ"
				/>
			</div>
			<div className="grid grid-cols-1 gap-8 md:grid-cols-2">
				<ToastButtonSample />
				<AlertButtonSample />
				<ErrorButtonSample />
				<LogButtonSample />
			</div>
		</div>
	)
}
