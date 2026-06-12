"use client";

import { useEffect, useRef } from "react";

/**
 * A radial-gradient spotlight that follows the cursor.
 * Layered BELOW MagneticCursor (z-[9490]) so it doesn't interfere.
 * Only visible on fine-pointer devices; invisible on touch.
 */
export default function SpotlightCursor() {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    if (!matchMedia("(hover:hover) and (pointer:fine)").matches) return;

    let mx = -9999, my = -9999;
    let cx = mx, cy = my;
    let raf = 0;

    const onMove = (e: MouseEvent) => { mx = e.clientX; my = e.clientY; };
    window.addEventListener("mousemove", onMove);

    const loop = () => {
      cx += (mx - cx) * 0.07;
      cy += (my - cy) * 0.07;
      el.style.background = `radial-gradient(420px circle at ${cx}px ${cy}px, rgba(201,168,83,0.055) 0%, rgba(201,168,83,0.02) 35%, transparent 70%)`;
      raf = requestAnimationFrame(loop);
    };
    raf = requestAnimationFrame(loop);

    return () => {
      window.removeEventListener("mousemove", onMove);
      cancelAnimationFrame(raf);
    };
  }, []);

  return (
    <div
      ref={ref}
      className="pointer-events-none fixed inset-0 z-[9490]"
      style={{ mixBlendMode: "screen" }}
    />
  );
}
