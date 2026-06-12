import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // Allow Spline-hosted assets (textures/exports) through next/image if used.
  images: {
    remotePatterns: [{ protocol: "https", hostname: "prod.spline.design" }],
  },
};

export default nextConfig;
