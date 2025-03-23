import { auth } from '@/lib/backend/auth/apiAuth'
import { logger } from '@/lib/share/logger'
import type { Log } from '@/types/Log'
import { type NextRequest, NextResponse } from 'next/server'

export const POST = auth(async (req: NextRequest) => {
	const data = (await req.json()) as Log
	// @ts-ignore:
	logger[data.level](...data.messages)

	const response: ApiResponse<string> = {
		status: 'success',
		data: 'logging success',
	}

	return NextResponse.json(response, { status: 200 })
})
