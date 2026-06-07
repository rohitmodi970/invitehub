'use client';

import { motion } from 'framer-motion';
import { Great_Vibes, Playfair_Display, Lato } from 'next/font/google';

const greatVibes = Great_Vibes({ subsets: ['latin'], weight: '400' });
const playfair = Playfair_Display({ subsets: ['latin'], weight: ['400', '600'], style: ['italic', 'normal'] });
const lato = Lato({ subsets: ['latin'], weight: ['300', '400', '700'] });

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

// Watercolour flower SVG top-left corner
const FlowerCornerTL = () => (
  <svg width="130" height="130" viewBox="0 0 130 130" fill="none" className="absolute top-0 left-0 pointer-events-none">
    <circle cx="30" cy="30" r="22" fill="#f9a8c9" opacity="0.35" />
    <circle cx="55" cy="18" r="15" fill="#fbc2d8" opacity="0.28" />
    <circle cx="18" cy="55" r="14" fill="#f472b6" opacity="0.22" />
    <circle cx="70" cy="35" r="10" fill="#fde68a" opacity="0.3" />
    <circle cx="38" cy="72" r="9" fill="#86efac" opacity="0.35" />
    {/* Petals */}
    <ellipse cx="30" cy="10" rx="6" ry="12" fill="#f9a8c9" opacity="0.5" transform="rotate(0 30 30)" />
    <ellipse cx="50" cy="15" rx="5" ry="10" fill="#f472b6" opacity="0.4" transform="rotate(-30 50 30)" />
    <ellipse cx="10" cy="40" rx="5" ry="11" fill="#fbc2d8" opacity="0.45" transform="rotate(60 30 40)" />
    {/* Leaves */}
    <path d="M60 60 Q80 40 100 65 Q80 80 60 60Z" fill="#86efac" opacity="0.4" />
    <path d="M40 80 Q55 60 75 80 Q60 95 40 80Z" fill="#6ee7b7" opacity="0.3" />
  </svg>
);

// Bottom-right mirror
const FlowerCornerBR = () => (
  <svg width="120" height="120" viewBox="0 0 130 130" fill="none" className="absolute bottom-0 right-0 pointer-events-none" style={{ transform: 'rotate(180deg)' }}>
    <circle cx="30" cy="30" r="22" fill="#f9a8c9" opacity="0.3" />
    <circle cx="55" cy="18" r="15" fill="#fbc2d8" opacity="0.25" />
    <circle cx="18" cy="55" r="14" fill="#f472b6" opacity="0.2" />
    <circle cx="70" cy="35" r="10" fill="#fde68a" opacity="0.28" />
    <circle cx="38" cy="72" r="9" fill="#86efac" opacity="0.32" />
    <path d="M60 60 Q80 40 100 65 Q80 80 60 60Z" fill="#86efac" opacity="0.35" />
    <path d="M40 80 Q55 60 75 80 Q60 95 40 80Z" fill="#6ee7b7" opacity="0.28" />
  </svg>
);

// Small sprig divider
const FlowerDivider = () => (
  <div className="flex items-center gap-2 justify-center my-4">
    <svg width="80" height="14" viewBox="0 0 80 14">
      <line x1="0" y1="7" x2="30" y2="7" stroke="#f9a8c9" strokeWidth="0.8" />
      <circle cx="35" cy="7" r="3" fill="#f472b6" opacity="0.7" />
      <circle cx="40" cy="4" r="2" fill="#fde68a" opacity="0.8" />
      <circle cx="45" cy="7" r="3" fill="#f472b6" opacity="0.7" />
      <line x1="50" y1="7" x2="80" y2="7" stroke="#f9a8c9" strokeWidth="0.8" />
    </svg>
  </div>
);

