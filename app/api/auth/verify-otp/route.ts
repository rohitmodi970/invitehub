import { NextResponse } from 'next/server';
import { cookies } from 'next/headers';
import crypto from 'crypto';

const OTP_SECRET = process.env.OTP_SECRET || 'invitehub-secret-key-123';

export async function POST(request: Request) {
  try {
    const { email, otp, hash, expiresAt } = await request.json();

    if (!email || !otp || !hash || !expiresAt) {
      return NextResponse.json({ error: 'Missing parameters' }, { status: 400 });
    }

    if (Date.now() > expiresAt) {
      return NextResponse.json({ error: 'OTP has expired' }, { status: 400 });
    }

    // Recalculate hash to verify
    const expectedHash = crypto
      .createHmac('sha256', OTP_SECRET)
      .update(`${email}.${otp}.${expiresAt}`)
      .digest('hex');

    if (expectedHash !== hash) {
      return NextResponse.json({ error: 'Invalid OTP code' }, { status: 400 });
    }

    // Create an auth token to persist session for 3 days
    const authSignature = crypto.createHmac('sha256', OTP_SECRET).update(email).digest('hex');
    const token = `${email}.${authSignature}`;
    
    const cookieStore = await cookies();
    cookieStore.set('invitehub_auth', token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'lax',
      maxAge: 3 * 24 * 60 * 60, // 3 days
      path: '/',
    });

    return NextResponse.json({ success: true, verified: true });
  } catch (error) {
    console.error('Verify OTP error:', error);
    return NextResponse.json({ error: 'Failed to verify OTP' }, { status: 500 });
  }
}
