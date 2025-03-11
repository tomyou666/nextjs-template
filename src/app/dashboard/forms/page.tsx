'use client'

import { CheckboxSample } from '@/app/dashboard/forms/CheckboxSample'
import { DatePickerSample } from '@/components/DatePickerSample'
import { EmailInputSample } from '@/components/EmailInputSample'
import { MarkdownHelpDialog } from '@/components/MarkDownHelpDIalog'
import { PasswordInputSample } from '@/components/PasswordInputSample'
import { RadioGroupSample } from '@/components/RadioGroupSample'
import { SelectSample } from '@/components/SelectSample'
import { TextInputSample } from '@/components/TextInputSample'
import { TextareaSample } from '@/components/TextareaSample'
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
