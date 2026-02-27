// Achievement & Challenge system

import { WeightLog } from "./data";

export interface Achievement {
  id: string;
  title: string;
  description: string;
  icon: string;
  condition: (logs: WeightLog[], streak: number) => boolean;
}

export interface Challenge {
  id: string;
  title: string;
  description: string;
  icon: string;
  target: number;
  unit: string;
  getCurrent: (logs: WeightLog[], streak: number) => number;
}

export const ACHIEVEMENTS: Achievement[] = [
  {
    id: "first_log",
    title: "はじめの一歩",
    description: "初めて体重を記録した",
    icon: "🌱",
    condition: (logs) => logs.length >= 1,
  },
  {
    id: "streak_3",
    title: "3日坊主じゃない！",
    description: "3日連続で記録",
    icon: "🔥",
    condition: (_, streak) => streak >= 3,
  },
  {
    id: "streak_7",
    title: "一週間マスター",
    description: "7日連続で記録",
    icon: "⭐",
    condition: (_, streak) => streak >= 7,
  },
  {
    id: "streak_14",
    title: "2週間の習慣",
    description: "14日連続で記録",
    icon: "💎",
    condition: (_, streak) => streak >= 14,
  },
  {
    id: "streak_30",
    title: "30日の軌跡",
    description: "30日連続で記録",
    icon: "👑",
    condition: (_, streak) => streak >= 30,
  },
  {
    id: "logs_10",
    title: "10回記録達成",
    description: "累計10回の記録",
    icon: "📝",
    condition: (logs) => logs.length >= 10,
  },
  {
    id: "logs_50",
    title: "50回の記録！",
    description: "累計50回の記録",
    icon: "🏅",
    condition: (logs) => logs.length >= 50,
  },
  {
    id: "logs_100",
    title: "100回記録の達人",
    description: "累計100回の記録",
    icon: "🏆",
    condition: (logs) => logs.length >= 100,
  },
  {
    id: "mood_great",
    title: "最高の日！",
    description: "「最高！」の気分で記録した",
    icon: "🌟",
    condition: (logs) => logs.some((l) => l.mood === "great"),
  },
  {
    id: "memo_writer",
    title: "日記の達人",
    description: "メモ付きの記録を10回",
    icon: "✍️",
    condition: (logs) => logs.filter((l) => l.memo.length > 0).length >= 10,
  },
  {
    id: "weight_down_1",
    title: "マイナス1kg",
    description: "初回記録から1kg減",
    icon: "🎯",
    condition: (logs) => {
      if (logs.length < 2) return false;
      const first = logs[logs.length - 1].weight;
      const latest = logs[0].weight;
      return first - latest >= 1;
    },
  },
  {
    id: "weight_down_3",
    title: "マイナス3kg",
    description: "初回記録から3kg減",
    icon: "🎪",
    condition: (logs) => {
      if (logs.length < 2) return false;
      const first = logs[logs.length - 1].weight;
      const latest = logs[0].weight;
      return first - latest >= 3;
    },
  },
];

export const WEEKLY_CHALLENGES: Challenge[] = [
  {
    id: "week_log_5",
    title: "今週5回記録しよう",
    description: "今週中に5回記録する",
    icon: "📋",
    target: 5,
    unit: "回",
    getCurrent: (logs) => {
      const now = new Date();
      const weekStart = new Date(now);
      weekStart.setDate(now.getDate() - now.getDay());
      weekStart.setHours(0, 0, 0, 0);
      return logs.filter((l) => new Date(l.date) >= weekStart).length;
    },
  },
  {
    id: "week_memo_3",
    title: "メモを3回書こう",
    description: "今週メモ付き記録3回",
    icon: "💌",
    target: 3,
    unit: "回",
    getCurrent: (logs) => {
      const now = new Date();
      const weekStart = new Date(now);
      weekStart.setDate(now.getDate() - now.getDay());
      weekStart.setHours(0, 0, 0, 0);
      return logs.filter((l) => new Date(l.date) >= weekStart && l.memo.length > 0).length;
    },
  },
  {
    id: "week_happy",
    title: "ポジティブな一週間",
    description: "今週「いい感じ」以上を3回",
    icon: "😊",
    target: 3,
    unit: "回",
    getCurrent: (logs) => {
      const now = new Date();
      const weekStart = new Date(now);
      weekStart.setDate(now.getDate() - now.getDay());
      weekStart.setHours(0, 0, 0, 0);
      return logs.filter(
        (l) => new Date(l.date) >= weekStart && (l.mood === "great" || l.mood === "good")
      ).length;
    },
  },
];

export function getUnlockedAchievements(logs: WeightLog[], streak: number): string[] {
  return ACHIEVEMENTS.filter((a) => a.condition(logs, streak)).map((a) => a.id);
}

// Health tips that rotate daily
export const DAILY_TIPS = [
  { title: "水分補給", tip: "1日1.5〜2リットルの水を飲むと代謝がアップします", icon: "💧" },
  { title: "睡眠の質", tip: "7〜8時間の睡眠は体重管理にとても重要です", icon: "😴" },
  { title: "食事のコツ", tip: "よく噛んで食べると満腹感が得られやすくなります", icon: "🥗" },
  { title: "運動習慣", tip: "1日20分の散歩でも十分な運動効果があります", icon: "🚶" },
  { title: "ストレス管理", tip: "深呼吸やストレッチでリラックスしましょう", icon: "🧘" },
  { title: "朝の習慣", tip: "起きたらコップ1杯の水を飲むと体が目覚めます", icon: "🌅" },
  { title: "間食のコツ", tip: "ナッツやフルーツなど栄養のあるおやつを選びましょう", icon: "🥜" },
  { title: "体重計のタイミング", tip: "毎日同じ時間に測ると変化がわかりやすいです", icon: "⏰" },
  { title: "野菜ファースト", tip: "食事の最初に野菜を食べると血糖値の急上昇を防げます", icon: "🥬" },
  { title: "お風呂タイム", tip: "ぬるめのお風呂にゆっくり浸かると代謝がアップ", icon: "🛁" },
  { title: "階段を使おう", tip: "エレベーターの代わりに階段を使うだけで運動になります", icon: "🪜" },
  { title: "姿勢を正す", tip: "良い姿勢をキープするだけでも筋肉を使います", icon: "🧍" },
  { title: "食べる順番", tip: "野菜→たんぱく質→炭水化物の順で食べましょう", icon: "🍽️" },
  { title: "休息も大切", tip: "休息日を設けることで体がしっかり回復します", icon: "🌿" },
];

export function getTodayTip() {
  const dayOfYear = Math.floor(
    (Date.now() - new Date(new Date().getFullYear(), 0, 0).getTime()) / (1000 * 60 * 60 * 24)
  );
  return DAILY_TIPS[dayOfYear % DAILY_TIPS.length];
}
