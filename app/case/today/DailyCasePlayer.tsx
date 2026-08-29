"use client";

import { useState } from "react";
import CasePlayer from "../../../components/CasePlayer";
import type { Case } from "../../../types/case";

const ATTEMPT_PREFIX = "sonic:daily-case:attempt:";
const STATE_PREFIX = "sonic:daily-case:state:";

function attemptKey(dateKey: string) {
  return `${ATTEMPT_PREFIX}${dateKey}`;
}

function stateKey(dateKey: string, caseId: string) {
  return `${STATE_PREFIX}${dateKey}:${caseId}`;
}

export default function DailyCasePlayer({ caseData, dateKey }: { caseData: Case; dateKey: string }) {
  const [locked, setLocked] = useState(() => {
    if (typeof window === "undefined") return false;
    return window.localStorage.getItem(attemptKey(dateKey)) === "completed";
  });

  if (locked) {
    return (
      <main className="min-h-screen bg-[#fbfaf8] px-5 py-10 text-[#10213f]">
        <div className="mx-auto max-w-[820px]">
          <div className="rounded-2xl border border-slate-200 bg-white p-8 text-center shadow-[0_8px_28px_rgba(15,23,42,0.05)] sm:p-12">
            <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-full bg-emerald-50 text-xl text-emerald-700">✓</div>
            <p className="mt-5 text-xs font-semibold uppercase tracking-[0.18em] text-slate-500">Case of the Day</p>
            <h1 className="mt-2 text-3xl font-semibold tracking-tight">Today&apos;s case is complete.</h1>
            <p className="mx-auto mt-3 max-w-md text-sm leading-6 text-slate-600">
              You&apos;ve already used today&apos;s attempt. Come back tomorrow for a new clinical challenge.
            </p>
            <p className="mt-6 text-sm font-medium text-slate-500">{caseData.title}</p>
          </div>
        </div>
      </main>
    );
  }

  return (
    <CasePlayer
      caseData={caseData}
      storageKey={stateKey(dateKey, caseData.id)}
      onComplete={() => {
        // Consume the daily attempt, but keep the current completed case
        // visible so the user can read the result and review questions.
        window.localStorage.setItem(attemptKey(dateKey), "completed");
      }}
    />
  );
}
