"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import BottomNav from "@/components/BottomNav";

const fadeUp = {
  hidden: { opacity: 0, y: 25 },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: { delay: i * 0.1, duration: 0.45, ease: "easeOut" as const },
  }),
};

const FEATURES_LIGHT = [
  "すべての無料機能",
  "体重ログ無制限",
  "詳細グラフ・カレンダー表示",
  "AIひとことコメント（無制限）",
  "食事・水分記録",
  "生理周期連携",
];

const FEATURES_PRO = [
  "すべてのライト機能",
  "月次AI分析レポート",
  "AIパーソナルコーチング",
  "体重トレンド予測",
  "カスタムリマインダー",
  "データCSVエクスポート",
  "広告なし",
  "優先サポート",
];

const REVIEWS = [
  {
    name: "みほ",
    age: 26,
    comment: "AIのコメントが毎日の励みに！3ヶ月で5kg痩せました🌸",
    rating: 5,
    avatar: "🌸",
  },
  {
    name: "さくら",
    age: 24,
    comment: "UIがかわいすぎて開くのが楽しみ💕 記録が続くようになった！",
    rating: 5,
    avatar: "🎀",
  },
  {
    name: "あおい",
    age: 29,
    comment: "プレミアムのレポート機能が神すぎ。自分のパターンがわかる✨",
    rating: 5,
    avatar: "💜",
  },
];

