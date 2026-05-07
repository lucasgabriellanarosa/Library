import type { SupabaseClient } from "@supabase/supabase-js";

let cachedSupabase: SupabaseClient | null = null;

export async function getSupabase(): Promise<SupabaseClient> {
  if (cachedSupabase) return cachedSupabase;

  const { supabase } = await import("./supabaseClient");

  cachedSupabase = supabase;

  return supabase;
}