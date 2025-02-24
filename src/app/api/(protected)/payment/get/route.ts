import { auth } from '@/lib/apiAuth'
import { prisma } from '@/lib/prisma'
import type { payment as Payment } from '@prisma/client'
import { type NextRequest, NextResponse } from 'next/server'

export const GET = auth(async (req: NextRequest) => {
	const id = req.nextUrl.searchParams.get('id')
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
	const payment: Payment | null = await prisma.payment.findUnique({
		where: { id: Number(id) },
	})
	// nullチェック
	if (!payment) {
		return NextResponse.json(
			{
				status: 'error',
				message: 'payment not found',
			} as ApiResponse<Payment>,
			{ status: 404 },
		)
	}
	const response: ApiResponse<Payment> = {
		status: 'success',
		data: payment,
	}
	return NextResponse.json(response, { status: 200 })
})
