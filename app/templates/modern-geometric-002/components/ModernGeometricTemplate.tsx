'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { Space_Grotesk, DM_Mono } from 'next/font/google';

const spaceGrotesk = Space_Grotesk({
  subsets: ['latin'],
  weight: ['300', '400', '500', '600', '700'],
});

const dmMono = DM_Mono({
  subsets: ['latin'],
  weight: ['400', '500'],
});

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

export function ModernGeometricTemplate({ data, isPremium = false }: TemplateProps) {
  const containerVariants = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: { staggerChildren: 0.15, delayChildren: 0.3 },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 15 },
    show: { opacity: 1, y: 0, transition: { duration: 0.5, ease: 'easeOut' as const } },
  };

  return (
    <div className={`relative overflow-hidden w-full max-w-[420px] min-h-[600px] mx-auto flex flex-col bg-white text-[#1A1F36] shadow-2xl ${spaceGrotesk.className}`}>
      
      {/* Top Left Geometric Shape */}
      <motion.div
        initial={{ x: -50, y: -50, opacity: 0 }}
        animate={{ x: 0, y: 0, opacity: 1 }}
        transition={{ duration: 0.7, ease: 'easeOut' as const }}
        className="absolute top-0 left-0 w-48 h-48 bg-[#EEF0F8] z-0 pointer-events-none"
        style={{ clipPath: 'polygon(0 0, 100% 0, 0 100%)' }}
      />

      {/* Bottom Right Geometric Shape */}
      <motion.div
        initial={{ x: 50, y: 50, opacity: 0 }}
        animate={{ x: 0, y: 0, opacity: 1 }}
        transition={{ duration: 0.7, ease: 'easeOut' as const }}
        className="absolute bottom-0 right-0 w-48 h-48 bg-[#EEF0F8] z-0 pointer-events-none"
        style={{ clipPath: 'polygon(100% 0, 100% 100%, 0 100%)' }}
      />

      <motion.div
        className="relative z-10 flex-1 flex flex-col px-8 pt-16 pb-8"
        variants={containerVariants}
        initial="hidden"
        animate="show"
      >
        {/* Header section */}
        <motion.div variants={itemVariants} className="text-center mb-6">
          <p className="text-[10px] uppercase tracking-[0.4em] text-[#1A1F36] font-medium mb-3">
            You are invited
          </p>
          <div className="w-16 h-[2px] bg-[#C4956A] mx-auto"></div>
        </motion.div>

        {/* Couple Names */}
        <motion.div
          initial={{ scale: 0.8, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ duration: 0.8, ease: 'easeOut' as const }}
          className="text-center mb-8"
        >
          <h1 className="text-4xl sm:text-5xl font-bold text-[#1A1F36] leading-none mb-1 break-words">
            {data.brideName.toUpperCase()}
          </h1>
          <div className="text-3xl text-[#C4956A] font-light my-2">×</div>
          <h1 className="text-4xl sm:text-5xl font-bold text-[#1A1F36] leading-none mt-1 break-words">
            {data.groomName.toUpperCase()}
          </h1>
        </motion.div>

        {/* Couple Photo */}
        {data.couplePhotoUrl && (
          <motion.div variants={itemVariants} className="flex justify-center mb-8">
            <div className="w-48 h-48 border-[2px] border-[#C4956A] p-1 bg-white">
              <img
                src={data.couplePhotoUrl}
                alt={`${data.brideName} and ${data.groomName}`}
                className="w-full h-full object-cover"
                crossOrigin="anonymous"
              />
            </div>
          </motion.div>
        )}

        {/* Separator Dots */}
        <motion.div variants={itemVariants} className="flex justify-center gap-2 mb-8">
          <div className="w-1.5 h-1.5 bg-[#C4956A] rotate-45"></div>
          <div className="w-1.5 h-1.5 bg-[#C4956A] rotate-45"></div>
          <div className="w-1.5 h-1.5 bg-[#C4956A] rotate-45"></div>
        </motion.div>

        {/* Details Block */}
        <motion.div variants={itemVariants} className="w-full max-w-[280px] mx-auto mb-10">
          <div className="flex flex-col gap-5 text-left border-l-[3px] border-[#1A1F36] pl-5">
            <div>
              <p className={`${dmMono.className} text-[10px] uppercase text-[#C4956A] tracking-widest mb-1 font-medium`}>
                Date
              </p>
              <p className="text-sm font-semibold text-[#1A1F36] uppercase tracking-wide">
                {data.weddingDate}
              </p>
            </div>
            
            <div>
              <p className={`${dmMono.className} text-[10px] uppercase text-[#C4956A] tracking-widest mb-1 font-medium`}>
                Time
              </p>
              <p className="text-sm font-semibold text-[#1A1F36] uppercase tracking-wide">
                {data.weddingTime}
              </p>
            </div>

            <div>
              <p className={`${dmMono.className} text-[10px] uppercase text-[#C4956A] tracking-widest mb-1 font-medium`}>
                Venue
              </p>
              <p className="text-[15px] font-bold text-[#1A1F36] leading-tight mb-1">
                {data.venueName}
              </p>
              <p className="text-xs text-[#1A1F36]/60 leading-snug">
                {data.venueAddress}
              </p>
            </div>
          </div>
        </motion.div>

        {/* Extra Details */}
        <motion.div variants={itemVariants} className="text-center w-full mt-auto flex flex-col gap-4">
          {data.familyDetails && (
            <div className="mb-2">
              <p className={`${dmMono.className} text-[9px] uppercase tracking-widest text-[#C4956A] mb-1`}>
                With Blessings
              </p>
              <p className="text-xs font-medium text-[#1A1F36]">
                {data.familyDetails}
              </p>
            </div>
          )}

          {data.additionalMessage && (
            <p className="italic text-sm text-[#1A1F36]/80 font-medium px-4">
              "{data.additionalMessage}"
            </p>
          )}

          {(data.rsvpDetails || data.contactNumber) && (
            <div className="mt-2 bg-[#EEF0F8]/50 p-4 w-full">
              {data.rsvpDetails && (
                <p className={`${dmMono.className} text-xs font-medium text-[#1A1F36] mb-1`}>
                  {data.rsvpDetails}
                </p>
              )}
              {data.contactNumber && (
                <p className={`${dmMono.className} text-xs text-[#1A1F36]/70`}>
                  {data.contactNumber}
                </p>
              )}
            </div>
          )}
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
              height: '100%',
            }}
          >
            {Array.from({ length: 32 }).map((_, i) => (
              <span
                key={i}
                style={{
                  transform: 'rotate(-35deg)',
                  fontSize: '11px',
                  color: 'rgba(196, 149, 106, 0.20)', // Rose gold tint
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
              backgroundColor: 'rgba(26, 31, 54, 0.80)',
              zIndex: 51,
              textAlign: 'center',
            }}
          >
            <span
              style={{
                fontSize: '13px',
                fontWeight: 700,
                color: '#C4956A',
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