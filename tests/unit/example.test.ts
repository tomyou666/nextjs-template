import { describe, expect, it } from 'vitest'

describe('テストスイート', () => {
	// 基本的な等価性のテスト
	it('数値の加算が正しく動作すること', () => {
		expect(1 + 1).toBe(2)
	})

	// 文字列の結合テスト
	it('文字列の結合が正しく動作すること', () => {
		expect('Hello ' + 'World').toBe('Hello World')
	})

	// 配列のテスト
	it('配列の操作が正しく動作すること', () => {
		const arr = [1, 2, 3]
		expect(arr).toHaveLength(3)
		expect(arr).toContain(2)
	})

	// オブジェクトのテスト
	it('オブジェクトの比較が正しく動作すること', () => {
		const obj = { name: 'テスト', age: 20 }
		expect(obj).toEqual({ name: 'テスト', age: 20 })
	})

	// 真偽値のテスト
	it('真偽値の評価が正しく動作すること', () => {
		expect(true).toBeTruthy()
		expect(false).toBeFalsy()
	})

	// 非同期処理のテスト
	it('非同期処理が正しく動作すること', async () => {
		const result = await new Promise((resolve) => {
			setTimeout(() => resolve('非同期処理の結果'), 1000)
		})
		expect(result).toBe('非同期処理の結果')
	})

	// エラーハンドリングのテスト
	it('エラーハンドリングが正しく動作すること', () => {
		const fn = () => {
			throw new Error('エラーが発生しました')
		}
		expect(() => fn()).toThrow('エラーが発生しました')
	})
})
