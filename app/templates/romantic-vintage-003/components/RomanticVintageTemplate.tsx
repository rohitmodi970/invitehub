'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { Dancing_Script, Libre_Baskerville, Great_Vibes } from 'next/font/google';

const dancingScript = { className: '' };

const libreBaskerville = { className: '' };

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

const RoseClusterSVG = () => (
  <svg width="48" height="32" viewBox="0 0 48 32" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M24 6C20 6 18 10 18 14C18 19 24 24 24 24C24 24 30 19 30 14C30 10 28 6 24 6Z" fill="#C48B9F"/>
    <path d="M16 12C13 12 11 15 11 18C11 22 16 26 16 26C16 26 21 22 21 18C21 15 19 12 16 12Z" fill="#C48B9F" opacity="0.8"/>
    <path d="M32 12C35 12 37 15 37 18C37 22 32 26 32 26C32 26 27 22 27 18C27 15 29 12 32 12Z" fill="#C48B9F" opacity="0.8"/>
    <path d="M24 24V32" stroke="#8BA888" strokeWidth="2" strokeLinecap="round"/>
    <path d="M24 28C21 28 19 25 19 25" stroke="#8BA888" strokeWidth="1.5" strokeLinecap="round"/>
    <path d="M24 27C27 27 29 24 29 24" stroke="#8BA888" strokeWidth="1.5" strokeLinecap="round"/>
  </svg>
);

const DividerSVG = () => (
  <svg width="200" height="14" viewBox="0 0 200 14" fill="none" xmlns="http://www.w3.org/2000/svg">
    <line x1="20" y1="7" x2="180" y2="7" stroke="#C48B9F" strokeWidth="0.5"/>
    <path d="M14 7C14 4.79086 10.866 3 7 3C3.13401 3 0 4.79086 0 7C0 9.20914 3.13401 11 7 11C10.866 11 14 9.20914 14 7Z" fill="#C48B9F" opacity="0.6"/>
    <path d="M200 7C200 4.79086 196.866 3 193 3C189.134 3 186 4.79086 186 7C186 9.20914 189.134 11 193 11C196.866 11 200 9.20914 200 7Z" fill="#C48B9F" opacity="0.6"/>
  </svg>
);

