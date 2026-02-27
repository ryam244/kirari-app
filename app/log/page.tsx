"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useRouter } from "next/navigation";
import BottomNav from "@/components/BottomNav";
import { MOODS, WeightLog } from "@/lib/data";
import { useWeightLogs, todayStr } from "@/hooks/useWeightLogs";
import { useSettings } from "@/hooks/useSettings";
import { generateAIComment } from "@/lib/aiComments";

const fadeUp = {
  hidden: { opacity: 0, y: 30 },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: { delay: i * 0.08, duration: 0.45, ease: "easeOut" as const },
  }),
};

export default function LogPage() {
  const router = useRouter();
  const { logs, todayLog, addLog, isLoaded } = useWeightLogs();
  const { settings } = useSettings();

  const [weight, setWeight] = useState("52.0");
  const [selectedMood, setSelectedMood] = useState("good");
  const [memo, setMemo] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [aiComment, setAiComment] = useState<string | null>(null);
  const [submitted, setSubmitted] = useState(false);
  const [weightError, setWeightError] = useState("");

  // Pre-fill weight from last log or settings
  useEffect(() => {
    if (isLoaded) {
      const last =
        todayLog?.weight ?? logs[0]?.weight ?? settings.startWeight ?? 55;
      setWeight(last.toFixed(1));
      if (todayLog) {
        setSelectedMood(todayLog.mood);
        setMemo(todayLog.memo);
      }
    }
  }, [isLoaded, todayLog, logs, settings.startWeight]);

  const handleWeightChange = (delta: number) => {
    const current = parseFloat(weight) || 50;
    const next = Math.min(200, Math.max(30, current + delta));
    setWeight(next.toFixed(1));
    setWeightError("");
  };

  const handleWeightInput = (val: string) => {
    setWeight(val);
    setWeightError("");
  };

  const validate = (): boolean => {
    const w = parseFloat(weight);
    if (isNaN(w)) {
      setWeightError("正しい数値を入力してください");
      return false;
    }
    if (w < 30 || w > 200) {
      setWeightError("30〜200 kg の範囲で入力してください");
      return false;
    }
    return true;
  };

  const handleSubmit = async () => {
    if (!validate()) return;
    setIsLoading(true);

    // Small artificial delay for UX (feels like AI is thinking)
    await new Promise((r) => setTimeout(r, 800));

    const comment = generateAIComment(selectedMood);
    setAiComment(comment);

    const mood = MOODS.find((m) => m.key === selectedMood);
    const newLog: WeightLog = {
      id: todayLog?.id ?? Date.now().toString(),
      date: todayStr(),
      weight: parseFloat(parseFloat(weight).toFixed(1)),
      mood: selectedMood,
      moodEmoji: mood?.emoji ?? "😊",
      memo,
      aiComment: comment,
    };

    addLog(newLog);
    setIsLoading(false);
    setSubmitted(true);
  };

  // Dynamic date
  const now = new Date();
  const dayNames = ["日", "月", "火", "水", "木", "金", "土"];
  const dateStr = `${now.getFullYear()}年${now.getMonth() + 1}月${now.getDate()}日 ${dayNames[now.getDay()]}曜日`;

  const currentMood = MOODS.find((m) => m.key === selectedMood);

  if (submitted && aiComment) {
    return (
      <div className="mobile-container pb-28">
        <div className="px-5 pt-12 pb-4">
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5 }}
            className="text-center"
          >
            <motion.div
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ delay: 0.2, type: "spring", stiffness: 200 }}
              className="text-7xl mb-4"
            >
              🌸
            </motion.div>
            <h2 className="text-2xl font-bold text-gray-700 mb-1">
              {todayLog ? "更新完了！" : "記録完了！"}
            </h2>
            <p className="text-gray-400 text-sm">今日も頑張りました✨</p>
          </motion.div>
        </div>

        <div className="px-5 space-y-4">
          {/* Summary card */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3, duration: 0.5 }}
            className="glass-card p-5 shadow-lg"
          >
            <h3 className="text-sm font-semibold text-gray-500 mb-3">
              今日の記録
            </h3>
            <div className="flex items-center gap-4">
              <span className="text-4xl">{currentMood?.emoji}</span>
              <div>
                <div className="font-inter text-4xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-pink-400 to-purple-500">
                  {weight}{" "}
                  <span className="text-gray-400 text-lg font-normal">kg</span>
                </div>
                <p className="text-sm text-gray-400">{currentMood?.label}</p>
              </div>
            </div>
            {memo && (
              <p className="mt-3 text-sm text-gray-500 bg-pink-50 rounded-xl px-3 py-2">
                💭 {memo}
              </p>
            )}
          </motion.div>

          {/* AI comment */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5, duration: 0.5 }}
            className="glass-card p-5 shadow-lg"
            style={{
              background:
                "linear-gradient(135deg, rgba(255,181,200,0.25), rgba(200,181,255,0.25))",
            }}
          >
            <div className="flex gap-3 items-start">
              <div className="w-10 h-10 rounded-2xl bg-gradient-to-br from-pink-300 to-purple-300 flex items-center justify-center text-lg flex-shrink-0 shadow-sm">
                ✨
              </div>
              <div>
                <p className="text-xs font-semibold text-purple-400 mb-2">
                  キラリからのメッセージ💕
                </p>
                <p className="text-sm text-gray-600 leading-relaxed">
                  {aiComment}
                </p>
              </div>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.7 }}
            className="grid grid-cols-2 gap-3"
          >
            <button
              onClick={() => {
                setSubmitted(false);
                setAiComment(null);
              }}
              className="btn-secondary py-3"
            >
              修正する
            </button>
            <button onClick={() => router.push("/")} className="btn-primary py-3">
              ホームへ 🏠
            </button>
          </motion.div>
        </div>

        <BottomNav />
      </div>
    );
  }

  return (
    <div className="mobile-container pb-28">
      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="px-5 pt-12 pb-4"
      >
        <h1 className="text-2xl font-bold text-gray-700">
          {todayLog ? "✏️ 記録を更新" : "📝 今日の記録"}
        </h1>
        <p className="text-sm text-gray-400 mt-1">{dateStr}</p>
      </motion.div>

      <div className="px-5 space-y-4">
        {/* Weight input */}
        <motion.div
          custom={0}
          variants={fadeUp}
          initial="hidden"
          animate="visible"
          className="glass-card p-6 shadow-lg"
        >
          <h3 className="text-sm font-semibold text-gray-500 mb-4">
            ⚖️ 今日の体重
          </h3>
          <div className="flex items-center justify-center gap-4">
            <button
              onClick={() => handleWeightChange(-0.1)}
              className="w-12 h-12 rounded-full bg-gradient-to-br from-pink-100 to-purple-100 flex items-center justify-center text-2xl font-light text-gray-500 active:scale-95 transition-transform shadow-sm"
            >
              −
            </button>
            <div className="text-center">
              <input
                type="number"
                value={weight}
                onChange={(e) => handleWeightInput(e.target.value)}
                className={`cute-input text-center text-4xl font-bold w-40 ${
                  weightError ? "border-red-300 focus:ring-red-200" : ""
                }`}
                step="0.1"
                min="30"
                max="200"
              />
              <p className="text-gray-400 text-sm mt-1">kg</p>
              {weightError && (
                <p className="text-xs text-red-400 mt-1">{weightError}</p>
              )}
            </div>
            <button
              onClick={() => handleWeightChange(0.1)}
              className="w-12 h-12 rounded-full bg-gradient-to-br from-pink-100 to-purple-100 flex items-center justify-center text-2xl font-light text-gray-500 active:scale-95 transition-transform shadow-sm"
            >
              ＋
            </button>
          </div>
        </motion.div>

        {/* Mood selector */}
        <motion.div
          custom={1}
          variants={fadeUp}
          initial="hidden"
          animate="visible"
          className="glass-card p-5 shadow-lg"
        >
          <h3 className="text-sm font-semibold text-gray-500 mb-4">
            💭 今日の気分は？
          </h3>
          <div className="grid grid-cols-5 gap-2">
            {MOODS.map((mood) => (
              <button
                key={mood.key}
                onClick={() => setSelectedMood(mood.key)}
                className={`flex flex-col items-center gap-1 p-2 rounded-2xl transition-all duration-300 ${
                  selectedMood === mood.key
                    ? "bg-gradient-to-b from-pink-100 to-purple-100 shadow-md scale-105"
                    : "hover:bg-gray-50"
                }`}
              >
                <span className="text-3xl">{mood.emoji}</span>
                <span
                  className={`text-xs font-medium ${
                    selectedMood === mood.key
                      ? "text-purple-400"
                      : "text-gray-400"
                  }`}
                >
                  {mood.label}
                </span>
              </button>
            ))}
          </div>
        </motion.div>

        {/* Memo input */}
        <motion.div
          custom={2}
          variants={fadeUp}
          initial="hidden"
          animate="visible"
          className="glass-card p-5 shadow-lg"
        >
          <h3 className="text-sm font-semibold text-gray-500 mb-3">
            💌 今日のひとこと（任意）
          </h3>
          <textarea
            value={memo}
            onChange={(e) => setMemo(e.target.value)}
            placeholder="例：今日はジムに行けた！野菜を意識した食事ができた✨"
            className="cute-input resize-none text-sm font-normal"
            rows={3}
            style={{ fontFamily: "'Noto Sans JP', sans-serif", fontSize: "14px" }}
            maxLength={200}
          />
          <p className="text-xs text-gray-300 text-right mt-1">
            {memo.length}/200
          </p>
        </motion.div>

        {/* Quick memo chips */}
        <motion.div
          custom={3}
          variants={fadeUp}
          initial="hidden"
          animate="visible"
          className="flex gap-2 flex-wrap"
        >
          {[
            "🏃 運動した",
            "🥗 野菜多め",
            "💧 水分補給◎",
            "😴 よく眠れた",
            "🍕 食べすぎた",
          ].map((chip) => (
            <button
              key={chip}
              onClick={() =>
                setMemo((prev) => (prev ? `${prev} ${chip}` : chip))
              }
              className="px-3 py-1.5 bg-white rounded-full text-xs text-gray-500 border border-gray-100 shadow-sm active:scale-95 transition-transform"
            >
              {chip}
            </button>
          ))}
        </motion.div>

        {/* Submit button */}
        <motion.div
          custom={4}
          variants={fadeUp}
          initial="hidden"
          animate="visible"
        >
          <button
            onClick={handleSubmit}
            disabled={!weight || isLoading}
            className="w-full btn-primary text-lg relative overflow-hidden disabled:opacity-60"
          >
            <AnimatePresence mode="wait">
              {isLoading ? (
                <motion.div
                  key="loading"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  className="flex items-center justify-center gap-2"
                >
                  <motion.span
                    animate={{ rotate: 360 }}
                    transition={{ repeat: Infinity, duration: 1, ease: "linear" }}
                    className="inline-block"
                  >
                    ✨
                  </motion.span>
                  <span>キラリが考え中...</span>
                </motion.div>
              ) : (
                <motion.span
                  key="text"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                >
                  記録してコメントをもらう 🌸
                </motion.span>
              )}
            </AnimatePresence>
          </button>
        </motion.div>

        <motion.p
          custom={5}
          variants={fadeUp}
          initial="hidden"
          animate="visible"
          className="text-center text-xs text-gray-400 pb-2"
        >
          💡 記録するとキラリが優しくコメントしてくれます
        </motion.p>
      </div>

      <BottomNav />
    </div>
  );
}
