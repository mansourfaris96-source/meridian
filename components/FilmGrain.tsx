"use client";

import { useEffect, useId, useRef } from "react";

/**
 * Animated film-grain via SVG feTurbulence filter on a full-screen div.
 * Pure CSS — no canvas scaling artefacts, no blur.
 */
export default function FilmGrain({ opacity = 0.032 }: { opacity?: number }) {
  const rawId = useId();
  const id = `grain-${rawId.replace(/:/g, "")}`;
  const animRef = useRef<number>(0);
  const filterRef = useRef<SVGFETurbulenceElement | null>(null);

  useEffect(() => {
    const el = filterRef.current;
    if (!el) return;

    let frame = 0;
    const FPS = 16;
    let last = 0;

    const tick = (now: number) => {
      animRef.current = requestAnimationFrame(tick);
      if (now - last < 1000 / FPS) return;
      last = now;
      frame++;
      el.setAttribute("seed", String(frame % 200));
    };

    animRef.current = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(animRef.current);
  }, []);

  return (
    <>
      {/* Inline SVG filter */}
      <svg width="0" height="0" className="absolute">
        <filter id={id} x="0%" y="0%" width="100%" height="100%" colorInterpolationFilters="sRGB">
          <feTurbulence
            ref={filterRef}
            type="fractalNoise"
            baseFrequency="0.65"
            numOctaves="3"
            seed="0"
            stitchTiles="stitch"
            result="noise"
          />
          <feColorMatrix type="saturate" values="0" in="noise" result="grey" />
          <feBlend in="SourceGraphic" in2="grey" mode="overlay" />
        </filter>
      </svg>

      {/* Overlay div that receives the filter */}
      <div
        className="pointer-events-none fixed inset-0 z-[9500]"
        style={{
          opacity,
          filter: `url(#${id})`,
          willChange: "filter",
        }}
      />
    </>
  );
}
