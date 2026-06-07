'use client';

import { motion } from 'framer-motion';
import { Great_Vibes, EB_Garamond, Lato } from 'next/font/google';

const greatVibes = Great_Vibes({ subsets: ['latin'], weight: '400' });
const garamond = EB_Garamond({ subsets: ['latin'], weight: ['400', '500', '600'], style: ['italic', 'normal'] });
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

// Pastel leaf sprigs — top left
const LeafSprigTL = () => (
  <svg width="140" height="160" viewBox="0 0 140 160" fill="none" className="absolute top-0 left-0 pointer-events-none">
    {/* Main stem */}
    <path d="M10 160 Q30 120 35 80 Q38 50 30 10" stroke="#a7c4a0" strokeWidth="1.5" fill="none" opacity="0.7" />
    {/* Leaves */}
    <ellipse cx="22" cy="130" rx="12" ry="6" fill="#c5dfc0" opacity="0.55" transform="rotate(-30 22 130)" />
    <ellipse cx="38" cy="110" rx="10" ry="5" fill="#a7c4a0" opacity="0.5" transform="rotate(25 38 110)" />
    <ellipse cx="25" cy="90" rx="11" ry="5.5" fill="#d4e8cf" opacity="0.6" transform="rotate(-20 25 90)" />
    <ellipse cx="40" cy="70" rx="9" ry="4.5" fill="#b5d4ad" opacity="0.5" transform="rotate(30 40 70)" />
    <ellipse cx="28" cy="50" rx="10" ry="5" fill="#c5dfc0" opacity="0.5" transform="rotate(-35 28 50)" />
    <ellipse cx="35" cy="30" rx="8" ry="4" fill="#a7c4a0" opacity="0.45" transform="rotate(20 35 30)" />
    {/* Small pastel flowers */}
    <circle cx="15" cy="120" r="4" fill="#f9c0d0" opacity="0.5" />
    <circle cx="45" cy="85" r="3.5" fill="#c9b8e8" opacity="0.45" />
    <circle cx="20" cy="40" r="3" fill="#fde68a" opacity="0.5" />
    <circle cx="50" cy="55" r="2.5" fill="#f9c0d0" opacity="0.4" />
  </svg>
);

// Bottom right mirror
const LeafSprigBR = () => (
  <svg width="130" height="150" viewBox="0 0 140 160" fill="none" className="absolute bottom-0 right-0 pointer-events-none" style={{ transform: 'rotate(180deg)' }}>
    <path d="M10 160 Q30 120 35 80 Q38 50 30 10" stroke="#a7c4a0" strokeWidth="1.5" fill="none" opacity="0.6" />
    <ellipse cx="22" cy="130" rx="12" ry="6" fill="#c5dfc0" opacity="0.5" transform="rotate(-30 22 130)" />
    <ellipse cx="38" cy="110" rx="10" ry="5" fill="#a7c4a0" opacity="0.45" transform="rotate(25 38 110)" />
    <ellipse cx="25" cy="90" rx="11" ry="5.5" fill="#d4e8cf" opacity="0.55" transform="rotate(-20 25 90)" />
    <ellipse cx="40" cy="70" rx="9" ry="4.5" fill="#b5d4ad" opacity="0.45" transform="rotate(30 40 70)" />
    <ellipse cx="28" cy="50" rx="10" ry="5" fill="#c5dfc0" opacity="0.45" transform="rotate(-35 28 50)" />
    <circle cx="15" cy="120" r="4" fill="#f9c0d0" opacity="0.45" />
    <circle cx="45" cy="85" r="3.5" fill="#c9b8e8" opacity="0.4" />
    <circle cx="20" cy="40" r="3" fill="#fde68a" opacity="0.45" />
  </svg>
);

// Small top-right accent sprig
const SmallSprigTR = () => (
  <svg width="80" height="90" viewBox="0 0 80 90" fill="none" className="absolute top-2 right-2 pointer-events-none">
    <path d="M70 90 Q55 60 60 30 Q62 15 55 0" stroke="#b5d4ad" strokeWidth="1" fill="none" opacity="0.5" />
    <ellipse cx="65" cy="70" rx="8" ry="4" fill="#d4e8cf" opacity="0.5" transform="rotate(30 65 70)" />
    <ellipse cx="55" cy="50" rx="7" ry="3.5" fill="#c5dfc0" opacity="0.45" transform="rotate(-20 55 50)" />
    <ellipse cx="62" cy="30" rx="6" ry="3" fill="#a7c4a0" opacity="0.4" transform="rotate(25 62 30)" />
    <circle cx="50" cy="60" r="3" fill="#c9b8e8" opacity="0.4" />
  </svg>
);

// Botanical divider
const GardenDivider = () => (
  <div className="flex items-center justify-center w-full my-4">
    <div className="flex-1 h-px" style={{ background: 'linear-gradient(to right, transparent, rgba(167,196,160,0.5))' }} />
    <svg width="40" height="20" viewBox="0 0 40 20" className="mx-2">
      <ellipse cx="14" cy="10" rx="6" ry="3.5" fill="#c5dfc0" opacity="0.7" transform="rotate(-30 14 10)" />
      <ellipse cx="26" cy="10" rx="6" ry="3.5" fill="#c5dfc0" opacity="0.7" transform="rotate(30 26 10)" />
      <circle cx="20" cy="10" r="3" fill="#f9c0d0" opacity="0.6" />
    </svg>
    <div className="flex-1 h-px" style={{ background: 'linear-gradient(to left, transparent, rgba(167,196,160,0.5))' }} />
  </div>
);

