'use client';

import { useState, useCallback, useEffect } from 'react';
import { PricingModal } from './PricingModal';
import { AuthModal } from './AuthModal';
import { PaymentModal } from './PaymentModal';
import type { EventData } from '@/lib/events/event-data';

export type PlanType = 'basic' | 'print-ready' | 'digital-suite';

export interface Plan {
  id: PlanType;
  name: string;
  price: number;
  originalPrice?: number;
  badge?: string;
  description: string;
  features: string[];
  highlight?: boolean;
}

export const PLANS: Plan[] = [
  {
    id: 'basic',
    name: 'Basic',
    price: 49,
    description: 'Perfect for WhatsApp & social sharing',
    features: ['High-res JPG/PNG download', 'No watermark', 'Instant download'],
  },
  {
    id: 'print-ready',
    name: 'Print-Ready',
    price: 89,
    description: 'Get digital + print-quality files',
    features: ['High-res JPG/PNG', 'Print-quality PDF', 'No watermark', 'Instant download'],
    highlight: true,
    badge: 'Most Popular',
  },
  {
    id: 'digital-suite',
    name: 'Digital Suite',
    price: 99,
    description: 'Complete digital wedding suite',
    features: ['JPG + PDF downloads', 'Ad-free shareable link', 'RSVP tracking', 'Guest analytics', 'No watermark'],
  },
];

type Stage = 'pricing' | 'auth' | 'payment' | 'success';

interface CheckoutFlowProps {
  templateId: string;
  invitationData: Partial<EventData>;
  onClose: () => void;
  /** Called after successful payment with slug (for digital-suite redirect) */
  onSuccess: (plan: PlanType, slug?: string) => void;
}

export function CheckoutFlow({ templateId, invitationData, onClose, onSuccess }: CheckoutFlowProps) {
  const [stage, setStage] = useState<Stage>('pricing');
  const [selectedPlan, setSelectedPlan] = useState<Plan | null>(null);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [userEmail, setUserEmail] = useState('');
  const [userName, setUserName] = useState('');
  const [discountApplied, setDiscountApplied] = useState(false);

  useEffect(() => {
    fetch('/api/auth/me', { cache: 'no-store' })
      .then((res) => {
        if (res.ok) return res.json();
        throw new Error('Not authenticated');
      })
      .then((data) => {
        if (data.authenticated && data.email) {
          setIsAuthenticated(true);
          setUserEmail(data.email);
          const savedName = localStorage.getItem('invitehub-user-name');
          if (savedName) setUserName(savedName);
        }
      })
      .catch(() => {
        setIsAuthenticated(false);
      });
  }, []);

  const handlePlanSelected = useCallback((plan: Plan) => {
    setSelectedPlan(plan);
    if (isAuthenticated && userEmail && userName) {
      setStage('payment');
    } else {
      setStage('auth');
    }
  }, [isAuthenticated, userEmail, userName]);

  const handleAuthSuccess = useCallback((email: string, name: string) => {
    setIsAuthenticated(true);
    setUserEmail(email);
    setUserName(name);
    setStage('payment');
  }, []);

  const handlePaymentSuccess = useCallback((slug?: string) => {
    setStage('success');
    if (selectedPlan) onSuccess(selectedPlan.id, slug);
  }, [selectedPlan, onSuccess]);

  const handleExitDiscount = useCallback(() => {
    setDiscountApplied(true);
  }, []);

  const effectivePrice = selectedPlan
    ? discountApplied
      ? Math.round(selectedPlan.price * 0.8)
      : selectedPlan.price
    : 0;

  return (
    <div
      className="fixed inset-0 z-[100] flex items-center justify-center p-4"
      style={{ background: 'rgba(0,0,0,0.65)', backdropFilter: 'blur(8px)' }}
    >
      {stage === 'pricing' && (
        <PricingModal
          onSelectPlan={handlePlanSelected}
          onClose={onClose}
        />
      )}
      {stage === 'auth' && selectedPlan && (
        <AuthModal
          plan={selectedPlan}
          onSuccess={handleAuthSuccess}
          onBack={() => setStage('pricing')}
        />
      )}
      {stage === 'payment' && selectedPlan && (
        <PaymentModal
          plan={selectedPlan}
          effectivePrice={effectivePrice}
          discountApplied={discountApplied}
          templateId={templateId}
          invitationData={invitationData}
          userEmail={userEmail}
          userName={userName}
          onSuccess={handlePaymentSuccess}
          onBack={() => setStage('auth')}
          onExitDiscount={handleExitDiscount}
        />
      )}
    </div>
  );
}
