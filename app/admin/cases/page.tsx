"use client";

import { useEffect, useMemo, useState } from "react";

import Header from "../../../components/Header";
import { cases as defaultCases } from "../../../data/cases";

import type { Case } from "../../../types/case";

const STORAGE_KEY = "sonic-cases";

type StoredCase = Case;

function isValidCase(item: unknown): item is Case {
  if (!item || typeof item !== "object") return false;
  const candidate = item as Partial<Case>;
  return (
    typeof candidate.id === "string" &&
    typeof candidate.title === "string" &&
    typeof candidate.course === "string" &&
    typeof candidate.difficulty === "string" &&
    Array.isArray(candidate.tags) &&
    Array.isArray(candidate.stages)
  );
}

export default function CaseLibraryPage() {
  const [savedCases, setSavedCases] = useState<StoredCase[]>([]);
  const [search, setSearch] = useState("");
  const [courseFilter, setCourseFilter] =
    useState("all");
  const [difficultyFilter, setDifficultyFilter] =
    useState("all");

  useEffect(() => {
    try {
      const stored =
        localStorage.getItem(STORAGE_KEY);

      if (!stored) {
        setSavedCases(defaultCases);
        return;
      }

      const parsed = JSON.parse(stored);

      if (Array.isArray(parsed)) {
        const cleanedParsed = parsed.filter(
          (item): item is Case =>
            isValidCase(item) && item.id.startsWith("pulmo-")
        );

        const cleanedIds = new Set(
          cleanedParsed.map((item) => item.id)
        );

        const cleanDefaults = defaultCases.filter(isValidCase);

        const mergedCases = [
          ...cleanDefaults.filter(
            (item) => !cleanedIds.has(item.id)
          ),
          ...cleanedParsed,
        ];

        setSavedCases(mergedCases);

        // Replace malformed/stale local data with the validated set.
        localStorage.setItem(
          STORAGE_KEY,
          JSON.stringify(mergedCases)
        );
      } else {
        const cleanDefaults = defaultCases.filter(isValidCase);
        setSavedCases(cleanDefaults);
        localStorage.setItem(
          STORAGE_KEY,
          JSON.stringify(cleanDefaults)
        );
      }
    } catch {
      setSavedCases(defaultCases);
    }
  }, []);

  const allCases = useMemo(() => {
    return savedCases.filter(isValidCase);
  }, [savedCases]);

  const courses = useMemo(() => {
    return Array.from(
      new Set(
        allCases.map((item) => item.course)
      )
    );
  }, [allCases]);

  const filteredCases = useMemo(() => {
    const query =
      search.trim().toLowerCase();

    return allCases.filter((caseItem) => {
      const matchesSearch =
        !query ||
        caseItem.title
          .toLowerCase()
          .includes(query) ||
        caseItem.course
          .toLowerCase()
          .includes(query) ||
        caseItem.tags.some((tag) =>
          tag.toLowerCase().includes(query)
        );

      const matchesCourse =
        courseFilter === "all" ||
        caseItem.course === courseFilter;

      const matchesDifficulty =
        difficultyFilter === "all" ||
        caseItem.difficulty ===
          difficultyFilter;

      return (
        matchesSearch &&
        matchesCourse &&
        matchesDifficulty
      );
    });
  }, [
    allCases,
    search,
    courseFilter,
    difficultyFilter,
  ]);

  function handleDelete(caseId: string) {
    const confirmed = window.confirm(
      "Are you sure you want to delete this case?"
    );

    if (!confirmed) {
      return;
    }

    const updated = savedCases.filter(
      (item) => item.id !== caseId
    );

    setSavedCases(updated);

    localStorage.setItem(
      STORAGE_KEY,
      JSON.stringify(updated)
    );
  }

  function handlePreview(caseId: string) {
    localStorage.setItem(
      "sonic-preview-case-id",
      caseId
    );

    window.location.href =
      "/admin/cases/preview";
  }

  function getStageCount(caseItem: Case) {
    return caseItem.stages?.length ?? 0;
  }

  function getInvestigationCount(
    caseItem: Case
  ) {
    return (
      caseItem.stages
        ?.filter(
          (stage) =>
            stage.type === "investigation"
        )
        .reduce(
          (total, stage) =>
            total +
            stage.investigations.length,
          0
        ) ?? 0
    );
  }

  function getDifficultyStyle(
    difficulty: Case["difficulty"]
  ) {
    if (difficulty === "easy") {
      return "bg-green-50 text-green-700 border-green-200";
    }

    if (difficulty === "hard") {
      return "bg-red-50 text-red-700 border-red-200";
    }

    return "bg-amber-50 text-amber-700 border-amber-200";
  }

  return (
    <main className="min-h-screen bg-slate-50 px-4 py-10">
      <div className="mx-auto w-full max-w-6xl">
        <Header />

        {/* HEADER */}

        <section className="mt-10 flex flex-col gap-5 rounded-3xl border border-slate-200 bg-white p-7 shadow-sm md:flex-row md:items-center md:justify-between">
          <div>
            <p className="text-sm font-semibold uppercase tracking-wide text-blue-600">
              Admin
            </p>

            <h1 className="mt-1 text-3xl font-bold text-slate-900">
              Case Library
            </h1>

            <p className="mt-2 max-w-2xl text-slate-500">
              Manage, preview and organize
              your clinical cases.
            </p>
          </div>

          <button
            type="button"
            onClick={() => {
              window.location.href =
                "/admin/cases/new";
            }}
            className="rounded-xl bg-blue-600 px-5 py-3 font-semibold text-white shadow-sm transition hover:bg-blue-700"
          >
            + Create New Case
          </button>
        </section>

        {/* STATISTICS */}

        <section className="mt-6 grid grid-cols-1 gap-4 sm:grid-cols-3">
          <div className="rounded-2xl border border-slate-200 bg-white p-5">
            <p className="text-sm text-slate-500">
              Total Cases
            </p>

            <p className="mt-2 text-3xl font-bold text-slate-900">
              {allCases.length}
            </p>
          </div>

          <div className="rounded-2xl border border-slate-200 bg-white p-5">
            <p className="text-sm text-slate-500">
              Visible Cases
            </p>

            <p className="mt-2 text-3xl font-bold text-slate-900">
              {filteredCases.length}
            </p>
          </div>

          <div className="rounded-2xl border border-slate-200 bg-white p-5">
            <p className="text-sm text-slate-500">
              Courses
            </p>

            <p className="mt-2 text-3xl font-bold text-slate-900">
              {courses.length}
            </p>
          </div>
        </section>

        {/* FILTERS */}

        <section className="mt-6 rounded-2xl border border-slate-200 bg-white p-5">
          <div className="grid grid-cols-1 gap-4 md:grid-cols-3">
            <div>
              <label className="text-sm font-medium text-slate-700">
                Search
              </label>

              <input
                value={search}
                onChange={(event) =>
                  setSearch(event.target.value)
                }
                placeholder="Search cases..."
                className="mt-2 w-full rounded-xl border border-slate-300 px-4 py-3 outline-none transition focus:border-blue-500"
              />
            </div>

            <div>
              <label className="text-sm font-medium text-slate-700">
                Course
              </label>

              <select
                value={courseFilter}
                onChange={(event) =>
                  setCourseFilter(
                    event.target.value
                  )
                }
                className="mt-2 w-full rounded-xl border border-slate-300 bg-white px-4 py-3 outline-none focus:border-blue-500"
              >
                <option value="all">
                  All courses
                </option>

                {courses.map((course) => (
                  <option
                    key={course}
                    value={course}
                  >
                    {course}
                  </option>
                ))}
              </select>
            </div>

            <div>
              <label className="text-sm font-medium text-slate-700">
                Difficulty
              </label>

              <select
                value={difficultyFilter}
                onChange={(event) =>
                  setDifficultyFilter(
                    event.target.value
                  )
                }
                className="mt-2 w-full rounded-xl border border-slate-300 bg-white px-4 py-3 outline-none focus:border-blue-500"
              >
                <option value="all">
                  All difficulties
                </option>

                <option value="easy">
                  Easy
                </option>

                <option value="medium">
                  Medium
                </option>

                <option value="hard">
                  Hard
                </option>
              </select>
            </div>
          </div>
        </section>

        {/* CASE LIST */}

        <section className="mt-6">
          {filteredCases.length === 0 ? (
            <div className="rounded-3xl border border-dashed border-slate-300 bg-white p-12 text-center">
              <h2 className="text-xl font-semibold text-slate-900">
                No cases found
              </h2>

              <p className="mt-2 text-slate-500">
                Try changing your filters or
                create a new case.
              </p>

              <button
                type="button"
                onClick={() => {
                  window.location.href =
                    "/admin/cases/new";
                }}
                className="mt-6 rounded-xl bg-blue-600 px-5 py-3 font-semibold text-white hover:bg-blue-700"
              >
                Create New Case
              </button>
            </div>
          ) : (
            <div className="space-y-4">
              {filteredCases.map(
                (caseItem) => (
                  <article
                    key={caseItem.id}
                    className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm transition hover:shadow-md"
                  >
                    <div className="flex flex-col gap-6 lg:flex-row lg:items-center lg:justify-between">
                      {/* INFO */}

                      <div className="min-w-0 flex-1">
                        <div className="flex flex-wrap items-center gap-2">
                          <span className="rounded-full bg-blue-50 px-3 py-1 text-xs font-semibold text-blue-700">
                            {caseItem.course}
                          </span>

                          <span
                            className={`rounded-full border px-3 py-1 text-xs font-semibold ${getDifficultyStyle(
                              caseItem.difficulty
                            )}`}
                          >
                            {caseItem.difficulty}
                          </span>
                        </div>

                        <h2 className="mt-3 text-xl font-bold text-slate-900">
                          {caseItem.title}
                        </h2>

                        <p className="mt-2 line-clamp-2 text-sm leading-6 text-slate-500">
                          {caseItem.presentation}
                        </p>

                        {/* METADATA */}

                        <div className="mt-4 flex flex-wrap gap-2 text-sm text-slate-500">
                          <span className="rounded-lg bg-slate-100 px-3 py-2">
                            {getStageCount(
                              caseItem
                            )}{" "}
                            stages
                          </span>

                          <span className="rounded-lg bg-slate-100 px-3 py-2">
                            {
                              caseItem
                                .reviewQuestions
                                .length
                            }{" "}
                            review questions
                          </span>

                          <span className="rounded-lg bg-slate-100 px-3 py-2">
                            {
                              getInvestigationCount(
                                caseItem
                              )
                            }{" "}
                            investigations
                          </span>
                        </div>

                        {/* TAGS */}

                        {caseItem.tags.length >
                          0 && (
                          <div className="mt-4 flex flex-wrap gap-2">
                            {caseItem.tags.map(
                              (tag) => (
                                <span
                                  key={tag}
                                  className="rounded-full border border-slate-200 px-3 py-1 text-xs text-slate-500"
                                >
                                  #{tag}
                                </span>
                              )
                            )}
                          </div>
                        )}
                      </div>

                      {/* ACTIONS */}

                      <div className="flex shrink-0 flex-col gap-2 sm:flex-row lg:flex-col">
                        <div className="flex shrink-0 flex-col gap-2 sm:flex-row lg:flex-col">
  <button
    type="button"
    onClick={() =>
      handlePreview(
        caseItem.id
      )
    }
    className="rounded-xl border border-slate-300 px-5 py-3 text-sm font-semibold text-slate-700 transition hover:bg-slate-50"
  >
    Preview
  </button>

  <button
    type="button"
    onClick={() => {
      window.location.href =
        `/admin/cases/new?id=${caseItem.id}`;
    }}
    className="rounded-xl border border-blue-300 px-5 py-3 text-sm font-semibold text-blue-600 transition hover:bg-blue-50"
  >
    Edit
  </button>

  {/* Delete Button */}
</div>

                        <button
                          type="button"
                          onClick={() =>
                            handleDelete(
                              caseItem.id
                            )
                          }
                          className="rounded-xl border border-red-200 px-5 py-3 text-sm font-semibold text-red-600 transition hover:bg-red-50"
                        >
                          Delete
                        </button>
                      </div>
                    </div>
                  </article>
                )
              )}
            </div>
          )}
        </section>

        {/* FOOTER INFO */}

        <section className="mt-8 rounded-2xl border border-blue-100 bg-blue-50 p-5">
          <p className="text-sm leading-6 text-blue-800">
            Cases are currently stored locally in
            this browser. Database persistence,
            authentication and multi-user case
            management will be added in the next
            stage.
          </p>
        </section>
      </div>
    </main>
  );
}

