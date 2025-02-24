-- Project Name : sample
-- Date/Time    : 2025/02/24 4:27:40
-- Author       : tomyou
-- RDBMS Type   : PostgreSQL
-- Application  : A5:SQL Mk-2

-- アカウント
drop table if exists "account" cascade;

create table "account" (
  "id" text not null
  , "userId" text not null
  , "type" text not null
  , "provider" text not null
  , "providerAccountId" text not null
  , "refresh_token" text
  , "access_token" text
  , "expires_at" integer
  , "token_type" text
  , "scope" text
  , "id_token" text
  , "session_state" text
  , "created_at" TIMESTAMP(3) default CURRENT_TIMESTAMP
  , "updated_at" TIMESTAMP(3) default CURRENT_TIMESTAMP
  , constraint "account_PKC" primary key ("id")
) ;

create unique index "Account_provider_providerAccountId_key"
  on "account"("provider","providerAccountId");

-- セッション
drop table if exists "session" cascade;

create table "session" (
  "id" text not null
  , "sessionToken" text not null
  , "userId" text not null
  , "expires" timestamp(3) without time zone not null
  , "created_at" TIMESTAMP(3) default CURRENT_TIMESTAMP
  , "updated_at" TIMESTAMP(3) default CURRENT_TIMESTAMP
  , constraint "session_PKC" primary key ("id")
) ;

create unique index "Session_sessionToken_key"
  on "session"("sessionToken");

-- ユーザ
drop table if exists "user" cascade;

create table "user" (
  "id" text not null
  , "name" text
  , "email" text
  , "emailVerified" timestamp(3) without time zone
  , "password" text
  , "image" text
  , "created_at" TIMESTAMP(3) default CURRENT_TIMESTAMP
  , "updated_at" TIMESTAMP(3) default CURRENT_TIMESTAMP
  , constraint "user_PKC" primary key ("id")
) ;

create unique index "User_email_key"
  on "user"("email");

-- 認証トークン
drop table if exists "verificationToken" cascade;

create table "verificationToken" (
  "identifier" text not null
  , "token" text not null
  , "expires" timestamp(3) without time zone not null
  , "created_at" TIMESTAMP(3) default CURRENT_TIMESTAMP
  , "updated_at" TIMESTAMP(3) default CURRENT_TIMESTAMP
) ;

create unique index "VerificationToken_identifier_token_key"
  on "verificationToken"("identifier","token");

create unique index "VerificationToken_token_key"
  on "verificationToken"("token");

-- 会員
drop table if exists "member" cascade;

create table "member" (
  "id" serial not null
  , "member_status_code" character(3)
  , "created_at" TIMESTAMP(3) default CURRENT_TIMESTAMP
  , "updated_at" TIMESTAMP(3) default CURRENT_TIMESTAMP
  , constraint "member_PKC" primary key ("id")
) ;

-- 会員ステータス
drop table if exists "member_status" cascade;

create table "member_status" (
  "ID" character(3) not null
  , "MEMBER_STATUS_NAME" character varying(50)
  , "created_at" TIMESTAMP(3) default CURRENT_TIMESTAMP
  , "updated_at" TIMESTAMP(3) default CURRENT_TIMESTAMP
  , constraint "member_status_PKC" primary key ("ID")
) ;

-- 購入
drop table if exists "purchace" cascade;

create table "purchace" (
  "id" serial not null
  , "member_id" integer
  , "created_at" TIMESTAMP(3) default CURRENT_TIMESTAMP
  , "updated_at" TIMESTAMP(3) default CURRENT_TIMESTAMP
  , constraint "purchace_PKC" primary key ("id")
) ;

-- 支払情報
drop table if exists "payment" cascade;

create table "payment" (
  "id" serial not null
  , "status" character varying(50)
  , "email" character varying(50)
  , "amount" double precision
  , "created_at" TIMESTAMP(3) default CURRENT_TIMESTAMP
  , "updated_at" TIMESTAMP(3) default CURRENT_TIMESTAMP
  , constraint "payment_PKC" primary key ("id")
) ;

