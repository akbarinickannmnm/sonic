import Link from "next/link";

type Specialty = {
  key: "pulmonology" | "cardiology" | "nephrology" | "neurology" | "gastroenterology" | "endocrinology" | "rheumatology" | "infectious-disease" | "psychiatry" | "pediatrics" | "hematology-oncology";
  name: string;
  description: string;
  progress: number;
  icon: "lungs" | "heart" | "kidney" | "brain" | "stomach" | "thyroid" | "rheumatology" | "infectious" | "psychiatry" | "pediatrics" | "hematology-oncology";
  tone: string;
};

const specialties: Specialty[] = [
  { key: "pulmonology", name: "ریه", description: "پزشکی تنفسی", progress: 0, icon: "lungs", tone: "bg-blue-50 text-blue-600" },
  { key: "cardiology", name: "قلب و عروق", description: "بیماری‌های قلب و عروق", progress: 0, icon: "heart", tone: "bg-red-50 text-red-600" },
  { key: "nephrology", name: "کلیه", description: "بیماری‌های کلیه", progress: 0, icon: "kidney", tone: "bg-rose-50 text-rose-600" },
  { key: "neurology", name: "نورولوژی", description: "مغز و سیستم عصبی", progress: 0, icon: "brain", tone: "bg-violet-50 text-violet-600" },
  { key: "gastroenterology", name: "گوارش", description: "دستگاه گوارش", progress: 0, icon: "stomach", tone: "bg-orange-50 text-orange-600" },
  { key: "endocrinology", name: "غدد", description: "هورمون‌ها و متابولیسم", progress: 0, icon: "thyroid", tone: "bg-amber-50 text-amber-600" },
  { key: "rheumatology", name: "روماتولوژی", description: "بیماری‌های روماتولوژیک", progress: 0, icon: "rheumatology", tone: "bg-pink-50 text-pink-600" },
  { key: "infectious-disease", name: "عفونی", description: "بیماری‌های عفونی", progress: 0, icon: "infectious", tone: "bg-emerald-50 text-emerald-600" },
  { key: "psychiatry", name: "روان‌پزشکی", description: "اختلالات روانی و رفتاری", progress: 0, icon: "psychiatry", tone: "bg-violet-50 text-violet-600" },
  { key: "pediatrics", name: "اطفال", description: "بیماری‌های کودکان", progress: 0, icon: "pediatrics", tone: "bg-sky-50 text-sky-600" },
  { key: "hematology-oncology", name: "هماتولوژی و انکولوژی", description: "بیماری‌های خون و سرطان", progress: 0, icon: "hematology-oncology", tone: "bg-red-50 text-red-600" },
];

