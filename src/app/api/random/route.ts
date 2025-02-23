import { nanoid } from 'nanoid'
import { NextResponse } from 'next/server'

export async function GET() {
	const randomId = nanoid()
	const response: ApiResponse<string> = {
		status: 'success',
		data: randomId,
	}
	return NextResponse.json(response)
}
