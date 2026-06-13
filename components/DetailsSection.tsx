"use client";

import { useEffect, useRef, useState } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

function DialIcon({ color }: { color: string }) {
  return (
    <svg viewBox="0 0 200 200" className="h-full w-full" fill="none" suppressHydrationWarning>
      <circle cx="100" cy="100" r="88" stroke={color} strokeWidth="1.5" strokeOpacity="0.4" />
      <circle cx="100" cy="100" r="70" stroke={color} strokeWidth="0.8" strokeOpacity="0.2" />
      <circle cx="100" cy="100" r="5" fill={color} fillOpacity="0.6" />
      {Array.from({ length: 12 }).map((_, i) => {
        const a = (i / 12) * Math.PI * 2 - Math.PI / 2;
        const x1 = 100 + Math.cos(a) * 76, y1 = 100 + Math.sin(a) * 76;
        const x2 = 100 + Math.cos(a) * 87, y2 = 100 + Math.sin(a) * 87;
        return <line key={i} x1={x1} y1={y1} x2={x2} y2={y2} stroke={color} strokeWidth={i % 3 === 0 ? "2.5" : "1.2"} strokeOpacity={i % 3 === 0 ? "0.7" : "0.35"} />;
      })}
      {Array.from({ length: 60 }).map((_, i) => {
        if (i % 5 === 0) return null;
        const a = (i / 60) * Math.PI * 2 - Math.PI / 2;
        const x1 = 100 + Math.cos(a) * 80, y1 = 100 + Math.sin(a) * 80;
        const x2 = 100 + Math.cos(a) * 86, y2 = 100 + Math.sin(a) * 86;
        return <line key={i} x1={x1} y1={y1} x2={x2} y2={y2} stroke={color} strokeWidth="0.6" strokeOpacity="0.2" />;
      })}
      <line x1="100" y1="100" x2="100" y2="36" stroke={color} strokeWidth="2" strokeOpacity="0.7" strokeLinecap="round" />
      <line x1="100" y1="100" x2="136" y2="100" stroke={color} strokeWidth="1.5" strokeOpacity="0.55" strokeLinecap="round" />
      <line x1="100" y1="100" x2="100" y2="118" stroke={color} strokeWidth="1.2" strokeOpacity="0.3" strokeLinecap="round" />
    </svg>
  );
}

function CaseIcon({ color }: { color: string }) {
  return (
    <svg viewBox="0 0 200 200" className="h-full w-full" fill="none" suppressHydrationWarning>
      <rect x="48" y="32" width="104" height="136" rx="26" stroke={color} strokeWidth="2" strokeOpacity="0.4" />
      <rect x="60" y="44" width="80" height="112" rx="18" stroke={color} strokeWidth="1" strokeOpacity="0.2" />
      <rect x="144" y="80" width="14" height="10" rx="5" stroke={color} strokeWidth="1.2" strokeOpacity="0.5" />
      <rect x="144" y="94" width="14" height="14" rx="3" stroke={color} strokeWidth="1.5" strokeOpacity="0.6" />
      <rect x="144" y="112" width="14" height="10" rx="5" stroke={color} strokeWidth="1.2" strokeOpacity="0.5" />
      {[24, 134].map((y) => [52, 124].map((x) => (
        <rect key={`${x}-${y}`} x={x} y={y} width="24" height="14" rx="5" stroke={color} strokeWidth="1" strokeOpacity="0.3" />
      )))}
      <circle cx="100" cy="100" r="26" stroke={color} strokeWidth="1" strokeOpacity="0.25" />
      <line x1="80" y1="100" x2="120" y2="100" stroke={color} strokeWidth="0.8" strokeOpacity="0.2" />
      <line x1="100" y1="80" x2="100" y2="120" stroke={color} strokeWidth="0.8" strokeOpacity="0.2" />
    </svg>
  );
}

