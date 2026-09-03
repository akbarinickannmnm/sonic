"use client";

import { useEffect, useMemo, useState } from "react";

import type { Case, CaseHint, Investigation } from "../types/case";
import Header from "./Header";
import DiagnosisSearch from "./DiagnosisSearch";
import ReviewQuiz from "./ReviewQuiz";
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
};
type Stage = "history" | "physical-exam" | "investigation";

type AnsweredItem = {
  id: string;
  question: string;
  answer: string;
  type: Stage;
};

function getStage(caseData: Case, type: Stage) {
  return caseData.stages.find((stage) => stage.type === type);
}

function getStageLimit(stage: Stage) {
  if (stage === "history") return MAX_HISTORY_QUESTIONS;
  if (stage === "physical-exam") return MAX_PHYSICAL_EXAMS;
  return MAX_INVESTIGATIONS;
}

export default function CasePlayer({ caseData, storageKey, onComplete }: Props) {
  const historyStage = getStage(caseData, "history");
  const physicalStage = getStage(caseData, "physical-exam");
  const investigationStage = getStage(caseData, "investigation");

  const courseBank = getCourseBank(caseData.course, [caseData]);
  const questionBank = courseBank.history;
  // History is a course-level shared question bank. Every case sees the
  // complete bank; only the answer is resolved from the current case.
  const questionCategories = courseBank.historyCategories;

  const [answered, setAnswered] = useState<AnsweredItem[]>([]);
  const [activeStage, setActiveStage] = useState<Stage>("history");

  const [questionSearch, setQuestionSearch] = useState("");
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);

  const [selectedDiagnosis, setSelectedDiagnosis] = useState("");
  const [guessCount, setGuessCount] = useState(0);
  const [completed, setCompleted] = useState(false);
  const [won, setWon] = useState<boolean | null>(null);
  const [showSuggestions, setShowSuggestions] = useState(false);
  const [hydrated, setHydrated] = useState(!storageKey);

  const answeredIds = useMemo(
    () => new Set(answered.map((item) => item.id)),
    [answered],
  );

  const stageAnsweredCount = answered.filter(
    (item) => item.type === activeStage,
  ).length;

  /*
   * HISTORY OPTIONS
   *
   * Category filtering and text search exist only for History.
   */
  const historyOptions = useMemo(() => {
    const query = questionSearch.trim().toLowerCase();

    return questionBank
      .filter((question) => !answeredIds.has(`history:${question.id}`))
      .filter((question) => !selectedCategory || question.category === selectedCategory)
      .filter((question) => !query || question.text.toLowerCase().includes(query))
      .map((question) => {
        const caseAnswer = question.answersByCase[caseData.id];
        return {
          id: question.id,
          label: question.text,
          sourceId: question.id,
          answer: {
            id: `${question.id}:${caseData.id}`,
            sourceId: question.id,
            label: question.text,
            content: caseAnswer ?? "برای این کیس اطلاعاتی برای این سؤال ثبت نشده است.",
          } satisfies CaseHint,
        };
      })
      .slice(0, 8);
  }, [answeredIds, caseData.id, questionSearch, selectedCategory, questionBank]);

  // Physical Exam uses the current case's actual findings directly.
  // No category filter and no global bank filtering.
  const physicalOptions = useMemo(() => {
    const hints = physicalStage?.type === "physical-exam" ? physicalStage.hints : [];

    return hints
      .filter((hint) => !answeredIds.has(`physical-exam:${hint.sourceId ?? hint.id}`))
      .map((hint) => {
        const normalizedLabel = (hint.label ?? "").trim().toLowerCase();
        const bankItem = courseBank.physicalExam.find(
          (item) => item.id === hint.sourceId ||
            item.title.trim().toLowerCase() === normalizedLabel ||
            item.id === `legacy-physical:${normalizedLabel.replace(/[^a-z0-9]+/g, " ").trim() || "findings"}`
        );

        const sourceId = bankItem?.id ?? hint.sourceId ?? hint.id;

        return {
          id: sourceId,
          label: bankItem?.title ?? hint.label ?? sourceId,
          sourceId,
          answer: hint,
        };
      });
  }, [answeredIds, physicalStage, courseBank.physicalExam]);

  // بررسیs also use the current case's actual investigations directly.
  // No category filter and no global bank filtering.
  const investigationOptions = useMemo(() => {
    return (investigationStage?.type === "investigation" ? investigationStage.investigations : [])
      .map((test) => {
        const normalizedName = test.name.trim().toLowerCase();
        const bankItem = courseBank.investigations.find(
          (item) => item.id === test.sourceId ||
            item.title.trim().toLowerCase() === normalizedName ||
            item.id === `legacy-investigation:${normalizedName.replace(/[^a-z0-9]+/g, " ").trim() || "unnamed"}`
        );
        const sourceId = bankItem?.id ?? test.sourceId ?? test.id;

        return {
          id: test.id,
          label: bankItem?.title ?? test.name,
          sourceId,
          answer: test,
        };
      })
      .filter((test) => !answeredIds.has(`investigation:${test.id}`));
  }, [answeredIds, investigationStage, courseBank.investigations]);

  const filteredDiagnoses = useMemo(() => {
    const query = selectedDiagnosis.trim().toLowerCase();

    if (!query) {
      return diseases.slice(0, 8);
    }

    return diseases
      .filter(
        (diagnosis) =>
          diagnosis.name.toLowerCase().includes(query) ||
          diagnosis.id.toLowerCase().includes(query) ||
          diagnosis.synonyms.some((synonym) =>
            synonym.toLowerCase().includes(query),
          ),
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
          questionSearch?: string;
          selectedCategory?: string | null;
          selectedDiagnosis?: string;
          guessCount?: number;
          completed?: boolean;
          won?: boolean | null;
          showSuggestions?: boolean;
        };

        if (Array.isArray(saved.answered)) setAnswered(saved.answered);
        if (saved.activeStage) setActiveStage(saved.activeStage);
        if (typeof saved.questionSearch === "string") setQuestionSearch(saved.questionSearch);
        if (saved.selectedCategory !== undefined) setSelectedCategory(saved.selectedCategory ?? null);
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
        questionSearch,
        selectedCategory,
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
    questionSearch,
    selectedCategory,
    selectedDiagnosis,
    guessCount,
    completed,
    won,
    showSuggestions,
  ]);

  const stageLimit = getStageLimit(activeStage);

  const questionsComplete =
    answered.filter((item) => item.type === "history").length >= MAX_HISTORY_QUESTIONS &&
    answered.filter((item) => item.type === "physical-exam").length >= MAX_PHYSICAL_EXAMS &&
    answered.filter((item) => item.type === "investigation").length >= MAX_INVESTIGATIONS;

  const canAskCurrentStage =
    stageAnsweredCount < stageLimit &&
    !completed;

  function moveToNextStage(nextCount: number) {
    if (nextCount < getStageLimit(activeStage)) return;

    setQuestionSearch("");
    setSelectedCategory(null);

    if (activeStage === "history") {
      setActiveStage("physical-exam");
    } else if (activeStage === "physical-exam") {
      setActiveStage("investigation");
    }
  }

  function answerHistory(
    questionId: string,
    answer: CaseHint,
  ) {
    if (
      completed ||
      activeStage !== "history"
    ) {
      return;
    }

    setAnswered((current) => {
      const next = [
        ...current,
        {
          id: `history:${questionId}`,
          question: answer.label ?? questionId,
          answer: answer.content,
          type: "history" as const,
        },
      ];

      moveToNextStage(
        next.filter(
          (item) => item.type === "history",
        ).length,
      );

      return next;
    });
  }

  function answerPhysical(
    examId: string,
    answer: CaseHint,
  ) {
    if (
      completed ||
      activeStage !== "physical-exam"
    ) {
      return;
    }

    setAnswered((current) => {
      const next = [
        ...current,
        {
          id: `physical-exam:${examId}`,
          question:
            answer.label ??
            examId,
          answer: answer.content,
          type: "physical-exam" as const,
        },
      ];

      moveToNextStage(
        next.filter(
          (item) => item.type === "physical-exam",
        ).length,
      );

      return next;
    });
  }

  function answerInvestigation(
    test: Investigation,
  ) {
    if (
      completed ||
      activeStage !== "investigation"
    ) {
      return;
    }

    setAnswered((current) => {
      const next = [
        ...current,
        {
          id: `investigation:${test.id}`,
          question: test.name,
          answer: test.findings
            .map(
              (finding) =>
                `${finding.label}: ${finding.value}`,
            )
            .join("\n"),
          type: "investigation" as const,
        },
      ];

      moveToNextStage(
        next.filter(
          (item) => item.type === "investigation",
        ).length,
      );

      return next;
    });
  }

  function submitDiagnosis() {
    if (completed) {
      return;
    }

    const diagnosis = diseases.find(
      (item) =>
        item.id === selectedDiagnosis ||
        item.name === selectedDiagnosis ||
        item.synonyms.includes(selectedDiagnosis),
    );

    if (!diagnosis) {
      alert(
        "Please select a diagnosis from the Disease Library.",
      );
      return;
    }

    const nextGuessCount = guessCount + 1;

    const correct = isCorrectDiagnosis(
      diagnosis.name,
      caseData.diagnosis,
    );

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

  const grouped = {
    history: answered.filter(
      (item) => item.type === "history",
    ),
    physical: answered.filter(
      (item) => item.type === "physical-exam",
    ),
    investigation: answered.filter(
      (item) => item.type === "investigation",
    ),
  };

  const stageLabel =
    activeStage === "history"
      ? "شرح حال"
      : activeStage === "physical-exam"
        ? "معاینه فیزیکی"
        : "بررسی‌ها";

  if (!hydrated) {
    return (
      <main className="min-h-screen bg-slate-50 px-4 py-8 text-left">
        <div className="mx-auto w-full max-w-4xl rounded-3xl border border-slate-200 bg-white p-10 text-center shadow-xl">
          <p className="text-sm text-slate-500">در حال بارگذاری کیس...</p>
        </div>
      </main>
    );
  }

  return (
    <main className="min-h-screen bg-slate-50 px-4 py-8 text-left">
      <div className="mx-auto w-full max-w-4xl rounded-3xl border border-slate-200 bg-white p-6 shadow-xl md:p-10">
        <Header />

        <section className="mt-8">
          <p className="text-sm font-semibold text-blue-600">
            {caseData.course === "pulmonology" ? "ریه" : caseData.course === "cardiology" ? "قلب و عروق" : caseData.course === "gastroenterology" ? "گوارش" : caseData.course === "neurology" ? "نورولوژی" : "عفونی"}
          </p>

          <h1 className="mt-1 text-2xl font-bold text-slate-900">
            {caseData.title}
          </h1>

          <p className="mt-2 text-sm text-slate-500">
            {caseData.patient.sex === "male"
              ? "مرد"
              : "زن"}{" "}
            {caseData.patient.age} ساله
          </p>
        </section>

        <section className="mt-5 rounded-2xl border border-slate-200 bg-slate-50 p-5">
          <p className="text-xs font-semibold tracking-wider text-slate-400">
            شکایت اصلی
          </p>

          <p className="mt-2 text-base font-medium leading-7 text-slate-800">
            {caseData.presentation}
          </p>
        </section>

        <section className="mt-5 rounded-2xl border border-blue-200 bg-blue-50/40 p-5">
          <div className="flex items-center justify-between gap-3">
            <h2 className="text-lg font-bold text-slate-900">
              اطلاعات جمع‌آوری‌شده
            </h2>

            <span className="text-sm text-slate-500">
              {answered.length} یافته
            </span>
          </div>

          {answered.length === 0 ? (
            <p className="mt-3 text-sm text-slate-500">
              اطلاعاتی که جمع می‌کنی اینجا نمایش داده می‌شود.
            </p>
          ) : (
            <div className="mt-4 space-y-3">
              {answered.map((item, index) => (
                <div
                  key={`${item.id}-${index}`}
                  className="rounded-xl border border-slate-200 bg-white p-4"
                >
                  <p className="text-sm font-semibold text-slate-800">
                    {item.question}
                  </p>

                  <p className="mt-2 whitespace-pre-line text-sm leading-6 text-slate-600">
                    {item.answer}
                  </p>
                </div>
              ))}
            </div>
          )}
        </section>

        <section className="mt-6 rounded-2xl border border-slate-200 p-5">
          <div className="flex flex-wrap items-center justify-between gap-3">
            <div>
              <p className="text-xs font-semibold uppercase tracking-wider text-blue-600">
                {stageLabel}
              </p>

              <h2 className="mt-1 text-xl font-bold text-slate-900">
                {activeStage === "history"
                  ? "شرح حال"
                  : activeStage === "physical-exam"
                    ? "معاینه فیزیکی"
                    : "بررسی‌ها"}
              </h2>
            </div>

            <div className="text-sm font-medium text-slate-500">
              سوال{" "}
              {Math.min(
                stageAnsweredCount + 1,
                stageLimit,
              )}{" "}
              از {stageLimit}
            </div>
          </div>

          <div className="mt-5 grid grid-cols-3 gap-2">
            <StageBadge
              label="شرح حال"
              active={activeStage === "history"}
              done={grouped.history.length === 3}
            />

            <StageBadge
              label="معاینه فیزیکی"
              active={activeStage === "physical-exam"}
              done={grouped.physical.length === MAX_PHYSICAL_EXAMS}
            />

            <StageBadge
              label="بررسی‌ها"
              active={activeStage === "investigation"}
              done={grouped.investigation.length === MAX_INVESTIGATIONS}
            />
          </div>

          {canAskCurrentStage && (
            <div className="mt-6">

              {/* =========================
                  HISTORY
                 ========================= */}
              {activeStage === "history" && (
                <>
                  <p className="text-sm font-semibold text-slate-700">
                    دسته‌بندی
                  </p>

                  <div className="mt-2 grid grid-cols-2 gap-2 sm:grid-cols-3 md:grid-cols-4">
                    <button
                      type="button"
                      onClick={() => {
                        setSelectedCategory(null);
                        setQuestionSearch("");
                      }}
                      className={`rounded-lg border px-3 py-2 text-left text-xs font-semibold transition ${
                        selectedCategory === null
                          ? "border-blue-400 bg-blue-50 text-blue-700"
                          : "border-slate-200 bg-white text-slate-700 hover:border-blue-300"
                      }`}
                    >
                      همه
                    </button>

                    {questionCategories.map(
                      (category) => (
                        <button
                          key={category.id}
                          type="button"
                          onClick={() => {
                            setSelectedCategory(
                              category.id,
                            );
                            setQuestionSearch("");
                          }}
                          className={`rounded-lg border px-3 py-2 text-left text-xs font-semibold transition ${
                            selectedCategory ===
                            category.id
                              ? "border-blue-400 bg-blue-50 text-blue-700"
                              : "border-slate-200 bg-white text-slate-700 hover:border-blue-300"
                          }`}
                        >
                          {category.label}
                        </button>
                      ),
                    )}
                  </div>

                  <label className="mt-5 block text-sm font-semibold text-slate-700">
                    جستجوی سوالات
                  </label>

                  <input
                    value={questionSearch}
                    onChange={(event) =>
                      setQuestionSearch(
                        event.target.value,
                      )
                    }
                    placeholder="مثلاً سیگار، سرفه، تب، سفر..."
                    className="mt-2 w-full rounded-xl border border-slate-300 px-4 py-3 text-left text-sm outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
                  />

                  <div className="mt-3 space-y-2">
                    {historyOptions.map((item) => (
                      <button
                        key={`${activeStage}-${item.id}`}
                        type="button"
                        onClick={() => {
                          answerHistory(
                            item.sourceId,
                            item.answer!,
                          );
                        }}
                        className="w-full rounded-xl border border-slate-200 bg-white p-4 text-left text-sm font-medium leading-6 text-slate-800 transition hover:border-blue-400 hover:bg-blue-50"
                      >
                        {item.label}
                      </button>
                    ))}

                    {historyOptions.length === 0 && (
                      <p className="rounded-xl bg-slate-50 p-4 text-sm text-slate-500">
                        سوال منطبقی پیدا نشد.
                      </p>
                    )}
                  </div>
                </>
              )}

              {/* =========================
                  PHYSICAL EXAM
                 ========================= */}
              {activeStage === "physical-exam" && (
                <>
                  <div className="flex items-center justify-between gap-3">
                    <div>
                      <p className="text-sm font-semibold text-slate-700">
                        معاینات موجود
                      </p>

                      <p className="mt-1 text-xs text-slate-500">
                        یک معاینه را انتخاب کن تا یافته‌های آن نمایش داده شود.
                      </p>
                    </div>

                    <span className="rounded-full bg-slate-100 px-3 py-1 text-xs font-semibold text-slate-500">
                      {physicalOptions.length} مورد موجود
                    </span>
                  </div>

                  <div className="mt-3 space-y-2">
                    {physicalOptions.map((item) => (
                      <button
                        key={`${activeStage}-${item.id}`}
                        type="button"
                        onClick={() => {
                          answerPhysical(
                            item.sourceId,
                            item.answer,
                          );
                        }}
                        className="w-full rounded-xl border border-slate-200 bg-white p-4 text-left text-sm font-medium leading-6 text-slate-800 transition hover:border-blue-400 hover:bg-blue-50"
                      >
                        {item.label}
                      </button>
                    ))}

                    {physicalOptions.length === 0 && (
                      <p className="rounded-xl bg-slate-50 p-4 text-sm text-slate-500">
                        یافته‌ای برای معاینه فیزیکی موجود نیست.
                      </p>
                    )}
                  </div>
                </>
              )}

              {/* =========================
                  INVESTIGATIONS
                 ========================= */}
              {activeStage === "investigation" && (
                <>
                  <div className="flex items-center justify-between gap-3">
                    <div>
                      <p className="text-sm font-semibold text-slate-700">
                        بررسی‌های تشخیصی موجود
                      </p>

                      <p className="mt-1 text-xs text-slate-500">
                        یک بررسی تشخیصی را انتخاب کن تا نتیجه آن نمایش داده شود.
                      </p>
                    </div>

                    <span className="rounded-full bg-slate-100 px-3 py-1 text-xs font-semibold text-slate-500">
                      {investigationOptions.length} مورد موجود
                    </span>
                  </div>

                  <div className="mt-3 space-y-2">
                    {investigationOptions.map((item) => (
                      <button
                        key={`${activeStage}-${item.id}`}
                        type="button"
                        onClick={() => {
                          answerInvestigation(
                            item.answer,
                          );
                        }}
                        className="w-full rounded-xl border border-slate-200 bg-white p-4 text-left text-sm font-medium leading-6 text-slate-800 transition hover:border-blue-400 hover:bg-blue-50"
                      >
                        {item.label}
                      </button>
                    ))}

                    {investigationOptions.length === 0 && (
                      <p className="rounded-xl bg-slate-50 p-4 text-sm text-slate-500">
                        بررسی تشخیصی‌ای موجود نیست.
                      </p>
                    )}
                  </div>
                </>
              )}
            </div>
          )}
        </section>

        <section className="mt-6 rounded-2xl border border-slate-200 p-5">
          <div className="flex flex-wrap items-center justify-between gap-3">
            <div>
              <p className="text-xs font-semibold tracking-wider text-slate-400">
                Diagnosis
              </p>

              <h2 className="mt-1 text-xl font-bold text-slate-900">
                What is your diagnosis?
              </h2>
            </div>

            <span className="rounded-full bg-slate-100 px-3 py-1 text-sm font-semibold text-slate-600">
              تلاش‌ها: {guessCount} / {MAX_GUESSES}
            </span>
          </div>

          <div className="mt-4">
            <DiagnosisSearch
              disease={selectedDiagnosis}
              setDisease={(value) => {
                setSelectedDiagnosis(value);
                setShowSuggestions(true);
              }}
              disabled={completed}
              suggestions={filteredDiagnoses}
              showSuggestions={showSuggestions}
              setShowSuggestions={
                setShowSuggestions
              }
            />
          </div>

          <button
            type="button"
            disabled={
              completed ||
              guessCount >= MAX_GUESSES ||
              !selectedDiagnosis.trim()
            }
            onClick={submitDiagnosis}
            className="mt-3 w-full rounded-xl bg-slate-900 px-4 py-3 font-semibold text-white disabled:cursor-not-allowed disabled:opacity-40"
          >
            ثبت تشخیص —{" "}
            {MAX_GUESSES - guessCount} تلاش باقی‌مانده
          </button>

          {!questionsComplete && !completed && (
            <p className="mt-3 text-xs text-slate-500">
              هر زمان بخواهی می‌توانی تشخیصت را ثبت کنی.
              در مجموع ۴ تلاش برای تشخیص داری.
            </p>
          )}

          {questionsComplete && !completed && (
            <p className="mt-3 rounded-xl bg-amber-50 p-3 text-sm font-medium text-amber-800">
              به آخرین یافته رسیدی.
              برای پایان کیس، تشخیصت را ثبت کن.
            </p>
          )}

          {won === false && (
            <div className="mt-4 rounded-xl bg-red-50 p-4 text-red-800">
              <p className="font-bold">
                کیس ناموفق بود.
              </p>

              <p className="mt-1 text-sm">
                هر ۴ تلاش استفاده شد.
              </p>

              <p className="mt-1 text-sm">
                تشخیص صحیح:{" "}
                {caseData.diagnosis.name}
              </p>
            </div>
          )}

          {won === true && (
            <div className="mt-4 rounded-xl bg-emerald-50 p-4 text-emerald-800">
              <p className="font-bold">
                تشخیص صحیح است.
              </p>

              <p className="mt-1 text-sm">
                تشخیص شما:{" "}
                {caseData.diagnosis.name}
              </p>
            </div>
          )}
        </section>

        {completed &&
          caseData.reviewQuestions.length > 0 && (
            <section className="mt-8">
              <ReviewQuiz
                questions={
                  caseData.reviewQuestions
                }
              />
            </section>
          )}
      </div>
    </main>
  );
}

function StageBadge({
  label,
  active,
  done,
}: {
  label: string;
  active: boolean;
  done: boolean;
}) {
  return (
    <div
      className={`rounded-lg border px-3 py-2 text-center text-xs font-semibold ${
        done
          ? "border-emerald-200 bg-emerald-50 text-emerald-700"
          : active
            ? "border-blue-200 bg-blue-50 text-blue-700"
            : "border-slate-200 bg-slate-50 text-slate-400"
      }`}
    >
      {done ? "✓ " : ""}
      {label}
    </div>
  );
}