'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { Lora, Montserrat, Great_Vibes } from 'next/font/google';

const lora = Lora({ 
  subsets: ['latin'], 
  weight: ['400', '500', '600'] 
});

const montserrat = Montserrat({ 
  subsets: ['latin'], 
  weight: ['300', '400', '500', '600'] 
});

const greatVibes = Great_Vibes({ 
  subsets: ['latin'], 
  weight: '400' 
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

// Geometric Corner SVGs
const TopLeftCoral = () => (
  <svg className="absolute top-0 left-0 w-32 h-32 z-0" viewBox="0 0 100 100" preserveAspectRatio="none">
    <polygon points="0,0 100,0 0,100" fill="#EF6C6A" />
  </svg>
);

const TopRightTeal = () => (
  <svg className="absolute top-0 right-0 w-40 h-40 z-0" viewBox="0 0 100 100" preserveAspectRatio="none">
    <polygon points="100,0 0,0 100,100" fill="#194B48" />
  </svg>
);

const BottomLeftPurple = () => (
  <svg className="absolute bottom-0 left-0 w-36 h-36 z-0" viewBox="0 0 100 100" preserveAspectRatio="none">
    <polygon points="0,100 0,0 100,100" fill="#7E578F" />
  </svg>
);

const BottomRightCoral = () => (
  <svg className="absolute bottom-0 right-0 w-48 h-48 z-0" viewBox="0 0 100 100" preserveAspectRatio="none">
    <polygon points="100,100 0,100 100,0" fill="#EF6C6A" />
  </svg>
);

let _dotPatternCounter = 0;
const DotPattern = ({ className }: { className?: string }) => {
  const uid = `dots-${++_dotPatternCounter}`;
  return (
    <svg className={`absolute ${className} z-0 opacity-50`} width="60" height="60" xmlns="http://www.w3.org/2000/svg">
      <defs>
        <pattern id={uid} x="0" y="0" width="15" height="15" patternUnits="userSpaceOnUse">
          <circle fill="#C5A559" cx="2" cy="2" r="1.5"></circle>
        </pattern>
      </defs>
      <rect x="0" y="0" width="100%" height="100%" fill={`url(#${uid})`}></rect>
    </svg>
  );
};


const FloralLineArt = ({ className }: { className?: string }) => (
  <svg className={`absolute ${className} z-0 opacity-30`} width="80" height="120" viewBox="0 0 80 120" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M10 120C10 80 40 50 70 20" stroke="#C5A559" strokeWidth="1" fill="none" />
    <path d="M10 90C30 90 40 70 40 50" stroke="#C5A559" strokeWidth="1" fill="none" />
    <circle cx="70" cy="20" r="3" fill="#C5A559" />
    <circle cx="40" cy="50" r="2" fill="#C5A559" />
    <path d="M70 20C60 25 55 35 60 45C65 35 75 30 70 20Z" stroke="#C5A559" strokeWidth="1" fill="none" />
  </svg>
);

const HexBadge = ({ bride, groom }: { bride: string; groom: string }) => (
  <div className="relative flex items-center justify-center w-16 h-16 mb-4">
    <svg className="absolute inset-0 w-full h-full" viewBox="0 0 100 100">
      <polygon points="50,5 90,25 90,75 50,95 10,75 10,25" fill="none" stroke="#C5A559" strokeWidth="2" />
      <path d="M25,50 Q40,30 50,20 Q60,30 75,50" stroke="#C5A559" strokeWidth="1" fill="none" opacity="0.6"/>
      <path d="M25,50 Q40,70 50,80 Q60,70 75,50" stroke="#C5A559" strokeWidth="1" fill="none" opacity="0.6"/>
    </svg>
    <div className={`${lora.className} text-[#194B48] font-medium text-sm z-10 flex items-center gap-1`}>
      <span>{bride.charAt(0)}</span>
      <span className="text-[#EF6C6A] text-[10px]">♥</span>
      <span>{groom.charAt(0)}</span>
    </div>
  </div>
);

export function ModernFloralGeometricTemplate({ data, isPremium = false }: TemplateProps) {
  const containerVariants = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: { staggerChildren: 0.15, delayChildren: 0.2 }
    }
  };

  const itemFadeUp = {
    hidden: { opacity: 0, y: 20 },
    show: { opacity: 1, y: 0, transition: { duration: 0.6, ease: "easeOut" } }
  };

  return (
    <div className="relative overflow-hidden w-full max-w-[420px] min-h-[600px] mx-auto flex flex-col bg-[#FCFAF8] shadow-2xl">
      
      {/* Background Geometrics */}
      <motion.div initial={{ opacity: 0, x: -30, y: -30 }} animate={{ opacity: 1, x: 0, y: 0 }} transition={{ duration: 0.8 }}><TopLeftCoral /></motion.div>
      <motion.div initial={{ opacity: 0, x: 30, y: -30 }} animate={{ opacity: 1, x: 0, y: 0 }} transition={{ duration: 0.8 }}><TopRightTeal /></motion.div>
      <motion.div initial={{ opacity: 0, x: -30, y: 30 }} animate={{ opacity: 1, x: 0, y: 0 }} transition={{ duration: 0.8 }}><BottomLeftPurple /></motion.div>
      <motion.div initial={{ opacity: 0, x: 30, y: 30 }} animate={{ opacity: 1, x: 0, y: 0 }} transition={{ duration: 0.8 }}><BottomRightCoral /></motion.div>
      
      {/* Background Decor */}
      <DotPattern className="top-4 right-4" />
      <DotPattern className="bottom-20 left-4" />
      <FloralLineArt className="top-32 -left-4" />
      <FloralLineArt className="bottom-40 -right-4 rotate-180" />

      {/* Main Content Area */}
      <motion.div 
        className="relative z-10 flex-1 flex flex-col items-center pt-10 pb-8 px-6 w-full h-full text-center"
        variants={containerVariants}
        initial="hidden"
        animate="show"
      >
        {/* Badge & Header */}
        <motion.div variants={itemFadeUp} className="flex flex-col items-center w-full">
          <HexBadge bride={data.brideName} groom={data.groomName} />
          <p className={`${montserrat.className} text-[9px] uppercase tracking-[0.25em] text-[#194B48] font-medium mb-6`}>
            Together with their families
          </p>
        </motion.div>

        {/* Couple Names */}
        <motion.div variants={itemFadeUp} className="flex flex-col items-center justify-center w-full mb-6 relative">
          <h1 className={`${lora.className} text-4xl font-medium text-[#EF6C6A] tracking-widest uppercase`}>
            {data.brideName}
          </h1>
          
          <div className="flex items-center justify-center w-full my-2 gap-3">
            <div className="h-[1px] w-12 bg-[#C5A559]"></div>
            <span className={`${greatVibes.className} text-3xl text-[#C5A559] lowercase`}>
              and
            </span>
            <div className="h-[1px] w-12 bg-[#C5A559]"></div>
          </div>
          
          <h1 className={`${lora.className} text-4xl font-medium text-[#194B48] tracking-widest uppercase`}>
            {data.groomName}
          </h1>
        </motion.div>

        {/* Dynamic Photo Container */}
        {data.couplePhotoUrl && (
          <motion.div variants={itemFadeUp} className="w-full flex justify-center mb-6 mt-2 relative z-20">
            {/* Outer gold diamond frame */}
            <div className="w-52 h-52 relative flex items-center justify-center">
              <div 
                className="absolute inset-0 border-[3px] border-[#C5A559]" 
                style={{ clipPath: 'polygon(50% 0%, 100% 50%, 50% 100%, 0% 50%)', transform: 'scale(1.05)' }}
              ></div>
              <div 
                className="w-full h-full bg-[#194B48] overflow-hidden"
                style={{ clipPath: 'polygon(50% 0%, 100% 50%, 50% 100%, 0% 50%)' }}
              >
                <img 
                  src={data.couplePhotoUrl} 
                  alt={`${data.brideName} & ${data.groomName}`}
                  className="w-full h-full object-cover scale-125"
                  crossOrigin="anonymous" 
                />
              </div>
            </div>
          </motion.div>
        )}

        {/* Invitation Text */}
        <motion.div variants={itemFadeUp} className="mb-4">
          <p className={`${montserrat.className} text-[9px] uppercase tracking-[0.2em] text-[#194B48] font-semibold flex items-center gap-2`}>
            <span className="text-[#C5A559]">•</span>
            Invite you to celebrate
            <span className="text-[#C5A559]">•</span>
          </p>
          <p className={`${montserrat.className} text-[9px] uppercase tracking-[0.2em] text-[#194B48] font-semibold mt-1`}>
            their wedding
          </p>
        </motion.div>

        {/* Date Block */}
        <motion.div variants={itemFadeUp} className="w-full max-w-[280px] border-t border-b border-[#C5A559] py-3 my-4 flex items-center justify-center gap-4">
          <p className={`${montserrat.className} text-xs font-semibold text-[#194B48] tracking-widest uppercase`}>
            {data.weddingDate.split(' ')[0] || 'DATE'}
          </p>
          <div className="w-[1px] h-8 bg-[#C5A559]"></div>
          <h2 className={`${lora.className} text-3xl font-medium text-[#EF6C6A]`}>
            {data.weddingDate.match(/\d+/)?.[0] || '♥'}
          </h2>
          <div className="w-[1px] h-8 bg-[#C5A559]"></div>
          <p className={`${montserrat.className} text-xs font-semibold text-[#194B48] tracking-widest uppercase text-center max-w-[80px]`}>
            {data.weddingDate.replace(/^\w+\s\d+\w*\s/, '')}
          </p>
        </motion.div>
        
        <motion.div variants={itemFadeUp} className="mb-6">
          <p className={`${montserrat.className} text-[9px] uppercase tracking-[0.2em] text-[#194B48] font-semibold flex items-center justify-center gap-2`}>
            <span className="text-[#C5A559]">•</span>
            {data.weddingTime}
            <span className="text-[#C5A559]">•</span>
          </p>
        </motion.div>

        {/* Venue Block */}
        <motion.div variants={itemFadeUp} className="flex flex-col items-center w-full mb-6 z-10">
          <p className={`${montserrat.className} text-[9px] uppercase tracking-widest text-[#EF6C6A] font-bold mb-1`}>
            Venue
          </p>
          <h3 className={`${greatVibes.className} text-3xl text-[#194B48] mb-2`}>
            {data.venueName}
          </h3>
          <p className={`${montserrat.className} text-[10px] text-[#194B48] tracking-wider uppercase font-medium max-w-[80%] leading-relaxed`}>
            {data.venueAddress}
          </p>
        </motion.div>

        <div className="flex-1 min-h-[16px]"></div>

        {/* Footer Info (Quotes, Family, RSVP) */}
        <motion.div variants={itemFadeUp} className="w-full flex flex-col items-center mt-auto gap-4 z-10 relative">
          
          {data.additionalMessage && (
            <div className="text-center">
              <span className="text-white opacity-80 text-xl leading-none">❝</span>
              <p className={`${montserrat.className} text-[10px] tracking-widest uppercase text-[#FCFAF8] font-medium leading-relaxed drop-shadow-md px-4`}>
                {data.additionalMessage}
              </p>
              <div className="text-[#C5A559] text-xs mt-2">♥</div>
            </div>
          )}

          {data.familyDetails && (
            <p className={`${lora.className} text-xs text-[#FCFAF8] italic drop-shadow-md`}>
              {data.familyDetails}
            </p>
          )}

          {(data.rsvpDetails || data.contactNumber) && (
            <div className="mt-2 text-center text-[#FCFAF8] drop-shadow-md">
              {data.rsvpDetails && (
                <p className={`${montserrat.className} text-[10px] tracking-widest uppercase font-semibold mb-1`}>
                  {data.rsvpDetails}
                </p>
              )}
              {data.contactNumber && (
                <p className={`${montserrat.className} text-xs tracking-wider font-medium`}>
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
                  color: '#194B48',
                  opacity: 0.18,
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
              backgroundColor: 'rgba(25, 75, 72, 0.85)', // Teal overlay
              zIndex: 51,
              textAlign: 'center'
            }}
          >
            <span
              style={{
                fontSize: '13px',
                fontWeight: 700,
                color: '#FCFAF8', // Cream text
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