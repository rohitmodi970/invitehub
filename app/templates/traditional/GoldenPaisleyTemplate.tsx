'use client';

import { motion } from 'framer-motion';
import { Tiro_Devanagari_Hindi, Poppins } from 'next/font/google';

const tiroHindi = Tiro_Devanagari_Hindi({ subsets: ['devanagari', 'latin'], weight: '400', style: ['normal', 'italic'] });
const poppins = Poppins({ subsets: ['latin'], weight: ['300', '400', '500', '600'] });

export interface InvitationData {
  brideName: string; groomName: string; weddingDate: string; weddingTime: string;
  venueName: string; venueAddress: string; contactNumber?: string;
  additionalMessage?: string; couplePhotoUrl?: string; familyDetails?: string; rsvpDetails?: string;
}
export interface TemplateProps { data: InvitationData; isPremium?: boolean; }

const fade = (delay = 0) => ({ hidden: { opacity: 0, y: 14 }, show: { opacity: 1, y: 0, transition: { duration: 0.6, delay, ease: 'easeOut' as const } } });

// Paisley-inspired SVG motif
const PaisleyMotif = ({ flip = false }: { flip?: boolean }) => (
  <svg width="60" height="80" viewBox="0 0 60 80" fill="none" style={{ transform: flip ? 'scaleX(-1)' : undefined }}>
    <path d="M30 10 Q50 25 45 50 Q40 70 20 65 Q5 60 10 40 Q15 20 30 10Z" fill="#c8860a" opacity="0.25"/>
    <path d="M30 15 Q46 28 42 50 Q38 65 22 61 Q9 57 13 40 Q18 23 30 15Z" stroke="#c8860a" strokeWidth="0.7" fill="none" opacity="0.5"/>
    <circle cx="28" cy="55" r="4" fill="#c8860a" opacity="0.3"/>
    <path d="M25 12 Q15 20 18 35" stroke="#e8a830" strokeWidth="0.6" fill="none" opacity="0.4" strokeLinecap="round"/>
  </svg>
);