alter table "payment" add constraint "payment_IX1"
  unique ("id") ;

alter table "account"
  add constraint "account_FK1" foreign key ("userId") references "user"("id");

alter table "session"
  add constraint "session_FK1" foreign key ("userId") references "user"("id");

alter table "member"
  add constraint "member_FK1" foreign key ("member_status_code") references "member_status"("ID");

alter table "purchace"
  add constraint "purchace_FK1" foreign key ("member_id") references "member"("id");

comment on table "account" is 'アカウント';
comment on column "account"."id" is 'id';
comment on column "account"."userId" is 'ユーザID';
comment on column "account"."type" is '認証タイプ';
comment on column "account"."provider" is 'プロバイダ';
comment on column "account"."providerAccountId" is 'プロパイダアカウントID';
comment on column "account"."refresh_token" is 'リフレッシュトークン';
comment on column "account"."access_token" is 'アクセストークン';
comment on column "account"."expires_at" is '有効期限';
comment on column "account"."token_type" is 'トークンタイプ';
comment on column "account"."scope" is 'スコープ';
comment on column "account"."id_token" is 'IDトークン';
comment on column "account"."session_state" is 'セッション状態';
comment on column "account"."created_at" is '作成日時';
comment on column "account"."updated_at" is '更新日時';

comment on table "session" is 'セッション';
comment on column "session"."id" is 'id';
comment on column "session"."sessionToken" is 'セッショントークン';
comment on column "session"."userId" is 'ユーザID';
comment on column "session"."expires" is '有効期限';
comment on column "session"."created_at" is '作成日時';
comment on column "session"."updated_at" is '更新日時';

comment on table "user" is 'ユーザ';
comment on column "user"."id" is 'id';
comment on column "user"."name" is '名前';
comment on column "user"."email" is 'メール';
comment on column "user"."emailVerified" is 'メール認証';
comment on column "user"."password" is 'パスワード';
comment on column "user"."image" is '画像';
comment on column "user"."created_at" is '作成日時';
comment on column "user"."updated_at" is '更新日時';

comment on table "verificationToken" is '認証トークン';
comment on column "verificationToken"."identifier" is '識別子';
comment on column "verificationToken"."token" is 'トークン';
comment on column "verificationToken"."expires" is '有効期限';
comment on column "verificationToken"."created_at" is '作成日時';
comment on column "verificationToken"."updated_at" is '更新日時';

comment on table "member" is '会員: 会員登録時にデータが登録される。基本的に物理削除はなく、退会したらステータスが退会会員になる。';
comment on column "member"."id" is 'ID: 会員を識別するID。連番として基本的に自動採番される。（会員IDだけに限らず）採番方法はDBMSによって変わる。';
comment on column "member"."member_status_code" is '会員ステータスコード';
comment on column "member"."created_at" is '作成日時';
comment on column "member"."updated_at" is '更新日時';

comment on table "member_status" is '会員ステータス';
comment on column "member_status"."ID" is 'ID: 会員ステータスを識別するコード。';
comment on column "member_status"."MEMBER_STATUS_NAME" is '会員ステータス名称';
comment on column "member_status"."created_at" is '作成日時';
comment on column "member_status"."updated_at" is '更新日時';

comment on table "purchace" is '購入: 一つの商品に対する一回の購入を表現する。一回の購入で一つの商品を複数個買うこともある。';
comment on column "purchace"."id" is 'ID: 連番';
comment on column "purchace"."member_id" is '会員ID: 会員を参照するID。購入を識別する自然キー（複合ユニーク制約）の筆頭要素。';
comment on column "purchace"."created_at" is '作成日時';
comment on column "purchace"."updated_at" is '更新日時';

comment on table "payment" is '支払情報';
comment on column "payment"."id" is 'ID';
comment on column "payment"."status" is 'ステータス';
comment on column "payment"."email" is 'Eメール';
comment on column "payment"."amount" is '料金';
comment on column "payment"."created_at" is '作成日時';
comment on column "payment"."updated_at" is '更新日時';

