"use client";

import { useEffect, useMemo, useRef, useState } from "react";

import type { Case, CaseHint, Investigation } from "../types/case";
import { getCourseBank, getMasterCaseBank } from "../data/courseBanks";
import { diseases } from "../data/diseases";
import { isCorrectDiagnosis } from "../lib/caseEngine";
import { searchBank } from "../data/searchBank";
import type { Diagnosis } from "../data/searchBank";
import DiagnosisSearch from "./DiagnosisSearch";
import { getSavedPracticeSequence } from "../lib/practiceSequence";
import CaseCompletionModal from "./CaseCompletionModal";

type Stage = "history" | "physical-exam" | "investigation" | "diagnosis";

const MAX_HISTORY_QUESTIONS = 7;
const MAX_PHYSICAL_EXAMS = 2;
const MAX_INVESTIGATIONS = 2;
const MAX_GUESSES = 4;

type Props = {
  caseData: Case;
  storageKey?: string;
  onComplete?: (result: { won: boolean; guessCount: number }) => void;
  completionHref?: string;
  nextCaseOptions?: PracticeCaseOption[];
  practiceSelection?: PracticeSelection;
  showCompletionModal?: boolean;
};

type PracticeCaseOption = {
  id: string;
  difficulty: Case["difficulty"];
  tags: string[];
};

type PracticeSelection = {
  mode: "unattempted" | "mistakes" | "start-over";
  difficulty: Case["difficulty"] | "all";
  tags: string[];
};

type AnsweredItem = {
  id: string;
  sourceId: string;
  question: string;
  answer: string;
  type: Exclude<Stage, "diagnosis">;
  category?: string;
};

type HistoryItem = {
  id: string;
  category: string;
  text: string;
  answer: string;
};

type PhysicalItem = {
  id: string;
  category: string;
  text: string;
  answer: string;
};

type InvestigationItem = {
  id: string;
  category: string;
  text: string;
  answer: string;
};

type ConversationItem = {
  key: string;
  stage: string;
  category?: string;
  question: string;
  answer: string;
};

function stageLabel(stage: Stage) {
  if (stage === "history") return "شرح حال";
  if (stage === "physical-exam") return "معاینه";
  if (stage === "investigation") return "بررسی‌ها";
  return "تشخیص";
}

function normalizeDiagnosis(value: string) {
  return value.trim().toLowerCase().replace(/\s+/g, " ");
}

function markLastPracticeActivity(
  caseData: Case,
  totalCases: number | undefined,
) {
  if (typeof window === "undefined") return;

  window.localStorage.setItem(
    "sonic:last-practice-course",
    JSON.stringify({
      course: caseData.course,
      caseId: caseData.id,
      title: caseData.title,
      difficulty: caseData.difficulty,
      totalCases: totalCases ?? 0,
      updatedAt: Date.now(),
    }),
  );

  window.dispatchEvent(new Event("sonic:last-practice-updated"));
}

function selectNextPracticeCase(
  course: Case["course"],
  currentCaseId: string,
  options: PracticeCaseOption[] | undefined,
  selection: PracticeSelection | undefined,
) {
  if (!options?.length) return undefined;

  const mode = selection?.mode ?? "start-over";
  const difficulty = selection?.difficulty ?? "all";
  const tags = selection?.tags ?? [];

  const base = options.filter((candidate) => {
    if (candidate.id === currentCaseId) return false;
    if (difficulty !== "all" && candidate.difficulty !== difficulty) return false;
    if (tags.length > 0 && !tags.some((tag) => candidate.tags.includes(tag))) return false;
    return true;
  });

  if (mode === "start-over" && typeof window !== "undefined") {
    const sequence = getSavedPracticeSequence(course);
    if (sequence?.ids?.length && sequence.difficulty === difficulty) {
      const ordered = sequence.ids
        .map((id) => base.find((candidate) => candidate.id === id))
        .filter((candidate): candidate is PracticeCaseOption => Boolean(candidate));

      for (const candidate of ordered) {
        const raw = window.localStorage.getItem(`sonic:practice:${course}:${candidate.id}`);
        if (!raw) return candidate;
        try {
          const state = JSON.parse(raw) as { completed?: boolean };
          if (!state.completed) return candidate;
        } catch {
          return candidate;
        }
      }
    }
  }

  const candidates = base.filter((candidate) => {
    if (typeof window === "undefined" || mode === "start-over") return true;

    const raw = window.localStorage.getItem(`sonic:practice:${course}:${candidate.id}`);
    const state = raw ? (() => {
      try {
        return JSON.parse(raw) as { completed?: boolean; won?: boolean | null };
      } catch {
        return null;
      }
    })() : null;

    if (mode === "unattempted") return state === null;
    if (mode === "mistakes") return state?.completed === true && state.won === false;
    return true;
  });

  if (!candidates.length) return undefined;
  return candidates[Math.floor(Math.random() * candidates.length)];
}