export function GoldenPaisleyTemplate({ data, isPremium = false }: TemplateProps) {
  return (
    <div className={`relative overflow-hidden w-full max-w-[420px] min-h-[640px] mx-auto flex flex-col shadow-2xl ${poppins.className}`}
      style={{ background: 'linear-gradient(160deg, #2d1500 0%, #4a2200 40%, #3a1a00 100%)' }}>

      {/* Top band */}
      <motion.div initial={{ scaleX: 0 }} animate={{ scaleX: 1 }} transition={{ duration: 0.7, ease: 'easeOut' as const }}
        className="w-full h-2 origin-left" style={{ background: 'linear-gradient(to right, #c8860a, #f5d060, #c8860a)' }} />

      {/* Corner paisley motifs */}
      <div className="absolute top-6 left-4 pointer-events-none opacity-80"><PaisleyMotif /></div>
      <div className="absolute top-6 right-4 pointer-events-none opacity-80"><PaisleyMotif flip /></div>
      <div className="absolute bottom-12 left-4 pointer-events-none opacity-60 rotate-180"><PaisleyMotif /></div>
      <div className="absolute bottom-12 right-4 pointer-events-none opacity-60 rotate-180"><PaisleyMotif flip /></div>

      {/* Gold border */}
      <div className="absolute inset-[22px] pointer-events-none" style={{ border: '1px solid rgba(200,134,10,0.4)' }} />
      <div className="absolute inset-[27px] pointer-events-none" style={{ border: '0.5px solid rgba(200,134,10,0.2)' }} />

      <motion.div className="relative z-10 flex-1 flex flex-col items-center px-10 pt-16 pb-8 text-center"
        initial="hidden" animate="show" variants={{ show: { transition: { staggerChildren: 0.12 } } }}>

        {/* Ganesh Mangalacharan */}
        <motion.div variants={fade(0)} className="mb-4">
          <p className={`${tiroHindi.className} text-4xl text-[#f5d060]`}>॥ ॐ श्री गणेशाय नमः ॥</p>
        </motion.div>

        <motion.div variants={fade(0.05)} className="w-full flex items-center gap-3 mb-5">
          <div className="flex-1 h-px" style={{ background: 'linear-gradient(to right, transparent, #c8860a)' }} />
          <span className="text-[#f5d060] text-sm">✦</span>
          <div className="flex-1 h-px" style={{ background: 'linear-gradient(to left, transparent, #c8860a)' }} />
        </motion.div>

        <motion.p variants={fade(0.08)} className="text-[10px] tracking-[0.35em] uppercase text-[#f5d060]/60 mb-6">
          With divine blessings &amp; family grace
        </motion.p>

        {/* Photo */}
        {data.couplePhotoUrl && (
          <motion.div variants={fade(0.1)} className="mb-6">
            <div className="w-28 h-28 rounded-full mx-auto overflow-hidden"
              style={{ border: '3px solid #c8860a', boxShadow: '0 0 0 4px rgba(200,134,10,0.2), 0 0 20px rgba(200,134,10,0.3)' }}>
              <img src={data.couplePhotoUrl} alt="" className="w-full h-full object-cover" crossOrigin="anonymous" />
            </div>
          </motion.div>
        )}

        {/* Names */}
        <motion.div variants={fade(0.12)} className="mb-5">
          <h1 style={{ fontFamily: 'serif', fontSize: '36px', fontWeight: 700, color: '#f5d060', letterSpacing: '0.04em', textShadow: '0 0 20px rgba(245,208,96,0.3)' }}>
            {data.brideName}
          </h1>
          <p className="text-[#c8860a]/70 text-lg my-1 italic">weds</p>
          <h1 style={{ fontFamily: 'serif', fontSize: '36px', fontWeight: 700, color: '#f5d060', letterSpacing: '0.04em', textShadow: '0 0 20px rgba(245,208,96,0.3)' }}>
            {data.groomName}
          </h1>
        </motion.div>

        {/* Details box */}
        <motion.div variants={fade(0.17)} className="w-full rounded-lg p-5 mb-5"
          style={{ background: 'rgba(200,134,10,0.1)', border: '1px solid rgba(200,134,10,0.3)' }}>
          <div className="space-y-3 text-left">
            {[
              { icon: '🗓️', label: 'Date', val: data.weddingDate },
              { icon: '⏰', label: 'Time', val: data.weddingTime },
              { icon: '📍', label: 'Venue', val: data.venueName, sub: data.venueAddress },
            ].map(r => (
              <div key={r.label} className="flex gap-3 items-start">
                <span className="text-base">{r.icon}</span>
                <div>
                  <p className="text-[9px] uppercase tracking-widest text-[#c8860a] mb-0.5">{r.label}</p>
                  <p className="text-sm text-[#f5d060] font-medium">{r.val}</p>
                  {r.sub && <p className="text-xs text-[#c8860a]/70 mt-0.5">{r.sub}</p>}
                </div>
              </div>
            ))}
          </div>
        </motion.div>

        <div className="flex-1" />
        {data.familyDetails && <motion.p variants={fade(0.22)} className="text-xs text-[#c8860a]/70 italic mb-2">{data.familyDetails}</motion.p>}
        {data.additionalMessage && <motion.p variants={fade(0.24)} className="text-sm text-[#f5d060]/80 italic mb-3">🪔 {data.additionalMessage} 🪔</motion.p>}
        {data.rsvpDetails && <motion.p variants={fade(0.26)} className="text-[10px] uppercase tracking-widest text-[#c8860a] mb-1">RSVP · {data.rsvpDetails}</motion.p>}
        {data.contactNumber && <motion.p variants={fade(0.28)} className="text-xs text-[#c8860a]/60">{data.contactNumber}</motion.p>}
      </motion.div>

      {/* Bottom band */}
      <div className="w-full h-2" style={{ background: 'linear-gradient(to right, #c8860a, #f5d060, #c8860a)' }} />

      {!isPremium && (
        <>
          <div style={{ position: 'absolute', inset: 0, zIndex: 50, pointerEvents: 'none', overflow: 'hidden', display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '30px 20px', padding: '20px' }}>
            {Array.from({ length: 32 }).map((_, i) => (
              <span key={i} style={{ transform: 'rotate(-35deg)', fontSize: '11px', color: 'rgba(200,134,10,0.18)', fontWeight: 'bold', letterSpacing: '0.05em', userSelect: 'none', display: 'flex', alignItems: 'center', justifyContent: 'center', whiteSpace: 'nowrap' }}>InviteHub.in</span>
            ))}
          </div>
          <div style={{ position: 'relative', width: '100%', padding: '10px 0', backgroundColor: 'rgba(45,21,0,0.95)', zIndex: 51, textAlign: 'center', borderTop: '1px solid rgba(200,134,10,0.4)' }}>
            <span style={{ fontSize: '13px', fontWeight: 700, color: '#f5d060', letterSpacing: '0.03em', fontFamily: 'sans-serif' }}>🔒 Created with InviteHub.in — Upgrade to remove watermark</span>
          </div>
        </>
      )}
    </div>
  );
}
