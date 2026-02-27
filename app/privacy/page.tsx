"use client";

import { motion } from "framer-motion";
import { useRouter } from "next/navigation";

export default function PrivacyPage() {
  const router = useRouter();

  return (
    <div className="mobile-container pb-12">
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="px-5 pt-12 pb-4"
      >
        <button
          onClick={() => router.back()}
          className="text-sm text-purple-400 font-medium mb-4 flex items-center gap-1"
        >
          ← 戻る
        </button>
        <h1 className="text-2xl font-bold text-gray-700">🔒 プライバシーポリシー</h1>
        <p className="text-xs text-gray-400 mt-1">最終更新：2026年2月</p>
      </motion.div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.1 }}
        className="px-5 space-y-5 text-sm text-gray-600 leading-relaxed"
      >
        <section className="glass-card p-5 shadow-sm space-y-3">
          <h2 className="font-bold text-gray-700 text-base">1. 収集する情報</h2>
          <p>
            キラリアプリ（以下「本アプリ」）は、以下の情報をお客様のデバイス内にのみ保存します：
          </p>
          <ul className="list-disc pl-5 space-y-1">
            <li>体重の記録（日時・数値）</li>
            <li>気分の記録</li>
            <li>メモ（任意入力）</li>
            <li>ニックネーム・目標体重などの設定情報</li>
          </ul>
          <p className="font-medium text-pink-500">
            ✅ これらのデータは外部サーバーに送信されることはありません。
          </p>
        </section>

        <section className="glass-card p-5 shadow-sm space-y-3">
          <h2 className="font-bold text-gray-700 text-base">2. データの保存場所</h2>
          <p>
            すべてのデータはお客様のデバイス内（ローカルストレージ）のみに保存されます。
            インターネット接続がなくてもご利用いただけます。
          </p>
          <p>
            データはアプリのアンインストール、またはアプリ内の「全データをリセット」機能によって削除されます。
          </p>
        </section>

        <section className="glass-card p-5 shadow-sm space-y-3">
          <h2 className="font-bold text-gray-700 text-base">3. 第三者への提供</h2>
          <p>
            本アプリはお客様の個人情報を第三者に販売・共有・提供することは一切ありません。
          </p>
        </section>

        <section className="glass-card p-5 shadow-sm space-y-3">
          <h2 className="font-bold text-gray-700 text-base">4. AIコメントについて</h2>
          <p>
            本アプリのAIコメント機能はアプリ内で完結しており、
            入力された情報が外部AIサービスに送信されることはありません。
          </p>
        </section>

        <section className="glass-card p-5 shadow-sm space-y-3">
          <h2 className="font-bold text-gray-700 text-base">5. お問い合わせ</h2>
          <p>
            プライバシーに関するご質問は、アプリ内のお問い合わせフォームよりご連絡ください。
          </p>
        </section>

        <p className="text-xs text-gray-400 text-center pb-4">
          © 2026 キラリ. All rights reserved.
        </p>
      </motion.div>
    </div>
  );
}
