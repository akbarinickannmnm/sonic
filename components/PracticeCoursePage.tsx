"use client";

import { useMemo, useState } from "react";
import { useRouter } from "next/navigation";
import type { Case, Course, Difficulty } from "../types/case";

type PracticeMode = "continue" | "unattempted" | "mistakes" | "start-over";
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
  visual: "heart" | "lungs" | "kidney" | "gut" | "brain" | "thyroid" | "blood" | "bug";
};

const modeOptions: Array<{
  id: PracticeMode;
  title: string;
  subtitle: string;
  icon: "play" | "spark" | "alert" | "reset";
}> = [
  { id: "unattempted", title: "کیس‌های جدید", subtitle: "کیس‌هایی که هنوز شروع نکرده‌ای", icon: "spark" },
  { id: "continue", title: "ادامه تمرین", subtitle: "از جایی که متوقف شده‌ای", icon: "play" },
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
  pulmonology: { label: "ریه", subtitle: "تنفس و بیماری‌های دستگاه تنفسی", accent: "#3d78c8", soft: "#eef5ff", visual: "lungs" },
  cardiology: { label: "قلب و عروق", subtitle: "قلب، عروق و بیماری‌های قلبی", accent: "#c43d5c", soft: "#fff0f4", visual: "heart" },
  gastroenterology: { label: "گوارش", subtitle: "دستگاه گوارش و بیماری‌های آن", accent: "#d77a28", soft: "#fff4e8", visual: "gut" },
  neurology: { label: "نورولوژی", subtitle: "مغز، اعصاب و سیستم عصبی", accent: "#7656c8", soft: "#f3efff", visual: "brain" },
  "infectious-disease": { label: "عفونی", subtitle: "بیماری‌های عفونی و سیستم ایمنی", accent: "#249374", soft: "#ebfaf5", visual: "bug" },
  nephrology: { label: "نفرولوژی", subtitle: "کلیه، مایعات و اختلالات الکترولیت", accent: "#15919a", soft: "#edfafa", visual: "kidney" },
  endocrinology: { label: "غدد", subtitle: "هورمون‌ها، متابولیسم و غدد درون‌ریز", accent: "#bc861e", soft: "#fff8e8", visual: "thyroid" },
  "hematology-oncology": { label: "هماتولوژی و انکولوژی", subtitle: "خون، مغز استخوان و سرطان", accent: "#8f2746", soft: "#fff0f4", visual: "blood" },
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

function clearCourseProgress(course: Course, cases: Case[]) {
  if (typeof window === "undefined") return;
  for (const caseData of cases) window.localStorage.removeItem(storageKey(course, caseData.id));
}

function formatTag(tag: string) {
  return tag.replace(/[-_]+/g, " ").replace(/\b\w/g, (char) => char.toUpperCase());
}

function Icon({ name, size = 20 }: { name: "play" | "spark" | "alert" | "reset" | "filter" | "chevron" | "tag" | "bars" | "arrow"; size?: number }) {
  const common = { width: size, height: size, viewBox: "0 0 24 24", fill: "none", stroke: "currentColor", strokeWidth: 1.8, strokeLinecap: "round" as const, strokeLinejoin: "round" as const, "aria-hidden": true };
  if (name === "play") return <svg {...common}><path d="m9 6 8 6-8 6V6Z" /></svg>;
  if (name === "spark") return <svg {...common}><path d="m12 3 1.5 5.5L19 10l-5.5 1.5L12 17l-1.5-5.5L5 10l5.5-1.5L12 3Z" /><path d="m19 16 .7 2.3L22 19l-2.3.7L19 22l-.7-2.3L16 19l2.3-.7L19 16Z" /></svg>;
  if (name === "alert") return <svg {...common}><circle cx="12" cy="12" r="8.5" /><path d="M12 7.5v5.2" /><path d="M12 16.5h.01" /></svg>;
  if (name === "reset") return <svg {...common}><path d="M4.5 10.5a7.5 7.5 0 1 1 2 7.2" /><path d="M4.5 5.5v5h5" /></svg>;
  if (name === "filter") return <svg {...common}><path d="M4 6h16" /><path d="M7 12h10" /><path d="M10 18h4" /></svg>;
  if (name === "chevron") return <svg {...common}><path d="m7 10 5 5 5-5" /></svg>;
  if (name === "tag") return <svg {...common}><path d="M4 5.5V4h5l10 10-5 5L4 9V5.5Z" /><path d="M7.5 7.5h.01" /></svg>;
  if (name === "bars") return <svg {...common}><path d="M5 7h14" /><path d="M5 12h14" /><path d="M5 17h14" /></svg>;
  return <svg {...common}><path d="M5 12h13" /><path d="m13 7 5 5-5 5" /></svg>;
}

function MedicalVisual({ type, accent, soft }: { type: CourseMeta["visual"]; accent: string; soft: string }) {
  return (
    <div className="relative h-[250px] w-[320px] max-w-full">
      <div className="absolute inset-0 rounded-full blur-3xl" style={{ background: soft, opacity: 0.85 }} />
      <div className="absolute left-1/2 top-1/2 flex h-[190px] w-[240px] -translate-x-1/2 -translate-y-1/2 items-center justify-center">
        {type === "blood" && (
          <div className="relative h-[118px] w-[176px] rotate-[-17deg] rounded-[52%] shadow-[0_20px_40px_rgba(143,39,70,0.12)]" style={{ background: `linear-gradient(145deg, ${accent}88, ${accent}, #702038)` }}>
            <div className="absolute inset-[20%_27%] rounded-[50%]" style={{ background: `${accent}b8` }} />
            <div className="absolute left-[12%] top-[12%] h-[30%] w-[26%] rounded-full bg-white/20 blur-sm" />
          </div>
        )}

        {type === "heart" && (
          <svg width="180" height="180" viewBox="0 0 180 180" fill="none">
            <path d="M90 146 43 99c-30-30-13-69 20-69 17 0 27 10 27 10s10-10 27-10c33 0 50 39 20 69l-47 47Z" stroke={accent} strokeWidth="5" strokeLinejoin="round" />
            <path d="M90 47v79M70 83h20M90 64h17M90 103h21" stroke={accent} strokeWidth="4" strokeLinecap="round" opacity=".6" />
          </svg>
        )}

        {type === "lungs" && (
          <svg width="220" height="180" viewBox="0 0 220 180" fill="none">
            <path d="M108 37v43c0 13-8 25-23 34-13 8-34 1-42-12-10-16-2-43 9-63 6-11 15-22 21-25 6 0 8 14 8 26v13" stroke={accent} strokeWidth="5" strokeLinecap="round" strokeLinejoin="round" />
            <path d="M112 37v43c0 13 8 25 23 34 13 8 34 1 42-12 10-16 2-43-9-63-6-11-15-22-21-25-6 0-8 14-8 26v13" stroke={accent} strokeWidth="5" strokeLinecap="round" strokeLinejoin="round" />
            <path d="M110 37v98" stroke={accent} strokeWidth="5" strokeLinecap="round" />
          </svg>
        )}

        {type === "kidney" && (
          <svg width="200" height="180" viewBox="0 0 200 180" fill="none">
            <path d="M115 30c-34 2-57 29-59 61-2 33 17 53 42 51 25-2 39-25 35-48-4-23-18-30-18-49" stroke={accent} strokeWidth="6" strokeLinecap="round" />
            <path d="M96 83c10 2 18 7 23 14" stroke={accent} strokeWidth="4" strokeLinecap="round" opacity=".6" />
          </svg>
        )}

        {type === "gut" && (
          <svg width="220" height="180" viewBox="0 0 220 180" fill="none">
            <path d="M84 37c-8 21 0 25 18 25s27-14 45-9c20 6 15 26-2 32-19 7-47-8-59 7-13 16 4 27 22 26 23-2 42 13 23 27-18 13-50 7-62-8-13-15-15-36-3-53 10-14 25-18 32-18" stroke={accent} strokeWidth="6" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        )}

        {type === "brain" && (
          <svg width="220" height="180" viewBox="0 0 220 180" fill="none">
            <path d="M80 132c-17-4-26-18-22-32-13-10-11-29 2-38-2-17 12-30 29-28 8-16 33-19 44-4 17-6 34 7 34 25 15 9 16 29 4 41 5 18-9 35-27 36-11 9-30 8-40 0Z" stroke={accent} strokeWidth="5" strokeLinejoin="round" />
            <path d="M91 53c12 12 13 24 7 37-5 10-1 22 9 29M126 43c-6 12-3 23 8 31 11 8 12 20 7 30M65 83c10 3 16 10 16 21M144 78c-4 7-4 15 2 21" stroke={accent} strokeWidth="4" strokeLinecap="round" opacity=".58" />
          </svg>
        )}

        {type === "thyroid" && (
          <svg width="220" height="180" viewBox="0 0 220 180" fill="none">
            <path d="M110 43v94" stroke={accent} strokeWidth="5" strokeLinecap="round" />
            <path d="M107 72c-18-16-43-9-48 12-5 22 10 39 34 39 15 0 25-10 25-24 0-12-5-20-11-27Z" stroke={accent} strokeWidth="6" strokeLinejoin="round" />
            <path d="M113 72c18-16 43-9 48 12 5 22-10 39-34 39-15 0-25-10-25-24 0-12 5-20 11-27Z" stroke={accent} strokeWidth="6" strokeLinejoin="round" />
          </svg>
        )}

        {type === "bug" && (
          <svg width="200" height="180" viewBox="0 0 200 180" fill="none">
            <circle cx="100" cy="88" r="28" stroke={accent} strokeWidth="5" />
            <path d="M100 60V34M100 116v26M72 88H43M128 88h29M80 68 60 49M120 68l20-19M80 108l-20 19M120 108l20 19" stroke={accent} strokeWidth="5" strokeLinecap="round" />
            <path d="M88 76c8 7 16 7 24 0M88 100c8-7 16-7 24 0" stroke={accent} strokeWidth="4" strokeLinecap="round" opacity=".6" />
          </svg>
        )}
      </div>
    </div>
  );
}

export default function PracticeCoursePage({ course, cases }: Props) {
  const router = useRouter();
  const meta = courseMeta[course];
  const [mode, setMode] = useState<PracticeMode>("unattempted");
  const [difficulty, setDifficulty] = useState<DifficultyFilter>("all");
  const [selectedTags, setSelectedTags] = useState<string[]>([]);
  const [tagsOpen, setTagsOpen] = useState(false);

  const allTags = useMemo(() => {
    const tags = new Set<string>();
    for (const caseData of cases) for (const tag of caseData.tags) tags.add(tag);
    return [...tags].sort((a, b) => a.localeCompare(b));
  }, [cases]);

  const modeCounts = useMemo(() => {
    const counts: Record<PracticeMode, number> = { continue: 0, unattempted: 0, mistakes: 0, "start-over": cases.length };
    for (const caseData of cases) {
      const state = readCaseState(course, caseData.id);
      if (state === null) counts.unattempted += 1;
      else if (state.completed && state.won === false) counts.mistakes += 1;
      else if (!state.completed) counts.continue += 1;
    }
    return counts;
  }, [cases, course]);

  const filteredCases = useMemo(() => cases.filter((caseData) => {
    if (difficulty !== "all" && caseData.difficulty !== difficulty) return false;
    if (selectedTags.length > 0 && !selectedTags.some((tag) => caseData.tags.includes(tag))) return false;
    const state = readCaseState(course, caseData.id);
    if (mode === "unattempted") return state === null;
    if (mode === "mistakes") return state?.completed === true && state.won === false;
    if (mode === "continue") return state !== null && state.completed === false;
    return true;
  }), [cases, course, difficulty, mode, selectedTags]);

  const difficultyCounts = useMemo(() => {
    const counts: Record<DifficultyFilter, number> = { easy: 0, medium: 0, hard: 0, all: cases.length };
    for (const caseData of cases) counts[caseData.difficulty] += 1;
    return counts;
  }, [cases]);

  function toggleTag(tag: string) {
    setSelectedTags((current) => current.includes(tag) ? current.filter((item) => item !== tag) : [...current, tag]);
  }

  function startPractice() {
    if (filteredCases.length === 0) return;
    if (mode === "start-over") clearCourseProgress(course, cases);
    const selectedCase = filteredCases[Math.floor(Math.random() * filteredCases.length)];
    const params = new URLSearchParams({ mode, difficulty });
    if (selectedTags.length > 0) params.set("tags", selectedTags.join(","));
    router.push(`/practice/${course}/${selectedCase.id}?${params.toString()}`);
  }

  return (
    <main dir="rtl" className="min-h-screen bg-[#fcfcfd] text-[#12233f]">
      <div className="mx-auto w-full max-w-[1320px] px-6 pb-16">
        {/* HERO */}
        <section className="grid min-h-[470px] items-center gap-8 pt-10 lg:grid-cols-[0.95fr_1.05fr] lg:pt-0">
          <div className="order-1 lg:order-2">
            <div className="text-sm font-medium text-[#7487a5]">تمرین</div>
            <div className="mt-3 h-[3px] w-10" style={{ backgroundColor: meta.accent }} />
            <h1 className="mt-5 text-[42px] font-bold leading-[1.3] tracking-[-0.03em] sm:text-[54px]">{meta.label}</h1>
            <p className="mt-4 max-w-[700px] text-[18px] leading-8 text-[#7184a3]">با کیس‌های واقعی، دانش خود را عمیق‌تر کنید و برای چالش‌های بالینی آماده‌تر شوید.</p>

            <div className="mt-12 flex flex-wrap items-center gap-x-8 gap-y-5 border-t border-[#edf0f4] pt-6">
              <Stat value={cases.length.toLocaleString("fa-IR")} label="تعداد کل کیس‌ها" accent="#3d78c8" />
              <Stat value={modeCounts.continue.toLocaleString("fa-IR")} label="نیمه‌کاره" accent="#168d71" />
              <Stat value={`${Math.round(((cases.length - modeCounts.unattempted) / Math.max(cases.length, 1)) * 100).toLocaleString("fa-IR")}٪`} label="پیشرفت" accent={meta.accent} progress />
            </div>
          </div>

          <div className="order-2 flex items-center justify-center lg:order-1">
            <MedicalVisual type={meta.visual} accent={meta.accent} soft={meta.soft} />
          </div>
        </section>

        {/* MODES */}
        <section>
          <div className="mb-5 flex items-end justify-between gap-4">
            <h2 className="text-[25px] font-bold">حالت تمرین را انتخاب کنید</h2>
            <span className="hidden text-sm text-[#7b8ea9] sm:block">همان هدف، مسیر متفاوت</span>
          </div>

          <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
            {modeOptions.map((option) => {
              const selected = mode === option.id;
              return (
                <button
                  key={option.id}
                  type="button"
                  onClick={() => setMode(option.id)}
                  className={`relative min-h-[154px] rounded-[20px] border p-5 text-right transition ${selected ? "bg-white shadow-[0_10px_28px_rgba(18,35,63,0.07)]" : "bg-white/70 hover:bg-white hover:shadow-[0_8px_22px_rgba(18,35,63,0.045)]"}`}
                  style={{ borderColor: selected ? `${meta.accent}66` : "#e9edf2" }}
                >
                  <div className="flex items-start justify-between gap-3">
                    <div className="flex h-11 w-11 items-center justify-center rounded-[14px]" style={{ background: meta.soft, color: meta.accent }}>
                      <Icon name={option.icon} size={21} />
                    </div>
                    <span className="rounded-full bg-[#f6f7f9] px-2.5 py-1 text-[11px] font-semibold text-[#7e8ca1]">{modeCounts[option.id].toLocaleString("fa-IR")}</span>
                  </div>
                  <div className="mt-6 text-[17px] font-bold">{option.title}</div>
                  <p className="mt-1 text-[13px] leading-6 text-[#7486a1]">{option.subtitle}</p>
                  <div className="absolute bottom-5 left-5 text-[#9aa7b9]"><Icon name="arrow" size={18} /></div>
                </button>
              );
            })}
          </div>
        </section>

        {/* FILTERS */}
        <section className="mt-14">
          <div className="mb-5 flex items-end justify-between gap-4">
            <h2 className="text-[25px] font-bold">تنظیمات تمرین</h2>
            <span className="hidden text-sm text-[#7b8ea9] sm:block">کیس‌ها را بر اساس نیاز خود محدود کنید</span>
          </div>

          <div className="rounded-[22px] border border-[#e8ecf1] bg-white px-5 py-4 shadow-[0_7px_24px_rgba(18,35,63,0.025)]">
            <div className="flex flex-col gap-5 lg:flex-row lg:items-center">
              <div className="flex-1">
                <div className="mb-3 flex items-center gap-2 text-sm font-semibold"><Icon name="filter" size={17} /><span>سطح دشواری</span></div>
                <div className="flex flex-wrap gap-2">
                  {difficultyOptions.map((option) => {
                    const selected = difficulty === option.id;
                    return (
                      <button key={option.id} type="button" onClick={() => setDifficulty(option.id)} className="rounded-full border px-4 py-2 text-sm transition" style={selected ? { borderColor: meta.accent, background: meta.accent, color: "white" } : { borderColor: "#e3e8ee", color: "#657792" }}>
                        {option.title}<span className="mr-1.5 text-[11px] opacity-70">{difficultyCounts[option.id].toLocaleString("fa-IR")}</span>
                      </button>
                    );
                  })}
                </div>
              </div>

              <div className="hidden h-14 w-px bg-[#edf0f4] lg:block" />

              <div className="flex-[1.15]">
                <button type="button" onClick={() => setTagsOpen((value) => !value)} className="flex w-full items-center gap-3 text-right">
                  <span className="flex h-9 w-9 items-center justify-center rounded-xl bg-[#f7f8fa] text-[#788aa4]"><Icon name="tag" size={17} /></span>
                  <span className="flex-1"><span className="block text-sm font-semibold">برچسب‌ها</span><span className="mt-0.5 block text-xs text-[#8a98ac]">{selectedTags.length ? `${selectedTags.length.toLocaleString("fa-IR")} برچسب انتخاب شده` : "همه برچسب‌ها"}</span></span>
                  <Icon name="chevron" size={18} />
                </button>
                {tagsOpen && (
                  <div className="mt-4 rounded-2xl bg-[#fafbfd] p-3">
                    <div className="flex flex-wrap gap-2">
                      {allTags.map((tag) => {
                        const selected = selectedTags.includes(tag);
                        return <button key={tag} type="button" onClick={() => toggleTag(tag)} className="rounded-full border px-3 py-2 text-xs font-semibold transition" style={selected ? { borderColor: `${meta.accent}66`, color: meta.accent, background: meta.soft } : { borderColor: "#e6eaf0", color: "#687a95", background: "white" }}>{formatTag(tag)}</button>;
                      })}
                    </div>
                    {selectedTags.length > 0 && <button type="button" onClick={() => setSelectedTags([])} className="mt-3 text-xs font-semibold text-[#8b98ab]">پاک کردن همه برچسب‌ها</button>}
                  </div>
                )}
              </div>
            </div>
          </div>
        </section>

        {/* CTA */}
        <section className="mt-8">
          <button
            type="button"
            onClick={startPractice}
            disabled={filteredCases.length === 0}
            className="group relative flex w-full items-center justify-between overflow-hidden rounded-[22px] px-7 py-6 text-white shadow-[0_16px_34px_rgba(18,35,63,0.13)] transition hover:shadow-[0_18px_40px_rgba(18,35,63,0.16)] disabled:cursor-not-allowed disabled:bg-[#c8ced7] disabled:shadow-none"
            style={filteredCases.length > 0 ? { background: meta.accent } : undefined}
          >
            <div className="relative z-10 flex items-center gap-4">
              <div className="flex h-14 w-14 items-center justify-center rounded-full bg-white" style={{ color: meta.accent }}><Icon name="play" size={24} /></div>
              <div className="text-right">
                <div className="text-[25px] font-bold">شروع تمرین</div>
                <div className="mt-1 text-sm text-white/70">{filteredCases.length > 0 ? `${filteredCases.length.toLocaleString("fa-IR")} کیس مطابق انتخاب شما آماده است.` : "کیسی مطابق فیلترهای فعلی پیدا نشد."}</div>
              </div>
            </div>
            <div className="relative z-10 flex h-11 w-11 items-center justify-center rounded-full bg-white" style={{ color: meta.accent }}><Icon name="arrow" size={20} /></div>
            <div className="absolute -left-16 -bottom-20 h-44 w-44 rounded-full bg-white/[0.05]" />
            <div className="absolute left-[32%] -top-20 h-44 w-44 rounded-full bg-white/[0.04]" />
          </button>
        </section>
      </div>
    </main>
  );
}

function Stat({ value, label, accent, progress = false }: { value: string; label: string; accent: string; progress?: boolean }) {
  return (
    <div className="flex items-center gap-3">
      {progress ? (
        <div className="relative h-12 w-12">
          <div className="absolute inset-0 rounded-full border-[5px] border-[#e8edf2]" />
          <div className="absolute inset-0 rounded-full border-[5px] border-transparent" style={{ borderTopColor: accent, borderRightColor: accent, transform: "rotate(-35deg)" }} />
        </div>
      ) : (
        <div className="flex h-11 w-11 items-center justify-center rounded-full" style={{ background: `${accent}12`, color: accent }}><span className="text-base font-bold">+</span></div>
      )}
      <div>
        <div className="text-[23px] font-bold">{value}</div>
        <div className="mt-0.5 text-xs text-[#7b8da8]">{label}</div>
      </div>
    </div>
  );
}