export function FloralBloomTemplate({ data, isPremium = false }: TemplateProps) {
  return (
    <div className={`relative overflow-hidden w-full max-w-[420px] min-h-[640px] mx-auto flex flex-col shadow-2xl ${lato.className}`}
      style={{ background: 'linear-gradient(160deg, #fff9fb 0%, #fef3f8 60%, #f0fdf4 100%)' }}>

      <FlowerCornerTL />
      <FlowerCornerBR />

      {/* Double border frame */}
      <div className="absolute inset-5 pointer-events-none" style={{ border: '1px solid rgba(244,114,182,0.2)' }} />
      <div className="absolute inset-[22px] pointer-events-none" style={{ border: '0.5px solid rgba(244,114,182,0.12)' }} />

      <motion.div className="relative z-10 flex-1 flex flex-col items-center px-10 pt-16 pb-8 text-center"
        initial="hidden" animate="show" variants={{ show: { transition: { staggerChildren: 0.11 } } }}>

        {/* Label */}
        <motion.p variants={fade(0)} className="text-[9px] uppercase tracking-[0.4em] mb-6"
          style={{ color: '#be185d' }}>
          Wedding Invitation
        </motion.p>

        {/* Photo */}
        {data.couplePhotoUrl && (
          <motion.div variants={fade(0.05)} className="mb-6">
            <div className="w-24 h-24 rounded-full mx-auto overflow-hidden"
              style={{ border: '3px solid rgba(244,114,182,0.5)', boxShadow: '0 0 0 6px rgba(244,114,182,0.1), 0 8px 24px rgba(244,114,182,0.2)' }}>
              <img src={data.couplePhotoUrl} alt="" className="w-full h-full object-cover" crossOrigin="anonymous" />
            </div>
          </motion.div>
        )}

        {/* Names */}
        <motion.div variants={fade(0.1)} className="mb-2">
          <h1 className={`${greatVibes.className} text-6xl leading-tight`} style={{ color: '#9d174d' }}>
            {data.brideName}
          </h1>
          <div className="flex items-center gap-3 justify-center my-2">
            <div className="h-px flex-1" style={{ background: 'linear-gradient(to right, transparent, rgba(244,114,182,0.5))' }} />
            <span className={`${playfair.className} text-base italic`} style={{ color: '#f472b6' }}>&amp;</span>
            <div className="h-px flex-1" style={{ background: 'linear-gradient(to left, transparent, rgba(244,114,182,0.5))' }} />
          </div>
          <h1 className={`${greatVibes.className} text-6xl leading-tight`} style={{ color: '#9d174d' }}>
            {data.groomName}
          </h1>
        </motion.div>

        <FlowerDivider />

        {/* Details */}
        <motion.div variants={fade(0.18)} className="w-full space-y-3 mb-5">
          <p className={`${playfair.className} text-xl italic`} style={{ color: '#4a0520' }}>{data.weddingDate}</p>
          <p className="text-xs tracking-widest uppercase" style={{ color: '#be185d', opacity: 0.8 }}>{data.weddingTime}</p>
          <div className="pt-3" style={{ borderTop: '1px solid rgba(244,114,182,0.2)' }}>
            <p className={`${playfair.className} text-lg font-semibold`} style={{ color: '#4a0520' }}>{data.venueName}</p>
            <p className="text-sm mt-1 leading-relaxed" style={{ color: '#be185d', opacity: 0.75 }}>{data.venueAddress}</p>
          </div>
        </motion.div>

        {data.familyDetails && (
          <motion.p variants={fade(0.22)} className="text-xs italic mb-3" style={{ color: '#9d174d', opacity: 0.75 }}>
            {data.familyDetails}
          </motion.p>
        )}
        {data.additionalMessage && (
          <motion.p variants={fade(0.25)} className={`${greatVibes.className} text-2xl mb-3`} style={{ color: '#be185d' }}>
            "{data.additionalMessage}"
          </motion.p>
        )}

        <div className="flex-1 min-h-4" />

        {data.rsvpDetails && (
          <motion.div variants={fade(0.28)} className="text-[10px] uppercase tracking-widest mb-2" style={{ color: '#9d174d' }}>
            RSVP · {data.rsvpDetails}
          </motion.div>
        )}
        {data.contactNumber && (
          <motion.p variants={fade(0.3)} className="text-xs mb-2" style={{ color: '#be185d', opacity: 0.6 }}>
            {data.contactNumber}
          </motion.p>
        )}
      </motion.div>

      {!isPremium && (
        <>
          <div style={{ position: 'absolute', inset: 0, zIndex: 50, pointerEvents: 'none', overflow: 'hidden', display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '30px 20px', padding: '20px' }}>
            {Array.from({ length: 32 }).map((_, i) => (
              <span key={i} style={{ transform: 'rotate(-35deg)', fontSize: '11px', color: 'rgba(190,24,93,0.15)', fontWeight: 'bold', letterSpacing: '0.05em', userSelect: 'none', display: 'flex', alignItems: 'center', justifyContent: 'center', whiteSpace: 'nowrap' }}>InviteHub.in</span>
            ))}
          </div>
          <div style={{ position: 'relative', width: '100%', padding: '10px 0', backgroundColor: 'rgba(157,23,77,0.85)', zIndex: 51, textAlign: 'center' }}>
            <span style={{ fontSize: '13px', fontWeight: 700, color: '#fce7f3', letterSpacing: '0.03em', fontFamily: 'sans-serif' }}>🔒 Created with InviteHub.in — Upgrade to remove watermark</span>
          </div>
        </>
      )}
    </div>
  );
}
