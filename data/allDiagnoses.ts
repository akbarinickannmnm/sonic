import { diseases } from "./diseases";
import type { Diagnosis } from "./diseases";

// Single source of truth for diagnoses used by admin case creation.
export const allDiagnoses: Diagnosis[] = diseases;
