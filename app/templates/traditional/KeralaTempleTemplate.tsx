'use client';

import { motion } from 'framer-motion';
import { Noto_Serif, Noto_Sans } from 'next/font/google';

const notoSerif = { className: '' };
const notoSans = { className: '' };

export interface InvitationData {
  brideName: string; groomName: string; weddingDate: string; weddingTime: string;
  venueName: string; venueAddress: string; contactNumber?: string;
  additionalMessage?: string; couplePhotoUrl?: string; familyDetails?: string; rsvpDetails?: string;
}
export interface TemplateProps { data: InvitationData; isPremium?: boolean; }

const fade = (delay = 0) => ({ hidden: { opacity: 0, y: 12 }, show: { opacity: 1, y: 0, transition: { duration: 0.6, delay, ease: 'easeOut' as const } } });

// Intricate corner mandala SVG
const MandalaCorner = ({ className, style }: { className?: string; style?: React.CSSProperties }) => (
  <svg className={className} style={style} width="64" height="64" viewBox="0 0 64 64" fill="none">
    <circle cx="8" cy="8" r="6" stroke="#8b4513" strokeWidth="0.8" fill="none" opacity="0.5"/>
    <path d="M8 2 L14 8 L8 14 L2 8 Z" stroke="#c8860a" strokeWidth="0.7" fill="rgba(200,134,10,0.1)"/>
    <path d="M2 8 Q8 0 14 8 Q8 16 2 8Z" stroke="#8b4513" strokeWidth="0.5" fill="rgba(139,69,19,0.08)" opacity="0.7"/>
    <line x1="14" y1="8" x2="40" y2="8" stroke="#c8860a" strokeWidth="0.5" opacity="0.4"/>
    <line x1="8" y1="14" x2="8" y2="40" stroke="#c8860a" strokeWidth="0.5" opacity="0.4"/>
    <circle cx="32" cy="8" r="2" fill="#c8860a" opacity="0.4"/>
    <circle cx="8" cy="32" r="2" fill="#c8860a" opacity="0.4"/>
  </svg>
);

