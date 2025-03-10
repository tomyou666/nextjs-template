export const errorHelpContent = `
# Next.jsでの通知・エラー処理

モダンなWebアプリケーションでは、ユーザーに適切なフィードバックを提供することが重要です。このデモでは、Next.jsアプリケーションで実装できる3種類の通知・エラー処理方法を紹介しています。

## なぜ通知とエラー処理が重要か

ユーザーエクスペリエンス（UX）の向上には、以下の理由から適切な通知とエラー処理が不可欠です：

1. **ユーザーフィードバック**: アクションの結果をユーザーに伝える
2. **エラー回復**: 問題が発生した場合に対処方法を提示する
3. **信頼性**: システムが透明性を持って動作していることを示す
4. **ユーザーガイダンス**: 次に何をすべきかをユーザーに伝える

## トースト通知

トースト通知は、一時的な情報を非侵入的に表示するための軽量な通知です。

### 実装例

\`\`\`tsx
'use client'

import { ToastAction } from '@/components/ToastContainer'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { useToast } from '@/hooks/use-toast'

export const ToastButtonSample = () => {
  const { toast } = useToast()

  return (
    <Card>
      <CardHeader>
        <CardTitle>トーストサンプル</CardTitle>
        <CardDescription>
          ボタンをクリックして様々なグローバルトーストを表示
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-1 gap-4">
          <Button
            variant="success"
            onClick={() => {
              toast({
                type: 'success',
                title: '成功',
                description: '購入が確認されました！',
                duration: 3000,
                action: <ToastAction altText="元に戻す">元に戻す</ToastAction>,
              })
            }}
          >
            成功トースト
          </Button>

          {/* 他のトーストボタン */}
        </div>
      </CardContent>
    </Card>
  )
}
\`\`\`

### トースト通知の使用場面

- **成功通知**: フォーム送信、データ保存、アップロード完了
- **情報通知**: システム状態の変更、バックグラウンド処理の完了
- **警告通知**: 潜在的な問題、注意が必要な操作
- **エラー通知**: 軽微なエラー、リカバリー可能な問題

### トースト通知のメリット

- **非侵入的**: ユーザーの作業を中断しない
- **一時的**: 自動的に消えるため、UIがクリーンに保たれる
- **多様性**: 様々な種類の通知を統一されたデザインで表示できる

## アラート通知

アラートは、ユーザーの注意を引き、重要な情報を伝えるためのモーダルダイアログです。

### 実装例

\`\`\`tsx
'use client'

import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { useAlertStore } from '@/lib/store'

export const AlertButtonSample = () => {
  const { showAlert } = useAlertStore()

  return (
    <Card>
      <CardHeader>
        <CardTitle>アラートサンプル</CardTitle>
        <CardDescription>
          ボタンをクリックして様々なグローバルアラートを表示
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-1 gap-4">
          <Button
            variant="success"
            onClick={() => {
              showAlert('success', 'Your purchase has been confirmed!', 3000)
            }}
          >
            成功アラート
          </Button>

          {/* 他のアラートボタン */}
        </div>
      </CardContent>
    </Card>
  )
}
\`\`\`

### アラート通知の使用場面

- **重要な確認**: 削除操作、重要な設定変更
- **システム通知**: メンテナンス情報、重要なアップデート
- **セキュリティ警告**: 権限変更、セキュリティ関連の操作
- **重大なエラー**: ユーザーの対応が必要なエラー

### アラート通知のメリット

- **注目性**: ユーザーの注意を確実に引く
- **明確な情報**: 重要な情報を強調して表示できる
- **アクション要求**: ユーザーに明示的な対応を求められる

## エラーハンドリング

Next.jsでは、コンポーネントレベルとアプリケーションレベルの両方でエラーを適切に処理できます。

### 実装例

\`\`\`tsx
'use client'

import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { useState } from 'react'

export const ErrorButtonSample = () => {
  const [shouldThrow, setShouldThrow] = useState(false)

  if (shouldThrow) {
    throw new Error('これはテスト用のエラーです')
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>エラーテスト</CardTitle>
        <CardDescription>
          さまざまなエラーハンドリングをテストするためのボタン
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div className="flex flex-col gap-4">
          <div className="rounded-lg border p-4">
            <h2 className="mb-4 font-semibold text-xl">ページレベルのエラー</h2>
            <p className="mb-4 text-muted-foreground">
              error.tsxコンポーネントのテスト
            </p>
            <Button variant="destructive" onClick={() => setShouldThrow(true)}>
              エラーを発生させる
            </Button>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}
\`\`\`

### Next.jsのエラーハンドリング機能

Next.jsは、以下のエラーハンドリング機能を提供しています：

1. **error.tsx**: 特定のルートやページでのエラーを捕捉するためのエラーバウンダリ

   \`\`\`tsx
   'use client'

   import { Button } from '@/components/ui/button'

   export default function Error({
     error,
     reset,
   }: {
     error: Error & { digest?: string }
     reset: () => void
   }) {
     return (
       <div className="flex flex-col items-center justify-center min-h-[400px] gap-4">
         <h2 className="text-2xl font-bold">エラーが発生しました</h2>
         <p className="text-muted-foreground">{error.message}</p>
         <Button onClick={() => reset()}>再試行</Button>
       </div>
     )
   }
   \`\`\`

2. **global-error.tsx**: アプリケーション全体のエラーを捕捉するためのグローバルエラーバウンダリ

3. **not-found.tsx**: 404エラーを処理するためのカスタムページ

### エラーハンドリングの重要性

- **ユーザー体験の保護**: クラッシュ画面ではなく、適切なエラーメッセージを表示
- **デバッグ情報**: 開発者向けに詳細なエラー情報を提供
- **回復メカニズム**: エラーからの回復方法をユーザーに提示
- **エラー分析**: エラーを記録して分析することで、アプリケーションの品質向上

## 実装のベストプラクティス

### 1. 適切な通知タイプの選択

- **トースト**: 軽微な通知、一時的な情報
- **アラート**: 重要な通知、ユーザーの対応が必要な情報
- **エラーページ**: 致命的なエラー、回復が必要な状況

### 2. 明確なメッセージ

- ユーザーが理解できる言葉で説明
- 技術的な詳細は開発者向けログに記録
- 可能な解決策を提示

### 3. 一貫したデザイン

- アプリケーション全体で統一された通知スタイル
- 色やアイコンで通知の種類を区別
- アクセシビリティに配慮したデザイン

### 4. エラーロギングと監視

- 本番環境でのエラーを記録
- パターンを分析してシステム改善に活用
- 重大なエラーの通知システムを構築
`
