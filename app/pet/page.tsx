"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import BottomNav from "@/components/BottomNav";
import PetAvatar from "@/components/PetAvatar";
import { usePet } from "@/hooks/usePet";
import { useWeightLogs } from "@/hooks/useWeightLogs";
import {
  PET_STAGES,
  getStageInfo,
  getNextStageInfo,
  xpForLevel,
} from "@/lib/pet";
import {
  ACHIEVEMENTS,
  WEEKLY_CHALLENGES,
  DAILY_TIPS,
  getUnlockedAchievements,
  getTodayTip,
} from "@/lib/achievements";

const fadeUp = {
  hidden: { opacity: 0, y: 30 },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: { delay: i * 0.1, duration: 0.5, ease: "easeOut" as const },
  }),
};

type Tab = "pet" | "achievements" | "tips";

export default function PetPage() {
  const { pet, isLoaded: petLoaded } = usePet();
  const { logs, streak, isLoaded: logsLoaded } = useWeightLogs();
  const [activeTab, setActiveTab] = useState<Tab>("pet");

  if (!petLoaded || !logsLoaded || !pet) {
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

  const stageInfo = getStageInfo(pet.stage);
  const nextStage = getNextStageInfo(pet.level);
  const xpNeeded = xpForLevel(pet.level);
  const xpPct = Math.min(100, (pet.xp / xpNeeded) * 100);

  const unlockedIds = getUnlockedAchievements(logs, streak);
  const todayTip = getTodayTip();

  const tabs: { key: Tab; label: string }[] = [
    { key: "pet", label: "ペット" },
    { key: "achievements", label: "実績" },
    { key: "tips", label: "Tips" },
  ];

  return (
    <div className="mobile-container">
      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="px-5 page-top pb-2"
      >
        <h1 className="text-2xl font-bold text-gray-700">
          {pet.name}の部屋
        </h1>
        <p className="text-sm text-gray-400 mt-1">
          毎日の記録で{pet.name}が成長するよ
        </p>
      </motion.div>

      {/* Tab bar */}
      <div className="px-5 mt-3 mb-4">
        <div className="flex bg-white/60 rounded-2xl p-1">
          {tabs.map((tab) => (
            <button
              key={tab.key}
              onClick={() => setActiveTab(tab.key)}
              className={`flex-1 py-2 rounded-xl text-sm font-medium transition-all duration-300 ${
                activeTab === tab.key
                  ? "bg-gradient-to-r from-pink-100 to-purple-100 text-purple-500 shadow-sm"
                  : "text-gray-400"
              }`}
            >
              {tab.label}
            </button>
          ))}
        </div>
      </div>

      <AnimatePresence mode="wait">
        {activeTab === "pet" && (
          <motion.div
            key="pet"
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: 20 }}
            className="px-5 space-y-4"
          >
            {/* Pet display */}
            <motion.div
              custom={0}
              variants={fadeUp}
              initial="hidden"
              animate="visible"
              className="glass-card p-6 shadow-lg text-center"
              style={{ boxShadow: "0 8px 32px rgba(200, 181, 255, 0.25)" }}
            >
              <div className="flex justify-center mb-3">
                <PetAvatar stage={pet.stage} happiness={pet.happiness} size="lg" />
              </div>
              <h2 className="text-xl font-bold text-gray-700">{pet.name}</h2>
              <p className="text-sm text-purple-400 font-medium mt-1">
                {stageInfo.name} ・ Lv.{pet.level}
              </p>
              <p className="text-xs text-gray-400 mt-1">{stageInfo.description}</p>
            </motion.div>

            {/* XP bar */}
            <motion.div
              custom={1}
              variants={fadeUp}
              initial="hidden"
              animate="visible"
              className="glass-card p-4 shadow-sm"
            >
              <div className="flex justify-between items-center mb-2">
                <span className="text-xs font-medium text-gray-500">
                  EXP {pet.xp} / {xpNeeded}
                </span>
                <span className="text-xs text-gray-400">Lv.{pet.level}</span>
              </div>
              <div className="h-3 bg-gray-100 rounded-full overflow-hidden">
                <motion.div
                  className="h-full rounded-full bg-gradient-to-r from-pink-300 via-purple-300 to-blue-300"
                  initial={{ width: 0 }}
                  animate={{ width: `${xpPct}%` }}
                  transition={{ delay: 0.3, duration: 0.8, ease: "easeOut" }}
                />
              </div>
              {nextStage && (
                <p className="text-xs text-gray-400 mt-2 text-center">
                  次の進化「{nextStage.name}」まで Lv.{nextStage.minLevel}
                </p>
              )}
            </motion.div>

            {/* Pet stats */}
            <motion.div
              custom={2}
              variants={fadeUp}
              initial="hidden"
              animate="visible"
              className="grid grid-cols-3 gap-3"
            >
              <div className="glass-card p-3 text-center shadow-sm">
                <div className="text-lg mb-0.5">
                  {pet.happiness >= 70 ? "😊" : pet.happiness >= 40 ? "😐" : "😢"}
                </div>
                <div className="font-inter text-lg font-bold text-gray-700">
                  {pet.happiness}<span className="text-xs text-gray-400 font-normal">%</span>
                </div>
                <div className="text-[10px] text-gray-400">きもち</div>
              </div>
              <div className="glass-card p-3 text-center shadow-sm">
                <div className="text-lg mb-0.5">🍎</div>
                <div className="font-inter text-lg font-bold text-gray-700">
                  {pet.totalFeeds}<span className="text-xs text-gray-400 font-normal">回</span>
                </div>
                <div className="text-[10px] text-gray-400">ごはん</div>
              </div>
              <div className="glass-card p-3 text-center shadow-sm">
                <div className="text-lg mb-0.5">📅</div>
                <div className="font-inter text-lg font-bold text-gray-700">
                  {streak}<span className="text-xs text-gray-400 font-normal">日</span>
                </div>
                <div className="text-[10px] text-gray-400">連続記録</div>
              </div>
            </motion.div>

            {/* Evolution roadmap */}
            <motion.div
              custom={3}
              variants={fadeUp}
              initial="hidden"
              animate="visible"
              className="glass-card p-5 shadow-lg"
            >
              <h3 className="text-sm font-semibold text-gray-600 mb-3">
                進化のみちのり
              </h3>
              <div className="space-y-2">
                {PET_STAGES.map((s) => {
                  const isCurrentOrPast = pet.level >= s.minLevel;
                  const isCurrent = pet.stage === s.stage;
                  return (
                    <div
                      key={s.stage}
                      className={`flex items-center gap-3 p-2 rounded-xl transition-all ${
                        isCurrent
                          ? "bg-gradient-to-r from-pink-50 to-purple-50 border border-purple-100"
                          : ""
                      }`}
                    >
                      <div
                        className={`w-8 h-8 rounded-full flex items-center justify-center text-xs font-bold ${
                          isCurrentOrPast
                            ? "bg-gradient-to-br from-pink-300 to-purple-300 text-white"
                            : "bg-gray-100 text-gray-300"
                        }`}
                      >
                        {s.minLevel}
                      </div>
                      <div className="flex-1">
                        <p
                          className={`text-sm font-medium ${
                            isCurrentOrPast ? "text-gray-700" : "text-gray-300"
                          }`}
                        >
                          {s.name}
                          {isCurrent && (
                            <span className="ml-2 text-xs text-purple-400 font-normal">← いまここ</span>
                          )}
                        </p>
                        <p className={`text-xs ${isCurrentOrPast ? "text-gray-400" : "text-gray-300"}`}>
                          {s.description}
                        </p>
                      </div>
                    </div>
                  );
                })}
              </div>
            </motion.div>

            {/* Weekly challenges */}
            <motion.div
              custom={4}
              variants={fadeUp}
              initial="hidden"
              animate="visible"
              className="glass-card p-5 shadow-lg"
            >
              <h3 className="text-sm font-semibold text-gray-600 mb-3">
                今週のチャレンジ
              </h3>
              <div className="space-y-3">
                {WEEKLY_CHALLENGES.map((ch) => {
                  const current = ch.getCurrent(logs, streak);
                  const pct = Math.min(100, (current / ch.target) * 100);
                  const done = current >= ch.target;
                  return (
                    <div key={ch.id} className="space-y-1">
                      <div className="flex justify-between items-center">
                        <span className="text-sm text-gray-600">
                          {ch.icon} {ch.title}
                        </span>
                        <span className={`text-xs font-medium ${done ? "text-green-500" : "text-gray-400"}`}>
                          {done ? "達成！" : `${current}/${ch.target}${ch.unit}`}
                        </span>
                      </div>
                      <div className="h-2 bg-gray-100 rounded-full overflow-hidden">
                        <div
                          className={`h-full rounded-full transition-all duration-500 ${
                            done
                              ? "bg-gradient-to-r from-green-300 to-emerald-400"
                              : "bg-gradient-to-r from-pink-300 to-purple-300"
                          }`}
                          style={{ width: `${pct}%` }}
                        />
                      </div>
                    </div>
                  );
                })}
              </div>
            </motion.div>
          </motion.div>
        )}

        {activeTab === "achievements" && (
          <motion.div
            key="achievements"
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -20 }}
            className="px-5 space-y-3"
          >
            <p className="text-sm text-gray-400 mb-1">
              {unlockedIds.length} / {ACHIEVEMENTS.length} 解放済み
            </p>
            {ACHIEVEMENTS.map((a) => {
              const unlocked = unlockedIds.includes(a.id);
              return (
                <motion.div
                  key={a.id}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className={`glass-card p-4 shadow-sm flex items-center gap-3 ${
                    unlocked ? "" : "opacity-40"
                  }`}
                >
                  <div
                    className={`w-12 h-12 rounded-2xl flex items-center justify-center text-2xl ${
                      unlocked
                        ? "bg-gradient-to-br from-pink-100 to-purple-100"
                        : "bg-gray-100"
                    }`}
                  >
                    {unlocked ? a.icon : "🔒"}
                  </div>
                  <div className="flex-1">
                    <p className={`text-sm font-semibold ${unlocked ? "text-gray-700" : "text-gray-400"}`}>
                      {a.title}
                    </p>
                    <p className="text-xs text-gray-400">{a.description}</p>
                  </div>
                  {unlocked && (
                    <span className="text-xs text-green-500 font-medium">達成</span>
                  )}
                </motion.div>
              );
            })}
          </motion.div>
        )}

        {activeTab === "tips" && (
          <motion.div
            key="tips"
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -20 }}
            className="px-5 space-y-4"
          >
            {/* Today's tip */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="glass-card p-5 shadow-lg"
              style={{
                background: "linear-gradient(135deg, rgba(255,181,200,0.2), rgba(200,181,255,0.2))",
              }}
            >
              <h3 className="text-sm font-semibold text-purple-400 mb-2">
                今日のTip
              </h3>
              <div className="flex gap-3 items-start">
                <span className="text-3xl">{todayTip.icon}</span>
                <div>
                  <p className="text-sm font-semibold text-gray-700">
                    {todayTip.title}
                  </p>
                  <p className="text-sm text-gray-500 mt-1 leading-relaxed">
                    {todayTip.tip}
                  </p>
                </div>
              </div>
            </motion.div>

            {/* All tips carousel */}
            <h3 className="text-sm font-semibold text-gray-600 px-1">
              ヘルスTips一覧
            </h3>
            {DAILY_TIPS.map((t, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.05 }}
                className="glass-card p-4 shadow-sm flex gap-3 items-start"
              >
                <span className="text-2xl">{t.icon}</span>
                <div>
                  <p className="text-sm font-medium text-gray-700">{t.title}</p>
                  <p className="text-xs text-gray-400 mt-0.5">{t.tip}</p>
                </div>
              </motion.div>
            ))}
          </motion.div>
        )}
      </AnimatePresence>

      <div className="nav-spacer" />
      <BottomNav />
    </div>
  );
}
