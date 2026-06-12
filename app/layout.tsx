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

export const metadata: Metadata = {
  title: `${PRODUCT.brand} ${PRODUCT.name} — Configure yours in 3D`,
  description: PRODUCT.description,
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
        <AuthProvider>
          <FilmGrain />
          <SpotlightCursor />
          <PageTransition />
          <MagneticCursor />
          <AuthModal />
          <SmoothScroll>
            <Header />
            {children}
            <CartDrawer />
          </SmoothScroll>
        </AuthProvider>
      </body>
    </html>
  );
}
