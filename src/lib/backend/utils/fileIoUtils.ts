import fs from 'node:fs'
import path from 'node:path'

/**
 * ./screenshot/<引数指定ディレクトリ>/<引数指定ファイル>-yyyymmdd-連番.pngのファイル名を取得する
 * 連番は自動裁判され1から始まる
 * 引数指定ディレクトリがない場合は作成する
 * @param directory ディレクトリ名
 * @param fileName ファイル名
 * @returns ファイル名
 */
export function getScreenshotFilePath(directory?: string, fileName?: string) {
	const screenshotDir = directory
		? path.join(process.cwd(), 'screenshot', directory)
		: path.join(process.cwd(), 'screenshot')
	// フォルダが存在しない場合は作成する
	if (!fs.existsSync(screenshotDir)) {
		fs.mkdirSync(screenshotDir, { recursive: true })
	}
	// 現在の日付を取得してyyyymmdd形式にフォーマット
	const date = new Date()
	const year = date.getFullYear()
	const month = String(date.getMonth() + 1).padStart(2, '0') // 月は0から始まるため+1が必要
	const day = String(date.getDate()).padStart(2, '0')
	const dateStr = `${year}${month}${day}`
	// フォルダ配下の<引数指定ファイル>-yyyymmdd-連番.pngを読み取り連番をインクリメントする
	const files = fs.readdirSync(screenshotDir)
	// 同じ日付のファイルを取得
	const todayFiles = files.filter((f) => f.includes(dateStr))
	const index = todayFiles.length + 1
	const screenshotFilePath = path.join(
		screenshotDir,
		`${fileName ?? 'screenshot'}-${dateStr}-${index}.png`,
	)
	return screenshotFilePath
}
