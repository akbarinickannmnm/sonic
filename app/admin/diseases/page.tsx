"use client";

import { useMemo, useState } from "react";

import Header from "../../../components/Header";
import {
  diseases,
  type DiseasePriority,
} from "../../../data/diseases";

export default function DiseasesPage() {
  const [search, setSearch] = useState("");
  const [priority, setPriority] = useState<"all" | DiseasePriority>("all");

  const filteredDiseases = useMemo(() => {
    const query = search.trim().toLowerCase();

    return diseases.filter((disease) => {
      const matchesSearch =
        !query ||
        disease.name.toLowerCase().includes(query) ||
        disease.id.toLowerCase().includes(query);

      const matchesPriority =
        priority === "all" ||
        disease.priority === priority;

      return matchesSearch && matchesPriority;
    });
  }, [search, priority]);

  const priorityLabel = (value: DiseasePriority) => {
    if (value === 1) return "Must Have";
    if (value === 2) return "Very Important";
    return "Important / Educational";
  };

  return (
    <main className="min-h-screen bg-slate-50">
      <div className="mx-auto max-w-6xl px-6 py-8">
        <Header />

        <section className="mt-8">
          <div>
            <p className="text-sm font-semibold uppercase tracking-wider text-blue-600">
              SONIC Admin
            </p>

            <h1 className="mt-2 text-3xl font-bold text-slate-900">
              Disease Library
            </h1>

            <p className="mt-2 max-w-2xl text-sm leading-6 text-slate-600">
              Curated pulmonology disease library used as the source of
              truth for case diagnoses.
            </p>
          </div>

          <div className="mt-6 rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
            <div className="flex flex-col gap-4 md:flex-row">
              <div className="flex-1">
                <label
                  htmlFor="disease-search"
                  className="mb-2 block text-sm font-medium text-slate-700"
                >
                  Search
                </label>

                <input
                  id="disease-search"
                  value={search}
                  onChange={(event) =>
                    setSearch(event.target.value)
                  }
                  placeholder="Search by disease name or ID..."
                  className="w-full rounded-xl border border-slate-300 bg-white px-4 py-3 text-sm outline-none transition focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
                />
              </div>

              <div className="md:w-72">
                <label
                  htmlFor="priority-filter"
                  className="mb-2 block text-sm font-medium text-slate-700"
                >
                  Priority
                </label>

                <select
                  id="priority-filter"
                  value={priority}
                  onChange={(event) => {
                    const value = event.target.value;

                    setPriority(
                      value === "all"
                        ? "all"
                        : (Number(value) as DiseasePriority)
                    );
                  }}
                  className="w-full rounded-xl border border-slate-300 bg-white px-4 py-3 text-sm outline-none transition focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
                >
                  <option value="all">All Priorities</option>
                  <option value="1">Priority 1 — Must Have</option>
                  <option value="2">Priority 2 — Very Important</option>
                  <option value="3">
                    Priority 3 — Important / Educational
                  </option>
                </select>
              </div>
            </div>
          </div>

          <div className="mt-5 flex items-center justify-between">
            <div>
              <p className="text-sm font-semibold text-slate-900">
                {filteredDiseases.length} diseases
              </p>

              <p className="text-xs text-slate-500">
                Showing the curated pulmonology disease set.
              </p>
            </div>
          </div>

          <div className="mt-4 overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm">
            <div className="grid grid-cols-[1fr_180px] border-b border-slate-200 bg-slate-50 px-5 py-3 text-xs font-semibold uppercase tracking-wide text-slate-500">
              <div>Disease</div>
              <div>Priority</div>
            </div>

            {filteredDiseases.length === 0 ? (
              <div className="px-5 py-12 text-center text-sm text-slate-500">
                No diseases match your search.
              </div>
            ) : (
              filteredDiseases.map((disease) => (
                <div
                  key={disease.id}
                  className="grid grid-cols-[1fr_180px] items-center border-b border-slate-100 px-5 py-4 last:border-b-0"
                >
                  <div>
                    <p className="font-medium text-slate-900">
                      {disease.name}
                    </p>

                    <p className="mt-1 font-mono text-xs text-slate-400">
                      {disease.id}
                    </p>
                  </div>

                  <div>
                    <span
                      className={`inline-flex rounded-full px-3 py-1 text-xs font-semibold ${
                        disease.priority === 1
                          ? "bg-red-100 text-red-700"
                          : disease.priority === 2
                            ? "bg-amber-100 text-amber-700"
                            : "bg-emerald-100 text-emerald-700"
                      }`}
                    >
                      P{disease.priority} —{" "}
                      {priorityLabel(disease.priority)}
                    </span>
                  </div>
                </div>
              ))
            )}
          </div>
        </section>
      </div>
    </main>
  );
}
