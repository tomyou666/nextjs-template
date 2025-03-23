export const formHelpContent = `
# Next.jsのフォーム実装

このデモでは、Next.jsの最新機能とライブラリを使用したフォーム実装を紹介しています。

## 技術スタック

- **Next.js Server Actions**: サーバーサイドでフォーム処理を行う機能
- **Zod**: 型安全なバリデーションスキーマライブラリ
- **Conform**: フォーム状態管理とバリデーションのためのライブラリ

## Server Actions

Next.jsでは、\`'use server'\`ディレクティブを使用してサーバーアクションを定義できます。

\`\`\`tsx
'use server'

import { parseWithZod } from '@conform-to/zod'
import { textSchema } from '@/lib/share/schemas'

export async function submitTextForm(prevState: unknown, formData: FormData) {
  const submission = parseWithZod(formData, {
    schema: textSchema,
  })

  if (submission.status !== 'success') {
    return submission.reply()
  }

  console.log('フォームが送信されました:', submission.value)
  return { status: 'success', message: 'フォームの送信が完了しました！' }
}
\`\`\`

## Zodによるバリデーション

Zodを使用して型安全なバリデーションスキーマを定義します。

\`\`\`tsx
import { z } from 'zod'

export const textSchema = z.object({
  text: z.string().min(1, '入力は必須です').max(100, '100文字以内で入力してください'),
})

export const emailSchema = z.object({
  email: z.string().email('有効なメールアドレスを入力してください'),
})
\`\`\`

## Conformによるフォーム管理

Conformを使用してフォームの状態管理とバリデーションを行います。

\`\`\`tsx
'use client'

import { useForm } from '@conform-to/react'
import { parseWithZod } from '@conform-to/zod'
import { useActionState } from 'react'
import { submitTextForm } from '@/lib/backend/actions'
import { textSchema } from '@/lib/share/schemas'

export function TextInputSample() {
  const [state, action] = useActionState(submitTextForm, null)
  const [form, fields] = useForm({
    lastResult: state,
    onValidate({ formData }) {
      return parseWithZod(formData, { schema: textSchema })
    },
    shouldValidate: 'onBlur',
  })

  return (
    <form action={action} id={form.id} onSubmit={form.onSubmit}>
      <div>
        <label htmlFor={fields.text.id}>テキスト</label>
        <input
          id={fields.text.id}
          name={fields.text.name}
          type="text"
        />
        <div>{fields.text.errors}</div>
      </div>
      <button type="submit">送信</button>
      {state?.status === 'success' && <div>{state.message}</div>}
    </form>
  )
}
\`\`\`

## クライアント・サーバー連携

1. **クライアント側**:
   - \`useActionState\`フックでサーバーアクションと状態を連携
   - \`useForm\`でフォーム状態を管理
   - \`parseWithZod\`でクライアント側バリデーション

2. **サーバー側**:
   - Server Actionsでフォームデータを処理
   - \`parseWithZod\`でサーバー側バリデーション
   - 処理結果をクライアントに返却

## フォームコンポーネント

このデモでは以下のフォームコンポーネントを実装しています：

- テキスト入力
- メールアドレス入力
- パスワード入力
- テキストエリア
- セレクトボックス
- チェックボックス
- ラジオボタン
- 日付選択

## メリット

- **型安全**: TypeScriptとZodによる完全な型安全性
- **UX向上**: クライアント・サーバー両方でのバリデーション
- **パフォーマンス**: 必要な場合のみJavaScriptを使用
- **アクセシビリティ**: 適切なエラーメッセージとARIA属性
`
