'use client';

import { motion } from 'framer-motion';
import { Cormorant_Garamond, EB_Garamond } from 'next/font/google';

const cormorant = Cormorant_Garamond({ subsets: ['latin'], weight: ['300', '400', '600'], style: ['normal', 'italic'] });
const ebGaramond = EB_Garamond({ subsets: ['latin'], weight: ['400', '700'], style: ['italic', 'normal'] });

export interface InvitationData {
  brideName: string; groomName: string; weddingDate: string; weddingTime: string;
  venueName: string; venueAddress: string; contactNumber?: string;
  additionalMessage?: string; couplePhotoUrl?: string; familyDetails?: string; rsvpDetails?: string;
}
export interface TemplateProps { data: InvitationData; isPremium?: boolean; }

const fade = (delay = 0) => ({ hidden: { opacity: 0, y: 12 }, show: { opacity: 1, y: 0, transition: { duration: 0.7, delay, ease: 'easeOut' as const } } });

// SVG botanical sprigs
const SprigLeft = () => (
  <svg width="70" height="90" viewBox="0 0 70 90" fill="none">
    <path d="M35 85 Q20 60 10 40 Q5 25 15 15" stroke="#7a9a6a" strokeWidth="1.2" fill="none" strokeLinecap="round" />
    <ellipse cx="10" cy="38" rx="12" ry="7" fill="#9ab888" opacity="0.7" transform="rotate(-30 10 38)" />
    <ellipse cx="18" cy="20" rx="10" ry="6" fill="#7a9a6a" opacity="0.6" transform="rotate(-50 18 20)" />
    <ellipse cx="22" cy="55" rx="13" ry="7" fill="#b5d4a0" opacity="0.5" transform="rotate(-15 22 55)" />
    <ellipse cx="30" cy="70" rx="11" ry="5" fill="#9ab888" opacity="0.5" transform="rotate(10 30 70)" />
  </svg>
);
const SprigRight = () => (
  <svg width="70" height="90" viewBox="0 0 70 90" fill="none">
    <path d="M35 85 Q50 60 60 40 Q65 25 55 15" stroke="#7a9a6a" strokeWidth="1.2" fill="none" strokeLinecap="round" />
    <ellipse cx="60" cy="38" rx="12" ry="7" fill="#9ab888" opacity="0.7" transform="rotate(30 60 38)" />
    <ellipse cx="52" cy="20" rx="10" ry="6" fill="#7a9a6a" opacity="0.6" transform="rotate(50 52 20)" />
    <ellipse cx="48" cy="55" rx="13" ry="7" fill="#b5d4a0" opacity="0.5" transform="rotate(15 48 55)" />
    <ellipse cx="40" cy="70" rx="11" ry="5" fill="#9ab888" opacity="0.5" transform="rotate(-10 40 70)" />
  </svg>
);

