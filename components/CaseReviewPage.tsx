"use client";

import { useMemo, useState } from "react";
import Link from "next/link";
import type { Case, ReviewQuestion } from "../types/case";
import { getCourseBank } from "../data/courseBanks";

function stageLabel(type: "history" | "physical-exam" | "investigation") {
  if (type === "history") return "شرح حال";
  if (type === "physical-exam") return "معاینه فیزیکی";
  return "بررسی‌ها";
}

function reviewCategory(category: ReviewQuestion["category"]) {
  const labels: Record<ReviewQuestion["category"], string> = {
    diagnosis: "تشخیص",
    investigation: "بررسی‌ها",
    treatment: "درمان",
    "follow-up": "پیگیری",
    complication: "عوارض",
    "risk-factor": "ریسک‌فاکتورها",
  };
  return labels[category];
}

export default function CaseReviewPage({ caseData }: { caseData: Case }) {
  const bank = useMemo(() => getCourseBank(caseData.course, [caseData]), [caseData]);
  const [answers, setAnswers] = useState<Record<string, string>>({});

  const historyItems = bank.history.map((question) => ({
    id: question.id,
    label: question.text,
    category: bank.historyCategories.find((item) => item.id === question.category)?.label ?? question.category,
    answer: question.answersByCase[caseData.id] ?? "برای این کیس اطلاعاتی برای این سؤال ثبت نشده است.",
  }));

  const physicalItems = (caseData.stages.find((stage) => stage.type === "physical-exam")?.hints ?? []).map((hint) => ({
    id: hint.id,
    label: hint.label ?? hint.sourceId ?? "یافته معاینه",
    answer: hint.content,
  }));

  const investigationItems = (caseData.stages.find((stage) => stage.type === "investigation")?.investigations ?? []).map((item) => ({
    id: item.id,
    label: item.name,
    answer: item.findings.map((finding) => `${finding.label}: ${finding.value}`).join("\n"),
    category: item.category,
  }));

  return (
    <main dir="rtl" className="min-h-screen bg-[#f7f9fc] text-slate-900">
      <div className="mx-auto w-full max-w-5xl px-4 py-6 sm:px-6 lg:px-8 lg:py-9">
        <Link href={`/practice/${caseData.course}`} className="inline-flex text-sm font-semibold text-slate-500 hover:text-slate-900">
          → بازگشت به کیس‌ها
        </Link>

        <header className="mt-6 rounded-[24px] border border-slate-200 bg-white px-6 py-7 shadow-[0_8px_28px_rgba(15,23,42,0.035)] sm:px-8">
          <div className="text-xs font-bold tracking-[0.15em] text-slate-400">DIAGNOSIS REVIEW</div>
          <h1 className="mt-2 text-3xl font-extrabold tracking-tight text-slate-950">{caseData.diagnosis.name}</h1>
          <p className="mt-3 max-w-3xl text-sm leading-7 text-slate-600">مرور کامل کیس، پاسخ تمام سؤال‌ها و نکات آموزشی مرتبط با تشخیص نهایی.</p>
        </header>

        <section className="mt-5 rounded-[22px] border border-slate-200 bg-white p-6 sm:p-7">
          <div className="text-xs font-bold text-slate-400">خلاصه کیس</div>
          <p className="mt-2 text-sm leading-8 text-slate-700">{caseData.presentation}</p>
        </section>

        <section className="mt-5 rounded-[22px] border border-slate-200 bg-white p-6 sm:p-7">
          <div className="flex items-end justify-between gap-4">
            <div>
              <div className="text-xs font-bold text-slate-400">REVIEW QUESTIONS</div>
              <h2 className="mt-1 text-xl font-extrabold text-slate-950">سؤال‌های مروری</h2>
            </div>
            <span className="text-xs font-semibold text-slate-400">{caseData.reviewQuestions.length} سؤال</span>
          </div>

          {caseData.reviewQuestions.length === 0 ? (
            <div className="mt-5 rounded-xl border border-dashed border-slate-200 bg-slate-50 px-4 py-5 text-sm leading-7 text-slate-500">
              سؤال‌های مروری اختصاصی این تشخیص هنوز به محتوای کیس اضافه نشده‌اند. ساختار صفحه آماده است و با اضافه شدن محتوا همین بخش فعال می‌شود.
            </div>
          ) : (
            <div className="mt-5 space-y-4">
              {caseData.reviewQuestions.map((question, index) => (
                <ReviewCard key={question.id} question={question} index={index} selected={answers[question.id]} onAnswer={(id, optionId) => setAnswers((current) => ({ ...current, [id]: optionId }))} />
              ))}
            </div>
          )}
        </section>

        <section className="mt-5 rounded-[22px] border border-slate-200 bg-white p-6 sm:p-7">
          <SectionHeading eyebrow="HISTORY REVIEW" title="تمام سؤال‌های شرح حال" count={historyItems.length} />
          <div className="mt-5 space-y-2">
            {historyItems.map((item, index) => (
              <details key={item.id} className="group rounded-xl border border-slate-200 bg-white">
                <summary className="flex cursor-pointer list-none items-center justify-between gap-4 px-4 py-4 [&::-webkit-details-marker]:hidden">
                  <div className="flex min-w-0 items-center gap-3">
                    <span className="flex h-7 w-7 shrink-0 items-center justify-center rounded-lg bg-slate-100 text-xs font-extrabold text-slate-500">{index + 1}</span>
                    <div className="min-w-0">
                      <div className="text-[11px] font-bold text-slate-400">{item.category}</div>
                      <div className="mt-1 text-sm font-semibold leading-6 text-slate-800">{item.label}</div>
                    </div>
                  </div>
                  <span className="text-slate-300 transition group-open:rotate-180">⌄</span>
                </summary>
                <div className="border-t border-slate-100 px-4 py-4 text-sm leading-7 text-slate-700">
                  <span className="font-bold text-slate-400">پاسخ بیمار:</span> {item.answer}
                </div>
              </details>
            ))}
          </div>
        </section>

        <section className="mt-5 rounded-[22px] border border-slate-200 bg-white p-6 sm:p-7">
          <SectionHeading eyebrow="PHYSICAL EXAM" title="تمام یافته‌های معاینه" count={physicalItems.length} />
          <div className="mt-5 grid gap-3 sm:grid-cols-2">
            {physicalItems.map((item) => <FindingCard key={item.id} label={item.label} answer={item.answer} />)}
          </div>
        </section>

        <section className="mt-5 rounded-[22px] border border-slate-200 bg-white p-6 sm:p-7">
          <SectionHeading eyebrow="INVESTIGATIONS" title="تمام بررسی‌ها" count={investigationItems.length} />
          <div className="mt-5 space-y-3">
            {investigationItems.map((item) => (
              <div key={item.id} className="rounded-xl border border-slate-200 p-4">
                <div className="flex flex-wrap items-center justify-between gap-2">
                  <h3 className="text-sm font-extrabold text-slate-900">{item.label}</h3>
                  <span className="rounded-full bg-slate-50 px-2.5 py-1 text-[11px] font-bold text-slate-500">{item.category}</span>
                </div>
                <p className="mt-3 whitespace-pre-line text-sm leading-7 text-slate-700">{item.answer}</p>
                <VisualSlot name={item.label} />
              </div>
            ))}
          </div>
        </section>

        <section className="mt-5 rounded-[22px] border border-slate-200 bg-white p-6 sm:p-7">
          <div className="text-xs font-bold text-slate-400">CLINICAL PEARLS</div>
          <h2 className="mt-1 text-xl font-extrabold text-slate-950">نکات کلیدی</h2>
          <div className="mt-4 rounded-xl bg-slate-50 px-4 py-4 text-sm leading-7 text-slate-600">
            محتوای High-yield اختصاصی این تشخیص در مرحله بعدی به این بخش اضافه می‌شود.
          </div>
        </section>
      <section className="mt-8 border-t border-slate-200 pt-7">
        <div className="rounded-[22px] border border-slate-200 bg-white px-6 py-6 text-center shadow-[0_8px_28px_rgba(15,23,42,0.025)] sm:px-8">
          <div className="text-sm font-extrabold text-slate-900">مرور کیس تمام شد</div>
          <p className="mx-auto mt-2 max-w-lg text-sm leading-7 text-slate-500">
            حالا می‌توانی به مسیر کیس‌ها برگردی و ادامه‌ی تمرین را دنبال کنی.
          </p>
          <Link
            href={`/practice/${caseData.course}`}
            className="mt-5 inline-flex min-h-11 items-center justify-center rounded-xl bg-slate-900 px-6 text-sm font-bold text-white transition hover:bg-slate-800"
          >
            ادامه کیس‌ها
            <span aria-hidden="true" className="mr-2">←</span>
          </Link>
        </div>
      </section>
      </div>
    </main>
  );
}

