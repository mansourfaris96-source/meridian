import Reveal from "./Reveal";
import ScrollReveal3D from "./ScrollReveal3D";
import TiltCard from "./TiltCard";
import SplitHeadline from "./SplitHeadline";

const MATERIALS = [
  {
    id: "steel",
    name: "Brushed Steel",
    finish: "316L Surgical Steel",
    price: "Included",
    desc: "Cold-rolled to a satin finish, then hand-brushed along the grain. Reflects light without demanding it — the choice of restraint.",
    accent: "#b8b8b8",
    glow: "rgba(184,184,184,0.12)",
  },
  {
    id: "pvd",
    name: "PVD Black",
    finish: "Physical Vapour Deposition",
    price: "+$80",
    desc: "A micron-thin ceramic coating fused at 500°C. Scratch-resistant, chemically inert, and darker than a moonless sky.",
    accent: "#3a3a3a",
    glow: "rgba(80,80,80,0.15)",
  },
  {
    id: "gold",
    name: "Gold PVD",
    finish: "18k-equivalent Ion Plating",
    price: "+$160",
    desc: "Ion-plated at the atomic level for depth that paint can never replicate. The warmth of gold without the compromise of softness.",
    accent: "#c9a853",
    glow: "rgba(201,168,83,0.18)",
  },
];

export default function MaterialsSection() {
  return (
    <section className="mx-auto max-w-6xl px-6 py-24 sm:px-10">
      <Reveal>
        <p className="mb-3 font-mono text-xs uppercase tracking-[0.4em] text-amber-200/70">
          Case Finishes
        </p>
        <SplitHeadline by="blur" className="font-serif text-4xl italic sm:text-5xl">
          Three ways to wear time.
        </SplitHeadline>
      </Reveal>

      <div className="mt-14 grid gap-5 sm:grid-cols-3">
        {MATERIALS.map((m, i) => (
          <ScrollReveal3D key={m.id} delay={i * 0.1} rotateFrom={10}>
            <TiltCard intensity={10}>
              <div
                className="group relative overflow-hidden rounded-2xl border border-white/8 bg-[#0c0c10]/60 backdrop-blur-sm p-8 transition-all duration-500 hover:border-white/20"
              >
                <div
                  className="pointer-events-none absolute inset-0 opacity-0 transition-opacity duration-500 group-hover:opacity-100 rounded-2xl"
                  style={{ background: `radial-gradient(60% 50% at 50% 100%, ${m.glow}, transparent)` }}
                />
                <div className="relative mb-8 flex items-end justify-between">
                  <div
                    className="h-16 w-16 rounded-full ring-1 ring-white/15 shadow-xl transition-transform duration-500 group-hover:scale-110"
                    style={{ background: `radial-gradient(circle at 35% 35%, ${m.accent}ee, ${m.accent}88)` }}
                  />
                  <span className="font-mono text-xs text-amber-200/60">{m.price}</span>
                </div>
                <p className="font-mono text-[10px] uppercase tracking-widest text-white/35">{m.finish}</p>
                <h3 className="mt-1.5 font-serif text-2xl italic text-white">{m.name}</h3>
                <p className="mt-4 text-sm leading-7 text-white/50">{m.desc}</p>
                <a
                  href="/materials"
                  className="mt-6 inline-flex items-center gap-2 font-mono text-[11px] uppercase tracking-widest text-white/40 transition-colors duration-300 hover:text-amber-200/80"
                >
                  Deep dive
                  <span className="transition-transform duration-300 group-hover:translate-x-1">→</span>
                </a>
              </div>
            </TiltCard>
          </ScrollReveal3D>
        ))}
      </div>
    </section>
  );
}
