"use client";

import { useEffect, useRef, useState } from "react";
import { useRouter } from "next/navigation";

export default function GlobalNavbar() {
  const router = useRouter();
  const [accountOpen, setAccountOpen] = useState(false);
  const accountRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    function handlePointerDown(event: MouseEvent) {
      if (!accountRef.current?.contains(event.target as Node)) {
        setAccountOpen(false);
      }
    }

    document.addEventListener("mousedown", handlePointerDown);
    return () => document.removeEventListener("mousedown", handlePointerDown);
  }, []);

  return (
    <header
      dir="rtl"
      className="fixed inset-x-0 top-0 z-[100] h-16 border-b border-slate-200 bg-white/95 backdrop-blur"
    >
      <div className="mx-auto flex h-full w-full max-w-[1600px] items-center justify-between px-5 lg:px-8">
        <button
          type="button"
          onClick={() => router.push("/")}
          aria-label="SONIC"
          className="shrink-0 text-[24px] font-extrabold tracking-tight text-[#071a52] transition-opacity hover:opacity-75"
        >
          SONIC
        </button>

        <div className="flex items-center">
          <div ref={accountRef} className="relative">
            <button
              type="button"
              onClick={() => setAccountOpen((open) => !open)}
              aria-expanded={accountOpen}
              aria-haspopup="menu"
              className="flex items-center gap-2 text-sm font-semibold text-slate-800"
            >
              <span>نیکان</span>
              <span
                aria-hidden="true"
                className={`text-xs transition-transform ${accountOpen ? "rotate-180" : ""}`}
              >
                ▾
              </span>
            </button>

            {accountOpen && (
              <div
                role="menu"
                className="absolute left-0 top-10 w-44 overflow-hidden rounded-xl border border-slate-200 bg-white py-1 shadow-[0_12px_30px_rgba(15,23,42,0.10)]"
              >
                <button
                  type="button"
                  role="menuitem"
                  onClick={() => {
                    setAccountOpen(false);
                    router.push("/account");
                  }}
                  className="block w-full px-4 py-3 text-right text-sm text-slate-700 hover:bg-slate-50"
                >
                  حساب کاربری
                </button>
                <button
                  type="button"
                  role="menuitem"
                  onClick={() => {
                    setAccountOpen(false);
                    router.push("/settings");
                  }}
                  className="block w-full border-t border-slate-100 px-4 py-3 text-right text-sm text-slate-700 hover:bg-slate-50"
                >
                  تنظیمات
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
    </header>
  );
}
