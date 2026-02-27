"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useRouter } from "next/navigation";
import BottomNav from "@/components/BottomNav";
import { useSettings } from "@/hooks/useSettings";
import { clearAllData } from "@/lib/storage";

export default function SettingsPage() {
  const router = useRouter();
  const { settings, update, isLoaded } = useSettings();

  const [name, setName] = useState("");
  const [goalWeight, setGoalWeight] = useState("");
  const [startWeight, setStartWeight] = useState("");
  const [editingName, setEditingName] = useState(false);
  const [editingGoal, setEditingGoal] = useState(false);
  const [editingStart, setEditingStart] = useState(false);
  const [showResetConfirm, setShowResetConfirm] = useState(false);
  const [saved, setSaved] = useState<string | null>(null);
  const [errors, setErrors] = useState<Record<string, string>>({});

  const showSaved = (field: string) => {
    setSaved(field);
    setTimeout(() => setSaved(null), 2000);
  };

  const saveName = () => {
    if (!name.trim()) {
      setErrors({ name: "ニックネームを入力してください" });
      return;
    }
    update({ name: name.trim() });
    setEditingName(false);
    setErrors({});
    showSaved("name");
  };

  const saveGoal = () => {
    const g = parseFloat(goalWeight);
    if (isNaN(g) || g < 30 || g > 200) {
      setErrors({ goal: "30〜200 kg の範囲で入力してください" });
      return;
    }
    update({ goalWeight: g });
    setEditingGoal(false);
    setErrors({});
    showSaved("goal");
  };

  const saveStart = () => {
    const s = parseFloat(startWeight);
    if (isNaN(s) || s < 30 || s > 200) {
      setErrors({ start: "30〜200 kg の範囲で入力してください" });
      return;
    }
    update({ startWeight: s });
    setEditingStart(false);
    setErrors({});
    showSaved("start");
  };

  const handleReset = () => {
    clearAllData();
    router.replace("/onboarding");
  };

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
        className="px-5 pt-12 pb-4"
      >
        <h1 className="text-2xl font-bold text-gray-700">⚙️ 設定</h1>
        <p className="text-sm text-gray-400 mt-1">プロフィールと目標を管理</p>
      </motion.div>

      <div className="px-5 space-y-4">
        {/* Saved toast */}
        <AnimatePresence>
          {saved && (
            <motion.div
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              className="glass-card px-4 py-3 text-center text-sm font-medium text-green-600 bg-green-50/80"
            >
              ✅ 保存しました！
            </motion.div>
          )}
        </AnimatePresence>

        {/* Profile section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="glass-card p-5 shadow-lg space-y-4"
        >
          <h2 className="text-sm font-semibold text-gray-500">👤 プロフィール</h2>

          {/* Name */}
          <div>
            <label className="text-xs text-gray-400 font-medium">ニックネーム</label>
            {editingName ? (
              <div className="mt-2 space-y-2">
                <input
                  type="text"
                  value={name}
                  onChange={(e) => {
                    setName(e.target.value);
                    setErrors({});
                  }}
                  className="cute-input text-sm"
                  maxLength={20}
                  autoFocus
                />
                {errors.name && (
                  <p className="text-xs text-red-400">{errors.name}</p>
                )}
                <div className="flex gap-2">
                  <button onClick={saveName} className="btn-primary py-2 text-sm flex-1">
                    保存
                  </button>
                  <button
                    onClick={() => {
                      setEditingName(false);
                      setErrors({});
                    }}
                    className="btn-secondary py-2 text-sm flex-1"
                  >
                    キャンセル
                  </button>
                </div>
              </div>
            ) : (
              <div className="flex justify-between items-center mt-2">
                <span className="text-base font-semibold text-gray-700">
                  {settings.name}
                </span>
                <button
                  onClick={() => {
                    setName(settings.name);
                    setEditingName(true);
                  }}
                  className="text-xs text-purple-400 font-medium px-3 py-1.5 rounded-full border border-purple-200"
                >
                  変更
                </button>
              </div>
            )}
          </div>
        </motion.div>

        {/* Goal section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="glass-card p-5 shadow-lg space-y-4"
        >
          <h2 className="text-sm font-semibold text-gray-500">🎯 体重設定</h2>

          {/* Start weight */}
          <div>
            <label className="text-xs text-gray-400 font-medium">スタート体重</label>
            {editingStart ? (
              <div className="mt-2 space-y-2">
                <input
                  type="number"
                  value={startWeight}
                  onChange={(e) => {
                    setStartWeight(e.target.value);
                    setErrors({});
                  }}
                  className="cute-input text-sm"
                  step="0.1"
                  min="30"
                  max="200"
                  autoFocus
                />
                {errors.start && (
                  <p className="text-xs text-red-400">{errors.start}</p>
                )}
                <div className="flex gap-2">
                  <button onClick={saveStart} className="btn-primary py-2 text-sm flex-1">
                    保存
                  </button>
                  <button
                    onClick={() => {
                      setEditingStart(false);
                      setErrors({});
                    }}
                    className="btn-secondary py-2 text-sm flex-1"
                  >
                    キャンセル
                  </button>
                </div>
              </div>
            ) : (
              <div className="flex justify-between items-center mt-2">
                <span className="font-inter text-base font-semibold text-gray-700">
                  {settings.startWeight.toFixed(1)} kg
                </span>
                <button
                  onClick={() => {
                    setStartWeight(settings.startWeight.toFixed(1));
                    setEditingStart(true);
                  }}
                  className="text-xs text-purple-400 font-medium px-3 py-1.5 rounded-full border border-purple-200"
                >
                  変更
                </button>
              </div>
            )}
          </div>

          <div className="border-t border-gray-100" />

          {/* Goal weight */}
          <div>
            <label className="text-xs text-gray-400 font-medium">目標体重</label>
            {editingGoal ? (
              <div className="mt-2 space-y-2">
                <input
                  type="number"
                  value={goalWeight}
                  onChange={(e) => {
                    setGoalWeight(e.target.value);
                    setErrors({});
                  }}
                  className="cute-input text-sm"
                  step="0.1"
                  min="30"
                  max="200"
                  autoFocus
                />
                {errors.goal && (
                  <p className="text-xs text-red-400">{errors.goal}</p>
                )}
                <div className="flex gap-2">
                  <button onClick={saveGoal} className="btn-primary py-2 text-sm flex-1">
                    保存
                  </button>
                  <button
                    onClick={() => {
                      setEditingGoal(false);
                      setErrors({});
                    }}
                    className="btn-secondary py-2 text-sm flex-1"
                  >
                    キャンセル
                  </button>
                </div>
              </div>
            ) : (
              <div className="flex justify-between items-center mt-2">
                <span className="font-inter text-base font-semibold text-gray-700">
                  {settings.goalWeight.toFixed(1)} kg
                </span>
                <button
                  onClick={() => {
                    setGoalWeight(settings.goalWeight.toFixed(1));
                    setEditingGoal(true);
                  }}
                  className="text-xs text-purple-400 font-medium px-3 py-1.5 rounded-full border border-purple-200"
                >
                  変更
                </button>
              </div>
            )}
          </div>
        </motion.div>

        {/* App info */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="glass-card p-5 shadow-lg space-y-3"
        >
          <h2 className="text-sm font-semibold text-gray-500">📋 アプリ情報</h2>
          <div className="space-y-2 text-sm text-gray-500">
            <div className="flex justify-between">
              <span>バージョン</span>
              <span className="font-medium">0.1.0</span>
            </div>
            <div className="flex justify-between items-center">
              <span>プライバシーポリシー</span>
              <a
                href="/privacy"
                className="text-purple-400 font-medium text-xs px-3 py-1.5 rounded-full border border-purple-200"
              >
                確認する
              </a>
            </div>
            <div className="flex justify-between items-center">
              <span>利用規約</span>
              <a
                href="/terms"
                className="text-purple-400 font-medium text-xs px-3 py-1.5 rounded-full border border-purple-200"
              >
                確認する
              </a>
            </div>
          </div>
        </motion.div>

        {/* Danger zone */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
          className="glass-card p-5 shadow-lg"
        >
          <h2 className="text-sm font-semibold text-red-400 mb-3">
            ⚠️ データ管理
          </h2>
          {!showResetConfirm ? (
            <button
              onClick={() => setShowResetConfirm(true)}
              className="w-full py-3 text-sm text-red-400 font-medium border border-red-200 rounded-2xl active:scale-95 transition-transform"
            >
              全データをリセット
            </button>
          ) : (
            <AnimatePresence>
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="space-y-3"
              >
                <p className="text-sm text-gray-600 text-center">
                  全ての記録と設定が削除されます。
                  <br />
                  この操作は元に戻せません。
                </p>
                <div className="flex gap-2">
                  <button
                    onClick={handleReset}
                    className="flex-1 py-3 text-sm text-white bg-red-400 rounded-2xl font-medium active:scale-95 transition-transform"
                  >
                    リセットする
                  </button>
                  <button
                    onClick={() => setShowResetConfirm(false)}
                    className="flex-1 py-3 text-sm text-gray-500 border border-gray-200 rounded-2xl font-medium"
                  >
                    キャンセル
                  </button>
                </div>
              </motion.div>
            </AnimatePresence>
          )}
        </motion.div>
      </div>

      <BottomNav />
    </div>
  );
}
