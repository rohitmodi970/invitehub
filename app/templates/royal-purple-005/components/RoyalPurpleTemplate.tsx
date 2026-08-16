'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { Cinzel_Decorative, Cormorant_Garamond, Great_Vibes } from 'next/font/google';

const cinzel = { className: '' };

const cormorant = { className: '' };

const greatVibes = { className: '' };

export interface InvitationData {
  brideName: string;
  groomName: string;
  weddingDate: string;
  weddingTime: string;
  venueName: string;
  venueAddress: string;
  contactNumber?: string;
  additionalMessage?: string;
  couplePhotoUrl?: string;
  familyDetails?: string;
  rsvpDetails?: string;
}

export interface TemplateProps {
  data: InvitationData;
  isPremium?: boolean;
}

const CrownSVG = () => (
  <svg width="40" height="28" viewBox="0 0 40 28" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M20 2L26 12L38 4L32 24H8L2 4L14 12L20 2Z" fill="#F5C518"/>
    <circle cx="20" cy="2" r="2" fill="#FFF3A3"/>
    <circle cx="38" cy="4" r="2" fill="#FFF3A3"/>
    <circle cx="2" cy="4" r="2" fill="#FFF3A3"/>
    <rect x="6" y="25" width="28" height="2" fill="#F5C518"/>
  </svg>
);

const MotifSVG = () => (
  <svg width="30" height="15" viewBox="0 0 30 15" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M15 13L10 3L1 8L5 0H25L29 8L20 3L15 13Z" fill="#F5C518"/>
    <circle cx="15" cy="13" r="1.5" fill="#FFF3A3"/>
  </svg>
);

const OrnateBorder = () => (
  <svg width="100%" height="100%" viewBox="0 0 420 600" fill="none" preserveAspectRatio="none" xmlns="http://www.w3.org/2000/svg" style={{ filter: 'drop-shadow(0 0 8px rgba(245,197,24,0.5))' }}>
    <rect x="15" y="15" width="390" height="570" stroke="#F5C518" strokeWidth="1.5" fill="none" />
    <rect x="20" y="20" width="380" height="560" stroke="#F5C518" strokeWidth="0.5" fill="none" opacity="0.6" />
    {/* Top Left */}
    <path d="M15 45H30C38.2843 45 45 38.2843 45 30V15" stroke="#F5C518" strokeWidth="1.5" fill="none"/>
    <circle cx="25" cy="25" r="3" fill="#F5C518"/>
    {/* Top Right */}
    <path d="M405 45H390C381.716 45 375 38.2843 375 30V15" stroke="#F5C518" strokeWidth="1.5" fill="none"/>
    <circle cx="395" cy="25" r="3" fill="#F5C518"/>
    {/* Bottom Left */}
    <path d="M15 555H30C38.2843 555 45 561.716 45 570V585" stroke="#F5C518" strokeWidth="1.5" fill="none"/>
    <circle cx="25" cy="575" r="3" fill="#F5C518"/>
    {/* Bottom Right */}
    <path d="M405 555H390C381.716 555 375 561.716 375 570V585" stroke="#F5C518" strokeWidth="1.5" fill="none"/>
    <circle cx="395" cy="575" r="3" fill="#F5C518"/>
  </svg>
);

