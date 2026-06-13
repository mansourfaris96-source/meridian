"use client";

import { useEffect, useRef } from "react";

function SceneSkeleton() {
  return (
    <div className="absolute inset-0 grid place-items-center">
      <div className="h-10 w-10 animate-spin rounded-full border-2 border-white/15 border-t-white/70" />
    </div>
  );
}

declare global {
  namespace JSX {
    interface IntrinsicElements {
      "spline-viewer": React.DetailedHTMLProps<React.HTMLAttributes<HTMLElement> & {
        url?: string;
        background?: string;
        "loading-anim-type"?: string;
      }, HTMLElement>;
    }
  }
}

export default function SplineScene({ scene }: { scene: string }) {
  const ref = useRef<HTMLDivElement>(null);
  const loaded = useRef(false);

  useEffect(() => {
    if (loaded.current) return;
    loaded.current = true;

    // Dynamically inject the spline-viewer web component script
    if (!document.querySelector('script[data-spline-viewer]')) {
      const script = document.createElement("script");
      script.type = "module";
      script.src = "https://unpkg.com/@splinetool/viewer@1.9.82/build/spline-viewer.js";
      script.setAttribute("data-spline-viewer", "true");
      document.head.appendChild(script);
    }
  }, []);

  return (
    <div ref={ref} className="absolute inset-0">
      <spline-viewer
        url={scene}
        background="transparent"
        loading-anim-type="none"
        style={{ width: "100%", height: "100%" }}
      />
    </div>
  );
}
