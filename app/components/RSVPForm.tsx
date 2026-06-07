'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

type AttendanceValue = 'yes' | 'no' | '';

export function RSVPForm() {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [attendance, setAttendance] = useState<AttendanceValue>('');
  const [guests, setGuests] = useState('1');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setTimeout(() => {
      setIsSubmitting(false);
      setSubmitted(true);
    }, 1500);
  };

  const glassCard = {
    background: 'rgba(255,255,255,0.05)',
    backdropFilter: 'blur(20px)',
    border: '1px solid rgba(255,255,255,0.10)',
    boxShadow: '0 20px 60px rgba(0,0,0,0.3)',
  } as React.CSSProperties;

  const inputStyle = {
    background: 'rgba(255,255,255,0.07)',
    border: '1px solid rgba(255,255,255,0.12)',
    color: 'white',
    borderRadius: '14px',
    padding: '14px 16px',
    width: '100%',
    outline: 'none',
    fontSize: '14px',
    transition: 'border-color 0.2s',
  } as React.CSSProperties;

  return (
    <div className="w-full max-w-lg mx-auto">
      <AnimatePresence mode="wait">
        {submitted ? (
          <motion.div
            key="success"
            initial={{ opacity: 0, scale: 0.9, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.9 }}
            transition={{ duration: 0.4, ease: 'easeOut' as const }}
            className="rounded-3xl p-10 text-center"
            style={glassCard}
          >
            <motion.div
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ delay: 0.2, type: 'spring' as const, stiffness: 200, damping: 15 }}
              className="w-20 h-20 rounded-full flex items-center justify-center mx-auto mb-6 text-4xl"
              style={{ background: 'rgba(201,168,76,0.2)', border: '2px solid rgba(201,168,76,0.5)' }}
            >
              ✓
            </motion.div>
            <h3 className="text-2xl font-bold text-white mb-2">You&apos;re on the list!</h3>
            <p className="text-white/50 text-sm">Thank you. We&apos;ll be in touch with more details.</p>
          </motion.div>
        ) : (
          <motion.div
            key="form"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="rounded-3xl p-7 sm:p-8"
            style={glassCard}
          >
            <h3 className="text-2xl font-bold text-white mb-1 text-center">Will you join us?</h3>
            <p className="text-white/40 text-sm text-center mb-8">Please let us know before the big day</p>

            <form onSubmit={handleSubmit} className="space-y-5">
              {/* Name */}
              <div>
                <label className="block text-xs text-white/40 tracking-widest uppercase mb-2">Full Name</label>
                <input
                  type="text"
                  required
                  placeholder="Your full name"
                  style={inputStyle}
                  onFocus={e => (e.target.style.borderColor = 'rgba(201,168,76,0.6)')}
                  onBlur={e => (e.target.style.borderColor = 'rgba(255,255,255,0.12)')}
                />
              </div>

              {/* Attendance toggle */}
              <div>
                <label className="block text-xs text-white/40 tracking-widest uppercase mb-3">Your Answer</label>
                <div className="grid grid-cols-2 gap-3">
                  {([
                    { value: 'yes', label: '🥂 Joyfully Accept', color: '#c9a84c' },
                    { value: 'no', label: '😔 Regretfully Decline', color: '#ef4444' },
                  ] as const).map(opt => (
                    <button
                      key={opt.value}
                      type="button"
                      onClick={() => setAttendance(opt.value)}
                      className="py-3 px-3 rounded-2xl text-sm font-medium transition-all duration-200 text-center"
                      style={{
                        background: attendance === opt.value
                          ? `rgba(${opt.value === 'yes' ? '201,168,76' : '239,68,68'},0.2)`
                          : 'rgba(255,255,255,0.05)',
                        border: `1px solid ${attendance === opt.value
                          ? (opt.value === 'yes' ? 'rgba(201,168,76,0.7)' : 'rgba(239,68,68,0.7)')
                          : 'rgba(255,255,255,0.1)'}`,
                        color: attendance === opt.value ? opt.color : 'rgba(255,255,255,0.5)',
                        transform: attendance === opt.value ? 'scale(1.02)' : 'scale(1)',
                      }}
                    >
                      {opt.label}
                    </button>
                  ))}
                </div>
                {/* Hidden required radio for form validation */}
                <input type="text" required readOnly value={attendance} className="sr-only" tabIndex={-1} aria-hidden />
              </div>

              {/* Guests */}
              <div>
                <label className="block text-xs text-white/40 tracking-widest uppercase mb-2">Guests Attending</label>
                <div className="flex gap-2">
                  {['1', '2', '3', '4+'].map(n => (
                    <button
                      key={n}
                      type="button"
                      onClick={() => setGuests(n)}
                      className="flex-1 py-3 rounded-2xl text-sm font-semibold transition-all duration-200"
                      style={{
                        background: guests === n ? 'rgba(201,168,76,0.2)' : 'rgba(255,255,255,0.05)',
                        border: `1px solid ${guests === n ? 'rgba(201,168,76,0.7)' : 'rgba(255,255,255,0.1)'}`,
                        color: guests === n ? '#c9a84c' : 'rgba(255,255,255,0.4)',
                      }}
                    >
                      {n}
                    </button>
                  ))}
                </div>
              </div>

              {/* Message */}
              <div>
                <label className="block text-xs text-white/40 tracking-widest uppercase mb-2">
                  Wishes for the Couple <span className="normal-case">(optional)</span>
                </label>
                <textarea
                  rows={3}
                  placeholder="Write your heartfelt wishes..."
                  style={{ ...inputStyle, resize: 'none' } as React.CSSProperties}
                  onFocus={e => (e.target.style.borderColor = 'rgba(201,168,76,0.6)')}
                  onBlur={e => (e.target.style.borderColor = 'rgba(255,255,255,0.12)')}
                />
              </div>

              {/* Submit */}
              <button
                type="submit"
                disabled={isSubmitting || !attendance}
                className="w-full py-4 rounded-2xl font-bold text-base transition-all duration-300 flex items-center justify-center gap-2 hover:scale-[1.01] active:scale-[0.99]"
                style={{
                  background: 'linear-gradient(135deg, #c9a84c 0%, #f0d080 100%)',
                  color: '#1a0e00',
                  opacity: isSubmitting || !attendance ? 0.5 : 1,
                  cursor: isSubmitting || !attendance ? 'not-allowed' : 'pointer',
                  boxShadow: '0 8px 30px rgba(201,168,76,0.4)',
                }}
              >
                {isSubmitting ? (
                  <div className="w-5 h-5 border-2 border-[#1a0e00] border-t-transparent rounded-full animate-spin" />
                ) : (
                  <>💌 Send RSVP</>
                )}
              </button>
            </form>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
