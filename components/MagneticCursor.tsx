"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";

export default function MagneticCursor() {
  const dotRef  = useRef<HTMLDivElement>(null);
  const ringRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const dot  = dotRef.current;
    const ring = ringRef.current;
    if (!dot || !ring) return;

    // Only on fine pointer devices
    if (!matchMedia("(hover:hover) and (pointer:fine)").matches) return;

    // Hide the native cursor site-wide
    document.documentElement.style.cursor = "none";

    let mx = window.innerWidth  / 2;
    let my = window.innerHeight / 2;
    let rx = mx, ry = my; // ring lags behind

    // Track raw mouse
    const onMove = (e: MouseEvent) => {
      mx = e.clientX;
      my = e.clientY;

      // Dot follows instantly
      gsap.set(dot, { x: mx, y: my });
    };
    window.addEventListener("mousemove", onMove);

    // Ring follows with lerp
    let raf = 0;
    const loop = () => {
      rx += (mx - rx) * 0.12;
      ry += (my - ry) * 0.12;
      gsap.set(ring, { x: rx, y: ry });
      raf = requestAnimationFrame(loop);
    };
    raf = requestAnimationFrame(loop);

    // Hover states
    const onEnter = (e: Event) => {
      const el = e.currentTarget as HTMLElement;
      const rect = el.getBoundingClientRect();
      const isLink = el.tagName === "A" || el.tagName === "BUTTON";

      gsap.to(ring, {
        width: isLink ? 56 : 44,
        height: isLink ? 56 : 44,
        borderColor: "rgba(201,168,83,0.8)",
        duration: 0.3,
        ease: "power2.out",
      });
      gsap.to(dot, { scale: 0, duration: 0.2 });

      // Magnetic pull: move ring toward element center
      if (isLink) {
        const cx = rect.left + rect.width  / 2;
        const cy = rect.top  + rect.height / 2;
        el.addEventListener("mousemove", (ev: MouseEvent) => {
          const dx = (ev.clientX - cx) * 0.35;
          const dy = (ev.clientY - cy) * 0.35;
          gsap.to(el, { x: dx, y: dy, duration: 0.3, ease: "power2.out" });
          gsap.to(ring, { x: cx + dx, y: cy + dy, duration: 0.15 });
        });
      }
    };

    const onLeave = (e: Event) => {
      const el = e.currentTarget as HTMLElement;
      gsap.to(ring, { width: 32, height: 32, borderColor: "rgba(255,255,255,0.5)", duration: 0.4, ease: "power2.out" });
      gsap.to(dot, { scale: 1, duration: 0.2 });
      gsap.to(el, { x: 0, y: 0, duration: 0.5, ease: "elastic.out(1,0.4)" });
    };

    const targets = document.querySelectorAll("a, button, [data-cursor]");
    targets.forEach((el) => {
      el.addEventListener("mouseenter", onEnter);
      el.addEventListener("mouseleave", onLeave);
    });

    // Re-scan on DOM changes (Next.js navigation)
    const observer = new MutationObserver(() => {
      document.querySelectorAll("a, button, [data-cursor]").forEach((el) => {
        el.removeEventListener("mouseenter", onEnter);
        el.removeEventListener("mouseleave", onLeave);
        el.addEventListener("mouseenter", onEnter);
        el.addEventListener("mouseleave", onLeave);
      });
    });
    observer.observe(document.body, { childList: true, subtree: true });

    return () => {
      window.removeEventListener("mousemove", onMove);
      cancelAnimationFrame(raf);
      document.documentElement.style.cursor = "";
      observer.disconnect();
    };
  }, []);

  return (
    <>
      {/* Dot — snaps instantly */}
      <div
        ref={dotRef}
        className="pointer-events-none fixed left-0 top-0 z-[9999] h-2 w-2 -translate-x-1/2 -translate-y-1/2 rounded-full bg-white"
        style={{ willChange: "transform" }}
      />
      {/* Ring — follows with lag */}
      <div
        ref={ringRef}
        className="pointer-events-none fixed left-0 top-0 z-[9998] h-8 w-8 -translate-x-1/2 -translate-y-1/2 rounded-full border border-white/50"
        style={{ willChange: "transform" }}
      />
    </>
  );
}
