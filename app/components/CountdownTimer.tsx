'use client';

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

interface CountdownTimerProps {
  targetDateStr: string;
}

export function CountdownTimer({ targetDateStr }: CountdownTimerProps) {
  const [timeLeft, setTimeLeft] = useState({ days: 0, hours: 0, minutes: 0, seconds: 0 });
  const [isMounted, setIsMounted] = useState(false);
  const [isPast, setIsPast] = useState(false);

  useEffect(() => {
    setIsMounted(true);

    let targetDate = new Date(targetDateStr).getTime();
    if (isNaN(targetDate)) {
      const cleanStr = targetDateStr.replace(/(st|nd|rd|th)/g, '');
      targetDate = new Date(cleanStr).getTime();
    }
    if (isNaN(targetDate)) {
      targetDate = Date.now() + 30 * 24 * 60 * 60 * 1000;
    }

    const tick = () => {
      const distance = targetDate - Date.now();
      if (distance < 0) {
        setIsPast(true);
        setTimeLeft({ days: 0, hours: 0, minutes: 0, seconds: 0 });
        return;
      }
      setTimeLeft({
        days: Math.floor(distance / 86400000),
        hours: Math.floor((distance % 86400000) / 3600000),
        minutes: Math.floor((distance % 3600000) / 60000),
        seconds: Math.floor((distance % 60000) / 1000),
      });
    };

    tick();
    const id = setInterval(tick, 1000);
    return () => clearInterval(id);
  }, [targetDateStr]);

  if (!isMounted) return null;

  const units = [
    { label: 'Days', value: timeLeft.days },
    { label: 'Hours', value: timeLeft.hours },
    { label: 'Mins', value: timeLeft.minutes },
    { label: 'Secs', value: timeLeft.seconds },
  ];

  return (
    <div className="w-full max-w-lg mx-auto">
      {/* Glass card */}
      <div
        className="rounded-3xl p-8"
        style={{
          background: 'rgba(255,255,255,0.05)',
          backdropFilter: 'blur(20px)',
          border: '1px solid rgba(255,255,255,0.10)',
          boxShadow: '0 20px 60px rgba(0,0,0,0.3)',
        }}
      >
        {isPast ? (
          <p className="text-center text-white/70 text-lg">🎉 The big day has arrived!</p>
        ) : (
          <div className="flex justify-center gap-3 sm:gap-6">
            {units.map((unit, i) => (
              <motion.div
                key={unit.label}
                initial={{ opacity: 0, y: 24 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.08, duration: 0.5, ease: 'easeOut' as const }}
                className="flex flex-col items-center flex-1"
              >
                {/* Number tile */}
                <div
                  className="w-full aspect-square flex items-center justify-center rounded-2xl mb-2 relative overflow-hidden"
                  style={{
                    background: 'linear-gradient(135deg, rgba(255,255,255,0.12) 0%, rgba(255,255,255,0.04) 100%)',
                    border: '1px solid rgba(255,255,255,0.15)',
                    boxShadow: 'inset 0 1px 0 rgba(255,255,255,0.1)',
                  }}
                >
                  {/* Shimmer stripe */}
                  <div
                    className="absolute inset-x-0 top-0 h-[1px]"
                    style={{ background: 'rgba(255,255,255,0.2)' }}
                  />
                  <AnimatePresence mode="wait">
                    <motion.span
                      key={unit.value}
                      initial={{ y: -16, opacity: 0 }}
                      animate={{ y: 0, opacity: 1 }}
                      exit={{ y: 16, opacity: 0 }}
                      transition={{ duration: 0.2 }}
                      className="text-2xl sm:text-3xl font-bold tabular-nums"
                      style={{ color: '#c9a84c' }}
                    >
                      {unit.value.toString().padStart(2, '0')}
                    </motion.span>
                  </AnimatePresence>
                </div>
                <span className="text-[10px] sm:text-xs tracking-[0.15em] uppercase font-medium text-white/40">
                  {unit.label}
                </span>
              </motion.div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
