import Link from "next/link";
import { cardiologyCases } from "../../../data/cardiologyCases";

export default function CardiologyPage() {
  return (
    <main className="min-h-screen bg-[#f5f3ee] px-6 py-10 text-slate-900">
      <div className="mx-auto max-w-5xl">
        <Link href="/practice" className="mb-8 inline-block text-sm font-medium text-slate-500 hover:text-slate-900">← Back to specialties</Link>
        <div className="mb-10">
          <div className="flex flex-wrap items-center gap-3"><p className="text-sm font-semibold uppercase tracking-[0.2em] text-slate-500">Practice</p><span className="rounded-full border border-slate-200 bg-white px-3 py-1 text-xs font-medium text-slate-500">{cardiologyCases.length} cases</span></div>
          <h1 className="mt-3 text-4xl font-semibold tracking-tight">Cardiology</h1>
          <p className="mt-3 max-w-xl text-slate-600">Practice clinical reasoning through cardiovascular cases.</p>
        </div>
        <section className="grid gap-4 md:grid-cols-2">
          {cardiologyCases.map((caseData) => (
            <Link key={caseData.id} href={`/practice/cardiology/${caseData.id}`} className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm transition hover:-translate-y-0.5 hover:shadow-md">
              <div className="flex items-center justify-between gap-3"><span className="rounded-full bg-red-50 px-3 py-1 text-xs font-semibold text-red-700">{caseData.difficulty}</span><span className="text-xs text-slate-400">Case</span></div>
              <h2 className="mt-4 text-xl font-semibold">{caseData.title}</h2>
              <p className="mt-2 text-sm leading-6 text-slate-500">{caseData.presentation}</p>
              <div className="mt-5 text-sm font-medium text-red-700">Start case →</div>
            </Link>
          ))}
        </section>
      </div>
    </main>
  );
}
