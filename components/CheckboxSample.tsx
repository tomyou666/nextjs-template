'use client'

import { submitCheckboxForm } from '@/app/actions'
import { Button } from '@/components/ui/button'
import {
	Card,
	CardContent,
	CardDescription,
	CardHeader,
	CardTitle,
} from '@/components/ui/card'
import { Checkbox } from '@/components/ui/checkbox'
import { checkboxSchema } from '@/lib/schemas'
import type { SubmissionResult } from '@conform-to/dom'
import { getSelectProps, useForm } from '@conform-to/react'
import { parseWithZod } from '@conform-to/zod'
import Form from 'next/form'
import { useActionState } from 'react'

export function CheckboxSample() {
	const [result, formAction, isPending] = useActionState(
		submitCheckboxForm,
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
			return parseWithZod(formData, { schema: checkboxSchema })
		},
		shouldValidate: 'onBlur',
	})

	return (
		<Card>
			<CardHeader>
				<CardTitle>Checkbox</CardTitle>
				<CardDescription>Accept terms and conditions</CardDescription>
			</CardHeader>
			<CardContent>
				<Form
					id={form.id}
					onSubmit={form.onSubmit}
					action={formAction}
					noValidate
				>
					<div className="space-y-4">
						<div className="flex items-center space-x-2">
							<Checkbox
								{...getSelectProps(fields.terms)}
								key={fields.terms.key}
							/>
							<label
								htmlFor={fields.terms.id}
								className="font-medium text-sm leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
							>
								Accept terms and conditions
							</label>
						</div>
						<div className="text-destructive">{fields.terms.errors}</div>
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
