"use client";

import { motion } from "framer-motion";
import { useRouter } from "next/navigation";

export default function TermsPage() {
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
        <h1 className="text-2xl font-bold text-gray-700">利用規約</h1>
        <p className="text-xs text-gray-400 mt-1">最終更新：2026年2月</p>
      </motion.div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.1 }}
        className="px-5 space-y-5 text-sm text-gray-600 leading-relaxed"
      >
        <section className="glass-card p-5 shadow-sm space-y-3">
          <h2 className="font-bold text-gray-700 text-base">1. サービスの目的</h2>
          <p>
            キラリ（以下「本アプリ」）は、体重管理とウェルネスをサポートすることを目的としています。
            AIペット育成機能を通じて、毎日の記録習慣を楽しく継続することを支援します。
            本アプリのご利用をもって、本規約に同意いただいたものとみなします。
          </p>
        </section>

        <section className="glass-card p-5 shadow-sm space-y-3">
          <h2 className="font-bold text-gray-700 text-base">2. 免責事項</h2>
          <p>
            本アプリは健康管理のサポートツールであり、医療的なアドバイスを提供するものではありません。
            健康に関する判断は、必ず医療専門家にご相談ください。
          </p>
          <p>
            本アプリのAIコメントは励ましを目的としたものであり、
            医学的根拠に基づいたアドバイスではありません。
          </p>
          <p>
            AIペットの育成状態は娯楽目的であり、健康状態の評価を意図するものではありません。
          </p>
        </section>

        <section className="glass-card p-5 shadow-sm space-y-3">
          <h2 className="font-bold text-gray-700 text-base">3. 禁止事項</h2>
          <ul className="list-disc pl-5 space-y-1">
            <li>本アプリの無断複製・改変・再配布</li>
            <li>本アプリを通じた違法行為</li>
            <li>他のユーザーへの迷惑行為</li>
            <li>本アプリのリバースエンジニアリング</li>
          </ul>
        </section>

        <section className="glass-card p-5 shadow-sm space-y-3">
          <h2 className="font-bold text-gray-700 text-base">4. データについて</h2>
          <p>
            本アプリに記録したデータ（体重記録、AIペットの育成データ、実績等）はお客様自身のものです。
            すべてのデータはお客様のデバイス内にのみ保存されます。
          </p>
          <p>
            アンインストールやデータリセット時にデータが消失することをご了承ください。
            重要なデータは定期的にメモ等で控えることをお勧めします。
          </p>
        </section>

        <section className="glass-card p-5 shadow-sm space-y-3">
          <h2 className="font-bold text-gray-700 text-base">5. 知的財産権</h2>
          <p>
            本アプリに含まれるデザイン、キャラクター（AIペットを含む）、テキスト、
            アイコン等のコンテンツは、本アプリの運営者に帰属します。
          </p>
        </section>

        <section className="glass-card p-5 shadow-sm space-y-3">
          <h2 className="font-bold text-gray-700 text-base">6. 規約の変更</h2>
          <p>
            本規約は必要に応じて変更されることがあります。
            重要な変更がある場合はアプリ内でお知らせします。
          </p>
        </section>

        <section className="glass-card p-5 shadow-sm space-y-3">
          <h2 className="font-bold text-gray-700 text-base">7. お問い合わせ</h2>
          <p>
            本規約に関するご質問は、下記メールアドレスよりご連絡ください。
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
