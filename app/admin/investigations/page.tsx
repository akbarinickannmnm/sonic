"use client";

import { useMemo, useState } from "react";

import Header from "../../../components/Header";
import {
  pulmonologyInvestigationBank,
  investigationCategories,
  type InvestigationCategory,
} from "../../../data/pulmonologyInvestigationBank";
import {
  cardiologyInvestigationBank,
  cardiologyInvestigationCategories,
} from "../../../data/cardiologyInvestigationBank";

export default function InvestigationBankPage() {
  const [course, setCourse] = useState<"pulmonology" | "cardiology">("pulmonology");
  const [search, setSearch] = useState("");
  const [category, setCategory] = useState<string>("all");

  const filteredInvestigations = useMemo(() => {
    const query = search.trim().toLowerCase();

    const bank = course === "cardiology" ? cardiologyInvestigationBank : pulmonologyInvestigationBank;
    return bank.filter((investigation) => {
      const matchesSearch =
        !query ||
        investigation.title.toLowerCase().includes(query) ||
        investigation.description.toLowerCase().includes(query);

      const matchesCategory =
        category === "all" ||
        investigation.category === category;

      return matchesSearch && matchesCategory;
    });
  }, [search, category, course]);

  const activeCategories = course === "cardiology" ? cardiologyInvestigationCategories : investigationCategories;
  const categoryLabel = (id: string) =>
    activeCategories.find((item) => item.id === id)?.label ?? id;

  return (
    <div className="min-h-screen bg-slate-950 text-white">
      <Header />

      <main className="mx-auto max-w-7xl px-6 py-8">
        <div className="mb-8">
          <div className="flex items-center justify-between gap-4">
            <div>
              <h1 className="text-3xl font-bold">
                {course === "cardiology" ? "Cardiology" : "Pulmonology"} Investigation Bank
              </h1>

          <p className="mt-2 text-slate-400">
            Available investigations for {course} cases.
          </p>
            </div>
            <select value={course} onChange={(e) => { setCourse(e.target.value as "pulmonology" | "cardiology"); setCategory("all"); }} className="rounded-lg border border-slate-700 bg-slate-900 px-4 py-3">
              <option value="pulmonology">Pulmonology</option>
              <option value="cardiology">Cardiology</option>
            </select>
          </div>
        </div>

        <div className="mb-6 flex flex-col gap-4 md:flex-row">
          <input
            type="text"
            placeholder="Search investigations..."
            value={search}
            onChange={(e) =>
              setSearch(e.target.value)
            }
            className="flex-1 rounded-lg border border-slate-700 bg-slate-900 px-4 py-3 outline-none"
          />

          <select
            value={category}
            onChange={(e) =>
              setCategory(
                e.target.value
              )
            }
            className="rounded-lg border border-slate-700 bg-slate-900 px-4 py-3"
          >
            <option value="all">
              All Categories
            </option>

            {activeCategories.map((category) => (
              <option
                key={category.id}
                value={category.id}
              >
                {category.label}
              </option>
            ))}
          </select>
        </div>

        <div className="mb-4 text-sm text-slate-400">
          {filteredInvestigations.length} investigations
        </div>

        <div className="grid gap-4">
          {filteredInvestigations.map(
            (investigation) => (
              <div
                key={investigation.id}
                className="rounded-xl border border-slate-800 bg-slate-900 p-5"
              >
                <div className="mb-3 flex items-center justify-between">
                  <div>
                    <h2 className="text-lg font-semibold">
                      {investigation.title}
                    </h2>

                    <p className="text-sm text-slate-400">
                      {investigation.id}
                    </p>
                  </div>

                  <span className="rounded-full border border-slate-700 px-3 py-1 text-xs">
                    {categoryLabel(
                      investigation.category
                    )}
                  </span>
                </div>

                <p className="text-slate-300">{investigation.description}</p>
                {"answer" in investigation && (
                  <div className="mt-4 rounded-lg border border-slate-700 bg-slate-950/60 p-4">
                    <p className="text-xs font-semibold uppercase tracking-wider text-slate-500">Key answer / expected finding</p>
                    <p className="mt-1 text-sm leading-6 text-slate-300">{investigation.answer}</p>
                  </div>
                )}
              </div>
            )
          )}
        </div>
      </main>
    </div>
  );
}