"use client";

import { useState, useEffect, useCallback } from "react";
import { PetState, getPet, savePet, feedPet, decayHappiness } from "@/lib/pet";
import { todayStr } from "@/hooks/useWeightLogs";

export function usePet() {
  const [pet, setPet] = useState<PetState | null>(null);
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    const p = getPet();
    const decayed = decayHappiness(p, todayStr());
    setPet(decayed);
    setIsLoaded(true);
  }, []);

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
