"use client";

import { useEffect, useMemo, useRef } from "react";
import { useRouter } from "next/navigation";
import type { Case, Course, Difficulty } from "../types/case";

type Props = {
  course: Course;
  cases: Case[];
  search: string;
  setSearch: (value: string) => void;
  showSuggestions: boolean;
  setShowSuggestions: (value: boolean) => void;
  mode: "unattempted" | "mistakes" | "start-over";
  difficulty: Difficulty | "all";
  courseLabel: string;
};

function normalizeSearch(value: unknown) {
  return String(value ?? "")
    .normalize("NFKC")
    .replace(/[يى]/g, "ی")
    .replace(/[ك]/g, "ک")
    .replace(/[ۀة]/g, "ه")
    .replace(/[ـ\u200c]/g, "")
    .toLocaleLowerCase("fa-IR")
    .replace(/\s+/g, " ")
    .trim();
}

export default function CaseSearch({
  course,
  cases,
  search,
  setSearch,
  showSuggestions,
  setShowSuggestions,
  mode,
  difficulty,
  courseLabel,
}: Props) {
  const router = useRouter();
  const searchContainerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handlePointerDown = (event: MouseEvent) => {
      const target = event.target as Node | null;
      if (searchContainerRef.current && target && !searchContainerRef.current.contains(target)) {
        setShowSuggestions(false);
      }
    };

    document.addEventListener("mousedown", handlePointerDown);
    return () => document.removeEventListener("mousedown", handlePointerDown);
  }, [setShowSuggestions]);

  const suggestions = useMemo(() => {
    const query = normalizeSearch(search);
    const tokens = query.split(" ").filter(Boolean);

    const ranked = cases
      .filter((caseData) => caseData.course === course)
      .map((caseData, index) => {
        const diagnosis = caseData.diagnosis;
        const fields = [
          caseData.id,
          caseData.title,
          caseData.presentation,
          ...(caseData.tags ?? []),
          diagnosis?.name,
          ...(diagnosis?.synonyms ?? []),
        ].map(normalizeSearch);
        const joined = fields.join(" ");

        if (!query) return { caseData, score: 0, index };

        let score = 0;
        for (const field of fields) {
          if (!field) continue;
          if (field === query) score = Math.max(score, 500);
          else if (field.startsWith(query)) score = Math.max(score, 340);
          else if (field.includes(query)) score = Math.max(score, 220);
        }

        for (const token of tokens) {
          if (joined.includes(token)) score += 35;
        }

        return { caseData, score, index };
      });

    return ranked
      .filter(({ score }) => !query || score > 0)
      .sort((a, b) => b.score - a.score || a.index - b.index)
      .slice(0, 12)
      .map(({ caseData }) => caseData);
  }, [cases, course, search]);

  const openCase = (caseData: Case) => {
    const params = new URLSearchParams({ mode, difficulty });
    setSearch(caseData.title);
    setShowSuggestions(false);
    router.push(`/practice/${course}/${caseData.id}?${params.toString()}`);
  };

  return (
    <section className="relative z-[80] mt-6">
      <div className="relative rounded-[18px] border border-[#e7e4de] bg-white px-5 py-4 shadow-[0_8px_22px_rgba(18,35,63,0.022)]">
        <div className="mb-2 flex items-center gap-2">
          <div className="text-sm font-bold">جستجو در کیس‌ها</div>
          <div className="text-[11px] text-[#9aa3b1]">فقط کیس‌های همین تخصص</div>
        </div>

        <div ref={searchContainerRef} className="relative z-[90]">
          <svg
            width="18"
            height="18"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="1.8"
            strokeLinecap="round"
            strokeLinejoin="round"
            className="pointer-events-none absolute right-4 top-1/2 -translate-y-1/2 text-[#98a2b1]"
            aria-hidden="true"
          >
            <circle cx="11" cy="11" r="6.5" />
            <path d="m16 16 4 4" />
          </svg>

          <input
            type="text"
            role="combobox"
            aria-expanded={showSuggestions}
            aria-autocomplete="list"
            value={search}
            onFocus={() => setShowSuggestions(true)}
            onChange={(event) => {
              setSearch(event.target.value);
              setShowSuggestions(true);
            }}
            onKeyDown={(event) => {
              if (event.key === "Escape") {
                setShowSuggestions(false);
                return;
              }
              if (event.key === "Enter" && suggestions.length > 0) {
                event.preventDefault();
                openCase(suggestions[0]);
              }
            }}
            placeholder={`جستجو در کیس‌های ${courseLabel}...`}
            className="w-full rounded-xl border border-[#dfe4ea] bg-[#fbfaf8] py-3 pl-4 pr-11 text-sm outline-none transition focus:border-[#aeb8c5] focus:bg-white focus:ring-2 focus:ring-black/5"
          />

          {showSuggestions && suggestions.length > 0 && (
            <div className="absolute inset-x-0 top-[calc(100%+8px)] z-[999] max-h-80 overflow-auto rounded-xl border border-[#e5e7eb] bg-white shadow-[0_18px_40px_rgba(18,35,63,0.10)]">
              <div className="border-b border-[#f0f1f3] bg-[#fbfaf8] px-4 py-2 text-[11px] font-semibold text-[#8b96a7]">
                {search.trim() ? "پیشنهادهای مرتبط" : `پیشنهاد از ${courseLabel}`}
              </div>
              {suggestions.map((caseData) => (
                <button
                  key={caseData.id}
                  type="button"
                  onMouseDown={(event) => event.preventDefault()}
                  onClick={() => openCase(caseData)}
                  className="flex w-full items-center justify-between gap-4 border-b border-[#f0f1f3] px-4 py-3 text-right last:border-b-0 hover:bg-[#fafbfc]"
                >
                  <span className="min-w-0">
                    <span className="block truncate text-sm font-bold text-[#253248]">{caseData.title}</span>
                    <span className="mt-0.5 block truncate text-[11px] text-[#97a1b0]">
                      {caseData.id} · {caseData.diagnosis?.name ?? "بدون تشخیص"}
                    </span>
                  </span>
                  <span className="shrink-0 rounded-full bg-[#f4f5f7] px-2.5 py-1 text-[10px] font-semibold text-[#7b8798]">کیس</span>
                </button>
              ))}
            </div>
          )}

          {showSuggestions && search.trim() && suggestions.length === 0 && (
            <div className="absolute inset-x-0 top-[calc(100%+8px)] z-[999] rounded-xl border border-[#e5e7eb] bg-white px-4 py-4 text-center text-xs font-semibold text-[#98a2b1] shadow-[0_18px_40px_rgba(18,35,63,0.08)]">
              در کیس‌های این تخصص نتیجه‌ای پیدا نشد.
            </div>
          )}
        </div>
      </div>
    </section>
  );
}
