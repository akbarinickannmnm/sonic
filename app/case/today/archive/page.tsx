"use client";

import Link from "next/link";
import { useEffect, useMemo, useState } from "react";
import { cases } from "../../../../data/cases";
import {
  getDefaultDailyCase,
  getTehranDateKey,
  readDailyCaseSchedule,
} from "../../../../lib/dailyCase";
import type { Case } from "../../../../types/case";

const TEHRAN = "Asia/Tehran";
const DAY_MS = 24 * 60 * 60 * 1000;

const persianDisplay = new Intl.DateTimeFormat("fa-IR-u-ca-persian", {
  timeZone: TEHRAN,
  year: "numeric",
  month: "long",
  day: "numeric",
});

const persianParts = new Intl.DateTimeFormat("en-US-u-ca-persian-nu-latn", {
  timeZone: TEHRAN,
  year: "numeric",
  month: "numeric",
  day: "numeric",
  weekday: "short",
});

const persianMonth = new Intl.DateTimeFormat("fa-IR-u-ca-persian", {
  timeZone: TEHRAN,
  year: "numeric",
  month: "long",
});

const gregorianNumeric = new Intl.DateTimeFormat("en-US", {
  timeZone: TEHRAN,
  month: "numeric",
  day: "numeric",
});

function addDays(date: Date, amount: number) {
  return new Date(date.getTime() + amount * DAY_MS);
}

function isoDate(date: Date) {
  return date.toISOString().slice(0, 10);
}

function getPersianParts(date: Date) {
  const values = Object.fromEntries(
    persianParts.formatToParts(date).map(({ type, value }) => [type, value]),
  );

  return {
    year: Number(values.year),
    month: Number(values.month),
    day: Number(values.day),
    weekday: values.weekday,
  };
}

function getGregorianLabel(date: Date) {
  return gregorianNumeric.format(date);
}

function getMonthInfo(anchor: Date) {
  const target = getPersianParts(anchor);
  let first = anchor;
  let last = anchor;

  for (let offset = 1; offset <= 40; offset += 1) {
    const before = addDays(anchor, -offset);
    const after = addDays(anchor, offset);

    if (getPersianParts(before).year === target.year && getPersianParts(before).month === target.month) {
      first = before;
    }

    if (getPersianParts(after).year === target.year && getPersianParts(after).month === target.month) {
      last = after;
    }
  }

  // Re-find the exact edges after the scan above.
  while (getPersianParts(addDays(first, -1)).month === target.month) first = addDays(first, -1);
  while (getPersianParts(addDays(last, 1)).month === target.month) last = addDays(last, 1);

  return {
    first,
    last,
    year: target.year,
    month: target.month,
    label: persianMonth.format(anchor),
  };
}

function getCalendarCells(info: ReturnType<typeof getMonthInfo>) {
  const firstWeekday = getPersianParts(info.first).weekday;
  const weekdayIndex: Record<string, number> = {
    Sat: 0,
    Sun: 1,
    Mon: 2,
    Tue: 3,
    Wed: 4,
    Thu: 5,
    Fri: 6,
  };

  const leading = weekdayIndex[firstWeekday] ?? 0;
  const daysInMonth = Math.round((info.last.getTime() - info.first.getTime()) / DAY_MS) + 1;
  const total = Math.ceil((leading + daysInMonth) / 7) * 7;

  return Array.from({ length: total }, (_, index) => {
    if (index < leading || index >= leading + daysInMonth) return null;
    return addDays(info.first, index - leading);
  });
}

function getArchivedCase(dateKey: string, schedule: Record<string, string>): Case | null {
  const scheduledId = schedule[dateKey];
  if (scheduledId) {
    const scheduledCase = cases.find((item) => item.id === scheduledId);
    if (scheduledCase) return scheduledCase;
  }

  const [year, month, day] = dateKey.split("-").map(Number);
  if (!year || !month || !day) return null;

  return getDefaultDailyCase(new Date(Date.UTC(year, month - 1, day, 12)));
}

function getCourseLabel(course: Case["course"]) {
  const labels: Record<Case["course"], string> = {
    cardiology: "قلب و عروق",
    pulmonology: "ریه",
    gastroenterology: "گوارش",
    neurology: "نورولوژی",
    "infectious-disease": "عفونی",
    nephrology: "کلیه",
    endocrinology: "غدد",
    "hematology-oncology": "هماتولوژی و انکولوژی",
  };
  return labels[course];
}

