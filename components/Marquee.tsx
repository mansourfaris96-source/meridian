"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

const TEXT = "MERIDIAN · THE CALIBRE ONE · MADE TO ORDER · CONFIGURED BY YOU · ";
const REPEAT = 6; // enough copies to fill any screen width

export default function Marquee({ reverse = false }: { reverse?: boolean }) {
  const trackRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);
    const track = trackRef.current;
    if (!track) return;

    const totalWidth = track.scrollWidth / 2; // half because we duplicate
    const dir = reverse ? 1 : -1;

    // Base infinite scroll
    const tween = gsap.to(track, {
      x: dir * totalWidth,
      duration: 28,
      ease: "none",
      repeat: -1,
      modifiers: {
        x: gsap.utils.unitize((x) => parseFloat(x) % totalWidth),
      },
    });

    // Speed up / slow down with scroll velocity
    let lastScroll = window.scrollY;
    const onScroll = () => {
      const delta = window.scrollY - lastScroll;
      lastScroll = window.scrollY;
      gsap.to(tween, { timeScale: 1 + Math.abs(delta) * 0.06, duration: 0.4, ease: "power2.out",
        onComplete: () => gsap.to(tween, { timeScale: 1, duration: 1.2, ease: "power2.inOut" }),
      });
    };
    window.addEventListener("scroll", onScroll, { passive: true });

    return () => {
      tween.kill();
      window.removeEventListener("scroll", onScroll);
    };
  }, [reverse]);

  const content = TEXT.repeat(REPEAT);

  return (
    <div className="overflow-hidden border-y border-white/8 py-4">
      <div ref={trackRef} className="flex whitespace-nowrap" style={{ willChange: "transform" }}>
        {/* Duplicated so the loop is seamless */}
        {[0, 1].map((n) => (
          <span key={n} className="flex shrink-0 items-center">
            {content.split("·").map((chunk, i) => (
              <span key={i} className="flex items-center">
                <span className="font-mono text-[11px] uppercase tracking-[0.35em] text-white/30">
                  {chunk.trim()}
                </span>
                {i < content.split("·").length - 1 && (
                  <span className="mx-5 text-amber-200/40">·</span>
                )}
              </span>
            ))}
          </span>
        ))}
      </div>
    </div>
  );
}
