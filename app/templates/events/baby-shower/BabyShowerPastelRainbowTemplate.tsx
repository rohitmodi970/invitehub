'use client';

import { motion } from 'framer-motion';
import { Comfortaa, Poppins } from 'next/font/google';
import type { TemplateProps } from '@/lib/invitations/types';
import { EventDetailsPanel, WatermarkBadge, staggerContainer, fadeUp } from '../shared/EventDetailsPanel';

const comfortaa = { className: '' };
const poppins = { className: '' };

const RAINBOW = ['#ffb3ba', '#ffdfba', '#ffffba', '#baffc9', '#bae1ff', '#e0bbff'];

export function BabyShowerPastelRainbowTemplate({ data, isPremium = false }: TemplateProps) {
  return (
    <div
      className={`relative overflow-hidden w-full max-w-[420px] min-h-[640px] mx-auto flex flex-col shadow-2xl ${poppins.className}`}
      style={{ background: '#fffbfe' }}
    >
      {/* Rainbow arches */}
      <div className="absolute top-0 inset-x-0 h-48 overflow-hidden pointer-events-none">
        {RAINBOW.map((color, i) => (
          <motion.div
            key={color}
            initial={{ scaleX: 0 }}
            animate={{ scaleX: 1 }}
            transition={{ delay: i * 0.08, duration: 0.6, ease: 'easeOut' }}
            className="absolute bottom-0 left-1/2 -translate-x-1/2 rounded-t-full origin-bottom"
            style={{
              width: `${320 - i * 40}px`,
              height: `${160 - i * 20}px`,
              background: color,
              opacity: 0.85,
            }}
          />
        ))}
      </div>

      <motion.div
        className="relative z-10 flex-1 flex flex-col px-8 pt-36 pb-8"
        variants={staggerContainer}
        initial="hidden"
        animate="show"
      >
        <motion.div variants={fadeUp} className="text-center mb-4">
          <span className={`${comfortaa.className} inline-block px-4 py-1 rounded-full text-xs font-bold text-white`}
            style={{ background: 'linear-gradient(135deg, #ffb3ba, #bae1ff)' }}>
            Baby Shower
          </span>
          <h1 className={`${comfortaa.className} text-3xl font-bold text-[#4a4458] mt-4 leading-tight`}>{data.brideName}</h1>
          <p className="text-[#7c7287] font-medium mt-2">{data.groomName}</p>
        </motion.div>

        {data.couplePhotoUrl && (
          <motion.div variants={fadeUp} className="self-center my-4">
            <div className="w-20 h-20 rounded-2xl overflow-hidden shadow-md ring-2 ring-white">
              <img src={data.couplePhotoUrl} alt="" className="w-full h-full object-cover" crossOrigin="anonymous" />
            </div>
          </motion.div>
        )}

        {data.familyDetails && (
          <motion.p variants={fadeUp} className="text-xs text-center text-[#7c7287] italic mb-4">{data.familyDetails}</motion.p>
        )}

        <div className="mt-auto">
          <EventDetailsPanel data={data} accent="#e0bbff" />
        </div>
      </motion.div>
      <WatermarkBadge isPremium={isPremium} />
    </div>
  );
}
