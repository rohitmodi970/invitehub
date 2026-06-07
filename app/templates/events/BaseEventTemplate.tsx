'use client';

import { motion } from 'framer-motion';
import { Inter, Playfair_Display } from 'next/font/google';
import type { TemplateProps } from '@/lib/invitations/types';

const inter = Inter({ subsets: ['latin'], weight: ['300', '400', '500', '600', '700'] });
const playfair = Playfair_Display({ subsets: ['latin'], weight: ['400', '600', '700'] });

export interface EventTemplateTheme {
  headerLabel: string;
  accent: string;
  accentLight: string;
  bg: string;
  textOnAccent: string;
  showAmpersand?: boolean;
  decorativeEmoji?: string;
}

interface BaseEventTemplateProps extends TemplateProps {
  theme: EventTemplateTheme;
}

const fadeUp = {
  hidden: { opacity: 0, y: 16 },
  show: { opacity: 1, y: 0, transition: { duration: 0.5, ease: 'easeOut' as const } },
};

export function BaseEventTemplate({ data, isPremium = false, theme }: BaseEventTemplateProps) {
  const { accent, accentLight, bg, textOnAccent, headerLabel, showAmpersand = true, decorativeEmoji } = theme;

  return (
    <div
      className={`relative overflow-hidden w-full max-w-[420px] min-h-[640px] mx-auto flex flex-col shadow-2xl ${inter.className}`}
      style={{ background: bg }}
    >
      {/* Top accent band */}
      <motion.div
        initial={{ scaleY: 0 }}
        animate={{ scaleY: 1 }}
        transition={{ duration: 0.6, ease: 'easeOut' }}
        className="absolute top-0 left-0 right-0 origin-top"
        style={{ height: '42%', background: `linear-gradient(160deg, ${accent} 0%, ${accentLight} 100%)` }}
      />

      {/* Decorative circles */}
      <div className="absolute top-8 right-6 w-16 h-16 rounded-full opacity-20 pointer-events-none" style={{ background: textOnAccent }} />
      <div className="absolute top-20 left-4 w-8 h-8 rounded-full opacity-15 pointer-events-none" style={{ background: textOnAccent }} />

      <motion.div
        className="relative z-10 flex-1 flex flex-col px-8 pt-10 pb-8"
        initial="hidden"
        animate="show"
        variants={{ show: { transition: { staggerChildren: 0.1 } } }}
      >
        <motion.p
          variants={fadeUp}
          className={`${playfair.className} text-[11px] tracking-[0.35em] uppercase mb-10`}
          style={{ color: `${textOnAccent}99` }}
        >
          {headerLabel}
        </motion.p>

        {decorativeEmoji && (
          <motion.div variants={fadeUp} className="text-3xl mb-3" style={{ color: textOnAccent }}>
            {decorativeEmoji}
          </motion.div>
        )}

        <motion.div variants={fadeUp} className="mb-2">
          <h1
            className={`${playfair.className} text-4xl sm:text-5xl font-bold leading-tight`}
            style={{ color: textOnAccent }}
          >
            {data.brideName}
          </h1>
          {showAmpersand ? (
            <div className="flex items-center gap-3 my-2">
              <div className="w-8 h-px opacity-40" style={{ background: textOnAccent }} />
              <span className="text-lg opacity-70" style={{ color: textOnAccent }}>&amp;</span>
              <div className="flex-1 h-px opacity-40" style={{ background: textOnAccent }} />
            </div>
          ) : (
            <div className="h-2" />
          )}
          <h2
            className={`${playfair.className} text-2xl sm:text-3xl font-semibold`}
            style={{ color: textOnAccent }}
          >
            {data.groomName}
          </h2>
        </motion.div>

        {data.couplePhotoUrl && (
          <motion.div variants={fadeUp} className="self-center my-4">
            <div
              className="w-20 h-20 rounded-full overflow-hidden"
              style={{ border: `3px solid ${textOnAccent}`, boxShadow: '0 4px 16px rgba(0,0,0,0.15)' }}
            >
              <img src={data.couplePhotoUrl} alt="" className="w-full h-full object-cover" crossOrigin="anonymous" />
            </div>
          </motion.div>
        )}

        {data.familyDetails && (
          <motion.p variants={fadeUp} className="text-xs text-center text-gray-500 italic mb-4 px-2">
            {data.familyDetails}
          </motion.p>
        )}

        <motion.div variants={fadeUp} className="mt-auto">
          <div className="bg-white rounded-2xl p-5 shadow-lg border border-gray-100">
            <div className="grid grid-cols-2 gap-4 mb-4">
              <div>
                <p className="text-[10px] uppercase tracking-widest text-gray-400 mb-1">Date</p>
                <p className="text-sm font-semibold text-gray-800 leading-snug">{data.weddingDate}</p>
              </div>
              <div>
                <p className="text-[10px] uppercase tracking-widest text-gray-400 mb-1">Time</p>
                <p className="text-sm font-semibold text-gray-800">{data.weddingTime}</p>
              </div>
            </div>
            <div className="h-px bg-gray-100 mb-4" />
            <div className="mb-3">
              <p className="text-[10px] uppercase tracking-widest text-gray-400 mb-1">Venue</p>
              <p className="text-sm font-semibold text-gray-800">{data.venueName}</p>
              <p className="text-xs text-gray-500 mt-0.5">{data.venueAddress}</p>
            </div>
            {data.contactNumber && (
              <p className="text-xs text-gray-500">📞 {data.contactNumber}</p>
            )}
            {data.additionalMessage && (
              <p className="text-xs text-gray-600 italic mt-3 pt-3 border-t border-gray-100">{data.additionalMessage}</p>
            )}
            {data.rsvpDetails && (
              <p className="text-xs font-medium mt-2" style={{ color: accent }}>{data.rsvpDetails}</p>
            )}
          </div>
        </motion.div>
      </motion.div>

      {!isPremium && (
        <div className="absolute bottom-3 right-3 text-[9px] text-gray-400/60 uppercase tracking-widest pointer-events-none">
          InviteHub.in
        </div>
      )}
    </div>
  );
}
