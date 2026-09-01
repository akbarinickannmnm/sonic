"use client";

import { useMemo, useState } from "react";

import Header from "../../../components/Header";
import {
  pulmonologyPhysicalExamBank,
  physicalExamCategories,
  type PhysicalExamCategory,
} from "../../../data/pulmonologyPhysicalExamBank";
import {
  cardiologyPhysicalExamBank,
  cardiologyPhysicalExamCategories,
  type CardiologyPhysicalExamCategory,
} from "../../../data/cardiologyPhysicalExamBank";

export default function PhysicalExamBankPage() {
  const [course, setCourse] = useState<"pulmonology" | "cardiology">("pulmonology");
  const [search, setSearch] = useState("");
  const [category, setCategory] = useState<string>("all");

  const filteredExams = useMemo(() => {
    const query = search.trim().toLowerCase();

    const bank = course === "cardiology" ? cardiologyPhysicalExamBank : pulmonologyPhysicalExamBank;
    return bank.filter((exam) => {
      const matchesSearch =
        !query ||
        exam.title.toLowerCase().includes(query) ||
        exam.description.toLowerCase().includes(query);

      const matchesCategory =
        category === "all" || exam.category === category;

      return matchesSearch && matchesCategory;
    });
  }, [search, category, course]);

  const activeCategories = course === "cardiology" ? cardiologyPhysicalExamCategories : physicalExamCategories;
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
                {course === "cardiology" ? "Cardiology" : "Pulmonology"} Physical Exam Bank
              </h1>

          <p className="mt-2 text-slate-400">
            Physical examination actions available for {course} cases.
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
            placeholder="Search examinations..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
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
            <option value="all">All Categories</option>

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

              <p className="text-slate-300">{exam.description}</p>
              {"answer" in exam && (
                <div className="mt-4 rounded-lg border border-slate-700 bg-slate-950/60 p-4">
                  <p className="text-xs font-semibold uppercase tracking-wider text-slate-500">Key answer / expected finding</p>
                  <p className="mt-1 text-sm leading-6 text-slate-300">{exam.answer}</p>
                </div>
              )}
            </div>
          ))}
        </div>
      </main>
    </div>
  );
}