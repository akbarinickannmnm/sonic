"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import DailyCasePlayer from "./DailyCasePlayer";
import { getDailyCase, getTehranDateKey } from "../../../lib/dailyCase";

export default function DailyCasePage() {
  const [now, setNow] = useState<Date | null>(null);

  useEffect(() => {
    const current = new Date();
    setNow(current);

  }, []);

  if (!now) {
    return (
      <main dir="rtl" className="min-h-screen bg-[#fbfaf8] px-5 py-10">
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

  const caseData = getDailyCase(now);
  const dateKey = getTehranDateKey(now);

  return (
    <>
      <div className="fixed left-5 top-5 z-[100] sm:left-8 sm:top-7">
        <Link href="/" className="rounded-lg border border-slate-200 bg-white/90 px-3 py-2 text-sm font-medium text-slate-600 shadow-sm backdrop-blur hover:text-slate-900">
          ← Home
        </Link>
      </div>
      <DailyCasePlayer caseData={caseData} dateKey={dateKey} />
    </>
  );
}
