"use client";

import { useRouter } from "next/navigation";
import { getDailyCase } from "../lib/dailyCase";

const specialties = [
  { label: "Pulmonology", icon: "lungs", tone: "blue" },
  { label: "Cardiology", icon: "heart", tone: "red" },
  { label: "Nephrology", icon: "kidney", tone: "rose" },
  { label: "Neurology", icon: "brain", tone: "violet" },
  { label: "Gastroenterology", icon: "stomach", tone: "orange" },
  { label: "Endocrinology", icon: "thyroid", tone: "amber" },
] as const;

function Icon({ name, size = 24, strokeWidth = 1.8 }: { name: string; size?: number; strokeWidth?: number }) {
  const common = { width: size, height: size, viewBox: "0 0 24 24", fill: "none", stroke: "currentColor", strokeWidth, strokeLinecap: "round" as const, strokeLinejoin: "round" as const };
  if (name === "menu") return <svg {...common}><path d="M4 7h16M4 12h16M4 17h16" /></svg>;
  if (name === "bell") return <svg {...common}><path d="M18 8a6 6 0 0 0-12 0c0 7-3 7-3 9h18c0-2-3-2-3-9"/><path d="M10 21h4"/></svg>;
  if (name === "calendar") return <svg {...common}><rect x="3" y="4.5" width="18" height="16" rx="2"/><path d="M7 2.5v4M17 2.5v4M3 9h18"/><path d="M8 13h.01M12 13h.01M16 13h.01M8 17h.01M12 17h.01"/></svg>;
  if (name === "arrow") return <svg {...common}><path d="M5 12h13M13 6l6 6-6 6"/></svg>;
  if (name === "target") return <svg {...common}><circle cx="12" cy="12" r="8"/><circle cx="12" cy="12" r="4"/><path d="m17.5 6.5 2-2M19 4.5h-2.5M19.5 4.5V7"/></svg>;
  if (name === "shuffle") return <svg {...common}><path d="M16 3h5v5M4 7h3c4 0 5 10 10 10h4M16 16l5 5v-5M4 17h3c1.5 0 2.6-.8 3.5-2"/></svg>;
  if (name === "user") return <svg {...common}><circle cx="12" cy="8" r="3.5"/><path d="M5 21c.8-4 3.1-6 7-6s6.2 2 7 6"/></svg>;
  if (name === "clock") return <svg {...common}><circle cx="12" cy="12" r="8.5"/><path d="M12 7v5l3 2"/></svg>;
  if (name === "activity") return <svg {...common}><path d="M3 12h4l2-6 4 12 2-6h6"/></svg>;
  if (name === "bookmark") return <svg {...common}><path d="M6 4.5A2.5 2.5 0 0 1 8.5 2h7A2.5 2.5 0 0 1 18 4.5V21l-6-3.5L6 21V4.5Z"/></svg>;
  if (name === "trophy") return <svg {...common}><path d="M8 4h8v5a4 4 0 0 1-8 0V4Z"/><path d="M8 6H4v1a4 4 0 0 0 4 4M16 6h4v1a4 4 0 0 1-4 4M12 13v4M8 20h8M9 17h6"/></svg>;
  if (name === "chart") return <svg {...common}><path d="M4 19V9M10 19V5M16 19v-7M22 19H2"/></svg>;
  if (name === "book") return <svg {...common}><path d="M4 4.5A2.5 2.5 0 0 1 6.5 2H20v17H6.5A2.5 2.5 0 0 0 4 21.5V4.5Z"/><path d="M4 5h12"/></svg>;
  if (name === "headphones") return <svg {...common}><path d="M4 14v-2a8 8 0 0 1 16 0v2"/><path d="M4 14h3v6H5a1 1 0 0 1-1-1v-5ZM20 14h-3v6h2a1 1 0 0 0 1-1v-5Z"/></svg>;
  if (name === "lungs") return <svg {...common}><path d="M12 4v8M11 12c-2-3-4-5-5.5-4C4 9 3 14 4 18c.6 2.5 4 2 6-1v-5M13 12c2-3 4-5 5.5-4C20 9 21 14 20 18c-.6 2.5-4 2-6-1v-5"/></svg>;
  if (name === "heart") return <svg {...common}><path d="M20.8 8.8c0 5.2-8.8 10.3-8.8 10.3S3.2 14 3.2 8.8A4.8 4.8 0 0 1 12 6.2a4.8 4.8 0 0 1 8.8 2.6Z"/></svg>;
  if (name === "kidney") return <svg {...common}><path d="M9 5C5 3 3 7 4 12s4 7 7 4V9c0-2-1-3-2-4ZM15 5c4-2 6 2 5 7s-4 7-7 4V9c0-2 1-3 2-4Z"/></svg>;
  if (name === "brain") return <svg {...common}><path d="M9 5a3 3 0 0 0-5 2 3 3 0 0 0 1 5 3 3 0 0 0 3 5 3 3 0 0 0 4 2V6a3 3 0 0 0-3-1ZM15 5a3 3 0 0 1 5 2 3 3 0 0 1-1 5 3 3 0 0 1-3 5 3 3 0 0 1-4 2V6a3 3 0 0 1 3-1Z"/></svg>;
  if (name === "stomach") return <svg {...common}><path d="M9 3c0 4 1 5 4 5 4 0 7 2 7 6s-2 6-6 6c-5 0-8-3-8-8V8"/><path d="M9 3H6a3 3 0 0 0 0 6h1"/></svg>;
  if (name === "thyroid") return <svg {...common}><path d="M12 5v14M12 9c-2-3-6-2-6 1v5c0 2 2 3 4 2l2-2M12 9c2-3 6-2 6 1v5c0 2-2 3-4 2l-2-2"/></svg>;
  return null;
}

