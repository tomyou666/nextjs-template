# Next.JSテンプレート

モダンなNext.jsアプリケーション開発のための包括的なテンプレートプロジェクト。

[![Next.js](https://img.shields.io/badge/Next.js-14-black?style=flat&logo=next.js)](https://nextjs.org/)
[![TypeScript](https://img.shields.io/badge/TypeScript-5-blue?style=flat&logo=typescript)](https://www.typescriptlang.org/)
[![Prisma](https://img.shields.io/badge/Prisma-5-2D3748?style=flat&logo=prisma)](https://www.prisma.io/)
[![TanStack Query](https://img.shields.io/badge/TanStack_Query-5-FF4154?style=flat&logo=react-query)](https://tanstack.com/query)

## 📚 重要なリンク

- [リリースノート](docs/RELEASE.md)
- [Prismaドキュメント](https://www.prisma.io/docs/)
- [Next.jsドキュメント](https://nextjs.org/docs)

## 🚀 プロジェクトの目的

このプロジェクトは、社内プロジェクトのテンプレートとして作成されました。新しいプロジェクトを始める際の基盤として、最新のベストプラクティスと技術スタックを提供することを目的としています。

- **一貫性のある開発体験**: すべてのプロジェクトで一貫したコード構造とパターンを提供
- **開発の迅速化**: 共通機能が既に実装されているため、新機能の開発に集中できる
- **品質の向上**: テスト済みのコンポーネントとパターンを使用することで、品質を確保

**このテンプレートは自由に使用していただけます。改善のためのコミットやプルリクエストも歓迎します！**

## 🔍 技術選定の理由

### Next.js

中規模プロジェクトにおいて、Next.jsは以下の理由から最適な選択肢です：

- **柔軟なレンダリング**: SSR、SSG、ISR、CSRなど、ユースケースに応じた最適なレンダリング方式を選択可能
- **App Router**: 直感的なルーティングとレイアウトシステム
- **サーバーコンポーネント**: パフォーマンスとSEOの向上
- **開発者体験**: HMR、TypeScriptサポート、優れたデバッグツール
- **エコシステム**: 豊富なプラグインとライブラリ

### Prisma

Prismaは現代のORMとして非常に優れており、以下の利点があります：

- **型安全**: TypeScriptとの完全な統合により、型エラーを事前に検出
- **マイグレーション**: スキーマの変更を簡単に管理
- **直感的なAPI**: 複雑なSQLを書かずに、直感的なJavaScriptAPIでデータベースを操作
- **複数のデータベース**: PostgreSQL、MySQL、SQLite、SQL Serverなど、様々なデータベースをサポート
- **スキーマ駆動開発**: データモデルを中心とした開発アプローチ

## 📂 プロジェクト構成

```
src/
├── app/                  # App Router ページとレイアウト
│   ├── api/              # APIエンドポイント
│   ├── dashboard/        # ダッシュボード関連ページ
│   └── providers.tsx     # グローバルプロバイダー
├── components/           # 再利用可能なコンポーネント
│   ├── ui/               # 基本UIコンポーネント
│   └── ...               # 機能別コンポーネント
├── lib/                  # ユーティリティと共有ロジック
│   ├── backend/          # バックエンド関連ロジック
│   │   └── repository/   # データアクセスレイヤー
│   ├── frontend/         # フロントエンド関連ロジック
│   │   └── markdown/     # マークダウンヘルプコンテンツ
│   ├── share/            # 共有定数とスキーマ
│   └── utils/            # ユーティリティ関数
└── styles/               # グローバルスタイル
```

### 実際のプロジェクト構成

以下は`tree`コマンドで取得した実際のプロジェクト構成です（node_modules、.pnpm-store、.nextを除外）：

```
.
├── README.md
├── biome.json
├── components.json
├── docker
│   ├── Dockerfile
│   └── db
│       ├── Dockerfile
│       └── sample.a5er
├── docs
│   ├── MIGRATION.md
│   └── RELEASE.md
├── logs
│   └── log.1
├── middleware.ts
├── next-env.d.ts
├── next.config.ts
├── package.json
├── playwright.config.ts
├── pnpm-lock.yaml
├── postcss.config.mjs
├── prisma
│   ├── migrations
│   │   ├── 20250223074821_init
│   │   └── migration_lock.toml
│   └── schema.prisma
├── public
│   ├── file.svg
│   ├── globe.svg
│   ├── next.svg
│   ├── vercel.svg
│   └── window.svg
├── src
│   ├── app
│   │   ├── api
│   │   ├── dashboard
│   │   ├── error.tsx
│   │   ├── favicon.ico
│   │   ├── global-error.tsx
│   │   ├── globals.css
│   │   ├── layout.tsx
│   │   ├── login
│   │   ├── page.tsx
│   │   ├── providers.tsx
│   │   └── signup
│   ├── components
│   │   ├── AlertButtonSample.tsx
│   │   ├── CheckboxSample.tsx
│   │   ├── DatePickerSample.tsx
│   │   ├── EmailInputSample.tsx
│   │   ├── ErrorButtonSample.tsx
│   │   ├── GlobalAlert.tsx
│   │   ├── PasswordInputSample.tsx
│   │   ├── RadioGroupSample.tsx
│   │   ├── SelectSample.tsx
│   │   ├── TextInputSample.tsx
│   │   ├── TextareaSample.tsx
│   │   ├── ToastButtonSample.tsx
│   │   ├── ToastContainer.tsx
│   │   ├── alert-destructive.tsx
│   │   ├── app-sidebar.tsx
│   │   ├── footer.tsx
│   │   ├── form-samples.tsx
│   │   ├── header.tsx
│   │   ├── login-form.tsx
│   │   ├── markdown-dialog.tsx
│   │   ├── markdown-help-dialog.tsx
│   │   ├── mode-toggle.tsx
│   │   ├── overview.tsx
│   │   ├── recent-sales.tsx
│   │   ├── rendering
│   │   ├── rendering-tabs.tsx
│   │   ├── search-form.tsx
│   │   ├── signup-form.tsx
│   │   ├── theme-provider.tsx
│   │   ├── ui
│   │   ├── user-nav.tsx
│   │   └── version-switcher.tsx
│   ├── hooks
│   │   ├── use-mobile.tsx
│   │   └── use-toast.ts
│   ├── lib
│   │   ├── backend
│   │   ├── frontend
│   │   ├── prisma.ts
│   │   ├── share
│   │   ├── store.ts
│   │   ├── utils
│   │   └── utils.ts
│   └── types
│       ├── ApiResponse.ts
│       └── Log.ts
├── tailwind.config.ts
├── tests
│   └── example.spec.ts
├── tests-examples
│   └── demo-todo-app.spec.ts
├── tsconfig.json
└── vitest.config.mts
```

## 🌟 主要機能

- **認証システム**: セキュアなユーザー認証
- **ダッシュボード**: 管理画面のテンプレート
- **レンダリングデモ**: 各種レンダリング方式の実装例
- **フォーム処理**: Conformとzodを使用した型安全なフォーム
- **データテーブル**: TanStack Tableを使用した高機能テーブル
- **状態管理**: Zustandを使用したグローバル状態管理
- **通知システム**: トースト、アラート、エラーハンドリング
- **ダークモード**: テーマ切り替え機能

## 🔧 セットアップ

### 前提条件

- Node.js 18.0.0以上
- npm または yarn
- データベース（PostgreSQL推奨）

### インストール

```bash
# リポジトリのクローン
git clone https://github.com/your-org/nextjs-template.git
cd nextjs-template

# 依存関係のインストール
npm install
# または
yarn install

# 環境変数の設定
cp .env.example .env.local
# .env.localを編集してデータベース接続情報などを設定

# Prismaマイグレーション
npx prisma migrate dev

# 開発サーバーの起動
npm run dev
# または
yarn dev
```

## 💻 開発ガイド

### コーディング規約

- ESLintとPrettierを使用してコードの品質を維持
- コンポーネントはなるべく小さく、再利用可能に設計
- 状態管理は適切なスコープで行う（ローカル vs グローバル）

### ブランチ戦略

- `main`: 本番環境用ブランチ
- `develop`: 開発環境用ブランチ
- `feature/*`: 新機能開発用ブランチ
- `bugfix/*`: バグ修正用ブランチ

### コミットメッセージ

コミットメッセージは以下の形式に従ってください：

```
<type>(<scope>): <subject>

<body>
```

例：
```
feat(auth): ユーザー登録機能の追加

- メールアドレスとパスワードによる登録フォームを実装
- 確認メール送信機能を追加
- ユーザーテーブルのマイグレーションを追加
```

## 🤝 貢献方法

1. このリポジトリをフォーク
2. 新しいブランチを作成 (`git checkout -b feature/amazing-feature`)
3. 変更をコミット (`git commit -m 'feat: 素晴らしい機能を追加'`)
4. ブランチにプッシュ (`git push origin feature/amazing-feature`)
5. プルリクエストを作成

## 📄 ライセンス

このプロジェクトは [MIT License](LICENSE) の下で公開されています。

---

**Next.JSテンプレート** - モダンなウェブアプリケーション開発のための出発点
