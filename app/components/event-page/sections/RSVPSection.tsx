'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ScrollSection } from '../EventPageRenderer';
import { CheckCircle2, Loader2 } from 'lucide-react';
import type { EventData } from '@/lib/events/event-data';
import type { TemplateDesign } from '@/lib/templates/engine/types';

interface RSVPSectionProps {
  event: EventData;
  design: TemplateDesign;
  sectionIndex?: number;
}

type RSVPStatus = 'accepted' | 'declined' | 'maybe';
type FormStep = 'choice' | 'details' | 'success';

export default function RSVPSection({ event, design }: RSVPSectionProps) {
  const [step, setStep] = useState<FormStep>('choice');
  const [status, setStatus] = useState<RSVPStatus | null>(null);
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [guestCount, setGuestCount] = useState(1);
  const [message, setMessage] = useState('');
  const [dietary, setDietary] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleChoice = (s: RSVPStatus) => {
    setStatus(s);
    setStep('details');
  };

  const handleSubmit = async () => {
    if (!name.trim()) { setError('Please enter your name'); return; }
    setLoading(true);
    setError('');

    try {
      const res = await fetch(`/api/events/${event.id}/rsvp`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          name: name.trim(),
          email: email.trim() || null,
          phone: phone.trim() || null,
          status,
          guestCount,
          message: message.trim() || null,
          dietaryNotes: dietary.trim() || null,
        }),
      });
      if (!res.ok) throw new Error('Failed to submit RSVP');
      setStep('success');
    } catch {
      setError('Failed to submit RSVP. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const statusConfig = {
    accepted: { emoji: '🥂', label: "I'll be there!", color: '#22c55e' },
    maybe: { emoji: '🤔', label: "Maybe", color: '#f59e0b' },
    declined: { emoji: '😔', label: "Can't make it", color: '#ef4444' },
  };

  const inputStyle: React.CSSProperties = {
    width: '100%',
    padding: '12px 16px',
    borderRadius: '12px',
    background: 'rgba(255,255,255,0.05)',
    border: '1.5px solid var(--border-color)',
    color: 'var(--text-color)',
    outline: 'none',
    fontSize: '14px',
    fontFamily: 'var(--body-font)',
    transition: 'border-color 0.2s',
  };

  return (
    <ScrollSection className="w-full px-6 py-16" animation={design.entranceAnimation}>
      <div className="mx-auto" style={{ maxWidth: design.maxWidth }}>
        <div
          className="rounded-3xl p-6 sm:p-8"
          style={{
            background: 'var(--surface-color)',
            border: '1px solid var(--border-color)',
            borderRadius: design.borderRadius,
          }}
        >
          <AnimatePresence mode="wait">
            {/* Step 1: Choice */}
            {step === 'choice' && (
              <motion.div
                key="choice"
                initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
                className="text-center"
              >
                <span className="text-3xl block mb-2">✉️</span>
                <h3
                  className="text-xl font-bold mb-1"
                  style={{ fontFamily: 'var(--heading-font)', color: 'var(--text-color)' }}
                >
                  Will you join us?
                </h3>
                <p className="text-sm mb-6" style={{ color: 'var(--muted-text)' }}>
                  Let {event.primaryName} know if you can make it.
                </p>

                <div className="flex flex-col sm:flex-row gap-3">
                  {(Object.entries(statusConfig) as [RSVPStatus, typeof statusConfig[RSVPStatus]][]).map(([s, cfg]) => (
                    <motion.button
                      key={s}
                      whileHover={{ scale: 1.03 }}
                      whileTap={{ scale: 0.97 }}
                      onClick={() => handleChoice(s)}
                      className="flex-1 py-3.5 rounded-2xl font-semibold text-sm flex items-center justify-center gap-2 transition-all"
                      style={{
                        background: s === 'accepted'
                          ? `linear-gradient(135deg, var(--accent-color), var(--secondary-color))`
                          : 'rgba(255,255,255,0.05)',
                        border: `1.5px solid ${s === 'accepted' ? 'var(--accent-color)' : 'var(--border-color)'}`,
                        color: s === 'accepted' ? '#1a0e00' : 'var(--text-color)',
                        fontFamily: 'var(--body-font)',
                      }}
                    >
                      <span>{cfg.emoji}</span>
                      <span>{cfg.label}</span>
                    </motion.button>
                  ))}
                </div>
              </motion.div>
            )}

            {/* Step 2: Details */}
            {step === 'details' && status && (
              <motion.div
                key="details"
                initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -20 }}
                className="space-y-4"
              >
                <div className="flex items-center gap-3 mb-2">
                  <span className="text-2xl">{statusConfig[status].emoji}</span>
                  <div>
                    <h3
                      className="font-bold text-lg leading-tight"
                      style={{ fontFamily: 'var(--heading-font)', color: 'var(--text-color)' }}
                    >
                      {status === 'accepted' ? "Great! A few details:" : status === 'maybe' ? "We hope you can make it:" : "Sorry you can't make it:"}
                    </h3>
                    <button
                      className="text-xs underline"
                      style={{ color: 'var(--muted-text)' }}
                      onClick={() => setStep('choice')}
                    >
                      Change response
                    </button>
                  </div>
                </div>

                <input
                  style={inputStyle} placeholder="Your full name *" value={name}
                  onChange={e => { setName(e.target.value); setError(''); }}
                  onFocus={e => (e.target.style.borderColor = 'var(--accent-color)')}
                  onBlur={e => (e.target.style.borderColor = 'var(--border-color)')}
                />

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <input
                    style={inputStyle} placeholder="Email (optional)" type="email" value={email}
                    onChange={e => setEmail(e.target.value)}
                    onFocus={e => (e.target.style.borderColor = 'var(--accent-color)')}
                    onBlur={e => (e.target.style.borderColor = 'var(--border-color)')}
                  />
                  <input
                    style={inputStyle} placeholder="Phone (optional)" type="tel" value={phone}
                    onChange={e => setPhone(e.target.value)}
                    onFocus={e => (e.target.style.borderColor = 'var(--accent-color)')}
                    onBlur={e => (e.target.style.borderColor = 'var(--border-color)')}
                  />
                </div>

                {status === 'accepted' && (
                  <div>
                    <p className="text-xs mb-2" style={{ color: 'var(--muted-text)' }}>Number of guests (including yourself):</p>
                    <div className="flex gap-2">
                      {[1, 2, 3, 4].map(n => (
                        <button
                          key={n}
                          onClick={() => setGuestCount(n)}
                          className="w-10 h-10 rounded-xl text-sm font-bold transition-all"
                          style={{
                            background: guestCount === n ? 'var(--accent-color)' : 'rgba(255,255,255,0.05)',
                            color: guestCount === n ? '#1a0e00' : 'var(--text-color)',
                            border: `1.5px solid ${guestCount === n ? 'var(--accent-color)' : 'var(--border-color)'}`,
                          }}
                        >
                          {n}
                        </button>
                      ))}
                      <button
                        onClick={() => setGuestCount(5)}
                        className="px-3 h-10 rounded-xl text-sm font-bold transition-all"
                        style={{
                          background: guestCount >= 5 ? 'var(--accent-color)' : 'rgba(255,255,255,0.05)',
                          color: guestCount >= 5 ? '#1a0e00' : 'var(--text-color)',
                          border: `1.5px solid ${guestCount >= 5 ? 'var(--accent-color)' : 'var(--border-color)'}`,
                        }}
                      >
                        5+
                      </button>
                    </div>
                  </div>
                )}

                <input
                  style={inputStyle} placeholder="Dietary preferences (optional)" value={dietary}
                  onChange={e => setDietary(e.target.value)}
                  onFocus={e => (e.target.style.borderColor = 'var(--accent-color)')}
                  onBlur={e => (e.target.style.borderColor = 'var(--border-color)')}
                />

                <textarea
                  style={{ ...inputStyle, resize: 'none', height: '80px' }}
                  placeholder="Message for the host (optional)"
                  value={message}
                  onChange={e => setMessage(e.target.value)}
                  onFocus={e => (e.target.style.borderColor = 'var(--accent-color)')}
                  onBlur={e => (e.target.style.borderColor = 'var(--border-color)')}
                />

                {error && <p className="text-red-400 text-xs">{error}</p>}

                <motion.button
                  whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}
                  onClick={handleSubmit}
                  disabled={loading || !name.trim()}
                  className="w-full py-4 rounded-2xl font-bold flex items-center justify-center gap-2 transition-all disabled:opacity-60"
                  style={{
                    background: 'linear-gradient(135deg, var(--accent-color), var(--secondary-color))',
                    color: '#1a0e00',
                    fontFamily: 'var(--body-font)',
                  }}
                >
                  {loading ? <Loader2 size={18} className="animate-spin" /> : <>💌 Send RSVP</>}
                </motion.button>
              </motion.div>
            )}

            {/* Step 3: Success */}
            {step === 'success' && (
              <motion.div
                key="success"
                initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }}
                className="text-center py-4"
              >
                <motion.div
                  initial={{ scale: 0 }} animate={{ scale: 1 }}
                  transition={{ type: 'spring', stiffness: 200, damping: 12, delay: 0.1 }}
                >
                  <CheckCircle2 size={48} className="mx-auto mb-3" style={{ color: '#22c55e' }} />
                </motion.div>
                <h3
                  className="text-xl font-bold mb-2"
                  style={{ fontFamily: 'var(--heading-font)', color: 'var(--text-color)' }}
                >
                  {status === 'accepted' ? "You're on the list! 🎉" : "Response recorded!"}
                </h3>
                <p className="text-sm" style={{ color: 'var(--muted-text)', fontFamily: 'var(--body-font)' }}>
                  {status === 'accepted'
                    ? `We can't wait to see you at ${event.title}!`
                    : "Thank you for letting us know."}
                </p>
                {email && (
                  <p className="text-xs mt-2" style={{ color: 'var(--muted-text)', opacity: 0.6 }}>
                    A confirmation has been sent to {email}.
                  </p>
                )}
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>
    </ScrollSection>
  );
}
