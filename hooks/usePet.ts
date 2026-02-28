"use client";

import { useState, useCallback } from "react";
import { PetState, getPet, savePet, feedPet, decayHappiness } from "@/lib/pet";
import { todayStr } from "@/hooks/useWeightLogs";

export function usePet() {
  const [pet, setPet] = useState<PetState | null>(() => {
    if (typeof window === "undefined") return null;
    return decayHappiness(getPet(), todayStr());
  });
  const isLoaded = pet !== null;

  const feed = useCallback(
    (dateStr: string, streak: number) => {
      if (!pet) return { xpGained: 0, leveledUp: false, evolved: false };
      const result = feedPet(pet, dateStr, streak);
      setPet(result.pet);
      return result;
    },
    [pet]
  );

  const renamePet = useCallback(
    (name: string) => {
      if (!pet) return;
      const updated = { ...pet, name };
      savePet(updated);
      setPet(updated);
    },
    [pet]
  );

  const refresh = useCallback(() => {
    const p = getPet();
    setPet(p);
  }, []);

  return { pet, isLoaded, feed, renamePet, refresh };
}
