'use client';

import { motion } from 'framer-motion';
import { Inter, Space_Grotesk } from 'next/font/google';
import type { TemplateProps } from '@/lib/invitations/types';

const inter = Inter({ subsets: ['latin'], weight: ['300', '400', '500', '600'] });
const space = Space_Grotesk({ subsets: ['latin'], weight: ['500', '700'] });

const slideLeft = {
  hidden: { opacity: 0, x: 40 },
  show: { opacity: 1, x: 0, transition: { duration: 0.8, ease: 'easeOut' as const } },
};

export function CorporateExecutiveGlassTemplate({ data, isPremium = false }: TemplateProps) {
  // Uses a generic modern building or the uploaded company/team photo
  const bgImage = data.couplePhotoUrl || 'https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?q=80&w=2070&auto=format&fit=crop';

  return (
    <div className={`relative overflow-hidden w-full max-w-[420px] min-h-[640px] mx-auto flex shadow-2xl ${inter.className} bg-slate-900`}>
      
      {/* ── Background Photo ── */}
      <motion.div 
        initial={{ scale: 1.1 }} 
        animate={{ scale: 1 }} 
        transition={{ duration: 2, ease: 'easeOut' }}
        className="absolute inset-0 z-0"
      >
        <img src={bgImage} alt="Background" className="w-full h-full object-cover" crossOrigin="anonymous" />
        {/* Subtle tech blue gradient overlay */}
        <div className="absolute inset-0 bg-gradient-to-tr from-slate-900/90 via-slate-800/60 to-cyan-900/30 pointer-events-none" />
      </motion.div>

      {/* ── Content ── */}
      <motion.div 
        className="relative z-10 w-full flex flex-col p-6 pb-12"
        initial="hidden"
        animate="show"
        variants={{ show: { transition: { staggerChildren: 0.1 } } }}
      >
        <div className="flex-1" />
        
        {/* Executive Glass Panel */}
        <motion.div variants={slideLeft} className="w-full">
          <div className="bg-slate-900/40 backdrop-blur-xl rounded-2xl p-7 border border-slate-700/50 shadow-2xl relative overflow-hidden group">
            {/* Cyan glowing edge on the left */}
            <div className="absolute top-0 left-0 bottom-0 w-1 bg-gradient-to-b from-cyan-400 to-blue-600" />
            
            {/* Header */}
            <div className="mb-6">
              <p className={`${space.className} text-cyan-400 text-xs tracking-widest uppercase font-bold mb-2`}>
                Executive Event
              </p>
              <h1 className={`${space.className} text-3xl font-bold text-white leading-tight`}>
                {data.brideName}
              </h1>
              {data.groomName && (
                <h2 className={`${space.className} text-2xl font-bold text-slate-300 leading-tight mt-1`}>
                  {data.groomName}
                </h2>
              )}
            </div>

            <div className="space-y-4">
              <div className="flex items-start gap-4">
                <div className="w-8 h-8 rounded-full bg-slate-800/80 border border-slate-700 flex items-center justify-center shrink-0 mt-0.5">
                  <span className="text-cyan-400 text-xs">📅</span>
                </div>
                <div>
                  <p className="text-sm font-semibold text-white">{data.weddingDate}</p>
                  <p className="text-xs text-slate-400">{data.weddingTime}</p>
                </div>
              </div>

              <div className="flex items-start gap-4">
                <div className="w-8 h-8 rounded-full bg-slate-800/80 border border-slate-700 flex items-center justify-center shrink-0 mt-0.5">
                  <span className="text-cyan-400 text-xs">📍</span>
                </div>
                <div>
                  <p className="text-sm font-semibold text-white">{data.venueName}</p>
                  <p className="text-xs text-slate-400">{data.venueAddress}</p>
                </div>
              </div>
            </div>

            {(data.rsvpDetails || data.contactNumber) && (
              <div className="mt-6 pt-5 border-t border-slate-700/50 flex flex-col gap-1.5">
                {data.rsvpDetails && (
                  <p className="text-[10px] uppercase tracking-widest text-slate-300 font-medium">
                    RSVP: <span className="text-white">{data.rsvpDetails}</span>
                  </p>
                )}
                {data.contactNumber && (
                  <p className="text-xs text-slate-400">{data.contactNumber}</p>
                )}
              </div>
            )}
            
            {data.additionalMessage && (
              <p className="text-slate-400 text-xs italic mt-4 border-l-2 border-slate-600 pl-3">
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
                  color: '#22d3ee',
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
              position: 'absolute',
              bottom: 0,
              left: 0,
              width: '100%',
              padding: '10px 0',
              backgroundColor: 'rgba(15, 23, 42, 0.95)',
              zIndex: 51,
              textAlign: 'center',
              borderTop: '1px solid rgba(34, 211, 238, 0.2)'
            }}
          >
            <span
              style={{
                fontSize: '13px',
                fontWeight: 700,
                color: '#22d3ee',
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
