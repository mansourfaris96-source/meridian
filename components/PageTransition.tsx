"use client";

import { useEffect, useRef } from "react";
import { usePathname } from "next/navigation";
import gsap from "gsap";

/**
 * Gold curtain that sweeps in → out on every route change.
 * Mount once in layout.tsx, above SmoothScroll.
 */
export default function PageTransition() {
  const curtainRef = useRef<HTMLDivElement>(null);
  const pathname   = usePathname();
  const firstRender = useRef(true);

  useEffect(() => {
    const el = curtainRef.current;
    if (!el) return;

    if (firstRender.current) {
      firstRender.current = false;
      // On first load: sweep out once (site enters)
      gsap.fromTo(
        el,
        { scaleY: 1, transformOrigin: "top center" },
        { scaleY: 0, duration: 0.9, ease: "power3.inOut", delay: 0.05 }
      );
      return;
    }

    // Subsequent navigations: sweep in then out
    const tl = gsap.timeline();
    tl.fromTo(
      el,
      { scaleY: 0, transformOrigin: "bottom center" },
      { scaleY: 1, duration: 0.45, ease: "power3.inOut" }
    ).to(el, {
      scaleY: 0,
      transformOrigin: "top center",
      duration: 0.45,
      ease: "power3.inOut",
      delay: 0.05,
    });

    return () => { tl.kill(); };
  }, [pathname]);

  return (
    <div
      ref={curtainRef}
      className="pointer-events-none fixed inset-0 z-[9000] origin-top"
      style={{
        background:
          "linear-gradient(135deg, #c9a853 0%, #e8c96b 40%, #a07830 100%)",
        transform: "scaleY(0)",
      }}
    />
  );
}
