'use client';

import { motion } from 'framer-motion';
import { Cinzel, Raleway } from 'next/font/google';

const cinzel = Cinzel({ subsets: ['latin'], weight: ['400', '600', '700', '900'] });
const raleway = Raleway({ subsets: ['latin'], weight: ['200', '300', '400', '500', '600'] });

export interface InvitationData {
  brideName: string; groomName: string; weddingDate: string; weddingTime: string;
  venueName: string; venueAddress: string; contactNumber?: string;
  additionalMessage?: string; couplePhotoUrl?: string; familyDetails?: string; rsvpDetails?: string;
}
export interface TemplateProps { data: InvitationData; isPremium?: boolean; }

const fade = (delay = 0) => ({
  hidden: { opacity: 0, y: 14 },
  show: { opacity: 1, y: 0, transition: { duration: 0.7, delay, ease: 'easeOut' as const } },
});
const scale = (delay = 0) => ({
  hidden: { opacity: 0, scale: 0.92 },
  show: { opacity: 1, scale: 1, transition: { duration: 0.6, delay, ease: 'easeOut' as const } },
});

// Corner ornament — Art Deco geometric
const CornerOrnament = ({ rotate = 0 }: { rotate?: number }) => (
  <svg width="48" height="48" viewBox="0 0 48 48" style={{ transform: `rotate(${rotate}deg)` }}
    className="absolute pointer-events-none">
    <path d="M0 0 L20 0 L20 2 L2 2 L2 20 L0 20 Z" fill="#c9a84c" opacity="0.8" />
    <path d="M0 0 L12 0 L12 1 L1 1 L1 12 L0 12 Z" fill="#c9a84c" opacity="0.5" />
    <circle cx="4" cy="4" r="2" fill="#c9a84c" opacity="0.6" />
  </svg>
);

// Silver/gold horizontal rule
const LuxDivider = ({ silver = false }: { silver?: boolean }) => (
  <div className="flex items-center justify-center w-full my-4">
    <div className="flex-1 h-px" style={{ background: silver ? 'linear-gradient(to right, transparent, rgba(192,192,210,0.6))' : 'linear-gradient(to right, transparent, rgba(201,168,76,0.6))' }} />
    <svg width="24" height="10" viewBox="0 0 24 10" className="mx-3">
      <polygon points="12,0 24,5 12,10 0,5" fill={silver ? 'rgba(192,192,210,0.7)' : 'rgba(201,168,76,0.8)'} />
    </svg>
    <div className="flex-1 h-px" style={{ background: silver ? 'linear-gradient(to left, transparent, rgba(192,192,210,0.6))' : 'linear-gradient(to left, transparent, rgba(201,168,76,0.6))' }} />
  </div>
);

