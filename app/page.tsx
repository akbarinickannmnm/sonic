"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { getDailyCase, readDailyCaseSchedule } from "../lib/dailyCase";

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

  if (name === "menu")
    return (
      <svg {...common}>
        <path d="M4 7h16M4 12h16M4 17h16" />
      </svg>
    );
  if (name === "search")
    return (
      <svg {...common}>
        <circle cx="10.8" cy="10.8" r="6.4" />
        <path d="m16 16 4 4" />
      </svg>
    );
  if (name === "calendar")
    return (
      <svg {...common}>
        <rect x="3.5" y="5" width="17" height="15" rx="2" />
        <path d="M7 3v4M17 3v4M3.5 9.5h17" />
      </svg>
    );
  if (name === "arrow")
    return (
      <svg {...common}>
        <path d="M5 12h13M13 6l6 6-6 6" />
      </svg>
    );
  if (name === "document")
    return (
      <svg {...common}>
        <path d="M6 3.5h8l4 4V20.5H6z" />
        <path d="M14 3.5v4h4M9 12h6M9 15.5h6" />
      </svg>
    );
  if (name === "bulb")
    return (
      <svg {...common}>
        <path d="M8.5 14.5c-1.3-1.1-2.1-2.8-2.1-4.7A5.6 5.6 0 0 1 12 4.2a5.6 5.6 0 0 1 5.6 5.6c0 1.9-.8 3.6-2.1 4.7-.8.7-1.2 1.6-1.2 2.5H9.7c0-.9-.4-1.8-1.2-2.5Z" />
        <path d="M10 20h4M10.5 17h3" />
      </svg>
    );
  if (name === "lungs")
    return (
      <svg {...common}>
        <path d="M12 4v8M11 12c-2-3-4-5-5.5-4C4 9 3 14 4 18c.6 2.5 4 2 6-1v-5M13 12c2-3 4-5 5.5-4C20 9 21 14 20 18c-.6 2.5-4 2-6-1v-5" />
      </svg>
    );
  if (name === "target")
    return (
      <svg {...common}>
        <circle cx="12" cy="12" r="8" />
        <circle cx="12" cy="12" r="4" />
        <path d="m17.5 6.5 2-2M19 4.5h-2.5M19.5 4.5V7" />
      </svg>
    );
  if (name === "bookmark")
    return (
      <svg {...common}>
        <path d="M6 4.5A2.5 2.5 0 0 1 8.5 2h7A2.5 2.5 0 0 1 18 4.5V21l-6-3.5L6 21V4.5Z" />
      </svg>
    );
  if (name === "chart")
    return (
      <svg {...common}>
        <path d="M4 19V9M10 19V5M16 19v-7M22 19H2" />
      </svg>
    );
  if (name === "trophy")
    return (
      <svg {...common}>
        <path d="M8 4h8v5a4 4 0 0 1-8 0V4Z" />
        <path d="M8 6H4v1a4 4 0 0 0 4 4M16 6h4v1a4 4 0 0 1-4 4M12 13v4M8 20h8M9 17h6" />
      </svg>
    );
  return null;
}

function persianDate(date = new Date()) {
  return new Intl.DateTimeFormat("fa-IR", {
    timeZone: "Asia/Tehran",
    day: "numeric",
    month: "long",
    year: "numeric",
  }).format(date);
}

