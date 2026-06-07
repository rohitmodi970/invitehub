'use client';

import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';

interface ShareButtonsProps {
  brideName: string;
  groomName: string;
  slug: string;
}

export function ShareButtons({ brideName, groomName, slug }: ShareButtonsProps) {
  const [currentUrl, setCurrentUrl] = useState('');
  const [copied, setCopied] = useState(false);

  useEffect(() => {
    setCurrentUrl(`${window.location.origin}/i/${slug}`);
  }, [slug]);

  const shareText = `You're invited to our wedding ❤️\n\n${brideName} weds ${groomName}\n\nView our invitation:\n${currentUrl}`;

  const handleWhatsAppShare = () => {
    window.open(`https://wa.me/?text=${encodeURIComponent(shareText)}`, '_blank');
  };

  const handleCopyLink = async () => {
    await navigator.clipboard.writeText(currentUrl);
    setCopied(true);
    setTimeout(() => setCopied(false), 2500);
  };

  const glassCard = {
    background: 'rgba(255,255,255,0.05)',
    backdropFilter: 'blur(20px)',
    border: '1px solid rgba(255,255,255,0.10)',
    boxShadow: '0 20px 60px rgba(0,0,0,0.3)',
  } as React.CSSProperties;

  return (
    <div className="w-full max-w-lg mx-auto">
      <div className="rounded-3xl p-7 sm:p-8" style={glassCard}>
        <h3 className="text-xl font-bold text-white text-center mb-1">Share with loved ones</h3>
        <p className="text-white/40 text-sm text-center mb-7">Let them know they&apos;re invited</p>

        {/* URL Preview pill */}
        <div
          className="flex items-center gap-3 rounded-2xl px-4 py-3 mb-6"
          style={{ background: 'rgba(255,255,255,0.07)', border: '1px solid rgba(255,255,255,0.10)' }}
        >
          <div className="w-2 h-2 rounded-full bg-green-400 flex-shrink-0 animate-pulse" />
          <span className="text-white/50 text-xs truncate flex-1 font-mono">
            {currentUrl || `invitehub.in/i/${slug}`}
          </span>
        </div>

        {/* Buttons */}
        <div className="grid grid-cols-2 gap-3 mb-4">
          {/* WhatsApp */}
          <motion.button
            onClick={handleWhatsAppShare}
            whileHover={{ scale: 1.03 }}
            whileTap={{ scale: 0.97 }}
            className="flex items-center justify-center gap-2.5 py-4 rounded-2xl font-semibold text-sm transition-all"
            style={{
              background: 'linear-gradient(135deg, #25D366 0%, #128C7E 100%)',
              color: 'white',
              boxShadow: '0 8px 24px rgba(37,211,102,0.35)',
            }}
          >
            <svg className="w-5 h-5 flex-shrink-0" fill="currentColor" viewBox="0 0 24 24">
              <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51a12.8 12.8 0 0 0-.57-.01c-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 0 1-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 0 1-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 0 1 2.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0 0 12.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 0 0 5.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 0 0-3.48-8.413Z" />
            </svg>
            WhatsApp
          </motion.button>

          {/* Copy Link */}
          <motion.button
            onClick={handleCopyLink}
            whileHover={{ scale: 1.03 }}
            whileTap={{ scale: 0.97 }}
            className="flex items-center justify-center gap-2.5 py-4 rounded-2xl font-semibold text-sm transition-all"
            style={{
              background: copied
                ? 'linear-gradient(135deg, rgba(201,168,76,0.3) 0%, rgba(201,168,76,0.15) 100%)'
                : 'rgba(255,255,255,0.08)',
              border: `1px solid ${copied ? 'rgba(201,168,76,0.6)' : 'rgba(255,255,255,0.12)'}`,
              color: copied ? '#c9a84c' : 'rgba(255,255,255,0.7)',
              boxShadow: copied ? '0 8px 24px rgba(201,168,76,0.2)' : 'none',
            }}
          >
            {copied ? (
              <>
                <svg className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                </svg>
                Copied!
              </>
            ) : (
              <>
                <svg className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round"
                    d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z" />
                </svg>
                Copy Link
              </>
            )}
          </motion.button>
        </div>

        <p className="text-center text-white/20 text-xs">
          Share this link so guests can view, RSVP &amp; get directions
        </p>
      </div>
    </div>
  );
}
