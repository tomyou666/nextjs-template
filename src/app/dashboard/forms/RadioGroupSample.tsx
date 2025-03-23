'use client'

import { Button } from '@/components/ui/button'
import {
	Card,
	CardContent,
	CardDescription,
	CardHeader,
	CardTitle,
} from '@/components/ui/card'
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group'
import { submitRadioForm } from '@/lib/backend/actions'
import { radioSchema } from '@/lib/share/schemas'
import type { SubmissionResult } from '@conform-to/dom'
import { getCollectionProps, useForm } from '@conform-to/react'
import { parseWithZod } from '@conform-to/zod'
import Form from 'next/form'
import { useActionState } from 'react'

export function RadioGroupSample() {
	const [result, formAction, isPending] = useActionState(submitRadioForm, null)
	const successResult = result as unknown as {
		status: string
		message: string
	} | null
	const lastResult = result as unknown as SubmissionResult<string[]> | null
	const [form, fields] = useForm({
		lastResult,
		onValidate({ formData }) {
			return parseWithZod(formData, { schema: radioSchema })
		},
		shouldValidate: 'onBlur',
	})

	return (
		<Card>
			<CardHeader>
				<CardTitle>Radio Group</CardTitle>
				<CardDescription>Select your preferred option</CardDescription>
			</CardHeader>
			<CardContent>
				<Form
					id={form.id}
					onSubmit={form.onSubmit}
					action={formAction}
					noValidate
				>
					<div className="space-y-4">
						<RadioGroup
							defaultValue={fields.option.value}
							className="flex flex-col space-y-1"
							name={fields.option.name}
						>
							{getCollectionProps(fields.option, {
								type: 'radio',
								options: ['default', 'comfortable', 'compact'],
							}).map((props) => (
								<div className="flex items-center space-x-2" key={props.id}>
									<RadioGroupItem id={props.id} value={props.value} />
									<label htmlFor={props.id}>{props.value}</label>
								</div>
							))}
						</RadioGroup>
						<div className="text-destructive">{fields.option.errors}</div>
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
