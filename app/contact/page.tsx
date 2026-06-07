'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Mail, MessageSquare, Send, CheckCircle2, Star, HeartHandshake } from 'lucide-react';
import { Footer } from '@/app/components/Footer';

const reasons = [
  'General Feedback',
  'Bug Report',
  'Feature Request',
  'Template Request',
  'Business Inquiry',
  'Other',
];

export default function ContactPage() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [reason, setReason] = useState(reasons[0]);
  const [message, setMessage] = useState('');
  const [rating, setRating] = useState(0);
  const [submitted, setSubmitted] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    // In a real implementation this would POST to an API
    await new Promise(r => setTimeout(r, 1500));
    setIsSubmitting(false);
    setSubmitted(true);
  };

  const inputClass =
    'w-full px-4 py-3 rounded-xl border border-white/10 bg-white/5 text-white placeholder:text-white/25 focus:outline-none focus:border-rose-400/60 focus:ring-2 focus:ring-rose-400/20 transition-all text-sm';

  return (
    <div className="min-h-screen flex flex-col" style={{ background: 'linear-gradient(135deg, #0f0c29 0%, #302b63 50%, #1a0a0a 100%)' }}>
      {/* Ambient blobs */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none">
        <div className="absolute -top-40 -left-40 w-96 h-96 rounded-full opacity-20" style={{ background: 'radial-gradient(circle, #c9a84c 0%, transparent 70%)' }} />
        <div className="absolute -bottom-20 -right-20 w-80 h-80 rounded-full opacity-15" style={{ background: 'radial-gradient(circle, #e11d48 0%, transparent 70%)' }} />
      </div>

      <div className="relative z-10 flex-1 max-w-3xl mx-auto w-full px-4 sm:px-6 py-16">
        {/* Header */}
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="text-center mb-12">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/5 border border-white/10 text-white/60 text-xs mb-6 tracking-widest uppercase">
            <HeartHandshake size={14} className="text-rose-400" />
            We love hearing from you
          </div>
          <h1 className="text-4xl sm:text-5xl font-bold text-white mb-4 tracking-tight">
            Get in Touch
          </h1>
          <p className="text-white/50 text-lg max-w-md mx-auto">
            Share your feedback, report a bug, or just say hello. We read every message.
          </p>
          <a
            href="mailto:invitehub001@gmail.com"
            className="inline-flex items-center gap-2 mt-4 text-amber-400 hover:text-amber-300 transition-colors text-sm font-medium"
          >
            <Mail size={15} />
            invitehub001@gmail.com
          </a>
        </motion.div>

        {/* Card */}
        <AnimatePresence mode="wait">
          {submitted ? (
            <motion.div
              key="success"
              initial={{ opacity: 0, scale: 0.9, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0 }}
              className="rounded-3xl p-10 text-center"
              style={{ background: 'rgba(255,255,255,0.05)', border: '1px solid rgba(255,255,255,0.10)', backdropFilter: 'blur(20px)' }}
            >
              <motion.div
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ delay: 0.2, type: 'spring', stiffness: 200 }}
                className="w-20 h-20 rounded-full flex items-center justify-center mx-auto mb-6 text-4xl"
                style={{ background: 'rgba(201,168,76,0.15)', border: '2px solid rgba(201,168,76,0.4)' }}
              >
                <CheckCircle2 size={40} className="text-amber-400" />
              </motion.div>
              <h2 className="text-2xl font-bold text-white mb-3">Message Sent! 🎉</h2>
              <p className="text-white/50">
                Thank you, <span className="text-white">{name}</span>! We&apos;ll get back to you at{' '}
                <span className="text-amber-400">{email}</span> as soon as possible.
              </p>
            </motion.div>
          ) : (
            <motion.form
              key="form"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              onSubmit={handleSubmit}
              className="rounded-3xl p-7 sm:p-8 space-y-5"
              style={{ background: 'rgba(255,255,255,0.04)', border: '1px solid rgba(255,255,255,0.09)', backdropFilter: 'blur(20px)' }}
            >
              {/* Name + Email */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="text-xs text-white/40 uppercase tracking-widest block mb-1.5">Your Name</label>
                  <input
                    required
                    value={name}
                    onChange={e => setName(e.target.value)}
                    placeholder="Priya Sharma"
                    className={inputClass}
                  />
                </div>
                <div>
                  <label className="text-xs text-white/40 uppercase tracking-widest block mb-1.5">Email Address</label>
                  <input
                    required
                    type="email"
                    value={email}
                    onChange={e => setEmail(e.target.value)}
                    placeholder="priya@example.com"
                    className={inputClass}
                  />
                </div>
              </div>

              {/* Reason */}
              <div>
                <label className="text-xs text-white/40 uppercase tracking-widest block mb-1.5">Reason</label>
                <div className="flex flex-wrap gap-2">
                  {reasons.map(r => (
                    <button
                      key={r}
                      type="button"
                      onClick={() => setReason(r)}
                      className={`px-3 py-1.5 rounded-full text-xs font-medium transition-all ${
                        reason === r
                          ? 'bg-rose-500 text-white border border-rose-400'
                          : 'bg-white/5 text-white/50 border border-white/10 hover:border-white/25 hover:text-white/80'
                      }`}
                    >
                      {r}
                    </button>
                  ))}
                </div>
              </div>

              {/* Experience Rating */}
              <div>
                <label className="text-xs text-white/40 uppercase tracking-widest block mb-2">How is your experience? (Optional)</label>
                <div className="flex items-center gap-2">
                  {[1, 2, 3, 4, 5].map(star => (
                    <button
                      key={star}
                      type="button"
                      onClick={() => setRating(star)}
                      className="transition-transform hover:scale-110 active:scale-95"
                    >
                      <Star
                        size={26}
                        className={star <= rating ? 'text-amber-400 fill-amber-400' : 'text-white/20'}
                      />
                    </button>
                  ))}
                  {rating > 0 && (
                    <span className="text-xs text-white/40 ml-2">
                      {['', 'Poor', 'Fair', 'Good', 'Great', 'Excellent!'][rating]}
                    </span>
                  )}
                </div>
              </div>

              {/* Message */}
              <div>
                <label className="text-xs text-white/40 uppercase tracking-widest block mb-1.5">
                  <MessageSquare size={11} className="inline mr-1" />
                  Message
                </label>
                <textarea
                  required
                  value={message}
                  onChange={e => setMessage(e.target.value)}
                  rows={4}
                  placeholder="Tell us what you think, or describe the issue you're facing..."
                  className={`${inputClass} resize-none`}
                />
              </div>

              {/* Submit */}
              <button
                type="submit"
                disabled={isSubmitting}
                className="w-full py-3.5 rounded-2xl font-bold text-sm flex items-center justify-center gap-2 transition-all active:scale-[0.98] disabled:opacity-60"
                style={{
                  background: 'linear-gradient(135deg, #e11d48 0%, #c9a84c 100%)',
                  boxShadow: '0 8px 30px rgba(225,29,72,0.3)',
                }}
              >
                {isSubmitting
                  ? <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                  : <Send size={16} />
                }
                {isSubmitting ? 'Sending...' : 'Send Message'}
              </button>
            </motion.form>
          )}
        </AnimatePresence>
      </div>

      <Footer />
    </div>
  );
}
