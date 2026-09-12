"use client";

import { useEffect, useMemo, useState } from "react";

import type { Case, CaseHint, Investigation } from "../types/case";
import DiagnosisSearch from "./DiagnosisSearch";
import CaseCompletionModal from "./CaseCompletionModal";
import { diseases } from "../data/diseases";
import { getCourseBank } from "../data/courseBanks";
import { isCorrectDiagnosis } from "../lib/caseEngine";

const MAX_GUESSES = 4;
const MAX_HISTORY_QUESTIONS = 3;
const MAX_PHYSICAL_EXAMS = 2;
const MAX_INVESTIGATIONS = 2;

type Props = {
  caseData: Case;
  storageKey?: string;
  onComplete?: (result: { won: boolean; guessCount: number }) => void;
  completionHref?: string;
  nextCaseOptions?: PracticeCaseOption[];
  practiceSelection?: PracticeSelection;
};

type Stage = "history" | "physical-exam" | "investigation";

type AnsweredItem = {
  id: string;
  sourceId?: string;
  question: string;
  answer: string;
  type: Stage;
  category?: string;
};

type QuestionItem = {
  index: number;
  id: string;
  label: string;
  category: string;
  answer: string;
  answered: boolean;
};

type PhysicalItem = {
  id: string;
  label: string;
  answer: string;
  answered: boolean;
};

type InvestigationItem = {
  id: string;
  sourceId: string | undefined;
  label: string;
  answer: string;
  answered: boolean;
};

type PracticeCaseOption = {
  id: string;
  difficulty: Case["difficulty"];
  tags: string[];
};

type PracticeSelection = {
  mode: "continue" | "unattempted" | "mistakes" | "start-over";
  difficulty: Case["difficulty"] | "all";
  tags: string[];
};

function getStage(caseData: Case, type: Stage) {
  return caseData.stages.find((stage) => stage.type === type);
}

function courseLabel(course: Case["course"]) {
  if (course === "pulmonology") return "ریه";
  if (course === "cardiology") return "قلب و عروق";
  if (course === "gastroenterology") return "گوارش";
  if (course === "neurology") return "نورولوژی";
  if (course === "nephrology") return "نفرولوژی";
  if (course === "endocrinology") return "غدد";
  if (course === "hematology-oncology") return "هماتولوژی و انکولوژی";
  return "عفونی";
}

function stageTitle(stage: Stage) {
  if (stage === "history") return "شرح حال";
  if (stage === "physical-exam") return "معاینه فیزیکی";
  return "بررسی‌ها";
}

function selectNextPracticeCase(
  course: Case["course"],
  currentCaseId: string,
  options: PracticeCaseOption[] | undefined,
  selection: PracticeSelection | undefined,
) {
  if (!options || options.length === 0) return undefined;

  const mode = selection?.mode ?? "start-over";
  const difficulty = selection?.difficulty ?? "all";
  const selectedTags = selection?.tags ?? [];

  const candidates = options.filter((candidate) => {
    if (candidate.id === currentCaseId) return false;
    if (difficulty !== "all" && candidate.difficulty !== difficulty) return false;
    if (selectedTags.length > 0 && !selectedTags.some((tag) => candidate.tags.includes(tag))) return false;

    if (mode === "start-over") return true;
    if (typeof window === "undefined") return true;

    try {
      const raw = window.localStorage.getItem(`sonic:practice:${course}:${candidate.id}`);
      const state = raw ? JSON.parse(raw) as { completed?: boolean; won?: boolean | null } : null;
      if (mode === "unattempted") return state === null;
      if (mode === "mistakes") return state?.completed === true && state.won === false;
      if (mode === "continue") return state !== null && state.completed === false;
      return true;
    } catch {
      return false;
    }
  });

  if (candidates.length === 0) return undefined;
  return candidates[Math.floor(Math.random() * candidates.length)];
}

