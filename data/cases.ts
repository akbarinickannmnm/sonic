import type { Case } from "../types/case";
import { pulmonologyCases } from "./pulmonologyCases";

export const cases: Case[] = pulmonologyCases.filter(
  (item): item is Case => Boolean(item)
);
