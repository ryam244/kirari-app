"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import BottomNav from "@/components/BottomNav";
import { DUMMY_LOGS, WeightLog } from "@/lib/data";

const fadeUp = {
  hidden: { opacity: 0, y: 20 },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: { delay: i * 0.08, duration: 0.4, ease: "easeOut" },
  }),
};

function LogCard({ log, index }: { log: WeightLog; index: number }) {
  const [expanded, setExpanded] = useState(false);

  const dateObj = new Date(log.date);
  const dayNames = ["日", "月", "火", "水", "木", "金", "土"];
  const dayName = dayNames[dateObj.getDay()];
  const displayDate = `${dateObj.getMonth() + 1}月${dateObj.getDate()}日（${dayName}）`;

  const isToday = index === 0;

  return (
    <motion.div
      custom={index}
      variants={fadeUp}
      initial="hidden"
      animate="visible"
      className={`glass-card p-4 shadow-lg cursor-pointer transition-all duration-300 ${
        isToday ? "ring-2 ring-pink-300" : ""
      }`}
      onClick={() => setExpanded(!expanded)}
      style={
        isToday
          ? {
              background:
                "linear-gradient(135deg, rgba(255,181,200,0.2), rgba(200,181,255,0.15))",
            }
          : {}
      }
    >
      <div className="flex items-start gap-3">
        {/* Mood emoji */}
        <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-pink-50 to-purple-50 flex items-center justify-center text-2xl flex-shrink-0 shadow-sm">
          {log.moodEmoji}
        </div>

        <div className="flex-1 min-w-0">
          <div className="flex justify-between items-start">
            <div>
              <div className="flex items-center gap-2">
                <span className="text-sm font-semibold text-gray-600">{displayDate}</span>
                {isToday && (
                  <span className="text-xs bg-pink-100 text-pink-500 px-2 py-0.5 rounded-full font-medium">
                    今日
                  </span>
                )}
              </div>
              <p className="text-xs text-gray-400 mt-0.5">
                {log.memo || "メモなし"}
              </p>
            </div>
            <div className="text-right flex-shrink-0">
              <span className="font-inter text-xl font-bold text-gray-700">{log.weight}</span>
              <span className="text-xs text-gray-400"> kg</span>
              {index < DUMMY_LOGS.length - 1 && (
                <div className={`text-xs font-medium mt-0.5 ${
                  log.weight < DUMMY_LOGS[index + 1].weight
                    ? "text-green-500"
                    : log.weight > DUMMY_LOGS[index + 1].weight
                    ? "text-red-400"
                    : "text-gray-400"
                }`}>
                  {log.weight < DUMMY_LOGS[index + 1].weight
                    ? `▼ ${(DUMMY_LOGS[index + 1].weight - log.weight).toFixed(1)}`
                    : log.weight > DUMMY_LOGS[index + 1].weight
                    ? `▲ ${(log.weight - DUMMY_LOGS[index + 1].weight).toFixed(1)}`
                    : "→ ±0"}
                </div>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* AI Comment - always visible but can expand */}
      <div className="mt-3 bg-white/50 rounded-xl p-3">
        <div className="flex gap-2 items-start">
          <span className="text-base flex-shrink-0">✨</span>
          <p className={`text-xs text-gray-500 leading-relaxed ${!expanded ? "line-clamp-2" : ""}`}>
            {log.aiComment}
          </p>
        </div>
        {log.aiComment.length > 80 && (
          <button
            className="text-xs text-purple-400 mt-1 font-medium"
            onClick={(e) => {
              e.stopPropagation();
              setExpanded(!expanded);
            }}
          >
            {expanded ? "折りたたむ ↑" : "もっと読む ↓"}
          </button>
        )}
      </div>
    </motion.div>
  );
}

export default function DiaryPage() {
  const totalLogs = DUMMY_LOGS.length;
  const startWeight = 55.0;
  const currentWeight = DUMMY_LOGS[0].weight;
  const totalLoss = (startWeight - currentWeight).toFixed(1);

  return (
    <div className="mobile-container pb-28">
      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="px-5 pt-12 pb-2"
      >
        <h1 className="text-2xl font-bold text-gray-700">📖 AI日記</h1>
        <p className="text-sm text-gray-400 mt-1">キラリが毎日を応援します💕</p>
      </motion.div>

      {/* Summary stats */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.15 }}
        className="px-5 py-3"
      >
        <div
          className="rounded-3xl p-5 text-white shadow-lg"
          style={{
            background: "linear-gradient(135deg, #FFB5C8, #C8B5FF)",
          }}
        >
          <p className="text-white/80 text-xs font-medium mb-3">🏆 これまでの成果</p>
          <div className="grid grid-cols-3 gap-2">
            <div className="text-center">
              <div className="font-inter text-3xl font-bold">{totalLoss}</div>
              <div className="text-white/70 text-xs">kg 減量</div>
            </div>
            <div className="text-center border-x border-white/20">
              <div className="font-inter text-3xl font-bold">{totalLogs}</div>
              <div className="text-white/70 text-xs">日間の記録</div>
            </div>
            <div className="text-center">
              <div className="font-inter text-3xl font-bold">14</div>
              <div className="text-white/70 text-xs">日連続🔥</div>
            </div>
          </div>
        </div>
      </motion.div>

      {/* Premium teaser */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.25 }}
        className="px-5 mb-2"
      >
        <div className="glass-card px-4 py-3 flex items-center justify-between shadow-sm">
          <div className="flex items-center gap-2">
            <span className="text-lg">👑</span>
            <div>
              <p className="text-xs font-semibold text-gray-600">プレミアムで月次AI分析レポート</p>
              <p className="text-xs text-gray-400">体重トレンド・気分パターンを詳しく解析</p>
            </div>
          </div>
          <a
            href="/premium"
            className="text-xs text-white px-3 py-1.5 rounded-full flex-shrink-0 font-semibold"
            style={{ background: "linear-gradient(135deg, #FFB5C8, #C8B5FF)" }}
          >
            見る
          </a>
        </div>
      </motion.div>

      {/* Log list */}
      <div className="px-5 space-y-3 pb-4">
        <motion.h3
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.3 }}
          className="text-xs font-semibold text-gray-400 px-1"
        >
          ✏️ 記録一覧
        </motion.h3>
        {DUMMY_LOGS.map((log, i) => (
          <LogCard key={log.id} log={log} index={i} />
        ))}

        {/* Load more (dummy) */}
        <motion.button
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.8 }}
          className="w-full py-3 text-sm text-purple-400 font-medium glass-card shadow-sm"
        >
          もっと読み込む ↓
        </motion.button>
      </div>

      <BottomNav />
    </div>
  );
}
