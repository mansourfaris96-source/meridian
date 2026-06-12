"use client";

import { useEffect, useRef, useState } from "react";
import { useCart } from "@/store/cart";
import { formatPrice } from "@/lib/product.config";
import { supabase } from "@/lib/supabase";
import { useAuth } from "@/store/auth";

export default function CartDrawer() {
  const { items, isOpen, setOpen, remove, subtotal, clear } = useCart();
  const closeRef   = useRef<HTMLButtonElement>(null);
  const triggerRef = useRef<HTMLElement | null>(null);
  const { user, openModal } = useAuth();
  const [checkoutState, setCheckoutState] = useState<"idle" | "loading" | "success" | "error">("idle");
  const [checkoutError, setCheckoutError] = useState<string | null>(null);

  async function handleCheckout() {
    if (!user) { openModal("signin"); return; }
    if (items.length === 0) return;
    setCheckoutState("loading");
    setCheckoutError(null);

    // Insert one order row per cart item
    const rows = items.map((item) => ({
      user_id:  user.id,
      dial:     item.colorway,
      dial_hex: item.swatch,
      material: item.material,
      size:     item.size,
      price:    item.price,
      status:   "pending" as const,
    }));

    const { error } = await supabase.from("orders").insert(rows);
    if (error) {
      setCheckoutState("error");
      setCheckoutError(error.message);
    } else {
      setCheckoutState("success");
      clear();
    }
  }

  // Store the element that opened the drawer so we can return focus on close
  useEffect(() => {
    if (isOpen) {
      triggerRef.current = document.activeElement as HTMLElement;
      // Move focus to close button after animation frame
      requestAnimationFrame(() => closeRef.current?.focus());
    } else {
      triggerRef.current?.focus();
      triggerRef.current = null;
    }
  }, [isOpen]);

  // Focus trap — keep Tab/Shift+Tab inside the drawer
  useEffect(() => {
    if (!isOpen) return;
    const handleKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") { setOpen(false); return; }
      if (e.key !== "Tab") return;

      const drawer = document.getElementById("cart-drawer");
      if (!drawer) return;
      const focusable = Array.from(
        drawer.querySelectorAll<HTMLElement>(
          'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])'
        )
      ).filter((el) => !el.hasAttribute("disabled"));

      if (!focusable.length) return;
      const first = focusable[0];
      const last  = focusable[focusable.length - 1];

      if (e.shiftKey) {
        if (document.activeElement === first) { e.preventDefault(); last.focus(); }
      } else {
        if (document.activeElement === last) { e.preventDefault(); first.focus(); }
      }
    };
    document.addEventListener("keydown", handleKey);
    return () => document.removeEventListener("keydown", handleKey);
  }, [isOpen, setOpen]);

  return (
    <>
      {/* Backdrop */}
      <div
        onClick={() => setOpen(false)}
        aria-hidden="true"
        className={`fixed inset-0 z-50 bg-black/60 backdrop-blur-sm transition-opacity ${
          isOpen ? "opacity-100" : "pointer-events-none opacity-0"
        }`}
      />

      {/* Drawer */}
      <aside
        id="cart-drawer"
        role="dialog"
        aria-modal="true"
        aria-label="Shopping cart"
        className={`fixed right-0 top-0 z-50 flex h-full w-full max-w-md flex-col bg-[#0c0c10] shadow-2xl transition-transform duration-300 ${
          isOpen ? "translate-x-0" : "translate-x-full"
        }`}
      >
        <div className="flex items-center justify-between border-b border-white/10 px-6 py-5">
          <h2 className="font-serif text-2xl italic">Your bag</h2>
          <button
            ref={closeRef}
            onClick={() => setOpen(false)}
            className="flex h-8 w-8 items-center justify-center rounded-full text-white/50 transition hover:bg-white/8 hover:text-white"
            aria-label="Close cart"
          >
            ✕
          </button>
        </div>

        <div className="flex-1 overflow-y-auto px-6 py-4">
          {items.length === 0 ? (
            <div className="mt-16 text-center">
              <p className="text-sm text-white/40">Your bag is empty.</p>
              <a
                href="/#configure"
                onClick={() => setOpen(false)}
                className="mt-4 inline-block font-mono text-xs uppercase tracking-widest text-amber-200/60 transition hover:text-amber-200"
              >
                Configure your watch →
              </a>
            </div>
          ) : (
            <ul className="flex flex-col gap-4" aria-label="Cart items">
              {items.map((item) => (
                <li
                  key={item.id}
                  className="flex items-center gap-4 rounded-xl border border-white/10 bg-white/[0.03] p-3"
                >
                  <span
                    className="h-12 w-12 flex-shrink-0 rounded-lg border border-white/10"
                    style={{ background: item.swatch }}
                    aria-hidden="true"
                  />
                  <div className="min-w-0 flex-1">
                    <p className="truncate text-sm font-medium">{item.name}</p>
                    <p className="text-xs text-white/50">
                      {item.colorway} · {item.material} · {item.size}
                    </p>
                  </div>
                  <div className="shrink-0 text-right">
                    <p className="text-sm">{formatPrice(item.price)}</p>
                    <button
                      onClick={() => remove(item.id)}
                      aria-label={`Remove ${item.name} from cart`}
                      className="text-xs text-white/40 underline transition hover:text-white/70"
                    >
                      remove
                    </button>
                  </div>
                </li>
              ))}
            </ul>
          )}
        </div>

        <div className="border-t border-white/10 px-6 py-5">
          {checkoutState === "success" ? (
            <div className="py-3 text-center">
              <p className="font-serif text-xl italic text-white">Order placed.</p>
              <p className="mt-1.5 text-xs text-white/50">
                We'll be in touch. It takes approximately 7 days.
              </p>
              <button
                onClick={() => { setCheckoutState("idle"); setOpen(false); }}
                className="mt-4 font-mono text-xs uppercase tracking-widest text-amber-200/60 transition hover:text-amber-200"
              >
                Close →
              </button>
            </div>
          ) : (
            <>
              <div className="mb-4 flex items-center justify-between text-sm">
                <span className="text-white/50">Subtotal</span>
                <span className="font-serif text-xl italic">{formatPrice(subtotal())}</span>
              </div>
              {checkoutError && (
                <p className="mb-3 rounded-lg bg-red-500/10 px-3 py-2 text-xs text-red-400">
                  {checkoutError}
                </p>
              )}
              {!user && items.length > 0 && (
                <p className="mb-3 text-center font-mono text-[11px] text-white/35">
                  You'll need to sign in to complete your order.
                </p>
              )}
              <button
                onClick={handleCheckout}
                disabled={items.length === 0 || checkoutState === "loading"}
                aria-disabled={items.length === 0}
                aria-label={items.length === 0 ? "Add items to checkout" : "Checkout"}
                className="w-full rounded-full bg-amber-200 px-6 py-3.5 text-sm font-semibold text-black transition hover:bg-amber-100 disabled:cursor-not-allowed disabled:opacity-40"
              >
                {checkoutState === "loading"
                  ? "Placing order..."
                  : items.length === 0
                  ? "Add items to checkout"
                  : user
                  ? "Place order"
                  : "Sign in to order"}
              </button>
            </>
          )}
        </div>
      </aside>
    </>
  );
}
