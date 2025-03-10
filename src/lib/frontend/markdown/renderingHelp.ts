export const renderingHelpContent = `
# Next.jsのレンダリング方式

## レンダリングとは何か、なぜ重要か

Webアプリケーションにおけるレンダリングとは、HTMLやCSSなどのコードをブラウザが解釈して画面に表示する過程です。Next.jsでは複数のレンダリング方式を提供しており、それぞれに異なる特性と用途があります。

適切なレンダリング方式を選択することが重要な理由：

1. **パフォーマンス**: ユーザー体験を向上させるための読み込み速度の最適化
2. **SEO**: 検索エンジンによるコンテンツの適切なインデックス化
3. **UX**: ユーザーがコンテンツを素早く利用できるようにする
4. **リソース効率**: サーバーリソースとクライアントリソースの効率的な使用

## Next.jsのレンダリング方式

### 1. クライアントサイドレンダリング (CSR)

クライアント（ブラウザ）上でJavaScriptを実行してページをレンダリングする方式です。

\`\`\`tsx
// 実際のコード例: ClientDemo.tsx
'use client'

import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { useState } from 'react'

export function ClientDemo() {
  const [count, setCount] = useState(0)

  return (
    <Card>
      <CardHeader>
        <CardTitle>クライアントサイドレンダリング (CSR)</CardTitle>
      </CardHeader>
      <CardContent>
        <p>このコンポーネントはクライアントサイドでレンダリングされています。</p>
        <p>カウント: {count}</p>
        <button onClick={() => setCount(count + 1)}>増加</button>
      </CardContent>
    </Card>
  )
}
\`\`\`

**特徴**:
- 'use client' ディレクティブを使用
- インタラクティブな要素（useState, イベントハンドラなど）を含む
- 初回読み込み時はJavaScriptが実行されるまで表示されない

**適した用途**:
- ユーザー入力が必要なフォーム
- インタラクティブなUI要素
- 頻繁に更新される動的コンテンツ

### 2. サーバーサイドレンダリング (SSR)

リクエスト時にサーバー上でHTMLを生成し、クライアントに送信する方式です。

\`\`\`tsx
// 実際のコード例: SSRDemo.tsx
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'

export async function SSRDemo() {
  // サーバー上でデータを取得
  const data = await fetch('https://api.example.com/data', { cache: 'no-store' })
  const result = await data.json()

  return (
    <Card>
      <CardHeader>
        <CardTitle>サーバーサイドレンダリング (SSR)</CardTitle>
      </CardHeader>
      <CardContent>
        <p>このコンポーネントはリクエスト時にサーバーでレンダリングされています。</p>
        <p>現在時刻: {new Date().toLocaleTimeString()}</p>
        <p>データ: {JSON.stringify(result)}</p>
      </CardContent>
    </Card>
  )
}
\`\`\`

**特徴**:
- 'use client' ディレクティブなし（デフォルトでサーバーコンポーネント）
- fetch() に { cache: 'no-store' } オプションを使用
- リクエストごとに最新のデータでレンダリング

**適した用途**:
- ユーザー固有のコンテンツ（ダッシュボード、プロフィールなど）
- 常に最新のデータが必要なページ
- SEOが重要なページ

### 3. 静的サイト生成 (SSG)

ビルド時にHTMLを生成し、CDNなどで配信する方式です。

\`\`\`tsx
// 実際のコード例: SSGDemo.tsx
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'

export function SSGDemo() {
  // ビルド時に実行される
  const buildTime = new Date().toLocaleTimeString()

  return (
    <Card>
      <CardHeader>
        <CardTitle>静的サイト生成 (SSG)</CardTitle>
      </CardHeader>
      <CardContent>
        <p>このコンポーネントはビルド時に静的に生成されています。</p>
        <p>ビルド時刻: {buildTime}</p>
      </CardContent>
    </Card>
  )
}
\`\`\`

**特徴**:
- 'use client' ディレクティブなし
- データフェッチにキャッシュを使用（デフォルト）
- ビルド時に一度だけレンダリング

**適した用途**:
- ブログ記事、ドキュメント
- マーケティングページ
- 頻繁に変更されないコンテンツ

### 4. インクリメンタル静的再生成 (ISR)

静的生成したページを定期的に再生成する方式です。

\`\`\`tsx
// 実際のコード例: ISRContent.tsx
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'

// revalidateを設定して一定時間ごとに再生成
export const revalidate = 60 // 60秒

export async function ISRContent() {
  // データ取得（キャッシュされるが、revalidate時間後に再取得）
  const data = await fetch('https://api.example.com/data')
  const result = await data.json()

  return (
    <Card>
      <CardHeader>
        <CardTitle>インクリメンタル静的再生成 (ISR)</CardTitle>
      </CardHeader>
      <CardContent>
        <p>このコンポーネントは静的に生成され、定期的に再生成されます。</p>
        <p>生成時刻: {new Date().toLocaleTimeString()}</p>
        <p>データ: {JSON.stringify(result)}</p>
      </CardContent>
    </Card>
  )
}
\`\`\`

**特徴**:
- revalidate プロパティを設定
- 指定した時間間隔でバックグラウンドで再生成
- 最初のリクエストは古いキャッシュを返し、再生成後に更新

**適した用途**:
- 定期的に更新されるデータを含むページ
- ニュースサイト、商品リスト
- 高トラフィックで頻繁な更新が必要なページ

## このデモページの実装

このデモページでは、Next.jsの各レンダリング方式を実際に体験できるようになっています。

### ページ構成

\`\`\`tsx
// src/app/dashboard/rendering/page.tsx
export const dynamic = 'force-dynamic'

import { MarkdownHelpDialog } from '@/components/markdown-help-dialog'
import { RenderingTabs } from '@/components/rendering-tabs'
import { renderingHelpContent } from '@/lib/frontend/markdown/renderingHelp'

export default function RenderingPage() {
  return (
    <div className="flex flex-col gap-8 p-4">
      <div className="flex items-center justify-between">
        <h2 className="font-bold text-2xl tracking-tight">レンダリング</h2>
        <MarkdownHelpDialog
          title="Next.jsのレンダリング方式について"
          content={renderingHelpContent}
          ariaLabel="レンダリングについてのヘルプ"
        />
      </div>
      <p className="text-muted-foreground">
        Next.jsの各種レンダリング方式のデモンストレーション
      </p>
      <RenderingTabs />
    </div>
  )
}
\`\`\`

### コンポーネント構成

\`\`\`tsx
// src/components/rendering-tabs.tsx
import { ClientDemo } from '@/components/rendering/client-demo'
import { SSGDemo } from '@/components/rendering/ssg-demo'
import { SSRDemo } from '@/components/rendering/ssr-demo'
import { Suspense } from 'react'
import { ISRContent } from './rendering/isr-demo-content'
import { RenderingDemo } from './rendering/rendering-demo'

export function RenderingTabs() {
  return (
    <div>
      <div className="flex flex-col gap-4">
        <RenderingDemo />
        <ClientDemo />
        <Suspense fallback={<p>Loading...</p>}>
          <SSRDemo />
        </Suspense>
        <SSGDemo />
        <ISRContent />
      </div>
    </div>
  )
}
\`\`\`

**実装のポイント**:

1. **Suspense**: SSRコンポーネントをSuspenseでラップして、データ取得中にフォールバックUIを表示
2. **各デモコンポーネント**: それぞれのレンダリング方式を実装したコンポーネント
3. **dynamic = 'force-dynamic'**: ページ全体をSSRモードで動作させる設定

## レンダリング方式の選択基準

適切なレンダリング方式を選ぶための基準：

1. **コンテンツの更新頻度**:
   - 頻繁に更新: SSR
   - 定期的に更新: ISR
   - ほとんど更新なし: SSG

2. **パフォーマンス要件**:
   - 最速の初期表示: SSG
   - バランスの取れた速度: ISR
   - 常に最新データ: SSR

3. **インタラクティブ性**:
   - 高いインタラクティブ性: CSR
   - 基本的なインタラクティブ性: SSR + ハイドレーション
   - 静的コンテンツ: SSG

4. **SEO要件**:
   - 高いSEO要件: SSG/SSR
   - SEOが重要でない: CSR

## ハイブリッドアプローチ

実際のアプリケーションでは、これらのレンダリング方式を組み合わせて使用するのが一般的です。Next.jsでは、同じアプリケーション内で異なるレンダリング方式を使い分けることができます。

\`\`\`tsx
// ハイブリッドアプローチの例
export default function HybridPage() {
  return (
    <div>
      <StaticHeader /> {/* SSG */}
      <Suspense fallback={<Loading />}>
        <DynamicContent /> {/* SSR */}
      </Suspense>
      <ClientInteraction /> {/* CSR */}
    </div>
  )
}
\`\`\`

このアプローチにより、各コンポーネントに最適なレンダリング方式を選択し、パフォーマンスとユーザー体験を最大化できます。
`
