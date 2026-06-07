'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { Rozha_One, Poppins } from 'next/font/google';

const rozhaOne = Rozha_One({
  subsets: ['latin'],
  weight: '400',
});

const poppins = Poppins({
  subsets: ['latin'],
  weight: ['300', '400', '500', '600', '700'],
});

import type { InvitationData, TemplateProps } from '@/lib/invitations/types';

export type { InvitationData, TemplateProps };

const MandalaSVG = ({ className }: { className?: string }) => (
  <svg 
    className={className} 
    width="32" 
    height="32" 
    viewBox="0 0 100 100" 
    fill="none" 
    xmlns="http://www.w3.org/2000/svg"
  >
    <path d="M50 0C55 20 70 30 100 30C70 40 60 55 50 100C45 80 30 70 0 70C30 60 40 45 50 0Z" fill="#D4A017" opacity="0.8"/>
    <circle cx="50" cy="50" r="10" fill="#8B1A1A"/>
    <circle cx="50" cy="50" r="4" fill="#E8751A"/>
  </svg>
);

const GoldDivider = () => (
  <div className="flex items-center justify-center w-full my-4">
    <div className="flex-1 h-[1px] bg-[#D4A017]/60"></div>
    <div className="px-3 text-[#D4A017] text-xl">🕉️</div>
    <div className="flex-1 h-[1px] bg-[#D4A017]/60"></div>
  </div>
);

