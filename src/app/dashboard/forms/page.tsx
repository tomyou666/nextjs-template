'use client'

import { CheckboxSample } from '@/app/dashboard/forms/CheckboxSample'
import { DatePickerSample } from '@/app/dashboard/forms/DatePickerSample'
import { EmailInputSample } from '@/app/dashboard/forms/EmailInputSample'
import { PasswordInputSample } from '@/app/dashboard/forms/PasswordInputSample'
import { RadioGroupSample } from '@/app/dashboard/forms/RadioGroupSample'
import { SelectSample } from '@/app/dashboard/forms/SelectSample'
import { TextInputSample } from '@/app/dashboard/forms/TextInputSample'
import { TextareaSample } from '@/app/dashboard/forms/TextareaSample'
import { MarkdownHelpDialog } from '@/components/MarkDownHelpDIalog'
import { formHelpContent } from '@/lib/frontend/markdown/formHelp'

export default function FormsPage() {
	return (
		<div className="flex-1 space-y-4 p-8 pt-6">
			<div className="flex items-center justify-between space-y-2">
				<h2 className="font-bold text-3xl tracking-tight">Forms</h2>
				<MarkdownHelpDialog
					title="Next.jsのフォーム実装について"
					content={formHelpContent}
					ariaLabel="フォームについてのヘルプ"
				/>
			</div>
			<div className="grid grid-cols-1 gap-8 md:grid-cols-2">
				<TextInputSample />
				<EmailInputSample />
				<PasswordInputSample />
				<TextareaSample />
				<SelectSample />
				<CheckboxSample />
				<RadioGroupSample />
				<DatePickerSample />
			</div>
		</div>
	)
}
