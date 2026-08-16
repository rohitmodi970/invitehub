'use client';

import { motion } from 'framer-motion';
import { Lora, Jost } from 'next/font/google';
import type { TemplateProps } from '@/lib/invitations/types';
import { EventDetailsPanel, WatermarkBadge, staggerContainer, fadeUp } from '../shared/EventDetailsPanel';

const lora = { className: '' };
const jost = { className: '' };

const LeafSprig = ({ className }: { className?: string }) => (
  <svg className={className} width="48" height="48" viewBox="0 0 48 48" fill="none">
    <path d="M24 44 C24 44 8 32 8 18 C8 8 16 4 24 12 C32 4 40 8 40 18 C40 32 24 44 24 44Z" fill="#6b9080" opacity="0.7" />
    <path d="M24 44 L24 20" stroke="#4a6358" strokeWidth="1.5" />
    <path d="M24 28 C18 24 14 18 14 14" stroke="#6b9080" strokeWidth="1" fill="none" />
    <path d="M24 32 C30 28 34 22 34 16" stroke="#6b9080" strokeWidth="1" fill="none" />
  </svg>
);

export function BirthdayGardenPartyTemplate({ data, isPremium = false }: TemplateProps) {
  return (
    <div
      className={`relative overflow-hidden w-full max-w-[420px] min-h-[640px] mx-auto flex flex-col shadow-2xl ${jost.className}`}
      style={{ background: 'linear-gradient(180deg, #f0f4ef 0%, #dce8dc 100%)' }}
    >
      <LeafSprig className="absolute top-6 left-4 opacity-80 rotate-[-20deg]" />
      <LeafSprig className="absolute top-10 right-6 opacity-60 rotate-[25deg] scale-75" />
      <LeafSprig className="absolute bottom-32 left-2 opacity-50 rotate-[10deg] scale-90" />

      {/* Botanical border top */}
      <div className="absolute top-0 inset-x-0 h-2" style={{ background: 'linear-gradient(90deg, #6b9080, #a4c3b2, #6b9080)' }} />

      <motion.div
        className="relative z-10 flex-1 flex flex-col px-8 pt-12 pb-8"
        variants={staggerContainer}
        initial="hidden"
        animate="show"
      >
        <motion.p variants={fadeUp} className={`${lora.className} text-[11px] tracking-[0.3em] uppercase text-[#4a6358] mb-8 text-center`}>
          Garden Birthday Party
        </motion.p>

        <motion.div variants={fadeUp} className="text-center mb-4">
          <h1 className={`${lora.className} text-4xl font-bold text-[#2d4a3e] leading-tight`}>{data.brideName}</h1>
          <p className="text-sm text-[#6b9080] mt-3 font-medium tracking-wide">{data.groomName}</p>
        </motion.div>

        {data.couplePhotoUrl && (
          <motion.div variants={fadeUp} className="self-center my-4">
            <div className="w-22 h-22 rounded-full overflow-hidden border-3 border-[#a4c3b2] shadow-md" style={{ width: 88, height: 88 }}>
              <img src={data.couplePhotoUrl} alt="" className="w-full h-full object-cover" crossOrigin="anonymous" />
            </div>
          </motion.div>
        )}

        {data.familyDetails && (
          <motion.p variants={fadeUp} className="text-xs text-center text-[#4a6358]/70 italic mb-4">{data.familyDetails}</motion.p>
        )}

        <div className="mt-auto">
          <EventDetailsPanel data={data} accent="#6b9080" variant="glass" />
        </div>
      </motion.div>
      <WatermarkBadge isPremium={isPremium} />
    </div>
  );
}
