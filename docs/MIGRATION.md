# データベースマイグレーション方針

本プロジェクトでは、以下のデータベースマイグレーション方針を採用します。

## 初期セットアップ

初期のデータベーススキーマは `schema.sql` で管理し、その後 Prisma でリバースエンジニアリングを行います。

### 手順

1. `schema.sql` にテーブル定義を記述

```sql
CREATE TABLE users (
id SERIAL PRIMARY KEY,
email VARCHAR(255) NOT NULL UNIQUE,
name VARCHAR(255)
);
```

2. SQLファイルを実行してテーブルを作成

```bash
psql -U your_user -d your_database -f schema.sql
```

3. Prismaのリバースエンジニアリングを実行

```bash
# npm
npx prisma db pull
# pnpm
pnpm dlx prisma db pull
```

## 以降のマイグレーション

初期セットアップ以降は、`schema.prisma` ファイルを編集してマイグレーションを行います。

### 手順

1. `schema.prisma` ファイルを編集

```**prisma**
model User {
id    Int     @id @default(autoincrement())
email String  @unique
name  String?
// 新しいフィールドを追加
createdAt DateTime @default(now())
}
```

2. マイグレーションファイルの作成と実行

```bash
# npm
npx prisma migrate dev --name add_created_at
# pnpm
pnpm dlx prisma migrate dev --name add_created_at
```

## 未適用のマイグレーション適用方法

```bash
# npm
npx prisma migrate dev
# pnpm
pnpm dlx prisma migrate dev
```

## スキーマ変更の手動適用

データベースが既に変更されている場合や、手動でスキーマを変更した場合は、以下の手順でマイグレーションファイルを作成し適用することができます。

### 手順

1. マイグレーションファイル用のディレクトリを作成

```bash
# npm
mkdir -p prisma/migrations/YYYYMMDDHHMMSS_pull_schema
# pnpm
mkdir -p prisma/migrations/YYYYMMDDHHMMSS_pull_schema
```

2. 現在のスキーマと実際のデータベースの差分を取得

```bash
# npm
npx prisma migrate diff \
  --from-schema-datamodel prisma/schema.prisma \
  --to-url="${DATABASE_URL}" \
  --script > prisma/migrations/YYYYMMDDHHMMSS_pull_schema/migration.sql
# pnpm
pnpm dlx prisma migrate diff \
  --from-schema-datamodel prisma/schema.prisma \
  --to-url="${DATABASE_URL}" \
  --script > prisma/migrations/YYYYMMDDHHMMSS_pull_schema/migration.sql
```

3. マイグレーションを適用済みとしてマークする

```bash
# npm
pnpm dlx prisma migrate resolve --applied YYYYMMDDHHMMSS_pull_schema
# pnpm
pnpm dlx prisma migrate resolve --applied YYYYMMDDHHMMSS_pull_schema
```

### 注意事項

- YYYYMMDDHHMMSSは実際の日時に置き換えてください
- この方法は、既存のデータベースの変更を追跡する必要がある場合にのみ使用してください
- 可能な限り、通常のPrismaマイグレーションワークフローを使用してください

## 注意事項

- 初期セットアップ後は、直接SQLでのスキーマ変更は避け、必ずPrismaを通じて行うこと
- マイグレーションファイル名は変更内容が分かるように具体的に記述すること
- マイグレーション実行前に、ローカル環境で十分なテストを行うこと
