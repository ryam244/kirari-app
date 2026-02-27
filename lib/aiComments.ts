// Context-aware AI comment generation (offline / no API key required)
// Uses weight history, streaks, mood, and memo for personalized comments

import { WeightLog } from "./data";

interface CommentContext {
  mood: string;
  weight: number;
  memo: string;
  prevWeight: number | null;
  streak: number;
  totalLogs: number;
  goalWeight: number;
  startWeight: number;
  name: string;
}

// Template-based "LLM-like" comment engine that creates contextual, unique comments
export function generateAIComment(mood: string, context?: Partial<CommentContext>): string {
  // If no context provided, fall back to simple mood-based comments
  if (!context || !context.weight) {
    return simpleMoodComment(mood);
  }

  const parts: string[] = [];
  const { weight, prevWeight, streak, totalLogs, goalWeight, startWeight, memo, name } = {
    weight: 0,
    prevWeight: null as number | null,
    streak: 0,
    totalLogs: 0,
    goalWeight: 50,
    startWeight: 55,
    memo: "",
    name: "",
    ...context,
  };

  const diff = prevWeight !== null ? weight - prevWeight : null;
  const toGoal = weight - goalWeight;
  const fromStart = startWeight - weight;
  const displayName = name || "あなた";

  // Opening based on mood
  parts.push(moodOpening(mood, displayName));

  // Weight change commentary
  if (diff !== null) {
    if (diff < -0.3) {
      parts.push(pick([
        `前回から${Math.abs(diff).toFixed(1)}kg減っています！順調ですね`,
        `${Math.abs(diff).toFixed(1)}kg減！素晴らしい変化です`,
        `しっかり${Math.abs(diff).toFixed(1)}kg落ちてます。努力の成果ですね`,
      ]));
    } else if (diff > 0.3) {
      parts.push(pick([
        `${diff.toFixed(1)}kg増えましたが、気にしすぎないで大丈夫`,
        "少し増えましたが、体重は日々変動するもの。大丈夫です",
        "増えた分はきっとすぐに戻りますよ。焦らずいきましょう",
      ]));
    } else {
      parts.push(pick([
        "体重が安定していますね。良いペースです",
        "ほぼ変わらず安定しています。着実に管理できていますね",
        "安定した体重管理ができていて素晴らしい",
      ]));
    }
  }

  // Streak encouragement
  if (streak >= 30) {
    parts.push(pick([
      `🔥 ${streak}日連続記録！もはやプロ級です`,
      `${streak}日連続はすごい！習慣の力を感じます`,
    ]));
  } else if (streak >= 14) {
    parts.push(pick([
      `${streak}日連続記録中！もう立派な習慣ですね✨`,
      `${streak}日も続けていて本当にすごい！`,
    ]));
  } else if (streak >= 7) {
    parts.push(pick([
      `${streak}日連続！一週間超えましたね🌟`,
      `${streak}日連続記録。この調子で続けましょう`,
    ]));
  } else if (streak >= 3) {
    parts.push(pick([
      `${streak}日連続で記録中！いいリズムです`,
      "連続記録が伸びてきましたね！",
    ]));
  }

  // Goal progress
  if (toGoal <= 0) {
    parts.push("🎉 目標体重を達成しています！おめでとう！");
  } else if (toGoal < 1) {
    parts.push(pick([
      `目標まであと${toGoal.toFixed(1)}kg！もう少しです`,
      "ゴールが見えてきました！ラストスパート",
    ]));
  } else if (fromStart > 2) {
    parts.push(pick([
      `スタートから${fromStart.toFixed(1)}kg減。確実に前進しています`,
      `${fromStart.toFixed(1)}kgの成果、自分を褒めてあげてください`,
    ]));
  }

  // Memo-based response
  if (memo) {
    const memoLower = memo.toLowerCase();
    if (memoLower.includes("運動") || memoLower.includes("ジム") || memoLower.includes("ウォーキング") || memoLower.includes("散歩")) {
      parts.push(pick([
        "体を動かせたんですね！最高です💪",
        "運動できた日は体も心もスッキリしますよね",
      ]));
    } else if (memoLower.includes("野菜") || memoLower.includes("サラダ") || memoLower.includes("ヘルシー")) {
      parts.push(pick([
        "食事の意識が高くて素晴らしい🥗",
        "ヘルシーな食事、体が喜んでいますよ",
      ]));
    } else if (memoLower.includes("食べ") || memoLower.includes("お菓子") || memoLower.includes("スイーツ")) {
      parts.push(pick([
        "美味しいものを楽しむことも大切ですよ😊",
        "食べることは人生の楽しみ。バランスが大事です",
      ]));
    } else if (memoLower.includes("ストレス") || memoLower.includes("つらい") || memoLower.includes("しんどい")) {
      parts.push(pick([
        "大変な時に記録してくれてありがとう。無理しないでね",
        "しんどい時こそ、自分を労わってあげてください",
      ]));
    } else if (memoLower.includes("眠") || memoLower.includes("睡眠") || memoLower.includes("寝")) {
      parts.push(pick([
        "良い睡眠は体重管理の味方です🌙",
        "しっかり休むことも大切な健康管理ですよ",
      ]));
    }
  }

  // Milestone
  if (totalLogs === 1) {
    parts.push("記念すべき最初の記録！ここから一緒に頑張りましょう🌸");
  } else if (totalLogs === 10) {
    parts.push("🎉 10回目の記録！着実に習慣になっていますね");
  } else if (totalLogs === 50) {
    parts.push("🏅 50回目の記録おめでとう！すごい継続力です");
  } else if (totalLogs === 100) {
    parts.push("🏆 100回記録達成！あなたは本当にすごい人です");
  }

  // Closing
  parts.push(moodClosing(mood));

  return parts.join("。") + "💕";
}

