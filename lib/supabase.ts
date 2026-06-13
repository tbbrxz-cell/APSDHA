import { createClient } from "@supabase/supabase-js";

// Fallback to empty strings so Supabase doesn't throw errors during build
// when env vars aren't set (Netlify, etc.)
const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || "";
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || "";

export const supabase = createClient(supabaseUrl, supabaseAnonKey);
