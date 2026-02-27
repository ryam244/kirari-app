# キラリ - ストアリリース チェックリスト

> Tech stack: Next.js 16 (Static Export) + Capacitor 8 + Tailwind 4

---

## 0. コード最終確認（コミット前）

- [ ] `npm run build` がエラーなし・警告なしで完了する
- [ ] `npm run lint` がエラーなし
- [ ] `out/` ディレクトリが最新のビルドで更新されている
- [ ] `capacitor.config.ts` の `appId` と `appName` が正しい
  - appId: `com.kirari.app`（公開前に逆ドメインを確認）
  - appName: `キラリ`

---

## 1. 起動確認・ホワイトアウトチェック

### 原因別チェック

| 原因 | 確認方法 | 対応状況 |
|---|---|---|
| `webDir` が `out/` になっているか | `capacitor.config.ts` の `webDir: "out"` | ✅ 設定済み |
| `npm run build` 後に `npx cap sync` しているか | sync忘れはホワイトアウトの最多原因 | 毎回必須 |
| `output: "export"` が有効か | `next.config.ts` | ✅ 設定済み |
| `images.unoptimized: true` が設定されているか | `next.config.ts` | ✅ 設定済み |
| Google Fonts が `<link>` 1か所のみか | `app/layout.tsx` のみ（CSS importは削除済み） | ✅ 修正済み |
| API Routes が static export に含まれていないか | `app/api/ai-comment` は Capacitor では呼ばれない | ✅ 不使用 |

### Capacitor 起動確認コマンド

```bash
# 1. 静的ビルド
npm run build

# 2. Capacitor に同期（必須）
npx cap sync

# 3. iOS シミュレーターで起動
npx cap open ios         # Xcode が開く
npx cap run ios          # 直接シミュレーター起動

# 4. Android エミュレーターで起動
npx cap open android     # Android Studio が開く
npx cap run android
```

### 白画面チェックポイント

- [ ] スプラッシュ画面（ピンク背景）が 2 秒間表示される
- [ ] スプラッシュ後にホーム画面 or オンボーディングが表示される
- [ ] `✨` のスピナーが表示された後、コンテンツが表示される
- [ ] オフライン状態でも起動できる（フォントは fallback に切り替わるが動作する）
- [ ] **Safari DevTools で白画面の場合**: `Console` タブを確認しエラーを修正

---

## 2. デバッグチェック

### iOS Safari DevTools での確認手順

1. iPhone を Mac に接続
2. iPhone: 設定 → Safari → 詳細 → Web インスペクタ ON
3. Mac の Safari: 開発メニュー → iPhone → Kirari アプリの WebView
4. Console / Network / Storage を確認

### チェック項目

- [ ] Console に赤エラーなし
- [ ] `localStorage` に初回起動後、`kirari_settings` と `kirari_logs` のキーが存在する
- [ ] 体重を記録後、`kirari_logs` の件数が増える
- [ ] 全ページ遷移（ホーム → 記録 → 日記 → 設定）でエラーなし
- [ ] オンボーディング完了後、`isOnboarded: true` が保存されている
- [ ] オンボーディング済みで `/onboarding` に直接アクセスしても `/` にリダイレクトされる
- [ ] AI コメントが日本語で表示される（ランダム選択）

### Android Chrome DevTools での確認手順

1. Android デバイス: 開発者オプション → USB デバッグ ON
2. PC の Chrome: `chrome://inspect/#devices`
3. デバイスとアプリが表示されたら「inspect」クリック

---

## 3. UI/UX 動作確認（全フロー）

### フロー 1：初回起動

- [ ] ホーム → オンボーディングへ自動リダイレクト
- [ ] Step 1: ニックネーム入力 → バリデーション動作
- [ ] Step 2: 現在の体重入力（30〜200kg 範囲チェック）
- [ ] Step 3: 目標体重入力（現在体重より小さい値のみ許可）
- [ ] 「キラリをはじめる 🌸」でホームへ遷移、空状態表示

### フロー 2：体重記録

- [ ] ログページ: `isLoaded` 前は `✨` スピナーが表示される（52.0 の誤表示なし）
- [ ] 最後の記録値が体重フィールドに自動入力される
- [ ] `+/-` ボタンで 0.1kg 単位の増減
- [ ] 気分セレクターが動作する
- [ ] メモ入力（200文字制限・カウンター表示）
- [ ] 記録ボタン → ローディング 0.8 秒 → AI コメント付き完了画面
- [ ] **初回記録**: 完了画面に「記録完了！」と表示される
- [ ] **再記録（更新）**: 完了画面に「更新完了！」と表示される
- [ ] 「ホームへ 🏠」でホームに戻る
- [ ] 「修正する」で記録内容を編集できる

