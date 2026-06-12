import Reveal from "@/components/Reveal";
import { PRODUCT } from "@/lib/product.config";

export const metadata = { title: `Materials — ${PRODUCT.brand}` };

const MATERIALS = [
  {
    id: "steel",
    name: "Brushed Steel",
    finish: "316L Surgical Steel",
    price: "Included",
    accent: "#c0c0c0",
    bg: "from-zinc-800 to-zinc-950",
    properties: [
      { label: "Hardness", value: "200 HV" },
      { label: "Corrosion resistance", value: "Excellent" },
      { label: "Surface", value: "Hand-brushed satin" },
      { label: "Weight", value: "Standard" },
    ],
    long: `316L is the gold standard of watch steel — austenitic, non-magnetic, and immune to the acids in perspiration that destroy lesser alloys over time. We cold-roll each blank to spec, then hand-brush along the grain with progressively finer abrasives until the surface catches light without demanding it.\n\nThe result is a case that looks better at five years than it did on day one. Micro-scratches blend into the brushed texture rather than accumulating as a record of damage.`,
  },
  {
    id: "pvd",
    name: "PVD Black",
    finish: "Physical Vapour Deposition",
    price: "+$80",
    accent: "#2a2a2a",
    bg: "from-neutral-900 to-black",
    properties: [
      { label: "Coating thickness", value: "2–4 microns" },
      { label: "Hardness", value: "2,500 HV" },
      { label: "Process temperature", value: "500°C" },
      { label: "Weight", value: "Identical to steel" },
    ],
    long: `PVD is not paint. It is not anodising. It is a ceramic compound — titanium nitride or zirconium nitride — deposited atom by atom in a vacuum chamber at 500°C. The result bonds to the steel substrate at a molecular level, producing a coating harder than the base material it covers.\n\nWhere painted black watches scratch to silver, PVD black scratches to a darker version of itself. It will outlast the movement inside it.`,
  },
  {
    id: "gold",
    name: "Gold PVD",
    finish: "18k-equivalent Ion Plating",
    price: "+$160",
    accent: "#c9a853",
    bg: "from-yellow-950 to-neutral-950",
    properties: [
      { label: "Gold content", value: "18k-equivalent alloy" },
      { label: "Process", value: "Ion beam deposition" },
      { label: "Thickness", value: "0.5 microns" },
      { label: "Warmth", value: "Deep yellow-gold" },
    ],
    long: `Ion plating deposits gold alloy at the atomic level — not in a bath, not with a brush, but through a directed ion beam in a vacuum. The adhesion is mechanical, not chemical, which means it doesn't peel, blister, or delaminate the way electroplated gold does after 18 months of wear.\n\nThe colour is tuned to 18k yellow gold: warm without being brash, deep without being orange. It is the only way to put gold on steel and mean it.`,
  },
];

export default function MaterialsPage() {
  return (
    <main className="relative pt-32 pb-28">
      {/* Hero */}
      <section className="mx-auto max-w-4xl px-6 sm:px-10">
        <Reveal>
          <p className="mb-3 font-mono text-xs uppercase tracking-[0.4em] text-amber-200/70">
            Case finishes
          </p>
          <h1 className="font-serif text-5xl italic leading-[1.1] sm:text-7xl">
            The metal matters.
          </h1>
        </Reveal>
        <Reveal delay={0.1}>
          <p className="mt-8 max-w-2xl text-lg leading-8 text-white/60">
            Three finishes. Each processed differently, each wearing differently.
            The one you choose will be on your wrist for decades — here's what you're choosing.
          </p>
        </Reveal>
      </section>

      {/* Material deep-dives */}
      {MATERIALS.map((m, i) => (
        <section key={m.id} className="mx-auto mt-24 max-w-6xl px-6 sm:px-10">
          <Reveal>
            <div className={`overflow-hidden rounded-3xl bg-gradient-to-br ${m.bg} border border-white/8`}>
              <div className="grid lg:grid-cols-2">
                {/* Swatch panel */}
                <div className="flex items-center justify-center p-16">
                  <div
                    className="h-40 w-40 rounded-full shadow-2xl ring-1 ring-white/20"
                    style={{ background: `radial-gradient(circle at 35% 35%, ${m.accent}dd, ${m.accent}66)` }}
                  />
                </div>
                {/* Info panel */}
                <div className="p-10 lg:p-14">
                  <p className="font-mono text-[10px] uppercase tracking-widest text-white/40">{m.finish}</p>
                  <h2 className="mt-2 font-serif text-3xl italic">{m.name}</h2>
                  <p className="mt-1 font-mono text-sm text-amber-200/70">{m.price}</p>

                  <div className="mt-8 grid grid-cols-2 gap-4">
                    {m.properties.map((p) => (
                      <div key={p.label} className="border-t border-white/10 pt-3">
                        <p className="font-mono text-[10px] uppercase tracking-widest text-white/35">{p.label}</p>
                        <p className="mt-1 text-sm text-white/80">{p.value}</p>
                      </div>
                    ))}
                  </div>

                  <div className="mt-8 space-y-4">
                    {m.long.split("\n\n").map((para, j) => (
                      <p key={j} className="text-sm leading-7 text-white/55">{para}</p>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </Reveal>
        </section>
      ))}

      {/* CTA */}
      <section className="mx-auto mt-24 max-w-4xl px-6 text-center sm:px-10">
        <Reveal>
          <h2 className="font-serif text-4xl italic">Configure your finish.</h2>
          <a
            href="/#configure"
            className="mt-8 inline-block rounded-full bg-white px-8 py-4 text-sm font-semibold text-black transition hover:bg-white/90"
          >
            Build your Calibre One →
          </a>
        </Reveal>
      </section>
    </main>
  );
}
