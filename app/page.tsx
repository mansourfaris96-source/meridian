import Hero from "@/components/Hero";
import Configurator from "@/components/Configurator";
import Reveal from "@/components/Reveal";
import ScrollReveal3D from "@/components/ScrollReveal3D";
import Marquee from "@/components/Marquee";
import MaterialsSection from "@/components/MaterialsSection";
import ProcessSection from "@/components/ProcessSection";
import TestimonialsSection from "@/components/TestimonialsSection";
import NewsletterSection from "@/components/NewsletterSection";
import DetailsSection from "@/components/DetailsSection";
import TiltCard from "@/components/TiltCard";
import SplitHeadline from "@/components/SplitHeadline";
import { PRODUCT } from "@/lib/product.config";

const FEATURES = [
  {
    t: "Built to your spec",
    d: "Every Calibre One is assembled to the exact dial, case finish, and size you choose — nothing sits in a display case.",
  },
  {
    t: "Inspect it before it ships",
    d: "Rotate, light, and examine the 3D model from every angle. What you configure in here is exactly what arrives on your wrist.",
  },
  {
    t: "Workshop-made in days",
    d: "On-demand assembly means your configuration goes straight to the bench the moment you place your order.",
  },
];

export default function Home() {
  return (
    <main className="relative">
      <Hero />

      {/* ── MARQUEE 1 ── */}
      <Marquee />

      {/* ── CONFIGURATOR ── */}
      <ScrollReveal3D rotateFrom={8}>
        <Configurator />
      </ScrollReveal3D>

      {/* ── 3-UP FEATURE CARDS ── */}
      <section className="mx-auto grid max-w-5xl gap-8 px-6 py-10 sm:grid-cols-3 sm:px-10">
        {FEATURES.map((c, i) => (
          <ScrollReveal3D key={c.t} delay={i * 0.12} rotateFrom={10}>
            <TiltCard intensity={14} className="rounded-xl border border-white/8 bg-[#0c0c10] p-7 transition-colors hover:border-white/15">
              <h3 className="font-serif text-2xl italic">{c.t}</h3>
              <p className="mt-3 text-sm leading-7 text-white/55">{c.d}</p>
            </TiltCard>
          </ScrollReveal3D>
        ))}
      </section>

      {/* ── MATERIALS ── */}
      <MaterialsSection />

      {/* ── PROCESS ── */}
      <ProcessSection />

      {/* ── DETAILS (horizontal scroll) ── */}
      <DetailsSection />

      {/* ── TESTIMONIALS ── */}
      <TestimonialsSection />

      {/* ── MARQUEE 2 (reversed) ── */}
      <Marquee reverse />

      {/* ── NEWSLETTER ── */}
      <NewsletterSection />

      {/* ── FOOTER ── */}
      <footer className="border-t border-white/10 px-6 py-10 sm:px-10">
        <div className="mx-auto flex max-w-6xl flex-col items-center justify-between gap-6 sm:flex-row">
          <span className="font-mono text-xs tracking-widest text-white/40">
            {PRODUCT.brand} — {PRODUCT.name}
          </span>
          <div className="flex gap-8">
            <a href="/about"     className="font-mono text-xs uppercase tracking-widest text-white/30 transition hover:text-white/60">About</a>
            <a href="/materials" className="font-mono text-xs uppercase tracking-widest text-white/30 transition hover:text-white/60">Materials</a>
            <a href="/#configure" className="font-mono text-xs uppercase tracking-widest text-white/30 transition hover:text-white/60">Configure</a>
          </div>
          <span className="font-mono text-xs text-white/20">© 2026 {PRODUCT.brand}</span>
        </div>
      </footer>
    </main>
  );
}
