import type { Case, Course } from "../types/case";
import { cases as masterCaseBank } from "./cases";
import { validateCase } from "../lib/caseValidator";
import {
  pulmonologyQuestionBank,
  pulmonologyQuestionCategories,
} from "./pulmonologyQuestionBank";
import {
  pulmonologyPhysicalExamBank,
  physicalExamCategories as pulmonologyPhysicalExamCategories,
} from "./pulmonologyPhysicalExamBank";
import {
  pulmonologyInvestigationBank,
  investigationCategories as pulmonologyInvestigationCategories,
} from "./pulmonologyInvestigationBank";
import {
  cardiologyQuestionBank,
  cardiologyQuestionCategories,
} from "./cardiologyQuestionBank";
import {
  cardiologyPhysicalExamBank,
  cardiologyPhysicalExamCategories,
} from "./cardiologyPhysicalExamBank";
import {
  cardiologyInvestigationBank,
  cardiologyInvestigationCategories,
} from "./cardiologyInvestigationBank";
import {
  nephrologyQuestionBank,
  nephrologyQuestionCategories,
} from "./nephrologyQuestionBank";
import {
  nephrologyPhysicalExamBank,
  nephrologyPhysicalExamCategories,
} from "./nephrologyPhysicalExamBank";
import {
  nephrologyInvestigationBank,
  nephrologyInvestigationCategories,
} from "./nephrologyInvestigationBank";
import { gastroenterologyQuestionBank, gastroenterologyQuestionCategories } from "./gastroenterologyQuestionBank";
import { gastroenterologyPhysicalExamBank, gastroenterologyPhysicalExamSections } from "./gastroenterologyPhysicalExamBank";
import { gastroenterologyInvestigationBank, gastroenterologyInvestigationSections } from "./gastroenterologyInvestigationBank";
import { endocrinologyQuestionBank, endocrinologyQuestionCategories } from "./endocrinologyQuestionBank";
import { endocrinologyPhysicalExamBank, endocrinologyPhysicalExamSections } from "./endocrinologyPhysicalExamBank";
import { endocrinologyInvestigationBank, endocrinologyInvestigationSections } from "./endocrinologyInvestigationBank";
import { hematologyOncologyQuestionBank, hematologyOncologyQuestionCategories } from "./hematologyOncologyQuestionBank";
import { hematologyOncologyPhysicalExamBank, hematologyOncologyPhysicalExamSections } from "./hematologyOncologyPhysicalExamBank";
import { hematologyOncologyInvestigationBank, hematologyOncologyInvestigationSections } from "./hematologyOncologyInvestigationBank";

export type BankCategory = { id: string; label: string };

export type HistoryBankItem = {
  id: string;
  category: string;
  level: string;
  text: string;
  answersByCase: Record<string, string>;
};

export type PhysicalExamBankItem = {
  id: string;
  category: string;
  title: string;
  description: string;
  answersByCase: Record<string, string>;
};

export type InvestigationBankItem = {
  id: string;
  category: string;
  title: string;
  description: string;
  genericAnswer?: string;
  answersByCase: Record<string, string>;
};

export type CourseBank = {
  course: Course;
  history: HistoryBankItem[];
  physicalExam: PhysicalExamBankItem[];
  investigations: InvestigationBankItem[];
  historyCategories: BankCategory[];
  physicalExamCategories: BankCategory[];
  investigationCategories: BankCategory[];
};

export type MasterCaseBank = Case[];

export function getMasterCaseBank(extraCases: Case[] = []): MasterCaseBank {
  const merged = new Map<string, Case>();

  for (const caseData of masterCaseBank) {
    merged.set(caseData.id, caseData);
  }

  for (const caseData of extraCases) {
    merged.set(caseData.id, caseData);
  }

  if (typeof window === "undefined") {
    return [...merged.values()];
  }

  try {
    const raw = window.localStorage.getItem("sonic-cases");
    if (raw) {
      const parsed: unknown = JSON.parse(raw);
      if (Array.isArray(parsed)) {
        for (const value of parsed) {
          if (value && typeof value === "object" && typeof (value as { id?: unknown }).id === "string") {
            const candidate = value as Case;
            if (validateCase(candidate).length === 0) {
              merged.set(candidate.id, candidate);
            }
          }
        }
      }
    }
  } catch {
    // Keep the built-in master bank usable when local storage is unavailable/corrupt.
  }

  return [...merged.values()];
}

