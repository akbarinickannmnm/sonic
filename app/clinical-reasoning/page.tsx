"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

function Icon({
  name,
  size = 24,
  strokeWidth = 1.8,
}: {
  name: string;
  size?: number;
  strokeWidth?: number;
}) {
  const common = {
    width: size,
    height: size,
    viewBox: "0 0 24 24",
    fill: "none",
    stroke: "currentColor",
    strokeWidth,
    strokeLinecap: "round" as const,
    strokeLinejoin: "round" as const,
  };

  if (name === "arrow-left")
    return (
      <svg {...common}>
        <path d="M19 12H5" />
        <path d="M12 19l-7-7 7-7" />
      </svg>
    );

  if (name === "bell")
    return (
      <svg {...common}>
        <path d="M18 8a6 6 0 0 0-12 0c0 7-3 7-3 9h18c0-2-3-2-3-9" />
        <path d="M10 21h4" />
      </svg>
    );

  if (name === "flame")
    return (
      <svg {...common}>
        <path d="M12 22c4 0 7-3 7-7 0-3.5-2.1-6.1-5.1-8.5.2 2.1-.7 3.5-2 4.4.2-3.5-1.7-6.5-4.1-8.9C7.7 7.2 5 10.5 5 15c0 4 3 7 7 7Z" />
      </svg>
    );

  if (name === "shuffle")
    return (
      <svg {...common}>
        <path d="M16 3h5v5" />
        <path d="M4 20 21 3" />
        <path d="M21 16v5h-5" />
        <path d="m15 15 6 6" />
        <path d="m4 4 5 5" />
      </svg>
    );

  if (name === "chart")
    return (
      <svg {...common}>
        <path d="M4 19V5" />
        <path d="M4 19h16" />
        <path d="M8 16v-5" />
        <path d="M12 16V8" />
        <path d="M16 16v-9" />
      </svg>
    );

  if (name === "eye-off")
    return (
      <svg {...common}>
        <path d="M3 3l18 18" />
        <path d="M10.6 10.6a2 2 0 0 0 2.8 2.8" />
        <path d="M9.9 5.2A10.9 10.9 0 0 1 12 5c5 0 8.5 5 9 7-.2.6-.8 1.8-1.8 3" />
        <path d="M6.6 6.6C4.5 8 3.4 10.4 3 12c.5 2 4 7 9 7 1.7 0 3.2-.5 4.5-1.2" />
      </svg>
    );

  if (name === "brain")
    return (
      <svg {...common}>
        <path d="M9.5 4.5A3.5 3.5 0 0 0 6 8v.5A3.5 3.5 0 0 0 4 12a3.5 3.5 0 0 0 2 3.2V16a3.5 3.5 0 0 0 4 3.4" />
        <path d="M14.5 4.5A3.5 3.5 0 0 1 18 8v.5a3.5 3.5 0 0 1 2 3.5 3.5 3.5 0 0 1-2 3.2V16a3.5 3.5 0 0 1-4 3.4" />
        <path d="M12 4v16" />
        <path d="M8 9h1" />
        <path d="M15 9h1" />
        <path d="M8 14h1" />
        <path d="M15 14h1" />
      </svg>
    );

  if (name === "heart")
    return (
      <svg {...common}>
        <path d="M20.8 8.8c0 5.5-8.8 10.2-8.8 10.2S3.2 14.3 3.2 8.8A4.8 4.8 0 0 1 12 6.2a4.8 4.8 0 0 1 8.8 2.6Z" />
      </svg>
    );

  if (name === "lungs")
    return (
      <svg {...common}>
        <path d="M12 4v7" />
        <path d="M11 11c-2-3-4.2-5-5.8-5-1.5 0-2.2 1.5-2.2 4v5c0 2.8 1.8 4 4 4 2.2 0 4-1.8 4-4" />
        <path d="M13 11c2-3 4.2-5 5.8-5 1.5 0 2.2 1.5 2.2 4v5c0 2.8-1.8 4-4 4-2.2 0-4-1.8-4-4" />
      </svg>
    );

  if (name === "kidney")
    return (
      <svg {...common}>
        <path d="M10 4c-3 0-5 2.5-5 6 0 4 2 7 5 7 2 0 3-1.5 3-3.5V9c0-3-1-5-3-5Z" />
        <path d="M14 4c3 0 5 2.5 5 6 0 4-2 7-5 7-2 0-3-1.5-3-3.5V9c0-3 1-5 3-5Z" />
      </svg>
    );

  if (name === "stomach")
    return (
      <svg {...common}>
        <path d="M9 4c1 2 1 4 3 4 2 0 3-2 3-4" />
        <path d="M15 4v5c0 2 1 3 3 4 1.5.8 2 2 2 3.5C20 19 17 20 14 20c-4 0-6-2.5-6-6V9" />
      </svg>
    );

  if (name === "bone")
    return (
      <svg {...common}>
        <path d="M7 8a3 3 0 1 1-2.8-4A3 3 0 0 1 8 7.2l8.8 8.8A3 3 0 1 1 13 19a3 3 0 0 1-1.2-2.8L7 11.4A3 3 0 0 1 7 8Z" />
      </svg>
    );

  if (name === "sun")
    return (
      <svg {...common}>
        <circle cx="12" cy="12" r="4" />
        <path d="M12 2v2M12 20v2M4.9 4.9l1.4 1.4M17.7 17.7l1.4 1.4M2 12h2M20 12h2M4.9 19.1l1.4-1.4M17.7 6.3l1.4-1.4" />
      </svg>
    );

  return null;
}

