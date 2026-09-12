"use client";

import { useEffect, useMemo, useState } from "react";
import { useRouter } from "next/navigation";
import type { Case, Course, Difficulty } from "../types/case";
import { resetPracticeSequence } from "../lib/practiceSequence";

type PracticeMode = "unattempted" | "mistakes" | "start-over";
type DifficultyFilter = Difficulty | "all";

type Props = {
  course: Course;
  cases: Case[];
};

type CourseMeta = {
  label: string;
  subtitle: string;
  accent: string;
  soft: string;
};

const modeOptions: Array<{
  id: PracticeMode;
  title: string;
  subtitle: string;
  icon: "play" | "spark" | "alert" | "reset";
}> = [
  { id: "unattempted", title: "کیس‌های جدید", subtitle: "کیس‌هایی که هنوز شروع نکرده‌ای", icon: "spark" },
  { id: "mistakes", title: "مرور اشتباهات", subtitle: "کیس‌هایی که قبلاً اشتباه کرده‌ای", icon: "alert" },
  { id: "start-over", title: "شروع از ابتدا", subtitle: "پیشرفت این تخصص را از نو آغاز کن", icon: "reset" },
];

const difficultyOptions: Array<{ id: DifficultyFilter; title: string }> = [
  { id: "all", title: "همه" },
  { id: "easy", title: "آسان" },
  { id: "medium", title: "متوسط" },
  { id: "hard", title: "سخت" },
];

const courseMeta: Record<Course, CourseMeta> = {
  pulmonology: { label: "ریه", subtitle: "تنفس و بیماری‌های دستگاه تنفسی", accent: "#4c7194", soft: "#eef4f8" },
  cardiology: { label: "قلب و عروق", subtitle: "قلب، عروق و بیماری‌های قلبی", accent: "#8b3f53", soft: "#f8eff2" },
  gastroenterology: { label: "گوارش", subtitle: "دستگاه گوارش و بیماری‌های آن", accent: "#6b7f5a", soft: "#f2f5ef" },
  neurology: { label: "نورولوژی", subtitle: "مغز، اعصاب و سیستم عصبی", accent: "#7656c8", soft: "#f4f0ff" },
  "infectious-disease": { label: "عفونی", subtitle: "بیماری‌های عفونی و سیستم ایمنی", accent: "#249374", soft: "#eef9f5" },
  nephrology: { label: "نفرولوژی", subtitle: "کلیه، مایعات و اختلالات الکترولیت", accent: "#15919a", soft: "#edfafa" },
  endocrinology: { label: "غدد", subtitle: "هورمون‌ها، متابولیسم و غدد درون‌ریز", accent: "#6d5b8c", soft: "#f3f0f7" },
  "hematology-oncology": { label: "هماتولوژی و انکولوژی", subtitle: "خون، مغز استخوان و سرطان", accent: "#8f2746", soft: "#fff0f4" },
};

function storageKey(course: Course, caseId: string) {
  return `sonic:practice:${course}:${caseId}`;
}

function readCaseState(course: Course, caseId: string) {
  if (typeof window === "undefined") return null;
  try {
    const raw = window.localStorage.getItem(storageKey(course, caseId));
    if (!raw) return null;
    const parsed = JSON.parse(raw) as { completed?: boolean; won?: boolean | null };
    return {
      completed: parsed.completed === true,
      won: parsed.won === true ? true : parsed.won === false ? false : null,
    };
  } catch {
    return null;
  }
}

function clearCourseProgress(course: Course, caseList: Case[]) {
  if (typeof window === "undefined") return;
  for (const caseData of caseList) window.localStorage.removeItem(storageKey(course, caseData.id));
  window.dispatchEvent(new CustomEvent("sonic:practice-progress-updated"));
}

function formatTag(tag: string) {
  return tag.replace(/[-_]+/g, " ").replace(/\b\w/g, (char) => char.toUpperCase());
}

