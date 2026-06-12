// ════════════════════════════════════════════════════════════════════════
//  PRODUCT CONFIG — the single source of truth for the whole store.
//  Reskin this one file (brand, colors, materials, sizes, price) to turn the
//  configurator into a different product for a different client.
//
//  `splineVar` on each colorway/material is the Spline variable name we'll
//  drive later (Phase 4) so picking a swatch recolors the live 3D model.
// ════════════════════════════════════════════════════════════════════════

export type Colorway = {
  id: string;
  name: string;
  hex: string; // swatch + placeholder tint
  splineVar?: string; // maps to a Spline scene variable (set later)
};

export type Material = {
  id: string;
  name: string;
  priceDelta: number; // added to base price
  splineVar?: string;
};

export type SizeOption = {
  label: string;
  inStock: boolean;
};

export const PRODUCT = {
  brand: "MERIDIAN",
  name: "The Calibre One",
  tagline: "Every second, entirely yours.",
  description:
    "Configure your case, dial, and strap in real time — inspect it from every angle before it leaves the workshop. One watch, built once, for you.",
  basePrice: 490,
  currency: "USD",
  currencySymbol: "$",

  colorways: [
    { id: "obsidian", name: "Obsidian Dial", hex: "#111318", splineVar: "color" },
    { id: "ivory", name: "Ivory Dial", hex: "#ede8dc", splineVar: "color" },
    { id: "sunburst", name: "Sunburst Gold", hex: "#c9a853", splineVar: "color" },
    { id: "slate", name: "Slate Blue", hex: "#2b3d5c", splineVar: "color" },
    { id: "hunter", name: "Hunter Green", hex: "#2c4a35", splineVar: "color" },
    { id: "salmon", name: "Salmon", hex: "#d4826a", splineVar: "color" },
  ] satisfies Colorway[],

  materials: [
    { id: "steel", name: "Brushed Steel", priceDelta: 0, splineVar: "material" },
    { id: "pvd", name: "PVD Black", priceDelta: 80, splineVar: "material" },
    { id: "gold", name: "Gold PVD", priceDelta: 160, splineVar: "material" },
  ] satisfies Material[],

  sizes: [
    { label: "36mm", inStock: true },
    { label: "38mm", inStock: true },
    { label: "40mm", inStock: true },
    { label: "42mm", inStock: true },
    { label: "44mm", inStock: false },
  ] satisfies SizeOption[],
};

export function formatPrice(n: number): string {
  return `${PRODUCT.currencySymbol}${n.toFixed(0)}`;
}