export default function Home() {
  const router = useRouter();
  const [dailyCase, setDailyCase] = useState(() => getDailyCase(new Date()));

  useEffect(() => {
    const refresh = () => {
      const now = new Date();
      setDailyCase(getDailyCase(now, readDailyCaseSchedule()));
    };

    refresh();
    window.addEventListener("storage", refresh);
    window.addEventListener("sonic:daily-case-schedule-updated", refresh);
    return () => {
      window.removeEventListener("storage", refresh);
      window.removeEventListener("sonic:daily-case-schedule-updated", refresh);
    };
  }, []);

  const caseNumber = dailyCase.id.replace(/\D/g, "").slice(-3).padStart(3, "0");
  const difficultyLabel =
    dailyCase.difficulty === "easy"
      ? "آسان"
      : dailyCase.difficulty === "medium"
        ? "متوسط"
        : "سخت";

  return (
    <main dir="rtl" className="min-h-screen bg-[#fbfaf8] text-[#172033]">
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

          <div className="flex items-center gap-5 text-slate-700" dir="ltr">
            <button aria-label="جستجو" className="rounded-full p-1.5">
              <Icon name="search" size={22} />
            </button>
            <span className="h-5 w-px bg-slate-200" />
            <span className="hidden text-sm font-medium sm:block">Nikan</span>
            <span className="flex h-9 w-9 items-center justify-center rounded-full bg-[#1f2c3b] text-sm font-medium text-white">
              N
            </span>
            <button aria-label="منو" className="rounded-lg p-1.5">
              <Icon name="menu" size={24} />
            </button>
          </div>
        </div>
      </header>

      <div className="mx-auto max-w-[1180px] px-5 pb-14 pt-9 lg:px-8 lg:pt-10">
        <div className="mb-8 text-right">
          <h1 className="text-[30px] font-semibold tracking-[-0.02em] text-[#1c2a3b] sm:text-[34px]">
            سلام نیکان،
          </h1>
          <p className="mt-1 text-[17px] leading-7 text-slate-500">
            امروز با یک کیس جدید، یک قدم جلوتر.
          </p>
        </div>

        <article className="overflow-hidden rounded-2xl border border-[#e7e4de] bg-white shadow-[0_8px_30px_rgba(15,23,42,0.045)]">
          <div className="grid min-h-[390px] md:grid-cols-[1fr_1fr]" dir="ltr">
            <div className="relative order-1 min-h-[320px] overflow-hidden bg-[#f7f0ea] text-[#9a4846]">
              <div className="absolute left-8 top-8 text-[11px] font-medium uppercase leading-5 tracking-[0.18em]">
                <div>CASE OF</div>
                <div>THE DAY</div>
                <div className="mt-2 h-px w-8 bg-current" />
              </div>

              <div className="absolute bottom-8 left-8 text-[11px] font-medium uppercase leading-5 tracking-[0.15em]">
                <div>SONIC</div>
                <div>#{caseNumber}</div>
              </div>
            </div>

            <div className="order-2 flex min-h-[320px] flex-col justify-center px-7 py-10 sm:px-10 lg:px-12" dir="rtl">
              <div className="mb-5 flex flex-wrap items-center gap-x-5 gap-y-2 font-[var(--font-vazirmatn)] text-[13px] text-slate-500">
                <span className="flex items-center gap-1.5">
                  <span className="text-slate-400">♙</span>
                  {dailyCase.patient.sex === "male" ? "مرد" : "زن"}
                </span>
                <span className="h-4 w-px bg-slate-200" />
                <span>{dailyCase.patient.age} سال</span>
                <span className="h-4 w-px bg-slate-200" />
                <span>{difficultyLabel}</span>
              </div>

              <h2
                className="sonic-home-case-title max-w-[560px] font-[var(--font-vazirmatn)] text-[27px] font-semibold leading-[1.72] tracking-normal text-[#173250] sm:text-[31px]"
              >
                {dailyCase.presentation}
              </h2>

              <p className="mt-4 max-w-[520px] font-[var(--font-vazirmatn)] text-[16px] leading-8 text-[#5d7695]">
                یک بیمار {dailyCase.patient.age} ساله با این شکایت مراجعه کرده است. استدلال بالینی را از اولین قدم شروع کنید.
              </p>

              <button
                type="button"
                onClick={() => router.push("/case/today")}
                className="mt-6 flex w-full max-w-[520px] items-center justify-center gap-3 rounded-lg bg-[#183a5c] px-5 py-4 text-[15px] font-medium text-white transition hover:bg-[#12304d]"
              >
                شروع کیس امروز
                <span aria-hidden="true" className="text-lg">←</span>
              </button>
            </div>
          </div>
        </article>

        <section className="mt-8 grid gap-5 lg:grid-cols-2">
          <Link
            href="/practice"
            className="group rounded-2xl border border-[#dde6f3] bg-[#f5f8fe] p-7 transition hover:-translate-y-0.5 hover:border-[#cbd9ef] hover:shadow-[0_10px_28px_rgba(37,99,235,0.06)]"
          >
            <div className="flex items-start justify-between">
              <div className="flex h-14 w-14 items-center justify-center rounded-full bg-[#e7effc] text-[#415f8d]">
                <Icon name="document" size={29} />
              </div>
            </div>
            <div className="mt-5" dir="rtl">
              <h2 className="text-[23px] font-semibold text-[#24364e]">تمرین</h2>
              <p className="mt-2 text-[15px] leading-7 text-slate-500">
                کیس‌های بالینی را بر اساس تخصص
                <br />
                انتخاب و تمرین کن.
              </p>
            </div>
            <div className="mt-7 flex items-center gap-3 text-[#415f8d]" dir="ltr">
              <Icon name="arrow" size={22} />
              <span className="h-px w-16 bg-[#bfd0e8]" />
            </div>
          </Link>

          <Link
            href="/clinical-reasoning"
            className="group rounded-2xl border border-[#eee5d7] bg-[#faf6ef] p-7 transition hover:-translate-y-0.5 hover:border-[#e4d6bf] hover:shadow-[0_10px_28px_rgba(133,99,46,0.06)]"
          >
            <div className="flex items-start justify-between">
              <div className="flex h-14 w-14 items-center justify-center rounded-full bg-[#f4ecdf] text-[#8b7757]">
                <Icon name="bulb" size={30} />
              </div>
            </div>
            <div className="mt-5" dir="rtl">
              <h2 className="text-[23px] font-semibold text-[#24364e]">استدلال بالینی</h2>
              <p className="mt-2 text-[15px] leading-7 text-slate-500">
                کیس‌ها از همه تخصص‌ها هستند.
                <br />
                تخصص پنهان است؛ خودت آن را پیدا کن.
              </p>
            </div>
            <div className="mt-7 flex items-center gap-3 text-[#8b7757]" dir="ltr">
              <Icon name="arrow" size={22} />
              <span className="h-px w-16 bg-[#d9cbb5]" />
            </div>
          </Link>
        </section>

        <section className="mt-5 overflow-hidden rounded-2xl border border-[#e7e4de] bg-white shadow-[0_5px_18px_rgba(15,23,42,0.025)]">
          <div className="grid items-center gap-6 px-6 py-5 md:grid-cols-[1.05fr_1.3fr_auto] md:px-8">
            <div className="flex items-start gap-4" dir="rtl">
              <span className="mt-1 text-slate-600">
                <Icon name="lungs" size={28} />
              </span>
              <div>
                <p className="text-[12px] text-slate-400">ادامه یادگیری</p>
                <h3 className="mt-0.5 text-[20px] font-semibold text-[#22354e]">پنوموتوراکس</h3>
                <p className="mt-1 text-[13px] text-slate-500">در مرحله بررسی‌های تشخیصی بودی.</p>
              </div>
            </div>

            <div className="flex items-center gap-4" dir="rtl">
              <div className="min-w-0 flex-1">
                <div className="h-2 overflow-hidden rounded-full bg-[#e5e8ec]">
                  <div className="h-full w-[60%] rounded-full bg-[#203d5f]" />
                </div>
              </div>
              <span className="text-[13px] text-slate-500">۶۰٪</span>
            </div>

            <button
              type="button"
              onClick={() => router.push("/practice")}
              className="flex items-center justify-center gap-3 rounded-lg border border-[#cdd5df] px-6 py-3 text-[14px] font-medium text-[#2d4058] hover:bg-slate-50"
            >
              ادامه
              <span aria-hidden="true">←</span>
            </button>
          </div>
        </section>

        <section className="mt-8 grid border-b border-[#e5e2dd] pb-9 md:grid-cols-4" dir="rtl">
          {[
            ["trophy", "تقویت مهارت‌ها", "استدلال بالینی واقعی را تمرین کن."],
            ["chart", "پیگیری پیشرفت", "پیشرفتت را در طول زمان ببین."],
            ["bookmark", "یادگیری موثر", "توضیحات و نکات کلیدی را مرور کن."],
            ["target", "به چالش بکش خودت را", "هر روز کیس جدید؛ هر روز بهتر."],
          ].map(([icon, title, desc], index) => (
            <div
              key={title}
              className={`flex gap-4 px-5 py-4 ${index !== 3 ? "border-b border-slate-200 md:border-b-0 md:border-l" : ""}`}
            >
              <span className="mt-1 text-slate-700">
                <Icon name={icon} size={29} />
              </span>
              <div>
                <p className="text-[16px] font-semibold leading-7 text-[#26384f]">{title}</p>
                <p className="mt-1 text-[13px] leading-6 text-slate-500">{desc}</p>
              </div>
            </div>
          ))}
        </section>
      </div>

      <footer className="border-t border-[#e6e3de] bg-[#fbfaf8]">
        <div className="mx-auto grid max-w-[1180px] gap-9 px-5 py-10 sm:grid-cols-2 lg:grid-cols-5 lg:px-8">
          <div className="lg:col-span-2" dir="ltr">
            <div className="text-[25px] tracking-[-0.03em]">SONIC</div>
            <p className="mt-2 max-w-[260px] text-sm leading-6 text-slate-500">
              Sharpen your clinical reasoning.
              <br />
              Become a better clinician.
            </p>
            <p className="mt-5 text-xs text-slate-400">© 2026 SONIC. All rights reserved.</p>
          </div>

          <div>
            <h4 className="text-[11px] font-semibold uppercase tracking-[0.16em] text-slate-600">محصول</h4>
            <div className="mt-4 space-y-2 text-[13px] text-slate-500">
              <p>کیس‌ها</p><p>تخصص‌ها</p><p>حالت بالینی</p><p>نحوه کار</p>
            </div>
          </div>

          <div>
            <h4 className="text-[11px] font-semibold uppercase tracking-[0.16em] text-slate-600">حساب کاربری</h4>
            <div className="mt-4 space-y-2 text-[13px] text-slate-500">
              <p>پروفایل</p><p>پیشرفت</p><p>تنظیمات</p><p>خروج</p>
            </div>
          </div>

          <div>
            <h4 className="text-[11px] font-semibold uppercase tracking-[0.16em] text-slate-600">پشتیبانی</h4>
            <div className="mt-4 space-y-2 text-[13px] text-slate-500">
              <p>مرکز راهنما</p><p>تماس با ما</p><p>بازخورد</p><p>گزارش مشکل</p>
            </div>
          </div>
        </div>
      </footer>
    </main>
  );
}
