import { diseases } from "../data/diseases";
import type { Case, CaseStage } from "../types/case";

export type CaseValidationError = {
  field: string;
  message: string;
};

function duplicateValues(values: string[]) {
  const seen = new Set<string>();
  const duplicates = new Set<string>();

  for (const value of values) {
    if (seen.has(value)) duplicates.add(value);
    seen.add(value);
  }

  return [...duplicates];
}

function stageTypeLabel(stage: CaseStage) {
  return stage.type === "physical-exam"
    ? "Physical Exam"
    : stage.type === "investigation"
      ? "Investigation"
      : "History";
}

export function validateCase(caseData: Case): CaseValidationError[] {
  const errors: CaseValidationError[] = [];

  if (!caseData.id?.trim()) {
    errors.push({ field: "id", message: "Case ID is required." });
  }

  if (!caseData.title.trim()) {
    errors.push({ field: "title", message: "Case title is required." });
  }

  if (!caseData.presentation.trim()) {
    errors.push({ field: "presentation", message: "Initial presentation is required." });
  }

  if (!Number.isFinite(caseData.patient.age) || caseData.patient.age <= 0) {
    errors.push({ field: "patient.age", message: "Patient age must be a positive number." });
  }

  if (caseData.stages.length === 0) {
    errors.push({ field: "stages", message: "At least one clinical stage is required." });
  }

  const stageIdDuplicates = duplicateValues(caseData.stages.map((stage) => stage.id));
  stageIdDuplicates.forEach((id) => {
    errors.push({ field: "stages.id", message: `Duplicate stage ID: "${id}".` });
  });

  const stageTypes = caseData.stages.map((stage) => stage.type);
  const duplicateStageTypes = duplicateValues(stageTypes);
  duplicateStageTypes.forEach((type) => {
    errors.push({ field: "stages.type", message: `Duplicate stage type: "${type}".` });
  });

  (['history', 'physical-exam', 'investigation'] as const).forEach((requiredType) => {
    if (!stageTypes.includes(requiredType)) {
      errors.push({
        field: "stages.type",
        message: `Missing required ${requiredType} stage for a playable case.`,
      });
    }
  });

  caseData.stages.forEach((stage, stageIndex) => {
    const stageLabel = stageTypeLabel(stage);

    if (!stage.title.trim()) {
      errors.push({
        field: `stages.${stageIndex}.title`,
        message: `${stageLabel} stage title is required.`,
      });
    }

    if (stage.type === "history" || stage.type === "physical-exam") {
      if (stage.hints.length === 0) {
        errors.push({
          field: `stages.${stageIndex}.hints`,
          message: `${stageLabel} needs at least one hint.`,
        });
      }

      const hintIds = stage.hints.map((hint) => hint.id);
      duplicateValues(hintIds).forEach((id) => {
        errors.push({
          field: `stages.${stageIndex}.hints.id`,
          message: `Duplicate hint ID: "${id}".`,
        });
      });

      const sourceIds = stage.hints
        .map((hint) => hint.sourceId?.trim())
        .filter((value): value is string => Boolean(value));

      duplicateValues(sourceIds).forEach((sourceId) => {
        errors.push({
          field: `stages.${stageIndex}.hints.sourceId`,
          message: `Duplicate sourceId: "${sourceId}".`,
        });
      });

      stage.hints.forEach((hint, hintIndex) => {
        if (!hint.content.trim()) {
          errors.push({
            field: `stages.${stageIndex}.hints.${hintIndex}.content`,
            message: "Hint content cannot be empty.",
          });
        }
        if (hint.label !== undefined && !hint.label.trim()) {
          errors.push({
            field: `stages.${stageIndex}.hints.${hintIndex}.label`,
            message: "Hint label cannot be empty when provided.",
          });
        }
      });
    }

    if (stage.type === "investigation") {
      if (stage.investigations.length === 0) {
        errors.push({
          field: `stages.${stageIndex}.investigations`,
          message: "Investigation stage needs at least one investigation.",
        });
      }

      const investigationIds = stage.investigations.map((investigation) => investigation.id);
      duplicateValues(investigationIds).forEach((id) => {
        errors.push({
          field: `stages.${stageIndex}.investigations.id`,
          message: `Duplicate investigation ID: "${id}".`,
        });
      });

      const investigationNames = stage.investigations.map((investigation) => investigation.name.trim().toLowerCase());
      duplicateValues(investigationNames).forEach((name) => {
        errors.push({
          field: `stages.${stageIndex}.investigations.name`,
          message: `Duplicate investigation name: "${name}".`,
        });
      });

      stage.investigations.forEach((investigation, investigationIndex) => {
        if (!investigation.name.trim()) {
          errors.push({
            field: `stages.${stageIndex}.investigations.${investigationIndex}.name`,
            message: "Investigation name is required.",
          });
        }

        if (!investigation.category.trim()) {
          errors.push({
            field: `stages.${stageIndex}.investigations.${investigationIndex}.category`,
            message: "Investigation category is required.",
          });
        }

        if (investigation.findings.length === 0) {
          errors.push({
            field: `stages.${stageIndex}.investigations.${investigationIndex}.findings`,
            message: "Investigation needs at least one finding.",
          });
        }

        investigation.findings.forEach((finding, findingIndex) => {
          if (!finding.label.trim()) {
            errors.push({
              field: `stages.${stageIndex}.investigations.${investigationIndex}.findings.${findingIndex}.label`,
              message: "Finding label is required.",
            });
          }
          if (!finding.value.trim()) {
            errors.push({
              field: `stages.${stageIndex}.investigations.${investigationIndex}.findings.${findingIndex}.value`,
              message: "Finding value is required.",
            });
          }
        });
      });
    }
  });

  if (!caseData.diagnosis?.id) {
    errors.push({ field: "diagnosis", message: "A correct diagnosis must be selected." });
  } else if (!diseases.some((disease) => disease.id === caseData.diagnosis.id)) {
    errors.push({ field: "diagnosis", message: `Unknown diagnosis ID: "${caseData.diagnosis.id}".` });
  }

  if (caseData.candidateDiagnosisIds.length === 0) {
    errors.push({ field: "candidateDiagnosisIds", message: "At least one candidate diagnosis is required." });
  }

  duplicateValues(caseData.candidateDiagnosisIds).forEach((id) => {
    errors.push({
      field: "candidateDiagnosisIds",
      message: `Duplicate candidate diagnosis ID: "${id}".`,
    });
  });

  caseData.candidateDiagnosisIds.forEach((id) => {
    if (!diseases.some((disease) => disease.id === id)) {
      errors.push({
        field: "candidateDiagnosisIds",
        message: `Unknown candidate diagnosis ID: "${id}".`,
      });
    }
  });

  // The correct diagnosis is expected to be part of the candidate pool.
  if (
    caseData.diagnosis?.id &&
    !caseData.candidateDiagnosisIds.includes(caseData.diagnosis.id)
  ) {
    errors.push({
      field: "candidateDiagnosisIds",
      message: "The correct diagnosis must be included in the candidate list.",
    });
  }

  const reviewQuestionIds = caseData.reviewQuestions.map((question) => question.id);
  duplicateValues(reviewQuestionIds).forEach((id) => {
    errors.push({
      field: "reviewQuestions.id",
      message: `Duplicate review question ID: "${id}".`,
    });
  });

  caseData.reviewQuestions.forEach((question, questionIndex) => {
    if (!question.question.trim()) {
      errors.push({
        field: `reviewQuestions.${questionIndex}.question`,
        message: "Review question cannot be empty.",
      });
    }

    if (question.options.length !== 4) {
      errors.push({
        field: `reviewQuestions.${questionIndex}.options`,
        message: "Each review question must have exactly 4 options.",
      });
    }

    duplicateValues(question.options.map((option) => option.id)).forEach((id) => {
      errors.push({
        field: `reviewQuestions.${questionIndex}.options`,
        message: `Duplicate review option ID: "${id}".`,
      });
    });

    question.options.forEach((option, optionIndex) => {
      if (!option.text.trim()) {
        errors.push({
          field: `reviewQuestions.${questionIndex}.options.${optionIndex}`,
          message: "Review option cannot be empty.",
        });
      }
    });

    if (!question.options.some((option) => option.id === question.correctOptionId)) {
      errors.push({
        field: `reviewQuestions.${questionIndex}.correctOptionId`,
        message: "The correct answer must match one of the options.",
      });
    }

    if (!question.explanation.trim()) {
      errors.push({
        field: `reviewQuestions.${questionIndex}.explanation`,
        message: "Review question explanation is required.",
      });
    }
  });

  return errors;
}
