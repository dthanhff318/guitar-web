"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";

import { RegisterButton } from "./RegisterButton";

const TABS = [
  { href: "/", label: "Trang chủ" },
  { href: "/gioi-thieu", label: "Giới thiệu" },
  { href: "/san-pham", label: "Sản phẩm" },
  { href: "/tuyen-sinh", label: "Tuyển sinh" },
  { href: "/tin-tuc", label: "Tin tức" },
];

export function SiteNav() {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);

  const isActive = (href: string) =>
    href === "/" ? pathname === "/" : pathname.startsWith(href);

  return (
    <header className="fixed inset-x-0 top-0 z-50 border-b border-smoke/60 bg-void/80 backdrop-blur-md">
      <nav className="mx-auto flex max-w-6xl items-center justify-between gap-4 px-6 py-4">
        <Link href="/" className="shrink-0 leading-none">
          <span className="block font-display text-sm font-semibold uppercase tracking-[0.28em] text-bone">
            Trung Hieu
          </span>
          <span className="block font-display text-[0.6rem] uppercase tracking-[0.42em] text-ember-600">
            Guitar Center
          </span>
        </Link>

        <div className="hidden items-center gap-7 lg:flex">
          {TABS.map((tab) => (
            <Link
              key={tab.href}
              href={tab.href}
              aria-current={isActive(tab.href) ? "page" : undefined}
              className={`font-display text-[0.7rem] uppercase tracking-[0.2em] transition ${
                isActive(tab.href)
                  ? "text-ember-600"
                  : "text-muted hover:text-bone"
              }`}
            >
              {tab.label}
            </Link>
          ))}
        </div>

        <div className="flex items-center gap-3">
          <RegisterButton className="hidden rounded-full bg-bone px-5 py-2 font-display text-[0.7rem] uppercase tracking-[0.2em] text-white transition hover:bg-ember-600 sm:block">
            Đăng ký
          </RegisterButton>

          <button
            type="button"
            onClick={() => setOpen((value) => !value)}
            aria-expanded={open}
            aria-label="Mở menu"
            className="grid size-9 place-items-center rounded-full border border-smoke text-bone lg:hidden"
          >
            <svg className="w-4" viewBox="0 0 16 12" fill="none" aria-hidden>
              <path
                d={open ? "M2 2L14 10M14 2L2 10" : "M1 1H15M1 6H15M1 11H15"}
                stroke="currentColor"
                strokeWidth="1.8"
                strokeLinecap="round"
              />
            </svg>
          </button>
        </div>
      </nav>

      {open ? (
        <div className="border-t border-smoke/60 bg-void/95 lg:hidden">
          <div className="mx-auto flex max-w-6xl flex-col px-6 py-3">
            {TABS.map((tab) => (
              <Link
                key={tab.href}
                href={tab.href}
                onClick={() => setOpen(false)}
                className={`border-b border-smoke/40 py-3 font-display text-xs uppercase tracking-[0.2em] last:border-0 ${
                  isActive(tab.href) ? "text-ember-600" : "text-muted"
                }`}
              >
                {tab.label}
              </Link>
            ))}

            <RegisterButton
              onOpen={() => setOpen(false)}
              className="mt-4 rounded-full bg-bone px-5 py-3 font-display text-xs font-semibold uppercase tracking-[0.2em] text-white transition hover:bg-ember-600 sm:hidden"
            >
              Đăng ký học
            </RegisterButton>
          </div>
        </div>
      ) : null}
    </header>
  );
}
