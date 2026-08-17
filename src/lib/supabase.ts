import { createClient } from '@supabase/supabase-js';

// OFFICIAL SUPABASE CONFIGURATION FOR BDGMERCH
export const SUPABASE_URL = "https://eqgegynculkytuxyakdh.supabase.co";
export const SUPABASE_ANON_KEY = "sb_publishable_7nHeb7sNmEQrzOZCROJjNQ_al8vDhjo";

// Singleton Supabase Client instance to prevent "Multiple GoTrueClient instances detected"
export const supabase = createClient(SUPABASE_URL, SUPABASE_ANON_KEY, {
  auth: {
    persistSession: true,
    autoRefreshToken: true,
    detectSessionInUrl: true,
  },
});