function BodyIllustration() {
  return (
    <div className="relative mx-auto h-[390px] w-[520px] max-w-full">
      {/* connecting lines */}
      <div className="absolute left-[112px] top-[94px] h-px w-[112px] rotate-[27deg] border-t border-dashed border-slate-300" />
      <div className="absolute right-[112px] top-[94px] h-px w-[112px] -rotate-[27deg] border-t border-dashed border-slate-300" />

      <div className="absolute left-[98px] top-[194px] h-px w-[112px] rotate-[7deg] border-t border-dashed border-slate-300" />
      <div className="absolute right-[98px] top-[194px] h-px w-[112px] -rotate-[7deg] border-t border-dashed border-slate-300" />

      <div className="absolute left-[125px] top-[295px] h-px w-[92px] -rotate-[21deg] border-t border-dashed border-slate-300" />
      <div className="absolute right-[125px] top-[295px] h-px w-[92px] rotate-[21deg] border-t border-dashed border-slate-300" />

      {/* body */}
      <div className="absolute left-1/2 top-[58px] h-[320px] w-[230px] -translate-x-1/2">
        <div className="absolute left-1/2 top-0 h-[78px] w-[64px] -translate-x-1/2 rounded-[45%] bg-slate-100" />

        <div className="absolute left-[42px] top-[58px] h-[220px] w-[146px] rounded-t-[70px] bg-slate-100" />

        <div className="absolute left-[29px] top-[93px] h-[190px] w-[48px] rotate-[8deg] rounded-full bg-slate-100" />

        <div className="absolute right-[29px] top-[93px] h-[190px] w-[48px] -rotate-[8deg] rounded-full bg-slate-100" />

        <div className="absolute left-[61px] top-[255px] h-[90px] w-[48px] rotate-[3deg] rounded-full bg-slate-100" />

        <div className="absolute right-[61px] top-[255px] h-[90px] w-[48px] -rotate-[3deg] rounded-full bg-slate-100" />

        {/* question mark */}
        <div className="absolute left-1/2 top-[130px] -translate-x-1/2 text-[92px] font-medium leading-none text-slate-800">
          ?
        </div>
      </div>

      {/* organs */}
      <div className="absolute left-[48px] top-[55px] flex h-[76px] w-[76px] items-center justify-center rounded-full bg-slate-50 text-slate-300 shadow-sm">
        <Icon name="heart" size={35} strokeWidth={1.5} />
      </div>

      <div className="absolute right-[48px] top-[55px] flex h-[76px] w-[76px] items-center justify-center rounded-full bg-slate-50 text-slate-300 shadow-sm">
        <Icon name="brain" size={35} strokeWidth={1.5} />
      </div>

      <div className="absolute left-[25px] top-[156px] flex h-[76px] w-[76px] items-center justify-center rounded-full bg-slate-50 text-slate-300 shadow-sm">
        <Icon name="lungs" size={35} strokeWidth={1.5} />
      </div>

      <div className="absolute right-[25px] top-[156px] flex h-[76px] w-[76px] items-center justify-center rounded-full bg-slate-50 text-slate-300 shadow-sm">
        <Icon name="kidney" size={35} strokeWidth={1.5} />
      </div>

      <div className="absolute left-[55px] top-[270px] flex h-[76px] w-[76px] items-center justify-center rounded-full bg-slate-50 text-slate-300 shadow-sm">
        <Icon name="stomach" size={35} strokeWidth={1.5} />
      </div>

      <div className="absolute right-[55px] top-[270px] flex h-[76px] w-[76px] items-center justify-center rounded-full bg-slate-50 text-slate-300 shadow-sm">
        <Icon name="bone" size={35} strokeWidth={1.5} />
      </div>
    </div>
  );
}

