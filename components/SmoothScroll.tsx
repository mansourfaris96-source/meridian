"use client";

import { ReactLenis, useLenis } from "lenis/react";
import { useEffect, type ReactNode } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

// Keeps GSAP ScrollTrigger in sync with Lenis' smooth-scroll frames so
// scroll-linked animations track the eased scroll position exactly.
function GsapLenisSync() {
  useLenis(() => ScrollTrigger.update());
  return null;
}

export default function SmoothScroll({ children }: { children: ReactNode }) {
  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);
  }, []);

  return (
    <ReactLenis root options={{ lerp: 0.1, smoothWheel: true, anchors: true }}>
      <GsapLenisSync />
      {children}
    </ReactLenis>
  );
}
