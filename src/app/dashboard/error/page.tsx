'use client'

import { AlertButtonSample } from '@/components/AlertButtonSample'
import { ErrorButtonSample } from '@/components/ErrorButtonSample'
import { ToastButtonSample } from '@/components/ToastButtonSample'

export default function ErrorPage() {
	return (
		<div className="flex-1 space-y-4 p-8 pt-6">
			<div className="flex items-center justify-between space-y-2">
				<h2 className="font-bold text-3xl tracking-tight">
					通知・エラーテスト
				</h2>
			</div>
			<div className="grid grid-cols-1 gap-8 md:grid-cols-2">
				<ToastButtonSample />
				<AlertButtonSample />
				<ErrorButtonSample />
			</div>
		</div>
	)
}