export default function Home() {
  const router = useRouter();
  const dailyCase = getDailyCase();
  const dailyDate = new Date();
  const dailyDateLabel = dailyDate.toLocaleDateString("en-US", {
    month: "short",
    day: "2-digit",
    year: "numeric",
    timeZone: "UTC",
  }).toUpperCase();

  return (
    <main className="min-h-screen bg-[#fbfaf8] text-[#10213f]">
      <header className="border-b border-slate-200/80 bg-white/90 backdrop-blur">
        <div className="mx-auto flex h-[76px] max-w-[1180px] items-center justify-between px-5 lg:px-8">
          <div className="flex items-center gap-6">
            <button aria-label="Menu" className="rounded-lg p-1.5 text-slate-700"><Icon name="menu" size={28}/></button>
            <div className="flex items-center gap-3">
              <span className="text-[30px] font-medium tracking-[-0.045em]">SONIC</span>
              <span className="hidden border-l border-slate-300 pl-3 text-[13px] font-medium uppercase leading-[1.15] tracking-[0.18em] text-slate-500 sm:block">Clinical<br/>Reasoning</span>
            </div>
          </div>
          <div className="flex items-center gap-5">
            <button aria-label="Notifications" className="rounded-full p-2 text-slate-700"><Icon name="bell" size={23}/></button>
            <div className="hidden h-9 w-9 items-center justify-center rounded-full bg-slate-700 text-white sm:flex">N</div>
            <span className="hidden text-sm font-medium sm:block">Nikan</span>
            <span className="text-xs">⌄</span>
          </div>
        </div>
      </header>

      <div className="mx-auto max-w-[1180px] px-5 pb-16 pt-10 lg:px-8 lg:pt-11">
        <section>
          <div className="mb-7 flex items-start gap-4">
            <div className="mt-1 text-slate-800"><Icon name="calendar" size={25}/></div>
            <div>
              <h1 className="text-[28px] font-semibold tracking-[-0.025em] sm:text-[31px]">CASE OF THE DAY</h1>
              <p className="mt-1 text-[16px] text-slate-600">A new clinical challenge, every day.</p>
            </div>
          </div>

          <article className="overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-[0_8px_28px_rgba(15,23,42,0.05)]">
            <div className="grid min-h-[340px] md:grid-cols-[1.02fr_0.98fr]">
              <div className="flex flex-col justify-center p-7 sm:p-9 lg:p-10">
                <div className="mb-5 inline-flex w-fit items-center rounded-lg bg-blue-50 px-3 py-1.5 text-[13px] font-medium text-blue-700">{dailyDateLabel}</div>
                <h2 className="text-[30px] font-semibold tracking-[-0.035em] sm:text-[34px]">{dailyCase.title}</h2>
                <p className="mt-3 max-w-[390px] text-[17px] leading-7 text-slate-700">{dailyCase.presentation}</p>
                <div className="mt-6 flex flex-wrap gap-x-6 gap-y-3 text-[14px] text-slate-600">
                  <span className="flex items-center gap-2"><Icon name="user" size={19}/>{dailyCase.patient.age} yrs</span>
                  <span className="flex items-center gap-2">{dailyCase.patient.sex === "male" ? "♂" : "♀"}&nbsp; {dailyCase.patient.sex === "male" ? "Male" : "Female"}</span>
                  <span className="flex items-center gap-2"><Icon name="activity" size={19}/>{dailyCase.difficulty.charAt(0).toUpperCase() + dailyCase.difficulty.slice(1)}</span>
                </div>
                <button type="button" onClick={() => router.push("/case/today")} className="mt-7 flex w-fit items-center gap-4 rounded-lg bg-[#1768c7] px-7 py-3.5 text-[16px] font-medium text-white shadow-sm transition hover:bg-[#155db2]">Start today&apos;s case <Icon name="arrow" size={20}/></button>
              </div>
              <div className="relative min-h-[280px] overflow-hidden bg-[#f7f4ed]">
                <div className="absolute inset-0 opacity-60" style={{backgroundImage:"radial-gradient(circle at 55% 40%, rgba(255,255,255,.95), transparent 44%), linear-gradient(120deg, rgba(238,231,218,.5), rgba(250,248,243,.95))"}}/>
                <div className="absolute left-[14%] top-[13%] h-[72%] w-[66%] opacity-80">
                  <svg viewBox="0 0 430 330" className="h-full w-full text-[#9d4d45]" fill="none" stroke="currentColor" strokeWidth="3">
                    <path d="M215 25v85M215 110c-50 0-112 44-120 115-4 36 15 62 48 57 35-5 55-42 72-83M215 110c50 0 112 44 120 115 4 36-15 62-48 57-35-5-55-42-72-83"/>
                    <path d="M215 110c-23 27-25 67-18 102M215 110c23 27 25 67 18 102"/>
                    <path d="M178 145c-28 7-49 23-65 43M252 145c28 7 49 23 65 43M166 169c-18 2-35 10-49 22M264 169c18 2 35 10 49 22"/>
                    <path d="M215 25c-8 13-9 29 0 39 9-10 8-26 0-39Z" fill="currentColor" opacity=".25"/>
                    <path d="M151 245c-4 27 4 45 20 59M279 245c4 27-4 45-20 59"/>
                    <circle cx="303" cy="246" r="35" fill="#fffaf4" stroke="#b44d4a" strokeWidth="4"/>
                    <path d="M284 246h38M296 229c10 7 17 13 25 24M297 263c9-7 15-13 22-25" stroke="#b44d4a" strokeWidth="6"/>
                  </svg>
                </div>
                <div className="absolute right-7 top-8 rotate-[-4deg] text-[12px] italic leading-7 text-slate-600">
                  {dailyCase.tags.slice(0, 5).map((tag) => (
                    <div key={tag}>{tag.replaceAll("-", " ")}</div>
                  ))}
                </div>
              </div>
            </div>
          </article>
        </section>

        <section className="mt-12">
          <div className="mb-7 flex items-start gap-4">
            <div className="mt-1 text-slate-800"><Icon name="activity" size={25}/></div>
            <div><h2 className="text-[28px] font-semibold tracking-[-0.025em]">PRACTICE</h2><p className="mt-1 text-[16px] text-slate-600">Choose how you want to practice today.</p></div>
          </div>
          <div className="grid gap-5 lg:grid-cols-2">
            <article role="link" tabIndex={0} onClick={() => router.push("/practice")} onKeyDown={(e) => { if (e.key === "Enter" || e.key === " ") router.push("/practice"); }} className="cursor-pointer rounded-2xl border border-blue-100 bg-white p-6 shadow-[0_6px_20px_rgba(15,23,42,0.035)] transition hover:-translate-y-0.5 hover:border-blue-300 hover:shadow-[0_10px_28px_rgba(15,23,42,0.07)] sm:p-7">
              <div className="text-center"><h3 className="text-[20px] font-semibold text-[#155ac1]">BY SPECIALTY</h3><p className="mx-auto mt-1 max-w-[310px] text-[15px] leading-6 text-slate-600">Practice cases from specific medical specialties.</p></div>
              <div className="mt-6 grid grid-cols-3 gap-2.5">
                {specialties.map((s) => <div key={s.label} className="flex min-h-[96px] flex-col items-center justify-center rounded-xl border border-slate-200 bg-white text-center"><span className={`mb-2 flex h-10 w-10 items-center justify-center rounded-full ${s.tone === "blue" ? "bg-blue-50 text-blue-600" : s.tone === "red" ? "bg-red-50 text-red-600" : s.tone === "rose" ? "bg-rose-50 text-rose-600" : s.tone === "violet" ? "bg-violet-50 text-violet-600" : s.tone === "orange" ? "bg-orange-50 text-orange-600" : "bg-amber-50 text-amber-600"}`}><Icon name={s.icon} size={26}/></span><span className="px-1 text-[12px] font-medium text-slate-700">{s.label}</span></div>)}
              </div>
              <button type="button" onClick={() => router.push("/practice")} className="mt-5 flex w-full items-center justify-center gap-3 rounded-lg border border-blue-500 bg-white py-3 text-[15px] font-medium text-blue-700 transition hover:bg-blue-50">Choose a specialty <Icon name="arrow" size={19}/></button>
            </article>

            <article className="rounded-2xl border border-purple-100 bg-white p-6 shadow-[0_6px_20px_rgba(15,23,42,0.035)] sm:p-7">
              <div className="text-center"><h3 className="text-[20px] font-semibold text-[#6c4198]">CLINICAL REASONING</h3><p className="mx-auto mt-1 max-w-[310px] text-[15px] leading-6 text-slate-600">Cases from all specialties.<br/>The specialty is hidden. Figure it out yourself.</p></div>
              <div className="flex h-[160px] items-center justify-center"><div className="flex h-28 w-28 items-center justify-center rounded-full bg-purple-50 text-purple-500"><Icon name="target" size={65}/></div></div>
              <button className="flex w-full items-center justify-center gap-3 rounded-lg bg-[#7549a0] py-3 text-[15px] font-medium text-white">Start clinical mode <Icon name="arrow" size={19}/></button>
            </article>
          </div>
        </section>

        <section className="mt-5 rounded-2xl border border-slate-200 bg-white px-6 py-5 shadow-[0_5px_18px_rgba(15,23,42,0.035)] sm:px-8">
          <div className="grid items-center gap-5 md:grid-cols-[1.1fr_1fr_auto]">
            <div className="flex items-start gap-4"><span className="mt-1 text-slate-700"><Icon name="bookmark" size={25}/></span><div><h3 className="text-[18px] font-semibold">CONTINUE LEARNING</h3><p className="mt-1 text-sm text-slate-600">Pick up where you left off.</p></div></div>
            <div className="flex items-center gap-4"><div className="hidden h-16 w-16 rounded-lg bg-slate-100 sm:block"><div className="flex h-full items-center justify-center text-slate-400"><Icon name="lungs" size={34}/></div></div><div className="min-w-0 flex-1"><p className="font-semibold">Pneumothorax</p><p className="mt-1 text-xs text-slate-500">You were in Investigation</p><div className="mt-2 flex items-center gap-3"><div className="h-2 flex-1 overflow-hidden rounded-full bg-slate-200"><div className="h-full w-[60%] rounded-full bg-blue-500"/></div><span className="text-xs text-slate-600">60%</span></div></div></div>
            <button className="flex items-center justify-center gap-3 rounded-lg border border-blue-500 px-5 py-2.5 text-sm font-medium text-blue-700">Continue <Icon name="arrow" size={18}/></button>
          </div>
        </section>

        <section className="mt-9 grid gap-6 border-b border-slate-200 pb-10 md:grid-cols-4">
          {[['trophy','Improve','Your Skills','Practice real clinical reasoning.'],['chart','Track','Progress','See your improvement over time.'],['book','Learn','Effectively','Review explanations and key points.'],['target','Challenge','Yourself','New cases. Every day. Always improving.']].map(([icon,title,sub,desc]) => <div key={title} className="flex gap-4 border-slate-200 md:border-r md:last:border-r-0 md:px-6 md:first:pl-0"><span className="mt-1 text-slate-600"><Icon name={icon} size={30}/></span><div><p className="font-semibold">{title}<br/>{sub}</p><p className="mt-2 text-sm leading-5 text-slate-600">{desc}</p></div></div>)}
        </section>
      </div>

      <footer className="border-t border-slate-200 bg-white">
        <div className="mx-auto grid max-w-[1180px] gap-9 px-5 py-11 sm:grid-cols-2 lg:grid-cols-5 lg:px-8">
          <div className="lg:col-span-2"><div className="text-[26px] tracking-[-0.03em]">SONIC</div><p className="mt-3 max-w-[250px] text-sm leading-6 text-slate-600">Sharpen your clinical reasoning.<br/>Become a better clinician.</p><p className="mt-6 text-xs text-slate-500">© 2026 SONIC. All rights reserved.</p></div>
          <div><h4 className="text-xs font-semibold uppercase tracking-[0.16em]">Product</h4><div className="mt-4 space-y-2 text-sm text-slate-600"><p>Cases</p><p>Specialties</p><p>Clinical Mode</p><p>How it Works</p></div></div>
          <div><h4 className="text-xs font-semibold uppercase tracking-[0.16em]">Account</h4><div className="mt-4 space-y-2 text-sm text-slate-600"><p>Profile</p><p>Progress</p><p>Settings</p><p>Log Out</p></div></div>
          <div><h4 className="text-xs font-semibold uppercase tracking-[0.16em]">Support</h4><div className="mt-4 space-y-2 text-sm text-slate-600"><p>Help Center</p><p>Contact Us</p><p>Feedback</p><p>Report a Problem</p></div></div>
        </div>
      </footer>
    </main>
  );
}
