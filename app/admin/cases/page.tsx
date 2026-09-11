"use client";

import { useEffect, useMemo, useState } from "react";

import Header from "../../../components/Header";
import { masterCaseBank } from "../../../data/cases";
import { ensureDailyCaseSchedule, formatDateKey, getDefaultDailyCase, readDailyCaseSchedule, writeDailyCaseSchedule, type DailyCaseSchedule } from "../../../lib/dailyCase";
import { validatePulmonologyCases } from "../../../lib/pulmonologyCaseValidator";
import { validateCardiologyCases } from "../../../lib/cardiologyCaseValidator";
import { validateNephrologyCases } from "../../../lib/nephrologyCaseValidator";
import { validateGastroenterologyCases } from "../../../lib/gastroenterologyCaseValidator";
import { validateEndocrinologyCases } from "../../../lib/endocrinologyCaseValidator";
import { validateHematologyOncologyCases } from "../../../lib/hematologyOncologyCaseValidator";
import type { Case } from "../../../types/case";

const DIFFICULTY_LABELS: Record<Case["difficulty"], string> = {
  easy: "آسان",
  medium: "متوسط",
  hard: "سخت",
};

const COURSE_LABELS: Record<string, string> = {
  pulmonology: "ریه",
  cardiology: "قلب",
  gastroenterology: "گوارش",
  endocrinology: "غدد",
  "hematology-oncology": "هماتولوژی و انکولوژی",
  neurology: "نورولوژی",
  "infectious-disease": "عفونی",
  nephrology: "نفرولوژی",
};

const HISTORY_CATEGORY_LABELS: Record<string, string> = {
  onset_and_course: "شروع و روند علائم",
  dyspnea: "تنگی نفس",
  cough: "سرفه و خلط",
  wheeze: "خس‌خس و علائم انسدادی",
  hemoptysis: "خون در خلط",
  chest_pain: "درد قفسه سینه",
  systemic: "علائم عمومی",
  past_respiratory: "سابقه بیماری‌های تنفسی",
  comorbidities: "بیماری‌های زمینه‌ای",
  medications: "داروها و درمان‌ها",
  smoking_and_vaping: "سیگار و ویپ",
  occupational: "محیط کار",
  home_and_environment: "خانه و محیط زندگی",
  infectious_exposure: "مواجهه عفونی",
  aspiration: "آسپیراسیون و رفلاکس",
  family_history: "سابقه خانوادگی",
};

const CARDIO_HISTORY_CATEGORY_LABELS: Record<string, string> = {
  presenting_complaint: "شکایت اصلی",
  history_of_present_illness: "شرح حال بیماری فعلی",
  past_medical_history: "سابقه پزشکی",
  cardiovascular_procedures: "اقدامات و پروسیجرهای قلبی",
  medications: "داروها",
  smoking_and_substance_use: "سیگار و مواد",
  lifestyle: "سبک زندگی",
  family_history: "سابقه خانوادگی",
  infectious_and_systemic_history: "سابقه عفونی و سیستمیک",
  congenital_and_childhood_history: "سابقه مادرزادی و دوران کودکی",
};

const CARDIO_PE_CATEGORY_LABELS: Record<string, string> = {
  general: "معاینه عمومی",
  vitals: "علائم حیاتی",
  peripheral: "معاینه اندام‌ها",
  neck: "گردن و JVP",
  precordial: "معاینه پره‌کوردیال",
  auscultation: "سمع قلب",
  respiratory: "معاینه تنفسی",
  abdominal: "معاینه شکم",
  special: "یافته‌های اختصاصی",
};

const PE_CATEGORY_LABELS: Record<string, string> = {
  general: "ارزیابی عمومی",
  vitals: "علائم حیاتی",
  respiratory: "معاینه تنفسی",
  cardiovascular: "معاینه قلبی",
  peripheral: "معاینه اندام‌ها",
  neck: "گردن و غدد لنفاوی",
  upper_airway: "راه هوایی فوقانی",
  skin: "پوست",
  functional: "ارزیابی عملکردی",
};


