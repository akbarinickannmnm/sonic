import Link from "next/link";
import { getMasterCaseBank } from "../../data/courseBanks";
import type { Course } from "../../types/case";

const courseMeta: Record<Course, { label: string; subtitle: string; icon: string; accent: string; soft: string }> = {
  pulmonology: { label: "ریه", subtitle: "تنفس و بیماری‌های دستگاه تنفسی", icon: "/course-icons-png/respiratory.png", accent: "#4c7194", soft: "#eef4f8" },
  cardiology: { label: "قلب و عروق", subtitle: "قلب، عروق و بیماری‌های قلبی", icon: "/course-icons-png/cardiovascular.png", accent: "#8b3f53", soft: "#f8eff2" },
  nephrology: { label: "نفرولوژی", subtitle: "کلیه، مایعات و اختلالات الکترولیت", icon: "/course-icons-png/renal.png", accent: "#15919a", soft: "#edfafa" },
  gastroenterology: { label: "گوارش", subtitle: "دستگاه گوارش و بیماری‌های آن", icon: "/course-icons-png/gastrointestinal.png", accent: "#6b7f5a", soft: "#f2f5ef" },
  endocrinology: { label: "غدد", subtitle: "هورمون‌ها، متابولیسم و غدد درون‌ریز", icon: "/course-icons-png/endocrine.png", accent: "#6d5b8c", soft: "#f3f0f7" },
  "hematology-oncology": { label: "هماتولوژی و انکولوژی", subtitle: "خون، مغز استخوان و سرطان", icon: "/course-icons-png/hematology.png", accent: "#8f2746", soft: "#fff0f4" },
  neurology: { label: "نورولوژی", subtitle: "مغز، اعصاب و سیستم عصبی", icon: "/course-icons/neurology.svg", accent: "#7656c8", soft: "#f4f0ff" },
  "infectious-disease": { label: "عفونی", subtitle: "بیماری‌های عفونی و سیستم ایمنی", icon: "/course-icons/infectious-disease.svg", accent: "#249374", soft: "#eef9f5" },
};

const courseOrder: Course[] = [
  "pulmonology",
  "cardiology",
  "nephrology",
  "gastroenterology",
  "endocrinology",
  "hematology-oncology",
];

export default function LearnPage() {
  const cases = getMasterCaseBank();

  return (
    <main dir="rtl" className="min-h-screen bg-[#fbf8f2] text-[#172033]">
      <div className="sonic-fixed-container pb-16 pt-8 lg:pt-10">
        <header className="rounded-[26px] border border-[#e7e4de] bg-white px-6 py-7 shadow-[0_10px_30px_rgba(18,35,63,0.035)] sm:px-8 sm:py-8">
          <div className="text-[11px] font-semibold tracking-[0.14em] text-[#9aa3ae]">LEARNING</div>
          <h1 className="mt-2 text-[32px] font-bold tracking-[-0.02em] sm:text-[40px]">یادگیری</h1>
          <p className="mt-3 max-w-2xl text-[14px] leading-7 text-[#718096]">
            برای مطالعه، اول درس را انتخاب کن؛ بعد از انتخاب کیس، مستقیم وارد Review کامل همان کیس می‌شوی.
          </p>
        </header>

        <section className="mt-6">
          <div className="mb-3">
            <div className="text-[11px] font-semibold tracking-[0.12em] text-[#a0a7b2]">COURSES</div>
            <h2 className="mt-1 text-[20px] font-bold">انتخاب درس</h2>
          </div>

          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {courseOrder.map((course) => {
              const meta = courseMeta[course];
              const count = cases.filter((item) => item.course === course).length;

              return (
                <Link
                  key={course}
                  href={`/learn/${encodeURIComponent(course)}`}
                  className="group min-w-0 rounded-[22px] border bg-white p-5 shadow-[0_8px_24px_rgba(18,35,63,0.03)] transition duration-200 hover:-translate-y-0.5 hover:shadow-[0_14px_30px_rgba(18,35,63,0.06)]"
                  style={{ borderColor: `${meta.accent}22` }}
                >
                  <div className="flex items-center justify-between gap-4">
                    <div
                      className="flex h-12 w-12 shrink-0 items-center justify-center rounded-[15px]"
                      style={{ background: meta.soft }}
                    >
                      <img src={meta.icon} alt="" aria-hidden="true" className="h-7 w-7 object-contain" draggable={false} />
                    </div>
                    <span className="rounded-full bg-[#f5f6f8] px-2.5 py-1 text-[11px] font-semibold text-[#7d899c]">
                      {count.toLocaleString("fa-IR")} کیس
                    </span>
                  </div>

                  <h3 className="mt-5 text-[18px] font-bold text-[#22334d]">{meta.label}</h3>
                  <p className="mt-1 text-[12px] leading-6 text-[#7a889d]">{meta.subtitle}</p>

                  <div className="mt-6 flex items-center justify-between text-[12px] font-semibold" style={{ color: meta.accent }}>
                    <span>انتخاب درس</span>
                    <span aria-hidden="true" className="transition-transform duration-200 group-hover:-translate-x-1">←</span>
                  </div>
                </Link>
              );
            })}
          </div>
        </section>
      </div>
    </main>
  );
}
