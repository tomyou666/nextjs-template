'use client'

import { zodResolver } from '@hookform/resolvers/zod'
import { useForm } from 'react-hook-form'
import * as z from 'zod'

import { CheckboxSample } from '@/components/CheckboxSample'
import { DatePickerSample } from '@/components/DatePickerSample'
import { EmailInputSample } from '@/components/EmailInputSample'
import { PasswordInputSample } from '@/components/PasswordInputSample'
import { RadioGroupSample } from '@/components/RadioGroupSample'
import { SelectSample } from '@/components/SelectSample'
import { TextInputSample } from '@/components/TextInputSample'
import { TextareaSample } from '@/components/TextareaSample'
import { toast } from '@/hooks/use-toast'

const formSchema = z.object({
	username: z.string().min(2, {
		message: 'Username must be at least 2 characters.',
	}),
	email: z.string().email({
		message: 'Please enter a valid email address.',
	}),
	bio: z.string().max(160).min(4),
	role: z.string({
		required_error: 'Please select a role.',
	}),
	expertise: z.array(z.string()).refine((value) => value.some((item) => item), {
		message: 'You have to select at least one expertise.',
	}),
	notifications: z.enum(['all', 'important', 'none'], {
		required_error: 'You need to select a notification option.',
	}),
	marketing: z.boolean().default(false).optional(),
})

export default function FormsPage() {
	const form = useForm<z.infer<typeof formSchema>>({
		resolver: zodResolver(formSchema),
		defaultValues: {
			username: '',
			email: '',
			bio: '',
			marketing: false,
		},
	})

	function onSubmit(values: z.infer<typeof formSchema>) {
		toast({
			title: 'You submitted the following values:',
			description: (
				<pre className="mt-2 w-[340px] rounded-md bg-slate-950 p-4">
					<code className="text-white">{JSON.stringify(values, null, 2)}</code>
				</pre>
			),
		})
	}

	return (
		<div className="flex-1 space-y-4 p-8 pt-6">
			<div className="flex items-center justify-between space-y-2">
				<h2 className="font-bold text-3xl tracking-tight">Forms</h2>
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
