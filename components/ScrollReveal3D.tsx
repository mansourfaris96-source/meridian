"use client";

import { useEffect, useRef, type ReactNode } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

// Wraps any section with a 3D tilt-in effect on scroll.
// The section starts rotated back (rotateX) and lifts forward into view.
export default function ScrollReveal3D({
  children,
  className = "",
  rotateFrom = 12,
  delay = 0,
}: {
  children: ReactNode;
  className?: string;
  rotateFrom?: number;
  delay?: number;
}) {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);
    const el = ref.current;
    if (!el) return;

    const reduce = matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reduce) return;

    const ctx = gsap.context(() => {
      gsap.fromTo(
        el,
        {
          rotateX: rotateFrom,
          opacity: 0,
          y: 60,
          transformOrigin: "top center",
        },
        {
          rotateX: 0,
          opacity: 1,
          y: 0,
          duration: 1.1,
          delay,
          ease: "power3.out",
          scrollTrigger: {
            trigger: el,
            start: "top 88%",
            once: true,
          },
        }
      );
    }, ref);

    return () => ctx.revert();
  }, [rotateFrom, delay]);

  return (
    // perspective wrapper is required for rotateX to look 3D
    <div style={{ perspective: "1200px" }} className={className}>
      <div ref={ref} style={{ opacity: 0 }}>
        {children}
      </div>
    </div>
  );
}
