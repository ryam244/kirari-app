// AI Pet system — pet grows as user logs weight daily

export interface PetState {
  name: string;
  xp: number;
  level: number;
  stage: PetStage;
  happiness: number; // 0-100
  lastFedDate: string; // YYYY-MM-DD of last log that gave XP
  totalFeeds: number;
  createdAt: string;
}

export type PetStage = "egg" | "baby" | "child" | "teen" | "adult" | "sparkle";

export interface PetStageInfo {
  stage: PetStage;
  name: string;
  minLevel: number;
  description: string;
}

export const PET_STAGES: PetStageInfo[] = [
  { stage: "egg", name: "たまご", minLevel: 0, description: "キラリのたまご。毎日記録すると何かが…" },
  { stage: "baby", name: "ベビー", minLevel: 3, description: "生まれたて！小さくてふわふわ" },
  { stage: "child", name: "こども", minLevel: 7, description: "元気いっぱいに動き回る" },
  { stage: "teen", name: "ティーン", minLevel: 15, description: "おしゃれに目覚めた！キラキラ大好き" },
  { stage: "adult", name: "おとな", minLevel: 30, description: "頼れる存在に成長！" },
  { stage: "sparkle", name: "キラキラ", minLevel: 60, description: "最高の輝き✨ 伝説のキラリ" },
];

const PET_KEY = "kirari_pet";

// XP needed for each level: 10, 12, 14, 16, ... (increasing slightly)
export function xpForLevel(level: number): number {
  return 10 + level * 2;
}

export function getStageForLevel(level: number): PetStage {
  let result: PetStage = "egg";
  for (const s of PET_STAGES) {
    if (level >= s.minLevel) result = s.stage;
  }
  return result;
}

export function getStageInfo(stage: PetStage): PetStageInfo {
  return PET_STAGES.find((s) => s.stage === stage) ?? PET_STAGES[0];
}

export function getNextStageInfo(level: number): PetStageInfo | null {
  for (const s of PET_STAGES) {
    if (level < s.minLevel) return s;
  }
  return null;
}

export function getDefaultPet(): PetState {
  const now = new Date();
  const dateStr = `${now.getFullYear()}-${String(now.getMonth() + 1).padStart(2, "0")}-${String(now.getDate()).padStart(2, "0")}`;
  return {
    name: "キラリ",
    xp: 0,
    level: 0,
    stage: "egg",
    happiness: 50,
    lastFedDate: "",
    totalFeeds: 0,
    createdAt: dateStr,
  };
}

export function getPet(): PetState {
  if (typeof window === "undefined") return getDefaultPet();
  try {
    const raw = window.localStorage.getItem(PET_KEY);
    return raw ? { ...getDefaultPet(), ...JSON.parse(raw) } : getDefaultPet();
  } catch {
    return getDefaultPet();
  }
}

export function savePet(pet: PetState): void {
  if (typeof window === "undefined") return;
  window.localStorage.setItem(PET_KEY, JSON.stringify(pet));
}

/** Feed the pet (called when user logs weight). Returns updated pet + rewards info. */
export function feedPet(
  currentPet: PetState,
  dateStr: string,
  streak: number
): { pet: PetState; xpGained: number; leveledUp: boolean; evolved: boolean } {
  const pet = { ...currentPet };

  // Prevent double-feeding for same day
  if (pet.lastFedDate === dateStr) {
    return { pet, xpGained: 0, leveledUp: false, evolved: false };
  }

  // Base XP + streak bonus
  let xpGained = 10;
  if (streak >= 7) xpGained += 5;
  if (streak >= 14) xpGained += 5;
  if (streak >= 30) xpGained += 10;

  pet.xp += xpGained;
  pet.lastFedDate = dateStr;
  pet.totalFeeds++;
  pet.happiness = Math.min(100, pet.happiness + 10);

  // Level up check
  let leveledUp = false;
  while (pet.xp >= xpForLevel(pet.level)) {
    pet.xp -= xpForLevel(pet.level);
    pet.level++;
    leveledUp = true;
  }

  // Stage evolution
  const newStage = getStageForLevel(pet.level);
  const evolved = newStage !== pet.stage;
  pet.stage = newStage;

  savePet(pet);
  return { pet, xpGained, leveledUp, evolved };
}

/** Happiness decays if user doesn't log for a day */
export function decayHappiness(pet: PetState, todayStr: string): PetState {
  if (pet.lastFedDate === todayStr || !pet.lastFedDate) return pet;

  const last = new Date(pet.lastFedDate);
  const today = new Date(todayStr);
  const daysMissed = Math.floor((today.getTime() - last.getTime()) / (1000 * 60 * 60 * 24)) - 1;

  if (daysMissed > 0) {
    const updated = { ...pet, happiness: Math.max(0, pet.happiness - daysMissed * 8) };
    savePet(updated);
    return updated;
  }
  return pet;
}