function getDifficultyLabel(difficulty: Case["difficulty"]) {
  return difficulty === "easy" ? "آسان" : difficulty === "medium" ? "متوسط" : "سخت";
}

function Icon({ type, size = 22 }: { type: "calendar" | "book" | "chart" | "file" | "arrow"; size?: number }) {
  const common = {
    width: size,
    height: size,
    viewBox: "0 0 24 24",
    fill: "none",
    stroke: "currentColor",
    strokeWidth: 1.75,
    strokeLinecap: "round" as const,
    strokeLinejoin: "round" as const,
    "aria-hidden": true,
  };

  if (type === "calendar") {
    return (
      <svg {...common}>
        <rect x="3.5" y="5" width="17" height="16" rx="2" />
        <path d="M7 3.5v3M17 3.5v3M3.5 9h17" />
      </svg>
    );
  }

  if (type === "book") {
    return (
      <svg {...common}>
        <path d="M5 4.5h4.5A3.5 3.5 0 0 1 13 8v12a3.5 3.5 0 0 0-3.5-3.5H5z" />
        <path d="M19 4.5h-4.5A3.5 3.5 0 0 0 11 8v12a3.5 3.5 0 0 1 3.5-3.5H19z" />
      </svg>
    );
  }

  if (type === "chart") {
    return (
      <svg {...common}>
        <path d="M5 20V11M12 20V5M19 20v-8" />
        <path d="M3.5 20.5h17" />
      </svg>
    );
  }

  if (type === "file") {
    return (
      <svg {...common}>
        <path d="M6 3.5h8l4 4v13H6z" />
        <path d="M14 3.5v4h4M9 12h6M9 16h6" />
      </svg>
    );
  }

  return (
    <svg {...common}>
      <path d="M19 12H5" />
      <path d="m10 7-5 5 5 5" />
    </svg>
  );
}

