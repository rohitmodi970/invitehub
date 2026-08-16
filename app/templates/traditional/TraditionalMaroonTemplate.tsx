'use client';

import { motion } from 'framer-motion';

const rozhaOne = { className: '' };
const poppins = { className: '' };
const greatVibes = { className: '' };

export interface InvitationData {
  brideName: string; groomName: string; weddingDate: string; weddingTime: string;
  venueName: string; venueAddress: string; contactNumber?: string;
  additionalMessage?: string; couplePhotoUrl?: string; familyDetails?: string; rsvpDetails?: string;
}
export interface TemplateProps { data: InvitationData; isPremium?: boolean; }

const fade = (delay = 0) => ({
  hidden: { opacity: 0, y: 16 },
  show: { opacity: 1, y: 0, transition: { duration: 0.6, delay, ease: 'easeOut' as const } },
});

// Top paisley/arch ornament band SVG
const TopBand = () => (
  <div className="relative w-full overflow-hidden" style={{ height: '90px', background: 'linear-gradient(135deg, #6b0f1a 0%, #8b1c25 50%, #6b0f1a 100%)', borderBottom: '3px solid #c8922a' }}>
    {/* Arch pattern */}
    <svg viewBox="0 0 420 90" preserveAspectRatio="none" className="absolute inset-0 w-full h-full" opacity="0.3">
      {[0, 60, 120, 180, 240, 300, 360].map((x) => (
        <path key={x} d={`M${x},90 Q${x + 30},40 ${x + 60},90`} fill="none" stroke="#c8922a" strokeWidth="1.5" />
      ))}
    </svg>
    {/* Gold diamond strip */}
    <div className="absolute bottom-0 left-0 right-0 h-1" style={{ background: 'linear-gradient(to right, transparent, #c8922a, #f0c040, #c8922a, transparent)' }} />
    <div className="absolute inset-0 flex flex-col items-center justify-center">
      <p className={`${rozhaOne.className} text-[#c8922a] text-2xl tracking-widest drop-shadow`}>॥ शुभ विवाह ॥</p>
      <p className="text-[#f0c040] text-[10px] tracking-[0.3em] mt-1 uppercase opacity-90">Auspicious Wedding Ceremony</p>
    </div>
    {/* Small corner diamonds */}
    <svg className="absolute top-2 left-2" width="20" height="20" viewBox="0 0 20 20"><polygon points="10,0 20,10 10,20 0,10" fill="#c8922a" opacity="0.7" /></svg>
    <svg className="absolute top-2 right-2" width="20" height="20" viewBox="0 0 20 20"><polygon points="10,0 20,10 10,20 0,10" fill="#c8922a" opacity="0.7" /></svg>
  </div>
);

// Bottom band mirror
const BottomBand = () => (
  <div className="relative w-full overflow-hidden" style={{ height: '50px', background: 'linear-gradient(135deg, #6b0f1a 0%, #8b1c25 50%, #6b0f1a 100%)', borderTop: '3px solid #c8922a' }}>
    <svg viewBox="0 0 420 50" preserveAspectRatio="none" className="absolute inset-0 w-full h-full" opacity="0.3">
      {[0, 60, 120, 180, 240, 300, 360].map((x) => (
        <path key={x} d={`M${x},0 Q${x + 30},50 ${x + 60},0`} fill="none" stroke="#c8922a" strokeWidth="1.5" />
      ))}
    </svg>
    <div className="absolute inset-0 flex items-center justify-center gap-4 text-[#c8922a] text-base opacity-80">
      <span>❊</span><span>✿</span><span>❊</span><span>✿</span><span>❊</span>
    </div>
  </div>
);

// Gold divider line with center diamond
const GoldDivider = () => (
  <div className="flex items-center justify-center w-full my-4">
    <div className="flex-1 h-px" style={{ background: 'linear-gradient(to right, transparent, rgba(200,146,42,0.6))' }} />
    <svg width="20" height="20" viewBox="0 0 20 20" className="mx-2"><polygon points="10,0 20,10 10,20 0,10" fill="#c8922a" opacity="0.8" /></svg>
    <div className="flex-1 h-px" style={{ background: 'linear-gradient(to left, transparent, rgba(200,146,42,0.6))' }} />
  </div>
);

