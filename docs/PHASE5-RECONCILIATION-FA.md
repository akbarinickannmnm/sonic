# SONIC Cardiology History — Phase 5: reconciliation and first-five sign-off

## Changes made

1. Updated History question 035 so its scope explicitly includes prior cardiac history and the comorbidities that its answer records: hypertension, diabetes, dyslipidemia, kidney disease, and thyroid disease.
2. Updated question 040 so it asks about smoking/vaping, alcohol, other stimulants, and usual activity. It no longer asks for hypertension/diabetes/lipids, which belong under question 035.
3. Updated the legacy answer fallback for question 040 to match the new question scope.
4. Fixed the dyspnea normalization rule: a case with `exertional_dyspnea === "بله"` can no longer be overwritten with a blanket denial simply because the diagnosis is not on a hard-coded list. For cardio-050, the source says mild dyspnea with exercise, so questions 003 and 022 now agree.
5. Reconciled explicit answers to questions 035 and 040 for cardio-001 through cardio-005 against their source profiles. Also corrected cardio-004 question 028 to reflect the source profile’s abrupt onset/offset, removed the pre-existing apixaban/metoprolol medication list that contradicted the source profile’s “no prior arrhythmia” history for this intended diagnostic presentation, and reconciled the cardio-003 beta-blocker field with the carvedilol listed in medications. Answers are in patient language; vaping remains unknown where the source does not record it.
6. Corrected the history answer for cardio-004 and cardio-005 so it does not falsely claim a prior AF/SVT diagnosis when the source profile says no prior arrhythmia history.

## Case-by-case notes

- **cardio-001 ACS:** Risk-factor answer now includes current smoking, alcohol, stimulants, usual activity, and unknown vaping history. The father’s MI at age 56 is retained as family history without automatically labeling it premature CAD.
- **cardio-002 stable angina:** Smoking cessation and current activity are stated from the source. Nausea/vomiting/cold sweat remain partially unknown where the source only records nausea.
- **cardio-003 HFrEF:** Symptoms, old MI/CAD, and known HFrEF are consistent with the source profile. This is effectively a follow-up/known-HF scenario, not a blind diagnostic scenario, unless the source case is redesigned. The separate beta-blocker field now matches the carvedilol listed in medications. This remains a known-HFrEF/follow-up scenario, not a blind diagnostic scenario, unless the source case is redesigned. For cardio-004, the prior apixaban/metoprolol list was removed so it no longer contradicts the intended new-diagnosis AF presentation and the history answer denying a prior arrhythmia diagnosis.
- **cardio-004 AF:** The history no longer says AF was diagnosed previously; this is compatible with the source’s `arrhythmia: no` and allows the current presentation to be diagnostic.
- **cardio-005 SVT:** The history no longer says SVT was diagnosed previously; this is compatible with the source’s `arrhythmia: no`. Coffee is mentioned as a trigger only because it is explicitly in the source profile.

## Automated checks

- Question bank has exactly 40 unique IDs.
- Each of the first five authored cases has exactly 40 answer records with matching question IDs.
- Question 035 and 040 texts match between the question bank and authored answers.
- For cardio-050, the normalized general dyspnea answer preserves the source’s “mild with exercise” and agrees with exertional dyspnea = yes.
- No answer in the first five cases claims a negative allergy history; allergy remains unknown because source data are absent.

## Limitations / not signed off

- This is a content/data reconciliation, not specialist cardiology sign-off.
- The source profile for cardio-003 still describes known HFrEF and a carvedilol/beta-blocker discrepancy. These facts are documented rather than silently erased.
- The remaining 45 cases still use the legacy answer generator except for the corrected question-040 fallback and dyspnea normalization rule. They are not individually rewritten or approved by this phase.
- Full Next.js build remains unverified because the archive lacks package.json and a lockfile.

## Post-fix validation result

After compiling the edited modules and rendering all cases, the existing runtime validator reports **103 remaining flags: 0 errors, 98 review flags, and 5 warnings**. The 50 question-035 scope-mismatch errors and the cardio-050 dyspnea contradiction are resolved. Remaining flags are: 47 undocumented sudden-vs-gradual onset modes, 50 missing allergy-source entries (correctly reported as unknown, not “no allergy”), 1 prior-target-diagnosis review for the known-HFrEF follow-up case, and 5 high-answer-reuse warnings. These counts are flags, not independent clinical errors. The validator does not currently flag the missing vaping source because the new wording differs from its exact matching pattern; vaping remains explicitly unknown in the answers and has not been added to source profiles.

The final checks also confirmed: 50 cases, 40 unique question IDs, 40 answer IDs per case, no empty History answers, stable question labels for all 50 cases, and consistent dyspnea reporting for cardio-050. Strict TypeScript compilation of the edited case/question/authored-answer modules passed. Full Next.js build remains unverified because package metadata is absent.
