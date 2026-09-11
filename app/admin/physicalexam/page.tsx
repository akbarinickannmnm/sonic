"use client";

import { useMemo, useState } from "react";
import Header from "../../../components/Header";
import { getCourseBank } from "../../../data/courseBanks";
import type { Course } from "../../../types/case";

const COURSE_LABELS: Record<Course, string> = {
  pulmonology: "ریه",
  cardiology: "قلب و عروق",
  gastroenterology: "گوارش",
  neurology: "نورولوژی",
  "infectious-disease": "عفونی",
  nephrology: "نفرولوژی",
  endocrinology: "غدد",
  "hematology-oncology": "هماتولوژی و انکولوژی",
};

export default function PhysicalExamBankPage() {
  const [course, setCourse] = useState<Course>("pulmonology");
  const [search, setSearch] = useState("");
  const [category, setCategory] = useState("all");
  const bank = useMemo(() => getCourseBank(course), [course]);
  const activeCategories = bank.physicalExamCategories;

  const filteredExams = useMemo(() => {
    const query = search.trim().toLowerCase();
    return bank.physicalExam.filter((exam) => {
      const matchesSearch = !query || `${exam.id} ${exam.title} ${exam.description}`.toLowerCase().includes(query);
      const matchesCategory = category === "all" || exam.category === category;
      return matchesSearch && matchesCategory;
    });
  }, [bank, search, category]);

  return (
    <div className="min-h-screen bg-slate-950 text-white">
      <Header />
      <main className="mx-auto max-w-7xl px-6 py-8">
        <div className="mb-8 flex items-center justify-between gap-4">
          <div>
            <h1 className="text-3xl font-bold">{COURSE_LABELS[course]} Physical Exam Bank</h1>
            <p className="mt-2 text-slate-400">اقدامات معاینه فیزیکی قابل استفاده در کیس‌های این درس.</p>
          </div>
          <select value={course} onChange={(e) => { setCourse(e.target.value as Course); setCategory("all"); }} className="rounded-lg border border-slate-700 bg-slate-900 px-4 py-3">
            <option value="pulmonology">ریه</option>
            <option value="cardiology">قلب و عروق</option>
            <option value="nephrology">نفرولوژی</option>
            <option value="gastroenterology">گوارش</option>
            <option value="endocrinology">غدد</option>
            <option value="hematology-oncology">هماتولوژی و انکولوژی</option>
          </select>
        </div>

        <div className="mb-6 flex flex-col gap-4 md:flex-row">
          <input type="text" placeholder="جستجوی معاینات..." value={search} onChange={(e) => setSearch(e.target.value)} className="flex-1 rounded-lg border border-slate-700 bg-slate-900 px-4 py-3 outline-none" />
          <select value={category} onChange={(e) => setCategory(e.target.value)} className="rounded-lg border border-slate-700 bg-slate-900 px-4 py-3">
            <option value="all">همه دسته‌ها</option>
            {activeCategories.map((item) => <option key={item.id} value={item.id}>{item.label}</option>)}
          </select>
        </div>

        <div className="mb-4 text-sm text-slate-400">{filteredExams.length} examinations</div>
        <div className="grid gap-4">
          {filteredExams.map((exam) => (
            <div key={exam.id} className="rounded-xl border border-slate-800 bg-slate-900 p-5">
              <div className="mb-3 flex items-center justify-between gap-4">
                <div><h2 className="text-lg font-semibold">{exam.title}</h2><p className="text-sm text-slate-400">{exam.id}</p></div>
                <span className="rounded-full border border-slate-700 px-3 py-1 text-xs">{activeCategories.find((c) => c.id === exam.category)?.label ?? exam.category}</span>
              </div>
              <p className="text-slate-300">{exam.description}</p>
            </div>
          ))}
        </div>
      </main>
    </div>
  );
}
