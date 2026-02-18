"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import BottomNav from "@/components/BottomNav";
import { DUMMY_LOGS, WEEKLY_DATA } from "@/lib/data";

const fadeUp = {
  hidden: { opacity: 0, y: 30 },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: { delay: i * 0.1, duration: 0.5, ease: "easeOut" },
  }),
};

function MiniWeightChart() {
  const max = Math.max(...WEEKLY_DATA.map((d) => d.weight));
  const min = Math.min(...WEEKLY_DATA.map((d) => d.weight));
  const range = max - min || 0.5;
  const height = 60;
  const width = 280;
  const padX = 16;
  const padY = 8;
  const innerW = width - padX * 2;
  const innerH = height - padY * 2;

  const points = WEEKLY_DATA.map((d, i) => {
    const x = padX + (i / (WEEKLY_DATA.length - 1)) * innerW;
    const y = padY + innerH - ((d.weight - min) / range) * innerH;
    return `${x},${y}`;
  }).join(" ");

  const fillPoints = `${padX},${height} ${points} ${width - padX},${height}`;

  return (
    <div className="w-full">
      <svg viewBox={`0 0 ${width} ${height}`} className="w-full" style={{ height: 70 }}>
        <defs>
          <linearGradient id="chartGrad" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="#FFB5C8" stopOpacity="0.6" />
            <stop offset="100%" stopColor="#C8B5FF" stopOpacity="0.05" />
          </linearGradient>
        </defs>
        <polygon points={fillPoints} fill="url(#chartGrad)" />
        <polyline
          points={points}
          fill="none"
          stroke="url(#lineGrad)"
          strokeWidth="2.5"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        <defs>
          <linearGradient id="lineGrad" x1="0" y1="0" x2="1" y2="0">
            <stop offset="0%" stopColor="#FFB5C8" />
            <stop offset="100%" stopColor="#C8B5FF" />
          </linearGradient>
        </defs>
        {WEEKLY_DATA.map((d, i) => {
          const x = padX + (i / (WEEKLY_DATA.length - 1)) * innerW;
          const y = padY + innerH - ((d.weight - min) / range) * innerH;
          return (
            <circle key={i} cx={x} cy={y} r={i === WEEKLY_DATA.length - 1 ? 5 : 3}
              fill={i === WEEKLY_DATA.length - 1 ? "#FF85A8" : "#FFB5C8"}
              stroke="white" strokeWidth="2"
            />
          );
        })}
      </svg>
      <div className="flex justify-between px-4 -mt-1">
        {WEEKLY_DATA.map((d) => (
          <span key={d.day} className="text-xs text-gray-400">{d.day}</span>
        ))}
      </div>
    </div>
  );
}

