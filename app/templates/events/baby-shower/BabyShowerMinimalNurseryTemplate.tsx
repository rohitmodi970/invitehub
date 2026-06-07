'use client';

import { motion } from 'framer-motion';
import { Outfit, DM_Sans } from 'next/font/google';
import type { TemplateProps } from '@/lib/invitations/types';
import { EventDetailsPanel, WatermarkBadge, staggerContainer, fadeUp } from '../shared/EventDetailsPanel';

const outfit = Outfit({ subsets: ['latin'], weight: ['400', '500', '600'] });
const dmSans = DM_Sans({ subsets: ['latin'], weight: ['400', '500'] });

export function BabyShowerMinimalNurseryTemplate({ data, isPremium = false }: TemplateProps) {
  return (
    <div
      className={`relative overflow-hidden w-full max-w-[420px] min-h-[640px] mx-auto flex flex-col shadow-2xl ${dmSans.className}`}
      style={{ background: '#faf9f7' }}
    >
      {/* Scandinavian arch */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full max-w-[360px] h-56 pointer-events-none">
        <svg viewBox="0 0 360 224" className="w-full h-full" preserveAspectRatio="xMidYMin meet">
          <path d="M180 224 Q180 40 20 40 L340 40 Q180 40 180 224" fill="#e8e4df" />
        </svg>
      </div>

      {/* Minimal dots pattern */}
      <div className="absolute bottom-24 inset-x-0 h-32 opacity-30 pointer-events-none flex justify-center gap-3 flex-wrap px-8">
        {[...Array(24)].map((_, i) => (
          <div key={i} className="w-1.5 h-1.5 rounded-full bg-[#b8b0a8]" />
        ))}
      </div>

      <motion.div
        className="relative z-10 flex-1 flex flex-col px-8 pt-16 pb-8"
        variants={staggerContainer}
        initial="hidden"
        animate="show"
      >
        <motion.p variants={fadeUp} className={`${outfit.className} text-[10px] tracking-[0.35em] uppercase text-[#8a8279] mb-8 text-center`}>
          Baby Shower
        </motion.p>

        <motion.div variants={fadeUp} className="text-center mb-4">
          <h1 className={`${outfit.className} text-3xl font-semibold text-[#3d3832] leading-snug`}>{data.brideName}</h1>
          <div className="w-8 h-0.5 bg-[#c4bdb4] mx-auto my-4" />
          <p className="text-sm text-[#8a8279] font-medium">{data.groomName}</p>
        </motion.div>

        {data.couplePhotoUrl && (
          <motion.div variants={fadeUp} className="self-center my-4">
            <div className="w-20 h-20 rounded-2xl overflow-hidden bg-[#e8e4df]">
              <img src={data.couplePhotoUrl} alt="" className="w-full h-full object-cover" crossOrigin="anonymous" />
            </div>
          </motion.div>
        )}

        {data.familyDetails && (
          <motion.p variants={fadeUp} className="text-xs text-center text-[#8a8279] mb-4">{data.familyDetails}</motion.p>
        )}

        <div className="mt-auto">
          <EventDetailsPanel data={data} accent="#8a8279" />
        </div>
      </motion.div>
      <WatermarkBadge isPremium={isPremium} />
    </div>
  );
}
