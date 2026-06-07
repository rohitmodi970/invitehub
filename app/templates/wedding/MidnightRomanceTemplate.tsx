'use client';

import { motion } from 'framer-motion';
import { Josefin_Sans, Alex_Brush } from 'next/font/google';

const josefin = Josefin_Sans({ subsets: ['latin'], weight: ['100', '300', '400', '600'] });
const alexBrush = Alex_Brush({ subsets: ['latin'], weight: '400' });

export interface InvitationData {
  brideName: string; groomName: string; weddingDate: string; weddingTime: string;
  venueName: string; venueAddress: string; contactNumber?: string;
  additionalMessage?: string; couplePhotoUrl?: string; familyDetails?: string; rsvpDetails?: string;
}
export interface TemplateProps { data: InvitationData; isPremium?: boolean; }

const fade = (delay = 0) => ({ hidden: { opacity: 0, y: 14 }, show: { opacity: 1, y: 0, transition: { duration: 0.6, delay, ease: 'easeOut' as const } } });

export function MidnightRomanceTemplate({ data, isPremium = false }: TemplateProps) {
  return (
    <div className={`relative overflow-hidden w-full max-w-[420px] min-h-[640px] mx-auto flex flex-col shadow-2xl ${josefin.className}`}
      style={{ background: 'linear-gradient(160deg, #1a0a2e 0%, #16213e 50%, #0f3460 100%)' }}>

      {/* Star particle field */}
      {[...Array(30)].map((_, i) => (
        <motion.div key={i}
          className="absolute rounded-full bg-white pointer-events-none"
          style={{ width: Math.random() * 2 + 1, height: Math.random() * 2 + 1, top: `${Math.random() * 100}%`, left: `${Math.random() * 100}%`, opacity: 0 }}
          animate={{ opacity: [0, 0.6, 0] }}
          transition={{ duration: 2 + Math.random() * 3, repeat: Infinity, delay: Math.random() * 4 }}
        />
      ))}

      {/* Glowing moon */}
      <div className="absolute top-8 right-8 pointer-events-none">
        <div className="w-16 h-16 rounded-full" style={{ background: 'radial-gradient(circle, #f5e6c8 30%, rgba(245,230,200,0.3) 70%, transparent 100%)', boxShadow: '0 0 40px rgba(245,230,200,0.4)' }} />
      </div>

      {/* Double border frame */}
      <div className="absolute inset-4 pointer-events-none" style={{ border: '1px solid rgba(201,168,76,0.35)' }} />
      <div className="absolute inset-[18px] pointer-events-none" style={{ border: '0.5px solid rgba(201,168,76,0.15)' }} />

      {/* Corner ornaments */}
      {[['top-[14px]', 'left-[14px]'], ['top-[14px]', 'right-[14px]'], ['bottom-[14px]', 'left-[14px]'], ['bottom-[14px]', 'right-[14px]']].map(([t, l], i) => (
        <div key={i} className={`absolute ${t} ${l} w-5 h-5 pointer-events-none`} style={{ color: '#c9a84c', fontSize: '16px', lineHeight: 1 }}>✦</div>
      ))}

      <motion.div className="relative z-10 flex-1 flex flex-col items-center px-10 pt-16 pb-6 text-center"
        initial="hidden" animate="show" variants={{ show: { transition: { staggerChildren: 0.1 } } }}>

        <motion.p variants={fade()} className="text-[9px] tracking-[0.45em] uppercase text-[#c9a84c] mb-6">
          A Celebration of Love
        </motion.p>

        {/* Photo with glow ring */}
        {data.couplePhotoUrl && (
          <motion.div variants={fade(0.05)} className="mb-6 relative">
            <div className="absolute -inset-2 rounded-full" style={{ background: 'radial-gradient(circle, rgba(201,168,76,0.25) 0%, transparent 70%)' }} />
            <div className="relative w-28 h-28 rounded-full overflow-hidden" style={{ border: '2px solid #c9a84c', boxShadow: '0 0 20px rgba(201,168,76,0.3)' }}>
              <img src={data.couplePhotoUrl} alt="" className="w-full h-full object-cover" crossOrigin="anonymous" />
            </div>
          </motion.div>
        )}

        {/* Names */}
        <motion.div variants={fade(0.08)}>
          <h1 className={`${alexBrush.className} text-6xl leading-tight`}
            style={{ background: 'linear-gradient(135deg, #f5e6c8 0%, #c9a84c 50%, #f5e6c8 100%)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', backgroundClip: 'text' }}>
            {data.brideName}
          </h1>
          <div className="flex items-center gap-3 my-2 justify-center">
            <div className="h-px w-12" style={{ background: 'linear-gradient(to right, transparent, #c9a84c)' }} />
            <span className="text-[#c9a84c] text-lg">◆</span>
            <div className="h-px w-12" style={{ background: 'linear-gradient(to left, transparent, #c9a84c)' }} />
          </div>
          <h1 className={`${alexBrush.className} text-6xl leading-tight`}
            style={{ background: 'linear-gradient(135deg, #f5e6c8 0%, #c9a84c 50%, #f5e6c8 100%)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', backgroundClip: 'text' }}>
            {data.groomName}
          </h1>
        </motion.div>

        <motion.div variants={fade(0.12)} className="w-full my-5">
          <div className="h-px w-full" style={{ background: 'linear-gradient(to right, transparent, rgba(201,168,76,0.4), transparent)' }} />
        </motion.div>

        {/* Date/Time/Venue */}
        <motion.div variants={fade(0.15)} className="w-full space-y-2 mb-4">
          <p className="text-xl font-light text-white tracking-wide">{data.weddingDate}</p>
          <p className="text-xs tracking-[0.3em] uppercase text-[#c9a84c]">{data.weddingTime}</p>
          <div className="pt-4 space-y-1">
            <p className="text-base font-semibold text-white tracking-wider uppercase">{data.venueName}</p>
            <p className="text-xs font-light text-white/50 leading-relaxed">{data.venueAddress}</p>
          </div>
        </motion.div>

        <div className="flex-1 min-h-4" />

        {data.familyDetails && <motion.p variants={fade(0.2)} className="text-xs text-white/40 italic mb-3">{data.familyDetails}</motion.p>}
        {data.additionalMessage && (
          <motion.p variants={fade(0.22)} className={`${alexBrush.className} text-2xl mb-3`}
            style={{ background: 'linear-gradient(135deg, #f5e6c8, #c9a84c)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', backgroundClip: 'text' }}>
            "{data.additionalMessage}"
          </motion.p>
        )}
        {data.rsvpDetails && <motion.p variants={fade(0.25)} className="text-[10px] uppercase tracking-widest text-[#c9a84c] mb-2">RSVP · {data.rsvpDetails}</motion.p>}
        {data.contactNumber && <motion.p variants={fade(0.27)} className="text-xs text-white/30">{data.contactNumber}</motion.p>}
      </motion.div>

      {!isPremium && (
        <>
          <div style={{ position: 'absolute', inset: 0, zIndex: 50, pointerEvents: 'none', overflow: 'hidden', display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '30px 20px', padding: '20px' }}>
            {Array.from({ length: 32 }).map((_, i) => (
              <span key={i} style={{ transform: 'rotate(-35deg)', fontSize: '11px', color: 'rgba(201,168,76,0.12)', fontWeight: 'bold', letterSpacing: '0.05em', userSelect: 'none', display: 'flex', alignItems: 'center', justifyContent: 'center', whiteSpace: 'nowrap' }}>InviteHub.in</span>
            ))}
          </div>
          <div style={{ position: 'relative', width: '100%', padding: '10px 0', backgroundColor: 'rgba(10,6,20,0.9)', zIndex: 51, textAlign: 'center', borderTop: '1px solid rgba(201,168,76,0.3)' }}>
            <span style={{ fontSize: '13px', fontWeight: 700, color: '#c9a84c', letterSpacing: '0.03em', fontFamily: 'sans-serif' }}>🔒 Created with InviteHub.in — Upgrade to remove watermark</span>
          </div>
        </>
      )}
    </div>
  );
}
