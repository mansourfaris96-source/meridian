"use client";

import dynamic from "next/dynamic";

// @splinetool/react-spline touches `window` on load, so it must NEVER render
// on the server. Loading it through next/dynamic with ssr:false guarantees the
// component is client-only and avoids "window is not defined" build errors.
const Spline = dynamic(() => import("@splinetool/react-spline"), {
  ssr: false,
  loading: () => <SceneSkeleton />,
});

function SceneSkeleton() {
  return (
    <div className="absolute inset-0 grid place-items-center">
      <div className="h-10 w-10 animate-spin rounded-full border-2 border-white/15 border-t-white/70" />
    </div>
  );
}

export default function SplineScene({ scene }: { scene: string }) {
  // Absolute-fill so the 3D scene sits behind the hero text.
  return (
    <div className="absolute inset-0">
      <Spline scene={scene} />
    </div>
  );
}
