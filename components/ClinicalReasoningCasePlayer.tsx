"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import type { ClinicalReasoningCase } from "../data/clinicalReasoningCases";
import { searchBank } from "../data/searchBank";
import type { Diagnosis } from "../data/searchBank";
import DiagnosisSearch from "./DiagnosisSearch";
import {
  clinicalReasoningHistoryBank,
  clinicalReasoningInvestigationBank,
  clinicalReasoningPhysicalExamBank,
} from "../data/clinicalReasoningCases";

type Stage = "history" | "physical-exam" | "investigation" | "diagnosis";

type Props = {
  caseData: ClinicalReasoningCase;
};

const stages: Array<{ id: Stage; label: string }> = [
  { id: "history", label: "شرح حال" },
  { id: "physical-exam", label: "معاینه" },
  { id: "investigation", label: "بررسی‌ها" },
  { id: "diagnosis", label: "تشخیص" },
];

// Fixed Clinical Reasoning flow: 3 history questions → 2 physical exam items → 2 investigations → diagnosis.
const MAX_HISTORY_QUESTIONS = 3;
const MAX_PHYSICAL_EXAMS = 2;
const MAX_INVESTIGATIONS = 2;

function normalize(value: string) {
  return value
    .trim()
    .toLowerCase()
    .replace(/[ـ\u200c]/g, "")
    .replace(/\s+/g, " ");
}

function answerMatches(input: string, diagnosis: Diagnosis) {
  const normalizedInput = normalize(input);
  if (!normalizedInput) return false;

  const variants = [diagnosis.id, diagnosis.name, ...diagnosis.synonyms]
    .map((value) => normalize(value))
    .filter(Boolean);

  return variants.includes(normalizedInput);
}

function SectionIntro({ eyebrow, title, description, count }: {
  eyebrow: string;
  title: string;
  description: string;
  count?: string;
}) {
  return (
    <div className="flex items-start justify-between gap-4">
      <div>
        <div className="text-[11px] font-bold uppercase tracking-[0.14em] text-slate-400">{eyebrow}</div>
        <h2 className="mt-1 text-xl font-extrabold text-slate-950">{title}</h2>
        <p className="mt-1 text-sm leading-6 text-slate-400">{description}</p>
      </div>
      {count ? <div className="mt-1 shrink-0 text-[11px] font-bold leading-5 text-slate-400">{count}</div> : null}
    </div>
  );
}

