import { createClient } from "@supabase/supabase-js";

const url  = process.env.NEXT_PUBLIC_SUPABASE_URL!;
const key  = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!;

export const supabase = createClient(url, key);

// ── Types ──────────────────────────────────────────────────────────────────

export interface Order {
  id:          string;
  user_id:     string;
  dial:        string;
  dial_hex:    string;
  material:    string;
  size:        string;
  price:       number;
  status:      "pending" | "in_production" | "shipped" | "delivered";
  created_at:  string;
}
