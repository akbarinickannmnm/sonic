"use client";

import { useMemo, useState } from "react";
import Header from "../../../components/Header";
import {
  getCourseBank,
  type HistoryBankItem,
  type PhysicalExamBankItem,
  type InvestigationBankItem,
} from "../../../data/courseBanks";

type Course = "pulmonology" | "cardiology";
type Section = "history" | "physicalExam" | "investigations";

const sections: { id: Section; label: string }[] = [
  { id: "history", label: "History" },
  { id: "physicalExam", label: "Physical Examination" },
  { id: "investigations", label: "Investigations" },
];

export default function QuestionBankPage() {
  const [course, setCourse] = useState<Course>("pulmonology");
  const [section, setSection] = useState<Section>("history");
  const [search, setSearch] = useState("");
  const [category, setCategory] = useState("all");
  const bank = useMemo(() => getCourseBank(course), [course]);
  const activeItems = section === "history" ? bank.history : section === "physicalExam" ? bank.physicalExam : bank.investigations;
  const activeCategories = section === "history" ? bank.historyCategories : section === "physicalExam" ? bank.physicalExamCategories : bank.investigationCategories;

  const filteredItems = useMemo(() => {
    const query = search.trim().toLowerCase();
    const matches = (item: HistoryBankItem | PhysicalExamBankItem | InvestigationBankItem) => {
      const searchable = "text" in item
        ? `${item.id} ${item.text}`
        : `${item.id} ${item.title} ${item.description}`;
      return (!query || searchable.toLowerCase().includes(query)) &&
        (category === "all" || item.category === category);
    };

    if (section === "history") return bank.history.filter(matches);
    if (section === "physicalExam") return bank.physicalExam.filter(matches);
    return bank.investigations.filter(matches);
  }, [bank, search, category, section]);

  return (
    <main className="min-h-screen bg-slate-100">
      <Header />
      <div className="mx-auto max-w-7xl px-6 py-8">
        <div className="mb-6">
          <p className="text-sm font-semibold uppercase tracking-wide text-blue-600">SONIC</p>
          <h1 className="mt-1 text-3xl font-bold text-slate-900">Course Question Banks</h1>
          <p className="mt-2 max-w-3xl text-slate-600">Each course has one bank containing reusable History, Physical Examination, and Investigation items. Answers are attached to individual cases through stable bank item IDs.</p>
        </div>
        <div className="mb-5 flex flex-wrap gap-2">
          {(["pulmonology", "cardiology"] as const).map((item) => (
            <button key={item} type="button" onClick={() => { setCourse(item); setCategory("all"); }} className={`rounded-xl px-4 py-2 text-sm font-semibold ${course === item ? "bg-slate-900 text-white" : "bg-white text-slate-700"}`}>
              {item === "pulmonology" ? "Pulmonology" : "Cardiology"}
            </button>
          ))}
        </div>
        <div className="mb-5 flex flex-wrap gap-2">
          {sections.map((item) => (
            <button key={item.id} type="button" onClick={() => { setSection(item.id); setCategory("all"); }} className={`rounded-full px-4 py-2 text-sm font-medium ${section === item.id ? "bg-blue-600 text-white" : "bg-white text-slate-700"}`}>
              {item.label}
            </button>
          ))}
        </div>
        <div className="mb-5 grid gap-4 md:grid-cols-2">
          <input type="text" placeholder="Search..." value={search} onChange={(e) => setSearch(e.target.value)} className="rounded-xl border border-slate-300 bg-white px-4 py-3 outline-none focus:border-slate-500" />
          <select value={category} onChange={(e) => setCategory(e.target.value)} className="rounded-xl border border-slate-300 bg-white px-4 py-3 outline-none focus:border-slate-500">
            <option value="all">All Categories</option>
            {activeCategories.map((item) => <option key={item.id} value={item.id}>{item.label}</option>)}
          </select>
        </div>
        <div className="mb-4 grid gap-4 md:grid-cols-3">
          {[["History", bank.history.length], ["Physical Examination", bank.physicalExam.length], ["Investigations", bank.investigations.length]].map(([label, count]) => (
            <div key={String(label)} className="rounded-2xl bg-white p-4 shadow-sm"><p className="text-xs font-semibold uppercase tracking-wide text-slate-400">{label}</p><p className="mt-1 text-2xl font-bold text-slate-900">{count}</p></div>
          ))}
        </div>
        <div className="mb-4 rounded-2xl bg-white p-4 shadow-sm"><p className="text-sm text-slate-600">Showing {filteredItems.length} items.</p></div>
        <div className="space-y-3">
          {filteredItems.map((item) => {
            const isHistory = "text" in item;
            const title = isHistory ? item.text : item.title;
            const description = isHistory ? null : item.description;
            const answerCount = Object.keys(item.answersByCase).length;
            return (
              <div key={item.id} className="rounded-2xl bg-white p-4 shadow-sm">
                <div className="mb-2 flex flex-wrap items-center gap-2">
                  <span className="rounded-lg bg-slate-100 px-2 py-1 text-xs font-medium text-slate-700">{item.id}</span>
                  <span className="rounded-lg bg-blue-50 px-2 py-1 text-xs font-medium text-blue-700">{activeCategories.find((c) => c.id === item.category)?.label ?? item.category}</span>
                  <span className="rounded-lg bg-emerald-50 px-2 py-1 text-xs font-medium text-emerald-700">{answerCount} case answer{answerCount === 1 ? "" : "s"}</span>
                </div>
                <p className="font-medium text-slate-900">{title}</p>
                {description && <p className="mt-1 text-sm leading-6 text-slate-500">{description}</p>}
              </div>
            );
          })}
        </div>
      </div>
    </main>
  );
}