export default function PremiumPage() {
  const [selectedPlan, setSelectedPlan] = useState<"light" | "pro">("pro");
  const [showSuccessModal, setShowSuccessModal] = useState(false);

  const handleSubscribe = () => {
    setShowSuccessModal(true);
  };

  return (
    <div className="mobile-container pb-28 overflow-hidden">
      {/* Hero section */}
      <div
        className="relative px-5 page-top pb-8 text-center overflow-hidden"
        style={{
          background: "linear-gradient(160deg, #FFB5C8 0%, #C8B5FF 50%, #B5D8FF 100%)",
        }}
      >
        {/* Decorative bubbles */}
        <div className="absolute top-6 right-6 w-20 h-20 rounded-full bg-white/20 blur-sm" />
        <div className="absolute bottom-4 left-4 w-12 h-12 rounded-full bg-white/15 blur-sm" />
        <div className="absolute top-16 left-8 w-8 h-8 rounded-full bg-white/25" />

        <motion.div
          initial={{ opacity: 0, scale: 0.5 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.6, type: "spring" }}
          className="text-5xl mb-3"
        >
          👑
        </motion.div>
        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="text-2xl font-bold text-white mb-2"
        >
          キラリ プレミアム
        </motion.h1>
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="text-white/85 text-sm leading-relaxed"
        >
          AIパーソナルコーチと一緒に、<br />
          理想の自分へ近づこう🌸
        </motion.p>

        {/* Social proof */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.45 }}
          className="mt-4 flex items-center justify-center gap-1"
        >
          <div className="flex -space-x-1">
            {["🌸", "💕", "✨", "🎀", "💜"].map((e, i) => (
              <div
                key={i}
                className="w-7 h-7 rounded-full bg-white/30 flex items-center justify-center text-xs border-2 border-white/50"
              >
                {e}
              </div>
            ))}
          </div>
          <p className="text-white/80 text-xs ml-2">
            <strong className="text-white">12,400+</strong> 人が利用中
          </p>
        </motion.div>
      </div>

      <div className="px-5 -mt-4 space-y-4">
        {/* Plan selector */}
        <motion.div
          custom={0}
          variants={fadeUp}
          initial="hidden"
          animate="visible"
          className="glass-card p-2 shadow-lg"
        >
          <div className="grid grid-cols-2 gap-1">
            <button
              onClick={() => setSelectedPlan("light")}
              className={`py-3 rounded-2xl text-sm font-semibold transition-all duration-300 ${
                selectedPlan === "light"
                  ? "bg-gradient-to-r from-pink-300 to-purple-300 text-white shadow-md"
                  : "text-gray-400"
              }`}
            >
              💡 ライト
              <div className="text-xs font-normal opacity-80">¥480 / 月</div>
            </button>
            <button
              onClick={() => setSelectedPlan("pro")}
              className={`py-3 rounded-2xl text-sm font-semibold transition-all duration-300 relative ${
                selectedPlan === "pro"
                  ? "bg-gradient-to-r from-pink-300 to-purple-300 text-white shadow-md"
                  : "text-gray-400"
              }`}
            >
              <span className="absolute -top-2 left-1/2 -translate-x-1/2 bg-yellow-400 text-white text-xs px-2 py-0.5 rounded-full whitespace-nowrap">
                おすすめ ✨
              </span>
              ⭐ プロ
              <div className="text-xs font-normal opacity-80">¥980 / 月</div>
            </button>
          </div>
        </motion.div>

        {/* Price card */}
        <motion.div
          custom={1}
          variants={fadeUp}
          initial="hidden"
          animate="visible"
          className="glass-card p-5 shadow-lg"
          style={{
            background:
              selectedPlan === "pro"
                ? "linear-gradient(135deg, rgba(255,181,200,0.2), rgba(200,181,255,0.2))"
                : "rgba(255,255,255,0.75)",
          }}
        >
          <AnimatePresence mode="wait">
            <motion.div
              key={selectedPlan}
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              transition={{ duration: 0.25 }}
            >
              {selectedPlan === "light" ? (
                <>
                  <div className="flex justify-between items-start mb-4">
                    <div>
                      <h3 className="text-lg font-bold text-gray-700">💡 ライトプラン</h3>
                      <p className="text-xs text-gray-400">まず試したい方に</p>
                    </div>
                    <div className="text-right">
                      <div className="font-inter text-3xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-pink-400 to-purple-500">
                        ¥480
                      </div>
                      <div className="text-xs text-gray-400">/ 月（税込）</div>
                    </div>
                  </div>
                  <div className="space-y-2">
                    {FEATURES_LIGHT.map((f, i) => (
                      <div key={i} className="flex items-center gap-2 text-sm text-gray-600">
                        <span className="text-green-400 flex-shrink-0">✓</span>
                        {f}
                      </div>
                    ))}
                  </div>
                  <div className="mt-3 pt-3 border-t border-gray-100">
                    <p className="text-xs text-gray-400">
                      ☕ コーヒー1杯分で健康習慣が変わる
                    </p>
                  </div>
                </>
              ) : (
                <>
                  <div className="flex justify-between items-start mb-4">
                    <div>
                      <h3 className="text-lg font-bold text-gray-700">⭐ プロプラン</h3>
                      <p className="text-xs text-gray-400">本気で変わりたい方に</p>
                    </div>
                    <div className="text-right">
                      <div className="line-through text-gray-300 text-sm font-inter">¥1,480</div>
                      <div className="font-inter text-3xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-pink-400 to-purple-500">
                        ¥980
                      </div>
                      <div className="text-xs text-gray-400">/ 月（税込）</div>
                    </div>
                  </div>
                  <div className="space-y-2">
                    {FEATURES_PRO.map((f, i) => (
                      <div key={i} className="flex items-center gap-2 text-sm text-gray-600">
                        <span className="text-green-400 flex-shrink-0">✓</span>
                        {f}
                      </div>
                    ))}
                  </div>
                  <div className="mt-3 pt-3 border-t border-pink-100">
                    <p className="text-xs text-pink-400 font-medium">
                      🎁 今なら7日間無料トライアル！
                    </p>
                  </div>
                </>
              )}
            </motion.div>
          </AnimatePresence>
        </motion.div>

        {/* CTA Button */}
        <motion.div
          custom={2}
          variants={fadeUp}
          initial="hidden"
          animate="visible"
        >
          <button onClick={handleSubscribe} className="w-full btn-primary text-lg">
            {selectedPlan === "pro"
              ? "7日間無料で始める 🌸"
              : "ライトプランを始める 💕"}
          </button>
          <p className="text-center text-xs text-gray-400 mt-2">
            {selectedPlan === "pro"
              ? "7日間は無料。いつでもキャンセル可能✨"
              : "いつでもキャンセル可能✨"}
          </p>
        </motion.div>

        {/* Feature comparison */}
        <motion.div
          custom={3}
          variants={fadeUp}
          initial="hidden"
          animate="visible"
          className="glass-card p-5 shadow-lg"
        >
          <h3 className="text-sm font-semibold text-gray-600 mb-4">📊 プラン比較</h3>
          <div className="overflow-x-auto">
            <table className="w-full text-xs">
              <thead>
                <tr>
                  <th className="text-left text-gray-400 py-1 font-normal">機能</th>
                  <th className="text-center text-gray-400 py-1 font-normal">無料</th>
                  <th className="text-center text-pink-400 py-1 font-medium">ライト</th>
                  <th className="text-center text-purple-400 py-1 font-medium">プロ</th>
                </tr>
              </thead>
              <tbody className="space-y-1">
                {[
                  ["体重ログ", "1日1回", "無制限", "無制限"],
                  ["AIコメント", "1日1回", "無制限", "無制限"],
                  ["グラフ", "週間", "月間", "全期間"],
                  ["AI分析レポート", "×", "×", "✓"],
                  ["予測機能", "×", "×", "✓"],
                ].map(([feature, free, light, pro], i) => (
                  <tr key={i} className={i % 2 === 0 ? "bg-gray-50/50 rounded" : ""}>
                    <td className="py-2 px-1 text-gray-500">{feature}</td>
                    <td className="py-2 text-center text-gray-400">{free}</td>
                    <td className="py-2 text-center text-pink-400 font-medium">{light}</td>
                    <td className="py-2 text-center text-purple-400 font-medium">{pro}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </motion.div>

        {/* Reviews */}
        <motion.div
          custom={4}
          variants={fadeUp}
          initial="hidden"
          animate="visible"
          className="space-y-3"
        >
          <h3 className="text-sm font-semibold text-gray-600 px-1">💬 ユーザーの声</h3>
          {REVIEWS.map((review, i) => (
            <div key={i} className="glass-card p-4 shadow-sm">
              <div className="flex items-center gap-2 mb-2">
                <div className="w-8 h-8 rounded-full bg-gradient-to-br from-pink-100 to-purple-100 flex items-center justify-center text-base">
                  {review.avatar}
                </div>
                <div>
                  <span className="text-sm font-semibold text-gray-600">{review.name}</span>
                  <span className="text-xs text-gray-400 ml-1">（{review.age}歳）</span>
                </div>
                <div className="ml-auto flex">
                  {Array.from({ length: review.rating }).map((_, j) => (
                    <span key={j} className="text-yellow-400 text-xs">★</span>
                  ))}
                </div>
              </div>
              <p className="text-sm text-gray-500 leading-relaxed">{review.comment}</p>
            </div>
          ))}
        </motion.div>

        {/* FAQ */}
        <motion.div
          custom={5}
          variants={fadeUp}
          initial="hidden"
          animate="visible"
          className="glass-card p-5 shadow-lg"
        >
          <h3 className="text-sm font-semibold text-gray-600 mb-3">❓ よくある質問</h3>
          <div className="space-y-3">
            {[
              {
                q: "いつでもキャンセルできますか？",
                a: "はい！設定からいつでも簡単にキャンセルできます。途中解約しても残り期間は利用できます。",
              },
              {
                q: "7日間の無料トライアル後は？",
                a: "トライアル後は自動的に有料プランに移行します。トライアル期間中にキャンセルすれば費用は一切かかりません。",
              },
              {
                q: "データは安全ですか？",
                a: "はい！データは暗号化され、第三者に共有されることはありません。いつでもデータ削除が可能です。",
              },
            ].map((faq, i) => (
              <div key={i} className="pb-3 border-b border-gray-100 last:border-0">
                <p className="text-sm font-medium text-gray-600 mb-1">Q. {faq.q}</p>
                <p className="text-xs text-gray-400 leading-relaxed">A. {faq.a}</p>
              </div>
            ))}
          </div>
        </motion.div>

        {/* Bottom CTA */}
        <motion.div
          custom={6}
          variants={fadeUp}
          initial="hidden"
          animate="visible"
          className="pb-4"
        >
          <button onClick={handleSubscribe} className="w-full btn-primary text-lg">
            今すぐ始める 🎀
          </button>
          <div className="flex justify-center gap-4 mt-3">
            <p className="text-xs text-gray-400">🔒 安全な決済</p>
            <p className="text-xs text-gray-400">✨ いつでもキャンセル</p>
            <p className="text-xs text-gray-400">🌸 返金保証</p>
          </div>
        </motion.div>
      </div>

      {/* Success Modal */}
      <AnimatePresence>
        {showSuccessModal && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/40 backdrop-blur-sm z-50 flex items-center justify-center p-6"
            onClick={() => setShowSuccessModal(false)}
          >
            <motion.div
              initial={{ scale: 0.8, opacity: 0, y: 30 }}
              animate={{ scale: 1, opacity: 1, y: 0 }}
              exit={{ scale: 0.8, opacity: 0, y: 30 }}
              transition={{ type: "spring", stiffness: 200 }}
              className="glass-card p-8 text-center shadow-2xl"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="text-6xl mb-4">🎉</div>
              <h3 className="text-xl font-bold text-gray-700 mb-2">
                おめでとうございます！
              </h3>
              <p className="text-sm text-gray-500 mb-4 leading-relaxed">
                {selectedPlan === "pro"
                  ? "プロプランの7日間無料トライアルが始まりました！\nAIパーソナルコーチと一緒に理想の自分へ✨"
                  : "ライトプランへようこそ！\nたくさんの機能を楽しんでください💕"}
              </p>
              <div className="flex gap-2 text-2xl justify-center mb-6">
                🌸💕✨🎀💜
              </div>
              <button
                onClick={() => setShowSuccessModal(false)}
                className="btn-primary w-full"
              >
                キラリを始める 🌸
              </button>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      <BottomNav />
    </div>
  );
}