export default function CasePlayer({
  caseData,
  storageKey,
  onComplete,
  completionHref,
  nextCaseOptions,
  practiceSelection,
}: Props) {
  const courseBank = getCourseBank(caseData.course, [caseData]);
  const physicalStage = getStage(caseData, "physical-exam");
  const investigationStage = getStage(caseData, "investigation");
  const questionBank = courseBank.history;
  const questionCategories = courseBank.historyCategories;

  const [answered, setAnswered] = useState<AnsweredItem[]>([]);
  const [activeStage, setActiveStage] = useState<Stage>("history");
  const [activeHistoryId, setActiveHistoryId] = useState<string | null>(null);
  const [activePhysicalId, setActivePhysicalId] = useState<string | null>(null);
  const [activeInvestigationId, setActiveInvestigationId] = useState<string | null>(null);
  const [selectedCategory, setSelectedCategory] = useState<string>("all");
  const [expandedHistoryIds, setExpandedHistoryIds] = useState<Set<string>>(new Set());

  const [selectedDiagnosis, setSelectedDiagnosis] = useState("");
  const [guessCount, setGuessCount] = useState(0);
  const [completed, setCompleted] = useState(false);
  const [won, setWon] = useState<boolean | null>(null);
  const [showSuggestions, setShowSuggestions] = useState(false);
  const [hydrated, setHydrated] = useState(!storageKey);

  const historyAnswered = useMemo(
    () => answered.filter((item) => item.type === "history"),
    [answered],
  );
  const physicalAnswered = useMemo(
    () => answered.filter((item) => item.type === "physical-exam"),
    [answered],
  );
  const investigationAnswered = useMemo(
    () => answered.filter((item) => item.type === "investigation"),
    [answered],
  );

  const answeredIds = useMemo(() => new Set(answered.map((item) => item.id)), [answered]);

  const historyItems = useMemo<QuestionItem[]>(
    () =>
      questionBank.map((question, index) => ({
        index: index + 1,
        id: question.id,
        label: question.text,
        category:
          questionCategories.find((category) => category.id === question.category)?.label ??
          question.category,
        answer:
          question.answersByCase[caseData.id] ??
          "برای این کیس اطلاعاتی برای این سؤال ثبت نشده است.",
        answered: answeredIds.has(`history:${question.id}`),
      })),
    [answeredIds, caseData.id, questionBank, questionCategories],
  );

  const physicalItems = useMemo<PhysicalItem[]>(() => {
    const hints: CaseHint[] =
      physicalStage?.type === "physical-exam" ? physicalStage.hints : [];

    return hints.map((hint) => {
      const normalizedLabel = (hint.label ?? "").trim().toLowerCase();
      const bankItem = courseBank.physicalExam.find(
        (item) =>
          item.id === hint.sourceId ||
          item.title.trim().toLowerCase() === normalizedLabel ||
          item.id ===
            `legacy-physical:${normalizedLabel.replace(/[^a-z0-9]+/g, " ").trim() || "findings"}`,
      );

      const sourceId = bankItem?.id ?? hint.sourceId ?? hint.id;
      return {
        id: sourceId,
        label: bankItem?.title ?? hint.label ?? sourceId,
        answer: hint.content,
        answered: answeredIds.has(`physical-exam:${sourceId}`),
      };
    });
  }, [answeredIds, courseBank.physicalExam, physicalStage]);

  const investigationItems = useMemo<InvestigationItem[]>(() => {
    const investigations: Investigation[] =
      investigationStage?.type === "investigation" ? investigationStage.investigations : [];

    return investigations.map((test) => {
      const normalizedName = test.name.trim().toLowerCase();
      const bankItem = courseBank.investigations.find(
        (item) =>
          item.id === test.sourceId ||
          item.title.trim().toLowerCase() === normalizedName ||
          item.id ===
            `legacy-investigation:${normalizedName.replace(/[^a-z0-9]+/g, " ").trim() || "unnamed"}`,
      );

      return {
        id: test.id,
        sourceId: test.sourceId,
        label: bankItem?.title ?? test.name,
        answer: test.findings
          .map((finding) => `${finding.label}: ${finding.value}`)
          .join("\n"),
        answered: answeredIds.has(`investigation:${test.id}`),
      };
    });
  }, [answeredIds, courseBank.investigations, investigationStage]);

  const activeHistory = useMemo(
    () => historyItems.find((item) => item.id === activeHistoryId) ?? null,
    [activeHistoryId, historyItems],
  );
  const activePhysical = useMemo(
    () => physicalItems.find((item) => item.id === activePhysicalId) ?? null,
    [activePhysicalId, physicalItems],
  );
  const activeInvestigation = useMemo(
    () => investigationItems.find((item) => item.id === activeInvestigationId) ?? null,
    [activeInvestigationId, investigationItems],
  );

  const filteredHistoryItems = useMemo(() => {
    if (selectedCategory === "all") return historyItems;
    return historyItems.filter((item) => {
      const bankQuestion = questionBank.find((question) => question.id === item.id);
      return bankQuestion?.category === selectedCategory;
    });
  }, [historyItems, questionBank, selectedCategory]);

  const filteredDiagnoses = useMemo(() => {
    const query = selectedDiagnosis.trim().toLowerCase();
    if (!query) return diseases.slice(0, 8);
    return diseases
      .filter(
        (diagnosis) =>
          diagnosis.name.toLowerCase().includes(query) ||
          diagnosis.id.toLowerCase().includes(query) ||
          diagnosis.synonyms.some((synonym) => synonym.toLowerCase().includes(query)),
      )
      .slice(0, 8);
  }, [selectedDiagnosis]);

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
          activeHistoryId?: string | null;
          activePhysicalId?: string | null;
          activeInvestigationId?: string | null;
          selectedCategory?: string;
          expandedHistoryIds?: string[];
          selectedDiagnosis?: string;
          guessCount?: number;
          completed?: boolean;
          won?: boolean | null;
          showSuggestions?: boolean;
        };

        if (Array.isArray(saved.answered)) setAnswered(saved.answered);
        if (saved.activeStage) setActiveStage(saved.activeStage);
        if (saved.activeHistoryId !== undefined) setActiveHistoryId(saved.activeHistoryId ?? null);
        if (saved.activePhysicalId !== undefined) setActivePhysicalId(saved.activePhysicalId ?? null);
        if (saved.activeInvestigationId !== undefined) setActiveInvestigationId(saved.activeInvestigationId ?? null);
        if (typeof saved.selectedCategory === "string") setSelectedCategory(saved.selectedCategory);
        if (Array.isArray(saved.expandedHistoryIds)) setExpandedHistoryIds(new Set(saved.expandedHistoryIds));
        if (typeof saved.selectedDiagnosis === "string") setSelectedDiagnosis(saved.selectedDiagnosis);
        if (typeof saved.guessCount === "number") setGuessCount(saved.guessCount);
        if (typeof saved.completed === "boolean") setCompleted(saved.completed);
        if (saved.won !== undefined) setWon(saved.won ?? null);
        if (typeof saved.showSuggestions === "boolean") setShowSuggestions(saved.showSuggestions);
      }
    } catch {
      window.localStorage.removeItem(storageKey);
    } finally {
      setHydrated(true);
    }
  }, [storageKey]);

  useEffect(() => {
    if (!storageKey || !hydrated || typeof window === "undefined") return;

    window.localStorage.setItem(
      storageKey,
      JSON.stringify({
        answered,
        activeStage,
        activeHistoryId,
        activePhysicalId,
        activeInvestigationId,
        selectedCategory,
        expandedHistoryIds: Array.from(expandedHistoryIds),
        selectedDiagnosis,
        guessCount,
        completed,
        won,
        showSuggestions,
      }),
    );
  }, [
    storageKey,
    hydrated,
    answered,
    activeStage,
    activeHistoryId,
    activePhysicalId,
    activeInvestigationId,
    selectedCategory,
    expandedHistoryIds,
    selectedDiagnosis,
    guessCount,
    completed,
    won,
    showSuggestions,
  ]);

  const historyComplete = historyAnswered.length >= MAX_HISTORY_QUESTIONS;
  const physicalComplete = physicalAnswered.length >= MAX_PHYSICAL_EXAMS;
  const investigationComplete = investigationAnswered.length >= MAX_INVESTIGATIONS;
  function goToStage(stage: Stage) {
    if (completed) return;
    if (stage === "history") {
      setActiveStage("history");
      return;
    }
    if (stage === "physical-exam" && historyComplete) {
      setActiveStage("physical-exam");
      return;
    }
    if (stage === "investigation" && physicalComplete) {
      setActiveStage("investigation");
    }
  }

  function completeCurrentStageIfNeeded(stage: Stage, count: number) {
    if (stage === "history" && count >= MAX_HISTORY_QUESTIONS) {
      setActiveStage("physical-exam");
      setActivePhysicalId(null);
    } else if (stage === "physical-exam" && count >= MAX_PHYSICAL_EXAMS) {
      setActiveStage("investigation");
      setActiveInvestigationId(null);
    }
  }

  function answerHistory(questionId: string) {
    if (completed || activeStage !== "history" || historyAnswered.length >= MAX_HISTORY_QUESTIONS) return;

    const question = questionBank.find((item) => item.id === questionId);
    if (!question || answeredIds.has(`history:${questionId}`)) return;

    const category =
      questionCategories.find((item) => item.id === question.category)?.label ?? question.category;
    const answer =
      question.answersByCase[caseData.id] ??
      "برای این کیس اطلاعاتی برای این سؤال ثبت نشده است.";

    setActiveHistoryId(questionId);
    setExpandedHistoryIds((current) => new Set(current).add(`history:${questionId}`));

    const nextCount = historyAnswered.length + 1;
    setAnswered((current) => [
      ...current,
      {
        id: `history:${questionId}`,
        sourceId: questionId,
        question: question.text,
        answer,
        type: "history",
        category,
      },
    ]);

    completeCurrentStageIfNeeded("history", nextCount);
  }

  function selectHistory(questionId: string) {
    const item = historyItems.find((question) => question.id === questionId);
    if (!item) return;

    setActiveStage("history");
    setActiveHistoryId(questionId);

    if (!item.answered) {
      answerHistory(questionId);
      return;
    }

    setExpandedHistoryIds((current) => {
      const next = new Set(current);
      const key = `history:${questionId}`;
      if (next.has(key)) next.delete(key);
      else next.add(key);
      return next;
    });
  }

  function answerPhysical(exam: PhysicalItem) {
    if (completed || activeStage !== "physical-exam" || physicalAnswered.length >= MAX_PHYSICAL_EXAMS) return;
    if (exam.answered) {
      setActivePhysicalId(exam.id);
      return;
    }

    setActivePhysicalId(exam.id);
    const nextCount = physicalAnswered.length + 1;
    setAnswered((current) => [
      ...current,
      {
        id: `physical-exam:${exam.id}`,
        sourceId: exam.id,
        question: exam.label,
        answer: exam.answer,
        type: "physical-exam",
      },
    ]);
    completeCurrentStageIfNeeded("physical-exam", nextCount);
  }

  function answerInvestigation(test: InvestigationItem) {
    if (completed || activeStage !== "investigation" || investigationAnswered.length >= MAX_INVESTIGATIONS) return;
    if (test.answered) {
      setActiveInvestigationId(test.id);
      return;
    }

    setActiveInvestigationId(test.id);
    setAnswered((current) => [
      ...current,
      {
        id: `investigation:${test.id}`,
        sourceId: test.sourceId ?? test.id,
        question: test.label,
        answer: test.answer,
        type: "investigation",
      },
    ]);
  }

  function setHistoryByOffset(direction: number) {
    if (!historyItems.length) return;
    const source = historyItems;
    const currentIndex = source.findIndex((item) => item.id === activeHistoryId);
    const safeIndex = currentIndex < 0 ? 0 : currentIndex;
    const nextIndex = Math.min(source.length - 1, Math.max(0, safeIndex + direction));
    setActiveHistoryId(source[nextIndex].id);
  }

  function setPhysicalByOffset(direction: number) {
    if (!physicalItems.length) return;
    const currentIndex = physicalItems.findIndex((item) => item.id === activePhysicalId);
    const safeIndex = currentIndex < 0 ? 0 : currentIndex;
    const nextIndex = Math.min(physicalItems.length - 1, Math.max(0, safeIndex + direction));
    const nextItem = physicalItems[nextIndex];
    setActivePhysicalId(nextItem.id);
  }

  function setInvestigationByOffset(direction: number) {
    if (!investigationItems.length) return;
    const currentIndex = investigationItems.findIndex((item) => item.id === activeInvestigationId);
    const safeIndex = currentIndex < 0 ? 0 : currentIndex;
    const nextIndex = Math.min(investigationItems.length - 1, Math.max(0, safeIndex + direction));
    setActiveInvestigationId(investigationItems[nextIndex].id);
  }

  function submitDiagnosis() {
    // Diagnosis can be attempted at any point during the case.
    // The case ends immediately on a correct diagnosis or after 4 incorrect guesses.
    if (completed) return;

    const diagnosis = diseases.find(
      (item) =>
        item.id === selectedDiagnosis ||
        item.name === selectedDiagnosis ||
        item.synonyms.includes(selectedDiagnosis),
    );

    if (!diagnosis) {
      alert("Please select a diagnosis from the Disease Library.");
      return;
    }

    const nextGuessCount = guessCount + 1;
    const correct = isCorrectDiagnosis(diagnosis.name, caseData.diagnosis);

    setGuessCount(nextGuessCount);
    setSelectedDiagnosis("");
    setShowSuggestions(false);

    if (correct) {
      setWon(true);
      setCompleted(true);
      onComplete?.({ won: true, guessCount: nextGuessCount });
      return;
    }

    if (nextGuessCount >= MAX_GUESSES) {
      setWon(false);
      setCompleted(true);
      onComplete?.({ won: false, guessCount: nextGuessCount });
    }
  }

  if (!hydrated) {
    return (
      <main className="min-h-screen bg-slate-50 px-4 py-8">
        <div className="mx-auto max-w-4xl rounded-2xl border border-slate-200 bg-white p-8 text-center">
          <p className="text-sm text-slate-500">در حال بارگذاری کیس...</p>
        </div>
      </main>
    );
  }

  if (completed) {
    const continueToNextCase = () => {
      if (typeof window === "undefined") return;
      const nextCase = selectNextPracticeCase(
        caseData.course,
        caseData.id,
        nextCaseOptions,
        practiceSelection,
      );
      if (nextCase) {
        const params = new URLSearchParams();
        if (practiceSelection?.mode) params.set("mode", practiceSelection.mode);
        if (practiceSelection?.difficulty) params.set("difficulty", practiceSelection.difficulty);
        if (practiceSelection?.tags.length) params.set("tags", practiceSelection.tags.join(","));
        const query = params.toString();
        window.location.assign(`/practice/${caseData.course}/${nextCase.id}${query ? `?${query}` : ""}`);
        return;
      }
      window.location.assign(completionHref ?? `/practice/${caseData.course}`);
    };

    return (
      <main dir="rtl" className="min-h-screen bg-[#f7f9fc] text-slate-900">
        <div className="mx-auto flex min-h-screen w-full max-w-[880px] items-center justify-center px-5 py-10 lg:px-8">
          <CaseCompletionModal
            caseData={caseData}
            won={won === true}
            guessCount={guessCount}
            onContinue={continueToNextCase}
            onReview={() => {
              window.location.assign(`/practice/review/${caseData.course}/${caseData.id}`);
            }}
          />
        </div>
      </main>
    );
  }

  return (
    <main dir="rtl" className="min-h-screen bg-[#f7f9fc] text-slate-900">


      <div className="sonic-container mx-auto py-5 lg:py-7">
        <div className="rounded-2xl border border-slate-200 bg-white px-5 py-5 shadow-[0_8px_28px_rgba(15,23,42,0.035)] lg:px-7">
          <div className="flex items-start justify-between gap-5">
            <div>
              <div className="text-xs font-bold text-slate-400">CASE</div>
              <h1 className="mt-1 text-xl font-extrabold text-slate-950 lg:text-2xl">{caseData.title}</h1>
            </div>
            <div className="rounded-full bg-slate-50 px-3 py-1.5 text-xs font-bold text-slate-500">
              {stageTitle(activeStage)}
            </div>
          </div>

          <div className="mt-5 rounded-xl border border-slate-200 bg-slate-50/70 px-4 py-4">
            <div className="text-[11px] font-bold uppercase tracking-[0.14em] text-slate-400">Chief Complaint</div>
            <div className="mt-1 text-sm font-semibold leading-7 text-slate-800">{caseData.presentation}</div>
          </div>

          <StageStepper
            activeStage={activeStage}
            historyComplete={historyComplete}
            physicalComplete={physicalComplete}
            onSelect={goToStage}
          />
        </div>

        <div className="mt-5 space-y-5">
          <PersistentFindingsCard
            historyItems={historyAnswered}
            physicalItems={physicalAnswered}
            investigationItems={investigationAnswered}
            activeHistoryId={activeHistoryId}
            activePhysicalId={activePhysicalId}
            activeInvestigationId={activeInvestigationId}
            expandedHistoryIds={expandedHistoryIds}
            onSelectHistory={(item) => {
              const source = historyItems.find((question) => question.id === item.sourceId);
              if (source) selectHistory(source.id);
            }}
            onSelectPhysical={(item) => {
              setActivePhysicalId(item.sourceId ?? item.id);
            }}
            onSelectInvestigation={(item) => {
              setActiveInvestigationId(item.id);
            }}
            onToggleHistory={(id) =>
              setExpandedHistoryIds((current) => {
                const next = new Set(current);
                if (next.has(id)) next.delete(id);
                else next.add(id);
                return next;
              })
            }
          />

          {activeStage === "history" && (
            <HistoryPanel
              categories={questionCategories.map((category) => ({ id: category.id, label: category.label }))}
              selectedCategory={selectedCategory}
              onSelectCategory={setSelectedCategory}
              items={filteredHistoryItems}
              activeId={activeHistoryId}
              onSelect={selectHistory}
              answeredCount={historyAnswered.length}
              remaining={MAX_HISTORY_QUESTIONS - historyAnswered.length}
            />
          )}

          {activeStage === "physical-exam" && (
            <PhysicalPanel
              items={physicalItems}
              active={activePhysical}
              answeredCount={physicalAnswered.length}
              remaining={MAX_PHYSICAL_EXAMS - physicalAnswered.length}
              onSelect={answerPhysical}
              onPrevious={() => setPhysicalByOffset(-1)}
            />
          )}

          {activeStage === "investigation" && (
            <InvestigationPanel
              items={investigationItems}
              active={activeInvestigation}
              answeredCount={investigationAnswered.length}
              remaining={MAX_INVESTIGATIONS - investigationAnswered.length}
              onSelect={answerInvestigation}
              onPrevious={() => setInvestigationByOffset(-1)}
            />
          )}

          <DiagnosisPanel
              selectedDiagnosis={selectedDiagnosis}
              setSelectedDiagnosis={setSelectedDiagnosis}
              filteredDiagnoses={filteredDiagnoses}
              showSuggestions={showSuggestions}
              setShowSuggestions={setShowSuggestions}
              guessCount={guessCount}
              won={won}
              completed={completed}
              onSubmit={submitDiagnosis}
            />

        </div>
      </div>
    </main>
  );
}

