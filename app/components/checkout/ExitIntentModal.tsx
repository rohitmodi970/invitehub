'use client';

import { motion } from 'framer-motion';
import { X, Zap } from 'lucide-react';

interface ExitIntentModalProps {
  originalPrice: number;
  discountedPrice: number;
  onAccept: () => void;
  onDismiss: () => void;
}

export function ExitIntentModal({ originalPrice, discountedPrice, onAccept, onDismiss }: ExitIntentModalProps) {
  return (
    <div className="fixed inset-0 z-[200] flex items-center justify-center p-4"
      style={{ background: 'rgba(0,0,0,0.7)', backdropFilter: 'blur(8px)' }}>
      <motion.div
        initial={{ opacity: 0, scale: 0.85, y: -40 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        transition={{ type: 'spring', stiffness: 280, damping: 22 }}
        className="relative w-full max-w-sm rounded-3xl overflow-hidden text-center shadow-2xl"
        style={{ background: 'linear-gradient(145deg, #1a0e00 0%, #0d0600 100%)', border: '2px solid rgba(201,168,76,0.5)' }}
      >
        <button onClick={onDismiss} className="absolute top-4 right-4 text-white/30 hover:text-white/60 transition-colors">
          <X size={18} />
        </button>

        {/* Animated sparkle emoji */}
        <div className="px-8 pt-10 pb-6">
          <motion.div
            animate={{ rotate: [0, -10, 10, -10, 10, 0], scale: [1, 1.1, 1] }}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="text-5xl mb-4"
          >🎁</motion.div>

          <p className="text-[11px] uppercase tracking-[0.35em] text-[#c9a84c] font-bold mb-2">Wait! Special Offer</p>
          <h2 className="text-white font-black text-2xl leading-tight mb-3">
            Get 20% Off<br />Right Now!
          </h2>
          <p className="text-white/50 text-sm mb-6">
            This is a one-time offer — just for you. Don&apos;t miss it!
          </p>

          {/* Price comparison */}
          <div className="flex items-center justify-center gap-4 mb-6">
            <span className="text-white/30 line-through text-xl font-semibold">₹{originalPrice}</span>
            <span className="text-3xl font-black" style={{ color: '#c9a84c' }}>₹{discountedPrice}</span>
          </div>

          <motion.button
            whileHover={{ scale: 1.03 }}
            whileTap={{ scale: 0.97 }}
            onClick={onAccept}
            className="w-full py-4 rounded-2xl font-bold text-[#1a0e00] flex items-center justify-center gap-2 text-base mb-3"
            style={{ background: 'linear-gradient(135deg, #c9a84c 0%, #f0d080 100%)', boxShadow: '0 8px 30px rgba(201,168,76,0.45)' }}
          >
            <Zap size={18} /> Claim 20% Off Now!
          </motion.button>
          <button onClick={onDismiss} className="text-white/25 text-xs hover:text-white/40 transition-colors">
            No thanks, I&apos;ll pay full price
          </button>
        </div>
      </motion.div>
    </div>
  );
}
