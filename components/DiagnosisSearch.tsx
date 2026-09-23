"use client";

import { useMemo } from "react";
import { searchBank } from "../data/searchBank";

type DiagnosisOption = {
  id: string;
  name: string;
  synonyms: string[];
};

type Props = {
  disease: string;
  setDisease: (value: string) => void;
  disabled: boolean;
  suggestions?: DiagnosisOption[];
  showSuggestions: boolean;
  setShowSuggestions: (value: boolean) => void;
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

export default function DiagnosisSearch({
  disease,
  setDisease,
  disabled,
  suggestions = [],
  showSuggestions,
  setShowSuggestions,
}: Props) {
  const visibleSuggestions = useMemo(() => {
    const query = normalizeSearch(disease);
    const source = suggestions.length > 0 ? suggestions : searchBank;

    if (!query) return source.slice(0, 12);

    const tokens = query.split(" ").filter(Boolean);
    return source
      .map((item, index) => {
        const fields = [item.id, item.name, ...item.synonyms].map(normalizeSearch);
        const joined = fields.join(" ");
        let score = 0;
        if (fields.some((field) => field === query)) score += 500;
        if (fields.some((field) => field.startsWith(query))) score += 300;
        if (fields.some((field) => field.includes(query))) score += 200;
        for (const token of tokens) {
          if (joined.includes(token)) score += 30;
        }
        return { item, score, index };
      })
      .filter(({ score }) => score > 0)
      .sort((a, b) => b.score - a.score || a.index - b.index)
      .slice(0, 12)
      .map(({ item }) => item);
  }, [disease, suggestions]);

  return (
    <div className="relative z-50 w-full">
      <input
        disabled={disabled}
        type="text"
        role="combobox"
        aria-autocomplete="list"
        aria-expanded={showSuggestions}
        placeholder="جستجو در Search Bank..."
        value={disease}
        onFocus={() => setShowSuggestions(true)}
        onChange={(event) => {
          setDisease(event.target.value);
          setShowSuggestions(true);
        }}
        className="w-full rounded-xl border border-slate-300 p-4 text-left outline-none focus:border-blue-600 focus:ring-2 focus:ring-blue-100 disabled:bg-slate-50"
      />

      {showSuggestions && visibleSuggestions.length > 0 && (
        <div className="absolute inset-x-0 top-[calc(100%+8px)] z-[100] max-h-72 overflow-auto rounded-xl border border-slate-200 bg-white shadow-lg">
          {visibleSuggestions.map((item) => (
            <button
              key={item.id}
              type="button"
              onMouseDown={(event) => event.preventDefault()}
              onClick={() => {
                setDisease(item.name);
                setShowSuggestions(false);
              }}
              className="block w-full border-b border-slate-100 px-4 py-3 text-right text-sm font-medium text-slate-800 last:border-b-0 hover:bg-slate-50"
            >
              <span className="block">{item.name}</span>
              {item.synonyms.length > 0 && (
                <span className="mt-0.5 block text-[11px] text-slate-400">{item.synonyms.slice(0, 2).join(" · ")}</span>
              )}
            </button>
          ))}
        </div>
      )}

      {showSuggestions && disease.trim() && visibleSuggestions.length === 0 && (
        <div className="absolute inset-x-0 top-[calc(100%+8px)] z-[100] rounded-xl border border-slate-200 bg-white px-4 py-3 text-center text-xs font-semibold text-slate-400 shadow-lg">
          تشخیصی در Search Bank پیدا نشد.
        </div>
      )}
    </div>
  );
}
