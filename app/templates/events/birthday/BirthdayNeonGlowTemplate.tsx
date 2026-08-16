'use client';

import { motion } from 'framer-motion';
import { Syne, DM_Sans } from 'next/font/google';
import type { TemplateProps } from '@/lib/invitations/types';
import { EventDetailsPanel, WatermarkBadge, staggerContainer, fadeUp } from '../shared/EventDetailsPanel';

const syne = { className: '' };
const dmSans = { className: '' };

const ConfettiDot = ({ x, y, color, delay }: { x: number; y: number; color: string; delay: number }) => (
  <motion.div
    initial={{ opacity: 0, scale: 0 }}
    animate={{ opacity: 1, scale: 1 }}
    transition={{ delay, duration: 0.4, type: 'spring' as const }}
    className="absolute w-2 h-2 rounded-full"
    style={{ left: `${x}%`, top: `${y}%`, background: color }}
  />
);

export function BirthdayNeonGlowTemplate({ data, isPremium = false }: TemplateProps) {
  return (
    <div
      className={`relative overflow-hidden w-full max-w-[420px] min-h-[640px] mx-auto flex flex-col shadow-2xl ${dmSans.className}`}
      style={{ background: 'linear-gradient(165deg, #0f0a1a 0%, #1a0a2e 45%, #2d1b4e 100%)' }}
    >
      {/* Neon glow orbs */}
      <div className="absolute -top-20 -right-20 w-64 h-64 rounded-full opacity-40 blur-3xl" style={{ background: '#ff006e' }} />
      <div className="absolute top-1/3 -left-16 w-48 h-48 rounded-full opacity-30 blur-3xl" style={{ background: '#8338ec' }} />
      <div className="absolute bottom-20 right-0 w-40 h-40 rounded-full opacity-25 blur-3xl" style={{ background: '#3a86ff' }} />

      {/* Confetti */}
      {[
        ['12', '8', '#ff006e', 0.2], ['78', '15', '#ffbe0b', 0.35], ['45', '22', '#8338ec', 0.5],
        ['88', '35', '#06d6a0', 0.25], ['25', '45', '#ff006e', 0.4], ['65', '12', '#3a86ff', 0.55],
      ].map(([x, y, c, d], i) => (
        <ConfettiDot key={i} x={Number(x)} y={Number(y)} color={c as string} delay={Number(d)} />
      ))}

      <motion.div
        className="relative z-10 flex-1 flex flex-col px-7 pt-10 pb-8"
        variants={staggerContainer}
        initial="hidden"
        animate="show"
      >
        <motion.p variants={fadeUp} className={`${syne.className} text-[10px] tracking-[0.45em] uppercase text-fuchsia-400/80 mb-6`}>
          You&apos;re Invited
        </motion.p>

        <motion.div variants={fadeUp} className="mb-1">
          <p className="text-xs text-white/40 uppercase tracking-widest mb-2">Birthday Party</p>
          <h1
            className={`${syne.className} text-5xl font-extrabold leading-none`}
            style={{
              background: 'linear-gradient(135deg, #ff006e, #ffbe0b, #8338ec)',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
            }}
          >
            {data.brideName}
          </h1>
          <p className={`${syne.className} text-2xl font-bold text-white/90 mt-2`}>{data.groomName}</p>
        </motion.div>

        {data.couplePhotoUrl && (
          <motion.div variants={fadeUp} className="self-center my-5">
            <div className="w-24 h-24 rounded-2xl overflow-hidden ring-2 ring-fuchsia-500/50 ring-offset-2 ring-offset-[#1a0a2e]">
              <img src={data.couplePhotoUrl} alt="" className="w-full h-full object-cover" crossOrigin="anonymous" />
            </div>
          </motion.div>
        )}

        {data.familyDetails && (
          <motion.p variants={fadeUp} className="text-xs text-white/45 text-center italic mb-4">{data.familyDetails}</motion.p>
        )}

        <div className="mt-auto">
          <EventDetailsPanel data={data} accent="#ff006e" variant="dark" />
        </div>
      </motion.div>
      <WatermarkBadge isPremium={isPremium} />
    </div>
  );
}
