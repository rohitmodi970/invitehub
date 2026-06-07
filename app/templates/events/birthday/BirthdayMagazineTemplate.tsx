'use client';

import { motion } from 'framer-motion';
import { Playfair_Display, Lato } from 'next/font/google';
import type { TemplateProps } from '@/lib/invitations/types';

const playfair = Playfair_Display({ subsets: ['latin'], weight: ['400', '600', '700', '800'], style: ['normal', 'italic'] });
const lato = Lato({ subsets: ['latin'], weight: ['300', '400', '700'] });

const fadeUp = {
  hidden: { opacity: 0, y: 20 },
  show: { opacity: 1, y: 0, transition: { duration: 0.7, ease: 'easeOut' as const } },
};

export function BirthdayMagazineTemplate({ data, isPremium = false }: TemplateProps) {
  // Use uploaded photo or a fallback premium texture
  const bgImage = data.couplePhotoUrl || 'https://images.unsplash.com/photo-1514525253161-7a46d19cd819?q=80&w=1974&auto=format&fit=crop';

  return (
    <div className={`relative overflow-hidden w-full max-w-[420px] min-h-[640px] mx-auto flex flex-col shadow-2xl ${lato.className} bg-black`}>
      
      {/* ── Background Photo ── */}
      <motion.div 
        initial={{ scale: 1.05 }} 
        animate={{ scale: 1 }} 
        transition={{ duration: 1.5, ease: 'easeOut' }}
        className="absolute inset-0 z-0"
      >
        <img src={bgImage} alt="Background" className="w-full h-full object-cover" crossOrigin="anonymous" />
        {/* Subtle gradient to ensure text readability */}
        <div className="absolute inset-0 bg-gradient-to-b from-black/60 via-transparent to-black/80 pointer-events-none" />
      </motion.div>

      {/* ── Content ── */}
      <motion.div 
        className="relative z-10 flex-1 flex flex-col p-6"
        initial="hidden"
        animate="show"
        variants={{ show: { transition: { staggerChildren: 0.15 } } }}
      >
        {/* Header - Editorial Style */}
        <motion.div variants={fadeUp} className="text-center mt-4 mb-auto">
          <p className="text-[10px] uppercase tracking-[0.4em] text-white/80 mb-2">Exclusive Event</p>
          <div className="w-12 h-px bg-white/50 mx-auto mb-4" />
          <h1 className={`${playfair.className} text-6xl sm:text-7xl font-bold text-white uppercase tracking-tight leading-none drop-shadow-lg`}>
            {data.brideName || 'BIRTHDAY'}
          </h1>
          {data.groomName && (
            <h2 className={`${playfair.className} text-4xl sm:text-5xl font-bold text-white/90 uppercase tracking-tight leading-none mt-2`}>
              {data.groomName}
            </h2>
          )}
        </motion.div>

        {/* Glassmorphism Details Panel */}
        <motion.div variants={fadeUp} className="w-full mt-8">
          <div className="bg-white/10 backdrop-blur-md rounded-2xl p-5 border border-white/20 shadow-xl relative overflow-hidden">
            {/* Subtle gloss reflection */}
            <div className="absolute top-0 left-0 right-0 h-[1px] bg-gradient-to-r from-transparent via-white/40 to-transparent" />
            
            <div className="grid grid-cols-2 gap-4 mb-4">
              <div className="border-r border-white/20 pr-4">
                <p className="text-[9px] uppercase tracking-widest text-white/60 mb-1">When</p>
                <p className="text-sm font-bold text-white leading-snug">{data.weddingDate}</p>
                <p className="text-xs text-white/80 mt-0.5">{data.weddingTime}</p>
              </div>
              <div className="pl-2">
                <p className="text-[9px] uppercase tracking-widest text-white/60 mb-1">Where</p>
                <p className="text-sm font-bold text-white leading-snug truncate">{data.venueName}</p>
                <p className="text-xs text-white/80 mt-0.5 line-clamp-2">{data.venueAddress}</p>
              </div>
            </div>

            <div className="h-px bg-white/20 mb-4" />

            <div className="flex items-center justify-between">
              {data.rsvpDetails && (
                <p className="text-xs font-semibold text-white tracking-wide uppercase">
                  RSVP: {data.rsvpDetails}
                </p>
              )}
              {data.contactNumber && (
                <p className="text-xs text-white/80">
                  {data.contactNumber}
                </p>
              )}
            </div>
            
            {data.additionalMessage && (
              <p className={`${playfair.className} text-sm text-white/90 italic mt-4 text-center`}>
                "{data.additionalMessage}"
              </p>
            )}
          </div>
        </motion.div>
      </motion.div>

      {/* ═══════════════════════════════════════════════════════════════════
        WATERMARK SYSTEM — MANDATORY 
        ═══════════════════════════════════════════════════════════════════ 
      */}
      {!isPremium && (
        <>
          {/* LAYER 1: Full-Card Diagonal Tiled Overlay */}
          <div
            style={{
              position: 'absolute',
              inset: 0,
              zIndex: 50,
              pointerEvents: 'none',
              overflow: 'hidden',
              backgroundImage: `repeating-linear-gradient(
                -45deg,
                transparent,
                transparent 60px,
                rgba(0,0,0,0.04) 60px,
                rgba(0,0,0,0.04) 61px
              )`,
              display: 'grid',
              gridTemplateColumns: 'repeat(4, 1fr)',
              gap: '30px 20px',
              padding: '20px',
              width: '100%',
              height: '100%',
            }}
          >
            {Array.from({ length: 32 }).map((_, i) => (
              <span
                key={i}
                style={{
                  transform: 'rotate(-35deg)',
                  fontSize: '11px',
                  color: '#ffffff',
                  opacity: 0.15,
                  fontWeight: 'bold',
                  letterSpacing: '0.05em',
                  userSelect: 'none',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  whiteSpace: 'nowrap',
                }}
              >
                InviteHub.in
              </span>
            ))}
          </div>

          {/* LAYER 2: Bottom Strip Watermark */}
          <div
            style={{
              position: 'relative',
              marginTop: 'auto',
              width: '100%',
              padding: '10px 0',
              backgroundColor: 'rgba(0,0,0,0.8)',
              backdropFilter: 'blur(4px)',
              zIndex: 51,
              textAlign: 'center',
              borderTop: '1px solid rgba(255,255,255,0.1)'
            }}
          >
            <span
              style={{
                fontSize: '13px',
                fontWeight: 700,
                color: '#ffffff',
                letterSpacing: '0.03em',
                fontFamily: 'sans-serif',
              }}
            >
              🔒 Created with InviteHub.in — Upgrade to remove watermark
            </span>
          </div>
        </>
      )}
    </div>
  );
}