### フロー 3：ホームページ

- [ ] 今日の記録がある場合「今日の体重」と表示される
- [ ] 今日の記録がない場合「最新の体重」と表示される
- [ ] 体重が目標を達成した場合「🎉 目標体重達成！おめでとう！」と表示される
- [ ] プログレスバーが正しい割合で表示される
- [ ] 週次グラフが表示される（記録2件以上）
- [ ] 連続記録日数が正しく表示される
- [ ] 「今月の変化」: 記録が少ない場合 `--` と表示される

### フロー 4：日記

- [ ] 全記録が新しい順に一覧表示される
- [ ] 今日の記録に「今日」バッジが表示される
- [ ] ログをタップして展開・AI コメント表示
- [ ] 削除ボタン → 確認ダイアログ → 削除実行
- [ ] 「もっと見る」ボタンで追加読み込み
- [ ] 記録0件の空状態メッセージが表示される

### フロー 5：設定

- [ ] 現在の設定値が表示されている
- [ ] ニックネーム変更 → 保存 → ホームに反映
- [ ] 目標体重変更 → 保存 → プログレスバーに反映
- [ ] プライバシーポリシーページが開く
- [ ] 利用規約ページが開く
- [ ] 全データリセット → 確認ダイアログ → 実行 → オンボーディングに戻る

---

## 4. デバイス・画面サイズ確認

### iOS 優先確認端末

| 端末 | 画面サイズ | 確認ポイント |
|---|---|---|
| iPhone 16 Pro | 6.3インチ / Dynamic Island | `page-top` クラスが Island を避けているか |
| iPhone 15 / 14 | 6.1インチ / ノッチなし（Island） | 同上 |
| iPhone SE 第3世代 | 4.7インチ / ホームボタン | BottomNav がホームボタンに被らないか |
| iPad（任意） | 〜 | `max-width: 390px` で中央寄せ表示 |

### Android 優先確認端末

| 端末 | 確認ポイント |
|---|---|
| Pixel 8 | ナビゲーションバーとの干渉 |
| Galaxy S24 | フォント・余白の見え方 |

### 全端末共通チェック

- [ ] BottomNav がホームインジケーター/ナビゲーションバーに被らない
- [ ] ステータスバーエリアにコンテンツが被らない
- [ ] フォント（Noto Sans JP）が正しく表示される
- [ ] グラデーション背景が全面に表示される
- [ ] glass-card の blur エフェクトが表示される（古い Android は fallback）
- [ ] `active:scale-95` のタップフィードバックが動作する

---

## 5. App Store（iOS）リリース 残り設定手順

### 5-1. 必要な素材（準備必須）

| 素材 | サイズ | 説明 |
|---|---|---|
| アプリアイコン | 1024 × 1024 px PNG（透過なし） | App Store 用マスターアイコン |
| スクリーンショット | 6.9インチ: 1320×2868px | iPhone 16 Pro Max / 必須 |
| スクリーンショット | 6.5インチ: 1284×2778px | iPhone 14 Plus / 必須 |
| スクリーンショット | 5.5インチ: 1242×2208px | iPhone 8 Plus / 必須 |
| スプラッシュ画像 | 詳細は下記 | iOS 各解像度 |

#### Capacitor アイコン・スプラッシュ自動生成（推奨）

```bash
# @capacitor/assets をインストール（1回だけ）
npm install --save-dev @capacitor/assets

# 素材を配置
mkdir -p resources
# resources/icon-only.png    : 1024x1024 (アイコン、背景なし用)
# resources/icon-foreground.png : 1024x1024 (Android 適応アイコン用)
# resources/splash.png       : 2732x2732 (スプラッシュ背景)

# iOS/Android 向けに全サイズ自動生成
npx capacitor-assets generate --ios --android
```

### 5-2. iOS プロジェクト生成〜提出

```bash
# iOS プラットフォーム追加（まだの場合）
npx cap add ios

# ビルド → sync → Xcode
npm run build
npx cap sync ios
npx cap open ios
```

**Xcode での設定:**

- [ ] Bundle Identifier: `com.kirari.app`（Apple Developer に登録済みのものと一致）
- [ ] Version: `1.0.0`、Build: `1`
- [ ] Deployment Target: iOS 16.0 以上
- [ ] Display Name: `キラリ`
- [ ] Signing & Capabilities: 自動署名 ON、チーム選択
- [ ] App Icons: `AppIcon.appiconset` にアイコン配置済み確認
- [ ] LaunchScreen: スプラッシュ設定確認

