"use client";

import { useMemo, useState } from "react";

import Header from "../../../components/Header";
import {
  pulmonologyQuestionBank,
  pulmonologyQuestionCategories,
} from "../../../data/pulmonologyQuestionBank";
import {
  cardiologyQuestionBank,
  cardiologyQuestionCategories,
} from "../../../data/cardiologyQuestionBank";

export default function QuestionBankPage() {
  const [course, setCourse] = useState<"pulmonology" | "cardiology">("pulmonology");
  const [search, setSearch] = useState("");
  const [category, setCategory] = useState("all");

  const questionBank = course === "cardiology" ? cardiologyQuestionBank : pulmonologyQuestionBank;
  const questionCategories = course === "cardiology" ? cardiologyQuestionCategories : pulmonologyQuestionCategories;

  const filteredQuestions = useMemo(() => {
    const query = search.trim().toLowerCase();

    return questionBank.filter((question) => {
      const matchesSearch =
        query.length === 0 ||
        question.text.toLowerCase().includes(query);

      const matchesCategory =
        category === "all" ||
        question.category === category;

      return matchesSearch && matchesCategory;
    });
  }, [search, category, questionBank]);

  const getCategoryLabel = (id: string) => {
    return questionCategories.find((item) => item.id === id)?.label ?? id;
  };

  return (
    <main className="min-h-screen bg-slate-100">
      <Header />

      <div className="mx-auto max-w-7xl px-6 py-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-slate-900">
            {course === "cardiology" ? "Cardiology" : "Pulmonology"} Question Bank
          </h1>

          <p className="mt-2 text-slate-600">
            Total Questions: {questionBank.length}
          </p>
        </div>


          <div className="mb-4 flex gap-2">
            <button type="button" onClick={() => { setCourse("pulmonology"); setCategory("all"); }} className={`rounded-xl px-4 py-2 text-sm font-medium ${course === "pulmonology" ? "bg-slate-900 text-white" : "bg-white text-slate-700"}`}>Pulmonology</button>
            <button type="button" onClick={() => { setCourse("cardiology"); setCategory("all"); }} className={`rounded-xl px-4 py-2 text-sm font-medium ${course === "cardiology" ? "bg-slate-900 text-white" : "bg-white text-slate-700"}`}>Cardiology</button>
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
            onChange={(e) => setCategory(e.target.value)}
            className="rounded-xl border border-slate-300 bg-white px-4 py-3 outline-none focus:border-slate-500"
          >
            <option value="all">
              All Categories
            </option>

            {questionCategories.map(
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