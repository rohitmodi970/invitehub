'use client';

import { motion } from 'framer-motion';
import Image from 'next/image';
import type { EventData } from '@/lib/events/event-data';
import type { TemplateDesign } from '@/lib/templates/engine/types';

interface HeroSectionProps {
  event: EventData;
  design: TemplateDesign;
  variant?: string;
  sectionIndex?: number;
}

export default function HeroSection({ event, design }: HeroSectionProps) {
  const formattedDate = formatEventDate(event.eventDate, event.timezone);
  const formattedTime = formatEventTime(event.eventTime);

  return (
    <section
      className="relative w-full min-h-screen flex flex-col items-center justify-center px-6 py-20"
      style={{ fontFamily: 'var(--body-font)' }}
    >
      {/* Cover image as full-bleed background */}
      {event.coverImageUrl && (
        <div className="absolute inset-0 z-0">
          <Image
            src={event.coverImageUrl}
            alt={event.title}
            fill
            className="object-cover"
            priority
          />
          {/* Gradient overlay so text stays readable */}
          <div
            className="absolute inset-0"
            style={{
              background: `linear-gradient(to bottom, rgba(0,0,0,0.3) 0%, rgba(0,0,0,0.7) 60%, ${design.backgroundColor} 100%)`,
            }}
          />
        </div>
      )}

      {/* Custom logo (Pro/Business tier) */}
      {event.customLogoUrl && (
        <motion.div
          className="relative z-10 mb-8"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.1 }}
        >
          <Image
            src={event.customLogoUrl}
            alt="Event logo"
            width={140}
            height={60}
            className="object-contain"
          />
        </motion.div>
      )}

      {/* Hero icon (emoji from template) */}
      {!event.customLogoUrl && design.heroIcon && (
        <motion.div
          className="relative z-10 mb-4 text-6xl"
          initial={{ opacity: 0, scale: 0.5 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ type: 'spring', stiffness: 200, damping: 15, delay: 0.1 }}
        >
          {design.heroIcon}
        </motion.div>
      )}

      {/* Tagline / "You're invited to" */}
      {event.tagline && (
        <motion.p
          className="relative z-10 text-sm font-semibold tracking-[0.25em] uppercase mb-4 text-center"
          style={{ color: 'var(--accent-color)', fontFamily: 'var(--body-font)' }}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.6, delay: 0.2 }}
        >
          {event.tagline}
        </motion.p>
      )}

      {/* Primary / Main Event Title */}
      <motion.h1
        className="relative z-10 text-center leading-tight mb-2"
        style={{
          fontFamily: 'var(--heading-font)',
          fontWeight: 'var(--heading-weight)' as never,
          color: 'white',
          textShadow: event.coverImageUrl ? '0 2px 20px rgba(0,0,0,0.5)' : 'none',
          fontSize: 'clamp(2.5rem, 8vw, 5rem)',
        }}
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1], delay: 0.25 }}
      >
        {event.primaryName}
      </motion.h1>

      {/* Secondary name (wedding partner, company, etc.) */}
      {event.secondaryName && (
        <>
          <motion.div
            className="relative z-10 my-3 flex items-center gap-3"
            initial={{ opacity: 0, scaleX: 0 }}
            animate={{ opacity: 1, scaleX: 1 }}
            transition={{ duration: 0.6, delay: 0.4 }}
          >
            <div
              className="h-px flex-1 max-w-[80px]"
              style={{ background: 'var(--accent-color)', opacity: 0.6 }}
            />
            <span
              className="text-xl"
              style={{ color: 'var(--accent-color)' }}
            >
              &amp;
            </span>
            <div
              className="h-px flex-1 max-w-[80px]"
              style={{ background: 'var(--accent-color)', opacity: 0.6 }}
            />
          </motion.div>
          <motion.h2
            className="relative z-10 text-center leading-tight mb-4"
            style={{
              fontFamily: 'var(--heading-font)',
              fontWeight: 'var(--heading-weight)' as never,
              color: 'white',
              textShadow: event.coverImageUrl ? '0 2px 20px rgba(0,0,0,0.5)' : 'none',
              fontSize: 'clamp(2rem, 6vw, 4rem)',
            }}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1], delay: 0.45 }}
          >
            {event.secondaryName}
          </motion.h2>
        </>
      )}

      {/* Date + Time pill */}
      <motion.div
        className="relative z-10 mt-6 flex flex-col sm:flex-row items-center gap-3"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.7, delay: 0.55 }}
      >
        <DateTimePill icon="📅" text={formattedDate} design={design} />
        {formattedTime && <DateTimePill icon="🕕" text={formattedTime} design={design} />}
        {event.venueName && (
          <DateTimePill icon="📍" text={event.venueName} design={design} />
        )}
        {event.isVirtual && (
          <DateTimePill icon="💻" text="Virtual Event" design={design} />
        )}
      </motion.div>

      {/* Scroll indicator */}
      <motion.div
        className="absolute bottom-8 left-1/2 -translate-x-1/2 z-10 flex flex-col items-center gap-2"
        initial={{ opacity: 0 }}
        animate={{ opacity: 0.5 }}
        transition={{ delay: 1.2, duration: 0.8 }}
      >
        <span className="text-xs tracking-widest uppercase" style={{ color: 'var(--muted-text)' }}>
          Scroll
        </span>
        <motion.div
          className="w-0.5 h-8"
          style={{ background: 'var(--accent-color)', opacity: 0.5 }}
          animate={{ scaleY: [1, 0.3, 1] }}
          transition={{ duration: 1.5, repeat: Infinity, ease: 'easeInOut' }}
        />
      </motion.div>
    </section>
  );
}

function DateTimePill({
  icon,
  text,
  design,
}: {
  icon: string;
  text: string;
  design: TemplateDesign;
}) {
  return (
    <div
      className="flex items-center gap-2 px-4 py-2 rounded-full text-sm font-medium"
      style={{
        background: 'var(--surface-color)',
        color: 'var(--text-color)',
        border: '1px solid var(--border-color)',
        backdropFilter: 'blur(8px)',
      }}
    >
      <span>{icon}</span>
      <span style={{ fontFamily: 'var(--body-font)' }}>{text}</span>
    </div>
  );
}

// ── Date formatting ──────────────────────────────────────────────────

function formatEventDate(dateStr: string, timezone?: string): string {
  if (!dateStr) return '';
  try {
    const date = new Date(dateStr + 'T00:00:00');
    return date.toLocaleDateString('en-IN', {
      weekday: 'long',
      year: 'numeric',
      month: 'long',
      day: 'numeric',
    });
  } catch {
    return dateStr;
  }
}

function formatEventTime(timeStr?: string): string {
  if (!timeStr) return '';
  try {
    const [hours, minutes] = timeStr.split(':').map(Number);
    const date = new Date();
    date.setHours(hours, minutes, 0);
    return date.toLocaleTimeString('en-IN', {
      hour: 'numeric',
      minute: '2-digit',
      hour12: true,
    });
  } catch {
    return timeStr;
  }
}