**App Store Connect での設定:**

- [ ] アプリ名: `キラリ - 体重ログ × AI日記`
- [ ] サブタイトル（任意）: `毎日かわいく記録`
- [ ] カテゴリ: ヘルスケア＆フィットネス（プライマリ）
- [ ] 年齢制限: 4+（健康データのみ、要確認）
- [ ] 価格: 無料
- [ ] プライバシーポリシー URL: アップロード先URL（例: GitHub Pages）
- [ ] App Privacy: データ収集なし（端末内のみ）→ 全て「収集しない」でOK
- [ ] 説明文、キーワード、サポートURL 入力

**TestFlight（提出前必須）:**

- [ ] TestFlight で内部テスト（自分のデバイス）
- [ ] クラッシュなし・UI崩れなし を確認してから Review 申請

### 5-3. ATT（App Tracking Transparency）

本アプリはユーザーデータを外部送信しないため **ATT ポップアップは不要**。
`NSUserTrackingUsageDescription` の追加は不要。

---

## 6. Google Play（Android）リリース 残り設定手順

### 6-1. 必要な素材

| 素材 | サイズ |
|---|---|
| アプリアイコン | 512 × 512 px PNG |
| フィーチャーグラフィック | 1024 × 500 px |
| スクリーンショット | 最低 2 枚（推奨: 縦向き 1080×1920） |

### 6-2. Android プロジェクト生成〜提出

```bash
# Android プラットフォーム追加（まだの場合）
npx cap add android

# ビルド → sync → Android Studio
npm run build
npx cap sync android
npx cap open android
```

**`android/app/build.gradle` の設定:**

```groovy
android {
    defaultConfig {
        applicationId "com.kirari.app"
        versionCode 1
        versionName "1.0.0"
        minSdkVersion 22      // Capacitor 8 の最低要件
        targetSdkVersion 35   // 2025年要件: API 35
    }
}
```

- [ ] `applicationId`: `com.kirari.app`
- [ ] `minSdkVersion`: 22（Android 5.1以上）
- [ ] `targetSdkVersion`: 35（2025年 Play Store 要件）
- [ ] 署名設定（リリースビルド用 keystore 作成）
- [ ] ProGuard/R8 設定（Capacitor はデフォルト設定で動作）

**Google Play Console での設定:**

- [ ] アプリ名: `キラリ - 体重ログ × AI日記`
- [ ] カテゴリ: 健康とフィットネス
- [ ] ターゲット: 女性（任意でターゲティング設定）
- [ ] コンテンツレーティング: アンケート回答（健康アプリ）
- [ ] プライバシーポリシー URL
- [ ] **データセーフティセクション**（必須）:
  - データの収集: **なし**（端末外に送信しない）
  - データの共有: **なし**
  - セキュリティプラクティス: データ暗号化（Android デフォルト）にチェック

---

## 7. プライバシーポリシー URL の準備

App Store と Play Store の両方でプライバシーポリシー URL が必須。

### 最も簡単な方法: GitHub Pages

```bash
# リポジトリの Settings → Pages → Source: Deploy from branch (main)
# URL: https://[username].github.io/[repo-name]/privacy
# アプリ内 /privacy ページは既に存在するので、GitHub Pages でホスト可能
```

または Notion ページ・Google Sites でも可。

---

## 8. バージョン管理（リリース後）

```bash
# 次のリリース時のワークフロー
npm run build          # 1. Webビルド
npx cap sync           # 2. Capacitorに同期（Android/iOS両方）
npx cap open ios       # 3. Xcode でアーカイブ → App Store Connect にアップロード
npx cap open android   # 4. Android Studio でリリースビルド → Play Console にアップロード
```

---

## 9. リリース前 最終チェックリスト

- [ ] `capacitor.config.ts` の `appId` が確定している
- [ ] `package.json` の `version` が `1.0.0` になっている
- [ ] 全画面でホワイトアウト・クラッシュなし（実機確認）
- [ ] BottomNav が Home Indicator に被らない（実機確認）
- [ ] オフライン動作確認（機内モードでテスト）
- [ ] プライバシーポリシー URL が公開されている
- [ ] アプリアイコン・スプラッシュ画像が設定されている
- [ ] TestFlight / Internal Testing での動作確認済み

---

_最終更新: 2026-02-27_
