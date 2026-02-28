"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { useSettings } from "@/hooks/useSettings";

const slideVariants = {
  enter: (dir: number) => ({
    x: dir > 0 ? 300 : -300,
    opacity: 0,
  }),
  center: { x: 0, opacity: 1 },
  exit: (dir: number) => ({
    x: dir > 0 ? -300 : 300,
    opacity: 0,
  }),
};

export default function OnboardingPage() {
  const router = useRouter();
  const { settings, update, isLoaded } = useSettings();

  // Already onboarded → go home
  useEffect(() => {
    if (isLoaded && settings.isOnboarded) {
      router.replace("/");
    }
  }, [isLoaded, settings.isOnboarded, router]);

  const [step, setStep] = useState(0);
  const [dir, setDir] = useState(1);
  const [name, setName] = useState("");
  const [currentWeight, setCurrentWeight] = useState("55.0");
  const [goalWeight, setGoalWeight] = useState("50.0");
  const [agreedToTerms, setAgreedToTerms] = useState(false);
  const [errors, setErrors] = useState<Record<string, string>>({});

  const goNext = () => {
    const errs: Record<string, string> = {};

    if (step === 0 && !name.trim()) {
      errs.name = "ニックネームを入力してください";
    }
    if (step === 1) {
      const w = parseFloat(currentWeight);
      if (isNaN(w) || w < 30 || w > 200)
        errs.currentWeight = "30〜200 kg の範囲で入力してください";
    }
    if (step === 2) {
      const g = parseFloat(goalWeight);
      const c = parseFloat(currentWeight);
      if (isNaN(g) || g < 30 || g > 200)
        errs.goalWeight = "30〜200 kg の範囲で入力してください";
      else if (g >= c)
        errs.goalWeight = "目標体重は現在の体重より少なくしてください";
      if (!agreedToTerms)
        errs.terms = "利用規約とプライバシーポリシーに同意してください";
    }

    if (Object.keys(errs).length > 0) {
      setErrors(errs);
      return;
    }

    setErrors({});
    if (step < 2) {
      setDir(1);
      setStep((s) => s + 1);
    } else {
      // Complete onboarding
      update({
        name: name.trim(),
        startWeight: parseFloat(currentWeight),
        goalWeight: parseFloat(goalWeight),
        isOnboarded: true,
      });
      router.replace("/");
    }
  };

  const goBack = () => {
    setDir(-1);
    setStep((s) => s - 1);
    setErrors({});
  };

  const steps = [
    {
      emoji: "🌸",
      title: "キラリへようこそ！",
      subtitle: "一緒に理想の自分を目指しましょう",
      content: (
        <div className="space-y-4">
          <p className="text-sm text-gray-500 text-center leading-relaxed">
            まず、なんて呼べばいいですか？
          </p>
          <div>
            <input
              type="text"
              value={name}
              onChange={(e) => {
                setName(e.target.value);
                setErrors({});
              }}
              placeholder="ニックネームを入力"
              className="cute-input text-center text-lg"
              maxLength={20}
              autoFocus
            />
            {errors.name && (
              <p className="text-xs text-red-400 text-center mt-2">
                {errors.name}
              </p>
            )}
          </div>
        </div>
      ),
    },
    {
      emoji: "⚖️",
      title: `${name || "あなた"}の今の体重は？`,
      subtitle: "正確な値でなくても大丈夫です",
      content: (
        <div className="space-y-4">
          <div className="flex items-center justify-center gap-4">
            <button
              onClick={() => {
                const w = parseFloat(currentWeight) || 55;
                setCurrentWeight(Math.max(30, w - 0.1).toFixed(1));
                setErrors({});
              }}
              className="w-12 h-12 rounded-full bg-gradient-to-br from-pink-100 to-purple-100 flex items-center justify-center text-2xl font-light text-gray-500 active:scale-95 transition-transform shadow-sm"
            >
              −
            </button>
            <div className="text-center">
              <input
                type="number"
                value={currentWeight}
                onChange={(e) => {
                  setCurrentWeight(e.target.value);
                  setErrors({});
                }}
                className="cute-input text-center text-4xl font-bold w-40"
                step="0.1"
                min="30"
                max="200"
              />
              <p className="text-gray-400 text-sm mt-1">kg</p>
            </div>
            <button
              onClick={() => {
                const w = parseFloat(currentWeight) || 55;
                setCurrentWeight(Math.min(200, w + 0.1).toFixed(1));
                setErrors({});
              }}
              className="w-12 h-12 rounded-full bg-gradient-to-br from-pink-100 to-purple-100 flex items-center justify-center text-2xl font-light text-gray-500 active:scale-95 transition-transform shadow-sm"
            >
              ＋
            </button>
          </div>
          {errors.currentWeight && (
            <p className="text-xs text-red-400 text-center">
              {errors.currentWeight}
            </p>
          )}
        </div>
      ),
    },
    {
      emoji: "🎯",
      title: "目標体重を教えて！",
      subtitle: "無理のない目標でOK。いつでも変更できます",
      content: (
        <div className="space-y-4">
          <div className="flex items-center justify-center gap-4">
            <button
              onClick={() => {
                const g = parseFloat(goalWeight) || 50;
                setGoalWeight(Math.max(30, g - 0.1).toFixed(1));
                setErrors({});
              }}
              className="w-12 h-12 rounded-full bg-gradient-to-br from-pink-100 to-purple-100 flex items-center justify-center text-2xl font-light text-gray-500 active:scale-95 transition-transform shadow-sm"
            >
              −
            </button>
            <div className="text-center">
              <input
                type="number"
                value={goalWeight}
                onChange={(e) => {
                  setGoalWeight(e.target.value);
                  setErrors({});
                }}
                className="cute-input text-center text-4xl font-bold w-40"
                step="0.1"
                min="30"
                max="200"
              />
              <p className="text-gray-400 text-sm mt-1">kg</p>
            </div>
            <button
              onClick={() => {
                const g = parseFloat(goalWeight) || 50;
                setGoalWeight(Math.min(200, g + 0.1).toFixed(1));
                setErrors({});
              }}
              className="w-12 h-12 rounded-full bg-gradient-to-br from-pink-100 to-purple-100 flex items-center justify-center text-2xl font-light text-gray-500 active:scale-95 transition-transform shadow-sm"
            >
              ＋
            </button>
          </div>
          {errors.goalWeight && (
            <p className="text-xs text-red-400 text-center">
              {errors.goalWeight}
            </p>
          )}
          <div className="glass-card p-3 text-center">
            <p className="text-xs text-gray-500">
              目標まで{" "}
              <span className="font-bold text-pink-400">
                {Math.max(
                  0,
                  parseFloat(currentWeight) - parseFloat(goalWeight)
                ).toFixed(1)}{" "}
                kg
              </span>{" "}
              💕
            </p>
          </div>
          <div className="space-y-2">
            <label className="flex items-start gap-3 cursor-pointer">
              <input
                type="checkbox"
                checked={agreedToTerms}
                onChange={(e) => {
                  setAgreedToTerms(e.target.checked);
                  setErrors({});
                }}
                className="mt-0.5 w-5 h-5 accent-pink-400 rounded flex-shrink-0"
              />
              <span className="text-xs text-gray-500 leading-relaxed">
                <Link href="/terms" className="text-purple-400 underline font-medium">利用規約</Link>
                {" "}と{" "}
                <Link href="/privacy" className="text-purple-400 underline font-medium">プライバシーポリシー</Link>
                {" "}に同意します
              </span>
            </label>
            {errors.terms && (
              <p className="text-xs text-red-400 text-center">
                {errors.terms}
              </p>
            )}
          </div>
        </div>
      ),
    },
  ];

  const current = steps[step];

  return (
    <div className="mobile-container min-h-screen flex flex-col">
      {/* Progress dots */}
      <div className="flex justify-center gap-2 pt-16 pb-4">
        {steps.map((_, i) => (
          <div
            key={i}
            className={`h-2 rounded-full transition-all duration-300 ${
              i === step
                ? "w-8 bg-gradient-to-r from-pink-400 to-purple-400"
                : i < step
                ? "w-2 bg-pink-300"
                : "w-2 bg-gray-200"
            }`}
          />
        ))}
      </div>

      {/* Step content */}
      <div className="flex-1 px-5 overflow-hidden">
        <AnimatePresence mode="wait" custom={dir}>
          <motion.div
            key={step}
            custom={dir}
            variants={slideVariants}
            initial="enter"
            animate="center"
            exit="exit"
            transition={{ duration: 0.35, ease: "easeInOut" }}
            className="space-y-8"
          >
            {/* Emoji */}
            <motion.div
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ delay: 0.1, type: "spring", stiffness: 200 }}
              className="text-center text-7xl mt-4"
            >
              {current.emoji}
            </motion.div>

            {/* Title */}
            <div className="text-center">
              <h1 className="text-2xl font-bold text-gray-700 mb-2">
                {current.title}
              </h1>
              <p className="text-sm text-gray-400">{current.subtitle}</p>
            </div>

            {/* Input area */}
            <div className="glass-card p-6 shadow-lg">{current.content}</div>
          </motion.div>
        </AnimatePresence>
      </div>

      {/* Navigation buttons */}
      <div className="px-5 pb-12 pt-6 space-y-3">
        <button onClick={goNext} className="w-full btn-primary text-lg">
          {step === 2 ? "キラリをはじめる 🌸" : "次へ →"}
        </button>
        {step > 0 && (
          <button
            onClick={goBack}
            className="w-full py-3 text-sm text-gray-400 font-medium"
          >
            ← 戻る
          </button>
        )}
      </div>
    </div>
  );
}
