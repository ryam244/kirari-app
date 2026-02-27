"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import BottomNav from "@/components/BottomNav";
import { WeightLog } from "@/lib/data";
import { useWeightLogs } from "@/hooks/useWeightLogs";
import { useSettings } from "@/hooks/useSettings";

const fadeUp = {
  hidden: { opacity: 0, y: 20 },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: { delay: i * 0.06, duration: 0.4, ease: "easeOut" as const },
  }),
};

const PAGE_SIZE = 10;

function LogCard({
  log,
  index,
  nextLog,
  isToday,
  onDelete,
}: {
  log: WeightLog;
  index: number;
  nextLog?: WeightLog;
  isToday: boolean;
  onDelete: (id: string) => void;
}) {
  const [expanded, setExpanded] = useState(false);
  const [confirmDelete, setConfirmDelete] = useState(false);

  const dateObj = new Date(log.date + "T00:00:00");
  const dayNames = ["日", "月", "火", "水", "木", "金", "土"];
  const displayDate = `${dateObj.getMonth() + 1}月${dateObj.getDate()}日（${dayNames[dateObj.getDay()]}）`;

  const diffNum = nextLog ? log.weight - nextLog.weight : null;
  const diffStr = diffNum !== null ? Math.abs(diffNum).toFixed(1) : null;

  return (
    <motion.div
      custom={index}
      variants={fadeUp}
      initial="hidden"
      animate="visible"
      className={`glass-card p-4 shadow-lg cursor-pointer transition-all duration-300 ${
        isToday ? "ring-2 ring-pink-300" : ""
      }`}
      onClick={() => {
        if (!confirmDelete) setExpanded(!expanded);
      }}
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
        <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-pink-50 to-purple-50 flex items-center justify-center text-2xl flex-shrink-0 shadow-sm">
          {log.moodEmoji}
        </div>

        <div className="flex-1 min-w-0">
          <div className="flex justify-between items-start">
            <div>
              <div className="flex items-center gap-2">
                <span className="text-sm font-semibold text-gray-600">
                  {displayDate}
                </span>
                {isToday && (
                  <span className="text-xs bg-pink-100 text-pink-500 px-2 py-0.5 rounded-full font-medium">
                    今日
                  </span>
                )}
              </div>
              <p className="text-xs text-gray-400 mt-0.5 truncate max-w-[160px]">
                {log.memo || "メモなし"}
              </p>
            </div>
            <div className="text-right flex-shrink-0">
              <span className="font-inter text-xl font-bold text-gray-700">
                {log.weight}
              </span>
              <span className="text-xs text-gray-400"> kg</span>
              {diffStr !== null && (
                <div
                  className={`text-xs font-medium mt-0.5 ${
                    diffNum! < 0
                      ? "text-green-500"
                      : diffNum! > 0
                      ? "text-red-400"
                      : "text-gray-400"
                  }`}
                >
                  {diffNum! < 0
                    ? `▼ ${diffStr}`
                    : diffNum! > 0
                    ? `▲ ${diffStr}`
                    : "→ ±0"}
                </div>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* AI Comment */}
      <div className="mt-3 bg-white/50 rounded-xl p-3">
        <div className="flex gap-2 items-start">
          <span className="text-base flex-shrink-0">✨</span>
          <p
            className={`text-xs text-gray-500 leading-relaxed ${
              !expanded ? "line-clamp-2" : ""
            }`}
          >
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

      {/* Delete button (shown when expanded) */}
      <AnimatePresence>
        {expanded && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            className="mt-3"
            onClick={(e) => e.stopPropagation()}
          >
            {!confirmDelete ? (
              <button
                onClick={() => setConfirmDelete(true)}
                className="text-xs text-gray-400 hover:text-red-400 transition-colors font-medium px-2 py-1"
              >
                🗑️ この記録を削除
              </button>
            ) : (
              <div className="flex items-center gap-2">
                <span className="text-xs text-gray-500">本当に削除する？</span>
                <button
                  onClick={() => onDelete(log.id)}
                  className="text-xs text-white bg-red-400 px-3 py-1 rounded-full font-medium"
                >
                  削除
                </button>
                <button
                  onClick={() => setConfirmDelete(false)}
                  className="text-xs text-gray-400 px-3 py-1 rounded-full border border-gray-200"
                >
                  キャンセル
                </button>
              </div>
            )}
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
}

export default function DiaryPage() {
  const [visibleCount, setVisibleCount] = useState(PAGE_SIZE);
  const { logs, removeLog, isLoaded } = useWeightLogs();
  const { settings } = useSettings();

  const todayStr = (() => {
    const d = new Date();
    return `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, "0")}-${String(d.getDate()).padStart(2, "0")}`;
  })();

  const totalLoss =
    logs.length > 0
      ? (settings.startWeight - logs[0].weight).toFixed(1)
      : "0.0";
  const hasMore = logs.length > visibleCount;
  const visibleLogs = logs.slice(0, visibleCount);

  // streak
  const streak = (() => {
    if (logs.length === 0) return 0;
    let count = 0;
    const base = new Date();
    const todayLogged = logs.some((l) => l.date === todayStr);
    if (!todayLogged) base.setDate(base.getDate() - 1);
    for (let i = 0; i < 365; i++) {
      const d = new Date(base);
      d.setDate(d.getDate() - i);
      const ds = `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, "0")}-${String(d.getDate()).padStart(2, "0")}`;
      if (logs.some((l) => l.date === ds)) count++;
      else break;
    }
    return count;
  })();

  if (!isLoaded) {
    return (
      <div className="mobile-container flex items-center justify-center h-screen">
        <motion.div
          animate={{ scale: [1, 1.2, 1] }}
          transition={{ repeat: Infinity, duration: 1.2 }}
          className="text-5xl"
        >
          ✨
        </motion.div>
      </div>
    );
  }

  return (
    <div className="mobile-container pb-28">
      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="px-5 page-top pb-2"
      >
        <h1 className="text-2xl font-bold text-gray-700">📖 AI日記</h1>
        <p className="text-sm text-gray-400 mt-1">
          キラリが毎日を応援します💕
        </p>
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
          style={{ background: "linear-gradient(135deg, #FFB5C8, #C8B5FF)" }}
        >
          <p className="text-white/80 text-xs font-medium mb-3">
            🏆 これまでの成果
          </p>
          <div className="grid grid-cols-3 gap-2">
            <div className="text-center">
              <div className="font-inter text-3xl font-bold">{totalLoss}</div>
              <div className="text-white/70 text-xs">kg 減量</div>
            </div>
            <div className="text-center border-x border-white/20">
              <div className="font-inter text-3xl font-bold">{logs.length}</div>
              <div className="text-white/70 text-xs">日間の記録</div>
            </div>
            <div className="text-center">
              <div className="font-inter text-3xl font-bold">{streak}</div>
              <div className="text-white/70 text-xs">日連続🔥</div>
            </div>
          </div>
        </div>
      </motion.div>

      {/* Log list */}
      <div className="px-5 space-y-3 pb-4">
        {logs.length === 0 ? (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="text-center py-16 space-y-4"
          >
            <div className="text-6xl">📝</div>
            <p className="text-gray-500 font-semibold">まだ記録がありません</p>
            <p className="text-gray-400 text-sm">
              最初の記録を追加してみましょう！
            </p>
          </motion.div>
        ) : (
          <>
            <motion.h3
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.3 }}
              className="text-xs font-semibold text-gray-400 px-1"
            >
              ✏️ 記録一覧（{logs.length}件）
            </motion.h3>

            {visibleLogs.map((log, i) => (
              <LogCard
                key={log.id}
                log={log}
                index={i}
                nextLog={logs[i + 1]}
                isToday={log.date === todayStr}
                onDelete={removeLog}
              />
            ))}

            {hasMore && (
              <motion.button
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                onClick={() => setVisibleCount((c) => c + PAGE_SIZE)}
                className="w-full py-3 text-sm text-purple-400 font-medium glass-card shadow-sm active:scale-95 transition-transform"
              >
                もっと読み込む ↓（残り {logs.length - visibleCount}件）
              </motion.button>
            )}
          </>
        )}
      </div>

      <BottomNav />
    </div>
  );
}
