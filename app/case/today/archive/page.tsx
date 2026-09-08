"use client";

import Link from "next/link";
import { useMemo } from "react";
import { cases } from "../../../../data/cases";
import { getDefaultDailyCase, getTehranDateKey, readDailyCaseSchedule } from "../../../../lib/dailyCase";

function formatFaDate(dateKey: string) {
  const date = new Date(`${dateKey}T12:00:00+03:30`);
  return new Intl.DateTimeFormat("fa-IR", {
    weekday: "long",
    day: "numeric",
    month: "long",
    year: "numeric",
    timeZone: "Asia/Tehran",
  }).format(date);
}

export default function DailyCaseArchivePage() {
  const rows = useMemo(() => {
    const today = new Date();
    const todayKey = getTehranDateKey(today);
    const schedule = readDailyCaseSchedule();
    const result: Array<{ dateKey: string; caseItem: (typeof cases)[number] }> = [];

    // Archive always has real previous dates, even when those dates were not
    // pre-generated in the current browser's schedule.
    for (let offset = 1; offset <= 30; offset += 1) {
      const date = new Date(today);
      date.setDate(date.getDate() - offset);
      const dateKey = getTehranDateKey(date);
      const caseId = schedule[dateKey];
      const caseItem = caseId
        ? cases.find((item) => item.id === caseId)
        : getDefaultDailyCase(date);

      if (caseItem) result.push({ dateKey, caseItem });
    }

    // Prevent a malformed schedule from ever displaying today's case.
    return result.filter((row) => row.dateKey < todayKey);
  }, []);

  return (
    <main dir="rtl" className="min-h-screen bg-[#fbfaf8] px-5 py-10 text-[#10213f]">
      <div className="mx-auto w-full max-w-[1000px]">
        <div className="mb-10 flex items-center justify-between gap-4">
          <Link
            href="/case/today"
            className="rounded-xl border border-slate-200 bg-white px-4 py-2.5 text-sm font-medium shadow-sm transition hover:bg-slate-50"
          >
            ← بازگشت
          </Link>
          <div className="text-right">
            <p className="text-sm text-slate-500">کیس‌های روز</p>
            <h1 className="mt-1 text-3xl font-semibold">آرشیو کیس‌های روز</h1>
          </div>
        </div>

        <section className="rounded-2xl border border-slate-200 bg-white p-5 shadow-[0_8px_28px_rgba(15,23,42,0.04)] sm:p-7">
          <div className="space-y-3">
            {rows.map(({ dateKey, caseItem }) => (
              <div
                key={dateKey}
                className="flex flex-col gap-4 rounded-xl border border-slate-200 p-4 sm:flex-row sm:items-center sm:justify-between"
              >
                <div className="text-right">
                  <p className="text-sm font-medium text-slate-500">{formatFaDate(dateKey)}</p>
                  <p className="mt-1 font-semibold text-[#173250]">{caseItem.title}</p>
                </div>
                <Link
                  href={`/practice/${caseItem.course}/${caseItem.id}`}
                  className="rounded-lg border border-slate-200 px-4 py-2 text-sm font-medium text-slate-700 transition hover:bg-slate-50"
                >
                  مشاهده کیس
                </Link>
              </div>
            ))}
          </div>
        </section>
      </div>
    </main>
  );
}
