import { searchBank } from "./searchBank";
import type { Diagnosis } from "./searchBank";

// Single source of truth for every diagnosis used by Practice and Clinical Reasoning.
export const allDiagnoses: Diagnosis[] = searchBank;
