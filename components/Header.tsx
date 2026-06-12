"use client";

import { useState, useEffect } from "react";
import { usePathname } from "next/navigation";
import { PRODUCT } from "@/lib/product.config";
import { useCart } from "@/store/cart";
import { useAuth } from "@/store/auth";
import { supabase } from "@/lib/supabase";

const NAV = [
  { label: "Configure", href: "/#configure" },
  { label: "Materials", href: "/materials" },
  { label: "About",     href: "/about" },
  { label: "Orders",    href: "/orders" },
];

export default function Header() {
  const count      = useCart((s) => s.items.length);
  const setOpen    = useCart((s) => s.setOpen);
  const pathname   = usePathname();
  const [menuOpen, setMenuOpen] = useState(false);
  const { user, loading, openModal } = useAuth();

  async function handleSignOut() {
    await supabase.auth.signOut();
  }

  /** User initials from email, e.g. "fm" → "FM" */
  const initials = user?.email
    ? user.email.slice(0, 2).toUpperCase()
    : null;

  // Close menu on route change
  useEffect(() => { setMenuOpen(false); }, [pathname]);

  // Lock body scroll when menu open
  useEffect(() => {
    document.body.style.overflow = menuOpen ? "hidden" : "";
    return () => { document.body.style.overflow = ""; };
  }, [menuOpen]);

  return (
    <>
      <header className="fixed inset-x-0 top-0 z-40 flex items-center justify-between px-6 py-5 sm:px-10">
        <a href="/" className="font-mono text-sm font-semibold tracking-[0.3em] text-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-amber-200/60">
          {PRODUCT.brand}
        </a>

        {/* Desktop nav */}
        <nav aria-label="Main navigation" className="hidden items-center gap-8 sm:flex">
          {NAV.map((n) => (
            <a
              key={n.label}
              href={n.href}
              className="text-xs tracking-widest text-white/60 transition hover:text-white uppercase focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-amber-200/60 rounded-sm"
            >
              {n.label}
            </a>
          ))}
        </nav>

        <div className="flex items-center gap-3">
          {/* Auth: sign in button or user avatar */}
          {!loading && (
            user ? (
              <div className="relative hidden sm:flex items-center gap-2">
                {/* Avatar */}
                <button
                  onClick={handleSignOut}
                  title={`Signed in as ${user.email} — click to sign out`}
                  className="flex h-8 w-8 items-center justify-center rounded-full border border-amber-200/30 bg-amber-200/10 text-[10px] font-semibold text-amber-200 transition hover:border-amber-200/60 hover:bg-amber-200/20 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-amber-200/60"
                >
                  {initials}
                </button>
              </div>
            ) : (
              <button
                onClick={() => openModal("signin")}
                className="hidden sm:block text-xs tracking-widest text-white/50 transition hover:text-white uppercase focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-amber-200/60 rounded-sm"
              >
                Sign in
              </button>
            )
          )}

          {/* Cart */}
          <button
            onClick={() => setOpen(true)}
            className="rounded-full border border-white/20 bg-black/30 px-4 py-2 text-xs font-medium text-white backdrop-blur transition hover:border-white/50 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-amber-200/60"
          >
            Cart{count > 0 ? ` · ${count}` : ""}
          </button>

          {/* Mobile hamburger */}
          <button
            onClick={() => setMenuOpen((v) => !v)}
            aria-label={menuOpen ? "Close menu" : "Open menu"}
            aria-expanded={menuOpen}
            aria-controls="mobile-nav"
            className="flex h-9 w-9 flex-col items-center justify-center gap-[5px] rounded-lg border border-white/15 sm:hidden focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-amber-200/60"
          >
            <span
              className={`h-px w-4 origin-center bg-white transition-all duration-300 ${
                menuOpen ? "translate-y-[6.5px] rotate-45" : ""
              }`}
            />
            <span
              className={`h-px w-4 bg-white transition-all duration-300 ${
                menuOpen ? "opacity-0 scale-x-0" : ""
              }`}
            />
            <span
              className={`h-px w-4 origin-center bg-white transition-all duration-300 ${
                menuOpen ? "-translate-y-[6.5px] -rotate-45" : ""
              }`}
            />
          </button>
        </div>
      </header>

      {/* Mobile nav overlay */}
      <div
        id="mobile-nav"
        role="dialog"
        aria-label="Navigation menu"
        aria-modal="true"
        aria-hidden={!menuOpen}
        className={`fixed inset-0 z-30 flex flex-col bg-[#08080a] pt-24 pb-10 px-8 transition-all duration-500 sm:hidden ${
          menuOpen ? "opacity-100 pointer-events-auto" : "opacity-0 pointer-events-none"
        }`}
      >
        {/* Gold accent line */}
        <div className="mb-10 h-px w-8 bg-amber-200/40" />

        <nav aria-label="Mobile navigation" className="flex flex-col gap-1">
          {NAV.map((n, i) => (
            <a
              key={n.label}
              href={n.href}
              onClick={() => setMenuOpen(false)}
              className="group flex items-center justify-between border-b border-white/8 py-5 font-serif text-4xl italic text-white/80 transition hover:text-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-amber-200/60"
              style={{
                transform: menuOpen ? "translateY(0)" : "translateY(20px)",
                opacity: menuOpen ? 1 : 0,
                transitionProperty: "opacity, transform, color",
                transitionDuration: `0.4s, 0.4s, 0.2s`,
                transitionTimingFunction: "ease, ease, ease",
                transitionDelay: menuOpen ? `${i * 60}ms, ${i * 60}ms, 0ms` : "0ms",
              }}
            >
              {n.label}
              <span className="font-mono text-xs tracking-widest text-white/20 group-hover:text-amber-200/60 transition-colors not-italic">
                {String(i + 1).padStart(2, "0")}
              </span>
            </a>
          ))}
        </nav>

        <div className="mt-auto flex flex-col gap-4">
          {/* Mobile auth */}
          {!loading && (
            user ? (
              <button
                onClick={() => { handleSignOut(); setMenuOpen(false); }}
                className="self-start font-mono text-xs uppercase tracking-widest text-white/40 transition hover:text-white"
              >
                Sign out ({user.email})
              </button>
            ) : (
              <button
                onClick={() => { openModal("signin"); setMenuOpen(false); }}
                className="self-start font-mono text-xs uppercase tracking-widest text-amber-200/60 transition hover:text-amber-200"
              >
                Sign in →
              </button>
            )
          )}
          <p className="font-mono text-[10px] uppercase tracking-[0.4em] text-white/20">
            {PRODUCT.brand} — Made to order
          </p>
        </div>
      </div>
    </>
  );
}