export default function ClinicalReasoningPage() {
  const router = useRouter();
  const [showHowItWorks, setShowHowItWorks] = useState(false);

  const startCase = () => {
    /*
      فعلاً فقط placeholder است.
      بعداً اینجا منطق انتخاب random case را وصل می‌کنیم.
    */
    console.log("Start random clinical reasoning case");
  };

  return (
    <main className="min-h-screen bg-white text-slate-900">
      {/* HEADER */}
      <header className="flex h-[72px] items-center border-b border-slate-200 px-6 sm:px-8">
        <div className="flex w-full items-center justify-between">
          <div className="flex items-center gap-5">
            <button
              type="button"
              onClick={() => router.push("/")}
              className="flex h-9 w-9 items-center justify-center rounded-lg text-slate-700 transition-colors hover:bg-slate-50"
              aria-label="Back"
            >
              <Icon name="arrow-left" size={22} />
            </button>

            <div className="flex items-center gap-3">
              <div className="text-[29px] font-semibold tracking-[-0.04em]">
                SONIC
              </div>

              <div className="h-7 w-px bg-slate-300" />

              <div className="text-[12px] font-medium uppercase leading-[1.15] tracking-[0.17em] text-slate-700">
                CLINICAL
                <br />
                REASONING
              </div>
            </div>
          </div>

          <div className="flex items-center gap-5">
            <div className="hidden items-center gap-2 sm:flex">
              <span className="text-orange-500">
                <Icon name="flame" size={21} />
              </span>

              <div className="leading-tight">
                <div className="text-sm font-semibold text-slate-900">
                  12
                </div>
                <div className="text-[11px] text-slate-500">
                  Day Streak
                </div>
              </div>
            </div>

            <button
              type="button"
              className="relative flex h-9 w-9 items-center justify-center rounded-full text-slate-700"
            >
              <Icon name="bell" size={22} />
              <span className="absolute right-[5px] top-[4px] h-2 w-2 rounded-full bg-red-500" />
            </button>

            <div className="flex h-10 w-10 items-center justify-center rounded-full bg-violet-50 text-lg font-medium text-violet-600">
              N
            </div>
          </div>
        </div>
      </header>

      {/* MAIN */}
      <section className="mx-auto max-w-[1120px] px-6 pb-20 pt-14 sm:px-10">
        {/* HERO */}
        <div className="text-center">
          <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-violet-50 text-violet-600">
            <Icon name="brain" size={37} strokeWidth={1.55} />
          </div>

          <p className="mt-7 text-[11px] font-semibold uppercase tracking-[0.25em] text-slate-500">
            CLINICAL REASONING
          </p>

          <h1 className="mt-4 text-[40px] font-semibold tracking-[-0.04em] text-slate-900 sm:text-[46px]">
            The specialty is hidden.
          </h1>

          <p className="mx-auto mt-5 max-w-[550px] text-[18px] leading-7 text-slate-600">
            Figure it out yourself.
          </p>
        </div>

        {/* BODY */}
        <div className="mt-5">
          <BodyIllustration />
        </div>

        {/* FEATURES */}
        <div className="mx-auto mt-[-5px] grid max-w-[900px] grid-cols-1 divide-y divide-slate-200 border-y border-slate-200 md:grid-cols-3 md:divide-x md:divide-y-0">
          <div className="flex flex-col items-center px-6 py-7 text-center">
            <div className="flex h-10 w-10 items-center justify-center rounded-full border border-slate-200 bg-white text-slate-600">
              <Icon name="shuffle" size={19} />
            </div>

            <h3 className="mt-3 text-[15px] font-semibold">
              Mixed specialties
            </h3>

            <p className="mt-1 text-sm text-slate-500">
              Cases from all systems
            </p>
          </div>

          <div className="flex flex-col items-center px-6 py-7 text-center">
            <div className="flex h-10 w-10 items-center justify-center rounded-full border border-slate-200 bg-white text-slate-600">
              <Icon name="chart" size={19} />
            </div>

            <h3 className="mt-3 text-[15px] font-semibold">
              Easy – Medium
            </h3>

            <p className="mt-1 text-sm text-slate-500">
              Just the right challenge
            </p>
          </div>

          <div className="flex flex-col items-center px-6 py-7 text-center">
            <div className="flex h-10 w-10 items-center justify-center rounded-full border border-slate-200 bg-white text-slate-600">
              <Icon name="eye-off" size={19} />
            </div>

            <h3 className="mt-3 text-[15px] font-semibold">
              No specialty hints
            </h3>

            <p className="mt-1 text-sm text-slate-500">
              You identify the system
            </p>
          </div>
        </div>

        {/* CTA */}
        <div className="mt-9 flex flex-col items-center">
          <button
            type="button"
            onClick={startCase}
            className="w-full max-w-[490px] rounded-xl bg-violet-600 py-4 text-[18px] font-semibold text-white shadow-sm transition-all hover:bg-violet-700 hover:shadow-md active:scale-[0.99]"
          >
            Start a Case
          </button>

          <p className="mt-4 text-sm text-slate-500">
            Estimated time: 10–15 min
          </p>
        </div>

        {/* HOW IT WORKS */}
        <section className="mt-12 overflow-hidden rounded-xl border border-violet-100 bg-violet-50/20">
          <div className="px-7 py-7">
            <h2 className="text-[18px] font-semibold tracking-[-0.02em]">
              How it works
            </h2>

            <div className="mt-7 grid grid-cols-1 gap-7 md:grid-cols-4 md:gap-0">
              <div className="relative text-center md:border-r md:border-slate-200">
                <div className="mx-auto flex h-10 w-10 items-center justify-center rounded-full bg-violet-100 text-sm font-semibold text-violet-600">
                  1
                </div>

                <h3 className="mt-4 text-[15px] font-medium">
                  Take a history
                </h3>

                <p className="mt-1 text-sm text-slate-500">
                  Listen carefully
                </p>

                <span className="absolute right-[-12px] top-5 hidden text-xl text-slate-300 md:block">
                  →
                </span>
              </div>

              <div className="relative text-center md:border-r md:border-slate-200">
                <div className="mx-auto flex h-10 w-10 items-center justify-center rounded-full bg-violet-100 text-sm font-semibold text-violet-600">
                  2
                </div>

                <h3 className="mt-4 text-[15px] font-medium">
                  Examine
                </h3>

                <p className="mt-1 text-sm text-slate-500">
                  Find the clues
                </p>

                <span className="absolute right-[-12px] top-5 hidden text-xl text-slate-300 md:block">
                  →
                </span>
              </div>

              <div className="relative text-center md:border-r md:border-slate-200">
                <div className="mx-auto flex h-10 w-10 items-center justify-center rounded-full bg-violet-100 text-sm font-semibold text-violet-600">
                  3
                </div>

                <h3 className="mt-4 text-[15px] font-medium">
                  Investigate
                </h3>

                <p className="mt-1 text-sm text-slate-500">
                  Order wisely
                </p>

                <span className="absolute right-[-12px] top-5 hidden text-xl text-slate-300 md:block">
                  →
                </span>
              </div>

              <div className="text-center">
                <div className="mx-auto flex h-10 w-10 items-center justify-center rounded-full bg-violet-100 text-sm font-semibold text-violet-600">
                  4
                </div>

                <h3 className="mt-4 text-[15px] font-medium">
                  Diagnose
                </h3>

                <p className="mt-1 text-sm text-slate-500">
                  Make your call
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* HOW IT WORKS BUTTON */}
        <div className="mt-7 text-center">
          <button
            type="button"
            onClick={() => setShowHowItWorks(true)}
            className="text-sm font-medium text-violet-600 transition-colors hover:text-violet-700"
          >
            Learn more about Clinical Reasoning
          </button>
        </div>
      </section>

      {/* MODAL */}
      {showHowItWorks && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-slate-950/45 px-5 backdrop-blur-[2px]"
          onMouseDown={(e) => {
            if (e.target === e.currentTarget) {
              setShowHowItWorks(false);
            }
          }}
        >
          <div className="w-full max-w-[500px] rounded-2xl bg-white p-7 shadow-2xl">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-[11px] font-semibold uppercase tracking-[0.2em] text-violet-600">
                  CLINICAL REASONING
                </p>

                <h2 className="mt-2 text-2xl font-semibold">
                  How it works
                </h2>
              </div>

              <button
                type="button"
                onClick={() => setShowHowItWorks(false)}
                className="flex h-9 w-9 items-center justify-center rounded-lg text-xl text-slate-500 hover:bg-slate-100"
              >
                ×
              </button>
            </div>

            <div className="mt-7 space-y-5">
              <div>
                <p className="text-sm font-semibold">01 — Take a history</p>
                <p className="mt-1 text-sm leading-6 text-slate-500">
                  Gather the relevant information before jumping to a diagnosis.
                </p>
              </div>

              <div>
                <p className="text-sm font-semibold">02 — Examine</p>
                <p className="mt-1 text-sm leading-6 text-slate-500">
                  Look for physical findings that narrow your differential.
                </p>
              </div>

              <div>
                <p className="text-sm font-semibold">03 — Investigate</p>
                <p className="mt-1 text-sm leading-6 text-slate-500">
                  Order investigations deliberately rather than indiscriminately.
                </p>
              </div>

              <div>
                <p className="text-sm font-semibold">04 — Diagnose</p>
                <p className="mt-1 text-sm leading-6 text-slate-500">
                  Put the clues together and make your final diagnosis.
                </p>
              </div>
            </div>

            <button
              type="button"
              onClick={() => setShowHowItWorks(false)}
              className="mt-7 w-full rounded-lg bg-violet-600 py-3 text-sm font-semibold text-white hover:bg-violet-700"
            >
              Got it
            </button>
          </div>
        </div>
      )}
    </main>
  );
}