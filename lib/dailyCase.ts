import type { Case } from "../types/case";
import { cases } from "../data/cases";

export const DAILY_CASE_SCHEDULE_KEY = "sonic:daily-case:schedule:v1";
export const DAILY_CASE_TIME_ZONE = "Asia/Tehran";

export type DailyCaseSchedule = Record<string, string>;

/**
 * The daily case is deterministic for the Tehran (Asia/Tehran) calendar date.
 * The user-facing Case of the Day must use this deterministic fallback directly so
 * localhost, Vercel, and all users resolve the same case from the same repository data.
 * localStorage scheduling is retained for the admin UI only and is not authoritative
 * for the public Case of the Day until a shared database is introduced.
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

export function ensureDailyCaseSchedule(days = 30, from = new Date()): DailyCaseSchedule {
  const schedule = readDailyCaseSchedule();
  const base = new Date(from);
  base.setHours(12, 0, 0, 0);

  // Pre-assign today + the next N days. Existing admin choices are never overwritten.
  for (let offset = 0; offset <= days; offset += 1) {
    const date = new Date(base);
    date.setDate(base.getDate() + offset);
    const dateKey = getTehranDateKey(date);
    if (!schedule[dateKey]) {
      schedule[dateKey] = getDefaultDailyCase(date).id;
    }
  }

  writeDailyCaseSchedule(schedule);
  return schedule;
}

export function getDailyCase(date = new Date(), schedule: DailyCaseSchedule = {}): Case {
  const dateKey = getTehranDateKey(date);
  const scheduledId = schedule[dateKey];
  if (scheduledId) {
    const scheduledCase = cases.find((item) => item.id === scheduledId);
    if (scheduledCase) return scheduledCase;
  }
  return getDefaultDailyCase(date);
}

export function readDailyCaseSchedule(): DailyCaseSchedule {
  if (typeof window === "undefined") return {};
  try {
    const raw = window.localStorage.getItem(DAILY_CASE_SCHEDULE_KEY);
    if (!raw) return {};
    const parsed = JSON.parse(raw) as unknown;
    if (!parsed || typeof parsed !== "object" || Array.isArray(parsed)) return {};
    return Object.fromEntries(
      Object.entries(parsed).filter(([date, caseId]) =>
        /^\d{4}-\d{2}-\d{2}$/.test(date) && typeof caseId === "string" && cases.some((item) => item.id === caseId),
      ),
    );
  } catch {
    return {};
  }
}

export function writeDailyCaseSchedule(schedule: DailyCaseSchedule) {
  if (typeof window === "undefined") return;
  window.localStorage.setItem(DAILY_CASE_SCHEDULE_KEY, JSON.stringify(schedule));
  window.dispatchEvent(new CustomEvent("sonic:daily-case-schedule-updated"));
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
