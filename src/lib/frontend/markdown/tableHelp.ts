export const tableHelpContent = `
# Next.jsでのデータテーブル実装

## 技術スタック

このデータテーブルページでは、以下の技術スタックを使用しています：

1. **TanStack Table (React Table v8)**: 高度なテーブル機能を提供するヘッドレスUIライブラリ
2. **TanStack Query (React Query)**: サーバーデータの取得、キャッシュ、更新を管理するライブラリ
3. **shadcn/ui**: スタイリングとUIコンポーネントを提供するコンポーネントライブラリ
4. **Conform**: フォームバリデーションと状態管理のためのライブラリ
5. **Zod**: TypeScriptファーストのスキーマバリデーションライブラリ

## このページの機能

このページでは、支払いデータを管理するためのCRUD（作成・読取・更新・削除）操作を実装しています。

### データの取得と表示

TanStack QueryとTanStack Tableを組み合わせて、データの取得と表示を行っています：

\`\`\`tsx
// データ取得のためのuseQueryフック
const { data: payments, isLoading } = useQuery({
  queryKey: queryKeys.payment.all,
  queryFn: async () => {
    return (await paymentRepository.getAllPayment()) || []
  },
})

// テーブルの設定
const table = useReactTable({
  data: payments || [],
  columns,
  onSortingChange: setSorting,
  onColumnFiltersChange: setColumnFilters,
  getCoreRowModel: getCoreRowModel(),
  getPaginationRowModel: getPaginationRowModel(),
  getSortedRowModel: getSortedRowModel(),
  getFilteredRowModel: getFilteredRowModel(),
  onColumnVisibilityChange: setColumnVisibility,
  onRowSelectionChange: setRowSelection,
  state: {
    sorting,
    columnFilters,
    columnVisibility,
    rowSelection,
  },
})
\`\`\`

### データの操作（CRUD）

TanStack Queryの\`useMutation\`フックを使用して、データの作成、更新、削除を実装しています：

\`\`\`tsx
// 作成ミューテーション
const createMutation = useMutation({
  mutationFn: paymentRepository.createPayment,
  onSuccess: () => {
    setIsAddDialogOpen(false)
    queryClient.invalidateQueries({ queryKey: queryKeys.payment.all })
  },
})

// 更新ミューテーション
const updateMutation = useMutation({
  mutationFn: paymentRepository.updatePayment,
  onSuccess: () => {
    setIsEditDialogOpen(false)
    setCurrentPayment(null)
    queryClient.invalidateQueries({ queryKey: queryKeys.payment.all })
  },
})

// 削除ミューテーション
const deleteMutation = useMutation({
  mutationFn: paymentRepository.deletePayment,
  onSuccess: () => {
    queryClient.invalidateQueries({ queryKey: queryKeys.payment.all })
  },
})
\`\`\`

### フォーム処理

Conformとzodを使用して、フォームの状態管理とバリデーションを実装しています：

\`\`\`tsx
const [form, fields] = useForm({
  onSubmit: (event) => {
    event.preventDefault()
    const formData = new FormData(event.currentTarget)
    const payment = {
      id: initialData?.id ?? 0,
      email: formData.get('email') as string,
      amount: Number(formData.get('amount')),
      status: formData.get('status') as string,
      created_at: initialData?.created_at ?? new Date(),
      updated_at: new Date(),
    }
    onSubmit(payment as Payment)
  },
  onValidate({ formData }) {
    return parseWithZod(formData, { schema: paymentSchema })
  },
  shouldValidate: 'onBlur',
  shouldRevalidate: 'onInput',
})
\`\`\`

## TanStack Queryのキー管理

TanStack Queryでは、クエリキーを使用してデータのキャッシュと無効化を管理します。このアプリケーションでは、\`queryKeys.ts\`ファイルでクエリキーを一元管理しています：

\`\`\`tsx
// src/lib/utils/queryKeys.ts
export const queryKeys = {
  payment: {
    all: ['payment'] as const,
  },
} as const
\`\`\`

### キー管理のメリット

1. **型安全性**: TypeScriptの\`as const\`を使用して型安全なクエリキーを定義
2. **一貫性**: アプリケーション全体で一貫したクエリキーの使用を保証
3. **メンテナンス性**: クエリキーの変更が必要な場合、一箇所で変更可能
4. **可読性**: クエリの目的が明確になり、コードの可読性が向上

### 使用例

\`\`\`tsx
// データ取得
const { data } = useQuery({
  queryKey: queryKeys.payment.all,
  queryFn: () => paymentRepository.getAllPayment()
})

// キャッシュの無効化
queryClient.invalidateQueries({ queryKey: queryKeys.payment.all })
\`\`\`

## TanStack Tableの主要機能

このページでは、TanStack Tableの以下の機能を使用しています：

1. **ソート**: カラムヘッダーをクリックしてデータをソート
2. **フィルタリング**: 入力フィールドを使用してデータをフィルタリング
3. **ページネーション**: データを複数ページに分割して表示
4. **カラム表示/非表示**: ユーザーがカラムの表示/非表示を制御可能
5. **行選択**: チェックボックスを使用して行を選択

\`\`\`tsx
// カラム定義の例
const columns: ColumnDef<Payment>[] = [
  {
    id: 'select',
    header: ({ table }) => (
      <Checkbox
        checked={
          table.getIsAllPageRowsSelected() ||
          (table.getIsSomePageRowsSelected() && 'indeterminate')
        }
        onCheckedChange={(value) => table.toggleAllPageRowsSelected(!!value)}
        aria-label="Select all"
      />
    ),
    cell: ({ row }) => (
      <Checkbox
        checked={row.getIsSelected()}
        onCheckedChange={(value) => row.toggleSelected(!!value)}
        aria-label="Select row"
      />
    ),
    enableSorting: false,
    enableHiding: false,
  },
  // 他のカラム定義...
]
\`\`\`

## ベストプラクティス

1. **クエリキーの管理**:
   - 専用のファイルでクエリキーを一元管理
   - 階層構造を使用して関連するクエリをグループ化

2. **データ更新後のキャッシュ無効化**:
   - ミューテーション成功後に関連するクエリを無効化
   - \`queryClient.invalidateQueries()\`を使用

3. **ローディング状態の処理**:
   - \`isLoading\`フラグを使用してローディング状態を表示
   - Suspenseと組み合わせることも可能

4. **エラー処理**:
   - \`error\`オブジェクトを使用してエラー状態を処理
   - ユーザーフレンドリーなエラーメッセージを表示

5. **フォームバリデーション**:
   - zodスキーマを使用して型安全なバリデーション
   - Conformを使用してフォーム状態を管理
`
