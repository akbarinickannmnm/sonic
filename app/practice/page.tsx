import Link from "next/link";

type Specialty = {
  key: "pulmonology" | "cardiology" | "nephrology" | "neurology" | "gastroenterology" | "endocrinology";
  name: string;
  description: string;
  progress: number;
  icon: "lungs" | "heart" | "kidney" | "brain" | "stomach" | "thyroid";
  tone: string;
};

const specialties: Specialty[] = [
  { key: "pulmonology", name: "ریه", description: "پزشکی تنفسی", progress: 0, icon: "lungs", tone: "bg-blue-50 text-blue-600" },
  { key: "cardiology", name: "قلب و عروق", description: "بیماری‌های قلب و عروق", progress: 0, icon: "heart", tone: "bg-red-50 text-red-600" },
  { key: "nephrology", name: "کلیه", description: "بیماری‌های کلیه", progress: 0, icon: "kidney", tone: "bg-rose-50 text-rose-600" },
  { key: "neurology", name: "نورولوژی", description: "مغز و سیستم عصبی", progress: 0, icon: "brain", tone: "bg-violet-50 text-violet-600" },
  { key: "gastroenterology", name: "گوارش", description: "دستگاه گوارش", progress: 0, icon: "stomach", tone: "bg-orange-50 text-orange-600" },
  { key: "endocrinology", name: "غدد", description: "هورمون‌ها و متابولیسم", progress: 0, icon: "thyroid", tone: "bg-amber-50 text-amber-600" },
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
  if (name === "arrow") return <svg {...common}><path d="M5 12h13M13 6l6 6-6 6" /></svg>;
  return <svg {...common}><path d="M19 12H5M11 18l-6-6 6-6" /></svg>;
}

export default function PracticePage() {
  return (
    <main className="min-h-screen bg-[#fbfaf8] text-[#10213f]">
      <header className="border-b border-slate-200/80 bg-white/90 backdrop-blur">
        <div className="mx-auto flex h-[76px] max-w-[1180px] items-center justify-between px-5 lg:px-8">
          <div className="flex items-center gap-4">
            <div className="flex items-center gap-3">
              <span className="text-[30px] font-medium tracking-[-0.045em]">SONIC</span>
              <span className="hidden border-l border-slate-300 pl-3 text-[13px] font-medium uppercase leading-[1.15] tracking-[0.18em] text-slate-500 sm:block">استدلال<br />بالینی</span>
            </div>
          </div>
          <div className="flex items-center gap-4">
            <div className="flex h-9 w-9 items-center justify-center rounded-full bg-slate-700 text-sm font-medium text-white">N</div>
            <span className="hidden text-sm font-medium sm:block">Nikan</span>
            <span className="text-xs text-slate-400">⌄</span>
          </div>
        </div>
      </header>

      <div className="mx-auto max-w-[1180px] px-5 pb-16 pt-10 lg:px-8 lg:pt-12">
        <div>
          <p className="text-[12px] font-semibold tracking-[0.16em] text-slate-500">تمرین</p>
          <div className="mt-2 flex flex-col gap-3 sm:flex-row sm:items-end sm:justify-between">
            <div>
              <h1 className="text-[34px] font-semibold tracking-[-0.035em] sm:text-[40px]">یک تخصص را انتخاب کن</h1>
              <p className="mt-2 max-w-[650px] text-[15px] leading-6 text-slate-600">کیس‌های بالینی را بر اساس تخصص تمرین کن و روی حوزه‌ای که می‌خواهی بهتر شوی تمرکز کن.</p>
            </div>
            <div className="rounded-full border border-slate-200 bg-white px-4 py-2 text-xs font-medium text-slate-500">۶ تخصص</div>
          </div>
        </div>

        <section className="mt-9 grid gap-4 md:grid-cols-2 lg:grid-cols-3">
          {specialties.map((specialty) => {
            const card = (
              <div className={`group rounded-2xl border border-slate-200 bg-white p-6 shadow-[0_6px_20px_rgba(15,23,42,0.035)] ${specialty.key === "pulmonology" || specialty.key === "cardiology" ? "transition hover:-translate-y-0.5 hover:border-slate-300 hover:shadow-[0_10px_28px_rgba(15,23,42,0.07)]" : ""}`}>
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

                <div className={`mt-5 flex items-center justify-between text-sm font-medium ${specialty.key === "pulmonology" ? "text-blue-700" : specialty.key === "cardiology" ? "text-red-700" : "text-slate-400"}`}>
                  <span>{specialty.key === "pulmonology" || specialty.key === "cardiology" ? "تمرین" : "به‌زودی"}</span>

                </div>
              </div>
            );

            return specialty.key === "pulmonology" ? <Link key={specialty.name} href="/practice/pulmonology" className="block">{card}</Link> : specialty.key === "cardiology" ? <Link key={specialty.name} href="/practice/cardiology" className="block">{card}</Link> : <div key={specialty.name}>{card}</div>;
          })}
        </section>

        <section className="mt-5 rounded-2xl border border-purple-100 bg-white p-6 shadow-[0_6px_20px_rgba(15,23,42,0.035)] sm:p-7">
          <div className="flex flex-col gap-6 md:flex-row md:items-center md:justify-between">
            <div>
              <p className="text-[12px] font-semibold uppercase tracking-[0.2em] text-[#7549a0]">همه تخصص‌ها</p>
              <h2 className="mt-2 text-[21px] font-semibold">استدلال بالینی</h2>
              <p className="mt-2 max-w-[680px] text-[15px] leading-6 text-slate-600">کیس‌ها از تخصص‌های مختلف انتخاب می‌شوند. تخصص پنهان است؛ سیستم مربوط و تشخیص را پیدا کن.</p>
            </div>
            <button type="button" disabled className="shrink-0 rounded-lg border border-slate-200 bg-slate-50 px-6 py-3 text-sm font-medium text-slate-400">به‌زودی</button>
          </div>
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
