"use client";

import { Suspense, useEffect, useState } from "react";
import { useSearchParams } from "next/navigation";
import {
  validateCase,
  type CaseValidationError,
} from "../../../../lib/caseValidator";
import { allDiagnoses as diagnoses } from "../../../../data/allDiagnoses";
import type { Case } from "../../../../types/case";
import {
  pulmonologyQuestionBank,
  pulmonologyQuestionCategories,
} from "../../../../data/pulmonologyQuestionBank";
import { pulmonologyPhysicalExamBank } from "../../../../data/pulmonologyPhysicalExamBank";
import { pulmonologyInvestigationBank } from "../../../../data/pulmonologyInvestigationBank";

type StageType =
  | "history"
  | "physical-exam"
  | "investigation";

type Hint = {
  id: string;
  content: string;
  sourceId?: string;
  label?: string;
};

type Investigation = {
  id: string;
  sourceId?: string;
  name: string;
  category: string;
  finding: string;
  relevance:
    | "high"
    | "low"
    | "non-contributory";
};

type PickerType =
  | "history"
  | "physical-exam"
  | "investigation";

type PickerState = {
  type: PickerType;
  stageId: string;
} | null;

type Stage = {
  id: string;
  type: StageType;
  title: string;
  hints?: Hint[];
  investigations?: Investigation[];
};

type ReviewQuestion = {
  id: string;
  category:
    | "diagnosis"
    | "investigation"
    | "treatment"
    | "follow-up"
    | "complication"
    | "risk-factor";

  question: string;

  options: {
    id: string;
    text: string;
  }[];

  correctOptionId: string;

  explanation: string;
};

function createId() {
  return Math.random()
    .toString(36)
    .substring(2, 10);
}

function createDefaultStages(): Stage[] {
  return [
    {
      id: createId(),
      type: "history",
      title: "Patient History",
      hints: [],
    },
    {
      id: createId(),
      type: "physical-exam",
      title: "Physical Examination",
      hints: [],
    },
    {
      id: createId(),
      type: "investigation",
      title: "Investigation",
      investigations: [],
    },
  ];
}

export default function NewCasePage() {
  return (
    <Suspense fallback={null}>
      <NewCasePageContent />
    </Suspense>
  );
}

