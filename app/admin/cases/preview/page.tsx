"use client";

import { useEffect, useState } from "react";

import Header from "../../../../components/Header";
import CasePlayer from "../../../../components/CasePlayer";

import { cases as defaultCases } from "../../../../data/cases";

import type { Case } from "../../../../types/case";

const CASES_STORAGE_KEY = "sonic-cases";
const PREVIEW_ID_KEY = "sonic-preview-case-id";
const DRAFT_PREVIEW_KEY = "sonic-preview-case";

export default function CasePreviewPage() {
  const [caseData, setCaseData] =
    useState<Case | null>(null);

  const [loading, setLoading] =
    useState(true);

  useEffect(() => {
    try {
      /*
       * The "Preview" button inside the case
       * builder (Create/Edit Case page) stores
       * the current unsaved draft here. If it's
       * present, it always takes priority over
       * any saved case, since it reflects the
       * live in-progress edit.
       */
      const draft =
        sessionStorage.getItem(
          DRAFT_PREVIEW_KEY
        );

      if (draft) {
        try {
          const parsedDraft = JSON.parse(draft);

          sessionStorage.removeItem(
            DRAFT_PREVIEW_KEY
          );

          setCaseData(parsedDraft);
          setLoading(false);
          return;
        } catch {
          /* fall through to saved-case lookup */
        }
      }

      const previewId =
        localStorage.getItem(
          PREVIEW_ID_KEY
        );

      const stored =
        localStorage.getItem(
          CASES_STORAGE_KEY
        );

      let availableCases: Case[] =
        defaultCases;

      if (stored) {
        try {
          const parsed = JSON.parse(stored);

          if (Array.isArray(parsed)) {
            const storedIds = new Set(
              parsed.map((item: Case) => item.id)
            );

            const cleanedParsed = parsed.filter((item: Case) =>
              item.id.startsWith("pulmo-")
            );
            const cleanedIds = new Set(
              cleanedParsed.map((item: Case) => item.id)
            );
            availableCases = [
              ...defaultCases.filter(
                (item) => !cleanedIds.has(item.id)
              ),
              ...cleanedParsed,
            ];
          }
        } catch {
          availableCases = defaultCases;
        }
      }

      if (!previewId) {
        setCaseData(
          availableCases[0] ?? null
        );

        setLoading(false);
        return;
      }

      const selectedCase =
        availableCases.find(
          (item) =>
            item.id === previewId
        );

      setCaseData(
        selectedCase ?? null
      );

      setLoading(false);
    } catch {
      setCaseData(null);
      setLoading(false);
    }
  }, []);

  if (loading) {
    return (
      <main className="min-h-screen bg-slate-50 px-4 py-10">
        <div className="mx-auto w-full max-w-5xl">
          <Header />

          <div className="mt-10 rounded-3xl border border-slate-200 bg-white p-10 text-center">
            <p className="text-slate-500">
              Loading case...
            </p>
          </div>
        </div>
      </main>
    );
  }

  if (!caseData) {
    return (
      <main className="min-h-screen bg-slate-50 px-4 py-10">
        <div className="mx-auto w-full max-w-5xl">
          <Header />

          <div className="mt-10 rounded-3xl border border-red-200 bg-red-50 p-10 text-center">
            <h1 className="text-xl font-bold text-red-700">
              Case not found
            </h1>

            <p className="mt-2 text-red-600">
              The selected case could not be
              found.
            </p>

            <button
              type="button"
              onClick={() => {
                window.location.href =
                  "/admin/cases";
              }}
              className="mt-6 rounded-xl bg-slate-900 px-5 py-3 font-semibold text-white hover:bg-slate-800"
            >
              Back to Case Library
            </button>
          </div>
        </div>
      </main>
    );
  }

  return (
    <main className="min-h-screen bg-slate-50 px-4 py-10">
      <div className="mx-auto w-full max-w-5xl">
        <Header />

        {/* PREVIEW HEADER */}

        <section className="mt-8 rounded-3xl border border-blue-200 bg-blue-50 p-5">
          <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
            <div>
              <p className="text-xs font-bold uppercase tracking-wider text-blue-600">
                Admin Preview
              </p>

              <h1 className="mt-1 text-lg font-bold text-slate-900">
                {caseData.title}
              </h1>

              <p className="mt-1 text-sm text-slate-500">
                This is a preview of how the
                case will appear to students.
              </p>
            </div>

            <button
              type="button"
              onClick={() => {
                window.location.href =
                  "/admin/cases";
              }}
              className="rounded-xl border border-slate-300 bg-white px-4 py-2.5 text-sm font-semibold text-slate-700 hover:bg-slate-50"
            >
              Back to Library
            </button>
          </div>
        </section>

        {/* CASE PLAYER */}

        <section className="mt-6">
          <CasePlayer
            caseData={caseData}
          />
        </section>
      </div>
    </main>
  );
}