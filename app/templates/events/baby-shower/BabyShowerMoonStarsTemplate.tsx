'use client';

import { motion } from 'framer-motion';
import { Cormorant_Infant, Raleway } from 'next/font/google';
import type { TemplateProps } from '@/lib/invitations/types';
import { EventDetailsPanel, WatermarkBadge, staggerContainer, fadeUp } from '../shared/EventDetailsPanel';

const cormorant = { className: '' };
const raleway = { className: '' };

const Star = ({ x, y, size, delay }: { x: number; y: number; size: number; delay: number }) => (
  <motion.div
    initial={{ opacity: 0, scale: 0 }}
    animate={{ opacity: [0.3, 1, 0.3], scale: 1 }}
    transition={{ delay, duration: 2, repeat: Infinity }}
    className="absolute text-white pointer-events-none"
    style={{ left: `${x}%`, top: `${y}%`, fontSize: size }}
  >
    ✦
  </motion.div>
);

export function BabyShowerMoonStarsTemplate({ data, isPremium = false }: TemplateProps) {
  return (
    <div
      className={`relative overflow-hidden w-full max-w-[420px] min-h-[640px] mx-auto flex flex-col shadow-2xl ${raleway.className}`}
      style={{ background: 'linear-gradient(180deg, #0f1729 0%, #1a2744 50%, #243b5c 100%)' }}
    >
      <Star x={10} y={8} size={10} delay={0} />
      <Star x={85} y={15} size={8} delay={0.5} />
      <Star x={70} y={5} size={6} delay={1} />
      <Star x={25} y={18} size={7} delay={0.3} />
      <Star x={50} y={10} size={9} delay={0.8} />

      {/* Moon */}
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        className="absolute top-8 right-10 w-20 h-20 rounded-full"
        style={{ background: 'linear-gradient(135deg, #fef9e7, #f5e6c8)', boxShadow: '0 0 40px rgba(254,249,231,0.3)' }}
      >
        <div className="absolute top-3 right-4 w-4 h-4 rounded-full bg-[#e8dcc8]/60" />
        <div className="absolute bottom-5 left-5 w-6 h-6 rounded-full bg-[#e8dcc8]/40" />
      </motion.div>

      <motion.div
        className="relative z-10 flex-1 flex flex-col px-8 pt-28 pb-8"
        variants={staggerContainer}
        initial="hidden"
        animate="show"
      >
        <motion.p variants={fadeUp} className={`${cormorant.className} text-xs tracking-[0.4em] uppercase text-[#fef9e7]/60 mb-6 text-center`}>
          Twinkle Twinkle
        </motion.p>

        <motion.div variants={fadeUp} className="text-center mb-4">
          <h1 className={`${cormorant.className} text-4xl font-bold text-[#fef9e7] leading-tight`}>{data.brideName}</h1>
          <p className="text-[#c9d6e8] font-light mt-3 tracking-wide">{data.groomName}</p>
        </motion.div>

        {data.couplePhotoUrl && (
          <motion.div variants={fadeUp} className="self-center my-4">
            <div className="w-20 h-20 rounded-full overflow-hidden ring-2 ring-[#fef9e7]/30">
              <img src={data.couplePhotoUrl} alt="" className="w-full h-full object-cover" crossOrigin="anonymous" />
            </div>
          </motion.div>
        )}

        {data.familyDetails && (
          <motion.p variants={fadeUp} className="text-xs text-center text-[#c9d6e8]/70 italic mb-4">{data.familyDetails}</motion.p>
        )}

        <div className="mt-auto">
          <EventDetailsPanel data={data} accent="#fef9e7" variant="dark" />
        </div>
      </motion.div>
      <WatermarkBadge isPremium={isPremium} />
    </div>
  );
}
