'use client';

import { motion } from 'framer-motion';
import { Cormorant_Garamond, Montserrat } from 'next/font/google';
import type { TemplateProps } from '@/lib/invitations/types';
import { EventDetailsPanel, WatermarkBadge, staggerContainer, fadeUp } from '../shared/EventDetailsPanel';

const cormorant = Cormorant_Garamond({ subsets: ['latin'], weight: ['400', '600', '700'] });
const montserrat = Montserrat({ subsets: ['latin'], weight: ['300', '400', '500'] });

export function BirthdayGoldGlamTemplate({ data, isPremium = false }: TemplateProps) {
  return (
    <div
      className={`relative overflow-hidden w-full max-w-[420px] min-h-[640px] mx-auto flex flex-col shadow-2xl ${montserrat.className}`}
      style={{ background: '#0a0a0a' }}
    >
      {/* Gold frame corners */}
      <svg className="absolute inset-0 w-full h-full pointer-events-none" preserveAspectRatio="none">
        <rect x="16" y="16" width="388" height="608" fill="none" stroke="#c9a84c" strokeWidth="1" opacity="0.4" />
        <rect x="22" y="22" width="376" height="596" fill="none" stroke="#c9a84c" strokeWidth="0.5" opacity="0.2" />
      </svg>

      {/* Corner ornaments */}
      {['top-4 left-4', 'top-4 right-4 rotate-90', 'bottom-4 left-4 -rotate-90', 'bottom-4 right-4 rotate-180'].map((pos, i) => (
        <div key={i} className={`absolute ${pos} w-8 h-8 opacity-60`}>
          <svg viewBox="0 0 32 32" fill="none"><path d="M0 0 L32 0 L32 8 Q16 8 8 16 Q0 24 0 32 Z" fill="#c9a84c" opacity="0.5" /></svg>
        </div>
      ))}

      <motion.div
        className="relative z-10 flex-1 flex flex-col px-9 pt-14 pb-8 items-center text-center"
        variants={staggerContainer}
        initial="hidden"
        animate="show"
      >
        <motion.p variants={fadeUp} className={`${cormorant.className} text-xs tracking-[0.5em] uppercase text-[#c9a84c]/70 mb-8`}>
          An Evening of Celebration
        </motion.p>

        <motion.div variants={fadeUp} className="mb-2">
          <div className="w-16 h-px bg-gradient-to-r from-transparent via-[#c9a84c] to-transparent mx-auto mb-6" />
          <h1 className={`${cormorant.className} text-5xl font-bold text-white leading-tight`}>
            {data.brideName}
          </h1>
          <p className={`${cormorant.className} text-2xl italic text-[#c9a84c] mt-3`}>{data.groomName}</p>
          <div className="w-16 h-px bg-gradient-to-r from-transparent via-[#c9a84c] to-transparent mx-auto mt-6" />
        </motion.div>

        {data.couplePhotoUrl && (
          <motion.div variants={fadeUp} className="my-5">
            <div className="w-24 h-24 rounded-full overflow-hidden p-1" style={{ background: 'linear-gradient(135deg, #c9a84c, #f0d080)' }}>
              <img src={data.couplePhotoUrl} alt="" className="w-full h-full rounded-full object-cover" crossOrigin="anonymous" />
            </div>
          </motion.div>
        )}

        {data.familyDetails && (
          <motion.p variants={fadeUp} className="text-xs text-white/40 italic mb-4 max-w-[280px]">{data.familyDetails}</motion.p>
        )}

        <div className="mt-auto w-full">
          <EventDetailsPanel data={data} accent="#c9a84c" variant="dark" />
        </div>
      </motion.div>
      <WatermarkBadge isPremium={isPremium} />
    </div>
  );
}
