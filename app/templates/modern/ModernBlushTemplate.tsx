'use client';

import { motion } from 'framer-motion';
import { Cormorant_Garamond, Jost } from 'next/font/google';

const cormorant = Cormorant_Garamond({ subsets: ['latin'], weight: ['300', '400', '600'], style: ['italic', 'normal'] });
const jost = Jost({ subsets: ['latin'], weight: ['300', '400', '500', '600'] });

export interface InvitationData {
  brideName: string; groomName: string; weddingDate: string; weddingTime: string;
  venueName: string; venueAddress: string; contactNumber?: string;
  additionalMessage?: string; couplePhotoUrl?: string; familyDetails?: string; rsvpDetails?: string;
}
export interface TemplateProps { data: InvitationData; isPremium?: boolean; }

const fade = (delay = 0) => ({
  hidden: { opacity: 0, y: 14 },
  show: { opacity: 1, y: 0, transition: { duration: 0.6, delay, ease: 'easeOut' as const } },
});
const slideUp = (delay = 0) => ({
  hidden: { opacity: 0, scaleY: 0, originY: 1 },
  show: { opacity: 1, scaleY: 1, transition: { duration: 0.5, delay, ease: 'easeOut' as const } },
});

// Blush watercolour blob - top right
const BlobTopRight = () => (
  <div className="absolute top-0 right-0 w-56 h-56 pointer-events-none overflow-hidden">
    <div style={{ position: 'absolute', top: '-30px', right: '-30px', width: '200px', height: '200px', borderRadius: '60% 40% 70% 30% / 50% 60% 40% 50%', background: 'radial-gradient(circle at 40% 40%, rgba(251,207,232,0.6) 0%, rgba(249,168,212,0.3) 50%, transparent 75%)' }} />
  </div>
);

// Bottom left smaller blob
const BlobBottomLeft = () => (
  <div className="absolute bottom-0 left-0 w-44 h-44 pointer-events-none overflow-hidden">
    <div style={{ position: 'absolute', bottom: '-20px', left: '-20px', width: '180px', height: '180px', borderRadius: '40% 60% 30% 70% / 60% 40% 70% 30%', background: 'radial-gradient(circle at 60% 60%, rgba(216,180,254,0.5) 0%, rgba(196,181,253,0.3) 50%, transparent 70%)' }} />
  </div>
);

const MonogramCircle = ({ brideName, groomName }: { brideName: string; groomName: string }) => (
  <div style={{ width: '80px', height: '80px', borderRadius: '50%', border: '1.5px solid rgba(219,112,147,0.35)', display: 'flex', alignItems: 'center', justifyContent: 'center', background: 'rgba(251,207,232,0.15)', boxShadow: '0 0 0 6px rgba(251,207,232,0.12), 0 4px 20px rgba(219,112,147,0.12)' }}>
    <span className={`${cormorant.className} text-2xl italic`} style={{ color: '#9b4a6b' }}>
      {brideName[0]}&amp;{groomName[0]}
    </span>
  </div>
);

