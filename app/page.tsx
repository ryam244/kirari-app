"use client";

import { useEffect } from "react";
import { motion } from "framer-motion";
import Link from "next/link";
import { useRouter } from "next/navigation";
import BottomNav from "@/components/BottomNav";
import { useWeightLogs } from "@/hooks/useWeightLogs";
import { useSettings } from "@/hooks/useSettings";
import { MOODS } from "@/lib/data";

const fadeUp = {
  hidden: { opacity: 0, y: 30 },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: { delay: i * 0.1, duration: 0.5, ease: "easeOut" as const },
  }),
};

function MiniWeightChart({
  data,
}: {
  data: { day: string; weight: number | null }[];
}) {
  const validPoints = data
    .map((d, i) => (d.weight !== null ? { ...d, weight: d.weight, i } : null))
    .filter(Boolean) as { day: string; weight: number; i: number }[];

  if (validPoints.length < 2) {
    return (
      <div className="py-6 text-center text-xs text-gray-400">
        記録が増えるとグラフが表示されます 📈
      </div>
    );
  }

  const weights = validPoints.map((p) => p.weight);
  const max = Math.max(...weights);
  const min = Math.min(...weights);
  const range = max - min || 0.5;
  const W = 280,
    H = 60,
    pX = 16,
    pY = 8;
  const iW = W - pX * 2,
    iH = H - pY * 2;

  const toXY = (idx: number, w: number) => ({
    x: pX + (idx / (data.length - 1)) * iW,
    y: pY + iH - ((w - min) / range) * iH,
  });

  const pts = validPoints.map((p) => toXY(p.i, p.weight));
  const lineStr = pts.map((p) => `${p.x},${p.y}`).join(" ");
  const fillStr = `${pts[0].x},${H} ${lineStr} ${pts[pts.length - 1].x},${H}`;

  return (
    <div className="w-full">
      <svg viewBox={`0 0 ${W} ${H}`} className="w-full" style={{ height: 70 }}>
        <defs>
          <linearGradient id="chartGrad" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="#FFB5C8" stopOpacity="0.6" />
            <stop offset="100%" stopColor="#C8B5FF" stopOpacity="0.05" />
          </linearGradient>
          <linearGradient id="lineGrad" x1="0" y1="0" x2="1" y2="0">
            <stop offset="0%" stopColor="#FFB5C8" />
            <stop offset="100%" stopColor="#C8B5FF" />
          </linearGradient>
        </defs>
        <polygon points={fillStr} fill="url(#chartGrad)" />
        <polyline
          points={lineStr}
          fill="none"
          stroke="url(#lineGrad)"
          strokeWidth="2.5"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        {pts.map((p, idx) => {
          const isLast = validPoints[idx].i === data.length - 1;
          return (
            <circle
              key={idx}
              cx={p.x}
              cy={p.y}
              r={isLast ? 5 : 3}
              fill={isLast ? "#FF85A8" : "#FFB5C8"}
              stroke="white"
              strokeWidth="2"
            />
          );
        })}
      </svg>
      <div className="flex justify-between px-4 -mt-1">
        {data.map((d) => (
          <span key={d.day} className="text-xs text-gray-400">
            {d.day}
          </span>
        ))}
      </div>
    </div>
  );
}

