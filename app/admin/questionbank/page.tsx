"use client";

import { useMemo, useState } from "react";

import Header from "../../../components/Header";
import {
  pulmonologyQuestionBank,
  pulmonologyQuestionCategories,
  type PulmonologyQuestionCategory,
} from "../../../data/pulmonologyQuestionBank";

export default function QuestionBankPage() {
  const [search, setSearch] = useState("");
  const [category, setCategory] = useState<
    "all" | PulmonologyQuestionCategory
  >("all");

  const filteredQuestions = useMemo(() => {
    const query = search.trim().toLowerCase();

    return pulmonologyQuestionBank.filter((question) => {
      const matchesSearch =
        query.length === 0 ||
        question.text.toLowerCase().includes(query);

      const matchesCategory =
        category === "all" ||
        question.category === category;

      return matchesSearch && matchesCategory;
    });
  }, [search, category]);

  const getCategoryLabel = (
    id: PulmonologyQuestionCategory
  ) => {
    return (
      pulmonologyQuestionCategories.find(
        (item) => item.id === id
      )?.label ?? id
    );
  };

  return (
    <main className="min-h-screen bg-slate-100">
      <Header />

      <div className="mx-auto max-w-7xl px-6 py-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-slate-900">
            Pulmonology Question Bank
          </h1>

          <p className="mt-2 text-slate-600">
            Total Questions: {pulmonologyQuestionBank.length}
          </p>
        </div>

        <div className="mb-6 grid gap-4 md:grid-cols-2">
          <input
            type="text"
            placeholder="Search question..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="rounded-xl border border-slate-300 bg-white px-4 py-3 outline-none focus:border-slate-500"
          />

          <select
            value={category}
            onChange={(e) =>
              setCategory(
                e.target.value as
                  | "all"
                  | PulmonologyQuestionCategory
              )
            }
            className="rounded-xl border border-slate-300 bg-white px-4 py-3 outline-none focus:border-slate-500"
          >
            <option value="all">
              All Categories
            </option>

            {pulmonologyQuestionCategories.map(
              (category) => (
                <option
                  key={category.id}
                  value={category.id}
                >
                  {category.label}
                </option>
              )
            )}
          </select>
        </div>

        <div className="mb-4 rounded-2xl bg-white p-4 shadow-sm">
          <p className="text-sm text-slate-600">
            Showing {filteredQuestions.length} questions
          </p>
        </div>

        <div className="space-y-3">
          {filteredQuestions.map((question) => (
            <div
              key={question.id}
              className="rounded-2xl bg-white p-4 shadow-sm"
            >
              <div className="mb-2 flex items-center gap-2">
                <span className="rounded-lg bg-slate-100 px-2 py-1 text-xs font-medium text-slate-700">
                  {question.id}
                </span>

                <span className="rounded-lg bg-blue-50 px-2 py-1 text-xs font-medium text-blue-700">
                  {getCategoryLabel(
                    question.category
                  )}
                </span>
              </div>

              <p className="text-slate-900">
                {question.text}
              </p>
            </div>
          ))}
        </div>
      </div>
    </main>
  );
}