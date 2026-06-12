"use client";

import { useState } from "react";
import Reveal from "./Reveal";
import SplitHeadline from "./SplitHeadline";

export default function NewsletterSection() {
  const [email, setEmail] = useState("");
  const [sent, setSent]   = useState(false);

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!email) return;
    setSent(true);
  }

  return (
    <section className="relative overflow-hidden border-t border-white/8 py-28">
      {/* Gold glow behind */}
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_60%_80%_at_50%_50%,rgba(201,168,83,0.07),transparent)]" />

      {/* Decorative horizontal lines */}
      <div className="pointer-events-none absolute left-0 right-0 top-0 h-px bg-gradient-to-r from-transparent via-amber-200/20 to-transparent" />
      <div className="pointer-events-none absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-amber-200/10 to-transparent" />

      <div className="relative mx-auto max-w-2xl px-6 text-center sm:px-10">
        <Reveal>
          <p className="mb-3 font-mono text-xs uppercase tracking-[0.4em] text-amber-200/70">
            First access
          </p>
          <SplitHeadline by="blur" className="font-serif text-4xl italic sm:text-5xl">
            New references. No noise.
          </SplitHeadline>
          <p className="mt-5 text-sm leading-7 text-white/50">
            One new reference per quarter. Subscribers configure before anyone else.
          </p>
        </Reveal>

        <Reveal delay={0.1}>
          {sent ? (
            <div className="mt-10 inline-flex items-center gap-3 rounded-full border border-amber-200/20 bg-amber-200/5 px-6 py-3">
              <span className="text-amber-200/80">✓</span>
              <span className="font-mono text-sm text-amber-200/80">You're on the list.</span>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="mt-10 flex gap-3">
              <label htmlFor="newsletter-email" className="sr-only">
                Email address
              </label>
              <input
                id="newsletter-email"
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="your@email.com"
                autoComplete="email"
                className="flex-1 rounded-full border border-white/15 bg-white/5 px-5 py-3.5 text-sm text-white placeholder-white/25 outline-none transition focus:border-amber-200/40 focus:bg-white/8"
              />
              <button
                type="submit"
                className="rounded-full bg-amber-200/90 px-7 py-3.5 text-sm font-semibold text-black transition hover:bg-amber-200"
              >
                Join
              </button>
            </form>
          )}
        </Reveal>

        {/* Social proof */}
        <Reveal delay={0.15}>
          <p className="mt-6 font-mono text-[11px] text-white/25">
            Joined by 2,400+ collectors across 48 countries
          </p>
        </Reveal>
      </div>
    </section>
  );
}
