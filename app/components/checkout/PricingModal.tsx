'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Check, Zap, Star } from 'lucide-react';
import { Plan, PLANS } from './CheckoutFlow';

interface PricingModalProps {
  onSelectPlan: (plan: Plan) => void;
  onClose: () => void;
}

export function PricingModal({ onSelectPlan, onClose }: PricingModalProps) {
  const [hoveredPlan, setHoveredPlan] = useState<string | null>(null);

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.92, y: 24 }}
      animate={{ opacity: 1, scale: 1, y: 0 }}
      exit={{ opacity: 0, scale: 0.92, y: 24 }}
      transition={{ duration: 0.35, ease: [0.25, 0.46, 0.45, 0.94] }}
      className="w-full max-w-2xl rounded-3xl overflow-hidden shadow-2xl"
      style={{ background: 'linear-gradient(145deg, #0f0c0a 0%, #1a1208 100%)', border: '1px solid rgba(201,168,76,0.2)' }}
    >
      {/* Header */}
      <div className="relative px-8 pt-8 pb-6">
        <button
          onClick={onClose}
          className="absolute top-5 right-5 p-2 rounded-full bg-white/5 hover:bg-white/10 text-white/50 hover:text-white transition-all"
        >
          <X size={18} />
        </button>
        <div className="flex items-center gap-3 mb-3">
          <div className="w-10 h-10 rounded-2xl flex items-center justify-center" style={{ background: 'linear-gradient(135deg, #c9a84c, #f0d080)' }}>
            <Zap size={18} className="text-[#1a0e00]" />
          </div>
          <div>
            <p className="text-[11px] uppercase tracking-[0.3em] text-[#c9a84c] font-semibold">Download Your Invitation</p>
            <h2 className="text-white font-bold text-xl leading-tight">Choose Your Plan</h2>
          </div>
        </div>
        <p className="text-white/40 text-sm">One-time payment · No subscription · Instant delivery</p>
      </div>

      {/* Plan Cards */}
      <div className="px-6 pb-8 grid grid-cols-1 sm:grid-cols-3 gap-4">
        {PLANS.map((plan, i) => {
          const isHighlighted = plan.highlight;
          const isHovered = hoveredPlan === plan.id;
          return (
            <motion.button
              key={plan.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.08 }}
              onClick={() => onSelectPlan(plan)}
              onMouseEnter={() => setHoveredPlan(plan.id)}
              onMouseLeave={() => setHoveredPlan(null)}
              className="relative flex flex-col text-left rounded-2xl p-5 transition-all duration-300 cursor-pointer"
              style={{
                background: isHighlighted
                  ? 'linear-gradient(145deg, rgba(201,168,76,0.18) 0%, rgba(201,168,76,0.06) 100%)'
                  : isHovered
                  ? 'rgba(255,255,255,0.07)'
                  : 'rgba(255,255,255,0.04)',
                border: isHighlighted
                  ? '1.5px solid rgba(201,168,76,0.55)'
                  : isHovered
                  ? '1.5px solid rgba(255,255,255,0.2)'
                  : '1.5px solid rgba(255,255,255,0.08)',
                transform: isHovered ? 'translateY(-3px)' : 'translateY(0)',
                boxShadow: isHighlighted ? '0 8px 32px rgba(201,168,76,0.15)' : 'none',
              }}
            >
              {/* Badge */}
              {plan.badge && (
                <span className="absolute -top-3 left-1/2 -translate-x-1/2 px-3 py-0.5 rounded-full text-[10px] font-bold uppercase tracking-wider flex items-center gap-1"
                  style={{ background: 'linear-gradient(90deg,#c9a84c,#f0d080)', color: '#1a0e00' }}>
                  <Star size={9} fill="#1a0e00" /> {plan.badge}
                </span>
              )}

              {/* Price */}
              <div className="mb-3">
                <span className="text-3xl font-black" style={{ color: isHighlighted ? '#c9a84c' : 'white' }}>
                  ₹{plan.price}
                </span>
              </div>

              {/* Name + Description */}
              <p className="font-bold text-white text-sm mb-1">{plan.name}</p>
              <p className="text-white/40 text-[11px] leading-relaxed mb-4">{plan.description}</p>

              {/* Features */}
              <ul className="space-y-1.5 flex-1">
                {plan.features.map((f) => (
                  <li key={f} className="flex items-start gap-2 text-[11px]">
                    <Check size={11} className="mt-0.5 shrink-0" style={{ color: isHighlighted ? '#c9a84c' : 'rgba(255,255,255,0.4)' }} />
                    <span className="text-white/60">{f}</span>
                  </li>
                ))}
              </ul>

              {/* CTA */}
              <div
                className="mt-5 w-full py-2.5 rounded-xl text-center text-sm font-bold transition-all"
                style={{
                  background: isHighlighted
                    ? 'linear-gradient(135deg, #c9a84c 0%, #f0d080 100%)'
                    : 'rgba(255,255,255,0.1)',
                  color: isHighlighted ? '#1a0e00' : 'white',
                }}
              >
                Select Plan
              </div>
            </motion.button>
          );
        })}
      </div>

      {/* Footer */}
      <div className="px-8 py-4 border-t border-white/5 text-center">
        <p className="text-white/20 text-xs">🔒 Secure payment via Razorpay · Your card details are never stored</p>
      </div>
    </motion.div>
  );
}
