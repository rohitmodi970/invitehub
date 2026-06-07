'use client';

import { motion } from 'framer-motion';
import { IBM_Plex_Sans, Space_Grotesk } from 'next/font/google';
import type { TemplateProps } from '@/lib/invitations/types';
import { EventDetailsPanel, WatermarkBadge, staggerContainer, fadeUp } from '../shared/EventDetailsPanel';

const ibmPlex = IBM_Plex_Sans({ subsets: ['latin'], weight: ['300', '400', '500', '600'] });
const spaceGrotesk = Space_Grotesk({ subsets: ['latin'], weight: ['500', '700'] });

export function CorporateTechSummitTemplate({ data, isPremium = false }: TemplateProps) {
  const accent = '#06b6d4';

  return (
    <div
      className={`relative overflow-hidden w-full max-w-[420px] min-h-[640px] mx-auto flex flex-col shadow-2xl ${ibmPlex.className}`}
      style={{ background: '#0f1419' }}
    >
      {/* Tech circuit lines */}
      <svg className="absolute inset-0 w-full h-full opacity-[0.08] pointer-events-none" preserveAspectRatio="none">
        <line x1="0" y1="120" x2="420" y2="120" stroke={accent} strokeWidth="1" />
        <line x1="0" y1="320" x2="420" y2="320" stroke={accent} strokeWidth="1" />
        <line x1="80" y1="0" x2="80" y2="640" stroke={accent} strokeWidth="1" />
        <line x1="340" y1="0" x2="340" y2="640" stroke={accent} strokeWidth="1" />
        <circle cx="80" cy="120" r="4" fill={accent} />
        <circle cx="340" cy="320" r="4" fill={accent} />
      </svg>

      {/* Cyan glow */}
      <div className="absolute top-0 right-0 w-64 h-64 rounded-full opacity-20 blur-3xl pointer-events-none" style={{ background: accent }} />

      <motion.div
        className="relative z-10 flex-1 flex flex-col px-7 pt-12 pb-8"
        variants={staggerContainer}
        initial="hidden"
        animate="show"
      >
        <motion.div variants={fadeUp} className="flex items-center gap-2 mb-8">
          <div className="w-2 h-2 rounded-full animate-pulse" style={{ background: accent }} />
          <span className={`${spaceGrotesk.className} text-[10px] tracking-[0.3em] uppercase text-white/50`}>
            Tech Summit · 2026
          </span>
        </motion.div>

        <motion.div variants={fadeUp} className="mb-6">
          <h1 className={`${spaceGrotesk.className} text-3xl font-bold text-white leading-tight tracking-tight`}>
            {data.brideName}
          </h1>
          <p className="text-sm font-medium mt-3" style={{ color: accent }}>{data.groomName}</p>
        </motion.div>

        {data.couplePhotoUrl && (
          <motion.div variants={fadeUp} className="mb-5 p-4 rounded-xl border border-white/10 bg-white/5">
            <img src={data.couplePhotoUrl} alt="" className="h-12 w-auto object-contain" crossOrigin="anonymous" />
          </motion.div>
        )}

        {data.familyDetails && (
          <motion.div variants={fadeUp} className="mb-4 flex gap-3">
            <div className="w-1 rounded-full shrink-0" style={{ background: accent }} />
            <p className="text-xs text-white/55 leading-relaxed">{data.familyDetails}</p>
          </motion.div>
        )}

        <div className="mt-auto">
          <EventDetailsPanel data={data} accent={accent} variant="dark" />
        </div>
      </motion.div>
      <WatermarkBadge isPremium={isPremium} />
    </div>
  );
}
