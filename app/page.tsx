"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import type { ReactNode } from "react";
import {
  getDailyCase,
  readDailyCaseSchedule,
} from "../lib/dailyCase";
import { getMasterCaseBank } from "../data/courseBanks";

/* =========================================================
   TYPES
========================================================= */

type DailyCase = ReturnType<typeof getDailyCase>;

type LastPracticeActivity = {
  course: string;
  caseId: string;
  title: string;
  difficulty: string;
  totalCases: number;
  updatedAt: number;
};

type ContinueCaseData = {
  title: string;
  course: string;
  specialty: string;
  iconSrc: string;
  level: string;
  progress: string;
  percent: number;
  type: string;
  href: string;
};

/* =========================================================
   DATA
========================================================= */

const progressCourses = [
  { key: "pulmonology", title: "ریه" },
  { key: "cardiology", title: "قلب" },
  { key: "nephrology", title: "کلیه" },
  { key: "gastroenterology", title: "گوارش" },
] as const;

/* =========================================================
   SPECIALTY PNGS
   IMPORTANT:
   Practice card uses PNG only.
========================================================= */

const practiceSpecialties = [
  {
    key: "pulmonology",
    label: "ریه",
    src: "/icons/courses/lungs.png",
  },
  {
    key: "cardiology",
    label: "قلب",
    src: "/icons/courses/heart.png",
  },
  {
    key: "nephrology",
    label: "کلیه",
    src: "/icons/courses/kidney.png",
  },
  {
    key: "gastroenterology",
    label: "گوارش",
    src: "/icons/courses/stomach.png",
  },
  {
    key: "neurology",
    label: "نورولوژی",
    src: "/icons/courses/brain.png",
  },
];



/* =========================================================
   HELPERS
========================================================= */

function courseLabel(course: string) {
  const labels: Record<string, string> = {
    pulmonology: "ریه",
    cardiology: "قلب",
    nephrology: "کلیه",
    gastroenterology: "گوارش",
    endocrinology: "غدد",
    neurology: "نورولوژی",
    "hematology-oncology": "هماتولوژی و انکولوژی",
    "infectious-disease": "بیماری‌های عفونی",
  };

  return labels[course] ?? course;
}

function courseIcon(course: string) {
  const icons: Record<string, string> = {
    pulmonology: "/course-icons-png/respiratory.png",
    cardiology: "/course-icons-png/cardiovascular.png",
    nephrology: "/course-icons-png/renal.png",
    gastroenterology: "/course-icons-png/gastrointestinal.png",
    endocrinology: "/course-icons-png/endocrine.png",
    hematology: "/course-icons-png/hematology.png",
    "hematology-oncology": "/course-icons-png/hematology.png",
  };

  return icons[course] ?? "/course-icons-png/endocrine.png";
}

function courseProgressColor(course: string) {
  const colors: Record<string, string> = {
    pulmonology: "#4c7194",
    cardiology: "#8b3f53",
    nephrology: "#15919a",
    gastroenterology: "#6b7f5a",
  };

  return colors[course] ?? "#294b45";
}

function difficultyLabel(
  difficulty: string,
) {
  if (difficulty === "easy") return "آسان";
  if (difficulty === "medium") return "متوسط";
  return "سخت";
}

/* =========================================================
   PAGE
========================================================= */