function Icon({
  name,
  size = 18,
}: {
  name: "play" | "spark" | "alert" | "reset" | "filter" | "chevron" | "tag" | "bars" | "arrow";
  size?: number;
}) {
  const common = {
    width: size,
    height: size,
    viewBox: "0 0 24 24",
    fill: "none",
    stroke: "currentColor",
    strokeWidth: 1.8,
    strokeLinecap: "round" as const,
    strokeLinejoin: "round" as const,
    "aria-hidden": true,
  };

  if (name === "play") return <svg {...common}><circle cx="12" cy="12" r="8.5" /><path d="m10 8.8 5.1 3.2-5.1 3.2V8.8Z" fill="currentColor" stroke="none" /></svg>;
  if (name === "spark") return <svg {...common}><rect x="5.5" y="4.5" width="10" height="15" rx="2.2" /><path d="M8.5 8.5h4M8.5 11.5h4" /><path d="M18 14.5V9.5M15.5 12h5" /></svg>;
  if (name === "alert") return <svg {...common}><path d="m12 4.8 7.4 13.3a1.3 1.3 0 0 1-1.1 1.9H5.7a1.3 1.3 0 0 1-1.1-1.9L12 4.8Z" /><path d="M12 9.3v4.1" /><circle cx="12" cy="16.2" r=".8" fill="currentColor" stroke="none" /></svg>;
  if (name === "reset") return <svg {...common}><path d="M7.3 8.2A6.8 6.8 0 1 1 6 15.8" /><path d="M4.6 5.7v4.2h4.2" /><path d="M12 8.8v3.8l2.5 1.6" /></svg>;
  if (name === "filter") return <svg {...common}><path d="M4 6h16" /><path d="M7 12h10" /><path d="M10 18h4" /></svg>;
  if (name === "chevron") return <svg {...common}><path d="m7 10 5 5 5-5" /></svg>;
  if (name === "tag") return <svg {...common}><path d="M4 5.5V4h5l10 10-5 5L4 9V5.5Z" /><path d="M7.5 7.5h.01" /></svg>;
  if (name === "bars") return <svg {...common}><path d="M5 17V9" /><path d="M12 17V5" /><path d="M19 17v-7" /></svg>;
  return <svg {...common}><path d="M19 12H6" /><path d="m11 7-5 5 5 5" /></svg>;
}

