export const stateHelpContent = `
# Next.jsでの状態管理

## なぜ状態管理が必要か

Reactアプリケーションでは、コンポーネント間でデータを共有する必要があります。単純な方法としては、親コンポーネントから子コンポーネントへpropsを渡す「バケツリレー」がありますが、これには以下の問題があります：

\`\`\`tsx
// バケツリレーの例
function GrandParent() {
  const [data, setData] = useState("重要なデータ")
  return <Parent data={data} setData={setData} />
}

function Parent({ data, setData }) {
  // このコンポーネントはデータを使わないが、子に渡すために受け取る必要がある
  return <Child data={data} setData={setData} />
}

function Child({ data, setData }) {
  // 実際にデータを使用するコンポーネント
  return (
    <div>
      <p>{data}</p>
      <button onClick={() => setData("更新されたデータ")}>更新</button>
    </div>
  )
}
\`\`\`

このアプローチには以下の問題があります：

1. **プロップドリリング**: データを使用しない中間コンポーネントもpropsを受け取る必要がある
2. **保守性の低下**: コンポーネント構造が変わると、データの受け渡しも変更する必要がある
3. **再レンダリングの増加**: 上位コンポーネントの状態変更で、不必要に多くのコンポーネントが再レンダリングされる

グローバル状態管理を使用すると、これらの問題を解決できます：

\`\`\`tsx
// Zustandを使用した例
import { create } from 'zustand'

// グローバルストアの作成
const useDataStore = create((set) => ({
  data: "重要なデータ",
  setData: (newData) => set({ data: newData }),
}))

function GrandParent() {
  // データを持たない、渡さない
  return <Parent />
}

function Parent() {
  // データを受け取らない、渡さない
  return <Child />
}

function Child() {
  // 必要なコンポーネントだけがストアから直接データを取得
  const { data, setData } = useDataStore()
  return (
    <div>
      <p>{data}</p>
      <button onClick={() => setData("更新されたデータ")}>更新</button>
    </div>
  )
}
\`\`\`

## このページで実装されている状態管理

このデモページでは、Next.jsのサーバーコンポーネントとクライアントコンポーネントを組み合わせた状態管理パターンを紹介しています。

### 実装の概要

1. **サーバーコンポーネント**: 静的なUIを担当
2. **クライアントコンポーネント**: インタラクティブな要素と状態管理を担当
3. **Zustand**: グローバル状態管理ライブラリとして使用

### ページ構成

\`\`\`tsx
// サーバーコンポーネント
export default function StatePage() {
  return (
    <div className="space-y-4 p-4">
      <div className="flex items-center justify-between">
        <h1 className="font-bold text-2xl">状態管理ページ</h1>
        <MarkdownHelpDialog
          title="Next.jsでの状態管理について"
          content={stateHelpContent}
          ariaLabel="状態管理についてのヘルプ"
        />
      </div>
      <StateWrapper>
        <StateContent />
      </StateWrapper>
    </div>
  )
}
\`\`\`

### コンポーネント構造

\`\`\`tsx
// サーバーコンポーネント
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { StateController } from './state-controller'
import { StateDisplay } from './state-display'

export function StateContent() {
  return (
    <Card>
      <CardHeader>
        <CardTitle>状態表示（サーバー）</CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <StateDisplay />
        <StateController />
      </CardContent>
    </Card>
  )
}
\`\`\`

## 使用している技術スタック

### Zustand

このアプリケーションでは、Zustandを使用してグローバル状態を管理しています。Zustandは、シンプルで軽量な状態管理ライブラリです。

\`\`\`tsx
// src/lib/store.ts の実際のコード
import { create } from 'zustand'

// ローディングストアの型定義
type LoadingState = {
  // ローディング状態を管理
  isLoading: boolean
  // ローディング状態を更新する関数
  setIsLoading: (loading: boolean) => void
}

// Zustandストアの作成
export const useUrlStore = create<LoadingState>((set) => ({
  // ローディングの初期値はfalse
  isLoading: false,
  // ローディング状態を更新するアクション
  setIsLoading: (loading) => set({ isLoading: loading }),
}))
\`\`\`

#### Zustandの特徴

1. **シンプルなAPI**: 学習コストが低く、直感的に使える
2. **軽量**: バンドルサイズが小さい（約3KB）
3. **TypeScript対応**: 型安全な状態管理が可能
4. **ミドルウェア**: 必要に応じて機能を拡張できる（persist, devtools等）

### アラートとトースト管理

アプリケーション全体で使用できるアラートとトースト通知も、Zustandを使って実装されています：

\`\`\`tsx
// アラートストアの型定義
type AlertState = {
  // アラートの状態
  alertType: AlertType
  alertMessage: string
  // タイマーID
  timerId: NodeJS.Timeout | null
  // アラートを表示する関数（ミリ秒を指定可能）
  showAlert: (type: AlertType, message: string, durationInMs?: number) => void
  // アラートを非表示にする関数
  hideAlert: () => void
  // アラートのスタイルとアイコンを取得する関数
  getAlertStyle: () => {
    alertClassName: string
    AlertIcon: LucideIcon
  }
}

// アラートストアの作成
export const useAlertStore = create<AlertState>((set, get) => ({
  // 初期状態
  alertType: null,
  alertMessage: '',
  timerId: null,

  // アラートを表示する関数
  showAlert: (type, message, durationInMs = 0) => {
    // 既存のタイマーがあればクリア
    const { timerId } = get()
    if (timerId) {
      clearTimeout(timerId)
    }

    // 新しいアラートを設定
    set({ alertType: type, alertMessage: message, timerId: null })

    // ミリ秒が指定されている場合は自動的に非表示にするタイマーを設定
    if (durationInMs > 0) {
      const newTimerId = setTimeout(() => {
        set({ alertType: null, timerId: null })
      }, durationInMs)

      set({ timerId: newTimerId })
    }
  },

  // その他のメソッド...
}))
\`\`\`


## 状態管理のベストプラクティス

1. **適切な粒度の状態設計**:
   - 関連する状態をグループ化
   - 不要な再レンダリングを防ぐために状態を分割

2. **型安全性の確保**:
   - TypeScriptで型を定義
   - ストアの型定義を明確に

3. **パフォーマンスの最適化**:
   - 必要な状態だけを選択的に購読
   - メモ化を活用（useMemo, useCallback）

## まとめ

適切な状態管理は、モダンなWebアプリケーション開発において重要な要素です。Next.jsとZustandを組み合わせることで、サーバーコンポーネントの利点を活かしつつ、効率的な状態管理を実現できます。このデモページでは、実際のアプリケーションで使用できる状態管理パターンを紹介しています。
`
