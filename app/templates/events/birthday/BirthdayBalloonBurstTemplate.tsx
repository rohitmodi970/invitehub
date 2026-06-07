'use client';

import { motion } from 'framer-motion';
import { Fredoka, Nunito } from 'next/font/google';
import type { TemplateProps } from '@/lib/invitations/types';
import { EventDetailsPanel, WatermarkBadge, staggerContainer, fadeUp } from '../shared/EventDetailsPanel';

const fredoka = Fredoka({ subsets: ['latin'], weight: ['500', '600', '700'] });
const nunito = Nunito({ subsets: ['latin'], weight: ['400', '600'] });

const Balloon = ({ color, x, delay }: { color: string; x: number; delay: number }) => (
  <motion.div
    initial={{ y: 30, opacity: 0 }}
    animate={{ y: 0, opacity: 1 }}
    transition={{ delay, duration: 0.7, type: 'spring' as const, stiffness: 120 }}
    className="absolute bottom-0"
    style={{ left: `${x}%` }}
  >
    <svg width="36" height="72" viewBox="0 0 36 72" fill="none">
      <ellipse cx="18" cy="22" rx="16" ry="20" fill={color} opacity="0.9" />
      <ellipse cx="14" cy="18" rx="4" ry="6" fill="white" opacity="0.25" />
      <path d="M18 42 Q16 52 18 72" stroke={color} strokeWidth="1.5" fill="none" opacity="0.6" />
    </svg>
  </motion.div>
);

export function BirthdayBalloonBurstTemplate({ data, isPremium = false }: TemplateProps) {
  return (
    <div
      className={`relative overflow-hidden w-full max-w-[420px] min-h-[640px] mx-auto flex flex-col shadow-2xl ${nunito.className}`}
      style={{ background: 'linear-gradient(180deg, #fff9f0 0%, #ffe8d6 100%)' }}
    >
      {/* Soft sun burst */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-80 h-80 rounded-full opacity-30"
        style={{ background: 'radial-gradient(circle, #ffd166 0%, transparent 70%)' }} />

      <Balloon color="#ef476f" x={5} delay={0.1} />
      <Balloon color="#118ab2" x={22} delay={0.25} />
      <Balloon color="#ffd166" x={55} delay={0.15} />
      <Balloon color="#06d6a0" x={72} delay={0.35} />
      <Balloon color="#8338ec" x={85} delay={0.2} />

      <motion.div
        className="relative z-10 flex-1 flex flex-col px-7 pt-12 pb-8"
        variants={staggerContainer}
        initial="hidden"
        animate="show"
      >
        <motion.div variants={fadeUp} className="text-center mb-6">
          <span className="inline-block px-4 py-1.5 rounded-full text-xs font-semibold tracking-wide"
            style={{ background: '#ef476f20', color: '#ef476f' }}>
            🎈 Birthday Celebration
          </span>
        </motion.div>

        <motion.div variants={fadeUp} className="text-center mb-4">
          <h1 className={`${fredoka.className} text-5xl font-bold text-[#073b4c] leading-tight`}>
            {data.brideName}
          </h1>
          <div className="flex items-center justify-center gap-3 my-3">
            <div className="w-12 h-1 rounded-full bg-[#ffd166]" />
            <span className={`${fredoka.className} text-xl font-semibold text-[#ef476f]`}>{data.groomName}</span>
            <div className="w-12 h-1 rounded-full bg-[#ffd166]" />
          </div>
        </motion.div>

        {data.couplePhotoUrl && (
          <motion.div variants={fadeUp} className="self-center mb-4">
            <div className="w-20 h-20 rounded-full overflow-hidden border-4 border-white shadow-lg">
              <img src={data.couplePhotoUrl} alt="" className="w-full h-full object-cover" crossOrigin="anonymous" />
            </div>
          </motion.div>
        )}

        {data.familyDetails && (
          <motion.p variants={fadeUp} className="text-xs text-center text-[#073b4c]/60 italic mb-4">{data.familyDetails}</motion.p>
        )}

        <div className="mt-auto">
          <EventDetailsPanel data={data} accent="#ef476f" />
        </div>
      </motion.div>
      <WatermarkBadge isPremium={isPremium} />
    </div>
  );
}
