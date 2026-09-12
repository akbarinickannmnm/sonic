import type { Case, Course, Difficulty } from "../types/case";

type SavedPracticeSequence = {
  mode: "start-over";
  difficulty: Difficulty | "all";
  ids: string[];
};

export function practiceSequenceKey(course: Course) {
  return `sonic:practice-sequence:${course}`;
}

function readSequence(course: Course): SavedPracticeSequence | null {
  if (typeof window === "undefined") return null;
  try {
    const raw = window.localStorage.getItem(practiceSequenceKey(course));
    if (!raw) return null;
    const parsed = JSON.parse(raw) as SavedPracticeSequence;
    if (!parsed || !Array.isArray(parsed.ids) || !parsed.mode) return null;
    return parsed;
  } catch {
    return null;
  }
}

function writeSequence(course: Course, sequence: SavedPracticeSequence) {
  if (typeof window === "undefined") return;
  window.localStorage.setItem(practiceSequenceKey(course), JSON.stringify(sequence));
}

function randomize<T>(items: T[]) {
  const result = [...items];

  // Fisher-Yates shuffle. crypto gives us a fresh order whenever Start Over is pressed.
  if (typeof crypto !== "undefined" && typeof crypto.getRandomValues === "function") {
    const buffer = new Uint32Array(result.length);
    crypto.getRandomValues(buffer);
    for (let i = result.length - 1; i > 0; i -= 1) {
      const j = buffer[i] % (i + 1);
      [result[i], result[j]] = [result[j], result[i]];
    }
    return result;
  }

  for (let i = result.length - 1; i > 0; i -= 1) {
    const j = Math.floor(Math.random() * (i + 1));
    [result[i], result[j]] = [result[j], result[i]];
  }
  return result;
}

function matchesDifficulty(item: Case, difficulty: Difficulty | "all") {
  return difficulty === "all" || item.difficulty === difficulty;
}

export function resetPracticeSequence(
  course: Course,
  cases: Case[],
  difficulty: Difficulty | "all",
) {
  const filtered = cases.filter((item) => matchesDifficulty(item, difficulty));
  const sequence: SavedPracticeSequence = {
    mode: "start-over",
    difficulty,
    ids: randomize(filtered).map((item) => item.id),
  };
  writeSequence(course, sequence);
  return sequence;
}

export function getSavedPracticeSequence(course: Course) {
  return readSequence(course);
}
