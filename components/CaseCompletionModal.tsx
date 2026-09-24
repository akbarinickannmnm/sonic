"use client";

import type { Case } from "../types/case";

type Props = {
  caseData: Case;
  won: boolean;
  guessCount: number;
  onContinue: () => void;
  onReview: () => void;
};

function CheckIcon({ won }: { won: boolean }) {
  return (
    <div
      className={`flex h-[60px] w-[60px] shrink-0 items-center justify-center rounded-full border ${
        won
          ? "border-emerald-300 bg-emerald-50 text-emerald-600"
          : "border-amber-300 bg-amber-50 text-amber-600"
      }`}
    >
      {won ? (
        <svg
          width="31"
          height="31"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2.1"
          strokeLinecap="round"
          strokeLinejoin="round"
          aria-hidden="true"
        >
          <path d="M5 12.5 10 17 19 7" />
        </svg>
      ) : (
        <span className="text-[28px] font-bold leading-none">!</span>
      )}
    </div>
  );
}

export default function CaseCompletionModal({
  caseData,
  won,
  guessCount,
  onContinue,
  onReview,
}: Props) {
  return (
    <div
      className="fixed inset-0 z-[100] flex items-center justify-center bg-slate-950/45 p-4 backdrop-blur-[3px]"
      dir="rtl"
      role="presentation"
    >
      <section
        role="dialog"
        aria-modal="true"
        aria-labelledby="case-complete-title"
        className="flex w-full max-w-[560px] max-h-[calc(100vh-40px)] flex-col overflow-hidden rounded-[26px] border border-slate-200 bg-white shadow-[0_18px_55px_rgba(15,23,42,0.16)]"
      >
        <div className="min-h-0 flex-1 overflow-y-auto px-6 pb-6 pt-7 sm:px-8 sm:pt-8">
          <div className="relative text-center">
            <div className="absolute right-0 top-0">
              <CheckIcon won={won} />
            </div>

            <div className="px-12 sm:px-14">
              <div className="text-[13px] font-semibold tracking-[0.08em] text-[#8BA3C3]">
                CASE COMPLETE
              </div>

              <h2
                id="case-complete-title"
                className="mt-2 text-[34px] font-bold leading-tight tracking-[-0.035em] text-[#10172A]"
              >
                {won ? "درست گفتی" : "کیس تمام شد"}
              </h2>

              <p className="mt-3 text-[16px] leading-7 text-[#7F9ABD]">
                {won
                  ? "آفرین؛ تشخیص این کیس را درست انتخاب کردی."
                  : "حدس‌ها تمام شد؛ حالا می‌توانی پاسخ کامل کیس را مرور کنی."}
              </p>
            </div>
          </div>

          <div className="mt-7 rounded-[20px] border border-[#D8E4F2] bg-[#F7FAFE] px-6 py-5 text-center">
            <div className="text-[14px] font-semibold text-[#91A8C5]">
              تشخیص درست
            </div>

            <div
              className="mt-2 text-[21px] font-bold leading-8 text-[#111827]"
              dir="ltr"
            >
              {caseData.diagnosis.name}
            </div>

            <div className="mt-4 flex items-center justify-center gap-2 text-[14px] text-[#91A8C5]">
              <span>تعداد حدس‌ها</span>
              <span className="font-bold text-[#172033]">{guessCount} / 4</span>
            </div>
          </div>
        </div>

        <div className="grid shrink-0 grid-cols-2 gap-3 border-t border-slate-200 bg-white px-6 py-4 sm:px-8">
          {/* LEFT BUTTON: More about diagnosis */}
          <button
            type="button"
            onClick={onReview}
            className="relative flex min-h-[58px] items-center justify-center rounded-[17px] bg-[#080D21] px-9 text-center text-[15px] font-bold text-white transition hover:bg-[#111936]"
          >
            <span>درباره تشخیص بیشتر بدان</span>
            <span
              aria-hidden="true"
              className="absolute left-5 top-1/2 -translate-y-1/2 text-[20px] leading-none"
            >
              ←
            </span>
          </button>

          {/* RIGHT BUTTON: Next case */}
          <button
            type="button"
            onClick={onContinue}
            className="relative flex min-h-[58px] items-center justify-center rounded-[17px] border border-[#D8E4F2] bg-white px-9 text-center text-[15px] font-bold text-[#172033] transition hover:bg-[#F8FAFD]"
          >
            <span>ادامه به کیس بعدی</span>
            <span
              aria-hidden="true"
              className="absolute right-5 top-1/2 -translate-y-1/2 text-[20px] leading-none"
            >
              →
            </span>
          </button>
        </div>
      </section>
    </div>
  );
}
