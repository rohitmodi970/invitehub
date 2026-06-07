'use client';

import { motion } from 'framer-motion';
import { Space_Grotesk, Inter } from 'next/font/google';
import type { TemplateProps } from '@/lib/invitations/types';

const space = Space_Grotesk({ subsets: ['latin'], weight: ['500', '700'] });
const inter = Inter({ subsets: ['latin'], weight: ['300', '400', '500', '700'] });

const slideUp = {
  hidden: { opacity: 0, y: 30 },
  show: { opacity: 1, y: 0, transition: { duration: 0.8, ease: 'easeOut' as const } },
};

export function BirthdayVintageTemplate({ data, isPremium = false }: TemplateProps) {
  // Use uploaded photo or a fallback retro film photo
  const bgImage = data.couplePhotoUrl || 'https://images.unsplash.com/photo-1549465220-1a8b9238cd48?q=80&w=2040&auto=format&fit=crop';

  return (
    <div className={`relative overflow-hidden w-full max-w-[420px] min-h-[640px] mx-auto flex flex-col shadow-2xl ${inter.className} bg-[#1a1816]`}>
      
      {/* ── Background Photo with Film Overlay ── */}
      <motion.div 
        initial={{ opacity: 0 }} 
        animate={{ opacity: 1 }} 
        transition={{ duration: 1.2 }}
        className="absolute inset-0 z-0"
      >
        <img src={bgImage} alt="Background" className="w-full h-full object-cover" crossOrigin="anonymous" />
        
        {/* Warm vintage color overlay */}
        <div className="absolute inset-0 bg-[#4a2511]/30 mix-blend-multiply pointer-events-none" />
        
        {/* Grain/noise simulation */}
        <div 
          className="absolute inset-0 opacity-40 pointer-events-none"
          style={{ backgroundImage: 'url("data:image/svg+xml,%3Csvg viewBox=%220 0 200 200%22 xmlns=%22http://www.w3.org/2000/svg%22%3E%3Cfilter id=%22noiseFilter%22%3E%3CfeTurbulence type=%22fractalNoise%22 baseFrequency=%220.65%22 numOctaves=%223%22 stitchTiles=%22stitch%22/%3E%3C/filter%3E%3Crect width=%22100%25%22 height=%22100%25%22 filter=%22url(%23noiseFilter)%22/%3E%3C/svg%3E")' }}
        />
        
        {/* Vignette */}
        <div className="absolute inset-0 bg-radial-gradient from-transparent via-transparent to-black/80 pointer-events-none" style={{ background: 'radial-gradient(circle, transparent 30%, rgba(0,0,0,0.8) 100%)' }} />
      </motion.div>

      {/* ── Polaroid Frame Decorative Accents ── */}
      <motion.div 
        initial={{ rotate: -15, x: -50, y: 50, opacity: 0 }}
        animate={{ rotate: -10, x: -20, y: 30, opacity: 1 }}
        transition={{ duration: 1, delay: 0.2 }}
        className="absolute top-10 -left-6 w-24 h-32 bg-white/10 backdrop-blur-sm border-4 border-white/80 p-1 shadow-2xl z-10 hidden sm:block"
      >
        <div className="w-full h-full bg-white/20" />
      </motion.div>

      <motion.div 
        initial={{ rotate: 20, x: 50, y: -50, opacity: 0 }}
        animate={{ rotate: 12, x: 20, y: -20, opacity: 1 }}
        transition={{ duration: 1, delay: 0.4 }}
        className="absolute bottom-32 -right-8 w-28 h-36 bg-white/10 backdrop-blur-sm border-4 border-white/80 p-1 pb-4 shadow-2xl z-10"
      >
        <div className="w-full h-full bg-white/20" />
      </motion.div>

      {/* ── Content ── */}
      <motion.div 
        className="relative z-20 flex-1 flex flex-col items-center justify-center p-8 text-center"
        initial="hidden"
        animate="show"
        variants={{ show: { transition: { staggerChildren: 0.15 } } }}
      >
        <motion.p variants={slideUp} className={`${space.className} text-[#f0cca5] text-xs uppercase tracking-[0.3em] font-bold mb-4 drop-shadow-md`}>
          Join the Celebration
        </motion.p>
        
        <motion.h1 
          variants={slideUp} 
          className={`${space.className} text-5xl sm:text-6xl font-bold text-white leading-tight drop-shadow-[0_0_15px_rgba(240,204,165,0.4)]`}
        >
          {data.brideName}
        </motion.h1>

        {data.groomName && (
          <motion.div variants={slideUp} className="flex items-center gap-3 my-2 justify-center">
            <span className={`${space.className} text-3xl font-bold text-[#f0cca5]`}>&amp;</span>
          </motion.div>
        )}

        {data.groomName && (
          <motion.h1 
            variants={slideUp} 
            className={`${space.className} text-5xl sm:text-6xl font-bold text-white leading-tight drop-shadow-[0_0_15px_rgba(240,204,165,0.4)]`}
          >
            {data.groomName}
          </motion.h1>
        )}

        <motion.div variants={slideUp} className="w-full mt-10">
          <div className="bg-[#1a1816]/80 backdrop-blur-md rounded-lg p-6 border border-[#f0cca5]/30">
            <div className="text-[#f0cca5] font-bold text-lg tracking-wider mb-2">
              {data.weddingDate}
            </div>
            <div className="text-white/90 text-sm tracking-widest uppercase mb-4">
              {data.weddingTime}
            </div>
            
            <div className="h-[1px] w-16 bg-[#f0cca5]/50 mx-auto mb-4" />
            
            <div className="text-white font-semibold mb-1">{data.venueName}</div>
            <div className="text-white/60 text-xs px-4">{data.venueAddress}</div>
            
            {(data.rsvpDetails || data.contactNumber) && (
              <div className="mt-5 pt-4 border-t border-white/10 flex flex-col gap-1">
                {data.rsvpDetails && <span className="text-[#f0cca5] text-xs font-bold uppercase tracking-wider">{data.rsvpDetails}</span>}
                {data.contactNumber && <span className="text-white/60 text-xs">{data.contactNumber}</span>}
              </div>
            )}
          </div>
        </motion.div>
        
        {data.additionalMessage && (
          <motion.p variants={slideUp} className="text-white/80 italic text-sm mt-6">
            "{data.additionalMessage}"
          </motion.p>
        )}
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
                  color: '#f0cca5',
                  opacity: 0.2,
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
              backgroundColor: '#1a1816',
              zIndex: 51,
              textAlign: 'center',
              borderTop: '1px solid rgba(240,204,165,0.3)'
            }}
          >
            <span
              style={{
                fontSize: '13px',
                fontWeight: 700,
                color: '#f0cca5',
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
