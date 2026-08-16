'use client';

import { motion } from 'framer-motion';
import { Syne, Instrument_Serif } from 'next/font/google';

const syne = { className: '' };
const instrumentSerif = { className: '' };

export interface InvitationData {
  brideName: string; groomName: string; weddingDate: string; weddingTime: string;
  venueName: string; venueAddress: string; contactNumber?: string;
  additionalMessage?: string; couplePhotoUrl?: string; familyDetails?: string; rsvpDetails?: string;
}
export interface TemplateProps { data: InvitationData; isPremium?: boolean; }

export function TypewriterNeoBrutalTemplate({ data, isPremium = false }: TemplateProps) {
  const containerVariants = { hidden: { opacity: 0 }, show: { opacity: 1, transition: { staggerChildren: 0.08 } } };
  const item = { hidden: { opacity: 0, x: -20 }, show: { opacity: 1, x: 0, transition: { duration: 0.5, ease: 'easeOut' as const } } };

  return (
    <div className={`relative overflow-hidden w-full max-w-[420px] min-h-[640px] mx-auto flex flex-col shadow-2xl ${syne.className}`}
      style={{ background: '#fffdf7', borderTop: '4px solid #0d0d0d', borderLeft: '4px solid #0d0d0d' }}>

      {/* Bold offset shadow frame */}
      <div className="absolute inset-0 pointer-events-none" style={{ boxShadow: 'inset -4px -4px 0 #0d0d0d' }} />

      {/* Accent horizontal bars */}
      <div className="absolute top-0 left-0 right-0 h-1.5 bg-[#0d0d0d]" />
      <motion.div initial={{ scaleX: 0 }} animate={{ scaleX: 1 }} transition={{ duration: 0.8, ease: 'easeOut' as const }}
        className="absolute top-10 left-8 right-8 h-[2px] origin-left"
        style={{ background: '#0d0d0d' }} />

      <motion.div className="relative z-10 flex-1 flex flex-col px-8 pt-16 pb-8"
        variants={containerVariants} initial="hidden" animate="show">

        {/* Label */}
        <motion.div variants={item} className="mb-6 flex items-center gap-3">
          <div className="px-3 py-1 bg-[#0d0d0d] text-[#fffdf7] text-[9px] tracking-[0.4em] uppercase">{data.weddingDate}</div>
        </motion.div>

        {/* Large Names */}
        <motion.div variants={item} className="mb-2">
          <h1 className="text-[48px] sm:text-[56px] font-extrabold leading-[0.92] uppercase tracking-tighter text-[#0d0d0d]">
            {data.brideName}
          </h1>
        </motion.div>
        <motion.div variants={item} className={`${instrumentSerif.className} text-3xl italic text-[#555] mb-2`}>
          &amp;
        </motion.div>
        <motion.div variants={item} className="mb-6">
          <h1 className="text-[48px] sm:text-[56px] font-extrabold leading-[0.92] uppercase tracking-tighter text-[#0d0d0d]">
            {data.groomName}
          </h1>
        </motion.div>

        {/* Bold divider */}
        <motion.div variants={item} className="mb-6 h-0.5 bg-[#0d0d0d]" />

        {/* Details in tabular layout */}
        <motion.div variants={item} className="mb-5 space-y-3">
          {[
            { key: '⏰', label: 'TIME', value: data.weddingTime },
            { key: '📍', label: 'VENUE', value: `${data.venueName} · ${data.venueAddress}` },
          ].map(row => (
            <div key={row.label} className="flex items-start gap-4">
              <span className="text-[10px] tracking-widest font-bold text-[#0d0d0d] mt-0.5 min-w-[50px]">{row.label}</span>
              <p className="text-sm text-[#333] leading-snug">{row.value}</p>
            </div>
          ))}
        </motion.div>

        {/* Photo — raw, no rounded */}
        {data.couplePhotoUrl && (
          <motion.div variants={item} className="mb-5">
            <div className="w-full h-40 overflow-hidden" style={{ border: '2px solid #0d0d0d' }}>
              <img src={data.couplePhotoUrl} alt="" className="w-full h-full object-cover" crossOrigin="anonymous" />
            </div>
          </motion.div>
        )}

        <div className="flex-1" />

        {data.additionalMessage && (
          <motion.p variants={item} className={`${instrumentSerif.className} text-xl italic text-[#555] mb-3`}>"{data.additionalMessage}"</motion.p>
        )}

        <motion.div variants={item} className="flex items-center justify-between pt-4 border-t-2 border-[#0d0d0d]">
          {data.rsvpDetails && <span className="text-[10px] tracking-widest uppercase text-[#555]">RSVP · {data.rsvpDetails}</span>}
          {data.contactNumber && <span className="text-[10px] text-[#555]">{data.contactNumber}</span>}
        </motion.div>
      </motion.div>

      {!isPremium && (
        <>
          <div style={{ position: 'absolute', inset: 0, zIndex: 50, pointerEvents: 'none', overflow: 'hidden', display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '30px 20px', padding: '20px' }}>
            {Array.from({ length: 32 }).map((_, i) => (
              <span key={i} style={{ transform: 'rotate(-35deg)', fontSize: '11px', color: 'rgba(13,13,13,0.08)', fontWeight: 'bold', letterSpacing: '0.05em', userSelect: 'none', display: 'flex', alignItems: 'center', justifyContent: 'center', whiteSpace: 'nowrap' }}>InviteHub.in</span>
            ))}
          </div>
          <div style={{ position: 'relative', width: '100%', padding: '10px 0', backgroundColor: '#0d0d0d', zIndex: 51, textAlign: 'center' }}>
            <span style={{ fontSize: '13px', fontWeight: 700, color: '#fffdf7', letterSpacing: '0.03em', fontFamily: 'sans-serif' }}>🔒 Created with InviteHub.in — Upgrade to remove watermark</span>
          </div>
        </>
      )}
    </div>
  );
}
