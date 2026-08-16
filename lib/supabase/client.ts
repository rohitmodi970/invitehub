/**
 * Supabase Browser Client — for use in Client Components only.
 * A singleton client that persists across renders.
 *
 * Usage:
 *   import { supabase } from '@/lib/supabase/client'
 */
import { createBrowserClient } from '@supabase/ssr';

export const supabase = createBrowserClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
);
