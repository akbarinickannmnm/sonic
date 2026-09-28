import Link from "next/link";
import { notFound } from "next/navigation";
import { getMasterCaseBank } from "../../../data/courseBanks";
import type { Course, Difficulty } from "../../../types/case";

const courseMeta: Record<Course, { label: string; subtitle: string; accent: string }> = {
  pulmonology: { label: "ریه", subtitle: "تنفس و بیماری‌های دستگاه تنفسی", accent: "#4c7194" },
  cardiology: { label: "قلب و عروق", subtitle: "قلب، عروق و بیماری‌های قلبی", accent: "#8b3f53" },
  nephrology: { label: "نفرولوژی", subtitle: "کلیه، مایعات و اختلالات الکترولیت", accent: "#15919a" },
  gastroenterology: { label: "گوارش", subtitle: "دستگاه گوارش و بیماری‌های آن", accent: "#6b7f5a" },
  endocrinology: { label: "غدد", subtitle: "هورمون‌ها، متابولیسم و غدد درون‌ریز", accent: "#6d5b8c" },
  "hematology-oncology": { label: "هماتولوژی و انکولوژی", subtitle: "خون، مغز استخوان و سرطان", accent: "#8f2746" },
  neurology: { label: "نورولوژی", subtitle: "مغز، اعصاب و سیستم عصبی", accent: "#7656c8" },
  "infectious-disease": { label: "عفونی", subtitle: "بیماری‌های عفونی و سیستم ایمنی", accent: "#249374" },
};

const validCourses = new Set(Object.keys(courseMeta));

export function generateStaticParams() {
  return Object.keys(courseMeta).map((course) => ({ course }));
}

function difficultyLabel(value: Difficulty) {
  return value === "easy" ? "آسان" : value === "medium" ? "متوسط" : "سخت";
}

function difficultyTone(value: Difficulty) {
  return value === "easy"
    ? "bg-emerald-50 text-emerald-700"
    : value === "medium"
      ? "bg-amber-50 text-amber-700"
      : "bg-rose-50 text-rose-700";
}

export default async function LearnCoursePage({ params }: { params: Promise<{ course: string }> }) {
  const { course: encodedCourse } = await params;
  const course = decodeURIComponent(encodedCourse) as Course;
  if (!validCourses.has(course)) notFound();

  const meta = courseMeta[course];
  const cases = getMasterCaseBank().filter((item) => item.course === course);

  return (
    <main dir="rtl" className="min-h-screen bg-[#fbf8f2] text-[#172033]">
      <div className="sonic-fixed-container pb-16 pt-8 lg:pt-10">
        <Link href="/learn" className="inline-flex items-center text-[13px] font-semibold text-[#748194] hover:text-[#172033]">
          → بازگشت به درس‌ها
        </Link>

        <header className="mt-5 rounded-[26px] border border-[#e7e4de] bg-white px-6 py-7 shadow-[0_10px_30px_rgba(18,35,63,0.035)] sm:px-8">
          <div className="text-[11px] font-semibold tracking-[0.14em] text-[#a0a7b2]">CASE SELECTION</div>
          <h1 className="mt-2 text-[32px] font-bold sm:text-[38px]">{meta.label}</h1>
          <p className="mt-2 text-[14px] leading-7 text-[#718096]">{meta.subtitle}</p>
          <div className="mt-5 flex items-center gap-2 text-[12px] font-semibold" style={{ color: meta.accent }}>
            <span>{cases.length.toLocaleString("fa-IR")} کیس برای مطالعه</span>
            <span className="text-[#c6cbd2]">·</span>
            <span>با انتخاب هر کیس وارد Review کامل آن می‌شوی</span>
          </div>
        </header>

        <section className="mt-6">
          <div className="mb-3 flex items-end justify-between gap-4">
            <div>
              <div className="text-[11px] font-semibold tracking-[0.12em] text-[#a0a7b2]">CASES</div>
              <h2 className="mt-1 text-[20px] font-bold">انتخاب کیس</h2>
            </div>
            <span className="text-[12px] font-semibold text-[#8a96a7]">{cases.length.toLocaleString("fa-IR")} مورد</span>
          </div>

          <div className="space-y-3">
            {cases.map((caseData, index) => (
              <Link
                key={caseData.id}
                href={`/learn/${course}/${caseData.id}`}
                className="group block rounded-[20px] border border-[#e7e4de] bg-white px-5 py-5 shadow-[0_6px_18px_rgba(18,35,63,0.022)] transition duration-200 hover:-translate-y-0.5 hover:border-[#d8dcd9] hover:shadow-[0_12px_28px_rgba(18,35,63,0.05)]"
              >
                <div className="flex items-start gap-4">
                  <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-[12px] bg-[#f4f5f6] text-[12px] font-bold text-[#7f8b9d]">
                    {String(index + 1).padStart(2, "0")}
                  </div>

                  <div className="min-w-0 flex-1">
                    <div className="flex flex-wrap items-center gap-2">
                      <span className={`rounded-full px-2.5 py-1 text-[10px] font-bold ${difficultyTone(caseData.difficulty)}`}>
                        {difficultyLabel(caseData.difficulty)}
                      </span>
                      <span className="text-[11px] font-medium text-[#929baa]">
                        {caseData.patient.age.toLocaleString("fa-IR")} سال · {caseData.patient.sex === "female" ? "زن" : "مرد"}
                      </span>
                    </div>
                    <h3 className="mt-2 text-[16px] font-bold leading-7 text-[#24364f]">{caseData.presentation}</h3>
                    <p className="mt-1 text-[11px] leading-5 text-[#98a0ac]">برای مطالعه‌ی کامل این کیس انتخابش کن.</p>
                  </div>

                  <span className="mt-1 flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-[#f6f7f8] text-[#8f99a8] transition group-hover:-translate-x-1" aria-hidden="true">
                    ←
                  </span>
                </div>
              </Link>
            ))}
          </div>
        </section>
      </div>
    </main>
  );
}
