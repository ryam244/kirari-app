"use client";

import { useState, useCallback } from "react";
import { WeightLog } from "@/lib/data";
import { getLogs, saveLog, deleteLog } from "@/lib/storage";

export function todayStr(): string {
  const d = new Date();
  return `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, "0")}-${String(d.getDate()).padStart(2, "0")}`;
}

export function useWeightLogs() {
  const [logs, setLogs] = useState<WeightLog[]>(() => {
    if (typeof window === "undefined") return [];
    return getLogs();
  });
  const isLoaded = true;

  const refresh = useCallback(() => {
    setLogs(getLogs());
  }, []);

  const addLog = useCallback(
    (log: WeightLog) => {
      saveLog(log);
      refresh();
    },
    [refresh]
  );

  const removeLog = useCallback(
    (id: string) => {
      deleteLog(id);
      refresh();
    },
    [refresh]
  );

  const today = todayStr();
  const todayLog = logs.find((l) => l.date === today) ?? null;

  // Last 7 days for the mini chart
  const weeklyData = Array.from({ length: 7 }, (_, i) => {
    const d = new Date();
    d.setDate(d.getDate() - (6 - i));
    const dateStr = `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, "0")}-${String(d.getDate()).padStart(2, "0")}`;
    const dayNames = ["日", "月", "火", "水", "木", "金", "土"];
    return {
      day: dayNames[d.getDay()],
      weight: logs.find((l) => l.date === dateStr)?.weight ?? null,
    };
  });

  // Consecutive streak
  const streak = (() => {
    if (logs.length === 0) return 0;
    let count = 0;
    const base = new Date();
    if (!todayLog) base.setDate(base.getDate() - 1);
    for (let i = 0; i < 365; i++) {
      const d = new Date(base);
      d.setDate(d.getDate() - i);
      const ds = `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, "0")}-${String(d.getDate()).padStart(2, "0")}`;
      if (logs.some((l) => l.date === ds)) {
        count++;
      } else {
        break;
      }
    }
    return count;
  })();

  // Weight change vs ~30 days ago
  const monthlyChange = (() => {
    if (logs.length < 2) return null;
    const cutoff = new Date();
    cutoff.setDate(cutoff.getDate() - 30);
    const cutoffStr = `${cutoff.getFullYear()}-${String(cutoff.getMonth() + 1).padStart(2, "0")}-${String(cutoff.getDate()).padStart(2, "0")}`;
    const oldest = logs.find((l) => l.date <= cutoffStr) ?? logs[logs.length - 1];
    const newest = logs[0];
    if (oldest.id === newest.id) return null;
    return (newest.weight - oldest.weight).toFixed(1);
  })();

  return { logs, todayLog, weeklyData, streak, monthlyChange, isLoaded, addLog, removeLog };
}
