import { auth } from '@/lib/apiAuth'
import { prisma } from '@/lib/prisma'
import type { table_info as TableInfo } from '@prisma/client'
import { type NextRequest, NextResponse } from 'next/server'

export const GET = auth(async (req: NextRequest) => {
	const tableInfo: TableInfo[] = await prisma.table_info.findMany()
	const response: ApiResponse<TableInfo[]> = {
		status: 'success',
		data: tableInfo,
	}
	return NextResponse.json(response, { status: 200 })
})
