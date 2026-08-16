import { createServerClient } from '@supabase/ssr';
import { NextResponse, type NextRequest } from 'next/server';

/**
 * Supabase session proxy.
 *
 * Refreshes the Supabase Auth session on every request so that
 * Server Components always have access to the current user.
 *
 * Also protects dashboard routes — redirects unauthenticated users to /auth.
 */
export async function proxy(request: NextRequest) {
  let supabaseResponse = NextResponse.next({ request });

  const supabase = createServerClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
    {
      cookies: {
        getAll() {
          return request.cookies.getAll();
        },
        setAll(cookiesToSet) {
          cookiesToSet.forEach(({ name, value }) =>
            request.cookies.set(name, value)
          );
          supabaseResponse = NextResponse.next({ request });
          cookiesToSet.forEach(({ name, value, options }) =>
            supabaseResponse.cookies.set(name, value, options)
          );
        },
      },
    }
  );

  // Refresh session — required for Server Components to read auth state
  const { data: { user } } = await supabase.auth.getUser();

  const pathname = request.nextUrl.pathname;

  // ── Protected routes ────────────────────────────────────────────────
  const isProtectedRoute = pathname.startsWith('/dashboard') ||
    pathname.startsWith('/workspace');

  // Also check for the old HMAC cookie (backward compat during migration)
  const hasLegacyCookie = request.cookies.has('invitehub_auth');

  if (isProtectedRoute && !user && !hasLegacyCookie) {
    // Redirect to auth page, preserving the destination
    const redirectUrl = new URL('/auth', request.url);
    redirectUrl.searchParams.set('redirectTo', pathname);
    return NextResponse.redirect(redirectUrl);
  }

  return supabaseResponse;
}

export const config = {
  matcher: [
    /*
     * Match all request paths except:
     * - _next/static (static files)
     * - _next/image (image optimization)
     * - favicon.ico
     * - Public event pages (/e/*)
     * - Public pages (/, /templates, /pricing, /blog, /i/*)
     * - API routes (handled by their own auth)
     */
    '/((?!_next/static|_next/image|favicon.ico|.*\\.(?:svg|png|jpg|jpeg|gif|webp|ico|css|js)$).*)',
  ],
};
