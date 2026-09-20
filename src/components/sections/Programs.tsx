"use client";

import Link from "next/link";
import { useRef, useState } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";

gsap.registerPlugin(ScrollTrigger, useGSAP);

const HIGHLIGHTS = [
  "Lộ trình học cá nhân hóa",
  "Giáo viên Học viện Âm nhạc Quốc gia VN",
  "Môi trường truyền cảm hứng",
];

const CLASSES = [
  {
    href: "/khoa-hoc/tre-em",
    eyebrow: "6 – 15 tuổi",
    title: "Dành cho trẻ em",
    body: "Giáo trình từ những bước làm quen đầu tiên đến khi bé tự tin chơi trọn vẹn một bài hát.",
  },
  {
    href: "/khoa-hoc/nguoi-lon",
    eyebrow: "Từ 16 tuổi",
    title: "Dành cho người lớn",
    body: "Guitar đệm hát, cổ điển và solo — học theo mục tiêu riêng, linh hoạt theo lịch của bạn.",
  },
];

const COURSES = [
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

export function Programs() {
  const [open, setOpen] = useState(false);
  const sectionRef = useRef<HTMLElement>(null);
  const panelRef = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      gsap.from("[data-program-reveal]", {
        y: 32,
        opacity: 0,
        duration: 0.8,
        ease: "power3.out",
        stagger: 0.1,
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top 75%",
        },
      });
    },
    { scope: sectionRef },
  );

  // Animate the panel's real height so the layout below it reflows smoothly.
  useGSAP(
    () => {
      const panel = panelRef.current;
      if (!panel) return;

      gsap.to(panel, {
        height: open ? "auto" : 0,
        opacity: open ? 1 : 0,
        duration: 0.5,
        ease: "power3.inOut",
      });
    },
    { dependencies: [open] },
  );

  return (
    <section
      ref={sectionRef}
      id="specs"
      className="mx-auto max-w-6xl px-6 py-24 md:py-32"
    >
      <p
        data-program-reveal
        className="text-center font-display text-[0.7rem] uppercase tracking-[0.4em] text-ember-600"
      >
        Khám phá thế giới âm nhạc
      </p>

      <h2
        data-program-reveal
        className="mx-auto mt-4 max-w-3xl text-center font-display text-3xl font-bold uppercase leading-tight tracking-tight text-bone sm:text-4xl md:text-5xl"
      >
        Đào tạo guitar chuyên nghiệp
      </h2>

      <ul
        data-program-reveal
        className="mt-8 flex flex-wrap items-center justify-center gap-x-3 gap-y-2"
      >
        {HIGHLIGHTS.map((item) => (
          <li
            key={item}
            className="rounded-full border border-smoke bg-white/70 px-4 py-2 text-xs text-muted"
          >
            {item}
          </li>
        ))}
      </ul>

      <div data-program-reveal className="mt-10 text-center">
        <button
          type="button"
          onClick={() => setOpen((value) => !value)}
          aria-expanded={open}
          aria-controls="course-table"
          className="inline-flex items-center gap-2 rounded-full bg-bone px-8 py-3.5 font-display text-xs font-semibold uppercase tracking-[0.2em] text-white transition hover:bg-ember-600 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-ember-600"
        >
          Tìm hiểu khóa học
          <svg
            className={`w-3 transition-transform duration-300 ${open ? "rotate-180" : ""}`}
            viewBox="0 0 12 8"
            fill="none"
            aria-hidden
          >
            <path
              d="M1 1.5L6 6.5L11 1.5"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        </button>
      </div>

      {/* Course table — revealed by the button above. */}
      <div
        id="course-table"
        ref={panelRef}
        className="h-0 overflow-hidden opacity-0"
      >
        <div className="mt-8 overflow-x-auto rounded-3xl border border-smoke bg-white/70 backdrop-blur-sm">
          <table className="w-full min-w-[34rem] border-collapse text-left">
            <thead>
              <tr className="border-b border-smoke">
                {["Khóa học", "Hình thức", "Thời lượng", "Ưu đãi"].map((th) => (
                  <th
                    key={th}
                    scope="col"
                    className="px-5 py-4 font-display text-[0.68rem] uppercase tracking-[0.18em] text-muted"
                  >
                    {th}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {COURSES.map((course) => (
                <tr
                  key={course.name}
                  className="border-b border-smoke/60 last:border-0"
                >
                  <td className="px-5 py-4 text-sm font-semibold text-bone">
                    {course.name}
                  </td>
                  <td className="px-5 py-4 text-sm text-muted">
                    {course.format}
                  </td>
                  <td className="px-5 py-4 text-sm text-muted">
                    {course.duration}
                  </td>
                  <td className="px-5 py-4 text-sm font-medium text-ember-600">
                    {course.gift}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Audience split. */}
      <div className="mt-14 grid gap-5 md:grid-cols-2">
        {CLASSES.map((item) => (
          <Link
            key={item.href}
            href={item.href}
            data-program-reveal
            className="group rounded-3xl border border-smoke bg-white/70 p-7 backdrop-blur-sm transition hover:border-ember-500 hover:bg-white focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-ember-600"
          >
            <p className="font-display text-[0.65rem] uppercase tracking-[0.24em] text-ember-600">
              {item.eyebrow}
            </p>
            <h3 className="mt-2 font-display text-2xl font-bold uppercase tracking-tight text-bone">
              {item.title}
            </h3>
            <p className="mt-3 text-sm leading-relaxed text-muted">
              {item.body}
            </p>
            <span className="mt-5 inline-flex items-center gap-2 font-display text-xs font-semibold uppercase tracking-[0.18em] text-bone">
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
  );
}