export function LuxuryBlackTemplate({ data, isPremium = false }: TemplateProps) {
  return (
    <div className={`relative overflow-hidden w-full max-w-[420px] min-h-[640px] mx-auto flex flex-col shadow-2xl ${raleway.className}`}
      style={{ background: 'linear-gradient(160deg, #0a0a0f 0%, #12121c 50%, #0c0c14 100%)' }}>

      {/* Subtle texture overlay */}
      <div className="absolute inset-0 pointer-events-none" style={{
        backgroundImage: 'repeating-linear-gradient(0deg, transparent, transparent 39px, rgba(255,255,255,0.015) 40px), repeating-linear-gradient(90deg, transparent, transparent 39px, rgba(255,255,255,0.015) 40px)',
      }} />

      {/* Gold outer border */}
      <div className="absolute inset-3 pointer-events-none" style={{ border: '1px solid rgba(201,168,76,0.3)' }} />
      <div className="absolute inset-[13px] pointer-events-none" style={{ border: '0.5px solid rgba(201,168,76,0.15)' }} />

      {/* Corner ornaments */}
      <CornerOrnament rotate={0} />
      <div className="absolute top-0 right-0"><CornerOrnament rotate={90} /></div>
      <div className="absolute bottom-0 left-0"><CornerOrnament rotate={270} /></div>
      <div className="absolute bottom-0 right-0"><CornerOrnament rotate={180} /></div>

      {/* Top gold accent bar */}
      <div style={{ height: '3px', background: 'linear-gradient(to right, transparent, #c9a84c, #f0d878, #c9a84c, transparent)', flexShrink: 0 }} />

      <motion.div className="relative z-10 flex-1 flex flex-col items-center px-10 pt-12 pb-8 text-center"
        initial="hidden" animate="show" variants={{ show: { transition: { staggerChildren: 0.1 } } }}>

        {/* Label */}
        <motion.p variants={fade(0)} className={`${cinzel.className} text-[8px] tracking-[0.5em] uppercase mb-6`}
          style={{ color: 'rgba(201,168,76,0.8)' }}>
          Black Tie Wedding Invitation
        </motion.p>

        {/* Photo */}
        {data.couplePhotoUrl && (
          <motion.div variants={scale(0.05)} className="mb-6">
            <div className="w-24 h-24 rounded-full mx-auto overflow-hidden"
              style={{ border: '2px solid rgba(201,168,76,0.5)', boxShadow: '0 0 0 5px rgba(201,168,76,0.08), 0 8px 32px rgba(0,0,0,0.6)' }}>
              <img src={data.couplePhotoUrl} alt="" className="w-full h-full object-cover" crossOrigin="anonymous" />
            </div>
          </motion.div>
        )}

        {/* Names */}
        <motion.div variants={fade(0.1)} className="mb-2">
          <h1 className={`${cinzel.className} text-4xl font-light tracking-[0.08em]`}
            style={{ color: '#f0d878', textShadow: '0 0 30px rgba(201,168,76,0.4), 0 0 60px rgba(201,168,76,0.2)' }}>
            {data.brideName}
          </h1>
          <LuxDivider />
          <h1 className={`${cinzel.className} text-4xl font-light tracking-[0.08em]`}
            style={{ color: '#f0d878', textShadow: '0 0 30px rgba(201,168,76,0.4), 0 0 60px rgba(201,168,76,0.2)' }}>
            {data.groomName}
          </h1>
        </motion.div>

        {/* Divider */}
        <motion.div variants={fade(0.16)} className="my-5">
          <svg width="180" height="14" viewBox="0 0 180 14">
            <line x1="0" y1="7" x2="70" y2="7" stroke="rgba(201,168,76,0.4)" strokeWidth="0.8" />
            <polygon points="90,1 98,7 90,13 82,7" fill="rgba(201,168,76,0.6)" />
            <line x1="110" y1="7" x2="180" y2="7" stroke="rgba(201,168,76,0.4)" strokeWidth="0.8" />
          </svg>
        </motion.div>

        {/* Pre-text */}
        {data.familyDetails && (
          <motion.p variants={fade(0.18)} className="text-xs font-light mb-4 leading-relaxed"
            style={{ color: 'rgba(255,255,255,0.5)' }}>
            {data.familyDetails}
          </motion.p>
        )}

        {/* Details box */}
        <motion.div variants={scale(0.2)} className="w-full max-w-[300px] rounded-lg p-5 mb-5"
          style={{ background: 'rgba(255,255,255,0.03)', border: '1px solid rgba(201,168,76,0.2)', backdropFilter: 'blur(10px)' }}>
          <div className="flex flex-col gap-4 text-sm text-left">
            <div className="flex items-start gap-3">
              <div>
                <p className={`${cinzel.className} text-[9px] uppercase tracking-widest mb-1`} style={{ color: 'rgba(201,168,76,0.7)' }}>Date</p>
                <p className="font-light" style={{ color: 'rgba(255,255,255,0.85)' }}>{data.weddingDate}</p>
              </div>
              <div className="ml-6">
                <p className={`${cinzel.className} text-[9px] uppercase tracking-widest mb-1`} style={{ color: 'rgba(201,168,76,0.7)' }}>Time</p>
                <p className="font-light" style={{ color: 'rgba(255,255,255,0.85)' }}>{data.weddingTime}</p>
              </div>
            </div>
            <div style={{ borderTop: '0.5px solid rgba(201,168,76,0.2)', paddingTop: '12px' }}>
              <p className={`${cinzel.className} text-[9px] uppercase tracking-widest mb-1`} style={{ color: 'rgba(201,168,76,0.7)' }}>Venue</p>
              <p className="font-semibold tracking-wide" style={{ color: '#f0d878' }}>{data.venueName}</p>
              <p className="text-xs mt-1 font-light" style={{ color: 'rgba(255,255,255,0.5)' }}>{data.venueAddress}</p>
            </div>
          </div>
        </motion.div>

        {data.additionalMessage && (
          <motion.p variants={fade(0.26)} className="text-sm italic font-light mb-3"
            style={{ color: 'rgba(201,168,76,0.7)' }}>
            "{data.additionalMessage}"
          </motion.p>
        )}

        <div className="flex-1 min-h-4" />

        {data.rsvpDetails && (
          <motion.div variants={fade(0.29)} className="px-6 py-2 rounded mb-3"
            style={{ background: 'rgba(201,168,76,0.1)', border: '0.75px solid rgba(201,168,76,0.3)' }}>
            <p className={`${cinzel.className} text-[9px] uppercase tracking-widest`} style={{ color: '#c9a84c' }}>
              RSVP · {data.rsvpDetails}
            </p>
          </motion.div>
        )}
        {data.contactNumber && (
          <motion.p variants={fade(0.31)} className="text-xs font-light" style={{ color: 'rgba(255,255,255,0.35)' }}>
            {data.contactNumber}
          </motion.p>
        )}
      </motion.div>

      {/* Bottom gold bar */}
      <div style={{ height: '3px', background: 'linear-gradient(to right, transparent, #c9a84c, #f0d878, #c9a84c, transparent)', flexShrink: 0, position: 'relative', zIndex: 1 }} />

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
                  color: 'rgba(201,168,76,0.18)',
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
              backgroundColor: 'rgba(12,12,20,0.95)',
              zIndex: 51,
              textAlign: 'center', borderTop: '1px solid rgba(201,168,76,0.3)'
            }}
          >
            <span
              style={{
                fontSize: '13px',
                fontWeight: 700,
                color: '#c9a84c',
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
