"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { getMasterCaseBank } from "../../data/courseBanks";

type Specialty = {
  key: "pulmonology" | "cardiology" | "nephrology" | "neurology" | "gastroenterology" | "endocrinology" | "rheumatology" | "infectious-disease" | "psychiatry" | "pediatrics" | "hematology-oncology";
  name: string;
  description: string;
  progress: number;
  icon: "lungs" | "heart" | "kidney" | "brain" | "stomach" | "thyroid" | "rheumatology" | "infectious" | "psychiatry" | "pediatrics" | "hematology-oncology";
  tone: string;
  available: boolean;
};

const specialties: Specialty[] = [
  { key: "pulmonology", name: "ریه", description: "پزشکی تنفسی", progress: 0, icon: "lungs", tone: "bg-slate-100 text-[#4c7194]" , available: true },
  { key: "cardiology", name: "قلب و عروق", description: "بیماری‌های قلب و عروق", progress: 0, icon: "heart", tone: "bg-[#f8eff2] text-[#8b3f53]" , available: true },
  { key: "nephrology", name: "کلیه", description: "بیماری‌های کلیه", progress: 0, icon: "kidney", tone: "bg-rose-50 text-rose-600" , available: true },
  { key: "neurology", name: "نورولوژی", description: "مغز و سیستم عصبی", progress: 0, icon: "brain", tone: "bg-violet-50 text-violet-600" , available: false },
  { key: "gastroenterology", name: "گوارش", description: "دستگاه گوارش", progress: 0, icon: "stomach", tone: "bg-[#f2f5ef] text-[#6b7f5a]" , available: true },
  { key: "endocrinology", name: "غدد", description: "هورمون‌ها و متابولیسم", progress: 0, icon: "thyroid", tone: "bg-amber-50 text-amber-600" , available: true },
  { key: "rheumatology", name: "روماتولوژی", description: "بیماری‌های روماتولوژیک", progress: 0, icon: "rheumatology", tone: "bg-pink-50 text-pink-600" , available: false },
  { key: "infectious-disease", name: "عفونی", description: "بیماری‌های عفونی", progress: 0, icon: "infectious", tone: "bg-emerald-50 text-emerald-600" , available: false },
  { key: "psychiatry", name: "روان‌پزشکی", description: "اختلالات روانی و رفتاری", progress: 0, icon: "psychiatry", tone: "bg-violet-50 text-violet-600" , available: false },
  { key: "pediatrics", name: "اطفال", description: "بیماری‌های کودکان", progress: 0, icon: "pediatrics", tone: "bg-sky-50 text-sky-600" , available: false },
  { key: "hematology-oncology", name: "هماتولوژی و انکولوژی", description: "بیماری‌های خون و سرطان", progress: 0, icon: "hematology-oncology", tone: "bg-[#f8eff2] text-[#8b3f53]" , available: true },
];

const orderedSpecialties = [...specialties].sort((a, b) => Number(b.available) - Number(a.available));

function CourseIcon({ name, unavailable = false }: { name: Specialty["icon"]; unavailable?: boolean }) {
  return (
    <img
      src={`/icons/courses/${name}.png`}
      alt=""
      aria-hidden="true"
      className={`h-6 w-6 object-contain ${unavailable ? "opacity-60 grayscale" : ""}`}
      draggable={false}
    />
  );
}

