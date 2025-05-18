/**
 * ランダムIDに関連する操作を提供するリポジトリ
 */
export const randomRepository = {
	/**
	 * ランダムなIDを取得する
	 * @param init - フェッチのオプション設定。ISRなどのキャッシュ制御に使用
	 * @returns ランダムに生成されたID文字列
	 * @throws エラーレスポンスの場合にエラーメッセージをスロー
	 */
	getRandomId: async (init?: RequestInit): Promise<string> => {
		const response = await fetch(
			`${process.env.NEXT_PUBLIC_API_URL}/api/random`,
			init,
		)
		const json = await response.json()
		if (json.status === 'success') {
			return json.data
		}
		throw new Error(json.message || 'エラーが発生しました')
	},

	/**
	 * 新しいランダムIDを生成して取得する
	 * @param init - フェッチのオプション設定。ISRなどのキャッシュ制御に使用
	 * @returns 新しく生成されたランダムID文字列
	 * @throws エラーレスポンスの場合にエラーメッセージをスロー
	 */
	refreshRandomId: async (init?: RequestInit): Promise<string> => {
		const response = await fetch(
			`${process.env.NEXT_PUBLIC_API_URL}/api/random/refresh`,
			{
				method: 'POST',
				headers: {
					'Content-Type': 'application/json',
				},
				...init,
			},
		)
		const json = await response.json()
		if (json.status === 'success') {
			return json.data
		}
		throw new Error(json.message || 'エラーが発生しました')
	},
}
