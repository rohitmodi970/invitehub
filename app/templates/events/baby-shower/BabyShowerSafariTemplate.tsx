'use client';

import { motion } from 'framer-motion';
import { Quicksand, Baloo_2 } from 'next/font/google';
import type { TemplateProps } from '@/lib/invitations/types';
import { EventDetailsPanel, WatermarkBadge, staggerContainer, fadeUp } from '../shared/EventDetailsPanel';

const quicksand = Quicksand({ subsets: ['latin'], weight: ['400', '500', '600', '700'] });
const baloo = Baloo_2({ subsets: ['latin'], weight: ['600', '700'] });

const SafariAnimal = ({ type, x, y }: { type: 'giraffe' | 'elephant'; x: number; y: number }) => (
  <div className="absolute opacity-20 pointer-events-none" style={{ left: `${x}%`, top: `${y}%` }}>
    {type === 'giraffe' ? (
      <svg width="40" height="60" viewBox="0 0 40 60"><ellipse cx="20" cy="50" rx="12" ry="8" fill="#c4a882" /><rect x="17" y="20" width="6" height="30" rx="3" fill="#c4a882" /><circle cx="20" cy="16" r="10" fill="#c4a882" /><circle cx="16" cy="14" r="2" fill="#5c4033" /><circle cx="24" cy="14" r="2" fill="#5c4033" /></svg>
    ) : (
      <svg width="50" height="40" viewBox="0 0 50 40"><ellipse cx="25" cy="28" rx="20" ry="12" fill="#9a8c7a" /><circle cx="38" cy="20" r="8" fill="#9a8c7a" /><circle cx="41" cy="18" r="2" fill="#5c4033" /></svg>
    )}
  </div>
);

export function BabyShowerSafariTemplate({ data, isPremium = false }: TemplateProps) {
  return (
    <div
      className={`relative overflow-hidden w-full max-w-[420px] min-h-[640px] mx-auto flex flex-col shadow-2xl ${quicksand.className}`}
      style={{ background: 'linear-gradient(180deg, #faf6f0 0%, #ede4d3 100%)' }}
    >
      <SafariAnimal type="giraffe" x={8} y={12} />
      <SafariAnimal type="elephant" x={70} y={8} />
      <SafariAnimal type="giraffe" x={75} y={55} />

      {/* Savannah horizon */}
      <div className="absolute bottom-0 inset-x-0 h-24 opacity-30"
        style={{ background: 'linear-gradient(180deg, transparent, #c4a882)' }} />

      <motion.div
        className="relative z-10 flex-1 flex flex-col px-8 pt-12 pb-8"
        variants={staggerContainer}
        initial="hidden"
        animate="show"
      >
        <motion.p variants={fadeUp} className={`${baloo.className} text-xs tracking-widest uppercase text-[#8b7355] mb-6 text-center`}>
          🦁 Safari Baby Shower
        </motion.p>

        <motion.div variants={fadeUp} className="text-center mb-4">
          <h1 className={`${baloo.className} text-3xl font-bold text-[#5c4033] leading-tight`}>{data.brideName}</h1>
          <p className="text-[#8b7355] font-semibold mt-2">{data.groomName}</p>
        </motion.div>

        {data.couplePhotoUrl && (
          <motion.div variants={fadeUp} className="self-center my-4">
            <div className="w-20 h-20 rounded-full overflow-hidden border-4 border-[#c4a882]/50">
              <img src={data.couplePhotoUrl} alt="" className="w-full h-full object-cover" crossOrigin="anonymous" />
            </div>
          </motion.div>
        )}

        {data.familyDetails && (
          <motion.p variants={fadeUp} className="text-xs text-center text-[#8b7355]/80 italic mb-4">{data.familyDetails}</motion.p>
        )}

        <div className="mt-auto">
          <EventDetailsPanel data={data} accent="#8b7355" variant="glass" />
        </div>
      </motion.div>
      <WatermarkBadge isPremium={isPremium} />
    </div>
  );
}
