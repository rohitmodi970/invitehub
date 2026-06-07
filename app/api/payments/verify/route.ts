import { NextResponse } from 'next/server';
import crypto from 'crypto';
import { supabase } from '@/lib/supabase/client';
import { cookies } from 'next/headers';

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const {
      razorpay_order_id,
      razorpay_payment_id,
      razorpay_signature,
      planType,
      amountPaid,
      userEmail,
      invitationSlug,
    } = body;

    if (!razorpay_order_id || !razorpay_payment_id || !razorpay_signature) {
      return NextResponse.json({ error: 'Missing payment fields' }, { status: 400 });
    }

    // Verify HMAC-SHA256 signature
    const keySecret = process.env.RAZORPAY_KEY_SECRET;
    if (!keySecret) {
      return NextResponse.json({ error: 'Razorpay secret not configured' }, { status: 500 });
    }

    const expectedSignature = crypto
      .createHmac('sha256', keySecret)
      .update(`${razorpay_order_id}|${razorpay_payment_id}`)
      .digest('hex');

    if (expectedSignature !== razorpay_signature) {
      return NextResponse.json({ error: 'Invalid payment signature' }, { status: 400 });
    }

    // Get authenticated user email from cookie if not provided
    let resolvedEmail = userEmail;
    if (!resolvedEmail) {
      const OTP_SECRET = process.env.OTP_SECRET || 'invitehub-secret-key-123';
      const cookieStore = await cookies();
      const authToken = cookieStore.get('invitehub_auth')?.value;
      if (authToken) {
        const [emailFromCookie, signature] = authToken.split('.');
        const expectedSig = crypto.createHmac('sha256', OTP_SECRET).update(emailFromCookie).digest('hex');
        if (signature === expectedSig) {
          resolvedEmail = emailFromCookie;
        }
      }
    }

    // Record payment in Supabase
    const { error: dbError } = await supabase.from('payments').insert({
      userId: resolvedEmail || 'anonymous',
      planType: planType || 'basic',
      amountPaid: amountPaid || 0,
      razorpayOrderId: razorpay_order_id,
      razorpayPaymentId: razorpay_payment_id,
      status: 'paid',
    });

    if (dbError) {
      // Non-fatal — log but don't fail the response
      console.error('Failed to record payment:', dbError);
    }

    // Flip isPremium on the invitation if slug is provided
    if (invitationSlug) {
      const { error: updateError } = await supabase
        .from('invitations')
        .update({ isPremium: true, userEmail: resolvedEmail || null })
        .eq('slug', invitationSlug);

      if (updateError) {
        console.error('Failed to mark invitation as premium:', updateError);
      }
    }

    return NextResponse.json({ success: true, verified: true });
  } catch (error) {
    console.error('Payment verify error:', error);
    return NextResponse.json({ error: 'Verification failed' }, { status: 500 });
  }
}
