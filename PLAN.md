# Kirari MVP リリースプラン

## 概要
- **アプローチ**: Capacitor（Next.js → iOS/Android ネイティブアプリ）
- **データ**: localStorage のみ（DB不要）
- **課金**: 全機能無料でスタート
- **優先事項**: UI/UX完成度 + App Store対応

---

## Phase 1: データ層（localStorage）

### 1-1. `lib/storage.ts` 作成
- WeightLog の CRUD 操作
- 設定（目標体重・ユーザー名）の保存
- SSR対応（サーバーサイドでlocalStorageを呼ばない）

### 1-2. `hooks/useWeightLogs.ts` カスタムフック
- 全ログ取得、追加、削除
- 今日のログ取得
- ストリーク計算、月次変化量計算

### 1-3. `hooks/useSettings.ts` カスタムフック
- 目標体重、初期体重、名前の管理
- 初回起動フラグ管理

### 1-4. 各ページを実データに接続
- `app/page.tsx` → useWeightLogs でリアルデータ表示
- `app/log/page.tsx` → 保存処理を localStorage に
- `app/diary/page.tsx` → 全ログを表示（ページネーション）

---

## Phase 2: UI/UX 完成度

### 2-1. オンボーディング画面（`app/onboarding/page.tsx`）
- 初回起動時のみ表示
- ステップ1: 名前入力
- ステップ2: 現在の体重入力
- ステップ3: 目標体重入力
- 完了後 Home へ遷移

### 2-2. 空状態（Empty States）
- ログなし時のホーム画面
- 日記ゼロ件時のメッセージ

### 2-3. 設定ページ（`app/settings/page.tsx`）
- 目標体重の変更
- 名前の変更
- 全データのリセット

### 2-4. エラーハンドリング
- `app/not-found.tsx` (404ページ)
- フォームバリデーション（体重の範囲チェック等）
- ネットワークエラー時のトースト通知

### 2-5. 日記のページネーション
- 「もっと見る」ボタンを実機能化（10件ずつ表示）

### 2-6. ログ削除機能
- 日記画面から各ログを削除可能に

---

## Phase 3: Capacitor セットアップ

### 3-1. Next.js を静的エクスポート対応
- `next.config.ts` に `output: 'export'` 追加
- 動的ルートの静的化確認
- `app/api/` ルートをクライアントサイド呼び出しに変更（またはサーバー不要化）

### 3-2. Capacitor インストール・初期化
```bash
npm install @capacitor/core @capacitor/cli
npm install @capacitor/ios @capacitor/android
npm install @capacitor/haptics @capacitor/status-bar @capacitor/splash-screen
npx cap init "キラリ" "com.kirari.app" --web-dir out
```

### 3-3. ハプティクス追加（App Store審査対策）
- 体重入力ボタン（+/-）タップ時に軽いバイブレーション
- 記録ボタン押下時にフィードバック

### 3-4. ステータスバー・スプラッシュスクリーン設定
- iOS/Androidのステータスバーをピンクテーマに
- スプラッシュスクリーンのアイコン・色設定

### 3-5. アプリアイコン
- 1024x1024 のアイコン画像（SVGまたはPNG）を生成
- `npx @capacitor/assets generate` で各サイズ自動生成

### 3-6. `capacitor.config.ts` 設定
```typescript
const config: CapacitorConfig = {
  appId: 'com.kirari.app',
  appName: 'キラリ',
  webDir: 'out',
  plugins: {
    SplashScreen: {
      launchShowDuration: 2000,
      backgroundColor: '#FFB5C8',
    },
    StatusBar: {
      style: 'DARK',
      backgroundColor: '#FFB5C8',
    }
  }
}
```

---

## Phase 4: App Store 対応

### 4-1. プライバシーポリシーページ（`app/privacy/page.tsx`）
- App Store申請に必須
- データはデバイス内のみ保存と明記

### 4-2. 利用規約ページ（`app/terms/page.tsx`）
- 基本的な利用規約

### 4-3. ナビゲーション更新
- 設定アイコン追加（BottomNav or ヘッダー）

---

## 実装順序

```
[Phase 1] データ層
  └── storage.ts → useWeightLogs → useSettings → 各ページ接続

[Phase 2] UI/UX
  └── オンボーディング → 空状態 → 設定 → エラーハンドリング → 削除機能

[Phase 3] Capacitor
  └── 静的エクスポート → Cap初期化 → ハプティクス → アイコン・スプラッシュ

[Phase 4] App Store対応
  └── プライバシーポリシー → 利用規約 → ナビ更新
```

---

## スコープ外（今回は含めない）
- DB / バックエンド
- 認証
- Stripe / 課金
- テストコード
- Push通知（将来対応）
