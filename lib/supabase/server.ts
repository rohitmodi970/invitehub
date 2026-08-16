/**
 * Supabase Server Client — for use in Server Components, Route Handlers, and Server Actions.
 * Creates a new client per request with proper cookie handling via @supabase/ssr.
 *
 * Usage:
 *   import { createServerClient } from '@/lib/supabase/server'
 *   const supabase = await createServerClient()
 */
import { createServerClient as createSSRClient } from '@supabase/ssr';
import { cookies } from 'next/headers';

export async function createServerClient() {
  const cookieStore = await cookies();

  return createSSRClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
    {
      cookies: {
        getAll() {
          return cookieStore.getAll();
        },
        setAll(cookiesToSet) {
          try {
            cookiesToSet.forEach(({ name, value, options }) => {
              cookieStore.set(name, value, options);
            });
          } catch {
            // setAll can be called from Server Components where cookies can't be set.
            // This is safe to ignore if middleware is refreshing user sessions.
          }
        },
      },
    }
  );
}