function moodOpening(mood: string, name: string): string {
  switch (mood) {
    case "great":
      return pick([
        `${name}さん、最高の調子ですね！🌟`,
        `今日のキラキラ感、伝わってきます✨`,
        `素晴らしい一日ですね！`,
      ]);
    case "good":
      return pick([
        `${name}さん、いい感じですね🌸`,
        `いい調子！今日も素敵な一日`,
        `いい気分で記録できましたね😊`,
      ]);
    case "normal":
      return pick([
        `${name}さん、お疲れ様です😊`,
        `今日も記録してくれてありがとう`,
        `穏やかな一日ですね🌷`,
      ]);
    case "tired":
      return pick([
        `${name}さん、お疲れ様😴`,
        `疲れている中、記録してくれてありがとう`,
        `今日はゆっくり休んでくださいね🌙`,
      ]);
    case "bad":
      return pick([
        `${name}さん、大丈夫ですか？`,
        `しんどい中、記録してくれてありがとう`,
        `辛い日も、あなたの頑張りは見えています`,
      ]);
    default:
      return `${name}さん、今日も記録ありがとう`;
  }
}

function moodClosing(mood: string): string {
  switch (mood) {
    case "great":
    case "good":
      return pick([
        "この調子で一緒に頑張りましょう",
        "明日もキラリは応援しています",
        "キラリもとっても嬉しいです",
      ]);
    case "normal":
      return pick([
        "ゆっくり、自分のペースで続けましょう",
        "毎日の積み重ねが一番大切です",
        "キラリはいつもそばにいます",
      ]);
    case "tired":
    case "bad":
      return pick([
        "しっかり休んで、また明日",
        "無理せず、自分を大切に",
        "キラリはいつも味方です",
      ]);
    default:
      return "キラリはいつも応援しています";
  }
}

function simpleMoodComment(mood: string): string {
  const pool = MOOD_COMMENTS[mood] ?? FALLBACK;
  return pool[Math.floor(Math.random() * pool.length)];
}

function pick(arr: string[]): string {
  return arr[Math.floor(Math.random() * arr.length)];
}

const MOOD_COMMENTS: Record<string, string[]> = {
  great: [
    "最高の一日ですね！🌟 その輝きが体重にも現れています。この調子でどんどん素敵になっていきましょう💕",
    "気分も体重も絶好調！🌸 あなたの努力が実を結んでいます。今日の自分を誇りに思ってください✨",
    "最高の気分で記録できたこと、それだけで今日は大成功🌟 あなたのことが誇らしいです💕",
  ],
  good: [
    "いい感じですね！🌸 コツコツ続けることが一番大切。あなたは着実に前進しています✨",
    "順調です！😊 この調子を保ちましょう。小さな積み重ねが大きな変化を生みます💕",
    "いい感じの一日！🌷 体も心も整ってきていますね。この習慣、本当に素晴らしいです✨",
  ],
  normal: [
    "ふつうの日も、記録することが大事！😊 毎日続けているあなたはすごい。その積み重ねが宝物です🌸",
    "平穏な一日もOK✨ 全ての日が特別じゃなくていいんです。記録してくれてありがとう💕",
    "今日もちゃんと向き合えましたね😊 キラリはいつも応援しています🌸",
  ],
  tired: [
    "お疲れ様です😴 疲れていても記録してくれてありがとう。今夜はしっかり休んでくださいね🌙",
    "ゆっくり休んで、また明日元気に！キラリはいつも一緒です💕",
    "疲れた日でも記録できた、それだけで花丸！🌸 無理せず続けましょうね😊",
  ],
  bad: [
    "しんどい日もある。でも今日も記録してくれたこと、すごく嬉しい。自分に優しくしてあげてね🌸",
    "大丈夫、しんどい日は誰にでもあります💕 キラリはそばにいます🌙",
    "辛い時こそ、自分を責めないで😊 あなたの頑張りはちゃんと見えています✨",
  ],
};

const FALLBACK: string[] = [
  "今日も記録できました！🌸 その小さな一歩が、未来の自分への大きな贈り物。キラリはいつも一緒です💕",
  "素晴らしい！毎日続けることが一番大切✨ あなたは着実に前進しています🌸",
  "今日の記録ありがとう😊 自分の体と向き合う時間、とても大切にしてますね🌸",
];