function MovementIcon({ color }: { color: string }) {
  return (
    <svg viewBox="0 0 200 200" className="h-full w-full" fill="none" suppressHydrationWarning>
      <circle cx="100" cy="100" r="78" stroke={color} strokeWidth="1.5" strokeOpacity="0.25" />
      {Array.from({ length: 28 }).map((_, i) => {
        const a1 = (i / 28) * Math.PI * 2, a2 = ((i + 0.4) / 28) * Math.PI * 2;
        return (
          <path key={i}
            d={`M${100+Math.cos(a1)*72} ${100+Math.sin(a1)*72} L${100+Math.cos(a1)*84} ${100+Math.sin(a1)*84} L${100+Math.cos(a2)*84} ${100+Math.sin(a2)*84} L${100+Math.cos(a2)*72} ${100+Math.sin(a2)*72}Z`}
            fill={color} fillOpacity="0.18" />
        );
      })}
      <circle cx="100" cy="100" r="56" stroke={color} strokeWidth="0.8" strokeOpacity="0.15" />
      <path d="M100 100 L100 30 A70 70 0 0 1 161 135 Z" fill={color} fillOpacity="0.1" stroke={color} strokeWidth="1" strokeOpacity="0.35" />
      <circle cx="60" cy="72" r="14" stroke={color} strokeWidth="1" strokeOpacity="0.3" />
      {Array.from({ length: 10 }).map((_, i) => {
        const a = (i / 10) * Math.PI * 2;
        return <line key={i} x1={60+Math.cos(a)*10} y1={72+Math.sin(a)*10} x2={60+Math.cos(a)*14} y2={72+Math.sin(a)*14} stroke={color} strokeWidth="1" strokeOpacity="0.25" />;
      })}
      <circle cx="100" cy="100" r="14" stroke={color} strokeWidth="1.5" strokeOpacity="0.5" />
      <circle cx="100" cy="100" r="4" fill={color} fillOpacity="0.7" />
      {[0,60,120,180,240,300].map((deg) => {
        const a = (deg * Math.PI) / 180;
        return <line key={deg} x1={100+Math.cos(a)*14} y1={100+Math.sin(a)*14} x2={100+Math.cos(a)*20} y2={100+Math.sin(a)*20} stroke={color} strokeWidth="1.5" strokeOpacity="0.4" />;
      })}
    </svg>
  );
}

function CrystalIcon({ color }: { color: string }) {
  return (
    <svg viewBox="0 0 200 200" className="h-full w-full" fill="none" suppressHydrationWarning>
      <polygon points="100,16 178,58 178,142 100,184 22,142 22,58" stroke={color} strokeWidth="1.5" strokeOpacity="0.4" />
      <polygon points="100,44 154,74 154,126 100,156 46,126 46,74" stroke={color} strokeWidth="1" strokeOpacity="0.2" />
      <polygon points="100,68 130,84 130,116 100,132 70,116 70,84" stroke={color} strokeWidth="0.8" strokeOpacity="0.15" />
      {[[100,16],[178,58],[178,142],[100,184],[22,142],[22,58]].map(([x1,y1],i,arr) => {
        const [x2,y2] = arr[(i+3)%6];
        return <line key={i} x1={x1} y1={y1} x2={x2} y2={y2} stroke={color} strokeWidth="0.5" strokeOpacity="0.12" />;
      })}
      <circle cx="100" cy="100" r="8" fill={color} fillOpacity="0.5" />
      <circle cx="100" cy="100" r="4" fill={color} fillOpacity="0.8" />
      {[0,60,120,180,240,300].map((deg) => {
        const a = (deg*Math.PI)/180;
        return <line key={deg} x1={100+Math.cos(a)*8} y1={100+Math.sin(a)*8} x2={100+Math.cos(a)*28} y2={100+Math.sin(a)*28} stroke={color} strokeWidth="0.6" strokeOpacity="0.25" />;
      })}
    </svg>
  );
}

function CasebackIcon({ color }: { color: string }) {
  return (
    <svg viewBox="0 0 200 200" className="h-full w-full" fill="none" suppressHydrationWarning>
      <circle cx="100" cy="100" r="86" stroke={color} strokeWidth="1.5" strokeOpacity="0.35" />
      <circle cx="100" cy="100" r="72" stroke={color} strokeWidth="1" strokeOpacity="0.2" />
      {[30,120,210,300].map((deg) => {
        const a=(deg*Math.PI)/180;
        const x=100+Math.cos(a)*79, y=100+Math.sin(a)*79;
        return <g key={deg}>
          <circle cx={x} cy={y} r="6" stroke={color} strokeWidth="1.2" strokeOpacity="0.45" />
          <line x1={x-3.5} y1={y} x2={x+3.5} y2={y} stroke={color} strokeWidth="1" strokeOpacity="0.45" />
          <line x1={x} y1={y-3.5} x2={x} y2={y+3.5} stroke={color} strokeWidth="1" strokeOpacity="0.45" />
        </g>;
      })}
      <circle cx="100" cy="100" r="48" stroke={color} strokeWidth="1" strokeOpacity="0.3" />
      <path d="M100 58 A42 42 0 1 1 58.1 121" stroke={color} strokeWidth="2.5" strokeOpacity="0.5" strokeLinecap="round" />
      <path d="M100 62 A38 38 0 1 1 62.1 120" stroke={color} strokeWidth="1" strokeOpacity="0.2" strokeLinecap="round" />
      <circle cx="100" cy="100" r="8" stroke={color} strokeWidth="1.5" strokeOpacity="0.55" />
      <circle cx="100" cy="100" r="3" fill={color} fillOpacity="0.7" />
    </svg>
  );
}