function SectionHeading({ eyebrow, title, count }: { eyebrow: string; title: string; count: number }) {
  return (
    <div className="flex items-end justify-between gap-4">
      <div>
        <div className="text-xs font-bold text-slate-400">{eyebrow}</div>
        <h2 className="mt-1 text-xl font-extrabold text-slate-950">{title}</h2>
      </div>
      <span className="text-xs font-semibold text-slate-400">{count} مورد</span>
    </div>
  );
}

function FindingCard({ label, answer }: { label: string; answer: string }) {
  return <div className="rounded-xl border border-slate-200 p-4"><div className="text-sm font-extrabold text-slate-900">{label}</div><p className="mt-2 whitespace-pre-line text-sm leading-7 text-slate-700">{answer}</p></div>;
}

function VisualSlot({ name }: { name: string }) {
  const visual = /ECG|Chest X-Ray|CT|MRI|Echo|Ultrasound|Radiograph/i.test(name);
  if (!visual) return null;
  return (
    <div className="mt-4 rounded-xl border border-dashed border-slate-300 bg-slate-50 px-4 py-6 text-center">
      <div className="text-xs font-bold text-slate-400">VISUAL REVIEW</div>
      <div className="mt-1 text-sm font-semibold text-slate-600">تصویر آموزشی {name} در این قسمت قرار می‌گیرد.</div>
    </div>
  );
}