function normalize(value: string) {
  return value
    .trim()
    .toLowerCase()
    .replace(/[–—−]/g, "-")
    .replace(/[^a-z0-9]+/g, " ")
    .replace(/\s+/g, " ")
    .trim();
}

function nonEmptyCategories(
  categories: readonly BankCategory[],
  items: Array<{ category: string }>,
) {
  const used = new Set(items.map((item) => item.category));
  return categories.filter((category) => used.has(category.id));
}

function addAnswer(
  map: Record<string, string>,
  caseId: string,
  value: string | undefined,
) {
  if (value?.trim()) map[caseId] = value.trim();
}

function buildHistoryBank(course: Course, bankCases: Case[]): HistoryBankItem[] {
  const definitions = course === "cardiology" ? cardiologyQuestionBank : course === "nephrology" ? nephrologyQuestionBank : course === "gastroenterology" ? gastroenterologyQuestionBank : course === "endocrinology" ? endocrinologyQuestionBank : course === "hematology-oncology" ? hematologyOncologyQuestionBank : pulmonologyQuestionBank;

  return definitions.map((question) => {
    const answersByCase: Record<string, string> = {};

    for (const caseData of bankCases) {
      if (caseData.course !== course) continue;

      for (const stage of caseData.stages) {
        if (stage.type !== "history") continue;
        const answer = stage.hints.find((hint) => hint.sourceId === question.id);
        addAnswer(answersByCase, caseData.id, answer?.content);
      }
    }

    return {
      id: question.id,
      category: question.category,
      level: question.level,
      text: question.text,
      answersByCase,
    };
  });
}

function buildPhysicalExamBank(course: Course, bankCases: Case[]): PhysicalExamBankItem[] {
  const definitions = course === "cardiology" ? cardiologyPhysicalExamBank : course === "nephrology" ? nephrologyPhysicalExamBank : course === "gastroenterology" ? gastroenterologyPhysicalExamBank : course === "endocrinology" ? endocrinologyPhysicalExamBank : course === "hematology-oncology" ? hematologyOncologyPhysicalExamBank : pulmonologyPhysicalExamBank;
  const items = definitions.map((item) => ({
    id: item.id,
    category: "category" in item ? item.category : item.section,
    title: item.title,
    description: item.description,
    answersByCase: {} as Record<string, string>,
  }));
  const byId = new Map(items.map((item) => [item.id, item]));

  for (const caseData of bankCases) {
    if (caseData.course !== course) continue;
    for (const stage of caseData.stages) {
      if (stage.type !== "physical-exam") continue;
      for (const hint of stage.hints) {
        const normalizedLabel = normalize(hint.label ?? "");
        const direct = hint.sourceId ? byId.get(hint.sourceId) : undefined;
        const byTitle = items.find((item) => normalize(item.title) === normalizedLabel);
        const target = direct ?? byTitle;

        if (target) {
          addAnswer(target.answersByCase, caseData.id, hint.content);
          continue;
        }

        // Legacy cases used a generic "Physical Examination" label instead of a
        // reusable bank item ID. Preserve those answers in one reusable custom item.
        const legacyId = `legacy-physical:${normalizedLabel || "findings"}`;
        let legacy = byId.get(legacyId);
        if (!legacy) {
          legacy = {
            id: legacyId,
            category: "general",
            title: hint.label?.trim() || "یافته‌های معاینه فیزیکی",
            description: "آیتم معاینه فیزیکی استخراج‌شده از کیس‌های قدیمی.",
            answersByCase: {},
          };
          items.push(legacy);
          byId.set(legacyId, legacy);
        }
        addAnswer(legacy.answersByCase, caseData.id, hint.content);
      }
    }
  }

  return items;
}

