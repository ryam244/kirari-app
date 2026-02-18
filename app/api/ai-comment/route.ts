import { NextRequest, NextResponse } from "next/server";
import { FALLBACK_COMMENTS } from "@/lib/data";

export async function POST(req: NextRequest) {
  try {
    const { weight, mood, memo } = await req.json();

    const apiKey = process.env.OPENAI_API_KEY;

    if (apiKey) {
      const prompt = `あなたは健康アプリ「キラリ」のAIコーチです。優しく、かわいく、励ます日本語でユーザーにひとことコメントをしてください。

ユーザーの今日の記録:
- 体重: ${weight}kg
- 気分: ${mood}
- ひとこと: ${memo || "（記録なし）"}

条件:
- 2〜4文程度の短いメッセージ
- 絵文字を1〜3個使う（🌸💕✨😊🌟など）
- 体重の数値を批判しない
- 前向きで温かみのある言葉
- 女性20-30代に向けた語り口`;

      const res = await fetch("https://api.openai.com/v1/chat/completions", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${apiKey}`,
        },
        body: JSON.stringify({
          model: "gpt-4o-mini",
          messages: [{ role: "user", content: prompt }],
          max_tokens: 200,
          temperature: 0.8,
        }),
      });

      if (res.ok) {
        const data = await res.json();
        const comment = data.choices?.[0]?.message?.content?.trim();
        if (comment) {
          return NextResponse.json({ comment, source: "ai" });
        }
      }
    }

    // Fallback to dummy comments
    const randomComment =
      FALLBACK_COMMENTS[Math.floor(Math.random() * FALLBACK_COMMENTS.length)];
    return NextResponse.json({ comment: randomComment, source: "fallback" });
  } catch (error) {
    console.error("AI comment error:", error);
    const randomComment =
      FALLBACK_COMMENTS[Math.floor(Math.random() * FALLBACK_COMMENTS.length)];
    return NextResponse.json({ comment: randomComment, source: "fallback" });
  }
}
