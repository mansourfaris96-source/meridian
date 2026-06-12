"use client";

import { useEffect, useRef, useState } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

// Decorative SVG icons for each panel — large, centred, semi-transparent
function DialIcon({ color }: { color: string }) {
  return (
    <svg viewBox="0 0 200 200" className="h-full w-full" fill="none" suppressHydrationWarning>
      <circle cx="100" cy="100" r="88" stroke={color} strokeWidth="1.5" strokeOpacity="0.25" />
      <circle cx="100" cy="100" r="70" stroke={color} strokeWidth="0.8" strokeOpacity="0.15" />
      <circle cx="100" cy="100" r="4" fill={color} fillOpacity="0.4" />
      {/* Hour markers */}
      {Array.from({ length: 12 }).map((_, i) => {
        const a = (i / 12) * Math.PI * 2 - Math.PI / 2;
        const x1 = 100 + Math.cos(a) * 76;
        const y1 = 100 + Math.sin(a) * 76;
        const x2 = 100 + Math.cos(a) * 86;
        const y2 = 100 + Math.sin(a) * 86;
        return <line key={i} x1={x1} y1={y1} x2={x2} y2={y2} stroke={color} strokeWidth={i % 3 === 0 ? "2" : "1"} strokeOpacity="0.4" />;
      })}
      {/* Hands */}
      <line x1="100" y1="100" x2="100" y2="40" stroke={color} strokeWidth="1.5" strokeOpacity="0.5" strokeLinecap="round" />
      <line x1="100" y1="100" x2="130" y2="100" stroke={color} strokeWidth="1" strokeOpacity="0.4" strokeLinecap="round" />
    </svg>
  );
}

function CaseIcon({ color }: { color: string }) {
  return (
    <svg viewBox="0 0 200 200" className="h-full w-full" fill="none" suppressHydrationWarning>
      <rect x="52" y="36" width="96" height="128" rx="22" stroke={color} strokeWidth="1.5" strokeOpacity="0.25" />
      <rect x="62" y="46" width="76" height="108" rx="16" stroke={color} strokeWidth="0.8" strokeOpacity="0.15" />
      {/* Crown */}
      <rect x="148" y="84" width="12" height="32" rx="6" stroke={color} strokeWidth="1.2" strokeOpacity="0.3" />
      {/* Lugs */}
      <rect x="56" y="24" width="22" height="16" rx="5" stroke={color} strokeWidth="1" strokeOpacity="0.2" />
      <rect x="122" y="24" width="22" height="16" rx="5" stroke={color} strokeWidth="1" strokeOpacity="0.2" />
      <rect x="56" y="160" width="22" height="16" rx="5" stroke={color} strokeWidth="1" strokeOpacity="0.2" />
      <rect x="122" y="160" width="22" height="16" rx="5" stroke={color} strokeWidth="1" strokeOpacity="0.2" />
    </svg>
  );
}

function MovementIcon({ color }: { color: string }) {
  return (
    <svg viewBox="0 0 200 200" className="h-full w-full" fill="none" suppressHydrationWarning>
      <circle cx="100" cy="100" r="72" stroke={color} strokeWidth="1.5" strokeOpacity="0.2" />
      {/* Gear teeth */}
      {Array.from({ length: 24 }).map((_, i) => {
        const a1 = (i / 24) * Math.PI * 2;
        const a2 = ((i + 0.45) / 24) * Math.PI * 2;
        const r1 = 72, r2 = 82;
        return (
          <path
            key={i}
            d={`M ${100 + Math.cos(a1) * r1} ${100 + Math.sin(a1) * r1}
                L ${100 + Math.cos(a1) * r2} ${100 + Math.sin(a1) * r2}
                L ${100 + Math.cos(a2) * r2} ${100 + Math.sin(a2) * r2}
                L ${100 + Math.cos(a2) * r1} ${100 + Math.sin(a2) * r1} Z`}
            fill={color}
            fillOpacity="0.12"
          />
        );
      })}
      {/* Rotor */}
      <path d="M100 100 L100 36 A64 64 0 0 1 156 82 Z" fill={color} fillOpacity="0.08" stroke={color} strokeWidth="1" strokeOpacity="0.25" />
      <circle cx="100" cy="100" r="12" stroke={color} strokeWidth="1.5" strokeOpacity="0.4" />
      <circle cx="100" cy="100" r="3" fill={color} fillOpacity="0.6" />
    </svg>
  );
}