const NEPHRO_HISTORY_CATEGORY_LABELS: Record<string, string> = {
  onset_and_course: "شروع و سیر علائم",
  urinary_symptoms: "علائم ادراری",
  stone_symptoms: "درد پهلو و سنگ",
  edema: "ادم و افزایش وزن",
  infection: "عفونت‌های اخیر",
  autoimmune_sle: "بیماری‌های خودایمنی / SLE",
  vasculitis: "واسکولیت",
  vascular: "بیماری‌های عروقی",
  diabetes_htn: "دیابت و فشار خون",
  renal_function: "عملکرد کلیه و علائم بیماری مزمن کلیه",
  medications: "داروها و نفروتوکسین‌ها",
  volume_aki: "کاهش حجم، AKI و سابقه مرتبط",
  obstruction: "انسداد و مشکلات ادراری",
  family_history: "سابقه خانوادگی",
  stone_history: "سابقه سنگ کلیه",
};

const NEPHRO_PE_CATEGORY_LABELS: Record<string, string> = {
  general: "ارزیابی عمومی",
  vitals: "علائم حیاتی",
  volume_status: "وضعیت مایعات",
  skin_mucosal: "معاینه پوست و مخاط",
  cardiopulmonary: "معاینه قلب و ریه",
  abdominal_flank: "معاینه شکم و پهلو",
  genitourinary: "معاینه دستگاه ادراری",
  extremities: "معاینه اندام‌ها",
  neurologic: "معاینه عصبی",
  fundoscopy: "معاینه فوندوس",
};

function getHistoryItems(caseItem: Case) {
  const stage = caseItem.stages.find((item) => item.type === "history");
  return stage?.type === "history" ? stage.hints : [];
}

function getPhysicalExamItems(caseItem: Case) {
  const stage = caseItem.stages.find((item) => item.type === "physical-exam");
  return stage?.type === "physical-exam" ? stage.hints : [];
}

function getInvestigationItems(caseItem: Case) {
  const stage = caseItem.stages.find((item) => item.type === "investigation");
  return stage?.type === "investigation" ? stage.investigations : [];
}

function difficultyClass(difficulty: Case["difficulty"]) {
  if (difficulty === "easy") return "border-emerald-200 bg-emerald-50 text-emerald-700";
  if (difficulty === "hard") return "border-rose-200 bg-rose-50 text-rose-700";
  return "border-amber-200 bg-amber-50 text-amber-700";
}

function categoryLabel(caseItem: Case, category?: string) {
  if (!category) return "دسته‌بندی";
  if (caseItem.course === "cardiology") {
    return CARDIO_HISTORY_CATEGORY_LABELS[category] ?? CARDIO_PE_CATEGORY_LABELS[category] ?? category;
  }
  if (caseItem.course === "nephrology") {
    return NEPHRO_HISTORY_CATEGORY_LABELS[category] ?? NEPHRO_PE_CATEGORY_LABELS[category] ?? category;
  }
  return HISTORY_CATEGORY_LABELS[category] ?? PE_CATEGORY_LABELS[category] ?? category;
}

function questionLabel(sourceId?: string, fallback?: string) {
  if (!sourceId) return fallback ?? "سؤال";
  if (sourceId.startsWith("nephro-h")) {
    const index = Number(sourceId.replace("nephro-h", ""));
    return Number.isFinite(index) ? `سؤال ${String(index).padStart(2, "0")}` : fallback ?? sourceId;
  }
  if (sourceId.startsWith("resp-q")) {
    const index = Number(sourceId.replace("resp-q", ""));
    return Number.isFinite(index) ? `سؤال ${String(index).padStart(2, "0")}` : fallback ?? sourceId;
  }
  return fallback ?? sourceId;
}

