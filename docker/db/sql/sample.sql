-- Project Name : sample2
-- Date/Time    : 2025/01/03 1:56:12
-- Author       : tomyou
-- RDBMS Type   : PostgreSQL
-- Application  : A5:SQL Mk-2

/*
  << 注意！！ >>
  BackupToTempTable, RestoreFromTempTable疑似命令が付加されています。
  これにより、drop table, create table 後もデータが残ります。
  この機能は一時的に $$TableName のような一時テーブルを作成します。
  この機能は A5:SQL Mk-2でのみ有効であることに注意してください。
*/

-- 会員
-- * BackupToTempTable
drop table if exists member cascade;

-- * RestoreFromTempTable
create table member (
  id serial not null
  , member_status_code character(3)
  , constraint member_PKC primary key (id)
) ;

create index FK_MEMBER_MEMBER_STATUS
  on member(MEMBER_STATUS_CODE);

-- 会員ステータス
-- * BackupToTempTable
drop table if exists member_status cascade;

-- * RestoreFromTempTable
create table member_status (
  ID character(3) not null
  , MEMBER_STATUS_NAME character varying(50)
  , constraint member_status_PKC primary key (ID)
) ;

-- 購入
-- * BackupToTempTable
drop table if exists purchace cascade;

-- * RestoreFromTempTable
create table purchace (
  id serial not null
  , member_id integer
  , constraint purchace_PKC primary key (id)
) ;

alter table purchace add constraint PURCHASE_MEMBER_ID
  unique (MEMBER_ID) ;

-- テーブル情報
-- * BackupToTempTable
drop table if exists table_info cascade;

-- * RestoreFromTempTable
create table table_info (
  ID integer not null
  , status character varying(50)
  , email character varying(50)
  , amount double precision
  , constraint table_info_PKC primary key (ID)
) ;

comment on table member is '会員: 会員登録時にデータが登録される。基本的に物理削除はなく、退会したらステータスが退会会員になる。';
comment on column member.id is 'ID: 会員を識別するID。連番として基本的に自動採番される。（会員IDだけに限らず）採番方法はDBMSによって変わる。';
comment on column member.member_status_code is '会員ステータスコード';

comment on table member_status is '会員ステータス';
comment on column member_status.ID is 'ID: 会員ステータスを識別するコード。';
comment on column member_status.MEMBER_STATUS_NAME is '会員ステータス名称';

comment on table purchace is '購入: 一つの商品に対する一回の購入を表現する。一回の購入で一つの商品を複数個買うこともある。';
comment on column purchace.id is 'ID: 連番';
comment on column purchace.member_id is '会員ID: 会員を参照するID。購入を識別する自然キー（複合ユニーク制約）の筆頭要素。';

comment on table table_info is 'テーブル情報:テーブル情報';
comment on column table_info.ID is 'ID';
comment on column table_info.status is 'ステータス';
comment on column table_info.email is 'Eメール';
comment on column table_info.amount is '料金';

