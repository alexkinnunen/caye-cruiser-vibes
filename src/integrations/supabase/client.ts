// src/integrations/supabase/client.ts
import { createClient } from "@supabase/supabase-js";
import { env } from "@/lib/env";
import type { Database } from "@/integrations/supabase/types";

// Create Supabase client with validated environment variables
export const supabase = createClient<Database>(
  env.VITE_SUPABASE_URL,
  env.VITE_SUPABASE_PUBLISHABLE_KEY,
  {
    auth: {
      autoRefreshToken: true,
      persistSession: true,
      detectSessionInUrl: true,
    },
  },
);

// Export types for better TypeScript support
export type SupabaseClient = typeof supabase;
