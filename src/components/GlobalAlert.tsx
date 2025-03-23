'use client'

import { Alert, AlertDescription } from '@/components/ui/alert'
import { useAlertStore } from '@/lib/store'

export const GlobalAlert = () => {
	const { alertType, alertMessage, getAlertStyle } = useAlertStore()

	// アラートが表示されていない場合は何も表示しない
	if (!alertType) return null

	// アラートのスタイルとアイコンを取得
	const { alertClassName, AlertIcon } = getAlertStyle()

	return (
		<div className="pointer-events-none fixed top-4 right-0 left-0 z-50 px-4">
			<div className="pointer-events-auto mx-auto max-w-full rounded-md shadow-lg">
				<Alert className={`flex items-center ${alertClassName}`}>
					<div className="flex items-center">
						<AlertIcon className="mr-2 h-5 w-5" />
						<AlertDescription className="font-medium text-base">
							{alertMessage}
						</AlertDescription>
					</div>
				</Alert>
			</div>
		</div>
	)
}