function CrystalIcon({ color }: { color: string }) {
  return (
    <svg viewBox="0 0 200 200" className="h-full w-full" fill="none" suppressHydrationWarning>
      {/* Hexagonal gem facets */}
      <polygon points="100,20 172,60 172,140 100,180 28,140 28,60" stroke={color} strokeWidth="1.5" strokeOpacity="0.25" />
      <polygon points="100,48 148,74 148,126 100,152 52,126 52,74" stroke={color} strokeWidth="0.8" strokeOpacity="0.15" />
      <line x1="100" y1="20" x2="100" y2="48" stroke={color} strokeWidth="0.8" strokeOpacity="0.2" />
      <line x1="172" y1="60" x2="148" y2="74" stroke={color} strokeWidth="0.8" strokeOpacity="0.2" />
      <line x1="172" y1="140" x2="148" y2="126" stroke={color} strokeWidth="0.8" strokeOpacity="0.2" />
      <line x1="100" y1="180" x2="100" y2="152" stroke={color} strokeWidth="0.8" strokeOpacity="0.2" />
      <line x1="28" y1="140" x2="52" y2="126" stroke={color} strokeWidth="0.8" strokeOpacity="0.2" />
      <line x1="28" y1="60" x2="52" y2="74" stroke={color} strokeWidth="0.8" strokeOpacity="0.2" />
      {/* Centre sparkle */}
      <circle cx="100" cy="100" r="5" fill={color} fillOpacity="0.35" />
      <line x1="100" y1="48" x2="100" y2="152" stroke={color} strokeWidth="0.5" strokeOpacity="0.1" />
      <line x1="52" y1="74" x2="148" y2="126" stroke={color} strokeWidth="0.5" strokeOpacity="0.1" />
      <line x1="148" y1="74" x2="52" y2="126" stroke={color} strokeWidth="0.5" strokeOpacity="0.1" />
    </svg>
  );
}

function CasebackIcon({ color }: { color: string }) {
  return (
    <svg viewBox="0 0 200 200" className="h-full w-full" fill="none" suppressHydrationWarning>
      <circle cx="100" cy="100" r="84" stroke={color} strokeWidth="1.5" strokeOpacity="0.25" />
      <circle cx="100" cy="100" r="68" stroke={color} strokeWidth="0.8" strokeOpacity="0.18" />
      {/* Screws */}
      {[45, 135, 225, 315].map((deg) => {
        const a = (deg * Math.PI) / 180;
        const x = 100 + Math.cos(a) * 74;
        const y = 100 + Math.sin(a) * 74;
        return (
          <g key={deg}>
            <circle cx={x} cy={y} r="5" stroke={color} strokeWidth="1" strokeOpacity="0.3" />
            <line x1={x - 3} y1={y} x2={x + 3} y2={y} stroke={color} strokeWidth="0.8" strokeOpacity="0.3" />
          </g>
        );
      })}
      {/* Exhibition window */}
      <circle cx="100" cy="100" r="46" stroke={color} strokeWidth="1" strokeOpacity="0.3" />
      {/* Rotor arc */}
      <path d="M100 62 A38 38 0 1 1 62 100" stroke={color} strokeWidth="2" strokeOpacity="0.35" strokeLinecap="round" />
      <circle cx="100" cy="100" r="7" stroke={color} strokeWidth="1.5" strokeOpacity="0.45" />
    </svg>
  );
}

