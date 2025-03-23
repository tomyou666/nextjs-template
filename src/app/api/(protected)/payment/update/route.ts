import { auth } from '@/lib/backend/auth/apiAuth'
import { prisma } from '@/lib/prisma'
import { commonColumnsSchema, paymentSchema } from '@/lib/share/schemas'
import type { payment as Payment } from '@prisma/client'
import { type NextRequest, NextResponse } from 'next/server'

export const PUT = auth(
	async (req: NextRequest): Promise<NextResponse<ApiResponse<Payment>>> => {
		try {
			const data = (await req.json()) as Payment
			const result = paymentSchema.safeParse(data)

			if (!result.success) {
				const errorResponse: ApiResponse<Payment> = {
					status: 'error',
					message: 'バリデーションエラー',
					errors: result.error.flatten().fieldErrors,
				}
				return NextResponse.json(errorResponse, { status: 400 })
			}

			const commonColumnsResult = commonColumnsSchema.safeParse(data)

			if (!commonColumnsResult.success) {
				const errorResponse: ApiResponse<Payment> = {
					status: 'error',
					message: 'バリデーションエラー',
					errors: commonColumnsResult.error.flatten().fieldErrors,
				}
				return NextResponse.json(errorResponse, { status: 400 })
			}

			const payment = await prisma.payment.update({
				where: { id: data.id },
				data: result.data,
			})

			const successResponse: ApiResponse<Payment> = {
				status: 'success',
				data: payment,
			}
			return NextResponse.json(successResponse, { status: 200 })
		} catch (error) {
			console.error('Payment update error:', error)
			const errorResponse: ApiResponse<Payment> = {
				status: 'error',
				message: 'サーバーエラーが発生しました',
			}
			return NextResponse.json(errorResponse, { status: 500 })
		}
	},
)
