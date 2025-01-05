'use client'

import { zodResolver } from '@hookform/resolvers/zod'
import { signIn } from 'next-auth/react'
import { useRouter } from 'next/navigation'
import { useState } from 'react'
import { useForm } from 'react-hook-form'
import * as z from 'zod'

import { Button } from '@/components/ui/button'
import {
	Form,
	FormControl,
	FormField,
	FormItem,
	FormLabel,
	FormMessage,
} from '@/components/ui/form'
import { Input } from '@/components/ui/input'
import { toast } from '@/hooks/use-toast'

const formSchema = z.object({
	email: z.string().email({
		message: 'メールアドレスを入力してください。',
	}),
	password: z.string().min(8, {
		message: 'パスワードは8文字以上で入力してください。',
	}),
})

export default function LoginPage() {
	const [isLoading, setIsLoading] = useState(false)
	const router = useRouter()

	const form = useForm<z.infer<typeof formSchema>>({
		resolver: zodResolver(formSchema),
		defaultValues: {
			email: '',
			password: '',
		},
	})

	async function onSubmit(values: z.infer<typeof formSchema>) {
		setIsLoading(true)

		try {
			const result = await signIn('credentials', {
				email: values.email,
				password: values.password,
				redirect: false,
			})

			if (result?.error) {
				toast({
					title: 'ログインに失敗しました',
					description: 'メールアドレスまたはパスワードが間違っています。',
					variant: 'destructive',
				})
				return
			}

			toast({
				title: 'ログインしました',
			})
			router.push('/dashboard')
			router.refresh()
		} finally {
			setIsLoading(false)
		}
	}

	return (
		<div className="flex h-screen items-center justify-center">
			<div className="w-full max-w-md space-y-8">
				<div className="text-center">
					<h2 className="mt-6 font-bold text-3xl tracking-tight">
						アカウントにログイン
					</h2>
				</div>
				<Form {...form}>
					<form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
						<FormField
							control={form.control}
							name="email"
							render={({ field }) => (
								<FormItem>
									<FormLabel>メールアドレス</FormLabel>
									<FormControl>
										<Input placeholder="example@example.com" {...field} />
									</FormControl>
									<FormMessage />
								</FormItem>
							)}
						/>
						<FormField
							control={form.control}
							name="password"
							render={({ field }) => (
								<FormItem>
									<FormLabel>パスワード</FormLabel>
									<FormControl>
										<Input type="password" {...field} />
									</FormControl>
									<FormMessage />
								</FormItem>
							)}
						/>
						<div className="space-y-4">
							<Button className="w-full" type="submit" disabled={isLoading}>
								{isLoading ? 'ログイン中...' : 'ログイン'}
							</Button>
							<Button
								className="w-full"
								variant="outline"
								onClick={() => signIn('github')}
								type="button"
							>
								GitHubでログイン
							</Button>
						</div>
					</form>
				</Form>
			</div>
		</div>
	)
}
