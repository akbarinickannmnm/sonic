import type { Diagnosis } from "../data/diseases";

/* ─────────────────────────────────────────
   BASIC TYPES
───────────────────────────────────────── */

export type Difficulty =
  | "easy"
  | "medium"
  | "hard";

export type Course =
  | "cardiology"
  | "pulmonology"
  | "gastroenterology"
  | "neurology"
  | "infectious-disease";


/* ─────────────────────────────────────────
   INVESTIGATIONS
───────────────────────────────────────── */

export type InvestigationRelevance =
  | "high"
  | "low"
  | "non-contributory";

export type InvestigationFinding = {
  label: string;
  value: string;
};

export type Investigation = {
  id: string;
  /** Stable bank item ID. The runtime `id` remains the case-local instance ID. */
  sourceId?: string;
  name: string;
  category: string;

  findings: InvestigationFinding[];

  relevance: InvestigationRelevance;
};


/* ─────────────────────────────────────────
   CASE HINTS
───────────────────────────────────────── */

export type CaseHint = {
  id: string;
  content: string;
  sourceId?: string;
  label?: string;
};


/* ─────────────────────────────────────────
   CASE STAGES
───────────────────────────────────────── */

export type CaseStageType =
  | "history"
  | "physical-exam"
  | "investigation";


export type HistoryStage = {
  id: string;
  type: "history";
  title: string;

  hints: CaseHint[];
};


export type PhysicalExamStage = {
  id: string;
  type: "physical-exam";
  title: string;

  hints: CaseHint[];
};


export type InvestigationStage = {
  id: string;
  type: "investigation";
  title: string;

  investigations: Investigation[];
};


/*
  A Case can contain any combination
  and number of these stages.
*/

export type CaseStage =
  | HistoryStage
  | PhysicalExamStage
  | InvestigationStage;


/* ─────────────────────────────────────────
   REVIEW QUIZ
───────────────────────────────────────── */

export type ReviewQuestionCategory =
  | "diagnosis"
  | "investigation"
  | "treatment"
  | "follow-up"
  | "complication"
  | "risk-factor";


export type ReviewOption = {
  id: string;
  text: string;
};


export type ReviewQuestion = {
  id: string;

  category: ReviewQuestionCategory;

  question: string;

  options: ReviewOption[];

  correctOptionId: string;

  explanation: string;
};


/* ─────────────────────────────────────────
   CASE
───────────────────────────────────────── */

export type Case = {
  id: string;

  title: string;

  course: Course;

  tags: string[];

  difficulty: Difficulty;


  /* Patient information */

  patient: {
    age: number;
    sex: "male" | "female";
  };


  /* Initial presentation */

  presentation: string;


  /*
    Dynamic clinical stages.

    A case may have:
    - only history
    - history + physical exam
    - history + investigation
    - history + physical exam + investigation
    - multiple investigation stages
    - etc.
  */

  stages: CaseStage[];


  /* Final diagnosis */

  diagnosis: Diagnosis;


  /*
    Diagnoses that can appear
    in the candidate pool.
  */

  candidateDiagnosisIds: string[];


  /* Post-case rapid review */

  reviewQuestions: ReviewQuestion[];
};