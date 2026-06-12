"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

interface Props {
  end: number;
  /** prefix before number, e.g. "" */
  prefix?: string;
  /** suffix after number, e.g. "+" or "k" */
  suffix?: string;
  duration?: number;
  className?: string;
}

export default function CountUp({
  end,
  prefix = "",
  suffix = "",
  duration = 2.2,
  className = "",
}: Props) {
  const ref = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);
    const el = ref.current;
    if (!el) return;
    if (matchMedia("(prefers-reduced-motion: reduce)").matches) {
      el.textContent = `${prefix}${end}${suffix}`;
      return;
    }

    const obj = { val: 0 };
    const tween = gsap.to(obj, {
      val: end,
      duration,
      ease: "power2.out",
      onUpdate: () => {
        el.textContent = `${prefix}${Math.round(obj.val)}${suffix}`;
      },
      scrollTrigger: {
        trigger: el,
        start: "top 88%",
        once: true,
      },
    });

    el.textContent = `${prefix}0${suffix}`;

    return () => { tween.kill(); };
  }, [end, prefix, suffix, duration]);

  return <span ref={ref} className={className}>{prefix}0{suffix}</span>;
}
