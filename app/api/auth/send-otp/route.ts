import { NextResponse } from 'next/server';
import crypto from 'crypto';
import { sendOtpEmail } from '@/lib/email/resend';

const OTP_SECRET = process.env.OTP_SECRET || 'invitehub-secret-key-123';

export async function POST(request: Request) {
  try {
    const { email } = await request.json();
    if (!email) return NextResponse.json({ error: 'Email is required' }, { status: 400 });

    // Generate 6-digit OTP
    const otp = Math.floor(100000 + Math.random() * 900000).toString();
    
    // Expires in 10 minutes
    const expiresAt = Date.now() + 10 * 60 * 1000;
    
    // Create stateless hash: hash(email + otp + expiresAt)
    const hash = crypto
      .createHmac('sha256', OTP_SECRET)
      .update(`${email}.${otp}.${expiresAt}`)
      .digest('hex');

    // Send email via Nodemailer
    await sendOtpEmail(email, otp);

    return NextResponse.json({ success: true, hash, expiresAt });
  } catch (error) {
    console.error('Send OTP error:', error);
    return NextResponse.json({ error: 'Failed to send OTP email' }, { status: 500 });
  }
}
