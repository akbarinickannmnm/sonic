"use client";

import Link from "next/link";
import { useEffect, useState } from "react";

type CompletionMode = "clinical-reasoning" | "daily" | "daily-archive";

type Props = {
  mode: CompletionMode;
  open: boolean;
  onClose: () => void;
  diagnosisName?: string;
  diagnosisId?: string;
  dateKey?: string;
};

const ATTEMPT_PREFIX = "sonic:daily-case:attempt:";

function parseDateKey(dateKey: string) {
  const [year, month, day] = dateKey.split("-").map(Number);
  return new Date(Date.UTC(year, month - 1, day, 12, 0, 0));
}

function dateKeyFromUtc(date: Date) {
  const year = date.getUTCFullYear();
  const month = String(date.getUTCMonth() + 1).padStart(2, "0");
  const day = String(date.getUTCDate()).padStart(2, "0");
  return `${year}-${month}-${day}`;
}

function getDateKeyDaysAgo(dateKey: string, daysAgo: number) {
  const date = parseDateKey(dateKey);
  date.setUTCDate(date.getUTCDate() - daysAgo);
  return dateKeyFromUtc(date);
}

function calculateDailyStreak(dateKey: string) {
  if (typeof window === "undefined") return 0;

  let streak = 0;
  for (let i = 0; i < 365; i += 1) {
    const candidate = getDateKeyDaysAgo(dateKey, i);
    if (window.localStorage.getItem(`${ATTEMPT_PREFIX}${candidate}`) !== "completed") {
      break;
    }
    streak += 1;
  }
  return streak;
}

function CheckIcon() {
  return (
    <div className="flex h-[68px] w-[68px] shrink-0 items-center justify-center rounded-full border border-emerald-300 bg-emerald-50 text-emerald-600">
      <svg
        width="35"
        height="35"
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
    </div>
  );
}

function FlameIcon() {
  return (
    <svg width="29" height="29" viewBox="0 0 24 24" fill="none" aria-hidden="true">
      <path
        d="M12.8 2.8c.3 2.6-.7 4.2-2.3 5.8C9 10 7.7 11.4 7.7 14.1c0 2.5 1.9 4.4 4.3 4.4 2.9 0 4.8-2.2 4.8-5.1 0-1.9-.9-3.7-2.3-5.1.2 2.2-.6 3.5-1.8 4.3.2-2.6-1-5.8-4.1-7.6.8 2.2 2.6 3.6 4.2 4.9 1.3-2 1.3-4.3 0-7.1Z"
        fill="currentColor"
      />
    </svg>
  );
}

export default function ExperienceCompletionModal({
  mode,
  open,
  onClose,
  diagnosisName = "",
  diagnosisId = "",
  dateKey = "",
}: Props) {
  const [streak, setStreak] = useState(0);
  const isDaily = mode === "daily" || mode === "daily-archive";
  const showStreak = mode === "daily";

  useEffect(() => {
    if (!open || !showStreak || !dateKey) return;
    setStreak(calculateDailyStreak(dateKey));
  }, [open, showStreak, dateKey]);

  if (!open) return null;

  const safeStreak = Math.max(streak, 1);

  return (
    <div
      className="fixed inset-0 z-[100] flex items-center justify-center bg-slate-950/45 p-4"
      dir="rtl"
      role="presentation"
      onMouseDown={(event) => {
        if (event.target === event.currentTarget) onClose();
      }}
    >
      <section
        role="dialog"
        aria-modal="true"
        aria-label="اتمام کیس"
        className="flex w-full max-w-[540px] max-h-[calc(100vh-40px)] flex-col overflow-hidden rounded-[24px] border border-slate-200 bg-white shadow-none"
      >
        <div className="min-h-0 flex-1 overflow-y-auto px-6 pb-6 pt-7 sm:px-8 sm:pt-8">
          <div className="relative text-center">
            <div className="absolute right-0 top-0">
              <CheckIcon />
            </div>

            <div className="px-14 sm:px-16">
              <div className="text-[14px] font-semibold tracking-[0.08em] text-[#8BA3C3]">
                CASE COMPLETE
              </div>
              <h2 className="mt-3 text-[38px] font-bold leading-tight tracking-[-0.035em] text-[#10172A]">
                درست گفتی
              </h2>
              <p className="mt-4 text-[18px] leading-8 text-[#7F9ABD]">
                آفرین؛ این کیس روز را درست حل کردی.
              </p>
            </div>
          </div>

          <div className="mt-6 rounded-[20px] border border-[#D8E4F2] bg-[#F7FAFE] px-6 py-5 text-center">
            <div className="text-[15px] font-semibold text-[#91A8C5]">تشخیص درست</div>
            <div
              className="mt-2 text-[21px] font-bold leading-8 text-[#111827]"
              dir="ltr"
            >
              {diagnosisName}
            </div>
          </div>

          {showStreak && (
            <div className="mt-6 rounded-[22px] border border-[#F2E4D9] bg-[#FFFAF6] px-6 py-5">
              <div className="grid grid-cols-[1fr_auto_1fr] items-center gap-4">
                <div className="flex justify-start">
                  <Link
                    href="/streak"
                    className="inline-flex min-h-[48px] items-center gap-3 rounded-full bg-[#EEF4FF] px-5 text-[14px] font-semibold text-[#2D6FD6] transition hover:bg-[#E7F0FF]"
                  >
                    <span>مشاهده رکوردهای من</span>
                    <span aria-hidden="true" className="text-[22px] leading-none">←</span>
                  </Link>
                </div>

                <span aria-hidden="true" className="h-[38px] w-px bg-[#D8D1CA]" />

                <div className="flex items-center justify-end gap-4">
                  <div className="text-right">
                    <p className="text-[14px] font-semibold text-[#7E94AF]">رکورد پیوسته</p>
                    <p className="mt-1 text-[32px] font-bold leading-none text-[#10182E]">
                      {safeStreak} روز
                    </p>
                  </div>
                  <div className="flex h-[56px] w-[56px] items-center justify-center rounded-full bg-[#FFECDD] text-[#F26A12]">
                    <FlameIcon />
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>

        {isDaily && (
          <div className="grid shrink-0 grid-cols-2 gap-3 border-t border-slate-200 bg-white px-6 py-4 sm:px-8">
            <Link
              href="/case/today/archive"
              className="relative flex min-h-[58px] items-center justify-center rounded-[16px] border border-[#D8E4F2] bg-white px-12 text-center text-[14px] font-bold text-[#172033] transition hover:bg-[#F8FAFD]"
            >
              <span>آرشیو کیس‌ها</span>
              <span aria-hidden="true" className="absolute right-5 text-[20px] leading-none">→</span>
            </Link>

            <Link
              href={diagnosisId ? `/learn/${encodeURIComponent(diagnosisId)}` : "#"}
              className="relative flex min-h-[58px] items-center justify-center rounded-[16px] bg-[#080D21] px-12 text-center text-[14px] font-bold !text-white transition hover:bg-[#111936]"
            >
              <span className="!text-white">درباره تشخیص بیشتر بدان</span>
              <span aria-hidden="true" className="absolute right-5 text-[20px] leading-none !text-white">→</span>
            </Link>
          </div>
        )}
      </section>
    </div>
  );
}