function StageStepper({
  activeStage,
  historyComplete,
  physicalComplete,
  onSelect,
}: {
  activeStage: Stage;
  historyComplete: boolean;
  physicalComplete: boolean;
  onSelect: (stage: Stage) => void;
}) {
  const steps: Array<{ id: Stage; label: string; count: string; enabled: boolean }> = [
    { id: "history", label: "شرح حال", count: "3 سؤال", enabled: true },
    { id: "physical-exam", label: "معاینه فیزیکی", count: "2 یافته", enabled: historyComplete },
    { id: "investigation", label: "بررسی‌ها", count: "2 بررسی", enabled: physicalComplete },
  ];

  return (
    <div className="mt-7 overflow-x-auto">
      <div className="mx-auto flex min-w-[640px] items-center justify-center px-2">
        {steps.map((step, index) => (
          <div key={step.id} className="flex flex-1 items-center">
            <button
              type="button"
              disabled={!step.enabled}
              onClick={() => step.enabled && onSelect(step.id)}
              className="group flex min-w-0 flex-1 items-center justify-center gap-3 disabled:cursor-not-allowed"
            >
              <span
                className={`flex h-9 w-9 shrink-0 items-center justify-center rounded-full border text-sm font-extrabold transition ${
                  activeStage === step.id
                    ? "border-blue-600 bg-blue-600 text-white"
                    : step.enabled
                      ? "border-slate-200 bg-white text-slate-500 group-hover:border-blue-200 group-hover:text-blue-600"
                      : "border-slate-200 bg-slate-50 text-slate-300"
                }`}
              >
                {index + 1}
              </span>
              <span className="min-w-0 text-right">
                <span className={`block text-sm font-bold ${activeStage === step.id ? "text-slate-950" : "text-slate-500"}`}>
                  {step.label}
                </span>
                <span className="block text-[11px] text-slate-400">{step.count}</span>
              </span>
            </button>
            {index < steps.length - 1 && <div className="mx-2 h-px w-12 shrink-0 bg-slate-200 sm:w-20" />}
          </div>
        ))}
      </div>
    </div>
  );
}

