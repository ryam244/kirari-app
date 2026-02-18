# 🌸 Kirari（キラリ）— 体重ログ × AI日記アプリ

> かわいいUIで毎日の健康習慣を楽しく記録。AIが優しく励ます体重管理アプリ。

[![Next.js](https://img.shields.io/badge/Next.js-16-black?logo=next.js)](https://nextjs.org)
[![TypeScript](https://img.shields.io/badge/TypeScript-5-blue?logo=typescript)](https://typescriptlang.org)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind-v4-38bdf8?logo=tailwindcss)](https://tailwindcss.com)

---

## ✨ アプリ概要

**Kirari（キラリ）** は20〜30代女性向けの体重管理 × AI日記アプリです。

- 🎀 **飛び抜けてかわいい** パステルピンク × パープルのデザイン
- 🤖 **AIが毎日励ます** — gpt-4o-miniがあなたの記録に優しくコメント
- 📱 **モバイルファースト** — スマホでもWebでも美しい
- 💕 **継続できる** — 絵文字・アニメーション・気分セレクターで楽しく記録

## 🖥 画面一覧

| ページ | 説明 |
|--------|------|
| 🏠 **ホーム** | 今日の体重、気分、週間グラフ、AIひとこと |
| 📝 **記録** | 体重入力 + 気分セレクター + メモ + AI即時フィードバック |
| 📖 **AI日記** | 過去ログ一覧、AIコメント付き、月次レポート（プレミアム） |
| 👑 **プレミアム** | ライト ¥480/月 / プロ ¥980/月 プラン案内 |

## 🎨 デザイン

- **カラー**: パステルピンク `#FFB5C8` + パステルパープル `#C8B5FF`
- **フォント**: Noto Sans JP（日本語）+ Inter（数字）
- **スタイル**: ガラスモーフィズム、グラデーション、角丸24px以上
- **アニメーション**: Framer Motion 入場アニメーション

## 🚀 開発環境

```bash
# インストール
npm install

# 開発サーバー起動
npm run dev

# ビルド
npm run build
```

## 💰 マネタイズ戦略

| プラン | 価格 | ターゲット |
|--------|------|-----------|
| **無料** | ¥0 | 体験・習慣作り |
| **ライト** | ¥480/月 | コアユーザー |
| **プロ** | ¥980/月 | 本気で変わりたい方 |

月1万ユーザー × 10% 課金率 × ¥700 ARPU = **月売上 70万円** が短期目標

## 🛠 Tech Stack

- **Framework**: Next.js 16 (App Router)
- **Styling**: Tailwind CSS v4
- **Animation**: Framer Motion
- **AI**: OpenAI gpt-4o-mini
- **Font**: Google Fonts (Noto Sans JP + Inter)

## 📋 環境変数

```env
OPENAI_API_KEY=your_openai_api_key_here
```

AIキーなしでも動作します（ダミーコメントにフォールバック）

---

Made with 💕 by ryam244
