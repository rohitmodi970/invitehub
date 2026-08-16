'use client';

import { motion } from 'framer-motion';
import { Yatra_One, Hind } from 'next/font/google';

const yatraOne = { className: '' };
const hind = { className: '' };

export interface InvitationData {
  brideName: string; groomName: string; weddingDate: string; weddingTime: string;
  venueName: string; venueAddress: string; contactNumber?: string;
  additionalMessage?: string; couplePhotoUrl?: string; familyDetails?: string; rsvpDetails?: string;
}
export interface TemplateProps { data: InvitationData; isPremium?: boolean; }

const fade = (delay = 0) => ({ hidden: { opacity: 0, y: 12 }, show: { opacity: 1, y: 0, transition: { duration: 0.55, delay, ease: 'easeOut' as const } } });

// Kohl/rangoli SVG strip
const RangoliStrip = () => (
  <svg width="340" height="18" viewBox="0 0 340 18" fill="none">
    {[0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map(i => (
      <g key={i} transform={`translate(${i * 32}, 0)`}>
        <polygon points="16,2 22,9 16,16 10,9" fill="#9b2335" opacity="0.7" />
        <polygon points="16,5 20,9 16,13 12,9" fill="#c8571a" opacity="0.5" />
        <circle cx="16" cy="9" r="2" fill="#d4a017" />
      </g>
    ))}
  </svg>
);

export function MarigoldFiestaTemplate({ data, isPremium = false }: TemplateProps) {
  return (
    <div className={`relative overflow-hidden w-full max-w-[420px] min-h-[640px] mx-auto flex flex-col shadow-2xl ${hind.className}`}
      style={{ background: 'linear-gradient(160deg, #fffbf0 0%, #fef3d0 50%, #fde8a8 100%)' }}>

      {/* Header chevron band */}
      <motion.div initial={{ y: -40, opacity: 0 }} animate={{ y: 0, opacity: 1 }} transition={{ duration: 0.6, ease: 'easeOut' as const }}
        className="relative w-full overflow-hidden" style={{ height: '100px', background: 'linear-gradient(135deg, #9b2335 0%, #c8571a 50%, #d4a017 100%)' }}>
        {/* Chevron cut */}
        <div className="absolute bottom-0 left-0 right-0" style={{ height: '30px' }}>
          <svg viewBox="0 0 420 30" preserveAspectRatio="none" className="w-full h-full">
            <polygon points="0,0 210,30 420,0 420,30 0,30" fill="#fffbf0" />
          </svg>
        </div>
        <p className={`${yatraOne.className} text-3xl text-[#fde8a8] text-center pt-5 drop-shadow-lg`}>
          🪔 विवाह महोत्सव 🪔
        </p>
      </motion.div>

      {/* Rangoli strip */}
      <div className="flex justify-center my-3 overflow-hidden">
        <RangoliStrip />
      </div>

      <motion.div className="relative z-10 flex-1 flex flex-col items-center px-8 pb-6 text-center"
        initial="hidden" animate="show" variants={{ show: { transition: { staggerChildren: 0.1 } } }}>

        <motion.p variants={fade(0)} className="text-xs text-[#9b2335] font-medium tracking-widest uppercase mb-3">
          With the blessings of God &amp; family
        </motion.p>

        {/* Photo */}
        {data.couplePhotoUrl && (
          <motion.div variants={fade(0.05)} className="mb-5">
            <div className="w-28 h-28 rounded-full mx-auto overflow-hidden relative"
              style={{ border: '4px double #d4a017', boxShadow: '0 0 0 2px #c8571a, 0 8px 20px rgba(155,35,53,0.2)' }}>
              <img src={data.couplePhotoUrl} alt="" className="w-full h-full object-cover" crossOrigin="anonymous" />
            </div>
            <div className="flex justify-center mt-2 gap-1 text-xl">✿ ✿ ✿</div>
          </motion.div>
        )}

        {/* Names */}
        <motion.div variants={fade(0.08)} className="mb-5">
          <h1 className={`${yatraOne.className} text-5xl text-[#9b2335] leading-tight`}
            style={{ textShadow: '2px 2px 0 rgba(212,160,23,0.4)' }}>
            {data.brideName}
          </h1>
          <p className="text-[#c8571a] text-base italic font-medium my-1">वधू — {' '}weds{' '} — वर</p>
          <h1 className={`${yatraOne.className} text-5xl text-[#9b2335] leading-tight`}
            style={{ textShadow: '2px 2px 0 rgba(212,160,23,0.4)' }}>
            {data.groomName}
          </h1>
        </motion.div>

        {/* Rangoli strip again */}
        <motion.div variants={fade(0.1)} className="overflow-hidden mb-5">
          <RangoliStrip />
        </motion.div>

        {/* Details block */}
        <motion.div variants={fade(0.14)} className="w-full max-w-xs rounded-2xl p-5 mb-4"
          style={{ background: 'rgba(155,35,53,0.08)', border: '1.5px solid rgba(212,160,23,0.4)' }}>
          <div className="space-y-3">
            <div className="flex gap-2 items-start text-left">
              <span>🗓️</span>
              <div><p className="text-[9px] uppercase tracking-widest text-[#c8571a]">Date</p><p className="text-sm font-semibold text-[#4a1500]">{data.weddingDate}</p></div>
            </div>
            <div className="flex gap-2 items-start text-left">
              <span>⏰</span>
              <div><p className="text-[9px] uppercase tracking-widest text-[#c8571a]">Time</p><p className="text-sm font-semibold text-[#4a1500]">{data.weddingTime}</p></div>
            </div>
            <div className="flex gap-2 items-start text-left">
              <span>📍</span>
              <div><p className="text-[9px] uppercase tracking-widest text-[#c8571a]">Venue</p>
                <p className="text-sm font-semibold text-[#4a1500]">{data.venueName}</p>
                <p className="text-xs text-[#9b2335]/70 mt-0.5">{data.venueAddress}</p>
              </div>
            </div>
          </div>
        </motion.div>

        <div className="flex-1" />
        {data.familyDetails && <motion.p variants={fade(0.2)} className="text-xs text-[#c8571a] italic mb-2">{data.familyDetails}</motion.p>}
        {data.additionalMessage && <motion.p variants={fade(0.22)} className="text-sm text-[#9b2335] italic mb-3">🌸 {data.additionalMessage} 🌸</motion.p>}
        {data.rsvpDetails && <motion.p variants={fade(0.24)} className="text-[10px] uppercase tracking-widest text-[#c8571a] mb-1">RSVP · {data.rsvpDetails}</motion.p>}
        {data.contactNumber && <motion.p variants={fade(0.26)} className="text-xs text-[#c8571a]/70">{data.contactNumber}</motion.p>}
      </motion.div>

      {/* Bottom chevron band */}
      <div className="relative w-full overflow-hidden" style={{ height: '50px', background: 'linear-gradient(135deg, #d4a017 0%, #c8571a 50%, #9b2335 100%)' }}>
        <div className="absolute top-0 left-0 right-0" style={{ height: '20px' }}>
          <svg viewBox="0 0 420 20" preserveAspectRatio="none" className="w-full h-full">
            <polygon points="0,20 210,0 420,20" fill="#fde8a8" />
          </svg>
        </div>
        <p className="text-center text-[#fde8a8]/80 text-xs tracking-wider pt-6">✿ ❊ ✿ ❊ ✿</p>
      </div>

      {!isPremium && (
        <>
          <div style={{ position: 'absolute', inset: 0, zIndex: 50, pointerEvents: 'none', overflow: 'hidden', display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '30px 20px', padding: '20px' }}>
            {Array.from({ length: 32 }).map((_, i) => (
              <span key={i} style={{ transform: 'rotate(-35deg)', fontSize: '11px', color: 'rgba(155,35,53,0.18)', fontWeight: 'bold', letterSpacing: '0.05em', userSelect: 'none', display: 'flex', alignItems: 'center', justifyContent: 'center', whiteSpace: 'nowrap' }}>InviteHub.in</span>
            ))}
          </div>
          <div style={{ position: 'relative', width: '100%', padding: '10px 0', backgroundColor: 'rgba(155,35,53,0.9)', zIndex: 51, textAlign: 'center' }}>
            <span style={{ fontSize: '13px', fontWeight: 700, color: '#fde8a8', letterSpacing: '0.03em', fontFamily: 'sans-serif' }}>🔒 Created with InviteHub.in — Upgrade to remove watermark</span>
          </div>
        </>
      )}
    </div>
  );
}
