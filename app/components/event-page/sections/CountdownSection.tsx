'use client';

import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { ScrollSection } from '../EventPageRenderer';
import type { EventData } from '@/lib/events/event-data';
import type { TemplateDesign } from '@/lib/templates/engine/types';

interface CountdownSectionProps {
  event: EventData;
  design: TemplateDesign;
  sectionIndex?: number;
}

interface TimeLeft {
  days: number;
  hours: number;
  minutes: number;
  seconds: number;
  isPast: boolean;
}

function getTimeLeft(targetDate: string, targetTime?: string): TimeLeft {
  const target = new Date(`${targetDate}T${targetTime || '00:00:00'}`);
  const now = new Date();
  const diff = target.getTime() - now.getTime();

  if (diff <= 0) {
    return { days: 0, hours: 0, minutes: 0, seconds: 0, isPast: true };
  }

  return {
    days: Math.floor(diff / (1000 * 60 * 60 * 24)),
    hours: Math.floor((diff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)),
    minutes: Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60)),
    seconds: Math.floor((diff % (1000 * 60)) / 1000),
    isPast: false,
  };
}

export default function CountdownSection({ event, design, sectionIndex = 0 }: CountdownSectionProps) {
  const [timeLeft, setTimeLeft] = useState<TimeLeft>(() =>
    getTimeLeft(event.eventDate, event.eventTime)
  );

  useEffect(() => {
    // Don't run interval if event is in the past
    if (timeLeft.isPast) return;

    const timer = setInterval(() => {
      setTimeLeft(getTimeLeft(event.eventDate, event.eventTime));
    }, 1000);

    return () => clearInterval(timer);
  }, [event.eventDate, event.eventTime, timeLeft.isPast]);

  // Don't show countdown if event is in the past
  if (timeLeft.isPast) return null;

  const units = [
    { label: 'Days', value: timeLeft.days },
    { label: 'Hours', value: timeLeft.hours },
    { label: 'Minutes', value: timeLeft.minutes },
    { label: 'Seconds', value: timeLeft.seconds },
  ];

  return (
    <ScrollSection
      className="w-full px-6 py-16"
      delay={0.1}
      animation={design.entranceAnimation}
    >
      <div
        className="max-w-[var(--max-width)] mx-auto"
        style={{ maxWidth: design.maxWidth }}
      >
        {/* Section label */}
        <p
          className="text-center text-xs font-semibold tracking-[0.2em] uppercase mb-8"
          style={{ color: 'var(--accent-color)', fontFamily: 'var(--body-font)' }}
        >
          Counting Down
        </p>

        {/* Countdown grid */}
        <div className="flex items-center justify-center gap-3 sm:gap-6">
          {units.map((unit, i) => (
            <div key={unit.label} className="flex items-center gap-3 sm:gap-6">
              <CountdownUnit
                value={unit.value}
                label={unit.label}
                design={design}
                delay={i * 0.05}
              />
              {i < units.length - 1 && (
                <motion.span
                  className="text-2xl sm:text-3xl font-bold pb-6 select-none"
                  style={{ color: 'var(--accent-color)', opacity: 0.6 }}
                  animate={{ opacity: [0.6, 1, 0.6] }}
                  transition={{ duration: 1, repeat: Infinity, ease: 'easeInOut' }}
                >
                  :
                </motion.span>
              )}
            </div>
          ))}
        </div>
      </div>
    </ScrollSection>
  );
}

function CountdownUnit({
  value,
  label,
  design,
  delay,
}: {
  value: number;
  label: string;
  design: TemplateDesign;
  delay: number;
}) {
  const displayValue = String(value).padStart(2, '0');

  return (
    <motion.div
      className="flex flex-col items-center gap-1"
      initial={{ opacity: 0, scale: 0.8 }}
      whileInView={{ opacity: 1, scale: 1 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5, delay }}
    >
      <div
        className="relative w-16 h-16 sm:w-24 sm:h-24 flex items-center justify-center rounded-xl sm:rounded-2xl overflow-hidden"
        style={{
          background: 'var(--surface-color)',
          border: '1px solid var(--border-color)',
          boxShadow: `0 0 30px ${design.accentColor}15`,
        }}
      >
        <motion.span
          key={displayValue}
          className="text-2xl sm:text-4xl font-black"
          style={{
            fontFamily: 'var(--heading-font)',
            color: 'var(--accent-color)',
          }}
          initial={{ y: -20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.3 }}
        >
          {displayValue}
        </motion.span>
      </div>
      <span
        className="text-xs font-semibold tracking-widest uppercase"
        style={{ color: 'var(--muted-text)', fontFamily: 'var(--body-font)' }}
      >
        {label}
      </span>
    </motion.div>
  );
}
