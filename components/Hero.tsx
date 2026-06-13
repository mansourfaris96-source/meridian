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
  const sectionRef = useRef<HTMLElement>(null);
  const sceneOuterRef = useRef<HTMLDivElement>(null);
  const sceneInnerRef = useRef<HTMLDivElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);

  const heroScene = SPLINE_SCENE_URL.trim() || DEMO_SCENE_URL;
  const usingDemo = !SPLINE_SCENE_URL.trim();

  useEffect(() => {
    const el = sceneInnerRef.current;
    if (!el) return;
    const reduce = matchMedia("(prefers-reduced-motion: reduce)").matches;
    const fine = matchMedia("(hover:hover) and (pointer:fine)").matches;
    if (reduce || !fine) return;
    let raf = 0;
    let tx = 0, ty = 0, cx = 0, cy = 0;
    const onMove = (e: MouseEvent) => {
      tx = (e.clientX / window.innerWidth - 0.5) * 26;
      ty = (e.clientY / window.innerHeight - 0.5) * 26;
    };
    const loop = () => {
      cx += (tx - cx) * 0.08;
      cy += (ty - cy) * 0.08;
      el.style.transform = `translate3d(${cx}px, ${cy}px, 0) scale(1.06)`;
      raf = requestAnimationFrame(loop);
    };
    window.addEventListener("mousemove", onMove);
    raf = requestAnimationFrame(loop);
    return () => { window.removeEventListener("mousemove", onMove); cancelAnimationFrame(raf); };
  }, []);

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);
    const reduce = matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reduce) return;
    const ctx = gsap.context(() => {
      const tl = gsap.timeline({
        scrollTrigger: { trigger: sectionRef.current, start: "top top", end: "bottom top", scrub: true },
      });
      tl.to(contentRef.current, { y: -90, opacity: 0, ease: "none" }, 0);
      tl.to(sceneOuterRef.current, { scale: 1.25, opacity: 0.15, ease: "none" }, 0);
    }, sectionRef);
    return () => ctx.revert();
  }, []);

  return (
    <section ref={sectionRef} className="relative flex min-h-svh flex-col items-center justify-center overflow-hidden px-6 text-center">
      {/* Cinematic video background — workshop atmosphere */}
      <video
        className="absolute inset-0 z-[-1] h-full w-full object-cover opacity-60"
        src="/hero-bg.mp4"
        autoPlay
        loop
        muted
        playsInline
        preload="auto"
      />
      <div ref={sceneOuterRef} className="absolute inset-0 z-0">
        <div ref={sceneInnerRef} className="h-full w-full will-change-transform">
          <SplineScene scene={heroScene} />
        </div>
      </div>
      <div className="pointer-events-none absolute inset-0 z-[1] bg-gradient-to-t from-[#08080a] via-[#08080a]/55 to-[#08080a]/30" />
      <div className="pointer-events-none absolute inset-0 z-[1] bg-[radial-gradient(60%_50%_at_50%_35%,rgba(201,168,83,0.10),transparent_70%)]" />
      <HeroParticles />
      {usingDemo && (
        <span className="absolute right-5 top-20 z-10 rounded-full border border-white/10 bg-black/40 px-3 py-1 font-mono text-[10px] text-white/50 backdrop-blur">
          demo scene · replace in lib/spline-config.ts
        </span>
      )}
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