export function TraditionalIndianTemplate({ data, isPremium = false }: TemplateProps) {
  const containerVariants = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: { staggerChildren: 0.15, delayChildren: 0.2 },
    },
  };

  const itemFadeUp = {
    hidden: { opacity: 0, y: 15 },
    show: { opacity: 1, y: 0, transition: { duration: 0.5, ease: 'easeOut' as const } },
  };

  const detailsBoxVariant = {
    hidden: { opacity: 0, scale: 0.95 },
    show: { opacity: 1, scale: 1, transition: { duration: 0.6, ease: 'easeOut' as const } },
  };

  const svgFlankVariant = {
    hidden: { opacity: 0, rotate: -10, scale: 0.9 },
    show: { opacity: 1, rotate: 0, scale: 1, transition: { duration: 0.7, ease: 'easeOut' as const } },
  };

  return (
    <div className={`relative overflow-hidden w-full max-w-[420px] min-h-[600px] mx-auto flex flex-col bg-[#FFF8F0] shadow-2xl ${poppins.className}`}>
      
      {/* Header Band */}
      <motion.div 
        initial={{ y: -40, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.6, ease: 'easeOut' as const }}
        className="w-full bg-gradient-to-r from-[#E8751A] via-[#B3301A] to-[#8B1A1A] border-b-[3px] border-[#D4A017] py-3 z-10 shadow-md"
      >
        <h2 className={`${rozhaOne.className} text-center text-[#D4A017] text-2xl tracking-wide drop-shadow-md`}>
          🕉️ शुभ विवाह 🕉️
        </h2>
      </motion.div>

      {/* Decorative Row */}
      <div className="w-full text-center py-2 text-[#E8751A] text-sm tracking-[0.3em] opacity-80">
        ✿ ❊ ✿ ❊ ✿ ❊ ✿
      </div>

      <motion.div 
        className="relative z-10 flex-1 flex flex-col px-6 pb-6 w-full h-full items-center text-center"
        variants={containerVariants}
        initial="hidden"
        animate="show"
      >
        {/* Blessings & Family Details */}
        <motion.div variants={itemFadeUp} className="mb-2">
          <p className="text-xs italic text-[#8B1A1A]/80 mb-2 font-light">
            With the blessings of God and our families
          </p>
          {data.familyDetails && (
            <p className="text-sm font-medium text-[#8B1A1A] mt-1 max-w-[280px] mx-auto">
              {data.familyDetails}
            </p>
          )}
        </motion.div>

        <motion.div variants={itemFadeUp} className="w-full max-w-[200px]">
          <GoldDivider />
        </motion.div>

        <motion.p variants={itemFadeUp} className="text-[10px] uppercase tracking-[0.2em] text-[#E8751A] font-semibold mb-3">
          Invite you to the wedding of
        </motion.p>

        {/* Couple Photo (Optional) */}
        {data.couplePhotoUrl && (
          <motion.div variants={itemFadeUp} className="mb-4 mt-2">
            <div className="w-32 h-32 rounded-full p-1 border-4 border-double border-[#D4A017] bg-[#FFF8F0] shadow-md relative">
              <div className="absolute -top-3 -right-3 text-2xl drop-shadow-sm">✿</div>
              <div className="absolute -bottom-3 -left-3 text-2xl drop-shadow-sm">✿</div>
              <div className="w-full h-full rounded-full overflow-hidden border border-[#8B1A1A]/20">
                <img 
                  src={data.couplePhotoUrl} 
                  alt={`${data.brideName} and ${data.groomName}`}
                  className="w-full h-full object-cover"
                  crossOrigin="anonymous"
                />
              </div>
            </div>
          </motion.div>
        )}

        {/* Couple Names */}
        <motion.div className="flex items-center justify-center w-full my-2 gap-3" variants={itemFadeUp}>
          <motion.div variants={svgFlankVariant}>
            <MandalaSVG className="opacity-90" />
          </motion.div>
          
          <div className="flex flex-col items-center">
            <h1 
              className={`${rozhaOne.className} text-4xl text-[#8B1A1A] tracking-wider my-1`}
              style={{ textShadow: '1px 1px 0 #D4A017, -0.5px -0.5px 0 #D4A017' }}
            >
              {data.brideName}
            </h1>
            <span className="text-sm italic text-[#E8751A] font-medium my-1">weds</span>
            <h1 
              className={`${rozhaOne.className} text-4xl text-[#8B1A1A] tracking-wider my-1`}
              style={{ textShadow: '1px 1px 0 #D4A017, -0.5px -0.5px 0 #D4A017' }}
            >
              {data.groomName}
            </h1>
          </div>

          <motion.div variants={svgFlankVariant}>
            <MandalaSVG className="opacity-90" />
          </motion.div>
        </motion.div>

        {/* Details Box */}
        <motion.div variants={detailsBoxVariant} className="w-full max-w-[320px] border-2 border-amber-400 bg-amber-50 rounded-xl p-5 my-6 shadow-inner relative overflow-hidden">
          {/* subtle corner decorations */}
          <div className="absolute top-1 left-1 text-[#D4A017] text-xs opacity-60">❊</div>
          <div className="absolute top-1 right-1 text-[#D4A017] text-xs opacity-60">❊</div>
          <div className="absolute bottom-1 left-1 text-[#D4A017] text-xs opacity-60">❊</div>
          <div className="absolute bottom-1 right-1 text-[#D4A017] text-xs opacity-60">❊</div>

          <div className="flex flex-col gap-3 text-sm text-[#8B1A1A] text-left">
            <div className="flex items-start gap-3">
              <span className="text-base mt-[1px]">🗓️</span>
              <div>
                <p className="font-bold uppercase text-[11px] text-[#E8751A] tracking-widest mb-0.5">Date</p>
                <p className="font-semibold">{data.weddingDate}</p>
              </div>
            </div>
            
            <div className="flex items-start gap-3">
              <span className="text-base mt-[1px]">⏰</span>
              <div>
                <p className="font-bold uppercase text-[11px] text-[#E8751A] tracking-widest mb-0.5">Time</p>
                <p className="font-semibold">{data.weddingTime}</p>
              </div>
            </div>

            <div className="flex items-start gap-3 mt-1">
              <span className="text-base mt-[1px]">📍</span>
              <div>
                <p className="font-bold uppercase text-[11px] text-[#E8751A] tracking-widest mb-0.5">Venue</p>
                <p className="font-bold text-[15px]">{data.venueName}</p>
                <p className="text-xs mt-0.5 opacity-80 font-medium">{data.venueAddress}</p>
              </div>
            </div>
          </div>
        </motion.div>

        {/* Additional Message */}
        {data.additionalMessage && (
          <motion.div variants={itemFadeUp} className="w-full mb-5">
            <p className="text-[#8B1A1A] font-medium italic text-sm px-4">
              🪔 {data.additionalMessage} 🪔
            </p>
          </motion.div>
        )}

        <div className="flex-1 min-h-[10px]"></div>

        {/* Footer Details: RSVP & Contact */}
        <motion.div variants={itemFadeUp} className="w-full flex flex-col items-center gap-3">
          {data.rsvpDetails && (
            <div className="bg-[#8B1A1A] border border-[#D4A017] rounded px-6 py-2 shadow-sm">
              <p className="text-[10px] uppercase tracking-widest text-[#FFF8F0] opacity-80 mb-0.5">RSVP</p>
              <p className="text-xs font-semibold text-[#D4A017]">{data.rsvpDetails}</p>
            </div>
          )}

          {data.contactNumber && (
            <p className="text-xs text-[#E8751A] font-medium tracking-wide">
              For queries: <span className="font-bold">{data.contactNumber}</span>
            </p>
          )}
        </motion.div>
      </motion.div>

      {/* Footer Band */}
      <motion.div 
        initial={{ y: 40, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.6, ease: 'easeOut' as const, delay: 0.4 }}
        className="w-full bg-gradient-to-r from-[#8B1A1A] via-[#B3301A] to-[#E8751A] border-t-[2px] border-[#D4A017] py-2 z-10 flex justify-center gap-4 text-[#D4A017] text-lg"
      >
        <span>❊</span><span>✿</span><span>❊</span>
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
              height: '100%',
            }}
          >
            {Array.from({ length: 32 }).map((_, i) => (
              <span
                key={i}
                style={{
                  transform: 'rotate(-35deg)',
                  fontSize: '11px',
                  color: 'rgba(212, 160, 23, 0.20)', // gold tint
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
              backgroundColor: 'rgba(139, 26, 26, 0.85)',
              zIndex: 51,
              textAlign: 'center',
            }}
          >
            <span
              style={{
                fontSize: '13px',
                fontWeight: 700,
                color: '#D4A017',
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