export default function PracticePage() {
  const [progressByCourse, setProgressByCourse] = useState<Record<Specialty["key"], number>>(
    () => Object.fromEntries(specialties.map((specialty) => [specialty.key, specialty.progress])) as Record<Specialty["key"], number>,
  );

  useEffect(() => {
    const refreshProgress = () => {
      const allCases = getMasterCaseBank();
      const next: Record<Specialty["key"], number> = { ...progressByCourse };

      for (const specialty of specialties) {
        const courseCases = allCases.filter((item) => item.course === specialty.key);
        if (courseCases.length === 0) {
          next[specialty.key] = 0;
          continue;
        }

        let completed = 0;
        for (const caseData of courseCases) {
          try {
            const raw = window.localStorage.getItem(`sonic:practice:${specialty.key}:${caseData.id}`);
            if (!raw) continue;
            const state = JSON.parse(raw) as { completed?: boolean };
            if (state.completed === true) completed += 1;
          } catch {
            // Ignore one malformed progress entry and continue counting the rest.
          }
        }

        next[specialty.key] = Math.round((completed / courseCases.length) * 100);
      }

      setProgressByCourse(next);
    };

    refreshProgress();

    const handleStorage = () => refreshProgress();
    const handlePracticeProgress = () => refreshProgress();

    window.addEventListener("storage", handleStorage);
    window.addEventListener("sonic:practice-progress-updated", handlePracticeProgress);

    return () => {
      window.removeEventListener("storage", handleStorage);
      window.removeEventListener("sonic:practice-progress-updated", handlePracticeProgress);
    };
  }, []);

  return (
    <main className="min-h-screen bg-[#fbfaf8] text-[#10213f]">


      <div className="mx-auto max-w-[1180px] px-5 pb-16 pt-10 lg:px-8 lg:pt-12">
        <div className="flex flex-col gap-5">
          <div className="text-right">
            <h1 className="text-[34px] font-semibold tracking-[-0.035em] sm:text-[40px]">یک تخصص را انتخاب کن</h1>
            <p className="mt-2 max-w-[650px] text-[15px] leading-6 text-slate-600">کیس‌های بالینی را بر اساس تخصص تمرین کن و روی حوزه‌ای که می‌خواهی بهتر شوی تمرکز کن.</p>
          </div>
        </div>

        <section className="mt-9 grid gap-4 md:grid-cols-2 lg:grid-cols-3">
          {orderedSpecialties.map((specialty) => {
            const card = (
              <div
                className={`group relative rounded-2xl border p-6 shadow-[0_6px_20px_rgba(15,23,42,0.03)] ${
                  specialty.available
                    ? "border-slate-200 bg-white transition hover:-translate-y-0.5 hover:border-slate-300 hover:shadow-[0_10px_28px_rgba(15,23,42,0.06)]"
                    : "border-slate-200/80 bg-slate-50/75 grayscale-[0.35] opacity-[0.72]"
                }`}
              >
                {!specialty.available && (
                  <div className="absolute left-5 top-5 rounded-full border border-slate-200 bg-white/90 px-2.5 py-1 text-[11px] font-medium text-slate-400">
                    به‌زودی
                  </div>
                )}

                <div className="flex items-start justify-between">
                  <div
                    className={`flex h-11 w-11 items-center justify-center rounded-full ${
                      specialty.available ? specialty.tone : "bg-slate-100"
                    }`}
                  >
                    <CourseIcon name={specialty.icon} unavailable={!specialty.available} />
                  </div>
                  <span className={`text-sm font-medium ${specialty.available ? "text-slate-400" : "text-slate-300"}`}>
                    {progressByCourse[specialty.key] ?? specialty.progress}%
                  </span>
                </div>

                <h2 className={`mt-6 text-[18px] font-semibold ${specialty.available ? "text-[#10213f]" : "text-slate-500"}`}>
                  {specialty.name}
                </h2>
                <p className={`mt-1 text-sm ${specialty.available ? "text-slate-500" : "text-slate-400"}`}>
                  {specialty.description}
                </p>

                <div className={`mt-5 h-1.5 overflow-hidden rounded-full ${specialty.available ? "bg-slate-100" : "bg-slate-200"}`}>
                  <div
                    className={`h-full rounded-full ${specialty.available ? "bg-slate-800" : "bg-slate-300"}`}
                    style={{ width: `${progressByCourse[specialty.key] ?? specialty.progress}%` }}
                  />
                </div>

                <div className={`mt-5 flex items-center justify-between text-sm font-medium ${
                  specialty.available
                    ? specialty.key === "pulmonology" ? "text-[#4c7194]"
                    : specialty.key === "cardiology" ? "text-[#8b3f53]"
                    : specialty.key === "nephrology" ? "text-rose-700"
                    : specialty.key === "gastroenterology" ? "text-[#6b7f5a]"
                    : specialty.key === "endocrinology" ? "text-amber-700"
                    : specialty.key === "hematology-oncology" ? "text-red-700"
                    : "text-slate-600"
                    : "text-slate-400"
                }`}>
                  <span>{specialty.available ? "تمرین" : "در حال آماده‌سازی"}</span>
                </div>
              </div>
            );

            if (!specialty.available) {
              return <div key={specialty.name}>{card}</div>;
            }

            const routes: Record<string, string> = {
              pulmonology: "/practice/pulmonology",
              cardiology: "/practice/cardiology",
              nephrology: "/practice/nephrology",
              gastroenterology: "/practice/gastroenterology",
              endocrinology: "/practice/endocrinology",
              "hematology-oncology": "/practice/hematology-oncology",
            };

            const href = routes[specialty.key];
            return href
              ? <Link key={specialty.name} href={href} className="block">{card}</Link>
              : <div key={specialty.name}>{card}</div>;
          })}
        </section>

      </div>

      <footer className="border-t border-slate-200 bg-white">
        <div className="mx-auto grid max-w-[1180px] gap-9 px-5 py-11 sm:grid-cols-2 lg:grid-cols-4 lg:px-8">
          <div>
            <div className="text-[26px] tracking-[-0.03em]">SONIC</div>
            <p className="mt-3 max-w-[250px] text-sm leading-6 text-slate-600">مهارت استدلال بالینی‌ات را تقویت کن.<br />پزشک بهتری شو.</p>
          </div>
          <div><h4 className="text-xs font-semibold uppercase tracking-[0.16em]">محصول</h4><div className="mt-4 space-y-2 text-sm text-slate-600"><p>کیس‌ها</p><p>تخصص‌ها</p><p>حالت بالینی</p><p>نحوه کار</p></div></div>
          <div><h4 className="text-xs font-semibold uppercase tracking-[0.16em]">حساب کاربری</h4><div className="mt-4 space-y-2 text-sm text-slate-600"><p>پروفایل</p><p>پیشرفت</p><p>تنظیمات</p><p>خروج</p></div></div>
          <div><h4 className="text-xs font-semibold uppercase tracking-[0.16em]">پشتیبانی</h4><div className="mt-4 space-y-2 text-sm text-slate-600"><p>مرکز راهنما</p><p>تماس با ما</p><p>بازخورد</p><p>گزارش مشکل</p></div></div>
        </div>
      </footer>
    </main>
  );
}