export default function CaseLibraryPage() {
  const [search, setSearch] = useState("");
  const [courseFilter, setCourseFilter] = useState("pulmonology");
  const [difficultyFilter, setDifficultyFilter] = useState("all");
  const [selectedId, setSelectedId] = useState<string | null>("pulmo-001");
  const [activeTab, setActiveTab] = useState<"overview" | "history" | "exam" | "investigations">("overview");
  const [dailySchedule, setDailySchedule] = useState<DailyCaseSchedule>({});
  const [scheduleDays, setScheduleDays] = useState(30);
  const [dailyScheduleOpen, setDailyScheduleOpen] = useState(true);

  useEffect(() => {
    setDailySchedule(ensureDailyCaseSchedule(30));
  }, []);

  const dailyEligibleCases = useMemo(() =>
    masterCaseBank
      .filter((item) => item.difficulty === "easy" || item.difficulty === "medium")
      .slice()
      .sort((a, b) => a.id.localeCompare(b.id)),
  []);

  const upcomingDailyCases = useMemo(() => {
    const today = new Date();
    return Array.from({ length: scheduleDays }, (_, offset) => {
      const date = new Date(today);
      date.setDate(date.getDate() + offset);
      const dateKey = formatDateKey(date);
      const assignedId = dailySchedule[dateKey];
      const assigned = assignedId ? masterCaseBank.find((item) => item.id === assignedId) : undefined;
      return { date, dateKey, caseData: assigned ?? getDefaultDailyCase(date) };
    });
  }, [dailySchedule, scheduleDays]);

  function setDailyCase(dateKey: string, caseId: string) {
    const next = { ...dailySchedule, [dateKey]: caseId };
    setDailySchedule(next);
    writeDailyCaseSchedule(next);
  }

  function swapDailyCases(index: number, direction: -1 | 1) {
    const targetIndex = index + direction;
    if (targetIndex < 0 || targetIndex >= upcomingDailyCases.length) return;
    const current = upcomingDailyCases[index];
    const target = upcomingDailyCases[targetIndex];
    const next = { ...dailySchedule, [current.dateKey]: target.caseData.id, [target.dateKey]: current.caseData.id };
    setDailySchedule(next);
    writeDailyCaseSchedule(next);
  }

  function resetDailySchedule() {
    const next = { ...dailySchedule };
    upcomingDailyCases.forEach(({ dateKey }) => delete next[dateKey]);
    setDailySchedule(next);
    writeDailyCaseSchedule(next);
  }

  const validationErrors = useMemo(() => {
    if (courseFilter === "cardiology") return validateCardiologyCases(masterCaseBank.filter((item) => item.course === "cardiology"));
    if (courseFilter === "nephrology") return validateNephrologyCases(masterCaseBank.filter((item) => item.course === "nephrology"));
    if (courseFilter === "gastroenterology") return validateGastroenterologyCases(masterCaseBank.filter((item) => item.course === "gastroenterology"));
    if (courseFilter === "endocrinology") return validateEndocrinologyCases(masterCaseBank.filter((item) => item.course === "endocrinology"));
    if (courseFilter === "hematology-oncology") return validateHematologyOncologyCases(masterCaseBank.filter((item) => item.course === "hematology-oncology"));
    return validatePulmonologyCases(masterCaseBank.filter((item) => item.course === "pulmonology"));
  }, [courseFilter]);

  const allCases = useMemo(() => masterCaseBank.filter((item) => {
    if (courseFilter !== "all" && item.course !== courseFilter) return false;
    if (difficultyFilter !== "all" && item.difficulty !== difficultyFilter) return false;

    const q = search.trim().toLowerCase();
    if (!q) return true;

    const history = getHistoryItems(item);
    const pe = getPhysicalExamItems(item);
    const investigations = getInvestigationItems(item);
    const haystack = [
      item.id,
      item.title,
      item.presentation,
      item.diagnosis.name,
      ...item.tags,
      ...history.map((x) => `${x.content} ${x.label ?? ""}`),
      ...pe.map((x) => x.content),
      ...investigations.flatMap((x) => [x.name, x.category, ...x.findings.map((f) => `${f.label} ${f.value}`)]),
    ].join(" ").toLowerCase();

    return haystack.includes(q);
  }), [courseFilter, difficultyFilter, search]);

  const selectedCase = allCases.find((item) => item.id === selectedId) ?? allCases[0] ?? null;

  const stats = useMemo(() => {
    const selectedCourse = courseFilter === "all" ? null : courseFilter;
    const scoped = selectedCourse ? masterCaseBank.filter((item) => item.course === selectedCourse) : masterCaseBank;
    return {
      total: scoped.length,
      easy: scoped.filter((x) => x.difficulty === "easy").length,
      medium: scoped.filter((x) => x.difficulty === "medium").length,
      hard: scoped.filter((x) => x.difficulty === "hard").length,
      valid: validationErrors.length === 0,
    };
  }, [courseFilter, validationErrors]);

  return (
    <main dir="rtl" className="min-h-screen bg-slate-50 px-4 py-8 text-slate-900">
      <div className="mx-auto w-full max-w-[1500px]">
        <Header />

        <section className="mt-8 rounded-3xl border border-slate-200 bg-white p-6 shadow-sm">
          <div className="flex flex-col gap-5 lg:flex-row lg:items-center lg:justify-between">
            <div>
              <p className="text-sm font-semibold text-blue-600">پنل مدیریت SONIC</p>
              <h1 className="mt-1 text-3xl font-bold">کتابخانه و بررسی کیس‌ها</h1>
              <p className="mt-2 text-sm leading-6 text-slate-500">
                تمام کیس‌ها را از نظر محتوای بالینی، History، معاینه و Investigation بررسی کن.
              </p>
            </div>
            <button
              type="button"
              onClick={() => { window.location.href = "/admin/cases/new"; }}
              className="rounded-xl bg-blue-600 px-5 py-3 text-sm font-semibold text-white hover:bg-blue-700"
            >
              + ساخت کیس جدید
            </button>
          </div>
        </section>

        <section className="mt-5 rounded-3xl border border-slate-200 bg-white p-6 shadow-sm">
          <div className="flex flex-col gap-4 lg:flex-row lg:items-start lg:justify-between">
            <div>
              <p className="text-xs font-semibold uppercase tracking-[0.16em] text-slate-400">Case of the Day</p>
              <h2 className="mt-1 text-2xl font-bold">برنامه کیس‌های روزهای آینده</h2>
              <p className="mt-2 text-sm leading-6 text-slate-500">
                کیس هر روز را ببین، برای هر تاریخ کیس دیگری انتخاب کن یا با جابه‌جایی ترتیب، برنامه را تغییر بده. زمان‌بندی بر اساس تاریخ تهران (Asia/Tehran) است و کیس هر روز ساعت ۰۰:۰۰ به وقت تهران عوض می‌شود.
              </p>
            </div>
            <div className="flex flex-wrap gap-2">
              <button
                type="button"
                onClick={() => setDailyScheduleOpen((open) => !open)}
                className="rounded-xl border border-slate-300 px-4 py-2 text-sm font-semibold hover:bg-slate-50"
                aria-expanded={dailyScheduleOpen}
              >
                {dailyScheduleOpen ? "بستن بخش" : "باز کردن بخش"}
              </button>
              {dailyScheduleOpen && (
                <>
                  <button type="button" onClick={resetDailySchedule} className="rounded-xl border border-slate-300 px-4 py-2 text-sm font-semibold hover:bg-slate-50">بازنشانی برنامه</button>
                  <select value={scheduleDays} onChange={(e) => setScheduleDays(Number(e.target.value))} className="rounded-xl border border-slate-300 bg-white px-3 py-2 text-sm">
                    <option value={30}>۳۰ روز</option>
                    <option value={60}>۶۰ روز</option>
                    <option value={90}>۹۰ روز</option>
                  </select>
                </>
              )}
            </div>
          </div>

          {dailyScheduleOpen && (
          <div className="mt-5 overflow-hidden rounded-2xl border border-slate-200">
            <div className="grid grid-cols-[70px_150px_1fr_92px] gap-3 border-b border-slate-200 bg-slate-50 px-4 py-3 text-xs font-semibold text-slate-500">
              <span>#</span><span>تاریخ</span><span>کیس روز</span><span>ترتیب</span>
            </div>
            <div className="divide-y divide-slate-100">
              {upcomingDailyCases.map(({ date, dateKey, caseData }, index) => (
                <div key={dateKey} className="grid grid-cols-[70px_150px_1fr_92px] items-center gap-3 px-4 py-3">
                  <span className="text-xs font-mono text-slate-400">{index + 1}</span>
                  <div>
                    <p className="text-sm font-semibold">{date.toLocaleDateString("fa-IR-u-ca-persian", { weekday: "short", month: "short", day: "numeric" })}</p>
                    <p className="mt-0.5 text-[10px] text-slate-400">{dateKey} تهران</p>
                  </div>
                  <select value={caseData.id} onChange={(e) => setDailyCase(dateKey, e.target.value)} className="min-w-0 rounded-xl border border-slate-300 bg-white px-3 py-2 text-sm">
                    {dailyEligibleCases.map((item) => (
                      <option key={item.id} value={item.id}>{item.id} — {item.title}</option>
                    ))}
                  </select>
                  <div className="flex justify-end gap-1">
                    <button type="button" disabled={index === 0} onClick={() => swapDailyCases(index, -1)} className="h-8 w-8 rounded-lg border border-slate-200 text-sm disabled:opacity-30" aria-label="بالا">↑</button>
                    <button type="button" disabled={index === upcomingDailyCases.length - 1} onClick={() => swapDailyCases(index, 1)} className="h-8 w-8 rounded-lg border border-slate-200 text-sm disabled:opacity-30" aria-label="پایین">↓</button>
                  </div>
                </div>
              ))}
            </div>
          </div>
          )}
        </section>

        <section className="mt-5 grid grid-cols-2 gap-3 md:grid-cols-5">
          {[
            [`کل کیس‌های ${courseFilter === "cardiology" ? "قلب و عروق" : courseFilter === "nephrology" ? "نفرولوژی" : courseFilter === "pulmonology" ? "ریه" : "همه"}`, stats.total, "text-slate-900"],
            ["آسان", stats.easy, "text-emerald-600"],
            ["متوسط", stats.medium, "text-amber-600"],
            ["سخت", stats.hard, "text-rose-600"],
            ["اعتبارسنجی", stats.valid ? "✓ سالم" : `${validationErrors.length} خطا`, stats.valid ? "text-emerald-600" : "text-rose-600"],
          ].map(([label, value, color]) => (
            <div key={label} className="rounded-2xl border border-slate-200 bg-white p-4 shadow-sm">
              <p className="text-xs text-slate-500">{label}</p>
              <p className={`mt-2 text-2xl font-bold ${color}`}>{value}</p>
            </div>
          ))}
        </section>

        {validationErrors.length > 0 && (
          <section className="mt-5 rounded-2xl border border-rose-200 bg-rose-50 p-5">
            <h2 className="font-bold text-rose-800">خطاهای اعتبارسنجی</h2>
            <div className="mt-3 max-h-56 overflow-auto space-y-1 text-sm text-rose-700">
              {validationErrors.map((error, index) => {
                const caseId = error.caseId ?? "بدون شناسه";
                const field = "field" in error ? error.field : error.code;
                return (
                  <p key={`${caseId}-${field}-${index}`}>• {caseId} — {field}: {error.message}</p>
                );
              })}
            </div>
          </section>
        )}

        <section className="mt-5 rounded-2xl border border-slate-200 bg-white p-4 shadow-sm">
          <div className="grid gap-3 md:grid-cols-[1fr_180px_180px]">
            <input
              value={search}
              onChange={(event) => setSearch(event.target.value)}
              placeholder="جستجو در عنوان، تشخیص، History، معاینه یا Investigation..."
              className="rounded-xl border border-slate-300 px-4 py-3 text-sm outline-none focus:border-blue-500"
            />
            <select value={courseFilter} onChange={(event) => setCourseFilter(event.target.value)} className="rounded-xl border border-slate-300 bg-white px-4 py-3 text-sm">
              <option value="all">همه تخصص‌ها</option>
              <option value="pulmonology">ریه</option>
              <option value="cardiology">قلب</option>
              <option value="nephrology">نفرولوژی</option>
              <option value="gastroenterology">گوارش</option>
              <option value="endocrinology">غدد</option>
              <option value="hematology-oncology">هماتولوژی و انکولوژی</option>
            </select>
            <select value={difficultyFilter} onChange={(event) => setDifficultyFilter(event.target.value)} className="rounded-xl border border-slate-300 bg-white px-4 py-3 text-sm">
              <option value="all">همه سطوح</option>
              <option value="easy">آسان</option>
              <option value="medium">متوسط</option>
              <option value="hard">سخت</option>
            </select>
          </div>
        </section>

        <div className="mt-5 grid gap-5 lg:grid-cols-[360px_1fr]">
          <section className="h-fit rounded-3xl border border-slate-200 bg-white p-3 shadow-sm lg:sticky lg:top-4">
            <div className="px-3 py-2 text-sm font-semibold text-slate-500">{allCases.length} کیس پیدا شد</div>
            <div className="max-h-[calc(100vh-260px)] space-y-2 overflow-auto pr-1">
              {allCases.map((item) => (
                <button
                  key={item.id}
                  type="button"
                  onClick={() => { setSelectedId(item.id); setActiveTab("overview"); }}
                  className={`w-full rounded-2xl border p-4 text-right transition ${selectedCase?.id === item.id ? "border-blue-300 bg-blue-50" : "border-slate-200 hover:bg-slate-50"}`}
                >
                  <div className="flex items-center justify-between gap-2">
                    <span className="text-xs font-mono text-slate-400">{item.id}</span>
                    <span className={`rounded-full border px-2 py-1 text-[11px] font-semibold ${difficultyClass(item.difficulty)}`}>{DIFFICULTY_LABELS[item.difficulty]}</span>
                  </div>
                  <h2 className="mt-2 font-bold leading-6">{item.title}</h2>
                  <p className="mt-1 text-xs text-slate-500">{item.diagnosis.name}</p>
                </button>
              ))}
            </div>
          </section>

          {selectedCase ? (
            <section className="rounded-3xl border border-slate-200 bg-white shadow-sm">
              <div className="border-b border-slate-200 p-6">
                <div className="flex flex-col gap-4 md:flex-row md:items-start md:justify-between">
                  <div>
                    <div className="flex flex-wrap items-center gap-2">
                      <span className="rounded-full bg-slate-100 px-3 py-1 text-xs font-mono text-slate-600">{selectedCase.id}</span>
                      <span className={`rounded-full border px-3 py-1 text-xs font-semibold ${difficultyClass(selectedCase.difficulty)}`}>{DIFFICULTY_LABELS[selectedCase.difficulty]}</span>
                      <span className="rounded-full bg-blue-50 px-3 py-1 text-xs font-semibold text-blue-700">{COURSE_LABELS[selectedCase.course] ?? selectedCase.course}</span>
                    </div>
                    <h2 className="mt-3 text-2xl font-bold">{selectedCase.title}</h2>
                    <p className="mt-2 text-sm leading-7 text-slate-600">{selectedCase.presentation}</p>
                  </div>
                  <div className="flex gap-2">
                    <button type="button" onClick={() => { localStorage.setItem("sonic-preview-case-id", selectedCase.id); window.location.href = "/admin/cases/preview"; }} className="rounded-xl border border-slate-300 px-4 py-2 text-sm font-semibold hover:bg-slate-50">Preview</button>
                    <button type="button" onClick={() => { window.location.href = `/admin/cases/new?id=${selectedCase.id}`; }} className="rounded-xl bg-blue-600 px-4 py-2 text-sm font-semibold text-white hover:bg-blue-700">ویرایش</button>
                  </div>
                </div>

                <div className="mt-5 grid grid-cols-2 gap-3 md:grid-cols-5">
                  <Info label="سن" value={`${selectedCase.patient.age} سال`} />
                  <Info label="جنسیت" value={selectedCase.patient.sex === "male" ? "مرد" : "زن"} />
                  <Info label="تشخیص نهایی" value={selectedCase.diagnosis.name} />
                  <Info label="History" value={`${getHistoryItems(selectedCase).length} سؤال`} />
                  <Info label="PE / INV" value={`${getPhysicalExamItems(selectedCase).length} / ${getInvestigationItems(selectedCase).length}`} />
                </div>
              </div>

              <div className="flex flex-wrap gap-2 border-b border-slate-200 p-4">
                {([
                  ["overview", "نمای کلی"],
                  ["history", "History"],
                  ["exam", "معاینه"],
                  ["investigations", "Investigation"],
                ] as const).map(([key, label]) => (
                  <button key={key} type="button" onClick={() => setActiveTab(key)} className={`rounded-xl px-4 py-2 text-sm font-semibold ${activeTab === key ? "bg-blue-600 text-white" : "bg-slate-100 text-slate-600 hover:bg-slate-200"}`}>{label}</button>
                ))}
              </div>

              <div className="p-6">
                {activeTab === "overview" && <Overview caseItem={selectedCase} />}
                {activeTab === "history" && <HistoryView caseItem={selectedCase} />}
                {activeTab === "exam" && <PhysicalExamView caseItem={selectedCase} />}
                {activeTab === "investigations" && <InvestigationView caseItem={selectedCase} />}
              </div>
            </section>
          ) : (
            <div className="rounded-3xl border border-dashed border-slate-300 bg-white p-12 text-center text-slate-500">کیسی برای نمایش پیدا نشد.</div>
          )}
        </div>
      </div>
    </main>
  );
}

