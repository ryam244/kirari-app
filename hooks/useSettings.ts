"use client";

import { useState, useCallback } from "react";
import { Settings, getSettings, saveSettings } from "@/lib/storage";

const defaultSettings: Settings = {
  name: "あなた",
  goalWeight: 50,
  startWeight: 55,
  isOnboarded: false,
};

export function useSettings() {
  const [settings, setSettings] = useState<Settings>(() => {
    if (typeof window === "undefined") return defaultSettings;
    return getSettings();
  });
  const isLoaded = true;

  const update = useCallback((partial: Partial<Settings>) => {
    saveSettings(partial);
    setSettings((prev) => ({ ...prev, ...partial }));
  }, []);

  return { settings, update, isLoaded };
}
