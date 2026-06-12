import Reveal from "@/components/Reveal";
import CountUp from "@/components/CountUp";
import { PRODUCT } from "@/lib/product.config";

export const metadata = { title: `About — ${PRODUCT.brand}` };

const STATS = [
  { end: 2021,  suffix: "",  label: "Founded" },
  { end: 1200,  suffix: "+", label: "Watches built" },
  { end: 48,    suffix: "",  label: "Countries shipped to" },
  { end: 7,     suffix: "",  label: "Days to your door" },
];

export default function AboutPage() {
  return (
    <main className="relative pb-28 pt-32">
      {/* Hero */}
      <section className="mx-auto max-w-4xl px-6 sm:px-10">
        <Reveal>
          <p className="mb-3 font-mono text-xs uppercase tracking-[0.4em] text-amber-200/70">
            Our story
          </p>
          <h1 className="font-serif text-5xl italic leading-[1.1] sm:text-7xl">
            We make one watch.<br />Yours.
          </h1>
        </Reveal>
        <Reveal delay={0.1}>
          <p className="mt-8 max-w-2xl text-lg leading-8 text-white/60">
            MERIDIAN was founded on a single conviction: that a watch should be configured by
            the person who will wear it, not chosen from a display case someone else filled.
          </p>
        </Reveal>
      </section>

      {/* Divider */}
      <div className="mx-auto mt-20 max-w-6xl border-t border-white/10 px-6 sm:px-10" />

      {/* Philosophy */}
      <section className="mx-auto mt-20 grid max-w-6xl gap-16 px-6 sm:px-10 lg:grid-cols-2">
        <Reveal>
          <h2 className="font-serif text-3xl italic">On-demand, not off-the-shelf.</h2>
          <p className="mt-5 text-sm leading-8 text-white/55">
            Every watch in traditional retail existed before its buyer. It sat in a safe, under
            glass, waiting. We inverted that. The Calibre One doesn't exist until you configure
            it. The moment you place your order, it enters production, and only then.
          </p>
          <p className="mt-4 text-sm leading-8 text-white/55">
            This isn't a novelty. It's the only honest way to make something personal.
          </p>
        </Reveal>
        <Reveal delay={0.1}>
          <h2 className="font-serif text-3xl italic">Precision without performance.</h2>
          <p className="mt-5 text-sm leading-8 text-white/55">
            We don't sponsor motorsports or dress our watches in racing heritage they didn't earn.
            The Calibre One is a tool for measuring your day, made from materials chosen for
            longevity, finished to a standard that doesn't age.
          </p>
          <p className="mt-4 text-sm leading-8 text-white/55">
            Three case finishes. Six dial colours. One movement. Configured by you.
          </p>
        </Reveal>
      </section>

      {/* Stats */}
      <section className="mx-auto mt-24 max-w-6xl px-6 sm:px-10">
        <div className="grid grid-cols-2 gap-px overflow-hidden rounded-2xl border border-white/8 bg-white/8 sm:grid-cols-4">
          {STATS.map((s) => (
            <div key={s.label} className="bg-[#0c0c10] px-8 py-10 text-center">
              <p className="font-serif text-4xl italic text-amber-200/90">
                <CountUp end={s.end} suffix={s.suffix} />
              </p>
              <p className="mt-2 font-mono text-[10px] uppercase tracking-widest text-white/35">
                {s.label}
              </p>
            </div>
          ))}
        </div>
      </section>

      {/* CTA */}
      <section className="mx-auto mt-24 max-w-4xl px-6 text-center sm:px-10">
        <Reveal>
          <h2 className="font-serif text-4xl italic">Ready to configure yours?</h2>
          <a
            href="/#configure"
            className="mt-8 inline-block rounded-full bg-white px-8 py-4 text-sm font-semibold text-black transition hover:bg-white/90"
          >
            Start configuring →
          </a>
        </Reveal>
      </section>
    </main>
  );
}
