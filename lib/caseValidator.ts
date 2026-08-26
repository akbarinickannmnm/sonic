import type { Case } from "../types/case";

export type CaseValidationError = {
  field: string;
  message: string;
};

export function validateCase(
  caseData: Case
): CaseValidationError[] {
  const errors: CaseValidationError[] = [];

  /* ─────────────────────────────
     BASIC INFORMATION
  ───────────────────────────── */

  if (!caseData.title.trim()) {
    errors.push({
      field: "title",
      message: "Case title is required.",
    });
  }

  if (!caseData.presentation.trim()) {
    errors.push({
      field: "presentation",
      message:
        "Initial presentation is required.",
    });
  }

  if (!caseData.patient.age) {
    errors.push({
      field: "patient.age",
      message:
        "Patient age is required.",
    });
  }

  /* ─────────────────────────────
     STAGES
  ───────────────────────────── */

  if (caseData.stages.length === 0) {
    errors.push({
      field: "stages",
      message:
        "At least one clinical stage is required.",
    });
  }

  caseData.stages.forEach(
    (stage, stageIndex) => {
      if (!stage.title.trim()) {
        errors.push({
          field: `stages.${stageIndex}.title`,
          message:
            "Stage title is required.",
        });
      }

      /* History / Physical Exam */

      if (
        stage.type === "history" ||
        stage.type === "physical-exam"
      ) {
        if (stage.hints.length === 0) {
          errors.push({
            field: `stages.${stageIndex}.hints`,
            message:
              "This stage needs at least one hint.",
          });
        }

        stage.hints.forEach(
          (hint, hintIndex) => {
            if (!hint.content.trim()) {
              errors.push({
                field: `stages.${stageIndex}.hints.${hintIndex}`,
                message:
                  "Hint content cannot be empty.",
              });
            }
          }
        );
      }

      /* Investigation */

      if (stage.type === "investigation") {
        if (stage.investigations.length === 0) {
          errors.push({
            field: `stages.${stageIndex}.investigations`,
            message: "Investigation stage needs at least one investigation.",
          });
        }

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
    }
  );

  /* ─────────────────────────────
     DIAGNOSIS
  ───────────────────────────── */

  if (
    !caseData.diagnosis ||
    !caseData.diagnosis.id
  ) {
    errors.push({
      field: "diagnosis",
      message:
        "A correct diagnosis must be selected.",
    });
  }

  /* ─────────────────────────────
     CANDIDATE DIAGNOSES
  ───────────────────────────── */

  if (
    caseData.candidateDiagnosisIds.length ===
    0
  ) {
    errors.push({
      field:
        "candidateDiagnosisIds",
      message:
        "At least one candidate diagnosis is required.",
    });
  }

  if (
    caseData.diagnosis &&
    caseData.candidateDiagnosisIds.includes(
      caseData.diagnosis.id
    )
  ) {
    errors.push({
      field: "candidateDiagnosisIds",
      message:
        "The correct diagnosis should not be duplicated in the candidate list.",
    });
  }

  /* ─────────────────────────────
     REVIEW QUESTIONS
  ───────────────────────────── */

  caseData.reviewQuestions.forEach(
    (question, questionIndex) => {
      if (!question.question.trim()) {
        errors.push({
          field: `reviewQuestions.${questionIndex}.question`,
          message:
            "Review question cannot be empty.",
        });
      }

      if (
        question.options.length !== 4
      ) {
        errors.push({
          field: `reviewQuestions.${questionIndex}.options`,
          message:
            "Each review question must have exactly 4 options.",
        });
      }

      question.options.forEach(
        (option, optionIndex) => {
          if (!option.text.trim()) {
            errors.push({
              field: `reviewQuestions.${questionIndex}.options.${optionIndex}`,
              message:
                "Review option cannot be empty.",
            });
          }
        }
      );

      const correctOptionExists =
        question.options.some(
          (option) =>
            option.id ===
            question.correctOptionId
        );

      if (!correctOptionExists) {
        errors.push({
          field: `reviewQuestions.${questionIndex}.correctOptionId`,
          message:
            "The correct answer must match one of the options.",
        });
      }

      if (
        !question.explanation.trim()
      ) {
        errors.push({
          field: `reviewQuestions.${questionIndex}.explanation`,
          message:
            "Review question explanation is required.",
        });
      }
    }
  );

  return errors;
}