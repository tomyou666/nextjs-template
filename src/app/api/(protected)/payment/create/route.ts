import { auth } from '@/lib/apiAuth'
import { prisma } from '@/lib/prisma'
import { setKeysToUndefined } from '@/lib/util/utils'
import type { payment as Payment } from '@prisma/client'
import { type NextRequest, NextResponse } from 'next/server'

export const POST = auth(async (req: NextRequest) => {
	try {
		const body = (await req.json()) as Payment
		setKeysToUndefined(body)

		const payment = await prisma.payment.create({
			data: { ...body },
		})

		const response: ApiResponse<Payment> = {
			status: 'success',
			data: payment,
		}
		return NextResponse.json(response, { status: 201 })
	} catch (error) {
		return NextResponse.json(
			{
				status: 'error',
				message: 'Failed to create payment',
			} as ApiResponse<Payment>,
			{ status: 500 },
		)
	}
})
