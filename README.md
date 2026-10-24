# Kyoto Gateway Web

Astro + Tailwind CSS v4 + TinaCMS (local) + i18n (en/ja/fr)

## 概要

京都の文化体験をキュレーションする「KYOTO GATEWAY」のWebサイト。
- 3言語対応 (English / 日本語 / Français)
- TinaCMS でローカル編集可能
- Tailwind CSS v4 (CSS-first)
- 静的生成 (Astro 7)

## セットアップ

```bash
# Node バージョン確認
cat .nvmrc  # 22.12.0

# 依存関係インストール
npm install

# 開発サーバー起動
npm run dev

# TinaCMS 編集モード起動
npm run edit
```

## スクリプト

| コマンド | 説明 |
|---------|------|
| `npm run dev` | 開発サーバー起動 (http://127.0.0.1:4321) |
| `npm run edit` | TinaCMS 付き開発サーバー起動 |
| `npm run build` | 本番ビルド (静的生成) |
| `npm run preview` | ビルド結果プレビュー |
| `npm run check` | 型チェック (astro check) |

## 多言語対応

| 言語 | URL | 状態 |
|------|-----|------|
| English (en) | `/` | ✅ デフォルト |
| 日本語 (ja) | `/ja/` | ✅ 翻訳済み |
| Français (fr) | `/fr/` | ✅ 翻訳済み |

### 翻訳の追加方法

1. `content/pages/home.json` をコピーして `home.ja.json` / `home.fr.json` を作成
2. `content/global/settings.json` をコピーして `settings.ja.json` / `settings.fr.json` を作成
3. `src/i18n/ui.ts` の `dictionaries` にロケールを追加
4. `astro.config.mjs` の `i18n.locales` にコードを追加

## TinaCMS (ローカル編集)

```bash
npm run edit
```

- `/admin` で管理画面にアクセス
- `content/pages/home.json` / `home.ja.json` / `home.fr.json` を編集可能
- `content/global/settings.json` / `settings.ja.json` / `settings.fr.json` を編集可能
- 画像は `public/images/` に配置

## ディレクトリ構成

```
src/
  i18n/           # 多言語ユーティリティ
    config.ts     # ロケール定義
    utils.ts      # パスヘルパー
    content.ts    # コンテンツ読み込み
    ui.ts         # UI文言辞書
  components/
    global/       # Header, Footer, LanguageSwitcher
    sections/     # Hero, Manifesto, Plate, Sanctuary, Accreditation
    ui/           # 共通UI
  layouts/        # MainLayout
  pages/          # ルーティング
    [lang]/       # ロケール別ページ
    admin/        # TinaCMS管理画面
    api/          # TinaCMS用API (ローカル開発のみ)
  styles/
    global.css    # Tailwind v4 CSS-first 設定
  i18n/           # 多言語層
  types.ts        # 型定義
content/
  pages/          # ページコンテンツ (JSON)
    home.json          # en (デフォルト)
    home.ja.json       # 日本語
    home.fr.json       # フランス語
  global/         # グローバル設定
    settings.json      # en
    settings.ja.json   # 日本語
    settings.fr.json   # フランス語
tina/
  config.ts       # TinaCMS設定
  fields/         # フィールド定義
public/
  images/         # 静的画像
scripts/
  start-editing.sh    # 編集セッション起動
  sync-api-routes.mjs # APIルート同期
```

## デプロイ (Cloudflare Pages)

```bash
BUILD_TARGET=cloudflare npm run build
```

- `output: 'static'` で静的生成
- API ルートは `functions/api/` が担当
- `src/pages/api/` はビルドから除外される

## ライセンス

Private / Client & Partner Monograph