function ReviewCard({ question, index, selected, onAnswer }: { question: ReviewQuestion; index: number; selected?: string; onAnswer: (id: string, optionId: string) => void }) {
  const submitted = Boolean(selected);
  return (
    <div className="rounded-xl border border-slate-200 p-4 sm:p-5">
      <div className="flex items-center gap-2 text-xs font-bold text-slate-400"><span>{index + 1}</span><span>·</span><span>{reviewCategory(question.category)}</span></div>
      <h3 className="mt-2 text-sm font-extrabold leading-7 text-slate-900">{question.question}</h3>
      <div className="mt-4 space-y-2">
        {question.options.map((option) => {
          const isSelected = selected === option.id;
          const isCorrect = option.id === question.correctOptionId;
          const className = submitted
            ? isCorrect
              ? "border-emerald-300 bg-emerald-50 text-emerald-900"
              : isSelected
                ? "border-rose-300 bg-rose-50 text-rose-900"
                : "border-slate-200 bg-white text-slate-500"
            : "border-slate-200 bg-white text-slate-700 hover:border-slate-300 hover:bg-slate-50";
          return (
            <button key={option.id} type="button" disabled={submitted} onClick={() => onAnswer(question.id, option.id)} className={`w-full rounded-xl border px-4 py-3 text-right text-sm font-semibold transition ${className}`}>
              {option.text}
            </button>
          );
        })}
      </div>
      {submitted && <div className="mt-4 rounded-xl bg-slate-50 px-4 py-3 text-sm leading-7 text-slate-600"><span className="font-bold text-slate-800">توضیح:</span> {question.explanation}</div>}
    </div>
  );
}