export function BotanicalGardenTemplate({ data, isPremium = false }: TemplateProps) {
  return (
    <div className={`relative overflow-hidden w-full max-w-[420px] min-h-[640px] mx-auto flex flex-col shadow-2xl ${cormorant.className}`}
      style={{ background: 'linear-gradient(170deg, #fafdf7 0%, #f0f7ec 40%, #e8f2e0 100%)' }}>

      {/* Top botanical arch */}
      <div className="absolute top-0 left-0 right-0 flex justify-between items-start px-2 pt-2 pointer-events-none z-0">
        <SprigLeft />
        <svg width="120" height="60" viewBox="0 0 120 60">
          <ellipse cx="60" cy="-10" rx="70" ry="50" fill="#c8e6b0" opacity="0.3" />
        </svg>
        <SprigRight />
      </div>

      {/* Border */}
      <div className="absolute inset-5 pointer-events-none rounded-sm" style={{ border: '1px solid rgba(122,154,106,0.3)' }} />

      <motion.div className="relative z-10 flex-1 flex flex-col items-center px-12 pt-20 pb-8 text-center"
        initial="hidden" animate="show" variants={{ show: { transition: { staggerChildren: 0.13 } } }}>

        <motion.p variants={fade()} className="text-[10px] tracking-[0.4em] uppercase text-[#7a9a6a] mb-4">
          An Invitation to Celebrate
        </motion.p>

        {/* Photo */}
        {data.couplePhotoUrl && (
          <motion.div variants={fade(0.05)} className="mb-5">
            <div className="w-24 h-24 rounded-full mx-auto overflow-hidden" style={{ border: '2px solid #9ab888', boxShadow: '0 0 0 4px rgba(154,184,136,0.2)' }}>
              <img src={data.couplePhotoUrl} alt="" className="w-full h-full object-cover" crossOrigin="anonymous" />
            </div>
          </motion.div>
        )}

        {/* Names */}
        <motion.div variants={fade(0.08)} className="mb-4">
          <h1 className={`${ebGaramond.className} text-5xl italic text-[#3d5c30] font-normal leading-tight`}>
            {data.brideName}
          </h1>
          <div className="text-[#9ab888] text-2xl my-1">✦</div>
          <h1 className={`${ebGaramond.className} text-5xl italic text-[#3d5c30] font-normal leading-tight`}>
            {data.groomName}
          </h1>
        </motion.div>

        <motion.div variants={fade(0.12)} className="w-full flex items-center gap-3 mb-6">
          <div className="flex-1 h-px bg-[#9ab888] opacity-40" />
          <svg width="28" height="28" viewBox="0 0 28 28"><circle cx="14" cy="14" r="6" fill="#7a9a6a" opacity="0.5"/><circle cx="14" cy="14" r="2.5" fill="#3d5c30"/></svg>
          <div className="flex-1 h-px bg-[#9ab888] opacity-40" />
        </motion.div>

        <motion.div variants={fade(0.15)} className="w-full mb-6 space-y-2">
          <p className={`${ebGaramond.className} text-2xl italic text-[#3d5c30]`}>{data.weddingDate}</p>
          <p className="text-sm tracking-[0.2em] uppercase text-[#7a9a6a]">{data.weddingTime}</p>
          <div className="pt-4 border-t border-[#c8ddc0] mt-4">
            <p className="text-lg font-semibold text-[#3d5c30]">{data.venueName}</p>
            <p className="text-sm text-[#7a9a6a] mt-1">{data.venueAddress}</p>
          </div>
        </motion.div>

        <div className="flex-1 min-h-4" />

        {data.familyDetails && <motion.p variants={fade(0.2)} className="text-sm italic text-[#7a9a6a] mb-3">{data.familyDetails}</motion.p>}
        {data.additionalMessage && <motion.p variants={fade(0.22)} className={`${ebGaramond.className} text-xl italic text-[#5a7a4a] mb-3`}>"{data.additionalMessage}"</motion.p>}
        {data.rsvpDetails && <motion.p variants={fade(0.25)} className="text-xs uppercase tracking-widest text-[#9ab888] mb-2">RSVP · {data.rsvpDetails}</motion.p>}
        {data.contactNumber && <motion.p variants={fade(0.27)} className="text-xs text-[#9ab888]">{data.contactNumber}</motion.p>}
      </motion.div>

      {/* Bottom botanical */}
      <div className="absolute bottom-[52px] left-0 right-0 flex justify-between items-end px-2 pb-2 pointer-events-none z-0 rotate-180">
        <SprigLeft />
        <SprigRight />
      </div>

      {!isPremium && (
        <>
          <div style={{ position: 'absolute', inset: 0, zIndex: 50, pointerEvents: 'none', overflow: 'hidden', display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '30px 20px', padding: '20px' }}>
            {Array.from({ length: 32 }).map((_, i) => (
              <span key={i} style={{ transform: 'rotate(-35deg)', fontSize: '11px', color: 'rgba(122,154,106,0.15)', fontWeight: 'bold', letterSpacing: '0.05em', userSelect: 'none', display: 'flex', alignItems: 'center', justifyContent: 'center', whiteSpace: 'nowrap' }}>InviteHub.in</span>
            ))}
          </div>
          <div style={{ position: 'relative', width: '100%', padding: '10px 0', backgroundColor: 'rgba(61,92,48,0.8)', zIndex: 51, textAlign: 'center' }}>
            <span style={{ fontSize: '13px', fontWeight: 700, color: '#9ab888', letterSpacing: '0.03em', fontFamily: 'sans-serif' }}>🔒 Created with InviteHub.in — Upgrade to remove watermark</span>
          </div>
        </>
      )}
    </div>
  );
}
