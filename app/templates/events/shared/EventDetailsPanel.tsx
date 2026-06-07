'use client';

import { motion } from 'framer-motion';
import type { InvitationData } from '@/lib/invitations/types';

const fadeUp = {
  hidden: { opacity: 0, y: 12 },
  show: { opacity: 1, y: 0, transition: { duration: 0.45, ease: 'easeOut' as const } },
};

interface EventDetailsPanelProps {
  data: InvitationData;
  accent?: string;
  variant?: 'light' | 'dark' | 'glass';
}

export function EventDetailsPanel({ data, accent = '#6366f1', variant = 'light' }: EventDetailsPanelProps) {
  const cardClass =
    variant === 'dark'
      ? 'bg-white/10 backdrop-blur-md border border-white/15 text-white'
      : variant === 'glass'
      ? 'bg-white/80 backdrop-blur-xl border border-white/60'
      : 'bg-white shadow-lg border border-gray-100';

  const labelClass = variant === 'dark' ? 'text-white/50' : 'text-gray-400';
  const valueClass = variant === 'dark' ? 'text-white' : 'text-gray-800';
  const subClass = variant === 'dark' ? 'text-white/60' : 'text-gray-500';
  const dividerClass = variant === 'dark' ? 'bg-white/10' : 'bg-gray-100';

  return (
    <motion.div variants={fadeUp} className={`rounded-2xl p-5 ${cardClass}`}>
      <div className="grid grid-cols-2 gap-4 mb-4">
        <div>
          <p className={`text-[10px] uppercase tracking-widest mb-1 ${labelClass}`}>Date</p>
          <p className={`text-sm font-semibold leading-snug ${valueClass}`}>{data.weddingDate}</p>
        </div>
        <div>
          <p className={`text-[10px] uppercase tracking-widest mb-1 ${labelClass}`}>Time</p>
          <p className={`text-sm font-semibold ${valueClass}`}>{data.weddingTime}</p>
        </div>
      </div>
      <div className={`h-px mb-4 ${dividerClass}`} />
      <div className="mb-2">
        <p className={`text-[10px] uppercase tracking-widest mb-1 ${labelClass}`}>Venue</p>
        <p className={`text-sm font-semibold ${valueClass}`}>{data.venueName}</p>
        <p className={`text-xs mt-0.5 ${subClass}`}>{data.venueAddress}</p>
      </div>
      {data.contactNumber && <p className={`text-xs ${subClass}`}>📞 {data.contactNumber}</p>}
      {data.additionalMessage && (
        <p className={`text-xs italic mt-3 pt-3 border-t ${variant === 'dark' ? 'border-white/10 text-white/70' : 'border-gray-100 text-gray-600'}`}>
          {data.additionalMessage}
        </p>
      )}
      {data.rsvpDetails && (
        <p className="text-xs font-semibold mt-2" style={{ color: variant === 'dark' ? accent : accent }}>
          {data.rsvpDetails}
        </p>
      )}
    </motion.div>
  );
}

export function WatermarkBadge({ isPremium }: { isPremium?: boolean }) {
  if (isPremium) return null;
  return (
    <div className="absolute bottom-3 right-3 text-[9px] text-gray-400/50 uppercase tracking-widest pointer-events-none">
      InviteHub.in
    </div>
  );
}

export const staggerContainer = {
  hidden: { opacity: 0 },
  show: { opacity: 1, transition: { staggerChildren: 0.08, delayChildren: 0.15 } },
};

export { fadeUp };
