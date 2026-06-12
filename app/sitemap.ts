import type { MetadataRoute } from "next";

export default function sitemap(): MetadataRoute.Sitemap {
  const base = "https://meridian3.netlify.app";
  return [
    { url: base,              lastModified: new Date(), changeFrequency: "weekly",  priority: 1.0 },
    { url: `${base}/materials`, lastModified: new Date(), changeFrequency: "monthly", priority: 0.8 },
    { url: `${base}/about`,     lastModified: new Date(), changeFrequency: "monthly", priority: 0.7 },
  ];
}
