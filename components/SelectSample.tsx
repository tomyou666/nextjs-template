'use client'

import { submitSelectForm } from '@/app/actions'
import { Button } from '@/components/ui/button'
import {
	Card,
	CardContent,
	CardDescription,
	CardHeader,
	CardTitle,
} from '@/components/ui/card'
import {
	Select,
	SelectContent,
	SelectItem,
	SelectTrigger,
	SelectValue,
} from '@/components/ui/select'
import { selectSchema } from '@/lib/schemas'
import type { SubmissionResult } from '@conform-to/dom'
import { getSelectProps, useForm } from '@conform-to/react'
import { parseWithZod } from '@conform-to/zod'
import Form from 'next/form'
import { useActionState } from 'react'

export function SelectSample() {
	const [result, formAction, isPending] = useActionState(submitSelectForm, null)
	const successResult = result as unknown as {
		status: string
		message: string
	} | null
	const lastResult = result as unknown as SubmissionResult<string[]> | null
	const [form, fields] = useForm({
		lastResult,
		onValidate({ formData }) {
			return parseWithZod(formData, { schema: selectSchema })
		},
		shouldValidate: 'onBlur',
		shouldRevalidate: 'onInput',
	})

	return (
		<Card>
			<CardHeader>
				<CardTitle>Select</CardTitle>
				<CardDescription>Choose your favorite fruit</CardDescription>
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
								htmlFor={fields.fruit.id}
								className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
							>
								Fruit
							</label>
							<Select key={fields.fruit.key} name={fields.fruit.name}>
								<SelectTrigger>
									<SelectValue placeholder="Select a fruit" />
								</SelectTrigger>
								<SelectContent>
									<SelectItem value="apple">Apple</SelectItem>
									<SelectItem value="banana">Banana</SelectItem>
									<SelectItem value="orange">Orange</SelectItem>
								</SelectContent>
							</Select>
							<div className="text-sm text-destructive mt-2">
								{fields.fruit.errors}
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
