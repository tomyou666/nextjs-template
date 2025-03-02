'use client'

import { CheckboxSample } from '@/components/CheckboxSample'
import { DatePickerSample } from '@/components/DatePickerSample'
import { EmailInputSample } from '@/components/EmailInputSample'
import { PasswordInputSample } from '@/components/PasswordInputSample'
import { RadioGroupSample } from '@/components/RadioGroupSample'
import { SelectSample } from '@/components/SelectSample'
import { TextInputSample } from '@/components/TextInputSample'
import { TextareaSample } from '@/components/TextareaSample'
import { ToastButtonSample } from '@/components/ToastButtonSample'

export default function FormsPage() {
	return (
		<div className="flex-1 space-y-4 p-8 pt-6">
			<div className="flex items-center justify-between space-y-2">
				<h2 className="font-bold text-3xl tracking-tight">Forms</h2>
			</div>
			<div className="grid grid-cols-1 gap-8 md:grid-cols-2">
				<ToastButtonSample />
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
