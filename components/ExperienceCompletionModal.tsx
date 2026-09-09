"use client";

import Link from "next/link";
import { useEffect, useState } from "react";

type CompletionMode = "clinical-reasoning" | "daily";

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
    <div className="flex h-[56px] w-[56px] items-center justify-center rounded-full border border-emerald-200 bg-emerald-50 text-[30px] font-medium text-emerald-600">
      ✓
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

/**
 * Completion shell for experiences with their own post-case UX.
 * Practice keeps using CaseCompletionModal.
 * Daily Case gets the dedicated streak-based completion treatment.
 */
export default function ExperienceCompletionModal({
  mode,
  open,
  onClose,
  diagnosisName = "",
  diagnosisId = "",
  dateKey = "",
}: Props) {
  const [streak, setStreak] = useState(0);

  useEffect(() => {
    if (!open || mode !== "daily" || !dateKey) return;
    setStreak(calculateDailyStreak(dateKey));
  }, [open, mode, dateKey]);

  if (!open) return null;

  const safeStreak = Math.max(streak, 1);
  const isDaily = mode === "daily";

  return (
    <div
      className="fixed inset-0 z-[100] flex items-center justify-center bg-slate-950/30 px-4 py-6 backdrop-blur-[2px]"
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
        className="h-[390px] w-full max-w-[520px] overflow-hidden rounded-[24px] border border-slate-200 bg-white shadow-[0_24px_80px_rgba(15,23,42,0.16)]"
      >
        <div className="flex h-full flex-col">
          <div className="flex-1 px-[43px] pt-[28px]">
            <div className="flex items-start justify-between gap-6">
              <CheckIcon />

              <div className="text-right">
                <p className="text-[12px] font-semibold tracking-[0.15em] text-[#8aa0bd]">
                  CASE COMPLETE
                </p>
                <h2 className="mt-[10px] text-[31px] font-bold leading-[1.2] tracking-[-0.03em] text-[#0b1228]">
                  درست گفتی
                </h2>
                <p className="mt-[11px] text-[15px] font-medium leading-7 text-[#69809f]">
                  آفرین؛ تشخیص کیس امروز را درست انتخاب کردی.
                </p>
              </div>
            </div>

            <div className="mt-[27px] rounded-[18px] border border-[#d8e3f0] bg-[#f8fbff] px-6 py-[18px]">
              <p className="text-right text-[13px] font-semibold text-[#8ba1bc]">تشخیص درست</p>
              <p className="mt-[7px] text-right text-[20px] font-bold leading-7 text-[#0c1227]" dir="ltr">
                {diagnosisName}
              </p>
            </div>

            {isDaily && (
              <div className="mt-[22px] rounded-[18px] border border-[#f2e4d9] bg-[#fffaf6] px-[25px] py-[15px]">
                <div className="grid grid-cols-[1fr_auto_1fr] items-center gap-4">
                  <div className="flex justify-start">
                    <Link
                      href="/streak"
                      className="inline-flex h-[48px] items-center gap-3 rounded-full bg-[#eef4ff] px-[20px] text-[14px] font-semibold text-[#2d6fd6] transition hover:bg-[#e8f0ff]"
                    >
                      <span>مشاهده رکوردهای من</span>
                      <span aria-hidden="true" className="text-[22px] leading-none">←</span>
                    </Link>
                  </div>

                  <span aria-hidden="true" className="h-[38px] w-px bg-[#d8d1ca]" />

                  <div className="flex items-center justify-end gap-4">
                    <div className="text-right">
                      <p className="text-[14px] font-semibold text-[#7e94af]">رکورد پیوسته</p>
                      <p className="mt-[2px] text-[32px] font-bold leading-none text-[#10182e]">
                        {safeStreak} روز
                      </p>
                    </div>
                    <div className="flex h-[56px] w-[56px] items-center justify-center rounded-full bg-[#ffecdf] text-[#f26a12]">
                      <FlameIcon />
                    </div>
                  </div>
                </div>
              </div>
            )}

            {!isDaily && <div className="mt-[22px] min-h-[84px]" />}
          </div>

          {isDaily && (
            <div className="flex h-[82px] items-center gap-4 border-t border-slate-200 px-[43px]" dir="ltr">
              <Link
                href={diagnosisId ? `/learn/${encodeURIComponent(diagnosisId)}` : "#"}
                className="flex h-[54px] flex-1 items-center justify-center rounded-[17px] bg-[#10182e] px-4 text-center text-[14px] font-semibold text-white transition hover:bg-[#0d1426]"
                dir="rtl"
              >
                <span>درباره {diagnosisName || "تشخیص"} بیشتر بدان</span>
                <span aria-hidden="true" className="mr-2 text-[19px] leading-none">←</span>
              </Link>

              <Link
                href="/case/today/archive"
                className="flex h-[54px] w-[174px] items-center justify-center gap-2 rounded-[17px] border border-[#d6e0ec] bg-white px-4 text-center text-[14px] font-semibold text-[#4e6380] transition hover:bg-[#f8fafc]"
                dir="rtl"
              >
                <span>آرشیو کیس‌ها</span>
                <span aria-hidden="true" className="text-[19px] leading-none">→</span>
              </Link>
            </div>
          )}
        </div>
      </section>
    </div>
  );
}
