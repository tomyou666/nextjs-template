'use client'

import { submitTextareaForm } from '@/app/actions'
import { Button } from '@/components/ui/button'
import {
	Card,
	CardContent,
	CardDescription,
	CardHeader,
	CardTitle,
} from '@/components/ui/card'
import { Textarea } from '@/components/ui/textarea'
import { textareaSchema } from '@/lib/schemas'
import type { SubmissionResult } from '@conform-to/dom'
import { getTextareaProps, useForm } from '@conform-to/react'
import { parseWithZod } from '@conform-to/zod'
import Form from 'next/form'
import { useActionState } from 'react'

export function TextareaSample() {
	const [result, formAction, isPending] = useActionState(
		submitTextareaForm,
		null,
	)
	const successResult = result as unknown as {
		status: string
		message: string
	} | null
	const lastResult = result as unknown as SubmissionResult<string[]> | null
	const [form, fields] = useForm({
		lastResult,
		onValidate({ formData }) {
			return parseWithZod(formData, { schema: textareaSchema })
		},
		shouldValidate: 'onBlur',
		shouldRevalidate: 'onInput',
	})

	return (
		<Card>
			<CardHeader>
				<CardTitle>Textarea</CardTitle>
				<CardDescription>Enter your message</CardDescription>
			</CardHeader>
			<CardContent>
				<Form
					id={form.id}
					onSubmit={form.onSubmit}
					action={formAction}
					noValidate
				>
					<div className="space-y-4">
						<Textarea
							{...getTextareaProps(fields.message)}
							key={fields.message.key}
							placeholder="Type your message here..."
						/>
						<div className="text-destructive">{fields.message.errors}</div>
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
