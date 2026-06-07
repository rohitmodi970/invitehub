import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';
import crypto from 'crypto';

const OTP_SECRET = process.env.OTP_SECRET || 'invitehub-secret-key-123';

function verifyAuthCookie(token: string | undefined): boolean {
  if (!token) return false;
  const [email, signature] = token.split('.');
  if (!email || !signature) return false;
  try {
    const expectedSig = crypto.createHmac('sha256', OTP_SECRET).update(email).digest('hex');
    return expectedSig === signature;
  } catch {
    return false;
  }
}

export function proxy(request: NextRequest) {
  const { pathname } = request.nextUrl;

  // Protect /dashboard routes
  if (pathname.startsWith('/dashboard')) {
    const authToken = request.cookies.get('invitehub_auth')?.value;
    const isAuthenticated = verifyAuthCookie(authToken);

    if (!isAuthenticated) {
      // Redirect to home with a hint that auth is needed
      const url = request.nextUrl.clone();
      url.pathname = '/';
      url.searchParams.set('signin', '1');
      return NextResponse.redirect(url);
    }
  }

  return NextResponse.next();
}

export const config = {
  matcher: ['/dashboard/:path*'],
};
