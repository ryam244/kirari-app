export interface WeightLog {
  id: string;
  date: string;
  weight: number;
  mood: string;
  moodEmoji: string;
  memo: string;
  aiComment: string;
}

export const MOODS = [
  { key: "great", label: "最高！", emoji: "🌟" },
  { key: "good", label: "いい感じ", emoji: "😊" },
  { key: "normal", label: "ふつう", emoji: "😐" },
  { key: "tired", label: "つかれた", emoji: "😴" },
  { key: "bad", label: "しんどい", emoji: "😢" },
];

export const DUMMY_LOGS: WeightLog[] = [
  {
    id: "1",
    date: "2026-02-18",
    weight: 52.3,
    mood: "great",
    moodEmoji: "🌟",
    memo: "今日はジムに行けた！気持ちいい✨",
    aiComment: "素晴らしい！ジムに行けたことは本当に大きな一歩です🌸 昨日より0.2kg減って、努力が数字に現れてきていますね。この調子で続けていきましょう💕",
  },
  {
    id: "2",
    date: "2026-02-17",
    weight: 52.5,
    mood: "good",
    moodEmoji: "😊",
    memo: "野菜多めの食事を心がけた",
    aiComment: "野菜中心の食事、とても素敵です🥗✨ 体の中からキレイになっていく感じ、きっと実感できているはず。今日も素晴らしい選択ができましたね💕",
  },
  {
    id: "3",
    date: "2026-02-16",
    weight: 53.1,
    mood: "normal",
    moodEmoji: "😐",
    memo: "お菓子食べすぎちゃったかも",
    aiComment: "誰でもそういう日はありますよ😊 大切なのは昨日何をしたかじゃなくて、今日どう行動するか。ちょっとしたお菓子タイムも、生活の潤いのひとつです🌸 明日もがんばろう！",
  },
  {
    id: "4",
    date: "2026-02-15",
    weight: 52.8,
    mood: "good",
    moodEmoji: "😊",
    memo: "朝のウォーキング30分！",
    aiComment: "朝のウォーキング最高です！🌿 朝日を浴びながら体を動かすことで、セロトニンも増えて一日中気分よく過ごせますよね。体重も安定してきていい感じ💕",
  },
  {
    id: "5",
    date: "2026-02-14",
    weight: 53.0,
    mood: "tired",
    moodEmoji: "😴",
    memo: "バレンタインデーでチョコ食べた笑",
    aiComment: "バレンタイン、楽しめましたか？🍫💝 特別な日のスイーツは人生の喜びのひとつ！少し疲れているみたいなので、今夜はしっかり休んでくださいね。ゆっくりリセットして、また明日から一緒に頑張りましょう🌙",
  },
  {
    id: "6",
    date: "2026-02-13",
    weight: 52.6,
    mood: "great",
    moodEmoji: "🌟",
    memo: "友達と散歩してリフレッシュ！",
    aiComment: "お友達との散歩タイム、最高のリフレッシュですね✨ 楽しみながら体を動かすのが一番続く秘訣。気分も最高で、体重も順調！この笑顔の連鎖を大切にしてください🌸💕",
  },
  {
    id: "7",
    date: "2026-02-12",
    weight: 53.2,
    mood: "bad",
    moodEmoji: "😢",
    memo: "仕事がつらくてストレス食いしてしまった",
    aiComment: "お仕事、お疲れ様です😢 ストレスのときに食べたくなるのはとても自然なこと。あなたが今日もちゃんと記録を続けてくれていることが、すごいと思います。自分に優しくしてあげてくださいね🌸 キラリはいつも応援しています💕",
  },
];

export const WEEKLY_DATA = [
  { day: "月", weight: 53.2 },
  { day: "火", weight: 53.0 },
  { day: "水", weight: 52.8 },
  { day: "木", weight: 53.1 },
  { day: "金", weight: 52.6 },
  { day: "土", weight: 52.5 },
  { day: "日", weight: 52.3 },
];

export const FALLBACK_COMMENTS = [
  "今日も記録できました！その小さな一歩が、未来の自分への大きな贈り物🌸 キラリはいつも一緒です💕",
  "素晴らしい！毎日続けることが一番大切。あなたは着実に前進しています✨",
  "今日の記録ありがとう😊 自分の体と向き合う時間、とても大切にしてますね。その積み重ねが必ず結果につながります🌸",
  "体重の数字より、毎日記録し続ける習慣が宝物です💎 今日もよく頑張りました！",
  "毎日チェックしてくれてありがとう💕 気分が「ふつう」な日も、それはそれで素敵な一日。ゆっくり続けていきましょう✨",
];
