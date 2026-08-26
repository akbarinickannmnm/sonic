import { diseases } from "./diseases";
import type { Diagnosis } from "./diseases";

/**
 * Single source of truth for diagnoses available to case creation and playback.
 * The old data/diagnoses.ts catalog has been removed.
 */
export const allDiagnoses: Diagnosis[] = diseases;