export default function PracticeCoursePage({ course, cases }: Props) {
  const router = useRouter();
  const meta = courseMeta[course];
  const [mode, setMode] = useState<PracticeMode>("unattempted");
  const [difficulty, setDifficulty] = useState<DifficultyFilter>("all");
  const [progressReady, setProgressReady] = useState(false);

  useEffect(() => {
    const refresh = () => setProgressReady(true);
    refresh();

    const handleStorage = (event: StorageEvent) => {
      if (event.key === null || event.key?.startsWith(`sonic:practice:${course}:`)) {
        setProgressReady(false);
        window.requestAnimationFrame(() => setProgressReady(true));
      }
    };

    const handleProgressUpdated = () => {
      setProgressReady(false);
      window.requestAnimationFrame(() => setProgressReady(true));
    };

    window.addEventListener("storage", handleStorage);
    window.addEventListener("sonic:practice-progress-updated", handleProgressUpdated);
    return () => {
      window.removeEventListener("storage", handleStorage);
      window.removeEventListener("sonic:practice-progress-updated", handleProgressUpdated);
    };
  }, [course]);

  const { modeCounts, completedCount, progressPercent } = useMemo(() => {
    const counts: Record<PracticeMode, number> = {
      unattempted: cases.length,
      mistakes: 0,
      "start-over": cases.length,
    };
    let completed = 0;

    if (!progressReady) {
      return { modeCounts: counts, completedCount: 0, progressPercent: 0 };
    }

    for (const caseData of cases) {
      const state = readCaseState(course, caseData.id);
      if (state?.completed) {
        completed += 1;
        if (state.won === false) counts.mistakes += 1;
      }
    }

    counts.unattempted = Math.max(0, cases.length - completed);

    return {
      modeCounts: counts,
      completedCount: completed,
      progressPercent: Math.round((completed / Math.max(cases.length, 1)) * 100),
    };
  }, [cases, course, progressReady]);

  const filteredCases = useMemo(() => cases.filter((caseData) => {
    if (difficulty !== "all" && caseData.difficulty !== difficulty) return false;

    if (!progressReady) return mode === "unattempted" || mode === "start-over";

    const state = readCaseState(course, caseData.id);
    if (mode === "unattempted") return state === null;
    if (mode === "mistakes") return state?.completed === true && state.won === false;
    if (mode === "continue") return state !== null && state.completed === false;
    return true;
  }), [cases, course, difficulty, mode, progressReady]);

  const difficultyCounts = useMemo(() => {
    const counts: Record<DifficultyFilter, number> = { easy: 0, medium: 0, hard: 0, all: cases.length };
    for (const caseData of cases) counts[caseData.difficulty] += 1;
    return counts;
  }, [cases]);
  function startPractice() {
    if (filteredCases.length === 0) return;

    let selectedCase = filteredCases[Math.floor(Math.random() * filteredCases.length)];

    if (mode === "start-over") {
      clearCourseProgress(course, cases);
      const sequence = resetPracticeSequence(course, cases, difficulty);
      const firstId = sequence.ids[0];
      selectedCase = cases.find((item) => item.id === firstId) ?? selectedCase;
    }

    const params = new URLSearchParams({ mode, difficulty });
    router.push(`/practice/${course}/${selectedCase.id}?${params.toString()}`);
  }

  return (
    <main dir="rtl" className="min-h-screen bg-[#f8f7f4] text-[#162238]">
      <div className="mx-auto w-full max-w-[1180px] px-5 pb-8 pt-6 sm:px-7 lg:pt-8">
        {/* Header */}
        <section className="overflow-hidden rounded-[26px] border border-[#e7e4de] bg-white shadow-[0_16px_42px_rgba(17,31,51,0.045)]">
          <div className="grid gap-6 px-6 py-6 lg:grid-cols-[1fr_auto] lg:items-end lg:px-8 lg:py-7">
            <div className="min-w-0">
              <div className="mb-2 flex items-center gap-2 text-xs font-medium text-[#8b96a7]">
                <span className="h-1.5 w-1.5 rounded-full" style={{ backgroundColor: meta.accent }} />
                <span>تمرین تخصصی</span>
              </div>
              <h1 className="text-[34px] font-bold tracking-[-0.025em] sm:text-[44px]">{meta.label}</h1>
              <p className="mt-2 max-w-[640px] text-[15px] leading-7 text-[#728097]">{meta.subtitle}</p>
            </div>

            <div className="flex items-center justify-between rounded-[18px] border border-[#ece9e3] bg-[#fbfaf8] px-2 py-2 lg:min-w-[390px]">
              <Stat compact value={cases.length.toLocaleString("fa-IR")} label="کل کیس‌ها" accent="#3d78c8" />
              <div className="h-9 w-px bg-[#e9e6e1]" />
              <Stat compact value={completedCount.toLocaleString("fa-IR")} label="تکمیل‌شده" accent="#168d71" />
              <div className="h-9 w-px bg-[#e9e6e1]" />
              <Stat compact value={`${progressPercent.toLocaleString("fa-IR")}٪`} label="پیشرفت" accent={meta.accent} progress={progressPercent} />
            </div>
          </div>
        </section>

        {/* Modes */}
        <section className="mt-6">
          <div className="mb-3 flex items-end justify-between gap-4">
            <div>
              <div className="text-[11px] font-semibold tracking-[0.12em] text-[#a0a7b2]">حالت تمرین</div>
              <h2 className="mt-1 text-[20px] font-bold">حالت مناسب خودت را انتخاب کن</h2>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-3 xl:grid-cols-4">
            {modeOptions.map((option) => {
              const selected = mode === option.id;
              return (
                <button
                  key={option.id}
                  type="button"
                  onClick={() => setMode(option.id)}
                  className="group relative rounded-[18px] border bg-white p-4 text-right transition-all duration-200 hover:-translate-y-0.5 hover:bg-[#fcfbfa] hover:shadow-[0_10px_24px_rgba(18,35,63,0.045)]"
                  style={{
                    borderColor: selected ? `${meta.accent}55` : "#e8e5df",
                    background: "#ffffff",
                    boxShadow: selected ? `0 8px 22px ${meta.accent}10` : "0 5px 16px rgba(18,35,63,0.022)",
                  }}
                >
                  <div className="flex items-start justify-between gap-3">
                    <span
                      className="flex h-10 w-10 items-center justify-center rounded-[12px]"
                      style={{
                        background: selected ? `${meta.accent}12` : "#f3f4f6",
                        color: selected ? meta.accent : "#6b778b",
                      }}
                    >
                      <Icon name={option.icon} size={19} />
                    </span>
                    <span className="rounded-full bg-[#f4f5f7] px-2.5 py-1 text-[11px] font-semibold text-[#7d899c]">
                      {modeCounts[option.id].toLocaleString("fa-IR")}
                    </span>
                  </div>

                  <div className="mt-4">
                    <div className="text-[16px] font-bold">{option.title}</div>
                    <p className="mt-1 text-[12px] leading-5 text-[#7a889d]">{option.subtitle}</p>
                  </div>

                  <span
                    className="absolute bottom-4 left-4 flex h-7 w-7 items-center justify-center rounded-full transition group-hover:translate-x-0.5"
                    style={{ background: selected ? `${meta.accent}12` : "#f5f6f8", color: selected ? meta.accent : "#93a0b1" }}
                  >
                    <Icon name="arrow" size={15} />
                  </span>
                </button>
              );
            })}
          </div>
        </section>

        {/* Difficulty */}
        <section className="mt-6">
          <div className="flex h-[72px] items-center justify-between gap-6 rounded-[18px] border border-[#e7e4de] bg-white px-5 shadow-[0_8px_22px_rgba(18,35,63,0.022)]">
            <div className="min-w-0">
              <div className="text-sm font-bold">سطح دشواری</div>
              <div className="mt-0.5 text-[11px] text-[#8a96a7]">انتخاب سطح کیس‌ها</div>
            </div>

            <div className="flex shrink-0 items-center gap-2">
              {difficultyOptions.map((option) => {
                const selected = difficulty === option.id;
                return (
                  <button
                    key={option.id}
                    type="button"
                    onClick={() => setDifficulty(option.id)}
                    className="rounded-full border px-3.5 py-1.5 text-xs font-medium transition"
                    style={
                      selected
                        ? { borderColor: meta.accent, background: meta.accent, color: "#fff" }
                        : { borderColor: "#e3e7ec", background: "#fff", color: "#66758a" }
                    }
                  >
                    {option.title}
                    <span className="mr-1.5 opacity-60">{difficultyCounts[option.id].toLocaleString("fa-IR")}</span>
                  </button>
                );
              })}
            </div>
          </div>
        </section>

        {/* CTA */}
        <section className="mt-5">
          <button
            type="button"
            onClick={startPractice}
            disabled={filteredCases.length === 0}
            className="group relative flex w-full items-center justify-between overflow-hidden rounded-[20px] px-5 py-4 text-white shadow-[0_14px_34px_rgba(18,35,63,0.10)] transition hover:-translate-y-0.5 hover:shadow-[0_18px_38px_rgba(18,35,63,0.13)] disabled:cursor-not-allowed disabled:bg-[#c7ccd4] disabled:shadow-none"
            style={filteredCases.length > 0 ? { background: meta.accent } : undefined}
          >
            <div className="relative z-10 flex items-center gap-3">
              <div className="flex h-10 w-10 items-center justify-center rounded-full bg-white" style={{ color: meta.accent }}>
                <Icon name="play" size={20} />
              </div>
              <div className="text-right">
                <div className="text-[18px] font-bold">شروع تمرین</div>
                <div className="mt-0.5 text-xs text-white/75">
                  {filteredCases.length > 0
                    ? `${filteredCases.length.toLocaleString("fa-IR")} کیس آماده است`
                    : "کیسی مطابق انتخاب‌های فعلی پیدا نشد"}
                </div>
              </div>
            </div>

            <div className="relative z-10 flex h-9 w-9 items-center justify-center rounded-full bg-white" style={{ color: meta.accent }}>
              <Icon name="arrow" size={17} />
            </div>
          </button>
        </section>
      </div>
    </main>
  );

}

