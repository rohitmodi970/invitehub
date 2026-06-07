import { NextResponse } from 'next/server';
import crypto from 'crypto';
import { supabase } from '@/lib/supabase/client';

/**
 * Razorpay webhook endpoint.
 * Verifies the webhook signature and marks the invitation as premium.
 * 
 * To activate: set the webhook URL in Razorpay dashboard to:
 *   https://yourdomain.com/api/webhooks/razorpay
 * And add RAZORPAY_WEBHOOK_SECRET to your .env.local
 */
export async function POST(request: Request) {
  try {
    const body = await request.text();
    const signature = request.headers.get('x-razorpay-signature');
    const webhookSecret = process.env.RAZORPAY_WEBHOOK_SECRET;

    if (!webhookSecret) {
      // Webhook secret not configured — skip verification but still process
      console.warn('RAZORPAY_WEBHOOK_SECRET not set, skipping signature check');
    } else if (!signature) {
      return NextResponse.json({ error: 'Missing signature' }, { status: 400 });
    } else {
      // Verify webhook signature
      const expectedSig = crypto
        .createHmac('sha256', webhookSecret)
        .update(body)
        .digest('hex');

      if (expectedSig !== signature) {
        return NextResponse.json({ error: 'Invalid webhook signature' }, { status: 400 });
      }
    }

    const event = JSON.parse(body);

    if (event.event === 'payment.captured') {
      const payment = event.payload?.payment?.entity;
      const orderId = payment?.order_id;
      const paymentId = payment?.id;
      const email = payment?.email;

      if (orderId && paymentId) {
        // Find payment record by order ID and mark it as captured
        const { error } = await supabase
          .from('payments')
          .update({ status: 'captured' })
          .eq('razorpayOrderId', orderId);

        if (error) {
          console.error('Webhook: Failed to update payment status:', error);
        }

        // If email available, find the most recent unpremium invitation for this user
        if (email) {
          const { data: latestInvite } = await supabase
            .from('invitations')
            .select('slug')
            .eq('userEmail', email)
            .eq('isPremium', false)
            .order('created_at', { ascending: false })
            .limit(1)
            .single();

          if (latestInvite?.slug) {
            await supabase
              .from('invitations')
              .update({ isPremium: true })
              .eq('slug', latestInvite.slug);
          }
        }
      }
    }

    return NextResponse.json({ received: true });
  } catch (error) {
    console.error('Webhook error:', error);
    return NextResponse.json({ error: 'Webhook processing failed' }, { status: 500 });
  }
}