function Info({ label, value }: { label: string; value: string }) {
  return <div className="rounded-xl bg-slate-50 p-3"><p className="text-[11px] text-slate-400">{label}</p><p className="mt-1 text-sm font-semibold leading-5">{value}</p></div>;
}

function Overview({ caseItem }: { caseItem: Case }) {
  return (
    <div className="space-y-5">
      <div className="rounded-2xl border border-slate-200 p-5">
        <h3 className="font-bold">مشخصات بیمار و تشخیص</h3>
        <div className="mt-4 grid gap-3 md:grid-cols-2">
          <Info label="بیمار" value={`${caseItem.patient.age} ساله، ${caseItem.patient.sex === "male" ? "مرد" : "زن"}`} />
          <Info label="تشخیص نهایی" value={caseItem.diagnosis.name} />
          <Info label="تشخیص‌های کاندید" value={caseItem.candidateDiagnosisIds.join("، ")} />
          <Info label="برچسب‌ها" value={caseItem.tags.join("، ") || "بدون برچسب"} />
        </div>
      </div>
      <div className="rounded-2xl border border-slate-200 p-5">
        <h3 className="font-bold">خلاصه ساختار کیس</h3>
        <div className="mt-4 grid gap-3 md:grid-cols-3">
          <Info label="History" value={`${getHistoryItems(caseItem).length} / 40`} />
          <Info label="Physical Exam" value={`${getPhysicalExamItems(caseItem).length} / 5–7`} />
          <Info label="Investigation" value={`${getInvestigationItems(caseItem).length} / 5–6`} />
        </div>
      </div>
      <div className="rounded-2xl border border-blue-100 bg-blue-50 p-5 text-sm leading-7 text-blue-900">
        برای بررسی جزئیات، تب‌های History، معاینه و Investigation را باز کن. تمام پاسخ‌های History این کیس در همان ترتیب ۴۰ سؤال نمایش داده می‌شوند.
      </div>
    </div>
  );
}

