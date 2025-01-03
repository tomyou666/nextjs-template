'use client'

import { submitDateForm } from '@/app/actions'
import { Button } from '@/components/ui/button'
import { Calendar } from '@/components/ui/calendar'
import {
	Card,
	CardContent,
	CardDescription,
	CardHeader,
	CardTitle,
} from '@/components/ui/card'
import {
	Popover,
	PopoverContent,
	PopoverTrigger,
} from '@/components/ui/popover'
import { dateSchema } from '@/lib/schemas'
import { cn } from '@/lib/utils'
import type { SubmissionResult } from '@conform-to/dom'
import { useForm, useInputControl } from '@conform-to/react'
import { parseWithZod } from '@conform-to/zod'
import { format } from 'date-fns'
import { CalendarIcon } from 'lucide-react'
import Form from 'next/form'
import { useActionState } from 'react'

export function DatePickerSample() {
	const [result, formAction, isPending] = useActionState(submitDateForm, null)
	const successResult = result as unknown as {
		status: string
		message: string
	} | null
	const lastResult = result as unknown as SubmissionResult<string[]> | null
	const [form, fields] = useForm({
		lastResult,
		onValidate({ formData }) {
			return parseWithZod(formData, { schema: dateSchema })
		},
		shouldValidate: 'onBlur',
	})
	const dateControl = useInputControl(fields.date)

	return (
		<Card>
			<CardHeader>
				<CardTitle>Date Picker</CardTitle>
				<CardDescription>Select a date</CardDescription>
			</CardHeader>
			<CardContent>
				<Form
					id={form.id}
					onSubmit={form.onSubmit}
					action={formAction}
					noValidate
				>
					<div className="space-y-4">
						<Popover>
							<PopoverTrigger asChild>
								<Button
									key={fields.date.key}
									id={fields.date.key}
									name={fields.date.name}
									variant={'outline'}
									className={cn(
										'w-[240px] pl-3 text-left font-normal',
										!fields.date.value && 'text-muted-foreground',
									)}
								>
									{fields.date.value ? (
										format(new Date(fields.date.value), 'PPP')
									) : (
										<span>Pick a date</span>
									)}
									<CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
								</Button>
							</PopoverTrigger>
							<PopoverContent className="w-auto p-0" align="start">
								<Calendar
									mode="single"
									selected={
										fields.date.value ? new Date(fields.date.value) : undefined
									}
									onSelect={(date) => {
										dateControl.change(date?.toISOString() ?? '')
									}}
									disabled={(date) =>
										date > new Date() || date < new Date('1900-01-01')
									}
									initialFocus
								/>
							</PopoverContent>
						</Popover>
						<div className="text-destructive">{fields.date.errors}</div>
						<Button type="submit" disabled={isPending}>
							{isPending ? 'Submitting...' : 'Submit'}
						</Button>
					</div>
				</Form>
				{lastResult?.status === 'success' && (
					<p className="mt-4 text-green-600">{successResult?.message}</p>
				)}
			</CardContent>
		</Card>
	)
}
