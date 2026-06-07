'use client';

import { useState, useEffect, useCallback, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ArrowLeft, ShieldCheck, Loader2, CheckCircle2, Download, Share2 } from 'lucide-react';
import { Plan, PlanType } from './CheckoutFlow';
import { ExitIntentModal } from './ExitIntentModal';
import { InvitationData } from '@/app/templates/traditional-indian-004/components/TraditionalIndianTemplate';

// Extend Window to include Razorpay
declare global {
  interface Window {
    Razorpay: new (options: RazorpayOptions) => { open: () => void };
  }
}

interface RazorpayOptions {
  key: string;
  amount: number;
  currency: string;
  name: string;
  description: string;
  order_id: string;
  prefill: { name: string; email: string };
  theme: { color: string };
  handler: (response: RazorpayResponse) => void;
  modal: { ondismiss: () => void };
}

interface RazorpayResponse {
  razorpay_payment_id: string;
  razorpay_order_id: string;
  razorpay_signature: string;
}

interface PaymentModalProps {
  plan: Plan;
  effectivePrice: number;
  discountApplied: boolean;
  templateId: string;
  invitationData: InvitationData;
  userEmail: string;
  userName: string;
  onSuccess: (slug?: string) => void;
  onBack: () => void;
  onExitDiscount: () => void;
}

