"use client";

import { useState } from "react";
import { PRODUCT } from "@/lib/product.config";
import ProductStage from "./ProductStage";
import ConfiguratorPanel from "./ConfiguratorPanel";
import { useCart } from "@/store/cart";

// Owns the live configuration (color / material / size) and feeds it to both
// the 3D stage and the panel. This is the heart of the store.
export default function Configurator() {
  const [colorId, setColorId] = useState(PRODUCT.colorways[0].id);
  const [materialId, setMaterialId] = useState(PRODUCT.materials[0].id);
  const [size, setSize] = useState<string | null>(null);
  const add = useCart((s) => s.add);

  const color = PRODUCT.colorways.find((c) => c.id === colorId)!;
  const material = PRODUCT.materials.find((m) => m.id === materialId)!;
  const price = PRODUCT.basePrice + material.priceDelta;

  function addToCart() {
    if (!size) return;
    add({
      id: `${colorId}-${materialId}-${size}-${Date.now()}`,
      name: `${PRODUCT.brand} ${PRODUCT.name}`,
      colorway: color.name,
      material: material.name,
      size,
      price,
      swatch: color.hex,
    });
  }

  return (
    <section
      id="configure"
      className="mx-auto grid w-full max-w-6xl gap-10 px-6 py-24 sm:px-10 lg:grid-cols-2 lg:gap-16"
    >
      <ProductStage colorHex={color.hex} materialId={materialId} />
      <ConfiguratorPanel
        colorId={colorId}
        setColorId={setColorId}
        materialId={materialId}
        setMaterialId={setMaterialId}
        size={size}
        setSize={setSize}
        price={price}
        onAddToCart={addToCart}
      />
    </section>
  );
}
