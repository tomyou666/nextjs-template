import * as z from 'zod'

export const textSchema = z.object({
	name: z.string().min(2, { message: '名前は2文字以上で入力してください。' }),
})

export const emailSchema = z.object({
	email: z.string().email({ message: 'メールアドレスが無効です。' }),
})

export const passwordSchema = z.object({
	password: z
		.string()
		.min(8, { message: 'パスワードは8文字以上で入力してください。' }),
})

export const textareaSchema = z.object({
	message: z
		.string()
		.min(10, { message: 'メッセージは10文字以上で入力してください。' }),
})

export const selectSchema = z.object({
	fruit: z
		.string()
		.min(1, { message: 'フルーツを選択してください。' })
		.refine((val) => ['apple', 'banana', 'orange'].includes(val), {
			message: '有効なフルーツを選択してください。',
		}),
})

export const checkboxSchema = z.object({
	terms: z
		.boolean()
		.refine((val) => val === true, {
			message: '利用規約に同意する必要があります。',
		}),
})

export const radioSchema = z.object({
	option: z.enum(['default', 'comfortable', 'compact'], {
		required_error: 'オプションを選択してください。',
	}),
})

export const dateSchema = z.object({
	date: z.date({
		required_error: '日付を選択してください。',
	}),
})

export const formSchema = z.object({
	email: z.string().email({
		message: 'メールアドレスを入力してください。',
	}),
	password: z.string().min(8, {
		message: 'パスワードは8文字以上で入力してください。',
	}),
})
