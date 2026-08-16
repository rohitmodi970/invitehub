'use client';

import { useEffect, useRef } from 'react';
import type { BackgroundEffect } from '@/lib/templates/engine/types';

interface BackgroundEffectProps {
  effect: BackgroundEffect;
  accentColor: string;
}

export default function BackgroundEffect({ effect, accentColor }: BackgroundEffectProps) {
  if (effect === 'none') return null;
  if (effect === 'stars') return <StarField accentColor={accentColor} />;
  if (effect === 'confetti') return <ConfettiField />;
  if (effect === 'particles') return <ParticleField accentColor={accentColor} />;
  if (effect === 'gradient-mesh') return <GradientMesh accentColor={accentColor} />;
  if (effect === 'bokeh') return <BokehField accentColor={accentColor} />;
  return null;
}

// ── Star Field (for dark romantic templates) ─────────────────────────
function StarField({ accentColor }: { accentColor: string }) {
  const stars = Array.from({ length: 80 }, (_, i) => ({
    id: i,
    left: `${Math.random() * 100}%`,
    top: `${Math.random() * 100}%`,
    size: Math.random() * 2.5 + 0.5,
    delay: Math.random() * 4,
    duration: Math.random() * 3 + 2,
  }));

  return (
    <div className="fixed inset-0 pointer-events-none z-0 overflow-hidden">
      {stars.map(star => (
        <div
          key={star.id}
          className="absolute rounded-full"
          style={{
            left: star.left,
            top: star.top,
            width: `${star.size}px`,
            height: `${star.size}px`,
            background: `rgba(255,255,255,${Math.random() * 0.6 + 0.2})`,
            animationName: 'twinkle',
            animationDuration: `${star.duration}s`,
            animationDelay: `${star.delay}s`,
            animationIterationCount: 'infinite',
            animationTimingFunction: 'ease-in-out',
          }}
        />
      ))}
      <style>{`
        @keyframes twinkle {
          0%, 100% { opacity: 0.2; transform: scale(1); }
          50% { opacity: 1; transform: scale(1.4); }
        }
      `}</style>
    </div>
  );
}

// ── Confetti (for birthday/celebratory templates) ────────────────────
function ConfettiField() {
  const colors = ['#FF6B6B', '#FFD93D', '#6BCB77', '#4D96FF', '#F7B267', '#C77DFF'];
  const pieces = Array.from({ length: 50 }, (_, i) => ({
    id: i,
    left: `${Math.random() * 100}%`,
    color: colors[Math.floor(Math.random() * colors.length)],
    size: Math.random() * 8 + 4,
    delay: Math.random() * 8,
    duration: Math.random() * 6 + 6,
    rotation: Math.random() * 360,
  }));

  return (
    <div className="fixed inset-0 pointer-events-none z-0 overflow-hidden">
      {pieces.map(p => (
        <div
          key={p.id}
          className="absolute"
          style={{
            left: p.left,
            top: '-20px',
            width: `${p.size}px`,
            height: `${p.size * 0.6}px`,
            background: p.color,
            borderRadius: '2px',
            transform: `rotate(${p.rotation}deg)`,
            animationName: 'fall',
            animationDuration: `${p.duration}s`,
            animationDelay: `${p.delay}s`,
            animationIterationCount: 'infinite',
            animationTimingFunction: 'linear',
            opacity: 0.7,
          }}
        />
      ))}
      <style>{`
        @keyframes fall {
          0% { transform: translateY(-20px) rotate(0deg); opacity: 0.7; }
          100% { transform: translateY(110vh) rotate(720deg); opacity: 0; }
        }
      `}</style>
    </div>
  );
}

// ── Particles (for professional templates) ───────────────────────────
function ParticleField({ accentColor }: { accentColor: string }) {
  const particles = Array.from({ length: 20 }, (_, i) => ({
    id: i,
    left: `${Math.random() * 100}%`,
    top: `${Math.random() * 100}%`,
    size: Math.random() * 80 + 30,
    delay: Math.random() * 6,
    duration: Math.random() * 8 + 8,
  }));

  return (
    <div className="fixed inset-0 pointer-events-none z-0 overflow-hidden">
      {particles.map(p => (
        <div
          key={p.id}
          className="absolute rounded-full"
          style={{
            left: p.left,
            top: p.top,
            width: `${p.size}px`,
            height: `${p.size}px`,
            background: `radial-gradient(circle, ${accentColor}08, transparent 70%)`,
            animationName: 'float',
            animationDuration: `${p.duration}s`,
            animationDelay: `${p.delay}s`,
            animationIterationCount: 'infinite',
            animationTimingFunction: 'ease-in-out',
          }}
        />
      ))}
      <style>{`
        @keyframes float {
          0%, 100% { transform: translateY(0px) scale(1); }
          50% { transform: translateY(-30px) scale(1.1); }
        }
      `}</style>
    </div>
  );
}

// ── Gradient Mesh (for modern templates) ─────────────────────────────
function GradientMesh({ accentColor }: { accentColor: string }) {
  return (
    <div className="fixed inset-0 pointer-events-none z-0 overflow-hidden">
      <div
        className="absolute"
        style={{
          width: '600px', height: '600px',
          top: '-200px', left: '-200px',
          background: `radial-gradient(circle, ${accentColor}18 0%, transparent 70%)`,
          animationName: 'meshMove',
          animationDuration: '12s',
          animationIterationCount: 'infinite',
          animationTimingFunction: 'ease-in-out',
        }}
      />
      <div
        className="absolute"
        style={{
          width: '500px', height: '500px',
          bottom: '-100px', right: '-100px',
          background: `radial-gradient(circle, ${accentColor}12 0%, transparent 70%)`,
          animationName: 'meshMove',
          animationDuration: '15s',
          animationDelay: '-5s',
          animationIterationCount: 'infinite',
          animationTimingFunction: 'ease-in-out',
        }}
      />
      <style>{`
        @keyframes meshMove {
          0%, 100% { transform: translate(0, 0) scale(1); }
          33% { transform: translate(60px, -40px) scale(1.1); }
          66% { transform: translate(-40px, 60px) scale(0.95); }
        }
      `}</style>
    </div>
  );
}

// ── Bokeh (for elegant templates) ────────────────────────────────────
function BokehField({ accentColor }: { accentColor: string }) {
  const circles = Array.from({ length: 12 }, (_, i) => ({
    id: i,
    left: `${Math.random() * 100}%`,
    top: `${Math.random() * 100}%`,
    size: Math.random() * 100 + 40,
    delay: Math.random() * 5,
    duration: Math.random() * 6 + 6,
    opacity: Math.random() * 0.12 + 0.04,
  }));

  return (
    <div className="fixed inset-0 pointer-events-none z-0 overflow-hidden">
      {circles.map(c => (
        <div
          key={c.id}
          className="absolute rounded-full blur-2xl"
          style={{
            left: c.left,
            top: c.top,
            width: `${c.size}px`,
            height: `${c.size}px`,
            background: accentColor,
            opacity: c.opacity,
            animationName: 'bokehFloat',
            animationDuration: `${c.duration}s`,
            animationDelay: `${c.delay}s`,
            animationIterationCount: 'infinite',
            animationTimingFunction: 'ease-in-out',
          }}
        />
      ))}
      <style>{`
        @keyframes bokehFloat {
          0%, 100% { transform: translateY(0) scale(1); opacity: var(--op, 0.08); }
          50% { transform: translateY(-20px) scale(1.1); }
        }
      `}</style>
    </div>
  );
}
