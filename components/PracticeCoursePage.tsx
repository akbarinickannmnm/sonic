"use client";

import Link from "next/link";
import { useMemo, useState } from "react";
import { useRouter } from "next/navigation";
import type { Case, Course, Difficulty } from "../types/case";

type PracticeMode = "continue" | "unattempted" | "mistakes" | "start-over";
type DifficultyFilter = Difficulty | "all";

type Props = {
  course: Course;
  cases: Case[];
};

const modeOptions: Array<{
  id: PracticeMode;
  title: string;
  subtitle: string;
  icon: string;
}> = [
  { id: "continue", title: "Continue", subtitle: "From where you left", icon: "▷" },
  { id: "unattempted", title: "Unattempted", subtitle: "Not tried yet", icon: "♡" },
  { id: "mistakes", title: "Review Mistakes", subtitle: "Your incorrect cases", icon: "×" },
  { id: "start-over", title: "Start Over", subtitle: "Reset everything", icon: "↻" },
];

const difficultyOptions: Array<{ id: DifficultyFilter; title: string }> = [
  { id: "easy", title: "Easy" },
  { id: "medium", title: "Medium" },
  { id: "hard", title: "Hard" },
  { id: "all", title: "All" },
];

function storageKey(course: Course, caseId: string) {
  return `sonic:practice:${course}:${caseId}`;
}

function readCaseState(course: Course, caseId: string) {
  if (typeof window === "undefined") return null;

  try {
    const raw = window.localStorage.getItem(storageKey(course, caseId));
    if (!raw) return null;
    const parsed = JSON.parse(raw) as {
      completed?: boolean;
      won?: boolean | null;
    };

    return {
      completed: parsed.completed === true,
      won: parsed.won === true ? true : parsed.won === false ? false : null,
    };
  } catch {
    return null;
  }
}

function clearCourseProgress(course: Course, cases: Case[]) {
  if (typeof window === "undefined") return;
  for (const caseData of cases) {
    window.localStorage.removeItem(storageKey(course, caseData.id));
  }
}

function formatTag(tag: string) {
  return tag
    .replace(/[-_]+/g, " ")
    .replace(/\b\w/g, (char) => char.toUpperCase());
}