function HistoryView({ caseItem }: { caseItem: Case }) {
  const items = getHistoryItems(caseItem);
  return (
    <div>
      <div className="mb-5 flex items-center justify-between"><h3 className="text-lg font-bold">History — {items.length} سؤال</h3><span className="rounded-full bg-slate-100 px-3 py-1 text-xs text-slate-500">همه پاسخ‌ها</span></div>
      <div className="space-y-3">
        {items.map((item, index) => (
          <article key={item.id} className="rounded-2xl border border-slate-200 p-4">
            <div className="flex items-start gap-3">
              <span className="shrink-0 rounded-lg bg-blue-50 px-2 py-1 font-mono text-xs font-semibold text-blue-700">{questionLabel(item.sourceId)} </span>
              <div className="min-w-0 flex-1">
                <p className="text-xs font-semibold text-slate-400">{item.sourceId ? `دسته: ${HISTORY_CATEGORY_LABELS[categoryFromQuestion(index)] ?? "عمومی"}` : ""}</p>
                <p className="mt-1 font-semibold leading-6">{persianQuestion(index)}</p>
                <div className="mt-3 rounded-xl bg-slate-50 p-3 text-sm leading-7 text-slate-700">«{item.content}»</div>
              </div>
            </div>
          </article>
        ))}
      </div>
    </div>
  );
}