function Icon({ name, size = 20 }: { name: "arrow" | "check" | "chevron" | "search"; size?: number }) {
  const common = {
    width: size,
    height: size,
    viewBox: "0 0 24 24",
    fill: "none",
    stroke: "currentColor",
    strokeWidth: 1.8,
    strokeLinecap: "round" as const,
    strokeLinejoin: "round" as const,
  };

  if (name === "arrow") {
    return <svg {...common}><path d="M5 12h14" /><path d="m13 6 6 6-6 6" /></svg>;
  }

  if (name === "check") {
    return <svg {...common}><path d="m5 12 4 4L19 6" /></svg>;
  }

  if (name === "chevron") {
    return <svg {...common}><path d="m7 10 5 5 5-5" /></svg>;
  }

  return <svg {...common}><circle cx="11" cy="11" r="6.5" /><path d="m16 16 4 4" /></svg>;
}

export default function CasePlayer({
  caseData,
  storageKey,
  onComplete,
  completionHref,
  nextCaseOptions,
  practiceSelection,
  showCompletionModal = true,
}: Props) {
  const courseBank = getCourseBank(caseData.course, [caseData]);
  const physicalStage = caseData.stages.find((stage) => stage.type === "physical-exam");
  const investigationStage = caseData.stages.find((stage) => stage.type === "investigation");

  const [activeStage, setActiveStage] = useState<Stage>("history");
  const [historySequence, setHistorySequence] = useState<string[]>([]);
  const [physicalSequence, setPhysicalSequence] = useState<string[]>([]);
  const [historySkipped, setHistorySkipped] = useState(false);
  const [physicalSkipped, setPhysicalSkipped] = useState(false);
  const [investigationSequence, setInvestigationSequence] = useState<string[]>([]);
  const [activeHistoryId, setActiveHistoryId] = useState<string | null>(null);
  const [activePhysicalId, setActivePhysicalId] = useState<string | null>(null);
  const [activeInvestigationId, setActiveInvestigationId] = useState<string | null>(null);
  const [selectedCategory, setSelectedCategory] = useState<string>("all");
  const [diagnosisInput, setDiagnosisInput] = useState("");
  const [showDiagnosisSuggestions, setShowDiagnosisSuggestions] = useState(false);
  const [guessCount, setGuessCount] = useState(0);
  const [guessFeedback, setGuessFeedback] = useState<string | null>(null);
  const [completed, setCompleted] = useState(false);
  const [won, setWon] = useState<boolean | null>(null);
  const [hydrated, setHydrated] = useState(!storageKey);

  const historyItems = useMemo<HistoryItem[]>(() => {
    return courseBank.history.map((item) => ({
      id: item.id,
      category: courseBank.historyCategories.find((category) => category.id === item.category)?.label ?? item.category,
      text: item.text,
      answer: item.answersByCase[caseData.id] ?? "برای این سؤال اطلاعاتی ثبت نشده است.",
    }));
  }, [caseData.id, courseBank.history, courseBank.historyCategories]);

  const physicalItems = useMemo<PhysicalItem[]>(() => {
    const hints: CaseHint[] = physicalStage?.type === "physical-exam" ? physicalStage.hints : [];
    return hints.map((hint) => {
      const bankItem = courseBank.physicalExam.find(
        (item) => item.id === hint.sourceId || item.id === hint.id || item.title.trim() === (hint.label ?? "").trim(),
      );
      return {
        id: bankItem?.id ?? hint.sourceId ?? hint.id,
        category: bankItem?.category ?? "معاینه",
        text: bankItem?.title ?? hint.label ?? "یافته معاینه",
        answer: hint.content,
      };
    });
  }, [courseBank.physicalExam, physicalStage]);

  const investigationItems = useMemo<InvestigationItem[]>(() => {
    const investigations: Investigation[] = investigationStage?.type === "investigation" ? investigationStage.investigations : [];
    return investigations.map((test) => {
      const bankItem = courseBank.investigations.find(
        (item) => item.id === test.sourceId || item.id === test.id || item.title.trim() === test.name.trim(),
      );
      return {
        id: test.id,
        category: bankItem?.category ?? test.category,
        text: bankItem?.title ?? test.name,
        answer: test.findings.map((finding) => `${finding.label}: ${finding.value}`).join("\n"),
      };
    });
  }, [courseBank.investigations, investigationStage]);

  const historySelected = useMemo(() => new Set(historySequence), [historySequence]);
  const physicalSelected = useMemo(() => new Set(physicalSequence), [physicalSequence]);
  const investigationSelected = useMemo(() => new Set(investigationSequence), [investigationSequence]);

  const courseDiagnosisSuggestions = useMemo(() => {
    const courseCases = getMasterCaseBank([caseData]).filter((item) => item.course === caseData.course);
    const courseDiagnosisIds = new Set<string>();

    for (const item of courseCases) {
      courseDiagnosisIds.add(item.diagnosis.id);
      for (const candidateId of item.candidateDiagnosisIds ?? []) {
        courseDiagnosisIds.add(candidateId);
      }
    }

    return searchBank.filter((item: Diagnosis) => courseDiagnosisIds.has(item.id));
  }, [caseData]);

  const diagnosisSuggestions = useMemo(() => {
    const query = normalizeDiagnosis(diagnosisInput);
    if (!query) return courseDiagnosisSuggestions.slice(0, 12);

    return courseDiagnosisSuggestions
      .filter((item: Diagnosis) => {
        const haystack = [item.id, item.name, ...item.synonyms].map(normalizeDiagnosis);
        return haystack.some((value) => value.includes(query));
      })
      .slice(0, 12);
  }, [diagnosisInput, courseDiagnosisSuggestions]);

  const filteredHistory = useMemo(() => {
    if (selectedCategory === "all") return historyItems;
    return historyItems.filter((item) => courseBank.history.find((bankItem) => bankItem.id === item.id)?.category === selectedCategory);
  }, [courseBank.history, historyItems, selectedCategory]);

  const conversation = useMemo<ConversationItem[]>(() => {
    const items: ConversationItem[] = [];

    for (const id of historySequence) {
      const item = historyItems.find((entry) => entry.id === id);
      if (!item) continue;
      items.push({
        key: `history-${id}`,
        stage: "شرح حال",
        category: item.category,
        question: item.text,
        answer: item.answer,
      });
    }

    for (const id of physicalSequence) {
      const item = physicalItems.find((entry) => entry.id === id);
      if (!item) continue;
      items.push({
        key: `physical-${id}`,
        stage: "معاینه",
        category: item.category,
        question: item.text,
        answer: item.answer,
      });
    }

    for (const id of investigationSequence) {
      const item = investigationItems.find((entry) => entry.id === id);
      if (!item) continue;
      items.push({
        key: `investigation-${id}`,
        stage: "بررسی",
        category: item.category,
        question: item.text,
        answer: item.answer,
      });
    }

    return items;
  }, [historyItems, historySequence, investigationItems, physicalItems, physicalSequence, investigationSequence]);

  useEffect(() => {
    if (!storageKey || typeof window === "undefined") {
      setHydrated(true);
      return;
    }

    try {
      const raw = window.localStorage.getItem(storageKey);
      if (raw) {
        const saved = JSON.parse(raw) as {
          answered?: AnsweredItem[];
          activeStage?: Stage;
          historySkipped?: boolean;
          physicalSkipped?: boolean;
          historySequence?: string[];
          physicalSequence?: string[];
          investigationSequence?: string[];
          activeHistoryId?: string | null;
          activePhysicalId?: string | null;
          activeInvestigationId?: string | null;
          selectedCategory?: string;
          diagnosisInput?: string;
          guessCount?: number;
          completed?: boolean;
          won?: boolean | null;
        };

        const legacyHistory = saved.historySequence ?? saved.answered?.filter((item) => item.type === "history").map((item) => item.sourceId).slice(0, MAX_HISTORY_QUESTIONS) ?? [];
        const legacyPhysical = saved.physicalSequence ?? saved.answered?.filter((item) => item.type === "physical-exam").map((item) => item.sourceId).slice(0, MAX_PHYSICAL_EXAMS) ?? [];
        const legacyInvestigation = saved.investigationSequence ?? saved.answered?.filter((item) => item.type === "investigation").map((item) => item.sourceId) ?? [];

        const legacyActiveStage = saved.activeStage;
        const isDownstreamStage = legacyActiveStage === "physical-exam" || legacyActiveStage === "investigation" || legacyActiveStage === "diagnosis";
        // Older sessions used a three-question history limit. Preserve their current stage
        // by treating the unasked history questions as skipped when restoring such a session.
        const restoredHistorySkipped = saved.historySkipped ?? (isDownstreamStage && legacyHistory.length < MAX_HISTORY_QUESTIONS);
        const isAfterPhysicalStage = legacyActiveStage === "investigation" || legacyActiveStage === "diagnosis";
        const restoredPhysicalSkipped = saved.physicalSkipped ?? (isAfterPhysicalStage && legacyPhysical.length < MAX_PHYSICAL_EXAMS);

        setHistorySequence(legacyHistory.slice(0, MAX_HISTORY_QUESTIONS));
        setPhysicalSequence(legacyPhysical.slice(0, MAX_PHYSICAL_EXAMS));
        setInvestigationSequence(legacyInvestigation.slice(0, MAX_INVESTIGATIONS));
        setHistorySkipped(Boolean(restoredHistorySkipped));
        setPhysicalSkipped(Boolean(restoredPhysicalSkipped));
        setActiveHistoryId(saved.activeHistoryId ?? legacyHistory[legacyHistory.length - 1] ?? null);
        setActivePhysicalId(saved.activePhysicalId ?? legacyPhysical[legacyPhysical.length - 1] ?? null);
        setActiveInvestigationId(saved.activeInvestigationId ?? legacyInvestigation[legacyInvestigation.length - 1] ?? null);
        setSelectedCategory(saved.selectedCategory ?? "all");
        setDiagnosisInput(saved.diagnosisInput ?? "");
        setGuessCount(saved.guessCount ?? 0);
        setCompleted(Boolean(saved.completed));
        setWon(saved.won ?? null);

        const historyGateOpen = legacyHistory.length >= MAX_HISTORY_QUESTIONS || Boolean(restoredHistorySkipped);
        const physicalGateOpen = legacyPhysical.length >= MAX_PHYSICAL_EXAMS || Boolean(restoredPhysicalSkipped);
        const investigationGateOpen = legacyInvestigation.length >= MAX_INVESTIGATIONS;
        const savedStageAllowed = legacyActiveStage === "history"
          || (legacyActiveStage === "physical-exam" && historyGateOpen)
          || (legacyActiveStage === "investigation" && historyGateOpen && physicalGateOpen)
          || (legacyActiveStage === "diagnosis" && investigationGateOpen);

        const inferred: Stage = savedStageAllowed && legacyActiveStage
          ? legacyActiveStage
          : investigationGateOpen
            ? "diagnosis"
            : physicalGateOpen && historyGateOpen
              ? "investigation"
              : historyGateOpen
                ? "physical-exam"
                : "history";
        setActiveStage(inferred);
      }
    } catch {
      window.localStorage.removeItem(storageKey);
    } finally {
      setHydrated(true);
    }
  }, [storageKey]);

  useEffect(() => {
    if (!storageKey || !hydrated || typeof window === "undefined") return;

    window.localStorage.setItem(storageKey, JSON.stringify({
      activeStage,
      historySkipped,
      physicalSkipped,
      historySequence,
      physicalSequence,
      investigationSequence,
      activeHistoryId,
      activePhysicalId,
      activeInvestigationId,
      selectedCategory,
      diagnosisInput,
      guessCount,
      completed,
      won,
    }));

    window.dispatchEvent(new Event("sonic:practice-progress-updated"));
  }, [activeHistoryId, activeInvestigationId, activePhysicalId, activeStage, completed, diagnosisInput, guessCount, historySequence, historySkipped, hydrated, investigationSequence, physicalSequence, physicalSkipped, selectedCategory, storageKey, won]);

  const historyComplete = historySequence.length >= MAX_HISTORY_QUESTIONS;
  const physicalComplete = physicalSequence.length >= MAX_PHYSICAL_EXAMS;
  const investigationComplete = investigationSequence.length >= MAX_INVESTIGATIONS;
  const historyGateOpen = historyComplete || historySkipped;
  const physicalGateOpen = physicalComplete || physicalSkipped;

  function selectHistory(id: string) {
    if (completed || activeStage !== "history") return;
    if (historySelected.has(id) || historySequence.length >= MAX_HISTORY_QUESTIONS) return;

    markLastPracticeActivity(caseData, nextCaseOptions?.length);
    setActiveHistoryId(id);
    setHistorySequence((current) => [...current, id].slice(0, MAX_HISTORY_QUESTIONS));

    if (historySequence.length + 1 >= MAX_HISTORY_QUESTIONS) {
      window.setTimeout(() => {
        setActiveStage("physical-exam");
        setActivePhysicalId(null);
      }, 220);
    }
  }

  function skipToPhysicalExam() {
    if (completed) return;
    setHistorySkipped(true);
    setPhysicalSkipped(false);
    setActivePhysicalId(null);
    setActiveStage("physical-exam");
  }

  function skipToInvestigation() {
    if (completed) return;
    setHistorySkipped(true);
    setPhysicalSkipped(true);
    setActiveInvestigationId(null);
    setActiveStage("investigation");
  }

  function selectPhysical(id: string) {
    if (completed || activeStage !== "physical-exam") return;
    if (physicalSelected.has(id) || physicalSequence.length >= MAX_PHYSICAL_EXAMS) return;

    markLastPracticeActivity(caseData, nextCaseOptions?.length);
    setActivePhysicalId(id);
    setPhysicalSequence((current) => [...current, id].slice(0, MAX_PHYSICAL_EXAMS));

    if (physicalSequence.length + 1 >= MAX_PHYSICAL_EXAMS) {
      window.setTimeout(() => {
        setActiveStage("investigation");
        setActiveInvestigationId(null);
      }, 220);
    }
  }

  function selectInvestigation(id: string) {
    if (completed || activeStage !== "investigation") return;
    if (investigationSelected.has(id) || investigationSequence.length >= MAX_INVESTIGATIONS) return;

    markLastPracticeActivity(caseData, nextCaseOptions?.length);
    setActiveInvestigationId(id);
    setInvestigationSequence((current) => [...current, id].slice(0, MAX_INVESTIGATIONS));

    if (investigationSequence.length + 1 >= MAX_INVESTIGATIONS) {
      window.setTimeout(() => setActiveStage("diagnosis"), 220);
    }
  }

  function openStage(stage: Stage) {
    if (completed) return;
    if (stage === "history") setActiveStage(stage);
    else if (stage === "physical-exam" && historyGateOpen) setActiveStage(stage);
    else if (stage === "investigation" && historyGateOpen && physicalGateOpen) setActiveStage(stage);
    else if (stage === "diagnosis" && investigationComplete) setActiveStage(stage);
  }

  function submitDiagnosis() {
    if (completed || activeStage !== "diagnosis") return;
    setGuessFeedback(null);
    const input = normalizeDiagnosis(diagnosisInput);
    if (!input) return;

    const accepted = caseData.diagnosis;
    const diagnosis = diseases.find((item) => item.name === input || item.id === input || item.synonyms.some((synonym) => synonym === input));
    const correct = diagnosis ? isCorrectDiagnosis(diagnosis.name, accepted) : normalizeDiagnosis(accepted.name) === input || accepted.synonyms.some((synonym) => normalizeDiagnosis(synonym) === input);
    const nextGuessCount = guessCount + 1;

    setGuessCount(nextGuessCount);

    if (correct) {
      setWon(true);
      setCompleted(true);
      onComplete?.({ won: true, guessCount: nextGuessCount });
    } else if (nextGuessCount >= MAX_GUESSES) {
      setWon(false);
      setCompleted(true);
      onComplete?.({ won: false, guessCount: nextGuessCount });
    } else {
      const remaining = MAX_GUESSES - nextGuessCount;
      setGuessFeedback(`تشخیص اشتباه بود. ${remaining} فرصت دیگر داری.`);
    }
  }

  function continueToNextCase() {
    if (typeof window === "undefined") return;
    const nextCase = selectNextPracticeCase(caseData.course, caseData.id, nextCaseOptions, practiceSelection);
    if (!nextCase) {
      window.location.assign(completionHref ?? `/practice/${caseData.course}`);
      return;
    }

    const params = new URLSearchParams();
    if (practiceSelection?.mode) params.set("mode", practiceSelection.mode);
    if (practiceSelection?.difficulty) params.set("difficulty", practiceSelection.difficulty);
    if (practiceSelection?.tags?.length) params.set("tags", practiceSelection.tags.join(","));
    const query = params.toString();
    window.location.assign(`/practice/${caseData.course}/${nextCase.id}${query ? `?${query}` : ""}`);
  }

  if (!hydrated) {
    return <main className="min-h-screen bg-[#f7f9fc] px-5 py-12 text-slate-900"><div className="mx-auto max-w-5xl rounded-2xl border border-slate-200 bg-white p-10 text-center text-sm text-slate-500">در حال بارگذاری کیس...</div></main>;
  }

  if (completed) {
    if (!showCompletionModal) {
      return null;
    }

    return (
      <main dir="rtl" className="min-h-screen bg-[#f7f9fc] text-slate-900">
        <div className="mx-auto flex min-h-screen w-full max-w-[880px] items-center justify-center px-5 py-10 lg:px-8">
          <CaseCompletionModal
            caseData={caseData}
            won={won === true}
            guessCount={guessCount}
            onContinue={continueToNextCase}
            onReview={() => window.location.assign(`/practice/review/${caseData.course}/${caseData.id}`)}
          />
        </div>
      </main>
    );
  }

  const stageTabs: Array<{ id: Stage; label: string; count?: string; enabled: boolean }> = [
    { id: "history", label: "شرح حال", count: `${historySequence.length}/${MAX_HISTORY_QUESTIONS}`, enabled: true },
    { id: "physical-exam", label: "معاینه", count: `${physicalSequence.length}/${MAX_PHYSICAL_EXAMS}`, enabled: historyGateOpen },
    { id: "investigation", label: "بررسی‌ها", count: `${investigationSequence.length}/${MAX_INVESTIGATIONS}`, enabled: historyGateOpen && physicalGateOpen },
    { id: "diagnosis", label: "تشخیص", enabled: investigationComplete },
  ];

  return (
    <main dir="rtl" className="min-h-screen bg-[#f7f9fc] text-slate-900">
      <div className="sonic-fixed-container py-6">
        <section className="rounded-2xl border border-slate-200 bg-white p-5 shadow-[0_8px_28px_rgba(15,23,42,0.035)] lg:p-7">
          <div className="flex flex-col gap-4 lg:flex-row lg:items-start lg:justify-between">
            <div className="min-w-0">
              <div className="text-[11px] font-semibold tracking-[0.14em] text-slate-400">شکایت اصلی</div>
              <h1 className="mt-1 max-w-[860px] text-[24px] font-extrabold leading-9 text-slate-950 lg:text-[28px]">{caseData.presentation}</h1>
              <div className="mt-3 text-[14px] font-semibold text-slate-500">
                {caseData.patient.age} ساله · {caseData.patient.sex === "male" ? "مرد" : "زن"}
              </div>
            </div>
            <div className="shrink-0 rounded-xl bg-slate-50 px-4 py-3 text-right">
              <div className="text-[11px] font-semibold text-slate-400">مرحله فعلی</div>
              <div className="mt-1 text-sm font-bold text-slate-800">{stageLabel(activeStage)}</div>
            </div>
          </div>

          <div className="mt-6 flex overflow-hidden rounded-xl border border-slate-200">
            {stageTabs.map((tab, index) => (
              <button
                key={tab.id}
                type="button"
                disabled={!tab.enabled}
                onClick={() => openStage(tab.id)}
                className={`flex flex-1 items-center justify-center gap-2 px-3 py-3 text-sm font-bold transition ${index > 0 ? "border-r border-slate-200" : ""} ${
                  activeStage === tab.id ? "bg-slate-950 text-white" : tab.enabled ? "bg-white text-slate-600 hover:bg-slate-50" : "bg-slate-50 text-slate-300"
                }`}
              >
                <span>{tab.label}</span>
                {tab.count ? <span className={activeStage === tab.id ? "text-white/60" : "text-slate-400"}>{tab.count}</span> : null}
              </button>
            ))}
          </div>
        </section>

        <div className="mt-5">
          {activeStage === "history" && (
            <StageShell
              eyebrow="History"
              title="شرح حال"
              description="حداکثر هفت سؤال از شرح حال انتخاب کن. سؤال‌ها و پاسخ‌های انتخاب‌شده بعد از هر انتخاب سمت راست باقی می‌مانند. اگر لازم نیست همه سؤال‌ها را بپرسی، می‌توانی زودتر به مرحله بعد بروی."
              count={`${historySequence.length}/${MAX_HISTORY_QUESTIONS}`}
              questions={filteredHistory}
              selectedIds={historySelected}
              activeId={activeHistoryId}
              onSelect={selectHistory}
              conversation={conversation}
              emptyText="یک سؤال را از فهرست انتخاب کن تا پاسخ بیمار به روند کیس اضافه شود."
              completeText="بعد از سؤال هفتم، معاینه به‌صورت خودکار باز می‌شود؛ یا می‌توانی هر زمان مرحله را رد کنی."
              stageActions={[
                { label: "رفتن به معاینه", onClick: skipToPhysicalExam, variant: "primary" },
                { label: "رد شرح حال و معاینه؛ رفتن به بررسی‌ها", onClick: skipToInvestigation, variant: "secondary" },
              ]}
              categoryFilter={courseBank.historyCategories.map((category) => ({ id: category.id, label: category.label }))}
              selectedCategory={selectedCategory}
              onSelectCategory={setSelectedCategory}
            />
          )}

          {activeStage === "physical-exam" && (
            <StageShell
              eyebrow="Physical Examination"
              title="معاینه فیزیکی"
              description="دو یافته را بررسی کن. یافته‌های قبلی همچنان در روند بالینی سمت راست باقی می‌مانند."
              count={`${physicalSequence.length}/2`}
              questions={physicalItems}
              selectedIds={physicalSelected}
              activeId={activePhysicalId}
              onSelect={selectPhysical}
              conversation={conversation}
              emptyText="یک یافته را انتخاب کن تا نتیجه معاینه به روند کیس اضافه شود."
              completeText="بعد از مورد دوم، وارد بررسی‌های تشخیصی می‌شوی."
            />
          )}

          {activeStage === "investigation" && (
            <StageShell
              eyebrow="Investigation"
              title="بررسی‌ها"
              description="دو بررسی را برای محدود کردن تشخیص انتخاب کن. نتیجه‌های قبلی همچنان سمت راست باقی می‌مانند."
              count={`${investigationSequence.length}/${MAX_INVESTIGATIONS}`}
              questions={investigationItems}
              selectedIds={investigationSelected}
              activeId={activeInvestigationId}
              onSelect={selectInvestigation}
              conversation={conversation}
              emptyText="یک بررسی را انتخاب کن تا نتیجه آن در روند کیس نمایش داده شود."
              completeText="بعد از بررسی دوم، به‌صورت خودکار وارد تشخیص می‌شوی."
            />
          )}

          {activeStage === "diagnosis" && (
            <section className="rounded-2xl border border-slate-200 bg-white p-5 shadow-[0_8px_28px_rgba(15,23,42,0.035)] lg:p-7">
              <div className="grid gap-5 lg:grid-cols-[0.9fr_1.1fr]">
                <div>
                  <p className="text-[11px] font-bold uppercase tracking-[0.14em] text-slate-400">Diagnosis</p>
                  <h2 className="mt-2 text-xl font-extrabold text-slate-950">تشخیص نهایی</h2>
                  <p className="mt-1 text-sm leading-6 text-slate-400">بر اساس سرنخ‌هایی که جمع کرده‌ای، تشخیص خودت را ثبت کن.</p>

                  <div className="mt-6">
                    <DiagnosisSearch
                      disease={diagnosisInput}
                      setDisease={(value) => {
                        setDiagnosisInput(value);
                        setGuessFeedback(null);
                      }}
                      disabled={completed}
                      suggestions={diagnosisSuggestions}
                      showSuggestions={showDiagnosisSuggestions}
                      setShowSuggestions={setShowDiagnosisSuggestions}
                    />
                  </div>
                  <button
                    type="button"
                    onClick={submitDiagnosis}
                    disabled={!diagnosisInput.trim()}
                    className="mt-3 w-full rounded-xl bg-slate-950 px-4 py-3.5 text-sm font-bold text-white transition hover:bg-slate-800 disabled:cursor-not-allowed disabled:opacity-30"
                  >
                    ثبت تشخیص
                  </button>
                  <p className="mt-3 text-xs font-semibold text-slate-400">تعداد تلاش: {guessCount}/{MAX_GUESSES}</p>
                  {guessFeedback && (
                    <p role="status" className="mt-2 text-sm font-semibold text-rose-600">{guessFeedback}</p>
                  )}
                </div>

                <ConversationPanel conversation={conversation} emptyText="هنوز سرنخی جمع نشده است." />
              </div>
            </section>
          )}
        </div>
      </div>
    </main>
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
  emptyText,
  completeText,
  stageActions,
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
  emptyText: string;
  completeText: string;
  stageActions?: Array<{ label: string; onClick: () => void; variant?: "primary" | "secondary" }>;
  categoryFilter?: Array<{ id: string; label: string }>;
  selectedCategory?: string;
  onSelectCategory?: (value: string) => void;
}) {
  return (
    <section className="rounded-2xl border border-slate-200 bg-white p-5 shadow-[0_8px_28px_rgba(15,23,42,0.035)] lg:p-7">
      <div className="flex flex-col gap-3 sm:flex-row sm:items-start sm:justify-between">
        <div>
          <div className="text-[11px] font-bold uppercase tracking-[0.14em] text-slate-400">{eyebrow}</div>
          <h2 className="mt-1 text-xl font-extrabold text-slate-950">{title}</h2>
          <p className="mt-1 max-w-[800px] text-sm leading-6 text-slate-400">{description}</p>
        </div>
        <div className="mt-1 shrink-0 text-[11px] font-bold leading-5 text-slate-400">{count}</div>
      </div>

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

      <div className="mt-5 grid gap-4 lg:grid-cols-[0.92fr_1.08fr]">
        <div className="max-h-[610px] overflow-auto rounded-xl border border-slate-200 p-2">
          {questions.length === 0 ? (
            <div className="flex min-h-[280px] items-center justify-center px-6 text-center text-sm leading-7 text-slate-400">برای این مرحله داده‌ای ثبت نشده است.</div>
          ) : (
            questions.map((item, index) => {
              const selected = selectedIds.has(item.id);
              return (
                <button
                  key={item.id}
                  type="button"
                  disabled={selected}
                  onClick={() => onSelect(item.id)}
                  className={`mb-1 flex w-full items-start gap-3 rounded-lg px-3 py-3 text-right last:mb-0 ${
                    activeId === item.id ? "bg-blue-50 text-blue-800" : selected ? "bg-slate-50 text-slate-500" : "hover:bg-slate-50"
                  } disabled:cursor-default`}
                >
                  <span className={`mt-0.5 flex h-7 w-7 shrink-0 items-center justify-center rounded-full text-[11px] font-extrabold ${selected ? "bg-emerald-50 text-emerald-600" : "bg-slate-100 text-slate-500"}`}>
                    {selected ? <Icon name="check" size={14} /> : index + 1}
                  </span>
                  <span className="min-w-0">
                    <span className="block text-[11px] font-semibold text-slate-400">{item.category}</span>
                    <span className="mt-0.5 block text-sm font-semibold leading-6">{item.text}</span>
                  </span>
                </button>
              );
            })
          )}
        </div>

        <ConversationPanel conversation={conversation} emptyText={emptyText} />
      </div>

      <div className="mt-4 rounded-xl bg-slate-50 px-4 py-3 text-xs font-semibold leading-6 text-slate-500">{completeText}</div>
      {stageActions?.length ? (
        <div className="mt-4 flex flex-col gap-2 sm:flex-row">
          {stageActions.map((action) => (
            <button
              key={action.label}
              type="button"
              onClick={action.onClick}
              className={`rounded-xl px-4 py-3 text-sm font-bold transition ${
                action.variant === "primary"
                  ? "bg-slate-950 text-white hover:bg-slate-800"
                  : "border border-slate-200 bg-white text-slate-700 hover:bg-slate-50"
              }`}
            >
              {action.label}
            </button>
          ))}
        </div>
      ) : null}
    </section>
  );
}

