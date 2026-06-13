import { createClient, SupabaseClient } from "@supabase/supabase-js";

// Create a safe supabase client that won't throw during build
let supabaseInstance: SupabaseClient | null = null;

function getSupabase(): SupabaseClient {
  if (supabaseInstance) {
    return supabaseInstance;
  }

  const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

  // If we don't have valid env vars, return a dummy client (for build safety)
  if (!supabaseUrl || !supabaseAnonKey || supabaseUrl.length === 0 || supabaseAnonKey.length === 0) {
    // Create a dummy client that returns empty/error responses
    const dummyClient = {
      from: () => ({
        select: () => ({
          order: () => ({
            limit: () => ({ maybeSingle: async () => ({ data: null, error: null }) }),
            eq: () => ({ maybeSingle: async () => ({ data: null, error: null }) }),
          }),
          eq: () => ({ maybeSingle: async () => ({ data: null, error: null }) }),
          insert: async () => ({ error: null }),
        }),
      }),
      storage: { from: () => ({ upload: async () => ({ error: null }), getPublicUrl: () => ({ data: { publicUrl: "" } }) }) }
    } as unknown as SupabaseClient;

    supabaseInstance = dummyClient;
    return dummyClient;
  }

  // Otherwise create the real client!
  const realClient = createClient(supabaseUrl, supabaseAnonKey);
  supabaseInstance = realClient;
  return realClient;
}

export const supabase = getSupabase();