export default function DailyCaseArchivePage() {
  const [hydrated, setHydrated] = useState(false);
  const [schedule, setSchedule] = useState<Record<string, string>>({});
  const [monthAnchor, setMonthAnchor] = useState(() => new Date());
  const [selectedKey, setSelectedKey] = useState(() => getTehranDateKey(new Date()));

  useEffect(() => {
    setSchedule(readDailyCaseSchedule());
    setHydrated(true);
  }, []);

  const todayKey = getTehranDateKey(new Date());
  const monthInfo = useMemo(() => getMonthInfo(monthAnchor), [monthAnchor]);
  const cells = useMemo(() => getCalendarCells(monthInfo), [monthInfo]);

  const archiveMap = useMemo(() => {
    const result = new Map<string, Case>();
    const today = new Date();

    for (let offset = 1; offset <= 30; offset += 1) {
      const date = addDays(today, -offset);
      const key = getTehranDateKey(date);
      const caseItem = getArchivedCase(key, schedule);
      if (caseItem) result.set(key, caseItem);
    }

    return result;
  }, [schedule]);

  const selectedCase = useMemo(() => {
    if (selectedKey === todayKey) return getArchivedCase(todayKey, schedule);
    return archiveMap.get(selectedKey) ?? null;
  }, [archiveMap, schedule, selectedKey, todayKey]);

  const selectedDateLabel = useMemo(() => {
    const date = new Date(`${selectedKey}T12:00:00+03:30`);
    return persianDisplay.format(date);
  }, [selectedKey]);

  const previousMonth = () => setMonthAnchor(addDays(monthInfo.first, -1));
  const nextMonth = () => setMonthAnchor(addDays(monthInfo.last, 1));

  const selectDate = (date: Date) => {
    const key = getTehranDateKey(date);
    const isToday = key === todayKey;
    const hasCase = isToday || archiveMap.has(key);
    if (!hasCase) return;
    setSelectedKey(key);
  };

  if (!hydrated) {
    return <main dir="rtl" className="min-h-screen bg-[#fbfaf8]" />;
  }

  return (
    <main dir="rtl" className="min-h-screen bg-[#fbfaf8] px-5 pb-12 pt-10 text-[#10213f] sm:px-7 lg:px-10">
      <div className="mx-auto w-full max-w-[1480px]">
        <header className="mb-9 text-right">
          <h1 className="text-[32px] font-semibold tracking-[-0.03em] text-[#102b4d] sm:text-[38px]">
            آرشیو کیس‌های روز
          </h1>
          <p className="mt-2 text-[15px] text-[#71819a]">
            به کیس‌های روزهای گذشته دسترسی داشته باشید و آن‌ها را دوباره حل کنید.
          </p>
        </header>

        <div className="grid items-start gap-6 lg:grid-cols-[minmax(0,1.35fr)_minmax(380px,0.9fr)]">
          {/* Case panel — smaller panel on the left. */}
          <section className="order-2 rounded-[22px] border border-[#e3e8ef] bg-white p-7 shadow-[0_10px_30px_rgba(15,23,42,0.045)] sm:p-8 lg:p-9">
            {selectedCase ? (
              <>
                <div className="flex items-start justify-between gap-4">
                  <div className="text-right">
                    <p className="text-[15px] font-medium text-[#5c6f89]">{selectedDateLabel}</p>
                    <h2 className="mt-5 text-[27px] font-semibold tracking-[-0.02em] text-[#173250] font-sans">
                      {selectedCase.title}
                    </h2>
                  </div>
                  {selectedKey === todayKey && (
                    <span className="shrink-0 rounded-xl bg-[#eef5ff] px-4 py-2 text-[13px] font-semibold text-[#2563eb]">
                      امروز
                    </span>
                  )}
                </div>

                <p className="mt-5 max-w-[560px] text-[15px] leading-8 text-[#71819a]">
                  از تلاش خود استفاده کرده‌اید. فردا دوباره برای یک چالش بالینی جدید بازگردید.
                </p>

                <div className="mt-7 grid gap-3">
                  <Link
                    href={selectedKey === todayKey ? "/case/today" : `/case/today/archive/${selectedKey}`}
                    className="flex h-[62px] items-center justify-center rounded-xl bg-[#173f65] px-6 text-[15px] font-semibold !text-white shadow-sm transition hover:bg-[#143754]"
                  >
                    ادامه دادن کیس
                    <span className="mr-3 !text-white" aria-hidden="true">
                      <Icon type="arrow" size={20} />
                    </span>
                  </Link>

                  <Link
                    href={`/learn/${encodeURIComponent(selectedCase.diagnosis.id)}`}
                    className="flex h-[62px] items-center justify-center gap-3 rounded-xl border border-[#d4e0ee] bg-white px-6 text-[15px] font-semibold text-[#173250] transition hover:bg-[#f8fbff]"
                  >
                    <Icon type="file" size={22} />
                    مطالعه بیشتر درباره این کیس
                  </Link>
                </div>

                <div className="my-8 h-px bg-[#edf0f4]" />

                <div>
                  <h3 className="text-[17px] font-semibold text-[#173250]">اطلاعات کیس</h3>
                  <dl className="mt-6 space-y-5 text-[14px]">
                    <div className="flex items-center justify-between gap-6">
                      <dd className="text-[#7a899e]">
                        <span>تخصص</span>
                      </dd>
                      <dt className="text-[#173250]">{getCourseLabel(selectedCase.course)}</dt>
                    </div>
                    <div className="flex items-center justify-between gap-6">
                      <dd className="text-[#7a899e]">
                        <span>سطح دشواری</span>
                      </dd>
                      <dt className="text-[#173250]">{getDifficultyLabel(selectedCase.difficulty)}</dt>
                    </div>
                    <div className="flex items-center justify-between gap-6">
                      <dd className="text-[#7a899e]">
                        <span>تعداد مراحل</span>
                      </dd>
                      <dt className="text-[#173250]">{selectedCase.stages.length} مرحله</dt>
                    </div>
                  </dl>
                </div>
              </>
            ) : (
              <div className="flex min-h-[520px] items-center justify-center text-center text-[#7a899e]">
                <div>
                  <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-2xl bg-[#f3f6fa] text-[#7a899e]">
                    <Icon type="calendar" size={25} />
                  </div>
                  <p className="mt-5 text-[15px]">یک روز دارای کیس را از تقویم انتخاب کنید.</p>
                </div>
              </div>
            )}
          </section>

          {/* Calendar — larger, on the right in RTL. */}
          <section dir="rtl" className="order-1 rounded-[20px] border border-[#e3e8ef] bg-white p-5 shadow-[0_8px_24px_rgba(15,23,42,0.04)] sm:p-6">
            <div className="flex items-center justify-between gap-4">
              <div className="flex items-center gap-2">
                <button
                  type="button"
                  onClick={previousMonth}
                  aria-label="ماه قبل"
                  className="flex h-11 w-11 items-center justify-center rounded-xl border border-[#e3e8ef] bg-white text-[#173250] transition hover:bg-[#f7f9fc]"
                >
                  <span className="text-xl leading-none">‹</span>
                </button>
                <button
                  type="button"
                  onClick={nextMonth}
                  aria-label="ماه بعد"
                  className="flex h-11 w-11 items-center justify-center rounded-xl border border-[#e3e8ef] bg-white text-[#173250] transition hover:bg-[#f7f9fc]"
                >
                  <span className="text-xl leading-none">›</span>
                </button>
              </div>

              <div className="text-center">
                <h2 className="text-[22px] font-semibold text-[#173250]">{monthInfo.label}</h2>
              </div>

              <div className="flex items-center gap-4 text-[13px] text-[#6d7e96]">
                <span className="flex items-center gap-2">
                  <span className="h-3 w-3 rounded-full bg-[#2563eb]" />
                  امروز
                </span>
                <span className="hidden items-center gap-2 sm:flex">
                  <span className="h-3 w-3 rounded-full bg-[#22b86a]" />
                  حل شده
                </span>
                <span className="hidden items-center gap-2 md:flex">
                  <span className="h-3 w-3 rounded-full bg-[#dfe5ed]" />
                  بدون حل
                </span>
              </div>
            </div>

            <div className="mt-6 grid grid-cols-7 gap-2 text-center text-[12px] font-medium text-[#8090a7]">
              {['شنبه', 'یکشنبه', 'دوشنبه', 'سه‌شنبه', 'چهارشنبه', 'پنجشنبه', 'جمعه'].map((day) => (
                <div key={day} className="py-1.5">{day}</div>
              ))}
            </div>

            <div className="mt-1.5 grid grid-cols-7 gap-2">
              {cells.map((date, index) => {
                if (!date) {
                  return <div key={`empty-${index}`} className="min-h-[82px] rounded-xl" />;
                }

                const key = getTehranDateKey(date);
                const isToday = key === todayKey;
                const isSelected = key === selectedKey;
                const isAvailable = isToday || archiveMap.has(key);
                const caseItem = archiveMap.get(key);
                const isSolved = Boolean(caseItem) && typeof window !== "undefined" && window.localStorage.getItem(`sonic:daily-case:attempt:${key}`) === "completed";

                return (
                  <button
                    key={key}
                    type="button"
                    disabled={!isAvailable}
                    onClick={() => selectDate(date)}
                    className={`relative flex min-h-[82px] flex-col items-center justify-center rounded-xl border p-2 text-center transition ${
                      isSelected
                        ? "border-[#1f4f7c] bg-[#285783] text-white shadow-[0_8px_18px_rgba(31,79,124,0.16)]"
                        : isAvailable
                          ? "border-[#e7ebf1] bg-white text-[#173250] hover:border-[#cbd8e6] hover:bg-[#f9fbfd]"
                          : "border-[#f0f2f5] bg-[#fafafa] text-[#c7ced8]"
                    }`}
                  >
                    <span className={`text-[21px] font-semibold leading-none ${isSelected ? "text-white" : ""}`}>
                      {new Intl.NumberFormat("fa-IR").format(getPersianParts(date).day)}
                    </span>
                    <span
                      className={`mt-2.5 h-2.5 w-2.5 rounded-full ${
                        isToday
                          ? isSelected ? "bg-[#b9d4f2]" : "bg-[#2563eb]"
                          : isSolved
                            ? isSelected ? "bg-[#b8f0d1]" : "bg-[#22b86a]"
                            : isAvailable
                              ? isSelected ? "bg-[#b9cde2]" : "bg-[#dfe5ed]"
                              : "bg-transparent"
                      }`}
                      aria-hidden="true"
                    />
                  </button>
                );
              })}
            </div>
          </section>
        </div>
      </div>
    </main>
  );
}
