import type {
  Case,
  CaseStage,
  Investigation,
  HistoryStage,
  PhysicalExamStage,
} from "../types/case";

import type { Diagnosis } from "../data/diseases";

/* ─────────────────────────────────────────
   DIAGNOSIS ATTEMPTS
───────────────────────────────────────── */

export type DiagnosisAttempt = {
  diagnosis: Diagnosis;
  correct: boolean;
};

/* ─────────────────────────────────────────
   CASE STATE
───────────────────────────────────────── */

export type CaseState = {
  currentStageIndex: number;
  currentHintIndex: number;

  attempts: DiagnosisAttempt[];

  completedInvestigations: string[];

  activeInvestigationId: string | null;

  completed: boolean;
};

/* ─────────────────────────────────────────
   INITIAL STATE
───────────────────────────────────────── */

export function createInitialCaseState(): CaseState {
  return {
    currentStageIndex: 0,
    currentHintIndex: 0,

    attempts: [],

    completedInvestigations: [],

    activeInvestigationId: null,

    completed: false,
  };
}

/* ─────────────────────────────────────────
   CURRENT STAGE
───────────────────────────────────────── */

export function getCurrentStage(
  caseData: Case,
  state: CaseState
): CaseStage | null {
  return (
    caseData.stages[state.currentStageIndex] ??
    null
  );
}

/* ─────────────────────────────────────────
   HINT STAGE
───────────────────────────────────────── */

function getHintStage(
  stage: CaseStage | null
): HistoryStage | PhysicalExamStage | null {
  if (!stage) {
    return null;
  }

  if (
    stage.type === "history" ||
    stage.type === "physical-exam"
  ) {
    return stage;
  }

  return null;
}

/* ─────────────────────────────────────────
   VISIBLE HINTS
───────────────────────────────────────── */

export function getVisibleHints(
  caseData: Case,
  state: CaseState
) {
  const stage = getCurrentStage(
    caseData,
    state
  );

  const hintStage = getHintStage(stage);

  if (!hintStage) {
    return [];
  }

  return hintStage.hints.slice(
    0,
    state.currentHintIndex + 1
  );
}

/* ─────────────────────────────────────────
   REVEAL NEXT HINT
───────────────────────────────────────── */

export function revealNextHint(
  caseData: Case,
  state: CaseState
): CaseState {
  const stage = getCurrentStage(
    caseData,
    state
  );

  const hintStage = getHintStage(stage);

  if (!hintStage) {
    return state;
  }

  const hasMoreHints =
    state.currentHintIndex <
    hintStage.hints.length - 1;

  if (!hasMoreHints) {
    return state;
  }

  return {
    ...state,

    currentHintIndex:
      state.currentHintIndex + 1,
  };
}

/* ─────────────────────────────────────────
   MOVE TO NEXT STAGE
───────────────────────────────────────── */

export function moveToNextStage(
  caseData: Case,
  state: CaseState
): CaseState {
  const nextStageIndex =
    state.currentStageIndex + 1;

  if (
    nextStageIndex >=
    caseData.stages.length
  ) {
    return state;
  }

  return {
    ...state,

    currentStageIndex:
      nextStageIndex,

    currentHintIndex: 0,

    activeInvestigationId: null,
  };
}

/* ─────────────────────────────────────────
   DIAGNOSIS NORMALIZATION
───────────────────────────────────────── */

function normalizeDiagnosis(
  value: string
): string {
  return value
    .trim()
    .toLowerCase()
    .replace(/\s+/g, " ");
}

/* ─────────────────────────────────────────
   CHECK DIAGNOSIS
───────────────────────────────────────── */

export function isCorrectDiagnosis(
  input: string,
  correctDiagnosis: Diagnosis
): boolean {
  const normalizedInput =
    normalizeDiagnosis(input);

  if (
    normalizedInput ===
    normalizeDiagnosis(
      correctDiagnosis.name
    )
  ) {
    return true;
  }

  return correctDiagnosis.synonyms.some(
    (synonym) =>
      normalizeDiagnosis(synonym) ===
      normalizedInput
  );
}

/* ─────────────────────────────────────────
   SUBMIT DIAGNOSIS
───────────────────────────────────────── */