function categoryFromQuestion(index: number) {
  const categories = ["onset_and_course", "onset_and_course", "onset_and_course", "onset_and_course", "onset_and_course", "onset_and_course", "dyspnea", "dyspnea", "dyspnea", "dyspnea", "cough", "cough", "cough", "hemoptysis", "wheeze", "chest_pain", "chest_pain", "chest_pain", "systemic", "systemic", "infectious_exposure", "dyspnea", "dyspnea", "dyspnea", "past_respiratory", "past_respiratory", "comorbidities", "medications", "medications", "comorbidities", "smoking_and_vaping", "occupational", "home_and_environment", "infectious_exposure", "infectious_exposure", "past_respiratory", "past_respiratory", "infectious_exposure", "aspiration", "family_history"];
  return categories[index] ?? "onset_and_course";
}

function persianQuestion(index: number) {
  const questions = [
    "این مشکل از کی شروع شد؟", "شروعش ناگهانی بود یا کم‌کم؟", "از وقتی شروع شده بهتر شده یا بدتر؟", "همیشه هست یا گاهی می‌آید و می‌رود؟", "قبلاً هم چنین مشکلی داشته‌اید؟", "چه چیزی علائم‌تان را بهتر یا بدتر می‌کند؟", "احساس تنگی نفس دارید؟", "تنگی نفس در استراحت است یا با فعالیت؟", "وقتی دراز می‌کشید بدتر می‌شود؟", "شب‌ها با احساس خفگی از خواب بیدار می‌شوید؟", "سرفه دارید؟", "سرفه خشک است یا خلط دارید؟", "خلط چه رنگی است و تقریباً چقدر تولید می‌کنید؟", "در خلط‌تان خون دیده‌اید؟", "خس‌خس سینه دارید؟", "احساس فشار یا گرفتگی در قفسه سینه دارید؟", "درد قفسه سینه دارید؟", "درد با نفس عمیق یا سرفه بدتر می‌شود؟", "تب یا لرز داشته‌اید؟", "کاهش وزن یا تعریق شبانه داشته‌اید؟", "اخیراً سرماخوردگی یا عفونت تنفسی داشته‌اید؟", "علائم‌تان در زمان خاصی از روز یا شب بدتر می‌شود؟", "ورزش، هوای سرد، دود یا گردوغبار علائم‌تان را تحریک می‌کند؟", "تماس با حیوانات یا مواد حساسیت‌زا علائم‌تان را تحریک می‌کند؟", "قبلاً آسم، COPD، پنومونی، سل یا بیماری ریوی دیگری داشته‌اید؟", "به‌خاطر مشکل تنفسی قبلاً بستری شده‌اید یا به اورژانس رفته‌اید؟", "بیماری قلبی یا بیماری مهم دیگری دارید؟", "چه داروها یا اسپری‌هایی مصرف می‌کنید؟", "آیا دارویی هست که علائم‌تان را بهتر کند؟", "سابقه آلرژی، رینیت آلرژیک یا اگزما دارید؟", "الان سیگار یا ویپ مصرف می‌کنید یا قبلاً مصرف می‌کردید؟", "در محل کار در معرض گردوغبار، دود یا مواد شیمیایی هستید؟", "در خانه در معرض قابل‌توجه دود، سوخت، کپک یا حیوانات هستید؟", "اخیراً سفر طولانی یا بی‌حرکتی طولانی داشته‌اید؟", "اخیراً جراحی شده‌اید یا بستری بوده‌اید؟", "تا حالا DVT یا Pulmonary Embolism داشته‌اید؟", "اخیراً درد یا تورم یک‌طرفه پا داشته‌اید؟", "اخیراً با فرد مبتلا به سل یا عفونت تنفسی مهم تماس داشته‌اید؟", "مشکل بلع، خفگی هنگام غذا خوردن یا رفلاکس و برگشت غذا دارید؟", "در خانواده سابقه آسم، بیماری ریوی، لخته خون یا بیماری ارثی مهم وجود دارد؟"
  ];
  return questions[index] ?? "سؤال History";
}