export default function ClinicalReasoningCasePlayer({ caseData }: Props) {
  const storageKey = `sonic:clinical-reasoning:${caseData.id}`;

  const [activeStage, setActiveStage] = useState<Stage>("history");
  const [activeHistoryId, setActiveHistoryId] = useState<string | null>(null);
  const [activePhysicalId, setActivePhysicalId] = useState<string | null>(null);
  const [activeInvestigationId, setActiveInvestigationId] = useState<string | null>(null);
  const [historySequence, setHistorySequence] = useState<string[]>([]);
  const [physicalSequence, setPhysicalSequence] = useState<string[]>([]);
  const [investigationSequence, setInvestigationSequence] = useState<string[]>([]);
  const [selectedCategory, setSelectedCategory] = useState<string>("all");
  const [diagnosisInput, setDiagnosisInput] = useState("");
  const [showDiagnosisSuggestions, setShowDiagnosisSuggestions] = useState(false);
  const [diagnosisSubmitted, setDiagnosisSubmitted] = useState(false);
  const [diagnosisCorrect, setDiagnosisCorrect] = useState(false);
  const [hydrated, setHydrated] = useState(false);

  const viewedHistory = useMemo(() => new Set(historySequence), [historySequence]);
  const viewedPhysical = useMemo(() => new Set(physicalSequence), [physicalSequence]);
  const viewedInvestigation = useMemo(() => new Set(investigationSequence), [investigationSequence]);

  const historyCategories = useMemo(
    () => Array.from(new Set(clinicalReasoningHistoryBank.map((item) => item.category))),
    [],
  );

  const filteredHistory = useMemo(() => {
    if (selectedCategory === "all") return clinicalReasoningHistoryBank;
    return clinicalReasoningHistoryBank.filter((item) => item.category === selectedCategory);
  }, [selectedCategory]);

  const diagnosisSuggestions = useMemo(() => {
    const query = normalize(diagnosisInput);
    if (!query) return searchBank.slice(0, 12);

    return searchBank
      .filter((item) => {
        const haystack = [item.id, item.name, ...item.synonyms].map(normalize);
        return haystack.some((value) => value.includes(query));
      })
      .slice(0, 12);
  }, [diagnosisInput]);

  useEffect(() => {
    try {
      const raw = window.localStorage.getItem(storageKey);
      if (raw) {
        const saved = JSON.parse(raw) as {
          activeStage?: Stage;
          activeHistoryId?: string | null;
          activePhysicalId?: string | null;
          activeInvestigationId?: string | null;
          historySequence?: string[];
          physicalSequence?: string[];
          investigationSequence?: string[];
          selectedCategory?: string;
          viewedHistory?: string[];
          viewedPhysical?: string[];
          viewedInvestigation?: string[];
          diagnosisInput?: string;
          diagnosisSubmitted?: boolean;
          diagnosisCorrect?: boolean;
        };

        const savedHistory = saved.historySequence ?? saved.viewedHistory ?? [];
        const savedPhysical = saved.physicalSequence ?? saved.viewedPhysical ?? [];
        const savedInvestigation = saved.investigationSequence ?? saved.viewedInvestigation ?? [];

        setHistorySequence(savedHistory.slice(0, 3));
        setPhysicalSequence(savedPhysical.slice(0, 2));
        setInvestigationSequence(savedInvestigation.slice(0, MAX_INVESTIGATIONS));
        setSelectedCategory(saved.selectedCategory ?? "all");
        setActiveHistoryId(saved.activeHistoryId ?? savedHistory.at(-1) ?? null);
        setActivePhysicalId(saved.activePhysicalId ?? savedPhysical.at(-1) ?? null);
        setActiveInvestigationId(saved.activeInvestigationId ?? savedInvestigation.at(-1) ?? null);
        setDiagnosisInput(saved.diagnosisInput ?? "");
        setDiagnosisSubmitted(Boolean(saved.diagnosisSubmitted));
        setDiagnosisCorrect(Boolean(saved.diagnosisCorrect));

        const inferredStage: Stage =
          saved.activeStage === "diagnosis" && savedInvestigation.length >= MAX_INVESTIGATIONS
            ? "diagnosis"
            : savedInvestigation.length >= MAX_INVESTIGATIONS
              ? "diagnosis"
              : savedPhysical.length >= MAX_PHYSICAL_EXAMS
                ? "investigation"
                : savedHistory.length >= MAX_HISTORY_QUESTIONS
                  ? "physical-exam"
                  : "history";
        setActiveStage(inferredStage);
      }
    } catch {
      window.localStorage.removeItem(storageKey);
    } finally {
      setHydrated(true);
    }
  }, [storageKey]);

  useEffect(() => {
    if (!hydrated) return;
    window.localStorage.setItem(
      storageKey,
      JSON.stringify({
        activeStage,
        activeHistoryId,
        activePhysicalId,
        activeInvestigationId,
        historySequence,
        physicalSequence,
        investigationSequence,
        selectedCategory,
        diagnosisInput,
        diagnosisSubmitted,
        diagnosisCorrect,
      }),
    );
  }, [
    storageKey,
    hydrated,
    activeStage,
    activeHistoryId,
    activePhysicalId,
    activeInvestigationId,
    historySequence,
    physicalSequence,
    investigationSequence,
    selectedCategory,
    diagnosisInput,
    diagnosisSubmitted,
    diagnosisCorrect,
  ]);

  const activeHistory = useMemo(
    () => clinicalReasoningHistoryBank.find((item) => item.id === activeHistoryId) ?? null,
    [activeHistoryId],
  );

  const activePhysical = useMemo(
    () => clinicalReasoningPhysicalExamBank.find((item) => item.id === activePhysicalId) ?? null,
    [activePhysicalId],
  );

  const activeInvestigation = useMemo(
    () => clinicalReasoningInvestigationBank.find((item) => item.id === activeInvestigationId) ?? null,
    [activeInvestigationId],
  );

  const historyAnswer = activeHistory ? caseData.historyAnswers[activeHistory.id] ?? "اطلاعاتی برای این سؤال ثبت نشده است." : "";
  const physicalAnswer = activePhysical ? caseData.physicalExamAnswers[activePhysical.id] ?? "اطلاعاتی برای این یافته ثبت نشده است." : "";
  const investigationAnswer = activeInvestigation ? caseData.investigationResults[activeInvestigation.id] ?? "نتیجه‌ای برای این بررسی ثبت نشده است." : "";

  function canOpenStage(stage: Stage) {
    if (stage === "history") return true;
    if (stage === "physical-exam") return historySequence.length >= 3;
    if (stage === "investigation") return physicalSequence.length >= 2;
    return investigationSequence.length >= MAX_INVESTIGATIONS;
  }

  function openStage(stage: Stage) {
    if (!canOpenStage(stage)) return;
    setActiveStage(stage);
  }

  function selectHistory(id: string) {
    setActiveHistoryId(id);
    if (historySequence.includes(id)) return;

    setHistorySequence((current) => [...current, id].slice(0, 3));
    if (historySequence.length + 1 >= 3) {
      window.setTimeout(() => setActiveStage("physical-exam"), 450);
    }
  }

  function selectPhysical(id: string) {
    setActivePhysicalId(id);
    if (physicalSequence.includes(id)) return;

    setPhysicalSequence((current) => [...current, id].slice(0, 2));
    if (physicalSequence.length + 1 >= 2) {
      window.setTimeout(() => setActiveStage("investigation"), 450);
    }
  }

  function selectInvestigation(id: string) {
    if (activeStage !== "investigation") return;
    if (investigationSequence.includes(id) || investigationSequence.length >= MAX_INVESTIGATIONS) return;

    setActiveInvestigationId(id);
    setInvestigationSequence((current) => [...current, id].slice(0, MAX_INVESTIGATIONS));

    if (investigationSequence.length + 1 >= MAX_INVESTIGATIONS) {
      window.setTimeout(() => setActiveStage("diagnosis"), 220);
    }
  }

  function submitDiagnosis() {
    const correct = answerMatches(diagnosisInput, caseData.diagnosis);
    setDiagnosisSubmitted(true);
    setDiagnosisCorrect(correct);
  }

  const conversation = [
    ...historySequence.map((id) => {
      const item = clinicalReasoningHistoryBank.find((entry) => entry.id === id)!;
      return {
        key: `history-${id}`,
        stage: "شرح حال",
        category: item.category,
        question: item.text,
        answer: caseData.historyAnswers[id] ?? "اطلاعاتی برای این سؤال ثبت نشده است.",
      };
    }),
    ...physicalSequence.map((id) => {
      const item = clinicalReasoningPhysicalExamBank.find((entry) => entry.id === id)!;
      return {
        key: `physical-${id}`,
        stage: "معاینه",
        category: item.category,
        question: item.text,
        answer: caseData.physicalExamAnswers[id] ?? "اطلاعاتی برای این یافته ثبت نشده است.",
      };
    }),
    ...investigationSequence.map((id) => {
      const item = clinicalReasoningInvestigationBank.find((entry) => entry.id === id)!;
      return {
        key: `investigation-${id}`,
        stage: "بررسی‌ها",
        category: item.category,
        question: item.text,
        answer: caseData.investigationResults[id] ?? "نتیجه‌ای برای این بررسی ثبت نشده است.",
      };
    }),
  ];

  return (
    <div className="mt-6">
      <section className="rounded-[24px] border border-[#e7e3dc] bg-white p-5 shadow-[0_8px_24px_rgba(15,23,42,0.04)] lg:p-7">
        <div className="flex flex-col gap-5 lg:flex-row lg:items-start lg:justify-between">
          <div className="min-w-0">
            <p className="text-[11px] font-semibold tracking-[0.14em] text-slate-400">شکایت اصلی</p>
            <h1 className="mt-2 max-w-[820px] text-[28px] font-semibold leading-10 text-slate-950">{caseData.presentation}</h1>
            <div className="mt-3 text-[14px] font-semibold text-slate-500">
              {caseData.patient.age} ساله · {caseData.patient.sex === "male" ? "مرد" : "زن"}
            </div>
          </div>
        </div>

        <div className="mt-7 grid grid-cols-4 overflow-hidden rounded-2xl border border-slate-200">
          {stages.map((stage, index) => {
            const unlocked = canOpenStage(stage.id);
            const active = activeStage === stage.id;
            return (
              <button
                type="button"
                key={stage.id}
                onClick={() => openStage(stage.id)}
                disabled={!unlocked}
                className={`relative px-3 py-3.5 text-sm font-bold transition ${
                  active ? "bg-slate-950 text-white" : unlocked ? "bg-white text-slate-600 hover:bg-slate-50" : "bg-slate-50 text-slate-300"
                } ${index !== stages.length - 1 ? "border-l border-slate-200" : ""}`}
              >
                {stage.label}
              </button>
            );
          })}
        </div>
      </section>

      {activeStage === "history" && (
        <StageShell
          eyebrow="History"
          title="شرح حال"
          description="سه سؤال را از میان سؤال‌های زیر انتخاب کن؛ بعد از سؤال سوم، معاینه به‌صورت خودکار باز می‌شود."
          count={`${historySequence.length}/3`}
          questions={filteredHistory}
          selectedIds={viewedHistory}
          activeId={activeHistoryId}
          onSelect={selectHistory}
          conversation={conversation}
          completeText="بعد از سؤال سوم، وارد معاینه می‌شوی."
          categoryFilter={historyCategories.map((category) => ({ id: category, label: category }))}
          selectedCategory={selectedCategory}
          onSelectCategory={setSelectedCategory}
        />
      )}

      {activeStage === "physical-exam" && (
        <StageShell
          eyebrow="Physical Examination"
          title="معاینه فیزیکی"
          description="دو مورد را بررسی کن؛ بعد از مورد دوم، بررسی‌های تشخیصی به‌صورت خودکار باز می‌شوند."
          count={`${physicalSequence.length}/2`}
          questions={clinicalReasoningPhysicalExamBank}
          selectedIds={viewedPhysical}
          activeId={activePhysicalId}
          onSelect={selectPhysical}
          conversation={conversation}
          completeText="بعد از معاینه دوم، وارد بررسی‌ها می‌شوی."
        />
      )}

      {activeStage === "investigation" && (
        <section className="mt-5 rounded-2xl border border-slate-200 bg-white p-5 shadow-[0_8px_28px_rgba(15,23,42,0.035)] lg:p-7">
          <SectionIntro
            eyebrow="Investigation"
            title="بررسی‌ها"
            description="هر بررسی‌ای را که برای محدود کردن تشخیص لازم می‌دانی انتخاب کن. سؤال‌ها و نتایج قبلی همچنان سمت راست باقی می‌مانند."
            count={`${investigationSequence.length}/${MAX_INVESTIGATIONS}`}
          />
          <div className="mt-5 grid gap-4 lg:grid-cols-[0.95fr_1.05fr]">
            <div className="max-h-[640px] overflow-auto rounded-xl border border-slate-200 p-2">
              {clinicalReasoningInvestigationBank.map((item, index) => {
                const selected = viewedInvestigation.has(item.id);
                return (
                  <button
                    type="button"
                    key={item.id}
                    onClick={() => selectInvestigation(item.id)}
                    className={`mb-1 flex w-full items-start gap-3 rounded-lg px-3 py-3 text-right last:mb-0 ${
                      activeInvestigationId === item.id ? "bg-blue-50 text-blue-800" : selected ? "bg-slate-50" : "hover:bg-slate-50"
                    }`}
                  >
                    <span className={`flex h-7 w-7 shrink-0 items-center justify-center rounded-full text-[11px] font-extrabold ${
                      selected ? "bg-emerald-50 text-emerald-600" : "bg-slate-100 text-slate-500"
                    }`}>
                      {selected ? "✓" : index + 1}
                    </span>
                    <span>
                      <span className="block text-[11px] font-semibold text-slate-400">{item.category}</span>
                      <span className="mt-0.5 block text-sm font-semibold leading-6">{item.text}</span>
                    </span>
                  </button>
                );
              })}
            </div>
            <ConversationPanel conversation={conversation} emptyText="از فهرست یک بررسی را انتخاب کن تا نتیجه به روند کیس اضافه شود." />
          </div>
          <div className="mt-6 rounded-xl bg-slate-50 px-4 py-3 text-xs font-semibold leading-6 text-slate-500">
            بعد از بررسی دوم، به‌صورت خودکار وارد مرحله تشخیص می‌شوی.
          </div>
        </section>
      )}

      {activeStage === "diagnosis" && (
        <section className="mt-5 rounded-2xl border border-slate-200 bg-white p-5 shadow-[0_8px_28px_rgba(15,23,42,0.035)] lg:p-7">
          <SectionIntro
            eyebrow="Diagnosis"
            title="تشخیص نهایی"
            description="بر اساس سرنخ‌هایی که جمع کردی، تشخیص خودت را ثبت کن."
          />

          <div className="mt-6 grid gap-4 lg:grid-cols-[0.95fr_1.05fr]">
            <div className="order-2 rounded-xl border border-slate-200 bg-slate-50/40 p-4 lg:order-2 lg:p-5">
              <div className="mb-4 flex items-center justify-between gap-3">
                <div>
                  <div className="text-[11px] font-bold uppercase tracking-[0.14em] text-slate-400">Case Findings</div>
                  <div className="mt-1 text-sm font-extrabold text-slate-900">یافته‌های جمع‌آوری‌شده</div>
                </div>
                <div className="text-xs font-bold text-slate-400">{conversation.length} مورد</div>
              </div>
              <ConversationPanel
                conversation={conversation}
                emptyText="هنوز سرنخی جمع نشده است."
              />
            </div>

            <div className="order-1 rounded-xl border border-slate-200 bg-white p-4 lg:order-1 lg:p-5">
              <div className="text-[11px] font-bold uppercase tracking-[0.14em] text-slate-400">Your Diagnosis</div>
              <h3 className="mt-1 text-lg font-extrabold text-slate-950">تشخیص خودت را ثبت کن</h3>
              <p className="mt-1 text-sm leading-6 text-slate-400">سرنخ‌های سمت چپ را مرور کن و تشخیص نهایی را وارد کن.</p>

              <div className="mt-6">
                <DiagnosisSearch
                  disease={diagnosisInput}
                  setDisease={(value) => {
                    setDiagnosisInput(value);
                    setDiagnosisSubmitted(false);
                  }}
                  disabled={diagnosisSubmitted && diagnosisCorrect}
                  suggestions={diagnosisSuggestions}
                  showSuggestions={showDiagnosisSuggestions}
                  setShowSuggestions={setShowDiagnosisSuggestions}
                />
                <button
                  type="button"
                  onClick={submitDiagnosis}
                  disabled={!diagnosisInput.trim()}
                  className="mt-3 w-full rounded-xl bg-slate-950 px-4 py-3.5 text-sm font-bold text-white transition hover:bg-slate-800 disabled:cursor-not-allowed disabled:opacity-35"
                >
                  ثبت تشخیص
                </button>

                {diagnosisSubmitted && diagnosisCorrect && (
                  <div className="mt-4 rounded-xl border border-emerald-200 bg-emerald-50 p-4 text-sm font-semibold leading-7 text-emerald-800">
                    تشخیص صحیح است. کیس با موفقیت تکمیل شد.
                  </div>
                )}

                {diagnosisSubmitted && !diagnosisCorrect && (
                  <div className="mt-4 rounded-xl border border-amber-200 bg-amber-50 p-4 text-sm font-semibold leading-7 text-amber-800">
                    تشخیص ثبت‌شده با پاسخ نهایی این کیس مطابقت ندارد. سرنخ‌ها را دوباره مرور کن.
                  </div>
                )}
              </div>
            </div>
          </div>
        </section>
      )}
    </div>
  );
}

