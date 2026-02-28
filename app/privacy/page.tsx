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
        className="px-5 page-top pb-4"
      >
        <button
          onClick={() => router.back()}
          className="text-sm text-purple-400 font-medium mb-4 flex items-center gap-1"
        >
          ← 戻る
        </button>
        <h1 className="text-2xl font-bold text-gray-700">プライバシーポリシー</h1>
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
            <li>AIペットの育成データ（レベル・経験値・進化状態）</li>
            <li>実績・チャレンジの達成状況</li>
          </ul>
          <p className="font-medium text-pink-500">
            これらのデータは外部サーバーに送信されることはありません。
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
          <h2 className="font-bold text-gray-700 text-base">4. AIコメント・AIペットについて</h2>
          <p>
            本アプリのAIコメント機能およびAIペット育成機能はすべてアプリ内で完結しています。
            入力された情報が外部AIサービスに送信されることはありません。
          </p>
          <p>
            AIコメントはお客様の体重推移、気分、メモ、連続記録日数等のコンテキストに基づき、
            アプリ内のアルゴリズムにより生成されます。
          </p>
        </section>

        <section className="glass-card p-5 shadow-sm space-y-3">
          <h2 className="font-bold text-gray-700 text-base">5. 健康情報の取り扱い</h2>
          <p>
            体重データは健康に関連する個人情報です。本アプリではこのデータを厳重に管理し、
            デバイス内のみに保存します。クラウドへのバックアップ・同期は行いません。
          </p>
        </section>

        <section className="glass-card p-5 shadow-sm space-y-3">
          <h2 className="font-bold text-gray-700 text-base">6. お問い合わせ</h2>
          <p>
            プライバシーに関するご質問は、下記メールアドレスよりご連絡ください。
          </p>
          <p className="font-medium text-purple-500">
            support@kirari-app.com
          </p>
        </section>

        <p className="text-xs text-gray-400 text-center pb-4">
          &copy; 2026 キラリ. All rights reserved.
        </p>
      </motion.div>
    </div>
  );
}
