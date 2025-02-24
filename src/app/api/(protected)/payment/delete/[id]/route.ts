import { auth } from '@/lib/apiAuth'
import { prisma } from '@/lib/prisma'
import type { payment as Payment } from '@prisma/client'
import { type NextRequest, NextResponse } from 'next/server'

export const DELETE = auth(async (req: NextRequest) => {
	const id = req.nextUrl.pathname.split('/').pop()

	// nullチェック
	if (!id) {
		return NextResponse.json(
			{
				status: 'error',
				message: 'id is required',
			} as ApiResponse<Payment>,
			{ status: 400 },
		)
	}

	try {
		const payment: Payment = await prisma.payment.delete({
			where: { id: Number(id) },
		})

		const response: ApiResponse<Payment> = {
			status: 'success',
			data: payment,
		}
		return NextResponse.json(response, { status: 200 })
	} catch (error) {
		return NextResponse.json(
			{
				status: 'error',
				message: 'payment not found',
			} as ApiResponse<Payment>,
			{ status: 404 },
		)
	}
})
