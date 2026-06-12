"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

interface Props {
  children: string;
  className?: string;
  as?: "h1" | "h2" | "h3" | "p";
  /** stagger each word (default), each char, or blur-in per word */
  by?: "word" | "char" | "blur";
  delay?: number;
  /** if true, animates immediately (no scroll trigger) */
  immediate?: boolean;
}

export default function SplitHeadline({
  children,
  className = "",
  as: Tag = "h2",
  by = "word",
  delay = 0,
  immediate = false,
}: Props) {
  const ref = useRef<HTMLElement>(null);

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);
    const el = ref.current;
    if (!el) return;
    if (matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    const isBlur = by === "blur";
    const words  = children.split(" ");
    const chars  = children.split("").map((ch) => (ch === " " ? " " : ch));
    const units  = by === "char" ? chars : words;

    // Build spans
    el.innerHTML = units
      .map((u, i) =>
        u === " "
          ? " "
          : `<span class="split-unit" style="display:inline-block;overflow:hidden;vertical-align:bottom"><span class="split-inner" style="display:inline-block">${u}</span></span>${i < units.length - 1 && by !== "char" ? " " : ""}`
      )
      .join("");

    const inners = el.querySelectorAll<HTMLElement>(".split-inner");

    const fromVars = isBlur
      ? { opacity: 0, filter: "blur(14px)", y: 18 }
      : { yPercent: 110, opacity: 0 };

    const toVars = isBlur
      ? { opacity: 1, filter: "blur(0px)", y: 0 }
      : { yPercent: 0, opacity: 1 };

    const anim = gsap.fromTo(inners, fromVars, {
      ...toVars,
      duration:  isBlur ? 1.0 : 0.8,
      ease:      isBlur ? "power2.out" : "power3.out",
      stagger:   by === "char" ? 0.022 : 0.07,
      delay,
      ...(immediate
        ? {}
        : {
            scrollTrigger: {
              trigger: el,
              start: "top 90%",
              once: true,
            },
          }),
    });

    return () => {
      anim.kill();
      ScrollTrigger.getAll()
        .filter((t) => t.trigger === el)
        .forEach((t) => t.kill());
    };
  }, [children, by, delay, immediate]);

  return (
    // @ts-expect-error dynamic tag
    <Tag ref={ref} className={className}>
      {children}
    </Tag>
  );
}
