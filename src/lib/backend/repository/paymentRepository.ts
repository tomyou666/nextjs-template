import type { payment as Payment } from '@prisma/client'

export const paymentRepository = {
	getAllPayment: async (): Promise<Payment[]> => {
		const response = await fetch(
			`${process.env.NEXT_PUBLIC_API_URL}/api/payment/get-all`,
		)
		const json = await response.json()
		if (json.status === 'success') {
			return json.data
		}
		throw new Error(json.message || 'エラーが発生しました')
	},

	createPayment: async (payment: Omit<Payment, 'id'>): Promise<Payment> => {
		const response = await fetch(
			`${process.env.NEXT_PUBLIC_API_URL}/api/payment/create`,
			{
				method: 'POST',
				headers: {
					'Content-Type': 'application/json',
				},
				body: JSON.stringify(payment),
			},
		)
		const json = await response.json()
		if (json.status === 'success') {
			return json.data
		}
		throw new Error(json.message || 'エラーが発生しました')
	},

	updatePayment: async (payment: Payment): Promise<Payment> => {
		const response = await fetch(
			`${process.env.NEXT_PUBLIC_API_URL}/api/payment/update`,
			{
				method: 'PUT',
				headers: {
					'Content-Type': 'application/json',
				},
				body: JSON.stringify(payment),
			},
		)
		const json = await response.json()
		if (json.status === 'success') {
			return json.data
		}
		throw new Error(json.message || 'エラーが発生しました')
	},

	deletePayment: async (id: number): Promise<void> => {
		const response = await fetch(
			`${process.env.NEXT_PUBLIC_API_URL}/api/payment/delete/${id}`,
			{
				method: 'DELETE',
				headers: {
					'Content-Type': 'application/json',
				},
			},
		)
		const json = await response.json()
		if (json.status !== 'success') {
			throw new Error(json.message || 'エラーが発生しました')
		}
	},
}
