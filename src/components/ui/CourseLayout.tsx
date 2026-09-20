import Link from "next/link";
import type { ReactNode } from "react";

import { CONTACT } from "@/lib/site";

type CourseLayoutProps = {
  eyebrow: string;
  title: string;
  children: ReactNode;
};

/** Shared chrome for the individual course pages. */
export function CourseLayout({ eyebrow, title, children }: CourseLayoutProps) {
  return (
    <main className="mx-auto max-w-3xl px-6 pb-24 pt-28 md:pt-32">
      <Link
        href="/"
        className="inline-flex items-center gap-2 font-display text-[0.68rem] uppercase tracking-[0.2em] text-muted transition hover:text-bone"
      >
        <svg className="w-4" viewBox="0 0 20 12" fill="none" aria-hidden>
          <path
            d="M19 6H2M2 6L7 1M2 6L7 11"
            stroke="currentColor"
            strokeWidth="1.8"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
        Về trang chủ
      </Link>

      <p className="mt-10 font-display text-[0.7rem] uppercase tracking-[0.35em] text-ember-600">
        {eyebrow}
      </p>
      <h1 className="mt-3 font-display text-3xl font-bold uppercase leading-tight tracking-tight text-bone sm:text-4xl md:text-5xl">
        {title}
      </h1>

      {children}

      <footer className="mt-16 rounded-3xl border border-smoke bg-white/70 p-7 backdrop-blur-sm">
        <p className="font-display text-sm font-semibold uppercase tracking-[0.16em] text-bone">
          {CONTACT.name}
        </p>
        <p className="mt-2 text-sm text-muted">{CONTACT.address}</p>
        <a
          href={CONTACT.phoneHref}
          className="mt-3 inline-block font-display text-lg font-bold text-ember-600 transition hover:text-ember-700"
        >
          {CONTACT.phone}
        </a>
      </footer>
    </main>
  );
}

/** A titled block of body copy or a bulleted list. */
export function CourseBlock({
  heading,
  children,
}: {
  heading: string;
  children: ReactNode;
}) {
  return (
    <section className="mt-12">
      <h2 className="font-display text-xl font-bold uppercase tracking-tight text-bone">
        {heading}
      </h2>
      <div className="mt-4 space-y-4 text-sm leading-relaxed text-muted sm:text-base">
        {children}
      </div>
    </section>
  );
}
