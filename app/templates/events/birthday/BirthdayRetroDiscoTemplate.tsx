'use client';

import { motion } from 'framer-motion';
import { Righteous, Rubik } from 'next/font/google';
import type { TemplateProps } from '@/lib/invitations/types';
import { EventDetailsPanel, WatermarkBadge, staggerContainer, fadeUp } from '../shared/EventDetailsPanel';

const righteous = { className: '' };
const rubik = { className: '' };

export function BirthdayRetroDiscoTemplate({ data, isPremium = false }: TemplateProps) {
  return (
    <div
      className={`relative overflow-hidden w-full max-w-[420px] min-h-[640px] mx-auto flex flex-col shadow-2xl ${rubik.className}`}
      style={{ background: 'linear-gradient(135deg, #ff6b35 0%, #f7931e 40%, #ffcc02 100%)' }}
    >
      {/* Disco grid */}
      <div className="absolute inset-0 opacity-10"
        style={{
          backgroundImage: 'linear-gradient(rgba(0,0,0,0.3) 1px, transparent 1px), linear-gradient(90deg, rgba(0,0,0,0.3) 1px, transparent 1px)',
          backgroundSize: '24px 24px',
        }} />

      {/* Retro sun */}
      <motion.div
        animate={{ rotate: 360 }}
        transition={{ duration: 60, repeat: Infinity, ease: 'linear' }}
        className="absolute -top-16 left-1/2 -translate-x-1/2 w-48 h-48"
      >
        {[...Array(12)].map((_, i) => (
          <div key={i} className="absolute top-1/2 left-1/2 w-1 h-20 origin-bottom -translate-x-1/2"
            style={{ transform: `rotate(${i * 30}deg) translateY(-40px)`, background: 'rgba(255,255,255,0.15)' }} />
        ))}
      </motion.div>

      <motion.div
        className="relative z-10 flex-1 flex flex-col px-7 pt-16 pb-8"
        variants={staggerContainer}
        initial="hidden"
        animate="show"
      >
        <motion.div variants={fadeUp} className="bg-[#1a1a2e] rounded-2xl px-5 py-6 mb-6 shadow-2xl">
          <p className={`${righteous.className} text-[10px] tracking-[0.4em] uppercase text-[#ffcc02] mb-4`}>
            ✦ Disco Birthday ✦
          </p>
          <h1 className={`${righteous.className} text-4xl text-white leading-tight`}>{data.brideName}</h1>
          <p className="text-[#ffcc02] font-semibold text-lg mt-2">{data.groomName}</p>
        </motion.div>

        {data.couplePhotoUrl && (
          <motion.div variants={fadeUp} className="self-center mb-4">
            <div className="w-20 h-20 rounded-lg overflow-hidden border-3 border-[#1a1a2e] rotate-3 shadow-xl">
              <img src={data.couplePhotoUrl} alt="" className="w-full h-full object-cover -rotate-3 scale-110" crossOrigin="anonymous" />
            </div>
          </motion.div>
        )}

        {data.familyDetails && (
          <motion.p variants={fadeUp} className="text-xs text-[#1a1a2e]/70 text-center font-medium mb-4">{data.familyDetails}</motion.p>
        )}

        <div className="mt-auto">
          <EventDetailsPanel data={data} accent="#ff6b35" />
        </div>
      </motion.div>
      <WatermarkBadge isPremium={isPremium} />
    </div>
  );
}