export function PastelGardenTemplate({ data, isPremium = false }: TemplateProps) {
  return (
    <div className={`relative overflow-hidden w-full max-w-[420px] min-h-[640px] mx-auto flex flex-col shadow-2xl ${lato.className}`}
      style={{ background: 'linear-gradient(170deg, #fefcf9 0%, #f4f9f2 40%, #fcf5f8 80%, #fefcf9 100%)' }}>

      <LeafSprigTL />
      <LeafSprigBR />
      <SmallSprigTR />

      {/* Double border frame */}
      <div className="absolute inset-5 pointer-events-none" style={{ border: '1px solid rgba(167,196,160,0.25)' }} />
      <div className="absolute inset-[22px] pointer-events-none" style={{ border: '0.5px solid rgba(167,196,160,0.15)' }} />

      <motion.div className="relative z-10 flex-1 flex flex-col items-center px-10 pt-14 pb-8 text-center"
        initial="hidden" animate="show" variants={{ show: { transition: { staggerChildren: 0.11 } } }}>

        {/* Label */}
        <motion.p variants={fade(0)} className="text-[9px] uppercase tracking-[0.4em] mb-6"
          style={{ color: '#8aab82' }}>
          Garden Wedding
        </motion.p>

        {/* Photo */}
        {data.couplePhotoUrl && (
          <motion.div variants={fade(0.05)} className="mb-6">
            <div className="w-24 h-24 rounded-full mx-auto overflow-hidden"
              style={{ border: '2.5px solid rgba(167,196,160,0.5)', boxShadow: '0 0 0 5px rgba(167,196,160,0.1), 0 8px 24px rgba(100,140,90,0.12)' }}>
              <img src={data.couplePhotoUrl} alt="" className="w-full h-full object-cover" crossOrigin="anonymous" />
            </div>
          </motion.div>
        )}

        {/* Names */}
        <motion.div variants={fade(0.1)} className="mb-1">
          <h1 className={`${greatVibes.className} text-[56px] leading-tight`} style={{ color: '#5a7a52' }}>
            {data.brideName}
          </h1>
          <div className="flex items-center gap-3 justify-center my-2">
            <div className="h-px flex-1" style={{ background: 'linear-gradient(to right, transparent, rgba(167,196,160,0.5))' }} />
            <span className={`${garamond.className} text-base italic`} style={{ color: '#a7c4a0' }}>&amp;</span>
            <div className="h-px flex-1" style={{ background: 'linear-gradient(to left, transparent, rgba(167,196,160,0.5))' }} />
          </div>
          <h1 className={`${greatVibes.className} text-[56px] leading-tight`} style={{ color: '#5a7a52' }}>
            {data.groomName}
          </h1>
        </motion.div>

        <GardenDivider />

        {/* Details */}
        <motion.div variants={fade(0.18)} className="w-full space-y-3 mb-5">
          <p className={`${garamond.className} text-xl italic`} style={{ color: '#3a5a32' }}>{data.weddingDate}</p>
          <p className="text-xs tracking-widest uppercase" style={{ color: '#8aab82' }}>{data.weddingTime}</p>
          <div className="pt-3" style={{ borderTop: '1px solid rgba(167,196,160,0.25)' }}>
            <p className={`${garamond.className} text-lg font-semibold`} style={{ color: '#3a5a32' }}>{data.venueName}</p>
            <p className="text-sm mt-1 leading-relaxed" style={{ color: '#6a8a62', opacity: 0.85 }}>{data.venueAddress}</p>
          </div>
        </motion.div>

        {data.familyDetails && (
          <motion.p variants={fade(0.22)} className="text-xs italic mb-3" style={{ color: '#6a8a62', opacity: 0.75 }}>
            {data.familyDetails}
          </motion.p>
        )}
        {data.additionalMessage && (
          <motion.p variants={fade(0.25)} className={`${greatVibes.className} text-2xl mb-3`} style={{ color: '#8aab82' }}>
            &ldquo;{data.additionalMessage}&rdquo;
          </motion.p>
        )}

        <div className="flex-1 min-h-4" />

        {data.rsvpDetails && (
          <motion.div variants={fade(0.28)} className="px-5 py-2 rounded-full mb-3"
            style={{ background: 'rgba(197,223,192,0.3)', border: '0.75px solid rgba(167,196,160,0.35)' }}>
            <p className="text-[10px] uppercase tracking-widest" style={{ color: '#5a7a52' }}>RSVP · {data.rsvpDetails}</p>
          </motion.div>
        )}
        {data.contactNumber && (
          <motion.p variants={fade(0.3)} className="text-xs" style={{ color: '#8aab82', opacity: 0.65 }}>
            {data.contactNumber}
          </motion.p>
        )}
      </motion.div>

      {!isPremium && (
        <>
          <div style={{ position: 'absolute', inset: 0, zIndex: 50, pointerEvents: 'none', overflow: 'hidden', display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '30px 20px', padding: '20px' }}>
            {Array.from({ length: 32 }).map((_, i) => (
              <span key={i} style={{ transform: 'rotate(-35deg)', fontSize: '11px', color: 'rgba(90,122,82,0.15)', fontWeight: 'bold', letterSpacing: '0.05em', userSelect: 'none', display: 'flex', alignItems: 'center', justifyContent: 'center', whiteSpace: 'nowrap' }}>InviteHub.in</span>
            ))}
          </div>
          <div style={{ position: 'relative', width: '100%', padding: '10px 0', backgroundColor: 'rgba(58,90,50,0.88)', zIndex: 51, textAlign: 'center' }}>
            <span style={{ fontSize: '13px', fontWeight: 700, color: '#d4e8cf', letterSpacing: '0.03em', fontFamily: 'sans-serif' }}>🔒 Created with InviteHub.in — Upgrade to remove watermark</span>
          </div>
        </>
      )}
    </div>
  );
}