function PersistentFindingsCard({
  historyItems,
  physicalItems,
  investigationItems,
  activeHistoryId,
  activePhysicalId,
  activeInvestigationId,
  expandedHistoryIds,
  onSelectHistory,
  onSelectPhysical,
  onSelectInvestigation,
  onToggleHistory,
}: {
  historyItems: AnsweredItem[];
  physicalItems: AnsweredItem[];
  investigationItems: AnsweredItem[];
  activeHistoryId: string | null;
  activePhysicalId: string | null;
  activeInvestigationId: string | null;
  expandedHistoryIds: Set<string>;
  onSelectHistory: (item: AnsweredItem) => void;
  onSelectPhysical: (item: AnsweredItem) => void;
  onSelectInvestigation: (item: AnsweredItem) => void;
  onToggleHistory: (id: string) => void;
}) {
  const sections: Array<{
    key: Stage;
    title: string;
    items: AnsweredItem[];
    activeId: string | null;
    onSelect: (item: AnsweredItem) => void;
    collapsibleHistory?: boolean;
  }> = [
    {
      key: "history",
      title: "History",
      items: historyItems,
      activeId: activeHistoryId,
      onSelect: onSelectHistory,
      collapsibleHistory: true,
    },
    {
      key: "physical-exam",
      title: "Physical Exam",
      items: physicalItems,
      activeId: activePhysicalId,
      onSelect: onSelectPhysical,
    },
    {
      key: "investigation",
      title: "Investigation",
      items: investigationItems,
      activeId: activeInvestigationId,
      onSelect: onSelectInvestigation,
    },
  ];

  const total = historyItems.length + physicalItems.length + investigationItems.length;

  return (
    <section className="rounded-2xl border border-slate-200 bg-white p-5 shadow-[0_8px_28px_rgba(15,23,42,0.035)] lg:p-7">
      <div className="flex items-start justify-between gap-4">
        <div>
          <div className="text-[11px] font-bold uppercase tracking-[0.14em] text-slate-400">Case findings</div>
          <h2 className="mt-1 text-xl font-extrabold text-slate-950">یافته‌های ثبت‌شده</h2>
          <p className="mt-1 text-sm text-slate-400">History، Physical Exam و Investigation ثبت‌شده تا پایان کیس باقی می‌مانند.</p>
        </div>
        <div className="shrink-0 rounded-full bg-slate-50 px-3 py-1.5 text-xs font-bold text-slate-500">
          {total} مورد ثبت شده
        </div>
      </div>

      <div className="mt-5 space-y-4">
        {sections.map((section) => {
          const hasItems = section.items.length > 0;
          return (
            <div key={section.key} className="overflow-hidden rounded-xl border border-slate-100">
              <div className="flex items-center justify-between gap-3 border-b border-slate-100 bg-slate-50/70 px-4 py-3">
                <div className="flex min-w-0 items-center gap-3">
                  <span className="text-sm font-extrabold text-slate-800">{section.title}</span>
                  <span className="rounded-full bg-white px-2 py-1 text-[11px] font-bold text-slate-400 ring-1 ring-slate-200">
                    {section.items.length}
                  </span>
                </div>
              </div>

              {!hasItems ? (
                <div className="px-4 py-3 text-xs text-slate-400">هنوز موردی در این مرحله ثبت نشده است.</div>
              ) : (
                <div className="divide-y divide-slate-100">
                  {section.items.map((item, index) => {
                    const active = item.type === "history"
                      ? activeHistoryId === item.sourceId
                      : item.type === "physical-exam"
                        ? activePhysicalId === item.sourceId
                        : activeInvestigationId === item.sourceId;
                    const open = item.type === "history" ? expandedHistoryIds.has(item.id) : false;
                    return (
                      <div key={item.id} className={active ? "bg-blue-50/40" : "bg-white"}>
                        <div className="flex items-start gap-3 px-4 py-3">
                          <button
                            type="button"
                            onClick={() => section.onSelect(item)}
                            className="flex min-w-0 flex-1 items-start gap-3 text-right"
                          >
                            <span className={`mt-0.5 flex h-7 w-7 shrink-0 items-center justify-center rounded-full text-xs font-extrabold ${active ? "bg-blue-600 text-white" : "bg-emerald-50 text-emerald-600"}`}>
                              {index + 1}
                            </span>
                            <span className="min-w-0">
                              <span className="block text-sm font-bold leading-6 text-slate-800">{item.question}</span>
                              {item.category && <span className="mt-0.5 block text-[11px] font-semibold text-slate-400">{item.category}</span>}
                            </span>
                          </button>

                          {section.collapsibleHistory ? (
                            <button
                              type="button"
                              onClick={() => onToggleHistory(item.id)}
                              aria-label={open ? "بستن پاسخ" : "نمایش پاسخ"}
                              className="rounded-lg p-2 text-slate-400 hover:bg-slate-50 hover:text-slate-700"
                            >
                              <Chevron open={open} />
                            </button>
                          ) : (
                            <span className="shrink-0 px-2 py-2 text-[11px] font-bold text-emerald-600">ثبت‌شده</span>
                          )}
                        </div>

                        {(open || !section.collapsibleHistory) && (
                          <div className="px-14 pb-4">
                            <div className="whitespace-pre-line rounded-xl bg-slate-50 px-4 py-3 text-sm leading-7 text-slate-600">
                              {item.answer}
                            </div>
                          </div>
                        )}
                      </div>
                    );
                  })}
                </div>
              )}
            </div>
          );
        })}
      </div>
    </section>
  );
}

