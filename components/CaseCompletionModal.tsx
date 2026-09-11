"use client";

import { useMemo } from "react";
import type { Case } from "../types/case";
import { getMasterCaseBank } from "../data/courseBanks";

const COURSE_LABELS: Record<Case["course"], string> = {
  pulmonology: "ریه",
  cardiology: "قلب و عروق",
  gastroenterology: "گوارش",
  neurology: "نورولوژی",
  "infectious-disease": "عفونی",
  nephrology: "نفرولوژی",
  endocrinology: "غدد",
  "hematology-oncology": "هماتولوژی و انکولوژی",
};

type Props = {
  caseData: Case;
  won: boolean;
  guessCount: number;
  onContinue: () => void;
  onReview: () => void;
};

function readCompletedCount(course: Case["course"], cases: Case[]) {
  if (typeof window === "undefined") return 0;
  return cases.filter((item) => {
    try {
      const raw = window.localStorage.getItem(`sonic:practice:${course}:${item.id}`);
      return raw ? JSON.parse(raw)?.completed === true : false;
    } catch {
      return false;
    }
  }).length;
}

export default function CaseCompletionModal({ caseData, won, guessCount, onContinue, onReview }: Props) {
  const courseCases = useMemo(
    () => getMasterCaseBank([caseData]).filter((item) => item.course === caseData.course),
    [caseData],
  );

  const completedCount = Math.max(
    readCompletedCount(caseData.course, courseCases),
    1,
  );
  const progress = Math.round((completedCount / Math.max(courseCases.length, 1)) * 100);

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-950/30 px-4 py-6 backdrop-blur-[2px]" dir="rtl">
      <section
        role="dialog"
        aria-modal="true"
        aria-labelledby="case-complete-title"
        className="w-full max-w-[520px] overflow-hidden rounded-[24px] border border-slate-200 bg-white shadow-[0_24px_80px_rgba(15,23,42,0.16)]"
      >
        <div className="px-6 pb-5 pt-7 sm:px-8 sm:pt-8">
          <div className="flex items-start justify-between gap-4">
            <div>
              <div className="text-[11px] font-bold tracking-[0.16em] text-slate-400">CASE COMPLETE</div>
              <h1 id="case-complete-title" className="mt-2 text-2xl font-extrabold tracking-tight text-slate-950">
                {won ? "تشخیص درست بود" : "کیس تمام شد"}
              </h1>
              <p className="mt-2 text-sm leading-7 text-slate-500">
                {won ? "آفرین؛ تشخیص نهایی را درست انتخاب کردی." : "حدس‌ها تمام شد. حالا می‌توانی پاسخ کامل کیس را مرور کنی."}
              </p>
            </div>
            <div className={`flex h-11 w-11 shrink-0 items-center justify-center rounded-full border text-lg font-black ${won ? "border-emerald-200 bg-emerald-50 text-emerald-700" : "border-amber-200 bg-amber-50 text-amber-700"}`}>
              {won ? "✓" : "!"}
            </div>
          </div>

          <div className="mt-6 rounded-2xl border border-slate-200 bg-slate-50 px-4 py-4">
            <div className="text-xs font-semibold text-slate-400">تشخیص درست</div>
            <div className="mt-1 text-base font-extrabold text-slate-950">{caseData.diagnosis.name}</div>
            <div className="mt-3 flex items-center justify-between text-xs text-slate-500">
              <span>تعداد حدس‌ها</span>
              <span className="font-bold text-slate-700">{guessCount} / 4</span>
            </div>
          </div>

          <div className="mt-5">
            <div className="flex items-end justify-between gap-4">
              <div>
                <div className="text-xs font-semibold text-slate-400">پیشرفت دوره</div>
                <div className="mt-1 text-sm font-bold text-slate-800">{COURSE_LABELS[caseData.course]}</div>
              </div>
              <div className="text-left text-sm font-extrabold text-slate-800">{completedCount} / {courseCases.length}</div>
            </div>
            <div className="mt-3 h-2 overflow-hidden rounded-full bg-slate-100">
              <div className="h-full rounded-full bg-slate-800 transition-all" style={{ width: `${progress}%` }} />
            </div>
          </div>
        </div>

        <div className="flex flex-col-reverse gap-2 border-t border-slate-100 bg-white px-6 py-5 sm:flex-row sm:justify-between sm:px-8">
          <button
            type="button"
            onClick={onContinue}
            className="inline-flex min-h-11 items-center justify-center rounded-xl border border-slate-200 px-5 text-sm font-bold text-slate-600 transition hover:border-slate-300 hover:bg-slate-50"
          >
            ادامه به کیس بعدی
          </button>
          <button
            type="button"
            onClick={onReview}
            className="inline-flex min-h-11 items-center justify-center rounded-xl bg-slate-900 px-5 text-sm font-bold text-white transition hover:bg-slate-800"
          >
            درباره تشخیص بیشتر بدان
            <span aria-hidden="true" className="mr-2">←</span>
          </button>
        </div>
      </section>
    </div>
  );
}