function ConversationPanel({ conversation, emptyText }: { conversation: ConversationItem[]; emptyText: string }) {
  const scrollRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const element = scrollRef.current;
    if (!element) return;

    const anchorToBottom = () => {
      element.scrollTop = element.scrollHeight;
    };

    anchorToBottom();
    const frame = window.requestAnimationFrame(anchorToBottom);
    return () => window.cancelAnimationFrame(frame);
  }, [conversation.length]);

  return (
    <div ref={scrollRef} className="max-h-[610px] overflow-auto rounded-xl border border-slate-200 bg-white p-3">
      {conversation.length === 0 ? (
        <div className="flex min-h-[280px] items-center justify-center rounded-lg bg-slate-50 px-6 text-center text-sm leading-7 text-slate-400">{emptyText}</div>
      ) : (
        <div className="space-y-3">
          {conversation.map((item, index) => (
            <article key={item.key} className="rounded-xl border border-slate-200 bg-white p-4">
              <div className="flex items-center justify-between gap-3">
                <div className="flex items-center gap-2 text-[11px] font-bold text-slate-400">
                  <span className="flex h-5 w-5 items-center justify-center rounded-full bg-slate-100 text-[9px] text-slate-500">{index + 1}</span>
                  {item.stage}
                </div>
                {item.category ? <div className="text-[10px] font-semibold text-slate-300">{item.category}</div> : null}
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