function Icon({ name, size = 24, strokeWidth = 1.8 }: { name: Specialty["icon"] | "arrow" | "back"; size?: number; strokeWidth?: number }) {
  const common = {
    width: size,
    height: size,
    viewBox: "0 0 24 24",
    fill: "none",
    stroke: "currentColor",
    strokeWidth,
    strokeLinecap: "round" as const,
    strokeLinejoin: "round" as const,
    "aria-hidden": true,
  };

  if (name === "lungs") return <svg {...common}><path d="M12 4v8M11 12c-2-3-4-5-5.5-4C4 9 3 14 4 18c.6 2.5 4 2 6-1v-5M13 12c2-3 4-5 5.5-4C20 9 21 14 20 18c-.6 2.5-4 2-6-1v-5" /></svg>;
  if (name === "heart") return <svg {...common}><path d="M20.8 8.8c0 5.2-8.8 10.3-8.8 10.3S3.2 14 3.2 8.8A4.8 4.8 0 0 1 12 6.2a4.8 4.8 0 0 1 8.8 2.6Z" /></svg>;
  if (name === "kidney") return <svg {...common}><path d="M9 5C5 3 3 7 4 12s4 7 7 4V9c0-2-1-3-2-4ZM15 5c4-2 6 2 5 7s-4 7-7 4V9c0-2 1-3 2-4Z" /></svg>;
  if (name === "brain") return <svg {...common}><path d="M9 5a3 3 0 0 0-5 2 3 3 0 0 0 1 5 3 3 0 0 0 3 5 3 3 0 0 0 4 2V6a3 3 0 0 0-3-1ZM15 5a3 3 0 0 1 5 2 3 3 0 0 1-1 5 3 3 0 0 1-3 5 3 3 0 0 1-4 2V6a3 3 0 0 1 3-1Z" /></svg>;
  if (name === "stomach") return <svg {...common}><path d="M9 3c0 4 1 5 4 5 4 0 7 2 7 6s-2 6-6 6c-5 0-8-3-8-8V8" /><path d="M9 3H6a3 3 0 0 0 0 6h1" /></svg>;
  if (name === "thyroid") return <svg {...common}><path d="M12 5v14M12 9c-2-3-6-2-6 1v5c0 2 2 3 4 2l2-2M12 9c2-3 6-2 6 1v5c0 2-2 3-4 2l-2-2" /></svg>;
  if (name === "rheumatology") return <svg {...common}><path d="M7 4.5c1.1 0 2 .9 2 2v2.2l2 1.2 2-1.2V6.5c0-1.1.9-2 2-2s2 .9 2 2v2.7c0 .7-.4 1.4-1 1.7l-2 1.1V15l1.8 1.8c.8.8.8 2 0 2.8s-2 .8-2.8 0L12 18l-1.2 1.6c-.8.8-2 .8-2.8 0s-.8-2 0-2.8L9.8 15v-2.9l-2-1.1c-.6-.3-1-.9-1-1.7V6.5c0-1.1.9-2 2-2Z" /></svg>;
  if (name === "infectious") return <svg {...common}><path d="M12 4a3 3 0 0 1 3 3v1h1a3 3 0 1 1 0 6h-1v1a3 3 0 1 1-6 0v-1H8a3 3 0 1 1 0-6h1V7a3 3 0 0 1 3-3Z" /><path d="M12 8v8M8 11h8" /></svg>;
  if (name === "psychiatry") return <svg {...common}><path d="M9 5a3 3 0 0 0-5 2 3 3 0 0 0 1 5 3 3 0 0 0 3 5 3 3 0 0 0 4 2V6a3 3 0 0 0-3-1Z" /><path d="M15 5a3 3 0 0 1 5 2 3 3 0 0 1-1 5 3 3 0 0 1-3 5 3 3 0 0 1-4 2V6a3 3 0 0 1 3-1Z" /><path d="M12 8v8M9.5 11H7M14.5 11H17" /></svg>;
  if (name === "pediatrics") return <svg {...common}><circle cx="12" cy="8" r="3" /><path d="M6 20v-1a6 6 0 0 1 12 0v1M8 13l-2 3M16 13l2 3" /></svg>;
  if (name === "hematology-oncology") return <svg {...common}><path d="M12 3c-1.8 3-5 5.7-5 9.3A5 5 0 0 0 12 17a5 5 0 0 0 5-4.7C17 8.7 13.8 6 12 3Z" /><path d="M9.5 12.5c0 1.4 1.1 2.5 2.5 2.5" /></svg>;
  if (name === "arrow") return <svg {...common}><path d="M5 12h13M13 6l6 6-6 6" /></svg>;
  return <svg {...common}><path d="M19 12H5M11 18l-6-6 6-6" /></svg>;
}

