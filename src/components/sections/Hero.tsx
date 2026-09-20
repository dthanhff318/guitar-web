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
        <div className="absolute inset-0 translate-y-12">
          <SceneErrorBoundary>
            <GuitarScene progressRef={scrollProgress} />
          </SceneErrorBoundary>
        </div>

        {/* Oversized watermark behind the instrument. */}
        <div
          aria-hidden
          className="pointer-events-none absolute inset-x-0 top-[46%] z-0 select-none text-center"
        >
          <span className="font-display text-[22vw] font-bold uppercase leading-none tracking-tight text-white/45">
            Trung Hieu
          </span>
        </div>

        <Doodles />

        {/* Headline sits above the instrument. */}
        <div
          ref={copyRef}
          className="pointer-events-none absolute inset-x-0 top-0 z-10 flex flex-col items-center px-6 pt-28 text-center md:pt-32"
        >
          <h1
            data-hero-reveal
            className="max-w-3xl font-display text-4xl font-bold leading-[1.08] tracking-tight text-bone sm:text-5xl md:text-6xl"
          >
            Cây đàn huyền thoại,
            <br />
            dành cho người chơi thật sự.
          </h1>

          <p
            data-hero-reveal
            className="mt-6 max-w-md text-balance text-sm leading-relaxed text-muted sm:text-base"
          >
            Guitar điện, acoustic và phụ kiện chính hãng. Thử đàn trực tiếp tại
            cửa hàng, bảo hành 12 tháng, giao hàng toàn quốc.
          </p>

          <div
            data-hero-reveal
            className="pointer-events-auto mt-8 flex flex-wrap items-center justify-center gap-3"
          >
            <a
              href="#reserve"
              className="rounded-full bg-bone px-7 py-3 font-display text-xs font-semibold uppercase tracking-[0.2em] text-void transition hover:bg-ember-600 hover:text-white focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-ember-600"
            >
              Liên hệ tư vấn
            </a>
            <a
              href="#specs"
              className="rounded-full border border-smoke bg-white/60 px-7 py-3 font-display text-xs font-semibold uppercase tracking-[0.2em] text-bone transition hover:border-ember-500 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-ember-600"
            >
              Xem sản phẩm
            </a>
          </div>
        </div>

        {/* "NEW!" marker, echoing the reference layout. */}
        <div
          aria-hidden
          className="pointer-events-none absolute left-[46%] top-[40%] z-10 hidden -rotate-6 md:block"
        >
          <span className="font-display text-lg font-bold uppercase tracking-wide text-ember-500">
            New!
          </span>
          <svg
            className="mx-auto mt-1 w-4 text-ember-500"
            viewBox="0 0 20 28"
            fill="none"
          >
            <path
              d="M10 2V24M10 24L3 17M10 24L17 17"
              stroke="currentColor"
              strokeWidth="2.2"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
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
