import Link from "next/link";
import DailyCasePlayer from "./DailyCasePlayer";
import { getDailyCase } from "../../../lib/dailyCase";

export default function DailyCasePage() {
  const now = new Date();
  const caseData = getDailyCase(now);
  const dateKey = now.toISOString().slice(0, 10);

  return (
    <>
      <div className="fixed left-5 top-5 z-50 sm:left-8 sm:top-7">
        <Link
          href="/"
          className="rounded-lg border border-slate-200 bg-white/90 px-3 py-2 text-sm font-medium text-slate-600 shadow-sm backdrop-blur hover:text-slate-900"
        >
          ← Home
        </Link>
      </div>
      <DailyCasePlayer caseData={caseData} dateKey={dateKey} />
    </>
  );
}
