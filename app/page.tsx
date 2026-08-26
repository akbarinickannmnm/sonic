"use client";

import CasePlayer from "../components/CasePlayer";
import { cases } from "../data/cases";

export default function Home() {
  const caseData = cases[0];

  return (
    <CasePlayer
      caseData={caseData}
    />
  );
}