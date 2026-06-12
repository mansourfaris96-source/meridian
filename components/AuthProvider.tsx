"use client";

import { useEffect } from "react";
import { supabase } from "@/lib/supabase";
import { useAuth } from "@/store/auth";

/**
 * Mounts once in layout.tsx. Boots the Supabase session and listens
 * for auth state changes (sign in, sign out, token refresh).
 */
export default function AuthProvider({ children }: { children: React.ReactNode }) {
  const { setUser, setLoading } = useAuth();

  useEffect(() => {
    // Get current session on mount
    supabase.auth.getSession().then(({ data: { session } }) => {
      setUser(session?.user ?? null);
      setLoading(false);
    });

    // Listen for auth changes
    const { data: { subscription } } = supabase.auth.onAuthStateChange(
      (_event, session) => {
        setUser(session?.user ?? null);
        setLoading(false);
      }
    );

    return () => subscription.unsubscribe();
  }, [setUser, setLoading]);

  return <>{children}</>;
}
