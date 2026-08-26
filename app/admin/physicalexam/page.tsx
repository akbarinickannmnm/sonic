"use client";

import { useMemo, useState } from "react";

import Header from "../../../components/Header";
import {
  pulmonologyPhysicalExamBank,
  physicalExamCategories,
  type PhysicalExamCategory,
} from "../../../data/pulmonologyPhysicalExamBank";

export default function PhysicalExamBankPage() {
  const [search, setSearch] = useState("");
  const [category, setCategory] = useState<
    "all" | PhysicalExamCategory
  >("all");

  const filteredExams = useMemo(() => {
    const query = search.trim().toLowerCase();

    return pulmonologyPhysicalExamBank.filter((exam) => {
      const matchesSearch =
        !query ||
        exam.title.toLowerCase().includes(query) ||
        exam.description.toLowerCase().includes(query);

      const matchesCategory =
        category === "all" || exam.category === category;

      return matchesSearch && matchesCategory;
    });
  }, [search, category]);

  const categoryLabel = (id: PhysicalExamCategory) =>
    physicalExamCategories.find((item) => item.id === id)?.label ?? id;

  return (
    <div className="min-h-screen bg-slate-950 text-white">
      <Header />

      <main className="mx-auto max-w-7xl px-6 py-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold">
            Pulmonology Physical Exam Bank
          </h1>

          <p className="mt-2 text-slate-400">
            Physical examination actions available for pulmonology cases.
          </p>
        </div>

        <div className="mb-6 flex flex-col gap-4 md:flex-row">
          <input
            type="text"
            placeholder="Search examinations..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="flex-1 rounded-lg border border-slate-700 bg-slate-900 px-4 py-3 outline-none"
          />

          <select
            value={category}
            onChange={(e) =>
              setCategory(
                e.target.value as "all" | PhysicalExamCategory
              )
            }
            className="rounded-lg border border-slate-700 bg-slate-900 px-4 py-3"
          >
            <option value="all">All Categories</option>

            {physicalExamCategories.map((category) => (
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
          {filteredExams.length} examinations
        </div>

        <div className="grid gap-4">
          {filteredExams.map((exam) => (
            <div
              key={exam.id}
              className="rounded-xl border border-slate-800 bg-slate-900 p-5"
            >
              <div className="mb-3 flex items-center justify-between">
                <div>
                  <h2 className="text-lg font-semibold">
                    {exam.title}
                  </h2>

                  <p className="text-sm text-slate-400">
                    {exam.id}
                  </p>
                </div>

                <span className="rounded-full border border-slate-700 px-3 py-1 text-xs">
                  {categoryLabel(exam.category)}
                </span>
              </div>

              <p className="text-slate-300">
                {exam.description}
              </p>
            </div>
          ))}
        </div>
      </main>
    </div>
  );
}