"use client";

import { PRODUCT, formatPrice } from "@/lib/product.config";

type Props = {
  colorId: string;
  setColorId: (id: string) => void;
  materialId: string;
  setMaterialId: (id: string) => void;
  size: string | null;
  setSize: (s: string) => void;
  price: number;
  onAddToCart: () => void;
};

export default function ConfiguratorPanel({
  colorId,
  setColorId,
  materialId,
  setMaterialId,
  size,
  setSize,
  price,
  onAddToCart,
}: Props) {
  return (
    <div className="flex flex-col justify-center">
      <p className="font-mono text-xs uppercase tracking-[0.3em] text-amber-200/70">
        {PRODUCT.brand}
      </p>
      <h2 className="mt-2 font-serif text-4xl italic leading-none sm:text-5xl">
        {PRODUCT.name}
      </h2>
      <p className="mt-4 w-full max-w-full text-sm leading-7 text-white/55 sm:max-w-md">
        {PRODUCT.description}
      </p>

      {/* ── Colorway ── */}
      <Group label="Colorway" id="colorway-label">
        <div className="flex flex-wrap gap-3" role="group" aria-labelledby="colorway-label">
          {PRODUCT.colorways.map((c) => (
            <button
              key={c.id}
              onClick={() => setColorId(c.id)}
              aria-label={c.name}
              aria-pressed={colorId === c.id}
              title={c.name}
              className={`h-9 w-9 rounded-full border transition ${
                colorId === c.id
                  ? "border-white scale-110 ring-2 ring-white/30"
                  : "border-white/20 hover:scale-105"
              }`}
              style={{ background: c.hex }}
            />
          ))}
        </div>
      </Group>

      {/* ── Material ── */}
      <Group label="Material" id="material-label">
        <div className="flex flex-wrap gap-2" role="group" aria-labelledby="material-label">
          {PRODUCT.materials.map((m) => (
            <button
              key={m.id}
              onClick={() => setMaterialId(m.id)}
              aria-pressed={materialId === m.id}
              className={`rounded-full border px-4 py-2 text-sm transition ${
                materialId === m.id
                  ? "border-white bg-white text-black"
                  : "border-white/20 text-white/80 hover:border-white/50"
              }`}
            >
              {m.name}
              {m.priceDelta > 0 && (
                <span className="ml-1 opacity-60">+{formatPrice(m.priceDelta)}</span>
              )}
            </button>
          ))}
        </div>
      </Group>

      {/* ── Size ── */}
      <Group label="Size" id="size-label">
        <div className="flex flex-wrap gap-2" role="group" aria-labelledby="size-label">
          {PRODUCT.sizes.map((s) => (
            <button
              key={s.label}
              aria-pressed={size === s.label}
              aria-disabled={!s.inStock}
              tabIndex={0}
              onClick={() => { if (s.inStock) setSize(s.label); }}
              className={`h-11 w-11 rounded-lg border text-sm transition ${
                size === s.label
                  ? "border-white bg-white text-black"
                  : "border-white/20 text-white/80 hover:border-white/50"
              } ${!s.inStock ? "cursor-not-allowed opacity-25 line-through" : ""}`}
            >
              {s.label}
            </button>
          ))}
        </div>
        <p className="mt-2 font-mono text-[10px] text-white/25">44mm currently unavailable</p>
      </Group>

      {/* ── Price + add ── */}
      <div className="mt-9 flex items-center gap-5">
        <span className="font-serif text-3xl italic" aria-label={`Price: ${formatPrice(price)}`}>
          {formatPrice(price)}
        </span>
        <button
          onClick={onAddToCart}
          disabled={!size}
          aria-disabled={!size}
          aria-label={size ? `Add to cart — ${formatPrice(price)}` : "Select a size to add to cart"}
          className="flex-1 rounded-full bg-amber-200 px-6 py-3.5 text-sm font-semibold text-black transition hover:bg-amber-100 disabled:cursor-not-allowed disabled:opacity-40"
        >
          {size ? "Add to cart" : "Select a size"}
        </button>
      </div>
    </div>
  );
}

function Group({
  label,
  id,
  children,
}: {
  label: string;
  id: string;
  children: React.ReactNode;
}) {
  return (
    <div className="mt-7">
      <p id={id} className="mb-3 text-xs uppercase tracking-wider text-white/40">
        {label}
      </p>
      {children}
    </div>
  );
}
