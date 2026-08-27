"use client";

import { useMemo, useState } from "react";

import type { Case, CaseHint, Investigation } from "../types/case";
import Header from "./Header";
import DiagnosisSearch from "./DiagnosisSearch";
import ReviewQuiz from "./ReviewQuiz";
import { diseases } from "../data/diseases";
import {
  pulmonologyQuestionBank,
  pulmonologyQuestionCategories,
} from "../data/pulmonologyQuestionBank";
import {
  pulmonologyPhysicalExamBank,
  physicalExamCategories,
} from "../data/pulmonologyPhysicalExamBank";
import {
  pulmonologyInvestigationBank,
  investigationCategories,
} from "../data/pulmonologyInvestigationBank";
import { isCorrectDiagnosis } from "../lib/caseEngine";

const MAX_GUESSES = 4;
const QUESTIONS_PER_STAGE = 3;

type Props = { caseData: Case };
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

export default function CasePlayer({ caseData }: Props) {
  const historyStage = getStage(caseData, "history");
  const physicalStage = getStage(caseData, "physical-exam");
  const investigationStage = getStage(caseData, "investigation");

  const [answered, setAnswered] = useState<AnsweredItem[]>([]);
  const [activeStage, setActiveStage] = useState<Stage>("history");
  const [questionSearch, setQuestionSearch] = useState("");
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const [selectedDiagnosis, setSelectedDiagnosis] = useState("");
  const [guessCount, setGuessCount] = useState(0);
  const [completed, setCompleted] = useState(false);
  const [won, setWon] = useState<boolean | null>(null);
  const [showSuggestions, setShowSuggestions] = useState(false);

  const answeredIds = useMemo(() => new Set(answered.map((item) => item.id)), [answered]);

  const stageAnsweredCount = answered.filter((item) => item.type === activeStage).length;

  const historyAnswerMap = useMemo(() => {
    const hints = historyStage?.type === "history" ? historyStage.hints : [];
    return new Map(hints.map((hint) => [hint.sourceId ?? hint.id, hint]));
  }, [historyStage]);

  const physicalAnswerMap = useMemo(() => {
    const hints = physicalStage?.type === "physical-exam" ? physicalStage.hints : [];
    return new Map(hints.map((hint) => [hint.sourceId ?? hint.id, hint]));
  }, [physicalStage]);

  const investigationAnswerMap = useMemo(() => {
    const investigations = investigationStage?.type === "investigation" ? investigationStage.investigations : [];
    return new Map(investigations.map((item) => [item.name.toLowerCase(), item]));
  }, [investigationStage]);

  const categoryOptions = useMemo(() => {
    if (activeStage === "history") return pulmonologyQuestionCategories;
    if (activeStage === "physical-exam") return physicalExamCategories;
    return investigationCategories;
  }, [activeStage]);

  const currentOptions = useMemo(() => {
    const query = questionSearch.trim().toLowerCase();

    if (activeStage === "history") {
      return pulmonologyQuestionBank
        .filter((question) => !answeredIds.has(`history:${question.id}`))
        .filter((question) => !selectedCategory || question.category === selectedCategory)
        .filter((question) => !query || question.text.toLowerCase().includes(query))
        .map((question) => ({
          id: question.id,
          label: question.text,
          sourceId: question.id,
          answer: historyAnswerMap.get(question.id),
        }))
        .filter((item) => item.answer)
        .slice(0, 8);
    }

    if (activeStage === "physical-exam") {
      return pulmonologyPhysicalExamBank
        .filter((exam) => !answeredIds.has(`physical-exam:${exam.id}`))
        .filter((exam) => !selectedCategory || exam.category === selectedCategory)
        .filter((exam) => !query || `${exam.title} ${exam.description}`.toLowerCase().includes(query))
        .map((exam) => ({
          id: exam.id,
          label: exam.title,
          sourceId: exam.id,
          answer: physicalAnswerMap.get(exam.id),
        }))
        .filter((item) => item.answer)
        .slice(0, 8);
    }

    return pulmonologyInvestigationBank
      .filter((test) => !answeredIds.has(`investigation:${test.id}`))
      .filter((test) => !selectedCategory || test.category === selectedCategory)
      .filter((test) => !query || `${test.title} ${test.description}`.toLowerCase().includes(query))
      .map((test) => ({
        id: test.id,
        label: test.title,
        sourceId: test.id,
        answer: investigationAnswerMap.get(test.title.toLowerCase()),
      }))
      .filter((item) => item.answer)
      .slice(0, 8);
  }, [activeStage, answeredIds, questionSearch, selectedCategory, historyAnswerMap, physicalAnswerMap, investigationAnswerMap]);

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

  const questionsComplete = answered.length >= QUESTIONS_PER_STAGE * 3;
  const canAskCurrentStage = stageAnsweredCount < QUESTIONS_PER_STAGE && !completed;

  function moveToNextStage(nextCount: number) {
    if (nextCount < QUESTIONS_PER_STAGE) return;
    setQuestionSearch("");
    setSelectedCategory(null);

    if (activeStage === "history") setActiveStage("physical-exam");
    else if (activeStage === "physical-exam") setActiveStage("investigation");
  }

  function answerHistory(questionId: string, answer: CaseHint) {
    if (completed || activeStage !== "history") return;
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
      moveToNextStage(next.filter((item) => item.type === "history").length);
      return next;
    });
  }

  function answerPhysical(examId: string, answer: CaseHint) {
    if (completed || activeStage !== "physical-exam") return;
    const bankItem = pulmonologyPhysicalExamBank.find((item) => item.id === examId);
    setAnswered((current) => {
      const next = [
        ...current,
        {
          id: `physical-exam:${examId}`,
          question: bankItem?.title ?? answer.label ?? examId,
          answer: answer.content,
          type: "physical-exam" as const,
        },
      ];
      moveToNextStage(next.filter((item) => item.type === "physical-exam").length);
      return next;
    });
  }

  function answerInvestigation(test: Investigation) {
    if (completed || activeStage !== "investigation") return;
    setAnswered((current) => {
      const next = [
        ...current,
        {
          id: `investigation:${test.id}`,
          question: test.name,
          answer: test.findings.map((finding) => `${finding.label}: ${finding.value}`).join("\n"),
          type: "investigation" as const,
        },
      ];
      moveToNextStage(next.filter((item) => item.type === "investigation").length);
      return next;
    });
  }

  function submitDiagnosis() {
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
      return;
    }

    if (nextGuessCount >= MAX_GUESSES) {
      setWon(false);
      setCompleted(true);
    }
  }

  const grouped = {
    history: answered.filter((item) => item.type === "history"),
    physical: answered.filter((item) => item.type === "physical-exam"),
    investigation: answered.filter((item) => item.type === "investigation"),
  };

  const stageLabel =
    activeStage === "history" ? "History" : activeStage === "physical-exam" ? "Physical Exam" : "Investigations";

  return (
    <main className="min-h-screen bg-slate-50 px-4 py-8 text-left">
      <div className="mx-auto w-full max-w-4xl rounded-3xl border border-slate-200 bg-white p-6 shadow-xl md:p-10">
        <Header />

        <section className="mt-8">
          <p className="text-sm font-semibold text-blue-600">Pulmonology</p>
          <h1 className="mt-1 text-2xl font-bold text-slate-900">{caseData.title}</h1>
          <p className="mt-2 text-sm text-slate-500">
            {caseData.patient.sex === "male" ? "مرد" : "زن"} {caseData.patient.age} ساله
          </p>
        </section>

        <section className="mt-5 rounded-2xl border border-slate-200 bg-slate-50 p-5">
          <p className="text-xs font-semibold tracking-wider text-slate-400">Chief Complaint</p>
          <p className="mt-2 text-base font-medium leading-7 text-slate-800">{caseData.presentation}</p>
        </section>

        <section className="mt-5 rounded-2xl border border-blue-200 bg-blue-50/40 p-5">
          <div className="flex items-center justify-between gap-3">
            <h2 className="text-lg font-bold text-slate-900">Information Gathered</h2>
            <span className="text-sm text-slate-500">{answered.length} findings</span>
          </div>
          {answered.length === 0 ? (
            <p className="mt-3 text-sm text-slate-500">Information you collect stays here.</p>
          ) : (
            <div className="mt-4 space-y-3">
              {answered.map((item, index) => (
                <div key={`${item.id}-${index}`} className="rounded-xl border border-slate-200 bg-white p-4">
                  <p className="text-sm font-semibold text-slate-800">{item.question}</p>
                  <p className="mt-2 whitespace-pre-line text-sm leading-6 text-slate-600">{item.answer}</p>
                </div>
              ))}
            </div>
          )}
        </section>

        <section className="mt-6 rounded-2xl border border-slate-200 p-5">
          <div className="flex flex-wrap items-center justify-between gap-3">
            <div>
              <p className="text-xs font-semibold uppercase tracking-wider text-blue-600">{stageLabel}</p>
              <h2 className="mt-1 text-xl font-bold text-slate-900">
                {activeStage === "history" ? "History" : activeStage === "physical-exam" ? "Physical Exam" : "Investigations"}
              </h2>
            </div>
            <div className="text-sm font-medium text-slate-500">
              Question {Math.min(stageAnsweredCount + 1, QUESTIONS_PER_STAGE)} of {QUESTIONS_PER_STAGE}
            </div>
          </div>

          <div className="mt-5 grid grid-cols-3 gap-2">
            <StageBadge label="History" active={activeStage === "history"} done={grouped.history.length === 3} />
            <StageBadge label="Physical Exam" active={activeStage === "physical-exam"} done={grouped.physical.length === 3} />
            <StageBadge label="Investigations" active={activeStage === "investigation"} done={grouped.investigation.length === 3} />
          </div>

          {canAskCurrentStage && (
            <div className="mt-6">
              <p className="text-sm font-semibold text-slate-700">Category</p>
              <div className="mt-2 grid grid-cols-2 gap-2 sm:grid-cols-3 md:grid-cols-4">
                <button
                  type="button"
                  onClick={() => { setSelectedCategory(null); setQuestionSearch(""); }}
                  className={`rounded-lg border px-3 py-2 text-left text-xs font-semibold transition ${
                    selectedCategory === null
                      ? "border-blue-400 bg-blue-50 text-blue-700"
                      : "border-slate-200 bg-white text-slate-700 hover:border-blue-300"
                  }`}
                >
                  All
                </button>
                {categoryOptions.map((category) => (
                  <button
                    key={category.id}
                    type="button"
                    onClick={() => { setSelectedCategory(category.id); setQuestionSearch(""); }}
                    className={`rounded-lg border px-3 py-2 text-left text-xs font-semibold transition ${
                      selectedCategory === category.id
                        ? "border-blue-400 bg-blue-50 text-blue-700"
                        : "border-slate-200 bg-white text-slate-700 hover:border-blue-300"
                    }`}
                  >
                    {category.label}
                  </button>
                ))}
              </div>

              <label className="mt-5 block text-sm font-semibold text-slate-700">Search questions</label>
              <input
                value={questionSearch}
                onChange={(event) => setQuestionSearch(event.target.value)}
                placeholder="e.g. smoking, cough, fever, travel..."
                className="mt-2 w-full rounded-xl border border-slate-300 px-4 py-3 text-left text-sm outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
              />

              <div className="mt-3 space-y-2">
                {currentOptions.map((item) => (
                  <button
                    key={item.id}
                    type="button"
                    onClick={() => {
  if (!item.answer) return;

  if (activeStage === "history") {
    answerHistory(item.sourceId, item.answer as CaseHint);
  } else if (activeStage === "physical-exam") {
    answerPhysical(item.sourceId, item.answer as CaseHint);
  } else {
    answerInvestigation(item.answer as Investigation);
  }
}}
                    className="w-full rounded-xl border border-slate-200 bg-white p-4 text-left text-sm font-medium leading-6 text-slate-800 transition hover:border-blue-400 hover:bg-blue-50"
                  >
                    {item.label}
                  </button>
                ))}
                {currentOptions.length === 0 && (
                  <p className="rounded-xl bg-slate-50 p-4 text-sm text-slate-500">No matching questions found.</p>
                )}
              </div>
            </div>
          )}
        </section>

        <section className="mt-6 rounded-2xl border border-slate-200 p-5">
          <div className="flex flex-wrap items-center justify-between gap-3">
            <div>
              <p className="text-xs font-semibold tracking-wider text-slate-400">Diagnosis</p>
              <h2 className="mt-1 text-xl font-bold text-slate-900">What is your diagnosis?</h2>
            </div>
            <span className="rounded-full bg-slate-100 px-3 py-1 text-sm font-semibold text-slate-600">
              Guesses: {guessCount} / {MAX_GUESSES}
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
              setShowSuggestions={setShowSuggestions}
            />
          </div>

          <button
            type="button"
            disabled={completed || guessCount >= MAX_GUESSES || !selectedDiagnosis.trim()}
            onClick={submitDiagnosis}
            className="mt-3 w-full rounded-xl bg-slate-900 px-4 py-3 font-semibold text-white disabled:cursor-not-allowed disabled:opacity-40"
          >
            Submit Diagnosis — {MAX_GUESSES - guessCount} guesses left
          </button>

          {!questionsComplete && !completed && (
            <p className="mt-3 text-xs text-slate-500">You may submit a diagnosis at any point. You have 4 total guesses.</p>
          )}

          {questionsComplete && !completed && (
            <p className="mt-3 rounded-xl bg-amber-50 p-3 text-sm font-medium text-amber-800">
              You have reached the final finding. Submit your diagnosis to finish the case.
            </p>
          )}

          {won === false && (
            <div className="mt-4 rounded-xl bg-red-50 p-4 text-red-800">
              <p className="font-bold">Case failed.</p>
              <p className="mt-1 text-sm">All 4 guesses were used.</p>
              <p className="mt-1 text-sm">Correct diagnosis: {caseData.diagnosis.name}</p>
            </div>
          )}

          {won === true && (
            <div className="mt-4 rounded-xl bg-emerald-50 p-4 text-emerald-800">
              <p className="font-bold">Correct diagnosis.</p>
              <p className="mt-1 text-sm">Your diagnosis: {caseData.diagnosis.name}</p>
            </div>
          )}
        </section>

        {completed && caseData.reviewQuestions.length > 0 && (
          <section className="mt-8">
            <ReviewQuiz questions={caseData.reviewQuestions} />
          </section>
        )}
      </div>
    </main>
  );
}

function StageBadge({ label, active, done }: { label: string; active: boolean; done: boolean }) {
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
      {done ? "✓ " : ""}{label}
    </div>
  );
}