export default function PracticeCoursePage({ course, cases }: Props) {
  const [mode, setMode] = useState<PracticeMode>("continue");
  const [difficulty, setDifficulty] = useState<DifficultyFilter>("all");
  const [selectedTags, setSelectedTags] = useState<string[]>([]);
  const [tagsOpen, setTagsOpen] = useState(false);
  const [difficultyOpen, setDifficultyOpen] = useState(false);

  const router = useRouter();
  const courseLabel = course.charAt(0).toUpperCase() + course.slice(1);

  const allTags = useMemo(() => {
    const tags = new Set<string>();
    for (const caseData of cases) {
      for (const tag of caseData.tags) tags.add(tag);
    }
    return [...tags].sort((a, b) => a.localeCompare(b));
  }, [cases]);

  const filteredCases = useMemo(() => {
    return cases.filter((caseData) => {
      if (difficulty !== "all" && caseData.difficulty !== difficulty) return false;
      if (selectedTags.length > 0 && !selectedTags.some((tag) => caseData.tags.includes(tag))) return false;

      const state = readCaseState(course, caseData.id);

      if (mode === "unattempted") return state === null;
      if (mode === "mistakes") return state?.completed === true && state.won === false;
      if (mode === "continue") return state !== null && state.completed === false;
      return true;
    });
  }, [cases, course, difficulty, mode, selectedTags]);

  const modeCounts = useMemo(() => {
    const counts: Record<PracticeMode, number> = {
      continue: 0,
      unattempted: 0,
      mistakes: 0,
      "start-over": cases.length,
    };

    for (const caseData of cases) {
      const state = readCaseState(course, caseData.id);
      if (state === null) counts.unattempted += 1;
      else if (state.completed && state.won === false) counts.mistakes += 1;
      else if (!state.completed) counts.continue += 1;
    }

    return counts;
  }, [cases, course]);

  function toggleTag(tag: string) {
    setSelectedTags((current) =>
      current.includes(tag) ? current.filter((item) => item !== tag) : [...current, tag],
    );
  }

  function continueToCases() {
    if (filteredCases.length === 0) return;

    if (mode === "start-over") {
      clearCourseProgress(course, cases);
    }

    const randomIndex = Math.floor(Math.random() * filteredCases.length);
    const selectedCase = filteredCases[randomIndex];
    router.push(`/practice/${course}/${selectedCase.id}`);
  }

  return (
    <main className="min-h-screen bg-[#f6f5f1] text-[#10213f]">
      <div className="mx-auto min-h-screen w-full max-w-[720px] px-4 pb-8 sm:px-6">
        <header className="flex items-center gap-3 px-1 pb-5 pt-6">
          <Link
            href="/practice"
            aria-label="Back to specialties"
            className="flex h-9 w-9 items-center justify-center rounded-full text-slate-500 transition hover:bg-white hover:text-slate-900"
          >
            <span className="text-[26px] leading-none">‹</span>
          </Link>
          <div className="flex items-center gap-3">
            <div className="flex h-9 w-9 items-center justify-center rounded-xl border border-slate-200 bg-white text-slate-500">
              <span className="text-lg">{course === "pulmonology" ? "◌" : "♡"}</span>
            </div>
            <h1 className="text-[22px] font-semibold tracking-[-0.025em]">{courseLabel}</h1>
          </div>
        </header>

        <>
            <section className="rounded-[24px] border border-slate-200 bg-white p-5 shadow-[0_10px_35px_rgba(15,23,42,0.04)] sm:p-6">
              <div className="flex items-start justify-between gap-4">
                <div>
                  <h2 className="text-[27px] font-semibold tracking-[-0.035em]">Filter your practice</h2>
                  <p className="mt-1 text-sm text-slate-500">Customize your case selection.</p>
                </div>
                <div className="flex h-11 w-11 items-center justify-center rounded-xl border border-slate-200 bg-white text-slate-500">
                  <span className="text-xl">☷</span>
                </div>
              </div>

              <div className="mt-6 overflow-hidden rounded-2xl border border-slate-200">
                <div className="border-b border-slate-200 px-4 py-4">
                  <div className="flex items-center gap-3 text-sm font-semibold">
                    <span className="text-lg text-slate-500">☷</span>
                    <span>Mode</span>
                    <span className="ml-auto text-slate-400">⌄</span>
                  </div>
                  <div className="mt-4 grid grid-cols-1 gap-3 sm:grid-cols-2">
                    {modeOptions.map((option) => {
                      const selected = mode === option.id;
                      return (
                        <button
                          key={option.id}
                          type="button"
                          onClick={() => setMode(option.id)}
                          className={`rounded-2xl border p-4 text-left transition ${selected ? "border-blue-300 bg-blue-50/70 shadow-sm" : "border-slate-200 bg-white hover:border-slate-300 hover:bg-slate-50"}`}
                        >
                          <div className="flex items-start gap-3">
                            <div className={`flex h-9 w-9 shrink-0 items-center justify-center rounded-xl text-lg ${selected ? "bg-white text-blue-700" : "bg-slate-50 text-slate-500"}`}>
                              {option.icon}
                            </div>
                            <div className="min-w-0">
                              <div className="flex items-center gap-2">
                                <span className="text-sm font-semibold text-slate-900">{option.title}</span>
                                <span className="text-[11px] font-semibold text-slate-400">{modeCounts[option.id]}</span>
                              </div>
                              <p className="mt-1 text-xs leading-5 text-slate-500">{option.subtitle}</p>
                            </div>
                          </div>
                        </button>
                      );
                    })}
                  </div>
                </div>

                <button
                  type="button"
                  onClick={() => setDifficultyOpen((value) => !value)}
                  className="flex w-full items-center gap-3 px-4 py-4 text-left"
                >
                  <span className="text-lg text-slate-500">▥</span>
                  <span className="text-sm font-semibold">Difficulty</span>
                  <span className="ml-auto text-slate-400">{difficultyOpen ? "⌄" : "›"}</span>
                </button>
                {difficultyOpen && (
                  <div className="grid grid-cols-2 gap-2 border-t border-slate-200 bg-slate-50/70 p-4 sm:grid-cols-4">
                    {difficultyOptions.map((option) => (
                      <button
                        key={option.id}
                        type="button"
                        onClick={() => setDifficulty(option.id)}
                        className={`rounded-xl border px-3 py-3 text-sm font-semibold transition ${difficulty === option.id ? "border-blue-300 bg-white text-blue-700" : "border-slate-200 bg-white text-slate-600 hover:border-slate-300"}`}
                      >
                        {option.title}
                      </button>
                    ))}
                  </div>
                )}

                <button
                  type="button"
                  onClick={() => setTagsOpen((value) => !value)}
                  className="flex w-full items-center gap-3 border-t border-slate-200 px-4 py-4 text-left"
                >
                  <span className="text-lg text-slate-500">◇</span>
                  <span className="text-sm font-semibold">Tags</span>
                  {selectedTags.length > 0 && (
                    <span className="rounded-full bg-blue-50 px-2 py-1 text-[11px] font-semibold text-blue-700">{selectedTags.length} selected</span>
                  )}
                  <span className="ml-auto text-slate-400">{tagsOpen ? "⌄" : "›"}</span>
                </button>
                {tagsOpen && (
                  <div className="border-t border-slate-200 bg-slate-50/70 p-4">
                    <div className="flex flex-wrap gap-2">
                      {allTags.map((tag) => {
                        const selected = selectedTags.includes(tag);
                        return (
                          <button
                            key={tag}
                            type="button"
                            onClick={() => toggleTag(tag)}
                            className={`rounded-full border px-3 py-2 text-xs font-semibold transition ${selected ? "border-blue-300 bg-blue-50 text-blue-700" : "border-slate-200 bg-white text-slate-600 hover:border-slate-300"}`}
                          >
                            {formatTag(tag)}
                          </button>
                        );
                      })}
                    </div>
                    {selectedTags.length > 0 && (
                      <button type="button" onClick={() => setSelectedTags([])} className="mt-3 text-xs font-semibold text-slate-500 hover:text-slate-900">
                        Clear tag filter
                      </button>
                    )}
                  </div>
                )}
              </div>

              <div className="mt-5 rounded-2xl bg-slate-50 px-4 py-3 text-xs leading-5 text-slate-500">
                {mode === "continue" && "Continue shows cases that have been started but not completed."}
                {mode === "unattempted" && "Unattempted shows cases with no saved practice progress."}
                {mode === "mistakes" && "Review Mistakes shows cases where the diagnosis was missed after the allowed attempts."}
                {mode === "start-over" && "Start Over clears this course's saved practice progress before showing the cases."}
              </div>
            </section>

            <button
              type="button"
              onClick={continueToCases}
              className="mt-5 flex w-full items-center justify-center gap-3 rounded-2xl bg-[#1f355b] px-5 py-4 text-[16px] font-semibold text-white shadow-[0_8px_22px_rgba(31,53,91,0.18)] transition hover:bg-[#1a2e50]"
            >
              <span>Show Case ({filteredCases.length})</span>
              <span className="text-xl">→</span>
            </button>
          </>

      </div>
    </main>
  );
}
