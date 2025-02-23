import { logger } from '@/lib/logger'
import { prisma } from '@/lib/prisma'
import { signupSchema } from '@/lib/schemas'
import { hash } from 'bcryptjs'
import * as jdenticon from 'jdenticon'
import { nanoid } from 'nanoid'
import { NextResponse } from 'next/server'

export async function POST(request: Request) {
	try {
		const formData = await request.formData()
		const data = {
			name: formData.get('name'),
			email: formData.get('email'),
			password: formData.get('password'),
			confirmPassword: formData.get('confirmPassword'),
		}

		// バリデーション
		const result = signupSchema.safeParse(data)
		if (!result.success) {
			const response: ApiResponse<null> = {
				data: null,
				status: 'error',
				message: 'バリデーションエラー',
			}
			return NextResponse.json(response, { status: 400 })
		}

		// メールアドレスと名前の重複チェック
		const existingUser = await prisma.user.findFirst({
			where: {
				OR: [{ email: data.email as string }, { name: data.name as string }],
			},
		})
		if (existingUser) {
			throw new Error('メールアドレスまたは名前が既に使用されています')
		}

		// パスワードのハッシュ化
		const hashedPassword = await hash(data.password as string, 12)

		// Jdenticonでアバター画像を生成
		const size = 200 // アバターのサイズ（ピクセル）
		const avatarSvg = jdenticon.toSvg(data.email as string, size)
		const avatarDataUrl = `data:image/svg+xml;base64,${Buffer.from(avatarSvg).toString('base64')}`

		// ここでユーザーをデータベースに保存する処理を実装
		const user = await prisma.user.create({
			data: {
				id: nanoid(),
				name: data.name as string,
				email: data.email as string,
				password: hashedPassword,
				image: avatarDataUrl,
			},
		})
		if (user.id == null) {
			throw new Error('ユーザーの作成に失敗しました')
		}
		const response: ApiResponse<null> = {
			status: 'success',
			message: 'アカウントを作成しました',
		}
		return NextResponse.json(response, { status: 201 })
	} catch (error) {
		logger.error(error)
		const response: ApiResponse<null> = {
			status: 'error',
			message:
				error instanceof Error ? error.message : 'サーバーエラーが発生しました',
		}
		return NextResponse.json(response, { status: 500 })
	}
}