export function PaymentModal({
  plan, effectivePrice, discountApplied, templateId,
  invitationData, userEmail, userName,
  onSuccess, onBack, onExitDiscount,
}: PaymentModalProps) {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [showExitIntent, setShowExitIntent] = useState(false);
  const [exitShown, setExitShown] = useState(false);
  const [paymentDone, setPaymentDone] = useState(false);
  const timerRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  // Load Razorpay SDK
  useEffect(() => {
    const script = document.createElement('script');
    script.src = 'https://checkout.razorpay.com/v1/checkout.js';
    script.async = true;
    document.head.appendChild(script);
    return () => { document.head.removeChild(script); };
  }, []);

  // Exit-intent: idle timer (15s)
  useEffect(() => {
    if (exitShown || discountApplied) return;
    timerRef.current = setTimeout(() => {
      setShowExitIntent(true);
      setExitShown(true);
    }, 15000);
    return () => clearTimeout(timerRef.current);
  }, [exitShown, discountApplied]);

  // Exit-intent: mouse leave top of viewport
  useEffect(() => {
    if (exitShown || discountApplied) return;
    const handleMouseLeave = (e: MouseEvent) => {
      if (e.clientY <= 5) {
        setShowExitIntent(true);
        setExitShown(true);
        clearTimeout(timerRef.current);
      }
    };
    document.addEventListener('mouseleave', handleMouseLeave);
    return () => document.removeEventListener('mouseleave', handleMouseLeave);
  }, [exitShown, discountApplied]);

  const saveInvitation = async (): Promise<string> => {
    const res = await fetch('/api/invitations', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ templateId, data: invitationData }),
    });
    if (!res.ok) throw new Error('Failed to save invitation');
    const { slug } = await res.json();
    return slug as string;
  };

  const handlePay = async () => {
    setLoading(true);
    setError('');
    try {
      // 1. Create Razorpay order
      const orderRes = await fetch('/api/payments/razorpay/order', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ amountInr: effectivePrice }),
      });
      if (!orderRes.ok) throw new Error('Failed to create order');
      const { order } = await orderRes.json();

      const key = process.env.NEXT_PUBLIC_RAZORPAY_KEY_ID;
      if (!key) throw new Error('Razorpay key not configured');

      // 2. Open Razorpay checkout
      const rzp = new window.Razorpay({
        key,
        amount: order.amount,
        currency: order.currency,
        name: 'InviteHub.in',
        description: `${plan.name} Plan`,
        order_id: order.id,
        prefill: { name: userName, email: userEmail },
        theme: { color: '#c9a84c' },
        handler: async (response: RazorpayResponse) => {
          try {
            // 3. Verify payment server-side
            const verifyRes = await fetch('/api/payments/verify', {
              method: 'POST',
              headers: { 'Content-Type': 'application/json' },
              body: JSON.stringify({
                razorpay_order_id: response.razorpay_order_id,
                razorpay_payment_id: response.razorpay_payment_id,
                razorpay_signature: response.razorpay_signature,
                planType: plan.id,
                amountPaid: effectivePrice,
                userEmail,
              }),
            });
            if (!verifyRes.ok) throw new Error('Payment verification failed');

            // 4. Save invitation + get slug
            const slug = await saveInvitation();
            setPaymentDone(true);

            setTimeout(() => {
              if (plan.id === 'digital-suite') {
                onSuccess(slug);
              } else {
                onSuccess();
              }
            }, 1200);
          } catch (err) {
            setError(err instanceof Error ? err.message : 'Payment verification failed');
          } finally {
            setLoading(false);
          }
        },
        modal: {
          ondismiss: () => {
            setLoading(false);
            if (!exitShown && !discountApplied) {
              setShowExitIntent(true);
              setExitShown(true);
            }
          },
        },
      });
      rzp.open();
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Payment failed. Please try again.');
      setLoading(false);
    }
  };

  const handleAcceptDiscount = () => {
    setShowExitIntent(false);
    onExitDiscount();
  };

  const cardStyle = {
    background: 'linear-gradient(145deg, #0f0c0a 0%, #1a1208 100%)',
    border: '1px solid rgba(201,168,76,0.2)',
  };

  if (paymentDone) {
    return (
      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        className="w-full max-w-sm rounded-3xl overflow-hidden shadow-2xl text-center"
        style={cardStyle}
      >
        <div className="px-8 py-12">
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ type: 'spring', stiffness: 260, damping: 20, delay: 0.1 }}
          >
            <CheckCircle2 size={64} className="mx-auto mb-6" style={{ color: '#c9a84c' }} />
          </motion.div>
          <h2 className="text-white font-black text-2xl mb-2">Payment Successful! 🎉</h2>
          <p className="text-white/50 text-sm">Your invitation is ready.</p>
        </div>
      </motion.div>
    );
  }

  return (
    <>
      <motion.div
        initial={{ opacity: 0, scale: 0.92, y: 24 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        exit={{ opacity: 0, scale: 0.92 }}
        transition={{ duration: 0.3 }}
        className="w-full max-w-md rounded-3xl overflow-hidden shadow-2xl"
        style={cardStyle}
      >
        {/* Header */}
        <div className="px-6 pt-6 pb-5 border-b border-white/5">
          <button onClick={onBack} className="flex items-center gap-2 text-white/40 hover:text-white/70 transition-colors text-sm mb-5">
            <ArrowLeft size={16} /> Change plan
          </button>
          <h2 className="text-white font-bold text-xl mb-1">Complete Payment</h2>
          <p className="text-white/40 text-sm">Secure checkout · Instant delivery</p>
        </div>

        {/* Order Summary */}
        <div className="px-6 py-5 space-y-3">
          <div className="rounded-2xl p-4 space-y-2"
            style={{ background: 'rgba(255,255,255,0.04)', border: '1px solid rgba(255,255,255,0.08)' }}>
            <p className="text-white/40 text-xs uppercase tracking-widest mb-3">Order Summary</p>

            <div className="flex justify-between items-center">
              <span className="text-white text-sm font-medium">{plan.name} Plan</span>
              <span className="text-white/60 text-sm">₹{plan.price}</span>
            </div>

            {discountApplied && (
              <div className="flex justify-between items-center">
                <span className="text-green-400 text-sm">Exit Offer (20% off)</span>
                <span className="text-green-400 text-sm">-₹{plan.price - effectivePrice}</span>
              </div>
            )}

            <div className="border-t border-white/10 pt-2 flex justify-between items-center">
              <span className="text-white font-bold">Total</span>
              <span className="text-[#c9a84c] font-black text-xl">₹{effectivePrice}</span>
            </div>
          </div>

          {/* What you get */}
          <div className="rounded-2xl p-4"
            style={{ background: 'rgba(201,168,76,0.06)', border: '1px solid rgba(201,168,76,0.15)' }}>
            <p className="text-[#c9a84c] text-xs font-semibold uppercase tracking-wider mb-2">You&apos;ll get</p>
            <div className="flex flex-wrap gap-2">
              {plan.id !== 'digital-suite'
                ? <span className="flex items-center gap-1 text-white/60 text-xs"><Download size={11} /> HD Download (No Watermark)</span>
                : null}
              {plan.id === 'print-ready' || plan.id === 'digital-suite'
                ? <span className="flex items-center gap-1 text-white/60 text-xs"><Download size={11} /> Print-Quality PDF</span>
                : null}
              {plan.id === 'digital-suite'
                ? <span className="flex items-center gap-1 text-white/60 text-xs"><Share2 size={11} /> Ad-Free Shareable Link + RSVP</span>
                : null}
            </div>
          </div>

          {error && (
            <p className="text-red-400 text-sm text-center px-2">{error}</p>
          )}

          {/* Pay button */}
          <motion.button
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            onClick={handlePay}
            disabled={loading}
            className="w-full py-4 rounded-2xl font-black text-[#1a0e00] text-base flex items-center justify-center gap-2 transition-all disabled:opacity-60"
            style={{ background: 'linear-gradient(135deg, #c9a84c 0%, #f0d080 100%)', boxShadow: '0 8px 30px rgba(201,168,76,0.4)' }}
          >
            {loading
              ? <><Loader2 size={18} className="animate-spin" /> Processing...</>
              : <><ShieldCheck size={18} /> Pay ₹{effectivePrice} Securely</>
            }
          </motion.button>
        </div>

        <div className="px-6 pb-6 text-center">
          <p className="text-white/20 text-xs">🔒 Powered by Razorpay · 256-bit SSL encryption</p>
        </div>
      </motion.div>

      {/* Exit-intent overlay */}
      <AnimatePresence>
        {showExitIntent && (
          <ExitIntentModal
            originalPrice={plan.price}
            discountedPrice={Math.round(plan.price * 0.8)}
            onAccept={handleAcceptDiscount}
            onDismiss={() => setShowExitIntent(false)}
          />
        )}
      </AnimatePresence>
    </>
  );
}