function HistoryPanel({
  categories,
  selectedCategory,
  onSelectCategory,
  items,
  activeId,
  onSelect,
  answeredCount,
  remaining,
}: {
  categories: Array<{ id: string; label: string }>;
  selectedCategory: string;
  onSelectCategory: (id: string) => void;
  items: QuestionItem[];
  activeId: string | null;
  onSelect: (id: string) => void;
  answeredCount: number;
  remaining: number;
}) {
  return (
    <section className="rounded-2xl border border-slate-200 bg-white p-5 shadow-[0_8px_28px_rgba(15,23,42,0.035)] lg:p-7">
      <div className="flex flex-col gap-4 lg:flex-row lg:items-end lg:justify-between">
        <div>
          <div className="text-[11px] font-bold uppercase tracking-[0.14em] text-slate-400">Ask a history question</div>
          <h2 className="mt-1 text-xl font-extrabold text-slate-950">یک سؤال از شرح حال انتخاب کن</h2>
          <p className="mt-1 text-sm text-slate-400">Category را انتخاب کن و سپس یکی از سؤال‌های آن دسته را باز کن.</p>
        </div>
        <div className="rounded-full bg-slate-50 px-3 py-1.5 text-xs font-bold text-slate-500">
          {answeredCount}/3 ثبت شده · {remaining} فرصت باقی‌مانده
        </div>
      </div>

      <div className="mt-5 overflow-x-auto pb-1">
        <div className="flex min-w-max gap-2">
          <CategoryChip label="همه" active={selectedCategory === "all"} onClick={() => onSelectCategory("all")} />
          {categories.map((category) => (
            <CategoryChip
              key={category.id}
              label={category.label}
              active={selectedCategory === category.id}
              onClick={() => onSelectCategory(category.id)}
            />
          ))}
        </div>
      </div>

      <div className="mt-5 grid gap-2 md:grid-cols-2">
        {items.map((item) => (
          <button
            key={item.id}
            type="button"
            onClick={() => onSelect(item.id)}
            className={`flex items-start gap-3 rounded-xl border px-4 py-3 text-right transition ${
              activeId === item.id
                ? "border-blue-200 bg-blue-50/60"
                : "border-slate-200 bg-white hover:border-slate-300 hover:bg-slate-50"
            }`}
          >
            <span
              className={`mt-0.5 flex h-7 w-7 shrink-0 items-center justify-center rounded-full text-[11px] font-extrabold ${
                item.answered ? "bg-emerald-50 text-emerald-600" : "bg-slate-100 text-slate-500"
              }`}
            >
              {item.answered ? "✓" : item.index}
            </span>
            <span className="min-w-0">
              <span className="block text-sm font-bold leading-6 text-slate-800">{item.label}</span>
              <span className="mt-0.5 block text-[11px] font-semibold text-slate-400">{item.category}</span>
            </span>
          </button>
        ))}
      </div>

      {items.length === 0 && (
        <div className="mt-5 rounded-xl bg-slate-50 px-4 py-6 text-center text-sm text-slate-400">سؤالی در این دسته پیدا نشد.</div>
      )}
    </section>
  );
}

