"use client";

export default function BackButton() {
  return (
    <button
      type="button"
      onClick={() => window.history.back()}
      aria-label="بازگشت"
      className="flex h-9 items-center gap-2 rounded-xl border border-slate-200 bg-white px-3 text-sm font-medium text-slate-600 transition hover:border-slate-300 hover:text-slate-900"
    >
      <span className="text-[18px] leading-none">→</span>
      <span>بازگشت</span>
    </button>
  );
}