const PANELS = [
  {
    label: "01 — Dial",
    heading: "Six faces,\none soul.",
    body: "Each dial colour is mixed to a precise formula and fired at 220°C — not printed, not applied. The pigment is the surface.",
    accent: "#c9a853",
    bg: "from-[#1a1409] to-[#0c0c10]",
    Icon: DialIcon,
  },
  {
    label: "02 — Case",
    heading: "Machined to\n±0.01 mm.",
    body: "316L surgical steel, CNC-turned from billet. Every case passes a 48-hour water-resistance test at 5 ATM before finishing.",
    accent: "#b8c8d8",
    bg: "from-[#0d1018] to-[#0c0c10]",
    Icon: CaseIcon,
  },
  {
    label: "03 — Movement",
    heading: "28,800\nvibrations / hr.",
    body: "Swiss ETA 2824-2 automatic, 38-hour power reserve. Visible through the exhibition caseback we fit to every single piece.",
    accent: "#d4c4b0",
    bg: "from-[#14120f] to-[#0c0c10]",
    Icon: MovementIcon,
  },
  {
    label: "04 — Crystal",
    heading: "Sapphire.\nNot glass.",
    body: "Anti-reflective coated on both sides. Mohs 9 hardness — second only to diamond. Scratching it requires deliberate effort.",
    accent: "#88ccee",
    bg: "from-[#0c1018] to-[#0c0c10]",
    Icon: CrystalIcon,
  },
  {
    label: "05 — Caseback",
    heading: "A window\ninto craft.",
    body: "Exhibition caseback, edge-polished. Watch the rotor — finished in matching case colour — spin under your own wrist's motion.",
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

  const isMobile = typeof window !== "undefined" && window.innerWidth < 640;

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);
    // Only pin on sm+ — mobile uses vertical stack
    if (window.innerWidth < 640) return;

    const section = sectionRef.current;
    const track   = trackRef.current;
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

  // Mobile: vertical stack layout
  if (mounted && window.innerWidth < 640) {
    return (
      <section className="px-6 py-20">
        <p className="font-mono text-[10px] uppercase tracking-[0.4em] text-amber-200/60">The Details</p>
        <h2 className="mt-3 font-serif text-4xl italic leading-tight text-white">
          What you can&apos;t<br />see in a photo.
        </h2>
        <div className="mt-10 flex flex-col gap-12">
          {PANELS.map(({ label, heading, body, accent, Icon }) => (
            <div key={label} className="border-t border-white/8 pt-8">
              <div className="mb-6 flex h-24 w-24 items-center justify-center">
                {mounted && <Icon color={accent} />}
              </div>
              <p className="font-mono text-[10px] uppercase tracking-[0.4em]" style={{ color: accent + "aa" }}>{label}</p>
              <h3 className="mt-3 whitespace-pre-line font-serif text-3xl italic leading-[1.1] text-white">{heading}</h3>
              <p className="mt-4 text-sm leading-7 text-white/50">{body}</p>
            </div>
          ))}
        </div>
      </section>
    );
  }

  return (
    <section
      ref={sectionRef}
      className="overflow-hidden"
      style={{ height: "100svh" }}
    >
      <div
        ref={trackRef}
        className="flex h-full items-stretch will-change-transform"
        style={{ width: `${PANELS.length * 70 + 28}vw` }}
      >
        {/* Left intro panel */}
        <div className="flex h-full w-[28vw] shrink-0 flex-col justify-end px-10 pb-16">
          <p className="font-mono text-[10px] uppercase tracking-[0.4em] text-amber-200/60">
            The Details
          </p>
          <h2 className="mt-3 font-serif text-4xl italic leading-tight text-white sm:text-5xl">
            What you can&apos;t<br />see in a photo.
          </h2>
          <p className="mt-4 max-w-xs text-sm leading-7 text-white/45">
            Scroll to explore the components that make each Calibre One worth configuring.
          </p>
          <div className="mt-10 flex items-center gap-3">
            <span className="font-mono text-[10px] uppercase tracking-widest text-white/25">Scroll</span>
            <div className="h-px w-16 bg-gradient-to-r from-white/20 to-transparent" />
            <span className="text-white/20">→</span>
          </div>
        </div>

        {/* Detail panels */}
        {PANELS.map(({ label, heading, body, accent, bg, Icon }) => (
          <div
            key={label}
            className={`relative flex h-full w-[70vw] shrink-0 flex-col bg-gradient-to-br sm:w-[58vw] ${bg}`}
          >
            {/* Glow */}
            <div
              className="pointer-events-none absolute inset-0"
              style={{
                background: `radial-gradient(55% 55% at 50% 42%, ${accent}14, transparent 70%)`,
              }}
            />

            {/* SVG illustration — fills upper half (client-only to avoid float hydration mismatch) */}
            <div className="relative flex flex-1 items-center justify-center p-16">
              <div className="h-[clamp(160px,28vh,280px)] w-[clamp(160px,28vh,280px)] opacity-80">
                {mounted && <Icon color={accent} />}
              </div>
            </div>

            {/* Big decorative number — top right */}
            <span
              className="pointer-events-none absolute right-8 top-8 select-none font-serif text-[120px] italic leading-none opacity-[0.05]"
              style={{ color: accent }}
            >
              {label.split(" — ")[0]}
            </span>

            {/* Separator line */}
            <div
              className="absolute bottom-0 right-0 top-0 w-px opacity-20"
              style={{ background: `linear-gradient(to bottom, transparent, ${accent}66, transparent)` }}
            />

            {/* Text — bottom */}
            <div className="relative z-10 px-12 pb-14">
              <p className="font-mono text-[10px] uppercase tracking-[0.4em]" style={{ color: accent + "aa" }}>
                {label}
              </p>
              <h3 className="mt-3 whitespace-pre-line font-serif text-4xl italic leading-[1.1] text-white sm:text-5xl">
                {heading}
              </h3>
              <p className="mt-5 max-w-sm text-sm leading-7 text-white/50">{body}</p>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
