import Link from "next/link";
import { pulmonologyCases } from "../../../data/pulmonologyCases";

function difficultyLabel(difficulty: string) {
  return difficulty.charAt(0).toUpperCase() + difficulty.slice(1);
}

export default function PulmonologyPage() {
  return (
    <main className="min-h-screen bg-[#f5f3ee] px-6 py-10 text-slate-900">
      <div className="mx-auto max-w-5xl">
        <Link
          href="/practice"
          className="mb-8 inline-block rounded-lg px-1 py-1 text-sm font-medium text-slate-500 transition hover:text-slate-900"
        >
          ← Back to specialties
        </Link>

        <div className="mb-10">
          <div className="flex flex-wrap items-center gap-3">
            <p className="text-sm font-semibold uppercase tracking-[0.2em] text-slate-500">
              Practice
            </p>
            <span className="rounded-full border border-slate-200 bg-white px-3 py-1 text-xs font-medium text-slate-500">
              {pulmonologyCases.length} cases
            </span>
          </div>

          <h1 className="mt-3 text-4xl font-semibold tracking-tight">
            Pulmonology
          </h1>

          <p className="mt-3 max-w-xl text-slate-600">
            Practice clinical reasoning through respiratory cases. Choose a case to begin.
          </p>
        </div>

        <section className="grid gap-4 md:grid-cols-2">
          {pulmonologyCases.map((caseData, index) => (
            <Link
              key={caseData.id}
              href={`/practice/pulmonology/${caseData.id}`}
              className="group rounded-2xl border border-slate-200 bg-white p-6 shadow-[0_6px_20px_rgba(15,23,42,0.035)] transition duration-200 hover:-translate-y-0.5 hover:border-slate-300 hover:shadow-[0_10px_28px_rgba(15,23,42,0.07)]"
            >
              <div className="flex items-start justify-between gap-4">
                <div>
                  <p className="text-xs font-semibold uppercase tracking-[0.16em] text-slate-400">
                    Case {String(index + 1).padStart(2, "0")}
                  </p>
                  <h2 className="mt-2 text-xl font-semibold tracking-tight text-slate-900">
                    {caseData.title}
                  </h2>
                </div>
                <span className="rounded-full bg-slate-100 px-3 py-1 text-xs font-semibold text-slate-500">
                  {difficultyLabel(caseData.difficulty)}
                </span>
              </div>

              <p className="mt-4 line-clamp-2 text-sm leading-6 text-slate-600">
                {caseData.presentation}
              </p>

              <div className="mt-5 flex items-center justify-between border-t border-slate-100 pt-4">
                <div className="flex flex-wrap gap-2">
                  {caseData.tags.slice(0, 3).map((tag) => (
                    <span key={tag} className="rounded-full bg-slate-50 px-2.5 py-1 text-[11px] font-medium text-slate-500">
                      {tag}
                    </span>
                  ))}
                </div>
                <span className="text-sm font-semibold text-blue-700 transition group-hover:translate-x-0.5">
                  Start →
                </span>
              </div>
            </Link>
          ))}
        </section>
      </div>
    </main>
  );
}