export default function HomePage() {
  const router = useRouter();
  const { logs, todayLog, weeklyData, streak, monthlyChange, isLoaded } =
    useWeightLogs();
  const { settings, isLoaded: settingsLoaded } = useSettings();

  useEffect(() => {
    if (settingsLoaded && !settings.isOnboarded) {
      router.replace("/onboarding");
    }
  }, [settingsLoaded, settings.isOnboarded, router]);

  // Dynamic date
  const now = new Date();
  const dayNames = ["日", "月", "火", "水", "木", "金", "土"];
  const dateStr = `${now.getFullYear()}年${now.getMonth() + 1}月${now.getDate()}日 ${dayNames[now.getDay()]}曜日`;

  if (!isLoaded || !settingsLoaded) {
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

  // Empty state
  if (logs.length === 0) {
    return (
      <div className="mobile-container pb-28">
        <div className="px-5 pt-12 pb-4">
          <p className="text-sm text-gray-400 font-medium">{dateStr}</p>
          <h1 className="text-2xl font-bold text-gray-700 mt-1">
            おかえり、{settings.name}！<span className="ml-1">🌸</span>
          </h1>
        </div>
        <div className="px-5 mt-8 text-center space-y-6">
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            className="text-7xl"
          >
            📝
          </motion.div>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
          >
            <p className="text-gray-600 font-semibold text-lg mb-2">
              最初の記録をしてみよう！
            </p>
            <p className="text-gray-400 text-sm leading-relaxed">
              毎日体重を記録することで
              <br />
              キラリがあなたを応援します💕
            </p>
          </motion.div>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
          >
            <Link href="/log">
              <button className="w-full btn-primary text-lg">
                📝 今日の体重を記録する
              </button>
            </Link>
          </motion.div>
        </div>
        <BottomNav />
      </div>
    );
  }

  const displayLog = todayLog ?? logs[0];
  const prevLog = logs.find((l) => l.date < displayLog.date);
  const diffNum = prevLog ? displayLog.weight - prevLog.weight : null;
  const diffStr = diffNum !== null ? Math.abs(diffNum).toFixed(1) : null;
  const isDown = diffNum !== null && diffNum < 0;

  const moodLabel =
    MOODS.find((m) => m.key === displayLog.mood)?.label ?? "ふつう";

  const { startWeight, goalWeight } = settings;
  const totalRange = startWeight - goalWeight;
  const currentLoss = startWeight - displayLog.weight;
  const progressPct =
    totalRange > 0
      ? Math.min(100, Math.max(0, (currentLoss / totalRange) * 100))
      : 0;
  const toGoal = Math.max(0, displayLog.weight - goalWeight).toFixed(1);

  const weekAvg =
    weeklyData.filter((d) => d.weight !== null).length > 0
      ? (
          weeklyData
            .filter((d) => d.weight !== null)
            .reduce((a, b) => a + (b.weight ?? 0), 0) /
          weeklyData.filter((d) => d.weight !== null).length
        ).toFixed(1)
      : null;

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
            <p className="text-sm text-gray-400 font-medium">{dateStr}</p>
            <h1 className="text-2xl font-bold text-gray-700 mt-1">
              おかえり、{settings.name}！<span className="ml-1">🌸</span>
            </h1>
          </div>
          <Link href="/settings">
            <div className="w-11 h-11 rounded-full bg-gradient-to-br from-pink-200 to-purple-200 flex items-center justify-center text-xl shadow-md">
              🎀
            </div>
          </Link>
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
            <span className="text-sm font-medium text-gray-400">
              {todayLog ? "今日の体重" : "最新の体重"}
            </span>
            <span className="text-xs bg-pink-50 text-pink-400 px-2 py-1 rounded-full border border-pink-100">
              {displayLog.moodEmoji} {moodLabel}
            </span>
          </div>
          <div className="flex items-end gap-3">
            <span className="font-inter text-5xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-pink-400 to-purple-500">
              {displayLog.weight}
            </span>
            <span className="text-gray-400 font-medium mb-2">kg</span>
            {diffStr !== null && (
              <span
                className={`mb-2 text-sm font-semibold px-2 py-1 rounded-full ${
                  isDown
                    ? "bg-green-50 text-green-500"
                    : diffNum === 0
                    ? "bg-gray-50 text-gray-400"
                    : "bg-red-50 text-red-400"
                }`}
              >
                {isDown ? "▼" : diffNum === 0 ? "→" : "▲"} {diffStr} kg
              </span>
            )}
          </div>
          <p className="text-xs text-gray-400 mt-1">
            {diffStr !== null ? "昨日比 | " : ""}
            {Number(toGoal) === 0
              ? "🎉 目標体重達成！おめでとう！"
              : `目標まで あと ${toGoal} kg ✨`}
          </p>

          {/* Progress bar */}
          <div className="mt-3">
            <div className="flex justify-between text-xs text-gray-400 mb-1">
              <span>スタート {startWeight.toFixed(1)} kg</span>
              <span>目標 {goalWeight.toFixed(1)} kg</span>
            </div>
            <div className="h-2 bg-gray-100 rounded-full overflow-hidden">
              <motion.div
                className="h-full rounded-full bg-gradient-to-r from-pink-300 to-purple-400"
                initial={{ width: 0 }}
                animate={{ width: `${progressPct}%` }}
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
            background:
              "linear-gradient(135deg, rgba(255,181,200,0.2), rgba(200,181,255,0.2))",
            boxShadow: "0 8px 32px rgba(200, 181, 255, 0.2)",
          }}
        >
          <div className="flex gap-3 items-start">
            <div className="w-10 h-10 rounded-2xl bg-gradient-to-br from-pink-300 to-purple-300 flex items-center justify-center text-lg shadow-sm flex-shrink-0">
              ✨
            </div>
            <div>
              <p className="text-xs font-semibold text-purple-400 mb-1">
                キラリからのひとこと
              </p>
              <p className="text-sm text-gray-600 leading-relaxed">
                {displayLog.aiComment}
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
            <h3 className="text-sm font-semibold text-gray-600">
              📈 今週の記録
            </h3>
            {weekAvg && (
              <span className="text-xs text-gray-400">
                週平均 {weekAvg} kg
              </span>
            )}
          </div>
          <MiniWeightChart data={weeklyData} />
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
              {todayLog ? "✏️ 今日の記録を更新する" : "📝 今日の体重を記録する"}
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
            {
              label: "連続記録",
              value: String(streak),
              unit: "日",
              emoji: "🔥",
            },
            {
              label: "今月の変化",
              value:
                monthlyChange !== null
                  ? (Number(monthlyChange) > 0 ? "+" : "") + monthlyChange
                  : "--",
              unit: monthlyChange !== null ? "kg" : "記録少",
              emoji: "📉",
            },
            {
              label: "ログ総数",
              value: String(logs.length),
              unit: "回",
              emoji: "💪",
            },
          ].map((stat) => (
            <div key={stat.label} className="glass-card p-3 text-center shadow-sm">
              <div className="text-xl mb-1">{stat.emoji}</div>
              <div className="font-inter text-xl font-bold text-gray-700">
                {stat.value}
                <span className="text-xs text-gray-400 font-normal">
                  {stat.unit}
                </span>
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
            {logs.slice(0, 3).map((log) => (
              <div key={log.id} className="flex items-center gap-3">
                <span className="text-2xl">{log.moodEmoji}</span>
                <div className="flex-1">
                  <div className="flex justify-between items-center">
                    <span className="text-sm font-medium text-gray-600">
                      {log.date.slice(5).replace("-", "/")}
                    </span>
                    <span className="font-inter font-bold text-gray-700">
                      {log.weight}{" "}
                      <span className="text-xs text-gray-400 font-normal">
                        kg
                      </span>
                    </span>
                  </div>
                  {log.memo && (
                    <p className="text-xs text-gray-400 truncate">{log.memo}</p>
                  )}
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
