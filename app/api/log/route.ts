import { auth } from '@/lib/apiAuth'
import { logger } from '@/lib/logger'
import type { Log } from '@/types/Log'
import type { NextRequest } from 'next/server'

export const POST = auth(async (req: NextRequest) => {
	const data = (await req.json()) as Log
	// @ts-ignore:
	logger[data.level](...data.messages)

	return new Response('logging success', {
		status: 200,
	})
})
