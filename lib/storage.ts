import { WeightLog } from "./data";

export interface Settings {
  name: string;
  goalWeight: number;
  startWeight: number;
  isOnboarded: boolean;
}

const LOGS_KEY = "kirari_logs";
const SETTINGS_KEY = "kirari_settings";

const DEFAULT_SETTINGS: Settings = {
  name: "あなた",
  goalWeight: 50,
  startWeight: 55,
  isOnboarded: false,
};

function safeLS(): Storage | null {
  if (typeof window === "undefined") return null;
  return window.localStorage;
}

// ── Weight Logs ──────────────────────────────────────────────

export function getLogs(): WeightLog[] {
  const ls = safeLS();
  if (!ls) return [];
  try {
    return JSON.parse(ls.getItem(LOGS_KEY) ?? "[]") as WeightLog[];
  } catch {
    return [];
  }
}

export function saveLog(log: WeightLog): void {
  const ls = safeLS();
  if (!ls) return;
  const logs = getLogs();
  const idx = logs.findIndex((l) => l.date === log.date);
  if (idx >= 0) {
    logs[idx] = log;
  } else {
    logs.unshift(log);
  }
  logs.sort((a, b) => b.date.localeCompare(a.date));
  ls.setItem(LOGS_KEY, JSON.stringify(logs));
}

export function deleteLog(id: string): void {
  const ls = safeLS();
  if (!ls) return;
  ls.setItem(LOGS_KEY, JSON.stringify(getLogs().filter((l) => l.id !== id)));
}

export function clearAllLogs(): void {
  safeLS()?.removeItem(LOGS_KEY);
}

// ── Settings ─────────────────────────────────────────────────

export function getSettings(): Settings {
  const ls = safeLS();
  if (!ls) return DEFAULT_SETTINGS;
  try {
    const raw = ls.getItem(SETTINGS_KEY);
    return raw ? { ...DEFAULT_SETTINGS, ...JSON.parse(raw) } : DEFAULT_SETTINGS;
  } catch {
    return DEFAULT_SETTINGS;
  }
}

export function saveSettings(partial: Partial<Settings>): void {
  const ls = safeLS();
  if (!ls) return;
  ls.setItem(SETTINGS_KEY, JSON.stringify({ ...getSettings(), ...partial }));
}

export function clearAllData(): void {
  const ls = safeLS();
  if (!ls) return;
  ls.removeItem(LOGS_KEY);
  ls.removeItem(SETTINGS_KEY);
}
