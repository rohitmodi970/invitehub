'use client';

import { motion } from 'framer-motion';
import { Great_Vibes, Playfair_Display, Lato } from 'next/font/google';

const greatVibes = Great_Vibes({ subsets: ['latin'], weight: '400' });
const playfair = Playfair_Display({ subsets: ['latin'], weight: ['400', '700'], style: ['italic', 'normal'] });
const lato = Lato({ subsets: ['latin'], weight: ['300', '400', '700'] });

export interface InvitationData {
  brideName: string; groomName: string; weddingDate: string; weddingTime: string;
  venueName: string; venueAddress: string; contactNumber?: string;
  additionalMessage?: string; couplePhotoUrl?: string; familyDetails?: string; rsvpDetails?: string;
}
export interface TemplateProps { data: InvitationData; isPremium?: boolean; }

const fade = (delay = 0) => ({ hidden: { opacity: 0, y: 16 }, show: { opacity: 1, y: 0, transition: { duration: 0.6, delay, ease: 'easeOut' as const } } });

export function WhiteEleganceTemplate({ data, isPremium = false }: TemplateProps) {
  return (
    <div className={`relative overflow-hidden w-full max-w-[420px] min-h-[640px] mx-auto flex flex-col shadow-2xl ${lato.className}`}
      style={{ background: 'linear-gradient(160deg, #ffffff 0%, #f7f3ee 100%)' }}>

      {/* Top arch accent */}
      <div className="absolute top-0 left-0 right-0 h-48 pointer-events-none overflow-hidden">
        <svg viewBox="0 0 420 180" preserveAspectRatio="none" className="w-full h-full">
          <ellipse cx="210" cy="-10" rx="230" ry="120" fill="#e8ddd4" opacity="0.5" />
          <ellipse cx="210" cy="-20" rx="180" ry="90" fill="#d4b896" opacity="0.2" />
        </svg>
      </div>

      {/* Thin border frame */}
      <div className="absolute inset-4 pointer-events-none" style={{ border: '1px solid rgba(180,140,100,0.25)' }} />
      <div className="absolute inset-[18px] pointer-events-none" style={{ border: '0.5px solid rgba(180,140,100,0.15)' }} />

      <motion.div className="relative z-10 flex-1 flex flex-col items-center px-10 pt-14 pb-8 text-center"
        initial="hidden" animate="show" variants={{ show: { transition: { staggerChildren: 0.12 } } }}>

        {/* Monogram circle */}
        <motion.div variants={fade(0)} className="mb-6">
          <div className="w-20 h-20 rounded-full flex items-center justify-center mx-auto"
            style={{ background: 'linear-gradient(135deg, #c9a87c, #e8cfa0)', boxShadow: '0 4px 20px rgba(180,140,80,0.3)' }}>
            <span className={`${greatVibes.className} text-4xl text-white drop-shadow`}>
              {data.brideName[0]}{data.groomName[0]}
            </span>
          </div>
        </motion.div>

        <motion.p variants={fade(0.05)} className="text-xs tracking-[0.35em] uppercase text-[#b08c5c] mb-5">
          Together with their families
        </motion.p>

        {/* Photo */}
        {data.couplePhotoUrl && (
          <motion.div variants={fade(0.1)} className="mb-6">
            <div className="w-28 h-28 rounded-full mx-auto overflow-hidden" style={{ border: '3px solid #c9a87c', boxShadow: '0 8px 24px rgba(0,0,0,0.12)' }}>
              <img src={data.couplePhotoUrl} alt="" className="w-full h-full object-cover" crossOrigin="anonymous" />
            </div>
          </motion.div>
        )}

        {/* Names */}
        <motion.div variants={fade(0.1)} className="mb-2">
          <h1 className={`${greatVibes.className} text-6xl leading-tight`} style={{ color: '#8b6340' }}>
            {data.brideName}
          </h1>
          <div className="flex items-center gap-3 justify-center my-1">
            <div className="h-px flex-1" style={{ background: 'linear-gradient(to right, transparent, #c9a87c)' }} />
            <span className={`${playfair.className} text-base italic text-[#c9a87c]`}>&amp;</span>
            <div className="h-px flex-1" style={{ background: 'linear-gradient(to left, transparent, #c9a87c)' }} />
          </div>
          <h1 className={`${greatVibes.className} text-6xl leading-tight`} style={{ color: '#8b6340' }}>
            {data.groomName}
          </h1>
        </motion.div>

        {/* Ornament */}
        <motion.div variants={fade(0.15)} className="my-5">
          <svg width="160" height="12" viewBox="0 0 160 12">
            <line x1="0" y1="6" x2="60" y2="6" stroke="#c9a87c" strokeWidth="0.8" />
            <circle cx="80" cy="6" r="4" fill="#c9a87c" />
            <circle cx="68" cy="6" r="1.5" fill="#c9a87c" opacity="0.6" />
            <circle cx="92" cy="6" r="1.5" fill="#c9a87c" opacity="0.6" />
            <line x1="100" y1="6" x2="160" y2="6" stroke="#c9a87c" strokeWidth="0.8" />
          </svg>
        </motion.div>

        {/* Details */}
        <motion.div variants={fade(0.2)} className="w-full space-y-3 mb-6">
          <p className={`${playfair.className} text-xl italic text-[#4a3520]`}>{data.weddingDate}</p>
          <p className="text-sm tracking-widest text-[#9a7a55] uppercase">{data.weddingTime}</p>
          <div className="pt-3 border-t border-[#e0cdb8]">
            <p className={`${playfair.className} text-lg font-bold text-[#4a3520]`}>{data.venueName}</p>
            <p className="text-sm text-[#9a7a55] mt-1 leading-relaxed">{data.venueAddress}</p>
          </div>
        </motion.div>

        {/* Optional fields */}
        <div className="flex-1 min-h-4" />
        {data.additionalMessage && (
          <motion.p variants={fade(0.25)} className={`${greatVibes.className} text-2xl text-[#b08c5c] mb-3`}>
            "{data.additionalMessage}"
          </motion.p>
        )}
        {data.rsvpDetails && (
          <motion.div variants={fade(0.28)} className="text-xs text-[#9a7a55] tracking-widest uppercase mb-2">
            RSVP · {data.rsvpDetails}
          </motion.div>
        )}
        {data.contactNumber && (
          <motion.p variants={fade(0.3)} className="text-xs text-[#b4a090] mb-3">{data.contactNumber}</motion.p>
        )}
      </motion.div>

      {/* Bottom arch */}
      <div className="absolute bottom-0 left-0 right-0 h-32 pointer-events-none overflow-hidden">
        <svg viewBox="0 0 420 120" preserveAspectRatio="none" className="w-full h-full">
          <ellipse cx="210" cy="130" rx="250" ry="110" fill="#e8ddd4" opacity="0.4" />
        </svg>
      </div>

      {/* Watermark */}
      {!isPremium && (
        <>
          <div style={{ position: 'absolute', inset: 0, zIndex: 50, pointerEvents: 'none', overflow: 'hidden', display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '30px 20px', padding: '20px' }}>
            {Array.from({ length: 32 }).map((_, i) => (
              <span key={i} style={{ transform: 'rotate(-35deg)', fontSize: '11px', color: 'rgba(180,140,80,0.15)', fontWeight: 'bold', letterSpacing: '0.05em', userSelect: 'none', display: 'flex', alignItems: 'center', justifyContent: 'center', whiteSpace: 'nowrap' }}>InviteHub.in</span>
            ))}
          </div>
          <div style={{ position: 'relative', width: '100%', padding: '10px 0', backgroundColor: 'rgba(74,53,32,0.8)', zIndex: 51, textAlign: 'center' }}>
            <span style={{ fontSize: '13px', fontWeight: 700, color: '#c9a87c', letterSpacing: '0.03em', fontFamily: 'sans-serif' }}>🔒 Created with InviteHub.in — Upgrade to remove watermark</span>
          </div>
        </>
      )}
    </div>
  );
}
