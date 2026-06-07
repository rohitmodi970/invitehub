'use client';

import { motion } from 'framer-motion';
import { Great_Vibes, Lato } from 'next/font/google';
import type { TemplateProps } from '@/lib/invitations/types';
import { EventDetailsPanel, WatermarkBadge, staggerContainer, fadeUp } from '../shared/EventDetailsPanel';

const greatVibes = Great_Vibes({ subsets: ['latin'], weight: ['400'] });
const lato = Lato({ subsets: ['latin'], weight: ['300', '400', '700'] });

const FloralCorner = ({ flip }: { flip?: boolean }) => (
  <svg className={`absolute ${flip ? 'bottom-0 right-0 rotate-180' : 'top-0 left-0'} w-32 h-32 opacity-40 pointer-events-none`}
    viewBox="0 0 128 128" fill="none">
    <path d="M0 0 Q40 20 30 60 Q20 90 0 128" stroke="#e8a0bf" strokeWidth="1.5" fill="none" />
    <circle cx="35" cy="35" r="8" fill="#f4c2d7" opacity="0.6" />
    <circle cx="20" cy="55" r="6" fill="#e8a0bf" opacity="0.5" />
    <circle cx="45" cy="50" r="5" fill="#ffd6e8" opacity="0.7" />
    <ellipse cx="30" cy="70" rx="12" ry="6" fill="#f4c2d7" opacity="0.4" transform="rotate(-30 30 70)" />
  </svg>
);

export function BabyShowerFloralPinkTemplate({ data, isPremium = false }: TemplateProps) {
  return (
    <div
      className={`relative overflow-hidden w-full max-w-[420px] min-h-[640px] mx-auto flex flex-col shadow-2xl ${lato.className}`}
      style={{ background: 'linear-gradient(180deg, #fff5f8 0%, #ffe4ec 100%)' }}
    >
      <FloralCorner />
      <FloralCorner flip />

      <motion.div
        className="relative z-10 flex-1 flex flex-col px-8 pt-14 pb-8 items-center text-center"
        variants={staggerContainer}
        initial="hidden"
        animate="show"
      >
        <motion.p variants={fadeUp} className="text-[10px] tracking-[0.4em] uppercase text-[#c77d9a] mb-4">
          A Baby is Blooming
        </motion.p>

        <motion.h1 variants={fadeUp} className={`${greatVibes.className} text-5xl text-[#8b4563] leading-none mb-1`}>
          {data.brideName}
        </motion.h1>
        <motion.p variants={fadeUp} className="text-sm font-light text-[#c77d9a] tracking-widest uppercase mb-6">
          {data.groomName}
        </motion.p>

        {data.couplePhotoUrl && (
          <motion.div variants={fadeUp} className="mb-4">
            <div className="w-24 h-24 rounded-full overflow-hidden p-1 shadow-lg" style={{ background: 'linear-gradient(135deg, #f4c2d7, #e8a0bf)' }}>
              <img src={data.couplePhotoUrl} alt="" className="w-full h-full rounded-full object-cover" crossOrigin="anonymous" />
            </div>
          </motion.div>
        )}

        {data.familyDetails && (
          <motion.p variants={fadeUp} className="text-xs text-[#8b4563]/60 italic mb-4 max-w-[260px]">{data.familyDetails}</motion.p>
        )}

        <div className="mt-auto w-full">
          <EventDetailsPanel data={data} accent="#c77d9a" variant="glass" />
        </div>
      </motion.div>
      <WatermarkBadge isPremium={isPremium} />
    </div>
  );
}
