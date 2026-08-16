'use client';

import { motion } from 'framer-motion';
import { Inter, Space_Grotesk } from 'next/font/google';

const inter = { className: '' };
const spaceGrotesk = { className: '' };

export interface InvitationData {
  brideName: string; groomName: string; weddingDate: string; weddingTime: string;
  venueName: string; venueAddress: string; contactNumber?: string;
  additionalMessage?: string; couplePhotoUrl?: string; familyDetails?: string; rsvpDetails?: string;
}
export interface TemplateProps { data: InvitationData; isPremium?: boolean; }

const slideIn = (delay = 0, dir: 'left' | 'right' = 'left') => ({
  hidden: { opacity: 0, x: dir === 'left' ? -30 : 30 },
  show: { opacity: 1, x: 0, transition: { duration: 0.6, delay, ease: 'easeOut' as const } },
});

export function ArcMinimalistTemplate({ data, isPremium = false }: TemplateProps) {
  const accent = '#e85d4a'; // warm terracotta-red

  return (
    <div className={`relative overflow-hidden w-full max-w-[420px] min-h-[640px] mx-auto flex flex-col shadow-2xl ${inter.className}`}
      style={{ background: '#f7f4f0' }}>

      {/* Large arc background shape */}
      <motion.div initial={{ opacity: 0, scale: 0.8 }} animate={{ opacity: 1, scale: 1 }} transition={{ duration: 0.8, ease: 'easeOut' as const }}
        className="absolute top-0 left-0 w-full pointer-events-none" style={{ height: '55%' }}>
        <svg viewBox="0 0 420 350" preserveAspectRatio="none" className="w-full h-full">
          <ellipse cx="210" cy="0" rx="260" ry="290" fill={accent} />
        </svg>
      </motion.div>

      {/* Floating circle accent */}
      <motion.div initial={{ opacity: 0, scale: 0 }} animate={{ opacity: 1, scale: 1 }} transition={{ duration: 0.5, delay: 0.3, type: 'spring' as const, stiffness: 200 }}
        className="absolute top-6 right-6 w-10 h-10 rounded-full pointer-events-none"
        style={{ background: 'rgba(255,255,255,0.2)', border: '1px solid rgba(255,255,255,0.4)' }} />

      <motion.div className="relative z-10 flex-1 flex flex-col px-8 pt-12 pb-8"
        initial="hidden" animate="show" variants={{ show: { transition: { staggerChildren: 0.1 } } }}>

        {/* Header label */}
        <motion.p variants={slideIn(0, 'left')} className={`${spaceGrotesk.className} text-[10px] tracking-[0.5em] uppercase text-white/70 mb-16`}>
          Wedding Invitation
        </motion.p>

        {/* Names — left aligned, large, white */}
        <motion.div variants={slideIn(0.05, 'left')} className="mb-3">
          <h1 className="text-5xl sm:text-6xl font-bold text-white leading-[1.05] tracking-tight">
            {data.brideName}
          </h1>
          <div className="flex items-center gap-3 my-1.5">
            <div className="w-8 h-0.5 bg-white/40" />
            <span className="text-white/60 text-sm font-light">&amp;</span>
          </div>
          <h1 className="text-5xl sm:text-6xl font-bold text-white leading-[1.05] tracking-tight">
            {data.groomName}
          </h1>
        </motion.div>

        {/* Photo */}
        {data.couplePhotoUrl && (
          <motion.div variants={slideIn(0.1, 'right')} className="self-end -mt-4 mb-2">
            <div className="w-20 h-20 rounded-full overflow-hidden" style={{ border: '3px solid white', boxShadow: '0 4px 16px rgba(0,0,0,0.15)' }}>
              <img src={data.couplePhotoUrl} alt="" className="w-full h-full object-cover" crossOrigin="anonymous" />
            </div>
          </motion.div>
        )}

        {/* Divider */}
        <motion.div variants={slideIn(0.12, 'left')} className="my-8">
          <div className="flex items-center gap-4">
            <div className="w-8 h-8 rounded-full flex items-center justify-center" style={{ background: accent }}>
              <div className="w-2 h-2 rounded-full bg-white" />
            </div>
            <div className="flex-1 h-px bg-gray-200" />
          </div>
        </motion.div>

        {/* Date & Details — card style */}
        <motion.div variants={slideIn(0.15, 'left')} className="mb-5">
          <div className="bg-white rounded-2xl p-5 shadow-sm">
            <div className="flex gap-4">
              {/* Date block */}
              <div className="flex-1 border-r border-gray-100 pr-4">
                <p className="text-[10px] uppercase tracking-widest text-gray-400 mb-1">Date</p>
                <p className={`${spaceGrotesk.className} text-base font-bold text-gray-800 leading-snug`}>{data.weddingDate}</p>
              </div>
              {/* Time block */}
              <div className="flex-1 pl-2">
                <p className="text-[10px] uppercase tracking-widest text-gray-400 mb-1">Time</p>
                <p className={`${spaceGrotesk.className} text-base font-bold text-gray-800`}>{data.weddingTime}</p>
              </div>
            </div>
            <div className="h-px bg-gray-100 my-4" />
            <div>
              <p className="text-[10px] uppercase tracking-widest text-gray-400 mb-1">Venue</p>
              <p className={`${spaceGrotesk.className} text-base font-bold text-gray-800`}>{data.venueName}</p>
              <p className="text-xs text-gray-400 mt-1">{data.venueAddress}</p>
            </div>
          </div>
        </motion.div>

        <div className="flex-1" />

        {data.additionalMessage && (
          <motion.p variants={slideIn(0.18, 'left')} className="text-sm text-gray-500 italic mb-3">"{data.additionalMessage}"</motion.p>
        )}

        <motion.div variants={slideIn(0.2, 'left')} className="flex items-center justify-between">
          {data.rsvpDetails && <p className="text-xs uppercase tracking-widest text-gray-400">RSVP · {data.rsvpDetails}</p>}
          {data.contactNumber && <p className="text-xs text-gray-400">{data.contactNumber}</p>}
        </motion.div>
      </motion.div>

      {!isPremium && (
        <>
          <div style={{ position: 'absolute', inset: 0, zIndex: 50, pointerEvents: 'none', overflow: 'hidden', display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '30px 20px', padding: '20px' }}>
            {Array.from({ length: 32 }).map((_, i) => (
              <span key={i} style={{ transform: 'rotate(-35deg)', fontSize: '11px', color: 'rgba(232,93,74,0.12)', fontWeight: 'bold', letterSpacing: '0.05em', userSelect: 'none', display: 'flex', alignItems: 'center', justifyContent: 'center', whiteSpace: 'nowrap' }}>InviteHub.in</span>
            ))}
          </div>
          <div style={{ position: 'relative', width: '100%', padding: '10px 0', backgroundColor: `${accent}cc`, zIndex: 51, textAlign: 'center' }}>
            <span style={{ fontSize: '13px', fontWeight: 700, color: 'white', letterSpacing: '0.03em', fontFamily: 'sans-serif' }}>🔒 Created with InviteHub.in — Upgrade to remove watermark</span>
          </div>
        </>
      )}
    </div>
  );
}
