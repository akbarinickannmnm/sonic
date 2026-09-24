"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";
import CasePlayer from "../../../components/CasePlayer";
import ExperienceCompletionModal from "../../../components/ExperienceCompletionModal";
import type { Case } from "../../../types/case";

const ATTEMPT_PREFIX = "sonic:daily-case:attempt:";
const STATE_PREFIX = "sonic:daily-case:state:";

function attemptKey(dateKey: string) {
  return `${ATTEMPT_PREFIX}${dateKey}`;
}

function stateKey(dateKey: string, caseId: string) {
  return `${STATE_PREFIX}${dateKey}:${caseId}`;
}

function CalendarIcon({ size = 22 }: { size?: number }) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.8"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
    >
      <rect x="3.5" y="5" width="17" height="16" rx="2" />
      <path d="M7 3.5v3M17 3.5v3M3.5 9h17" />
      <path d="M8 12h.01M12 12h.01M16 12h.01M8 16h.01M12 16h.01M16 16h.01" />
    </svg>
  );
}

function Icon({ name, size = 22 }: { name: "search" | "bell" | "menu"; size?: number }) {
  const common = {
    width: size,
    height: size,
    viewBox: "0 0 24 24",
    fill: "none",
    stroke: "currentColor",
    strokeWidth: 1.8,
    strokeLinecap: "round" as const,
    strokeLinejoin: "round" as const,
  };

  if (name === "search") {
    return (
      <svg {...common}>
        <circle cx="11" cy="11" r="6.5" />
        <path d="m16 16 4 4" />
      </svg>
    );
  }

  if (name === "bell") {
    return (
      <svg {...common}>
        <path d="M18 8a6 6 0 0 0-12 0c0 7-3 7-3 9h18c0-2-3-2-3-9" />
        <path d="M10 21h4" />
      </svg>
    );
  }

  return (
    <svg {...common}>
      <path d="M4 7h16M4 12h16M4 17h16" />
    </svg>
  );
}

