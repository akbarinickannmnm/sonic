import type { Case } from "../types/case";
import { cases } from "../data/cases";

/**
 * The daily case is deterministic for a given UTC calendar date.
 * This means every user gets the same case on the same day.
 */
export function getDailyCase(date = new Date()): Case {
  const eligible = cases
    .filter((item) => item.difficulty === "easy" || item.difficulty === "medium")
    .slice()
    .sort((a, b) => a.id.localeCompare(b.id));

  if (eligible.length === 0) {
    throw new Error("No eligible cases are available for Case of the Day.");
  }

  const dateKey = date.toISOString().slice(0, 10);
  let hash = 2166136261;
  for (let index = 0; index < dateKey.length; index += 1) {
    hash ^= dateKey.charCodeAt(index);
    hash = Math.imul(hash, 16777619);
  }

  const index = (hash >>> 0) % eligible.length;
  return eligible[index];
}