export default function HomePage() {
  const router = useRouter();

  const [dailyCase, setDailyCase] =
    useState<DailyCase>(() =>
      getDailyCase(new Date()),
    );

  const [continueItem, setContinueItem] =
    useState<ContinueCaseData | null>(null);

  const [progressByCourse, setProgressByCourse] = useState<Record<string, number>>({
    pulmonology: 0,
    cardiology: 0,
    nephrology: 0,
    gastroenterology: 0,
  });

  const [totalCompletedCases, setTotalCompletedCases] = useState(0);
  const [totalCases, setTotalCases] = useState(0);

  useEffect(() => {
    const refreshContinueLearning = () => {
      if (typeof window === "undefined") return;

      try {
        const raw = window.localStorage.getItem("sonic:last-practice-course");
        if (!raw) {
          setContinueItem(null);
          return;
        }

        const activity = JSON.parse(raw) as Partial<LastPracticeActivity>;
        if (
          typeof activity.course !== "string" ||
          typeof activity.caseId !== "string" ||
          typeof activity.updatedAt !== "number"
        ) {
          setContinueItem(null);
          return;
        }

        const activityTotalCases =
          typeof activity.totalCases === "number" && activity.totalCases > 0
            ? activity.totalCases
            : 1;

        let completedCases = 0;

        for (let i = 0; i < window.localStorage.length; i += 1) {
          const key = window.localStorage.key(i);
          if (!key?.startsWith(`sonic:practice:${activity.course}:`)) continue;

          try {
            const caseState = JSON.parse(
              window.localStorage.getItem(key) ?? "null",
            ) as { completed?: boolean } | null;

            if (caseState?.completed === true) {
              completedCases += 1;
            }
          } catch {
            // Ignore malformed legacy entries.
          }
        }

        const percent = Math.min(100, Math.round((completedCases / activityTotalCases) * 100));

        setContinueItem({
          title: courseLabel(activity.course),
          course: activity.course,
          specialty: courseLabel(activity.course),
          iconSrc: courseIcon(activity.course),
          level: difficultyLabel(
            typeof activity.difficulty === "string" ? activity.difficulty : "medium",
          ),
          progress: `${completedCases} از ${activityTotalCases}`,
          percent,
          type: "",
          href: `/practice/${activity.course}/${activity.caseId}`,
        });
      } catch {
        setContinueItem(null);
      }
    };

    refreshContinueLearning();

    window.addEventListener("storage", refreshContinueLearning);
    window.addEventListener("sonic:last-practice-updated", refreshContinueLearning);

    return () => {
      window.removeEventListener("storage", refreshContinueLearning);
      window.removeEventListener("sonic:last-practice-updated", refreshContinueLearning);
    };
  }, []);

  useEffect(() => {
    const refreshProgress = () => {
      if (typeof window === "undefined") return;

      const allCases = getMasterCaseBank();
      const nextProgress: Record<string, number> = {};

      for (const course of progressCourses) {
        const courseCases = allCases.filter((item) => item.course === course.key);
        let completed = 0;

        for (const caseData of courseCases) {
          try {
            const raw = window.localStorage.getItem(`sonic:practice:${course.key}:${caseData.id}`);
            if (!raw) continue;

            const state = JSON.parse(raw) as { completed?: boolean };
            if (state.completed === true) completed += 1;
          } catch {
            // Ignore malformed progress entries.
          }
        }

        nextProgress[course.key] = courseCases.length
          ? Math.round((completed / courseCases.length) * 100)
          : 0;
      }

      // The headline counter reflects every completed practice case in the master bank.
      let completedTotal = 0;
      for (const caseData of allCases) {
        try {
          const raw = window.localStorage.getItem(`sonic:practice:${caseData.course}:${caseData.id}`);
          if (!raw) continue;

          const state = JSON.parse(raw) as { completed?: boolean };
          if (state.completed === true) completedTotal += 1;
        } catch {
          // Ignore malformed progress entries.
        }
      }

      setProgressByCourse(nextProgress);
      setTotalCompletedCases(completedTotal);
      setTotalCases(allCases.length);
    };

    refreshProgress();

    const handleStorage = () => refreshProgress();
    const handlePracticeProgress = () => refreshProgress();

    window.addEventListener("storage", handleStorage);
    window.addEventListener("sonic:practice-progress-updated", handlePracticeProgress);
    window.addEventListener("sonic:last-practice-updated", handlePracticeProgress);

    return () => {
      window.removeEventListener("storage", handleStorage);
      window.removeEventListener("sonic:practice-progress-updated", handlePracticeProgress);
      window.removeEventListener("sonic:last-practice-updated", handlePracticeProgress);
    };
  }, []);

  useEffect(() => {
    const refreshDailyCase = () => {
      const now = new Date();

      setDailyCase(
        getDailyCase(
          now,
          readDailyCaseSchedule(),
        ),
      );
    };

    refreshDailyCase();

    window.addEventListener(
      "storage",
      refreshDailyCase,
    );

    window.addEventListener(
      "sonic:daily-case-schedule-updated",
      refreshDailyCase,
    );

    return () => {
      window.removeEventListener(
        "storage",
        refreshDailyCase,
      );

      window.removeEventListener(
        "sonic:daily-case-schedule-updated",
        refreshDailyCase,
      );
    };
  }, []);

  const difficulty = difficultyLabel(
    dailyCase.difficulty,
  );

  const specialty = courseLabel(
    dailyCase.course,
  );

  const totalProgressPercent = totalCases
    ? Math.round((totalCompletedCases / totalCases) * 100)
    : 0;

  // Show courses in descending order of completed-case percentage.
  const sortedProgressCourses = [...progressCourses].sort((a, b) => {
    const progressA = progressByCourse[a.key] ?? 0;
    const progressB = progressByCourse[b.key] ?? 0;
    return progressB - progressA;
  });

  return (
    <main
      dir="rtl"
      className="min-h-screen bg-[#fbfaf8] text-[#172033]"
    >
      <div className="sonic-fixed-container pb-14 pt-6 lg:pt-7">

        {/* =================================================
            CASE OF THE DAY
            TEXT = RIGHT
            IMAGE = LEFT
        ================================================== */}

        <section
          dir="ltr"
          style={{
            fontFamily:
              "var(--font-vazirmatn), sans-serif",
          }}
          className="
            w-full
            overflow-hidden
            rounded-[18px]
            border
            border-[#e7e4de]
            bg-white
            shadow-[0_8px_30px_rgba(15,23,42,0.045)]
          "
        >
          <div className="grid h-[300px] md:grid-cols-[0.98fr_1.02fr]">

            {/* =================================================
                IMAGE / VISUAL — LEFT
            ================================================== */}

            <div
              dir="ltr"
              className="
                relative
                order-1
                h-full
                overflow-hidden
                bg-[#f4f5f2]
              "
            >
              <img
                src="/case-of-day-cardiology.png"
                alt="آنژیوگرافی عروق کرونر"
                className="absolute inset-0 h-full w-full object-cover object-left"
                style={{
                  maskImage:
                    "linear-gradient(to right, black 56%, rgba(0,0,0,0.72) 70%, transparent 100%)",
                  WebkitMaskImage:
                    "linear-gradient(to right, black 56%, rgba(0,0,0,0.72) 70%, transparent 100%)",
                }}
                draggable={false}
              />
            </div>

            {/* =================================================
                TEXT — RIGHT
            ================================================== */}

            <div
              dir="rtl"
              className="
                order-2
                flex
                h-full
                min-h-0
                flex-col
                justify-center
                overflow-hidden
                px-8
                py-5
                sm:px-10
                lg:px-11
              "
            >
              {/* 1 — CASE TODAY */}
              <div className="flex items-center gap-2">
                <span className="text-[15px] leading-none text-[#617c72]">
                  ●
                </span>

                <span className="text-[16px] font-semibold leading-5 text-[#111d28]">
                  کیس امروز
                </span>
              </div>

              {/* 2 — CHIEF COMPLAINT */}
              <h2
                className="
                  mt-2
                  max-w-[600px]
                  text-[27px]
                  font-semibold
                  leading-[1.28]
                  tracking-normal
                  text-[#173250]
                  sm:text-[29px]
                "
              >
                {dailyCase.presentation}
              </h2>

              {/* 3 — SHORT DESCRIPTION */}
              <p
                className="
                  mt-2
                  max-w-[560px]
                  text-[13px]
                  leading-5
                  text-[#607793]
                "
              >
                بیمار {dailyCase.patient.age} ساله با این شکایت مراجعه کرده است.
                کیس را از اولین قدم بررسی کن و به تشخیص برس.
              </p>

              {/* 4 — DIFFICULTY + COURSE */}
              <div className="mt-3 flex flex-wrap justify-start gap-2">
                <CaseBadge>
                  {difficulty}
                </CaseBadge>

                <CaseBadge>
                  {specialty}
                </CaseBadge>
              </div>

              {/* 5 — START CASE */}
              <button
                type="button"
                onClick={() =>
                  router.push("/case/today")
                }
                className="
                  mt-4
                  flex
                  h-[46px]
                  w-full
                  max-w-[235px]
                  items-center
                  justify-center
                  gap-3
                  rounded-[11px]
                  bg-[#294b45]
                  text-[13px]
                  font-medium
                  text-white
                  transition
                  hover:bg-[#213f3a]
                "
              >
                شروع کیس
                <ArrowLeftIcon size={17} />
              </button>
            </div>
          </div>
        </section>

        {/* =================================================
            PRACTICE MODES
            RIGHT → LEFT
        ================================================== */}

        <section className="mt-8">

          <div className="mb-4 text-right">
            <h2
              className="
                font-[var(--font-vazirmatn)]
                text-[24px]
                font-semibold
                tracking-[-0.025em]
                text-[#152b3c]
              "
            >
              انتخاب مسیر تمرین
            </h2>

            <p className="mt-1 text-[13px] text-[#87919a]">
              با توجه به هدف خود، مسیر مناسب را انتخاب کنید.
            </p>
          </div>

          <div
            dir="rtl"
            className="
              grid
              grid-cols-1
              gap-4
              lg:grid-cols-12
              lg:items-stretch
            "
          >

            {/* =================================================
                1 — PRACTICE
            ================================================== */}

            <div
              role="link"
              tabIndex={0}
              onClick={() => router.push("/practice")}
              onKeyDown={(event) => {
                if (event.key === "Enter" || event.key === " ") {
                  event.preventDefault();
                  router.push("/practice");
                }
              }}
              className="
                group
                order-1
                relative
                h-[242px]
                lg:col-span-5
                cursor-pointer
                overflow-hidden
                rounded-[15px]
                bg-[#294640]
                px-8
                py-7
                shadow-[0_9px_28px_rgba(28,59,53,0.11)]
                transition
                hover:-translate-y-[2px]
                hover:shadow-[0_14px_32px_rgba(28,59,53,0.14)]
                focus:outline-none
                focus:ring-2
                focus:ring-[#9db8ae]
                focus:ring-offset-2
              "
            >
              <div className="pointer-events-none absolute inset-0 overflow-hidden opacity-[0.08]">
                <div className="absolute -left-14 top-4 h-[190px] w-[190px] rounded-full border border-white" />
                <div className="absolute -left-24 top-16 h-[275px] w-[275px] rounded-full border border-white" />
              </div>

              <div className="relative flex h-full flex-col justify-between">

                <div className="flex items-start justify-between">

                  <div className="text-right">

                    <h3 className="font-[var(--font-vazirmatn)] text-[24px] font-bold text-[#dfe9e5]">
                      تمرین (بر اساس تخصص)
                    </h3>

                    <p className="mt-2 font-[var(--font-vazirmatn)] text-[13px] text-[#b7c8c1]">
                      حل کیس‌های طبقه‌بندی شده بر اساس هر تخصص
                    </p>

                  </div>

                  {/* PNG ONLY */}
                  <div className="flex h-[56px] w-[56px] items-center justify-center rounded-[13px] bg-white/10">
                    <img
                      src="/icons/ui/practice.png"
                      alt=""
                      aria-hidden="true"
                      className="h-[32px] w-[32px] object-contain"
                      draggable={false}
                    />
                  </div>

                </div>

                <div className="mt-5 flex items-end justify-between">

                  {/* PNG specialties */}
                  <div className="flex flex-row-reverse gap-2">

                    {practiceSpecialties.map(
                      (item) => (
                        <Link
                          key={item.key}
                          href={`/practice/${item.key}`}
                          title={item.label}
                          onClick={(event) => event.stopPropagation()}
                          className="
                            flex
                            h-[42px]
                            w-[42px]
                            items-center
                            justify-center
                            rounded-full
                            border
                            border-white/15
                            bg-white/[0.05]
                            transition
                            hover:bg-white/[0.11]
                            hover:scale-105
                            focus:outline-none
                            focus:ring-2
                            focus:ring-[#b8cec5]
                          "
                        >
                          <img
                            src={item.src}
                            alt={item.label}
                            className="h-[22px] w-[22px] object-contain"
                            draggable={false}
                          />
                        </Link>
                      ),
                    )}

                    <span
                      title="تخصص‌های بیشتر"
                      className="
                        flex
                        h-[42px]
                        w-[42px]
                        items-center
                        justify-center
                        rounded-full
                        border
                        border-white/15
                        bg-white/[0.05]
                        text-[16px]
                        tracking-widest
                      "
                    >
                      •••
                    </span>

                  </div>

                  {/* LEFT ARROW */}
                  <span
                    aria-hidden="true"
                    className="
                      flex
                      h-[50px]
                      w-[50px]
                      items-center
                      justify-center
                      rounded-full
                      bg-white
                      transition
                      group-hover:scale-105
                    "
                  >
                    <img
                      src="/icons/ui/arrow-left.png"
                      alt=""
                      aria-hidden="true"
                      className="h-[22px] w-[22px] object-contain"
                      draggable={false}
                    />
                  </span>

                </div>
              </div>
            </div>


            <div
              className="
                order-2
                grid
                min-w-0
                grid-cols-1
                gap-4
                lg:col-span-7
                lg:grid-cols-3
              "
            >
            {/* =================================================
                2 — CLINICAL REASONING
            ================================================== */}

            <Link
              href="/clinical-reasoning"
              className="
                group
                h-[242px]
                min-w-0
                rounded-[15px]
                border
                border-[#eee5d7]
                bg-[#faf6ef]
                p-6
                shadow-[0_5px_20px_rgba(15,23,42,0.025)]
                transition
                hover:-translate-y-[2px]
                hover:shadow-[0_10px_28px_rgba(133,99,46,0.055)]
              "
            >
              <div className="flex h-full flex-col justify-between">

                <div className="flex h-[52px] w-[52px] items-center justify-center rounded-full bg-[#f3ebdf] text-[#8b7757]">
                  <Icon
                    name="bulb"
                    size={27}
                  />
                </div>

                <div className="mt-4 text-right">

                  <h3 className="font-[var(--font-vazirmatn)] text-[17px] font-bold text-[#162b3b]">
                    استدلال بالینی
                  </h3>

                  <p className="mt-2 font-[var(--font-vazirmatn)] text-[12px] leading-6 text-[#7d8a93]">
                    کیس‌های بدون اعلام تخصص
                    <br />
                    برای تقویت تفکر بالینی
                  </p>

                </div>

                <div className="flex justify-start">

                  <span
                    aria-hidden="true"
                    className="
                      flex
                      h-[44px]
                      w-[44px]
                      items-center
                      justify-center
                      rounded-full
                      border
                      border-[#e1ddd4]
                      bg-white
                      text-[#2b414c]
                    "
                  >
                    <ArrowLeftIcon size={18} />
                  </span>

                </div>
              </div>
            </Link>

            {/* =================================================
                3 — EMERGENCY
            ================================================== */}

            <div
              className="
                group
                h-[242px]
                min-w-0
                rounded-[15px]
                border
                border-[#f0dfdf]
                bg-[#fbf1f1]
                p-6
                shadow-[0_5px_20px_rgba(15,23,42,0.025)]
                transition
                hover:-translate-y-[2px]
                hover:shadow-[0_10px_28px_rgba(160,70,70,0.055)]
              "
            >
              <div className="flex h-full flex-col justify-between">

                <div className="flex h-[52px] w-[52px] items-center justify-center rounded-full bg-[#f8e7e7] text-[#c44747]">
                  <EmergencyIcon
                    size={27}
                  />
                </div>

                <div className="mt-4 text-right">

                  <h3 className="font-[var(--font-vazirmatn)] text-[17px] font-bold text-[#162b3b]">
                    اورژانس و شرایط حاد
                  </h3>

                  <p className="mt-2 font-[var(--font-vazirmatn)] text-[12px] leading-6 text-[#7d8a93]">
                    کیس‌های اورژانسی و
                    <br />
                    موقعیت‌های بحرانی
                  </p>

                </div>

                <div className="flex justify-start">

                  <span
                    aria-hidden="true"
                    className="
                      flex
                      h-[44px]
                      w-[44px]
                      items-center
                      justify-center
                      rounded-full
                      border
                      border-[#e5d7d7]
                      bg-white
                      text-[#2b414c]
                    "
                  >
                    <ArrowLeftIcon size={18} />
                  </span>

                </div>

              </div>
            </div>

            {/* =================================================
                4 — DAILY ARCHIVE
            ================================================== */}

            <Link
              href="/case/today/archive"
              className="
                group
                h-[242px]
                min-w-0
                rounded-[15px]
                border
                border-[#e2e8ec]
                bg-[#f5f8fa]
                p-6
                shadow-[0_5px_20px_rgba(15,23,42,0.025)]
                transition
                hover:-translate-y-[2px]
                hover:shadow-[0_10px_28px_rgba(57,84,115,0.055)]
              "
            >
              <div className="flex h-full flex-col justify-between">

                <div className="flex h-[52px] w-[52px] items-center justify-center rounded-full bg-[#eaf0f4] text-[#48697f]">
                  <Icon
                    name="calendar"
                    size={27}
                  />
                </div>

                <div className="mt-4 text-right">

                  <h3 className="font-[var(--font-vazirmatn)] text-[17px] font-bold text-[#162b3b]">
                    آرشیو کیس‌های روزانه
                  </h3>

                  <p className="mt-2 font-[var(--font-vazirmatn)] text-[12px] leading-6 text-[#7d8a93]">
                    دسترسی به تمام
                    <br />
                    کیس‌های منتشر شده
                  </p>

                </div>

                <div className="flex justify-start">

                  <span
                    aria-hidden="true"
                    className="
                      flex
                      h-[44px]
                      w-[44px]
                      items-center
                      justify-center
                      rounded-full
                      border
                      border-[#dfe5e8]
                      bg-white
                      text-[#2b414c]
                    "
                  >
                    <ArrowLeftIcon size={18} />
                  </span>

                </div>

              </div>
            </Link>

              </div>
          </div>
        </section>

        {/* =================================================
            LEARNING + CONTINUE
            Same 5 / 7 column grid as the practice cards above
        ================================================== */}

        <section
          dir="rtl"
          className="mt-5 grid w-full items-stretch gap-4 lg:grid-cols-12"
        >

          {/* RIGHT — LEARNING (aligned with PRACTICE above) */}
          <section
            dir="rtl"
            className="
              order-1
              min-w-0
              h-[242px]
              lg:col-span-5
              overflow-hidden
              rounded-2xl
              border
              border-[#e1e9e5]
              bg-[#f4f8f5]
              shadow-[0_5px_18px_rgba(15,23,42,0.025)]
            "
          >
            <div className="flex h-full flex-col justify-between p-7">

              <div className="flex items-start justify-between gap-5">
                <div className="min-w-0 text-right">
                  <h2 className="font-[var(--font-vazirmatn)] text-[22px] font-semibold text-[#22354e]">
                    یادگیری
                  </h2>

                  <p className="mt-2 max-w-[360px] font-[var(--font-vazirmatn)] text-[12px] leading-6 text-[#7a8a84]">
                    مرور نکات، فلش‌کارت‌ها و خلاصه‌های هر درس
                  </p>
                </div>

                <div className="flex h-[54px] w-[54px] shrink-0 items-center justify-center rounded-full bg-[#e4eee8]">
                  <img
                    src="/icons/ui/learning.png"
                    alt=""
                    aria-hidden="true"
                    className="h-[30px] w-[30px] object-contain"
                    draggable={false}
                  />
                </div>
              </div>

              <div className="mt-6 flex justify-start">
                <Link
                  href="/learn"
                  className="
                    flex
                    h-[43px]
                    items-center
                    justify-center
                    gap-2
                    rounded-[9px]
                    border
                    border-[#dbe3df]
                    bg-white
                    px-4
                    font-[var(--font-vazirmatn)]
                    text-[12px]
                    font-medium
                    text-[#334750]
                    transition
                    duration-150
                    hover:bg-[#f8fbf9]
                    active:scale-[0.98]
                  "
                >
                  شروع یادگیری
                  <ArrowLeftIcon size={16} />
                </Link>
              </div>

            </div>
          </section>

          {/* LEFT — CONTINUE (aligned with the 7-column practice-side cards) */}
          <section
            dir="rtl"
            className="
              order-2
              min-w-0
              h-[242px]
              lg:col-span-7
              flex
              flex-col
              overflow-hidden
              rounded-2xl
              border
              border-[#e7e4de]
              bg-white
              shadow-[0_5px_18px_rgba(15,23,42,0.025)]
            "
          >
            <div className="border-b border-[#ece9e5] px-7 py-5">
              <h2 className="font-[var(--font-vazirmatn)] text-[22px] font-semibold text-[#22354e]">
                ادامه از جایی که ماندی
              </h2>
            </div>

            <div className="flex-1 min-h-0">
              {continueItem ? (
                <ContinueLearningRow item={continueItem} />
              ) : (
                <div className="px-7 py-6 text-right font-[var(--font-vazirmatn)] text-[13px] text-[#879198]">
                  هنوز تمرینی شروع نشده است.
                </div>
              )}
            </div>
          </section>
        </section>

        {/* =================================================
            PROGRESS
        ================================================== */}

        <section className="mt-5 rounded-2xl border border-[#e5e7e5] bg-white p-7">

          <div className="mb-7 flex items-center justify-between">

            <div className="flex items-center gap-3">

              <Icon
                name="chart"
                size={24}
                className="text-[#718276]"
              />

              <h2 className="font-[var(--font-vazirmatn)] text-[23px] font-semibold text-[#22354e]">
                پیشرفت شما
              </h2>

            </div>

            <a
              href="#"
              className="flex items-center gap-2 font-[var(--font-vazirmatn)] text-[13px] text-[#52676c]"
            >
              مشاهده جزئیات
              <ArrowLeftIcon size={16} />
            </a>

          </div>

          <div className="flex flex-col items-center gap-10 lg:flex-row">

            {/* CIRCLE */}
            <div
              className="relative flex h-[180px] w-[180px] shrink-0 items-center justify-center rounded-full p-[13px]"
              style={{
                background: `conic-gradient(#294b45 ${totalProgressPercent * 3.6}deg, #e6e8e6 0deg)`,
              }}
            >
              <div className="flex h-full w-full items-center justify-center rounded-full bg-white">
                <div className="text-center">

                  <div className="font-[var(--font-vazirmatn)] text-[38px] font-black text-[#203449]">
                    {totalCompletedCases.toLocaleString("fa-IR")}
                  </div>

                  <div className="mt-1 font-[var(--font-vazirmatn)] text-[12px] text-[#77848a]">
                    کیس حل شده
                  </div>

                </div>
              </div>
            </div>

            {/* BARS */}
            <div className="w-full space-y-6">

              {sortedProgressCourses.map((course) => {
                const value = progressByCourse[course.key] ?? 0;

                return (
                  <div
                    key={course.key}
                    className="flex items-center gap-4"
                  >

                    <span className="w-12 shrink-0 text-right font-[var(--font-vazirmatn)] text-[13px] text-[#596a74]">
                      {course.title}
                    </span>

                    <div className="h-[8px] flex-1 overflow-hidden rounded-full bg-[#e9eae8]">

                      <div
                        className="h-full rounded-full"
                        style={{
                          width: `${value}%`,
                          backgroundColor: courseProgressColor(course.key),
                        }}
                      />

                    </div>

                    <span className="w-9 shrink-0 text-left font-[var(--font-vazirmatn)] text-[13px] text-[#485761]">
                      {value.toLocaleString("fa-IR")}٪
                    </span>

                  </div>
                );
              })}

            </div>

          </div>
        </section>
      </div>
    </main>
  );
}

/* =========================================================
   CASE BADGE
========================================================= */

function CaseBadge({
  children,
}: {
  children: ReactNode;
}) {
  return (
    <span
      className="
        rounded-full
        bg-[#f0f0ed]
        px-3.5
        py-1.5
        font-[var(--font-vazirmatn)]
        text-[11px]
        text-[#43505a]
      "
    >
      {children}
    </span>
  );
}

/* =========================================================
   CONTINUE LEARNING ROW
========================================================= */

function ContinueLearningRow({
  item,
}: {
  item: ContinueCaseData;
}) {
  return (
    <div
      dir="rtl"
      className="flex h-full w-full items-center gap-5 px-7"
    >
      {/* راست: آیکن + عنوان */}
      <div className="flex shrink-0 items-center gap-4">
        <div className="flex h-[56px] w-[56px] items-center justify-center rounded-[12px] bg-[#f0f4f2]">
          <img
            src={item.iconSrc}
            alt=""
            className="h-[38px] w-[38px] object-contain"
          />
        </div>
        <h3 className="font-[var(--font-vazirmatn)] text-[16px] font-semibold text-[#172d3e]">
          {item.specialty}
        </h3>
      </div>

      {/* وسط: نوار پیشرفت، انعطاف‌پذیر */}
      <div className="flex min-w-0 flex-1 items-center gap-3">
        <div className="h-[7px] min-w-0 flex-1 overflow-hidden rounded-full bg-[#e6e8e6]">
          <div
            className="h-full rounded-full"
            style={{
              width: `${item.percent}%`,
              backgroundColor: courseProgressColor(item.course),
            }}
          />
        </div>
        <span
          dir="rtl"
          className="shrink-0 whitespace-nowrap font-[var(--font-vazirmatn)] text-[11px] text-[#647078]"
        >
          {item.progress}
        </span>
      </div>

      {/* چپ: دکمه */}
      <Link
        href={item.href}
        className="
          flex
          h-[43px]
          w-[95px]
          shrink-0
          items-center
          justify-center
          gap-2
          rounded-[9px]
          border
          border-[#e2e5e4]
          bg-white
          font-[var(--font-vazirmatn)]
          text-[12px]
          font-medium
          text-[#334750]
          transition
          hover:bg-[#f6f7f5]
        "
      >
        ادامه
        <ArrowLeftIcon size={16} />
      </Link>
    </div>
  );
}

/* =========================================================
   GENERIC ICON
========================================================= */

function Icon({
  name,
  size = 24,
  strokeWidth = 1.8,
  className = "",
}: {
  name:
    | "search"
    | "calendar"
    | "document"
    | "bulb"
    | "lungs"
    | "target"
    | "bookmark"
    | "chart"
    | "trophy";
  size?: number;
  strokeWidth?: number;
  className?: string;
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
    className,
  };

  if (name === "search") {
    return (
      <svg {...common}>
        <circle
          cx="10.8"
          cy="10.8"
          r="6.2"
        />
        <path d="m15.5 15.5 4.2 4.2" />
      </svg>
    );
  }

  if (name === "calendar") {
    return (
      <svg {...common}>
        <rect
          x="3.5"
          y="5"
          width="17"
          height="15"
          rx="2"
        />
        <path d="M7 3v4M17 3v4M3.5 9.5h17" />
      </svg>
    );
  }

  if (name === "document") {
    return (
      <svg {...common}>
        <path d="M6 3.5h8l4 4V20.5H6z" />
        <path d="M14 3.5v4h4M9 12h6M9 15.5h6" />
      </svg>
    );
  }

  if (name === "bulb") {
    return (
      <svg {...common}>
        <path d="M8.5 14.5c-1.3-1.1-2.1-2.8-2.1-4.7A5.6 5.6 0 0 1 12 4.2a5.6 5.6 0 0 1 5.6 5.6c0 1.9-.8 3.6-2.1 4.7-.8.7-1.2 1.6-1.2 2.5H9.7c0-.9-.4-1.8-1.2-2.5Z" />
        <path d="M10 20h4M10.5 17h3" />
      </svg>
    );
  }

  if (name === "lungs") {
    return (
      <svg {...common}>
        <path d="M12 4v8" />
        <path d="M11 12c-2-3-4-5-5.5-4C4 9 3 14 4 18c.6 2.5 4 2 6-1v-5" />
        <path d="M13 12c2-3 4-5 5.5-4C20 9 21 14 20 18c-.6 2.5-4 2-6-1v-5" />
      </svg>
    );
  }

  if (name === "target") {
    return (
      <svg {...common}>
        <circle
          cx="12"
          cy="12"
          r="8"
        />
        <circle
          cx="12"
          cy="12"
          r="4"
        />
        <path d="m17.5 6.5 2-2M19 4.5h-2.5M19.5 4.5V7" />
      </svg>
    );
  }

  if (name === "bookmark") {
    return (
      <svg {...common}>
        <path d="M6 4.5A2.5 2.5 0 0 1 8.5 2h7A2.5 2.5 0 0 1 18 4.5V21l-6-3.5L6 21V4.5Z" />
      </svg>
    );
  }

  if (name === "chart") {
    return (
      <svg {...common}>
        <path d="M4 19V9M10 19V5M16 19v-7M22 19H2" />
      </svg>
    );
  }

  return (
    <svg {...common}>
      <path d="M8 4h8v5a4 4 0 0 1-8 0V4Z" />
      <path d="M8 6H4v1a4 4 0 0 0 4 4M16 6h4v1a4 4 0 0 1-4 4M12 13v4M8 20h8M9 17h6" />
    </svg>
  );
}

/* =========================================================
   STETHOSCOPE
========================================================= */

function StethoscopeIcon({
  size = 24,
  className = "",
}: {
  size?: number;
  className?: string;
}) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
      aria-hidden="true"
    >
      <path
        d="M6.5 4.5V9C6.5 12 8.4 14 11 14C13.6 14 15.5 12 15.5 9V4.5"
        stroke="currentColor"
        strokeWidth="1.6"
        strokeLinecap="round"
        strokeLinejoin="round"
      />

      <path
        d="M4.8 4.5H8.2"
        stroke="currentColor"
        strokeWidth="1.6"
        strokeLinecap="round"
      />

      <path
        d="M13.8 4.5H17.2"
        stroke="currentColor"
        strokeWidth="1.6"
        strokeLinecap="round"
      />

      <path
        d="M15.5 14V15.4C15.5 17.6 17.1 19.5 19.3 19.5C20.9 19.5 22 18.4 22 16.9C22 15.6 21.1 14.6 19.8 14.6"
        stroke="currentColor"
        strokeWidth="1.6"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

/* =========================================================
   EMERGENCY ICON
========================================================= */

function EmergencyIcon({
  size = 24,
  className = "",
}: {
  size?: number;
  className?: string;
}) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
      aria-hidden="true"
    >
      <path
        d="M12 4v3"
        stroke="currentColor"
        strokeWidth="1.6"
        strokeLinecap="round"
      />

      <path
        d="M12 17v3"
        stroke="currentColor"
        strokeWidth="1.6"
        strokeLinecap="round"
      />

      <path
        d="M4 12h3"
        stroke="currentColor"
        strokeWidth="1.6"
        strokeLinecap="round"
      />

      <path
        d="M17 12h3"
        stroke="currentColor"
        strokeWidth="1.6"
        strokeLinecap="round"
      />

      <path
        d="m6.3 6.3 2.1 2.1"
        stroke="currentColor"
        strokeWidth="1.6"
        strokeLinecap="round"
      />

      <path
        d="m15.6 15.6 2.1 2.1"
        stroke="currentColor"
        strokeWidth="1.6"
        strokeLinecap="round"
      />

      <path
        d="m17.7 6.3-2.1 2.1"
        stroke="currentColor"
        strokeWidth="1.6"
        strokeLinecap="round"
      />

      <path
        d="m8.4 15.6-2.1 2.1"
        stroke="currentColor"
        strokeWidth="1.6"
        strokeLinecap="round"
      />
    </svg>
  );
}

/* =========================================================
   ARROW LEFT
========================================================= */

function ArrowLeftIcon({
  size = 24,
  className = "",
}: {
  size?: number;
  className?: string;
}) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
      aria-hidden="true"
    >
      <path
        d="M19 12H5"
        stroke="currentColor"
        strokeWidth="1.8"
        strokeLinecap="round"
      />

      <path
        d="M11 6L5 12L11 18"
        stroke="currentColor"
        strokeWidth="1.8"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}