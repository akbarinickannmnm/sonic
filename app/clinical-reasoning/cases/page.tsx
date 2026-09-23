"use client";

import { useRouter } from "next/navigation";
import { clinicalReasoningCases } from "../../../data/clinicalReasoningCases";

function Chevron() {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" aria-hidden="true">
      <path d="M15 5l-7 7 7 7" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

const difficultyLabel = {
  easy: "آسان",
  medium: "متوسط",
  hard: "سخت",
} as const;

export default function ClinicalReasoningCasesPage() {
  const router = useRouter();

  return (
    <main dir="rtl" className="min-h-screen bg-[#fbf8f2] text-slate-900">
      <section className="mx-auto max-w-[1180px] px-5 pb-12 pt-8 lg:px-8">
        <div className="flex items-end justify-between gap-5 border-b border-[#e7e3dc] pb-6">
          <div>
            <p className="text-[11px] font-semibold tracking-[0.2em] text-slate-400">استدلال بالینی</p>
            <h1 className="mt-2 text-[30px] font-semibold tracking-[-0.02em]">کیس‌ها</h1>
            <p className="mt-2 max-w-[620px] text-[14px] leading-6 text-slate-500">
              کیس را خودت انتخاب کن و سرنخ‌ها را مرحله‌به‌مرحله کنار هم بگذار.
            </p>
          </div>

          <button
            type="button"
            onClick={() => router.push("/clinical-reasoning")}
            className="shrink-0 rounded-xl border border-[#ddd8d0] bg-white px-4 py-2.5 text-sm font-semibold text-slate-600 transition hover:bg-slate-50"
          >
            بازگشت
          </button>
        </div>

        <div className="mt-7 grid grid-cols-1 gap-4 md:grid-cols-2">
          {clinicalReasoningCases.map((item, index) => (
            <button
              key={item.id}
              type="button"
              onClick={() => router.push(`/clinical-reasoning/cases/${encodeURIComponent(item.id)}`)}
              className="group rounded-[20px] border border-[#e7e3dc] bg-white p-5 text-right shadow-[0_4px_18px_rgba(15,23,42,0.035)] transition hover:-translate-y-[1px] hover:shadow-[0_10px_28px_rgba(15,23,42,0.07)]"
            >
              <div className="flex min-h-[148px] flex-col">
                  <div className="flex items-center justify-between gap-3">
                    <span className="text-[11px] font-semibold tracking-[0.14em] text-slate-400">CASE {String(index + 1).padStart(2, "0")}</span>
                    <span className="rounded-full bg-[#f5f1ea] px-2.5 py-1 text-[11px] font-medium text-slate-500">
                      {difficultyLabel[item.difficulty]}
                    </span>
                  </div>

                  <h2 className="mt-3 text-[18px] font-semibold leading-8 text-slate-900">{item.title}</h2>
                  <p className="mt-1 line-clamp-2 text-[13px] leading-6 text-slate-500">{item.presentation}</p>

                  <div className="mt-auto flex items-center justify-between pt-4 text-[12px] font-medium text-slate-400">
                    <span>{item.patient.age} سال</span>
                    <span className="flex items-center gap-1.5 text-slate-500 transition group-hover:text-slate-800">
                      شروع کیس
                      <Chevron />
                    </span>
                  </div>
              </div>
            </button>
          ))}
        </div>
      </section>
    </main>
  );
}
