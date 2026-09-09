"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";

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
    <div className="relative mx-auto w-full max-w-[700px]">
      <Image
  src="/clinical-reasoning.png"
  alt="استدلال بالینی"
  width={1536}
  height={1024}
  priority
  className="mx-auto h-auto w-[54%] max-w-[380px] object-contain sm:w-[46%] sm:max-w-[420px]"
/>
    </div>
  );
}

export default function ClinicalReasoningPage() {
  const router = useRouter();
  const [showHowItWorks, setShowHowItWorks] = useState(false);

  const startCase = () => {
  setShowHowItWorks(true);
};

  return (
    <main dir="rtl" className="min-h-screen bg-white text-slate-900">
      {/* HEADER */}
      <header className="border-b border-[#ece9e4] bg-[#fbfaf8]">
        <div className="mx-auto flex h-[76px] max-w-[1180px] items-center justify-between px-5 lg:px-8">
          <div className="flex items-center gap-6">
            <div className="flex items-center gap-3" dir="ltr">
              <span className="text-[30px] font-medium tracking-[-0.045em] text-[#1b2434]">
                SONIC
              </span>
              <span className="hidden border-l border-slate-300 pl-3 text-[11px] font-medium uppercase leading-[1.2] tracking-[0.14em] text-slate-500 sm:block">
                Sharpen your
                <br />
                clinical reasoning.
              </span>
            </div>
          </div>

          <div className="flex items-center gap-4 text-slate-700" dir="ltr">
            <button
              type="button"
              aria-label="جستجو"
              className="rounded-full p-1.5"
            >
              <svg width="21" height="21" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                <circle cx="10.8" cy="10.8" r="6.4" />
                <path d="m16 16 4 4" />
              </svg>
            </button>

            <span className="hidden h-7 w-px bg-slate-200 sm:block" />

            <span className="hidden text-[15px] font-medium text-[#1b2434] sm:block">نیکان</span>

            <div className="flex h-10 w-10 items-center justify-center rounded-full bg-[#223247] text-[15px] font-medium text-white">
              N
            </div>

            <button
              type="button"
              aria-label="منو"
              className="rounded-full p-1.5"
            >
              <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round">
                <path d="M4 7h16M4 12h16M4 17h16" />
              </svg>
            </button>
          </div>
        </div>
      </header>

      {/* MAIN */}
      <section dir="rtl" className="mx-auto max-w-[1180px] px-6 pb-8 pt-6 sm:px-8">
        {/* HERO */}
        <div className="text-center">
          <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-violet-50 text-violet-600">
            <Icon name="brain" size={37} strokeWidth={1.55} />
          </div>

          <p className="mt-3 text-[11px] font-semibold uppercase tracking-[0.25em] text-slate-500">
            استدلال بالینی
          </p>

          <h1 className="mt-2 text-[34px] font-semibold tracking-[-0.03em] text-slate-900 sm:text-[42px]">
            تخصص کیس پنهان است.
          </h1>

          <p className="mx-auto mt-2 max-w-[460px] text-[15px] leading-6 text-slate-500 sm:text-[16px]">
            خودت سرنخ‌ها را کنار هم بگذار و حلش کن.
          </p>
        </div>

        {/* BODY */}
        <div className="mt-1">
          <BodyIllustration />
        </div>

        {/* FEATURES */}
        <div className="mx-auto mt-0 grid max-w-[900px] grid-cols-1 divide-y divide-slate-200 border-y border-slate-200 md:grid-cols-3 md:divide-x md:divide-y-0">
          <div className="flex flex-col items-center px-5 py-5 text-center">
            <div className="flex h-10 w-10 items-center justify-center rounded-full border border-slate-200 bg-white text-slate-600">
              <Icon name="shuffle" size={19} />
            </div>

            <h3 className="mt-2 text-[15px] font-semibold">
              تخصص‌های مختلف
            </h3>

            <p className="mt-0.5 text-sm text-slate-500">
              کیس‌ها از همه تخصص‌ها
            </p>
          </div>

          <div className="flex flex-col items-center px-5 py-5 text-center">
            <div className="flex h-10 w-10 items-center justify-center rounded-full border border-slate-200 bg-white text-slate-600">
              <Icon name="chart" size={19} />
            </div>

            <h3 className="mt-2 text-[15px] font-semibold">
              چالش بالینی
            </h3>

            <p className="mt-0.5 text-sm text-slate-500">
              برای استدلال تمرین کن
            </p>
          </div>

          <div className="flex flex-col items-center px-5 py-5 text-center">
            <div className="flex h-10 w-10 items-center justify-center rounded-full border border-slate-200 bg-white text-slate-600">
              <Icon name="eye-off" size={19} />
            </div>

            <h3 className="mt-2 text-[15px] font-semibold">
              بدون سرنخ تخصصی
            </h3>

            <p className="mt-0.5 text-sm text-slate-500">
              تخصص را خودت پیدا کن
            </p>
          </div>
        </div>

        {/* CTA */}
        <div className="mt-6 flex flex-col items-center">
          <button
            type="button"
            onClick={startCase}
            className="w-full max-w-[490px] rounded-xl bg-violet-600 py-4 text-[18px] font-semibold text-white shadow-sm transition-all hover:bg-violet-700 hover:shadow-md active:scale-[0.99]"
          >
            شروع یک کیس
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
                  استدلال بالینی
                </p>

                <h2 className="mt-2 text-2xl font-semibold">
                  نحوه کار
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
                <p className="text-sm font-semibold">۰۱ — شرح حال</p>
                <p className="mt-0.5 text-sm leading-6 text-slate-500">
                  پیش از رسیدن به تشخیص، اطلاعات مرتبط را کامل جمع‌آوری کن.
                </p>
              </div>

              <div>
                <p className="text-sm font-semibold">۰۲ — معاینه</p>
                <p className="mt-0.5 text-sm leading-6 text-slate-500">
                  به یافته‌های معاینه‌ای توجه کن تا تشخیص افتراقی محدود شود.
                </p>
              </div>

              <div>
                <p className="text-sm font-semibold">۰۳ — بررسی</p>
                <p className="mt-0.5 text-sm leading-6 text-slate-500">
                  بررسی‌های تشخیصی را هدفمند و نه بی‌هدف درخواست کن.
                </p>
              </div>

              <div>
                <p className="text-sm font-semibold">۰۴ — تشخیص</p>
                <p className="mt-0.5 text-sm leading-6 text-slate-500">
                  سرنخ‌ها را کنار هم بگذار و تشخیص نهایی را انتخاب کن.
                </p>
              </div>
            </div>

            <button
              type="button"
              onClick={() => setShowHowItWorks(false)}
              className="mt-7 w-full rounded-lg bg-violet-600 py-3 text-sm font-semibold text-white hover:bg-violet-700"
            >
              متوجه شدم
            </button>
          </div>
        </div>
      )}
    </main>
  );
}