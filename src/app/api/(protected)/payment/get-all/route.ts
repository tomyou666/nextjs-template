import { auth } from '@/lib/backend/auth/apiAuth'
import { prisma } from '@/lib/prisma'
import type { payment as Payment } from '@prisma/client'
import { type NextRequest, NextResponse } from 'next/server'

export const GET = auth(async (req: NextRequest) => {
	const payments: Payment[] = await prisma.payment.findMany()
	const response: ApiResponse<Payment[]> = {
		status: 'success',
		data: payments,
	}
	return NextResponse.json(response, { status: 200 })
})
