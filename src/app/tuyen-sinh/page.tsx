import type { Metadata } from "next";
import Link from "next/link";

import { Contact } from "@/components/sections/Contact";

export const metadata: Metadata = {
  title: "Tuyển sinh 2026 | Trung tâm Guitar Trung Hiếu",
  description:
    "Tuyển sinh 2026 — học thử miễn phí cùng giáo viên Học viện Âm nhạc Quốc gia. Khóa 30 buổi tặng đàn.",
};

const OFFERS = [
  {
    name: "Khóa 30 buổi · Lớp nhóm",
    format: "Nhóm 4 – 6 học viên",
    duration: "60 phút / buổi",
    gift: "Tặng 01 đàn trị giá 1.150.000 VNĐ",
  },
  {
    name: "Khóa 30 buổi · 1 kèm 1",
    format: "Kèm riêng với giáo viên",
    duration: "60 phút / buổi",
    gift: "Tặng 01 đàn trị giá 2.250.000 VNĐ",
  },
];

const AUDIENCES = [
  {
    href: "/khoa-hoc/tre-em",
    eyebrow: "6 – 15 tuổi",
    title: "Dành cho trẻ em",
  },
  {
    href: "/khoa-hoc/nguoi-lon",
    eyebrow: "Từ 16 tuổi",
    title: "Dành cho người lớn",
  },
];

export default function AdmissionsPage() {
  return (
    <main className="pt-24 md:pt-28">
      <section className="mx-auto max-w-3xl px-6 py-12 text-center">
        <p className="inline-block rounded-full bg-ember-600 px-5 py-1.5 font-display text-[0.7rem] font-semibold uppercase tracking-[0.3em] text-white">
          Tuyển sinh 2026
        </p>
        <h1 className="mt-6 font-display text-3xl font-bold uppercase leading-tight tracking-tight text-bone sm:text-4xl md:text-5xl">
          Học thử miễn phí cùng giáo viên Học viện Âm nhạc Quốc gia
        </h1>
        <p className="mt-5 text-sm leading-relaxed text-muted sm:text-base">
          Guitar cổ điển · Guitar solo · Guitar đệm hát
        </p>
      </section>

      <section className="mx-auto max-w-4xl px-6">
        <div className="grid gap-5 md:grid-cols-2">
          {OFFERS.map((offer) => (
            <div
              key={offer.name}
              className="rounded-3xl border border-smoke bg-white/70 p-7 backdrop-blur-sm"
            >
              <h2 className="font-display text-lg font-bold uppercase tracking-tight text-bone">
                {offer.name}
              </h2>
              <dl className="mt-4 space-y-2 text-sm text-muted">
                <div className="flex justify-between gap-4">
                  <dt>Hình thức</dt>
                  <dd className="text-right text-bone">{offer.format}</dd>
                </div>
                <div className="flex justify-between gap-4">
                  <dt>Thời lượng</dt>
                  <dd className="text-right text-bone">{offer.duration}</dd>
                </div>
              </dl>
              <p className="mt-4 border-t border-smoke pt-4 text-sm font-semibold text-ember-600">
                {offer.gift}
              </p>
            </div>
          ))}
        </div>

        <div className="mt-12 grid gap-5 md:grid-cols-2">
          {AUDIENCES.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className="group rounded-3xl border border-smoke bg-white/70 p-6 backdrop-blur-sm transition hover:border-ember-500 hover:bg-white"
            >
              <p className="font-display text-[0.65rem] uppercase tracking-[0.24em] text-ember-600">
                {item.eyebrow}
              </p>
              <h3 className="mt-2 font-display text-xl font-bold uppercase tracking-tight text-bone">
                {item.title}
              </h3>
              <span className="mt-4 inline-flex items-center gap-2 font-display text-xs font-semibold uppercase tracking-[0.18em] text-bone">
                Xem chi tiết
                <svg
                  className="w-4 transition-transform group-hover:translate-x-1"
                  viewBox="0 0 20 12"
                  fill="none"
                  aria-hidden
                >
                  <path
                    d="M1 6H18M18 6L13 1M18 6L13 11"
                    stroke="currentColor"
                    strokeWidth="1.8"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
              </span>
            </Link>
          ))}
        </div>
      </section>

      <Contact />
    </main>
  );
}