function StageShell({
  eyebrow,
  title,
  description,
  count,
  questions,
  selectedIds,
  activeId,
  onSelect,
  conversation,
  completeText,
  categoryFilter,
  selectedCategory,
  onSelectCategory,
}: {
  eyebrow: string;
  title: string;
  description: string;
  count: string;
  questions: Array<{ id: string; category: string; text: string }>;
  selectedIds: Set<string>;
  activeId: string | null;
  onSelect: (id: string) => void;
  conversation: ConversationItem[];
  completeText: string;
  categoryFilter?: Array<{ id: string; label: string }>;
  selectedCategory?: string;
  onSelectCategory?: (value: string) => void;
}) {
  return (
    <section className="mt-5 rounded-2xl border border-slate-200 bg-white p-5 shadow-[0_8px_28px_rgba(15,23,42,0.035)] lg:p-7">
      <SectionIntro eyebrow={eyebrow} title={title} description={description} count={count} />

      {categoryFilter && selectedCategory && onSelectCategory ? (
        <div className="mt-5 flex gap-2 overflow-x-auto pb-1">
          <button
            type="button"
            onClick={() => onSelectCategory("all")}
            className={`shrink-0 rounded-full border px-3 py-1.5 text-xs font-bold ${selectedCategory === "all" ? "border-slate-950 bg-slate-950 text-white" : "border-slate-200 text-slate-500 hover:bg-slate-50"}`}
          >
            همه
          </button>
          {categoryFilter.map((category) => (
            <button
              type="button"
              key={category.id}
              onClick={() => onSelectCategory(category.id)}
              className={`shrink-0 rounded-full border px-3 py-1.5 text-xs font-bold ${selectedCategory === category.id ? "border-slate-950 bg-slate-950 text-white" : "border-slate-200 text-slate-500 hover:bg-slate-50"}`}
            >
              {category.label}
            </button>
          ))}
        </div>
      ) : null}

      <div className="mt-5 grid gap-4 lg:grid-cols-[0.95fr_1.05fr]">
        <div className="max-h-[640px] overflow-auto rounded-xl border border-slate-200 p-2">
          {questions.map((item, index) => {
            const selected = selectedIds.has(item.id);
            return (
              <button
                type="button"
                key={item.id}
                onClick={() => onSelect(item.id)}
                className={`mb-1 flex w-full items-start gap-3 rounded-lg px-3 py-3 text-right last:mb-0 ${
                  activeId === item.id ? "bg-blue-50 text-blue-800" : selected ? "bg-slate-50" : "hover:bg-slate-50"
                }`}
              >
                <span className={`flex h-7 w-7 shrink-0 items-center justify-center rounded-full text-[11px] font-extrabold ${
                  selected ? "bg-emerald-50 text-emerald-600" : "bg-slate-100 text-slate-500"
                }`}>
                  {selected ? "✓" : index + 1}
                </span>
                <span>
                  <span className="block text-[11px] font-semibold text-slate-400">{item.category}</span>
                  <span className="mt-0.5 block text-sm font-semibold leading-6">{item.text}</span>
                </span>
              </button>
            );
          })}
        </div>
        <ConversationPanel conversation={conversation} emptyText="سؤال موردنظر را از سمت چپ انتخاب کن تا سؤال و پاسخ بیمار اینجا اضافه شود." />
      </div>
      <div className="mt-4 rounded-xl bg-slate-50 px-4 py-3 text-xs font-semibold leading-6 text-slate-500">
        {completeText}
      </div>
    </section>
  );
}

