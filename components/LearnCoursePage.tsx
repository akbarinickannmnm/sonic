"use client";

import Link from "next/link";
import { useMemo, useState } from "react";
import { getMasterCaseBank } from "../data/courseBanks";
import type { Course, Difficulty } from "../types/case";

const courseMeta: Record<Course, { label: string; subtitle: string; accent: string }> = {
  pulmonology: { label: "ریه", subtitle: "تنفس و بیماری‌های دستگاه تنفسی", accent: "#4c7194" },
  cardiology: { label: "قلب و عروق", subtitle: "قلب، عروق و بیماری‌های قلبی", accent: "#8b3f53" },
  nephrology: { label: "نفرولوژی", subtitle: "کلیه، مایعات و اختلالات الکترولیت", accent: "#15919a" },
  gastroenterology: { label: "گوارش", subtitle: "دستگاه گوارش و بیماری‌های آن", accent: "#6b7f5a" },
  endocrinology: { label: "غدد", subtitle: "هورمون‌ها، متابولیسم و غدد درون‌ریز", accent: "#6d5b8c" },
  "hematology-oncology": { label: "هماتولوژی و انکولوژی", subtitle: "خون، مغز استخوان و سرطان", accent: "#8f2746" },
  neurology: { label: "نورولوژی", subtitle: "مغز، اعصاب و سیستم عصبی", accent: "#7656c8" },
  "infectious-disease": { label: "عفونی", subtitle: "بیماری‌های عفونی و سیستم ایمنی", accent: "#249374" },
};

function difficultyLabel(value: Difficulty) {
  return value === "easy" ? "آسان" : value === "medium" ? "متوسط" : "سخت";
}

function difficultyTone(value: Difficulty) {
  return value === "easy"
    ? "bg-emerald-50 text-emerald-700"
    : value === "medium"
      ? "bg-amber-50 text-amber-700"
      : "bg-rose-50 text-rose-700";
}

const difficultyFilters: Array<{ value: "all" | Difficulty; label: string }> = [
  { value: "all", label: "همه" },
  { value: "easy", label: "آسان" },
  { value: "medium", label: "متوسط" },
  { value: "hard", label: "سخت" },
];

export default function LearnCoursePage({ course }: { course: Course }) {
  const meta = courseMeta[course];
  const allCases = getMasterCaseBank().filter((item) => item.course === course);
  const [difficulty, setDifficulty] = useState<"all" | Difficulty>("all");

  const cases = useMemo(
    () => difficulty === "all" ? allCases : allCases.filter((item) => item.difficulty === difficulty),
    [allCases, difficulty],
  );

  return (
    <main dir="rtl" className="min-h-screen bg-[#fbf8f2] text-[#172033]">
      <div className="sonic-fixed-container pb-16 pt-8 lg:pt-10">
        <Link href="/learn" className="inline-flex items-center text-[13px] font-semibold text-[#748194] hover:text-[#172033]">
          → بازگشت به درس‌ها
        </Link>

        <header className="mt-5 rounded-[26px] border border-[#e7e4de] bg-white px-6 py-7 shadow-[0_10px_30px_rgba(18,35,63,0.035)] sm:px-8">
          <div className="text-[11px] font-semibold tracking-[0.14em] text-[#a0a7b2]">CASE SELECTION</div>
          <h1 className="mt-2 text-[32px] font-bold sm:text-[38px]">{meta.label}</h1>
          <p className="mt-2 text-[14px] leading-7 text-[#718096]">{meta.subtitle}</p>
          <div className="mt-5 flex items-center gap-2 text-[12px] font-semibold" style={{ color: meta.accent }}>
            <span>{allCases.length.toLocaleString("fa-IR")} کیس برای مطالعه</span>
            <span className="text-[#c6cbd2]">·</span>
            <span>با انتخاب هر کیس وارد Review کامل آن می‌شوی</span>
          </div>
        </header>

        <section className="mt-6">
          <div className="mb-4 flex flex-col gap-3 sm:flex-row sm:items-end sm:justify-between">
            <div>
              <div className="text-[11px] font-semibold tracking-[0.12em] text-[#a0a7b2]">CASES</div>
              <h2 className="mt-1 text-[20px] font-bold">انتخاب کیس</h2>
            </div>

            <div className="flex items-center gap-1 rounded-[14px] border border-[#e3e4e1] bg-white p-1 shadow-[0_4px_14px_rgba(18,35,63,0.025)]">
              {difficultyFilters.map((filter) => {
                const active = difficulty === filter.value;
                return (
                  <button
                    key={filter.value}
                    type="button"
                    onClick={() => setDifficulty(filter.value)}
                    className={`rounded-[10px] px-3.5 py-2 text-[11px] font-bold transition ${
                      active
                        ? "bg-[#172033] text-white shadow-sm"
                        : "text-[#7d8998] hover:bg-[#f5f6f7] hover:text-[#24364f]"
                    }`}
                    aria-pressed={active}
                  >
                    {filter.label}
                  </button>
                );
              })}
            </div>
          </div>

          <div className="mb-3 text-[12px] font-semibold text-[#8a96a7]">
            {cases.length.toLocaleString("fa-IR")} مورد
          </div>

          {cases.length === 0 ? (
            <div className="rounded-[20px] border border-dashed border-[#dcdedb] bg-white px-6 py-8 text-center text-sm leading-7 text-[#7a889d]">
              برای این سطح سختی در این درس کیسی ثبت نشده است.
            </div>
          ) : (
            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
              {cases.map((caseData, index) => (
                <Link
                  key={caseData.id}
                  href={`/learn/${course}/${encodeURIComponent(caseData.id)}`}
                  className="group flex h-[190px] w-full flex-col rounded-[20px] border border-[#e7e4de] bg-white p-5 shadow-[0_6px_18px_rgba(18,35,63,0.022)] transition duration-200 hover:-translate-y-0.5 hover:border-[#d8dcd9] hover:shadow-[0_12px_28px_rgba(18,35,63,0.05)]"
                >
                  <div className="flex h-full flex-col">
                    <div className="flex items-center justify-between gap-2">
                      <div className="flex items-center gap-2 text-[11px] font-medium text-[#929baa]">
                        <span>{caseData.patient.age.toLocaleString("fa-IR")} سال</span>
                        <span className="text-[#c8cdd4]">·</span>
                        <span>{caseData.patient.sex === "female" ? "زن" : "مرد"}</span>
                      </div>
                      <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-[11px] bg-[#f4f5f6] text-[11px] font-bold text-[#7f8b9d]">
                        {String(index + 1).padStart(2, "0")}
                      </div>
                    </div>

                    <div className="flex flex-1 flex-col items-center justify-center text-center">
                      <h3 className="text-[16px] font-bold leading-7 text-[#24364f]">
                        {caseData.diagnosis.name}
                      </h3>
                      <div className="mt-1.5 text-[11px] font-medium leading-5 text-[#98a1ad]">
                        {caseData.title}
                      </div>
                    </div>

                    <div className="flex items-center justify-between gap-2">
                      <span className={`rounded-full px-2.5 py-1 text-[10px] font-bold ${difficultyTone(caseData.difficulty)}`}>
                        {difficultyLabel(caseData.difficulty)}
                      </span>
                      <span className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-[#f6f7f8] text-[12px] text-[#8f99a8] transition group-hover:-translate-x-1" aria-hidden="true">
                        ←
                      </span>
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          )}
        </section>
      </div>
    </main>
  );
}