const PANELS = [
  {
    label: "01",
    category: "Dial",
    heading: "Six faces,\none soul.",
    body: "Each dial colour is mixed to a precise formula and fired at 220°C — not printed, not applied. The pigment is the surface.",
    specs: [
      { k: "Colours", v: "6 options" },
      { k: "Process", v: "Fired enamel" },
      { k: "Temp", v: "220°C" },
      { k: "Finish", v: "Lacquered" },
    ],
    accent: "#c9a853",
    bg: "from-[#1a1409] to-[#0c0c10]",
    Icon: DialIcon,
  },
  {
    label: "02",
    category: "Case",
    heading: "Machined to\n±0.01 mm.",
    body: "316L surgical steel, CNC-turned from billet. Every case passes a 48-hour water-resistance test at 5 ATM before finishing.",
    specs: [
      { k: "Material", v: "316L steel" },
      { k: "Tolerance", v: "±0.01 mm" },
      { k: "Water res.", v: "5 ATM" },
      { k: "Test", v: "48 hours" },
    ],
    accent: "#b8c8d8",
    bg: "from-[#0d1018] to-[#0c0c10]",
    Icon: CaseIcon,
  },
  {
    label: "03",
    category: "Movement",
    heading: "28,800\nvibrations/hr.",
    body: "Swiss ETA 2824-2 automatic, 38-hour power reserve. Visible through the exhibition caseback we fit to every single piece.",
    specs: [
      { k: "Calibre", v: "ETA 2824-2" },
      { k: "Frequency", v: "28,800 vph" },
      { k: "Reserve", v: "38 hours" },
      { k: "Jewels", v: "25" },
    ],
    accent: "#d4c4b0",
    bg: "from-[#14120f] to-[#0c0c10]",
    Icon: MovementIcon,
  },
  {
    label: "04",
    category: "Crystal",
    heading: "Sapphire.\nNot glass.",
    body: "Anti-reflective coated on both sides. Mohs 9 hardness — second only to diamond. Scratching it requires deliberate effort.",
    specs: [
      { k: "Material", v: "Sapphire" },
      { k: "Hardness", v: "Mohs 9" },
      { k: "Coating", v: "AR both sides" },
      { k: "Clarity", v: "Optical grade" },
    ],
    accent: "#88ccee",
    bg: "from-[#0c1018] to-[#0c0c10]",
    Icon: CrystalIcon,
  },
  {
    label: "05",
    category: "Caseback",
    heading: "A window\ninto craft.",
    body: "Exhibition caseback, edge-polished. Watch the rotor — finished in matching case colour — spin under your own wrist's motion.",
    specs: [
      { k: "Type", v: "Exhibition" },
      { k: "Finish", v: "Edge-polished" },
      { k: "Rotor", v: "Matching case" },
      { k: "Seal", v: "Screw-down" },
    ],
    accent: "#c9a853",
    bg: "from-[#16130a] to-[#0c0c10]",
    Icon: CasebackIcon,
  },
];