export default function DailyCasePlayer({
  caseData,
  dateKey,
  archiveMode = false,
}: {
  caseData: Case;
  dateKey: string;
  archiveMode?: boolean;
}) {
  // IMPORTANT: do not read localStorage during the render that hydrates from SSR.
  // The server cannot see localStorage, so a direct window check in useState causes
  // the server and client trees to differ and triggers React hydration errors.
  const [hydrated, setHydrated] = useState(false);
  const [locked, setLocked] = useState(false);
  const [showCompletion, setShowCompletion] = useState(false);

  useEffect(() => {
    setLocked(!archiveMode && window.localStorage.getItem(attemptKey(dateKey)) === "completed");
    setHydrated(true);
  }, [archiveMode, dateKey]);

  const learnHref = `/learn/${encodeURIComponent(caseData.diagnosis.id)}`;

  // Keep the first render identical on server and client. Once mounted, replace it
  // with the actual completed/active state based on localStorage.
  if (!hydrated) {
    return (
      <main dir="rtl" className="min-h-screen bg-[#fbfaf8] px-5 py-10 text-[#10213f]">
        <div className="mx-auto max-w-[760px]">
          <div className="rounded-2xl border border-slate-200 bg-white p-6 text-center shadow-[0_8px_28px_rgba(15,23,42,0.05)] sm:p-8">
            <div className="mx-auto h-12 w-12 rounded-full bg-emerald-50" />
            <div className="mx-auto mt-5 h-4 w-20 rounded bg-slate-100" />
            <div className="mx-auto mt-5 h-10 w-full max-w-[520px] rounded bg-slate-100" />
            <div className="mx-auto mt-4 h-5 w-full max-w-[640px] rounded bg-slate-100" />
            <div className="mx-auto mt-3 h-5 w-full max-w-[560px] rounded bg-slate-100" />
            <div className="mx-auto mt-8 h-5 w-48 rounded bg-slate-100" />
            <div className="mx-auto mt-10 grid max-w-[760px] gap-4 sm:grid-cols-2">
              <div className="h-[78px] rounded-xl border border-slate-200 bg-slate-50" />
              <div className="h-[78px] rounded-xl bg-slate-100" />
            </div>
          </div>
        </div>
      </main>
    );
  }

  if (locked) {
    return (
      <main dir="rtl" className="min-h-screen bg-[#fbfaf8] text-[#10213f]">


        <div className="mx-auto w-full max-w-[1120px] px-5 pb-10 pt-7 sm:px-7 sm:pt-8">
          <section className="mx-auto w-full max-w-[760px] rounded-2xl border border-slate-200 bg-white px-5 py-7 shadow-[0_8px_30px_rgba(15,23,42,0.045)] sm:px-7 sm:py-8 lg:px-9">
            <div className="flex justify-center">
              <div className="flex h-12 w-12 items-center justify-center rounded-full bg-emerald-50 text-xl text-emerald-600">✓</div>
            </div>

            <p className="mt-5 text-center text-[12px] font-medium text-slate-500">کیس روز</p>

            <h1 className="mt-2 text-center text-[27px] font-semibold tracking-[-0.035em] text-[#102b4d] sm:text-[32px]">
              کیس {archiveMode ? "روز" : "امروز"} را قبلاً حل کرده‌اید.
            </h1>

            <p className="mx-auto mt-3 max-w-[560px] text-center text-[14px] leading-6 text-slate-500">
              از تلاش خود استفاده کرده‌اید. {archiveMode ? "می‌توانید از آرشیو کیس‌های روز دوباره مرور کنید." : "فردا دوباره برای یک چالش بالینی جدید"}
              <br />
              بازگردید.
            </p>

            <p className="mt-5 text-center text-[15px] font-medium text-[#587298]">{caseData.diagnosis.name}</p>

            <div className="mx-auto mt-5 grid max-w-[640px] gap-3 sm:grid-cols-2">
              <Link
                href="/case/today/archive"
                className="relative flex h-[58px] items-center justify-center rounded-xl border border-[#cddcf0] bg-[#f8fbff] px-12 text-center text-[15px] font-medium text-[#173b61] transition hover:bg-[#f3f8fd]"
              >
                <span className="absolute left-4 flex items-center justify-center" aria-hidden="true">
                  <CalendarIcon />
                </span>
                <span>آرشیو کیس‌های روز</span>
                <span aria-hidden="true" className="absolute right-4 text-lg">→</span>
              </Link>

              <Link
                href={learnHref}
                className="relative flex h-[58px] items-center justify-center rounded-xl bg-[#153f65] px-14 text-[15px] font-medium !text-white shadow-sm transition hover:bg-[#123754]"
              >
                <span aria-hidden="true" className="absolute left-4 flex items-center justify-center text-lg !text-white">←</span>

                <span className="flex flex-col items-center justify-center text-center leading-5 font-[var(--font-vazirmatn)] text-[15px] font-medium !text-white" dir="ltr">
                  <span className="!text-white">Learn more about</span>
                  <span className="!text-white">{caseData.diagnosis.name}</span>
                </span>

                <span className="absolute right-4 flex h-[22px] w-[22px] items-center justify-center !text-white" aria-hidden="true">
                  <svg
                    width="22"
                    height="22"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="1.8"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  >
                    <path d="M6 3.5h8.5L19 8v12.5H6z" />
                    <path d="M14 3.5V8h5" />
                    <path d="M9 12h7M9 15.5h7" />
                  </svg>
                </span>
              </Link>
            </div>
          </section>
        </div>
      </main>
    );
  }

  return (
    <>
      <CasePlayer
        caseData={caseData}
        storageKey={archiveMode ? undefined : stateKey(dateKey, caseData.id)}
        onComplete={() => {
          if (!archiveMode) {
            window.localStorage.setItem(attemptKey(dateKey), "completed");
          }
          setShowCompletion(true);
        }}
        completionHref="/"
        showCompletionModal={false}
      />

      <ExperienceCompletionModal
        mode={archiveMode ? "daily-archive" : "daily"}
        open={showCompletion}
        diagnosisName={caseData.diagnosis.name}
        diagnosisId={caseData.diagnosis.id}
        dateKey={dateKey}
        onClose={() => {
          setShowCompletion(false);
          if (archiveMode) {
            window.location.assign("/case/today/archive");
          } else {
            setLocked(true);
          }
        }}
      />
    </>
  );
}