function PhysicalExamView({ caseItem }: { caseItem: Case }) {
  const items = getPhysicalExamItems(caseItem);
  return <div><div className="mb-5 flex items-center justify-between"><h3 className="text-lg font-bold">Physical Exam — {items.length} یافته</h3><span className="text-xs text-slate-400">یافته‌های ثابت همین بیمار</span></div><div className="grid gap-3 md:grid-cols-2">{items.map((item) => <article key={item.id} className="rounded-2xl border border-slate-200 p-4"><p className="text-sm font-bold">{PE_CATEGORY_LABELS[item.sourceId ?? ""] ?? item.label ?? item.sourceId}</p><p className="mt-2 text-sm leading-7 text-slate-600">{item.content}</p></article>)}</div></div>;
}

function InvestigationView({ caseItem }: { caseItem: Case }) {
  const items = getInvestigationItems(caseItem);
  return <div><div className="mb-5 flex items-center justify-between"><h3 className="text-lg font-bold">Investigation — {items.length} مورد</h3><span className="text-xs text-slate-400">نتایج اختصاصی کیس</span></div><div className="space-y-3">{items.map((item) => <article key={item.id} className="rounded-2xl border border-slate-200 p-4"><div className="flex flex-col gap-2 md:flex-row md:items-start md:justify-between"><div><h4 className="font-bold">{item.name}</h4><p className="mt-1 text-xs text-slate-400">{item.category}</p></div><span className={`rounded-full px-3 py-1 text-xs font-semibold ${item.relevance === "high" ? "bg-emerald-50 text-emerald-700" : item.relevance === "low" ? "bg-amber-50 text-amber-700" : "bg-slate-100 text-slate-500"}`}>{item.relevance === "high" ? "اهمیت بالا" : item.relevance === "low" ? "اهمیت کم" : "غیرکمکی"}</span></div><div className="mt-4 grid gap-2">{item.findings.map((finding) => <div key={`${item.id}-${finding.label}`} className="rounded-xl bg-slate-50 p-3 text-sm"><span className="font-semibold">{finding.label}:</span> <span className="text-slate-700">{finding.value}</span></div>)}</div></article>)}</div></div>;
}