export function KeralaTempleTemplate({ data, isPremium = false }: TemplateProps) {
  return (
    <div className={`relative overflow-hidden w-full max-w-[420px] min-h-[640px] mx-auto flex flex-col shadow-2xl ${notoSans.className}`}
      style={{ background: 'linear-gradient(160deg, #fdf6e8 0%, #f9edcc 50%, #f4e4b0 100%)' }}>

      {/* Corner mandala motifs */}
      <MandalaCorner className="absolute top-3 left-3 pointer-events-none" />
      <MandalaCorner className="absolute top-3 right-3 pointer-events-none" style={{ transform: 'scaleX(-1)' } as React.CSSProperties} />
      <MandalaCorner className="absolute bottom-[52px] left-3 pointer-events-none" style={{ transform: 'scaleY(-1)' } as React.CSSProperties} />
      <MandalaCorner className="absolute bottom-[52px] right-3 pointer-events-none" style={{ transform: 'scale(-1,-1)' } as React.CSSProperties} />

      {/* Frame border */}
      <div className="absolute inset-6 pointer-events-none" style={{ border: '1.5px solid rgba(139,69,19,0.3)' }} />
      <div className="absolute inset-8 pointer-events-none" style={{ border: '0.5px solid rgba(200,134,10,0.2)' }} />

      {/* Top temple arch */}
      <div className="w-full pointer-events-none" style={{ height: '60px' }}>
        <svg viewBox="0 0 420 60" preserveAspectRatio="none" className="w-full h-full">
          <rect x="0" y="0" width="420" height="60" fill="#8b4513" />
          <ellipse cx="210" cy="60" rx="170" ry="35" fill="#fdf6e8" />
          <rect x="0" y="48" width="80" height="12" fill="#fdf6e8" />
          <rect x="340" y="48" width="80" height="12" fill="#fdf6e8" />
          {/* Temple pillars */}
          <rect x="30" y="5" width="12" height="50" fill="rgba(244,228,176,0.3)" rx="2"/>
          <rect x="378" y="5" width="12" height="50" fill="rgba(244,228,176,0.3)" rx="2"/>
          <path d="M100 48 Q120 0 150 2 Q180 4 210 8 Q240 4 270 2 Q300 0 320 48" stroke="rgba(200,134,10,0.6)" strokeWidth="0.8" fill="none"/>
        </svg>
      </div>

      <motion.div className="relative z-10 flex-1 flex flex-col items-center px-10 pt-4 pb-6 text-center"
        initial="hidden" animate="show" variants={{ show: { transition: { staggerChildren: 0.1 } } }}>

        <motion.p variants={fade(0)} className="text-3xl text-[#8b4513] mb-1">🕉️</motion.p>
        <motion.p variants={fade(0.03)} className={`${notoSerif.className} text-xs tracking-[0.3em] uppercase text-[#8b4513]/60 italic mb-4`}>
          Auspicious Wedding Ceremony
        </motion.p>

        {/* Photo */}
        {data.couplePhotoUrl && (
          <motion.div variants={fade(0.06)} className="mb-5">
            <div className="w-24 h-24 rounded-full mx-auto overflow-hidden"
              style={{ border: '3px solid #c8860a', boxShadow: '0 0 0 3px rgba(200,134,10,0.2), 0 4px 16px rgba(139,69,19,0.2)' }}>
              <img src={data.couplePhotoUrl} alt="" className="w-full h-full object-cover" crossOrigin="anonymous" />
            </div>
          </motion.div>
        )}

        {/* Names */}
        <motion.div variants={fade(0.1)} className="mb-5">
          <h1 className={`${notoSerif.className} text-4xl font-bold text-[#5a2d0c] italic`}>{data.brideName}</h1>
          <div className="flex items-center gap-3 my-2 justify-center">
            <div className="flex-1 h-px" style={{ background: 'linear-gradient(to right, transparent, #c8860a)' }} />
            <span className="text-[#c8860a] text-sm">✦</span>
            <div className="flex-1 h-px" style={{ background: 'linear-gradient(to left, transparent, #c8860a)' }} />
          </div>
          <h1 className={`${notoSerif.className} text-4xl font-bold text-[#5a2d0c] italic`}>{data.groomName}</h1>
        </motion.div>

        {/* Golden divider */}
        <motion.div variants={fade(0.13)} className="w-full flex justify-center mb-5">
          <svg width="200" height="16" viewBox="0 0 200 16">
            <line x1="0" y1="8" x2="80" y2="8" stroke="#c8860a" strokeWidth="0.7" />
            <circle cx="100" cy="8" r="4" fill="#c8860a" />
            <circle cx="88" cy="8" r="2" fill="#8b4513" />
            <circle cx="112" cy="8" r="2" fill="#8b4513" />
            <line x1="120" y1="8" x2="200" y2="8" stroke="#c8860a" strokeWidth="0.7" />
          </svg>
        </motion.div>

        {/* Details */}
        <motion.div variants={fade(0.16)} className="w-full space-y-3 mb-5">
          <div className="grid grid-cols-2 gap-4">
            <div className="text-left">
              <p className="text-[9px] uppercase tracking-widest text-[#c8860a] mb-0.5">Date</p>
              <p className={`${notoSerif.className} text-sm font-bold text-[#5a2d0c]`}>{data.weddingDate}</p>
            </div>
            <div className="text-left">
              <p className="text-[9px] uppercase tracking-widest text-[#c8860a] mb-0.5">Time</p>
              <p className={`${notoSerif.className} text-sm font-bold text-[#5a2d0c]`}>{data.weddingTime}</p>
            </div>
          </div>
          <div className="h-px bg-[#c8860a]/20" />
          <div className="text-left">
            <p className="text-[9px] uppercase tracking-widest text-[#c8860a] mb-0.5">Venue</p>
            <p className={`${notoSerif.className} text-sm font-bold text-[#5a2d0c]`}>{data.venueName}</p>
            <p className="text-xs text-[#8b4513]/60 mt-0.5">{data.venueAddress}</p>
          </div>
        </motion.div>

        <div className="flex-1" />
        {data.familyDetails && <motion.p variants={fade(0.2)} className="text-xs text-[#8b4513]/70 italic mb-2">{data.familyDetails}</motion.p>}
        {data.additionalMessage && <motion.p variants={fade(0.22)} className={`${notoSerif.className} text-base italic text-[#8b4513] mb-3`}>"{data.additionalMessage}"</motion.p>}
        {data.rsvpDetails && <motion.p variants={fade(0.24)} className="text-[10px] uppercase tracking-widest text-[#c8860a] mb-1">RSVP · {data.rsvpDetails}</motion.p>}
        {data.contactNumber && <motion.p variants={fade(0.26)} className="text-xs text-[#8b4513]/60">{data.contactNumber}</motion.p>}
      </motion.div>

      {/* Bottom temple band */}
      <div className="w-full" style={{ height: '50px', background: '#8b4513' }}>
        <svg viewBox="0 0 420 50" preserveAspectRatio="none" className="w-full h-full">
          <ellipse cx="210" cy="0" rx="180" ry="30" fill="#f4e4b0" />
          <rect x="0" y="0" width="60" height="12" fill="#f4e4b0" />
          <rect x="360" y="0" width="60" height="12" fill="#f4e4b0" />
          <text x="210" y="38" textAnchor="middle" fill="rgba(244,228,176,0.7)" fontSize="14" fontFamily="serif">✦  ✦  ✦</text>
        </svg>
      </div>

      {!isPremium && (
        <>
          <div style={{ position: 'absolute', inset: 0, zIndex: 50, pointerEvents: 'none', overflow: 'hidden', display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '30px 20px', padding: '20px' }}>
            {Array.from({ length: 32 }).map((_, i) => (
              <span key={i} style={{ transform: 'rotate(-35deg)', fontSize: '11px', color: 'rgba(139,69,19,0.15)', fontWeight: 'bold', letterSpacing: '0.05em', userSelect: 'none', display: 'flex', alignItems: 'center', justifyContent: 'center', whiteSpace: 'nowrap' }}>InviteHub.in</span>
            ))}
          </div>
          <div style={{ position: 'relative', width: '100%', padding: '10px 0', backgroundColor: 'rgba(90,45,12,0.95)', zIndex: 51, textAlign: 'center' }}>
            <span style={{ fontSize: '13px', fontWeight: 700, color: '#c8860a', letterSpacing: '0.03em', fontFamily: 'sans-serif' }}>🔒 Created with InviteHub.in — Upgrade to remove watermark</span>
          </div>
        </>
      )}
    </div>
  );
}