type ConversationItem = {
  key: string;
  stage: string;
  category: string;
  question: string;
  answer: string;
};

function ConversationPanel({ conversation, emptyText }: { conversation: ConversationItem[]; emptyText: string }) {
  const scrollRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const element = scrollRef.current;
    if (!element) return;

    // Keep the newest question/answer anchored at the bottom.
    // Older questions remain available by scrolling upward.
    element.scrollTop = element.scrollHeight;
  }, [conversation.length]);

  return (
    <div ref={scrollRef} className="max-h-[640px] overflow-auto rounded-xl border border-slate-200 bg-white p-3">
      {conversation.length === 0 ? (
        <div className="flex min-h-[300px] items-center justify-center rounded-lg bg-slate-50 px-6 text-center text-sm leading-7 text-slate-400">
          {emptyText}
        </div>
      ) : (
        <div className="space-y-3">
          {conversation.map((item) => (
            <article key={item.key} className="rounded-xl border border-slate-200 bg-white p-4">
              <div className="flex items-center justify-between gap-3">
                <div className="text-[11px] font-bold text-slate-400">{item.stage}</div>
                <div className="text-[10px] font-semibold text-slate-300">{item.category}</div>
              </div>
              <div className="mt-2 text-sm font-extrabold leading-7 text-slate-900">{item.question}</div>
              <div className="mt-3 rounded-lg bg-slate-50 px-3.5 py-3">
                <div className="text-[10px] font-bold text-slate-400">پاسخ بیمار</div>
                <p className="mt-1 whitespace-pre-line text-sm leading-7 text-slate-700">{item.answer}</p>
              </div>
            </article>
          ))}
        </div>
      )}
    </div>
  );
}
