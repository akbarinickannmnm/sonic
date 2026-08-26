"use client";

import { useMemo, useState } from "react";

import Header from "../../../components/Header";
import {
  pulmonologyInvestigationBank,
  investigationCategories,
  type InvestigationCategory,
} from "../../../data/pulmonologyInvestigationBank";

export default function InvestigationBankPage() {
  const [search, setSearch] = useState("");
  const [category, setCategory] = useState<
    "all" | InvestigationCategory
  >("all");

  const filteredInvestigations = useMemo(() => {
    const query = search.trim().toLowerCase();

    return pulmonologyInvestigationBank.filter((investigation) => {
      const matchesSearch =
        !query ||
        investigation.title.toLowerCase().includes(query) ||
        investigation.description.toLowerCase().includes(query);

      const matchesCategory =
        category === "all" ||
        investigation.category === category;

      return matchesSearch && matchesCategory;
    });
  }, [search, category]);

  const categoryLabel = (id: InvestigationCategory) =>
    investigationCategories.find(
      (item) => item.id === id
    )?.label ?? id;

  return (
    <div className="min-h-screen bg-slate-950 text-white">
      <Header />

      <main className="mx-auto max-w-7xl px-6 py-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold">
            Pulmonology Investigation Bank
          </h1>

          <p className="mt-2 text-slate-400">
            Available investigations for pulmonology cases.
          </p>
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
                e.target.value as
                  | "all"
                  | InvestigationCategory
              )
            }
            className="rounded-lg border border-slate-700 bg-slate-900 px-4 py-3"
          >
            <option value="all">
              All Categories
            </option>

            {investigationCategories.map((category) => (
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

                <p className="text-slate-300">
                  {investigation.description}
                </p>
              </div>
            )
          )}
        </div>
      </main>
    </div>
  );
}