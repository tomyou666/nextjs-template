/**
 * React QueryのqueryKeysを定義するオブジェクト
 *
 * 使用例:
 * ```ts
 * const { data } = useQuery({
 *   queryKey: queryKeys.table.all,
 *   queryFn: () => fetchTable()
 * })
 *
 * const { data } = useQuery({
 *   queryKey: queryKeys.table.detail('123'),
 *   queryFn: () => fetchTableDetail('123')
 * })
 * ```
 */
export const queryKeys = {
	payment: {
		all: ['payment'] as const,
	},
	random: {
		id: ['random', 'id'] as const,
	},
} as const