export default function PracticePage() {
  return (
    <main className="min-h-screen bg-[#fbfaf8] text-[#10213f]">


      <div className="mx-auto max-w-[1180px] px-5 pb-16 pt-10 lg:px-8 lg:pt-12">
        <div className="flex flex-col gap-5">
          <div className="text-right">
            <h1 className="text-[34px] font-semibold tracking-[-0.035em] sm:text-[40px]">یک تخصص را انتخاب کن</h1>
            <p className="mt-2 max-w-[650px] text-[15px] leading-6 text-slate-600">کیس‌های بالینی را بر اساس تخصص تمرین کن و روی حوزه‌ای که می‌خواهی بهتر شوی تمرکز کن.</p>
          </div>
        </div>

        <section className="mt-9 grid gap-4 md:grid-cols-2 lg:grid-cols-3">
          {specialties.map((specialty) => {
            const card = (
              <div className={`group rounded-2xl border border-slate-200 bg-white p-6 shadow-[0_6px_20px_rgba(15,23,42,0.035)] ${specialty.key === "pulmonology" || specialty.key === "cardiology" || specialty.key === "nephrology" || specialty.key === "gastroenterology" || specialty.key === "endocrinology" || specialty.key === "hematology-oncology" ? "transition hover:-translate-y-0.5 hover:border-slate-300 hover:shadow-[0_10px_28px_rgba(15,23,42,0.07)]" : ""}`}>
                <div className="flex items-start justify-between">
                  <div className={`flex h-11 w-11 items-center justify-center rounded-full ${specialty.tone}`}>
                    <Icon name={specialty.icon} size={24} />
                  </div>
                  <span className="text-sm font-medium text-slate-400">{specialty.progress}%</span>
                </div>

                <h2 className="mt-6 text-[18px] font-semibold">{specialty.name}</h2>
                <p className="mt-1 text-sm text-slate-500">{specialty.description}</p>

                <div className="mt-5 h-1.5 overflow-hidden rounded-full bg-slate-100">
                  <div className="h-full rounded-full bg-slate-800" style={{ width: `${specialty.progress}%` }} />
                </div>

                <div className={`mt-5 flex items-center justify-between text-sm font-medium ${specialty.key === "pulmonology" ? "text-blue-700" : specialty.key === "cardiology" ? "text-red-700" : specialty.key === "nephrology" ? "text-rose-700" : specialty.key === "gastroenterology" ? "text-orange-700" : specialty.key === "endocrinology" ? "text-amber-700" : specialty.key === "hematology-oncology" ? "text-red-700" : "text-slate-400"}`}>
                  <span>{specialty.key === "pulmonology" || specialty.key === "cardiology" || specialty.key === "nephrology" || specialty.key === "gastroenterology" || specialty.key === "endocrinology" || specialty.key === "hematology-oncology" ? "تمرین" : "به‌زودی"}</span>

                </div>
              </div>
            );

            return specialty.key === "pulmonology" ? <Link key={specialty.name} href="/practice/pulmonology" className="block">{card}</Link> : specialty.key === "cardiology" ? <Link key={specialty.name} href="/practice/cardiology" className="block">{card}</Link> : specialty.key === "nephrology" ? <Link key={specialty.name} href="/practice/nephrology" className="block">{card}</Link> : specialty.key === "gastroenterology" ? <Link key={specialty.name} href="/practice/gastroenterology" className="block">{card}</Link> : specialty.key === "endocrinology" ? <Link key={specialty.name} href="/practice/endocrinology" className="block">{card}</Link> : specialty.key === "hematology-oncology" ? <Link key={specialty.name} href="/practice/hematology-oncology" className="block">{card}</Link> : <div key={specialty.name}>{card}</div>;
          })}
        </section>

      </div>

      <footer className="border-t border-slate-200 bg-white">
        <div className="mx-auto grid max-w-[1180px] gap-9 px-5 py-11 sm:grid-cols-2 lg:grid-cols-4 lg:px-8">
          <div>
            <div className="text-[26px] tracking-[-0.03em]">SONIC</div>
            <p className="mt-3 max-w-[250px] text-sm leading-6 text-slate-600">مهارت استدلال بالینی‌ات را تقویت کن.<br />پزشک بهتری شو.</p>
          </div>
          <div><h4 className="text-xs font-semibold uppercase tracking-[0.16em]">محصول</h4><div className="mt-4 space-y-2 text-sm text-slate-600"><p>کیس‌ها</p><p>تخصص‌ها</p><p>حالت بالینی</p><p>نحوه کار</p></div></div>
          <div><h4 className="text-xs font-semibold uppercase tracking-[0.16em]">حساب کاربری</h4><div className="mt-4 space-y-2 text-sm text-slate-600"><p>پروفایل</p><p>پیشرفت</p><p>تنظیمات</p><p>خروج</p></div></div>
          <div><h4 className="text-xs font-semibold uppercase tracking-[0.16em]">پشتیبانی</h4><div className="mt-4 space-y-2 text-sm text-slate-600"><p>مرکز راهنما</p><p>تماس با ما</p><p>بازخورد</p><p>گزارش مشکل</p></div></div>
        </div>
      </footer>
    </main>
  );
}