export function ModernBlushTemplate({ data, isPremium = false }: TemplateProps) {
  return (
    <div className={`relative overflow-hidden w-full max-w-[420px] min-h-[640px] mx-auto flex flex-col shadow-2xl ${jost.className}`}
      style={{ background: '#fffbfd' }}>

      <BlobTopRight />
      <BlobBottomLeft />

      {/* Top accent bar */}
      <div style={{ height: '4px', background: 'linear-gradient(to right, #fbcfe8, #d8b4fe, #fbcfe8)', flexShrink: 0 }} />

      {/* Thin frame */}
      <div className="absolute inset-5 pointer-events-none" style={{ border: '0.75px solid rgba(219,112,147,0.15)' }} />

      <motion.div className="relative z-10 flex-1 flex flex-col items-center px-10 pt-12 pb-8 text-center"
        initial="hidden" animate="show" variants={{ show: { transition: { staggerChildren: 0.1 } } }}>

        {/* Monogram */}
        <motion.div variants={fade(0)} className="mb-6">
          <MonogramCircle brideName={data.brideName} groomName={data.groomName} />
        </motion.div>

        {/* Pre-title */}
        <motion.p variants={fade(0.05)} className="text-[9px] tracking-[0.42em] uppercase mb-5"
          style={{ color: '#be7a97' }}>
          Together with their families
        </motion.p>

        {/* Photo */}
        {data.couplePhotoUrl && (
          <motion.div variants={fade(0.08)} className="mb-6">
            <div className="w-24 h-24 rounded-full mx-auto overflow-hidden"
              style={{ border: '2.5px solid rgba(219,112,147,0.4)', boxShadow: '0 0 0 5px rgba(251,207,232,0.2), 0 8px 24px rgba(219,112,147,0.18)' }}>
              <img src={data.couplePhotoUrl} alt="" className="w-full h-full object-cover" crossOrigin="anonymous" />
            </div>
          </motion.div>
        )}

        {/* Names */}
        <motion.div variants={fade(0.1)} className="mb-3">
          <h1 className={`${cormorant.className} text-5xl font-light italic leading-tight`} style={{ color: '#6b2a46' }}>
            {data.brideName}
          </h1>
          <div className="flex items-center gap-3 justify-center my-2">
            <div className="h-px flex-1" style={{ background: 'linear-gradient(to right, transparent, rgba(219,112,147,0.4))' }} />
            <svg width="16" height="16" viewBox="0 0 16 16"><path d="M8 1 C4 4 1 6 1 9 C1 12 4 14 8 14 C12 14 15 12 15 9 C15 6 12 4 8 1Z" fill="rgba(219,112,147,0.4)" /></svg>
            <div className="h-px flex-1" style={{ background: 'linear-gradient(to left, transparent, rgba(219,112,147,0.4))' }} />
          </div>
          <h1 className={`${cormorant.className} text-5xl font-light italic leading-tight`} style={{ color: '#6b2a46' }}>
            {data.groomName}
          </h1>
        </motion.div>

        {/* Ornament line */}
        <motion.div variants={fade(0.16)} className="mb-6">
          <svg width="140" height="10" viewBox="0 0 140 10">
            <line x1="0" y1="5" x2="55" y2="5" stroke="rgba(219,112,147,0.3)" strokeWidth="0.8" />
            <circle cx="70" cy="5" r="3.5" fill="rgba(219,112,147,0.5)" />
            <circle cx="60" cy="5" r="1.5" fill="rgba(219,112,147,0.3)" />
            <circle cx="80" cy="5" r="1.5" fill="rgba(219,112,147,0.3)" />
            <line x1="85" y1="5" x2="140" y2="5" stroke="rgba(219,112,147,0.3)" strokeWidth="0.8" />
          </svg>
        </motion.div>

        {/* Details */}
        <motion.div variants={fade(0.2)} className="w-full space-y-3 mb-6">
          <p className={`${cormorant.className} text-xl italic`} style={{ color: '#4a1a30' }}>{data.weddingDate}</p>
          <p className="text-xs tracking-[0.25em] uppercase" style={{ color: '#be7a97' }}>{data.weddingTime}</p>
          <div className="pt-3" style={{ borderTop: '0.75px solid rgba(219,112,147,0.2)' }}>
            <p className="text-base font-semibold tracking-wide" style={{ color: '#4a1a30' }}>{data.venueName}</p>
            <p className="text-sm mt-1 leading-relaxed font-light" style={{ color: '#9b5a75' }}>{data.venueAddress}</p>
          </div>
        </motion.div>

        {data.familyDetails && (
          <motion.p variants={fade(0.24)} className="text-xs italic mb-3 font-light" style={{ color: '#9b5a75' }}>
            {data.familyDetails}
          </motion.p>
        )}
        {data.additionalMessage && (
          <motion.p variants={fade(0.27)} className={`${cormorant.className} text-xl italic mb-3`} style={{ color: '#be7a97' }}>
            "{data.additionalMessage}"
          </motion.p>
        )}

        <div className="flex-1 min-h-4" />

        {data.rsvpDetails && (
          <motion.div variants={slideUp(0.3)} className="px-5 py-2 rounded-full mb-3"
            style={{ background: 'rgba(251,207,232,0.35)', border: '0.75px solid rgba(219,112,147,0.3)' }}>
            <p className="text-[10px] uppercase tracking-widest" style={{ color: '#9b4a6b' }}>RSVP · {data.rsvpDetails}</p>
          </motion.div>
        )}
        {data.contactNumber && (
          <motion.p variants={fade(0.32)} className="text-xs font-light" style={{ color: '#be7a97', opacity: 0.7 }}>
            {data.contactNumber}
          </motion.p>
        )}
      </motion.div>

      {/* Bottom accent bar */}
      <div style={{ height: '4px', background: 'linear-gradient(to right, #d8b4fe, #fbcfe8, #d8b4fe)', flexShrink: 0, position: 'relative', zIndex: 1 }} />

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
                  color: 'rgba(155,74,107,0.18)',
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
              backgroundColor: 'rgba(107,42,70,0.88)',
              zIndex: 51,
              textAlign: 'center'
            }}
          >
            <span
              style={{
                fontSize: '13px',
                fontWeight: 700,
                color: '#fce7f3',
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
