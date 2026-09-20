"use client";

import dynamic from "next/dynamic";
import { useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";

import { SceneErrorBoundary } from "@/components/three/SceneErrorBoundary";
import { Doodles } from "@/components/ui/Doodles";

gsap.registerPlugin(ScrollTrigger, useGSAP);

// WebGL has no server-rendered form, so the whole scene is client-only.
// `ssr: false` is legal here because this module is a Client Component.
const GuitarScene = dynamic(
  () => import("@/components/three/GuitarScene").then((m) => m.GuitarScene),
  {
    ssr: false,
    loading: () => <div className="absolute inset-0 bg-void" />,
  },
);

export function Hero() {
  const sectionRef = useRef<HTMLElement>(null);
  const copyRef = useRef<HTMLDivElement>(null);
  const scrollProgress = useRef(0);

  useGSAP(
    () => {
      // Intro: headline and supporting copy stagger in once the scene mounts.
      gsap.from("[data-hero-reveal]", {
        y: 40,
        opacity: 0,
        duration: 1.1,
        ease: "power3.out",
        stagger: 0.12,
        delay: 0.25,
      });

      // Scroll: feed progress to the 3D camera and fade the copy out of the way.
      ScrollTrigger.create({
        trigger: sectionRef.current,
        start: "top top",
        end: "bottom top",
        scrub: true,
        onUpdate: (self) => {
          scrollProgress.current = self.progress;
        },
      });

      gsap.to(copyRef.current, {
        opacity: 0,
        y: -60,
        ease: "none",
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top top",
          end: "50% top",
          scrub: true,
        },
      });
    },
    { scope: sectionRef },
  );

  return (
    <section
      ref={sectionRef}
      className="relative h-[200vh]"
      aria-label="Trung Hieu Guitar Center"
    >
      {/* The viewport-height stage stays pinned while the 200vh section scrolls. */}
      <div className="sticky top-0 h-screen overflow-hidden">
        {/* Nudge the whole canvas down so the instrument clears the copy. */}
        <div className="absolute inset-0 translate-y-40 md:translate-y-48">
          <SceneErrorBoundary>
            <GuitarScene progressRef={scrollProgress} />
          </SceneErrorBoundary>
        </div>

        {/* Oversized watermark behind the instrument. */}
        <div
          aria-hidden
          className="pointer-events-none absolute inset-x-0 top-[62%] z-0 select-none text-center"
        >
          <span className="font-display text-[18vw] font-bold uppercase leading-none tracking-tight text-white/45">
            Trung Hieu
          </span>
        </div>

        <Doodles />

        {/* Headline sits above the instrument. */}
        <div
          ref={copyRef}
          className="pointer-events-none absolute inset-x-0 top-0 z-10 flex flex-col items-center px-6 pt-24 text-center md:pt-28"
        >
          <p
            data-hero-reveal
            className="rounded-full bg-ember-600 px-5 py-1.5 font-display text-[0.7rem] font-semibold uppercase tracking-[0.3em] text-white"
          >
            Tuyển sinh 2026
          </p>

          <h1
            data-hero-reveal
            className="mt-6 max-w-3xl font-display text-3xl font-bold uppercase leading-[1.12] tracking-tight text-bone sm:text-4xl md:text-5xl"
          >
            Học thử miễn phí cùng giáo viên
            <br />
            Học viện Âm nhạc Quốc gia
          </h1>

          <ul
            data-hero-reveal
            className="mt-7 grid w-full max-w-2xl gap-3 text-left sm:grid-cols-2"
          >
            <li className="rounded-2xl border border-smoke bg-white/70 p-4 backdrop-blur-sm">
              <p className="font-display text-xs font-semibold uppercase tracking-[0.16em] text-bone">
                Khóa 30 buổi
              </p>
              <p className="mt-1.5 text-sm leading-relaxed text-muted">
                Tặng 01 đàn trị giá{" "}
                <span className="font-semibold text-ember-600">
                  1.150.000&nbsp;VNĐ
                </span>
              </p>
            </li>

            <li className="rounded-2xl border border-smoke bg-white/70 p-4 backdrop-blur-sm">
              <p className="font-display text-xs font-semibold uppercase tracking-[0.16em] text-bone">
                Khóa 30 buổi · 1 kèm 1
              </p>
              <p className="mt-1.5 text-sm leading-relaxed text-muted">
                Tặng 01 đàn trị giá{" "}
                <span className="font-semibold text-ember-600">
                  2.250.000&nbsp;VNĐ
                </span>
              </p>
            </li>
          </ul>

          <p
            data-hero-reveal
            className="mt-5 font-display text-xs uppercase tracking-[0.22em] text-muted"
          >
            Guitar cổ điển · Guitar solo · Guitar đệm hát
          </p>

          <div
            data-hero-reveal
            className="pointer-events-auto mt-7 flex flex-wrap items-center justify-center gap-3"
          >
            <a
              href="#reserve"
              className="rounded-full bg-bone px-8 py-3.5 font-display text-xs font-semibold uppercase tracking-[0.2em] text-white transition hover:bg-ember-600 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-ember-600"
            >
              Đăng ký ngay
            </a>
          </div>
        </div>

        {/* Interaction hint, bottom-left. */}
        <div className="pointer-events-none absolute bottom-8 left-6 z-10 hidden md:block">
          <p className="font-mono text-[0.68rem] uppercase tracking-[0.18em] text-muted/80">
            Kéo để xoay · cuộn để khám phá
          </p>
        </div>

        {/* Fade into whatever section comes next. */}
        <div
          aria-hidden
          className="pointer-events-none absolute inset-x-0 bottom-0 h-32 bg-gradient-to-t from-void to-transparent"
        />
      </div>
    </section>
  );
}
