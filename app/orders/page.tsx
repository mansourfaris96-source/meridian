"use client";

import { useEffect, useState } from "react";
import { supabase, Order } from "@/lib/supabase";
import { useAuth } from "@/store/auth";
import { formatPrice } from "@/lib/product.config";

const STATUS_LABEL: Record<Order["status"], string> = {
  pending:       "Pending",
  in_production: "In production",
  shipped:       "Shipped",
  delivered:     "Delivered",
};

const STATUS_DOT: Record<Order["status"], string> = {
  pending:       "bg-white/30",
  in_production: "bg-amber-200/70",
  shipped:       "bg-green-400/70",
  delivered:     "bg-green-500",
};

export default function OrdersPage() {
  const { user, loading: authLoading, openModal } = useAuth();
  const [orders,  setOrders]  = useState<Order[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (authLoading) return;
    if (!user) { setLoading(false); return; }

    supabase
      .from("orders")
      .select("*")
      .order("created_at", { ascending: false })
      .then(({ data }) => {
        setOrders((data as Order[]) ?? []);
        setLoading(false);
      });
  }, [user, authLoading]);

  // Not signed in
  if (!authLoading && !user) {
    return (
      <main className="flex min-h-screen flex-col items-center justify-center px-6">
        <div className="mb-6 h-px w-8 bg-amber-200/40" />
        <p className="font-serif text-3xl italic text-white">Sign in to view orders</p>
        <p className="mt-3 text-sm text-white/40">
          Your order history lives here once you place an order.
        </p>
        <button
          onClick={() => openModal("signin")}
          className="mt-8 rounded-full bg-amber-200 px-8 py-3.5 text-sm font-semibold text-black transition hover:bg-amber-100"
        >
          Sign in
        </button>
      </main>
    );
  }

  return (
    <main className="min-h-screen px-6 pb-24 pt-32 sm:px-10">
      <div className="mx-auto max-w-2xl">
        <div className="mb-3 h-px w-8 bg-amber-200/40" />
        <h1 className="font-serif text-4xl italic">Your orders</h1>
        <p className="mt-2 text-sm text-white/40">{user?.email}</p>

        <div className="mt-12">
          {loading ? (
            <p className="text-sm text-white/30">Loading...</p>
          ) : orders.length === 0 ? (
            <div className="py-16 text-center">
              <p className="text-sm text-white/40">No orders yet.</p>
              <a
                href="/#configure"
                className="mt-4 inline-block font-mono text-xs uppercase tracking-widest text-amber-200/60 transition hover:text-amber-200"
              >
                Configure your watch →
              </a>
            </div>
          ) : (
            <ul className="flex flex-col gap-4">
              {orders.map((order) => (
                <li
                  key={order.id}
                  className="rounded-2xl border border-white/10 bg-white/[0.03] p-5"
                >
                  <div className="flex items-start gap-4">
                    {/* Dial swatch */}
                    <span
                      className="mt-1 h-10 w-10 flex-shrink-0 rounded-lg border border-white/10"
                      style={{ background: order.dial_hex }}
                      aria-hidden="true"
                    />
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center justify-between gap-2">
                        <p className="text-sm font-medium">
                          {order.dial} · {order.material} · {order.size}
                        </p>
                        <p className="shrink-0 font-serif italic">
                          {formatPrice(order.price)}
                        </p>
                      </div>
                      <div className="mt-2 flex items-center gap-2">
                        <span className={`h-1.5 w-1.5 rounded-full ${STATUS_DOT[order.status]}`} />
                        <span className="font-mono text-[11px] text-white/50 uppercase tracking-widest">
                          {STATUS_LABEL[order.status]}
                        </span>
                      </div>
                      <p className="mt-1.5 font-mono text-[10px] text-white/25">
                        {new Date(order.created_at).toLocaleDateString("en-GB", {
                          day: "numeric", month: "long", year: "numeric",
                        })}
                      </p>
                    </div>
                  </div>
                </li>
              ))}
            </ul>
          )}
        </div>
      </div>
    </main>
  );
}
