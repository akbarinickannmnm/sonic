import type { Case } from "../types/case";
import { cases } from "../data/cases";

export const DAILY_CASE_SCHEDULE_KEY = "sonic:daily-case:schedule:v1";
export const DAILY_CASE_TIME_ZONE = "Asia/Tehran";

export type DailyCaseSchedule = Record<string, string>;

/**
 * The daily case is deterministic for the Tehran (Asia/Tehran) calendar date.
 * The schedule is deterministic and independent of browser localStorage.
 */
export function getDefaultDailyCase(date = new Date()): Case {
  const eligible = cases
    .filter((item) => item.difficulty === "easy" || item.difficulty === "medium")
    .slice()
    .sort((a, b) => a.id.localeCompare(b.id));

  if (eligible.length === 0) throw new Error("No eligible cases are available for Case of the Day.");

  // Use a deterministic shuffled rotation rather than hashing each date independently.
  // This keeps consecutive scheduled days from repeating until the eligible pool cycles.
  const pool = eligible.slice();
  let seed = 0x534f4e49; // stable SONIC seed
  for (let index = 0; index < pool.length; index += 1) {
    seed = Math.imul(seed ^ pool[index].id.charCodeAt(0), 16777619) >>> 0;
    for (const char of pool[index].id.slice(1)) seed = Math.imul(seed ^ char.charCodeAt(0), 16777619) >>> 0;
  }
  for (let index = pool.length - 1; index > 0; index -= 1) {
    seed = (Math.imul(seed ^ (index + 1), 1103515245) + 12345) >>> 0;
    const target = seed % (index + 1);
    [pool[index], pool[target]] = [pool[target], pool[index]];
  }

  const dateKey = getTehranDateKey(date);
  const [year, month, day] = dateKey.split("-").map(Number);
  const anchor = Date.UTC(2026, 0, 1);
  const dayIndex = Math.floor((Date.UTC(year, month - 1, day) - anchor) / 86400000);
  const normalizedIndex = ((dayIndex % pool.length) + pool.length) % pool.length;
  return pool[normalizedIndex];
}

export function ensureDailyCaseSchedule(_days = 30, _from = new Date()): DailyCaseSchedule {
  return {};
}

export function getDailyCase(date = new Date(), _schedule: DailyCaseSchedule = {}): Case {
  return getDefaultDailyCase(date);
}

export function readDailyCaseSchedule(): DailyCaseSchedule {
  return {};
}

export function writeDailyCaseSchedule(_schedule: DailyCaseSchedule) {
  // No-op: localStorage must not be used as the source of truth.
}

export function getTehranDateKey(date = new Date()) {
  const parts = new Intl.DateTimeFormat("en-CA", {
    timeZone: DAILY_CASE_TIME_ZONE,
    year: "numeric",
    month: "2-digit",
    day: "2-digit",
  }).formatToParts(date);
  const values = Object.fromEntries(parts.map(({ type, value }) => [type, value]));
  return `${values.year}-${values.month}-${values.day}`;
}

export function formatDateKey(date: Date) {
  return getTehranDateKey(date);
}