export function RoyalPurpleTemplate({ data, isPremium = false }: TemplateProps) {
  const containerVariants = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: { staggerChildren: 0.2, delayChildren: 0.3 }
    }
  };

  const itemFadeUp = {
    hidden: { opacity: 0, y: 15 },
    show: { opacity: 1, y: 0, transition: { duration: 0.6, ease: 'easeOut' as const } }
  };

  const crownSpring = {
    hidden: { opacity: 0, y: -30 },
    show: { opacity: 1, y: 0, transition: { type: 'spring' as const, stiffness: 200, damping: 12 } }
  };

  const nameScale = {
    hidden: { opacity: 0, scale: 0.85 },
    show: { opacity: 1, scale: 1, transition: { duration: 0.8, ease: 'easeOut' as const } }
  };

  return (
    <div 
      className="relative overflow-hidden w-full max-w-[420px] min-h-[600px] mx-auto flex flex-col text-white shadow-2xl"
      style={{ background: 'radial-gradient(circle at center, #3D1054 0%, #1A0029 100%)' }}
    >
      <style>{`
        @keyframes shimmer {
          0% { background-position: 200% center; }
          100% { background-position: -200% center; }
        }
        .shimmer-text {
          background: linear-gradient(to right, #F5C518 20%, #FFF3A3 50%, #F5C518 80%);
          background-size: 200% auto;
          color: transparent;
          -webkit-background-clip: text;
          background-clip: text;
          animation: shimmer 4s linear infinite;
        }
      `}</style>

      {/* Ornate Border SVG */}
      <motion.div 
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1 }}
        className="absolute inset-0 pointer-events-none z-0"
      >
        <OrnateBorder />
      </motion.div>

      <motion.div 
        className="relative z-10 flex-1 flex flex-col items-center pt-10 pb-6 px-10 w-full text-center"
        variants={containerVariants}
        initial="hidden"
        animate="show"
      >
        {/* Crown */}
        <motion.div variants={crownSpring} className="mb-4 drop-shadow-[0_0_8px_rgba(245,197,24,0.6)]">
          <CrownSVG />
        </motion.div>

        {/* Header */}
        <motion.p variants={itemFadeUp} className="text-[9px] uppercase tracking-[0.3em] text-[#F5C518] font-bold mb-3">
          Royal Wedding Invitation
        </motion.p>
        
        <motion.div variants={itemFadeUp} className="w-24 h-[1px] bg-[#F5C518]/60 mb-5"></motion.div>

        {/* Request */}
        <motion.p variants={itemFadeUp} className={`${cormorant.className} italic text-[#D8B4FE] text-sm mb-6 max-w-[240px]`}>
          Joyfully request the honor of your presence
        </motion.p>

        {/* Photo or Monogram */}
        {data.couplePhotoUrl ? (
          <motion.div variants={itemFadeUp} className="relative mb-6">
            <motion.div 
              animate={{ opacity: [0.6, 1, 0.6] }} 
              transition={{ duration: 2, repeat: Infinity, ease: 'easeInOut' as const }}
              className="absolute -inset-2 rounded-full border border-[#F5C518] shadow-[0_0_15px_rgba(245,197,24,0.4)] pointer-events-none"
            ></motion.div>
            <div className="w-32 h-32 rounded-full p-[3px] border-[2px] border-dashed border-[#F5C518] bg-[#3D1054] relative z-10">
              <div className="w-full h-full rounded-full overflow-hidden border border-[#F5C518]">
                <img 
                  src={data.couplePhotoUrl} 
                  alt={`${data.brideName} & ${data.groomName}`}
                  className="w-full h-full object-cover"
                  crossOrigin="anonymous" 
                />
              </div>
            </div>
          </motion.div>
        ) : (
          <motion.div variants={itemFadeUp} className="mb-6 flex items-center justify-center w-24 h-24 rounded-full border border-[#F5C518]/50 bg-[#1A0029]/50">
            <h2 className={`${cinzel.className} text-4xl text-[#F5C518] drop-shadow-md`}>
              {data.brideName.charAt(0)}
              <span className="text-2xl text-[#D8B4FE] mx-1">&</span>
              {data.groomName.charAt(0)}
            </h2>
          </motion.div>
        )}

        {/* Names */}
        <motion.div variants={nameScale} className="flex flex-col items-center justify-center mb-6 w-full">
          <h1 className={`${cinzel.className} text-4xl sm:text-5xl font-bold shimmer-text pb-1 drop-shadow-lg`}>
            {data.brideName}
          </h1>
          <span className={`${greatVibes.className} text-3xl text-[#D8B4FE] opacity-90 my-1`}>&</span>
          <h1 className={`${cinzel.className} text-4xl sm:text-5xl font-bold shimmer-text pb-1 drop-shadow-lg`}>
            {data.groomName}
          </h1>
        </motion.div>

        {/* Diamond Separator */}
        <motion.div variants={itemFadeUp} className="text-[#F5C518] text-xs mb-6 opacity-80">
          ◆
        </motion.div>

        {/* Details Section */}
        <motion.div variants={itemFadeUp} className="flex flex-col items-center w-full max-w-[280px]">
          <h3 className={`${cinzel.className} text-xl text-white font-bold tracking-wide mb-1 drop-shadow-md`}>
            {data.weddingDate}
          </h3>
          <p className={`${cormorant.className} text-base text-[#D8B4FE] italic mb-4`}>
            {data.weddingTime}
          </p>
          
          <p className={`${cormorant.className} text-sm text-[#F5C518] mb-1 italic`}>At</p>
          <h3 className={`${cormorant.className} text-xl text-white font-bold tracking-wider uppercase mb-1`}>
            {data.venueName}
          </h3>
          <p className={`${cormorant.className} text-sm text-[#D8B4FE] opacity-80 leading-relaxed max-w-[85%]`}>
            {data.venueAddress}
          </p>
        </motion.div>

        <div className="flex-1 min-h-[16px]"></div>

        {/* Additional Message */}
        {data.additionalMessage && (
          <motion.div variants={itemFadeUp} className="w-full flex items-center justify-center gap-2 mt-4 px-2">
            <span className="text-[#F5C518] text-[10px]">✦</span>
            <p className={`${greatVibes.className} text-xl text-[#D8B4FE] text-center`}>
              {data.additionalMessage}
            </p>
            <span className="text-[#F5C518] text-[10px]">✦</span>
          </motion.div>
        )}

        {/* RSVP & Contact */}
        <motion.div variants={itemFadeUp} className="w-full flex flex-col items-center mt-5 gap-3">
          {data.rsvpDetails && (
            <div className="border border-[#F5C518]/60 bg-[#1A0029]/80 rounded-md px-5 py-2 shadow-[0_0_10px_rgba(245,197,24,0.15)]">
              <p className="text-[9px] uppercase tracking-widest text-[#F5C518] font-bold mb-0.5">RSVP</p>
              <p className={`${cormorant.className} text-sm text-[#D8B4FE]`}>
                {data.rsvpDetails}
              </p>
            </div>
          )}

          {data.contactNumber && (
            <p className={`${cormorant.className} text-xs text-[#F5C518] font-semibold tracking-wider`}>
              {data.contactNumber}
            </p>
          )}

          <div className="mt-2 opacity-80">
            <MotifSVG />
          </div>
        </motion.div>

      </motion.div>

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
              height: '100%'
            }}
          >
            {Array.from({ length: 32 }).map((_, i) => (
              <span
                key={i}
                style={{
                  transform: 'rotate(-35deg)',
                  fontSize: '11px',
                  color: 'rgba(245, 197, 24, 0.18)',
                  fontWeight: 'bold',
                  letterSpacing: '0.05em',
                  userSelect: 'none',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  whiteSpace: 'nowrap'
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
              backgroundColor: 'rgba(255, 255, 255, 0.10)',
              borderTop: '1px solid #F5C518',
              zIndex: 51,
              textAlign: 'center'
            }}
          >
            <span
              style={{
                fontSize: '13px',
                fontWeight: 700,
                color: '#F5C518',
                letterSpacing: '0.03em',
                fontFamily: 'sans-serif'
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