function buildInvestigationBank(course: Course, bankCases: Case[]): InvestigationBankItem[] {
  const definitions = course === "cardiology" ? cardiologyInvestigationBank : course === "nephrology" ? nephrologyInvestigationBank : course === "gastroenterology" ? gastroenterologyInvestigationBank : course === "endocrinology" ? endocrinologyInvestigationBank : course === "hematology-oncology" ? hematologyOncologyInvestigationBank : pulmonologyInvestigationBank;
  const items: InvestigationBankItem[] = definitions.map((item) => ({
    id: item.id,
    category: "category" in item ? item.category : item.section,
    title: item.title,
    description: item.description,
    genericAnswer: "answer" in item && typeof item.answer === "string" ? item.answer : undefined,
    answersByCase: {},
  }));
  const byId = new Map(items.map((item) => [item.id, item]));

  for (const caseData of bankCases) {
    if (caseData.course !== course) continue;
    for (const stage of caseData.stages) {
      if (stage.type !== "investigation") continue;
      for (const investigation of stage.investigations) {
        const normalizedName = normalize(investigation.name);
        const direct = investigation.sourceId ? byId.get(investigation.sourceId) : undefined;
        const byTitle = items.find((item) => {
          const title = normalize(item.title);
          return title === normalizedName || normalizedName.includes(title) || title.includes(normalizedName);
        });
        const target = direct ?? byTitle;

        const answer = investigation.findings?.map(
          (finding) => `${finding.label}: ${finding.value}`
        ).join("\n");

        if (target) {
          addAnswer(target.answersByCase, caseData.id, answer);
          continue;
        }

        const legacyId = `legacy-investigation:${normalizedName || "unnamed"}`;
        let legacy = byId.get(legacyId);
        if (!legacy) {
          legacy = {
            id: legacyId,
            category: "procedures",
            title: investigation.name.trim() || "بررسی اختصاصی",
            description: "آیتم بررسی استخراج‌شده از کیس‌های قدیمی.",
            answersByCase: {},
          };
          items.push(legacy);
          byId.set(legacyId, legacy);
        }
        addAnswer(legacy.answersByCase, caseData.id, answer);
      }
    }
  }

  return items;
}

export function getCourseBank(course: Course, extraCases: Case[] = []): CourseBank {
  const bankCases = getMasterCaseBank(extraCases);
  const history = buildHistoryBank(course, bankCases);
  const physicalExam = buildPhysicalExamBank(course, bankCases);
  const investigations = buildInvestigationBank(course, bankCases);

  const historyCategories: BankCategory[] = [...(course === "cardiology" ? cardiologyQuestionCategories : course === "nephrology" ? nephrologyQuestionCategories : course === "gastroenterology" ? gastroenterologyQuestionCategories : course === "endocrinology" ? endocrinologyQuestionCategories : course === "hematology-oncology" ? hematologyOncologyQuestionCategories : pulmonologyQuestionCategories)];
  const physicalExamCategories: BankCategory[] = [...(course === "cardiology" ? cardiologyPhysicalExamCategories : course === "nephrology" ? nephrologyPhysicalExamCategories : course === "gastroenterology" ? gastroenterologyPhysicalExamSections : course === "endocrinology" ? endocrinologyPhysicalExamSections : course === "hematology-oncology" ? hematologyOncologyPhysicalExamSections : pulmonologyPhysicalExamCategories)];
  const investigationCategories: BankCategory[] = [...(course === "cardiology" ? cardiologyInvestigationCategories : course === "nephrology" ? nephrologyInvestigationCategories : course === "gastroenterology" ? gastroenterologyInvestigationSections : course === "endocrinology" ? endocrinologyInvestigationSections : course === "hematology-oncology" ? hematologyOncologyInvestigationSections : pulmonologyInvestigationCategories)];
  const allInvestigationCategories = [
    ...investigationCategories,
    { id: "procedures", label: "پروسیجرها / اختصاصی" },
  ];

  return {
    course,
    history,
    physicalExam,
    investigations,
    historyCategories,
    physicalExamCategories: nonEmptyCategories(physicalExamCategories, physicalExam),
    investigationCategories: nonEmptyCategories(allInvestigationCategories, investigations),
  };
}

export function findHistoryAnswer(caseData: Case, questionId: string) {
  const item = getCourseBank(caseData.course, [caseData]).history.find((question) => question.id === questionId);
  return item?.answersByCase[caseData.id] ?? null;
}