function NewCasePageContent() {
  /* ─────────────────────────────
     BASIC CASE INFORMATION
  ───────────────────────────── */
  const searchParams =
  useSearchParams();

const editCaseId =
  searchParams.get("id");

const [editingCaseId, setEditingCaseId] =
  useState<string | null>(null);

  const [title, setTitle] =
    useState("");

  const [age, setAge] =
    useState("");

  const [sex, setSex] =
    useState<"male" | "female">("male");

  const [course, setCourse] =
    useState<Case["course"]>("cardiology");

  const [difficulty, setDifficulty] =
    useState<
      "easy" | "medium" | "hard"
    >("medium");

  const [presentation, setPresentation] =
    useState("");

  // Preserve existing tags when editing a saved case.
  const [tags, setTags] = useState<string[]>([]);
  const [validationErrors, setValidationErrors] =
  useState<CaseValidationError[]>([]);

  /* ─────────────────────────────
     STAGES
  ───────────────────────────── */

  const [stages, setStages] =
    useState<Stage[]>(createDefaultStages);

  const [showStageMenu, setShowStageMenu] =
    useState(false);

  const [picker, setPicker] =
    useState<PickerState>(null);

  const [pickerSearch, setPickerSearch] =
    useState("");

  const [pickerCategory, setPickerCategory] =
    useState<"all" | string>("all");


  /* ─────────────────────────────
     DIAGNOSIS
  ───────────────────────────── */

  const [diagnosisSearch, setDiagnosisSearch] =
    useState("");

  const [correctDiagnosisId, setCorrectDiagnosisId] =
    useState("");

  const [candidateDiagnosisIds, setCandidateDiagnosisIds] =
    useState<string[]>([]);


  /* ─────────────────────────────
     REVIEW QUESTIONS
  ───────────────────────────── */

  const [reviewQuestions, setReviewQuestions] =
    useState<ReviewQuestion[]>([]);
useEffect(() => {
  if (!editCaseId) {
    return;
  }

  const storedCases = JSON.parse(
    localStorage.getItem("sonic-cases") ?? "[]"
  );

  const existingCase = storedCases.find(
    (item: any) => item.id === editCaseId
  );

  if (!existingCase) {
    return;
  }

  setEditingCaseId(existingCase.id);

  setTitle(existingCase.title ?? "");

  setAge(
    String(
      existingCase.patient?.age ?? ""
    )
  );

  setSex(
    existingCase.patient?.sex ??
      "male"
  );

  setCourse(
    existingCase.course ??
      "cardiology"
  );

  setDifficulty(
    existingCase.difficulty ??
      "medium"
  );

  setPresentation(
    existingCase.presentation ?? ""
  );

  setTags(
    Array.isArray(existingCase.tags)
      ? existingCase.tags
      : []
  );

  // Normalize the persisted Case shape back into the builder shape.
  // Investigation data is stored as `findings[]` in the Case model,
  // while the builder edits one primary `finding` field.
  setStages(
    Array.isArray(existingCase.stages)
      ? existingCase.stages.map((stage: any) => {
          if (stage.type !== "investigation") {
            return stage;
          }

          return {
            ...stage,
            investigations: (stage.investigations ?? []).map(
              (investigation: any) => ({
                ...investigation,
                finding:
                  investigation.finding ??
                  investigation.findings?.[0]?.value ??
                  "",
              })
            ),
          };
        })
      : createDefaultStages()
  );

  const loadedCorrectDiagnosisId =
    existingCase.diagnosis?.id ?? "";

  setCandidateDiagnosisIds(
    Array.from(
      new Set(
        (existingCase.candidateDiagnosisIds ?? []).filter(
          (id: string) => id && id !== loadedCorrectDiagnosisId
        )
      )
    )
  );

  setCorrectDiagnosisId(
    existingCase.diagnosis?.id ??
      ""
  );

  setReviewQuestions(
    existingCase.reviewQuestions ??
      []
  );
}, [editCaseId]);


  /* ─────────────────────────────
     ADD STAGE
  ───────────────────────────── */

  function addStage(type: StageType) {
    const newStage: Stage = {
      id: createId(),

      type,

      title:
        type === "history"
          ? "Patient History"
          : type === "physical-exam"
          ? "Physical Examination"
          : "Investigation",

      ...(type === "history" ||
      type === "physical-exam"
        ? {
            hints: [],
          }
        : {
            investigations: [],
          }),
    };

    setStages([
      ...stages,
      newStage,
    ]);

    setShowStageMenu(false);
  }


  /* ─────────────────────────────
     DELETE STAGE
  ───────────────────────────── */

  function deleteStage(
    stageId: string
  ) {
    setStages(
      stages.filter(
        (stage) =>
          stage.id !== stageId
      )
    );
  }


  /* ─────────────────────────────
     MOVE STAGE
  ───────────────────────────── */

  function moveStage(
    index: number,
    direction: "up" | "down"
  ) {
    const newStages = [...stages];

    const targetIndex =
      direction === "up"
        ? index - 1
        : index + 1;

    if (
      targetIndex < 0 ||
      targetIndex >= newStages.length
    ) {
      return;
    }

    [
      newStages[index],
      newStages[targetIndex],
    ] = [
      newStages[targetIndex],
      newStages[index],
    ];

    setStages(newStages);
  }


  /* ─────────────────────────────
     UPDATE STAGE TITLE
  ───────────────────────────── */

  function updateStageTitle(
    stageId: string,
    value: string
  ) {
    setStages(
      stages.map((stage) =>
        stage.id === stageId
          ? {
              ...stage,
              title: value,
            }
          : stage
      )
    );
  }


  /* ─────────────────────────────
     BANK PICKERS
  ───────────────────────────── */

  function openPicker(
    type: PickerType,
    stageId: string
  ) {
    setPicker({
      type,
      stageId,
    });
    setPickerSearch("");
    setPickerCategory("all");
  }

  function closePicker() {
    setPicker(null);
    setPickerSearch("");
    setPickerCategory("all");
  }

  function addHistoryQuestion(
    stageId: string,
    questionId: string
  ) {
    setStages(
      stages.map((stage) => {
        if (stage.id !== stageId) {
          return stage;
        }

        const currentHints = stage.hints ?? [];

        if (
          currentHints.some(
            (hint) =>
              hint.sourceId === questionId
          )
        ) {
          return stage;
        }

        const question =
          pulmonologyQuestionBank.find(
            (item) => item.id === questionId
          );

        if (!question) {
          return stage;
        }

        return {
          ...stage,
          hints: [
            ...currentHints,
            {
              id: createId(),
              sourceId: question.id,
              label: question.text,
              content: "",
            },
          ],
        };
      })
    );

    closePicker();
  }

  function addAllHistoryQuestions(
    stageId: string
  ) {
    setStages(
      stages.map((stage) => {
        if (stage.id !== stageId) {
          return stage;
        }

        const currentHints = stage.hints ?? [];
        const existingIds = new Set(
          currentHints
            .map((hint) => hint.sourceId)
            .filter(Boolean)
        );

        const newHints = pulmonologyQuestionBank
          .filter((question) => !existingIds.has(question.id))
          .map((question) => ({
            id: createId(),
            sourceId: question.id,
            label: question.text,
            content: "",
          }));

        return {
          ...stage,
          hints: [...currentHints, ...newHints],
        };
      })
    );

    closePicker();
  }

  function addPhysicalExam(
    stageId: string,
    examId: string
  ) {
    setStages(
      stages.map((stage) => {
        if (stage.id !== stageId) {
          return stage;
        }

        const currentHints = stage.hints ?? [];

        if (
          currentHints.some(
            (hint) =>
              hint.sourceId === examId
          )
        ) {
          return stage;
        }

        const exam =
          pulmonologyPhysicalExamBank.find(
            (item) => item.id === examId
          );

        if (!exam) {
          return stage;
        }

        return {
          ...stage,
          hints: [
            ...currentHints,
            {
              id: createId(),
              sourceId: exam.id,
              label: exam.title,
              content: "",
            },
          ],
        };
      })
    );

    closePicker();
  }

  function addAllPhysicalExams(stageId: string) {
    setStages(
      stages.map((stage) => {
        if (stage.id !== stageId) return stage;

        const currentHints = stage.hints ?? [];
        const existingIds = new Set(
          currentHints.map((hint) => hint.sourceId).filter(Boolean)
        );

        const newHints = pulmonologyPhysicalExamBank
          .filter((exam) => !existingIds.has(exam.id))
          .map((exam) => ({
            id: createId(),
            sourceId: exam.id,
            label: exam.title,
            content: "",
          }));

        return {
          ...stage,
          hints: [...currentHints, ...newHints],
        };
      })
    );

    closePicker();
  }

  function addInvestigationFromBank(
    stageId: string,
    investigationId: string
  ) {
    setStages(
      stages.map((stage) => {
        if (stage.id !== stageId) {
          return stage;
        }

        const currentInvestigations =
          stage.investigations ?? [];

        if (
          currentInvestigations.some(
            (investigation) =>
              investigation.sourceId ===
              investigationId
          )
        ) {
          return stage;
        }

        const investigation =
          pulmonologyInvestigationBank.find(
            (item) =>
              item.id === investigationId
          );

        if (!investigation) {
          return stage;
        }

        return {
          ...stage,
          investigations: [
            ...currentInvestigations,
            {
              id: createId(),
              sourceId: investigation.id,
              name: investigation.title,
              category: investigation.category,
              finding: "",
              relevance: "high",
            },
          ],
        };
      })
    );

    closePicker();
  }

  function addAllInvestigations(stageId: string) {
    setStages(
      stages.map((stage) => {
        if (stage.id !== stageId) return stage;

        const currentInvestigations = stage.investigations ?? [];
        const existingIds = new Set(
          currentInvestigations
            .map((investigation) => investigation.sourceId)
            .filter(Boolean)
        );

        const newInvestigations = pulmonologyInvestigationBank
          .filter((investigation) => !existingIds.has(investigation.id))
          .map((investigation) => ({
            id: createId(),
            sourceId: investigation.id,
            name: investigation.title,
            category: investigation.category,
            finding: "",
            relevance: "high" as const,
          }));

        return {
          ...stage,
          investigations: [
            ...currentInvestigations,
            ...newInvestigations,
          ],
        };
      })
    );

    closePicker();
  }

  function updateHint(
    stageId: string,
    hintId: string,
    value: string
  ) {
    setStages(
      stages.map((stage) => {
        if (stage.id !== stageId) {
          return stage;
        }

        return {
          ...stage,
          hints: (
            stage.hints ?? []
          ).map((hint) =>
            hint.id === hintId
              ? {
                  ...hint,
                  content: value,
                }
              : hint
          ),
        };
      })
    );
  }

  function deleteHint(
    stageId: string,
    hintId: string
  ) {
    setStages(
      stages.map((stage) => {
        if (stage.id !== stageId) {
          return stage;
        }

        return {
          ...stage,
          hints: (
            stage.hints ?? []
          ).filter(
            (hint) =>
              hint.id !== hintId
          ),
        };
      })
    );
  }


  /* ─────────────────────────────
     INVESTIGATIONS
  ───────────────────────────── */

  function addInvestigation(
    stageId: string
  ) {
    setStages(
      stages.map((stage) => {
        if (stage.id !== stageId) {
          return stage;
        }

        return {
          ...stage,

          investigations: [
            ...(stage.investigations ?? []),

            {
              id: createId(),
              sourceId: undefined,
              name: "",
              category: "",
              finding: "",
              relevance: "high",
            },
          ],
        };
      })
    );
  }


  function updateInvestigation(
    stageId: string,
    investigationId: string,
    field:
      | "name"
      | "category"
      | "finding"
      | "relevance",
    value: string
  ) {
    setStages(
      stages.map((stage) => {
        if (stage.id !== stageId) {
          return stage;
        }

        return {
          ...stage,

          investigations: (
            stage.investigations ?? []
          ).map((investigation) =>
            investigation.id ===
            investigationId
              ? {
                  ...investigation,
                  [field]: value,
                }
              : investigation
          ),
        };
      })
    );
  }


  function deleteInvestigation(
    stageId: string,
    investigationId: string
  ) {
    setStages(
      stages.map((stage) => {
        if (stage.id !== stageId) {
          return stage;
        }

        return {
          ...stage,

          investigations: (
            stage.investigations ?? []
          ).filter(
            (investigation) =>
              investigation.id !==
              investigationId
          ),
        };
      })
    );
  }


  /* ─────────────────────────────
     DIAGNOSIS SEARCH
  ───────────────────────────── */

  const filteredDiagnoses =
    diagnoses.filter((diagnosis) => {
      const query =
        diagnosisSearch
          .trim()
          .toLowerCase();

      if (!query) {
        return true;
      }

      return (
        diagnosis.name
          .toLowerCase()
          .includes(query) ||
        diagnosis.synonyms.some(
          (synonym) =>
            synonym
              .toLowerCase()
              .includes(query)
        )
      );
    });


  /* ─────────────────────────────
     SELECT CORRECT DIAGNOSIS
  ───────────────────────────── */

  function selectCorrectDiagnosis(
    diagnosisId: string
  ) {
    setCorrectDiagnosisId(
      diagnosisId
    );

    setCandidateDiagnosisIds((current) =>
      current.filter((id) => id !== diagnosisId)
    );

    setDiagnosisSearch("");
  }


  /* ─────────────────────────────
     ADD DIFFERENTIAL
  ───────────────────────────── */

  function addCandidateDiagnosis(
    diagnosisId: string
  ) {
    if (
      diagnosisId ===
      correctDiagnosisId
    ) {
      return;
    }

    if (
      candidateDiagnosisIds.includes(
        diagnosisId
      )
    ) {
      return;
    }

    setCandidateDiagnosisIds([
      ...candidateDiagnosisIds,
      diagnosisId,
    ]);
  }


  function removeCandidateDiagnosis(
    diagnosisId: string
  ) {
    setCandidateDiagnosisIds(
      candidateDiagnosisIds.filter(
        (id) =>
          id !== diagnosisId
      )
    );
  }


  /* ─────────────────────────────
     REVIEW QUESTIONS
  ───────────────────────────── */

  function addReviewQuestion() {
    setReviewQuestions([
      ...reviewQuestions,

      {
        id: createId(),

        category: "diagnosis",

        question: "",

        options: [
          {
            id: "a",
            text: "",
          },
          {
            id: "b",
            text: "",
          },
          {
            id: "c",
            text: "",
          },
          {
            id: "d",
            text: "",
          },
        ],

        correctOptionId: "a",

        explanation: "",
      },
    ]);
  }


  function deleteReviewQuestion(
    questionId: string
  ) {
    setReviewQuestions(
      reviewQuestions.filter(
        (question) =>
          question.id !== questionId
      )
    );
  }


  function updateReviewQuestion(
    questionId: string,
    field:
      | "category"
      | "question"
      | "correctOptionId"
      | "explanation",
    value: string
  ) {
    setReviewQuestions(
      reviewQuestions.map(
        (question) =>
          question.id === questionId
            ? {
                ...question,
                [field]: value,
              }
            : question
      )
    );
  }


  function updateReviewOption(
    questionId: string,
    optionId: string,
    value: string
  ) {
    setReviewQuestions(
      reviewQuestions.map(
        (question) =>
          question.id === questionId
            ? {
                ...question,

                options:
                  question.options.map(
                    (option) =>
                      option.id ===
                      optionId
                        ? {
                            ...option,
                            text: value,
                          }
                        : option
                  ),
              }
            : question
      )
    );
  }


  /* ─────────────────────────────
     PREVIEW DATA
  ───────────────────────────── */

  const selectedDiagnosis =
    diagnoses.find(
      (diagnosis) =>
        diagnosis.id ===
        correctDiagnosisId
    );

 const sanitizedCandidateDiagnosisIds = Array.from(
    new Set(
      candidateDiagnosisIds.filter(
        (id) => id && id !== correctDiagnosisId
      )
    )
  );

 const previewCase: Case = {
  id: editingCaseId ?? "preview-case",
  title,

  course,

  tags,

  difficulty,

  patient: {
    age:
      age === ""
        ? 0
        : Number(age),

    sex,
  },

  presentation,

  stages: stages.map(
    (stage) => {
      if (
        stage.type ===
        "investigation"
      ) {
        return {
          id: stage.id,

          type: stage.type,

          title: stage.title,

          investigations: (
            stage.investigations ??
            []
          ).map(
            (investigation) => ({
              id: investigation.id,

              name: investigation.name,

              category:
                investigation.category,

              findings: [
                {
                  label: "Finding",
                  value:
                    investigation.finding,
                },
              ],

              relevance:
                investigation.relevance,
            })
          ),
        };
      }

      return {
        id: stage.id,

        type: stage.type,

        title: stage.title,

        hints: (
          stage.hints ?? []
        ).map((hint) => ({
          id: hint.id,
          sourceId: hint.sourceId,
          label: hint.label,
          content: hint.content,
        })),
      };
    }
  ),

  diagnosis:
    selectedDiagnosis ?? {
      id: "",
      name: "",
      synonyms: [],
    },

  candidateDiagnosisIds: sanitizedCandidateDiagnosisIds,

  reviewQuestions,
};

  /* ─────────────────────────────
     SAVE CASE
  ───────────────────────────── */

  function handleSaveCase() {
    const errors = validateCase(previewCase);
    setValidationErrors(errors);

    if (errors.length > 0) {
      return;
    }

    let existingCases: Case[] = [];

    try {
      const parsed = JSON.parse(
        localStorage.getItem("sonic-cases") ?? "[]"
      );

      if (Array.isArray(parsed)) {
        existingCases = parsed.filter(
          (item): item is Case =>
            Boolean(item) && typeof item.id === "string"
        );
      }
    } catch {
      existingCases = [];
    }

    const caseToSave: Case = {
      ...previewCase,
      id: editingCaseId ?? createId(),
    };

    const updatedCases = [
      ...existingCases.filter(
        (item) => item.id !== caseToSave.id
      ),
      caseToSave,
    ];

    localStorage.setItem(
      "sonic-cases",
      JSON.stringify(updatedCases)
    );

    alert(
      editingCaseId
        ? "Case updated successfully."
        : "Case saved successfully."
    );

    window.location.href = "/admin/cases";
  }

  /* ─────────────────────────────
     RENDER
  ───────────────────────────── */

  return (
    <main className="min-h-screen bg-slate-50 px-6 py-10">

      <div className="mx-auto max-w-6xl">

        {/* HEADER */}

        <div className="mb-8 flex items-center justify-between">

          <div>
            <p className="text-sm font-medium text-blue-600">
              SONIC
            </p>

            <h1 className="mt-1 text-3xl font-bold text-slate-900">
              {editingCaseId ? "Edit Case" : "Create New Case"}
            </h1>

            <p className="mt-2 text-slate-500">
              Build a clinical case step by step.
            </p>
          </div>

          <div className="flex gap-3">

            <button
  type="button"
  onClick={() => {
    sessionStorage.setItem(
      "sonic-preview-case",
      JSON.stringify(
        previewCase
      )
    );

    window.location.href =
      "/admin/cases/preview";
  }}
  className="rounded-xl border border-slate-300 bg-white px-5 py-3 font-medium text-slate-700 hover:bg-slate-50"
>
  Preview
</button>

            <button
              type="button"
              onClick={handleSaveCase}
              className="rounded-xl bg-blue-600 px-5 py-3 font-semibold text-white hover:bg-blue-700"
            >
              Save Case
            </button>

          </div>

        </div>


        {validationErrors.length > 0 && (
          <section className="mb-6 rounded-2xl border border-red-200 bg-red-50 p-6">
            <h2 className="text-lg font-semibold text-red-800">
              Case cannot be saved yet
            </h2>

            <p className="mt-1 text-sm text-red-700">
              Fix the following validation errors and try again.
            </p>

            <div className="mt-4 space-y-2">
              {validationErrors.map((error, index) => (
                <div
                  key={index}
                  className="rounded-lg bg-white px-4 py-3 text-sm text-red-800 ring-1 ring-red-100"
                >
                  {JSON.stringify(error)}
                </div>
              ))}
            </div>
          </section>
        )}

        {/* BASIC INFORMATION */}

        <section className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">

          <h2 className="text-xl font-semibold text-slate-900">
            Case Information
          </h2>

          <div className="mt-6 grid gap-5 md:grid-cols-2">

            <div className="md:col-span-2">

              <label className="text-sm font-medium text-slate-700">
                Case Title
              </label>

              <input
                value={title}
                onChange={(e) =>
                  setTitle(e.target.value)
                }
                placeholder="e.g. Acute Chest Pain"
                className="mt-2 w-full rounded-xl border border-slate-300 p-3 outline-none focus:border-blue-600"
              />

            </div>


            <div>

              <label className="text-sm font-medium text-slate-700">
                Course
              </label>

              <select
                value={course}
                onChange={(e) =>
                  setCourse(
                    e.target.value as Case["course"]
                  )
                }
                className="mt-2 w-full rounded-xl border border-slate-300 bg-white p-3"
              >

                <option value="cardiology">
                  Cardiology
                </option>

                <option value="pulmonology">
                  Pulmonology
                </option>

                <option value="gastroenterology">
                  Gastroenterology
                </option>

                <option value="neurology">
                  Neurology
                </option>

                <option value="infectious-disease">
                  Infectious Disease
                </option>

              </select>

            </div>


            <div>

              <label className="text-sm font-medium text-slate-700">
                Difficulty
              </label>

              <select
                value={difficulty}
                onChange={(e) =>
                  setDifficulty(
                    e.target.value as
                      | "easy"
                      | "medium"
                      | "hard"
                  )
                }
                className="mt-2 w-full rounded-xl border border-slate-300 bg-white p-3"
              >

                <option value="easy">
                  Easy
                </option>

                <option value="medium">
                  Medium
                </option>

                <option value="hard">
                  Hard
                </option>

              </select>

            </div>


            <div>

              <label className="text-sm font-medium text-slate-700">
                Patient Age
              </label>

              <input
                type="number"
                value={age}
                onChange={(e) =>
                  setAge(e.target.value)
                }
                placeholder="58"
                className="mt-2 w-full rounded-xl border border-slate-300 p-3"
              />

            </div>


            <div>

              <label className="text-sm font-medium text-slate-700">
                Patient Sex
              </label>

              <select
                value={sex}
                onChange={(e) =>
                  setSex(
                    e.target.value as
                      | "male"
                      | "female"
                  )
                }
                className="mt-2 w-full rounded-xl border border-slate-300 bg-white p-3"
              >

                <option value="male">
                  Male
                </option>

                <option value="female">
                  Female
                </option>

              </select>

            </div>


            <div className="md:col-span-2">

              <label className="text-sm font-medium text-slate-700">
                Chief Complaint
              </label>

              <textarea
                value={presentation}
                onChange={(e) =>
                  setPresentation(
                    e.target.value
                  )
                }
                rows={4}
                placeholder='e.g. "سه چهار روزه خیلی حالم بده، تب دارم و سرفه‌م قطع نمی‌شه."'

                className="mt-2 w-full resize-none rounded-xl border border-slate-300 p-3"
              />

            </div>

          </div>

        </section>


        {/* STAGES */}

        <section className="mt-6 rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">

          <div className="flex items-center justify-between">

            <div>

              <h2 className="text-xl font-semibold text-slate-900">
                Clinical Stages
              </h2>

              <p className="mt-1 text-sm text-slate-500">
                Define the encounter flow.
              </p>

            </div>


            <div className="relative">

              <button
                type="button"
                onClick={() =>
                  setShowStageMenu(
                    !showStageMenu
                  )
                }
                className="rounded-xl bg-slate-900 px-4 py-2 font-medium text-white"
              >
                + Add Stage
              </button>


              {showStageMenu && (

                <div className="absolute right-0 z-20 mt-2 w-64 overflow-hidden rounded-xl border bg-white shadow-xl">

                  <button
                    type="button"
                    onClick={() =>
                      addStage("history")
                    }
                    className="block w-full px-4 py-3 text-left hover:bg-slate-50"
                  >
                    <p className="font-medium">
                      History
                    </p>

                    <p className="text-xs text-slate-500">
                      Patient-reported information
                    </p>
                  </button>


                  <button
                    type="button"
                    onClick={() =>
                      addStage(
                        "physical-exam"
                      )
                    }
                    className="block w-full px-4 py-3 text-left hover:bg-slate-50"
                  >
                    <p className="font-medium">
                      Physical Examination
                    </p>

                    <p className="text-xs text-slate-500">
                      Clinical findings
                    </p>
                  </button>


                  <button
                    type="button"
                    onClick={() =>
                      addStage(
                        "investigation"
                      )
                    }
                    className="block w-full px-4 py-3 text-left hover:bg-slate-50"
                  >
                    <p className="font-medium">
                      Investigation
                    </p>

                    <p className="text-xs text-slate-500">
                      Tests available to the learner
                    </p>
                  </button>

                </div>

              )}

            </div>

          </div>


          {stages.length === 0 && (

            <div className="mt-6 rounded-xl border border-dashed border-slate-300 p-8 text-center text-slate-400">
              No stages added yet.
            </div>

          )}


          <div className="mt-6 space-y-5">

            {stages.map(
              (stage, index) => (

                <div
                  key={stage.id}
                  className="rounded-2xl border bg-slate-50 p-5"
                >

                  <div className="flex items-start justify-between">

                    <div className="flex gap-3">

                      <div className="flex flex-col">

                        <button
                          type="button"
                          disabled={
                            index === 0
                          }
                          onClick={() =>
                            moveStage(
                              index,
                              "up"
                            )
                          }
                          className="text-xs disabled:opacity-20"
                        >
                          ▲
                        </button>

                        <button
                          type="button"
                          disabled={
                            index ===
                            stages.length -
                              1
                          }
                          onClick={() =>
                            moveStage(
                              index,
                              "down"
                            )
                          }
                          className="text-xs disabled:opacity-20"
                        >
                          ▼
                        </button>

                      </div>


                      <div>

                        <span className="text-xs font-semibold uppercase text-blue-600">
                          Stage {index + 1}
                        </span>

                        <input
                          value={
                            stage.title
                          }
                          onChange={(e) =>
                            updateStageTitle(
                              stage.id,
                              e.target.value
                            )
                          }
                          className="mt-1 block bg-transparent text-lg font-semibold outline-none"
                        />

                      </div>

                    </div>


                    <button
                      type="button"
                      onClick={() =>
                        deleteStage(
                          stage.id
                        )
                      }
                      className="text-sm text-red-500"
                    >
                      Delete
                    </button>

                  </div>


                  {/* HISTORY / PHYSICAL EXAM BANK STAGE */}

                  {(stage.type === "history" ||
                    stage.type === "physical-exam") && (
                    <div className="mt-5">
                      <div className="flex items-center justify-between">
                        <div>
                          <h3 className="font-medium">
                            {stage.type === "history"
                              ? "History Questions"
                              : "Physical Examinations"}
                          </h3>

                          <p className="mt-1 text-xs text-slate-500">
                            {stage.type === "history"
                              ? "Add as many questions as the case needs. Every added question has its own patient answer."
                              : "Add examinations you want available in the case. Every selected examination has its own complete finding; the learner chooses which examination to request."}
                          </p>
                        </div>

                        <div className="flex items-center gap-2">
                          {stage.type === "history" && (
                            <button
                              type="button"
                              onClick={() =>
                                addAllHistoryQuestions(stage.id)
                              }
                              className="rounded-lg bg-slate-900 px-3 py-2 text-sm font-medium text-white hover:bg-slate-800"
                            >
                              + Add All Questions
                            </button>
                          )}

                          {stage.type === "physical-exam" && (
                            <button
                              type="button"
                              onClick={() =>
                                addAllPhysicalExams(stage.id)
                              }
                              className="rounded-lg bg-slate-900 px-3 py-2 text-sm font-medium text-white hover:bg-slate-800"
                            >
                              + Add All Examinations
                            </button>
                          )}

                          <button
                            type="button"
                            onClick={() =>
                              openPicker(
                                stage.type,
                                stage.id
                              )
                            }
                            className="rounded-lg bg-white px-3 py-2 text-sm font-medium text-blue-600 ring-1 ring-slate-200 hover:bg-slate-50"
                          >
                            + Add{" "}
                            {stage.type === "history"
                              ? "Question"
                              : "Examination"}
                          </button>
                        </div>
                      </div>

                      <div className="mt-4 space-y-3">
                        {(stage.hints ?? []).map(
                          (hint, hintIndex) => (
                            <div
                              key={hint.id}
                              className="rounded-xl border border-slate-200 bg-white p-4"
                            >
                              <div className="flex items-start gap-3">
                                <span className="mt-1 text-xs font-semibold text-slate-400">
                                  {hintIndex + 1}
                                </span>

                                <div className="min-w-0 flex-1">
                                  <div className="flex items-start justify-between gap-4">
                                    <div>
                                      <p className="font-medium text-slate-900">
                                        {hint.label ??
                                          (stage.type ===
                                          "history"
                                            ? "History item"
                                            : "Physical examination")}
                                      </p>

                                      {hint.sourceId && (
                                        <p className="mt-1 text-xs text-slate-400">
                                          {hint.sourceId}
                                        </p>
                                      )}
                                    </div>

                                    <button
                                      type="button"
                                      onClick={() =>
                                        deleteHint(
                                          stage.id,
                                          hint.id
                                        )
                                      }
                                      className="text-sm text-slate-400 hover:text-red-500"
                                    >
                                      Remove
                                    </button>
                                  </div>

                                  <textarea
                                    value={
                                      hint.content
                                    }
                                    onChange={(e) =>
                                      updateHint(
                                        stage.id,
                                        hint.id,
                                        e.target.value
                                      )
                                    }
                                    rows={3}
                                    placeholder={
                                      stage.type ===
                                      "history"
                                        ? "Patient answer..."
                                        : "Complete examination findings..."
                                    }
                                    className="mt-3 w-full resize-none rounded-xl border border-slate-300 bg-white p-3"
                                  />
                                </div>
                              </div>
                            </div>
                          )
                        )}
                      </div>
                    </div>
                  )}

                  {/* INVESTIGATION STAGE */}

                  {stage.type === "investigation" && (
                    <div className="mt-5">
                      <div className="flex items-center justify-between">
                        <div>
                          <h3 className="font-medium">
                            Available Investigations
                          </h3>

                          <p className="mt-1 text-xs text-slate-500">
                            Add tests you want available in the case. Every selected test has its own complete result; the learner chooses which tests to request.
                          </p>
                        </div>

                        <div className="flex items-center gap-2">
                          <button
                            type="button"
                            onClick={() =>
                              addAllInvestigations(stage.id)
                            }
                            className="rounded-lg bg-slate-900 px-3 py-2 text-sm font-medium text-white hover:bg-slate-800"
                          >
                            + Add All Investigations
                          </button>

                          <button
                            type="button"
                            onClick={() =>
                              openPicker(
                                "investigation",
                                stage.id
                              )
                            }
                            className="rounded-lg bg-white px-3 py-2 text-sm font-medium text-blue-600 ring-1 ring-slate-200 hover:bg-slate-50"
                          >
                            + Add Investigation
                          </button>
                        </div>
                      </div>

                      <div className="mt-4 space-y-4">
                        {(stage.investigations ?? []).map(
                          (investigation) => (
                            <div
                              key={investigation.id}
                              className="rounded-xl border bg-white p-4"
                            >
                              <div className="mb-4 flex items-start justify-between gap-4">
                                <div>
                                  <p className="text-sm font-semibold text-slate-900">
                                    {investigation.name ||
                                      "Investigation"}
                                  </p>

                                  <p className="mt-1 text-xs text-slate-400">
                                    {investigation.category}
                                    {investigation.sourceId
                                      ? ` · ${investigation.sourceId}`
                                      : ""}
                                  </p>
                                </div>

                                <button
                                  type="button"
                                  onClick={() =>
                                    deleteInvestigation(
                                      stage.id,
                                      investigation.id
                                    )
                                  }
                                  className="text-sm text-red-500"
                                >
                                  Delete
                                </button>
                              </div>

                              <div className="grid gap-4 md:grid-cols-2">
                                <div>
                                  <label className="text-sm font-medium text-slate-700">
                                    Test
                                  </label>

                                  <div className="mt-2 rounded-xl border border-slate-200 bg-slate-50 p-3 text-sm text-slate-700">
                                    {investigation.name ||
                                      "Custom investigation"}
                                  </div>
                                </div>

                                <div>
                                  <label className="text-sm font-medium text-slate-700">
                                    Category
                                  </label>

                                  <div className="mt-2 rounded-xl border border-slate-200 bg-slate-50 p-3 text-sm text-slate-700">
                                    {investigation.category ||
                                      "—"}
                                  </div>
                                </div>

                                <div className="md:col-span-2">
                                  <label className="text-sm font-medium text-slate-700">
                                    Complete Result
                                  </label>

                                  <textarea
                                    value={
                                      investigation.finding
                                    }
                                    onChange={(e) =>
                                      updateInvestigation(
                                        stage.id,
                                        investigation.id,
                                        "finding",
                                        e.target.value
                                      )
                                    }
                                    rows={4}
                                    placeholder="Enter the complete result the learner should receive..."
                                    className="mt-2 w-full resize-none rounded-xl border border-slate-300 p-3"
                                  />
                                </div>

                                <div>
                                  <label className="text-sm font-medium text-slate-700">
                                    Relevance
                                  </label>

                                  <select
                                    value={
                                      investigation.relevance
                                    }
                                    onChange={(e) =>
                                      updateInvestigation(
                                        stage.id,
                                        investigation.id,
                                        "relevance",
                                        e.target.value
                                      )
                                    }
                                    className="mt-2 w-full rounded-xl border border-slate-300 bg-white p-3"
                                  >
                                    <option value="high">
                                      High
                                    </option>

                                    <option value="low">
                                      Low
                                    </option>

                                    <option value="non-contributory">
                                      Non-contributory
                                    </option>
                                  </select>
                                </div>
                              </div>
                            </div>
                          )
                        )}
                      </div>
                    </div>
                  )}

                </div>

              )
            )}

          </div>

        </section>


        {/* BANK PICKER MODAL */}

        {picker && (
          <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/50 px-4 py-8">
            <div className="flex max-h-[85vh] w-full max-w-3xl flex-col overflow-hidden rounded-2xl bg-white shadow-2xl">
              <div className="flex items-center justify-between border-b border-slate-200 px-6 py-5">
                <div>
                  <h2 className="text-xl font-semibold text-slate-900">
                    {picker.type === "history"
                      ? "Add History Question"
                      : picker.type === "physical-exam"
                      ? "Add Physical Examination"
                      : "Add Investigation"}
                  </h2>

                  <p className="mt-1 text-sm text-slate-500">
                    Search the pulmonology bank and select an item.
                  </p>
                </div>

                <button
                  type="button"
                  onClick={closePicker}
                  className="text-2xl leading-none text-slate-400 hover:text-slate-700"
                >
                  ×
                </button>
              </div>

              <div className="border-b border-slate-200 p-5">
                <input
                  autoFocus
                  value={pickerSearch}
                  onChange={(e) =>
                    setPickerSearch(e.target.value)
                  }
                  placeholder={
                    picker.type === "history"
                      ? "Search questions..."
                      : picker.type === "physical-exam"
                      ? "Search examinations..."
                      : "Search investigations..."
                  }
                  className="w-full rounded-xl border border-slate-300 px-4 py-3 outline-none focus:border-blue-500"
                />
              </div>

              <div className="overflow-y-auto p-5">
                {picker.type === "history" && (
                  <div className="space-y-5">
                    <div className="flex flex-wrap gap-2">
                      <button
                        type="button"
                        onClick={() => setPickerCategory("all")}
                        className={`rounded-full px-3 py-1.5 text-xs font-medium ${
                          pickerCategory === "all"
                            ? "bg-slate-900 text-white"
                            : "bg-slate-100 text-slate-600 hover:bg-slate-200"
                        }`}
                      >
                        All Categories
                      </button>

                      {pulmonologyQuestionCategories.map((category) => (
                        <button
                          key={category.id}
                          type="button"
                          onClick={() => setPickerCategory(category.id)}
                          className={`rounded-full px-3 py-1.5 text-xs font-medium ${
                            pickerCategory === category.id
                              ? "bg-blue-600 text-white"
                              : "bg-slate-100 text-slate-600 hover:bg-slate-200"
                          }`}
                        >
                          {category.label}
                        </button>
                      ))}
                    </div>

                    <div className="flex items-center justify-between rounded-xl bg-slate-50 px-4 py-3">
                      <div>
                        <p className="text-sm font-semibold text-slate-800">
                          Complete History Bank
                        </p>
                        <p className="text-xs text-slate-500">
                          Add every question to this case and fill every patient answer.
                        </p>
                      </div>

                      <button
                        type="button"
                        onClick={() =>
                          addAllHistoryQuestions(picker.stageId)
                        }
                        className="rounded-lg bg-blue-600 px-3 py-2 text-xs font-semibold text-white hover:bg-blue-700"
                      >
                        Add All
                      </button>
                    </div>

                    <div className="space-y-2">
                      {pulmonologyQuestionBank
                        .filter((item) => {
                          const query =
                            pickerSearch.trim().toLowerCase();

                          const matchesSearch =
                            !query ||
                            item.text
                              .toLowerCase()
                              .includes(query) ||
                            item.id
                              .toLowerCase()
                              .includes(query);

                          const matchesCategory =
                            pickerCategory === "all" ||
                            item.category === pickerCategory;

                          return (
                            matchesSearch &&
                            matchesCategory
                          );
                        })
                        .map((item) => {
                          const stage = stages.find(
                            (candidate) =>
                              candidate.id === picker.stageId
                          );

                          const alreadyAdded =
                            stage?.hints?.some(
                              (hint) =>
                                hint.sourceId === item.id
                            ) ?? false;

                          return (
                            <button
                              key={item.id}
                              type="button"
                              disabled={alreadyAdded}
                              onClick={() =>
                                addHistoryQuestion(
                                  picker.stageId,
                                  item.id
                                )
                              }
                              className="w-full rounded-xl border border-slate-200 p-4 text-left transition hover:border-blue-300 hover:bg-blue-50 disabled:cursor-not-allowed disabled:opacity-40"
                            >
                              <div className="flex items-start justify-between gap-4">
                                <div>
                                  <p className="font-medium text-slate-900">
                                    {item.text}
                                  </p>

                                  <p className="mt-1 text-xs text-slate-400">
                                    {item.id}
                                  </p>
                                </div>

                                <span
                                  className={`shrink-0 rounded-full px-2 py-1 text-[10px] font-semibold uppercase ${
                                    item.level === "followup"
                                      ? "bg-amber-100 text-amber-700"
                                      : "bg-emerald-100 text-emerald-700"
                                  }`}
                                >
                                  {item.level}
                                </span>
                              </div>

                              <p className="mt-2 text-xs text-slate-500">
                                {
                                  pulmonologyQuestionCategories.find(
                                    (category) =>
                                      category.id === item.category
                                  )?.label ?? item.category
                                }
                              </p>
                            </button>
                          );
                        })}
                    </div>
                  </div>
                )}

                {picker.type === "physical-exam" && (
                  <div className="space-y-2">
                    {pulmonologyPhysicalExamBank
                      .filter((item) => {
                        const query =
                          pickerSearch.trim().toLowerCase();

                        return (
                          !query ||
                          item.title
                            .toLowerCase()
                            .includes(query) ||
                          item.description
                            .toLowerCase()
                            .includes(query)
                        );
                      })
                      .map((item) => (
                        <button
                          key={item.id}
                          type="button"
                          disabled={
                            stages
                              .find(
                                (stage) =>
                                  stage.id ===
                                  picker.stageId
                              )
                              ?.hints?.some(
                                (hint) =>
                                  hint.sourceId ===
                                  item.id
                              ) ?? false
                          }
                          onClick={() =>
                            addPhysicalExam(
                              picker.stageId,
                              item.id
                            )
                          }
                          className="w-full rounded-xl border border-slate-200 p-4 text-left transition hover:border-blue-300 hover:bg-blue-50 disabled:cursor-not-allowed disabled:opacity-40"
                        >
                          <p className="font-medium text-slate-900">
                            {item.title}
                          </p>

                          <p className="mt-1 text-sm text-slate-500">
                            {item.description}
                          </p>

                          <p className="mt-2 text-xs text-slate-400">
                            {item.id} · {item.category}
                          </p>
                        </button>
                      ))}
                  </div>
                )}

                {picker.type === "investigation" && (
                  <div className="space-y-2">
                    {pulmonologyInvestigationBank
                      .filter((item) => {
                        const query =
                          pickerSearch.trim().toLowerCase();

                        return (
                          !query ||
                          item.title
                            .toLowerCase()
                            .includes(query) ||
                          item.description
                            .toLowerCase()
                            .includes(query)
                        );
                      })
                      .map((item) => (
                        <button
                          key={item.id}
                          type="button"
                          disabled={
                            stages
                              .find(
                                (stage) =>
                                  stage.id ===
                                  picker.stageId
                              )
                              ?.investigations?.some(
                                (investigation) =>
                                  investigation.sourceId ===
                                  item.id
                              ) ?? false
                          }
                          onClick={() =>
                            addInvestigationFromBank(
                              picker.stageId,
                              item.id
                            )
                          }
                          className="w-full rounded-xl border border-slate-200 p-4 text-left transition hover:border-blue-300 hover:bg-blue-50 disabled:cursor-not-allowed disabled:opacity-40"
                        >
                          <p className="font-medium text-slate-900">
                            {item.title}
                          </p>

                          <p className="mt-1 text-sm text-slate-500">
                            {item.description}
                          </p>

                          <p className="mt-2 text-xs text-slate-400">
                            {item.id} · {item.category}
                          </p>
                        </button>
                      ))}
                  </div>
                )}
              </div>
            </div>
          </div>
        )}

        {/* DIAGNOSIS */}

        <section className="mt-6 rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">

          <h2 className="text-xl font-semibold text-slate-900">
            Diagnosis
          </h2>

          <p className="mt-1 text-sm text-slate-500">
            Select the correct diagnosis and the differential diagnoses.
          </p>


          {/* CORRECT DIAGNOSIS */}

          <div className="mt-6">

            <label className="text-sm font-medium text-slate-700">
              Correct Diagnosis
            </label>


            {selectedDiagnosis ? (

              <div className="mt-2 flex items-center justify-between rounded-xl border border-green-200 bg-green-50 p-4">

                <div>

                  <p className="text-xs font-semibold uppercase text-green-600">
                    Correct Answer
                  </p>

                  <p className="mt-1 font-semibold text-slate-900">
                    {selectedDiagnosis.name}
                  </p>

                </div>

                <button
                  type="button"
                  onClick={() =>
                    setCorrectDiagnosisId(
                      ""
                    )
                  }
                  className="text-sm text-red-500"
                >
                  Change
                </button>

              </div>

            ) : (

              <div className="relative">

                <input
                  value={
                    diagnosisSearch
                  }
                  onChange={(e) =>
                    setDiagnosisSearch(
                      e.target.value
                    )
                  }
                  placeholder="Search diagnosis..."
                  className="mt-2 w-full rounded-xl border border-slate-300 p-3"
                />


                {diagnosisSearch && (

                  <div className="absolute z-20 mt-2 max-h-60 w-full overflow-auto rounded-xl border bg-white shadow-lg">

                    {filteredDiagnoses
                      .slice(0, 10)
                      .map(
                        (diagnosis) => (

                          <button
                            key={
                              diagnosis.id
                            }
                            type="button"
                            onClick={() =>
                              selectCorrectDiagnosis(
                                diagnosis.id
                              )
                            }
                            className="block w-full px-4 py-3 text-left hover:bg-slate-50"
                          >
                            <p className="font-medium">
                              {
                                diagnosis.name
                              }
                            </p>

                            {diagnosis.synonyms.length >
                              0 && (

                              <p className="text-xs text-slate-400">
                                {
                                  diagnosis
                                    .synonyms[0]
                                }
                              </p>

                            )}

                          </button>

                        )
                      )}

                  </div>

                )}

              </div>

            )}

          </div>


          {/* DIFFERENTIALS */}

          <div className="mt-8">

            <label className="text-sm font-medium text-slate-700">
              Candidate Diagnoses
            </label>

            <p className="mt-1 text-xs text-slate-400">
              These are the diagnoses available to the learner during free recall.
            </p>


            <div className="mt-3 flex flex-wrap gap-2">

              {candidateDiagnosisIds.map(
                (id) => {

                  const diagnosis =
                    diagnoses.find(
                      (item) =>
                        item.id === id
                    );

                  if (!diagnosis) {
                    return null;
                  }

                  return (
                    <div
                      key={id}
                      className="flex items-center gap-2 rounded-full bg-slate-100 px-3 py-2 text-sm"
                    >

                      <span>
                        {
                          diagnosis.name
                        }
                      </span>

                      <button
                        type="button"
                        onClick={() =>
                          removeCandidateDiagnosis(
                            id
                          )
                        }
                        className="text-slate-400 hover:text-red-500"
                      >
                        ×
                      </button>

                    </div>
                  );
                }
              )}

            </div>


            <div className="relative mt-4">

              <input
                value={
                  diagnosisSearch
                }
                onChange={(e) =>
                  setDiagnosisSearch(
                    e.target.value
                  )
                }
                placeholder="Search and add a differential..."
                className="w-full rounded-xl border border-slate-300 p-3"
              />


              {diagnosisSearch && (

                <div className="absolute z-20 mt-2 max-h-60 w-full overflow-auto rounded-xl border bg-white shadow-lg">

                  {filteredDiagnoses
                    .filter(
                      (diagnosis) =>
                        diagnosis.id !==
                          correctDiagnosisId &&
                        !candidateDiagnosisIds.includes(
                          diagnosis.id
                        )
                    )
                    .slice(0, 10)
                    .map(
                      (diagnosis) => (

                        <button
                          key={
                            diagnosis.id
                          }
                          type="button"
                          onClick={() => {
                            addCandidateDiagnosis(
                              diagnosis.id
                            );

                            setDiagnosisSearch(
                              ""
                            );
                          }}
                          className="block w-full px-4 py-3 text-left hover:bg-slate-50"
                        >
                          {
                            diagnosis.name
                          }
                        </button>

                      )
                    )}

                </div>

              )}

            </div>

          </div>

        </section>


        {/* RAPID REVIEW */}

        <section className="mt-6 rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">

          <div className="flex items-center justify-between">

            <div>

              <h2 className="text-xl font-semibold text-slate-900">
                Rapid Review
              </h2>

              <p className="mt-1 text-sm text-slate-500">
                Add 3–4 questions to consolidate the diagnosis.
              </p>

            </div>


            <button
              type="button"
              onClick={
                addReviewQuestion
              }
              className="rounded-xl bg-slate-900 px-4 py-2 font-medium text-white"
            >
              + Add Question
            </button>

          </div>


          {reviewQuestions.length ===
            0 && (

            <div className="mt-6 rounded-xl border border-dashed border-slate-300 p-8 text-center text-sm text-slate-400">
              No review questions added yet.
            </div>

          )}


          <div className="mt-6 space-y-6">

            {reviewQuestions.map(
              (question, index) => (

                <div
                  key={question.id}
                  className="rounded-2xl border bg-slate-50 p-5"
                >

                  <div className="flex items-center justify-between">

                    <div>

                      <span className="text-xs font-semibold uppercase text-blue-600">
                        Question{" "}
                        {index + 1}
                      </span>

                    </div>

                    <button
                      type="button"
                      onClick={() =>
                        deleteReviewQuestion(
                          question.id
                        )
                      }
                      className="text-sm text-red-500"
                    >
                      Delete
                    </button>

                  </div>


                  {/* CATEGORY */}

                  <div className="mt-4">

                    <label className="text-sm font-medium text-slate-700">
                      Category
                    </label>

                    <select
                      value={
                        question.category
                      }
                      onChange={(e) =>
                        updateReviewQuestion(
                          question.id,
                          "category",
                          e.target.value
                        )
                      }
                      className="mt-2 w-full rounded-xl border bg-white p-3"
                    >

                      <option value="diagnosis">
                        Diagnosis
                      </option>

                      <option value="investigation">
                        Investigation
                      </option>

                      <option value="treatment">
                        Treatment
                      </option>

                      <option value="follow-up">
                        Follow-up
                      </option>

                      <option value="complication">
                        Complication
                      </option>

                      <option value="risk-factor">
                        Risk Factor
                      </option>

                    </select>

                  </div>


                  {/* QUESTION */}

                  <div className="mt-4">

                    <label className="text-sm font-medium text-slate-700">
                      Question
                    </label>

                    <textarea
                      value={
                        question.question
                      }
                      onChange={(e) =>
                        updateReviewQuestion(
                          question.id,
                          "question",
                          e.target.value
                        )
                      }
                      rows={3}
                      placeholder="Write the review question..."
                      className="mt-2 w-full resize-none rounded-xl border bg-white p-3"
                    />

                  </div>


                  {/* OPTIONS */}

                  <div className="mt-4">

                    <label className="text-sm font-medium text-slate-700">
                      Options
                    </label>

                    <div className="mt-2 space-y-2">

                      {question.options.map(
                        (option) => (

                          <div
                            key={
                              option.id
                            }
                            className="flex items-center gap-3"
                          >

                            <span className="w-6 text-center text-sm font-semibold text-slate-400">
                              {
                                option.id.toUpperCase()
                              }
                            </span>

                            <input
                              value={
                                option.text
                              }
                              onChange={(
                                e
                              ) =>
                                updateReviewOption(
                                  question.id,
                                  option.id,
                                  e.target.value
                                )
                              }
                              placeholder={`Option ${option.id.toUpperCase()}`}
                              className="flex-1 rounded-xl border bg-white p-3"
                            />

                          </div>

                        )
                      )}

                    </div>

                  </div>


                  {/* CORRECT ANSWER */}

                  <div className="mt-4">

                    <label className="text-sm font-medium text-slate-700">
                      Correct Answer
                    </label>

                    <select
                      value={
                        question.correctOptionId
                      }
                      onChange={(e) =>
                        updateReviewQuestion(
                          question.id,
                          "correctOptionId",
                          e.target.value
                        )
                      }
                      className="mt-2 w-full rounded-xl border bg-white p-3"
                    >

                      {question.options.map(
                        (option) => (

                          <option
                            key={
                              option.id
                            }
                            value={
                              option.id
                            }
                          >
                            Option{" "}
                            {option.id.toUpperCase()}
                          </option>

                        )
                      )}

                    </select>

                  </div>


                  {/* EXPLANATION */}

                  <div className="mt-4">

                    <label className="text-sm font-medium text-slate-700">
                      Explanation
                    </label>

                    <textarea
                      value={
                        question.explanation
                      }
                      onChange={(e) =>
                        updateReviewQuestion(
                          question.id,
                          "explanation",
                          e.target.value
                        )
                      }
                      rows={3}
                      placeholder="Explain why the correct answer is correct..."
                      className="mt-2 w-full resize-none rounded-xl border bg-white p-3"
                    />

                  </div>

                </div>

              )
            )}

          </div>

        </section>


        {/* JSON PREVIEW */}

        <section className="mt-6 rounded-2xl bg-slate-900 p-6 text-white">

          <h2 className="text-xl font-semibold">
            Case Data Preview
          </h2>

          <p className="mt-1 text-sm text-slate-400">
            This is the object that will eventually be stored in the database.
          </p>


        </section>

      </div>

    </main>
  );
}