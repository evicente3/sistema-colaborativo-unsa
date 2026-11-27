import { createClient } from '@supabase/supabase-js'

// Vite replaces import.meta.env.VITE_* at build time with the values
// from .env.local (which is gitignored).  Fail fast at startup if either
// variable is missing so we get a clear error instead of mysterious 401s.
const supabaseUrl = import.meta.env.VITE_SUPABASE_URL
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY

if (!supabaseUrl || !supabaseAnonKey) {
  throw new Error(
    'Missing Supabase env vars. Copy .env.example to .env.local and fill in the values.',
  )
}

// createClient returns a typed SupabaseClient instance.
// We export it as a singleton so the whole app shares one WebSocket connection.
export const supabase = createClient(supabaseUrl, supabaseAnonKey)
