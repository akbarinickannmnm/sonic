"use client";

import { useEffect, useState } from "react";
import CasePlayer from "../components/CasePlayer";
import { cases } from "../data/cases";

export default function Home() {
  const [caseData, setCaseData] = useState(cases[0]);

  useEffect(() => {
    const randomIndex = Math.floor(Math.random() * cases.length);
    setCaseData(cases[randomIndex]);
  }, []);

  return <CasePlayer caseData={caseData} />;
}