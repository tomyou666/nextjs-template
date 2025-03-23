'use server'

import {
	checkboxSchema,
	dateSchema,
	emailSchema,
	passwordSchema,
	radioSchema,
	selectSchema,
	textSchema,
	textareaSchema,
} from '@/lib/share/schemas'
import { parseWithZod } from '@conform-to/zod'
import { revalidatePath } from 'next/cache'

export async function submitTextareaForm(
	prevState: unknown,
	formData: FormData,
) {
	const submission = parseWithZod(formData, {
		schema: textareaSchema,
	})

	if (submission.status !== 'success') {
		return submission.reply()
	}

	console.log('フォームが送信されました:', submission.value)
	return { status: 'success', message: 'フォームの送信が完了しました！' }
}

export async function submitEmailForm(prevState: unknown, formData: FormData) {
	const submission = parseWithZod(formData, {
		schema: emailSchema,
	})

	if (submission.status !== 'success') {
		return submission.reply()
	}

	console.log('フォームが送信されました:', submission.value)
	return { status: 'success', message: 'フォームの送信が完了しました！' }
}

export async function submitPasswordForm(
	prevState: unknown,
	formData: FormData,
) {
	const submission = parseWithZod(formData, {
		schema: passwordSchema,
	})

	if (submission.status !== 'success') {
		return submission.reply()
	}

	console.log('フォームが送信されました:', submission.value)
	return { status: 'success', message: 'フォームの送信が完了しました！' }
}

export async function submitCheckboxForm(
	prevState: unknown,
	formData: FormData,
) {
	const submission = parseWithZod(formData, {
		schema: checkboxSchema,
	})

	if (submission.status !== 'success') {
		return submission.reply()
	}

	console.log('フォームが送信されました:', submission.value)
	return { status: 'success', message: 'フォームの送信が完了しました！' }
}

export async function submitDateForm(prevState: unknown, formData: FormData) {
	const submission = parseWithZod(formData, {
		schema: dateSchema,
	})

	if (submission.status !== 'success') {
		return submission.reply()
	}

	console.log('フォームが送信されました:', submission.value)
	return { status: 'success', message: 'フォームの送信が完了しました！' }
}

export async function submitRadioForm(prevState: unknown, formData: FormData) {
	const submission = parseWithZod(formData, {
		schema: radioSchema,
	})

	if (submission.status !== 'success') {
		return submission.reply()
	}

	console.log('フォームが送信されました:', submission.value)
	return { status: 'success', message: 'フォームの送信が完了しました！' }
}

export async function submitSelectForm(prevState: unknown, formData: FormData) {
	const submission = parseWithZod(formData, {
		schema: selectSchema,
	})

	if (submission.status !== 'success') {
		return submission.reply()
	}

	console.log('フォームが送信されました:', submission.value)
	return { status: 'success', message: 'フォームの送信が完了しました！' }
}

export async function submitTextForm(prevState: unknown, formData: FormData) {
	const submission = parseWithZod(formData, {
		schema: textSchema,
	})

	if (submission.status !== 'success') {
		return submission.reply()
	}

	console.log('フォームが送信されました:', submission.value)
	return { status: 'success', message: 'フォームの送信が完了しました！' }
}

// サーバーアクションを定義
export async function refreshData() {
	// ISRの場合に再レンダリングを行う
	revalidatePath('/dashboard/rendering')
}
