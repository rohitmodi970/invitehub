import { createServerClient } from '@supabase/ssr';
import { cookies } from 'next/headers';
import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

/**
 * GET /api/auth/callback
 *
 * Handles the OAuth callback from Supabase after Google sign-in.
 * Supabase redirects here with a `code` parameter which we exchange
 * for a session (access + refresh tokens stored in cookies).
 *
 * Configure in Supabase Dashboard:
 *   Authentication → URL Configuration → Redirect URLs
 *   Add: https://invitehub.in/api/auth/callback
 *   Add: http://localhost:3000/api/auth/callback  (for development)
 */
export async function GET(request: NextRequest) {
  const { searchParams, origin } = new URL(request.url);
  const code = searchParams.get('code');
  const redirectTo = searchParams.get('redirectTo') ?? '/dashboard';

  if (code) {
    const cookieStore = await cookies();

    const supabase = createServerClient(
      process.env.NEXT_PUBLIC_SUPABASE_URL!,
      process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
      {
        cookies: {
          getAll() {
            return cookieStore.getAll();
          },
          setAll(cookiesToSet) {
            cookiesToSet.forEach(({ name, value, options }) => {
              cookieStore.set(name, value, options);
            });
          },
        },
      }
    );

    const { error } = await supabase.auth.exchangeCodeForSession(code);

    if (!error) {
      // Successfully signed in — redirect to dashboard or intended destination
      return NextResponse.redirect(`${origin}${redirectTo}`);
    }

    console.error('[OAuth Callback] Error exchanging code:', error.message);
  }

  // Error — redirect to auth page with error param
  return NextResponse.redirect(`${origin}/auth?error=oauth_failed`);
}
