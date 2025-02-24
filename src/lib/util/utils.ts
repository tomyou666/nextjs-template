import { type ClassValue, clsx } from 'clsx'
import { twMerge } from 'tailwind-merge'

/**
 * tailwind-mergeを使用してクラス名をマージする
 * @param inputs クラス名
 * @returns マージされたクラス名
 */
export function cn(...inputs: ClassValue[]) {
	return twMerge(clsx(inputs))
}

/**
 * オブジェクトの指定されたキーをundefinedに設定する
 * @param obj 対象オブジェクト
 * @param keys undefinedにするキーの配列
 * @returns 更新されたオブジェクトのコピー
 */
export function setKeysToUndefined(
	obj: Record<string, unknown>,
	keys: string[] = ['id', 'created_at', 'updated_at'],
) {
	for (const key of keys) {
		if (key in obj) {
			obj[key] = undefined
		}
	}
}
