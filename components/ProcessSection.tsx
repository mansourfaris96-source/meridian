import Reveal from "./Reveal";
import ScrollReveal3D from "./ScrollReveal3D";
import SplitHeadline from "./SplitHeadline";
import CountUp from "./CountUp";

const STEPS = [
  {
    n: "01",
    title: "Configure",
    desc: "Choose your dial colour, case finish, and wrist size in real time. Inspect every angle of the 3D model before committing to a single detail.",
    detail: "Takes ~2 minutes",
  },
  {
    n: "02",
    title: "Workshop",
    desc: "Your spec goes directly to our assembly bench. Every component is matched, finished, and fitted by hand — no warehouse inventory, no compromise.",
    detail: "3–5 business days",
  },
  {
    n: "03",
    title: "Delivered",
    desc: "Packed in a solid-aluminium vault box and shipped to your door. A watch that existed nowhere until you designed it.",
    detail: "7 days total",
  },
];

const STATS = [
  { end: 2021, label: "Founded" },
  { end: 1200, suffix: "+", label: "Watches built" },
  { end: 48,   label: "Countries shipped" },
  { end: 7,    label: "Days to your door" },
];

export default function ProcessSection() {
  return (
    <section className="relative overflow-hidden py-24">
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_70%_40%_at_50%_50%,rgba(201,168,83,0.05),transparent)]" />

      <div className="relative mx-auto max-w-6xl px-6 sm:px-10">
        <Reveal>
          <p className="mb-3 font-mono text-xs uppercase tracking-[0.4em] text-amber-200/70">
            How it works
          </p>
          <SplitHeadline by="blur" className="font-serif text-4xl italic sm:text-5xl">
            Made once. For you.
          </SplitHeadline>
        </Reveal>

        <div className="relative mt-16">
          <div className="absolute left-0 right-0 top-8 hidden h-px bg-gradient-to-r from-transparent via-white/10 to-transparent sm:block" />
          <div className="grid gap-10 sm:grid-cols-3">
            {STEPS.map((s, i) => (
              <ScrollReveal3D key={s.n} delay={i * 0.14} rotateFrom={14}>
                <div className="relative">
                  <div className="mb-6 flex items-center gap-4">
                    <div className="flex h-16 w-16 shrink-0 items-center justify-center rounded-full border border-white/10 bg-[#0c0c10]">
                      <span className="font-mono text-sm font-bold text-amber-200/80">{s.n}</span>
                    </div>
                    <span className="font-mono text-[10px] uppercase tracking-widest text-white/30">{s.detail}</span>
                  </div>
                  <h3 className="font-serif text-2xl italic">{s.title}</h3>
                  <p className="mt-3 text-sm leading-7 text-white/50">{s.desc}</p>
                </div>
              </ScrollReveal3D>
            ))}
          </div>
        </div>

        {/* ── STATS ROW ── */}
        <div className="mt-20 grid grid-cols-2 gap-px overflow-hidden rounded-2xl border border-white/8 bg-white/8 sm:grid-cols-4">
          {STATS.map((s) => (
            <div key={s.label} className="bg-[#0c0c10] px-8 py-10 text-center">
              <p className="font-serif text-4xl italic text-amber-200/90">
                <CountUp end={s.end} suffix={s.suffix ?? ""} />
              </p>
              <p className="mt-2 font-mono text-[10px] uppercase tracking-widest text-white/35">
                {s.label}
              </p>
            </div>
          ))}
        </div>

        <Reveal delay={0.2}>
          <div className="mt-16 flex justify-center">
            <a
              href="/#configure"
              className="rounded-full border border-white/20 px-8 py-3.5 text-sm font-medium text-white/70 transition hover:border-white/50 hover:text-white"
            >
              Start configuring →
            </a>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
