'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { Playfair_Display, Cormorant_Garamond, Great_Vibes } from 'next/font/google';

const playfair = { className: '' };

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

const GoldBorder = ({ className }: { className?: string }) => (
  <svg 
    className={className} 
    width="100%" 
    height="24" 
    viewBox="0 0 300 24" 
    fill="none" 
    xmlns="http://www.w3.org/2000/svg" 
    preserveAspectRatio="none"
  >
    <path d="M15,12 L285,12" stroke="#C9A84C" strokeWidth="1" />
    <path d="M15,16 L285,16" stroke="#C9A84C" strokeWidth="0.5" />
    <circle cx="15" cy="12" r="1.5" fill="#C9A84C" />
    <circle cx="285" cy="12" r="1.5" fill="#C9A84C" />
    <path d="M22,8 Q18,12 22,16" stroke="#C9A84C" strokeWidth="0.5" fill="none"/>
    <path d="M278,8 Q282,12 278,16" stroke="#C9A84C" strokeWidth="0.5" fill="none"/>
    <path d="M10,12 L0,12" stroke="#C9A84C" strokeWidth="0.5" />
    <path d="M290,12 L300,12" stroke="#C9A84C" strokeWidth="0.5" />
  </svg>
);

const Divider = () => (
  <svg width="150" height="20" viewBox="0 0 150 20" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M0 10H60" stroke="#C9A84C" strokeWidth="0.5"/>
    <circle cx="75" cy="10" r="2.5" fill="#C9A84C"/>
    <path d="M68 10C68 6.13401 71.134 3 75 3C78.866 3 82 6.13401 82 10C82 13.866 78.866 17 75 17C71.134 17 68 13.866 68 10Z" stroke="#C9A84C" strokeWidth="0.5" fill="none"/>
    <path d="M90 10H150" stroke="#C9A84C" strokeWidth="0.5"/>
  </svg>
);

