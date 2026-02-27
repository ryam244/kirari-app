"use client";

import { useState, useEffect, useCallback } from "react";
import { Settings, getSettings, saveSettings } from "@/lib/storage";

export function useSettings() {
  const [settings, setSettings] = useState<Settings>({
    name: "あなた",
    goalWeight: 50,
    startWeight: 55,
    isOnboarded: false,
  });
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    setSettings(getSettings());
    setIsLoaded(true);
  }, []);

  const update = useCallback((partial: Partial<Settings>) => {
    saveSettings(partial);
    setSettings((prev) => ({ ...prev, ...partial }));
  }, []);

  return { settings, update, isLoaded };
}
