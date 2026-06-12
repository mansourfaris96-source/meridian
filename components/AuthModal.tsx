"use client";

import { useEffect, useRef, useState } from "react";
import { supabase } from "@/lib/supabase";
import { useAuth } from "@/store/auth";

export default function AuthModal() {
  const { modalOpen, modalMode, closeModal, setModalMode } = useAuth();

  const [email,    setEmail]    = useState("");
  const [password, setPassword] = useState("");
  const [error,    setError]    = useState<string | null>(null);
  const [loading,  setLoading]  = useState(false);
  const [success,  setSuccess]  = useState(false);

  const emailRef  = useRef<HTMLInputElement>(null);
  const closeRef  = useRef<HTMLButtonElement>(null);

  // Focus email field when modal opens
  useEffect(() => {
    if (modalOpen) {
      setError(null);
      setSuccess(false);
      setEmail("");
      setPassword("");
      requestAnimationFrame(() => emailRef.current?.focus());
    }
  }, [modalOpen, modalMode]);

  // Focus trap + Escape
  useEffect(() => {
    if (!modalOpen) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") { closeModal(); return; }
      if (e.key !== "Tab") return;
      const modal = document.getElementById("auth-modal");
      if (!modal) return;
      const focusable = Array.from(
        modal.querySelectorAll<HTMLElement>(
          'button, input, [tabindex]:not([tabindex="-1"])'
        )
      ).filter((el) => !el.hasAttribute("disabled"));
      const first = focusable[0];
      const last  = focusable[focusable.length - 1];
      if (e.shiftKey && document.activeElement === first) { e.preventDefault(); last.focus(); }
      else if (!e.shiftKey && document.activeElement === last) { e.preventDefault(); first.focus(); }
    };
    document.addEventListener("keydown", onKey);
    return () => document.removeEventListener("keydown", onKey);
  }, [modalOpen, closeModal]);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setError(null);
    setLoading(true);

    if (modalMode === "signup") {
      const { error } = await supabase.auth.signUp({ email, password });
      if (error) {
        setError(error.message);
      } else {
        setSuccess(true);
      }
    } else {
      const { error } = await supabase.auth.signInWithPassword({ email, password });
      if (error) {
        setError(error.message);
      } else {
        closeModal();
      }
    }
    setLoading(false);
  }

  if (!modalOpen) return null;

  return (
    <>
      {/* Backdrop */}
      <div
        aria-hidden="true"
        onClick={closeModal}
        className="fixed inset-0 z-[9100] bg-black/70 backdrop-blur-sm"
      />

      {/* Modal */}
      <div
        id="auth-modal"
        role="dialog"
        aria-modal="true"
        aria-label={modalMode === "signup" ? "Create account" : "Sign in"}
        className="fixed left-1/2 top-1/2 z-[9200] w-full max-w-sm -translate-x-1/2 -translate-y-1/2 rounded-2xl border border-white/10 bg-[#0c0c10] p-8 shadow-2xl"
      >
        {/* Close */}
        <button
          ref={closeRef}
          onClick={closeModal}
          aria-label="Close"
          className="absolute right-4 top-4 flex h-8 w-8 items-center justify-center rounded-full text-white/40 transition hover:bg-white/8 hover:text-white"
        >
          ✕
        </button>

        {/* Gold accent */}
        <div className="mb-6 h-px w-8 bg-amber-200/50" />

        {success ? (
          <div className="py-4 text-center">
            <p className="font-serif text-2xl italic text-white">Check your email.</p>
            <p className="mt-3 text-sm leading-6 text-white/50">
              We sent a confirmation link to <span className="text-white/80">{email}</span>.
              Click it to activate your account, then sign in.
            </p>
            <button
              onClick={() => { setSuccess(false); setModalMode("signin"); }}
              className="mt-6 font-mono text-xs uppercase tracking-widest text-amber-200/70 transition hover:text-amber-200"
            >
              Back to sign in →
            </button>
          </div>
        ) : (
          <>
            {/* Mode tabs */}
            <div className="mb-7 flex gap-6">
              {(["signin", "signup"] as const).map((m) => (
                <button
                  key={m}
                  onClick={() => { setModalMode(m); setError(null); }}
                  className={`font-serif text-2xl italic transition ${
                    modalMode === m ? "text-white" : "text-white/30 hover:text-white/60"
                  }`}
                >
                  {m === "signin" ? "Sign in" : "Create account"}
                </button>
              ))}
            </div>

            <form onSubmit={handleSubmit} className="flex flex-col gap-4">
              <div>
                <label htmlFor="auth-email" className="sr-only">Email address</label>
                <input
                  ref={emailRef}
                  id="auth-email"
                  type="email"
                  required
                  autoComplete="email"
                  placeholder="your@email.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full rounded-xl border border-white/10 bg-white/5 px-4 py-3 text-sm text-white placeholder-white/25 outline-none transition focus:border-amber-200/40 focus:bg-white/8"
                />
              </div>

              <div>
                <label htmlFor="auth-password" className="sr-only">Password</label>
                <input
                  id="auth-password"
                  type="password"
                  required
                  autoComplete={modalMode === "signup" ? "new-password" : "current-password"}
                  placeholder={modalMode === "signup" ? "Choose a password (8+ chars)" : "Password"}
                  minLength={modalMode === "signup" ? 8 : undefined}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full rounded-xl border border-white/10 bg-white/5 px-4 py-3 text-sm text-white placeholder-white/25 outline-none transition focus:border-amber-200/40 focus:bg-white/8"
                />
              </div>

              {error && (
                <p role="alert" className="rounded-lg bg-red-500/10 px-4 py-2.5 text-xs text-red-400">
                  {error}
                </p>
              )}

              <button
                type="submit"
                disabled={loading}
                className="mt-1 rounded-full bg-amber-200 py-3.5 text-sm font-semibold text-black transition hover:bg-amber-100 disabled:cursor-not-allowed disabled:opacity-50"
              >
                {loading
                  ? "..."
                  : modalMode === "signin"
                  ? "Sign in"
                  : "Create account"}
              </button>
            </form>

            <p className="mt-5 text-center font-mono text-[11px] text-white/30">
              {modalMode === "signin" ? (
                <>
                  No account?{" "}
                  <button
                    onClick={() => { setModalMode("signup"); setError(null); }}
                    className="text-amber-200/60 transition hover:text-amber-200"
                  >
                    Create one
                  </button>
                </>
              ) : (
                <>
                  Already have one?{" "}
                  <button
                    onClick={() => { setModalMode("signin"); setError(null); }}
                    className="text-amber-200/60 transition hover:text-amber-200"
                  >
                    Sign in
                  </button>
                </>
              )}
            </p>
          </>
        )}
      </div>
    </>
  );
}
