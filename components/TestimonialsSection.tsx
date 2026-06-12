import Reveal from "./Reveal";
import ScrollReveal3D from "./ScrollReveal3D";
import TiltCard from "./TiltCard";
import SplitHeadline from "./SplitHeadline";

const TESTIMONIALS = [
  {
    quote: "I've owned Patek, AP, and Rolex. The Calibre One is the only watch I've ever designed myself — and it shows. People ask about it constantly.",
    name: "James R.",
    title: "Collector, London",
    accent: "#c0c0c0",
  },
  {
    quote: "The PVD Black with Slate Blue dial arrived looking exactly like the 3D model. That never happens. These people understand precision.",
    name: "Sofia M.",
    title: "Creative Director, Milan",
    accent: "#c9a853",
  },
  {
    quote: "Ordered for my husband's birthday. The configurator alone made it feel like a gift before it arrived. The watch itself is extraordinary.",
    name: "Nour A.",
    title: "Architect, Dubai",
    accent: "#c0c0c0",
  },
];

export default function TestimonialsSection() {
  return (
    <section className="relative overflow-hidden border-t border-white/8 py-24">
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_60%_50%_at_50%_0%,rgba(201,168,83,0.04),transparent)]" />

      <div className="relative mx-auto max-w-6xl px-6 sm:px-10">
        <Reveal>
          <p className="mb-3 font-mono text-xs uppercase tracking-[0.4em] text-amber-200/70">Owners</p>
          <SplitHeadline by="blur" className="font-serif text-4xl italic sm:text-5xl">Worn by those who know.</SplitHeadline>
        </Reveal>

        <div className="mt-14 grid gap-5 sm:grid-cols-3">
          {TESTIMONIALS.map((t, i) => (
            <ScrollReveal3D key={t.name} delay={i * 0.1} rotateFrom={8}>
              <TiltCard intensity={8}>
              <div className="flex h-full flex-col rounded-2xl border border-white/8 bg-white/[0.02] p-8 transition-colors duration-300 hover:bg-white/[0.04]">
                <span className="mb-4 font-serif text-6xl leading-none" style={{ color: t.accent, opacity: 0.25 }}>"</span>
                <p className="flex-1 font-serif text-[17px] italic leading-8 text-white/75">{t.quote}</p>
                <div className="mt-8 flex items-center gap-3 border-t border-white/8 pt-6">
                  <div
                    className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full text-xs font-semibold text-black"
                    style={{ background: t.accent }}
                  >
                    {t.name[0]}
                  </div>
                  <div>
                    <p className="text-sm font-medium text-white">{t.name}</p>
                    <p className="font-mono text-[10px] text-white/35">{t.title}</p>
                  </div>
                </div>
              </div>
              </TiltCard>
            </ScrollReveal3D>
          ))}
        </div>
      </div>
    </section>
  );
}
