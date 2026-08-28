import Link from "next/link";

export default function PulmonologyPage() {
  return (
    <main className="min-h-screen bg-[#f5f3ee] px-6 py-10 text-slate-900">
      <div className="mx-auto max-w-5xl">
        <Link
          href="/practice"
          className="mb-8 inline-block text-sm font-medium text-slate-500 hover:text-slate-900"
        >
          ← Back to specialties
        </Link>

        <div className="mb-10">
          <p className="mb-3 text-sm font-semibold uppercase tracking-[0.2em] text-slate-500">
            Practice
          </p>

          <h1 className="text-4xl font-semibold tracking-tight">
            Pulmonology
          </h1>

          <p className="mt-3 max-w-xl text-slate-600">
            Practice clinical reasoning through respiratory cases.
          </p>
        </div>

        <section className="rounded-2xl border border-slate-200 bg-white p-8 shadow-sm">
          <h2 className="text-xl font-semibold">Pulmonology Cases</h2>

          <p className="mt-2 text-sm text-slate-500">
            Case selection will be connected here next.
          </p>
        </section>
      </div>
    </main>
  );
}