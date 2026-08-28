"use client";

import { useState } from "react";
import type { ReviewQuestion } from "../types/case";

type Props = { questions: ReviewQuestion[] };

const categoryLabels: Record<string, string> = {
  diagnosis: "Diagnosis",
  investigation: "Investigations",
  treatment: "Treatment",
  "follow-up": "Follow-up",
  complication: "Complications",
  "risk-factor": "Risk Factor",
};

export default function ReviewQuiz({ questions }: Props) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [selectedOption, setSelectedOption] = useState<string | null>(null);
  const [answered, setAnswered] = useState(false);

  if (questions.length === 0) return null;

  const currentQuestion = questions[currentIndex];
  const isCorrect = selectedOption === currentQuestion.correctOptionId;
  const isLastQuestion = currentIndex === questions.length - 1;

  function handleAnswer(optionId: string) {
    if (answered) return;
    setSelectedOption(optionId);
    setAnswered(true);
  }

  function handleNext() {
    if (!answered) return;
    if (!isLastQuestion) {
      setCurrentIndex((previous) => previous + 1);
      setSelectedOption(null);
      setAnswered(false);
    }
  }

  return (
    <section className="mt-10 rounded-2xl border border-slate-200 bg-white p-6" dir="ltr">
      <div className="flex items-center justify-between">
        <div>
          <p className="text-xs font-semibold uppercase tracking-wide text-blue-600">Quick Review</p>
          <h2 className="mt-1 text-xl font-bold text-slate-900">Case Review</h2>
        </div>
        <span className="text-sm text-slate-500">{currentIndex + 1} / {questions.length}</span>
      </div>

      <div className="mt-6">
        <span className="rounded-full bg-slate-100 px-3 py-1 text-xs font-medium text-slate-600">
          {categoryLabels[currentQuestion.category] ?? currentQuestion.category}
        </span>

        <h3 className="mt-4 text-lg font-semibold leading-8 text-slate-900">{currentQuestion.question}</h3>

        <div className="mt-5 space-y-3">
          {currentQuestion.options.map((option) => {
            const isSelected = selectedOption === option.id;
            const isCorrectOption = option.id === currentQuestion.correctOptionId;
            let optionClass = "border-slate-200 hover:border-blue-400 hover:bg-slate-50";

            if (answered && isCorrectOption) optionClass = "border-green-400 bg-green-50";
            else if (answered && isSelected && !isCorrectOption) optionClass = "border-red-400 bg-red-50";

            return (
              <button
                key={option.id}
                type="button"
                onClick={() => handleAnswer(option.id)}
                disabled={answered}
                className={`w-full rounded-xl border p-4 text-left transition ${optionClass}`}
              >
                <span className="font-medium leading-7 text-slate-900">{option.text}</span>
              </button>
            );
          })}
        </div>

        {answered && (
          <div className={`mt-5 rounded-xl p-4 ${isCorrect ? "bg-green-50 text-green-900" : "bg-red-50 text-red-900"}`}>
            <p className="font-semibold">{isCorrect ? "Correct" : "Incorrect"}</p>
            {!isCorrect && (
              <p className="mt-1 text-sm">
                Correct answer: {currentQuestion.options.find((option) => option.id === currentQuestion.correctOptionId)?.text}
              </p>
            )}
            <p className="mt-3 text-sm leading-7">{currentQuestion.explanation}</p>
          </div>
        )}

        {answered && !isLastQuestion && (
          <button type="button" onClick={handleNext} className="mt-5 w-full rounded-xl bg-slate-900 py-4 font-semibold text-white hover:bg-slate-800">
            Next Question
          </button>
        )}

        {answered && isLastQuestion && (
          <div className="mt-5 rounded-xl bg-slate-50 p-4 text-center font-semibold text-slate-700">Case Review تمام شد.</div>
        )}
      </div>
    </section>
  );
}
