export async function ISRContent() {
	async function getData() {
		const response = await fetch('http://localhost:3000/api/random', {
			next: { revalidate: 30 }, // 30秒ごとに再検証
		})
		const data: ApiResponse<string> = await response.json()
		return data.data
	}
	const randomId = await getData()
	return <p className="font-mono">{randomId}</p>
}
