'use client';

import { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ArrowLeft, Mail, ChevronRight, Loader2, CheckCircle2, User } from 'lucide-react';
import { Plan } from './CheckoutFlow';

type AuthStep = 'enter-email' | 'enter-otp' | 'enter-name';

interface AuthModalProps {
  plan: Plan;
  onSuccess: (email: string, name: string) => void;
  onBack: () => void;
}

export function AuthModal({ plan, onSuccess, onBack }: AuthModalProps) {
  const [step, setStep] = useState<AuthStep>('enter-email');
  const [email, setEmail] = useState('');
  const [otp, setOtp] = useState(['', '', '', '', '', '']);
  const [name, setName] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [resendCountdown, setResendCountdown] = useState(0);
  const [otpHash, setOtpHash] = useState('');
  const [otpExpiresAt, setOtpExpiresAt] = useState(0);
  const otpRefs = useRef<(HTMLInputElement | null)[]>([]);

  // Countdown timer for resend
  useEffect(() => {
    if (resendCountdown > 0) {
      const t = setTimeout(() => setResendCountdown((c) => c - 1), 1000);
      return () => clearTimeout(t);
    }
  }, [resendCountdown]);

  const handleSendOtp = async () => {
    if (!email.trim() || !email.includes('@')) {
      setError('Please enter a valid email address');
      return;
    }
    setLoading(true);
    setError('');
    try {
      const res = await fetch('/api/auth/send-otp', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email: email.trim().toLowerCase() }),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error || 'Failed to send OTP');
      
      setOtpHash(data.hash);
      setOtpExpiresAt(data.expiresAt);
      setStep('enter-otp');
      setResendCountdown(30);
    } catch (e: unknown) {
      setError(e instanceof Error ? e.message : 'Failed to send OTP. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const handleVerifyOtp = async () => {
    const otpCode = otp.join('');
    if (otpCode.length < 6) {
      setError('Please enter all 6 digits');
      return;
    }
    setLoading(true);
    setError('');
    try {
      const res = await fetch('/api/auth/verify-otp', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ 
          email: email.trim().toLowerCase(),
          otp: otpCode,
          hash: otpHash,
          expiresAt: otpExpiresAt
        }),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error || 'Invalid or expired code.');
      
      setStep('enter-name');
    } catch (e: unknown) {
      setError(e instanceof Error ? e.message : 'Invalid or expired code. Please try again.');
      setOtp(['', '', '', '', '', '']);
      otpRefs.current[0]?.focus();
    } finally {
      setLoading(false);
    }
  };

  const handleOtpInput = (index: number, value: string) => {
    // Handle paste
    if (value.length > 1) {
      const digits = value.replace(/\D/g, '').slice(0, 6).split('');
      const newOtp = [...otp];
      digits.forEach((d, i) => { if (index + i < 6) newOtp[index + i] = d; });
      setOtp(newOtp);
      otpRefs.current[Math.min(index + digits.length, 5)]?.focus();
      return;
    }
    const digit = value.replace(/\D/g, '');
    const newOtp = [...otp];
    newOtp[index] = digit;
    setOtp(newOtp);
    if (digit && index < 5) otpRefs.current[index + 1]?.focus();
  };

  const handleOtpKeyDown = (index: number, e: React.KeyboardEvent) => {
    if (e.key === 'Backspace' && !otp[index] && index > 0) {
      otpRefs.current[index - 1]?.focus();
    }
  };

  const handleNameSubmit = async () => {
    if (!name.trim()) { setError('Please enter your name'); return; }
    setLoading(true);
    try {
      localStorage.setItem('invitehub-user-name', name.trim());
      onSuccess(email.trim().toLowerCase(), name.trim());
    } finally {
      setLoading(false);
    }
  };

  const cardStyle = {
    background: 'linear-gradient(145deg, #0f0c0a 0%, #1a1208 100%)',
    border: '1px solid rgba(201,168,76,0.2)',
  };

  const inputStyle = {
    background: 'rgba(255,255,255,0.06)',
    border: '1.5px solid rgba(255,255,255,0.12)',
    color: 'white',
    borderRadius: '14px',
    padding: '14px 18px',
    width: '100%',
    outline: 'none',
    fontSize: '16px',
    transition: 'border-color 0.2s',
  } as React.CSSProperties;

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.92, y: 24 }}
      animate={{ opacity: 1, scale: 1, y: 0 }}
      exit={{ opacity: 0, scale: 0.92 }}
      transition={{ duration: 0.3 }}
      className="w-full max-w-md rounded-3xl overflow-hidden shadow-2xl"
      style={cardStyle}
    >
      {/* Plan reminder pill */}
      <div className="px-6 pt-6 pb-4">
        <button onClick={onBack} className="flex items-center gap-2 text-white/40 hover:text-white/70 transition-colors text-sm mb-5">
          <ArrowLeft size={16} /> Back to plans
        </button>

        <div className="flex items-center justify-between mb-6">
          <div>
            <p className="text-[11px] uppercase tracking-[0.3em] text-[#c9a84c] font-semibold mb-1">
              {step === 'enter-email' ? 'Quick Sign In' : step === 'enter-otp' ? 'Verify Your Email' : 'One Last Step'}
            </p>
            <h2 className="text-white font-bold text-xl">
              {step === 'enter-email' ? 'Enter your email' : step === 'enter-otp' ? 'Enter the code' : 'What\'s your name?'}
            </h2>
          </div>
          {/* Selected plan badge */}
          <div className="shrink-0 px-3 py-2 rounded-xl text-center"
            style={{ background: 'rgba(201,168,76,0.12)', border: '1px solid rgba(201,168,76,0.3)' }}>
            <p className="text-[#c9a84c] font-black text-lg leading-none">₹{plan.price}</p>
            <p className="text-white/40 text-[9px] uppercase tracking-wider mt-0.5">{plan.name}</p>
          </div>
        </div>

        {/* Step indicator dots */}
        <div className="flex gap-2 mb-6">
          {['enter-email', 'enter-otp', 'enter-name'].map((s) => (
            <div key={s} className="h-1.5 flex-1 rounded-full transition-all duration-300"
              style={{ background: s === step ? '#c9a84c' : step > s ? 'rgba(201,168,76,0.4)' : 'rgba(255,255,255,0.1)' }} />
          ))}
        </div>
      </div>

      {/* Form Content */}
      <div className="px-6 pb-6">
        <AnimatePresence mode="wait">
          {/* Step 1: Email */}
          {step === 'enter-email' && (
            <motion.div key="email" initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -20 }} className="space-y-4">
              <p className="text-white/40 text-sm">We&apos;ll send a one-time code to verify your identity. No password needed.</p>
              <div className="relative">
                <Mail size={16} className="absolute left-4 top-1/2 -translate-y-1/2 text-white/30" />
                <input
                  type="email"
                  value={email}
                  onChange={(e) => { setEmail(e.target.value); setError(''); }}
                  onKeyDown={(e) => e.key === 'Enter' && handleSendOtp()}
                  placeholder="your@email.com"
                  autoFocus
                  style={{ ...inputStyle, paddingLeft: '42px' }}
                  onFocus={(e) => (e.target.style.borderColor = 'rgba(201,168,76,0.6)')}
                  onBlur={(e) => (e.target.style.borderColor = 'rgba(255,255,255,0.12)')}
                />
              </div>
              {error && <p className="text-red-400 text-xs">{error}</p>}
              <button
                onClick={handleSendOtp}
                disabled={loading}
                className="w-full py-4 rounded-2xl font-bold text-[#1a0e00] flex items-center justify-center gap-2 transition-all active:scale-95 disabled:opacity-60"
                style={{ background: 'linear-gradient(135deg, #c9a84c 0%, #f0d080 100%)', boxShadow: '0 8px 30px rgba(201,168,76,0.35)' }}
              >
                {loading ? <Loader2 size={18} className="animate-spin" /> : <><ChevronRight size={18} /> Send OTP</>}
              </button>
              <p className="text-white/25 text-xs text-center">By continuing, you agree to our Terms & Privacy Policy</p>
            </motion.div>
          )}

          {/* Step 2: OTP */}
          {step === 'enter-otp' && (
            <motion.div key="otp" initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -20 }} className="space-y-5">
              <p className="text-white/40 text-sm">
                We sent a 6-digit code to <span className="text-[#c9a84c] font-medium">{email}</span>
              </p>
              {/* OTP boxes */}
              <div className="flex justify-between gap-2 max-w-[320px] mx-auto">
                {otp.map((digit, i) => (
                  <input
                    key={i}
                    ref={(el) => { otpRefs.current[i] = el; }}
                    type="text"
                    inputMode="numeric"
                    maxLength={6}
                    value={digit}
                    onChange={(e) => handleOtpInput(i, e.target.value)}
                    onKeyDown={(e) => handleOtpKeyDown(i, e)}
                    autoFocus={i === 0}
                    className="w-12 h-14 sm:w-14 sm:h-16 text-center text-xl sm:text-2xl font-bold rounded-xl sm:rounded-2xl transition-all"
                    style={{
                      background: digit ? 'rgba(201,168,76,0.15)' : 'rgba(255,255,255,0.06)',
                      border: digit ? '2px solid rgba(201,168,76,0.6)' : '2px solid rgba(255,255,255,0.1)',
                      color: 'white',
                      outline: 'none',
                    }}
                    onFocus={(e) => (e.target.style.borderColor = 'rgba(201,168,76,0.6)')}
                    onBlur={(e) => (e.target.style.borderColor = digit ? 'rgba(201,168,76,0.6)' : 'rgba(255,255,255,0.1)')}
                  />
                ))}
              </div>
              {error && <p className="text-red-400 text-xs">{error}</p>}
              <button
                onClick={handleVerifyOtp}
                disabled={loading || otp.join('').length < 6}
                className="w-full py-4 rounded-2xl font-bold text-[#1a0e00] flex items-center justify-center gap-2 transition-all active:scale-95 disabled:opacity-60"
                style={{ background: 'linear-gradient(135deg, #c9a84c 0%, #f0d080 100%)', boxShadow: '0 8px 30px rgba(201,168,76,0.35)' }}
              >
                {loading ? <Loader2 size={18} className="animate-spin" /> : <><CheckCircle2 size={18} /> Verify Code</>}
              </button>
              <div className="text-center">
                {resendCountdown > 0 ? (
                  <p className="text-white/30 text-sm">Resend in {resendCountdown}s</p>
                ) : (
                  <button onClick={handleSendOtp} disabled={loading}
                    className="text-[#c9a84c] text-sm hover:underline disabled:opacity-50">
                    Resend code
                  </button>
                )}
              </div>
            </motion.div>
          )}

          {/* Step 3: Name */}
          {step === 'enter-name' && (
            <motion.div key="name" initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -20 }} className="space-y-4">
              <p className="text-white/40 text-sm">Almost there! What should we call you?</p>
              <div className="relative">
                <User size={16} className="absolute left-4 top-1/2 -translate-y-1/2 text-white/30" />
                <input
                  type="text"
                  value={name}
                  onChange={(e) => { setName(e.target.value); setError(''); }}
                  onKeyDown={(e) => e.key === 'Enter' && handleNameSubmit()}
                  placeholder="Your full name"
                  autoFocus
                  style={{ ...inputStyle, paddingLeft: '42px' }}
                  onFocus={(e) => (e.target.style.borderColor = 'rgba(201,168,76,0.6)')}
                  onBlur={(e) => (e.target.style.borderColor = 'rgba(255,255,255,0.12)')}
                />
              </div>
              {error && <p className="text-red-400 text-xs">{error}</p>}
              <button
                onClick={handleNameSubmit}
                disabled={loading || !name.trim()}
                className="w-full py-4 rounded-2xl font-bold text-[#1a0e00] flex items-center justify-center gap-2 transition-all active:scale-95 disabled:opacity-60"
                style={{ background: 'linear-gradient(135deg, #c9a84c 0%, #f0d080 100%)', boxShadow: '0 8px 30px rgba(201,168,76,0.35)' }}
              >
                {loading ? <Loader2 size={18} className="animate-spin" /> : <>Continue to Payment →</>}
              </button>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </motion.div>
  );
}
