import type { payment as Payment } from '@prisma/client'
import * as z from 'zod'

export const textSchema = z.object({
	name: z.string({ required_error: '名前は必須項目です' }).min(2, {
		message: '名前は2文字以上で入力してください',
	}),
})

export const emailSchema = z.object({
	email: z
		.string({ required_error: 'メールアドレスは必須項目です' })
		.email({ message: 'メールアドレスが無効です' }),
})

export const passwordSchema = z.object({
	password: z
		.string({ required_error: 'パスワードは必須項目です' })
		.min(8, { message: 'パスワードは8文字以上で入力してください' }),
})

export const textareaSchema = z.object({
	message: z
		.string({ required_error: 'メッセージは必須項目です' })
		.min(10, { message: 'メッセージは10文字以上で入力してください' }),
})

export const selectSchema = z.object({
	fruit: z
		.string({ required_error: 'フルーツは必須項目です' })
		.min(1, { message: 'フルーツを選択してください' })
		.refine((val) => ['apple', 'banana', 'orange'].includes(val), {
			message: '有効なフルーツを選択してください',
		}),
})

export const checkboxSchema = z.object({
	terms: z.boolean({ required_error: '利用規約に同意する必要があります' }),
})

export const radioSchema = z.object({
	option: z.enum(['default', 'comfortable', 'compact'], {
		required_error: 'オプションを選択してください',
	}),
})

export const dateSchema = z.object({
	date: z.date({
		required_error: '日付を選択してください',
	}),
})

export const formSchema = z.object({
	email: z.string({ required_error: 'メールアドレスは必須項目です' }).email({
		message: 'メールアドレスを入力してください',
	}),
	password: z
		.string({ required_error: 'パスワードは必須項目です' })
		.min(8, { message: 'パスワードは8文字以上で入力してください' }),
})

export const signupSchema = z
	.object({
		name: z.string({ required_error: '名前は必須項目です' }).min(2, {
			message: '名前は2文字以上で入力してください',
		}),
		email: z.string({ required_error: 'メールアドレスは必須項目です' }).email({
			message: 'メールアドレスを入力してください',
		}),
		password: z.string({ required_error: 'パスワードは必須項目です' }).min(8, {
			message: 'パスワードは8文字以上で入力してください',
		}),
		confirmPassword: z.string({
			required_error: 'パスワード確認は必須項目です',
		}),
	})
	.refine((data) => data.password === data.confirmPassword, {
		message: 'パスワードが一致しません',
		path: ['confirmPassword'],
	})

export const paymentSchema = z.object({
	email: z
		.string()
		.email({ message: 'メールアドレスが無効です' })
		.nullable()
		.optional(),
	amount: z
		.number()
		.min(0, { message: '金額は0以上である必要があります' })
		.nullable()
		.optional(),
	status: z.string().nullable().optional(),
})

export const commonColumnsSchema = z.object({
	id: z.number(),
	created_at: z.date().nullable().optional(),
	updated_at: z.date().nullable().optional(),
})