export function submitDiagnosis(
  caseData: Case,
  state: CaseState,
  selectedDiagnosis: Diagnosis
): CaseState {
  const correct =
    isCorrectDiagnosis(
      selectedDiagnosis.name,
      caseData.diagnosis
    );

  const newAttempt: DiagnosisAttempt = {
    diagnosis: selectedDiagnosis,
    correct,
  };

  /*
   * Correct diagnosis
   */

  if (correct) {
    return {
      ...state,

      attempts: [
        ...state.attempts,
        newAttempt,
      ],

      completed: true,
    };
  }

  /*
   * Wrong diagnosis
   */

  const stage =
    getCurrentStage(
      caseData,
      state
    );

  /*
   * Investigation stage:
   *
   * A wrong diagnosis does NOT
   * move the user out of the
   * investigation stage.
   */

  if (
    stage &&
    stage.type === "investigation"
  ) {
    return {
      ...state,

      attempts: [
        ...state.attempts,
        newAttempt,
      ],
    };
  }

  /*
   * History / Physical Exam:
   *
   * Reveal the next hint if available.
   */

  const hintStage =
    getHintStage(stage);

  if (
    hintStage &&
    state.currentHintIndex <
      hintStage.hints.length - 1
  ) {
    return {
      ...state,

      attempts: [
        ...state.attempts,
        newAttempt,
      ],

      currentHintIndex:
        state.currentHintIndex + 1,
    };
  }

  /*
   * No more hints in the current stage.
   *
   * Move to the next stage.
   */

  const nextStageIndex =
    state.currentStageIndex + 1;

  if (
    nextStageIndex <
    caseData.stages.length
  ) {
    return {
      ...state,

      attempts: [
        ...state.attempts,
        newAttempt,
      ],

      currentStageIndex:
        nextStageIndex,

      currentHintIndex: 0,

      activeInvestigationId: null,
    };
  }

  /*
   * No more stages.
   *
   * Diagnosis was incorrect,
   * so the case remains active.
   */

  return {
    ...state,

    attempts: [
      ...state.attempts,
      newAttempt,
    ],
  };
}

/* ─────────────────────────────────────────
   INVESTIGATIONS
───────────────────────────────────────── */

function getInvestigationStage(
  stage: CaseStage | null
): Investigation[] {
  if (
    !stage ||
    stage.type !== "investigation"
  ) {
    return [];
  }

  return stage.investigations;
}

/* ─────────────────────────────────────────
   AVAILABLE INVESTIGATIONS
───────────────────────────────────────── */

export function getAvailableInvestigations(
  caseData: Case,
  state: CaseState
) {
  const stage =
    getCurrentStage(
      caseData,
      state
    );

  const investigations =
    getInvestigationStage(stage);

  return investigations.filter(
    (investigation) =>
      !state.completedInvestigations.includes(
        investigation.id
      )
  );
}

/* ─────────────────────────────────────────
   REQUEST INVESTIGATION
───────────────────────────────────────── */

export function requestInvestigation(
  caseData: Case,
  state: CaseState,
  investigationId: string
): CaseState {
  const stage =
    getCurrentStage(
      caseData,
      state
    );

  const investigations =
    getInvestigationStage(stage);

  const investigation =
    investigations.find(
      (item) =>
        item.id === investigationId
    );

  if (!investigation) {
    return state;
  }

  if (
    state.completedInvestigations.includes(
      investigationId
    )
  ) {
    return state;
  }

  return {
    ...state,

    activeInvestigationId:
      investigationId,

    completedInvestigations: [
      ...state.completedInvestigations,
      investigationId,
    ],
  };
}

/* ─────────────────────────────────────────
   ACTIVE INVESTIGATION
───────────────────────────────────────── */

export function getActiveInvestigation(
  caseData: Case,
  state: CaseState
): Investigation | null {
  if (
    !state.activeInvestigationId
  ) {
    return null;
  }

  const stage =
    getCurrentStage(
      caseData,
      state
    );

  const investigations =
    getInvestigationStage(stage);

  return (
    investigations.find(
      (investigation) =>
        investigation.id ===
        state.activeInvestigationId
    ) ?? null
  );
}