"use client";

import { useEffect, useState } from "react";
import CasePlayer from "../components/CasePlayer";
import { cases } from "../data/cases";

export default function Home() {
  const [caseData, setCaseData] = useState<null | (typeof cases)[number]>(null);

  useEffect(() => {
    const randomIndex = Math.floor(Math.random() * cases.length);
    setCaseData(cases[randomIndex]);
  }, []);

  if (!caseData) {
    return (
      <main className="flex min-h-screen items-center justify-center bg-slate-50">
        <div className="text-sm font-medium text-slate-500">
          Loading case...
        </div>
      </main>
    );
  }

  return <CasePlayer caseData={caseData} />;
}