import { create } from "zustand";

// One cart line = one fully-configured product.
export type CartItem = {
  id: string; // unique per configuration (color+material+size+timestamp)
  name: string; // e.g. "VOLT Aero Runner"
  colorway: string;
  material: string;
  size: string;
  price: number;
  swatch: string; // hex, for the line-item thumbnail tint
};

type CartState = {
  items: CartItem[];
  isOpen: boolean;
  add: (item: CartItem) => void;
  remove: (id: string) => void;
  clear: () => void;
  setOpen: (open: boolean) => void;
  subtotal: () => number;
};

// zustand store — any component can read/update the cart without prop drilling.
export const useCart = create<CartState>((set, get) => ({
  items: [],
  isOpen: false,
  add: (item) => set((s) => ({ items: [...s.items, item], isOpen: true })),
  remove: (id) => set((s) => ({ items: s.items.filter((i) => i.id !== id) })),
  clear: () => set({ items: [] }),
  setOpen: (open) => set({ isOpen: open }),
  subtotal: () => get().items.reduce((sum, i) => sum + i.price, 0),
}));
