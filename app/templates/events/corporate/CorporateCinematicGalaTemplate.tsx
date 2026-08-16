'use client';

import { motion } from 'framer-motion';
import type { TemplateProps } from '@/lib/invitations/types';

const playfair = { className: '' };
const lato = { className: '' };

const fadeUp = {
  hidden: { opacity: 0, y: 30 },
  show: { opacity: 1, y: 0, transition: { duration: 1, ease: 'easeOut' as const } },
};

export function CorporateCinematicGalaTemplate({ data, isPremium = false }: TemplateProps) {
  // Uses a generic cinematic stage or the uploaded company/event photo
  const bgImage = data.couplePhotoUrl || 'https://images.unsplash.com/photo-1540575467063-178a50c2df87?q=80&w=2070&auto=format&fit=crop';

  return (
    <div className={`relative overflow-hidden w-full max-w-[420px] min-h-[640px] mx-auto flex flex-col shadow-2xl ${lato.className} bg-black`}>
      
      {/* ── Background Photo ── */}
      <motion.div 
        initial={{ scale: 1.15, opacity: 0 }} 
        animate={{ scale: 1, opacity: 1 }} 
        transition={{ duration: 2, ease: 'easeOut' }}
        className="absolute inset-0 z-0"
      >
        <img src={bgImage} alt="Background" className="w-full h-full object-cover" crossOrigin="anonymous" />
        
        {/* Cinematic dark gradient overlay (fades from transparent top to solid black bottom) */}
        <div className="absolute inset-0 bg-gradient-to-b from-black/20 via-black/60 to-black pointer-events-none" />
      </motion.div>

      {/* ── Content ── */}
      <motion.div 
        className="relative z-10 flex-1 flex flex-col p-8 pt-12 pb-16 justify-end text-center"
        initial="hidden"
        animate="show"
        variants={{ show: { transition: { staggerChildren: 0.15 } } }}
      >
        {/* Decorative Laurel Wreath / Crown (SVG) */}
        <motion.div variants={fadeUp} className="mx-auto mb-6 opacity-80">
          <svg width="60" height="40" viewBox="0 0 60 40" fill="none">
            <path d="M15 30C15 30 5 20 10 10C15 0 25 5 25 5C25 5 15 15 15 30Z" fill="url(#goldGradient)" />
            <path d="M45 30C45 30 55 20 50 10C45 0 35 5 35 5C35 5 45 15 45 30Z" fill="url(#goldGradient)" />
            <path d="M30 35L25 20L30 5L35 20L30 35Z" fill="url(#goldGradient)" />
            <defs>
              <linearGradient id="goldGradient" x1="10" y1="5" x2="50" y2="35" gradientUnits="userSpaceOnUse">
                <stop stopColor="#FDE047" />
                <stop offset="0.5" stopColor="#EAB308" />
                <stop offset="1" stopColor="#A16207" />
              </linearGradient>
            </defs>
          </svg>
        </motion.div>

        {/* Titles */}
        <motion.div variants={fadeUp}>
          <p className="text-[10px] uppercase tracking-[0.4em] text-yellow-500 mb-3 font-semibold">
            You Are Invited To
          </p>
          <h1 className={`${playfair.className} text-4xl sm:text-5xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-yellow-200 via-yellow-500 to-yellow-700 leading-tight mb-2 drop-shadow-md`}>
            {data.brideName}
          </h1>
          {data.groomName && (
            <h2 className={`${playfair.className} text-2xl sm:text-3xl font-semibold text-white/90 leading-tight mb-6`}>
              {data.groomName}
            </h2>
          )}
        </motion.div>

        {/* Separator line */}
        <motion.div variants={fadeUp} className="w-full flex justify-center mb-8">
          <div className="w-1/2 h-[1px] bg-gradient-to-r from-transparent via-yellow-600/50 to-transparent" />
        </motion.div>

        {/* Details */}
        <motion.div variants={fadeUp} className="space-y-5">
          <div>
            <p className="text-yellow-500/80 text-[10px] uppercase tracking-widest mb-1">When</p>
            <p className={`${playfair.className} text-xl text-white`}>{data.weddingDate}</p>
            <p className="text-sm text-white/70 mt-1">{data.weddingTime}</p>
          </div>
          
          <div>
            <p className="text-yellow-500/80 text-[10px] uppercase tracking-widest mb-1">Where</p>
            <p className={`${playfair.className} text-lg text-white`}>{data.venueName}</p>
            <p className="text-xs text-white/60 mt-1 max-w-[80%] mx-auto leading-relaxed">{data.venueAddress}</p>
          </div>
        </motion.div>

        {/* Footer Details */}
        <motion.div variants={fadeUp} className="mt-8 pt-6 border-t border-white/10 flex flex-col items-center gap-3">
          {data.rsvpDetails && (
            <div className="inline-block px-4 py-1.5 border border-yellow-600/50 rounded-full">
              <p className="text-[10px] uppercase tracking-widest text-yellow-500">
                RSVP: <span className="text-white">{data.rsvpDetails}</span>
              </p>
            </div>
          )}
          {data.contactNumber && (
            <p className="text-xs text-white/50">{data.contactNumber}</p>
          )}
          {data.additionalMessage && (
            <p className={`${playfair.className} text-sm text-white/80 italic mt-2`}>
              "{data.additionalMessage}"
            </p>
          )}
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
                  color: '#EAB308',
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
              backgroundColor: 'rgba(0,0,0,0.9)',
              zIndex: 51,
              textAlign: 'center',
              borderTop: '1px solid rgba(234, 179, 8, 0.2)'
            }}
          >
            <span
              style={{
                fontSize: '13px',
                fontWeight: 700,
                color: '#EAB308',
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