export function ElegantGoldTemplate({ data, isPremium = false }: TemplateProps) {
  const containerVariants = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: { duration: 0.8, staggerChildren: 0.15 }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 15 },
    show: { opacity: 1, y: 0, transition: { duration: 0.6, ease: 'easeOut' as const } }
  };

  return (
    <div className="relative overflow-hidden w-full max-w-[420px] min-h-[600px] mx-auto flex flex-col bg-[#FDF8F0] text-[#3B2A1A] shadow-2xl">
      <motion.div 
        className="relative z-10 flex-1 flex flex-col items-center pt-10 pb-6 px-8 w-full h-full"
        variants={containerVariants}
        initial="hidden"
        animate="show"
      >
        {/* Top Border */}
        <motion.div variants={itemVariants} className="w-full mb-8">
          <GoldBorder />
        </motion.div>

        {/* Header */}
        <motion.p 
          variants={itemVariants} 
          className={`${cormorant.className} italic text-[#C9A84C] text-lg mb-6 tracking-wide text-center`}
        >
          Together with their families
        </motion.p>

        {/* Couple Names */}
        <motion.div variants={itemVariants} className="flex flex-col items-center mb-6 w-full text-center">
          <h1 
            className={`${playfair.className} text-4xl font-semibold text-[#C9A84C] tracking-wide mb-2`}
            style={{ textShadow: '1px 1px 2px rgba(201,168,76,0.15)' }}
          >
            {data.brideName}
          </h1>
          <span className={`${greatVibes.className} text-3xl text-[#3B2A1A] opacity-80 my-1`}>&</span>
          <h1 
            className={`${playfair.className} text-4xl font-semibold text-[#C9A84C] tracking-wide mt-2`}
            style={{ textShadow: '1px 1px 2px rgba(201,168,76,0.15)' }}
          >
            {data.groomName}
          </h1>
        </motion.div>

        {/* Couple Photo (Optional) */}
        {data.couplePhotoUrl && (
          <motion.div variants={itemVariants} className="mb-8 mt-2">
            <div className="w-36 h-36 rounded-full p-[4px] border-[4px] border-[#C9A84C] bg-[#FDF8F0] shadow-md">
              <div className="w-full h-full rounded-full overflow-hidden">
                <img 
                  src={data.couplePhotoUrl} 
                  alt={`${data.brideName} & ${data.groomName}`}
                  className="w-full h-full object-cover"
                  crossOrigin="anonymous"
                />
              </div>
            </div>
          </motion.div>
        )}

        {/* Divider */}
        <motion.div variants={itemVariants} className="mb-8">
          <Divider />
        </motion.div>

        {/* Wedding Details */}
        <motion.div variants={itemVariants} className="flex flex-col items-center text-center mb-6 w-full">
          <p className={`${cormorant.className} text-[15px] text-[#3B2A1A] mb-5 opacity-90`}>
            request the pleasure of your company<br />to celebrate their wedding
          </p>
          
          <h2 className={`${playfair.className} text-2xl font-semibold text-[#3B2A1A] mb-2`}>
            {data.weddingDate}
          </h2>
          
          <p className={`${cormorant.className} text-[16px] text-[#C9A84C] font-semibold tracking-wider uppercase mb-5`}>
            {data.weddingTime}
          </p>
          
          <h3 className={`${playfair.className} text-lg text-[#3B2A1A] mb-1`}>
            {data.venueName}
          </h3>
          
          <p className={`${cormorant.className} text-sm text-[#3B2A1A] opacity-75 max-w-[85%] leading-relaxed`}>
            {data.venueAddress}
          </p>
        </motion.div>

        {/* Additional Message */}
        {data.additionalMessage && (
          <motion.div variants={itemVariants} className="mb-6 mt-2 text-center w-full">
            <p className={`${greatVibes.className} text-2xl text-[#C9A84C] px-4 leading-tight`}>
              "{data.additionalMessage}"
            </p>
          </motion.div>
        )}

        {/* Family Details */}
        {data.familyDetails && (
          <motion.div variants={itemVariants} className="mb-6 text-center w-full">
            <div className="w-12 h-[1px] bg-[#C9A84C] opacity-40 mx-auto mb-3"></div>
            <p className={`${cormorant.className} text-sm text-[#3B2A1A] opacity-85 italic`}>
              {data.familyDetails}
            </p>
          </motion.div>
        )}

        {/* Spacing to push bottom elements down */}
        <div className="flex-1 min-h-[20px]"></div>

        {/* RSVP & Contact */}
        <motion.div variants={itemVariants} className="w-full flex flex-col items-center mt-auto">
          {data.rsvpDetails && (
            <div className="text-center mb-3">
              <div className="w-16 h-[1px] bg-[#C9A84C] opacity-50 mx-auto mb-2"></div>
              <p className={`${cormorant.className} text-xs tracking-widest uppercase text-[#C9A84C] font-semibold mb-1`}>
                RSVP
              </p>
              <p className={`${cormorant.className} text-sm text-[#3B2A1A] opacity-90`}>
                {data.rsvpDetails}
              </p>
            </div>
          )}

          {data.contactNumber && (
            <div className="flex items-center gap-2 text-[#3B2A1A] opacity-80 mt-1 mb-2">
              <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"></path>
              </svg>
              <span className={`${cormorant.className} text-sm font-medium tracking-wider`}>
                {data.contactNumber}
              </span>
            </div>
          )}

          {/* Bottom Border */}
          <div className="w-full mt-4">
            <GoldBorder className="rotate-180" />
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
                  color: 'rgba(201, 168, 76, 0.18)',
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
              backgroundColor: 'rgba(59, 42, 26, 0.75)',
              zIndex: 51,
              textAlign: 'center'
            }}
          >
            <span
              style={{
                fontSize: '13px',
                fontWeight: 700,
                color: '#C9A84C',
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