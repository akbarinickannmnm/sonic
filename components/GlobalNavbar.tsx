"use client";

import { useEffect, useRef, useState } from "react";
import { useRouter } from "next/navigation";

function ProfileIcon() {
  return (
    <svg
      width="21"
      height="21"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.7"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
    >
      <circle cx="12" cy="8" r="3.2" />
      <path d="M5.5 19.2c.9-3 3.1-4.7 6.5-4.7s5.6 1.7 6.5 4.7" />
    </svg>
  );
}

function ChevronIcon({ open }: { open: boolean }) {
  return (
    <svg
      width="16"
      height="16"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.8"
      strokeLinecap="round"
      strokeLinejoin="round"
      className={`transition-transform ${open ? "rotate-180" : ""}`}
      aria-hidden="true"
    >
      <path d="m6 9 6 6 6-6" />
    </svg>
  );
}

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
      className="relative z-[100] h-[76px] border-b border-[#ece9e4] bg-[#fbfaf8]/95 shadow-[0_2px_12px_rgba(15,23,42,0.035)] backdrop-blur"
    >
      <div className="mx-auto flex h-full w-full max-w-[1180px] items-center justify-between px-5 lg:px-8">
        <button
          type="button"
          onClick={() => router.push("/")}
          aria-label="SONIC"
          className="shrink-0 text-[30px] font-medium tracking-[-0.045em] text-[#1b2434] transition-opacity hover:opacity-75"
          dir="ltr"
        >
          SONIC
        </button>

        <div ref={accountRef} className="relative">
          <button
            type="button"
            onClick={() => setAccountOpen((open) => !open)}
            aria-expanded={accountOpen}
            aria-haspopup="menu"
            aria-label="حساب کاربری نیکان"
            className="flex items-center gap-2.5 rounded-xl border border-[#e7e9ed] bg-[#f7f8fa] px-2.5 py-1.5 text-[#1b2434] transition-colors hover:bg-[#f2f4f6]"
          >
            <span className="flex h-10 w-10 items-center justify-center rounded-full bg-[#edf2f7] text-[#8b9bb2]">
              <ProfileIcon />
            </span>
            <span className="text-[16px] font-medium">نیکان</span>
            <ChevronIcon open={accountOpen} />
          </button>

          {accountOpen && (
            <div
              role="menu"
              className="absolute right-0 top-[52px] w-44 overflow-hidden rounded-xl border border-slate-200 bg-white py-1 shadow-[0_12px_30px_rgba(15,23,42,0.10)]"
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
    </header>
  );
}
