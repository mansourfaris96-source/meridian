import { create } from "zustand";
import { User } from "@supabase/supabase-js";

interface AuthStore {
  user:         User | null;
  loading:      boolean;
  modalOpen:    boolean;
  modalMode:    "signin" | "signup";
  setUser:      (u: User | null) => void;
  setLoading:   (v: boolean) => void;
  openModal:    (mode?: "signin" | "signup") => void;
  closeModal:   () => void;
  setModalMode: (mode: "signin" | "signup") => void;
}

export const useAuth = create<AuthStore>((set) => ({
  user:      null,
  loading:   true,
  modalOpen: false,
  modalMode: "signin",

  setUser:      (user)    => set({ user }),
  setLoading:   (loading) => set({ loading }),
  openModal:    (mode = "signin") => set({ modalOpen: true, modalMode: mode }),
  closeModal:   ()        => set({ modalOpen: false }),
  setModalMode: (mode)    => set({ modalMode: mode }),
}));