export function TraditionalMaroonTemplate({ data, isPremium = false }: TemplateProps) {
  return (
    <div className={`relative overflow-hidden w-full max-w-[420px] min-h-[640px] mx-auto flex flex-col shadow-2xl ${poppins.className}`}
      style={{ background: 'linear-gradient(160deg, #fff8ee 0%, #fef5e7 60%, #fdf4e0 100%)' }}>

      {/* Subtle side border strips */}
      <div className="absolute top-[90px] bottom-[50px] left-0 w-2" style={{ background: 'linear-gradient(to bottom, #c8922a, rgba(200,146,42,0.2), #c8922a)' }} />
      <div className="absolute top-[90px] bottom-[50px] right-0 w-2" style={{ background: 'linear-gradient(to bottom, #c8922a, rgba(200,146,42,0.2), #c8922a)' }} />

      <TopBand />

      <motion.div className="relative z-10 flex-1 flex flex-col items-center px-10 pt-6 pb-4 text-center"
        initial="hidden" animate="show" variants={{ show: { transition: { staggerChildren: 0.11 } } }}>

        {/* Blessings */}
        <motion.p variants={fade(0)} className="text-xs italic mb-2" style={{ color: '#6b0f1a', opacity: 0.8 }}>
          With the blessings of God and our elders
        </motion.p>

        {data.familyDetails && (
          <motion.p variants={fade(0.04)} className="text-sm font-medium mb-2" style={{ color: '#8b1c25' }}>
            {data.familyDetails}
          </motion.p>
        )}

        <GoldDivider />

        <motion.p variants={fade(0.06)} className="text-[10px] uppercase tracking-[0.25em] mb-4" style={{ color: '#c8922a' }}>
          invite you to the wedding of
        </motion.p>

        {/* Photo */}
        {data.couplePhotoUrl && (
          <motion.div variants={fade(0.08)} className="mb-5">
            <div className="w-28 h-28 rounded-full mx-auto overflow-hidden"
              style={{ border: '3px solid #c8922a', boxShadow: '0 0 0 4px rgba(200,146,42,0.15), 0 8px 24px rgba(107,15,26,0.2)' }}>
              <img src={data.couplePhotoUrl} alt="" className="w-full h-full object-cover" crossOrigin="anonymous" />
            </div>
          </motion.div>
        )}

        {/* Names */}
        <motion.div variants={fade(0.1)} className="mb-3">
          <h1 className={`${rozhaOne.className} text-5xl`} style={{ color: '#6b0f1a', textShadow: '1px 1px 0 rgba(200,146,42,0.4), -0.5px -0.5px 0 rgba(200,146,42,0.2)' }}>
            {data.brideName}
          </h1>
          <p className={`${greatVibes.className} text-2xl my-1`} style={{ color: '#c8922a' }}>weds</p>
          <h1 className={`${rozhaOne.className} text-5xl`} style={{ color: '#6b0f1a', textShadow: '1px 1px 0 rgba(200,146,42,0.4), -0.5px -0.5px 0 rgba(200,146,42,0.2)' }}>
            {data.groomName}
          </h1>
        </motion.div>

        <GoldDivider />

        {/* Details box */}
        <motion.div variants={fade(0.18)} className="w-full max-w-[300px] rounded-xl p-5 my-2"
          style={{ border: '2px solid #c8922a', background: 'rgba(200,146,42,0.05)', boxShadow: 'inset 0 0 20px rgba(107,15,26,0.04)' }}>
          <div className="flex flex-col gap-3 text-sm" style={{ color: '#6b0f1a' }}>
            <div className="flex items-start gap-3 text-left">
              <span className="text-base mt-[2px]">🗓️</span>
              <div>
                <p className="text-[10px] uppercase tracking-widest mb-0.5" style={{ color: '#c8922a' }}>Date</p>
                <p className="font-semibold">{data.weddingDate}</p>
              </div>
            </div>
            <div className="flex items-start gap-3 text-left">
              <span className="text-base mt-[2px]">⏰</span>
              <div>
                <p className="text-[10px] uppercase tracking-widest mb-0.5" style={{ color: '#c8922a' }}>Time</p>
                <p className="font-semibold">{data.weddingTime}</p>
              </div>
            </div>
            <div className="flex items-start gap-3 text-left">
              <span className="text-base mt-[2px]">📍</span>
              <div>
                <p className="text-[10px] uppercase tracking-widest mb-0.5" style={{ color: '#c8922a' }}>Venue</p>
                <p className="font-bold text-[15px]">{data.venueName}</p>
                <p className="text-xs mt-0.5 opacity-75">{data.venueAddress}</p>
              </div>
            </div>
          </div>
        </motion.div>

        {data.additionalMessage && (
          <motion.p variants={fade(0.24)} className="text-sm italic mt-3 font-medium" style={{ color: '#8b1c25' }}>
            🪔 {data.additionalMessage} 🪔
          </motion.p>
        )}

        <div className="flex-1 min-h-2" />

        {data.rsvpDetails && (
          <motion.div variants={fade(0.28)} className="px-6 py-2 rounded my-3"
            style={{ background: '#6b0f1a', border: '1px solid #c8922a' }}>
            <p className="text-[10px] uppercase tracking-widest mb-0.5" style={{ color: '#c8922a' }}>RSVP</p>
            <p className="text-xs font-semibold" style={{ color: '#f0c040' }}>{data.rsvpDetails}</p>
          </motion.div>
        )}
        {data.contactNumber && (
          <motion.p variants={fade(0.3)} className="text-xs mb-2" style={{ color: '#c8922a', opacity: 0.8 }}>
            {data.contactNumber}
          </motion.p>
        )}
      </motion.div>

      <BottomBand />

      {/* ═══════════════════════════════════════════════════════════════════
        WATERMARK SYSTEM — MANDATORY 
        ═══════════════════════════════════════════════════════════════════ 
      */}
      {!isPremium && (
        <>
          {/* LAYER 1: Full-Card Diagonal Tiled Overlay */}
          <div
            style={{
              position: 'absolute',
              inset: 0,
              zIndex: 50,
              pointerEvents: 'none',
              overflow: 'hidden',
              backgroundImage: `repeating-linear-gradient(
                -45deg,
                transparent,
                transparent 60px,
                rgba(0,0,0,0.04) 60px,
                rgba(0,0,0,0.04) 61px
              )`,
              display: 'grid',
              gridTemplateColumns: 'repeat(4, 1fr)',
              gap: '30px 20px',
              padding: '20px',
              width: '100%',
              height: '100%',
            }}
          >
            {Array.from({ length: 32 }).map((_, i) => (
              <span
                key={i}
                style={{
                  transform: 'rotate(-35deg)',
                  fontSize: '11px',
                  color: 'rgba(200,146,42,0.2)',
                  fontWeight: 'bold',
                  letterSpacing: '0.05em',
                  userSelect: 'none',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  whiteSpace: 'nowrap',
                }}
              >
                InviteHub.in
              </span>
            ))}
          </div>

          {/* LAYER 2: Bottom Strip Watermark */}
          <div
            style={{
              position: 'relative',
              marginTop: 'auto',
              width: '100%',
              padding: '10px 0',
              backgroundColor: 'rgba(107,15,26,0.9)',
              zIndex: 51,
              textAlign: 'center'
            }}
          >
            <span
              style={{
                fontSize: '13px',
                fontWeight: 700,
                color: '#c8922a',
                letterSpacing: '0.03em',
                fontFamily: 'sans-serif',
              }}
            >
              🔒 Created with InviteHub.in — Upgrade to remove watermark
            </span>
          </div>
        </>
      )}
    </div>
  );
}
