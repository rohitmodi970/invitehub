'use client';

import { motion } from 'framer-motion';
import { Libre_Baskerville, Source_Sans_3 } from 'next/font/google';
import type { TemplateProps } from '@/lib/invitations/types';
import { EventDetailsPanel, WatermarkBadge, staggerContainer, fadeUp } from '../shared/EventDetailsPanel';

const libre = { className: '' };
const sourceSans = { className: '' };

export function CorporateExecutiveNavyTemplate({ data, isPremium = false }: TemplateProps) {
  return (
    <div
      className={`relative overflow-hidden w-full max-w-[420px] min-h-[640px] mx-auto flex flex-col shadow-2xl ${sourceSans.className}`}
      style={{ background: 'linear-gradient(180deg, #0c1929 0%, #122640 100%)' }}
    >
      {/* Gold accent bar */}
      <div className="absolute top-0 inset-x-0 h-1" style={{ background: 'linear-gradient(90deg, transparent, #c9a84c, transparent)' }} />

      {/* Subtle grid — office blueprint feel */}
      <div className="absolute inset-0 opacity-[0.04] pointer-events-none"
        style={{
          backgroundImage: 'linear-gradient(#fff 1px, transparent 1px), linear-gradient(90deg, #fff 1px, transparent 1px)',
          backgroundSize: '32px 32px',
        }} />

      {/* Corner monogram block */}
      <div className="absolute top-6 right-6 w-12 h-12 border border-[#c9a84c]/30 flex items-center justify-center">
        <span className={`${libre.className} text-[#c9a84c] text-lg font-bold`}>
          {(data.groomName || 'CO').slice(0, 2).toUpperCase()}
        </span>
      </div>

      <motion.div
        className="relative z-10 flex-1 flex flex-col px-8 pt-14 pb-8"
        variants={staggerContainer}
        initial="hidden"
        animate="show"
      >
        <motion.p variants={fadeUp} className="text-[10px] tracking-[0.45em] uppercase text-[#c9a84c]/70 mb-10">
          Official Invitation
        </motion.p>

        <motion.div variants={fadeUp} className="mb-6">
          <h1 className={`${libre.className} text-2xl font-bold text-white leading-snug`}>{data.brideName}</h1>
          <div className="flex items-center gap-3 my-4">
            <div className="flex-1 h-px bg-[#c9a84c]/30" />
            <span className="text-[10px] tracking-widest text-[#c9a84c]/60 uppercase">Presented by</span>
            <div className="flex-1 h-px bg-[#c9a84c]/30" />
          </div>
          <p className="text-lg font-semibold text-[#c9a84c]">{data.groomName}</p>
        </motion.div>

        {data.couplePhotoUrl && (
          <motion.div variants={fadeUp} className="mb-4">
            <div className="h-16 flex items-center">
              <img src={data.couplePhotoUrl} alt="" className="h-full w-auto max-w-[180px] object-contain object-left" crossOrigin="anonymous" />
            </div>
          </motion.div>
        )}

        {data.familyDetails && (
          <motion.div variants={fadeUp} className="mb-4 px-4 py-3 rounded-lg border border-white/10 bg-white/5">
            <p className="text-[10px] uppercase tracking-widest text-white/40 mb-1">Agenda</p>
            <p className="text-xs text-white/70 leading-relaxed">{data.familyDetails}</p>
          </motion.div>
        )}

        <div className="mt-auto">
          <EventDetailsPanel data={data} accent="#c9a84c" variant="dark" />
        </div>
      </motion.div>
      <WatermarkBadge isPremium={isPremium} />
    </div>
  );
}
