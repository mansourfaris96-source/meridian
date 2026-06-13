"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import SplineScene from "./SplineScene";
import SplitHeadline from "./SplitHeadline";
import HeroParticles from "./HeroParticles";
import { PRODUCT } from "@/lib/product.config";
import { SPLINE_SCENE_URL, DEMO_SCENE_URL } from "@/lib/spline-config";

export default function Hero() {
  const sectionRef  = useRef<HTMLElement>(null);
  const videoRef    = useRef<HTMLVideoElement>(null);
  const sceneRef    = useRef<HTMLDivElement>(null);
  const contentRef  = useRef<HTMLDivElement>(null);

  const heroScene = SPLINE_SCENE_URL.trim() || DEMO_SCENE_URL;
  const usingDemo = !SPLINE_SCENE_URL.trim();

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);
    const reduce = matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reduce) return;
    const ctx = gsap.context(() => {
      const tl = gsap.timeline({
        scrollTrigger: { trigger: sectionRef.current, start: "top top", end: "bottom top", scrub: true },
      });
      tl.to(contentRef.current, { y: -90, opacity: 0, ease: "none" }, 0);
      tl.to(videoRef.current,   { scale: 1.12, opacity: 0.1, ease: "none" }, 0);
      tl.to(sceneRef.current,   { scale: 1.12, opacity: 0,   ease: "none" }, 0);
    }, sectionRef);
    return () => ctx.revert();
  }, []);

  return (
    <section ref={sectionRef} className="relative flex min-h-svh flex-col items-center justify-center overflow-hidden px-6 text-center">

      {/* Layer 0 — Higgsfield cinematic video */}
      <video
        ref={videoRef}
        className="absolute inset-0 z-0 h-full w-full object-cover"
        src="/hero-bg.mp4"
        autoPlay
        loop
        muted
        playsInline
        preload="auto"
      />

      {/* Layer 1 — subtle dark vignette so text stays readable */}
      <div className="pointer-events-none absolute inset-0 z-[1] bg-gradient-to-t from-[#08080a] via-[#08080a]/30 to-transparent" />
      <div className="pointer-events-none absolute inset-0 z-[1] bg-[radial-gradient(60%_50%_at_50%_35%,rgba(201,168,83,0.10),transparent_70%)]" />

      {/* Layer 2 — Spline 3D robot (transparent canvas sits above video) */}
      <div ref={sceneRef} className="absolute inset-0 z-[2]">
        <SplineScene scene={heroScene} />
      </div>

      {usingDemo && (
        <span className="absolute right-5 top-20 z-10 rounded-full border border-white/10 bg-black/40 px-3 py-1 font-mono text-[10px] text-white/50 backdrop-blur">
          demo scene · replace in lib/spline-config.ts
        </span>
      )}

      <HeroParticles />

      <div ref={contentRef} className="pointer-events-none relative z-10 flex flex-col items-center">
        <p className="font-mono text-xs uppercase tracking-[0.4em] text-amber-200/80">{PRODUCT.brand} — Made to order</p>
        <SplitHeadline
          as="h1"
          by="blur"
          immediate
          delay={0.3}
          className="mt-6 font-serif text-6xl italic leading-[0.9] tracking-tight drop-shadow-[0_2px_20px_rgba(0,0,0,0.6)] sm:text-8xl"
        >
          {PRODUCT.name}
        </SplitHeadline>
        <p className="mt-6 max-w-md text-base leading-7 text-white/70">{PRODUCT.tagline}</p>
        <a href="#configure" className="pointer-events-auto mt-10 rounded-full bg-white px-7 py-3.5 text-sm font-semibold text-black transition hover:bg-white/90">
          Configure yours ↓
        </a>
      </div>
    </section>
  );
}