export default function HomePage() {
  const today = DUMMY_LOGS[0];
  const yesterday = DUMMY_LOGS[1];
  const diff = (today.weight - yesterday.weight).toFixed(1);
  const isDown = today.weight < yesterday.weight;

  return (
    <div className="mobile-container pb-28">
      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="px-5 pt-12 pb-4"
      >
        <div className="flex justify-between items-center">
          <div>
            <p className="text-sm text-gray-400 font-medium">2026年2月18日 水曜日</p>
            <h1 className="text-2xl font-bold text-gray-700 mt-1">
              おはよう、りあちゃん！<span className="ml-1">🌸</span>
            </h1>
          </div>
          <div className="w-11 h-11 rounded-full bg-gradient-to-br from-pink-200 to-purple-200 flex items-center justify-center text-xl shadow-md">
            🎀
          </div>
        </div>
      </motion.div>

      <div className="px-5 space-y-4">
        {/* Today's weight card */}
        <motion.div
          custom={0}
          variants={fadeUp}
          initial="hidden"
          animate="visible"
          className="glass-card p-5 shadow-lg"
          style={{ boxShadow: "0 8px 32px rgba(255, 181, 200, 0.25)" }}
        >
          <div className="flex justify-between items-start mb-3">
            <span className="text-sm font-medium text-gray-400">今日の体重</span>
            <span className="text-xs bg-pink-50 text-pink-400 px-2 py-1 rounded-full border border-pink-100">
              {today.moodEmoji} {today.mood === "great" ? "最高！" : "いい感じ"}
            </span>
          </div>
          <div className="flex items-end gap-3">
            <span className="font-inter text-5xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-pink-400 to-purple-500">
              {today.weight}
            </span>
            <span className="text-gray-400 font-medium mb-2">kg</span>
            <span className={`mb-2 text-sm font-semibold px-2 py-1 rounded-full ${
              isDown
                ? "bg-green-50 text-green-500"
                : "bg-red-50 text-red-400"
            }`}>
              {isDown ? "▼" : "▲"} {Math.abs(Number(diff))} kg
            </span>
          </div>
          <p className="text-xs text-gray-400 mt-1">昨日比 | 目標まで あと 2.3 kg ✨</p>

          {/* Progress bar */}
          <div className="mt-3">
            <div className="flex justify-between text-xs text-gray-400 mb-1">
              <span>スタート 55.0 kg</span>
              <span>目標 50.0 kg</span>
            </div>
            <div className="h-2 bg-gray-100 rounded-full overflow-hidden">
              <motion.div
                className="h-full rounded-full bg-gradient-to-r from-pink-300 to-purple-400"
                initial={{ width: 0 }}
                animate={{ width: "54%" }}
                transition={{ delay: 0.5, duration: 1, ease: "easeOut" }}
              />
            </div>
          </div>
        </motion.div>

        {/* AI comment card */}
        <motion.div
          custom={1}
          variants={fadeUp}
          initial="hidden"
          animate="visible"
          className="glass-card p-5 shadow-lg"
          style={{
            background: "linear-gradient(135deg, rgba(255,181,200,0.2), rgba(200,181,255,0.2))",
            boxShadow: "0 8px 32px rgba(200, 181, 255, 0.2)",
          }}
        >
          <div className="flex gap-3 items-start">
            <div className="w-10 h-10 rounded-2xl bg-gradient-to-br from-pink-300 to-purple-300 flex items-center justify-center text-lg shadow-sm flex-shrink-0">
              ✨
            </div>
            <div>
              <p className="text-xs font-semibold text-purple-400 mb-1">キラリからのひとこと</p>
              <p className="text-sm text-gray-600 leading-relaxed">
                {today.aiComment}
              </p>
            </div>
          </div>
        </motion.div>

        {/* Weekly chart */}
        <motion.div
          custom={2}
          variants={fadeUp}
          initial="hidden"
          animate="visible"
          className="glass-card p-5 shadow-lg"
        >
          <div className="flex justify-between items-center mb-3">
            <h3 className="text-sm font-semibold text-gray-600">📈 今週の記録</h3>
            <span className="text-xs text-gray-400">
              週平均 {(WEEKLY_DATA.reduce((a, b) => a + b.weight, 0) / WEEKLY_DATA.length).toFixed(1)} kg
            </span>
          </div>
          <MiniWeightChart />
        </motion.div>

        {/* Quick log button */}
        <motion.div
          custom={3}
          variants={fadeUp}
          initial="hidden"
          animate="visible"
        >
          <Link href="/log">
            <button className="w-full btn-primary text-lg">
              📝 今日の体重を記録する
            </button>
          </Link>
        </motion.div>

        {/* Stats row */}
        <motion.div
          custom={4}
          variants={fadeUp}
          initial="hidden"
          animate="visible"
          className="grid grid-cols-3 gap-3"
        >
          {[
            { label: "連続記録", value: "14", unit: "日", emoji: "🔥" },
            { label: "今月の変化", value: "-1.2", unit: "kg", emoji: "📉" },
            { label: "ログ総数", value: "42", unit: "回", emoji: "💪" },
          ].map((stat) => (
            <div key={stat.label} className="glass-card p-3 text-center shadow-sm">
              <div className="text-xl mb-1">{stat.emoji}</div>
              <div className="font-inter text-xl font-bold text-gray-700">
                {stat.value}
                <span className="text-xs text-gray-400 font-normal">{stat.unit}</span>
              </div>
              <div className="text-xs text-gray-400 mt-0.5">{stat.label}</div>
            </div>
          ))}
        </motion.div>

        {/* Recent logs preview */}
        <motion.div
          custom={5}
          variants={fadeUp}
          initial="hidden"
          animate="visible"
          className="glass-card p-5 shadow-lg"
        >
          <div className="flex justify-between items-center mb-3">
            <h3 className="text-sm font-semibold text-gray-600">💕 最近の記録</h3>
            <Link href="/diary" className="text-xs text-purple-400 font-medium">
              もっと見る →
            </Link>
          </div>
          <div className="space-y-3">
            {DUMMY_LOGS.slice(0, 3).map((log) => (
              <div key={log.id} className="flex items-center gap-3">
                <span className="text-2xl">{log.moodEmoji}</span>
                <div className="flex-1">
                  <div className="flex justify-between items-center">
                    <span className="text-sm font-medium text-gray-600">
                      {log.date.slice(5).replace("-", "/")}
                    </span>
                    <span className="font-inter font-bold text-gray-700">
                      {log.weight} <span className="text-xs text-gray-400 font-normal">kg</span>
                    </span>
                  </div>
                  <p className="text-xs text-gray-400 truncate">{log.memo}</p>
                </div>
              </div>
            ))}
          </div>
        </motion.div>
      </div>

      <BottomNav />
    </div>
  );
}