export default function DetailsSection() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const trackRef   = useRef<HTMLDivElement>(null);
  const [mounted, setMounted] = useState(false);
  useEffect(() => setMounted(true), []);

  const isMobile = mounted && window.innerWidth < 640;

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);
    if (window.innerWidth < 640) return;
    const section = sectionRef.current, track = trackRef.current;
    if (!section || !track) return;
    const ctx = gsap.context(() => {
      const totalWidth = track.scrollWidth - window.innerWidth;
      gsap.to(track, {
        x: -totalWidth,
        ease: "none",
        scrollTrigger: {
          trigger: section,
          start: "top top",
          end: () => `+=${totalWidth + window.innerWidth * 0.4}`,
          scrub: 1.2,
          pin: true,
          anticipatePin: 1,
        },
      });
    }, section);
    return () => ctx.revert();
  }, []);

  if (isMobile) {
    return (
      <section className="px-6 py-20">
        <p className="font-mono text-[10px] uppercase tracking-[0.4em] text-amber-200/60">The Details</p>
        <h2 className="mt-3 font-serif text-4xl italic leading-tight text-white">
          What you can&apos;t<br />see in a photo.
        </h2>
        <div className="mt-10 flex flex-col gap-12">
          {PANELS.map(({ label, category, heading, body, accent, specs, Icon }) => (
            <div key={label} className="border-t border-white/8 pt-8">
              <div className="mb-6 h-28 w-28">{mounted && <Icon color={accent} />}</div>
              <p className="font-mono text-[10px] uppercase tracking-[0.4em]" style={{ color: accent + "aa" }}>{label} — {category}</p>
              <h3 className="mt-3 whitespace-pre-line font-serif text-3xl italic leading-[1.1] text-white">{heading}</h3>
              <p className="mt-4 text-sm leading-7 text-white/50">{body}</p>
              <div className="mt-5 grid grid-cols-2 gap-2">
                {specs.map(({ k, v }) => (
                  <div key={k} className="rounded-lg border border-white/8 px-3 py-2">
                    <p className="font-mono text-[9px] uppercase tracking-widest text-white/30">{k}</p>
                    <p className="mt-0.5 font-mono text-xs text-white/70">{v}</p>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      </section>
    );
  }

  return (
    <section ref={sectionRef} className="overflow-hidden" style={{ height: "100svh" }}>
      <div
        ref={trackRef}
        className="flex h-full items-stretch will-change-transform"
        style={{ width: `${PANELS.length * 62 + 26}vw` }}
      >
        {/* Intro panel */}
        <div className="flex h-full w-[26vw] shrink-0 flex-col justify-end px-12 pb-16">
          <div className="mb-6 h-px w-8 bg-amber-200/40" />
          <p className="font-mono text-[10px] uppercase tracking-[0.4em] text-amber-200/60">The Details</p>
          <h2 className="mt-4 font-serif text-5xl italic leading-[1.05] text-white">
            What you can&apos;t<br />see in a photo.
          </h2>
          <p className="mt-5 max-w-xs text-sm leading-7 text-white/40">
            Five components, zero compromises. Scroll to see what makes a Calibre One worth owning.
          </p>
          <div className="mt-10 flex items-center gap-3">
            <span className="font-mono text-[10px] uppercase tracking-widest text-white/20">Scroll</span>
            <div className="h-px w-16 bg-gradient-to-r from-white/20 to-transparent" />
            <span className="text-white/20">→</span>
          </div>
        </div>

        {/* Detail panels */}
        {PANELS.map(({ label, category, heading, body, accent, bg, specs, Icon }) => (
          <div
            key={label}
            className={`relative flex h-full w-[62vw] shrink-0 flex-col bg-gradient-to-br ${bg}`}
          >
            {/* Background glow */}
            <div
              className="pointer-events-none absolute inset-0"
              style={{ background: `radial-gradient(60% 60% at 50% 38%, ${accent}18, transparent 70%)` }}
            />

            {/* Big decorative number */}
            <span
              className="pointer-events-none absolute right-10 top-10 select-none font-serif text-[160px] italic leading-none"
              style={{ color: accent, opacity: 0.04 }}
            >
              {label}
            </span>

            {/* Separator */}
            <div
              className="absolute bottom-0 right-0 top-0 w-px"
              style={{ background: `linear-gradient(to bottom, transparent, ${accent}44, transparent)`, opacity: 0.3 }}
            />

            {/* Main content — two column layout */}
            <div className="relative flex h-full flex-col px-14 py-14">

              {/* Top: icon + specs side by side */}
              <div className="flex flex-1 items-center gap-12">
                {/* Icon */}
                <div
                  className="shrink-0"
                  style={{ width: "clamp(180px,22vw,300px)", height: "clamp(180px,22vw,300px)" }}
                >
                  {mounted && <Icon color={accent} />}
                </div>

                {/* Specs grid */}
                <div className="flex flex-col gap-3">
                  <p className="mb-2 font-mono text-[9px] uppercase tracking-[0.4em]" style={{ color: accent + "88" }}>
                    Specifications
                  </p>
                  {specs.map(({ k, v }) => (
                    <div key={k} className="flex items-baseline gap-4 border-b border-white/[0.06] pb-3">
                      <span className="w-24 shrink-0 font-mono text-[10px] uppercase tracking-widest text-white/30">{k}</span>
                      <span className="font-mono text-sm text-white/75">{v}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Bottom: label + heading + body */}
              <div className="shrink-0 pt-8 border-t border-white/[0.07]">
                <p className="font-mono text-[10px] uppercase tracking-[0.4em]" style={{ color: accent + "aa" }}>
                  {label} — {category}
                </p>
                <div className="mt-4 flex items-end justify-between gap-8">
                  <h3 className="whitespace-pre-line font-serif text-5xl italic leading-[1.05] text-white">
                    {heading}
                  </h3>
                  <p className="max-w-xs text-sm leading-7 text-white/50 pb-1">{body}</p>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