function CategoryChip({ label, active, onClick }: { label: string; active: boolean; onClick: () => void }) {
  return (
    <button
      type="button"
      onClick={onClick}
      className={`rounded-full border px-3.5 py-2 text-xs font-bold transition ${
        active
          ? "border-blue-600 bg-blue-600 text-white"
          : "border-slate-200 bg-white text-slate-600 hover:border-blue-200 hover:text-blue-700"
      }`}
    >
      {label}
    </button>
  );
}

function PhysicalPanel({
  items,
  active,
  answeredCount,
  remaining,
  onSelect,
  onPrevious,
}: {
  items: PhysicalItem[];
  active: PhysicalItem | null;
  answeredCount: number;
  remaining: number;
  onSelect: (item: PhysicalItem) => void;
  onPrevious: () => void;
}) {
  return (
    <section className="rounded-2xl border border-slate-200 bg-white p-5 shadow-[0_8px_28px_rgba(15,23,42,0.035)] lg:p-7">
      <div className="flex items-end justify-between gap-4">
        <div>
          <div className="text-[11px] font-bold uppercase tracking-[0.14em] text-slate-400">Physical examination</div>
          <h2 className="mt-1 text-xl font-extrabold text-slate-950">معاینه فیزیکی</h2>
          <p className="mt-1 text-sm text-slate-400">History قبلی بالا باقی مانده؛ حالا یافته‌های فیزیکی را بررسی کن.</p>
        </div>
        <div className="text-xs font-bold text-slate-400">{answeredCount}/2 · {remaining} فرصت</div>
      </div>

      <div className="mt-5 grid gap-4 lg:grid-cols-[0.85fr_1.4fr]">
        <div className="rounded-xl border border-slate-200 p-2">
          {items.map((item, index) => (
            <button
              type="button"
              key={item.id}
              onClick={() => onSelect(item)}
              className={`mb-1 flex w-full items-center gap-3 rounded-lg px-3 py-3 text-right last:mb-0 ${
                active?.id === item.id ? "bg-blue-50 text-blue-800" : "hover:bg-slate-50"
              }`}
            >
              <span className={`flex h-7 w-7 shrink-0 items-center justify-center rounded-full text-[11px] font-extrabold ${item.answered ? "bg-emerald-50 text-emerald-600" : "bg-slate-100 text-slate-500"}`}>
                {item.answered ? "✓" : index + 1}
              </span>
              <span className="text-sm font-semibold leading-6">{item.label}</span>
            </button>
          ))}
        </div>

        <FindingCard
          title="یافته معاینه"
          active={active}
          emptyText="از فهرست سمت چپ یک یافته را انتخاب کن."
          onPrevious={onPrevious}
        />
      </div>
    </section>
  );
}