function Stat({
  value,
  label,
  accent,
  progress = 0,
  compact = false,
}: {
  value: string;
  label: string;
  accent: string;
  progress?: number;
  compact?: boolean;
}) {
  const isProgress = progress >= 0 && label === "پیشرفت";
  const iconSize = compact ? 34 : 38;

  return (
    <div className={`flex items-center justify-center gap-2.5 ${compact ? "px-2.5" : "px-3"}`}>
      {isProgress ? (
        <div
          className="relative shrink-0"
          style={{ width: iconSize, height: iconSize }}
          aria-label={`${Math.max(0, Math.min(100, progress))} درصد پیشرفت`}
        >
          <svg
            width={iconSize}
            height={iconSize}
            viewBox="0 0 40 40"
            fill="none"
            className="-rotate-90"
            aria-hidden="true"
          >
            <circle cx="20" cy="20" r="15" stroke="#e7ebef" strokeWidth="3.5" />
            <circle
              cx="20"
              cy="20"
              r="15"
              stroke={accent}
              strokeWidth="3.5"
              strokeLinecap="round"
              strokeDasharray={`${Math.max(0, Math.min(100, progress)) * 0.9425} 1000`}
            />
          </svg>
        </div>
      ) : (
        <div
          className="flex shrink-0 items-center justify-center rounded-full"
          style={{
            width: iconSize,
            height: iconSize,
            background: `${accent}12`,
            color: accent,
          }}
          aria-hidden="true"
        >
          {label === "تکمیل‌شده" ? (
            <svg width="19" height="19" viewBox="0 0 24 24" fill="none" aria-hidden="true">
              <circle cx="12" cy="12" r="8.75" stroke="currentColor" strokeWidth="1.9" />
              <path d="m8.3 12.1 2.45 2.45 4.95-5.1" stroke="currentColor" strokeWidth="2.1" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          ) : (
            <svg width="19" height="19" viewBox="0 0 24 24" fill="none">
              <rect x="6.5" y="4.5" width="11" height="15" rx="2" stroke="currentColor" strokeWidth="1.8" />
              <path d="M9.5 9h5M9.5 12h5M9.5 15h3" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" />
              <path d="M9 4.5h6" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" />
            </svg>
          )}
        </div>
      )}

      <div className="text-right">
        <div className="text-[19px] font-bold leading-none">{value}</div>
        <div className="mt-1 text-[10px] text-[#7f8ca0]">{label}</div>
      </div>
    </div>
  );
}

