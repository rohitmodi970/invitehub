import { NextResponse } from 'next/server';
import { cookies } from 'next/headers';
import crypto from 'crypto';

const OTP_SECRET = process.env.OTP_SECRET || 'invitehub-secret-key-123';

export async function GET() {
  try {
    const cookieStore = await cookies();
    const authToken = cookieStore.get('invitehub_auth')?.value;

    if (!authToken) {
      return NextResponse.json({ authenticated: false }, { status: 401 });
    }

    const [email, signature] = authToken.split('.');

    if (!email || !signature) {
      return NextResponse.json({ authenticated: false }, { status: 401 });
    }

    const expectedSignature = crypto.createHmac('sha256', OTP_SECRET).update(email).digest('hex');

    if (expectedSignature !== signature) {
      return NextResponse.json({ authenticated: false }, { status: 401 });
    }

    return NextResponse.json({ authenticated: true, email });
  } catch (error) {
    console.error('Check auth error:', error);
    return NextResponse.json({ authenticated: false }, { status: 500 });
  }
}
