"use client";

import { useEffect } from "react";
import dynamic from "next/dynamic";
import { colorBus } from "./WatchScene";

const WatchScene = dynamic(() => import("./WatchScene").then(m => ({ default: m.default })), {
  ssr: false,
  loading: () => (
    <div className="absolute inset-0 grid place-items-center">
      <div className="h-10 w-10 animate-spin rounded-full border-2 border-white/10 border-t-white/60" />
    </div>
  ),
});

const CASE_COLORS: Record<string, string> = {
  steel: "#c0c0c0",
  pvd:   "#1a1a1a",
  gold:  "#c9a853",
};

interface Props { colorHex: string; materialId: string; }

export default function ProductStage({ colorHex, materialId }: Props) {
  const caseColor = CASE_COLORS[materialId] ?? "#c0c0c0";

  // Update colorBus every time selection changes — no Canvas re-render needed
  useEffect(() => {
    colorBus.dial     = colorHex;
    colorBus.case     = caseColor;
    colorBus.material = materialId;
    colorBus.dirty    = true;
  }, [colorHex, caseColor, materialId]);

  return (
    <div className="relative aspect-square w-full overflow-hidden rounded-3xl border border-white/10 bg-[#0c0c10]/50">
      <WatchScene />
    </div>
  );
}
