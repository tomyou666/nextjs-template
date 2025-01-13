'use client'

import { Button } from '@/components/ui/button'
import {
	Card,
	CardContent,
	CardDescription,
	CardHeader,
	CardTitle,
} from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { submitTextForm } from '@/lib/actions'
import { textSchema } from '@/lib/schemas'
import type { SubmissionResult } from '@conform-to/dom'
import { useForm } from '@conform-to/react'
import { parseWithZod } from '@conform-to/zod'
import Form from 'next/form'
import { useActionState } from 'react'

export function TextInputSample() {
	const [result, formAction, isPending] = useActionState(submitTextForm, null)
	const successResult = result as unknown as {
		status: string
		message: string
	} | null
	const lastResult = result as unknown as SubmissionResult<string[]> | null
	const [form, fields] = useForm({
		lastResult,
		onValidate({ formData }) {
			return parseWithZod(formData, { schema: textSchema })
		},
		shouldValidate: 'onBlur',
		shouldRevalidate: 'onInput',
	})

	return (
		<Card>
			<CardHeader>
				<CardTitle>Text Input</CardTitle>
				<CardDescription>Enter your name</CardDescription>
			</CardHeader>
			<CardContent>
				<Form
					id={form.id}
					onSubmit={form.onSubmit}
					action={formAction}
					noValidate
				>
					<div className="space-y-4">
						<div>
							<label
								htmlFor={fields.name.id}
								className="font-medium text-sm leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
							>
								Name
							</label>
							<Input
								key={fields.name.key}
								name={fields.name.name}
								type="text"
								placeholder="John Doe"
							/>
							<div className="mt-2 text-destructive text-sm">
								{fields.name.errors}
							</div>
						</div>
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