function InvestigationPanel({
  items,
  active,
  answeredCount,
  remaining,
  onSelect,
  onPrevious,
}: {
  items: InvestigationItem[];
  active: InvestigationItem | null;
  answeredCount: number;
  remaining: number;
  onSelect: (item: InvestigationItem) => void;
  onPrevious: () => void;
}) {
  return (
    <section className="rounded-2xl border border-slate-200 bg-white p-5 shadow-[0_8px_28px_rgba(15,23,42,0.035)] lg:p-7">
      <div className="flex items-end justify-between gap-4">
        <div>
          <div className="text-[11px] font-bold uppercase tracking-[0.14em] text-slate-400">Investigation</div>
          <h2 className="mt-1 text-xl font-extrabold text-slate-950">بررسی‌ها</h2>
          <p className="mt-1 text-sm text-slate-400">History و Physical Exam ثبت‌شده بالا در دسترس می‌مانند.</p>
        </div>
        <div className="text-xs font-bold text-slate-400">{answeredCount}/2 · {remaining} فرصت</div>
      </div>

      <div className="mt-5 grid gap-4 lg:grid-cols-[0.85fr_1.4fr]">
        <div className="rounded-xl border border-slate-200 p-2">
          {items.map((item, index) => (
            <button
              type="button"
              key={item.id}
              onClick={() => onSelect(item)}
              className={`mb-1 flex w-full items-center gap-3 rounded-lg px-3 py-3 text-right last:mb-0 ${
                active?.id === item.id ? "bg-blue-50 text-blue-800" : "hover:bg-slate-50"
              }`}
            >
              <span className={`flex h-7 w-7 shrink-0 items-center justify-center rounded-full text-[11px] font-extrabold ${item.answered ? "bg-emerald-50 text-emerald-600" : "bg-slate-100 text-slate-500"}`}>
                {item.answered ? "✓" : index + 1}
              </span>
              <span className="text-sm font-semibold leading-6">{item.label}</span>
            </button>
          ))}
        </div>

        <FindingCard
          title="نتیجه بررسی"
          active={active}
          emptyText="از فهرست سمت چپ یک بررسی را انتخاب کن."
          onPrevious={onPrevious}
        />
      </div>
    </section>
  );
}

