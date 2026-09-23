"use client";

import Link from "next/link";
import { useParams } from "next/navigation";
import { useEffect, useMemo, useState } from "react";
import DailyCasePlayer from "../../DailyCasePlayer";
import { cases } from "../../../../../data/cases";
import { getDefaultDailyCase, readDailyCaseSchedule } from "../../../../../lib/dailyCase";
import type { Case } from "../../../../../types/case";

function isValidDateKey(value: string) {
  return /^\d{4}-\d{2}-\d{2}$/.test(value);
}

function getArchivedCase(dateKey: string): Case | null {
  if (!isValidDateKey(dateKey)) return null;

  const schedule = readDailyCaseSchedule();
  const scheduledId = schedule[dateKey];
  if (scheduledId) {
    const scheduledCase = cases.find((item) => item.id === scheduledId);
    if (scheduledCase) return scheduledCase;
  }

  const [year, month, day] = dateKey.split("-").map(Number);
  const date = new Date(Date.UTC(year, month - 1, day, 12, 0, 0));
  if (Number.isNaN(date.getTime())) return null;
  return getDefaultDailyCase(date);
}

export default function ArchivedDailyCasePage() {
  const params = useParams<{ dateKey: string }>();
  const dateKey = params?.dateKey ?? "";
  const [hydrated, setHydrated] = useState(false);

  useEffect(() => setHydrated(true), []);

  const caseData = useMemo(() => {
    if (!hydrated) return null;
    return getArchivedCase(dateKey);
  }, [dateKey, hydrated]);

  if (!hydrated) {
    return (
      <main dir="rtl" className="min-h-screen bg-[#fbfaf8] px-5 py-10 text-[#10213f]">
        <div className="mx-auto max-w-[820px]">
          <div className="rounded-2xl border border-slate-200 bg-white p-10 text-center shadow-[0_8px_28px_rgba(15,23,42,0.05)]">
            <div className="mx-auto h-12 w-12 rounded-full bg-slate-100" />
            <div className="mx-auto mt-6 h-4 w-36 rounded bg-slate-100" />
            <div className="mx-auto mt-4 h-7 w-72 max-w-full rounded bg-slate-100" />
          </div>
        </div>
      </main>
    );
  }

  if (!caseData) {
    return (
      <main dir="rtl" className="min-h-screen bg-[#fbfaf8] px-5 py-10 text-[#10213f]">
        <div className="mx-auto max-w-[820px]">
          <section className="rounded-2xl border border-slate-200 bg-white p-8 text-center shadow-[0_8px_28px_rgba(15,23,42,0.05)]">
            <p className="text-sm text-slate-500">این کیس پیدا نشد.</p>
            <Link href="/case/today/archive" className="mt-5 inline-flex rounded-xl bg-slate-900 px-5 py-3 text-sm font-semibold text-white">
              بازگشت به آرشیو
            </Link>
          </section>
        </div>
      </main>
    );
  }

  return <DailyCasePlayer caseData={caseData} dateKey={dateKey} archiveMode />;
}
