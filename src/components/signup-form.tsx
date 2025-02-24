'use client'

import { Button } from '@/components/ui/button'
import { Card, CardContent } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { signupSchema } from '@/lib/schemas'
import { cn } from '@/lib/util/utils'
import type { SubmissionResult } from '@conform-to/dom'
import { getInputProps, useForm } from '@conform-to/react'
import { parseWithZod } from '@conform-to/zod'
import { signIn } from 'next-auth/react'
import Form from 'next/form'
import { useRouter } from 'next/navigation'
import { useActionState } from 'react'

export function SignupForm({
	className,
	callbackUrl,
	...props
}: React.ComponentPropsWithoutRef<'div'> & {
	callbackUrl?: string
}) {
	const [result, formAction, isPending] = useActionState(submitSignupForm, null)
	const router = useRouter()

	const successResult = result as unknown as ApiResponse<null> | null
	const lastResult = result as unknown as SubmissionResult<string[]> | null
	const [form, fields] = useForm({
		lastResult,
		onValidate({ formData }) {
			return parseWithZod(formData, { schema: signupSchema })
		},
		shouldRevalidate: 'onInput',
	})

	async function submitSignupForm(prevState: unknown, formData: FormData) {
		try {
			// ここでサインアップのAPIを呼び出す
			const response = await fetch(
				`${process.env.NEXT_PUBLIC_API_URL}/api/signup`,
				{
					method: 'POST',
					body: formData,
				},
			)

			if (!response.ok) {
				const data = await response.json()
				return {
					status: data.status,
					message: data.message,
				} as ApiResponse<null>
			}

			// サインアップ成功後、自動的にログイン
			const result = await signIn('credentials', {
				email: formData.get('email'),
				password: formData.get('password'),
				redirect: false,
				callbackUrl,
			})

			if (result?.error) {
				return {
					status: 'error',
					message: 'ログインに失敗しました。',
				}
			}

			router.push(callbackUrl || '/dashboard')
			router.refresh()

			return { status: 'success', message: 'アカウントを作成しました' }
		} catch (error) {
			return {
				status: 'error',
				message: 'エラーが発生しました。',
			}
		}
	}

	return (
		<div className={cn('flex flex-col gap-6', className)} {...props}>
			<Card>
				<CardContent className="pt-10">
					<div className="grid gap-6">
						<Form
							id={form.id}
							onSubmit={form.onSubmit}
							action={formAction}
							noValidate
						>
							<div className="grid gap-6">
								<div className="grid gap-2">
									<label htmlFor={fields.name.id}>名前</label>
									<Input
										placeholder="山田 太郎"
										{...getInputProps(fields.name, { type: 'text' })}
										key={fields.name.id}
									/>
									<div className="text-destructive">{fields.name.errors}</div>
								</div>
								<div className="grid gap-2">
									<label htmlFor={fields.email.id}>メールアドレス</label>
									<Input
										placeholder="example@example.com"
										{...getInputProps(fields.email, { type: 'email' })}
										key={fields.email.id}
									/>
									<div className="text-destructive">{fields.email.errors}</div>
								</div>
								<div className="grid gap-2">
									<label htmlFor={fields.password.id}>パスワード</label>
									<Input
										{...getInputProps(fields.password, { type: 'password' })}
										key={fields.password.id}
									/>
									<div className="text-destructive">
										{fields.password.errors}
									</div>
								</div>
								<div className="grid gap-2">
									<label htmlFor={fields.confirmPassword.id}>
										パスワード（確認）
									</label>
									<Input
										{...getInputProps(fields.confirmPassword, {
											type: 'password',
										})}
										key={fields.confirmPassword.id}
									/>
									<div className="text-destructive">
										{fields.confirmPassword.errors}
									</div>
								</div>
								<Button className="w-full" type="submit" disabled={isPending}>
									{isPending ? '作成中...' : 'アカウントを作成'}
								</Button>
							</div>
						</Form>
						<div className="text-center text-sm">
							すでにアカウントをお持ちの場合{' '}
							<a href="/login" className="underline underline-offset-4">
								ログイン
							</a>
						</div>
					</div>
					{lastResult?.status === 'success' ? (
						<p className="mt-4 text-green-600">{successResult?.message}</p>
					) : (
						<p className="mt-4 text-destructive">{successResult?.message}</p>
					)}
				</CardContent>
			</Card>
		</div>
	)
}
