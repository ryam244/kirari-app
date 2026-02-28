import { describe, it, expect } from "vitest";
import { generateAIComment } from "@/lib/aiComments";

describe("generateAIComment", () => {
  // --- Simple mode (no context) ---
  describe("コンテキストなし（シンプルモード）", () => {
    it("mood だけで文字列を返す", () => {
      const comment = generateAIComment("good");
      expect(typeof comment).toBe("string");
      expect(comment.length).toBeGreaterThan(0);
    });

    it.each(["great", "good", "normal", "tired", "bad"])(
      "mood=%s で空文字にならない",
      (mood) => {
        const comment = generateAIComment(mood);
        expect(comment.length).toBeGreaterThan(0);
      }
    );

    it("未知の mood でもフォールバックする", () => {
      const comment = generateAIComment("unknown_mood");
      expect(comment.length).toBeGreaterThan(0);
    });
  });

  // --- Full context mode ---
  const baseContext = {
    mood: "good" as const,
    weight: 52.0,
    memo: "",
    prevWeight: 52.5,
    streak: 5,
    totalLogs: 10,
    goalWeight: 50,
    startWeight: 55,
    name: "テスト",
  };

  describe("フルコンテキストモード", () => {
    it("コンテキスト付きでコメントを生成できる", () => {
      const comment = generateAIComment("good", baseContext);
      expect(comment.length).toBeGreaterThan(0);
      expect(comment).toContain("💕");
    });

    it("名前が含まれるパターンがある", () => {
      // Opening の一部パターンのみ名前を含むためランダム性を考慮
      const comments = Array.from({ length: 50 }, () =>
        generateAIComment("good", baseContext)
      );
      const hasName = comments.some((c) => c.includes("テスト"));
      expect(hasName).toBe(true);
    });

    it("名前が空の場合「あなた」が使われるパターンがある", () => {
      const comments = Array.from({ length: 50 }, () =>
        generateAIComment("good", { ...baseContext, name: "" })
      );
      const hasDefault = comments.some((c) => c.includes("あなた"));
      expect(hasDefault).toBe(true);
    });
  });

  // --- Weight change ---
  describe("体重変化の反応", () => {
    it("減少時に減少コメントを含む", () => {
      const ctx = { ...baseContext, weight: 52.0, prevWeight: 53.0 };
      const comment = generateAIComment("good", ctx);
      expect(comment).toMatch(/減/);
    });

    it("増加時に増加コメントを含む", () => {
      const ctx = { ...baseContext, weight: 53.0, prevWeight: 52.0 };
      const comment = generateAIComment("good", ctx);
      expect(comment).toMatch(/増/);
    });

    it("安定時に安定コメントを含む", () => {
      const ctx = { ...baseContext, weight: 52.0, prevWeight: 52.1 };
      const comment = generateAIComment("good", ctx);
      expect(comment).toMatch(/安定/);
    });
  });

  // --- Streak ---
  describe("連続記録", () => {
    it("30日以上で特別なメッセージ", () => {
      const comment = generateAIComment("good", { ...baseContext, streak: 35 });
      expect(comment).toMatch(/35日/);
    });

    it("7日以上で一週間メッセージ", () => {
      const comment = generateAIComment("good", { ...baseContext, streak: 8 });
      expect(comment).toMatch(/8日/);
    });

    it("2日以下ではstreak言及なし", () => {
      const comment = generateAIComment("good", { ...baseContext, streak: 2 });
      expect(comment).not.toMatch(/2日連続/);
    });
  });

  // --- Goal progress ---
  describe("目標進捗", () => {
    it("目標達成でお祝いメッセージ", () => {
      const ctx = { ...baseContext, weight: 49.5, goalWeight: 50 };
      const comment = generateAIComment("good", ctx);
      expect(comment).toMatch(/達成|おめでとう/);
    });

    it("目標まであと少しでラストスパート", () => {
      const ctx = { ...baseContext, weight: 50.5, goalWeight: 50 };
      const comment = generateAIComment("good", ctx);
      expect(comment).toMatch(/もう少し|ラストスパート|あと/);
    });
  });

  // --- Memo keywords ---
  describe("メモキーワード反応", () => {
    it("運動系キーワードに反応", () => {
      const ctx = { ...baseContext, memo: "今日はジムに行った" };
      const comment = generateAIComment("good", ctx);
      expect(comment).toMatch(/運動|体|動/);
    });

    it("食事系キーワードに反応", () => {
      const ctx = { ...baseContext, memo: "サラダをたくさん食べた" };
      const comment = generateAIComment("good", ctx);
      expect(comment).toMatch(/食事|ヘルシー|野菜|美味し|食べ|楽しみ|バランス/);
    });

    it("ストレス系キーワードに反応", () => {
      const ctx = { ...baseContext, memo: "今日はストレスがすごい" };
      const comment = generateAIComment("good", ctx);
      expect(comment).toMatch(/大変|無理|労/);
    });

    it("睡眠系キーワードに反応", () => {
      const ctx = { ...baseContext, memo: "よく眠れた" };
      const comment = generateAIComment("good", ctx);
      expect(comment).toMatch(/睡眠|休む|味方/);
    });
  });

  // --- Milestones ---
  describe("マイルストーン", () => {
    it("初回記録で特別メッセージ", () => {
      const ctx = { ...baseContext, totalLogs: 1 };
      const comment = generateAIComment("good", ctx);
      expect(comment).toMatch(/最初/);
    });

    it("10回目で特別メッセージ", () => {
      const ctx = { ...baseContext, totalLogs: 10 };
      const comment = generateAIComment("good", ctx);
      expect(comment).toMatch(/10回/);
    });

    it("100回目で特別メッセージ", () => {
      const ctx = { ...baseContext, totalLogs: 100 };
      const comment = generateAIComment("good", ctx);
      expect(comment).toMatch(/100回/);
    });
  });

  // --- Mood openings ---
  describe("mood別の挨拶", () => {
    it.each([
      ["great", /最高|キラキラ|素晴らし/],
      ["good", /いい感じ|いい調子|いい気分/],
      ["normal", /お疲れ|ありがとう|穏やか/],
      ["tired", /お疲れ|疲れ|ゆっくり/],
      ["bad", /大丈夫|しんどい|辛い/],
    ])("mood=%s で適切な挨拶を含む", (mood, pattern) => {
      const comment = generateAIComment(mood, baseContext);
      expect(comment).toMatch(pattern);
    });
  });

  // --- Uniqueness ---
  describe("バリエーション", () => {
    it("複数回呼び出すと異なるコメントが生成される可能性がある", () => {
      const comments = new Set<string>();
      for (let i = 0; i < 30; i++) {
        comments.add(generateAIComment("good", baseContext));
      }
      expect(comments.size).toBeGreaterThan(1);
    });
  });
});