export function RomanticVintageTemplate({ data, isPremium = false }: TemplateProps) {
  const containerVariants = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: { staggerChildren: 0.15, delayChildren: 0.3 }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 15 },
    show: { opacity: 1, y: 0, transition: { duration: 0.6, ease: 'easeOut' as const } }
  };

  return (
    <div 
      className="relative overflow-hidden w-full max-w-[420px] min-h-[600px] mx-auto flex flex-col text-[#5C3D2E] shadow-2xl"
      style={{ background: 'radial-gradient(circle at center, #F5ECD7 30%, #E8DAB7 100%)' }}
    >
      {/* Vintage Double Border */}
      <motion.div 
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5 }}
        className="absolute inset-3 border-[1.5px] border-[#C48B9F]/80 z-0 pointer-events-none"
      >
        <div className="absolute inset-1.5 border-[0.5px] border-[#C48B9F]/50"></div>
        {/* Corner Accents */}
        <span className="absolute -top-[12px] -left-[9px] text-[#C48B9F] text-xl bg-[#F5ECD7] px-1 leading-none">❧</span>
        <span className="absolute -top-[12px] -right-[9px] text-[#C48B9F] text-xl bg-[#F5ECD7] px-1 leading-none -scale-x-100 inline-block">❧</span>
        <span className="absolute -bottom-[13px] -left-[9px] text-[#C48B9F] text-xl bg-[#E8DAB7] px-1 leading-none -scale-y-100 inline-block">❧</span>
        <span className="absolute -bottom-[13px] -right-[9px] text-[#C48B9F] text-xl bg-[#E8DAB7] px-1 leading-none -scale-100 inline-block">❧</span>
      </motion.div>

      {/* Main Content Area */}
      <motion.div 
        className="relative z-10 flex-1 flex flex-col items-center pt-10 pb-8 px-8 w-full h-full text-center"
        variants={containerVariants}
        initial="hidden"
        animate="show"
      >
        {/* Rose Top Motif */}
        <motion.div 
          initial={{ opacity: 0, y: -30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: 'easeOut' as const }}
          className="mb-4"
        >
          <RoseClusterSVG />
        </motion.div>

        {/* Header */}
        <motion.h2 
          variants={itemVariants} 
          className={`${dancingScript.className} text-2xl text-[#8BA888] mb-6 italic`}
        >
          With Joy We Invite You
        </motion.h2>

        {/* Photo Frame (Optional) */}
        {data.couplePhotoUrl && (
          <motion.div variants={itemVariants} className="mb-6 relative">
            <div className="w-32 h-40 rounded-[50%] p-[3px] border border-[#C48B9F] shadow-lg bg-[#F5ECD7]">
              <div className="w-full h-full rounded-[50%] overflow-hidden border-[2px] border-white">
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
        <motion.div variants={itemVariants} className="flex flex-col items-center justify-center mb-6 w-full">
          <h1 className={`${libreBaskerville.className} text-3xl font-bold text-[#5C3D2E] tracking-wider uppercase mb-1`}>
            {data.brideName}
          </h1>
          <span className={`${greatVibes.className} text-4xl text-[#C48B9F] opacity-90 my-1`}>
            &
          </span>
          <h1 className={`${libreBaskerville.className} text-3xl font-bold text-[#5C3D2E] tracking-wider uppercase mt-1`}>
            {data.groomName}
          </h1>
        </motion.div>

        {/* Divider */}
        <motion.div variants={itemVariants} className="mb-6">
          <DividerSVG />
        </motion.div>

        {/* Wedding Details */}
        <motion.div variants={itemVariants} className="flex flex-col items-center w-full max-w-[280px]">
          <h3 className={`${libreBaskerville.className} text-lg font-bold text-[#5C3D2E] mb-1 uppercase tracking-widest`}>
            {data.weddingDate}
          </h3>
          <p className={`${dancingScript.className} text-lg text-[#8BA888] mb-1 italic`}>
            at
          </p>
          <p className={`${libreBaskerville.className} text-base text-[#5C3D2E] mb-6 uppercase tracking-wider`}>
            {data.weddingTime}
          </p>
          
          <h3 className={`${libreBaskerville.className} text-lg font-bold text-[#5C3D2E] mb-2`}>
            {data.venueName}
          </h3>
          <p className={`${libreBaskerville.className} text-xs text-[#5C3D2E]/80 leading-relaxed italic max-w-[90%]`}>
            {data.venueAddress}
          </p>
        </motion.div>

        <div className="flex-1 min-h-[16px]"></div>

        {/* Extra Information */}
        <motion.div variants={itemVariants} className="w-full flex flex-col items-center mt-4 gap-4">
          
          {data.familyDetails && (
            <div className="flex flex-col items-center">
              <div className="w-8 h-[1px] bg-[#C48B9F]/40 mb-2"></div>
              <p className={`${libreBaskerville.className} text-xs text-[#5C3D2E] opacity-90 italic max-w-[85%]`}>
                {data.familyDetails}
              </p>
            </div>
          )}

          {data.additionalMessage && (
            <p className={`${greatVibes.className} text-2xl text-[#8BA888] leading-tight px-4 mt-2`}>
              "{data.additionalMessage}"
            </p>
          )}

          {(data.rsvpDetails || data.contactNumber) && (
            <div className="mt-4 border border-[#5C3D2E]/20 rounded-sm px-6 py-3 bg-[#E8DAB7]/30">
              {data.rsvpDetails && (
                <p className={`${libreBaskerville.className} text-[11px] uppercase tracking-widest text-[#5C3D2E] font-bold mb-1`}>
                  {data.rsvpDetails}
                </p>
              )}
              {data.contactNumber && (
                <p className={`${libreBaskerville.className} text-xs text-[#5C3D2E]/90 italic`}>
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
              height: '100%'
            }}
          >
            {Array.from({ length: 32 }).map((_, i) => (
              <span
                key={i}
                style={{
                  transform: 'rotate(-35deg)',
                  fontSize: '11px',
                  color: 'rgba(92, 61, 46, 0.15)', // sepia tint
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
              backgroundColor: 'rgba(92, 61, 46, 0.70)',
              zIndex: 51,
              textAlign: 'center'
            }}
          >
            <span
              style={{
                fontSize: '13px',
                fontWeight: 700,
                color: '#F5ECD7',
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