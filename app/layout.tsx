import type { Metadata } from "next";
import { Geist, Geist_Mono, Instrument_Serif } from "next/font/google";
import "./globals.css";
import SmoothScroll from "@/components/SmoothScroll";
import Header from "@/components/Header";
import CartDrawer from "@/components/CartDrawer";
import MagneticCursor from "@/components/MagneticCursor";
import PageTransition from "@/components/PageTransition";
import FilmGrain from "@/components/FilmGrain";
import SpotlightCursor from "@/components/SpotlightCursor";
import AuthProvider from "@/components/AuthProvider";
import AuthModal from "@/components/AuthModal";
import { PRODUCT } from "@/lib/product.config";

const geistSans = Geist({ variable: "--font-geist-sans", subsets: ["latin"] });
const geistMono = Geist_Mono({ variable: "--font-geist-mono", subsets: ["latin"] });
const instrumentSerif = Instrument_Serif({
  variable: "--font-instrument-serif",
  subsets: ["latin"],
  weight: "400",
  style: ["normal", "italic"],
});

const BASE_URL = "https://meridian3.netlify.app";

export const metadata: Metadata = {
  metadataBase: new URL(BASE_URL),
  title: {
    default: `${PRODUCT.brand} ${PRODUCT.name} — Configure yours in 3D`,
    template: `%s — ${PRODUCT.brand}`,
  },
  description: PRODUCT.description,
  alternates: { canonical: "/" },
  openGraph: {
    type: "website",
    siteName: PRODUCT.brand,
    title: `${PRODUCT.brand} ${PRODUCT.name} — Configure yours in 3D`,
    description: PRODUCT.description,
    url: BASE_URL,
    images: [{ url: "/og-image.jpg", width: 1200, height: 630, alt: "MERIDIAN — The Calibre One" }],
  },
  twitter: {
    card: "summary_large_image",
    title: `${PRODUCT.brand} ${PRODUCT.name} — Configure yours in 3D`,
    description: PRODUCT.description,
    images: ["/og-image.jpg"],
  },
  robots: { index: true, follow: true },
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html
      lang="en"
      className={`${geistSans.variable} ${geistMono.variable} ${instrumentSerif.variable} h-full antialiased`}
    >
      <body className="min-h-full bg-[#08080a] text-white">
        {/* Fixed cinematic video — z-[1] so it sits above body background */}
        <video
          className="fixed inset-0 z-[1] h-full w-full object-cover opacity-50 pointer-events-none"
          src="/hero-bg.mp4"
          autoPlay
          loop
          muted
          playsInline
          preload="auto"
        />
        <AuthProvider>
          <FilmGrain />
          <SpotlightCursor />
          <PageTransition />
          <MagneticCursor />
          <AuthModal />
          {/* All content at z-[2] — sits above video */}
          <div className="relative z-[2]">
          <SmoothScroll>
            <Header />
            {children}
            <CartDrawer />
          </SmoothScroll>
          </div>
        </AuthProvider>
      </body>
    </html>
  );
}