function FindingCard({
  title,
  active,
  emptyText,
  onPrevious,
}: {
  title: string;
  active: { label: string; answer: string } | null;
  emptyText: string;
  onPrevious: () => void;
}) {
  if (!active) {
    return (
      <div className="flex min-h-[260px] items-center justify-center rounded-xl border border-dashed border-slate-200 bg-slate-50/60 px-6 text-center text-sm text-slate-400">
        {emptyText}
      </div>
    );
  }

  return (
    <div className="rounded-xl border border-slate-200 p-5 lg:p-6">
      <div className="text-[11px] font-bold uppercase tracking-[0.14em] text-slate-400">{title}</div>
      <h3 className="mt-3 text-xl font-extrabold leading-9 text-slate-950">{active.label}</h3>
      <div className="mt-5 rounded-xl bg-slate-50 px-4 py-4">
        <div className="text-xs font-bold text-slate-400">اطلاعات ثبت‌شده</div>
        <p className="mt-2 whitespace-pre-line text-base leading-8 text-slate-700">{active.answer}</p>
      </div>
      <NavigationButtons onPrevious={onPrevious} />
    </div>
  );
}

function DiagnosisPanel({
  selectedDiagnosis,
  setSelectedDiagnosis,
  filteredDiagnoses,
  showSuggestions,
  setShowSuggestions,
  guessCount,
  won,
  completed,
  onSubmit,
}: {
  selectedDiagnosis: string;
  setSelectedDiagnosis: (value: string) => void;
  filteredDiagnoses: typeof diseases;
  showSuggestions: boolean;
  setShowSuggestions: (value: boolean) => void;
  guessCount: number;
  won: boolean | null;
  completed: boolean;
  onSubmit: () => void;
}) {
  return (
    <section className="rounded-2xl border border-slate-200 bg-white p-5 shadow-[0_8px_28px_rgba(15,23,42,0.035)] lg:p-7">
      <div className="flex items-end justify-between gap-4">
        <div>
          <div className="text-[11px] font-bold uppercase tracking-[0.14em] text-slate-400">Diagnosis</div>
          <h2 className="mt-1 text-xl font-extrabold text-slate-950">تشخیص</h2>
        </div>
        <span className="text-xs font-bold text-slate-400">{guessCount}/{MAX_GUESSES} تلاش</span>
      </div>

      <div className="mt-5">
        <DiagnosisSearch
          disease={selectedDiagnosis}
          setDisease={(value) => {
            setSelectedDiagnosis(value);
            setShowSuggestions(true);
          }}
          disabled={completed}
          suggestions={filteredDiagnoses}
          showSuggestions={showSuggestions}
          setShowSuggestions={setShowSuggestions}
        />
      </div>

      <button
        type="button"
        disabled={completed || guessCount >= MAX_GUESSES || !selectedDiagnosis.trim()}
        onClick={onSubmit}
        className="mt-3 w-full rounded-xl bg-slate-950 px-4 py-3.5 text-sm font-bold text-white transition hover:bg-slate-800 disabled:cursor-not-allowed disabled:opacity-35"
      >
        ثبت تشخیص
      </button>

      {won === true && <p className="mt-3 text-sm font-bold text-emerald-600">تشخیص صحیح است.</p>}
      {won === false && <p className="mt-3 text-sm font-bold text-red-600">تلاش‌های تشخیص تمام شد.</p>}
    </section>
  );
}

function NavigationButtons({ onPrevious }: { onPrevious: () => void }) {
  return (
    <div className="mt-6 flex items-center border-t border-slate-100 pt-5">
      <button
        type="button"
        onClick={onPrevious}
        className="rounded-xl border border-slate-200 bg-white px-5 py-3 text-sm font-bold text-slate-700 hover:bg-slate-50"
      >
        قبلی
      </button>
    </div>
  );
}

function Chevron({ open }: { open: boolean }) {
  return <span className={`inline-block text-sm transition-transform ${open ? "rotate-180" : ""}`}>⌄</span>;
}
