'use client';

import { motion } from 'framer-motion';
import { DM_Sans, DM_Serif_Display } from 'next/font/google';

const dmSans = DM_Sans({ subsets: ['latin'], weight: ['300', '400', '500'] });
const dmSerif = DM_Serif_Display({ subsets: ['latin'], weight: '400', style: ['normal', 'italic'] });

export interface InvitationData {
  brideName: string; groomName: string; weddingDate: string; weddingTime: string;
  venueName: string; venueAddress: string; contactNumber?: string;
  additionalMessage?: string; couplePhotoUrl?: string; familyDetails?: string; rsvpDetails?: string;
}
export interface TemplateProps { data: InvitationData; isPremium?: boolean; }

const reveal = (delay = 0) => ({
  hidden: { opacity: 0, clipPath: 'inset(100% 0 0 0)' },
  show: { opacity: 1, clipPath: 'inset(0% 0 0 0)', transition: { duration: 0.7, delay, ease: 'easeOut' as const } },
});
const fade = (delay = 0) => ({ hidden: { opacity: 0, y: 14 }, show: { opacity: 1, y: 0, transition: { duration: 0.55, delay, ease: 'easeOut' as const } } });

export function InkBlushTemplate({ data, isPremium = false }: TemplateProps) {
  return (
    <div className={`relative overflow-hidden w-full max-w-[420px] min-h-[640px] mx-auto flex flex-col shadow-2xl ${dmSans.className}`}
      style={{ background: '#fff8f5' }}>

      {/* Large blush watercolour blobs */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        <div className="absolute -top-12 -left-12 w-64 h-64 rounded-full opacity-30"
          style={{ background: 'radial-gradient(circle, #f4a0b5 0%, transparent 70%)' }} />
        <div className="absolute -bottom-16 -right-16 w-80 h-80 rounded-full opacity-25"
          style={{ background: 'radial-gradient(circle, #c8a0e0 0%, transparent 70%)' }} />
        <div className="absolute top-[45%] left-1/2 -translate-x-1/2 w-48 h-48 rounded-full opacity-20"
          style={{ background: 'radial-gradient(circle, #f9c0a0 0%, transparent 70%)' }} />
      </div>

      {/* Thin frame */}
      <div className="absolute inset-6 pointer-events-none rounded-lg" style={{ border: '0.75px solid rgba(200,130,160,0.25)' }} />

      <motion.div className="relative z-10 flex-1 flex flex-col items-center px-10 pt-14 pb-8 text-center"
        initial="hidden" animate="show" variants={{ show: { transition: { staggerChildren: 0.1 } } }}>

        {/* Tag */}
        <motion.div variants={fade(0)}
          className="px-4 py-1.5 rounded-full mb-8 text-[9px] tracking-[0.4em] uppercase"
          style={{ background: 'rgba(244,160,181,0.2)', border: '1px solid rgba(244,160,181,0.4)', color: '#c06080' }}>
          Save The Date
        </motion.div>

        {/* Photo */}
        {data.couplePhotoUrl && (
          <motion.div variants={fade(0.05)} className="mb-5">
            <div className="w-28 h-28 rounded-full mx-auto overflow-hidden"
              style={{ border: '3px solid rgba(244,160,181,0.5)', boxShadow: '0 0 0 5px rgba(244,160,181,0.1), 0 8px 24px rgba(200,100,140,0.15)' }}>
              <img src={data.couplePhotoUrl} alt="" className="w-full h-full object-cover" crossOrigin="anonymous" />
            </div>
          </motion.div>
        )}

        {/* Names */}
        <motion.div variants={reveal(0.08)} className="mb-2 overflow-hidden">
          <h1 className={`${dmSerif.className} text-5xl italic text-[#4a2535] leading-tight`}>{data.brideName}</h1>
        </motion.div>
        <motion.div variants={fade(0.15)} className="flex items-center gap-4 mb-2">
          <div className="flex-1 h-px" style={{ background: 'linear-gradient(to right, transparent, rgba(200,130,160,0.4))' }} />
          <span className="text-[#c06080] text-sm">&amp;</span>
          <div className="flex-1 h-px" style={{ background: 'linear-gradient(to left, transparent, rgba(200,130,160,0.4))' }} />
        </motion.div>
        <motion.div variants={reveal(0.18)} className="overflow-hidden">
          <h1 className={`${dmSerif.className} text-5xl italic text-[#4a2535] leading-tight`}>{data.groomName}</h1>
        </motion.div>

        {/* Details row */}
        <motion.div variants={fade(0.24)} className="w-full mt-8 mb-5">
          <div className="grid grid-cols-3 gap-2 text-center mb-6">
            <div className="flex flex-col gap-1">
              <p className="text-[9px] uppercase tracking-widest text-[#c06080]">Date</p>
              <p className="text-[13px] font-medium text-[#4a2535] leading-snug">{data.weddingDate}</p>
            </div>
            <div className="flex flex-col gap-1 border-x border-[#f4a0b5]/30 px-2">
              <p className="text-[9px] uppercase tracking-widest text-[#c06080]">Time</p>
              <p className="text-[13px] font-medium text-[#4a2535]">{data.weddingTime}</p>
            </div>
            <div className="flex flex-col gap-1">
              <p className="text-[9px] uppercase tracking-widest text-[#c06080]">Venue</p>
              <p className="text-[13px] font-medium text-[#4a2535] leading-snug">{data.venueName}</p>
            </div>
          </div>
          <p className="text-xs text-[#8a5a70] leading-relaxed">{data.venueAddress}</p>
        </motion.div>

        <div className="flex-1 min-h-4" />

        {data.familyDetails && <motion.p variants={fade(0.28)} className="text-xs italic text-[#c06080] mb-3">{data.familyDetails}</motion.p>}
        {data.additionalMessage && (
          <motion.p variants={fade(0.3)} className={`${dmSerif.className} text-xl italic text-[#8a5070] mb-3`}>"{data.additionalMessage}"</motion.p>
        )}
        {data.rsvpDetails && <motion.p variants={fade(0.32)} className="text-[10px] uppercase tracking-widest text-[#c06080] mb-2">RSVP · {data.rsvpDetails}</motion.p>}
        {data.contactNumber && <motion.p variants={fade(0.34)} className="text-xs text-[#c06080]/60">{data.contactNumber}</motion.p>}
      </motion.div>

      {!isPremium && (
        <>
          <div style={{ position: 'absolute', inset: 0, zIndex: 50, pointerEvents: 'none', overflow: 'hidden', display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '30px 20px', padding: '20px' }}>
            {Array.from({ length: 32 }).map((_, i) => (
              <span key={i} style={{ transform: 'rotate(-35deg)', fontSize: '11px', color: 'rgba(200,130,160,0.2)', fontWeight: 'bold', letterSpacing: '0.05em', userSelect: 'none', display: 'flex', alignItems: 'center', justifyContent: 'center', whiteSpace: 'nowrap' }}>InviteHub.in</span>
            ))}
          </div>
          <div style={{ position: 'relative', width: '100%', padding: '10px 0', backgroundColor: 'rgba(192,96,128,0.85)', zIndex: 51, textAlign: 'center' }}>
            <span style={{ fontSize: '13px', fontWeight: 700, color: '#fff', letterSpacing: '0.03em', fontFamily: 'sans-serif' }}>🔒 Created with InviteHub.in — Upgrade to remove watermark</span>
          </div>
        </>
      )}
    </div>
  );
}
