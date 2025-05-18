/**
 * ログ関連のAPIリクエストを処理するリポジトリ
 */
export const LogRepository = {
	/**
	 * 指定されたレベルのログをバックエンドで出力するAPIを呼び出す
	 * @param level ログレベル（info, warn, error, debug）
	 * @returns API応答
	 */
	createLog: async (
		level: string,
	): Promise<{ success: boolean; message: string }> => {
		const response = await fetch('/api/log-test', {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json',
			},
			body: JSON.stringify({ level }),
		})

		if (!response.ok) {
			throw new Error('APIリクエストが失敗しました')
		}

		return response.json()
	},
}
